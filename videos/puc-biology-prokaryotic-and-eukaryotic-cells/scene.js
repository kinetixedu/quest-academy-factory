// PUC Biology Ep 61: Prokaryotic and Eukaryotic Cells (Living diagram, leaf green). Runner: ep.js, drawings: cell8.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, E, wrap, blob } = K8, CC = K8.C, CB = C.ac;
const sl = (g, px, py, lx, ly, s, an = 'start') => lab(g, px, py, lx, ly, s, an, 'sl2');
// bacterial shapes
const rod = (g, x, y, w, h, a = 0) => mk(g, 'rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: h / 2, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 3, transform: `rotate(${a} ${x} ${y})` });
const comma = (g, x, y, a = 0) => P(g, `M${x - 30},${y + 10} C${x - 20},${y - 24} ${x + 20},${y - 24} ${x + 32},${y - 4} C${x + 20},${y - 8} ${x - 10},${y - 6} ${x - 18},${y + 16} Z`, K8.CWf, K8.CW, 3, { transform: `rotate(${a} ${x} ${y})` });
const spiral = (g, x, y, a = 0) => P(g, `M${x - 60},${y} c10,-24 20,-24 30,0 s20,24 30,0 s20,-24 30,0 s20,24 30,0`, 'none', K8.CW, 9, { transform: `rotate(${a} ${x} ${y})` });

const S = [];
/* ---------- H: hut or building ---------- */
S.push(EP.hook({ label: 'ONE ROOM, OR MANY?', face: 'aarav', pill: ['Every job, its own room', ['H2', 'building', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Hut or building: which is a cell?', ['H3', 'hut']], ['Does every cell have a nucleus?', ['H3', 'nucleus']]],
  a: [['ANSWER 1', 'Both kinds: prokaryotic and eukaryotic', ['H4', 'Some']], ['ANSWER 2', 'No: prokaryotes lack a nuclear membrane', ['H4', 'nuclear']]],
  chips: [['A bacterium', ['H5', 'bacterium']], ['A eukaryotic cell', ['H5', 'eukaryotic']], ['Plant vs animal', ['H5', 'plant']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 420, width: 784, height: 160, fill: '#E6EFD8' });
    const hut = mk(s, 'g', {}); P(hut, 'M60,420 L60,290 L300,290 L300,420 Z', '#F2E2C0', '#7A5A2E', 4); P(hut, 'M40,295 L180,190 L320,295 Z', '#C98C5A', '#7A5A2E', 4);
    mk(hut, 'rect', { x: 80, y: 360, width: 70, height: 26, rx: 4, fill: '#8CB4D8', stroke: '#2E2A24', 'stroke-width': 2 }); CC(hut, 230, 372, 16, '#E58A3C', '#2E2A24', 2); mk(hut, 'rect', { x: 170, y: 318, width: 36, height: 44, fill: '#D7C3E6', stroke: '#2E2A24', 'stroke-width': 2 }); mk(hut, 'rect', { x: 250, y: 312, width: 30, height: 30, fill: '#9FD09A', stroke: '#2E2A24', 'stroke-width': 2 });
    cap(hut, 180, 470, 'EVERYTHING IN ONE SPACE', { fill: C.ink });
    const bl = mk(s, 'g', {}); mk(bl, 'rect', { x: 400, y: 150, width: 330, height: 270, fill: '#F6F1E6', stroke: '#4A5568', 'stroke-width': 4 });
    const rc = ['#8CB4D8', '#E58A3C', '#D7C3E6', '#9FD09A', '#E9C46A', '#F2B9A0'], rooms = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { const x = 412 + c * 156, y = 162 + r * 84; rooms.push(mk(bl, 'rect', { x, y, width: 150, height: 76, fill: '#FFFFFF', stroke: '#4A5568', 'stroke-width': 3 })); CC(bl, x + 75, y + 38, 16, rc[r * 2 + c], '#2E2A24', 2); }
    cap(bl, 565, 470, 'EVERY JOB, ITS OWN ROOM', { fill: C.ink });
    return { anim: t => { const a = tm(['H2', 'hut']) - 0.2, b = tm(['H2', 'building']) - 0.2; hut.style.opacity = t > b && t < tm('H3') ? 0.35 : 1; bl.style.opacity = t > a && t < b ? 0.35 : 1;
      rooms.forEach((e, i) => attr(e, 'stroke', t > b + 0.2 + i * 0.12 && t < tm('H3') + 1 ? CB : '#4A5568')); } };
  } }));

/* ---------- B: what every cell has ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT EVERY CELL HAS', build: (el, s) => {
  const b = K8.bact(s, 300, 300, 0.95, { fla: false, gly: false, meso: false, plasmid: false }), a = K8.animal(s, 1300, 300, 1.0);
  cap(s, 300, 470, 'A BACTERIUM', { fill: C.ink }); cap(s, 1300, 490, 'A CHEEK CELL', { fill: C.ink });
  const K = [['Cell membrane', ['B2', 'membrane']], ['Cytoplasm', ['B2', 'cytoplasm']], ['Ribosomes: make proteins', ['B3', 'ribosomes']], ['DNA: genetic material', ['B3', 'DNA']]].map(([w, at], i) => [div(el, 'chp', { left: '600px', top: 130 + i * 84 + 'px', width: '400px', justifyContent: 'center' }, w), [at[0], at[1], -0.1]]);
  return { els: [[b.g, ['B1', 'share', -0.3], { ...POP, sc: 0.8 }], [a.g, ['B1', 'cells', -0.2], { ...POP, sc: 0.8 }], ...K],
    anim: t => { const m = t > tm(['B2', 'membrane']) && t < tm(['B2', 'cytoplasm']) + 0.3, c = t > tm(['B2', 'cytoplasm']) && t < tm('B3'), r = t > tm(['B3', 'ribosomes']) && t < tm(['B3', 'DNA']), d = t > tm(['B3', 'DNA']);
      attr(b.mem, 'stroke-width', m ? 8 : 3.5); attr(a.mem, 'stroke-width', m ? 9 : 4); attr(b.mem, 'fill', c ? '#DCEFD0' : K8.BCY); attr(a.mem, 'fill', c ? '#DCEFD0' : K8.CYT);
      [...b.rb, ...a.rb].forEach(e => attr(e, 'r', r ? 6 : 3)); attr(b.dna, 'stroke-width', d ? 7 : 3.5); attr(a.nu.firstChild, 'stroke-width', d ? 7 : 3); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['BACTERIA', 'ONE BACTERIUM', 'ITS DNA'], scales: ['x1000', 'x5000', 'x20000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Bacteria', 'Four basic shapes.', 'Rod, round, comma, spiral.'], ['RUNG 2 OF 3', 'One bacterium', 'A wall around the membrane.', 'Only ribosomes inside.'], ['RUNG 3 OF 3', 'Its DNA', 'Naked: no nuclear membrane.', 'Plasmids: small extra rings.']],
  av: { who: 'Aarav', text: 'Just like the one room hut!', tin: ['Z5', 'faster', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [250, 150, 70], build: g => { const q = [mk(g, 'g', {}), mk(g, 'g', {}), mk(g, 'g', {}), mk(g, 'g', {})];
      [[180, 130, 20], [260, 150, -10], [330, 110, 40], [220, 200, 70]].forEach(([x, y, a]) => rod(q[0], x, y, 70, 28, a));
      [[640, 120], [680, 120], [720, 120], [660, 170], [700, 170], [800, 140], [830, 170]].forEach(([x, y]) => CC(q[1], x, y, 18, K8.CWf, K8.CW, 3));
      [[200, 360, 0], [300, 400, 30], [180, 440, -20]].forEach(([x, y, a]) => comma(q[2], x, y, a));
      [[700, 360, 10], [740, 440, -15]].forEach(([x, y, a]) => spiral(q[3], x, y, a));
      return { els: q.map((e, i) => [e, ['Z2', ['bacillus', 'coccus', 'vibrio', 'spirillum'][i], -0.2], { ...POP, sc: 0.6 }]),
        labs: [[lab(g, 330, 110, 420, 70, 'Bacillus · rod'), ['Z2', 'bacillus']], [lab(g, 700, 170, 740, 240, 'Coccus'), ['Z2', 'coccus']], [lab(g, 300, 400, 420, 330, 'Vibrio · comma'), ['Z2', 'vibrio']], [lab(g, 790, 440, 820, 300, 'Spirillum'), ['Z2', 'spirillum']]] }; } },
    { at: 'Z3', focus: [528, 263, 80], build: g => { const b = K8.bact(g, 528, 263, 1.35, { fla: false, gly: false, meso: false, pili: false, plasmid: false });
      return { labs: [[lab(g, 528, 263 - 70 * 1.35, 640, 80, 'Cell wall'), ['Z3', 'wall']], [lab(g, 330, 263 + 55 * 1.35, 240, 470, 'Cell membrane', 'end'), ['Z3', 'membrane']], [lab(g, 528 - 120 * 1.35, 263, 220, 220, 'Cytoplasm', 'end'), ['Z3', 'cytoplasm']], [lab(g, 528 + 140 * 1.35, 263 + 4 * 1.35, 820, 400, 'Ribosome'), ['Z3', 'ribosomes']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 60, y: 40, width: 936, height: 446, rx: 200, fill: K8.BCY, stroke: K8.HEAD, 'stroke-width': 5 });
      const d = P(g, 'M380,180 C460,100 620,120 600,230 C580,330 420,360 360,290 C300,220 380,150 470,190 C540,220 560,280 500,300 C440,320 400,270 440,240', 'none', K8.DNA, 8);
      const pl = [CC(g, 760, 180, 34, 'none', K8.DNA, 7), CC(g, 780, 330, 24, 'none', K8.DNA, 7)];
      const ab = mk(g, 'g', {}); mk(ab, 'rect', { x: 600, y: 410, width: 360, height: 48, rx: 10, fill: '#F6E7B8' }); txt(ab, 780, 441, 'Plasmid: antibiotic resistance', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 21, 'font-weight': 600, fill: C.ink });
      return { labs: [[lab(g, 380, 180, 200, 110, 'Naked DNA', 'end'), ['Z4', 'naked']], [lab(g, 794, 180, 860, 120, 'Plasmid'), ['Z4', 'plasmids']]], els: [[ab, ['Z5', 'resistance', -0.1], { dy: 10 }]],
        anim: t => { const on = t > tm(['Z4', 'nuclear']); attr(d, 'stroke-dasharray', ''); } }; } }] }));

/* ---------- L: the eukaryotic cell ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE EUKARYOTIC CELL · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Who they are', 'protists, plants, animals and fungi'], ['Many rooms', 'membrane bound organelles · compartmentalisation'], ['A true nucleus', 'with a nuclear envelope around it'], ['Chromosomes', 'genetic material organised into chromosomes'], ['Moving parts + cytoskeleton', 'a frame of fibres gives the cell its shape']], LT) }) },
  { pos: 'R', label: 'A EUKARYOTIC CELL', build: (el, s) => {
    const kg = cap(s, 392, 112, 'PROTISTS · PLANTS · ANIMALS · FUNGI', { fill: CB, 'font-size': 18 });
    const A = K8.animal(s, 370, 320, 1.0);
    const cy = mk(s, 'g', {}); [[200, 260, 560, 230], [220, 380, 540, 420], [300, 180, 330, 460], [430, 180, 470, 450], [190, 320, 560, 330]].forEach(([a, b, c, d]) => P(cy, `M${a},${b} L${c},${d}`, 'none', K8.SP, 2, { 'stroke-dasharray': '7 5', opacity: 0.8 }));
    const ch = mk(s, 'g', {}); [[335, 320, 30], [362, 340, -40], [345, 352, 70]].forEach(([x, y, a]) => P(ch, `M${x - 12},${y - 6} Q${x},${y} ${x - 12},${y + 6} M${x + 12},${y - 6} Q${x},${y} ${x + 12},${y + 6}`, 'none', '#4A2A5E', 4, { transform: `rotate(${a} ${x} ${y})` }));
    const LG = [0, 1, 2, 3, 4].map(() => mk(s, 'g', {})), LB = [[sl(LG[1], 488, 238, 600, 190, 'Mitochondrion'), 1, ['L3', 'organelles']], [sl(LG[1], 470, 352, 600, 380, 'Golgi complex'), 1, ['L3', 'membrane']], [sl(LG[1], 300, 226, 160, 190, 'ER', 'end'), 1, ['L3', 'compartmentalisation']], [sl(LG[1], 250, 280, 160, 290, 'Lysosome', 'end'), 1, ['L3', 'rooms']],
      [lab(LG[2], 350, 382, 350, 500, 'Nucleus · nuclear envelope', 'middle', 'sl2'), 2, ['L4', 'nuclear']], [sl(LG[3], 352, 336, 160, 420, 'Chromosomes', 'end'), 3, ['L5', 'chromosomes']], [sl(LG[4], 520, 420, 600, 460, 'Cytoskeleton'), 4, ['L6', 'cytoskeleton']]];
    return { els: [[kg, ['L2', 'protists', -0.2], { dy: 8 }], [A.g, ['L1', null, 0.3], { ...POP, sc: 0.8 }], [ch, ['L5', 'chromosomes', -0.2], { ...POP, sc: 0.4 }], [cy, ['L6', 'cytoskeleton', -0.2], { dy: 0, fade: 0.5 }]],
      labs: LB.map(([l, , at]) => [l, at]),
      anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
        LG.forEach((g, k) => g.style.opacity = c > k ? 0.3 : 1);
        attr(A.nu.firstChild, 'stroke-width', c === 2 ? 7 : 3); } }; } }] });

/* ---------- C: compare ---------- */
const row = (el, y, n, d, at) => [div(el, 'rw', { top: y + 'px' }, `<div class="rn">${n}</div><div class="rd">${d}</div>`), [at[0], at[1], -0.1], { dx: -14, dy: 0 }];
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'PROKARYOTIC · A BACTERIUM', build: (el, s) => { const b = K8.bact(s, 392, 165, 0.8, { fla: false, meso: false, plasmid: false });
    return { els: [row(el, 286, 'Naked DNA', 'no nuclear membrane around it', ['C2', 'naked']), row(el, 378, 'No membrane bound organelles', 'nothing walled off inside', ['C2', 'organelles']), row(el, 470, 'Ribosomes only', 'in the cytoplasm', ['C2', 'ribosomes'])],
      anim: t => attr(b.dna, 'stroke-width', t > tm(['C2', 'naked']) ? 7 : 3.5) }; } },
  { pos: 'R', label: 'EUKARYOTIC · YOUR CHEEK CELL', tin: ['C3', null, -0.2], build: (el, s) => { const a = K8.animal(s, 392, 168, 0.6);
    return { els: [row(el, 286, 'DNA inside a nucleus', 'wrapped in a nuclear envelope', ['C3', 'nucleus']), row(el, 378, 'Many organelles', 'mitochondria · ER · Golgi complex', ['C3', 'organelles']), row(el, 470, 'Ribosomes in many places', 'cytoplasm · rough ER · chloroplasts · mitochondria', ['C4', 'ribosomes'])],
      anim: t => attr(a.nu.firstChild, 'stroke-width', t > tm(['C3', 'nucleus']) ? 7 : 3) }; } }] });

