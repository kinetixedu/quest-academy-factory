// PUC Biology Ep 60: Cell - Discovery and Cell Theory (Living diagram, leaf green). Runner: ep.js, drawings: cell8.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, E, wrap, blob } = K8, CC = K8.C, CB = C.ac;
const ON = '#F4EBD0', ONs = '#A8925A', CHK = '#F7DCD3', CHKs = '#B5655A';
// onion peel: brick-like cells
const onion = (g, x0, y0, cols, rows, w, h, o = {}) => { const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * w + (r % 2) * w / 2 - (r % 2 && c === cols - 1 ? 0 : 0), y = y0 + r * h; if (r % 2 && c === cols - 1) continue;
    const e = mk(g, 'rect', { x, y, width: w - 4, height: h - 4, rx: 6, fill: ON, stroke: ONs, 'stroke-width': o.sw || 3 }); cells.push(e); E(g, x + w * 0.3 + ((c + r) % 3) * w * 0.15, y + h / 2 - 2, w * 0.07, h * 0.16, '#D7C3E6', '#7B4B94', 1.5); }
  return cells; };
const cheek = (g, x, y, s = 1, ph = 0) => { const R = wrap(g, x, y, s); P(R.i, blob(60, 44, 9, 0.12, ph), CHK, CHKs, 2.5); E(R.i, 4, 2, 10, 8, '#D7C3E6', '#7B4B94', 2); return R; };
const amoeba = (x, y, s, t) => { const n = 12, pts = []; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, r = 1 + 0.18 * Math.sin(3 * a + t * 1.7) + 0.1 * Math.cos(5 * a - t * 1.3); pts.push([x + 70 * s * r * Math.cos(a), y + 50 * s * r * Math.sin(a)]); }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`; for (let k = 0; k < n; k++) { const p1 = pts[k], p2 = pts[(k + 1) % n], m = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]; d += ` Q${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`; } return d + ' Z'; };

const S = [];
/* ---------- H: the college lab ---------- */
S.push(EP.hook({ label: 'THE COLLEGE LAB', face: 'diya', pill: ['Tiny units, everywhere', ['H2', 'tiny', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Why is all life built from them?', ['H3', 'why']], ['Who first worked this out?', ['H3', 'who']]],
  a: [['ANSWER 1', 'Cells: the basic unit of life', ['H4', 'cells']], ['ANSWER 2', 'Many scientists, one after another', ['H4', 'many']]],
  chips: [['First cells seen', ['H5', 'first']], ['Cell theory', ['H5', 'theory']], ['Two rules', ['H5', 'two']], ['Sizes', ['H5', 'size']], ['Shapes', ['H5', 'shape']]],
  build: (el, s) => {
    // microscope
    const ms = mk(s, 'g', {}); P(ms, 'M70,520 L250,520 L250,500 L70,500 Z', '#5E6A7A', '#2E2A24', 3); P(ms, 'M150,500 L150,450 C150,380 120,330 150,250', 'none', '#2E2A24', 14); P(ms, 'M150,500 L150,450 C150,380 120,330 150,250', 'none', '#7D8898', 9);
    mk(ms, 'rect', { x: 120, y: 160, width: 60, height: 120, rx: 10, fill: '#7D8898', stroke: '#2E2A24', 'stroke-width': 3, transform: 'rotate(-14 150 220)' }); mk(ms, 'rect', { x: 100, y: 410, width: 120, height: 12, rx: 3, fill: '#5E6A7A', stroke: '#2E2A24', 'stroke-width': 2.5 }); mk(ms, 'rect', { x: 130, y: 400, width: 60, height: 10, fill: '#D6E9F5', stroke: '#5AA0C8', 'stroke-width': 2 });
    // view circle
    mk(mk(s, 'clipPath', { id: 'hkc60' }), 'circle', { cx: 500, cy: 330, r: 196 });
    CC(s, 500, 330, 204, '#2E2A24', 'none', 0); const v = mk(s, 'g', { 'clip-path': 'url(#hkc60)' }); mk(v, 'rect', { x: 290, y: 120, width: 420, height: 420, fill: '#FBF8EE' });
    const vo = mk(v, 'g', {}); onion(vo, 280, 120, 5, 7, 96, 64);
    const vc = mk(v, 'g', {}); [[380, 240, 0], [530, 210, 1], [620, 330, 2], [420, 380, 3], [560, 450, 4], [360, 500, 5]].forEach(([x, y, k]) => cheek(vc, x, y, 1, k));
    const vp = mk(v, 'g', {}), am = P(vp, '', '#E3EFD6', '#5A8F4E', 3), amn = E(vp, 0, 0, 14, 12, '#D7C3E6', '#7B4B94', 2);
    const par = mk(vp, 'g', {}); E(par, 0, 0, 52, 22, '#F2E7C8', '#9A7B35', 2.5); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; mk(par, 'line', { x1: 52 * Math.cos(a), y1: 22 * Math.sin(a), x2: 60 * Math.cos(a), y2: 27 * Math.sin(a), stroke: '#9A7B35', 'stroke-width': 1.5 }); }
    CC(s, 500, 330, 196, 'none', '#2E2A24', 6);
    return { anim: t => { const a = tm(['H1', 'scraping']) - 0.2, b = tm(['H1', 'pond']) - 0.2; vo.style.opacity = t < a ? 1 : 0; vc.style.opacity = t >= a && t < b ? 1 : 0; vp.style.opacity = t >= b ? 1 : 0;
      attr(am, 'd', amoeba(440 + 20 * Math.sin(t * 0.4), 280, 1, t)); attr(amn, 'cx', (440 + 20 * Math.sin(t * 0.4)).toFixed(1)); attr(amn, 'cy', 284);
      attr(par, 'transform', `translate(${(540 + 60 * Math.cos(t * 0.5)).toFixed(1)} ${(440 + 20 * Math.sin(t * 0.5)).toFixed(1)}) rotate(${(-20 + 15 * Math.sin(t * 0.5)).toFixed(1)})`); } };
  } }));

/* ---------- B: what is a cell ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS A CELL?', build: (el, s) => {
  const wall = mk(s, 'g', {}), bricks = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const x = 80 + c * 70 + (r % 2) * 35, y = 470 - r * 40; if (r % 2 && c === 5) continue; bricks.push(mk(wall, 'rect', { x, y, width: 66, height: 36, rx: 4, fill: '#D9845E', stroke: '#8A4A2E', 'stroke-width': 2.5 })); }
  const one = mk(s, 'rect', { x: 230, y: 130, width: 66, height: 36, rx: 4, fill: '#D9845E', stroke: '#8A4A2E', 'stroke-width': 3 }); cap(s, 263, 112, 'ONE BRICK', { fill: C.ink });
  P(s, 'M560,330 L660,330 m-14,-12 l14,12 l-14,12', 'none', CB, 4);
  const tis = mk(s, 'g', {}); onion(tis, 700, 150, 4, 5, 90, 66); const one2 = mk(s, 'rect', { x: 790, y: 216, width: 86, height: 62, rx: 6, fill: 'none', stroke: CB, 'stroke-width': 5 }); cap(s, 880, 120, 'ONE CELL', { fill: CB });
  const K = [['Unicellular: one cell that lives on its own', ['B3', 'unicellular']], ['Less than a whole cell cannot live alone', ['B3', 'less']], ['Cell: basic unit of structure and function', ['B3', 'basic']]].map(([w, at], i) => [div(el, 'chp', { left: '1110px', top: 160 + i * 110 + 'px', width: '440px', height: '84px', whiteSpace: 'normal', lineHeight: '1.3' }, w), [at[0], at[1], -0.1]]);
  const amb = P(s, '', '#E3EFD6', '#5A8F4E', 3); const amn = E(s, 0, 0, 10, 8, '#D7C3E6', '#7B4B94', 2);
  return { els: [[wall, ['B2', 'bricks', -0.1], { dy: 20 }], [one, ['B2', 'one', -0.1], { ...POP, sc: 0.4 }], [tis, ['B3', 'cell', -0.1], { dx: 30, dy: 0 }], [one2, ['B3', 'brick', 0], { ...POP, sc: 0.6 }], ...K],
    anim: t => { amb.style.opacity = amn.style.opacity = 0; attr(amb, 'd', amoeba(1070, 202, 0.32, t)); attr(amn, 'cx', 1070); attr(amn, 'cy', 202); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['ONION PEEL', 'ONE CELL', 'NUCLEUS'], scales: ['x100', 'x400', 'x2000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Onion peel', 'A sheet of tiny boxes, side by side.', 'Each box is one cell.'], ['RUNG 2 OF 3', 'One cell', 'Wall, membrane and cytoplasm.', 'The jelly inside is the cytoplasm.'], ['RUNG 3 OF 3', 'Nucleus', 'A dense body in a membrane.', 'Chromosomes carry DNA.']],
  av: { who: 'Diya', text: 'So onion cells are eukaryotic!', tin: ['Z5', 'prokaryotic', 0.5], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 263, 70], build: g => { const cl = onion(g, 60, 40, 9, 7, 112, 70);
      const hi = mk(g, 'rect', { x: 476, y: 232, width: 108, height: 66, rx: 6, fill: 'none', stroke: CB, 'stroke-width': 0 });
      return { labs: [[lab(g, 560, 266, 760, 470, 'One cell'), ['Z2', 'Each']]], anim: t => attr(hi, 'stroke-width', t > tm(['Z2', 'Each']) ? 5 : 0) }; } },
    { at: 'Z3', focus: [470, 290, 70], build: g => { mk(g, 'rect', { x: 268, y: 60, width: 520, height: 400, rx: 26, fill: ON, stroke: ONs, 'stroke-width': 10 });
      mk(g, 'rect', { x: 286, y: 78, width: 484, height: 364, rx: 18, fill: '#FBF7EA', stroke: '#3E9B5F', 'stroke-width': 3.5 });
      P(g, 'M540,110 C660,100 740,150 736,260 C732,380 660,420 560,410 C500,404 520,330 560,280 C600,220 470,130 540,110 Z', K8.VAf, K8.VA, 3);
      const nu = K8.nuc(g, 440, 290, 50);
      return { labs: [[lab(g, 274, 160, 230, 120, 'Cell wall', 'end'), ['Z3', 'wall']], [lab(g, 288, 360, 230, 400, 'Cell membrane', 'end'), ['Z3', 'membrane']], [lab(g, 360, 160, 230, 260, 'Cytoplasm', 'end'), ['Z3', 'cytoplasm']], [lab(g, 480, 260, 830, 200, 'Nucleus'), ['Z4', 'nucleus']]] }; } },
    { at: 'Z4', build: g => { CC(g, 528, 263, 200, '#E9DDF3', K8.NU, 5); CC(g, 528, 263, 186, 'none', K8.NU, 3);
      const ch = mk(g, 'g', {}); [[440, 200, 30], [560, 190, -20], [620, 300, 60], [470, 330, -50], [540, 360, 10]].forEach(([x, y, a]) => { const c = mk(ch, 'g', { transform: `rotate(${a} ${x} ${y})` }); P(c, `M${x - 26},${y - 12} Q${x},${y} ${x - 26},${y + 12} M${x + 26},${y - 12} Q${x},${y} ${x + 26},${y + 12}`, 'none', K8.DNA, 7); });
      const dn = P(g, 'M330,420 C360,400 380,440 410,420 S460,400 490,420', 'none', K8.DNA, 3);
      return { labs: [[lab(g, 668, 120, 760, 90, 'Nuclear membrane'), ['Z4', 'wrapped']], [lab(g, 640, 300, 770, 280, 'Chromosomes'), ['Z4', 'chromosomes']], [lab(g, 540, 368, 770, 400, 'DNA'), ['Z4', 'DNA']]],
        els: [[ch, ['Z4', 'chromosomes', -0.2], { ...POP, sc: 0.6 }]] }; } }] }));

/* ---------- L: the story of cell theory ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE CELL THEORY · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Leeuwenhoek · Brown', 'first live cell · then the nucleus'], ['1838 · Schleiden', 'botanist · all plants are made of cells'], ['1839 · Theodore Schwann', 'plasma membrane · wall only in plants'], ['Schleiden + Schwann', 'the cell theory · but where do new cells come from?'], ['1855 · Rudolf Virchow', 'omnis cellula e cellula · final shape']], LT) }) },
  { pos: 'R', label: 'WHAT EACH ONE FOUND', build: (el, s) => {
    const yrs = [['FIRST', 'Leeuwenhoek'], ['1838', 'Schleiden'], ['1839', 'Schwann'], ['TOGETHER', 'Cell theory'], ['1855', 'Virchow']];
    P(s, 'M70,120 L714,120', 'none', '#CBD0DA', 4); const dots = yrs.map(([y, n], i) => { const x = 90 + i * 151, d = CC(s, x, 120, 12, '#fff', '#CBD0DA', 3); const t1 = txt(s, x, 160, y, { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: C.mute }); return [d, t1]; });
    const box = mk(s, 'rect', { x: 60, y: 190, width: 664, height: 290, rx: 14, fill: '#FBFAF6', stroke: '#E4E1D8', 'stroke-width': 2 });
    const V = [0, 1, 2, 3, 4].map(() => mk(s, 'g', {}));
    // 0: a live cell, nucleus appears at Brown
    const a0 = P(V[0], '', '#E3EFD6', '#5A8F4E', 3), n0 = E(V[0], 392, 336, 18, 15, '#D7C3E6', '#7B4B94', 2.5); cap(V[0], 392, 460, 'A LIVE CELL · THEN ITS NUCLEUS', { fill: C.ink });
    // 1: plant tissue
    onion(V[1], 150, 220, 5, 3, 100, 64); cap(V[1], 392, 460, 'ALL PLANTS: MADE OF CELLS', { fill: C.ink });
    // 2: animal cell, membrane glows
    const m2 = P(V[2], 'M260,330 C260,240 330,220 392,222 C470,224 530,250 528,330 C526,410 460,430 392,430 C320,430 260,410 260,330 Z', '#F7DCD3', '#B5655A', 3); E(V[2], 392, 326, 22, 18, '#D7C3E6', '#7B4B94', 2.5); cap(V[2], 392, 460, 'ANIMAL CELL · PLASMA MEMBRANE', { fill: C.ink });
    // 3: plant + animal
    mk(V[3], 'rect', { x: 150, y: 240, width: 200, height: 170, rx: 18, fill: ON, stroke: ONs, 'stroke-width': 7 }); E(V[3], 250, 325, 18, 15, '#D7C3E6', '#7B4B94', 2.5); P(V[3], K8.blob(95, 80, 9, 0.06, 2), '#F7DCD3', '#B5655A', 3, { transform: 'translate(540 325)' }); E(V[3], 540, 325, 18, 15, '#D7C3E6', '#7B4B94', 2.5); txt(V[3], 392, 336, '+', { 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 700, fill: CB }); cap(V[3], 392, 460, 'CELLS AND PRODUCTS OF CELLS', { fill: C.ink });
    // 4: dividing cell
    const d4 = mk(V[4], 'g', {}), L4 = P(d4, '', '#F7DCD3', '#B5655A', 3), nA = E(d4, 0, 0, 16, 14, '#D7C3E6', '#7B4B94', 2.5), nB = E(d4, 0, 0, 16, 14, '#D7C3E6', '#7B4B94', 2.5); cap(V[4], 392, 460, 'NEW CELLS FROM EXISTING CELLS', { fill: C.ink });
    const nm = div(el, '', { position: 'absolute', left: '0', top: '506px', width: '784px', textAlign: 'center', font: '700 26px Poppins', color: C.ink, whiteSpace: 'nowrap' });
    const NM = ['Anton Von Leeuwenhoek · Robert Brown', 'Matthias Schleiden', 'Theodore Schwann', 'Schleiden and Schwann', 'Rudolf Virchow'];
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      dots.forEach(([d, t1], i) => { attr(d, 'fill', i === c ? CB : i < c ? '#fff' : '#fff'); attr(d, 'stroke', i <= c ? CB : '#CBD0DA'); attr(t1, 'fill', i <= c ? CB : C.mute); });
      V.forEach((v, i) => { v.style.opacity = i === c ? M.clamp((t - ts[i] + 0.2) / 0.3).toFixed(2) : 0; }); box.style.opacity = c >= 0 ? 1 : 0;
      nm.textContent = c >= 0 ? NM[c] : ''; nm.style.opacity = c >= 0 ? 1 : 0;
      attr(a0, 'd', amoeba(392, 330, 1.3, t)); n0.style.opacity = t > tm(['L2', 'Brown']) ? 1 : 0; attr(n0, 'cx', 392); attr(n0, 'cy', 334);
      attr(m2, 'stroke', c === 2 && t > tm(['L4', 'thin']) ? CB : '#B5655A'); attr(m2, 'stroke-width', c === 2 && t > tm(['L4', 'thin']) ? 6 : 3);
      const v = M.io(((t - tm(['L6', 'divide'])) % 4) / 2.2), sep = 120 * v, w = 110 + sep / 2;
      attr(L4, 'd', `M${392 - w},330 C${392 - w},250 ${392 - 30 - sep / 4},250 392,${250 + 70 * v} C${392 + 30 + sep / 4},250 ${392 + w},250 ${392 + w},330 C${392 + w},410 ${392 + 30 + sep / 4},410 392,${410 - 70 * v} C${392 - 30 - sep / 4},410 ${392 - w},410 ${392 - w},330 Z`);
      attr(nA, 'cx', (392 - sep * 0.75).toFixed(1)); attr(nA, 'cy', 330); attr(nB, 'cx', (392 + sep * 0.75).toFixed(1)); attr(nB, 'cy', 330); } }; } }] });

/* ---------- C: the two rules ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'THE CELL THEORY TODAY', svg: false, build: el => {
    const r = [['RULE 1', 'All living organisms are made of', 'cells and products of cells', 'C2'], ['RULE 2', 'All cells arise from', 'pre-existing cells', 'C4']].map(([n, a, b, id], i) => [div(el, '', { position: 'absolute', left: '36px', top: 96 + i * 220 + 'px', width: '712px', height: '190px', borderRadius: '14px', background: 'var(--soft)' }, `<div class="tb" style="left:28px;top:24px;color:var(--ac)">${n}</div><div style="position:absolute;left:28px;top:62px;font:600 28px Poppins;white-space:nowrap">${a}</div><div style="position:absolute;left:28px;top:110px;font:700 34px Poppins;color:var(--ac);white-space:nowrap">${b}</div>`), [id, null, 0.1]]);
    return { els: r.map(([e, at]) => [e, at, { dx: -20, dy: 0 }]) }; } },
  { pos: 'R', label: 'SEE IT IN CELLS', build: (el, s) => {
    const tis = mk(s, 'g', {}), walls = onion(tis, 92, 96, 6, 3, 100, 66); cap(tis, 392, 330, 'A PLANT: CELLS + THEIR WALLS', { fill: C.ink });
    const d = mk(s, 'g', {}), body = P(d, '', '#F7DCD3', '#B5655A', 3), n1 = E(d, 0, 0, 16, 13, '#D7C3E6', '#7B4B94', 2.5), n2 = E(d, 0, 0, 16, 13, '#D7C3E6', '#7B4B94', 2.5);
    const two = cap(d, 392, 470, 'NOW THERE ARE TWO', { fill: CB, 'font-size': 20 }); cap(d, 392, 110, 'ONE CELL DIVIDES', { fill: C.ink });
    return { els: [[tis, ['C2', 'All', -0.1], { dy: 16 }], [d, ['C4', 'Watch', -0.2], { dy: 16 }], [two, ['C4', 'two', -0.1], { dy: 8 }]],
      anim: t => { const cw = t > tm(['C3', 'wall']); walls.forEach(e => { attr(e, 'stroke', cw ? CB : ONs); attr(e, 'stroke-width', cw ? 5 : 3); });
        const t0 = tm(['C4', 'Watch']); tis.style.display = t > t0 - 0.3 ? 'none' : '';
        const v = M.io((t - t0 - 0.3) / 1.8), cx = 392, cy = 300, sep = 150 * v, w = 120 + sep / 2, h = 96;
        attr(body, 'd', `M${cx - w},${cy} C${cx - w},${cy - h} ${cx - 20 - sep / 3},${cy - h} ${cx},${cy - h + 92 * v} C${cx + 20 + sep / 3},${cy - h} ${cx + w},${cy - h} ${cx + w},${cy} C${cx + w},${cy + h} ${cx + 20 + sep / 3},${cy + h} ${cx},${cy + h - 92 * v} C${cx - 20 - sep / 3},${cy + h} ${cx - w},${cy + h} ${cx - w},${cy} Z`);
        const nx = (60 + sep / 4) * v; attr(n1, 'cx', (cx - nx).toFixed(1)); attr(n1, 'cy', cy); attr(n2, 'cx', (cx + nx).toFixed(1)); attr(n2, 'cy', cy); } }; } }] });

/* ---------- D: sizes ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [{ pos: 'W', label: 'HOW BIG IS A CELL?', ghost: 'NOT TO SCALE', build: (el, s) => {
  P(s, 'M80,420 L1520,420', 'none', '#CBD0DA', 3);
  const it = [[200, 'Mycoplasma', '0.3 µm', 'SMALLEST', ['D2', 'Mycoplasmas'], g => CC(g, 200, 398, 9, '#E9C9A8', '#9A6B2F', 2.5)],
    [470, 'Bacterium', '3 to 5 µm', '', ['D3', 'Bacteria'], g => { const R = K8.bact(g, 470, 376, 0.3, { fla: false, pili: false, meso: false, plasmid: false, gly: false }); return R.g; }],
    [760, 'Human RBC', 'about 7.0 µm', 'ACROSS', ['D3', 'red'], g => { CC(g, 760, 336, 80, '#E07A85', '#A8323F', 3.5); CC(g, 760, 336, 34, '#EBA0A8', 'none', 0); }],
    [1060, 'Nerve cell', 'very long', 'LONGEST', ['D4', 'nerve'], g => { CC(g, 960, 360, 30, '#F2D7A8', '#9A7B35', 3); P(g, 'M990,360 L1160,360 M1160,360 l22,-18 M1160,360 l22,18 M960,330 l-16,-30 M934,374 l-30,8 M972,388 l6,30', 'none', '#9A7B35', 5); }],
    [1360, 'Ostrich egg', 'one single cell', 'LARGEST', ['D4', 'ostrich'], g => { E(g, 1360, 286, 110, 132, '#F6F0DF', '#A8925A', 4); }]];
  const G = it.map(([x, n, v, k, at, dr]) => { const g = mk(s, 'g', {}); dr(g); txt(g, x, 470, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink }); txt(g, x, 504, v, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: CB }); if (k) cap(g, x, 120, k, { fill: C.mute }); return [g, [at[0], at[1], -0.15], { ...POP, sc: 0.5 }]; });
  const um = div(el, 'chp', { left: '540px', top: '80px' }, '1 µm = one thousandth of a millimetre');
  return { els: [...G, [um, ['D2', 'micrometre', -0.1]]] }; } }] });

/* ---------- U: shapes + think ---------- */
const TH = { q: 'Which is smaller?', opts: ['A bacterium', 'A Mycoplasma'], right: 1, why: 'Mycoplasma: only 0.3 µm. A bacterium is 3 to 5 µm.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'W', label: 'CELL SHAPES · EACH SUITS ITS JOB', tout: 'U4', build: (el, s) => {
    const X = [180, 430, 680, 930, 1180, 1420], Y = 270;
    const sh = [
      [g => { E(g, X[0], Y, 70, 70, '#E07A85', '#A8323F', 3); CC(g, X[0], Y, 30, '#EBA0A8', 'none', 0); P(g, `M${X[0] - 50},${Y + 110} C${X[0] - 50},${Y + 90} ${X[0] - 20},${Y + 100} ${X[0]},${Y + 104} C${X[0] + 20},${Y + 100} ${X[0] + 50},${Y + 90} ${X[0] + 50},${Y + 110} C${X[0] + 50},${Y + 130} ${X[0] + 20},${Y + 120} ${X[0]},${Y + 116} C${X[0] - 20},${Y + 120} ${X[0] - 50},${Y + 130} ${X[0] - 50},${Y + 110} Z`, '#E07A85', '#A8323F', 2.5); }, 'Red blood cell', 'ROUND · BICONCAVE', ['U2', 'red']],
      [null, 'White blood cell', 'AMOEBOID', ['U2', 'white']],
      [g => { CC(g, X[2] - 60, Y - 20, 26, '#F2D7A8', '#9A7B35', 3); E(g, X[2] - 60, Y - 20, 9, 8, '#D7C3E6', '#7B4B94', 2); P(g, `M${X[2] - 34},${Y - 14} C${X[2]},${Y} ${X[2] + 20},${Y + 40} ${X[2] + 60},${Y + 90} M${X[2] + 60},${Y + 90} l20,-6 M${X[2] + 60},${Y + 90} l4,22 M${X[2] - 80},${Y - 40} l-20,-30 M${X[2] - 66},${Y - 46} l6,-36 M${X[2] - 84},${Y - 8} l-26,6`, 'none', '#9A7B35', 5); }, 'Nerve cell', 'LONG · BRANCHED', ['U3', 'nerve']],
      [g => { for (let k = 0; k < 4; k++) { mk(g, 'rect', { x: X[3] - 80 + k * 40, y: Y - 80, width: 38, height: 150, rx: 6, fill: '#F7DCD3', stroke: '#B5655A', 'stroke-width': 2.5 }); E(g, X[3] - 61 + k * 40, Y + 30, 9, 13, '#D7C3E6', '#7B4B94', 2); } }, 'Columnar cells', 'LONG · NARROW', ['U3', 'Columnar']],
      [g => { P(g, `M${X[4] - 20},${Y - 100} L${X[4] + 20},${Y - 100} L${X[4] + 26},${Y + 100} L${X[4] - 26},${Y + 100} Z`, '#E3D3A0', '#7A6A2E', 3); for (let k = 0; k < 8; k++) E(g, X[4] + (k % 2 ? 8 : -8), Y - 80 + k * 22, 4, 6, '#FBF6EE', '#7A6A2E', 1.5); }, 'Tracheid', 'ELONGATED', ['U3', 'tracheid']],
      [g => { [[-30, -30, 44, 36], [30, 10, 40, 48], [-24, 50, 36, 30]].forEach(([dx, dy, rx, ry]) => { E(g, X[5] + dx, Y + dy, rx, ry, '#DDEED6', '#2E2A24', 2.5); K8.chloro(g, X[5] + dx - 8, Y + dy, 0.4, 20); K8.chloro(g, X[5] + dx + 12, Y + dy + 10, 0.4, -30); }); }, 'Mesophyll', 'ROUND · OVAL', ['U3', 'mesophyll']]];
    const wb = P(s, '', '#F5F0FA', '#7A6A9A', 3), wbn = E(s, X[1], Y, 22, 16, '#D7C3E6', '#7B4B94', 2.5), wg = mk(s, 'g', {}); wg.appendChild(wb); wg.appendChild(wbn);
    const G = sh.map(([dr, n, k, at], i) => { const g = i === 1 ? wg : mk(s, 'g', {}); if (dr) dr(g); txt(g, X[i], 452, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 23, 'font-weight': 700, fill: C.ink }); cap(g, X[i], 484, k, { fill: CB, 'font-size': 15 }); return [g, [at[0], at[1], -0.15], { ...POP, sc: 0.5 }]; });
    return { els: G, anim: t => attr(wb, 'd', amoeba(X[1], Y, 1.05, t * 1.2)) }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'bacterium', -0.1], why: ['U5', 'Mycoplasma'] })] });

/* ---------- W: worked example ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · TEST THE CELL THEORY', svg: false, build: el => {
  const o = EP.cols(el, [
    ['CASE 1 · AN AMOEBA', 'Unicellular', 'ONE CELL · RULE ONE HOLDS', s => { const a = P(s, '', '#E3EFD6', '#5A8F4E', 3), n = E(s, 248, 150, 18, 15, '#D7C3E6', '#7B4B94', 2.5); s._a = a; }, ['W2', 'Amoeba', -0.2], ['W2', 'unicellular', -0.1], ['W2', 'rule']],
    ['CASE 2 · A CUT HEALS', 'New cells from old', 'CELLS DIVIDE · RULE TWO', s => { for (let k = 0; k < 8; k++) if (k !== 3 && k !== 4) { mk(s, 'rect', { x: 40 + k * 52, y: 150, width: 48, height: 48, rx: 6, fill: '#F7DCD3', stroke: '#B5655A', 'stroke-width': 2.5 }); CC(s, 64 + k * 52, 174, 8, '#D7C3E6', '#7B4B94', 2); }
      s._n = [3, 4].map(k => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 40 + k * 52, y: 150, width: 48, height: 48, rx: 6, fill: '#E6F2DF', stroke: CB, 'stroke-width': 3 }); CC(g, 64 + k * 52, 174, 8, '#D7C3E6', '#7B4B94', 2); return g; }); cap(s, 248, 250, 'NEW CELLS FILL THE GAP', { fill: C.ink, 'font-size': 14 }); }, ['W3', 'cut', -0.2], ['W3', 'new'], ['W3', 'rule']],
    ['CASE 3 · ONION VS CHEEK', 'Wall only in plants', 'JUST AS SCHWANN FOUND', s => { mk(s, 'rect', { x: 50, y: 70, width: 170, height: 140, rx: 14, fill: ON, stroke: ONs, 'stroke-width': 8 }); E(s, 135, 140, 16, 13, '#D7C3E6', '#7B4B94', 2.5); cheek(s, 360, 140, 1.25, 2);
      cap(s, 135, 250, 'ONION · CELL WALL', { fill: C.ink, 'font-size': 14 }); cap(s, 360, 250, 'CHEEK · MEMBRANE ONLY', { fill: C.ink, 'font-size': 14 }); }, ['W4', 'Compare', -0.2], ['W4', 'wall'], ['W5', 'Schwann']]]);
  const svgs = [...el.querySelectorAll('svg.cs')];
  const pa = o.anim; o.anim = t => { pa && pa(t); const a = svgs[0]._a; if (a) attr(a, 'd', amoeba(248, 146, 1.4, t)); const n = svgs[1]._n; if (n) n.forEach((g, i) => g.style.opacity = M.clamp((t - tm(['W3', 'dividing']) - i * 0.4) / 0.4)); };
  return o; } }] });

EP.run({
  icons: { onion: ['M12 3c-1 3-6 6-6 11a6 6 0 0 0 12 0c0-5-5-8-6-11Z', 'M12 8c-1 2-3 4-3 6.5a3 3 0 0 0 6 0C15 12 13 10 12 8Z'], face: ['M12 3a8 8 0 1 0 0.1 0', 'M9 10h.01', 'M15 10h.01', 'M9 15c1.5 1.5 4.5 1.5 6 0'], drop: ['M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z'] },
  jobs: [['onion', 'An onion peel', 'THIN SKIN', ['H1', 'onion']], ['face', 'Cheek cells', 'A GENTLE SCRAPE', ['H1', 'scraping']], ['drop', 'Pond water', 'ONE DROP', ['H1', 'pond']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Every cell</span> comes from a cell.', f: '<span class="lad">omnis cellula e cellula · <b>Rudolf Virchow, 1855</b></span>', t2: ['T1', 'Every', -0.2], tf: ['T1', 'comes', 0.2] },
  trap: { wrong: 'Schleiden and Schwann explained new cells', right: 'Virchow, 1855: new cells come from cells', tWrong: ['X2', 'Schleiden', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'Virchow', -0.3], tSvg: ['X3', 'New', -0.4],
    build: s => { const b = (cx, r) => { P(s, K8.blob(r, r * 0.8, 9, 0.05, cx), '#F7DCD3', '#B5655A', 2.5, { transform: `translate(${cx} 130)` }); E(s, cx, 130, r * 0.28, r * 0.24, '#D7C3E6', '#7B4B94', 2); };
      b(110, 70); P(s, 'M200,130 L260,130 m-12,-10 l12,10 l-12,10', 'none', CB, 4); b(320, 46); b(410, 46); cap(s, 230, 250, 'CELLS ARISE FROM PRE-EXISTING CELLS', { 'font-size': 14 }); } },
  where: { type: 'Match or statement questions: who did what, and cell sizes', at: ['E1', 'match'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Schleiden<br><b>2</b>Schwann<br><b>3</b>Virchow<br><b>4</b>Leeuwenhoek</div><div><span class="h">LIST II</span><br><b>p</b>First saw a live cell<br><b>q</b>All plants are made of cells<br><b>r</b>Omnis cellula e cellula<br><b>s</b>Plasma membrane of animal cells</div></div>',
    opts: ['1-s, 2-q, 3-r, 4-p', '1-q, 2-s, 3-p, 4-r', '1-q, 2-s, 3-r, 4-p', '1-r, 2-q, 3-s, 4-p'], right: 2 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['1-q: Schleiden, all plants', ['A2', 'Schleiden']], ['2-s: Schwann, plasma membrane', ['A2', 'Schwann']], ['3-r: Virchow, omnis cellula', ['A3', 'Virchow']], ['4-p: Leeuwenhoek, a live cell', ['A3', 'Leeuwenhoek']]],
  recap: { title: 'Recap · cell theory', lines: ['<b>Cell</b>: the basic unit of structure and function of life', '<b>Leeuwenhoek</b>: first live cell · <b>Robert Brown</b>: the nucleus', '<b>1838 Schleiden</b>: plants · <b>1839 Schwann</b>: animals', '<b>1855 Virchow</b>: omnis cellula e cellula', '<b>Sizes</b>: Mycoplasma 0.3 µm · bacteria 3 to 5 µm · RBC 7.0 µm'] },
  yq: ['What are the two rules of the cell theory?', 'What did Rudolf Virchow add?', 'Which is the smallest cell?'],
  next: { label: 'NEXT · EP 61', topic: 'Next: Prokaryotic and Eukaryotic Cells' }
});
})();
