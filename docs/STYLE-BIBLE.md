# Quest Academy video system - STYLE BIBLE (LOCKED 18 Oct 2026)

Status: ALL 15 subject worlds + Case Study mode APPROVED by Amjad and locked. Do not redesign a world; follow its sample exactly (worlds/<id>/ holds the full approved code) and only change content.

## How Amjad asks for a video
"<Category>: <topic>" e.g. "MBA: SWOT Analysis", "Engg Civil: Retaining walls", "BSc Physics: Ohm's law", "Case study: Zomato".
Category -> world id -> reference doc:
- MBA -> mba (Boardroom)            - BBA -> bba (Campus startup)      - BCom -> bcom (Ledger book)
- BCA -> bca (Code studio)          - BSc Physics -> bsc-physics       - BSc Chemistry -> bsc-chem
- BSc Maths -> bsc-maths            - BSc Biology -> bsc-bio           - BSc Computer Science -> bsc-cs
- Engg CS -> engg-cs                - Engg Mechanical -> engg-mech     - Engg Electronics -> engg-electronics
- Engg Electrical/EEE -> engg-electrical - Engg Civil -> engg-civil    - Engg Chemical -> engg-chemical
- Case study (company/brand/business story, any business category) -> case (Case Study mode, reference worlds/case/)
If a category is not listed, ask before inventing a new world.

## Every video (non-negotiable)
- 1920x1080, 30 fps, 2-3 min (case studies may run 3-5 min), explained so a 12-year-old follows. English, Kokoro Michael (sid 16, speed 0.9).
- Structure: hook in first 5 s -> one real example carried through -> concept step by step -> quick check (question, options, 3-2-1 countdown during the pause, answer reveal, takeaway strip) -> 10-15 s recap -> OUTRO.
- OUTRO (every video, every world): last ~4 s, "Video by Quest Academy" card, styled in that world's palette/type (engine/outro.js, M.outro). Nothing after it.
- Layout: 12-col grid, safe area x 160-1760, content y 260-860, captions clear of the bottom, equal gutters, solid (never see-through) inactive elements, nothing touching edges, no em/en dashes on screen, Indian number format, facts sourced (case studies cite source + date on screen).
- Motion: springs damping >= 0.72, one thing moves at a time, no frozen frames except the final outro hold, no sub-pixel drift on still text (no slow camera drifts).
- Photos: real, freely licensed (Wikimedia Commons via browser pane), credited on the outro; full colour in Case Study mode.

## SOUND POLICY (professional, replaces earlier per-world SFX lists)
No music. No pops, clicks, blips, stamps, bubbles, zaps, keys or decorative hits. Allowed ONLY:
1. soft "whoosh" on a major scene change (max ~1 per 15 s, gain <= 0.25)
2. soft "tick" x3 for the quiz countdown (gain <= 0.3)
3. one gentle "correct" chime on the answer reveal (gain <= 0.35)
4. one soft "chime" under the outro logo (gain <= 0.25)
audio.py enforces this whitelist (anything else is dropped) and mixes SFX ~16 dB under the voice, -14 LUFS.

## Factory (bulk production)
Topic lists go in the factory repo queue; cloud runs author videos per this bible, GitHub Actions renders, makes SRT + thumbnail + metadata and uploads to the matching YouTube playlist on a schedule. See README.md and docs/AUTHORING.md.

---
# Quest worlds - style samples brief

We are making ONE 20-25 s style sample per category ("world") for student explainer videos. Each sample is a real micro-lesson
(voice + captions + motion graphics) that shows that world's look and motion language. The user approves each world, then it is
locked and reused for full 2-3 min videos. Audience: explained so a 12-year-old follows. Quality bar: premium, Apple/Linear-level
motion design, NOT template-looking. The reference sample is `samples/mba/` (read `index.html` + `scene.js` fully before starting).

