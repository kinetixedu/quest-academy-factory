// PUC Biology Ep 90: Respiratory Balance Sheet, Amphibolic Pathway and RQ (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, hex, at, axes, arrow } = B9;
const ICN = { bowl: ['M3 11h18', 'M4 11a8 8 0 0 0 16 0', 'M9 7c0-1 1-2 1-3', 'M14 7c0-1 1-2 1-3'], drop: ['M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z'], pot: ['M5 9h14v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z', 'M3 9h18', 'M9 5h6'] };
const S = [];
// colours (bible Eps 80-99): ATP orange, NADH teal, FADH2 violet, CO2 grey, O2 sky, glucose gold, mitochondrion orange
const ATP = '#E58A3C', NAD = '#2A9D8F', FAD = '#8E5BB5', CO2 = '#6B7280', O2 = '#5AA0C8', MF = '#F2B57E', MS = '#B35F22', ML = '#FBE3C8', FAT = '#E8D9A8';
const along = (pts, v) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let r = M.clamp(v) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const f = L[i] ? Math.min(1, r / L[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } r -= L[i]; } return pts[0]; };
const pill = (g, x, y, s, f, tc = '#FFFFFF', w = 64, h = 30) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: h / 2, fill: f, stroke: K.ink, 'stroke-width': 2 }); T(G, x, y + 6, s, 15, tc, { 'font-family': 'IBM Plex Mono' }); return G; };
const node = (g, x, y, s, w, f = '#FFFFFF', st = K.ink, tc = K.ink, fs = 22) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - w / 2, y: y - 28, width: w, height: 56, rx: 14, fill: f, stroke: st, 'stroke-width': 3 }); T(G, x, y + 8, s, fs, tc); return G; };
const mito = (g, cx, cy, rx, ry, n = 5) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx, cy, rx, ry, fill: MF, stroke: MS, 'stroke-width': 4 }); mk(G, 'ellipse', { cx, cy, rx: rx - 16, ry: ry - 16, fill: ML, stroke: MS, 'stroke-width': 3 });
  for (let k = 0; k < n; k++) { const x = cx - rx * 0.66 + k * (rx * 1.32 / (n - 1)), up = k % 2 === 0, y0 = up ? cy - ry + 16 : cy + ry - 16, y1 = cy + (up ? -ry * 0.05 : ry * 0.05), w = rx * 0.06;
    P(G, `M${x - w},${y0} L${x - w},${y1} Q${x},${y1 + (up ? w * 2 : -w * 2)} ${x + w},${y1} L${x + w},${y0}`, MF, MS, 3); } return G; };
const dots = (g, n, f, r = 6) => Array.from({ length: n }, () => circ(g, -50, -50, r, f, K.ink, 1.5));

/* ---------- H: three foods ---------- */
S.push(EP.hook({ label: 'THE KITCHEN · THREE FOODS', face: 'diya', pill: ['One shared pathway', ['H2', 'shared', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['How much energy from one sugar?', ['H3', 'much']], ['Does every food use oxygen alike?', ['H3', 'every']]],
  a: [['ANSWER 1', '38 ATP from one glucose', ['H4', 'thirty']], ['ANSWER 2', 'The gas trade changes with the food', ['H4', 'gas']]],
  chips: [['Balance sheet', ['H5', 'balance']], ['Amphibolic pathway', ['H5', 'amphibolic']], ['Respiratory quotient', ['H5', 'quotient']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 360, width: 784, height: 220, fill: '#9E7B55' });
    const B = [[170, '#FBFAF4', 'CARBOHYDRATE'], [392, '#F0CF6B', 'FAT'], [614, '#E2B33C', 'PROTEIN']], tags = [];
    const st = B.map(([x, f, n], k) => { P(s, `M${x - 92},340 Q${x},440 ${x + 92},340 Z`, '#FFFFFF', K.ink, 3.5); mk(s, 'ellipse', { cx: x, cy: 340, rx: 92, ry: 22, fill: f, stroke: K.ink, 'stroke-width': 3 });
      if (!k) for (let j = 0; j < 14; j++) mk(s, 'ellipse', { cx: x - 60 + (j * 37) % 120, cy: 334 + (j * 7) % 12, rx: 8, ry: 3.5, fill: '#FFFFFF', stroke: '#C9C2B0', 'stroke-width': 1.3 });
      tags.push(cap(s, x, 450, n, { fill: '#FFFFFF', 'font-size': 18 })); return [0, 1].map(j => P(s, '', 'none', '#B9C7CF', 4)); });
    const hub = mk(s, 'g', {}); mk(hub, 'rect', { x: 262, y: 120, width: 260, height: 56, rx: 14, fill: C.ac, stroke: K.ink, 'stroke-width': 3 }); T(hub, 392, 156, 'ONE PATHWAY', 22, '#FFFFFF', { 'font-family': 'IBM Plex Mono' });
    const pd = B.map(([, f]) => dots(s, 3, f, 7));
    return { els: [[hub, ['H2', 'shared', -0.2], { ...POP, sc: 0.6 }], ...tags.map((e, i) => [e, ['H1', ['bowl', 'spoon', 'cup'][i]], { dy: 8 }])],
      anim: t => { st.forEach((pr, k) => pr.forEach((p, j) => { const x = B[k][0] - 20 + j * 40, w = 8 * Math.sin(t * 2 + k + j); attr(p, 'd', `M${x},310 c${w},-14 ${-w},-26 0,-40`); }));
        const a = tm(['H2', 'shared']); pd.forEach((ds, k) => ds.forEach((d, j) => { const u = ((t - a) * 0.45 + j / 3) % 1, q = along([[B[k][0], 300], [B[k][0], 240], [392, 190]], u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 5 * u, 5 * (1 - u)).toFixed(2) : 0; })); } };
  } }));

