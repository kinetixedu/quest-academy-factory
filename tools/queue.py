"""Topic queue. queue/topics.csv columns: category,topic,status,slug,youtube
status: pending -> authoring -> ready -> uploaded (or failed)
  python3 tools/queue.py add "MBA" "SWOT Analysis" ["BBA" "Break-even point" ...]   add topics
  python3 tools/queue.py next N                       claim N pending topics (spread across categories) -> prints JSON, marks authoring
  python3 tools/queue.py ready <slug>                 mark authored (also writes videos/<slug>/READY)
  python3 tools/queue.py sync                         pull upload results into the CSV
  python3 tools/queue.py status                       summary per category"""
import csv, sys, json, pathlib, re, collections
R = pathlib.Path(__file__).resolve().parent.parent
Q = R / 'queue' / 'topics.csv'; F = ['category', 'topic', 'status', 'slug', 'youtube']
CATS = json.loads((R / 'config' / 'categories.json').read_text())
ALIAS = {}
for wid, c in CATS.items():
    for k in {wid, c['category'], c['category'].replace('Engineering', 'Engg'), c['category'].replace('BSc ', 'BSc-')}: ALIAS[k.lower()] = wid
ALIAS.update({'case study': 'case', 'case studies': 'case', 'eee': 'engg-electrical', 'bsc cs': 'bsc-cs', 'engg civil': 'engg-civil'})

def load(): return list(csv.DictReader(open(Q))) if Q.exists() else []
def save(rows):
    Q.parent.mkdir(exist_ok=True)
    with open(Q, 'w', newline='') as f: w = csv.DictWriter(f, F); w.writeheader(); w.writerows(rows)
def world(cat):
    k = cat.strip().lower()
    if k not in ALIAS: sys.exit(f'Unknown category "{cat}". Known: ' + ', '.join(sorted(c['category'] for c in CATS.values())))
    return ALIAS[k]
def slugify(wid, topic): return (wid + '-' + re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-'))[:80]

cmd = sys.argv[1] if len(sys.argv) > 1 else 'status'; rows = load()
if cmd == 'add':
    a = sys.argv[2:]; have = {r['slug'] for r in rows}
    for cat, topic in zip(a[::2], a[1::2]):
        wid = world(cat); s = slugify(wid, topic)
        if s in have: continue
        rows.append({'category': wid, 'topic': topic, 'status': 'pending', 'slug': s, 'youtube': ''}); have.add(s)
    save(rows); print(len(rows), 'topics in queue')
elif cmd == 'next':
    n = int(sys.argv[2]); pend = [r for r in rows if r['status'] == 'pending']
    by = collections.defaultdict(list)
    for r in pend: by[r['category']].append(r)
    pick = []
    while len(pick) < n and any(by.values()):          # round-robin across categories
        for c in list(by):
            if by[c] and len(pick) < n: pick.append(by[c].pop(0))
    for r in pick: r['status'] = 'authoring'
    save(rows); print(json.dumps([{'slug': r['slug'], 'world': r['category'], 'topic': r['topic']} for r in pick], indent=1))
elif cmd == 'ready':
    s = sys.argv[2]
    for r in rows:
        if r['slug'] == s: r['status'] = 'ready'
    (R / 'videos' / s).mkdir(parents=True, exist_ok=True); (R / 'videos' / s / 'READY').write_text('ready\n'); save(rows)
elif cmd == 'sync':
    for r in rows:
        u = R / 'videos' / r['slug'] / 'upload.json'
        if u.exists(): r['status'] = 'uploaded'; r['youtube'] = json.loads(u.read_text())['url']
    save(rows)
elif cmd == 'status':
    c = collections.Counter((r['category'], r['status']) for r in rows)
    for (cat, st), k in sorted(c.items()): print(f'{cat:18s} {st:10s} {k}')
