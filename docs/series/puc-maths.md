# Series bible - PUC Maths (Class 11-12, JEE focus)

Standard: docs/series/PUC.md ("Every PUC episode must have", "Ending order", shared editing style, puc-maths "Proof board") applies unchanged. Style frames: docs/series/puc-samples/3-maths-lesson.png and 3-maths-exam.png. Engine, captions, title travel, pacing, outro and quality bar: videos/mba-introduction-to-marketing/ and videos/mba-scientific-management-f-w-taylor/. Overrides for subagents: docs/series/puc-maths-overrides.md.
World: worlds/puc/ (Lab Notebook, shared, owned by PUC Physics; never edit). Accent coral #E4572E. Category "PUC Maths" (world id puc-maths). Playlists: "PUC Maths | Class 11 | Quest Academy", "PUC Maths | Class 12 | Quest Academy". Kit branch: kit-puc-maths (then -2, -3 for overlapping batches). Image prefix: puc-maths-.
NCERT chip: `CLASS 11 · MATHEMATICS · CH N CHAPTER NAME` (uppercase, middle dots, as in the maths sample frame). Subject pill: `PROOF BOARD`. Title: `<Hook-style title> Explained Simply | PUC Maths Class 11` (Class 12 for second-year topics), <= 70 chars. meta.json `"series": {"name": "PUC Maths", "ep": N}`.
Reference episode (APPROVED by Amjad 20 Oct 2026): videos/puc-maths-definition-and-representation-of-sets/ (Ep 2, first lesson; was Ep 1 before the subject intro was added).

## Chapters (current rationalised NCERT)
Class 11: 1 Sets · 2 Relations and Functions · 3 Trigonometric Functions · 4 Complex Numbers and Quadratic Equations · 5 Linear Inequalities · 6 Permutations and Combinations · 7 Binomial Theorem · 8 Sequences and Series · 9 Straight Lines · 10 Conic Sections · 11 Introduction to Three Dimensional Geometry · 12 Limits and Derivatives · 13 Statistics · 14 Probability
Class 12 Part I: 1 Relations and Functions · 2 Inverse Trigonometric Functions · 3 Matrices · 4 Determinants · 5 Continuity and Differentiability · 6 Application of Derivatives
Class 12 Part II: 7 Integrals · 8 Application of Integrals · 9 Differential Equations · 10 Vector Algebra · 11 Three Dimensional Geometry · 12 Linear Programming · 13 Probability
Verified 20 Oct 2026: Class 11 list (14 chapters; Principle of Mathematical Induction and Mathematical Reasoning removed). Class 12 list from the rationalised books: re-check against ncert.nic.in before its first episode.

### Chapter 1 note: what the current NCERT text dropped
The rationalised Ch 1 removed section 1.7 Power Set and section 1.12 Practical Problems on Union and Intersection of Two Sets (also Ex 1.6); the Karnataka 1st PUC syllabus excludes the same two. JEE Main still lists "Power set" in Unit 1 (Sets, Relations and Functions). So Ep 5 (Power sets) follows the JEE Main syllabus and Ep 11 (Applications) teaches n(A ∪ B) = n(A) + n(B) - n(A ∩ B) as a JEE problem-solving tool. Keep the chip `CH 1 SETS`, say on screen "Not in the current NCERT text · asked in JEE Main" (ghost chip) for those two, and never claim "NCERT says" for that content. Where it is asked: do not light PUC BOARDS for Eps 5 and 11.

## Amjad's PUC Ep 1 feedback (from PUC Physics, 20 Oct 2026) - binding here too
1. Opening (first 10-15 s) gives a reason to keep watching: a curiosity question that links everyday cases to the idea, then the cast hook. Never open with a definition.
2. Explain the reasoning, not only the result: every step tagged with why it is true.
3. 1-2 "Pause and think" checks inside the lesson (PUC.think, script pause 3.0-3.2 s, silent ring): ask, pause, reveal the answer AND the reason.
4. Hard distinctions get a side-by-side comparison with one simple example each, then a question that tests the difference.
5. Ending: recap card (pinned, SCREENSHOT THIS, 3 s) -> "Can you answer these without help?" card with three questions (no answers) -> NEXT strip with a curiosity teaser -> brand outro.
6. No left border. Check alignment of every derivation/list row.
Length 4:00-6:00 of voice.

