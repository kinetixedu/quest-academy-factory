// PUC Biology Ep 84: The Calvin Cycle (Living diagram, leaf green). Runner: ep.js + ph11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, svgIn, attr } = EP;
const { K, P, circ, T, at, arrow, pill, mol, sun, leaf, chloro, meso, put } = H11;
const ICN = { phone: ['M8 3h8v18H8Z', 'M11 18h2', 'M12 7l-2 4h4l-2 4'], bowl: ['M4 11h16a8 8 0 0 1-16 0Z', 'M9 7c0-2 2-2 2-4', 'M14 7c0-2 2-2 2-4'], blocks: ['M4 14h7v7H4Z', 'M13 14h7v7h-7Z', 'M8 6h8v8H8Z'] };
const CO = '#4B5563';
const S = [];
// carbon beads in a row centred at x,y; cols: array of colours
const beads = (g, x, y, cols, r = 13, gap = 30) => { const G = mk(g, 'g', {}); const n = cols.length, x0 = x - (n - 1) * gap / 2; if (n > 1) P(G, `M${x0},${y} L${x0 + (n - 1) * gap},${y}`, 'none', K.ink, 3); cols.forEach((c, i) => circ(G, x0 + i * gap, y, r, c === 'g' ? K.sugL : '#C7CCD4', c === 'g' ? K.sug : CO, 3)); return G; };
const G5 = ['g', 'g', 'g', 'g', 'g'], G3 = ['g', 'g', 'g'];
const rubisco = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x - 70 * s},${y} C${x - 80 * s},${y - 60 * s} ${x - 30 * s},${y - 80 * s} ${x - 20 * s},${y - 50 * s} Q${x},${y - 30 * s} ${x + 20 * s},${y - 50 * s} C${x + 30 * s},${y - 80 * s} ${x + 80 * s},${y - 60 * s} ${x + 70 * s},${y} C${x + 70 * s},${y + 60 * s} ${x - 70 * s},${y + 60 * s} ${x - 70 * s},${y} Z`, K.rubL, K.rub, 3.5); return G; };

/* ---------- H: energy first, then build ---------- */
S.push(EP.hook({ label: 'DIYA · THE LEAF KITCHEN', face: 'diya', pill: ['Energy first, then build', ['H2', 'First', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Where are ATP and NADPH spent?', ['H3', 'spent']], ['How does CO₂ become sugar?', ['H3', 'sugar']]],
  a: [['ANSWER 1', 'In the stroma', ['H4', 'stroma']], ['ANSWER 2', 'The Calvin cycle', ['H4', 'Calvin']]],
  chips: [['RuBP', ['H5', 'RuBP']], ['RuBisCO', ['H5', 'RuBisCO']], ['Three stages', ['H5', 'three']], ['Cost of one glucose', ['H5', 'glucose']]],
  build: (el, s) => {
    sun(s, 110, 140, 36); leaf(s, 80, 300, 240, 70); const a = put(s, 200, 400, mol.ATP), n = put(s, 300, 400, mol.NADPH);
    mk(s, 'ellipse', { cx: 580, cy: 330, rx: 150, ry: 100, fill: K.str, stroke: K.chlD, 'stroke-width': 4 }); cap(s, 580, 460, 'THE STROMA KITCHEN', { fill: C.ink });
    const ar = arrow(s, 360, 380, 450, 340, K.ink, 4); const co = [0, 1, 2].map(() => put(s, 0, 0, mol.CO2)); const sg = put(s, 580, 330, g => pill(g, 'Sugar', K.sug, K.sugL));
    return { els: [[ar, ['H3', 'spent'], { dy: 0, fade: 0.3 }]], anim: t => { const a0 = tm(['H3', 'carbon']); co.forEach((g, k) => { const u = M.clamp(((t - a0) * 0.5 + k / 3) % 1); at(g.parentNode, 680 - 100 * u, 140 + 140 * u); g.style.opacity = t > a0 ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); sg.style.opacity = t > tm(['H4', 'sugar']) ? 1 : 0; } };
  } }));

/* ---------- B: Calvin's tracer ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'MELVIN CALVIN · RADIOACTIVE CARBON 14', pill: ['C3 plants: PGA first', ['B3', 'called', 0.3], 'ac'], build: (el, s) => {
  const fl = mk(s, 'g', {}); P(fl, 'M260,120 L260,220 L170,420 C160,450 180,470 210,470 L430,470 C460,470 480,450 470,420 L380,220 L380,120 Z', '#E4F1DC', K.ink, 4); for (let k = 0; k < 16; k++) circ(fl, 200 + (k * 53) % 240, 330 + (k * 37) % 120, 9, K.chlF, K.chlD, 2); 
  const c14 = [0, 1, 2].map(() => put(s, 0, 0, g => { mk(g, 'circle', { r: 30, fill: '#F6D77A', opacity: 0.35 }); pill(g, '¹⁴CO₂', K.co2); }));
  const ar = arrow(s, 540, 300, 760, 300, K.ink, 4); const pga = mk(s, 'g', {}); beads(pga, 1000, 300, G3, 20, 56); T(pga, 1000, 370, '3-PGA · three carbons', 26, K.sug); const ph = circ(s, 1140, 300, 18, '#FFFFFF', K.atp, 3);
  const tag = div(el, 'chp', { left: '880px', top: '150px' }, 'First stable product');
  return { els: [[fl, ['B2', 'algae', -0.2], { dy: 10 }], [ar, ['B2', 'tracked'], { dy: 0, fade: 0.3 }], [pga, ['B3', 'three'], POP], [tag, ['B3', 'first']]], labs: [[lab(s, 1140, 300, 1240, 220, 'Phosphate'), ['B3', 'phosphoglyceric']], [lab(s, 440, 420, 520, 470, 'Algae'), ['B2', 'algae']]],
    anim: t => { const a0 = tm(['B2', 'radioactive']); c14.forEach((g, k) => { const u = ((t - a0) * 0.4 + k / 3) % 1; at(g.parentNode, 320, 110 + 200 * u); g.style.opacity = t > a0 ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); ph.style.opacity = t > tm(['B3', 'phosphoglyceric']) ? 1 : 0; } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['LEAF', 'MESOPHYLL CELL', 'CHLOROPLAST', 'STROMA'], scales: ['x1', 'x400', 'x4,000', 'x2,000,000'], ghost: 'EXAMPLE FIGURES', nfs: 42,
  info: [['RUNG 1 OF 4', 'The leaf', 'Air comes in', 'with carbon dioxide.'], ['RUNG 2 OF 4', 'Mesophyll cell', 'Many chloroplasts', 'line its walls.'], ['RUNG 3 OF 4', 'Chloroplast', 'The cycle runs in', 'the stroma.'], ['RUNG 4 OF 4', 'RuBisCO', 'Joins CO₂ to', 'a five carbon sugar.']],
  av: { who: 'Diya', text: 'One enzyme catches the CO₂!', tin: ['Z4', 'sugar', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [560, 230, 50], build: g => { leaf(g, 170, 263, 720, 200); const c = put(g, 300, 120, mol.CO2); return { labs: [[lab(g, 420, 200, 300, 70, 'Leaf', 'end'), ['Z1', 'where']]] }; } },
    { at: 'Z2', focus: [540, 89, 40], build: g => { meso(g, 300, 70, 460, 380); return { labs: [[lab(g, 540, 89, 640, 170, 'Chloroplast'), ['Z2', 'chloroplasts']], [lab(g, 700, 420, 640, 490, 'Mesophyll cell'), ['Z2', 'mesophyll']]] }; } },
    { at: 'Z3', focus: [566, 400, 50], build: g => { const c = chloro(g, 528, 270, 380, 190, 5); return { labs: [[lab(g, 566, 400, 760, 480, 'Stroma'), ['Z3', 'stroma']], [lab(g, 292, 200, 200, 70, 'Granum', 'end'), ['Z3', 'grana']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: K.str }); rubisco(g, 528, 330, 2.2); const r = beads(g, 528, 120, G5, 18, 44), co = put(g, 0, 0, mol.CO2);
      return { labs: [[lab(g, 640, 400, 820, 460, 'RuBisCO'), ['Z4', 'RuBisCO']], [lab(g, 616, 120, 700, 190, 'Five carbon sugar'), ['Z4', 'five']]], anim: t => { const v = M.io((t - tm(['Z4', 'carbon']) ) / 1); at(co.parentNode, 900 - 300 * v, 240 - 30 * v); } }; } }] }));

/* ---------- L: the cycle ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
const CX = 392, CY = 300, R = 170;
const arcD = (a0, a1, r = R) => `M${CX + r * Math.cos(a0)},${CY + r * Math.sin(a0)} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${CX + r * Math.cos(a1)},${CY + r * Math.sin(a1)}`;
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE CALVIN CYCLE · STAGE BY STAGE', svg: false, build: el => ({ anim: EP.steps(el, [['Carboxylation', 'RuBisCO joins CO₂ to RuBP'], ['Six carbons split', 'into two 3-PGA molecules'], ['Reduction', '2 ATP + 2 NADPH per CO₂'], ['Regeneration', '1 ATP rebuilds RuBP'], ['Cost per CO₂', '3 ATP + 2 NADPH']], LT) }) },
  { pos: 'R', label: 'ONE TURN IN THE STROMA', build: (el, s) => {
    const A = [[-2.2, -0.35, K.rub, 'CARBOXYLATION'], [-0.15, 1.75, K.sug, 'REDUCTION'], [1.95, 3.9, C.ac, 'REGENERATION']].map(([a0, a1, c, n]) => ({ p: P(s, arcD(a0, a1), 'none', c, 14, { 'stroke-linecap': 'round', opacity: 0.4 }), a0, a1 }));
    cap(s, 600, 88, 'CARBOXYLATION', { fill: K.rub }); cap(s, 560, 520, 'REDUCTION', { fill: K.sug }); cap(s, 140, 160, 'REGENERATION', { fill: C.ac });
    const rub = beads(s, 290, 120, G5, 12, 26); T(s, 290, 98, 'RuBP', 18, K.sug); const co = put(s, 0, 0, mol.CO2);
    const six = beads(s, 470, 205, ['g', 'g', 'g', 'g', 'g', 'c'], 9, 20); const pg = [beads(s, 480, 250, G3, 11, 26), beads(s, 480, 290, G3, 11, 26)]; const pgT = T(s, 480, 330, '2 x 3-PGA', 18, K.sug);
    const at1 = put(s, 470, 470, mol.ATP), at2 = put(s, 470, 470, mol.ATP), n1 = put(s, 300, 470, mol.NADPH), n2 = put(s, 300, 470, mol.NADPH); const sg = put(s, 360, 380, g => pill(g, 'Sugar', K.sug, K.sugL));
    const at3 = put(s, 150, 300, mol.ATP); const cost = div(el, 'chp', { left: '36px', top: '506px', background: C.ac, color: '#fff' }, 'Per CO₂: 3 ATP + 2 NADPH');
    return { els: [[cost, ['L6', 'three']]], anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); const st = [0, 0, 1, 2, -1][Math.max(c, 0)];
      A.forEach((a, i) => { a.p.style.opacity = c < 0 ? 0.4 : (st === i || c === 4) ? 1 : 0.4; });
      rub.style.opacity = t > ts[0] && t < ts[1] + 0.3 ? 1 : t > ts[3] + 0.8 ? 1 : 0.25;
      const v = M.io((t - tm(['L2', 'Carbon']) - 0.3) / 1.2); at(co.parentNode, 720 - 330 * v, 140 - 20 * v); co.style.opacity = t > tm(['L2', 'Carbon']) && t < ts[1] ? 1 : 0;
      six.style.opacity = t > ts[1] && t < ts[1] + 2 ? 1 : 0; pg.forEach((g, k) => { g.style.opacity = t > ts[1] + 1.8 && t < ts[2] + 3 ? 1 : 0; }); pgT.style.opacity = pg[0].style.opacity;
      const r = M.io((t - ts[2] - 0.8) / 1.4); [at1, at2, n1, n2].forEach((g, k) => { at(g.parentNode, (k < 2 ? 470 : 300) + (k % 2) * 40, 470 - 60 * (k % 2) - 0 * r); g.style.opacity = t > ts[2] - 0.2 ? (1 - r).toFixed(2) : 0; });
      sg.style.opacity = t > ts[2] + 2 && t < ts[4] + 0.3 ? 1 : 0; const q = M.io((t - ts[3] - 0.4) / 1); at3.style.opacity = t > ts[3] ? (1 - q).toFixed(2) : 0; } }; } }] });

/* ---------- C: the hunt for the acceptor + RuBisCO ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE HUNT FOR THE ACCEPTOR', build: (el, s) => {
  const g2 = mk(s, 'g', {}); beads(g2, 300, 220, ['g', 'g'], 22, 60); T(g2, 300, 290, 'A two carbon acceptor?', 24, C.mute); const x = P(s, 'M220,170 L380,270 M380,170 L220,270', 'none', K.red, 6);
  const g5 = mk(s, 'g', {}); beads(g5, 760, 220, G5, 22, 60); T(g5, 760, 290, 'RuBP · five carbon ketose sugar', 24, K.sug);
  const r = mk(s, 'g', {}); rubisco(r, 1300, 230, 1.4); T(r, 1300, 240, 'RuBisCO', 26, K.rub, { 'font-weight': 700 });
  const c1 = div(el, 'chp', { left: '1040px', top: '360px' }, 'RuBP carboxylase oxygenase'), c2 = div(el, 'chp', { left: '1040px', top: '420px' }, 'Can also bind oxygen'), c3 = div(el, 'pillp ac', { left: '1040px', top: '490px' }, 'Most plentiful enzyme in the world');
  return { els: [[g2, ['C2', 'two'], POP], [x, ['C2', 'Then', -0.1], POP], [g5, ['C2', 'five'], POP], [r, ['C3', 'RuBisCO'], POP], [c1, ['C3', 'carboxylase', -0.1]], [c2, ['C3', 'bind', -0.2]], [c3, ['C3', 'plentiful', -0.2]]] }; } }] });

/* ---------- D: C3 vs C4 ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'C3 PLANTS', tin: ['D2', null, -0.2], pill: ['First product: PGA', ['D2', 'PGA', -0.1], 'ac'], build: (el, s) => { const b = mk(s, 'g', {}); beads(b, 392, 250, G3, 30, 80); T(b, 392, 340, 'three carbon acid', 26, K.sug); return { els: [[b, ['D2', 'three'], POP]] }; } },
  { pos: 'R', label: 'C4 PLANTS', tin: ['D3', null, -0.2], pill: ['First product: OAA', ['D3', 'oxaloacetic', -0.1], 'ac'], build: (el, s) => { const b = mk(s, 'g', {}); beads(b, 392, 250, ['g', 'g', 'g', 'g'], 30, 80); T(b, 392, 340, 'four carbon acid', 26, K.sug); const n = div(el, 'chp', { left: '36px', top: '400px' }, 'C4 plants also run the Calvin cycle'); return { els: [[b, ['D3', 'four'], POP], [n, ['D3', 'even', -0.1]]] }; } }] });

/* ---------- U: is it a dark reaction? + think ---------- */
const TH = { q: 'In C3 plants, what is the first stable product?', opts: ['PGA', 'OAA'], right: 0, why: 'PGA, a three carbon acid.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'NEEDS LIGHT? NOT DIRECTLY', tout: 'U4', build: (el, s) => { const sn = sun(s, 130, 240, 40); const ar = arrow(s, 200, 240, 290, 240, K.ink, 4); const a = put(s, 360, 210, mol.ATP), n = put(s, 360, 270, mol.NADPH); const ar2 = arrow(s, 430, 240, 520, 240, K.ink, 4);
    const cy = mk(s, 'g', {}); circ(cy, 620, 240, 70, 'none', C.ac, 10); T(cy, 620, 248, 'Calvin', 22, C.ac); return { els: [[sn, ['U2', 'light'], POP], [ar, ['U2', 'needs'], { dy: 0, fade: 0.3 }], [a, ['U2', 'ATP'], POP], [n, ['U2', 'NADPH'], POP], [ar2, ['U2', 'NADPH', 0.3], { dy: 0, fade: 0.3 }], [cy, ['U2', 'does'], POP]] }; } },
  { pos: 'R', label: 'SWITCH THE LIGHT OFF, THEN ON', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => { H11.axes(s, 90, 430, 620, 300, '', 'CYCLE RUNS');
    const bar = mk(s, 'g', {}); [[92, 260, '#F6E7A8'], [260, 470, '#3A3F55'], [470, 710, '#F6E7A8']].forEach(([a, b, c]) => mk(bar, 'rect', { x: a, y: 440, width: b - a, height: 14, fill: c })); cap(bar, 176, 482, 'LIGHT ON', { fill: C.ink }); cap(bar, 365, 482, 'LIGHT OFF', { fill: C.ink }); cap(bar, 590, 482, 'LIGHT ON', { fill: C.ink });
    const cv = P(s, 'M92,170 L260,170 C300,170 310,420 360,420 L470,420 C510,420 520,170 560,170 L710,170', 'none', C.ac, 5); return { els: [[bar, ['U3', 'goes', -0.2], { dy: 0, fade: 0.3 }], [cv, ['U3', 'short', -0.3], { dy: 0, fade: 0.5 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'PGA', -0.1], why: ['U5', 'PGA'] })] });

/* ---------- W: cost of one glucose ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · HOW MUCH DOES ONE GLUCOSE COST?', svg: false, build: el => {
  const col = (i, h, n, c, tH, tN, tC, draw) => { const e = div(el, 'colW', { left: 36 + i * 516 + 'px' }, `<div class="ch2">${h}</div><div class="dz"></div><div class="it"><div class="inm">${n}</div><div class="inc">${c}</div></div>`); const s = svgIn(e.querySelector('.dz'), 496, 290); draw(s);
    return [[e, ['W1', null, 0.3 + i * 0.06], { dy: 12 }], [s, tH, { ...POP, sc: 0.8 }], [e.querySelector('.it'), tN, { dy: -16, sp: M.SOFT, fade: 0.1 }], [e.querySelector('.inc'), tC, { dy: 6 }]]; };
  return { els: [
    ...col(0, 'STEP 1 · COUNT CARBONS', 'Glucose = 6 carbons', 'ONE CO₂ PER TURN · SIX TURNS', ['W2', 'Glucose', -0.2], ['W2', 'six'], ['W2', 'turns'], s => { beads(s, 248, 110, ['g', 'g', 'g', 'g', 'g', 'g'], 18, 44); T(s, 248, 200, 'x6 turns', 34, C.ac); }),
    ...col(1, 'STEP 2 · MULTIPLY', '18 ATP + 12 NADPH', '6 x 3 = 18 · 6 x 2 = 12', ['W3', 'Each', -0.2], ['W3', 'eighteen'], ['W3', 'twelve'], s => { T(s, 248, 110, '6 x 3 ATP = 18', 34, K.atp); T(s, 248, 190, '6 x 2 NADPH = 12', 34, K.nad); }),
    ...col(2, 'STEP 3 · IN AND OUT', 'Out: 1 glucose', '18 ADP · 12 NADP BACK', ['W4', 'In', -0.2], ['W4', 'Out'], ['W4', 'eighteen', 0, 1], s => { txt(s, 40, 80, 'IN', { 'font-weight': 700, 'font-size': 20, fill: C.ink }); txt(s, 40, 120, '6 CO₂ · 18 ATP · 12 NADPH', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: C.ink });
      txt(s, 40, 190, 'OUT', { 'font-weight': 700, 'font-size': 20, fill: C.ink }); txt(s, 40, 230, '1 glucose · 18 ADP · 12 NADP', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: K.sug }); })] }; } }] });

EP.run({
  icons: ICN,
  jobs: [['phone', 'A phone charges', 'RUNS ALL EVENING', ['H1', 'phone']], ['bowl', 'Flour and sugar', 'READY IN A KITCHEN', ['H1', 'Flour']], ['blocks', 'Building blocks', 'WAIT TO BECOME A HOUSE', ['H1', 'box']]],
  scenes: S,
  stmt: { l2: 'The acceptor is <span class="acc">RuBP</span>.', f: '<span class="lad">RuBP (5C) + CO₂ → <b>2 x 3-PGA</b> (3C each)</span>', t2: ['T1', 'acceptor', -0.2], tf: ['T1', 'RuBP'] },
  trap: { wrong: 'The Calvin cycle happens only in C3 plants', right: 'It runs in all photosynthetic plants, C3 or C4', tWrong: ['X2', 'Calvin', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'all', -0.2], tSvg: ['X3', 'C', -0.2],
    build: s => { [[130, 'C3 PLANT'], [330, 'C4 PLANT']].forEach(([x, n]) => { circ(s, x, 120, 54, 'none', C.ac, 8); T(s, x, 128, 'Calvin', 18, C.ac); cap(s, x, 210, n, { 'font-size': 14 }); }); } },
  where: { type: 'Number questions on ATP and NADPH, and statements on RuBP, RuBisCO and PGA', at: ['E1', 'number'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. RuBP is a five carbon sugar.<br>II. One glucose needs 12 ATP and 12 NADPH.<br>III. The Calvin cycle runs in both C3 and C4 plants.<br>IV. Regeneration of RuBP uses NADPH.</div>', opts: ['I and II only', 'I and III only', 'II and IV only', 'I, III and IV only'], right: 1 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['I: RuBP is a five carbon sugar', ['A2', 'RuBP']], ['III: it runs in all plants', ['A2', 'cycle']], ['II is wrong: 18 ATP, not 12', ['A3', 'eighteen']], ['IV is wrong: regeneration uses ATP', ['A3', 'regeneration']]],
  recap: { title: 'Recap · the Calvin cycle', lines: ['<b>Where</b>: the stroma · uses ATP and NADPH', '<b>Carboxylation</b>: RuBisCO joins CO₂ to RuBP (5C) → 2 x 3-PGA', '<b>Reduction</b>: 2 ATP + 2 NADPH per CO₂ · makes sugar', '<b>Regeneration</b>: 1 ATP per CO₂ rebuilds RuBP', '<b>One glucose</b>: 6 turns · 18 ATP · 12 NADPH'] },
  yq: ['What does RuBisCO do?', 'Name the three stages of the Calvin cycle.', 'How many ATP and NADPH make one glucose?'],
  next: { label: 'NEXT · EP 85', topic: 'The C4 Pathway and Photorespiration' }
});
})();
