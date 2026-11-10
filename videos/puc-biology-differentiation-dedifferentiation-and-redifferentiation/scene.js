// PUC Biology Ep 92: Differentiation, Dedifferentiation and Redifferentiation (Living diagram, leaf green). Runner: ep.js + bio9.js + pg13.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow } = B9;
const G = PG.K;
// batch colours: xylem lignin brown, phloem gold, cambium = accent green (dashed), cork tan-brown, epidermis indigo
const XY = '#8C6D4F', XYL = '#D8C7B0', PH = '#E2B33C', PHL = '#F6E7B8', CORK = '#A8742A', EPI = '#4A78C2';
const ICN = { trunk: ['M8 21c1-4 1-10 0-14', 'M16 21c-1-4-1-10 0-14', 'M8 7c1-3 7-3 8 0', 'M5 21h14'], drop: ['M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z'] };
const S = [];
const rings = (g, cx, cy, n, r0, dr) => Array.from({ length: n }, (_, k) => circ(g, cx, cy, r0 + k * dr, 'none', '#7A4E2A', 2.5));
const vessel = (g, x, y, w, h, prog = 1) => { const G2 = mk(g, 'g', {}); mk(G2, 'rect', { x, y, width: w, height: h, rx: 10, fill: '#FFFFFF', stroke: XY, 'stroke-width': 5 }); const bands = []; for (let yy = y + 16; yy < y + h - 8; yy += 22) bands.push(mk(G2, 'rect', { x: x + 4, y: yy, width: w - 8, height: 7, rx: 3, fill: XY })); return { g: G2, bands }; };

