// PUC Biology Ep 85: The C4 Pathway and Photorespiration (Living diagram, leaf green). Runner: ep.js + bio9.js + cell8.js + bio11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, circ, T, at, enz, arrow } = B9;
const { K } = B11, B = B11;
const ICN = { sun: ['M12 8a4 4 0 1 0 .1 0', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'], stalk: ['M12 22V3', 'M12 9c-3-1-5-3-6-6', 'M12 13c3-1 6-3 7-6', 'M12 17c-3-1-6-2-7-5'], therm: ['M10 14V4a2 2 0 1 1 4 0v10a4 4 0 1 1-4 0Z', 'M12 9v7'] };
const S = [];
const maize = (g, x, y, h, s = 1) => { const G = mk(g, 'g', {}); P(G, `M${x},${y} L${x},${y - h}`, 'none', '#4E8A3A', 6 * s);
  for (let k = 0; k < 5; k++) { const yy = y - 30 - k * (h - 50) / 5, sd = k % 2 ? 1 : -1; P(G, `M${x},${yy} C${x + sd * 40 * s},${yy - 30 * s} ${x + sd * 70 * s},${yy - 10 * s} ${x + sd * 90 * s},${yy + 20 * s}`, 'none', '#6DAA52', 7 * s); }
  P(G, `M${x},${y - h} l-6,-26 M${x},${y - h} l6,-24 M${x},${y - h} l0,-30`, 'none', '#C9962B', 3); mk(G, 'ellipse', { cx: x + 8, cy: y - h * 0.45, rx: 8 * s, ry: 22 * s, fill: '#E8C46A', stroke: '#9A7A2A', 'stroke-width': 2 }); return G; };
const ringCells = (g, cx, cy, rr, rc, n, sw = 5, chl = 6) => { for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
  circ(g, x, y, rc, '#CFE6C4', K.ink, sw); for (let q = 0; q < chl; q++) circ(g, x + rc * 0.45 * Math.cos(q * 6.28 / chl + a), y + rc * 0.45 * Math.sin(q * 6.28 / chl + a), rc * 0.13, K.chl, K.chlD, 1.2); } };
const bundle = (g, cx, cy, r) => { circ(g, cx, cy, r, '#F4EEDD', K.ink, 3); circ(g, cx - r * 0.3, cy - r * 0.22, r * 0.3, K.xyl, '#4A6A8A', 2.5); circ(g, cx + r * 0.32, cy - r * 0.22, r * 0.24, K.xyl, '#4A6A8A', 2.5); mk(g, 'ellipse', { cx, cy: cy + r * 0.42, rx: r * 0.52, ry: r * 0.25, fill: K.phl, stroke: '#8C6D4F', 'stroke-width': 2 }); };
const c4mol = (g, x, y, lbl, r = 14) => B.mol(g, x, y, 4, '#CFE6C4', K.chl, lbl, r);
const pep = (g, x, y, lbl, r = 14) => B.mol(g, x, y, 3, K.pepL, K.pep, lbl, r);

/* ---------- H: the maize field ---------- */
S.push(EP.hook({ label: 'THE BICYCLE ROAD · HOT AFTERNOON', face: 'aarav', pill: ['Hot sun, still growing', ['H1', 'Both', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Why more food in the heat?', ['H3', 'asked']], ['What goes wrong in the others?', ['H3', 'wrong', -0.6]]],
  a: [['ANSWER 1', 'C4 plants pump CO₂ inward', ['H4', 'pump']], ['ANSWER 2', 'Photorespiration is stopped', ['H4', 'photorespiration']]],
  chips: [['C4 pathway', ['H5', 'pathway']], ['Kranz anatomy', ['H5', 'Kranz']], ['Photorespiration', ['H5', 'photorespiration']], ['C3 vs C4', ['H5', 'differ']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#FDF3DA' }); mk(s, 'rect', { x: 0, y: 420, width: 784, height: 160, fill: '#C9B07A' }); mk(s, 'rect', { x: 0, y: 470, width: 784, height: 40, fill: '#8C8577' });
    const sun = mk(s, 'g', {}); circ(sun, 660, 150, 42, '#FBE3A0', '#C9962B', 4); const rays = mk(sun, 'g', {}); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; P(rays, `M${660 + 56 * Math.cos(a)},${150 + 56 * Math.sin(a)} L${660 + 76 * Math.cos(a)},${150 + 76 * Math.sin(a)}`, 'none', '#C9962B', 4); }
    const field = mk(s, 'g', {}); const pl = [70, 140, 210, 280, 350, 420].map((x, i) => maize(field, x, 430, 230 + (i % 2) * 30)); cap(s, 245, 455, 'MAIZE', { fill: K.ink });
    const cane = mk(s, 'g', {}); [520, 560, 600, 640, 680, 720].forEach((x, i) => { P(cane, `M${x},430 L${x},${180 + (i % 3) * 20}`, 'none', '#7FA35A', 9); for (let k = 0; k < 6; k++) P(cane, `M${x - 6},${410 - k * 40} L${x + 6},${410 - k * 40}`, 'none', '#4E6B32', 3); P(cane, `M${x},${190 + (i % 3) * 20} c-30,-10 -50,10 -60,30 M${x},${190 + (i % 3) * 20} c30,-10 50,10 60,30`, 'none', '#6DAA52', 5); }); cap(s, 620, 455, 'SUGARCANE', { fill: K.ink });
    return { els: [[field, ['H1', 'maize', -0.2], { dy: 20 }], [cane, ['H1', 'sugarcane', -0.2], { dy: 20 }], [sun, ['H1', 'light', -0.2], POP]],
      anim: t => { attr(rays, 'transform', `rotate(${(t * 12 % 360).toFixed(1)} 660 150)`); pl.forEach((p, i) => attr(p, 'transform', `rotate(${(2.5 * Math.sin(t * 1.4 + i)).toFixed(2)} ${70 + i * 70} 430)`)); } };
  } }));

/* ---------- B: C3 or C4 ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'C3 OR C4? COUNT THE CARBONS IN THE FIRST PRODUCT', pill: ['C4 plants: adapted to dry tropical places', ['B3', 'dry', -0.1], 'ac'], build: (el, s) => {
  const L = mk(s, 'g', {}); B.ring(L, 260, 280, 90, K.chl, 5); B.arrowHead(L, 350, 284, Math.PI / 2, K.chl, 14); T(L, 260, 276, 'Calvin', 26, K.chlD); T(L, 260, 306, 'cycle', 26, K.chlD);
  const pga = B.mol(s, 560, 280, 3, K.sugL, K.sug, 'PGA · 3 CARBONS', 22, 22); const c3 = div(el, 'ans', { left: '470px', top: '390px' }, '<b>C3 PLANT</b>first product has 3 carbons');
  const ar1 = arrow(s, 380, 280, 470, 280, K.ink, 4);
  const div1 = P(s, 'M800,110 L800,470', 'none', '#CBD0DA', 3, { 'stroke-dasharray': '8 8' });
  const co = B.co2(s, 940, 280, 30); const ar2 = arrow(s, 985, 280, 1080, 280, K.ink, 4);
  const oaa = c4mol(s, 1250, 280, 'OAA · 4 CARBONS', 22); const c4 = div(el, 'ans', { left: '1110px', top: '390px' }, '<b>C4 PLANT</b>first product has 4 carbons');
  return { els: [[L, ['B2', 'Calvin', -0.2], { ...POP, sc: 0.6 }], [ar1, ['B2', 'stable', -0.2], { dx: -10, dy: 0 }], [pga, ['B2', 'PGA', -0.1], { ...POP, sc: 0.6 }], [c3, ['B2', 'C3', -0.1]], [div1, ['B3', 'some', -0.3], { dy: 0, fade: 0.3 }],
    [co, ['B3', 'oxaloacetic', -0.4], POP], [ar2, ['B3', 'oxaloacetic', -0.2], { dx: -10, dy: 0 }], [oaa, ['B3', 'four', -0.2], { ...POP, sc: 0.6 }], [c4, ['B3', 'C4', -0.1]]],
  }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['MAIZE LEAF', 'LEAF SLICE', 'BUNDLE SHEATH'], scales: ['x1', 'x100', 'x400'], ghost: 'EXAMPLE FIGURES', nfs: 46,
  info: [['RUNG 1 OF 3', 'Maize leaf', 'A C4 plant.', 'Cut it across, then look.'], ['RUNG 2 OF 3', 'Leaf slice', 'A ring of large cells round each bundle.', 'Bundle sheath cells.'], ['RUNG 3 OF 3', 'Kranz anatomy', 'Kranz means wreath.', 'Many chloroplasts. Thick walls. No spaces.']],
  av: { who: 'Aarav', text: 'A wreath of cells!', tin: ['Z4', 'wreath', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [560, 263, 70], build: g => { const lf = P(g, 'M110,263 C300,150 800,170 960,263 C800,356 300,376 110,263 Z', K.leaf, K.chlD, 4); P(g, 'M120,263 L950,263', 'none', K.chlD, 4); for (let k = -3; k <= 3; k++) if (k) P(g, `M150,${263 + k * 9} C400,${263 + k * 26} 700,${263 + k * 26} 930,${263 + k * 6}`, 'none', K.leafL, 2.5);
      const cut = P(g, 'M560,140 L560,386', 'none', K.red, 4, { 'stroke-dasharray': '12 8' });
      return { els: [[cut, ['Z2', 'Cut', -0.1], { dy: 0, fade: 0.3 }]], labs: [[lab(g, 300, 230, 250, 110, 'Leaf blade'), ['Z2', 'maize']], [lab(g, 700, 263, 800, 430, 'Parallel veins'), ['Z2', 'leaf', 0.5]], [lab(g, 560, 160, 680, 100, 'Cut here'), ['Z2', 'Cut']]] }; } },
    { at: 'Z3', focus: [580, 263, 90], build: g => { const L = B.leafX(g, 528, 263, 940, 320, true, { bundles: [250, 580, 890], R: 62 });
      return { labs: [[lab(g, 580, 263, 700, 470, 'Vascular bundle'), ['Z3', 'vascular']], [lab(g, 580, 182, 760, 80, 'Bundle sheath cells'), ['Z3', 'bundle', 0, 1]], [lab(g, 410, 150, 330, 80, 'Mesophyll cells', 'end'), ['Z3', 'large']]] }; } },
    { at: 'Z4', build: g => { for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, x = 440 + 236 * Math.cos(a), y = 270 + 220 * Math.sin(a); mk(g, 'ellipse', { cx: x, cy: y, rx: 38, ry: 31, fill: K.mes, stroke: K.ink, 'stroke-width': 2.5 }); circ(g, x - 10, y, 6, K.chlF, K.chlD, 1.2); circ(g, x + 12, y + 6, 6, K.chlF, K.chlD, 1.2); }
      ringCells(g, 440, 270, 122, 44, 12, 7, 7); bundle(g, 440, 270, 72);
      return { labs: [[lab(g, 440 + 122 * Math.cos(-0.5) + 10, 270 + 122 * Math.sin(-0.5) - 8, 790, 120, 'Chloroplasts'), ['Z4', 'chloroplasts']], [lab(g, 440 + 166 * Math.cos(0.1), 270 + 166 * Math.sin(0.1), 790, 230, 'Thick wall'), ['Z4', 'thick']], [lab(g, 440 + 122 * Math.cos(0.75), 270 + 122 * Math.sin(0.75), 790, 340, 'Bundle sheath cell'), ['Z4', 'spaces']], [lab(g, 470, 300, 790, 450, 'Vascular bundle'), ['Z4', 'ring', 0, 1]]] }; } }] }));

/* ---------- L: the C4 pathway ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE C4 PATHWAY · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['CO₂ joins PEP', 'enzyme PEPcase · in mesophyll cells'], ['OAA forms (4 carbons)', 'then malic or aspartic acid'], ['Acids move in', 'into the bundle sheath cells'], ['Acids broken down', 'CO₂ + a 3-carbon molecule'], ['CO₂ to the Calvin cycle', 'run by RuBisCO · 3C goes back to PEP']], LT) }) },
  { pos: 'R', label: 'TWO CELLS, ONE TEAM', build: (el, s) => {
    mk(s, 'rect', { x: 36, y: 90, width: 300, height: 360, rx: 26, fill: K.mes, stroke: K.ink, 'stroke-width': 3 }); mk(s, 'rect', { x: 400, y: 90, width: 348, height: 360, rx: 26, fill: '#CFE6C4', stroke: K.ink, 'stroke-width': 7 });
    cap(s, 186, 476, 'MESOPHYLL CELL', { fill: K.ink }); cap(s, 574, 476, 'BUNDLE SHEATH CELL', { fill: K.ink });
    mk(s, 'rect', { x: 330, y: 250, width: 76, height: 40, fill: '#FFFFFF', stroke: 'none' }); P(s, 'M330,250 L406,250 M330,290 L406,290', 'none', K.ink, 3);
    B.tag(s, 186, 130, 'PEPcase', K.pepL, K.pep, 18); const ring = mk(s, 'g', {}); B.ring(ring, 600, 320, 66, K.chl, 5); B.arrowHead(ring, 666, 324, Math.PI / 2, K.chl, 12); T(s, 600, 316, 'Calvin', 20, K.chlD); T(s, 600, 340, 'cycle', 20, K.chlD); B.tag(s, 600, 130, 'RuBisCO', K.rubL, K.rub, 18);
    const co = B.co2(s, 0, 0, 20), pp = pep(s, 0, 0, null, 12), c4 = c4mol(s, 0, 0, null, 12), c3 = pep(s, 0, 0, null, 12), co2b = B.co2(s, 0, 0, 20);
    const nm = T(s, 186, 380, '', 20, K.ink);
    const eq = div(el, '', { position: 'absolute', left: '36px', top: '506px', width: '712px', display: 'flex', gap: '12px', justifyContent: 'center', font: "600 22px 'IBM Plex Mono'", color: C.mute });
    eq.innerHTML = ['PEP + CO₂', '→', 'OAA', '→', 'malic acid', '→', 'CO₂ + 3C'].map(x => `<span>${x}</span>`).join(''); const sp = [...eq.querySelectorAll('span')];
    const L = (a, b, v) => a + (b - a) * v;
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      const t0 = tm('L1') + 0.4, v0 = M.io((t - ts[0] + 0.3) / 1.0); at(co, L(70, 186, v0), L(200, 260, v0)); co.style.opacity = t > t0 && t < ts[1] - 0.2 ? 1 : 0;
      at(pp, 186, 300); pp.style.opacity = t > t0 && t < ts[1] - 0.2 ? 1 : (t > ts[4] + 1.6 ? 1 : 0);
      const mv = M.io((t - ts[2] - 0.2) / 1.2); at(c4, L(186, 520, mv), 300); c4.style.opacity = t >= ts[1] - 0.2 && t < ts[3] ? 1 : 0;
      const br = M.io((t - ts[3]) / 0.8), go = M.io((t - ts[4]) / 1.0), back = M.io((t - ts[4] - 0.4) / 1.2);
      at(co2b, L(520, 600, go), L(300 - 70 * br, 320, go)); co2b.style.opacity = t >= ts[3] && t < ts[4] + 1.0 ? 1 - go * 0.999 : 0;
      at(c3, L(L(520, 500, br), 186, back), L(300 + 80 * br, 300, back)); c3.style.opacity = t >= ts[3] && t < ts[4] + 1.6 ? 1 : 0;
      attr(ring, 'transform', t > ts[4] ? `rotate(${((t - ts[4]) * 60 % 360).toFixed(1)} 600 320)` : '');
      nm.textContent = c < 0 ? 'PEP · 3C' : c === 0 ? 'PEP + CO₂' : c === 1 ? 'OAA → malic acid' : c === 2 ? '' : c === 3 ? '' : (t > ts[4] + 1.6 ? 'PEP again' : ''); nm.style.opacity = t > t0 ? 1 : 0;
      const hi = [[0], [2, 4], [4], [6], [6]][Math.max(c, 0)]; sp.forEach((e, i) => { e.style.color = c >= 0 && hi.includes(i) ? C.ac : C.mute; e.style.fontWeight = c >= 0 && hi.includes(i) ? 700 : 600; }); } }; } }] });

/* ---------- C: RuBisCO's weakness ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: "RUBISCO'S WEAKNESS · CO₂ OR O₂?", build: (el, s) => {
  const ch = EP.chain(el, [['CO₂ OR O₂', ['C2', 'bind']], ['OXYGEN BINDS', ['C3', 'oxygen']], ['PGA + PHOSPHOGLYCOLATE', ['C3', 'phosphoglycolate']], ['PHOTORESPIRATION', ['C3', 'photorespiration']]]);
  const E = enz(s, 290, 400, 1.15, K.rubL, K.rub); T(s, 290, 520, 'RuBisCO', 30, K.rub);
  const gc = B.co2(s, 0, 0, 26), go2 = B.o2(s, 0, 0, 26);
  const r1 = mk(s, 'g', {}); B.mol(r1, 700, 250, 5, K.sugL, K.sug, 'RuBP · 5C', 15, 17); T(r1, 820, 258, '+', 34, K.ink); B.co2(r1, 870, 250, 24); arrow(r1, 910, 250, 980, 250, K.ink, 4); B.mol(r1, 1070, 250, 3, K.sugL, K.sug, 'PGA', 15, 17); B.mol(r1, 1220, 250, 3, K.sugL, K.sug, 'PGA', 15, 17); B.cap(r1, 1440, 256, 'WITH CO₂', C.ac, 18);
  const r2 = mk(s, 'g', {}); B.mol(r2, 700, 420, 5, K.sugL, K.sug, 'RuBP · 5C', 15, 17); T(r2, 820, 428, '+', 34, K.ink); B.o2(r2, 870, 420, 24); arrow(r2, 910, 420, 980, 420, K.ink, 4); B.mol(r2, 1070, 420, 3, K.sugL, K.sug, 'PGA', 15, 17); B.mol(r2, 1210, 420, 2, '#F6D3D9', K.red, 'PHOSPHOGLYCOLATE · 2C', 15, 17); B.cap(r2, 1440, 426, 'WITH O₂', K.red, 18);
  return { els: [[E, 'C1', { ...POP, sc: 0.6 }], [r1, ['C2', 'carbon', -0.1], { dx: -16, dy: 0 }], [r2, ['C3', 'oxygen', -0.1], { dx: -16, dy: 0 }]],
    labs: [[lab(s, 290, 325, 470, 170, 'Active site'), ['C2', 'active']]],
    anim: t => { ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'bind']); const ph = Math.max(0, t - a) % 4, w = ph < 2 ? 0 : 1, u = M.io(Math.min(ph % 2, 1) / 0.8) * (1 - M.io((ph % 2 - 1.3) / 0.6));
      const stuck = t > tm(['C3', 'oxygen']); [gc, go2].forEach((m, k) => { const sel = stuck ? k === 1 : k === w; const v = stuck ? (k === 1 ? 1 : 0) : (sel ? u : 0); at(m, 230 + k * 120 + (60 - k * 120) * v, 170 + 150 * v); m.style.opacity = t > a - 0.3 ? 1 : 0; }); } }; } }] });

/* ---------- D: a waste, and the C4 fix ---------- */
const row = (el, y, q, ok, s) => div(el, 'chp', { left: '36px', top: y + 'px', width: '712px', justifyContent: 'space-between', height: '64px', fontSize: '26px' }, `<span>${q}</span><b style="color:${ok ? C.ac : '#D1495B'};font:700 22px 'IBM Plex Mono'">${s}</b>`);
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'PHOTORESPIRATION · THE BALANCE', svg: false, build: el => { const r = [row(el, 100, 'Sugar made', 0, 'NONE'), row(el, 184, 'ATP made', 0, 'NONE'), row(el, 268, 'ATP used up', 0, 'YES'), row(el, 352, 'Fixed CO₂ lost', 0, 'YES')];
    const pl = div(el, 'pillp', { left: '36px', top: '470px', background: '#FBE3E6', color: '#B23A4E' }, 'A waste of energy and carbon');
    return { els: [[r[0], ['D2', 'sugar', -0.1], { dx: -16, dy: 0 }], [r[1], ['D2', 'ATP', -0.1], { dx: -16, dy: 0 }], [r[2], ['D2', 'uses', -0.1], { dx: -16, dy: 0 }], [r[3], ['D2', 'escape', -0.2], { dx: -16, dy: 0 }], [pl, ['D2', 'escape', 0.3]]] }; } },
  { pos: 'R', label: 'INSIDE A C4 BUNDLE SHEATH CELL', tin: ['D3', null, -0.2], pill: ['No photorespiration · better yields', ['D3', 'yields', -0.2], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 60, y: 90, width: 664, height: 360, rx: 30, fill: '#CFE6C4', stroke: K.ink, 'stroke-width': 7 }); const E = enz(s, 392, 360, 0.75, K.rubL, K.rub); T(s, 392, 420, 'RuBisCO', 20, K.rub);
    const bs = Array.from({ length: 12 }, (_, k) => B.co2(s, 0, 0, 18)); const ox = mk(s, 'g', {}); B.o2(ox, 640, 150, 20); P(ox, 'M616,126 L664,174 M664,126 L616,174', 'none', K.red, 4);
    return { els: [[ox, ['D3', 'grabs', 0.2], POP]], anim: t => { const a = tm(['D3', 'packed']); bs.forEach((m, k) => { const n = M.clamp((t - a + 0.3) / 1.5) * 12; const x = 120 + (k * 137) % 520, y = 130 + (k * 71) % 160; at(m, x + 6 * Math.sin(t * 2 + k), y + 6 * Math.cos(t * 1.7 + k)); m.style.opacity = k < n ? 1 : 0; }); } }; } }] });

