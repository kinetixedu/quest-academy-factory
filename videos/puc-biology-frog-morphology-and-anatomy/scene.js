// PUC Biology Ep 58: Frog - Morphology and Anatomy (Living diagram, leaf green). Runner: ep.js
(() => {
const { C, mk, txt, cap, POP, lab, pol, tm, div, mix, attr } = EP;
const FG = '#79B35E', FGd = '#3F6B32', FGs = '#5E8F47', BEL = '#E8EBC4', RED = '#C0392B', RBC = '#D9534F', WAT = '#BFDDEB', WATd = '#3A7FB0', LIV = '#9E5A3C', GB = '#7DAA4E', PAN = '#F2D69B', GUT = '#F2B8A8', GUTd = '#B5655A', LUNG = '#F4A9B8', CB = C.ac;
const circ = (g, x, y, r, f, s = '#2E2A24', w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
const P = (g, d, f, s = '#2E2A24', w = 3, a = {}) => mk(g, 'path', Object.assign({ d, fill: f, stroke: s, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, a));
// frog seen from above, head up, centred at 0,0 (about 300 x 420 at s=1). returns parts
const frog = (p, cx, cy, s = 1, o = {}) => { const og = mk(p, 'g', {}), g = mk(og, 'g', { transform: `translate(${cx} ${cy}) scale(${s})` }), col = o.col || FG, dk = o.dk || FGd, R = { g: og, inner: g, limbs: [], web: [], digF: [], digH: [] };
  [-1, 1].forEach(m => { // hind limb + webbed foot
    const hl = P(g, `M${m * 45},95 C${m * 120},60 ${m * 150},120 ${m * 110},160 C${m * 90},180 ${m * 70},175 ${m * 70},175`, 'none', dk, 30); const hi = P(g, `M${m * 45},95 C${m * 120},60 ${m * 150},120 ${m * 110},160 C${m * 90},180 ${m * 70},175 ${m * 70},175`, 'none', col, 24); R.limbs.push(hl);
    const fx = m * 70, fy = 178, tips = [-50, -25, 0, 25, 50].map(a => [fx + m * 6 + 46 * Math.sin((a + m * 10) * Math.PI / 180), fy + 46 * Math.cos((a + m * 10) * Math.PI / 180)]);
    R.web.push(P(g, `M${fx},${fy} ` + tips.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(' ') + ' Z', '#A8D08F', dk, 1.5, { opacity: 0.9 }));
    tips.forEach(([x, y]) => { R.digH.push(P(g, `M${fx},${fy} L${x.toFixed(1)},${y.toFixed(1)}`, 'none', dk, 5)); circ(g, x, y, 4, col, dk, 1.5); });
    // forelimb
    const fl = P(g, `M${m * 52},-28 C${m * 95},-10 ${m * 100},25 ${m * 88},52`, 'none', dk, 20); P(g, `M${m * 52},-28 C${m * 95},-10 ${m * 100},25 ${m * 88},52`, 'none', col, 14); R.limbs.push(fl);
    [-35, -10, 15, 40].forEach(a => { const x = m * 88 + 22 * Math.sin((a + m * 5) * Math.PI / 180), y = 52 + 22 * Math.cos((a + m * 5) * Math.PI / 180); R.digF.push(P(g, `M${m * 88},52 L${x.toFixed(1)},${y.toFixed(1)}`, 'none', dk, 5)); circ(g, x, y, 3.5, col, dk, 1.2); });
  });
  R.body = mk(g, 'ellipse', { cx: 0, cy: 25, rx: 72, ry: 96, fill: col, stroke: dk, 'stroke-width': 3 });
  R.head = mk(g, 'path', { d: 'M-66,-40 C-70,-95 -35,-130 0,-132 C35,-130 70,-95 66,-40 Z', fill: col, stroke: dk, 'stroke-width': 3 });
  [[-28, 10], [24, 40], [-10, 70], [30, -5], [-40, 55]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 10, ry: 7, fill: dk, opacity: 0.45 }));
  [-1, 1].forEach(m => { circ(g, m * 34, -88, 15, col, dk, 3); circ(g, m * 34, -90, 8, '#1E2A1A', 'none', 0); circ(g, m * 31, -93, 2.5, '#fff', 'none', 0); circ(g, m * 54, -58, 10, '#C9B78A', dk, 2); circ(g, m * 9, -120, 2.5, '#1E2A1A', 'none', 0); });
  if (o.sac) { R.sac = [-1, 1].map(m => mk(g, 'ellipse', { cx: m * 58, cy: -50, rx: 0, ry: 0, fill: '#E9F1D9', stroke: dk, 'stroke-width': 2 })); }
  if (o.pad) [-1, 1].forEach(m => mk(g, 'ellipse', { cx: m * 92, cy: 52, rx: 8, ry: 6, fill: '#5A3C28' }));
  return R; };
const flow = (path, dot, v) => { const L = path.getTotalLength(), q = path.getPointAtLength(L * M.clamp(v)); attr(dot, 'cx', q.x.toFixed(1)); attr(dot, 'cy', q.y.toFixed(1)); };

const S = [];
/* ---------- H: pond at night ---------- */
S.push(EP.hook({ label: 'A POND AT NIGHT', face: 'diya', pill: ['Male frogs croak with vocal sacs', ['H2', 'male', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['Does a frog drink water?', ['H3', 'drink']], ['What lets it live in water and on land?', ['H3', 'inside']]],
  a: [['ANSWER 1', 'Morphology · its outer form', ['H4', 'Morphology']], ['ANSWER 2', 'Anatomy · its inner organs', ['H4', 'anatomy']]],
  chips: [['Skin', ['H5', 'skin']], ['Limbs', ['H5', 'limbs']], ['Sense organs', ['H5', 'sense']], ['Digestion', ['H5', 'digestion']], ['Breathing', ['H5', 'breathing']], ['Heart', ['H5', 'heart']], ['Brain', ['H5', 'brain']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#22314A' }); circ(s, 640, 150, 34, '#F6F0D2', 'none', 0); for (let k = 0; k < 12; k++) circ(s, 40 + (k * 137) % 720, 100 + (k * 53) % 140, 2, '#E8E6D8', 'none', 0);
    P(s, 'M0,330 C200,300 600,300 784,330 L784,580 L0,580 Z', '#2E5B6E', 'none', 0); const rip = []; for (let k = 0; k < 3; k++) rip.push(mk(s, 'ellipse', { cx: 390, cy: 420, rx: 160, ry: 30, fill: 'none', stroke: '#8FC1D6', 'stroke-width': 2 }));
    mk(s, 'ellipse', { cx: 390, cy: 420, rx: 190, ry: 58, fill: '#4F8A3C', stroke: '#2E5A24', 'stroke-width': 3 }); P(s, 'M390,420 L560,400', 'none', '#2E5A24', 3);
    const F = frog(s, 390, 380, 0.62, { sac: 1 });
    return { els: [[F.g, ['H1', 'green', -0.1], { ...POP, sc: 0.8 }]], anim: t => { const t0 = tm(['H1', 'croaking']); const p = t > t0 ? Math.max(0, Math.sin((t - t0) * 4)) : 0; F.sac.forEach(e => { attr(e, 'rx', (16 * p).toFixed(1)); attr(e, 'ry', (14 * p).toFixed(1)); });
      rip.forEach((e, k) => { const v = ((t - t0) * 0.5 + k / 3) % 1; attr(e, 'rx', (190 + 160 * v).toFixed(1)); attr(e, 'ry', (58 + 40 * v).toFixed(1)); e.style.opacity = t > t0 ? (1 - v).toFixed(2) : 0; }); } };
  } }));

/* ---------- B: meet the frog ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'MEET THE FROG', build: (el, s) => {
  const F = frog(s, 230, 280, 0.82); const nm = div(el, '', { position: 'absolute', left: '60px', top: '486px', width: '340px', textAlign: 'center', font: 'italic 700 30px Manrope', color: C.ink }, 'Rana tigrina');
  // thermometers: air and frog rise together
  const tg = mk(s, 'g', {}); const th = []; [[560, 'AIR'], [690, 'FROG']].forEach(([x, n]) => { mk(tg, 'rect', { x: x - 18, y: 110, width: 36, height: 260, rx: 18, fill: '#fff', stroke: '#2E2A24', 'stroke-width': 3 }); circ(tg, x, 390, 30, RED, '#2E2A24', 3); th.push(mk(tg, 'rect', { x: x - 9, y: 300, width: 18, height: 80, fill: RED })); cap(tg, x, 446, n, { fill: C.ink }); });
  const cb = div(el, 'chp', { left: '480px', top: '486px', width: '320px', justifyContent: 'center' }, 'COLD-BLOODED · POIKILOTHERM');
  // camouflage panel
  const bg = mk(s, 'rect', { x: 900, y: 100, width: 640, height: 250, rx: 16, fill: '#8C7A4E' }); for (let k = 0; k < 14; k++) mk(s, 'ellipse', { cx: 930 + (k * 97) % 600, cy: 120 + (k * 61) % 210, rx: 26, ry: 12, fill: '#6E5E38', opacity: 0.7 });
  const cf = frog(s, 1220, 230, 0.42); const cfParts = [cf.body, cf.head];
  cap(s, 1220, 384, 'CAMOUFLAGE · CHANGES COLOUR TO HIDE', { fill: C.ink });
  const ae = div(el, 'chp', { left: '900px', top: '420px', width: '310px', justifyContent: 'center' }, '☀ Summer sleep: aestivation'), hi = div(el, 'chp', { left: '1230px', top: '420px', width: '310px', justifyContent: 'center' }, '❄ Winter sleep: hibernation');
  const bur = div(el, '', { position: 'absolute', left: '900px', top: '486px', width: '640px', textAlign: 'center', font: '500 20px Manrope', color: C.mute }, 'Both in deep burrows');
  return { els: [[F.g, ['B1', 'meet', -0.1], { ...POP, sc: 0.8 }], [nm, ['B1', 'Rana', -0.1], { dy: 10 }], [tg, ['B2', 'cold', -0.2], { dy: 16 }], [cb, ['B2', 'poikilotherms', -0.1]], [bg, ['B3', 'change', -0.3], { dy: 0, fade: 0.3 }], [cf.g, ['B3', 'change', -0.2], { ...POP, sc: 0.8 }], [ae, ['B3', 'aestivation', -0.1]], [hi, ['B3', 'hibernation', -0.1]], [bur, ['B3', 'burrows', -0.1]]],
    anim: t => { const h = 80 + 120 * (0.5 + 0.5 * Math.sin((t - tm('B2')) * 1.2)); th.forEach(r => { attr(r, 'y', (380 - h).toFixed(1)); attr(r, 'height', h.toFixed(1)); });
      const k = M.io((t - tm(['B3', 'camouflage'])) / 1.4); cfParts.forEach(e => attr(e, 'fill', mix(FG, '#8C7A4E', 0.8 * k))); } }; } }] });

/* ---------- Z: zoom ladder into the frog ---------- */
let nm = null;
S.push(EP.zoom({ to: 'L1', names: ['WHOLE FROG', 'HEAD', 'SKIN'], scales: ['x1', 'x4', 'x200'],
  info: [['RUNG 1 OF 3', 'Head + trunk', 'The body has two parts.', 'No neck and no tail.'], ['RUNG 2 OF 3', 'The head', 'Nostrils, bulging eyes, tympanum.', 'A membrane guards the eyes in water.'], ['RUNG 3 OF 3', 'The skin', 'Smooth, slippery, always moist.', 'Water comes in through the skin.']],
  av: { who: 'Diya', text: 'It never drinks water!', tin: ['Z5', 'never', 0.4], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 160, 70], build: g => { frog(g, 528, 290, 0.95);
      return { labs: [[lab(g, 528, 190, 760, 120, 'Head'), ['Z2', 'head']], [lab(g, 528, 330, 760, 330, 'Trunk'), ['Z2', 'trunk']], [lab(g, 528, 165, 300, 80, 'No neck'), ['Z2', 'neck']]] }; } },
    { at: 'Z3', focus: [528, 420, 60], build: g => {
      P(g, 'M180,470 C150,230 330,60 528,56 C726,60 906,230 876,470 Z', FG, FGd, 4); P(g, 'M220,420 C400,470 656,470 836,420', 'none', FGd, 4);
      const eyes = [-1, 1].map(m => { const x = 528 + m * 150; circ(g, x, 190, 64, FG, FGd, 4); circ(g, x, 186, 36, '#1E2A1A', 'none', 0); circ(g, x - 12, 174, 9, '#fff', 'none', 0); return x; });
      nm = eyes.map(x => { const c = mk(g, 'clipPath', { id: 'nmc' + x }); circ(c, x, 190, 62, '#fff', 'none', 0); return mk(g, 'rect', { x: x - 64, y: 126, width: 128, height: 0, fill: '#CFE4EE', opacity: 0.8, 'clip-path': `url(#nmc${x})` }); });
      [-1, 1].forEach(m => { circ(g, 528 + m * 30, 100, 8, '#1E2A1A', 'none', 0); circ(g, 528 + m * 290, 290, 46, '#C9B78A', FGd, 4); circ(g, 528 + m * 290, 290, 30, 'none', '#A8956A', 2); });
      return { labs: [[lab(g, 498, 100, 300, 60, 'Nostrils'), ['Z3', 'nostrils']], [lab(g, 678, 150, 870, 70, 'Bulging eye'), ['Z3', 'eyes']], [lab(g, 378, 230, 40, 26, 'Nictitating membrane'), ['Z3', 'nictitating']], [lab(g, 818, 290, 900, 420, 'Tympanum'), ['Z4', 'tympanum']]],
        anim: t => { const k = M.clamp((t - tm(['Z3', 'nictitating'])) / 0.6) * (0.6 + 0.4 * Math.sin(t * 2)); nm.forEach(r => attr(r, 'height', (128 * k).toFixed(1))); } }; } },
    { at: 'Z5', build: g => {
      mk(g, 'rect', { x: 60, y: 60, width: 940, height: 130, fill: WAT }); txt(g, 90, 100, 'WATER AROUND', { fill: WATd, 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600 });
      P(g, 'M60,200 C260,186 460,214 660,198 C820,186 920,206 1000,200 L1000,470 L60,470 Z', '#9CC97F', FGd, 3); P(g, 'M60,190 C260,176 460,204 660,188 C820,176 920,196 1000,190 L1000,206 C900,212 800,196 660,206 C460,222 260,194 60,208 Z', '#E7F2F7', '#7FB4CC', 2);
      for (let k = 0; k < 5; k++) { const x = 140 + k * 190; P(g, `M${x - 30},300 C${x - 34},250 ${x - 10},214 ${x - 6},204 L${x + 6},204 C${x + 10},214 ${x + 34},250 ${x + 30},300 C${x + 20},330 ${x - 20},330 ${x - 30},300 Z`, '#CFE8BE', FGd, 2.5); }
      const dr = []; for (let k = 0; k < 6; k++) dr.push(mk(g, 'path', { d: 'M0,-10 C6,-2 8,4 0,8 C-8,4 -6,-2 0,-10 Z', fill: '#5BA6D0' }));
      return { labs: [[lab(g, 330, 196, 380, 130, 'Mucus layer'), ['Z5', 'mucus']], [lab(g, 710, 260, 760, 130, 'Moist skin'), ['Z5', 'moist']], [lab(g, 140, 270, 220, 420, 'Mucus gland'), ['Z5', 'mucus']]],
        anim: t => { const on = t > tm(['Z5', 'absorbs']) - 0.3; dr.forEach((e, k) => { const v = (t * 0.45 + k / 6) % 1; attr(e, 'transform', `translate(${235 + k * 130} ${(120 + 240 * v).toFixed(1)})`); e.style.opacity = on ? Math.min(1, 5 * v, 4 * (1 - v)) : 0; }); } }; } }] }));

/* ---------- L: limbs and sexes ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'LIMBS AND SEXES · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Four limbs', 'swim, walk, leap and burrow'], ['Digits', 'forelimb: 4 · hind limb: 5, bigger'], ['Webbed hind feet', 'skin between digits · for swimming'], ['Sexual dimorphism', 'male and female look different'], ['Male only', 'vocal sacs · copulatory pad']], LT) }) },
  { pos: 'R', label: 'THE FROG FROM ABOVE', build: (el, s) => {
    const F = frog(s, 250, 300, 1.08);
    const b4 = div(el, 'chp', { left: '28px', top: '330px', background: '#E3F1E7', color: '#1F6B3F', borderColor: CB }, '4 DIGITS'), b5 = div(el, 'chp', { left: '320px', top: '520px', background: '#E3F1E7', color: '#1F6B3F', borderColor: CB }, '5 DIGITS · WEBBED');
    const mg = mk(s, 'g', {}); mk(mg, 'rect', { x: 500, y: 76, width: 260, height: 470, rx: 14, fill: '#FAF8F5', stroke: '#E6E2DA', 'stroke-width': 2 });
    const Fm = frog(mg, 630, 190, 0.38, { sac: 1, pad: 1 }); Fm.sac.forEach(e => { attr(e, 'rx', 16); attr(e, 'ry', 14); }); cap(mg, 630, 296, 'MALE', { fill: C.ink }); cap(mg, 630, 318, 'VOCAL SACS · PAD', { fill: CB, 'font-size': 13 });
    frog(mg, 630, 420, 0.38); cap(mg, 630, 528, 'FEMALE · NEITHER', { fill: C.ink });
    return { els: [[b4, ['L3', 'four', -0.1]], [b5, ['L3', 'five', -0.1]], [mg, ['L5', 'Frogs', -0.1], { dx: 30, dy: 0 }]],
      anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
        F.limbs.forEach(e => attr(e, 'stroke', c === 0 ? '#1F8A4C' : FGd)); F.web.forEach(e => attr(e, 'fill', c === 2 ? '#5FC27E' : '#A8D08F')); [...F.digF, ...F.digH].forEach(e => attr(e, 'stroke', c === 1 ? '#1F8A4C' : FGd));
        attr(F.inner, 'transform', `translate(${c >= 3 ? 250 - 20 * M.io((t - ts[3]) / 0.6) : 250} 300) scale(${(1.08 - (c >= 3 ? 0.12 * M.io((t - ts[3]) / 0.6) : 0)).toFixed(3)})`); } }; } }] });

/* ---------- C: digestion ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'DIGESTION · FOLLOW A MEAL', pill: ['Short gut: frogs are carnivores', ['C4', 'short', -0.1], 'ac'], build: (el, s) => {
  const ch = EP.chain(el, [['MOUTH', ['C2', 'mouth']], ['BUCCAL CAVITY', ['C2', 'buccal']], ['PHARYNX', ['C2', 'pharynx']], ['OESOPHAGUS', ['C2', 'oesophagus']], ['STOMACH', ['C2', 'stomach']], ['INTESTINE', ['C3', 'intestine']], ['CLOACA', ['C4', 'cloaca']]]);
  // body outline, belly view
  P(s, 'M330,130 C250,130 210,190 215,260 C220,330 220,420 260,470 C300,505 360,505 400,470 C440,420 440,330 445,260 C450,190 410,130 330,130 Z', BEL, FGd, 3);
  const gut = P(s, 'M330,140 L330,210 C330,240 300,250 290,280 C280,320 330,340 360,320 C390,300 400,350 370,370 C340,390 290,380 300,410 C310,440 360,430 350,460 L330,490', 'none', GUT, 22); const gl = P(s, gut.getAttribute('d'), 'none', GUTd, 2, { 'stroke-dasharray': '2 8' });
  P(s, 'M290,280 C270,240 300,215 335,220 C370,226 380,262 360,290 C340,318 300,310 290,280 Z', GUT, GUTd, 3);
  const lv = mk(s, 'g', {}); P(lv, 'M230,215 C240,190 300,195 320,225 C300,260 250,262 232,245 Z', LIV, '#6E3A22', 2.5); P(lv, 'M430,215 C420,190 360,195 340,225 C360,262 410,262 428,245 Z', LIV, '#6E3A22', 2.5); circ(lv, 352, 252, 11, GB, '#4E7A2C', 2); P(lv, 'M300,330 C320,322 340,326 352,336 C340,346 318,346 300,340 Z', PAN, '#B9963F', 2);
  const fd = circ(s, 330, 140, 11, '#5A3C28', '#2E2A24', 2);
  // tongue panel
  const tp = mk(s, 'g', {}); mk(tp, 'rect', { x: 880, y: 140, width: 660, height: 300, rx: 16, fill: '#EEF3F6' }); P(tp, 'M940,400 C940,300 1000,240 1080,240 C1140,240 1170,280 1170,330 L1170,400 Z', FG, FGd, 3); circ(tp, 1090, 262, 18, FG, FGd, 3); circ(tp, 1094, 260, 8, '#1E2A1A', 'none', 0);
  const tg = P(tp, 'M1168,320 L1168,320', 'none', '#E57A8A', 12); const tip = mk(tp, 'g', {}); P(tip, 'M0,0 l20,-14 M0,0 l20,14', 'none', '#E57A8A', 10);
  const fly = mk(tp, 'g', {}); mk(fly, 'ellipse', { cx: 0, cy: 0, rx: 12, ry: 8, fill: '#2E2A24' }); mk(fly, 'ellipse', { cx: -4, cy: -10, rx: 9, ry: 6, fill: '#CFE4EE', stroke: '#7FA3B8', 'stroke-width': 1.5 }); mk(fly, 'ellipse', { cx: 6, cy: -10, rx: 9, ry: 6, fill: '#CFE4EE', stroke: '#7FA3B8', 'stroke-width': 1.5 });
  cap(tp, 1210, 420, 'BILOBED TONGUE · SPLIT AT THE TIP', { fill: C.ink });
  return { els: [[tp, ['C2', 'tongue', -0.3], { dx: 30, dy: 0 }], [lv, ['C3', 'liver', -0.2], { ...POP, sc: 0.8 }]],
    labs: [[lab(s, 330, 175, 560, 160, 'Oesophagus'), ['C2', 'oesophagus']], [lab(s, 360, 280, 560, 240, 'Stomach'), ['C2', 'stomach']], [lab(s, 230, 225, 110, 200, 'Liver', 'end'), ['C3', 'liver']], [lab(s, 352, 252, 560, 320, 'Gall bladder'), ['C3', 'gall']], [lab(s, 305, 336, 110, 340, 'Pancreas', 'end'), ['C3', 'pancreas']], [lab(s, 370, 400, 560, 400, 'Intestine'), ['C3', 'intestine']], [lab(s, 330, 490, 560, 480, 'Cloaca'), ['C4', 'cloaca']]],
    anim: t => { const ch0 = ch.run(t, tm('C1') + 0.3); const a = tm(['C2', 'mouth']), b = tm(['C4', 'cloaca']); fd.style.opacity = t > a - 0.2 && t < b + 0.8 ? 1 : 0; flow(gut, fd, (t - a) / (b - a));
      const tc = tm(['C2', 'catches']), k = M.clamp((t - tc + 0.6) / 0.35) * (1 - M.clamp((t - tc - 0.1) / 0.4)), L = 300 * k; attr(tg, 'd', `M1168,320 L${(1168 + L).toFixed(1)},${(320 - 0.25 * L).toFixed(1)}`); attr(tip, 'transform', `translate(${(1168 + L).toFixed(1)} ${(320 - 0.25 * L).toFixed(1)})`); tip.style.opacity = k > 0.05 ? 1 : 0;
      const caught = t > tc; const fx = caught ? 1168 + L : 1470 + 20 * Math.sin(t * 5), fy = caught ? 320 - 0.25 * L : 245 + 12 * Math.cos(t * 7); attr(fly, 'transform', `translate(${fx.toFixed(1)} ${fy.toFixed(1)})`); fly.style.opacity = caught && k < 0.1 ? 0 : 1; } }; } }] });

/* ---------- D: breathing ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'IN WATER · THROUGH THE SKIN', pill: ['Cutaneous respiration', ['D2', 'cutaneous', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 30, y: 80, width: 724, height: 380, rx: 14, fill: WAT }); const F = frog(s, 392, 290, 0.62);
    const ox = []; for (let k = 0; k < 8; k++) ox.push(circ(s, 0, 0, 9, '#fff', WATd, 2.5)); cap(s, 392, 446, 'OXYGEN PASSES THROUGH WET SKIN', { fill: WATd });
    return { anim: t => { const on = t > tm(['D2', 'Oxygen']) - 0.3; ox.forEach((e, k) => { const a = k * Math.PI / 4, v = (t * 0.4 + k / 8) % 1, r = 180 - 110 * v; attr(e, 'cx', (392 + r * Math.cos(a) * 1.3).toFixed(1)); attr(e, 'cy', (290 + r * Math.sin(a) * 0.9).toFixed(1)); e.style.opacity = on ? Math.min(1, 5 * v, 4 * (1 - v)) : 0; }); } }; } },
  { pos: 'R', label: 'ON LAND · MOUTH, SKIN AND LUNGS', tin: ['D3', null, -0.2], pill: ['Aestivation, hibernation: skin only', ['D4', 'aestivation', -0.1]], build: (el, s) => {
    mk(s, 'rect', { x: 30, y: 400, width: 724, height: 60, fill: '#D9C7A8' });
    P(s, 'M392,96 C300,96 250,160 252,230 C254,300 270,360 300,390 L484,390 C514,360 530,300 532,230 C534,160 484,96 392,96 Z', BEL, FGd, 3);
    const lu = [-1, 1].map(m => P(s, `M${392 + m * 20},180 C${392 + m * 90},170 ${392 + m * 110},230 ${392 + m * 90},290 C${392 + m * 60},310 ${392 + m * 24},280 ${392 + m * 20},250 Z`, LUNG, '#B5576E', 3));
    P(s, 'M392,120 L392,180 M392,180 L372,190 M392,180 L412,190', 'none', '#B5576E', 5);
    const air = []; for (let k = 0; k < 4; k++) air.push(circ(s, 392, 100, 7, '#fff', WATd, 2));
    return { labs: [[lab(s, 470, 240, 600, 180, 'Lungs'), ['D3', 'lungs']], [lab(s, 392, 118, 560, 100, 'Buccal cavity'), ['D3', 'buccal']], [lab(s, 290, 330, 120, 360, 'Skin', 'end'), ['D3', 'skin']]],
      anim: t => { const b = 1 + 0.08 * Math.sin(t * 2.4); lu.forEach((e, m) => attr(e, 'transform', `translate(392 230) scale(${b.toFixed(3)}) translate(-392 -230)`)); const on = t > tm(['D3', 'lungs']); air.forEach((e, k) => { const v = (t * 0.6 + k / 4) % 1; attr(e, 'cy', (100 + 120 * v).toFixed(1)); attr(e, 'cx', (392 + (k % 2 ? 1 : -1) * 40 * Math.max(0, v - 0.6) / 0.4).toFixed(1)); e.style.opacity = on ? Math.min(1, 4 * (1 - v)) : 0; }); } }; } }] });

/* ---------- U: heart, excretion + think ---------- */
const TH = { q: "How many ventricles does a frog's heart have?", opts: ['One', 'Two'], right: 0, why: 'One. Two atria and a single ventricle make three chambers.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'HEART · THREE CHAMBERS', tout: 'U4', build: (el, s) => {
    const hg = mk(s, 'g', {}); P(hg, 'M250,120 C180,120 160,200 200,250 L300,400 Q320,430 340,400 L440,250 C480,200 460,120 390,120 C350,120 330,140 320,160 C310,140 290,120 250,120 Z', 'none', '#9A8F86', 3, { 'stroke-dasharray': '10 8' });
    const la = P(hg, 'M222,140 C190,150 190,215 230,225 L312,225 L312,150 C290,136 250,134 222,140 Z', '#F2B6B0', RED, 3), ra = P(hg, 'M418,140 C450,150 450,215 410,225 L328,225 L328,150 C350,136 390,134 418,140 Z', '#C9D8F0', '#3A5FA0', 3);
    const vn = P(hg, 'M222,236 L418,236 C430,280 380,350 320,392 C260,350 210,280 222,236 Z', '#E58A84', RED, 3);
    const rb = mk(s, 'g', {}); mk(rb, 'ellipse', { cx: 620, cy: 200, rx: 46, ry: 30, fill: RBC, stroke: '#9E2A26', 'stroke-width': 2.5 }); mk(rb, 'ellipse', { cx: 620, cy: 200, rx: 14, ry: 10, fill: '#7A5BB0' }); cap(rb, 620, 262, 'RBC WITH A NUCLEUS', { fill: C.ink, 'font-size': 14 });
    const cl = div(el, 'chp', { left: '520px', top: '320px' }, 'Closed circulation');
    return { els: [[hg, ['U1', 'heart', -0.1], { ...POP, sc: 0.8 }], [rb, ['U2', 'nucleus', -0.2], { ...POP, sc: 0.6 }], [cl, ['U2', 'closed', -0.1]]],
      labs: [[lab(s, 250, 180, 60, 100, 'Atrium'), ['U1', 'atria']], [lab(s, 390, 180, 520, 110, 'Atrium'), ['U1', 'atria']], [lab(s, 320, 320, 160, 470, 'One ventricle'), ['U1', 'ventricle']], [lab(s, 445, 250, 540, 430, 'Pericardium'), ['U1', 'pericardium']]],
      anim: t => { const b = 1 + 0.04 * Math.max(0, Math.sin(t * 6)); attr(vn, 'transform', `translate(320 300) scale(${b.toFixed(3)}) translate(-320 -300)`); } }; } },
  { pos: 'R', label: 'EXCRETION · UREOTELIC', tin: ['U3', null, -0.2], tout: 'U4', pill: ['Urea out: ureotelic', ['U3', 'ureotelic', -0.1], 'ac'], build: (el, s) => {
    const K = [-1, 1].map(m => P(s, `M${392 + m * 70},120 C${392 + m * 150},110 ${392 + m * 160},230 ${392 + m * 100},290 C${392 + m * 70},310 ${392 + m * 50},270 ${392 + m * 60},200 C${392 + m * 64},160 ${392 + m * 50},130 ${392 + m * 70},120 Z`, '#B05A4A', '#6E2E22', 3));
    const ur = [-1, 1].map(m => P(s, `M${392 + m * 70},260 C${392 + m * 60},330 ${392 + m * 20},360 392,400`, 'none', '#E9C46A', 6)); P(s, 'M352,400 L432,400 L420,440 L364,440 Z', '#D8C6A8', '#8C7A5A', 3); cap(s, 392, 470, 'CLOACA', { fill: C.ink });
    const dr = []; for (let k = 0; k < 4; k++) dr.push(circ(s, 0, 0, 5, '#E9C46A', '#B5932A', 1.5));
    return { labs: [[lab(s, 520, 180, 620, 120, 'Kidney'), ['U3', 'kidneys']], [lab(s, 440, 330, 600, 340, 'Ureter'), ['U3', 'Ureters']]],
      anim: t => { const on = t > tm(['U3', 'Ureters']); dr.forEach((e, k) => { flow(ur[k % 2], e, (t * 0.5 + k / 4) % 1); e.style.opacity = on ? 1 : 0; }); } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'One', -0.1], why: ['U5', 'Two'] })] });

