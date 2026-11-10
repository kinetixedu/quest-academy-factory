// PUC Biology Ep 82: The Light Reaction and Electron Transport (Living diagram, leaf green). Runner: ep.js + ph11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, svgIn, attr } = EP;
const { K, P, circ, T, at, arrow, pill, mol, sun, leaf, chloro, memb, prot, put } = H11;
const ICN = { ball: ['M3 20L21 8', 'M8 12a3 3 0 1 0 .1 0'], fall: ['M4 4h7v6', 'M11 10c0 4 2 6 2 10', 'M7 10c0 4 1 6 1 10', 'M15 20h6'], lamp: ['M12 3a5 5 0 0 0-3 9v3h6v-3a5 5 0 0 0-3-9Z', 'M10 18h4', 'M10 21h4'] };
const PS2 = '#3E9B5F', PS1 = '#2E7A8F';
const S = [];
const flash = (g, x, y) => { const G = mk(g, 'g', {}); P(G, `M${x},${y - 22} L${x - 8},${y} L${x + 2},${y} L${x - 6},${y + 22} L${x + 12},${y - 4} L${x + 2},${y - 4} L${x + 8},${y - 22} Z`, '#F6D77A', K.sug, 2.5); return G; };
// pigment cluster (antenna) of n dots around x,y radius r
const antenna = (g, x, y, r, n = 18, f = K.chlF) => { const G = mk(g, 'g', {}); const pts = []; for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n, rr = r * (k % 2 ? 0.62 : 1); const px = x + rr * Math.cos(a), py = y + rr * Math.sin(a); pts.push([px, py]); circ(G, px, py, r * 0.12, f, K.chlD, 2); } return { g: G, pts }; };

