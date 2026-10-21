# Ep 20 - Single-Phase Motors and Alternators - A First Look

Suggested YouTube title (66 chars): `Why Fans Hum Explained Simply | Basic Electrical Engineering Ep 20`

## Quiz
Q: Why does a fan hum but not turn when its capacitor fails?
- A) The fuse has blown
- B) One phase only makes a pulsing field, so the two pulls cancel and there is no starting torque (correct)
- C) The voltage is too high
- D) The rotor magnet has worn out
Correct: B. Takeaway strip: "No capacitor, no turning field, no start."

## Recap rows
- Single phase field pulses - chip `NO SELF START`
- Capacitor + second winding - chip `TURNING FIELD`
- N = 120 f / P - chip `1500 RPM`

## Facts and sources
- Single-phase field pulsates, does not rotate; double-revolving-field theory: two equal opposite fields, net starting torque zero; capacitor in auxiliary winding shifts current, angle near 90 degrees, makes starting torque: https://electricalvolt.com/why-single-phase-induction-motor-is-not-self-starting
- Ceiling fan humming but not turning, starts after a push = classic failed capacitor symptom: https://www.hunker.com/13414340/my-ceiling-fan-hums-but-doesnt-work/
- Alternator: rotating field inside stationary coils; DC excitation of rotor; N = 120f/P; 4-pole at 50 Hz = 1500 r/min; power-station alternators make most of the world's electricity: https://en.wikipedia.org/wiki/Alternator
- Slip rings feed DC to rotor field (standard textbook; alternator page mentions DC rotor excitation, brushless exciters also exist - script says "two slip rings" as the classic case).
- Tesla applied for US patents on AC induction motor Oct/Nov 1887 (some granted May 1888): https://en.wikipedia.org/wiki/Induction_motor
- Capacitor can hold charge after switch-off (standard safety practice; discharge before handling).

## EXAMPLE FIGURES calculations
- N = 120 x 50 / 4 = 1500 rpm
- N = 120 x 50 / 2 = 3000 rpm

## New canon
- Meera's ceiling fan capacitor failed; replaced at Shankar anna's repair corner.
- Several panchayat office fans hum the same way.

## Visual plan
- Hook: eeee-meera face + fan icon wobbling with "hum" waves; Kittu push arrow, fan spins.
- C: eeee-scene-workshop on light plate card; Shankar anna and Farida face circles.
- J: stator cross-section; main-winding field arrow growing N, shrinking, flipping S (pulsing, no rotation). Split into two counter-rotating phasors that cancel (live rotating phasors).
- J5-J7: second winding + capacitor added; second current sine traced 90 degrees ahead; resultant field arrow now rotates; rotor follows; fan spins.
- W: alternator diagram, magnet rotor in stator coils, output sine traced live; formula card N = 120f/P in IBM Plex Mono; 4-pole 1500 rpm vs 2-pole 3000 rpm counters, EXAMPLE FIGURES chip.
- T1 hazard-yellow sweep.
- V: slip rings + DC feed on rotor, stationary stator output coils highlighted blue.
- K list + panes: hospital, bakery, power station, mobile tower; Suryagaon examples on screen (panchayat fans, flour mill, village transformer feed, pump).
- X: eeee-kittu + Shankar anna stop moment; Tesla 1887 text card (no portrait).
