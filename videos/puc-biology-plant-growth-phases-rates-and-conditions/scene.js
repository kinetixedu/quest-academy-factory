// PUC Biology Ep 91: Plant Growth - Phases, Rates and Conditions (Living diagram, leaf green). Runner: ep.js + bio9.js + pg13.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, axes, arrow } = B9;
const G = PG.K;
const ICN = { root: ['M12 3v12', 'M12 15c0 3-1 5-3 6', 'M12 11l-4 3', 'M12 13l4 2'], melon: ['M4 12a8 8 0 0 0 16 0Z', 'M7 13.5a5 5 0 0 0 10 0', 'M10 15h.01', 'M14 15h.01'], tree: ['M12 21v-7', 'M12 14a6 6 0 1 0 0-11 6 6 0 0 0 0 11Z', 'M9 21h6'] };
const S = [];

/* ---------- H: Aarav measures a seedling ---------- */
S.push(EP.hook({ label: "AARAV'S BEAN SEEDLING · ONE RULER", face: 'aarav', pill: ['Measure it every day', ['H3', 'ruler', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['How do we measure growth?', ['H3', 'how']], ['Same amount every day?', ['H3', 'same']]],
  a: [['ANSWER 1', 'Length, area, weight or cell number', ['H4', 'length']], ['ANSWER 2', 'Steady, or keeps doubling', ['H4', 'steady']]],
  chips: [['Phases', ['H5', 'phases']], ['Arithmetic vs geometric', ['H5', 'arithmetic']], ['Growth rates', ['H5', 'rates']], ['What growth needs', ['H5', 'needs']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 420, width: 784, height: 160, fill: '#9E7B55' });
    PG.pot(s, 300, 330, 150); const sd = PG.seed(s, 300, 312);
    const ru = mk(s, 'g', {}); mk(ru, 'rect', { x: 440, y: 92, width: 54, height: 330, rx: 6, fill: '#F3E2B3', stroke: K.ink, 'stroke-width': 3 }); for (let k = 0; k <= 15; k++) P(ru, `M440,${(410 - k * 20)} l${k % 5 ? 14 : 26},0`, 'none', K.ink, 2); [0, 5, 10, 15].forEach(k => txt(ru, 474, 416 - k * 20, String(k), { 'font-size': 14, fill: K.ink }));
    const mark = P(s, '', 'none', C.ac, 3, { 'stroke-dasharray': '6 5' }); const day = T(s, 620, 200, '', 30, C.ac, { 'font-family': 'IBM Plex Mono' }); const cm = T(s, 620, 250, '', 26, K.ink, { 'font-family': 'IBM Plex Mono' });
    return { els: [[ru, ['H3', 'ruler', -0.2], { dy: 10 }]], anim: t => { const a = tm(['H3', 'measured']), d = M.clamp((t - a) / 6), n = Math.min(5, 1 + Math.floor(d * 5)), h = 60 + 18 * (t > a ? n : 1);
      const tip = PG.setSeed(sd, h, 0); attr(mark, 'd', `M318,${tip[1].toFixed(1)} L440,${tip[1].toFixed(1)}`); mark.style.opacity = t > a ? 1 : 0; day.textContent = t > a ? 'DAY ' + n : ''; cm.textContent = t > a ? ((h - 42) / 20).toFixed(1) + ' cm' : ''; } };
  } }));

