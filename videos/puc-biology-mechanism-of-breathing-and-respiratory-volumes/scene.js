// PUC Biology Ep 97: Mechanism of Breathing and Respiratory Volumes (Living diagram, leaf green). Runner: ep.js + resp14.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, o2, chest } = R14;
const ICN = { syringe: ['M18 2l4 4', 'M17 7l3-3', 'M19 9L8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5', 'M9 11l4 4', 'M5 19l-3 3'], balloon: ['M12 16c-4 0-6-4-6-7a6 6 0 0 1 12 0c0 3-2 7-6 7Z', 'M12 16l-1 2h2Z', 'M12 18c0 2-2 2-2 4'], bike: ['M5 18a3 3 0 1 0 .1 0', 'M19 18a3 3 0 1 0 .1 0', 'M5 18l4-8h6l4 8', 'M9 10l3 8 3-8', 'M14 6h3'] };
const VC = { irv: '#9CC9E2', tv: '#5AA0C8', erv: '#E7A3A8', rv: '#B9BEC8' };
const S = [];
const breath = t => 0.5 - 0.5 * Math.cos(t * 1.6);
// stacked bar: parts bottom-up [[label, value, colour]], returns group
const stack = (g, x, yb, w, parts, k = 0.075, lbl = true) => { const G = mk(g, 'g', {}); let y = yb;
  parts.forEach(([n, v, c]) => { const h = v * k; mk(G, 'rect', { x, y: y - h, width: w, height: h, fill: c, stroke: K.ink, 'stroke-width': 2.5 }); if (lbl && h > 22) { const e = mk(G, 'text', { x: x + w / 2, y: y - h / 2 + 6, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 15, fill: K.ink }); e.textContent = n; } y -= h; }); return G; };

