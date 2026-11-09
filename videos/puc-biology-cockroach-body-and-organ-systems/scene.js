// PUC Biology Ep 59: Cockroach - Body and Organ Systems (Living diagram, leaf green). Runner: ep.js
(() => {
const { C, mk, txt, cap, POP, lab, pol, tm, div, mix, attr } = EP;
const BR = '#9A6236', BRd = '#5A3618', TEG = '#8A5A2E', GUT = '#F2B8A8', GUTd = '#B5655A', MAL = '#E9C46A', MALd = '#B5932A', HL = '#EAF3F6', HLd = '#7FA3B8', AIR = '#3A7FB0', NV = '#7A5BB0', CB = C.ac;
const circ = (g, x, y, r, f, s = '#2E2A24', w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
const P = (g, d, f, s = '#2E2A24', w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
const flow = (path, dot, v) => { const L = path.getTotalLength(), q = path.getPointAtLength(L * M.clamp(v)); attr(dot, 'cx', q.x.toFixed(1)); attr(dot, 'cy', q.y.toFixed(1)); };
// cockroach from above, head up, centred at 0,0 (about 300 x 450 at s=1). o.wings (default true), o.male
const roach = (p, cx, cy, s = 1, o = {}) => { const og = mk(p, 'g', {}), g = mk(og, 'g', { transform: `translate(${cx} ${cy}) scale(${s})` }), R = { g: og, inner: g, seg: [], legs: [], teg: [], th: [] };
  [-1, 1].forEach(m => { R.ant = P(g, `M${m * 8},-124 C${m * 30},-190 ${m * 70},-230 ${m * 100},-270`, 'none', BRd, 2.5);
    [[-70, [95, -95], [110, -145]], [-38, [112, -30], [145, 20]], [-12, [115, 30], [150, 115]]].forEach(([y, a, b]) => { const l = P(g, `M${m * 40},${y} L${m * a[0]},${a[1]} L${m * b[0]},${b[1]}`, 'none', BRd, 7); R.legs.push(l); for (let k = 1; k < 4; k++) { const x = m * (a[0] + (b[0] - a[0]) * k / 4), yy = a[1] + (b[1] - a[1]) * k / 4; P(g, `M${x},${yy} l${m * 8},-6`, 'none', BRd, 2); } });
    R.cer = R.cer || []; R.cer.push(P(g, `M${m * 18},150 L${m * 36},186`, 'none', BRd, 5)); if (o.male) { R.sty = R.sty || []; R.sty.push(P(g, `M${m * 7},154 L${m * 9},172`, 'none', BRd, 2.5)); } });
  for (let k = 0; k < 10; k++) { const y = 2 + k * 15, w = 58 - k * 3.6; R.seg.push(mk(g, 'rect', { x: -w, y, width: 2 * w, height: 15, rx: 7, fill: BR, stroke: BRd, 'stroke-width': 2 })); }
  [[-40, 54], [-16, 56]].forEach(([y, w]) => R.th.push(mk(g, 'rect', { x: -w, y: y - 12, width: 2 * w, height: 24, rx: 8, fill: BR, stroke: BRd, 'stroke-width': 2 })));
  R.th.unshift(mk(g, 'ellipse', { cx: 0, cy: -74, rx: 60, ry: 30, fill: '#7E4C27', stroke: BRd, 'stroke-width': 2.5 }));
  if (o.hw) R.hw = P(g, 'M8,-34 C90,-60 190,-30 205,40 C210,110 140,160 30,90 Z', '#EEF4F7', '#9DB4C2', 2, { opacity: 0.85 });
  if (o.wings !== false) [-1, 1].forEach(m => R.teg.push(P(g, `M${m * 4},-46 C${m * 50},-48 ${m * 64},0 ${m * 58},60 C${m * 52},130 ${m * 30},170 ${m * -6},176 C${m * 0},100 ${m * 2},20 ${m * 4},-46 Z`, TEG, BRd, 2.5, { opacity: 0.96 })));
  R.head = mk(g, 'path', { d: 'M-26,-104 L26,-104 L10,-136 L-10,-136 Z', fill: '#6E4220', stroke: BRd, 'stroke-width': 2.5 }); [-1, 1].forEach(m => mk(g, 'ellipse', { cx: m * 16, cy: -118, rx: 6, ry: 10, fill: '#2E1E10' }));
  return R; };

const S = [];
/* ---------- H: a dark kitchen ---------- */
S.push(EP.hook({ label: 'A KITCHEN AT NIGHT', face: 'aarav', pill: ['Gone in a second', ['H2', 'Gone', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['How did it sense him so fast?', ['H3', 'sense']], ['No bones: how does it keep its shape?', ['H3', 'bones']]],
  a: [['ANSWER 1', 'Sense organs and nerves along the body', ['H4', 'sense']], ['ANSWER 2', 'A hard outer skeleton of chitin', ['H4', 'hard']]],
  chips: [['Mouth parts', ['H5', 'mouth']], ['Wings', ['H5', 'wings']], ['Digestion', ['H5', 'digestion']], ['Blood', ['H5', 'blood']], ['Breathing', ['H5', 'breathing']], ['Nerves', ['H5', 'nerves']], ['Life cycle', ['H5', 'life']]],
  build: (el, s) => {
    const room = mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#1E2533' }); mk(s, 'rect', { x: 0, y: 440, width: 784, height: 140, fill: '#3A3328' });
    const sh = mk(s, 'g', {}); mk(sh, 'rect', { x: 470, y: 250, width: 300, height: 190, fill: '#5E4A34', stroke: '#2E2418', 'stroke-width': 4 }); mk(sh, 'rect', { x: 470, y: 250, width: 300, height: 20, fill: '#7A6146' }); mk(sh, 'rect', { x: 490, y: 410, width: 260, height: 30, fill: '#14100B' });
    const lc = P(s, 'M300,70 L360,70 L560,440 L100,440 Z', '#FFF3C4', 'none', 0, { opacity: 0 }); circ(s, 330, 82, 14, '#FFF3C4', '#8C7A4E', 2);
    const R = roach(s, 0, 0, 0.3, {});
    return { anim: t => { const tl = tm(['H1', 'flicks']), td = tm(['H1', 'dashes']); lc.style.opacity = t > tl ? 0.35 : 0; attr(room, 'fill', t > tl ? '#3A4256' : '#1E2533');
      const v = M.io((t - td) / 0.9), x = 260 + 380 * v, y = 470 - 40 * v; attr(R.inner, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(70 * M.clamp(v * 4)).toFixed(1)}) scale(0.3)`); R.g.style.opacity = v > 0.97 ? 0 : 1; } };
  } }));

/* ---------- B: meet the cockroach ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'MEET THE COCKROACH', ghost: true, build: (el, s) => {
  const R = roach(s, 220, 300, 0.78); const nm = div(el, '', { position: 'absolute', left: '40px', top: '500px', width: '360px', textAlign: 'center', font: 'italic 700 28px Manrope', color: C.ink }, 'Periplaneta americana');
  const rl = mk(s, 'g', {}); mk(rl, 'rect', { x: 470, y: 120, width: 360, height: 40, rx: 4, fill: '#F6E7B8', stroke: '#B59A3C', 'stroke-width': 2 }); for (let k = 0; k <= 12; k++) mk(rl, 'line', { x1: 480 + k * 28, y1: 120, x2: 480 + k * 28, y2: k % 2 ? 132 : 140, stroke: '#8C7A4E', 'stroke-width': 2 }); cap(rl, 650, 196, '34 TO 53 MM LONG', { fill: C.ink });
  const K = [['Brown or black', 'brown'], ['Active at night', 'night'], ['Eats almost anything', 'eats'], ['Lives in damp places', 'damp']].map(([w, k], i) => [div(el, 'chp', { left: '470px', top: 236 + i * 58 + 'px', width: '360px', justifyContent: 'center' }, w), ['B2', k, -0.1]]);
  // three parts, sclerites and membranes
  const pg = mk(s, 'g', {}); const parts = [[960, 60, 'HEAD', 'head'], [1040, 150, 'THORAX', 'thorax'], [1210, 290, 'ABDOMEN', 'abdomen']];
  const pr = parts.map(([x, w, n]) => { const g = mk(pg, 'g', {}); const k = Math.max(1, Math.round(w / 30)); for (let i = 0; i < k; i++) { mk(g, 'rect', { x: x + i * w / k, y: 200, width: w / k - 8, height: 110, rx: 10, fill: BR, stroke: BRd, 'stroke-width': 2.5 }); if (i < k - 1) mk(g, 'rect', { x: x + (i + 1) * w / k - 8, y: 220, width: 8, height: 70, fill: '#F2D9B0' }); } cap(g, x + w / 2, 350, n, { fill: C.ink }); return g; });
  return { els: [[R.g, ['B1', 'meet', -0.1], { ...POP, sc: 0.8 }], [nm, ['B1', 'Periplaneta', -0.1], { dy: 10 }], [rl, ['B2', 'millimetres', -0.4], { dy: 12 }], ...K, ...pr.map((g, i) => [g, ['B3', parts[i][3], -0.1], { dy: 16 }])],
    labs: [[lab(s, 1235, 200, 1100, 130, 'Sclerites (hard plates)'), ['B3', 'sclerites']], [lab(s, 1286, 300, 1000, 420, 'Arthrodial membrane (bendy)'), ['B3', 'arthrodial']]] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['WHOLE BODY', 'HEAD', 'MOUTH PARTS'], scales: ['x1', 'x6', 'x20'], ghost: 'NOT IN CURRENT NCERT · IN ISC SYLLABUS',
  info: [['RUNG 1 OF 3', 'Thorax', 'Three parts: pro, meso, meta.', 'Each has a pair of walking legs.'], ['RUNG 2 OF 3', 'The head', 'Triangular, six fused segments.', 'Compound eyes, long antennae.'], ['RUNG 3 OF 3', 'Mouth parts', 'Made for biting and chewing.', 'Hypopharynx works like a tongue.']],
  av: { who: 'Aarav', text: 'Antennae feel the air!', tin: ['Z5', 'tongue', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 160, 60], build: g => { const R = roach(g, 528, 330, 0.95, { wings: false });
      return { labs: [[lab(g, 528 + 50, 330 - 74 * 0.95, 760, 190, 'Prothorax'), ['Z2', 'prothorax']], [lab(g, 528 + 45, 330 - 40 * 0.95, 760, 270, 'Mesothorax'), ['Z2', 'mesothorax']], [lab(g, 528 + 45, 330 - 16 * 0.95, 760, 350, 'Metathorax'), ['Z2', 'metathorax']], [lab(g, 528 - 106, 330 - 28 * 0.95, 260, 230, 'Walking leg', 'end'), ['Z2', 'legs']]],
        anim: t => { const on = t > tm(['Z2', 'walking']); R.legs.forEach(e => attr(e, 'stroke', on ? CB : BRd)); } }; } },
    { at: 'Z3', focus: [528, 400, 70], build: g => {
      [-1, 1].forEach(m => P(g, `M${528 + m * 40},150 C${528 + m * 120},60 ${528 + m * 260},40 ${528 + m * 420},30`, 'none', BRd, 5));
      P(g, 'M300,130 L756,130 L590,450 L466,450 Z', '#8A5530', BRd, 4); [-1, 1].forEach(m => P(g, `M${528 + m * 120},160 C${528 + m * 190},170 ${528 + m * 180},250 ${528 + m * 120},300 C${528 + m * 100},250 ${528 + m * 100},200 ${528 + m * 120},160 Z`, '#2E1E10', '#2E1E10', 2));
      for (let k = 0; k < 5; k++) mk(g, 'line', { x1: 330 + k * 4, y1: 160 + k * 60, x2: 726 - k * 4, y2: 160 + k * 60, stroke: '#6E4220', 'stroke-width': 1.5, 'stroke-dasharray': '6 6' });
      return { labs: [[lab(g, 670, 220, 790, 220, 'Compound eye'), ['Z3', 'compound']], [lab(g, 800, 70, 860, 130, 'Antenna'), ['Z3', 'antennae']], [lab(g, 400, 250, 290, 330, 'Six fused segments', 'end'), ['Z3', 'six']]] }; } },
    { at: 'Z4', build: g => {
      const lb = P(g, 'M440,70 L616,70 L600,140 L456,140 Z', '#C98C5A', BRd, 3);
      const md = [-1, 1].map(m => P(g, `M${528 + m * 40},170 L${528 + m * 150},170 L${528 + m * 140},230 L${528 + m * 120},220 L${528 + m * 110},240 L${528 + m * 90},228 L${528 + m * 70},250 Z`, '#7E4C27', BRd, 3));
      const mx = [-1, 1].map(m => P(g, `M${528 + m * 170},180 L${528 + m * 250},180 L${528 + m * 240},380 L${528 + m * 190},380 Z`, '#B07A4A', BRd, 3));
      const la = P(g, 'M430,330 L626,330 L600,440 L456,440 Z', '#C98C5A', BRd, 3); const hp = P(g, 'M500,250 C500,230 556,230 556,250 L548,310 L508,310 Z', '#E7A89A', BRd, 3);
      return { labs: [[lab(g, 600, 100, 800, 70, 'Labrum · upper lip'), ['Z4', 'labrum']], [lab(g, 660, 210, 820, 160, 'Mandible'), ['Z4', 'mandibles']], [lab(g, 760, 300, 820, 300, 'Maxilla'), ['Z4', 'maxillae']], [lab(g, 600, 420, 800, 470, 'Labium · lower lip'), ['Z4', 'labium']], [lab(g, 508, 280, 240, 260, 'Hypopharynx', 'end'), ['Z5', 'hypopharynx']]],
        anim: t => { const c = Math.sin(t * 6) * 0.5 + 0.5, on = t > tm(['Z4', 'mandibles']); md.forEach((e, m) => attr(e, 'transform', on ? `translate(${((m ? 1 : -1) * 10 * c).toFixed(1)} 0)` : '')); } }; } }] }));

/* ---------- L: wings and abdomen ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'WINGS AND ABDOMEN · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Forewings: tegmina', 'mesothorax · dark, leathery, opaque'], ['Hind wings', 'metathorax · thin, clear · for flying'], ['Abdomen', '10 segments in both sexes'], ['Genital pouch', 'female · sterna 7, 8 and 9'], ['Anal cerci', 'both sexes · anal styles: males only']], LT) }) },
  { pos: 'R', label: 'THE COCKROACH FROM ABOVE', build: (el, s) => {
    const R = roach(s, 360, 340, 1.0, { hw: 1, male: 1 });
    const nums = R.seg.map((e, k) => txt(s, 360, 340 + 2 + k * 15 + 12, String(k + 1), { 'text-anchor': 'middle', 'font-size': 12, fill: '#fff', 'font-weight': 700 }));
    const pc = div(el, 'chp', { left: '560px', top: '420px' }, 'FEMALE: 7 · 8 · 9');
    return { els: [[pc, ['L5', 'seventh', -0.1]]], labs: [[lab(s, 420, 420, 600, 360, 'Hind wing'), ['L3', 'second']], [lab(s, 330, 300, 120, 260, 'Tegmen', 'end'), ['L2', 'tegmina']], [lab(s, 380, 522, 560, 500, 'Anal cerci'), ['L6', 'cerci']]],
      anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
        R.teg.forEach(e => { attr(e, 'fill', c === 0 ? '#B07235' : TEG); e.style.opacity = c >= 2 ? 0.12 : 0.96; });
        const ho = M.io((t - ts[1]) / 0.8) * (c >= 2 ? 1 - M.io((t - ts[2]) / 0.5) : 1); R.hw.style.opacity = (0.85 * ho).toFixed(2); attr(R.hw, 'transform', `rotate(${(-40 * (1 - ho)).toFixed(1)} 8 -34)`);
        nums.forEach((n, k) => n.style.opacity = c >= 2 ? 1 : 0); R.seg.forEach((e, k) => attr(e, 'fill', c === 3 && k >= 6 && k <= 8 ? '#C95A4A' : BR));
        [...R.cer, ...R.sty].forEach(e => attr(e, 'stroke', c === 4 ? CB : BRd)); } }; } }] });

/* ---------- C: digestion ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'DIGESTION · FOLLOW THE FOOD', ghost: true, build: (el, s) => {
  const ch = EP.chain(el, [['MOUTH', ['C2', 'mouth']], ['OESOPHAGUS', ['C2', 'oesophagus']], ['CROP', ['C2', 'crop']], ['GIZZARD', ['C3', 'gizzard']], ['MIDGUT', ['C4', 'midgut']], ['HINDGUT', ['C4', 'hindgut']]]);
  const d = 'M70,280 L180,280 C230,280 250,250 300,250 C380,250 420,300 470,300 L560,300 L900,300 C960,300 980,340 1040,340 L1120,340';
  P(s, 'M70,268 L180,268 L180,292 L70,292 Z', GUT, GUTd, 2); P(s, d, 'none', GUTd, 30); const gut = P(s, d, 'none', GUT, 24);
  const crop = mk(s, 'ellipse', { cx: 330, cy: 270, rx: 90, ry: 52, fill: GUT, stroke: GUTd, 'stroke-width': 3 }); const gz = circ(s, 490, 300, 34, '#D99A86', GUTd, 3);
  const hc = mk(s, 'g', {}); for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * 0.32, [x, y] = pol(560, 300, 70, a + (k < 4 ? 0 : Math.PI)); P(hc, `M560,${k < 4 ? 286 : 314} Q${(560 + x) / 2},${y} ${x},${y}`, 'none', '#E59A7E', 12); }
  const mt = mk(s, 'g', {}); for (let k = 0; k < 14; k++) { const a = (k / 14) * Math.PI * 2; P(mt, `M900,300 C${900 + 60 * Math.cos(a)},${300 + 90 * Math.sin(a)} ${900 + 110 * Math.cos(a + 0.4)},${300 + 120 * Math.sin(a + 0.4)} ${900 + 70 * Math.cos(a + 0.8)},${300 + 130 * Math.sin(a + 0.8)}`, 'none', MAL, 3); }
  const fd = circ(s, 70, 280, 10, '#5A3C28', '#2E2A24', 2);
  // gizzard inset
  const gi = mk(s, 'g', {}); circ(gi, 1350, 300, 120, '#F7DCD3', GUTd, 3); const teeth = mk(gi, 'g', {}); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; P(teeth, `M${1350 + 108 * Math.cos(a - 0.2)},${300 + 108 * Math.sin(a - 0.2)} L${1350 + 30 * Math.cos(a)},${300 + 30 * Math.sin(a)} L${1350 + 108 * Math.cos(a + 0.2)},${300 + 108 * Math.sin(a + 0.2)} Z`, '#6E4220', BRd, 2); }
  cap(gi, 1350, 456, 'GIZZARD · 6 CHITINOUS TEETH', { fill: C.ink });
  return { els: [[hc, ['C4', 'hepatic', -0.2], { ...POP, sc: 0.5 }], [mt, ['C4', 'Malpighian', -0.2], { ...POP, sc: 0.5 }], [gi, ['C3', 'Inside', -0.2], { ...POP, sc: 0.7 }]],
    labs: [[lab(s, 330, 220, 250, 172, 'Crop · stores food'), ['C2', 'crop']], [lab(s, 490, 330, 420, 430, 'Gizzard · grinds'), ['C3', 'gizzard']], [lab(s, 600, 250, 700, 150, 'Hepatic caeca (6 to 8)'), ['C4', 'hepatic']], [lab(s, 960, 360, 700, 460, 'Malpighian tubules'), ['C4', 'Malpighian']], [lab(s, 120, 280, 120, 180, 'Mouth'), ['C2', 'mouth']]],
    anim: t => { ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'mouth']), b = tm(['C4', 'hindgut']) + 1; fd.style.opacity = t > a - 0.2 && t < b + 0.6 ? 1 : 0; flow(gut, fd, (t - a) / (b - a)); attr(crop, 'rx', (90 + 8 * Math.sin(t * 2)).toFixed(1));
      attr(teeth, 'transform', t > tm(['C3', 'grind']) ? `rotate(${(14 * Math.sin((t - tm(['C3', 'grind'])) * 5)).toFixed(1)} 1350 300)` : ''); } }; } }] });

/* ---------- D: breathing and blood ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'BREATHING · TRACHEAE', pill: ['Air goes straight to the cells', ['D2', 'straight', -0.1], 'ac'], build: (el, s) => {
    P(s, 'M392,90 C300,90 260,150 260,240 C260,340 300,440 392,460 C484,440 524,340 524,240 C524,150 484,90 392,90 Z', '#F3E3D3', BRd, 3);
    const tr = mk(s, 'g', {}), sp = [], paths = []; P(tr, 'M330,110 L330,440 M454,110 L454,440', 'none', '#7FA3B8', 5);
    for (let k = 0; k < 10; k++) { const y = 120 + k * 32; [-1, 1].forEach(m => { const xe = 392 + m * (130 - Math.abs(k - 4.5) * 4) - (m > 0 ? 0 : 0), xi = 392 + m * 62; paths.push(P(tr, `M${xe},${y} L${xi},${y} M${xi},${y} l${m * -30},14`, 'none', '#9DBFD0', 2.5)); sp.push(circ(s, xe, y, 6, '#2E2A24', 'none', 0)); }); }
    const air = []; for (let k = 0; k < 8; k++) air.push(circ(s, 0, 0, 5, '#fff', AIR, 2));
    return { els: [[tr, ['D2', 'tracheae', -0.1], { dy: 0, fade: 0.4 }], ...sp.map((e, i) => [e, ['D2', 'ten', -0.1 + i * 0.03], { ...POP, sc: 0.2 }])], labs: [[lab(s, 392 + 112, 120 + 4 * 32, 640, 200, 'Spiracle'), ['D2', 'spiracles']], [lab(s, 454, 380, 640, 400, 'Trachea'), ['D2', 'tracheae']]],
      anim: t => { const on = t > tm(['D2', 'Air']) - 0.4; air.forEach((e, k) => { const v = (t * 0.5 + k / 8) % 1, y = 120 + (k % 5) * 64, m = k % 2 ? 1 : -1; attr(e, 'cx', (392 + m * (128 - 100 * v)).toFixed(1)); attr(e, 'cy', y); e.style.opacity = on ? Math.min(1, 5 * v, 5 * (1 - v)) : 0; }); } }; } },
  { pos: 'R', label: 'BLOOD · AN OPEN SYSTEM', tin: ['D3', null, -0.2], pill: ['Haemolymph is colourless', ['D3', 'colourless', -0.1], 'ac'], build: (el, s) => {
    P(s, 'M60,300 C60,180 200,120 392,120 C584,120 724,180 724,300 C724,400 584,440 392,440 C200,440 60,400 60,300 Z', '#FBF6EE', BRd, 3);
    const ht = mk(s, 'g', {}); for (let k = 0; k < 13; k++) { mk(ht, 'rect', { x: 130 + k * 40, y: 150, width: 36, height: 30, rx: 8, fill: '#E8A398', stroke: '#B5655A', 'stroke-width': 2 }); if (k % 2 === 0) { circ(ht, 148 + k * 40, 148, 4, '#fff', '#B5655A', 1.5); circ(ht, 148 + k * 40, 182, 4, '#fff', '#B5655A', 1.5); } }
    const hl = []; for (let k = 0; k < 22; k++) hl.push(circ(s, 0, 0, 6, HL, HLd, 1.5)); const org = mk(s, 'g', {}); P(org, 'M150,300 C250,260 500,260 640,300 C500,340 250,340 150,300 Z', GUT, GUTd, 2.5); cap(s, 392, 390, 'ORGANS BATHED IN HAEMOLYMPH', { fill: C.ink });
    return { els: [[ht, ['D4', 'heart', -0.1], { dy: -12 }]], labs: [[lab(s, 660, 300, 680, 250, 'Haemocoel'), ['D3', 'haemocoel']], [lab(s, 400, 165, 540, 90, 'Tube heart'), ['D4', 'heart']], [lab(s, 148, 148, 90, 90, 'Ostia'), ['D4', 'ostia']]],
      anim: t => { hl.forEach((e, k) => { const a = (t * 0.25 + k / 22) * Math.PI * 2, r = 0.78 + 0.12 * Math.sin(k); attr(e, 'cx', (392 + 300 * r * Math.cos(a)).toFixed(1)); attr(e, 'cy', (300 + 120 * r * Math.sin(a)).toFixed(1)); e.style.opacity = t > tm(['D3', 'haemolymph']) - 0.3 ? 0.9 : 0; });
        attr(ht, 'transform', `translate(0 ${(2 * Math.sin(t * 6)).toFixed(1)})`); } }; } }] });

/* ---------- U: excretion, nerves + think ---------- */
const TH = { q: "Which removes waste from a cockroach's blood?", opts: ['The gizzard', 'Malpighian tubules'], right: 1, why: 'The Malpighian tubules. The gizzard only grinds food.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'EXCRETION · URICOTELIC', tout: 'U4', pill: ['Uric acid out: uricotelic', ['U1', 'uricotelic', -0.1], 'ac'], build: (el, s) => {
    P(s, 'M60,250 L724,250', 'none', GUTd, 34); const g = P(s, 'M60,250 L724,250', 'none', GUT, 28); const T = []; for (let k = 0; k < 10; k++) { const m = k % 2 ? 1 : -1, x0 = 392 + (k - 4.5) * 8; T.push(P(s, `M${x0},${250 + m * 14} C${x0 + (k - 4.5) * 40},${250 + m * 90} ${x0 + (k - 4.5) * 60},${250 + m * 150} ${x0 + (k - 4.5) * 30},${250 + m * 190}`, 'none', MAL, 5)); }
    const w = []; for (let k = 0; k < 6; k++) w.push(circ(s, 0, 0, 5, '#fff', MALd, 2)); cap(s, 392, 470, 'TUBULES TAKE WASTE FROM THE HAEMOLYMPH', { fill: C.ink });
    return { labs: [[lab(s, 525, 62, 748, 130, 'Malpighian tubule', 'end'), ['U1', 'Malpighian']]], anim: t => w.forEach((e, k) => { flow(T[k], e, 1 - ((t * 0.4 + k / 6) % 1)); }) }; } },
  { pos: 'R', label: 'NERVES · A CHAIN OF GANGLIA', tin: ['U2', null, -0.2], tout: 'U4', build: (el, s) => {
    P(s, 'M110,250 L690,250', 'none', NV, 4); const gs = []; circ(s, 100, 250, 26, '#D9CCF0', NV, 3); [0, 1, 2].forEach(k => gs.push(circ(s, 180 + k * 70, 250, 16, '#D9CCF0', NV, 3))); for (let k = 0; k < 6; k++) gs.push(circ(s, 420 + k * 50, 250, 11, '#D9CCF0', NV, 3));
    cap(s, 250, 312, 'THORAX · 3', { fill: NV }); cap(s, 545, 312, 'ABDOMEN · 6', { fill: NV });
    const om = mk(s, 'g', {}); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 90 + c * 30 + (r % 2) * 15, y = 380 + r * 26; P(om, `M${x},${y - 15} l13,7.5 l0,15 l-13,7.5 l-13,-7.5 l0,-15 Z`, '#3A3A48', '#8C8CA8', 1.5); }
    const c1 = div(el, 'chp', { left: '300px', top: '388px' }, 'About 2000 ommatidia: mosaic vision'), c2 = div(el, 'chp', { left: '300px', top: '448px' }, 'Headless: lives up to a week');
    return { els: [[om, ['U3', 'ommatidia', -0.3], { ...POP, sc: 0.7 }], [c1, ['U3', 'ommatidia', -0.1]], [c2, ['U3', 'headless', -0.1]]], labs: [[lab(s, 100, 224, 100, 130, 'Brain · supra-oesophageal ganglion'), ['U2', 'brain']]],
      anim: t => { const t0 = tm(['U2', 'Three']), t1 = tm(['U2', 'six']); gs.forEach((e, k) => attr(e, 'fill', (k < 3 ? t > t0 : t > t1) ? '#B9A3E8' : '#D9CCF0')); } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'gizzard', -0.1], why: ['U5', 'gizzard'] })] });

/* ---------- W: life cycle ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · EGG TO ADULT', ghost: true, svg: false, build: el => EP.cols(el, [
  ['STEP 1 · ADULTS', 'Separate sexes', 'TESTES · OVARIES OF 8 OVARIOLES', s => { const a = roach(s, 150, 160, 0.42, { male: 1 }), b = roach(s, 346, 160, 0.42); txt(s, 150, 280, 'MALE', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, 'letter-spacing': 1 }); txt(s, 346, 280, 'FEMALE', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, 'letter-spacing': 1 }); }, ['W2', 'sexes', -0.2], ['W2', 'testes', -0.1], ['W2', 'ovarioles']],
  ['STEP 2 · THE OOTHECA', 'Ootheca', '9 TO 10 PER FEMALE · 14 TO 16 EGGS', s => { P(s, 'M110,170 C110,110 386,110 386,170 C386,230 110,230 110,170 Z', '#6E4220', BRd, 3); P(s, 'M120,118 L376,118', 'none', '#9A6236', 6); for (let k = 0; k < 8; k++) [-1, 1].forEach(m => mk(s, 'ellipse', { cx: 140 + k * 31, cy: 170 + m * 22, rx: 12, ry: 18, fill: '#F3E3B5', opacity: 0.9 })); txt(s, 248, 270, 'EGG CAPSULE · DARK BROWN', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, 'letter-spacing': 1 }); }, ['W3', 'Fertilised', -0.2], ['W3', 'ootheca', -0.1], ['W3', 'fourteen']],
  ['STEP 3 · NYMPHS', 'Nymph, about 13 moults', 'PAUROMETABOLOUS · ONLY ADULTS HAVE WINGS', s => { roach(s, 80, 180, 0.2, { wings: false }); roach(s, 200, 175, 0.3, { wings: false }); roach(s, 360, 160, 0.44); [[115, 180], [250, 175]].forEach(([x, y]) => P(s, `M${x},${y} l30,0 m-8,-7 l8,7 l-8,7`, 'none', CB, 3)); }, ['W4', 'nymph', -0.2], ['W4', 'moults', -0.1], ['W5', 'paurometabolous']]]) }] });

EP.run({
  icons: { moon: ['M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10Z'], bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z'], run: ['M4 17h4l3-5 3 3 2-6', 'M14 5a2 2 0 1 0 0.1 0', 'M17 20l2-4'] },
  jobs: [['moon', 'A dark kitchen', 'AT NIGHT', ['H1', 'dark']], ['bulb', 'A light flicks on', 'SUDDENLY', ['H1', 'light']], ['run', 'A cockroach dashes', 'UNDER THE SHELF', ['H1', 'cockroach']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Forewings</span> are tegmina. Hind wings fly.', f: '<span class="lad">tegmina: <b>mesothorax</b> · hind wings: <b>metathorax</b></span>', t2: ['T1', 'Forewings', -0.2], tf: ['T1', 'Hind', -0.1] },
  trap: { wrong: "A cockroach's blood flows in closed tubes", right: 'Open system: haemolymph bathes the organs', tWrong: ['X2', 'blood', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'open', -0.3], tSvg: ['X3', 'haemocoel', -0.4],
    build: s => { P(s, 'M40,140 C40,80 120,50 230,50 C340,50 420,80 420,140 C420,200 340,230 230,230 C120,230 40,200 40,140 Z', '#FBF6EE', BRd, 2.5); for (let k = 0; k < 8; k++) mk(s, 'rect', { x: 90 + k * 36, y: 66, width: 32, height: 18, rx: 6, fill: '#E8A398', stroke: '#B5655A', 'stroke-width': 1.5 }); P(s, 'M110,150 C170,125 290,125 350,150 C290,175 170,175 110,150 Z', GUT, GUTd, 2); for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; circ(s, 230 + 160 * Math.cos(a), 140 + 66 * Math.sin(a), 5, HL, HLd, 1.5); } cap(s, 230, 260, 'NO CLOSED VESSELS · HAEMOCOEL', { 'font-size': 14 }); } },
  where: { type: 'Statement or match questions: mouth parts, wings, Malpighian tubules, ootheca', at: ['E1', 'statement'] },
  mcq: { q: 'Match List I with List II.<div class="mt"><div><span class="h">LIST I</span><br><b>1</b>Tegmina<br><b>2</b>Gizzard<br><b>3</b>Malpighian tubules<br><b>4</b>Ootheca</div><div><span class="h">LIST II</span><br><b>p</b>Grinds food<br><b>q</b>Forewings<br><b>r</b>Egg capsule<br><b>s</b>Remove waste</div></div>',
    opts: ['1-q, 2-p, 3-s, 4-r', '1-p, 2-q, 3-r, 4-s', '1-q, 2-s, 3-p, 4-r', '1-r, 2-p, 3-s, 4-q'], right: 0 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b>', ['A1', 3, 0.1]], ['1-q: tegmina are forewings', ['A2', 'Tegmina']], ['2-p: the gizzard grinds food', ['A2', 'gizzard']], ['3-s: tubules remove waste', ['A3', 'Malpighian']], ['4-r: ootheca, the egg capsule', ['A3', 'ootheca']]],
  recap: { title: 'Recap · cockroach', lines: ['<b>Body</b>: head, thorax, abdomen · chitin plates (sclerites)', '<b>Mouth parts</b>: labrum, mandibles, maxillae, labium, hypopharynx', '<b>Wings</b>: tegmina (mesothorax) · hind wings fly (metathorax)', '<b>Gut</b>: crop stores · gizzard grinds · hepatic caeca', '<b>Open blood</b> · 10 pairs of spiracles · uricotelic · ootheca'] },
  yq: ['How many pairs of spiracles does a cockroach have?', 'What does the gizzard do?', 'What is an ootheca?'],
  next: { label: 'NEXT · EP 60', topic: 'Next: Cell - The Unit of Life' }
});
})();
