// PUC Biology Ep 02: Characteristics of Living Organisms (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible "Living diagram canon"): sugar gold, mitochondrion/energy orange, nucleus violet, water sky
const BR = '#2E2A24', GRN = C.ac, MITO = '#E58A3C', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', OXY = '#2F6FEB', CO2 = '#6B7280';
const COAT = '#9A6438', COT = '#F3E3B8', COTS = '#B8944E', SOIL = '#DCC8A4';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const TICK = M.icon('check', 22, '#fff', 3.2), CROSS = M.icon('x', 22, '#fff', 3.2), DASH = M.icon('minus', 22, '#fff', 3.2);

Object.assign(M.IC, {
  crystal: ['M12 2.5 19.5 7v10L12 21.5 4.5 17V7Z', 'M12 2.5v9.5', 'M4.5 7 12 12l7.5-5', 'M12 12v9.5'],
  seed: ['M4.8 8.4C6 2.4 18 1.2 21.1 8.4c2.4 5.5-.7 11.3-6.7 10.8-2.4-.2-3.1-2.4-4.8-1.9-2.4.7-6 0-6.7-4-.5-1.9 1.2-3 1.9-4.9Z', 'M9.6 16.6c.6-1 .6-2.2 0-3'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  yeast: [ci(9.5, 13.5, 6.5), ci(18, 7, 3.3), ci(9.5, 13.5, 2)],
  stone: ['M4 17c-1-3 1-7 5-8.5S17 7 19.5 10 21 17 18 18.5 6 20 4 17Z', 'M9 13.5l3 2'],
  grow: ['M3 21h18', 'M6 21v-4', 'M11 21v-8', 'M16 21V8', 'M14 6l2-2.5L18 6'],
  repro: [ci(7, 12, 4.2), ci(17, 12, 4.2), 'M11.2 12h1.6'],
  mito: ['M2.5 12c0-3.6 4.2-6 9.5-6s9.5 2.4 9.5 6-4.2 6-9.5 6-9.5-2.4-9.5-6Z', 'M6 12c1-2 2 2 3 0s2 2 3 0 2 2 3 0 2 2 3 0'],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  sense: [ci(18.5, 5.5, 2.6), 'M18.5 1v1', 'M23 5.5h-1', 'M5 22v-6c0-4 3-7.5 8-8.5', 'M9 13.5c-2.4-.4-4-2-4.3-4 2.4 0 4 1.6 4.3 4Z'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H3') - 0.05, tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tG1 = T0('G1'), tL1 = T0('L1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1'), tD1 = T0('D1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- drawing helpers ---------- */
// sugar crystal: a six-sided prism seen face on (sugar gold edge)
const crystal = (g, cx, cy, s, sw = 3.5) => { const P = [[0, -1], [0.82, -0.48], [0.82, 0.48], [0, 1], [-0.82, 0.48], [-0.82, -0.48]].map(([a, b]) => [cx + a * s, cy + b * s]);
  const e = mk(g, 'g', {}); mk(e, 'path', { d: 'M' + P.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z', fill: '#FBF1D8', stroke: '#B8892A', 'stroke-width': sw, 'stroke-linejoin': 'round' });
  [0, 2, 4].forEach(k => mk(e, 'line', { x1: cx, y1: cy, x2: P[k][0], y2: P[k][1], stroke: '#E2C88A', 'stroke-width': sw * 0.7 })); return e; };
// a kidney shaped bean (box 0..100) placed at x, y with scale s and rotation r
const BEAN = 'M20,35 C25,10 75,5 88,35 C98,58 85,82 60,80 C50,79 47,70 40,72 C30,75 15,70 12,55 C10,47 17,42 20,35 Z';
const bean = (g, x, y, s, r = 0, fill = COAT) => mk(g, 'path', { d: BEAN, fill, stroke: BR, 'stroke-width': 3 / s, transform: `translate(${x} ${y}) rotate(${r}) scale(${s}) translate(-50 -45)` });

/* ---------- title card ---------- */
const JOBS = [['crystal', 'A sugar crystal', 'GROWS EVERY DAY', ['H1', 'sugar']], ['seed', 'A bean seed', 'STILL FOR MONTHS', ['H2', 'bean']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3][0], j[3][1]));

/* ---------- H: two jars ---------- */
const hs = $('#hjS'), jarC = [], jarS = {};
{ // crystal jar
  mk(hs, 'path', { d: 'M96,150 L96,452 Q96,476 120,476 L312,476 Q336,476 336,452 L336,150', fill: '#FFFFFF', stroke: BR, 'stroke-width': 4 });
  mk(hs, 'path', { d: 'M100,214 L332,214 L332,452 Q332,472 312,472 L120,472 Q100,472 100,452 Z', fill: '#F8EDD2' });
  mk(hs, 'line', { x1: 72, y1: 132, x2: 360, y2: 132, stroke: '#8A6A44', 'stroke-width': 10, 'stroke-linecap': 'round' });
  mk(hs, 'line', { x1: 216, y1: 132, x2: 216, y2: 280, stroke: BR, 'stroke-width': 2 });
  for (let k = 0; k < 3; k++) jarC.push(crystal(hs, 216, 330, 30 + k * 16));
  // seed jar
  mk(hs, 'path', { d: 'M452,150 L452,452 Q452,476 476,476 L668,476 Q692,476 692,452 L692,150', fill: '#FFFFFF', stroke: BR, 'stroke-width': 4 });
  mk(hs, 'rect', { x: 444, y: 134, width: 256, height: 20, rx: 6, fill: '#C9B36A', stroke: BR, 'stroke-width': 3 });
  [[510, 448, 0.52, -8], [566, 452, 0.5, 6], [624, 446, 0.52, -14], [538, 418, 0.5, 12], [598, 420, 0.48, -4]].forEach(([x, y, s, r]) => bean(hs, x, y, s, r));
}
const tDay = T0('H3'), tDayE = T0('H4') - 0.3;
$('#pkI0').innerHTML = M.icon('crystal', 72, GOLD, 2); $('#pkI1').innerHTML = M.icon('seed', 72, COAT, 2);

/* ---------- B: five features ---------- */
const FT = [['grow', 'Growth', 'GETTING BIGGER', ['B2', 'Growth']], ['repro', 'Reproduction', 'MAKING MORE OF YOUR KIND', ['B2', 'Reproduction']], ['mito', 'Metabolism', 'CHEMICAL REACTIONS INSIDE', ['B3', 'Metabolism']],
  ['cell', 'Cellular organisation', 'BUILT FROM CELLS', ['B3', 'Cellular']], ['sense', 'Response', 'SENSING AND REACTING', ['B4', 'response']]];
$('#fts').innerHTML = FT.map(([ic, n, w], i) => `<div class="ft" id="ft${i}" style="top:${84 + i * 94}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="fn">${n}</div><div class="fw">${w}</div></div>`).join('');
const tFt = FT.map(f => wt(f[3][0], f[3][1]));
$('#sbLi').innerHTML = ['tree', 'paw', 'microbe', 'user'].map(ic => `<span>${M.icon(ic, 34, C.ac, 2.2)}</span>`).join('');
$('#sbNi').innerHTML = [['crystal', GOLD], ['stone', C.mute], ['flame', MITO]].map(([ic, c]) => `<span>${M.icon(ic, 34, c, 2.2)}</span>`).join('');

/* ---------- Z: zoom ladder into the bean seed ---------- */
const ZN = ['SEED', 'EMBRYO', 'CELL', 'MITOCHONDRION'], ZS = ['x1', 'x10', 'x400', 'x20,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Seed', 'A baby plant packed with its food, inside a tough coat.', 'Here: one dry bean seed, split open.'],
  ['RUNG 2 OF 4', 'Embryo', 'The baby plant itself, waiting.', 'Radicle: the future root. Plumule: the future shoot.'],
  ['RUNG 3 OF 4', 'Cell', 'The embryo is built from living cells.', 'Here: one cell, with its nucleus and mitochondria.'],
  ['RUNG 4 OF 4', 'Mitochondrion', 'Breaks down food to release energy.', 'This chemical work is metabolism.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln"${i === 3 ? ' style="font-size:50px"' : ''}>${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The seed is busy inside!' });

const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[598, 330, 52], [520, 330, 56], [612, 330, 44], null];
const LAB = [];
// level 0: a bean seed split open
{ const g = ZG[0], kid = 'M300,150 C380,70 650,62 770,160 C850,226 836,356 744,400 C650,444 590,380 548,374 C498,366 440,448 336,418 C236,388 226,236 300,150 Z';
  mk(g, 'path', { d: kid, fill: COAT, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: kid, fill: COT, stroke: COTS, 'stroke-width': 3 / 0.9, transform: 'translate(536 262) scale(0.9) translate(-536 -262)' });
  [[400, 200, 340, 270], [470, 140, 420, 220], [660, 150, 720, 240]].forEach(([a, b, c, d]) => mk(g, 'path', { d: `M${a},${b} Q${(a + c) / 2 + 30},${(b + d) / 2} ${c},${d}`, stroke: '#E6CF95', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
  // embryonal axis near the hilum
  mk(g, 'path', { d: 'M572,300 C566,330 572,356 590,372 C606,360 612,330 604,300 Z', fill: '#E8D27E', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M588,302 C574,286 566,272 570,262 C584,270 590,286 588,302 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M588,302 C600,284 612,276 620,276 C616,292 602,300 588,302 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'ellipse', { cx: 548, cy: 384, rx: 22, ry: 8, fill: '#5B3A20' });
  LAB[0] = [[420, 98, 300, 62, 'Seed coat', 'end'], [420, 270, 150, 330, 'Cotyledon', 'end'], [606, 330, 830, 300, 'Embryo', 'start'], [548, 390, 548, 470, 'Hilum', 'start', [548, 470]]];
}
// level 1: the embryo (embryonal axis between the two cotyledons)
{ const g = ZG[1];
  mk(g, 'path', { d: 'M486,220 C400,170 210,150 128,236 C82,320 160,430 300,430 C400,430 468,340 486,286 Z', fill: COT, stroke: COTS, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M554,220 C640,170 830,150 912,236 C958,320 880,430 740,430 C640,430 572,340 554,286 Z', fill: COT, stroke: COTS, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M488,150 C482,240 484,330 504,420 Q520,456 536,420 C556,330 558,240 552,150 Z', fill: '#EAD58C', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M520,152 C492,112 466,84 444,88 C462,126 492,146 520,152 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M520,152 C548,112 574,84 596,88 C578,126 548,146 520,152 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 3.5 });
  for (let k = 0; k < 7; k++) mk(g, 'line', { x1: 494, y1: 190 + k * 34, x2: 546, y2: 190 + k * 34, stroke: '#D2BC70', 'stroke-width': 2 });
  LAB[1] = [[520, 112, 680, 66, 'Plumule', 'start'], [520, 438, 680, 470, 'Radicle', 'start'], [210, 300, 180, 470, 'Cotyledon', 'start'], [552, 260, 760, 230, 'Embryonal axis', 'start']];
}
// level 2: one embryo cell (small vacuoles, food grains, mitochondria)
{ const g = ZG[2];
  [[40, 70], [740, 70]].forEach(([x, y]) => { mk(g, 'rect', { x, y, width: 280, height: 390, rx: 30, fill: '#F6F1DF', stroke: '#BBA66A', 'stroke-width': 4 }); });
  mk(g, 'rect', { x: 340, y: 60, width: 380, height: 410, rx: 34, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 356, y: 76, width: 348, height: 378, rx: 24, fill: '#F7F3E2', stroke: GRN, 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: 470, cy: 230, r: 52, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(g, 'circle', { cx: 476, cy: 224, r: 16, fill: NUC });
  [[620, 140, 18], [400, 400, 14], [640, 410, 12]].forEach(([x, y, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 2.5 }));
  [[420, 120], [560, 110], [400, 330], [520, 400], [660, 250], [580, 200]].forEach(([x, y], k) => mk(g, 'ellipse', { cx: x, cy: y, rx: 13, ry: 9, fill: '#F2DC9B', stroke: GOLD, 'stroke-width': 2, transform: `rotate(${k * 30} ${x} ${y})` }));
  [[612, 330, 12], [520, 310, -30], [430, 140, 70], [660, 380, 40]].forEach(([x, y, a]) => { const c = mk(g, 'g', { transform: `rotate(${a} ${x} ${y})` });
    mk(c, 'ellipse', { cx: x, cy: y, rx: 26, ry: 13, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5 }); mk(c, 'path', { d: `M${x - 18},${y} q4,-7 8,0 t8,0 t8,0 t8,0`, stroke: '#B35F22', 'stroke-width': 2, fill: 'none' }); });
  LAB[2] = [[342, 180, 290, 150, 'Cell wall', 'end'], [470, 278, 290, 330, 'Nucleus', 'end'], [636, 330, 780, 300, 'Mitochondrion', 'start'], [560, 110, 780, 96, 'Stored food', 'start'], [400, 400, 290, 440, 'Vacuole', 'end']];
}
// level 3: one mitochondrion, food in, energy out (the looping process)
const mfood = [], mout = [];
{ const g = ZG[3], CX = 500, CY = 250;
  mk(g, 'ellipse', { cx: CX, cy: CY, rx: 330, ry: 150, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: CX, cy: CY, rx: 306, ry: 126, fill: '#FBE3C8', stroke: '#B35F22', 'stroke-width': 3 });
  for (let k = 0; k < 8; k++) { const x = CX - 245 + k * 70, top = k % 2 === 0, y0 = top ? CY - 124 + Math.abs(k - 3.5) * 4 : CY + 124 - Math.abs(k - 3.5) * 4, y1 = top ? CY + 10 : CY - 10;
    mk(g, 'path', { d: `M${x},${y0} L${x},${y1}`, stroke: '#B35F22', 'stroke-width': 16, 'stroke-linecap': 'round' });
    mk(g, 'path', { d: `M${x},${y0} L${x},${y1}`, stroke: '#F2B57E', 'stroke-width': 7, 'stroke-linecap': 'round' }); }
  for (let k = 0; k < 5; k++) mfood.push(mk(g, 'circle', { r: 9, fill: GOLD, stroke: BR, 'stroke-width': 2 }));
  for (let k = 0; k < 4; k++) { const e = mk(g, 'g', {}); mk(e, 'path', { d: 'M0,-14 L6,-3 L16,-2 L8,6 L10,16 L0,10 L-10,16 L-8,6 L-16,-2 L-6,-3 Z', fill: MITO, stroke: '#B35F22', 'stroke-width': 2 }); mout.push(e); }
  LAB[3] = [[262, 152, 70, 66, 'Outer membrane', 'start'], [470, 128, 400, 56, 'Inner membrane', 'start'], [395, 330, 250, 404, 'Crista', 'end'], [640, 300, 760, 420, 'Matrix', 'start']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => {
  const g = ZG[lv], d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [
  [wt('Z2', 'coat') - 0.1, wt('Z2', 'cotyledons'), wt('Z2', 'packed'), wt('Z2', 'lunch') + 0.3],
  [wt('Z3', 'plumule'), wt('Z3', 'radicle'), wt('Z3', 'between'), wt('Z3', 'embryo')],
  [wt('Z4', 'cells'), wt('Z4', 'nucleus'), wt('Z4', 'mitochondria'), wt('Z4', 'mitochondria') + 0.5, wt('Z4', 'tiny')],
  [wt('Z5', 'mitochondrion'), wt('Z5', 'mitochondrion') + 0.5, wt('Z5', 'food'), wt('Z5', 'release')]];
const tFood = wt('Z5', 'food'), tEn = wt('Z5', 'energy');
const zFx = document.createElement('div'); zFx.className = 'pillp'; zFx.style.cssText = 'left:36px;top:446px;height:52px;font-size:22px';
zFx.innerHTML = `Metabolism &nbsp;<span style="font-size:24px">${K(`\\textcolor{${GOLD}}{\\text{food}} + \\textcolor{${OXY}}{\\mathrm{O_2}} \\rightarrow \\textcolor{${CO2}}{\\mathrm{CO_2}} + \\textcolor{${WAT}}{\\mathrm{H_2O}} + \\textcolor{${MITO}}{\\text{energy}}`)}</span>`; $('#zd').appendChild(zFx);

/* ---------- G: germination stage chain + the crystal ---------- */
const GN = ['1 SWELLS', '2 METABOLISM UP', '3 RADICLE OUT', '4 SHOOT RISES'];
$('#gch').innerHTML = GN.map((n, i) => `<span class="zc" id="gc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tGs = [T0('G2'), T0('G3'), T0('G4'), T0('G5')];
const GT = [['Takes in water', 'The dry seed drinks water and swells.'], ['Metabolism speeds up', 'Stored food is broken down for energy.'], ['Radicle comes out', 'The root pushes out and grows down.'], ['Shoot rises', 'The shoot grows up toward the light.']];
GT.forEach(([h, d], i) => { const e = document.createElement('div'); e.id = 'gt' + i; e.style.cssText = 'position:absolute;left:716px;top:110px;width:310px';
  e.innerHTML = `<div style="font:600 64px 'IBM Plex Mono';color:var(--ac)">0${i + 1}</div><div style="font:700 30px/1.2 Poppins;margin-top:6px">${h}</div><div style="font:500 23px/1.35 Poppins;color:var(--ink2);margin-top:12px">${d}</div>`; $('#gd').appendChild(e); });
const gs = $('#gS'), GX = 360, GY = 330;
mk(gs, 'rect', { x: 0, y: 240, width: 660, height: 290, fill: SOIL });
mk(gs, 'line', { x1: 0, y1: 240, x2: 660, y2: 240, stroke: '#8A6A44', 'stroke-width': 4 });
{ const r = M.rng(5); for (let k = 0; k < 40; k++) mk(gs, 'circle', { cx: (r() * 660 + 10).toFixed(1), cy: (250 + r() * 270).toFixed(1), r: (2 + r() * 3).toFixed(1), fill: '#C2A97E' }); }
const gSun = mk(gs, 'g', {}); mk(gSun, 'circle', { cx: 600, cy: 110, r: 26, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(gSun, 'line', { x1: 600 + 34 * Math.cos(a), y1: 110 + 34 * Math.sin(a), x2: 600 + 46 * Math.cos(a), y2: 110 + 46 * Math.sin(a), stroke: GOLD, 'stroke-width': 3, 'stroke-linecap': 'round' }); }
const gRoot = mk(gs, 'path', { stroke: '#C9A65A', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
const gHairs = [0, 1, 2, 3, 4, 5].map(() => mk(gs, 'path', { stroke: '#C9A65A', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }));
const gShoot = mk(gs, 'path', { stroke: '#4E8A3A', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
const gLeaf = [0, 1].map(() => mk(gs, 'path', { d: 'M0,0 C10,-18 34,-22 48,-14 C36,-2 16,4 0,0 Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 2.5 }));
const gSeed = mk(gs, 'path', { d: BEAN, fill: COAT, stroke: BR, 'stroke-width': 3 });
const gDots = [0, 1, 2, 3, 4].map(() => mk(gs, 'circle', { r: 6, fill: GOLD }));
const gDrops = [0, 1, 2, 3].map(() => mk(gs, 'path', { d: 'M0,-12 C5,-4 8,0 8,4 A8 8 0 0 1 -8,4 C-8,0 -5,-4 0,-12 Z', fill: WAT }));
const gLab = [txt(gs, 60, 280, 'SOIL', { 'font-size': 16, 'letter-spacing': 1.5, fill: '#8A6A44', 'font-weight': 600 })];
// crystal card
const gcs = $('#gcS'), gcLay = [], gcSug = [];
for (let k = 0; k < 3; k++) gcLay.push(crystal(gcs, 256, 220, 56 + k * 34, 3.5));
gcLay.reverse();
for (let k = 0; k < 8; k++) gcSug.push(mk(gcs, 'rect', { width: 12, height: 12, rx: 2, fill: GOLD, stroke: '#8A6418', 'stroke-width': 1.5 }));
const gcT = txt(gcs, 256, 362, 'SUGAR STICKS ON THE OUTSIDE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });

/* ---------- L: five tests ---------- */
const STEPS = [['Growth', 'the crystal grows too', 0], ['Reproduction', 'some living things never make young', 0], ['Metabolism', 'every living thing; no non living object', 1],
  ['Cellular organisation', 'every living thing is built from cells', 1], ['Response', 'all sense and react, from bacteria to trees', 1]];
$('#st5s').innerHTML = STEPS.map(([s, w, d], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div>
  <div class="vd" id="vd${i}" style="background:${d ? 'var(--ac)' : 'var(--redBg)'};color:${d ? '#fff' : 'var(--red)'}">${d ? 'DEFINING' : 'NOT DEFINING'}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => T0(id) + 0.45);
const SB = [['Growth', 1, 1], ['Reproduction', 1, 0], ['Metabolism', 1, 0], ['Cells', 1, 0], ['Response', 1, 0]];
$('#sbs').innerHTML = SB.map(([n, a, b], i) => `<div class="sb" id="sb${i}" style="top:${120 + i * 70}px"><div class="sn">${n}</div>
  <div class="sc" id="sa${i}" style="left:432px;background:${a ? 'var(--ok)' : 'var(--red)'}">${a ? TICK : CROSS}</div><div class="sc" id="sz${i}" style="left:592px;background:${b ? 'var(--ok)' : 'var(--red)'}">${b ? TICK : CROSS}</div></div>`).join('') +
  `<div class="pillp ac" id="sbP" style="left:36px;top:488px">Seed 5 of 5 · Crystal 1 of 5</div>`;

/* ---------- V: side by side ---------- */
const VA = [['Grows', 1, 'FROM OUTSIDE'], ['Cells', 0, 'NONE'], ['Metabolism', 0, 'NONE'], ['Response', 0, 'NONE']];
const VB = [['Grows', 2, 'NOT YET'], ['Cells', 1, 'ALIVE'], ['Metabolism', 1, 'VERY SLOW'], ['Response', 1, 'SPROUTS IN WATER']];
const vrow = (pre, R) => R.map(([n, s, e], i) => `<div class="vr" id="${pre}${i}" style="top:${292 + i * 70}px"><b style="background:${s === 1 ? 'var(--ok)' : s === 0 ? 'var(--red)' : C.dim}">${s === 1 ? TICK : s === 0 ? CROSS : DASH}</b>${n}<em>${e}</em></div>`).join('');
$('#vas').innerHTML = vrow('va', VA); $('#vbs').innerHTML = vrow('vb', VB);
crystal($('#vaS'), 392, 180, 92, 4.5);
{ const v = $('#vbS'), kid = 'M300,110 C340,70 470,66 520,112 C556,146 548,214 500,236 C456,256 428,226 408,224 C384,222 356,262 312,248 C268,232 264,150 300,110 Z';
  mk(v, 'path', { d: kid, fill: COAT, stroke: BR, 'stroke-width': 4 });
  mk(v, 'path', { d: kid, fill: COT, stroke: COTS, 'stroke-width': 3, transform: 'translate(410 160) scale(0.9) translate(-410 -160)' });
  // a window of live cells inside the seed
  mk(v, 'circle', { cx: 420, cy: 160, r: 58, fill: '#F7F3E2', stroke: GRN, 'stroke-width': 3 });
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const x = 388 + a * 32, y = 128 + b * 32; if (Math.hypot(x - 420, y - 160) > 46) continue;
    mk(v, 'rect', { x: x - 14, y: y - 14, width: 28, height: 28, rx: 6, fill: '#FBF7EA', stroke: '#BBA66A', 'stroke-width': 2 }); mk(v, 'circle', { cx: x, cy: y, r: 5, fill: NUC }); } }
const vbPulse = mk($('#vbS'), 'circle', { cx: 420, cy: 160, r: 58, fill: 'none', stroke: MITO, 'stroke-width': 3 });
const th1 = PUC.think($('#th1'), { q: 'Which feature proves the still seed is alive?', opts: ['Growth', 'Metabolism'], right: 1, why: 'Metabolism. Its cells keep doing chemical work, even while the seed sits still.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">growth ✗ · reproduction ✗ · <b>metabolism ✓ · cells ✓ · response ✓</b></span>';

/* ---------- D: how biologists describe living things ---------- */
const DF = [['SELF-REPLICATING', 'Copies itself', 'Makes more of its own kind.', wt('D2', 'copies')], ['EVOLVING', 'Evolves', 'Changes slowly over many generations.', wt('D2', 'change')],
  ['SELF-REGULATING', 'Controls its inside', 'Keeps conditions inside steady.', wt('D2', 'control')], ['INTERACTIVE', 'Senses, responds', 'Reacts to light, heat, touch and chemicals.', wt('D3', 'sensing')]];
$('#dfs').innerHTML = DF.map(([n, k, m], i) => `<div class="df" id="df${i}" style="left:${36 + i * 384}px"><div class="dn">${n}</div><svg id="dfs${i}" width="356" height="250" style="position:absolute;left:0;top:0"></svg><div class="dk">${k}</div><div class="dm">${m}</div></div>`).join('');
const dA = {};
{ const a = $('#dfs0'); dA.c = [0, 1].map(() => mk(a, 'circle', { r: 46, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 5 })); dA.n = [0, 1].map(() => mk(a, 'circle', { r: 12, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }));
  const b = $('#dfs1'); dA.g = [0, 1, 2].map(k => { const e = mk(b, 'g', {}); mk(e, 'path', { d: 'M0,24 C-22,10 -24,-14 0,-30 C24,-14 22,10 0,24 Z', fill: ['#CFE6C6', '#9FD09A', '#5FA86F'][k], stroke: BR, 'stroke-width': 3, transform: `translate(${70 + k * 108} 140) scale(${0.8 + k * 0.25})` }); txt(b, 70 + k * 108, 214, 'GEN ' + (k + 1), { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2 }); return e; });
  dA.ga = [0, 1].map(k => mk(b, 'path', { d: `M${106 + k * 108},140 l28,0 m-8,-7 l8,7 l-8,7`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
  const c = $('#dfs2'); mk(c, 'rect', { x: 40, y: 124, width: 276, height: 24, rx: 12, fill: '#FFFFFF', stroke: C.line, 'stroke-width': 2 });
  mk(c, 'rect', { x: 148, y: 124, width: 60, height: 24, fill: C.ac2 }); mk(c, 'line', { x1: 178, y1: 110, x2: 178, y2: 162, stroke: GRN, 'stroke-width': 3, 'stroke-dasharray': '5 4' });
  txt(c, 178, 196, 'STEADY', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: GRN, 'font-weight': 600 }); txt(c, 40, 196, 'LOW', { 'font-size': 15 }); txt(c, 316, 196, 'HIGH', { 'text-anchor': 'end', 'font-size': 15 });
  dA.nd = mk(c, 'path', { d: 'M0,-34 L10,-16 L-10,-16 Z', fill: C.ink });
  const d = $('#dfs3'); dA.sun = mk(d, 'circle', { cx: 286, cy: 76, r: 22, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
  mk(d, 'line', { x1: 60, y1: 214, x2: 300, y2: 214, stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
  dA.st = mk(d, 'path', { stroke: '#4E8A3A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  dA.lf = mk(d, 'path', { d: 'M0,0 C8,-14 26,-16 36,-10 C28,0 12,4 0,0 Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 2.5 }); }

/* ---------- W: worked example ---------- */
const WK = [['crystal', GOLD, 'Sugar crystal', [1, 0, 0], 0, wt('W2', 'sugar')], ['seed', COAT, 'Dry seed', [2, 1, 1], 1, wt('W3', 'dry')],
  ['flame', MITO, 'Candle flame', [1, 0, 0], 0, wt('W4', 'candle')], ['yeast', GRN, 'Yeast', [1, 1, 1], 1, wt('W5', 'Yeast')]];
const WCK = ['Grows', 'Has cells', 'Metabolism'];
$('#wks').innerHTML = WK.map(([ic, c, n, ck, v], i) => `<div class="wk" id="wk${i}" style="left:${36 + i * 384}px"><div class="wh"><i>${M.icon(ic, 64, c, 2.2)}</i><span>${n}</span></div>
  ${WCK.map((k, j) => `<div class="ck" style="top:${166 + j * 58}px"><span>${k}</span><b id="wc${i}${j}" style="background:${ck[j] === 1 ? 'var(--ok)' : ck[j] === 0 ? 'var(--red)' : C.dim}">${ck[j] === 1 ? TICK : ck[j] === 0 ? CROSS : DASH}</b></div>`).join('')}
  <div class="wv" id="wv${i}" style="background:${v ? 'var(--ac)' : 'var(--redBg)'};color:${v ? '#fff' : 'var(--red)'}">${v ? 'LIVING' : 'NOT LIVING'}</div></div>`).join('');
const tWck = [[wt('W2', 'grows'), wt('W2', 'cells'), wt('W2', 'metabolism'), wt('W2', 'Not')], [wt('W3', 'Cells') - 0.3, wt('W3', 'Cells'), wt('W3', 'slow'), wt('W3', 'Living')],
  [wt('W4', 'grows'), wt('W4', 'cells'), wt('W4', 'cells') + 0.4, wt('W4', 'Not')], [wt('W5', 'One'), wt('W5', 'cell'), wt('W5', 'busy'), wt('W5', 'Living')]];
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The flame fooled me too.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Anything that grows is alive', right: 'Crystals grow from outside; living things grow from inside' });
const tS = $('#tS'), tLay = [0, 1, 2].map(k => crystal(tS, 120, 132, 34 + k * 22, 3)).reverse();
const tCel = [0, 1].map(() => mk(tS, 'circle', { r: 34, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 4 }));
const tLb = [txt(tS, 120, 240, 'LAYERS OUTSIDE', { 'text-anchor': 'middle', 'font-size': 15, fill: '#B8892A', 'letter-spacing': 1.2, 'font-weight': 600 }), txt(tS, 334, 240, 'NEW CELLS INSIDE', { 'text-anchor': 'middle', 'font-size': 15, fill: GRN, 'letter-spacing': 1.2, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: [], type: 'Statements: which feature defines life, and which does not' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Growth is a defining property of all living organisms.</div><div class="sl"><b>II</b>A sugar crystal grows by adding material to its surface.</div><div class="sl"><b>III</b>Metabolism is seen in every living organism.</div><div class="sl"><b>IV</b>A dry seed shows no metabolism at all.</div>',
  opts: ['II and III only', 'I and II only', 'I, II and III', 'II, III and IV'], right: 0, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (II, III)'], ['<b style="color:var(--red)">I</b> is false'], ['Crystals grow too'], ['<b style="color:var(--red)">IV</b> is false'], ['Dry seed: slow metabolism']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'One'), wt('A2', 'crystals'), wt('A3', 'Four'), wt('A3', 'metabolism')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · characteristics of life', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Defining feature</b>: in every living thing, in no non living thing', '<b style="color:var(--red)">Not defining</b>: growth (crystals grow), reproduction', '<b style="color:var(--ac)">Defining</b>: metabolism, cellular organisation, response',
    '<b>Growth</b>: living things from inside, crystals from outside', '<b>Dry seed</b>: alive, its metabolism runs very slowly'] });
const YQ = ['Why is growth not a defining feature of life?', 'What is going on inside a dry seed?', 'Why is a candle flame not alive?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 03', topic: 'A mule never has babies, yet it is alive. How?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = wt('G4', 'radicle') - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = 1;
  const g = $('#tgh'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  const p = $('#pkT'); p.style.left = (170 - p.offsetWidth / 2) + 'px'; p.style.transform = 'none';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#tgh'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    const u = M.clamp((t - tDay) / (tDayE - tDay)); M.setT($('#hjD'), 'DAY ' + Math.max(1, Math.round(1 + 29 * u)));
    M.vis($('#hjT'), t, tMorph + 0.8, 1e9, { dy: 8 });
    jarC.forEach((c, k) => { c.style.opacity = M.clamp(u * 3 - k + 0.6).toFixed(3); });
    M.vis($('#hjC0'), t, tMorph + 1.0, 1e9, POP); M.vis($('#hjC1'), t, tMorph + 1.3, 1e9, POP);
    M.vis($('#hk'), t, T0('H3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, T0('H3') + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, T0('H3') + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'which') - 0.3, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, T0('H3'), kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#pick'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) {
      M.vis($('#pk0'), t, tH4 + 0.05, 1e9, { dy: 20 }); M.vis($('#pk1'), t, tH4 + 0.2, 1e9, { dy: 20 });
      M.vis($('#pkT'), t, wt('H4', 'pick') - 0.1, 1e9, POP);
      const x = M.io((t - wt('H4', 'wrong')) / 0.35); $('#pkX').style.width = (292 * x).toFixed(1) + 'px'; M.hide($('#pkX'), x <= 0);
      $('#pk0').style.background = mix(C.soft, C.redBg, x); $('#pk1').style.background = mix(C.soft, C.ac2, x);
      M.vis($('#pkW'), t, wt('H4', 'wrong') + 0.2, 1e9, POP);
      M.vis($('#pk2'), t, wt('H5', 'features') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#pk3'), t, wt('H5', 'only') - 0.1, 1e9, { dx: -16, dy: 0 });
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bf'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bgh'), t, tB1 + 0.5, 1e9, { dy: 8 });
    FT.forEach((_, i) => { const el = $('#ft' + i); M.vis(el, t, tFt[i] - 0.15, 1e9, { dx: -16, dy: 0 });
      const on = M.io((t - tFt[i]) / 0.25) * (1 - M.io((t - (tFt[i + 1] ?? T1('B4') + 0.3)) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#bd'), t, T0('B5') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tE = wt('B5', 'every'), tN0 = wt('B5', 'no');
    M.vis($('#sbL'), t, T0('B5') + 0.2, 1e9, { dy: 16 }); M.vis($('#sbN'), t, T0('B5') + 0.35, 1e9, { dy: 16 });
    $('#sbL').style.borderColor = mix(C.line, C.ac, M.io((t - tE) / 0.3)); $('#sbN').style.borderColor = mix(C.line, C.red, M.io((t - tN0) / 0.3));
    M.vis($('#sbLv'), t, tE + 0.2, 1e9, POP); M.vis($('#sbNv'), t, tN0 + 0.2, 1e9, POP);
    M.vis($('#ts0'), t, tE - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#ts1'), t, tN0 - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#bdP'), t, wt('B6', 'defining') - 0.1, 1e9, POP);
  }

  /* Z: zoom ladder */
  const zOn = t >= tZ1 - 0.1 && t < tG1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('G1');
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
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); l.dot.style.opacity = M.clamp((t - t0 + 0.1) / 0.15).toFixed(3); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    // looping metabolism: food dots drift into the matrix and fade, energy stars leave
    mfood.forEach((d, i) => { const p = ((t - tFood) * 0.45 + i / 5) % 1, on = t > tFood ? 1 : 0;
      attr(d, 'cx', (90 + p * 380).toFixed(1)); attr(d, 'cy', (250 + Math.sin(p * 6 + i) * 40).toFixed(1)); d.style.opacity = (on * Math.min(1, p * 5) * (1 - M.clamp((p - 0.75) / 0.25))).toFixed(3); });
    mout.forEach((s, i) => { const p = ((t - tEn) * 0.45 + i / 4) % 1, on = t > tEn ? 1 : 0;
      attr(s, 'transform', `translate(${(560 + p * 330).toFixed(1)} ${(250 + (i % 2 ? -1 : 1) * p * 60).toFixed(1)}) scale(${(0.6 + p * 0.6).toFixed(3)})`); s.style.opacity = (on * Math.min(1, p * 5) * (1 - M.clamp((p - 0.7) / 0.3))).toFixed(3); });
    M.vis(zFx, t, wt('Z5', 'metabolism') - 0.1, 1e9, POP);
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'stops') + 0.2, out);
  }

  /* G: germination stage chain + crystal */
  const gOn = t >= tG1 - 0.1 && t < tL1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('L1');
    M.vis($('#gch'), t, tG1 + 0.1, out, { dy: 12, ...o });
    M.vis($('#gd'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    let cur = -1; tGs.forEach((tt, i) => { if (t >= tt) cur = i; });
    GN.forEach((_, i) => { const el = $('#gc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#gTn'), String(Math.max(1, cur + 1))); M.vis($('#gTg'), t, tGs[0] - 0.1, 1e9, POP);
    GT.forEach((_, i) => M.vis($('#gt' + i), t, tGs[i] + 0.1, i < 3 ? tGs[i + 1] : 1e9, { dy: 16, outDur: 0.25, ody: -10 }));
    const sw = M.io((t - tGs[0] - 0.3) / 1.6), sc = 1.1 + 0.3 * sw;
    attr(gSeed, 'transform', `translate(${GX} ${GY}) scale(${sc.toFixed(3)}) translate(-50 -45)`);
    gDrops.forEach((d, i) => { const p = ((t - tGs[0]) * 0.6 + i / 4) % 1, on = t >= tGs[0] && t < tGs[1] + 0.6 ? 1 : 0;
      attr(d, 'transform', `translate(${(GX - 70 + i * 46).toFixed(1)} ${(40 + p * 240).toFixed(1)})`); d.style.opacity = (on * (1 - M.clamp((p - 0.8) / 0.2))).toFixed(3); });
    gDots.forEach((d, i) => { const a = (t - tGs[1]) * 1.6 + i * 1.256, on = M.clamp((t - tGs[1]) / 0.4);
      attr(d, 'cx', (GX + 26 * Math.cos(a)).toFixed(1)); attr(d, 'cy', (GY - 4 + 14 * Math.sin(a)).toFixed(1));
      const hot = 0.5 + 0.5 * Math.sin(a * 2); attr(d, 'fill', mix(GOLD, MITO, hot)); d.style.opacity = (on * (1 - M.clamp((t - tGs[3]) / 0.5))).toFixed(3); });
    const rl = M.io((t - tGs[2] - 0.2) / 2.2) * 170 + M.io((t - tGs[3]) / 3) * 40;
    if (rl > 1) { attr(gRoot, 'd', `M${GX + 6},${GY + 24} C${GX + 10},${GY + 24 + rl * 0.5} ${GX - 14},${GY + 24 + rl * 0.8} ${GX - 4},${GY + 24 + rl}`); M.hide(gRoot, false);
      gHairs.forEach((h, i) => { const y = GY + 60 + i * 22, s = i % 2 ? 1 : -1, on = rl > (y - GY - 24) + 20; attr(h, 'd', `M${GX + (i % 3) - 2},${y} l${s * 16},${10}`); M.hide(h, !on); }); }
    else { M.hide(gRoot, true); gHairs.forEach(h => M.hide(h, true)); }
    const sh = M.io((t - tGs[3] - 0.1) / 2.4), top = GY - 30 - sh * 200, lean = sh * 30 + Math.sin(t * 1.4) * 3 * sh;
    if (sh > 0.01) { attr(gShoot, 'd', `M${GX - 4},${GY - 20} C${GX - 10},${GY - 60} ${GX + lean * 0.4},${top + 40} ${GX + lean},${top}`); M.hide(gShoot, false); }
    else M.hide(gShoot, true);
    const lu = M.io((t - tGs[3] - 1.6) / 1);
    gLeaf.forEach((l, i) => { attr(l, 'transform', `translate(${GX + lean} ${top}) rotate(${i ? -30 - 20 * (1 - lu) : 210 + 20 * (1 - lu)}) scale(${(0.3 + 0.9 * lu).toFixed(3)})`); M.hide(l, lu <= 0); });
    gSun.style.opacity = M.clamp((t - tGs[3]) / 0.5).toFixed(3);
    const pz = 1 + 0.14 * M.io((t - tPush) / 1.2) * (1 - M.io((t - T0('G5') + 0.3) / 1.0)); gs.style.transformOrigin = '300px 420px'; gs.style.transform = pz > 1.0005 ? `scale(${pz.toFixed(4)})` : 'none';
    // crystal card
    M.vis($('#gc'), t, T0('G6') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tl = [wt('G6', 'grows'), wt('G6', 'sugar'), wt('G6', 'outside')];
    gcLay.forEach((c, k) => { c.style.opacity = k === 0 ? 1 : M.clamp((t - tl[k] - 0.2) / 0.4).toFixed(3); });
    gcSug.forEach((s, i) => { const a = i * Math.PI / 4 + 0.3, p = ((t - tl[1]) * 0.5 + i / 8) % 1, R = 230 - p * 110, on = t > tl[1] ? 1 : 0;
      attr(s, 'x', (256 + R * Math.cos(a) * 0.9 - 6).toFixed(1)); attr(s, 'y', (220 + R * Math.sin(a) * 0.62 - 6).toFixed(1)); s.style.opacity = (on * Math.min(1, p * 4) * (1 - M.clamp((p - 0.85) / 0.15))).toFixed(3); });
    M.vis(gcT, t, wt('G6', 'outside') + 0.2, 1e9, { dy: 6 });
    M.vis($('#gcP0'), t, wt('G7', 'inside') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#gcP1'), t, wt('G7', 'collects') - 0.1, 1e9, { dx: -16, dy: 0 });
  }

  /* L: five tests */
  const lOn = t >= tL1 - 0.1 && t < tV1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('V1');
    M.vis($('#lf'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.5, 1e9, { dx: -12, dy: 0 });
      M.vis($('#vd' + i), t, T1(['L2', 'L3', 'L4', 'L5', 'L6'][i]) - 0.9, 1e9, POP); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    SB.forEach((_, i) => { M.vis($('#sb' + i), t, tL1 + 0.4 + i * 0.08, 1e9, { dy: 10 }); M.vis($('#sa' + i), t, tSt[i] + 0.3, 1e9, { ...POP, sc: 0.3 }); M.vis($('#sz' + i), t, tSt[i] + 0.5, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#sbP'), t, T1('L6') - 0.6, 1e9, POP);
  }

  /* V: side by side, then pause and think */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#va'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const ta = [wt('V2', 'grows'), wt('V2', 'cells'), wt('V2', 'metabolism'), wt('V2', 'response')], tb = [wt('V3', 'still'), wt('V3', 'cells'), wt('V3', 'metabolism'), wt('V3', 'slowly')];
    VA.forEach((_, i) => M.vis($('#va' + i), t, ta[i] - 0.1, 1e9, { dx: -16, dy: 0 })); VB.forEach((_, i) => M.vis($('#vb' + i), t, tb[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    const pu = ((t - tb[2]) * 0.6) % 1; attr(vbPulse, 'r', (58 + pu * 30).toFixed(1)); vbPulse.style.opacity = t > tb[2] ? (0.8 * (1 - pu)).toFixed(3) : '0';
    M.vis($('#th1'), t, tV4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV4, tOpts: wt('V4', 'Growth') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'seed') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Metabolism') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'cannot') + 0.3, 0.8);
  }

  /* D: how biologists describe living things */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dd'), t, tD1 + 0.3, OUT('W1'), { dy: 36, ...o });
    DF.forEach((d, i) => M.vis($('#df' + i), t, d[3] - 0.15, 1e9, { dy: 20 }));
    const a = t - DF[0][3], sp = 0.5 - 0.5 * Math.cos(Math.max(0, a) * 2.1);
    dA.c.forEach((c, i) => { attr(c, 'cx', (178 + (i ? 1 : -1) * 50 * sp).toFixed(1)); attr(c, 'cy', 140); });
    dA.n.forEach((c, i) => { attr(c, 'cx', (178 + (i ? 1 : -1) * 50 * sp).toFixed(1)); attr(c, 'cy', 140); });
    dA.g.forEach((g, k) => { g.style.opacity = M.clamp((t - DF[1][3] - k * 0.35) / 0.3).toFixed(3); });
    dA.ga.forEach((g, k) => { g.style.opacity = M.clamp((t - DF[1][3] - 0.2 - k * 0.35) / 0.3).toFixed(3); });
    const b = Math.max(0, t - DF[2][3]), nx2 = 178 + 90 * Math.exp(-b * 0.9) * Math.cos(b * 3.2) + 40 * Math.sin(t * 0.9) * Math.exp(-b * 0.4) * 0.3;
    attr(dA.nd, 'transform', `translate(${nx2.toFixed(1)} 124)`);
    const ben = M.io((t - DF[3][3]) / 1.4) * (0.75 + 0.25 * Math.sin(t * 1.3));
    const sx2 = 140, ex = 140 + 90 * ben, ey = 110 + 10 * ben;
    attr(dA.st, 'd', `M${sx2},214 C${sx2},170 ${sx2 + 20 * ben},${ey + 30} ${ex.toFixed(1)},${ey.toFixed(1)}`);
    attr(dA.lf, 'transform', `translate(${(sx2 + 4 + 10 * ben).toFixed(1)} 168) rotate(${(-20 - 20 * ben).toFixed(1)})`);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WK.forEach((w, i) => { M.vis($('#wk' + i), t, w[5] - 0.2, 1e9, { dy: 20 });
      [0, 1, 2].forEach(j => M.vis($('#wc' + i + j), t, tWck[i][j], 1e9, { ...POP, sc: 0.3 })); M.vis($('#wv' + i), t, tWck[i][3] - 0.05, 1e9, POP); });
    avW(t, T1('W4') - 0.2, OUT('X1'));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'anything') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Living') - 0.3 });
    const tl = wt('X3', 'adding'); tLay.forEach((c, k) => { c.style.opacity = M.clamp((t - wt('X3', 'crystals') - k * 0.35) / 0.3).toFixed(3); });
    M.vis(tLb[0], t, tl, 1e9, { dy: 6 });
    const tc = wt('X3', 'inside'), dv = M.io((t - tc) / 0.9);
    tCel.forEach((c, i) => { attr(c, 'cx', (334 + (i ? 1 : -1) * 36 * dv).toFixed(1)); attr(c, 'cy', 132); c.style.opacity = M.clamp((t - wt('X3', 'Living') + 0.1) / 0.3).toFixed(3); });
    M.vis(tLb[1], t, tc + 0.3, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'which') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
