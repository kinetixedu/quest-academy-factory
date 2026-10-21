# Ep 05 - Forces, Resultants and Moments - notes

## Facts used
- Force = vector (magnitude + direction + point of application); SI unit newton, 1 kN = 1000 N. Triangle / polygon law (tip to tail); moment = force x perpendicular distance (N m). Standard engineering mechanics.
- Pierre Varignon (French mathematician, 1654-1722); Varignon's theorem: the moment of the resultant about any point equals the sum of the moments of the components; set out in Projet d'une nouvelle mecanique (1687). Script states the rule without a year (year 1687 can go on the text card).
  - https://dictionary.obspm.fr/terms/varignons-theorem/
  - https://www.encyclopedia.com/science/dictionaries-thesauruses-pictures-and-press-releases/varignon-pierre
- No IS code named.

## Numbers (EXAMPLE FIGURES chip on all; computed in Python)
- Lintel: weight 5 kN (about a 3.5 m x 0.23 m x 0.25 m RCC lintel: 3.5 x 0.23 x 0.25 x 25 = 5.03 kN).
- Rope A = 4 kN, rope B = 3 kN, at 90 degrees to each other. Rope A at 36.87 deg from vertical, rope B at 53.13 deg on the other side (sum 90).
  - Horizontal: 4 sin 36.87 - 3 sin 53.13 = 2.4 - 2.4 = 0. Vertical: 4 cos 36.87 + 3 cos 53.13 = 3.2 + 1.8 = 5.0 kN. Resultant = sqrt(16 + 9) = 5 kN, vertical, equals the weight.
  - Scalar sum 4 + 3 = 7 is the trap in the hook.
- Gate: needs 60 N m to start moving.
  - At handle, 2 m from hinge: 60 / 2 = 30 N.
  - At 0.2 m: 60 / 0.2 = 300 N. Ratio 10x.

## Process to animate
1. Hook: lintel hanging from two ropes over the hall door; tags 4 kN and 3 kN; Raghu's "4 + 3 = 7" chip, then the lintel tag "5 kN" with a "?".
2. Tip to tail: arrow A (4 units, along rope A) draws on; arrow B (3 units) slides so its tail sits on A's tip; right-angle mark appears; closing yellow arrow draws from A's tail to B's tip; length counter runs to 5; it points straight up and matches the 5 kN weight arrow (equal and opposite). Optional: show 3.2 + 1.8 vertical parts stacking.
3. Gate plan view: hinge at left, gate 2 m long. Push arrow at 2 m, curl arrow (moment) builds, counter "30 N x 2 m = 60 N m", gate swings. Push arrow slides to 0.2 m, arrow grows 10x to 300 N, same 60 N m. Side-by-side bars 30 vs 300.
4. Human side: hinge with twisting arrows from gate weight; small wheel added at the free end takes load.

## Diagrams needed
Lintel and two ropes; vector triangle (tip-to-tail) with right-angle marker; gate plan with lever-arm dimension; bar comparison; Varignon text card (no portrait). Faces: Lakshmi, Raghu, Ananya, Deshpande.

## New canon facts (for lead)
- Assembly hall door lintel weighs 5 kN; lifted on two ropes, 4 kN and 3 kN at right angles (EXAMPLE).
- New school gate: heavy, 2 m from hinge to handle, needs 60 N m to start moving (EXAMPLE); hung on two strong hinges with a small wheel at the free end. (Ep 6 lamp hangs over this gate.)
