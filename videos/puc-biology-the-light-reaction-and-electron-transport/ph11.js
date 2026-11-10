// ph11.js - drawings for PUC Biology Eps 80-84 (Ch 11 Photosynthesis in Higher Plants), same file copied into each folder
(() => {
const { mk, cap, attr } = EP;
const INK = '#2E2A24';
const H = window.H11 = {};
// canon colours (bible Eps 80-99)
H.K = { chl: '#3E9B5F', chlF: '#6DB27A', chlD: '#1F5E37', leaf: '#8CC48F', vein: '#D8ECD2', str: '#E4F1DC', atp: '#E07B39', atpL: '#FBE0C8', nad: '#2A9D8F', nadL: '#CDEBE7', co2: '#6B7280', o2: '#5AA0C8', o2L: '#D6E9F5', sug: '#C9962B', sugL: '#F3E2B3', h: '#D1495B', e: '#4A78C2', rub: '#D0632F', rubL: '#F4C9B0', red: '#D1495B', cyt: '#8C6D4F', lumen: '#EEF6E8', ink: INK };
H.P = (g, d, f, s = INK, w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
H.circ = (g, x, y, r, f, s = INK, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
H.T = (g, x, y, s, fs = 18, f = INK, a = {}) => { const e = mk(g, 'text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': fs, fill: f }, a)); e.textContent = s; return e; };
H.at = (e, x, y, r = 0, s = 1) => attr(e, 'transform', `translate(${(+x).toFixed(1)} ${(+y).toFixed(1)})${r ? ` rotate(${(+r).toFixed(1)})` : ''}${s !== 1 ? ` scale(${(+s).toFixed(3)})` : ''}`);
H.arrow = (g, x1, y1, x2, y2, c = INK, w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 12; return H.P(g, `M${x1},${y1} L${x2},${y2} M${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`, 'none', c, w); };
H.axes = (g, x, y, w, h, xl, yl) => { H.P(g, `M${x},${y - h} L${x},${y} L${x + w},${y}`, 'none', INK, 3); H.P(g, `M${x - 7},${y - h + 10} L${x},${y - h} L${x + 7},${y - h + 10} M${x + w - 10},${y - 7} L${x + w},${y} L${x + w - 10},${y + 7}`, 'none', INK, 3);
  cap(g, x + w / 2, y + 34, xl, { fill: INK }); cap(g, x - 20, y - h / 2, yl, { fill: INK, transform: `rotate(-90 ${x - 20} ${y - h / 2})` }); };
H.pt = (path, v) => { const L = path.getTotalLength(); return path.getPointAtLength(L * M.clamp(v)); };
// molecule pill (ATP, NADPH, CO2, O2...) centred at 0,0 inside a group; move with H.at
H.pill = (g, s, c, light, w) => { const G = mk(g, 'g', {}); const W = w || (s.length * 13 + 28); mk(G, 'rect', { x: -W / 2, y: -17, width: W, height: 34, rx: 17, fill: light || c, stroke: c, 'stroke-width': 2.5 }); H.T(G, 0, 7, s, 18, light ? c : '#FFFFFF', { 'font-weight': 700 }); return G; };
H.mol = { ATP: g => H.pill(g, 'ATP', H.K.atp), NADPH: g => H.pill(g, 'NADPH', H.K.nad), CO2: g => H.pill(g, 'CO₂', H.K.co2), O2: g => H.pill(g, 'O₂', H.K.o2), H: g => { const G = mk(g, 'g', {}); H.circ(G, 0, 0, 13, '#F7D3D8', H.K.h, 2.5); H.T(G, 0, 6, 'H⁺', 15, H.K.h, { 'font-weight': 700 }); return G; }, E: g => { const G = mk(g, 'g', {}); H.circ(G, 0, 0, 11, H.K.e, INK, 2); H.T(G, 0, 5, 'e', 15, '#fff', { 'font-weight': 700 }); return G; } };
// placed group: outer g carries the position, returns the inner g (safe for M.vis)
H.put = (g, x, y, f) => { const o = mk(g, 'g', { transform: `translate(${x} ${y})` }); const i = mk(o, 'g', {}); f(i); return i; };
// sun with rays
H.sun = (g, x, y, r = 40) => { const G = mk(g, 'g', {}); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; H.P(G, `M${x + (r + 10) * Math.cos(a)},${y + (r + 10) * Math.sin(a)} L${x + (r + 26) * Math.cos(a)},${y + (r + 26) * Math.sin(a)}`, 'none', H.K.sug, 5); } H.circ(G, x, y, r, '#F6D77A', H.K.sug, 4); return G; };
// leaf outline with midrib and veins, pointing right
H.leafD = (x, y, L, W) => `M${x},${y} C${x + L * 0.25},${y - W} ${x + L * 0.7},${y - W * 0.9} ${x + L},${y} C${x + L * 0.7},${y + W * 0.9} ${x + L * 0.25},${y + W} ${x},${y} Z`;
H.leaf = (g, x, y, L, W, f = H.K.leaf) => { const G = mk(g, 'g', {}); H.P(G, H.leafD(x, y, L, W), f, INK, 4); H.P(G, `M${x},${y} L${x + L * 0.96},${y}`, 'none', H.K.vein, 4); for (let k = 1; k < 5; k++) { const px = x + L * k / 5.4; H.P(G, `M${px},${y} Q${px + L * 0.08},${y - W * 0.45} ${px + L * 0.16},${y - W * 0.6} M${px},${y} Q${px + L * 0.08},${y + W * 0.45} ${px + L * 0.16},${y + W * 0.6}`, 'none', H.K.vein, 3); } H.P(G, `M${x - L * 0.18},${y + 6} L${x},${y}`, 'none', INK, 5); return G; };
// one granum: stack of n thylakoid discs centred at x,y
H.granum = (g, x, y, w = 70, n = 6, dh = 13) => { const G = mk(g, 'g', {}); for (let k = 0; k < n; k++) mk(G, 'rect', { x: x - w / 2, y: y - n * dh / 2 + k * dh, width: w, height: dh - 2, rx: (dh - 2) / 2, fill: H.K.chlF, stroke: H.K.chlD, 'stroke-width': 2 }); return G; };
// chloroplast: double membrane, stroma, grana joined by stroma lamellae. returns {g, gr:[[x,y]], lam:[x,y], st:[x,y]}
H.chloro = (g, cx, cy, rx, ry, n = 5) => { const G = mk(g, 'g', {});
  mk(G, 'ellipse', { cx, cy, rx, ry, fill: '#FFFFFF', stroke: H.K.chlD, 'stroke-width': 4 }); mk(G, 'ellipse', { cx, cy, rx: rx - 10, ry: ry - 10, fill: H.K.str, stroke: H.K.chl, 'stroke-width': 3 });
  const gr = []; for (let k = 0; k < n; k++) { const x = cx - rx * 0.62 + k * (rx * 1.24 / (n - 1)), y = cy + (k % 2 ? ry * 0.22 : -ry * 0.18); gr.push([x, y]); }
  for (let k = 0; k < n - 1; k++) H.P(G, `M${gr[k][0]},${gr[k][1]} L${gr[k + 1][0]},${gr[k + 1][1]}`, 'none', H.K.chl, 4);
  const sc = ry / 140; gr.forEach(([x, y]) => H.granum(G, x, y, 64 * sc + 10, 6, 13 * sc + 2));
  return { g: G, gr, lam: [(gr[1][0] + gr[2][0]) / 2, (gr[1][1] + gr[2][1]) / 2], st: [cx + rx * 0.1, cy + ry * 0.62] }; };
// mesophyll cell with chloroplasts lining the walls
H.meso = (g, x, y, w, h) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x, y, width: w, height: h, rx: 26, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 3 }); mk(G, 'rect', { x: x + 8, y: y + 8, width: w - 16, height: h - 16, rx: 20, fill: '#F3F7EA', stroke: 'none' }); mk(G, 'rect', { x: x + 34, y: y + 34, width: w - 68, height: h - 68, rx: 14, fill: '#D6E9F5', stroke: '#5AA0C8', 'stroke-width': 2 });
  const cs = []; const per = 2 * (w + h), n = Math.round(per / 34); for (let k = 0; k < n; k++) { let d = k * per / n, px, py, r = 0; if (d < w) { px = x + d; py = y + 19; } else if ((d -= w) < h) { px = x + w - 19; py = y + d; r = 90; } else if ((d -= h) < w) { px = x + w - d; py = y + h - 19; } else { d -= w; px = x + 19; py = y + h - d; r = 90; }
    if ((r === 0 && (px < x + 40 || px > x + w - 40)) || (r === 90 && (py < y + 40 || py > y + h - 40))) continue; cs.push(mk(G, 'ellipse', { cx: px, cy: py, rx: 13, ry: 7, fill: H.K.chlF, stroke: H.K.chlD, 'stroke-width': 2, transform: `rotate(${r} ${px} ${py})` })); }
  return G; };