## The cast (shared PUC canon, assets/illustrations/puc/)
- **Aarav**, 17, PCME, JEE. Curious about machines, circuits and numbers; rides a bicycle to college. Default hook lead for maths.
- **Diya**, 17, PCMB, NEET. Curious about the body, plants and kitchen chemistry; wants to be a doctor. Hook lead where the puzzle is in the kitchen, the body or a class survey.
- Classmates in a Bengaluru PU college; they study together after class. Hook = one scene card from the library + the cutout + one line. After that only small face avatars with one-line reactions. The concept carries the video. Other classmates may be named in examples (Ravi, Meera, Kiran, Sana, Joel) as plain text, no images.
- No real brands. Real mathematicians only as text cards with verified facts (Georg Cantor, 1845-1918, founded set theory; John Venn, 1834-1923, Venn diagrams, 1880), never portraits.

## Proof board canon (keep consistent across episodes)
- Layout: proof column (numbered steps, max 5 on screen, changed term highlighted then settles) beside a geometric picture or live plot whose parts take the colour of their terms.
- Live parameter: a value counts up in Plex Mono and the picture morphs live (a rule `x < k` with k counting up, the set growing on a number line; later a curve morphing).
- Colour-coding: the variable / element x = violet #7A4FE0; the rule or condition (what comes after the colon) = coral accent #E4572E; set A and its region = blue #2F6FEB; set B and its region = teal #0E8F8F; the universal set U = ink #16213E outline; "not in" / wrong = red #D64545; counts n(A) in Plex Mono ink.
- Notation: capital letters for sets, small letters for elements; ∈ and ∉; roster with curly brackets and commas; set-builder `{x : rule}` (colon = "such that"). N = {1, 2, 3, ...} (0 is not a natural number), Z integers, Q rationals p/q with q ≠ 0, R reals (NCERT symbols). Intervals: (a, b) open, [a, b] closed.
- Numbers, counts and readouts in IBM Plex Mono; formulas in KaTeX, variables italic.

