# Ep 14 - Magnetic Circuits and the B-H Curve

Suggested YouTube title (67 chars): `The B-H Curve Explained Simply | Basic Electrical Engineering Ep 14`

## Quiz
Q: Why did one millimetre of dust weaken the starter magnet?
- A. The coil lost turns
- B. Air has far higher reluctance than iron, so the gap cut the flux (correct)
- C. Dust is a magnet that cancels the field
- D. The supply voltage dropped
Correct: B. Takeaway strip: "Air gaps add reluctance and cut the flux."

## Recap rows
1. Magnetic circuit - chip "N x I"
2. Reluctance and air gaps - chip "Air fights"
3. B-H curve and hysteresis - chip "Knee, loop"

## Facts and sources
- Magnetic circuit: Hopkinson's law F = Phi x R (MMF = flux x reluctance), MMF of a coil = N I in ampere-turns; reluctance R = l/(mu A); air has high reluctance, soft iron low; analogy with resistance is mathematical only - https://en.wikipedia.org/wiki/Magnetic_circuit
- mu0 = 4 pi x 10^-7 H/m; electrical (silicon) steel relative permeability about 2,000 to 38,000 - https://en.wikipedia.org/wiki/Permeability_(electromagnetism)
- Saturation of iron alloys used in transformers at 1.6 - 2.2 T, practical limit about 2 T; B-H curve bends and B approaches a saturation value - https://en.wikipedia.org/wiki/Saturation_(magnetic). Script says "flattens ... saturated" without a tesla number (removed "near two tesla" to stay safe).
- "Hysteresis" coined in 1881 by Sir James Alfred Ewing to describe magnetic materials - https://en.wikipedia.org/wiki/Hysteresis
- Silicon steel in transformer cores, lower hysteresis loss - https://en.wikipedia.org/wiki/Electrical_steel
- Scrap crane electromagnets, motor air gaps kept small, magnetic disk storage: general textbook knowledge (generic, no numbers).

## EXAMPLE FIGURES (checked in python3)
- N = 200 turns, I = 0.5 A -> MMF = 100 At
- Iron path l = 0.2 m -> H = 100/0.2 = 500 At/m
- mu_r = 2000: B = mu0 x 2000 x 500 = 1.2566 T -> "about one point two six tesla"
- 1 mm air gap: reluctance ratio gap/iron = 0.001 / (0.2/2000) = 10 -> total = 11 x iron alone -> flux falls to 1/11 -> B = 1.2566/11 = 0.114 T -> "about zero point one one tesla" (ignores fringing; linear model)

## New canon facts
- Shankar anna's repair corner is where the Eps 14-21 jobs happen.
- A farm pump starter (contactor) in Suryagaon chattered because dust kept a 1 mm gap at the plate; Meera cleaned it.

## Visual plan
- Hook: eeee-scene-pumpset, starter box icon buzzing (contact symbol flicking open/closed), "the gap" zoom ring.
- Story: eeee-scene-workshop on a light plate card + faces eeee-meera, eeee-shankar; then eeee-kittu in X4.
- Definition card: side-by-side analogy table - electric circuit (EMF, current, resistance) vs magnetic circuit (MMF = NI, flux, reluctance).
- ANIMATED PROCESS: C-shaped iron core with a hinged plate; coil counter "200 turns"; switch closes, current dashes in the coil, yellow flux lines loop the core; plate snaps shut, contacts close. Then a dust speck: plate stops 1 mm short, flux lines bulge/fringe across gap, thinner lines, plate chatters.
- Worked example: values in IBM Plex Mono building N I -> H -> B; then gap version, B meter dropping 1.26 T -> 0.11 T; EXAMPLE FIGURES chip.
- T1 hazard-yellow sweep: "Iron carries flux easily. Air fights it hard."
- V: B-H curve plotted live (rising, knee, flat saturation), then the current returning to zero tracing a hysteresis loop in cool blue; shaded loop area = "heat each cycle".
- K list/panes: Electromagnet / Core / Air gap / Memory, with Suryagaon examples (starter coil, village transformer core, flour mill motor gap, -).
- X: balance scale good/hard; Ewing 1881 text card (no portrait); lesson strip.

Notes: nothing left unverified in script. The "thousands of times" in J4 matches mu_r range 2,000 - 38,000.
