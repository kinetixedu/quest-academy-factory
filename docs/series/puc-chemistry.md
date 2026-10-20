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
All Class 11. Ep 1 Introduction to Chemistry was added by Amjad on 20 Oct 2026 as the series opener (what chemistry is, so viewers have the basic idea before anything else); Importance and Scope moved to Ep 2.
1 Introduction to Chemistry · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-introduction-to-chemistry`
2 Importance and Scope of Chemistry · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-importance-and-scope-of-chemistry`
3 Nature and Classification of Matter · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-nature-and-classification-of-matter`
4 Physical and Chemical Properties · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-physical-and-chemical-properties`
5 Measurement, SI Units and Uncertainty · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-measurement-si-units-and-uncertainty`
6 Laws of Chemical Combination · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-laws-of-chemical-combination`
7 Dalton's Atomic Theory · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-dalton-s-atomic-theory`
8 Atomic Mass and Molecular Mass · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-atomic-mass-and-molecular-mass`
9 Mole Concept and Molar Mass · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-mole-concept-and-molar-mass`
10 Percentage Composition · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-percentage-composition`
11 Empirical and Molecular Formulae · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Diya · `puc-chemistry-empirical-and-molecular-formulae`
12 Chemical Equations and Stoichiometry · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-chemical-equations-and-stoichiometry`
13 Limiting Reagent and Numerical Calculations · Class 11 · CH 1 SOME BASIC CONCEPTS OF CHEMISTRY · hook Aarav · `puc-chemistry-limiting-reagent-and-numerical-calculations`
14 Discovery of Electrons, Protons and Neutrons · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-discovery-of-electrons-protons-and-neutrons`
15 Thomson, Rutherford and Bohr Atomic Models · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-thomson-rutherford-and-bohr-atomic-models`
16 Atomic Spectra and Hydrogen Spectrum · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-atomic-spectra-and-hydrogen-spectrum`
17 Electromagnetic Radiation and Planck's Quantum Theory · Class 11 · CH 2 STRUCTURE OF ATOM · hook Aarav · `puc-chemistry-electromagnetic-radiation-and-planck-s-quantum-theory`
18 Photoelectric Effect and Dual Nature of Matter · Class 11 · CH 2 STRUCTURE OF ATOM · hook Aarav · `puc-chemistry-photoelectric-effect-and-dual-nature-of-matter`
19 de Broglie Relation · Class 11 · CH 2 STRUCTURE OF ATOM · hook Aarav · `puc-chemistry-de-broglie-relation`
20 Heisenberg Uncertainty Principle · Class 11 · CH 2 STRUCTURE OF ATOM · hook Aarav · `puc-chemistry-heisenberg-uncertainty-principle`
21 Quantum Mechanical Model · Class 11 · CH 2 STRUCTURE OF ATOM · hook Aarav · `puc-chemistry-quantum-mechanical-model`
22 Orbitals and Quantum Numbers · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-orbitals-and-quantum-numbers`
23 Shapes of s, p and d Orbitals · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-shapes-of-s-p-and-d-orbitals`
24 Aufbau Principle, Pauli Exclusion Principle and Hund's Rule · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-aufbau-principle-pauli-exclusion-principle-and-hund-s-rule`
25 Electronic Configurations · Class 11 · CH 2 STRUCTURE OF ATOM · hook Diya · `puc-chemistry-electronic-configurations`
26 Development of Periodic Classification · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Aarav · `puc-chemistry-development-of-periodic-classification`
27 Modern Periodic Law · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-modern-periodic-law`
28 Structure of the Modern Periodic Table · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-structure-of-the-modern-periodic-table`
29 Periods, Groups and Blocks · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-periods-groups-and-blocks`
30 Electronic Configuration and Position of Elements · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-electronic-configuration-and-position-of-elements`
31 Atomic and Ionic Radii · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-atomic-and-ionic-radii`
32 Ionization Enthalpy · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Aarav · `puc-chemistry-ionization-enthalpy`
33 Electron Gain Enthalpy · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-electron-gain-enthalpy`
34 Electronegativity · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-electronegativity`
35 Valency and Oxidation States · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-valency-and-oxidation-states`
36 Periodic Trends Across Periods and Down Groups · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Aarav · `puc-chemistry-periodic-trends-across-periods-and-down-groups`
37 Exceptions and Anomalous Periodic Behaviour · Class 11 · CH 3 CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES · hook Diya · `puc-chemistry-exceptions-and-anomalous-periodic-behaviour`
Ep 13 "Limiting reagent and numerical calculations (supplementary extension where applicable)": core limiting reagent is NCERT Ch 1; extra numericals beyond NCERT are labelled as practice, never as NCERT text.
Ep 37 is the last of this batch: NEXT strip teases Chapter 4, Chemical Bonding and Molecular Structure.
Reference episode: videos/puc-chemistry-importance-and-scope-of-chemistry/ (Ep 2, style approved by Amjad's go-ahead on 20 Oct 2026).

## Canon added by episodes
(lead adds recurring facts reported by subagents here)
- Colours: O violet #7A4FE0; coefficients and n gold #B7791F; Cl blue #2F6FEB (Ep 11); limiting reagent = red chip, excess = ink chip on the counter (Ep 13).
- Molarity written M or mol L^-1; NCERT example 4 g NaOH in 250 mL = 0.4 M (Ep 12). Gas volumes at STP 22.7 L mol^-1 (NCERT, 1 bar).
- Ep 13 practice numericals are labelled PRACTICE · NOT FROM NCERT on screen and in the voice.