## Episodes (Amjad's order, 20 Oct 2026) - Class 11: subject intro + Chapters 1-4
Ep 1 is the subject introduction (Amjad, 20 Oct 2026): what Class 11 maths is, the map of the year, the basic toolkit (number system N, W, Z, Q, irrationals, R; variables, expressions, equations, inequalities; the symbols the series uses) and how each episode works. Its chip is `CLASS 11 · MATHEMATICS · INTRODUCTION`.
| ep | topic | chip | hook lead | hook |
|---|---|---|---|---|
| 1 | Introduction to PUC Maths | INTRODUCTION | Aarav | one bicycle ride to college holds a count, a speed, a turn angle and a curve - all maths; what this year teaches |
| 2 | Definition and Representation of Sets | CH 1 SETS | Aarav | three friends, three lists of good students, one list of bicycle riders |
| 3 | Roster and Set-Builder Forms | CH 1 SETS | Aarav | the letters of SCHOOL: why the set keeps only one O |
| 4 | Empty, Finite, Infinite and Universal Sets | CH 1 SETS | Aarav | the set of even primes bigger than 2 - is it nothing, or something? |
| 5 | Subsets and Equal Sets | CH 1 SETS | Diya | every NEET subject she studies is also a PUC subject, but not the other way |
| 6 | Power Sets | CH 1 SETS | Aarav | how many different tiffin combinations from 3 snacks, including none? |
| 7 | Intervals on the Real Number Line | CH 1 SETS | Aarav | a road sign "speed 20 to 40 km/h" - is 40 allowed? open vs closed ends |
| 8 | Union, Intersection and Difference | CH 1 SETS | Diya | two friends' favourite fruit lists: all of them, both, only hers |
| 9 | Complement of a Set | CH 1 SETS | Aarav | everyone in class who did NOT ride a bicycle today |
| 10 | Venn Diagrams | CH 1 SETS | Diya | sorting classmates who take Biology, Maths or both into circles |
| 11 | Properties of Set Operations | CH 1 SETS | Aarav | does the order of union and intersection ever change the answer? |
| 12 | Applications of Sets to Real-World Problems | CH 1 SETS | Diya | class survey: 25 like tea, 18 like coffee, 10 like both - how many students? |
| 13 | Cartesian Products of Sets | CH 2 RELATIONS AND FUNCTIONS | Diya | canteen: 3 snacks and 2 drinks - how many different combos? |
| 14 | Ordered Pairs | CH 2 RELATIONS AND FUNCTIONS | Aarav | exam hall seat (3, 5) is not seat (5, 3): order matters |
| 15 | Relations and their Domains and Ranges | CH 2 RELATIONS AND FUNCTIONS | Diya | linking classmates to their blood groups |
| 16 | Functions as Mappings | CH 2 RELATIONS AND FUNCTIONS | Aarav | every roll number points to exactly one student |
| 17 | Domain, Codomain and Range | CH 2 RELATIONS AND FUNCTIONS | Aarav | marks can be 0 to 100, but the class only scored 41 to 96 |
| 18 | Real-Valued Functions | CH 2 RELATIONS AND FUNCTIONS | Diya | a number for every hour: body temperature through the day |
| 19 | Constant, Identity and Polynomial Functions | CH 2 RELATIONS AND FUNCTIONS | Aarav | a fixed bus fare, a mirror, and the area of a square plot |
| 20 | Rational and Modulus Functions | CH 2 RELATIONS AND FUNCTIONS | Aarav | distance from home is never negative, whichever way he rides |
| 21 | Signum and Greatest Integer Functions | CH 2 RELATIONS AND FUNCTIONS | Diya | age is counted in completed years: 16.9 years old is still 16 |
| 22 | Graphs of Standard Functions | CH 2 RELATIONS AND FUNCTIONS | Aarav | one sheet of graph paper, six different shapes |
| 23 | Combining and Comparing Functions | CH 2 RELATIONS AND FUNCTIONS | Diya | canteen bill = cost of tea + cost of snack: adding two rules |
| 24 | Degree and Radian Measures | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | his bicycle wheel: why measure a turn by the arc it rolls |
| 25 | Conversion between Degrees and Radians | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | half a wheel turn is 180 degrees and also pi radians |
| 26 | Unit Circle and Angle Measurement | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | the tyre valve going round: positive and negative angles |
| 27 | Definitions of Sine, Cosine and Other Trigonometric Functions | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | how high is the tyre valve as the wheel turns? |
| 28 | Signs in Different Quadrants | CH 3 TRIGONOMETRIC FUNCTIONS | Diya | the valve is above or below, left or right of the hub |
| 29 | Domain and Range of Trigonometric Functions | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | the valve can never rise higher than the wheel radius |
| 30 | Graphs of Sine, Cosine and Tangent | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | trace the valve height over time: a wave appears |
| 31 | Periodicity and Symmetry | CH 3 TRIGONOMETRIC FUNCTIONS | Diya | a heartbeat on a monitor repeats the same shape |
| 32 | Trigonometric Identities | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | three different-looking expressions always give the same number |
| 33 | Compound-Angle Formulae | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | is sin(30° + 60°) equal to sin 30° + sin 60°? test it |
| 34 | Double-Angle and Triple-Angle Identities | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | doubling the angle does not double the sine |
| 35 | Transformations between Sums and Products | CH 3 TRIGONOMETRIC FUNCTIONS | Diya | two notes played together make a beat: a sum hiding a product |
| 36 | Trigonometric Equations | CH 3 TRIGONOMETRIC FUNCTIONS | Aarav | when is the valve exactly at half height? again and again, forever |
| 37 | Need for Complex Numbers | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | x² + 1 = 0: no number on the number line works |
| 38 | The Imaginary Unit i | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | powers of i repeat every four turns |
| 39 | Real and Imaginary Parts | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Diya | a two-part address: which street, which floor |
| 40 | Algebra of Complex Numbers | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | adding complex numbers like adding two moves on a map |
| 41 | Equality and Conjugates | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | a mirror image across the road |
| 42 | Modulus and Argument | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | a bicycle trip: how far, and in which direction |
| 43 | Geometric Representation on the Argand Plane | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Diya | giving every number a place on a 2D map |
| 44 | Polar Representation | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | directions as distance plus angle, not east plus north |
| 45 | Quadratic Equations with Real and Complex Roots | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | a ball thrown up: some heights it reaches twice, some never |
| 46 | Discriminant and Nature of Roots | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | one number tells you the answer type before you solve |
| 47 | Relationships between Roots and Coefficients | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Diya | the sum and product of the answers, without solving |
| 48 | Formation of Quadratic Equations from Roots | CH 4 COMPLEX NUMBERS AND QUADRATIC EQUATIONS | Aarav | build the equation backwards from its answers |
Slugs: `puc-maths-` + topic slug (tools/queue.py). Ep 48 ends with a `CHAPTER 4 COMPLETE` strip pointing to the playlist instead of NEXT.
Topics Amjad marked "supplementary", "where prescribed" or "extension" (Eps 23, 35, 44) and any topic the rationalised NCERT text dropped: teach it for JEE Main if the NTA syllabus lists it, show the ghost chip `NOT IN CURRENT NCERT TEXT · JEE` (or `BEYOND NCERT · JEE` if neither lists it) and never light PUC BOARDS for it. Verify each chapter's current sections before claiming "NCERT".