/* ---------- H: the old tree ---------- */
S.push(EP.hook({ label: 'THE OLD TREE NEAR COLLEGE', face: 'diya', pill: ['Thicker every year', ['H1', 'thicker', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Old cells stopped dividing. How?', ['H3', 'stopped']], ['How does a cell choose its job?', ['H3', 'decide']]],
  a: [['ANSWER 1', 'Some mature cells divide again', ['H4', 'mature']], ['ANSWER 2', 'Its job depends on where it sits', ['H4', 'job']]],
  chips: [['Differentiation', ['H5', 'differentiation']], ['Dedifferentiation', ['H5', 'dedifferentiation']], ['Redifferentiation', ['H5', 'redifferentiation']], ['Development', ['H5', 'develops']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EAF3E2' }); mk(s, 'rect', { x: 0, y: 400, width: 784, height: 180, fill: '#9E7B55' });
    P(s, 'M220,420 C230,300 230,200 210,90 L410,90 C390,200 390,300 400,420 Z', '#A8742A', '#5E3A1A', 4); for (let k = 0; k < 6; k++) P(s, `M${245 + k * 26},110 C${250 + k * 26},220 ${246 + k * 26},320 ${250 + k * 26},410`, 'none', '#7A4E2A', 2);
    const st = mk(s, 'g', {}); mk(st, 'ellipse', { cx: 600, cy: 300, rx: 130, ry: 130, fill: '#E8C9A0', stroke: '#5E3A1A', 'stroke-width': 8 }); const rg = rings(st, 600, 300, 8, 14, 14); cap(st, 600, 470, 'ONE RING PER YEAR', { fill: '#FFFFFF', 'font-size': 18 });
    return { els: [[st, ['H1', 'thicker', -0.2], { ...POP, sc: 0.6 }]], anim: t => { const a = tm(['H3', 'thicker']), n = t < a ? 4 : Math.min(8, 4 + Math.floor((t - a) / 0.6)); rg.forEach((r, k) => r.style.opacity = k < n ? 1 : 0); } };
  } }));

/* ---------- B: differentiation ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'DIFFERENTIATION · A CELL TAKES A JOB', build: (el, s) => {
  const c0 = PG.cell(s, 140, 230, 120, 140, { nr: 0.3 }); cap(s, 200, 410, 'NEW CELL FROM A MERISTEM', { fill: K.ink });
  const ar = mk(s, 'g', {}); arrow(ar, 290, 300, 400, 300, C.ac, 5);
  const tb = mk(s, 'g', {}), wall = mk(tb, 'rect', { x: 470, y: 90, width: 130, height: 420, rx: 14, fill: G.cyto, stroke: XY, 'stroke-width': 3 }), nu = circ(tb, 535, 300, 26, G.nuc, G.nucS, 2.5), bands = [];
  for (let y = 112; y < 500; y += 26) bands.push(mk(tb, 'rect', { x: 474, y, width: 122, height: 8, rx: 3, fill: XY }));
  const wd = [0, 1, 2, 3].map(() => circ(s, -50, -50, 9, '#D6E9F5', '#5AA0C8', 2.5)); const tg = cap(s, 535, 540, 'TRACHEARY ELEMENT', { fill: XY, 'font-size': 18 });
  const rows = [['Loses its protoplasm', 'nucleus and cytoplasm go', ['B3', 'loses']], ['Builds a strong wall', 'cellulose and lignin: strong, elastic', ['B3', 'strong']], ['Carries water far', 'even under great tension', ['B3', 'carry']]].map(([a, b, sp], i) => [div(el, 'rw', { left: '760px', width: '800px', top: 110 + i * 110 + 'px' }, `<div class="rn">${a}</div><div class="rd">${b}</div>`), sp]);
  return { els: [[c0, ['B2', 'Cells', -0.1], { ...POP, sc: 0.6 }], [ar, ['B2', 'special']], [tb, ['B2', 'differentiation', -0.4], { dy: 12 }], [tg, ['B3', 'tracheary']], ...rows.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const a = tm(['B3', 'loses']), v = M.io((t - a) / 1.2); nu.style.opacity = (1 - v).toFixed(2); attr(wall, 'fill', v > 0.5 ? '#FFFFFF' : G.cyto);
      const b = tm(['B3', 'strong']), w = M.io((t - b) / 1.2); bands.forEach((e, i) => e.style.opacity = M.clamp(w * bands.length - i).toFixed(2)); attr(wall, 'stroke-width', (3 + 4 * w).toFixed(1));
      const c = tm(['B3', 'carry']); wd.forEach((d, j) => { const u = ((t - c) * 0.4 + j / 4) % 1; attr(d, 'cx', 535); attr(d, 'cy', (490 - 380 * u).toFixed(1)); d.style.opacity = t > c ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; }); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
const bundle = (g, x, y, s = 1) => { const q = mk(g, 'g', {}); P(q, `M${x},${y - 34 * s} C${x + 30 * s},${y - 30 * s} ${x + 26 * s},${y + 24 * s} ${x},${y + 34 * s} C${x - 26 * s},${y + 24 * s} ${x - 30 * s},${y - 30 * s} ${x},${y - 34 * s} Z`, PHL, PH, 2.5); mk(q, 'ellipse', { cx: x, cy: y + 10 * s, rx: 17 * s, ry: 18 * s, fill: XYL, stroke: XY, 'stroke-width': 2.5 }); return q; };
S.push(EP.zoom({ to: 'L1', names: ['STEM', 'VASCULAR BUNDLE', 'XYLEM CELL'], scales: ['x10', 'x100', 'x400'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Young stem', 'Vascular bundles in a ring.', 'Dicot stem, cross-section.'], ['RUNG 2 OF 3', 'One bundle', 'Xylem carries water.', 'Parenchyma stores food.'], ['RUNG 3 OF 3', 'Xylem cell', 'Dead, empty, thick wall.', 'Fully differentiated.']],
  av: { who: 'Diya', text: 'So it can never divide again!', tin: ['Z4', 'never', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 123, 50], build: g => { circ(g, 528, 263, 220, '#EAF3E2', EPI, 5); const bs = Array.from({ length: 8 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 4; return bundle(g, 528 + 140 * Math.cos(a), 263 + 140 * Math.sin(a), 1); });
      return { labs: [[lab(g, 549, 123, 800, 80, 'Vascular bundle'), ['Z2', 'vascular']], [lab(g, 528, 263, 800, 400, 'Parenchyma (pith)'), ['Z2', 'ring']]] }; } },
    { at: 'Z3', focus: [528, 330, 50], build: g => { for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) { circ(g, 90 + c * 64 + (r % 2) * 30, 70 + r * 92, 30, G.cyto, G.wallS, 2.5); circ(g, 760 + c * 64 + (r % 2) * 30, 70 + r * 92, 30, G.cyto, G.wallS, 2.5); }
      P(g, 'M528,40 C680,50 700,420 528,500 C356,420 376,50 528,40 Z', '#FFFFFF', K.ink, 3); P(g, 'M528,52 C640,60 660,170 640,190 L416,190 C396,170 416,60 528,52 Z', PHL, PH, 2.5); P(g, 'M412,206 L644,206', 'none', C.ac, 4, { 'stroke-dasharray': '10 7' });
      [[528, 330, 36], [462, 290, 24], [594, 290, 24], [480, 400, 26], [576, 400, 26], [528, 260, 18]].forEach(([x, y, r]) => circ(g, x, y, r, '#FFFFFF', XY, 7));
      return { labs: [[lab(g, 580, 110, 650, 100, 'Phloem'), ['Z3', 'bundle']], [lab(g, 594, 290, 760, 470, 'Xylem', 'end'), ['Z3', 'Xylem']], [lab(g, 120, 162, 300, 30, 'Parenchyma'), ['Z3', 'parenchyma']]] }; } },
    { at: 'Z4', build: g => { const v = vessel(g, 440, 40, 176, 450); return { labs: [[lab(g, 616, 200, 760, 160, 'Thick wall (lignin)'), ['Z4', 'thick']], [lab(g, 528, 310, 740, 380, 'No protoplasm'), ['Z4', 'empty']]] }; } }] }));

/* ---------- L: how the trunk thickens ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'C1', keep: 1, cards: [
  { pos: 'L', label: 'HOW A STEM GETS THICKER · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Mature parenchyma', 'between the bundles, not dividing'], ['Dedifferentiation', 'some divide again: interfascicular cambium'], ['A complete ring', 'joins the cambium inside the bundles'], ['Redifferentiation', 'new cells mature: wood that carries water'], ['Cork cambium too', 'from parenchyma; the stem gets thicker']], LT) }) },
  { pos: 'R', label: 'WATCH THE STEM', pill: ['Divide again, then mature again', ['L5', 'redifferentiation', -0.1], 'ac'], build: (el, s) => {
    const cx = 260, cy = 290, W = mk(s, 'g', {}); const out = circ(W, cx, cy, 170, '#EAF3E2', EPI, 4); const sx = circ(W, cx, cy, 70, 'none', XY, 0); sx.style.opacity = 0.85; const sph = circ(W, cx, cy, 128, 'none', PH, 0);
    const fb = [], ib = []; for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + k * Math.PI / 4; fb.push(bundle(W, cx + 110 * Math.cos(a), cy + 110 * Math.sin(a), 0.75)); }
    const ring = circ(W, cx, cy, 112, 'none', C.ac, 4); attr(ring, 'stroke-dasharray', '9 7'); const arcs = mk(W, 'g', {}); for (let k = 0; k < 8; k++) { const a0 = -Math.PI / 2 + k * Math.PI / 4 + 0.2, a1 = a0 + Math.PI / 4 - 0.4; P(arcs, `M${(cx + 112 * Math.cos(a0)).toFixed(1)},${(cy + 112 * Math.sin(a0)).toFixed(1)} A112,112 0 0 1 ${(cx + 112 * Math.cos(a1)).toFixed(1)},${(cy + 112 * Math.sin(a1)).toFixed(1)}`, 'none', C.ac, 6); }
    const ck = circ(W, cx, cy, 160, 'none', CORK, 5); attr(ck, 'stroke-dasharray', '6 5');
    return { labs: [[lab(s, cx + 79, cy - 79, 470, 120, 'Interfascicular cambium', 'start', 'sl2'), ['L3', 'interfascicular']], [lab(s, cx + 40, cy + 40, 470, 360, 'New xylem (wood)', 'start', 'sl2'), ['L5', 'carrying']], [lab(s, cx + 113, cy + 113, 470, 440, 'Cork cambium', 'start', 'sl2'), ['L6', 'cork']]],
      anim: t => { const a = tm(['L3', 'interfascicular', -0.4]); arcs.style.opacity = M.clamp((t - a) / 0.5).toFixed(2); ring.style.opacity = M.clamp((t - tm(['L4', 'ring', -0.3])) / 0.5).toFixed(2); arcs.querySelectorAll('path').forEach(p => attr(p, 'stroke', t > tm('L4') ? C.ac : '#E58A3C'));
        const b = tm(['L5', 'makes']), w = M.io((t - b) / 3); attr(sx, 'stroke-width', (60 * w).toFixed(1)); attr(sx, 'r', (100 - 30 * w).toFixed(1)); attr(sph, 'stroke-width', (10 * w).toFixed(1));
        const c = tm(['L6', 'cork', -0.2]); ck.style.opacity = M.clamp((t - c) / 0.5).toFixed(2); const g2 = M.io((t - tm(['L6', 'Year'])) / 2.5); attr(W, 'transform', g2 > 0 ? `translate(${cx} ${cy}) scale(${(1 + 0.12 * g2).toFixed(3)}) translate(${-cx} ${-cy})` : ''); attr(out, 'stroke', g2 > 0.2 ? CORK : EPI); } }; } }] });

/* ---------- C: open differentiation ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'OPEN DIFFERENTIATION · POSITION DECIDES', build: (el, s) => {
  P(s, 'M320,80 L600,80 L600,380 C600,440 520,470 460,470 C400,470 320,440 320,380 Z', G.root, G.rootS, 4); P(s, 'M310,400 C320,490 400,530 460,532 C520,530 600,490 610,400 C590,450 520,478 460,480 C400,478 330,450 310,400 Z', '#F3E2B3', CORK, 3);
  P(s, 'M330,80 L330,380', 'none', EPI, 6); P(s, 'M590,80 L590,380', 'none', EPI, 6); const mz = mk(s, 'ellipse', { cx: 460, cy: 380, rx: 70, ry: 40, fill: '#CFE8D4', stroke: C.ac, 'stroke-width': 3 });
  const mv = Array.from({ length: 6 }, () => circ(s, 460, 380, 13, '#CFE8D4', C.ac, 2.5));
  const rows = [['Pushed ahead of the meristem', 'become root cap cells', ['C3', 'ahead']], ['Pushed to the side', 'become epidermis', ['C3', 'side']], ['The same meristem', 'makes different cells: open', ['C2', 'same']]].map(([a, b, sp], i) => [div(el, 'rw', { left: '760px', width: '800px', top: [130, 240, 350][i] + 'px' }, `<div class="rn">${a}</div><div class="rd">${b}</div>`), sp]);
  return { labs: [[lab(s, 460, 380, 200, 300, 'Root apical meristem', 'end', 'sl2'), ['C2', 'meristem']], [lab(s, 460, 505, 200, 520, 'Root cap', 'end', 'sl2'), ['C3', 'cap']], [lab(s, 330, 200, 200, 160, 'Epidermis', 'end', 'sl2'), ['C3', 'epidermis']]],
    els: [[mz, ['C2', 'meristem', -0.2], { ...POP, sc: 0.6 }], ...rows.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const a = tm(['C3', 'ahead', -0.3]); mv.forEach((d, j) => { const u = ((t - a) * 0.4 + j / 6) % 1, dst = j % 3 === 0 ? [460, 500] : j % 3 === 1 ? [345, 260] : [575, 260], q = PG.along([[460, 380], dst], u);
      attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); attr(d, 'fill', u > 0.6 ? (j % 3 === 0 ? '#F3E2B3' : '#DCE6F7') : '#CFE8D4'); attr(d, 'stroke', u > 0.6 ? (j % 3 === 0 ? CORK : EPI) : C.ac); d.style.opacity = t > a ? Math.min(1, 6 * u, 5 * (1 - u)).toFixed(2) : 0; }); } }; } }] });

/* ---------- D: development ---------- */
const DN = [['Cell division', ['D3', 'divides']], ['Growth', ['D3', 'grows']], ['Differentiation', ['D3', 'differentiates']], ['Maturation', ['D3', 'matures']], ['Senescence', ['D3', 'ages']], ['Death', ['D3', 'dies']]];
S.push({ id: 'D', from: 'D1', to: 'V1', cards: [{ pos: 'W', label: "DEVELOPMENT · ONE CELL'S STORY", pill: ['Development = growth + differentiation', ['D2', 'growth', -0.1], 'ac'], build: (el, s) => {
  const nd = DN.map(([n], i) => div(el, 'stp', { position: 'absolute', left: 40 + i * 258 + 'px', top: '120px', width: '230px', height: '64px', borderRadius: '12px', border: '2px solid #CBD0DA', background: '#fff', color: '#9AA0AC', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 24px Poppins', whiteSpace: 'nowrap' }, n));
  DN.slice(1).forEach((_, i) => arrow(s, 270 + i * 258, 152, 298 + i * 258, 152, '#9AA0AC', 3));
  const lp = mk(s, 'g', {}); P(lp, 'M930,186 C900,290 220,290 160,192', 'none', C.ac, 4, { 'stroke-dasharray': '10 7' }); arrow(lp, 172, 212, 160, 190, C.ac, 4); T(lp, 545, 300, 'DEDIFFERENTIATION: A MATURE CELL DIVIDES AGAIN', 18, C.ac, { 'font-family': 'IBM Plex Mono' });
  const bx = [['INSIDE THE PLANT', 'genes · plant growth regulators', ['D4', 'inside']], ['OUTSIDE THE PLANT', 'light · temperature · water · oxygen · nutrition', ['D4', 'outside']]].map(([h, b, sp], i) => [div(el, '', { position: 'absolute', left: 40 + i * 780 + 'px', top: '338px', width: '740px', height: '110px', borderRadius: '14px', background: 'var(--soft)' }, `<div class="tb" style="left:24px;top:18px">${h}</div><div style="position:absolute;left:24px;top:52px;font:600 27px Poppins;white-space:nowrap">${b}</div>`), sp]);
  return { els: [[lp, ['D3', 'loop', -0.2], { dy: 0, fade: 0.4 }], ...bx.map(([e, sp]) => [e, [...sp, -0.1], { dy: 12 }])],
    anim: t => { let c = -1; DN.forEach(([, sp], i) => { if (t >= tm(sp) - 0.15) c = i; }); nd.forEach((e, i) => { M.vis(e, t, tm('D1') + 0.3 + i * 0.08, 1e9, { dy: 8 }); EP.lite(e, i < c, i === c); }); } }; } }] });

/* ---------- V: plasticity + think ---------- */
const lark = (g, x, y, s, dis) => { const q = mk(g, 'g', {}); P(q, `M${x},${y + 60 * s} L${x},${y + 150 * s}`, 'none', G.stem, 5); for (let k = -2; k <= 2; k++) { const a = -90 + k * 32; if (dis) { P(q, `M${x},${y + 60 * s} l${(70 * s * Math.cos(a * Math.PI / 180)).toFixed(1)},${(70 * s * Math.sin(a * Math.PI / 180)).toFixed(1)}`, 'none', G.leafS, 6); }
  else PG.leaf(q, x, y + 60 * s, 72 * s, a); } return q; };
const TH = { q: 'Cork cambium forms from mature parenchyma. Differentiation or dedifferentiation?', opts: ['Differentiation', 'Dedifferentiation'], right: 1, why: 'Dedifferentiation. A mature cell gets back the power to divide.' };
S.push({ id: 'V', from: 'V1', to: 'T1', cards: [
  { pos: 'L', label: 'WITH AGE · LARKSPUR', tout: 'V4', pill: ['Also cotton and coriander', ['V2', 'coriander', -0.1]], build: (el, s) => {
    const a = lark(s, 220, 130, 1.5, false), b = lark(s, 560, 130, 1.5, true); const ca = cap(s, 220, 400, 'YOUNG PLANT · BROAD LOBES', { fill: K.ink }), cb = cap(s, 560, 400, 'MATURE PLANT · NARROW SEGMENTS', { fill: K.ink });
    return { els: [[a, ['V2', 'young', -0.1], { ...POP, sc: 0.6 }], [ca, ['V2', 'young']], [b, ['V2', 'mature', -0.1], { ...POP, sc: 0.6 }], [cb, ['V2', 'mature']]] }; } },
  { pos: 'R', label: 'FROM SURROUNDINGS · BUTTERCUP', tin: ['V3', null, -0.2], tout: 'V4', pill: ['Heterophylly: different leaf shapes', ['V3', 'heterophylly', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 2, y: 260, width: 780, height: 316, rx: 14, fill: '#D6E9F5', opacity: 0.8 }); P(s, 'M2,260 Q100,250 200,260 T400,260 T600,260 T782,260', 'none', '#5AA0C8', 3); P(s, 'M392,470 L392,140', 'none', G.stem, 6);
    const air = mk(s, 'g', {}); [-150, -30].forEach(a => PG.leaf(air, 392, 180, 120, a)); const wat = mk(s, 'g', {}); [150, 30].forEach(a => { for (let k = -3; k <= 3; k++) P(wat, `M392,380 l${(110 * Math.cos((a + k * 8) * Math.PI / 180)).toFixed(1)},${(110 * Math.sin((a + k * 8) * Math.PI / 180)).toFixed(1)}`, 'none', G.leafS, 3); });
    const c1 = cap(s, 640, 120, 'IN AIR · BROAD', { fill: K.ink }), c2 = cap(s, 640, 450, 'IN WATER · FINELY CUT', { fill: '#2E6E99' });
    return { els: [[air, ['V3', 'air', -0.1], { ...POP, sc: 0.6 }], [c1, ['V3', 'air']], [wat, ['V3', 'water', -0.1], { ...POP, sc: 0.6 }], [c2, ['V3', 'water']]] }; } },
  EP.think(TH, { tin: 'V4', opts: ['V4', 'differentiation', -0.1], why: ['V5', 'mature'] })] });

/* ---------- W: name the process ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE PROCESS', svg: false, build: el => EP.cols(el, [
  ['CASE 1 · ROOT TIP CELL', 'Differentiation', 'LOSES PROTOPLASM · TRACHEARY ELEMENT', s => { PG.cell(s, 60, 90, 80, 110, { nr: 0.3 }); arrow(s, 160, 145, 230, 145, C.ac, 4); vessel(s, 280, 30, 90, 230); }, ['W2', 'Case', -0.2], ['W2', 'differentiation'], ['W2', 'loses']],
  ['CASE 2 · PARENCHYMA', 'Dedifferentiation', 'MATURE CELLS DIVIDE AGAIN', s => { circ(s, 130, 145, 70, G.cyto, G.wallS, 3); circ(s, 130, 145, 18, G.nuc, G.nucS, 2); arrow(s, 220, 145, 280, 145, C.ac, 4); circ(s, 380, 110, 46, '#CFE8D4', C.ac, 3); circ(s, 380, 200, 46, '#CFE8D4', C.ac, 3); circ(s, 380, 110, 12, G.nuc, G.nucS, 2); circ(s, 380, 200, 12, G.nuc, G.nucS, 2); }, ['W3', 'Case', -0.2], ['W3', 'dedifferentiation'], ['W3', 'dividing']],
  ['CASE 3 · NEW CAMBIUM CELLS', 'Redifferentiation', 'STOP DIVIDING · MATURE INTO WOOD', s => { for (let k = 0; k < 3; k++) mk(s, 'rect', { x: 50 + k * 34, y: 100, width: 28, height: 90, rx: 6, fill: '#CFE8D4', stroke: C.ac, 'stroke-width': 2.5 }); arrow(s, 170, 145, 230, 145, C.ac, 4); [0, 1, 2].forEach(k => vessel(s, 260 + k * 64, 40, 54, 210)); }, ['W4', 'Case', -0.2], ['W4', 'redifferentiation'], ['W4', 'stop']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['trunk', 'An old tree trunk', 'THICKER EVERY YEAR', ['H1', 'trunk']], ['leaf', 'A young larkspur', 'LEAVES CHANGE SHAPE', ['H1', 'larkspur']], ['drop', 'A buttercup', 'WATER LEAF, AIR LEAF', ['H2', 'buttercup']]],
  scenes: S,
  stmt: { l2: 'Mature living cells can <span class="acc">divide</span> again.', f: '<span class="lad">differentiate → <b>dedifferentiate</b> → redifferentiate</span>', t2: ['T1', 'Mature', -0.2], tf: ['T1', 'dividers'] },
  trap: { wrong: 'A mature plant cell can never divide again', right: 'Living mature cells, like parenchyma, can divide again', tWrong: ['X2', 'mature', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'regain', -0.2], tSvg: ['X3', 'parenchyma', -0.4],
    build: s => { circ(s, 170, 130, 56, G.cyto, G.wallS, 3); circ(s, 170, 130, 14, G.nuc, G.nucS, 2); arrow(s, 240, 130, 290, 130, C.ac, 4); circ(s, 350, 92, 36, '#CFE8D4', C.ac, 3); circ(s, 350, 170, 36, '#CFE8D4', C.ac, 3); cap(s, 260, 240, 'PARENCHYMA DIVIDES AGAIN', { 'font-size': 14 }); } },
  where: { type: 'Example questions: which process forms a tissue, which plants show heterophylly', at: ['E1', 'example'] },
  mcq: { q: 'Which one is an example of dedifferentiation?', opts: ['Parenchyma → interfascicular cambium', 'Meristem cell → tracheary element', 'Larkspur leaves change with age', 'Meristem cell → root cap cell'], right: 0, cols: 1, optW: 968, optY: 250, optH: 70, optFs: 26 }, mcqAt: ['Q1', 'dedifferentiation', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['Parenchyma regains division', ['A2', 'regain']], ['Tracheary, root cap: differentiation', ['A3', 'Tracheary']], ['Larkspur: heterophylly', ['A3', 'Larkspur']]],
  recap: { title: 'Recap · differentiation', lines: ['<b>Differentiation</b>: cells mature for a job · tracheary elements lose protoplasm', '<b>Dedifferentiation</b>: mature cells divide again · interfascicular, cork cambium', '<b>Redifferentiation</b>: those new cells stop dividing and mature for a job', "<b>Open</b>: a cell's position decides what it becomes", '<b>Development</b> = growth + differentiation · <b>plasticity</b>: heterophylly'] },
  yq: ['What is dedifferentiation?', 'Give one example of heterophylly.', 'Why is plant differentiation called open?'],
  next: { label: 'NEXT · EP 93', topic: 'Plant Growth Regulators: Auxins and Gibberellins' }
});
})();
