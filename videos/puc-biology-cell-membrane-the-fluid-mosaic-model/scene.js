// PUC Biology Ep 63: Cell Membrane - The Fluid Mosaic Model (Living diagram, leaf green). Runner: ep.js, drawings: cell8.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, E, wrap, blob } = K8, CC = K8.C, CB = C.ac;
const sl = (g, px, py, lx, ly, s, an = 'start') => lab(g, px, py, lx, ly, s, an, 'sl2');
const SOL = '#C9962B', WAT = '#5AA0C8', NA = '#7B4BB5', KK = '#D0632F';
const prot = (g, x, y, rx, ry, ph = 0) => P(g, blob(rx, ry, 9, 0.08, ph), K8.PROf, K8.PRO, 3, { transform: `translate(${x} ${y})` });
// vertical membrane centred at x (bilayer rotated)
const vmem = (p, x, y0, y1, s = 0.8) => { const g = mk(p, 'g', { transform: `rotate(90 ${x} ${(y0 + y1) / 2})` }); K8.bilayer(g, x - (y1 - y0) / 2, x + (y1 - y0) / 2, (y0 + y1) / 2, s); return g; };
const ion = (g, s, f) => { const o = mk(g, 'g', {}); CC(o, 0, 0, 17, f, 'none', 0); txt(o, 0, 6, s, { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, fill: '#fff' }); return o; };
const mv = (e, x, y) => attr(e, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);

