// pg13.js - plant drawings for PUC Biology Eps 91-94 (Ch 13 Plant Growth and Development), same file copied into each folder
(() => {
const { mk, attr } = EP, { P, circ, T } = B9, INK = '#2E2A24';
const PG = window.PG = {};
// palette (Ep 1 canon): leaf, stem, soil, pot, root
PG.K = { leaf: '#8CC48F', leafS: '#3E7A4A', vein: '#D8ECD2', stem: '#7FB069', soil: '#9E7B55', soilL: '#C9A97E', pot: '#C7704A', potS: '#7A3E22', root: '#E8D9A8', rootS: '#9A6B2F', wall: '#E3D3A0', wallS: '#7A6A2E', cyto: '#F3F7EA', nuc: '#D7C3E6', nucS: '#7B4B94', vac: '#D6E9F5', vacS: '#5AA0C8', ink: INK };
// leaf blade from base (x,y), length L, angle a (deg, 0 = right)
PG.leafD = (x, y, L, a) => { const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r), p = (u, v) => [(x + u * c - v * s).toFixed(1), (y + u * s + v * c).toFixed(1)].join(',');
  return `M${p(0, 0)} C${p(L * 0.3, -L * 0.38)} ${p(L * 0.75, -L * 0.3)} ${p(L, 0)} C${p(L * 0.75, L * 0.3)} ${p(L * 0.3, L * 0.38)} ${p(0, 0)} Z`; };
PG.leaf = (g, x, y, L, a, f = PG.K.leaf, s = PG.K.leafS) => { const G = mk(g, 'g', {}); P(G, PG.leafD(x, y, L, a), f, s, 3); const r = a * Math.PI / 180; P(G, `M${x},${y} L${(x + L * 0.85 * Math.cos(r)).toFixed(1)},${(y + L * 0.85 * Math.sin(r)).toFixed(1)}`, 'none', s, 2); return G; };
PG.pot = (g, x, y, w = 140) => { const G = mk(g, 'g', {}); P(G, `M${x - w / 2},${y} L${x + w / 2},${y} L${x + w * 0.38},${y + w * 0.8} L${x - w * 0.38},${y + w * 0.8} Z`, PG.K.pot, PG.K.potS, 3.5); mk(G, 'rect', { x: x - w / 2 - 10, y: y - 16, width: w + 20, height: 24, rx: 6, fill: PG.K.pot, stroke: PG.K.potS, 'stroke-width': 3.5 }); mk(G, 'ellipse', { cx: x, cy: y - 16, rx: w / 2, ry: 8, fill: PG.K.soil }); return G; };
PG.sun = (g, x, y, r = 34) => { const G = mk(g, 'g', {}), rays = mk(G, 'g', {}); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; P(rays, `M${(x + (r + 8) * Math.cos(a)).toFixed(1)},${(y + (r + 8) * Math.sin(a)).toFixed(1)} L${(x + (r + 22) * Math.cos(a)).toFixed(1)},${(y + (r + 22) * Math.sin(a)).toFixed(1)}`, 'none', '#C9962B', 4); } circ(G, x, y, r, '#F6D37A', '#C9962B', 3.5); G.rays = rays; return G; };
// stem curve from base (x,y) up h px, tip leaning by bend (px to the side); returns path d and tip point
PG.stemPts = (x, y, h, bend) => ({ d: `M${x},${y} Q${x},${(y - h * 0.55).toFixed(1)} ${(x + bend).toFixed(1)},${(y - h).toFixed(1)}`, tip: [x + bend, y - h] });
// simple seedling: stem + two leaves at the tip; update with PG.setSeed(sd, h, bend)
PG.seed = (g, x, y) => { const G = mk(g, 'g', {}), st = P(G, '', 'none', PG.K.stem, 7), l1 = P(G, '', PG.K.leaf, PG.K.leafS, 3), l2 = P(G, '', PG.K.leaf, PG.K.leafS, 3); return { g: G, st, l1, l2, x, y }; };
PG.setSeed = (sd, h, bend = 0, L = 46) => { const s = PG.stemPts(sd.x, sd.y, h, bend); attr(sd.st, 'd', s.d); const a = Math.atan2(bend, h) * 180 / Math.PI; attr(sd.l1, 'd', PG.leafD(s.tip[0], s.tip[1], L, -150 + a)); attr(sd.l2, 'd', PG.leafD(s.tip[0], s.tip[1], L, -30 + a)); return s.tip; };
// plant cell: rect with wall, nucleus, optional vacuole fraction
PG.cell = (g, x, y, w, h, o = {}) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x, y, width: w, height: h, rx: Math.min(10, w / 5), fill: o.f || PG.K.cyto, stroke: o.s || PG.K.wallS, 'stroke-width': o.sw || 3 });
  if (o.vac) mk(G, 'rect', { x: x + w * 0.18, y: y + h * 0.12, width: w * 0.64, height: h * o.vac, rx: Math.min(8, w / 6), fill: PG.K.vac, stroke: PG.K.vacS, 'stroke-width': 2 });
  if (o.nuc !== false) circ(G, x + w / 2, y + h * (o.vac ? 0.86 : 0.5), Math.min(w, h) * (o.nr || 0.26), PG.K.nuc, PG.K.nucS, 2); return G; };
// small x / tick marks
PG.cross = (g, x, y, r = 14, c = '#D1495B') => P(g, `M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}`, 'none', c, 4.5);
PG.tick = (g, x, y, r = 14, c = '#3E9B5F') => P(g, `M${x - r},${y} L${x - r * 0.3},${y + r * 0.7} L${x + r},${y - r * 0.8}`, 'none', c, 4.5);
PG.along = (pts, v) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let r = M.clamp(v) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const f = L[i] ? Math.min(1, r / L[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } r -= L[i]; } return pts[0]; };
// partial stroke draw 0..1
PG.part = (el, v) => { const L = el.getTotalLength(); el.style.strokeDasharray = L.toFixed(1); el.style.strokeDashoffset = (L * (1 - M.clamp(v))).toFixed(1); };
})();
