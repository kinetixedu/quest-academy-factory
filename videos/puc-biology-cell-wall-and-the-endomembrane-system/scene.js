// PUC Biology Ep 64: Cell Wall and the Endomembrane System (Living diagram, leaf green). Runner: ep.js, drawings: cell8.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { P, E, wrap, blob } = K8, CC = K8.C, CB = C.ac;
const sl = (g, px, py, lx, ly, s, an = 'start') => lab(g, px, py, lx, ly, s, an, 'sl2');
const LAM = '#B07A2A', SEC = '#C9B36A';
const mv = (e, x, y) => attr(e, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const pcell = (g, x, y, w, h) => { mk(g, 'rect', { x, y, width: w, height: h, rx: 10, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 3 }); mk(g, 'rect', { x: x + 16, y: y + 16, width: w - 32, height: h - 32, rx: 8, fill: K8.CYT, stroke: '#3E9B5F', 'stroke-width': 2.5 });
  P(g, blob(w * 0.26, h * 0.26, 9, 0.08, x), K8.VAf, K8.VA, 2.5, { transform: `translate(${x + w * 0.58} ${y + h * 0.48})` }); K8.nuc(g, x + w * 0.24, y + h * 0.66, Math.min(w, h) * 0.1); };
const cist = (g, cx, cy, h, w = 16) => P(g, `M${cx + 20},${cy - h} Q${cx - 40},${cy} ${cx + 20},${cy + h}`, 'none', K8.GO, w);

const S = [];
/* ---------- H: the canteen ---------- */
S.push(EP.hook({ label: 'THE COLLEGE CANTEEN', face: 'aarav', pill: ['Cook · pack · send out', ['H3', 'sent', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['What keeps a plant cell firm?', ['H3', 'firm']], ['How does a cell pack and ship?', ['H3', 'pack']]],
  a: [['ANSWER 1', 'A rigid cell wall', ['H4', 'rigid']], ['ANSWER 2', 'The endomembrane system', ['H4', 'endomembrane']]],
  chips: [['Cell wall', ['H5', 'wall']], ['ER', ['H5', 'endoplasmic']], ['Golgi', ['H5', 'Golgi']], ['Lysosomes', ['H5', 'lysosomes']], ['Vacuoles', ['H5', 'vacuoles']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 400, width: 784, height: 180, fill: '#EDE6D6' });
    const st = [['KITCHEN', 130, 'cooked'], ['COUNTER', 392, 'packed'], ['OUT', 654, 'sent']].map(([n, x, w]) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: x - 100, y: 200, width: 200, height: 200, rx: 14, fill: '#FFFFFF', stroke: '#CBD0DA', 'stroke-width': 3 }); cap(g, x, 440, n, { fill: C.ink }); return { g, x, w }; });
    P(st[0].g, 'M70,330 L190,330 L190,390 L70,390 Z', '#5E6A7A', '#2E2A24', 3); E(st[0].g, 130, 316, 44, 12, '#B5B5B5', '#2E2A24', 2.5); P(st[0].g, 'M110,290 q6,-12 0,-24 M130,290 q6,-12 0,-24 M150,290 q6,-12 0,-24', 'none', '#9AA0AC', 3);
    mk(st[1].g, 'rect', { x: 300, y: 340, width: 184, height: 60, fill: '#C98C5A', stroke: '#7A5A2E', 'stroke-width': 3 });
    P(st[2].g, 'M580,360 L580,300 L680,300 L710,330 L710,360 Z', '#F2B9A0', '#2E2A24', 3); CC(st[2].g, 605, 366, 13, '#2E2A24', 'none', 0); CC(st[2].g, 685, 366, 13, '#2E2A24', 'none', 0);
    const box = mk(s, 'g', {}); mk(box, 'rect', { x: -26, y: -20, width: 52, height: 40, rx: 4, fill: '#E9C46A', stroke: '#8A6A1E', 'stroke-width': 2.5 }); P(box, 'M-26,-4 L26,-4', 'none', '#8A6A1E', 2);
    return { els: st.map((o, i) => [o.g, ['H3', o.w, -0.3], { ...POP, sc: 0.7 }]),
      anim: t => { const a = tm(['H3', 'cooked']), b = tm(['H3', 'packed']), c = tm(['H3', 'sent']); const x = t < b ? 130 : t < c ? 130 + 262 * M.io((t - b) / 0.8) : 392 + 262 * M.io((t - c) / 0.8); mv(box, x, t < b ? 270 : 316); box.style.opacity = t > a ? 1 : 0;
        st.forEach((o, i) => attr(o.g.firstChild, 'stroke', t > tm(['H3', o.w]) - 0.1 && (i === 2 || t < tm(['H3', st[i + 1].w])) ? CB : '#CBD0DA')); } };
  } }));

