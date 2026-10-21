// PUC Biology Ep 23: Bryophytes - liverworts and mosses (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
// SVG pops scale about their own centre (not the svg origin)
const _vis = M.vis; M.vis = (el, t, a, b, o = {}) => { if (o.sc != null && el instanceof SVGElement && !el.hasAttribute('transform') && !el._tb) { el._tb = 1; el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; } return _vis(el, t, a, b, o); };
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// canon + batch colours: gametophyte green, sporophyte tan-brown, water sky, nucleus violet
const BR = '#2E2A24', CHL = '#3E9B5F', MOSS = '#6DB27A', DARK = '#1F5E37', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', GAM = '#3E9B5F', SPO = '#A8742A', SPOF = '#E3C68E';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const LBL = (g, px, py, lx, ly, s, an = 'start', el) => { const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const runL = (l, t, t0, tout = 1e9) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, tout, { ...POP, sc: 0.2, outDur: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - tout) / 0.2))).toFixed(3); if (t > tout + 0.2) { l.ln.style.opacity = 0; } else l.ln.style.opacity = ''; };

Object.assign(M.IC, {
  moss: ['M2 21h20', 'M6 21v-7', 'M12 21v-10', 'M18 21v-6', ci(6, 12, 1.8), ci(12, 9, 1.8), ci(18, 13, 1.8), 'M3 21c1-2.4 4-2.4 5 0', 'M9 21c1-2.4 5-2.4 6 0', 'M15 21c1-2.4 4-2.4 5 0'],
  liver: ['M12 20c-5 0-9-3-9-6 0-2 2-3 4-2 0-3 2-5 5-5s5 2 5 5c2-1 4 0 4 2 0 3-4 6-9 6Z', ci(9, 13, 1.4), ci(15, 13, 1.4)],
  frog: [ci(8, 7, 2.4), ci(16, 7, 2.4), 'M4 14c0-4 3.6-6 8-6s8 2 8 6-3.6 6-8 6-8-2-8-6Z', 'M9 15c1.6 1.2 4.4 1.2 6 0'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  ground: ['M2 18h20', 'M5 18v-3', 'M10 18v-6', 'M15 18v-4', 'M19 18v-2'],
  thread: ['M3 19c3-2 3-6 6-8s6 0 8-3 2-4 4-5', 'M9 11l-2-3', 'M17 8l1 3'],
  rock: ['M3 18c0-5 3-9 8-9 6 0 10 4 10 9Z', 'M2 18h20'],
  rain: ['M7 4l-2 5', 'M13 4l-2 5', 'M19 4l-2 5', 'M3 19h18', 'M5 16c2-2 4-2 6 0s4 2 6 0'],
  fire: ['M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-3-2-5-3 3-5 6-5 9 0 4 3 7 7 7Z'],
  leafy: ['M12 22V4', 'M12 8l-4-2', 'M12 11l4-2', 'M12 14l-4-2', 'M12 17l4-2', 'M12 5l3-2', 'M12 22l-3 0', 'M12 22l3 0'],
  stalk: ['M12 22V9', ci(12, 6, 3)],
  cup: ['M5 10h14l-2 8H7Z', ci(10, 13, 1.2), ci(14, 13, 1.2)],
  foot: ['M8 20c0-3 2-5 4-5s4 2 4 5Z', 'M12 15V4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tR1 = T0('R1'), tT = T0('T1'), tL1 = T0('L1'), tL6 = T0('L6'), tU1 = T0('U1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tL1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['moss', 'Green velvet', 'ON THE COMPOUND WALL', 'velvet'], ['moss', 'A soft cushion', 'ON A DAMP STEP', 'cushion'], ['liver', 'Flat green plates', 'BY A DRIPPING TAP', 'plates']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px;width:${i === 0 ? 360 : 360}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('moss', 22, '#fff', 2.4)}BRYOPHYTE</div></div>`).join('');
// Diya's compound wall in the monsoon (hand-built scene)
const gs = $('#gS');
const sky = mk(gs, 'rect', { x: 0, y: 0, width: 520, height: 390, rx: 12, fill: '#DCE6EC' });
mk(gs, 'path', { d: 'M0 320 H520 V378 a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z', fill: '#B9AE96' });
mk(gs, 'rect', { x: 40, y: 110, width: 440, height: 212, fill: '#D9A585', stroke: BR, 'stroke-width': 4 });
for (let r = 0; r < 6; r++) { mk(gs, 'line', { x1: 40, y1: 145 + r * 35, x2: 480, y2: 145 + r * 35, stroke: '#B97E5F', 'stroke-width': 2 });
  for (let c = 0; c < 9; c++) { const x = 40 + c * 55 + (r % 2 ? 27 : 0); if (x > 42 && x < 478) mk(gs, 'line', { x1: x, y1: 110 + r * 35, x2: x, y2: 145 + r * 35, stroke: '#B97E5F', 'stroke-width': 2 }); } }
mk(gs, 'rect', { x: 30, y: 96, width: 460, height: 18, rx: 4, fill: '#C79478', stroke: BR, 'stroke-width': 3 });
const MP = [[70, 112, 50, 14], [160, 112, 40, 12], [300, 112, 60, 14], [420, 112, 44, 12], [90, 318, 60, 16], [220, 318, 46, 14], [380, 318, 70, 16], [60, 220, 26, 34], [458, 240, 24, 40]].map(([x, y, rx, ry]) => mk(gs, 'ellipse', { cx: x, cy: y, rx, ry, fill: MOSS, stroke: DARK, 'stroke-width': 2.5 }));
const RAIN = []; for (let k = 0; k < 18; k++) RAIN.push(mk(gs, 'line', { x1: 0, y1: 0, x2: -6, y2: 18, stroke: WAT, 'stroke-width': 2.5, 'stroke-linecap': 'round' }));
const ML = LBL(gs, 300, 112, 330, 50, 'Moss', 'start'); ML.tx.setAttribute('class', ''); ML.tx.setAttribute('font-family', 'Poppins'); ML.tx.setAttribute('font-size', 20); ML.tx.setAttribute('font-weight', 600); ML.tx.setAttribute('fill', C.ink);
const tSum = wt('H3', 'summer'), tRainBack = wt('H3', 'rain');
const AM = [['frog', 'A frog', 'lives on land, breeds in water', wt('H4', 'land')], ['moss', 'A bryophyte', 'lives on land, needs water to reproduce', wt('H4', 'water')]];
$('#ams').innerHTML = AM.map(([ic, n, d], i) => `<div class="dr" id="am${i}" style="top:${84 + i * 140}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const AMP = document.createElement('div'); AMP.className = 'pillp ac'; AMP.style.cssText = 'left:36px;top:390px'; AMP.textContent = 'Amphibians of the plant kingdom'; $('#hw').appendChild(AMP);

/* ---------- D ---------- */
const DR = [['ground', 'Flat or upright', 'lies on the ground or stands up', wt('D2', 'flat')], ['thread', 'Rhizoids', 'thin threads of one cell or many', wt('D3', 'rhizoids')], ['leafy', 'No true root, stem, leaf', 'only parts that look like them', wt('D3', 'no')]];
$('#drs').innerHTML = DR.map(([ic, n, d], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 140}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const dh = $('#dhS'), HC = mk(dh, 'g', {});
mk(HC, 'rect', { x: 100, y: 84, width: 584, height: 250, rx: 40, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 5 });
mk(HC, 'rect', { x: 116, y: 100, width: 552, height: 218, rx: 30, fill: '#F3F7EA', stroke: CHL, 'stroke-width': 2.5 });
mk(HC, 'circle', { cx: 392, cy: 209, r: 86, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3.5 });
const CHRS = [[350, 0], [392, 1], [434, 2]].map(([x, k]) => { const g = mk(HC, 'g', {}); const h = [40, 30, 22][k];
  mk(g, 'path', { d: `M${x - 8},${209 - h} Q${x},209 ${x - 8},${209 + h}`, stroke: NUC, 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${x + 8},${209 - h} Q${x},209 ${x + 8},${209 + h}`, stroke: NUC, 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' }); return g; });
const nTag = txt(dh, 560, 160, 'n', { 'font-family': 'Poppins', 'font-size': 44, 'font-weight': 700, fill: NUC, 'font-style': 'italic' });
const nCap = txt(dh, 392, 362, 'ONE OF EACH KIND · ONE SET', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
const HP = [['HAPLOID', 'One set of chromosomes', wt('D4', 'haploid')], ['IT MAKES THE GAMETES', 'So it is the gametophyte', wt('D4', 'gametophyte')]];
$('#haps').innerHTML = HP.map(([a, b], i) => `<div class="hap" id="hp${i}" style="top:${384 + i * 100}px;height:88px"><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');

/* ---------- Z: zoom ladder ---------- */
const ZN = ['WALL', 'CUSHION', 'MOSS PLANT', 'CAPSULE'], ZS = ['x1', 'x5', 'x20', 'x100'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Wall', 'A green cushion on the bricks.', 'Bright green in the rain.'],
  ['RUNG 2 OF 4', 'Cushion', 'Many tiny moss plants side by side.', 'Some carry stalks with capsules.'],
  ['RUNG 3 OF 4', 'Moss plant', 'The leafy gametophyte, with the sporophyte on top.', 'Here: a moss like Funaria.'],
  ['RUNG 4 OF 4', 'Capsule', 'The case where spores are made.', 'Each spore can grow into a new moss.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A whole forest on my wall!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[520, 330, 70], [530, 250, 60], [540, 112, 46], null];
const LAB = [];
const mossPlant = (g, x, yb, h, sc = 1, cap = true) => { // a small moss plant: rhizoids, axis, spiral leaves, seta + capsule
  for (let k = -2; k <= 2; k++) mk(g, 'path', { d: `M${x},${yb} q${k * 5 * sc},${8 * sc} ${k * 9 * sc},${16 * sc}`, stroke: '#8B6B44', 'stroke-width': 1.6 * sc, fill: 'none' });
  mk(g, 'path', { d: `M${x},${yb} L${x},${yb - h}`, stroke: '#4E7A34', 'stroke-width': 3 * sc });
  for (let k = 0; k < 7; k++) { const y = yb - 6 * sc - k * (h - 8 * sc) / 7, s = k % 2 ? 1 : -1, L = (14 - k) * sc * 1.1;
    mk(g, 'path', { d: `M${x},${y} q${s * L * 0.6},${-L * 0.2} ${s * L},${-L * 0.9} q${-s * L * 0.2},${L * 0.5} ${-s * L},${L * 0.9} Z`, fill: MOSS, stroke: DARK, 'stroke-width': 1.4 * sc }); }
  if (cap) { mk(g, 'path', { d: `M${x},${yb - h} Q${x + 3 * sc},${yb - h - 40 * sc} ${x + 6 * sc},${yb - h - 70 * sc}`, stroke: SPO, 'stroke-width': 2.2 * sc, fill: 'none' });
    mk(g, 'ellipse', { cx: x + 8 * sc, cy: yb - h - 78 * sc, rx: 5 * sc, ry: 9 * sc, fill: SPOF, stroke: SPO, 'stroke-width': 1.6 * sc, transform: `rotate(20 ${x + 8 * sc} ${yb - h - 78 * sc})` }); } };
// level 0: brick wall with moss cushions
{ const g = ZG[0];
  mk(g, 'rect', { x: 60, y: 70, width: 900, height: 400, fill: '#D9A585', stroke: BR, 'stroke-width': 4.5 });
  for (let r = 0; r < 7; r++) { mk(g, 'line', { x1: 60, y1: 127 + r * 57, x2: 960, y2: 127 + r * 57, stroke: '#B97E5F', 'stroke-width': 3 });
    for (let c = 0; c < 10; c++) { const x = 60 + c * 100 + (r % 2 ? 50 : 0); if (x > 62 && x < 958) mk(g, 'line', { x1: x, y1: 70 + r * 57, x2: x, y2: 127 + r * 57, stroke: '#B97E5F', 'stroke-width': 3 }); } }
  [[200, 300, 110, 50], [520, 330, 150, 64], [800, 260, 100, 46], [360, 160, 80, 34], [700, 420, 120, 40]].forEach(([x, y, rx, ry]) => { mk(g, 'ellipse', { cx: x, cy: y, rx, ry, fill: MOSS, stroke: DARK, 'stroke-width': 3.5 });
    const r = M.rng(x); for (let k = 0; k < 10; k++) mk(g, 'circle', { cx: x + (r() - 0.5) * rx * 1.4, cy: y + (r() - 0.5) * ry * 1.2, r: 3, fill: '#4E9A5A' }); });
  LAB[0] = [[520, 330, 660, 150, 'Moss cushion', 'start'], [140, 98, 150, 40, 'Brick wall', 'start']]; }
// level 1: the cushion: many plants
{ const g = ZG[1];
  mk(g, 'path', { d: 'M40,440 C200,380 860,380 1016,440 L1016,500 L40,500 Z', fill: '#C9A47F' });
  const r = M.rng(7); for (let k = 0; k < 30; k++) { const x = 70 + k * 31 + (r() - 0.5) * 12, h = 120 + r() * 70; mossPlant(g, x, 430 - r() * 14, h, 1.0, k % 4 === 1); }
  LAB[1] = [[530, 300, 640, 120, 'One moss plant', 'start'], [389, 238, 280, 90, 'Capsule on a stalk', 'end']]; }
// level 2: one moss plant, labelled
const P2 = [];
{ const g = ZG[2], X = 500, YB = 470, H = 230;
  for (let k = -3; k <= 3; k++) { mk(g, 'path', { d: `M${X},${YB} q${k * 12},${18} ${k * 22},${34} m0,0 q${k * 4},${6} ${k * 8 + 6},${8}`, stroke: '#8B6B44', 'stroke-width': 3, fill: 'none' }); }
  mk(g, 'path', { d: `M${X},${YB} L${X},${YB - H}`, stroke: '#4E7A34', 'stroke-width': 7, 'stroke-linecap': 'round' });
  for (let k = 0; k < 10; k++) { const y = YB - 16 - k * (H - 20) / 10, s = k % 2 ? 1 : -1, L = 56 - k * 3.2;
    mk(g, 'path', { d: `M${X},${y} q${s * L * 0.6},${-L * 0.2} ${s * L},${-L * 0.9} q${-s * L * 0.2},${L * 0.5} ${-s * L},${L * 0.9} Z`, fill: MOSS, stroke: DARK, 'stroke-width': 2.5 }); }
  mk(g, 'path', { d: `M${X},${YB - H} Q${X + 8},${YB - H - 60} ${X + 30},${YB - H - 110}`, stroke: SPO, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'ellipse', { cx: X + 42, cy: YB - H - 128, rx: 16, ry: 28, fill: SPOF, stroke: SPO, 'stroke-width': 3.5, transform: `rotate(28 ${X + 42} ${YB - H - 128})` });
  LAB[2] = [[X + 46, YB - H - 130, 640, 100, 'Capsule', 'start'], [X + 14, YB - H - 60, 640, 168, 'Seta (stalk)', 'start'], [X + 40, YB - 120, 640, 280, 'Leaves in a spiral', 'start'], [X, YB - 60, 330, 340, 'Axis', 'end'], [X - 30, YB + 24, 330, 470, 'Rhizoids', 'end']]; }
// level 3: capsule cut open with spores
const SPS = [];
{ const g = ZG[3];
  mk(g, 'path', { d: 'M520,470 L520,420', stroke: SPO, 'stroke-width': 14, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M520,420 C380,410 340,250 400,150 C440,90 600,90 640,150 C700,250 660,410 520,420 Z', fill: SPOF, stroke: SPO, 'stroke-width': 5 });
  mk(g, 'path', { d: 'M520,400 C410,392 380,262 424,170 C456,118 584,118 616,170 C660,262 630,392 520,400 Z', fill: '#FBF3DE', stroke: '#CBA867', 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M410,140 C440,70 600,70 630,140 Z', fill: '#C79A5A', stroke: SPO, 'stroke-width': 4 });
  const r = M.rng(9); for (let k = 0; k < 46; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()), x = 520 + Math.cos(a) * d * 92, y = 280 + Math.sin(a) * d * 108; SPS.push(mk(g, 'circle', { cx: x, cy: y, r: 7, fill: '#8FC994', stroke: DARK, 'stroke-width': 1.8 })); }
  LAB[3] = [[628, 300, 780, 300, 'Capsule wall', 'start'], [540, 260, 780, 200, 'Spores', 'start', [700, 200]], [600, 100, 780, 100, 'Lid', 'start']]; }
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => LBL(ZG[lv], px, py, lx, ly, s, an, el)));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'cushion'), wt('Z2', 'bricks')], [wt('Z3', 'tiny'), wt('Z3', 'packed') + 0.3],
  [wt('Z4', 'capsule'), wt('Z4', 'stalk'), wt('Z4', 'leaves'), wt('Z4', 'axis'), wt('Z4', 'rhizoids')], [wt('Z5', 'capsule'), wt('Z5', 'spores'), wt('Z5', 'spores') + 0.5]];

/* ---------- R: reproduction in five stages ---------- */
const RN = ['1 SEX ORGANS', '2 SWIM IN WATER', '3 ZYGOTE', '4 SPOROPHYTE', '5 SPORES'];
$('#rch').innerHTML = RN.map((n, i) => `<span class="zc" id="rn${i}">${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const RP = [['Sex organs', 'Antheridium: the male organ. Archegonium: the female organ, a flask with one egg.'], ['Swim in water', 'Antherozoids have two flagella. They swim through a film of water.'],
  ['Zygote', 'One antherozoid fuses with the egg. The fused cell is the zygote.'], ['Sporophyte', 'Foot, seta and capsule. It stays on the green plant and takes food from it.'], ['Spores', 'Meiosis in the capsule makes haploid spores. Each grows into a new green plant.']];
$('#rps').innerHTML = RP.map(([n, d], i) => `<div class="rp" id="rp${i}"><div class="lbl" style="left:0;top:30px">STAGE ${i + 1} OF 5</div><div class="rt">${n}</div><div class="rd">${d}</div></div>`).join('');
const tRs = ['R2', 'R3', 'R4', 'R5', 'R6'].map(id => T0(id));
const rs = $('#rS');
// gametophyte tissue (green) with water film, antheridium (left) and archegonium (right)
mk(rs, 'path', { d: 'M40,470 C200,440 760,440 960,470 L960,526 L40,526 Z', fill: MOSS, stroke: DARK, 'stroke-width': 3 });
const water = mk(rs, 'path', { d: 'M40,452 C200,424 760,424 960,452 L960,474 C760,446 200,446 40,474 Z', fill: '#BFDDEF', stroke: WAT, 'stroke-width': 2 });
const ANT = mk(rs, 'g', {}); mk(ANT, 'path', { d: 'M240,450 L240,420 C200,410 196,300 240,260 C284,300 280,410 240,420', fill: '#D7ECCF', stroke: DARK, 'stroke-width': 3.5 });
const AZD = []; for (let k = 0; k < 10; k++) AZD.push(mk(ANT, 'circle', { cx: 230 + (k % 3) * 10, cy: 300 + Math.floor(k / 3) * 26, r: 4, fill: GAM }));
const ARC = mk(rs, 'g', {}); mk(ARC, 'path', { d: 'M700,450 C650,440 650,350 690,330 L692,200 L708,200 L710,330 C750,350 750,440 700,450 Z', fill: '#D7ECCF', stroke: DARK, 'stroke-width': 3.5 });
const egg = mk(ARC, 'circle', { cx: 700, cy: 395, r: 22, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 });
const zyg = mk(ARC, 'circle', { cx: 700, cy: 395, r: 24, fill: SPOF, stroke: SPO, 'stroke-width': 3.5 });
const AZ = [0, 1, 2, 3].map(k => { const g = mk(rs, 'g', {}); mk(g, 'path', { d: 'M-8,0 C-8,-6 8,-6 8,0 C8,6 -8,6 -8,0 Z', fill: GAM, stroke: DARK, 'stroke-width': 1.5 }); const f1 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2, fill: 'none' }), f2 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2, fill: 'none' }); return { g, f1, f2 }; });
// sporophyte grows out of the archegonium: foot, seta, capsule
const SPg = mk(rs, 'g', {}); const foot = mk(SPg, 'ellipse', { cx: 700, cy: 400, rx: 26, ry: 20, fill: SPOF, stroke: SPO, 'stroke-width': 3.5 });
const seta = mk(SPg, 'path', { d: 'M700,380 L700,120', stroke: SPO, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
const caps = mk(SPg, 'ellipse', { cx: 706, cy: 96, rx: 22, ry: 40, fill: SPOF, stroke: SPO, 'stroke-width': 4, transform: 'rotate(18 706 96)' });
const RS = []; for (let k = 0; k < 14; k++) RS.push(mk(rs, 'circle', { cx: 0, cy: 0, r: 7, fill: '#8FC994', stroke: DARK, 'stroke-width': 1.8 }));
const RL = [LBL(rs, 240, 300, 120, 200, 'Antheridium', 'start'), LBL(rs, 700, 340, 790, 290, 'Archegonium', 'start'), LBL(rs, 700, 395, 790, 380, 'Egg', 'start'),
  LBL(rs, 470, 438, 420, 360, 'Antherozoid', 'end'), LBL(rs, 712, 398, 790, 380, 'Zygote', 'start'), LBL(rs, 726, 404, 790, 450, 'Foot', 'start'), LBL(rs, 700, 200, 790, 190, 'Seta', 'start'), LBL(rs, 724, 96, 790, 120, 'Capsule', 'start')];
RL.forEach(l => { l.tx.setAttribute('class', 'zl'); });
const tSwim = wt('R3', 'swim'), tFuse = wt('R4', 'fuses'), tGrowS = wt('R5', 'foot') - 0.6, tMei = wt('R6', 'meiosis');
const avR = PUC.avatar($('#sR'), { x: 160 + 1000, y: 324 + 410, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So that is why it needs rain.' });

/* ---------- L: liverwort vs moss ---------- */
const la = $('#laS'), LV = mk(la, 'g', {});
const thal = 'M392,470 C330,470 250,450 196,410 C150,380 150,330 200,320 C250,312 290,350 330,330 C350,300 330,260 360,240 C380,226 404,226 424,240 C454,260 434,300 454,330 C494,350 534,312 584,320 C634,330 634,380 588,410 C534,450 454,470 392,470 Z';
mk(LV, 'path', { d: thal, fill: '#8FC994', stroke: DARK, 'stroke-width': 4 });
mk(LV, 'path', { d: 'M392,462 L392,250 M392,380 C330,370 260,350 210,350 M392,380 C454,370 524,350 574,350', stroke: '#5FA86F', 'stroke-width': 3, fill: 'none' });
for (let k = -4; k <= 4; k++) mk(LV, 'path', { d: `M${392 + k * 40},${464 - Math.abs(k) * 4} l${k * 2},28`, stroke: '#8B6B44', 'stroke-width': 2.5 });
const CUPS = [[300, 400], [480, 400], [392, 300]].map(([x, y]) => { const g = mk(LV, 'g', {}); mk(g, 'path', { d: `M${x - 26},${y - 8} L${x + 26},${y - 8} L${x + 16},${y + 16} L${x - 16},${y + 16} Z`, fill: '#5FA86F', stroke: DARK, 'stroke-width': 3 });
  [-10, 0, 10].forEach(d => mk(g, 'circle', { cx: x + d, cy: y - 10, r: 6, fill: '#B9DDA8', stroke: DARK, 'stroke-width': 1.8 })); return g; });
const gem = mk(la, 'circle', { cx: 0, cy: 0, r: 7, fill: '#B9DDA8', stroke: DARK, 'stroke-width': 2 });
const baby = mk(la, 'path', { d: 'M650,520 C630,520 610,512 604,500 C600,490 612,486 620,492 C626,480 640,478 650,486 C660,478 674,480 680,492 C688,486 700,490 696,500 C690,512 670,520 650,520 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 3 });
const LAL = [LBL(la, 550, 330, 600, 230, 'Thallus', 'start'), LBL(la, 480, 400, 600, 440, 'Gemma cup', 'start'), LBL(la, 392, 290, 250, 230, 'Gemmae', 'end'), LBL(la, 240, 478, 140, 520, 'Rhizoids', 'end')];
const lm = $('#lmS'), PRO = mk(lm, 'g', {});
const pth = 'M80,440 C160,430 200,452 280,440 C360,428 420,452 500,440 C580,428 640,450 720,440';
mk(PRO, 'path', { d: pth, stroke: DARK, 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' }); mk(PRO, 'path', { d: pth, stroke: '#8FC994', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
[[200, 446, 170, 400], [380, 436, 410, 392], [600, 440, 570, 470], [500, 440, 520, 480]].forEach(([a, b, c, d]) => { mk(PRO, 'path', { d: `M${a},${b} Q${(a + c) / 2},${(b + d) / 2 - 8} ${c},${d}`, stroke: DARK, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }); mk(PRO, 'path', { d: `M${a},${b} Q${(a + c) / 2},${(b + d) / 2 - 8} ${c},${d}`, stroke: '#8FC994', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); });
for (let x = 120; x < 720; x += 50) mk(PRO, 'line', { x1: x, y1: 432, x2: x, y2: 448, stroke: DARK, 'stroke-width': 2 });
const LEAFY = mk(lm, 'g', {}); { const X = 440, YB = 432, H = 200;
  mk(LEAFY, 'path', { d: `M${X},${YB} L${X},${YB - H}`, stroke: '#4E7A34', 'stroke-width': 6, 'stroke-linecap': 'round' });
  for (let k = 0; k < 9; k++) { const y = YB - 12 - k * (H - 16) / 9, s = k % 2 ? 1 : -1, L = 44 - k * 2.6; mk(LEAFY, 'path', { d: `M${X},${y} q${s * L * 0.6},${-L * 0.2} ${s * L},${-L * 0.9} q${-s * L * 0.2},${L * 0.5} ${-s * L},${L * 0.9} Z`, fill: MOSS, stroke: DARK, 'stroke-width': 2.2 }); } }
const bud = mk(lm, 'circle', { cx: 440, cy: 432, r: 10, fill: MOSS, stroke: DARK, 'stroke-width': 2.5 });
const LML = [LBL(lm, 640, 440, 660, 380, 'Protonema', 'start'), LBL(lm, 440, 430, 300, 480, 'Bud', 'end'), LBL(lm, 470, 300, 560, 250, 'Leafy stage', 'start')];
const tGem = wt('L3', 'falls'), tPro = wt('L4', 'protonema'), tBud = wt('L5', 'bud'), tLeafy = wt('L5', 'leafy');
const th1 = PUC.think($('#th1'), { q: 'A flat green plate has tiny cups holding green buds. Liverwort or moss?', opts: ['Liverwort', 'Moss'], right: 0, why: 'Liverwort. Gemma cups with gemmae are a sign of a liverwort like Marchantia.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">green plant = <b>gametophyte</b> · stalk + capsule = sporophyte</span>';

/* ---------- U: uses ---------- */
const UT = [['rock', 'FIRST ON BARE ROCK', 'Rock to soil', 'Mosses and lichens grow on rock and slowly turn it into soil.', wt('U2', 'rock')],
  ['rain', 'MOSS MATS', 'Soil stays put', 'Dense mats soften falling rain and stop soil washing away.', wt('U2', 'mats')],
  ['fire', 'SPHAGNUM · PEAT', 'Fuel and packing', 'Peat is burnt as fuel; it packs living things because it holds water.', wt('U2', 'Sphagnum')]];
$('#uts').innerHTML = UT.map(([ic, a, b, c], i) => `<div class="ut" id="ut${i}" style="left:${36 + i * 518}px"><div class="a">${a}</div><div class="b">${b}</div><div class="c">${c}</div></div>`).join('');
const us = $('#uS'), UG = [0, 1, 2].map(() => mk(us, 'g', {}));
{ const g = UG[0], X = 36 + 245; mk(g, 'path', { d: `M${X - 170},300 C${X - 160},200 ${X - 60},150 ${X + 20},160 C${X + 120},170 ${X + 170},230 ${X + 180},300 Z`, fill: '#B8B3A8', stroke: BR, 'stroke-width': 4 });
  [[X - 80, 200, 40, 16], [X + 40, 176, 50, 18], [X + 120, 240, 36, 14]].forEach(([x, y, rx, ry]) => mk(g, 'ellipse', { cx: x, cy: y, rx, ry, fill: MOSS, stroke: DARK, 'stroke-width': 3 }));
  mk(g, 'path', { d: `M${X - 190},300 L${X + 200},300 L${X + 200},320 L${X - 190},320 Z`, fill: '#8B6B44' }); }
{ const g = UG[1], X = 36 + 518 + 245; mk(g, 'rect', { x: X - 200, y: 250, width: 400, height: 50, rx: 10, fill: MOSS, stroke: DARK, 'stroke-width': 3.5 }); mk(g, 'rect', { x: X - 200, y: 300, width: 400, height: 30, fill: '#8B6B44' });
  for (let k = 0; k < 8; k++) mk(g, 'line', { class: 'rn', x1: X - 170 + k * 48, y1: 120, x2: X - 178 + k * 48, y2: 144, stroke: WAT, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); }
{ const g = UG[2], X = 36 + 1036 + 245; mk(g, 'path', { d: `M${X - 150},300 L${X - 120},170 L${X + 120},170 L${X + 150},300 Z`, fill: '#8A6A4A', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M${X - 120 + k * 60},170 q-10,-40 0,-80 q12,30 6,80`, fill: '#C9D9A0', stroke: DARK, 'stroke-width': 2.5 });
  [[X - 60, 230], [X + 40, 250], [X - 10, 280]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y} l-6,10 a7 7 0 1 0 12 0 Z`, fill: WAT })); }

/* ---------- W ---------- */
const GRP = [['GAMETOPHYTE · HAPLOID', GAM], ['SPOROPHYTE · FROM THE ZYGOTE', SPO]];
const WC = [['Leafy shoot', 'leafy', 0, 'the green moss plant', wt('W2', 'leafy')], ['Protonema', 'thread', 0, 'the first green thread', wt('W2', 'protonema')], ['Gemma', 'cup', 0, 'liverwort bud, no gametes', wt('W3', 'gemma')],
  ['Foot', 'foot', 1, 'sits in the gametophyte', wt('W4', 'foot')], ['Seta', 'stalk', 1, 'the stalk', wt('W4', 'seta')], ['Capsule', 'stalk', 1, 'makes the spores', wt('W4', 'capsule')]];
$('#grhs').innerHTML = GRP.map(([n, col], c) => `<div class="grh" id="gh${c}" style="left:${36 + c * 777}px;width:750px;background:${col}">${n}</div>`).join('');
$('#cols').innerHTML = WC.map(([n, ic, c, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="dz"></div>
  <div class="it" id="it${i}" style="background:${mix(GRP[c][1], '#FFFFFF', 0.85)}"><div class="ic">${M.icon(ic, 84, GRP[c][1], 2)}</div><div class="inm">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The capsule lives on the green plant.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The green moss plant is the sporophyte', right: 'It is the gametophyte; the sporophyte is foot, seta and capsule' });
const tS = $('#tS'), TG = mk(tS, 'g', {}); mossPlant(TG, 230, 196, 110, 1.5, false);
const tB1 = mk(tS, 'path', { d: 'M300,196 L314,196 L314,60 L300,60', stroke: GAM, 'stroke-width': 4, fill: 'none' }), tB1t = txt(tS, 230, 258, 'GAMETOPHYTE', { 'text-anchor': 'middle', 'font-size': 15, fill: GAM, 'font-weight': 600, 'letter-spacing': 1 });
const where = PUC.where($('#wa'), { on: [], type: 'Statements on the gametophyte, the sporophyte, gemmae and protonema' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 860,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>The main plant body of a bryophyte is diploid.</div><div class="sl"><b>II</b>Antherozoids of bryophytes are biflagellate.</div><div class="sl"><b>III</b>In mosses, the leafy stage grows from the protonema as a bud.</div><div class="sl"><b>IV</b>Gemmae are sexual structures formed in gemma cups.</div>',
  opts: ['I and II only', 'II and III only', 'III and IV only', 'II, III and IV only'], right: 1, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b> (II, III)'], ['<b style="color:var(--red)">I</b> is false'], ['Main body is haploid'], ['<b style="color:var(--red)">IV</b> is false'], ['Gemmae are asexual buds']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 'B') + 0.05, wt('A2', 'One'), wt('A2', 'haploid'), wt('A3', 'Four'), wt('A3', 'asexual')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · bryophytes', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Amphibians</b> of the plant kingdom: need water to reproduce', `<b style="color:${GAM}">Gametophyte</b> (haploid) = the green plant; rhizoids, no true root`, '<b>Antheridium</b>: biflagellate antherozoids · <b>Archegonium</b>: flask, one egg',
    `<b style="color:${SPO}">Sporophyte</b>: foot, seta, capsule; fed by the gametophyte`, '<b>Liverwort</b>: gemmae in gemma cups · <b>Moss</b>: protonema, then leafy stage'] });
const YQ = ['Why do bryophytes need water to reproduce?', 'What are the three parts of a moss sporophyte?', 'Where are gemmae formed?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 24', topic: 'Brown dots under a fern leaf: is it sick? Pteridophytes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const capsF = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR1 + 0.1, 1, 960, 540]]);
const flag = (x, y, ang, len, ph) => { let d = `M${x},${y}`; for (let k = 1; k <= 8; k++) { const u = k / 8, px = x + Math.cos(ang) * len * u - Math.sin(ang) * 5 * Math.sin(u * 7 + ph), py = y + Math.sin(ang) * len * u + Math.cos(ang) * 5 * Math.sin(u * 7 + ph); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; } return d; };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'bryophytes') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'rains') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#gS'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.2 });
    const dry = M.io((t - tSum) / 0.6) * (1 - M.io((t - tRainBack) / 0.6));
    MP.forEach(e => { e.setAttribute('fill', mix(MOSS, '#A8875A', dry)); e.setAttribute('stroke', mix(DARK, '#6B5230', dry)); });
    sky.setAttribute('fill', mix('#DCE6EC', '#F4EBD2', dry));
    RAIN.forEach((r, k) => { const ph = ((t * 1.6 + k * 0.137) % 1), x = 20 + (k * 29) % 500, y = -20 + ph * 330; attr(r, 'transform', `translate(${x} ${y.toFixed(1)})`); r.style.opacity = (1 - dry).toFixed(2); });
    runL(ML, t, wt('H3', 'velvet'));
    M.vis($('#hkP'), t, tSum + 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.25, 1e9, { dy: 0, fade: 0.25 })) { AM.forEach((a, i) => M.vis($('#am' + i), t, a[3] - 0.2, 1e9, { dx: -20, dy: 0 })); M.vis(AMP, t, wt('H4', 'amphibians') - 0.1, 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DR.forEach((d, i) => M.vis($('#dr' + i), t, d[3] - 0.15, 1e9, { dy: 16 }));
    M.vis($('#dh'), t, T0('D2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(HC, t, T0('D2') + 0.5, 1e9, { dy: 16 });
    CHRS.forEach((g, k) => M.vis(g, t, wt('D4', 'chromosomes') + k * 0.12, 1e9, { ...POP, sc: 0.3 })); M.vis(nTag, t, wt('D4', 'one') , 1e9, POP); M.vis(nCap, t, wt('D4', 'set'), 1e9, { dy: 6 });
    HP.forEach((h, i) => M.vis($('#hp' + i), t, h[2] - 0.1, 1e9, { dy: 16 }));
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tR1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('R1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 3 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => runL(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    SPS.forEach((s, i) => { const on = M.io((t - wt('Z5', 'spores') - (i % 12) * 0.04) / 0.3); attr(s, 'r', (7 * (1 + 0.4 * on * (1 - M.io((t - wt('Z5', 'spores') - 0.9) / 0.4)))).toFixed(2)); });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z3', 'side') + 0.4, T0('Z4') + 1.0);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('T1');
    M.vis($('#rch'), t, tR1 + 0.1, out, { dy: 12, ...o });
    let si = -1; tRs.forEach((tt, i) => { if (t >= tt - 0.1) si = i; });
    RN.forEach((_, i) => { const el = $('#rn' + i), on = i === si ? 1 : 0, done = i < si; el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#rc'), t, tR1 + 0.2, out, { dy: 36, ...o });
    RP.forEach((_, i) => M.vis($('#rp' + i), t, tRs[i] + 0.05, i < 4 ? tRs[i + 1] - 0.05 : 1e9, { dy: 16, outDur: 0.2, ody: -10 }));
    M.vis(ANT, t, wt('R2', 'antheridium') - 0.2, 1e9, { dy: 20 }); M.vis(ARC, t, wt('R2', 'archegonium') - 0.2, 1e9, { dy: 20 });
    water.style.opacity = M.clamp((t - wt('R3', 'water') + 0.3) / 0.4);
    // antherozoids swim from the antheridium to the archegonium neck, loop until fusion
    AZ.forEach((z, k) => { const st = tRs[1] + 0.3 + k * 0.5; const u = M.clamp((t - st) / 2.6);
      const x = M.lerp(250, 690, u), y = 300 + 140 * Math.sin(Math.PI * Math.min(1, u * 1.1)) * 0.95 - 20 * u + Math.sin(t * 6 + k) * 6;
      const on = t > st && t < tFuse + 0.6; z.g.style.opacity = on ? 1 : 0;
      const yy = u < 0.85 ? Math.min(y, 438) : M.lerp(438, 210 + k * 6, M.clamp((u - 0.85) / 0.15));
      attr(z.g, 'transform', `translate(${x.toFixed(1)} ${yy.toFixed(1)})`); attr(z.f1, 'd', flag(-8, -2, Math.PI + 0.3, 22, t * 10 + k)); attr(z.f2, 'd', flag(-8, 2, Math.PI - 0.3, 22, t * 10 + k + 1)); });
    egg.style.opacity = t < tFuse + 0.3 ? 1 : 0; zyg.style.opacity = M.clamp((t - tFuse - 0.2) / 0.3) * (t < tGrowS + 0.4 ? 1 : 0);
    const gS = M.io((t - tGrowS) / 1.6); M.hide(SPg, gS <= 0); M.hide(foot, gS <= 0);
    attr(seta, 'd', `M700,380 L700,${(380 - 260 * gS).toFixed(1)}`); attr(caps, 'transform', `translate(0 ${(260 * (1 - gS)).toFixed(1)}) rotate(18 706 96)`); caps.style.opacity = M.clamp((gS - 0.6) / 0.3);
    RS.forEach((s, k) => { const u = M.clamp((t - tMei - 0.4 - k * 0.12) / 2.2), a = -0.6 + (k % 7) * 0.2; attr(s, 'cx', (712 + u * (180 + (k % 4) * 30) * Math.cos(a)).toFixed(1)); attr(s, 'cy', (90 + u * 160 * Math.sin(a) + u * u * 120).toFixed(1)); s.style.opacity = u > 0 ? Math.min(1, (1 - u) * 3) : 0; });
    const LT = [[wt('R2', 'antheridium'), 1e9], [wt('R2', 'archegonium'), 1e9], [wt('R2', 'egg'), tFuse + 0.3], [wt('R3', 'antherozoids'), tFuse], [wt('R4', 'zygote'), tGrowS], [wt('R5', 'foot'), 1e9], [wt('R5', 'seta'), 1e9], [wt('R5', 'capsule'), 1e9]];
    RL.forEach((l, i) => runL(l, t, LT[i][0], LT[i][1]));
    avR(t, wt('R3', 'water') + 0.6, tRs[2] - 0.2);
  }

  /* statement */
  const stOn = t >= tT && t < tL1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tL1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'green') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'gametophyte') - 0.1, 0.8);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tU1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L6');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(LV, t, wt('L2', 'liverwort') - 0.1, 1e9, { dy: 20 });
    CUPS.forEach((c, k) => M.vis(c, t, wt('L3', 'cups') + k * 0.15, 1e9, { ...POP, sc: 0.4 }));
    const gu = M.clamp((t - tGem) / 1.2); attr(gem, 'cx', (480 + gu * 170).toFixed(1)); attr(gem, 'cy', (388 + gu * 110 - 90 * Math.sin(Math.PI * gu)).toFixed(1)); gem.style.opacity = t > tGem - 0.05 && gu < 1 ? 1 : 0;
    M.vis(baby, t, tGem + 1.1, 1e9, { ...POP, sc: 0.2, sp: M.SOFT });
    [wt('L2', 'flat'), wt('L3', 'cups'), wt('L3', 'gemmae'), wt('L2', 'ground')].forEach((tt, i) => runL(LAL[i], t, tt));
    M.vis($('#lm'), t, wt('L1', 'mosses') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write(PRO, t, tPro, 1.2);
    M.vis(bud, t, tBud - 0.1, 1e9, { ...POP, sc: 0.2 });
    const lg = M.io((t - tLeafy) / 1.0), pre = t < tPro - 0.2; M.hide(LEAFY, !pre && lg <= 0); LEAFY.style.opacity = pre ? (0.3 * M.clamp((t - wt('L1', 'mosses')) / 0.4)).toFixed(2) : '';
    attr(LEAFY, 'transform', pre ? '' : `translate(440 432) scale(${(0.05 + 0.95 * lg).toFixed(3)}) translate(-440 -432)`);
    [tPro + 0.6, tBud, tLeafy + 0.6].forEach((tt, i) => runL(LML[i], t, tt));
    ['Funaria', 'Polytrichum', 'Sphagnum'].forEach((w, i) => M.vis($('#mx' + i), t, wt('L5', w) - 0.1, 1e9, POP));
    M.vis($('#th1'), t, tL6 + 0.05, tU1 - 0.05, { dy: 36, outDur: 0.01 });
    th1(t, { tin: tL6, tOpts: wt('L6', 'Liverwort') - 0.1, tCount: T1('L6') + 0.05, dur: 3, tAns: T0('L7') - 0.02, tWhy: wt('L7', 'Gemma') });
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#um'), t, tU1 + 0.05, OUT('W1'), { dy: 36, ...o });
    UT.forEach((u, i) => { M.vis($('#ut' + i), t, u[4] - 0.3, 1e9, { dy: 20 }); M.vis(UG[i], t, u[4] - 0.1, 1e9, { dy: 16 }); });
    UG[1].querySelectorAll('.rn').forEach((r, k) => { const ph = ((t * 1.4 + k * 0.23) % 1); attr(r, 'transform', `translate(0 ${(ph * 100).toFixed(1)})`); r.style.opacity = (1 - ph).toFixed(2); });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    GRP.forEach((_, c) => M.vis($('#gh' + c), t, tW1 + 0.3 + c * 0.1, 1e9, { dy: 10 }));
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.4 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.4, 1e9, { dy: 8 }); });
    avW(t, wt('W4', 'zygote') + 0.2, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'green') - 0.2, tStrike: wt('X3', 'It') - 0.05, tRight: wt('X3', 'gametophyte') - 0.1 });
    M.vis(TG, t, wt('X3', 'gametophyte') - 0.2, 1e9, { dy: 16 }); M.vis(tB1, t, wt('X3', 'gametophyte'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tB1t, t, wt('X3', 'gametophyte') + 0.1, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  capsF(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
