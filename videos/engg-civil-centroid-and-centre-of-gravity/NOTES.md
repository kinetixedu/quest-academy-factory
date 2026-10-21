# Ep 10 - Centroid and Centre of Gravity - notes

## Facts used
- Archimedes (c. 287 - c. 212 BC, Syracuse) calculated areas and centres of gravity of triangles, parallelograms and parabolas; On the Equilibrium of Planes culminates with the centre of gravity of the triangle and trapezium. https://en.wikipedia.org/wiki/Archimedes , https://en.wikipedia.org/wiki/On_the_Equilibrium_of_Planes . Script says "over two thousand years ago" (safe).
- Centroid = CG for uniform material; plumb-line (suspension) method; centroid of composite area x = sum(A x)/sum(A). Standard statics.

## Numbers (EXAMPLE FIGURES chip)
- Name wall L shape: base 3 m x 1 m (x 0-3, y 0-1), centre (1.5, 0.5), A = 3; pillar 1 m x 2 m on top at left (x 0-1, y 1-3), centre (0.5, 2.0), A = 2.
  - x = (3 x 1.5 + 2 x 0.5)/5 = 5.5/5 = 1.1 m; y = (3 x 0.5 + 2 x 2.0)/5 = 5.5/5 = 1.1 m.
  - Point (1.1, 1.1) lies outside the L (x > 1 and y > 1): the empty corner. Correct for the hook.
- T beam: flange 400 x 100 mm (top), web 200 x 300 mm; total depth 400 mm.
  - Areas 40,000 and 60,000 mm2; centres 350 and 150 mm from bottom.
  - y = (40000 x 350 + 60000 x 150)/100000 = 230 mm from bottom (170 mm from top).

## Process to animate
1. Cardboard L hung from pin at one corner, swings and settles; plumb line draws a dashed line.
2. Re-hung from second corner; second line; crossing point pulses (yellow dot) in empty corner.
3. L splits into two rectangles (colour fill), each centre dot appears with coords.
4. Table builds: A, x, A x; counters 4.5 + 1.0 = 5.5; / 5 = 1.1. Same for y.
5. Calculated dot lands exactly on the plumb-line crossing.
6. T beam section: two parts, centroid line rises to 230 mm.
7. Wall tipping check: weight arrow from CG falls inside base (stable).

## Diagrams needed
L-shape cardboard with pin + plumb thread, coordinate grid, composite table, T-beam section with dims, wall stability sketch, crane slinging a lintel at CG. Archimedes text card only.

## New canon facts (for lead)
- Name wall at the school gate: long low wall with a tall pillar at one end, L shaped in elevation (3 m x 1 m base + 1 m x 2 m pillar, EXAMPLE). Footing centred under the whole wall's weight.
- T beam (EXAMPLE): 400 x 100 flange, 200 x 300 web, centroid 230 mm from bottom. Reused in Ep 11.
