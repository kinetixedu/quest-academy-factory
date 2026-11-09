// PUC Biology Ep 72: Structure of Proteins (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, AA, P, circ, T, chain, place, lerpPts, arrow } = B9;
const ALF = '#F4C9B0', BET = '#BFE3DF', BETd = '#2A9D8F';
const ICN = { stairs: ['M4 20h4v-4h4v-4h4V8h4', 'M4 20V4'], coil: ['M4 12c2-6 4 6 6 0s4 6 6 0 4 6 4 0'], wool: ['M12 4a8 8 0 1 0 .1 0', 'M6 9c4 1 8 5 9 10', 'M5 14c5-1 10 1 13 4', 'M9 5c3 3 5 8 4 14'] };
const S = [];
// chain shapes for N beads around (cx, cy)
const SH = (N, cx, cy, s = 1) => {
  const line = Array.from({ length: N }, (_, i) => [cx + (i - (N - 1) / 2) * 25 * s, cy]);
  const sec = []; let x = cx - 300 * s; for (let i = 0; i < N; i++) { const hel = i >= 6 && i <= 17; sec.push([x, cy + (hel ? 46 * s * Math.sin((i - 6) * 1.6) : 0)]); x += (hel ? 12 : 34) * s; }
  const ball = Array.from({ length: N }, (_, i) => { const a = i * 0.62 + 0.4 * Math.sin(i * 0.5), r = 130 * s * (0.3 + 0.68 * Math.abs(Math.sin(i * 0.41 + 0.6))); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  return { line, sec, ball };
};
const ballG = (g, cx, cy, s, halo, hs, N = 18, name) => { const G = mk(g, 'g', {}); circ(G, cx, cy, 150 * s, halo, hs, 3); chain(G, SH(N, cx, cy, s).ball, AA, 9 * Math.max(s, 0.5)); if (name) T(G, cx + 120 * s, cy - 110 * s, name, 30 * Math.max(s, 0.6), hs); return G; };
const hb = (g, cx, cy, s) => [[-1, -1, 'α', ALF, K.pro], [1, -1, 'β', BET, BETd], [-1, 1, 'β', BET, BETd], [1, 1, 'α', ALF, K.pro]].map(([a, b, n, h, hs]) => ballG(g, cx + a * 120 * s, cy + b * 120 * s, 0.75 * s, h, hs, 16, n));
// right-handed helix (front strands '/') along x
const rhx = (g, x0, x1, y, amp, turns, c) => { const n = 160, F = [], B = []; for (let i = 0; i <= n; i++) { const t = i / n * turns * 2 * Math.PI, p = [x0 + (x1 - x0) * i / n + amp * 0.5 * Math.cos(t), y - amp * Math.sin(t) * 0]; p[1] = y + amp * Math.cos(t + Math.PI / 2); (Math.sin(t) < 0 ? F : B).push([p, i]); }
  const seg = (arr, col, w) => { let d = '', last = -2; arr.forEach(([p, i]) => { d += (i === last + 1 ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); last = i; }); return P(g, d, 'none', col, w); };
  return [seg(B, '#E7B79B', 10), seg(F, c, 12)]; };

/* ---------- H: the earphone wire ---------- */
S.push(EP.hook({ label: 'AN EARPHONE WIRE', face: 'diya', pill: ['A line, a spring, a ball', ['H3', 'knotted', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Does a protein fold like this?', ['H3', 'asked']], ['Why would its shape matter?', ['H3', 'shape']]],
  a: [['ANSWER 1', 'Yes, at four levels', ['H4', 'four']], ['ANSWER 2', 'Wrong fold, no job', ['H4', 'without']]],
  chips: [['Primary', ['H5', 'primary']], ['Secondary', ['H5', 'secondary']], ['Tertiary', ['H5', 'tertiary']], ['Quaternary', ['H5', 'quaternary']], ['Haemoglobin', ['H5', 'haemoglobin']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EFE8F4' }); mk(s, 'rect', { x: 60, y: 420, width: 664, height: 30, rx: 8, fill: '#C9B6A0', stroke: K.ink, 'stroke-width': 2 });
    const N = 60, line = Array.from({ length: N }, (_, i) => [120 + i * 9.5, 300]), spr = Array.from({ length: N }, (_, i) => [220 + i * 6 + 30 * Math.cos(i * 0.9), 300 + 60 * Math.sin(i * 0.9)]), bl = Array.from({ length: N }, (_, i) => { const a = i * 2.4, r = 110 * Math.sqrt((i + 1) / N); return [392 + r * Math.cos(a), 290 + r * Math.sin(a)]; });
    const w = P(s, '', 'none', '#F7F7F7', 9), w2 = P(s, '', 'none', '#3A3A48', 3); const bud = [circ(s, 0, 0, 16, '#F7F7F7', K.ink, 3), circ(s, 0, 0, 16, '#F7F7F7', K.ink, 3)];
    return { anim: t => { const a = M.io((t - tm(['H3', 'curled'])) / 1), b = M.io((t - tm(['H3', 'knotted'])) / 1); const pts = lerpPts(lerpPts(line, spr, a), bl, b); const d = 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'); attr(w, 'd', d); attr(w2, 'd', d);
      [pts[0], pts[N - 1]].forEach((p, k) => { attr(bud[k], 'cx', p[0].toFixed(1)); attr(bud[k], 'cy', p[1].toFixed(1)); }); } };
  } }));

/* ---------- B: four views of structure ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT DOES STRUCTURE MEAN?', build: (el, s) => {
  const box = (i, who, what) => { const g = mk(s, 'g', {}), x = 40 + i * 384; mk(g, 'rect', { x, y: 96, width: 352, height: 380, rx: 18, fill: i === 3 ? '#EAF4EC' : '#FBFAF6', stroke: i === 3 ? C.ac : '#D9D4C7', 'stroke-width': i === 3 ? 3 : 2 }); T(g, x + 176, 144, who, 26); cap(g, x + 176, 452, what, { fill: i === 3 ? C.ac : C.ink }); return { g, x }; };
  const b0 = box(0, 'Inorganic chemist', 'A FORMULA'); T(b0.g, b0.x + 176, 320, 'NaCl', 72, K.ink);
  const b1 = box(1, 'Organic chemist', 'A FLAT DRAWING'); P(b1.g, B9.hexD(b1.x + 176, 300, 90), 'none', K.ink, 5); circ(b1.g, b1.x + 176, 300, 55, 'none', K.ink, 4); cap(b1.g, b1.x + 176, 410, 'BENZENE', { fill: C.mute });
  const b2 = box(2, 'Physicist', 'A 3D SHAPE'); [[0, 0, 44, K.red], [-80, 50, 30, '#FFFFFF'], [80, 50, 30, '#FFFFFF'], [0, -90, 30, '#FFFFFF']].forEach(([dx, dy, r, f]) => { P(b2.g, `M${b2.x + 176},300 L${b2.x + 176 + dx},${300 + dy}`, 'none', K.ink, 6); }); [[0, 0, 44, '#9FB3E6'], [-80, 50, 30, '#FFFFFF'], [80, 50, 30, '#FFFFFF'], [0, -90, 30, '#FFFFFF']].forEach(([dx, dy, r, f]) => circ(b2.g, b2.x + 176 + dx, 300 + dy, r, f, K.ink, 3));
  const b3 = box(3, 'Biologist', 'FOUR LEVELS'); ['1', '2', '3', '4'].forEach((n, k) => { mk(b3.g, 'rect', { x: b3.x + 56 + k * 62, y: 380 - (k + 1) * 50, width: 54, height: (k + 1) * 50, rx: 8, fill: C.ac, opacity: 0.35 + 0.18 * k }); T(b3.g, b3.x + 83 + k * 62, 370, n, 22, '#fff'); });
  return { els: [[b0.g, ['B2', 'chemist'], { dy: 14 }], [b1.g, ['B2', 'organic', -0.1], { dy: 14 }], [b2.g, ['B2', 'physicist', -0.1], { dy: 14 }], [b3.g, ['B3', 'Biologists', -0.1], { dy: 14 }]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['RED BLOOD CELL', 'HAEMOGLOBIN', 'ONE SUBUNIT'], scales: ['x2,000', 'x1,000,000', 'x5,000,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Red blood cell', 'It carries oxygen.', 'Packed with haemoglobin.'], ['RUNG 2 OF 3', 'Haemoglobin', 'Four parts: subunits.', 'Adult human haemoglobin.'], ['RUNG 3 OF 3', 'One subunit', 'One amino acid chain.', 'Coiled, then folded.']],
  av: { who: 'Diya', text: 'Like my earphone wire!', tin: ['Z4', 'ball', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 263, 60], build: g => { [[230, 150], [820, 130], [260, 400], [800, 400], [528, 263]].forEach(([x, y], k) => { const s = k === 4 ? 1.3 : 0.9; mk(g, 'ellipse', { cx: x, cy: y, rx: 120 * s, ry: 90 * s, fill: K.red, stroke: '#8E2433', 'stroke-width': 4 }); mk(g, 'ellipse', { cx: x, cy: y, rx: 55 * s, ry: 38 * s, fill: '#E8848F' }); });
      return { labs: [[lab(g, 600, 300, 760, 480, 'Red blood cell'), ['Z2', 'red']]] }; } },
    { at: 'Z3', focus: [408, 143, 60], build: g => { const B = hb(g, 528, 263, 1);
      return { labs: [[lab(g, 640, 160, 860, 80, 'Subunit'), ['Z3', 'subunits']]], anim: t => B.forEach((e, k) => attr(e, 'transform', `translate(${(4 * Math.sin(t * 2 + k)).toFixed(1)} ${(4 * Math.cos(t * 2 + k)).toFixed(1)})`)) }; } },
    { at: 'Z4', build: g => { circ(g, 528, 263, 200, ALF, K.pro, 3); const ch = chain(g, SH(30, 528, 263, 1.4).ball, AA, 12);
      return { labs: [[lab(g, 600, 200, 820, 90, 'Amino acid chain'), ['Z4', 'chain']], [lab(g, 350, 330, 200, 450, 'Folded into a ball', 'end'), ['Z4', 'ball']]] }; } }] }));

/* ---------- L: four levels (morphing chain) ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'FOUR LEVELS · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Primary', 'order of amino acids · N to C'], ['Secondary', 'some parts coil into a helix'], ['Tertiary', 'folds like a hollow woollen ball'], ['Quaternary', 'how the subunits sit together'], ['Why it matters', 'tertiary shape: needed for activity']], LT) }) },
  { pos: 'R', label: 'ONE CHAIN, FOLDING', build: (el, s) => {
    const N = 24, sh = SH(N, 392, 270, 1), Q = hb(s, 392, 270, 0.85); const ch = chain(s, sh.line, AA, 12);
    const nc = mk(s, 'g', {}); const l1 = lab(nc, sh.line[0][0], sh.line[0][1] + 12, 130, 380, 'N-terminal'), l2 = lab(nc, sh.line[N - 1][0], sh.line[N - 1][1] - 12, 650, 160, 'C-terminal', 'end');
    const nm = div(el, 'pillp ac', { left: '36px', top: '494px' }, ''); const NM = ['Primary · the order', 'Secondary · a helix', 'Tertiary · a 3D ball', 'Quaternary · 2 alpha + 2 beta', 'Right shape, right job'];
    return { labs: [[l1, ['L2', 'N-terminal']], [l2, ['L2', 'C-terminal']]], anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      const a = M.io((t - ts[1]) / 1.2), b = M.io((t - ts[2]) / 1.2), q = M.io((t - ts[3]) / 0.9); place(ch, lerpPts(lerpPts(sh.line, sh.sec, a), sh.ball, b));
      ch.g.style.opacity = (1 - q).toFixed(2); Q.forEach((e, k) => { e.style.opacity = M.clamp((t - ts[3] - k * 0.2) / 0.4).toFixed(2); }); nc.style.opacity = c <= 0 ? 1 : 0; nm.style.opacity = c >= 0 ? 1 : 0; if (c >= 0) nm.textContent = NM[c];
      if (c === 4) Q.forEach((e, k) => attr(e, 'transform', `translate(0 ${(5 * Math.sin(t * 3 + k)).toFixed(1)})`)); } }; } }] });

/* ---------- C: read a primary structure ---------- */
const AN = ['Gly', 'Ala', 'Ser', 'Cys', 'Lys', 'Pro', 'Ala', 'Gly', 'Ser', 'Lys'], AC = { Gly: AA[2], Ala: AA[0], Ser: AA[4], Cys: AA[1], Lys: AA[3], Pro: AA[5] };
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'READ A PRIMARY STRUCTURE LIKE A SENTENCE', build: (el, s) => {
  const ch = EP.chain(el, [['N-TERMINAL', ['C2', 'N-terminal']], ['READ ACROSS', ['C2', 'read']], ['C-TERMINAL', ['C2', 'C-terminal']], ['NEW ORDER, NEW PROTEIN', ['C3', 'Change']]]);
  const row = (y, names) => { const g = mk(s, 'g', {}); P(g, `M260,${y} L${260 + 9 * 110},${y}`, 'none', K.ink, 4); names.forEach((n, i) => { circ(g, 260 + i * 110, y, 36, AC[n], K.ink, 3); T(g, 260 + i * 110, y + 7, n, 20, '#fff'); }); T(g, 190, y + 10, 'N', 30, C.ac); T(g, 1330, y + 10, 'C', 30, C.ac); return g; };
  const r1 = row(220, AN), r2 = row(410, ['Lys', 'Gly', 'Pro', 'Ala', 'Ser', 'Gly', 'Cys', 'Ala', 'Lys', 'Ser']);
  const nums = AN.map((_, i) => txt(s, 260 + i * 110, 290, String(i + 1), { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: C.ink }));
  const ring = circ(s, 260, 220, 46, 'none', C.ac, 5); const c1 = div(el, 'chp', { left: '1400px', top: '198px' }, 'Protein 1'), c2 = div(el, 'chp', { left: '1400px', top: '388px', background: C.ac, color: '#fff' }, 'Protein 2');
  return { els: [[r1, ['C2', 'line'], { dy: 10 }], [c1, ['C2', 'line', 0.3]], [r2, ['C3', 'Change', -0.1], { dy: 10 }], [c2, ['C3', 'different', -0.1]]],
    anim: t => { ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'N-terminal']), b = tm(['C2', 'C-terminal']), v = M.clamp((t - a) / (b - a)); attr(ring, 'cx', (260 + 990 * v).toFixed(1)); ring.style.opacity = t > a - 0.1 ? 1 : 0;
      nums.forEach((n, i) => { n.style.opacity = t > a + (b - a) * i / 9 ? 1 : 0; }); } }; } }] });

