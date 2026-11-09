// PUC Biology Ep 42: The Leaf: Venation, Phyllotaxy and Modifications (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon: outline brown, leaf, chlorophyll green, water sky, sugar/food gold
const BR = '#2E2A24', LEAF = '#8CC48F', VEIN = '#D8ECD2', GRN = C.ac, WAT = '#5AA0C8', GOLD = '#C9962B';
const STEM = '#4E7A34', ROOT = '#B08A5A', ROOTL = '#E3D3A0', SOIL = '#E9DFC9', SOILD = '#CDBF9E', PET = '#F2B8C6', PETD = '#D9708C', YEL = '#F2D06B', WOOD = '#9A6B3E';
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const G = (p, x, y, s = 1, r = 0) => mk(p, 'g', { transform: `translate(${x} ${y}) rotate(${r}) scale(${s})` });
const tag = (p, x, y, s, col = C.mute, fs = 15) => txt(p, x, y, s, { 'text-anchor': 'middle', 'font-size': fs, 'letter-spacing': 1.4, fill: col, 'font-weight': 600 });
const grp = p => mk(p, 'g', {});
/* --- drawing kit (vintage cartoon, Ep 1 palette) --- */
// leaf from base (0,0) pointing along +x, length L; o: w, fill, ven ('net'|'par'|'pin'|none), sw
const leaf = (p, x, y, L, ang = 0, o = {}) => { const Q = G(p, x, y, 1, ang), w = L * (o.w || 0.4), sw = o.sw || 2.5;
  mk(Q, 'path', { d: `M0,0 C${L * 0.22},${-w} ${L * 0.72},${-w * 0.95} ${L},0 C${L * 0.72},${w * 0.95} ${L * 0.22},${w} 0,0 Z`, fill: o.fill || LEAF, stroke: BR, 'stroke-width': sw, 'stroke-linejoin': 'round' });
  const vc = o.vc || VEIN;
  if (o.ven === 'par') { for (let k = -2; k <= 2; k++) mk(Q, 'path', { d: `M${L * 0.04},0 Q${L * 0.5},${k * w * 0.32} ${L * 0.96},0`, stroke: vc, 'stroke-width': sw * 0.7, fill: 'none' }); }
  else if (o.ven !== 'none') { mk(Q, 'path', { d: `M2,0 L${L * 0.95},0`, stroke: vc, 'stroke-width': sw * 0.9 });
    if (o.ven === 'net' || o.ven === 'pin') for (let k = 1; k <= 4; k++) { const xx = L * k * 0.18; const hh = w * Math.sin(Math.PI * (xx + L * 0.12) / L) * 0.8; [-1, 1].forEach(sd => mk(Q, 'path', { d: `M${xx},0 Q${xx + L * 0.06},${sd * hh * 0.6} ${xx + L * 0.12},${sd * hh}`, stroke: vc, 'stroke-width': sw * 0.6, fill: 'none' })); } }
  return W(Q); };
// flower seen from the front: n petals, radius r
const bloom = (p, x, y, r = 30, n = 5, col = PET, core = YEL) => { const Q = G(p, x, y);
  for (let k = 0; k < n; k++) mk(Q, 'ellipse', { cx: 0, cy: -r * 0.55, rx: r * 0.36, ry: r * 0.58, fill: col, stroke: BR, 'stroke-width': 2, transform: `rotate(${k * 360 / n})` });
  mk(Q, 'circle', { cx: 0, cy: 0, r: r * 0.26, fill: core, stroke: BR, 'stroke-width': 2 }); return W(Q); };
const bud = (p, x, y, s = 1, col = '#9CCB8A') => { const Q = G(p, x, y, s); mk(Q, 'path', { d: 'M0,10 C-9,4 -8,-10 0,-16 C8,-10 9,4 0,10 Z', fill: col, stroke: BR, 'stroke-width': 2 }); return W(Q); };
const soil = (p, y, x0 = 0, x1 = 1056, h = 600) => { const g = grp(p); mk(g, 'rect', { x: x0, y, width: x1 - x0, height: h, fill: SOIL }); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: SOILD, 'stroke-width': 4 });
  for (let k = 0; k < (x1 - x0) / 70; k++) mk(g, 'circle', { cx: x0 + 30 + k * 70 + (k % 3) * 9, cy: y + 34 + (k % 4) * 40, r: 3 + (k % 2), fill: SOILD }); return g; };
