// bio9.js - molecule drawings for PUC Biology Eps 70-74 (Ch 9 Biomolecules), same file copied into each folder
(() => {
const { mk, C, txt, cap, attr } = EP;
const INK = '#2E2A24';
const B9 = window.B9 = {};
// canon colours (bible Eps 60-79): protein coral, sugar gold, DNA violet, RNA teal, water sky
B9.K = { pro: '#D0632F', proL: '#F4C9B0', sug: '#C9962B', sugL: '#F3E2B3', fru: '#E2B33C', dna: '#7B4B94', rna: '#0F8F8F', wat: '#5AA0C8', watL: '#D6E9F5', lip: '#E8D9A8', red: '#D1495B', zn: '#4A78C2', grey: '#6B7280', coe: '#2A9D8F', ink: INK };
B9.AA = ['#D0632F', '#D9A23B', '#2A9D8F', '#7B4B94', '#5AA0C8', '#C77DA0'];
B9.P = (g, d, f, s = INK, w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
B9.circ = (g, x, y, r, f, s = INK, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
B9.T = (g, x, y, s, fs = 18, f = INK, a = {}) => { const e = mk(g, 'text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': fs, fill: f }, a)); e.textContent = s; return e; };
// bead chain through points; cols = array of colours (cycled)
B9.chain = (g, pts, cols = B9.AA, r = 14) => { const G = mk(g, 'g', {}); const ln = B9.P(G, 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'), 'none', INK, 3);
  const b = pts.map((p, i) => B9.circ(G, p[0], p[1], r, cols[i % cols.length], INK, 2.5)); return { g: G, ln, b }; };
// move an existing chain to new points
B9.place = (ch, pts) => { attr(ch.ln, 'd', 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L')); ch.b.forEach((e, i) => { attr(e, 'cx', pts[i][0].toFixed(1)); attr(e, 'cy', pts[i][1].toFixed(1)); }); };
B9.lerpPts = (a, b, v) => a.map((p, i) => [p[0] + (b[i][0] - p[0]) * v, p[1] + (b[i][1] - p[1]) * v]);
B9.hexD = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
B9.hex = (g, x, y, r, f = B9.K.sugL, s = B9.K.sug, w = 3) => B9.P(g, B9.hexD(x, y, r), f, s, w);
B9.pentD = (x, y, r) => { let d = ''; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
B9.pent = (g, x, y, r, f, s, w = 3) => B9.P(g, B9.pentD(x, y, r), f, s, w);
// sugar chain of hexagons along points
B9.sugars = (g, pts, r = 18, f, s) => { const G = mk(g, 'g', {}); B9.P(G, 'M' + pts.map(p => p.join(',')).join(' L'), 'none', s || B9.K.sug, 4); const h = pts.map(p => B9.hex(G, p[0], p[1], r, f, s)); return { g: G, h }; };
// helix path (sine) from x0 to x1 around y
B9.helixD = (x0, x1, y, amp, turns) => { let d = ''; const n = 120; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, yy = y + amp * Math.sin(i / n * turns * 2 * Math.PI); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + yy.toFixed(1); } return d; };
// enzyme blob centred at cx,cy with a cleft (active site) at the top; open 0..1 shape change
B9.enzD = (cx, cy, s = 1, fit = 0) => { const w = 34 - 10 * fit, d = 56 + 6 * fit;
  return `M${cx - 120 * s},${cy} C${cx - 130 * s},${cy - 90 * s} ${cx - 80 * s},${cy - 110 * s} ${cx - (w + 20) * s},${cy - 100 * s} L${cx - w * s},${cy - (100 - d) * s} Q${cx},${cy - (100 - d - 18) * s} ${cx + w * s},${cy - (100 - d) * s} L${cx + (w + 20) * s},${cy - 100 * s} C${cx + 80 * s},${cy - 110 * s} ${cx + 130 * s},${cy - 90 * s} ${cx + 120 * s},${cy} C${cx + 120 * s},${cy + 90 * s} ${cx - 120 * s},${cy + 90 * s} ${cx - 120 * s},${cy} Z`; };
B9.enz = (g, cx, cy, s = 1, f = B9.K.proL, st = B9.K.pro) => B9.P(g, B9.enzD(cx, cy, s), f, st, 3.5);
// substrate: a gold capsule of two halves (splits into two products)
B9.sub = (g, s = 1, f = B9.K.sugL, st = B9.K.sug) => { const G = mk(g, 'g', {}), a = mk(G, 'g', {}), b = mk(G, 'g', {});
  B9.P(a, `M0,${-22 * s} L${-24 * s},${-22 * s} A${22 * s},${22 * s} 0 0 0 ${-24 * s},${22 * s} L0,${22 * s} Z`, f, st, 3); B9.P(b, `M0,${-22 * s} L${24 * s},${-22 * s} A${22 * s},${22 * s} 0 0 1 ${24 * s},${22 * s} L0,${22 * s} Z`, f, st, 3); return { g: G, a, b }; };
B9.at = (e, x, y, r = 0, s = 1) => attr(e, 'transform', `translate(${(+x).toFixed(1)} ${(+y).toFixed(1)})${r ? ` rotate(${(+r).toFixed(1)})` : ''}${s !== 1 ? ` scale(${(+s).toFixed(3)})` : ''}`);
// graph axes with labels
B9.axes = (g, x, y, w, h, xl, yl) => { B9.P(g, `M${x},${y - h} L${x},${y} L${x + w},${y}`, 'none', INK, 3); B9.P(g, `M${x - 7},${y - h + 10} L${x},${y - h} L${x + 7},${y - h + 10} M${x + w - 10},${y - 7} L${x + w},${y} L${x + w - 10},${y + 7}`, 'none', INK, 3);
  cap(g, x + w / 2, y + 34, xl, { fill: INK }); cap(g, x - 20, y - h / 2, yl, { fill: INK, transform: `rotate(-90 ${x - 20} ${y - h / 2})` }); };
// point on a path at fraction v
B9.pt = (path, v) => { const L = path.getTotalLength(); return path.getPointAtLength(L * M.clamp(v)); };
// a simple face-free hand/arrow
B9.arrow = (g, x1, y1, x2, y2, c = INK, w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 12; return B9.P(g, `M${x1},${y1} L${x2},${y2} M${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`, 'none', c, w); };
// cell outline with scattered contents (for zoom rung 1)
B9.cell = (g, cx, cy, rx, ry) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx, cy, rx, ry, fill: '#F3F7EA', stroke: INK, 'stroke-width': 4 }); mk(G, 'ellipse', { cx: cx - rx * 0.15, cy: cy + ry * 0.05, rx: rx * 0.24, ry: ry * 0.3, fill: '#D7C3E6', stroke: '#7B4B94', 'stroke-width': 3 });
  [[0.45, -0.35, 20], [0.55, 0.3, -30], [-0.55, -0.45, 40]].forEach(([a, b, r]) => mk(G, 'ellipse', { cx: cx + rx * a, cy: cy + ry * b, rx: 34, ry: 18, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5, transform: `rotate(${r} ${cx + rx * a} ${cy + ry * b})` })); return G; };
})();
