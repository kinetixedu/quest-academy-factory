// PUC Biology Ep 55: Secondary Growth - cambium, annual rings and bark (Living diagram, leaf green). Runner: ep.js
(() => {
const { C, mk, txt, cap, POP, lab, pol, tm, div, mix, attr } = EP;
// colour canon for this episode: xylem = water sky, phloem = food gold, cambium = accent green, cork brown
const XY = '#3A7FB0', XYf = '#CFE3F1', PH = '#C9962B', PHf = '#F3E3B5', CB = C.ac, CBf = '#BFE3CB', CK = '#7A5534', CKf = '#B98B5E',
  BR = '#2E2A24', SPR = '#F0D9A8', AUT = '#C08A4E', HW = '#8A5A2E', SWd = '#EED39C', CX = '#DDEBC8', PI = '#F6F0E2', EPI = '#5E9B48';
const arc = (cx, cy, r0, r1, a0, a1) => { const [x0, y0] = pol(cx, cy, r1, a0), [x1, y1] = pol(cx, cy, r1, a1), [x2, y2] = pol(cx, cy, r0, a1), [x3, y3] = pol(cx, cy, r0, a0), L = a1 - a0 > Math.PI ? 1 : 0;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r1},${r1} 0 ${L} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${r0},${r0} 0 ${L} 0 ${x3.toFixed(1)},${y3.toFixed(1)} Z`; };
const circ = (g, x, y, r, f, s = BR, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': w });
// a log cross-section: bark, sapwood, heartwood, n rings
const log = (g, x, y, R, n = 12, o = {}) => { const e = { rings: [] };
  e.bark = circ(g, x, y, R, CKf, BR, 3);
  for (let k = n; k >= 1; k--) { const r = (R - 12) * k / n, c = k > n * 0.55 ? (k % 2 ? '#F2DDAE' : '#D8B27A') : (k % 2 ? '#A8743F' : '#8A5A2E'); e.rings.unshift(circ(g, x, y, r, c, 'none', 0)); }
  e.hl = circ(g, x, y, (R - 12) * 0.55, 'none', 'none', 0); e.pith = circ(g, x, y, 5, '#5A3A1C', 'none', 0); return e; };

const S = [];
/* ---------- H: the stump ---------- */
S.push(EP.hook({ label: 'IN THE PARK', face: 'aarav', pill: ['Rings inside rings', ['H2', 'Rings', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['How does a stem get thicker?', ['H3', 'thicker']], ['Why light and dark rings?', ['H3', 'light']]],
  a: [['ANSWER 1', 'The cambium · adds new wood', ['H4', 'cambium']], ['ANSWER 2', 'The seasons · one ring a year', ['H4', 'seasons']]],
  chips: [['Vascular cambium', ['H5', 'vascular']], ['Annual rings', ['H5', 'annual']], ['Heartwood', ['H5', 'heartwood']], ['Sapwood', ['H5', 'sapwood']], ['Cork cambium', ['H5', 'cork']], ['Bark', ['H5', 'bark']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 300, fill: '#EEF3F6' }); mk(s, 'path', { d: 'M0,370 C220,356 560,380 784,364 L784,580 L0,580 Z', fill: '#9CC27A' });
    [[90, 200, 46], [690, 180, 56]].forEach(([x, y, r]) => { mk(s, 'rect', { x: x - 7, y, width: 14, height: 180, fill: '#8A5A2E' }); circ(s, x, y, r, '#6FA35A', '#3F6E35', 3); });
    mk(s, 'path', { d: 'M162,250 L162,420 C162,456 622,456 622,420 L622,250 Z', fill: CKf, stroke: BR, 'stroke-width': 4 });
    for (let k = 0; k < 9; k++) { const x = 190 + k * 50; mk(s, 'path', { d: `M${x},${290 + (k % 3) * 8} l${k % 2 ? 6 : -6},${100 + (k % 2) * 20}`, stroke: CK, 'stroke-width': 3, 'stroke-linecap': 'round' }); }
    const N = 12, R = []; for (let k = N; k >= 1; k--) R.unshift(mk(s, 'ellipse', { cx: 392, cy: 250, rx: 220 * k / (N + 0.6), ry: 74 * k / (N + 0.6), fill: k % 2 ? '#F2DDAE' : '#C99A5E', stroke: k === N ? BR : 'none', 'stroke-width': 3 }));
    mk(s, 'ellipse', { cx: 392, cy: 250, rx: 230, ry: 80, fill: 'none', stroke: BR, 'stroke-width': 4 });
    const cnt = div(el, 'tag', { left: '36px', top: '84px' }, '<span>RINGS 0</span>'), gh = div(el, 'ghost', { left: '180px', top: '88px' }, 'EXAMPLE FIGURES');
    return { els: [[cnt, ['H3', 'counted', -0.1]], [gh, ['H3', 'counted', 0.2], { dy: 8 }]], anim: t => { const t0 = tm(['H3', 'counted']), n = Math.floor(M.clamp((t - t0) / 2.6) * N + 0.001);
      M.setT(cnt.firstChild, 'RINGS ' + n); R.forEach((e, k) => { const on = k < n; e.setAttribute('stroke', on ? CB : k === N - 1 ? BR : 'none'); e.setAttribute('stroke-width', on ? 2.5 : 3); }); } };
  } }));

/* ---------- B: two ways to grow ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'TWO WAYS A PLANT GROWS', ghost: true, pill: ['Girth: the distance around the stem', ['B3', 'Girth', -0.1], 'ac'], build: (el, s) => {
  mk(s, 'line', { x1: 60, y1: 340, x2: 700, y2: 340, stroke: '#C9A27A', 'stroke-width': 6 });
  const stem = mk(s, 'line', { x1: 380, y1: 340, x2: 380, y2: 340, stroke: EPI, 'stroke-width': 10, 'stroke-linecap': 'round' }), root = mk(s, 'line', { x1: 380, y1: 340, x2: 380, y2: 340, stroke: '#B08A5A', 'stroke-width': 8, 'stroke-linecap': 'round' });
  const lv = [0, 1, 2].map(k => mk(s, 'ellipse', { rx: 34, ry: 14, fill: '#8CC26E', stroke: '#3F6E35', 'stroke-width': 2.5 }));
  const aU = mk(s, 'path', { d: 'M0,0 l-14,22 h28 Z', fill: CB }), aD = mk(s, 'path', { d: 'M0,0 l-12,-20 h24 Z', fill: CB });
  cap(s, 380, 462, 'PRIMARY GROWTH · LENGTH', { fill: C.ink });
  const cx = 1180, cy = 270, disc = circ(s, cx, cy, 60, SWd, BR, 4), ring = circ(s, cx, cy, 80, 'none', CB, 4); ring.setAttribute('stroke-dasharray', '12 8');
  const inner = circ(s, cx, cy, 40, '#D8B27A', 'none', 0);
  cap(s, cx, 462, 'SECONDARY GROWTH · GIRTH', { fill: C.ink });
  const gt = cap(s, cx + 150, 120, 'GIRTH', { fill: CB, 'font-size': 18 });
  const yes = div(el, 'chp', { left: '840px', top: '494px', background: '#E3F1E7', color: '#1F6B3F' }, 'Yes: most dicots, gymnosperms'), no = div(el, 'chp', { left: '1250px', top: '494px', background: '#FBE9E9', color: '#8A1C1C' }, 'No: most monocots, grasses');
  return { els: [[yes, ['B3', 'dicots', -0.1]], [no, ['B3', 'monocots', -0.1]]], fades: [[gt, ['B3', 'Girth']]], anim: t => {
    const g = M.io((t - tm(['B2', 'longer'])) / 1.6) * 0.75 + 0.25 * M.clamp((t - tm('B1')) / 0.6), h = 210 * g, rd = 44 * g;
    attr(stem, 'y2', (340 - h).toFixed(1)); attr(root, 'y2', (340 + rd).toFixed(1));
    lv.forEach((e, k) => { const y = 340 - h * (0.35 + 0.25 * k); attr(e, 'cx', 380 + (k % 2 ? 36 : -36)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = M.clamp(g * 3 - k); });
    attr(aU, 'transform', `translate(380 ${(340 - h - 34).toFixed(1)})`); attr(aD, 'transform', `translate(380 ${(340 + rd + 30).toFixed(1)})`);
    aU.style.opacity = aD.style.opacity = M.clamp((t - tm(['B2', 'tips'])) / 0.3);
    const w = M.io((t - tm(['B2', 'thicker'])) / 1.8), r = 60 + 84 * w + 4 * Math.sin(t * 2) * w; attr(disc, 'r', r.toFixed(1)); attr(inner, 'r', (r * 0.6).toFixed(1)); attr(ring, 'r', (r + 18).toFixed(1));
    ring.style.opacity = M.clamp((t - tm(['B3', 'Girth'])) / 0.3); ring.style.strokeDashoffset = ((t * 30) % 20).toFixed(1); attr(gt, 'x', (cx + r + 70).toFixed(1)); attr(gt, 'y', cy + 6);
  } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['TREE TRUNK', 'CUT ACROSS', 'CAMBIUM ZONE'], scales: ['x1', 'x3', 'x40'],
  info: [['RUNG 1 OF 3', 'Tree trunk', 'Thick and woody, wrapped in rough bark.', 'It got this thick by secondary growth.'],
    ['RUNG 2 OF 3', 'Cut across', 'Rings of wood fill the middle.', 'Bark wraps the outside.'],
    ['RUNG 3 OF 3', 'Cambium zone', 'A thin band of dividing cells.', 'Xylem inside, phloem outside.']],
  av: { who: 'Aarav', text: 'New wood is made inside!', tin: ['Z5', 'phloem', 0.6], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 300, 70], build: g => {
      mk(g, 'path', { d: 'M0,470 C300,456 760,476 1056,462 L1056,526 L0,526 Z', fill: '#9CC27A' });
      mk(g, 'path', { d: 'M440,470 C450,380 450,200 460,90 L600,90 C610,200 610,380 620,470 Z', fill: CKf, stroke: BR, 'stroke-width': 4 });
      mk(g, 'path', { d: 'M470,110 C400,80 340,60 300,30 M590,110 C660,80 720,60 780,40', stroke: CK, 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' });
      [[300, 30, 70], [780, 40, 80], [530, 20, 90]].forEach(([x, y, r]) => circ(g, x, y, r, '#6FA35A', '#3F6E35', 3));
      for (let k = 0; k < 7; k++) mk(g, 'path', { d: `M${470 + k * 20},${140 + (k % 3) * 30} l${k % 2 ? 4 : -4},${260}`, stroke: CK, 'stroke-width': 3, 'stroke-linecap': 'round' });
      return { labs: [[lab(g, 610, 250, 760, 250, 'Bark'), ['Z2', 'bark']], [lab(g, 470, 380, 300, 380, 'Trunk', 'end'), ['Z2', 'trunk']]] }; } },
    { at: 'Z3', focus: [700, 263, 60], build: g => { const L = log(g, 470, 263, 230, 14);
      return { labs: [[lab(g, 470 + 80, 263 - 40, 820, 120, 'Rings of wood'), ['Z3', 'Rings']], [lab(g, 470 + 222, 263 + 40, 820, 400, 'Bark'), ['Z3', 'bark']]] }; } },
    { at: 'Z4', build: g => { const cells = [];
      const col = (x0, n, w, h, f, s, y0 = 50) => { const out = []; for (let i = 0; i < n; i++) for (let j = 0; j < Math.floor(420 / h); j++) out.push(mk(g, 'rect', { x: x0 + i * w, y: y0 + j * h, width: w - 4, height: h - 4, rx: 5, fill: f, stroke: s, 'stroke-width': 2 })); return out; };
      col(60, 4, 74, 70, XYf, XY); col(60 + 4 * 74 + 10, 1, 30, 70, XYf, XY);
      const cb = col(410, 2, 22, 35, CBf, CB); const ph = col(462, 3, 52, 42, PHf, PH); col(620, 3, 46, 30, CKf, CK);
      const vs = []; for (let j = 0; j < 6; j++) vs.push(mk(g, 'circle', { cx: 97 + (j % 2) * 148, cy: 85 + j * 70, r: 22, fill: '#fff', stroke: XY, 'stroke-width': 3 }));
      const aL = mk(g, 'path', { d: 'M400,486 L200,486 M214,474 L200,486 L214,498', stroke: XY, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), aR = mk(g, 'path', { d: 'M460,486 L620,486 M606,474 L620,486 L606,498', stroke: PH, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
      const tI = txt(g, 200, 40, 'INSIDE · CENTRE', { 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 }), tO = txt(g, 700, 40, 'OUTSIDE', { 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600, 'text-anchor': 'middle' });
      return { labs: [[lab(g, 432, 250, 790, 120, 'Vascular cambium'), ['Z4', 'vascular']], [lab(g, 200, 300, 790, 220, 'Secondary xylem'), ['Z5', 'xylem']], [lab(g, 540, 330, 790, 330, 'Secondary phloem'), ['Z5', 'phloem']]],
        fades: [[aL, ['Z5', 'Inside']], [aR, ['Z5', 'Outside']], [tI, ['Z5', 'Inside']], [tO, ['Z5', 'Outside']]],
        anim: t => { const p = 0.5 + 0.5 * Math.sin(t * 4); cb.forEach((c, i) => c.setAttribute('fill', mix(CBf, '#7CCB96', i % 2 ? p : 1 - p))); } }; } }] }));

/* ---------- L: the cambial ring, step by step ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'THE CAMBIAL RING · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Intrafascicular cambium', 'a strip inside each vascular bundle'], ['Interfascicular cambium', 'from medullary ray cells, between bundles'], ['Cambial ring', 'the strips join into one complete ring'], ['Cuts off new cells', 'more xylem inside, less phloem outside'], ['Old phloem crushed', 'primary xylem stays near the centre']], LT) }) },
  { pos: 'R', label: 'YOUNG DICOT STEM · CUT ACROSS', build: (el, s) => {
    const cx = 392, cy = 300, n = 6;
    circ(s, cx, cy, 228, CX, EPI, 6); const pith = circ(s, cx, cy, 70, PI, 'none', 0);
    const sx = mk(s, 'path', { fill: XYf, stroke: XY, 'stroke-width': 2 }), sp = mk(s, 'path', { fill: PHf, stroke: PH, 'stroke-width': 2 });
    const ringC = circ(s, cx, cy, 116, 'none', CB, 7), B = [];
    for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / n, w = 0.32;
      B.push({ a, x: mk(s, 'path', { d: arc(cx, cy, 76, 110, a - w, a + w), fill: XYf, stroke: XY, 'stroke-width': 2.5 }), c: mk(s, 'path', { d: arc(cx, cy, 111, 121, a - w, a + w), fill: CB, stroke: 'none' }), p: mk(s, 'path', { fill: PHf, stroke: PH, 'stroke-width': 2.5 }),
        i: mk(s, 'path', { d: arc(cx, cy, 111, 121, a + w, a + 2 * Math.PI / n - w), fill: CB, stroke: 'none' }) }); }
    const lg = div(el, 'lg', { left: '36px', top: '516px' }, [['XYLEM', XY], ['PHLOEM', PH], ['CAMBIUM', CB], ['PITH', '#D8CDB4']].map(([a, c]) => `<span><b style="background:${c}"></b>${a}</span>`).join(''));
    return { els: [[lg, ['L1', null, 0.6], { dy: 8 }]], anim: t => { const [t1, t2, t3, t4, t5] = LT.map(tm);
      const s4 = M.io((t - t4 - 0.3) / 2.6), rc = 116 + 46 * s4, crush = M.io((t - t5) / 1.2);
      ringC.style.opacity = M.clamp((t - t3) / 0.4).toFixed(3); attr(ringC, 'r', rc.toFixed(1)); ringC.setAttribute('stroke', mix(CB, '#7CCB96', t > t3 ? 0.5 + 0.5 * Math.sin(t * 4) : 0));
      attr(sx, 'd', s4 > 0.01 ? arc(cx, cy, 111, rc - 4, 0, 2 * Math.PI - 0.0001).replace(/A(\d+(\.\d+)?),\S+ 0 1 1/g, (m) => m) : 'M0,0'); sx.style.opacity = s4 > 0.01 ? 1 : 0;
      const pr0 = rc + 4, pr1 = rc + 4 + 14 * s4; attr(sp, 'd', s4 > 0.01 ? arc(cx, cy, pr0, Math.max(pr1, pr0 + 0.5), 0, 2 * Math.PI - 0.0001) : 'M0,0'); sp.style.opacity = s4 > 0.01 ? 1 : 0;
      B.forEach((b, k) => { const w = 0.32, th = 34 * (1 - 0.7 * crush), r0 = Math.max(pr1, 121); attr(b.p, 'd', arc(cx, cy, r0, r0 + th, b.a - w * (1 + 0.15 * crush), b.a + w * (1 + 0.15 * crush)));
        b.p.setAttribute('fill', mix(PHf, '#CFC6B4', crush)); b.p.setAttribute('stroke', mix(PH, '#9A917F', crush));
        const lit = t >= t1 - 0.2 && t < t2 - 0.2 ? 0.5 + 0.5 * Math.sin(t * 5 + k) : 0; b.c.setAttribute('fill', mix(CB, '#9FE0B4', lit)); b.c.style.opacity = s4 > 0.02 ? 0 : 1;
        b.i.style.opacity = s4 > 0.02 ? 0 : M.clamp((t - t2 - k * 0.15) / 0.4).toFixed(3); });
      pith.setAttribute('fill', mix(PI, '#EDE3C8', crush * 0.5));
    } }; } }] });

/* ---------- C: annual rings ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'ANNUAL RINGS · ONE RING A YEAR', pill: ['Spring wood + autumn wood = one annual ring', ['C4', 'together', -0.1], 'ac', { left: '880px' }], build: (el, s) => {
  const ch = EP.chain(el, [['SPRING · EARLY WOOD', ['C2', 'spring']], ['WINTER · LATE WOOD', ['C3', 'winter']], ['ONE ANNUAL RING', ['C4', 'annual']], ['COUNT = AGE', ['C4', 'Count']]]);
  const cx = 430, cy = 340, NY = 8, YW = 24, R0 = 18, bark = circ(s, cx, cy, 40, CKf, BR, 3), bands = [];
  for (let y = NY - 1; y >= 0; y--) { bands.unshift([circ(s, cx, cy, 0, AUT, 'none', 0), circ(s, cx, cy, 0, SPR, 'none', 0)]); }
  const core = circ(s, cx, cy, R0, '#D8B27A', 'none', 0); circ(s, cx, cy, 5, '#5A3A1C', 'none', 0);
  const hl = circ(s, cx, cy, 0, 'none', CB, 4); hl.setAttribute('stroke-dasharray', '10 7');
  const yr = div(el, 'tag', { left: '36px', top: '150px' }, '<span>YEAR 3</span>'), gh = div(el, 'ghost', { left: '36px', top: '204px' }, 'EXAMPLE FIGURES');
  const pan = (x, nm, f, vr, n, d, cn, sx) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x, y: 150, width: 340, height: 250, rx: 14, fill: f, stroke: '#D9CDB4', 'stroke-width': 2 });
    for (let i = 0; i < n; i++) circ(g, x + 60 + (i % cn) * sx + (Math.floor(i / cn) % 2) * sx / 2, 196 + Math.floor(i / cn) * d, vr, '#fff', XY, 3);
    cap(g, x + 170, 430, nm, { fill: C.ink }); return g; };
  const pS = pan(840, 'SPRING WOOD · WIDE VESSELS', '#F7E9C8', 26, 8, 76, 3, 90), pA = pan(1210, 'AUTUMN WOOD · NARROW VESSELS', '#D9AE78', 9, 20, 46, 5, 50);
  const dS = cap(s, 1010, 462, 'LIGHT · LOWER DENSITY', { 'font-size': 15 }), dA = cap(s, 1380, 462, 'DARK · HIGHER DENSITY', { 'font-size': 15 });
  return { els: [[pS, ['C2', 'wide', -0.2], { ...POP, sc: 0.85 }], [pA, ['C3', 'narrow', -0.2], { ...POP, sc: 0.85 }], [yr, ['C1', null, 0.4]], [gh, ['C4', 'Count'], { dy: 8 }]], fades: [[dS, ['C2', 'light']], [dA, ['C3', 'darker']]], anim: t => {
    const c = ch.run(t, tm('C1') + 0.4), a2 = tm(['C2', 'spring']), a3 = tm(['C3', 'winter']), a4 = tm(['C4', 'annual']), e4 = tm('D1') - 0.6;
    const p = t < a2 ? 3 : t < a3 ? 3 + 0.7 * M.io((t - a2) / Math.max(1, a3 - a2 - 0.5)) : t < a4 ? 3.7 + 0.3 * M.io((t - a3) / Math.max(1, a4 - a3 - 0.6)) : 4 + 4 * M.clamp((t - a4 - 1.2) / Math.max(1, e4 - a4 - 1.2));
    let R = R0; bands.forEach(([au, sp], y) => { const f = M.clamp(p - y), rs = R + YW * 0.7 * M.clamp(f / 0.7), ra = rs + YW * 0.3 * M.clamp((f - 0.7) / 0.3);
      attr(sp, 'r', rs.toFixed(1)); attr(au, 'r', ra.toFixed(1)); R = ra; });
    attr(bark, 'r', (R + 12).toFixed(1));
    const kNew = Math.max(0, Math.floor(p + 1e-6) - 1), on = t >= a4 - 0.1 && t < a4 + 1.3; attr(hl, 'r', (R0 + YW * (kNew + 1)).toFixed(1)); hl.style.opacity = on ? 1 : 0; hl.style.strokeDashoffset = ((t * 30) % 17).toFixed(1);
    M.setT(yr.firstChild, 'YEAR ' + Math.max(3, Math.floor(p + 1e-6)) + (t > tm(['C4', 'Count']) ? ' · RINGS ' + Math.floor(p + 1e-6) : ''));
  } }; } }] });

/* ---------- D: heartwood and sapwood ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'HEARTWOOD · DURAMEN', pill: ['No water transport · gives support', ['D4', 'heartwood', -0.1], 'bad'], build: (el, s) => {
    const L = log(s, 240, 290, 190, 14); const glow = circ(s, 240, 290, 96, 'none', CB, 5); glow.setAttribute('stroke-dasharray', '12 8');
    const it = ['TANNINS', 'RESINS', 'OILS', 'GUMS'].map((w, i) => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 470, y: 110 + i * 62, width: 270, height: 48, rx: 10, fill: '#F1E2CC' }); cap(g, 605, 140 + i * 62, w, { fill: HW, 'font-size': 18 }); return [g, ['D2', w.toLowerCase()]]; });
    const rs = div(el, 'chp', { left: '470px', top: '374px', background: '#E3F1E7', color: '#1F6B3F' }, 'Resists insects, microbes');
    return { els: [...it, [rs, ['D2', 'insects', -0.1]]], labs: [[lab(s, 270, 250, 300, 80, 'Heartwood'), ['D2', 'heartwood']]], anim: t => { glow.style.opacity = M.clamp((t - tm(['D2', 'heartwood'])) / 0.3) * (1 - M.clamp((t - tm('D3')) / 0.3)); glow.style.strokeDashoffset = ((t * 30) % 20).toFixed(1); } }; } },
  { pos: 'R', label: 'SAPWOOD · ALBURNUM', tin: ['D3', null, -0.3], pill: ['Carries water and minerals · root to leaf', ['D3', 'carries', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 190, y: 120, width: 400, height: 330, fill: CKf, stroke: BR, 'stroke-width': 3 });
    const sw = [mk(s, 'rect', { x: 210, y: 120, width: 110, height: 330, fill: SWd }), mk(s, 'rect', { x: 460, y: 120, width: 110, height: 330, fill: SWd })];
    mk(s, 'rect', { x: 320, y: 120, width: 140, height: 330, fill: HW });
    for (let k = 0; k < 5; k++) mk(s, 'line', { x1: 220 + k * 24, y1: 120, x2: 220 + k * 24, y2: 450, stroke: '#D8B27A', 'stroke-width': 2 });
    const dr = []; for (let k = 0; k < 10; k++) dr.push({ x: k < 5 ? 230 + k * 20 : 480 + (k - 5) * 20, ph: k * 0.21, e: mk(s, 'path', { d: 'M0,-9 C5,-2 6,3 0,7 C-6,3 -5,-2 0,-9 Z', fill: XY }) });
    cap(s, 390, 106, 'TO THE LEAF', { fill: XY }); cap(s, 390, 480, 'FROM THE ROOT', { fill: XY });
    return { labs: [[lab(s, 265, 300, 140, 300, 'Sapwood', 'end'), ['D3', 'sapwood']], [lab(s, 390, 200, 680, 200, 'Heartwood'), ['D3', 'sapwood', 0.4]]], anim: t => { const on = M.clamp((t - tm(['D3', 'carries'])) / 0.4);
      dr.forEach(d => { const v = (t * 0.35 + d.ph) % 1; attr(d.e, 'transform', `translate(${d.x} ${(440 - 310 * v).toFixed(1)})`); d.e.style.opacity = (on * Math.min(1, 6 * v, 6 * (1 - v))).toFixed(3); }); } }; } }] });

/* ---------- U: cork cambium and bark + think ---------- */
const TH = { q: 'Aarav peels the bark off a dry twig. Does the secondary phloem come off with it?', opts: ['Yes, it is part of the bark', 'No, it stays on the wood'], right: 0, why: 'Yes. It lies outside the vascular cambium, so it is bark.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'CORK CAMBIUM · PERIDERM', tout: 'U4', build: (el, s) => {
    const rows = (x, n, w, f, st, y0 = 120, h = 46) => { const a = []; for (let i = 0; i < n; i++) for (let j = 0; j < 6; j++) a.push(mk(s, 'rect', { x: x + i * w, y: y0 + j * h, width: w - 4, height: h - 4, rx: 5, fill: f, stroke: st, 'stroke-width': 2 })); return a; };
    rows(40, 3, 60, CX, '#8BB070'); const pd = rows(220, 2, 44, '#EFE2A6', '#B59A3C'); const pg = rows(308, 1, 30, CBf, CB);
    const ck = []; for (let i = 0; i < 5; i++) ck.push(rows(338 + i * 38, 1, 38, CKf, CK));
    const ep = [mk(s, 'path', { d: 'M532,120 L548,120 L548,250 L540,262 L532,250 Z', fill: EPI }), mk(s, 'path', { d: 'M532,262 L540,274 L548,262 L548,396 L532,396 Z', fill: EPI })];
    const br = mk(s, 'path', { d: 'M220,104 L220,92 L528,92 L528,104', stroke: C.ink, 'stroke-width': 3, fill: 'none' }), brT = cap(s, 374, 82, 'PERIDERM', { fill: C.ink, 'font-size': 17 });
    cap(s, 120, 440, 'CORTEX', {}); cap(s, 450, 440, 'OUTSIDE  ›', {});
    return { labs: [[lab(s, 548, 140, 600, 140, 'Epidermis'), ['U1', 'epidermis']], [lab(s, 450, 330, 600, 250, 'Phellem (cork)'), ['U2', 'phellem']], [lab(s, 323, 380, 600, 360, 'Phellogen'), ['U2', 'phellogen']], [lab(s, 264, 300, 600, 470, 'Phelloderm'), ['U2', 'phelloderm']]],
      fades: [[br, ['U2', 'periderm', -0.2]], [brT, ['U2', 'periderm']]], anim: t => {
        const tb = tm(['U1', 'breaks']), cr = M.io((t - tb) / 0.6); attr(ep[0], 'transform', `translate(${(10 * cr).toFixed(1)} ${(-14 * cr).toFixed(1)}) rotate(${(8 * cr).toFixed(1)} 540 120)`); attr(ep[1], 'transform', `translate(${(10 * cr).toFixed(1)} ${(14 * cr).toFixed(1)}) rotate(${(-8 * cr).toFixed(1)} 540 396)`);
        const g0 = tm(['U2', 'cork', 0, 1]); ck.forEach((c, i) => { const o = M.clamp((t - g0 - i * 0.35) / 0.3); c.forEach(e => e.style.opacity = o.toFixed(3)); });
        const p = t > tm(['U2', 'cork']) ? 0.5 + 0.5 * Math.sin(t * 5) : 0; pg.forEach(e => e.setAttribute('fill', mix(CBf, '#7CCB96', p)));
        pd.forEach(e => e.style.opacity = M.clamp((t - tm(['U2', 'secondary'])) / 0.4).toFixed(3)); } }; } },
  { pos: 'R', label: 'BARK · ALL OUTSIDE THE VASCULAR CAMBIUM', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const L = [['SECONDARY XYLEM', 40, 230, XYf, XY], ['', 270, 14, CB, CB], ['SECONDARY PHLOEM', 284, 120, PHf, PH], ['', 404, 50, '#EFE2A6', '#B59A3C'], ['', 454, 16, CBf, CB], ['', 470, 110, CKf, CK]];
    L.forEach(([n, x, w, f, st]) => { mk(s, 'rect', { x, y: 150, width: w, height: 260, fill: f, stroke: st, 'stroke-width': 2 }); if (n) cap(s, x + w / 2, 440, n, { 'font-size': 14, fill: st }); });
    const bk = mk(s, 'path', { d: 'M284,134 L284,118 L580,118 L580,134', stroke: CK, 'stroke-width': 4, fill: 'none' }), bT = cap(s, 432, 104, 'BARK', { fill: CK, 'font-size': 20 });
    const pr = mk(s, 'path', { d: 'M404,452 L404,470 L580,470 L580,452', stroke: C.ink, 'stroke-width': 3, fill: 'none' }), pT = cap(s, 492, 496, 'PERIDERM', { fill: C.ink, 'font-size': 14 });
    return { labs: [[lab(s, 277, 260, 640, 240, 'Vascular cambium'), ['U3', 'vascular']]], fades: [[bk, ['U3', 'every', -0.2]], [bT, ['U3', 'every']], [pr, ['U3', 'periderm', -0.2]], [pT, ['U3', 'periderm']]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Does', -0.1], why: ['U5', 'outside'] })] });

/* ---------- W: worked example ---------- */
const zone = k => s => { const L = log(s, 248, 145, 122, 12); const [hi] = [mk(s, 'circle', { cx: 248, cy: 145, r: [118, 92, 52][k], fill: 'none', stroke: CB, 'stroke-width': 6, 'stroke-dasharray': '10 7' })];
  if (k === 0) { hi.setAttribute('r', 117); } if (k === 1) L.rings.forEach((e, i) => { if (i < 7) e.style.opacity = 0.35; }); if (k === 2) L.rings.forEach((e, i) => { if (i >= 7) e.style.opacity = 0.35; }); if (k === 0) L.rings.forEach(e => e.style.opacity = 0.35);
  return { anim: t => hi.style.strokeDashoffset = ((t * 30) % 17).toFixed(1) }; };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · NAME THREE ZONES OF A LOG', svg: false, build: el => {
  const gh = div(el, 'ghost', { right: '28px', top: '22px' }, 'EXAMPLE FIGURES');
  const r = EP.cols(el, [['ZONE 1 · ROUGH OUTER LAYER', 'Bark', 'ALL OUTSIDE THE VASCULAR CAMBIUM', zone(0), ['W2', 'Zone', -0.1], ['W2', 'Bark', -0.1], ['W2', 'Bark', 0.3]],
    ['ZONE 2 · PALE WOOD', 'Sapwood', 'STILL CARRIES WATER', zone(1), ['W3', 'Zone', -0.1], ['W3', 'Sapwood', -0.1], ['W3', 'Sapwood', 0.3]],
    ['ZONE 3 · DARK CENTRE', 'Heartwood', '12 RINGS = ABOUT 12 YEARS', zone(2), ['W4', 'Zone', -0.1], ['W4', 'Heartwood', -0.1], ['W5', 'Twelve']]]);
  r.els.push([gh, ['W5', 'Twelve'], { dy: 8 }]); return r; } }] });

EP.run({
  icons: { stump: ['M5 9c0-2 3-3.5 7-3.5s7 1.5 7 3.5v9c0 2-3 3.5-7 3.5S5 20 5 18Z', 'M5 9c0 2 3 3.5 7 3.5s7-1.5 7-3.5', 'M9.5 9c0 .7 1.1 1.2 2.5 1.2s2.5-.5 2.5-1.2-1.1-1.2-2.5-1.2-2.5.5-2.5 1.2Z'],
    door: ['M6 21V3h12v18', 'M3 21h18', 'M15 12h.01', 'M9 7h6v4H9Z'], bat: ['M15 3l5 5-9 10.5-3.5-3.5Z', 'M7.5 15L3 21'] },
  jobs: [['stump', 'A tree stump', 'IN THE PARK', ['H1', 'stump']], ['door', 'A wooden door', 'AT HOME', ['H1', 'door']], ['bat', 'A cricket bat', 'ALL MADE OF WOOD', ['H1', 'bat']]],
  scenes: S,
  stmt: { l2: 'Xylem <span class="acc">inside</span>, phloem outside.', f: '<span class="lad"><b>vascular cambium</b> · secondary xylem in · secondary phloem out</span>', t2: ['T1', 'The', -0.2], tf: ['T1', 'phloem', -0.1] },
  trap: { wrong: 'Bark is only the dead cork outside', right: 'Bark is every tissue outside the vascular cambium', tWrong: ['X2', 'bark', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'every', -0.3], tSvg: ['X3', 'includes', -0.4],
    build: s => { [[20, 110, PHf, PH], [130, 50, '#EFE2A6', '#B59A3C'], [180, 14, CBf, CB], [194, 90, CKf, CK]].forEach(([x, w, f, st]) => mk(s, 'rect', { x: x + 120, y: 70, width: w, height: 150, fill: f, stroke: st, 'stroke-width': 2 }));
      mk(s, 'rect', { x: 60, y: 70, width: 70, height: 150, fill: XYf, stroke: XY, 'stroke-width': 2 }); mk(s, 'rect', { x: 130, y: 70, width: 10, height: 150, fill: CB });
      mk(s, 'path', { d: 'M140,56 L140,44 L404,44 L404,56', stroke: CK, 'stroke-width': 4, fill: 'none' }); cap(s, 272, 34, 'BARK', { fill: CK, 'font-size': 17 }); cap(s, 272, 252, 'PHLOEM + PERIDERM', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: spring vs autumn wood, heartwood vs sapwood, what bark contains', at: ['E1', 'statement'] },
  mcq: { q: 'Which of these statements are correct?<div class="sl"><b>I</b>Spring wood has wide vessels and a lower density.</div><div class="sl"><b>II</b>Heartwood conducts water from root to leaf.</div><div class="sl"><b>III</b>Phellogen cuts off phellem on its outer side.</div><div class="sl"><b>IV</b>Interfascicular cambium forms from medullary ray cells.</div>',
    opts: ['I, III and IV only', 'I and II only', 'II, III and IV only', 'I, II, III and IV'], right: 0 }, mcqAt: ['Q1', 'Read', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">A</b> (I, III, IV)', ['A1', 3, 0.1]], ['<b style="color:var(--red)">II</b> is false', ['A2', 'Two']], ['Sapwood conducts, not heartwood', ['A2', 'Sapwood']], ['<b style="color:var(--ok)">I, III, IV</b> are true', ['A3', 'One']], ['Medullary rays: interfascicular', ['A3', 'medullary']]],
  recap: { title: 'Recap · secondary growth', lines: ['<b>Vascular cambium</b>: secondary xylem inside, secondary phloem outside', '<b>Cambial ring</b>: intrafascicular + interfascicular (medullary rays)', '<b>Annual ring</b>: spring wood (light, wide vessels) + autumn wood (dark)', '<b>Heartwood</b>: dark, support only · <b>Sapwood</b>: conducts water', '<b>Bark</b>: periderm (phellem, phellogen, phelloderm) + secondary phloem'] },
  yq: ['On which side does the cambium make secondary xylem?', 'What makes one annual ring?', 'Name the three layers of the periderm.'],
  next: { label: 'NEXT · EP 56', topic: 'Skin and cheek, two coverings: Epithelial Tissue' }
});
})();
