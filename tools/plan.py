"""Decide which ready videos to build + upload in this run, and assign each a publish slot.
Ready = videos/<slug>/READY exists and videos/<slug>/upload.json does not.
Respects config/schedule.json: max_uploads_per_run (YouTube API quota), daily slots (IST), one video per slot.
Prints a GitHub Actions matrix JSON to stdout: {"include":[{"slug":..., "publish_at":...}, ...]}"""
import json, pathlib, datetime as dt, sys
R = pathlib.Path(__file__).resolve().parent.parent
cfg = json.loads((R / 'config/schedule.json').read_text())
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))

def taken():
    s = set()
    for u in R.glob('videos/*/upload.json'):
        p = json.loads(u.read_text()).get('publish_at')
        if p: s.add(p)
    for u in R.glob('videos/*/slot.txt'): s.add(u.read_text().strip())
    return s

def slots(start, used):
    d = start.date()
    while True:
        for hhmm in cfg['daily_slots_ist']:
            h, m = map(int, hhmm.split(':'))
            t = dt.datetime(d.year, d.month, d.day, h, m, tzinfo=IST)
            iso = t.astimezone(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
            if t > start and iso not in used: yield iso
        d += dt.timedelta(days=1)

import os
if os.environ.get('PREVIEW'):   # build one video for review only (never uploaded)
    print(json.dumps({'include': [{'slug': os.environ['PREVIEW'], 'publish_at': '', 'preview': True}]})); sys.exit()
# publish in queue order (keeps series episodes in sequence), then by name
import csv
order = {r['slug']: i for i, r in enumerate(csv.DictReader(open(R / 'queue' / 'topics.csv')))} if (R / 'queue' / 'topics.csv').exists() else {}
ready = sorted((p.parent for p in R.glob('videos/*/READY') if not (p.parent / 'upload.json').exists()), key=lambda v: (order.get(v.name, 1e9), v.name))
# YouTube quota resets daily: never upload more than max_uploads_per_day in any rolling 24 h
since = dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=24)
done24 = sum(1 for u in R.glob('videos/*/upload.json') if dt.datetime.strptime(json.loads(u.read_text())['uploaded'], '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=dt.timezone.utc) > since)
room = max(0, cfg.get('max_uploads_per_day', 4) - done24)
ready = ready[:min(cfg['max_uploads_per_run'], room)]
now = dt.datetime.now(IST) + dt.timedelta(hours=cfg.get('min_lead_hours', 3))
gen = slots(now, taken())
inc = []
for v in ready:
    test = json.loads((v / 'meta.json').read_text()).get('test')   # test videos upload as private, never scheduled
    pa = next(gen) if cfg['mode'] == 'schedule' and not test else ''
    inc.append({'slug': v.name, 'publish_at': pa})
print(json.dumps({'include': inc}))