/* ---------- H: syringe, balloon, bicycle ---------- */
S.push(EP.hook({ label: 'AFTER THE HILL CLIMB', face: 'aarav', pill: ['Pull back: air rushes in', ['H1', 'Pull', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['What pulls air into my lungs?', ['H3', 'pulls', -0.3]], ['How much air can they hold?', ['H3', 'much', -0.3]]],
  a: [['ANSWER 1', 'Muscles make the chest bigger', ['H4', 'Muscles']], ['ANSWER 2', 'About 500 mL per normal breath', ['H4', 'five']]],
  chips: [['Inspiration', ['H5', 'inspiration']], ['Expiration', ['H5', 'expiration']], ['Volumes', ['H5', 'volumes']], ['Capacities', ['H5', 'capacities']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' });
    const sy = mk(s, 'g', {}); mk(sy, 'rect', { x: 80, y: 170, width: 300, height: 90, rx: 10, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 4 }); P(sy, 'M80,215 L40,215', 'none', K.ink, 6);
    for (let k = 1; k < 6; k++) P(sy, `M${80 + k * 50},170 L${80 + k * 50},186`, 'none', K.ink, 2);
    const pl = mk(sy, 'g', {}); mk(pl, 'rect', { x: 100, y: 178, width: 16, height: 74, fill: '#CBD0DA', stroke: K.ink, 'stroke-width': 3 }); P(pl, 'M116,215 L420,215', 'none', K.ink, 7); P(pl, 'M420,185 L420,245', 'none', K.ink, 9);
    const air = [0, 1, 2, 3, 4, 5].map(() => circ(sy, 0, 0, 6, K.o2L, K.o2, 2));
    const hill = mk(s, 'g', {}); P(hill, 'M0,500 C200,500 420,320 784,300 L784,580 L0,580 Z', '#8CC48F', '#3E9B5F', 3);
    const bal = mk(s, 'g', {}); const bl = mk(bal, 'ellipse', { cx: 620, cy: 190, rx: 70, ry: 84, fill: '#E7A3A8', stroke: K.ink, 'stroke-width': 4 }); P(bal, 'M620,274 L612,290 L628,290 Z', '#E7A3A8', K.ink, 3);
    return { els: [[sy, ['H1', 'syringe', -0.3], { dy: 12 }], [bal, ['H1', 'balloon', -0.3], { ...POP, sc: 0.6 }], [hill, ['H1', 'Climb', -0.3], { dy: 20 }]],
      anim: t => { const a = tm(['H1', 'Pull']), v = M.io((t - a) / 1.4); attr(pl, 'transform', `translate(${(220 * v).toFixed(1)} 0)`);
        air.forEach((e, k) => { const u = M.clamp((t - a - 0.2 - k * 0.15) / 1.2); attr(e, 'cx', (40 + (80 + 30 * k) * u).toFixed(1)); attr(e, 'cy', (200 + (k % 3) * 14).toFixed(1)); e.style.opacity = u > 0 ? 1 : 0; });
        const b = tm(['H1', 'Squeeze']), q = M.io((t - b) / 0.8) * (1 - 0.6 * M.io((t - b - 1.6) / 1)); attr(bl, 'rx', (70 - 20 * q).toFixed(1)); attr(bl, 'ry', (84 + 10 * q).toFixed(1)); } };
  } }));

/* ---------- B: the pressure rule ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'THE ONE RULE · HIGH PRESSURE TO LOW', build: (el, s) => {
  const c = chest(s, 800, 310, 0.85); const inA = mk(s, 'g', {}); arrow(inA, 520, 230, 690, 230, K.o2, 6); [0, 1].forEach(k => o2(inA, 570 + k * 60, 200, 1.1));
  const outA = mk(s, 'g', {}); arrow(outA, 910, 230, 1080, 230, K.co2, 6);
  const pi = div(el, 'pillp ac', { left: '60px', top: '200px' }, 'Inside lower → air in'), pe = div(el, 'pillp', { left: '1140px', top: '200px' }, 'Inside higher → air out');
  const ti = div(el, 'chp', { left: '60px', top: '280px' }); ti.textContent = 'INSPIRATION'; const te = div(el, 'chp', { left: '1140px', top: '280px' }); te.textContent = 'EXPIRATION';
  const rule = div(el, 'pillp', { left: '560px', top: '480px' }, 'Air flows from higher pressure to lower pressure');
  return { els: [[c.g, 'B1', { dy: 12 }], [rule, ['B2', 'Air', -0.1]], [inA, ['B3', 'lower', -0.1], { dx: -20, dy: 0 }], [pi, ['B3', 'lower']], [ti, ['B3', 'inspiration']], [outA, ['B3', 'higher', -0.1], { dx: -20, dy: 0 }], [pe, ['B3', 'higher']], [te, ['B3', 'expiration']]],
    anim: t => c.u(breath(t)) }; } }] });

/* ---------- Z: zoom ladder ---------- */
const ribPair = g => { [0, 1].forEach(k => P(g, `M60,${150 + k * 200} C300,${110 + k * 200} 700,${110 + k * 200} 1000,${170 + k * 200}`, 'none', K.boneS, 50)); [0, 1].forEach(k => P(g, `M60,${150 + k * 200} C300,${110 + k * 200} 700,${110 + k * 200} 1000,${170 + k * 200}`, 'none', K.bone, 40));
  const m = mk(g, 'g', {}); for (let i = 0; i < 26; i++) { const x = 100 + i * 34; P(m, `M${x},${190} L${x + 60},${300}`, 'none', K.mus, 6); } return m; };
S.push(EP.zoom({ to: 'L1', names: ['THORACIC CHAMBER', 'BETWEEN THE RIBS', 'RIBS LIFT'], scales: ['x1', 'x4', 'x2'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Diaphragm', 'A dome-shaped sheet', 'of muscle below the lungs.'], ['RUNG 2 OF 3', 'Intercostals', 'Inter = between.', 'Costal = ribs.'], ['RUNG 3 OF 3', 'Ribs lift', 'Ribs and sternum', 'move up and out.']], nfs: 50,
  av: { who: 'Aarav', text: 'So my chest is the syringe!', tin: ['Z4', 'contract', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 160, 70], build: g => { const c = chest(g, 528, 270, 0.95); return { labs: [[lab(g, 420, 360, 220, 440, 'Diaphragm', 'end'), ['Z2', 'diaphragm']], [lab(g, 640, 250, 860, 160, 'Lung'), ['Z2', 'lungs']]], anim: t => c.u(breath(t) * 0.4) }; } },
    { at: 'Z3', focus: [528, 260, 70], build: g => { ribPair(g); return { labs: [[lab(g, 500, 125, 640, 60, 'Rib'), ['Z3', 'ribs']], [lab(g, 470, 250, 560, 470, 'External intercostal muscle'), ['Z3', 'intercostal']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 200, y: 60, width: 30, height: 420, rx: 12, fill: K.bone, stroke: K.boneS, 'stroke-width': 3 }); const st = mk(g, 'rect', { x: 800, y: 120, width: 30, height: 300, rx: 12, fill: K.bone, stroke: K.boneS, 'stroke-width': 3 });
      const ribs = [0, 1, 2, 3].map(k => P(g, '', 'none', K.boneS, 12)); const up = mk(g, 'g', {}); arrow(up, 880, 320, 880, 220, C.ac, 5);
      return { labs: [[lab(g, 215, 100, 70, 40, 'Vertebral column'), ['Z4', 'ribs', 0.3]], [lab(g, 815, 150, 930, 80, 'Sternum'), ['Z4', 'sternum']], [lab(g, 520, 260, 560, 470, 'Ribs'), ['Z4', 'ribs']]],
        els: [[up, ['Z4', 'up'], POP]], anim: t => { const v = breath(t - tm('Z4')); ribs.forEach((r, k) => { const y0 = 140 + k * 80, y1 = y0 + 90 - 50 * v; attr(r, 'd', `M230,${y0} C450,${y0 + 30} 650,${y1} 800,${y1}`); }); attr(st, 'y', (170 - 50 * v).toFixed(1)); } }; } }] }));

/* ---------- L: one breath in ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'ONE BREATH IN · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Diaphragm contracts', 'it flattens · more room front to back'], ['External intercostals contract', 'ribs and sternum lift'], ['Lungs stretch', 'lung volume goes up'], ['Pressure drops', 'lower than the air outside'], ['Air rushes in', 'until the pressures are equal']], LT) }) },
  { pos: 'R', label: 'WATCH THE CHEST', build: (el, s) => {
    const c = chest(s, 392, 290, 0.95); const inA = mk(s, 'g', {}); arrow(inA, 392, 20, 392, 90, K.o2, 6);
    const gp = div(el, '', { position: 'absolute', left: '36px', top: '498px', width: '712px', display: 'flex', gap: '14px', justifyContent: 'center', font: "600 24px 'IBM Plex Mono'", color: C.mute });
    gp.innerHTML = '<span>INSIDE</span><span id="pq">=</span><span>OUTSIDE</span>'; const pq = gp.querySelector('#pq');
    return { anim: t => { const ts = LT.map(tm); const v = M.io((t - ts[0]) / 1) * 0.55 + M.io((t - ts[1]) / 1) * 0.45; c.u(v); M.setT(pq, t > ts[3] && t < ts[4] + 1.5 ? '<' : '='); pq.style.color = t > ts[3] && t < ts[4] + 1.5 ? C.ac : C.mute; inA.style.opacity = t > ts[4] ? (0.7 + 0.3 * Math.sin(t * 6)).toFixed(2) : 0; } }; } }] });

/* ---------- C: breathing out ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'BREATHING OUT · EXPIRATION', build: (el, s) => {
  const ch = EP.chain(el, [['MUSCLES RELAX', ['C2', 'relax']], ['CHEST SMALLER', ['C2', 'smaller']], ['LUNGS SHRINK', ['C3', 'shrink']], ['PRESSURE UP', ['C3', 'rises']], ['AIR OUT', ['C3', 'pushed']]]);
  const c = chest(s, 520, 370, 0.95); const outA = mk(s, 'g', {}); arrow(outA, 600, 210, 600, 150, K.co2, 6);
  const pa = div(el, 'pillp', { left: '960px', top: '200px' }, 'Diaphragm and sternum return'), pb = div(el, 'pillp', { left: '960px', top: '280px' }, 'Pressure inside > outside'), pc = div(el, 'pillp ac', { left: '960px', top: '360px' }, 'Hard breathing: abdominal muscles help');
  return { els: [[c.g, 'C1', { dy: 12 }], [pa, ['C2', 'normal', -0.2]], [pb, ['C3', 'rises', -0.1]], [pc, ['C3', 'abdomen', -0.2]]],
    anim: t => { ch.run(t, tm('C1') + 0.3); c.u(1 - M.io((t - tm(['C2', 'relax'])) / 2.5)); outA.style.opacity = t > tm(['C3', 'pushed']) ? (0.7 + 0.3 * Math.sin(t * 6)).toFixed(2) : 0; } }; } }] });

/* ---------- D: inspiration vs expiration ---------- */
const side = (inn) => (el, s) => { const c = chest(s, 540, 320, 0.85); const a = mk(s, 'g', {}); inn ? arrow(a, 620, 70, 620, 130, K.o2, 6) : arrow(a, 620, 130, 620, 70, K.co2, 6);
  const rows = (inn ? ['Muscles contract', 'Volume up · pressure down'] : ['Muscles relax', 'Volume down · pressure up']).map((x, i) => { const e = div(el, 'chp', { left: '36px', top: 100 + i * 60 + 'px' }); e.textContent = x; return e; });
  const id = inn ? 'D2' : 'D3'; return { els: [[rows[0], [id, inn ? 'contract' : 'relax', -0.1]], [rows[1], [id, inn ? 'volume' : 'volume', -0.1]]], anim: t => c.u(inn ? 0.15 + 0.85 * M.io((t - tm(id)) / 1.5) : 1 - M.io((t - tm(id)) / 1.5)) }; };
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'INSPIRATION', pill: ['Air comes in', ['D2', 'comes', -0.1], 'ac'], build: side(true) },
  { pos: 'R', label: 'EXPIRATION', tin: ['D3', null, -0.2], pill: ['12 to 16 breaths a minute', ['D3', 'twelve', -0.1], 'ac'], build: side(false) }] });

