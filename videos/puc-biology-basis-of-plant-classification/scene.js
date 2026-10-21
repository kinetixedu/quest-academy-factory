// PUC Biology Ep 21: Basis of Plant Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible "Living diagram canon")
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, CHL = '#3E9B5F', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', MOSS = '#6DB27A', DARK = '#1F5E37', PINE = '#3F7D4E', BARK = '#8B5A2B', POT = '#C8754A';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  moss: ['M2 21h20', 'M6 21v-7', 'M12 21v-10', 'M18 21v-6', ci(6, 12, 1.8), ci(12, 9, 1.8), ci(18, 13, 1.8), 'M3 21c1-2.4 4-2.4 5 0', 'M9 21c1-2.4 5-2.4 6 0', 'M15 21c1-2.4 4-2.4 5 0'],
  fern: ['M12 22V4', 'M12 7 8 5', 'M12 7l4-2', 'M12 11 6.5 9', 'M12 11l5.5-2', 'M12 15 5 13', 'M12 15l7-2', 'M12 19 6 17.5', 'M12 19l6-1.5', 'M12 4c0-1.6 1.6-2 2.4-1'],
  pine: ['M12 22v-4', 'M12 2 6.5 9h3l-4 5h4l-3.5 4h12l-3.5-4h4l-4-5h3Z'],
  mangot: ['M12 22v-8', 'M12 17l-3-2.5', ci(12, 8.5, 6.5), ci(9, 15.5, 1.6), ci(15.5, 14.5, 1.6)],
  algae: ['M6 22c-2-4 2-6 0-10s2-6 0-10', 'M12 22c-2-4 2-6 0-10s2-6 0-10', 'M18 22c-2-4 2-6 0-10s2-6 0-10'],
  flower: [ci(12, 8, 2.2), 'M12 5.8c-1-3 2-3 0 0Z', 'M12 5.8C10 2 14 2 12 5.8', 'M14.2 8c3-1.4 3.6 2 0 0', 'M9.8 8c-3-1.4-3.6 2 0 0', 'M12 10.2c-1 3 2 3 0 0', 'M12 10.2V22', 'M12 17c2-2.4 4.4-2.4 6-1.8-1 2.2-3.6 2.6-6 1.8Z'],
  mushroom: ['M3 12a9 7 0 0 1 18 0Z', 'M9.5 12v7a2.5 2.5 0 0 0 5 0v-7'],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  amoeba: ['M6 7c3-4 8-3 10 0s5 3 3 7-6 6-10 4-7-7-3-11Z', ci(11, 12, 2)],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  tissue: ['M3 4h8v7H3Z', 'M13 4h8v7h-8Z', 'M3 13h8v7H3Z', 'M13 13h8v7h-8Z'],
  seed: ['M12 3c5 3 6 9 3 14-1.6 2.6-4.4 2.6-6 0-3-5-2-11 3-14Z', 'M12 8v8'],
  molecule: [ci(6, 7, 2.6), ci(18, 6, 2.6), ci(12, 18, 2.6), 'M8.4 8 10.8 15.7', 'M15.8 7.4 13.2 15.6', 'M8.6 6.8h6.8'],
  leafs: ['M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z', 'M4 20 14 10'],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', ci(12, 12, 3)],
  stamen: ['M12 22V9', 'M12 9c-2-1-2-5 0-6 2 1 2 5 0 6Z', 'M7 22l3-9', 'M17 22l-3-9'],
  tree2: ['M12 21V9', 'M12 9 6 3', 'M12 9l6-6', 'M12 14l-5-3', 'M12 14l5-3', ci(6, 3, 1.4), ci(18, 3, 1.4)],
  chrom: ['M8 3c2 5 6 13 8 18', 'M16 3C14 8 10 16 8 21'],
  flask: ['M9 3h6', 'M10 3v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3', 'M7 15h10'],
  ruler: ['M3 17 17 3l4 4L7 21Z', 'M7 13l2 2', 'M10 10l2 2', 'M13 7l2 2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tK1 = T0('K1'), tB1 = T0('B1'), tG1 = T0('G1'), tP1 = T0('P1'), tS1 = T0('S1'), tS4 = T0('S4'), tT = T0('T1'), tD1 = T0('D1'), tR1 = T0('R1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: four plants ---------- */
const PL = [['moss', 'A moss', 'ON THE WALL', 'moss'], ['fern', 'A fern', 'IN A POT', 'fern'], ['pine', 'A pine', 'ON A HILL', 'pine'], ['mangot', 'A mango tree', 'IN THE GARDEN', 'mango']];
$('#jobs').innerHTML = PL.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${220 + i * 380}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = PL.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = PL.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 106}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">WHICH GROUP?</div></div>`).join('');
// Diya's garden: wall with moss, fern pot, pine, mango tree (hand-built scene, labels on leader lines)
const gs = $('#gS');
mk(gs, 'rect', { x: 0, y: 0, width: 520, height: 390, rx: 12, fill: '#EAF3F7' });
mk(gs, 'path', { d: 'M0 290 Q260 270 520 292 V378 a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z', fill: '#CFE3B5' });
// pine (back)
mk(gs, 'rect', { x: 292, y: 226, width: 16, height: 72, fill: BARK, stroke: BR, 'stroke-width': 3 });
[[300, 60, 46, 120], [300, 108, 62, 170], [300, 154, 76, 236]].forEach(([x, y0, w, y1]) => mk(gs, 'path', { d: `M${x},${y0} L${x + w},${y1} L${x - w},${y1} Z`, fill: PINE, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }));
// mango tree
mk(gs, 'path', { d: 'M436,300 L440,196 M440,236 L414,206 M440,226 L466,200', stroke: BARK, 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' });
[[440, 150, 58], [396, 180, 40], [484, 178, 40], [440, 196, 44]].forEach(([x, y, r]) => mk(gs, 'circle', { cx: x, cy: y, r, fill: '#7DBB7E', stroke: BR, 'stroke-width': 3.5 }));
[[440, 150, 58], [396, 180, 40], [484, 178, 40], [440, 196, 44]].forEach(([x, y, r]) => mk(gs, 'circle', { cx: x, cy: y, r: r - 3, fill: '#7DBB7E' }));
[[412, 196], [458, 214], [474, 160], [424, 140]].forEach(([x, y]) => mk(gs, 'ellipse', { cx: x, cy: y, rx: 8, ry: 11, fill: '#E8B04A', stroke: BR, 'stroke-width': 2.5 }));
// compound wall with moss
mk(gs, 'rect', { x: 14, y: 170, width: 190, height: 128, fill: '#E3D3A0', stroke: BR, 'stroke-width': 3.5 });
for (let r = 0; r < 4; r++) { mk(gs, 'line', { x1: 14, y1: 202 + r * 32, x2: 204, y2: 202 + r * 32, stroke: '#B8A46A', 'stroke-width': 2 }); for (let c = 0; c < 4; c++) { const x = 14 + 48 * c + (r % 2 ? 24 : 0) + 24; if (x < 200) mk(gs, 'line', { x1: x, y1: 170 + r * 32, x2: x, y2: 202 + r * 32, stroke: '#B8A46A', 'stroke-width': 2 }); } }
mk(gs, 'rect', { x: 8, y: 160, width: 202, height: 14, rx: 4, fill: '#D2BF86', stroke: BR, 'stroke-width': 3 });
[[34, 170, 26, 12], [86, 168, 22, 10], [150, 170, 30, 12], [40, 296, 34, 14], [120, 296, 26, 12]].forEach(([x, y, rx, ry]) => mk(gs, 'ellipse', { cx: x, cy: y, rx, ry, fill: MOSS, stroke: DARK, 'stroke-width': 2.5 }));
// fern in a pot (front)
mk(gs, 'path', { d: 'M226,312 L314,312 L304,370 L236,370 Z', fill: POT, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
mk(gs, 'rect', { x: 220, y: 302, width: 100, height: 16, rx: 4, fill: '#D88A5E', stroke: BR, 'stroke-width': 3 });
[[-1, 70], [1, 70], [-1, 40], [1, 40], [0, 90]].forEach(([s, h], k) => {
  const x0 = 270, y0 = 302, x1 = 270 + s * (k < 4 ? 64 + (k > 1 ? -22 : 0) : 6), y1 = 302 - h - (k === 4 ? 10 : 0);
  mk(gs, 'path', { d: `M${x0},${y0} Q${x0 + s * 10},${y1 + 10} ${x1},${y1}`, stroke: '#2F6B3A', 'stroke-width': 3, fill: 'none' });
  for (let j = 1; j < 6; j++) { const u = j / 6, px = x0 + (x1 - x0) * u + s * 4 * u * (1 - u) * 10, py = y0 + (y1 - y0) * u;
    mk(gs, 'ellipse', { cx: px, cy: py, rx: 9 * (1 - u * 0.5), ry: 4, fill: '#4E9A5A', transform: `rotate(${-60 * s + (k === 4 ? 30 : 0)} ${px} ${py})` }); } });
const GL = [[60, 170, 30, 60, 'Moss', 'start'], [244, 252, 236, 200, 'Fern', 'end'], [330, 140, 350, 44, 'Pine', 'start'], [480, 140, 500, 44, 'Mango', 'end']];
const GLB = GL.map(([px, py, lx, ly, s, an]) => { const ln = mk(gs, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(gs, 'circle', { cx: px, cy: py, r: 5, fill: C.ink });
  const g = mk(gs, 'g', {}), w = s.length * 11 + 20, x = an === 'start' ? lx : lx - w; mk(g, 'rect', { x, y: ly - 30, width: w, height: 34, rx: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
  const t = txt(g, x + w / 2, ly - 7, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 18, 'font-weight': 600, fill: C.ink }); return { ln, dot, g }; });
const tGl = [wt('H3', 'saw'), wt('H3', 'all') + 0.15, wt('H3', 'four') + 0.1, wt('H3', 'one', 0) + 0.1];
// three ways
const W3 = [['Artificial', 'A FEW FEATURES', wt('H4', 'three')], ['Natural', 'MANY FEATURES', wt('H4', 'Each')], ['Phylogenetic', 'COMMON ANCESTRY', wt('H4', 'problem')]];
$('#w3s').innerHTML = W3.map(([n, d], i) => `<div class="w3" id="w3${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const hwA = $('#hwA'), hwAr = [0, 1].map(i => { const g = mk(hwA, 'g', {}); mk(g, 'path', { d: `M600,${210 + i * 156} L600,${236 + i * 156}`, stroke: C.ac, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); mk(g, 'path', { d: `M590,${230 + i * 156} L600,${242 + i * 156} L610,${230 + i * 156}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  txt(g, 620, 232 + i * 156, 'FIXES A PROBLEM', { 'font-size': 14, fill: C.ac, 'letter-spacing': 1 }); return g; });

/* ---------- K: the plant kingdom today ---------- */
const EX = [['mushroom', 'Fungi'], ['microbe', 'Monera with cell walls'], ['amoeba', 'Protista with cell walls']];
$('#exs').innerHTML = EX.map(([ic, n], i) => `<div class="ex" id="ex${i}" style="top:${84 + i * 96}px;width:${i ? 520 : 300}px"><i>${M.icon(ic, 32, C.mute, 2.2)}</i>${n}</div>`).join('');
const tEx = [wt('K2', 'fungi'), wt('K2', 'single'), wt('K2', 'walls')];
const GP = [['algae', 'Algae', 'SIMPLEST · MOSTLY IN WATER', 'algae'], ['moss', 'Bryophytes', 'MOSSES · LIVERWORTS', 'bryophytes'], ['fern', 'Pteridophytes', 'FERNS · HORSETAILS', 'pteridophytes'],
  ['pine', 'Gymnosperms', 'NAKED SEEDS', 'gymnosperms'], ['flower', 'Angiosperms', 'FLOWERS · SEEDS IN FRUITS', 'angiosperms']];
$('#gps').innerHTML = GP.map(([ic, n, d], i) => `<div class="gp" id="gp${i}" style="top:${80 + i * 96}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div><div class="no">EP ${22 + i}${i === 4 ? '' : ''}</div></div>`).join('');
const tGp = GP.map(g => wt('K3', g[3]));

/* ---------- B: artificial system + labelled flower ---------- */
const FC = [['eye', 'Habit', wt('B2', 'habit')], ['leafs', 'Leaf colour', wt('B2', 'colour')], ['ruler', 'Number', wt('B2', 'number')], ['leafs', 'Shape', wt('B2', 'shape')]];
let fx = 36; $('#fcs').innerHTML = FC.map(([ic, n], i) => { const w = n.length * 12 + 70, h = `<div class="fch" id="fc${i}" style="left:${fx}px;top:84px"><i>${M.icon(ic, 22, C.ac, 2.4)}</i>${n}</div>`; fx += w + 12; return h; }).join('');
const fl = $('#flS'), FX = 200, FY = 380;   // flower drawn side-on: sepals, petals, ring of stamens, carpel
const flG = mk(fl, 'g', {});
mk(flG, 'path', { d: `M${FX},${FY + 170} C${FX - 4},${FY + 110} ${FX + 4},${FY + 70} ${FX},${FY + 30}`, stroke: '#4E7A34', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
mk(flG, 'path', { d: `M${FX},${FY + 120} C${FX + 50},${FY + 90} ${FX + 100},${FY + 100} ${FX + 120},${FY + 120} C${FX + 80},${FY + 140} ${FX + 40},${FY + 136} ${FX},${FY + 120} Z`, fill: LEAF, stroke: BR, 'stroke-width': 3 });
[[-1, 0], [1, 0]].forEach(([s]) => mk(flG, 'path', { d: `M${FX},${FY + 30} C${FX + s * 40},${FY + 30} ${FX + s * 80},${FY + 10} ${FX + s * 96},${FY - 14} C${FX + s * 60},${FY - 6} ${FX + s * 24},${FY + 4} ${FX},${FY + 30} Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 3 }));
[[-1, 1.0], [1, 1.0], [-1, 0.6], [1, 0.6]].forEach(([s, k]) => mk(flG, 'path', { d: `M${FX + s * 10},${FY + 20} C${FX + s * 60 * k},${FY - 10} ${FX + s * 130 * k},${FY - 120} ${FX + s * 92 * k},${FY - 150} C${FX + s * 60 * k},${FY - 130} ${FX + s * 20},${FY - 60} ${FX + s * 10},${FY + 20} Z`, fill: k < 1 ? '#F4B6C2' : '#F7C9D2', stroke: BR, 'stroke-width': 3 }));
const stam = [];
[-46, -28, 28, 46].forEach((dx, k) => { const g = mk(flG, 'g', {}); mk(g, 'path', { d: `M${FX + dx * 0.3},${FY + 14} Q${FX + dx * 0.8},${FY - 40} ${FX + dx},${FY - 86 + Math.abs(dx) * 0.4}`, stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'ellipse', { cx: FX + dx, cy: FY - 96 + Math.abs(dx) * 0.4, rx: 7, ry: 13, fill: GOLD, stroke: BR, 'stroke-width': 2.5 }); stam.push(g); });
mk(flG, 'path', { d: `M${FX - 14},${FY + 16} C${FX - 20},${FY - 20} ${FX - 6},${FY - 50} ${FX - 4},${FY - 110} L${FX + 4},${FY - 110} C${FX + 6},${FY - 50} ${FX + 20},${FY - 20} ${FX + 14},${FY + 16} Z`, fill: '#B9DDA8', stroke: BR, 'stroke-width': 3 });
mk(flG, 'circle', { cx: FX, cy: FY - 114, r: 9, fill: '#B9DDA8', stroke: BR, 'stroke-width': 3 });
const ring = mk(fl, 'ellipse', { cx: FX, cy: FY - 70, rx: 72, ry: 50, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const FLB = [[FX + 46, FY - 78, 400, 240, 'Stamen (anther + filament)', 'start'], [FX + 72, FY - 66, 400, 300, 'Androecium = all stamens', 'start'],
  [FX + 80, FY - 10, 400, 380, 'Petal', 'start'], [FX + 70, FY + 18, 400, 440, 'Sepal', 'start']].map(([px, py, lx, ly, s, an]) => {
  const ln = mk(fl, 'path', { d: `M${px},${py} L${lx - 30},${ly} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(fl, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(fl, 'text', { x: lx + 10, y: ly + 8, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const tFlb = [wt('B3', 'androecium'), wt('B3', 'stamens') - 0.1, wt('B3', 'flower') - 0.4, wt('B3', 'flower') - 0.1];
const tFlw = wt('B3', 'Linnaeus');
// Linnaeus: flowers with 1, 2 and 3 stamens fall into different groups
const ln = $('#lnS'), LNF = [1, 2, 3].map((n, i) => { const g = mk(ln, 'g', {}), x = 140 + i * 252, y = 360;
  mk(g, 'rect', { x: x - 110, y: 200, width: 220, height: 300, rx: 14, fill: C.soft });
  mk(g, 'path', { d: `M${x},470 L${x},${y + 20}`, stroke: '#4E7A34', 'stroke-width': 5 });
  [-1, 1].forEach(s => mk(g, 'path', { d: `M${x},${y + 20} C${x + s * 30},${y} ${x + s * 70},${y - 50} ${x + s * 46},${y - 80} C${x + s * 26},${y - 60} ${x + s * 8},${y - 20} ${x},${y + 20} Z`, fill: '#F7C9D2', stroke: BR, 'stroke-width': 2.5 }));
  for (let k = 0; k < n; k++) { const dx = (k - (n - 1) / 2) * 18; mk(g, 'path', { d: `M${x + dx * 0.4},${y + 10} L${x + dx},${y - 50}`, stroke: BR, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: x + dx, cy: y - 58, rx: 6, ry: 10, fill: GOLD, stroke: BR, 'stroke-width': 2 }); }
  txt(g, x, 236, `${n} STAMEN${n > 1 ? 'S' : ''}`, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink });
  txt(g, x, 490, `GROUP ${n}`, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ac }); return g; });
// a plant whose outside features the artificial system used (labelled)
const pf = $('#flS'), PLG = mk(pf, 'g', {});
mk(PLG, 'path', { d: 'M300,540 L300,250 M300,420 L220,350 M300,360 L390,300 M300,300 L230,250', stroke: '#4E7A34', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
[[220, 350, -40], [390, 300, 30], [230, 250, -30], [300, 230, 0], [340, 440, 40], [250, 470, -50]].forEach(([x, y, a]) => mk(PLG, 'ellipse', { cx: x, cy: y, rx: 38, ry: 20, fill: '#8CC48F', stroke: BR, 'stroke-width': 3, transform: `rotate(${a} ${x} ${y})` }));
const PLB = [[300, 500, 460, 500, 'Habit: a small shrub'], [390, 300, 460, 250, 'Leaf colour: green'], [340, 440, 460, 420, 'Leaf number'], [228, 250, 460, 330, 'Leaf shape: oval']].map(([px, py, lx, ly, s]) => {
  const l = mk(pf, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), d = mk(pf, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }), tx = mk(pf, 'text', { x: lx + 10, y: ly + 8, class: 'zl' }); tx.textContent = s; return { ln: l, dot: d, tx }; });
const lnCard = document.createElement('div'); lnCard.className = 'tag'; lnCard.style.cssText = 'left:36px;top:156px'; lnCard.textContent = 'LINNAEUS · ANDROECIUM'; $('#bl').appendChild(lnCard);
// sun vs shade leaves (same plant)
const ss = $('#ssS'), SH = [[220, 'SHADE', 1.0], [540, 'SUN', 0.55]].map(([x, s, k]) => { const g = mk(ss, 'g', {}), yb = 520, yt = yb - 150 * k, w = 64 * k;
  mk(g, 'path', { d: `M${x},${560} L${x},${yb}`, stroke: '#4E7A34', 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${x},${yb} C${x - w * 1.3},${yb - 30 * k} ${x - w},${yt + 40 * k} ${x},${yt} C${x + w},${yt + 40 * k} ${x + w * 1.3},${yb - 30 * k} ${x},${yb} Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: `M${x},${yb} L${x},${yt + 10}`, stroke: '#D8ECD2', 'stroke-width': 3 });
  txt(g, x + w + 26, yb - 10, s, { 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 }); return g; });
const ssEq = txt(ss, 392, 384, 'SAME PLANT', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ac, 'letter-spacing': 2, 'font-weight': 600 });
const tSun = [wt('B6', 'shade'), wt('B6', 'sun')];

/* ---------- G: natural system + stem anatomy ---------- */
const GF = [['eye', 'Habit', 0], ['leafs', 'Leaves', 0], ['flower', 'Flowers', 0], ['seed', 'Fruits', 0],
  ['cell', 'Cell structure', 1, wt('G3', 'fine')], ['tissue', 'Anatomy', 1, wt('G3', 'anatomy')], ['seed', 'Embryo', 1, wt('G3', 'embryo')], ['molecule', 'Chemicals', 1, wt('G3', 'chemicals')]];
$('#gfs').innerHTML = GF.map(([ic, n, c], i) => `<div class="fch" id="gf${i}" style="left:${36 + c * 376}px;top:${124 + (i % 4) * 76}px;width:340px;height:60px;font-size:23px"><i>${M.icon(ic, 26, c ? C.ac : C.mute, 2.2)}</i>${n}</div>`).join('');
const tGo = wt('G2', 'outside'), tGi = wt('G2', 'inside');
const st = $('#stS'), SX = 290, SY = 240, SK = 150 / 190;
const stG = mk(st, 'g', {});
mk(stG, 'circle', { cx: SX, cy: SY, r: 150, fill: '#F3F7EA', stroke: BR, 'stroke-width': 4.5 });
mk(stG, 'circle', { cx: SX, cy: SY, r: 142, fill: 'none', stroke: '#9CC48A', 'stroke-width': 7 });
mk(stG, 'circle', { cx: SX, cy: SY, r: 72, fill: '#FBFCF6', stroke: '#C9D8B8', 'stroke-width': 2 });
const VB = []; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.2, x = SX + 97 * Math.cos(a), y = SY + 97 * Math.sin(a);
  const g = mk(stG, 'g', { transform: `rotate(${(a * 180 / Math.PI + 90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})` });
  mk(g, 'path', { d: `M${x - 17},${y - 2} Q${x},${y - 28} ${x + 17},${y - 2} Z`, fill: '#B9DDA8', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${x - 17},${y} Q${x},${y + 25} ${x + 17},${y} Z`, fill: '#E3C68E', stroke: BR, 'stroke-width': 2.5 }); VB.push(g); }
const STB = [[SX + 146, SY - 36, 'Epidermis', 110], [SX + 124, SY - 6, 'Cortex', 180], [SX + 97 * Math.cos(0.2), SY + 97 * Math.sin(0.2), 'Vascular bundle', 250], [SX + 30, SY + 30, 'Pith', 320]].map(([px, py, s, ly]) => {
  const lx = 510, ln = mk(st, 'path', { d: `M${px.toFixed(1)},${py.toFixed(1)} L${lx - 24},${ly} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(st, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(st, 'text', { x: lx + 10, y: ly + 8, 'text-anchor': 'start', class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const tStb = [wt('G3', 'structure'), wt('G3', 'cells'), wt('G3', 'anatomy'), wt('G3', 'anatomy') + 0.5];

/* ---------- P: phylogenetic tree ---------- */
const ps = $('#pS'), TA = [200, 520], TE = [1360, 170];
const ty = x => TA[1] + (x - TA[0]) * (TE[1] - TA[1]) / (TE[0] - TA[0]);
const TIPX = [300, 560, 820, 1080, TE[0]], BX = [440, 700, 960, 1200];
const trunk = mk(ps, 'path', { d: `M${TA[0]},${TA[1]} L${TE[0]},${TE[1]}`, stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const br = BX.map((bx, i) => mk(ps, 'path', { d: `M${bx},${ty(bx).toFixed(1)} L${TIPX[i]},170`, stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
const INV = [['LIFE ON LAND', 570], ['VASCULAR TISSUE', 830], ['SEEDS', 1080], ['SEEDS IN A FRUIT', 1280]].map(([s, x]) => { const g = mk(ps, 'g', {}), y = ty(x);
  mk(g, 'line', { x1: x - 10, y1: y - 14, x2: x + 10, y2: y + 14, stroke: C.ac, 'stroke-width': 5, 'stroke-linecap': 'round' }); txt(g, x + 4, y + 46, s, { class: 'inv', 'text-anchor': 'middle' }); return g; });
const anc = mk(ps, 'circle', { cx: TA[0], cy: TA[1], r: 12, fill: C.ac, stroke: '#fff', 'stroke-width': 3 });
const ancT = txt(ps, TA[0] + 26, TA[1] + 40, 'COMMON ANCESTOR', { 'font-size': 17, fill: C.ac, 'font-weight': 600, 'letter-spacing': 1.5 });
const cous = mk(ps, 'path', { d: `M${BX[3]},${ty(BX[3]).toFixed(1)} L${TIPX[3]},170 M${BX[3]},${ty(BX[3]).toFixed(1)} L${TE[0]},${TE[1]}`, stroke: C.ac, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', opacity: 0.55 });
const cousDot = mk(ps, 'circle', { cx: BX[3], cy: ty(BX[3]), r: 10, fill: C.ac, stroke: '#fff', 'stroke-width': 3 });
$('#tips').innerHTML = GP.map(([ic, n], i) => `<div class="tip" id="tp${i}" style="left:${TIPX[i] - 120}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><span>${n}</span></div>`).join('');
const tTrunk = wt('P2', 'evolution') - 0.2, tBr = [0, 1, 2, 3].map(i => tTrunk + 0.5 + i * 0.45), tTip = [0, 1, 2, 3, 4].map(i => tTrunk + 0.7 + i * 0.45);
const tAnc = wt('P3', 'common'), tCous = wt('P3', 'cousins');

/* ---------- S: side by side + think ---------- */
const sa = $('#saS');
const twoLeaf = (x, col, lab) => { const g = mk(sa, 'g', {});
  mk(g, 'rect', { x: x - 140, y: 196, width: 280, height: 260, rx: 14, fill: C.soft });
  mk(g, 'path', { d: `M${x},420 L${x},330`, stroke: '#4E7A34', 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${x},330 C${x - 60},310 ${x - 50},250 ${x},226 C${x + 50},250 ${x + 60},310 ${x},330 Z`, fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: `M${x},330 L${x},236`, stroke: '#D8ECD2', 'stroke-width': 3 });
  mk(g, 'circle', { cx: x + 70, cy: 400, r: 20, fill: col, stroke: BR, 'stroke-width': 3 });
  txt(g, x, 446, lab, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 }); return g; };
const SL = [twoLeaf(210, '#F7C9D2', 'PLANT A · PINK FLOWER'), twoLeaf(574, GOLD, 'PLANT B · NO FLOWER')];
const saEq = txt(sa, 392, 330, '=', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 64, 'font-weight': 700, fill: C.red });
const SN = [['Leaves', 'flower'], ['Flowers', 'flower'], ['Anatomy', 'tissue'], ['Embryo', 'seed'], ['Chemicals', 'molecule'], ['Cells', 'cell']];
$('#sns').innerHTML = SN.map(([n, ic], i) => `<div class="fch" id="sn${i}" style="left:${36 + (i % 2) * 356}px;top:${196 + Math.floor(i / 2) * 92}px;width:340px;height:72px;font-size:24px"><i>${M.icon('check', 26, C.ok, 2.8)}</i>${n}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'A system groups plants only by the shape of their leaves. Artificial or natural?', opts: ['Artificial', 'Natural'], right: 0, why: 'Artificial. It uses one outside feature, and leaf shape changes with the surroundings.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">artificial · natural · <b>phylogenetic</b></span>';

/* ---------- D: tools ---------- */
const FT = ['TRUE ROOTS', 'VASCULAR TISSUE', 'SEEDS', 'FLOWERS', 'SEED IN FRUIT'], ROWS = [['moss', 'Moss', [0, 0, 0, 0, 0]], ['fern', 'Fern', [1, 1, 0, 0, 0]], ['pine', 'Pine', [1, 1, 1, 0, 0]], ['mangot', 'Mango', [1, 1, 1, 1, 1]]];
$('#tbl').innerHTML = FT.map((f, j) => `<div class="th" id="th${j}" style="left:${212 + j * 106}px">${f}</div>`).join('') +
  ROWS.map(([ic, n, v], r) => `<div class="tr" id="tr${r}" style="top:${148 + r * 62}px"><i>${M.icon(ic, 26, C.ac, 2.2)}</i>${n}</div>` + v.map((x, j) => `<div class="tc" id="tc${r}${j}" style="left:${216 + j * 106}px;top:${152 + r * 62}px">${x}</div>`).join('')).join('');
const tCode = wt('D2', 'number') - 0.2, tCodeEnd = T1('D2') + 0.4;
const tEq = wt('D3', 'equal'), tHund = wt('D3', 'hundreds');
const dc = $('#dcS'), CHR = []; [[500, 0], [560, 0], [640, 1], [700, 1]].forEach(([x, p], k) => { const g = mk(dc, 'g', {}), h = p ? 54 : 74, y = 150;
  mk(g, 'path', { d: `M${x - 14},${y - h} Q${x},${y} ${x - 14},${y + h}`, stroke: NUC, 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${x + 14},${y - h} Q${x},${y} ${x + 14},${y + h}`, stroke: NUC, 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: x, cy: y, r: 6, fill: '#D7C3E6' }); CHR.push(g); });
const dcN = txt(dc, 600, 252, '2 PAIRS · EXAMPLE', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 });
const dk = $('#dkS'), CHM = mk(dk, 'g', {});
mk(CHM, 'path', { d: 'M470,170 C470,110 520,80 560,76 C560,130 530,170 470,170 Z', fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
mk(CHM, 'path', { d: 'M580,128 L618,128', stroke: C.mute, 'stroke-width': 3, 'stroke-linecap': 'round' }); mk(CHM, 'path', { d: 'M608,118 L620,128 L608,138', stroke: C.mute, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
[[668, 98], [712, 80], [700, 140], [740, 124]].forEach(([x, y], k, a) => { if (k) mk(CHM, 'line', { x1: a[k - 1][0], y1: a[k - 1][1], x2: x, y2: y, stroke: BR, 'stroke-width': 3 }); });
[[668, 98], [712, 80], [700, 140], [740, 124]].forEach(([x, y], k) => mk(CHM, 'circle', { cx: x, cy: y, r: 12, fill: [GOLD, '#B9DDA8', WAT, NUC][k], stroke: BR, 'stroke-width': 2.5 }));
const avD = PUC.avatar($('#sD'), { x: 160 + 36, y: 270 + 476, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Plants as numbers. I like it.' });

/* ---------- R: the key ---------- */
const rs = $('#rS'), NX = [360, 720, 1080], NQ = ['True roots, stem and leaves?', 'Makes seeds?', 'Seeds inside a fruit?'];
$('#kns').innerHTML = NQ.map((q, i) => `<div class="kn" id="kn${i}" style="left:${NX[i] - 130}px"><b>${i + 1}</b>${q}</div>`).join('') +
  [['moss', 'Bryophyte', 'NO TRUE ROOTS'], ['fern', 'Pteridophyte', 'NO SEEDS'], ['pine', 'Gymnosperm', 'NAKED SEEDS']].map(([ic, n, d], i) => `<div class="kb" id="kb${i}" style="left:${NX[i] - 130}px"><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('') +
  `<div class="kb" id="kb3" style="left:1290px;top:182px"><div class="nm">Angiosperm</div><div class="ds">SEED IN A FRUIT</div></div>`;
const RA = [];
NX.forEach((x, i) => { const g = mk(rs, 'g', {}); mk(g, 'path', { d: `M${x},288 L${x},400`, stroke: C.dim, 'stroke-width': 4 }); mk(g, 'path', { d: `M${x - 10},390 L${x},404 L${x + 10},390`, stroke: C.dim, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
  txt(g, x + 16, 352, 'NO', { class: 'kl' }); const h = mk(rs, 'g', {}), x1 = x + 134, x2 = i < 2 ? NX[i + 1] - 134 : 1286;
  mk(h, 'path', { d: `M${x1},242 L${x2},242`, stroke: C.dim, 'stroke-width': 4 }); mk(h, 'path', { d: `M${x2 - 12},232 L${x2},242 L${x2 - 12},252`, stroke: C.dim, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
  txt(h, (x1 + x2) / 2, 228, 'YES', { class: 'kl', 'text-anchor': 'middle' }); RA.push([g, h]); });
const TK = ['moss', 'fern', 'pine', 'mangot'];
$('#toks').innerHTML = TK.map((ic, i) => `<div class="tok" id="tk${i}">${M.icon(ic, 34, C.ac, 2.2)}</div>`).join('');
const tQk = [wt('R2', 'Question'), wt('R3', 'Question'), wt('R4', 'Question'), T0('R5')];
const tDrop = [wt('R2', 'moss'), wt('R3', 'fern'), wt('R4', 'pine'), wt('R5', 'mango')];
const tSlide = [T0('R3') - 0.1, T0('R4') - 0.1];
const avR = PUC.avatar($('#sR'), { x: 1290, y: 270 + 360, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'My mango flowers!' });

/* ---------- W: worked example ---------- */
const WC = [['BOTANIST 1', 'Groups plants by the number of stamens alone', 'stamen', 'Artificial system', 'W2'], ['BOTANIST 2', 'Counts the chromosomes of two look-alike plants', 'chrom', 'Cytotaxonomy', 'W3'],
  ['BOTANIST 3', 'Feeds 200 coded features into a computer', 'tissue', 'Numerical taxonomy', 'W4'], ['BOTANIST 4', 'Compares the chemicals in their leaves', 'flask', 'Chemotaxonomy', 'W5'], ['BOTANIST 5', 'Groups plants by their common ancestor', 'tree2', 'Phylogenetic system', 'W6']];
$('#cols').innerHTML = WC.map(([h, a, ic, n], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 312}px"><div class="ch2">${h}</div><div class="ac3" id="ca${i}">${a}</div><div class="dz"></div>
  <div class="it" id="it${i}"><div class="ic">${M.icon(ic, 66, i === 1 ? NUC : C.ac, 2.2)}</div><div class="inm">${n}</div></div></div>`).join('');
const tWa = WC.map(w => T0(w[4]) + 0.05), tWi = [wt('W2', 'artificial'), wt('W3', 'cytotaxonomy'), wt('W4', 'numerical'), wt('W5', 'chemotaxonomy'), wt('W6', 'phylogenetic')];
const wGh = document.createElement('div'); wGh.className = 'ghost'; wGh.style.cssText = 'right:28px;top:22px'; wGh.textContent = 'EXAMPLE FIGURES'; $('#wb').appendChild(wGh);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Numerical taxonomy gives more weight to important features', right: 'Every feature gets equal importance; hundreds are compared' });
const tS = $('#tS'), BARS = [0, 1, 2, 3, 4, 5].map(k => mk(tS, 'rect', { x: 70 + k * 56, y: 100, width: 36, height: 110, rx: 6, fill: C.ac }));
const tSl = txt(tS, 230, 246, 'EVERY FEATURE = 1', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ac, 'letter-spacing': 1.5, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Match the following: each system or tool with the information it uses' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Match column I with column II.<div class="mtc"><div><b>A</b>Numerical taxonomy<br><b>B</b>Cytotaxonomy<br><b>C</b>Chemotaxonomy<br><b>D</b>Artificial system</div><div><b>i</b>Chemical constituents<br><b>ii</b>All observable characters, coded<br><b>iii</b>Chromosome number and behaviour<br><b>iv</b>A few characters, e.g. androecium</div></div>',
  opts: ['A-iii, B-ii, C-i, D-iv', 'A-ii, B-iii, C-i, D-iv', 'A-ii, B-i, C-iii, D-iv', 'A-iv, B-iii, C-i, D-ii'], right: 1, optW: 474, optY: 400, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['<b style="color:var(--ok)">A-ii</b> all features, coded'], ['<b style="color:var(--ok)">B-iii</b> chromosomes'], ['<b style="color:var(--ok)">C-i</b> chemical constituents'], ['<b style="color:var(--ok)">D-iv</b> a few, e.g. androecium']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 'B') + 0.05, wt('A2', 'Numerical'), wt('A2', 'Cytotaxonomy'), wt('A2', 'Chemotaxonomy'), wt('A3', 'artificial')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · basis of plant classification', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Artificial</b>: a few features (habit, leaves, androecium) - Linnaeus', '<b>Natural</b>: many features, outside and inside - Bentham and Hooker', '<b>Phylogenetic</b>: evolution; one group = one common ancestor',
    '<b>Numerical taxonomy</b>: all features coded, equal importance', '<b>Cytotaxonomy</b>: chromosomes &nbsp;·&nbsp; <b>Chemotaxonomy</b>: chemicals'] });
const YQ = ['Why can leaf size fool an artificial system?', 'What does a natural system look at inside a plant?', 'Which tool would count chromosomes?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 22', topic: 'Green slime on the tank wall: is it a plant? Algae', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP1 - 0.2, 1, 960, 540], [tCous - 0.4, 1.06, 1200, 520], [T0('S1') - 0.5, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  PL.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tK1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('K1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    PL.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'same') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'really') , 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = wt('H4', 'Botanists') - 0.2;
    M.vis($('#gS'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.2 });
    GLB.forEach((l, i) => { M.draw(l.ln, t, tGl[i], 0.35); M.vis(l.dot, t, tGl[i] - 0.1, 1e9, { ...POP, sc: 0.2 }); l.g.style.opacity = M.clamp((t - tGl[i] - 0.3) / 0.25).toFixed(3); });
    M.vis($('#hkP'), t, wt('H3', 'decides') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.25, 1e9, { dy: 0, fade: 0.25 })) {
      W3.forEach((w, i) => M.vis($('#w3' + i), t, w[2] - 0.1, 1e9, { dx: -20, dy: 0 }));
      hwAr.forEach((g, i) => M.vis(g, t, W3[i + 1][2] + 0.2, 1e9, { dy: -8 })); }
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('B1');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    EX.forEach((_, i) => { const el = $('#ex' + i); M.vis(el, t, tEx[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const m = M.io((t - wt('K2', 'Now')) / 0.5);
      el.style.background = mix(C.soft, C.okBg, m); });
    M.vis($('#kP'), t, wt('K2', 'own') - 0.1, 1e9, POP); M.vis($('#kS'), t, wt('K2', 'own') + 0.4, 1e9, { dy: 8 });
    M.vis($('#kr'), t, T0('K3') - 0.15, out, { dx: 60, dy: 0, ...o });
    GP.forEach((_, i) => { const el = $('#gp' + i); M.vis(el, t, tGp[i] - 0.1, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tGp[i]) / 0.25) * (1 - M.io((t - (tGp[i + 1] ?? T1('K3') + 0.2)) / 0.3))); });
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tG1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('G1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    FC.forEach((f, i) => M.vis($('#fc' + i), t, f[2] - 0.1, 1e9, POP));
    M.vis(lnCard, t, tFlw - 0.1, 1e9, POP);
    const plOut = tFlw - 0.3; M.vis(PLG, t, T0('B2') + 0.2, plOut, { dy: 20, outDur: 0.3 });
    PLB.forEach((l, i) => { const t0 = FC[i][2]; M.draw(l.ln, t, t0, 0.35); M.vis(l.dot, t, t0 - 0.1, plOut, { ...POP, sc: 0.2, outDur: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - plOut) / 0.25))).toFixed(3); l.ln.style.opacity = t > plOut + 0.25 ? 0 : ''; });
    M.vis($('#brA'), t, tB1 + 0.3, T0('B4') - 0.2, { dy: 0, fade: 0.2, outDur: 0.25 }); M.vis($('#brB'), t, T0('B4') - 0.05, 1e9, { dy: 0, fade: 0.25 });
    LNF.forEach((g, i) => M.vis(g, t, tFlw + 0.6 + i * 0.4, 1e9, { dy: 20 }));
    M.vis(flG, t, tFlw - 0.2, 1e9, { dy: 30, fade: 0.25 });
    stam.forEach((g, k) => { const on = M.io((t - wt('B3', 'stamens') - k * 0.08) / 0.3); g.style.opacity = (0.5 + 0.5 * on).toFixed(3); });
    M.draw(ring, t, wt('B3', 'ring') - 0.1, 0.5);
    FLB.forEach((l, i) => { M.draw(l.ln, t, tFlb[i], 0.35); M.vis(l.dot, t, tFlb[i] - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - tFlb[i] - 0.3) / 0.25).toFixed(3); });
    M.vis($('#br'), t, tB1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pb0'), t, wt('B4', 'Using') - 0.1, 1e9, { dy: 16 }); M.vis($('#pb1'), t, T0('B5') + 0.1, 1e9, { dy: 16 });
    SH.forEach((g, i) => M.vis(g, t, tSun[i] - 0.15, 1e9, { dy: 20 })); M.vis(ssEq, t, wt('B6', 'same') - 0.1, 1e9, { dy: 8 });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tP1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('P1');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#gO'), t, tGo - 0.1, 1e9, { dy: 8 }); M.vis($('#gI'), t, tGi - 0.1, 1e9, { dy: 8 });
    GF.forEach((g, i) => { const tt = i < 4 ? tGo + i * 0.12 : g[3]; const el = $('#gf' + i); M.vis(el, t, tt - 0.1, 1e9, POP); if (i >= 4) el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.25)); });
    M.vis($('#gP'), t, wt('G2', 'alike') - 0.1, 1e9, POP);
    M.vis($('#gr'), t, T0('G3') - 0.15, out, { dx: 60, dy: 0, ...o });
    const bhT = T0('G4') - 0.1, stOut = 1e9;
    M.vis(stG, t, T0('G3') + 0.1, stOut, { dy: 0, sc: 0.8, sp: M.SOFT, fade: 0.2, outDur: 0.25 });
    VB.forEach((g, k) => g.style.opacity = M.clamp((t - wt('G3', 'anatomy') - k * 0.06) / 0.2).toFixed(3));
    STB.forEach((l, i) => { const v = t < stOut + 0.25; M.hide(l.ln, !v); M.hide(l.dot, !v); M.hide(l.tx, !v); if (!v) return;
      M.draw(l.ln, t, tStb[i], 0.35); M.vis(l.dot, t, tStb[i] - 0.1, stOut, { ...POP, sc: 0.2, outDur: 0.2 }); l.tx.style.opacity = (M.clamp((t - tStb[i] - 0.3) / 0.25) * (1 - M.clamp((t - stOut) / 0.25))).toFixed(3); });
    M.vis($('#bh'), t, bhT, 1e9, { dy: 20 });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pm'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    M.draw(trunk, t, tTrunk, 1.2, M.o3); br.forEach((b, i) => M.draw(b, t, tBr[i], 0.4));
    GP.forEach((_, i) => M.vis($('#tp' + i), t, tTip[i], 1e9, POP));
    INV.forEach((g, i) => M.vis(g, t, tTrunk + 2.4 + i * 0.3, 1e9, { dy: 8 }));
    M.vis(anc, t, tAnc - 0.1, 1e9, { ...POP, sc: 0.2 }); attr(anc, 'r', (12 + 4 * Math.max(0, Math.sin((t - tAnc) * 5)) * (t > tAnc ? 1 : 0)).toFixed(1)); M.vis(ancT, t, tAnc, 1e9, { dy: 6 });
    cous.style.opacity = (0.55 * M.clamp((t - tCous) / 0.3)).toFixed(3); M.vis(cousDot, t, tCous, 1e9, { ...POP, sc: 0.2 });
    M.vis($('#pW'), t, wt('P2', 'Phylo') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sa'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    SL.forEach((g, i) => M.vis(g, t, wt('S2', 'unrelated') - 0.3 + i * 0.25, 1e9, { dy: 16 })); M.vis(saEq, t, wt('S2', 'similar'), 1e9, POP);
    M.vis($('#saR'), t, wt('S2', 'land') - 0.1, 1e9, POP);
    M.vis($('#sn'), t, T0('S3') - 0.15, out, { dx: 60, dy: 0, ...o });
    SN.forEach((_, i) => M.vis($('#sn' + i), t, T0('S3') + 0.4 + i * 0.18, 1e9, POP));
    M.vis($('#snR'), t, wt('S3', 'truly') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS4 + 0.05, tT - 0.05, { dy: 36, outDur: 0.01 });
    th1(t, { tin: tS4, tOpts: wt('S4', 'Artificial') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'It') });
  }

  /* statement */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Artificial') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Phylogenetic') - 0.1, 0.8);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dn'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dgh'), t, tD1 + 0.5, 1e9, { dy: 8 });
    FT.forEach((_, j) => M.vis($('#th' + j), t, wt('D2', 'feature') - 0.2 + j * 0.08, 1e9, { dy: 8 }));
    ROWS.forEach((r, i) => { M.vis($('#tr' + i), t, wt('D2', 'computers') - 0.1 + i * 0.1, 1e9, { dx: -12, dy: 0 });
      r[2].forEach((v, j) => { const k = i * 5 + j, tt = tCode + (tCodeEnd - tCode) * k / 20, el = $('#tc' + i + j); M.vis(el, t, tt, 1e9, { ...POP, sc: 0.5 });
        el.style.background = v ? mix(C.soft, C.ac2, M.io((t - tt) / 0.2)) : C.soft; el.style.color = v ? C.ac : C.dim; }); });
    M.vis($('#dP0'), t, tEq - 0.1, 1e9, POP); M.vis($('#dP1'), t, tHund - 0.1, 1e9, POP);
    M.vis($('#dc'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o });
    CHR.forEach((g, k) => M.vis(g, t, wt('D4', 'chromosomes') + k * 0.12, 1e9, { ...POP, sc: 0.4 })); M.vis(dcN, t, wt('D4', 'structure'), 1e9, { dy: 6 });
    CHR.forEach((g, k) => { const w = Math.sin((t - wt('D4', 'behave')) * 4 + k) * 4 * (t > wt('D4', 'behave') ? 1 : 0); g.setAttribute('transform', `translate(0 ${w.toFixed(1)})`); });
    M.vis($('#dk'), t, T0('D5') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(CHM, t, wt('D5', 'chemicals'), 1e9, { dx: -20, dy: 0 });
    avD(t, wt('D3', 'hundreds') + 0.8, T0('D4') + 1.2);
  }

  /* R: key */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rk'), t, tR1 + 0.05, OUT('W1'), { dy: 36, ...o });
    NQ.forEach((_, i) => { const el = $('#kn' + i); M.vis(el, t, tR1 + 0.4 + i * 0.12, 1e9, { dy: 12 });
      const cur = t >= tQk[i] && t < tQk[i + 1], done = t >= tQk[i + 1];
      el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : C.ink; el.style.borderColor = cur || done ? C.ac : '#CBD0DA'; });
    RA.forEach(([g, h], i) => { M.vis(g, t, tR1 + 0.6 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }); M.vis(h, t, tR1 + 0.6 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }); });
    [0, 1, 2, 3].forEach(i => { const el = $('#kb' + i); M.vis(el, t, tR1 + 0.8 + i * 0.12, 1e9, { dy: 12 }); const f = M.io((t - tDrop[i] - 0.5) / 0.3);
      el.style.borderStyle = f > 0.5 ? 'solid' : 'dashed'; el.style.borderColor = f > 0.5 ? C.ac : '#CBD0DA'; el.style.background = mix('#FFFFFF', C.ac3, f); });
    // tokens: a row above the current question; each drops into its group box
    TK.forEach((_, i) => { const el = $('#tk' + i); M.vis(el, t, tR1 + 0.5 + i * 0.1, 1e9, POP);
      // which node is the row on, how many left
      const step = t < tSlide[0] ? 0 : t < tSlide[1] ? 1 : 2, s1 = M.io((t - tSlide[0]) / 0.6), s2 = M.io((t - tSlide[1]) / 0.6);
      const rowX = (n, k, cx) => cx - (n * 56 + (n - 1) * 10) / 2 + k * 66;
      // position of token i in row at each stage (tokens i>=stage remain)
      const p0 = rowX(4, i, NX[0]), p1 = i >= 1 ? rowX(3, i - 1, NX[1]) : p0, p2 = i >= 2 ? rowX(2, i - 2, NX[2]) : p1;
      let x = p0; if (i >= 1) x = M.lerp(x, p1, s1); if (i >= 2) x = M.lerp(x, p2, s2); let y = 104;
      const d = M.io((t - tDrop[i]) / 0.7);
      const tx = i < 3 ? NX[i] - 130 + 18 : 1290 + 18, tyy = i < 3 ? 410 + 32 : 182 + 32;
      if (d > 0) { x = M.lerp(x, tx, d); y = M.lerp(y, tyy, d) - (i === 3 ? 0 : 0); }
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; });
    avR(t, wt('R5', 'flowering') + 0.4, OUT('W1'));
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o }); M.vis(wGh, t, tW1 + 0.6, 1e9, { dy: 8 });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); const ca = $('#ca' + i); M.vis(ca, t, tWa[i] - 0.1, 1e9, { dy: 8 });
      M.vis($('#it' + i), t, tWi[i] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'numerical') - 0.2, tStrike: wt('X3', 'opposite') - 0.1, tRight: wt('X3', 'Every') - 0.1 });
    const tb = wt('X3', 'equal'); BARS.forEach((b, k) => { M.vis(b, t, wt('X3', 'Every') + k * 0.07, 1e9, { dy: 12 }); const h0 = [150, 40, 90, 60, 120, 30][k], h = M.lerp(h0, 110, M.io((t - tb) / 0.6)); attr(b, 'height', h.toFixed(1)); attr(b, 'y', (210 - h).toFixed(1)); });
    M.vis(tSl, t, tb + 0.4, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') - 0.2, tCount, tAns });
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
