"""Upload one finished video to YouTube: video + thumbnail + English captions + playlist + schedule.
Env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN (GitHub secrets).
usage: python3 tools/upload.py videos/<slug> --publish-at 2026-10-20T12:00:00Z
Writes videos/<slug>/upload.json with the YouTube video id and URLs."""
import os, sys, json, pathlib, argparse, time
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

R = pathlib.Path(__file__).resolve().parent.parent

def yt():
    c = Credentials(None, refresh_token=os.environ['YT_REFRESH_TOKEN'], client_id=os.environ['YT_CLIENT_ID'],
                    client_secret=os.environ['YT_CLIENT_SECRET'], token_uri='https://oauth2.googleapis.com/token',
                    scopes=['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.force-ssl'])
    return build('youtube', 'v3', credentials=c, cache_discovery=False)

def playlist_id(y, title, desc):
    cache = R / 'registry' / 'playlists.json'; m = json.loads(cache.read_text()) if cache.exists() else {}
    if title in m: return m[title]
    tok = None
    while True:
        r = y.playlists().list(part='snippet', mine=True, maxResults=50, pageToken=tok).execute()
        for p in r.get('items', []):
            if p['snippet']['title'] == title: m[title] = p['id']; break
        tok = r.get('nextPageToken')
        if title in m or not tok: break
    if title not in m:
        time.sleep(4)   # YouTube rate-limits rapid playlist creation
        p = retry(lambda: y.playlists().insert(part='snippet,status', body={'snippet': {'title': title, 'description': desc, 'defaultLanguage': 'en'}, 'status': {'privacyStatus': 'public'}}).execute())
        m[title] = p['id']
    cache.parent.mkdir(exist_ok=True); cache.write_text(json.dumps(m, indent=1))
    return m[title]

def retry(fn, tries=5):
    for i in range(tries):
        try: return fn()
        except HttpError as e:
            if e.resp.status in (500, 502, 503, 504) and i < tries - 1: time.sleep(2 ** i * 3); continue
            if e.resp.status == 429 and i < tries - 1: time.sleep(30 * (i + 1)); continue
            raise

def ensure_playlists():
    # only the categories in this run (MATRIX env from the plan job) - playlists appear as each category gets its first video
    y = yt(); cats = json.loads((R / 'config' / 'categories.json').read_text())
    worlds = set()
    for v in json.loads(os.environ.get('MATRIX', '{"include":[]}'))['include']:
        worlds.add(json.loads((R / 'videos' / v['slug'] / 'meta.json').read_text())['world'])
    for w in sorted(worlds):
        c = cats[w]; print(c['playlist'], playlist_id(y, c['playlist'], f"{c['category']} concepts explained simply, with animated lessons by Quest Academy."))

def main():
    if '--ensure-playlists' in sys.argv: return ensure_playlists()
    ap = argparse.ArgumentParser(); ap.add_argument('folder'); ap.add_argument('--publish-at', default=None); ap.add_argument('--privacy', default=None)
    a = ap.parse_args(); F = pathlib.Path(a.folder)
    meta = json.loads((F / 'meta.json').read_text()); cats = json.loads((R / 'config' / 'categories.json').read_text())
    cfg = json.loads((R / 'config' / 'schedule.json').read_text()); cat = cats[meta['world']]
    y = yt()
    status = {'selfDeclaredMadeForKids': False, 'embeddable': True, 'license': 'youtube'}
    if a.publish_at: status.update(privacyStatus='private', publishAt=a.publish_at)
    else: status['privacyStatus'] = a.privacy or cfg.get('privacy_if_not_scheduled', 'private')
    tags = list(dict.fromkeys(meta.get('tags', []) + cat['tags']))[:25]
    body = {'snippet': {'title': meta['title'][:100], 'description': meta['description'][:4900], 'tags': tags, 'categoryId': '27',
                        'defaultLanguage': 'en', 'defaultAudioLanguage': 'en'}, 'status': status}
    media = MediaFileUpload(str(F / 'final.mp4'), chunksize=8 * 1024 * 1024, resumable=True, mimetype='video/mp4')
    req = y.videos().insert(part='snippet,status', body=body, media_body=media); resp = None
    while resp is None:
        st, resp = req.next_chunk()
        if st: print(f'upload {int(st.progress() * 100)}%', flush=True)
    vid = resp['id']; print('video id', vid)
    retry(lambda: y.thumbnails().set(videoId=vid, media_body=MediaFileUpload(str(F / 'thumbnail.jpg'), mimetype='image/jpeg')).execute())
    retry(lambda: y.captions().insert(part='snippet', body={'snippet': {'videoId': vid, 'language': 'en', 'name': 'English', 'isDraft': False}},
                                      media_body=MediaFileUpload(str(F / 'captions.srt'), mimetype='application/octet-stream')).execute())
    pl = playlist_id(y, cat['playlist'], f"{cat['category']} concepts explained simply, with animated lessons by Quest Academy.")
    retry(lambda: y.playlistItems().insert(part='snippet', body={'snippet': {'playlistId': pl, 'resourceId': {'kind': 'youtube#video', 'videoId': vid}}}).execute())
    out = {'video_id': vid, 'url': f'https://youtu.be/{vid}', 'playlist': cat['playlist'], 'publish_at': a.publish_at, 'uploaded': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
    (F / 'upload.json').write_text(json.dumps(out, indent=1)); print(json.dumps(out))

if __name__ == '__main__':
    try:
        main()
    except Exception as e:       # surface the reason as a GitHub annotation (readable without full logs)
        msg = (getattr(e, 'content', b'') or b'').decode('utf-8', 'ignore')[:600] or repr(e)[:600]
        print(f"::error title=YouTube upload failed::{type(e).__name__}: {msg}".replace('\n', ' '))
        raise