/* ---------- D: tertiary vs quaternary ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'TERTIARY · ONE CHAIN FOLDS', pill: ['One chain, one 3D ball', ['D2', 'ball', -0.1], 'ac'], build: (el, s) => {
    const sh = SH(30, 392, 250, 1.3), ch = chain(s, sh.line, AA, 12);
    return { anim: t => { const v = M.io((t - tm(['D2', 'folding'])) / 1.2); place(ch, lerpPts(SH(30, 392, 250, 0.85).line, sh.ball, v)); } }; } },
  { pos: 'R', label: 'QUATERNARY · CHAINS FIT TOGETHER', tin: ['D3', null, -0.2], pill: ['Haemoglobin: 4 subunits', ['D3', 'Haemoglobin', -0.1], 'ac'], build: (el, s) => {
    const Q = hb(s, 392, 250, 0.82);
    return { anim: t => { const a = tm(['D3', 'fitting']); Q.forEach((e, k) => { const v = M.io((t - a - k * 0.15) / 0.8), dx = [-1, 1, -1, 1][k] * 90 * (1 - v), dy = [-1, -1, 1, 1][k] * 60 * (1 - v); attr(e, 'transform', `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`); }); } }; } }] });

/* ---------- U: the helix + think ---------- */
const TH = { q: 'Haemoglobin has four subunits. Which level describes how they fit together?', opts: ['Tertiary', 'Quaternary'], right: 1, why: 'Quaternary. Tertiary is one chain folding on itself.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'ONLY SOME PARTS COIL', tout: 'U4', build: (el, s) => {
    P(s, 'M60,260 L200,260', 'none', K.pro, 10); const h1 = P(s, B9.helixD(200, 380, 260, 50, 4), 'none', K.pro, 10); P(s, 'M380,260 C430,200 470,330 520,260', 'none', K.pro, 10); const h2 = P(s, B9.helixD(520, 660, 260, 50, 3), 'none', K.pro, 10); P(s, 'M660,260 L730,260', 'none', K.pro, 10);
    return { labs: [[lab(s, 290, 210, 290, 120, 'Helix'), ['U2', 'helix']], [lab(s, 450, 280, 450, 420, 'Other forms'), ['U2', 'Other']]], els: [[h2, ['U2', 'portions'], { dy: 0, fade: 0.3 }]] }; } },
  { pos: 'R', label: 'RIGHT-HANDED HELICES ONLY', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const g = mk(s, 'g', {}); rhx(g, 110, 680, 260, 90, 5, K.pro); const ar = arrow(s, 600, 430, 690, 400, C.ac, 4); cap(s, 392, 460, 'LIKE A SPIRAL STAIRCASE · ONE WAY ONLY', { fill: C.ink });
    return { els: [[g, ['U3', 'right', -0.1], { dy: 0, fade: 0.4 }], [ar, ['U3', 'turning'], POP]], labs: [[lab(s, 395, 220, 520, 110, 'Right-handed helix'), ['U3', 'right']]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'tertiary', -0.1], why: ['U5', 'Tertiary'] })] });