/* ---------- H: catching light ---------- */
S.push(EP.hook({ label: 'DIYA · A LEAF IN THE SUN', face: 'diya', pill: ['Catching light', ['H3', 'catch', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['How does a leaf catch light?', ['H3', 'catch']], ['Where does that energy go?', ['H3', 'energy']]],
  a: [['ANSWER 1', 'Pigments push electrons up', ['H4', 'Pigments']], ['ANSWER 2', 'Stored as they come down', ['H4', 'stored']]],
  chips: [['The light reaction', ['H5', 'light']], ['Two photosystems', ['H5', 'two']], ['The Z scheme', ['H5', 'Z']], ['Splitting of water', ['H5', 'splitting']]],
  build: (el, s) => {
    sun(s, 140, 150, 50); const lf = leaf(s, 300, 340, 400, 120);
    const rays = [0, 1, 2].map(k => P(s, `M${190 + k * 10},${200 + k * 30} L${380 + k * 60},${300 + k * 20}`, 'none', K.sug, 5, { 'stroke-dasharray': '12 10' }));
    const st = mk(s, 'g', {}); [0, 1, 2, 3].forEach(k => mk(st, 'rect', { x: 520 + k * 50, y: 140 + k * 40, width: 50, height: 6, fill: K.ink })); const e = mk(s, 'g', {}); mol.E(e);
    return { anim: t => { rays.forEach(r => attr(r, 'stroke-dashoffset', (-(t * 50) % 22).toFixed(1))); const u = ((t - 1) * 0.4) % 1; at(e, 520 + 200 * u + 25, 128 + 160 * Math.floor(u * 4) / 4 + (u * 4 % 1 < 0.2 ? -20 * Math.sin(u * 4 % 1 / 0.2 * Math.PI) : 0)); } };
  } }));

/* ---------- B: what is the light reaction ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS THE LIGHT REACTION?', pill: ['On the thylakoid membranes', ['B2', 'thylakoid', -0.1], 'ac'], build: (el, s) => {
  const ch = EP.chain(el, [['LIGHT ABSORBED', ['B3', 'light']], ['WATER SPLIT', ['B3', 'water']], ['OXYGEN RELEASED', ['B3', 'oxygen']], ['ATP + NADPH MADE', ['B3', 'ATP']]]);
  const m = memb(s, 200, 1400, 330); cap(s, 1480, 250, 'STROMA', { fill: C.mute }); cap(s, 1480, 420, 'LUMEN', { fill: C.mute });
  const p2 = prot(s, 520, 330, 120, 90, '#DCEFD9', PS2, 'PS II'), p1 = prot(s, 960, 330, 120, 90, '#D3E9EE', PS1, 'PS I'); const sn = sun(s, 300, 170, 34);
  const rays = [520, 960].map(x => P(s, `M330,190 L${x - 20},${300}`, 'none', K.sug, 4, { 'stroke-dasharray': '12 10' }));
  const w = put(s, 560, 450, g => pill(g, 'H₂O', K.o2, K.o2L)), o = put(s, 700, 450, mol.O2), a = put(s, 1120, 210, mol.ATP), n = put(s, 1240, 210, mol.NADPH);
  return { els: [[m, ['B2', 'thylakoid', -0.2], { dy: 0, fade: 0.4 }], [p2, ['B2', 'thylakoid'], POP], [p1, ['B2', 'thylakoid', 0.15], POP], [sn, ['B3', 'light', -0.2], POP], [w, ['B3', 'water'], POP], [o, ['B3', 'oxygen'], POP], [a, ['B3', 'ATP'], POP], [n, ['B3', 'NADPH'], POP]],
    anim: t => { ch.run(t, tm('B3')); rays.forEach(r => { r.style.opacity = t > tm(['B3', 'light']) ? 1 : 0; attr(r, 'stroke-dashoffset', (-(t * 50) % 22).toFixed(1)); }); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CHLOROPLAST', 'THYLAKOID MEMBRANE', 'PHOTOSYSTEM', 'REACTION CENTRE'], scales: ['x4,000', 'x100,000', 'x1,000,000', 'x5,000,000'], ghost: 'EXAMPLE FIGURES', nfs: 40,
  info: [['RUNG 1 OF 4', 'Chloroplast', 'Grana of thylakoids.', 'Light is caught here.'], ['RUNG 2 OF 4', 'Thylakoid membrane', 'Holds groups of pigments.', 'Each group: a photosystem.'], ['RUNG 3 OF 4', 'Photosystem', 'Antenna pigments catch light.', 'They pass the energy inward.'], ['RUNG 4 OF 4', 'Reaction centre', 'One chlorophyll a molecule.', 'Its electron jumps up.']],
  av: { who: 'Diya', text: 'Many catch, one reacts!', tin: ['Z4', 'centre', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 228, 60], build: g => { chloro(g, 528, 270, 380, 190, 5); return { labs: [[lab(g, 528, 236, 700, 70, 'Granum'), ['Z1', 'where']]] }; } },
    { at: 'Z2', focus: [400, 263, 70], build: g => { memb(g, 60, 1000, 263, 60); [400, 700].forEach(x => antenna(g, x, 263, 60, 14)); cap(g, 528, 140, 'STROMA', { fill: C.mute }); cap(g, 528, 400, 'LUMEN', { fill: C.mute });
      return { labs: [[lab(g, 700, 220, 640, 120, 'Group of pigments'), ['Z2', 'groups']]] }; } },
    { at: 'Z3', focus: [528, 263, 50], build: g => { const A = antenna(g, 528, 263, 200, 24); circ(g, 528, 263, 34, '#2E8B6E', K.ink, 3); const hop = circ(g, 0, 0, 10, '#F6D77A', K.sug, 2);
      return { labs: [[lab(g, 728, 263, 850, 120, 'Antenna pigments'), ['Z3', 'antenna']], [lab(g, 528, 263, 300, 470, 'Light harvesting complex', 'start'), ['Z3', 'light']]],
        anim: t => { const u = ((t - tm('Z3')) * 0.6) % 1, p = A.pts[Math.floor(((t - tm('Z3')) * 0.6)) % 24 * 7 % 24 || 0]; at(hop, p[0] + (528 - p[0]) * u, p[1] + (263 - p[1]) * u); } }; } },
    { at: 'Z4', build: g => { const A = antenna(g, 528, 263, 190, 24, '#CFE6C9'); circ(g, 528, 263, 70, '#2E8B6E', K.ink, 4); T(g, 528, 272, 'chl a', 28, '#FFFFFF'); const e = mk(g, 'g', {}); mol.E(e);
      return { labs: [[lab(g, 590, 230, 760, 150, 'Reaction centre'), ['Z4', 'reaction']]], anim: t => { const v = M.io((t - tm(['Z4', 'centre']) - 0.6) / 1); at(e, 528 + 60 * v, 263 - 200 * v, 0, 1.6); e.style.opacity = v > 0 ? 1 : 0; } }; } }] }));

/* ---------- L: the Z scheme ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
const ZP = [[150, 440], [230, 140], [420, 350], [480, 350], [560, 90], [700, 250]];
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'ONE ELECTRON · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['PS II absorbs 680 nm', 'an electron jumps up'], ['Down the cytochromes', 'the electron transport chain'], ['Reaches PS I', 'its energy is partly used'], ['PS I absorbs 700 nm', 'the electron jumps again'], ['NADP⁺ becomes NADPH', 'the path looks like a Z']], LT) }) },
  { pos: 'R', label: 'THE Z SCHEME', build: (el, s) => {
    P(s, 'M44,500 L44,90', 'none', K.ink, 3); P(s, 'M36,102 L44,90 L52,102', 'none', K.ink, 3); cap(s, 26, 300, 'ENERGY', { fill: K.ink, transform: 'rotate(-90 26 300)' });
    const segs = [0, 1, 2, 3, 4].map(i => P(s, `M${ZP[i][0]},${ZP[i][1]} L${ZP[i + 1][0]},${ZP[i + 1][1]}`, 'none', i === 0 || i === 3 ? K.sug : i === 2 ? K.e : K.e, 5, i === 0 || i === 3 ? { 'stroke-dasharray': '10 8' } : {}));
    const b2 = prot(s, 150, 470, 100, 50, '#DCEFD9', PS2, 'P680', 18), b1 = prot(s, 450, 380, 100, 50, '#D3E9EE', PS1, 'P700', 18); const cy = [0, 1, 2].map(k => prot(s, 270 + k * 50, 190 + k * 52, 36, 36, '#EADBC8', K.cyt, '', 14));
    const f2 = flash(s, 110, 380), f1 = flash(s, 420, 260); const nd = put(s, 700, 290, mol.NADPH); const e = mk(s, 'g', {}); mol.E(e);
    const zl = T(s, 600, 470, 'Z', 70, C.ac, { opacity: 0.9 });
    return { els: [[b2, ['L2', 'Photosystem'], POP], [f2, ['L2', 'red'], POP], [segs[0], ['L2', 'jumps']], [segs[1], ['L3', 'chain', -0.6]], ...cy.map((c, i) => [c, ['L3', 'cytochromes', i * 0.15], POP]), [b1, ['L4', 'photosystem'], POP], [f1, ['L5', 'seven', -0.2], POP], [segs[3], ['L5', 'jumps']], [segs[4], ['L6', 'moves']], [nd, ['L6', 'NADPH'], POP], [zl, ['L6', 'Z', -0.1], POP], [segs[2], ['L4', 'reaches']]],
      labs: [[lab(s, 270, 190, 330, 120, 'Cytochromes'), ['L3', 'cytochromes']], [lab(s, 230, 140, 250, 64, 'Acceptor'), ['L3', 'acceptor']]],
      anim: t => { const ts = LT.map(tm); const seg = (i, a, d) => [i, M.io((t - a) / d)]; let pos = ZP[0];
        const legs = [[0, ts[0] + 1.2, 1], [1, ts[1] + 1.5, 2.5], [2, ts[2] + 0.2, 1], [3, ts[3] + 1.5, 1], [4, ts[4] + 0.6, 1.5]];
        legs.forEach(([i, a, d]) => { const v = M.io((t - a) / d); if (t >= a) pos = [ZP[i][0] + (ZP[i + 1][0] - ZP[i][0]) * v, ZP[i][1] + (ZP[i + 1][1] - ZP[i][1]) * v]; });
        at(e, pos[0], pos[1] - 16); e.style.opacity = t > ts[0] ? 1 : 0; } }; } }] });

/* ---------- C: water splitting ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'WHO REFILLS PHOTOSYSTEM II? · SPLITTING OF WATER', build: (el, s) => {
  const eq = div(el, '', { position: 'absolute', left: '36px', top: '96px', width: '1528px', textAlign: 'center', font: "700 46px Poppins", color: C.ink }, `<span style="color:${K.o2}">2H₂O</span> → <span style="color:${K.h}">4H⁺</span> + <span style="color:${K.o2}">O₂</span> + <span style="color:${K.e}">4e⁻</span>`);
  const m = memb(s, 120, 1480, 300, 40); const p2 = prot(s, 1100, 300, 160, 110, '#DCEFD9', PS2, 'PS II', 26); cap(s, 1530, 230, 'STROMA', { fill: C.mute, 'text-anchor': 'end' }); cap(s, 1530, 400, 'LUMEN', { fill: C.mute, 'text-anchor': 'end' });
  const W = [0, 1].map(k => { const g = mk(s, 'g', {}); circ(g, 0, 0, 30, K.o2L, K.o2, 3); circ(g, -30, 22, 16, '#FFFFFF', K.ink, 2.5); circ(g, 30, 22, 16, '#FFFFFF', K.ink, 2.5); return g; });
  const Hs = [0, 1, 2, 3].map(() => put(s, 0, 0, mol.H)), Es = [0, 1, 2, 3].map(() => put(s, 0, 0, mol.E)); const O = put(s, 0, 0, mol.O2);
  const v = div(el, 'pillp ac', { left: '36px', top: '494px' }, 'The oxygen we breathe comes from water');
  return { els: [[eq, ['C2', 'molecules', -0.5], { dy: 10 }], [m, ['C1', 'But'], { dy: 0, fade: 0.3 }], [p2, ['C1', 'Photosystem'], POP], [v, ['C3', 'oxygen', -0.1]]],
    anim: t => { const a = tm(['C2', 'split', 0, 1]), sp = M.io((t - a) / 1), go = M.io((t - tm(['C3', 'refill'])) / 1.4), up = M.io((t - tm(['C3', 'oxygen'])) / 1.4), vis = t > tm(['C2', 'Water']) - 0.1;
      W.forEach((g, k) => { at(g, 420 + k * 160, 420); g.style.opacity = vis ? (1 - sp).toFixed(2) : 0; });
      Hs.forEach((g, k) => { at(g.parentNode, 340 + k * 110, 460 + 20 * (k % 2)); g.style.opacity = sp.toFixed(2); });
      Es.forEach((g, k) => { const x0 = 360 + k * 110, y0 = 400; at(g.parentNode, x0 + (1040 + k * 40 - x0) * go, y0 + (360 - y0) * go); g.style.opacity = (sp * (1 - M.clamp((go - 0.9) * 10))).toFixed(2); });
      at(O.parentNode, 500 - 240 * up, 420 - 200 * up); O.style.opacity = sp.toFixed(2); } }; } }] });

/* ---------- D: PS II vs PS I ---------- */
const psCard = (name, col, light, rc, wl, job, tin, pillSp) => ({ pos: name === 'II' ? 'L' : 'R', label: 'PHOTOSYSTEM ' + name, tin, pill: [job, pillSp, 'ac'], build: (el, s) => {
  const A = antenna(s, 392, 230, 130, 20, light); const c = circ(s, 392, 230, 52, col, K.ink, 4); T(s, 392, 240, rc, 28, '#FFFFFF');
  const w = div(el, 'chp', { left: '36px', top: '400px' }, `Absorbs best at ${wl} nm`); return { els: [[A.g, tin, { dy: 0, fade: 0.4 }], [w, [tin[0], name === 'II' ? 'six' : 'seven', 0, 1]]] }; } });
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [psCard('II', PS2, '#CFE6C9', 'P680', 680, 'Linked with splitting water', ['D2', null, -0.2], ['D2', 'water', -0.1]), psCard('I', PS1, '#CBE3E8', 'P700', 700, 'Passes electrons to NADP⁺', ['D3', null, -0.2], ['D3', 'passes', -0.1])] });