/* ---------- W: brain ---------- */
const brain = hi => s => { const f = k => k === hi ? '#BFE3CB' : '#F1E7E4', st = k => k === hi ? CB : '#9A8F86', Y = 135;
  [-1, 1].forEach(m => { mk(s, 'ellipse', { cx: 80, cy: Y + m * 16, rx: 26, ry: 14, fill: f(0), stroke: st(0), 'stroke-width': 2.5 }); mk(s, 'ellipse', { cx: 160, cy: Y + m * 30, rx: 56, ry: 28, fill: f(0), stroke: st(0), 'stroke-width': 2.5 }); mk(s, 'ellipse', { cx: 290, cy: Y + m * 28, rx: 34, ry: 26, fill: f(1), stroke: st(1), 'stroke-width': 2.5 }); });
  mk(s, 'rect', { x: 216, y: Y - 18, width: 30, height: 36, rx: 8, fill: f(0), stroke: st(0), 'stroke-width': 2.5 }); mk(s, 'rect', { x: 328, y: Y - 34, width: 20, height: 68, rx: 8, fill: f(2), stroke: st(2), 'stroke-width': 2.5 });
  P(s, `M350,${Y - 26} L430,${Y - 10} L430,${Y + 10} L350,${Y + 26} Z`, f(2), st(2), 2.5); P(s, `M430,${Y} L480,${Y}`, 'none', '#9A8F86', 8);
  txt(s, 248, 250, ['FRONT · SMELL AND THINKING', 'MIDDLE · SIGHT', 'BACK · BALANCE, LINK TO SPINAL CORD'][hi], { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1, 'font-weight': 600, fill: CB }); };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · THREE PARTS OF THE BRAIN', svg: false, build: el => EP.cols(el, [
  ['PART 1 · FOREBRAIN', 'Forebrain', 'SMELL · CEREBRAL HEMISPHERES', brain(0), ['W2', 'forebrain', -0.2], ['W2', 'olfactory', -0.1], ['W2', 'diencephalon', 0]],
  ['PART 2 · MIDBRAIN', 'Midbrain', 'A PAIR OF OPTIC LOBES · SIGHT', brain(1), ['W3', 'midbrain', -0.2], ['W3', 'optic', -0.1], ['W3', 'sight', 0]],
  ['PART 3 · HINDBRAIN', 'Hindbrain', 'CEREBELLUM · MEDULLA OBLONGATA', brain(2), ['W4', 'hindbrain', -0.2], ['W4', 'cerebellum', -0.1], ['W4', 'medulla', 0]]]) }] });

