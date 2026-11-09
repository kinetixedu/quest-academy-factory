// PUC Biology Ep 71: Polysaccharides and Nucleic Acids (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, AA, P, circ, T, chain, hex, pent, sugars, arrow, at } = B9;
const IOD = '#6D3B2E', BLUE = '#2F4FA8', PHO = '#E58A3C', TAN = '#C9B36A', TAND = '#7A6A2E';
const ICN = { potato: ['M6 8c2-4 10-4 12 0s0 10-6 10S4 12 6 8Z', 'M10 10h.01', 'M14 13h.01'], cotton: ['M7 15a4 4 0 1 1 2-7 4 4 0 0 1 7 1 3 3 0 1 1 1 6Z'], drop: ['M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z'] };
const S = [];
const pchain = (g, pts, r, f, s) => { const G = mk(g, 'g', {}); P(G, 'M' + pts.map(p => p.join(',')).join(' L'), 'none', s, 4); pts.forEach(p => pent(G, p[0], p[1], r, f, s)); return G; };
const nuc = (g, x, y, s = 1, base = K.dna) => { const G = mk(g, 'g', {}); P(G, `M${x + 22 * s},${y} L${x + 60 * s},${y} M${x},${y + 22 * s} L${x},${y + 50 * s}`, 'none', K.ink, 3 * s);
  const ph = circ(G, x - 0, y - 0, 0.1, 'none', 'none', 0); const sg = pent(G, x, y, 24 * s, K.sugL, K.sug, 3 * s); const b = mk(G, 'rect', { x: x + 56 * s, y: y - 22 * s, width: 60 * s, height: 44 * s, rx: 8 * s, fill: '#D7C3E6', stroke: base, 'stroke-width': 3 * s });
  const p = circ(G, x, y + 66 * s, 18 * s, '#F7D2B0', PHO, 3 * s); T(G, x, y + 73 * s, 'P', 20 * s, PHO); return { g: G, sg, b, p }; };
const purine = (g, x, y, r, f, s) => { P(g, B9.hexD(x, y, r), f, s, 3); P(g, `M${x + r * 0.866},${y - r / 2} L${x + r * 0.866 + r * 0.95},${y - r * 0.8} L${x + r * 0.866 + r * 1.5},${y} L${x + r * 0.866 + r * 0.95},${y + r * 0.8} L${x + r * 0.866},${y + r / 2}`, f, s, 3); };

