// PUC Biology Ep 74: Factors Affecting Enzyme Activity, Classification and Cofactors (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, AA, P, circ, T, chain, hex, enz, enzD, sub, at, axes, arrow } = B9;
const GR = '#9AA0AC', HAEM = '#D1495B';
const ICN = { bowl: ['M3 11h18', 'M4 11a8 8 0 0 0 16 0'], moon: ['M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10Z'], snow: ['M12 3v18', 'M4 7.5l16 9', 'M20 7.5l-16 9'] };
const S = [];
const thermo = (g, x, y, h, lvl, c) => { mk(g, 'rect', { x: x - 12, y: y - h, width: 24, height: h, rx: 12, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); circ(g, x, y + 8, 20, c, K.ink, 3); mk(g, 'rect', { x: x - 6, y: y - h * lvl, width: 12, height: h * lvl, rx: 6, fill: c }); };
const inh = (g, s = 1) => sub(g, s, '#E3E5EA', K.grey);
const haem = (g, x, y, r) => { const G = mk(g, 'g', {}); circ(G, x, y, r, '#F7D0D5', HAEM, 4); [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2 + Math.PI / 4; B9.pent(G, x + r * 0.62 * Math.cos(a), y + r * 0.62 * Math.sin(a), r * 0.26, '#FFFFFF', HAEM, 3); }); circ(G, x, y, r * 0.24, '#E58A3C', K.ink, 3); T(G, x, y + r * 0.1, 'Fe', r * 0.24, K.ink); return G; };
const zn = (g, x, y, r) => { const G = mk(g, 'g', {}); circ(G, x, y, r, '#C9D6F0', K.zn, 4); T(G, x, y + r * 0.3, 'Zn', r * 0.8, K.zn); return G; };

