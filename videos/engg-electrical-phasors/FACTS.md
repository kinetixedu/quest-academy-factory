# Ep 09 - Phasors

Suggested YouTube title (63 chars): `AC Phasors Explained Simply | Basic Electrical Engineering Ep 9`

## Quiz
Q: Three amps in step, plus four amps a quarter turn behind. What is the total?
- A. 7 A
- B. 1 A
- C. 5 A (correct)
- D. 12 A
Correct: C. Takeaway strip: "AC currents add as arrows - 3 A and 4 A at 90 degrees make 5 A."

## Recap rows
- Phasor = spinning arrow - chip `length + angle`
- Phase angle = timing gap - chip `90°` (write "90 deg" if the font lacks the degree glyph)
- Add tip to tail - chip `3 - j4`

## Facts and sources
- Steinmetz, 1893, "Complex Quantities and Their Use in Electrical Engineering" (presented 1893; International Electrical Congress, Chicago): https://en.wikipedia.org/wiki/Charles_Proteus_Steinmetz . Kennelly's impedance paper 18 April 1893; Steinmetz generalised to all AC circuits later in 1893: https://en.wikipedia.org/wiki/Electrical_impedance . Script says only "In 1893 ... showed how to solve AC circuits with complex numbers" (safe under both sources; no month/venue spoken).
- Phasor measurement units used in Indian grid (URTDSM / WAMS): https://www.tdworld.com/substations/article/20971462/india-to-get-wide-area-monitoring-system-ultimately-covering-350-substations ; https://powerline.net.in/2016/08/22/reliable-operations/
- Generator synchronisation (match phase angle before connecting): standard practice.
- Phasors valid only for sinusoids of the same frequency: standard textbook.
- A purely inductive current lags by 90 deg: standard. (Pump coil treated as ideal 90 deg lag for teaching; real motors lag less - the animation labels it "EXAMPLE FIGURES".)

## EXAMPLE FIGURES (python3)
- Heater current 3 A at 0 deg; pump coil current 4 A at -90 deg.
- Sum = 3 - j4; |I| = sqrt(9+16) = 5.0 A; angle = -53.13 deg (about 53 deg lagging).
- Arithmetic sum (wrong) 7 A.

## New canon facts
- Meera's house runs the water heater (from Ep 08) and a small water pump together; Farida visits and suggests sizing the main wire for 7 A.

## Visual plan
- Hook: clamp meter readouts 3.0 A, 4.0 A, then main wire 5.0 A (not 7.0 A) in Plex Mono; eeee-meera face.
- Story: eeee-farida and eeee-shankar faces; Dr. Rao (eeee-rao face) on a phone call card with her question.
- Definition: arrow on a circle, labels "length = size", "angle = timing".
- J process: arrow rotating (50 rev/s shown slowed), its tip height projected to a live sine trace drawn from sin(wt); second arrow 90 deg behind drawing a second (blue #6EA8FF) wave that peaks later; freeze frame with "90°" arc.
- W: phasor diagram: yellow 3 A arrow right, blue 4 A arrow down, tip-to-tail, resultant 5 A with 53° angle; side card 3+4=7 crossed out. EXAMPLE FIGURES chip.
- V: complex-plane card 3 + j0, 0 - j4 -> 3 - j4, |5|.
- K list: generator sync dial, cable sizing, PMU map dots, radio circuit.
- X: Kittu stopped from clamping (eeee-kittu + eeee-shankar); Steinmetz text card "1893" (no portrait).
- Quiz, recap, NEXT · EP 10 Reactance and Impedance.
