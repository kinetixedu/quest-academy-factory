// PUC Biology Ep 16: Modes of Nutrition and Reproduction in Fungi (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible canon) + batch colours: hypha cream tube on brown outline, enzyme teal, food gold, strain 2 nucleus rose
const BR = '#2E2A24', CHL = '#3E9B5F', NUC = '#7B4B94', NUC2 = '#C0587E', WAT = '#5AA0C8', GOLD = '#C9962B', ENZ = '#4F7CAC', RED = '#D64545';
const HY = '#FBF8EE', BREAD = '#E8C88C', CRUST = '#A8743A', SPO = '#3B3530', LEAF = '#8CC48F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const tube = (g, d, w = 7) => [mk(g, 'path', { d, stroke: BR, 'stroke-width': w + 4.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), mk(g, 'path', { d, stroke: HY, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })];
const drawT = (tb, t, t0, d) => tb.forEach(p => M.draw(p, t, t0, d));

Object.assign(M.IC, {
  bread: ['M5 10a4 4 0 0 1 2-7h10a4 4 0 0 1 2 7v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z', 'M9 13h.01', 'M14 16h.01', 'M13 11h.01'],
  mush: ['M3 12a9 7 0 0 1 18 0Z', 'M9.5 12v6.5a2.5 2.5 0 0 0 5 0V12', 'M8 8h.01', 'M15 7h.01'],
  spore: [ci(6, 7, 2.4), ci(16, 6, 2), ci(11, 14, 2.6), ci(18, 16, 2), ci(6, 18, 1.8)],
  link: ['M9 17H7A5 5 0 0 1 7 7h2', 'M15 7h2a5 5 0 1 1 0 10h-2', 'M8 12h8'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tR1 = T0('R1'), tS1 = T0('S1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['bread', 'Old bread', 'GREEN-BLACK SPOTS', 'bread', 'DEAD FOOD'], ['leaf', 'A mustard leaf', 'WHITE SPOTS', 'mustard', 'LIVING LEAF'], ['mush', 'A mushroom', 'ON A ROTTING LOG', 'mushroom', 'DEAD WOOD']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('arrowR', 20, '#fff', 2.6)}${tg}</div></div>`).join('');
const tFeed = wt('H2', 'feeding');

/* ---------- D: how a fungus eats ---------- */
const dS = $('#dS');
mk(dS, 'rect', { x: 52, y: 352, width: 680, height: 170, rx: 26, fill: BREAD, stroke: CRUST, 'stroke-width': 5 });
[[120, 420], [210, 470], [330, 410], [470, 480], [560, 430], [660, 470], [270, 495]].forEach(([x, y]) => mk(dS, 'ellipse', { cx: x, cy: y, rx: 12, ry: 7, fill: '#D6AF6E' }));
const DH = ['M90,340 C180,300 260,330 360,316 C460,302 560,330 700,312', 'M200,322 C220,270 260,240 300,214', 'M420,308 C440,250 500,230 540,190', 'M580,322 C610,280 650,262 700,250', 'M300,318 C330,286 340,260 380,240'];
const dHy = DH.map(d => tube(dS, d, 7));
const dRz = ['M150,336 l-6,26 l-14,14 M150,336 l8,30', 'M470,322 l-4,30 l-14,12 M470,322 l10,28', 'M640,316 l-6,28 M640,316 l12,26'].map(d => mk(dS, 'path', { d, stroke: BR, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
const ENZD = [], FOOD = [];
const rD = M.rng(5);
for (let k = 0; k < 14; k++) { const x = 100 + k * 44 + rD() * 14; ENZD.push({ x, e: mk(dS, 'circle', { r: 6, fill: ENZ }), f: mk(dS, 'circle', { r: 7, fill: GOLD, stroke: '#8A6614', 'stroke-width': 1.5 }), ph: rD() }); }
const dLab = [[250, 266, 170, 200, 'Hypha (one thread)', 'end2'], [690, 312, 720, 182, 'Mycelium (the whole net)', 'end']];
const dLB = dLab.map(([px, py, lx, ly, s, an, el, below]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(dS, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(dS, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(dS, 'text', an === 'end2' ? { x: 52, y: ly - 14, class: 'zl' } : { x: lx + 28, y: ly - 22, 'text-anchor': 'end', class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const dBr = txt(dS, 392, 556, 'BREAD · DEAD FOOD', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: CRUST });
const dNo = mk(dS, 'g', {}); mk(dNo, 'circle', { cx: 392, cy: 200, r: 56, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 4 }); mk(dNo, 'ellipse', { cx: 380, cy: 192, rx: 22, ry: 14, fill: CHL });
mk(dNo, 'path', { d: 'M352,160 L432,240 M432,160 L352,240', stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }); txt(dNo, 392, 292, 'NO CHLOROPHYLL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: RED });
const dIn = PUC.arrow(dS, GOLD, 6, 18);
const dKey = [mk(dS, 'g', {}), mk(dS, 'g', {})];
mk(dKey[0], 'circle', { cx: 52, cy: 92, r: 8, fill: ENZ }); txt(dKey[0], 68, 98, 'DIGESTIVE JUICES OUT', { 'font-size': 16, 'letter-spacing': 1.2, fill: ENZ, 'font-weight': 600 });
mk(dKey[1], 'circle', { cx: 52, cy: 126, r: 8, fill: GOLD }); txt(dKey[1], 68, 132, 'DISSOLVED FOOD IN', { 'font-size': 16, 'letter-spacing': 1.2, fill: '#8A6614', 'font-weight': 600 });
const DW = [['No chlorophyll', 'so a fungus cannot make its own food', wt('D2', 'chlorophyll')], ['Heterotrophic', 'it must take food from outside', wt('D2', 'heterotrophic')],
  ['Hyphae · mycelium', 'thin threads · the whole net of threads', wt('D3', 'hyphae')], ['Absorption', 'break food down outside, then soak it up', wt('D4', 'absorption')]];
$('#dws').innerHTML = DW.map(([a, b], i) => `<div class="dfr" id="dw${i}" style="top:${84 + i * 116}px"><div class="t">${a}</div><div class="d">${b}</div></div>`).join('');
const tHyD = wt('D3', 'thin'), tMyc = wt('D3', 'mycelium'), tBrk = wt('D4', 'break'), tSoak = wt('D4', 'soak');

/* ---------- Z: zoom ladder ---------- */
const ZN = ['BREAD', 'MYCELIUM', 'SPORANGIUM', 'SPORES'], ZS = ['x1', 'x10', 'x100', 'x400'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Bread', 'A fuzzy patch with black dots.', 'The mould is a fungus feeding on dead food.'],
  ['RUNG 2 OF 4', 'Mycelium', 'A net of hyphae across the bread.', 'Rhizoids dig in and absorb the food.'],
  ['RUNG 3 OF 4', 'Sporangium', 'A bag full of spores on an upright hypha.', 'Each black dot is one sporangium.'],
  ['RUNG 4 OF 4', 'Spores', 'Tiny cells that float in the air.', 'One spore can start a new mould on the next slice.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the spores flew across!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[600, 230, 70], [610, 150, 40], [520, 200, 70], null];
const LAB = [];
// level 0: a bread slice seen from the top, with a mould patch
{ const g = ZG[0];
  mk(g, 'path', { d: 'M300,450 L300,190 C250,180 236,110 300,84 C360,60 440,70 528,70 C616,70 700,62 760,84 C824,110 810,180 760,190 L760,450 Z', fill: BREAD, stroke: CRUST, 'stroke-width': 9, 'stroke-linejoin': 'round' });
  const r = M.rng(3); for (let k = 0; k < 26; k++) mk(g, 'ellipse', { cx: 330 + r() * 400, cy: 120 + r() * 310, rx: 7, ry: 4, fill: '#D6AF6E' });
  mk(g, 'path', { d: 'M520,200 C540,160 610,150 650,180 C700,200 704,250 680,280 C650,320 580,316 548,292 C510,266 500,232 520,200 Z', fill: '#B9C3A6', stroke: '#6E7A5C', 'stroke-width': 3, opacity: 0.95 });
  mk(g, 'path', { d: 'M560,214 C580,196 620,196 640,216 C656,236 640,266 610,270 C580,272 552,252 560,214 Z', fill: '#8E9A7C' });
  const r2 = M.rng(9); for (let k = 0; k < 22; k++) mk(g, 'circle', { cx: 540 + r2() * 140, cy: 180 + r2() * 110, r: 3 + r2() * 3, fill: SPO });
  LAB[0] = [[360, 380, 160, 420, 'Bread slice', 'end'], [680, 270, 840, 330, 'Mould patch', 'start'], [600, 196, 840, 150, 'Black dots', 'start']];
}
// level 1: side view - hyphae over the bread, rhizoids into it, upright hyphae with sporangia
{ const g = ZG[1];
  mk(g, 'rect', { x: -20, y: 380, width: 1100, height: 180, fill: BREAD, stroke: CRUST, 'stroke-width': 4 });
  const L1 = [];
  L1.push(tube(g, 'M60,382 C140,300 240,300 320,382', 6)); L1.push(tube(g, 'M320,382 C410,300 520,300 610,382', 6)); L1.push(tube(g, 'M610,382 C700,300 800,300 900,382', 6));
  [[60, 382], [320, 382], [610, 382], [900, 382]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y} l-14,34 l-12,16 M${x},${y} l4,40 M${x},${y} l18,32 l12,10`, stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' }));
  [[320, 382, 150], [610, 382, 190], [900, 382, 160]].forEach(([x, y, h], i) => { tube(g, `M${x},${y} L${x},${y - h}`, 6); mk(g, 'circle', { cx: x, cy: y - h - 22, r: 26, fill: SPO, stroke: BR, 'stroke-width': 3 }); });
  [[330, 382, 120], [600, 382, 110]].forEach(([x, y, h]) => { tube(g, `M${x},${y} C${x + 30},${y - 50} ${x + 40},${y - 80} ${x + 50},${y - h}`, 5); mk(g, 'circle', { cx: x + 50, cy: y - h - 18, r: 20, fill: SPO, stroke: BR, 'stroke-width': 3 }); });
  LAB[1] = [[460, 322, 400, 90, 'Hyphae', 'end'], [606, 414, 760, 470, 'Rhizoids (dig into the bread)', 'start'], [320, 300, 90, 140, 'Upright hyphae, black dots', 'start']];
}
// level 2: one sporangium on its upright hypha
{ const g = ZG[2];
  tube(g, 'M520,526 L520,330', 16);
  mk(g, 'circle', { cx: 520, cy: 210, r: 130, fill: '#5A524B', stroke: BR, 'stroke-width': 5 });
  mk(g, 'path', { d: 'M470,330 C470,280 480,250 520,250 C560,250 570,280 570,330 Z', fill: HY, stroke: BR, 'stroke-width': 3 });
  const r = M.rng(4); for (let k = 0; k < 80; k++) { const a = r() * Math.PI * 2, d = 40 + r() * 80, x = 520 + d * Math.cos(a), y = 200 + d * Math.sin(a) * 0.95; if (y > 260 && Math.abs(x - 520) < 60) continue; mk(g, 'circle', { cx: x, cy: y, r: 6, fill: '#CFC6B8', stroke: '#2E2A24', 'stroke-width': 1.5 }); }
  LAB[2] = [[640, 160, 760, 110, 'Sporangium (a bag of spores)', 'start'], [450, 150, 300, 90, 'Spores', 'end'], [520, 450, 640, 470, 'Upright hypha', 'start']];
}
// level 3: the sporangium bursts, spores drift to the next slice (looping)
const drift = [];
{ const g = ZG[3];
  mk(g, 'path', { d: 'M860,526 L860,300 C860,270 900,260 940,262 L1060,262 L1060,526 Z', fill: BREAD, stroke: CRUST, 'stroke-width': 6 });
  tube(g, 'M220,526 L220,360', 14);
  mk(g, 'path', { d: 'M110,250 C100,170 160,110 220,110 C280,110 330,150 340,200', fill: 'none', stroke: BR, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M110,270 C120,320 160,350 220,350 C270,350 316,320 330,290', fill: 'none', stroke: BR, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M176,360 C176,316 190,290 220,290 C250,290 264,316 264,360 Z', fill: HY, stroke: BR, 'stroke-width': 3 });
  const r = M.rng(8); for (let k = 0; k < 34; k++) drift.push({ e: mk(g, 'circle', { r: 7, fill: '#CFC6B8', stroke: BR, 'stroke-width': 1.6 }), ph: r(), y0: 150 + r() * 180, a: 20 + r() * 40, f: 0.6 + r() * 0.8 });
  LAB[3] = [[330, 290, 380, 420, 'Burst sporangium', 'start'], [560, 210, 560, 80, 'Spores in the air', 'middle'], [960, 330, 920, 450, 'Next slice', 'end']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => {
  const g = ZG[lv], d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : an === 'end' ? -12 : 0), y: ly + (an === 'middle' ? -8 : 9), 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'bread') - 0.2, wt('Z2', 'patch'), wt('Z2', 'black')],
  [wt('Z3', 'Hyphae'), wt('Z3', 'rhizoids'), wt('Z3', 'absorb')],
  [wt('Z4', 'sporangium'), wt('Z4', 'spores'), wt('Z4', 'upright')],
  [wt('Z5', 'bursts'), wt('Z5', 'float'), wt('Z5', 'next')]];
const tRh = wt('Z5', 'Rhizopus'), tBurst = wt('Z5', 'bursts');

/* ---------- P: three modes of nutrition ---------- */
const P3 = [['MODE 1', 'Saprophyte', 'Feeds on dead things: bread, fallen leaves, old wood.', [['Rhizopus', 'bread mould']], 'P2'],
  ['MODE 2', 'Parasite', 'Feeds on a living host and harms it.', [['Albugo', 'mustard'], ['Puccinia', 'wheat rust']], 'P3'],
  ['MODE 3', 'Symbiont', 'Lives with a partner, and both gain.', [['Lichen', 'algae'], ['Mycorrhiza', 'roots']], 'P4']];
$('#p3s').innerHTML = P3.map(([m, n, d, ex], i) => `<div class="card c3" id="pc${i}" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:30px">${m}</div><svg id="ps${i}" width="512" height="340" style="position:absolute;left:0;top:30px"></svg>
  <div class="nm3">${n}</div><div class="ds3">${d}</div>${ex.map(([a, b], k) => `<div class="ex3" id="pe${i}${k}" style="top:500px;left:32px">${a}<span style="font:500 15px 'IBM Plex Mono';font-style:normal;color:var(--mute);margin-left:8px">${b.toUpperCase()}</span></div>`).join('')}</div>`).join('');
// per card drawings
const pArr = [];
{ // saprophyte: dead bread + mould, food arrow up into the fungus
  const s = $('#ps0'); mk(s, 'rect', { x: 70, y: 210, width: 372, height: 90, rx: 18, fill: BREAD, stroke: CRUST, 'stroke-width': 4 });
  tube(s, 'M110,208 C180,170 260,190 330,176 C380,166 410,184 430,200', 6); tube(s, 'M250,184 L250,110', 6); mk(s, 'circle', { cx: 250, cy: 92, r: 20, fill: SPO, stroke: BR, 'stroke-width': 3 });
  tube(s, 'M350,176 L360,124', 5); mk(s, 'circle', { cx: 362, cy: 108, r: 16, fill: SPO, stroke: BR, 'stroke-width': 3 });
  txt(s, 256, 330, 'DEAD', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 });
  pArr.push([0, 'M160,262 L160,214', s]); pArr.push([0, 'M300,262 L300,206', s]);
}
{ // parasite: living mustard leaf with white spots; food leaves the leaf, the leaf pales
  const s = $('#ps1'); s._leaf = mk(s, 'path', { d: 'M80,250 C120,110 300,60 440,90 C430,230 260,300 80,250 Z', fill: LEAF, stroke: BR, 'stroke-width': 4 });
  mk(s, 'path', { d: 'M80,250 C200,200 330,140 440,90', stroke: '#D8ECD2', 'stroke-width': 4, fill: 'none' });
  [[200, 170], [270, 200], [320, 140], [170, 220], [380, 130]].forEach(([x, y]) => mk(s, 'ellipse', { cx: x, cy: y, rx: 16, ry: 11, fill: '#FFFFFF', stroke: '#A8A29A', 'stroke-width': 2 }));
  txt(s, 256, 330, 'ALIVE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 });
  s._hx = mk(s, 'g', {}); mk(s._hx, 'circle', { cx: 440, cy: 250, r: 24, fill: '#FBE6E6', stroke: RED, 'stroke-width': 3 }); mk(s._hx, 'path', { d: 'M428,262 L452,238 M428,238 L452,262', stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' });
  pArr.push([1, 'M240,190 L240,120', s]);
}
{ // symbiont: an algal cell wrapped by hyphae, food one way, water the other
  const s = $('#ps2'); mk(s, 'circle', { cx: 256, cy: 180, r: 70, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 4 }); mk(s, 'circle', { cx: 240, cy: 170, r: 20, fill: CHL });
  tube(s, 'M120,100 C200,90 220,110 200,140 C180,170 150,200 170,250 C190,290 290,300 340,260', 6); tube(s, 'M390,110 C330,100 320,140 330,180 C340,220 380,250 400,290', 6);
  txt(s, 256, 330, 'BOTH GAIN', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 });
  pArr.push([2, 'M300,140 L380,90', s]); pArr.push([2, 'M400,250 L320,210', s]);
}
const pA = pArr.map(([i, d, s], k) => { const col = i === 2 && k === pArr.length - 1 ? WAT : GOLD; const a = PUC.arrow(s, col, 5, 16); const m = d.match(/M([\d.]+),([\d.]+) L([\d.]+),([\d.]+)/).slice(1).map(Number); return { i, a, m }; });
const tPc = [T0('P2'), T0('P3'), T0('P4')];
const th1 = PUC.think($('#th1'), { q: 'A fungus grows on a living wheat leaf, and the leaf turns rusty and weak. Saprophyte or parasite?', opts: ['Saprophyte', 'Parasite'], right: 1, why: 'Parasite. The host is alive, and it is harmed. A saprophyte feeds only on dead things.' });

/* ---------- R: three routes ---------- */
const RN = [['VEGETATIVE', 'R2'], ['ASEXUAL SPORES', 'R3'], ['SEXUAL SPORES', 'R4']];
$('#rch').innerHTML = RN.map(([n], i) => `<span class="zc" id="rc${i}"><b class="mono" style="font-weight:700">${i + 1}</b>${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const RB = [['ROUTE 1 · VEGETATIVE', 'Fragmentation, fission, budding'], ['ROUTE 2 · ASEXUAL SPORES', 'Conidia, sporangiospores, zoospores'], ['ROUTE 3 · SEXUAL SPORES', 'Oospores, ascospores, basidiospores']];
$('#rbs').innerHTML = RB.map(([a, b], i) => `<div class="rb3" id="rb${i}" style="top:${84 + i * 148}px"><div class="t">${a}</div><div class="ns">${b}</div></div>`).join('');
const tRt = [T0('R2'), T0('R3'), T0('R4')];
const rS = $('#rS'), RG = [0, 1, 2].map(() => mk(rS, 'g', {}));
const rLabs = []; const rLab = (g, px, py, lx, ly, s, an, w) => { const q = mk(g, 'g', {}); mk(q, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5 }); mk(q, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }); const t = mk(q, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); t.textContent = s; rLabs.push([q, w]); return q; };
// route 1: a hypha breaks, the piece grows; a yeast cell buds
const r1 = {}; { const g = RG[0];
  r1.a = tube(g, 'M80,260 L330,260', 9); r1.pg = mk(g, 'g', {}); r1.b = tube(r1.pg, 'M0,0 L170,0', 9); r1.br = [tube(r1.pg, 'M60,0 L100,-60', 7), tube(r1.pg, 'M130,0 L170,60', 7)];
  r1.y = mk(g, 'g', {}); mk(r1.y, 'ellipse', { cx: 800, cy: 260, rx: 70, ry: 56, fill: '#F6E7C4', stroke: BR, 'stroke-width': 4 }); mk(r1.y, 'circle', { cx: 790, cy: 262, r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 });
  r1.bud = mk(r1.y, 'circle', { cx: 880, cy: 214, r: 0, fill: '#F6E7C4', stroke: BR, 'stroke-width': 4 });
  rLab(g, 200, 260, 200, 400, 'Fragmentation', 'start', ['R2', 'fragmentation']); rLab(g, 870, 214, 900, 110, 'Budding (yeast)', 'end', ['R2', 'budding']);
}
// route 2: a sporangium (spores inside) and a conidiophore (spores outside), both releasing
const r2 = { sp: [] }; { const g = RG[1];
  tube(g, 'M260,470 L260,250', 10); mk(g, 'circle', { cx: 260, cy: 190, r: 70, fill: '#5A524B', stroke: BR, 'stroke-width': 4 });
  tube(g, 'M720,470 L720,270', 10); [[720, 248], [690, 236], [750, 236]].forEach(([x, y]) => tube(g, `M720,270 L${x},${y}`, 8));
  for (let c = 0; c < 3; c++) for (let k = 0; k < 4; k++) { const x = [720, 682, 758][c] + [0, -8, 8][c] * k, y = [222, 212, 212][c] - k * 22; mk(g, 'circle', { cx: x, cy: y, r: 10, fill: '#CFC6B8', stroke: BR, 'stroke-width': 2 }); }
  const r = M.rng(12); for (let k = 0; k < 24; k++) r2.sp.push({ e: mk(g, 'circle', { r: 7, fill: '#CFC6B8', stroke: BR, 'stroke-width': 1.6 }), x0: k % 2 ? 260 : 720, y0: k % 2 ? 160 : 140, ph: r(), dx: (r() - 0.3) * 260, dy: -40 - r() * 80 });
  rLab(g, 300, 250, 340, 420, 'Sporangiospores (inside)', 'start', ['R3', 'sporangiospores']); rLab(g, 760, 190, 800, 420, 'Conidia (outside)', 'start', ['R3', 'conidia']);
}
// route 3: two hyphae of different strains meet, a fruiting body grows
const r3 = {}; { const g = RG[2];
  r3.h1 = tube(g, 'M60,440 C160,440 260,430 380,440', 8); r3.h2 = tube(g, 'M700,440 C600,440 520,430 400,440', 8);
  r3.h1[0].setAttribute('stroke', NUC); r3.h2[0].setAttribute('stroke', NUC2);
  r3.fb = mk(g, 'g', {}); mk(r3.fb, 'path', { d: 'M360,440 L364,330 C364,320 416,320 416,330 L420,440 Z', fill: HY, stroke: BR, 'stroke-width': 4 });
  mk(r3.fb, 'path', { d: 'M270,336 C270,250 330,212 390,212 C450,212 510,250 510,336 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 9; k++) mk(r3.fb, 'line', { x1: 290 + k * 25, y1: 336, x2: 300 + k * 22, y2: 348, stroke: BR, 'stroke-width': 2.5 });
  r3.sp = []; const r = M.rng(21); for (let k = 0; k < 14; k++) r3.sp.push({ e: mk(g, 'circle', { r: 6, fill: '#CFC6B8', stroke: BR, 'stroke-width': 1.5 }), ph: r(), x0: 300 + r() * 180 });
  rLab(g, 470, 260, 700, 200, 'Fruiting body', 'start', ['R4', 'fruiting']); rLab(g, 120, 440, 100, 490, 'Two strains meet', 'start', ['R4', 'parents']);
}

/* ---------- S: the sexual route ---------- */
const STEPS = [['Two hyphae meet', 'compatible mating types; each haploid (n)'], ['Plasmogamy', 'protoplasm fuses: two nuclei, n + n'], ['Dikaryon', 'n + n lasts a while (asco-, basidiomycetes)'],
  ['Karyogamy', 'the two nuclei fuse: diploid (2n)'], ['Meiosis', 'chromosomes halved: haploid spores (n)']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['S2', 'S3', 'S4', 'S5', 'S6'].map(id => T0(id) + 0.45);
const PLO = ['n', 'n + n', 'n + n', '2n', 'n'];
const sS = $('#srS'), SG = mk(sS, 'g', {});
// two hyphal cells approach (step 1), fuse (2), the fused cell divides as pairs (3), nuclei fuse (4), meiosis gives 4 spores (5)
const cL = mk(SG, 'rect', { y: 230, width: 220, height: 96, rx: 48, fill: HY, stroke: BR, 'stroke-width': 4.5 }), cR = mk(SG, 'rect', { y: 230, width: 220, height: 96, rx: 48, fill: HY, stroke: BR, 'stroke-width': 4.5 });
const nA = mk(SG, 'circle', { r: 20, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3.5 }), nB = mk(SG, 'circle', { r: 20, fill: '#F2C9D8', stroke: NUC2, 'stroke-width': 3.5 });
const dk = [0, 1].map(() => ({ c: mk(SG, 'rect', { y: 230, width: 200, height: 96, rx: 40, fill: HY, stroke: BR, 'stroke-width': 4 }), a: mk(SG, 'circle', { r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }), b: mk(SG, 'circle', { r: 16, fill: '#F2C9D8', stroke: NUC2, 'stroke-width': 3 }) }));
const n2 = mk(SG, 'circle', { cx: 392, cy: 278, r: 30, fill: '#E2C6E0', stroke: '#8E4C8A', 'stroke-width': 4 });
const sp4 = [0, 1, 2, 3].map(k => ({ c: mk(SG, 'circle', { r: 30, fill: '#FFFFFF', stroke: BR, 'stroke-width': 3.5 }), n: mk(SG, 'circle', { r: 11, fill: k % 2 ? '#F2C9D8' : '#D7C3E6', stroke: k % 2 ? NUC2 : NUC, 'stroke-width': 3 }) }));
const sCap = txt(sS, 392, 470, '', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 600, fill: C.ink });
const sKey = mk(sS, 'g', {}); mk(sKey, 'circle', { cx: 52, cy: 530, r: 10, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); txt(sKey, 70, 536, 'STRAIN 1', { 'font-size': 15, 'letter-spacing': 1.2, fill: NUC, 'font-weight': 600 });
mk(sKey, 'circle', { cx: 200, cy: 530, r: 10, fill: '#F2C9D8', stroke: NUC2, 'stroke-width': 3 }); txt(sKey, 218, 536, 'STRAIN 2', { 'font-size': 15, 'letter-spacing': 1.2, fill: NUC2, 'font-weight': 600 });
const CAPS = ['Two haploid hyphae meet', 'Plasmogamy: one cell, two nuclei', 'Dikaryon: every cell n + n', 'Karyogamy: one diploid nucleus', 'Meiosis: four haploid spores'];
const avS = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 470 - 80, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two nuclei sharing one cell!' });

/* ---------- C: asexual vs sexual ---------- */
const CA = [['PARENTS', 'One'], ['FUSION', 'None'], ['EXAMPLE', 'Sporangiospores, bread mould']], CB = [['PARENTS', 'Two'], ['MADE AFTER', 'Plasmogamy › karyogamy › meiosis'], ['EXAMPLE', 'Basidiospores, mushroom']];
$('#cak').innerHTML = CA.map(([k, v], i) => `<div class="kv" id="ka${i}" style="top:${330 + i * 76}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
$('#cbk').innerHTML = CB.map(([k, v], i) => `<div class="kv" id="kb${i}" style="top:${330 + i * 76}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
const caS = $('#caS'), cbS = $('#cbS'), caSp = [], cbSp = [];
tube(caS, 'M200,300 L200,170', 9); mk(caS, 'circle', { cx: 200, cy: 130, r: 46, fill: '#5A524B', stroke: BR, 'stroke-width': 4 });
for (let k = 0; k < 8; k++) caSp.push(mk(caS, 'circle', { cx: 330 + (k % 4) * 90, cy: 130 + Math.floor(k / 4) * 80, r: 22, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }));
txt(caS, 200, 222 + 92, '', {});
tube(cbS, 'M120,300 L250,250', 9); tube(cbS, 'M380,300 L270,250', 9); cbS.firstChild.setAttribute('stroke', NUC); cbS.children[2].setAttribute('stroke', NUC2);
mk(cbS, 'circle', { cx: 260, cy: 200, r: 44, fill: '#E2C6E0', stroke: '#8E4C8A', 'stroke-width': 4 });
for (let k = 0; k < 8; k++) cbSp.push(mk(cbS, 'circle', { cx: 400 + (k % 4) * 90, cy: 130 + Math.floor(k / 4) * 80, r: 22, fill: ['#D7C3E6', '#F2C9D8', '#E2C6E0', '#F2C9D8', '#E2C6E0', '#D7C3E6', '#F2C9D8', '#D7C3E6'][k], stroke: [NUC, NUC2, '#8E4C8A', NUC2, '#8E4C8A', NUC, NUC2, NUC][k], 'stroke-width': 3 }));
const caT = txt(caS, 480, 268, 'ALL ALIKE: COPIES', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
const cbT = txt(cbS, 550, 268, 'MIXED FEATURES', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
const th2 = PUC.think($('#th2'), { q: 'A spore is made right after meiosis in a mushroom. Asexual or sexual?', opts: ['Asexual', 'Sexual'], right: 1, why: 'Sexual. Meiosis comes only at the end of the sexual route, after two nuclei have fused.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">1 <b>PLASMOGAMY</b> &nbsp;›&nbsp; 2 <b>KARYOGAMY</b> &nbsp;›&nbsp; 3 <b>MEIOSIS</b></span>';

/* ---------- W: worked example, Agaricus ---------- */
const wS = $('#wS'), WG = mk(wS, 'g', {});
// mushroom (left)
mk(WG, 'path', { d: 'M234,440 L240,280 C240,266 300,266 300,280 L306,440 Z', fill: HY, stroke: BR, 'stroke-width': 4 });
mk(WG, 'path', { d: 'M90,282 C90,170 180,110 270,110 C360,110 450,170 450,282 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 4.5 });
for (let k = 0; k < 15; k++) mk(WG, 'line', { x1: 104 + k * 22.5, y1: 282, x2: 110 + k * 21.5, y2: 300, stroke: BR, 'stroke-width': 2.5 });
mk(WG, 'path', { d: 'M100,300 C150,310 390,310 440,300', stroke: BR, 'stroke-width': 3, fill: 'none' });
const wMyc = tube(WG, 'M60,450 C140,440 200,446 240,440 M306,440 C360,446 420,436 480,448', 6);
// zoom circle on a gill (right)
const wZ = mk(wS, 'g', {}); const wRing = mk(wS, 'circle', { cx: 180, cy: 300, r: 36, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const wLink = mk(wS, 'path', { d: 'M214,292 L640,180', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 8', fill: 'none' });
mk(wZ, 'circle', { cx: 860, cy: 250, r: 200, fill: '#FBF6EC', stroke: C.ac, 'stroke-width': 4 });
const wB = mk(wZ, 'path', { d: 'M820,440 L820,300 C820,250 900,250 900,300 L900,440', fill: HY, stroke: BR, 'stroke-width': 4.5 });
const wBn = mk(wZ, 'circle', { cx: 860, cy: 330, r: 0, fill: '#E2C6E0', stroke: '#8E4C8A', 'stroke-width': 3.5 });
const wPair = [mk(wZ, 'circle', { cx: 846, cy: 380, r: 12, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }), mk(wZ, 'circle', { cx: 874, cy: 380, r: 12, fill: '#F2C9D8', stroke: NUC2, 'stroke-width': 3 })];
const wSt = [[828, 258, 790, 150], [848, 252, 838, 128], [872, 252, 882, 128], [892, 258, 930, 150]];
const wBs = wSt.map(([x1, y1, x2, y2], k) => ({ l: mk(wZ, 'path', { d: `M${x1},${y1} L${x2},${y2 + 22}`, stroke: BR, 'stroke-width': 3.5 }), s: mk(wZ, 'ellipse', { cx: x2, cy: y2, rx: 16, ry: 22, fill: '#FFFFFF', stroke: BR, 'stroke-width': 3 }), n: mk(wZ, 'circle', { cx: x2, cy: y2, r: 7, fill: k % 2 ? '#F2C9D8' : '#D7C3E6', stroke: k % 2 ? NUC2 : NUC, 'stroke-width': 2.5 }), m: mk(wZ, 'circle', { r: 7, fill: k % 2 ? '#F2C9D8' : '#D7C3E6', stroke: k % 2 ? NUC2 : NUC, 'stroke-width': 2.5 }) }));
const wLabs = [[90, 230, 60, 76, 'Cap', 'start', 'W1'], [300, 296, 470, 336, 'Gills', 'start', 'W4'], [270, 380, 340, 400, 'Stalk', 'start', 'W1'], [900, 400, 1160, 420, 'Basidium', 'start', 'W4'], [930, 130, 1160, 110, 'Basidiospores (n)', 'start', 'W5'], [480, 448, 520, 470, 'Dikaryotic mycelium (n + n)', 'start', 'W3']];
const wLB = wLabs.map(([px, py, lx, ly, s, an]) => { const ln = mk(wS, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(wS, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }); const tx = mk(wS, 'text', { x: lx + 12, y: ly + 9, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const tWl = [wt('W1', 'mushroom'), wt('W4', 'gills'), wt('W1', 'Agaricus'), wt('W4', 'basidia'), wt('W5', 'basidiospores'), wt('W3', 'dikaryotic')];
const WF = [['Two cells fuse', wt('W2', 'Plasmogamy')], ['n + n mycelium', wt('W3', 'two')], ['Karyogamy · 2n', wt('W4', 'karyogamy')], ['Meiosis', wt('W5', 'meiosis')], ['4 basidiospores · n', wt('W5', 'four', 1)]];
$('#wfl').innerHTML = WF.map(([s], i) => `<span id="wf${i}"><b class="mono" style="color:var(--ac)">${i + 1}</b>${s}</span>${i < 4 ? `<em id="wa${i}">→</em>` : ''}`).join('');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'When two fungal cells fuse, their nuclei fuse at once', right: 'Plasmogamy first; a dikaryon (n + n) waits; karyogamy later' });
const tS = $('#tS');
const tc1 = mk(tS, 'rect', { x: 40, y: 96, width: 150, height: 84, rx: 40, fill: HY, stroke: BR, 'stroke-width': 4 }); const tn = [mk(tS, 'circle', { cx: 96, cy: 138, r: 14, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }), mk(tS, 'circle', { cx: 134, cy: 138, r: 14, fill: '#F2C9D8', stroke: NUC2, 'stroke-width': 3 })];
const tAr = mk(tS, 'path', { d: 'M210,138 L270,138 M258,126 L272,138 L258,150', stroke: C.mute, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const tc2 = mk(tS, 'rect', { x: 290, y: 96, width: 150, height: 84, rx: 40, fill: HY, stroke: BR, 'stroke-width': 4 }); const tn2 = mk(tS, 'circle', { cx: 365, cy: 138, r: 20, fill: '#E2C6E0', stroke: '#8E4C8A', 'stroke-width': 3.5 });
const tLb = [txt(tS, 115, 214, 'n + n · DIKARYON', { 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, 'letter-spacing': 1.2, 'font-weight': 600 }), txt(tS, 365, 214, '2n · LATER', { 'text-anchor': 'middle', 'font-size': 15, fill: '#8E4C8A', 'letter-spacing': 1.2, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Statement questions: which line about plasmogamy is correct' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Arrange the sexual cycle of a mushroom in the correct order.<div class="sl"><b>I</b>Karyogamy in the basidium</div><div class="sl"><b>II</b>Two somatic cells of different strains fuse</div><div class="sl"><b>III</b>Four basidiospores are formed</div><div class="sl"><b>IV</b>Meiosis</div><div class="sl"><b>V</b>A dikaryotic mycelium grows</div>',
  opts: ['II, V, I, IV, III', 'II, I, V, IV, III', 'V, II, I, III, IV', 'II, V, IV, I, III'], right: 0, optW: 474, optY: 420, optH: 76, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], ['<b>II</b>: plasmogamy, cells fuse'], ['<b>V</b>: dikaryon, n + n'], ['<b>I › IV</b>: karyogamy, meiosis'], ['<b>III</b>: four basidiospores']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'plasmogamy'), wt('A2', 'dikaryotic'), wt('A3', 'karyogamy'), wt('A3', 'four')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · nutrition and reproduction in fungi', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Saprophyte</b>: dead food · <i>Rhizopus</i>', '<b>Parasite</b>: living host, harmed · <i>Albugo</i>, <i>Puccinia</i>', '<b>Symbiont</b>: both gain · lichen, mycorrhiza',
    '<b>Asexual spores</b>: conidia, sporangiospores, zoospores', '<b>Sexual</b>: plasmogamy › karyogamy › meiosis'] });
const YQ = ['How is a saprophyte different from a parasite?', 'What is a dikaryon, and in which fungi is it found?', 'Why must karyogamy come before meiosis?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 17', topic: 'One patch, two living things? Lichens and Symbiotic Relationships', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S5') - 0.3, 1.05, 960, 600], [T0('C1') - 0.6, 1, 960, 540]]);

let geo = null;
function measure() { geo = 1; P3.forEach((p, i) => { let x = 32; p[3].forEach((_, k) => { const e = $('#pe' + i + k); e.style.left = x + 'px'; x += e.offsetWidth + 12; }); }); }
/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, tFeed - 0.2 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'fungi') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'jumped') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    M.vis($('#twoQ .lbl'), t, tH4, 1e9, { dy: 8 });
    M.vis($('#tq0'), t, tH4 + 0.2, 1e9, { dx: -20, dy: 0 }); M.vis($('#tq1'), t, wt('H4', 'makes') - 0.3, 1e9, { dx: -20, dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    dHy.forEach((tb, i) => drawT(tb, t, tHyD - 0.3 + i * 0.25, 0.8)); dRz.forEach((p, i) => M.draw(p, t, tMyc + i * 0.15, 0.5));
    M.vis(dBr, t, tD1 + 0.5, 1e9, { dy: 6 }); dLB.forEach((l, i) => { const t0 = [tHyD + 0.4, tMyc][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
    // loop: enzymes go down from the hyphae into the bread, dissolved food rises back up into the hyphae
    ENZD.forEach((d, k) => { const ue = (t - tBrk) * 0.45 + d.ph, uf = (t - tSoak) * 0.45 + d.ph;
      const ee = t > tBrk ? ue % 1 : -1, ff = t > tSoak ? uf % 1 : -1;
      M.hide(d.e, ee < 0); if (ee >= 0) { attr(d.e, 'cx', d.x.toFixed(1)); attr(d.e, 'cy', (330 + ee * 120).toFixed(1)); d.e.style.opacity = (1 - ee).toFixed(2); }
      M.hide(d.f, ff < 0); if (ff >= 0) { attr(d.f, 'cx', (d.x + 18).toFixed(1)); attr(d.f, 'cy', (450 - ff * 120).toFixed(1)); d.f.style.opacity = Math.min(1, (1 - ff) * 2).toFixed(2); } });
    M.vis(dNo, t, wt('D2', 'chlorophyll') - 0.2, tHyD - 0.6, { ...POP, sc: 0.5, outDur: 0.3, ody: -10 });
    { const tt = wt('D2', 'outside'), u = M.io((t - tt) / 0.7); if (u <= 0 || t > tHyD - 0.6) dIn.set(0, 0, 0, 0); else dIn.set(620, 120, 620 - 120 * u, 120 + 200 * u); }
    M.vis(dKey[0], t, tBrk - 0.1, 1e9, { dy: 6 }); M.vis(dKey[1], t, tSoak - 0.1, 1e9, { dy: 6 });
    DW.forEach((w, i) => { const el = $('#dw' + i); M.vis(el, t, w[2] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - w[2]) / 0.25) * (1 - M.io((t - (DW[i + 1] ? DW[i + 1][2] : 1e9)) / 0.3))); });
  }

  /* Z: zoom ladder */
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
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    // looping spore drift from the burst sporangium to the next slice
    drift.forEach(d => { const u = t < tBurst ? -1 : ((t - tBurst) * 0.32 * d.f + d.ph) % 1; M.hide(d.e, u < 0);
      if (u >= 0) { attr(d.e, 'cx', (220 + u * 720).toFixed(1)); attr(d.e, 'cy', (d.y0 + Math.sin(u * 6 + d.ph * 6) * d.a + u * 60).toFixed(1)); d.e.style.opacity = Math.min(1, u * 8, (1 - u) * 6).toFixed(2); } });
    M.vis($('#zRh'), t, tRh - 0.15, 1e9, POP);
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'next') + 0.4, out);
  }

  /* P: modes of nutrition + think */
  const pOn = t >= tP1 - 0.1 && t < tR1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P5');
    P3.forEach((p, i) => { const el = $('#pc' + i); M.vis(el, t, i ? tPc[i] - 0.2 : tP1 + 0.1, out, { dy: 36, ...o });
      M.vis(el.querySelector('.nm3'), t, tPc[i] - 0.1, 1e9, { dy: 10 }); M.vis(el.querySelector('.ds3'), t, tPc[i] + 0.3, 1e9, { dy: 10 });
      p[3].forEach((_, k) => M.vis($('#pe' + i + k), t, wt(p[4], p[3][k][0]) - 0.15, 1e9, POP));
      el.style.borderTopColor = mix(C.dim, C.ac, M.io((t - tPc[i]) / 0.3)); });
    pA.forEach(({ i, a, m }, k) => { const tt = tPc[i] + 0.8; const u = ((t - tt) * 0.7 + k * 0.3) % 1;
      if (t < tt) { a.set(0, 0, 0, 0); return; } const s = M.io(Math.min(1, u * 2.2)); a.set(m[0], m[1], m[0] + (m[2] - m[0]) * s, m[1] + (m[3] - m[1]) * s); a.g.style.opacity = (1 - M.clamp((u - 0.75) / 0.25)).toFixed(2); });
    { const s = $('#ps1'), h = M.io((t - tPc[1] - 1.2) / 2); s._leaf.setAttribute('fill', mix(LEAF, '#D9C77A', h)); M.vis(s._hx, t, wt('P3', 'harm') - 0.1, 1e9, POP); }
    M.vis($('#th1'), t, T0('P5') + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: T0('P5'), tOpts: wt('P5', 'Saprophyte') - 0.1, tCount: T1('P5') + 0.05, dur: 3, tAns: T0('P6') - 0.02, tWhy: wt('P6', 'host') });
  }

  /* R: three routes */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#rch'), t, tR1 + 0.1, out, { dy: 12, ...o }); M.vis($('#rA'), t, tR1 + 0.2, out, { dx: -60, dy: 0, ...o }); M.vis($('#rL'), t, tR1 + 0.35, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tRt.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    RN.forEach((_, i) => { const el = $('#rc' + i), on = i === cur ? 1 : 0, done = i < cur;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      const b = $('#rb' + i); M.vis(b, t, tRt[i] - 0.1, 1e9, { dx: -16, dy: 0 }); b.style.background = mix(C.soft, C.ac2, i === cur ? 1 : 0); });
    RG.forEach((g, i) => { const e = M.io((t - tRt[i] - 0.1) / 0.4), x = i < 2 ? M.io((t - tRt[i + 1] + 0.2) / 0.35) : 0; M.hide(g, e <= 0 || x >= 1); g.style.opacity = Math.min(e, 1 - x).toFixed(3); });
    rLabs.forEach(([q, w]) => M.vis(q, t, wt(w[0], w[1]) + 0.2, 1e9, { dy: 0, fade: 0.25 }));
    // route 1 loop: the piece breaks off, drifts, grows two branches
    { const u = Math.max(0, (t - tRt[0] - 0.4) % 3.2) / 3.2, br = M.io(u / 0.25), dr = M.io((u - 0.2) / 0.3), gr = M.io((u - 0.5) / 0.35);
      drawT(r1.a, t, tRt[0], 0.5); attr(r1.pg, 'transform', `translate(${340 + 20 * br + 120 * dr} 260)`);
      r1.br.forEach(tb => tb.forEach(p => M.drawU(p, gr)));
      const bu = Math.max(0, (t - tRt[0] - 0.4) % 2.6) / 2.6; attr(r1.bud, 'r', (30 * M.io(bu / 0.7)).toFixed(1)); }
    // route 2 loop: spores leave both structures
    r2.sp.forEach(s => { const u = t < tRt[1] + 0.4 ? -1 : ((t - tRt[1] - 0.4) * 0.35 + s.ph) % 1; M.hide(s.e, u < 0);
      if (u >= 0) { attr(s.e, 'cx', (s.x0 + s.dx * u).toFixed(1)); attr(s.e, 'cy', (s.y0 + s.dy * u + 30 * Math.sin(u * 7)).toFixed(1)); s.e.style.opacity = Math.min(1, u * 6, (1 - u) * 4).toFixed(2); } });
    // route 3: two strains meet, then the fruiting body rises and sheds spores
    { const t3 = tRt[2]; drawT(r3.h1, t, t3, 0.9); drawT(r3.h2, t, t3 + 0.2, 0.9); const fb = M.io((t - t3 - 1.1) / 0.9);
      attr(r3.fb, 'transform', `translate(390 440) scale(${(0.05 + 0.95 * fb).toFixed(3)}) translate(-390 -440)`); M.hide(r3.fb, fb <= 0);
      r3.sp.forEach(s => { const u = fb < 1 ? -1 : ((t - t3 - 2.0) * 0.4 + s.ph) % 1; M.hide(s.e, u < 0); if (u >= 0) { attr(s.e, 'cx', (s.x0 + u * 200).toFixed(1)); attr(s.e, 'cy', (350 + u * 60).toFixed(1)); s.e.style.opacity = Math.min(1, u * 6, (1 - u) * 4).toFixed(2); } }); }
  }

  /* S: sexual route step by step */
  const sOn = t >= tS1 - 0.1 && t < tC1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('C1');
    M.vis($('#sl'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#sr'), t, tS1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let st = 0; tSt.forEach((tt, i) => { if (t >= tt - 0.3) st = i; });
    M.setT($('#ploT'), PLO[st]); M.vis($('#plo'), t, tSt[0] - 0.2, 1e9, POP);
    M.setT(sCap, CAPS[st]); sCap.style.opacity = M.clamp((t - tSt[0] + 0.2) / 0.3).toFixed(2);
    M.vis(sKey, t, tSt[0], 1e9, { dy: 6 });
    // step 1-2: approach and fuse
    const ap = M.io((t - tSt[0]) / 1.4), fu = M.io((t - tSt[1]) / 0.9), dv = M.io((t - tSt[2]) / 1.1), ka = M.io((t - tSt[3]) / 1.0), me = M.io((t - tSt[4]) / 1.2);
    const lx = 40 + 132 * ap + 50 * fu, rx = 524 - 132 * ap - 50 * fu;
    attr(cL, 'x', lx.toFixed(1)); attr(cR, 'x', rx.toFixed(1));
    attr(cL, 'width', (220 + 0 * fu).toFixed(1));
    const singleW = 220 + (rx - lx);
    M.hide(cR, fu > 0.6); if (fu > 0.6) { attr(cL, 'width', Math.max(220, singleW).toFixed(1)); }
    const mid = 392;
    attr(nA, 'cx', (lx + 110 + (mid - 26 - lx - 110) * fu).toFixed(1)); attr(nA, 'cy', 278); attr(nB, 'cx', (rx + 110 + (mid + 26 - rx - 110) * fu).toFixed(1)); attr(nB, 'cy', 278);
    // step 3: the dikaryotic cell copies itself as pairs (two more cells slide out)
    dk.forEach((d, k) => { const sx = k ? 1 : -1, x = mid - 100 + sx * 230 * dv; M.hide(d.c, dv <= 0 || me > 0.5); M.hide(d.a, dv <= 0 || me > 0.5); M.hide(d.b, dv <= 0 || me > 0.5);
      attr(d.c, 'x', x.toFixed(1)); d.c.style.opacity = dv; attr(d.a, 'cx', x + 76); attr(d.a, 'cy', 278); attr(d.b, 'cx', x + 124); attr(d.b, 'cy', 278); d.a.style.opacity = dv; d.b.style.opacity = dv; });
    if (dv > 0) { attr(cL, 'x', (mid - 110).toFixed(1)); attr(cL, 'width', 220); }
    // step 4: karyogamy - the pair slides together into one 2n nucleus
    attr(nA, 'cx', (mid - 26 + 26 * ka).toFixed(1)); attr(nB, 'cx', (mid + 26 - 26 * ka).toFixed(1));
    if (fu <= 0) { attr(nA, 'cx', (lx + 110).toFixed(1)); attr(nB, 'cx', (rx + 110).toFixed(1)); }
    M.hide(nA, ka >= 1 || me > 0); M.hide(nB, ka >= 1 || me > 0); nA.style.opacity = nB.style.opacity = (1 - M.clamp((ka - 0.7) / 0.3)).toFixed(2);
    M.hide(n2, ka < 0.7 || me > 0.35); attr(n2, 'r', (30 * M.io((ka - 0.7) / 0.3) * (1 - me)).toFixed(1));
    // step 5: meiosis - four haploid spores pop out, loop a gentle bob
    M.hide(cL, me > 0.4); cL.style.opacity = (1 - M.clamp((me - 0.2) / 0.2)).toFixed(2);
    sp4.forEach((s, k) => { const a = -Math.PI / 2 + k * Math.PI / 2 + Math.PI / 4, d = 120 * me, bob = me >= 1 ? 6 * Math.sin((t - tSt[4]) * 2.4 + k) : 0;
      const x = mid + d * Math.cos(a), y = 278 + d * Math.sin(a) * 0.8 + bob; M.hide(s.c, me <= 0); M.hide(s.n, me <= 0);
      attr(s.c, 'cx', x.toFixed(1)); attr(s.c, 'cy', y.toFixed(1)); attr(s.n, 'cx', x.toFixed(1)); attr(s.n, 'cy', y.toFixed(1)); attr(s.c, 'r', (30 * me).toFixed(1)); attr(s.n, 'r', (11 * me).toFixed(1)); });
    avS(t, wt('S3', 'separate') + 0.6, T0('S4') + 2);
  }

  /* C: asexual vs sexual + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#ca'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cb'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const ta = T0('C2'), tb = T0('C3');
    caSp.forEach((e, k) => M.vis(e, t, ta + 0.3 + k * 0.1, 1e9, { ...POP, sc: 0.2 })); M.vis(caT, t, ta + 1.2, 1e9, { dy: 6 });
    cbSp.forEach((e, k) => M.vis(e, t, wt('C3', 'meiosis') + k * 0.1, 1e9, { ...POP, sc: 0.2 })); M.vis(cbT, t, wt('C3', 'mix') - 0.1, 1e9, { dy: 6 });
    CA.forEach((_, i) => M.vis($('#ka' + i), t, [wt('C2', 'one'), wt('C2', 'fusion'), wt('C2', 'sporangiospores')][i] - 0.15, 1e9, { dx: -16, dy: 0 }));
    CB.forEach((_, i) => M.vis($('#kb' + i), t, [tb + 0.2, wt('C3', 'plasmogamy'), wt('C3', 'basidiospores')][i] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th2'), t, T0('C4') + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: T0('C4'), tOpts: wt('C4', 'Asexual') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Meiosis') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Plasmogamy') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'meiosis') - 0.1, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    M.vis(WG, t, tW1 + 0.4, 1e9, { dy: 20 }); drawT(wMyc, t, wt('W3', 'dikaryotic') - 0.3, 0.8);
    M.draw(wRing, t, T0('W4') - 0.1, 0.4); M.draw(wLink, t, T0('W4') + 0.2, 0.4); M.vis(wZ, t, T0('W4') + 0.4, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 });
    const ka = M.io((t - wt('W4', 'karyogamy')) / 0.8), me = M.io((t - wt('W5', 'meiosis')) / 0.8), mv = M.io((t - wt('W5', 'move')) / 1.0);
    wPair[0].setAttribute('cx', (846 + 14 * ka).toFixed(1)); wPair[1].setAttribute('cx', (874 - 14 * ka).toFixed(1)); wPair.forEach(p => M.hide(p, ka >= 1));
    attr(wBn, 'r', (22 * M.clamp((ka - 0.6) / 0.4) * (1 - me)).toFixed(1));
    wBs.forEach((b, k) => { M.vis(b.l, t, wt('W5', 'basidiospores') - 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(b.s, t, wt('W5', 'basidiospores') - 0.4 + k * 0.1, 1e9, { ...POP, sc: 0.3 });
      M.hide(b.n, mv < 1); const sx = 860 + (k - 1.5) * 18, sy = 340; M.hide(b.m, me <= 0 || mv >= 1); attr(b.m, 'cx', (sx + (wSt[k][2] - sx) * mv).toFixed(1)); attr(b.m, 'cy', (sy + (wSt[k][3] - sy) * mv).toFixed(1)); });
    wLB.forEach((l, i) => { const t0 = tWl[i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
    let last = -1; WF.forEach((w, i) => { if (t >= w[1] - 0.1) last = i; });
    WF.forEach((w, i) => { const el = $('#wf' + i); M.vis(el, t, w[1] - 0.15, 1e9, POP); el.style.background = i === last ? C.ac : mix(C.soft, C.ac2, i < last ? 1 : 0); el.style.color = i === last ? '#FFFFFF' : C.ink;
      el.querySelector('b').style.color = i === last ? '#FFFFFF' : C.ac; if (i < 4) M.vis($('#wa' + i), t, WF[i + 1][1] - 0.3, 1e9, { dy: 0, fade: 0.2 }); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'when') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'plasmogamy') - 0.1 });
    M.vis(tc1, t, wt('X3', 'plasmogamy'), 1e9, { ...POP, sc: 0.5 }); tn.forEach((n, i) => M.vis(n, t, wt('X3', 'nuclei') + i * 0.1, 1e9, { ...POP, sc: 0.3 })); M.vis(tLb[0], t, wt('X3', 'dikaryon'), 1e9, { dy: 6 });
    M.draw(tAr, t, wt('X3', 'karyogamy') - 0.1, 0.4); M.vis(tc2, t, wt('X3', 'karyogamy'), 1e9, { ...POP, sc: 0.5 }); M.vis(tn2, t, wt('X3', 'karyogamy') + 0.15, 1e9, { ...POP, sc: 0.3 }); M.vis(tLb[1], t, wt('X3', 'later'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'statement') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Put') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 }); so(t, tAns + 0.1, tSo);
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
