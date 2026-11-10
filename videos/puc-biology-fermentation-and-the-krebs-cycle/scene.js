// PUC Biology Ep 88: Fermentation and the Krebs Cycle (Living diagram, leaf green). Runner: ep.js + bio9.js + cell8.js + bio11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, circ, T, at, arrow, hex } = B9;
const { K } = B11, B = B11, K8 = window.K8;
const ICN = { loaf: ['M4 11a8 5 0 0 1 16 0v8H4Z', 'M9 9l1 3', 'M14 9l-1 3'], bub: ['M8 16a3 3 0 1 0 .1 0', 'M15 9a2 2 0 1 0 .1 0', 'M11 5a1.5 1.5 0 1 0 .1 0'], run: ['M13 4a2 2 0 1 0 .1 0', 'M7 21l3-6 3 2v5', 'M10 15l1-5 4 2 3-1', 'M11 10l-4 1'] };
const S = [];
const pyr = (g, x, y, lbl, r = 14) => B.mol(g, x, y, 3, K.sugL, K.sug, lbl, r);
const two = (g, x, y, f, st, lbl, r = 14) => B.mol(g, x, y, 2, f, st, lbl, r);
const coa = (g, x, y) => B.tag(g, x, y, 'CoA', '#E6E8EE', '#4B5563', 16);

