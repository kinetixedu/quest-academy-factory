// PUC Biology Ep 80: Photosynthesis - Early Experiments (Living diagram, leaf green). Runner: ep.js + ph11.js
(() => {
const { C, mk, txt, cap, POP, lab, labT, tm, div, svgIn, attr } = EP;
const { K, P, circ, T, at, arrow, pill, mol, sun, leaf, leafD, chloro } = H11;
const ICN = { pot: ['M7 14h10l-1.5 7h-7Z', 'M12 14V8', 'M12 10c-3 0-5-2-5-5 3 0 5 2 5 5', 'M12 8c0-3 2-5 5-5 0 3-2 5-5 5'], bub: ['M8 18a3 3 0 1 0 .1 0', 'M15 11a2 2 0 1 0 .1 0', 'M10 5a1.5 1.5 0 1 0 .1 0'], stone: ['M3 18c1-5 5-8 9-8s8 3 9 8Z', 'M6 21h12'] };
const S = [];
const DARK = '#2F3450', PALE = '#EEF3DF';
// small local column helper (like EP.cols, timed from any line)
const cols3 = (el, list, t0) => { const out = { els: [], anims: [] };
  list.forEach(([h, n, c, build, tH, tN, tC], i) => { const col = div(el, 'colW', { left: 36 + i * 516 + 'px' }, `<div class="ch2">${h}</div><div class="dz"></div><div class="it"><div class="inm">${n}</div><div class="inc">${c}</div></div>`);
    const s = svgIn(col.querySelector('.dz'), 496, 290); const r = build(s) || {};
    out.els.push([col, [t0, null, 0.3 + i * 0.06], { dy: 12 }], [s, tH, { ...POP, sc: 0.8 }], [col.querySelector('.it'), tN, { dy: -16, sp: M.SOFT, fade: 0.1 }], [col.querySelector('.inc'), tC, { dy: 6 }]);
    if (r.anim) out.anims.push(r.anim); (r.labs || []).forEach(l => out.labs = (out.labs || []).concat([l])); });
  out.anim = t => out.anims.forEach(f => f(t)); return out; };
// starch test leaf: base drawing + dark overlay clipped to a region; v = 0..1 reveal
let cid = 0;
const testLeaf = (s, region, base) => { const g = mk(s, 'g', {}); const d = leafD(70, 150, 340, 105);
  P(g, d, base || K.leaf, K.ink, 4); const id = 'clp80_' + (cid++); const cp = mk(mk(s, 'defs', {}), 'clipPath', { id }); P(cp, d, '#000', 'none', 0);
  const ov = mk(g, 'g', { 'clip-path': `url(#${id})` }); region(ov); P(g, `M70,150 L396,150`, 'none', K.vein, 3); P(g, 'M40,156 L70,150', 'none', K.ink, 5); return { g, ov }; };

/* ---------- H: bubbles in the fish tank ---------- */
S.push(EP.hook({ label: "COUSIN'S FISH TANK", face: 'diya', pill: ['Bubbles in the sun', ['H1', 'bubbles', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['What gas is in those bubbles?', ['H3', 'gas']], ['How did scientists work it out?', ['H3', 'scientists']]],
  a: [['ANSWER 1', 'Oxygen', ['H4', 'oxygen']], ['ANSWER 2', 'Many clever experiments', ['H4', 'clever']]],
  chips: [['Priestley', ['H5', 'Priestley']], ['Ingenhousz', ['H5', 'Ingenhousz']], ['Sachs', ['H5', 'Sachs']], ['Engelmann', ['H5', 'Engelmann']], ['van Niel', ['H5', 'van']], ['The equation', ['H5', 'equation']]],
  build: (el, s) => {
    sun(s, 660, 150, 40);
    mk(s, 'rect', { x: 110, y: 170, width: 440, height: 300, rx: 10, fill: '#DCEEF6', stroke: K.ink, 'stroke-width': 4 }); mk(s, 'rect', { x: 110, y: 200, width: 440, height: 8, fill: '#B9DDEE' });
    mk(s, 'rect', { x: 110, y: 430, width: 440, height: 40, fill: '#D9C9A3', stroke: K.ink, 'stroke-width': 3 });
    const pl = [[200, 430], [250, 432], [320, 430], [400, 431], [460, 430]]; pl.forEach(([x, y], i) => { P(s, `M${x},${y} C${x - 20},${y - 80} ${x + 25},${y - 140} ${x + 5},${y - 200 + i * 10}`, 'none', K.chl, 6); for (let k = 1; k < 5; k++) mk(s, 'ellipse', { cx: x + (k % 2 ? -14 : 16), cy: y - k * 42, rx: 16, ry: 6, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2, transform: `rotate(${k % 2 ? 30 : -30} ${x + (k % 2 ? -14 : 16)} ${y - k * 42})` }); });
    const bub = Array.from({ length: 14 }, () => circ(s, 0, 0, 6, '#FFFFFF', K.o2, 2));
    return { anim: t => { const a = tm(['H1', 'bubbles']); bub.forEach((b, k) => { const p = pl[k % 5], u = ((t - a) * 0.45 + k * 0.137) % 1; attr(b, 'cx', (p[0] + 8 * Math.sin(u * 9 + k)).toFixed(1)); attr(b, 'cy', (p[1] - 150 - 70 * u + (k % 3) * 20).toFixed(1)); b.style.opacity = t > a ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); } };
  } }));

/* ---------- B: what is photosynthesis ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS PHOTOSYNTHESIS?', build: (el, s) => {
  const p1 = div(el, 'pillp ac', { left: '60px', top: '120px' }, 'Photo = light'), p2 = div(el, 'pillp', { left: '60px', top: '196px' }, 'Synthesis = making'), p3 = div(el, 'pillp ink', { left: '60px', top: '272px' }, 'Photosynthesis = making with light');
  const sn = sun(s, 760, 150, 42); const lf = leaf(s, 820, 330, 420, 120);
  const co = H11.put(s, 0, 0, mol.CO2), wa = H11.put(s, 0, 0, g => pill(g, 'H₂O', K.o2, K.o2L)), su = H11.put(s, 0, 0, g => pill(g, 'Sugar', K.sug, K.sugL)), ox = H11.put(s, 0, 0, mol.O2);
  const ray = P(s, 'M800,190 L900,290', 'none', K.sug, 5, { 'stroke-dasharray': '10 8' });
  const note = div(el, 'chp', { left: '60px', top: '400px' }, 'Almost all food on Earth starts here');
  return { els: [[p1, ['B2', 'Photo', -0.1]], [p2, ['B2', 'Synthesis', -0.1]], [p3, ['B2', 'So', -0.1]], [lf, ['B3', 'Green', -0.2], { dy: 10 }], [sn, ['B3', 'light', -0.2], { ...POP, sc: 0.5 }], [ray, ['B3', 'light']], [co, ['B3', 'carbon', -0.1]], [wa, ['B3', 'water', -0.1]], [su, ['B3', 'sugar', -0.1]], [ox, ['B3', 'oxygen', -0.1]], [note, ['B3', 'Almost', -0.1]]],
    anim: t => { const f = (g, sp, x0, y0, x1, y1) => { const v = M.io((t - tm(sp)) / 1); at(g.parentNode, x0 + (x1 - x0) * v, y0 + (y1 - y0) * v); };
      f(co, ['B3', 'carbon'], 1450, 160, 1180, 260); f(wa, ['B3', 'water'], 720, 500, 900, 400); f(su, ['B3', 'sugar'], 1030, 330, 1080, 470); f(ox, ['B3', 'oxygen'], 1180, 380, 1440, 480); } }; } }] });

/* ---------- Z: three leaf tests ---------- */
S.push({ id: 'Z', from: 'Z1', to: 'L1', cards: [{ pos: 'W', label: 'THREE LEAF TESTS · TEST FOR STARCH', svg: false, build: el => {
  const r = cols3(el, [
    ['TEST 1 · GREEN AND WHITE LEAF', 'Only green parts: starch', 'CHLOROPHYLL IS NEEDED', s => { const L = testLeaf(s, ov => { P(ov, 'M60,40 L430,40 L430,260 L60,260 Z', '#F4F1E4', 'none', 0); mk(ov, 'ellipse', { cx: 235, cy: 150, rx: 120, ry: 42, fill: K.leaf }); }); const dk = mk(L.ov, 'ellipse', { cx: 235, cy: 150, rx: 120, ry: 42, fill: DARK }); dk.style.opacity = 0;
      return { anim: t => { dk.style.opacity = M.clamp((t - tm(['Z2', 'Only'])) / 0.6).toFixed(2); } }; }, ['Z2', 'Test', -0.2], ['Z2', 'Only'], ['Z2', 'chlorophyll']],
    ['TEST 2 · PART COVERED', 'Only the uncovered part: starch', 'LIGHT IS NEEDED', s => { const L = testLeaf(s, () => {}); const dk = mk(L.ov, 'rect', { x: 0, y: 0, width: 500, height: 300, fill: DARK }); const cv = mk(L.ov, 'rect', { x: 180, y: 0, width: 110, height: 300, fill: PALE }); dk.style.opacity = 0; cv.style.opacity = 0;
      const pp = mk(s, 'rect', { x: 180, y: 70, width: 110, height: 160, rx: 6, fill: '#2E2A24', stroke: K.ink, 'stroke-width': 2 }); cap(s, 235, 60, 'BLACK PAPER', { 'font-size': 13, fill: C.ink });
      return { anim: t => { const v = M.clamp((t - tm(['Z3', 'Only'])) / 0.6); dk.style.opacity = v.toFixed(2); cv.style.opacity = v.toFixed(2); pp.style.opacity = (1 - 0.85 * v).toFixed(2); } }; }, ['Z3', 'Test', -0.2], ['Z3', 'Only'], ['Z3', 'light', 0, 1]],
    ['TEST 3 · HALF IN A TUBE WITH KOH', 'Half in KOH: no starch', 'CARBON DIOXIDE IS NEEDED', s => { const L = testLeaf(s, () => {}); const dk = mk(L.ov, 'rect', { x: 0, y: 0, width: 240, height: 300, fill: DARK }); dk.style.opacity = 0;
      const tb = mk(s, 'g', {}); mk(tb, 'rect', { x: 240, y: 70, width: 230, height: 160, rx: 26, fill: 'rgba(214,233,245,0.45)', stroke: K.o2, 'stroke-width': 3 }); for (let k = 0; k < 7; k++) circ(tb, 420 + (k % 2) * 18, 90 + k * 20, 11, '#FFFFFF', '#B9B2A0', 1.5); cap(tb, 420, 255, 'COTTON + KOH', { 'font-size': 13, fill: C.ink });
      const co = mk(s, 'g', {}); mol.CO2(co); return { anim: t => { dk.style.opacity = M.clamp((t - tm(['Z4', 'makes'])) / 0.6).toFixed(2); const a = tm(['Z4', 'soaks']), v = M.io((t - a) / 1.2); at(co, 330 + 90 * v, 120); co.style.opacity = t > a - 0.1 ? (1 - M.clamp((t - a - 1.1) / 0.3)).toFixed(2) : 0; } }; }, ['Z4', 'Test', -0.2], ['Z4', 'makes'], ['Z4', 'carbon', 0, 1]]], 'Z1');
  return r; } }] });

/* ---------- L: Priestley's bell jar ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
const mouse = (g, x, y) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx: x, cy: y, rx: 40, ry: 24, fill: '#B8B2A7', stroke: K.ink, 'stroke-width': 3 }); circ(G, x + 38, y - 10, 16, '#B8B2A7', K.ink, 3); circ(G, x + 32, y - 28, 9, '#E7C4C0', K.ink, 2.5); circ(G, x + 46, y - 12, 2.5, K.ink, K.ink, 1); P(G, `M${x - 40},${y + 4} C${x - 70},${y + 10} ${x - 70},${y - 20} ${x - 90},${y - 10}`, 'none', K.ink, 3); return G; };
const candle = (g, x, y) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - 16, y: y - 90, width: 32, height: 90, rx: 4, fill: '#FBF3E0', stroke: K.ink, 'stroke-width': 3 }); P(G, `M${x},${y - 90} L${x},${y - 102}`, 'none', K.ink, 3);
  const fl = mk(G, 'g', {}); P(fl, `M${x},${y - 100} C${x - 16},${y - 115} ${x - 8},${y - 135} ${x},${y - 150} C${x + 8},${y - 135} ${x + 16},${y - 115} ${x},${y - 100} Z`, '#F6D77A', '#C9962B', 2.5); return { g: G, fl }; };
const mint = (g, x, y) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - 34, y: y - 40, width: 68, height: 40, rx: 6, fill: '#C97B4A', stroke: K.ink, 'stroke-width': 3 }); P(G, `M${x},${y - 40} L${x},${y - 170}`, 'none', K.chlD, 5);
  for (let k = 0; k < 4; k++) { const yy = y - 70 - k * 30; [-1, 1].forEach(sd => mk(G, 'ellipse', { cx: x + sd * 24, cy: yy, rx: 24, ry: 11, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2.5, transform: `rotate(${sd * -20} ${x + sd * 24} ${yy})` })); } return G; };
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'PRIESTLEY · 1770 · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Candle in a bell jar', 'the flame soon goes out'], ['Mouse in a bell jar', 'soon it cannot breathe'], ['Add a mint plant', 'in the same bell jar'], ['Candle burns, mouse lives', 'the plant changed the air'], ['Plants restore the air', 'oxygen discovered in 1774']], LT) }) },
  { pos: 'R', label: 'THE BELL JAR', build: (el, s) => {
    mk(s, 'rect', { x: 120, y: 470, width: 544, height: 18, rx: 6, fill: '#9E7B55', stroke: K.ink, 'stroke-width': 3 });
    const cd = candle(s, 230, 470), ms = mouse(s, 540, 446), mt = mint(s, 392, 470);
    P(s, 'M150,470 L150,230 C150,90 634,90 634,230 L634,470', 'rgba(214,233,245,0.28)', '#5A87A8', 4); P(s, 'M180,240 C190,160 260,130 320,122', 'none', '#FFFFFF', 6, { opacity: 0.8 });
    const tag = div(el, 'chp', { left: '36px', top: '508px' }, ''); const o2 = div(el, 'pillp ac', { left: '470px', top: '500px' }, 'Oxygen · 1774');
    const air = [0, 1, 2].map(k => P(s, `M${300 + k * 90},400 c-14,-30 14,-50 0,-80`, 'none', K.chl, 4, { 'stroke-dasharray': '8 8' }));
    const txs = ['Flame goes out', 'Mouse cannot breathe', 'Mint plant added', 'Both are fine', 'The plant restored the air'];
    return { els: [[o2, ['L6', 'oxygen', -0.1]]], anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; });
      const out = M.clamp((t - ts[0] - 0.8) / 1.2), relit = M.clamp((t - ts[3]) / 0.6), fl = Math.max(1 - out, relit); cd.fl.style.opacity = fl.toFixed(2); attr(cd.fl, 'transform', `translate(230 370) scale(1 ${Math.max(fl, 0.001).toFixed(3)}) translate(-230 -370)`);
      const mIn = M.io((t - ts[1] + 0.3) / 0.6), faint = M.clamp((t - ts[1] - 1) / 0.8) * (1 - relit); ms.style.opacity = mIn.toFixed(2); attr(ms, 'transform', `rotate(${(faint * 18).toFixed(1)} 540 470)`);
      const g = M.io((t - ts[2]) / 0.8); mt.style.opacity = g.toFixed(2); attr(mt, 'transform', `translate(0 ${(470 * (1 - (0.3 + 0.7 * g))).toFixed(1)}) scale(1 ${(0.3 + 0.7 * g).toFixed(3)})`);
      air.forEach((a, k) => { a.style.opacity = t > ts[4] ? 1 : 0; attr(a, 'stroke-dashoffset', (-(t * 30) % 16).toFixed(1)); });
      tag.textContent = c >= 0 ? txs[c] : ''; M.vis(tag, t, ts[0], 1e9, POP); } }; } }] });

/* ---------- C: Ingenhousz and Sachs ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [
  { pos: 'L', label: 'INGENHOUSZ · LIGHT IS ESSENTIAL', pill: ['Bubbles only in bright light', ['C2', 'sunlight', -0.1, 1], 'ac'], build: (el, s) => {
    const half = (x, lit) => { const G = mk(s, 'g', {}); mk(G, 'rect', { x, y: 170, width: 260, height: 260, rx: 12, fill: lit ? '#DCEEF6' : '#4A5068', stroke: K.ink, 'stroke-width': 4 }); [0, 1, 2].forEach(k => P(G, `M${x + 70 + k * 60},428 C${x + 50 + k * 60},360 ${x + 95 + k * 60},300 ${x + 70 + k * 60},230`, 'none', K.chl, 6)); return G; };
    const a = half(100, 1), b = half(424, 0); sun(s, 160, 120, 30); cap(s, 230, 460, 'BRIGHT SUNLIGHT', { fill: C.ink }); cap(s, 554, 460, 'DARK', { fill: C.ink });
    const bub = Array.from({ length: 9 }, () => circ(s, 0, 0, 6, '#FFFFFF', K.o2, 2));
    return { els: [[a, ['C2', 'water', -0.2], { dy: 10 }], [b, ['C2', 'dark', -0.2], { dy: 10 }]], anim: t => { const s0 = tm(['C2', 'bright']); bub.forEach((e, k) => { const u = ((t - s0) * 0.5 + k / 9) % 1; attr(e, 'cx', 170 + (k % 3) * 60 + 6 * Math.sin(u * 8)); attr(e, 'cy', 400 - 210 * u); e.style.opacity = t > s0 ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); } }; } },
  { pos: 'R', label: 'SACHS · ABOUT 1854', tin: ['C3', null, -0.2], pill: ['Glucose, stored as starch', ['C3', 'starch', -0.1], 'ac'], build: (el, s) => {
    const cp = chloro(s, 300, 270, 200, 120, 5); const st = mk(s, 'g', {}); for (let k = 0; k < 5; k++) mk(st, 'ellipse', { cx: 600 + (k % 2) * 40, cy: 190 + k * 50, rx: 26, ry: 18, fill: '#FBF7EA', stroke: '#B9A57A', 'stroke-width': 2.5 });
    const gl = mk(s, 'g', {}); H11.P(gl, 'M560,350 l24,-14 l24,14 l0,28 l-24,14 l-24,-14 Z', K.sugL, K.sug, 3); const ar = arrow(s, 520, 270, 568, 270, K.ink, 3);
    return { els: [[cp.g, ['C3', 'green', -0.2], { dy: 10 }], [gl, ['C3', 'glucose', -0.1], POP], [ar, ['C3', 'stored', -0.2]], [st, ['C3', 'starch', -0.2], { dy: 10 }]],
      labs: [[lab(s, 300, 150, 380, 110, 'Chloroplast'), ['C3', 'chloroplasts']], [lab(s, 620, 190, 700, 120, 'Starch', 'end'), ['C3', 'starch']], [lab(s, 584, 392, 520, 450, 'Glucose', 'end'), ['C3', 'glucose']]] }; } }] });

/* ---------- D: Engelmann's prism ---------- */
const SPEC = ['#7B4B94', '#4A78C2', '#3E9B5F', '#E2C93C', '#E0893B', '#C8323C'], SX = 360, SW = 1080;
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [{ pos: 'W', label: "ENGELMANN · WHICH COLOURS WORK BEST?", pill: ['The first action spectrum', ['D3', 'action', -0.1], 'ac'], build: (el, s) => {
  const pr = mk(s, 'g', {}); P(pr, 'M140,320 L230,170 L320,320 Z', '#E9F2F7', K.ink, 4); P(pr, 'M40,250 L190,250', 'none', '#E2C93C', 8);
  const sp = mk(s, 'g', {}); SPEC.forEach((c, i) => { P(sp, `M275,${236 + i * 6} L${SX + i * SW / 6},150 L${SX + (i + 1) * SW / 6},150 L275,${242 + i * 6} Z`, c, 'none', 0, { opacity: 0.22 }); mk(sp, 'rect', { x: SX + i * SW / 6, y: 130, width: SW / 6, height: 40, fill: c }); });
  ['VIOLET', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'RED'].forEach((n, i) => cap(sp, SX + (i + 0.5) * SW / 6, 116, n, { fill: SPEC[i] }));
  const al = mk(s, 'g', {}); mk(al, 'rect', { x: SX - 20, y: 300, width: SW + 40, height: 120, rx: 14, fill: '#E6F1F6', stroke: K.o2, 'stroke-width': 2 }); for (let k = 0; k < 18; k++) mk(al, 'rect', { x: SX + k * 60, y: 350, width: 58, height: 22, rx: 8, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2.5 });
  const lt = mk(s, 'g', {}); SPEC.forEach((c, i) => mk(lt, 'rect', { x: SX + i * SW / 6, y: 170, width: SW / 6, height: 130, fill: c, opacity: 0.08 }));
  const bac = Array.from({ length: 70 }, (_, k) => { const e = mk(s, 'ellipse', { rx: 7, ry: 4, fill: '#8C6D4F', stroke: K.ink, 'stroke-width': 1 }); return e; });
  const home = bac.map((_, k) => [SX + ((k * 157) % SW), 312 + ((k * 37) % 96)]), tgt = bac.map((_, k) => { const blue = k % 9 < 4, red = k % 9 >= 4 && k % 9 < 8; const cx = blue ? SX + 1.5 * SW / 6 : red ? SX + 5.5 * SW / 6 : SX + ((k * 157) % SW); return [cx + ((k * 29) % 120) - 60, 330 + ((k * 23) % 34) + (blue || red ? 0 : 30)]; });
  return { els: [[pr, ['D2', 'split', -0.2], POP], [sp, ['D2', 'prism', -0.1], { dy: 0, fade: 0.5 }], [lt, ['D2', 'prism']], [al, ['D2', 'Cladophora', -0.2], { dy: 10 }]],
    labs: [[lab(s, 230, 300, 120, 440, 'Prism', 'start'), ['D2', 'prism']], [lab(s, 640, 362, 560, 470, 'Cladophora (green alga)'), ['D2', 'Cladophora']], [lab(s, 1100, 330, 1150, 470, 'Aerobic bacteria'), ['D2', 'aerobic']]],
    anim: t => { const a = tm(['D2', 'aerobic', -0.2]), v = M.io((t - tm(['D3', 'crowded'])) / 2); bac.forEach((e, k) => { const x = home[k][0] + (tgt[k][0] - home[k][0]) * v + 3 * Math.sin(t * 3 + k), y = home[k][1] + (tgt[k][1] - home[k][1]) * v + 2 * Math.cos(t * 2.5 + k); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); attr(e, 'transform', `rotate(${(k * 40) % 180} ${x.toFixed(1)} ${y.toFixed(1)})`); e.style.opacity = M.clamp((t - a) / 0.5).toFixed(2); }); } }; } }] });

/* ---------- U: van Niel + think ---------- */
const TH = { q: 'In green plants, does the oxygen come from carbon dioxide or from water?', opts: ['Carbon dioxide', 'Water'], right: 1, why: 'From water. Tracers later confirmed it.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'VAN NIEL · PURPLE AND GREEN BACTERIA', svg: false, tout: 'U4', build: el => {
    const g = div(el, '', { position: 'absolute', left: '36px', top: '96px', width: '712px', textAlign: 'center', font: "600 34px Poppins", color: C.ink }, '2H₂<b style="color:#B5476E">A</b> + CO₂ → 2<b style="color:#B5476E">A</b> + CH₂O + H₂O');
    const r1 = div(el, 'pillp', { left: '36px', top: '200px' }, 'Bacteria: H₂S → sulphur, no oxygen'), r2 = div(el, 'pillp good', { left: '36px', top: '276px' }, 'Plants: H₂O → oxygen');
    const r3 = div(el, 'chp', { left: '36px', top: '380px' }, 'Reduce = add hydrogen'), r4 = div(el, 'chp', { left: '36px', top: '444px', background: C.ac, color: '#fff' }, 'Hydrogen donor in plants: water');
    return { els: [[g, ['U2', 'Cornelius', -0.1], { dy: 10 }], [r1, ['U2', 'hydrogen', -0.1]], [r2, ['U3', 'green', -0.1]], [r3, ['U3', 'reduce', -0.1]], [r4, ['U3', 'water', -0.2]]] }; } },
  { pos: 'R', label: 'WHERE DOES THE OXYGEN COME FROM?', tin: ['U1', null, 0.3], tout: 'U4', build: (el, s0) => {
    const s = mk(s0, 'g', { transform: 'translate(-110 -90) scale(1.35)' }); const w = mk(s, 'g', {}); circ(w, 240, 260, 40, K.o2L, K.o2, 4); T(w, 240, 268, 'O', 26, K.o2); circ(w, 190, 300, 22, '#FFFFFF', K.ink, 3); T(w, 190, 307, 'H', 18); circ(w, 290, 300, 22, '#FFFFFF', K.ink, 3); T(w, 290, 307, 'H', 18); cap(w, 240, 360, 'WATER', { fill: K.o2 });
    const ox = mk(s, 'g', {}); mol.O2(ox); const hh = mk(s, 'g', {}); circ(hh, 0, 0, 18, '#FFFFFF', K.ink, 3); T(hh, 0, 6, 'H', 16);
    const co = H11.put(s, 600, 300, mol.CO2), sg = H11.put(s, 600, 420, g => pill(g, 'Sugar', K.sug, K.sugL));
    const a1 = arrow(s, 320, 300, 540, 300, K.ink, 3), c1 = cap(s, 330, 166, 'O₂ RELEASED', { fill: K.o2 }), c2 = cap(s, 430, 285, 'HYDROGEN', { fill: C.ink });
    return { els: [[w, ['U1', 'Where'], { dy: 10 }], [co, ['U3', 'carbon'], POP], [a1, ['U3', 'hydrogen'], { dy: 0, fade: 0.3 }], [c2, ['U3', 'hydrogen']], [c1, ['U3', 'water', 0.3]], [sg, ['U3', 'reduces', 0.4], POP]], anim: t => { const v = M.io((t - tm(['U3', 'hydrogen'])) / 1.2), o = M.io((t - tm(['U3', 'water'])) / 1); at(hh, 290 + 300 * v, 300); hh.style.opacity = t > tm(['U3', 'hydrogen']) - 0.1 && v < 0.98 ? 1 : 0; at(ox, 240, 260 - 100 * o); ox.style.opacity = t > tm(['U3', 'water']) ? 1 : 0; } }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'carbon', -0.1], why: ['U5', 'water'] })] });

