// PUC Biology Ep 41: The Stem and its Modifications (Living diagram, leaf green)
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

/* ================= Ep 41 content: the stem ================= */
const TUB = '#D9B97A', GIN = '#D9B46A', CORM = '#B79A7A', CACT = '#7DB36A', THN = '#7A5A3A';
const potato = (p, x, y, s = 1, eyes = true) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-70,-10 C-74,-50 -20,-62 20,-52 C70,-44 84,-6 66,26 C48,56 -10,58 -44,44 C-66,34 -68,16 -70,-10 Z', fill: TUB, stroke: BR, 'stroke-width': 3 });
  if (eyes) [[-40, -20], [10, -34], [44, 4], [-6, 22]].forEach(([ex, ey]) => { mk(Q, 'path', { d: `M${ex - 8},${ey} q8,-6 16,0`, stroke: BR, 'stroke-width': 2.2, fill: 'none' }); mk(Q, 'circle', { cx: ex, cy: ey + 3, r: 3, fill: '#7A5A2E' }); }); return W(Q); };
const ginger = (p, x, y, s = 1) => { const Q = G(p, x, y, s), SH = grp(Q);
  mk(Q, 'path', { d: 'M-120,10 C-130,-20 -90,-34 -60,-22 C-40,-40 -10,-36 0,-20 C20,-40 60,-36 70,-14 C100,-30 136,-10 124,16 C110,40 60,30 40,24 C10,40 -30,36 -50,22 C-80,40 -114,34 -120,10 Z', fill: GIN, stroke: BR, 'stroke-width': 3 });
  [-80, -24, 34, 92].forEach(nx => mk(Q, 'path', { d: `M${nx},-24 q-4,22 0,44`, stroke: '#8A6A3A', 'stroke-width': 2.2, fill: 'none' }));
  [-40, 60].forEach(sx => { mk(SH, 'path', { d: `M${sx},-26 L${sx},-150`, stroke: STEM, 'stroke-width': 5, 'stroke-linecap': 'round' }); leaf(SH, sx, -100, 60, -40, { w: 0.22 }); leaf(SH, sx, -130, 56, -140, { w: 0.22 }); });
  const o = W(Q); o.SH = SH; return o; };
const corm = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-56,0 C-60,-44 -24,-60 0,-60 C24,-60 60,-44 56,0 C52,40 20,54 0,54 C-20,54 -52,40 -56,0 Z', fill: CORM, stroke: BR, 'stroke-width': 3 });
  [-30, -6, 18].forEach(yy => mk(Q, 'path', { d: `M-52,${yy} Q0,${yy + 12} 52,${yy}`, stroke: '#7A6248', 'stroke-width': 2, fill: 'none' }));
  for (let k = -3; k <= 3; k++) mk(Q, 'path', { d: `M${k * 12},52 q${k * 3},20 ${k * 6},34`, stroke: '#9A7A4E', 'stroke-width': 2, fill: 'none' });
  mk(Q, 'path', { d: 'M0,-60 L0,-130', stroke: STEM, 'stroke-width': 6, 'stroke-linecap': 'round' }); leaf(Q, 0, -130, 70, -60, { w: 0.55 }); return W(Q); };
