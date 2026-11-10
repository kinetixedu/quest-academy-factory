// PUC Biology Ep 86: Factors Affecting Photosynthesis (Living diagram, leaf green). Runner: ep.js + bio9.js + cell8.js + bio11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, circ, T, at, arrow, axes } = B9;
const { K } = B11, B = B11;
const ICN = { drop: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z'], therm: ['M10 14V4a2 2 0 1 1 4 0v10a4 4 0 1 1-4 0Z', 'M12 9v7'], sun: ['M12 8a4 4 0 1 0 .1 0', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'], bub: ['M8 16a3 3 0 1 0 .1 0', 'M15 9a2 2 0 1 0 .1 0', 'M11 5a1.5 1.5 0 1 0 .1 0'] };
const S = [];
const curve = (map, f, u0 = 0, u1 = 1) => { let d = ''; for (let i = 0; i <= 60; i++) { const u = u0 + (u1 - u0) * i / 60, [x, y] = map(u, f(u)); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const pot = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x - 50 * s},${y} L${x + 50 * s},${y} L${x + 38 * s},${y + 70 * s} L${x - 38 * s},${y + 70 * s} Z`, '#C8553D', K.ink, 3); P(G, `M${x},${y} C${x - 6 * s},${y - 80 * s} ${x + 6 * s},${y - 140 * s} ${x},${y - 200 * s}`, 'none', K.chlD, 5);
  const lv = [[-1, 40, 1.1, 20], [1, 70, 1, -15], [-1, 110, 0.85, 35], [1, 140, 0.8, -40], [-1, 175, 0.6, 55]].map(([sd, h, sc, rot]) => { const lx = x + sd * 52 * s * sc, ly = y - h * s; return mk(G, 'ellipse', { cx: lx, cy: ly, rx: 54 * s * sc, ry: 20 * s * sc, fill: K.leaf, stroke: K.chlD, 'stroke-width': 2.5, transform: `rotate(${rot} ${lx} ${ly})` }); }); G.lv = lv; return G; };
const thermo = (g, x, y, h, lvl, c) => { mk(g, 'rect', { x: x - 14, y: y - h, width: 28, height: h, rx: 14, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); circ(g, x, y + 10, 24, c, K.ink, 3); return mk(g, 'rect', { x: x - 7, y: y - h * lvl, width: 14, height: h * lvl, rx: 7, fill: c }); };

/* ---------- H: bubbles under a lamp ---------- */
S.push(EP.hook({ label: 'DIYA AT HOME · A LAMP AND A WATER PLANT', face: 'diya', pill: ['More light, then no more speed', ['H2', 'Closer', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Why does it stop speeding up?', ['H3', 'asked']], ['What is holding it back now?', ['H3', 'holding', -0.4]]],
  a: [['ANSWER 1', 'Many factors act at once', ['H4', 'many']], ['ANSWER 2', 'The one in shortest supply', ['H4', 'shortest']]],
  chips: [['Internal factors', ['H5', 'internal']], ["Blackman's law", ['H5', 'Blackman']], ['Light and CO₂', ['H5', 'light']], ['Temperature, water', ['H5', 'temperature']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 440, width: 784, height: 140, fill: '#9E7B55' });
    P(s, 'M150,160 L150,440 Q150,452 162,452 L338,452 Q350,452 350,440 L350,160', '#E6F2F8', K.ink, 4); mk(s, 'rect', { x: 153, y: 200, width: 194, height: 249, fill: '#CFE6F2' }); B.sprig(s, 250, 440, 1);
    const lp = mk(s, 'g', {}); B.lamp(lp, 0, 0, 1.2); const glow = circ(lp, 0, 22, 60, '#FBE3A0', 'none', 0); glow.style.opacity = 0.35; lp.insertBefore(glow, lp.firstChild);
    const bb = Array.from({ length: 14 }, () => circ(s, 0, 0, 6, '#FFFFFF', K.o2, 2)); cap(s, 250, 140, 'BUBBLES OF OXYGEN', { fill: K.o2 });
    return { anim: t => { const a = tm(['H1', 'Bring']), d = M.io((t - a) / 2.5), e = M.io((t - tm(['H2', 'Closer'])) / 1.5); const lx = 640 - 160 * d - 60 * e; at(lp, lx, 230);
      const rate = 0.25 + 0.75 * d; bb.forEach((b, k) => { const on = k < 4 + 10 * rate; const u = ((t * (0.35 + 0.25 * rate)) + k / 14) % 1; attr(b, 'cx', 220 + (k * 23) % 60); attr(b, 'cy', (420 - 220 * u).toFixed(1)); b.style.opacity = on && t > tm(['H1', 'Tiny']) ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); } };
  } }));

/* ---------- B: internal and external ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'TWO KINDS OF FACTORS', build: (el, s) => {
  const pl = pot(s, 800, 370, 1.1);
  const ib = div(el, 'chp', { left: '60px', top: '140px', height: '64px', fontSize: '30px', background: C.ink, color: '#fff' }, 'INTERNAL · inside the plant'), il = div(el, 'pillp', { left: '60px', top: '226px' }, 'leaves, cells, chlorophyll');
  const eb = div(el, 'chp', { left: '1080px', top: '110px', height: '64px', fontSize: '30px', background: C.ac, color: '#fff' }, 'EXTERNAL · from outside');
  const tiles = [['sun', 'Sunlight', 'sunlight'], ['therm', 'Temperature', 'temperature'], ['bub', 'Carbon dioxide', 'carbon'], ['drop', 'Water', 'water']].map(([ic, n, w], i) => [div(el, 'chp', { left: '1080px', top: 196 + i * 72 + 'px', height: '60px', fontSize: '26px', width: '420px' }, `${M.icon(ic, 26, C.ac, 2.2)}<span>${n}</span>`), w]);
  const a1 = arrow(s, 560, 250, 700, 300, K.ink, 3), a2 = arrow(s, 1060, 300, 920, 330, K.ink, 3);
  return { els: [[pl, 'B1', { ...POP, sc: 0.8 }], [ib, ['B2', 'inside', -0.1], { dx: -16, dy: 0 }], [il, ['B2', 'internal', -0.1]], [a1, ['B2', 'internal'], { dy: 0, fade: 0.3 }], [eb, ['B3', 'outside', -0.1], { dx: 16, dy: 0 }], [a2, ['B3', 'external'], { dy: 0, fade: 0.3 }],
    ...tiles.map(([e, w]) => [e, ['B3', w === 'sunlight' ? 'Sunlight' : w, -0.15], { dx: 16, dy: 0 }])] }; } }] });

/* ---------- Z: zoom ladder ---------- */
const chloro = (g, cx, cy, s) => { mk(g, 'ellipse', { cx, cy, rx: 230 * s, ry: 120 * s, fill: '#DCEFD6', stroke: K.chlD, 'stroke-width': 5 }); mk(g, 'ellipse', { cx, cy, rx: 214 * s, ry: 104 * s, fill: '#EEF7E9', stroke: K.chl, 'stroke-width': 3 });
  [[-140, -20], [-70, 30], [0, -30], [70, 25], [140, -15]].forEach(([dx, dy]) => { for (let k = 0; k < 5; k++) mk(g, 'rect', { x: cx + (dx - 26) * s, y: cy + (dy - 30 + k * 13) * s, width: 52 * s, height: 11 * s, rx: 5 * s, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2 }); }); };
S.push(EP.zoom({ to: 'L1', names: ['PLANT', 'LEAF', 'CHLOROPLAST'], scales: ['x1', 'x100', 'x2,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The plant', 'Number, size, age and angle of its leaves.', 'Internal factors.'], ['RUNG 2 OF 3', 'One leaf', 'Mesophyll cells and chloroplasts.', 'And the CO₂ inside the leaf.'], ['RUNG 3 OF 3', 'Chloroplast', 'The amount of chlorophyll.', 'Set by genes and growth.']],
  av: { who: 'Diya', text: 'All of these are inside!', tin: ['Z4', 'grows', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [600, 260, 70], build: g => { const pl = pot(g, 528, 380, 1.45);
      return { labs: [[lab(g, 440, 322, 230, 150, 'Leaf number', 'end'), ['Z2', 'number']], [lab(g, 610, 280, 820, 140, 'Leaf size'), ['Z2', 'size']], [lab(g, 455, 220, 230, 300, 'Young leaf', 'end'), ['Z2', 'age']], [lab(g, 615, 180, 820, 230, 'Leaf angle'), ['Z2', 'angle']]] }; } },
    { at: 'Z3', focus: [520, 230, 60], build: g => { B.leafX(g, 528, 263, 940, 300, false, { bundles: [300, 760], R: 60 });
      return { labs: [[lab(g, 520, 230, 600, 90, 'Mesophyll cells'), ['Z3', 'mesophyll']], [lab(g, 512, 225, 380, 90, 'Chloroplasts', 'end'), ['Z3', 'chloroplasts']], [lab(g, 640, 300, 760, 470, 'CO₂ in air spaces'), ['Z3', 'carbon']]] }; } },
    { at: 'Z4', build: g => { chloro(g, 528, 280, 1.5); return { labs: [[lab(g, 528 - 105, 280 - 30, 340, 90, 'Grana · chlorophyll', 'end'), ['Z4', 'chlorophyll']], [lab(g, 528 + 210, 300, 820, 470, 'Chloroplast'), ['Z4', 'chloroplast']]] }; } }] }));

/* ---------- L: light goes up ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'MORE AND MORE LIGHT · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Dim light: rate rises', 'light is the limiting factor'], ['Light saturation', 'at about 10% of full sunlight'], ['More light: no change', 'now CO₂ is limiting'], ['Add more CO₂', 'the curve climbs higher'], ['Too much light', 'chlorophyll breaks down · rate falls']], LT) }) },
  { pos: 'R', label: 'RATE OF PHOTOSYNTHESIS vs LIGHT', ghost: 'SHAPE ONLY', build: (el, s) => {
    const map = B.graph(s, 110, 450, 610, 330, 'LIGHT INTENSITY', 'RATE');
    const fl = u => 0.42 * Math.tanh(u / 0.1), fh = u => 0.8 * Math.tanh(u / 0.2), fd = u => fh(u) - Math.max(0, u - 0.78) * 1.6;
    const lo = P(s, curve(map, fl), 'none', K.ink, 5), hi = P(s, curve(map, fh, 0, 0.78), 'none', C.ac, 5), dn = P(s, curve(map, fd, 0.78, 1), 'none', K.red, 5, { 'stroke-dasharray': '12 8' });
    const sx = map(0.26, 0)[0]; const sat = mk(s, 'g', {}); P(sat, `M${sx},450 L${sx},${map(0, 0.42)[1] - 20}`, 'none', K.sug, 3, { 'stroke-dasharray': '8 6' }); B.cap(sat, sx, map(0, 0.42)[1] - 30, 'SATURATION', K.sug, 15);
    const z1 = B.cap(s, map(0.17, 0)[0], 428, 'LIGHT LIMITS', K.ink, 14), z2 = B.cap(s, map(0.6, 0)[0], map(0, 0.42)[1] + 34, 'CO₂ LIMITS', K.ink, 14);
    const lh = B.cap(s, map(0.5, 0)[0], map(0, 0.8)[1] - 16, 'MORE CO₂', C.ac, 15);
    const dot = circ(s, 0, 0, 11, '#FFFFFF', K.ink, 3);
    return { els: [[lo, ['L1', null, 0.3], { dy: 0, fade: 0.4 }], [sat, ['L3', 'saturation', -0.1], { dy: 0, fade: 0.3 }], [z1, ['L2', 'limiting', -0.2], { dy: 0, fade: 0.3 }], [z2, ['L4', 'carbon', -0.2], { dy: 0, fade: 0.3 }], [hi, ['L5', 'carbon', -0.2], { dy: 0, fade: 0.5 }], [lh, ['L5', 'climbs', -0.2], { dy: 0, fade: 0.3 }], [dn, ['L6', 'break', -0.2], { dy: 0, fade: 0.4 }]],
      anim: t => { const ts = LT.map(tm); let u, f; if (t < ts[3]) { u = M.clamp((t - ts[0] + 0.3) / (ts[3] - ts[0] - 0.4)) * 0.75; f = fl; } else if (t < ts[4]) { u = 0.75 * M.io((t - ts[3]) / 2); f = fh; } else { u = 0.75 + 0.25 * M.io((t - ts[4] - 0.4) / 2); f = fd; }
        const [x, y] = map(u, f(u)); attr(dot, 'cx', x.toFixed(1)); attr(dot, 'cy', y.toFixed(1)); dot.style.opacity = t > ts[0] - 0.4 ? 1 : 0; } }; } }] });

/* ---------- C: Blackman's law ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: "BLACKMAN'S LAW OF LIMITING FACTORS · 1905", build: (el, s) => {
  const qt = div(el, '', { position: 'absolute', left: '60px', top: '120px', width: '700px', font: '600 34px/1.4 Poppins', color: C.ink }, 'If a process is affected by many factors, its rate is set by the factor <span style="color:var(--ac)">nearest to its minimum value</span>.');
  const pl = div(el, 'pillp', { left: '60px', top: '380px' }, 'Change that factor, and the rate changes');
  const names = ['LIGHT', 'CO₂', 'TEMP', 'WATER'], cols = [K.sug, K.co2, K.red, K.o2], base = 470, H = 300;
  const bars = names.map((n, i) => { const x = 900 + i * 150; mk(s, 'rect', { x: x - 40, y: base - H, width: 80, height: H, rx: 10, fill: '#F3F4F6', stroke: '#CBD0DA', 'stroke-width': 2 }); B.cap(s, x, base + 30, n, K.ink, 16); return mk(s, 'rect', { x: x - 40, y: base, width: 80, height: 0, rx: 10, fill: cols[i] }); });
  const rl = P(s, '', 'none', C.ac, 5, { 'stroke-dasharray': '14 8' }), rt = B.cap(s, 1520, 0, 'RATE', C.ac, 16, 'start');
  const ice = mk(s, 'g', {}); B.cap(ice, 1200, 120, 'A VERY COLD DAY', K.el, 16);
  return { els: [[qt, ['C2', 'If', -0.1], { dy: 10 }], [pl, ['C2', 'Change', -0.1]], [ice, ['C3', 'cold', -0.2], { dy: 0, fade: 0.3 }]],
    anim: t => { const a = tm(['C2', 'factors']), c = tm(['C3', 'cold']), w = tm(['C3', 'Warm']); const lv = [0.85, 0.8, 0.9 - 0.75 * M.io((t - c) / 0.8) + 0.65 * M.io((t - w) / 1), 0.75];
      bars.forEach((b, i) => { const h = H * lv[i] * M.io((t - a - i * 0.15) / 0.7); attr(b, 'y', (base - h).toFixed(1)); attr(b, 'height', h.toFixed(1)); });
      const m = Math.min(...lv) * H * M.io((t - a - 0.8) / 0.7), y = base - m; attr(rl, 'd', m > 1 ? `M840,${y.toFixed(1)} L1500,${y.toFixed(1)}` : ''); attr(rt, 'y', (y + 6).toFixed(1)); rt.style.opacity = m > 1 ? 1 : 0; } }; } }] });

/* ---------- D: carbon dioxide ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'CO₂ IN THE AIR · THE MAJOR LIMITING FACTOR', build: (el, s) => {
    const x0 = 80, x1 = 704, sx = v => x0 + (x1 - x0) * v / 0.07; const bg = div(el, '', { position: 'absolute', left: '80px', top: '84px', font: "600 64px 'IBM Plex Mono'", color: K.co2, whiteSpace: 'nowrap' }, '0.03-0.04%<span style="font-size:22px;letter-spacing:.08em;margin-left:16px">CO₂ IN AIR</span>'); mk(s, 'rect', { x: x0, y: 240, width: x1 - x0, height: 40, rx: 20, fill: '#F3F4F6', stroke: '#CBD0DA', 'stroke-width': 2 });
    const air = mk(s, 'rect', { x: sx(0.03), y: 240, width: sx(0.04) - sx(0.03), height: 40, fill: K.co2 }), up = mk(s, 'rect', { x: sx(0.04), y: 240, width: sx(0.05) - sx(0.04), height: 40, fill: C.ac }), bad = mk(s, 'rect', { x: sx(0.05), y: 240, width: x1 - 20 - sx(0.05), height: 40, fill: '#F6D3D9' });
    [0, 0.03, 0.04, 0.05].forEach(v => B.cap(s, sx(v), 316, v + '%', K.ink, 18));
    const l1 = mk(s, 'g', {}); B.cap(l1, sx(0.035), 214, 'AIR TODAY', K.co2, 18); const l2 = mk(s, 'g', {}); B.cap(l2, sx(0.045), 380, 'RAISE TO 0.05%: FASTER', C.ac, 18); const l3 = mk(s, 'g', {}); B.cap(l3, sx(0.045), 430, 'MORE, FOR LONG: HARMFUL', K.red, 18);
    return { els: [[bg, ['D2', 'zero', -0.2], { dy: 10 }], [air, ['D2', 'zero', -0.2], { dy: 0, fade: 0.3 }], [l1, ['D2', 'zero', -0.2], { dy: 0, fade: 0.3 }], [up, ['D2', 'Raising', -0.1], { dy: 0, fade: 0.3 }], [l2, ['D2', 'Raising', -0.1], { dy: 0, fade: 0.3 }], [bad, ['D2', 'More', -0.1], { dy: 0, fade: 0.3 }], [l3, ['D2', 'harm', -0.2], { dy: 0, fade: 0.3 }]] }; } },
  { pos: 'R', label: 'C3 AND C4 PLANTS vs MORE CO₂', ghost: 'SHAPE ONLY', tin: ['D3', null, -0.2], pill: ['Greenhouse tomatoes, bell peppers: extra CO₂', ['D3', 'greenhouse', -0.1], 'ac'], build: (el, s) => {
    const map = B.graph(s, 110, 420, 620, 300, 'CO₂ CONCENTRATION (µL/L)', 'RATE'); const X = v => map(v / 700, 0)[0];
    const f4 = v => 0.55 * Math.min(1, Math.tanh(v / 140) / Math.tanh(360 / 140)), f3 = v => 0.85 * Math.tanh(v / 330);
    const c4 = P(s, curve((u, w) => map(u, w), u => f4(u * 700)), 'none', C.ac, 5), c3 = P(s, curve((u, w) => map(u, w), u => f3(u * 700)), 'none', K.ink, 5);
    const m4 = mk(s, 'g', {}); P(m4, `M${X(360)},420 L${X(360)},${map(0, 0.55)[1]}`, 'none', C.ac, 2.5, { 'stroke-dasharray': '6 6' }); B.cap(m4, X(360) - 26, 408, '360', C.ac, 15); B.cap(m4, X(140), map(0, 0.55)[1] - 14, 'C4', C.ac, 18);
    const m3 = mk(s, 'g', {}); P(m3, `M${X(450)},420 L${X(450)},${map(0, f3(450))[1]}`, 'none', K.ink, 2.5, { 'stroke-dasharray': '6 6' }); B.cap(m3, X(450) + 26, 408, '450', K.ink, 15); B.cap(m3, X(640), map(0, f3(640))[1] - 16, 'C3', K.ink, 18);
    return { els: [[c4, ['D3', 'C4', -0.1], { dy: 0, fade: 0.4 }], [m4, ['D3', 'three', -0.1], { dy: 0, fade: 0.3 }], [c3, ['D3', 'C3', -0.1], { dy: 0, fade: 0.4 }], [m3, ['D3', 'beyond', -0.1], { dy: 0, fade: 0.3 }]] }; } }] });

/* ---------- U: temperature, water + think ---------- */
const TH = { q: 'Bright light, warmth and water, but very little CO₂. Will more light speed it up?', opts: ['Yes', 'No'], right: 1, why: 'No. CO₂ is the limiting factor. Only more CO₂ raises the rate.' };
const stoma = (g, x, y, open, sc = 1) => { const G = mk(g, 'g', {}); const o = open ? 12 : 2; mk(G, 'ellipse', { cx: x - 14 * sc, cy: y, rx: 16 * sc, ry: 34 * sc, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2.5 }); mk(G, 'ellipse', { cx: x + 14 * sc, cy: y, rx: 16 * sc, ry: 34 * sc, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2.5 }); mk(G, 'ellipse', { cx: x, cy: y, rx: o * sc, ry: 26 * sc, fill: open ? '#FFFFFF' : K.chlD, stroke: 'none' }); return G; };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'TEMPERATURE · THE DARK REACTION USES ENZYMES', tout: 'U4', build: (el, s) => {
    const map = B.graph(s, 110, 430, 600, 280, 'TEMPERATURE', 'RATE'); const bell = (c, w, h) => u => h * Math.exp(-Math.pow((u - c) / w, 2));
    const b3 = P(s, curve(map, bell(0.38, 0.2, 0.85)), 'none', K.ink, 5), b4 = P(s, curve(map, bell(0.62, 0.2, 0.85)), 'none', C.ac, 5);
    const l3 = B.cap(s, map(0.38, 0)[0], map(0, 0.85)[1] - 16, 'C3', K.ink, 18), l4 = B.cap(s, map(0.62, 0)[0], map(0, 0.85)[1] - 16, 'C4', C.ac, 18);
    const th = mk(s, 'g', {}); const lv = thermo(th, 690, 200, 100, 0.4, K.red);
    return { els: [[b3, ['U2', 'temperature', -0.1], { dy: 0, fade: 0.4 }], [l3, ['U2', 'C3', -0.2], POP], [b4, ['U2', 'C4', -0.2], { dy: 0, fade: 0.4 }], [l4, ['U2', 'C4', -0.2], POP], [th, ['U2', 'temperature', -0.2], { dy: 10 }]],
      anim: t => { const h = 0.4 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.5)); attr(lv, 'y', (200 - 100 * h).toFixed(1)); attr(lv, 'height', (100 * h).toFixed(1)); } }; } },
  { pos: 'R', label: 'WATER · IT ACTS THROUGH THE PLANT', tin: ['U3', null, -0.2], tout: 'U4', pill: ['Stomata close · less CO₂ gets in', ['U3', 'close', -0.1], 'ac'], build: (el, s) => {
    const a = mk(s, 'g', {}); stoma(a, 200, 230, true, 1.6); B.cap(a, 200, 330, 'ENOUGH WATER', K.o2, 16); B.co2(a, 120, 150, 20); arrow(a, 140, 160, 186, 200, K.ink, 3);
    const b = mk(s, 'g', {}); stoma(b, 560, 230, false, 1.6); B.cap(b, 560, 330, 'WATER STRESS', K.red, 16); const cb = mk(b, 'g', {}); B.co2(cb, 480, 150, 20); P(cb, 'M462,132 L498,168 M498,132 L462,168', 'none', K.red, 4);
    const wl = mk(s, 'g', {}); P(wl, 'M470,410 C520,380 600,390 640,440 C590,430 520,440 470,410 Z', K.leaf, K.chlD, 3); B.cap(wl, 560, 470, 'WILTED LEAF · LESS AREA', K.ink, 14);
    return { els: [[a, ['U3', 'Water', -0.2], { dy: 10 }], [b, ['U3', 'short', -0.1], { dy: 10 }], [wl, ['U3', 'wilt', -0.2], { dy: 10 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Will', -0.1], why: ['U5', 'Carbon'] })] });

/* ---------- W: find the limiting factor ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · FIND THE LIMITING FACTOR', svg: false, build: el => EP.cols(el, [
  ['PLANT 1 · FOREST FLOOR', 'Limiting factor: light', 'WARM AND WET, BUT SHADY', s => { P(s, 'M0,0 L496,0 L496,90 C400,120 300,80 200,110 C120,130 60,100 0,120 Z', '#4E8A3A', K.ink, 3); [100, 380].forEach(x => P(s, `M${x},100 L${x},290`, 'none', '#8C6D4F', 16)); pot(s, 248, 220, 0.4); B.cap(s, 248, 160, 'SHADE', K.ink, 14); }, ['W2', 'Plant', -0.2], ['W2', 'light'], ['W2', 'light', 0.4]],
  ['PLANT 2 · GREENHOUSE TOMATO', 'Limiting factor: CO₂', 'SO GROWERS ADD CO₂', s => { P(s, 'M60,270 L60,130 L248,50 L436,130 L436,270 Z', '#EAF4F8', '#5AA0C8', 3); const pl = pot(s, 248, 210, 0.45); [[-22, 160], [20, 150], [5, 175]].forEach(([dx, y]) => circ(s, 248 + dx, y, 9, K.red, K.ink, 2)); circ(s, 430, 40, 24, '#FBE3A0', '#C9962B', 3); B.co2(s, 120, 190, 18); }, ['W3', 'Plant', -0.2], ['W3', 'carbon'], ['W3', 'growers']],
  ['PLANT 3 · FROSTY MORNING', 'Limiting factor: temperature', 'ITS ENZYMES ARE TOO COLD', s => { circ(s, 420, 50, 26, '#FBE3A0', '#C9962B', 3); pot(s, 248, 210, 0.45); for (let k = 0; k < 9; k++) { const x = 60 + (k * 53) % 380, y = 60 + (k * 37) % 150; P(s, `M${x - 8},${y} L${x + 8},${y} M${x},${y - 8} L${x},${y + 8} M${x - 6},${y - 6} L${x + 6},${y + 6} M${x + 6},${y - 6} L${x - 6},${y + 6}`, 'none', K.el, 2); } }, ['W4', 'Plant', -0.2], ['W4', 'temperature'], ['W4', 'enzymes']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['leaf', 'A water plant', 'IN A GLASS', ['H1', 'water']], ['bub', 'Tiny bubbles', 'OXYGEN RISES', ['H1', 'Tiny']], ['bulb', 'Lamp closer', 'MORE BUBBLES', ['H1', 'closer']]],
  scenes: S,
  stmt: { l2: 'The factor in <span class="acc">shortest supply</span> sets the speed.', f: '<span class="lad">light · CO₂ · temperature · water → <b>the lowest one sets the rate</b></span>', t2: ['T1', 'factor', -0.2], tf: ['T1', 'sets'] },
  trap: { wrong: 'More light always means more photosynthesis', right: 'After saturation, another factor limits the rate', tWrong: ['X2', 'light', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'another', -0.2], tSvg: ['X3', 'chlorophyll', -0.4],
    build: s => { const map = (u, v) => [60 + u * 360, 220 - v * 170]; axes(s, 60, 220, 360, 180, '', ''); P(s, curve(map, u => 0.7 * Math.tanh(u / 0.18)), 'none', K.ink, 4); P(s, curve(map, u => 0.7 * Math.tanh(u / 0.18) - Math.max(0, u - 0.75) * 1.4, 0.75, 1), 'none', K.red, 4, { 'stroke-dasharray': '10 6' }); cap(s, 240, 262, 'MORE LIGHT →', { 'font-size': 14 }); } },
  where: { type: "Statement questions: Blackman's law, light saturation, C3 and C4 response to CO₂", at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Light saturation occurs at about 10% of full sunlight.<br>II. C3 plants show CO₂ saturation at about 360 µL/L.<br>III. Water stress closes stomata and cuts CO₂ supply.<br>IV. The dark reaction is temperature controlled.</div>', opts: ['I and II only', 'II and III only', 'I, II and IV only', 'I, III and IV only'], right: 3 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['I: saturates at about 10% sunlight', ['A2', 'Light']], ['III: water stress closes stomata', ['A2', 'Water']], ['IV: enzymes feel temperature', ['A2', 'temperature']], ['II is wrong: 360 µL/L is for C4', ['A3', 'wrong']]],
  recap: { title: 'Recap · limiting factors', lines: ['<b>Limiting factor</b>: the one in shortest supply sets the speed', '<b>Blackman (1905)</b>: rate set by the factor nearest its minimum', '<b>Light</b>: saturates at about 10% of full sunlight', '<b>CO₂</b>: 0.03-0.04% in air · C4 saturate at 360, C3 beyond 450 µL/L', '<b>Temperature, water</b>: enzymes · stomata close under water stress'] },
  yq: ['What is a limiting factor?', 'At about what light level does saturation happen?', 'Why do greenhouse growers add CO₂?'],
  next: { label: 'NEXT · EP 87', topic: 'Do Plants Breathe and Glycolysis' }
});
})();
