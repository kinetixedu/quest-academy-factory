# PUC (Class 11-12) concept videos - JEE and NEET focus

Streams: PCMB (NEET track) and PCME (JEE track). Subjects: Physics, Chemistry, Maths, Biology, Electronics. Syllabus order: NCERT (Karnataka PUC follows the NCERT books). Language: English. Channel: the Quest Academy channel, one playlist per subject and class (e.g. "PUC Physics | Class 11 | Quest Academy").

## Look: the "Lab Notebook" world family (one look, a subject accent each)
- Base: warm off-white graph-paper page (#F7F5EF with a faint 40 px grid), deep ink navy text (#16213E), Poppins.
- Subject accents: Physics electric blue #2F6FEB · Chemistry teal #0FA3A3 · Maths coral #E4572E · Biology leaf green #3E9B5F · Electronics amber #E8A317.
- Diagrams are crisp vector drawings, drawn on screen (strokes animate in), labels in Poppins, formulas typeset cleanly (KaTeX-style), units always shown.
- Illustrations (docs/ILLUSTRATIONS.md style, this palette): the two students and real scientists as text cards (no fake portraits); everyday scenes for hooks.
- The first PUC session (PUC Physics) creates `worlds/puc/` and the shared cast in `assets/illustrations/puc/`; other PUC subjects reuse them and only change the accent.

## The cast (shared by every PUC subject)
- **Aarav**, 17, PCME, preparing for JEE. Curious about how machines, circuits and numbers work. Rides a bicycle to college.
- **Diya**, 17, PCMB, preparing for NEET. Curious about the body, plants and chemistry in the kitchen. Wants to be a doctor.
- They are classmates in a Bengaluru PU college and study together after class. Each video starts with one of them noticing something in daily life (a bike leaning on a turn, a pressure cooker whistle, a leaf turning yellow).
- The cast never becomes the lesson: 1 hook scene + short reactions; the concept carries the video.

## Every PUC episode must have
1. Hook (first 5 s): Aarav or Diya notices an everyday puzzle tied to the concept.
2. NCERT anchor chip: `CLASS 11 · PHYSICS · CH 5 LAWS OF MOTION` (verified chapter number and name).
3. The concept built visually step by step: live simulations (a ball on a slope with vectors updating, a molecule forming bonds, a graph drawing as values change, a cell process running). At least one real animated process, as in the MBA v2 standard.
4. Formula or mechanism derived in small steps, each term explained in plain words, units shown. Biology: the process animated with labelled stages instead.
5. One fully worked example (numbers for P/C/M, a labelled diagram or flow for Biology).
6. **Exam trap**: the one mistake students make on this topic, shown wrong then right.
7. **Where it is asked**: which exams test it (JEE Main, JEE Advanced, NEET, PUC boards) and the type of question. Only verified past-paper analysis; never invent weightage or counts. If not verifiable, say the type of question only.
8. **Practice question**: an ORIGINAL JEE- or NEET-pattern MCQ (never copied from a past paper), 4 options, 5-second countdown ring, then an animated step-by-step solution.
9. **Formula / fact card**: one clean screen with the key formulas or facts, held for 3 s with a small "Screenshot this" chip.
10. NEXT strip with the next topic. Brand outro as in all Quest Academy videos.
11. Length 4-6 minutes. A 12-year-old must follow the explanation; the practice question is at real exam level.
12. Plain hyphens only. No real brands. Every fact, constant and value verified (NCERT first).

## Ending order (fixed)
worked example -> exam trap -> where it is asked -> practice question (pause, solve) -> formula card -> NEXT -> outro.

## Later
Each practice question + formula card can be cut into a vertical 9:16 Short (needs a vertical render mode in the engine).

---
# Editing style per PUC subject (binding)

## Shared across all PUC subjects
- **Page:** Lab Notebook graph paper (#F7F5EF, 40 px grid #E9E5DA), ink navy #16213E, cards white with a thin subject-accent top edge (6 px).
- **Type:** Poppins 700 headings / 500 body. Formulas typeset (KaTeX fonts bundled locally, like Poppins), variables italic, units upright. Every number and reading in IBM Plex Mono.
- **Motion:** precise and calm. Lines and formulas draw on stroke by stroke; one thing moves at a time; springs with almost no overshoot. Physics-true motion where something really moves (constant speed is linear, falling accelerates). No particles, no glows, no 3D flips.
- **Camera:** slow push-in onto the part of a diagram being explained, then pull back (max 1.15x). Used at most once per scene.
- **Colour-coding:** each symbol in a formula takes the same colour as the thing it stands for in the diagram (v and the velocity arrow both blue). This is the signature of the PUC channel.
- **Transition:** notebook page turn with a strip of the subject accent along the page edge (statement, quiz, recap). Elsewhere standard vis/rise.
- **Sound:** the Quest Academy whitelist only (whoosh on page turns, 3 ticks, correct chime). No music.
- **Pacing:** fast hook (5 s), slower derivations (a 0.6-0.8 s pause after each step so viewers can write it down), brisk exam segments.
- **Exam segment components (same in every subject):** Exam trap card (wrong line struck in red, right line ticks in), "Where it is asked" chips (JEE Main / JEE Advanced / NEET / PUC Boards, only verified ones lit), MCQ with a 5-second countdown ring in the subject accent and an animated solution, Formula card styled as a pinned notebook card with a "Screenshot this" chip.
- **Cast:** Aarav and Diya as cutout illustrations in the hook and as small face avatars reacting during the lesson.

## puc-physics - "Motion notebook" (accent electric blue #2F6FEB)
Live simulation pane on one side, readout panel on the other (v, a, F, E in Plex Mono updating every frame). Free-body diagrams where force arrows grow from the object with labels; motion trails as 3-4 fading ghost copies; "slow-mo replay": the sim freezes, vectors appear, then it resumes. Graphs (x-t, v-t) draw live beside the sim, with a moving dot linked to the object. Signature: the sim and its graph moving together.

## puc-chemistry - "Molecule bench" (accent teal #0FA3A3)
2D ball-and-stick molecules that assemble bond by bond; electron dots that move between atoms (sharing, transfer) with orbit shells drawn as thin rings; reaction arrows that draw on, with reactants sliding into products and atoms counted on both sides (balancing as a live counter); energy-profile curves that draw as the reaction runs; flat beakers for solutions and concentration. Periodic table strip that lights the element in play. Signature: electrons visibly moving to explain every bond and reaction.

## puc-maths - "Proof board" (accent coral #E4572E)
Equations write on stroke by stroke; each new step slides in under the previous one, and the changed term is highlighted then settles. Every algebra step paired with its geometric picture (a parabola, a triangle, a unit circle) whose parts glow in the same colour as their terms. Graph plotter with an animated parameter (a value counts up and the curve morphs live). Worked solutions in a numbered column, never more than 5 lines on screen. Signature: the term-to-shape colour link and live-morphing graphs.

## puc-biology - "Living diagram" (accent leaf green #3E9B5F)
Textbook-quality labelled diagrams in the vintage cartoon illustration style (docs/ILLUSTRATIONS.md, this palette): cells, organs, plants. Labels pop in with leader lines that draw from the part to the label. Zoom ladder camera: organ -> tissue -> cell -> organelle -> molecule, each level a smooth push-in with a scale chip ("x400"). Processes (photosynthesis, digestion, DNA replication, the heart cycle) run as stage chains with the current stage lit and a looping animation inside it. NCERT diagram names used exactly. Signature: the zoom ladder plus labelled diagrams that NEET asks about.

## puc-electronics - "Breadboard" (accent amber #E8A317)
Circuit schematics drawn with standard symbols, current shown as dots flowing along wires (speed proportional to current), voltage and current readouts in Plex Mono, an oscilloscope panel drawing the waveform live (input and output traces for rectifiers, amplifiers). Truth tables fill row by row as switch tiles toggle (logic gates). Components light up when active (LED glow as a flat fill change, not a glow effect). Signature: the circuit and its scope trace changing together.

## Style samples
Reference frames (lesson + exam per subject): docs/series/puc-samples/*.png, source docs/series/puc-samples/frame.html (needs `npm i katex`). Pending Amjad sign-off.