/* ---------- U: C3 vs C4 + think ---------- */
const TH = { q: 'Does photorespiration happen in the bundle sheath of a C4 plant?', opts: ['Yes', 'No'], right: 1, why: 'No. So much CO₂ is packed there that RuBisCO grabs CO₂, not O₂.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'C3 AND C4 PLANTS · SIDE BY SIDE', svg: false, tout: 'U4', build: el => {
    const H = [div(el, 'chp', { left: '440px', top: '76px', width: '540px', justifyContent: 'center', background: C.ink, color: '#fff' }, 'C3 PLANT · e.g. wheat'), div(el, 'chp', { left: '1010px', top: '76px', width: '554px', justifyContent: 'center', background: C.ac, color: '#fff' }, 'C4 PLANT · e.g. maize, sorghum')];
    const R = [['CO₂ is fixed', 'once', 'twice'], ['Cells used', 'mesophyll only', 'mesophyll + bundle sheath'], ['First product', 'PGA (3 carbons)', 'OAA (4 carbons)'], ['Kranz anatomy', 'absent', 'present']];
    const out = { els: [[H[0], ['U2', 'C3', -0.2]], [H[1], ['U3', 'C4', -0.2]]] }; const w3 = [['U2', 'once'], ['U2', 'mesophyll'], ['U2', 'PGA'], ['U2', 'Kranz']], w4 = [['U3', 'twice'], ['U3', 'bundle'], ['U3', 'OAA'], ['U3', 'OAA', 0.25]];
    R.forEach(([k, a, b], i) => { const y = 146 + i * 100; const kk = div(el, 'chp', { left: '36px', top: y + 'px', width: '380px', height: '80px', background: 'transparent', font: "600 18px 'IBM Plex Mono'", letterSpacing: '.08em', color: C.mute }, k.toUpperCase());
      const ca = div(el, 'chp', { left: '440px', top: y + 'px', width: '540px', height: '80px', justifyContent: 'center', fontSize: '28px' }, a), cb = div(el, 'chp', { left: '1010px', top: y + 'px', width: '554px', height: '80px', justifyContent: 'center', fontSize: '28px', background: '#E3F1E7', color: '#1F6B3F' }, b);
      out.els.push([kk, [w3[i][0], w3[i][1], -0.3]], [ca, w3[i]], [cb, w4[i]]); });
    return out; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'photorespiration', -0.1], why: ['U5', 'packed'] })] });

