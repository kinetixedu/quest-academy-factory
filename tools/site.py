#!/usr/bin/env python3
"""Build the public GitHub Pages site in docs/: home, privacy, terms and the factory dashboard.
The dashboard is a snapshot of queue/topics.csv + videos/*/upload.json. Run: python3 tools/site.py"""
import csv, json, pathlib, html, datetime as dt
from zoneinfo import ZoneInfo
R = pathlib.Path(__file__).resolve().parents[1]; D = R / 'docs'
UPDATED = '19 October 2026'
SITE = 'https://kinetixedu.github.io/quest-academy-factory/'
NAV = [('index.html', 'Home'), ('dashboard.html', 'Factory dashboard'), ('privacy.html', 'Privacy Policy'), ('terms.html', 'Terms of Service')]

def page(name, title, body):
    nav = ''.join(f'<a href="{h}"{" class=on" if h == name else ""}>{t}</a>' for h, t in NAV)
    doc = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} - Quest Academy Factory</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="site.css"></head><body>
<header><div class="bar"><a href="index.html"><img src="logo.svg" alt="Quest Academy"></a><nav>{nav}</nav></div></header>
<main>{body}</main>
<footer><span>&copy; 2026 MR Quest Technologies, Bengaluru, India &middot; Quest Academy Factory uses YouTube API Services</span>
<span><a href="privacy.html">Privacy Policy</a> &middot; <a href="terms.html">Terms of Service</a> &middot; <a href="mailto:info@mrts.solutions">info@mrts.solutions</a></span></footer>
</body></html>'''
    (D / name).write_text(doc)

def home():
    page('index.html', 'Home', f'''
<h1>Quest Academy Factory</h1>
<p class="lead">The internal publishing tool of <b>Quest Academy</b>, the education brand of MR Quest Technologies (Bengaluru, India). It produces short animated lessons for college students (MBA, BBA, BCom, BCA, BSc and Engineering) and publishes them to our own YouTube channel.</p>
<p><a class="yt" href="https://youtu.be/rj9gNt_7IzI">Watch Quest Academy on <b>YouTube</b></a></p>
<div class="grid">
 <div class="card"><h3>Our own content only</h3><p>Every video is created by our team. The tool uploads only to the Quest Academy channel, authorised by the channel owner.</p></div>
 <div class="card"><h3>Uses YouTube API Services</h3><p>Uploads, thumbnails, English captions, playlists and publish schedules are handled through the YouTube Data API v3.</p></div>
 <div class="card"><h3>Internal tool</h3><p>Not a public service: there is no sign-up and no third-party users. Used only by MR Quest Technologies staff.</p></div>
</div>
<h2>How a video is published</h2>
<ol class="steps">
 <li>Our team writes, voices and animates the lesson; the factory renders <code>final.mp4</code>, the thumbnail and English captions.</li>
 <li>The video is uploaded to our channel as private with a scheduled publish time (<code>videos.insert</code>).</li>
 <li>The custom thumbnail and captions are attached (<code>thumbnails.set</code>, <code>captions.insert</code>).</li>
 <li>The video is added to its subject playlist and series playlist (<code>playlistItems.insert</code>).</li>
 <li>The video ID and publish time are recorded so nothing is uploaded twice. See the <a href="dashboard.html">factory dashboard</a>.</li>
</ol>
<h2>Policies</h2>
<p>Read our <a href="privacy.html">Privacy Policy</a> and <a href="terms.html">Terms of Service</a>. Use of this tool is also subject to the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.</p>
''')

def privacy():
    page('privacy.html', 'Privacy Policy', f'''<div class="doc">
<h1>Privacy Policy</h1><p class="muted">Quest Academy Factory &middot; Last updated: {UPDATED}</p>
<p>Quest Academy Factory ("the app", "we") is an internal tool operated by MR Quest Technologies, Marathahalli, Bengaluru, Karnataka, India. It publishes Quest Academy's own educational videos to Quest Academy's own YouTube channel. This policy explains what data the app accesses through YouTube API Services, how it is used, stored, shared and deleted.</p>