/* ---------- H: curd on a warm night ---------- */
S.push(EP.hook({ label: 'SETTING CURD', face: 'aarav', pill: ['Warm: sets · Cold: does not', ['H2', 'temperature', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Why does cold slow the change?', ['H3', 'cold']], ['Why can too much heat ruin it?', ['H3', 'heat']]],
  a: [['ANSWER 1', 'Cold only pauses the enzymes', ['H4', 'Cold']], ['ANSWER 2', 'Too much heat destroys their shape', ['H4', 'heat']]],
  chips: [['Temperature and pH', ['H5', 'changes']], ['Substrate amount', ['H5', 'activity']], ['Inhibitors', ['H5', 'activity', 0.4]], ['Six classes', ['H5', 'six']], ['Cofactors', ['H5', 'cofactors']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 392, height: 510, fill: '#2C3550' }); mk(s, 'rect', { x: 392, y: 70, width: 392, height: 510, fill: '#DCEBF5' }); circ(s, 300, 150, 30, '#FFF3C4', '#C9B67A', 2);
    mk(s, 'rect', { x: 0, y: 410, width: 392, height: 170, fill: '#7A5A3A' }); mk(s, 'rect', { x: 430, y: 130, width: 320, height: 420, rx: 18, fill: '#F7FBFF', stroke: '#7FA3B8', 'stroke-width': 4 }); mk(s, 'rect', { x: 450, y: 400, width: 280, height: 8, fill: '#B9CFDD' });
    const bowl = (x, y) => { P(s, `M${x - 110},${y} Q${x},${y + 110} ${x + 110},${y} Z`, '#FBF6EE', K.ink, 4); return mk(s, 'ellipse', { cx: x, cy: y, rx: 110, ry: 20, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); };
    const m1 = bowl(196, 380), m2 = bowl(590, 370); const cr = P(s, 'M130,380 l30,-6 l20,8 l30,-7 M220,376 l26,6 l24,-5', 'none', '#D8CBB0', 3, { opacity: 0 });
    const rip = mk(s, 'ellipse', { cx: 590, cy: 370, rx: 30, ry: 6, fill: 'none', stroke: '#B9CFDD', 'stroke-width': 2 }); T(s, 196, 460, 'WARM NIGHT', 20, '#fff'); T(s, 590, 460, 'FRIDGE', 20, '#486A80');
    return { anim: t => { const v = M.clamp((t - tm(['H1', 'sets'])) / 0.8); attr(m1, 'fill', M.mix('#FFFFFF', '#F2E8CF', v)); cr.style.opacity = v; const r = (t * 0.6) % 1; attr(rip, 'rx', (20 + 70 * r).toFixed(1)); attr(rip, 'ry', (4 + 12 * r).toFixed(1)); rip.style.opacity = (1 - r).toFixed(2); } };
  } }));

/* ---------- B: four factors ---------- */
S.push({ id: 'B', from: 'B1', to: 'C1', cards: [{ pos: 'W', label: 'WHAT CHANGES ENZYME ACTIVITY?', build: (el, s) => {
  const E = mk(s, 'g', {}); enz(E, 800, 330, 1.1); cap(E, 800, 450, 'ITS 3D SHAPE (TERTIARY STRUCTURE)', { fill: K.pro });
  const tile = (x, y, n, sub2, draw) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x, y, width: 380, height: 150, rx: 18, fill: '#FBFAF6', stroke: '#D9D4C7', 'stroke-width': 2 }); draw(g, x + 70, y + 75); txt(g, x + 140, y + 70, n, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: C.ink }); txt(g, x + 140, y + 104, sub2, { 'font-size': 16, 'font-weight': 600, fill: C.mute }); return g; };
  const t1 = tile(60, 100, 'Temperature', 'HOT OR COLD', (g, x, y) => thermo(g, x, y + 30, 90, 0.6, K.red));
  const t2 = tile(60, 330, 'pH', 'HOW ACIDIC', (g, x, y) => { ['#D1495B', '#E58A3C', '#E2B33C', '#3E9B5F', '#5AA0C8', '#4A5FC1', '#7B4B94'].forEach((c, k) => mk(g, 'rect', { x: x - 42 + k * 12, y: y - 30, width: 12, height: 60, fill: c })); });
  const t3 = tile(1160, 100, 'Substrate', 'HOW MUCH OF IT', (g, x, y) => [[-20, -16], [20, -16], [0, 18]].forEach(([dx, dy]) => { const q = sub(g, 0.45); at(q.g, x + dx, y + dy); }));
  const t4 = tile(1160, 330, 'Chemicals', 'THAT BIND TO IT', (g, x, y) => { const q = inh(g, 0.6); at(q.g, x, y); });
  const ar = [[440, 175, 660, 280], [440, 405, 660, 360], [1160, 175, 940, 280], [1160, 405, 940, 360]].map(([a, b, c, d]) => arrow(s, a, b, c, d, C.ac, 4));
  return { els: [[E, ['B2', 'shape', -0.3], { ...POP, sc: 0.7 }], [t1, ['B3', 'Temperature', -0.1], { dx: -20, dy: 0 }], [ar[0], ['B3', 'Temperature'], { dy: 0, fade: 0.3 }], [t2, ['B3', 'pH', -0.1], { dx: -20, dy: 0 }], [ar[1], ['B3', 'pH'], { dy: 0, fade: 0.3 }], [t3, ['B3', 'amount', -0.1], { dx: 20, dy: 0 }], [ar[2], ['B3', 'amount'], { dy: 0, fade: 0.3 }], [t4, ['B3', 'special', -0.1], { dx: 20, dy: 0 }], [ar[3], ['B3', 'special'], { dy: 0, fade: 0.3 }]] }; } }] });

