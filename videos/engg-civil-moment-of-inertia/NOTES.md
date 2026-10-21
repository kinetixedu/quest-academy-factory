# Ep 11 - Moment of Inertia - notes

## Facts used
- Leonhard Euler introduced the term moment of inertia in Theoria motus corporum solidorum seu rigidorum, 1765. https://en.wikipedia.org/wiki/Moment_of_inertia
- Second moment of area, rectangle I = b d^3 / 12 about centroidal axis; parallel axis theorem I = Ic + A h^2; neutral axis; lateral-torsional buckling of deep thin beams; columns buckle about weak axis. Standard B.E. mechanics / strength of materials.
- Not used: Galileo Two New Sciences 1638 (beam strength) - edge vs flat not confirmed by source, so left out.

## Numbers
- Plank 200 x 50 mm (EXAMPLE):
  - Flat (b = 200, d = 50): 200 x 50^3 / 12 = 2,083,333 mm4 ("about 2.08 million").
  - On edge (b = 50, d = 200): 50 x 200^3 / 12 = 33,333,333 mm4 ("about 33.3 million").
  - Ratio = 16 (= (200/50)^2).
- Doubling depth: 2^3 = 8 times I; doubling width: 2 times.
- Classroom beams 230 x 450 mm (EXAMPLE): deep 230 x 450^3/12 = 1.747e9 mm4; flat 450 x 230^3/12 = 4.56e8 mm4; ratio 3.83 (not voiced; optional on screen).
- T beam from Ep 10 (centroid 230 mm from bottom), parallel axis (optional on screen):
  - Flange: 400 x 100^3/12 = 33.33e6 + 40000 x 120^2 = 576e6
  - Web: 200 x 300^3/12 = 450e6 + 60000 x 80^2 = 384e6
  - Total I = 1.443e9 mm4.

## Process to animate
1. Plank flat on two bricks, Raghu face steps on, plank sags (big curve). Turn plank 90 deg on edge, small sag.
2. Bending: top fibres compress (arrows in), bottom stretch (arrows out), neutral axis dashed line stays.
3. Strips of area light up, brightness by distance squared; sum counter -> I.
4. Formula b d^3 / 12 builds; plank cross-section rotates; counters 2.08 M -> 33.3 M mm4; "x16" badge.
5. Depth slider: d doubles, I bar grows x8; width doubles, I bar grows x2.
6. I section: material flows from web to flanges.
7. Parallel axis: T beam parts slide from own centroids to common axis, A h^2 term appears.

## Diagrams needed
Plank sag (flat vs edge), bending fibres with neutral axis, rectangle section with b and d, depth vs width bar chart, I section, T beam parallel-axis diagram, column weak/strong axis. Euler text card only.

## New canon facts (for lead)
- Classroom beams 230 mm wide x 450 mm deep (EXAMPLE).
- Raghu accepts drawings after the plank demo ("My hands knew it. Now I know why") - step in his arc of trusting drawings.
