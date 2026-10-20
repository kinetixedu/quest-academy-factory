import re, pathlib

REPO = "kinetixedu/quest-academy-factory"

SETUP = f"""SETUP (do this first, every time this session starts)
1. Add the GitHub repo {REPO} to this session with push access, clone it, cd into it.
2. git pull --rebase origin main
3. bash tools/setup_local.sh
4. export KOKORO_DIR=~/.kokoro/kokoro-multi-lang-v1_0
5. Read fully, in this order: CLAUDE.md, docs/STYLE-BIBLE.md, docs/ILLUSTRATIONS.md, docs/AUTHORING.md, docs/NEW-STREAM.md, docs/series/agent-brief.md, the section "Every episode must have" in docs/series/principles-of-management.md, docs/series/marketing-management.md and docs/series/marketing-overrides.md (these two are the exact shape your own series files must copy).
6. Study the two approved reference episodes end to end, every file: videos/mba-scientific-management-f-w-taylor/ and videos/mba-introduction-to-marketing/ (script.txt, index.html, scene.js, meta.json, review/stills.png). Every video you make must match them: same engine, components, title card to header travel, pacing, voice, captions, sound, outro, thumbnail style and quality."""

MUST = """EVERY EPISODE MUST HAVE (the approved v2 standard - no exceptions)
- Eyebrow chip "EP NN · SERIES NAME IN CAPITALS" (two-digit episode number), title card that travels to the header exactly like the references.
- Hook in the first 5 seconds: a cast character meets a real problem that this topic solves, shown with the cast illustrations.
- Illustrated storytelling: cast cutouts and face crops wherever the cast appears; real thinkers and scientists only as text or quote cards, never a drawn portrait.
- One definition card: a real textbook or thinker quote with attribution, or a plain sentence if no verified quote exists.
- At least one REAL animated process: the concept happening step by step with moving parts, counters, flows, timers or a before/after run (like Meena vs Asha on the floor plan in Ep 08). Cards alone are not enough.
- Precise diagrams for the core concept plus one navy statement sweep card.
- "At work today": for each key point, one example from the running story plus one real workplace example with no brand names (a bank, a hospital, an airline, a phone maker, a bakery).
- The human side / limits: a balance scale with the good side and the hard side, one verified fact if it exists, a cast decision, and a one-line lesson strip.
- Quick check: 4 options, 3-2-1 ring, answer reveal, takeaway strip. Then the recap "Remember these three things" with 3 rows.
- Final strip "NEXT · EP NN" with the next topic. The last episode instead shows "SERIES COMPLETE" pointing to the playlist.
- 3:00 to 4:00 of voice. Kokoro Michael voice (sid 16, speed 0.9) through tools/tts.py. Sound whitelist and brand outro from docs/STYLE-BIBLE.md. No music.
- Any invented number carries the ghost chip "EXAMPLE FIGURES" and all arithmetic is correct.
- meta.json has "series": {"name": series name, "ep": N}; title "Hook-style title Explained Simply | Series Name Ep N", 70 characters or less; description with the episode number, chapter timestamps and the next episode; tags.
- A 12-year-old must follow every line, with real university-level substance underneath. Plain hyphens only, never em or en dashes. Every fact, date, quote and number verified, with the source noted for me."""

DELIVER = lambda kit: f"""DELIVERY (YouTube uploads are paused while the API quota is low)
- Never set "paused" to false in config/schedule.json and never run the upload job.
- For each finished batch run the "Manual upload kit" workflow:
  gh api -X POST repos/{REPO}/actions/workflows/kit.yml/dispatches -f ref=main -f "inputs[slugs]=SLUGS OF THE BATCH, SPACE SEPARATED" -f "inputs[branch]={kit}"
  If a second batch runs while the first is still building, use branch {kit}-2, then {kit}-3, so they never overwrite each other.
- When the run finishes: git clone --depth 1 --branch {kit} https://github.com/{REPO} and send me, for every episode, the video, the thumbnail, the .srt captions and the upload text (title, description, tags) in one ALL-EPISODES.txt, batch by batch."""

