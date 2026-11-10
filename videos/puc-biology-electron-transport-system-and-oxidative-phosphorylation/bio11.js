// bio11.js - drawings for PUC Biology Eps 85-89 (Ch 11 Photosynthesis, Ch 12 Respiration). Same file copied into each folder. Needs EP (ep.js) and B9 (bio9.js).
(() => {
const { mk, C, attr } = EP, { P, circ, T } = B9;
const INK = '#2E2A24';
// canon colours (bible Eps 80-99)
const K = window.K11 = { ink: INK, chl: '#3E9B5F', chlF: '#6DB27A', chlD: '#1F5E37', leaf: '#8CC48F', leafL: '#D8ECD2', mes: '#E4F1DC', bs: '#F3F7EA', xyl: '#C9D6E3', phl: '#E7D9B8',
  mi: '#B35F22', miF: '#F2B57E', mat: '#FBE3C8', atp: '#E58A3C', atpL: '#FBE0C6', nadh: '#2A9D8F', nadhL: '#D2ECE8', fad: '#7B4B94', fadL: '#E6DAF0', co2: '#6B7280', co2L: '#E5E7EB',
  o2: '#5AA0C8', o2L: '#D6E9F5', sug: '#C9962B', sugL: '#F3E2B3', hp: '#D1495B', hpL: '#F6D3D9', el: '#4A78C2', rub: '#D0632F', rubL: '#F4C9B0', pep: '#4A78C2', pepL: '#DCE6F5', lip: '#E8D9A8', red: '#D1495B' };
const B = window.B11 = { K };
// rounded label pill (molecule tag): returns group
B.tag = (g, x, y, s, f, st, fs = 18, w) => { const G = mk(g, 'g', {}); const W = w || (s.length * fs * 0.62 + 26);
  mk(G, 'rect', { x: x - W / 2, y: y - fs * 0.95, width: W, height: fs * 1.9, rx: fs * 0.55, fill: f, stroke: st, 'stroke-width': 2.5 });
  T(G, x, y + fs * 0.36, s, fs, st, { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); return G; };
B.atp = (g, x, y, fs = 18) => B.tag(g, x, y, 'ATP', K.atpL, K.atp, fs);
B.nadh = (g, x, y, fs = 18, s = 'NADH') => B.tag(g, x, y, s, K.nadhL, K.nadh, fs);
B.fad = (g, x, y, fs = 18) => B.tag(g, x, y, 'FADH₂', K.fadL, K.fad, fs);
B.co2 = (g, x, y, r = 22) => { const G = mk(g, 'g', {}); circ(G, x, y, r, K.co2L, K.co2, 2.5); T(G, x, y + r * 0.27, 'CO₂', r * 0.72, K.co2, { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); return G; };
B.o2 = (g, x, y, r = 22) => { const G = mk(g, 'g', {}); circ(G, x, y, r, K.o2L, K.o2, 2.5); T(G, x, y + r * 0.27, 'O₂', r * 0.72, K.o2, { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); return G; };
B.hp = (g, x, y, r = 13) => { const G = mk(g, 'g', {}); circ(G, x, y, r, K.hpL, K.hp, 2); T(G, x, y + r * 0.35, 'H⁺', r * 0.95, K.hp, { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); return G; };
B.el = (g, x, y, r = 9) => { const G = mk(g, 'g', {}); circ(G, x, y, r, K.el, INK, 2); T(G, x, y + r * 0.42, 'e', r * 1.2, '#FFFFFF', { 'font-family': 'IBM Plex Mono', 'font-weight': 700 }); return G; };
// carbon-bead molecule: n beads in a row centred at x,y; label under it
B.mol = (g, x, y, n, f, st, label, r = 14, lfs = 18) => { const G = mk(g, 'g', {}); const w = (n - 1) * r * 2.1;
  if (n > 1) P(G, `M${x - w / 2},${y} L${x + w / 2},${y}`, 'none', st, 3); const b = []; for (let i = 0; i < n; i++) b.push(circ(G, x - w / 2 + i * r * 2.1, y, r, f, st, 2.5));
  if (label) T(G, x, y + r + lfs + 6, label, lfs, st); return Object.assign(G, { beads: b }); };
// leaf cross-section strip (C3 or Kranz). Returns group. w x h centred at cx,cy.
B.leafX = (g, cx, cy, w, h, kranz, o = {}) => { const G = mk(g, 'g', {}); const x0 = cx - w / 2, y0 = cy - h / 2;
  const cp = mk(G, 'clipPath', { id: 'lx' + Math.round(cx) + Math.round(cy) + (kranz ? 'k' : 'c') }); mk(cp, 'rect', { x: x0, y: y0, width: w, height: h, rx: 18 });
  const I = mk(G, 'g', { 'clip-path': `url(#${cp.id})` });
  mk(I, 'rect', { x: x0, y: y0, width: w, height: h, fill: '#EEF6E8' });
  const ep = (yy) => { for (let x = x0; x < x0 + w; x += 34) mk(I, 'rect', { x, y: yy, width: 34, height: 22, rx: 5, fill: '#F7FBF2', stroke: INK, 'stroke-width': 2 }); };
  ep(y0); ep(y0 + h - 22);
  const bx = o.bundles || [cx - w * 0.3, cx + w * 0.05, cx + w * 0.38], by = cy, R = o.R || h * 0.2;
  // mesophyll cells
  for (let r = 0; r < 4; r++) for (let x = x0 + 18 + (r % 2) * 20; x < x0 + w; x += 40) { const yy = y0 + 42 + r * (h - 84) / 3.2;
    const near = bx.some(b => Math.hypot(x - b, yy - by) < R * (kranz ? 1.75 : 1.25)); if (near) continue;
    mk(I, 'ellipse', { cx: x, cy: yy, rx: 16, ry: 14, fill: K.mes, stroke: INK, 'stroke-width': 2 }); circ(I, x - 5, yy - 3, 3.5, K.chlF, K.chlD, 1); circ(I, x + 6, yy + 4, 3.5, K.chlF, K.chlD, 1); }
  const sheaths = [];
  bx.forEach(b => { const S = mk(I, 'g', {}); sheaths.push(S);
    if (kranz) { const n = 11; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, rr = R * 1.32; const x = b + rr * Math.cos(a), y = by + rr * Math.sin(a);
      mk(S, 'circle', { cx: x, cy: y, r: R * 0.44, fill: '#CFE6C4', stroke: INK, 'stroke-width': 3.2 }); for (let q = 0; q < 4; q++) circ(S, x + R * 0.2 * Math.cos(q * 1.6 + a), y + R * 0.2 * Math.sin(q * 1.6 + a), 4.2, K.chl, K.chlD, 1.2); } }
    else { const n = 10; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, rr = R * 1.08; mk(S, 'circle', { cx: b + rr * Math.cos(a), cy: by + rr * Math.sin(a), r: R * 0.3, fill: '#F7FBF2', stroke: INK, 'stroke-width': 2 }); } }
    circ(I, b, by, R * 0.8, '#F4EEDD', INK, 2.5); circ(I, b - R * 0.25, by - R * 0.2, R * 0.28, K.xyl, '#4A6A8A', 2); circ(I, b + R * 0.28, by - R * 0.2, R * 0.22, K.xyl, '#4A6A8A', 2); mk(I, 'ellipse', { cx: b, cy: by + R * 0.38, rx: R * 0.5, ry: R * 0.24, fill: K.phl, stroke: '#8C6D4F', 'stroke-width': 2 }); });
  mk(G, 'rect', { x: x0, y: y0, width: w, height: h, rx: 18, fill: 'none', stroke: INK, 'stroke-width': 3 });
  G.sheaths = sheaths; G.bx = bx; G.by = by; G.R = R; return G; };
// big mitochondrion (outer + folded inner membrane, matrix). Returns group.
B.mito = (g, cx, cy, rx, ry) => { const G = mk(g, 'g', {});
  mk(G, 'ellipse', { cx, cy, rx, ry, fill: K.miF, stroke: K.mi, 'stroke-width': 4 });
  mk(G, 'ellipse', { cx, cy, rx: rx - 14, ry: ry - 14, fill: K.mat, stroke: K.mi, 'stroke-width': 3 });
  const n = 7; for (let k = 0; k < n; k++) { const x = cx - rx * 0.72 + k * rx * 1.44 / (n - 1), top = k % 2 === 0, yy = top ? cy - ry + 14 : cy + ry - 14, d = (ry - 14) * 1.15 * (1 - Math.pow((x - cx) / rx, 2) * 0.5);
    P(G, `M${x - 9},${yy} L${x - 9},${yy + (top ? d : -d)} Q${x},${yy + (top ? d + 14 : -d - 14)} ${x + 9},${yy + (top ? d : -d)} L${x + 9},${yy}`, K.miF, K.mi, 3); }
  return G; };
// arrow along an arc (cycle wheel). returns path element (for B9.pt)
B.ring = (g, cx, cy, r, col = INK, w = 4) => { const p = P(g, `M${cx},${cy - r} A${r},${r} 0 1 1 ${cx - 0.1},${cy - r}`, 'none', col, w); return p; };
B.arrowHead = (g, x, y, ang, col = INK, s = 12) => P(g, `M${x - s * Math.cos(ang - 0.5)},${y - s * Math.sin(ang - 0.5)} L${x},${y} L${x - s * Math.cos(ang + 0.5)},${y - s * Math.sin(ang + 0.5)}`, 'none', col, 3.5);
// small text in mono caps
B.cap = (g, x, y, s, col = INK, fs = 15, an = 'middle') => T(g, x, y, s, fs, col, { 'font-family': 'IBM Plex Mono', 'letter-spacing': 1.2, 'text-anchor': an });
// water plant sprig
B.sprig = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x},${y} C${x - 10 * s},${y - 80 * s} ${x + 12 * s},${y - 160 * s} ${x},${y - 230 * s}`, 'none', K.chlD, 4);
  for (let k = 0; k < 9; k++) { const yy = y - 20 * s - k * 24 * s, sd = k % 2 ? 1 : -1; mk(G, 'ellipse', { cx: x + sd * 22 * s, cy: yy, rx: 22 * s, ry: 7 * s, fill: K.leaf, stroke: K.chlD, 'stroke-width': 2, transform: `rotate(${sd * -25} ${x + sd * 22 * s} ${yy})` }); } return G; };
// sun / lamp
B.lamp = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x - 40 * s},${y - 30 * s} L${x + 40 * s},${y - 30 * s} L${x + 26 * s},${y + 10 * s} L${x - 26 * s},${y + 10 * s} Z`, '#3B4A6B', INK, 3); circ(G, x, y + 18 * s, 16 * s, '#FBE3A0', '#C9962B', 3);
  P(G, `M${x},${y - 30 * s} L${x},${y - 120 * s}`, 'none', INK, 4); return G; };
// generic graph frame (axes), returns mapper
B.graph = (g, x, y, w, h, xl, yl) => { B9.axes(g, x, y, w, h, xl, yl); return (u, v) => [x + u * w, y - v * h]; };
// protein complex blob in a membrane
B.cx = (g, x, y, w, h, f, st, label, fs = 20) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: Math.min(w, h) * 0.42, fill: f, stroke: st, 'stroke-width': 3 }); if (label) T(G, x, y + fs * 0.36, label, fs, st, { 'font-weight': 700 }); return G; };
// lipid membrane band from x0 to x1 centred at y (height h)
B.band = (g, x0, x1, y, h = 56) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x0, y: y - h / 2, width: x1 - x0, height: h, fill: K.lip, stroke: 'none' });
  for (let x = x0 + 8; x < x1; x += 16) { circ(G, x, y - h / 2 + 6, 6, '#F2B57E', K.mi, 1.5); circ(G, x, y + h / 2 - 6, 6, '#F2B57E', K.mi, 1.5); } return G; };
})();
