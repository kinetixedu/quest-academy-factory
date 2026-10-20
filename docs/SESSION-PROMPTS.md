# Quest Academy - new project setup + session prompts

## Part 1 - Set up the new Claude project "Quest Academy"

1. Create the project "Quest Academy".
2. Paste the block below into the project's **custom instructions**.
3. Connect in every session: GitHub repo `kinetixedu/quest-academy-factory` (read + push) and Canva.
4. Optional knowledge files: upload `CLAUDE.md`, `docs/STYLE-BIBLE.md`, `docs/NEW-STREAM.md`, `docs/series/PUC.md` from the repo. The repo stays the source of truth; sessions always read the repo copies.
5. Start one session per stream with the prompts in Part 2. Paste that stream's topic list as the second message.

### Project custom instructions (paste as is)

```
Quest Academy - automated animated explainer videos for the Quest Academy YouTube channel (owner: Amjad, MR Quest Technologies).

Repo (source of truth): kinetixedu/quest-academy-factory. Clone it at the start of every session, run the setup in its CLAUDE.md, and follow CLAUDE.md + docs/NEW-STREAM.md exactly.

Each session owns ONE stream (one category or PUC subject). Touch only that stream's files. Many sessions push to the same repo: always git pull --rebase --autostash before push; on queue/topics.csv conflicts keep both sides.

Quality bar: videos/mba-scientific-management-f-w-taylor/ and videos/mba-introduction-to-marketing/. PUC: docs/series/PUC.md + docs/series/puc-samples/.

Rules: plain hyphens only (no em/en dashes). 12-year-old language, real substance. Faceless, Kokoro voice, sound whitelist, brand outro, no music. No real brands in stories. Verify every fact. Never invent exam weightage.

Uploads are paused while the YouTube quota is low: never unpause, never run uploads. Deliver via the Manual upload kit workflow on branch kit-<stream>, then send me video + thumbnail + captions + upload text.

Never put keys, tokens or passwords in chat, code or URLs. I add secrets to GitHub myself.

Work without asking for small approvals. Ask me only for: story/cast choice, Ep 1 approval, anything irreversible. Send drafts early. Short updates.
```

## Part 2 - Session prompts (one session each)

Start order: 1) Lead (this MBA session can stay the lead). 2) PUC Physics first among PUC (it builds the shared PUC world). 3) Everything else in any order.

### Template (all non-PUC streams)
```
QUEST ACADEMY · <STREAM> SESSION
Repo kinetixedu/quest-academy-factory. Clone. Run setup in CLAUDE.md. Read CLAUDE.md + docs/NEW-STREAM.md. Follow exact.
Own: <STREAM> only. World worlds/<world>. Category "<Category>". Image prefix assets/illustrations/<world>/<prefix>-*. Kit branch kit-<world>.
Story: new running story + cast for this stream, Indian setting, no real brands. <STORY HINT>. Give me 2 story options first, I pick.
Me paste topic list next msg. Then: series bible docs/series/<series>.md -> queue.py add-series -> cast + 4-6 scenes in Canva (ILLUSTRATIONS.md workaround) -> Ep 1 sample -> send me -> wait OK.
After OK: parallel agents 4-5 eps each (agent-brief.md + <series>-overrides.md). Review every review/stills.png. Fix. Commit. Kit workflow branch kit-<world>. Send me video + thumb + srt + upload text, batch by batch.
Rules: plain hyphens. 12-yr-old language, real substance. Verify facts. Never unpause uploads. No keys in chat. Don't ask small approvals.
```

### 1. Lead / MBA (keep this session)
```
QUEST ACADEMY · LEAD + MBA SESSION
Repo kinetixedu/quest-academy-factory. Clone. Setup per CLAUDE.md. Read CLAUDE.md + docs/NEW-STREAM.md.
Own: MBA stream (worlds/mba, prefix mba ll-* for Marketing, kit branch kit-mba) + uploads + YouTube quota + site (tools/site.py) + shared tools.
Now: finish Marketing Management Eps 2-35 (docs/series/marketing-management.md). Review, commit, kit, send me.
Next MBA series: me paste topic list. Same flow as NEW-STREAM.md.
When I say quota approved: ask which ep I posted last, mark manual posts in queue, then set paused false. Only this session touches uploads.
Other sessions edit only their streams. If they break shared tools, you fix.
Rules: plain hyphens. Verify facts. No keys in chat.
```