/* ---------- B: the cell wall ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'THE CELL WALL', build: (el, s) => {
  const pc = K8.plant(s, 220, 270, 0.85); const nl = div(el, 'chp', { left: '40px', top: '460px' }, 'Non-living, rigid · plants and fungi');
  const F = [['Gives the cell its shape', ['B3', 'shape']], ['Protects from damage and infection', ['B3', 'protects']], ['Helps cells interact', ['B3', 'interact']], ['Keeps out large unwanted molecules', ['B3', 'keeps']]].map(([w, at], i) => [div(el, 'chp', { left: '450px', top: 100 + i * 84 + 'px', width: '430px' }, w), [at[0], at[1], -0.1]]);
  const R = [['ALGAE', 'cellulose, galactans, mannans, calcium carbonate', ['B3', 'algae']], ['OTHER PLANTS', 'cellulose, hemicellulose, pectins, proteins', ['B3', 'other']]].map(([n, d, at], i) => [div(el, 'rw', { left: '920px', width: '640px', top: 130 + i * 110 + 'px' }, `<div class="rn">${n}</div><div class="rd">${d}</div>`), [at[0], at[1], -0.1], { dx: 16, dy: 0 }]);
  const mh = div(el, 'tb', { left: '920px', top: '96px' }, 'MADE OF');
  return { els: [[pc.g, ['B1', 'cell', -0.2], { ...POP, sc: 0.8 }], [nl, ['B2', 'plants', -0.1]], ...F, [mh, ['B3', 'algae', -0.3], { dy: 6 }], ...R],
    anim: t => { const on = t > tm(['B2', 'rigid']); attr(pc.wall, 'stroke', on ? CB : K8.CW); attr(pc.wall, 'stroke-width', on ? 9 : 5); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['PLANT TISSUE', 'WALL LAYERS', 'PLASMODESMA'], scales: ['x100', 'x2000', 'x20000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Plant tissue', 'Cells glued side by side.', 'Middle lamella: calcium pectate.'], ['RUNG 2 OF 3', 'Wall layers', 'Primary wall can grow.', 'Secondary wall forms inside it.'], ['RUNG 3 OF 3', 'Plasmodesma', 'A channel through the wall.', 'It joins neighbouring cytoplasm.']],
  av: { who: 'Aarav', text: 'Tunnels between the rooms!', tin: ['Z5', 'share', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [366, 260, 60], build: g => { const lm = mk(g, 'rect', { x: 52, y: 122, width: 940, height: 276, fill: LAM }); for (let k = 0; k < 3; k++) pcell(g, 60 + k * 312, 130, 300, 260);
      return { labs: [[lab(g, 366, 330, 420, 470, 'Middle lamella · calcium pectate'), ['Z2', 'middle']]], anim: t => attr(lm, 'fill', t > tm(['Z2', 'glues']) ? '#8A5A14' : LAM) }; } },
    { at: 'Z3', focus: [528, 263, 60], build: g => {
      mk(g, 'rect', { x: 0, y: 0, width: 396, height: 526, fill: K8.CYT }); mk(g, 'rect', { x: 660, y: 0, width: 396, height: 526, fill: K8.CYT });
      const sec = mk(g, 'g', {}); mk(sec, 'rect', { x: 396, y: 0, width: 70, height: 526, fill: SEC, stroke: K8.CW, 'stroke-width': 2 }); mk(sec, 'rect', { x: 590, y: 0, width: 70, height: 526, fill: SEC, stroke: K8.CW, 'stroke-width': 2 });
      mk(g, 'rect', { x: 466, y: 0, width: 50, height: 526, fill: K8.CWf }); mk(g, 'rect', { x: 540, y: 0, width: 50, height: 526, fill: K8.CWf }); mk(g, 'rect', { x: 516, y: 0, width: 24, height: 526, fill: LAM });
      P(g, 'M392,0 L392,526 M664,0 L664,526', 'none', '#3E9B5F', 4); mk(g, 'rect', { x: 392, y: 252, width: 272, height: 22, fill: K8.CYT });
      return { els: [[sec, ['Z3', 'secondary', -0.2], { dy: 0, fade: 0.5 }]], labs: [[lab(g, 528, 120, 528, 50, 'Middle lamella', 'middle'), ['Z3', null, 0.2]], [lab(g, 490, 400, 330, 460, 'Primary wall', 'end'), ['Z3', 'primary']], [lab(g, 625, 400, 720, 460, 'Secondary wall'), ['Z3', 'secondary']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: K8.CYT }); mk(g, 'rect', { x: 430, y: 0, width: 196, height: 526, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 3 }); mk(g, 'rect', { x: 516, y: 0, width: 24, height: 526, fill: LAM });
      mk(g, 'rect', { x: 426, y: 236, width: 204, height: 54, fill: K8.CYT }); P(g, 'M426,236 L630,236 M426,290 L630,290', 'none', '#3E9B5F', 4); P(g, 'M426,0 L426,236 M426,290 L426,526 M630,0 L630,236 M630,290 L630,526', 'none', '#3E9B5F', 4);
      const dots = []; for (let k = 0; k < 7; k++) dots.push(CC(g, 0, 0, 8, '#F6E7B8', '#C9962B', 2.5));
      const ch = mk(g, 'g', {}); mk(ch, 'rect', { x: 668, y: 420, width: 330, height: 50, rx: 12, fill: 'var(--ac2)' }); txt(ch, 833, 452, 'Cells share materials', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: '#1F6B3F' });
      cap(g, 210, 120, 'CYTOPLASM · CELL 1', { fill: C.ink }); cap(g, 846, 120, 'CYTOPLASM · CELL 2', { fill: C.ink });
      return { labs: [[lab(g, 528, 290, 600, 400, 'Plasmodesma'), ['Z4', 'plasmodesmata']]], els: [[ch, ['Z5', 'share', -0.1], { dy: 8 }]],
        anim: t => dots.forEach((e, k) => { const v = (t * 0.18 + k / 7) % 1; attr(e, 'cx', (150 + 760 * v).toFixed(1)); attr(e, 'cy', (263 + (v < 0.35 || v > 0.65 ? 40 * Math.sin(k * 2.1 + t) : 0)).toFixed(1)); }) }; } }] }));

/* ---------- L: endomembrane system ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE ENDOMEMBRANE SYSTEM · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['The team', 'ER · Golgi complex · lysosomes · vacuoles'], ['Not in the team', 'mitochondria · chloroplasts · peroxisomes'], ['ER: a network of tubes', 'lumen inside · cytoplasm outside'], ['Rough ER', 'ribosomes on it · makes and secretes proteins'], ['Smooth ER', 'makes lipids · steroid hormones in animals']], LT) }) },
  { pos: 'R', label: 'INSIDE A PLANT CELL', build: (el, s) => {
    P(s, blob(290, 196, 12, 0.03, 2), K8.CYT, '#3E9B5F', 4, { transform: 'translate(392 290)' });
    const nu = mk(s, 'g', {}); CC(nu, 230, 290, 62, K8.NUf, K8.NU, 3); CC(nu, 230, 290, 54, 'none', K8.NU, 2); CC(nu, 238, 284, 18, K8.NU, 'none', 0);
    const rer = mk(s, 'g', {}), lum = mk(s, 'g', {}), rib = mk(s, 'g', {});
    [80, 100, 120].forEach(r => { const a0 = -1.2, a1 = 1.2; let d = ''; for (let a = a0; a <= a1 + 1e-6; a += 0.1) { const rr = r + 4 * Math.sin(a * 9); d += `${d ? ' L' : 'M'}${(230 + rr * Math.cos(a)).toFixed(1)},${(290 + rr * Math.sin(a)).toFixed(1)}`; } P(lum, d, 'none', K8.ERf, 12); P(rer, d, 'none', K8.ER, 4); });
    for (let a = -1.15; a <= 1.15; a += 0.16) CC(rib, 230 + 128 * Math.cos(a), 290 + 128 * Math.sin(a), 3.5, K8.RIB, 'none', 0);
    const ser = mk(s, 'g', {}); P(ser, 'M300,430 C330,400 360,440 390,410 S440,420 450,400 M340,420 C350,450 380,455 400,445 M390,410 C400,390 420,385 430,370', 'none', K8.ER, 7);
    const go = K8.golgi(s, 470, 220, 1.25, 0), ly = [K8.lyso(s, 560, 330, 13), K8.lyso(s, 420, 170, 11)], va = P(s, blob(50, 38, 9, 0.08, 4), K8.VAf, K8.VA, 3, { transform: 'translate(590 225)' });
    const mi = K8.mito(s, 330, 175, 1.0, 20), cl = K8.chloro(s, 560, 410, 1.1, -10), px = mk(s, 'g', {}); CC(px, 490, 395, 15, '#EFF3D6', '#7A8A3A', 2.5); mk(px, 'rect', { x: 484, y: 389, width: 12, height: 12, fill: '#B9C27A', transform: 'rotate(45 490 395)' });
    const team = [rer, lum, rib, ser, go, ...ly, va], out = [mi, cl, px];
    const xs = mk(s, 'g', {}); [[330, 175], [560, 410], [490, 395]].forEach(([x, y]) => { CC(xs, x + 26, y - 22, 13, '#D1495B', 'none', 0); P(xs, `M${x + 20},${y - 28} l12,12 M${x + 32},${y - 28} l-12,12`, 'none', '#fff', 3); });
    const cp = cap(s, 392, 540, '', { fill: C.ink, 'font-size': 17 }); const CP = ['THE TEAM: ER · GOLGI · LYSOSOMES · VACUOLES', 'NOT IN IT: MITOCHONDRIA · CHLOROPLASTS · PEROXISOMES', 'ER: LUMEN INSIDE · CYTOPLASM OUTSIDE', 'ROUGH ER: RIBOSOMES · MAKES PROTEINS', 'SMOOTH ER: LIPIDS · STEROID HORMONES'];
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); cp.textContent = c >= 0 ? CP[c] : '';
      team.forEach(e => e.style.opacity = c === 1 ? 0.25 : 1); out.forEach(e => e.style.opacity = c === 0 || c >= 2 ? 0.25 : 1); xs.style.opacity = c === 1 ? 1 : 0;
      attr(lum, 'opacity', c === 2 ? 1 : 0.5); [...lum.children].forEach(e => attr(e, 'stroke', c === 2 ? '#E8A6C4' : K8.ERf));
      [...rib.children].forEach(e => attr(e, 'r', c === 3 ? 6 : 3.5)); [...rer.children].forEach(e => attr(e, 'stroke-width', c === 3 ? 6 : 4)); [...ser.children].forEach(e => attr(e, 'stroke', c === 4 ? CB : K8.ER)); } }; } }] });

/* ---------- C: Golgi apparatus ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE GOLGI APPARATUS', build: (el, s) => {
  const nm = div(el, '', { position: 'absolute', left: '36px', top: '70px', font: '700 34px Poppins', color: C.ink, whiteSpace: 'nowrap' }, 'Camillo Golgi <span style="color:var(--ac)">· 1898</span>');
  const er = mk(s, 'g', {}); P(er, 'M380,160 C440,200 360,260 420,300 C480,340 380,400 440,440', 'none', K8.ERf, 30); P(er, 'M380,160 C440,200 360,260 420,300 C480,340 380,400 440,440', 'none', K8.ER, 4); for (let k = 0; k < 10; k++) CC(er, 368 + (k % 2) * 30 + (k > 5 ? 20 : 0), 170 + k * 28, 4, K8.RIB, 'none', 0); cap(er, 410, 490, 'ROUGH ER', { fill: K8.ER });
  const stk = mk(s, 'g', {}); const cs = [0, 1, 2, 3, 4].map(k => cist(stk, 640 + k * 34, 300, 140 - Math.abs(k - 2) * 8));
  const vin = [0, 1, 2].map(() => CC(s, 0, 0, 11, K8.GOf, K8.GO, 2.5)), vout = [0, 1, 2].map(() => CC(s, 0, 0, 12, K8.GOf, K8.GO, 2.5));
  const sz = div(el, 'chp', { left: '1150px', top: '150px' }, 'Each sac: 0.5 to 1.0 µm across'), chg = div(el, 'chp', { left: '1150px', top: '250px' }, 'Proteins are changed here'), gl = div(el, 'chp', { left: '1150px', top: '350px', background: 'var(--ac2)', color: '#1F6B3F' }, 'Makes glycoproteins, glycolipids');
  return { els: [[nm, ['C2', 'Camillo', -0.2], { dy: 10 }], [stk, ['C2', 'stack', -0.3], { ...POP, sc: 0.7 }], [er, ['C4', 'Vesicles', -0.6], { dx: -20, dy: 0 }], [sz, ['C2', 'zero', -0.1]], [chg, ['C4', 'changed', -0.1]], [gl, ['C4', 'glycoproteins', -0.1]]],
    labs: [[lab(s, 622, 170, 560, 110, 'Cis face · forming · convex', 'end'), ['C3', 'cis']], [lab(s, 796, 170, 860, 110, 'Trans face · maturing · concave'), ['C3', 'trans']], [lab(s, 708, 440, 708, 500, 'Cisternae', 'middle'), ['C2', 'cisternae']]],
    anim: t => { const t0 = tm(['C4', 'Vesicles']);
      vin.forEach((e, k) => { const v = ((t - t0) * 0.4 + k / 3) % 1; mv(e, 0, 0); attr(e, 'cx', (450 + 160 * v).toFixed(1)); attr(e, 'cy', (220 + k * 70).toFixed(1)); e.style.opacity = t > t0 ? Math.min(1, 4 * (1 - v)) : 0; });
      vout.forEach((e, k) => { const v = ((t - t0 - 0.6) * 0.4 + k / 3) % 1; attr(e, 'cx', (820 + 260 * v).toFixed(1)); attr(e, 'cy', (200 + k * 90).toFixed(1)); e.style.opacity = t > t0 + 0.6 ? Math.min(1, 4 * v, 4 * (1 - v)) : 0; });
      cs.forEach((e, k) => attr(e, 'stroke', t > tm(['C3', 'cis']) && t < tm(['C3', 'trans']) && k === 0 ? CB : t > tm(['C3', 'trans']) && t < tm('C4') && k === 4 ? CB : K8.GO)); } }; } }] });

/* ---------- D: lysosome, vacuole (then Amoeba) ---------- */
S.push({ id: 'D', from: 'D1', to: 'U4', cards: [
  { pos: 'L', label: 'LYSOSOME · A DIGESTIVE BAG', tout: 'U1', pill: ['Formed by packing in the Golgi', ['D2', 'Golgi', -0.1], 'ac'], build: (el, s) => {
    CC(s, 392, 250, 150, K8.LYf, K8.LY, 5); const pm = [0, 1, 2, 3, 4, 5].map(() => P(s, '', '#8E5BB5', '#5A3A7A', 2));
    const fo = [0, 1, 2, 3].map(k => mk(s, 'rect', { x: -7, y: -7, width: 14, height: 14, rx: 3, fill: ['#C9962B', K8.PRO, '#B9A36A', K8.DNA][k] }));
    const ac = cap(s, 392, 120, 'ACID INSIDE', { fill: K8.LY, 'font-size': 16 });
    const M4 = [['CARBOHYDRATES', 110, 90], ['PROTEINS', 674, 90], ['LIPIDS', 110, 430], ['NUCLEIC ACIDS', 674, 430]].map(([n, x, y], i) => [cap(s, x, y, n, { fill: ['#8A6A1E', K8.PRO, '#8A7A4A', K8.DNA][i], 'font-size': 15 }), ['D3', ['carbohydrates', 'proteins', 'lipids', 'nucleic'][i], -0.1], { dy: 8 }]);
    const en = cap(s, 392, 446, 'LIPASES · PROTEASES · CARBOHYDRASES', { fill: C.ink, 'font-size': 16 });
    return { els: [[ac, ['D2', 'acid', -0.1], { dy: 8 }], [en, ['D3', 'lipases', -0.1], { dy: 8 }], ...M4],
      anim: t => { const on = t > tm(['D2', 'enzymes']) - 0.2; pm.forEach((e, k) => { const a = t * 0.6 + k * Math.PI / 3, x = 392 + 90 * Math.cos(a), y = 250 + 90 * Math.sin(a), mo = 0.25 + 0.25 * Math.abs(Math.sin(t * 6 + k)); attr(e, 'd', `M${x},${y} L${x + 18 * Math.cos(a + mo)},${y + 18 * Math.sin(a + mo)} A18,18 0 1 1 ${x + 18 * Math.cos(a - mo)},${y + 18 * Math.sin(a - mo)} Z`); e.style.opacity = on ? 1 : 0; });
        fo.forEach((e, k) => { const a = t * 0.6 + k * Math.PI / 2 + 0.5; mv(e, 392 + 40 * Math.cos(a), 250 + 40 * Math.sin(a)); e.style.opacity = t > tm(['D3', 'digest']) ? Math.max(0.15, 1 - ((t - tm(['D3', 'digest'])) * 0.2 + k * 0.1) % 1) : 0; }); } }; } },
  { pos: 'L', label: 'AMOEBA AND PROTISTS', tin: ['U3', null, -0.1], svg: true, build: (el, s) => {
    const am = P(s, '', '#E3EFD6', '#5A8F4E', 3.5); const n = CC(s, 0, 0, 22, K8.NUf, K8.NU, 2.5), cv = CC(s, 0, 0, 30, K8.VAf, K8.VA, 3), fv = CC(s, 0, 0, 24, '#F6E7B8', '#C9962B', 3);
    const fd = []; for (let k = 0; k < 3; k++) fd.push(CC(s, 0, 0, 6, '#C9962B', 'none', 0));
    return { labs: [[lab(s, 470, 200, 600, 120, 'Contractile vacuole'), ['U3', 'contractile']], [lab(s, 330, 370, 180, 470, 'Food vacuole', 'start'), ['U3', 'food']]],
      anim: t => { const pts = []; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, r = 1 + 0.16 * Math.sin(3 * a + t * 1.5) + 0.08 * Math.cos(5 * a - t); pts.push([392 + 230 * r * Math.cos(a), 290 + 160 * r * Math.sin(a)]); }
        let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`; for (let k = 0; k < 12; k++) { const p1 = pts[k], p2 = pts[(k + 1) % 12]; d += ` Q${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${((p1[0] + p2[0]) / 2).toFixed(1)},${((p1[1] + p2[1]) / 2).toFixed(1)}`; } attr(am, 'd', d + ' Z');
        attr(n, 'cx', 380); attr(n, 'cy', 290); attr(cv, 'cx', 470); attr(cv, 'cy', 220); attr(cv, 'r', (18 + 14 * Math.abs(Math.sin(t * 1.2))).toFixed(1)); attr(fv, 'cx', 330); attr(fv, 'cy', 360);
        fd.forEach((e, k) => { attr(e, 'cx', 322 + k * 9); attr(e, 'cy', 356 + (k % 2) * 8); }); } }; } },
  { pos: 'R', label: 'VACUOLE · TONOPLAST', tin: ['D4', null, -0.2], pill: ['Up to 90% of a plant cell', ['D4', 'ninety', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 132, y: 80, width: 520, height: 390, rx: 30, fill: K8.CWf, stroke: K8.CW, 'stroke-width': 6 }); mk(s, 'rect', { x: 148, y: 96, width: 488, height: 358, rx: 22, fill: K8.CYT, stroke: '#3E9B5F', 'stroke-width': 3 });
    const tv = mk(s, 'rect', { x: 176, y: 120, width: 432, height: 300, rx: 60, fill: K8.VAf, stroke: K8.VA, 'stroke-width': 4 }); K8.nuc(s, 172, 432, 16);
    const io = []; for (let k = 0; k < 6; k++) io.push(CC(s, 0, 0, 6, '#F6E7B8', '#C9962B', 2));
    const ct = cap(s, 392, 280, 'WATER · SAP · WASTE', { fill: K8.VA, 'font-size': 18 });
    return { labs: [[lab(s, 608, 200, 690, 150, 'Tonoplast', 'end'), ['D4', 'tonoplast']]], els: [[ct, ['D4', 'water', -0.1], { dy: 8 }]],
      anim: t => { attr(tv, 'stroke-width', t > tm(['D4', 'tonoplast']) ? 7 : 4); const t0 = tm(['U2', 'ions']); io.forEach((e, k) => { const v = ((t - t0) * 0.35 + k / 6) % 1; attr(e, 'cx', (190 + k * 75).toFixed(1)); attr(e, 'cy', (108 + 70 * v).toFixed(1)); e.style.opacity = t > t0 ? Math.min(1, 5 * (1 - v)) : 0; }); } }; } }] });
// the ions on the right card run upward from the cytoplasm band into the vacuole (against the gradient)

/* ---------- U: think ---------- */
const TH = { q: 'Which is not part of the endomembrane system?', opts: ['Golgi complex', 'Mitochondrion'], right: 1, why: 'The mitochondrion. Its work is not coordinated with the others.' };
S.push({ id: 'U', from: 'U4', to: 'W1', cards: [EP.think(TH, { tin: 'U4', opts: ['U4', 'Golgi', -0.1], why: ['U5', 'mitochondrion'] })] });

/* ---------- W: worked example ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · FOLLOW ONE PROTEIN OUT', svg: false, build: el => EP.cols(el, [
  ['STAGE 1 · ROUGH ER', 'Ribosomes make it', 'IT ENTERS THE ER LUMEN', s => { P(s, 'M60,120 L436,120 L436,190 L60,190 Z', K8.ERf, K8.ER, 4); for (let k = 0; k < 12; k++) CC(s, 80 + k * 32, 110, 6, K8.RIB, 'none', 0); P(s, 'M240,110 C230,130 260,150 240,170 C225,185 250,190 260,180', 'none', K8.PRO, 4); cap(s, 248, 240, 'RIBOSOMES ON THE ER', { fill: C.ink, 'font-size': 14 }); }, ['W2', 'Ribosomes', -0.2], ['W2', 'make'], ['W2', 'enters']],
  ['STAGE 2 · GOLGI', 'Changed and packed', 'ARRIVES AT THE CIS FACE', s => { for (let k = 0; k < 5; k++) cist(s, 220 + k * 26, 150, 100 - Math.abs(k - 2) * 6, 12); CC(s, 120, 150, 14, K8.GOf, K8.GO, 3); P(s, 'M140,150 L190,150 m-10,-8 l10,8 l-10,8', 'none', K8.GO, 3); cap(s, 248, 275, 'CIS → TRANS', { fill: C.ink, 'font-size': 14 }); }, ['W3', 'vesicle', -0.2], ['W3', 'changed'], ['W3', 'cis']],
  ['STAGE 3 · OUT OF THE CELL', 'Sent out', 'TRANS FACE → VESICLE → MEMBRANE', s => { P(s, 'M380,30 C360,100 360,200 380,270', 'none', '#3E9B5F', 6); CC(s, 300, 150, 22, K8.GOf, K8.GO, 3); [[410, 120], [430, 160], [415, 190]].forEach(([x, y]) => CC(s, x, y, 6, K8.PRO, 'none', 0)); P(s, 'M200,150 L270,150 m-10,-8 l10,8 l-10,8', 'none', K8.GO, 3); cap(s, 200, 250, 'PLASMA MEMBRANE →', { fill: C.ink, 'font-size': 14 }); }, ['W4', 'leaves', -0.2], ['W5', 'sent'], ['W4', 'trans']]]) }] });

EP.run({
  icons: { door: ['M6 21V3h12v18', 'M4 21h16', 'M14 12h.01'], shirt: ['M8 3l-5 4 3 3 2-1v12h8V9l2 1 3-3-5-4c-1 2-3 2-4 2s-3 0-4-2Z'] },
  jobs: [['leaf', 'A lettuce leaf', 'CRISP', ['H1', 'lettuce']], ['door', 'A wooden door', 'STRONG', ['H1', 'wooden']], ['shirt', 'A cotton shirt', 'SOFT BUT TOUGH', ['H1', 'cotton']]],
  scenes: S,
  stmt: { l2: '<span class="acc">ER</span> makes, Golgi packs, vesicles ship.', f: '<span class="lad">rough ER → <b>cis face</b> → <b>trans face</b> → out</span>', t2: ['T1', 'ER', -0.2], tf: ['T1', 'vesicles', -0.1] },
  trap: { wrong: 'Mitochondria and chloroplasts are in the endomembrane system', right: 'They are not: their work is not coordinated with it', tWrong: ['X2', 'mitochondria', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'not', -0.2], tSvg: ['X3', 'Their', -0.4],
    build: s => { K8.mito(s, 80, 80, 1.3, 0); K8.chloro(s, 200, 80, 1.3, 0); [[80, 80], [200, 80]].forEach(([x, y]) => { CC(s, x + 34, y - 26, 13, '#D1495B', 'none', 0); P(s, `M${x + 28},${y - 32} l12,12 M${x + 40},${y - 32} l-12,12`, 'none', '#fff', 3); }); K8.golgi(s, 330, 180, 1.1); K8.erN(s, 120, 180, 1.1, 0); cap(s, 230, 250, 'ER · GOLGI · LYSOSOMES · VACUOLES', { 'font-size': 13 }); } },
  where: { type: 'Match or statement questions: Golgi faces, ER types, lysosome enzymes, tonoplast', at: ['E1', 'match'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Smooth ER<br><b>2</b>Cis face of Golgi<br><b>3</b>Lysosome<br><b>4</b>Tonoplast</div><div><span class="h">LIST II</span><br><b>p</b>Forming face<br><b>q</b>Membrane of the vacuole<br><b>r</b>Makes lipids<br><b>s</b>Hydrolases</div></div>',
    opts: ['1-r, 2-s, 3-p, 4-q', '1-p, 2-r, 3-s, 4-q', '1-r, 2-p, 3-q, 4-s', '1-r, 2-p, 3-s, 4-q'], right: 3 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['1-r: smooth ER makes lipids', ['A2', 'Smooth']], ['2-p: cis face, forming face', ['A2', 'cis']], ['3-s: lysosomes, hydrolases', ['A3', 'Lysosomes']], ['4-q: tonoplast, the vacuole', ['A3', 'tonoplast']]],
  recap: { title: 'Recap · cell wall and endomembranes', lines: ['<b>Cell wall</b>: non-living, rigid · in plants and fungi', '<b>Middle lamella</b>: calcium pectate · <b>plasmodesmata</b> join cells', '<b>Endomembrane</b>: ER, Golgi, lysosomes, vacuoles', '<b>Rough ER</b>: proteins · <b>smooth ER</b>: lipids, steroid hormones', '<b>Golgi</b>: cis (forming) → trans (maturing) · glycoproteins'] },
  yq: ['What is the middle lamella made of?', 'Which ER makes lipids?', 'What is the membrane around a vacuole called?'],
  next: { label: 'NEXT · EP 65', topic: 'Next: Mitochondria and Plastids' }
});
})();