<h2>1. YouTube API Services</h2>
<p>The app uses <b>YouTube API Services</b> (the YouTube Data API v3). By using the app you agree to be bound by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>. Google's handling of data is described in the <a href="https://policies.google.com/privacy">Google Privacy Policy</a> (<a href="http://www.google.com/policies/privacy">www.google.com/policies/privacy</a>).</p>

<h2>2. Who uses the app</h2>
<p>Only MR Quest Technologies staff, acting for the Quest Academy channel. The app has no public sign-up. The only Google account that authorises it is the owner of the Quest Academy channel, through Google OAuth 2.0.</p>

<h2>3. Information the app accesses</h2>
<p>With the scopes <code>youtube.upload</code> and <code>youtube.force-ssl</code>, the app uploads our videos, sets their thumbnails, uploads English captions, lists and creates playlists on our channel, adds our videos to those playlists, and checks that a video we uploaded still exists. It does not read comments, subscribers, analytics, watch history, or any other user's channel or data.</p>

<h2>4. Information we store</h2>
<ul>
<li>An OAuth refresh token for the Quest Academy channel, kept as an encrypted secret in our build system and never shown in logs or shared.</li>
<li>For each video we upload: its YouTube video ID, URL, playlist name, upload time and scheduled publish time, so the app never uploads the same lesson twice.</li>
</ul>
<p>We do not store personal information about viewers or any other users. The app sets no cookies and uses no tracking.</p>

<h2>5. How we use the information</h2>
<p>Only to publish and organise Quest Academy's own videos on Quest Academy's own channel. We do not use API data for advertising, profiling, analytics or any other purpose.</p>

<h2>6. Sharing</h2>
<p>We do not sell, rent or share API data with anyone. Data is sent only to Google/YouTube through YouTube API Services when the app uploads or updates our own videos.</p>

<h2>7. Retention and deletion</h2>
<ul>
<li>Video records (IDs, URLs, schedules) are kept while the video is on our channel and deleted within 30 days after the video is removed from YouTube.</li>
<li>If authorisation is revoked, we delete the stored refresh token and all data obtained from YouTube API Services within 7 days.</li>
<li>To request deletion of any stored data, email <a href="mailto:info@mrts.solutions">info@mrts.solutions</a>; we complete deletion within 7 days and confirm by email.</li>
</ul>

<h2>8. Revoking access</h2>
<p>The channel owner can revoke the app's access at any time from the Google security settings page: <a href="https://security.google.com/settings/security/permissions">https://security.google.com/settings/security/permissions</a>. After revocation the app can no longer access the channel.</p>

<h2>9. Security</h2>
<p>Credentials are stored only as encrypted secrets, all API traffic uses HTTPS, and access to the build system is limited to authorised staff.</p>

<h2>10. Children</h2>
<p>The app is an internal tool and does not collect data from children. Our videos are published as "not made for kids" educational content for college students.</p>

<h2>11. Changes</h2>
<p>We will post any changes on this page and update the date above.</p>

<h2>12. Contact</h2>
<p>MR Quest Technologies, Marathahalli, Bengaluru, Karnataka, India &middot; <a href="mailto:info@mrts.solutions">info@mrts.solutions</a></p>
</div>''')

def terms():
    page('terms.html', 'Terms of Service', f'''<div class="doc">
