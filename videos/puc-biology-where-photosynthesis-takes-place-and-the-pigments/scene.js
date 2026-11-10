// PUC Biology Ep 81: Where Photosynthesis Takes Place and the Pigments (Living diagram, leaf green). Runner: ep.js + ph11.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, svgIn, attr } = EP;
const { K, P, circ, T, at, arrow, pill, mol, sun, leaf, chloro, granum, meso, axes } = H11;
const ICN = { leaf: ['M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z', 'M4 20L14 10'], shine: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'M12 8a4 4 0 1 0 .1 0'], fall: ['M6 4c6 0 10 4 10 10-6 0-10-4-10-10Z', 'M6 4l8 8', 'M16 20h4'] };
const PG = { car: '#E0893B', xan: '#E2C93C', ca: '#2E8B6E', cb: '#9DBF4A' };
const S = [];
// chromatography strip: returns {g, bands[], front, spot, set(v)} v: 0..1 run progress
const strip = (g, x, y, w, h, solvent = true) => { const G = mk(g, 'g', {});
  if (solvent) { mk(G, 'rect', { x: x - 50, y: y + h - 70, width: w + 100, height: 90, rx: 10, fill: 'rgba(214,233,245,0.5)', stroke: K.o2, 'stroke-width': 3 }); }
  mk(G, 'rect', { x, y, width: w, height: h, fill: '#FFFFFF', stroke: '#B9B2A0', 'stroke-width': 2.5 });
  const wet = mk(G, 'rect', { x: x + 1.5, y: y + h, width: w - 3, height: 0, fill: '#EAF3F8' });
  const front = P(G, `M${x},${y + h} L${x + w},${y + h}`, 'none', K.o2, 2, { 'stroke-dasharray': '6 5' });
  const sY = y + h - 50, tops = [0.86, 0.66, 0.42, 0.27], cols = [PG.car, PG.xan, PG.ca, PG.cb];
  const bands = cols.map(c => mk(G, 'rect', { x: x + 10, y: sY - 7, width: w - 20, height: 14, rx: 7, fill: c }));
  const spot = circ(G, x + w / 2, sY, 11, '#3F6E3A', K.ink, 1.5);
  if (solvent) mk(G, 'rect', { x: x - 6, y: y + h - 20, width: w + 12, height: 4, fill: K.o2, opacity: 0.6 });
  const set = (v, sp) => { const fh = (h - 30) * v; attr(wet, 'y', (y + h - fh).toFixed(1)); attr(wet, 'height', fh.toFixed(1)); attr(front, 'd', `M${x},${(y + h - fh).toFixed(1)} L${x + w},${(y + h - fh).toFixed(1)}`); front.style.opacity = v > 0.02 && v < 1.5 ? 1 : 0;
    bands.forEach((b, i) => { const u = M.clamp(sp == null ? v : sp); const yy = sY - (sY - y - 20) * tops[i] * u; attr(b, 'y', (yy - 7).toFixed(1)); b.style.opacity = M.clamp(u * 6).toFixed(2); }); spot.style.opacity = (1 - M.clamp((sp == null ? v : sp) * 6)).toFixed(2); };
  set(0); return { g: G, bands, set, tops, sY }; };