## Canon added by episodes
(lead adds recurring facts reported by subagents here)
- Chapter 3 fixed colours: theta / first angle x (alpha) violet #7A4FE0, cos blue #2F6FEB, sin coral (accent), tan teal #0E8F8F, sec and second angle y (beta) gold #B7791F, cot orange #D9731A, cosec magenta #C2378A.
- Chapter 1 colours: element x violet, rule coral, set A blue, set B teal, U ink, not-in red. Intro number families: N coral, Z teal, Q blue, R ink, irrational violet.

## PUC BOARDS chip: verified Karnataka 1st PUC annual papers (read 21 Oct 2026)
Sources: M-2024 = 1st PUC Mathematics (35) annual exam March 2024, current syllabus (https://docs.aglasem.com/view/98372ba4-0d67-11ef-b7fe-0a5e36bc6706). A-2023 = 1st PUC annual exam Feb/March 2023, pre-rationalisation syllabus (https://docs.aglasem.com/view/961419e2-a627-11ee-8057-0a5e36bc6706).
Light PUC BOARDS ONLY for these episodes (question that proves it in brackets):
- Ep 3 roster form (A-2023 Q18) · Ep 5 subsets (M-2024 Q22) · Ep 7 intervals (M-2024 Q1) · Ep 8 union/difference (M-2024 Q21, Q22) · Ep 9 complement (M-2024 Q32, A-2023 Q22) · Ep 11 properties, De Morgan (M-2024 Q32, A-2023 Q1)
- Ep 13 n(A x B) (M-2024 Q2, A-2023 Q23) · Ep 14 equal ordered pairs (M-2024 Q16) · Ep 15 number of relations, domain/range of a relation (A-2023 Q2, Q36) · Ep 17 domain, codomain, range (A-2023 Q36, M-2024 Q43) · Ep 18 real valued functions (M-2024 Q33) · Ep 20 modulus function (M-2024 Q43, A-2023 Q49) · Ep 22 graph of the modulus function (M-2024 Q43) · Ep 23 f+g, f-g, fg (M-2024 Q33)
- Ep 24 arc length l = r theta (A-2023 Q24) · Ep 25 radian measure of 240 degrees (M-2024 Q3, A-2023 Q16) · Ep 27 standard values (M-2024 Q23) · Ep 28 signs by quadrant (M-2024 Q36, A-2023 Q25) · Ep 29 domain of sec x (A-2023 Q3) · Ep 32 identities (M-2024 Q36) · Ep 33 cos(x + y) geometric proof (M-2024 Q51, A-2023 Q59) · Ep 34 sin 3x (M-2024 Q34) · Ep 35 sum to product (M-2024 Q44, A-2023 Q50)
- Ep 38 powers of i (M-2024 Q4) · Ep 39 a + ib form (M-2024 Q25) · Ep 40 inverses, (1 - i)^4 (M-2024 Q24, A-2023 Q4, Q26) · Ep 41 division by a conjugate (M-2024 Q35) · Ep 42 modulus, x^2 + y^2 = 1 (M-2024 Q35) · Ep 45 complex roots of 2x^2 + x + 1 = 0 (A-2023 Q39, only if still in current NCERT text)
All other episodes: PUC BOARDS stays unlit (no verified question, or the topic left the current syllabus: power sets, n(A U B) applications, trig equations, polar form).