/* ---------- C: temperature and pH ---------- */
S.push({ id: 'C', from: 'C1', to: 'T1', keep: 1, cards: [{ pos: 'W', label: 'TEMPERATURE AND pH · THE OPTIMUM', build: (el, s) => {
  const ch = EP.chain(el, [['OPTIMUM', ['C2', 'optimum']], ['FALLS ON BOTH SIDES', ['C2', 'falls']], ['COLD: PAUSED', ['C3', 'Low']], ['HOT: DENATURED', ['C3', 'denatures']]]);
  axes(s, 120, 440, 620, 290, 'TEMPERATURE', 'ENZYME ACTIVITY'); axes(s, 900, 440, 620, 290, 'pH', 'ENZYME ACTIVITY');
  const c1 = P(s, 'M140,430 C260,420 380,190 470,180 C530,175 560,330 640,430', 'none', K.red, 5), c2 = P(s, 'M920,430 C1040,430 1120,180 1210,180 C1300,180 1380,430 1500,430', 'none', '#4A5FC1', 5);
  const o1 = mk(s, 'g', {}); P(o1, 'M470,180 L470,440', 'none', K.red, 2, { 'stroke-dasharray': '6 6' }); cap(o1, 470, 168, 'OPTIMUM TEMPERATURE', { fill: K.red });
  const o2 = mk(s, 'g', {}); P(o2, 'M1210,180 L1210,440', 'none', '#4A5FC1', 2, { 'stroke-dasharray': '6 6' }); cap(o2, 1210, 168, 'OPTIMUM pH', { fill: '#4A5FC1' });
  const d1 = circ(s, 0, 0, 13, '#FFFFFF', K.red, 4), d2 = circ(s, 0, 0, 13, '#FFFFFF', '#4A5FC1', 4);
  const lo = div(el, 'chp', { left: '120px', top: '500px', background: '#DCE7F6', color: '#2F4FA8' }, 'Low: temporarily inactive'), hi = div(el, 'chp', { left: '450px', top: '500px', background: '#F8DCDF', color: K.red }, 'High: denatured');
  const pc = div(el, 'chp', { left: '1000px', top: '500px' }, 'Each enzyme has its own optimum');
  return { els: [[c1, ['C2', 'highest', -0.2], { dy: 0, fade: 0.3 }], [c2, ['C2', 'pH', -0.2], { dy: 0, fade: 0.3 }], [o1, ['C2', 'optimum'], { dy: 6 }], [o2, ['C2', 'optimum', 0.6, 1], { dy: 6 }], [pc, ['C2', 'falls']], [lo, ['C3', 'Low', -0.1]], [hi, ['C3', 'High', -0.1]]],
    anim: t => { ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'highest']); const v = 0.5 + 0.48 * Math.sin((t - a) * 0.9 - Math.PI / 2); let q = B9.pt(c1, v); attr(d1, 'cx', q.x.toFixed(1)); attr(d1, 'cy', q.y.toFixed(1)); q = B9.pt(c2, 1 - v); attr(d2, 'cx', q.x.toFixed(1)); attr(d2, 'cy', q.y.toFixed(1)); d1.style.opacity = d2.style.opacity = t > a ? 1 : 0; } }; } }] });