/* ---------- B: what is a balance sheet ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS A BALANCE SHEET?', pill: ["ATP: the cell's energy coin", ['B3', 'coin', -0.1], 'ac'], build: (el, s) => {
  const hd = [[280, 'IN'], [1320, 'OUT']].map(([x, n]) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: x - 160, y: 76, width: 320, height: 48, rx: 10, fill: '#EEF3EC' }); T(g, x, 108, n, 22, C.ac, { 'font-family': 'IBM Plex Mono' }); return g; });
  const gi = mk(s, 'g', {}); hex(gi, 170, 200, 30); T(gi, 300, 208, 'Glucose', 26, K.ink, { 'text-anchor': 'start' }); const oi = mk(s, 'g', {}); circ(oi, 156, 300, 16, '#D6E9F5', O2, 3); circ(oi, 184, 300, 16, '#D6E9F5', O2, 3); T(oi, 300, 308, 'Oxygen', 26, K.ink, { 'text-anchor': 'start' });
  const co = mk(s, 'g', {}); circ(co, 1190, 190, 16, '#D9DCE1', CO2, 3); circ(co, 1172, 190, 11, '#FFFFFF', K.ink, 2); circ(co, 1208, 190, 11, '#FFFFFF', K.ink, 2); T(co, 1250, 198, 'Carbon dioxide', 26, K.ink, { 'text-anchor': 'start' });
  const wa = mk(s, 'g', {}); circ(wa, 1190, 270, 17, '#D6E9F5', O2, 3); T(wa, 1250, 278, 'Water', 26, K.ink, { 'text-anchor': 'start' });
  const ap = mk(s, 'g', {}); [0, 1, 2].forEach(k => pill(ap, 1160 + k * 36, 350 + k * 0, 'ATP', ATP, '#FFFFFF', 60, 28)); T(ap, 1290, 358, 'ATP', 26, K.ink, { 'text-anchor': 'start' });
  const m = mito(s, 800, 270, 220, 110); const mc = cap(s, 800, 420, 'RESPIRATION · ONE GLUCOSE', { fill: K.ink, 'font-size': 18 });
  const din = [...dots(s, 3, K.sugL, 8), ...dots(s, 3, '#D6E9F5', 8)], dout = [...dots(s, 3, '#D9DCE1', 8), ...dots(s, 3, ATP, 8)];
  return { els: [...hd.map(g => [g, ['B2', 'counts', -0.1], { dy: 10 }]), [gi, ['B3', 'Glucose', -0.1], { dx: -16, dy: 0 }], [oi, ['B3', 'oxygen', -0.1], { dx: -16, dy: 0 }], [m, ['B3', 'count', -0.2], { ...POP, sc: 0.6 }], [mc, ['B3', 'count']],
    [co, ['B3', 'Carbon', -0.1], { dx: 16, dy: 0 }], [wa, ['B3', 'water', -0.1], { dx: 16, dy: 0 }], [ap, ['B3', 'ATP', 0, 2], { dx: 16, dy: 0 }]],
    anim: t => { const a = tm(['B3', 'go']); din.forEach((d, j) => { const u = ((t - a) * 0.5 + j / 6) % 1, q = along([[460, j < 3 ? 200 : 300], [600, 270]], u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });
      const b = tm(['B3', 'come']); dout.forEach((d, j) => { const u = ((t - b) * 0.5 + j / 6) % 1, q = along([[1000, 270], [1140, j < 3 ? 190 : 350]], u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > b ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; }); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['PLANT CELL', 'MITOCHONDRION', 'INNER MEMBRANE'], scales: ['x1,000', 'x20,000', 'x200,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Plant cell', 'Glycolysis runs in the cytoplasm.', 'Many mitochondria.'], ['RUNG 2 OF 3', 'Mitochondrion', 'Krebs cycle runs in the matrix.', 'The jelly in the middle.'], ['RUNG 3 OF 3', 'Inner membrane', 'The ETS makes ATP here.', 'NADH gives 3 ATP. FADH2 gives 2.']],
  av: { who: 'Diya', text: 'Most ATP is made here!', tin: ['Z4', 'Each', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [650, 140, 56], build: g => { mk(g, 'rect', { x: 150, y: 50, width: 620, height: 420, rx: 34, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 4 }); mk(g, 'rect', { x: 166, y: 66, width: 588, height: 388, rx: 26, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 2 });
      mk(g, 'ellipse', { cx: 440, cy: 290, rx: 140, ry: 100, fill: '#D6E9F5', stroke: O2, 'stroke-width': 3 }); circ(g, 290, 150, 46, '#D7C3E6', '#7B4B94', 3); circ(g, 284, 146, 12, '#7B4B94', '#7B4B94', 1);
      [[560, 160], [250, 400]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 40, ry: 20, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 3 }));
      [[650, 140, 20], [690, 300, -30], [600, 410, 10]].forEach(([x, y, r]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 38, ry: 20, fill: MF, stroke: MS, 'stroke-width': 3, transform: `rotate(${r} ${x} ${y})` }));
      const gl = mk(g, 'g', {}); hex(gl, 230, 270, 16); arrow(gl, 230, 292, 230, 322, K.ink, 2.5); circ(gl, 218, 338, 9, '#F4C9B0', K.pro, 2); circ(gl, 242, 338, 9, '#F4C9B0', K.pro, 2);
      return { labs: [[lab(g, 650, 140, 800, 90, 'Mitochondrion'), ['Z2', 'mitochondria']], [lab(g, 720, 220, 800, 220, 'Cytoplasm'), ['Z2', 'cytoplasm']]], els: [[gl, ['Z2', 'Glycolysis', -0.1], { ...POP, sc: 0.5 }]] }; } },
    { at: 'Z3', focus: [640, 150, 50], build: g => { mito(g, 500, 290, 360, 170, 6); const kr = mk(g, 'g', {}); const ring = circ(kr, 450, 300, 50, 'none', K.ink, 3); attr(ring, 'stroke-dasharray', '10 8'); const dot = circ(kr, 500, 300, 9, C.ac, K.ink, 2); cap(kr, 450, 375, 'KREBS CYCLE', { fill: K.ink });
      return { labs: [[lab(g, 300, 136, 180, 70, 'Outer membrane'), ['Z3', 'Inside']], [lab(g, 760, 330, 880, 330, 'Matrix'), ['Z3', 'matrix']], [lab(g, 600, 440, 700, 500, 'Inner membrane'), ['Z3', 'jelly']]],
        els: [[kr, ['Z3', 'Krebs', -0.1], { ...POP, sc: 0.5 }]], anim: t => { const a = t * 1.6; attr(dot, 'cx', (450 + 50 * Math.cos(a)).toFixed(1)); attr(dot, 'cy', (300 + 50 * Math.sin(a)).toFixed(1)); } }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 320, width: 1056, height: 206, fill: ML }); mk(g, 'rect', { x: 0, y: 250, width: 1056, height: 70, fill: K.lip });
      for (let x = 8; x < 1056; x += 16) { circ(g, x, 256, 7, O2, K.ink, 1.2); circ(g, x, 314, 7, O2, K.ink, 1.2); }
      const cx = [200, 360, 520, 680]; cx.forEach((x, i) => { mk(g, 'ellipse', { cx: x, cy: 285, rx: 54, ry: 62, fill: '#F4C9B0', stroke: K.pro, 'stroke-width': 3.5 }); T(g, x, 294, ['I', 'II', 'III', 'IV'][i], 26, K.pro); });
      mk(g, 'rect', { x: 884, y: 230, width: 32, height: 130, rx: 8, fill: '#F4C9B0', stroke: K.pro, 'stroke-width': 3 }); circ(g, 900, 392, 38, '#F4C9B0', K.pro, 3.5);
      const nadh = pill(g, 0, 0, 'NADH', NAD, '#FFFFFF', 76, 32), el = dots(g, 3, K.zn, 8), ap = [0, 1, 2].map(() => pill(g, 0, 0, 'ATP', ATP, '#FFFFFF', 60, 28));
      const r1 = pill(g, 470, 470, 'NADH → 3 ATP', NAD, '#FFFFFF', 210, 40), r2 = pill(g, 700, 470, 'FADH2 → 2 ATP', FAD, '#FFFFFF', 210, 40);
      return { labs: [[lab(g, 90, 285, 60, 180, 'Inner membrane'), ['Z4', 'inner']], [lab(g, 440, 226, 440, 120, 'Electron transport system', 'middle'), ['Z4', 'electron']], [lab(g, 900, 300, 980, 160, 'ATP synthase', 'end'), ['Z4', 'ATP', 0.2]]],
        els: [[r1, ['Z4', 'Each', -0.1], POP], [r2, ['Z4', 'Each', -0.1, 1], POP]],
        anim: t => { const a = tm(['Z4', 'NADH']); const v = M.io((t - a) / 1.2); at(nadh, 60 + 140 * v, 440 - 90 * v); nadh.style.opacity = (t > a ? 1 - M.clamp((t - a - 1.3) / 0.3) : 0).toFixed(2);
          el.forEach((d, j) => { const u = ((t - a - 1) * 0.5 + j / 3) % 1, q = along([[200, 285], [360, 285], [520, 285], [680, 285], [900, 285]], u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a + 1 ? 1 : 0; });
          ap.forEach((p, j) => { const u = ((t - a - 1.5) * 0.4 + j / 3) % 1; at(p, 900 + 110 * u, 400 + 40 * u); p.style.opacity = t > a + 1.5 ? Math.min(1, 5 * u, 4 * (1 - u)).toFixed(2) : 0; }); } }; } }] }));

/* ---------- L: four assumptions ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'C1', keep: 1, cards: [
  { pos: 'L', label: 'THE COUNT WORKS ONLY IF...', svg: false, build: el => ({ anim: EP.steps(el, [['Runs in order', 'glycolysis, then Krebs cycle, then ETS'], ['Glycolysis NADH enters', 'it makes ATP inside the mitochondria'], ['Nothing leaves', 'no middle product builds anything else'], ['Only glucose', 'no other food enters halfway'], ['Net gain: 38 ATP', 'per glucose, a calculated figure']], LT) }) },
  { pos: 'R', label: 'ONE GLUCOSE · THE IDEAL PATHWAY', pill: ['A calculated figure', ['L6', 'calculated', -0.1], 'ac'], build: (el, s) => {
    const mo = mk(s, 'rect', { x: 268, y: 150, width: 484, height: 170, rx: 40, fill: ML, stroke: MS, 'stroke-width': 3, 'stroke-dasharray': '10 7' }); cap(s, 510, 176, 'MITOCHONDRION', { fill: MS });
    const bx = [[140, 'GLYCOLYSIS', K.sugL, K.sug], [395, 'KREBS CYCLE', MF, MS], [630, 'ETS', MF, MS]].map(([x, n, f, st]) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: x - 100, y: 200, width: 200, height: 60, rx: 12, fill: f, stroke: st, 'stroke-width': 3 }); T(g, x, 237, n, 19, K.ink, { 'font-family': 'IBM Plex Mono' }); return g; });
    const ar = mk(s, 'g', {}); arrow(ar, 240, 230, 292, 230, K.ink, 3); arrow(ar, 495, 230, 527, 230, K.ink, 3); const inl = mk(s, 'g', {}); hex(inl, 140, 110, 22); P(inl, 'M140,134 L140,198', 'none', K.ink, 3, { 'stroke-dasharray': '6 6' });
    const pd = dots(s, 4, K.sug, 6); const nadh = pill(s, 0, 0, 'NADH', NAD, '#FFFFFF', 76, 30);
    const vl = mk(s, 'g', {}); [140, 395, 630].forEach(x => { P(vl, `M${x},262 L${x},340`, 'none', K.ink, 3); circ(vl, x, 352, 13, '#FFFFFF', K.red, 3); P(vl, `M${x - 7},345 L${x + 7},359 M${x + 7},345 L${x - 7},359`, 'none', K.red, 3); }); cap(vl, 392, 392, 'NO EXIT: NOTHING LEAVES', { fill: K.red });
    const blk = mk(s, 'g', {}); mk(blk, 'ellipse', { cx: 52, cy: 104, rx: 22, ry: 16, fill: FAT, stroke: '#9A6B2F', 'stroke-width': 3 }); circ(blk, 236, 104, 18, '#F4C9B0', K.pro, 3); [52, 236].forEach(x => P(blk, `M${x - 16},${88} L${x + 16},${120} M${x + 16},${88} L${x - 16},${120}`, 'none', K.red, 4)); cap(blk, 52, 146, 'FAT', { 'font-size': 14 }); cap(blk, 236, 146, 'PROTEIN', { 'font-size': 14 });
    const cnt = mk(s, 'g', {}); const cv = T(cnt, 470, 460, '0', 64, ATP, { 'font-family': 'IBM Plex Mono', 'text-anchor': 'end' }); T(cnt, 486, 460, 'ATP', 34, K.ink, { 'text-anchor': 'start' }); const fly = [0, 1, 2].map(() => pill(s, 0, 0, 'ATP', ATP, '#FFFFFF', 56, 26));
    return { els: [...bx.map((g, i) => [g, ['L2', ['glycolysis', 'Krebs', 'electron'][i], -0.2], { ...POP, sc: 0.6 }]), [ar, ['L2', 'Krebs']], [inl, ['L2', 'glycolysis', -0.3], { dy: -10 }], [vl, ['L4', 'leaves', -0.2], { dy: 10 }], [blk, ['L5', 'No', -0.1], { ...POP, sc: 0.6 }], [cnt, ['L6', 'net', -0.2], { dy: 10 }]],
      anim: t => { const a = tm(['L2', 'order']); pd.forEach((d, j) => { const u = ((t - a) * 0.3 + j / 4) % 1, q = along([[140, 136], [140, 230], [395, 230], [630, 230]], u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });
        const b = tm(['L3', 'enters', -0.3]), u = ((t - b) * 0.4) % 1, q = along([[140, 280], [140, 300], [630, 300], [630, 280]], u); at(nadh, q[0], q[1]); nadh.style.opacity = t > b ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0;
        const c = tm(['L6', 'net']), n = Math.round(38 * M.io((t - c) / 2.4)); cv.textContent = t > c ? n : 0;
        fly.forEach((p, j) => { const w = ((t - c) * 0.6 + j / 3) % 1, r = along([[630, 262], [560, 420]], w); at(p, r[0], r[1]); p.style.opacity = t > c && t < c + 2.6 ? Math.min(1, 6 * w, 6 * (1 - w)).toFixed(2) : 0; }); } }; } }] });

/* ---------- C: fermentation vs aerobic ---------- */
const wheel = (g, x, y) => { const G = mk(g, 'g', {}); circ(G, 0, 0, 30, '#FFFFFF', K.ink, 3); [0, 1, 2].forEach(k => P(G, `M0,0 L${(26 * Math.cos(k * 2.094)).toFixed(1)},${(26 * Math.sin(k * 2.094)).toFixed(1)}`, 'none', NAD, 4)); at(G, x, y); return G; };
const fer = (aer) => (el, s) => {
  hex(s, 130, 170, 40); arrow(s, 188, 170, 268, 170, K.ink, 3.5); const r1 = mk(s, 'g', {});
  if (!aer) { P(r1, 'M380,135 L414,135 L414,205 L380,205 L362,170 Z', K.sugL, K.sug, 3); P(r1, 'M440,135 L474,135 L492,170 L474,205 L440,205 Z', K.sugL, K.sug, 3); cap(r1, 427, 250, 'PARTLY BROKEN', { fill: K.ink }); }
  else { for (let k = 0; k < 6; k++) { const x = 340 + (k % 3) * 70, y = 140 + Math.floor(k / 3) * 60; circ(r1, x, y, 15, '#D9DCE1', CO2, 3); circ(r1, x + 36, y + 22, 12, '#D6E9F5', O2, 3); } cap(r1, 430, 250, 'FULLY BROKEN: CO2 + H2O', { fill: K.ink }); }
  const r2 = mk(s, 'g', {}); cap(r2, 110, 330, 'NET ATP', { fill: C.mute, 'text-anchor': 'start' }); const n = aer ? 14 : 2; for (let k = 0; k < n; k++) pill(r2, 250 + (k % 7) * 66, 300 + Math.floor(k / 7) * 36, 'ATP', ATP, '#FFFFFF', 58, 28); if (!aer) T(r2, 420, 336, '2 per glucose', 26, K.ink, { 'text-anchor': 'start' });
  const r3 = mk(s, 'g', {}); cap(r3, 110, 440, 'NADH → NAD+', { fill: C.mute, 'text-anchor': 'start' }); const w = wheel(r3, 330, 432); T(r3, 380, 442, aer ? 'very fast' : 'slow', 26, K.ink, { 'text-anchor': 'start' });
  const ids = aer ? [['C2', 'Aerobic'], ['C3', 'Aerobic'], ['C4', 'aerobic']] : [['C2', 'Fermentation'], ['C3', 'Fermentation'], ['C4', 'fermentation']];
  return { els: [[r1, [...ids[0], 0.3], { dy: 10 }], [r2, [...ids[1], 0.2], { dy: 10 }], [r3, [...ids[2], 0.2], { dy: 10 }]], anim: t => { at(w, 330, 432, (t * (aer ? 400 : 40)) % 360); } }; };
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'FERMENTATION · NO OXYGEN', pill: ['Partial · net 2 ATP · slow', ['C4', 'slowly', -0.1]], build: fer(false) },
  { pos: 'R', label: 'AEROBIC RESPIRATION · WITH OXYGEN', tin: ['C2', 'Aerobic', -0.2], pill: ['Complete · many more ATP · fast', ['C4', 'fast', -0.1], 'ac'], build: fer(true) }] });