EP.run({
  icons: { drop: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z'], sound: ['M4 10v4h4l5 4V6L8 10Z', 'M16 9a4 4 0 0 1 0 6', 'M19 6a8 8 0 0 1 0 12'], leaf: ['M5 19c0-9 6-14 15-14 0 9-5 15-14 15', 'M5 19l8-8'] },
  jobs: [['drop', 'After the rain', 'A POND AT NIGHT', ['H1', 'rain']], ['sound', 'Loud croaking', 'FROM THE WATER', ['H1', 'croaking']], ['leaf', 'A green frog', 'ON A LEAF', ['H1', 'green']]],
  scenes: S,
  stmt: { l2: '<span class="acc">Forelimbs</span>: four digits. Hind limbs: five.', f: '<span class="lad">hind feet <b>webbed</b> · for swimming</span>', t2: ['T1', 'Forelimbs', -0.2], tf: ['T1', 'Hind', -0.1] },
  trap: { wrong: "A frog's eggs are fertilised inside the body", right: 'Fertilisation is external, in water', tWrong: ['X2', 'fertilised', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'external', -0.3], tSvg: ['X3', 'tadpoles', -0.4],
    build: s => { const X = [60, 170, 280, 390]; [0, 1, 2].forEach(i => P(s, `M${X[i] + 34},130 l40,0 m-10,-8 l10,8 l-10,8`, 'none', '#1F6B3F', 3));
      for (let k = 0; k < 6; k++) { circ(s, X[0] - 12 + (k % 3) * 14, 122 + Math.floor(k / 3) * 16, 7, '#E3EEF3', '#7FA3B8', 1.5); circ(s, X[0] - 12 + (k % 3) * 14, 122 + Math.floor(k / 3) * 16, 2.5, '#2E2A24', 'none', 0); }
      mk(s, 'ellipse', { cx: X[1], cy: 130, rx: 16, ry: 12, fill: '#4E5A3A' }); P(s, `M${X[1] + 14},130 C${X[1] + 30},120 ${X[1] + 34},140 ${X[1] + 46},128`, 'none', '#4E5A3A', 5);
      frog(s, X[2] + 6, 132, 0.17); frog(s, X[3] + 4, 130, 0.22);
      ['EGGS', 'TADPOLE', 'FROGLET', 'FROG'].forEach((w, i) => cap(s, X[i] + (i ? 6 : 2), 196, w, { 'font-size': 12, fill: '#1F6B3F' })); cap(s, 230, 250, 'METAMORPHOSIS · IN WATER', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: heart, excretion, fertilisation, sexual dimorphism', at: ['E1', 'statement'] },
  mcq: { q: 'Which of these statements about the frog are correct?<div class="sl"><b>I</b>The heart has two atria and one ventricle.</div><div class="sl"><b>II</b>Frogs are uricotelic.</div><div class="sl"><b>III</b>A male has a copulatory pad on each forelimb.</div><div class="sl"><b>IV</b>Fertilisation is internal.</div>',
    opts: ['I and II only', 'II and IV only', 'I, II and III only', 'I and III only'], right: 3 }, mcqAt: ['Q1', 'Read', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b> (I, III)', ['A1', 3, 0.1]], ['<b style="color:var(--red)">II</b>: urea, so ureotelic', ['A2', 'urea']], ['<b style="color:var(--red)">IV</b>: fertilisation is external', ['A2', 'Fertilisation']], ['<b style="color:var(--ok)">I</b>: two atria, one ventricle', ['A3', 'atria']], ['<b style="color:var(--ok)">III</b>: male has a copulatory pad', ['A3', 'copulatory']]],
  recap: { title: 'Recap · frog', lines: ['<b>Frog</b>: Rana tigrina · cold-blooded (poikilotherm) · camouflage', '<b>Skin</b>: moist, absorbs water · breathes in water (cutaneous)', '<b>Limbs</b>: fore 4 digits · hind 5, webbed · <b>male</b>: vocal sacs, pad', '<b>Heart</b>: 2 atria + 1 ventricle · closed · <b>ureotelic</b>', '<b>Brain</b>: fore, mid, hind · fertilisation <b>external</b>'] },
  yq: ['How does a frog breathe in water?', "How many chambers does a frog's heart have?", 'Name two ways to tell a male frog from a female.'],
  next: { label: 'NEXT · EP 59', topic: 'How does a cockroach sense you? Cockroach: Body and Organ Systems' }
});
})();
