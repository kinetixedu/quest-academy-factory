// PUC Biology Ep 95: Photoperiodism, Vernalisation and Seed Dormancy (*I: not in current NCERT, in ISC). Runner: ep.js + rp95.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, plant, leaf, dayBar, sun, moon, flake, seed, wheat } = R95;
const ICN = { flower: ['M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15', 'M12 12h.01'], snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'], seed: ['M12 3c5 3 7 9 3 14s-11 3-11-3 5-9 8-11Z', 'M8 16c2-4 5-7 8-9'] };
const S = [];
const GH = true; // ISC ghost on lesson cards

/* ---------- H: the bushes on the bicycle road ---------- */
S.push(EP.hook({ label: 'THE BICYCLE ROAD', face: 'aarav', pill: ['Same month, every year', ['H3', 'same', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['How does a plant know the season?', ['H3', 'know', -0.4]], ['Why do some seeds wait?', ['H3', 'why', -0.2]]],
  a: [['ANSWER 1', 'It measures day and night length', ['H4', 'measure']], ['ANSWER 2', 'Some need cold · some seeds sleep', ['H4', 'cold']]],
  chips: [['Photoperiodism', ['H5', 'photoperiodism']], ['Vernalisation', ['H5', 'vernalisation']], ['Seed dormancy', ['H5', 'seed']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 400, width: 784, height: 180, fill: '#B9AE98' }); P(s, 'M0,470 L784,470', 'none', '#FFFFFF', 4, { 'stroke-dasharray': '30 20' });
    const bushes = [120, 330, 540].map(x => { const g = mk(s, 'g', {}); [[-40, 0, 60], [30, -10, 66], [0, -50, 56]].forEach(([dx, dy, r]) => circ(g, x + dx, 340 + dy, r, '#8CC48F', '#3E9B5F', 3)); const fl = [[-50, -30], [20, -60], [50, -10], [-10, 10], [10, -100], [-60, 20]].map(([dx, dy]) => circ(g, x + dx, 340 + dy, 10, K.flower, K.flowerS, 2)); return { g, fl }; });
    const sk = mk(s, 'g', {}); const sn = sun(sk, 680, 140, 24), mn = moon(sk, 680, 140, 22);
    return { els: bushes.map((b, i) => [b.g, ['H1', 'Some', -0.2 + i * 0.15], { dy: 12 }]),
      anim: t => { const a = tm(['H3', 'burst']); bushes.forEach(b => b.fl.forEach((f, k) => { const v = M.clamp((t - a - k * 0.12) / 0.3); attr(f, 'r', (10 * v).toFixed(1)); }));
        const d = 0.5 + 0.5 * Math.sin(t * 1.2); sn.style.opacity = d.toFixed(2); mn.style.opacity = (1 - d).toFixed(2); } };
  } }));

/* ---------- B: photoperiodism ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS PHOTOPERIODISM?', ghost: GH, build: (el, s) => {
  const p1 = div(el, 'pillp', { left: '60px', top: '130px' }, '<b>Photo</b> = light'), p2 = div(el, 'pillp', { left: '60px', top: '200px' }, '<b>Period</b> = a length of time'), p3 = div(el, 'pillp ac', { left: '60px', top: '270px' }, 'Response to the length of day and night');
  const bar = dayBar(s, 600, 200, 840, 14, 56); txt(s, 600, 290, '0 h', { 'font-size': 18 }); txt(s, 1440, 290, '24 h', { 'font-size': 18, 'text-anchor': 'end' }); const sn = sun(s, 760, 150, 22), mn = moon(s, 1300, 150, 22);
  const lt = div(el, 'chp', { left: '700px', top: '340px' }); lt.textContent = 'LIGHT PERIOD'; const dk = div(el, 'chp', { left: '1160px', top: '340px', background: K.night, color: '#fff' }); dk.textContent = 'DARK PERIOD · MATTERS TOO';
  const pl = plant(s, 1020, 520, 110, 0.8, 2);
  return { els: [[p1, ['B2', 'Photo', -0.1]], [p2, ['B2', 'Period', -0.1]], [p3, ['B2', 'responds', -0.2]], [bar.g, ['B2', 'day', -0.3], { dy: 10 }], [sn, ['B2', 'day', -0.2], POP], [mn, ['B2', 'night', -0.2], POP], [lt, ['B3', 'light', -0.2]], [dk, ['B3', 'dark', -0.2]], [pl.g, ['B3', 'Together', -0.2], { dy: 12 }]],
    anim: t => { pl.flower.style.opacity = t > tm(['B3', 'flower']) ? 1 : 0; } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['WHOLE PLANT', 'LEAF', 'INSIDE THE LEAF'], scales: ['x1', 'x4', 'x100'], ghost: 'NOT IN CURRENT NCERT · IN ISC SYLLABUS',
  info: [['RUNG 1 OF 3', 'Shoot apex', 'The growing tip.', 'Flowers form here.'], ['RUNG 2 OF 3', 'The leaf', 'The leaves sense', 'light and dark.'], ['RUNG 3 OF 3', 'A signal', 'Thought to travel', 'from leaf to apex.']],
  av: { who: 'Aarav', text: 'The leaf is the timer!', tin: ['Z4', 'flowers', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [700, 300, 70], build: g => { mk(g, 'rect', { x: 0, y: 470, width: 1056, height: 60, fill: K.soil }); const p = plant(g, 528, 470, 330, 1.25, 3); p.flower.style.opacity = 0;
      return { labs: [[lab(g, 528, 140, 760, 90, 'Shoot apex'), ['Z2', 'shoot']], [lab(g, 600, 300, 800, 330, 'Leaf'), ['Z2', 'whole', 0.5]]] }; } },
    { at: 'Z3', focus: [600, 260, 60], build: g => { const L = leaf(g, 200, 300, -0.2, 640, 170); P(g, 'M200,300 L120,320', 'none', K.stem, 12); for (let k = 1; k < 6; k++) P(g, `M${200 + k * 100},${300 - k * 20} l${40},${-60} M${200 + k * 100},${300 - k * 20} l${30},${60}`, 'none', K.vein, 3); const sn = sun(g, 900, 90, 26);
      return { labs: [[lab(g, 480, 270, 560, 470, 'Leaf · senses light and dark'), ['Z3', 'leaves']]] }; } },
    { at: 'Z4', build: g => { for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) mk(g, 'rect', { x: 40 + c * 110, y: 30 + r * 90, width: 104, height: 84, rx: 18, fill: '#DDF0D6', stroke: K.leafS, 'stroke-width': 3 }); P(g, 'M0,440 L1056,440', 'none', K.stem, 40); P(g, 'M0,440 L1056,440', 'none', '#B9DDB0', 28); cap(g, 120, 500, 'VEIN · TOWARDS THE SHOOT APEX →', { fill: K.leafS, 'text-anchor': 'start', 'font-size': 18 });
      const dots = [0, 1, 2, 3, 4].map(() => circ(g, 0, 0, 10, '#F6E3B4', K.sig, 3));
      return { labs: [[lab(g, 520, 250, 700, 470, 'Flowering signal', 'start'), ['Z4', 'signal']]], anim: t => { const a = tm(['Z4', 'travels']); dots.forEach((d, k) => { const u = ((t - a) * 0.35 + k / 5) % 1; attr(d, 'cx', (40 + 1000 * u).toFixed(1)); attr(d, 'cy', 440); d.style.opacity = t > a ? 1 : 0; }); } }; } }] }));

/* ---------- L: day length to flower ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'DAY LENGTH TO FLOWER · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Leaves get light and dark', 'for the right lengths of time'], ['Leaves sense it', 'they measure day and night'], ['A signal forms', 'in the leaves'], ['Signal travels up', 'to the shoot apex'], ['Apex makes flowers', 'it becomes a flowering apex']], LT) }) },
  { pos: 'R', label: 'WATCH THE PLANT', build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 500, width: 784, height: 80, fill: K.soil }); const bar = dayBar(s, 140, 90, 500, 10, 36); const sn = sun(s, 110, 108, 16);
    const p = plant(s, 392, 500, 300, 1.1, 3); const glow = p.leaves.map(l => l.firstChild); const dots = [0, 1, 2].map(() => circ(s, 0, 0, 9, '#F6E3B4', K.sig, 3));
    return { anim: t => { const ts = LT.map(tm); glow.forEach(e => attr(e, 'stroke-width', t > ts[1] && t < ts[3] ? (5 + 2 * Math.sin(t * 8)).toFixed(1) : 3)); glow.forEach(e => attr(e, 'fill', t > ts[2] ? '#A9D9A5' : K.leaf));
      dots.forEach((d, k) => { const u = M.clamp((t - ts[3] - k * 0.35) / 1.6); const [lx, ly] = p.leafPts[k]; attr(d, 'cx', (lx + (392 - lx) * Math.min(1, u * 3)).toFixed(1)); attr(d, 'cy', (ly + (p.apex[1] - ly) * u).toFixed(1)); d.style.opacity = t > ts[2] && u < 1 ? 1 : 0; });
      const f = M.clamp((t - ts[4]) / 0.8); p.flower.style.opacity = f.toFixed(2); p.flower.style.transform = `scale(${(0.4 + 0.6 * f).toFixed(3)})`; p.bud.style.opacity = (1 - f).toFixed(2); bar.g.style.opacity = t > ts[0] - 0.2 ? 1 : 0.3; } }; } }] });

/* ---------- C: three groups ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THREE GROUPS BY DAY LENGTH', ghost: GH, build: (el, s) => {
  const X0 = 360, W = 760, cx = X0 + W * 12 / 24; const rows = [['LONG DAY PLANTS', 16, 'light longer than critical', ['C2', 'Long']], ['SHORT DAY PLANTS', 8, 'light shorter than critical', ['C2', 'Short']], ['DAY NEUTRAL PLANTS', null, 'no link with day length', ['C3', 'Day']]];
  const out = []; rows.forEach(([n, h, d, sp], i) => { const y = 130 + i * 140; const lb = div(el, 'chp', { left: '36px', top: y + 'px' }); lb.textContent = n; const ds = div(el, 'chp', { left: '36px', top: y + 54 + 'px', background: 'transparent', padding: '0', color: C.mute, fontSize: '18px' }); ds.textContent = d;
    const g = mk(s, 'g', {}); const b = dayBar(g, X0, y + 10, W, h ?? 8, 50); const p = plant(g, 1340, y + 110, 80, 0.55, 2); out.push({ lb, ds, g, b, p, h, sp }); });
  const cl = mk(s, 'g', {}); P(cl, `M${cx},110 L${cx},420`, 'none', '#D1495B', 4, { 'stroke-dasharray': '10 8' }); T(cl, cx, 100, 'CRITICAL DURATION', 18, '#D1495B', { 'font-family': 'IBM Plex Mono' });
  return { els: [[cl, ['C2', 'critical', -0.2], { dy: 0, fade: 0.3 }], ...out.flatMap(o => [[o.lb, o.sp], [o.ds, o.sp, { dy: 6 }], [o.g, o.sp, { dy: 10 }]])],
    anim: t => { out.forEach((o, i) => { const on = t > tm(o.sp) + 0.8; o.p.flower.style.opacity = on ? 1 : 0; if (o.h == null) o.b.set(12 + 8 * Math.sin(t * 1.3)); }); } }; } }] });

/* ---------- D: vernalisation · spring vs winter varieties ---------- */
const season = (el, items, y) => { const e = div(el, 'stc2', { left: '36px', top: y + 'px' }); e.innerHTML = items.map((x, i) => `<span>${x}</span>${i < items.length - 1 ? '<em>›</em>' : ''}`).join(''); return e; };
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'SPRING VARIETY', ghost: GH, pill: ['Sown in spring · grain before season ends', ['D2', 'sown', -0.1], 'ac'], build: (el, s) => {
    const ch = season(el, ['SPRING: SOW', 'SUMMER: GRAIN'], 80); const sn = sun(s, 620, 230, 30); const w = [0, 1, 2, 3].map(k => wheat(s, 200 + k * 90, 430, 200, 1.1)); mk(s, 'rect', { x: 0, y: 430, width: 784, height: 50, fill: K.soil });
    const vt = div(el, 'pillp', { left: '36px', top: '96px', display: 'none' }, '');
    return { els: [[ch, ['D2', 'spring', -0.2], { dy: 8 }], [sn, ['D2', 'grain', -0.2], POP], ...w.map((e, i) => [e, ['D2', 'grain', -0.4 + i * 0.1], { dy: 20 }])] }; } },
  { pos: 'R', label: 'WINTER VARIETY', tin: ['D3', null, -0.2], pill: ['Sown in autumn · harvested mid-summer', ['D3', 'autumn', -0.1], 'ac'], build: (el, s) => {
    const ch = season(el, ['SOW IN AUTUMN', 'WINTER', 'SPRING', 'HARVEST'], 80); mk(s, 'rect', { x: 0, y: 430, width: 784, height: 50, fill: K.soil });
    const fl = [0, 1, 2, 3, 4, 5].map(k => flake(s, 120 + k * 110, 200 + (k % 2) * 40, 14)); const sm = [0, 1, 2, 3].map(k => { const g = mk(s, 'g', {}); leaf(g, 230 + k * 100, 430, -1.2, 50, 10); leaf(g, 230 + k * 100, 430, -1.9, 44, 9); return g; }); const tall = [0, 1, 2, 3].map(k => wheat(s, 230 + k * 100, 430, 200, 1.1));
    return { els: [[ch, ['D3', 'winter', -0.2], { dy: 8 }]], anim: t => { const a = tm(['D3', 'winter', 0, 1]), b = tm(['D3', 'grow']), c = tm(['D3', 'harvested']); fl.forEach(f => f.style.opacity = t > a && t < b ? 1 : 0); sm.forEach(g => g.style.opacity = t > tm(['D3', 'pass']) - 0.3 && t < b + 0.3 ? 1 : 0); tall.forEach((g, k) => { const v = M.clamp((t - b - k * 0.1) / 1.2); g.style.opacity = v.toFixed(2); g.style.transform = `translateY(${(30 * (1 - v)).toFixed(1)}px)`; }); } }; } }] });