/* ---------- D: amphibolic pathway ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [{ pos: 'W', label: 'ONE PATHWAY · BREAKS DOWN AND BUILDS UP', pill: ['Amphibolic: breaks down and builds up', ['D6', 'amphibolic', -0.1], 'ac'], build: (el, s) => {
  const und = mk(s, 'g', {}), pd = dots(und, 5, K.sug, 7), fd = dots(und, 4, FAT, 7), qd = dots(und, 3, '#F4C9B0', 7), ud = dots(und, 3, C.ac, 7);
  const sp = [[170, 'Glucose', 170, K.sugL, K.sug], [420, 'PGAL', 140, K.sugL, K.sug], [660, 'Pyruvic acid', 190, '#F4C9B0', K.pro], [900, 'Acetyl CoA', 180, '#F4C9B0', K.pro]].map(([x, n, w, f, st]) => node(s, x, 300, n, w, f, st));
  const kr = mk(s, 'g', {}); circ(kr, 1150, 300, 52, MF, MS, 3.5); T(kr, 1150, 296, 'KREBS', 17, K.ink, { 'font-family': 'IBM Plex Mono' }); T(kr, 1150, 316, 'CYCLE', 17, K.ink, { 'font-family': 'IBM Plex Mono' });
  const out = node(s, 1400, 300, 'CO2 + H2O', 170, '#D9DCE1', CO2);
  const sa = mk(s, 'g', {}); [[255, 333], [490, 563], [755, 808], [990, 1096], [1204, 1313]].forEach(([a, b]) => arrow(sa, a, 300, b, 300, K.ink, 3));
  const fat = mk(s, 'g', {}); node(fat, 640, 110, 'Fats', 120, FAT, '#9A6B2F'); node(fat, 420, 196, 'Glycerol', 150, FAT, '#9A6B2F'); node(fat, 880, 196, 'Fatty acids', 170, FAT, '#9A6B2F'); arrow(fat, 600, 138, 470, 168, K.ink, 3); arrow(fat, 680, 138, 840, 168, K.ink, 3);
  const fa2 = mk(s, 'g', {}); arrow(fa2, 420, 224, 420, 268, K.ink, 3); arrow(fa2, 870, 224, 870, 268, K.ink, 3);
  const pro = mk(s, 'g', {}); node(pro, 480, 490, 'Proteins', 150, '#F4C9B0', K.pro); node(pro, 820, 490, 'Amino acids', 180, '#F4C9B0', K.pro); arrow(pro, 555, 490, 726, 490, K.ink, 3);
  const pa = mk(s, 'g', {}); arrow(pa, 760, 462, 680, 332, K.ink, 3); arrow(pa, 850, 462, 895, 332, K.ink, 3); arrow(pa, 900, 470, 1112, 340, K.ink, 3);
  const up = mk(s, 'g', {}); arrow(up, 940, 270, 940, 226, C.ac, 5); cap(up, 1010, 254, 'BUILD', { fill: C.ac, 'font-size': 18 });
  const lg = mk(s, 'g', {}); mk(lg, 'rect', { x: 1190, y: 82, width: 340, height: 44, rx: 10, fill: '#EEF0F3' }); T(lg, 1360, 111, 'BREAK DOWN · CATABOLISM', 17, K.ink, { 'font-family': 'IBM Plex Mono' });
  const lg2 = mk(s, 'g', {}); mk(lg2, 'rect', { x: 1190, y: 140, width: 340, height: 44, rx: 10, fill: C.ac }); T(lg2, 1360, 169, 'BUILD UP · ANABOLISM', 17, '#FFFFFF', { 'font-family': 'IBM Plex Mono' });
  const mv = (ds, path, a, sp2, t) => ds.forEach((d, j) => { const u = ((t - a) * sp2 + j / ds.length) % 1, q = along(path(j), u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });
  return { els: [...sp.map((g, i) => [g, ['D2', 'Glucose', -0.2 + i * 0.12], { ...POP, sc: 0.6 }]), [kr, ['D2', 'Glucose', 0.3], { ...POP, sc: 0.6 }], [out, ['D2', 'Glucose', 0.42], { ...POP, sc: 0.6 }], [sa, ['D2', 'favourite']],
    [fat, ['D3', 'Fats', -0.1], { dy: -12 }], [fa2, ['D3', 'become', -0.1]], [pro, ['D4', 'Proteins', -0.1], { dy: 12 }], [pa, ['D4', 'enters', -0.1]], [lg, ['D5', 'catabolism', -0.1], { dx: 16, dy: 0 }], [lg2, ['D5', 'anabolism', -0.1], { dx: 16, dy: 0 }], [up, ['D5', 'pulls', -0.1], { ...POP, sc: 0.5 }]],
    anim: t => { mv(pd, () => [[170, 300], [1400, 300]], tm(['D2', 'favourite']), 0.18, t); mv(fd, j => j % 2 ? [[640, 130], [880, 196], [870, 300]] : [[640, 130], [420, 196], [420, 300]], tm(['D3', 'become']), 0.35, t);
      mv(qd, j => [[480, 490], [820, 490], [[680, 300], [900, 300], [1150, 300]][j]], tm(['D4', 'enters']), 0.35, t); mv(ud, () => [[940, 280], [940, 196]], tm(['D5', 'pulls']), 0.7, t); } }; } }] });

/* ---------- U: respiratory quotient + think ---------- */
const TH = { q: 'A seed burns mostly fat. Is its RQ more than 1, or less than 1?', opts: ['More than 1', 'Less than 1'], right: 1, why: 'Less than 1. Fats hold little oxygen, so they need more O2 for each CO2.' };
const RQ = [['U3', 6, 6, '1.0', 'GLUCOSE'], ['U4', 102, 145, '0.7', 'TRIPALMITIN (FAT)'], ['U5', 9, 10, '0.9', 'PROTEIN']]; // [line, CO2 out, O2 in]
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'RESPIRATORY QUOTIENT (RQ)', svg: false, tout: 'U6', build: el => {
    const f = div(el, '', { position: 'absolute', left: '36px', top: '84px', width: '712px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', font: '700 44px Poppins' });
    f.innerHTML = `<span>RQ =</span><span style="display:inline-flex;flex-direction:column;align-items:center;font:600 26px Poppins"><span style="padding:0 10px 8px">volume of CO<sub>2</sub> evolved</span><span style="border-top:3px solid #16213E;padding:8px 10px 0">volume of O<sub>2</sub> consumed</span></span>`;
    const rows = [['Carbohydrate', '6 CO<sub>2</sub> ÷ 6 O<sub>2</sub>', '1.0'], ['Fat (tripalmitin)', '102 CO<sub>2</sub> ÷ 145 O<sub>2</sub>', '0.7'], ['Protein', 'about', '0.9']].map(([n, d, v], i) => div(el, 'rw', { top: 238 + i * 100 + 'px' }, `<div class="rn">${n}</div><div class="rd">${d}</div><div class="rk" style="font-size:24px;color:var(--ac)">RQ ${v}</div>`));
    return { els: [[f, ['U2', 'respiratory', -0.1], { dy: 10 }], ...rows.map((r, i) => [r, [RQ[i][0], null, -0.1], { dx: -16, dy: 0 }])] }; } },
  { pos: 'R', label: 'THE GAS TRADE', tin: ['U3', null, -0.2], tout: 'U6', build: (el, s) => {
    const eq = div(el, '', { position: 'absolute', left: '36px', top: '84px', width: '712px', textAlign: 'center', font: "600 25px 'IBM Plex Mono'", color: C.ink, whiteSpace: 'nowrap' });
    const EQ = ['C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O', '2(C<sub>51</sub>H<sub>98</sub>O<sub>6</sub>) + 145O<sub>2</sub> → 102CO<sub>2</sub> + 98H<sub>2</sub>O', 'proteins: a little less CO<sub>2</sub> than O<sub>2</sub>'];
    P(s, 'M80,470 L560,470', 'none', K.ink, 3); const bo = mk(s, 'rect', { x: 130, y: 210, width: 130, height: 260, rx: 8, fill: '#D6E9F5', stroke: O2, 'stroke-width': 3 }), bc = mk(s, 'rect', { x: 360, y: 210, width: 130, height: 260, rx: 8, fill: '#D9DCE1', stroke: CO2, 'stroke-width': 3 });
    cap(s, 195, 505, 'O2 TAKEN IN', { fill: O2 }); cap(s, 425, 505, 'CO2 GIVEN OUT', { fill: CO2 }); const nO = T(s, 195, 200, '', 26, O2, { 'font-family': 'IBM Plex Mono' }), nC = T(s, 425, 200, '', 26, CO2, { 'font-family': 'IBM Plex Mono' });
    const nm = cap(s, 650, 250, '', { fill: C.mute }); T(s, 650, 320, 'RQ', 30, K.ink); const rv = T(s, 650, 390, '', 64, C.ac, { 'font-family': 'IBM Plex Mono' });
    return { anim: t => { let k = 0; RQ.forEach(([id], i) => { if (t >= tm([id, null, -0.1])) k = i; }); const [id, c2, o, v, n] = RQ[k]; eq.innerHTML = EQ[k];
      const e = M.io((t - tm([id, null, 0.2])) / 0.8), ho = 250, hcc = 250 * c2 / o;
      attr(bo, 'y', 470 - ho); attr(bo, 'height', ho); const h2 = 250 + (hcc - 250) * e; attr(bc, 'y', (470 - h2).toFixed(1)); attr(bc, 'height', h2.toFixed(1));
      nO.textContent = k === 2 ? '' : o; nC.textContent = k === 2 ? '' : c2; attr(nO, 'y', 470 - ho - 14); attr(nC, 'y', (470 - h2 - 14).toFixed(1)); nm.textContent = n; rv.textContent = v; } }; } },
  EP.think(TH, { tin: 'U6', opts: ['U6', 'more', -0.1], why: ['U7', 'Fats'] })] });

