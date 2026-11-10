// resp14.js - drawings for PUC Biology Eps 96-99 (Ch 14 Breathing and Exchange of Gases), same file copied into each folder
(() => {
const { mk, attr } = EP;
const INK = '#2E2A24';
const R = window.R14 = {};
// canon colours (bible Eps 80-99): lungs/alveoli pink, O2-rich blood red, O2-poor plum, O2 sky, CO2 grey, H+ rose
R.K = { lung: '#F3C9CC', lungS: '#B5546A', alv: '#E7A3A8', red: '#C0392B', redL: '#F2B8B0', poor: '#7B4B94', poorL: '#D7C3E6', o2: '#5AA0C8', o2L: '#D6E9F5', co2: '#6B7280', co2L: '#E1E3E8', hp: '#D1495B', cart: '#F4ECD8', cartS: '#A08A5A', mus: '#D9786B', musL: '#F5C6B8', bone: '#F7F1E1', boneS: '#8C7B5A', skin: '#F2D3B3', skinS: '#A8742A', ink: INK, ok: '#3E9B5F' };
R.P = (g, d, f, s = INK, w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
R.circ = (g, x, y, r, f, s = INK, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
R.T = (g, x, y, s, fs = 18, f = INK, a = {}) => { const e = mk(g, 'text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': fs, fill: f }, a)); e.textContent = s; return e; };
R.at = (e, x, y, r = 0, s = 1) => attr(e, 'transform', `translate(${(+x).toFixed(1)} ${(+y).toFixed(1)})${r ? ` rotate(${(+r).toFixed(1)})` : ''}${s !== 1 ? ` scale(${(+s).toFixed(3)})` : ''}`);
R.arrow = (g, x1, y1, x2, y2, c = INK, w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 12; return R.P(g, `M${x1},${y1} L${x2},${y2} M${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`, 'none', c, w); };
// gas molecules: O2 = two sky beads, CO2 = grey bead between two small ones
R.o2 = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); R.circ(G, x - 7 * s, y, 8 * s, R.K.o2L, R.K.o2, 2.5); R.circ(G, x + 7 * s, y, 8 * s, R.K.o2L, R.K.o2, 2.5); return G; };
R.co2 = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); R.circ(G, x - 12 * s, y, 6 * s, R.K.co2L, R.K.co2, 2); R.circ(G, x + 12 * s, y, 6 * s, R.K.co2L, R.K.co2, 2); R.circ(G, x, y, 9 * s, '#B9BEC8', R.K.co2, 2.5); return G; };
R.rbc = (g, x, y, r = 22, f = R.K.red) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx: x, cy: y, rx: r, ry: r * 0.82, fill: f, stroke: '#7A1F16', 'stroke-width': 2.5 }); mk(G, 'ellipse', { cx: x, cy: y, rx: r * 0.45, ry: r * 0.35, fill: '#00000022' }); return G; };
// lung shape (person's right lung on viewer's left when side=-1)
R.lungD = (cx, top, side, s = 1) => { const m = x => cx + side * x * s, y = v => top + v * s;
  return `M${m(18)},${y(0)} C${m(60)},${y(-6)} ${m(130)},${y(40)} ${m(150)},${y(120)} C${m(165)},${y(180)} ${m(160)},${y(230)} ${m(150)},${y(250)} C${m(110)},${y(236)} ${m(60)},${y(228)} ${m(14)},${y(244)} C${m(4)},${y(170)} ${m(0)},${y(80)} ${m(18)},${y(0)} Z`; };
// bronchial tree: recursive branches from (x,y) going angle a
R.tree = (g, x, y, a, len, depth, w, c = R.K.lungS) => { const x2 = x + len * Math.cos(a), y2 = y + len * Math.sin(a); R.P(g, `M${x.toFixed(1)},${y.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`, 'none', c, w);
  if (depth > 0) { R.tree(g, x2, y2, a - 0.45, len * 0.7, depth - 1, Math.max(1.5, w * 0.7), c); R.tree(g, x2, y2, a + 0.4, len * 0.7, depth - 1, Math.max(1.5, w * 0.7), c); } };