/* ---------- D: substrate concentration ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'MORE SUBSTRATE · FASTER, THEN FLAT', pill: ['Top speed: Vmax', ['D2', 'top', -0.1], 'ac'], build: (el, s) => {
    axes(s, 110, 430, 600, 320, 'AMOUNT OF SUBSTRATE', 'SPEED'); const cv = P(s, 'M110,430 C200,250 300,160 460,140 C560,132 640,130 700,130', 'none', C.ac, 5); const vm = mk(s, 'g', {}); P(vm, 'M110,128 L700,128', 'none', K.ink, 2, { 'stroke-dasharray': '8 6' }); txt(vm, 130, 116, 'Vmax', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: C.ink });
    const d = circ(s, 0, 0, 12, '#FFFFFF', C.ac, 4);
    return { els: [[cv, ['D2', 'At'], { dy: 0, fade: 0.3 }], [vm, ['D2', 'top'], { dy: 6 }]], anim: t => { const v = M.clamp((t - tm(['D2', 'At'])) / 5); const q = B9.pt(cv, v); attr(d, 'cx', q.x.toFixed(1)); attr(d, 'cy', q.y.toFixed(1)); d.style.opacity = t > tm(['D2', 'At']) ? 1 : 0; } }; } },
  { pos: 'R', label: 'WHY IT GOES FLAT', tin: ['D3', null, -0.2], pill: ['All enzymes busy: saturated', ['D3', 'saturated', -0.1], 'ac'], build: (el, s) => {
    const ex = [130, 300, 470, 640]; ex.forEach(x => enz(s, x, 330, 0.62)); const subs = Array.from({ length: 10 }, () => sub(s, 0.45)); const wt = cap(s, 392, 150, 'EXTRA SUBSTRATE WAITS', { fill: C.ink });
    return { els: [[wt, ['D3', 'wait', -0.3], { dy: 6 }]], anim: t => { const n = Math.floor(M.clamp((t - tm('D3')) / 5) * 10);
      subs.forEach((q, k) => { const on = k < n; q.g.style.opacity = on ? 1 : 0; if (k < 4) at(q.g, ex[k], 330 - 44 * 0.62 - 10); else at(q.g, 170 + (k - 4) * 90, 210 + 6 * Math.sin(t * 3 + k)); }); } }; } }] });

/* ---------- U: competitive inhibition + think ---------- */
const TH = { q: 'Why does malonate block succinic dehydrogenase?', opts: ['It heats the enzyme', 'It looks like succinate'], right: 1, why: 'It looks like succinate and takes the active site: a competitive inhibitor.' };
S.push({ id: 'U', from: 'U1', to: 'L1', cards: [
  { pos: 'L', label: 'COMPETITIVE INHIBITION', tout: 'U4', build: (el, s) => {
    enz(s, 392, 400, 1.4); const I = inh(s, 0.8), Sb = sub(s, 0.8); const yB = 400 - 44 * 1.4 - 18;
    return { labs: [[lab(s, 450, 160, 580, 110, 'Inhibitor'), ['U2', 'inhibitor']], [lab(s, 210, 220, 120, 120, 'Substrate', 'start'), ['U2', 'substrate']]],
      anim: t => { const a = tm(['U2', 'takes']); const v = M.io((t - a) / 1); at(I.g, 450 + (392 - 450) * v, 160 + (yB - 160) * v); const b = M.io((t - a - 0.8) / 0.8); at(Sb.g, 210 - 40 * b, 220 - 40 * Math.sin(b * Math.PI)); [I.g, Sb.g].forEach(e => e.style.opacity = t > tm('U2') ? 1 : 0); } }; } },
  { pos: 'R', label: 'A REAL EXAMPLE', tin: ['U3', null, -0.2], tout: 'U4', pill: ['Used to control harmful bacteria', ['U3', 'bacteria', -0.1], 'ac'], build: (el, s) => {
    const a = mk(s, 'g', {}); const q1 = sub(a, 1.2); at(q1.g, 220, 200); T(a, 220, 290, 'Succinate', 28, K.sug); cap(a, 220, 322, 'THE SUBSTRATE', { fill: C.ink });
    const b = mk(s, 'g', {}); const q2 = inh(b, 1.2); at(q2.g, 564, 200); T(b, 564, 290, 'Malonate', 28, K.grey); cap(b, 564, 322, 'THE LOOK-ALIKE', { fill: C.ink });
    const e = mk(s, 'g', {}); enz(e, 392, 450, 0.5); txt(e, 470, 440, 'Succinic dehydrogenase', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 22, fill: K.pro });
    return { els: [[b, ['U3', 'malonate', -0.1], { dy: 10 }], [a, ['U3', 'succinate', -0.1], { dy: 10 }], [e, ['U3', 'dehydrogenase', -0.2], { dy: 10 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'block', -0.1], why: ['U5', 'looks'] })] });

/* ---------- L: six classes ---------- */
const LT = [['L2', null, 0.45], ['L3', null, 0.45], ['L4', null, 0.45], ['L4', 'Lyases', -0.1], ['L5', null, 0.45], ['L6', null, 0.45]];
const NM = ['Oxidoreductases', 'Transferases', 'Hydrolases', 'Lyases', 'Isomerases', 'Ligases'];
S.push({ id: 'L', from: 'L1', to: 'Z1', cards: [
  { pos: 'L', label: 'SIX CLASSES OF ENZYMES · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Oxidoreductases', 'move H or electrons between substrates'], ['Transferases', 'move a group, not hydrogen'], ['Hydrolases', 'break bonds using water'], ['Lyases', 'remove groups, leave double bonds'], ['Isomerases', 'rearrange into another isomer'], ['Ligases', 'join two compounds']], LT, 72, 82) }) },
  { pos: 'R', label: 'WHAT EACH CLASS DOES', build: (el, s) => {
    const G = NM.map(() => mk(s, 'g', {})), R = [];
    // 0 oxidoreductase: H moves S -> S'
    { const g = G[0]; circ(g, 220, 260, 60, K.sugL, K.sug, 4); circ(g, 564, 260, 60, K.watL, K.wat, 4); T(g, 220, 270, 'S', 30); T(g, 564, 270, "S'", 30); const h = circ(g, 0, 0, 18, '#FFFFFF', K.ink, 3), ht = T(g, 0, 0, 'H', 18); R.push(u => { const v = M.io((u - 0.6) / 1.2) ; const x = 270 + 244 * v, y = 230 - 80 * Math.sin(v * Math.PI); attr(h, 'cx', x); attr(h, 'cy', y); attr(ht, 'x', x); attr(ht, 'y', y + 6); }); cap(g, 220, 360, 'GETS OXIDISED', { fill: C.ink }); cap(g, 564, 360, 'GETS REDUCED', { fill: C.ink }); }
    // 1 transferase: group G
    { const g = G[1]; circ(g, 220, 260, 60, K.sugL, K.sug, 4); circ(g, 564, 260, 60, K.watL, K.wat, 4); T(g, 220, 270, 'S', 30); T(g, 564, 270, "S'", 30); const gr = P(g, 'M0,-22 L20,14 L-20,14 Z', '#BFE3C8', C.ac, 3); R.push(u => { const v = M.io((u - 0.6) / 1.2); at(gr, 280 + 224 * v, 220 - 90 * Math.sin(v * Math.PI)); }); cap(g, 392, 360, 'A GROUP (NOT HYDROGEN) MOVES', { fill: C.ink }); }
    // 2 hydrolase: water splits A-B
    { const g = G[2]; const a = mk(g, 'g', {}), b = mk(g, 'g', {}); circ(a, 0, 0, 50, K.sugL, K.sug, 4); circ(b, 0, 0, 50, K.proL, K.pro, 4); const bd = P(g, 'M342,260 L442,260', 'none', K.ink, 6); const w = mk(g, 'g', {}); P(w, 'M0,-26 C14,-6 18,4 18,10 A18,18 0 0 1 -18,10 C-18,4 -14,-6 0,-26 Z', K.watL, K.wat, 3); T(w, 0, 12, 'H2O', 13, K.wat);
      R.push(u => { const v = M.io((u - 0.3) / 0.8), sp = M.io((u - 1.1) / 0.8); at(w, 392, 120 + 120 * v); w.style.opacity = sp > 0.5 ? 0 : 1; at(a, 300 - 60 * sp, 260); at(b, 484 + 60 * sp, 260); bd.style.opacity = sp > 0.2 ? 0 : 1; }); cap(g, 392, 380, 'WATER BREAKS THE BOND', { fill: C.ink }); }
    // 3 lyase: group leaves, double bond
    { const g = G[3]; circ(g, 300, 270, 50, K.sugL, K.sug, 4); circ(g, 484, 270, 50, K.sugL, K.sug, 4); const one = P(g, 'M350,270 L434,270', 'none', K.ink, 6), dbl = P(g, 'M350,262 L434,262 M350,278 L434,278', 'none', K.ink, 5); const gr = P(g, 'M0,-22 L20,14 L-20,14 Z', '#BFE3C8', C.ac, 3);
      R.push(u => { const v = M.io((u - 0.6) / 1); at(gr, 392 + 120 * v, 236 - 140 * v); dbl.style.opacity = v > 0.6 ? 1 : 0; one.style.opacity = v > 0.6 ? 0 : 1; }); cap(g, 392, 380, 'A GROUP LEAVES · DOUBLE BOND FORMS', { fill: C.ink }); }
    // 4 isomerase: group moves along same molecule
    { const g = G[4]; P(g, 'M220,270 L564,270', 'none', K.sug, 10); [220, 335, 450, 564].forEach(x => circ(g, x, 270, 26, K.sugL, K.sug, 3)); const gr = P(g, 'M0,-22 L20,14 L-20,14 Z', '#BFE3C8', C.ac, 3); R.push(u => { const v = M.io((u - 0.6) / 1.2); at(gr, 220 + 344 * v, 222 - 60 * Math.sin(v * Math.PI)); }); cap(g, 392, 380, 'SAME ATOMS, NEW ARRANGEMENT', { fill: C.ink }); }
    // 5 ligase: join two
    { const g = G[5]; const a = mk(g, 'g', {}), b = mk(g, 'g', {}); circ(a, 0, 0, 50, K.sugL, K.sug, 4); circ(b, 0, 0, 50, K.proL, K.pro, 4); const bd = P(g, 'M342,260 L442,260', 'none', K.ink, 6); R.push(u => { const v = M.io((u - 0.5) / 1); at(a, 180 + 120 * v, 260); at(b, 604 - 120 * v, 260); bd.style.opacity = v > 0.95 ? 1 : 0; }); cap(g, 392, 380, 'TWO COMPOUNDS JOIN', { fill: C.ink }); }
    const nm = div(el, 'pillp ac', { left: '36px', top: '494px' }, '');
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); G.forEach((g, i) => { g.style.opacity = c === i ? M.clamp((t - ts[i] + 0.2) / 0.3) : 0; if (c === i) R[i](t - ts[i]); }); nm.style.opacity = c >= 0 ? 1 : 0; if (c >= 0) nm.textContent = NM[c]; } }; } }] });

