# Ep 21 - Power Converters - Buck, Boost and Inverter

Suggested YouTube title (68 chars): `Buck and Boost Explained Simply | Basic Electrical Engineering Ep 21`

## Quiz
Q: A buck converter has 24 V in, switch on half the time. What comes out?
- A) 48 V
- B) 24 V
- C) 12 V (correct)
- D) 6 V
Correct: C. Takeaway strip: "Buck: V out = D x V in."

## Recap rows
- Buck lowers DC - chip `D x Vin`
- Boost raises DC - chip `Vin / (1-D)`
- Inverter makes AC - chip `H BRIDGE`

## Facts and sources
- Buck: output linear in duty cycle, Vout = D x Vin; efficiency often above 90%; switch, inductor, diode, capacitor: https://en.wikipedia.org/wiki/Buck_converter
- Boost: ideal Vout = Vin / (1 - D); inductor, switch, diode, capacitor: https://en.wikipedia.org/wiki/Boost_converter
- Inverter H bridge: diagonal pairs reverse load voltage; switching rate sets frequency; PWM + filter approximates sine; square / modified sine / pure sine; modified sine makes motors noisy and less efficient: https://en.wikipedia.org/wiki/Power_inverter
- Gaston Plante, 1859, first rechargeable (lead-acid) battery: https://nationalmaglab.org/magnet-academy/history-of-electricity-magnetism/museum/plante-battery-1859/
- "thousands of times every second" - switching frequencies of tens to hundreds of kHz are typical (inverter page cites ~100 kHz PWM).
- "waste less than a tenth" = efficiency above 90% (buck page).

## EXAMPLE FIGURES calculations
- Buck: 24 x 0.5 = 12 V
- Boost: 12 / (1 - 0.75) = 12 / 0.25 = 48 V

## New canon
- Meera's house has a home inverter with a 12 V lead-acid battery (capacity given in Ep 24: 150 Ah).
- Shankar anna repairs inverters weekly; one had a burnt switch (transistor) on the bench.

## Visual plan
- Hook: dark power-cut scene (eeee-scene-power-cut) with Meera's room still lit; inverter box glows.
- C: eeee-scene-workshop plate card; inverter open on bench.
- J: live buck circuit (switch, inductor, diode, capacitor, load); switch toggles, current dashes flow; on-state / off-state paths alternate colours; duty-cycle bar; voltmeter counter settles from 0 to 12 V.
- W: formula cards in IBM Plex Mono; boost circuit redrawn from same parts; meter climbs 12 -> 48 V; EXAMPLE FIGURES chip.
- T1 hazard-yellow sweep.
- V: H bridge with four switches; diagonal pairs light alternately; load current arrow flips; output square wave traces, then filtered PWM traces near-sine over it at 50 Hz.
- K panes: phone maker, solar station, metro railway, hospital.
- X: Kittu + battery clamps, Shankar anna stop; Plante 1859 text card.
