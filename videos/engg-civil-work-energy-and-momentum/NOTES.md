# Ep 12 - Work, Energy and Momentum - notes

## Facts (verified)
- Work W = F x s (along the force); unit joule = 1 N x 1 m. Power P = W / t; 1 W = 1 J/s. Momentum p = m v; impulse F x t = change in momentum. Standard B.E. engineering mechanics definitions.
- James Prescott Joule: born 24 Dec 1818 (Salford), died 11 Oct 1889 (Sale). Falling weight turned a paddle wheel in water and raised its temperature; reported June 1845 at the British Association meeting, Cambridge. The SI unit of energy, the joule, is named after him. Source: https://en.wikipedia.org/wiki/James_Prescott_Joule

## Process to animate (hoist trip, M0-M8)
1. Hoist mast on the school wall, pallet (5 kN) at ground, roof line at 7 m.
2. Pallet rises; height ruler ticks 0-7 m; energy counter runs 0 -> 35 kJ (5 kJ per metre).
3. Stopwatch 0 -> 20 s alongside; at roof show 35 kJ / 20 s = 1.75 kW.
4. Motor box: efficiency 70 % gauge; input 2.5 kW = limit line on a power bar.
5. Replay with 8 kN: counter to 56 kJ, power bar shoots to 4.0 kW, past the 2.5 kW limit, hoist freezes halfway (red stop).
6. Pile hammer (P1-P4): 1 t hammer falls 1.25 m; energy bar converts to speed gauge 4.95 m/s; contact, 0.01 s timer, force arrow grows to 495 kN; pile steps down.

## Diagrams needed
Hoist + energy counter + stopwatch + power bar; pile hammer energy-to-speed bar and force arrow; K-list panes; balance scale (good/hard); Joule text card (no portrait).

## Numbers (all EXAMPLE FIGURES except g; computed in Python)
- 5 kN x 7 m = 35 kJ; 35 kJ / 20 s = 1.75 kW; 1.75 / 0.7 = 2.5 kW input.
- 8 kN x 7 m = 56 kJ; 56 / 20 = 2.8 kW out; 2.8 / 0.7 = 4.0 kW in.
- Hammer: m = 1000 kg, g = 9.81, h = 1.25 m -> E = 1000 x 9.81 x 1.25 = 12,262.5 J (about 12.3 kJ, script says "about twelve"); v = sqrt(2 x 9.81 x 1.25) = 4.952 m/s (about 5); p = 4,952 kg m/s; average force over 0.01 s = 4,952 / 0.01 = 495,227 N = about 495 kN.
- Brick dropped from 7 m: v = sqrt(2 x 9.81 x 7) = 11.72 m/s = 42.2 km/h (about 42), air drag ignored.
- Hoist limit: 2.5 kW input, 70 % efficiency, 5 kN rated load.

## New canon facts
- Brick hoist on site: rated 5 kN, roof level 7 m above ground (two-storey school), 20 s per trip, motor input limit 2.5 kW, efficiency 70 %. Ananya paints "5 kN, no one stands below" on it.
- A river bridge outside Hosahalli exists, where a 1 t pile hammer drives piles (story aside).
