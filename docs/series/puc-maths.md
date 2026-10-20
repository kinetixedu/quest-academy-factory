# Series bible - PUC Maths (Class 11-12, JEE focus)

Standard: docs/series/PUC.md ("Every PUC episode must have", "Ending order", shared editing style, puc-maths "Proof board") applies unchanged. Style frames: docs/series/puc-samples/3-maths-lesson.png and 3-maths-exam.png. Engine, captions, title travel, pacing, outro and quality bar: videos/mba-introduction-to-marketing/ and videos/mba-scientific-management-f-w-taylor/. Overrides for subagents: docs/series/puc-maths-overrides.md.
World: worlds/puc/ (Lab Notebook, shared, owned by PUC Physics; never edit). Accent coral #E4572E. Category "PUC Maths" (world id puc-maths). Playlists: "PUC Maths | Class 11 | Quest Academy", "PUC Maths | Class 12 | Quest Academy". Kit branch: kit-puc-maths (then -2, -3 for overlapping batches). Image prefix: puc-maths-.
NCERT chip: `CLASS 11 · MATHEMATICS · CH N CHAPTER NAME` (uppercase, middle dots, as in the maths sample frame). Subject pill: `PROOF BOARD`. Title: `<Hook-style title> Explained Simply | PUC Maths Class 11` (Class 12 for second-year topics), <= 70 chars. meta.json `"series": {"name": "PUC Maths", "ep": N}`.
Reference episode (after Amjad's approval): videos/puc-maths-definition-and-representation-of-sets/ (Ep 1).

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

## Episodes (Amjad's order, 20 Oct 2026) - Chapter 1 Sets (Class 11)
| ep | topic | hook lead | hook |
|---|---|---|---|
| 1 | Definition and representation of sets | Aarav | "good students in class" gives a different list from every friend; "students who cycle to college" gives the same list |
| 2 | Roster and set-builder forms | Aarav | the letters of his name written two ways; why SCHOOL has only one O in a set |
| 3 | Empty, finite, infinite and universal sets | Aarav | the set of even primes bigger than 2 - is it nothing, or something? |
| 4 | Subsets and equal sets | Diya | every NEET subject she studies is also a PUC subject, but not the other way |
| 5 | Power sets | Aarav | how many different tiffin combinations from 3 snacks, including none? |
| 6 | Intervals on the real number line | Aarav | the speed sign "20 to 40 km/h" - is 40 allowed? open vs closed ends |
| 7 | Union, intersection and difference | Diya | two friends' lists of favourite fruits: all of them, both, only hers |
| 8 | Complement of a set | Aarav | everyone in class who did not bring a bicycle |
| 9 | Venn diagrams | Diya | sorting classmates who take Biology, Maths or both into circles |
| 10 | Properties of set operations | Aarav | does the order of "union then intersection" ever change the answer? |
| 11 | Applications of sets to real-world problems | Diya | a class survey: 25 like tea, 18 like coffee, 10 like both - how many in class? |
Slugs: `puc-maths-` + topic slug (tools/queue.py).

## Canon added by episodes
(lead adds recurring facts reported by subagents here)