const potatoPlant = (p, x, y, s = 1) => { const Q = G(p, x, y, s), T = [], U = [];
  mk(Q, 'path', { d: 'M0,0 L0,-150', stroke: STEM, 'stroke-width': 7, 'stroke-linecap': 'round' });
  [[-40, -30], [-80, -150], [-110, -40], [-130, -140]].forEach(([yy, a]) => leaf(Q, 0, yy, 80, a, { w: 0.4, ven: 'net' }));
  [[-1, 130, 80], [1, 150, 60], [-1, 40, 150], [1, 60, 170]].forEach(([sd, dx, dy]) => { U.push(mk(Q, 'path', { d: `M0,6 C${sd * dx * 0.3},${dy * 0.3} ${sd * dx * 0.7},${dy * 0.5} ${sd * dx},${dy}`, stroke: '#C9B48A', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' })); T.push(potato(Q, sd * dx + sd * 26, dy + 14, 0.5)); });
  for (let k = -3; k <= 3; k++) mk(Q, 'path', { d: `M${k * 4},8 q${k * 6},30 ${k * 9},60`, stroke: '#9A7A4E', 'stroke-width': 1.8, fill: 'none' });
  const o = W(Q); o.T = T; o.U = U; return o; };
const vine = (p, x, y, s = 1) => { const Q = G(p, x, y, s), TD = [];
  mk(Q, 'rect', { x: 52, y: -400, width: 12, height: 400, fill: '#C9A46A', stroke: BR, 'stroke-width': 2.5 });
  mk(Q, 'path', { d: 'M-40,0 C-20,-80 20,-120 10,-200 C0,-270 40,-320 30,-390', stroke: STEM, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  [[-18, -60, 200], [14, -150, -20], [8, -250, 190], [34, -340, -30]].forEach(([lx, ly, a]) => leaf(Q, lx, ly, 70, a, { w: 0.55, ven: 'net' }));
  [[12, -110], [18, -210], [32, -300]].forEach(([tx, ty]) => { let d = `M${tx},${ty} C${tx + 14},${ty - 4} ${tx + 26},${ty - 2} 52,${ty}`; for (let k = 0; k < 3; k++) d += ` C66,${ty - 6 - k * 10} 66,${ty + 4 - k * 10} 50,${ty - 4 - k * 10} C40,${ty - 8 - k * 10} 44,${ty - 14 - k * 10} 58,${ty - 12 - k * 10}`; TD.push(mk(Q, 'path', { d, stroke: '#5E9E3E', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' })); });
  const o = W(Q); o.TD = TD; return o; };
const thornBranch = (p, x, y, s = 1) => { const Q = G(p, x, y, s), TH = [], BD = [];
  mk(Q, 'path', { d: 'M-360,40 C-200,10 0,0 360,-30', stroke: WOOD, 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' });
  [[-260, 22], [-60, 8], [160, -10]].forEach(([nx, ny], k) => { leaf(Q, nx, ny, 110, -150 + (k % 2) * 300 + (k % 2 ? 0 : 0), { w: 0.42, ven: 'net' });
    const th = mk(Q, 'path', { d: `M${nx + 6},${ny - 6} L${nx + 60},${ny - 70} L${nx + 20},${ny - 4} Z`, fill: THN, stroke: BR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); TH.push(th);
    BD.push(bud(Q, nx + 16, ny - 18, 1.1)); });
  const o = W(Q); o.TH = TH; o.BD = BD; return o; };
const opuntia = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  [[0, -80, 70, 100, 0], [-70, -210, 56, 80, -24], [70, -220, 54, 78, 22]].forEach(([cx, cy, rx, ry, r]) => { mk(Q, 'ellipse', { cx, cy, rx, ry, fill: CACT, stroke: BR, 'stroke-width': 3, transform: `rotate(${r} ${cx} ${cy})` });
    for (let k = 0; k < 6; k++) { const a = k * 1.05, sx = cx + Math.cos(a) * rx * 0.55, sy = cy + Math.sin(a) * ry * 0.55; mk(Q, 'path', { d: `M${sx},${sy} l6,-8 M${sx},${sy} l-7,-6`, stroke: '#F3EBD8', 'stroke-width': 2 }); } }); return W(Q); };
const euphorbia = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  [[0, 0, 250], [-46, -70, 150], [46, -90, 170]].forEach(([dx, dy, h]) => { mk(Q, 'path', { d: `M${dx - 16},${dy} L${dx - 16},${dy - h} A16,16 0 0 1 ${dx + 16},${dy - h} L${dx + 16},${dy} Z`, fill: '#6FA85E', stroke: BR, 'stroke-width': 3 }); mk(Q, 'line', { x1: dx, y1: dy - 6, x2: dx, y2: dy - h, stroke: '#4E8A44', 'stroke-width': 2 }); });
  [-1, 1].forEach(sd => mk(Q, 'path', { d: `M0,-60 C${sd * 20},-60 ${sd * 46},-62 ${sd * 46},${sd < 0 ? -70 : -90}`, stroke: BR, 'stroke-width': 0, fill: 'none' })); return W(Q); };
const rosette = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  for (let k = -3; k <= 3; k++) mk(Q, 'path', { d: `M${k * 5},4 q${k * 4},40 ${k * 6},${70 + Math.abs(k) * 6}`, stroke: '#9A7A4E', 'stroke-width': 2.2, fill: 'none' });
  [-60, -25, 25, 60, 0].forEach(a => leaf(Q, 0, 0, 56, -90 + a, { w: 0.5, ven: 'par', fill: '#9CCB8A' })); return W(Q); };
const shoot = (p, x, y, s = 1) => { const Q = G(p, x, y, s); mk(Q, 'path', { d: 'M0,0 L0,-90', stroke: STEM, 'stroke-width': 5, 'stroke-linecap': 'round' }); leaf(Q, 0, -50, 50, -30, { w: 0.4 }); leaf(Q, 0, -70, 46, -150, { w: 0.4 }); return W(Q); };
const seedS = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-60,20 C-62,-16 -10,-26 20,-14 C56,0 60,40 34,56 C8,70 -58,60 -60,20 Z', fill: '#E3C98E', stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M24,52 C30,72 26,92 16,110', stroke: ROOT, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  const pl = mk(Q, 'path', { d: 'M-14,-16 C-4,-50 8,-70 4,-100', stroke: STEM, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); leaf(Q, 4, -100, 30, -60, { w: 0.5 }); leaf(Q, 4, -100, 30, -120, { w: 0.5 }); return W(Q); };
// a stem segment for the D tiles: hl = 'node' | 'inter' | 'bud'
const stemSeg = (sv, w, hl) => { const x = w / 2, R = {};
  mk(sv, 'path', { d: `M${x},224 L${x},28`, stroke: STEM, 'stroke-width': 9, 'stroke-linecap': 'round' });
  [180, 104].forEach((ny, k) => { mk(sv, 'line', { x1: x - 9, y1: ny, x2: x + 9, y2: ny, stroke: BR, 'stroke-width': 3 }); leaf(sv, x + 4, ny, 90, k ? -150 : -30, { w: 0.38, ven: 'net' }); });
  R.tb = bud(sv, x, 22, 1.2);
  if (hl === 'node') R.r = mk(sv, 'circle', { cx: x, cy: 180, r: 24, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
  if (hl === 'inter') R.r = mk(sv, 'path', { d: `M${x - 30},176 L${x - 40},176 L${x - 40},108 L${x - 30},108`, stroke: C.ac, 'stroke-width': 4, fill: 'none' });
  if (hl === 'bud') { R.ab = bud(sv, x + 14, 92, 1.0); R.r = mk(sv, 'circle', { cx: x + 14, cy: 88, r: 18, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '8 6' }); }
  return R; };

const EP_ICONS = {
  potato: ['M5 12c0-5 4-8 9-7s6 6 4 10-8 5-11 3-2-3-2-6Z', 'M9 10h.01', 'M14 9h.01', 'M12 14h.01'],
  ginger: ['M3 15c2-3 5-3 7-1s4 1 6-1 4-2 5 0', 'M8 13V8', 'M15 12V7'],
  vine: ['M8 22V2', 'M8 9c4 0 6 2 6 5s-3 3-3 1 2-3 4-2', 'M8 16c-3 0-5-1-5-4'],
  stem: ['M12 22V3', 'M12 15c-4 0-6-2-7-5 3 0 6 1 7 5Z', 'M12 9c4 0 6-2 7-5-3 0-6 1-7 5Z'],
  loop: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  spread: ['M12 22V8', 'M12 12 6 6', 'M12 12l6-6', 'M12 8V3'],
  pipes: ['M8 3v18', 'M16 3v18', 'M5 7h6', 'M13 12h6', 'M5 17h6'],
  box: ['M3 7l9-4 9 4v10l-9 4-9-4Z', 'M3 7l9 4 9-4', 'M12 11v10'],
  shield: ['M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z'],
  seedl: ['M12 22v-9', 'M12 13c-4 0-7-3-7-7 4 0 7 3 7 7Z', 'M12 13c4 0 7-3 7-7-4 0-7 3-7 7Z'],
};
const EP = { icons: EP_ICONS,
  jobs: [['potato', 'A potato', 'SPROUTING IN THE BASKET', 'potato'], ['ginger', 'A knob of ginger', 'FROM UNDER THE SOIL', 'ginger'], ['vine', 'A cucumber vine', 'CURLING ON A STICK', 'cucumber']],
  hook: { label: 'DOES THIS LOOK LIKE A STEM?', pill: 'None of them looks like a stem', pillT: wt('H2', 'None') - 0.1, img: 'scene-kitchen.jpg', cardL: 'DIYA · THE KITCHEN BASKET', q: 'Why is a potato a stem?', qT: wt('H3', 'why') - 0.3,
    draw: s => { soil(s, 380, 0, 784, 200);
      const a = potato(s, 140, 300, 0.9), sh = shoot(s, 170, 268, 0.8), b = ginger(s, 400, 420, 0.8), c = vine(s, 640, 420, 0.82);
      return { els: [[a, tMorph + 0.4, { dy: 20 }], [sh, tMorph + 0.8, { ...POP, sc: 0.3 }], [b, tMorph + 0.7, { dy: 20 }], [c, tMorph + 1.0, { dy: 20 }],
        [tag(s, 140, 360, 'POTATO', '#8A6A3A', 16), wt('H2', 'stick') - 0.2, { dy: 6 }], [tag(s, 400, 480, 'GINGER', '#8A6A3A', 16), wt('H2', 'stick'), { dy: 6 }], [tag(s, 600, 470, 'CUCUMBER', STEM, 16), wt('H2', 'stick') + 0.2, { dy: 6 }]],
        draws: c.TD.map((d, i) => [d, tMorph + 1.4 + i * 0.2, 0.6]) }; } },
  plan: { label: 'SPOT A STEM IN DISGUISE', rows: [['stem', 'What makes a stem', 'NODES · BUDS'], ['potato', 'Hidden stems', 'UNDER THE SOIL'], ['loop', 'Stems with new jobs', 'CLIMB · PROTECT · FEED · SPREAD']],
    rowT: [wt('H4', 'nodes') - 0.2, wt('H5', 'soil') - 0.2, wt('H5', 'tendril') - 0.2], pill: 'Nodes and buds decide', pillT: wt('H4', 'carries') - 0.2 },
  D: { label: 'WHAT MAKES A STEM', arrows: false,
    tiles: [['Plumule', 'The baby shoot inside a seed', T0('D1') + 0.4, sv => { seedS(sv, 170, 118, 1); return { els: [[tag(sv, 240, 40, 'PLUMULE', STEM), wt('D1', 'plumule'), { dy: 6 }]] }; }],
      ['Node', 'Where a leaf grows on the stem', T0('D2'), sv => { const r = stemSeg(sv, 367, 'node'); return { els: [[r.r, wt('D2', 'nodes'), POP]] }; }],
      ['Internode', 'The part between two nodes', wt('D2', 'internode') - 0.4, sv => { const r = stemSeg(sv, 367, 'inter'); return { els: [[r.r, wt('D2', 'internode'), POP]] }; }],
      ['Buds', 'Terminal at the tip, axillary in the axil', T0('D3'), sv => { const r = stemSeg(sv, 367, 'bud'); return { els: [[r.ab, wt('D3', 'axillary', 1) - 0.2, { ...POP, sc: 0.3 }], [r.r, wt('D3', 'axil') - 0.1, POP], [tag(sv, 236, 30, 'TERMINAL', STEM, 13), wt('D3', 'terminal'), { dy: 6 }], [tag(sv, 270, 96, 'AXILLARY', STEM, 13), wt('D3', 'axillary', 1), { dy: 6 }]] }; }]],
    chips: [['spread', 'Holds out branches', wt('D4', 'holds')], ['pipes', 'Carries water and food', wt('D4', 'carries')], ['box', 'Stores food', wt('D5', 'store')], ['shield', 'Support, protection', wt('D5', 'support')], ['seedl', 'Makes new plants', wt('D5', 'new')]] },
  ladders: [
    { key: 'Z', t0: T0('Z1'), tEnd: T0('P1'), chips: ['POTATO PLANT', 'POTATO', 'EYE'],
      lv: [
        { t: T0('Z1') + 0.2, chip: 0, info: ['UNDER THE SOIL', 'Potato plant', 'Thin stems grow under the soil. Potatoes form at their tips.', ''], b: g => { soil(g, 230, 0, 1056, 300);
            const pp = potatoPlant(g, 528, 230, 1.15);
            return { labs: [[lab(g, 528 + 100 * 1.15 * 0.5, 230 + 40, 820, 300, 'Underground stem'), wt('Z2', 'underground') - 0.1], [lab(g, 528 - 156 * 1.15 - 0, 230 + 108, 140, 470, 'Tuber', 'end'), wt('Z2', 'tuber') - 0.1]],
              els: pp.T.map((q, i) => [q, wt('Z2', 'potatoes') + i * 0.12, { ...POP, sc: 0.4 }]), draws: pp.U.map((u, i) => [u, wt('Z2', 'thin') + i * 0.1, 0.5]) }; } },
        { t: T0('Z2'), chip: 0, cont: true, info: ['A SWOLLEN STEM TIP', 'Tuber', 'Each potato is a swollen stem tip, packed with stored food.', ''] },
        { t: T0('Z3'), chip: 1, info: ['LOOK AT THE SKIN', 'Eyes', 'The small dents on the skin of the potato.', ''], b: g => { const p2 = potato(g, 528, 270, 3.4);
            return { labs: [[lab(g, 528 + 10 * 3.4, 270 - 31 * 3.4, 720, 60, 'Eye'), wt('Z3', 'eyes') - 0.1], [lab(g, 528 + 44 * 3.4, 270 + 7 * 3.4, 900, 380, 'Eye', 'end'), wt('Z3', 'eyes') + 0.2]], els: [[p2, T0('Z3') + 0.2, { ...POP, sc: 0.6 }]] }; } },
        { t: T0('Z4'), chip: 2, info: ['CLOSE-UP', 'A node', 'Each eye is a node, with buds in it. A root never has nodes like these.', ''], b: g => {
            mk(g, 'path', { d: 'M-20,526 C60,200 400,90 700,120 C900,140 1040,230 1080,300 L1080,526 Z', fill: TUB, stroke: BR, 'stroke-width': 4 });
            mk(g, 'path', { d: 'M420,236 C470,200 560,196 610,232', stroke: BR, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
            mk(g, 'ellipse', { cx: 516, cy: 272, rx: 74, ry: 34, fill: '#B8955A', stroke: BR, 'stroke-width': 3 });
            const bds = [[490, 268], [522, 260], [552, 272]].map(([bx, by]) => bud(g, bx, by, 1.1, '#A8C97A'));
            const sp = mk(g, 'path', { d: 'M522,256 C516,200 540,150 530,70', stroke: STEM, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
            const lf = [leaf(g, 530, 110, 80, -30, { w: 0.42, ven: 'net' }), leaf(g, 532, 80, 70, -150, { w: 0.42, ven: 'net' })];
            const rt = [-1, 1].map(sd => mk(g, 'path', { d: `M${522 + sd * 20},284 q${sd * 30},40 ${sd * 60},60`, stroke: '#9A7A4E', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
            return { labs: [[lab(g, 516, 290, 300, 400, 'Node', 'end'), wt('Z4', 'node') - 0.1], [lab(g, 552, 268, 760, 300, 'Buds'), wt('Z4', 'buds') - 0.1], [lab(g, 430, 232, 260, 170, 'Scale leaf', 'end'), wt('Z4', 'buds') + 0.4]],
              els: bds.map((b, i) => [b, wt('Z4', 'buds') + i * 0.1, { ...POP, sc: 0.3 }]).concat(lf.map((l, i) => [l, wt('Z5', 'sprout') + 0.4 + i * 0.2, { ...POP, sc: 0.3 }])), draws: [[sp, wt('Z5', 'sprout') - 0.1, 0.8]].concat(rt.map(r => [r, wt('Z5', 'shoots'), 0.5])) }; } },
        { t: T0('Z5'), chip: 2, cont: true, info: ['A STEM AT WORK', 'Sprouting', 'The buds in the eyes grow into new shoots.', ''] }],
      av: { who: 'Diya', text: 'So the eyes are nodes!', tin: wt('Z5', 'stem') + 0.2, tout: T0('P1') - 0.4 } },
    { key: 'P', t0: T0('P1'), tEnd: T0('C1'), chips: ['STORE', 'CLIMB', 'PROTECT', 'MAKE FOOD', 'SPREAD'],
      lv: [
        { t: T0('P1') + 0.2, chip: -1, info: ['STEMS IN DISGUISE', 'Five new jobs', 'Store food, climb, protect, make food and spread.', ''], b: g => {
            const a = potato(g, 130, 280, 0.9), b = vine(g, 330, 400, 0.55), c = thornBranch(g, 528, 300, 0.32), d = opuntia(g, 740, 400, 0.7), e = rosette(g, 930, 280, 1.0);
            return { els: [a, b, c, d, e].map((q, i) => [q, T0('P1') + 0.4 + i * 0.3, { ...POP, sc: 0.5 }]) }; } },
        { t: T0('P2'), chip: 0, info: ['STORING FOOD', 'Underground', 'Potato, ginger, turmeric, zaminkand and Colocasia store food under the soil.', ''], b: g => { soil(g, 200, 0, 1056, 330);
            const a = potato(g, 190, 330, 1.3), b = ginger(g, 528, 340, 1.3), c = corm(g, 870, 330, 1.2);
            const sh = b.SH;
            return { labs: [[lab(g, 190, 300, 190, 410, 'Potato', 'middle'), wt('P2', 'Potato') - 0.1], [lab(g, 528, 350, 528, 410, 'Ginger', 'middle'), wt('P2', 'ginger') - 0.1], [lab(g, 870, 360, 870, 410, 'Colocasia', 'middle'), wt('P2', 'Colocasia') - 0.1]],
              els: [[a, wt('P2', 'Potato') - 0.3, { dy: 20 }], [b, wt('P2', 'ginger') - 0.3, { dy: 20 }], [c, wt('P2', 'Colocasia') - 0.3, { dy: 20 }], [tag(g, 190, 250, 'TUBER', '#8A6A3A', 15), wt('P2', 'Potato'), { dy: 6 }], [tag(g, 690, 250, 'RHIZOME', '#8A6A3A', 15), wt('P2', 'ginger'), { dy: 6 }], [tag(g, 870, 250, 'CORM', '#8A6A3A', 15), wt('P2', 'Colocasia'), { dy: 6 }]],
              anim: t => { const t3 = T0('P3'); let k = 1; if (t > t3) { const u = ((t - t3) / 3.2) % 1; k = u < 0.35 ? 1 - u / 0.35 * 0.92 : u < 0.55 ? 0.08 : 0.08 + (u - 0.55) / 0.45 * 0.92; }
                sh.setAttribute('transform', `translate(0 -26) scale(1 ${k.toFixed(3)}) translate(0 26)`); } }; } },
        { t: T0('P3'), chip: 0, cont: true, info: ['SURVIVING A BAD SEASON', 'Perennation', 'The shoot dies in a dry season. The stored food lets it grow again later.', ''] },
        { t: T0('P4'), chip: 1, info: ['CLIMBING', 'Stem tendrils', 'Axillary buds grow into thin, coiled springs that wrap around a support.', 'Cucumber, pumpkin, grapevine'], b: g => {
            const v = vine(g, 440, 500, 1.15);
            return { labs: [[lab(g, 440 + 60 * 1.15, 500 - 210 * 1.15, 760, 210, 'Stem tendril'), wt('P4', 'tendrils') - 0.1], [lab(g, 440 + 58 * 1.15, 500 - 60 * 1.15, 760, 420, 'Support'), wt('P4', 'support') - 0.1]], draws: v.TD.map((d, i) => [d, wt('P4', 'coiled') - 0.3 + i * 0.25, 0.8]) }; } },
        { t: T0('P5'), chip: 2, info: ['PROTECTION', 'Thorns', 'Axillary buds turn into woody, straight, pointed thorns.', 'Citrus, Bougainvillea'], b: g => {
            const b = thornBranch(g, 528, 300, 1.25);
            return { labs: [[lab(g, 528 + (-60 + 46) * 1.25, 300 + (8 - 50) * 1.25, 400, 90, 'Thorn', 'end'), wt('P5', 'thorns') - 0.1], [lab(g, 528 + (160 + 60) * 1.25, 300 + 60, 860, 430, 'Leaf'), wt('P5', 'axillary') - 0.3]],
              els: b.TH.map((th, i) => [th, wt('P5', 'thorns') + i * 0.15, { ...POP, sc: 0.2 }]), anim: t => b.BD.forEach(q => q.style.opacity = t < wt('P5', 'thorns') ? 1 : 0) }; } },
        { t: T0('P6'), chip: 3, info: ['MAKING FOOD', 'Green stems', 'Opuntia is flat, Euphorbia is fleshy and round. Both have chlorophyll.', 'They do photosynthesis'], b: g => { soil(g, 440, 0, 1056, 100);
            const sun = grp(g); mk(sun, 'circle', { cx: 900, cy: 90, r: 40, fill: '#F6E3A8', stroke: GOLD, 'stroke-width': 4 });
            const ray = [[860, 120, 420, 200], [870, 140, 720, 230]].map(([a, b, c, d]) => flowPath(g, `M${a},${b} L${c},${d}`, GOLD, 4));
            const o2 = opuntia(g, 380, 440, 1.25), e2 = euphorbia(g, 700, 440, 1.1);
            return { labs: [[lab(g, 380, 340, 222, 300, 'Flat green stem', 'end'), wt('P6', 'flat') - 0.1], [lab(g, 716, 300, 860, 300, 'Fleshy stem'), wt('P6', 'fleshy') - 0.1]],
              els: [[o2, wt('P6', 'Opuntia') - 0.2, { dy: 20 }], [e2, wt('P6', 'Euphorbia') - 0.2, { dy: 20 }], [sun, wt('P6', 'photosynthesis') - 0.6, POP]].concat(ray.map(r => [r, wt('P6', 'photosynthesis') - 0.4, { dy: 0 }])), anim: t => ray.forEach(r => flowRun(r, t, 18)) }; } },
        { t: T0('P7'), chip: 4, info: ['SPREADING', 'Mint, jasmine', 'A side branch arches down, touches the ground, and roots there.', ''], b: g => { soil(g, 380, 0, 1056, 160);
            const m = grp(g); mk(m, 'path', { d: 'M260,380 L260,200', stroke: STEM, 'stroke-width': 7, 'stroke-linecap': 'round' }); [[340, -30], [300, -150], [260, -40], [230, -140]].forEach(([yy, a]) => leaf(m, 260, yy, 70, a, { w: 0.45, ven: 'net' }));
            const br = mk(g, 'path', { d: 'M262,330 C360,200 560,180 700,378', stroke: STEM, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
            const nw = shoot(g, 700, 376, 1.0), rt = [-1, 0, 1].map(k => mk(g, 'path', { d: `M${700 + k * 8},382 q${k * 14},30 ${k * 22},60`, stroke: '#9A7A4E', 'stroke-width': 3, fill: 'none' }));
            return { labs: [[lab(g, 480, 222, 520, 100, 'Side branch'), wt('P7', 'branch') - 0.1], [lab(g, 716, 420, 860, 460, 'New roots'), wt('P7', 'roots') - 0.1]], draws: [[br, wt('P7', 'arches') - 0.4, 1.0]].concat(rt.map(r => [r, wt('P7', 'roots') - 0.2, 0.4])), els: [[nw, wt('P7', 'roots'), { ...POP, sc: 0.3 }]] }; } },
        { t: T0('P8'), chip: 4, info: ['SPREADING ON WATER', 'Pistia', 'A short side branch carries a rosette of leaves and a tuft of roots.', 'Also Eichhornia'], b: g => {
            mk(g, 'rect', { x: 0, y: 250, width: 1056, height: 300, fill: '#DCEBF3' }); mk(g, 'path', { d: 'M0,250 q40,-8 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0', stroke: WAT, 'stroke-width': 4, fill: 'none' });
            const a = rosette(g, 330, 250, 1.6), br = mk(g, 'path', { d: 'M340,256 C440,270 560,270 690,256', stroke: STEM, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), b = rosette(g, 700, 250, 1.2);
            return { labs: [[lab(g, 290, 190, 140, 120, 'Rosette of leaves', 'end'), wt('P8', 'rosette') - 0.1], [lab(g, 700, 330, 860, 420, 'Tuft of roots'), wt('P8', 'tuft') - 0.1], [lab(g, 520, 268, 520, 440, 'Short side branch', 'middle'), wt('P8', 'short') - 0.1]],
              els: [[a, T0('P8') + 0.2, { dy: 20 }], [b, wt('P8', 'new') - 0.4, { ...POP, sc: 0.3 }]], draws: [[br, wt('P8', 'short') - 0.2, 0.8]] }; } }] }],
  V: { h0: 'Thorn · Bougainvillea', h1: 'Spine · cactus', tH: [wt('C1', 'thorn') - 0.1, wt('C1', 'spine') - 0.1],
    rows: [['Feels', 'Hard and pointed', 'Hard and pointed', 1, wt('C2', 'hard'), wt('C2', 'hard') + 0.3], ['Job', 'Protection', 'Protection', 1, wt('C2', 'protect'), wt('C2', 'protect') + 0.3],
      ['Comes from', 'Axillary bud (stem)', 'Leaf', 0, wt('C3', 'thorn'), wt('C3', 'spine')], ['Example', 'Bougainvillea, Citrus', 'Cactus', 0, wt('C3', 'Bougainvillea'), wt('C3', 'cactus')]],
    think: { q: 'A pointed thorn sits in the axil of a leaf, where a bud should be. Stem or leaf?', opts: ['Stem', 'Leaf'], right: 0, why: 'Stem. It grew from the axillary bud.' },
    tOpts: wt('C4', 'Stem') - 0.1, tWhy: wt('C5', 'It') - 0.2 },
  stmt: { st2: 'Nodes and buds make a <span class="acc">stem</span>.', st2T: wt('T1', 'Nodes') - 0.3, stF: `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">even when it hides <b style="color:${WOOD}">under the soil</b></span>`, stFT: wt('T1', 'hides') - 0.1 },
  Wk: { label: 'WORKED EXAMPLE · NAME EACH STEM', clues: [['Ginger: a thick knob under the soil, full of food', 2, 'W2'], ['Grapevine: a coiled spring around a wire', 0, 'W3'], ['Bougainvillea: a woody point in the leaf axil', 3, 'W4'], ['Opuntia: a flat green pad in the desert', 1, 'W5']],
    targets: ['Stem tendril', 'Flattened green stem', 'Underground stem', 'Stem thorn'] },
  trap: { wrong: 'Every part under the soil is a root', right: 'Potato, ginger, Colocasia: stems under the soil', tWrong: wt('X2', 'every') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'potato') - 0.1,
    draw: s => { const a = potato(s, 110, 120, 1.0), b = ginger(s, 340, 150, 0.8);
      const ta = grp(s); mk(ta, 'rect', { x: 50, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(ta, 110, 237, 'NODES', C.ok);
      const tb = grp(s); mk(tb, 'rect', { x: 280, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(tb, 340, 237, 'BUDS', C.ok);
      return { els: [[a, wt('X3', 'potato') - 0.1, { ...POP, sc: 0.5 }], [b, wt('X3', 'ginger') - 0.1, { ...POP, sc: 0.5 }], [ta, wt('X3', 'nodes') - 0.1, POP], [tb, wt('X3', 'buds') - 0.1, POP]] }; } },
  where: { type: 'Matching plants with stem modifications, or the origin of a part', tType: wt('E1', 'matching') },
  mcq: { pat: 'NEET PATTERN · ASSERTION AND REASON', qW: 820,
    q: '<div class="sl"><b>A</b>Potato is a modified stem.</div><div class="sl"><b>R</b>Potato stores food.</div>',
    opts: ['Both A and R are true, and R explains A', 'Both A and R are true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'], right: 1, cols: 1, optW: 960, optY: 262, optH: 68, optFs: 27 },
  tOpts: wt('Q1', 'Read') - 0.2,
  so: [['Answer: <b style="color:var(--ok)">B</b>'], ['A true, R true'], ['Carrot stores food too'], ['Eyes are nodes, with buds']],
  tSo: [wt('A1', 3) + 0.1, wt('A1', 'Both'), wt('A2', 'carrot'), wt('A3', 'eyes')],
  fc: { title: 'Recap · the stem', lines: ['<b>Stem</b>: grows from the plumule · nodes, internodes, terminal and axillary buds', '<b>Under the soil</b>: potato, ginger, turmeric, zaminkand, <i>Colocasia</i> · food, perennation',
    '<b>Climb</b>: stem tendrils (gourds, grapevine) · <b>Protect</b>: thorns (<i>Citrus</i>, <i>Bougainvillea</i>)', '<b>Make food</b>: flat <i>Opuntia</i>, fleshy <i>Euphorbia</i>', '<b>Spread</b>: mint, jasmine · <i>Pistia</i>, <i>Eichhornia</i> (rosette and roots)'] },
  Y: ['What are the eyes of a potato?', 'Which bud of the stem turns into a tendril or a thorn?', 'How does Opuntia make food without normal leaves?'],
  next: { label: 'NEXT · EP 42', topic: 'A pea tendril, a cactus spine: The Leaf' },
  cam: [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('Z4', 'Each') - 0.3, 1.05, 960, 580], [T0('P1') - 0.2, 1, 960, 540]],
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
