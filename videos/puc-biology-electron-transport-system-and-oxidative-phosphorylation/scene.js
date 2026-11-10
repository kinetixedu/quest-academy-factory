// PUC Biology Ep 89: Electron Transport System and Oxidative Phosphorylation (Living diagram, leaf green). Runner: ep.js + bio9.js + cell8.js + bio11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, circ, T, at, arrow, hex } = B9;
const { K } = B11, B = B11, K8 = window.K8;
const ICN = { drop: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z'] };
const S = [];
const IMS = '#FBE9EC', CXF = '#E9DDF3', CXS = '#7B4B94';
const plantCell = g => { mk(g, 'rect', { x: 140, y: 60, width: 776, height: 410, rx: 36, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 4 }); mk(g, 'rect', { x: 158, y: 78, width: 740, height: 374, rx: 28, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 2.5 });
  mk(g, 'ellipse', { cx: 470, cy: 270, rx: 170, ry: 110, fill: '#D6E9F5', stroke: '#5AA0C8', 'stroke-width': 3 }); K8.nuc(g, 260, 180, 48); [[250, 380, 20], [800, 380, -10]].forEach(([x, y, r]) => K8.chloro(g, x, y, 1.4, r)); [[720, 160, 15], [780, 280, -30], [280, 300, 40]].forEach(([x, y, r]) => K8.mito(g, x, y, 1.5, r)); };
// ATP synthase: F0 in the membrane band (centre x, band y), F1 head below. returns { g, rot (group to rotate) }
const synth = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - 34 * s, y: y - 30 * s, width: 68 * s, height: 60 * s, rx: 10 * s, fill: '#F6D3D9', stroke: K.red, 'stroke-width': 3 }); const rot = mk(G, 'g', {});
  for (let k = -1; k <= 1; k++) P(rot, `M${x + k * 18 * s},${y - 24 * s} L${x + k * 18 * s},${y + 24 * s}`, 'none', K.red, 3); P(G, `M${x},${y + 30 * s} L${x},${y + 66 * s}`, 'none', K.ink, 6 * s);
  const hd = mk(G, 'g', {}); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; circ(hd, x + 30 * s * Math.cos(a), y + 104 * s + 30 * s * Math.sin(a), 20 * s, k % 2 ? '#FBE0C6' : '#F2B57E', K.mi, 2.5); }
  return { g: G, rot, hd }; };

