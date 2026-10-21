// PUC Biology Ep 04: Biodiversity and the Need for Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = '#2E2A24', GRN = C.ac, LEAF = '#8CC48F', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', BARK = '#8A5A34', SOIL = '#B98A5E';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  tree: ['M12 22v-6', 'M12 16c-5 0-8-3-8-6.5S7 3 12 3s8 3 8 6.5-3 6.5-8 6.5Z', 'M12 16l-3-3', 'M12 14l3-3'],
  grass: ['M5 21c0-6 1-10 3-13', 'M10 21c0-5 .5-9 2-14', 'M15 21c0-5 1-8 4-11', 'M3 21h18'],
  moss: ['M3 20h18', 'M6 20v-4', 'M9 20v-6', 'M12 20v-5', 'M15 20v-7', 'M18 20v-4', ci(6, 15, 1.2), ci(9, 13, 1.2), ci(12, 14, 1.2), ci(15, 12, 1.2), ci(18, 15, 1.2)],
  ant: [ci(5, 13, 2.2), ci(11, 13, 2.6), ci(18, 13, 3.4), 'M8 9.5 6 7', 'M9 16.5l-2 3', 'M11 10.4V7', 'M11 15.6v3.5', 'M14 10.5l2-3', 'M14 15.5l2 3', 'M3.6 11.4 2 9'],
  butterfly: ['M12 7v12', 'M12 9C8 3 3 4 3 8s4 5 9 3', 'M12 9c4-6 9-5 9-1s-4 5-9 3', 'M12 13c-3 0-6 2-5 5s4 1 5-3', 'M12 13c3 0 6 2 5 5s-4 1-5-3', 'M12 7 10 4', 'M12 7l2-3'],
  beetle: ['M12 8c3.3 0 5 2.7 5 6.5S15 21 12 21s-5-2.7-5-6.5S8.7 8 12 8Z', 'M12 8v13', ci(12, 6, 2), 'M7.5 12 4 10', 'M7 15H3.5', 'M7.5 18 4 20', 'M16.5 12l3.5-2', 'M17 15h3.5', 'M16.5 18l3.5 2'],
  crow: ['M3 12c3-1 5-4 9-4 3 0 4 2 5 3l4 1-4 1c-1 3-4 5-8 5-3 0-5-1-6-3l4-1Z', 'M15.5 10.5h.01', 'M9 17l-1 4', 'M12 17v4'],
  worm: ['M3 12c2-3 5-3 7-2s4 2 6 1.5 3.6-2 5-1.5c-1 2.5-3 3.5-5 3.5s-4-1-6-1.5S5 13 3 12Z', 'M18.4 11h.01', 'M19.8 11h.01'],
  spider: [ci(12, 13, 3), ci(12, 8.5, 1.8), 'M9.5 11.5 5 8 3 9', 'M9 13H4l-2 2', 'M9.5 14.5 5 17l-1 3', 'M10.5 15.5 8 20', 'M14.5 11.5 19 8l2 1', 'M15 13h5l2 2', 'M14.5 14.5 19 17l1 3', 'M13.5 15.5 16 20'],
  rice: ['M12 21V9', 'M12 9c-2-2-2-5 0-7 2 2 2 5 0 7', 'M12 13c-3-1-4-4-3-6 2 1 3 3 3 6', 'M12 13c3-1 4-4 3-6-2 1-3 3-3 6', 'M12 17c-3-1-4-4-3-6 2 1 3 3 3 6', 'M12 17c3-1 4-4 3-6-2 1-3 3-3 6'],
  cotton: [ci(12, 9, 4), ci(8, 12, 3), ci(16, 12, 3), 'M12 15v6', 'M9 15l3 2 3-2'],
  bamboo: ['M8 21V3', 'M16 21V3', 'M6.5 8h3', 'M6.5 14h3', 'M14.5 6h3', 'M14.5 12h3', 'M14.5 18h3', 'M8 8c3-1 5-3 6-6'],
  scope: ['M6 18h8', 'M3 22h18', 'M14 22a7 7 0 1 0 0-14h-1', 'M9 14h2', 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z', 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') - 0.05, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['tree', 'A mango tree', 'ROOTED PLANT', ['H1', 'mango']], ['ant', 'Ants', 'SIX LEGGED INSECTS', ['H1', 'Ants']], ['crow', 'A crow', 'FEATHERED BIRD', ['H1', 'crow']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3][0], j[3][1]));

