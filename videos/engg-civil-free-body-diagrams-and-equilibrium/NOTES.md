# Ep 06 - Free Body Diagrams and Equilibrium - notes

## Facts used
- Free body diagram, equilibrium (sum Fx = 0, sum Fy = 0, sum M = 0): standard engineering mechanics.
- Lami's theorem: for three coplanar, concurrent, non-collinear forces in equilibrium, each force is proportional to the sine of the angle between the other two (P/sin a = Q/sin b = R/sin c). Named after Bernard Lamy (French mathematician and Oratorian priest, 1640-1715); published 1679 in Traitez de mechanique.
  - https://en.wikipedia.org/wiki/Lami%27s_theorem
  - https://proofwiki.org/wiki/Lami%27s_Theorem/Historical_Note (1679)
  - https://encyclopedia.com/science/dictionaries-thesauruses-pictures-and-press-releases/lamy-bernard
- Hyatt Regency walkway collapse, Kansas City, 17 July 1981: hanger-rod design change doubled the load on the fourth-floor box beams; 114 deaths, 216 injured. Script avoids the brand: "a Kansas City hotel". https://en.wikipedia.org/wiki/Hyatt_Regency_walkway_collapse
- No IS code named.

## Numbers (EXAMPLE FIGURES chip on all; computed in Python)
- Lamp W = 100 N (100 / 9.81 = 10.2 kg -> "about ten kilograms").
- Case 1 (Ananya): each wire at 60 deg from vertical. Angle between wires = 120; angle between each wire and the weight = 180 - 60 = 120. All three angles 120 -> T = W = 100 N. Check 2 x 100 x cos 60 = 100.
- Case 2 (Raghu): each wire at 75 deg from vertical. Angle between wires = 150; between each wire and weight = 105.
  - Lami: T / sin 105 = W / sin 150 -> T = 100 x 0.9659 / 0.5 = 193.19 N -> "about one hundred and ninety three".
  - Check: T = W / (2 cos 75) = 100 / 0.5176 = 193.19. Ratio 1.93 -> "nearly double".
- (Not voiced) 85 deg from vertical would give 573.7 N - optional on-screen trend dot.

## Process to animate
1. Hook: gate elevation, two posts, lamp hangs on two near-flat wires (Raghu), "100 N" tag.
2. FBD build, 5 steps with step pill: (1) zoom on knot, everything else fades/erases; (2) weight arrow 100 N down draws on; (3) two pull arrows along the wires, pointing away from the knot; (4) angle arcs draw on, 60 deg from vertical each; (5) arrows split into components: sideways parts slide together and cancel, upward parts stack to equal 100.
3. Lami: three arrows at the knot, the three 120 deg arcs light up, formula strip T1/sin120 = T2/sin120 = W/sin120 -> T = 100 N each.
4. Before/after run: wires flatten from 60 to 75 deg; arc between wires opens 120 -> 150; tension counters climb from 100 to 193; a "tension vs angle" bar/curve grows.
5. Human side: Ananya redraws at 60 deg; Raghu's face ring goes from doubt to OK.
6. Ladder (K4, brief): ladder FBD with floor reaction, wall reaction, weight (sets up Ep 9 ladder).

## Diagrams needed
Gate + lamp elevation; knot FBD with angle arcs and component split; Lami triangle/formula card; tension-vs-angle mini chart; ladder FBD; Kansas City walkway as a text card only. Faces: Raghu, Lakshmi, Ananya, Deshpande, Farhan (optional).

## New canon facts (for lead)
- Gate lamp: 100 N (about 10 kg), hung from two wires over the school gate, final design at 60 deg from vertical (each wire 100 N). Raghu's 75 deg "neat" version rejected (193 N per wire) (EXAMPLE).
- Raghu's arc: second time he accepts the numbers over his eye (after Ep 4/5), consistent with "slowly learns to trust drawings".