RULES = """RULES
- Touch only your own stream: your docs/series files, your videos folders, your images with your own prefix. You may append your own rows to queue/topics.csv.
- Before every push: git pull --rebase --autostash origin main. If queue/topics.csv conflicts, keep both sides' rows and continue the rebase.
- Commit only episodes you have reviewed (look at every review/stills.png). Work in progress may be committed as "WIP" because uploads are paused.
- The machine has 2 CPUs: run TTS and renders one at a time.
- Never put keys, tokens or passwords in chat, code or URLs. I add GitHub secrets myself.
- No real brands in stories. Never invent facts, quotes, exam weightage or statistics.
- Do not ask me for small approvals. Ask me only for: the story choice, the Ep 1 approval, and anything that cannot be undone. Send drafts as soon as they are useful, keep updates short."""


def stream_prompt(name, cat, world, prefix, kit, story_idea, extra):
    return f"""QUEST ACADEMY · {name.upper()} SESSION

You make animated explainer videos for my YouTube channel Quest Academy (owner: Amjad, MR Quest Technologies). Each Claude session owns one stream. This session owns {name} only.

{SETUP}

YOUR STREAM
- Category "{cat}" (already in config/categories.json), world worlds/{world} (keep its colours, fonts and look).
- Images go in assets/illustrations/{world}/ with the file prefix "{prefix}-", plus a README section for them.
- Series files: docs/series/ a bible and an overrides file named after your series (same shape as marketing-management.md and marketing-overrides.md).
- Kit branch: {kit}.
- Subject-specific: {extra}

STEP 1 - STORY (my next message will be the topic list)
Propose 2 different running stories for this series. Each: an Indian setting, 4 to 5 recurring characters (name, age, role, one line of personality), no real brands, and a growth arc that walks through my topics in order like the Laddoo Lab arc in docs/series/marketing-management.md. Starting idea for one of them: {story_idea}. I pick one. Then write the series bible and overrides file.

STEP 2 - QUEUE AND ART
- Add the whole series in order: python3 tools/queue.py add-series "{cat}" with the series name, then every topic in my order.
- Make the cast portraits (waist-up, PORTRAIT_4_5) and 4 to 6 reusable story scenes (LANDSCAPE_4_3) in Canva exactly as docs/ILLUSTRATIONS.md says: the fixed style block, the {world} palette line, the pull-at-working-size workaround, tools/cutout.py, face crops. Reject and regenerate anything off-model.

STEP 3 - EP 1 SAMPLE
Author Ep 1 to the full standard below, voice it, render it with tools/build.sh, look at review/stills.png and fix everything. Send me the video, thumbnail, stills and upload text. Wait for my OK before Step 4.

{MUST}

STEP 4 - THE REST OF THE SERIES (after my OK)
- Spawn parallel subagents, 4 to 5 episodes each, each given docs/series/agent-brief.md plus your overrides file, with Ep 1 as their reference.
- Review every review/stills.png yourself. Fix canon clashes (names, prices, numbers that must agree across episodes) and keep a canon section in your bible updated after each batch.
- Mark each finished episode with python3 tools/queue.py ready followed by its slug, then commit and push.

{DELIVER(kit)}

{RULES}"""


