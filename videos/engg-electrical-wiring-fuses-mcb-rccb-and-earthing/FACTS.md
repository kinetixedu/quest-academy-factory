# Ep 23 - Wiring, Fuses, MCB, RCCB and Earthing

Suggested YouTube title (66 chars): `MCB and RCCB Explained Simply | Basic Electrical Engineering Ep 23`

## Quiz
Q: A wet hand touches a live pump body. Which device saves the person?
- A) Fuse
- B) MCB
- C) RCCB (correct)
- D) Voltage stabiliser
Correct: C. Takeaway strip: "RCCB trips at 30 mA leakage - it protects people."

## Recap rows
- Fuse and MCB - chip `OVERCURRENT`
- RCCB - chip `30 mA`
- Earthing - chip `SAFE PATH`

## Facts and sources
- Fuse element heats and melts on overcurrent; must be replaced; Edison patented a fuse in 1890: https://en.wikipedia.org/wiki/Fuse_(electrical)
- MCB: bimetal strip for sustained overload, solenoid/electromagnet for short circuit: https://en.wikipedia.org/wiki/Miniature_circuit_breaker
- RCD/RCCB: compares line and neutral current; 30 mA common for personal protection; trips within ~25-40 ms; cannot protect someone touching both conductors; no overcurrent protection by itself: https://en.wikipedia.org/wiki/Residual-current_device
- 30 mA RCCB: 300 ms at 1x, 40 ms at 5x IΔn: https://hager.com/uk/support/regulations-18th-edition/updated-rccb-testing
- Wet skin ~1000 ohms: https://smarteng.mst.edu/sensors/electricshock/
- Near 100 mA ventricular fibrillation; over 10 mA painful/can't let go: https://www.physics.ohio-state.edu/~p616/safety/fatal_current.html
- Indian earthing code IS 3043 (background, not in script): https://law.resource.org/pub/in/bis/S05/is.3043.1987.pdf

## EXAMPLE FIGURES calculations
- Shock current: 230 / 1000 = 0.23 A = 230 mA
- Kitchen: (2000 + 1500) / 230 = 15.2 A (about fifteen amps) on a 16 A MCB
- Add 1500 W: 5000 / 230 = 21.7 A (about twenty two amps) -> trips

## New canon
- A neighbour's pump body went live in the monsoon (rubbed wire, no earth); old rewirable fuse did not blow.
- Panchayat rule: every house gets MCBs, an RCCB and an earth, pumps first.
- Meera's kitchen circuit: 16 A MCB (EXAMPLE FIGURE).

## Visual plan
- Hook: eeee-scene-pumpset plate card at night, rain lines, user icon hand + tingle spark; eeee-kittu face.
- C: fault diagram - live wire touching pump metal body, no earth wire (red X).
- J: live distribution board: fuse wire glowing and melting; MCB with bimetal bending (overload) and coil snapping (short); RCCB with live-out and neutral-back counters 10.000 A vs 9.970 A, 30 mA difference -> trip; earth wire from pump body to rod, fault dashes flow to ground.
- W: person icon in circuit, 230 V / 1000 ohm = 230 mA counter; comparison bar: 16 A fuse threshold vs 100 mA danger vs 30 mA RCCB.
- T1 hazard-yellow sweep.
- V: kitchen circuit, appliance icons switching on, ammeter counter 15.2 A then 21.7 A, MCB trips; EXAMPLE FIGURES chip.
- K panes: factory, airport, hospital, mobile tower.
- X: Kittu wet hands at test button, Meera stops, dries; Edison 1890 text card.