/* ---------- H: the paper strip ---------- */
S.push(EP.hook({ label: "AARAV'S PAPER STRIP", face: 'aarav', pill: ['One green spot, four bands', ['H3', 'dipped', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Why did the green spot split into bands?', ['H3', 'split']], ['Where in the leaf is food made?', ['H3', 'food']]],
  a: [['ANSWER 1', 'Four pigments, four speeds', ['H4', 'four']], ['ANSWER 2', 'Inside chloroplasts', ['H4', 'chloroplasts']]],
  chips: [['Where it happens', ['H5', 'where']], ['Chloroplast parts', ['H5', 'parts']], ['Four pigments', ['H5', 'four']], ['Two spectrum graphs', ['H5', 'spectrum']]],
  build: (el, s) => {
    leaf(s, 90, 210, 230, 70); const mo = mk(s, 'g', {}); P(mo, 'M110,370 Q190,440 270,370 Z', '#D9D2C2', K.ink, 3); circ(mo, 190, 378, 22, '#3F6E3A', 'none', 0); cap(mo, 190, 452, 'CRUSHED LEAF', { fill: C.ink });
    const st = strip(s, 470, 110, 120, 380);
    return { els: [[mo, ['H3', 'crushed', -0.1], { dy: 10 }]], anim: t => { const a = tm(['H3', 'dipped']); st.set(M.clamp((t - a) / 4)); } };
  } }));

/* ---------- B: where it happens ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [
  { pos: 'L', label: 'GREEN PARTS · MOSTLY LEAVES', pill: ['Leaves, and green stems too', ['B2', 'leaves', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 440, width: 784, height: 50, fill: '#C9B48A' }); const stem = P(s, 'M392,440 C380,360 404,260 392,120', 'none', K.chl, 12);
    const lv = [[392, 360, -1], [392, 300, 1], [392, 240, -1], [392, 180, 1]].map(([x, y, sd]) => { const g = mk(s, 'g', {}); leaf(g, 0, 0, 170, 52); attr(g, 'transform', `translate(${x} ${y}) rotate(${sd < 0 ? 200 : -20})`); return g; });
    const w = mk(s, 'g', {}); lv.forEach(g => w.appendChild(g));
    return { labs: [[lab(s, 300, 330, 150, 140, 'Leaf', 'end'), ['B2', 'leaves']], [lab(s, 396, 400, 560, 420, 'Green stem'), ['B2', 'stems']]] }; } },
  { pos: 'R', label: 'INSIDE A LEAF · MESOPHYLL CELL', tin: ['B3', null, -0.2], pill: ['Chloroplasts line the walls', ['B3', 'line', -0.1], 'ac'], build: (el, s) => {
    const c = meso(s, 260, 90, 400, 330);
    return { els: [[c, ['B3', 'Inside', -0.1], { dy: 10 }]], labs: [[lab(s, 470, 400, 540, 470, 'Mesophyll cell'), ['B3', 'mesophyll']], [lab(s, 279, 200, 60, 150, 'Chloroplast', 'start'), ['B3', 'chloroplasts']]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['LEAF', 'MESOPHYLL CELL', 'CHLOROPLAST', 'GRANUM'], scales: ['x1', 'x400', 'x4,000', 'x40,000'], ghost: 'EXAMPLE FIGURES', nfs: 44,
  info: [['RUNG 1 OF 4', 'The leaf', 'Thin and flat.', 'Full of green cells.'], ['RUNG 2 OF 4', 'Mesophyll cell', 'Packed with chloroplasts.', 'They line the walls.'], ['RUNG 3 OF 4', 'Chloroplast', 'Grana, stroma lamellae.', 'Stroma all around.'], ['RUNG 4 OF 4', 'Granum', 'A stack of thylakoids.', 'Pigments in the membranes.']],
  av: { who: 'Aarav', text: 'The pigments sit in the thylakoids!', tin: ['Z4', 'pigments', 0.6], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [560, 230, 50], build: g => { leaf(g, 170, 263, 720, 200); return { labs: [[lab(g, 420, 200, 300, 70, 'Leaf', 'end'), ['Z1', 'leaf']]] }; } },
    { at: 'Z2', focus: [540, 89, 40], build: g => { meso(g, 300, 70, 460, 380); return { labs: [[lab(g, 540, 89, 640, 170, 'Chloroplast'), ['Z2', 'chloroplasts']], [lab(g, 700, 420, 640, 490, 'Mesophyll cell'), ['Z2', 'mesophyll']]] }; } },
    { at: 'Z3', focus: [528, 236, 70], build: g => { const c = chloro(g, 528, 270, 380, 190, 5);
      return { labs: [[lab(g, 292, 190, 200, 70, 'Granum', 'end'), ['Z3', 'grana']], [lab(g, 469, 274, 420, 500, 'Stroma lamellae', 'end'), ['Z3', 'lamellae']], [lab(g, 600, 400, 760, 500, 'Stroma'), ['Z3', 'stroma', 0, 1]]] }; } },
    { at: 'Z4', build: g => { const gr = granum(g, 528, 263, 440, 7, 50); const pg = mk(g, 'g', {}); for (let k = 0; k < 7; k++) for (let j = 0; j < 12; j++) circ(pg, 340 + j * 34, 263 - 175 + k * 50 + (j % 2 ? 2 : 22), 4.5, K.chlD, 'none', 0);
      return { els: [[pg, ['Z4', 'pigments', -0.1], { dy: 0, fade: 0.4 }]], labs: [[lab(g, 748, 163, 830, 200, 'Thylakoid'), ['Z4', 'thylakoids']], [lab(g, 374, 410, 260, 490, 'Pigments in membranes', 'start'), ['Z4', 'pigments']]] }; } }] }));

/* ---------- L: paper chromatography ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'PAPER CHROMATOGRAPHY · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Dot the leaf extract', 'near the bottom of the strip'], ['Dip in a solvent', 'a liquid that climbs the paper'], ['Pigments move up', 'each at its own speed'], ['Chlorophyll a and b', 'blue green · yellow green', 19], ['Xanthophylls, carotenoids', 'yellow · yellow to orange', 19]], LT) }) },
  { pos: 'R', label: 'WATCH THE BANDS SEPARATE', build: (el, s) => {
    const st = strip(s, 300, 80, 150, 400); const dot = circ(s, 375, 430, 11, '#3F6E3A', K.ink, 1.5);
    const L = [['Carotenoids', PG.car], ['Xanthophylls', PG.xan], ['Chlorophyll a', PG.ca], ['Chlorophyll b', PG.cb]].map(([n, c], i) => { const yy = st.sY - (st.sY - 100) * st.tops[i]; return lab(s, 440, yy, 520, yy, n); });
    return { labs: [[L[2], ['L5', 'Chlorophyll']], [L[3], ['L5', 'Chlorophyll', 0, 1]], [L[1], ['L6', 'Xanthophylls']], [L[0], ['L6', 'Carotenoids']]],
      anim: t => { const ts = LT.map(tm); dot.style.opacity = t > ts[0] && t < ts[1] + 0.3 ? 1 : 0; const dip = M.io((t - ts[1]) / 0.6); attr(st.g, 'transform', `translate(0 ${(-40 + 40 * dip).toFixed(1)})`); st.g.style.opacity = t > ts[0] - 0.3 ? 1 : 0;
        st.set(M.clamp((t - ts[1] - 0.4) / 5.5), M.clamp((t - ts[2]) / 4)); if (t < ts[1]) st.set(0, 0); } }; } }] });

/* ---------- C: chief pigment and helpers ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'CHIEF PIGMENT AND ACCESSORY PIGMENTS', build: (el, s) => {
  const ca = mk(s, 'g', {}); circ(ca, 800, 330, 110, '#D8EFE6', PG.ca, 6); T(ca, 800, 330, 'Chlorophyll a', 26, PG.ca, { 'font-weight': 700 }); T(ca, 800, 362, 'CHIEF PIGMENT', 15, C.mute, { 'font-family': 'IBM Plex Mono' });
  const acc = [['Chlorophyll b', PG.cb, 330, 200], ['Xanthophylls', PG.xan, 330, 440], ['Carotenoids', PG.car, 1270, 330]].map(([n, c, x, y]) => { const g = mk(s, 'g', {}); circ(g, x, y, 84, '#FFFFFF', c, 5); T(g, x, y + 6, n, 18, C.ink); return { g, x, y, c }; });
  const ar = acc.map(({ x, y, c }) => { const dx = 800 - x, dy = 330 - y, d = Math.hypot(dx, dy); return P(s, `M${x + dx / d * 94},${y + dy / d * 94} L${800 - dx / d * 122},${330 - dy / d * 122}`, 'none', c, 6, { 'stroke-dasharray': '12 10' }); });
  const sh = mk(s, 'g', {}); P(sh, 'M800,70 L850,88 L850,128 C850,160 826,178 800,190 C774,178 750,160 750,128 L750,88 Z', 'rgba(62,155,95,0.12)', C.ac, 4); T(sh, 800, 146, '✓', 34, C.ac);
  const p1 = div(el, 'chp', { left: '1040px', top: '90px' }, 'Accessory = helping'), p2 = div(el, 'pillp ac', { left: '1040px', top: '470px' }, 'Protect from photo-oxidation');
  return { els: [[ca, ['C1', 'Chlorophyll'], POP], ...acc.map(a => [a.g, ['C2', 'other', -0.1], POP]), [p1, ['C2', 'Accessory']], [sh, ['C3', 'protect', -0.1], POP], [p2, ['C3', 'photo', -0.2]]],
    anim: t => { const a = tm(['C2', 'pass']); ar.forEach(e => { e.style.opacity = t > a - 0.2 ? 1 : 0; attr(e, 'stroke-dashoffset', (-(t * 40) % 22).toFixed(1)); }); sh.style.opacity = t > tm(['C3', 'protect']) - 0.1 ? 1 : 0; } }; } }] });

/* ---------- D: absorption vs action spectrum ---------- */
const SPEC = ['#7B4B94', '#4A78C2', '#3E9B5F', '#E2C93C', '#E0893B', '#C8323C'];
const graph = (s, title, d, col, sp) => { axes(s, 110, 460, 600, 330, '', title); cap(s, 410, 536, 'WAVELENGTH (nm)', { fill: K.ink }); SPEC.forEach((c, i) => mk(s, 'rect', { x: 112 + i * 98, y: 462, width: 98, height: 10, fill: c })); ['400', '500', '600', '700'].forEach((n, i) => cap(s, 112 + i * 196, 496, n, { fill: C.mute })); return P(s, d, 'none', col, 5); };
const absD = 'M112,380 C150,330 175,150 205,150 C235,150 260,350 320,400 C380,430 470,430 520,400 C560,370 580,190 610,190 C640,190 660,400 708,440';
const actD = 'M112,330 C150,250 175,170 210,170 C250,170 280,300 330,340 C390,380 460,370 520,330 C560,300 580,180 612,180 C645,180 665,360 708,410';
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'ABSORPTION SPECTRUM · CHLOROPHYLL A', tin: ['D2', null, -0.2], build: (el, s) => { const c = graph(s, 'LIGHT ABSORBED', absD, PG.ca); return { els: [[c, ['D2', 'absorbs', -0.2], { dy: 0, fade: 0.6 }]], labs: [[lab(s, 205, 150, 290, 110, 'Blue'), ['D2', 'blue']], [lab(s, 610, 190, 520, 110, 'Red', 'end'), ['D2', 'red']]] }; } },
  { pos: 'R', label: 'ACTION SPECTRUM · PHOTOSYNTHESIS', tin: ['D3', null, -0.2], build: (el, s) => { const c = graph(s, 'RATE OF PHOTOSYNTHESIS', actD, C.ac); const ghost = P(s, absD, 'none', PG.ca, 3, { 'stroke-dasharray': '8 8', opacity: 0.6 });
    return { els: [[c, ['D3', 'action', -0.1], { dy: 0, fade: 0.6 }], [ghost, ['D3', 'match', -0.2], { dy: 0, fade: 0.4 }]], labs: [[lab(s, 210, 170, 290, 110, 'Blue peak'), ['D3', 'blue']], [lab(s, 612, 180, 640, 110, 'Red peak'), ['D3', 'red']]] }; } }] });