/* ---------- D: plant vs animal ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'PLANT CELL', pill: ['Wall · plastids · large central vacuole', ['D2', 'absent', -0.1], 'ac'], build: (el, s) => { K8.plant(s, 392, 270, 1.05);
    return { labs: [[lab(s, 392 - 199, 200, 160, 160, 'Cell wall', 'end'), ['D2', 'wall']], [lab(s, 392 + 130 * 1.05, 270 - 110 * 1.05, 640, 110, 'Plastid'), ['D2', 'plastids']], [lab(s, 340, 240, 160, 290, 'Vacuole', 'end'), ['D2', 'vacuole']]] }; } },
  { pos: 'R', label: 'ANIMAL CELL', tin: ['D3', null, -0.2], build: (el, s) => { const A = K8.animal(s, 360, 280, 1.05);
    return { labs: [[lab(s, 360 + 62 * 1.05, 280 + 93 * 1.05, 600, 430, 'Centrioles'), ['D3', 'centrioles']], [lab(s, 360 + 54 * 1.05, 280 + 100 * 1.05, 600, 500, 'Centrosome'), ['D4', 'centrosome']]],
      anim: t => { const on = t > tm(['D3', 'centrioles']); [...A.cen.children].forEach(e => attr(e, 'fill', on ? CB : K8.SP)); } }; } }] });

/* ---------- U: organelles + think ---------- */
const TH = { q: 'No nuclear membrane, but a cell wall:', opts: ['Prokaryotic', 'Eukaryotic'], right: 0, why: 'Prokaryotic. The missing nuclear membrane decides it, not the wall.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'ORGANELLES OF A EUKARYOTIC CELL', tout: 'U4', build: (el, s) => {
    const items = [['ER', 'endoplasmic', g => K8.erN(g, 0, -10, 1.3, 0)], ['Golgi complex', 'Golgi', g => K8.golgi(g, 0, 0, 1.3)], ['Lysosome', 'lysosomes', g => K8.lyso(g, 0, 0, 34)], ['Mitochondrion', 'mitochondria', g => K8.mito(g, 0, 0, 2, 0)], ['Microbody', 'microbodies', g => { CC(g, 0, 0, 34, '#EFF3D6', '#7A8A3A', 3); mk(g, 'rect', { x: -12, y: -12, width: 24, height: 24, fill: '#B9C27A', transform: 'rotate(45)' }); }], ['Vacuole', 'vacuoles', g => P(g, blob(56, 42, 9, 0.08, 1), K8.VAf, K8.VA, 3)]];
    const tiles = items.map(([n, w, dr], i) => { const x = 60 + i * 250, g = mk(s, 'g', {}); const r = mk(g, 'rect', { x, y: 100, width: 230, height: 300, rx: 16, fill: '#FBFAF6', stroke: '#E4E1D8', 'stroke-width': 3 }); const o = mk(g, 'g', { transform: `translate(${x + 115} 220)` }); dr(o);
      txt(g, x + 115, 360, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 23, 'font-weight': 700, fill: C.ink }); return { g, r, w }; });
    const mc = cap(s, 800, 460, 'EACH ONE IS WRAPPED IN A MEMBRANE: EACH JOB, ITS OWN ROOM', { fill: CB, 'font-size': 18 });
    return { els: [...tiles.map(({ g, w }) => [g, ['U2', w, -0.15], { ...POP, sc: 0.6 }]), [mc, ['U3', 'membrane', -0.1], { dy: 8 }]], anim: t => tiles.forEach(({ r }, i) => attr(r, 'stroke', t > tm(['U3', 'wrapped']) + i * 0.1 ? CB : '#E4E1D8')) }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'prokaryotic', -0.1], why: ['U5', 'missing'] })] });

