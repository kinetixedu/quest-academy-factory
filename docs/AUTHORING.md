# Authoring run - instructions for Claude (scheduled cloud runs follow this exactly)

Goal: turn queued topics into finished, approved-style video sources and mark them READY. GitHub Actions does the rendering and YouTube upload; you write the videos.

## 0. Setup (fresh cloud session, ~3 min)
```
cd <repo> && git pull
bash tools/setup_local.sh        # installs playwright chromium, sherpa-onnx, voice model to ~/.kokoro (idempotent)
export KOKORO_DIR=~/.kokoro/kokoro-multi-lang-v1_0
```
Read docs/STYLE-BIBLE.md fully (locked rules, sound policy, outro). It is the law.

## 1. Claim work
`python3 tools/queue.py next N` (N = topics this run, default 8). It prints slug, world, topic and marks them authoring. Commit + push the queue immediately (`git commit -am "claim" && git push`) so parallel runs never take the same topic. If the push conflicts: `git pull --rebase` and re-run `next` for anything already claimed by someone else.

## 2. Author in parallel
Spawn one subagent per topic (up to 4 at once; more queue behind). Each subagent gets this brief:

> Make the Quest Academy video for "<topic>" in world `<world>`. Folder: videos/<slug>/.
> 0. If the topic belongs to a series (queue `next` prints series/ep/next_topic), read docs/series/<series-slug>.md first - it names the reference episode to copy and the running story canon. Series episodes follow that reference episode instead of worlds/<world>/ for structure (same world styling).
> 1. Read docs/STYLE-BIBLE.md and the approved reference worlds/<world>/ (index.html, scene.js, script.txt) completely. Copy the reference index.html structure, CSS tokens, fonts, components, transition, quiz and outro exactly. Only content changes.
> 2. Research facts if the topic has numbers, dates, names (web search; cite source + date on screen for case studies). Never invent statistics; label illustrative numbers "Example".
> 3. Write videos/<slug>/script.txt (format ID|pause|text, 2-3 min, 12-year-old level, hook -> one example carried through -> steps -> quick check Q1 (pause 1.7) / A1 -> recap). Run `python3 tools/tts.py videos/<slug>`.
> 4. Write index.html + scene.js. All timing from M.wt/M.t0 cues. Keep `<script src="../../engine/outro.js">` and the `M.outro({...})` call (it holds the last scene; the brand outro video is appended automatically at build). Keep the top-right corner clear for the corner logo. Sounds: only whoosh (scene changes), tick (countdown), correct (answer); nothing else.
> 5. Case Study mode: source real freely licensed colour photos (Wikimedia Commons) into videos/<slug>/img, cut out with rembg where needed, write videos/<slug>/assets.js and pass credits to M.outro.
> 6. Check with stills: `node tools/probe.js videos/<slug> /tmp/<slug>.png t1 t2 ...` (12+ times incl. every scene, mid-transitions, quiz, final hold). LOOK at them. Fix overlaps, misalignment, empty frames, text touching edges, anything see-through. Repeat until it meets the bible. Zero PAGE ERRORS.
> 7. Write videos/<slug>/meta.json:
>    {"world","topic","title" (<= 70 chars, "<Topic> Explained Simply | <Category>" style, no clickbait, no emojis),
>     "description" (2-3 short paragraphs + chapter timestamps from cues + "Video by Quest Academy." + photo credits if any),
>     "tags" (8-15 specific search terms), "thumb": {"title" (2-5 words), "accent_word", "frame_t" (a seconds value showing the signature visual fully built)}}
> 8. Do NOT render the full video. Report done + any compromise.

## 3. Finish
For each finished topic: `node tools/thumb.js videos/<slug>` once and LOOK at thumbnail.jpg (fix thumb title/frame_t if weak), then delete thumb_frame.jpg/thumbnail.jpg (Actions rebuilds them), `python3 tools/queue.py ready <slug>`. Commit sources (not wav/mp4) and push. The push triggers GitHub Actions: build + upload + schedule.
If a topic cannot be done well (e.g. no usable photos for a case study), set its status to `failed` in queue/topics.csv with a note in the slug folder (NOTE.md) instead of shipping something weak.

## 4. Report
End with a short summary: topics marked ready, any failed and why. (The user sees this run in their scheduled-task history.)