/* ---------- U: names vs order + think ---------- */
const TH = { q: 'Which photosystem is linked with splitting water?', opts: ['Photosystem I', 'Photosystem II'], right: 1, why: 'Photosystem II. Its lost electrons are refilled from water.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'NUMBERED BY DISCOVERY', tout: 'U4', build: (el, s) => { const a = div(el, 'pillp', { left: '60px', top: '140px' }, '1st discovered: PS I'), b = div(el, 'pillp', { left: '60px', top: '220px' }, '2nd discovered: PS II');
    const n = div(el, 'chp', { left: '60px', top: '330px' }, 'Names = order of discovery'); return { els: [[a, ['U2', 'numbered']], [b, ['U2', 'discovered']], [n, ['U2', 'not', -0.1]]] }; } },
  { pos: 'R', label: 'ORDER OF WORK', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => { const p2 = prot(s, 200, 260, 170, 110, '#DCEFD9', PS2, 'PS II', 28), p1 = prot(s, 584, 260, 170, 110, '#D3E9EE', PS1, 'PS I', 28), ar = arrow(s, 300, 260, 484, 260, K.e, 5);
    cap(s, 200, 360, 'WORKS FIRST', { fill: PS2 }); cap(s, 584, 360, 'WORKS SECOND', { fill: PS1 }); return { els: [[p2, ['U3', 'two'], POP], [ar, ['U3', 'first'], { dy: 0, fade: 0.3 }], [p1, ['U3', 'one'], POP]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'one', -0.1], why: ['U5', 'Photosystem'] })] });

