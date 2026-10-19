# Brief v2: re-author episodes of "Principles of Management" (MBA, Quest Academy)

Repo: /home/claude/quest-academy-factory (node_modules, Kokoro voice, Playwright ready). The machine has 2 CPUs and other agents share it: run one probe/tts at a time, never in background loops.
Amjad (the client) approved Ep 08 v2 and rates harshly. Every episode must look made by the same hand as Ep 08 v2: same world, components, spacing, motion, polish, and the same depth. No AI slop: no filler, no generic stock layouts, no decorative junk, no emoji, no em/en dashes (plain hyphens only).

## Read first (fully)
1. `docs/series/principles-of-management.md` - canon (Chai Corner, cast, growth arc), the **v2 "Every episode must have" list**, and the library assets for your episode.
2. `videos/mba-scientific-management-f-w-taylor/` - **THE reference (Ep 08 v2)**: `script.txt`, `index.html`, `scene.js`, `meta.json`, and `review/stills.png` if present. Study especially:
   - illustration cards (`#ill`, `#zA`, `#xw`: label + `<img>` cutout 600x450 at left 92 top 100 inside a 784 card) and the `grow()` helper (a lone card starts 1600 wide and shrinks to 784 when its sibling arrives),
   - the animated process (`runWay()`: floor plan svg, moving face avatar, dotted trail, stopwatch, timeline bar, step pill),
   - the standard demo (recipe steps + six cups morphing to one time),
   - the "At work today" list + panes (`#kl/#kp`, `.kr`, `.ka` rows: AT CHAI CORNER / AT WORK TODAY),
   - the human side (balance scale with good/hard chips, historical card, lesson strip),
   - face avatars (`.av.face` with `-face.jpg`, ring colour = state).
3. `docs/ILLUSTRATIONS.md` and `assets/illustrations/mba/README.md` - what images exist and how to show them.
4. `docs/STYLE-BIBLE.md` sections "Every video", "Layout rules", "Motion rules", "SOUND POLICY". `engine/core.js` API (skim).
5. Your episode's current folder (v1) - reuse its verified facts and story beats where good, but rewrite to v2.

## Make (overwrite in place): `videos/<slug>/` script.txt, index.html, scene.js, meta.json
1. **script.txt** (`ID|pause_after_seconds|text`), **3:00 - 4:00** of voice. Order: hook -> illustrated intro/story -> definition -> animated process -> concept diagrams (+ one navy statement punch line) -> At work today (each key element: Chai Corner example on screen + one real workplace example narrated) -> the human side / limits (balanced, one line lesson) -> `Q1` (pause 1.9, "Quick check. ... ?") -> `A1` (answer word first + reason) -> `S1` "So, remember." + `S2..S4` -> `N1` "Next time, ..." (Ep 28: "That's the full series. ..." and a SERIES COMPLETE strip). One idea per line, short sentences, 12-year-old words, MBA-level substance. Explain jargon the moment it appears. Facts must be correct: verify names, dates, numbers with web search; if a fact cannot be confirmed, leave it out. Illustrative numbers -> ghost chip "EXAMPLE FIGURES". Respect canon (who runs what, which outlet, when).
   Then `python3 tools/tts.py videos/<slug>` and read cues.json.
2. **index.html + scene.js**: start from copies of the Ep 08 v2 files (keep the head, the full CSS block incl. the v2 block, helpers `wrap`, `grow`, `snap`, `setIco`, `sweepX`, camera, captions, title travel, quiz, recap, NEXT strip, outro call). Replace content scenes with your own. Rules:
   - Eyebrow `EP NN · PRINCIPLES OF MANAGEMENT`; title = topic (accent word gold); `#sub` short variant of "Explained with one chai stall".
   - Use the library images listed for your episode (thinker portrait as the intro card if there is one; 1-2 scenes for storytelling); cast faces wherever the cast appears. Never stretch an image; never put text over a face; name labels are Poppins pills. If your story truly needs an image that does not exist, do NOT draw a fake one - note it in your report and use a diagram instead.
   - **Animate the actual process at least once** (a real sequence moving on screen: steps, flows, paths, timers, before/after run). Cards alone are not enough.
   - Every beat timed from `M.t0/M.t1/M.wt` (never hardcoded seconds for content). Something meaningful changes every 2-4 s; no dead frames; no empty or sparse cards (a lone card starts full width via `grow()` or gets a meaningful sibling, e.g. the Ep 08 stopwatch card).
   - Layout: safe area x 160-1760, content y 260-860, header chip top 96, title top ~156, captions box at top 944 never covers content, 32 px gutters (2 cards = 784 px, 3 = 512 px), >= 32 px padding inside cards, nothing overlaps, top-right 140x110 kept clear (corner logo). Single-line text `white-space:nowrap` and must fit; auto-fit long titles in `measure()`.
   - Type sizes as Ep 08 (card titles 40-84 px, body 24-32 px, labels 16-18 px letter-spaced).
   - Transitions: navy page-turn sweep only for the statement, the quiz and the recap; elsewhere standard `vis/rise` outs.
   - Sounds: only `M.sfx(t,'whoosh',0.22)` on the 3 sweeps, 3 ticks (0.28) for the countdown, `correct` (0.32) on the answer.
   - Extra icons via `Object.assign(M.IC, {...})` in your scene.js (24-unit lucide-style). Never edit engine/, tools/, worlds/, assets/ or other episodes.
3. **Check with stills until clean** (most important): `node tools/probe.js videos/<slug> /tmp/<slug>-a.png t1 ... t9` (9 per sheet), `BIG=1` for full-size detail. Cover every scene, mid-transitions, the process animation at several moments, the quiz (before, countdown, answer), recap and the last frame. LOOK at every sheet. Fix overlaps, clipping, misalignment, uneven gaps, sparse/dead frames, captions over content, see-through layers, console errors and "word not found" warnings. Expect 3-6 rounds. Save a final 18-still sheet to `videos/<slug>/review/stills.png`.
4. **meta.json** like Ep 08: world "mba", topic, series {name, ep}, title (<= 70 chars, `<curiosity title> | Principles of Management Ep N`), description (2-3 short paragraphs, Chai Corner framing, what the viewer will see incl. the workplace examples and the human side, chapter timestamps from cues.json as m:ss, "Next episode: ..." line, "Video by Quest Academy."), 10-14 specific tags, thumb {title 2-5 words, accent_word, frame_t where an illustration + diagram are fully built}. Then `node tools/thumb.js videos/<slug>`, LOOK at thumbnail.jpg, fix if weak, then delete `videos/<slug>/thumb_frame.jpg` and `videos/<slug>/thumbnail.jpg`.
5. Do NOT render the full video, do NOT git commit, do NOT touch queue/, config/ or other folders.

## Report back (short, per episode)
Episode + slug, voice duration, illustrations used, the process you animated, the workplace examples, the human-side point, facts verified (with source), anything unsure, any missing image you wanted.
