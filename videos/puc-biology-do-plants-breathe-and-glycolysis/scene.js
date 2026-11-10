// PUC Biology Ep 87: Do Plants Breathe and Glycolysis (Living diagram, leaf green). Runner: ep.js + bio9.js + cell8.js + bio11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, circ, T, at, arrow, hex } = B9;
const { K } = B11, B = B11, K8 = window.K8;
const ICN = { bike: ['M6 17a3 3 0 1 0 .1 0', 'M18 17a3 3 0 1 0 .1 0', 'M6 17l4-8h5l3 8', 'M10 9l2 8', 'M14 6h3'], tree: ['M12 22v-7', 'M12 3a6 6 0 0 0-6 6c0 3 3 6 6 6s6-3 6-6a6 6 0 0 0-6-6Z'], jar: ['M7 6h10v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1Z', 'M8 3h8v3H8Z', 'M10 13a1 1 0 1 0 .1 0', 'M14 16a1 1 0 1 0 .1 0'] };
const S = [];
const PH = '#8E5BB5', PHL = '#E2D2F0';
const ptag = (g, x, y) => B.tag(g, x, y, 'P', PHL, PH, 16, 30);
const tree = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x - 14 * s},${y} L${x - 10 * s},${y - 170 * s} L${x + 10 * s},${y - 170 * s} L${x + 14 * s},${y} Z`, '#A07850', K.ink, 3);
  [[0, -230, 90], [-70, -190, 70], [70, -190, 70], [-40, -270, 60], [40, -270, 60]].forEach(([dx, dy, r]) => circ(G, x + dx * s, y + dy * s, r * s, K.leaf, K.chlD, 3)); P(G, `M${x - 10 * s},${y} c-20,20 -50,24 -70,30 M${x + 10 * s},${y} c20,20 50,24 70,30 M${x},${y} l0,40`, 'none', '#8C6D4F', 4); return G; };

/* ---------- H: the bicycle climb ---------- */
S.push(EP.hook({ label: 'THE HILL ROAD · AFTER THE CLIMB', face: 'aarav', pill: ['No lungs, still alive', ['H1', 'lungs', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Do plants breathe?', ['H3', 'breathe']], ['How does a cell get energy from sugar?', ['H3', 'energy', -0.4]]],
  a: [['ANSWER 1', 'Yes, through tiny pores', ['H4', 'pores']], ['ANSWER 2', 'Glycolysis splits glucose', ['H4', 'glycolysis']]],
  chips: [['Respiration', ['H5', 'respiration']], ['Gas exchange', ['H5', 'exchange']], ['Glycolysis', ['H5', 'glycolysis']], ['The ATP count', ['H5', 'ATP']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EAF4F8' }); P(s, 'M0,500 L784,300 L784,580 L0,580 Z', '#C9B07A', 'none', 0); P(s, 'M0,520 L784,330', 'none', '#8C8577', 18);
    const tr = tree(s, 600, 330, 0.9);
    const bkO = mk(s, 'g', {}), bk = mk(bkO, 'g', {}); circ(bk, -30, 0, 26, 'none', K.ink, 4); circ(bk, 30, -14, 26, 'none', K.ink, 4); P(bk, 'M-30,0 L-6,-34 L22,-40 L30,-14 M-6,-34 L0,-6 L-30,0 M22,-40 L18,-52', 'none', K.red, 4);
    const jar = mk(s, 'g', {}); mk(jar, 'rect', { x: 330, y: 380, width: 100, height: 120, rx: 14, fill: '#E6F2F8', stroke: K.ink, 'stroke-width': 3 }); for (let k = 0; k < 10; k++) mk(jar, 'ellipse', { cx: 350 + (k * 23) % 64, cy: 470 - Math.floor(k / 4) * 16, rx: 9, ry: 6, fill: '#E8D9A8', stroke: '#8C6D4F', 'stroke-width': 1.5 });
    const heat = [0, 1, 2].map(k => P(jar, `M${355 + k * 25},372 c-10,-14 10,-24 0,-40`, 'none', K.red, 3)); cap(s, 380, 528, 'SOAKED SEEDS', { fill: K.ink });
    return { els: [[bkO, ['H1', 'bicycle', -0.2], { dy: 10 }], [tr, ['H1', 'tree', -0.2], { dy: 20 }], [jar, ['H1', 'Soaked', -0.2], { dy: 20 }]],
      anim: t => { at(bk, 120 + 6 * Math.sin(t * 3), 470 - 10 * Math.sin(t * 3)); heat.forEach((h, k) => h.style.opacity = (0.4 + 0.6 * Math.abs(Math.sin(t * 2 + k))).toFixed(2)); } };
  } }));

/* ---------- B: what is respiration ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS RESPIRATION?', build: (el, s) => {
  const gl = mk(s, 'g', {}); hex(gl, 300, 240, 100); const vs = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; vs.push(circ(gl, 300 + 100 * Math.cos(a), 240 + 100 * Math.sin(a), 13, '#3B3B3B', K.ink, 2)); } T(gl, 300, 250, 'Glucose', 30, K.sug);
  const sp = mk(s, 'g', {}); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, x = 300 + 100 * Math.cos(a) * 0.87, y = 240 + 100 * Math.sin(a) * 0.87; P(sp, `M${x - 10},${y - 10} L${x + 10},${y + 10} M${x + 10},${y - 10} L${x - 10},${y + 10}`, 'none', K.red, 4); }
  const ar = arrow(s, 440, 240, 600, 240, K.ink, 4); const ats = [0, 1, 2, 3].map(k => B.atp(s, 700 + (k % 2) * 120, 190 + Math.floor(k / 2) * 80, 24));
  const p1 = div(el, 'pillp', { left: '1000px', top: '170px' }, 'Bonds broken by oxidation'), p2 = div(el, 'pillp ac', { left: '1000px', top: '250px' }, 'ATP: the energy currency');
  const eq = div(el, '', { position: 'absolute', left: '0', top: '400px', width: '1600px', textAlign: 'center', font: "600 40px 'IBM Plex Mono'", color: C.ink, whiteSpace: 'nowrap' }, '<span style="color:#C9962B">C₆H₁₂O₆</span> + 6<span style="color:#5AA0C8">O₂</span> → 6<span style="color:#6B7280">CO₂</span> + 6H₂O + <span style="color:#E58A3C">energy</span>');
  return { els: [[gl, ['B2', 'Food', -0.1], { ...POP, sc: 0.6 }], [sp, ['B2', 'Breaking', -0.1], { dy: 0, fade: 0.2 }], [p1, ['B2', 'oxidation', -0.2]], [ar, ['B2', 'releases', -0.2], { dx: -10, dy: 0 }], ...ats.map((e, k) => [e, ['B3', 'trapped', -0.2 + k * 0.15], { ...POP, sc: 0.4 }]), [p2, ['B3', 'currency', -0.2]], [eq, ['B3', 'Glucose', -0.1], { dy: 12 }]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
const stoma = (g, x, y, sc) => { mk(g, 'ellipse', { cx: x - 40 * sc, cy: y, rx: 44 * sc, ry: 100 * sc, fill: K.chlF, stroke: K.chlD, 'stroke-width': 4 }); mk(g, 'ellipse', { cx: x + 40 * sc, cy: y, rx: 44 * sc, ry: 100 * sc, fill: K.chlF, stroke: K.chlD, 'stroke-width': 4 }); mk(g, 'ellipse', { cx: x, cy: y, rx: 16 * sc, ry: 74 * sc, fill: '#FFFFFF', stroke: K.chlD, 'stroke-width': 2 });
  for (let k = 0; k < 5; k++) { circ(g, x - 50 * sc, y - 60 * sc + k * 30 * sc, 7 * sc, K.chl, K.chlD, 1.2); circ(g, x + 50 * sc, y - 60 * sc + k * 30 * sc, 7 * sc, K.chl, K.chlD, 1.2); } };
S.push(EP.zoom({ to: 'L1', names: ['PLANT', 'LEAF', 'STOMA'], scales: ['x1', 'x100', 'x500'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The plant', 'No lungs.', 'Each part does its own gas exchange.'], ['RUNG 2 OF 3', 'The leaf', 'Loosely packed cells, air spaces.', 'Almost every cell touches air.'], ['RUNG 3 OF 3', 'Stoma', 'Pores on leaves.', 'Lenticels on stems.']],
  av: { who: 'Aarav', text: 'So trees do respire!', tin: ['Z4', 'organs', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [600, 120, 60], build: g => { tree(g, 528, 420, 1.15);
      return { labs: [[lab(g, 600, 160, 800, 110, 'Leaves'), ['Z2', 'leaves']], [lab(g, 520, 350, 760, 360, 'Stem'), ['Z2', 'stem']], [lab(g, 480, 445, 300, 480, 'Roots', 'end'), ['Z2', 'roots']]] }; } },
    { at: 'Z3', focus: [528, 390, 50], build: g => { B.leafX(g, 528, 263, 940, 300, false, { bundles: [260, 800], R: 56 });
      return { labs: [[lab(g, 560, 200, 640, 80, 'Loosely packed cells'), ['Z3', 'loosely']], [lab(g, 470, 300, 380, 470, 'Air spaces', 'end'), ['Z3', 'air']]] }; } },
    { at: 'Z4', build: g => { stoma(g, 400, 270, 1.5); const o = mk(g, 'g', {}); B.o2(o, 0, 0, 24); const c = mk(g, 'g', {}); B.co2(c, 0, 0, 24);
      const st = mk(g, 'g', {}); mk(st, 'rect', { x: 740, y: 120, width: 200, height: 300, rx: 20, fill: '#B08A62', stroke: K.ink, 'stroke-width': 3 }); mk(st, 'ellipse', { cx: 840, cy: 270, rx: 22, ry: 60, fill: '#E8D9A8', stroke: '#6B4E2E', 'stroke-width': 3 }); for (let k = 0; k < 6; k++) P(st, `M${760 + k * 30},140 L${760 + k * 30},180`, 'none', '#8C6D4F', 2);
      return { els: [[st, ['Z4', 'lenticels', -0.3], { dy: 12 }]], labs: [[lab(g, 400, 220, 300, 80, 'Stoma (pore)', 'end'), ['Z4', 'stomata']], [lab(g, 340, 340, 260, 470, 'Guard cell', 'end'), ['Z4', 'leaves']], [lab(g, 840, 300, 780, 480, 'Lenticel'), ['Z4', 'lenticels']]],
        anim: t => { const a = tm(['Z4', 'Gases']), u = ((t - a) * 0.4) % 1, v = ((t - a) * 0.4 + 0.5) % 1; at(o, 470 - 70 * u, 120 + 300 * u); at(c, 330 + 70 * v, 420 - 300 * v); o.style.opacity = c.style.opacity = t > a ? 1 : 0; } }; } }] }));

/* ---------- L: glycolysis ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'GLYCOLYSIS · IN THE CYTOPLASM', svg: false, build: el => ({ anim: EP.steps(el, [['Glucose → G-6-P', 'ATP used · enzyme hexokinase'], ['→ Fructose 1,6-bisphosphate', 'a second ATP used'], ['Splits: PGAL + DHAP', 'DHAP becomes PGAL too'], ['PGAL → BPGA → PGA', 'NAD⁺ → NADH · ATP made'], ['PEP → pyruvic acid', 'ATP made · 2 pyruvic acid']], LT) }) },
  { pos: 'R', label: 'ONE GLUCOSE, STEP BY STEP', build: (el, s) => {
    const gA = B.mol(s, 0, 0, 3, K.sugL, K.sug, null, 20), gB = B.mol(s, 0, 0, 3, K.sugL, K.sug, null, 20);
    const pA = ptag(s, 0, 0), pB = ptag(s, 0, 0), ex = mk(s, 'g', {}); B.atp(ex, 0, 0, 18);
    const nA = T(s, 0, 0, '', 22, K.ink), nB = T(s, 0, 0, '', 22, K.ink), nC = T(s, 392, 300, '', 26, K.ink);
    const hk = B.tag(s, 392, 110, 'hexokinase', K.pepL, K.pep, 18);
    const nads = [0, 1].map(() => B.nadh(s, 0, 0, 18)), atA = [0, 1, 2, 3].map(() => B.atp(s, 0, 0, 18));
    const ct = div(el, '', { position: 'absolute', left: '36px', top: '500px', width: '712px', display: 'flex', justifyContent: 'center', gap: '36px', font: "600 22px 'IBM Plex Mono'", color: C.mute, whiteSpace: 'nowrap' }); ct.innerHTML = '<span>ATP USED <b>0</b></span><span>ATP MADE <b>0</b></span><span>NADH <b>0</b></span>'; const cb = [...ct.querySelectorAll('b')];
    return { els: [[hk, ['L2', 'hexokinase', -0.2], POP]], anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); const t0 = tm('L1') + 0.3;
      const spl = M.io((t - tm(['L4', 'splits'])) / 1), dx = 63 + 120 * spl; at(gA, 392 - dx, 230); at(gB, 392 + dx, 230); gA.style.opacity = gB.style.opacity = t > t0 ? 1 : 0;
      const p1 = tm(['L2', 'phosphate']), p2 = tm(['L3', 'second']); at(pB, 392 + dx + 68, 230 - 34 * M.io((t - p1) / 0.6) + 34); pB.style.opacity = t > p1 ? 1 : 0; at(pA, 392 - dx - 68, 230); pA.style.opacity = t > p2 ? 1 : 0;
      const fly = (ta) => M.clamp((t - ta + 0.8) / 0.8); const f1 = fly(p1), f2 = fly(p2), fc = t < p1 + 0.1 ? f1 : f2; at(ex, 392 + 300 * (1 - fc), 100 + 130 * fc); ex.style.opacity = (t > p1 - 0.8 && t < p1) || (t > p2 - 0.8 && t < p2) ? 1 : 0;
      const n4 = tm(['L5', 'NADH']), a4 = tm(['L5', 'ATP']), a5 = tm(['L6', 'ATP']);
      nads.forEach((e, k) => { at(e, 392 + (k ? 1 : -1) * dx, 330); e.style.opacity = t > n4 ? 1 : 0; }); atA.forEach((e, k) => { at(e, 392 + (k % 2 ? 1 : -1) * dx, k < 2 ? 380 : 430); e.style.opacity = t > (k < 2 ? a4 : a5) ? 1 : 0; });
      const lb = t < p1 ? 'Glucose · 6C' : t < tm(['L3', 'rearranged']) ? 'Glucose 6-phosphate' : t < p2 ? 'Fructose 6-phosphate' : t < tm(['L4', 'splits']) + 0.3 ? 'Fructose 1,6-bisphosphate' : ''; nC.textContent = lb; nC.style.opacity = t > t0 ? 1 : 0;
      const sl = t < tm(['L4', 'splits']) + 0.3 ? null : t < tm(['L4', 'changes']) ? ['DHAP', 'PGAL'] : t < tm(['L5', 'BPGA']) ? ['PGAL', 'PGAL'] : t < tm(['L5', 'PGA', 0, 1]) ? ['BPGA', 'BPGA'] : t < tm(['L6', 'PEP']) ? ['PGA', 'PGA'] : t < tm(['L6', 'pyruvic']) ? ['PEP', 'PEP'] : ['Pyruvic acid', 'Pyruvic acid'];
      [nA, nB].forEach((n, k) => { n.textContent = sl ? sl[k] : ''; attr(n, 'x', 392 + (k ? 1 : -1) * dx); attr(n, 'y', 290); });
      cb[0].textContent = t > p2 ? 2 : t > p1 ? 1 : 0; cb[1].textContent = t > a5 ? 4 : t > a4 ? 2 : 0; cb[2].textContent = t > n4 ? 2 : 0; } }; } }] });

/* ---------- C: count the ATP ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'COUNT THE ATP · ONE GLUCOSE', svg: false, build: el => {
  const col = (x, h, big, c, sub) => div(el, '', { position: 'absolute', left: x + 'px', top: '110px', width: '440px', height: '400px', borderRadius: '16px', background: 'var(--soft)' }, `<div class="lbl" style="left:28px;top:24px">${h}</div><div style="position:absolute;left:28px;top:90px;font:600 96px/1 'IBM Plex Mono';color:${c}">${big}</div><div style="position:absolute;left:28px;top:220px;width:384px;font:500 26px/1.4 Poppins">${sub}</div>`);
  const a = col(60, 'ATP USED', '- 2', '#D1495B', 'One at each phosphate step: glucose, then fructose 6-phosphate.'), b = col(580, 'ATP MADE', '+ 4', '#E58A3C', 'Two from each PGAL, and there are two PGAL.'), c = col(1100, 'NET GAIN', '+ 2', C.ac, 'Net 2 ATP, plus 2 NADH.');
  return { els: [[a, ['C2', 'Two', -0.2], { dy: 20 }], [b, ['C3', 'Each', -0.2], { dy: 20 }], [c, ['C3', 'net', -0.3], { dy: 20 }]] }; } }] });

/* ---------- D: where, and who named it ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'WHERE IT HAPPENS', pill: ['In all living organisms', ['D2', 'all', -0.1], 'ac'], build: (el, s) => {
    const cy = mk(s, 'rect', { x: 80, y: 90, width: 624, height: 330, rx: 60, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 4 }); K8.nuc(s, 230, 250, 60); K8.mito(s, 520, 170, 1.6, 15); K8.mito(s, 580, 330, 1.6, -20);
    const gl = [0, 1, 2].map(k => { const g = mk(s, 'g', {}); hex(g, 0, 0, 16); return g; }); const ch = div(el, 'chp', { left: '36px', top: '436px', background: C.ink, color: '#fff', fontSize: '19px' }, 'No oxygen? The only way to respire');
    return { els: [[ch, ['D2', 'without', -0.1]]], labs: [[lab(s, 380, 300, 420, 470, 'Cytoplasm · glycolysis'), ['D2', 'cytoplasm']], [lab(s, 520, 170, 620, 62, 'Mitochondrion', 'end'), ['D2', 'cytoplasm', 0.5]]],
      anim: t => { gl.forEach((g, k) => { at(g, 330 + 60 * Math.sin(t * 0.8 + k * 2), 180 + 90 * k + 15 * Math.cos(t + k)); }); cy.style.fill = M.mix('#F3F7EA', '#E3F1E7', 0.5 + 0.5 * Math.sin(t * 2)); } }; } },
  { pos: 'R', label: 'THE EMP PATHWAY', tin: ['D3', null, -0.2], build: (el, s) => {
    const nm = [['E', 'Gustav Embden', 'Embden'], ['M', 'Otto Meyerhof', 'Meyerhof'], ['P', 'J. Parnas', 'Parnas']].map(([l, n, w], i) => [div(el, 'chp', { left: '36px', top: 90 + i * 66 + 'px', height: '54px', fontSize: '24px' }, `<b style="color:var(--ac);font:700 26px 'IBM Plex Mono'">${l}</b>${n}`), w]);
    const su = mk(s, 'g', {}); hex(su, 120, 420, 34); B9.pent(su, 190, 420, 32, '#FCEBC0', '#E2B33C'); P(su, 'M152,420 L160,420', 'none', K.ink, 3); B.cap(su, 155, 486, 'SUCROSE', K.ink, 15);
    const ar = mk(s, 'g', {}); arrow(ar, 250, 420, 390, 420, K.ink, 4); B.tag(ar, 320, 380, 'invertase', K.pepL, K.pep, 16);
    const pr = mk(s, 'g', {}); hex(pr, 470, 420, 34); B.cap(pr, 470, 486, 'GLUCOSE', K.sug, 15); T(pr, 545, 428, '+', 30, K.ink); B9.pent(pr, 620, 420, 32, '#FCEBC0', '#E2B33C'); B.cap(pr, 620, 486, 'FRUCTOSE', '#B8901F', 15);
    return { els: [...nm.map(([e, w]) => [e, ['D3', w, -0.15], { dx: -16, dy: 0 }]), [su, ['D3', 'sucrose', -0.2], POP], [ar, ['D3', 'invertase', -0.2], { dx: -10, dy: 0 }], [pr, ['D3', 'glucose', 0, 1], POP]] }; } }] });

/* ---------- U: three roads + think ---------- */
const TH = { q: 'Does glycolysis itself need oxygen?', opts: ['Yes', 'No'], right: 1, why: 'No. That is why even organisms living without oxygen can run it.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'PYRUVIC ACID · THREE ROADS', tout: 'U4', build: (el, s) => {
    const py = B.mol(s, 220, 300, 3, K.sugL, K.sug, 'PYRUVIC ACID', 22, 20);
    const road = (y, txt1, txt2, col, w) => { const g = mk(s, 'g', {}); P(g, `M330,300 C450,300 480,${y} 620,${y}`, 'none', col, 5); B.arrowHead(g, 620, y, 0, col, 14); const d = div(el, 'chp', { left: '660px', top: y - 30 + 'px', height: '60px', width: '520px', fontSize: '26px' }, `<b style="color:${col}">${txt1}</b><span style="color:var(--mute);font-size:21px">${txt2}</span>`); return [g, d, w]; };
    const r = [road(140, 'Lactic acid', '· our muscles', K.red, ['U2', 'lactic']), road(300, 'Ethanol + CO₂', '· yeast', '#B8901F', ['U2', 'ethanol']), road(460, 'CO₂ + H₂O', '· in mitochondria', C.ac, ['U3', 'mitochondria'])];
    const n1 = div(el, 'chp', { left: '1220px', top: '190px', background: '#FBE3E6', color: '#B23A4E', fontSize: '19px' }, 'NO OXYGEN · fermentation'), n2 = div(el, 'chp', { left: '1220px', top: '430px', background: '#E3F1E7', color: '#1F6B3F', fontSize: '19px' }, 'WITH OXYGEN · aerobic');
    return { els: [[py, 'U1', { ...POP, sc: 0.6 }], ...r.flatMap(([g, d, w]) => [[g, [w[0], w[1], -0.3], { dy: 0, fade: 0.3 }], [d, w, { dx: -16, dy: 0 }]]), [n1, ['U2', 'fermentation', -0.2]], [n2, ['U3', 'aerobic', -0.2]]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'oxygen', -0.1], why: ['U5', 'That'] })] });

/* ---------- W: three glucose ---------- */
const hx3 = s => { [0, 1, 2].forEach(k => hex(s, 100 + k * 50, 70, 20)); };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · THREE GLUCOSE THROUGH GLYCOLYSIS', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · PYRUVIC ACID', '3 × 2 = 6 pyruvic acid', 'TWO PER GLUCOSE', s => { hx3(s); for (let k = 0; k < 6; k++) B.mol(s, 130 + (k % 3) * 120, 160 + Math.floor(k / 3) * 70, 3, K.sugL, K.sug, null, 11); arrow(s, 260, 70, 330, 70, K.ink, 3); B.cap(s, 400, 76, 'x 2', K.ink, 18); }, ['W2', 'Each', -0.2], ['W2', 'six'], ['W2', 'pyruvic', 0, 1]],
  ['STEP 2 · NET ATP', '3 × 2 = 6 ATP', 'TWO NET PER GLUCOSE', s => { hx3(s); for (let k = 0; k < 6; k++) B.atp(s, 130 + (k % 3) * 120, 160 + Math.floor(k / 3) * 70, 20); }, ['W3', 'Each', -0.2], ['W3', 'six'], ['W3', 'ATP', 0, 1]],
  ['STEP 3 · NADH', '3 × 2 = 6 NADH', 'SIX, SIX AND SIX', s => { hx3(s); for (let k = 0; k < 6; k++) B.nadh(s, 130 + (k % 3) * 120, 160 + Math.floor(k / 3) * 70, 20); }, ['W4', 'Each', -0.2], ['W4', 'six'], ['W4', 'Six', 0, 1]]]) }] });

EP.run({
  icons: ICN,
  jobs: [['bike', 'A bicycle climb', 'BREATHING HARD', ['H1', 'bicycle']], ['tree', 'A tall tree', 'NO LUNGS AT ALL', ['H1', 'tree']], ['jar', 'Soaked seeds', 'THEY WARM UP', ['H1', 'Soaked']]],
  scenes: S,
  stmt: { l2: 'One glucose gives <span class="acc">two pyruvic acid</span>.', f: '<span class="lad">glucose (6C) → 2 pyruvic acid (3C) · net <b>2 ATP</b> + 2 NADH</span>', t2: ['T1', 'glucose', -0.2], tf: ['T1', 'pyruvic'] },
  trap: { wrong: 'Glycolysis happens inside the mitochondria', right: 'Glycolysis happens in the cytoplasm', tWrong: ['X2', 'inside', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'cytoplasm', -0.2], tSvg: ['X3', 'Only', -0.3],
    build: s => { mk(s, 'rect', { x: 40, y: 30, width: 380, height: 200, rx: 40, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 3 }); K8.mito(s, 330, 130, 1.3, 10); hex(s, 140, 120, 22); arrow(s, 170, 120, 270, 125, K.ink, 3); cap(s, 140, 175, 'GLYCOLYSIS HERE', { 'font-size': 13 }); cap(s, 230, 262, 'PYRUVIC ACID MOVES IN', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: steps of glycolysis, its enzymes, the ATP count', at: ['E1', 'statement'] },
  mcq: { q: 'Which statement about glycolysis is correct?', opts: ['Two ATP are used and four are made per glucose', 'It occurs in the mitochondrial matrix', 'It needs oxygen at the PGAL step', 'Fructose bisphosphate splits into two pyruvic acid'], right: 0, cols: 1, optW: 820, optH: 72, optY: 196, optFs: 26 }, mcqAt: ['Q1', 'correct', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['A: 2 ATP used, 4 made', ['A1', 'Two']], ['B is wrong: it is the cytoplasm', ['A2', 'cytoplasm']], ['C is wrong: no oxygen needed', ['A3', 'oxygen']], ['D is wrong: two 3-carbon sugars', ['A3', 'three']]],
  recap: { title: 'Recap · respiration and glycolysis', lines: ['<b>Respiration</b>: breaking C-C bonds by oxidation · energy into ATP', '<b>Gas exchange</b>: stomata (leaves), lenticels (stems) · no lungs', '<b>Glycolysis (EMP)</b>: in the cytoplasm of all living organisms', '<b>Steps</b>: glucose → F-1,6-bisP → 2 PGAL → 2 pyruvic acid', '<b>Count</b>: 2 ATP used, 4 made · net 2 ATP + 2 NADH'] },
  yq: ['How do plants exchange gases without lungs?', 'Where in the cell does glycolysis happen?', 'What is the net gain of ATP from one glucose in glycolysis?'],
  next: { label: 'NEXT · EP 88', topic: 'Fermentation and the Krebs Cycle' }
});
})();
