// cell8.js - cell drawings for PUC Biology Eps 60-64 (Ch 8 Cell: The Unit of Life). Same file copied into each episode folder.
// Every drawer returns { g: plain outer group (safe for M.vis), i: inner transformed group, ...parts }. Local coordinates are centred at 0,0.
(() => {
const { mk } = EP;
const K = window.K8 = {
  INK: '#2E2A24', CYT: '#F3F7EA', NUf: '#D7C3E6', NU: '#7B4B94', MIf: '#F2B57E', MI: '#B35F22', CHf: '#6DB27A', CH: '#1F5E37',
  VAf: '#D6E9F5', VA: '#5AA0C8', CWf: '#E3D3A0', CW: '#7A6A2E', ER: '#C77DA0', ERf: '#F1D3E0', GO: '#D9A23B', GOf: '#F5DEA8', RIB: '#2E2A24',
  LY: '#8E5BB5', LYf: '#E2D2F0', HEAD: '#5AA0C8', TAIL: '#E8D9A8', PRO: '#D0632F', PROf: '#F2B9A0', DNA: '#7B4B94', SP: '#4A78C2',
  GLY: '#8FC9C0', GLYf: '#DCEFEB', BCY: '#EEF4E6', CHO: '#C9962B', CARB: '#3E9B5F'
};
const P = K.P = (g, d, f, s = K.INK, w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
const C = K.C = (g, x, y, r, f, s = K.INK, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
const E = K.E = (g, x, y, rx, ry, f, s = K.INK, w = 2.5, a = {}) => mk(g, 'ellipse', Object.assign({ cx: x, cy: y, rx, ry, fill: f, stroke: s, 'stroke-width': w }, a));
const wrap = (p, cx, cy, s, rot = 0) => { const g = mk(p, 'g', {}), i = mk(g, 'g', { transform: `translate(${cx} ${cy}) scale(${s})${rot ? ` rotate(${rot})` : ''}` }); return { g, i }; };
K.wrap = wrap;
// smooth closed blob through n points around 0,0 (radius rx, ry with wobble)
K.blob = (rx, ry, n = 10, wob = 0.06, ph = 0) => { const pts = []; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, r = 1 + wob * Math.sin(3 * a + ph) + wob * 0.6 * Math.cos(5 * a + ph); pts.push([rx * r * Math.cos(a), ry * r * Math.sin(a)]); }
  let d = ''; for (let k = 0; k < n; k++) { const p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    if (!k) d += `M${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; }
  return d + ' Z'; };
// organelles (draw into g at x,y)
K.mito = (g, x, y, s = 1, rot = 0) => { const o = mk(g, 'g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` }); E(o, 0, 0, 30, 15, K.MIf, K.MI, 2.5); P(o, 'M-20,0 q4,-8 8,0 t8,0 t8,0 t8,0 t8,0', 'none', K.MI, 2); return o; };
K.chloro = (g, x, y, s = 1, rot = 0) => { const o = mk(g, 'g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` }); E(o, 0, 0, 28, 15, K.CHf, K.CH, 2.5); [-12, 0, 12].forEach(d => mk(o, 'line', { x1: d, y1: -8, x2: d, y2: 8, stroke: K.CH, 'stroke-width': 2.5, 'stroke-linecap': 'round' })); return o; };
K.nuc = (g, x, y, r = 34) => { const o = mk(g, 'g', {}); C(o, x, y, r, K.NUf, K.NU, 3); C(o, x + r * 0.15, y - r * 0.1, r * 0.34, K.NU, 'none', 0); return o; };
K.golgi = (g, x, y, s = 1, rot = 0) => { const o = mk(g, 'g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` }); for (let k = 0; k < 5; k++) { const w = 46 - Math.abs(k - 2) * 6; P(o, `M${-w},${-16 + k * 8} Q0,${-26 + k * 8} ${w},${-16 + k * 8}`, 'none', K.GO, 5); } C(o, 52, -6, 5, K.GOf, K.GO, 2); C(o, -54, 8, 4, K.GOf, K.GO, 2); return o; };
K.erN = (g, x, y, s = 1, rot = 0, ribo = true) => { const o = mk(g, 'g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` }); [0, 14, 28].forEach(d => P(o, `M-40,${d} q10,-10 20,0 t20,0 t20,0 t20,0`, 'none', K.ER, 4)); if (ribo) for (let k = 0; k < 9; k++) C(o, -36 + k * 9, -6 + (k % 2) * 2, 2.2, K.RIB, 'none', 0); return o; };
K.lyso = (g, x, y, r = 11) => { const o = mk(g, 'g', {}); C(o, x, y, r, K.LYf, K.LY, 2.5); for (let k = 0; k < 3; k++) C(o, x - r * 0.35 + k * r * 0.35, y + (k % 2 ? -2 : 2), 1.8, K.LY, 'none', 0); return o; };
K.dots = (g, pts, r = 2.6, f = K.RIB) => pts.map(([x, y]) => C(g, x, y, r, f, 'none', 0));
// animal cell, about 400 x 300 at s=1
K.animal = (p, cx, cy, s = 1, o = {}) => { const R = wrap(p, cx, cy, s), g = R.i;
  R.mem = P(g, K.blob(200, 150, 12, 0.05, 1), K.CYT, '#3E9B5F', 4);
  R.er = K.erN(g, -40, -80, 1.1, 8); R.golgi = K.golgi(g, 110, 40, 1, -20);
  R.nu = K.nuc(g, -20, 10, 52); R.mi = [K.mito(g, 120, -70, 1, 20), K.mito(g, -130, 60, 1, -30), K.mito(g, 30, 100, 0.9, 5)];
  R.ly = [K.lyso(g, -120, -40), K.lyso(g, 160, 100, 9)];
  R.cen = mk(g, 'g', {}); [[0, 0], [12, 0]].forEach(([dx]) => mk(R.cen, 'rect', { x: 50 + dx, y: 82, width: 8, height: 22, rx: 2, fill: K.SP, transform: dx ? `rotate(90 ${66} 93)` : '' }));
  R.rb = K.dots(g, [[-160, 0], [-150, 20], [70, -20], [80, -110], [-80, 90], [150, -20], [-60, -120], [0, -110], [-170, -40]]);
  return R; };
// plant cell, about 380 x 300 at s=1
K.plant = (p, cx, cy, s = 1, o = {}) => { const R = wrap(p, cx, cy, s), g = R.i;
  R.wall = mk(g, 'rect', { x: -190, y: -150, width: 380, height: 300, rx: 40, fill: K.CWf, stroke: K.CW, 'stroke-width': 5 });
  R.mem = mk(g, 'rect', { x: -174, y: -134, width: 348, height: 268, rx: 28, fill: K.CYT, stroke: '#3E9B5F', 'stroke-width': 3 });
  R.vac = P(g, 'M-60,-90 C40,-110 140,-80 140,0 C140,80 90,104 10,100 C-60,96 -90,60 -80,0 C-74,-40 -120,-70 -60,-90 Z', K.VAf, K.VA, 3);
  R.nu = K.nuc(g, -125, 70, 34); R.ch = [[-130, -95, -15], [130, -110, 10], [155, 40, 80], [80, 115, -5], [-150, -10, 90]].map(([x, y, a]) => K.chloro(g, x, y, 1, a));
  R.mi = [K.mito(g, -50, 118, 0.8, 0)]; R.rb = K.dots(g, [[-100, -50], [-155, 30], [150, -60], [-30, -118], [120, 90]]);
  return R; };
// bacterium (rod), about 420 x 170 at s=1. o: { fla, pili, meso, plasmid, gly }
K.bact = (p, cx, cy, s = 1, o = {}) => { const R = wrap(p, cx, cy, s, o.rot || 0), g = R.i, L = 170, H = 70;
  const rod = (w, h) => `M${-w + h},${-h} L${w - h},${-h} A${h},${h} 0 0 1 ${w - h},${h} L${-w + h},${h} A${h},${h} 0 0 1 ${-w + h},${-h} Z`;
  R.fl = []; if (o.fla !== false) { R.fl.push(P(g, `M${L + 14},0 C${L + 60},-40 ${L + 100},40 ${L + 140},0 S${L + 220},-40 ${L + 260},0`, 'none', K.INK, 3.5)); }
  R.pili = []; if (o.pili !== false) for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, x = Math.cos(a) * (L - 10), y = Math.sin(a) * (H + 2); if (Math.abs(Math.cos(a)) > 0.97) continue; R.pili.push(P(g, `M${x.toFixed(1)},${y.toFixed(1)} l${(Math.cos(a) * 10).toFixed(1)},${(Math.sin(a) * 24).toFixed(1)}`, 'none', '#6B7280', 2)); }
  R.gly = P(g, rod(L + 14, H + 14), o.gly === false ? 'none' : K.GLYf, o.gly === false ? 'none' : K.GLY, 2.5, { 'stroke-dasharray': '6 5' });
  R.wall = P(g, rod(L, H), K.CWf, K.CW, 4); R.mem = P(g, rod(L - 9, H - 9), K.BCY, K.HEAD, 3.5);
  R.meso = o.meso === false ? null : P(g, `M${-L + 70},${-H + 9} C${-L + 66},${-H + 40} ${-L + 100},${-H + 44} ${-L + 92},${-H + 70} C${-L + 86},${-H + 88} ${-L + 116},${-H + 92} ${-L + 108},${-H + 60} C${-L + 118},${-H + 40} ${-L + 96},${-H + 32} ${-L + 100},${-H + 9}`, '#D6E9F5', K.HEAD, 3);
  R.dna = P(g, 'M-20,-20 C20,-46 70,-30 60,0 C50,30 0,40 -30,20 C-60,0 -40,-30 0,-16 C30,-6 40,10 20,16 C0,22 -20,10 -6,0', 'none', K.DNA, 3.5);
  R.pl = o.plasmid === false ? [] : [C(g, 110, -24, 11, 'none', K.DNA, 3), C(g, 120, 26, 8, 'none', K.DNA, 3)];
  R.rb = K.dots(g, [[-90, -30], [-60, 40], [-110, 20], [-30, 52], [80, 50], [100, -48], [140, 4], [30, -52], [-130, -8], [60, -50], [-20, 50]], 3.2);
  return R; };
// one phospholipid, head at 0,0 pointing up (dir 1) or down (dir -1)
K.plip = (g, x, y, s = 1, dir = 1) => { const o = mk(g, 'g', {}); const h = C(o, x, y, 9 * s, K.HEAD, '#2F6F96', 1.6 * s);
  const t = [-4, 4].map(dx => P(o, `M${x + dx * s},${y + dir * 8 * s} q${-2 * s},${dir * 10 * s} 0,${dir * 18 * s} t0,${dir * 18 * s}`, 'none', '#B9A36A', 2.6 * s)); o._h = h; o._t = t; return o; };
// bilayer strip from x0 to x1 centred on y (n heads per row)
K.bilayer = (g, x0, x1, y, s = 1) => { const n = Math.floor((x1 - x0) / (19 * s)), R = { top: [], bot: [] };
  for (let k = 0; k < n; k++) { const x = x0 + 9 * s + k * 19 * s; R.top.push(K.plip(g, x, y - 46 * s, s, 1)); R.bot.push(K.plip(g, x, y + 46 * s, s, -1)); } R.n = n; return R; };
// ribosome: large + small subunit
K.ribo = (g, x, y, s = 1) => { const o = mk(g, 'g', {}); o._L = E(o, x, y - 8 * s, 26 * s, 18 * s, '#5B544A', K.INK, 2); o._S = E(o, x, y + 14 * s, 20 * s, 10 * s, '#8A8276', K.INK, 2); return o; };
})();
