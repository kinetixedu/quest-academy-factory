// PUC Biology Ep 99: Regulation of Respiration and Respiratory Disorders (Living diagram, leaf green). Runner: ep.js + resp14.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, o2, co2, alveoli, chest, lungD } = R14;
const ICN = { timer: ['M10 2h4', 'M12 14l3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'], bike: ['M5 18a3 3 0 1 0 .1 0', 'M19 18a3 3 0 1 0 .1 0', 'M5 18l4-8h6l4 8', 'M9 10l3 8 3-8', 'M14 6h3'], wind: ['M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2', 'M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2'] };
const CR = { rhy: '#4A78C2', rhyL: '#C9D7F0', chem: '#D9A23B', chemL: '#F6E3B4', pnx: '#C77DA0', pnxL: '#F0D3E2', hp: '#D1495B' };
const S = [];
const brainD = 'M260,250 C200,170 250,70 360,60 C420,20 520,20 580,50 C660,30 760,70 770,150 C820,200 800,280 740,300 C700,330 640,320 600,300 C560,320 480,320 430,300 C360,320 280,300 260,250 Z';
const brain = (g, s = 1, cx = 0, cy = 0) => { const G = mk(g, 'g', { transform: `translate(${cx} ${cy}) scale(${s})` });
  P(G, brainD, '#F3D9DC', '#9C5A6A', 4); [['M330,140 C380,110 420,160 470,130', 0], ['M520,90 C560,130 600,100 640,140', 0], ['M380,230 C440,200 480,250 540,220', 0], ['M620,210 C660,180 700,230 740,200', 0]].forEach(([d]) => P(G, d, 'none', '#B57A88', 3));
  P(G, 'M620,300 C600,350 640,400 700,390 C760,380 770,320 730,300 Z', '#EBC3C9', '#9C5A6A', 3.5); for (let k = 0; k < 4; k++) P(G, `M${640 + k * 10},${320 + k * 16} L${740 - k * 6},${314 + k * 16}`, 'none', '#B57A88', 2);
  P(G, 'M540,300 C520,330 520,360 540,380 C530,420 540,470 550,520 L590,520 C590,470 595,420 590,380 C610,360 610,330 590,300 Z', '#F6E2CF', '#9C5A6A', 3.5); return G; };

