# Ep 03 - Building Planning and Bye-laws - notes

## Facts used
- National Building Code of India 2016 (SP 7:2016) withdrawn on 30 April 2026 and replaced by SP 7:2026 "National Building Construction Standards 2026" (BIS gazette notification). Script says: "In 2026, India's National Building Code became the National Building Construction Standards."
  - https://egazette.gov.in/WriteReadData/2026/272177.pdf
  - https://www.drishtiias.com/daily-updates/daily-news-analysis/national-building-construction-standards-2026
  - https://www.agileregulatory.com/latest-updates/bis-update-2026-national-building-code-2016-replaced-by-sp-7-2026
- Model Building Bye-laws 2016 (Ministry of Urban Development, released 17 March 2016): single-window approval, plans approved within 30 days, else deemed approved. https://indiaenvironmentportal.org.in/reports-and-documents/model-building-bye-laws-2016
- Orientation in tropical India: long facades facing north-south (long axis east-west) cut low east/west sun; cross ventilation via openings on both long sides. https://nzeb.in/form-orientation/ (note: that page is internally inconsistent; the N-S long facade rule is the standard textbook guidance for hot climates)
- FAR/FSI = total floor area of all floors / plot area; ground coverage = footprint / plot area; setbacks = mandatory open margins. Standard definitions.
- The setbacks, 40 % coverage and FAR 1.0 are NOT any real town's values (bye-laws differ by town). All EXAMPLE FIGURES.

## Numbers (EXAMPLE FIGURES chip on all; computed in Python)
- Plot 60 m x 40 m = 2400 m2.
- Setbacks: front 6 m, sides and rear 3 m -> buildable 60 - 6 - 3 = 51 m by 40 - 3 - 3 = 34 m.
- Six classrooms in a row x 7.5 m = 45 m <= 51 m. (Two floors x 6 = 12 classrooms.)
- Ground coverage limit 40 % -> 0.40 x 2400 = 960 m2.
- Classroom block footprint 600 m2 = 25 % (6 classrooms 7.5 x 6 = 270 m2 + corridor 45 x 2.5 = 112.5 m2 + stairs/toilets/staff 217.5 m2). Leaves 360 m2 of coverage for the assembly hall.
- FAR: 2 x 600 = 1200 m2 / 2400 = 0.5 <= limit 1.0.

## Process to animate
1. Hook: Farhan's sheet, building fills the plot boundary edge to edge, red "REJECTED" stamp.
2. Plot rectangle 60 x 40 draws on with dimension lines; area counter runs to 2400 m2.
3. Setback bands slide in (6 m front, 3 m others), hatched; buildable zone glows 51 x 34.
4. Six classroom boxes drop in a row (7.5 m each), dimension ticks count to 45 m, fits inside 51.
5. Coverage bar: limit line at 40 % (960 m2); block fills to 25 % (600 m2), hall slot shown dotted in remaining space.
6. FAR: second floor stacks on top (isometric pop), floor area counter 600 + 600 = 1200, divided by 2400 -> 0.5 gauge, limit 1.0.
7. Orientation: sun arc east to west across the plan; block rotates so long walls face N-S; heat arrows hit only short ends; breeze arrows pass through windows on both long sides.
8. Human side: Raghu drags the block into the front setback; fire engine icon cannot reach; block snaps back.

## Diagrams needed
Site plan with setbacks; coverage bar/gauge; stacked-floor FAR diagram; sun path + wind arrows on plan; fire engine access. Faces: Farhan, Ananya, Lakshmi, Raghu, Deshpande. Scene: eciv-scene-plot, eciv-scene-site-office.

## New canon facts (for lead)
- Plot: 60 m x 40 m = 2400 m2, next to the old school (EXAMPLE).
- Setbacks used: 6 m front (becomes the bus bay), 3 m sides and rear (EXAMPLE, "check local bye-laws").
- Classroom block: two floors, 6 classrooms per floor in a row (12 total), 7.5 m x 6 m each (matches Ep 13 canon), long walls facing north and south, footprint 600 m2, corridor 2.5 m wide (EXAMPLE).
- Assembly hall is a separate structure on the same plot (fits remaining coverage).
- Code canon: NBC 2016 replaced by National Building Construction Standards 2026 (SP 7:2026) from 30 April 2026 - later episodes should name SP 7:2026, not NBC 2016, as current.
