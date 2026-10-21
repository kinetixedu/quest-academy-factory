// PUC Biology Ch 4 Animal Kingdom - vintage-cartoon SVG animals shared by Eps 31-35 (same file copied into each episode folder)
// AN.draw(kind, parent, x, y, s, opt) -> { g, p(name) -> [x, y] in parent coords, parts }
// Each animal is drawn in a local box of about +-120 around (0, 0). Outline dark brown, stroke 3-4.
(() => {
const ns = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const BR = '#2E2A24';
const AN = window.AN = { BR,
  COL: { sponge: '#EBC77A', jelly: '#D9CBEA', roach: '#A86B3C', worm: '#E8A0A0', star: '#EE9B5B', flat: '#E9CFA9', round: '#EADCC4', comb: '#D7EEF2', snail: '#D9A066', balano: '#E8B07A', fish: '#8DB8D8', hydra: '#C8DDA0' },
  // germ layers + coelom (canon for this batch)
  ECTO: '#4A78C2', MESO: '#C8553D', ENDO: '#E2B33C', COEL: '#D6E9F5' };
const D = {};

// Sponge (Sycon-like vase, cut open to show the spongocoel)
D.sponge = (g, o) => {
  const P = {}, W = y => { const u = (104 - y) / 206; return 44 + 52 * Math.sin(Math.PI * u) - 6 * u; };
  const side = (dw, sd) => { const pts = []; for (let y = 104; y >= -102; y -= 6) pts.push([sd * (W(y) - dw), y]); return pts; };
  const poly = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  for (let k = 0; k < 11; k++) { const x = -36 + k * 7.2; mk(g, 'line', { x1: x, y1: -98, x2: x * 1.25, y2: -122 - (k % 2) * 6, stroke: '#B08A3A', 'stroke-width': 2.5, 'stroke-linecap': 'round' }); }
  mk(g, 'path', { d: poly([...side(0, -1), ...side(0, 1).reverse()]) + ' Z', fill: AN.COL.sponge, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const os = [];
  if (o.cut !== false) {
    mk(g, 'path', { d: poly([...side(28, -1).slice(2), ...side(28, 1).slice(2).reverse()]) + ' Z', fill: '#FBF3DD', stroke: BR, 'stroke-width': 3 });
    P.spongocoel = [0, 10];
    [-66, -40, -14, 12, 38, 62].forEach(y => [-1, 1].forEach(sd => { const xo = sd * W(y), xi = sd * (W(y) - 28);
      os.push(mk(g, 'line', { x1: xo, y1: y, x2: xi, y2: y, stroke: '#9A7428', 'stroke-width': 5, 'stroke-linecap': 'round' })); }));
  } else {
    const R = [[-40, -60], [10, -70], [40, -40], [-60, -10], [-14, -20], [30, 0], [62, -8], [-40, 30], [8, 34], [44, 50], [-20, 70], [20, 84]];
    R.forEach(([x, y]) => { const w = W(y) - 10; if (Math.abs(x) < w) mk(g, 'ellipse', { cx: x, cy: y, rx: 5, ry: 4, fill: '#8C6A26' }); });
  }
  mk(g, 'ellipse', { cx: 0, cy: -101, rx: 36, ry: 8, fill: '#5B4A2E', stroke: BR, 'stroke-width': 3 }); P.osculum = [0, -101];
  P.ostium = [W(-14), -14]; P.wall = [W(30) - 14, 30]; P.base = [0, 104]; P.W = W;
  return { P, os };
};

// Jellyfish (Aurelia medusa, side view): bell + marginal tentacles + oral arms
D.jelly = (g, o) => {
  const P = {}, ten = [];
  mk(g, 'path', { d: 'M-100,10 C-100,-70 -50,-100 0,-100 C50,-100 100,-70 100,10 C70,0 40,18 0,8 C-40,18 -70,0 -100,10 Z', fill: AN.COL.jelly, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  [-48, -16, 16, 48].forEach(x => mk(g, 'path', { d: `M${x - 12},-40 a12 12 0 1 1 24 0`, fill: 'none', stroke: '#9C83C4', 'stroke-width': 4, 'stroke-linecap': 'round' }));
  for (let k = 0; k < 9; k++) { const x = -92 + k * 23; ten.push({ x, e: mk(g, 'path', { fill: 'none', stroke: '#9C83C4', 'stroke-width': 3, 'stroke-linecap': 'round' }), L: 70 + (k % 3) * 18 }); }
  const arms = [-14, 0, 14].map(x => ({ x, e: mk(g, 'path', { fill: 'none', stroke: '#7E63AA', 'stroke-width': 7, 'stroke-linecap': 'round' }), L: 80 }));
  const wig = tt => { ten.forEach((t, i) => { let d = `M${t.x},${8 + (Math.abs(t.x) > 80 ? 4 : 2)}`; for (let s = 1; s <= 6; s++) { const y = 8 + s * t.L / 6, x = t.x + 6 * Math.sin(tt * 2 + i + s * 0.9) * s / 6; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } t.e.setAttribute('d', d); });
    arms.forEach((a, i) => { let d = `M${a.x},8`; for (let s = 1; s <= 5; s++) { const y = 8 + s * a.L / 5, x = a.x + 9 * Math.sin(tt * 1.6 + i * 2 + s) * s / 5; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } a.e.setAttribute('d', d); }); };
  wig(0);
  P.bell = [60, -60]; P.tentacle = [-92, 60]; P.mouth = [0, 14]; P.arm = [10, 70];
  return { P, wig };
};

// Jellyfish top view (for radial symmetry)
D.jellyTop = (g) => {
  mk(g, 'circle', { cx: 0, cy: 0, r: 104, fill: AN.COL.jelly, stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; mk(g, 'line', { x1: 22 * Math.cos(a), y1: 22 * Math.sin(a), x2: 100 * Math.cos(a), y2: 100 * Math.sin(a), stroke: '#B29BD6', 'stroke-width': 2.5 }); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; mk(g, 'path', { d: `M${(48 * Math.cos(a - 0.4)).toFixed(1)},${(48 * Math.sin(a - 0.4)).toFixed(1)} A48 48 0 0 1 ${(48 * Math.cos(a + 0.4)).toFixed(1)},${(48 * Math.sin(a + 0.4)).toFixed(1)}`, fill: 'none', stroke: '#7E63AA', 'stroke-width': 9, 'stroke-linecap': 'round' }); }
  mk(g, 'circle', { cx: 0, cy: 0, r: 16, fill: '#B29BD6', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 32; k++) { const a = k * Math.PI / 16; mk(g, 'circle', { cx: 106 * Math.cos(a), cy: 106 * Math.sin(a), r: 3, fill: '#9C83C4' }); }
  return { P: { centre: [0, 0], edge: [74, -74] } };
};

// Cockroach (dorsal view, head up)
D.roach = (g) => {
  const P = {}, legs = [];
  const leg = (sd, y0, pts) => { let d = `M${sd * 26},${y0}`; pts.forEach(([x, y]) => d += ` L${sd * x},${y}`); legs.push(mk(g, 'path', { d, fill: 'none', stroke: '#5E3A1E', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    pts.slice(0, -1).forEach(([x, y]) => mk(g, 'circle', { cx: sd * x, cy: y, r: 4, fill: '#5E3A1E' })); };
  [-1, 1].forEach(sd => { leg(sd, -38, [[58, -52], [84, -76]]); leg(sd, -20, [[66, -8], [98, -22]]); leg(sd, -4, [[64, 30], [96, 70]]); });
  mk(g, 'path', { d: 'M-12,-92 C-40,-140 -70,-150 -96,-150', fill: 'none', stroke: '#5E3A1E', 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M12,-92 C40,-140 70,-150 96,-150', fill: 'none', stroke: '#5E3A1E', 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-34,-6 C-40,40 -26,100 0,112 C26,100 40,40 34,-6 Z', fill: AN.COL.roach, stroke: BR, 'stroke-width': 4 });
  for (let k = 1; k <= 5; k++) { const y = -6 + k * 19, w = 34 - Math.max(0, k - 2) * 5.5; mk(g, 'path', { d: `M${-w},${y} Q0,${y + 7} ${w},${y}`, fill: 'none', stroke: '#6E4524', 'stroke-width': 2.5 }); }
  mk(g, 'path', { d: 'M-40,-52 C-40,-66 -24,-72 0,-72 C24,-72 40,-66 40,-52 C40,-20 30,-8 0,-6 C-30,-8 -40,-20 -40,-52 Z', fill: '#C08250', stroke: BR, 'stroke-width': 4 });
  mk(g, 'ellipse', { cx: 0, cy: -86, rx: 20, ry: 16, fill: '#7A4A26', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'ellipse', { cx: -9, cy: -90, rx: 4, ry: 5, fill: BR }); mk(g, 'ellipse', { cx: 9, cy: -90, rx: 4, ry: 5, fill: BR });
  P.head = [0, -86]; P.thorax = [24, -40]; P.abdomen = [0, 60]; P.antenna = [-70, -146]; P.leg = [98, -22]; P.leg2 = [96, 70];
  return { P, legs };
};

// Earthworm (straight, head right); segments returned for crawl waves
D.worm = (g, o) => {
  const n = o.n || 18, L = o.L || 520, x0 = -L / 2, w = L / n, segs = [];
  for (let k = 0; k < n; k++) {
    const x = x0 + k * w, h = 26 - 10 * Math.pow(Math.abs(k - n * 0.55) / (n * 0.55), 3);
    const cl = o.clit && k >= n - 6 && k <= n - 5;
    segs.push(mk(g, 'rect', { x: x.toFixed(1), y: (-h).toFixed(1), width: (w + 1).toFixed(1), height: (2 * h).toFixed(1), rx: Math.min(12, w / 2.2), fill: cl ? '#D9787A' : AN.COL.worm, stroke: BR, 'stroke-width': 3 }));
  }
  const P = { seg: [x0 + w * 8.5, -20], front: [x0 + L, 0], back: [x0, 0], body: [0, 22] };
  return { P, segs, w, x0 };
};

// Starfish (5 arms)
D.star = (g) => {
  let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 40 : 108; d += (k ? 'L' : 'M') + (r * Math.cos(a)).toFixed(1) + ',' + (r * Math.sin(a)).toFixed(1); }
  mk(g, 'path', { d: d + 'Z', fill: AN.COL.star, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; for (let s = 1; s <= 4; s++) { const r = 20 + s * 18; mk(g, 'circle', { cx: r * Math.cos(a), cy: r * Math.sin(a), r: 4.5 - s * 0.5, fill: '#C96F2E' }); } }
  mk(g, 'circle', { cx: 0, cy: 0, r: 12, fill: '#F6C08E', stroke: '#C96F2E', 'stroke-width': 3 });
  return { P: { arm: [62, 20], disc: [0, 0], tip: [0, -108] } };
};

// Flatworm (Planaria-like, head up)
D.flat = (g) => {
  mk(g, 'path', { d: 'M0,-110 C26,-110 40,-96 44,-78 L58,-90 C60,-70 50,-60 44,-52 C50,0 40,70 0,112 C-40,70 -50,0 -44,-52 C-50,-60 -60,-70 -58,-90 L-44,-78 C-40,-96 -26,-110 0,-110 Z', fill: AN.COL.flat, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: -14, cy: -82, r: 7, fill: '#fff', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 14, cy: -82, r: 7, fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: -13, cy: -81, r: 3, fill: BR }); mk(g, 'circle', { cx: 15, cy: -81, r: 3, fill: BR });
  mk(g, 'path', { d: 'M0,-50 L0,40 M0,-30 C-20,-20 -24,10 -22,40 M0,-30 C20,-20 24,10 22,40', fill: 'none', stroke: '#C49A6C', 'stroke-width': 4, 'stroke-linecap': 'round' });
  return { P: { body: [30, 20], eye: [-14, -82], gut: [0, 0] } };
};

// Roundworm (Ascaris-like, smooth curve)
D.round = (g) => {
  const d = 'M-110,40 C-70,-60 -10,80 40,-10 C70,-60 100,-50 112,-30';
  mk(g, 'path', { d, fill: 'none', stroke: BR, 'stroke-width': 30, 'stroke-linecap': 'round' });
  mk(g, 'path', { d, fill: 'none', stroke: AN.COL.round, 'stroke-width': 23, 'stroke-linecap': 'round' });
  return { P: { body: [40, -10], end: [112, -30] } };
};

// Comb jelly (Pleurobrachia)
D.comb = (g) => {
  const combs = [], tens = [];
  mk(g, 'ellipse', { cx: 0, cy: -10, rx: 70, ry: 92, fill: AN.COL.comb, stroke: BR, 'stroke-width': 4 });
  [-50, -24, 0, 24, 50].forEach((x, i) => { const rows = []; for (let k = 0; k < 9; k++) { const y = -84 + k * 19, f = Math.sqrt(Math.max(0, 1 - ((y + 10) / 94) ** 2)); rows.push(mk(g, 'rect', { x: (x * f - 5).toFixed(1), y: y, width: 10, height: 6, rx: 3, fill: '#4FA3B5' })); } combs.push(rows); });
  [-1, 1].forEach(sd => tens.push(mk(g, 'path', { fill: 'none', stroke: '#4FA3B5', 'stroke-width': 3, 'stroke-linecap': 'round' })));
  const wig = tt => tens.forEach((e, i) => { const sd = i ? 1 : -1; let d = `M${sd * 34},62`; for (let s = 1; s <= 8; s++) d += ` L${(sd * (34 + s * 9) + 7 * Math.sin(tt * 2 + s + i)).toFixed(1)},${(62 + s * 7 + 4 * Math.cos(tt * 1.5 + s)).toFixed(1)}`; e.setAttribute('d', d); });
  wig(0);
  return { P: { comb: [24, -40], tentacle: [-90, 110], body: [-60, -10] }, combs, wig };
};

// Snail (Pila-like): spiral shell + foot + tentacles, facing right
D.snail = (g) => {
  mk(g, 'path', { d: 'M-110,70 C-110,50 -60,48 40,48 C80,48 104,40 112,58 C116,70 100,76 80,76 L-100,78 C-108,78 -110,74 -110,70 Z', fill: '#C9B39A', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M70,50 C72,20 76,0 88,-14 M82,52 C88,26 98,10 112,2', fill: 'none', stroke: BR, 'stroke-width': 4, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 88, cy: -14, r: 5, fill: BR }); mk(g, 'circle', { cx: 112, cy: 2, r: 5, fill: BR });
  mk(g, 'circle', { cx: -16, cy: -6, r: 70, fill: AN.COL.snail, stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M-16,-6 m0,-8 a8 8 0 1 1 -8 8 a16 16 0 1 1 16 16 a28 28 0 1 1 -28 -28 a42 42 0 1 1 42 42 a56 56 0 1 1 -50 -58', fill: 'none', stroke: '#9A6A36', 'stroke-width': 4, 'stroke-linecap': 'round' });
  return { P: { shell: [-60, -50], foot: [-80, 74], head: [88, -14] } };
};

// Balanoglossus: proboscis, collar, trunk (left to right)
D.balano = (g) => {
  mk(g, 'path', { d: 'M-40,-20 C-20,-18 60,-30 112,-6 C120,4 116,18 104,22 C60,30 -10,22 -40,22 Z', fill: AN.COL.balano, stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 6; k++) mk(g, 'line', { x1: -24 + k * 12, y1: -14, x2: -24 + k * 12, y2: -2, stroke: '#B07040', 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(g, 'rect', { x: -78, y: -26, width: 40, height: 52, rx: 12, fill: '#D98C5F', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M-78,-14 C-118,-30 -128,0 -118,16 C-110,28 -90,22 -78,14 Z', fill: '#F0C58E', stroke: BR, 'stroke-width': 4 });
  return { P: { proboscis: [-112, 0], collar: [-58, -26], trunk: [50, 18] } };
};

// Hydra: tube with tentacles, basal disc down
D.hydra = (g) => {
  const ten = [];
  mk(g, 'path', { d: 'M-22,-60 C-26,0 -20,60 -30,100 L30,100 C20,60 26,0 22,-60 Z', fill: AN.COL.hydra, stroke: BR, 'stroke-width': 4 });
  mk(g, 'ellipse', { cx: 0, cy: 100, rx: 34, ry: 8, fill: '#9DBE6E', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M-22,-60 Q0,-80 22,-60', fill: '#A9C97A', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 6; k++) ten.push(mk(g, 'path', { fill: 'none', stroke: '#7FA34E', 'stroke-width': 5, 'stroke-linecap': 'round' }));
  const wig = tt => ten.forEach((e, k) => { const a = -Math.PI / 2 + (k - 2.5) * 0.42; let d = `M${(14 * Math.cos(a) * 1.2).toFixed(1)},-66`; for (let s = 1; s <= 6; s++) { const r = s * 16; d += ` L${(r * Math.cos(a) * 1.4 + 6 * Math.sin(tt * 2 + k + s)).toFixed(1)},${(-66 + r * Math.sin(a) * 0.9).toFixed(1)}`; } e.setAttribute('d', d); });
  wig(0);
  return { P: { tentacle: [-80, -110], body: [24, 20], base: [0, 104] }, wig };
};

// Fish (side view, facing right)
D.fish = (g) => {
  mk(g, 'path', { d: 'M-80,0 L-118,-34 L-112,0 L-118,34 Z', fill: '#6F9EC6', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M-84,0 C-40,-58 60,-56 112,0 C60,56 -40,58 -84,0 Z', fill: AN.COL.fish, stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M-10,-44 L10,-70 L30,-46', fill: '#6F9EC6', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M56,-26 C46,-6 46,6 56,26', fill: 'none', stroke: BR, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 80, cy: -10, r: 6, fill: BR });
  return { P: { back: [0, -44], body: [0, 20] } };
};

AN.draw = (kind, parent, x, y, s = 1, o = {}) => {
  const outer = mk(parent, 'g', { class: 'fb' }), g = mk(outer, 'g', { transform: `translate(${x} ${y}) scale(${s})${o.rot ? ` rotate(${o.rot})` : ''}` });
  const r = D[kind](g, o) || {}; const P = r.P || {};
  const rot = (o.rot || 0) * Math.PI / 180;
  r.g = outer; r.inner = g; r.p = n => { const [a, b] = P[n]; const ax = a * Math.cos(rot) - b * Math.sin(rot), ay = a * Math.sin(rot) + b * Math.cos(rot); return [x + s * ax, y + s * ay]; };
  return r;
};
// small line icons (24 grid) for tiles and chips
AN.IC = {
  sponge: ['M8.5 21.5c-3-3-4.5-9-2.2-14.5L7.5 5h9l1.2 2.5c2.3 5.5.8 11.5-2.2 14.5Z', 'M8 5 7 2.5', 'M12 5V2', 'M16 5l1-2.5', 'M10 10h.01', 'M14 12h.01', 'M10.5 15.5h.01', 'M14 18h.01'],
  jelly: ['M3 12a9 8 0 0 1 18 0c-3-1-6 1-9 0s-6-1-9 0Z', 'M6 13v5c0 1 1 2 0 3', 'M10 13v6', 'M14 13v6', 'M18 13v5c0 1-1 2 0 3'],
  roach: ['M12 7c2.5 0 4 2.5 4 6.5S14 21 12 21s-4-3.5-4-7.5S9.5 7 12 7Z', 'M10.5 5.5a1.5 1.5 0 0 0 3 0', 'M11 4C9 2 7 1.5 5 1.5', 'M13 4c2-2 4-2.5 6-2.5', 'M8.5 10 4 8', 'M8 13.5H3.5', 'M8.5 17 4 20', 'M15.5 10 20 8', 'M16 13.5h4.5', 'M15.5 17l4.5 3'],
  worm: ['M3 14c2-3 4-3 6 0s4 3 6 0 4-3 6 0', 'M6 12.2v3.6', 'M10 13.5v3', 'M14 11.2v3', 'M18 12.2v3.6'],
  star: ['M12 2.5l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.6 1.6-6.7-5.2-4.5 6.9-.6Z'],
  bat: ['M12 9.5l-1.2-2.3-.6 2.6C7.8 8.4 4.5 8 1.5 9.5c1.5 1 2 2.6 2 4 1.4-.8 3-.6 4 .4.6-1 1.8-1.4 3-1l1.5 3.6 1.5-3.6c1.2-.4 2.4 0 3 1 1-1 2.6-1.2 4-.4 0-1.4.5-3 2-4-3-1.5-6.3-1.1-8.7.3l-.6-2.6Z'],
  crow: ['M3 14c3 0 6-2 8-5l3-4c1-1 3-1 4 0l2 1-2 1c0 3-1 6-4 8l-2 4h-2l1-3c-3 1-6 0-8-2Z', 'M16.5 6.5h.01'],
  layers: ['M12 3 2 8l10 5 10-5Z', 'M2 13l10 5 10-5', 'M2 18l10 5 10-5'],
  sym: ['M12 2v20', 'M5 7c-2 2-2 8 0 10', 'M19 7c2 2 2 8 0 10', 'M8 9c-1 1-1 5 0 6', 'M16 9c1 1 1 5 0 6'],
  cavity: [`M12 3a9 9 0 1 0 0.01 0Z`, 'M12 7.5a4.5 4.5 0 1 0 .01 0Z', 'M12 10.5a1.5 1.5 0 1 0 .01 0Z'],
  rod: ['M3 9c5-3 13-3 18 0', 'M3 14h18', 'M3 19c5 2 13 2 18 0'],
  cells: ['M7 8a3 3 0 1 0 .01 0Z', 'M16 6a3 3 0 1 0 .01 0Z', 'M10 16a3 3 0 1 0 .01 0Z', 'M18 15a3 3 0 1 0 .01 0Z'],
  gut: ['M4 12h16', 'M4 8c3-3 13-3 16 0', 'M4 16c3 3 13 3 16 0', 'M18 10l2 2-2 2'],
  jar: ['M7 3h10', 'M8 3v3c-2 1-3 3-3 5v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8c0-2-1-4-3-5V3', 'M9 13c1-2 5-2 6 0s-1 4-3 4-4-2-3-4Z'],
  key: ['M15 9a4 4 0 1 0-4 4', 'M11 13l-8 8', 'M5 19l2 2', 'M8 16l2 2'],
};
})();
