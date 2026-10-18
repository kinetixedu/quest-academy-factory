# Quest Academy video factory

Turns topic lists into finished, branded explainer videos and publishes them to YouTube on a schedule - fully in the cloud.

```
topics (queue/topics.csv)
  -> scheduled Claude runs write each video in its locked category style   (docs/AUTHORING.md, docs/STYLE-BIBLE.md)
  -> GitHub Actions renders them in parallel (voice, motion graphics, captions, thumbnail)
  -> uploads to YouTube: title, description, tags, English subtitles, thumbnail, category playlist, scheduled publish time
```

## Adding topics
Easiest: tell Claude in chat, e.g. "Add to the queue: MBA - SWOT Analysis, Porter's Five Forces; Engg Civil - Retaining walls".
Or edit `queue/topics.csv` on GitHub (status `pending`), or run:
`python3 tools/queue.py add "MBA" "SWOT Analysis" "Engg Civil" "Retaining walls"`

Categories: MBA, BBA, BCom, BCA, BSc Physics, BSc Chemistry, BSc Maths, BSc Biology, BSc Computer Science,
Engineering CS / Mechanical / Electronics / Electrical / Civil / Chemical, Case Studies. Each has its own approved look (worlds/).

`python3 tools/queue.py status` shows progress per category. Uploaded rows get their YouTube link.

## Schedule and volume
`config/schedule.json`: daily publish slots (IST) and how many uploads per run. YouTube's default API quota allows about
4 uploads a day; raise `max_uploads_per_run` and add slots once Google approves a quota increase.

## One-time YouTube setup (owner only)
1. Google Cloud console -> new project "Quest Academy Factory" -> enable **YouTube Data API v3**.
2. OAuth consent screen: External, app name "Quest Academy Factory", add your email as a test user, scopes
   `youtube.upload` and `youtube.force-ssl`. Then **Publish app** (in production) so the token does not expire after 7 days.
3. Credentials -> Create OAuth client ID -> type **Web application**, authorised redirect URI
   `https://developers.google.com/oauthplayground`. Copy the client ID and secret.
4. Open https://developers.google.com/oauthplayground -> gear icon -> "Use your own OAuth credentials" -> paste them.
   In step 1 enter the two scopes above, Authorize with the Quest Academy channel's Google account, step 2 "Exchange
   authorization code for tokens", copy the **refresh token**.
5. GitHub repo -> Settings -> Secrets and variables -> Actions -> add `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`.
6. Apply for the YouTube API Services audit + quota increase (form linked from the YouTube API quota page). Until it is
   approved YouTube keeps API uploads **private**, even when a publish time is set.

## Running locally (optional)
`bash tools/setup_local.sh && tools/build.sh videos/<slug>` builds one video into videos/<slug>/final.mp4.
