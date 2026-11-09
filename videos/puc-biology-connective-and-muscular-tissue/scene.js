// PUC Biology Ep 57: Connective and Muscular Tissue (Living diagram, leaf green). Runner: ep.js, cells: cells.js
(() => {
const { C, mk, txt, cap, POP, lab, pol, tm, div, mix, attr } = EP;
const { CF, CS, NU } = CE;
const SK = '#E8B48F', SKd = '#B9805C', RED = '#C0392B', RBC = '#D9534F', MUS = '#D9776B', MUSd = '#9E3B33', BON = '#F3EBD9', BONs = '#A89270', TEN = '#FBFAF4', COL = '#E7A8A0', ELA = '#5A4A78', CART = '#DCE6EE', CARTs = '#7C93A8', FAT = '#FBEFC4', FATs = '#C9A53A', CB = C.ac;
const circ = (g, x, y, r, f, s = '#2E2A24', w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
const P = (g, d, f, s = '#2E2A24', w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
const wav = (x0, x1, y, A = 5, n = 8) => { let d = `M${x0},${y}`; const w = (x1 - x0) / n; for (let k = 0; k < n; k++) d += ` q${w / 2},${k % 2 ? A * 2 : -A * 2} ${w},0`; return d; };
// small tissue drawings (fit roughly in w x h at x,y)
const areolar = (g, x, y, w, h) => { mk(g, 'rect', { x, y, width: w, height: h, rx: 10, fill: '#FBF1EC' }); for (let k = 0; k < 5; k++) P(g, wav(x + 10, x + w - 10, y + 14 + k * (h - 28) / 4 + (k % 2) * 6, 4, 6 + k), 'none', COL, 4); for (let k = 0; k < 4; k++) P(g, `M${x + 20 + k * w / 4},${y + 8} L${x + 50 + k * w / 4},${y + h - 8}`, 'none', ELA, 1.6);
  for (let k = 0; k < 5; k++) { const cx = x + 30 + k * (w - 60) / 4, cy = y + h * (k % 2 ? 0.3 : 0.7); mk(g, 'ellipse', { cx, cy, rx: 14, ry: 7, fill: CF, stroke: CS, 'stroke-width': 1.6 }); mk(g, 'ellipse', { cx, cy, rx: 5, ry: 3, fill: NU }); } };
const adipose = (g, x, y, w, h, r = 22) => { const n = Math.floor(w / (2 * r)), m = Math.max(1, Math.floor(h / (1.8 * r))); for (let j = 0; j < m; j++) for (let i = 0; i < n - (j % 2); i++) { const cx = x + r + i * 2 * r + (j % 2) * r, cy = y + r + j * 1.75 * r; circ(g, cx, cy, r - 1, FAT, FATs, 2); mk(g, 'ellipse', { cx: cx + r * 0.62, cy: cy - r * 0.2, rx: r * 0.2, ry: r * 0.32, fill: NU }); } };
const dense = (g, x, y, w, h, n = 6) => { for (let k = 0; k < n; k++) P(g, wav(x, x + w, y + 8 + k * (h - 16) / (n - 1), 3, 10), 'none', COL, 7); for (let k = 0; k < n - 1; k++) for (let i = 0; i < 3; i++) mk(g, 'ellipse', { cx: x + 40 + i * (w - 80) / 2 + (k % 2) * 40, cy: y + 8 + (k + 0.5) * (h - 16) / (n - 1), rx: 13, ry: 3.5, fill: NU }); };
const cartilage = (g, x, y, w, h) => { mk(g, 'rect', { x, y, width: w, height: h, rx: 14, fill: CART, stroke: CARTs, 'stroke-width': 2 }); const nx = Math.max(2, Math.floor(w / 70)), ny = Math.max(1, Math.floor(h / 60));
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const cx = x + (i + 0.5) * w / nx + (j % 2 ? 12 : -12), cy = y + (j + 0.5) * h / ny; mk(g, 'ellipse', { cx, cy, rx: 20, ry: 14, fill: '#fff', stroke: CARTs, 'stroke-width': 2 }); const two = (i + j) % 2; for (let q = 0; q <= two; q++) { const ox = two ? (q ? 7 : -7) : 0; mk(g, 'circle', { cx: cx + ox, cy, r: 6, fill: '#B9C9F0', stroke: NU, 'stroke-width': 1.5 }); mk(g, 'circle', { cx: cx + ox, cy, r: 2.5, fill: NU }); } } };
const osteon = (g, cx, cy, R) => { circ(g, cx, cy, R, BON, BONs, 2.5); for (let k = 1; k <= 3; k++) circ(g, cx, cy, R * (1 - k * 0.22), 'none', BONs, 1.5); circ(g, cx, cy, R * 0.16, '#E9C9B8', RED, 2); for (let k = 0; k < 8; k++) { const [px, py] = pol(cx, cy, R * (0.45 + 0.22 * (k % 2)), k * Math.PI / 4 + 0.3); mk(g, 'ellipse', { cx: px, cy: py, rx: 5, ry: 3, fill: NU, transform: `rotate(${k * 45 + 107} ${px} ${py})` }); } };
const bone = (g, x, y, w, h) => { mk(g, 'rect', { x, y, width: w, height: h, rx: 10, fill: '#EFE4CB' }); const R = Math.min(h / 2 - 4, 46), n = Math.floor(w / (2 * R + 8)); for (let i = 0; i < n; i++) osteon(g, x + R + 6 + i * (w - 2 * R - 12) / Math.max(1, n - 1), y + h / 2, R); };
// an arm with elbow angle (deg from straight down), biceps bulge b 0..1
const arm = (g, sx, sy, L1, L2) => { const up = P(g, `M${sx},${sy} L${sx},${sy + L1}`, 'none', SK, 54); const fo = P(g, '', 'none', SK, 46); const bi = mk(g, 'ellipse', { cx: sx + 14, cy: sy + L1 * 0.45, rx: 30, ry: L1 * 0.32, fill: MUS, stroke: MUSd, 'stroke-width': 3 });
  const hand = circ(g, 0, 0, 26, SK, SKd, 3);
  return (ang, b) => { const a = ang * Math.PI / 180, ex = sx, ey = sy + L1, hx = ex + L2 * Math.sin(a), hy = ey + L2 * Math.cos(a); attr(fo, 'd', `M${ex},${ey} L${hx.toFixed(1)},${hy.toFixed(1)}`); attr(hand, 'cx', hx.toFixed(1)); attr(hand, 'cy', hy.toFixed(1)); attr(bi, 'rx', (30 + 18 * b).toFixed(1)); attr(bi, 'ry', (L1 * (0.32 - 0.06 * b)).toFixed(1)); attr(bi, 'cx', (sx + 14 + 10 * b).toFixed(1)); return [hx, hy]; }; };

const S = [];
/* ---------- H: the heavy bag ---------- */
S.push(EP.hook({ label: 'AFTER SCHOOL', face: 'aarav', pill: ['Tissues that hold, pull or flow', ['H2', 'hold', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['What joins a muscle to a bone?', ['H3', 'joins']], ['How can blood, a liquid, be a tissue?', ['H3', 'blood']]],
  a: [['ANSWER 1', 'Connective tissue · links and supports', ['H4', 'Connective']], ['ANSWER 2', 'Muscle tissue · contracts and pulls', ['H4', 'muscle']]],
  chips: [['Loose', ['H5', 'loose']], ['Dense', ['H5', 'dense']], ['Specialised', ['H5', 'specialised']], ['Cartilage', ['H5', 'cartilage']], ['Bone', ['H5', 'bone']], ['Blood', ['H5', 'blood']], ['Three muscles', ['H5', 'three']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#EEF3F6' }); mk(s, 'rect', { x: 0, y: 470, width: 784, height: 110, fill: '#D9C7A8' });
    mk(s, 'rect', { x: 40, y: 110, width: 200, height: 300, rx: 8, fill: '#FFFFFF', stroke: '#CBD0DA', 'stroke-width': 3 }); for (let k = 0; k < 4; k++) mk(s, 'line', { x1: 60, y1: 160 + k * 60, x2: 220, y2: 160 + k * 60, stroke: '#E1E5EC', 'stroke-width': 3 });
    const f = arm(s, 380, 120, 180, 170);
    const bag = mk(s, 'g', {}); P(bag, 'M-70,0 L70,0 L80,150 Q80,170 60,170 L-60,170 Q-80,170 -80,150 Z', '#3E7FB8', '#24507A', 4); P(bag, 'M-30,0 C-30,-40 30,-40 30,0', 'none', '#24507A', 8); mk(bag, 'rect', { x: -50, y: 60, width: 100, height: 50, rx: 10, fill: '#5C9BD1', stroke: '#24507A', 'stroke-width': 3 });
    const tag = cap(s, 600, 140, 'BICEPS AT WORK', { fill: MUSd });
    return { fades: [[tag, ['H3', 'felt']]], anim: t => { const k = M.io((t - tm(['H3', 'lifted'])) / 1.2), w = k * (0.85 + 0.15 * Math.sin(t * 2)); const [hx, hy] = f(25 + 95 * w, w); attr(bag, 'transform', `translate(${hx.toFixed(1)} ${(hy + 20).toFixed(1)})`); } };
  } }));

/* ---------- B: what is connective tissue ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT MAKES A TISSUE CONNECTIVE?', ghost: true, pill: ['Collagen: strength · Elastin: stretch', ['B3', 'Collagen', -0.1, 1], 'ac'], build: (el, s) => {
  const K = [['Tendons', 'tendons'], ['Cartilage', 'cartilage'], ['Bone', 'bone'], ['Fat', 'fat'], ['Blood', 'blood']].map(([w], i) => div(el, 'chp', { left: 36 + (i % 3) * 200 + 'px', top: 230 + Math.floor(i / 3) * 62 + 'px', width: '184px', justifyContent: 'center' }, w));
  const big = div(el, '', { position: 'absolute', left: '36px', top: '96px', width: '620px', font: '700 40px Manrope', color: C.ink, lineHeight: '1.15' }, 'The most common tissue.<br><span style="color:' + CB + '">It links and supports.</span>');
  const ex = cap(s, 330, 400, 'FOUND ALL OVER THE BODY', { fill: C.ink });
  // matrix box
  const bx = 760, by = 90, bw = 780, bh = 370; mk(s, 'rect', { x: bx, y: by, width: bw, height: bh, rx: 18, fill: '#FBF1EC', stroke: '#E6CFC6', 'stroke-width': 2 });
  const cg = mk(s, 'g', {}); for (let k = 0; k < 4; k++) P(cg, wav(bx + 20, bx + bw - 20, by + 70 + k * 80, 6, 9 + k), 'none', COL, 9);
  const eg = mk(s, 'g', {}); [[bx + 80, by + 30, bx + 260, by + 340], [bx + 300, by + 340, bx + 470, by + 20], [bx + 520, by + 30, bx + 720, by + 330], [bx + 140, by + 200, bx + 690, by + 160]].forEach(([a, b, c, d]) => P(eg, `M${a},${b} Q${(a + c) / 2 + 40},${(b + d) / 2 - 30} ${c},${d}`, 'none', ELA, 2.5));
  const fb = mk(s, 'g', {}); [[bx + 160, by + 110], [bx + 420, by + 190], [bx + 640, by + 110], [bx + 260, by + 280], [bx + 560, by + 290]].forEach(([x, y]) => { P(fb, `M${x - 40},${y} Q${x},${y - 18} ${x + 40},${y} Q${x},${y + 18} ${x - 40},${y} Z`, CF, CS, 2); mk(fb, 'ellipse', { cx: x, cy: y, rx: 12, ry: 6, fill: NU }); });
  return { els: [[big, ['B2', 'Connective', -0.1], { dy: 16 }], ...K.map((e, i) => [e, ['B2', 'widely', 0.1 + i * 0.12]]), [ex, ['B2', 'widely', 0.2]], [fb, ['B3', 'cells', -0.1], { ...POP, sc: 0.8 }], [cg, ['B3', 'collagen', -0.1], { dy: 0, fade: 0.3 }], [eg, ['B3', 'elastin', -0.1], { dy: 0, fade: 0.3 }]],
    labs: [[lab(s, bx + 160, by + 110, bx + 150, by - 6 + 50, 'Fibroblast'), ['B3', 'cells']], [lab(s, bx + 360, by + 230 + 4, bx + 380, by + 330, 'Collagen fibre'), ['B3', 'collagen']], [lab(s, bx + 470, by + 20 + 18, bx + 600, by + 50, 'Elastin'), ['B3', 'elastin']]],
    anim: t => { const s1 = t > tm(['B3', 'Elastin', 0, 1]) ? 0.04 * Math.sin((t - tm(['B3', 'Elastin', 0, 1])) * 4) : 0; attr(eg, 'transform', `translate(${bx + bw / 2} ${by + bh / 2}) scale(${(1 + s1).toFixed(3)} ${(1 - s1).toFixed(3)}) translate(${-bx - bw / 2} ${-by - bh / 2})`); } }; } }] });

/* ---------- Z: zoom ladder into the arm ---------- */
S.push(EP.zoom({ to: 'L1', names: ['UPPER ARM', 'ELBOW', 'TENDON'], scales: ['x1', 'x5', 'x400'],
  info: [['RUNG 1 OF 3', 'Upper arm', 'A big muscle lies over the bone.', 'It bends the arm at the elbow.'], ['RUNG 2 OF 3', 'Tendon', 'A tough white cord at the elbow.', 'It joins the muscle to the bone.'], ['RUNG 3 OF 3', 'Dense regular', 'Collagen fibres in parallel rows.', 'Very strong when pulled.']],
  av: { who: 'Aarav', text: 'Rows of fibres, like a rope!', tin: ['Z5', 'strong', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [700, 300, 64], build: g => {
      P(g, 'M180,250 L760,250 L760,350 L180,350 Z', SK, SKd, 4); P(g, 'M180,268 L800,268 Q840,300 800,332 L180,332 Z', BON, BONs, 3);
      P(g, 'M230,262 C300,160 600,160 680,262 Z', MUS, MUSd, 3); for (let k = 0; k < 5; k++) P(g, `M${280 + k * 70},${222 - (k === 2 ? 20 : 0)} L${300 + k * 70},258`, 'none', MUSd, 1.5);
      return { labs: [[lab(g, 450, 200, 450, 90, 'Biceps muscle'), ['Z2', 'muscle']], [lab(g, 400, 310, 400, 440, 'Bone'), ['Z2', 'bone']]] }; } },
    { at: 'Z3', focus: [600, 290, 60], build: g => {
      P(g, 'M40,330 L1010,330 L1010,420 L40,420 Z', BON, BONs, 4);
      P(g, 'M40,330 L40,120 C200,100 360,130 470,220 L560,300 L560,330 Z', MUS, MUSd, 4); for (let k = 0; k < 6; k++) P(g, `M${60 + k * 70},${130 + k * 6} C${200 + k * 50},${150 + k * 15} ${340 + k * 20},${210 + k * 10} ${470 + k * 10},${250 + k * 8}`, 'none', MUSd, 1.6);
      const td = P(g, 'M470,220 C560,250 640,280 700,330 L620,330 C580,300 530,290 470,280 Z', TEN, '#9A9488', 3); for (let k = 0; k < 3; k++) P(g, `M${480},${232 + k * 16} C${560},${256 + k * 10} ${620},${286 + k * 6} ${660 + k * 10},${330}`, 'none', '#C9C2B2', 1.5);
      return { labs: [[lab(g, 250, 200, 250, 70, 'Muscle'), ['Z3', 'muscle']], [lab(g, 600, 290, 760, 190, 'Tendon'), ['Z3', 'tendon']], [lab(g, 820, 375, 860, 470, 'Bone'), ['Z3', 'bone']]] }; } },
    { at: 'Z4', build: g => {
      mk(g, 'rect', { x: 120, y: 90, width: 820, height: 340, rx: 16, fill: '#FBF7F1' });
      const rows = []; for (let k = 0; k < 7; k++) rows.push(P(g, wav(150, 910, 120 + k * 47, 4, 14), 'none', COL, 16));
      for (let k = 0; k < 6; k++) for (let i = 0; i < 3; i++) { const x = 260 + i * 250 + (k % 2) * 110, y = 143 + k * 47; mk(g, 'ellipse', { cx: x, cy: y, rx: 26, ry: 6, fill: NU }); }
      const ar = mk(g, 'g', {}); P(ar, 'M110,260 l-70,0 m14,-14 l-14,14 l14,14', 'none', CB, 6); P(ar, 'M950,260 l70,0 m-14,-14 l14,14 l-14,14', 'none', CB, 6);
      return { labs: [[lab(g, 500, 120 + 2 * 47, 560, 40, 'Collagen fibres'), ['Z4', 'collagen']], [lab(g, 510, 143 + 3 * 47, 380, 486, 'Fibroblast'), ['Z4', 'fibroblast']]], els: [[ar, ['Z5', 'pulled', -0.2], { dy: 0, fade: 0.2 }]],
        anim: t => { const p = t > tm(['Z5', 'pulled']) ? 0.5 + 0.5 * Math.sin((t - tm(['Z5', 'pulled'])) * 3) : 0; rows.forEach(r => attr(r, 'transform', `translate(530 0) scale(${(1 + 0.02 * p).toFixed(3)} 1) translate(-530 0)`)); attr(ar, 'transform', ''); } }; } }] }));

/* ---------- L: five connective tissues ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'CONNECTIVE TISSUE · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Loose: areolar', 'cells, fibres in jelly · under the skin'], ['Adipose', 'loose · cells store fat · under the skin'], ['Dense', 'tendon: muscle-bone · ligament: bone-bone', 18], ['Cartilage', 'bends · chondrocytes · nose, ear, backbone', 18], ['Bone', 'hard · calcium salts · osteocytes in lacunae', 18]], LT) }) },
  { pos: 'R', label: 'FIVE CONNECTIVE TISSUES', build: (el, s) => {
    const D = [['AREOLAR', areolar], ['ADIPOSE', (g, x, y, w, h) => adipose(g, x, y, w, h, 20)], ['DENSE', (g, x, y, w, h) => dense(g, x, y, w, h, 5)], ['CARTILAGE', cartilage], ['BONE', bone]];
    const R = D.map(([n, f], i) => { const g = mk(s, 'g', {}), y = 74 + i * 98; f(g, 250, y, 490, 84); txt(g, 220, y + 50, n, { 'text-anchor': 'end', 'font-size': 17, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }); return g; });
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); R.forEach((g, i) => { g.style.opacity = (c < 0 ? 0.25 : i === c ? 1 : i < c ? 0.45 : 0.18).toFixed(2); }); } }; } }] });

/* ---------- C: blood ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'BLOOD · A FLUID CONNECTIVE TISSUE', pill: ['Made in the bone marrow', ['C4', 'marrow', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 30, y: 100, width: 724, height: 190, rx: 95, fill: '#F7E0A8', stroke: RED, 'stroke-width': 5 }); const pl = cap(s, 392, 128, 'PLASMA · THE LIQUID PART', { fill: '#9A7420' });
    const cl = mk(mk(s, 'clipPath', { id: 'bvc' }), 'rect', { x: 34, y: 104, width: 716, height: 182, rx: 91 }); const G = mk(s, 'g', { 'clip-path': 'url(#bvc)' });
    const rb = [], wb = [], pt = []; for (let k = 0; k < 9; k++) { const g = mk(G, 'g', {}); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 24, ry: 15, fill: RBC, stroke: '#9E2A26', 'stroke-width': 2 }); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 10, ry: 5, fill: '#E98680' }); rb.push({ g, y: 160 + (k % 3) * 45, k }); }
    for (let k = 0; k < 2; k++) { const g = mk(G, 'g', {}); circ(g, 0, 0, 24, '#F1ECF8', '#7A5BB0', 2.5); P(g, 'M-12,-4 C-8,-14 4,-12 2,-2 C10,0 12,10 2,10 C-6,12 -14,6 -12,-4 Z', '#9A82C8', 'none', 0); wb.push({ g, y: 190 + k * 40, k }); }
    for (let k = 0; k < 6; k++) { const g = mk(G, 'g', {}); P(g, 'M-6,-3 L4,-5 L7,2 L-2,5 Z', '#B07AB8', '#7A4A86', 1.5); pt.push({ g, y: 150 + (k % 3) * 55, k }); }
    const bg = mk(s, 'g', {}); P(bg, 'M60,380 Q40,350 70,340 Q100,330 110,360 L620,360 Q630,330 660,340 Q690,350 670,380 Q690,410 660,420 Q630,430 620,400 L110,400 Q100,430 70,420 Q40,410 60,380 Z', BON, BONs, 3); mk(bg, 'rect', { x: 150, y: 368, width: 430, height: 24, rx: 12, fill: '#D9534F', opacity: 0.85 }); cap(bg, 365, 450, 'INSIDE SOME BONES: BONE MARROW', { fill: C.ink });
    const nb = []; for (let k = 0; k < 4; k++) nb.push(mk(s, 'ellipse', { cx: 0, cy: 0, rx: 12, ry: 8, fill: RBC }));
    const mv = (o, sp, sz) => { const t = o.t, x = ((t * sp + o.k * 97) % 860) - 50; attr(o.g, 'transform', `translate(${x.toFixed(1)} ${(o.y + 6 * Math.sin(t + o.k)).toFixed(1)})`); };
    return { els: [[G, ['C2', 'plasma', 0.6], { dy: 0, fade: 0.4 }], [pl, ['C2', 'plasma', -0.1], { dy: 8 }], [bg, ['C4', 'marrow', -0.4], { dy: 20 }]],
      anim: t => { const tr = tm(['C3', 'red']), tw = tm(['C3', 'white']), tp = tm(['C3', 'platelets']);
        rb.forEach(o => { o.t = t; mv(o, 70); o.g.style.opacity = M.clamp((t - tr + 0.3) / 0.4); }); wb.forEach(o => { o.t = t; mv(o, 55); o.g.style.opacity = M.clamp((t - tw + 0.3) / 0.4); }); pt.forEach(o => { o.t = t; mv(o, 80); o.g.style.opacity = M.clamp((t - tp + 0.3) / 0.4); });
        const tm0 = tm(['C4', 'marrow']); nb.forEach((e, k) => { const v = (t * 0.4 + k / 4) % 1; attr(e, 'cx', (220 + k * 100).toFixed(1)); attr(e, 'cy', (380 - 80 * v).toFixed(1)); e.style.opacity = t > tm0 ? Math.min(1, 5 * (1 - v)) : 0; }); } }; } },
  { pos: 'R', label: 'WHAT FLOATS IN BLOOD', svg: false, build: el => {
    const R = [['Plasma', 'the liquid part', 'LIQUID', ['C2', 'plasma']], ['Red blood cells', 'carry oxygen', 'RBC', ['C3', 'red']], ['White blood cells', 'fight germs', 'WBC', ['C3', 'white']], ['Platelets', 'help blood clot', 'CLOT', ['C3', 'platelets']]].map(([n, d, k, at], i) => [div(el, 'rw', { top: 84 + i * 100 + 'px' }, `<div class="rn">${n}</div><div class="rd">${d}</div><div class="rk">${k}</div>`), at]);
    const f = div(el, 'pillp ac', { left: '36px', top: '494px' }, 'Carries substances around the body');
    return { els: [...R.map(([e, at]) => [e, [at[0], at[1], -0.1], { dx: -16, dy: 0 }]), [f, ['C4', 'carries', -0.1]]] }; } }] });

/* ---------- D: muscle contracts ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [{ pos: 'W', label: 'MUSCLE TISSUE · CONTRACT AND RELAX', build: (el, s) => {
  const ch = EP.chain(el, [['FIBRES', ['D2', 'fibres']], ['MYOFIBRILS', ['D2', 'myofibrils']], ['CONTRACT', ['D3', 'contract']], ['RELAX', ['D4', 'relax']]]);
  const fg = mk(s, 'g', {}); const FB = []; for (let k = 0; k < 4; k++) { const y = 170 + k * 70; FB.push(mk(fg, 'rect', { x: 80, y, width: 700, height: 60, rx: 30, fill: MUS, stroke: MUSd, 'stroke-width': 3 })); }
  const mf = mk(s, 'g', {}); for (let k = 0; k < 4; k++) for (let j = 0; j < 4; j++) P(mf, `M100,${180 + k * 70 + j * 12} L760,${180 + k * 70 + j * 12}`, 'none', '#F3B9B0', 2.5);
  const sh = cap(s, 430, 480, 'SHORTER + THICKER = PULL', { fill: MUSd }), lg = cap(s, 430, 480, 'LONGER AGAIN', { fill: CB });
  const ag = mk(s, 'g', {}); P(ag, 'M1040,110 L1460,110', 'none', '#D9DEE6', 4); const f = arm(ag, 1180, 120, 200, 170); const bag = circ(ag, 0, 0, 12, '#3E7FB8', '#24507A', 3);
  cap(s, 1240, 486, 'THE BICEPS BENDS THE ARM', { fill: C.ink });
  const kf = t => { const tc = tm(['D3', 'contract']), tr = tm(['D4', 'relax']); return t < tc ? 0 : t < tr ? M.io((t - tc) / 0.8) : 0.5 + 0.5 * Math.cos((t - tr) * 2.4); };
  return { els: [[fg, ['D2', 'fibres', -0.2], { dx: -30, dy: 0 }], [mf, ['D2', 'myofibrils', -0.1], { dy: 0, fade: 0.3 }], [ag, ['D2', 'side', 0], { dx: 40, dy: 0 }]],
    labs: [[lab(s, 700, 200, 860, 140, 'Muscle fibre'), ['D2', 'fibres']], [lab(s, 700, 402, 860, 440, 'Myofibrils'), ['D2', 'myofibrils']]],
    anim: t => { const k = kf(t), on = t > tm(['D3', 'contract']); attr(fg, 'transform', `translate(430 300) scale(${(1 - 0.22 * k).toFixed(3)} ${(1 + 0.12 * k).toFixed(3)}) translate(-430 -300)`); attr(mf, 'transform', fg.getAttribute('transform'));
      sh.style.opacity = on && k > 0.5 ? 1 : 0; lg.style.opacity = t > tm(['D4', 'relax']) && k <= 0.5 ? 1 : 0; ch.run(t, tm('D1') + 0.3);
      const [hx, hy] = f(30 + 115 * k, k); attr(bag, 'cx', hx.toFixed(1)); attr(bag, 'cy', (hy + 26).toFixed(1)); } }; } }] });

/* ---------- U: three kinds of muscle + think ---------- */
const TH = { q: 'Your stomach wall churns food, and you never decide to do it. Which muscle is that?', opts: ['Skeletal', 'Smooth'], right: 1, why: 'Smooth muscle. It lines the stomach wall and works without our control.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'THREE KINDS OF MUSCLE', tout: 'U4', build: (el, s) => {
    const cols = [];
    const pane = (i, name, chip, at) => { const x = 36 + i * 516; mk(s, 'rect', { x, y: 76, width: 496, height: 300, rx: 16, fill: '#FAF8F5', stroke: '#E6E2DA', 'stroke-width': 2 }); const g = mk(s, 'g', {});
      const n = div(el, '', { position: 'absolute', left: x + 'px', top: '392px', width: '496px', textAlign: 'center', font: '700 30px Manrope', color: C.ink }, name); const c = div(el, 'chp', { left: x + 248 + 'px', top: '440px', transform: 'translateX(-50%)', fontSize: '16px', fontFamily: 'IBM Plex Mono', letterSpacing: '.04em', whiteSpace: 'nowrap' }, chip);
      cols.push({ g, n, c, at }); return g; };
    // skeletal: striped cylinders with nuclei at the edge
    const g1 = pane(0, 'Skeletal', 'STRIATED · VOLUNTARY', ['U1', 'Skeletal']); for (let k = 0; k < 3; k++) { const y = 110 + k * 82; mk(g1, 'rect', { x: 70, y, width: 430, height: 66, rx: 33, fill: MUS, stroke: MUSd, 'stroke-width': 2.5 }); for (let j = 0; j < 26; j++) mk(g1, 'line', { x1: 96 + j * 15, y1: y + 6, x2: 96 + j * 15, y2: y + 60, stroke: MUSd, 'stroke-width': j % 2 ? 1.2 : 3 }); for (let j = 0; j < 4; j++) mk(g1, 'ellipse', { cx: 130 + j * 100 + k * 20, cy: y + 8, rx: 14, ry: 5, fill: NU }); }
    // smooth: spindle cells, central nucleus, no stripes
    const g2 = pane(1, 'Smooth', 'NO STRIPES · INVOLUNTARY', ['U2', 'Smooth']); for (let k = 0; k < 5; k++) for (let j = 0; j < 2; j++) { const x = 590 + j * 170 + (k % 2) * 90, y = 120 + k * 52; P(g2, `M${x},${y} Q${x + 85},${y - 24} ${x + 170},${y} Q${x + 85},${y + 24} ${x},${y} Z`, '#F0A79D', MUSd, 2); mk(g2, 'ellipse', { cx: x + 85, cy: y, rx: 18, ry: 5, fill: NU }); }
    // cardiac: branched striped cells joined by intercalated discs
    const g3 = pane(2, 'Cardiac', 'STRIATED · HEART ONLY', ['U3', 'Cardiac']); const disc = [];
    for (let r = 0; r < 3; r++) { const y = 116 + r * 86; for (let j = 0; j < 3; j++) { const x = 1090 + j * 135 + (r % 2) * 50; mk(g3, 'rect', { x, y, width: 125, height: 58, rx: 10, fill: '#E8857A', stroke: MUSd, 'stroke-width': 2 }); for (let q = 0; q < 8; q++) mk(g3, 'line', { x1: x + 12 + q * 15, y1: y + 6, x2: x + 12 + q * 15, y2: y + 52, stroke: MUSd, 'stroke-width': 1.5 }); mk(g3, 'ellipse', { cx: x + 65, cy: y + 29, rx: 13, ry: 8, fill: NU }); if (j < 2) disc.push(mk(g3, 'rect', { x: x + 123, y: y + 2, width: 10, height: 54, rx: 3, fill: '#2E2A24' })); }
      if (r < 2) mk(g3, 'rect', { x: 1180 + (r % 2) * 50, y: y + 56, width: 26, height: 32, fill: '#E8857A', stroke: MUSd, 'stroke-width': 2 }); }
    return { els: cols.flatMap(o => [[o.g, [o.at[0], o.at[1], -0.2], { ...POP, sc: 0.85 }], [o.n, [o.at[0], o.at[1], -0.1], { dy: 10 }], [o.c, [o.at[0], o.at[1], 0.6], { dy: 8 }]]),
      anim: t => { const td = tm(['U3', 'intercalated']), b = t > td ? 1 + 0.04 * Math.max(0, Math.sin((t - td) * 5)) : 1; attr(g3, 'transform', `translate(1284 226) scale(${b.toFixed(3)}) translate(-1284 -226)`); disc.forEach(d => attr(d, 'fill', t > td ? CB : '#2E2A24')); } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Which', -0.1], why: ['U5', 'lines'] })] });

/* ---------- W: three body parts ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE TISSUE', svg: false, build: el => EP.cols(el, [
  ['PART 1 · TIP OF THE NOSE', 'Cartilage', 'SOLID BUT BENDY · CHONDROCYTES', s => cartilage(s, 40, 40, 416, 210), ['W2', 'First', -0.1], ['W2', 'Cartilage', -0.1], ['W2', 'Cartilage', 0.2]],
  ['PART 2 · THE KNEE', 'Ligament', 'DENSE · JOINS BONE TO BONE', s => { P(s, 'M150,20 L250,20 L250,110 Q250,135 200,135 Q150,135 150,110 Z', BON, BONs, 3); P(s, 'M150,270 L250,270 L250,180 Q250,155 200,155 Q150,155 150,180 Z', BON, BONs, 3); [140, 252].forEach(x => mk(s, 'rect', { x: x - 8, y: 95, width: 22, height: 100, rx: 8, fill: TEN, stroke: '#9A9488', 'stroke-width': 2.5 })); dense(s, 300, 90, 170, 110, 4); txt(s, 385, 230, 'LIGAMENT', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2, 'font-weight': 600 }); }, ['W3', 'Second', -0.1], ['W3', 'ligament', -0.1], ['W3', 'ligament', 0.2]],
  ['PART 3 · UNDER THE SKIN', 'Adipose tissue', 'LOOSE · CELLS STORE FAT', s => { mk(s, 'rect', { x: 30, y: 20, width: 436, height: 26, fill: SK, stroke: SKd, 'stroke-width': 2 }); adipose(s, 40, 52, 420, 220, 26); }, ['W4', 'Third', -0.1], ['W5', 'adipose', -0.1], ['W5', 'loose']]]) }] });

EP.run({
  icons: { rope: ['M2 12c2-2 4 2 6 0s4 2 6 0 4 2 6 0', 'M2 9l3 3-3 3', 'M22 9l-3 3 3 3'], bag: ['M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z', 'M9 8V6a3 3 0 0 1 6 0v2', 'M8 13h8'], drop: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z'] },
  jobs: [['rope', 'Tug of war', 'MUSCLES PULL', ['H1', 'tug']], ['bag', 'A heavy bag', 'BONES SUPPORT', ['H1', 'heavy']], ['drop', 'A cut finger', 'BLOOD FLOWS', ['H1', 'cut']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Cartilage</span> bends. Bone does not.', f: '<span class="lad"><b>cartilage</b>: chondrocytes · <b>bone</b>: osteocytes in lacunae</span>', t2: ['T1', 'Cartilage', -0.2], tf: ['T1', 'Bone', -0.1] },
  trap: { wrong: 'A tendon joins bone to bone', right: 'Tendon: muscle to bone · Ligament: bone to bone', tWrong: ['X2', 'mix', -0.2], tStrike: ['X3', null, -0.05], tRight: ['X3', 'muscle', -0.3], tSvg: ['X3', 'ligament', -0.4],
    build: s => { P(s, 'M20,60 L130,60 Q160,90 130,120 L20,120 Z', MUS, MUSd, 2.5); mk(s, 'rect', { x: 130, y: 82, width: 70, height: 16, rx: 6, fill: TEN, stroke: '#9A9488', 'stroke-width': 2 }); P(s, 'M200,62 L300,62 Q320,90 300,118 L200,118 Z', BON, BONs, 2.5);
      P(s, 'M20,160 L120,160 Q140,190 120,218 L20,218 Z', BON, BONs, 2.5); mk(s, 'rect', { x: 120, y: 182, width: 80, height: 16, rx: 6, fill: TEN, stroke: '#9A9488', 'stroke-width': 2 }); P(s, 'M200,160 L300,160 Q320,190 300,218 L200,218 Z', BON, BONs, 2.5);
      cap(s, 380, 96, 'TENDON', { fill: '#1F6B3F', 'font-size': 15 }); cap(s, 380, 196, 'LIGAMENT', { fill: '#1F6B3F', 'font-size': 15 }); cap(s, 230, 256, 'BOTH: DENSE REGULAR', { 'font-size': 14 }); } },
  where: { type: 'Statement or match questions: tendons, ligaments, cartilage, three kinds of muscle', at: ['E1', 'statement'] },
  mcq: { q: 'Which of these statements are correct?<div class="sl"><b>I</b>Tendons join bone to bone.</div><div class="sl"><b>II</b>Adipose tissue stores fat.</div><div class="sl"><b>III</b>Smooth muscle is voluntary.</div><div class="sl"><b>IV</b>Intercalated discs let heart cells act as a unit.</div>',
    opts: ['I and II only', 'II and IV only', 'I and III only', 'II, III and IV only'], right: 1 }, mcqAt: ['Q1', 'Read', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b> (II, IV)', ['A1', 3, 0.1]], ['<b style="color:var(--red)">I</b>: tendons join muscle to bone', ['A2', 'Tendons']], ['<b style="color:var(--red)">III</b>: smooth muscle is involuntary', ['A2', 'Smooth']], ['<b style="color:var(--ok)">II</b>: adipose tissue stores fat', ['A3', 'Adipose']], ['<b style="color:var(--ok)">IV</b>: heart cells contract as a unit', ['A3', 'intercalated']]],
  recap: { title: 'Recap · connective and muscular tissue', lines: ['<b>Connective</b>: links, supports · collagen (strength) + elastin (stretch)', '<b>Loose</b>: areolar, adipose (fat) · <b>Dense</b>: tendon, ligament', '<b>Cartilage</b>: bends, chondrocytes · <b>Bone</b>: hard, osteocytes', '<b>Blood</b>: fluid · plasma + RBCs, WBCs, platelets', '<b>Muscle</b>: skeletal · smooth (involuntary) · cardiac (heart)'] },
  yq: ['What does a ligament join?', 'Name the cells of cartilage and of bone.', 'Which muscle is found only in the heart?'],
  next: { label: 'NEXT · EP 58', topic: 'A frog never drinks water: Frog, Morphology and Anatomy' }
});
})();