/* ---------- W: worked example ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · SORT THREE CELLS', svg: false, build: el => EP.cols(el, [
  ['CELL 1 · MYCOPLASMA', 'Prokaryotic', 'NO NUCLEAR MEMBRANE · NO WALL', s => { P(s, blob(110, 80, 9, 0.1, 2), K8.BCY, K8.HEAD, 3.5, { transform: 'translate(248 150)' }); P(s, 'M210,140 C240,110 290,130 280,160 C270,190 220,190 215,165 C210,145 250,140 255,158', 'none', K8.DNA, 4); K8.dots(s, [[190, 110], [310, 120], [300, 190], [180, 190], [250, 210]], 4); }, ['W2', 'Mycoplasma', -0.2], ['W2', 'prokaryotic', -0.2], ['W2', 'wall']],
  ['CELL 2 · YEAST, A FUNGUS', 'Eukaryotic', 'NUCLEUS · ORGANELLES', s => { E(s, 220, 150, 100, 80, '#F6EED8', '#9A7B35', 3.5); E(s, 340, 104, 36, 28, '#F6EED8', '#9A7B35', 3); K8.nuc(s, 190, 160, 26); P(s, blob(30, 24, 8, 0.08, 1), K8.VAf, K8.VA, 2.5, { transform: 'translate(250 130)' }); K8.mito(s, 240, 200, 0.7, 10); }, ['W3', 'yeast', -0.2], ['W3', 'eukaryotic'], ['W3', 'fungus']],
  ['CELL 3 · AN ONION CELL', 'Eukaryotic plant cell', 'NUCLEUS · WALL · BIG VACUOLE', s => { mk(s, 'rect', { x: 90, y: 50, width: 316, height: 200, rx: 18, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 5 }); mk(s, 'rect', { x: 104, y: 64, width: 288, height: 172, rx: 12, fill: K8.CYT, stroke: '#3E9B5F', 'stroke-width': 2.5 }); P(s, 'M200,80 C300,70 380,90 376,150 C372,210 320,226 240,222 C190,220 180,180 200,150 C214,126 160,92 200,80 Z', K8.VAf, K8.VA, 3); K8.nuc(s, 150, 190, 24); }, ['W4', 'onion', -0.2], ['W5', 'eukaryotic'], ['W4', 'wall']]]) }] });

EP.run({
  icons: { hut: ['M3 11l9-7 9 7', 'M5 10v10h14V10', 'M10 20v-5h4v5'], bldg: ['M4 21V4h16v17', 'M8 8h2', 'M14 8h2', 'M8 12h2', 'M14 12h2', 'M8 16h2', 'M14 16h2'], college: ['M3 9l9-5 9 5-9 5-9-5Z', 'M6 11v5c3 2 9 2 12 0v-5'] },
  jobs: [['hut', 'A one room hut', 'ONE SPACE', ['H1', 'hut']], ['bldg', 'A big house', 'MANY ROOMS', ['H1', 'house']], ['college', 'A college', 'LABS · OFFICES · STORE', ['H1', 'college']]],
  scenes: S,
  stmt: { l2: 'No nuclear membrane: <span class="acc">prokaryotic</span>.', f: '<span class="lad">a true nucleus: <b>eukaryotic</b></span>', t2: ['T1', 'No', -0.2], tf: ['T1', 'true', -0.2] },
  trap: { wrong: 'Prokaryotes have no DNA, as they have no nucleus', right: 'They have DNA: it lies naked in the cytoplasm', tWrong: ['X2', 'prokaryotes', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'do', -0.2], tSvg: ['X3', 'naked', -0.4],
    build: s => { const b = K8.bact(s, 230, 130, 0.75, { fla: false, meso: false, gly: false, pili: false }); attr(b.dna, 'stroke-width', 7); cap(s, 230, 250, 'DNA · NO NUCLEAR MEMBRANE', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: prokaryotic vs eukaryotic cells, plant vs animal cells', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div class="sl"><b>1</b>Plasmids can make bacteria resistant to antibiotics.</div><div class="sl"><b>2</b>All prokaryotes have a cell wall.</div><div class="sl"><b>3</b>Centrioles are absent in almost all plant cells.</div><div class="sl"><b>4</b>Prokaryotic cells have no ribosomes.</div>',
    opts: ['1 and 2 only', '1 and 3 only', '2 and 4 only', '1, 3 and 4 only'], right: 1 }, mcqAt: ['Q1', 'Which', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['1 is correct: plasmids', ['A2', 'Statement']], ['3 is correct: centrioles', ['A2', 'three']], ['2 wrong: Mycoplasma, no wall', ['A3', 'Mycoplasma']], ['4 wrong: they have ribosomes', ['A3', 'ribosomes']]],
  recap: { title: 'Recap · prokaryotic and eukaryotic', lines: ['<b>All cells</b>: membrane, cytoplasm, ribosomes, DNA', '<b>Prokaryotes</b>: bacteria, blue-green algae, mycoplasma, PPLO', '<b>Bacteria</b>: bacillus, coccus, vibrio, spirillum', '<b>Prokaryotic</b>: naked DNA, plasmids · <b>eukaryotic</b>: true nucleus', '<b>Plant</b>: wall, plastids, vacuole · <b>animal</b>: centrioles'] },
  yq: ['What are the four basic shapes of bacteria?', 'What is a plasmid?', 'Name two things a plant cell has that an animal cell does not.'],
  next: { label: 'NEXT · EP 62', topic: 'Next: The Prokaryotic Cell Envelope' }
});
})();
