# PUC Physics - brief for episode agents

You author finished episodes of the PUC Physics series (Quest Academy YouTube channel, owner Amjad). Quality bar is the APPROVED Ep 1. Amjad rates harshly; match Ep 1 exactly in polish, depth and structure. No slop, no filler.

REPO: your clone of kinetixedu/quest-academy-factory (remote agents: setup ok (KOKORO_DIR=/root/.kokoro/kokoro-multi-lang-v1_0); never commit worlds/puc/cues.* or anything outside your episode folders). Before anything: `git pull --rebase --autostash origin main`.

READ FULLY FIRST (in order):
1. docs/series/puc-physics-overrides.md  (your rules)
2. docs/series/puc-physics.md            (bible: chapters, canon, colour-coding, Amjad's Ep 1 feedback = binding episode shape, your episodes' hook leads and hook ideas, syllabus notes)
3. docs/series/PUC.md                    (PUC standard, Motion notebook style)
4. worlds/puc/README.md + worlds/puc/puc.js + worlds/puc/puc.css (component API: PUC.header, write, sweepRun, graph, arrow, avatar, trap, where, mcq, solution, think, fcard, next)
5. THE REFERENCE, every file: videos/puc-physics-physical-quantities-and-their-classification/ (script.txt, index.html, scene.js, meta.json, review/stills.png). Copy its head, stage skeleton, helper style, title card -> header travel, scene structure, exam segment, recap -> three questions -> NEXT teaser ending, sounds, outro call.
6. docs/STYLE-BIBLE.md sections "Layout rules", "Motion rules", "SOUND POLICY". engine/core.js API (skim).

YOUR EPISODES (do them one after another, each fully finished before the next):
(listed in the message that sent you here)

FOR EACH EPISODE make videos/<slug>/ script.txt, index.html, scene.js, meta.json:
- Script (ID|pause|text), 4:00-6:00 of voice (check cues.json dur: 240-360 s; if outside, cut or add and re-run tts). Order: curiosity opening (first 10-15 s: everyday cases -> cast hook puzzle) -> what it is -> live sim built in Motion notebook style (sim pane + live readout + live graph with a dot linked to the sim, vectors that grow, 3-4 ghost trails, slow-mo replay where motion happens) -> derivation in small steps, each term in plain words, units shown, 0.6-0.8 s pause per step -> reasoning shown link by link -> side-by-side comparison + PUC.think pause (1-2 per episode, pause 3.0-3.2 s, reveal answer AND reason) -> one fully worked example (numbers checked in python) -> exam trap -> where it is asked -> ORIGINAL JEE/NEET-pattern MCQ (Q line pause 5.4) with step-by-step solution -> recap fact card (pinned, SCREENSHOT THIS, held >= 3 s) -> "Can you answer these without help?" 3 questions -> NEXT strip with a curiosity teaser for the next episode -> outro. Last episode of a chapter: the NEXT teaser points to the next chapter's first topic; Ep 70 (Apparent Weight and Weightlessness) teases "Work, Energy and Power".
- 12-year-old words, one idea per line, JEE/NEET substance underneath. Plain hyphens only (never em/en dashes, check with python). No real brands. Real scientists only as text.
- NCERT chip per the bible. Subject pill MOTION NOTEBOOK. Title in meta.json: `<Hook-style title> Explained Simply | PUC Physics Class 11` (<= 70 chars, assert in python). meta: world "puc-physics", topic, series {"name":"PUC Physics","ep":N}, description (2-3 short paragraphs + chapter timestamps m:ss from cues.json + "Next episode: ..." + "Video by Quest Academy."), 10-15 tags, thumb {title 2-4 words, accent_word, frame_t where the signature sim + graph are fully built}.
- Facts: NCERT values (g = 9.8 m/s^2 unless a question says 10). Verify any fact you are unsure of with web search. Never invent exam weightage/statistics. "Where it is asked": light chips ONLY if you verified from a cited past-paper analysis (name the source in your report); otherwise light none and give the type of question. MCQ must be original, real exam level, answer and every step verified by running python.
- Colour-coding exactly as the bible (v blue #2F6FEB, a/g red #D64545, F orange #D9731A, second component violet #7A4FE0, energy teal #0E8F8F) - same colour in sim, readout and KaTeX.
- Never use element ids st0/st1/st2 or other ids used by the world (#st1 #st2 #stF #stmt #sweep #title #sub #rule #nchip #subj #prog #cap). Every multi-row block must align (check BIG stills).
- Sounds only: whoosh on the page turns (statement, MCQ, recap card), PUC.mcqSfx. M.outro({}) at the end.

WORKFLOW per episode:
1. Write script.txt, then `export KOKORO_DIR=~/.kokoro/kokoro-multi-lang-v1_0; python3 tools/tts.py videos/<slug>` and read cues.json word times.
2. Write index.html + scene.js (all timing from M.t0/M.t1/M.wt; fix every "word not found" warning).
3. Stills: `node tools/probe.js videos/<slug> /tmp/<slug>-a.png t1 ... t9` covering EVERY scene, mid-transitions, the sim at several moments, think cards (before/after), MCQ (before, ring, answer), recap, questions, NEXT. LOOK at each sheet (Read the png). Use BIG=1 for detail on 1-3 times. Fix overlaps, misalignment, clipped text, sparse/dead frames (something must change every 2-4 s), captions over content, zero PAGE ERRORS. Expect 3-5 rounds.
4. Final 18-still sheet: `node tools/probe.js videos/<slug> videos/<slug>/review/stills.png <18 times>` and look at it.
5. `node tools/thumb.js videos/<slug>`, look at thumbnail.jpg, fix if weak, then delete videos/<slug>/thumb_frame.jpg (keep thumbnail.jpg).
6. Do NOT run tools/build.sh or render.js (renders happen in the cloud). Do NOT touch worlds/, engine/, tools/, config/, queue/, other episodes. If the world truly needs a change, describe it in your report instead.
7. Commit ONLY your episode folder (script.txt, index.html, scene.js, meta.json, cues.json, cues.js, review/stills.png, thumbnail.jpg; never voice.wav): `git add videos/<slug>/... && git commit -m "puc-physics Ep N: <topic>" && git pull --rebase --autostash origin main && git push origin HEAD:main` (on rebase conflict outside your folder: keep both sides, continue). Then start the next episode.

The machine is shared: run tts and probe one at a time (never in parallel loops or background).

REPORT (short, per episode): ep, slug, voice duration, sim you animated, think questions, MCQ + answer, where-asked verification (source or "none lit"), facts verified (source), anything unsure, any recurring fact for the bible.