const flowPath = (p, d, col = '#FFFFFF', w = 3) => mk(p, 'path', { d, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-dasharray': '5 9', 'stroke-linecap': 'round' });
const flowRun = (e, t, sp = 20) => { e.style.strokeDashoffset = (-(t * sp) % 14).toFixed(1); };
const drop = (g, x, y, s = 1, col = WAT) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M0,-20 C10,-6 16,2 16,10 A16,16 0 0 1 -16,10 C-16,2 -10,-6 0,-20 Z', fill: '#D6E9F5', stroke: col, 'stroke-width': 3 }); return W(Q); };

/* ================= Ep 42 content: the leaf ================= */
const CACT = '#7DB36A', ONI = '#E9D3C8', ONID = '#B98A7A', PIT = '#9CC27A', PITD = '#B4566A';
const rnd = i => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
// big leaf in a local group: type 'net' (peepal) or 'par' (grass); returns outline + vein paths for drawing
const bigLeaf = (p, x, y, L, ang, type) => { const Q = G(p, x, y, 1, ang), w = type === 'par' ? L * 0.06 : L * 0.3, R = { sec: [], net: [] };
  mk(Q, 'path', { d: type === 'par' ? `M0,${-w * 0.7} C${L * 0.3},${-w} ${L * 0.8},${-w * 0.6} ${L},0 C${L * 0.8},${w * 0.6} ${L * 0.3},${w} 0,${w * 0.7} Z` : `M0,0 C${L * 0.1},${-w * 1.1} ${L * 0.62},${-w * 1.05} ${L * 0.86},${-w * 0.2} C${L * 0.92},${-w * 0.05} ${L * 0.96},0 ${L},0 C${L * 0.96},0 ${L * 0.92},${w * 0.05} ${L * 0.86},${w * 0.2} C${L * 0.62},${w * 1.05} ${L * 0.1},${w * 1.1} 0,0 Z`, fill: LEAF, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  if (type === 'par') { for (let k = -3; k <= 3; k++) R.sec.push(mk(Q, 'path', { d: `M4,${k * w * 0.2} C${L * 0.3},${k * w * 0.26} ${L * 0.8},${k * w * 0.14} ${L * 0.99},0`, stroke: VEIN, 'stroke-width': k ? 2.5 : 4, fill: 'none' })); R.Q = Q; R.w = w; return R; }
  R.mid = mk(Q, 'path', { d: `M0,0 L${L * 0.98},0`, stroke: VEIN, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 1; k <= 6; k++) { const xx = L * (0.04 + k * 0.12), hh = w * Math.sin(Math.PI * Math.min(1, (xx + L * 0.16) / L)) * 0.82; [-1, 1].forEach(sd => R.sec.push(mk(Q, 'path', { d: `M${xx},0 Q${xx + L * 0.07},${sd * hh * 0.55} ${xx + L * 0.16},${sd * hh}`, stroke: VEIN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }))); }
  for (let k = 1; k <= 5; k++) { const xx = L * (0.1 + k * 0.12); [-1, 1].forEach(sd => [0.35, 0.65].forEach((f, j) => { const yy = sd * w * f * 0.8 * Math.sin(Math.PI * (xx + L * 0.1) / L);
    R.net.push(mk(Q, 'path', { d: `M${xx - L * 0.02},${yy} q${L * 0.03},${(rnd(k * 7 + j) - 0.5) * 18} ${L * 0.085},${yy * 0.12}`, stroke: VEIN, 'stroke-width': 2.4, fill: 'none' })); })); }
  R.Q = Q; R.w = w; return R; };
// small typical leaf on a stem node, for tiles and the hook
const tileLeaf = (sv0, hl) => { const R = {}, sv = G(sv0, 16, 14, 0.94);
  mk(sv, 'path', { d: 'M70,214 L70,34', stroke: STEM, 'stroke-width': 8, 'stroke-linecap': 'round' });
  mk(sv, 'line', { x1: 61, y1: 150, x2: 79, y2: 150, stroke: BR, 'stroke-width': 3 });
  R.bud = bud(sv, 84, 132, 0.9);
  leaf(sv, 86, 156, 34, 50, { w: 0.5, ven: 'none' }); leaf(sv, 86, 146, 34, -62, { w: 0.5, ven: 'none' });
  mk(sv, 'ellipse', { cx: 84, cy: 151, rx: 12, ry: 8, fill: '#9CCB8A', stroke: BR, 'stroke-width': 2.5 });
  mk(sv, 'path', { d: 'M94,150 L170,120', stroke: STEM, 'stroke-width': 5, 'stroke-linecap': 'round' });
  leaf(sv, 168, 121, 172, -18, { w: 0.42, ven: 'net' });
  const ring = a => mk(sv, 'ellipse', Object.assign({ fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '8 6' }, a));
  if (hl === 'node') R.r = ring({ cx: 76, cy: 142, rx: 26, ry: 26 });
  if (hl === 'base') R.r = ring({ cx: 90, cy: 151, rx: 30, ry: 26 });
  if (hl === 'pet') R.r = ring({ cx: 132, cy: 135, rx: 46, ry: 18, transform: 'rotate(-21 132 135)' });
  if (hl === 'lam') R.r = ring({ cx: 252, cy: 94, rx: 100, ry: 46, transform: 'rotate(-18 252 94)' });
  return R; };
// a stem with leaves per node: kind 'alt' | 'opp' | 'whorl'; returns stem path + leaf groups with node y
const phylloStem = (p, x, y0, y1, nodes, kind, s = 1) => { const g = grp(p), R = { L: [] };
  R.stem = mk(g, 'path', { d: `M${x},${y0} L${x},${y1}`, stroke: STEM, 'stroke-width': 8 * s, 'stroke-linecap': 'round' });
  nodes.forEach((ny, k) => { const set = [], L = 130 * s;
    mk(g, 'line', { x1: x - 8 * s, y1: ny, x2: x + 8 * s, y2: ny, stroke: BR, 'stroke-width': 3 });
    if (kind === 'alt') set.push(leaf(g, x, ny, L, k % 2 ? -160 : -20, { w: 0.42, ven: 'net' }));
    if (kind === 'opp') { set.push(leaf(g, x, ny, L, -16, { w: 0.42, ven: 'net' })); set.push(leaf(g, x, ny, L, -164, { w: 0.42, ven: 'net' })); }
    if (kind === 'whorl') { mk(g, 'ellipse', { cx: x, cy: ny, rx: 70 * s, ry: 16 * s, fill: 'none', stroke: STEM, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
      [[-100, 0.7], [-80, 0.7], [-10, 1], [-170, 1], [20, 0.82], [160, 0.82]].forEach(([a, f]) => set.push(leaf(g, x, ny, L * f, a, { w: 0.36, ven: 'net' }))); }
    R.L.push([ny, set]); });
  R.g = g; return R; };
const peaLeaf = (p, x, y, s = 1, sup = true) => { const Q = G(p, x, y, s), TD = [];
  if (sup) mk(Q, 'rect', { x: 330, y: -330, width: 12, height: 360, fill: '#C9A46A', stroke: BR, 'stroke-width': 2.5 });
  mk(Q, 'path', { d: 'M0,0 C80,-30 170,-90 250,-180', stroke: STEM, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  [[60, -24], [130, -66], [196, -122]].forEach(([lx, ly]) => { leaf(Q, lx, ly, 62, -110, { w: 0.6, ven: 'none' }); leaf(Q, lx, ly, 62, 20, { w: 0.6, ven: 'none' }); });
  [[250, -180, 0], [246, -176, 1], [240, -170, 2]].forEach(([tx, ty, k]) => { let d = `M${tx},${ty} C${tx + 30},${ty - 40 - k * 20} ${tx + 60},${ty - 60 - k * 26} 334,${ty - 70 - k * 34}`;
    for (let j = 0; j < 2; j++) d += ` c12,-4 14,10 2,12 c-12,2 -12,-12 2,-14`; TD.push(mk(Q, 'path', { d, stroke: '#5E9E3E', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' })); });
  const o = W(Q); o.TD = TD; return o; };
const cactus = (p, x, y, s = 1) => { const Q = G(p, x, y, s), SP = [];
  [[0, 0, 320, 34], [-80, -90, 140, 26], [80, -130, 160, 26]].forEach(([dx, dy, h, r]) => { mk(Q, 'path', { d: `M${dx - r},${dy} L${dx - r},${dy - h} A${r},${r} 0 0 1 ${dx + r},${dy - h} L${dx + r},${dy} Z`, fill: CACT, stroke: BR, 'stroke-width': 3 });
    for (let k = 0; k < h / 52; k++) [-0.5, 0.5].forEach(f => { const sx = dx + f * r, sy = dy - 30 - k * 52; SP.push(mk(Q, 'path', { d: `M${sx},${sy} l${f * 30},-12 M${sx},${sy} l${f * 30},6 M${sx},${sy} l${f * 8},-22`, stroke: '#F3EBD8', 'stroke-width': 2.4, 'stroke-linecap': 'round' })); }); });
  mk(Q, 'path', { d: 'M-80,-90 L-80,-40 L-34,-40 M80,-130 L80,-70 L34,-70', stroke: CACT, 'stroke-width': 52, fill: 'none' });
  mk(Q, 'path', { d: 'M-106,-90 L-106,-14 L-34,-14 M-54,-90 L-54,-66 L-34,-66 M106,-130 L106,-44 L34,-44 M54,-130 L54,-96 L34,-96', stroke: BR, 'stroke-width': 3, fill: 'none' });
  const o = W(Q); o.SP = SP; return o; };
const onion = (p, x, y, s = 1) => { const Q = G(p, x, y, s), LY = [];
  [1, 0.8, 0.6, 0.4].forEach((f, k) => LY.push(mk(Q, 'path', { d: `M0,${-150 * f - 40} C${-20 * f},${-120 * f} ${-130 * f},${-100 * f} ${-130 * f},${-10} C${-130 * f},${70 * f} ${-60 * f},100 0,100 C${60 * f},100 ${130 * f},${70 * f} ${130 * f},${-10} C${130 * f},${-100 * f} ${20 * f},${-120 * f} 0,${-150 * f - 40} Z`, fill: k % 2 ? '#F5E6DE' : ONI, stroke: ONID, 'stroke-width': 3 })));
  mk(Q, 'rect', { x: -50, y: 96, width: 100, height: 16, rx: 6, fill: '#C9B48A', stroke: BR, 'stroke-width': 2.5 });
  for (let k = -4; k <= 4; k++) mk(Q, 'path', { d: `M${k * 10},112 q${k * 4},30 ${k * 8},${50 + Math.abs(k) * 4}`, stroke: '#9A7A4E', 'stroke-width': 2.2, fill: 'none' });
  [-1, 1].forEach(sd => mk(Q, 'path', { d: `M0,-190 C${sd * 6},-240 ${sd * 18},-280 ${sd * 30},-320`, stroke: STEM, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }));
  const o = W(Q); o.LY = LY; return o; };
const acacia = (p, x, y, s = 1) => { const Q = G(p, x, y, s), PH = [], LF = [];
  mk(Q, 'path', { d: 'M0,0 C6,-120 -6,-240 4,-380', stroke: WOOD, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
  [[-60, 1], [-160, -1], [-260, 1]].forEach(([yy, sd]) => { const ph = G(Q, 2, yy, 1, sd > 0 ? -28 : -152); mk(ph, 'path', { d: 'M0,0 C40,-22 120,-26 170,-6 C120,4 40,8 0,0 Z', fill: LEAF, stroke: BR, 'stroke-width': 3 }); mk(ph, 'path', { d: 'M4,0 C60,-10 120,-12 166,-6', stroke: VEIN, 'stroke-width': 2, fill: 'none' }); PH.push(W(ph)); });
  const yl = G(Q, 4, -340, 1, -30); mk(yl, 'path', { d: 'M0,0 L130,0', stroke: STEM, 'stroke-width': 3 });
  for (let k = 0; k < 6; k++) [-1, 1].forEach(sd => LF.push(mk(yl, 'ellipse', { cx: 30 + k * 18, cy: sd * 9, rx: 6, ry: 9, fill: '#9CCB8A', stroke: BR, 'stroke-width': 1.5 })));
  const o = W(Q); o.PH = PH; o.LF = LF; return o; };
const pitcher = (p, x, y, s = 1) => { const Q = G(p, x, y, s), R = {};
  mk(Q, 'path', { d: 'M-120,40 C-60,30 -20,10 -10,-30', stroke: STEM, 'stroke-width': 5, fill: 'none' });
  mk(Q, 'path', { d: 'M-40,-200 C-60,-120 -60,-40 -10,-10 C40,10 60,-60 50,-200 Z', fill: PIT, stroke: BR, 'stroke-width': 3 });
  mk(Q, 'ellipse', { cx: 5, cy: -200, rx: 46, ry: 12, fill: PITD, stroke: BR, 'stroke-width': 3 });
  R.lid = mk(Q, 'path', { d: 'M-30,-214 C-20,-260 50,-262 60,-226 Z', fill: '#B9D48E', stroke: BR, 'stroke-width': 3 });
  const o = W(Q); o.R = R; return o; };
const flytrap = (p, x, y, s = 1) => { const Q = G(p, x, y, s), LB = [];
  mk(Q, 'path', { d: 'M0,40 C0,0 4,-40 0,-80', stroke: STEM, 'stroke-width': 6, fill: 'none' });
  [-1, 1].forEach(sd => { const g = mk(Q, 'g', {}); let d = 'M0,-80 C' + (sd * 70) + ',-80 ' + (sd * 80) + ',-150 ' + (sd * 20) + ',-170 L0,-80 Z';
    mk(g, 'path', { d, fill: '#C9DE8E', stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: 'M0,-80 C' + (sd * 40) + ',-90 ' + (sd * 50) + ',-130 ' + (sd * 16) + ',-160', fill: 'none', stroke: PITD, 'stroke-width': 8, 'stroke-opacity': 0.6 });
    for (let k = 0; k < 6; k++) { const u = k / 5, tx = sd * (70 * (1 - u) * u * 3 + 20 * u), ty = -80 - u * 90 - 10; mk(g, 'path', { d: `M${tx},${ty} l${sd * 18},-6`, stroke: BR, 'stroke-width': 2.2 }); } LB.push(g); });
  const o = W(Q); o.LB = LB; return o; };

const EP_ICONS = {
  grass: ['M6 22c0-8 1-14 2-20', 'M12 22c0-8-1-13 1-19', 'M18 22c-1-7-3-12-5-16'],
  vine: ['M8 22V2', 'M8 9c4 0 6 2 6 5s-3 3-3 1 2-3 4-2', 'M8 16c-3 0-5-1-5-4'],
  stem: ['M12 22V3', 'M12 15c-4 0-6-2-7-5 3 0 6 1 7 5Z', 'M12 9c4 0 6-2 7-5-3 0-6 1-7 5Z'],
  loop: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  box: ['M3 7l9-4 9 4v10l-9 4-9-4Z', 'M3 7l9 4 9-4', 'M12 11v10'],
  stiff: ['M12 3v18', 'M12 8l-5-3', 'M12 8l5-3', 'M12 14l-6-3', 'M12 14l6-3'],
};
const EP = { icons: EP_ICONS,
  jobs: [['leaf', 'A peepal leaf', 'PRESSED IN A NOTEBOOK', 'peepal'], ['grass', 'A blade of grass', 'LONG AND THIN', 'grass'], ['vine', 'A pea plant', 'GRIPPING THE FENCE', 'pea']],
  hook: { label: 'THREE LEAVES', pill: 'All three are leaves', pillT: wt('H2', 'All') - 0.1, img: 'scene-study.jpg', cardL: 'DIYA · THE NOTEBOOK', q: 'A net, lines, or a spring?', qT: wt('H3', 'why') - 0.3,
    draw: s => { const a = grp(s), b = grp(s), c = grp(s);
      bigLeaf(a, 60, 300, 250, -60, 'net'); bigLeaf(b, 330, 440, 330, -84, 'par'); peaLeaf(c, 470, 440, 0.8);
      return { els: [[a, tMorph + 0.4, { dy: 20 }], [b, tMorph + 0.7, { dy: 20 }], [c, tMorph + 1.0, { dy: 20 }],
        [tag(s, 150, 470, 'PEEPAL', STEM, 16), wt('H2', 'lines') - 0.2, { dy: 6 }], [tag(s, 360, 470, 'GRASS', STEM, 16), wt('H2', 'lines'), { dy: 6 }], [tag(s, 600, 470, 'PEA', STEM, 16), wt('H2', 'hold') - 0.2, { dy: 6 }]] }; } },
  plan: { label: 'THREE PATTERNS TO READ', rows: [['leaf', 'The veins', 'VENATION'], ['stem', 'Leaves on the stem', 'PHYLLOTAXY'], ['loop', 'New jobs', 'CLIMB · DEFEND · STORE · CATCH']],
    rowT: [wt('H4', 'veins') - 0.2, wt('H4', 'sit') - 0.2, wt('H4', 'jobs') - 0.2], pill: 'Leaves follow patterns', pillT: wt('H4', 'patterns') - 0.2 },
  D: { label: 'PARTS OF A LEAF', arrows: false,
    tiles: [['Node and axil', 'A leaf grows at a node, a bud in its axil', T0('D1') + 0.4, sv => { const r = tileLeaf(sv, 'node'); return { els: [[r.r, wt('D1', 'bud'), POP], [tag(sv, 236, 214, 'AXILLARY BUD', STEM, 13), wt('D1', 'axil'), { dy: 6 }]] }; }],
      ['Leaf base', 'Joins the leaf to the stem, may carry stipules', T0('D2') + 0.6, sv => { const r = tileLeaf(sv, 'base'); return { els: [[r.r, wt('D2', 'base'), POP], [tag(sv, 220, 214, 'STIPULES', STEM, 13), wt('D2', 'stipules'), { dy: 6 }]] }; }],
      ['Petiole', 'The leaf stalk, holding the blade to the light', T0('D3'), sv => { const r = tileLeaf(sv, 'pet'); return { els: [[r.r, wt('D3', 'petiole'), POP]] }; }],
      ['Lamina', 'The flat blade: a midrib and veins', T0('D4'), sv => { const r = tileLeaf(sv, 'lam'); return { els: [[r.r, wt('D4', 'lamina'), POP], [tag(sv, 236, 214, 'MIDRIB · VEINS', STEM, 13), wt('D4', 'midrib'), { dy: 6 }]] }; }]],
    chips: [['stiff', 'Keep the blade stiff', wt('D5', 'stiff')], ['drop', 'Carry water, minerals', wt('D5', 'carry')], ['box', 'Carry food', wt('D5', 'food')]] },
  ladders: [
    { key: 'Z', t0: T0('Z1'), tEnd: T0('P1'), chips: ['VENATION', 'RETICULATE', 'PARALLEL', 'DICOT · MONOCOT'],
      lv: [
        { t: T0('Z1') + 0.2, chip: 0, info: ['LOOK CLOSELY', 'Venation', 'How veins and veinlets are arranged in the lamina.', ''], b: g => {
            const L = bigLeaf(g, 90, 290, 880, -6, 'net');
            return { labs: [[lab(g, 500, 248, 560, 470, 'Midrib'), wt('Z2', 'veins') - 0.1], [lab(g, 380, 172, 300, 60, 'Vein', 'end'), wt('Z2', 'veins') + 0.4], [lab(g, 720, 160, 800, 60, 'Veinlets'), wt('Z3', 'network') - 0.1]],
              draws: [[L.mid, T0('Z2') + 0.2, 0.8]].concat(L.sec.map((v, i) => [v, wt('Z2', 'veins') + i * 0.06, 0.5]), L.net.map((v, i) => [v, wt('Z3', 'veinlets') + i * 0.04, 0.4])) }; } },
        { t: T0('Z3'), chip: 1, cont: true, info: ['IN A PEEPAL LEAF', 'Reticulate', 'Veinlets join up into a network, like a fishing net.', ''] },
        { t: T0('Z4'), chip: 1, info: ['ZOOM IN', 'Islands of green', 'Each small patch is closed in on all sides by veinlets.', ''], b: g => {
            mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#CFE7C9' });
            const P = [], NX = 9, NY = 5; for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) P.push([-20 + i * 122 + (i && i < NX ? (rnd(i * 31 + j) - 0.5) * 50 : 0), -10 + j * 110 + (j && j < NY ? (rnd(j * 17 + i * 5) - 0.5) * 44 : 0)]);
            const at = (i, j) => P[j * (NX + 1) + i], cells = [];
            for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const a = at(i, j), b = at(i + 1, j), c = at(i + 1, j + 1), d = at(i, j + 1);
              cells.push(mk(g, 'path', { d: `M${a}L${b}L${c}L${d}Z`, fill: LEAF, stroke: 'none' })); }
            const lines = []; for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) { if (i < NX) lines.push(mk(g, 'path', { d: `M${at(i, j)}L${at(i + 1, j)}`, stroke: VEIN, 'stroke-width': 9, 'stroke-linecap': 'round' })); if (j < NY) lines.push(mk(g, 'path', { d: `M${at(i, j)}L${at(i, j + 1)}`, stroke: VEIN, 'stroke-width': 9, 'stroke-linecap': 'round' })); }
            mk(g, 'path', { d: 'M-20,470 C300,380 700,190 1080,60', stroke: VEIN, 'stroke-width': 26, fill: 'none' });
            const t0 = wt('Z4', 'islands') - 0.3;
            return { labs: [[lab(g, at(4, 2)[0] + 60, at(4, 2)[1] + 50, 640, 300, 'Island of green'), wt('Z4', 'islands') + 0.6], [lab(g, at(6, 1)[0], at(6, 1)[1] + 50, 860, 90, 'Veinlet'), wt('Z4', 'closed') - 0.1]],
              draws: lines.map((l, i) => [l, T0('Z4') + 0.2 + (i % 12) * 0.05, 0.4]),
              anim: t => cells.forEach((c, i) => { const k = M.clamp((t - t0 - rnd(i * 3) * 1.6) / 0.3); c.style.opacity = (0.15 + 0.85 * k).toFixed(3); }) }; } },
        { t: T0('Z5'), chip: 2, info: ['IN A GRASS LEAF', 'Parallel', 'Veins run side by side, like railway lines.', ''], b: g => {
            const L = bigLeaf(g, 60, 280, 940, -4, 'par'), F = [];
            for (let k = -3; k <= 3; k += 2) F.push(flowPath(L.Q, `M4,${k * L.w * 0.2} C${940 * 0.3},${k * L.w * 0.26} ${940 * 0.8},${k * L.w * 0.14} ${940 * 0.99},0`, WAT, 3));
            return { labs: [[lab(g, 400, 262, 360, 120, 'Parallel veins', 'end'), wt('Z5', 'side') - 0.1]], draws: L.sec.map((v, i) => [v, wt('Z5', 'veins') + i * 0.08, 0.7]),
              els: F.map(f => [f, wt('Z5', 'railway'), { dy: 0 }]), anim: t => F.forEach(f => flowRun(f, t, 24)) }; } },
        { t: T0('Z6'), chip: 3, info: ['A QUICK RULE', 'Dicot or monocot', 'Dicots usually have reticulate venation. Most monocots have parallel venation.', ''], b: g => {
            const a = grp(g), b = grp(g); bigLeaf(a, 120, 300, 380, -30, 'net'); bigLeaf(b, 600, 400, 420, -34, 'par');
            return { els: [[a, wt('Z6', 'dicots') - 0.3, { dy: 20 }], [b, wt('Z6', 'monocots') - 0.3, { dy: 20 }], [tag(g, 290, 470, 'DICOT · RETICULATE', STEM, 17), wt('Z6', 'reticulate'), { dy: 6 }], [tag(g, 790, 470, 'MONOCOT · PARALLEL', STEM, 17), wt('Z6', 'parallel'), { dy: 6 }]] }; } }],
      av: { who: 'Diya', text: 'A net, or railway lines!', tin: wt('Z6', 'monocots') + 0.3, tout: T0('P1') - 0.4 } },
    { key: 'P', t0: T0('P1'), tEnd: T0('M1'), chips: ['ALTERNATE', 'OPPOSITE', 'WHORLED'],
      lv: [
        { t: T0('P1') + 0.2, chip: -1, info: ['PHYLLO MEANS LEAF', 'Phyllotaxy', 'The pattern in which leaves are arranged on a stem.', ''], b: g => {
            const a = phylloStem(g, 200, 500, 70, [400, 280, 160], 'alt', 0.8), b = phylloStem(g, 528, 500, 70, [400, 280, 160], 'opp', 0.8), c = phylloStem(g, 856, 500, 70, [400, 240], 'whorl', 0.8);
            return { els: [[a.g, T0('P1') + 0.4, { dy: 20 }], [b.g, T0('P1') + 0.8, { dy: 20 }], [c.g, T0('P1') + 1.2, { dy: 20 }]] }; } },
        { t: T0('P2'), chip: 0, info: ['ONE LEAF PER NODE', 'Alternate', 'One leaf at each node, first on one side, then the other.', 'China rose, mustard, sunflower'], b: g => {
            const nodes = [440, 360, 280, 200, 120], st = phylloStem(g, 528, 510, 50, nodes, 'alt'), t0 = T0('P2') + 0.3;
            return { labs: [[lab(g, 528, 440, 700, 480, 'Node'), wt('P2', 'node') - 0.1]], draws: [[st.stem, t0, 4]], els: st.L.flatMap(([ny, set]) => set.map(l => [l, t0 + (510 - ny) / 460 * 4, { ...POP, sc: 0.3 }])) }; } },
        { t: T0('P3'), chip: 1, info: ['A PAIR PER NODE', 'Opposite', 'Two leaves at each node, facing each other.', 'Calotropis, guava'], b: g => {
            const nodes = [430, 320, 210, 100], st = phylloStem(g, 528, 510, 50, nodes, 'opp'), t0 = T0('P3') + 0.3;
            return { labs: [[lab(g, 528, 430, 760, 490, 'A pair at one node'), wt('P3', 'pair') - 0.1]], draws: [[st.stem, t0, 3]], els: st.L.flatMap(([ny, set]) => set.map(l => [l, t0 + (510 - ny) / 460 * 3, { ...POP, sc: 0.3 }])) }; } },
        { t: T0('P4'), chip: 2, info: ['MORE THAN TWO', 'Whorled', 'A ring of leaves at one node.', 'Alstonia'], b: g => {
            const nodes = [400, 190], st = phylloStem(g, 528, 510, 50, nodes, 'whorl'), t0 = T0('P4') + 0.3;
            return { labs: [[lab(g, 590, 404, 800, 480, 'A ring at one node'), wt('P4', 'ring') - 0.1]], draws: [[st.stem, t0, 2.4]], els: st.L.flatMap(([ny, set]) => set.map((l, i) => [l, t0 + (510 - ny) / 460 * 2.4 + i * 0.08, { ...POP, sc: 0.3 }])) }; } }] },
    { key: 'M', t0: T0('M1'), tEnd: T0('C1'), chips: ['CLIMB', 'DEFEND', 'STORE', 'MAKE FOOD', 'CATCH'],
      lv: [
        { t: T0('M1') + 0.2, chip: -1, info: ['LEAVES IN DISGUISE', 'New jobs', 'Climb, defend, store food, make food, catch insects.', ''], b: g => {
            const a = peaLeaf(g, 40, 330, 0.5), b = cactus(g, 340, 420, 0.6), c = onion(g, 528, 360, 0.6), d = acacia(g, 720, 440, 0.7), e = pitcher(g, 940, 400, 0.8);
            return { els: [a, b, c, d, e].map((q, i) => [q, T0('M1') + 0.3 + i * 0.25, { ...POP, sc: 0.5 }]) }; } },
        { t: T0('M2'), chip: 0, info: ['CLIMBING', 'Leaf tendrils', 'In peas, leaves turn into tendrils that coil around a support.', ''], b: g => {
            const p2 = peaLeaf(g, 200, 470, 1.25);
            return { labs: [[lab(g, 200 + 130 * 1.25, 470 - 66 * 1.25, 330, 470, 'Leaflets'), wt('M2', 'leaves') - 0.1], [lab(g, 200 + 300 * 1.25, 470 - 270 * 1.25, 760, 70, 'Leaf tendril'), wt('M2', 'tendrils') - 0.1], [lab(g, 200 + 336 * 1.25, 470 - 40 * 1.25, 760, 420, 'Support'), wt('M2', 'support') - 0.1]],
              draws: p2.TD.map((d, i) => [d, wt('M2', 'coil') - 0.4 + i * 0.25, 0.9]) }; } },
        { t: T0('M3'), chip: 1, info: ['DEFENCE', 'Spines', 'In cacti, leaves turn into spines. The green stem makes the food.', ''], b: g => { soil(g, 460, 0, 1056, 80);
            const c = cactus(g, 480, 460, 1.15);
            return { labs: [[lab(g, 480 + 17 * 1.15, 460 - 238 * 1.15, 760, 90, 'Spines (leaves)'), wt('M3', 'spines') - 0.1], [lab(g, 480 - 10, 300, 200, 300, 'Green stem', 'end'), wt('M3', 'green') - 0.1]],
              els: c.SP.map((sp, i) => [sp, wt('M3', 'spines') + (i % 10) * 0.05, { dy: 0, fade: 0.2 }]) }; } },
        { t: T0('M4'), chip: 2, info: ['STORING FOOD', 'Fleshy leaves', 'The thick layers of onion and garlic are full of stored food.', ''], b: g => {
            const o = onion(g, 528, 350, 1.0);
            return { labs: [[lab(g, 528 + 70, 330, 820, 300, 'Fleshy leaves'), wt('M4', 'fleshy') - 0.1], [lab(g, 528 - 40, 480, 300, 470, 'Roots', 'end'), wt('M4', 'onion') + 0.2]],
              els: o.LY.map((l, i) => [l, wt('M4', 'fleshy') - 0.2 + i * 0.15, { ...POP, sc: 0.85 }]) }; } },
        { t: T0('M5'), chip: 3, info: ['MAKING FOOD', 'Australian acacia', 'Leaves are small and fall early. The flat, green petiole makes the food.', ''], b: g => {
            const a = acacia(g, 528, 500, 1.15), tf = wt('M5', 'fall');
            return { labs: [[lab(g, 528 + 4 + 100 * 1.15 * 0.88, 500 - 60 * 1.15 - 46, 820, 280, 'Flat green petiole'), wt('M5', 'petiole') - 0.1], [lab(g, 528 + 60, 500 - 340 * 1.15 - 34, 760, 60, 'Small leaflets'), wt('M5', 'small') - 0.1]],
              els: a.PH.map((ph, i) => [ph, T0('M5') + 0.3 + i * 0.15, { ...POP, sc: 0.3 }]),
              anim: t => a.LF.forEach((lf, i) => { const k = M.clamp((t - tf - (i % 6) * 0.08) / 0.6); lf.style.opacity = (1 - k).toFixed(3); lf.setAttribute('transform', `translate(0 ${(k * 60).toFixed(1)})`); }) }; } },
        { t: T0('M6'), chip: 4, info: ['CATCHING INSECTS', 'Pitcher and trap', 'The pitcher of the pitcher plant and the trap of the Venus flytrap are leaves too.', ''], b: g => {
            const p = pitcher(g, 320, 420, 1.3), f = flytrap(g, 760, 440, 1.4);
            return { labs: [[lab(g, 320 + 5 * 1.3, 420 - 110 * 1.3, 120, 300, 'Pitcher', 'end'), wt('M6', 'pitcher') - 0.1], [lab(g, 320 + 30 * 1.3, 420 - 245 * 1.3, 120, 60, 'Lid', 'end'), wt('M6', 'pitcher', 1)], [lab(g, 760 + 60, 440 - 140 * 1.4, 900, 120, 'Trap'), wt('M6', 'trap') - 0.1]],
              els: [[p, T0('M6') + 0.2, { dy: 20 }], [f, wt('M6', 'trap') - 0.4, { dy: 20 }]],
              anim: t => { const u = ((t - wt('M6', 'Venus')) / 2.6) % 1, k = t < wt('M6', 'Venus') ? 0 : (u < 0.3 ? u / 0.3 : u < 0.6 ? 1 : 1 - (u - 0.6) / 0.4); f.LB.forEach((lb, i) => lb.setAttribute('transform', `rotate(${((i ? -1 : 1) * 28 * M.io(k)).toFixed(1)} 0 -80)`)); } }; } }] }],
  V: { h0: 'Reticulate · peepal', h1: 'Parallel · grass', tH: [wt('C1', 'venation') - 0.1, wt('C1', 'venation') + 0.3],
    rows: [['Job', 'Carry water and food', 'Carry water and food', 1, wt('C2', 'carry'), wt('C2', 'carry') + 0.3], ['Blade', 'Kept stiff', 'Kept stiff', 1, wt('C2', 'stiff'), wt('C2', 'stiff') + 0.3],
      ['Pattern', 'A net', 'Side by side', 0, wt('C3', 'net'), wt('C3', 'side')], ['Usually in', 'Dicots (peepal)', 'Monocots (grass)', 0, wt('C3', 'dicot'), wt('C3', 'monocot')]],
    think: { q: 'A leaf has veins running side by side, from base to tip. Monocot or dicot?', opts: ['Monocot', 'Dicot'], right: 0, why: 'Monocot. Parallel venation is typical of most monocots.' },
    tOpts: wt('C4', 'monocot') - 0.1, tWhy: wt('C5', 'Parallel') - 0.2 },
  stmt: { st2: 'Veins make <span class="acc">venation</span>.', st2T: wt('T1', 'Venation') - 0.3, stF: `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">leaves on the stem make <b style="color:${STEM}">phyllotaxy</b></span>`, stFT: wt('T1', 'Phyllotaxy') - 0.1 },
  Wk: { label: 'WORKED EXAMPLE · READ FOUR PLANTS', clues: [['Guava: two leaves at each node, facing each other', 1, 'W2'], ['Alstonia: a ring of leaves at one node', 3, 'W3'], ['Onion: thick, juicy layers', 0, 'W4', 'Those'], ['Australian acacia: a flat green petiole', 2, 'W5']],
    targets: ['Fleshy leaves', 'Opposite', 'Leaf-like petiole', 'Whorled'] },
  trap: { wrong: 'The pea tendril and the cucumber tendril are the same', right: 'Pea tendril: a leaf. Cucumber tendril: a stem.', tWrong: wt('X2', 'pea') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'pea') - 0.1,
    draw: s => { const a = peaLeaf(s, 20, 190, 0.42, false), b = grp(s);
      mk(b, 'path', { d: 'M300,200 C300,150 310,110 300,40', stroke: STEM, 'stroke-width': 5, fill: 'none' }); leaf(b, 300, 150, 60, -150, { w: 0.6, ven: 'net' }); bud(b, 306, 128, 0.8);
      mk(b, 'path', { d: 'M304,128 C330,110 350,100 370,96 c12,-4 14,10 2,12 c-12,2 -12,-12 2,-14 c12,-4 14,10 2,12', stroke: '#5E9E3E', 'stroke-width': 3, fill: 'none' });
      const ta = grp(s); mk(ta, 'rect', { x: 50, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(ta, 110, 237, 'LEAF', C.ok);
      const tb = grp(s); mk(tb, 'rect', { x: 270, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(tb, 330, 237, 'STEM', C.ok);
      return { els: [[a, wt('X3', 'pea') - 0.1, { ...POP, sc: 0.5 }], [ta, wt('X3', 'leaf') - 0.1, POP], [b, wt('X3', 'cucumber') - 0.1, { ...POP, sc: 0.5 }], [tb, wt('X3', 'stem') - 0.1, POP]] }; } },
  where: { type: 'Matching a plant with its phyllotaxy or its leaf modification', tType: wt('E1', 'matching') },
  mcq: { pat: 'NEET PATTERN · MATCH THE FOLLOWING', qW: 960,
    q: 'Match list I with list II.<div class="cols2"><div><div class="sl"><b>A</b>Alternate</div><div class="sl"><b>B</b>Opposite</div><div class="sl"><b>C</b>Whorled</div><div class="sl"><b>D</b>Leaf tendril</div></div><div><div class="sl"><b>1</b><i>Alstonia</i></div><div class="sl"><b>2</b>Pea</div><div class="sl"><b>3</b>Guava</div><div class="sl"><b>4</b>Mustard</div></div></div>',
    opts: ['A-4, B-1, C-3, D-2', 'A-3, B-4, C-2, D-1', 'A-4, B-3, C-1, D-2', 'A-2, B-3, C-1, D-4'], right: 2, optW: 474, optY: 400, optH: 84, optFs: 26 },
  tOpts: wt('Q1', 'Match') - 0.2,
  so: [['Answer: <b style="color:var(--ok)">C</b>'], ['<b>A-4</b>: mustard, alternate'], ['<b>B-3</b> guava · <b>C-1</b> <i>Alstonia</i>'], ['<b>D-2</b>: pea, leaf tendril']],
  tSo: [wt('A1', 3) + 0.1, wt('A2', 'Mustard'), wt('A2', 'guava'), wt('A3', 'peas')],
  fc: { title: 'Recap · the leaf', lines: ['<b>Leaf</b>: at a node, bud in its axil · leaf base (stipules), petiole, lamina (midrib, veins)', '<b>Venation</b>: reticulate, a net (dicots, peepal) · parallel (most monocots, grass)',
    '<b>Phyllotaxy</b>: alternate (china rose, mustard) · opposite (<i>Calotropis</i>, guava) · whorled (<i>Alstonia</i>)', '<b>Climb</b>: pea tendrils · <b>Defend</b>: cactus spines · <b>Store</b>: onion, garlic', '<b>Make food</b>: Australian acacia petiole · <b>Catch</b>: pitcher plant, Venus flytrap'] },
  Y: ['Name the three parts of a typical leaf.', 'Which type of phyllotaxy does Alstonia show?', 'In Australian acacia, which part makes the food?'],
  next: { label: 'NEXT · EP 43', topic: 'Oldest flowers at the bottom: Inflorescence' },
  cam: [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('Z4') - 0.3, 1.05, 960, 580], [T0('Z5') - 0.2, 1, 960, 540]],
};

/* ================= shared episode template ================= */
Object.assign(M.IC, EP.icons || {});
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = tt => tt - 0.32;
const LADS = EP.ladders, tL0 = LADS[0].t0;

/* title card */
$('#jobs').innerHTML = EP.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = EP.jobs.map(j => wt('H1', j[3], j[4] || 0));

/* H */
$('#hlL').textContent = EP.hook.label; $('#hlP').innerHTML = EP.hook.pill;
const HK = EP.hook.draw($('#hlS'));
$('#hkL').textContent = EP.hook.cardL; $('#hkImg').src = IMG + EP.hook.img; $('#hkP').textContent = EP.hook.q;
$('#splL').textContent = EP.plan.label; $('#splP').textContent = EP.plan.pill;
$('#sbs').innerHTML = EP.plan.rows.map(([ic, n, s], i) => `<div class="sb" id="sb${i}" style="top:${84 + i * 94}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="sn">${n}</div><div class="ss">${s}</div></div>`).join('');

/* D */
$('#dwL').textContent = EP.D.label;
const ND = EP.D.tiles.length, TW = (1528 - (ND - 1) * 20) / ND;
$('#gts').innerHTML = EP.D.tiles.map(([n, s], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * (TW + 20)}px;width:${TW}px"><div class="gx">${i + 1} OF ${ND}</div><svg id="gs${i}" width="${TW}" height="230" style="position:absolute;left:0;top:0"></svg><div class="gn">${n}</div><div class="gs" style="width:${TW - 36}px">${s}</div></div>`).join('');
const DT = EP.D.tiles.map((d, i) => d[3]($('#gs' + i), TW) || []);
const DA = EP.D.arrows ? EP.D.tiles.slice(1).map((_, i) => mk($('#dwS'), 'path', { d: `M${36 + (i + 1) * (TW + 20) - 16},266 l12,0 m-6,-8 l8,8 l-8,8`, stroke: C.ac, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })) : [];
const TC = EP.D.chips || [];
$('#tcs').innerHTML = TC.map(([ic, n], i) => `<div class="tc" id="tc${i}">${M.icon(ic, 24, '#fff', 2.2)}${n}</div>`).join('');

/* ladders (zoom ladder / stage chains) */
LADS.forEach(L => {
  const root = document.createElement('div'); root.id = 's' + L.key; $('#cam').insertBefore(root, $('#sV'));
  root.innerHTML = `<div class="lch" id="${L.key}ch">${L.chips.map((n, i) => `<span class="zc" id="${L.key}c${i}">${n}</span>${i < L.chips.length - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('')}</div>
    <div class="card ldg" id="${L.key}d"><svg id="${L.key}S" width="1056" height="526" style="position:absolute;left:0;top:0"></svg></div>
    <div class="card lif" id="${L.key}i"></div>`;
  L.root = root; const s = $('#' + L.key + 'S');
  L.lv.forEach((v, k) => { v.g = grp(s); v.r = Object.assign({ labs: [], els: [], draws: [] }, v.b ? v.b(v.g) || {} : {});
    if (v.info) { const [eb, n, d, h] = v.info, el = document.createElement('div'); el.className = 'lvI'; el.id = `${L.key}v${k}`;
      el.innerHTML = `<div class="lbl" style="left:36px;top:30px">${eb}</div><div class="ln">${n}</div><div class="ld">${d}</div>${h ? `<div class="lh">${h}</div>` : ''}`; $('#' + L.key + 'i').appendChild(el); v.ie = el; } });
  if (L.av) L.avF = PUC.avatar(root, { x: 1248 + 28, y: 324 + 526 - 104, who: L.av.who || 'Diya', face: IMG + (L.av.who === 'Aarav' ? 'aarav' : 'diya') + '-face.jpg', text: L.av.text });
});

/* V + think */
$('#vh0').innerHTML = EP.V.h0; $('#vh1').innerHTML = EP.V.h1;
$('#vrs').innerHTML = EP.V.rows.map(([k, a, b, same], i) => `<div class="vr" id="vr${i}" style="top:${100 + i * 92}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:320px">${a}</div><div class="vt" id="vt${i}b" style="left:890px">${b}</div>
  <div class="eq" id="eq${i}" style="background:${same ? C.soft : C.ac};color:${same ? C.mute : '#fff'}">${same ? 'SAME' : 'DIFFERENT'}</div></div>`).join('');
const th1 = PUC.think($('#th1'), EP.V.think);

/* statement */
$('#st2').innerHTML = EP.stmt.st2; $('#stF').innerHTML = EP.stmt.stF;

/* W: matching */
$('#wbL').textContent = EP.Wk.label;
const MC = EP.Wk.clues, MG = EP.Wk.targets, MGY = EP.Wk.tY || MG.map((_, j) => 84 + j * 116);
$('#mcs').innerHTML = MC.map(([s], i) => `<div class="mc" id="mc${i}" style="top:${84 + i * 116}px"><div class="mn">${i + 1}</div><div class="mt2">${s}</div></div>`).join('') + MG.map((g, j) => `<div class="mg" id="mg${j}" style="top:${MGY[j]}px">${g}</div>`).join('');
const MLN = MC.map(([s, j], i) => mk($('#wS'), 'path', { d: `M936,${132 + i * 116} C1060,${132 + i * 116} 1060,${MGY[j] + 48} 1180,${MGY[j] + 48}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none' }));
const tMc = MC.map(m => T0(m[2])), tMg = MC.map(m => wt(m[2], m[3] || 'That'));

/* X / Q / F */
const trap = PUC.trap($('#trap'), { wrong: EP.trap.wrong, right: EP.trap.right });
const TPE = EP.trap.draw($('#tS'));
const where = PUC.where($('#wa'), { on: [], type: EP.where.type });
const mcq = PUC.mcq($('#mq'), EP.mcq);
const so = PUC.solution($('#so'), EP.so, { y0: 100, dy: 100 });
const fc = PUC.fcard($('#sF'), { x: 230, y: 262, w: 1460, h: 470, title: EP.fc.title, y0: 100, dy: 70, txt: EP.fc.lines.map(() => 1), lines: EP.fc.lines });
$('#yrs').innerHTML = EP.Y.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: EP.next.label, topic: EP.next.topic, y: 764 });

/* helpers */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), EP.cam);
let geo = null;
const fit = (el, maxW, min = 20) => { let fs = parseFloat(getComputedStyle(el).fontSize); while (el.scrollWidth > maxW && fs > min) { fs -= 1; el.style.fontSize = fs + 'px'; } };
function measure() {
  geo = 1;
  let w = 0; TC.forEach((_, i) => w += $('#tc' + i).offsetWidth); w += Math.max(0, TC.length - 1) * 16; let x = 800 - w / 2; TC.forEach((_, i) => { const e = $('#tc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  document.querySelectorAll('.lvI').forEach(el => { const n = el.querySelector('.ln'), d = el.querySelector('.ld'), h = el.querySelector('.lh'); fit(n, 440, 30); const nb = n.offsetTop + n.offsetHeight; d.style.top = (nb + 14) + 'px'; if (h) h.style.top = (d.offsetTop + d.offsetHeight + 22) + 'px'; });
  document.querySelectorAll('.gt .gn').forEach(el => fit(el, TW - 36, 18));
  document.querySelectorAll('.mc .mt2').forEach(el => fit(el, 800, 18));
  document.querySelectorAll('.yr .q').forEach(el => fit(el, 1380, 22));
  const g = $('#ghT'); if (g) g.style.left = (960 - g.offsetWidth / 2) + 'px';
}
const chipSet = (el, on, done) => { el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; };
const runEls = (arr, t) => (arr || []).forEach(([e, tt, op]) => M.vis(e, t, tt, 1e9, op || POP));

/* frame */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  EP.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  if ($('#ghT')) M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT(tD1);
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    runEls(HK.els, t); (HK.draws || []).forEach(([p, tt, d]) => M.draw(p, t, tt, d || 0.6)); HK.anim && HK.anim(t);
    M.vis($('#hlP'), t, EP.hook.pillT, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, EP.hook.qT, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { EP.plan.rows.forEach((_, i) => M.vis($('#sb' + i), t, EP.plan.rowT[i], 1e9, { dx: -16, dy: 0 })); M.vis($('#splP'), t, Math.min(EP.plan.pillT, tH4 + 0.6), 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL0 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dw'), t, tD1 + 0.05, OUT(tL0), { dy: 36, ...o });
    if ($('#ghD')) M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 6 });
    EP.D.tiles.forEach((g, i) => { if (M.vis($('#gt' + i), t, g[2] - 0.15, 1e9, { dy: 24 })) runEls(DT[i].els || [], t), DT[i].anim && DT[i].anim(t); });
    DA.forEach((a, i) => M.vis(a, t, EP.D.tiles[i + 1][2] - 0.3, 1e9, POP));
    TC.forEach((c, i) => M.vis($('#tc' + i), t, c[2] - 0.1, 1e9, POP));
  }

  /* ladders */
  LADS.forEach(L => {
    const on = t >= L.t0 - 0.1 && t < L.tEnd + 0.1; M.hide(L.root, !on); if (!on) return;
    const out = OUT(L.tEnd);
    M.vis($('#' + L.key + 'ch'), t, L.t0, out, { dy: 12, ...o });
    M.vis($('#' + L.key + 'd'), t, L.t0 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#' + L.key + 'i'), t, L.t0 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; L.lv.forEach((v, k) => { if (t >= v.t - 0.05) cur = k; });
    const cc = L.lv[cur].chip ?? cur;
    L.chips.forEach((_, i) => chipSet($('#' + L.key + 'c' + i), i === cc, i < cc));
    L.lv.forEach((v, k) => {
      if (v.ie) { let n = k + 1; while (n < L.lv.length && !L.lv[n].ie) n++; M.vis(v.ie, t, v.t + 0.3, n < L.lv.length ? L.lv[n].t + 0.1 : 1e9, { dy: 20, outDur: 0.25, ody: -12 }); }
      if (v.cont) return; let nn = k + 1; while (nn < L.lv.length && L.lv[nn].cont) nn++;
      const tout = v.keep || nn >= L.lv.length ? 1e9 : L.lv[nn].t;
      const vo = M.vis(v.g, t, v.t + 0.1, tout, { dy: 0, sc: 0.95, fade: 0.3, outDur: 0.3, osc: 1.03, ody: 0 });
      if (vo) { v.r.labs.forEach(([l, tt]) => labRun(l, t, tt)); runEls(v.r.els, t); v.r.draws.forEach(([p, tt, d]) => M.draw(p, t, tt, d || 0.5)); v.r.anim && v.r.anim(t); }
    });
    if (L.avF) L.avF(t, L.av.tin, L.av.tout);
  });

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT(tC4), { dy: 36, ...o });
    M.vis($('#vh0'), t, EP.V.tH[0], 1e9, POP); M.vis($('#vh1'), t, EP.V.tH[1], 1e9, POP);
    let cur = -1; EP.V.rows.forEach((v, i) => { if (t >= v[4] - 0.1) cur = i; });
    EP.V.rows.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, tC1 + 0.6 + i * 0.12, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#vt' + i + 'a'), t, v[4], 1e9, { dx: -12, dy: 0 }); M.vis($('#vt' + i + 'b'), t, v[5], 1e9, { dx: -12, dy: 0 }); M.vis($('#eq' + i), t, v[5] + 0.3, 1e9, POP); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT(tT) + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: EP.V.tOpts, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: EP.V.tWhy });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, EP.stmt.st2T, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, EP.stmt.stFT, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT(tX1), { dy: 36, ...o });
    MG.forEach((_, j) => M.vis($('#mg' + j), t, tW1 + 0.4 + j * 0.1, 1e9, { dx: 16, dy: 0 }));
    const lit = MG.map(() => 0);
    MC.forEach(([s, j], i) => { M.vis($('#mc' + i), t, tMc[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.draw(MLN[i], t, tMg[i] - 0.2, 0.5); lit[j] = Math.max(lit[j], M.io((t - tMg[i]) / 0.3)); });
    MG.forEach((_, j) => { const on = lit[j], el = $('#mg' + j); el.style.background = mix('#FFFFFF', C.ac, on); el.style.borderColor = mix('#CBD0DA', C.ac, on); el.style.color = mix('#9AA0AC', '#FFFFFF', on); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: EP.trap.tWrong, tStrike: EP.trap.tStrike, tRight: EP.trap.tRight });
    runEls(TPE.els, t); TPE.anim && TPE.anim(t);
    where(t, { tin: T0('E1'), tLight: [], tType: EP.where.tType });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: EP.tOpts, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, EP.tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: EP.fc.lines.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