/* ---------- H: the batter rises ---------- */
S.push(EP.hook({ label: 'THE KITCHEN · THE NEXT MORNING', face: 'diya', pill: ['One molecule behind them all', ['H2', 'molecule', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Where do the bubbles come from?', ['H3', 'bubbles']], ['What if oxygen runs short?', ['H3', 'oxygen', -0.4]]],
  a: [['ANSWER 1', 'No oxygen: fermentation', ['H4', 'ferment']], ['ANSWER 2', 'With oxygen: the Krebs cycle', ['H4', 'Krebs']]],
  chips: [['Alcoholic fermentation', ['H5', 'alcoholic']], ['Lactic acid', ['H5', 'lactic']], ['Into the mitochondria', ['H5', 'mitochondria']], ['Krebs cycle', ['H5', 'Krebs']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 440, width: 784, height: 140, fill: '#9E7B55' });
    const bowl = mk(s, 'g', {}); const bt = mk(bowl, 'rect', { x: 150, y: 300, width: 260, height: 130, fill: '#F7F1E1' }); P(bowl, 'M130,250 L430,250 L400,440 L160,440 Z', 'none', K.ink, 4); cap(bowl, 280, 470, 'BATTER', { fill: K.ink });
    const bb = Array.from({ length: 12 }, () => circ(bowl, 0, 0, 5, '#FFFFFF', '#B8A57A', 1.5));
    const dough = mk(s, 'g', {}); const dg = mk(dough, 'ellipse', { cx: 600, cy: 410, rx: 100, ry: 40, fill: '#EBD3A3', stroke: '#9A7A2A', 'stroke-width': 3 }); cap(dough, 600, 470, 'DOUGH', { fill: K.ink });
    return { els: [[dough, ['H1', 'Bread', -0.2], { dy: 16 }], [bowl, ['H1', 'batter', -0.2], { dy: 16 }]],
      anim: t => { const a = tm(['H1', 'rises']), r = M.io((t - a) / 3); attr(bt, 'y', (360 - 70 * r).toFixed(1)); attr(bt, 'height', (70 + 70 * r).toFixed(1)); const d = M.io((t - tm(['H1', 'puffs'])) / 2.5); attr(dg, 'ry', (40 + 26 * d).toFixed(1)); attr(dg, 'cy', (410 - 22 * d).toFixed(1));
        bb.forEach((b, k) => { const top = 360 - 70 * r, u = ((t * 0.4) + k / 12) % 1; attr(b, 'cx', 180 + (k * 37) % 200); attr(b, 'cy', (425 - (425 - top) * u).toFixed(1)); b.style.opacity = t > a ? Math.min(1, 4 * (1 - u)).toFixed(2) : 0; }); } };
  } }));

/* ---------- B: two paths ---------- */
S.push({ id: 'B', from: 'B1', to: 'D1', cards: [{ pos: 'W', label: 'WHERE WE LEFT OFF · TWO PATHS', build: (el, s) => {
  const g = mk(s, 'g', {}); hex(g, 160, 290, 60); T(g, 160, 298, 'Glucose', 22, K.sug);
  const a1 = mk(s, 'g', {}); arrow(a1, 240, 290, 380, 290, K.ink, 4); B.cap(a1, 310, 270, 'GLYCOLYSIS', K.ink, 15);
  const py = mk(s, 'g', {}); pyr(py, 470, 250, null, 16); pyr(py, 470, 330, null, 16); B.cap(py, 470, 390, '2 PYRUVIC ACID', K.sug, 16); const nd = mk(s, 'g', {}); B.nadh(nd, 610, 250, 20); B.nadh(nd, 610, 330, 20);
  const up = mk(s, 'g', {}); P(up, 'M690,270 C780,270 800,150 900,150', 'none', K.red, 5); B.arrowHead(up, 900, 150, 0, K.red, 14);
  const dn = mk(s, 'g', {}); P(dn, 'M690,310 C780,310 800,430 900,430', 'none', C.ac, 5); B.arrowHead(dn, 900, 430, 0, C.ac, 14);
  const c1 = div(el, 'chp', { left: '930px', top: '118px', height: '64px', fontSize: '28px', background: '#FBE3E6', color: '#B23A4E' }, 'No oxygen · fermentation <span style="font:600 18px \'IBM Plex Mono\'">CYTOPLASM</span>');
  const c2 = div(el, 'chp', { left: '930px', top: '398px', height: '64px', fontSize: '28px', background: '#E3F1E7', color: '#1F6B3F' }, 'Oxygen · aerobic respiration <span style="font:600 18px \'IBM Plex Mono\'">MITOCHONDRIA</span>');
  return { els: [[g, ['B2', 'Glycolysis', -0.2], { ...POP, sc: 0.6 }], [a1, ['B2', 'split', -0.2], { dx: -10, dy: 0 }], [py, ['B2', 'two', -0.1], POP], [nd, ['B2', 'NADH', -0.1], POP], [up, ['B3', 'Without', -0.2], { dy: 0, fade: 0.3 }], [c1, ['B3', 'fermentation', -0.2], { dx: -16, dy: 0 }], [dn, ['B3', 'aerobic', -0.5], { dy: 0, fade: 0.3 }], [c2, ['B3', 'aerobic', -0.2], { dx: -16, dy: 0 }]] }; } }] });

/* ---------- D: two kinds of fermentation ---------- */
const nadBack = (s, x, y) => { const g = mk(s, 'g', {}); B.nadh(g, x, y, 24); arrow(g, x + 66, y, x + 160, y, K.ink, 4); B.nadh(g, x + 230, y, 24, 'NAD⁺'); return g; };
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'ALCOHOLIC FERMENTATION · YEAST', pill: ['CO₂ bubbles make the dough rise', ['D2', 'bubbles', -0.1], 'ac'], build: (el, s) => {
    const p = mk(s, 'g', {}); pyr(p, 130, 250, 'PYRUVIC ACID', 22); const ar = mk(s, 'g', {}); arrow(ar, 230, 250, 450, 250, K.ink, 5);
    const e1 = B.tag(s, 340, 150, 'pyruvic acid decarboxylase', K.pepL, K.pep, 18), e2 = B.tag(s, 340, 200, 'alcohol dehydrogenase', K.pepL, K.pep, 18);
    const co = B.co2(s, 560, 170, 34), et = mk(s, 'g', {}); two(et, 600, 290, '#F3F4F6', '#4B5563', 'ETHANOL', 24); const nb = nadBack(s, 200, 410);
    return { els: [[p, ['D2', 'pyruvic', -0.2], POP], [ar, ['D2', 'becomes', -0.2], { dx: -10, dy: 0 }], [co, ['D2', 'carbon', -0.1], POP], [et, ['D2', 'ethanol', -0.1], POP], [e1, ['D2', 'decarboxylase', -0.3], POP], [e2, ['D2', 'alcohol', 0, 1], POP], [nb, ['D3', 'NADH', -0.2], { dy: 10 }]],
      anim: t => { const a = tm(['D2', 'carbon']); at(co, 0, t > a ? -((t - a) * 14 % 40) : 0); } }; } },
  { pos: 'R', label: 'LACTIC ACID FERMENTATION', tin: ['D3', null, -0.2], pill: ['Some bacteria · muscles short of oxygen', ['D3', 'muscles', -0.1], 'ac'], build: (el, s) => {
    const p = mk(s, 'g', {}); pyr(p, 130, 250, 'PYRUVIC ACID', 22); const ar = mk(s, 'g', {}); arrow(ar, 230, 250, 450, 250, K.ink, 5); const e = B.tag(s, 340, 200, 'lactate dehydrogenase', K.pepL, K.pep, 18);
    const la = mk(s, 'g', {}); B.mol(la, 590, 250, 3, '#F6D3D9', K.red, 'LACTIC ACID', 22); const nb = nadBack(s, 200, 410);
    const bac = mk(s, 'g', {}); mk(bac, 'rect', { x: 600, y: 90, width: 110, height: 40, rx: 20, fill: '#DCEFEB', stroke: '#0F8F8F', 'stroke-width': 3 }); B.cap(bac, 655, 150, 'BACTERIA', '#0F8F8F', 13);
    return { els: [[p, ['D3', 'bacteria', -0.3], POP], [bac, ['D3', 'bacteria', -0.1], POP], [ar, ['D3', 'lactic', -0.3], { dx: -10, dy: 0 }], [la, ['D3', 'lactic', -0.1], POP], [e, ['D3', 'lactate', -0.2], POP], [nb, ['D3', 'NADH', -0.1], { dy: 10 }]] }; } }] });

