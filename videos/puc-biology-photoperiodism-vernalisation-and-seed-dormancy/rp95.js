// rp95.js - plant drawings for PUC Biology Ep 95 (Photoperiodism, Vernalisation and Seed Dormancy)
(() => {
const { mk, attr } = EP;
const INK = '#2E2A24';
const R = window.R95 = {};
R.K = { leaf: '#8CC48F', leafS: '#3E9B5F', vein: '#D8ECD2', stem: '#5E8C4A', sun: '#C9962B', sunL: '#F3E2B3', night: '#2B3A67', nightL: '#C9D0E6', flower: '#E58AA6', flowerS: '#A8456A', seed: '#C9A27A', seedS: '#7A5A36', snow: '#5AA0C8', soil: '#9E7B55', sig: '#D9A23B', ink: INK };
R.P = (g, d, f, s = INK, w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
R.circ = (g, x, y, r, f, s = INK, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
R.T = (g, x, y, s, fs = 18, f = INK, a = {}) => { const e = mk(g, 'text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': fs, fill: f }, a)); e.textContent = s; return e; };
R.at = (e, x, y, r = 0, s = 1) => attr(e, 'transform', `translate(${(+x).toFixed(1)} ${(+y).toFixed(1)})${r ? ` rotate(${(+r).toFixed(1)})` : ''}${s !== 1 ? ` scale(${(+s).toFixed(3)})` : ''}`);
R.arrow = (g, x1, y1, x2, y2, c = INK, w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 12; return R.P(g, `M${x1},${y1} L${x2},${y2} M${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`, 'none', c, w); };
R.leafD = (x, y, a, L, W) => { const c = Math.cos(a), s = Math.sin(a), px = -s, py = c; const tx = x + c * L, ty = y + s * L;
  return `M${x},${y} Q${(x + c * L * 0.5 + px * W).toFixed(1)},${(y + s * L * 0.5 + py * W).toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)} Q${(x + c * L * 0.5 - px * W).toFixed(1)},${(y + s * L * 0.5 - py * W).toFixed(1)} ${x},${y} Z`; };
R.leaf = (g, x, y, a, L = 70, W = 24) => { const G = mk(g, 'g', {}); R.P(G, R.leafD(x, y, a, L, W), R.K.leaf, R.K.leafS, 3); R.P(G, `M${x},${y} L${(x + Math.cos(a) * L * 0.9).toFixed(1)},${(y + Math.sin(a) * L * 0.9).toFixed(1)}`, 'none', R.K.vein, 2.5); return G; };
// a plant: stem from (x, yb) up h, leaf pairs; returns { g, apex:[x,y], leaves:[g...], leafPts:[[x,y]...], flower:g }
R.plant = (g, x, yb, h, s = 1, n = 3) => { const G = mk(g, 'g', {}); R.P(G, `M${x},${yb} C${x - 8 * s},${yb - h * 0.4} ${x + 8 * s},${yb - h * 0.7} ${x},${yb - h}`, 'none', R.K.stem, 6 * s);
  const leaves = [], pts = []; for (let k = 0; k < n; k++) { const y = yb - h * (0.25 + 0.22 * k), sd = k % 2 ? 1 : -1; const a = sd > 0 ? -0.5 : Math.PI + 0.5; leaves.push(R.leaf(G, x, y, a, (80 - k * 10) * s, (26 - k * 3) * s)); pts.push([x + Math.cos(a) * 45 * s, y + Math.sin(a) * 45 * s]); }
  const bud = R.P(G, `M${x},${yb - h} m${-10 * s},0 q${10 * s},${-26 * s} ${20 * s},0 z`, R.K.leaf, R.K.leafS, 2.5);
  const fl = mk(G, 'g', {}); for (let k = 0; k < 5; k++) { const a = k / 5 * 2 * Math.PI; R.circ(fl, x + Math.cos(a) * 14 * s, yb - h - 14 * s + Math.sin(a) * 14 * s, 11 * s, R.K.flower, R.K.flowerS, 2); } R.circ(fl, x, yb - h - 14 * s, 8 * s, '#F6D06B', '#C9962B', 2);
  return { g: G, apex: [x, yb - h], leaves, leafPts: pts, flower: fl, bud }; };
// 24 h bar: light part gold, dark part navy, w total; returns group and a function to set light hours
R.dayBar = (g, x, y, w, hrs, h = 40) => { const G = mk(g, 'g', {}); const L = mk(G, 'rect', { x, y, width: w * hrs / 24, height: h, fill: R.K.sunL, stroke: R.K.sun, 'stroke-width': 2.5 }); const D = mk(G, 'rect', { x: x + w * hrs / 24, y, width: w * (24 - hrs) / 24, height: h, fill: R.K.night, stroke: INK, 'stroke-width': 2.5 });
  return { g: G, set: v => { attr(L, 'width', (w * v / 24).toFixed(1)); attr(D, 'x', (x + w * v / 24).toFixed(1)); attr(D, 'width', (w * (24 - v) / 24).toFixed(1)); } }; };
R.sun = (g, x, y, r = 26) => { const G = mk(g, 'g', {}); for (let k = 0; k < 8; k++) { const a = k / 8 * 2 * Math.PI; R.P(G, `M${x + Math.cos(a) * (r + 6)},${y + Math.sin(a) * (r + 6)} L${x + Math.cos(a) * (r + 16)},${y + Math.sin(a) * (r + 16)}`, 'none', R.K.sun, 4); } R.circ(G, x, y, r, R.K.sunL, R.K.sun, 3); return G; };
R.moon = (g, x, y, r = 24) => R.P(g, `M${x},${y - r} A${r},${r} 0 1 0 ${x},${y + r} A${r * 0.75},${r} 0 1 1 ${x},${y - r} Z`, R.K.nightL, R.K.night, 3);
R.flake = (g, x, y, r = 14) => { const G = mk(g, 'g', {}); for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3; R.P(G, `M${x - Math.cos(a) * r},${y - Math.sin(a) * r} L${x + Math.cos(a) * r},${y + Math.sin(a) * r}`, 'none', R.K.snow, 3); } return G; };
R.seed = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx: x, cy: y, rx: 46 * s, ry: 30 * s, fill: R.K.seed, stroke: R.K.seedS, 'stroke-width': 5 * s }); mk(G, 'ellipse', { cx: x + 6 * s, cy: y + 2 * s, rx: 24 * s, ry: 14 * s, fill: '#F3E2B3', stroke: R.K.seedS, 'stroke-width': 2 }); return G; };
R.wheat = (g, x, yb, h, s = 1) => { const G = mk(g, 'g', {}); R.P(G, `M${x},${yb} L${x},${yb - h}`, 'none', '#B8963A', 4 * s); for (let k = 0; k < 5; k++) { mk(G, 'ellipse', { cx: x - 8 * s, cy: yb - h + k * 14 * s, rx: 7 * s, ry: 11 * s, fill: '#E8C766', stroke: '#9A7A2A', 'stroke-width': 2, transform: `rotate(-25 ${x - 8 * s} ${yb - h + k * 14 * s})` }); mk(G, 'ellipse', { cx: x + 8 * s, cy: yb - h + k * 14 * s, rx: 7 * s, ry: 11 * s, fill: '#E8C766', stroke: '#9A7A2A', 'stroke-width': 2, transform: `rotate(25 ${x + 8 * s} ${yb - h + k * 14 * s})` }); } R.leaf(G, x, yb - h * 0.4, -0.6, 50 * s, 10 * s); R.leaf(G, x, yb - h * 0.25, Math.PI + 0.6, 50 * s, 10 * s); return G; };
})();