/* ---------- H: the dam ---------- */
S.push(EP.hook({ label: 'THE DAM · AARAV ON HIS BICYCLE', face: 'aarav', pill: ['Your cells have tiny dams', ['H2', 'cells', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Where does the oxygen I breathe go?', ['H3', 'oxygen']], ['How do NADH become ATP?', ['H3', 'NADH', -0.2]]],
  a: [['ANSWER 1', 'Oxygen catches electrons at the end', ['H4', 'catches']], ['ANSWER 2', 'A spinning enzyme makes ATP', ['H4', 'spinning']]],
  chips: [['Electron transport', ['H5', 'electron']], ['Five complexes', ['H5', 'five']], ['ATP synthase', ['H5', 'synthase']], ['ATP per NADH', ['H5', 'many']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EAF4F8' }); mk(s, 'rect', { x: 0, y: 470, width: 784, height: 110, fill: '#9E8F70' });
    mk(s, 'rect', { x: 0, y: 160, width: 300, height: 310, fill: '#7FB3D5' }); P(s, 'M300,130 L360,130 L400,470 L300,470 Z', '#B9B3A6', K.ink, 4);
    const fl = P(s, 'M380,420 C430,420 440,430 466,430', 'none', '#5AA0C8', 14); const tbO = mk(s, 'g', {}), tb = mk(tbO, 'g', {}); circ(tb, 0, 0, 56, '#FFFFFF', K.ink, 4); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; P(tb, `M0,0 L${50 * Math.cos(a)},${50 * Math.sin(a)}`, 'none', K.ink, 5); }
    const town = mk(s, 'g', {}); [[640, 300], [700, 270], [740, 320]].forEach(([x, y], i) => { mk(town, 'rect', { x: x - 22, y, width: 44, height: 470 - y, fill: '#E6E8EE', stroke: K.ink, 'stroke-width': 3 }); for (let k = 0; k < 3; k++) mk(town, 'rect', { x: x - 10, y: y + 16 + k * 40, width: 20, height: 18, fill: '#FBE3A0', stroke: '#C9962B', 'stroke-width': 1.5 }); });
    cap(s, 150, 200, 'WATER HELD HIGH', { fill: '#1F4E6E' });
    return { els: [[fl, ['H1', 'rush', -0.2], { dy: 0, fade: 0.3 }], [tbO, ['H1', 'turbine', -0.2], POP], [town, ['H1', 'electricity', -0.2], { dy: 16 }]],
      anim: t => { at(tb, 520, 430, t > tm(['H1', 'spins']) ? (t - tm(['H1', 'spins'])) * 160 % 360 : 0); } };
  } }));

/* ---------- B: energy carriers ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'NADH AND FADH₂ · CARRIERS OF ELECTRONS', build: (el, s) => {
  const g = mk(s, 'g', {}); hex(g, 130, 280, 56); T(g, 130, 288, 'Glucose', 20, K.sug); const a1 = mk(s, 'g', {}); arrow(a1, 200, 280, 330, 280, K.ink, 4); B.cap(a1, 265, 256, 'GLYCOLYSIS', K.ink, 13); B.cap(a1, 265, 312, 'KREBS CYCLE', K.ink, 13);
  const cr = mk(s, 'g', {}); [[420, 200], [420, 280], [420, 360]].forEach(([x, y], i) => { (i < 2 ? B.nadh : B.fad)(cr, x, y, 24); B.el(cr, x + 62, y - 14, 9); B.el(cr, x + 62, y + 14, 9); });
  const a2 = mk(s, 'g', {}); arrow(a2, 520, 280, 640, 280, K.ink, 4);
  const ch = mk(s, 'g', {}); B.band(ch, 680, 1520, 280, 70); [['I', 760], ['II', 880], ['III', 1040], ['IV', 1220], ['V', 1400]].forEach(([n, x], i) => B.cx(ch, x, 280 + (i === 1 ? 20 : 0), i === 1 ? 70 : 90, i === 1 ? 70 : 120, i === 4 ? '#F6D3D9' : CXF, i === 4 ? K.red : CXS, n, 24));
  const p = div(el, 'pillp ac', { left: '680px', top: '440px' }, 'ETS · in the inner membrane of the mitochondrion');
  return { els: [[g, ['B2', 'Glycolysis', -0.2], POP], [a1, ['B2', 'took', -0.2], { dx: -10, dy: 0 }], [cr, ['B2', 'hold', -0.2], { ...POP, sc: 0.6 }], [a2, ['B3', 'give', -0.2], { dx: -10, dy: 0 }], [ch, ['B3', 'chain', -0.2], { dx: 20, dy: 0 }], [p, ['B3', 'inner', -0.2]]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CELL', 'MITOCHONDRION', 'INNER MEMBRANE'], scales: ['x1,000', 'x20,000', 'x200,000'], ghost: 'EXAMPLE FIGURES', nfs: 42,
  info: [['RUNG 1 OF 3', 'The cell', 'Mitochondria', 'in the cytoplasm.'], ['RUNG 2 OF 3', 'Mitochondrion', 'Two membranes.', 'The inner one folds into cristae.'], ['RUNG 3 OF 3', 'Inner membrane', 'Protein complexes in a row.', 'Space above, matrix below.']],
  av: { who: 'Aarav', text: 'The dam is in there!', tin: ['Z4', 'matrix', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [720, 160, 60], build: g => { plantCell(g); return { labs: [[lab(g, 735, 150, 700, 40, 'Mitochondrion', 'end'), ['Z2', 'mitochondria']], [lab(g, 420, 120, 360, 40, 'Cytoplasm', 'end'), ['Z2', 'cytoplasm']]] }; } },
    { at: 'Z3', focus: [418, 160, 60], build: g => { B.mito(g, 528, 263, 420, 200);
      return { labs: [[lab(g, 250, 112, 330, 40, 'Outer membrane', 'end'), ['Z3', 'two']], [lab(g, 420, 440, 300, 490, 'Inner membrane', 'end'), ['Z3', 'inner']], [lab(g, 655, 200, 790, 490, 'Cristae'), ['Z3', 'cristae']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: K.mat }); mk(g, 'rect', { x: 0, y: 70, width: 1056, height: 220, fill: IMS }); B.band(g, 0, 1056, 70, 34); B.band(g, 0, 1056, 300, 64);
      [['I', 200, 0], ['II', 330, 1], ['III', 500, 0], ['IV', 690, 0], ['V', 880, 2]].forEach(([n, x, k]) => k === 2 ? synth(g, x, 300, 1.2) : B.cx(g, x, 300 + (k ? 18 : 0), k ? 76 : 96, k ? 76 : 130, CXF, CXS, n, 26));
      return { labs: [[lab(g, 120, 200, 60, 150, 'Intermembrane space'), ['Z4', 'intermembrane']], [lab(g, 420, 300, 400, 460, 'Inner membrane', 'end'), ['Z4', 'inner']], [lab(g, 690, 250, 600, 150, 'Protein complexes', 'end'), ['Z4', 'complexes']], [lab(g, 120, 430, 60, 490, 'Matrix'), ['Z4', 'matrix']]] }; } }] }));

/* ---------- L: the electron chain ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE ELECTRON TRANSPORT SYSTEM', svg: false, build: el => ({ anim: EP.steps(el, [['NADH → complex I', 'NADH dehydrogenase → ubiquinone'], ['FADH₂ → complex II', 'its electrons go to ubiquinone too'], ['Ubiquinone → complex III', 'cytochrome bc₁ → cytochrome c'], ['Cytochrome c → complex IV', 'cytochrome c oxidase · a, a₃, 2 Cu'], ['O₂ takes the electrons', 'with hydrogen → water']], LT, 80, 92) }) },
  { pos: 'R', label: 'FOLLOW THE ELECTRONS', build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 66, width: 784, height: 200, fill: IMS }); mk(s, 'rect', { x: 0, y: 330, width: 784, height: 160, fill: K.mat }); B.band(s, 0, 784, 298, 64);
    B.cap(s, 24, 100, 'INTERMEMBRANE SPACE', K.red, 13, 'start'); B.cap(s, 24, 476, 'MATRIX', K.mi, 13, 'start');
    const X = { I: 100, II: 220, UQ: 300, III: 390, c: 470, IV: 560, V: 690 };
    const cI = B.cx(s, X.I, 298, 84, 130, CXF, CXS, 'I', 24), cII = B.cx(s, X.II, 316, 64, 64, CXF, CXS, 'II', 22), uq = mk(s, 'g', {}); mk(uq, 'ellipse', { cx: X.UQ, cy: 298, rx: 26, ry: 18, fill: '#FCEBC0', stroke: '#B8901F', 'stroke-width': 3 }); T(uq, X.UQ, 304, 'UQ', 15, '#8A6A10', { 'font-family': 'IBM Plex Mono', 'font-weight': 700 });
    const cIII = B.cx(s, X.III, 298, 84, 130, CXF, CXS, 'III', 24), cc = mk(s, 'g', {}); circ(cc, X.c, 222, 22, '#F6D3D9', K.red, 3); T(cc, X.c, 229, 'c', 20, K.red, { 'font-weight': 700 }); const cIV = B.cx(s, X.IV, 298, 84, 130, CXF, CXS, 'IV', 24); const sy = synth(s, X.V, 298, 0.9); T(s, X.V, 250, 'V', 22, K.red, { 'font-weight': 700 });
    const nd = B.nadh(s, X.I, 430, 20), fd = B.fad(s, X.II, 430, 20); const ow = mk(s, 'g', {}); B.o2(ow, X.IV - 20, 440, 22); arrow(ow, X.IV + 6, 440, X.IV + 46, 440, K.ink, 3); B.tag(ow, X.IV + 92, 440, 'H₂O', K.o2L, K.o2, 18);
    const segs = [[[X.I, 410], [X.I, 300], [X.UQ, 298]], [[X.II, 410], [X.II, 316], [X.UQ, 298]], [[X.UQ, 298], [X.III, 298], [X.III, 250], [X.c, 222]], [[X.c, 222], [X.IV, 250], [X.IV, 300]], [[X.IV, 300], [X.IV - 20, 420]]];
    const pth = segs.map(pts => P(s, 'M' + pts.map(p => p.join(',')).join(' L'), 'none', K.el, 3, { 'stroke-dasharray': '6 6' })); const es = [0, 1, 2].map(() => B.el(s, 0, 0, 9));
    return { els: [[nd, ['L2', 'NADH', -0.2], POP], [fd, ['L3', 'FADH', -0.2], POP], [ow, ['L6', 'water', -0.3], POP], ...pth.map((p, i) => [p, LT[i], { dy: 0, fade: 0.3 }])],
      anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
        [cI, cII, uq, cIII, cc, cIV].forEach((e, i) => { const act = [[0], [1], [2, 3, 4], [4, 5], [5]][Math.max(c, 0)] || []; e.style.opacity = c < 0 || act.includes(i) ? 1 : 0.55; });
        es.forEach((e, k) => { if (c < 0) { e.style.opacity = 0; return; } const u = ((t - ts[c]) * 0.6 + k / 3) % 1, q = B9.pt(pth[c], u); at(e, q.x, q.y); e.style.opacity = Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2); }); } }; } }] });

/* ---------- C: ATP synthase ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'COMPLEX V · ATP SYNTHASE', build: (el, s) => {
  mk(s, 'rect', { x: 0, y: 70, width: 1100, height: 180, fill: IMS }); mk(s, 'rect', { x: 0, y: 310, width: 1100, height: 270, fill: K.mat }); B.band(s, 0, 1100, 280, 64);
  const sy = synth(s, 760, 280, 1.5); const hp = Array.from({ length: 18 }, () => B.hp(s, 0, 0, 13)); const fl = [0, 1].map(() => B.hp(s, 0, 0, 13));
  const pr = [0, 1, 2].map(() => B.atp(s, 0, 0, 20)); const ad = mk(s, 'g', {}); B.tag(ad, 560, 380, 'ADP + Pi', '#E6E8EE', '#4B5563', 18);
  const ch = [['F₀: a channel in the membrane', 'channel'], ['F₁: the head piece makes ATP', 'head'], ['2 H⁺ pass for each ATP', 'two']].map(([t0, w], i) => [div(el, 'chp', { left: '1140px', top: 150 + i * 80 + 'px', height: '60px', width: '420px', fontSize: '22px' }, t0), w]);
  const dm = div(el, 'pillp ac', { left: '1140px', top: '420px' }, 'Like water behind a dam');
  return { els: [[ad, ['C3', 'ADP', -0.2], POP], [dm, ['C2', 'dam', -0.2]], ...ch.map(([e, w]) => [e, ['C3', w, -0.2], { dx: 16, dy: 0 }])],
    labs: [[lab(s, 200, 180, 300, 120, 'Intermembrane space'), ['C2', 'intermembrane']], [lab(s, 160, 280, 260, 420, 'Inner membrane'), ['C2', 'pushes']], [lab(s, 760 + 45, 280, 960, 140, 'F₀'), ['C3', 'channel']], [lab(s, 760 - 70, 450, 560, 530, 'F₁ head piece', 'end'), ['C3', 'head']]],
    anim: t => { const a = tm(['C2', 'pushes']), n = M.clamp((t - a) / 3) * 18; hp.forEach((e, k) => { at(e, 60 + (k * 113) % 600 + 6 * Math.sin(t * 2 + k), 110 + (k * 47) % 110 + 5 * Math.cos(t * 1.6 + k)); e.style.opacity = k < n ? 1 : 0; });
      const f = tm(['C3', 'flow']), on = t > f; attr(sy.rot, 'transform', on ? `translate(${(8 * Math.sin((t - f) * 6)).toFixed(1)} 0)` : ''); attr(sy.hd, 'transform', on ? `rotate(${((t - f) * 90 % 360).toFixed(1)} 760 436)` : '');
      fl.forEach((e, k) => { const u = ((t - f) * 0.7 + k / 2) % 1; at(e, 760 + (k ? 14 : -14), 180 + 200 * u); e.style.opacity = on ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; });
      const m = tm(['C3', 'ATP']); pr.forEach((e, k) => { const u = M.clamp((t - m - k * 0.7) / 1.2); at(e, 860 + 80 * u + k * 70 * u, 500 - 20 * u); e.style.opacity = t > m + k * 0.7 ? 1 : 0; }); } }; } }] });

/* ---------- D: two kinds of phosphorylation ---------- */
const mini = (s, light) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 260, y: 140, width: 500, height: 120, fill: light ? '#EEF7E9' : IMS }); mk(g, 'rect', { x: 260, y: 300, width: 500, height: 140, fill: light ? '#F3F7EA' : K.mat }); B.band(g, 260, 760, 280, 44);
  for (let k = 0; k < 8; k++) B.hp(g, 300 + (k * 61) % 300, 170 + (k * 29) % 80, 11); const sy = synth(g, 640, 280, 0.8); B.atp(g, 700, 420, 18);
  if (light) { circ(g, 140, 210, 46, '#FBE3A0', '#C9962B', 4); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; P(g, `M${140 + 58 * Math.cos(a)},${210 + 58 * Math.sin(a)} L${140 + 74 * Math.cos(a)},${210 + 74 * Math.sin(a)}`, 'none', '#C9962B', 4); } B.cap(g, 140, 310, 'LIGHT ENERGY', '#B8901F', 15); }
  else { B.nadh(g, 140, 200, 22); B.el(g, 200, 240, 9); B.el(g, 220, 220, 9); B.cap(g, 140, 310, 'OXIDATION-REDUCTION', K.nadh, 14); }
  arrow(g, 210, 260, 300, 260, K.ink, 3); return g; };
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'PHOTOPHOSPHORYLATION · PHOTOSYNTHESIS', pill: ['Light builds the proton gradient', ['D2', 'light', -0.1]], build: (el, s) => { const g = mini(s, true); return { els: [[g, ['D2', 'photosynthesis', -0.2], { dy: 12 }]] }; } },
  { pos: 'R', label: 'OXIDATIVE PHOSPHORYLATION · RESPIRATION', tin: ['D3', null, -0.2], pill: ['Both use ATP synthase', ['D3', 'Both', -0.1], 'ac'], build: (el, s) => { const g = mini(s, false); return { els: [[g, ['D3', 'respiration', -0.2], { dy: 12 }]] }; } }] });

