# Ep 04 - Types of Loads on Structures - notes

## Facts used
- IS 875 (Part 2):1987 Table 1, educational buildings, class rooms and lecture rooms (not for assembly): 3.0 kN/m2 UDL (2.7 kN concentrated). Corridors/stairs in educational buildings: 4.0 kN/m2.
  - https://law.resource.org/pub/in/bis/S03/is.875.2.1987.html
- IS 875 parts: Part 1 (1987) dead loads, Part 2 (1987) imposed loads, Part 3 (2015) wind loads, Part 4 (1987) snow loads, Part 5 (1987) special loads and load combinations.
  - https://infralens.in/term/is-875-parts-list ; Part 3:2015 title confirmed https://info.cype.com/en/new-feature/code-implementation-is-875-part-3-2015-india
- RCC unit weight 25 kN/m3 (IS 875 Part 1 / IS 456 practice). https://www.infralens.in/code/IS-875-Part-1-1987
- IS 1893 (Part 1):2016 "Criteria for Earthquake Resistant Design of Structures - General Provisions and Buildings"; zones II-V (Z = 0.10, 0.16, 0.24, 0.36). The 2025 revision (with a new Zone VI) was withdrawn by BIS in March 2026; 2016 version stands.
  - https://infralens.in/code/IS-1893-Part-1-2016
  - https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-03-07/the-economic-times/environment/bis-revokes-new-seismic-map-with-high-risk-zone-vi
  - "Parts of Karnataka" lie in Zone II: https://www.understandupsc.com/earthquake-zoning-in-india/ . Hosahalli is made-up, so "Hosahalli is in zone two" is a story choice consistent with interior Karnataka (most of Karnataka is Zone II; coastal/western strips are Zone III).
- 2001 Gujarat earthquake, 26 January 2001; about 12,000 schools damaged or destroyed. https://en.wikipedia.org/wiki/2001_Gujarat_earthquake
- Water unit weight about 9.81 kN/m3 (voiced "about ten").
- 1 kN about 102 kg (voiced "about a hundred kilograms").

## Numbers (computed in Python)
- Slab 150 mm x 25 kN/m3 = 3.75 kN/m2 (EXAMPLE thickness).
- Floor finish (tiles + mortar) 1.0 kN/m2 (EXAMPLE).
- Imposed 3.0 kN/m2 (VERIFIED, IS 875 Part 2 - no chip on this value).
- Total 3.75 + 1 + 3 = 7.75 kN/m2.
- Classroom 7.5 m x 6 m = 45 m2. Total 7.75 x 45 = 348.75 kN -> "about 349". Live part 3 x 45 = 135 kN.
- 50 children x 35 kg x 9.81 = 17.17 kN -> "about seventeen" (EXAMPLE 35 kg average child).
- Optional on-screen only (not voiced): factored load 1.5 x 7.75 = 11.625 kN/m2 (IS 456 limit state) - leave out unless verified on screen.
- Chip "EXAMPLE FIGURES" on the slab/finish/child-weight/total stack; the 3.0 kN/m2 code value carries a small "IS 875 (Part 2):1987" tag instead.

## Process to animate
1. Hook: classroom fills with 50 child dots, desks, cupboard; floor slab glows with a "?" load.
2. One square metre tile highlighted on the floor plan; loads STACK as blocks on it with counters: slab block 3.75 (thickness dimension 150 draws on, 0.15 x 25 = 3.75 counter), finish block +1 (grey, "DEAD"), live block +3 (yellow, "LIVE / IMPOSED"), total counter runs to 7.75 kN/m2.
3. Tile multiplies across the 7.5 x 6 room (45 tiles fill in), total counter runs to 349 kN; live layer alone 135 kN vs a bar for 50 children 17 kN.
4. Sideways and sky loads: wind arrows push the wall and lift arrows curl up off the roof; ground shake with frame sway (seismic); rain drops pond on a slab with blocked drain, water depth rising and a +10 kN/m3 tag.
5. Load family tree builds: Dead / Imposed / Wind / Earthquake / Rain-water, with code chips IS 875 Parts 1-5 and IS 1893 (Part 1):2016.

## Diagrams needed
Floor plan with 1 m2 tile; stacked load blocks; full-room tile fill; wind/earthquake/ponding mini scenes; zone map is NOT needed (avoid drawing India map; just a "ZONE II" chip). Faces: Lakshmi, Ananya, Farhan, Raghu, Deshpande. Scene: eciv-scene-site-office.

## New canon facts (for lead)
- First floor slab: 150 mm RCC, 1.0 kN/m2 floor finish, classroom imposed 3.0 kN/m2 (IS 875-2) -> 7.75 kN/m2 service load (EXAMPLE except the code value).
- Hosahalli is in seismic Zone II (IS 1893-1:2016) - story choice, keep for Eps 200-201.
- Assembly hall roof is the wind-uplift worry (feeds Ep 8 truss).
- Deshpande: "Who chooses the day of the earthquake?"
