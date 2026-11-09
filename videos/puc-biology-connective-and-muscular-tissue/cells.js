// cells.js - epithelium / tissue cell drawings for PUC Biology Eps 56-57 (same file copied into both folders)
(() => {
const { mk, C } = EP;
const CF = '#F7DCD3', CS = '#B5655A', NU = '#7A5BB0', BM = '#8C8C8C';
const CE = window.CE = { CF, CS, NU, BM };
// a row of epithelial cells standing on a basement membrane at y0. kind: sq cu co ci mv
CE.row = (g, kind, x0, y0, n, o = {}) => { const r = { c: [], nu: [], ci: [], g: mk(g, 'g', {}) }, G = r.g, sw = o.sw || 2;
  const W = { sq: 70, cu: 46, co: 30, ci: 30, mv: 30 }[kind] * (o.s || 1), H = { sq: 18, cu: 46, co: 96, ci: 96, mv: 96 }[kind] * (o.s || 1);
  for (let i = 0; i < n; i++) { const x = x0 + i * W;
    let d; if (kind === 'sq') d = `M${x},${y0} L${x + 2},${y0 - H + 3} Q${x + W / 2},${y0 - H - 4 + (i % 2) * 5} ${x + W - 2},${y0 - H + 2} L${x + W},${y0} Z`;
    else d = `M${x},${y0} L${x},${y0 - H + 4} Q${x},${y0 - H} ${x + 4},${y0 - H} L${x + W - 4},${y0 - H} Q${x + W},${y0 - H} ${x + W},${y0 - H + 4} L${x + W},${y0} Z`;
    r.c.push(mk(G, 'path', { d, fill: o.fill || CF, stroke: o.stroke || CS, 'stroke-width': sw }));
    if (kind === 'sq') r.nu.push(mk(G, 'ellipse', { cx: x + W / 2, cy: y0 - H / 2, rx: 11 * (o.s || 1), ry: 4.5 * (o.s || 1), fill: NU }));
    else if (kind === 'cu') r.nu.push(mk(G, 'circle', { cx: x + W / 2, cy: y0 - H / 2, r: 9 * (o.s || 1), fill: NU }));
    else r.nu.push(mk(G, 'ellipse', { cx: x + W / 2, cy: y0 - 20 * (o.s || 1), rx: 8 * (o.s || 1), ry: 11 * (o.s || 1), fill: NU }));
    if (kind === 'ci') for (let k = 0; k < 3; k++) { const bx = x + W * (0.22 + 0.28 * k); r.ci.push({ x: bx, y: y0 - H, L: 20 * (o.s || 1), k: i * 3 + k, e: mk(G, 'line', { x1: bx, y1: y0 - H, x2: bx, y2: y0 - H - 20, stroke: o.cil || C.ac, 'stroke-width': 2.5, 'stroke-linecap': 'round' }) }); }
    if (kind === 'mv') for (let k = 0; k < 5; k++) { const bx = x + 3 + k * (W - 6) / 4; mk(G, 'line', { x1: bx, y1: y0 - H, x2: bx, y2: y0 - H - 8 * (o.s || 1), stroke: CS, 'stroke-width': 2, 'stroke-linecap': 'round' }); }
  }
  r.bm = mk(G, 'line', { x1: x0 - 6, y1: y0 + 2, x2: x0 + n * W + 6, y2: y0 + 2, stroke: BM, 'stroke-width': 3 });
  r.W = W; r.H = H; return r; };
// beating cilia: call each frame
CE.beat = (r, t, on = 1) => r.ci.forEach(c => { const a = on * 0.6 * Math.sin(t * 7 - c.k * 0.45); c.e.setAttribute('x2', (c.x + c.L * Math.sin(a)).toFixed(1)); c.e.setAttribute('y2', (c.y - c.L * Math.cos(a)).toFixed(1)); });
// compound (stratified) epithelium: layers from basement at y0 upward
CE.strat = (g, x0, y0, w, o = {}) => { const G = mk(g, 'g', {}), out = { g: G, layers: [] };
  const L = [[30, 30, 'cu'], [34, 30, 'pg'], [40, 26, 'pg'], [56, 16, 'fl'], [64, 11, 'fl']]; let y = y0;
  L.forEach(([cw, ch, k], li) => { const n = Math.floor(w / cw), off = li % 2 ? cw / 2 : 0, lay = [];
    for (let i = 0; i < n; i++) { const x = x0 + i * cw + off; if (x + cw > x0 + w + 1) continue;
      lay.push(mk(G, 'rect', { x, y: y - ch, width: cw, height: ch, rx: k === 'cu' ? 4 : k === 'pg' ? 8 : 5, fill: k === 'fl' ? '#F2E6DF' : CF, stroke: CS, 'stroke-width': 1.8 }));
      if (k === 'fl') mk(G, 'ellipse', { cx: x + cw / 2, cy: y - ch / 2, rx: 7, ry: 2.5, fill: '#A08CC4' }); else mk(G, 'circle', { cx: x + cw / 2, cy: y - ch / 2, r: k === 'cu' ? 6 : 6.5, fill: NU }); }
    out.layers.push(lay); y -= ch; });
  mk(G, 'line', { x1: x0 - 6, y1: y0 + 2, x2: x0 + w + 6, y2: y0 + 2, stroke: BM, 'stroke-width': 3 }); out.top = y; return out; };
})();
