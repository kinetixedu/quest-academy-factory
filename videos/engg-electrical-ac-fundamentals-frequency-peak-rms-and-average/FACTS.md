# Ep 08 - AC Fundamentals - Frequency, Peak, RMS and Average

Suggested YouTube title (68 chars): `AC RMS and Peak Explained Simply | Basic Electrical Engineering Ep 8`

## Quiz
Q: Your socket says 230 volts. Which value is that?
- A. The peak value
- B. The RMS value (correct)
- C. The average over a full cycle
- D. The peak-to-peak value
Correct: B. Takeaway strip: "230 V is RMS - it heats like 230 V DC. The peak is about 325 V."

## Recap rows
- AC changes direction 50 times a second - chip `50 Hz`
- RMS = peak / root 2 - chip `230 V RMS`
- Half-wave average = 0.637 x peak - chip `207 V`

## Facts and sources
- India supply 230 V single-phase, 50 Hz: series bible (Indian standard used across series; CEA regulations) https://en.wikipedia.org/wiki/Central_Electricity_Authority_Regulations
- Hertz unit named after Heinrich Hertz; name established by the IEC in 1930 (adopted by CGPM 1960 replacing "cycles per second"): https://www.chemeurope.com/en/encyclopedia/Hertz.html
- Vrms = Vm/root2, Vavg (half cycle) = 2Vm/pi = 0.637 Vm, form factor 1.11, peak factor 1.414: standard textbook results (sine wave).
- Full-cycle average of a sine is zero: standard result.
- True RMS meters: standard practice (generic, no brand).

## EXAMPLE FIGURES (checked in python3)
- Peak = 230 x root2 = 325.27 V
- Period T = 1/50 = 0.020 s = 20 ms; time to first peak = T/4 = 5 ms
- Heater R = 46 ohm; I = 230/46 = 5.0 A; P = 230 x 5 = 1150 W (= 230^2/46)
- Half-wave average = 2/pi x 325.27 = 207.07 V (approx 207 V); 0.637 x 325.27 = 207.2
- Form factor 230/207.07 = 1.111; peak factor 325.27/230 = 1.414

## New canon facts
- Meera's house has an electric water heater, 230 V, 46 ohm (1150 W) - EXAMPLE FIGURES.
- Shankar anna owns an old meter that draws the waveform (a simple scope-style meter).

## Visual plan
- Hook: eeee-meera face + water heater sticker "230 V" in Plex Mono vs meter screen showing 325 V peak; question chip.
- Story: eeee-meera plate card (Meera's house), eeee-shankar and eeee-kittu faces in yellow-ring circles.
- Definition card: "Alternating current" plain sentence, DC flat line vs AC sine side by side.
- J process: live sine trace plotted from 325.27 sin(2 pi 50 t) over 20 ms; time axis in ms; markers at 5 ms (peak +325 V), 10 ms (zero, current dashes reverse direction on a small wire), 15 ms (-325 V), 20 ms (cycle complete, "PERIOD 20 ms"); then a counter ticking 1..50 cycles in one second -> "50 Hz".
- W: heater circuit (socket - 46 ohm resistor box - heater), RMS line drawn on the wave at 230 V; side-by-side DC 230 V vs AC 230 V RMS heater, both thermometers rising equally, 1150 W chip. EXAMPLE FIGURES ghost chip.
- T1 hazard-yellow sweep.
- V: shaded half-wave area with average line at 207 V; three value stack: peak 325 / RMS 230 / avg 207; form factor 1.11, peak factor 1.414.
- K list + pane layout: control room frequency dial 50.00 Hz; charger; meter "TRUE RMS"; AC->DC.
- X: eeee-kittu stopped by eeee-shankar (Kittu grabbing probes, hand blocked); Hertz text card "IEC, 1930" (no portrait).
- Quiz ring 3-2-1, recap 3 rows, NEXT · EP 09 Phasors.
