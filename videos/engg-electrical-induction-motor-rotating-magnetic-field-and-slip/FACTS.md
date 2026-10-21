# Ep 19 - Induction Motor: Rotating Magnetic Field and Slip

Suggested YouTube title (64 chars): `Motor Slip Explained Simply | Basic Electrical Engineering Ep 19`

## Quiz
Q: Why can an induction motor's rotor never reach synchronous speed?
- A. Friction is too high
- B. At that speed the bars cut no flux, so no current and no torque (correct)
- C. The supply frequency drops
- D. The rotor has too many bars
Correct: B. Takeaway strip: "No slip, no current, no torque."

## Recap rows
1. Three phases make a rotating field - chip "RMF"
2. Ns = 120 f / P - chip "1500 rpm"
3. Slip = (Ns - N) / Ns - chip "4 %"

## Facts and sources
- Induction motor: Ns = 120 f / P (4-pole on 50 Hz = 1,500 rpm); always runs slightly below synchronous speed; no relative speed = no rotor current, no torque; full-load slip about 0.5 - 5 %; Ferraris (1885) and Tesla (1887) independent; swapping any two phases reverses a three-phase motor; squirrel-cage rotor - https://en.wikipedia.org/wiki/Induction_motor
- Tesla's "Electro-magnetic motor" patent filed 12 Oct 1887, granted 1 May 1888 (US 381,968) - https://ethw.org/Tesla%27s_Electro-magnetic_motor
- Electric motor systems: 53 % of global electricity consumption in 2023 (IEA 4E EMSA policy brief) - https://www.iea-4e.org/emsa/publications/policy-brief-electric-motor-systems-why-are-they-important/
- Single phasing: blown fuse on one phase, running motor keeps running, current in remaining phases rises (about 2.4x), windings overheat; stopped motor will not start - https://www.marineinsight.com/single-phasing-in-electrical-motors-causes-effects-and-protection-methods/
- Rotor frequency = s x f: standard textbook relation (follows from slip definition).

## EXAMPLE FIGURES (checked in python3)
- f = 50 Hz, P = 4: Ns = 120 x 50 / 4 = 1500 rpm
- N = 1440 rpm: slip = (1500 - 1440)/1500 = 0.04 = 4 %
- Rotor frequency = 0.04 x 50 = 2 Hz
- 2-pole on 50 Hz: 120 x 50 / 2 = 3000 rpm

## New canon facts
- Suryagaon flour mill: 3-phase, 400 V, 50 Hz, 4-pole squirrel-cage induction motor, nameplate 1440 rpm.
- The mill motor hummed loud because one fuse blew (single phasing); Shankar anna switched off and replaced it.

## Visual plan
- Hook: flour mill motor icon (no new image; use eeee-scene-workshop or a diagram) with nameplate card "50 Hz | 4 pole | 1440 rpm" in IBM Plex Mono; face eeee-kittu reading it.
- Story: faces eeee-shankar, eeee-meera, eeee-kittu.
- Definition: text card "Ferraris 1885 | Tesla patent 1 May 1888" (no portraits).
- ANIMATED PROCESS: stator ring with three coil pairs A/B/C at 120 degrees; three-phase sine traces drawn live below; each coil's field arrow scales with its phase; their sum (yellow resultant arrow) rotates at constant length; then the squirrel cage appears inside, induced current dots in bars, rotor turns, chasing but trailing the field arrow (speed counters: field 1500, rotor 1440).
- Worked example: Ns = 120 x 50 / 4 = 1500 rpm; slip bar 60/1500 = 4 %; rotor frequency 2 Hz; EXAMPLE FIGURES chip.
- T1 sweep: "The rotor chases the field, and never catches it."
- V: load slider - rotor slows, slip % and torque bar rise; swap two phase wires -> field arrow reverses.
- K list/panes: Rotating field / Slip / Reverse / Everywhere; Suryagaon: flour mill, pumpset (eeee-scene-pumpset), -, -.
- X: balance scale; three-phase line with one fuse blown, current meters on remaining two phases rising, thermometer; "53 % of world electricity (2023)" stat tile; lesson strip.
