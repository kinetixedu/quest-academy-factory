# Series bible - Engineering Electronics (ECE, Year 1 first)

Standard: the v2 episode standard in `docs/series/principles-of-management.md` ("Every episode must have") applies unchanged, except the running story below. Engine, components, title travel, pacing, captions, quiz, recap, outro: `videos/mba-scientific-management-f-w-taylor/` (Ep 08 v2) and `videos/mba-introduction-to-marketing/` (Ep 01), restyled in the engg-electronics world (worlds/engg-electronics: solder-mask green #0B2A20, traces #1F4A3A, copper #D9A35B accent, silkscreen white #E9F2EC, LED red #FF4D4D / green #3DDC84 only for LED states, Chakra Petch 600 headings, IBM Plex Mono labels).
Reference episode for this series: `videos/engg-electronics-what-is-electronics-signals-components-and-systems/` (Ep 01, once approved).
Eyebrow chip: `EP NN · ENGINEERING ELECTRONICS`. Title: `<Hook-style title> Explained Simply | Engineering Electronics Ep N` (<= 70 chars). meta.json `"series": {"name": "Engineering Electronics", "ep": N}`, world "engg-electronics". Kit branch: kit-engg-electronics (-2, -3 for overlapping batches).
Illustrations: `assets/illustrations/engg-electronics/eece-*`. Dark world: never cut out onto the green board; show the full image on a light plate card #F4F1EA (docs/ILLUSTRATIONS.md).
Topic list and sources: `docs/series/engg-electronics-topics.md` (AICTE 2018 + 2023 model curriculum, GATE EC 2026/2027, ESE E&T). Never mention exam weightage.

## The running story (canon)
**Project Neeru** - four first-year ECE students in Mandya, Karnataka build a smart irrigation controller for Mahadev's farm, so the pump waters the field only when the soil is dry. Every topic solves the next real problem the controller hits.
- **Tanvi** - 18, first-year ECE student, team lead. Curious; asks "what is really happening inside?". Teal kurta, short hair clipped back, notebook.
- **Imran** - 19, her classmate, hands-on builder with the soldering iron. Fast, impatient, learns by burning things. Copper-brown shirt, sleeves rolled, safety glasses on his head.
- **Lakshmi** - 18, classmate, the measurer and coder. Calm, checks every number. Long braid, grey cardigan, multimeter.
- **Mahadev** - 54, farmer, Tanvi's uncle, grows ragi and sugarcane. Practical, distrusts gadgets until they save water. White shirt, green towel on the shoulder.
- **Dr. Shabana** - 46, lab in-charge and mentor. Answers with one sharp question. Glasses, maroon saree, lab coat.
- The controller: a soil-moisture sensor in the field, a small board, a pump switched by a relay, an LED status light, later a phone alert. Battery and solar panel later.
- Growth arc (Year 1): Ep 1 what electronics is (sense, decide, act) -> Ep 2-6 powering it and the first circuit -> Ep 7-10 diodes and a clean DC supply from the farm mains -> Ep 11-13 a transistor switches the pump, an op-amp reads the weak sensor -> Ep 14 logic (soil dry AND tank not empty) -> Ep 15 they measure everything with a multimeter and oscilloscope. Year 2+ continues on the same farm (more fields, the village cooperative).
- Never introduce real brands (no real boards, chips by brand, phones or companies). Real scientists only as text or quote cards with verified facts.
- Workplace examples ("At work today") generic, no brands: a hospital, a phone maker, a car factory, a bank, an airline, a power company.
- Subject devices: standard schematic symbols, current as moving copper dots (conventional current, + to -, unless the episode is about electrons and says so), a live oscilloscope trace beside the circuit, truth tables filling row by row.
- Illustrative numbers carry the ghost chip "EXAMPLE FIGURES". All arithmetic correct.

## Episodes (Year 1)
1 What Is Electronics - Signals, Components and Systems · 2 Voltage, Current, Power and Energy · 3 Resistors, Capacitors and Inductors · 4 Ohm's Law and Kirchhoff's Laws · 5 Series and Parallel Circuits, Voltage and Current Dividers · 6 AC Fundamentals - Sine Wave, RMS, Phase and Frequency · 7 Semiconductors - Intrinsic and Extrinsic · 8 The PN Junction Diode · 9 Rectifiers and Filters - Building a DC Power Supply · 10 Zener Diode and Voltage Regulators · 11 The Bipolar Junction Transistor (BJT) · 12 Transistor as a Switch and as an Amplifier · 13 Introduction to the Op-Amp · 14 Number Systems and Logic Gates · 15 Measuring Instruments - Multimeter and Oscilloscope

## Canon (updated after each batch)
- (empty until Ep 1 is approved)