/* ---------- U: ATP per carrier + think ---------- */
const TH = { q: 'Which gives more ATP: one NADH or one FADH₂?', opts: ['One NADH', 'One FADH₂'], right: 0, why: 'One NADH gives 3 ATP. One FADH₂ gives only 2.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'ONE NADH', tout: 'U4', build: (el, s) => { const n = B.nadh(s, 392, 170, 40); const a = [0, 1, 2].map(k => B.atp(s, 222 + k * 170, 340, 34)); const r = div(el, '', { position: 'absolute', left: '0', top: '430px', width: '784px', textAlign: 'center', font: "600 44px 'IBM Plex Mono'", color: K.atp }, '= 3 ATP');
    return { els: [[n, ['U2', 'NADH', -0.2], POP], ...a.map((e, k) => [e, ['U2', 'three', -0.3 + k * 0.15], { ...POP, sc: 0.4 }]), [r, ['U2', 'ATP', -0.1], { dy: 10 }]] }; } },
  { pos: 'R', label: 'ONE FADH₂', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => { const n = B.fad(s, 392, 170, 40); const a = [0, 1].map(k => B.atp(s, 307 + k * 170, 340, 34)); const r = div(el, '', { position: 'absolute', left: '0', top: '430px', width: '784px', textAlign: 'center', font: "600 44px 'IBM Plex Mono'", color: K.atp }, '= 2 ATP');
    const sk = div(el, 'chp', { left: '36px', top: '76px', fontSize: '19px' }, 'skips complex I · enters at complex II');
    return { els: [[n, ['U3', 'FADH', -0.2], POP], ...a.map((e, k) => [e, ['U3', 'two', 0, 1], { ...POP, sc: 0.4 }]), [r, ['U3', 'ATP', -0.1], { dy: 10 }], [sk, ['U3', 'skip', -0.2]]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'NADH', -0.1], why: ['U5', 'three'] })] });