// thylakoid membrane band (horizontal) from x0 to x1, centred at y, thickness 34; stroma above, lumen below
H.memb = (g, x0, x1, y, th = 34) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x0, y: y - th / 2, width: x1 - x0, height: th, fill: '#E8D9A8' });
  for (let x = x0 + 8; x < x1; x += 16) { H.circ(G, x, y - th / 2 + 5, 5, '#5AA0C8', '#3B7FA8', 1.5); H.circ(G, x, y + th / 2 - 5, 5, '#5AA0C8', '#3B7FA8', 1.5); } return G; };
// membrane protein blob (photosystem, cytochrome) centred x,y with label
H.prot = (g, x, y, w, h, f, s, label, fs = 18) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: Math.min(w, h) / 2.4, fill: f, stroke: s, 'stroke-width': 3 }); if (label) H.T(G, x, y + fs * 0.35, label, fs, s, { 'font-weight': 700 }); return G; };
// ATP synthase: CF0 in the membrane (at y), CF1 knob above (stroma side). returns {g, head}
H.synth = (g, x, y) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - 26, y: y - 24, width: 52, height: 48, rx: 10, fill: '#F4C9B0', stroke: H.K.rub, 'stroke-width': 3 }); mk(G, 'rect', { x: x - 6, y: y - 64, width: 12, height: 42, fill: '#F4C9B0', stroke: H.K.rub, 'stroke-width': 2.5 });
  const head = mk(G, 'g', {}); [-26, 0, 26].forEach(dx => H.circ(head, x + dx, y - 86, 18, '#FBE0C8', H.K.atp, 3)); [-13, 13].forEach(dx => H.circ(head, x + dx, y - 108, 18, '#FBE0C8', H.K.atp, 3)); return { g: G, head }; };
})();
