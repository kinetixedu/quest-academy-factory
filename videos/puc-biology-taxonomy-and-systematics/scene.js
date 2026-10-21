// PUC Biology Ep 05: Taxonomy and Systematics (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = '#2E2A24', GRN = C.ac, LEAF = '#8CC48F', NUC = '#7B4B94', GOLD = '#C9962B', HIB = '#D1495B', HIBD = '#8E2A38';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const TICK = M.icon('check', 22, '#fff', 3.2), CROSS = M.icon('x', 22, '#fff', 3.2);

Object.assign(M.IC, {
  powder: ['M3 13h18a9 6 0 0 1-18 0Z', 'M7 13c1-3 3-4.5 5-4.5s4 1.5 5 4.5'],
  seeds: ['M3 13h18a9 6 0 0 1-18 0Z', 'M7 10.5h.01', 'M10 9h.01', 'M13 10h.01', 'M16 9.5h.01', 'M11.5 11.5h.01'],
  chilli: ['M8 7.5c0-2 1-3.5 2.5-4.5', 'M10 6c4 0 8 3 9 9 .5 3-1 6-3 6-3 0-5-6-9-8-2-1-1-7 3-7Z'],
  hibiscus: [ci(12, 12, 2.2), 'M12 9.8C10 6 10.5 3 12 3s2 3 0 6.8', 'M14.1 11.3c3.6-2 6.4-1.6 6.8-.2.4 1.5-2.6 2.7-6.8 1.5', 'M13.3 14c2.4 3.3 2.4 6.2 1 6.7-1.4.5-3-2.4-2.3-6.6', 'M10.7 14c-2.4 3.3-2.4 6.2-1 6.7 1.4.5 3-2.4 2.3-6.6', 'M9.9 11.3C6.3 9.3 3.5 9.7 3.1 11.1c-.4 1.5 2.6 2.7 6.8 1.5'],
  ant: [ci(5, 13, 2.2), ci(11, 13, 2.6), ci(18, 13, 3.4), 'M8 9.5 6 7', 'M9 16.5l-2 3', 'M11 10.4V7', 'M11 15.6v3.5', 'M14 10.5l2-3', 'M14 15.5l2 3', 'M3.6 11.4 2 9'],
  crow: ['M3 12c3-1 5-4 9-4 3 0 4 2 5 3l4 1-4 1c-1 3-4 5-8 5-3 0-5-1-6-3l4-1Z', 'M15.5 10.5h.01', 'M9 17l-1 4', 'M12 17v4'],
  worm: ['M3 12c2-3 5-3 7-2s4 2 6 1.5 3.6-2 5-1.5c-1 2.5-3 3.5-5 3.5s-4-1-6-1.5S5 13 3 12Z', 'M18.4 11h.01', 'M19.8 11h.01'],
  moss: ['M3 20h18', 'M6 20v-4', 'M9 20v-6', 'M12 20v-5', 'M15 20v-7', 'M18 20v-4', ci(6, 15, 1.2), ci(9, 13, 1.2), ci(12, 14, 1.2), ci(15, 12, 1.2), ci(18, 15, 1.2)],
  fern: ['M12 22V4', 'M12 7l-4-2', 'M12 7l4-2', 'M12 11l-6-3', 'M12 11l6-3', 'M12 15l-7-3', 'M12 15l7-3', 'M12 19l-6-2', 'M12 19l6-2'],
  tree: ['M12 22v-6', 'M12 16c-5 0-8-3-8-6.5S7 3 12 3s8 3 8 6.5-3 6.5-8 6.5Z', 'M12 16l-3-3', 'M12 14l3-3'],
  scope: ['M6 18h8', 'M3 22h18', 'M14 22a7 7 0 1 0 0-14h-1', 'M9 14h2', 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z', 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3'],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  sprout: ['M12 22v-8', 'M12 14c0-4-3-6-7-6 0 4 3 6 7 6Z', 'M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z'],
  globe: [ci(12, 12, 9), 'M3 12h18', 'M12 3c3 3 3 15 0 18', 'M12 3c-3 3-3 15 0 18'],
  bug: ['M12 8c3 0 5 2.5 5 6s-2 7-5 7-5-3.5-5-7 2-6 5-6Z', ci(12, 5.5, 2.5), 'M7 11 3 9', 'M7 14H3', 'M7.5 17 4 19', 'M17 11l4-2', 'M17 14h4', 'M16.5 17l3.5 2'],
  pill: ['M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z', 'M7 10l7 7'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') - 0.05, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tL1 = T0('L1'), tS1 = T0('S1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1'), tU1 = T0('U1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tU1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['powder', 'Turmeric', 'A POWDER', ['H1', 'Turmeric']], ['seeds', 'Cumin', 'SEEDS', ['H1', 'cumin']], ['chilli', 'Red chilli', 'A POWDER', ['H1', 'red']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3][0], j[3][1]));

/* ---------- H: the spice box ---------- */
const hs = $('#hjS'), BOWL = [], CX = 392, CY = 286;
mk(hs, 'circle', { cx: CX, cy: CY, r: 196, fill: '#D9D4CB', stroke: BR, 'stroke-width': 4.5 });
mk(hs, 'circle', { cx: CX, cy: CY, r: 182, fill: '#E9E5DD', stroke: '#A39C90', 'stroke-width': 2 });
const SP = [['TURMERIC', '#E8B23A', 0], ['CUMIN', '#9A6A3A', 1], ['RED CHILLI', '#C8432F', 0], ['MUSTARD', '#4A3426', 1], ['CORIANDER', '#C9A65A', 1], ['PEPPER', '#3A3430', 1], ['SALT', '#F4F2EE', 0]];
SP.forEach(([n, c, sd], i) => { const a = i < 6 ? i * Math.PI / 3 - Math.PI / 2 : 0, r = i < 6 ? 116 : 0, x = CX + r * Math.cos(a), y = CY + r * Math.sin(a), g = mk(hs, 'g', {});
  mk(g, 'circle', { cx: x, cy: y, r: 56, fill: '#C9C3B8', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: 46, fill: c, stroke: 'rgba(0,0,0,.25)', 'stroke-width': 2 });
  if (sd) { const rr = M.rng(i + 3); for (let k = 0; k < 14; k++) { const aa = rr() * 6.28, d = rr() * 34; mk(g, 'ellipse', { cx: x + d * Math.cos(aa), cy: y + d * Math.sin(aa), rx: 5, ry: 3, fill: 'rgba(255,255,255,.35)', transform: `rotate(${(aa * 57).toFixed(0)} ${x + d * Math.cos(aa)} ${y + d * Math.sin(aa)})` }); } }
  const ring = mk(g, 'circle', { cx: x, cy: y, r: 62, fill: 'none', stroke: sd ? GRN : GOLD, 'stroke-width': 5 });
  BOWL.push({ g, ring, sd }); });
const hwI = ['ant', 'crow', 'worm', 'moss', 'fern', 'tree', 'hibiscus', 'bug', 'sprout', 'ant', 'crow', 'tree', 'moss', 'fern', 'bug', 'worm', 'hibiscus', 'sprout', 'tree', 'ant', 'fern', 'crow', 'bug', 'moss', 'sprout', 'worm', 'tree', 'hibiscus', 'ant', 'fern'];
$('#hwI').innerHTML = hwI.map((ic, i) => `<span id="hwi${i}" style="width:62px;height:62px;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:center">${M.icon(ic, 34, ['tree', 'moss', 'fern', 'sprout', 'hibiscus'].includes(ic) ? GRN : C.ink, 2)}</span>`).join('');

/* ---------- B ---------- */
const PT = [['Characterisation', 'DESCRIBE IT, PART BY PART', 'characterisation'], ['Identification', 'FIND OUT WHAT IT IS', 'identification'], ['Classification', 'PUT IT IN A GROUP', 'classification'], ['Nomenclature', 'GIVE IT A NAME', 'nomenclature']];
$('#pt4s').innerHTML = PT.map(([n, w], i) => `<div class="pt4" id="pt${i}" style="top:${84 + i * 104}px"><div class="n">${i + 1}</div><div class="pn">${n}</div><div class="pw">${w}</div></div>`).join('');
const tPt = PT.map(p => wt('B3', p[2]));
const LK = [['bug', 'Outer and inner structure', 'outer'], ['cell', 'Structure of the cells', 'cells'], ['sprout', 'How it develops', 'develops'], ['globe', 'Where and how it lives', 'where']];
$('#lks').innerHTML = LK.map(([ic, n], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="kn">${n}</div></div>`).join('');
const tLk = LK.map(l => wt('B4', l[2]));

/* ---------- Z: characterising the China rose ---------- */
const ZN = ['PLANT', 'FLOWER', 'LEAF', 'DESCRIPTION'], ZS = ['PROCESS 1', 'PROCESS 1', 'PROCESS 1', 'PROCESS 1 · DONE'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['STEP 1 OF 4', 'Plant', 'Describe it part by part: root, stem, leaf, flower.', 'Here: a China rose from Diya\'s garden.'],
  ['STEP 2 OF 4', 'Flower', 'Five large petals.', 'Stamens joined into one tube around the style.'],
  ['STEP 3 OF 4', 'Leaf', 'A broad blade with a toothed edge.', 'A net of veins runs through it.'],
  ['STEP 4 OF 4', 'Described', 'Every feature is written down.', 'Now the plant is characterised.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[640, 170, 60], [470, 250, 70], null];
const LAB = [];
const leafPath = (x, y, s, a) => { const g = `translate(${x} ${y}) rotate(${a}) scale(${s})`; return g; };
const LEAFD = 'M0,0 C20,-30 70,-38 110,-20 C130,-10 140,0 150,0 C140,0 130,10 110,20 C70,38 20,30 0,0 Z';
// level 0: China rose shrub
{ const g = ZG[0]; mk(g, 'line', { x1: 0, y1: 440, x2: 1056, y2: 440, stroke: '#8A6A44', 'stroke-width': 5 });
  mk(g, 'path', { d: 'M500,440 C496,380 504,320 520,260 M512,330 C470,300 420,270 360,250 M516,290 C570,250 610,210 640,180 M508,380 C560,360 620,350 680,330', stroke: '#6E5A3A', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  [[360, 250, 0.7, 190], [420, 270, 0.6, 160], [600, 220, 0.6, -40], [680, 330, 0.7, -10], [520, 260, 0.6, -100], [450, 300, 0.55, 200]].forEach(([x, y, s, a]) => mk(g, 'path', { d: LEAFD, fill: LEAF, stroke: BR, 'stroke-width': 3 / s, transform: leafPath(x, y, s, a) }));
  for (let k = 0; k < 5; k++) { const a = k * 2 * Math.PI / 5 - Math.PI / 2; mk(g, 'ellipse', { cx: 640 + 34 * Math.cos(a), cy: 170 + 34 * Math.sin(a), rx: 34, ry: 22, fill: HIB, stroke: BR, 'stroke-width': 3, transform: `rotate(${(a * 57.3).toFixed(1)} ${640 + 34 * Math.cos(a)} ${170 + 34 * Math.sin(a)})` }); }
  mk(g, 'line', { x1: 640, y1: 170, x2: 690, y2: 110, stroke: GOLD, 'stroke-width': 5, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M500,440 C490,470 470,490 440,510 M500,440 C512,474 540,494 570,512 M500,440 L500,520', stroke: '#B08A5A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  LAB[0] = [[470, 500, 330, 480, 'Root', 'end'], [506, 400, 330, 390, 'Stem', 'end'], [380, 252, 250, 170, 'Leaf', 'end'], [670, 160, 800, 100, 'Flower', 'start']];
}
// level 1: the flower (five petals, staminal tube around the style)
{ const g = ZG[1], X = 470, Y = 290;
  for (let k = 0; k < 5; k++) { const a = k * 2 * Math.PI / 5 + Math.PI / 2 + 0.6; mk(g, 'path', { d: `M0,0 C-30,-40 -60,-150 0,-180 C60,-150 30,-40 0,0 Z`, fill: '#9FD09A', stroke: BR, 'stroke-width': 3, transform: `translate(${X} ${Y}) rotate(${(a * 57.3 + 36).toFixed(1)}) scale(0.5)` }); }
  for (let k = 0; k < 5; k++) { const a = k * 72; mk(g, 'path', { d: 'M0,0 C-90,-30 -130,-170 -10,-200 C40,-205 110,-170 90,-60 C80,-20 40,0 0,0 Z', fill: HIB, stroke: HIBD, 'stroke-width': 3.5, transform: `translate(${X} ${Y}) rotate(${a})` }); }
  mk(g, 'circle', { cx: X, cy: Y, r: 26, fill: HIBD });
  mk(g, 'path', { d: `M${X - 8},${Y} L${X + 210},${Y - 150} L${X + 222},${Y - 136} L${X + 8},${Y + 10} Z`, fill: '#F3D27A', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 7; k++) { const u = 0.35 + k * 0.08, x = X + 210 * u, y = Y - 150 * u; mk(g, 'circle', { cx: x - 10, cy: y - 12, r: 7, fill: GOLD, stroke: BR, 'stroke-width': 2 }); mk(g, 'circle', { cx: x + 12, cy: y + 8, r: 7, fill: GOLD, stroke: BR, 'stroke-width': 2 }); }
  mk(g, 'line', { x1: X + 216, y1: Y - 143, x2: X + 262, y2: Y - 178, stroke: HIBD, 'stroke-width': 5 });
  for (let k = 0; k < 5; k++) mk(g, 'circle', { cx: X + 262 + 14 * Math.cos(k * 1.256), cy: Y - 178 + 14 * Math.sin(k * 1.256), r: 7, fill: HIBD });
  LAB[1] = [[380, 160, 230, 90, 'Petal', 'end'], [600, 200, 760, 380, 'Stamens (one tube)', 'start'], [732, 112, 800, 70, 'Stigma', 'start'], [330, 400, 200, 460, 'Sepal', 'end']];
}
// level 2: one leaf, toothed edge, net of veins
{ const g = ZG[2], pts = []; const N = 26; for (let k = 0; k <= N; k++) { const u = k / N, x = 200 + 640 * u, w = 170 * Math.sin(Math.PI * Math.pow(u, 0.8)); pts.push([x, 270 - w, x, 270 + w]); }
  let top = `M200,270`, bot = '';
  pts.forEach(([x, y1], k) => { if (k) top += ` L${(x - 12).toFixed(1)},${(y1 + 8).toFixed(1)} L${x.toFixed(1)},${y1.toFixed(1)}`; });
  for (let k = N; k >= 0; k--) { const [x, , , y2] = pts[k]; bot += ` L${x.toFixed(1)},${y2.toFixed(1)} L${(x - 12).toFixed(1)},${(y2 - 8).toFixed(1)}`; }
  mk(g, 'path', { d: top + bot + ' Z', fill: LEAF, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'line', { x1: 80, y1: 270, x2: 200, y2: 270, stroke: '#4E7A34', 'stroke-width': 10, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M200,270 L830,270', stroke: '#EEF6EA', 'stroke-width': 6 });
  for (let k = 1; k < 8; k++) { const x = 200 + k * 80, w = 150 * Math.sin(Math.PI * Math.pow((x - 200) / 640, 0.8));
    [-1, 1].forEach(s => { mk(g, 'path', { d: `M${x},270 Q${x + 30},${270 + s * w * 0.5} ${x + 60},${270 + s * w * 0.9}`, stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none' });
      mk(g, 'path', { d: `M${x + 20},${270 + s * w * 0.3} L${x + 60},${270 + s * w * 0.35} M${x + 40},${270 + s * w * 0.6} L${x + 6},${270 + s * w * 0.72}`, stroke: '#D8ECD2', 'stroke-width': 2, fill: 'none' }); }); }
  LAB[2] = [[560, 104, 620, 52, 'Toothed margin', 'start'], [480, 330, 300, 470, 'Net of veins', 'end'], [700, 270, 800, 470, 'Midrib', 'start'], [130, 270, 110, 170, 'Petiole', 'start']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'root'), wt('Z2', 'stem'), wt('Z2', 'leaf'), wt('Z2', 'flower')], [wt('Z3', 'petals'), wt('Z3', 'stamens'), wt('Z3', 'style'), wt('Z3', 'style') + 0.4], [wt('Z4', 'toothed'), wt('Z4', 'veins'), wt('Z4', 'veins') + 0.4, wt('Z4', 'broad')]];
const DSC = [['Habit', 'a shrub'], ['Leaf', 'broad, toothed, net of veins'], ['Flower', 'five large red petals'], ['Stamens', 'joined in one tube round the style']];
$('#dsc').innerHTML = `<div class="lbl" style="left:60px;top:40px">DESCRIPTION · CHINA ROSE</div>` + DSC.map(([k, v], i) => `<div id="ds${i}" style="position:absolute;left:60px;top:${100 + i * 74}px;width:900px;height:60px;border-bottom:2px solid var(--line);font:500 30px Poppins;white-space:nowrap"><b style="display:inline-block;width:200px">${k}</b>${v}</div>`).join('') +
  `<div class="pillp ac" id="dsP" style="left:60px;top:410px">Characterised ✓</div>`;

/* ---------- P: identify, classify, name ---------- */
const PN = ['1 CHARACTERISE', '2 IDENTIFY', '3 CLASSIFY', '4 NAME'];
$('#pch').innerHTML = PN.map((n, i) => `<span class="zc2" id="pc${i}">${n}</span>${i < 3 ? `<span style="display:inline-flex">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const KC = [['Rose', 0], ['Lotus', 0], ['China rose', 1]];
$('#kcs').innerHTML = `<div class="kc" id="kcD" style="left:20px;top:60px;background:var(--ac2)"><div style="position:absolute;left:0;width:196px;top:24px;display:flex;justify-content:center">${M.icon('hibiscus', 80, HIB, 2)}</div><div class="kt">Our plant</div><div class="lbl" style="left:22px;top:186px;font-size:14px">5 PETALS · TUBE</div></div>` +
  KC.map(([n, ok], i) => `<div class="kc" id="kc${i}" style="left:280px;top:60px"><div style="position:absolute;left:0;width:196px;top:24px;display:flex;justify-content:center">${M.icon(i === 1 ? 'sprout' : 'hibiscus', 80, i === 2 ? HIB : i === 0 ? '#C8432F' : '#E79AB0', 2)}</div><div class="kt">${n}</div><div class="km" style="background:${ok ? 'var(--ok)' : 'var(--red)'}">${ok ? TICK : CROSS}</div></div>`).join('') +
  `<div class="lbl" id="kcL" style="left:20px;top:300px">COMPARE WITH KNOWN PLANTS</div><div class="pillp good" id="kcP" style="left:20px;top:340px;height:44px;font-size:20px">Match found: China rose</div>`;
const GB = [['MOSSES', 84], ['FERNS', 196], ['FLOWERING PLANTS', 308]];
$('#gbs').innerHTML = GB.map(([n, y], i) => `<div class="gbx" id="gb${i}" style="top:${y}px"><span>${n}</span></div>`).join('') +
  `<div class="tok" id="gtk" style="position:absolute;width:190px;height:52px;border-radius:12px;background:#fff;border:2.5px solid var(--ac);display:flex;align-items:center;gap:8px;padding:0 12px;box-sizing:border-box;font:600 21px Poppins;white-space:nowrap">${M.icon('hibiscus', 28, HIB, 2)}China rose</div>`;
const tId = T0('P2'), tCl = wt('P3', 'classification'), tNm = wt('P4', 'nomenclature'), tHib = wt('P4', 'Hibiscus');
const avP = PUC.avatar($('#sP'), { x: 160 + 1068 + 20, y: 324 + 526 - 120, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Now it has a real name!' });

/* ---------- L: why the order matters ---------- */
const STEPS = [['A name needs a description', 'describe the organism correctly first'], ['Identify before naming', 'know what the name is attached to'], ['Classify with relatives', 'one name points to one group'], ['Features, not use', 'not just food, clothing and shelter']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5'].map(id => T0(id) + 0.45);
const ORD = [['Characterise', 'DESCRIBE'], ['Identify', 'WHAT IS IT'], ['Classify', 'WHICH GROUP'], ['Name', 'LAST']];
$('#ords').innerHTML = ORD.map(([n, e], i) => `<div class="ord" id="od${i}" style="top:${84 + i * 82}px"><b>${i + 1}</b>${n}<em>${e}</em></div>`).join('');

/* ---------- S: systematics ---------- */
const sb = $('#sbS'), TR = [];
{ const lines = [[392, 520, 392, 460], [392, 460, 220, 400], [392, 460, 564, 400], [220, 400, 140, 300], [220, 400, 300, 300], [564, 400, 484, 300], [564, 400, 644, 300]];
  lines.forEach(([a, b, c, d]) => TR.push(mk(sb, 'path', { d: `M${a},${b} L${a},${(b + d) / 2 + 10} L${c},${(b + d) / 2 + 10} L${c},${d}`, stroke: GRN, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))); }
const sbN = [['ant', 140], ['bug', 300], ['crow', 484], ['worm', 644]].map(([ic, x]) => { const e = mk(sb, 'g', { transform: `translate(${x - 24} 236) scale(2)` }); e.innerHTML = M.IC[ic].map(d => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`).join(''); return e; });
const sbA = mk(sb, 'circle', { cx: 392, cy: 470, r: 12, fill: GOLD, stroke: BR, 'stroke-width': 2.5 });
const sbT = txt(sb, 410, 534, 'COMMON ANCESTOR', { 'font-size': 15, 'letter-spacing': 1.4, 'font-weight': 600, fill: '#8A6418' });

/* ---------- V: side by side ---------- */
const TA = [['scope', 'What is it?', 'IDENTIFY'], ['tree', 'Which group?', 'CLASSIFY'], ['book', 'What do we call it?', 'NAME']];
$('#tas').innerHTML = TA.map(([ic, n, e], i) => `<div class="ta" id="ta${i}" style="top:${84 + i * 96}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i>${n}<em>${e}</em></div>`).join('');
const vb = $('#vbS'), VT = [];
{ const P = [[392, 440, 392, 380], [392, 380, 230, 300], [392, 380, 554, 300], [230, 300, 150, 200], [230, 300, 310, 200], [554, 300, 474, 200], [554, 300, 634, 200]];
  P.forEach(([a, b, c, d]) => VT.push(mk(vb, 'path', { d: `M${a},${b} L${a},${(b + d) / 2} L${c},${(b + d) / 2} L${c},${d}`, stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))); }
const vbG = ['GROUP A', 'GROUP B', 'GROUP C', 'GROUP D'].map((s, i) => txt(vb, [150, 310, 474, 634][i], 180, s, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }));
const vbA = [mk(vb, 'circle', { cx: 230, cy: 300, r: 12, fill: GOLD, stroke: BR, 'stroke-width': 2.5 }), mk(vb, 'circle', { cx: 392, cy: 380, r: 12, fill: GOLD, stroke: BR, 'stroke-width': 2.5 })];
const vbR = mk(vb, 'rect', { x: 100, y: 150, width: 260, height: 160, rx: 16, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const th1 = PUC.think($('#th1'), { q: 'A scientist draws a tree showing which groups share a common ancestor. Taxonomy, or systematics?', opts: ['Taxonomy', 'Systematics'], right: 1, why: 'Systematics. It adds evolutionary relationships to taxonomy.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">characterise · identify · classify · <b>name</b> &nbsp;+&nbsp; systematics adds evolution</span>';

/* ---------- U: why it matters ---------- */
const UT = [['bug', 'Agriculture', 'Tell a crop pest from a harmless insect.', wt('U2', 'Farmers')], ['tree', 'Forestry', 'Know which trees grow where.', wt('U2', 'Forest')], ['pill', 'Industry', 'Find the right plant for a medicine or a fibre.', wt('U3', 'Industries')]];
$('#uts').innerHTML = UT.map(([ic, k, m], i) => `<div class="ut" id="ut${i}" style="left:${36 + i * 519}px"><div style="position:absolute;left:28px;top:28px;width:96px;height:96px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(ic, 52, C.ac, 2)}</div><div class="uk">${k}</div><div class="um">${m}</div></div>`).join('') +
  `<div class="pillp ac" id="utP" style="left:36px;top:500px">Taxonomy: knowing our living resources</div>`;

/* ---------- W: worked example ---------- */
const WQ = [['Notes six jointed legs, two wings, large eyes', 'CHARACTERISATION'], ['Compares it with a guide to known insects', 'IDENTIFICATION'], ['Places it in the insect group', 'CLASSIFICATION'], ['Writes down its scientific name', 'NOMENCLATURE · LAST']];
$('#wqs').innerHTML = WQ.map(([s, p], i) => `<div class="wq" id="wq${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="wt">${s}</div><div class="wp" id="wp${i}">${p}</div></div>`).join('');
const wbs = $('#wbS'), WI = {};
{ const X = 1300, Y = 300;
  WI.w = [-1, 1].map(s => mk(wbs, 'path', { d: `M${X},${Y - 30} C${X + s * 60},${Y - 150} ${X + s * 190},${Y - 120} ${X + s * 170},${Y - 50} C${X + s * 150},${Y - 10} ${X + s * 60},${Y - 20} ${X},${Y - 30} Z`, fill: '#DCEBF5', stroke: BR, 'stroke-width': 3 }));
  WI.l = []; [-1, 1].forEach(s => [-30, 0, 30].forEach((dy, k) => WI.l.push(mk(wbs, 'path', { d: `M${X + s * 20},${Y + dy} L${X + s * 70},${Y + dy - 20 + k * 10} L${X + s * 100},${Y + dy + 30 + k * 10}`, stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))));
  mk(wbs, 'ellipse', { cx: X, cy: Y + 40, rx: 30, ry: 70, fill: '#6B7A52', stroke: BR, 'stroke-width': 3.5 }); mk(wbs, 'ellipse', { cx: X, cy: Y - 20, rx: 34, ry: 30, fill: '#7E8C62', stroke: BR, 'stroke-width': 3.5 });
  mk(wbs, 'circle', { cx: X, cy: Y - 74, r: 28, fill: '#7E8C62', stroke: BR, 'stroke-width': 3.5 });
  WI.e = [-1, 1].map(s => mk(wbs, 'circle', { cx: X + s * 18, cy: Y - 82, r: 14, fill: '#C8432F', stroke: BR, 'stroke-width': 2.5 }));
  WI.t = [txt(wbs, X - 150, 470, '6 JOINTED LEGS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }), txt(wbs, X + 150, 470, '2 WINGS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }), txt(wbs, X, 150, 'LARGE EYES', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink })]; }

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'We name an organism first, and identify it later', right: 'Identify first: a name needs a known organism to attach to' });
const tS = $('#tS');
const tB = [['IDENTIFY', 60, GRN], ['NAME', 290, C.ink]].map(([s, x, c]) => { const e = mk(tS, 'g', {}); mk(e, 'rect', { x, y: 104, width: 150, height: 60, rx: 12, fill: '#fff', stroke: c, 'stroke-width': 3 }); txt(e, x + 75, 141, s, { 'text-anchor': 'middle', 'font-size': 18, fill: c, 'font-weight': 600, 'letter-spacing': 1.5 }); return e; });
const tAr = mk(tS, 'path', { d: 'M222,134 L276,134 M264,122 L278,134 L264,146', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const tLb = txt(tS, 210, 214, 'FIRST · THEN', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'letter-spacing': 1.5, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Statements: the basic processes of taxonomy, and what systematics adds' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Characterisation, identification, classification and nomenclature are basic to taxonomy.</div><div class="sl"><b>II</b>The word systematics comes from the Latin word systema.</div><div class="sl"><b>III</b>Systematics ignores evolutionary relationships.</div><div class="sl"><b>IV</b>An organism must be identified before it is named.</div>',
  opts: ['I and II only', 'II and III only', 'I, III and IV only', 'I, II and IV only'], right: 3, optW: 474, optY: 420 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b> (I, II, IV)'], ['<b style="color:var(--red)">III</b> is false'], ['Systematics adds evolution'], ['<b style="color:var(--ok)">I</b>: the four processes'], ['<b style="color:var(--ok)">II, IV</b>: systema; the order']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Three'), wt('A2', 'Systematics'), wt('A3', 'One'), wt('A3', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · taxonomy and systematics', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Taxonomy</b>: characterise, identify, classify, name', '<b>Based on</b>: structure, cells, development, ecology', '<b>Order</b>: identify first, name last',
    '<b>Systematics</b>: from <i>systema</i>, a systematic arrangement', '<b style="color:var(--ac)">Systematics adds</b> evolutionary relationships'] });
const YQ = ['What are the four basic processes of taxonomy?', 'Why must identification come before naming?', 'What does systematics add to taxonomy?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 06', topic: 'An address finds one house among millions. And living things?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = 1;
  const bi = $('#nmT'), g = $('#ng0'), s = $('#ns0'), gg = $('#gg0'), gs = $('#gs0');
  gg.style.left = (bi.offsetLeft + g.offsetLeft + g.offsetWidth / 2 - gg.offsetWidth / 2) + 'px'; gs.style.left = Math.min(452 - gs.offsetWidth - 10, bi.offsetLeft + s.offsetLeft + s.offsetWidth / 2 - gs.offsetWidth / 2) + 'px';
  const w = $('#sw1'); w.style.left = '36px'; w.style.top = '244px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    const tSd = wt('H2', 'Seeds'), tPw = wt('H2', 'powders');
    BOWL.forEach((b, i) => { M.vis(b.g, t, tMorph + 0.4 + i * 0.06, 1e9, { dy: 0, fade: 0.2 }); const r = b.sd ? M.io((t - tSd) / 0.3) : M.io((t - tPw) / 0.3); b.ring.style.opacity = r.toFixed(3); });
    M.vis($('#hjC0'), t, tSd, 1e9, POP); M.vis($('#hjC1'), t, tPw, 1e9, POP); M.vis($('#hjC2'), t, wt('H2', 'minute') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = wt('H3', 'garden') - 0.1;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.15, 1e9, { dy: 0, fade: 0.25 })) {
      hwI.forEach((_, i) => M.vis($('#hwi' + i), t, kOut + 0.2 + i * 0.05, 1e9, { ...POP, sc: 0.5 }));
      M.vis($('#hw0'), t, wt('H4', 'place') - 0.1, 1e9, POP); M.vis($('#hw1'), t, wt('H4', 'name') - 0.1, 1e9, POP);
      M.vis($('#hw2'), t, wt('H5', 'four') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#hw3'), t, wt('H5', 'systematics') - 0.1, 1e9, { dx: -16, dy: 0 });
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bt'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tdef = [wt('B2', 'describing'), wt('B2', 'identifying'), wt('B2', 'grouping'), wt('B2', 'naming')];
    PT.forEach((_, i) => { const el = $('#pt' + i); M.vis(el, t, tdef[i] - 0.15, 1e9, { dx: -16, dy: 0 });
      const on = M.io((t - tPt[i]) / 0.25) * (1 - M.io((t - (tPt[i + 1] ?? T1('B3') + 0.3)) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#bl'), t, T0('B4') - 0.15, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => M.vis($('#lk' + i), t, tLk[i] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#blP'), t, T1('B4') - 0.9, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP);
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = M.io((t - tZ[k + 1]) / 0.75);
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); l.dot.style.opacity = M.clamp((t - t0 + 0.1) / 0.15).toFixed(3); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    if (M.vis($('#dsc'), t, tZ[3] + 0.3, 1e9, { dy: 16 })) { DSC.forEach((_, i) => PUC.write($('#ds' + i), t, tZ[3] + 0.5 + i * 0.7, 0.6)); M.vis($('#dsP'), t, wt('Z5', 'characterised') - 0.1, 1e9, POP); }
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pch'), t, tP1 + 0.1, out, { dy: 12, ...o }); M.vis($('#pp'), t, tP1 + 0.05, out, { dy: 36, ...o });
    const tc = [0, tP1, tCl, tNm]; let cur = 0; tc.forEach((tt, i) => { if (t >= tt) cur = i; });
    PN.forEach((_, i) => { const el = $('#pc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    [0, 1, 2].forEach(i => { const el = $('#pn' + i); el.style.borderColor = cur === i + 1 ? C.ac : C.line; el.style.background = cur === i + 1 ? '#FFFFFF' : i + 1 < cur ? '#FBFCFA' : '#FFFFFF'; M.vis(el, t, tP1 + 0.2 + i * 0.12, 1e9, { dy: 16 }); });
    // identification: known plants slide in one after another until the match
    M.vis($('#kcD'), t, tId - 0.1, 1e9, POP);
    const tk = [tId + 0.5, tId + 1.9, tId + 3.3]; KC.forEach((_, i) => { const el = $('#kc' + i), a = M.io((t - tk[i]) / 0.4), b = i < 2 ? M.io((t - tk[i] - 1.2) / 0.3) : 0;
      M.hide(el, a <= 0 || b >= 1); el.style.opacity = (a * (1 - b)).toFixed(3); el.style.transform = `translate(${(40 * (1 - a) - 40 * b).toFixed(1)}px,0)`; M.vis(el.querySelector('.km'), t, tk[i] + 0.6, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); });
    M.vis($('#kcL'), t, tId + 0.3, 1e9, { dy: 8 }); M.vis($('#kcP'), t, wt('P2', 'exactly') - 0.2, 1e9, POP);
    // classification: the token drops into its group
    GB.forEach((_, i) => { const el = $('#gb' + i); M.vis(el, t, tCl - 0.2 + i * 0.1, 1e9, { dy: 10 }); el.style.borderColor = i === 2 ? mix('#CBD0DA', C.ac, M.io((t - wt('P3', 'flowering')) / 0.3)) : '#CBD0DA'; el.style.borderStyle = i === 2 && t > wt('P3', 'flowering') ? 'solid' : 'dashed'; });
    { const u = M.io((t - wt('P3', 'place')) / 1.1), x = 140 + 0 * u, y = M.lerp(-70, 340, u), el = $('#gtk'); M.vis(el, t, wt('P3', 'place') - 0.2, 1e9, { dy: 0, fade: 0.2 }); el.style.left = (20 + 240).toFixed(0) + 'px'; el.style.top = y.toFixed(1) + 'px'; }
    // nomenclature
    M.vis($('#nmL'), t, tNm, 1e9, { dy: 8 }); M.vis($('#nmB'), t, tNm + 0.1, 1e9, { dy: 16 });
    PUC.write($('#nmT'), t, tHib - 0.05, 1.0); M.vis($('#gg0'), t, tHib + 0.9, 1e9, POP); M.vis($('#gs0'), t, tHib + 1.2, 1e9, POP);
    M.vis($('#nmP'), t, tHib + 1.8, 1e9, POP);
    avP(t, T1('P4') - 0.2, out);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1');
    M.vis($('#lf'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.5, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 112]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    const lit = [tSt[0], tSt[1], tSt[2], tSt[1] + 0.6];
    ORD.forEach((_, i) => { const el = $('#od' + i); M.vis(el, t, tL1 + 0.4 + i * 0.12, 1e9, { dy: 10 }); const on = M.io((t - lit[i]) / 0.3) * (1 - M.io((t - tSt[3] + 0.2) / 0.3)); el.style.borderColor = mix(C.line, C.ac, on); el.style.background = mix('#FFFFFF', C.ac2, on); });
    M.vis($('#lrB'), t, wt('L5', 'use') - 0.1, 1e9, POP); M.vis($('#lrG'), t, wt('L5', 'features') - 0.1, 1e9, POP);
  }

  /* S: systematics */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1');
    M.vis($('#sa'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#sw0'), t, wt('S2', 'systema') - 0.1, 1e9, POP); M.vis($('#sw1'), t, wt('S2', 'systematic') - 0.1, 1e9, POP);
    M.vis($('#lnc'), t, wt('S3', 'Carolus') - 0.2, 1e9, { dy: 20 });
    M.vis($('#sb'), t, T0('S4') - 0.2, out, { dx: 60, dy: 0, ...o });
    [wt('S4', 'identification'), wt('S4', 'naming'), wt('S4', 'classification')].forEach((tt, i) => M.vis($('#cv' + i), t, tt - 0.1, 1e9, POP));
    const te = wt('S4', 'related'); M.vis($('#cvP'), t, wt('S4', 'adds') - 0.1, 1e9, POP);
    TR.forEach((p, i) => M.draw(p, t, te - 0.3 + (i ? 0.3 + Math.floor((i - 1) / 2) * 0.35 : 0), 0.4)); sbN.forEach((n, i) => { n.style.opacity = M.clamp((t - te - 0.9 - i * 0.1) / 0.2).toFixed(3); });
    M.vis(sbA, t, te - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(sbT, t, te + 0.1, 1e9, { dy: 6 });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#va'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    [wt('V2', 'what'), wt('V2', 'which'), wt('V2', 'call')].forEach((tt, i) => M.vis($('#ta' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#vaP'), t, T1('V2') - 0.6, 1e9, POP);
    const tv = wt('V3', 'which'); VT.forEach((p, i) => M.draw(p, t, tv - 0.2 + (i ? 0.3 + Math.floor((i - 1) / 2) * 0.3 : 0), 0.4)); vbG.forEach((g, i) => M.vis(g, t, tv + 0.9 + i * 0.08, 1e9, { dy: 6 }));
    vbA.forEach((a, i) => M.vis(a, t, wt('V3', 'ancestor') - 0.1 + i * 0.2, 1e9, { dy: 0, fade: 0.2 })); M.draw(vbR, t, wt('V3', 'branch') - 0.1, 0.5);
    M.vis($('#vbP'), t, wt('V3', 'ancestor') + 0.3, 1e9, POP);
    M.vis($('#th1'), t, tV4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV4, tOpts: wt('V4', 'Taxonomy') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Taxonomy') });
  }

  /* statement */
  const stOn = t >= tT && t < tU1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tU1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Describe') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Systematics') - 0.1, 0.9);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#uu'), t, tU1 + 0.3, OUT('W1'), { dy: 36, ...o });
    UT.forEach((u, i) => M.vis($('#ut' + i), t, u[3] - 0.15, 1e9, { dy: 20 }));
    M.vis($('#utP'), t, wt('U3', 'Taxonomy') - 0.1, 1e9, POP);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    const tw = ['W2', 'W3', 'W4', 'W5'];
    WQ.forEach((_, i) => { M.vis($('#wq' + i), t, T0(tw[i]) - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#wp' + i), t, T1(tw[i]) - (i === 3 ? 1.6 : 0.9), 1e9, POP); });
    const tl = wt('W2', 'legs'), tg = wt('W2', 'wings'), te = wt('W2', 'eyes');
    WI.l.forEach((l, i) => M.draw(l, t, tl - 0.2 + i * 0.05, 0.4)); WI.w.forEach(w => M.vis(w, t, tg - 0.1, 1e9, { dy: 0, fade: 0.25 })); WI.e.forEach(e => M.vis(e, t, te - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    WI.t.forEach((x, i) => M.vis(x, t, [tl, tg, te][i] + 0.3, 1e9, { dy: 6 }));
    M.vis(wbs, t, tW1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'name') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Identification') - 0.2 });
    M.vis(tB[0], t, wt('X3', 'Identification') - 0.1, 1e9, { dy: 10 }); M.draw(tAr, t, wt('X3', 'before'), 0.3); M.vis(tB[1], t, wt('X3', 'nomenclature') - 0.1, 1e9, { dy: 10 }); M.vis(tLb, t, wt('X3', 'nomenclature') + 0.2, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'basic') });
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
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
