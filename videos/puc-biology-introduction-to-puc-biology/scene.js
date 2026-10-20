// PUC Biology Ep 01: Introduction to PUC Biology (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (same in diagram, label dot and text): bible "Living diagram canon"
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, CHL = '#3E9B5F', MITO = '#E58A3C', NUC = '#7B4B94', WAT = '#5AA0C8', RBC = '#D1495B', GOLD = '#C9962B', WALL = '#C9B36A';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  bowl: ['M3 11h18a9 7 0 0 1-18 0Z', 'M8 21h8', 'M8 7c0-1.5 1.5-1.5 1.5-3', 'M13 7c0-1.5 1.5-1.5 1.5-3'],
  hand: ['M18 11V6a2 2 0 0 0-4 0', 'M14 10V4a2 2 0 0 0-4 0v2', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  dna: ['m10 16 1.5 1.5', 'm14 8-1.5-1.5', 'M15 2c-1.8 2-2.5 4-2.8 6', 'm16.5 10.5 1 1', 'm17 6-2.9-2.9', 'M2 15c6.7-6 13.3 0 20-6', 'm20 9 .9.9', 'M3.1 14.1 4 15', 'm6.5 12.5 1 1', 'm7 18 2.9 2.9', 'M9 22c1.8-2 2.5-4 2.8-6'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
  molecule: [ci(6, 7, 2.6), ci(18, 6, 2.6), ci(12, 18, 2.6), 'M8.4 8 10.8 15.7', 'M15.8 7.4 13.2 15.6', 'M8.6 6.8h6.8'],
  mito: ['M2.5 12c0-3.6 4.2-6 9.5-6s9.5 2.4 9.5 6-4.2 6-9.5 6-9.5-2.4-9.5-6Z', 'M6 12c1-2 2 2 3 0s2 2 3 0 2 2 3 0 2 2 3 0'],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  tissue: ['M3 4h8v7H3Z', 'M13 4h8v7h-8Z', 'M3 13h8v7H3Z', 'M13 13h8v7h-8Z'],
  system: [ci(12, 4.5, 2.2), ci(5, 12, 2.2), ci(19, 12, 2.2), ci(12, 19.5, 2.2), 'M10.4 6.1 6.6 10.4', 'M13.6 6.1l3.8 4.3', 'M6.6 13.6l3.8 4.3', 'M17.4 13.6l-3.8 4.3'],
  community: [ci(6, 8, 2.4), 'M2 20v-2.5A3.5 3.5 0 0 1 5.5 14h1A3.5 3.5 0 0 1 10 17.5V20', 'M17 21v-3', 'M17 4l-4.5 8h9Z', 'M13 18h8'],
  eco: [ci(6, 6, 2.6), 'M6 1.5v1', 'M1.5 6h1', 'M2.8 2.8l.7.7', 'M16 21v-4', 'M16 6l-4.5 8h9Z', 'M2 21h20'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  rbc: [ci(12, 12, 9), 'M8 12c0-1.8 1.8-3 4-3s4 1.2 4 3-1.8 3-4 3-4-1.2-4-3Z'],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', ci(12, 12, 3)],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tT = T0('T1'), tC1 = T0('C1'), tU1 = T0('U1'), tU4 = T0('U4'), tM = T0('M2'), tP1 = T0('P1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three living things ---------- */
const JOBS = [['mango', 'A mango', 'FRUIT OF A TREE', 'mango'], ['bowl', 'A bowl of curd', 'FULL OF BACTERIA', 'curd'], ['hand', 'Your hand', 'HUMAN CELLS', 'hand']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('cell', 22, '#fff', 2.4)}LIVING CELLS</div></div>`).join('');
// NEET grid: 18 x 10 squares, the first 9 columns (90) are biology
const NQ = 34, NX = 90, NY = 84;
let nh = ''; for (let c = 0; c < 18; c++) for (let r = 0; r < 10; r++) nh += `<div class="nq" id="nq${c * 10 + r}" style="left:${NX + c * NQ}px;top:${NY + r * NQ}px"></div>`;
$('#nqs').innerHTML = nh;
const tNeet = wt('H4', 'NEET'), tNin = wt('H4', 'ninety'), tHalf = wt('H4', 'Half');

/* ---------- B ---------- */
const LV4 = [['leaf', 'Plants'], ['paw', 'Animals'], ['microbe', 'Microbes'], ['user', 'You']];
$('#lv4s').innerHTML = LV4.map(([ic, n], i) => `<div class="lv4" id="lv${i}" style="left:${36 + i * 178}px"><i>${M.icon(ic, 44, C.ac, 2.2)}</i><span>${n}</span></div>`).join('');
const BT = [['leaf', 'Botany', 'the study of plants', 'Botany'], ['paw', 'Zoology', 'the study of animals', 'Zoology'], ['microbe', 'Microbiology', 'microbes, too small to see', 'Microbiology'],
  ['heart', 'Physiology', 'how bodies work', 'Physiology'], ['dna', 'Genetics', 'how traits pass on', 'Genetics'], ['tree', 'Ecology', 'how living things share the planet', 'Ecology']];
$('#bts').innerHTML = BT.map(([ic, n, q], i) => `<div class="bt" id="bt${i}" style="left:${36 + (i % 2) * 372}px;top:${84 + Math.floor(i / 2) * 152}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="bn">${n}</div><div class="bq">${q}</div></div>`).join('');
const tBt = BT.map((b, i) => wt(i < 3 ? 'B3' : 'B4', b[3]));

/* ---------- Z: the zoom ladder ---------- */
const ZN = ['LEAF', 'TISSUE', 'CELL', 'CHLOROPLAST', 'MOLECULE'], ZS = ['x1', 'x40', 'x400', 'x10,000', 'x1,000,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5'), T0('Z6')];
const LVI = [['RUNG 1 OF 5', 'Organ', 'Different tissues working together on one main job.', 'Here: the leaf. Its job is making food from sunlight.'],
  ['RUNG 2 OF 5', 'Tissue', 'A group of similar cells doing one job together.', 'Here: palisade cells, packed with chloroplasts.'],
  ['RUNG 3 OF 5', 'Cell', 'The smallest unit that is alive.', 'Here: one palisade cell from the leaf.'],
  ['RUNG 4 OF 5', 'Organelle', 'A small working part inside a cell.', 'Here: the chloroplast, the cell\'s kitchen.'],
  ['RUNG 5 OF 5', 'Molecule', 'A group of atoms joined together.', 'Here: chlorophyll, which catches sunlight.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A kitchen in a cell!' });

const zs = $('#zS'), ZG = [0, 1, 2, 3, 4].map(() => mk(zs, 'g', {}));
const FOC = [[520, 296, 50], [360, 196, 70], [565, 300, 46], [600, 252, 48], null];   // where each level zooms in next
const LAB = [];   // per level: [[px, py, lx, ly, text, anchor, elbow?]]
// level 0: mango leaf (organ)
{ const g = ZG[0];
  mk(g, 'path', { d: 'M52,338 Q108,322 164,300', stroke: '#4E7A34', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M164,300 C300,140 640,128 870,250 C650,384 330,412 164,300 Z', fill: LEAF, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  const mid = s => { const x0 = 164, y0 = 300, cx = 520, cy = 258, x1 = 870, y1 = 250; return [(1 - s) * (1 - s) * x0 + 2 * (1 - s) * s * cx + s * s * x1, (1 - s) * (1 - s) * y0 + 2 * (1 - s) * s * cy + s * s * y1]; };
  for (let k = 1; k <= 7; k++) { const s = k / 8.4, [x, y] = mid(s), h = 118 * Math.sin(Math.PI * Math.min(0.98, s + 0.04)) + 8;
    mk(g, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} Q${(x + 30).toFixed(1)},${(y - h * 0.55).toFixed(1)} ${(x + 78).toFixed(1)},${(y - h * 0.86).toFixed(1)}`, stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
    mk(g, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} Q${(x + 30).toFixed(1)},${(y + h * 0.5).toFixed(1)} ${(x + 74).toFixed(1)},${(y + h * 0.8).toFixed(1)}`, stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); }
  mk(g, 'path', { d: 'M164,300 Q520,258 870,250', stroke: '#EEF6EA', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  LAB[0] = [[400, 214, 300, 66, 'Lamina (leaf blade)', 'start'], [690, 214, 760, 120, 'Vein', 'start'], [600, 257, 640, 448, 'Midrib', 'start'], [100, 324, 96, 448, 'Petiole (leaf stalk)', 'start']];
}
// level 1: leaf tissues (section through the leaf)
{ const g = ZG[1], r = M.rng(11), X0 = 60;
  for (let i = 0; i < 12; i++) mk(g, 'rect', { x: X0 + i * 50, y: 100, width: 50, height: 36, rx: 6, fill: '#EEF4E4', stroke: BR, 'stroke-width': 2.5 });
  for (let i = 0; i < 15; i++) { const x = X0 + i * 40; mk(g, 'rect', { x: x + 2, y: 140, width: 36, height: 112, rx: 14, fill: '#CFE6C6', stroke: BR, 'stroke-width': 2.5 });
    for (let k = 0; k < 4; k++) mk(g, 'ellipse', { cx: x + 12 + (k % 2) * 16, cy: 160 + k * 24 + r() * 6, rx: 6, ry: 9, fill: CHL }); }
  for (let row = 0; row < 2; row++) for (let i = 0; i < 8; i++) { const cx = X0 + 40 + i * 76 + row * 30 + (r() - 0.5) * 10, cy = 292 + row * 62 + (r() - 0.5) * 8;
    if (cx > 690) continue; mk(g, 'ellipse', { cx, cy, rx: 30, ry: 24, fill: '#DDEED6', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: cx - 8, cy: cy - 4, rx: 5, ry: 7, fill: CHL }); mk(g, 'ellipse', { cx: cx + 10, cy: cy + 6, rx: 5, ry: 7, fill: CHL }); }
  for (let i = 0; i < 12; i++) { if (i === 6) continue; mk(g, 'rect', { x: X0 + i * 50, y: 392, width: 50, height: 36, rx: 6, fill: '#EEF4E4', stroke: BR, 'stroke-width': 2.5 }); }
  mk(g, 'ellipse', { cx: X0 + 312, cy: 410, rx: 14, ry: 17, fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: X0 + 338, cy: 410, rx: 14, ry: 17, fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 });
  LAB[1] = [[652, 118, 712, 104, 'Epidermis', 'start'], [652, 200, 712, 200, 'Palisade parenchyma', 'start'], [630, 330, 712, 322, 'Spongy parenchyma', 'start'], [385, 418, 712, 462, 'Stoma (leaf pore)', 'start', [430, 462]]];
}
// level 2: one plant cell
{ const g = ZG[2];
  mk(g, 'rect', { x: 280, y: 66, width: 330, height: 396, rx: 48, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 298, y: 84, width: 294, height: 360, rx: 34, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M380,140 C460,112 548,140 546,230 C546,320 520,392 446,392 C392,392 372,330 380,262 C386,212 344,166 380,140 Z', fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 340, cy: 392, r: 32, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(g, 'circle', { cx: 344, cy: 388, r: 11, fill: NUC });
  [[352, 124, -25], [540, 116, 18], [565, 300, 80], [500, 418, -8], [326, 252, 90]].forEach(([x, y, a]) => { const c = mk(g, 'g', { transform: `rotate(${a} ${x} ${y})` });
    mk(c, 'ellipse', { cx: x, cy: y, rx: 28, ry: 15, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 2.5 }); [-12, 0, 12].forEach(d => mk(c, 'line', { x1: x + d, y1: y - 8, x2: x + d, y2: y + 8, stroke: '#1F5E37', 'stroke-width': 2.5, 'stroke-linecap': 'round' })); });
  mk(g, 'ellipse', { cx: 420, cy: 424, rx: 24, ry: 12, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M402,424 q4,-7 8,0 t8,0 t8,0 t8,0', stroke: '#B35F22', 'stroke-width': 2, fill: 'none' });
  LAB[2] = [[282, 190, 236, 170, 'Cell wall', 'end'], [299, 318, 236, 300, 'Cell membrane', 'end'], [334, 404, 236, 430, 'Nucleus', 'end'], [540, 116, 650, 92, 'Chloroplast', 'start'], [500, 250, 650, 236, 'Vacuole', 'start'], [560, 376, 650, 380, 'Cytoplasm', 'start']];
}
// level 3: one chloroplast
{ const g = ZG[3];
  mk(g, 'ellipse', { cx: 420, cy: 268, rx: 300, ry: 152, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: 420, cy: 268, rx: 284, ry: 136, fill: '#DDEFD5', stroke: '#2F7A4A', 'stroke-width': 2.5 });
  const GR = [[230, 250], [330, 330], [420, 200], [510, 320], [600, 252], [330, 190], [500, 196]];
  [[0, 2], [0, 1], [1, 3], [2, 4], [3, 4], [5, 2], [2, 6], [6, 4]].forEach(([a, b]) => mk(g, 'line', { x1: GR[a][0] + 32, y1: GR[a][1], x2: GR[b][0] + 32, y2: GR[b][1], stroke: '#5FA86F', 'stroke-width': 4, 'stroke-linecap': 'round' }));
  GR.forEach(([x, y]) => { for (let k = 0; k < 6; k++) mk(g, 'rect', { x, y: y - 36 + k * 12, width: 64, height: 11, rx: 5.5, fill: CHL, stroke: '#1F5E37', 'stroke-width': 1.5 }); });
  LAB[3] = [[650, 156, 740, 92, 'Two membranes', 'start'], [262, 216, 150, 66, 'Granum (stack of thylakoids)', 'start'], [440, 380, 520, 474, 'Stroma (fluid inside)', 'start']];
}
// level 4: one chlorophyll molecule (schematic)
const atoms = [], light = { };
{ const g = ZG[4], CX = 400, CY = 250, cen = [[0, -84], [84, 0], [0, 84], [-84, 0]];
  const pent = (x, y, ang) => { const pts = []; for (let k = 0; k < 5; k++) { const a = ang + k * 2 * Math.PI / 5; pts.push([x + 36 * Math.cos(a), y + 36 * Math.sin(a)]); } return pts; };
  const P = cen.map(([dx, dy]) => pent(CX + dx, CY + dy, Math.atan2(-dy, -dx)));
  for (let k = 0; k < 4; k++) { const a = P[k][1], b = P[(k + 1) % 4][4]; mk(g, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: BR, 'stroke-width': 3.5 }); }
  P.forEach((pp, k) => { mk(g, 'path', { d: 'M' + pp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z', fill: '#CFE6C6', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
    mk(g, 'line', { x1: CX, y1: CY, x2: pp[0][0], y2: pp[0][1], stroke: BR, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }); });
  const tail = []; for (let k = 0; k <= 10; k++) tail.push([440 + k * 32, 330 + k * 12 + (k % 2 ? 16 : 0)]);
  mk(g, 'path', { d: `M${P[2][2][0].toFixed(1)},${P[2][2][1].toFixed(1)} L` + tail.map(p => p.join(',')).join(' L'), stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: CX, cy: CY, r: 26, fill: '#A7CDB0', stroke: BR, 'stroke-width': 3.5 }); txt(g, CX, CY + 8, 'Mg', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: BR });
  P.forEach(pp => pp.forEach(p => atoms.push(mk(g, 'circle', { cx: p[0], cy: p[1], r: 6, fill: C.ink }))));
  tail.forEach(p => atoms.push(mk(g, 'circle', { cx: p[0], cy: p[1], r: 5, fill: C.ink })));
  light.p = mk(g, 'path', { d: 'M96,64 q14,-14 28,0 t28,0 t28,0 t28,0 t28,0 t28,0', stroke: GOLD, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round', transform: 'rotate(30 96 64)' });
  light.h = mk(g, 'path', { d: 'M262,154 l-22,-2 l12,-18 Z', fill: GOLD });
  light.s = mk(g, 'g', {}); mk(light.s, 'circle', { cx: 70, cy: 50, r: 22, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(light.s, 'line', { x1: 70 + 30 * Math.cos(a), y1: 50 + 30 * Math.sin(a), x2: 70 + 40 * Math.cos(a), y2: 50 + 40 * Math.sin(a), stroke: GOLD, 'stroke-width': 3, 'stroke-linecap': 'round' }); }
  LAB[4] = [[442, 164, 620, 92, 'Ring catches light', 'start'], [426, 250, 620, 250, 'Magnesium at the centre', 'start'], [700, 432, 780, 368, 'Long tail', 'start'], [356, 132, 300, 70, 'Each dot is an atom', 'end']];
}
// labels: dot on the part, leader line, text (pops after the line draws)
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => {
  const g = ZG[lv], d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
// label timing per level (on the words where possible)
const tLab = [
  [wt('Z2', 'leaf') - 0.1, wt('Z2', 'organ'), wt('Z2', 'main'), wt('Z2', 'making')],
  [wt('Z3', 'tissues'), wt('Z3', 'similar'), wt('Z3', 'cells') + 0.2, wt('Z3', 'together')],
  [wt('Z4', 'wall'), wt('Z4', 'wall') + 0.5, wt('Z4', 'nucleus'), wt('Z4', 'chloroplasts'), wt('Z4', 'vacuole'), wt('Z4', 'chloroplasts') + 0.5],
  [wt('Z5', 'organelle'), wt('Z5', 'kitchen'), wt('Z5', 'food')],
  [wt('Z6', 'catch'), wt('Z6', 'sunlight') + 0.3, wt('Z6', 'atoms', 0) + 0.6, wt('Z6', 'atoms')]];
const tChl = wt('Z6', 'chlorophyll'), tAtoms = wt('Z6', 'atoms');
const zFx = document.createElement('div'); zFx.className = 'pillp'; zFx.style.cssText = 'left:36px;top:446px;height:52px;font-size:22px';
zFx.innerHTML = `Chlorophyll a &nbsp;<span style="font-size:26px">${K('\\mathrm{C_{55}H_{72}O_{5}N_{4}\\textcolor{' + GRN + '}{Mg}}')}</span>`; $('#zd').appendChild(zFx);

/* ---------- L: the ladder ---------- */
const STEPS = [['Molecules → Organelles', 'molecules build the small working parts'], ['Organelles → Cell', 'the parts work together and make a living cell'],
  ['Cells → Tissue → Organ', 'similar cells join; then different tissues join'], ['Organs → Organ system → Organism', 'organs team up; systems make one body'],
  ['Population → Community → Ecosystem', 'one kind; many kinds; plus the surroundings']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s.replace(/→/g, '<span style="color:var(--ac)">→</span>')}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => T0(id) + 0.45);
const RG = [['molecule', 'Molecule'], ['mito', 'Organelle'], ['cell', 'Cell'], ['tissue', 'Tissue'], ['heart', 'Organ'], ['system', 'Organ system'], ['user', 'Organism'], ['users', 'Population'], ['community', 'Community'], ['eco', 'Ecosystem']];
$('#rgs').innerHTML = RG.map(([ic, n], i) => `<div class="rg" id="rg${i}" style="left:${36 + i * 24}px;top:${76 + (9 - i) * 48}px"><i id="rgi${i}"></i><span>${n}</span></div>`).join('');
const tRg = [wt('L2', 'Molecules'), wt('L2', 'organelles'), wt('L3', 'cell'), wt('L4', 'tissue'), wt('L4', 'organ'), wt('L5', 'system'), wt('L5', 'organism'), wt('L6', 'population'), wt('L6', 'community'), wt('L6', 'ecosystem')];
{ const a = $('#lrA'); mk(a, 'line', { x1: 40, y1: 540, x2: 40, y2: 112, stroke: C.dim, 'stroke-width': 3 }); mk(a, 'path', { d: 'M28,118 L40,96 L52,118 Z', fill: C.dim });
  txt(a, 40, 84, 'BIG', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 }); txt(a, 40, 566, 'SMALL', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 }); }

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">molecule · organelle · <b>CELL</b> · tissue · organ</span>';

/* ---------- C: cell theory ---------- */
const EV = [['1838', 'Matthias Schleiden', 'BOTANIST · PLANTS', 'Plants are made of cells', wt('C2', 'eighteen')], ['1839', 'Theodore Schwann', 'ZOOLOGIST · ANIMALS', 'Animals are made of cells too', wt('C2', 'later')],
  ['1855', 'Rudolf Virchow', 'THE LAST PIECE', 'New cells come only from existing cells', wt('C3', 'eighteen')]];
$('#evs').innerHTML = EV.map(([y, n, w, d], i) => `<div class="ev" id="ev${i}" style="top:${92 + i * 150}px"><div class="dt"></div><div class="yr2">${y}</div><div class="nm">${n}</div><div class="wd">${w}</div><div class="ds">${d}</div></div>`).join('');
const tlL = mk($('#clS'), 'line', { x1: 64, y1: 122, x2: 64, y2: 422, stroke: C.ac2, 'stroke-width': 5, 'stroke-linecap': 'round' });
const cr = $('#crS'), CCX = 392, CCY = 268, CR = 50;
const cOut = [0, 1, 2, 3].map(() => mk(cr, 'circle', { r: CR, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 6 }));
const cIn = [0, 1, 2, 3].map(() => mk(cr, 'circle', { r: CR - 3, fill: '#E6F2DF' }));
const cNu = [0, 1, 2, 3].map(() => mk(cr, 'circle', { r: 14, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }));
const tDiv = wt('C3', 'come'), tDiv2 = tDiv + 1.9;

/* ---------- U: one cell vs many ---------- */
$('#tg4').innerHTML = ['Eats', 'Moves', 'Grows', 'Divides'].map((s, i) => `<span id="tg${i}">${s}</span>`).join('');
const tTg = [wt('U2', 'eats'), wt('U2', 'moves'), wt('U2', 'grows'), wt('U2', 'divides')];
const ua = $('#uaS'), amb = mk(ua, 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const amN = mk(ua, 'circle', { r: 32, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }), amF = mk(ua, 'circle', { r: 14, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2.5 });
const amC = mk(ua, 'circle', { r: 9, fill: '#FFFFFF', stroke: WAT, 'stroke-width': 2.5 });
const amoeba = (cx, cy, R, tt) => { const n = 36, pts = [];
  for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n, r = R * (1 + 0.14 * Math.sin(3 * a + 0.9 * tt) + 0.07 * Math.sin(5 * a - 1.3 * tt + 1) + 0.18 * Math.max(0, Math.cos(a)) ** 6); pts.push([cx + r * Math.cos(a) * 1.15, cy + r * Math.sin(a) * 0.86]); }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let k = 0; k < n; k++) { const p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; }
  return d + 'Z'; };
const CT = [['Muscle cell', 'moves you'], ['Nerve cell', 'carries messages'], ['Red blood cell', 'carries oxygen']];
$('#ct3s').innerHTML = CT.map(([n, j], i) => `<div class="ct3" id="ct3${i}" style="left:${36 + i * 245}px"><svg id="cts${i}" width="221" height="220" style="position:absolute;left:0;top:0"></svg><div class="cn">${n}</div><div class="cj">${j}</div></div>`).join('');
{ const a = $('#cts0'); mk(a, 'path', { d: 'M20,112 C70,72 150,72 200,112 C150,152 70,152 20,112 Z', fill: '#EBA9A3', stroke: BR, 'stroke-width': 3.5 }); mk(a, 'ellipse', { cx: 110, cy: 112, rx: 22, ry: 9, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 });
  const b = $('#cts1'); mk(b, 'path', { d: 'M78,96 L36,52 M78,96 L30,104 M70,118 L40,160 M50,52 L34,32 M42,52 L22,62', stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  mk(b, 'path', { d: 'M100,112 C130,118 150,120 176,148 M176,148 L196,140 M176,148 L190,170 M176,148 L170,176', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(b, 'circle', { cx: 82, cy: 106, r: 26, fill: '#E6D2EF', stroke: BR, 'stroke-width': 3.5 }); mk(b, 'circle', { cx: 82, cy: 106, r: 9, fill: NUC });
  const c = $('#cts2'); mk(c, 'ellipse', { cx: 110, cy: 112, rx: 66, ry: 60, fill: RBC, stroke: '#8E2A38', 'stroke-width': 3.5 }); mk(c, 'ellipse', { cx: 110, cy: 112, rx: 32, ry: 28, fill: '#E27B88' }); }
const tCt = [wt('U3', 'Muscle'), wt('U3', 'Nerve'), wt('U3', 'red')];
const avU = PUC.avatar($('#sU'), { x: 976 + 36, y: 270 + 450, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Trillions of teammates!' });
const th1 = PUC.think($('#th1'), { q: 'Yeast makes bread dough rise. Is yeast one cell or many?', opts: ['One cell', 'Many cells'], right: 0, why: 'One cell. Yeast is a fungus made of a single cell, and that cell does every job.' });

/* ---------- M: sorting + names ---------- */
const PR = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];
$('#prs').innerHTML = PR.map((n, i) => { const w = 680 - i * 76; return `<div class="pr" id="pr${i}" style="left:${392 - w / 2}px;width:${w}px;top:${196 + i * 52}px">${n}</div>`; }).join('');
const tPr0 = wt('M3', 'kingdoms'), tPr6 = wt('M3', 'species');
const NM = [['MANGO', 'Mangifera', 'indica', wt('M4', 'Mangifera')], ['HUMAN', 'Homo', 'sapiens', wt('M4', 'Homo')]];
$('#nms').innerHTML = NM.map(([w, g, s], i) => `<div class="nmC" id="nm${i}" style="top:${84 + i * 196}px"><div class="bn2">${w}</div><div class="bi"><span id="ng${i}">${g}</span> <span id="ns${i}">${s}</span></div>
  <div class="gt" id="gg${i}" style="background:var(--ac2);color:#1F6B3F">GENUS</div><div class="gt" id="gs${i}" style="background:#fff;color:var(--ink)">SPECIFIC EPITHET</div></div>`).join('');

/* ---------- P: the map ---------- */
const U11 = [['Diversity in the Living World', 'CH 1-4', wt('P2', 'variety')], ['Structural Organisation in Plants and Animals', 'CH 5-7', wt('P2', 'structure')], ['Cell: Structure and Function', 'CH 8-10', wt('P2', 'cell')], ['Plant Physiology', 'CH 11-13', wt('P2', 'plants', 1)], ['Human Physiology', 'CH 14-19', wt('P2', 'human')]];
const U12 = [['Reproduction', 'CH 1-3', wt('P3', 'reproduction')], ['Genetics and Evolution', 'CH 4-6', wt('P3', 'genetics')], ['Biology in Human Welfare', 'CH 7-8', wt('P3', 'biology')], ['Biotechnology', 'CH 9-10', wt('P3', 'biotechnology')], ['Ecology', 'CH 11-13', wt('P3', 'ecology')]];
$('#uns').innerHTML = [U11, U12].map((U, c) => U.map(([n, ch], i) => `<div class="un" id="un${c}${i}" style="left:${36 + c * 788}px;top:${120 + i * 76}px"><div class="uc">UNIT ${c * 5 + i + 1}</div><div class="ut">${n}</div><div class="uh">${ch}</div></div>`).join('')).join('');
const FLW = [['eye', 'Notice', 'notice'], ['leaf', 'Labelled diagram', 'labelled'], ['gear', 'Run the process', 'process'], ['check', 'Exam practice', 'exam']];
$('#flw').innerHTML = `<span class="lbl" style="position:static;margin-right:6px">EVERY LESSON</span>` + FLW.map(([ic, n], i) => `<span id="fw${i}">${M.icon(ic, 22, C.ac, 2.4)}${n}</span>${i < 3 ? `<em id="fa${i}">→</em>` : ''}`).join('');
const tFw = FLW.map(f => wt('P4', f[2]));

/* ---------- W: worked example (sort board) ---------- */
const WC = [['MOLECULE', 'Haemoglobin', 'molecule', RBC, 'the protein that carries oxygen', wt('W2', 'Haemoglobin')], ['ORGANELLE', 'Mitochondrion', 'mito', MITO, 'releases energy for the cell', wt('W3', 'mitochondrion')],
  ['CELL', 'Red blood cell', 'rbc', RBC, 'the basic unit of life', wt('W4', 'red')], ['TISSUE', 'Blood', 'drop', RBC, 'a liquid tissue: cells + fluid', wt('W5', 'Blood')],
  ['ORGAN', 'Heart', 'heart', RBC, 'different tissues, one job', wt('W6', 'heart')], ['ORGAN SYSTEM', 'Circulatory system', 'system', RBC, 'heart + vessels + blood', wt('W6', 'circulatory')]];
$('#cols').innerHTML = WC.map(([h, n, ic, col, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2">${h}</div><div class="dz"></div>
  <div class="it" id="it${i}"><div class="ic">${M.icon(ic, 76, col, 2.2)}</div><div class="inm">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
{ const a = $('#wbA'); mk(a, 'line', { x1: 120, y1: 416, x2: 1460, y2: 416, stroke: C.dim, 'stroke-width': 3 }); mk(a, 'path', { d: 'M1456,404 L1480,416 L1456,428 Z', fill: C.dim });
  txt(a, 104, 422, 'SMALL', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.5 }); txt(a, 1496, 422, 'BIG', { 'font-size': 16, 'letter-spacing': 1.5 }); }
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Blood is a tissue? I never knew.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The cell is the smallest level of organisation', right: 'The cell is the smallest unit of life, not the smallest level' });
const tS = $('#tS'), tCell = mk(tS, 'circle', { cx: 230, cy: 138, r: 104, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 4 });
const tMit = mk(tS, 'ellipse', { cx: 230, cy: 150, rx: 58, ry: 30, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 3 });
const tMol = [[212, 150], [232, 142], [250, 156]].map(([x, y]) => mk(tS, 'circle', { cx: x, cy: y, r: 6, fill: C.ink }));
const tLb = [txt(tS, 230, 62, 'CELL', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ac, 'letter-spacing': 1.5, 'font-weight': 600 }), txt(tS, 230, 106, 'ORGANELLE', { 'text-anchor': 'middle', 'font-size': 16, fill: '#B35F22', 'letter-spacing': 1.5, 'font-weight': 600 }),
  txt(tS, 230, 206, 'MOLECULES', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'letter-spacing': 1.5, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: [], type: 'One line statements: the next level up, or the basic unit of life' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>All living things are made of cells.</div><div class="sl"><b>II</b>Every organism is made of many cells.</div><div class="sl"><b>III</b>New cells come only from existing cells.</div><div class="sl"><b>IV</b>A tissue is a group of similar cells doing one job.</div>',
  opts: ['I, III and IV only', 'I and II only', 'II, III and IV only', 'I, II, III and IV'], right: 0, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Amoeba, yeast: one cell each'], ['<b style="color:var(--ok)">I, III</b>: the cell theory'], ['<b style="color:var(--ok)">IV</b>: meaning of a tissue']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'Amoeba'), wt('A3', 'One'), wt('A3', 'Four')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · introduction to biology', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Biology</b> = the study of living things', '<b>Ladder</b>: <span style="font-size:26px">molecule › organelle › <b style="color:var(--ac)">cell</b> › tissue › organ › system › organism</span>',
    '<b>Cell theory</b>: life is made of cells; cells come from cells', '<b>Tissue</b>: similar cells, one job &nbsp;·&nbsp; <b>Organ</b>: tissues together', '<b>Unicellular</b>: one cell is the whole organism (amoeba, yeast)'] });
const YQ = ['What comes between a cell and an organ?', 'Why is blood called a tissue?', 'Why is a single amoeba a complete organism?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 02', topic: 'Sugar crystal or seed: which is alive? Characteristics of Living Organisms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tDiv - 0.2, 1.1, 1180, 540], [T0('C4') + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; ['wb0', 'wop', 'wb1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 24; });
  [['wm0', 'wb0'], ['wm1', 'wb1']].forEach(([m, b]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft + bb.offsetWidth / 2 - e.offsetWidth / 2) + 'px'; });
  [0, 1].forEach(i => { const bi = $('#nm' + i + ' .bi'), g = $('#ng' + i), s = $('#ns' + i), gg = $('#gg' + i), gs = $('#gs' + i);
    gg.style.left = (bi.offsetLeft + g.offsetLeft + g.offsetWidth / 2 - gg.offsetWidth / 2) + 'px'; gs.style.left = (bi.offsetLeft + s.offsetLeft + s.offsetWidth / 2 - gs.offsetWidth / 2) + 'px'; });
  const hr = $('#here'), u0 = $('#un00'); hr.style.left = (u0.offsetLeft + u0.offsetWidth - hr.offsetWidth - 16) + 'px'; hr.style.top = (u0.offsetTop + 15) + 'px';
  x = 36; $('#nBig').style.left = '90px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'cells') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'cells') + 0.5, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tNeet - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'doctor') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const nOn = M.vis($('#neet'), t, tNeet, 1e9, { dy: 0, fade: 0.25 });
    if (nOn) { const fill = M.clamp((t - tNin + 0.1) / 1.3) * 90;
      for (let k = 0; k < 180; k++) { const q = $('#nq' + k); const on = k < 90 ? M.clamp(fill - k) : 0; q.style.background = mix(C.soft, C.ac, on); M.vis(q, t, tNeet + 0.1 + (k % 18) * 0.012, 1e9, { dy: 0, sc: 0.6, sp: M.SNAP, fade: 0.06 }); }
      M.vis($('#nBig'), t, tNin - 0.1, 1e9, { dy: 12 }); M.count($('#nN'), t, tNin - 0.1, 1.3, 0, 90);
      M.vis($('#nk0'), t, tNin + 0.2, 1e9, { dy: 8 }); M.vis($('#nk1'), t, tNin + 0.35, 1e9, { dy: 8 }); M.vis($('#nHalf'), t, tHalf - 0.1, 1e9, POP); }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bw'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wb0'), t, wt('B2', 'Bio') - 0.1, 1e9, POP); M.vis($('#wm0'), t, wt('B2', 'life') - 0.1, 1e9, POP);
    M.vis($('#wop'), t, wt('B2', 'Logy') - 0.25, 1e9, POP); M.vis($('#wb1'), t, wt('B2', 'Logy') - 0.1, 1e9, POP); M.vis($('#wm1'), t, wt('B2', 'study') - 0.1, 1e9, POP);
    M.vis($('#bP'), t, wt('B2', 'Biology') - 0.1, 1e9, POP);
    LV4.forEach((_, i) => M.vis($('#lv' + i), t, wt('B2', 'living') + i * 0.12, 1e9, { dy: 20 }));
    M.vis($('#br'), t, T0('B3') - 0.15, out, { dx: 60, dy: 0, ...o });
    BT.forEach((_, i) => { const el = $('#bt' + i); M.vis(el, t, tBt[i] - 0.1, 1e9, POP); const on = M.io((t - tBt[i]) / 0.25) * (1 - M.io((t - (tBt[i + 1] ?? T1('B4') + 0.2)) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* Z: zoom ladder */
  const zOn = t >= tZ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('L1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 5; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    // each level: enters small from the centre, leaves by growing past the camera around its focus point
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 4 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) { M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5); }
    });
    // looping light onto chlorophyll + atoms
    const lo = M.clamp((t - tChl) / 0.4); light.p.style.opacity = lo; light.h.style.opacity = lo; light.s.style.opacity = lo;
    light.p.style.strokeDasharray = '18 10'; light.p.style.strokeDashoffset = (-(t * 40) % 28).toFixed(1);
    atoms.forEach((a, i) => { const on = M.io((t - tAtoms - 0.2 - (i % 9) * 0.03) / 0.3); attr(a, 'r', (i < 20 ? 6 : 5) * (1 + 0.5 * on * (1 - M.io((t - tAtoms - 0.8) / 0.4)))); a.setAttribute('fill', mix(C.ink, C.ac, on)); });
    M.vis(zFx, t, tChl + 0.6, 1e9, POP);
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 4 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'kitchen') + 0.5, T0('Z6') + 1.4);
  }

  /* L: ladder */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lf'), t, tL1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#lr'), t, tL1 + 0.2, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.8); M.vis(el.querySelector('.why'), t, tSt[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let last = -1; tRg.forEach((tt, i) => { if (t >= tt - 0.05) last = i; });
    RG.forEach(([ic], i) => { const el = $('#rg' + i), on = M.io((t - tRg[i] + 0.05) / 0.25), cur = i === last ? 1 : 0;
      M.vis(el, t, tL1 + 0.4 + i * 0.05, 1e9, { dy: 10 });
      el.style.background = cur ? C.ac : mix(C.soft, C.ac2, on); el.style.color = cur ? '#FFFFFF' : mix(C.dim, C.ink, Math.max(on, 0.0)); PUC.setIco($('#rgi' + i), ic, cur ? '#FFFFFF' : on > 0.5 ? C.ac : C.dim, 24, 2.2); });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'cell') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'alive') - 0.1, 0.8);
  }

  /* C: cell theory */
  const cOn = t >= tC1 - 0.1 && t < tU1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('U1');
    M.vis($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.draw(tlL, t, EV[0][4] - 0.2, EV[2][4] - EV[0][4] + 0.2, M.o3);
    EV.forEach((e, i) => { const el = $('#ev' + i); M.vis(el, t, e[4] - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis(el.querySelector('.dt'), t, e[4] - 0.15, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#cr'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - tDiv) / 1.2), u2 = M.io((t - tDiv2) / 1.2);
    const pos = [CCX - 110 * u1 - 55 * u2, CCX - 110 * u1 + 55 * u2, CCX + 110 * u1 - 55 * u2, CCX + 110 * u1 + 55 * u2];
    const vis = [1, u2 > 0 ? 1 : 0, 1, u2 > 0 ? 1 : 0];
    const show = t >= T0('C3') + 0.2;
    pos.forEach((x, i) => { [cOut[i], cIn[i], cNu[i]].forEach(e => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', CCY); M.hide(e, !show || !vis[i] || (i >= 2 && u1 <= 0)); }); });
    const stg = [...$('#stg').querySelectorAll('span')], si = u2 >= 0.99 ? 2 : u1 >= 0.99 ? 1 : 0;
    M.vis($('#stg'), t, T0('C3') + 0.1, 1e9, { dy: 10 });
    stg.forEach((s, i) => { const on = i === si ? 1 : 0, done = i < si; s.style.background = on ? C.ac : '#FFFFFF'; s.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; s.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#ct0'), t, wt('C4', 'all') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#ct1'), t, wt('C4', 'every') - 0.1, 1e9, { dx: -20, dy: 0 });
  }

  /* U: one vs many, then pause and think */
  const uOn = t >= tU1 - 0.1 && t < tM + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U4');
    M.vis($('#ua'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ax = 260 + 220 * M.clamp((t - tU1) / (T0('U4') - tU1)), ay = 244, tt = t - tU1;
    attr(amb, 'd', amoeba(ax, ay, 132, tt)); attr(amN, 'cx', (ax - 24).toFixed(1)); attr(amN, 'cy', ay - 14); attr(amF, 'cx', (ax + 52).toFixed(1)); attr(amF, 'cy', ay + 34); attr(amC, 'cx', (ax - 72).toFixed(1)); attr(amC, 'cy', ay + 44);
    tTg.forEach((tg, i) => { const el = $('#tg' + i); M.vis(el, t, tg - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tg) / 0.25)); });
    M.vis($('#uaP'), t, wt('U2', 'whole') - 0.1, 1e9, POP);
    M.vis($('#ub'), t, T0('U3') - 0.15, out, { dx: 60, dy: 0, ...o });
    CT.forEach((_, i) => M.vis($('#ct3' + i), t, tCt[i] - 0.1, 1e9, { dy: 24 }));
    avU(t, wt('U3', 'oxygen') + 0.3, out);
    M.vis($('#th1'), t, tU4 + 0.05, OUT('M2'), { dy: 36, ...o });
    th1(t, { tin: tU4, tOpts: wt('U4', 'one') - 0.1, tCount: T1('U4') + 0.05, dur: 3, tAns: T0('U5') - 0.02, tWhy: wt('U5', 'Yeast') });
  }

  /* M: sorting + names */
  const mOn = t >= tM - 0.1 && t < tP1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('P1');
    M.vis($('#ml'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o });
    const tNum = wt('M2', 'about'); M.vis($('#mBig'), t, tNum - 0.1, 1e9, { dy: 12 }); M.count($('#mN'), t, tNum, 1.2, 0, 1.7, v => v.toFixed(1)); M.vis($('#mSrc'), t, tNum + 0.6, 1e9, { dy: 8 });
    PR.forEach((_, i) => { const el = $('#pr' + i), ti = tPr0 + (tPr6 - tPr0) * i / 6; M.vis(el, t, T0('M3') + 0.1 + i * 0.06, 1e9, { dy: 12 });
      const on = M.io((t - ti) / 0.25); el.style.background = i === 6 ? mix(C.soft, C.ac, on) : mix(C.soft, C.ac2, on); el.style.color = i === 6 ? mix(C.ink, '#FFFFFF', on) : C.ink; });
    M.vis($('#mr'), t, T0('M4') - 0.1, out, { dx: 60, dy: 0, ...o });
    NM.forEach((n, i) => { M.vis($('#nm' + i), t, n[3] - 0.15, 1e9, { dy: 20 }); M.vis($('#gg' + i), t, n[3] + 0.5, 1e9, POP); M.vis($('#gs' + i), t, n[3] + 0.8, 1e9, POP); });
    [0, 1, 2].forEach(i => M.vis($('#rl' + i), t, T1('M4') + 0.1 + i * 0.15, 1e9, POP));
  }

  /* P: the map */
  const pOn = t >= tP1 - 0.1 && t < tW1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pm'), t, tP1 + 0.05, OUT('W1'), { dy: 36, ...o });
    M.vis($('#mh0'), t, tP1 + 0.4, 1e9, { dy: 8 }); M.vis($('#mh1'), t, tP1 + 0.6, 1e9, { dy: 8 });
    [U11, U12].forEach((U, c) => U.forEach((u, i) => M.hide($('#un' + c + i), t < tP1 + 0.5)));
    [U11, U12].forEach((U, c) => U.forEach((u, i) => { const el = $('#un' + c + i); M.vis(el, t, u[2] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - u[2]) / 0.25) * (1 - M.io((t - u[2] - 1.1) / 0.3))); }));
    M.vis($('#here'), t, T1('P3') + 0.1, 1e9, POP);
    M.vis($('#flw .lbl'), t, T0('P4') - 0.1, 1e9, { dy: 8 });
    tFw.forEach((tt, i) => { M.vis($('#fw' + i), t, tt - 0.1, 1e9, POP); if (i < 3) M.vis($('#fa' + i), t, tt + 0.1, 1e9, { dy: 0, fade: 0.2 }); });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[5] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[5] + 0.5, 1e9, { dy: 8 }); });
    avW(t, wt('W5', 'liquid') + 0.3, OUT('X1'));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'cell') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'smallest') - 0.1 });
    M.vis(tCell, t, wt('X3', 'cells') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tLb[0], t, wt('X3', 'cells'), 1e9, { dy: 6 });
    M.vis(tMit, t, wt('X3', 'organelles') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(tLb[1], t, wt('X3', 'organelles'), 1e9, { dy: 6 });
    tMol.forEach((m, i) => M.vis(m, t, wt('X3', 'molecules') - 0.05 + i * 0.08, 1e9, { ...POP, sc: 0.2 })); M.vis(tLb[2], t, wt('X3', 'molecules') + 0.1, 1e9, { dy: 6 });
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