/* ---------- Z: cofactor zoom ladder ---------- */
S.push(EP.zoom({ to: 'W1', nfs: 44, names: ['ENZYME + HELPER', 'PROSTHETIC GROUP', 'METAL ION'], scales: ['x1,000,000', 'x10,000,000', 'x10,000,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Apoenzyme', 'The protein part.', 'Needs its cofactor to work.'], ['RUNG 2 OF 3', 'Prosthetic group', 'Haem: catalase, peroxidase.', 'Organic, tightly bound.'], ['RUNG 3 OF 3', 'Metal ion', 'Zinc: carboxypeptidase.', 'Holds enzyme and substrate.']],
  av: { who: 'Aarav', text: 'No helper, no reaction!', tin: ['Z4', 'substrate', 0.4], tout: ['W1', null, -0.1] },
  rungs: [
    { focus: [528, 250, 60], build: g => { const E = P(g, enzD(528, 400, 2.2), K.proL, K.pro, 5); const cf = mk(g, 'g', {}); circ(cf, 0, 0, 34, '#BFE3DF', K.coe, 4); T(cf, 0, 8, 'CF', 20, K.coe);
      return { labs: [[lab(g, 330, 420, 180, 470, 'Apoenzyme', 'end'), ['Z2', 'apoenzyme']], [lab(g, 562, 250, 760, 160, 'Cofactor'), ['Z2', 'cofactor']]],
        anim: t => { const r = M.io((t - tm(['Z2', 'Remove'])) / 0.8); at(cf, 528 + 260 * r, 262 - 160 * r); attr(E, 'fill', M.mix(K.proL, '#E3E5EA', r)); } }; } },
    { at: 'Z3', focus: [528, 263, 60], build: g => { P(g, 'M140,120 C300,140 330,320 420,330 L636,330 C726,320 756,140 916,120 L916,560 L140,560 Z', K.proL, K.pro, 5); haem(g, 528, 263, 90);
      return { labs: [[lab(g, 600, 200, 760, 90, 'Haem · tightly bound'), ['Z3', 'haem']], [lab(g, 420, 330, 250, 420, 'Active site', 'end'), ['Z3', 'active']]] }; } },
    { at: 'Z4', build: g => { P(g, 'M140,120 C300,140 330,360 420,370 L636,370 C726,360 756,140 916,120 L916,560 L140,560 Z', K.proL, K.pro, 5); const z = zn(g, 528, 300, 44); const q = sub(g, 1.3); at(q.g, 528, 160);
      P(g, 'M500,340 L440,380 M556,340 L616,380', 'none', K.zn, 4, { 'stroke-dasharray': '6 5' }); P(g, 'M528,256 L528,190', 'none', K.zn, 4, { 'stroke-dasharray': '6 5' });
      return { labs: [[lab(g, 572, 300, 760, 300, 'Zinc ion'), ['Z4', 'zinc']], [lab(g, 560, 140, 760, 90, 'Substrate'), ['Z4', 'substrate']]] }; } }] }));

