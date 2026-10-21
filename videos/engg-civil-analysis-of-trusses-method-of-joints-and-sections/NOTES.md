# Ep 08 - Analysis of Trusses - Method of Joints and Sections - notes

## Facts used
- Squire Whipple, 1847, "A Work on Bridge Building", first of its kind to propose a theoretical formula for calculating stresses in iron truss bridges. Script: "among the first to calculate stresses in truss bridges". https://www.ice.org.uk/what-is-civil-engineering/who-are-civil-engineers/squire-whipple/
- (Not used in voice, available for a text card) August Ritter (1826-1908), German civil engineer, best known as the author of the method of sections: https://en.wikipedia.org/wiki/August_Ritter_(civil_engineer) (year of the method not confirmed, so no date).
- Truss assumptions: straight members, pin joints, loads at joints only -> two-force members (pure tension or compression). Standard statics.

## Numbers (EXAMPLE FIGURES chip)
- King post truss: span 12 m, rise 3 m; joints A (left support), B (right support), C (peak), D (mid of tie). Load 20 kN at C.
- Reactions: symmetric, RA = RB = 10 kN.
- Rafter angle: tan(theta) = 3/6 = 0.5 -> theta = 26.57 deg ("rises one in two").
- Joint A: F_AC sin(theta) = 10 -> F_AC = 22.36 kN (compression). F_AD = F_AC cos(theta) = 20.00 kN (tension).
- Joint D: tie left, tie right, king post vertical, no load -> king post force = 0 (zero-force member).
- Section: cut through rafter AC and tie AD, keep left part; moments about C: 10 x 6 = T x 3 -> T = 20 kN. Matches.

## Process to animate
1. Square frame folds flat under a push; triangle holds (side by side).
2. Truss draws on (span 12 m, rise 3 m dims). 20 kN arrow on C; reactions 10 kN arrows grow at A and B.
3. Joint A zooms in: circle around joint, two unknown arrows; force triangle forms tip to tail; counters run to 22.4 (rafter turns red/"push" arrows into joint = compression) and 20.0 (tie turns blue/"pull" arrows away = tension).
4. Joint D: king post flashes, label 0 kN.
5. Method of sections: a dashed cut line slices the truss, right part fades; pivot at C, lever arms 6 m and 3 m, "10 x 6 = T x 3", T counter to 20 kN.
6. Final colour-coded truss: red compression, blue tension, grey zero.

## Diagrams needed
Square vs triangle frame, king post truss blueprint, joint A force triangle, section cut, colour legend (TENSION / COMPRESSION / ZERO). Whipple as text card only (no portrait).

## New canon facts (for lead)
- Assembly hall: 12 m clear span, no internal columns, steel king post roof trusses, 3 m rise (EXAMPLE), 20 kN apex load per truss (EXAMPLE).
- King post kept (stops tie sag; wind can change loads).