/* ---------- U: spirometer + volumes + think ---------- */
const TH = { q: 'Can the air of the residual volume ever reach the spirometer?', opts: ['Yes', 'No'], right: 1, why: 'No. Residual volume never leaves the lungs, so a spirometer cannot catch it.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: [160, 270, 520, 580], label: 'A SPIROMETER', tout: 'U4', build: (el, s) => {
    const g = mk(s, 'g', {}); mk(g, 'rect', { x: 60, y: 260, width: 220, height: 200, rx: 12, fill: '#E9EEF0', stroke: K.ink, 'stroke-width': 4 }); mk(g, 'rect', { x: 80, y: 180, width: 180, height: 120, rx: 8, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 });
    P(g, 'M280,300 C340,300 360,200 420,200', 'none', K.ink, 10); P(g, 'M280,300 C340,300 360,200 420,200', 'none', '#CBD0DA', 6); mk(g, 'rect', { x: 410, y: 180, width: 40, height: 40, rx: 8, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 });
    const tr = P(g, '', 'none', K.tv, 3); cap(g, 260, 500, 'MEASURES AIR IN AND OUT', { fill: C.ink });
    return { els: [[g, ['U2', 'spirometer', -0.2], { dy: 12 }]], anim: t => { let d = ''; for (let i = 0; i <= 40; i++) { const x = 90 + i * 4, y = 240 + 22 * Math.sin(i * 0.5 - t * 3); d += (i ? 'L' : 'M') + x + ',' + y.toFixed(1); } attr(tr, 'd', d); } }; } },
  { pos: [712, 270, 1048, 580], label: 'THE FOUR VOLUMES', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    // trace: baseline 330 (end of normal expiration), TV peaks 290, IRV top 120, ERV bottom 400, RV band 400-480
    const pts = []; for (let i = 0; i <= 150; i++) { const x = 60 + i * 4; let y; if (i < 60) y = 330 - 40 * (0.5 - 0.5 * Math.cos(i / 15 * 2 * Math.PI)); else if (i < 90) y = 330 - 210 * Math.sin((i - 60) / 30 * Math.PI) ; else if (i < 120) y = 330 + 70 * Math.sin((i - 90) / 30 * Math.PI); else y = 330 - 40 * (0.5 - 0.5 * Math.cos((i - 120) / 15 * 2 * Math.PI)); pts.push([x, y]); }
    mk(s, 'rect', { x: 60, y: 400, width: 600, height: 80, fill: VC.rv, opacity: 0.5 }); cap(s, 360, 450, 'NEVER LEAVES THE LUNGS', { fill: K.ink });
    const tr = P(s, 'M' + pts.map(p => p[0] + ',' + p[1].toFixed(1)).join(' L'), 'none', K.tv, 4);
    const br = (y1, y2, c, n, v, tS) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 700, y: y1, width: 26, height: y2 - y1, fill: c, stroke: K.ink, 'stroke-width': 2 }); const e = div(el, 'chp', { left: '746px', top: (y1 + y2) / 2 - 22 + 'px', fontSize: '19px' }); e.innerHTML = `<b style="font-family:IBM Plex Mono">${n}</b> ${v}`; return [[g, tS, { dx: -12, dy: 0 }], [e, tS, { dx: -12, dy: 0 }]]; };
    return { els: [...br(120, 290, VC.irv, 'IRV', '2500-3000 mL', ['U3', 'inspiratory']), ...br(290, 330, VC.tv, 'TV', '~500 mL', ['U3', 'tidal']), ...br(330, 400, VC.erv, 'ERV', '1000-1100 mL', ['U3', 'expiratory']), ...br(400, 480, VC.rv, 'RV', '1100-1200 mL', ['U3', 'residual'])],
      anim: t => M.draw(tr, t, tm(['U3', 'One']), (tm(['U3', 'residual']) - tm(['U3', 'One']))) }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Can', -0.1], why: ['U5', 'Residual'] })] });

