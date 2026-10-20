# Quest Academy factory - rules for every Claude session

Owner: Amjad (MR Quest Technologies). Channel: Quest Academy (YouTube). This repo turns topic lists into faceless animated explainer videos (HTML seek(t) engine + Kokoro voice), renders them and uploads them.

## Start of every session
```
cd quest-academy-factory && git pull --rebase origin main
bash tools/setup_local.sh
export KOKORO_DIR=~/.kokoro/kokoro-multi-lang-v1_0
```
Then read, in order: docs/STYLE-BIBLE.md, docs/ILLUSTRATIONS.md, docs/AUTHORING.md, docs/NEW-STREAM.md, docs/series/agent-brief.md, plus your own stream's docs/series/<series>.md once it exists.

## Reference episodes (the quality bar)
- videos/mba-scientific-management-f-w-taylor/ (v2 standard)
- videos/mba-introduction-to-marketing/ (new series Ep 1 pattern)
- PUC only: docs/series/PUC.md and the frames in docs/series/puc-samples/

## Hard rules
- Plain hyphens only, never em or en dashes, in scripts, titles, captions and docs.
- A 12-year-old must follow every line; the real academic substance stays underneath.
- Faceless. Kokoro voice. Sound whitelist and brand outro from STYLE-BIBLE. No music.
- No real brands in stories. Real people (scientists, thinkers) only as text or quote cards, never fake portraits. Every fact, date, constant and value verified.
- Illustrative numbers carry the ghost chip "EXAMPLE FIGURES".
- Secrets: Amjad pastes keys into GitHub secrets himself. Never put a key, token or password in chat, code, URLs or commits. Never type credentials anywhere.
- Uploads are paused (config/schedule.json "paused": true) while the YouTube quota is low. Never unpause. Never run the upload job. Only the lead (MBA) session handles uploads.

## Working alongside other sessions (many sessions push to this repo)
- Touch only your own stream: your docs/series files, your videos/<world>-* folders, your assets/illustrations/<world>/ files with your unique prefix.
- Shared files you may append to: queue/topics.csv (your rows only), config/categories.json (new categories only), assets READMEs (your section only).
- Before every push: `git pull --rebase --autostash origin main`. On a topics.csv conflict keep both sides' rows, then `git rebase --continue`.
- Commit only reviewed episodes (look at every review/stills.png). Work in progress may be committed as "WIP <stream>" because uploads are paused.
- Manual posting: run the "Manual upload kit" workflow (kit.yml) with your slugs and branch kit-<stream>, clone that branch, send Amjad each video, thumbnail, captions (.srt) and the upload text (title, description, tags).

## How to work with Amjad
- Work without asking for small approvals. Ask only for: the story/cast choice, Ep 1 sample approval, anything that cannot be undone.
- Send drafts as soon as they are useful. Short updates, no recaps.
- He likes ready-to-paste prompts in terse "caveman" style.
- Machine has 2 CPUs: run TTS and renders one at a time; parallel agents author, they do not all render at once.