STREAMS = [
    ("BBA", "BBA", "bba", "bba", "kit-bba",
     "a family print-and-stationery shop in Mysuru that the daughter turns into a small company",
     "business administration for first-year BBA students; every concept tied to a real decision the business faces."),
    ("BCom", "BCom", "bcom", "bcom", "kit-bcom",
     "a young accountant who keeps the books for a neighbourhood grocery store and its suppliers",
     "commerce and accounting; show journal entries, ledgers and statements being filled line by line with correct figures that always balance."),
    ("BCA", "BCA", "bca", "bca", "kit-bca",
     "two college friends building a canteen pre-order app step by step",
     "computer applications; any code on screen is short, real, runs correctly (test it first) and is shown executing step by step with memory boxes and outputs."),
    ("BSc Physics", "BSc Physics", "bsc-physics", "bscp", "kit-bsc-physics",
     "a student lab group solving puzzles from their town's daily life",
     "formulas typeset cleanly with units always shown, derivations in small steps with a pause after each, live simulations whose graphs move with the object."),
    ("BSc Chemistry", "BSc Chemistry", "bsc-chem", "bscc", "kit-bsc-chem",
     "a student interning at a small water-testing and dye lab",
     "electrons visibly moving for every bond and mechanism, balanced equations with a live atom counter, real safety notes where they apply."),
    ("BSc Maths", "BSc Maths", "bsc-maths", "bscm", "kit-bsc-maths",
     "a student tutoring her younger brother, every idea tied to a picture",
     "equations written step by step, each step paired with its geometric picture in matching colours, graphs that morph live as a parameter changes."),
    ("BSc Biology", "BSc Biology", "bsc-bio", "bscb", "kit-bsc-bio",
     "a student on field trips through a forest, a farm and a hospital lab",
     "labelled diagrams with leader lines, a zoom ladder (organ to tissue to cell to molecule) with a scale chip, processes run as lit stage chains, exact textbook names."),
    ("BSc Computer Science", "BSc Computer Science", "bsc-cs", "bsccs", "kit-bsc-cs",
     "a student building the library system for her college",
     "algorithms and data structures animated step by step (arrays, pointers, stacks, trees changing on screen); short, real, tested code."),
    ("Engineering CS", "Engineering CS", "engg-cs", "ecs", "kit-engg-cs",
     "a startup team scaling a food-ordering app from one college to a whole city",
     "systems drawn as live diagrams (requests flowing, queues filling, servers lighting up); any code tested before it goes on screen."),
    ("Engineering Mechanical", "Engineering Mechanical", "engg-mech", "emech", "kit-engg-mech",
     "a small workshop building an electric auto-rickshaw",
     "mechanisms animated with physically correct motion (gears mesh at the right ratio, forces as arrows, units shown), worked numbers checked."),
    ("Engineering Electronics", "Engineering Electronics", "engg-electronics", "eece", "kit-engg-electronics",
     "a student team building a smart irrigation controller for a farm",
     "standard schematic symbols, current shown as moving dots, a live oscilloscope trace beside the circuit, truth tables filling row by row."),
    ("Engineering Electrical", "Engineering Electrical", "engg-electrical", "eeee", "kit-engg-electrical",
     "a village getting its own solar micro-grid",
     "phasors and waveforms animated live, readouts with units, power flow shown as moving arrows, worked numbers checked."),
    ("Engineering Civil", "Engineering Civil", "engg-civil", "eciv", "kit-engg-civil",
     "a young engineer building a school from land survey to handover",
     "loads, stresses and drawings animated; Indian Standard codes named only where verified; worked numbers checked."),
    ("Engineering Chemical", "Engineering Chemical", "engg-chemical", "echem", "kit-engg-chemical",
     "a small plant making jaggery syrup that scales up safely",
     "process flow diagrams with flows moving, mass and energy balances as live counters that always close."),
]

CASE = stream_prompt("Case Studies", "Case Studies", "case", "case", "kit-case",
    "this stream has no invented story: each episode is one real company case",
    "real company cases are allowed here (facts verified, sources listed in meta.json notes); no logos, no fake quotes; 3 to 5 minutes. Look at worlds/case/ for the approved case look.")
CASE = CASE.replace("""STEP 1 - STORY (my next message will be the topic list)
Propose 2 different running stories for this series. Each: an Indian setting, 4 to 5 recurring characters (name, age, role, one line of personality), no real brands, and a growth arc that walks through my topics in order like the Laddoo Lab arc in docs/series/marketing-management.md. Starting idea for one of them: this stream has no invented story: each episode is one real company case. I pick one. Then write the series bible and overrides file.""",
"""STEP 1 - SERIES PLAN (my next message will be the list of cases)
Write a short series bible: the case list in my order, what each episode teaches, the verified sources for each case, and the rules. There is no invented cast; the "story" in the must-have list below is the company's real story, shown with scenes that contain no logos or real people's faces.""")

