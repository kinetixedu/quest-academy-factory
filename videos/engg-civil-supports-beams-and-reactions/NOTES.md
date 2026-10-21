# Ep 07 - Supports, Beams and Reactions - notes

## Facts used
- Support types and reaction counts (pinned 2, roller 1, fixed 3 incl. moment); cantilever = fixed one end, free other. Standard statics (any B.E. Engineering Mechanics text).
- Steel linear expansion about 10.8-12.5 x 10^-6 per deg C (script says "heat makes steel grow"; on screen show 12 x 10^-6 /deg C): https://engineeringtoolbox.com/linear-expansion-coefficients-d_95.html
- Roller / hinged bearings on bridges allow thermal movement: generic engineering practice, no code named.
- No IS code named.

## Numbers (EXAMPLE FIGURES chip on all)
- Corridor beam span L = 6 m on columns A and B. Tank load P = 30 kN at a = 2 m from A.
  - Moments about A: RB x 6 = 30 x 2 = 60 -> RB = 10 kN. RA = 30 - 10 = 20 kN. Check about B: RA x 6 = 120 = 30 x 4. OK.
- UDL w = 10 kN/m over 6 m: W = 60 kN at midspan; RA = RB = 30 kN.
- Expansion: 100 m x 12e-6 x 30 deg C = 0.036 m = 3.6 cm ("over three centimetres").

## Process to animate
1. Beam on two columns, tank lowers onto it 2 m from A (dimension lines draw on: 2 m, 4 m, 6 m).
2. Support icons morph: pinned (triangle, 2 arrows), roller (circles, 1 arrow), fixed (hatched wall, 2 arrows + curl). Sunshade cantilever off the lintel.
3. Free body: 30 kN down arrow, RA and RB up arrows with "?".
4. Moment about A: pivot glows at A, RA arrow fades (drops out), lever arm 2 m highlights, "30 x 2 = 60" counter; RB lever arm 6 m, "RB x 6 = 60", RB counter runs to 10 kN.
5. Sum of vertical forces: RA counter runs to 20 kN. Arrow lengths scale 2:1.
6. Tank replaced by UDL (row of small arrows, 10 kN/m), resultant 60 kN arrow drops at midspan, RA = RB = 30 kN.
7. Human side: bridge deck with roller end sliding as a thermometer rises.

## Diagrams needed
Beam + supports blueprint, three support-type icons, free body diagram with lever arms, UDL diagram, bridge roller bearing, sunshade cantilever. Faces: Ananya, Raghu, Farhan, Lakshmi, Deshpande.

## New canon facts (for lead)
- Corridor beam: 6 m span between columns A and B; a water tank (30 kN full, EXAMPLE) sits on it 2 m from A; slab load 10 kN/m (EXAMPLE).
- Corridor beam is pinned at A, roller at B (one end free to move, as drawn).
- Every classroom window has a cantilever sunshade.
