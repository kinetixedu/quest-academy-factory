// PUC Biology Ep 62: The Prokaryotic Cell - Envelope, Mesosome and Ribosomes (Living diagram, leaf green). Runner: ep.js, drawings: cell8.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, E, wrap, blob } = K8, CC = K8.C, CB = C.ac;
const GP = '#7B4BB5', GPf = '#B79AE0', GN = '#D9607A', GNf = '#F2A9B8';
const rodD = (cx, cy, w, h) => `M${cx - w + h},${cy - h} L${cx + w - h},${cy - h} A${h},${h} 0 0 1 ${cx + w - h},${cy + h} L${cx - w + h},${cy + h} A${h},${h} 0 0 1 ${cx - w + h},${cy - h} Z`;
const wave = (x0, x1, y, A, ph, k = 0.045) => { let d = `M${x0},${y}`; for (let x = x0; x <= x1; x += 8) d += ` L${x},${(y + A * Math.sin((x - x0) * k - ph) * Math.min(1, (x - x0) / 60)).toFixed(1)}`; return d; };

const S = [];
/* ---------- H: layers ---------- */
S.push(EP.hook({ label: 'WRAPPED IN LAYERS', face: 'diya', pill: ['Purple or pink?', ['H3', 'purple', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['What wraps a bacterium?', ['H3', 'wraps']], ['Why do they stain differently?', ['H3', 'why']]],
  a: [['ANSWER 1', 'A three layered cell envelope', ['H4', 'three']], ['ANSWER 2', 'Their envelopes differ', ['H4', 'differs']]],
  chips: [['Cell envelope', ['H5', 'envelope']], ['Mesosome', ['H5', 'mesosome']], ['Flagella', ['H5', 'flagella']], ['Pili and fimbriae', ['H5', 'pili']], ['Ribosomes', ['H5', 'ribosomes']]],
  build: (el, s) => {
    const ob = mk(s, 'g', {});
    const pa = mk(ob, 'g', {}); mk(pa, 'rect', { x: 50, y: 170, width: 200, height: 170, rx: 18, fill: '#DDEBF5', stroke: '#7FA3B8', 'stroke-width': 3, 'stroke-dasharray': '4 4' }); mk(pa, 'rect', { x: 72, y: 192, width: 156, height: 126, fill: '#D9B47A', stroke: '#8A6A3A', 'stroke-width': 3 }); mk(pa, 'rect', { x: 92, y: 212, width: 116, height: 86, fill: '#F6F1E6', stroke: '#8A6A3A', 'stroke-width': 2 }); cap(pa, 150, 380, 'PARCEL', { fill: C.ink });
    const co = mk(ob, 'g', {}); CC(co, 400, 255, 90, '#8A5A2E', '#4A2E14', 3); CC(co, 400, 255, 70, '#5A3618', '#2E1E10', 2); CC(co, 400, 255, 60, '#FBF6EE', '#C9B79A', 2); cap(co, 400, 380, 'COCONUT', { fill: C.ink });
    const ba = K8.bact(ob, 640, 255, 0.5, { fla: false, pili: false, meso: false, plasmid: false }); cap(ob, 640, 380, 'BACTERIUM', { fill: C.ink });
    mk(mk(s, 'clipPath', { id: 'hk62' }), 'circle', { cx: 392, cy: 300, r: 210 });
    const sl = mk(s, 'g', {}); CC(sl, 392, 300, 214, '#2E2A24', 'none', 0); const v = mk(sl, 'g', { 'clip-path': 'url(#hk62)' }); mk(v, 'rect', { x: 170, y: 80, width: 450, height: 450, fill: '#FBF8EE' });
    const pu = mk(v, 'g', {}), pk = mk(v, 'g', {});
    [[260, 200], [290, 220], [275, 250], [330, 380], [355, 400], [520, 220], [545, 240], [300, 470]].forEach(([x, y]) => CC(pu, x, y, 16, GPf, GP, 2.5));
    [[420, 200, 20], [470, 300, -30], [380, 300, 60], [540, 400, 10], [440, 460, -50], [240, 330, 80]].forEach(([x, y, a]) => mk(pk, 'rect', { x: x - 34, y: y - 12, width: 68, height: 24, rx: 12, fill: GNf, stroke: GN, 'stroke-width': 2.5, transform: `rotate(${a} ${x} ${y})` }));
    CC(sl, 392, 300, 210, 'none', '#2E2A24', 6);
    return { els: [[pa, ['H1', 'parcel', -0.1], { ...POP, sc: 0.6 }], [co, ['H1', 'coconut', -0.1], { ...POP, sc: 0.6 }], [ba.g, ['H1', 'bacterium', -0.1], { ...POP, sc: 0.6 }]],
      anim: t => { const on = t > tm(['H3', 'stained']) - 0.2; ob.style.opacity = on ? 0 : 1; sl.style.opacity = on ? 1 : 0; pu.style.opacity = t > tm(['H3', 'purple']) - 0.1 ? 1 : 0.15; pk.style.opacity = t > tm(['H3', 'pink']) - 0.1 ? 1 : 0.15; } };
  } }));

/* ---------- B: the envelope ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'THE CELL ENVELOPE', build: (el, s) => {
  const gl = mk(s, 'rect', { x: 80, y: 130, width: 760, height: 70, fill: K8.GLYf, stroke: K8.GLY, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
  const wl = mk(s, 'rect', { x: 80, y: 200, width: 760, height: 80, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 3 });
  const mb = mk(s, 'g', {}); K8.bilayer(mb, 80, 840, 316, 0.38);
  const cy = mk(s, 'g', {}); mk(cy, 'rect', { x: 80, y: 340, width: 760, height: 150, fill: K8.BCY }); K8.dots(cy, [[140, 400], [260, 430], [380, 380], [520, 450], [650, 400], [760, 440], [200, 470], [460, 410]], 6); cap(cy, 460, 470, 'CYTOPLASM', { fill: C.mute });
  const ba = K8.bact(s, 1360, 300, 0.75, { fla: false, pili: false, meso: false, plasmid: false });
  const one = div(el, 'chp', { left: '1150px', top: '470px', background: 'var(--ac2)', color: '#1F6B3F' }, 'Together: one protective unit');
  const tb = div(el, 'chp', { left: '80px', top: '80px' }, '3 layers, tightly bound');
  return { els: [[gl, ['B3', 'glycocalyx', -0.15], { dy: -14 }], [wl, ['B3', 'wall', -0.15], { dy: -14 }], [mb, ['B3', 'plasma', -0.15], { dy: -14 }], [cy, ['B2', 'Most', -0.1], { dy: 0, fade: 0.4 }], [ba.g, ['B2', 'bacteria', -0.1], { ...POP, sc: 0.7 }], [one, ['B3', 'together', -0.1]], [tb, ['B2', 'three', -0.1]]],
    labs: [[lab(s, 820, 165, 900, 165, 'Glycocalyx · outermost'), ['B3', 'glycocalyx']], [lab(s, 820, 240, 900, 240, 'Cell wall'), ['B3', 'wall']], [lab(s, 820, 316, 900, 316, 'Plasma membrane'), ['B3', 'plasma']]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['BACTERIUM', 'ENVELOPE', 'RIBOSOME'], scales: ['x5000', 'x50000', 'x500000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Bacterium', 'A flagellum, pili, fimbriae.', 'Threads and hairs outside.'], ['RUNG 2 OF 3', 'Envelope', 'Three layers, one unit.', 'Ribosomes lie inside.'], ['RUNG 3 OF 3', 'Ribosome', 'About 15 nm by 20 nm.', '50S + 30S make 70S.']],
  av: { who: 'Diya', text: 'Not 80S. It is 70S!', tin: ['Z5', 'seventy', 0.5], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [400, 190, 60], build: g => { const b = K8.bact(g, 400, 263, 1.1, { meso: false });
      return { labs: [[lab(g, 400 + 310 * 1.1, 263, 780, 150, 'Flagellum'), ['Z2', 'flagellum']], [lab(g, 400 - 30, 263 - 95 * 1.1, 250, 80, 'Pili and fimbriae', 'end'), ['Z2', 'pili']]],
        anim: t => attr(b.fl[0], 'transform', `translate(0 ${(6 * Math.sin(t * 5)).toFixed(1)})`) }; } },
    { at: 'Z3', focus: [528, 420, 50], build: g => {
      P(g, 'M0,40 Q528,0 1056,40 L1056,130 Q528,90 0,130 Z', K8.GLYf, K8.GLY, 2.5, { 'stroke-dasharray': '6 5' }); P(g, 'M0,130 Q528,90 1056,130 L1056,220 Q528,180 0,220 Z', K8.CWf, K8.CW, 3);
      mk(g, 'rect', { x: 0, y: 262, width: 1056, height: 264, fill: K8.BCY }); K8.bilayer(g, 0, 1056, 240, 0.42);
      const rb = K8.dots(g, [[120, 360], [260, 420], [400, 340], [528, 420], [680, 360], [820, 440], [940, 350], [330, 480], [760, 490]], 8);
      return { labs: [[lab(g, 300, 80, 640, 80, 'Glycocalyx'), ['Z3', 'glycocalyx']], [lab(g, 300, 165, 640, 170, 'Cell wall'), ['Z3', 'wall']], [lab(g, 300, 242, 640, 300, 'Plasma membrane'), ['Z3', 'membrane']]] }; } },
    { at: 'Z4', build: g => { const r = K8.ribo(g, 528, 240, 5.2);
      const sz = cap(g, 528, 50, 'ABOUT 15 NM BY 20 NM', { fill: C.ink, 'font-size': 20 });
      const eq = mk(g, 'g', {}); mk(eq, 'rect', { x: 368, y: 446, width: 320, height: 54, rx: 12, fill: 'var(--ac2)' }); txt(eq, 528, 482, '50S + 30S = 70S', { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 600, fill: '#1F6B3F' });
      return { els: [[sz, ['Z4', 'fifteen', -0.2], { dy: 8 }], [eq, ['Z5', 'seventy', -0.2], { ...POP, sc: 0.6 }]],
        labs: [[lab(g, 528 + 110, 200, 790, 140, '50S · large'), ['Z5', 'large']], [lab(g, 528 + 90, 320, 790, 380, '30S · small'), ['Z5', 'small']]] }; } }] }));

/* ---------- L: three layers ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE THREE LAYERS · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Slime layer', 'glycocalyx as a loose sheath'], ['Capsule', 'glycocalyx that is thick and tough'], ['Cell wall', 'gives shape · stops bursting or collapsing'], ['Plasma membrane', 'semi-permeable · built much like ours'], ['Gram stain', 'takes it up: Gram positive · does not: negative']], LT) }) },
  { pos: 'R', label: 'WATCH EACH LAYER', build: (el, s) => {
    const capP = P(s, rodD(392, 270, 250, 132), K8.GLYf, K8.GLY, 4);
    const b = K8.bact(s, 392, 270, 1.2, { fla: false, pili: false, meso: false, plasmid: false });
    const gr = mk(s, 'g', {}); const g1 = K8.bact(gr, 220, 270, 0.6, { fla: false, pili: false, meso: false, plasmid: false, gly: false }), g2 = K8.bact(gr, 564, 270, 0.6, { fla: false, pili: false, meso: false, plasmid: false, gly: false });
    attr(g1.wall, 'fill', GPf); attr(g1.wall, 'stroke', GP); attr(g1.mem, 'fill', '#E6DBF5'); attr(g2.wall, 'fill', GNf); attr(g2.wall, 'stroke', GN); attr(g2.mem, 'fill', '#FBE3E8');
    cap(gr, 220, 380, 'GRAM POSITIVE · TAKES THE STAIN', { fill: GP, 'font-size': 15 }); cap(gr, 564, 380, 'GRAM NEGATIVE · DOES NOT', { fill: GN, 'font-size': 15 });
    const ar = mk(s, 'g', {}); [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => P(ar, `M${392 + dx * 120},${270 + dy * 40} l${dx * 60},${dy * 40}`, 'none', CB, 4));
    const io = []; for (let k = 0; k < 5; k++) io.push(CC(s, 0, 0, 6, '#fff', K8.HEAD, 2.5));
    const cp = cap(s, 392, 490, '', { fill: C.ink, 'font-size': 18 }); const CP = ['SLIME LAYER: A LOOSE SHEATH', 'CAPSULE: THICK AND TOUGH', 'CELL WALL: SHAPE AND SUPPORT', 'PLASMA MEMBRANE: LETS SOME THINGS THROUGH', 'THE ENVELOPE DECIDES THE STAIN'];
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      cp.textContent = c >= 0 ? CP[c] : 'GLYCOCALYX · CELL WALL · PLASMA MEMBRANE';
      capP.style.opacity = c === 1 ? 1 : 0; attr(b.gly, 'stroke-width', c === 0 ? 4 : 2.5); b.gly.style.opacity = c === 1 ? 0 : 1;
      attr(b.wall, 'stroke', c === 2 ? CB : K8.CW); attr(b.wall, 'stroke-width', c === 2 ? 8 : 4); ar.style.opacity = c === 2 ? 1 : 0; ar.style.transform = `scale(${1 + 0.04 * Math.sin(t * 6)})`;
      attr(b.mem, 'stroke', c === 3 ? CB : K8.HEAD); attr(b.mem, 'stroke-width', c === 3 ? 7 : 3.5);
      io.forEach((e, k) => { const v = (t * 0.6 + k / 5) % 1, y = 270 - 150 + v * 130; attr(e, 'cx', 300 + k * 45); attr(e, 'cy', y.toFixed(1)); e.style.opacity = c === 3 && k % 2 === 0 ? 1 : c === 3 ? (y < 270 - 84 ? 1 : 0) : 0; });
      b.g.style.opacity = c === 4 ? 0 : 1; capP.style.display = c === 4 ? 'none' : ''; gr.style.opacity = c === 4 ? M.clamp((t - ts[4]) / 0.4) : 0; } }; } }] });

/* ---------- C: mesosome ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE MESOSOME · FOLDS OF THE MEMBRANE', build: (el, s) => {
  const b = K8.bact(s, 400, 320, 2.0, { fla: false, pili: false, plasmid: false, gly: false });
  const d2 = P(b.i, 'M-10,-10 C30,-36 80,-20 70,10 C60,40 10,50 -20,30', 'none', K8.DNA, 3.5);
  const F = [['Vesicles · tubules · lamellae', ['C2', 'vesicles']], ['Helps make the cell wall', ['C3', 'making']], ['Helps copy the DNA', ['C3', 'copying']], ['Shares DNA to daughter cells', ['C3', 'sharing']], ['Respiration and secretion', ['C4', 'respiration']], ['More surface area, more enzymes', ['C4', 'surface']], ['Chromatophores: pigments', ['C4', 'chromatophores']]]
    .map(([w, at], i) => [div(el, 'chp', { left: (i < 4 ? 820 : 1200) + 'px', top: 110 + (i < 4 ? i : i - 4) * 84 + 'px', width: '350px' }, w), [at[0], at[1], -0.1]]);
  const cy = div(el, 'tb', { left: '1200px', top: '380px' }, 'CHROMATOPHORES: IN CYANOBACTERIA');
  return { els: [[b.g, ['C1', 'special', -0.3], { ...POP, sc: 0.8 }], ...F, [cy, ['C4', 'cyanobacteria', -0.1], { dy: 8 }]],
    labs: [[lab(s, 248, 300, 248, 520, 'Mesosome', 'middle'), ['C2', 'mesosome']]],
    anim: t => { const g = M.io((t - tm(['C2', 'folds']) + 0.3) / 1.2); attr(b.meso, 'transform', `translate(-100 -61) scale(1 ${(0.15 + 0.85 * g).toFixed(3)}) translate(100 61)`);
      const hi = t > tm(['C2', 'mesosome']); attr(b.meso, 'stroke', hi ? CB : K8.HEAD); attr(b.meso, 'stroke-width', hi ? 5 : 3);
      d2.style.opacity = t > tm(['C3', 'copying']) ? M.clamp((t - tm(['C3', 'copying'])) / 0.6) : 0; } }; } }] });

/* ---------- D: flagellum, pili, fimbriae ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'FLAGELLUM · FOR SWIMMING', pill: ['The filament is the longest part', ['D2', 'longest', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 40, y: 90, width: 46, height: 380, fill: K8.GLYf }); mk(s, 'rect', { x: 86, y: 90, width: 50, height: 380, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 2 }); mk(s, 'rect', { x: 136, y: 90, width: 18, height: 380, fill: '#D6E9F5', stroke: K8.HEAD, 'stroke-width': 2 }); mk(s, 'rect', { x: 154, y: 90, width: 40, height: 380, fill: K8.BCY });
    const bb = mk(s, 'g', {}); [100, 120, 145, 160].forEach(x => mk(bb, 'rect', { x: x - 5, y: 262, width: 10, height: 36, rx: 3, fill: '#5B544A' })); P(bb, 'M95,280 L170,280', 'none', '#5B544A', 6);
    const hk2 = P(s, 'M190,280 C230,280 240,250 270,250', 'none', '#5B544A', 9);
    const fil = P(s, '', 'none', K8.INK, 5);
    // envelope is on the left: the flagellum grows out to the right from the basal body
    return { labs: [[lab(s, 120, 300, 140, 420, 'Basal body'), ['D2', 'basal']], [lab(s, 240, 254, 300, 160, 'Hook'), ['D2', 'hook']], [lab(s, 560, 250, 600, 400, 'Filament'), ['D2', 'filament']]],
      els: [[bb, ['D2', 'basal', -0.2], { ...POP, sc: 0.6 }], [hk2, ['D2', 'hook', -0.2], { dy: 0, fade: 0.3 }]],
      anim: t => { attr(fil, 'd', wave(270, 740, 250, 26, t * 6, 0.03)); fil.style.opacity = t > tm(['D2', 'filament']) - 0.3 ? 1 : (t > tm(['D2', 'flagella']) - 0.2 ? 0.35 : 0); } }; } },
  { pos: 'R', label: 'PILI AND FIMBRIAE · NOT FOR MOVING', tin: ['D3', null, -0.2], build: (el, s) => {
    const rock = mk(s, 'g', {}); P(rock, 'M0,470 C120,440 260,460 392,450 C520,440 660,460 784,445 L784,580 L0,580 Z', '#A8927A', '#6E5A44', 3); cap(rock, 392, 530, 'A ROCK IN A STREAM', { fill: '#FFFFFF' });
    const bg = mk(s, 'g', {}), bi = mk(bg, 'g', {});
    const pl = [P(bi, 'M300,230 C260,170 230,140 180,110', 'none', '#6B7280', 6), P(bi, 'M480,230 C520,170 560,150 620,120', 'none', '#6B7280', 6)];
    const fm = mk(bi, 'g', {}); for (let k = 0; k < 26; k++) { const a = k / 26 * Math.PI * 2, x = 392 + 150 * Math.cos(a), y = 270 + 56 * Math.sin(a); mk(fm, 'line', { x1: x, y1: y, x2: x + 18 * Math.cos(a), y2: y + 18 * Math.sin(a), stroke: '#8C8C8C', 'stroke-width': 2.5, 'stroke-linecap': 'round' }); }
    P(bi, rodD(392, 270, 160, 60), K8.CWf, K8.CW, 4); P(bi, rodD(392, 270, 150, 50), K8.BCY, K8.HEAD, 3);
    return { els: [[rock, ['D4', 'rocks', -0.2], { dy: 30 }], [fm, ['D4', 'Fimbriae', -0.2], { dy: 0, fade: 0.4 }]], labs: [[lab(bi, 180, 110, 240, 90, 'Pilus · a long tube', 'start'), ['D3', 'Pili']], [lab(bi, 555, 300, 600, 380, 'Fimbriae'), ['D4', 'Fimbriae']]],
      anim: t => { const v = M.io((t - tm(['D4', 'stick'])) / 1.2); attr(bi, 'transform', `translate(0 ${(150 * v).toFixed(1)})`); } }; } }] });

/* ---------- U: ribosomes, inclusion bodies + think ---------- */
const TH = { q: 'Which helps a bacterium swim?', opts: ['Its pili', 'Its flagellum'], right: 1, why: 'The flagellum. Pili and fimbriae do not help in moving.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'RIBOSOMES AND STORES', tout: 'U4', build: (el, s) => {
    const mem = mk(s, 'g', {}); mk(mem, 'rect', { x: 60, y: 90, width: 700, height: 22, fill: '#D6E9F5', stroke: K8.HEAD, 'stroke-width': 2.5 }); K8.dots(mem, [[110, 124], [190, 126], [260, 124], [350, 126], [440, 124], [520, 126], [610, 124], [690, 126]], 7); cap(mem, 410, 160, 'RIBOSOMES ON THE PLASMA MEMBRANE', { fill: C.ink });
    const ps = mk(s, 'g', {}); const m = P(ps, wave(80, 740, 360, 10, 0, 0.05), 'none', '#3A8F8F', 4); txt(ps, 80, 410, 'mRNA', { 'font-size': 18, 'font-weight': 600, fill: '#3A8F8F' });
    const R = [0, 1, 2, 3, 4].map(() => { const g = mk(ps, 'g', {}); const pr = P(g, '', 'none', K8.PRO, 4); const rb = K8.ribo(g, 0, 0, 1); return { g, pr, rb }; });
    cap(ps, 410, 470, 'A POLYSOME: MANY RIBOSOMES ON ONE mRNA', { fill: C.ink });
    const inc = mk(s, 'g', {}); const IT = [['Phosphate granules', '#C9962B', ['U3', 'phosphate']], ['Cyanophycean granules', '#3E9B8F', ['U3', 'cyanophycean']], ['Glycogen granules', '#B07A4A', ['U3', 'glycogen']], ['Gas vacuoles', '#5AA0C8', ['U3', 'gas']]];
    const ig = IT.map(([n, c, at], i) => { const g = mk(inc, 'g', {}), y = 130 + i * 92; for (let k = 0; k < 5; k++) CC(g, 900 + (k % 3) * 22, y - 10 + Math.floor(k / 3) * 22, i === 3 ? 12 : 9, c, i === 3 ? K8.HEAD : 'none', 2); txt(g, 990, y + 8, n, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.ink }); return [g, [at[0], at[1], -0.15], { dx: -14, dy: 0 }]; });
    const nm = cap(s, 1180, 480, 'INCLUSION BODIES: NO MEMBRANE AROUND THEM', { fill: CB, 'font-size': 16 });
    return { els: [[mem, ['U1', 'attached', -0.3], { dy: -12 }], [ps, ['U2', 'Several', -0.2], { dy: 12 }], ...ig, [nm, ['U3', 'no', -0.1], { dy: 8 }]],
      anim: t => { R.forEach(({ g, pr }, k) => { const v = ((t - tm('U2')) * 0.06 + k * 0.2) % 1, x = 100 + 620 * (v < 0 ? v + 1 : v), y = 360 + 10 * Math.sin((x - 80) * 0.05) - 22; attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); const L = 10 + 70 * (v < 0 ? v + 1 : v); attr(pr, 'd', `M0,-24 q-12,${-L / 3} 0,${-L / 1.5} t0,${-L / 3}`); }); } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'pili', -0.1], why: ['U5', 'flagellum'] })] });

