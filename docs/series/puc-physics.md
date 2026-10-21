# Series bible - PUC Physics (Class 11-12, JEE and NEET focus)

Standard: docs/series/PUC.md ("Every PUC episode must have", "Ending order", shared editing style, puc-physics "Motion notebook") applies unchanged. Style frames: docs/series/puc-samples/1-physics-lesson.png and 1-physics-exam.png. Engine, captions, title travel, pacing, outro and quality bar: videos/mba-introduction-to-marketing/ and videos/mba-scientific-management-f-w-taylor/. Overrides for subagents: docs/series/puc-physics-overrides.md.
World: worlds/puc/ (Lab Notebook, shared, owned by this stream; components documented in worlds/puc/README.md). Accent electric blue #2F6FEB. Category "PUC Physics" (world id puc-physics). Playlists: "PUC Physics | Class 11 | Quest Academy", "PUC Physics | Class 12 | Quest Academy". Kit branch: kit-puc-physics (then -2, -3 for overlapping batches). Image prefix: puc-physics-.
NCERT chip: `CLASS 11 · PHYSICS · CH N CHAPTER NAME` (uppercase, middle dots). Subject pill: `MOTION NOTEBOOK`. Title: `<Hook-style title> Explained Simply | PUC Physics Class 11` (Class 12 for second-year topics), <= 70 chars. meta.json `"series": {"name": "PUC Physics", "ep": N}`.
Reference episode (after Amjad's approval): videos/puc-physics-physical-quantities-and-their-classification/ (Ep 1).

## Chapters (current rationalised NCERT)
Class 11 Part I: 1 Units and Measurement · 2 Motion in a Straight Line · 3 Motion in a Plane · 4 Laws of Motion · 5 Work, Energy and Power · 6 System of Particles and Rotational Motion · 7 Gravitation
Class 11 Part II: 8 Mechanical Properties of Solids · 9 Mechanical Properties of Fluids · 10 Thermal Properties of Matter · 11 Thermodynamics · 12 Kinetic Theory · 13 Oscillations · 14 Waves
Class 12 Part I: 1 Electric Charges and Fields · 2 Electrostatic Potential and Capacitance · 3 Current Electricity · 4 Moving Charges and Magnetism · 5 Magnetism and Matter · 6 Electromagnetic Induction · 7 Alternating Current · 8 Electromagnetic Waves
Class 12 Part II: 9 Ray Optics and Optical Instruments · 10 Wave Optics · 11 Dual Nature of Radiation and Matter · 12 Atoms · 13 Nuclei · 14 Semiconductor Electronics: Materials, Devices and Simple Circuits
Verified 20 Oct 2026: Class 11 Ch 1 against the rationalised text (keph101: 1.1 Introduction, 1.2 The International System of Units, 1.3 Significant Figures, 1.4 Dimensions of Physical Quantities, 1.5 Dimensional Formulae and Dimensional Equations, 1.6 Dimensional Analysis and its Applications). Re-check every other chapter number and name against ncert.nic.in before its first episode.

### Chapter 1 note: errors and instruments are syllabus, not current NCERT text
The rationalised NCERT chapter dropped the old sections on accuracy and precision, least count and errors in measurement (it keeps significant figures and the uncertainty in calculated results, 1.3.3). These topics stay in the NTA syllabus for both exams (JEE Main and NEET 2026, Unit 1 "Physics and Measurement": units, SI units, fundamental and derived units, least count, significant figures, errors in measurements, dimensions, dimensional analysis and its applications; plus the experimental skills unit with vernier callipers and screw gauge). Episodes 13-17 therefore follow the NTA syllabus wording and the standard error rules; keep the chip `CH 1 UNITS AND MEASUREMENT` and never claim "NCERT says" for content that is not in the current NCERT text.

## Amjad's Ep 1 feedback (20 Oct 2026) - binding for every PUC Physics episode
1. Opening (first 10-15 s) creates a reason to keep watching: a curiosity question that links everyday cases to the idea ("How can a doctor, a shopkeeper and a student all use the same idea?"), then the cast hook. Never open with a definition.
2. Explain the reasoning, not only the category: show WHY (speed = distance / time; distance is base, time is base, so speed is derived), with each link tagged on screen.
3. Thinking pauses: 1-2 "Pause and think" checks inside the lesson (PUC.think, script line pause 3.0-3.2 s, silent ring): ask, pause, reveal the answer AND the reason.
4. Hard distinctions get a side-by-side comparison with one simple example each (e.g. base: length off a ruler vs derived: speed = 100 m / 20 s; scalar: 5 kg of rice vs vector: a 10 N push), followed by a question that tests the difference.
5. Strong ending: recap card (pinned, SCREENSHOT THIS, held 3 s) -> "Can you answer these without help?" card with three questions (no answers) -> NEXT strip with a curiosity teaser for the next lesson -> brand outro.
6. No blue left border (the world's .edge is off). Check every derivation/list row for alignment (avoid ids that collide with world ids such as #st1/#st2).
Length stays 4:00-6:00 of voice.

## The cast (shared PUC canon, assets/illustrations/puc/)
- **Aarav**, 17, PCME, JEE. Curious about machines, circuits and numbers; rides a bicycle to college. Hook lead for mechanics, measurement with instruments, electricity.
- **Diya**, 17, PCMB, NEET. Curious about the body, plants and kitchen chemistry; wants to be a doctor. Hook lead for topics close to the body or the kitchen.
- Classmates in a Bengaluru PU college; they study together after class. Each hook: one of them notices an everyday puzzle (a scene card from the library + the cutout + one line). After the hook they appear only as small face avatars with one-line reactions. The concept carries the video.
- No real brands. Real scientists only as text cards with verified facts, never portraits.

## Motion notebook canon (keep consistent across episodes)
- Layout: sim pane left (784 x 580 card), readout panel right top (Plex Mono values updating every frame), live graph right bottom with a dot linked to the sim. Signature: the sim and its graph move together.
- Colour-coding (same colour in the diagram, the readout and the formula): velocity v and the accent things = blue #2F6FEB; acceleration a / g / gravity and "wrong" = red #D64545; force F = orange #D9731A; vertical component and second quantity = violet #7A4FE0; energy E / work = teal #0E8F8F; magnitude n / numbers = ink #16213E; unit u = violet #7A4FE0 (Chapter 1).
- Motion trails: 3-4 fading ghost copies (opacity .12/.2/.3). Slow-mo replay: the sim freezes, a "SLOW-MO REPLAY · 0.25x" tag appears, vectors grow, then it resumes. Physics-true motion only.
- Constants: NCERT values (g = 9.8 m s^-2 unless a question states 10). Units upright, variables italic, numbers and readouts in Plex Mono. Indian number format for large plain numbers; scientific notation as a × 10^n.

## Episodes (Amjad's order, 20 Oct 2026) - Chapter 1 Units and Measurement (Class 11)
| ep | topic | chip | hook lead | hook |
|---|---|---|---|---|
| 1 | Physical quantities and their classification | CH 1 UNITS AND MEASUREMENT | Diya | a recipe card says "sugar: 2" - two what? |
| 2 | Fundamental and derived quantities | CH 1 | Aarav | his bicycle speed in km/h is built from a distance and a time |
| 3 | SI base units and derived units | CH 1 | Aarav | a spanner marked in mm does not fit a bolt sized in inches |
| 4 | Systems of units | CH 1 | Aarav | the tyre says psi, the pump says bar |
| 5 | Unit conversions | CH 1 | Aarav | 18 km/h on the bicycle is how many m/s? |
| 6 | Dimensions of physical quantities | CH 1 | Aarav | why can you not add 5 metres to 5 seconds? |
| 7 | Dimensional formulae | CH 1 | Diya | the pressure in a pressure cooker, in base quantities |
| 8 | Principle of dimensional homogeneity | CH 1 | Aarav | a friend's formula for distance - is it even possible? |
| 9 | Applications of dimensional analysis | CH 1 | Aarav | the corridor swing: guess the time period formula |
| 10 | Limitations of dimensional analysis | CH 1 | Aarav | the same method cannot find the 2 pi |
| 11 | Significant figures | CH 1 | Diya | the kitchen scale shows 250 g, the lab balance 250.0 g |
| 12 | Scientific notation | CH 1 | Aarav | the speed of light written with all its zeros |
| 13 | Accuracy and precision | CH 1 | Diya | two kitchen scales, five readings each |
| 14 | Least count of measuring instruments | CH 1 | Aarav | measuring a bicycle spoke with a ruler |
| 15 | Absolute, relative and percentage errors | CH 1 | Diya | five readings of the same glass of water |
| 16 | Error propagation in addition, subtraction, multiplication and division | CH 1 | Aarav | the error in the area of his study table |
| 17 | Measurement uncertainty | CH 1 | Diya | writing the final answer as value plus or minus uncertainty |
Amjad's visual brief for Chapter 1: measuring instruments, unit-conversion tools and interactive error propagation (the Ch 1 "sim" is a measuring bench: rulers, scales, vernier and screw gauge drawn exactly, unit dials, live error bars).
Slugs: `puc-physics-` + topic slug (tools/queue.py).

## Episodes - Chapters 2-4 (Amjad's order, 20 Oct 2026, Class 11)
Chips: `CLASS 11 · PHYSICS · CH 2 MOTION IN A STRAIGHT LINE`, `CH 3 MOTION IN A PLANE`, `CH 4 LAWS OF MOTION` (verified against the 2025-26 Class 11 syllabus chapter list: 1 Units and Measurements, 2 Motion in a Straight Line, 3 Motion in a Plane, 4 Laws of Motion).
Syllabus notes (verified 20 Oct 2026): relative velocity (1D and 2D) is not in the current CBSE/NCERT rationalised syllabus but is in the JEE Main syllabus (kinematics) - treat like the Ch 1 error topics: follow the JEE syllabus, never say "NCERT says". Rolling friction, impulse, banked roads are in the syllabus. Apparent weight: teach from Newton's second law (lift problems); it is a standard JEE/NEET application.
| ep | topic | chip | hook lead | hook idea |
|---|---|---|---|---|
| 18 | Reference Frames | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 19 | Position and Displacement | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 20 | Distance and Displacement Comparison | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 21 | Speed and Velocity | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 22 | Average and Instantaneous Velocity | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 23 | Average and Instantaneous Acceleration | CH 2 MOTION IN A STRAIGHT LINE | Diya | an ambulance speeding up past the college |
| 24 | Uniform and Non-Uniform Motion | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 25 | Equations of Uniformly Accelerated Motion | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 26 | Motion under Gravity | CH 2 MOTION IN A STRAIGHT LINE | Diya | a mango falls from the tree outside her window |
| 27 | Position-Time Graphs | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 28 | Velocity-Time Graphs | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 29 | Acceleration-Time Graphs | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 30 | Slope and Area Interpretation of Motion Graphs | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 31 | Relative Motion in One Dimension | CH 2 MOTION IN A STRAIGHT LINE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 32 | Scalars and Vectors | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 33 | Vector Representation | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 34 | Vector Addition and Subtraction | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 35 | Multiplication of Vectors by Scalars | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 36 | Resolution of Vectors into Components | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 37 | Unit Vectors | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 38 | Position and Displacement Vectors | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 39 | Vector Components in Two Dimensions | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 40 | Motion in Two Dimensions | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 41 | Projectile Motion | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 42 | Trajectory of a Projectile | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 43 | Time of Flight | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 44 | Maximum Height | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 45 | Horizontal Range | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 46 | Uniform Circular Motion | CH 3 MOTION IN A PLANE | Diya | the kitchen mixer jar spinning |
| 47 | Angular Displacement and Angular Velocity | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 48 | Centripetal Acceleration | CH 3 MOTION IN A PLANE | Diya | a salad spinner flings water off the leaves |
| 49 | Relative Velocity in Two Dimensions | CH 3 MOTION IN A PLANE | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 50 | Force and Inertia | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 51 | Newton's First Law | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 52 | Newton's Second Law | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 53 | Newton's Third Law | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 54 | Momentum | CH 4 LAWS OF MOTION | Diya | a slow truck vs a fast cricket ball |
| 55 | Impulse | CH 4 LAWS OF MOTION | Diya | catching a raw egg without breaking it |
| 56 | Conservation of Linear Momentum | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 57 | Free-Body Diagrams | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 58 | Equilibrium of Forces | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 59 | Contact and Non-Contact Forces | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 60 | Normal Reaction | CH 4 LAWS OF MOTION | Diya | the kitchen weighing scale under a pressure cooker |
| 61 | Tension | CH 4 LAWS OF MOTION | Diya | a bucket pulled up from a well by a rope |
| 62 | Static and Kinetic Friction | CH 4 LAWS OF MOTION | Diya | a heavy steel trunk that is hard to start but easier to keep sliding |
| 63 | Coefficient of Friction | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 64 | Limiting Friction | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 65 | Rolling Friction | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 66 | Motion on Inclined Planes | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 67 | Connected Bodies and Pulley Systems | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 68 | Circular Motion and Centripetal Force | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 69 | Banking of Roads | CH 4 LAWS OF MOTION | Aarav | agent picks a bicycle, road, corridor, college or study-table moment (no brands) |
| 70 | Apparent Weight and Weightlessness | CH 4 LAWS OF MOTION | Diya | a hospital lift makes her feel heavier, then lighter |

## Canon added by episodes
Binding for Eps 38 onward (earlier episodes stay as made):
- Colours: velocity v, v-bar and speed-type readouts on a v graph = blue #2F6FEB; displacement, position x, distance travelled and area under a v-t graph = violet #7A4FE0; acceleration a, g, change in velocity = red #D64545; force F and every error term (delta) = orange #D9731A; energy/work = teal #0E8F8F; time t, numbers, magnitudes = ink #16213E; angle theta = gold #B7791F.
- Vectors (Ch 3+): first vector A and x component / i-hat = blue; second vector B, y component / j-hat and the scaled vector lambda A = violet; resultant R = ink; k-hat = gold. When a vector IS a physical quantity, its physics colour wins (a velocity vector is blue, a force is orange).
- Angle theta between two vectors is always measured tail to tail.
- Aarav's standard straight-line ride: 0 to 6 m/s in 4 s (a = 1.5 m/s^2), cruise 6 m/s for 4 s, brake to rest in 3 s (a = -2 m/s^2); 45 m in total. His bike cruise is 18 km/h = 5 m/s in Ch 1-2 hooks. East is positive; home or the college gate is x = 0.
- Aarav's 2D ride (Ch 3): 3 km east then 4 km north, 7 km ridden, 5 km from the gate. Already used by Eps 32 and 34; later episodes pick a different 2D example.
- NCERT note (Ch 2): the rationalised text dropped path length vs displacement and average speed vs average velocity; they stay in the JEE Main syllabus. Never say "NCERT says" for them.
- Camera push-ins max 1.06x, centred (960, 540), so the header and readout are never cropped. PUC.think "why" lines under about 65 characters. Wrap any SVG group animated with M.vis in an outer g (M.vis overwrites transform).
- MCQs must not repeat an idea used by another episode's MCQ: grep videos/puc-physics-*/script.txt Q lines first. Used so far include: speed ratio of x-t slopes at 30/60 degrees, v from a-t areas plus u, distance vs displacement for v from +8 to -4, three-quarter circle ratio, half circle average speed vs velocity, trains crossing, ball from a 20 m tower, A-B from |A+B|, opposite vector of given magnitude, 6 E / 8 N / 6 W ratio, -A with a scale, component with tan^-1(5/12), vector of 15 N along 6i+8j.
- Ghost chip "ERROR DRAWN 10x LARGER" (or similar) when an error band is drawn bigger than scale.
