# Ep 16 - Transformer Working and EMF Equation

Suggested YouTube title (66 chars): `Transformers Explained Simply | Basic Electrical Engineering Ep 16`

## Quiz
Q: The secondary has twice the turns of the primary. What happens to the voltage?
- A. It halves
- B. It stays the same
- C. It doubles (correct)
- D. It becomes DC
Correct: C. Takeaway strip: "Voltage ratio = turns ratio."

## Recap rows
1. Changing flux links two coils - chip "Mutual flux"
2. V2/V1 = N2/N1 - chip "Turns ratio"
3. E = 4.44 f N Phi_m, AC only - chip "4.44 f N Phi"

## Facts and sources
- EMF equation E = 4.44 f N Phi_m; same EMF per turn in both windings; E2/E1 = N2/N1 = K; step-up/step-down - https://www.electricaleasy.com/2014/03/emf-equation-of-transformer.html
- Faraday's 1831 iron ring = first toroidal closed-core transformer; he never found the turns-ratio / EMF relation - https://en.wikipedia.org/wiki/Transformer
- ZBD transformer invented 1885 by Zipernowsky, Blathy, Deri (Ganz Works), unveiled at Budapest National Exhibition 1885 - https://en.wikipedia.org/wiki/Ott%C3%B3_Bl%C3%A1thy (Blathy naming the "transformer" is citation-needed there, so NOT used)
- Indian village distribution transformers: 11 kV / 433 V, Dyn11, 50 Hz, ratings 25/63/100/160 kVA - https://wbsedcl.in/irj/go/km/docs/internet/webpage/techspec/Final%20spec%20for%20empanelment%20of%2025,%2063,%20100%20&%20160%20KVA%20DTR.pdf
- Transformer works only on AC (DC gives no changing flux) - follows from Faraday's law; textbook.

## EXAMPLE FIGURES (checked in python3)
- Simplified single-phase: N1 = 2200 on 11,000 V -> 5 V/turn; N2 = 46 -> 46 x 5 = 230 V; turns ratio 2200/46 = 47.83 = 11000/230
- Phi_m = 11000 / (4.44 x 50 x 2200) = 0.022523 Wb -> "about twenty two point five milliwebers"
- Current: I1 = 230 x 10 / 11000 = 0.209 A -> "about zero point two one amps" (ideal, power in = power out)
- Note for on-screen: label the example "single-phase, simplified"; the real village unit is three-phase 11 kV / 433 V.

## New canon facts
- The village transformer is a grey box on the main pole; HV side 11 kV, LV side 230 V per phase (400 V line, canon).
- (none about Shankar anna beyond canon)
- Farida is checking if the village needs a bigger transformer (sets up Ep 17).

## Visual plan
- Hook: eeee-scene-pole plate card; volt labels 11,000 V on top wires, 230 V at Meera's socket.
- Story: faces eeee-shankar, eeee-meera, eeee-kittu, eeee-farida (C3).
- Definition: transformer symbol (two coils, core lines) + "1831 Faraday ring" and "1885 Budapest" text timeline chips.
- ANIMATED PROCESS: core with primary (left) and secondary (right). AC current dashes reversing at 50 Hz (slowed), flux arrows in core growing/shrinking/reversing synced with a sine trace; per-turn voltage tags "5 V" lighting up on each turn of both coils; turns counter changes secondary -> output meter follows; DC switch-over makes the flux freeze and output meter fall to 0 V.
- Worked example: 11,000 V / 2200 turns = 5 V per turn; 46 x 5 = 230 V; EMF equation solved for Phi_m = 22.5 mWb; EXAMPLE FIGURES chip.
- T1 sweep: "The turns ratio is the voltage ratio."
- V: two current meters, 10 A house side vs 0.21 A HV side, with thick vs thin wire.
- K list/panes: Step up / Step down / Isolate / Adapt; Suryagaon: village transformer for Step down.
- X: balance scale; Kittu held back at the pole; lesson strip.
