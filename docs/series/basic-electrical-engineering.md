# Series bible - Basic Electrical Engineering (Engineering Electrical, Year 1, 24 episodes)

Standard: the v2 episode standard in `docs/series/principles-of-management.md` ("Every episode must have") applies unchanged, except the running story below. Look and components: copy Ep 01 of this series (`videos/engg-electrical-what-electrical-engineering-is-and-how-power-reaches-your-home/`, once approved). It ports the v2 components of `videos/mba-scientific-management-f-w-taylor/` and `videos/mba-introduction-to-marketing/` into the engg-electrical world (Power grid: charcoal #121417, panels #1B1F24, steel lines #39404A, high-voltage yellow #FFC93C as the accent, cool blue #6EA8FF secondary, Archivo wide 800 headings, Archivo 500 body, IBM Plex Mono values and units, hazard-yellow bar transition).
Eyebrow chip: `EP NN · BASIC ELECTRICAL ENGINEERING`. Title format: `<Hook-style title> Explained Simply | Basic Electrical Engineering Ep N` (<= 70 chars; the fixed suffix is 52-53 characters, so the hook is at most 17 characters, e.g. "How Power Travels"). meta.json world "engg-electrical", `"series": {"name": "Basic Electrical Engineering", "ep": N}`. Kit branch: kit-engg-electrical.
Illustrations: `assets/illustrations/engg-electrical/eeee-*` (dark world: never cut out onto charcoal; show the full image on a light plate card #F4F1EA, see docs/ILLUSTRATIONS.md).

## Who it is for
Every first-year B.E./B.Tech student in India (all branches take Basic Electrical Engineering) and every EEE student. Topics checked against the AICTE model curriculum (ESC Basic Electrical Engineering), VTU 2022 (BESCK104B Introduction to Electrical Engineering), KTU, MAKAUT, JNTUH R22 (Electrical Circuit Analysis I, Elements of EEE), Anna University (EE3251 Electric Circuit Analysis) and GATE EE. Never mention exam weightage or marks; never name a university's marks.

## The running story (canon - keep it consistent)
**Suryagaon** - a dry village in north Karnataka where the power goes off most evenings and the farm pumps stop. Meera, the first engineer-to-be in her family, learns electricity one problem at a time. Over the full EEE series the village builds its own solar micro-grid; in Year 1 we stay with homes, the street, the pumps and the village transformer.
- **Meera** - 19, first-year EEE student in a city college, home in Suryagaon every weekend. Fixes first, then asks why. Yellow kurta, dark blue dupatta, a small screwdriver in her pocket.
- **Shankar anna** - 52, retired lineman of the electricity board. Knows every pole in the village; strict about safety ("switch off, then touch"). Grey moustache, khaki shirt, rubber gloves.
- **Farida** - 40, the gram panchayat president. Signs every rupee; always asks "will it pay back?". Green saree, reading glasses, a file of papers.
- **Kittu** - 11, Meera's little brother. Asks the questions a 12-year-old would ("where does the electricity come from?"). Striped T-shirt, school bag.
- **Dr. Nalini Rao** - 55, Meera's professor in the city. Answers with one question that unlocks the problem. Grey bob, round glasses, cotton saree, chalk.
- Farmers, shopkeepers and helpers appear as plain user icons, unnamed.
- Growth arc for Year 1, in order:
  1. Eps 1-7 DC basics: Meera's own house. The evening power cut, a torch and a battery, the bulbs and fan, the house wiring as a circuit, the backup battery.
  2. Eps 8-13 AC: from the house to the street. The 230 V socket, the ceiling fan, the street-light line, the farm pumpsets on the three-phase line.
  3. Eps 14-21 Magnetism, transformers and machines: Shankar anna's repair corner. The village transformer, the burnt pump motor, the flour mill motor, the inverter.
  4. Eps 22-24 The village decides: where power comes from (the solar idea is born), safe wiring for every house, the bill and the batteries. Ep 24 ends Year 1 with the panchayat agreeing to study a solar micro-grid.
- Never introduce real brands into the story (no real companies, appliance makers, banks, power utilities by name; say "the electricity board"). Real scientists (Ohm, Kirchhoff, Faraday, Lenz, Tesla, Thevenin, Norton...) appear only as text or quote cards with verified facts and dates; never draw a portrait.
- Workplace examples ("At work today") are generic, with no brand names: a hospital, a metro railway, a phone maker, a bank's data centre, a power station, a factory, a bakery, a mobile tower.
- Illustrative numbers carry the ghost chip "EXAMPLE FIGURES". All arithmetic on screen is correct (check in Python before it goes on screen). Indian standards where relevant: 230 V single-phase, 400 V three-phase (line), 50 Hz.

## Episodes
1 What Electrical Engineering Is and How Power Reaches Your Home · 2 Charge, Current, Voltage, Power and Energy · 3 Ohm's Law and the R, L, C Elements · 4 Kirchhoff's Current and Voltage Laws · 5 Series and Parallel Circuits · 6 Superposition, Thevenin and Norton Theorems · 7 RC and RL Transients · 8 AC Fundamentals - Frequency, Peak, RMS and Average · 9 Phasors · 10 Reactance and Impedance · 11 Series RLC Circuits and Resonance · 12 AC Power and Power Factor · 13 Three-Phase Systems - Star and Delta · 14 Magnetic Circuits and the B-H Curve · 15 Faraday's and Lenz's Laws · 16 Transformer Working and EMF Equation · 17 Transformer Losses and Efficiency · 18 DC Generator and DC Motor Basics · 19 Induction Motor - Rotating Magnetic Field and Slip · 20 Single-Phase Motors and Alternators - A First Look · 21 Power Converters - Buck, Boost and Inverter · 22 Sources of Energy - Thermal, Hydro, Nuclear, Solar, Wind · 23 Wiring, Fuses, MCB, RCCB and Earthing · 24 Electricity Bills, Batteries and Backup

## Canon (update after every batch)
- Ep 01: Suryagaon's power often goes off in the evening; Meera starts her EEE degree and explains to Kittu how power travels from a power station to their house.