/* ---------- H: the iodine drop ---------- */
S.push(EP.hook({ label: 'THE COLLEGE LAB', face: 'aarav', pill: ['Blue-black vs no change', ['H3', 'blue', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Both are glucose: why the difference?', ['H3', 'difference']], ['How does a sugar chain hold a colour?', ['H3', 'colour']]],
  a: [['ANSWER 1', 'Starch coils into a spring', ['H4', 'coils']], ['ANSWER 2', 'The spring traps iodine', ['H4', 'traps']]],
  chips: [['Polysaccharides', ['H5', 'polysaccharides']], ['The iodine test', ['H5', 'iodine']], ['Nucleotides', ['H5', 'building']], ['DNA and RNA', ['H5', 'nucleic']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#E9EEF0' }); mk(s, 'rect', { x: 0, y: 380, width: 784, height: 200, fill: '#5E6B73' }); mk(s, 'rect', { x: 0, y: 380, width: 784, height: 12, fill: '#47525A' });
    [200, 560].forEach(x => mk(s, 'ellipse', { cx: x, cy: 380, rx: 130, ry: 26, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }));
    const po = mk(s, 'ellipse', { cx: 200, cy: 370, rx: 90, ry: 20, fill: '#F1E2B8', stroke: '#B59A3C', 'stroke-width': 3 }), spot = mk(s, 'ellipse', { cx: 200, cy: 370, rx: 0, ry: 0, fill: '#1E2140' });
    const co = mk(s, 'g', {}); [[530, 360, 30], [570, 350, 34], [600, 366, 26], [550, 372, 28]].forEach(([x, y, r]) => circ(co, x, y, r, '#FFFFFF', '#C9CED6', 2)); const cs = mk(s, 'ellipse', { cx: 565, cy: 362, rx: 0, ry: 0, fill: '#C98A3A', opacity: 0.55 });
    const dr = mk(s, 'g', {}), drB = mk(dr, 'g', {}); P(drB, 'M-10,-150 L10,-150 L8,-40 L0,-28 L-8,-40 Z', '#FBFBFB', K.ink, 3); mk(drB, 'rect', { x: -14, y: -190, width: 28, height: 44, rx: 10, fill: '#3A3A48' }); const dp = circ(dr, 0, 0, 7, IOD, IOD, 1);
    T(s, 200, 450, 'POTATO', 20, '#fff'); T(s, 565, 450, 'COTTON', 20, '#fff');
    return { anim: t => { const a = tm(['H1', 'iodine']), b = tm(['H3', 'tried']); const onP = t < b + 1.6, x = onP ? 200 : 565; at(drB, x, 300); const v = ((t - (onP ? a : b + 1.6)) % 1.6) / 0.8; attr(dp, 'cx', x); attr(dp, 'cy', (272 + 90 * M.clamp(v)).toFixed(1)); dp.style.opacity = t > a && v < 1 ? 1 : 0;
      const sp = M.io((t - tm(['H3', 'potato'])) / 0.8); attr(spot, 'rx', (70 * sp).toFixed(1)); attr(spot, 'ry', (15 * sp).toFixed(1)); const c2 = M.io((t - tm(['H3', 'cotton'])) / 0.6); attr(cs, 'rx', (18 * c2).toFixed(1)); attr(cs, 'ry', (8 * c2).toFixed(1)); } };
  } }));

/* ---------- B: many sugars ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'POLY = MANY · SACCHARIDE = SUGAR', build: (el, s) => {
  const w1 = div(el, 'chp', { left: '80px', top: '110px', height: '64px', font: '700 34px Poppins', background: C.ac, color: '#fff' }, 'poly'), w2 = div(el, 'chp', { left: '250px', top: '110px', height: '64px', font: '700 34px Poppins' }, 'saccharide');
  const w3 = div(el, 'chp', { left: '560px', top: '110px', height: '64px', font: '700 34px Poppins', background: 'var(--ac2)', color: '#1F6B3F' }, '= many sugars');
  const N = 15, pts = Array.from({ length: N }, (_, i) => [120 + i * 96, 330 + 22 * Math.sin(i * 0.8)]); const ln = P(s, 'M' + pts.map(p => p.join(',')).join(' L'), 'none', K.sug, 5);
  const hx = pts.map(p => hex(s, p[0], p[1], 32)); const th = P(s, 'M80,470 C400,440 800,500 1520,460', 'none', '#D9D2C0', 10); P(s, 'M80,470 C400,440 800,500 1520,460', 'none', '#F4F0E4', 4, { 'stroke-dasharray': '3 9' });
  cap(s, 800, 530, 'LIKE A COTTON THREAD · HUNDREDS OF SUGAR UNITS', { fill: C.ink });
  return { els: [[w1, ['B2', 'Poly'], { dy: 10 }], [w2, ['B2', 'Saccharide'], { dy: 10 }], [w3, ['B2', 'polysaccharide', -0.1], { dy: 10 }], [th, ['B3', 'cotton', -0.2], { dy: 0, fade: 0.4 }]], labs: [[lab(s, pts[9][0], pts[9][1] - 32, 1100, 210, 'Monosaccharide · one sugar'), ['B3', 'monosaccharide']]],
    anim: t => { const a = tm(['B2', 'long']); hx.forEach((h, i) => { h.style.opacity = M.clamp((t - a - i * 0.12) / 0.2); }); ln.style.opacity = t > a ? 1 : 0; } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CELL WALL', 'CELLULOSE', 'GLUCOSE'], scales: ['x500', 'x100,000', 'x10,000,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Cell wall', 'A box around each plant cell.', 'Made of cellulose.'], ['RUNG 2 OF 3', 'Cellulose', 'Long, straight sugar chains.', 'Lying side by side.'], ['RUNG 3 OF 3', 'Glucose', 'A ring-shaped sugar.', 'Cellulose: glucose only.']],
  av: { who: 'Aarav', text: 'Same unit, again and again!', tin: ['Z4', 'homopolymer', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 263, 50], build: g => { for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const x = 98 + c * 176, y = 40 + r * 152; mk(g, 'rect', { x, y, width: 168, height: 144, rx: 14, fill: '#E3D3A0', stroke: TAND, 'stroke-width': 3 }); mk(g, 'rect', { x: x + 12, y: y + 12, width: 144, height: 120, rx: 10, fill: '#CFE6C6', stroke: '#5E8C4A', 'stroke-width': 2 }); mk(g, 'ellipse', { cx: x + 60, cy: y + 72, rx: 22, ry: 18, fill: '#D7C3E6', stroke: K.dna, 'stroke-width': 2 }); }
      return { labs: [[lab(g, 528, 268, 760, 470, 'Cell wall'), ['Z2', 'wall']]] }; } },
    { at: 'Z3', focus: [528, 263, 50], build: g => { const rows = [150, 263, 376].map((y, r) => sugars(g, Array.from({ length: 11 }, (_, i) => [78 + i * 90 + (r % 2) * 20, y]), 30));
      return { labs: [[lab(g, 528, 233, 640, 80, 'Cellulose chain'), ['Z3', 'straight']]], anim: t => rows.forEach((r, k) => attr(r.g, 'transform', `translate(${(6 * Math.sin(t * 1.5 + k)).toFixed(1)} 0)`)) }; } },
    { at: 'Z4', build: g => { hex(g, 528, 263, 130, K.sugL, K.sug, 6); const v = [0, 1, 2, 3, 4, 5].map(k => [528 + 130 * Math.cos(Math.PI / 6 + k * Math.PI / 3), 263 + 130 * Math.sin(Math.PI / 6 + k * Math.PI / 3)]);
      v.forEach((p, k) => { circ(g, p[0], p[1], 24, k === 4 ? '#F4C9B0' : '#FFFFFF', k === 4 ? K.red : K.ink, 3); T(g, p[0], p[1] + 9, k === 4 ? 'O' : 'C', 24, k === 4 ? K.red : K.ink); });
      T(g, 528, 280, 'C6H12O6', 34, K.sug);
      return { labs: [[lab(g, v[4][0], v[4][1] - 24, 760, 80, 'Oxygen in the ring'), ['Z4', 'ring']], [lab(g, 440, 268, 200, 440, 'Glucose', 'end'), ['Z4', 'glucose']]] }; } }] }));

/* ---------- L: five polysaccharides ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'FIVE POLYSACCHARIDES · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Cellulose', 'glucose only · cell walls, paper, cotton'], ['Starch', 'stores energy in plants'], ['Glycogen', 'animal store · many branches'], ['Inulin', 'a polymer of fructose'], ['Chitin', 'insect and crab skeletons · amino-sugars']], LT) }) },
  { pos: 'R', label: 'WHAT EACH CHAIN LOOKS LIKE', build: (el, s) => {
    const G = [0, 1, 2, 3, 4].map(() => mk(s, 'g', {}));
    [180, 270, 360].forEach(y => sugars(G[0], Array.from({ length: 8 }, (_, i) => [110 + i * 80, y]), 26));
    const hp = Array.from({ length: 14 }, (_, i) => [130 + i * 40, 270 + 80 * Math.sin(i * 0.9)]); sugars(G[1], hp, 22);
    const tr = [[620, 270], [540, 270], [460, 270], [380, 270], [300, 270], [220, 270], [140, 270]], br1 = [[460, 270], [420, 200], [380, 140]], br2 = [[300, 270], [260, 340], [220, 410]], br3 = [[540, 270], [500, 340]];
    [tr, br1, br2, br3].forEach(p => sugars(G[2], p, 24)); cap(G[2], 140, 330, 'NON-REDUCING END', { fill: C.ink }); cap(G[2], 640, 330, 'REDUCING END', { fill: C.ink });
    pchain(G[3], Array.from({ length: 8 }, (_, i) => [110 + i * 80, 270]), 28, '#F7E6B0', K.fru); cap(G[3], 392, 350, 'FRUCTOSE UNITS', { fill: K.fru });
    const ch = sugars(G[4], Array.from({ length: 8 }, (_, i) => [110 + i * 80, 270]), 26, '#E6DCCB', '#8C6D4F'); Array.from({ length: 8 }, (_, i) => T(G[4], 110 + i * 80, 279, 'N', 22, '#8C6D4F')); cap(G[4], 392, 350, 'AMINO-SUGAR UNITS', { fill: '#8C6D4F' });
    const nm = div(el, 'pillp ac', { left: '36px', top: '494px' }, ''); const NM = ['Cellulose · plant cell walls', 'Starch · forms a helix', 'Glycogen · branched', 'Inulin · fructose polymer', 'Chitin · arthropod exoskeleton'];
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); G.forEach((g, i) => { g.style.opacity = c === i ? M.clamp((t - ts[i] + 0.2) / 0.4) : 0; }); nm.style.opacity = c >= 0 ? 1 : 0; if (c >= 0) nm.textContent = NM[c]; } }; } }] });

/* ---------- C: the iodine test ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE IODINE TEST · STARCH AND CELLULOSE', build: (el, s) => {
  const ch = EP.chain(el, [['ADD IODINE', ['C1', 'iodine']], ['IT ENTERS THE HELIX', ['C2', 'slide']], ['BLUE COLOUR', ['C3', 'blue']], ['CELLULOSE: NO HELIX', ['C3', 'Cellulose']]]);
  const hb = P(s, B9.helixD(80, 760, 310, 80, 4), 'none', K.sug, 18), hf = P(s, B9.helixD(80, 760, 310, 80, 4), 'none', '#F3E2B3', 10);
  const I = Array.from({ length: 6 }, () => { const g = mk(s, 'g', {}); circ(g, -10, 0, 10, IOD, K.ink, 2); circ(g, 10, 0, 10, IOD, K.ink, 2); return g; });
  const cl = mk(s, 'g', {}); [230, 310, 390].forEach(y => sugars(cl, Array.from({ length: 8 }, (_, i) => [900 + i * 84, y]), 26));
  const J = Array.from({ length: 4 }, () => { const g = mk(s, 'g', {}); circ(g, -10, 0, 10, IOD, K.ink, 2); circ(g, 10, 0, 10, IOD, K.ink, 2); return g; });
  const bl = div(el, 'chp', { left: '300px', top: '470px', background: BLUE, color: '#fff' }, 'Starch + iodine = blue'), nb = div(el, 'chp', { left: '1050px', top: '470px' }, 'Cellulose: no blue');
  return { els: [[cl, ['C3', 'Cellulose', -0.2], { dy: 12 }], [bl, ['C3', 'blue', 0.2]], [nb, ['C3', 'no', 0.2]]], labs: [[lab(s, 250, 385, 160, 450, 'Starch helix'), ['C2', 'helix']], [lab(s, 600, 310, 640, 200, 'Iodine (I2)'), ['C2', 'Iodine']]],
    anim: t => { ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'Iodine']), b = tm(['C3', 'blue']);
      I.forEach((g, k) => { const v = M.io((t - a - k * 0.3) / 1.4), x = 60 + (60 + k * 110) * v; at(g, Math.min(x, 120 + k * 110), 310 + 6 * Math.sin(t * 3 + k)); g.style.opacity = t > a - 0.1 ? 1 : 0; });
      const bv = M.clamp((t - b) / 0.6); attr(hb, 'stroke', M.mix ? M.mix(K.sug, BLUE, bv) : (bv > 0.5 ? BLUE : K.sug)); attr(hf, 'stroke', bv > 0.5 ? '#9FB3E6' : '#F3E2B3');
      const c = tm(['C3', 'Cellulose']); J.forEach((g, k) => { const v = ((t - c) * 0.35 + k / 4) % 1; at(g, 880 + 680 * v, (k % 2 ? 270 : 350) + 6 * Math.sin(v * 12)); g.style.opacity = t > c ? Math.min(1, 6 * v, 6 * (1 - v)) : 0; }); } }; } }] });

/* ---------- D: nucleotides ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'A NUCLEOTIDE · THREE PARTS', build: (el, s) => {
    const n = nuc(s, 300, 250, 2);
    return { els: [[n.b, ['D2', 'nitrogen', -0.1], { ...POP, sc: 0.5 }], [n.sg, ['D2', 'five', -0.1], { ...POP, sc: 0.5 }], [n.p, ['D2', 'phosphate', -0.1], { ...POP, sc: 0.5 }]],
      labs: [[lab(s, 412, 206, 520, 120, 'Nitrogen base'), ['D2', 'nitrogen']], [lab(s, 260, 250, 120, 140, 'Five-carbon sugar'), ['D2', 'five']], [lab(s, 336, 382, 520, 450, 'Phosphate group'), ['D2', 'phosphate']]] }; } },
  { pos: 'R', label: 'NUCLEOSIDE + PHOSPHATE = NUCLEOTIDE', tin: ['D3', null, -0.2], build: (el, s) => {
    const r1 = mk(s, 'g', {}); pent(r1, 110, 150, 26, K.sugL, K.sug); mk(r1, 'rect', { x: 150, y: 128, width: 60, height: 44, rx: 8, fill: '#D7C3E6', stroke: K.dna, 'stroke-width': 3 }); T(r1, 180, 158, 'A', 22, K.dna); txt(r1, 260, 145, 'Adenosine', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: C.ink }); cap(r1, 340, 178, 'NUCLEOSIDE · BASE + SUGAR', { 'text-anchor': 'start', x: 260 });
    const r2 = mk(s, 'g', {}); pent(r2, 110, 290, 26, K.sugL, K.sug); mk(r2, 'rect', { x: 150, y: 268, width: 60, height: 44, rx: 8, fill: '#D7C3E6', stroke: K.dna, 'stroke-width': 3 }); T(r2, 180, 298, 'A', 22, K.dna); P(r2, 'M110,316 L110,336', 'none', K.ink, 3); circ(r2, 110, 352, 16, '#F7D2B0', PHO, 3); T(r2, 110, 359, 'P', 18, PHO);
    txt(r2, 260, 290, 'Adenylic acid', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: C.ink }); const c2 = cap(r2, 0, 323, 'NUCLEOTIDE · + PHOSPHATE', { 'text-anchor': 'start' }); attr(c2, 'x', 260);
    const r3 = mk(s, 'g', {}); for (let k = 0; k < 6; k++) { const x = 90 + k * 110; pent(r3, x, 450, 20, K.sugL, K.sug); circ(r3, x + 55, 470, 12, '#F7D2B0', PHO, 2.5); if (k < 5) P(r3, `M${x + 20},456 L${x + 43},468 M${x + 67},468 L${x + 90},456`, 'none', K.ink, 2.5); mk(r3, 'rect', { x: x - 18, y: 380, width: 36, height: 44, rx: 6, fill: '#D7C3E6', stroke: K.dna, 'stroke-width': 2.5 }); P(r3, `M${x},424 L${x},430`, 'none', K.ink, 2.5); }
    const t3 = cap(s, 392, 530, 'POLYNUCLEOTIDE · A CHAIN OF NUCLEOTIDES', { fill: C.ac });
    [r1, r2].forEach(r => r.querySelectorAll('text').forEach(e => { if (e.getAttribute('x') === '340') attr(e, 'x', 260); }));
    return { els: [[r1, ['D3', 'nucleoside', -0.2], { dy: 10 }], [r2, ['D3', 'phosphate', -0.2], { dy: 10 }], [r3, ['D3', 'chains', -0.2], { dy: 10 }], [t3, ['D3', 'polynucleotides', -0.2], { dy: 6 }]] }; } }] });

/* ---------- U: bases, sugars + think ---------- */
const TH = { q: 'A nucleic acid has the sugar ribose. Is it DNA or RNA?', opts: ['DNA', 'RNA'], right: 1, why: 'RNA. Ribose makes ribonucleic acid; DNA has deoxyribose.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'TWO SHAPES OF BASE', tout: 'U4', build: (el, s) => {
    const pu = mk(s, 'g', {}); [['Adenine', 150], ['Guanine', 450]].forEach(([n, x]) => { purine(pu, x, 190, 50, '#D7C3E6', K.dna); T(pu, x + 40, 290, n, 24); }); div(el, 'chp', { left: '36px', top: '330px', background: '#D7C3E6', color: K.dna }, 'Purines · two rings');
    const py = mk(s, 'g', {}); [['Cytosine', 140], ['Uracil', 392], ['Thymine', 640]].forEach(([n, x]) => { P(py, B9.hexD(x, 430, 40), '#D4ECEA', K.rna, 3); T(py, x, 500, n, 22); });
    const c2 = div(el, 'chp', { left: '480px', top: '330px', background: '#D4ECEA', color: K.rna }, 'Pyrimidines · one ring');
    const c1 = el.querySelectorAll('.chp')[0];
    return { els: [[pu, ['U2', 'Adenine', -0.1], { dy: 10 }], [c1, ['U2', 'purines']], [py, ['U2', 'Cytosine', -0.1], { dy: 10 }], [c2, ['U2', 'pyrimidines']]] }; } },
  { pos: 'R', label: 'THE SUGAR DECIDES THE NAME', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const a = mk(s, 'g', {}); pent(a, 200, 230, 80, '#EDE3F4', K.dna, 5); T(a, 200, 242, 'deoxyribose', 17, K.dna); T(a, 200, 380, 'DNA', 40, K.dna); cap(a, 200, 420, 'DEOXYRIBONUCLEIC ACID', { fill: K.dna });
    const b = mk(s, 'g', {}); pent(b, 584, 230, 80, '#D4ECEA', K.rna, 5); T(b, 584, 245, 'ribose', 22, K.rna); T(b, 584, 380, 'RNA', 40, K.rna); cap(b, 584, 420, 'RIBONUCLEIC ACID', { fill: K.rna });
    cap(s, 392, 490, 'DEOXY = ONE OXYGEN LESS', { fill: C.ink });
    return { els: [[a, ['U3', 'deoxyribose', -0.1], { dy: 10 }], [b, ['U3', 'ribose', -0.1, 1], { dy: 10 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'DNA', -0.1], why: ['U5', 'Ribose'] })] });

/* ---------- W: name the molecule ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME IT FROM ITS BUILDING BLOCK', svg: false, build: el => EP.cols(el, [
  ['CHAIN 1 · GLUCOSE UNITS', 'Cellulose, starch, glycogen', 'A HOMOPOLYMER OF GLUCOSE', s => { sugars(s, Array.from({ length: 6 }, (_, i) => [68 + i * 72, 145]), 26); Array.from({ length: 6 }, (_, i) => T(s, 68 + i * 72, 153, 'G', 20, K.sug)); }, ['W2', 'Chain', -0.2], ['W2', 'cellulose', -0.1], ['W2', 'homopolymer']],
  ['CHAIN 2 · FRUCTOSE UNITS', 'Inulin', 'A POLYMER OF FRUCTOSE', s => { pchain(s, Array.from({ length: 6 }, (_, i) => [68 + i * 72, 145]), 28, '#F7E6B0', K.fru); Array.from({ length: 6 }, (_, i) => T(s, 68 + i * 72, 153, 'F', 20, K.fru)); }, ['W3', 'Chain', -0.2], ['W3', 'inulin', -0.1], ['W3', 'inulin', 0.3]],
  ['CHAIN 3 · BASE + SUGAR + PHOSPHATE', 'Nucleic acid', 'A POLYNUCLEOTIDE', s => { for (let k = 0; k < 4; k++) nuc(s, 80 + k * 110, 120, 0.8); }, ['W4', 'Chain', -0.2], ['W4', 'nucleic', -0.1], ['W4', 'acid']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['potato', 'A potato slice', 'TURNS BLUE-BLACK', ['H1', 'potato']], ['cotton', 'A ball of cotton', 'STAYS AS IT IS', ['H1', 'cotton']], ['drop', 'One drop of iodine', 'ON EACH', ['H1', 'drop']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Starch</span> holds iodine. Cellulose cannot.', f: '<span class="lad">starch: <b>helix + I2 = blue</b> · cellulose: <b>no helix</b></span>', t2: ['T1', 'Starch', -0.2], tf: ['T1', 'Cellulose'] },
  trap: { wrong: 'Nucleosides build nucleic acids', right: 'Nucleotides do: base + sugar + phosphate', tWrong: ['X2', 'nucleosides', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'nucleotides', -0.2], tSvg: ['X3', 'phosphate', -0.6],
    build: s => { const a = nuc(s, 90, 100, 0.9); a.p.style.opacity = 0.2; cap(s, 140, 240, 'NUCLEOSIDE', { 'font-size': 14 }); arrow(s, 210, 120, 270, 120, C.ac, 3); nuc(s, 310, 100, 0.9); cap(s, 360, 240, 'NUCLEOTIDE', { 'font-size': 14, fill: C.ac }); } },
  where: { type: 'Assertion-reason or statement questions: starch and iodine, cellulose, inulin, chitin, purines and pyrimidines', at: ['E1', 'assertion'] },
  mcq: { q: '<b>Assertion (A)</b>: Starch gives a blue colour with iodine.<br><b>Reason (R)</b>: Starch forms helical secondary structures that can hold I<sub>2</sub>.', opts: ['R explains A', 'R true, but not why', 'A true, R false', 'A false, R true'], right: 0 }, mcqAt: ['Q1', 'assertion', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['Both true, R explains A', ['A1', 'Both']], ['Starch forms helices', ['A2', 'Starch']], ['The helix holds iodine: blue', ['A2', 'holds']], ['Cellulose: no helix, no blue', ['A3', 'Cellulose']]],
  recap: { title: 'Recap · polysaccharides and nucleic acids', lines: ['<b>Polysaccharide</b>: a long chain of sugars (monosaccharides)', '<b>Cellulose</b>: glucose only, a homopolymer · cell walls, paper, cotton', '<b>Starch</b> plants · <b>glycogen</b> animals · <b>inulin</b> fructose · <b>chitin</b>', '<b>Iodine</b>: starch helix holds I2, blue · cellulose cannot', '<b>Nucleotide</b> = base + sugar + phosphate · A, G purines'] },
  yq: ['Why does cellulose not turn blue with iodine?', 'What are the three parts of a nucleotide?', 'Name the two purines.'],
  next: { label: 'NEXT · EP 72', topic: 'Structure of Proteins' }
});
})();
