# Illustrations - vintage educational cartoon system (approved Oct 2026, Ep 08 v2)

Illustrations are for **people and storytelling**: thinkers, historical scenes, the running cast, real workplaces.
Diagrams (cards, bars, timelines, cycles, maps) stay hand-built in HTML for precision. Never use an illustration to carry numbers or labels.

## 1. Workflow (once per series, not per video)
1. **List what the series needs** before authoring: every real person, every historical scene, every recurring story scene (cast together, places, key moments). Reuse beats new images.
2. **Reference first.** For a real person, look at a real photo (Wikimedia Commons file pages; `Special:FilePath/<file>?width=300` shows the image) and describe face, hair, beard, glasses, clothes, era in words. Never upload the photo - the prompt is text only.
3. **Generate in Canva** (`generate-image`): prompt = subject description + the fixed style block below + the world palette line. Portraits `PORTRAIT_4_5`, scenes `LANDSCAPE_4_3`. One image per call; reject and regenerate anything off-model (wrong era, extra fingers, text in image, off-canon setting).
4. **Pull it at working size.** Downloads from canva.com may be blocked in the cloud workspace. Workaround that always works: open the scratch design, add one page per image (portrait 1136x1408, landscape 1440x1080), `insert_fill` the media full-bleed, and the edit result returns a 484x600 / 600x450 render. Save those, upscale 2x with LANCZOS, cancel the transaction (nothing is saved in Canva). When downloads are allowed, export full size instead.
5. **Cut out**: `python3 tools/cutout.py in.png out.png [--scale 1] [--tol 22]` (flood fill from the border; dark outlines protect the figure). Faces for avatars: square crop around the head, 256x256 jpg, shown in a circle.
6. **File it** in `assets/illustrations/<world>/` with a line in that folder's README.md (file, who/what, which episodes). Save prompts in `prompts.json` so a regenerate stays on-model.

## 2. Fixed style block (identical every time)
> Style: hand-drawn 2D vintage educational cartoon, bold slightly imperfect dark brown outlines, rounded hand-inked linework, flat colors with minimal cel shading, warm peach skin (warm brown with peach highlights for Indian characters), {WORLD PALETTE}, low saturation, vintage textbook look with clean digital coloring. Plain flat {WORLD BACKGROUND} background, no scenery, figures centered with generous space around them. No text, no letters, no signs, no labels. Not photorealistic, not 3D, not anime, not Pixar, not watercolor. No extra objects, no extra fingers.

Keep the subject description concrete: age, hair, facial hair, glasses, clothing colours (from the palette), one prop that tells the story (Taylor: stopwatch, Simon: chess knight). For the running cast, paste the cast lines from `prompts.json` word for word so they stay recognisable.

## 3. World palette lines
| world | {WORLD PALETTE} | {WORLD BACKGROUND} | presentation |
|---|---|---|---|
| mba | palette of deep navy blue and warm muted gold accents with soft browns and cream | warm cream-beige (#F5F1E8) | cutout on white card |
| bba | palette of deep plum, warm coral and soft mint accents with cream | warm cream (#FFF7EE) | cutout on white card |
| bcom | palette of ink blue-grey, ledger green and a little margin red, with paper cream | paper cream (#FBF8F1) | cutout on white card |
| case | palette of charcoal ink, signal red and warm yellow accents with cream | cream (#EFE8DC) | cutout on cream card |
| bsc-bio | palette of forest green, leaf green and soft plum accents with peach | pale sage (#EEF3EA) | cutout on white card |
| bsc-chem | palette of deep teal ink, bright teal and glass grey accents | lab white (#F7FAFB) | cutout on white card |
| bsc-cs | palette of black ink, warm yellow accents and light greys | white | cutout on white card |
| bsc-maths | palette of ink navy, bright blue and coral red accents | paper (#FAFAF6) | cutout on white card |
| engg-chemical | palette of slate grey, bright cyan and heat orange accents | pale blue-grey (#EEF2F5) | cutout on white card |
| engg-mech | palette of steel grey and safety orange accents | light grey (#E9ECEF) | cutout on light card |
| bca, bsc-physics, engg-cs, engg-electrical, engg-electronics, engg-civil (dark worlds) | that world's two accent colours, muted, with charcoal and warm greys | warm off-white (#F4F1EA) | never cut out onto the dark background: show the full image on a light rounded "plate" card (#F4F1EA) so the dark outlines read |

## 4. Using illustrations in an episode
- 1 thinker portrait (if the topic has one) as the introduction card, framed in a circle or as a waist-up cutout; name, role and dates as Poppins text beside or under it.
- 1-2 scenes for storytelling (history, the cast in a real moment). Shown at most ~640x480 inside a 784-wide card, aspect never stretched.
- Faces (`-face.jpg`) replace letter avatars anywhere the cast appears (`.av.face`, ring colour carries state).
- Labels on top of a scene are Poppins pills placed beside the figure, never over a face.
- An illustration never sits alone on screen for more than ~4 s without a diagram, a label or motion next to it.
