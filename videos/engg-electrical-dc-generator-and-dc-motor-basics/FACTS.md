# Ep 18 - DC Generator and DC Motor Basics

Suggested YouTube title (63 chars): `DC Motors Explained Simply | Basic Electrical Engineering Ep 18`

## Quiz
Q: Why does a jammed DC motor draw so much current?
- A. The battery voltage rises
- B. There is no back EMF, so only the small resistance limits current (correct)
- C. The brushes add extra current
- D. The magnets get stronger
Correct: B. Takeaway strip: "No spin, no back EMF, huge current."

## Recap rows
1. One machine, motor or generator - chip "Both ways"
2. Commutator + brushes - chip "One way"
3. Back EMF limits current - chip "V = Eb + IaRa"

## Facts and sources
- Brushed DC motor: commutator reverses current every half turn; brushes wear; counter EMF proportional to flux x speed; Vm = Eb + Rm Ia; armature resistance usually under 1 ohm so starting current very large - https://en.wikipedia.org/wiki/Brushed_DC_electric_motor
- Locked rotor: no back EMF, current quite high - https://en.wikipedia.org/wiki/Counter-electromotive_force
- DC generator EMF Eg = P Phi N Z / 60A - https://electricaleasy.com/2012/12/emf-and-torque-equation-of-dc-machine.html
- Fleming's left-hand rule (motor) / right-hand rule (generator), late 19th century - https://en.wikipedia.org/wiki/Fleming%27s_left-hand_rule_for_motors (for on-screen hand icon if wanted; not narrated)
- Older/large generators used a separate exciter dynamo - https://en.wikipedia.org/wiki/Excitation_(magnetic)
- Metro regenerative braking - https://en.wikipedia.org/wiki/Regenerative_braking
- Thomas Davenport: first American patent on an electric machine, 1837, US Patent No. 132 - https://en.wikipedia.org/wiki/Thomas_Davenport_(inventor)
- Engine starter motors are DC motors (diesel generator cranking) - https://www.europart.net/blog/detail/starters-for-internal-combustion-engines-the-basics

## EXAMPLE FIGURES (checked in python3)
- V = 12 V, Ra = 0.5 ohm; standstill I = 12 / 0.5 = 24 A
- Running, Eb = 11 V: I = (12 - 11) / 0.5 = 2 A
- Generator: P = 2, Phi = 0.01 Wb, Z = 600, N = 1500 rpm, A = 2: E = 2 x 0.01 x 600 x 1500 / (60 x 2) = 150 V

## New canon facts
- A farmer's 12 V battery sprayer pump (small DC motor) jammed with mud and blew its fuse; Meera cleared it; runs at 2 A.

## Visual plan
- Hook: battery sprayer icon on eeee-scene-pumpset, fuse icon popping; current meter spikes to 24 A.
- Story: eeee-scene-workshop plate card; faces eeee-shankar, eeee-meera; cutaway of motor (coil between N and S magnets).
- Definition: two-way arrow card "Electricity <-> Motion", one machine in the middle.
- ANIMATED PROCESS: single loop armature between N/S poles, current dashes along loop, force arrows up/down (left-hand rule icon), loop rotating; at 90/180 degrees the split-ring commutator slides under the brushes and the current arrows flip; continues one way. Then generator mode: hand crank turns it, voltage trace = rectified sine (humps all positive) drawn live.
- Worked example: ammeter needle 24 A at standstill -> falls to 2 A as a back-EMF bar fills to 11 V; equation V = Eb + Ia Ra built term by term; EXAMPLE FIGURES chip.
- T1 sweep: "A spinning motor is also a generator, pushing back."
- V: EMF equation with each symbol labelled, numbers plugged in -> 150 V.
- K list/panes: Motor / Generator / Both / Start; Suryagaon: sprayer pump, bicycle dynamo (Ep 15 callback), -, -.
- X: balance scale (brushes sparking icon on hard side); Kittu stopped; Davenport 1837 text card; lesson strip.