/* ---------- B: what is growth ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS GROWTH?', build: (el, s) => {
  const bl = mk(s, 'g', {}); const bb = mk(bl, 'ellipse', { cx: 200, cy: 250, rx: 60, ry: 76, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 3.5 }); P(bl, 'M200,326 L192,342 L208,342 Z', '#F2B57E', '#B35F22', 3); P(bl, 'M200,342 C190,380 214,400 200,440', 'none', K.ink, 2.5);
  const bx = mk(s, 'g', {}); PG.cross(bx, 200, 470, 16); cap(bx, 200, 520, 'REVERSIBLE · NOT GROWTH', { fill: K.red });
  const pl = mk(s, 'g', {}); PG.pot(pl, 520, 360, 120); const sd = PG.seed(pl, 520, 344); const pt = mk(s, 'g', {}); PG.tick(pt, 520, 470, 16); cap(pt, 520, 520, 'PERMANENT · GROWTH', { fill: C.ac });
  const mer = mk(s, 'g', {}); const m1 = circ(mer, 520, 0, 12, 'none', C.ac, 4); cap(mer, 640, 0, 'MERISTEM', { fill: C.ac });
  const ms = [['Fresh weight', 'B4', 'fresh'], ['Dry weight', 'B4', 'dry'], ['Length', 'B4', 'length'], ['Area', 'B4', 'area'], ['Volume', 'B4', 'volume'], ['Cell number', 'B4', 'cell']].map(([n, id, w], i) => [div(el, 'chp', { left: 860 + (i % 3) * 236 + 'px', top: 120 + Math.floor(i / 3) * 64 + 'px', width: '216px', justifyContent: 'center' }, n), [id, w, -0.1]]);
  const hd = div(el, 'tb', { left: '860px', top: '84px' }, 'GROWTH CAN BE MEASURED AS'); const ex = [['Pollen tube', 'its length', ['B4', 'pollen']], ['Leaf', 'its surface area', ['B4', 'leaf']]].map(([a, b, sp], i) => [div(el, 'rw', { left: '860px', width: '692px', top: 290 + i * 100 + 'px' }, `<div class="rn">${a}</div><div class="rd">measured by ${b}</div>`), sp]);
  return { els: [[bl, ['B2', 'balloon', -0.2], { ...POP, sc: 0.6 }], [bx, ['B2', 'flat']], [pl, ['B2', 'permanent', -0.2], { dy: 12 }], [pt, ['B2', 'reversed']], [mer, ['B3', 'meristems', -0.1], { ...POP, sc: 0.5 }], [hd, ['B4', 'Growth', -0.1], { dy: 8 }], ...ms.map(([e, sp]) => [e, sp, { dy: 8 }]), ...ex.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const a = tm(['B2', 'balloon']), u = (t - a) % 3, inf = t < a ? 0.4 : u < 1.5 ? M.io(u / 1.5) : 1 - M.io((u - 1.5) / 1.5); attr(bb, 'rx', (30 + 30 * inf).toFixed(1)); attr(bb, 'ry', (38 + 38 * inf).toFixed(1)); attr(bb, 'cy', (326 - 38 - 38 * inf).toFixed(1));
      const b = tm(['B2', 'permanent']), tip = PG.setSeed(sd, 40 + 110 * M.io((t - b) / 4), 0); attr(m1, 'cy', tip[1].toFixed(1)); mer.querySelector('text').setAttribute('y', (tip[1] + 6).toFixed(1)); attr(m1, 'r', (12 + 3 * Math.sin(t * 5)).toFixed(1)); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['ROOT', 'ROOT TIP', 'CELLS'], scales: ['x1', 'x40', 'x400'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The root', 'It lengthens near its tip.', 'A root cap guards the tip.'], ['RUNG 2 OF 3', 'Three zones', 'Meristematic, elongation, maturation.', 'One behind the other.'], ['RUNG 3 OF 3', 'The cells', 'Divide, then stretch, then mature.', 'Walls thicken last.']],
  av: { who: 'Aarav', text: 'So growth happens at the tip!', tin: ['Z4', 'Maturing', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 456, 50], build: g => { mk(g, 'rect', { x: 0, y: 150, width: 1056, height: 376, fill: G.soilL }); const sd = PG.seed(g, 528, 150); PG.setSeed(sd, 100, 0, 44);
      const rt = P(g, 'M528,150 C526,250 532,360 528,470', 'none', G.rootS, 9); [[528, 220, -80], [529, 270, 70], [530, 330, -60], [529, 380, 50]].forEach(([x, y, d]) => P(g, `M${x},${y} q${d * 0.5},10 ${d},40`, 'none', G.rootS, 4));
      return { labs: [[lab(g, 532, 300, 700, 300, 'Root'), ['Z2', 'root']], [lab(g, 528, 466, 700, 470, 'Root tip'), ['Z2', 'tip']]], anim: t => PG.part(rt, 0.6 + 0.4 * M.io((t - tm('Z1')) / 2)) }; } },
    { at: 'Z3', focus: [400, 300, 70], build: g => { const body = P(g, 'M330,10 L470,10 L470,420 C470,470 440,490 400,500 C360,490 330,470 330,420 Z', G.root, G.rootS, 4);
      P(g, 'M326,430 C330,490 370,516 400,520 C430,516 470,490 474,430', '#F3E2B3', G.rootS, 3); for (let y = 30; y < 160; y += 26) { P(g, `M330,${y} l-60,-14`, 'none', G.rootS, 2); P(g, `M470,${y + 12} l60,-14`, 'none', G.rootS, 2); }
      const zs = [[10, 170, '#EAF3E2'], [170, 310, '#FFF6E0'], [310, 430, '#E8F4EC']]; zs.forEach(([a, b, f]) => mk(g, 'rect', { x: 336, y: a, width: 128, height: b - a, fill: f, opacity: 0.9 }));
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) PG.cell(g, 340 + c * 30, 318 + r * 27, 28, 25, { nr: 0.34, sw: 1.5 }); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) PG.cell(g, 340 + c * 30, 176 + r * 44, 28, 42, { vac: 0.55, nr: 0.2, sw: 1.5 });
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) PG.cell(g, 340 + c * 30, 16 + r * 50, 28, 48, { vac: 0.6, nr: 0.2, sw: 3 });
      return { labs: [[lab(g, 464, 90, 600, 90, 'Zone of maturation'), ['Z3', 'maturation']], [lab(g, 464, 240, 600, 240, 'Zone of elongation'), ['Z3', 'elongation']], [lab(g, 464, 370, 600, 370, 'Meristematic zone'), ['Z3', 'meristematic']], [lab(g, 400, 500, 600, 480, 'Root cap'), ['Z3', 'cap']]] }; } },
    { at: 'Z4', build: g => { const xs = [[70, 'MERISTEMATIC', 'Z4', 'Meristematic'], [380, 'ELONGATION', 'Z4', 'Elongating'], [670, 'MATURATION', 'Z4', 'Maturing']];
      const gs = xs.map(([x, n], i) => { const q = mk(g, 'g', {}); if (i === 0) { for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) PG.cell(q, x + c * 52, 110 + r * 52, 48, 48, { nr: 0.32 }); }
        else if (i === 1) { for (let c = 0; c < 4; c++) PG.cell(q, x + c * 52, 90 + (c % 2) * 20, 48, 190 + (c % 2) * 10, { vac: 0.7, nr: 0.16 }); } else { for (let c = 0; c < 4; c++) PG.cell(q, x + c * 52, 96, 48, 250, { vac: 0.78, nr: 0.15, sw: 7, s: G.wallS }); }
        cap(q, x + 100, 80, n, { fill: K.ink, 'font-size': 17 }); return q; });
      const sp = mk(g, 'g', {}); const L1 = mk(sp, 'line', { x1: 70, y1: 330, x2: 270, y2: 330, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
      return { els: gs.map((q, i) => [q, [xs[i][2], xs[i][3], -0.2], { dy: 12 }]), labs: [[lab(g, 122, 292, 90, 470, 'Dense cytoplasm'), ['Z4', 'dense']], [lab(g, 432, 250, 400, 470, 'Large vacuole'), ['Z4', 'vacuole']], [lab(g, 673, 300, 690, 470, 'Thick wall'), ['Z4', 'thicken']]],
        anim: t => { const u = (t * 0.7) % 1; L1.style.opacity = (u < 0.5 ? 1 : 0); } }; } }] }));

/* ---------- L: arithmetic vs geometric ---------- */
const sig = x => 440 - 170 / (1 + Math.exp(-(x - 390) / 48));
S.push({ id: 'L', from: 'L1', to: 'C1', cards: [
  { pos: 'L', label: 'ARITHMETIC GROWTH', pill: ['Lₜ = L₀ + rt', ['L3', 'Length', -0.1], 'ac', { font: "600 26px 'IBM Plex Mono'" }], build: (el, s) => {
    const row = mk(s, 'g', {}), cs = Array.from({ length: 12 }, (_, k) => PG.cell(row, 0, 0, 40, 56, { nr: 0.24, f: k === 0 ? '#CFE8D4' : G.cyto, s: k === 0 ? C.ac : G.wallS }));
    cap(s, 660, 230, 'DIVIDING CELL', { fill: C.ac, 'text-anchor': 'end' }); axes(s, 110, 440, 580, 190, 'TIME', 'LENGTH'); const ln = P(s, 'M110,440 L660,270', 'none', C.ac, 5);
    return { els: [[row, ['L2', 'arithmetic', -0.1], { dy: 10 }]], anim: t => { const a = tm(['L2', 'divides']), n = t < a ? 1 : Math.min(12, 1 + Math.floor((t - a) / 0.7)); cs.forEach((c, k) => { at(c, 620 - k * 46, 120); c.style.opacity = k < n ? 1 : 0; });
      PG.part(ln, M.io((t - tm(['L3', 'straight', -1.2])) / 2)); } }; } },
  { pos: 'R', label: 'GEOMETRIC GROWTH', tin: ['L4', null, -0.2], pill: ['W₁ = W₀eʳᵗ', ['L7', 'final', -0.1], 'ac', { font: "600 26px 'IBM Plex Mono'" }], build: (el, s) => {
    const lv = [1, 2, 4, 8].map((n, L) => { const q = mk(s, 'g', {}); for (let k = 0; k < n; k++) { const x = 392 + (k - (n - 1) / 2) * (L === 3 ? 56 : 90 - L * 10), y = 88 + L * 36; circ(q, x, y, 15, '#CFE8D4', C.ac, 3); circ(q, x, y, 6, G.nuc, G.nucS, 1.5); } return q; });
    axes(s, 110, 440, 580, 190, 'TIME', 'SIZE'); let d = ''; for (let x = 110; x <= 670; x += 8) d += (x === 110 ? 'M' : 'L') + x + ',' + sig(x).toFixed(1); const cv = P(s, d, 'none', C.ac, 5);
    const ph = [['LAG', 190, 410, 'L5', 'lag'], ['LOG', 340, 330, 'L5', 'log'], ['STATIONARY', 590, 255, 'L6', 'stationary']].map(([n, x, y, id, w]) => [cap(s, x, y, n, { fill: K.ink, 'font-size': 18 }), [id, w]]);
    return { els: [...lv.map((q, i) => [q, i ? ['L4', ['two', 'four', 'eight'][i - 1], -0.1] : ['L4', 'both', -0.1], { ...POP, sc: 0.5 }]), ...ph.map(([e, sp]) => [e, sp, { dy: 8 }])],
      anim: t => { const a = tm(['L5', 'slow']), b = tm(['L5', 'shoots']), c = tm(['L6', 'slows']); PG.part(cv, t < b ? 0.25 * M.io((t - a + 0.4) / 1) : t < c ? 0.25 + 0.45 * M.io((t - b) / 1.2) : 0.7 + 0.3 * M.io((t - c) / 1.4)); } }; } }] });