/* ---------- W: count the 38 ATP ---------- */
const pr = (s, x, y, n, lb, f, dx = 64) => { for (let k = 0; k < n; k++) pill(s, x + k * dx, y, lb, f, '#FFFFFF', lb.length > 3 ? 70 : 56, 26); };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · COUNT THE ATP FROM ONE GLUCOSE', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · GLYCOLYSIS', '2 ATP + 2 NADH', '2 + (2 × 3) = 8 ATP', s => { hex(s, 80, 145, 34); arrow(s, 126, 145, 176, 145, K.ink, 3); pr(s, 230, 100, 2, 'ATP', ATP); pr(s, 236, 180, 2, 'NADH', NAD, 80); T(s, 420, 106, '= 2', 24, K.ink); T(s, 420, 186, '× 3 = 6', 22, K.ink); }, ['W2', 'Glycolysis', -0.2], ['W2', 'gives'], ['W2', 'eight']],
  ['STEP 2 · LINK STEP', '2 NADH', '2 × 3 = 6 ATP', s => { circ(s, 70, 145, 22, '#F4C9B0', K.pro, 3); T(s, 70, 200, 'Pyruvic acid', 16, K.pro); arrow(s, 100, 145, 170, 145, K.ink, 3); node(s, 250, 145, 'Acetyl CoA', 150, '#F4C9B0', K.pro, K.ink, 18); pr(s, 380, 110, 1, 'NADH', NAD); pr(s, 380, 180, 1, 'NADH', NAD); }, ['W3', 'link', -0.2], ['W3', 'gives'], ['W3', 'six']],
  ['STEP 3 · KREBS CYCLE × 2', '2 ATP + 6 NADH + 2 FADH2', '2 + 18 + 4 = 24 · TOTAL 8 + 6 + 24 = 38', s => { const r = circ(s, 100, 145, 56, MF, MS, 3.5); T(s, 100, 152, '× 2', 24, K.ink); pr(s, 220, 70, 2, 'ATP', ATP); pr(s, 220, 130, 3, 'NADH', NAD, 80); pr(s, 220, 170, 3, 'NADH', NAD, 80); pr(s, 220, 230, 2, 'FADH2', FAD, 80); }, ['W4', 'Krebs', -0.2], ['W4', 'Two'], ['W4', 'Eight']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['bowl', 'A bowl of rice', 'CARBOHYDRATE', ['H1', 'bowl']], ['drop', 'A spoon of ghee', 'FAT', ['H1', 'spoon']], ['pot', 'A cup of dal', 'PROTEIN', ['H1', 'cup']]],
  scenes: S,
  stmt: { l2: 'RQ = CO₂ <span class="acc">out</span> ÷ O₂ in', f: '<span class="lad">glucose <b>1.0</b> · tripalmitin <b>0.7</b> · protein <b>0.9</b></span>', t2: ['T1', 'RQ', -0.2], tf: ['T1', 'divided'] },
  trap: { wrong: 'Every cell always makes exactly 38 ATP', right: '38 is theoretical: true only if all 4 assumptions hold', tWrong: ['X2', 'every', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'theoretical', -0.2], tSvg: ['X3', 'holds', -0.4],
    build: s => { T(s, 210, 150, '38', 84, ATP, { 'font-family': 'IBM Plex Mono' }); T(s, 300, 150, '?', 84, K.red); cap(s, 230, 210, 'ONLY IN THEORY', { 'font-size': 15 }); } },
  where: { type: 'Statement and match questions: the ATP count, the amphibolic pathway, RQ values', at: ['E1', 'statement'] },
  mcq: { q: 'Match each respiratory substrate with its RQ.<div class="mt"><div><span class="h">SUBSTRATE</span><br><b>P.</b>Carbohydrate<br><b>Q.</b>Tripalmitin (fat)<br><b>R.</b>Protein</div><div><span class="h">RQ</span><br><b style="width:58px">i.</b>0.7<br><b style="width:58px">ii.</b>1.0<br><b style="width:58px">iii.</b>0.9</div></div>', opts: ['P-i, Q-ii, R-iii', 'P-ii, Q-i, R-iii', 'P-iii, Q-i, R-ii', 'P-ii, Q-iii, R-i'], right: 1 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['Glucose: 6 ÷ 6 = 1.0', ['A2', 'Glucose']], ['Tripalmitin: 102 ÷ 145 ≈ 0.7', ['A3', 'Tripalmitin']], ['Protein: about 0.9', ['A3', 'Proteins']]],
  recap: { title: 'Recap · balance sheet and RQ', lines: ['<b>Balance sheet</b>: one glucose → net 38 ATP, a calculated figure', '<b>Assumes</b>: in order · NADH enters · nothing leaves · glucose only', '<b>Fermentation</b>: partial breakdown · net 2 ATP · NADH oxidised slowly', '<b>Amphibolic</b>: one pathway breaks down and builds up', '<b>RQ</b> = CO<sub>2</sub> out ÷ O<sub>2</sub> in · carbs 1.0 · fats 0.7 · proteins 0.9'] },
  yq: ['What are the four assumptions of the balance sheet?', 'Why is respiration called amphibolic?', 'What is the RQ of a fat?'],
  next: { label: 'NEXT · EP 91', topic: 'Plant Growth: Phases, Rates and Conditions' }
});
})();