/* ---------- W: worked example ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE PART FROM ITS JOB', svg: false, build: el => EP.cols(el, [
  ['JOB 1 · STOPS BURSTING', 'Cell wall', 'GIVES SHAPE · STRONG SUPPORT', s => { const b = K8.bact(s, 248, 150, 0.85, { fla: false, pili: false, meso: false, plasmid: false, gly: false }); attr(b.wall, 'stroke', CB); attr(b.wall, 'stroke-width', 7); }, ['W2', 'stops', -0.2], ['W2', 'cell'], ['W2', 'wall']],
  ['JOB 2 · STICKS TO A HOST', 'Fimbriae', 'SMALL, BRISTLE LIKE FIBRES', s => { for (let k = 0; k < 6; k++) { mk(s, 'rect', { x: 20 + k * 78, y: 200, width: 74, height: 60, rx: 8, fill: '#F7DCD3', stroke: '#B5655A', 'stroke-width': 2.5 }); CC(s, 57 + k * 78, 232, 9, '#D7C3E6', '#7B4B94', 2); } const fm = mk(s, 'g', {}); for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; mk(fm, 'line', { x1: 248 + 112 * Math.cos(a), y1: 130 + 42 * Math.sin(a), x2: 248 + 128 * Math.cos(a), y2: 130 + 56 * Math.sin(a), stroke: CB, 'stroke-width': 3, 'stroke-linecap': 'round' }); } P(s, rodD(248, 130, 120, 44), K8.CWf, K8.CW, 3.5); P(s, rodD(248, 130, 110, 34), K8.BCY, K8.HEAD, 2.5); }, ['W3', 'stick', -0.2], ['W3', 'fimbriae'], ['W3', 'fimbriae', 0.4]],
  ['JOB 3 · MORE MEMBRANE AREA', 'Mesosome', 'FOLDS OF THE PLASMA MEMBRANE', s => { const b = K8.bact(s, 248, 150, 0.85, { fla: false, pili: false, plasmid: false, gly: false }); attr(b.meso, 'stroke', CB); attr(b.meso, 'stroke-width', 6); }, ['W4', 'increases', -0.2], ['W5', 'mesosome'], ['W5', 'mesosome', 0.4]]]) }] });

EP.run({
  icons: { coco: ['M12 3a9 9 0 1 0 0.1 0', 'M12 7a5 5 0 1 0 0.1 0'], bact: ['M7 8h10a4 4 0 0 1 0 8H7a4 4 0 0 1 0-8Z', 'M9 12h6'] },
  jobs: [['package', 'A parcel', 'IN BUBBLE WRAP', ['H1', 'parcel']], ['coco', 'A coconut', 'HUSK AND SHELL', ['H1', 'coconut']], ['bact', 'A bacterium', 'ON A LAB SLIDE', ['H1', 'bacterium']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Glycocalyx</span>, cell wall, plasma membrane.', f: '<span class="lad">from outside in · <b>one protective unit</b></span>', t2: ['T1', 'Glycocalyx', -0.2], tf: ['T1', 'outside', -0.1] },
  trap: { wrong: '50S + 30S = 80S bacterial ribosome', right: 'Together, 50S and 30S make a 70S ribosome', tWrong: ['X2', 'fifty', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'Together', -0.2], tSvg: ['X3', 'seventy', -0.4],
    build: s => { K8.ribo(s, 130, 120, 1.6); txt(s, 220, 132, '+', { 'font-size': 36, 'font-weight': 700, 'text-anchor': 'middle', fill: C.ink }); K8.ribo(s, 300, 120, 1.6); txt(s, 400, 132, '= 70S', { 'font-size': 28, 'font-weight': 700, 'text-anchor': 'middle', fill: CB }); cap(s, 230, 230, 'S UNITS DO NOT SIMPLY ADD', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: envelope layers, mesosome jobs, ribosome units', at: ['E1', 'statement'] },
  mcq: { q: 'Which statement about mesosomes is <b>wrong</b>? Mesosomes...', opts: ['Help form the wall', 'Help copy the DNA', 'Add membrane area', 'Fold in the cell wall'], right: 3 }, mcqAt: ['Q1', 'Which', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['A: they help make the wall', ['A2', 'make']], ['B: they help copy the DNA', ['A2', 'copy']], ['C: they add surface area', ['A2', 'surface']], ['D is wrong: membrane folds', ['A3', 'folds']]],
  recap: { title: 'Recap · the prokaryotic cell', lines: ['<b>Envelope</b>: glycocalyx, cell wall, plasma membrane', '<b>Glycocalyx</b>: slime layer (loose) or capsule (tough)', '<b>Mesosome</b>: membrane folds · wall, DNA, respiration', '<b>Flagellum</b>: filament, hook, basal body · pili, fimbriae', '<b>Ribosome</b>: 50S + 30S = 70S · polysome on mRNA'] },
  yq: ['Name the three layers of the cell envelope, from outside in.', 'What are the three parts of a flagellum?', 'Which two units make a 70S ribosome?'],
  next: { label: 'NEXT · EP 63', topic: 'Next: Cell Membrane - The Fluid Mosaic Model' }
});
})();
