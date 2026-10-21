# Ep 15 - Faraday's and Lenz's Laws

Suggested YouTube title (64 chars): `Lenz's Law Explained Simply | Basic Electrical Engineering Ep 15`
(alt, 63 chars: `Induction Explained Simply | Basic Electrical Engineering Ep 15`)

## Quiz
Q: Meera holds the magnet perfectly still inside the coil. What does the meter read?
- A. A steady high reading
- B. Zero (correct)
- C. It swings left and right
- D. Twice the earlier reading
Correct: B. Takeaway strip: "No change in flux, no induced voltage."

## Recap rows
1. Changing flux induces voltage - chip "Change"
2. More turns, faster change - chip "N dPhi/dt"
3. Lenz's law opposes the change - chip "Push back"

## Facts and sources
- Faraday's successful ring-coil experiment on 29 August 1831 - https://rigb.org/node/143 ; also https://en.wikipedia.org/wiki/Faraday%27s_law_of_induction (notebook entry 29 Aug 1831; Henry similar in 1832; emf = -N dPhi/dt for N turns; Faraday disk generator)
- Lenz formulated his law in 1834; induced current opposes the change in flux; linked to the minus sign - https://en.wikipedia.org/wiki/Lenz%27s_law , https://en.wikipedia.org/wiki/Faraday%27s_law_of_induction
- Magnet falling slowly through a copper tube due to eddy currents / Lenz; induction heating uses eddy currents; eddy current brakes - https://en.wikipedia.org/wiki/Eddy_current
- Metro/electric train regenerative braking: traction motors become generators, power returned to supply - https://en.wikipedia.org/wiki/Regenerative_braking
- Wireless (inductive) charging uses electromagnetic induction for portable devices, in phones since late 2010s - https://en.wikipedia.org/wiki/Inductive_charging
- A de-energised line near a live line can carry induced voltage - https://energiforetagen.se/forlag/ebr-teknik/ebr-induction-and-influence---safety-measures-for-overhead-lines-a-41022e ; earthing before work is standard lineman practice (also canon from Ep 01: "switched off and earthed").
- Bicycle dynamo = magnet rotating in a coil: general knowledge.

## EXAMPLE FIGURES (checked in python3)
- N = 200, dPhi = 3 mWb (0 -> 0.003 Wb), dt = 0.1 s -> e = 200 x 0.003 / 0.1 = 6 V
- Same change in 0.05 s -> 12 V

## New canon facts
- Kittu has a bicycle with a wheel dynamo lamp (no battery). Pedalling is slightly heavier with the lamp on.
- Shankar anna has a strong magnet and a copper pipe at the repair corner (demo).

## Visual plan
- Hook: bicycle lamp icon glowing while a wheel spins, dark when it stops; face eeee-kittu.
- Story: eeee-scene-workshop plate card; faces eeee-shankar, eeee-meera; dynamo cutaway diagram (magnet inside coil).
- Definition: quote-style card "29 August 1831 - Michael Faraday" (text only) + formula e = -N dPhi/dt in IBM Plex Mono.
- ANIMATED PROCESS: coil + centre-zero galvanometer. Magnet slides in -> needle right; holds -> needle 0; pulls out -> needle left, current dashes reverse; fast push -> bigger kick. A small flux-vs-time graph traced live beside it with slope = needle.
- Worked example: counters 0 -> 3 mWb, timer 0.1 s, result 6 V; then 0.05 s -> 12 V; EXAMPLE FIGURES chip.
- T1 sweep: "No change in flux, no voltage. Faster change, more voltage."
- V: Lenz card "1834 - Heinrich Lenz" (text only); coil's induced N pole facing the approaching N pole (repulsion arrows); copper pipe with slow-falling magnet vs free-falling magnet race.
- K list/panes: Generate / Brake / Charge / Heat; Suryagaon examples: bicycle dynamo, -, -, -.
- X: balance scale; line-earthing icon on eeee-scene-pole; eeee-kittu stopped by Meera; lesson strip.

Unverified/left out: did not use Lenz's original wording (no verified translation found).