/* ---------- H: holding the breath ---------- */
S.push(EP.hook({ label: 'AFTER CLASS · ONE MINUTE CHALLENGE', face: 'aarav', pill: ['Hold your breath...', ['H1', 'Hold', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['Who decides when I must breathe?', ['H3', 'decides', -0.3]], ['What goes wrong when it gets hard?', ['H3', 'wrong', -0.3]]],
  a: [['ANSWER 1', 'Brain centres watching CO2 and H+', ['H4', 'Centres']], ['ANSWER 2', 'Asthma, emphysema, dust', ['H4', 'Disorders']]],
  chips: [['Rhythm centre', ['H5', 'rhythm']], ['Pneumotaxic centre', ['H5', 'pneumotaxic']], ['Chemical sensors', ['H5', 'chemical']], ['Disorders', ['H5', 'disorders']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' });
    const sw = mk(s, 'g', {}); circ(sw, 230, 270, 120, '#FFFFFF', K.ink, 5); mk(sw, 'rect', { x: 215, y: 130, width: 30, height: 22, rx: 4, fill: K.ink }); const arc = P(sw, '', 'none', CR.hp, 14, { opacity: 0.35 }); const hand = P(sw, 'M230,270 L230,170', 'none', CR.hp, 6); circ(sw, 230, 270, 8, K.ink, K.ink, 1);
    const meter = mk(s, 'g', {}); mk(meter, 'rect', { x: 470, y: 150, width: 60, height: 260, rx: 30, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 4 }); const lv = mk(meter, 'rect', { x: 482, y: 390, width: 36, height: 10, rx: 18, fill: K.co2 }); T(meter, 500, 440, 'CO2 IN BLOOD', 18, K.co2);
    const urge = div(el, 'chp', { left: '560px', top: '200px', background: CR.hp, color: '#fff' }); urge.textContent = 'BREATHE!';
    return { els: [[sw, ['H1', 'Hold', -0.2], { ...POP, sc: 0.6 }], [meter, ['H1', 'After', -0.2], { dy: 12 }], [urge, ['H1', 'forces', -0.1], { ...POP, sc: 0.5 }]],
      anim: t => { const a = tm(['H1', 'Hold']), v = M.clamp((t - a) / 6), ang = v * 2 * Math.PI; attr(hand, 'transform', `rotate(${(v * 360).toFixed(1)} 230 270)`);
        attr(arc, 'd', v > 0.01 ? `M230,180 A90,90 0 ${v > 0.5 ? 1 : 0} 1 ${(230 + 90 * Math.sin(ang)).toFixed(1)},${(270 - 90 * Math.cos(ang)).toFixed(1)}` : '');
        const h = 10 + 220 * M.clamp((t - a) / 4); attr(lv, 'y', (400 - h).toFixed(1)); attr(lv, 'height', h.toFixed(1)); } };
  } }));

/* ---------- B: autopilot ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'BREATHING ON AUTOPILOT', build: (el, s) => {
  const g = mk(s, 'g', {}); brain(g, 0.8, 380, 60); const med = circ(s, 380 + 0.8 * 565, 60 + 0.8 * 400, 18, CR.rhyL, CR.rhy, 4);
  const sig = P(s, `M${380 + 0.8 * 570},${60 + 0.8 * 520} C900,520 1100,520 1180,470`, 'none', CR.rhy, 4, { 'stroke-dasharray': '10 8' }); const c = chest(s, 1300, 340, 0.75);
  const p1 = div(el, 'pillp', { left: '60px', top: '150px' }, 'You can: hold it, breathe deeper'), p2 = div(el, 'pillp ac', { left: '60px', top: '230px' }, 'Mostly: the nervous system');
  return { els: [[g, 'B1', { dy: 12 }], [p1, ['B2', 'change', -0.1]], [p2, ['B2', 'nervous', -0.1]], [c.g, ['B2', 'match', -0.2], { dy: 12 }], [med, ['B3', 'medulla', -0.2], { ...POP, sc: 0.4 }]],
    labs: [[lab(s, 380 + 0.8 * 565, 60 + 0.8 * 400, 760, 470, 'Respiratory rhythm centre', 'end'), ['B3', 'rhythm']]],
    anim: t => { c.u(0.5 - 0.5 * Math.cos(t * 1.6)); M.draw(sig, t, tm(['B3', 'responsible']), 0.8); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['BRAIN', 'BRAIN STEM', 'THE CENTRES'], scales: ['x1', 'x3', 'x8'], ghost: 'EXAMPLE FIGURES', nfs: 46,
  info: [['RUNG 1 OF 3', 'Brain stem', 'At the base of the brain,', 'joining the spinal cord.'], ['RUNG 2 OF 3', 'Pons, medulla', 'Pons above,', 'medulla below.'], ['RUNG 3 OF 3', 'The centres', 'Medulla: rhythm centre', 'Pons: pneumotaxic centre']],
  av: { who: 'Aarav', text: 'Two control rooms!', tin: ['Z4', 'pneumotaxic', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [537, 400, 60], build: g => { brain(g, 0.95, 0, 0); return { labs: [[lab(g, 540, 430, 760, 470, 'Brain stem'), ['Z2', 'brain', 0, 1]], [lab(g, 300, 160, 120, 70, 'Brain', 'end'), ['Z2', 'brain']]] }; } },
    { at: 'Z3', focus: [500, 380, 60], build: g => { const s2 = mk(g, 'g', { transform: 'translate(-1320 -980) scale(3.2)' }); P(s2, 'M540,300 C520,330 520,360 540,380 C530,420 540,470 550,520 L590,520 C590,470 595,420 590,380 C610,360 610,330 590,300 Z', '#F6E2CF', '#9C5A6A', 1.2);
      return { labs: [[lab(g, 500, 110, 760, 90, 'Pons'), ['Z3', 'pons']], [lab(g, 510, 390, 760, 420, 'Medulla'), ['Z3', 'medulla']]] }; } },
    { at: 'Z4', build: g => { P(g, 'M440,0 C380,120 380,200 440,260 C410,360 430,440 450,526 L610,526 C620,440 630,360 600,260 C660,200 660,120 600,0 Z', '#F6E2CF', '#9C5A6A', 4);
      const r = circ(g, 500, 340, 40, CR.rhyL, CR.rhy, 4), ch = circ(g, 570, 360, 30, CR.chemL, CR.chem, 4), pn = circ(g, 520, 110, 36, CR.pnxL, CR.pnx, 4);
      return { els: [[r, ['Z4', 'respiratory'], { ...POP, sc: 0.3 }], [ch, ['Z4', 'chemosensitive'], { ...POP, sc: 0.3 }], [pn, ['Z4', 'pneumotaxic'], { ...POP, sc: 0.3 }]],
        labs: [[lab(g, 470, 350, 420, 440, 'Respiratory rhythm centre', 'end'), ['Z4', 'respiratory']], [lab(g, 590, 370, 720, 470, 'Chemosensitive area'), ['Z4', 'chemosensitive']], [lab(g, 490, 100, 420, 60, 'Pneumotaxic centre', 'end'), ['Z4', 'pneumotaxic']]] }; } }] }));

/* ---------- L: the CO2 loop ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'WHEN CO2 BUILDS UP · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['CO2 and H+ go up', 'cells make more CO2 in exercise'], ['Chemosensitive area senses', 'it sits next to the rhythm centre'], ['Aortic and carotid receptors', 'on big vessels near heart and neck'], ['Signals to the rhythm centre', 'all sensors report in'], ['Breathing adjusts', 'extra CO2 and H+ removed']], LT) }) },
  { pos: 'R', label: 'THE CONTROL LOOP', build: (el, s) => {
    const bs = mk(s, 'g', {}); P(bs, 'M120,60 C90,130 90,170 120,200 C105,260 115,300 125,340 L205,340 C210,300 215,260 200,200 C230,170 230,130 200,60 Z', '#F6E2CF', '#9C5A6A', 3); const rc = circ(bs, 150, 220, 26, CR.rhyL, CR.rhy, 3.5), chA = circ(bs, 195, 236, 18, CR.chemL, CR.chem, 3.5); cap(bs, 160, 380, 'MEDULLA', { fill: C.ink });
    const heart = mk(s, 'g', {}); P(heart, 'M560,330 C520,280 470,320 500,370 L560,430 L620,370 C650,320 600,280 560,330 Z', '#E39A9A', '#9C3A3A', 3); const ao = P(heart, 'M560,330 C560,250 640,230 680,280 L680,420', 'none', K.red, 16); P(heart, 'M600,250 L600,110', 'none', K.red, 12); P(heart, 'M630,245 L650,110', 'none', K.red, 12);
    const rA = circ(heart, 640, 252, 12, CR.chemL, CR.chem, 3), rC = circ(heart, 600, 160, 12, CR.chemL, CR.chem, 3); cap(heart, 700, 470, 'AORTIC ARCH', { fill: C.ink }); cap(heart, 640, 90, 'CAROTID ARTERY', { fill: C.ink });
    const m = mk(s, 'g', {}); const mol = [0, 1, 2, 3, 4].map(k => co2(m, 300 + (k % 3) * 60, 460 + Math.floor(k / 3) * 40, 1)); cap(m, 360, 540, 'CO2 · H+ IN BLOOD', { fill: K.co2 });
    const s1 = P(s, 'M230,236 C300,236 310,236 330,236', 'none', CR.chem, 4, { 'stroke-dasharray': '8 6' }), s2 = P(s, 'M590,160 C450,130 300,170 176,210', 'none', CR.chem, 4, { 'stroke-dasharray': '8 6' }), s3 = P(s, 'M630,262 C470,300 300,260 176,228', 'none', CR.chem, 4, { 'stroke-dasharray': '8 6' });
    const out = mk(s, 'g', {}); arrow(out, 150, 250, 150, 300, CR.rhy, 5); const lu = mk(s, 'g', {}); P(lu, lungD(330, 300, -1, 0.42), K.lung, K.lungS, 3); P(lu, lungD(352, 300, 1, 0.42), K.lung, K.lungS, 3); const oc = [0, 1].map(() => co2(s, 0, 0, 0.9));
    return { anim: t => { const ts = LT.map(tm); M.vis(m, t, ts[0] - 0.2, 1e9, { dy: 10 }); mol.forEach((e, k) => e.style.opacity = t > ts[0] + 0.2 * k ? 1 : 0);
      [chA].forEach(e => attr(e, 'stroke-width', t > ts[1] && t < ts[2] ? 7 : 3.5)); [rA, rC].forEach(e => attr(e, 'stroke-width', t > ts[2] && t < ts[3] ? 7 : 3)); M.draw(s2, t, ts[3], 0.6); M.draw(s3, t, ts[3] + 0.1, 0.6); s1.style.opacity = 0;
      attr(rc, 'stroke-width', t > ts[3] ? (5 + 2 * Math.sin(t * 8)).toFixed(1) : 3.5); M.vis(lu, t, ts[4] - 0.2, 1e9, POP); out.style.opacity = t > ts[4] ? 1 : 0; const sc2 = 1 + (t > ts[4] ? 0.06 * Math.sin(t * 5) : 0); attr(lu, 'transform', `translate(341 380) scale(${sc2.toFixed(3)}) translate(-341 -380)`);
      oc.forEach((e, k) => { const u = ((t - ts[4]) * 0.6 + k / 2) % 1; at(e, 341, 320 - 80 * u); e.style.opacity = t > ts[4] + 0.3 ? (1 - u).toFixed(2) : 0; }); } }; } }] });

/* ---------- C: the two centres ---------- */
const wave = (x0, y0, w, n, insp) => { let d = ''; const per = w / n; for (let i = 0; i < n; i++) { const a = x0 + i * per; d += `${i ? 'L' : 'M'}${a},${y0} L${a + per * insp},${y0 - 70} L${a + per},${y0} `; } return d; };
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'TWO CENTRES, ONE RHYTHM', build: (el, s) => {
  const ch = EP.chain(el, [['RHYTHM CENTRE · MEDULLA', ['C2', 'respiratory']], ['PNEUMOTAXIC CENTRE · PONS', ['C2', 'pneumotaxic']], ['SHORTER BREATH IN', ['C2', 'shorten']], ['RATE CHANGES', ['C2', 'rate']]]);
  const g1 = mk(s, 'g', {}); T(g1, 120, 210, 'BASIC RHYTHM', 18, CR.rhy, { 'text-anchor': 'start', 'font-family': 'IBM Plex Mono' }); P(g1, wave(120, 320, 560, 4, 0.5), 'none', CR.rhy, 5);
  const g2 = mk(s, 'g', {}); T(g2, 120, 400, 'PNEUMOTAXIC SIGNAL · SHORTER INSPIRATION', 18, CR.pnx, { 'text-anchor': 'start', 'font-family': 'IBM Plex Mono' }); P(g2, wave(120, 510, 560, 6, 0.3), 'none', CR.pnx, 5);
  const ox = div(el, 'pillp', { left: '820px', top: '200px' }, 'Sensors watch CO2 and H+'), o2c = div(el, 'pillp', { left: '820px', top: '290px', textDecoration: 'line-through', color: C.mute }, 'Oxygen: role quite insignificant');
  const ms = mk(s, 'g', {}); P(ms, 'M1400,90 C1370,160 1370,200 1400,230 C1385,300 1395,380 1405,500 L1495,500 C1500,380 1505,300 1490,230 C1520,200 1520,160 1490,90 Z', '#F6E2CF', '#9C5A6A', 3); circ(ms, 1445, 150, 26, CR.pnxL, CR.pnx, 3.5); circ(ms, 1435, 300, 30, CR.rhyL, CR.rhy, 3.5); cap(ms, 1355, 156, 'PONS', { fill: CR.pnx, 'text-anchor': 'end' }); cap(ms, 1365, 306, 'MEDULLA', { fill: CR.rhy, 'text-anchor': 'end' });
  const mol = mk(s, 'g', {}); [0, 1, 2].forEach(k => co2(mol, 900 + k * 70, 440, 1.3)); circ(mol, 1140, 440, 18, '#F6D0D6', CR.hp, 3); T(mol, 1140, 447, 'H+', 16, CR.hp); const om = o2(s, 1260, 440, 1.3);
  return { els: [[ms, 'C1', { dy: 10 }], [g1, ['C2', 'sets', -0.3], { dy: 10 }], [g2, ['C2', 'moderate', -0.2], { dy: 10 }], [o2c, ['C3', 'oxygen', -0.1]], [ox, ['C3', 'sensors', -0.2]], [mol, ['C3', 'carbon', -0.2], { dy: 10 }], [om, ['C3', 'oxygen', -0.1], { dy: 10 }]],
    anim: t => { ch.run(t, tm('C1') + 0.3); om.style.opacity = t > tm(['C3', 'insignificant']) ? 0.3 : om.style.opacity; } }; } }] });