### 2. BBA
Template with: STREAM=BBA, world `bba`, category "BBA", prefix `bba`, STORY HINT = "small family business growing up (e.g. a print shop or a bakery turning into a company)".

### 3. BCom
Template with: STREAM=BCom, world `bcom`, category "BCom", prefix `bcom`, STORY HINT = "a young accountant keeping books for a neighbourhood kirana-style shop and its customers".

### 4. BCA
Template with: STREAM=BCA, world `bca`, category "BCA", prefix `bca`, STORY HINT = "two students building a college app step by step".

### 5. BSc Physics
Template with: STREAM=BSc Physics, world `bsc-physics`, category "BSc Physics", prefix `bscp`, STORY HINT = "a student lab group solving puzzles from a town's daily life". Add: "Formulas typeset, units always shown, derivations in small steps with a pause after each."

### 6. BSc Chemistry
Template with: STREAM=BSc Chemistry, world `bsc-chem`, category "BSc Chemistry", prefix `bscc`, STORY HINT = "a student interning at a small water-testing and dye lab". Add: "Electrons visibly moving for every bond and mechanism. Safety notes where real."

### 7. BSc Maths
Template with: STREAM=BSc Maths, world `bsc-maths`, category "BSc Maths", prefix `bscm`, STORY HINT = "a student tutoring her younger brother, each idea tied to a picture". Add: "Every algebra step paired with its geometric picture, same colours."

### 8. BSc Biology
Template with: STREAM=BSc Biology, world `bsc-bio`, category "BSc Biology", prefix `bscb`, STORY HINT = "a student on a field trip through a forest, farm and hospital lab". Add: "Labelled diagrams, zoom ladder organ -> cell -> molecule, exact textbook names."

### 9. BSc Computer Science
Template with: STREAM=BSc Computer Science, world `bsc-cs`, category "BSc Computer Science", prefix `bsccs`, STORY HINT = "a student building a library system for her college". Add: "Show code running step by step (memory boxes, pointers, stacks). Short code, real syntax, tested."

### 10. Engineering CS
Template with: STREAM=Engineering CS, world `engg-cs`, category "Engineering CS", prefix `ecs`, STORY HINT = "a startup team scaling a food-ordering app". Add: "Systems drawn as live diagrams (requests flowing, queues filling). Any code tested before it goes on screen."

### 11. Engineering Mechanical
Template with: STREAM=Engineering Mechanical, world `engg-mech`, category "Engineering Mechanical", prefix `emech`, STORY HINT = "a small workshop building an electric auto-rickshaw". Add: "Mechanisms animated with correct motion (gears mesh, forces as arrows, units shown)."

### 12. Engineering Electronics
Template with: STREAM=Engineering Electronics, world `engg-electronics`, category "Engineering Electronics", prefix `eece`, STORY HINT = "a student team building a smart irrigation controller". Add: "Schematics with current dots and a live scope trace."

### 13. Engineering Electrical
Template with: STREAM=Engineering Electrical, world `engg-electrical`, category "Engineering Electrical", prefix `eeee`, STORY HINT = "a village getting a solar micro-grid". Add: "Phasors and waveforms animated live, readouts with units."

### 14. Engineering Civil
Template with: STREAM=Engineering Civil, world `engg-civil`, category "Engineering Civil", prefix `eciv`, STORY HINT = "a young engineer building a school building from survey to handover". Add: "Loads, stresses and drawings animated; IS codes named only where verified."

### 15. Engineering Chemical
Template with: STREAM=Engineering Chemical, world `engg-chemical`, category "Engineering Chemical", prefix `echem`, STORY HINT = "a small plant making jaggery syrup scaling up safely". Add: "Process flow diagrams with flows moving, mass and energy balances as live counters."

### 16. Case Studies (optional)
Template with: STREAM=Case Studies, world `case`, category "Case Studies", prefix `case`. Replace the story line with: "Real company cases are allowed here (facts verified, sources listed in meta.json notes). No logos, no fake quotes."

