# worlds/puc - the "Lab Notebook" world (all PUC subjects)

One look for PUC Physics, Chemistry, Maths, Biology and Electronics; each subject only changes the accent (`PUC.init({subject})`) and its own editing style (docs/series/PUC.md). Owned by the PUC Physics session: other sessions reuse it and never edit it (ask the PUC Physics session for changes).

Files
- `puc.css` - page, grid, cards (6 px accent top edge), type (Poppins, IBM Plex Mono for every number), header, readout, avatar, exam components, page turn, captions.
- `puc.js` - `window.PUC` component library (pure functions of t, like engine/core.js).
- `katex/` - KaTeX 0.16 bundled locally (min js/css + woff2 fonts, MIT licence). Never load from a CDN.
- `index.html`, `scene.js`, `script.txt`, cues - a 40 s working sample (free fall) that uses every component. Copy its head and script tags.

Load order in an episode index.html (videos/<slug>/):
```html
<link rel="stylesheet" href="../../engine/base.css">
<link rel="stylesheet" href="../../worlds/puc/katex/katex.min.css">
<link rel="stylesheet" href="../../worlds/puc/puc.css">
...
<script src="cues.js"></script>
<script src="../../engine/core.js"></script>
<script src="../../engine/outro.js"></script>
<script src="../../worlds/puc/katex/katex.min.js"></script>
<script src="../../worlds/puc/puc.js"></script>
<script src="scene.js"></script>
<script>M.start()</script>
```
Stage skeleton: `#stage > .edge, #cam (> #nchip, #subj, #title, #sub, #rule, scenes...), #stmt?, #sweep>b, #prog>i, .cap#cap` (see index.html).

Layout (factory grid, so captions and the corner logo fit): safe x 160-1760, NCERT chip top 96, title top 156 (56 px after the travel), subject pill right-aligned at 1760, content y 260-860, captions at top 944, top-right 140x110 clear. Two cards = 784 px each with a 32 px gutter. The puc-samples frames used 80 px margins as stills; in video the grid above wins.

API (`PUC.`)
- `init({subject})` sets `--ac`, returns colours `C` (ink, mute, red, ok, ac, ac2, violet, orange, teal, gold...). Colour-coding: pick one colour per quantity and use it for the arrow, the readout and the symbol in the formula (`\textcolor{#hex}{v}`).
- `K(tex, display)` KaTeX to HTML. Variables italic (default), units upright with `\text{m/s}`.
- `header({tMorph, tTitle, tOut})` -> fn(t): title card to header travel with the NCERT chip (`#nchip`) and subject pill (`#subj`).
- `write(el, t, t0, dur)` pen-style left-to-right write-on for formulas and labels.
- `sweepRun([[tIn, tOut], ...])` notebook page turn with the accent strip (statement, quiz, recap only). Pair each with `M.sfx(tIn - 0.38, 'whoosh', 0.22)`.
- `graph(svg, {x, y, w, h, xmax, ymin, ymax, xt, yt, xl, yl})` -> `{X, Y, curve(col)(fn, s0, s1), dot(col)(x, y, on)}`: live x-t / v-t graphs linked to the sim.
- `arrow(svg, colour)` -> `.set(x1, y1, x2, y2)`: force and velocity vectors that grow from the object.
- `avatar(host, {x, y, who, face, text})` -> fn(t, tin, tout): small face + bubble reaction.
- Exam segment (identical in every subject):
  - `trap(card, {wrong, right})` -> fn(t, {tin, tWrong, tStrike, tRight})
  - `where(card, {on: [...verified only], type})` -> fn(t, {tin, tLight: [...], tType}). Chips: JEE MAIN, JEE ADVANCED, NEET, PUC BOARDS. Light only what past-paper analysis verifies; otherwise light none and give only the type of question.
  - `mcq(card, {pat, q, opts, right, qW, optW, optY})` -> fn(t, {tin, tOpts, tCount, tAns}). 5-second ring from tCount (set the Q line's pause so tAns >= tCount + 5). Sound: `PUC.mcqSfx(tCount, tAns)` (3 ticks on the last 3 seconds + correct chime).
  - `solution(card, [[html], ...], {dy})` -> fn(t, tin, [times]).
  - `fcard(host, {x, y, w, h, title, lines})` -> fn(t, {tin, tLines, tShot}): pinned formula card with "SCREENSHOT THIS", hold 3 s.
  - `next(host, {label, topic})` -> fn(t, tin).

Sound whitelist only (whoosh on page turns, 3 ticks, correct). No music. Brand outro via `M.outro({})` (appended at build).