/* ---------- W: count electrons ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · ELECTRONS FOR ONE OXYGEN MOLECULE', svg: false, build: el => {
  const col = (i, h, n, c, tH, tN, tC, draw) => { const e = div(el, 'colW', { left: 36 + i * 516 + 'px' }, `<div class="ch2">${h}</div><div class="dz"></div><div class="it"><div class="inm">${n}</div><div class="inc">${c}</div></div>`); const s = svgIn(e.querySelector('.dz'), 496, 290); draw(s);
    return [[e, ['W1', null, 0.3 + i * 0.06], { dy: 12 }], [s, tH, { ...POP, sc: 0.8 }], [e.querySelector('.it'), tN, { dy: -16, sp: M.SOFT, fade: 0.1 }], [e.querySelector('.inc'), tC, { dy: 6 }]]; };
  const row = (s, n, y, f) => { for (let k = 0; k < n; k++) put(s, 248 - (n - 1) * 30 + k * 60, y, f); };
  return { els: [
    ...col(0, 'STEP 1 · SPLIT WATER', '2H₂O → O₂ + 4e⁻', 'ONE O₂ GIVES FOUR ELECTRONS', ['W2', 'Splitting', -0.2], ['W2', 'one'], ['W2', 'four'], s => { put(s, 248, 90, mol.O2); row(s, 4, 190, mol.E); }),
    ...col(1, 'STEP 2 · ONE NADPH', 'NADP⁺ + 2e⁻ → NADPH', 'EACH NEEDS TWO ELECTRONS', ['W3', 'Each', -0.2], ['W3', 'NADP'], ['W3', 'two'], s => { row(s, 2, 90, mol.E); arrow(s, 248, 120, 248, 170, K.ink, 3); put(s, 248, 210, mol.NADPH); }),
    ...col(2, 'STEP 3 · DIVIDE', '4 ÷ 2 = 2', 'ONE O₂ GOES WITH TWO NADPH', ['W4', 'Four', -0.2], ['W4', 'divided'], ['W4', 'oxygen'], s => { put(s, 140, 140, mol.O2); T(s, 220, 150, '↔', 40, C.ink); put(s, 320, 110, mol.NADPH); put(s, 320, 170, mol.NADPH); })] }; } }] });

EP.run({
  icons: ICN,
  jobs: [['ball', 'A ball rolls down', 'UP, THEN DOWN', ['H1', 'Kick']], ['fall', 'A waterfall turns a wheel', 'FALLING WATER WORKS', ['H1', 'waterfall']], ['lamp', 'A solar lamp', 'CHARGES BY DAY', ['H1', 'solar']]],
  scenes: S,
  stmt: { l2: 'Up, down, up, down. The <span class="acc">Z scheme</span>.', f: '<span class="lad">H₂O → <b>PS II</b> → cytochromes → <b>PS I</b> → NADPH</span>', t2: ['T1', 'Up', -0.2], tf: ['T1', 'Z'] },
  trap: { wrong: 'Photosystem I works first', right: 'Photosystem II works first in the Z scheme', tWrong: ['X2', 'photosystem', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'In', -0.2], tSvg: ['X3', 'works', -0.4],
    build: s => { prot(s, 120, 120, 120, 70, '#DCEFD9', PS2, 'PS II', 24); arrow(s, 190, 120, 250, 120, K.e, 4); prot(s, 330, 120, 120, 70, '#D3E9EE', PS1, 'PS I', 24); cap(s, 230, 210, 'NUMBERS = ORDER OF DISCOVERY', { 'font-size': 14 }); } },
  where: { type: 'Assertion reason and statement questions on P680, P700 and water splitting', at: ['E1', 'assertion'] },
  mcq: { q: '<div style="font:500 23px Poppins;line-height:1.45"><b>Assertion (A):</b> Photosystem II needs water splitting to keep working.<br><b>Reason (R):</b> Splitting of water gives electrons that replace those lost by the reaction centre of PS II.<br><span style="color:#6B7280;font-size:20px">R explains = R is the correct reason for A</span></div>', opts: ['Both true, R explains', 'Both true, R does not', 'A true, R false', 'A false, R true'], right: 0, optFs: 27 }, mcqAt: ['Q1', 'assertion', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['PS II loses electrons to light', ['A2', 'loses']], ['It needs a steady supply', ['A2', 'steady']], ['Water splitting replaces them', ['A3', 'replace']], ['So R explains A', ['A3', 'reason']]],
  recap: { title: 'Recap · the light reaction', lines: ['<b>Light reaction</b>: light absorbed, water split, O₂, ATP + NADPH', '<b>Photosystem</b>: antenna pigments + one reaction centre', '<b>PS II</b>: P680 · splits water · <b>PS I</b>: P700 · makes NADPH', '<b>Z scheme</b>: PS II → cytochromes → PS I → NADP⁺', '<b>Water</b>: 2H₂O → 4H⁺ + O₂ + 4e⁻'] },
  yq: ['What is a reaction centre?', 'Why is it called the Z scheme?', 'Which photosystem splits water, and what is released?'],
  next: { label: 'NEXT · EP 83', topic: 'Photophosphorylation and Chemiosmosis' }
});
})();
