# Series bible - PUC Biology (Class 11-12, NEET focus)

Standard: docs/series/PUC.md ("Every PUC episode must have", "Ending order", shared editing style, puc-biology "Living diagram") applies unchanged. Style frames: docs/series/puc-samples/4-biology-lesson.png and 4-biology-exam.png. Engine, captions, title travel, pacing, outro and quality bar: videos/mba-introduction-to-marketing/ and videos/mba-scientific-management-f-w-taylor/. Overrides for subagents: docs/series/puc-biology-overrides.md.
World: worlds/puc/ (Lab Notebook, shared, owned by PUC Physics). Accent leaf green #3E9B5F (`PUC.init({subject:'biology'})`). Subject pill: LIVING DIAGRAM. Category "PUC Biology" (world id puc-biology). Playlists per class: "PUC Biology | Class 11 | Quest Academy", "PUC Biology | Class 12 | Quest Academy". Kit branch: kit-puc-biology (then -2, -3 for overlapping batches). Image prefix: puc-biology-.
NCERT chip: `CLASS 11 · BIOLOGY · CH N CHAPTER NAME` (uppercase, middle dots). Title: `<Hook-style title> Explained Simply | PUC Biology Class 11` (Class 12 for second-year topics), <= 70 chars. meta.json `"series": {"name": "PUC Biology", "ep": N}`.