/* ---------- U: why cold matters + think ---------- */
const TH = { q: 'A farmer sows winter wheat in spring. Will it give grain on time?', opts: ['Yes', 'No'], right: 1, why: 'No. It missed the cold it needs, so it would normally fail to flower or make mature grain in time.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'WHY THE COLD MATTERS', ghost: GH, tout: 'U4', build: (el, s) => {
    const r1 = div(el, 'pillp', { left: '60px', top: '120px' }, 'Stops flowering too early, late in the season'), r2 = div(el, 'pillp ac', { left: '60px', top: '200px' }, 'Gives time to grow up first');
    const th = mk(s, 'g', {}); mk(th, 'rect', { x: 120, y: 290, width: 30, height: 190, rx: 15, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); circ(th, 135, 490, 24, K.snow, K.ink, 3); mk(th, 'rect', { x: 128, y: 430, width: 14, height: 60, fill: K.snow }); flake(th, 210, 330, 18);
    const p = plant(s, 480, 500, 220, 1, 3);
    return { els: [[r1, ['U2', 'stops', -0.2]], [r2, ['U2', 'time', -0.2]], [th, ['U2', 'Vernalisation', -0.2], { dy: 10 }], [p.g, ['U2', 'grow', -0.4], { dy: 12 }]], anim: t => { p.flower.style.opacity = 0; } }; } },
  { pos: 'R', label: 'BIENNIALS · TWO SEASONS', tin: ['U3', null, -0.2], tout: 'U4', pill: ['Flower after a cold treatment', ['U3', 'cold', -0.1], 'ac'], build: (el, s) => {
    const mkI = (x, nm, draw) => { const g = mk(s, 'g', {}); draw(g, x); cap(g, x, 400, nm, { fill: C.ink }); flake(g, x + 70, 150, 16); return g; };
    const beet = mkI(150, 'SUGARBEET', (g, x) => { P(g, `M${x - 50},260 C${x - 50},330 ${x},380 ${x},380 C${x},380 ${x + 50},330 ${x + 50},260 Z`, '#E8D9C0', '#8C6D4F', 3); leaf(g, x, 260, -1.9, 90, 22); leaf(g, x, 260, -1.2, 90, 22); });
    const cab = mkI(392, 'CABBAGE', (g, x) => { circ(g, x, 300, 70, '#B9DDB0', K.leafS, 3); P(g, `M${x - 50},300 C${x - 20},250 ${x + 20},250 ${x + 50},300`, 'none', K.leafS, 3); P(g, `M${x - 30},330 C${x},280 ${x + 30},300 ${x + 40},340`, 'none', K.leafS, 3); });
    const car = mkI(630, 'CARROT', (g, x) => { P(g, `M${x - 30},250 L${x + 30},250 L${x},380 Z`, '#E58A3C', '#B35F22', 3); leaf(g, x, 250, -1.9, 80, 14); leaf(g, x, 250, -1.2, 80, 14); });
    return { els: [[beet, ['U3', 'Sugarbeet', -0.2], { dy: 12 }], [cab, ['U3', 'cabbage', -0.2], { dy: 12 }], [car, ['U3', 'carrot', -0.2], { dy: 12 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Will', -0.1], why: ['U5', 'missed'] })] });

/* ---------- W: seed dormancy ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · WHY A SEED WAITS', ghost: GH, svg: false, build: el => EP.cols(el, [
  ['STEP 1 · DORMANCY', 'A resting state', 'CONTROLLED FROM INSIDE THE SEED', s => { seed(s, 200, 160, 1.4); T(s, 320, 110, 'z', 30, C.mute); T(s, 350, 80, 'z', 24, C.mute); T(s, 375, 56, 'z', 18, C.mute); }, ['W2', 'Some', -0.2], ['W2', 'dormancy'], ['W2', 'inside']],
  ['STEP 2 · THE CAUSES', 'Coat · inhibitors · embryo', 'HARD COAT · ABSCISIC ACID · IMMATURE EMBRYO', s => { seed(s, 140, 150, 1.1); R95.circ(s, 290, 110, 22, '#F6D0D6', '#D1495B', 3); T(s, 290, 117, 'ABA', 14, '#D1495B'); mk(s, 'ellipse', { cx: 400, cy: 170, rx: 22, ry: 14, fill: '#F3E2B3', stroke: K.seedS, 'stroke-width': 2 }); }, ['W3', 'causes', -0.2], ['W3', 'hard'], ['W3', 'embryo']],
  ['STEP 3 · THE FIXES', 'Break the coat · chill · GA', 'SANDPAPER · MICROBES · NITRATES · LIGHT', s => { seed(s, 160, 160, 1.1); P(s, 'M100,90 L230,60 L240,90 L110,120 Z', '#D9C9A0', '#8C7B5A', 3); flake(s, 330, 110, 22); T(s, 410, 120, 'GA', 26, K.leafS); }, ['W4', 'fixes', -0.2], ['W4', 'Scratch'], ['W4', 'nitrates']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['flower', 'Winter flowers', 'ONLY IN WINTER', ['H1', 'Some']], ['flower', 'Summer flowers', 'ONLY IN SUMMER', ['H1', 'summer']], ['seed', 'Sleeping seeds', 'MONTHS IN SOIL', ['H1', 'seeds']]],
  scenes: S,
  stmt: { l2: 'Leaves sense, the <span class="acc">shoot tip</span> flowers.', f: '<span class="lad">leaf senses → signal → <b>shoot apex flowers</b></span>', t2: ['T1', 'Leaves', -0.2], tf: ['T1', 'sense'] },
  trap: { wrong: 'The shoot tip senses the day length', right: 'The leaves sense it · the signal travels to the shoot apex', tWrong: ['X2', 'shoot', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'leaves', -0.2], tSvg: ['X3', 'signal', -0.4],
    build: s => { const p = plant(s, 230, 250, 170, 0.75, 3); p.flower.style.opacity = 0; p.leaves.forEach(l => attr(l.firstChild, 'stroke-width', 5)); cap(s, 230, 268, 'LEAVES SENSE · APEX FLOWERS', { 'font-size': 14 }); } },
  where: { type: 'Statement or match questions: plant groups, vernalisation crops, ways to break dormancy', at: ['E1', 'statement'] },
  mcq: { q: 'Which pair is matched correctly?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Short day plant - light longer than critical<br>II. Winter wheat - sown in autumn<br>III. Photoperiod sensed by - the shoot apex<br>IV. Abscisic acid - breaks seed dormancy</div>', opts: ['Pair I', 'Pair II', 'Pair III', 'Pair IV'], right: 1 }, mcqAt: ['Q1', 'pair', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['II: winter wheat, autumn', ['A1', 'Winter']], ['I: short day = less light', ['A2', 'Short']], ['III: leaves sense it', ['A2', 'leaves']], ['IV: ABA causes dormancy', ['A3', 'causes']]],
  recap: { title: 'Recap · ISC syllabus topic', lines: ['<b>Photoperiodism</b>: response to the length of day and night', '<b>Groups</b>: long day · short day · day neutral (critical duration)', '<b>Leaves</b> sense the photoperiod · signal goes to the shoot apex', '<b>Vernalisation</b>: flowering helped by cold · winter wheat sown in autumn', '<b>Dormancy</b>: hard coat · ABA · immature embryo · fix: scarify, chill, GA'] },
  yq: ['What is photoperiodism?', 'What is vernalisation?', 'Name two ways to break seed dormancy.'],
  next: { label: 'NEXT · EP 96', topic: 'Respiratory Organs and the Human Respiratory System' }
});
})();
