// PUC Biology Ep 70: Biomacromolecules and Proteins (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, AA, P, circ, T, chain, hex, sugars, enz, arrow, cell } = B9;
const S = [];
const ICN = { bowl: ['M3 11h18', 'M4 11a8 8 0 0 0 16 0', 'M9 7c0-1.5 1-1.5 1-3', 'M14 7c0-1.5 1-1.5 1-3'], bone: ['M7 7l10 10', 'M5 9a2 2 0 1 1 2-4 2 2 0 1 1 4 2L9 9', 'M19 15a2 2 0 1 1-2 4 2 2 0 1 1-4-2l2-2'], leaf: ['M5 19C5 9 11 5 20 4c-1 9-5 15-15 15Z', 'M5 19l9-9'] };
const rope = (g, x, y, w, c = '#C77DA0') => { for (let k = 0; k < 3; k++) P(g, Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${(x + w * i / 40).toFixed(1)},${(y + 12 * Math.sin(i / 40 * 6 * Math.PI + k * 2.1)).toFixed(1)}`).join(' '), 'none', [c, '#9A4F75', '#E3A9C5'][k], 6); };
const yAb = (g, x, y, s = 1) => P(g, `M${x},${y + 50 * s} L${x},${y} M${x},${y} L${x - 28 * s},${y - 36 * s} M${x},${y} L${x + 28 * s},${y - 36 * s}`, 'none', '#4A78C2', 9 * s);
const leafD = (x, y, s) => `M${x - 120 * s},${y} C${x - 60 * s},${y - 80 * s} ${x + 60 * s},${y - 80 * s} ${x + 130 * s},${y} C${x + 60 * s},${y + 80 * s} ${x - 60 * s},${y + 80 * s} ${x - 120 * s},${y} Z`;

/* ---------- H: dal at dinner ---------- */
S.push(EP.hook({ label: 'DINNER AT HOME', face: 'diya', pill: ['Eat your dal', ['H3', 'eat', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['What is a protein, really?', ['H3', 'what']], ['Why must it come from food?', ['H3', 'food']]],
  a: [['ANSWER 1', 'A long chain of amino acids', ['H4', 'chain']], ['ANSWER 2', 'Some amino acids we cannot make', ['H4', 'cannot']]],
  chips: [['Big and small molecules', ['H5', 'big']], ['What a cell is made of', ['H5', 'cell']], ['Building a protein', ['H5', 'built']], ['Protein jobs', ['H5', 'jobs']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F4E6CF' }); mk(s, 'rect', { x: 0, y: 380, width: 784, height: 200, fill: '#B98A5A' }); mk(s, 'rect', { x: 0, y: 380, width: 784, height: 14, fill: '#8C6440' });
    mk(s, 'ellipse', { cx: 300, cy: 400, rx: 170, ry: 30, fill: '#E9E2D4', stroke: K.ink, 'stroke-width': 3 });
    P(s, 'M150,330 Q300,470 450,330 Z', '#FBF6EE', K.ink, 4); mk(s, 'ellipse', { cx: 300, cy: 330, rx: 150, ry: 26, fill: '#E2B33C', stroke: K.ink, 'stroke-width': 3 });
    const st = [0, 1, 2].map(k => P(s, `M${250 + k * 50},300 c-15,-25 15,-40 0,-70`, 'none', '#B9A88A', 4, { opacity: 0 }));
    const lf = mk(s, 'g', {}); P(lf, leafD(620, 230, 0.7), '#8CC48F', K.ink, 3); P(lf, 'M540,230 L710,230', 'none', '#D8ECD2', 3); P(lf, 'M600,500 L600,300', 'none', '#5E8C4A', 6);
    return { els: [[lf, ['H1', 'leaf', -0.2], { ...POP, sc: 0.6 }]], anim: t => st.forEach((e, k) => { const v = (t * 0.4 + k / 3) % 1; e.style.opacity = t > tm(['H1', 'bowl']) ? (Math.sin(v * Math.PI) * 0.9).toFixed(2) : 0; attr(e, 'transform', `translate(0 ${(-30 * v).toFixed(1)})`); }) };
  } }));

/* ---------- B: grind, filter, sort ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'GRIND IN ACID · FILTER · SORT', build: (el, s) => {
  const fn = mk(s, 'g', {}); P(fn, 'M110,120 L390,120 L280,270 L280,330 L220,330 L220,270 Z', '#F3F7EA', K.ink, 4);
  const bits = mk(fn, 'g', {}); [[170, 150, '#8CC48F'], [215, 170, '#6DB27A'], [260, 150, '#8CC48F'], [300, 168, '#6DB27A'], [245, 200, '#8CC48F'], [195, 140, '#6DB27A'], [330, 140, '#8CC48F']].forEach(([x, y, f]) => P(bits, `M${x - 14},${y} l14,-10 l14,10 l-6,12 l-16,0 Z`, f, '#1F5E37', 2));
  P(fn, 'M160,500 L160,420 Q160,380 200,370 L300,370 Q340,380 340,420 L340,500 Q340,520 320,520 L180,520 Q160,520 160,500 Z', '#F7FBFF', K.ink, 4);
  const liq = mk(fn, 'rect', { x: 163, y: 520, width: 174, height: 0, fill: K.watL });
  const drop = circ(fn, 250, 340, 8, K.wat, K.wat, 1);
  cap(fn, 250, 556, 'FILTRATE BELOW · RETENTATE ABOVE', { fill: K.ink });
  const p1 = mk(s, 'g', {}); mk(p1, 'rect', { x: 470, y: 100, width: 500, height: 420, rx: 16, fill: '#EEF5FA', stroke: K.wat, 'stroke-width': 2.5 });
  T(p1, 720, 150, 'Acid soluble pool', 28); cap(p1, 720, 186, 'FILTRATE · SMALL MOLECULES', { fill: K.wat });
  const sm = mk(p1, 'g', {}); [[560, 260], [640, 300], [720, 250], [800, 310], [880, 260], [600, 360], [760, 370], [860, 380]].forEach(([x, y], i) => { if (i % 3 === 0) hex(sm, x, y, 18); else if (i % 3 === 1) circ(sm, x, y, 15, AA[i % 6]); else mk(sm, 'rect', { x: x - 14, y: y - 14, width: 28, height: 28, rx: 6, fill: '#D6E9F5', stroke: K.wat, 'stroke-width': 2.5 }); });
  const m1 = div(el, 'chp', { left: '500px', top: '430px', width: '440px', justifyContent: 'center' }, '18 to about 800 Da · micromolecules');
  const p2 = mk(s, 'g', {}); mk(p2, 'rect', { x: 1010, y: 100, width: 540, height: 420, rx: 16, fill: '#FBF1EA', stroke: K.pro, 'stroke-width': 2.5 });
  T(p2, 1280, 150, 'Acid insoluble fraction', 28); cap(p2, 1280, 186, 'RETENTATE · BIG MOLECULES', { fill: K.pro });
  const ic = [0, 1, 2, 3].map(() => mk(p2, 'g', {}));
  chain(ic[0], Array.from({ length: 6 }, (_, i) => [1085 + i * 26, 240 + (i % 2) * 14]), AA, 11); T(ic[0], 1150, 296, 'Proteins', 20);
  chain(ic[1], Array.from({ length: 6 }, (_, i) => [1345 + i * 26, 240 + (i % 2) * 14]), [K.dna, '#B79AD0'], 11); T(ic[1], 1410, 296, 'Nucleic acids', 20);
  sugars(ic[2], [[1110, 340], [1150, 340], [1190, 340]], 15); T(ic[2], 1150, 392, 'Polysaccharides', 20);
  [0, 1, 2].forEach(k => { circ(ic[3], 1392 + k * 18, 328, 7, K.wat, K.ink, 1.5); P(ic[3], `M${1389 + k * 18},335 l0,24 M${1395 + k * 18},335 l0,24`, 'none', '#B8A46A', 3); }); T(ic[3], 1410, 392, 'Lipids (under 800 Da)', 20);
  const m2 = div(el, 'chp', { left: '1040px', top: '430px', width: '480px', justifyContent: 'center' }, '10,000 Da and up · biomacromolecules');
  return { els: [[fn, 'B1', { dy: 16 }], [bits, ['B1', 'Grind'], { ...POP, sc: 0.6 }], [p1, ['B2', 'liquid', -0.1], { dy: 16 }], [sm, ['B2', 'small'], { ...POP, sc: 0.5 }], [m1, ['B2', 'micromolecules', -0.2]], [p2, ['B3', 'What', -0.1], { dy: 16 }], ...ic.map((g, i) => [g, ['B3', ['proteins', 'nucleic', 'polysaccharides', 'lipids'][i], -0.1], { ...POP, sc: 0.5 }]), [m2, ['B3', 'biomacromolecules', -0.3]]],
    anim: t => { const a = tm(['B1', 'filter']); const v = M.clamp((t - a) / 4); attr(liq, 'y', (520 - 90 * v).toFixed(1)); attr(liq, 'height', (90 * v).toFixed(1)); const d = ((t - a) * 1.2) % 1; attr(drop, 'cy', (335 + 60 * d).toFixed(1)); drop.style.opacity = t > a && v < 1 ? 1 : 0; } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CELL', 'PROTEIN', 'AMINO ACID'], scales: ['x1,000', 'x1,000,000', 'x10,000,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The cell', 'Proteins are everywhere.', 'Biggest group after water.'], ['RUNG 2 OF 3', 'A protein', 'A long thread of beads.', 'Each bead is one amino acid.'], ['RUNG 3 OF 3', 'Amino acid', 'An alpha carbon, four groups.', 'H, amino, carboxyl, R group.']],
  av: { who: 'Diya', text: 'Only twenty kinds of beads!', tin: ['Z4', 'variable', 0.5], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [700, 190, 50], build: g => { cell(g, 528, 263, 380, 210); const sq = []; [[700, 190], [380, 150], [420, 360], [690, 360], [560, 120]].forEach(([x, y], i) => sq.push(chain(g, Array.from({ length: 5 }, (_, k) => [x - 40 + k * 20, y + (k % 2 ? 8 : -8)]), AA, 7)));
      return { labs: [[lab(g, 720, 190, 930, 110, 'Protein', 'end'), ['Z2', 'proteins']]] }; } },
    { at: 'Z3', focus: [528, 263, 50], build: g => { const pts = Array.from({ length: 15 }, (_, i) => [108 + i * 60, 263 + 70 * Math.sin(i * 0.7)]); const ch = chain(g, pts, AA, 22);
      return { labs: [[lab(g, pts[7][0], pts[7][1] + 22, 640, 440, 'Amino acid'), ['Z3', 'bead', 0, 1]]], anim: t => ch.b.forEach((b, i) => attr(b, 'r', (22 + 2 * Math.sin(t * 3 + i)).toFixed(1))) }; } },
    { at: 'Z4', build: g => { const c = [528, 263]; P(g, 'M528,263 L528,133 M528,263 L360,263 M528,263 L696,263 M528,263 L528,393', 'none', K.ink, 5);
      circ(g, 528, 263, 46, '#F3E2B3', K.ink, 4); T(g, 528, 274, 'C', 34); T(g, 552, 248, 'α', 20, K.pro);
      circ(g, 528, 123, 30, '#FFFFFF', K.ink, 3); T(g, 528, 134, 'H', 28);
      mk(g, 'rect', { x: 260, y: 233, width: 100, height: 60, rx: 14, fill: '#D6E9F5', stroke: K.wat, 'stroke-width': 3 }); T(g, 304, 274, 'NH', 28); T(g, 340, 284, '2', 18);
      mk(g, 'rect', { x: 696, y: 233, width: 130, height: 60, rx: 14, fill: '#F4C9B0', stroke: K.pro, 'stroke-width': 3 }); T(g, 761, 274, 'COOH', 28);
      const R = circ(g, 528, 413, 36, '#D9A23B', K.ink, 3); T(g, 528, 425, 'R', 30, '#fff');
      return { labs: [[lab(g, 498, 263, 200, 160, 'Alpha carbon', 'end'), ['Z4', 'alpha']], [lab(g, 558, 123, 700, 110, 'Hydrogen'), ['Z4', 'hydrogen']], [lab(g, 310, 293, 220, 380, 'Amino group', 'end'), ['Z4', 'amino', 0, 1]], [lab(g, 761, 293, 840, 380, 'Carboxyl group', 'end'), ['Z4', 'carboxyl']], [lab(g, 564, 413, 700, 470, 'R group (variable)'), ['Z4', 'variable']]],
        anim: t => { const on = t > tm(['Z4', 'variable']); attr(R, 'fill', on ? AA[Math.floor(t * 1.5) % 6] : '#D9A23B'); } }; } }] }));

/* ---------- L: what a cell is made of ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
const BARS = [['Water', 70, 90, K.wat, 0], ['Proteins', 10, 15, K.pro, 1], ['Nucleic acids', 5, 7, K.dna, 2], ['Carbohydrates', 3, 3, K.sug, 3], ['Lipids', 2, 2, '#B8A46A', 3], ['Ions', 1, 1, K.grey, 4]];
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'WHAT A CELL IS MADE OF · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Water', '70 to 90 percent'], ['Proteins', '10 to 15 percent'], ['Nucleic acids', '5 to 7 percent'], ['Carbohydrates · lipids', 'about 3 · about 2 percent'], ['Ions', 'about 1 percent']], LT) }) },
  { pos: 'R', label: 'AVERAGE CELL · % OF TOTAL MASS', pill: ['Water first, proteins next', ['L3', 'next', -0.1], 'ac'], build: (el, s) => {
    const sc = 400 / 90, rows = BARS.map(([n, lo, hi, c], i) => { const y = 96 + i * 62, g = mk(s, 'g', {}); txt(g, 220, y + 26, n, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 22, fill: C.ink });
      mk(g, 'rect', { x: 240, y, width: 400, height: 36, rx: 8, fill: '#F3F1EA' }); const b1 = mk(g, 'rect', { x: 240, y, width: 0, height: 36, rx: 8, fill: c }), b2 = mk(g, 'rect', { x: 240 + lo * sc, y, width: 0, height: 36, fill: c, opacity: 0.4 });
      const v = txt(g, 0, y + 25, lo === hi ? `${lo}%` : `${lo}-${hi}%`, { 'font-size': 20, 'font-weight': 600, fill: C.ink }); return { g, b1, b2, v, lo, hi }; });
    return { anim: t => { const ts = LT.map(tm); rows.forEach((r, i) => { const t0 = ts[BARS[i][4]] + (i === 4 ? 0.8 : 0); const e = M.io((t - t0) / 0.8); r.g.style.opacity = M.clamp((t - t0 + 0.2) / 0.3); attr(r.b1, 'width', (r.lo * sc * e).toFixed(1)); attr(r.b2, 'width', ((r.hi - r.lo) * sc * M.io((t - t0 - 0.6) / 0.6)).toFixed(1)); attr(r.v, 'x', (240 + Math.max(r.hi * sc * Math.max(e, 0.01), 0) + 12).toFixed(1)); }); } }; } }] });

/* ---------- C: build a protein ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'WATCH A PROTEIN BEING BUILT', build: (el, s) => {
  const N = 13, slot = i => [130 + i * 72, 250], pile = Array.from({ length: N }, (_, i) => [1250 + (i % 4) * 60 + (i % 2) * 20, 150 + Math.floor(i / 4) * 60]);
  mk(s, 'rect', { x: 1200, y: 100, width: 330, height: 270, rx: 18, fill: '#FBFAF6', stroke: '#D9D4C7', 'stroke-width': 2, 'stroke-dasharray': '8 6' }); cap(s, 1365, 400, 'FREE AMINO ACIDS', { fill: C.ink });
  const links = mk(s, 'g', {}), L = []; for (let i = 0; i < N - 1; i++) L.push(P(links, `M${slot(i)[0]},250 L${slot(i + 1)[0]},250`, 'none', K.ink, 5));
  const B = Array.from({ length: N }, (_, i) => circ(s, 0, 0, 24, AA[(i * 5 + 2) % 6], K.ink, 3));
  const br = mk(s, 'g', {}); P(br, `M${slot(0)[0] - 24},300 L${slot(0)[0] - 24},316 L${slot(N - 1)[0] + 24},316 L${slot(N - 1)[0] + 24},300`, 'none', C.ac, 3); cap(br, (slot(0)[0] + slot(N - 1)[0]) / 2, 350, 'POLYPEPTIDE · ONE PROTEIN', { fill: C.ac });
  const names = ['Alanine', 'Cysteine', 'Proline', 'Tryptophan', 'Lysine'], pal = names.map((n, i) => { const g = mk(s, 'g', {}); circ(g, 170 + i * 210, 450, 22, AA[i], K.ink, 3); txt(g, 200 + i * 210, 458, n, { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 22, fill: C.ink }); return g; });
  const t20 = div(el, 'chp', { left: '1230px', top: '426px', background: C.ac, color: '#fff' }, '20 types in proteins');
  return { els: [[br, ['C2', 'polypeptide', -0.2], { dy: 8 }], ...pal.map((g, i) => [g, ['C3', names[i].toLowerCase(), -0.15], { ...POP, sc: 0.6 }]), [t20, ['C3', 'twenty', -0.1]]],
    labs: [[lab(s, (slot(3)[0] + slot(4)[0]) / 2, 250, 420, 150, 'Peptide bond'), ['C2', 'peptide']]],
    anim: t => { const a = tm(['C2', 'join']) - 0.3, sh = t > tm(['C3', 'order']) ? Math.floor((t - tm(['C3', 'order'])) * 2) : -1;
      B.forEach((b, i) => { const v = M.io((t - a - i * 0.22) / 0.5), p = pile[i], q = slot(i); attr(b, 'cx', (p[0] + (q[0] - p[0]) * v).toFixed(1)); attr(b, 'cy', (p[1] + (q[1] - p[1]) * v - 60 * Math.sin(v * Math.PI)).toFixed(1)); b.style.opacity = t > tm('C1') ? 1 : 0; attr(b, 'stroke-width', sh >= 0 && sh % N === i ? 6 : 3); });
      L.forEach((l, i) => { l.style.opacity = M.clamp((t - a - (i + 1) * 0.22 - 0.5) / 0.2); }); } }; } }] });

/* ---------- D: homopolymer vs heteropolymer ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'HOMOPOLYMER · ONE KIND OF UNIT', pill: ['Cellulose: glucose only', ['D2', 'Cellulose', -0.1], 'ac'], build: (el, s) => {
    const pts = Array.from({ length: 8 }, (_, i) => [92 + i * 86, 250]), sg = sugars(s, pts, 30); const G = pts.map(p => T(s, p[0], p[1] + 8, 'G', 22, K.sug));
    const scan = mk(s, 'rect', { x: 0, y: 200, width: 86, height: 100, rx: 14, fill: 'none', stroke: C.ac, 'stroke-width': 4 }); cap(s, 392, 360, 'G = GLUCOSE · SAME UNIT, AGAIN AND AGAIN', { fill: C.ink });
    return { els: [[sg.g, ['D2', 'repeats', -0.2], { dy: 10 }]], anim: t => { const a = tm(['D2', 'again']); const i = Math.floor(Math.max(0, t - a) * 3) % 8; attr(scan, 'x', pts[i][0] - 43); scan.style.opacity = t > a ? 1 : 0; } }; } },
  { pos: 'R', label: 'HETEROPOLYMER · MANY KINDS OF UNIT', tin: ['D3', null, -0.2], pill: ['Protein: 20 types', ['D3', 'twenty', -0.1], 'ac'], build: (el, s) => {
    const pts = Array.from({ length: 10 }, (_, i) => [86 + i * 68, 250 + 26 * Math.sin(i * 0.9)]), ch = chain(s, pts, [AA[0], AA[3], AA[1], AA[4], AA[2], AA[5], AA[1], AA[0], AA[4], AA[3]], 26);
    cap(s, 392, 360, 'EACH COLOUR = A DIFFERENT AMINO ACID', { fill: C.ink });
    return { anim: t => ch.b.forEach((b, i) => attr(b, 'transform', `translate(0 ${(5 * Math.sin(t * 3 + i)).toFixed(1)})`)) }; } }] });

/* ---------- U: essential + record holders + think ---------- */
const TH = { q: 'Which amino acids must come from our food?', opts: ['Essential', 'Non-essential'], right: 0, why: 'Essential: the body cannot make them, so food must supply them.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'MADE IN THE BODY OR FROM FOOD?', tout: 'U4', build: (el, s) => {
    const a = mk(s, 'g', {}); P(a, 'M80,200 Q180,300 280,200 Z', '#FBF6EE', K.ink, 3); mk(a, 'ellipse', { cx: 180, cy: 200, rx: 100, ry: 18, fill: '#E2B33C', stroke: K.ink, 'stroke-width': 3 }); arrow(a, 300, 220, 420, 220, C.ac, 4);
    const ab = [0, 1, 2].map(k => circ(a, 460 + k * 44, 220, 18, AA[k], K.ink, 2.5)); T(a, 180, 330, 'From food', 24); T(a, 520, 290, 'Essential', 26, C.ac);
    const b = mk(s, 'g', {}); cell(b, 180, 440, 100, 60); arrow(b, 300, 440, 420, 440, K.grey, 4); [0, 1, 2].forEach(k => circ(b, 460 + k * 44, 440, 18, AA[k + 3], K.ink, 2.5)); T(b, 520, 510, 'Non-essential', 26, K.grey); T(b, 180, 536, 'Body makes them', 20);
    return { els: [[a, ['U2', 'Others', -0.2], { dy: 12 }], [b, ['U2', 'Our'], { dy: 12 }]], anim: t => ab.forEach((e, k) => attr(e, 'transform', `translate(${(6 * Math.sin(t * 2.5 + k)).toFixed(1)} 0)`)) }; } },
  { pos: 'R', label: 'TWO RECORD HOLDERS', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const a = mk(s, 'g', {}); rope(a, 120, 190, 540); T(a, 392, 260, 'Collagen', 30); cap(a, 392, 292, 'MOST ABUNDANT IN THE ANIMAL WORLD', { fill: C.ink });
    const b = mk(s, 'g', {}); P(b, leafD(392, 410, 0.8), '#8CC48F', K.ink, 3); P(b, 'M300,410 L500,410', 'none', '#D8ECD2', 3); T(b, 392, 420, 'RuBisCO', 30, '#1F5E37'); cap(b, 392, 500, 'MOST ABUNDANT IN THE WHOLE BIOSPHERE', { fill: C.ink });
    return { els: [[a, ['U3', 'Collagen', -0.1], { dy: 12 }], [b, ['U3', 'RuBisCO', -0.1], { dy: 12 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'essential', -0.1], why: ['U5', 'body'] })] });

/* ---------- W: protein jobs ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · SIX PROTEINS, SIX JOBS', svg: false, build: el => EP.cols(el, [
  ['PAIR 1 · BUILD AND GUARD', 'Collagen · Antibody', 'GROUND SUBSTANCE · FIGHTS GERMS', s => { rope(s, 40, 145, 230); yAb(s, 380, 150, 1.2); [[330, 70], [440, 80]].forEach(([x, y]) => circ(s, x, y, 12, '#C2445A', K.ink, 2)); }, ['W2', 'Collagen', -0.2], ['W2', 'Collagen'], ['W2', 'antibody']],
  ['PAIR 2 · SIGNAL', 'Insulin · Receptor', 'HORMONE · SENSES SIGNALS', s => { mk(s, 'rect', { x: 20, y: 200, width: 456, height: 40, fill: '#E8D9A8', stroke: '#B8A46A', 'stroke-width': 2 }); P(s, 'M300,200 L300,150 M280,150 L280,130 Q300,110 320,130 L320,150 Z', '#D6E9F5', K.wat, 4); circ(s, 140, 110, 22, '#C77DA0', K.ink, 3); arrow(s, 170, 120, 270, 135, K.ink, 3); txt(s, 140, 70, 'INSULIN', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600 }); txt(s, 380, 280, 'RECEPTOR', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600 }); }, ['W3', 'Insulin', -0.2], ['W3', 'Insulin'], ['W3', 'receptor']],
  ['PAIR 3 · WORK AND CARRY', 'Trypsin · GLUT-4', 'ENZYME · GLUCOSE INTO CELLS', s => { enz(s, 130, 180, 0.7); mk(s, 'rect', { x: 260, y: 150, width: 220, height: 36, fill: '#E8D9A8', stroke: '#B8A46A', 'stroke-width': 2 }); mk(s, 'rect', { x: 350, y: 120, width: 40, height: 96, rx: 10, fill: '#F4C9B0', stroke: K.pro, 'stroke-width': 3 }); hex(s, 370, 80, 16); arrow(s, 370, 230, 370, 270, K.sug, 3); }, ['W4', 'Trypsin', -0.2], ['W4', 'Trypsin'], ['W4', 'GLUT']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['bowl', 'A bowl of dal', 'AT DINNER', ['H1', 'bowl']], ['bone', 'Skin and bones', 'YOUR BODY', ['H1', 'skin']], ['leaf', 'A green leaf', 'IN THE SUN', ['H1', 'leaf']]],
  scenes: S,
  stmt: { l2: 'A <span class="acc">protein</span> is a chain of amino acids.', f: '<span class="lad">linked by <b>peptide bonds</b> · <b>20</b> types of amino acids</span>', t2: ['T1', 'protein', -0.2], tf: ['T1', 'amino'] },
  trap: { wrong: 'Lipids are true macromolecules', right: 'Lipids are small: they come down as vesicles', tWrong: ['X2', 'lipids', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'small', -0.2], tSvg: ['X3', 'vesicles', -0.4],
    build: s => { [[110, 120], [240, 140], [370, 115]].forEach(([x, y]) => { for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; circ(s, x + 46 * Math.cos(a), y + 46 * Math.sin(a), 6, K.wat, K.ink, 1.2); circ(s, x + 30 * Math.cos(a), y + 30 * Math.sin(a), 4, K.wat, K.ink, 1); } }); cap(s, 240, 240, 'MEMBRANE BITS FORM VESICLES', { 'font-size': 14 }); } },
  where: { type: 'Statement or match questions: protein functions, homo and heteropolymers, essential amino acids', at: ['E1', 'statement'] },
  mcq: { q: 'Which pair is matched correctly?<div style="font:500 24px Poppins;line-height:1.5;margin-top:12px"><b>P</b>&nbsp; Collagen - hormone<br><b>Q</b>&nbsp; GLUT-4 - glucose entry into cells<br><b>R</b>&nbsp; Trypsin - fights infectious agents<br><b>S</b>&nbsp; Insulin - an enzyme</div>', opts: ['Pair P', 'Pair Q', 'Pair R', 'Pair S'], right: 1 }, mcqAt: ['Q1', 'Which', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b> (pair Q)', ['A1', 3, 0.1]], ['GLUT-4 lets glucose enter cells', ['A1', 'GLUT']], ['Collagen: not a hormone', ['A2', 'Collagen']], ['Trypsin is an enzyme', ['A3', 'Trypsin']], ['Insulin is a hormone', ['A3', 'insulin']]],
  recap: { title: 'Recap · biomacromolecules and proteins', lines: ['<b>Acid soluble</b>: micromolecules, 18 to about 800 Da', '<b>Acid insoluble</b>: proteins, nucleic acids, polysaccharides, lipids', '<b>Cell</b>: water 70-90% · proteins 10-15% · nucleic acids 5-7%', '<b>Protein</b>: chain of 20 types of amino acids · a heteropolymer', '<b>Essential</b> amino acids come from food · RuBisCO tops the biosphere'] },
  yq: ['Why is a protein called a heteropolymer?', 'Essential vs non-essential amino acids: what is the difference?', 'Which is the most abundant protein in the biosphere?'],
  next: { label: 'NEXT · EP 71', topic: 'Polysaccharides and Nucleic Acids' }
});
})();