/* ---------- C: absolute vs relative ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'ABSOLUTE GROWTH RATE', pill: ['Total growth ÷ time', ['C2', 'total', -0.1], 'ac'], build: (el, s) => {
    const g = mk(s, 'g', {}); mk(g, 'rect', { x: 260, y: 300, width: 110, height: 140, rx: 8, fill: '#CFE8D4', stroke: C.ac, 'stroke-width': 3 }); const add = mk(g, 'rect', { x: 420, y: 220, width: 110, height: 220, rx: 8, fill: '#CFE8D4', stroke: C.ac, 'stroke-width': 3 });
    mk(g, 'rect', { x: 420, y: 220, width: 110, height: 80, rx: 8, fill: C.ac, opacity: 0.8 }); cap(g, 315, 475, 'BEFORE', { fill: K.ink }); cap(g, 475, 475, 'AFTER', { fill: K.ink }); T(g, 600, 268, '+ growth', 26, C.ac, { 'text-anchor': 'start' }); P(g, 'M200,440 L600,440', 'none', K.ink, 3);
    return { els: [[g, ['C2', 'Absolute', -0.1], { dy: 10 }]] }; } },
  { pos: 'R', label: 'RELATIVE GROWTH RATE', tin: ['C3', null, -0.2], pill: ['Growth ÷ time ÷ starting size', ['C3', 'compared', -0.1], 'ac'], build: (el, s) => {
    const g = mk(s, 'g', {}); circ(g, 220, 300, 46, '#CFE8D4', C.ac, 3); circ(g, 220, 300, 30, '#FFFFFF', C.ac, 2); circ(g, 520, 300, 116, '#CFE8D4', C.ac, 3); circ(g, 520, 300, 104, '#FFFFFF', C.ac, 2);
    cap(g, 220, 400, 'SMALL START', { fill: K.ink }); cap(g, 220, 428, 'SAME ADDED: A BIG SHARE', { fill: C.ac, 'font-size': 14 }); cap(g, 520, 450, 'BIG START: A SMALL SHARE', { fill: K.ink });
    return { els: [[g, ['C3', 'Relative', -0.1], { dy: 10 }]] }; } }] });

/* ---------- D: conditions + think ---------- */
const TH = { q: 'One daughter cell keeps dividing, the other matures. Arithmetic or geometric?', opts: ['Arithmetic', 'Geometric'], right: 0, why: 'Arithmetic. Only one cell keeps dividing, so the length rises in a straight line.' };
S.push({ id: 'D', from: 'D1', to: 'T1', cards: [
  { pos: 'W', label: 'WHAT GROWTH NEEDS', tout: 'D5', svg: false, build: el => {
    const tiles = [['Water', 'turgor stretches cells', ['D2', 'Water']], ['Oxygen', 'releases energy', ['D3', 'Oxygen']], ['Nutrients', 'build protoplasm', ['D3', 'nutrients']], ['Temperature', 'an optimum range', ['D4', 'temperature']], ['Light, gravity', 'signals for some stages', ['D4', 'light']]];
    const R = { els: [] }, an = [];
    tiles.forEach(([n, d, sp], i) => { const tl = div(el, '', { position: 'absolute', left: 36 + i * 310 + 'px', top: '84px', width: '290px', height: '400px', borderRadius: '14px', background: 'var(--soft)' });
      const s = EP.svgIn(tl, 290, 260); const nm = div(tl, '', { position: 'absolute', left: '0', width: '290px', top: '286px', textAlign: 'center', font: '700 30px Poppins', whiteSpace: 'nowrap' }, n); const ds = div(tl, '', { position: 'absolute', left: '0', width: '290px', top: '340px', textAlign: 'center', font: '500 21px Poppins', color: 'var(--mute)', whiteSpace: 'nowrap' }, d);
      if (i === 0) { const dr = P(s, 'M145,60 C175,110 200,140 200,175 a55,55 0 0 1 -110,0 C90,140 115,110 145,60 Z', '#D6E9F5', '#5AA0C8', 4); an.push(t => attr(dr, 'transform', `translate(0 ${(5 * Math.sin(t * 3)).toFixed(1)})`)); }
      if (i === 1) { const bs = [0, 1, 2].map(k => { const q = mk(s, 'g', {}); circ(q, 0, 0, 22, '#D6E9F5', '#5AA0C8', 3); circ(q, 16, 14, 14, '#D6E9F5', '#5AA0C8', 3); return q; }); an.push(t => bs.forEach((q, k) => { const u = (t * 0.3 + k / 3) % 1; at(q, 100 + k * 40, 220 - 160 * u); q.style.opacity = Math.min(1, 5 * u, 5 * (1 - u)).toFixed(2); })); }
      if (i === 2) { [['N', 100, 110, '#6DB27A'], ['P', 180, 110, '#E2B33C'], ['K', 140, 180, '#C77DA0']].forEach(([l, x, y, f]) => { circ(s, x, y, 34, f, K.ink, 3); T(s, x, y + 10, l, 30, '#FFFFFF'); }); }
      if (i === 3) { mk(s, 'rect', { x: 131, y: 40, width: 28, height: 160, rx: 14, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); circ(s, 145, 210, 24, K.red, K.ink, 3); const lv = mk(s, 'rect', { x: 138, y: 120, width: 14, height: 90, rx: 7, fill: K.red });
        mk(s, 'rect', { x: 170, y: 90, width: 60, height: 50, fill: '#CFE8D4', opacity: 0.9 }); cap(s, 200, 82, 'OPTIMUM', { 'font-size': 12, fill: C.ac }); an.push(t => { const v = 120 + 14 * Math.sin(t * 1.5); attr(lv, 'y', v.toFixed(1)); attr(lv, 'height', (210 - v).toFixed(1)); }); }
      if (i === 4) { const su = PG.sun(s, 90, 80, 28); arrow(s, 200, 60, 200, 210, K.ink, 4); cap(s, 230, 140, 'g', { 'font-size': 24, fill: K.ink }); an.push(t => attr(su.rays, 'transform', `rotate(${(t * 20) % 360} 90 80)`)); }
      R.els.push([tl, [sp[0], sp[1], -0.2], { dy: 16 }]); });
    R.anim = t => an.forEach(f => f(t)); return R; } },
  EP.think(TH, { tin: 'D5', opts: ['D5', 'arithmetic', -0.1], why: ['D6', 'Only'] })] });

/* ---------- W: leaves A and B ---------- */
const lf = (s, x, y, area, lb, add) => { const L = 22 * Math.sqrt(area); if (add) { const q = mk(s, 'g', {}); P(q, PG.leafD(x - L * 0.52, y, L * 1.04 + 22 * Math.sqrt(5) * 0.5, 0), '#CFE8D4', C.ac, 3, { 'stroke-dasharray': '7 5' }); }
  PG.leaf(s, x - L / 2, y, L, 0); T(s, x, y + L * 0.38 + 34, lb, 20, K.ink); };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · TWO LEAVES, A AND B', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · START', 'A: 5 cm² · B: 50 cm²', 'SAME TIME FOR BOTH', s => { lf(s, 110, 120, 5, 'A · 5 cm²'); lf(s, 330, 120, 50, 'B · 50 cm²'); }, ['W2', 'Leaf', -0.2], ['W2', 'fifty'], ['W2', 'same']],
  ['STEP 2 · ABSOLUTE GROWTH', '+5 cm² each', 'SAME ABSOLUTE GROWTH', s => { lf(s, 110, 120, 5, 'A1 · 10 cm²', 1); lf(s, 330, 120, 50, 'B1 · 55 cm²', 1); }, ['W3', 'So', -0.2], ['W3', 'absolute'], ['W3', 'each']],
  ['STEP 3 · RELATIVE GROWTH', 'A: 100% · B: 10%', 'LEAF A HAS THE HIGHER RGR', s => { P(s, 'M60,240 L440,240', 'none', K.ink, 3); mk(s, 'rect', { x: 120, y: 60, width: 90, height: 180, rx: 6, fill: C.ac }); mk(s, 'rect', { x: 290, y: 222, width: 90, height: 18, rx: 4, fill: C.ac });
    T(s, 165, 48, '5 ÷ 5', 22, K.ink); T(s, 335, 210, '5 ÷ 50', 22, K.ink); cap(s, 165, 272, 'LEAF A', { fill: K.ink }); cap(s, 335, 272, 'LEAF B', { fill: K.ink }); }, ['W4', 'But', -0.2], ['W4', 'hundred'], ['W4', 'higher']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['root', 'A maize root tip', 'OVER 17,500 CELLS/HOUR', ['H1', 'maize']], ['melon', 'A watermelon cell', 'UP TO 3,50,000 TIMES', ['H2', 'watermelon']], ['tree', 'A mango tree', 'GROWS ALL ITS LIFE', ['H2', 'mango']]],
  scenes: S,
  stmt: { l2: 'Arithmetic is a <span class="acc">line</span>. Geometric is an S.', f: '<span class="lad">Lₜ = L₀ + rt · W₁ = W₀eʳᵗ · lag, log, stationary</span>', t2: ['T1', 'Arithmetic', -0.2], tf: ['T1', 'Geometric'] },
  trap: { wrong: 'Geometric growth keeps rising forever', right: 'Nutrients run short: it flattens into a stationary phase', tWrong: ['X2', 'geometric', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'flattens', -0.2], tSvg: ['X3', 'S', -0.4],
    build: s => { let d = ''; for (let x = 0; x <= 300; x += 6) d += (x ? 'L' : 'M') + (100 + x) + ',' + (220 - 150 / (1 + Math.exp(-(x - 150) / 28))).toFixed(1); P(s, 'M100,230 L400,230', 'none', K.ink, 3); P(s, d, 'none', C.ac, 5); cap(s, 360, 60, 'STATIONARY', { 'font-size': 14, fill: C.ac }); } },
  where: { type: 'Statement questions: growth phases, the two growth equations, the sigmoid curve', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. In arithmetic growth, both daughter cells keep dividing.<br>II. L<sub>t</sub> = L<sub>0</sub> + rt describes arithmetic growth.<br>III. In W<sub>1</sub> = W<sub>0</sub>e<sup>rt</sup>, r is the relative growth rate.<br>IV. A sigmoid curve has lag, log and stationary phases.</div>', opts: ['I and II only', 'I, II and III only', 'II and III only', 'II, III and IV only'], right: 3 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['II: L<sub>t</sub> = L<sub>0</sub> + rt is arithmetic', ['A2', 'describes']], ['III: r = relative growth rate', ['A2', 'efficiency']], ['IV: lag, log, stationary', ['A3', 'sigmoid']], ['I is wrong: only one cell divides', ['A3', 'wrong']]],
  recap: { title: 'Recap · plant growth', lines: ['<b>Growth</b>: a permanent, irreversible increase in size', '<b>Phases</b>: meristematic → elongation → maturation', '<b>Arithmetic</b>: L<sub>t</sub> = L<sub>0</sub> + rt · a straight line', '<b>Geometric</b>: W<sub>1</sub> = W<sub>0</sub>e<sup>rt</sup> · sigmoid: lag, log, stationary', '<b>Needs</b>: water, oxygen, nutrients, optimum temperature, light, gravity'] },
  yq: ['What are the three phases of growth in a root?', 'What are the phases of a sigmoid curve?', 'What is the relative growth rate?'],
  next: { label: 'NEXT · EP 92', topic: 'Differentiation, Dedifferentiation and Redifferentiation' }
});
})();