/* ---------- W: sort the cofactors ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · SORT THREE COFACTORS', svg: false, build: el => EP.cols(el, [
  ['COFACTOR 1 · HAEM', 'Prosthetic group', 'ORGANIC · TIGHTLY BOUND', s => { haem(s, 248, 140, 80); txt(s, 248, 270, 'CATALASE · PEROXIDASE', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600 }); }, ['W2', 'Haem', -0.2], ['W2', 'prosthetic', -0.1], ['W2', 'prosthetic', 0.4]],
  ['COFACTOR 2 · NAD', 'Co-enzyme', 'JOINS BRIEFLY · CONTAINS NIACIN', s => { enz(s, 200, 200, 0.7); const t = mk(s, 'g', {}); mk(t, 'rect', { x: -40, y: -20, width: 80, height: 40, rx: 10, fill: '#BFE3DF', stroke: K.coe, 'stroke-width': 3 }); T(t, 0, 8, 'NAD', 20, K.coe); at(t, 360, 80); arrow(s, 320, 100, 230, 140, K.coe, 3); arrow(s, 250, 120, 340, 80, K.coe, 3); }, ['W3', 'NAD', -0.2], ['W3', 'co-enzyme', -0.1], ['W3', 'niacin']],
  ['COFACTOR 3 · ZINC', 'Metal ion', 'IN CARBOXYPEPTIDASE', s => { enz(s, 248, 220, 0.8); zn(s, 248, 150, 32); }, ['W4', 'Zinc', -0.2], ['W4', 'metal'], ['W4', 'ion']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['bowl', 'Milk and curd', 'IN A BOWL', ['H1', 'bowl']], ['moon', 'A warm night', 'IT SETS', ['H1', 'warm']], ['snow', 'In the fridge', 'IT DOES NOT', ['H1', 'fridge']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Cold</span> only pauses. Heat destroys.', f: '<span class="lad">low temperature: <b>temporarily inactive</b> · high: <b>denatured</b></span>', t2: ['T1', 'Cold', -0.2], tf: ['T1', 'Heat'] },
  trap: { wrong: 'Low temperature destroys enzymes', right: 'Cold pauses enzymes; only heat denatures', tWrong: ['X2', 'low', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'temporarily', -0.2], tSvg: ['X3', 'high', -0.4],
    build: s => { enz(s, 130, 170, 0.6); P(s, 'M130,60 l0,40 M112,70 l36,20 M148,70 l-36,20', 'none', '#4A78C2', 4); cap(s, 130, 250, 'COLD · SHAPE KEPT', { 'font-size': 14 }); chain(s, Array.from({ length: 8 }, (_, i) => [260 + i * 26, 150 + 20 * Math.sin(i * 1.4)]), AA, 9); cap(s, 350, 250, 'HOT · SHAPE LOST', { 'font-size': 14 }); } },
  where: { type: 'Match questions on enzyme classes and cofactors; graph questions on temperature, pH and Vmax', at: ['E1', 'match'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Oxidoreductases<br><b>2</b>Transferases<br><b>3</b>Hydrolases<br><b>4</b>Ligases</div><div><span class="h">LIST II</span><br><b>p</b>Move a group, not hydrogen<br><b>q</b>Break bonds with water<br><b>r</b>Join two compounds<br><b>s</b>Move hydrogen or electrons</div></div>',
    opts: ['1-p, 2-s, 3-q, 4-r', '1-s, 2-p, 3-q, 4-r', '1-s, 2-q, 3-p, 4-r', '1-r, 2-p, 3-q, 4-s'], right: 1 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['1-s: oxidoreductases', ['A2', 'Oxidoreductases']], ['2-p: transferases', ['A2', 'Transferases']], ['3-q: hydrolases', ['A3', 'Hydrolases']], ['4-r: ligases', ['A3', 'ligases']]],
  recap: { title: 'Recap · enzyme activity, classes, cofactors', lines: ['<b>Factors</b>: temperature, pH, substrate amount, chemicals', '<b>Optimum</b>: cold pauses (inactive) · heat denatures', '<b>Vmax</b>: all enzymes busy · <b>malonate</b> blocks by look-alike', '<b>Six classes</b>: oxidoreductases to ligases · four-digit numbers', '<b>Cofactors</b>: prosthetic haem · co-enzyme NAD · zinc ion'] },
  yq: ['Why does a reaction stop speeding up at Vmax?', 'What is a competitive inhibitor?', 'How is a prosthetic group different from a co-enzyme?'],
  next: { label: 'NEXT · EP 75', topic: 'The Cell Cycle and its Phases' }
});
})();
