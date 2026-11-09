// PUC Biology Ep 40: The Root: Types and Modifications (Living diagram, leaf green)
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

/* ================= Ep 40 content: the root ================= */
const CAR = '#E8873A', CARD = '#B8611E', SWP = '#C0605A', MUD = '#8A7350', MUDL = '#BBA57E', O2 = '#7FC3D9';
// drawing kit for roots
const greens = (p, x, y, s = 1) => { const Q = G(p, x, y, s); [[-1, 1.0], [0, 1.15], [1, 0.95]].forEach(([d, k]) => { mk(Q, 'path', { d: `M0,0 C${d * 8},-30 ${d * 22},-60 ${d * 30},${-90 * k}`, stroke: STEM, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
  for (let q = 1; q <= 4; q++) { const tx = d * 30 * q / 4.4, ty = -90 * k * q / 4.4; [-1, 1].forEach(sd => mk(Q, 'path', { d: `M${tx},${ty} q${sd * 10},-4 ${sd * 16},-14`, stroke: '#5E9E52', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })); } }); return W(Q); };
const carrot = (p, x, y, s = 1, L = 230) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: `M-30,0 C-28,${L * 0.35} -12,${L * 0.74} 0,${L} C12,${L * 0.74} 28,${L * 0.35} 30,0 Z`, fill: CAR, stroke: BR, 'stroke-width': 3 });
  for (let k = 1; k <= 5; k++) { const yy = k * L * 0.14, hw = 30 * (1 - yy / L) * 0.8; mk(Q, 'path', { d: `M${-hw},${yy} q${hw * 0.5},4 ${hw * 0.9},0`, stroke: CARD, 'stroke-width': 2, fill: 'none' }); mk(Q, 'path', { d: `M${hw},${yy + 10} l14,8`, stroke: CARD, 'stroke-width': 1.6 }); }
  greens(Q, 0, 0, 1); return W(Q); };
const turnip = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M0,170 L0,112', stroke: BR, 'stroke-width': 2.5 });
  mk(Q, 'path', { d: 'M-8,0 C-66,10 -64,96 0,114 C64,96 66,10 8,0 Z', fill: '#F3ECE6', stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M-8,0 C-50,6 -60,34 -58,46 C-20,38 20,38 58,46 C60,34 50,6 8,0 Z', fill: '#B46AA0', stroke: BR, 'stroke-width': 2.5 });
  greens(Q, 0, 0, 0.9); return W(Q); };
const sweetPotato = (p, x, y, s = 1) => { const Q = G(p, x, y, s), T = [];
  mk(Q, 'path', { d: 'M0,10 L0,-70', stroke: STEM, 'stroke-width': 7, 'stroke-linecap': 'round' }); leaf(Q, 0, -60, 70, -30, { w: 0.5 }); leaf(Q, 0, -40, 64, -150, { w: 0.5 });
  [[-60, 120, 30, 120], [0, 150, 4, 140], [64, 120, -28, 110]].forEach(([dx, dy, r, L]) => { mk(Q, 'path', { d: `M0,10 C${dx * 0.2},40 ${dx * 0.6},${dy * 0.4} ${dx},${dy * 0.55}`, stroke: '#8A5A3A', 'stroke-width': 3, fill: 'none' });
    const q = G(Q, dx, dy, 1, r); mk(q, 'ellipse', { cx: 0, cy: 0, rx: 30, ry: L / 2.2, fill: SWP, stroke: BR, 'stroke-width': 3 }); mk(q, 'path', { d: `M-10,${-L / 4} q6,10 2,22 M8,6 q-4,10 2,20`, stroke: '#8E3F3A', 'stroke-width': 2, fill: 'none' }); mk(q, 'path', { d: `M0,${L / 2.2} l0,26`, stroke: '#8A5A3A', 'stroke-width': 2 }); T.push(W(q)); });
  const o = W(Q); o.tub = T; return o; };
const potato = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-70,-10 C-74,-50 -20,-62 20,-52 C70,-44 84,-6 66,26 C48,56 -10,58 -44,44 C-66,34 -68,16 -70,-10 Z', fill: '#D9B97A', stroke: BR, 'stroke-width': 3 });
  [[-40, -20], [10, -34], [44, 4], [-6, 22]].forEach(([ex, ey]) => { mk(Q, 'path', { d: `M${ex - 8},${ey} q8,-6 16,0`, stroke: BR, 'stroke-width': 2.2, fill: 'none' }); mk(Q, 'circle', { cx: ex, cy: ey + 3, r: 3, fill: '#7A5A2E' }); }); return W(Q); };
