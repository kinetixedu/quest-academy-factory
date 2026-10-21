# Ep 12 - AC Power and Power Factor

Suggested YouTube title (66 chars): `Power Factor Explained Simply | Basic Electrical Engineering Ep 12`

## Quiz
Q: A pump takes 2300 VA and uses 1610 W. What is its power factor?
- A. 1.43
- B. 0.7 (correct)
- C. 0.5
- D. 0.95
Correct: B. Takeaway strip: "PF = real power / apparent power = 1610 / 2300 = 0.7."

## Recap rows
- Real power does work - chip `W`
- Reactive power bounces back - chip `VAR`
- PF = P / S = cos phi - chip `0.7 -> 0.95`

## Facts and sources
- P = VI cos phi, S = VI, Q = VI sin phi, PF = P/S (= cos phi for sinusoids): standard textbook.
- Instantaneous power p = v i goes negative for part of each cycle with a lagging load: standard.
- Loss in wire proportional to I^2 R: standard.
- Maharashtra (MSEDCL) PF penalty below 0.9 average PF, incentive above 0.95, for HT and larger LT categories: https://www.mahadiscom.in:443/consumer/wp-content/uploads/2019/03/Methodology-PF-Penalty-Incentive.pdf (script names the state, not the utility - "In Maharashtra, for example, many larger consumers pay a penalty if their average power factor falls below point nine."). If the lead prefers no state name, change to "In some Indian states".
- Resistive heaters/ovens PF about 1; factories use capacitor banks for PF correction: standard.

## EXAMPLE FIGURES (python3)
- V = 230 V, I = 10 A: S = 2300 VA.
- P = 1610 W -> PF = 1610/2300 = 0.70; phi = 45.57 deg.
- Q = sqrt(2300^2 - 1610^2) = 1642.5 VAR (about 1643).
- Corrected to PF 0.95: I = 1610/(230 x 0.95) = 7.37 A (spoken "about seven point four").
- Loss ratio (7.368/10)^2 = 0.543 -> about 46 percent less ("almost half").
- Capacitor needed (not spoken): Qc = 1610 (tan 45.57 - tan 18.19) = 1113 VAR.

## New canon facts
- Suryagaon's drinking water tank is filled by one single-phase pump (10 A, 1610 W, PF 0.7 - EXAMPLE FIGURES); a small PF correction capacitor is fitted instead of a new thicker wire (Farida approves).

## Visual plan
- Hook: two Plex Mono readouts: "230 V x 10 A = 2300" vs wattmeter "1610 W"; eeee-farida face.
- Story: eeee-scene-pumpset plate card, eeee-shankar and eeee-meera faces.
- Definition card: PF = P / (V x I) = cos phi.
- J process: live v (yellow) and i (blue, lagging 45.6 deg) waves; product p(t) plotted below, positive areas filled yellow (energy in), negative slivers filled blue (energy back); arrows on the wire flip direction during negative slivers.
- W: power triangle P 1610 W across, Q 1643 VAR up, S 2300 VA hypotenuse; capacitor added: Q shrinks, S shrinks, current 10 A -> 7.4 A. EXAMPLE FIGURES chip.
- V: wire heat bar 100 -> 54 (I^2 scaling).
- K list: bakery oven PF 1.0, factory motors, capacitor bank, bill line "PF penalty".
- X: Shankar switching off at main (eeee-shankar), Kittu at a distance (eeee-kittu); Farida decision chip "pays back"; Maharashtra rule text card.
- Quiz, recap, NEXT · EP 13 Three-Phase Systems.
