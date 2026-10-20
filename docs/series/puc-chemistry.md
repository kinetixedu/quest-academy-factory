# Series bible - PUC Chemistry (Class 11-12, JEE and NEET focus)

Standard: docs/series/PUC.md ("Every PUC episode must have", "Ending order", shared editing style, puc-chemistry "Molecule bench") applies unchanged. Style frames: docs/series/puc-samples/2-chemistry-lesson.png and 2-chemistry-exam.png. Engine, captions, title travel, pacing, outro and quality bar: videos/mba-introduction-to-marketing/ and videos/mba-scientific-management-f-w-taylor/. Overrides for subagents: docs/series/puc-chemistry-overrides.md.
World: worlds/puc/ (Lab Notebook, shared, owned by PUC Physics). Accent teal #0FA3A3. Category "PUC Chemistry" (world id puc-chemistry). Playlists per class: "PUC Chemistry | Class 11 | Quest Academy", "PUC Chemistry | Class 12 | Quest Academy". Kit branch: kit-puc-chemistry. Image prefix: puc-chemistry-.
NCERT chip: `CLASS 11 · CHEMISTRY · CH N CHAPTER NAME` (uppercase, middle dots). Title: `<Hook-style title> Explained Simply | PUC Chemistry Class 11` (Class 12 for second-year topics), <= 70 chars. meta.json `"series": {"name": "PUC Chemistry", "ep": N}`.

## Chapters (current rationalised NCERT, verified 20 Oct 2026 against ncert.nic.in kech1ps/kech2ps/lech1ps/lech2ps)
Class 11 (Part I): 1 Some Basic Concepts of Chemistry · 2 Structure of Atom · 3 Classification of Elements and Periodicity in Properties · 4 Chemical Bonding and Molecular Structure · 5 Thermodynamics · 6 Equilibrium
Class 11 (Part II): 7 Redox Reactions · 8 Organic Chemistry - Some Basic Principles and Techniques · 9 Hydrocarbons
Class 12 (Part I): 1 Solutions · 2 Electrochemistry · 3 Chemical Kinetics · 4 The d- and f-Block Elements · 5 Coordination Compounds
Class 12 (Part II): 6 Haloalkanes and Haloarenes · 7 Alcohols, Phenols and Ethers · 8 Aldehydes, Ketones and Carboxylic Acids · 9 Amines · 10 Biomolecules
Removed in rationalisation (do not use as chapter chips): Class 11 States of Matter, Hydrogen, s-Block, p-Block (as a chapter), Environmental Chemistry; Class 12 Solid State, Surface Chemistry, Isolation of Elements, p-Block, Polymers, Chemistry in Everyday Life. If a topic is from a removed chapter, flag it to Amjad before authoring.

## Amjad's PUC Ep 1 feedback (given on PUC Physics, 20 Oct 2026) - applied to every PUC Chemistry episode
1. Opening (first 10-15 s): a curiosity question linking everyday cases to the idea, then the cast hook. Never open with a definition.
2. Show the reasoning link by link (each link tagged on screen), not just the label.
3. 1-2 "Pause and think" checks inside the lesson (PUC.think, script pause 3.0-3.2 s, silent ring): ask, pause, reveal answer AND reason.
4. Hard distinctions get a side-by-side comparison with one simple example each, then a question that tests the difference.
5. Ending: recap card (pinned, SCREENSHOT THIS, 3 s) -> "Can you answer these without help?" with three questions -> NEXT strip with a curiosity teaser -> brand outro.
6. No accent left border. Avoid ids that collide with world ids (#st1, #st2, #stF, #sweep, #stmt, #nchip, #subj, #title, #sub, #rule).

## The cast (shared PUC canon, assets/illustrations/puc/)
- **Diya**, 17, PCMB, NEET. Curious about the body, plants and kitchen chemistry; wants to be a doctor. Hook lead for most chemistry topics.
- **Aarav**, 17, PCME, JEE. Curious about machines, circuits and numbers; rides a bicycle. Hook lead for industrial and electrochemistry topics (cells, batteries, corrosion, electrolysis, Haber-type equilibria, metallurgy-flavoured d-block topics).
- Classmates in a Bengaluru PU college, study together after class. Each hook: one of them notices an everyday puzzle (salt dissolving, a rusting bicycle chain, a pressure cooker, curd setting). After the hook they appear only as small face avatars with one-line reactions. The concept carries the video.
- No real brands. Real scientists (Mendeleev, Bohr, Lewis, Hess, Le Chatelier, Arrhenius, Nernst, Faraday, Werner) only as text cards with verified dates, never portraits.

## Molecule bench canon (keep consistent across episodes)
- Element colours on the bench: the element in play teal #0FA3A3; its partner ink #16213E; the moving electron e- warm orange #C8461B (same colour in diagrams, KaTeX and readouts). Balance counter: "left | right" in IBM Plex Mono with a green tick when equal.
- Orbit shells: thin grey rings; electron dots ink; configurations written "2, 8, 1" in Plex Mono.
- Ep 1 canon: ammonia N2 + 3H2 -> 2NH3 (balanced live on the bench); masses N = 14 u, H = 1 u; 28 g N2 + 6 g H2 -> 34 g NH3. Later episodes may reuse it.
- Constants (NCERT values): NA = 6.022 × 10^23 mol^-1, R = 8.314 J mol^-1 K^-1, F = 96487 C mol^-1 (NCERT uses 96487; check per chapter), h = 6.626 × 10^-34 J s. Verify each against the chapter before use.

## Episodes (order as given by Amjad)
Batch 1 (given 20 Oct 2026): all Class 11, chip `CLASS 11 · CHEMISTRY · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY`.
1 Importance and Scope of Chemistry · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-importance-and-scope-of-chemistry`
2 Nature and Classification of Matter · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-nature-and-classification-of-matter`
3 Physical and Chemical Properties · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-physical-and-chemical-properties`
4 Measurement, SI Units and Uncertainty · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-measurement-si-units-and-uncertainty`
5 Laws of Chemical Combination · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-laws-of-chemical-combination`
6 Dalton's Atomic Theory · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-dalton-s-atomic-theory`
7 Atomic Mass and Molecular Mass · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-atomic-mass-and-molecular-mass`
8 Mole Concept and Molar Mass · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-mole-concept-and-molar-mass`
9 Percentage Composition · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-percentage-composition`
10 Empirical and Molecular Formulae · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-empirical-and-molecular-formulae`
11 Chemical Equations and Stoichiometry · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-chemical-equations-and-stoichiometry`
12 Limiting Reagent and Numerical Calculations · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-limiting-reagent-and-numerical-calculations`
Ep 12 was listed by Amjad as "Limiting reagent and numerical calculations (supplementary extension where applicable)": core limiting reagent is in NCERT Ch 1 (stoichiometry section; verify the section number before use); extra numericals beyond NCERT are labelled as practice, never as NCERT text.
Reference episode (after Amjad's approval): videos/puc-chemistry-importance-and-scope-of-chemistry/ (Ep 1).

## Canon added by episodes
(lead adds recurring facts reported by subagents here)