/* ---------- D: asthma vs emphysema ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'ASTHMA · INFLAMED BRONCHI AND BRONCHIOLES', pill: ['Wheezing: a whistling sound', ['D2', 'wheezing', -0.1], 'ac'], build: (el, s) => {
    const mkB = (x, lbl) => { const g = mk(s, 'g', {}); circ(g, x, 250, 120, '#F3C9CC', K.lungS, 4); const lum = circ(g, x, 250, 70, '#FFFFFF', K.lungS, 3); cap(g, x, 410, lbl, { fill: C.ink }); return { g, lum }; };
    const a = mkB(220, 'NORMAL AIRWAY'), b = mkB(560, 'ASTHMA: NARROW'); const wz = mk(s, 'g', {}); [0, 1, 2].forEach(k => P(wz, `M${660 + k * 14},${150 - k * 10} q10,-10 0,-20`, 'none', C.ac, 3));
    return { els: [[a.g, ['D2', 'Asthma', -0.2], { dy: 12 }], [b.g, ['D2', 'caused', -0.2], { dy: 12 }], [wz, ['D2', 'whistling'], POP]], anim: t => { const v = M.io((t - tm(['D2', 'inflammation'])) / 1.2); attr(b.lum, 'r', (70 - 45 * v).toFixed(1)); attr(b.g.firstChild, 'stroke-width', (4 + 3 * v).toFixed(1)); } }; } },
  { pos: 'R', label: 'EMPHYSEMA · ALVEOLAR WALLS DAMAGED', tin: ['D3', null, -0.2], pill: ['Major cause: cigarette smoking', ['D3', 'smoking', -0.2], 'ac'], build: (el, s) => {
    const a = alveoli(s, 220, 230, 1.05, false); cap(s, 220, 420, 'HEALTHY: MANY SMALL SACS', { fill: C.ink });
    const b = mk(s, 'g', {}); P(b, 'M560,90 L560,150', 'none', K.lungS, 14); P(b, 'M470,250 C440,150 680,150 650,250 C690,330 600,390 560,350 C520,390 430,330 470,250 Z', K.alv, K.lungS, 3); P(b, 'M520,220 L540,280 M600,230 L590,300', 'none', K.lungS, 2, { 'stroke-dasharray': '6 6' }); cap(b, 560, 420, 'EMPHYSEMA: FEW BIG SACS', { fill: C.ink });
    return { els: [[a, ['D3', 'Emphysema', -0.2], { dy: 12 }], [b, ['D3', 'damaged', -0.2], { dy: 12 }]] }; } }] });

/* ---------- U: occupational disorders + think ---------- */
const TH = { q: 'In emphysema, does the surface for gas exchange grow or shrink?', opts: ['It grows', 'It shrinks'], right: 1, why: 'It shrinks. Damaged alveolar walls leave less surface to swap gases.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'OCCUPATIONAL RESPIRATORY DISORDERS', tout: 'U4', build: (el, s) => {
    const ch = EP.chain(el, [['DUST', ['U2', 'dust']], ['INFLAMMATION', ['U3', 'inflammation']], ['FIBROSIS', ['U3', 'fibrosis']], ['LUNG DAMAGE', ['U3', 'damage']]]);
    const st = mk(s, 'g', {}); mk(st, 'rect', { x: 60, y: 380, width: 200, height: 90, rx: 10, fill: '#CFC8B8', stroke: K.ink, 'stroke-width': 3 }); P(st, 'M120,380 L150,420 L130,470 M190,380 L170,430', 'none', K.ink, 2); cap(st, 160, 500, 'STONE-BREAKING', { fill: C.ink });
    const lg = mk(s, 'g', {}); P(lg, lungD(500, 180, -1, 0.95), K.lung, K.lungS, 3.5); P(lg, lungD(540, 180, 1, 0.95), K.lung, K.lungS, 3.5); const fib = mk(lg, 'g', {}); for (let k = 0; k < 10; k++) P(fib, `M${400 + (k * 53) % 240},${240 + (k * 37) % 160} l${12},${8} l${-6},${12}`, 'none', '#6B5A3A', 3);
    const dust = Array.from({ length: 14 }, () => circ(s, 0, 0, 4, '#9C8A6A', '#6B5A3A', 1.5));
    return { els: [[st, ['U2', 'industries', -0.2], { dy: 12 }], [lg, ['U2', 'cope', -0.4], { dy: 12 }]], anim: t => { ch.run(t, tm('U1') + 0.3); const a = tm(['U2', 'dust']); dust.forEach((d, k) => { const u = ((t - a) * 0.4 + k / 14) % 1; attr(d, 'cx', (180 + 300 * u + 20 * Math.sin(k)).toFixed(1)); attr(d, 'cy', (380 - 140 * u + (k % 4) * 12).toFixed(1)); d.style.opacity = t > a ? 1 : 0; }); fib.style.opacity = M.clamp((t - tm(['U3', 'fibrosis'])) / 0.6).toFixed(2); } }; } },
  { pos: 'R', label: 'PROTECTION', tin: ['U3', 'Workers', -0.4], tout: 'U4', pill: ['Workers should wear protective masks', ['U3', 'protective', -0.2], 'ac'], build: (el, s) => {
    const g = mk(s, 'g', {}); circ(g, 392, 240, 130, K.skin, K.skinS, 4); P(g, 'M290,250 C300,330 484,330 494,250 C470,230 314,230 290,250 Z', '#FFFFFF', K.ink, 4); [0, 1, 2].forEach(k => P(g, `M320,${262 + k * 16} L464,${262 + k * 16}`, 'none', '#CBD0DA', 3)); P(g, 'M290,250 L250,210 M494,250 L534,210', 'none', K.ink, 3); circ(g, 345, 200, 8, K.ink, K.ink, 1); circ(g, 440, 200, 8, K.ink, K.ink, 1);
    return { els: [[g, ['U3', 'masks', -0.4], { ...POP, sc: 0.6 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'In', -0.1], why: ['U5', 'alveolar'] })] });

