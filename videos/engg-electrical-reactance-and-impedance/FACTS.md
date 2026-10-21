# Ep 10 - Reactance and Impedance

Suggested YouTube title (66 chars): `AC Impedance Explained Simply | Basic Electrical Engineering Ep 10`

## Quiz
Q: A coil has 40 ohms of resistance and 30 ohms of reactance. What is its impedance?
- A. 70 ohms
- B. 10 ohms
- C. 50 ohms (correct)
- D. 1200 ohms
Correct: C. Takeaway strip: "Impedance adds R and X as arrows: root(40^2 + 30^2) = 50 ohm."

## Recap rows
- Reactance = push back against AC - chip `X ohm`
- Coil lags, capacitor leads - chip `±90°`
- Impedance = R and X as arrows - chip `Z = 50 ohm`

## Facts and sources
- "Impedance" coined by Oliver Heaviside, July 1886 (The Electrician, 23 July 1886): https://en.wikipedia.org/wiki/Electrical_impedance
- XL = 2 pi f L; XC = 1/(2 pi f C); inductor current lags 90 deg, capacitor current leads 90 deg; reactance stores and returns energy, no average power: standard textbook.
- Ceiling fan run capacitors commonly 2.5 uF: https://www.indiamart.com/rajdhanibearingcenter/fan-capacitor.html ; https://besomi.com/jo_en/pccx0339-cbb61-2-5uf-450v-fan-capacitor-wire-lead-motor-start-5-percent-tolerance.html (generic, no brand named on screen). Capacitor phase-shifts one winding so a single-phase fan motor starts: standard (permanent split capacitor motor).
- Street light chokes (ballasts) are coils on iron cores: standard.
- Current limiting series reactors in substations: https://www.electrical4u.com/types-of-electrical-reactor/ ; https://www.e-cigre.org/publications/detail/a3-10260-2026-operational-experience-with-current-limiting-series-reactors-in-conventional-substation-within-the-indian-grid.html
- Earphone impedance rated in ohms: standard product spec.

## EXAMPLE FIGURES (python3)
- Choke R = 40 ohm (DC test), XL = 30 ohm at 50 Hz -> L = 30/(2 pi 50) = 0.0955 H.
- DC-style expectation: 230/40 = 5.75 A.
- Z = sqrt(40^2 + 30^2) = 50 ohm; I = 230/50 = 4.6 A; angle = atan(30/40) = 36.87 deg.
- Fan capacitor 2.5 uF: XC = 1/(2 pi 50 x 2.5e-6) = 1273.2 ohm (about 1270).
- Note: script states the choke has 30 ohm reactance "at fifty hertz" - fine; frequency doubling shown visually only (XL doubles, XC halves) without spoken numbers.

## New canon facts
- The street light outside Meera's house flickers; its old choke is replaced (one new choke, Farida approves).
- Meera's ceiling fan has a 2.5 uF capacitor.

## Visual plan
- Hook: two Plex Mono readouts: "OHM'S LAW 5.75 A" vs "METER 4.60 A"; eeee-scene-pole plate card (street light).
- Story: eeee-shankar taking down choke, eeee-meera at bench, DC meter 40 ohm.
- Definition card: reactance + impedance, Heaviside 1886 text tag.
- J process: coil with growing/shrinking magnetic field rings, current dashes lag; V (yellow) and I (blue) waves with I peaking a quarter cycle late; capacitor plates filling/emptying with charge dots, I leads; frequency slider 50 -> 100 Hz: XL bar grows, XC bar shrinks.
- W: formula cards XL = 2 pi f L, XC = 1/(2 pi f C); impedance triangle 40 across, 30 up, 50 hypotenuse, 36.9°; 230/50 = 4.6 A. EXAMPLE FIGURES chip.
- V: ceiling fan with capacitor callout 2.5 uF -> 1273 ohm.
- K list: series reactor, capacitor bank, filter, earphones.
- X: eeee-kittu stopped, unplugged choke "switch off, then touch"; eeee-farida approves.
- Quiz, recap, NEXT · EP 11 Series RLC and Resonance.