/* ---------- W: the matrix carriers of one glucose ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · 8 NADH AND 2 FADH₂ FROM THE MATRIX', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · NADH', '8 × 3 = 24 ATP', 'EIGHT NADH, THREE EACH', s => { for (let k = 0; k < 8; k++) B.nadh(s, 90 + (k % 4) * 105, 90 + Math.floor(k / 4) * 90, 20); }, ['W2', 'Eight', -0.2], ['W2', 'twenty'], ['W2', 'ATP']],
  ['STEP 2 · FADH₂', '2 × 2 = 4 ATP', 'TWO FADH₂, TWO EACH', s => { B.fad(s, 170, 140, 26); B.fad(s, 326, 140, 26); }, ['W3', 'Two', -0.2], ['W3', 'four'], ['W3', 'ATP']],
  ['STEP 3 · ADD', '24 + 4 = 28 ATP', 'FROM THE MATRIX CARRIERS ALONE', s => { T(s, 248, 165, '28 ATP', 64, K.atp, { 'font-family': 'IBM Plex Mono' }); }, ['W4', 'Twenty', -0.2], ['W4', 'eight'], ['W4', 'alone']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['drop', 'Water in a dam', 'HELD HIGH', ['H1', 'dam']], ['gear', 'Through a turbine', 'IT SPINS', ['H1', 'turbine']], ['zap', 'Electricity', 'FOR A WHOLE TOWN', ['H1', 'electricity']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Oxygen</span> comes in only at the very end.', f: '<span class="lad">NADH → I → UQ → III → cyt c → IV → <b>O₂ → H₂O</b></span>', t2: ['T1', 'Oxygen', -0.2], tf: ['T1', 'end'] },
  trap: { wrong: 'Oxygen is used in the Krebs cycle', right: 'Oxygen works only at the end of the ETS', tWrong: ['X2', 'oxygen', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'end', -0.2], tSvg: ['X3', 'Still', -0.3],
    build: s => { B.band(s, 20, 440, 120, 40); ['I', 'III', 'IV'].forEach((n, i) => B.cx(s, 80 + i * 120, 120, 56, 80, CXF, CXS, n, 18)); B.o2(s, 370, 200, 20); arrow(s, 392, 200, 420, 200, K.ink, 3); cap(s, 230, 262, 'OXYGEN: THE LAST STOP', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: the complexes, cytochrome c, ATP synthase, ATP per NADH and FADH₂', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Complex IV has cytochromes a and a₃ and two copper centres.<br>II. Ubiquinone receives electrons from both NADH and FADH₂.<br>III. F₁ is the channel through which protons cross the membrane.<br>IV. For each ATP made, 2 H⁺ pass through F₀.</div>', opts: ['I, II and III only', 'I, II and IV only', 'II and III only', 'III and IV only'], right: 1 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['I: a, a₃ and two copper centres', ['A2', 'Complex']], ['II: ubiquinone takes both', ['A2', 'Ubiquinone']], ['IV: 2 H⁺ through F₀ per ATP', ['A2', 'protons']], ['III is wrong: F₀ is the channel', ['A3', 'wrong']]],
  recap: { title: 'Recap · ETS and ATP synthase', lines: ['<b>ETS</b>: in the inner mitochondrial membrane', '<b>Chain</b>: I → UQ → III → cyt c → IV · FADH₂ enters at II', '<b>Oxygen</b>: the final hydrogen acceptor · forms water', '<b>ATP synthase (V)</b>: F₀ channel · F₁ makes ATP · 2 H⁺ per ATP', '<b>Yield</b>: 1 NADH → 3 ATP · 1 FADH₂ → 2 ATP'] },
  yq: ['Where in the mitochondrion is the ETS?', 'What is the final hydrogen acceptor?', 'How many ATP does one NADH give?'],
  next: { label: 'NEXT · EP 90', topic: 'Respiratory Balance Sheet, Amphibolic Pathway and Respiratory Quotient' }
});
})();