/* ---------- W: name the disorder ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THE DISORDER', svg: false, build: el => EP.cols(el, [
  ['PERSON 1 · WHEEZING', 'Asthma', 'SWOLLEN BRONCHI, BRONCHIOLES', s => { circ(s, 248, 140, 80, '#F3C9CC', K.lungS, 6); circ(s, 248, 140, 22, '#FFFFFF', K.lungS, 3); }, ['W2', 'Person', -0.2], ['W2', 'asthma'], ['W2', 'swollen']],
  ['PERSON 2 · SMOKED FOR YEARS', 'Emphysema', 'ALVEOLAR WALLS DAMAGED', s => { P(s, 'M170,140 C140,50 360,50 330,140 C370,220 280,270 248,240 C210,270 120,220 170,140 Z', K.alv, K.lungS, 3); P(s, 'M248,30 L248,70', 'none', K.lungS, 12); }, ['W3', 'Person', -0.2], ['W3', 'emphysema'], ['W3', 'alveolar']],
  ['PERSON 3 · STONE CUTTER', 'Occupational disorder', 'DUST → FIBROSIS · WEAR A MASK', s => { P(s, lungD(230, 50, -1, 0.85), K.lung, K.lungS, 3); P(s, lungD(266, 50, 1, 0.85), K.lung, K.lungS, 3); for (let k = 0; k < 8; k++) P(s, `M${130 + (k * 41) % 230},${100 + (k * 29) % 140} l10,6 l-5,10`, 'none', '#6B5A3A', 3); }, ['W4', 'Person', -0.2], ['W4', 'occupational'], ['W4', 'fibrosis']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['timer', 'Hold your breath', 'BODY FORCES A BREATH', ['H1', 'Hold']], ['bike', 'Sprint on a cycle', 'BREATHING SPEEDS UP', ['H1', 'Sprint']], ['wind', 'Without thinking', 'IT RUNS ITSELF', ['H1', 'thinking']]],
  scenes: S,
  stmt: { l2: '<span class="acc">CO2</span>, not oxygen, drives your breathing.', f: '<span class="lad">CO2 + H+ ↑ → sensors → rhythm centre → <b>breathing adjusts</b></span>', t2: ['T1', 'Carbon', -0.2], tf: ['T1', 'oxygen'] },
  trap: { wrong: 'The pneumotaxic centre is in the medulla', right: 'It is in the pons · rhythm centre and chemosensitive area are in the medulla', tWrong: ['X2', 'pneumotaxic', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'pons', -0.2], tSvg: ['X3', 'rhythm', -0.4],
    build: s => { P(s, 'M180,20 C150,80 150,110 180,130 C165,170 175,210 185,250 L265,250 C270,210 275,170 260,130 C290,110 290,80 260,20 Z', '#F6E2CF', '#9C5A6A', 3); circ(s, 220, 70, 20, CR.pnxL, CR.pnx, 3); circ(s, 210, 170, 20, CR.rhyL, CR.rhy, 3); circ(s, 245, 182, 13, CR.chemL, CR.chem, 3); cap(s, 330, 76, 'PONS', { 'font-size': 14 }); cap(s, 330, 176, 'MEDULLA', { 'font-size': 14 }); } },
  where: { type: 'Statement or match questions: brain centres, chemical sensors, asthma, emphysema, occupational disorders', at: ['E1', 'statement'] },
  mcq: { q: '<b>Assertion (A):</b> Breathing becomes faster when CO2 in the blood rises.<br><b>Reason (R):</b> The pneumotaxic centre is located in the pons.', opts: ['Both true, R is reason', 'Both true, R not reason', 'A true, R false', 'A false, R true'], right: 1 }, mcqAt: ['Q1', 'assertion', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['A is true: CO2 sensors fire', ['A2', 'chemosensitive']], ['R is true: pons', ['A3', 'indeed']], ['But R does not explain A', ['A3', 'explain']]],
  recap: { title: 'Recap · regulation and disorders', lines: ['<b>Rhythm centre</b>: medulla · sets the breathing rhythm', '<b>Pneumotaxic centre</b>: pons · shortens inspiration, changes rate', '<b>Sensors</b>: chemosensitive area · aortic arch · carotid artery (CO2, H+)', '<b>Asthma</b>: inflamed bronchi · <b>Emphysema</b>: alveolar walls damaged', '<b>Occupational</b>: dust → inflammation → fibrosis · wear masks'] },
  yq: ['Where is the respiratory rhythm centre?', 'What does the pneumotaxic centre do?', 'What is damaged in emphysema?'],
  next: { label: 'NEXT · EP 100', topic: 'Body Fluids and Circulation' }
});
})();