/* ---------- W: C3 or C4 leaf? ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · THREE CLUES · C3 OR C4?', svg: false, build: el => EP.cols(el, [
  ['CLUE 1 · THE SLICE', 'A ring round each bundle', 'LARGE CELLS · KRANZ', s => { ringCells(s, 248, 145, 70, 26, 11, 4, 4); bundle(s, 248, 145, 42); }, ['W2', 'Clue', -0.2], ['W2', 'ring'], ['W2', 'bundle']],
  ['CLUE 2 · THE ENZYME', 'RuBisCO in the ring cells', 'NOT IN THE MESOPHYLL', s => { mk(s, 'rect', { x: 30, y: 60, width: 190, height: 170, rx: 20, fill: K.mes, stroke: K.ink, 'stroke-width': 3 }); mk(s, 'rect', { x: 270, y: 60, width: 196, height: 170, rx: 20, fill: '#CFE6C4', stroke: K.ink, 'stroke-width': 6 });
    B.tag(s, 125, 145, 'RuBisCO', '#F3F4F6', '#9AA0AC', 16); P(s, 'M70,120 L180,170 M180,120 L70,170', 'none', K.red, 4); B.tag(s, 368, 145, 'RuBisCO', K.rubL, K.rub, 16); B.cap(s, 125, 262, 'MESOPHYLL', K.ink, 13); B.cap(s, 368, 262, 'BUNDLE SHEATH', K.ink, 13); }, ['W3', 'Clue', -0.2], ['W3', 'RuBisCO'], ['W3', 'mesophyll']],
  ['CLUE 3 · FIRST PRODUCT', 'A four-carbon acid', 'VERDICT: A C4 LEAF', s => { c4mol(s, 248, 130, 'FIRST STABLE PRODUCT', 26); }, ['W4', 'Clue', -0.2], ['W4', 'four'], ['W4', 'C4']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['stalk', 'A maize field', 'HOT AFTERNOON', ['H1', 'maize']], ['leaf', 'A sugarcane patch', 'TALLER EVERY WEEK', ['H1', 'sugarcane']], ['sun', 'Strong light, heat', 'THEY LOVE IT', ['H1', 'love']]],
  scenes: S,
  stmt: { l2: 'C4 plants <span class="acc">pump</span> CO₂ into the bundle sheath.', f: '<span class="lad">PEP + CO₂ → OAA → <b>CO₂</b> → Calvin cycle</span>', t2: ['T1', 'pump', -0.2], tf: ['T1', 'bundle'] },
  trap: { wrong: 'C4 plants do not use the Calvin cycle', right: 'The Calvin cycle runs in the bundle sheath', tWrong: ['X2', 'Calvin', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'runs', -0.2], tSvg: ['X3', 'brings', -0.4],
    build: s => { mk(s, 'rect', { x: 80, y: 40, width: 300, height: 190, rx: 24, fill: '#CFE6C4', stroke: K.ink, 'stroke-width': 6 }); B.ring(s, 230, 135, 52, K.chl, 5); T(s, 230, 132, 'Calvin', 17, K.chlD); T(s, 230, 152, 'cycle', 17, K.chlD); B.co2(s, 40, 135, 20); arrow(s, 62, 135, 172, 135, K.ink, 3); cap(s, 230, 262, 'BUNDLE SHEATH CELL', { 'font-size': 14 }); } },
  where: { type: 'Match and statement questions: Kranz anatomy, PEPcase, RuBisCO, photorespiration', at: ['E1', 'match'] },
  mcq: { q: 'Match column I with column II.<div style="display:flex;gap:40px;font:500 21px Poppins;line-height:1.5;margin-top:10px"><div>a. PEPcase<br>b. RuBisCO in a C4 plant<br>c. Phosphoglycolate<br>d. OAA</div><div>i. Bundle sheath cells<br>ii. First stable product of C4<br>iii. Mesophyll cells<br>iv. Photorespiration</div></div>', opts: ['a-i, b-iii, c-iv, d-ii', 'a-iii, b-i, c-ii, d-iv', 'a-iii, b-i, c-iv, d-ii', 'a-iv, b-i, c-iii, d-ii'], right: 2 }, mcqAt: ['Q1', 'place', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['a-iii: PEPcase · mesophyll', ['A1', 'PEPcase']], ['b-i: RuBisCO · bundle sheath', ['A1', 'RuBisCO']], ['c-iv: photorespiration', ['A2', 'photorespiration']], ['d-ii: first stable C4 product', ['A3', 'first']]],
  recap: { title: 'Recap · C4 pathway', lines: ['<b>C3 or C4</b>: first product PGA (3C) or OAA (4C)', '<b>Kranz anatomy</b>: a wreath of bundle sheath cells', '<b>Mesophyll</b>: PEPcase joins CO₂ to PEP → OAA', '<b>Bundle sheath</b>: CO₂ released → Calvin cycle (RuBisCO)', '<b>Photorespiration</b>: RuBisCO + O₂ · no sugar, no ATP'] },
  yq: ['What is Kranz anatomy?', 'Which enzyme fixes CO₂ in the mesophyll of C4 plants?', 'Why is photorespiration a waste?'],
  next: { label: 'NEXT · EP 86', topic: 'Factors Affecting Photosynthesis' }
});
})();