PUC_SHARED = """PUC RULES (Class 11-12, JEE and NEET focus) - read docs/series/PUC.md fully and look at every frame in docs/series/puc-samples/; your videos must look exactly like those frames. From the MBA reference episodes take the engine, components, pacing, captions, outro and quality bar; the look comes from PUC.md.
- Look: Lab Notebook world - warm graph-paper page #F7F5EF with a 40 px grid #E9E5DA, ink navy #16213E, white cards with a 6 px top edge in the subject accent, Poppins headings, IBM Plex Mono for every number and readout, formulas typeset with KaTeX (bundled locally), variables italic, units upright.
- Colour-coding is the signature: every symbol in a formula takes the same colour as the thing it stands for in the diagram.
- Motion precise and calm: lines and formulas draw on stroke by stroke, one thing moves at a time, physics-true motion, no particles, glows or 3D. Camera push-in max 1.15x, once per scene. Page-turn transition with an accent strip for statement, quiz and recap.
- Cast: Aarav (17, PCME, preparing for JEE, curious about machines, circuits and numbers, rides a bicycle) and Diya (17, PCMB, preparing for NEET, curious about the body, plants and kitchen chemistry, wants to be a doctor). Classmates in a Bengaluru PU college. One of them notices an everyday puzzle in the hook; after that they only appear as small face avatars reacting. The concept carries the video.
- Each episode, in this order: hook (first 5 s) -> NCERT chip like "CLASS 11 · PHYSICS · CH 3 MOTION IN A PLANE" (chapter number and name verified against the current rationalised NCERT book) -> concept built visually with a live animation in your subject style -> derivation or mechanism in small steps, each term explained in plain words, units shown, 0.6 to 0.8 s pause after each step -> one fully worked example -> Exam trap card (wrong line struck in red, right line ticks in) -> "Where it is asked" chips (JEE MAIN, JEE ADVANCED, NEET, PUC BOARDS; light only the ones you verified from past-paper analysis; if you cannot verify, say only the type of question) -> an ORIGINAL JEE- or NEET-pattern MCQ at real exam level (never copied from a past paper), 4 options, 5-second countdown ring in the accent, then an animated step-by-step solution -> formula or fact card styled as a pinned notebook card with a "SCREENSHOT THIS" chip, held 3 s -> NEXT strip -> brand outro.
- 4:00 to 6:00 of voice. A 12-year-old must follow the explanation; the practice question is at real exam level. NCERT first for every fact, constant and value. Plain hyphens only. No real brands.
- Sound: the Quest Academy whitelist only (whoosh on page turns, 3 ticks, correct chime). No music.
- Title: "Hook-style title Explained Simply | PUC SUBJECTNAME Class 11" (Class 12 for second-year topics), 70 characters or less; meta.json "series" with the series name and episode number."""


def puc_prompt(subject, slug, style, accent, lead, style_text, extra_first=""):
    return f"""QUEST ACADEMY · PUC {subject.upper()} SESSION

You make animated concept videos for my YouTube channel Quest Academy (owner: Amjad, MR Quest Technologies). Each Claude session owns one stream. This session owns PUC {subject} only.

{SETUP}

{PUC_SHARED.replace("SUBJECTNAME", subject)}

YOUR SUBJECT
- PUC {subject}, editing style "{style}", accent {accent}. Cast lead for hooks: {lead}.
- Style: {style_text}
- Category "PUC {subject}", world worlds/puc, series files docs/series/puc-{slug}.md and docs/series/puc-{slug}-overrides.md, images with the prefix "puc-{slug}-", kit branch kit-puc-{slug}.
{extra_first}
STEP 1 - SERIES PLAN (my next message will be the topic list)
Write docs/series/puc-{slug}.md: chapters in NCERT order with verified chapter numbers and names, the topic list in my order, which hooks Aarav or Diya get, the canon, and the rules above. Then add the series: python3 tools/queue.py add-series "PUC {subject}" with the series name and every topic in my order.

STEP 2 - EP 1 SAMPLE
Author Ep 1 to the full PUC standard above in the "{style}" style, voice it, render it with tools/build.sh, look at review/stills.png and fix everything. Send me the video, thumbnail, stills and upload text. Wait for my OK.

STEP 3 - THE REST OF THE SERIES (after my OK)
- Spawn parallel subagents, 4 to 5 episodes each, each given docs/series/agent-brief.md, docs/series/PUC.md and your overrides file, with your Ep 1 as their reference.
- Review every review/stills.png yourself: chapter chips correct, units shown, colour-coding consistent, MCQ original with the right answer and a correct worked solution, no invented exam statistics.
- Mark each finished episode with python3 tools/queue.py ready followed by its slug, then commit and push.

{DELIVER('kit-puc-' + slug)}

{RULES}"""