const banyan = (p, x, y, s = 1, H = 300, grow = true) => { const Q = G(p, x, y, s), P = [];
  mk(Q, 'path', { d: `M-26,0 L-20,${-H * 0.62} L20,${-H * 0.62} L26,0 Z`, fill: '#9A7A56', stroke: BR, 'stroke-width': 3 });
  [[-1], [1]].forEach(([sd]) => mk(Q, 'path', { d: `M0,${-H * 0.6} C${sd * 60},${-H * 0.66} ${sd * 150},${-H * 0.64} ${sd * 230},${-H * 0.6}`, stroke: '#9A7A56', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' }));
  mk(Q, 'path', { d: `M-250,${-H * 0.62} C-270,${-H * 0.9} -150,${-H * 1.08} -40,${-H} C20,${-H * 1.12} 160,${-H * 1.06} 250,${-H * 0.86} C290,${-H * 0.74} 240,${-H * 0.6} 200,${-H * 0.64} C120,${-H * 0.6} -120,${-H * 0.6} -250,${-H * 0.62} Z`, fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  [-200, -130, -70, 80, 150, 210].forEach(px => P.push(mk(Q, 'path', { d: `M${px},${-H * 0.6 + 8} C${px + 3},${-H * 0.35} ${px - 3},${-H * 0.15} ${px},0`, stroke: '#7A5A3A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' })));
  const o = W(Q); o.props = P; return o; };
const maize = (p, x, y, s = 1, H = 330) => { const Q = G(p, x, y, s), S = [], N = [];
  mk(Q, 'path', { d: `M-7,0 L-5,${-H} L5,${-H} L7,0 Z`, fill: '#8FBF5E', stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 6; k++) { const yy = -26 - k * 52; N.push(mk(Q, 'line', { x1: -9, y1: yy, x2: 9, y2: yy, stroke: BR, 'stroke-width': 3 }));
    if (k >= 1) { const sd = k % 2 ? 1 : -1; mk(Q, 'path', { d: `M0,${yy} C${sd * 50},${yy - 50} ${sd * 110},${yy - 30} ${sd * 150},${yy + 30} C${sd * 100},${yy - 14} ${sd * 50},${yy - 20} 0,${yy + 8} Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 2.2 }); } }
  mk(Q, 'path', { d: `M0,${-H} l-14,-34 M0,${-H} l0,-40 M0,${-H} l14,-34`, stroke: '#C9A44A', 'stroke-width': 4, 'stroke-linecap': 'round' });
  [[-26, -1, 70], [-26, 1, 70], [-78, -1, 110], [-78, 1, 110]].forEach(([yy, sd, L]) => S.push(mk(Q, 'path', { d: `M${sd * 6},${yy} C${sd * L * 0.4},${yy + 10} ${sd * L * 0.8},${yy - yy * 0.6} ${sd * L},26`, stroke: '#B08A5A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' })));
  const o = W(Q); o.stilts = S; o.nodes = N; return o; };
const mustard = (p, x, y, s = 1, L = 180) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M0,0 L0,-120', stroke: STEM, 'stroke-width': 5, 'stroke-linecap': 'round' }); leaf(Q, 0, -30, 52, -25, { w: 0.45 }); leaf(Q, 0, -60, 46, -160, { w: 0.45 });
  [[-12, -128], [0, -138], [12, -126]].forEach(([fx, fy]) => bloom(Q, fx, fy, 12, 4, YEL, '#C9962B'));
  mk(Q, 'path', { d: `M-7,0 C-6,${L * 0.5} -2,${L * 0.85} 0,${L} C2,${L * 0.85} 6,${L * 0.5} 7,0 Z`, fill: ROOTL, stroke: BR, 'stroke-width': 2.5 });
  for (let k = 1; k <= 5; k++) { const yy = k * L * 0.16, sd = k % 2 ? 1 : -1, l = 46 - k * 5; mk(Q, 'path', { d: `M${sd * 4},${yy} q${sd * l * 0.6},6 ${sd * l},${l * 0.6}`, stroke: '#9A7A4E', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }); }
  return W(Q); };
const wheat = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  [[-16, -120], [0, -150], [16, -118]].forEach(([dx, dy]) => mk(Q, 'path', { d: `M0,0 Q${dx * 0.3},${dy * 0.5} ${dx},${dy}`, stroke: '#7FB069', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
  mk(Q, 'ellipse', { cx: 0, cy: -164, rx: 7, ry: 22, fill: '#D8B65A', stroke: BR, 'stroke-width': 2 });
  for (let k = 0; k < 11; k++) { const a = -60 + k * 12; mk(Q, 'path', { d: `M0,2 Q${a * 0.6},50 ${a * 1.2},${120 + (k % 3) * 18}`, stroke: '#9A7A4E', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }); } return W(Q); };
const grass = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-130,0 L130,0', stroke: '#7FB069', 'stroke-width': 6, 'stroke-linecap': 'round' });
  [-100, -20, 60].forEach(nx => { mk(Q, 'circle', { cx: nx, cy: 0, r: 5, fill: STEM });
    [[-12, -50], [0, -64], [12, -48]].forEach(([dx, dy]) => mk(Q, 'path', { d: `M${nx},0 Q${nx + dx * 0.3},${dy * 0.6} ${nx + dx},${dy}`, stroke: '#7FB069', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
    [-14, 0, 14].forEach(dx => mk(Q, 'path', { d: `M${nx},3 Q${nx + dx},40 ${nx + dx * 1.6},${70 + Math.abs(dx)}`, stroke: '#9A7A4E', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' })); }); return W(Q); };
const seedR = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M-60,-10 C-62,-46 -10,-56 20,-44 C56,-30 60,10 34,26 C8,40 -58,30 -60,-10 Z', fill: '#E3C98E', stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M24,22 C30,50 26,80 16,104', stroke: ROOT, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
  mk(Q, 'path', { d: 'M-20,-36 C-6,-60 12,-66 22,-84', stroke: STEM, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); return W(Q); };
const mangrove = (p, x, y, s = 1) => { const Q = G(p, x, y, s), PN = [];
  mk(Q, 'rect', { x: -330, y: 0, width: 660, height: 200, fill: MUD }); mk(Q, 'rect', { x: -330, y: -28, width: 660, height: 28, fill: '#CFE3EE' }); mk(Q, 'line', { x1: -330, y1: -28, x2: 330, y2: -28, stroke: WAT, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M-16,-28 L-12,-200 L12,-200 L16,-28 Z', fill: '#9A7A56', stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M-150,-200 C-170,-280 -60,-330 0,-310 C80,-334 170,-280 150,-210 C120,-180 -110,-176 -150,-200 Z', fill: '#6FA86A', stroke: BR, 'stroke-width': 3.5 });
  [-1, 1].forEach(sd => mk(Q, 'path', { d: `M${sd * 10},-80 C${sd * 60},-90 ${sd * 90},-40 ${sd * 110},10`, stroke: '#7A5A3A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }));
  [-1, 1].forEach(sd => mk(Q, 'path', { d: `M0,30 C${sd * 100},40 ${sd * 200},40 ${sd * 300},34`, stroke: '#6A4E30', 'stroke-width': 6, fill: 'none' }));
  [-280, -230, -180, -130, 130, 180, 230, 280].forEach((px, k) => { const h = 70 + (k % 3) * 14; const e = mk(Q, 'path', { d: `M${px},36 L${px},${-h}`, stroke: '#7A5A3A', 'stroke-width': 8, 'stroke-linecap': 'round' }); PN.push({ e, px, h }); });
  const o = W(Q); o.pn = PN; o.Q = Q; return o; };

const EP_ICONS = Object.assign({}, {
  carrot: ['M6 21 15 8l3 3Z', 'M15 8l1-5', 'M16 9l5-2', 'M15 8l-4-3'],
  banyan: ['M3 9h18', 'M12 9v13', 'M6 10v11', 'M18 10v11', 'M4 9c0-4 4-6 8-6s8 2 8 6'],
  maize: ['M12 2v20', 'M12 17l-5 5', 'M12 17l5 5', 'M12 9c-3-1-6-3-6-6', 'M12 13c3-1 6-3 6-6'],
  root: ['M12 2v7', 'M12 9c-3 3-4 7-4 13', 'M12 9c3 3 4 7 4 13', 'M12 9v13'],
  tip: ['M8 2h8v11l-4 9-4-9Z', 'M8 8h8', 'M8 13h8'],
  loop: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  anchor: ['M12 3v18', 'M5 13a7 7 0 0 0 14 0', 'M9 6h6'],
  box: ['M3 7l9-4 9 4v10l-9 4-9-4Z', 'M3 7l9 4 9-4', 'M12 11v10'],
  spark: ['M12 3v4', 'M12 17v4', 'M3 12h4', 'M17 12h4', 'M6 6l2.5 2.5', 'M15.5 15.5 18 18', 'M18 6l-2.5 2.5', 'M8.5 15.5 6 18'],
});
const EP = { icons: EP_ICONS,
  jobs: [['carrot', 'A fat carrot', 'IN THE KITCHEN', 'carrot'], ['banyan', 'A banyan tree', 'ROPES FROM BRANCHES', 'banyan'], ['maize', 'A maize plant', 'ON LITTLE LEGS', 'maize']],
  hook: { label: 'ROOTS · BUT NOT THIN', pill: 'All three are roots', pillT: wt('H2', 'roots') - 0.1, img: 'scene-bicycle.jpg', cardL: 'DIYA · THE ROAD TO COLLEGE', q: 'Why do some roots get fat?', qT: wt('H3', 'fat') - 0.3,
    draw: s => { soil(s, 400, 0, 784, 180);
      const c = carrot(s, 130, 400, 0.72), b = banyan(s, 400, 400, 0.62, 300), m = maize(s, 650, 400, 0.72);
      const t2 = T0('H2');
      return { els: [[c, tMorph + 0.4, { dy: 20 }], [b, tMorph + 0.7, { dy: 20 }], [m, tMorph + 1.0, { dy: 20 }],
        [tag(s, 200, 440, 'CARROT', CARD, 16), wt('H2', 'none') - 0.2, { dy: 6 }], [tag(s, 400, 440, 'BANYAN', WOOD, 16), wt('H2', 'none'), { dy: 6 }], [tag(s, 650, 440, 'MAIZE', STEM, 16), wt('H2', 'none') + 0.2, { dy: 6 }]],
        draws: b.props.map((pp, i) => [pp, tMorph + 1.2 + i * 0.1, 0.6]).concat(m.stilts.map((pp, i) => [pp, tMorph + 1.5 + i * 0.1, 0.5])) }; } },
  plan: { label: 'THREE THINGS TO KNOW', rows: [['root', 'Root systems', 'TAP · FIBROUS · ADVENTITIOUS'], ['tip', 'Regions of the tip', 'FOUR REGIONS'], ['loop', 'Modifications', 'STORE · SUPPORT · BREATHE']],
    rowT: [wt('H5', 'three') - 0.1, wt('H5', 'four') - 0.1, wt('H5', 'modification') - 0.2], pill: 'The job decides the shape', pillT: wt('H4', 'shape') - 0.3 },
  D: { label: 'WHERE ROOTS COME FROM', arrows: false,
    tiles: [['Radicle', 'The baby root inside a seed', T0('D1') + 0.4, sv => { const g = seedR(sv, 170, 120, 1); return { els: [[tag(sv, 236, 210, 'RADICLE', WOOD), wt('D1', 'radicle'), { dy: 6 }]] }; }],
      ['Tap root system', 'Mustard: a primary root with side branches', T0('D2'), sv => { soil(sv, 70, 0, 367, 160); mustard(sv, 183, 70, 0.62, 230); return {}; }],
      ['Fibrous root system', 'Wheat: many thin roots from the stem base', T0('D3'), sv => { soil(sv, 70, 0, 367, 160); wheat(sv, 183, 70, 0.8); return {}; }],
      ['Adventitious roots', 'Grass, Monstera, banyan: not from the radicle', T0('D4'), sv => { soil(sv, 116, 0, 367, 160); grass(sv, 183, 116, 1.15); return {}; }]],
    chips: [['drop', 'Absorb water, minerals', wt('D5', 'absorb')], ['anchor', 'Hold the plant', wt('D5', 'hold')], ['box', 'Store food', wt('D5', 'store')], ['spark', 'Make growth regulators', wt('D5', 'growth')]] },
  ladders: [
    { key: 'Z', t0: T0('Z1'), tEnd: T0('P1'), chips: ['ROOT SYSTEM', 'ROOT TIP', 'ROOT HAIR'],
      lv: [
        { t: T0('Z1') + 0.2, chip: 0, info: ['ZOOM IN', 'The root tip', 'All the growing happens at the very tip of the root.', ''], b: g => { soil(g, 120, 0, 1056, 420); mustard(g, 528, 120, 1.0, 380);
            const ring = mk(g, 'circle', { cx: 528, cy: 470, r: 46, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
            return { draws: [[ring, T0('Z1') + 1.0, 0.6]], els: [[tag(g, 640, 476, 'THE TIP', C.ac, 16), T0('Z1') + 1.4, { dy: 6 }]] }; } },
        { t: T0('Z2'), chip: 1, info: ['REGION 1 OF 4', 'Root cap', 'A thimble over the tip. It protects the soft tip in the soil.', ''], b: g => {
            const x0 = 300, x1 = 450, cx = 375; const R = {};
            mk(g, 'path', { d: `M${x0},20 L${x0},430 C${x0},500 ${x1},500 ${x1},430 L${x1},20`, fill: '#F3F7EA', stroke: BR, 'stroke-width': 3.5 });
            // maturation cells + hairs
            for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) mk(g, 'rect', { x: x0 + c * 25, y: 24 + r * 44, width: 25, height: 44, fill: '#EEF4E2', stroke: '#B9C6A4', 'stroke-width': 1.4 });
            const hairs = []; for (let r = 0; r < 4; r++) [-1, 1].forEach(sd => { const yy = 40 + r * 44, L = 120 - r * 22; hairs.push(mk(g, 'path', { d: `M${sd < 0 ? x0 : x1},${yy} q${sd * L * 0.5},${-6} ${sd * L},${4}`, stroke: '#9A7A4E', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })); });
            for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const h = 34 - r * 4; mk(g, 'rect', { x: x0 + c * 25, y: 200 + r * 30 - (r ? 0 : 0), width: 25, height: 30, fill: '#F1F6E6', stroke: '#B9C6A4', 'stroke-width': 1.4 }); }
            for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) mk(g, 'rect', { x: x0 + c * 15, y: 350 + r * 13, width: 15, height: 13, fill: '#E1EBCB', stroke: '#9FB083', 'stroke-width': 1.2 });
            R.cap = mk(g, 'path', { d: `M${x0},420 C${x0 - 8},500 ${x1 + 8},500 ${x1},420 C${x1 - 30},440 ${x0 + 30},440 ${x0},420 Z`, fill: '#E3C98E', stroke: BR, 'stroke-width': 3 });
            const bands = [[20, 196, '#3E9B5F'], [200, 346, '#C9962B'], [350, 428, '#B35F22']].map(([a, b, col]) => mk(g, 'path', { d: `M${x0 - 22},${a} L${x0 - 22},${b}`, stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }));
            // one cell's journey
            const jc = mk(g, 'rect', { x: x1 - 25, y: 380, width: 25, height: 14, fill: 'none', stroke: GOLD, 'stroke-width': 4 }), jh = mk(g, 'path', { d: '', stroke: GOLD, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
            const jt = tag(g, 220, 512, "ONE CELL'S JOURNEY", GOLD, 14);
            const gr = mk(g, 'path', { d: 'M150,300 L150,420 M140,408 L150,420 L160,408', stroke: C.ink, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }), grT = tag(g, 150, 290, 'GROWS DOWN', C.ink, 14);
            const tz = [T0('Z2'), T0('Z3'), T0('Z4'), T0('Z5')];
            return { labs: [[lab(g, 375, 470, 560, 470, 'Root cap'), wt('Z2', 'cap') - 0.1], [lab(g, 450, 390, 560, 390, 'Region of meristematic activity'), wt('Z3', 'meristematic') - 0.1],
                [lab(g, 450, 270, 560, 270, 'Region of elongation'), wt('Z4', 'elongation') - 0.1], [lab(g, 450, 110, 560, 110, 'Region of maturation'), wt('Z5', 'maturation') - 0.1], [lab(g, 196, 82, 120, 40, 'Root hairs', 'end'), wt('Z5', 'hairs') - 0.1]],
              els: [[bands[2], tz[1], POP], [bands[1], tz[2], POP], [bands[0], tz[3], POP], [gr, tz[0] + 1.6, { dy: -10 }], [grT, tz[0] + 1.6, { dy: 6 }], [jc, tz[1] + 1.2, POP], [jh, tz[1] + 1.2, { dy: 0 }], [jt, tz[1] + 1.2, { dy: 6 }]],
              draws: hairs.map((h, i) => [h, wt('Z5', 'hairs') + i * 0.05, 0.4]),
              anim: t => { const u = ((t - tz[1]) / 5) % 1; if (t < tz[1]) return; const y = 390 - u * 330, h = u < 0.25 ? 13 : u < 0.6 ? 13 + (u - 0.25) / 0.35 * 31 : 44;
                attr(jc, 'y', (y - h / 2).toFixed(1)); attr(jc, 'height', h.toFixed(1)); attr(jh, 'd', u > 0.7 ? `M${x1},${y} l${((u - 0.7) / 0.3 * 70).toFixed(1)},2` : ''); } }; } },
        { t: T0('Z3'), chip: 1, cont: true, info: ['REGION 2 OF 4', 'Meristematic', 'Very small cells, thin walls, dense protoplasm. They divide again and again.', ''] },
        { t: T0('Z4'), chip: 1, cont: true, info: ['REGION 3 OF 4', 'Elongation', 'New cells stretch and grow longer. The root grows in length.', ''] },
        { t: T0('Z5'), chip: 1, cont: true, info: ['REGION 4 OF 4', 'Maturation', 'Cells take on their final jobs. Some skin cells grow root hairs.', ''] },
        { t: T0('Z6'), chip: 2, info: ['CLOSE-UP', 'Root hair', 'A fine thread from one skin cell. It absorbs water and minerals from the soil.', ''], b: g => {
            [[420, 120, 70], [600, 360, 80], [800, 150, 76], [930, 380, 64], [300, 400, 60], [700, 250, 40]].forEach(([x, y, r]) => { mk(g, 'circle', { cx: x, cy: y, r: r + 12, fill: '#D6E9F5' }); mk(g, 'path', { d: `M${x - r},${y} C${x - r},${y - r * 0.9} ${x + r * 0.8},${y - r} ${x + r},${y - 6} C${x + r * 1.1},${y + r * 0.8} ${x - r * 0.6},${y + r} ${x - r},${y} Z`, fill: '#E4D3AE', stroke: '#A8936A', 'stroke-width': 2.5 }); });
            mk(g, 'rect', { x: 40, y: 190, width: 190, height: 150, rx: 14, fill: '#F3F7EA', stroke: BR, 'stroke-width': 3.5 }); mk(g, 'ellipse', { cx: 110, cy: 265, rx: 30, ry: 24, fill: '#D7C3E6', stroke: '#7B4B94', 'stroke-width': 2.5 });
            const hp = 'M230,250 C340,240 420,230 500,250 C600,276 640,240 700,214 C760,190 820,240 900,262';
            mk(g, 'path', { d: hp, stroke: BR, 'stroke-width': 34, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: hp, stroke: '#F3F7EA', 'stroke-width': 27, fill: 'none', 'stroke-linecap': 'round' });
            const fl = flowPath(g, 'M900,262 C820,240 760,190 700,214 C640,240 600,276 500,250 C420,230 340,240 230,250', WAT, 5);
            const dr = [[520, 330], [760, 300], [870, 210]].map(([x, y]) => { const q = drop(g, x, y, 1.0); return q; });
            return { labs: [[lab(g, 560, 262, 560, 470, 'Root hair', 'middle'), wt('Z6', 'Root') - 0.1], [lab(g, 110, 300, 120, 430, 'Epidermal cell', 'middle'), wt('Z6', 'Root') + 0.4], [lab(g, 820, 150, 980, 60, 'Soil particle', 'end'), wt('Z6', 'soil') - 0.2], [lab(g, 870, 210, 1000, 300, 'Water', 'end'), wt('Z6', 'water') - 0.1]],
              els: dr.map((d, i) => [d, wt('Z6', 'water') + i * 0.15, POP]), anim: t => flowRun(fl, t, 24) }; } }],
      av: { who: 'Diya', text: 'The hairs do the drinking!', tin: wt('Z6', 'drinkers') + 0.2, tout: T0('P1') - 0.4 } },
    { key: 'P', t0: T0('P1'), tEnd: T0('C1'), chips: ['STORE FOOD', 'SUPPORT', 'BREATHE'],
      lv: [
        { t: T0('P1') + 0.2, chip: -1, info: ['THREE NEW JOBS', 'Modified roots', 'Roots change shape to store food, give support, or help in breathing.', ''], b: g => {
            const a = carrot(g, 200, 250, 0.8), b = banyan(g, 528, 380, 0.5, 300), c = mangrove(g, 860, 360, 0.32);
            return { els: [[a, T0('P1') + 0.5, POP], [b, T0('P1') + 0.9, POP], [c, T0('P1') + 1.3, POP], [tag(g, 200, 470, 'STORE FOOD', CARD, 16), wt('P1', 'storing') + 0.2, { dy: 6 }], [tag(g, 528, 470, 'SUPPORT', WOOD, 16), wt('P1', 'support') + 0.2, { dy: 6 }], [tag(g, 860, 470, 'BREATHE', WAT, 16), wt('P1', 'breathing') + 0.2, { dy: 6 }]] }; } },
        { t: T0('P2'), chip: 0, info: ['STORE FOOD · TAP ROOT', 'Carrot, turnip', 'The tap root swells up with stored food.', ''], b: g => { soil(g, 150, 0, 1056, 400);
            const a = carrot(g, 330, 150, 1.4, 230), b = turnip(g, 720, 150, 1.6); const f1 = flowPath(g, 'M330,170 L330,420', GOLD, 5);
            return { labs: [[lab(g, 300, 260, 140, 300, 'Carrot', 'end'), wt('P2', 'carrot') - 0.1], [lab(g, 760, 260, 900, 300, 'Turnip'), wt('P2', 'turnip') - 0.1], [lab(g, 345, 380, 520, 420, 'Stored food'), wt('P2', 'food') - 0.2]], els: [[a, T0('P2') + 0.3, { dy: 20 }], [b, wt('P2', 'turnip') - 0.3, { dy: 20 }]], anim: t => flowRun(f1, t, 16) }; } },
        { t: T0('P3'), chip: 0, info: ['STORE FOOD · ADVENTITIOUS', 'Sweet potato', 'Swollen adventitious roots. Not a tap root.', ''], b: g => { soil(g, 140, 0, 1056, 400);
            const sp = sweetPotato(g, 528, 140, 1.5);
            return { labs: [[lab(g, 610, 330, 760, 400, 'Adventitious roots'), wt('P3', 'adventitious') - 0.1], [lab(g, 528, 140, 760, 90, 'Stem'), wt('P3', 'roots') - 0.3]], els: sp.tub.map((q, i) => [q, wt('P3', 'swollen') + i * 0.15, { ...POP, sc: 0.5 }]) }; } },
        { t: T0('P4'), chip: 1, info: ['SUPPORT', 'Prop roots', 'Roots hang from banyan branches, reach the soil and hold the branches up like pillars.', ''], b: g => { soil(g, 450, 0, 1056, 100);
            const b = banyan(g, 528, 450, 1.0, 380);
            return { labs: [[lab(g, 678, 300, 860, 300, 'Prop roots'), wt('P4', 'prop') - 0.1], [lab(g, 440, 210, 260, 160, 'Branch', 'end'), wt('P4', 'branches') - 0.1]], draws: b.props.map((p, i) => [p, wt('P4', 'down') + i * 0.12, 0.9]) }; } },
        { t: T0('P5'), chip: 1, info: ['SUPPORT', 'Stilt roots', 'Grow from the lower nodes of the stem in maize and sugarcane.', ''], b: g => { soil(g, 420, 0, 1056, 120);
            const m = maize(g, 528, 420, 1.05, 330);
            return { labs: [[lab(g, 538, 420 - 78 * 1.05, 700, 300, 'Node'), wt('P5', 'node', 1) - 0.1], [lab(g, 440, 400, 280, 360, 'Stilt roots', 'end'), wt('P5', 'stilt') - 0.1]], draws: m.stilts.map((p, i) => [p, wt('P5', 'supporting') + i * 0.15, 0.6]), els: m.nodes.slice(0, 2).map((n, i) => [n, wt('P5', 'nodes') + i * 0.1, POP]) }; } },
        { t: T0('P6'), chip: 2, info: ['BREATHING', 'Pneumatophores', 'In Rhizophora, roots grow straight up out of swampy mud to get oxygen for respiration.', ''], b: g => {
            const m = mangrove(g, 528, 330, 1.0); const fl = m.pn.map(({ px, h }) => flowPath(m.Q, `M${px},${-h + 4} L${px},30`, O2, 3));
            return { labs: [[lab(g, 528 + 180, 330 - 85, 780, 150, 'Pneumatophores'), wt('P7', 'pneumatophores') - 0.1], [lab(g, 640, 430, 780, 480, 'Swampy mud'), wt('P6', 'swampy') - 0.1]],
              els: [[tag(g, 230, 80, 'OXYGEN IN THROUGH THE TIPS', '#2F7E98', 16), wt('P7', 'oxygen') - 0.1, { dy: 6 }]], anim: t => { if (t > wt('P7', 'oxygen') - 0.2) fl.forEach(f => flowRun(f, t, 14)); else fl.forEach(f => f.style.opacity = 0); if (t > wt('P7', 'oxygen') - 0.2) fl.forEach(f => f.style.opacity = 1); } }; } }],
      av: { who: 'Diya', text: 'So the job decides the shape!', tin: wt('P7', 'respiration') + 0.3, tout: T0('C1') - 0.4 } }],
  V: { h0: 'Prop roots · banyan', h1: 'Stilt roots · maize', tH: [wt('C1', 'prop') - 0.1, wt('C1', 'stilt') - 0.1],
    rows: [['Job', 'Support', 'Support', 1, wt('C2', 'support'), wt('C2', 'support') + 0.3], ['Type', 'Adventitious', 'Adventitious', 1, wt('C2', 'adventitious'), wt('C2', 'adventitious') + 0.3],
      ['Grow from', 'Branches', 'Lower nodes of the stem', 0, wt('C3', 'branches'), wt('C3', 'nodes')], ['Example', 'Banyan', 'Maize, sugarcane', 0, wt('C3', 'banyan'), wt('C3', 'maize')]],
    think: { q: 'Sugarcane roots come out of the bottom of its stem. Prop roots, or stilt roots?', opts: ['Prop roots', 'Stilt roots'], right: 1, why: 'Stilt roots. They grow from the lower nodes of the stem.' },
    tOpts: wt('C4', 'Prop') - 0.1, tWhy: wt('C5', 'They') - 0.2 },
  stmt: { st2: 'The <span class="acc">job</span> shapes the root.', st2T: wt('T1', 'job') - 0.3, stF: `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em"><b style="color:${GOLD}">store</b> · <b style="color:${WOOD}">support</b> · <b style="color:${WAT}">breathe</b></span>`, stFT: wt('T1', 'store') - 0.1 },
  Wk: { label: 'WORKED EXAMPLE · NAME EACH ROOT', clues: [['Carrot: fat, orange, from the radicle', 1, 'W2'], ['Sweet potato: swollen roots, not from the radicle', 3, 'W3'], ['Pillars dropping from banyan branches', 0, 'W4'], ['Roots poking up out of swamp mud', 2, 'W5']],
    targets: ['Prop root', 'Storage tap root', 'Pneumatophore', 'Storage adventitious'] },
  trap: { wrong: 'Sweet potato is a stem, just like potato', right: 'Sweet potato is a root. The potato is a stem.', tWrong: wt('X2', 'sweet') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'root') - 0.1,
    draw: s => { const a = sweetPotato(s, 120, 70, 0.62), b = potato(s, 340, 130, 0.95);
      const ta = grp(s); mk(ta, 'rect', { x: 60, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(ta, 120, 237, 'ROOT', C.ok);
      const tb = grp(s); mk(tb, 'rect', { x: 280, y: 214, width: 120, height: 34, rx: 8, fill: C.okBg }); tag(tb, 340, 237, 'STEM', C.ok);
      return { els: [[a, wt('X3', 'sweet') - 0.1, { ...POP, sc: 0.5 }], [ta, wt('X3', 'adventitious') - 0.1, POP], [b, wt('X3', 'potato', 1) - 0.2, { ...POP, sc: 0.5 }], [tb, wt('X3', 'stem') - 0.1, POP]] }; } },
  where: { type: 'Statements on the root tip, or matching plants with root types', tType: wt('E1', 'statements') },
  mcq: { pat: 'NEET PATTERN · STATEMENT BASED', qW: 900,
    q: 'Which statements are correct?<div class="sl"><b>I</b>Root hairs arise from the region of elongation.</div><div class="sl"><b>II</b>Meristematic cells are small and thin-walled.</div><div class="sl"><b>III</b>Maize has stilt roots from the lower nodes.</div><div class="sl"><b>IV</b>Pneumatophores help <i>Rhizophora</i> get oxygen.</div>',
    opts: ['I and II only', 'II, III and IV only', 'I, III and IV only', 'I, II, III and IV'], right: 1, optW: 474, optY: 392, optFs: 28 },
  tOpts: wt('Q1', 'Which') - 0.2,
  so: [['Answer: <b style="color:var(--ok)">B</b>'], ['I is wrong'], ['Root hairs: maturation'], ['II, III, IV correct']],
  tSo: [wt('A1', 3) + 0.1, wt('A2', 'Statement'), wt('A2', 'maturation'), wt('A3', 'Small')],
  fc: { title: 'Recap · the root', lines: ['<b>Root systems</b>: tap (mustard) · fibrous (wheat) · adventitious (grass, <i>Monstera</i>, banyan)', '<b>Root tip</b>: root cap → meristematic → elongation → maturation (root hairs)',
    `<b>Store food</b>: carrot, turnip (tap roots) · sweet potato (adventitious)`, '<b>Support</b>: prop roots (banyan) · stilt roots (maize, sugarcane)', '<b>Breathe</b>: pneumatophores in <i>Rhizophora</i>, for oxygen'] },
  Y: ['Which region of the root tip grows root hairs?', 'How is a carrot root different from a sweet potato root?', 'How do pneumatophores help Rhizophora in swampy mud?'],
  next: { label: 'NEXT · EP 41', topic: 'A potato with eyes: The Stem and its Modifications' },
  cam: [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('Z3', 'meristematic') - 0.3, 1.05, 960, 580], [T0('Z6') - 0.2, 1, 960, 540]],
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