## Amjad's PUC Ep 1 feedback (from PUC Physics, 20 Oct 2026) - binding here too
1. Opening (first 10-15 s) gives a reason to keep watching: a curiosity question that links everyday cases to the idea, then the cast hook. Never open with a definition.
2. Explain the reasoning, not only the result: every step tagged with why it is true.
3. 1-2 "Pause and think" checks inside the lesson (PUC.think, script pause 3.0-3.2 s, silent ring): ask, pause, reveal the answer AND the reason.
4. Hard distinctions get a side-by-side comparison with one simple example each, then a question that tests the difference.
5. Ending: recap card (pinned, SCREENSHOT THIS, 3 s) -> "Can you answer these without help?" card with three questions (no answers) -> NEXT strip with a curiosity teaser -> brand outro.
6. No left border. Check alignment of every list row. Avoid element ids that collide with world ids (#st1, #st2, #stF, #stmt, #sweep, #cap, #prog).
Length 4:00-6:00 of voice. Approved PUC reference to copy for engine use: videos/puc-physics-physical-quantities-and-their-classification/.

## Chapters (current rationalised NCERT, verified 20 Oct 2026)
Class 11: 1 The Living World · 2 Biological Classification · 3 Plant Kingdom · 4 Animal Kingdom · 5 Morphology of Flowering Plants · 6 Anatomy of Flowering Plants · 7 Structural Organisation in Animals · 8 Cell: The Unit of Life · 9 Biomolecules · 10 Cell Cycle and Cell Division · 11 Photosynthesis in Higher Plants · 12 Respiration in Plants · 13 Plant Growth and Development · 14 Breathing and Exchange of Gases · 15 Body Fluids and Circulation · 16 Excretory Products and their Elimination · 17 Locomotion and Movement · 18 Neural Control and Coordination · 19 Chemical Coordination and Integration
Class 12: 1 Sexual Reproduction in Flowering Plants · 2 Human Reproduction · 3 Reproductive Health · 4 Principles of Inheritance and Variation · 5 Molecular Basis of Inheritance · 6 Evolution · 7 Human Health and Disease · 8 Microbes in Human Welfare · 9 Biotechnology: Principles and Processes · 10 Biotechnology and its Applications · 11 Organisms and Populations · 12 Ecosystem · 13 Biodiversity and Conservation
Removed in rationalisation (never use as chapter chips): Class 11 Transport in Plants, Mineral Nutrition, Digestion and Absorption; Class 12 Reproduction in Organisms, Strategies for Enhancement in Food Production, Environmental Issues. If a topic comes from a removed chapter, flag it to Amjad before authoring (NEET syllabus follows the rationalised books).
Sources: NCERT chapter list as reproduced by careers360 (Class 11) and geeksforgeeks (Class 12); re-check each chip against the NCERT PDF chapter heading before an episode ships.

## The cast (shared PUC canon, assets/illustrations/puc/)
- **Diya**, 17, PCMB, NEET, wants to be a doctor. Curious about the body, plants and kitchen chemistry. Hook lead for almost every biology topic.
- **Aarav**, 17, PCME, JEE, rides a bicycle. Hook lead only where the topic is mechanical, numerical or about his own body in motion (muscle contraction and levers, breathing hard on the bicycle climb, heart rate after a ride, genetics ratios as a number puzzle). He is the "but how does it work?" voice.
- Classmates in a Bengaluru PU college, study together after class. Each hook: one of them notices an everyday puzzle (a leaf turning yellow, a curd bowl setting, a scraped knee clotting, panting after a bicycle climb). After the hook they appear only as small face avatars with one-line reactions. The concept carries the video.
- Hook scenes available: scene-corridor, scene-kitchen, scene-bicycle, scene-study (shared). Subject images go in assets/illustrations/puc/puc-biology-* with a README line.
- No real brands. Real scientists (Schleiden, Schwann, Virchow, Mendel, Watson, Crick, Meselson, Stahl, Calvin, Hatch, Slack, Darwin, Miller, Ernst Mayr...) only as text cards with verified dates, never portraits.

## Living diagram canon (keep consistent across episodes)
- Diagrams: vintage cartoon illustration look in the PUC palette, built as SVG in the scene (precise, animatable) or as Canva cutouts with no labels baked in. Labels in Poppins 600 with leader lines that draw from the part (dot on the part) to the label. NCERT diagram names used exactly (singular on a pointer: "Mitochondrion").
- Zoom ladder chip row under the title (e.g. LEAF -> TISSUE -> CELL -> CHLOROPLAST -> MOLECULE): done steps outlined green, current step filled green, future steps grey. Each step is one smooth camera push-in with a scale chip (navy pill, IBM Plex Mono, "x400").
- Process stage chains: numbered stage pills in a row; the current stage filled green with a looping animation inside its card; finished stages outlined.
- Fixed colours for recurring things (same in diagram, label dot, formula/equation and readout): chloroplast / chlorophyll leaf green #3E9B5F; mitochondrion orange #E58A3C; nucleus / DNA violet #7B4B94; water and vacuole sky #5AA0C8; oxygen sky #2F6FEB; carbon dioxide grey #6B7280; glucose / sugar gold #C9962B; ATP orange #E58A3C; blood (oxygenated) red #D1495B, (deoxygenated) plum #6D3B6E; cell wall tan #C9B36A with olive edge.
- Numbers (sizes, counts, rates) in IBM Plex Mono with units; illustrative numbers carry the ghost chip "EXAMPLE FIGURES".

## Topics not in the current NCERT text (verified 20 Oct 2026)
Rationalised NCERT deleted: Ch 1 §1.1 "What is 'Living'?" and §1.4 Taxonomical Aids (1.4.2 Botanical Gardens, 1.4.3 Museum, 1.4.4 Zoological Parks); Ch 3 §3.5 Angiosperms and §3.6 Plant Life Cycles and Alternation of Generations (sources: MTG and Oswal deletion tables). The NEET syllabus also lists "tools for study of taxonomy" and "three domains of life" as deleted (PW NEET deleted-syllabus list). Ch 2 and Ch 4: no deletions.
Amjad's list keeps these topics (Eps 2, 3, 9, 10, 26-29, marked * below). For them: keep the chapter chip, show a ghost chip "NOT IN THE CURRENT NCERT TEXT" on the title card and the first lesson card, never say "NCERT says" for that content, and light NO exam chips in "Where it is asked" (give only the question type). Facts still come from the older NCERT edition and standard texts, verified.

## Episodes (Amjad's order, 20 Oct 2026) - Class 11: subject intro + Chapters 1-4
Ep 1 is the subject introduction (Amjad, 20 Oct 2026): what biology is and what it studies, what makes something living, the levels of organisation (molecule -> cell -> tissue -> organ -> organism -> population -> ecosystem), the main branches, the map of PUC Biology (Class 11 units, Class 12 units), the cell as the unit of life, why classification and names matter, and how each episode works. Chip `CLASS 11 · BIOLOGY · INTRODUCTION`.
Chips: Eps 2-10 `CH 1 THE LIVING WORLD` · Eps 11-20 `CH 2 BIOLOGICAL CLASSIFICATION` · Eps 21-30 `CH 3 PLANT KINGDOM` · Eps 31-39 `CH 4 ANIMAL KINGDOM`.
| ep | topic | hook lead | hook |
|---|---|---|---|
| 1 | Introduction to PUC Biology | Diya | a mango tree, a curd bowl and her own hand: all alive, all made of cells - what is this subject really about? |
| 2 | Characteristics of Living Organisms * | Diya | a crystal of sugar grows in syrup, a seed sits still: which one is alive? |
| 3 | Growth, Reproduction, Metabolism and Cellular Organisation * | Diya | a mule never has babies, yet it is alive |
| 4 | Biodiversity and the Need for Classification | Diya | the college garden: how many kinds of living things in one walk? |
| 5 | Taxonomy and Systematics | Diya | sorting the kitchen spice box, then the garden |
| 6 | Taxonomic Categories and Hierarchy | Aarav | a postal address: country, state, city, street, house |
| 7 | Species, Genus, Family, Order, Class, Phylum and Kingdom | Diya | mango, potato, housefly, human: walking each one up the ladder |
| 8 | Binomial Nomenclature and Scientific Naming Rules | Diya | the same fish has a different name in every language |
| 9 | Taxonomic Aids: Herbaria, Museums, Botanical Gardens and Keys * | Diya | a pressed leaf in an old book |
| 10 | Three-Domain System of Classification * | Aarav | bacteria in a hot spring: one kingdom, or more? |
| 11 | Basis of Biological Classification | Diya | why a mushroom is not a plant |
| 12 | Five-Kingdom Classification | Diya | two kingdoms (plant, animal) cannot place a mushroom or a bacterium |
| 13 | Kingdom Monera: Bacteria and Cyanobacteria | Diya | milk turning into curd overnight |
| 14 | Kingdom Protista: Major Groups and Examples | Diya | a drop of pond water under the college microscope |
| 15 | Kingdom Fungi: Characteristics and Classification | Diya | green-black spots on old bread |
| 16 | Modes of Nutrition and Reproduction in Fungi | Diya | the bread mould spreads to the next slice |
| 17 | Lichens and Symbiotic Relationships | Aarav | grey-green patches on the rock by the bicycle road |
| 18 | Viruses and their Structure | Diya | a cold that antibiotics cannot cure |
| 19 | Viroids and Prions | Diya | something smaller than a virus that still causes disease |
| 20 | Economic and Ecological Importance of Microorganisms | Diya | curd, idli batter and the compost pit |
| 21 | Basis of Plant Classification | Diya | moss, fern, pine, mango: four plants, one garden |
| 22 | Algae: Major Groups, Characteristics and Examples | Diya | green slime on the water tank wall |
| 23 | Bryophytes: Liverworts and Mosses | Diya | velvet moss on the compound wall in the monsoon |
| 24 | Pteridophytes: Ferns and Related Plants | Diya | the fern pot on the corridor, brown dots under its leaves |
| 25 | Gymnosperms: Structure and Reproduction | Aarav | a pine cone picked up on a hill-station trip |
| 26 | Angiosperms: Monocots and Dicots * | Diya | a grass blade and a mango leaf: lines vs a net |
| 27 | Alternation of Generations * | Diya | the moss has two lives taking turns |
| 28 | Haploid and Diploid Phases * | Aarav | n and 2n: counting chromosome sets like a number puzzle |
| 29 | Life Cycles of Major Plant Groups * | Diya | which phase do we actually see in a moss, a fern, a mango tree? |
| 30 | Evolutionary Trends in Plant Organisation | Diya | from water slime to tall trees: what changed? |
| 31 | Basis of Animal Classification | Diya | a sponge, a jellyfish and a cockroach on one page |
| 32 | Levels of Organisation | Aarav | a crowd, a team and a machine: cells working alone or together |
| 33 | Body Symmetry and Germ Layers | Aarav | cutting a starfish, a cockroach and a sponge with a line |
| 34 | Coelom and Segmentation | Diya | the earthworm after rain: rings on its body |
| 35 | Non-Chordate Phyla: Porifera to Hemichordata | Diya | ten animals in the college museum shelf |
| 36 | Chordate Characteristics | Diya | what a fish embryo and a human embryo share |
| 37 | Vertebrate Groups: Fishes, Amphibians, Reptiles, Birds and Mammals | Diya | a frog, a lizard, a crow and a cat near the hostel |
| 38 | Distinguishing Features and Representative Examples | Diya | whale, bat, penguin: odd ones that break the obvious rule |
| 39 | Comparative Classification Diagrams | Aarav | one flowchart that sorts every animal in the chapter |

## Canon added by episodes
(lead adds recurring facts reported by subagents here)