/* ---------- H: the garden (hand-built scene) ---------- */
const hg = $('#hgS'), GO = {};
mk(hg, 'rect', { x: 0, y: 470, width: 1056, height: 110, fill: '#C9A27A' });
mk(hg, 'line', { x1: 0, y1: 470, x2: 1056, y2: 470, stroke: '#6E8E3A', 'stroke-width': 8 });
// compound wall on the right
mk(hg, 'rect', { x: 780, y: 250, width: 276, height: 220, fill: '#E8DCC6', stroke: BR, 'stroke-width': 3 });
for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) mk(hg, 'rect', { x: 780 + c * 60 + (r % 2) * 30 - 30, y: 250 + r * 44, width: 60, height: 44, fill: 'none', stroke: '#CDBDA2', 'stroke-width': 2 });
const grp = k => (GO[k] = mk(hg, 'g', {}));
// mango tree
{ const g = grp('mango'); mk(g, 'path', { d: 'M230,470 L230,330 Q228,300 200,280 M232,350 Q260,310 300,296', stroke: BARK, 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M90,250 C70,170 150,96 240,104 C330,90 420,150 404,232 C420,300 330,330 250,316 C170,330 90,310 90,250 Z', fill: LEAF, stroke: BR, 'stroke-width': 4 });
  [[170, 200], [290, 180], [330, 260], [210, 280]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 14, ry: 18, fill: '#E8B23A', stroke: BR, 'stroke-width': 2.5 })); }
{ const g = grp('grass'); for (let k = 0; k < 14; k++) { const x = 40 + k * 52 + (k % 3) * 8; mk(g, 'path', { d: `M${x},472 q-4,-26 -14,-40 M${x},472 q2,-30 6,-46 M${x},472 q8,-22 18,-32`, stroke: '#4E8A3A', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); } }
{ const g = grp('ants'); for (let k = 0; k < 6; k++) { const y = 452 - k * 22; mk(g, 'ellipse', { cx: 222 + (k % 2) * 6, cy: y, rx: 4, ry: 6, fill: BR }); mk(g, 'ellipse', { cx: 222 + (k % 2) * 6, cy: y - 8, rx: 3, ry: 3.5, fill: BR }); } }
{ const g = grp('crow'); mk(g, 'path', { d: 'M300,292 c14,-6 26,-22 50,-22 16,0 22,10 28,16 l22,6 -22,6 c-6,16 -22,26 -44,26 -16,0 -28,-6 -34,-16 l20,-6 Z', fill: '#2B2F3A', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 372, cy: 280, r: 3, fill: '#fff' }); }
{ const g = grp('moss'); [[820, 300], [900, 360], [990, 290], [960, 420], [840, 430]].forEach(([x, y]) => { mk(g, 'ellipse', { cx: x, cy: y, rx: 30, ry: 14, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 2.5 }); for (let k = -2; k <= 2; k++) mk(g, 'line', { x1: x + k * 9, y1: y - 6, x2: x + k * 9, y2: y - 18, stroke: '#1F5E37', 'stroke-width': 2.5, 'stroke-linecap': 'round' }); }); }
{ const g = grp('worm'); mk(g, 'path', { d: 'M440,532 c20,-16 40,-16 60,0 s40,16 60,0 s40,-16 60,0', stroke: '#C76A6A', 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' }); }
{ const g = grp('hib'); mk(g, 'line', { x1: 640, y1: 470, x2: 640, y2: 360, stroke: '#4E8A3A', 'stroke-width': 7 });
  for (let k = 0; k < 5; k++) { const a = k * 2 * Math.PI / 5 - Math.PI / 2; mk(g, 'ellipse', { cx: 640 + 26 * Math.cos(a), cy: 340 + 26 * Math.sin(a), rx: 24, ry: 16, fill: '#D1495B', stroke: BR, 'stroke-width': 2.5, transform: `rotate(${a * 180 / Math.PI} ${640 + 26 * Math.cos(a)} ${340 + 26 * Math.sin(a)})` }); }
  mk(g, 'line', { x1: 640, y1: 340, x2: 664, y2: 300, stroke: GOLD, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M600,420 c-26,-14 -40,-4 -44,10 22,6 36,2 44,-10 Z', fill: LEAF, stroke: BR, 'stroke-width': 2.5 }); }
{ const g = grp('fly'); const e = mk(g, 'g', {}); GO.flyB = e;
  mk(e, 'path', { d: 'M0,0 C-14,-26 -40,-22 -38,-4 C-36,8 -14,8 0,0 Z M0,0 C14,-26 40,-22 38,-4 C36,8 14,8 0,0 Z', fill: '#F2B57E', stroke: BR, 'stroke-width': 2.5 }); mk(e, 'line', { x1: 0, y1: -12, x2: 0, y2: 12, stroke: BR, 'stroke-width': 4, 'stroke-linecap': 'round' }); }
const GT = [['mango', 'MANGO TREE', 250, 96, ['H1', 'mango']], ['grass', 'GRASS', 120, 506, ['H1', 'Grass']], ['ants', 'ANTS', 140, 420, ['H1', 'Ants']], ['crow', 'CROW', 352, 346, ['H1', 'crow']],
  ['moss', 'MOSS', 918, 240, ['H2', 'Moss']], ['worm', 'EARTHWORM', 530, 568, ['H2', 'earthworm']], ['fly', 'BUTTERFLY', 712, 236, ['H2', 'butterfly']], ['hib', 'HIBISCUS', 560, 456, ['H2', 'hibiscus']]];
const gtag = GT.map(([k, s, x, y]) => { const e = mk(hg, 'g', {}); const w = s.length * 11 + 22; mk(e, 'rect', { x: x - w / 2, y: y - 22, width: w, height: 30, rx: 7, fill: C.ink }); txt(e, x, y - 1, s, { 'text-anchor': 'middle', 'font-size': 15, fill: '#fff', 'letter-spacing': 1, 'font-weight': 600 }); return e; });
const tGo = GT.map(g => g[4][0] === 'H1' ? tMorph + 0.3 + GT.indexOf(g) * 0.12 : wt(g[4][0], g[4][1]));

/* ---------- B ---------- */
$('#ki0').innerHTML = Array.from({ length: 10 }, () => M.icon('ant', 27, C.ink, 2)).join('');
$('#ki1').innerHTML = [['ant', C.ink], ['crow', C.ink], ['tree', GRN], ['worm', '#C76A6A']].map(([ic, c]) => `<span style="width:66px;height:66px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(ic, 40, c, 2)}</span>`).join('');
$('#nf0 i').innerHTML = M.icon('tree', 30, GRN, 2.2); $('#nf1 i').innerHTML = M.icon('scope', 30, GRN, 2.2);

/* ---------- Z: zoom ladder into the garden ---------- */
const ZN = ['TREE', 'BARK', 'SOIL', 'WATER DROP'], ZS = ['x1', 'x5', 'x20', 'x400'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Tree', 'One mango tree is a home for many kinds.', 'Leaves, bark, flowers and fruit feed different visitors.'],
  ['RUNG 2 OF 4', 'Bark', 'Small animals and tiny plants live on it.', 'Here: ants, moss and lichen.'],
  ['RUNG 3 OF 4', 'Soil', 'A hidden world under our feet.', 'Here: earthworms, beetle grubs and fungus threads.'],
  ['RUNG 4 OF 4', 'Water drop', 'Seen only under a microscope.', 'Here: bacteria and protists, too many to count.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A whole zoo in one drop!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[470, 380, 50], [520, 470, 56], [700, 330, 40], null];
const LAB = [];
// level 0: mango tree with flowers and fruit
{ const g = ZG[0];
  mk(g, 'line', { x1: 0, y1: 500, x2: 1056, y2: 500, stroke: '#6E8E3A', 'stroke-width': 6 });
  mk(g, 'path', { d: 'M470,500 L470,330 M470,380 Q430,330 380,300 M472,360 Q520,320 580,300', stroke: BARK, 'stroke-width': 34, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M250,250 C220,150 340,60 480,70 C640,56 760,140 730,240 C750,320 620,350 500,330 C380,350 250,330 250,250 Z', fill: LEAF, stroke: BR, 'stroke-width': 4.5 });
  [[330, 170], [610, 150], [680, 250], [400, 270]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y} l-14,-10 M${x},${y} l14,-12 M${x},${y} l0,16`, stroke: '#D8ECD2', 'stroke-width': 3, 'stroke-linecap': 'round' }));
  [[420, 120], [560, 110], [650, 190]].forEach(([x, y]) => { for (let k = 0; k < 5; k++) mk(g, 'circle', { cx: x + (k % 2) * 8 - 4, cy: y - k * 8, r: 5, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 1.5 }); });
  [[340, 240], [600, 290], [520, 250]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 16, ry: 21, fill: '#E8B23A', stroke: BR, 'stroke-width': 2.5 }));
  LAB[0] = [[300, 180, 160, 120, 'Leaves', 'end'], [470, 430, 300, 450, 'Bark', 'end'], [560, 90, 760, 70, 'Flowers', 'start'], [600, 290, 800, 330, 'Fruit', 'start']];
}
// level 1: bark close up with ants, moss and lichen
const antP = [];
{ const g = ZG[1]; mk(g, 'rect', { x: 260, y: 40, width: 520, height: 470, fill: '#A87A52', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 9; k++) mk(g, 'path', { d: `M${290 + k * 58},40 C${300 + k * 58},140 ${276 + k * 58},260 ${292 + k * 58},360 S${286 + k * 58},480 ${296 + k * 58},510`, stroke: '#6E4A2C', 'stroke-width': 5, fill: 'none' });
  [[640, 150, 60, 24], [600, 400, 46, 20]].forEach(([x, y, a, b]) => { mk(g, 'ellipse', { cx: x, cy: y, rx: a, ry: b, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 2.5 }); for (let k = -3; k <= 3; k++) mk(g, 'line', { x1: x + k * a / 4, y1: y - b * 0.4, x2: x + k * a / 4, y2: y - b * 1.3, stroke: '#1F5E37', 'stroke-width': 3, 'stroke-linecap': 'round' }); });
  [[360, 270, 54], [700, 300, 34]].forEach(([x, y, r]) => { mk(g, 'path', { d: `M${x - r},${y} C${x - r},${y - r * 0.9} ${x + r},${y - r} ${x + r},${y - 4} C${x + r * 1.1},${y + r * 0.8} ${x - r * 0.8},${y + r} ${x - r},${y} Z`, fill: '#B9C7A0', stroke: '#6B7A52', 'stroke-width': 3 });
    for (let k = 0; k < 5; k++) mk(g, 'circle', { cx: x - r * 0.5 + k * r * 0.25, cy: y + (k % 2 ? -8 : 8), r: 5, fill: '#8E9E72' }); });
  for (let k = 0; k < 7; k++) { const e = mk(g, 'g', {}); mk(e, 'ellipse', { cx: 0, cy: 8, rx: 7, ry: 10, fill: BR }); mk(e, 'ellipse', { cx: 0, cy: -6, rx: 5, ry: 6, fill: BR }); mk(e, 'circle', { cx: 0, cy: -17, r: 5, fill: BR });
    [-1, 1].forEach(s => [[-4, -10], [0, -14], [6, -8]].forEach(([dy, l]) => mk(e, 'line', { x1: 0, y1: dy, x2: s * 12, y2: dy + l * 0.3, stroke: BR, 'stroke-width': 2 }))); antP.push(e); }
  LAB[1] = [[520, 300, 860, 250, 'Ant', 'start'], [640, 140, 860, 110, 'Moss', 'start'], [360, 270, 200, 200, 'Lichen', 'end'], [300, 460, 200, 470, 'Bark', 'end']];
}
// level 2: soil with earthworm, beetle grub, fungus threads, roots
const worm2 = {};
{ const g = ZG[2]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#D8BF98' });
  { const r = M.rng(9); for (let k = 0; k < 60; k++) mk(g, 'circle', { cx: (r() * 1040).toFixed(1), cy: (r() * 510).toFixed(1), r: (2 + r() * 4).toFixed(1), fill: '#BFA27A' }); }
  [[150, 0, 220, 520], [880, 0, 820, 520]].forEach(([a, b, c, d]) => mk(g, 'path', { d: `M${a},${b} C${a + 30},200 ${c - 40},300 ${c},${d}`, stroke: '#E6D3A8', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }));
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M${560 + k * 30},${380 - k * 6} q30,-30 60,-10 t60,-20 m-60,20 q10,30 40,40`, stroke: '#FFFFFF', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', opacity: 0.9 });
  worm2.p = mk(g, 'path', { stroke: '#C76A6A', 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M300,380 c-30,0 -44,30 -30,52 c14,22 48,22 62,6', stroke: '#F4EEDC', 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: 334, cy: 438, r: 12, fill: '#A0632E' });
  mk(g, 'circle', { cx: 700, cy: 330, r: 22, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3 });
  LAB[2] = [[420, 180, 420, 70, 'Earthworm', 'start'], [300, 410, 190, 470, 'Beetle grub', 'end'], [640, 360, 760, 460, 'Fungus threads', 'start'], [190, 120, 120, 60, 'Root', 'start'], [722, 330, 820, 290, 'Water drop', 'start']];
}
// level 3: microscope view of one drop
const mic = [];
{ const g = ZG[3]; mk(g, 'circle', { cx: 528, cy: 266, r: 236, fill: '#EEF6FA', stroke: '#2B3A63', 'stroke-width': 10 });
  for (let k = 0; k < 9; k++) { const e = mk(g, 'g', {}); if (k < 6) mk(e, 'rect', { x: -16, y: -6, width: 32, height: 12, rx: 6, fill: '#B89BD0', stroke: NUC, 'stroke-width': 2 }); else mk(e, 'circle', { r: 8, fill: '#B89BD0', stroke: NUC, 'stroke-width': 2 }); mic.push(e); }
  for (let k = 0; k < 2; k++) { const e = mk(g, 'g', {}); mk(e, 'path', { d: 'M-50,0 C-50,-24 30,-30 50,-8 C60,6 40,26 0,24 C-30,24 -50,16 -50,0 Z', fill: '#CFE6C6', stroke: '#2F7A4A', 'stroke-width': 3 });
    mk(e, 'ellipse', { cx: -6, cy: 0, rx: 10, ry: 8, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2 }); for (let j = 0; j < 10; j++) { const a = j * Math.PI / 5; mk(e, 'line', { x1: 50 * Math.cos(a) * 1.02, y1: 24 * Math.sin(a) * 1.08, x2: 50 * Math.cos(a) * 1.14, y2: 24 * Math.sin(a) * 1.3, stroke: '#2F7A4A', 'stroke-width': 1.5 }); } mic.push(e); }
  LAB[3] = [[430, 200, 160, 120, 'Bacteria', 'end'], [620, 330, 860, 400, 'Protist', 'start']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx, px, py };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'leaves'), wt('Z2', 'bark'), wt('Z2', 'flowers'), wt('Z2', 'fruit')], [wt('Z3', 'Ants'), wt('Z3', 'Moss'), wt('Z3', 'lichen'), wt('Z3', 'bark')],
  [wt('Z4', 'Earthworms'), wt('Z4', 'beetle'), wt('Z4', 'fungus'), wt('Z4', 'soil') + 0.2, wt('Z4', 'dark')], [wt('Z5', 'Bacteria'), wt('Z5', 'protists')]];

/* ---------- P: one by one? + local names ---------- */
const pa = $('#paS'), pIc = ['ant', 'tree', 'crow', 'worm', 'moss', 'beetle', 'butterfly', 'spider', 'grass', 'mango'], pG = [];
for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { const e = mk(pa, 'g', { transform: `translate(${48 + c * 58} ${92 + r * 64})` }); const b = mk(e, 'rect', { x: 0, y: 0, width: 50, height: 54, rx: 10, fill: C.soft });
  e.insertAdjacentHTML('beforeend', `<g transform="translate(9 11) scale(1.33)" fill="none" stroke="${C.dim}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${M.IC[pIc[(r * 12 + c * 7) % 10]].map(d => `<path d="${d}"/>`).join('')}</g>`); pG.push({ e, b }); }
const pb = $('#pbS');
{ const e = mk(pb, 'g', { transform: 'translate(320 170) scale(6)' }); e.innerHTML = M.IC.mango.map(d => `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`).join(''); }
const BUB = [['HINDI', 36, 90], ['KANNADA', 498, 90], ['TAMIL', 36, 300], ['BENGALI', 498, 300]];
$('#bubs').innerHTML = BUB.map(([l, x, y], i) => `<div class="bub" id="bub${i}" style="left:${x}px;top:${y}px"><div class="bl">${l}</div><svg width="250" height="92" style="position:absolute;left:0;top:0"><path d="M20,62 q12,-14 24,0 t24,0 t24,0 t24,0 t24,0" stroke="#16213E" stroke-width="3" fill="none" stroke-linecap="round"/></svg></div>`).join('');
$('#pb').insertAdjacentHTML('beforeend', `<div class="lbl" id="pbN" style="left:338px;top:322px">ONE MANGO</div>`);

/* ---------- S: the sort ---------- */
const ORG = [['tree', 'Mango tree', 'P'], ['grass', 'Grass', 'P'], ['moss', 'Moss', 'P'], ['ant', 'Ant', 'I'], ['butterfly', 'Butterfly', 'I'], ['beetle', 'Beetle', 'I'], ['spider', 'Spider', 'J'], ['crow', 'Crow', 'A'], ['worm', 'Earthworm', 'A']];
$('#skK').innerHTML = ORG.map(([ic, n], i) => `<div class="tok" id="tk${i}">${M.icon(ic, 24, ['P'].includes(ORG[i][2]) ? GRN : C.ink, 2.2)}${n}</div>`).join('');
const QN = [['QUESTION 1', 'Makes its own food?', 360, 90], ['QUESTION 2', 'Jointed legs?', 360, 260], ['QUESTION 3', 'Three pairs of legs?', 760, 260]];
$('#skQ').innerHTML = QN.map(([h, q, x, y], i) => `<div class="qn" id="qn${i}" style="left:${x}px;top:${y}px"><div class="qh">${h}</div><div class="qt">${q}</div></div>`).join('');
const BIN = [['PLANTS', 760, 84, 804, 120], ['NO JOINTED LEGS', 360, 420, 360, 120], ['INSECTS', 1160, 230, 404, 160], ['OTHER JOINTED LEGS', 760, 420, 360, 120]];
$('#skB').innerHTML = `<div class="bin" id="bnPool" style="left:36px;top:76px;width:270px;height:476px;border-style:solid;background:#fff"><div class="bh" id="poolH">GARDEN · 9 KINDS</div></div>` +
  BIN.map(([h, x, y, w, ht], i) => `<div class="bin" id="bn${i}" style="left:${x}px;top:${y}px;width:${w}px;height:${ht}px"><div class="bh">${h}</div></div>`).join('');
{ const s = $('#skS'), ar = (d, id) => { const e = mk(s, 'path', { d, stroke: C.dim, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', id }); return e; };
  SK.ar = [ar('M664,138 L752,138', 'a0'), ar('M510,190 L510,252', 'a1'), ar('M664,308 L752,308', 'a2'), ar('M510,360 L510,412', 'a3'), ar('M1064,308 L1152,308', 'a4'), ar('M910,360 L910,412', 'a5')];
  SK.yn = [['YES', 690, 112], ['NO', 520, 214], ['YES', 690, 282], ['NO', 520, 384], ['YES', 1090, 282], ['NO', 920, 384]].map(([s2, x, y]) => { const e = mk(s, 'g', {}); mk(e, 'rect', { x: x - 4, y: y - 18, width: s2.length * 12 + 12, height: 26, rx: 6, fill: s2 === 'YES' ? C.ac2 : '#FBE6E6' }); txt(e, x + 2, y + 1, s2, { 'font-size': 15, fill: s2 === 'YES' ? '#1F6B3F' : C.red, 'font-weight': 600, 'letter-spacing': 1 }); return e; }); }
function SK() {}
const tQ1 = wt('S2', 'Question'), tPl = wt('S2', 'Plants'), tQ2 = wt('S3', 'Question'), tJn = wt('S3', 'Ants'), tQ3 = wt('S4', 'Three'), tIn = wt('S4', 'insects');
// token slots: pool (re-packs as tokens leave), then bins
const DEST = ORG.map(([, , g], i) => { const k = ORG.slice(0, i).filter(o => o[2] === g).length;
  return g === 'P' ? [776 + k * 208, 128] : g === 'A' ? [376 + k * 168, 464] : g === 'I' ? [[1176, 274], [1356, 274], [1176, 326]][k] : [776, 464]; });
const tAside = wt('S3', 'legs') + 0.4;
const tMove = ORG.map(([, , g], i) => { const k = ORG.slice(0, i).filter(o => o[2] === g).length; return g === 'P' ? tPl + 0.2 + k * 0.2 : g === 'A' ? tAside + k * 0.2 : g === 'I' ? tIn + k * 0.15 : tIn + 0.5; });

/* ---------- L: why grouping helps ---------- */
const STEPS = [['Learn one, know many', 'one ant tells you a lot about every insect'], ['Identify faster', 'you know which group to look in'], ['One fixed place', 'scientists everywhere mean the same group'], ['See relationships', 'which groups are close, which are distant']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5'].map(id => T0(id) + 0.45);
$('#gps').innerHTML = `<div class="gp" id="gp0" style="top:84px;height:150px"><div class="gh2">GROUP · INSECTS</div><div style="position:absolute;left:18px;top:46px;display:flex;gap:12px">${['ant', 'butterfly', 'beetle'].map(ic => `<span style="width:64px;height:64px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(ic, 40, C.ink, 2)}</span>`).join('')}</div>
  <div class="pillp ac" id="gpF" style="left:262px;top:56px;height:44px;font-size:20px">Shared: 3 pairs of jointed legs</div></div>
  <div class="gp" id="gp1" style="top:252px;height:80px"><div style="position:absolute;left:18px;top:16px;display:flex;gap:14px;align-items:center;font:600 23px Poppins;white-space:nowrap">${M.icon('scope', 32, GRN, 2.2)}A new bug: 3 pairs of legs?<span class="pillp good" style="position:static;height:40px;font-size:19px">Look among insects</span></div></div>
  <div class="gp" id="gp2" style="top:350px;height:80px"><div style="position:absolute;left:18px;top:16px;display:flex;gap:14px;align-items:center;font:600 23px Poppins;white-space:nowrap">${M.icon('book', 32, GRN, 2.2)}One group, one meaning, worldwide</div></div>
  <div class="gp" id="gp3" style="top:448px;height:96px"><div class="gh2">CLOSE RELATIVES</div><div style="position:absolute;left:18px;top:42px;display:flex;gap:10px;align-items:center;font:600 21px Poppins;white-space:nowrap">${M.icon('ant', 26, C.ink, 2)}Insects<span style="color:var(--ac)">+</span>${M.icon('spider', 26, C.ink, 2)}Spiders<span class="lbl" style="position:static;margin-left:8px">BOTH HAVE JOINTED LEGS</span></div></div>`;

/* ---------- V: by use vs by features ---------- */
const U0 = [['FOOD', [['mango', 'Mango'], ['rice', 'Rice']]], ['CLOTHING', [['cotton', 'Cotton']]], ['SHELTER', [['bamboo', 'Bamboo']]]];
const U1 = [['TREES', [['mango', 'Mango'], ['tree', 'Neem']]], ['GRASSES', [['rice', 'Rice'], ['bamboo', 'Bamboo']]], ['SHRUBS', [['cotton', 'Cotton']]]];
const ub = (U, p) => U.map(([h, it], i) => `<div class="ub" id="${p}${i}" style="left:${36 + i * 244}px"><div class="uh">${h}</div>${it.map(([ic, n], j) => `<div class="ui" id="${p}${i}${j}" style="top:${56 + j * 64}px">${M.icon(ic, 26, ic === 'mango' ? GOLD : GRN, 2.2)}${n}</div>`).join('')}</div>`).join('');
$('#ubs0').innerHTML = ub(U0, 'ua'); $('#ubs1').innerHTML = ub(U1, 'ub');
$('#vb').insertAdjacentHTML('beforeend', `<div class="lbl" id="vbS2" style="left:36px;top:470px;font-size:15px">GROUPED BY BODY: TREE WITH BROAD LEAVES VS GRASS</div>`);
const th1 = PUC.think($('#th1'), { q: 'Grouping animals into pets and farm animals. Is that a scientific classification?', opts: ['Yes', 'No'], right: 1, why: 'No. That is grouping by use. A cow and a dog are both mammals.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">classification sorts them <b>by features</b></span>';

/* ---------- W: worked example ---------- */
const WQ = ['OWN FOOD?', 'JOINTED LEGS?', '3 PAIRS?'], WX = [560, 760, 960];
const WR = [['tree', 'Mango tree', ['YES', '-', '-'], 'Plant', 'W2'], ['worm', 'Earthworm', ['NO', 'NO', '-'], 'Animal, not an insect', 'W3'], ['crow', 'Crow', ['NO', 'NO', '-'], 'Bird: 2 legs, wings, feathers', 'W4'],
  ['ant', 'Ant', ['NO', 'YES', 'YES'], 'Insect', 'W5'], ['butterfly', 'Butterfly', ['NO', 'YES', 'YES'], 'Insect, with the ant', 'W6']];
$('#wrs').innerHTML = WQ.map((q, j) => `<div class="wh2" style="left:${WX[j] - 40}px">${q}</div>`).join('') + `<div class="wh2" style="left:1234px;width:330px">GROUP</div>` +
  WR.map(([ic, n, a, g], i) => `<div class="wr" id="wr${i}" style="top:${124 + i * 84}px"><i>${M.icon(ic, 30, ic === 'tree' ? GRN : C.ink, 2.2)}</i><div class="wn">${n}</div>
  ${a.map((s, j) => `<div class="wa2" id="wa${i}${j}" style="left:${WX[j] - 36 - 36}px;background:${s === 'YES' ? 'var(--okBg)' : s === 'NO' ? 'var(--redBg)' : '#fff'};color:${s === 'YES' ? '#1F6B3F' : s === 'NO' ? 'var(--red)' : C.dim}">${s}</div>`).join('')}
  <div class="wg" id="wg${i}" style="${g.startsWith('Insect') ? '' : g === 'Plant' ? 'background:#1F6B3F' : 'background:var(--ink)'}">${g}</div></div>`).join('');
const tWr = WR.map(([, , , , id]) => { const t0 = T0(id) + 0.3, t1 = T1(id) - 0.7; return [t0, t0 + (t1 - t0) * 0.3, t0 + (t1 - t0) * 0.6, t1]; });
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 520, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Three questions, five organisms sorted.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Biodiversity means the number of living individuals', right: 'Biodiversity is the number and types of organisms' });
const tS = $('#tS'), tAnt = [];
for (let k = 0; k < 10; k++) { const e = mk(tS, 'g', { transform: `translate(${60 + (k % 5) * 44} ${70 + Math.floor(k / 5) * 54}) scale(1.5)` }); e.innerHTML = M.IC.ant.map(d => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/>`).join(''); tAnt.push(e); }
const tEq = txt(tS, 170, 214, '10 ANTS = 1 KIND', { 'text-anchor': 'middle', 'font-size': 18, fill: GRN, 'letter-spacing': 1.5, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'One line: the meaning of biodiversity, the number of species known' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Classification groups organisms into convenient categories.</div><div class="sl"><b>II</b>About 1.7 to 1.8 million species are known and described.</div><div class="sl"><b>III</b>Biodiversity counts the individuals of a species.</div><div class="sl"><b>IV</b>Classification uses easily observable characters.</div>',
  opts: ['I and II only', 'II, III and IV only', 'I, II and IV only', 'I, II, III and IV'], right: 2, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b> (I, II, IV)'], ['<b style="color:var(--red)">III</b> is false'], ['It counts kinds, not individuals'], ['<b style="color:var(--ok)">I, IV</b>: classification'], ['<b style="color:var(--ok)">II</b>: species described']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Three'), wt('A2', 'kinds'), wt('A3', 'One'), wt('A3', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · biodiversity and classification', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Biodiversity</b>: the number and types of organisms on Earth', '<b>Known</b>: about <span class="mono">1.7 - 1.8</span> million species, and growing', '<b>Classification</b>: grouping into convenient categories',
    '<b>Based on</b> easily observable features, not on use', '<b>Why</b>: learn faster, identify, one fixed place, relatives'] });
const YQ = ['What exactly does biodiversity count?', 'Why can\'t we study every organism one by one?', 'Why are pets and farm animals not a scientific group?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 05', topic: 'Sorting a spice box is easy. Who sorts the living world?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; ['wb0', 'wop', 'wb1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 24; });
  [['wm0', 'wb0'], ['wm1', 'wb1']].forEach(([m, b]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft + bb.offsetWidth / 2 - e.offsetWidth / 2) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the garden */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hg'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    GT.forEach(([k], i) => { M.vis(GO[k], t, tGo[i] - 0.05, 1e9, { dy: 14, fade: 0.2 }); M.vis(gtag[i], t, tGo[i] + 0.1, 1e9, { dy: 8, fade: 0.15 }); });
    const fl = t - tGo[6]; attr(GO.flyB, 'transform', `translate(${(712 + 30 * Math.sin(fl * 0.8)).toFixed(1)} ${(290 + 12 * Math.sin(fl * 1.7)).toFixed(1)}) scale(1 ${(0.6 + 0.4 * Math.abs(Math.cos(fl * 6))).toFixed(3)})`);
    M.vis($('#hc'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tH3 + 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hcK'), t, tH3 + 0.2, 1e9, { dy: 8 }); M.vis($('#hcN'), t, tH3 + 0.3, 1e9, { dy: 12 });
    const n = t < wt('H4', 'lost') ? Math.round(8 + 22 * M.clamp((t - wt('H3', 'counting')) / (wt('H4', 'lost') - wt('H3', 'counting')))) : -1;
    M.setT($('#hcN'), n < 0 ? '30+' : String(Math.max(8, n)));
    M.vis($('#hcG'), t, wt('H3', 'counting'), 1e9, { dy: 8 }); M.vis($('#hcP'), t, wt('H4', 'lost') - 0.1, 1e9, POP);
    M.vis($('#hcQ0'), t, wt('H5', 'biodiversity') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#hcQ1'), t, wt('H5', 'sort') - 0.1, 1e9, { dx: -16, dy: 0 });
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bw'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wb0'), t, wt('B2', 'Bio') - 0.1, 1e9, POP); M.vis($('#wm0'), t, wt('B2', 'life') - 0.1, 1e9, POP);
    M.vis($('#wop'), t, wt('B2', 'Diversity') - 0.25, 1e9, POP); M.vis($('#wb1'), t, wt('B2', 'Diversity') - 0.1, 1e9, POP); M.vis($('#wm1'), t, wt('B2', 'variety') - 0.1, 1e9, POP);
    M.vis($('#bP'), t, wt('B2', 'number') - 0.1, 1e9, POP);
    M.vis($('#k20'), t, wt('B3', 'thousand') - 0.1, 1e9, { dy: 16 }); M.vis($('#kv0'), t, wt('B3', 'one', 1) - 0.1, 1e9, POP);
    M.vis($('#k21'), t, wt('B3', 'count') - 0.3, 1e9, { dy: 16 }); M.vis($('#kv1'), t, wt('B3', 'count') + 0.3, 1e9, POP);
    M.vis($('#bn'), t, T0('B4') - 0.15, out, { dx: 60, dy: 0, ...o });
    const tNum = wt('B4', 'one'); M.vis($('#mBig'), t, tNum - 0.1, 1e9, { dy: 12 }); M.count($('#mN'), t, tNum, 1.2, 0, 1.7, v => v.toFixed(1)); M.vis($('#mSrc'), t, tNum + 0.6, 1e9, { dy: 8 });
    M.vis($('#bnP'), t, wt('B4', 'keeps') - 0.1, 1e9, POP);
    M.vis($('#nf0'), t, wt('B5', 'new') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#nf1'), t, wt('B5', 'old') - 0.1, 1e9, { dx: -16, dy: 0 });
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
    antP.forEach((a, i) => { const p = ((t - tZ[1]) * 0.08 + i / 7) % 1, y = 520 - p * 520, x = 520 + Math.sin(p * 9) * 10; attr(a, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
    const wp = t * 2.2; attr(worm2.p, 'd', `M260,200 c40,${(-30 * Math.sin(wp)).toFixed(1)} 80,${(-30 * Math.sin(wp)).toFixed(1)} 120,0 s80,${(30 * Math.sin(wp + 1)).toFixed(1)} 120,0 s80,${(-30 * Math.sin(wp + 2)).toFixed(1)} 120,0`);
    mic.forEach((m, i) => { const a = t * (0.3 + (i % 3) * 0.12) + i * 1.7, r = 60 + (i * 37) % 150, fx = { 0: [430, 200], 9: [620, 330], 10: [420, 380] }[i];
      if (fx) attr(m, 'transform', `translate(${(fx[0] + 8 * Math.sin(t * 1.3 + i)).toFixed(1)} ${(fx[1] + 6 * Math.cos(t * 1.1 + i)).toFixed(1)}) rotate(${(10 * Math.sin(t + i)).toFixed(1)})`);
      else attr(m, 'transform', `translate(${(528 + r * Math.cos(a)).toFixed(1)} ${(266 + r * 0.8 * Math.sin(a)).toFixed(1)}) rotate(${((a * 57) % 360).toFixed(0)})`); });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'count') + 0.2, out);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pa'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const lit = Math.floor(M.clamp((t - tP1 - 0.6) / 12) * 9);
    pG.forEach((p, i) => { p.e.style.opacity = M.clamp((t - tP1 - 0.3 - i * 0.012) / 0.2).toFixed(3); attr(p.b, 'fill', i < lit ? C.ac2 : C.soft); });
    M.setT($('#paN'), `${lit} OF 1,700,000+`); M.vis($('#paT'), t, tP1 + 0.6, 1e9, POP); M.vis($('#paP'), t, wt('P1', 'never') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pbS'), t, T0('P2') + 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis($('#pbN'), t, T0('P2') + 0.3, 1e9, { dy: 6 });
    BUB.forEach((_, i) => M.vis($('#bub' + i), t, wt('P2', 'different') - 0.2 + i * 0.25, T0('P3') + 0.6, { ...POP, outDur: 0.25 }));
    M.vis($('#pDef'), t, wt('P3', 'Classification') - 0.1, 1e9, { dy: 20 });
  }

  /* S: the sort */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    M.vis($('#sk'), t, tS1 + 0.05, OUT('L1'), { dy: 36, ...o });
    const tq = [tQ1, tQ2, tQ3]; let cq = -1; tq.forEach((tt, i) => { if (t >= tt - 0.1) cq = i; });
    M.setT($('#skN'), String(Math.max(1, cq + 1))); M.vis($('#skT'), t, tQ1 - 0.1, 1e9, POP);
    QN.forEach((_, i) => { const el = $('#qn' + i); M.vis(el, t, tq[i] - 0.15, 1e9, { ...POP, sc: 0.85 }); el.style.borderColor = i === cq ? C.ac : i < cq ? C.ac2 : '#CBD0DA'; el.style.background = i === cq ? C.ac2 : '#FFFFFF'; });
    M.vis($('#bnPool'), t, tS1 + 0.3, 1e9, { dy: 10 });
    BIN.forEach((_, i) => M.vis($('#bn' + i), t, [tQ1 + 0.4, tQ2 + 0.6, tQ3 + 0.4, tQ3 + 0.5][i], 1e9, { dy: 10 }));
    const arT = [tQ1 + 0.5, tQ2 - 0.3, tQ2 + 0.5, tAside - 0.2, tQ3 + 0.5, tQ3 + 0.6]; SK.ar.forEach((a, i) => M.draw(a, t, arT[i], 0.4)); SK.yn.forEach((y, i) => M.vis(y, t, arT[i] + 0.3, 1e9, { dy: 0, fade: 0.2 }));
    M.setT($('#poolH'), t < tPl ? 'GARDEN · 9 KINDS' : 'ANIMALS LEFT');
    ORG.forEach((g, i) => { const el = $('#tk' + i), u = M.io((t - tMove[i]) / 0.8);
      const rank = ORG.slice(0, i).reduce((acc, _, j) => acc + (1 - M.io((t - tMove[j]) / 0.8)), 0);
      const x = M.lerp(52, DEST[i][0], u), y = M.lerp(120 + rank * 48, DEST[i][1], u);
      M.vis(el, t, tS1 + 0.5 + i * 0.08, 1e9, { dy: 10 }); el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      const jl = (g[2] === 'I' || g[2] === 'J') ? M.io((t - tJn) / 0.3) : 0, done = u > 0.99 && g[2] !== 'A' && g[2] !== 'J';
      el.style.borderColor = done ? C.ac : jl > 0.5 ? C.ac : C.line; el.style.background = jl > 0.5 && u < 0.99 ? C.ac2 : '#FFFFFF'; });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tV1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('V1');
    M.vis($('#lf'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.5, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 112]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    [0, 1, 2, 3].forEach(i => M.vis($('#gp' + i), t, tSt[i] - 0.1, 1e9, { dx: 20, dy: 0 })); M.vis($('#gpF'), t, tSt[0] + 0.8, 1e9, POP);
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#va'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const ta = [wt('V2', 'food'), wt('V2', 'clothing'), wt('V2', 'shelter')];
    U0.forEach(([, it], i) => { M.vis($('#ua' + i), t, ta[i] - 0.15, 1e9, { dy: 16 }); it.forEach((_, j) => M.vis($('#ua' + i + j), t, (i === 0 && j === 1 ? wt('V2', 'rice') : ta[i]) + 0.1, 1e9, POP)); });
    M.vis($('#vaP'), t, wt('V2', 'went') - 0.1, 1e9, POP);
    const tb = [wt('V3', 'tree'), wt('V3', 'grass'), wt('V3', 'groups')];
    U1.forEach(([, it], i) => { M.vis($('#ub' + i), t, tb[i] - 0.15, 1e9, { dy: 16 }); it.forEach((_, j) => M.vis($('#ub' + i + j), t, tb[i] + 0.1 + j * 0.2, 1e9, POP)); });
    M.vis($('#vbP'), t, wt('V3', 'different') - 0.1, 1e9, POP); M.vis($('#vbS2'), t, wt('V3', 'different') + 0.3, 1e9, { dy: 6 });
    M.vis($('#th1'), t, tV4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV4, tOpts: wt('V4', 'Yes') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'A') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Biodiversity') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'classification') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    $('#wrs').querySelectorAll('.wh2').forEach((h, j) => M.vis(h, t, tW1 + 0.4 + j * 0.08, 1e9, { dy: 8 }));
    WR.forEach((w, i) => { M.vis($('#wr' + i), t, T0(w[4]) - 0.1, 1e9, { dx: -20, dy: 0 }); [0, 1, 2].forEach(j => M.vis($('#wa' + i + j), t, tWr[i][j], 1e9, POP)); M.vis($('#wg' + i), t, tWr[i][3], 1e9, POP); });
    avW(t, T1('W6') - 0.4, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'biodiversity') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'number') - 0.3 });
    tAnt.forEach((a, k) => { a.style.opacity = M.clamp((t - wt('X3', 'thousand') + 0.2 - k * 0.05) / 0.15).toFixed(3); }); M.vis(tEq, t, wt('X3', 'still') - 0.1, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'meaning') });
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
