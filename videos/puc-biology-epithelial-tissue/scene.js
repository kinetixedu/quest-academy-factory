// PUC Biology Ep 56: Epithelial Tissue (Living diagram, leaf green). Runner: ep.js, cells: cells.js
(() => {
const { C, mk, txt, cap, POP, lab, pol, tm, div, mix, attr } = EP;
const { CF, CS, NU } = CE;
const SK = '#E8B48F', SKd = '#C98C66', RED = '#C0392B', RBC = '#D9534F', MU = '#9CC7E0', MUs = '#3A7FB0', GAS = '#3A7FB0', CB = C.ac;
const circ = (g, x, y, r, f, s = '#2E2A24', w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
// ring of cells around a lumen (vessel / tubule cross-section)
const ringCells = (g, x, y, r0, r1, n, f = CF) => { const out = []; for (let k = 0; k < n; k++) { const a0 = k * 2 * Math.PI / n, a1 = (k + 1) * 2 * Math.PI / n, P = [pol(x, y, r1, a0), pol(x, y, r1, a1), pol(x, y, r0, a1), pol(x, y, r0, a0)];
  out.push(mk(g, 'path', { d: `M${P.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L')} Z`, fill: f, stroke: CS, 'stroke-width': 2 })); const [nx, ny] = pol(x, y, (r0 + r1) / 2, (a0 + a1) / 2); mk(g, 'circle', { cx: nx, cy: ny, r: Math.min(8, (r1 - r0) / 3), fill: NU }); } return out; };

const S = [];
/* ---------- H: the scraped knee ---------- */
S.push(EP.hook({ label: 'AFTER A FALL', face: 'diya', pill: ['A covering that heals itself', ['H2', 'covering', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['What is this covering made of?', ['H3', 'made']], ['Why is skin thick, lungs thin?', ['H3', 'thick']]],
  a: [['ANSWER 1', 'Epithelium · the covering tissue', ['H4', 'Epithelium']], ['ANSWER 2', 'Shape and layers fit the job', ['H4', 'shape']]],
  chips: [['Simple', ['H5', 'simple']], ['Compound', ['H5', 'compound']], ['Squamous', ['H5', 'squamous']], ['Cuboidal', ['H5', 'cuboidal']], ['Columnar', ['H5', 'columnar']], ['Glands', ['H5', 'glands']], ['Junctions', ['H5', 'junctions']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EEF3F6' }); mk(s, 'rect', { x: 0, y: 420, width: 784, height: 160, fill: '#D9C7A8' });
    mk(s, 'path', { d: 'M60,400 C120,330 200,250 300,220 C340,208 380,214 400,240 C430,280 470,340 560,380 C620,404 700,410 760,412 L760,470 C680,470 600,462 540,440 C450,410 400,360 360,320 C330,300 290,300 260,320 C200,360 150,420 120,470 L60,470 Z', fill: SK, stroke: '#2E2A24', 'stroke-width': 4 });
    const sc = mk(s, 'ellipse', { cx: 335, cy: 232, rx: 44, ry: 20, fill: RED, transform: 'rotate(-14 335 232)' });
    const mg = mk(s, 'g', {}); circ(mg, 600, 210, 118, '#fff', '#2E2A24', 5); mk(mg, 'line', { x1: 518, y1: 296, x2: 430, y2: 252, stroke: '#2E2A24', 'stroke-width': 9, 'stroke-linecap': 'round' });
    const cl = mk(mg, 'clipPath', { id: 'hkc' }); circ(cl, 600, 210, 112, '#fff', 'none', 0); const inn = mk(mg, 'g', { 'clip-path': 'url(#hkc)' });
    mk(inn, 'rect', { x: 480, y: 90, width: 240, height: 240, fill: '#F6E7DC' }); const st = CE.strat(inn, 484, 300, 236);
    mk(s, 'rect', { x: 500, y: 338, width: 200, height: 34, rx: 8, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 2 }); cap(s, 600, 361, 'SKIN · MANY LAYERS', { fill: C.ink });
    return { els: [[mg, ['H2', 'sheet', -0.1], { ...POP, sc: 0.6 }]], anim: t => { const h = M.io((t - tm(['H3', 'heal'])) / 2.2); sc.setAttribute('fill', mix(RED, SK, h)); sc.setAttribute('stroke', mix('#8A1C1C', SK, h)); } };
  } }));

/* ---------- B: what is a tissue ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS A TISSUE?', ghost: true, pill: ['Epithelium: covers and lines', ['B3', 'covers', -0.1], 'ac'], build: (el, s) => {
  const grp = mk(s, 'g', {}); for (let i = 0; i < 6; i++) { const x = 90 + (i % 3) * 120, y = 110 + Math.floor(i / 3) * 110; mk(grp, 'rect', { x, y, width: 100, height: 90, rx: 18, fill: CF, stroke: CS, 'stroke-width': 3 }); mk(grp, 'circle', { cx: x + 50, cy: y + 45, r: 14, fill: NU }); }
  cap(s, 270, 352, 'SIMILAR CELLS · ONE JOB', { fill: C.ink });
  const K = ['EPITHELIAL', 'CONNECTIVE', 'MUSCULAR', 'NEURAL'].map((w, i) => { const e = div(el, 'chp', { left: 36 + i * 178 + 'px', top: '392px', width: '166px', justifyContent: 'center', fontSize: '17px', fontFamily: 'IBM Plex Mono', letterSpacing: '.06em' }, w); return e; });
  const sh = CE.row(s, 'co', 860, 380, 22, { s: 1 }); const fs = mk(s, 'path', { d: 'M850,250 L1540,250', stroke: CB, 'stroke-width': 5, 'stroke-dasharray': '12 8', fill: 'none' });
  cap(s, 1190, 232, 'FREE SURFACE · FACES A FLUID OR THE OUTSIDE', { fill: CB });
  const tg = cap(s, 1190, 430, 'CELLS PACKED TIGHT · LITTLE MATRIX', { fill: C.ink });
  return { els: [[grp, ['B2', 'group', -0.1], { ...POP, sc: 0.85 }], ...K.map((e, i) => [e, ['B2', ['epithelial', 'connective', 'muscular', 'neural'][i], -0.1]]), [sh.g, ['B3', 'Epithelial', -0.2], { dy: 20 }]],
    fades: [[fs, ['B3', 'free']], [tg, ['B3', 'packed']]], anim: t => { K[0].style.background = t > tm(['B3', 'Epithelial']) ? '#E3F1E7' : ''; K[0].style.color = t > tm(['B3', 'Epithelial']) ? '#1F6B3F' : ''; fs.style.strokeDashoffset = ((t * 30) % 20).toFixed(1);
      const tp = tm(['B3', 'packed']); sh.c.forEach((c, i) => c.setAttribute('fill', mix(CF, '#F2C2B6', M.clamp((t - tp - i * 0.04) / 0.2) * (1 - M.clamp((t - tp - 1.6) / 0.4))))); } }; } }] });

/* ---------- Z: zoom ladder into the small intestine ---------- */
let gob = null;
S.push(EP.zoom({ to: 'L1', names: ['BODY', 'INTESTINE WALL', 'LINING CELLS'], scales: ['x1', 'x20', 'x400'],
  info: [['RUNG 1 OF 3', 'Small intestine', 'A long, coiled tube in the belly.', 'It soaks up digested food.'], ['RUNG 2 OF 3', 'Its wall', 'Cut open: tiny finger-like folds.', 'One smooth sheet of cells covers them.'], ['RUNG 3 OF 3', 'Columnar cells', 'Tall cells, nucleus near the base.', 'Microvilli on top, goblet cells for mucus.']],
  av: { who: 'Diya', text: 'Tall cells, built to absorb!', tin: ['Z5', 'goblet', 0.6], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [540, 330, 60], build: g => {
      mk(g, 'path', { d: 'M400,40 C330,40 300,90 300,150 L290,480 L770,480 L760,150 C760,90 730,40 660,40 Z', fill: '#F3E4D0', stroke: '#2E2A24', 'stroke-width': 4 });
      mk(g, 'path', { d: 'M420,250 C480,230 600,230 640,250 C690,280 660,320 600,310 C540,300 460,300 450,340 C440,380 520,390 580,370 C640,350 680,380 650,420 C620,450 520,440 470,420', stroke: '#E39A8C', 'stroke-width': 24, fill: 'none', 'stroke-linecap': 'round' });
      return { labs: [[lab(g, 640, 250, 840, 200, 'Small intestine'), ['Z2', 'intestine']]] }; } },
    { at: 'Z3', focus: [520, 196, 54], build: g => {
      mk(g, 'rect', { x: 60, y: 330, width: 940, height: 130, fill: '#E9B9AE' });
      let d = 'M60,330'; for (let k = 0; k < 7; k++) { const x = 80 + k * 134; d += ` L${x},330 C${x},180 ${x + 20},170 ${x + 46},170 C${x + 72},170 ${x + 92},180 ${x + 92},330`; } d += ' L1000,330';
      mk(g, 'path', { d: d + ' L1000,460 L60,460 Z', fill: '#F2CFC6', stroke: CS, 'stroke-width': 3 }); const sh = mk(g, 'path', { d, stroke: '#C04B5A', 'stroke-width': 7, fill: 'none' });
      return { labs: [[lab(g, 80 + 3 * 134 + 46, 172, 760, 96, 'One sheet of cells'), ['Z3', 'sheet']], [lab(g, 80 + 134 + 46, 260, 140, 120, 'Fold'), ['Z3', 'wall']]] }; } },
    { at: 'Z4', build: g => { const r = CE.row(g, 'mv', 120, 420, 22, { s: 1.9 });
      const gx = 120 + 9 * 57; mk(g, 'path', { d: `M${gx + 4},420 L${gx + 4},300 C${gx - 6},250 ${gx + 63},250 ${gx + 53},300 L${gx + 53},420 Z`, fill: '#DCEBF5', stroke: MUs, 'stroke-width': 3 });
      const dr = []; for (let k = 0; k < 4; k++) dr.push({ k, e: circ(g, gx + 28, 290, 7, MU, MUs, 2) });
      return { labs: [[lab(g, 120 + 4 * 57 + 28, 300, 170, 120, 'Columnar cell'), ['Z4', 'Tall']], [lab(g, 120 + 14 * 57 + 28, 382, 880, 476, 'Nucleus at base', 'end'), ['Z4', 'nucleus']], [lab(g, 120 + 16 * 57 + 28, 236, 880, 100, 'Microvilli'), ['Z5', 'microvilli']], [lab(g, gx + 28, 330, 560, 100, 'Goblet cell'), ['Z5', 'goblet']]],
        anim: t => dr.forEach(d => { const v = ((t * 0.5 + d.k / 4) % 1); attr(d.e, 'cy', (300 - 120 * v).toFixed(1)); attr(d.e, 'cx', (gx + 28 + 14 * Math.sin(v * 6 + d.k)).toFixed(1)); d.e.style.opacity = M.clamp((t - tm(['Z5', 'mucus'])) / 0.3) * Math.min(1, 5 * (1 - v)); }) }; } }] }));

/* ---------- L: four simple epithelia ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'SIMPLE EPITHELIUM · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Simple = one layer', 'lines body cavities, ducts and tubes'], ['Squamous', 'thin, flat · blood vessels, air sacs of lungs'], ['Cuboidal', 'cube-shaped · gland ducts, kidney tubules'], ['Columnar', 'tall, nucleus at base · stomach, intestine'], ['Ciliated', 'cilia move mucus · bronchioles, fallopian tubes']], LT) }) },
  { pos: 'R', label: 'FOUR SIMPLE EPITHELIA · ONE LAYER EACH', build: (el, s) => {
    const R = [['SQUAMOUS', 'sq', 7, 0.9, 150], ['CUBOIDAL', 'cu', 12, 0.9, 260], ['COLUMNAR', 'co', 16, 0.85, 400], ['CILIATED', 'ci', 16, 0.85, 540]].map(([n, k, c, sc, y]) => { const g = mk(s, 'g', {}), r = CE.row(g, k, 250, y, c, { s: sc }); cap(g, 130, y - 8, n, { fill: C.ink, 'font-size': 17 }); return { g, r }; });
    const pt = []; for (let k = 0; k < 5; k++) pt.push(circ(s, 0, 0, 6, MU, MUs, 2));
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      R.forEach((o, i) => { const on = c <= 0 ? 1 : c - 1 === i ? 1 : 0.28; o.g.style.opacity = (t < ts[0] - 0.2 ? 0.25 : on).toFixed(2); });
      CE.beat(R[3].r, t, 1); pt.forEach((p, k) => { const v = (t * 0.25 + k / 5) % 1; attr(p, 'cx', (250 + 410 * v).toFixed(1)); attr(p, 'cy', (540 - 0.85 * 96 - 30).toFixed(1)); p.style.opacity = c === 4 ? Math.min(1, 6 * (1 - v), 6 * v) : 0; }); } }; } }] });

/* ---------- C: glandular epithelium ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'GLANDULAR EPITHELIUM · CELLS THAT SECRETE', build: (el, s) => {
  const ch = EP.chain(el, [['UNICELLULAR', ['C2', 'unicellular']], ['MULTICELLULAR', ['C2', 'multicellular']], ['EXOCRINE · DUCT', ['C3', 'Exocrine']], ['ENDOCRINE · NO DUCT', ['C4', 'Endocrine']]]);
  // goblet cell in a sheet
  const g1 = mk(s, 'g', {}); CE.row(g1, 'co', 90, 400, 11, { s: 1.1 }); const gx = 90 + 5 * 33; mk(g1, 'path', { d: `M${gx + 2},400 L${gx + 2},320 C${gx - 6},270 ${gx + 39},270 ${gx + 31},320 L${gx + 31},400 Z`, fill: '#DCEBF5', stroke: MUs, 'stroke-width': 3 });
  cap(g1, 270, 452, 'GOBLET CELL · ONE-CELL GLAND', { fill: C.ink });
  const m1 = []; for (let k = 0; k < 3; k++) m1.push(circ(s, gx + 16, 300, 6, MU, MUs, 2));
  // exocrine: flask of cells with a duct opening on the surface
  const g2 = mk(s, 'g', {}); mk(g2, 'rect', { x: 560, y: 150, width: 440, height: 22, fill: CF, stroke: CS, 'stroke-width': 2 });
  mk(g2, 'path', { d: 'M760,172 L760,280 M800,172 L800,280', stroke: CS, 'stroke-width': 3 }); mk(g2, 'rect', { x: 762, y: 172, width: 36, height: 108, fill: '#FBEFEA' });
  const ac = ringCells(g2, 780, 350, 34, 76, 10); cap(g2, 780, 452, 'MULTICELLULAR GLAND + DUCT', { fill: C.ink }); txt(g2, 820, 230, 'DUCT', { 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600 });
  const m2 = []; for (let k = 0; k < 6; k++) m2.push(circ(s, 780, 350, 6, '#F3E3B5', '#C9962B', 2));
  // endocrine: cluster, no duct, beside a blood vessel
  const g3 = mk(s, 'g', {}); mk(g3, 'rect', { x: 1110, y: 300, width: 440, height: 46, rx: 23, fill: '#F5C9C4', stroke: RED, 'stroke-width': 3 });
  const ec = []; for (let i = 0; i < 7; i++) ec.push(circ(g3, 1180 + (i % 4) * 50 + (i > 3 ? 25 : 0), 220 + (i > 3 ? 44 : 0), 24, CF, CS, 2)); ec.forEach(e => mk(g3, 'circle', { cx: e.getAttribute('cx'), cy: e.getAttribute('cy'), r: 7, fill: NU }));
  cap(g3, 1330, 452, 'NO DUCT · HORMONES INTO BLOOD', { fill: C.ink }); txt(g3, 1430, 380, 'BLOOD VESSEL', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: RED });
  const m3 = []; for (let k = 0; k < 5; k++) m3.push(circ(s, 0, 0, 5, '#E7C1F0', '#7A5BB0', 2));
  const P = ['Mucus', 'Saliva', 'Earwax', 'Oil', 'Milk', 'Enzymes'].map((w, i) => [div(el, 'chp', { left: 560 + i * 90 + 'px', top: '494px', fontSize: '17px', padding: '0 10px', height: '38px' }, w), ['C3', w.toLowerCase(), -0.1]]);
  return { els: [[g1, ['C2', 'gland', -0.2], { dy: 16 }], [g2, ['C2', 'multicellular', -0.2], { dy: 16 }], [g3, ['C4', 'Endocrine', -0.2], { dy: 16 }], ...P], anim: t => { const c = ch.run(t, tm('C1') + 0.4);
    m1.forEach((m, k) => { const v = (t * 0.45 + k / 3) % 1; attr(m, 'cy', (300 - 150 * v).toFixed(1)); m.style.opacity = t > tm(['C2', 'goblet']) ? Math.min(1, 5 * (1 - v)) : 0; });
    const on2 = t > tm(['C3', 'duct']); m2.forEach((m, k) => { const v = (t * 0.35 + k / 6) % 1, y = v < 0.3 ? 350 - 70 * v / 0.3 : 280 - 180 * (v - 0.3) / 0.7; attr(m, 'cy', y.toFixed(1)); attr(m, 'cx', 780); m.style.opacity = on2 ? Math.min(1, 6 * (1 - v)) : 0; });
    const on3 = t > tm(['C4', 'hormones']); m3.forEach((m, k) => { const v = (t * 0.3 + k / 5) % 1, x0 = 1200 + k * 50; attr(m, 'cx', (x0 + 60 * Math.max(0, v - 0.5)).toFixed(1)); attr(m, 'cy', (250 + 70 * Math.min(1, v * 2)).toFixed(1)); m.style.opacity = on3 ? Math.min(1, 5 * (1 - v)) : 0; });
  } }; } }] });

/* ---------- D: cell junctions ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'TWO NEIGHBOUR CELLS', build: (el, s) => {
    [[50, 250], [260, 460]].forEach(([a, b]) => { mk(s, 'rect', { x: a, y: 90, width: b - a, height: 420, rx: 20, fill: CF, stroke: CS, 'stroke-width': 3 }); circ(s, (a + b) / 2, 380, 30, NU, 'none', 0); });
    const tj = mk(s, 'g', {}); for (let k = 0; k < 5; k++) mk(tj, 'line', { x1: 244, y1: 120 + k * 10, x2: 266, y2: 120 + k * 10, stroke: '#2E2A24', 'stroke-width': 3 });
    const aj = mk(s, 'g', {}); [[236, 230], [258, 230]].forEach(([x, y]) => mk(aj, 'rect', { x, y, width: 6, height: 50, fill: '#C9962B' })); for (let k = 0; k < 4; k++) { mk(aj, 'path', { d: `M236,${236 + k * 12} l-40,${k * 6 - 10}`, stroke: '#C9962B', 'stroke-width': 2 }); mk(aj, 'path', { d: `M264,${236 + k * 12} l40,${k * 6 - 10}`, stroke: '#C9962B', 'stroke-width': 2 }); }
    const gj = mk(s, 'g', {}); for (let k = 0; k < 3; k++) mk(gj, 'rect', { x: 238, y: 300 + k * 22, width: 34, height: 12, rx: 6, fill: '#BFE3CB', stroke: CB, 'stroke-width': 2 });
    const ions = []; for (let k = 0; k < 3; k++) ions.push(circ(s, 0, 0, 5, CB, 'none', 0));
    const lk = []; for (let k = 0; k < 2; k++) lk.push(circ(s, 0, 0, 6, MU, MUs, 2));
    return { labs: [[lab(s, 266, 140, 500, 140, 'Tight junction'), ['D2', 'Tight']], [lab(s, 264, 254, 500, 254, 'Adhering junction'), ['D3', 'Adhering']], [lab(s, 272, 328, 500, 368, 'Gap junction'), ['D4', 'Gap']]],
      els: [[tj, ['D2', 'Tight', -0.1]], [aj, ['D3', 'Adhering', -0.1]], [gj, ['D4', 'Gap', -0.1]]], anim: t => {
        const g0 = tm(['D4', 'tunnels']); ions.forEach((e, k) => { const v = (t * 0.6 + k / 3) % 1; attr(e, 'cx', (200 + 110 * v).toFixed(1)); attr(e, 'cy', 306 + k * 22); e.style.opacity = t > g0 ? Math.min(1, 6 * v, 6 * (1 - v)) : 0; });
        const l0 = tm(['D2', 'leak']); lk.forEach((e, k) => { const v = (t * 0.7 + k / 2) % 1; attr(e, 'cx', 255); attr(e, 'cy', (70 + 40 * Math.min(v * 2, 1) - 14 * Math.max(0, v * 2 - 1)).toFixed(1)); e.style.opacity = t > l0 - 0.5 && t < tm('D3') ? Math.min(1, 5 * (1 - v)) : 0; });
      } }; } },
  { pos: 'R', label: 'THREE JUNCTIONS · THREE JOBS', svg: false, build: el => {
    const R = [['Tight junction', 'stops leaks across the tissue', 'SEAL', ['D2', 'Tight']], ['Adhering junction', 'cements neighbours together', 'CEMENT', ['D3', 'Adhering']], ['Gap junction', 'joins cytoplasm · ions pass fast', 'TUNNEL', ['D4', 'Gap']]].map(([n, d, k, at], i) => [div(el, 'rw', { top: 90 + i * 110 + 'px' }, `<div class="rn">${n}</div><div class="rd">${d}</div><div class="rk">${k}</div>`), at]);
    return { els: R.map(([e, at]) => [e, [at[0], at[1], 0.1], { dx: -16, dy: 0 }]) }; } }] });

/* ---------- U: simple vs compound + think ---------- */
const TH = { q: 'Food rubs the inside of your cheek all day. Simple or compound epithelium?', opts: ['Simple', 'Compound'], right: 1, why: 'Compound. The buccal cavity is lined in layers, for protection.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'SIMPLE · ONE THIN LAYER', tout: 'U4', pill: ['Gases pass through easily', ['U2', 'passing', -0.1], 'good'], build: (el, s) => {
    mk(s, 'rect', { x: 60, y: 90, width: 664, height: 150, fill: '#EEF3F6' }); cap(s, 392, 120, 'AIR SAC · AIR', { fill: MUs });
    const r = CE.row(s, 'sq', 76, 280, 9, { s: 1 }); mk(s, 'rect', { x: 60, y: 300, width: 664, height: 110, rx: 30, fill: '#F5C9C4', stroke: RED, 'stroke-width': 3 }); cap(s, 392, 440, 'BLOOD CAPILLARY', { fill: RED });
    for (let k = 0; k < 6; k++) mk(s, 'ellipse', { cx: 120 + k * 100, cy: 355, rx: 22, ry: 12, fill: RBC });
    const gs = []; for (let k = 0; k < 6; k++) gs.push(circ(s, 0, 0, 7, '#fff', GAS, 3));
    return { anim: t => { const on = t > tm(['U2', 'gases']) - 0.6; gs.forEach((e, k) => { const v = (t * 0.4 + k / 6) % 1; attr(e, 'cx', 120 + k * 100); attr(e, 'cy', (170 + 180 * v).toFixed(1)); e.style.opacity = on ? Math.min(1, 6 * v, 6 * (1 - v)) : 0; }); } }; } },
  { pos: 'R', label: 'COMPOUND · MANY LAYERS', tin: ['U3', null, -0.2], tout: 'U4', pill: ['Main job: protection', ['U3', 'protection', -0.1], 'ac'], build: (el, s) => {
    const st = CE.strat(s, 60, 330, 664); const ar = mk(s, 'g', {}); [0, 1, 2].forEach(k => mk(ar, 'path', { d: `M${180 + k * 180},${150} l70,0 m-14,-12 l14,12 l-14,12`, stroke: '#C9962B', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
    cap(s, 392, 130, 'RUBBING · WEAR AND TEAR', { fill: '#A57818' });
    const W = [['Dry skin', ['U3', 'skin']], ['Mouth, pharynx', ['U3', 'mouth']], ['Salivary, pancreatic ducts', ['U3', 'ducts']]].map(([w, at], i) => [div(el, 'chp', { left: [36, 186, 400][i] + 'px', top: '376px' }, w), [at[0], at[1], -0.1]]);
    return { els: [[ar, ['U3', 'protection', -0.3], { dx: -20, dy: 0 }], ...W], anim: t => { attr(ar, 'transform', `translate(${(12 * Math.sin(t * 3)).toFixed(1)} 0)`); } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Simple', -0.1], why: ['U5', 'buccal'] })] });

/* ---------- W: three linings ---------- */
const vessel = s => { mk(s, 'circle', { cx: 248, cy: 145, r: 112, fill: '#FBF3EE' }); ringCells(s, 248, 145, 82, 100, 14); mk(s, 'circle', { cx: 248, cy: 145, r: 80, fill: '#F8DCD8' }); [[220, 120], [270, 160], [240, 180], [280, 110]].forEach(([x, y]) => mk(s, 'ellipse', { cx: x, cy: y, rx: 16, ry: 9, fill: RBC })); };
const tube = s => { ringCells(s, 248, 145, 50, 110, 12); mk(s, 'circle', { cx: 248, cy: 145, r: 48, fill: '#fff', stroke: CS, 'stroke-width': 2 }); };
let wci = null; const bron = s => { wci = CE.row(s, 'ci', 40, 250, 14, { s: 1.4 * 0.75 }); const mu = mk(s, 'path', { d: 'M40,140 C120,120 200,150 280,130 C360,112 420,140 456,128 L456,150 C400,160 300,150 200,166 C130,176 80,160 40,166 Z', fill: MU, opacity: 0.8 }); return { anim: t => { CE.beat(wci, t, 1); attr(mu, 'transform', `translate(${(10 * Math.sin(t * 1.5)).toFixed(1)} 0)`); } }; };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THREE LININGS', svg: false, build: el => EP.cols(el, [
  ['LINING 1 · TINY BLOOD VESSEL', 'Simple squamous', 'ONE LAYER · FLAT CELLS', vessel, ['W2', 'First', -0.1], ['W2', 'Simple', -0.1], ['W2', 'squamous', 0.2]],
  ['LINING 2 · KIDNEY TUBE', 'Simple cuboidal', 'ONE LAYER · CUBE CELLS', tube, ['W3', 'Second', -0.1], ['W3', 'Simple', -0.1], ['W3', 'cuboidal', 0.2]],
  ['LINING 3 · BRONCHIOLE', 'Ciliated epithelium', 'CILIA SWEEP MUCUS AWAY', bron, ['W4', 'Third', -0.1], ['W5', 'ciliated', -0.1], ['W5', 'sweep']]]) }] });

EP.run({
  icons: { hand: ['M8 13V5.5a1.5 1.5 0 0 1 3 0V12', 'M11 11.5V4a1.5 1.5 0 0 1 3 0v7.5', 'M14 11.5V5.5a1.5 1.5 0 0 1 3 0V13', 'M17 9.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L3.6 15.5a1.5 1.5 0 0 1 2.4-1.8L8 16'],
    mouth: ['M4 12c2-3 5-4 8-4s6 1 8 4c-2 3-5 4-8 4s-6-1-8-4Z', 'M4 12h16'], stomach: ['M9 3v4c0 2-4 3-4 8a6 6 0 0 0 12 1c0-3-3-3-3-6V3', 'M14 10c2 0 4 1 4 3'] },
  jobs: [['hand', 'Your skin', 'ON YOUR HAND', ['H1', 'skin']], ['mouth', 'Your cheek', 'THE INSIDE', ['H1', 'cheek']], ['stomach', 'Your stomach', 'ITS LINING', ['H1', 'stomach']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Simple</span>: a single layer.', f: '<span class="lad"><b>squamous</b> · cuboidal · columnar · ciliated</span>', t2: ['T1', 'Simple', -0.2], tf: ['T1', 'layer', -0.1] },
  trap: { wrong: 'Skin is simple epithelium', right: 'Skin is compound epithelium, many layers', tWrong: ['X2', 'skin', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'compound', -0.3], tSvg: ['X3', 'layers', -0.4],
    build: s => { CE.row(s, 'sq', 30, 170, 3, { s: 0.85 }); CE.strat(s, 240, 170, 190);
      [['SIMPLE · 1 LAYER', 120, '#FBE9E9', '#8A1C1C'], ['SKIN · MANY LAYERS', 335, '#E3F1E7', '#1F6B3F']].forEach(([w, x, b, f]) => { mk(s, 'rect', { x: x - 100, y: 206, width: 200, height: 40, rx: 9, fill: b }); cap(s, x, 232, w, { fill: f, 'font-size': 14 }); }); } },
  where: { type: 'Match-the-following: each epithelium with where it is found', at: ['E1', 'match'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Simple squamous<br><b>2</b>Simple cuboidal<br><b>3</b>Ciliated<br><b>4</b>Compound</div><div><span class="h">LIST II</span><br><b>p</b>Fallopian tube<br><b>q</b>Buccal cavity<br><b>r</b>Air sacs of lungs<br><b>s</b>Tubules of nephron</div></div>',
    opts: ['1-p, 2-q, 3-r, 4-s', '1-s, 2-r, 3-q, 4-p', '1-r, 2-s, 3-p, 4-q', '1-q, 2-p, 3-s, 4-r'], right: 2 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['1-r: air sacs of lungs', ['A2', 'Squamous']], ['2-s: tubules of nephron', ['A2', 'Cuboidal']], ['3-p: fallopian tubes', ['A3', 'Ciliated']], ['4-q: buccal cavity', ['A3', 'compound']]],
  recap: { title: 'Recap · epithelial tissue', lines: ['<b>Epithelium</b>: covers and lines · free surface · cells packed tight', '<b>Simple</b> (one layer): squamous, cuboidal, columnar, ciliated', '<b>Compound</b> (many layers): protection · skin, buccal cavity, pharynx', '<b>Glands</b>: exocrine (through ducts) · endocrine (hormones, no duct)', '<b>Junctions</b>: tight (seal) · adhering (cement) · gap (share molecules)'] },
  yq: ['Where is simple squamous epithelium found?', 'How is an exocrine gland different from an endocrine gland?', 'Which cell junction lets two cells share small molecules?'],
  next: { label: 'NEXT · EP 57', topic: 'Bone, blood and biceps: Connective and Muscular Tissue' }
});
})();
