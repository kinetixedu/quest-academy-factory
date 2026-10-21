# Ep 11 - Series RLC Circuits and Resonance

Suggested YouTube title (67 chars): `RLC Resonance Explained Simply | Basic Electrical Engineering Ep 11`

## Quiz
Q: At resonance in a series RLC circuit, what limits the current?
- A. The coil
- B. The capacitor
- C. The resistance (correct)
- D. Nothing - it is infinite
Correct: C. Takeaway strip: "At resonance XL = XC, they cancel, and only R limits the current."

## Recap rows
- XL = XC at resonance - chip `cancel`
- f0 = 1 / (2 pi root LC) - chip `50 Hz`
- Voltage magnification - chip `Q = 10`

## Facts and sources
- Series resonance conditions, f0 = 1/(2 pi sqrt(LC)), Q = XL/R = VL/V at resonance: standard textbook. https://www.omnicalculator.com/physics/resonant-frequency-lc
- Radio tuning by LC resonance: https://technav.ieee.org/topic/tuned-circuits/
- MRI receive/transmit RF coils are tuned to resonance with tuning capacitors: https://patents.google.com/patent/EP3500868A1/en (and USPTO coil-tuning patents in search results)
- Utilities check capacitor banks for harmonic resonance with system inductance: standard power quality practice.

## EXAMPLE FIGURES (python3)
- R = 5 ohm; at 50 Hz XL = XC = 50 ohm -> L = 50/(2 pi 50) = 0.1592 H, C = 1/(2 pi 50 x 50) = 63.66 uF; f0 = 1/(2 pi sqrt(LC)) = 50.0 Hz.
- Supply 10 V: I = 10/5 = 2 A; VL = VC = 2 x 50 = 100 V; Q = 50/5 = 10.
- At 100 Hz: XL = 100 ohm, XC = 25 ohm; Z = sqrt(5^2 + 75^2) = 75.17 ohm; I = 10/75.17 = 0.133 A.
- At 230 V supply, VL would be 10 x 230 = 2300 V (spoken in X4).

## New canon facts
- Dr. Nalini Rao's city lab bench: R-L-C series kit run at 10 V.

## Visual plan
- Hook: supply readout "10.0 V", coil meter climbing to "100 V"; eeee-meera face.
- Story: eeee-scene-lab plate card, eeee-rao face with question.
- Definition card: XL = XC.
- J process: frequency sweep 10 -> 150 Hz with live resonance curve (I vs f, computed from 10/sqrt(25 + (2 pi f L - 1/(2 pi f C))^2)), XL and XC curves crossing at 50 Hz; phasor diagram with VL up, VC down equal, cancelling; f0 formula reveal.
- W: circuit with R 5 ohm, L, C; ammeter 2.00 A; voltmeters 100 V across L and C, 10 V across R; Q = 10. EXAMPLE FIGURES chip.
- V: 100 Hz point on curve: XL 100, XC 25, Z 75.2 ohm, I 0.13 A.
- K list: radio dial, filter, capacitor bank warning, MRI coil.
- X: Dr. Rao keeps 10 V; warning card "at 230 V -> 2300 V across the coil"; Meera on phone stops Kittu (eeee-kittu).
- Quiz, recap, NEXT · EP 12 AC Power and Power Factor.