<h1>Terms of Service</h1><p class="muted">Quest Academy Factory &middot; Last updated: {UPDATED}</p>
<p>These terms govern the use of Quest Academy Factory ("the app"), an internal tool of MR Quest Technologies, Bengaluru, India.</p>
<h2>1. YouTube Terms of Service</h2>
<p>The app uses YouTube API Services. By using the app you agree to be bound by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>, and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a> applies to data handled by Google.</p>
<h2>2. Who may use the app</h2>
<p>The app is for internal use by authorised MR Quest Technologies staff only, to publish Quest Academy's own content to Quest Academy's own YouTube channel. It is not offered, sold or distributed to anyone else.</p>
<h2>3. Acceptable use</h2>
<ul>
<li>Upload only original content owned by Quest Academy or content we have the rights to publish.</li>
<li>Follow the YouTube Community Guidelines, the YouTube API Services Terms of Service and Developer Policies.</li>
<li>Do not use the app to access any channel other than Quest Academy's, or to collect data about other users.</li>
</ul>
<h2>4. Content</h2>
<p>All videos, thumbnails and captions published through the app are created by MR Quest Technologies for Quest Academy. MR Quest Technologies is responsible for this content.</p>
<h2>5. Privacy</h2>
<p>See our <a href="privacy.html">Privacy Policy</a> for what data the app accesses, stores and deletes.</p>
<h2>6. Availability and changes</h2>
<p>The app is provided as is for internal use. We may change or stop it at any time and will update these terms on this page.</p>
<h2>7. Governing law</h2>
<p>These terms are governed by the laws of India; courts in Bengaluru, Karnataka have jurisdiction.</p>
<h2>8. Contact</h2>
<p><a href="mailto:info@mrts.solutions">info@mrts.solutions</a></p>
</div>''')

def dashboard():
    rows = list(csv.DictReader(open(R / 'queue' / 'topics.csv')))
    ist = ZoneInfo('Asia/Kolkata'); out = []; up = rd = 0
    for r in rows:
        u = R / 'videos' / r['slug'] / 'upload.json'; m = R / 'videos' / r['slug'] / 'meta.json'
        if not (R / 'videos' / r['slug']).exists(): continue
        rec = json.loads(u.read_text()) if u.exists() else None
        title = json.loads(m.read_text()).get('title', r['topic']) if m.exists() else r['topic']
        if rec and not rec.get('missing'):
            up += 1; st = '<span class="pill up">Uploaded</span>'
            pub = rec.get('publish_at'); when = dt.datetime.fromisoformat(pub.replace('Z', '+00:00')).astimezone(ist).strftime('%d %b, %H:%M IST') if pub else '-'
            link = f'<a href="{rec["url"]}">{rec["video_id"]}</a>'
        else:
            st = '<span class="pill rd">Ready</span>' if (R / 'videos' / r['slug'] / 'READY').exists() else '<span class="pill pd">In production</span>'
            rd += 1 if 'Ready' in st else 0; when = 'next free slot'; link = '-'
        ep = f'Ep {r["ep"]}' if r.get('ep') else ''
        out.append(f'<tr><td>{html.escape(r["category"].upper())} {ep}</td><td>{html.escape(title)}</td><td>{st}</td><td>{when}</td><td>{link}</td></tr>')
    now = dt.datetime.now(ist).strftime('%d %b %Y, %H:%M IST')
    page('dashboard.html', 'Factory dashboard', f'''
<h1>Factory dashboard</h1><p class="muted">Internal status snapshot &middot; generated {now}</p>
<p class="lead">Every lesson moves through the same pipeline: render, upload to our channel through YouTube API Services, attach thumbnail and captions, add to playlists, schedule. This page lists what has been published and what is waiting for the next upload slot.</p>
<div class="stats"><div class="stat"><b>{up}</b><span>uploaded to YouTube</span></div><div class="stat"><b>{rd}</b><span>ready, waiting for quota</span></div>
<div class="stat"><b>~2,150</b><span>API units per upload</span></div><div class="stat"><b>15</b><span>subject playlists</span></div></div>
<table><tr><th>Course</th><th>Video title</th><th>Status</th><th>Publish time</th><th>YouTube</th></tr>{''.join(out)}</table>
''')

if __name__ == '__main__':
    home(); privacy(); terms(); dashboard(); print('site built')
