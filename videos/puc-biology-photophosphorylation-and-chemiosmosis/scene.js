// PUC Biology Ep 83: Photophosphorylation and Chemiosmosis (Living diagram, leaf green). Runner: ep.js + ph11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, svgIn, attr } = EP;
const { K, P, circ, T, at, arrow, pill, mol, sun, chloro, memb, prot, synth, put } = H11;
const ICN = { dam: ['M3 20h18', 'M6 20V8l6-2v14', 'M12 10h9', 'M14 14h7'], wheel: ['M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0', 'M12 5v14', 'M5 12h14'], balloon: ['M12 3a5 6 0 1 0 .1 0', 'M12 15l-1 2h2Z', 'M12 17c-2 2 2 3 0 5'] };
const PS2 = '#3E9B5F', PS1 = '#2E7A8F';
const S = [];
const thyl = (g, cx, cy, rx, ry) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx, cy, rx, ry, fill: '#EEF6E8', stroke: K.chlD, 'stroke-width': 14 }); mk(G, 'ellipse', { cx, cy, rx, ry, fill: 'none', stroke: K.chlF, 'stroke-width': 8 }); return G; };

/* ---------- H: the dam ---------- */
S.push(EP.hook({ label: "AARAV'S SCHOOL TRIP · THE DAM", face: 'aarav', pill: ['Water held high', ['H1', 'dam', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Does a leaf have a dam inside it?', ['H3', 'inside']], ['How does it make ATP?', ['H3', 'ATP']]],
  a: [['ANSWER 1', 'Yes: protons piled up inside', ['H4', 'piles']], ['ANSWER 2', 'A tiny machine makes ATP', ['H4', 'machine']]],
  chips: [['Photophosphorylation', ['H5', 'photophosphorylation']], ['Cyclic and non cyclic', ['H5', 'cyclic']], ['Chemiosmosis', ['H5', 'chemiosmotic']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 40, y: 200, width: 330, height: 280, fill: '#9CC9E4' }); P(s, 'M370,140 L450,140 L470,480 L350,480 Z', '#C9C2B0', K.ink, 4); mk(s, 'rect', { x: 450, y: 440, width: 300, height: 40, fill: '#BFDDEE' });
    mk(s, 'rect', { x: 0, y: 480, width: 784, height: 20, fill: '#9E7B55' }); const wh = mk(s, 'g', {}); circ(wh, 0, 0, 46, '#FFFFFF', K.ink, 4); for (let k = 0; k < 6; k++) P(wh, `M0,0 L${46 * Math.cos(k * Math.PI / 3)},${46 * Math.sin(k * Math.PI / 3)}`, 'none', K.ink, 4);
    const jet = P(s, 'M450,430 C500,430 520,430 560,420', 'none', '#5AA0C8', 14, { 'stroke-dasharray': '18 10' }); cap(s, 205, 180, 'WATER HELD HIGH', { fill: C.ink });
    return { anim: t => { at(wh, 600, 400, (t * 160) % 360); attr(jet, 'stroke-dashoffset', (-(t * 80) % 28).toFixed(1)); } };
  } }));

/* ---------- B: the long word ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'PHOTOPHOSPHORYLATION · ONE WORD, TWO PARTS', build: (el, s) => {
  const w1 = div(el, 'pillp ac', { left: '60px', top: '120px' }, 'PHOTO = light'), w2 = div(el, 'pillp ink', { left: '60px', top: '200px' }, 'PHOSPHORYLATION = adding a phosphate');
  const adp = put(s, 820, 300, g => pill(g, 'ADP', K.atp, K.atpL, 90)), ph = put(s, 960, 300, g => { circ(g, 0, 0, 26, '#FFFFFF', K.atp, 3); T(g, 0, 7, 'P', 22, K.atp); }), atp = put(s, 1250, 300, g => pill(g, 'ATP', K.atp, null, 100));
  const pl = T(s, 890, 309, '+', 36, C.ink), ar = arrow(s, 1010, 300, 1170, 300, K.ink, 4); const sn = sun(s, 1090, 200, 30);
  return { els: [[adp, ['B2', 'ADP'], POP], [pl, ['B2', 'adding', -0.1]], [ph, ['B2', 'phosphate', -0.2], POP], [ar, ['B2', 'phosphorylation'], { dy: 0, fade: 0.3 }], [atp, ['B2', 'phosphorylation', 0.3], POP], [w2, ['B2', 'phosphorylation', -0.1]], [sn, ['B3', 'light'], POP], [w1, ['B3', 'Photo', -0.1]]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CHLOROPLAST', 'THYLAKOID', 'MEMBRANE', 'ATP SYNTHASE'], scales: ['x4,000', 'x40,000', 'x400,000', 'x2,000,000'], ghost: 'EXAMPLE FIGURES', nfs: 42,
  info: [['RUNG 1 OF 4', 'Chloroplast', 'Grana are stacks of', 'flat sacs: thylakoids.'], ['RUNG 2 OF 4', 'Thylakoid', 'Inside: the lumen.', 'Outside: the stroma.'], ['RUNG 3 OF 4', 'Membrane', 'A thin wall between', 'the lumen and the stroma.'], ['RUNG 4 OF 4', 'ATP synthase', 'CF0: a channel.', 'CF1: makes ATP.']],
  av: { who: 'Aarav', text: 'So that is the turbine!', tin: ['Z4', 'stroma', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 236, 60], build: g => { chloro(g, 528, 270, 380, 190, 5); return { labs: [[lab(g, 528, 236, 700, 70, 'Thylakoids in a granum'), ['Z2', 'thylakoids', -0.6]]] }; } },
    { at: 'Z2', focus: [528, 140, 50], build: g => { thyl(g, 528, 270, 380, 130); return { labs: [[lab(g, 528, 300, 700, 330, 'Lumen'), ['Z2', 'lumen']], [lab(g, 900, 120, 960, 60, 'Stroma', 'end'), ['Z2', 'stroma']]] }; } },
    { at: 'Z3', focus: [528, 263, 60], build: g => { memb(g, 0, 1056, 263, 70); cap(g, 528, 150, 'STROMA', { fill: C.mute }); cap(g, 528, 390, 'LUMEN', { fill: C.mute }); return { labs: [[lab(g, 300, 240, 220, 80, 'Thylakoid membrane', 'start'), ['Z3', 'membrane']]] }; } },
    { at: 'Z4', build: g => { memb(g, 0, 1056, 360, 70); const sy = mk(g, 'g', { transform: 'translate(528 360) scale(2) translate(-528 -360)' }); const A = synth(sy, 528, 360); cap(g, 900, 230, 'STROMA', { fill: C.mute }); cap(g, 900, 470, 'LUMEN', { fill: C.mute });
      return { labs: [[lab(g, 580, 360, 760, 420, 'CF0 · channel'), ['Z4', 'zero']], [lab(g, 560, 160, 680, 110, 'CF1 · in the stroma'), ['Z4', 'one']]] }; } }] }));

/* ---------- L: chemiosmosis ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'CHEMIOSMOSIS · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Water splits inside', 'its protons stay in the lumen'], ['Protons carried in', 'from the stroma to the lumen'], ['NADP reductase', 'uses stroma protons for NADPH'], ['A proton gradient', 'the lumen becomes more acidic'], ['Protons rush out', 'through CF0 · CF1 makes ATP']], LT) }) },
  { pos: 'R', label: 'THE THYLAKOID MEMBRANE', build: (el, s) => {
    const MY = 290; mk(s, 'rect', { x: 0, y: MY + 20, width: 784, height: 270, fill: '#EEF6E8' }); const lt = mk(s, 'rect', { x: 0, y: MY + 20, width: 784, height: 270, fill: K.h, opacity: 0 });
    memb(s, 0, 784, MY, 40); cap(s, 740, 110, 'STROMA', { fill: C.mute, 'text-anchor': 'end' }); cap(s, 740, 540, 'LUMEN', { fill: C.mute, 'text-anchor': 'end' });
    prot(s, 120, MY, 90, 80, '#DCEFD9', PS2, 'PS II', 18); prot(s, 250, MY, 60, 60, '#EADBC8', K.cyt, 'cyt', 15); prot(s, 380, MY, 90, 80, '#D3E9EE', PS1, 'PS I', 18); const nr = prot(s, 470, MY - 70, 90, 46, '#F3E2B3', K.sug, 'NADP red.', 13);
    const sy = synth(s, 640, MY); const w = put(s, 120, MY + 90, g => pill(g, 'H₂O', K.o2, K.o2L));
    const L = Array.from({ length: 14 }, (_, k) => put(s, 70 + (k % 7) * 80 + (Math.floor(k / 7) ? 40 : 0), MY + 140 + Math.floor(k / 7) * 70, mol.H));
    const Sx = Array.from({ length: 8 }, (_, k) => put(s, 90 + k * 70, 150 + (k % 2) * 40, mol.H)); const fl = [0, 1, 2].map(() => put(s, 0, 0, mol.H)); const at2 = [0, 1, 2].map(() => put(s, 0, 0, mol.ATP)); const nd = put(s, 360, 200, mol.NADPH);
    const many = div(el, 'chp', { left: '36px', top: '506px', background: K.h, color: '#fff' }, 'Many H⁺ in the lumen'), few = div(el, 'chp', { left: '36px', top: '90px' }, 'Few H⁺ in the stroma');
    return { els: [[w, ['L2', 'Water'], POP], [nd, ['L4', 'NADPH'], POP], [many, ['L5', 'many']], [few, ['L5', 'few']]], labs: [[lab(s, 640, MY, 560, 470, 'CF0', 'end'), ['L6', 'zero']], [lab(s, 614, MY - 96, 556, 130, 'CF1', 'end'), ['L6', 'one']]],
      anim: t => { const ts = LT.map(tm);
        L.forEach((g, k) => { const tk = k < 4 ? ts[0] + 0.6 + k * 0.2 : k < 10 ? ts[1] + 1 + (k - 4) * 0.35 : ts[3] - 0.5 + (k - 10) * 0.2; g.style.opacity = t > tk ? 1 : 0; });
        Sx.forEach((g, k) => { const tk = k < 6 ? ts[1] + 0.8 + k * 0.35 : ts[2] + 0.8 + (k - 6) * 0.4; g.style.opacity = t > tk ? 0 : 1; });
        lt.style.opacity = (0.12 * M.clamp((t - ts[3]) / 1.5)).toFixed(3);
        const r = t - ts[4] - 0.4; fl.forEach((g, k) => { const u = ((r * 0.6) + k / 3) % 1; at(g.parentNode, 640, MY + 120 - 300 * u); g.style.opacity = r > 0 ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });
        attr(sy.head, 'transform', r > 0 ? `rotate(${(r * 120).toFixed(1)} 640 ${MY - 92})` : ''); at2.forEach((g, k) => { const u = M.io((r - k * 0.9) / 1); at(g.parentNode, 680 + 50 * u, MY - 140 + (150 + k * 44 - MY + 140) * u); g.style.opacity = r - k * 0.9 > 0 ? 1 : 0; }); } }; } }] });

/* ---------- C: four needs ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'CHEMIOSMOSIS NEEDS FOUR THINGS', build: (el, s) => {
  const tile = (i, name, draw, sp) => { const x = 60 + i * 380; const G = mk(s, 'g', {}); mk(G, 'rect', { x, y: 100, width: 340, height: 300, rx: 18, fill: '#F7F9F4', stroke: '#CBD0DA', 'stroke-width': 2 }); draw(G, x + 170); T(G, x + 170, 370, name, 24, C.ink); return [G, sp, { dy: 16 }]; };
  const t = [tile(0, '1 · A membrane', (g, x) => memb(g, x - 130, x + 130, 230, 40), ['C2', 'membrane']),
    tile(1, '2 · A proton pump', (g, x) => { memb(g, x - 130, x + 130, 230, 40); prot(g, x, 230, 70, 70, '#DCEFD9', PS2, '', 14); arrow(g, x, 160, x, 300, K.h, 4); put(g, x + 50, 170, mol.H); }, ['C2', 'pump']),
    tile(2, '3 · A proton gradient', (g, x) => { memb(g, x - 130, x + 130, 200, 30); put(g, x, 160, mol.H); for (let k = 0; k < 6; k++) put(g, x - 100 + k * 40, 260 + (k % 2) * 30, mol.H); }, ['C2', 'gradient']),
    tile(3, '4 · ATP synthase', (g, x) => { memb(g, x - 130, x + 130, 270, 40); synth(g, x, 270); }, ['C3', 'ATP'])];
  const m = div(el, 'chp', { left: '60px', top: '470px' }, 'Mitochondria: protons pile up between the two membranes');
  return { els: [...t, [m, ['C3', 'mitochondria', -0.1]]] }; } }] });

/* ---------- D: non cyclic vs cyclic ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'NON CYCLIC · PS II AND PS I IN SERIES', tin: ['D2', null, -0.2], pill: ['ATP and NADPH', ['D2', 'Both', -0.1], 'ac'], build: (el, s) => {
    const a = prot(s, 150, 280, 120, 80, '#DCEFD9', PS2, 'PS II', 22), b = prot(s, 392, 280, 120, 80, '#D3E9EE', PS1, 'PS I', 22), c = put(s, 640, 280, g => pill(g, 'NADP⁺', K.nad, K.nadL)); const a1 = arrow(s, 214, 280, 326, 280, K.e, 5), a2 = arrow(s, 456, 280, 580, 280, K.e, 5);
    const o1 = put(s, 300, 410, mol.ATP), o2 = put(s, 480, 410, mol.NADPH);
    return { els: [[a, ['D2', 'two', -0.1], POP], [b, ['D2', 'one'], POP], [a1, ['D2', 'series'], { dy: 0, fade: 0.3 }], [c, ['D2', 'NADP'], POP], [a2, ['D2', 'NADP', -0.2], { dy: 0, fade: 0.3 }], [o1, ['D2', 'ATP'], POP], [o2, ['D2', 'NADPH'], POP]] }; } },
  { pos: 'R', label: 'CYCLIC · ONLY PS I', tin: ['D3', null, -0.2], pill: ['Only ATP, no NADPH', ['D3', 'Only', -0.1, 1], 'ac'], build: (el, s) => {
    const b = prot(s, 392, 300, 140, 90, '#D3E9EE', PS1, 'PS I', 24); const loop = P(s, 'M462,280 C620,200 600,90 392,90 C200,90 170,200 322,280', 'none', K.e, 5, { 'stroke-dasharray': '14 10' }); arrow(s, 300, 262, 322, 280, K.e, 5);
    const e = put(s, 0, 0, mol.E); const o1 = put(s, 300, 430, mol.ATP), o2 = put(s, 480, 430, mol.NADPH); const x = P(s, 'M440,410 L520,450 M520,410 L440,450', 'none', K.red, 5);
    return { els: [[b, ['D3', 'Only'], POP], [loop, ['D3', 'round', -0.2], { dy: 0, fade: 0.3 }], [o1, ['D3', 'ATP'], POP], [o2, ['D3', 'NADPH', -0.3], POP], [x, ['D3', 'NADPH'], POP]], anim: t => { const v = ((t - tm(['D3', 'round'])) * 0.35) % 1; const q = H11.pt(loop, v); at(e.parentNode, q.x, q.y); e.style.opacity = t > tm(['D3', 'round']) ? 1 : 0; } }; } }] });

/* ---------- U: where cyclic happens + think ---------- */
const TH = { q: 'Does cyclic photophosphorylation make NADPH?', opts: ['Yes', 'No'], right: 1, why: 'No. Cyclic flow makes only ATP.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'WHERE · STROMA LAMELLAE', tout: 'U4', build: (el, s) => { const c = chloro(s, 392, 250, 320, 150, 4); const ring = circ(s, c.lam[0], c.lam[1], 40, 'none', C.ac, 5); attr(ring, 'stroke-dasharray', '10 8');
    const a = div(el, 'pillp bad', { left: '60px', top: '440px' }, 'No PS II'), b = div(el, 'pillp bad', { left: '260px', top: '440px' }, 'No NADP reductase');
    return { els: [[c.g, ['U1', 'Where'], { dy: 10 }], [ring, ['U2', 'stroma'], POP], [a, ['U2', 'photosystem', -0.1]], [b, ['U2', 'NADP', -0.1]]], labs: [[lab(s, c.lam[0], c.lam[1] + 40, 520, 140, 'Stroma lamellae'), ['U2', 'lamellae']]] }; } },
  { pos: 'R', label: 'LIGHT BEYOND 680 nm', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const SPEC = ['#7B4B94', '#4A78C2', '#3E9B5F', '#E2C93C', '#E0893B', '#C8323C']; SPEC.forEach((c, i) => mk(s, 'rect', { x: 92 + i * 100, y: 220, width: 100, height: 60, fill: c }));
    ['400', '500', '600', '700'].forEach((n, i) => cap(s, 92 + i * 200, 326, n, { fill: C.mute })); const x680 = 92 + 280 / 300 * 600; const hl = mk(s, 'rect', { x: x680, y: 200, width: 692 - x680 + 0, height: 100, fill: 'none', stroke: K.ink, 'stroke-width': 4, 'stroke-dasharray': '10 6' });
    const c = cap(s, x680, 190, '680 nm', { fill: K.ink }); const p = div(el, 'pillp ac', { left: '36px', top: '400px' }, 'Only PS I works · cyclic flow');
    return { els: [[hl, ['U3', 'beyond'], POP], [c, ['U3', 'six'], POP], [p, ['U3', 'available', -0.2]]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Yes', -0.1], why: ['U5', 'No'] })] });

/* ---------- W: four clues ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · FOUR CLUES · CYCLIC OR NON CYCLIC?', svg: false, build: el => {
  const tray = div(el, '', { position: 'absolute', left: '36px', top: '96px', width: '480px', height: '440px', borderRadius: '16px', background: '#F7F9F4', border: '2px solid #CBD0DA' }, `<div class="lbl" style="left:24px;top:20px">THE CLUES</div>`);
  const b1 = div(el, '', { position: 'absolute', left: '548px', top: '96px', width: '492px', height: '440px', borderRadius: '16px', background: '#F1F8F3', border: '2px dashed ' + PS2 }, `<div class="lbl" style="left:24px;top:20px;color:${PS2}">NON CYCLIC · PS II + PS I</div>`);
  const b2 = div(el, '', { position: 'absolute', left: '1072px', top: '96px', width: '492px', height: '440px', borderRadius: '16px', background: '#EEF5F7', border: '2px dashed ' + PS1 }, `<div class="lbl" style="left:24px;top:20px;color:${PS1}">CYCLIC · ONLY PS I</div>`);
  const clues = [['1 · Oxygen is released', 0, ['W2', 'oxygen'], 'Needs water splitting'], ['2 · Happens in stroma lamellae', 1, ['W2', 'stroma'], 'No PS II there'], ['3 · Both ATP and NADPH made', 0, ['W3', 'Both'], 'Electrons reach NADP⁺'], ['4 · Only light beyond 680 nm', 1, ['W4', 'only'], 'PS II cannot work']];
  const cnt = [0, 0]; const ch = clues.map(([s, bin, sp, w], i) => { const slot = cnt[bin]++; const y0 = 160 + i * 90;
    const e = div(el, 'chp', { left: '60px', top: y0 + 'px', width: '432px' }, `<span class="tk" style="display:inline-block;width:22px;color:${C.ac};font-weight:700"></span>${s}`);
    const b = div(el, '', { position: 'absolute', left: '60px', top: y0 + 'px', width: '444px', height: '96px', borderRadius: '12px', background: bin ? '#D3E9EE' : '#DCEFD9', padding: '12px 18px', boxSizing: 'border-box', font: "600 22px Poppins", color: C.ink, whiteSpace: 'nowrap' }, `${s.slice(4)}<div style="font:500 18px Poppins;color:${C.mute};margin-top:6px">${w}</div>`);
    return { e, b, bin, slot, sp, y0 }; });
  return { els: [[tray, ['W1', null, 0.2], { dy: 12 }], [b1, ['W1', null, 0.3], { dy: 12 }], [b2, ['W1', null, 0.4], { dy: 12 }], ...ch.map(c => [c.e, [c.sp[0], c.sp[1], -0.3], { dx: -16, dy: 0 }])],
    anim: t => ch.forEach(c => { const a = tm(c.sp) + 0.9, v = M.io((t - a) / 0.8); const x1 = (c.bin ? 1072 : 548) + 24, y1 = 160 + c.slot * 120;
      c.b.style.left = (60 + (x1 - 60) * v).toFixed(1) + 'px'; c.b.style.top = (c.y0 + (y1 - c.y0) * v).toFixed(1) + 'px'; c.b.style.opacity = t > a ? 1 : 0;
      const done = t > a + 0.8; c.e.style.opacity = t < tm(c.sp) - 0.3 ? 0 : done ? 0.55 : 1; c.e.querySelector('.tk').textContent = done ? '✓' : ''; }) }; } }] });

EP.run({
  icons: ICN,
  jobs: [['dam', 'A dam holds water high', 'BEHIND A WALL', ['H1', 'dam']], ['wheel', 'It spins a turbine', 'WHEN LET THROUGH', ['H1', 'turbine']], ['balloon', 'A balloon lets air out', 'SPINS A PINWHEEL', ['H1', 'balloon']]],
  scenes: S,
  stmt: { l2: 'Protons pile up in the <span class="acc">lumen</span>.', f: '<span class="lad">lumen: many H⁺ → <b>CF0</b> → stroma · <b>CF1</b> makes ATP</span>', t2: ['T1', 'Protons', -0.2], tf: ['T1', 'lumen'] },
  trap: { wrong: 'Protons pile up in the stroma', right: 'Protons pile up in the lumen, then flow out through CF0', tWrong: ['X2', 'protons', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'lumen', -0.2], tSvg: ['X3', 'one', -0.4],
    build: s => { memb(s, 40, 420, 110, 30); synth(s, 330, 110); for (let k = 0; k < 6; k++) put(s, 80 + k * 36, 160 + (k % 2) * 26, mol.H); cap(s, 230, 240, 'H⁺ IN THE LUMEN · ATP IN THE STROMA', { 'font-size': 13 }); } },
  where: { type: 'Statement and match questions on CF0, CF1, the lumen and cyclic flow', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Water splits on the inner side of the thylakoid membrane.<br>II. The lumen becomes more acidic than the stroma.<br>III. Cyclic photophosphorylation makes NADPH.<br>IV. CF1 makes ATP on the stroma side.</div>', opts: ['I and III only', 'II and III only', 'I, II and IV only', 'I, II, III and IV'], right: 2 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['I: water splits on the inner side', ['A2', 'Water']], ['II: the lumen is more acidic', ['A2', 'acidic']], ['IV: CF1 makes ATP in the stroma', ['A2', 'CF']], ['III is wrong: cyclic makes no NADPH', ['A3', 'cyclic']]],
  recap: { title: 'Recap · photophosphorylation', lines: ['<b>Photophosphorylation</b>: ADP + phosphate → ATP, using light', '<b>Non cyclic</b>: PS II + PS I · ATP and NADPH', '<b>Cyclic</b>: only PS I · stroma lamellae · only ATP', '<b>Gradient</b>: H⁺ pile up in the lumen · lumen more acidic', '<b>ATP synthase</b>: H⁺ flow through CF0 · CF1 makes ATP'] },
  yq: ['What is photophosphorylation?', 'How is cyclic flow different from non cyclic?', 'Name the four things chemiosmosis needs.'],
  next: { label: 'NEXT · EP 84', topic: 'The Calvin Cycle' }
});
})();