### 17. PUC Physics (start first among PUC)
```
QUEST ACADEMY · PUC PHYSICS SESSION (owns shared PUC world)
Repo kinetixedu/quest-academy-factory. Clone. Setup per CLAUDE.md. Read CLAUDE.md, docs/NEW-STREAM.md (PUC part), docs/series/PUC.md, docs/series/puc-samples/.
Own: PUC Physics + shared PUC world. Build first, push fast (others wait on it):
 1. worlds/puc/ Lab Notebook look per PUC.md (grid page, ink navy, cards with accent top, Poppins, Plex Mono numbers, KaTeX bundled locally, page-turn transition, exam components: trap card, where-asked chips, MCQ + 5s ring + animated solution, pinned formula card "Screenshot this").
 2. config/categories.json: puc-physics, puc-chemistry, puc-maths, puc-biology, puc-electronics (names "PUC Physics" etc, playlist "PUC <Subject> | Class 11/12 | Quest Academy").
 3. Cast Aarav (17, PCME, JEE) + Diya (17, PCMB, NEET) in Canva -> assets/illustrations/puc/ (cutouts + face crops).
 Push. Tell me "PUC world ready".
Then my Physics: style "Motion notebook" (accent #2F6FEB). Me paste topic list. Series bible docs/series/puc-physics.md -> add-series -> Ep 1 sample -> send me -> wait OK -> agents -> review -> commit -> kit branch kit-puc-physics -> send me.
Each ep: hook, NCERT chip (verified chapter), live sim, derivation, worked example, exam trap, where asked (verified only, else type of question only), ORIGINAL JEE/NEET-pattern MCQ, formula card, NEXT. 4-6 min.
Rules: plain hyphens. NCERT first for every fact. Never copy past papers. Never invent weightage. No keys in chat.
```

### 18-21. PUC Chemistry, Maths, Biology, Electronics
```
QUEST ACADEMY · PUC <SUBJECT> SESSION
Repo kinetixedu/quest-academy-factory. Clone. Setup per CLAUDE.md. Read CLAUDE.md, docs/NEW-STREAM.md (PUC part), docs/series/PUC.md, docs/series/puc-samples/.
Own: PUC <Subject> only. Style "<STYLE>" accent <HEX>. Shared world worlds/puc + cast assets/illustrations/puc/ belong to PUC Physics session: reuse, never edit. Category "PUC <Subject>". Kit branch kit-puc-<subject>. Image prefix puc-<subject>-*.
Me paste topic list next. Start: series bible docs/series/puc-<subject>.md + scripts. If worlds/puc not on main yet: git pull every 20 min, render only after it lands.
Then Ep 1 sample -> send me -> wait OK -> agents 4-5 eps -> review stills -> commit -> kit -> send me video + thumb + srt + upload text.
Each ep: hook (Aarav or Diya), NCERT chip (verified chapter), live animation in my style, derivation or mechanism, worked example, exam trap, where asked (verified only), ORIGINAL JEE/NEET-pattern MCQ + 5s ring + animated solution, formula/fact card, NEXT. 4-6 min.
Rules: plain hyphens. NCERT first. Never copy past papers. Never invent weightage. No keys in chat. Don't ask small approvals.
```
Fill in:
- PUC Chemistry: STYLE "Molecule bench", accent #0FA3A3, cast lead Diya (NEET) and Aarav (JEE) both.
- PUC Maths: STYLE "Proof board", accent #E4572E, cast lead Aarav (JEE).
- PUC Biology: STYLE "Living diagram", accent #3E9B5F, cast lead Diya (NEET). Diagrams in the vintage cartoon illustration style from Canva, NCERT diagram names exact.
- PUC Electronics: STYLE "Breadboard", accent #E8A317, cast lead Aarav. Karnataka PUC Electronics syllabus: chapter chip uses the official Karnataka PUC Electronics textbook chapter (verify), NCERT Physics chapter where the topic overlaps.

## Part 3 - Second message in each session
Paste the topic list like this:
```
Series: <series name>
Topics in order:
1. ...
2. ...
```