/* ---------- W: build and count ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · BUILD THE EQUATION AND COUNT', build: (el, s) => {
  const terms = [['6CO₂', K.co2, ['W2', 'six']], ['+', C.ink, ['W2', 'twelve']], ['12H₂O', K.o2, ['W2', 'twelve']], ['→', C.ink, ['W2', 'Out']], ['C₆H₁₂O₆', K.sug, ['W2', 'glucose']], ['+', C.ink, ['W2', 'water', 0, 1]], ['6H₂O', K.o2, ['W2', 'water', 0, 1]], ['+', C.ink, ['W2', 'oxygen']], ['6O₂', K.o2, ['W2', 'oxygen']]];
  const row = div(el, '', { position: 'absolute', left: '36px', top: '96px', width: '1528px', display: 'flex', justifyContent: 'center', gap: '22px', font: "700 50px Poppins" });
  const sp = terms.map(([x, c]) => { const e = div(row, '', { position: 'relative', color: c }); e.textContent = x; return e; });
  const box = (x, title, color, sp2) => { const G = mk(s, 'g', {}); mk(G, 'rect', { x, y: 230, width: 640, height: 200, rx: 18, fill: '#F7F9F4', stroke: '#CBD0DA', 'stroke-width': 2 }); cap(G, x + 320, 268, title, { fill: color }); const d = []; for (let k = 0; k < 12; k++) d.push(circ(G, x + 70 + k * 46, 340, 16, K.o2L, K.o2, 3)); return { G, d }; };
  const b1 = box(120, '6 O₂ RELEASED · OXYGEN ATOMS', K.o2), b2 = box(840, '12 H₂O TAKEN IN · OXYGEN ATOMS', K.o2);
  const n1 = T(s, 440, 410, '6 x 2 = 12', 30, C.ink), n2 = T(s, 1160, 410, '12 x 1 = 12', 30, C.ink); const eq = T(s, 800, 350, '=', 54, C.ac);
  const v = div(el, 'pillp ac', { left: '500px', top: '470px' }, 'All the released oxygen can come from water');
  return { els: [...sp.map((e, i) => [e, terms[i][2], { dy: 10 }]), [b1.G, ['W3', 'Six', -0.1], { dy: 10 }], [b2.G, ['W3', 'Twelve', -0.1], { dy: 10 }], [n1, ['W3', 'twelve']], [n2, ['W3', 'exactly']], [eq, ['W3', 'exactly'], POP], [v, ['W4', 'So', -0.1]]],
    anim: t => { const a = tm(['W3', 'Six']), b = tm(['W3', 'Twelve']); b1.d.forEach((e, k) => e.style.opacity = t > a + k * 0.08 ? 1 : 0.15); b2.d.forEach((e, k) => e.style.opacity = t > b + k * 0.08 ? 1 : 0.15); sp[2].style.textDecoration = t > tm(['W4', 'twelve']) ? 'underline' : 'none'; } }; } }] });

EP.run({
  icons: ICN,
  jobs: [['pot', 'A pot plant grows', 'EVERY WEEK', ['H1', 'pot']], ['bub', 'Bubbles in a fish tank', 'IN THE SUN', ['H1', 'water']], ['stone', 'Grass under a stone', 'TURNS PALE', ['H1', 'Grass']]],
  scenes: S,
  stmt: { l2: 'Plants <span class="acc">restore</span> the air.', f: '<span class="lad">candle + mouse + <b>mint plant</b> → both survive</span>', t2: ['T1', 'Plants', -0.2], tf: ['T1', 'air'] },
  trap: { wrong: 'Priestley showed that plants need light', right: 'Ingenhousz showed that sunlight is essential', tWrong: ['X2', 'Priestley', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'Ingenhousz', -0.2], tSvg: ['X3', 'sunlight', -0.4],
    build: s => { sun(s, 330, 110, 36); const m = mk(s, 'g', {}); for (let k = 0; k < 3; k++) [-1, 1].forEach(sd => mk(m, 'ellipse', { cx: 150 + sd * 20, cy: 150 - k * 26, rx: 20, ry: 9, fill: K.chlF, stroke: K.chlD, 'stroke-width': 2 })); P(m, 'M150,190 L150,80', 'none', K.chlD, 4); cap(s, 150, 230, 'PRIESTLEY: AIR', { 'font-size': 14 }); cap(s, 330, 230, 'INGENHOUSZ: LIGHT', { 'font-size': 14 }); } },
  where: { type: 'Match-the-scientist questions and statements on the source of oxygen', at: ['E1', 'match'] },
  mcq: { q: 'Match each scientist to the finding.<div style="font:500 21px Poppins;line-height:1.5;margin-top:10px;display:flex;gap:40px"><div>P. Priestley<br>Q. Ingenhousz<br>R. Sachs<br>S. Engelmann</div><div>i. Glucose is stored as starch<br>ii. Blue and red light work best<br>iii. Plants restore the air<br>iv. Sunlight is essential</div></div>', opts: ['P-iv, Q-iii, R-i, S-ii', 'P-iii, Q-iv, R-i, S-ii', 'P-iii, Q-i, R-iv, S-ii', 'P-ii, Q-iv, R-i, S-iii'], right: 1 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['P-iii: plants restore air', ['A2', 'Priestley']], ['Q-iv: light is needed', ['A2', 'Ingenhousz']], ['R-i: glucose stored as starch', ['A2', 'Sachs']], ['S-ii: blue and red work best', ['A3', 'blue']]],
  recap: { title: 'Recap · early experiments', lines: ['<b>Priestley, 1770</b>: plants restore the air', '<b>Ingenhousz</b>: sunlight is essential', '<b>Sachs, about 1854</b>: glucose, stored as starch', '<b>Engelmann</b>: blue and red light work best', '<b>van Niel</b>: the oxygen comes from water'] },
  yq: ["What did Priestley's bell jar show?", "What did Engelmann's bacteria show?", 'Where does the oxygen in photosynthesis come from?'],
  next: { label: 'NEXT · EP 81', topic: 'Where Photosynthesis Takes Place and the Pigments' }
});
})();