const S = [];
/* ---------- H: kitchen ---------- */
S.push(EP.hook({ label: 'THE KITCHEN', face: 'diya', pill: ['Oil never mixes with water', ['H2', 'oil', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [["What is a cell's skin made of?", ['H3', 'what']], ['How does it choose what gets in?', ['H3', 'decide']]],
  a: [['ANSWER 1', 'Mainly lipids and proteins', ['H4', 'lipids']], ['ANSWER 2', 'It is selectively permeable', ['H4', 'selectively']]],
  chips: [['How it is built', ['H5', 'built']], ['Fluid mosaic model', ['H5', 'fluid']], ['Transport', ['H5', 'cross']], ['With and without energy', ['H5', 'energy']]],
  build: (el, s) => {
    const a = mk(s, 'g', {}); P(a, 'M70,170 L90,400 L230,400 L250,170', '#E3F0F8', '#5A7A90', 4); mk(a, 'rect', { x: 78, y: 220, width: 164, height: 12, fill: '#D6E9F5' }); E(a, 160, 222, 50, 12, '#F2D36B', '#B59A2A', 3); cap(a, 160, 450, 'OIL ON WATER', { fill: C.ink });
    const b = mk(s, 'g', {}); const bb = CC(b, 392, 280, 90, '#EAF0FF', '#6F8FD0', 4); P(b, 'M340,230 C360,205 395,198 420,206', 'none', '#FFFFFF', 6); cap(b, 392, 450, 'SOAP BUBBLE', { fill: C.ink });
    const c = mk(s, 'g', {}); mk(c, 'rect', { x: 520, y: 380, width: 240, height: 24, rx: 6, fill: '#E9DCC2', stroke: '#8A6A3A', 'stroke-width': 2 });
    [[580, 330], [690, 320], [630, 250]].forEach(([x, y]) => { CC(c, x, y, 48, '#5E9A4E', '#2E5A24', 3); CC(c, x, y, 40, '#DCEFC8', 'none', 0); for (let k = 0; k < 6; k++) CC(c, x + 22 * Math.cos(k), y + 22 * Math.sin(k), 3, '#F3F7EA', 'none', 0); });
    const salt = mk(c, 'g', {}); for (let k = 0; k < 14; k++) mk(salt, 'rect', { x: 560 + (k * 37) % 170, y: 240 + (k * 23) % 110, width: 5, height: 5, fill: '#FFFFFF', stroke: '#9AA0AC', 'stroke-width': 1 });
    const dr = mk(c, 'g', {}); [[548, 360], [720, 356], [640, 300], [600, 210]].forEach(([x, y]) => P(dr, `M${x},${y - 12} C${x + 8},${y} ${x + 8},${y + 8} ${x},${y + 8} C${x - 8},${y + 8} ${x - 8},${y} ${x},${y - 12} Z`, '#BFE0F5', WAT, 2)); cap(c, 640, 450, 'SALTED CUCUMBER', { fill: C.ink });
    return { els: [[a, ['H1', 'oil', -0.1], { ...POP, sc: 0.6 }], [b, ['H1', 'soap', -0.1], { ...POP, sc: 0.6 }], [c, ['H1', 'cucumber', -0.2], { ...POP, sc: 0.6 }], [dr, ['H2', 'wet', -0.2], { ...POP, sc: 0.3 }]],
      anim: t => attr(bb, 'r', (90 + 3 * Math.sin(t * 2.4)).toFixed(1)) };
  } }));

/* ---------- B: how we know ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'HOW SCIENTISTS FOUND OUT', build: (el, s) => {
  const em = mk(s, 'g', {}); mk(em, 'rect', { x: 120, y: 150, width: 90, height: 230, rx: 14, fill: '#7D8898', stroke: '#2E2A24', 'stroke-width': 3 }); mk(em, 'rect', { x: 80, y: 380, width: 300, height: 40, rx: 6, fill: '#5E6A7A', stroke: '#2E2A24', 'stroke-width': 3 }); mk(em, 'rect', { x: 230, y: 250, width: 120, height: 90, rx: 8, fill: '#2E3440', stroke: '#2E2A24', 'stroke-width': 3 }); P(em, 'M245,300 C265,280 285,320 305,300 S330,290 340,300', 'none', '#9FE0B0', 3);
  txt(em, 230, 470, 'ELECTRON MICROSCOPE · 1950s', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.ink });
  const rb = mk(s, 'g', {}); CC(rb, 700, 260, 90, '#E07A85', '#A8323F', 4); CC(rb, 700, 260, 40, '#EBA0A8', 'none', 0); txt(rb, 700, 400, 'HUMAN RED BLOOD CELL', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.ink });
  const bar = (y, w, c, n, v, at) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 1000, y, width: 520, height: 46, rx: 8, fill: '#F1EFE8' }); const r = mk(g, 'rect', { x: 1000, y, width: 0, height: 46, rx: 8, fill: c }); txt(g, 1000, y - 14, n, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.ink }); txt(g, 1520, y - 14, v, { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 600, fill: c }); return { g, r, w, at }; };
  const B = [bar(220, 520 * 0.52, K8.PRO, 'Protein', 'about 52%', ['B3', 'fifty']), bar(330, 520 * 0.40, '#B9A36A', 'Lipid', 'about 40%', ['B3', 'forty'])];
  const ch = div(el, 'chp', { left: '1000px', top: '430px', background: 'var(--ac2)', color: '#1F6B3F' }, 'Mainly lipids and proteins');
  return { els: [[em, ['B2', 'electron', -0.2], { ...POP, sc: 0.7 }], [rb, ['B3', 'red', -0.2], { ...POP, sc: 0.6 }], [ch, ['B3', 'mainly', -0.1]], ...B.map(b => [b.g, [b.at[0], b.at[1], -0.2], { dx: -16, dy: 0 }])],
    anim: t => B.forEach(b => attr(b.r, 'width', (b.w * M.io((t - tm(b.at)) / 0.8)).toFixed(1))) }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CELL', 'MEMBRANE', 'PHOSPHOLIPID'], scales: ['x1000', 'x100000', 'x1000000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'A cell', 'A thin line all around it.', 'That line is the membrane.'], ['RUNG 2 OF 3', 'Bilayer', 'Two layers of lipids.', 'Mostly phospholipids.'], ['RUNG 3 OF 3', 'Phospholipid', 'A polar head, two tails.', 'Tails keep away from water.']],
  av: { who: 'Diya', text: 'Just like the oil drop!', tin: ['Z5', 'oil', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [770, 263, 60], build: g => { const A = K8.animal(g, 528, 263, 1.15);
      return { labs: [[lab(g, 528 + 200 * 1.15, 263, 830, 120, 'Cell membrane'), ['Z2', 'membrane']]], anim: t => attr(A.mem, 'stroke-width', t > tm(['Z2', 'membrane']) ? 8 : 4) }; } },
    { at: 'Z3', focus: [505, 190, 50], build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 140, fill: '#E3F0F8' }); mk(g, 'rect', { x: 0, y: 386, width: 1056, height: 140, fill: '#E3F0F8' }); K8.bilayer(g, 0, 1056, 263, 1.6);
      cap(g, 528, 60, 'WATER OUTSIDE', { fill: WAT }); cap(g, 528, 480, 'WATER INSIDE', { fill: WAT });
      return { labs: [[lab(g, 1000, 263, 860, 120, 'Lipid bilayer', 'end'), ['Z3', 'bilayer']], [lab(g, 505, 190, 300, 100, 'Phospholipid', 'end'), ['Z3', 'phospholipids']]] }; } },
    { at: 'Z4', build: g => { const p = K8.plip(g, 528, 130, 5.2, 1); const wd = mk(g, 'g', {}); [[400, 80], [650, 70], [420, 180], [640, 190], [528, 40]].forEach(([x, y]) => CC(wd, x, y, 10, '#D6E9F5', WAT, 2));
      return { labs: [[lab(g, 560, 120, 720, 90, 'Polar head · loves water'), ['Z4', 'polar']], [lab(g, 550, 330, 700, 380, 'Two tails · hydrophobic'), ['Z4', 'hydrophobic']]], els: [[wd, ['Z4', 'loves', -0.2], { ...POP, sc: 0.3 }]] }; } }] }));

/* ---------- L: build the membrane ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'BUILD THE MEMBRANE · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Bilayer', 'phospholipids · heads out, tails in'], ['Cholesterol', 'also sits inside the membrane'], ['Integral proteins', 'partly or totally buried in it'], ['Peripheral proteins', 'lie on the surface'], ['Carbohydrates', 'protein and lipid amounts vary by cell type']], LT) }) },
  { pos: 'R', label: 'THE MEMBRANE, PIECE BY PIECE', build: (el, s) => {
    const bl = mk(s, 'g', {}); K8.bilayer(bl, 40, 744, 300, 1.0);
    const ch = mk(s, 'g', {}); [130, 300, 450, 640].forEach(x => { mk(ch, 'rect', { x: x - 5, y: 266, width: 10, height: 28, rx: 4, fill: K8.CHO, stroke: '#8A6A1E', 'stroke-width': 1.5 }); mk(ch, 'rect', { x: x + 14, y: 306, width: 10, height: 28, rx: 4, fill: K8.CHO, stroke: '#8A6A1E', 'stroke-width': 1.5 }); });
    const ip = mk(s, 'g', {}); prot(ip, 220, 300, 46, 82, 1); prot(ip, 545, 300, 40, 76, 3);
    const pp = mk(s, 'g', {}); E(pp, 390, 226, 36, 18, K8.PROf, K8.PRO, 3); E(pp, 670, 374, 36, 18, K8.PROf, K8.PRO, 3);
    const cb = mk(s, 'g', {}); [[220, 220], [467, 246]].forEach(([x, y]) => { P(cb, `M${x},${y} L${x},${y - 30} L${x - 15},${y - 50} M${x},${y - 30} L${x + 15},${y - 48} L${x + 15},${y - 64}`, 'none', K8.CARB, 4); [[x - 15, y - 50], [x + 15, y - 64], [x, y - 30]].forEach(([a, b]) => CC(cb, a, b, 6, '#9FD09A', K8.CARB, 2)); });
    const LG = [0, 1, 2, 3, 4].map(() => mk(s, 'g', {}));
    const L = [[sl(LG[0], 125, 254, 60, 150, 'Phospholipid'), 0, ['L2', 'phospholipids']], [sl(LG[1], 300, 280, 330, 470, 'Cholesterol'), 1, ['L3', 'cholesterol']], [sl(LG[2], 545, 360, 560, 480, 'Integral protein'), 2, ['L4', 'integral']], [sl(LG[3], 390, 210, 430, 120, 'Peripheral protein'), 3, ['L5', 'peripheral']], [lab(LG[4], 235, 156, 235, 92, 'Carbohydrate', 'middle', 'sl2'), 4, ['L6', 'carbohydrates']]];
    return { els: [[bl, ['L2', 'Two', -0.2], { dy: 0, fade: 0.5 }], [ch, ['L3', 'cholesterol', -0.2], { ...POP, sc: 0.4 }], [ip, ['L4', 'integral', -0.2], { dy: -40 }], [pp, ['L5', 'peripheral', -0.2], { dy: -30 }], [cb, ['L6', 'carbohydrates', -0.2], { ...POP, sc: 0.4 }]], labs: L.map(([l, , at]) => [l, at]),
      anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); LG.forEach((g, k) => g.style.opacity = c > k ? 0.3 : 1); } }; } }] });

/* ---------- C: fluid mosaic ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE FLUID MOSAIC MODEL', build: (el, s) => {
  const nm = div(el, '', { position: 'absolute', left: '36px', top: '70px', font: '700 34px Poppins', color: C.ink, whiteSpace: 'nowrap' }, 'Singer and Nicolson <span style="color:var(--ac)">· 1972</span>');
  const bl = mk(s, 'g', {}); K8.bilayer(bl, 40, 1560, 290, 0.85);
  const pr = [[260, 44, 74], [620, 38, 70], [980, 46, 76], [1320, 40, 72]].map(([x, rx, ry], k) => { const g = mk(s, 'g', {}), gi = mk(g, 'g', {}); prot(gi, 0, 0, rx, ry, k); mv(gi, x, 290); return { g, gi, x, k }; });
  const ar = mk(s, 'g', {}); P(ar, 'M560,170 L680,170 M560,170 l14,-10 M560,170 l14,10 M680,170 l-14,-10 M680,170 l-14,10', 'none', CB, 4);
  const fl = div(el, 'chp', { left: '760px', top: '148px', background: 'var(--ac2)', color: '#1F6B3F' }, 'Proteins drift sideways: fluidity');
  const F = [['Cell growth', ['C3', 'growth']], ['Joins between cells', ['C3', 'joins']], ['Secretion', ['C3', 'secretion']], ['Endocytosis', ['C4', 'endocytosis']], ['Cell division', ['C4', 'division']]].map(([w, at], i) => [div(el, 'chp', { left: 40 + i * 310 + 'px', top: '470px', width: '290px', justifyContent: 'center' }, w), [at[0], at[1], -0.1]]);
  return { els: [[nm, ['C1', 'Singer', -0.2], { dy: 10 }], [bl, ['C1', 'picture', -0.2], { dy: 0, fade: 0.4 }], ...pr.map(p => [p.g, ['C2', 'proteins', -0.3 + p.k * 0.1], { ...POP, sc: 0.5 }]), [ar, ['C2', 'sideways', -0.2], { dy: 0 }], [fl, ['C2', 'fluidity', -0.2]], ...F],
    anim: t => { const on = Math.max(0, t - tm(['C2', 'proteins'])); pr.forEach(p => mv(p.gi, p.x + 70 * Math.sin(on * 0.7 + p.k * 1.7), 290)); } }; } }] });

/* ---------- D: passive (left) and active (right) ---------- */
S.push({ id: 'D', from: 'D1', to: 'U4', cards: [
  { pos: 'L', label: 'PASSIVE TRANSPORT · NO ENERGY', pill: ['Higher to lower · no ATP', ['D2', 'higher', -0.1], 'ac'], build: (el, s) => {
    vmem(s, 392, 90, 470, 0.7); cap(s, 200, 110, 'HIGHER', { fill: C.ink }); cap(s, 590, 110, 'LOWER', { fill: C.ink });
    const so = [], wa = []; for (let k = 0; k < 12; k++) so.push(CC(s, 0, 0, 8, '#F6E7B8', SOL, 2.5)); for (let k = 0; k < 8; k++) wa.push(CC(s, 0, 0, 7, '#D6E9F5', WAT, 2.5));
    const cp = mk(s, 'g', {}); prot(cp, 392, 400, 30, 52, 2); const pm = mk(s, 'rect', { x: -9, y: -9, width: 18, height: 18, fill: '#D1495B', transform: 'rotate(45)' }); const pmg = mk(s, 'g', {}); pmg.appendChild(pm);
    const pos = (k, t, t0, n, y0, dy) => { const loc = (k * 0.37) % 1, el2 = Math.max(0, t - t0); const cross = k % 3 === 0 ? M.clamp((el2 * 0.18 + loc) % 1.4) : 0; const x = 110 + 160 * ((k * 0.61) % 1) + 18 * Math.sin(t * 1.3 + k) + 380 * cross; return [x, y0 + dy * ((k * 0.43) % 1) + 10 * Math.cos(t * 1.1 + k)]; };
    return { labs: [[lab(s, 420, 400, 560, 470, 'Carrier protein'), ['D4', 'carrier']]], els: [[cp, ['D4', 'carrier', -0.2], { ...POP, sc: 0.5 }]],
      anim: t => { const a = tm(['D2', 'Neutral']), b = tm(['D3', 'Water']), c = tm(['D4', 'carrier']);
        so.forEach((e, k) => { const [x, y] = pos(k, t, a, 12, 150, 110); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = t > a - 0.3 ? 1 : 0; });
        wa.forEach((e, k) => { const [x, y] = pos(k + 1, t, b, 8, 290, 60); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = t > b - 0.3 ? 1 : 0; });
        const v = ((t - c) * 0.35) % 1; mv(pmg, 180 + 420 * (v < 0 ? 0 : v), 400); pmg.style.opacity = t > c ? 1 : 0; } }; } },
  { pos: 'R', label: 'ACTIVE TRANSPORT · USES ATP', tin: ['U1', null, -0.2], pill: ['Lower to higher · uses ATP', ['U2', 'active', -0.1], 'ac'], build: (el, s) => {
    vmem(s, 392, 90, 470, 0.7); cap(s, 200, 110, 'OUTSIDE', { fill: C.ink }); cap(s, 590, 110, 'INSIDE', { fill: C.ink });
    const pu = prot(s, 392, 280, 56, 110, 4); const atp = mk(s, 'g', {}); mk(atp, 'rect', { x: 470, y: 330, width: 80, height: 40, rx: 10, fill: '#F6E7B8', stroke: SOL, 'stroke-width': 2 }); txt(atp, 510, 357, 'ATP', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: '#8A6A1E' });
    const na = [0, 1, 2].map(() => ion(s, 'Na+', NA)), kk = [0, 1].map(() => ion(s, 'K+', KK));
    const lg = mk(s, 'g', {}); const l1 = ion(lg, 'Na+', NA), l2 = ion(lg, 'K+', KK); mv(l1, 200, 430); mv(l2, 470, 430); txt(lg, 225, 436, 'pumped out', { 'font-family': 'Poppins', 'font-size': 18, 'font-weight': 600, fill: NA }); txt(lg, 495, 436, 'pumped in', { 'font-family': 'Poppins', 'font-size': 18, 'font-weight': 600, fill: KK });
    return { labs: [[sl(s, 420, 200, 470, 140, 'Sodium potassium pump'), ['U3', 'sodium']]], els: [[atp, ['U2', 'ATP', -0.2], { ...POP, sc: 0.4 }], [lg, ['U3', 'pumps', -0.2], { dy: 8 }]],
      anim: t => { const t0 = tm(['U3', 'sodium']); const v = ((t - t0) / 2.6) % 1, on = t > t0;
        na.forEach((e, k) => { mv(e, 600 - 440 * M.io(M.clamp(v * 1.3 - k * 0.12)), 230 + k * 36); e.style.opacity = on ? 1 : 0; });
        kk.forEach((e, k) => { mv(e, 180 + 440 * M.io(M.clamp(v * 1.3 - k * 0.15)), 300 + k * 40); e.style.opacity = on ? 1 : 0; });
        attr(pu, 'stroke-width', on && v < 0.2 ? 6 : 3); } }; } }] });

/* ---------- U: think ---------- */
const TH = { q: 'Water moves in, from higher to lower:', opts: ['Active transport', 'Osmosis'], right: 1, why: 'Osmosis. Higher to lower is passive: it needs no ATP.' };
S.push({ id: 'U', from: 'U4', to: 'W1', cards: [EP.think(TH, { tin: 'U4', opts: ['U4', 'active', -0.1], why: ['U5', 'Water'] })] });

/* ---------- W: worked example ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE TRANSPORT', svg: false, build: el => EP.cols(el, [
  ['CASE 1 · CUCUMBER AND SALT', 'Osmosis', 'PASSIVE · HIGHER TO LOWER', s => { CC(s, 200, 150, 90, '#5E9A4E', '#2E5A24', 3); CC(s, 200, 150, 76, '#DCEFC8', 'none', 0); [[330, 110], [350, 170], [320, 220]].forEach(([x, y]) => P(s, `M${x},${y - 14} C${x + 9},${y} ${x + 9},${y + 9} ${x},${y + 9} C${x - 9},${y + 9} ${x - 9},${y} ${x},${y - 14} Z`, '#BFE0F5', WAT, 2)); P(s, 'M290,150 L380,150 m-12,-9 l12,9 l-12,9', 'none', WAT, 3); }, ['W2', 'cucumber', -0.2], ['W2', 'osmosis'], ['W2', 'passive']],
  ['CASE 2 · A POLAR MOLECULE', 'Carrier protein', 'STILL PASSIVE · NO ATP', s => { vmem(s, 248, 40, 260, 0.55); prot(s, 248, 150, 26, 46, 2); mk(s, 'rect', { x: 120, y: 141, width: 18, height: 18, fill: '#D1495B', transform: 'rotate(45 129 150)' }); P(s, 'M150,150 L360,150 m-12,-9 l12,9 l-12,9', 'none', '#D1495B', 3); }, ['W3', 'polar', -0.2], ['W3', 'carrier'], ['W3', 'passive']],
  ['CASE 3 · SODIUM PUMPED OUT', 'Active transport', 'LOWER TO HIGHER · USES ATP', s => { vmem(s, 248, 40, 260, 0.55); prot(s, 248, 150, 34, 64, 4); const a = ion(s, 'Na+', NA); mv(a, 360, 150); const b = ion(s, 'Na+', NA); mv(b, 120, 130); const c = ion(s, 'Na+', NA); mv(c, 100, 175); P(s, 'M330,150 L150,150 m12,-9 l-12,9 l12,9', 'none', NA, 3); txt(s, 330, 230, 'ATP', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: '#8A6A1E' }); }, ['W4', 'Sodium', -0.2], ['W5', 'active'], ['W4', 'ATP']]]) }] });

EP.run({
  icons: { drop: ['M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z'], bubble: ['M12 3a9 9 0 1 0 0.1 0', 'M8 8c1-1.5 2.5-2 4-2'], cuc: ['M12 3a9 9 0 1 0 0.1 0', 'M12 7a5 5 0 1 0 0.1 0', 'M12 11v2'] },
  jobs: [['drop', 'Oil on water', 'NEVER MIXES', ['H1', 'oil']], ['bubble', 'A soap bubble', 'HOLDS TOGETHER', ['H1', 'soap']], ['cuc', 'Cucumber slices', 'SALT DRAWS WATER', ['H1', 'cucumber']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Fluid</span>: the parts move sideways.', f: '<span class="lad">mosaic: <b>many pieces fit together</b></span>', t2: ['T1', 'Fluid', -0.2], tf: ['T1', 'Mosaic', -0.2] },
  trap: { wrong: 'Every movement across the membrane needs energy', right: 'Passive needs none · only active transport uses ATP', tWrong: ['X2', 'every', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'passive', -0.2], tSvg: ['X3', 'Only', -0.4],
    build: s => { P(s, 'M40,90 L200,90 m-14,-10 l14,10 l-14,10', 'none', WAT, 4); txt(s, 120, 70, 'HIGH → LOW', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: WAT }); txt(s, 120, 130, 'NO ATP', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: C.ok || '#2E9E5B' });
      P(s, 'M260,190 L420,190 m-14,-10 l14,10 l-14,10', 'none', NA, 4); txt(s, 340, 170, 'LOW → HIGH', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: NA }); txt(s, 340, 230, 'ATP', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: '#8A6A1E' }); } },
  where: { type: 'Statement questions: fluid mosaic model, membrane proteins and types of transport', at: ['E1', 'statement'] },
  mcq: { q: '<b>Assertion (A)</b>: Polar molecules need a carrier protein to cross the plasma membrane.<br><b>Reason (R)</b>: The middle of the lipid bilayer is made of non-polar tails.', opts: ['Both true; R explains A', 'Both true; R does not', 'A true, R false', 'A false, R true'], right: 0, optFs: 26 }, mcqAt: ['Q1', 'Read', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['A is true: carrier needed', ['A2', 'Polar']], ['R is true: non-polar middle', ['A3', 'reason']], ['R explains A', ['A3', 'cause']], ['Polar cannot pass the tails', ['A3', 'cannot']]],
  recap: { title: 'Recap · cell membrane', lines: ['<b>Mainly</b> lipids and proteins · RBC: about 52% protein, 40% lipid', '<b>Phospholipid bilayer</b>: polar heads out, tails in · cholesterol', '<b>Integral</b> proteins buried · <b>peripheral</b> on the surface', '<b>Fluid mosaic model</b>: Singer and Nicolson, 1972', '<b>Passive</b>: diffusion, osmosis · <b>active</b>: ATP, Na+/K+ pump'] },
  yq: ['Who proposed the fluid mosaic model, and when?', 'How are integral and peripheral proteins different?', 'Which type of transport uses ATP?'],
  next: { label: 'NEXT · EP 64', topic: 'Next: Cell Wall and the Endomembrane System' }
});
})();