/* ---------- U: division of labour + think ---------- */
const TH = { q: 'Chlorophyll a absorbs the most light in which colours?', opts: ['Green', 'Blue and red'], right: 1, why: 'Blue and red. That is where most photosynthesis happens.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'DIVISION OF LABOUR', tout: 'U4', build: (el, s) => { const c = chloro(s, 392, 280, 330, 170, 5);
    return { els: [[c.g, ['U1', 'There'], { dy: 10 }]], labs: [[lab(s, 241, 248, 120, 76, 'Membranes: light reactions'), ['U2', 'membrane']], [lab(s, 450, 400, 330, 500, 'Stroma: carbon reactions', 'start'), ['U3', 'stroma']]] }; } },
  { pos: 'R', label: 'WHAT EACH PART MAKES', tin: ['U2', null, -0.2], tout: 'U4', build: (el, s) => {
    const sn = sun(s, 110, 150, 32); const r1 = div(el, 'chp', { left: '190px', top: '128px' }, 'Membranes trap light'); const a = H11.put(s, 300, 260, mol.ATP), n = H11.put(s, 460, 260, mol.NADPH);
    const ar = arrow(s, 392, 300, 392, 360, C.ink, 4); const r2 = div(el, 'chp', { left: '190px', top: '380px' }, 'Stroma: enzymes make sugar'); const sg = H11.put(s, 392, 480, g => pill(g, 'Sugar → starch', K.sug, K.sugL));
    return { els: [[sn, ['U2', 'traps', -0.2], POP], [r1, ['U2', 'traps']], [a, ['U2', 'ATP'], POP], [n, ['U2', 'NADPH'], POP], [ar, ['U3', 'In']], [r2, ['U3', 'enzymes']], [sg, ['U3', 'starch', -0.2], POP]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'green', -0.1], why: ['U5', 'Blue'] })] });

