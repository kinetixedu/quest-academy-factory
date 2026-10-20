# Starting a new stream (category series) in a separate session

Each stream (BBA, BCom, BCA, BSc, Engineering...) can run in its own Claude session at the same time. Everything a session needs lives in this repo, so no chat context is required.

## Read first
1. docs/STYLE-BIBLE.md, docs/ILLUSTRATIONS.md, docs/AUTHORING.md
2. worlds/<world>/ (the category's look) and the world palette line in docs/ILLUSTRATIONS.md
3. An approved reference episode: videos/mba-scientific-management-f-w-taylor/ (v2 standard) and videos/mba-introduction-to-marketing/
4. docs/series/principles-of-management.md ("Every episode must have", v2) and docs/series/agent-brief.md

## Steps
1. Write docs/series/<series-slug>.md: running story + cast (new per stream), growth arc, episode list, rules (copy the shape of docs/series/marketing-management.md).
2. `python3 tools/queue.py add-series "<Category>" "<Series name>" "Topic 1" "Topic 2" ...`
3. Generate the cast + 4-6 reusable scenes in Canva in that world's palette (docs/ILLUSTRATIONS.md), cut out with tools/cutout.py, save to assets/illustrations/<world>/ with a README section. Use a unique file prefix per stream.
4. Author Ep 1 (sample), render with tools/build.sh, send to Amjad for approval.
5. After approval: parallel subagents, 4-5 episodes each, using docs/series/agent-brief.md + a <series>-overrides.md like docs/series/marketing-overrides.md. Review every review/stills.png.
6. Commit only finished, reviewed episodes; always `git pull --rebase` before push (other sessions push too). Never touch other streams' folders.
7. Manual posting while the API quota is low: run the "Manual upload kit" workflow with the slugs, clone the `kit` branch with input branch=kit-<stream> so streams never overwrite each other, send video, thumbnail, captions + upload text.

## Rules shared by all streams
Plain hyphens only. 12-year-old language, real substance. Faceless, Kokoro voice, professional sound whitelist, brand outro. No real brands in stories. Verify every fact.
