# Brief: author one episode of "Principles of Management" (MBA, Quest Academy)

Repo: /home/claude/quest-academy-factory (already set up: node_modules, Kokoro voice at the default path, Playwright).
Amjad (the client) approved Ep 01 and rates harshly. Your episode must look like it was made by the same hand as Ep 01: same world, same components, same spacing, same motion, same polish. No AI slop: no filler phrases, no generic stock layouts, no decorative junk, no emoji, no em/en dashes (plain hyphens only).

## Read first (fully)
1. `docs/series/principles-of-management.md` - series canon (Chai Corner story, characters, growth arc, episode rules).
2. `videos/mba-introduction-to-management/` - THE reference: `script.txt`, `index.html`, `scene.js`, `meta.json`. Copy its CSS block, components (chip, title->header travel, cards `.card`, label `.lbl`, pills, navy statement sweep, ring/cycle, before/after bars, team cards, quiz, recap rows, NEXT strip), springs and timing patterns. Change only content.
3. `docs/STYLE-BIBLE.md` sections "Every video", "Layout rules", "Motion rules", "SOUND POLICY".
4. `engine/core.js` (API) - skim.

## Make: `videos/<slug>/`
1. **script.txt** (`ID|pause_after_seconds|text`). 2:00-2:45 of voice. Structure:
   - Hook (2 lines, Chai Corner problem the topic solves, first 5 s). Story beats, then a short navy statement punch line (one line).
   - Definition (plain words; if a known thinker defined it, quote correctly and attribute).
   - Concept step by step: every key word visualised. One idea per line, short sentences, 12-year-old words. Explain jargon the moment it appears.
   - Quick check line `Q1` with pause 1.9 ("Quick check. ... ?"), answer line `A1` starting with the answer word and a reason.
   - Recap: `S1` "So, remember." + exactly three `S2..S4` lines.
   - `N1`: "Next time, ..." teasing the next episode topic (given in your task). Ep 28 instead: "That's the full series. ..." (no NEXT strip; show a "SERIES COMPLETE" strip instead).
   - Facts must be correct (dates, names, numbers). Use web search to verify anything you are not certain of. Illustrative numbers -> show the ghost chip "EXAMPLE FIGURES".
   Then run `python3 tools/tts.py videos/<slug>` and read cues.json.
2. **index.html + scene.js** - start from copies of the Ep 01 files, keep the head/CSS block and all reusable component CSS, replace scenes with your own. Rules:
   - Eyebrow: `EP NN · PRINCIPLES OF MANAGEMENT`; title = topic (title-case, accent word in gold); `#sub` "Explained with one chai stall" (or a short variant). Title auto-fits (measure() already handles width).
   - Every content beat timed from `M.t0/M.t1/M.wt` (never hardcoded seconds for content). Something meaningful changes every 2-4 s; no dead frames; no empty cards.
   - Layout: safe area x 160-1760, content y 260-860 (header chip top 96, title top ~156), captions box at top 944 must never cover content, equal 32 px gutters, cards align to the same left/right edges as the header, text never touches card edges (>= 32 px padding), nothing overlaps, top-right 140x110 kept clear (corner logo). Single-line text uses `white-space:nowrap` and must fit; multi-line text = separate line elements.
   - Scale: fill the content area y 260-860 with full-size cards at Ep 01 type sizes (card titles 40-56px serif, body 26-32px, labels 17-18px), spanning the full 1600px width with 32px gutters (2 cards = 784px, 3 = 512px). No small floating cards, no empty bottom third. A lone card that will later get a sibling starts full width and shrinks smoothly.
   - Use 1-2 "hero" visuals per episode that are specific to the topic (e.g. a pyramid for levels, a timeline for evolution, a stopwatch + shovel for Taylor, an org chart, a scale for centralization) drawn in the same flat navy/gold/cream style as the Chai Corner stall. Reuse Ravi/Asha/Kabir/Meena avatars (letter circles) and the stall illustration where it helps.
   - Transitions: the navy page-turn sweep for the statement, the quiz and the recap; elsewhere scenes exit with the standard `vis/rise` outs.
   - Sounds: only `M.sfx(t,'whoosh',0.22)` on the 3 sweeps, 3 ticks (0.28) for the countdown, `correct` (0.32) on the answer. Nothing else.
   - End with the same `M.outro({...})` call as Ep 01 (the brand outro video is appended automatically at render time - do not draw an end card).
   - Add any extra icons via `Object.assign(M.IC, {...})` inside your scene.js (24-unit lucide-style paths, stroke 2-2.2). Never edit engine/, tools/, worlds/ or other episodes.
3. **Check with stills until clean** (this is the most important step):
   `node tools/probe.js videos/<slug> /tmp/<slug>-a.png t1 t2 ... t9` (9 per sheet). Cover every scene, mid-transitions, the quiz (before, countdown, answer), recap, and the last frame. Use `BIG=1` with 1-3 times to inspect details at full size. LOOK at every sheet with the Read tool. Fix: overlaps, text clipping, misalignment, uneven gaps, empty/dead frames, captions covering content, anything see-through, console errors (PAGE ERRORS / "word not found" warnings). Repeat until every frame is genuinely beautiful. Expect 3-6 rounds.
   When done, save a final 18-still review sheet to `videos/<slug>/review/stills.png` (two probe sheets stacked is fine, or one call with 18 times if supported).
4. **meta.json** like Ep 01: world "mba", topic, `"series": {"name": "Principles of Management", "ep": N}`, title (<= 70 chars, `<curiosity title> | Principles of Management Ep N`, no clickbait, no emoji), description (2-3 short paragraphs, Chai Corner framing, chapter timestamps from cues.json as m:ss, "Next episode: ..." line, "Video by Quest Academy."), 10-14 specific tags, thumb {title 2-5 words, accent_word, frame_t = a time where the signature visual is fully built and readable}.
   Then `node tools/thumb.js videos/<slug>`, LOOK at thumbnail.jpg (headline must not collide with the frame image; fix thumb.title/frame_t if weak), then delete `videos/<slug>/thumb_frame.jpg` and `videos/<slug>/thumbnail.jpg`.
5. Do NOT render the full video, do NOT git commit, do NOT touch queue/ or other folders.

## Report back (short)
Episode number + slug, voice duration, the hero visuals you built, any fact you verified (with source), and anything you are unsure about.