/* ---------- W: name the level ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE LEVEL', svg: false, build: el => EP.cols(el, [
  ['PICTURE 1', 'Primary', 'ONLY THE ORDER MATTERS', s => { const ch = chain(s, Array.from({ length: 7 }, (_, i) => [68 + i * 60, 145]), AA, 20); Array.from({ length: 7 }, (_, i) => T(s, 68 + i * 60, 152, String(i + 1), 18, '#fff')); }, ['W2', 'Picture', -0.2], ['W2', 'primary', -0.1], ['W2', 'order']],
  ['PICTURE 2', 'Secondary', 'A COILED STRETCH', s => { P(s, 'M30,145 L120,145', 'none', K.pro, 9); P(s, B9.helixD(120, 380, 145, 55, 5), 'none', K.pro, 9); P(s, 'M380,145 L466,145', 'none', K.pro, 9); }, ['W3', 'Picture', -0.2], ['W3', 'secondary', -0.1], ['W3', 'coiled']],
  ['PICTURE 3', 'Quaternary', 'SUBUNITS FIT TOGETHER', s => { hb(s, 248, 145, 0.48); }, ['W4', 'Picture', -0.2], ['W4', 'quaternary', -0.1], ['W4', 'four']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['stairs', 'A spiral staircase', 'A COIL', ['H1', 'spiral']], ['coil', 'A phone cord', 'COILED LIKE A SPRING', ['H1', 'coiled']], ['wool', 'A ball of wool', 'A FOLDED BALL', ['H1', 'ball']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Order</span>, coil, ball, team.', f: '<span class="lad"><b>primary</b> · <b>secondary</b> · <b>tertiary</b> · <b>quaternary</b></span>', t2: ['T1', 'Order', -0.2], tf: ['T1', 'team'] },
  trap: { wrong: 'All four haemoglobin subunits are the same', right: 'Two alpha and two beta subunits', tWrong: ['X2', 'four', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'two', -0.2], tSvg: ['X3', 'alpha', -0.3],
    build: s => { hb(s, 230, 140, 0.42); } },
  where: { type: 'Match questions on the four levels; statement questions on helices and haemoglobin', at: ['E1', 'match'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Primary<br><b>2</b>Secondary<br><b>3</b>Tertiary<br><b>4</b>Quaternary</div><div><span class="h">LIST II</span><br><b>p</b>Helix<br><b>q</b>Arrangement of subunits<br><b>r</b>Sequence of amino acids<br><b>s</b>Hollow woollen ball</div></div>',
    opts: ['1-r, 2-p, 3-s, 4-q', '1-p, 2-r, 3-s, 4-q', '1-r, 2-s, 3-p, 4-q', '1-q, 2-p, 3-s, 4-r'], right: 0 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['1-r: primary is the sequence', ['A2', 'Primary']], ['2-p: secondary is the helix', ['A2', 'Secondary']], ['3-s: tertiary, the woollen ball', ['A3', 'Tertiary']], ['4-q: quaternary', ['A3', 'Quaternary']]],
  recap: { title: 'Recap · structure of proteins', lines: ['<b>Primary</b>: order of amino acids · N-terminal first, C-terminal last', '<b>Secondary</b>: some parts coil into a helix · right-handed only', '<b>Tertiary</b>: folds like a hollow woollen ball · needed for activity', '<b>Quaternary</b>: how the subunits are arranged', '<b>Haemoglobin</b>: 2 alpha + 2 beta subunits'] },
  yq: ['What is the N-terminal amino acid?', 'Which type of helix is found in proteins?', 'Name the subunits of adult human haemoglobin.'],
  next: { label: 'NEXT · EP 73', topic: 'Enzymes: How They Work' }
});
})();