PHYS_FIRST = """
YOU OWN THE SHARED PUC WORLD - build it first and push it fast, the other four PUC sessions are waiting for it:
1. worlds/puc/ - the Lab Notebook look exactly as docs/series/PUC.md and docs/series/puc-samples/frame.html: page, cards, type, KaTeX bundled locally (npm i katex, copy dist and fonts into the world), page-turn transition, and the shared exam components (Exam trap card, "Where it is asked" chips, MCQ with 5-second ring and animated solution, pinned formula card with "SCREENSHOT THIS"). Accent switchable per subject.
2. config/categories.json: add puc-physics, puc-chemistry, puc-maths, puc-biology and puc-electronics with category names "PUC Physics", "PUC Chemistry", "PUC Maths", "PUC Biology", "PUC Electronics", playlists like "PUC Physics | Class 11 | Quest Academy", look "puc", tags and the standard outro.
3. The shared cast in Canva per docs/ILLUSTRATIONS.md with the Lab Notebook palette: Aarav (navy hoodie, bicycle helmet in hand) and Diya (ponytail, round glasses, white lab coat over a green kurta), waist-up cutouts plus face crops in assets/illustrations/puc/ (aarav.png, aarav-face.jpg, diya.png, diya-face.jpg) and 4 everyday hook scenes (college corridor, kitchen, bicycle on a road, study table) with a README.
Push, then tell me "PUC world ready" before starting Step 1.
"""

OTHER_FIRST = """
SHARED WORLD: worlds/puc/, the PUC categories in config/categories.json and the cast in assets/illustrations/puc/ are built by the PUC Physics session. Reuse them, never edit them. Start with Step 1 now; before rendering anything, git pull and check that worlds/puc/ exists on main; if not, keep writing scripts and pull again every 20 minutes.
"""

PUC = [
    ("Physics", "physics", "Motion notebook", "electric blue #2F6FEB", "Aarav for mechanics and electricity, Diya for topics close to the body or the kitchen",
     "live simulation pane on one side, readout panel on the other (v, a, F, E in Plex Mono updating every frame); free-body diagrams where force arrows grow from the object with labels; motion trails as 3 to 4 fading ghost copies; slow-mo replay (the sim freezes, vectors appear, then it resumes); x-t and v-t graphs drawing live beside the sim with a moving dot linked to the object. Signature: the sim and its graph moving together.", PHYS_FIRST),
    ("Chemistry", "chemistry", "Molecule bench", "teal #0FA3A3", "Diya for most topics, Aarav for industrial and electrochemistry topics",
     "2D ball-and-stick molecules that assemble bond by bond; electron dots that move between atoms (sharing, transfer) with orbit shells as thin rings; reaction arrows that draw on, reactants sliding into products with atoms counted on both sides as a live balance counter; energy-profile curves drawing as the reaction runs; flat beakers for solutions; a periodic table strip lighting the element in play. Signature: electrons visibly moving to explain every bond and reaction.", OTHER_FIRST),
    ("Maths", "maths", "Proof board", "coral #E4572E", "Aarav",
     "equations write on stroke by stroke; each new step slides in under the previous one and the changed term is highlighted then settles; every algebra step paired with its geometric picture (parabola, triangle, unit circle) whose parts glow in the same colour as their terms; a graph plotter with an animated parameter (a value counts up and the curve morphs live); worked solutions in a numbered column, never more than 5 lines on screen. Signature: the term-to-shape colour link and live-morphing graphs.", OTHER_FIRST),
    ("Biology", "biology", "Living diagram", "leaf green #3E9B5F", "Diya",
     "textbook-quality labelled diagrams in the vintage cartoon illustration style from docs/ILLUSTRATIONS.md (cells, organs, plants made in Canva with this palette, labels never baked into the image); labels pop in with leader lines drawing from the part to the label; zoom ladder camera organ -> tissue -> cell -> organelle -> molecule, each level a smooth push-in with a scale chip like x400; processes (photosynthesis, digestion, DNA replication, the heart cycle) run as stage chains with the current stage lit and a looping animation inside it; NCERT diagram names used exactly. Signature: the zoom ladder plus the labelled diagrams NEET asks about.", OTHER_FIRST),
    ("Electronics", "electronics", "Breadboard", "amber #E8A317", "Aarav",
     "circuit schematics with standard symbols; current shown as dots flowing along wires with speed proportional to current; voltage and current readouts in Plex Mono; an oscilloscope panel drawing the waveform live (input and output traces for rectifiers and amplifiers); truth tables filling row by row as switch tiles toggle; components light up when active as a flat fill change, not a glow. Signature: the circuit and its scope trace changing together. Chapter chips: Karnataka PUC Electronics is its own subject - take chapter numbers and names from the current official Karnataka PUC Electronics textbook (verify them; if you cannot find the official list, ask me for it), and where a topic overlaps NCERT Physics also check the NCERT chapter.", OTHER_FIRST),
]