/* ---------- W: read the strip ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · READ ONE STRIP, TOP TO BOTTOM', build: (el, s) => {
  const st = strip(s, 260, 70, 170, 440, false); st.set(1, 1);
  const rows = [['1 · Carotenoids', 'yellow to orange', PG.car, ['W2', 'carotenoids']], ['2 · Xanthophylls', 'yellow', PG.xan, ['W2', 'xanthophylls']], ['3 · Chlorophyll a', 'blue green', PG.ca, ['W3', 'chlorophyll']], ['4 · Chlorophyll b', 'yellow green', PG.cb, ['W3', 'chlorophyll', 0, 1]]];
  const R = rows.map(([n, c, col], i) => { const yy = st.sY - (st.sY - 90) * st.tops[i]; const e = div(el, 'chp', { left: '560px', top: (yy - 22) + 'px' }, `<span style="display:inline-block;width:18px;height:18px;border-radius:9px;background:${col}"></span>${n} <span style="color:${C.mute};font-weight:500">· ${c}</span>`); const ln = P(s, `M440,${yy} L548,${yy}`, 'none', C.ink, 2.5); return [e, ln]; });
  const hl = mk(s, 'rect', { x: 250, y: 0, width: 190, height: 30, rx: 8, fill: 'none', stroke: C.ac, 'stroke-width': 4 });
  const v1 = div(el, 'pillp ac', { left: '1100px', top: '200px' }, 'Chief: chlorophyll a'), v2 = div(el, 'pillp', { left: '1100px', top: '280px' }, 'Accessory: the other three');
  return { els: [...R.flatMap(([e, ln], i) => [[e, rows[i][3], { dx: -16, dy: 0 }], [ln, rows[i][3], { dy: 0, fade: 0.2 }]]), [v1, ['W4', 'chief', -0.1]], [v2, ['W4', 'Accessory', -0.1]]],
    anim: t => { const ts = rows.map(r => tm(r[3])); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.1) c = i; }); hl.style.opacity = c >= 0 && t < tm('W4') ? 1 : 0; if (c >= 0) attr(hl, 'y', (st.sY - (st.sY - 90) * st.tops[c] - 15).toFixed(1)); } }; } }] });

EP.run({
  icons: ICN,
  jobs: [['leaf', 'A spinach leaf', 'GREEN', ['H1', 'spinach']], ['shine', 'A mango leaf in the sun', 'SHINY GREEN', ['H1', 'ripe']], ['fall', 'An old leaf', 'TURNS YELLOW', ['H1', 'old']]],
  scenes: S,
  stmt: { l2: 'Leaf green is <span class="acc">four pigments</span>.', f: '<span class="lad"><b>chlorophyll a</b> · chlorophyll b · xanthophylls · carotenoids</span>', t2: ['T1', 'Leaf', -0.2], tf: ['T1', 'four'] },
  trap: { wrong: 'Dark reactions happen only at night', right: 'They run in daytime too, using ATP and NADPH', tWrong: ['X2', 'dark', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'These', -0.2], tSvg: ['X3', 'daytime', -0.4],
    build: s => { sun(s, 150, 110, 34); const a = mk(s, 'g', {}); mol.ATP(a); at(a, 300, 80); const n = mk(s, 'g', {}); mol.NADPH(n); at(n, 320, 140); cap(s, 230, 230, 'CARBON REACTIONS RUN IN DAYTIME', { 'font-size': 14 }); } },
  where: { type: 'Statement questions on pigments, accessory pigments and the two spectra', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Chlorophyll a is the chief pigment.<br>II. Chlorophyll b appears yellow in a chromatogram.<br>III. Accessory pigments protect chlorophyll a from photo-oxidation.<br>IV. Sugar is made in the stroma.</div>', opts: ['I and II only', 'II and III only', 'I, II and IV only', 'I, III and IV only'], right: 3 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['I: chlorophyll a is the chief pigment', ['A2', 'Chlorophyll']], ['III: accessory pigments protect it', ['A2', 'Accessory']], ['IV: the stroma makes sugar', ['A2', 'stroma']], ['II is wrong: chl b is yellow green', ['A3', 'yellow']]],
  recap: { title: 'Recap · chloroplast and pigments', lines: ['<b>Where</b>: green parts, mostly leaves', '<b>Chloroplast</b>: grana, stroma lamellae, stroma', '<b>Pigments</b>: chl a (chief), chl b, xanthophylls, carotenoids', '<b>Accessory pigments</b>: pass energy, protect chl a', '<b>Both spectra</b>: peak in blue and red'] },
  yq: ['What are grana and stroma?', 'Name the four leaf pigments.', 'How is an action spectrum different from an absorption spectrum?'],
  next: { label: 'NEXT · EP 82', topic: 'The Light Reaction and Electron Transport' }
});
})();
