# Overrides for Engineering Mechanics episodes (apply on top of docs/series/agent-brief.md)

- Canon and story: docs/series/engineering-mechanics.md (SALIM AUTO WORKS: Kiran, Salim chacha, Priya, Raju, Farida; the e-auto Bijli). Never use the MBA casts or images.
- World is engg-mech, not mba. Approved reference for THIS series: Ep 01 `videos/engg-mech-what-is-engineering-mechanics-forces-and-force-systems/`. Copy its head/CSS block, helpers and components exactly; it is the v2 standard (Ep 08 Taylor, Marketing Ep 01) ported into the Workshop CAD look. Where agent-brief.md says navy/gold/Poppins/"AT CHAI CORNER", read steel/orange/Barlow/"AT SALIM AUTO WORKS".
- Images: assets/illustrations/engg-mech/emech-*.png cutouts, emech-*-face.jpg faces, emech-scene-*-cut.png scenes. Cast faces wherever the cast appears. Real scientists only as text/quote cards - never draw a portrait.
- Eyebrow `EP NN · ENGINEERING MECHANICS`; meta.json world "engg-mech", series {"name": "Engineering Mechanics", "ep": N}; title `<Hook-style title> Explained Simply | Engineering Mechanics Ep N` (<= 70 chars). Ep 20 is the last: no NEXT strip, a "SERIES COMPLETE" strip pointing to the playlist, N1 "That's the full series. ...".
- Physics: arrows to scale with magnitude + unit in IBM Plex Mono, SI units, g = 9.81 m/s², every number checked in Python first, motion physically true (accelerating bodies accelerate, equilibrium does not drift). The animated process is the mechanism or the forces actually acting, step by step.
- Keep the story moving in canon order (beat list in the bible). Report any new recurring fact (a mass, a dimension, a price) so the lead adds it to Canon.
- Language: a 12-year-old must follow every line. University-level mechanics underneath. Plain hyphens only.