LEAD = f"""QUEST ACADEMY · LEAD + MBA SESSION

You make animated explainer videos for my YouTube channel Quest Academy (owner: Amjad, MR Quest Technologies). Each Claude session owns one stream. This session owns the MBA stream and is the lead: the only session that touches YouTube uploads, the quota, the website (tools/site.py) and shared tools.

{SETUP}

YOUR STREAM
- Category "MBA", world worlds/mba, images in assets/illustrations/mba/ (Chai Corner cast for Principles of Management, Laddoo Lab "ll-" files for Marketing Management), kit branch kit-mba.
- Series done or in progress: Principles of Management (docs/series/principles-of-management.md, Eps 1-28) and Marketing Management (docs/series/marketing-management.md, Eps 1-35). Check python3 tools/queue.py status and git log to see what is finished, then finish anything not yet ready and deliver it.
- New MBA series: I will paste a topic list. Follow docs/NEW-STREAM.md: propose 2 running stories with a new cast, I pick one, series bible + overrides, add-series, Canva cast with a new unique "mba" sub-prefix, Ep 1 sample, my OK, parallel subagents, review, deliver.

{MUST}

LEAD DUTIES
- Uploads stay paused until I say the quota increase is approved. Then ask me which episode I posted last on each playlist, mark every manually posted episode as uploaded in queue/topics.csv and the upload records so nothing is uploaded twice, and only then set "paused" to false in config/schedule.json.
- If another session breaks a shared tool or the queue, fix it.
- Keep docs/NEW-STREAM.md, CLAUDE.md and docs/SESSION-PROMPTS.md up to date when the workflow changes.

{DELIVER('kit-mba')}

{RULES}"""

PROJECT = f"""Quest Academy - automated animated explainer videos for the Quest Academy YouTube channel (owner: Amjad, MR Quest Technologies).

Repo (source of truth): {REPO}. Every session adds it with push access, clones it, runs the setup in its CLAUDE.md, and follows CLAUDE.md and docs/NEW-STREAM.md exactly.

Each session owns ONE stream. Touch only that stream's files. Many sessions push to the same repo: always git pull --rebase --autostash before pushing; on queue/topics.csv conflicts keep both sides.

Quality bar: videos/mba-scientific-management-f-w-taylor/ and videos/mba-introduction-to-marketing/. PUC: docs/series/PUC.md and docs/series/puc-samples/.

Rules: plain hyphens only (no em or en dashes). 12-year-old language, real substance. Faceless, Kokoro voice, sound whitelist, brand outro, no music. No real brands in stories. Verify every fact. Never invent exam weightage.

YouTube uploads are paused while the quota is low: never unpause, never run uploads. Deliver through the Manual upload kit workflow on branch kit-<stream>, then send me the video, thumbnail, captions and upload text.

Never put keys, tokens or passwords in chat, code or URLs. I add secrets to GitHub myself.

Work without asking for small approvals. Ask me only for the story choice, the Ep 1 approval and anything irreversible. Send drafts early. Short updates."""
PROJECT = PROJECT.replace("kit-<stream>", "kit- followed by the stream name (for example kit-bba)")

out = ["# Quest Academy - project setup and session prompts (paste as is)", "",
       "## 1. Project custom instructions",
       "Create the Claude project \"Quest Academy\", connect GitHub and Canva, and paste this into the project's custom instructions:", "",
       "```", PROJECT, "```", "",
       "## 2. Session prompts",
       "Start one session per stream and paste its prompt as the first message. Paste that stream's topic list (in order) as the second message. Start PUC Physics before the other PUC sessions.", ""]
n = 1
out += [f"### {n}. Lead + MBA", "", "```", LEAD, "```", ""]; n += 1
for s in PUC:
    out += [f"### {n}. PUC {s[0]}", "", "```", puc_prompt(*s), "```", ""]; n += 1
for s in STREAMS:
    out += [f"### {n}. {s[0]}", "", "```", stream_prompt(*s), "```", ""]; n += 1
out += [f"### {n}. Case Studies", "", "```", CASE, "```", ""]
txt = "\n".join(out)
assert not re.search(r"<[a-z][^>]*>", txt), re.findall(r"<[a-z][^>]*>", txt)[:5]
assert "—" not in txt and "–" not in txt
pathlib.Path("/home/claude/quest-academy-factory/docs/SESSION-PROMPTS.md").write_text(txt)
print(len(txt), n)