/* ---------- U: a poor deal ---------- */
S.push({ id: 'U', from: 'U1', to: 'Z1', cards: [{ pos: 'W', label: 'FERMENTATION · A POOR DEAL', build: (el, s) => {
  const big = div(el, '', { position: 'absolute', left: '80px', top: '110px', font: "600 110px/1 'IBM Plex Mono'", color: K.red, whiteSpace: 'nowrap' }, '&lt; 7%'), bl = div(el, 'pillp', { left: '80px', top: '250px' }, 'of the energy in glucose is released');
  mk(s, 'rect', { x: 80, y: 360, width: 700, height: 54, rx: 27, fill: '#F3F4F6', stroke: '#CBD0DA', 'stroke-width': 2 }); const fl = mk(s, 'rect', { x: 80, y: 360, width: 0, height: 54, rx: 27, fill: K.atp }); B.cap(s, 430, 450, 'ALL THE ENERGY IN ONE GLUCOSE', K.ink, 15);
  const jar = mk(s, 'g', {}); mk(jar, 'rect', { x: 1060, y: 120, width: 200, height: 330, rx: 24, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 4 }); const lq = mk(jar, 'rect', { x: 1064, y: 446, width: 192, height: 0, rx: 20, fill: '#F3E2B3' });
  const mark = mk(jar, 'g', {}); P(mark, 'M1040,250 L1280,250', 'none', K.red, 3, { 'stroke-dasharray': '8 6' }); B.cap(mark, 1290, 256, 'ABOUT 13% ALCOHOL', K.red, 16, 'start'); const ys = [0, 1, 2, 3, 4].map(k => circ(jar, 1100 + k * 30, 400 - (k % 2) * 30, 9, '#E8C46A', '#9A7A2A', 2));
  const h = div(el, 'chp', { left: '900px', top: '470px', background: '#FBE3E6', color: '#B23A4E' }, 'Acid or alcohol: harmful products');
  return { els: [[big, ['U2', 'seven', -0.2], { dy: 12 }], [bl, ['U2', 'energy', -0.1]], [jar, ['U3', 'Yeasts', -0.3], { dy: 16 }], [mark, ['U3', 'thirteen', -0.2], { dy: 0, fade: 0.3 }], [h, ['U3', 'harmful', -0.2]]],
    anim: t => { attr(fl, 'width', (700 * 0.07 * M.io((t - tm(['U2', 'seven'])) / 1)).toFixed(1)); const v = M.io((t - tm(['U3', 'Yeasts'])) / 2.5); attr(lq, 'y', (446 - 196 * v).toFixed(1)); attr(lq, 'height', (196 * v).toFixed(1)); ys.forEach((c, k) => c.style.opacity = (1 - 0.7 * M.io((t - tm(['U3', 'poison'])) / 1)).toFixed(2)); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
const plantCell = g => { mk(g, 'rect', { x: 140, y: 60, width: 776, height: 410, rx: 36, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 4 }); mk(g, 'rect', { x: 158, y: 78, width: 740, height: 374, rx: 28, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 2.5 });
  mk(g, 'ellipse', { cx: 470, cy: 270, rx: 170, ry: 110, fill: '#D6E9F5', stroke: '#5AA0C8', 'stroke-width': 3 }); K8.nuc(g, 260, 180, 48); [[250, 380, 20], [800, 380, -10]].forEach(([x, y, r]) => K8.chloro(g, x, y, 1.4, r)); [[720, 160, 15], [780, 280, -30], [280, 300, 40]].forEach(([x, y, r]) => K8.mito(g, x, y, 1.5, r)); };
S.push(EP.zoom({ to: 'L1', names: ['CELL', 'MITOCHONDRION', 'MATRIX'], scales: ['x1,000', 'x20,000', 'x100,000'], ghost: 'EXAMPLE FIGURES', nfs: 44,
  info: [['RUNG 1 OF 3', 'The cell', 'Pyruvic acid moves', 'into a mitochondrion.'], ['RUNG 2 OF 3', 'Mitochondrion', 'Two membranes.', 'The fluid inside: the matrix.'], ['RUNG 3 OF 3', 'In the matrix', 'Pyruvic acid → acetyl CoA.', 'One CO₂ and one NADH.']],
  av: { who: 'Diya', text: 'Three carbons in, two go on!', tin: ['Z4', 'NADH', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [720, 160, 60], build: g => { plantCell(g); const pO = mk(g, 'g', {}), p = mk(pO, 'g', {}); pyr(p, 0, 0, null, 9);
      return { labs: [[lab(g, 735, 150, 700, 40, 'Mitochondrion', 'end'), ['Z2', 'mitochondrion']], [lab(g, 420, 120, 360, 40, 'Cytoplasm', 'end'), ['Z2', 'cytoplasm']]], anim: t => { const v = M.io((t - tm(['Z2', 'moves'])) / 1.5); at(p, 520 + 190 * v, 130 + 30 * v); pO.style.opacity = t > tm('Z2') ? 1 - M.clamp((t - tm(['Z2', 'moves']) - 1.5) / 0.4) : 0; } }; } },
    { at: 'Z3', focus: [528, 263, 70], build: g => { B.mito(g, 528, 263, 420, 200);
      return { labs: [[lab(g, 250, 112, 330, 40, 'Outer membrane', 'end'), ['Z3', 'mitochondrion']], [lab(g, 420, 440, 300, 490, 'Inner membrane', 'end'), ['Z3', 'fluid']], [lab(g, 528, 263, 760, 480, 'Matrix'), ['Z3', 'matrix']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: K.mat }); const p = mk(g, 'g', {}); pyr(p, 170, 260, 'PYRUVIC ACID', 22); const c = mk(g, 'g', {}); T(c, 290, 268, '+', 36, K.ink); coa(c, 350, 260);
      const ar = mk(g, 'g', {}); arrow(ar, 410, 260, 560, 260, K.ink, 4); B.tag(ar, 485, 200, 'pyruvate dehydrogenase', K.pepL, K.pep, 15);
      const ac = mk(g, 'g', {}); two(ac, 650, 260, K.sugL, K.sug, 'ACETYL CoA', 22); coa(ac, 735, 260); const co = B.co2(g, 620, 120, 28), nd = B.nadh(g, 680, 400, 22);
      return { els: [[p, ['Z4', 'Pyruvic', -0.2], POP], [c, ['Z4', 'coenzyme', -0.2], POP], [ar, ['Z4', 'enzyme', -0.2], { dx: -10, dy: 0 }], [co, ['Z4', 'carbon', -0.1], POP], [ac, ['Z4', 'acetyl', -0.1], POP], [nd, ['Z4', 'NADH', -0.1], POP]] }; } }] }));

/* ---------- L: the Krebs cycle ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE KREBS CYCLE · IN THE MATRIX', svg: false, build: el => ({ anim: EP.steps(el, [['Acetyl CoA + OAA → citric acid', '2C + 4C = 6C · citrate synthase'], ['Citric acid → isocitrate', 'rearranged'], ['Two CO₂ leave', 'α-ketoglutaric acid → succinyl CoA'], ['Succinyl CoA → succinic acid', 'GTP made → ATP'], ['Back to OAA', '3 NADH + 1 FADH₂ on the way']], LT) }) },
  { pos: 'R', label: 'ONE TURN OF THE WHEEL', build: (el, s) => {
    const cx = 392, cy = 280, r = 130; const ring = B.ring(s, cx, cy, r, '#CBD0DA', 6);
    const N = [['Citric acid', '6C', 0], ['Isocitrate', '6C', 60], ['α-Ketoglutaric acid', '5C', 120], ['Succinyl CoA', '4C', 180], ['Succinic acid', '4C', 240], ['OAA', '4C', 300]].map(([n, c, a]) => { const rd = a * Math.PI / 180, x = cx + r * Math.sin(rd), y = cy - r * Math.cos(rd);
      const g = mk(s, 'g', {}); const o = circ(g, x, y, 24, '#FFFFFF', K.ink, 3); const tc = T(g, x, y + 7, c, 18, K.ink, { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); const lx = cx + (r + 44) * Math.sin(rd), ly = cy - (r + 44) * Math.cos(rd) + 6;
      T(g, lx, ly + (a === 0 ? -6 : a === 180 ? 10 : 0), n, 18, K.ink, { 'text-anchor': a === 0 || a === 180 ? 'middle' : a < 180 ? 'start' : 'end' }); return { o, tc, x, y }; });
    const ac = mk(s, 'g', {}); two(ac, 150, 90, K.sugL, K.sug, null, 12); B.cap(ac, 150, 128, 'ACETYL CoA', K.sug, 13); P(ac, 'M180,105 C230,120 280,120 330,145', 'none', K.sug, 3); B.arrowHead(ac, 330, 145, 0.5, K.sug, 10);
    const cos = [0, 1].map(() => B.co2(s, 0, 0, 20)), gtp = mk(s, 'g', {}); B.tag(gtp, 100, 470, 'GTP', '#E6E8EE', '#4B5563', 16); arrow(gtp, 130, 470, 168, 470, K.ink, 3); B.atp(gtp, 208, 470, 16);
    const dot = circ(s, 0, 0, 9, C.ac, K.ink, 2);
    const ct = div(el, '', { position: 'absolute', left: '36px', top: '512px', width: '712px', display: 'flex', justifyContent: 'center', gap: '30px', font: "600 20px 'IBM Plex Mono'", color: C.mute, whiteSpace: 'nowrap' }); ct.innerHTML = '<span>CO₂ <b>0</b></span><span>NADH <b>0</b></span><span>FADH₂ <b>0</b></span><span>ATP <b>0</b></span>'; const cb = [...ct.querySelectorAll('b')];
    return { els: [[ac, ['L2', 'Acetyl', -0.2], { dy: 0, fade: 0.3 }], [gtp, ['L5', 'GTP', -0.2], POP]], anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      const k1 = tm(['L4', 'First']), k2 = tm(['L4', 'succinyl']), back = tm(['L6', 'back']); let node = 5; if (t > tm(['L2', 'citric']) - 0.2) node = 0; if (t > ts[1]) node = 1; if (t > k1) node = 2; if (t > k2) node = 3; if (t > tm(['L5', 'succinic'])) node = 4; if (t > back) node = 5; if (t > tm('T1')) node = 5;
      N.forEach((n, i) => { const on = i === node; attr(n.o, 'fill', on ? C.ac : '#FFFFFF'); attr(n.tc, 'fill', on ? '#FFFFFF' : K.ink); });
      at(dot, N[node].x, N[node].y - 34); dot.style.opacity = t > tm('L1') + 0.3 ? 1 : 0;
      [[k1, 2], [k2, 3]].forEach(([tt, ni], j) => { const v = M.clamp((t - tt) / 1.6), n = N[ni]; at(cos[j], n.x + 70 * v, n.y + 40 + 30 * v); cos[j].style.opacity = t > tt && v < 1 ? (1 - v * 0.6).toFixed(2) : 0; });
      cb[0].textContent = t > k2 ? 2 : t > k1 ? 1 : 0; cb[1].textContent = t > tm(['L6', 'NADH']) ? 3 : 0; cb[2].textContent = t > tm(['L6', 'FADH']) ? 1 : 0; cb[3].textContent = t > tm(['L5', 'ATP']) ? 1 : 0; } }; } }] });

/* ---------- C: the balance for one pyruvic acid ---------- */
S.push({ id: 'C', from: 'C1', to: 'V1', cards: [{ pos: 'W', label: 'HANS KREBS · THE TCA CYCLE', svg: false, build: el => {
  const n = div(el, 'chp', { left: '36px', top: '86px', height: '60px', fontSize: '26px' }, 'TCA = <b style="color:var(--ac)">tricarboxylic acid</b> cycle');
  const eq = div(el, '', { position: 'absolute', left: '0', top: '190px', width: '1600px', textAlign: 'center', font: "600 25px 'IBM Plex Mono'", color: C.ink, whiteSpace: 'nowrap' }, 'Pyruvic acid + 4NAD⁺ + FAD⁺ + 2H₂O + ADP + Pi → <b style="color:var(--ac)">3CO₂ + 4NADH + 4H⁺ + FADH₂ + ATP</b>');
  const tile = (x, big, col, s) => div(el, '', { position: 'absolute', left: x + 'px', top: '270px', width: '350px', height: '200px', borderRadius: '16px', background: 'var(--soft)' }, `<div style="position:absolute;left:28px;top:30px;font:600 88px/1 'IBM Plex Mono';color:${col}">${big}</div><div style="position:absolute;left:28px;top:140px;font:600 22px 'IBM Plex Mono';letter-spacing:.06em;color:${col}">${s}</div>`);
  const t = [tile(48, '3', K.co2, 'CO₂'), tile(438, '4', K.nadh, 'NADH'), tile(828, '1', K.fad, 'FADH₂'), tile(1218, '1', K.atp, 'ATP')];
  return { els: [[n, ['C1', 'tricarboxylic', -0.3], { dx: -16, dy: 0 }], [eq, ['C2', 'add', -0.1], { dy: 10 }], [t[0], ['C3', 'Three', -0.1], { dy: 16 }], [t[1], ['C3', 'four', -0.1], { dy: 16 }], [t[2], ['C3', 'FADH', -0.1], { dy: 16 }], [t[3], ['C3', 'ATP', -0.1], { dy: 16 }]] }; } }] });

/* ---------- V: side by side + think ---------- */
const TH = { q: 'Your legs burn after a sprint. Is it alcohol or lactic acid in your muscles?', opts: ['Alcohol', 'Lactic acid'], right: 1, why: 'Lactic acid. Muscles short of oxygen turn pyruvic acid into lactic acid.' };
S.push({ id: 'V', from: 'V1', to: 'W1', cards: [
  { pos: 'W', label: 'FERMENTATION AND AEROBIC RESPIRATION · SIDE BY SIDE', svg: false, tout: 'V4', build: el => {
    const H = [div(el, 'chp', { left: '440px', top: '76px', width: '540px', justifyContent: 'center', background: '#B23A4E', color: '#fff' }, 'FERMENTATION'), div(el, 'chp', { left: '1010px', top: '76px', width: '554px', justifyContent: 'center', background: C.ac, color: '#fff' }, 'AEROBIC RESPIRATION')];
    const R = [['Where', 'cytoplasm', 'ends in mitochondria'], ['Oxygen', 'not needed', 'needed'], ['Pyruvic acid becomes', 'ethanol or lactic acid', 'CO₂ + H₂O'], ['Energy released', 'very little', 'much more']];
    const out = { els: [[H[0], ['V2', 'Fermentation', -0.2]], [H[1], ['V3', 'Aerobic', -0.2]]] }; const w1 = [['V2', 'cytoplasm'], ['V2', 'without'], ['V2', 'ethanol'], ['V2', 'little']], w2 = [['V3', 'mitochondria'], ['V3', 'oxygen'], ['V3', 'water'], ['V3', 'Much']];
    R.forEach(([k, a, b], i) => { const y = 146 + i * 100; const kk = div(el, 'chp', { left: '36px', top: y + 'px', width: '380px', height: '80px', background: 'transparent', font: "600 18px 'IBM Plex Mono'", letterSpacing: '.08em', color: C.mute }, k.toUpperCase());
      const ca = div(el, 'chp', { left: '440px', top: y + 'px', width: '540px', height: '80px', justifyContent: 'center', fontSize: '28px', background: '#FBE3E6', color: '#B23A4E' }, a), cb = div(el, 'chp', { left: '1010px', top: y + 'px', width: '554px', height: '80px', justifyContent: 'center', fontSize: '28px', background: '#E3F1E7', color: '#1F6B3F' }, b);
      out.els.push([kk, [w1[i][0], w1[i][1], -0.3]], [ca, w1[i]], [cb, w2[i]]); });
    return out; } },
  EP.think(TH, { tin: 'V4', opts: ['V4', 'alcohol', -0.1], why: ['V5', 'Muscles'] })] });

/* ---------- W: one glucose in the matrix ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · TWO PYRUVIC ACID IN THE MATRIX', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · CARBON DIOXIDE', '3 × 2 = 6 CO₂', 'THREE FROM EACH', s => { for (let k = 0; k < 6; k++) B.co2(s, 110 + (k % 3) * 138, 90 + Math.floor(k / 3) * 110, 30); }, ['W2', 'Carbon', -0.2], ['W2', 'six'], ['W2', 'Three']],
  ['STEP 2 · NADH AND FADH₂', '8 NADH · 2 FADH₂', 'FOUR AND ONE FROM EACH', s => { for (let k = 0; k < 8; k++) B.nadh(s, 90 + (k % 4) * 105, 70 + Math.floor(k / 4) * 60, 18); B.fad(s, 170, 220, 18); B.fad(s, 320, 220, 18); }, ['W3', 'NADH', -0.2], ['W3', 'eight'], ['W3', 'FADH', 0, 1]],
  ['STEP 3 · ATP', '1 × 2 = 2 ATP', '6 CO₂ · 8 NADH · 2 FADH₂ · 2 ATP', s => { B.atp(s, 180, 140, 30); B.atp(s, 316, 140, 30); }, ['W4', 'ATP', -0.2], ['W4', 'two'], ['W4', 'Six']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['loaf', 'Bread dough', 'PUFFS UP', ['H1', 'Bread']], ['bub', 'Batter overnight', 'FULL OF BUBBLES', ['H1', 'batter']], ['run', 'A hard sprint', 'LEGS ACHE', ['H1', 'sprint']]],
  scenes: S,
  stmt: { l2: '<span class="acc">OAA</span> is made again, every turn.', f: '<span class="lad">acetyl CoA (2C) + OAA (4C) → citric acid (6C) → ... → <b>OAA</b></span>', t2: ['T1', 'OAA', -0.2], tf: ['T1', 'cycle'] },
  trap: { wrong: 'OAA is used up in the Krebs cycle', right: 'OAA is made again at the end of every turn', tWrong: ['X2', 'OAA', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'made', -0.2], tSvg: ['X3', 'cycle', -0.6],
    build: s => { B.ring(s, 230, 135, 80, '#CBD0DA', 5); circ(s, 230 - 80 * Math.sin(1.05), 135 - 80 * Math.cos(1.05), 22, C.ac, K.ink, 3); T(s, 230 - 80 * Math.sin(1.05), 141, 'OAA', 14, '#FFFFFF', { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); circ(s, 230, 55, 18, '#FFFFFF', K.ink, 3); B.cap(s, 230, 248, 'BACK TO OAA EVERY TURN', K.ink, 14); } },
  where: { type: 'Match questions: enzymes of fermentation and the Krebs cycle, products of one turn', at: ['E1', 'match'] },
  mcq: { q: 'Match each enzyme with its job.<div style="display:flex;gap:36px;font:500 21px Poppins;line-height:1.5;margin-top:10px"><div>a. Pyruvic acid decarboxylase<br>b. Lactate dehydrogenase<br>c. Citrate synthase<br>d. Pyruvate dehydrogenase</div><div>i. Forms acetyl CoA<br>ii. Yeast fermentation<br>iii. Lactic acid in muscles<br>iv. Forms citric acid</div></div>', opts: ['a-iii, b-ii, c-iv, d-i', 'a-ii, b-iii, c-iv, d-i', 'a-ii, b-iii, c-i, d-iv', 'a-iv, b-iii, c-ii, d-i'], right: 1 }, mcqAt: ['Q1', 'job', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['a-ii: yeast fermentation', ['A1', 'yeast']], ['b-iii: lactic acid in muscles', ['A1', 'Lactate']], ['c-iv: forms citric acid', ['A2', 'citric']], ['d-i: forms acetyl CoA', ['A3', 'acetyl']]],
  recap: { title: 'Recap · fermentation and Krebs', lines: ['<b>Fermentation</b>: no O₂ · yeast: ethanol + CO₂ · muscles: lactic acid', '<b>Poor deal</b>: under 7% of the energy · yeast dies near 13% alcohol', '<b>Link step</b>: pyruvic acid → acetyl CoA + CO₂ + NADH', '<b>Krebs cycle</b>: acetyl CoA + OAA → citric acid → ... → OAA', '<b>Per pyruvic acid</b>: 3 CO₂ · 4 NADH · 1 FADH₂ · 1 ATP'] },
  yq: ['What does yeast make from pyruvic acid?', 'Which molecule joins acetyl CoA to start the Krebs cycle?', 'How many NADH come from one pyruvic acid in the matrix?'],
  next: { label: 'NEXT · EP 89', topic: 'Electron Transport System and Oxidative Phosphorylation' }
});
})();