## Folder per world: `samples/<id>/`
- `script.txt` - given below, copy it exactly (format `ID|pause_after_seconds|text`).
- `index.html` - markup + world CSS (same skeleton as MBA: `#stage` > `#cam` world container, `#prog`, `.cap#cap`; loads `cues.js`, `../../engine/core.js`, `scene.js`, then `M.start()`).
- `scene.js` - all animation as a pure function of t inside `M.on(t => {...})`, plus `M.sfx(...)` cue declarations.
- Generated (do not hand-edit): `voice.wav`, `cues.json`, `cues.js` via `python3 tools/tts.py samples/<id>` (run from /home/claude/worlds).

## Engine API (`engine/core.js`, read it)
- Timing comes from the voice: `M.t0('P1')`, `M.t1('P1')`, `M.wt('P1','Price')` (time a word starts). Every state change lands on a spoken word or line start. Never hardcode seconds for content beats.
- `M.rise(el,t,t0,{st,sp,out,outDur})` masked word-by-word text rise. `M.vis(el,t,tin,tout,{dx,dy,sc,sp,fade,outDur,odx,ody,osc,blur})` entrance/exit with springs. `M.draw(svgEl,t,t0,dur)` / `M.drawU(el,u)` stroke draw-on. `M.count(...)` counters. `M.spring(tau,sp)`, `M.track(v0,[[t,v,sp]])`, `M.keys`, `M.mix(c1,c2,u)` colours, `M.io/o3/o5` easings. Springs: `M.SNAP M.SOFT M.HEAVY M.POP M.CAM`.
- `M.camera(el,[[t,zoom,cx,cy,sp?],...])` - first key = starting framing. Use only for purposeful moves that SETTLE (no slow drifts: they make text shimmer).
- `M.captions(box, M.CUES.order)` karaoke captions; style `.cap .cw / .cw.on / .cw.act` per world. Caption box sits at top 944 (keep content above y=880).
- `M.icon(name,size,colour,stroke)` line icons (see `M.IC`), add your own 24-unit paths if needed (keep one stroke width per world).
- `M.sfx(t, name, gain, pan)` - sounds available in `tools/audio.py`: whoosh swish pop tick click key key:N ding chime correct wrong thud paper stamp zap hum bubble bubble:N clunk ratchet riser sparkle blip drip. Use a small, clean set that fits the world (memory: the user hated random/loud background sounds; no music). Typical gains 0.25-0.6.
- Fonts available by family name (see `engine/base.css`): Fraunces, Inter, JetBrains Mono, Space Grotesk, Manrope, Instrument Serif (+italic), Lexend, Space Mono, IBM Plex Mono, IBM Plex Sans, Barlow, Barlow Condensed, Chakra Petch, Archivo (wdth 62-125), Sora, Caveat, Outfit, Source Serif 4, Architects Daughter, Plus Jakarta Sans, Poppins.

