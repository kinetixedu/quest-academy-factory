# Ep 17 - Transformer Losses and Efficiency

Suggested YouTube title (63 chars): `Iron Loss Explained Simply | Basic Electrical Engineering Ep 17`

## Quiz
Q: When is a transformer at its maximum efficiency?
- A. At no load
- B. When copper loss equals iron loss (correct)
- C. Always at full load
- D. When iron loss is zero
Correct: B. Takeaway strip: "Peak efficiency: copper loss = iron loss."

## Recap rows
1. Iron loss: hysteresis + eddy, constant - chip "Always on"
2. Copper loss: I squared R - chip "Follows load"
3. Max efficiency at equal losses - chip "Cu = Fe"

## Facts and sources
- Losses: core (iron) = hysteresis + eddy current, roughly constant when energised; copper loss proportional to current squared; max efficiency when copper loss = iron loss; all-day efficiency for distribution transformers; efficiency = output/input - https://www.electricaleasy.com/2014/04/transformer-losses-and-efficiency.html
- Core losses mostly hysteresis and eddy current; laminations reduce eddy currents; silicon steel cores; typical distribution transformer efficiency about 98 to 99 percent; oil cooling - https://en.wikipedia.org/wiki/Transformer
- Silicon steel reduces eddy currents and narrows the hysteresis loop, cutting core loss about three times vs conventional steel; used in motors too - https://en.wikipedia.org/wiki/Electrical_steel
- Village transformer 100 kVA, 11 kV/433 V class exists in Indian specs - https://wbsedcl.in/irj/go/km/docs/internet/webpage/techspec/Final%20spec%20for%20empanelment%20of%2025,%2063,%20100%20&%20160%20KVA%20DTR.pdf (spec total loss at 100% load: 1650 W for 100 kVA; our EXAMPLE 1250 W is in the same range).

## EXAMPLE FIGURES (checked in python3)
- Iron loss Pi = 250 W; full-load copper loss Pcu = 1000 W; full-load output 100 kW (unity pf).
- Full load: loss 1.25 kW; eff = 100 / 101.25 = 98.77% -> "about ninety eight point eight percent"
- Half load: Pcu = 1000 x 0.5^2 = 250 W = Pi; output 50 kW; loss 0.5 kW; eff = 50/50.5 = 99.01% -> "about ninety nine percent"
- Quarter load (optional on screen): Pcu = 62.5 W, eff = 25 / 25.3125 = 98.77%
- Iron loss over a day: 250 W x 24 h = 6 kWh = six units.
- Double the current -> copper loss x4.

## New canon facts
- The Suryagaon village transformer is rated 100 kVA (EXAMPLE FIGURES), feeds every house and the street lights.
- Farida asked "will a better core pay back?"; Meera promised the numbers (could pay off in Ep 22 or 24).
- Shankar anna keeps the transformer's old test records.

## Visual plan
- Hook: eeee-scene-pole at night (dark sky), transformer tank with heat shimmer; clock 3:00 AM; face eeee-shankar.
- Story: faces eeee-farida, eeee-meera, eeee-kittu; nameplate card "100 kVA" (EXAMPLE FIGURES).
- Definition: Sankey-style power-flow arrow: input -> output, with thin heat branches peeling off; formula efficiency = output / input.
- ANIMATED PROCESS: 24-hour clock dial sweeping; load bar rises in the evening; two loss meters - iron loss (cool blue, flat line at 250 W) and copper loss (yellow, tracks load squared); hysteresis loop pulsing in the core, eddy current swirls; at 7 PM copper loss climbs; "2x current -> 4x copper loss" callout.
- Worked example: efficiency vs load curve plotted live (25%, 50%, 100% points) with the peak marked where the two loss lines cross at half load; EXAMPLE FIGURES chip.
- T1 sweep: "Iron loss never sleeps. Copper loss follows the load."
- V: solid core block with one big eddy loop -> sliced into insulated laminations with tiny loops; "silicon steel" label.
- K list/panes: Laminations / Cooling / All day efficiency / Testing; Suryagaon: village transformer for each.
- X: balance scale; "250 W x 24 h = 6 units/day" counter; Kittu stopped at the tank; lesson strip.