// whole human respiratory system, local box ~ 520 x 560 with trachea on x = 260; returns key points for labels
R.system = (g, o = {}) => { const G = mk(g, 'g', {}); const K = R.K;
  // head outline (profile hint) with nasal chamber
  R.P(G, 'M200,10 C200,-30 330,-34 336,24 C340,60 330,90 318,108 L300,126 L222,126 C200,110 186,80 192,52 Z', K.skin, K.skinS, 3);
  R.P(G, 'M214,64 C230,46 280,44 300,60 C292,74 250,80 214,76 Z', '#F6E2CF', K.lungS, 2.5); // nasal chamber
  R.circ(G, 210, 70, 5, INK, INK, 1); // external nostril
  R.P(G, 'M286,62 C296,80 296,100 282,118 L276,150', 'none', K.lungS, 10, { opacity: 0.35 }); // pharynx
  R.P(G, 'M286,62 C296,80 296,100 282,118 L276,150', 'none', K.lungS, 2.5);
  const lar = mk(G, 'rect', { x: 244, y: 146, width: 34, height: 34, rx: 8, fill: K.cart, stroke: K.cartS, 'stroke-width': 3 });
  R.P(G, 'M246,146 Q236,132 250,128', 'none', K.lungS, 4); // epiglottis
  mk(G, 'rect', { x: 250, y: 180, width: 22, height: 120, fill: '#F6E2CF', stroke: K.lungS, 'stroke-width': 2.5 });
  for (let k = 0; k < 8; k++) R.P(G, `M248,${190 + k * 14} Q261,${196 + k * 14} 274,${190 + k * 14}`, 'none', K.cartS, 4);
  const lungs = mk(G, 'g', {}); R.P(lungs, R.lungD(228, 300 - 70, -1, 1), K.lung, K.lungS, 3.5); R.P(lungs, R.lungD(294, 300 - 70, 1, 1), K.lung, K.lungS, 3.5);
  R.P(G, 'M261,300 L214,334 M261,300 L308,334', 'none', K.lungS, 7);
  R.tree(lungs, 214, 334, Math.PI * 0.72, 40, 3, 4.5); R.tree(lungs, 308, 334, Math.PI * 0.28, 40, 3, 4.5);
  const dia = R.P(G, 'M70,500 C150,440 370,440 452,500', 'none', K.mus, 8);
  return { g: G, lungs, dia, pt: { nose: [210, 70], nasal: [258, 62], phar: [292, 96], lar: [261, 163], epi: [242, 134], trach: [261, 240], bron: [236, 318], bronchiole: [150, 390], lung: [400, 300], dia: [260, 456] } };
};
// alveolus cluster: grape bunch on a bronchiole with capillary net; returns group
R.alveoli = (g, cx, cy, s = 1, net = true) => { const G = mk(g, 'g', {}); const K = R.K;
  R.P(G, `M${cx},${cy - 150 * s} L${cx},${cy - 50 * s}`, 'none', K.lungS, 14 * s); R.P(G, `M${cx},${cy - 150 * s} L${cx},${cy - 50 * s}`, 'none', '#F6E2CF', 8 * s);
  const pts = [[0, 0], [-46, -14], [46, -14], [-70, 32], [70, 32], [-30, 50], [30, 50], [0, 92], [-60, 84], [60, 84]];
  pts.forEach(([x, y]) => R.circ(G, cx + x * s, cy + y * s, 34 * s, K.alv, K.lungS, 3));
  if (net) pts.forEach(([x, y], i) => R.P(G, `M${cx + (x - 30) * s},${cy + (y - 8) * s} C${cx + (x - 10) * s},${cy + (y + 18) * s} ${cx + (x + 10) * s},${cy + (y - 22) * s} ${cx + (x + 30) * s},${cy + (y + 6) * s}`, 'none', i % 2 ? K.red : K.poor, 2.5 * s));
  return G; };
// front view chest: ribs, sternum, lungs, diaphragm. u(v): v 0 = breathed out, 1 = breathed in
R.chest = (g, cx, cy, s = 1) => { const G = mk(g, 'g', {}); const K = R.K;
  const lungs = mk(G, 'g', {}); R.P(lungs, R.lungD(cx - 22 * s, cy - 150 * s, -1, s * 0.95), K.lung, K.lungS, 3.5); R.P(lungs, R.lungD(cx + 22 * s, cy - 150 * s, 1, s * 0.95), K.lung, K.lungS, 3.5);
  R.P(G, `M${cx},${cy - 230 * s} L${cx},${cy - 150 * s}`, 'none', K.lungS, 12 * s);
  const ribs = [0, 1, 2, 3, 4, 5].map(k => { const r = mk(G, 'g', {}); const y = cy - 140 * s + k * 38 * s, w = (120 + k * 12) * s;
    R.P(r, `M${cx - 10 * s},${y} C${cx - w},${y - 30 * s} ${cx - w - 50 * s},${y + 30 * s} ${cx - w + 10 * s},${y + 60 * s}`, 'none', K.boneS, 7 * s, { opacity: 0.8 });
    R.P(r, `M${cx + 10 * s},${y} C${cx + w},${y - 30 * s} ${cx + w + 50 * s},${y + 30 * s} ${cx + w - 10 * s},${y + 60 * s}`, 'none', K.boneS, 7 * s, { opacity: 0.8 }); return r; });
  const st = mk(G, 'rect', { x: cx - 13 * s, y: cy - 160 * s, width: 26 * s, height: 190 * s, rx: 10 * s, fill: K.bone, stroke: K.boneS, 'stroke-width': 3 });
  const dia = R.P(G, '', 'none', K.mus, 9 * s);
  const u = v => { attr(lungs, 'transform', `translate(${cx} ${cy - 150 * s}) scale(${(1 + 0.1 * v).toFixed(3)} ${(1 + 0.16 * v).toFixed(3)}) translate(${-cx} ${-(cy - 150 * s)})`);
    ribs.forEach((r, k) => attr(r, 'transform', `translate(${cx} ${cy}) scale(${(1 + 0.06 * v).toFixed(3)} 1) translate(${-cx} ${-cy}) translate(0 ${(-10 * v * s).toFixed(1)})`));
    attr(st, 'transform', `translate(0 ${(-10 * v * s).toFixed(1)})`);
    const h = (95 - 60 * v) * s, yb = cy + 115 * s; attr(dia, 'd', `M${cx - 190 * s},${yb} C${cx - 110 * s},${yb - h} ${cx + 110 * s},${yb - h} ${cx + 190 * s},${yb}`); };
  u(0); return { g: G, u, lungs, dia, st, ribs };
};
})();