## Sample structure (same for every world, so worlds compare fairly)
1. Title card (H1 hook voiced over it): category chip + topic title + one detail line, in the world's typographic style. The title then TRAVELS into the header (shared element, never cut), as in MBA.
2. Concept scene: the world's signature visual explains the idea, one clear change per voice line (or per key word). Something changes every 2-4 s, no dead air, no blank screens.
3. World transition (the world's own signature transition) into the Quick check: question, 2-4 options, a 3-2-1 countdown during the Q1 pause (Q1.t1 -> A1.t0), answer reveal on A1, then a one-line takeaway strip.
4. Hold ~1.2 s at the end (window.TAIL defaults to 1.2).

## Layout rules (non-negotiable - the user cares most about this)
- 1920x1080. Safe area x 160-1760, content y 260-860, header: chip top 96, heading top ~150. 12-col grid: `M.col(c)` = 160 + c*136, `M.span(n)` = n*104 + (n-1)*32.
- Equal gutters (32 px between cards), consistent card padding (32-40 px), nothing touching card edges, text never overlaps anything, every block aligned to the grid. Left edges line up across header and content.
- Inactive/placeholder elements are SOLID (never see-through stacks); state changes by colour, not by transparency layering.
- Type big enough for a phone: body >= 26 px, labels >= 18 px, headings 48-76 px.
- No em/en dashes in any on-screen text. ₹ for money. Example numbers labelled as examples where they could be mistaken for facts.

## Motion rules
- Springs, damping >= 0.72, tiny overshoot max. No cartoon bounce, no linear moves (except constant rotation of a gear/fan or flow dashes that are physically continuous).
- One thing moves at a time (plus at most a secondary detail). Elements finish animating then stay readable.
- No particles, no glows on UI chrome, no rainbow gradients, no emoji, no gratuitous 3D flips. Determinism: never Math.random (use `M.rng(seed)`).
- Snap settled transforms to exact values (the engine helpers already do; for your own transforms, write 'none' or exact numbers once settled) - sub-pixel jitter on static text is the #1 thing the user complained about before.
- `#stage svg *` uses transform-origin 0 0 (SVG default); for SVG groups use the `transform` attribute with explicit translate/rotate centres.

## Workflow for each world
1. `mkdir samples/<id>`, write script.txt, run tts, read cues.json (line start times).
2. Write index.html + scene.js. 3. Check stills: `node tools/probe.js samples/<id> <scratch>/x.png t1 t2 ...` (9-12 times covering every beat incl. mid-transition frames) and LOOK at the sheet with Read; for detail use `BIG=1` with 1-3 times. Fix alignment/overlaps/dead frames. Repeat until it is genuinely beautiful and every element sits on the grid. Check the console output for PAGE ERRORS.
4. Do NOT run tools/render.js or tools/audio.py (CPU is shared; the lead renders). Report: world id, file list, any compromises.
Scratch dir for your sheets: /tmp/claude-0/-home-claude/3dfeb631-c985-51bc-bbf4-2b672886c1f3/scratchpad/<id>/

---
# The worlds (spec per id)

## bba - "Campus startup" (BBA)
Vibe: young, bright, energetic, friendly but still clean. Look: warm cream #FFF7EE, deep plum ink #2A1B3D, coral accent #FF6B4A, mint #7FD8C4 secondary only for "good" states. Type: Plus Jakarta Sans 800 headings (tight tracking), 500 body. Shapes: chunky rounded cards (radius 32), sticker-like labels with a 2-3 deg tilt that settles to a small fixed tilt, a corkboard-free "sticky note" device for examples. Motion: snappy (M.SNAP / M.POP), items pop and settle, slight tilt springs. Signature visual: two sorting bins/columns where items (drawn with simple SVG icons) get sorted. Transition: coral circle iris that grows from the active element to cover, then shrinks into the quiz. SFX: pop, blip, swish, correct.
Topic: Needs vs Wants.
```
H1|0.35|Why do you buy some things and skip others?
H2|0.5|It starts with needs and wants.
N1|0.3|Needs are things you must have, like food and water.
N2|0.3|Wants are nice extras, like a new phone cover.
N3|0.6|Businesses sell both, but needs always come first.
Q1|1.7|Quick check. Is a school bag a need or a want?
A1|0.2|A need! You use it every single day.
```

## bcom - "Ledger book" (BCom)
Vibe: precise, trustworthy, classic accounting book. Look: ledger paper #FBF8F1 with faint blue ruled lines (#DCE5F0) and a thin red margin line (#D9534F), ink #1D2B3A, ledger green #2F6B4F accent, red only for "owes". Type: Source Serif 4 600 headings, IBM Plex Mono for every number, Inter body. Motion: numbers type in digit by digit, rows slide into ruled lines and settle exactly on them, totals get a double underline that draws on. Signature visual: a balance scale / two-sided T-account that stays level (Assets on one side, Liabilities + Capital on the other) with figures written in. Transition: the ledger page slides up like turning to the next page (horizontal ruled lines carry over). SFX: paper, key (typing digits), tick, stamp, correct.
Topic: The accounting equation (Example figures).
```
H1|0.35|How does a business know what it really owns?
H2|0.5|Accountants use one simple equation.
E1|0.3|Assets are everything the business has.
E2|0.3|Liabilities are what it owes to others.
E3|0.6|Capital is the owner's share. Assets equal liabilities plus capital.
Q1|1.7|Quick check. A shop has assets of one lakh and owes forty thousand. What is its capital?
A1|0.2|Sixty thousand! Both sides always balance.
```
(show ₹1,00,000 / ₹40,000 / ₹60,000 in Indian format)

## bca - "Code studio" (BCA)
Vibe: friendly app builder, modern developer tools. Look: dark editor #0E1116, panels #161A22, borders #252B36, text #E6EAF2, muted #7D8590, ONE accent lime #B7F34A plus restrained syntax colours (violet #C4A7FF keywords, sky #7CC7FF strings). Type: JetBrains Mono for code, Inter for UI/labels. Signature visual: an editor window (traffic-light dots, tab, line numbers) where code types in with a blinking caret (deterministic blink), next to a phone mockup app that updates live from the code. Variable = labelled box drawn next to the code. Transition: the editor window scales down into a tab/dock and the quiz window opens (window swap). SFX: key / key:N per typed character (gain low), click, blip, correct.
Topic: What is a variable?
```
H1|0.35|How does an app remember your name?
H2|0.5|It stores it in a variable.
V1|0.3|A variable is a labelled box that holds a value.
V2|0.3|Here, the box called name holds Riya.
V3|0.6|Change the value, and the app shows the new one.
Q1|1.7|Quick check. In score equals ten, what is the variable?
A1|0.2|Score! Ten is the value inside it.
```
(V3: value changes to "Arjun" and the phone greeting updates. Quiz shows code `score = 10`.)

## bsc-cs - "Bits and logic" (BSc Computer Science)
Vibe: clean Swiss minimal, theory of computing. Look: white #FFFFFF, black #111111, grey #E8E8E8 lines, signal yellow #FFD23F as the only accent. Type: Space Mono for bits/numbers, Inter 700 headings tight. Shapes: square tiles (no big radii, max 6), hairline rules, big numerals. Motion: tiles flip state with a crisp scale squash (not 3D), values tally into a total with a counter. Signature visual: a row of 4 big switch tiles labelled 8 4 2 1 that turn on/off; lit tiles yellow; a sum bar computes the decimal. Transition: a hard-edged black wipe made of 8 vertical bars that close then open (staggered). SFX: click, tick, blip, correct.
Topic: Binary numbers.
```
H1|0.35|How does a computer count with only two digits?
H2|0.5|It uses binary: just zero and one.
D1|0.3|Think of four switches. Their values are eight, four, two and one.
D2|0.3|A switch that is on adds its value.
D3|0.6|Four and one are on. So zero one zero one means five.
Q1|1.7|Quick check. What is zero one one zero in binary?
A1|0.2|Six! Four plus two.
```

## engg-cs - "Under the hood" (Engineering: Computer Science)
Vibe: inside the machine, systems and hardware. Look: deep navy #0A1022 with a fine 40px blueprint grid (#14203D), panels #101A33, cyan signal #38D9F5 (the only accent), white text, muted #6F7FA6. Type: IBM Plex Sans 600 headings, IBM Plex Mono labels. Signature visual: a block diagram (Memory, CPU with Control Unit / ALU, registers) with data PULSES travelling along connecting traces (dashes moving at constant speed is fine), blocks lighting up in sequence; a circular 3-step cycle ring Fetch -> Decode -> Execute. Transition: a scan line sweeps down and the scene re-boots into the quiz. SFX: blip, hum (very low gain), tick, zap (low), correct.
Topic: The fetch-decode-execute cycle.
```
H1|0.35|How does a computer run a program, billions of times a second?
H2|0.5|The CPU repeats three steps.
X1|0.3|Fetch: it grabs the next instruction from memory.
X2|0.3|Decode: it works out what the instruction means.
X3|0.6|Execute: it does the work, then starts again.
Q1|1.7|Quick check. Which step reads the instruction from memory?
A1|0.2|Fetch! Then decode, then execute.
```

## bsc-physics - "Motion lab" (BSc Physics)
Vibe: experiment in a dark lab, vectors and forces. Look: deep blue-black #0B1220, faint grid #16213A, chalk white text #EAF0FF, muted #7C8BAA, accent orange #FF8A3D for forces/arrows, cyan #5CC8FF for velocity. Type: Space Grotesk 600 headings, Space Grotesk 400 body, labels in IBM Plex Mono. Signature visual: a side-view track with a bus (simple SVG) and a passenger/ball; motion trails as 3-4 fading ghost copies (not particles); force/velocity ARROWS that grow from the object with labels (F, v). Physics-true motion (constant velocity is linear by nature - that is allowed here; braking decelerates). Transition: focus pull - scene blurs and scales slightly, quiz sharpens in. SFX: whoosh, thud, tick, blip, correct.
Topic: Newton's first law.
```
H1|0.35|Why do you lurch forward when a bus stops suddenly?
H2|0.5|Newton's first law explains it.
N1|0.3|An object at rest stays at rest.
N2|0.3|And a moving object keeps moving, at the same speed.
N3|0.6|Unless a force acts on it. This is called inertia.
Q1|1.7|Quick check. A ball rolls on perfectly smooth ice. What happens?
A1|0.2|It keeps rolling! No force is stopping it.
```

## bsc-chem - "Bench lab" (BSc Chemistry)
Vibe: bright clean lab bench. Look: white lab #F7FAFB, ink #10252B, teal #0FA3A3 accent, glassware outlines #9FB3B8, liquids filled flat (no gradients). Type: Manrope 800 headings, Manrope 500 body, numbers IBM Plex Mono. Signature visual: three beakers (lemon juice, water, soap) whose liquid fills and a pH SCALE bar of 15 discrete segments (0-14, standard indicator colours as flat segments) with a marker that slides to each value. Transition: liquid wipe - a flat teal liquid level rises over the screen with a small wave, then drains revealing the quiz. SFX: drip, bubble / bubble:N, tick, chime, correct.
Topic: The pH scale.
```
H1|0.35|Why does lemon juice taste sour?
H2|0.5|Because it is an acid. Chemists measure this with the pH scale.
C1|0.3|The scale runs from zero to fourteen.
C2|0.3|Below seven is acidic, like lemon juice.
C3|0.6|Seven is neutral, like pure water. Above seven is basic, like soap.
Q1|1.7|Quick check. A liquid has a pH of twelve. Acid or base?
A1|0.2|Base! It is above seven.
```

## bsc-maths - "Ink notebook" (BSc Maths)
Vibe: elegant maths notebook, calm and clever. Look: paper #FAFAF6 with a fine 32px graph grid (#ECECE4), ink #1B1B2F, accent blue #2F5BEA, red pencil #E0533D only for annotations. Type: Instrument Serif (italic for variables like x, f(x)) for maths and headings, Inter body, Caveat for small handwritten margin notes. Signature visual: a function MACHINE (clean box with input chute and output chute, rule written on it "f(x) = 2x + 1") where a number token travels in and a new one comes out; equations write on stroke by stroke (draw-on or masked reveal). Transition: notebook page slides left with the grid continuing seamlessly. SFX: tick, paper, ratchet (low, machine), ding, correct.
Topic: What is a function?
```
H1|0.35|What if a machine could turn any number into another?
H2|0.5|In maths, that machine is called a function.
F1|0.3|You put a number in, like three.
F2|0.3|The rule doubles it and adds one.
F3|0.6|Out comes seven. Same input, same output, every time.
Q1|1.7|Quick check. Put in five. What comes out?
A1|0.2|Eleven! Five doubled is ten, plus one.
```

## bsc-bio - "Living cell" (BSc Biology)
Vibe: organic, soft, alive. Look: soft sage paper #EEF3EA, deep green ink #173A2C, leaf green #4FA36A accent, warm cytoplasm #FBE6D4, nucleus plum #7B4B94 used only for the nucleus. Type: Lexend 600 headings, Lexend 400 body. Shapes: blobby organic outlines (SVG paths), membrane edges that gently breathe (slow sine, very small, deterministic). Signature visual: zoom from a leaf into a single cell (powers-of-ten camera), then labelled parts with leader lines that draw on (membrane, nucleus, mitochondria). Transition: microscope iris - a circular viewport closes to black ring and reopens on the quiz. SFX: bubble, swish, pop (soft), chime, correct.
Topic: Parts of a cell.
```
H1|0.35|What are you made of? Trillions of tiny cells.
H2|0.5|Let's zoom into one.
B1|0.3|The cell membrane is the outer wall. It controls what goes in and out.
B2|0.3|The nucleus is the control centre. It holds the instructions.
B3|0.6|Mitochondria are the power stations. They make energy.
Q1|1.7|Quick check. Which part makes energy for the cell?
A1|0.2|Mitochondria! The power stations.
```

## engg-mech - "Workshop CAD" (Engineering: Mechanical)
Vibe: precision engineering, CAD drawings, machined metal. Look: light CAD grey #E9ECEF with an isometric dot grid (#CDD3DA), steel #2E3742 ink, mid steel #6C7886, safety orange #FF6A13 accent, dimension lines in thin steel with arrowheads. Type: Barlow Condensed 700 uppercase headings with tracking, Barlow 500 body, IBM Plex Mono for dimensions/ratios. Signature visual: meshing spur gears (real tooth profiles, correct mesh, rotating at speeds that obey the ratio, constant rotation allowed), rotation counters, a torque arrow. Exploded-view style label callouts. Transition: CAD section wipe - a hatched panel slides across with a cutting-plane line. SFX: clunk, ratchet, tick, thud, correct.
Topic: Gears and gear ratio.
```
H1|0.35|How does a tiny motor turn a heavy wheel?
H2|0.5|With gears.
G1|0.3|A small gear drives a big gear.
G2|0.3|The small one spins three times. The big one turns just once.
G3|0.6|It turns slower, but with much more force. That force is called torque.
Q1|1.7|Quick check. A big gear drives a small gear. Faster or slower?
A1|0.2|Faster! But with less force.
```
(gears 12 teeth vs 36 teeth so the 3:1 is true)

## engg-electronics - "Circuit board" (Engineering: Electronics)
Vibe: PCB macro, components and signals. Look: dark solder-mask green #0B2A20, traces #1F4A3A, copper pads #D9A35B (accent), silkscreen white #E9F2EC text, LED red #FF4D4D / green #3DDC84 only for LED states. Type: Chakra Petch 600 headings, IBM Plex Mono labels. Signature visual: a simple circuit on a board - battery, diode (proper symbol + body), LED, traces; current shown as moving copper dashes along traces (constant speed allowed); flipping the battery reverses direction and the diode blocks (dashes stop at the diode, a small barrier). Transition: the camera dives along a trace into the next board (quick zoom with a brief motion blur), quiz on the board. SFX: zap (low), blip, click, hum (very low), correct, wrong (for the blocked state, low).
Topic: What does a diode do?
```
H1|0.35|Why does a phone charger let current flow only one way?
H2|0.5|Inside it are tiny parts called diodes.
D1|0.3|A diode is a one way gate for electric current.
D2|0.3|Forward, current flows, and the light turns on.
D3|0.6|Backward, it blocks the current. The light stays off.
Q1|1.7|Quick check. What does a diode do?
A1|0.2|It lets current flow one way only!
```

## engg-electrical - "Power grid" (Engineering: Electrical / EEE)
Vibe: high voltage, bold, industrial power. Look: charcoal #121417, panels #1B1F24, steel lines #39404A, high-voltage yellow #FFC93C accent (hazard stripes allowed as a small detail only), white text, cool blue #6EA8FF for water in the analogy. Type: Archivo with font-stretch 115-125% 800 headings (wide, bold), Archivo 500 body, IBM Plex Mono for values/units. Signature visual: the water-pipe analogy next to a circuit: tank pressure = voltage, flow dashes = current, a pipe narrowing = resistance; then the formula V = I x R builds from the three cards. Transition: a hazard-yellow bar slams across (fast, settles) then retracts. SFX: hum (low), zap, clunk, tick, correct.
Topic: Ohm's law.
```
H1|0.35|What makes a bulb glow brighter?
H2|0.5|Ohm's law. Think of water in a pipe.
O1|0.3|Voltage is the push, like water pressure.
O2|0.3|Current is the flow. Resistance is how narrow the pipe is.
O3|0.6|Voltage equals current times resistance. More push, more flow.
Q1|1.7|Quick check. Two amps flow through five ohms. What is the voltage?
A1|0.2|Ten volts! Two times five.
```

## engg-civil - "Blueprint to site" (Engineering: Civil)
Vibe: structural drawings coming to life. Look: blueprint blue #0F3B6E with a fine white grid at 8% opacity drawn as solid lighter blue lines (#1D4E85), white line drawings, hi-vis yellow #FFD400 accent, concrete grey #C9CED6 for solid members. Type: Archivo font-stretch 100 700 headings, Architects Daughter for hand annotations, IBM Plex Mono for dimensions. Signature visual: a simply supported beam on two supports drawn line by line, a load arrow pushes, the beam bends (smooth curve), arrows show COMPRESSION squeezing the top fibre and TENSION stretching the bottom fibre, then the beam becomes a small bridge silhouette with a truck. Transition: a blueprint sheet slides in from the right with a drawn border and title block. SFX: tick, paper, thud, clunk, correct.
Topic: Compression and tension in a beam.
```
H1|0.35|How does a bridge hold up heavy trucks?
H2|0.5|Let's look at one beam.
B1|0.3|When a load presses down, the beam bends a little.
B2|0.3|The top gets squeezed. That is compression.
B3|0.6|The bottom gets stretched. That is tension. Good beams handle both.
Q1|1.7|Quick check. Which side of the beam gets stretched?
A1|0.2|The bottom! That is tension.
```

## engg-chemical - "Process plant" (Engineering: Chemical)
Vibe: process engineering, P&ID schematics, flows. Look: cool off-white #EEF2F5, slate pipes #2C3A47 (thick, rounded joints), liquid cyan #19B5C9, steam drawn as soft white puffs with slate outline (not particles: 3-4 fixed puffs that rise and loop), heat in orange #FF7A1A as the only warm colour. Type: Sora 700 headings, Sora 400 body, IBM Plex Mono tags (T-101, E-201 style equipment tags). Signature visual: a still: boiling flask/tank with burner -> vapour line -> condenser (coil with cooling water) -> collection tank; liquid flow as dashes in pipes, levels rising; salt stays behind as a grey layer. Transition: pipe wipe - a thick slate pipe draws across the screen, liquid floods it, and it opens into the quiz. SFX: bubble / bubble:N, hum (low), drip, swish, correct.
Topic: Distillation.
```
H1|0.35|How do we get pure water from salty sea water?
H2|0.5|Engineers use distillation.
S1|0.3|First, heat the mixture. The water boils into steam.
S2|0.3|The steam rises and leaves the salt behind.
S3|0.6|Then it cools in a condenser, and turns back into pure water.
Q1|1.7|Quick check. What turns the steam back into water?
A1|0.2|The condenser! It cools the steam.
```