/* ---------- W: add the volumes ---------- */
const TV = ['TV', 500, VC.tv], IRV = ['IRV', 2500, VC.irv], ERV = ['ERV', 1000, VC.erv], RV = ['RV', 1100, VC.rv];
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · ADD THE VOLUMES', ghost: 'EXAMPLE FIGURES', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · VITAL CAPACITY', 'ERV + TV + IRV = 4000 mL', 'MOST AIR OUT AFTER DEEPEST IN', s => { stack(s, 198, 280, 100, [ERV, TV, IRV], 0.062); }, ['W2', 'Vital', -0.2], ['W2', 'four'], ['W2', 'deepest']],
  ['STEP 2 · FUNCTIONAL RESIDUAL', 'ERV + RV = 2100 mL', 'LEFT AFTER A NORMAL BREATH OUT', s => { stack(s, 198, 280, 100, [RV, ERV], 0.062); }, ['W3', 'Functional', -0.2], ['W3', 'two'], ['W3', 'normal']],
  ['STEP 3 · TOTAL LUNG CAPACITY', 'VC + RV = 5100 mL', 'ALL AIR AFTER DEEPEST BREATH IN', s => { stack(s, 198, 284, 100, [RV, ERV, TV, IRV], 0.051); }, ['W4', 'Total', -0.2], ['W4', 'five'], ['W4', 'deepest']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['syringe', 'Pull a syringe', 'AIR RUSHES IN', ['H1', 'Pull']], ['balloon', 'Squeeze a balloon', 'AIR RUSHES OUT', ['H1', 'Squeeze']], ['bike', 'Climb a hill', 'YOU PANT', ['H1', 'Climb']]],
  scenes: S,
  stmt: { l2: 'Bigger chest, lower pressure, <span class="acc">air flows in</span>.', f: '<span class="lad">volume ↑ → pressure ↓ → <b>air in</b></span>', t2: ['T1', 'Bigger', -0.2], tf: ['T1', 'pressure'] },
  trap: { wrong: 'Vital capacity includes the residual volume', right: 'VC = ERV + TV + IRV · add RV only for TLC', tWrong: ['X2', 'residual', -0.3], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'only', -0.2], tSvg: ['X3', 'total', -0.4],
    build: s => { stack(s, 150, 230, 70, [ERV, TV, IRV], 0.045, false); stack(s, 290, 230, 70, [RV, ERV, TV, IRV], 0.037, false); cap(s, 185, 256, 'VC', { 'font-size': 14 }); cap(s, 325, 256, 'TLC', { 'font-size': 14 }); } },
  where: { type: 'Number questions adding volumes into capacities · statements on the muscles of breathing', at: ['E1', 'number'] },
  mcq: { q: 'A person has TV = 500 mL, IRV = 2500 mL and ERV = 1000 mL. What is the inspiratory capacity?', opts: ['3000 mL', '4000 mL', '1500 mL', '3500 mL'], right: 0 }, mcqAt: ['Q1', 'inspiratory', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['IC = TV + IRV', ['A2', 'TV']], ['500 + 2500 = 3000 mL', ['A3', 'Five']], ['4000 mL is the VC: a trap', ['A3', 'vital']]],
  recap: { title: 'Recap · breathing', lines: ['<b>Inspiration</b>: diaphragm, external intercostals contract · air in', '<b>Expiration</b>: muscles relax · pressure ↑ · air out · 12-16 per minute', '<b>Volumes</b>: TV ~500 · IRV 2500-3000 · ERV 1000-1100 · RV 1100-1200 mL', '<b>IC</b> = TV + IRV · <b>EC</b> = TV + ERV · <b>FRC</b> = ERV + RV', '<b>VC</b> = ERV + TV + IRV · <b>TLC</b> = VC + RV'] },
  yq: ['What makes the pressure in the lungs drop?', 'What is tidal volume?', 'What is vital capacity?'],
  next: { label: 'NEXT · EP 98', topic: 'Exchange and Transport of Gases' }
});
})();
