# Ep 13 - Three-Phase Systems - Star and Delta

Suggested YouTube title (68 chars): `Star and Delta Explained Simply | Basic Electrical Engineering Ep 13`

## Quiz
Q: In a star system with 230 volts per phase, what is the line voltage?
- A. 230 V
- B. 690 V
- C. About 400 V (correct)
- D. 133 V
Correct: C. Takeaway strip: "Star: line voltage = root 3 x phase voltage = 1.732 x 230 = about 400 V."

## Recap rows
- Three phases, 120 degrees apart - chip `R Y B`
- Star: VL = root3 x Vph - chip `400 V`
- P = root3 VL IL cos phi - chip `4.5 kW`

## Facts and sources
- Indian LV supply: 230 V phase, 400 V line, 50 Hz (series bible; CEA): https://en.wikipedia.org/wiki/Central_Electricity_Authority_Regulations
- Star: VL = root3 Vph, IL = Iph; Delta: VL = Vph, IL = root3 Iph; P = root3 VL IL cos phi; balanced currents sum to zero; constant total power: standard textbook.
- Phase colours red, yellow, blue: Indian convention (R Y B).
- Single phasing can overheat and burn a three-phase motor: standard.
- 1891 Lauffen to Frankfurt three-phase transmission, about 175 km (109 miles), Germany: https://edisontechcenter.org/lauffen-frankfurt/ ; https://ieeemilestones.ethw.org/Milestone-Proposal:Long_distance_transmission_of_electrical_power_using_three-phase_alternating_current,_1891-1912

## EXAMPLE FIGURES (python3)
- 230 x root3 = 398.4 V ("about four hundred"); 400/root3 = 230.9 V.
- Pump 4.5 kW, PF 0.8, 400 V line: IL = 4500/(root3 x 400 x 0.8) = 8.119 A (8.12).
- Delta phase current = 8.12/root3 = 4.688 A (4.69).
- Check: root3 x 400 x 8.12 x 0.8 = 4500.6 W (about 4.5 kW).

## New canon facts
- Suryagaon farm pumpsets: 4.5 kW three-phase, 400 V, PF 0.8 (EXAMPLE FIGURES), delta-connected motor; one farmer's pump keeps tripping because of a loose joint at the pole (one phase missing); Farida asks the electricity board to fix it.

## Visual plan
- Hook: pumpset terminal box with 4 wires (R, Y, B, N) vs house socket 2 wires; eeee-kittu face counting.
- Story: eeee-scene-pumpset plate card, eeee-shankar face, eeee-scene-pole.
- Definition card: three sine waves 120 deg apart.
- J process: rotating magnet past three coils at 0/120/240 deg; three live waves R (yellow #FFC93C), Y, B (blue #6EA8FF, plus a muted third tone) traced from sin(wt), sin(wt-120), sin(wt-240); moving cursor sums the three to 0 at every instant; neutral wire dashes fade to zero; total power line flat.
- W: star diagram (centre neutral, 230 V phase labels, 400 V between lines) then delta triangle (line current 8.12 A, coil current 4.69 A). EXAMPLE FIGURES chip.
- V: P = root3 VL IL cos phi worked to 4.5 kW; house tap: one phase + neutral to Meera's house, all three to pump.
- K list: hospital star supply, factory delta motors, data centre balance bars, transmission towers.
- X: eeee-shankar stops eeee-kittu, tester on each wire, one phase dead; eeee-farida decision; 1891 text card "Lauffen - Frankfurt, about 175 km".
- Quiz, recap, NEXT · EP 14 Magnetic Circuits and the B-H Curve.
