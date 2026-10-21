// PUC Biology Ep 22: Algae - major groups, characteristics and examples (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed colours: canon + this batch's algae classes (green / brown / red algae)
const BR = '#2E2A24', CHL = '#3E9B5F', DARK = '#1F5E37', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', WALLF = '#E3D3A0', WALLS = '#7A6A2E';
const GA = '#3E9B5F', BA = '#9A6B2F', RA = '#C2445A', CLS = [GA, BA, RA];
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  algae: ['M6 22c-2-4 2-6 0-10s2-6 0-10', 'M12 22c-2-4 2-6 0-10s2-6 0-10', 'M18 22c-2-4 2-6 0-10s2-6 0-10'],
  slime: ['M3 4h18v16H3Z', 'M3 14c3 0 3 3 6 3s3-4 6-4 3 3 6 3'],
  jelly: ['M5 10h14l-2 10H7Z', 'M6 10c0-3 2.6-5 6-5s6 2 6 5', 'M9 7.5c1-.8 2-.8 3 0'],
  sun: [ci(12, 12, 4), 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
  thallus: ['M12 21c-6-2-8-8-5-13 1 3 3 4 5 4 2 0 4-1 5-4 3 5 1 11-5 13Z', 'M12 21v-8'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  wave: ['M2 10c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0', 'M2 16c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0'],
  stone: ['M3 18c0-5 3-9 8-9 6 0 10 4 10 9Z', 'M2 18h20'],
  soil: ['M2 9h20', 'M5 13h.01', 'M10 15h.01', 'M15 13h.01', 'M19 16h.01', 'M7 18h.01', 'M13 19h.01'],
  wood: ['M3 7h18v10H3Z', ci(7, 12, 2.4), 'M12 9h7', 'M12 12h7', 'M12 15h7'],
  mushroom: ['M3 12a9 7 0 0 1 18 0Z', 'M9.5 12v7a2.5 2.5 0 0 0 5 0v-7'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  chlamy: ['M12 9c3.4 0 5 3 5 6s-2 6-5 6-5-3-5-6 1.6-6 5-6Z', 'M11 9C9 6 7 5 5 5', 'M13 9c2-3 4-4 6-4', ci(12, 16, 1.6)],
  volvox: [ci(12, 12, 9), ci(12, 6, 1), ci(17, 9, 1), ci(17, 15, 1), ci(12, 18, 1), ci(7, 15, 1), ci(7, 9, 1), ci(11, 12, 2.6)],
  kelp: ['M12 22V8', 'M12 8c-4-2-5-5-4-7 3 1 4 4 4 7Z', 'M12 13c3-2 6-2 8-1-2 2-5 3-8 1Z', 'M12 17c-3-2-6-2-8-1 2 2 5 3 8 1Z', 'M9 22h6'],
  fucus: ['M12 22v-6', 'M12 16 8 11', 'M12 16l4-5', 'M8 11 6 6', 'M8 11l2-5', 'M16 11l-2-5', 'M16 11l2-5', ci(6, 5, 1.4), ci(18, 5, 1.4)],
  frond: ['M12 22c0-6-1-12-6-18', 'M12 22c0-6 1-12 6-18', 'M12 22V5'],
  coral: ['M12 22v-6', 'M12 16c-3-1-5-4-5-8', 'M12 16c3-1 5-4 5-8', 'M7 8c-1-2-1-4 0-5', 'M7 8c2-1 3-3 3-5', 'M17 8c1-2 1-4 0-5', 'M17 8c-2-1-3-3-3-5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tO1 = T0('O1'), tR1 = T0('R1'), tR7 = T0('R7'), tT = T0('T1'), tG1 = T0('G1'), tU1 = T0('U1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['slime', 'Green slime', 'ON A WATER TANK', 'slime', GA], ['kelp', 'Brown seaweed', 'ON THE SEASHORE', 'seaweed', BA], ['jelly', 'A wobbly jelly', 'SET WITH AGAR', 'jelly', RA]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w, , col], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, col, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , col], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, col, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="background:${col}">${M.icon('algae', 22, '#fff', 2.4)}ALGAE</div></div>`).join('');
// Diya's water tank (hand-built scene)
const gs = $('#gS');
mk(gs, 'rect', { x: 0, y: 0, width: 520, height: 390, rx: 12, fill: '#EAF3F7' });
mk(gs, 'path', { d: 'M0 316 H520 V378 a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z', fill: '#D9D3C3' });
mk(gs, 'rect', { x: 90, y: 70, width: 300, height: 250, rx: 10, fill: '#D6D3CC', stroke: BR, 'stroke-width': 4 });
mk(gs, 'rect', { x: 78, y: 58, width: 324, height: 22, rx: 6, fill: '#C7C3BA', stroke: BR, 'stroke-width': 3.5 });
for (let k = 0; k < 4; k++) mk(gs, 'line', { x1: 90, y1: 130 + k * 50, x2: 390, y2: 130 + k * 50, stroke: '#BDB8AE', 'stroke-width': 2 });
const SLM = [];
[[110, 230, 60, 90], [170, 250, 50, 70], [230, 220, 70, 100], [300, 246, 46, 74], [350, 232, 30, 88]].forEach(([x, y, w, h]) => SLM.push(mk(gs, 'path', { d: `M${x},${y + h} C${x - 6},${y + h * 0.4} ${x + w * 0.2},${y} ${x + w * 0.5},${y} C${x + w * 0.8},${y} ${x + w + 6},${y + h * 0.5} ${x + w},${y + h} Z`, fill: '#6DB27A', stroke: DARK, 'stroke-width': 2.5, opacity: 0.92 })));
[[130, 200], [260, 190], [330, 214]].forEach(([x, y]) => SLM.push(mk(gs, 'path', { d: `M${x},${y} q4,30 -2,60`, stroke: '#6DB27A', 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' })));
// tap with a drip
mk(gs, 'path', { d: 'M390,270 H430 V290', stroke: '#8A8F99', 'stroke-width': 10, fill: 'none', 'stroke-linejoin': 'round' }); mk(gs, 'rect', { x: 404, y: 256, width: 16, height: 14, rx: 3, fill: '#8A8F99' });
const drip = mk(gs, 'path', { d: 'M430,298 l-6,10 a7 7 0 1 0 12 0 Z', fill: WAT });
const GL = [[230, 250, 300, 40, 'Green slime', 'start'], [110, 110, 40, 40, 'Tank wall', 'start']];
const GLB = GL.map(([px, py, lx, ly, s]) => { const ln = mk(gs, 'path', { d: `M${px},${py} L${lx + 8},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(gs, 'circle', { cx: px, cy: py, r: 5, fill: C.ink });
  const g = mk(gs, 'g', {}), w = s.length * 11 + 20; mk(g, 'rect', { x: lx, y: ly - 30, width: w, height: 34, rx: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
  txt(g, lx + w / 2, ly - 7, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 18, 'font-weight': 600, fill: C.ink }); return { ln, dot, g }; });
const tGl = [wt('H3', 'slime'), wt('H3', 'wall')];
const SWC = [['Green algae', 'CHLOROPHYCEAE', GA, 'green'], ['Brown algae', 'PHAEOPHYCEAE', BA, 'brown'], ['Red algae', 'RHODOPHYCEAE', RA, 'red']];
$('#sws').innerHTML = SWC.map(([n, d, col], i) => `<div class="sw" id="sw${i}" style="top:${84 + i * 148}px"><i style="background:${col}"></i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const tSw = SWC.map(s => wt('H4', s[3]));

/* ---------- D ---------- */
const DR = [['sun', 'Has chlorophyll', 'makes its own food: autotrophic', wt('D2', 'chlorophyll')], ['thallus', 'A thallus body', 'no real root, stem or leaf', wt('D3', 'thallus')], ['drop', 'Mostly in water', 'fresh or salty', wt('D4', 'water')]];
$('#drs').innerHTML = DR.map(([ic, n, d], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 140}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const AUT = document.createElement('div'); AUT.className = 'pillp ac'; AUT.style.cssText = 'left:36px;top:500px'; AUT.textContent = 'Autotrophic = makes its own food'; $('#dl').appendChild(AUT);
const HB = [['drop', 'Fresh water', 'fresh'], ['wave', 'Sea water', 'salty'], ['stone', 'Moist stones', 'stones'], ['soil', 'Soil', 'soil'], ['wood', 'Wood', 'wood'], ['mushroom', 'With fungi', 'fungi'], ['paw', 'On a sloth bear', 'sloth']];
$('#hbs').innerHTML = HB.map(([ic, n], i) => `<div class="hb" id="hb${i}" style="left:${36 + (i % 2) * 356}px;top:${84 + Math.floor(i / 2) * 76}px;width:340px">${'<i>' + M.icon(ic, 26, C.ac, 2.2) + '</i>'}${n}</div>`).join('');
const tHb = HB.map(h => wt('D4', h[2]));
const LCH = document.createElement('div'); LCH.className = 'pillp'; LCH.style.cssText = 'left:36px;top:500px'; LCH.innerHTML = 'Alga + fungus together = <b style="color:var(--ac);margin-left:8px">a lichen</b>'; $('#dh').appendChild(LCH);

/* ---------- Z: zoom ladder ---------- */
const ZN = ['SLIME', 'FILAMENT', 'CELL', 'CHLOROPLAST'], ZS = ['x1', 'x40', 'x400', 'x2,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Slime', 'A green coat on a wet wall.', 'Made of countless tiny algae.'],
  ['RUNG 2 OF 4', 'Filament', 'A thread: cells joined end to end.', 'Here: a green alga like Spirogyra.'],
  ['RUNG 3 OF 4', 'Cell', 'One cell of the filament.', 'Its chloroplast is a spiral ribbon.'],
  ['RUNG 4 OF 4', 'Chloroplast', 'Where the food is made.', 'Pyrenoids store protein, besides starch.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Spirals in my tank slime!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[470, 330, 60], [470, 262, 52], [640, 222, 40], null];
const LAB = [];
// level 0: the wet wall with slime
{ const g = ZG[0];
  mk(g, 'rect', { x: 60, y: 70, width: 900, height: 400, rx: 10, fill: '#D6D3CC', stroke: BR, 'stroke-width': 4.5 });
  for (let k = 0; k < 4; k++) mk(g, 'line', { x1: 60, y1: 150 + k * 80, x2: 960, y2: 150 + k * 80, stroke: '#BDB8AE', 'stroke-width': 3 });
  const r = M.rng(5);
  for (let k = 0; k < 9; k++) { const x = 90 + k * 96 + r() * 20, y = 260 + r() * 60, w = 70 + r() * 40, h = 120 + r() * 70;
    mk(g, 'path', { d: `M${x},${Math.min(470, y + h)} C${x - 8},${y + h * 0.4} ${x + w * 0.2},${y} ${x + w * 0.5},${y} C${x + w * 0.8},${y} ${x + w + 8},${y + h * 0.5} ${x + w},${Math.min(470, y + h)} Z`, fill: '#6DB27A', stroke: DARK, 'stroke-width': 3, opacity: 0.94 }); }
  LAB[0] = [[300, 330, 300, 120, 'Green slime', 'start'], [140, 150, 150, 110, 'Tank wall', 'start']]; }
// level 1: filaments
const filament = (g, y, x0, x1, ph, cw = 54) => { const pts = []; for (let x = x0; x <= x1; x += 6) pts.push([x, y + 14 * Math.sin((x + ph) / 70)]);
  mk(g, 'path', { d: 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: '#CFE6C6', 'stroke-width': 40, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: BR, 'stroke-width': 44, fill: 'none', 'stroke-linecap': 'round', opacity: 0.0 });
  for (let x = x0 + cw; x < x1; x += cw) { const yy = y + 14 * Math.sin((x + ph) / 70); mk(g, 'line', { x1: x, y1: yy - 20, x2: x, y2: yy + 20, stroke: BR, 'stroke-width': 2.5 }); }
  const sp = []; for (let x = x0; x <= x1; x += 4) { const yy = y + 14 * Math.sin((x + ph) / 70); sp.push([x, yy + 13 * Math.sin(x / 9)]); }
  mk(g, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: CHL, 'stroke-width': 4, fill: 'none' }); };
{ const g = ZG[1];
  [[120, 60, 700, 0], [190, 120, 760, 40], [262, 80, 860, 90], [336, 140, 720, 10], [410, 70, 800, 60]].forEach(([y, a, b, ph]) => {
    const pts = []; for (let x = a; x <= b; x += 6) pts.push([x, y + 14 * Math.sin((x + ph) / 70)]);
    mk(g, 'path', { d: 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: BR, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' });
    filament(g, y, a, b, ph); });
  LAB[1] = [[740, 262, 880, 200, 'Filament', 'start'], [470, 262, 560, 470, 'One cell', 'start']]; }
// level 2: one cell
{ const g = ZG[2];
  mk(g, 'rect', { x: 120, y: 130, width: 680, height: 270, rx: 40, fill: WALLF, stroke: WALLS, 'stroke-width': 5 });
  mk(g, 'rect', { x: 136, y: 146, width: 648, height: 238, rx: 30, fill: '#F3F7EA', stroke: GA, 'stroke-width': 2.5 });
  const sp = []; for (let x = 150; x <= 770; x += 4) sp.push([x, 265 + 96 * Math.sin((x - 150) / 620 * Math.PI * 2 * 1.75)]);
  mk(g, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: DARK, 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: '#6DB27A', 'stroke-width': 20, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 1; k < 9; k++) { const x = 150 + k * 70, y = 265 + 96 * Math.sin((x - 150) / 620 * Math.PI * 2 * 1.75); mk(g, 'circle', { cx: x, cy: y, r: 7, fill: '#F6E7C4', stroke: DARK, 'stroke-width': 2 }); }
  [[460, 265, 300, 160], [460, 265, 620, 160], [460, 265, 320, 370], [460, 265, 600, 370]].forEach(([a, b, c, d]) => mk(g, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: '#C9B9D6', 'stroke-width': 2.5 }));
  mk(g, 'circle', { cx: 460, cy: 265, r: 30, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(g, 'circle', { cx: 463, cy: 262, r: 10, fill: NUC });
  LAB[2] = [[200, 132, 160, 60, 'Cell wall', 'start'], [460, 265, 500, 480, 'Nucleus', 'start'], [700, 300, 820, 470, 'Chloroplast (spiral ribbon)', 'end']]; }
// level 3: chloroplast with pyrenoids
const PYR = [];
{ const g = ZG[3];
  mk(g, 'path', { d: 'M40,200 C260,120 520,140 1016,200 L1016,350 C520,300 260,280 40,350 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 5 });
  [[230, 268], [520, 248], [800, 262]].forEach(([x, y]) => { const p = mk(g, 'g', {});
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(p, 'path', { d: `M${x + 40 * Math.cos(a - 0.32)},${y + 40 * Math.sin(a - 0.32)} A40 40 0 0 1 ${x + 40 * Math.cos(a + 0.32)},${y + 40 * Math.sin(a + 0.32)} L${x + 56 * Math.cos(a + 0.3)},${y + 56 * Math.sin(a + 0.3)} A56 56 0 0 0 ${x + 56 * Math.cos(a - 0.3)},${y + 56 * Math.sin(a - 0.3)} Z`, fill: '#F2D58A', stroke: GOLD, 'stroke-width': 2.5 }); }
    mk(p, 'circle', { cx: x, cy: y, r: 34, fill: '#E9DDF0', stroke: NUC, 'stroke-width': 3 }); PYR.push(p); });
  LAB[3] = [[120, 330, 90, 452, 'Chloroplast', 'start'], [520, 192, 470, 92, 'Pyrenoid', 'end'], [800, 262, 760, 452, 'Protein core', 'end'], [854, 270, 900, 108, 'Starch around it', 'end']]; }
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + (ly < py ? -6 : 26), 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'green'), wt('Z2', 'wall')], [wt('Z3', 'threads'), wt('Z3', 'cells')], [wt('Z4', 'wall'), wt('Z4', 'nucleus'), wt('Z4', 'chloroplast')], [wt('Z5', 'chloroplast'), wt('Z5', 'pyrenoids'), wt('Z5', 'protein'), wt('Z5', 'starch')]];

/* ---------- O: form and size ---------- */
const os = $('#oS'), OG = [0, 1, 2].map(() => mk(os, 'g', {}));
{ const g = OG[0], X = 270, Y = 270, R = 150, r = M.rng(3);
  mk(g, 'circle', { cx: X, cy: Y, r: R, fill: '#EAF5E4', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 40; k++) { const a = k * Math.PI * 2 / 40; mk(g, 'circle', { cx: X + (R - 8) * Math.cos(a), cy: Y + (R - 8) * Math.sin(a), r: 7, fill: '#6DB27A', stroke: DARK, 'stroke-width': 1.5 }); }
  [[X - 50, Y - 20, 46], [X + 60, Y + 40, 36]].forEach(([x, y, rr]) => { mk(g, 'circle', { cx: x, cy: y, r: rr, fill: '#D3EBCB', stroke: DARK, 'stroke-width': 2.5 }); for (let k = 0; k < 14; k++) { const a = k * Math.PI / 7; mk(g, 'circle', { cx: x + (rr - 5) * Math.cos(a), cy: y + (rr - 5) * Math.sin(a), r: 4, fill: '#6DB27A' }); } }); }
{ const g = OG[1], Y = 270;
  mk(g, 'path', { d: 'M600,110 L616,110 L612,140 L604,140 Z', fill: '#B9A27A', stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 7; k++) { const y = 140 + k * 46; mk(g, 'rect', { x: 586, y, width: 44, height: 46, fill: '#E6F2DF', stroke: BR, 'stroke-width': 3 }); mk(g, 'rect', { x: 590, y: y + 14, width: 36, height: 18, rx: 4, fill: '#6DB27A' }); }
  const sp = []; for (let y = 110; y <= 440; y += 4) sp.push([960 + 24 * Math.sin((y - 110) / 60), y]);
  mk(g, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: BR, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: '#E6F2DF', 'stroke-width': 40, fill: 'none', 'stroke-linecap': 'round' });
  const s2 = []; for (let y = 112; y <= 438; y += 3) s2.push([960 + 24 * Math.sin((y - 110) / 60) + 13 * Math.sin(y / 9), y]);
  mk(g, 'path', { d: 'M' + s2.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: CHL, 'stroke-width': 4, fill: 'none' });
  txt(g, 608, 96, 'ULOTHRIX', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 }); txt(g, 960, 96, 'SPIROGYRA', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 }); }
const KLB = [];
{ const g = OG[2], X = 1330;
  mk(g, 'path', { d: `M${X},430 C${X - 30},446 ${X - 50},440 ${X - 66},452 M${X},430 C${X + 30},446 ${X + 50},440 ${X + 66},452 M${X},430 L${X},454`, stroke: BA, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${X},432 C${X - 6},360 ${X + 6},290 ${X},230`, stroke: '#7A5222', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  [[-1, 0], [1, 10], [-1, 30], [1, 40]].forEach(([s, d]) => mk(g, 'path', { d: `M${X},${230 + d} C${X + s * 30},${170 + d} ${X + s * 60},${120 + d} ${X + s * 50},${70 + d} C${X + s * 30},${110 + d} ${X + s * 10},${170 + d} ${X},${230 + d} Z`, fill: '#C79A5A', stroke: BR, 'stroke-width': 3 }));
  [[X - 50, 446, X - 200, 446, 'Holdfast'], [X + 2, 330, X + 120, 330, 'Stipe'], [X + 50, 110, X + 120, 110, 'Frond']].forEach(([px, py, lx, ly, s]) => {
    const ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
    const tx = mk(g, 'text', { x: lx + (lx < px ? -10 : 10), y: ly + 8, 'text-anchor': lx < px ? 'end' : 'start', class: 'zl' }); tx.textContent = s; KLB.push({ ln, dot, tx }); }); }
const FN = [['Volvox', 'A COLONY · HOLLOW BALL', 36, wt('O2', 'Volvox')], ['Ulothrix · Spirogyra', 'FILAMENTS', 566, wt('O3', 'Ulothrix')], ['Kelps', 'MASSIVE · IN THE SEA', 1096, wt('O3', 'kelps')]];
$('#fns').innerHTML = FN.map(([n, d, x], i) => `<div class="fn" id="fn${i}" style="left:${x}px"><b>${n}</b><span>${d}</span></div>`).join('');

/* ---------- R: reproduction ---------- */
const RN = ['VEGETATIVE · FRAGMENTATION', 'ASEXUAL · ZOOSPORES', 'SEXUAL · GAMETES FUSE'];
$('#rch').innerHTML = RN.map((n, i) => `<span class="zc" id="rn${i}">${i + 1} &nbsp;${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const RP = [['Fragmentation', 'the filament breaks; each piece grows into a new alga'], ['Zoospores', 'spores with flagella that swim away and grow'], ['Two gametes fuse', 'the fused cell is a zygote']];
$('#rps').innerHTML = RP.map(([n, d], i) => `<div class="rp" id="rp${i}"><div class="lbl" style="left:36px;top:30px">WAY ${i + 1} OF 3</div><div class="rt">${n}</div><div class="rd">${d}</div></div>`).join('');
const tRs = [T0('R2'), T0('R3'), T0('R4')];
const rs = $('#rS'), RG = [0, 1, 2].map(() => mk(rs, 'g', {}));
// way 1: a filament of 12 cells that breaks into 3 pieces, each grows
const FCELL = []; for (let k = 0; k < 12; k++) { const g = mk(RG[0], 'g', {}); mk(g, 'rect', { x: 0, y: 0, width: 70, height: 56, rx: 6, fill: '#E6F2DF', stroke: BR, 'stroke-width': 3 }); mk(g, 'rect', { x: 6, y: 18, width: 58, height: 20, rx: 6, fill: '#6DB27A' }); FCELL.push(g); }
const tBreak = wt('R2', 'breaks'), tGrow = wt('R2', 'grows');
// way 2: parent cell releasing swimming zoospores
const par = mk(RG[1], 'g', {}); mk(par, 'circle', { cx: 400, cy: 340, r: 90, fill: '#E6F2DF', stroke: BR, 'stroke-width': 4 });
const ZSP = [0, 1, 2, 3, 4, 5].map(k => { const g = mk(RG[1], 'g', {}); mk(g, 'path', { d: 'M0,-22 C16,-22 20,4 0,22 C-20,4 -16,-22 0,-22 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 2.5 });
  const f1 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2.5, fill: 'none' }), f2 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2.5, fill: 'none' }); return { g, f1, f2 }; });
const zl1 = mk(RG[1], 'text', { x: 1150, y: 260, class: 'zl' }); zl1.textContent = 'Zoospore'; const zl2 = mk(RG[1], 'text', { x: 1150, y: 430, class: 'zl' }); zl2.textContent = 'Flagella (tiny whips)';
const tZsp = wt('R3', 'spores'), tSwim = wt('R3', 'swim');
// way 3: two gametes fuse into a zygote
const GMT = [0, 1].map(k => { const g = mk(RG[2], 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r: 34, fill: '#8FC994', stroke: DARK, 'stroke-width': 3 }); mk(g, 'circle', { cx: 0, cy: 0, r: 9, fill: NUC }); return g; });
const ZYG = mk(RG[2], 'g', {}); mk(ZYG, 'circle', { cx: 800, cy: 340, r: 52, fill: '#6DB27A', stroke: DARK, 'stroke-width': 4 }); mk(ZYG, 'circle', { cx: 800, cy: 340, r: 14, fill: NUC });
const zyT = mk(RG[2], 'text', { x: 800, y: 440, 'text-anchor': 'middle', class: 'zl' }); zyT.textContent = 'Zygote';
const gmT = [mk(RG[2], 'text', { x: 300, y: 430, 'text-anchor': 'middle', class: 'zl' }), mk(RG[2], 'text', { x: 1300, y: 430, 'text-anchor': 'middle', class: 'zl' })]; gmT.forEach(e => e.textContent = 'Gamete');
const tFuse = wt('R4', 'fuse'), tZyg = wt('R4', 'zygote');
// iso vs oo
const ri = $('#riS'), ISO = [0, 1].map(k => { const g = mk(ri, 'g', {}); mk(g, 'path', { d: 'M0,-30 C22,-30 28,6 0,30 C-28,6 -22,-30 0,-30 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 0, cy: 4, r: 7, fill: NUC }); const f1 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2.5, fill: 'none' }), f2 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2.5, fill: 'none' }); return { g, f1, f2 }; });
const ro = $('#roS'), EGG = mk(ro, 'g', {}); mk(EGG, 'circle', { cx: 470, cy: 320, r: 110, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 4 }); mk(EGG, 'circle', { cx: 470, cy: 320, r: 24, fill: NUC });
const eT = mk(ro, 'text', { x: 470, y: 466, 'text-anchor': 'middle', class: 'zl' }); eT.textContent = 'Egg (still)';
const SP = mk(ro, 'g', {}); mk(SP, 'ellipse', { cx: 0, cy: 0, rx: 14, ry: 10, fill: '#8FC994', stroke: DARK, 'stroke-width': 2.5 }); const spF = mk(SP, 'path', { d: '', stroke: BR, 'stroke-width': 2.5, fill: 'none' });
const spT = mk(ro, 'text', { x: 150, y: 220, 'text-anchor': 'middle', class: 'zl' }); spT.textContent = 'Small, swims';
const th1 = PUC.think($('#th1'), { q: 'A large still egg and a tiny swimming gamete fuse. Isogamous or oogamous?', opts: ['Isogamous', 'Oogamous'], right: 1, why: 'Oogamous. The gametes are very different: a big egg that stays, and a small one that swims to it.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">green · brown · <b>red</b></span>';

/* ---------- G: the table ---------- */
const TCOLX = [296, 716, 1136], TH = [['Chlorophyceae', 'GREEN ALGAE', 'G2'], ['Phaeophyceae', 'BROWN ALGAE', 'G3'], ['Rhodophyceae', 'RED ALGAE', 'G4']];
const TROW = ['PIGMENTS', 'STORED FOOD', 'CELL WALL', 'FLAGELLA', 'HABITAT'];
const TV = [['Chlorophyll a, b', 'Starch', 'Cellulose', '2-8, equal, apical', 'Fresh, brackish, salt water'],
  ['Chlorophyll a, c + fucoxanthin', 'Mannitol, laminarin', 'Cellulose + algin', '2, unequal, lateral', 'Salt, brackish; rare in fresh'],
  ['Chlorophyll a, d + phycoerythrin', 'Floridean starch', 'Cellulose, pectin, polysulphate esters', 'Absent', 'Salt (most), brackish, some fresh']];
$('#tbl').innerHTML = TH.map(([n, d], c) => `<div class="tgh" id="tg${c}" style="left:${TCOLX[c]}px"><i style="background:${CLS[c]}"></i><div class="nm">${n}</div><div class="ds" style="color:${CLS[c]}">${d}</div></div>`).join('') +
  TROW.map((r, i) => `<div class="trl" id="trl${i}" style="top:${168 + i * 70}px">${r}</div>`).join('') +
  TV.map((col, c) => col.map((v, i) => `<div class="tcl" id="tv${c}${i}" style="left:${TCOLX[c]}px;top:${172 + i * 70}px;width:410px${v.length > 32 ? ';font-size:18px' : ''}">${v}</div>`).join('')).join('');
const RED = document.createElement('div'); RED.className = 'pillp'; RED.style.cssText = `left:${TCOLX[1]}px;top:516px;height:44px;font-size:20px;background:#F9E3E7;color:${RA}`; RED.textContent = 'Red algae: near the surface, and deep down where little light reaches'; $('#gt').appendChild(RED);
const tTv = [[wt('G2', 'Chlorophyll'), wt('G2', 'starch'), wt('G2', 'cellulose'), wt('G2', 'Two')],
  [wt('G3', 'Chlorophyll'), wt('G3', 'mannitol'), wt('G3', 'cellulose'), wt('G3', 'Two')],
  [wt('G4', 'Chlorophyll'), wt('G4', 'floridean'), wt('G4', 'floridean') + 1.1, wt('G4', 'No')]];
const tHab = wt('G5', 'Most'), tRed = wt('G5', 'Red');

/* ---------- U: uses ---------- */
const us = $('#uS'), UX = 392, UY = 270, UR = 160;
mk(us, 'circle', { cx: UX, cy: UY, r: UR, fill: C.soft, stroke: C.line, 'stroke-width': 3 });
const half = mk(us, 'path', { d: '', fill: GA });
const uT = txt(us, UX - 80, UY + 10, 'ALGAE', { 'text-anchor': 'middle', 'font-size': 22, fill: '#fff', 'font-weight': 600, 'letter-spacing': 2 });
const uT2 = txt(us, UX + 80, UY + 10, 'OTHERS', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600, 'letter-spacing': 2 });
const U2 = [['EATEN AS FOOD · MARINE ALGAE', 'Porphyra · Laminaria · Sargassum', 'among about 70 kinds of sea algae used as food', 'Porphyra'], ['AGAR · FROM RED ALGAE', 'Gelidium · Gracilaria', 'sets jellies and ice creams; grows microbes in labs', 'Agar']];
$('#u2s').innerHTML = U2.map(([a, b, c], i) => `<div class="u2" id="u2${i}" style="top:${84 + i * 136}px"><div class="a">${a}</div><div class="b">${b}</div><div class="c">${c}</div></div>`).join('');
const tU2 = U2.map(u => wt('U2', u[3]));
const avU = PUC.avatar($('#sU'), { x: 976 + 36, y: 270 + 400, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'My jelly came from seaweed!' });

/* ---------- W: worked example ---------- */
const WC = [['Chlamydomonas', 'chlamy', 0, 'one cell, two flagella', wt('W2', 'Chlamydomonas')], ['Volvox', 'volvox', 0, 'a hollow colony', wt('W2', 'Volvox')],
  ['Fucus', 'fucus', 1, 'a brown seaweed', wt('W3', 'Fucus')], ['Laminaria', 'kelp', 1, 'a kelp, eaten as food', wt('W3', 'Laminaria')],
  ['Porphyra', 'frond', 2, 'eaten as food', wt('W4', 'Porphyra')], ['Gelidium', 'coral', 2, 'gives agar', wt('W4', 'Gelidium')]];
$('#grhs').innerHTML = SWC.map(([n, d, col], c) => `<div class="grh" id="gh${c}" style="left:${36 + c * 518}px;width:491px;background:${col}">${n.toUpperCase()} · ${d}</div>`).join('');
$('#cols').innerHTML = WC.map(([n, ic, c, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="dz"></div>
  <div class="it" id="it${i}" style="background:${mix(CLS[c], '#FFFFFF', 0.85)}"><div class="ic">${M.icon(ic, 84, CLS[c], 2)}</div><div class="inm">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Jelly from a red seaweed. Wild.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Brown and red algae have no chlorophyll', right: 'All three have chlorophyll a; other pigments hide the green' });
const tS = $('#tS'), TSW = CLS.map((col, k) => { const g = mk(tS, 'g', {}); mk(g, 'circle', { cx: 100 + k * 130, cy: 120, r: 50, fill: col, stroke: BR, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 100 + k * 130, cy: 120, r: 18, fill: '#fff' }); txt(g, 100 + k * 130, 127, 'a', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: GA }); return g; });
const tSl = txt(tS, 230, 216, 'CHLOROPHYLL a IN ALL THREE', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ac, 'letter-spacing': 1.5, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'One line features from the table: pigments, stored food, flagella, an example' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 820,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Phaeophyceae store food as floridean starch.</div><div class="sl"><b>II</b>Chlorophyceae have 2-8 equal, apical flagella.</div><div class="sl"><b>III</b>Rhodophyceae have two unequal, lateral flagella.</div><div class="sl"><b>IV</b>Agar is obtained from Gelidium and Gracilaria.</div>',
  opts: ['I and II only', 'II and III only', 'II and IV only', 'I, III and IV only'], right: 2, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b> (II, IV)'], ['<b style="color:var(--red)">I</b> is false'], ['Floridean starch: red algae'], ['<b style="color:var(--red)">III</b> is false'], ['Red algae: no flagella']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.05, wt('A2', 'One'), wt('A2', 'Floridean'), wt('A3', 'Three'), wt('A3', 'Red')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · algae', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Algae</b>: chlorophyll, thalloid, autotrophic, mostly in water', `<b style="color:${GA}">Green</b>: chl a, b · starch · cellulose · 2-8 equal apical flagella`, `<b style="color:${BA}">Brown</b>: chl a, c, fucoxanthin · mannitol, laminarin · algin`,
    `<b style="color:${RA}">Red</b>: chl a, d, phycoerythrin · floridean starch · no flagella`, '<b>Isogamous</b>: equal gametes · <b>Oogamous</b>: big still egg + small swimmer'] });
const YQ = ['What does thalloid mean?', 'What is the difference between isogamous and oogamous?', 'Which algae give us agar?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 23', topic: 'Velvet moss in the monsoon: why only then? Bryophytes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tO1 + 0.1, 1, 960, 540], [wt('O3', 'kelps') - 0.3, 1.08, 1380, 560], [T1('O3') + 0.2, 1, 960, 540]]);
const flag = (x, y, ang, len, ph) => { let d = `M${x},${y}`; for (let k = 1; k <= 8; k++) { const u = k / 8, px = x + Math.cos(ang) * len * u - Math.sin(ang) * 6 * Math.sin(u * 7 + ph), py = y + Math.sin(ang) * len * u + Math.cos(ang) * 6 * Math.sin(u * 7 + ph); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; } return d; };

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'algae') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'algae') + 0.5, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#gS'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.2 });
    attr(drip, 'transform', `translate(0 ${((t * 30) % 40).toFixed(1)})`); drip.style.opacity = (1 - ((t * 30) % 40) / 40).toFixed(2);
    GLB.forEach((l, i) => { M.draw(l.ln, t, tGl[i], 0.35); M.vis(l.dot, t, tGl[i] - 0.1, 1e9, { ...POP, sc: 0.2 }); l.g.style.opacity = M.clamp((t - tGl[i] - 0.3) / 0.25).toFixed(3); });
    M.vis($('#hkP'), t, wt('H3', 'plant') - 0.4, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.25, 1e9, { dy: 0, fade: 0.25 })) SWC.forEach((_, i) => M.vis($('#sw' + i), t, tSw[i] - 0.15, 1e9, { dx: -20, dy: 0 }));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DR.forEach((d, i) => { const el = $('#dr' + i); M.vis(el, t, d[3] - 0.15, 1e9, { dy: 16 }); });
    M.vis(AUT, t, wt('D2', 'autotrophic') - 0.1, 1e9, POP);
    M.vis($('#dh'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o });
    HB.forEach((_, i) => { const el = $('#hb' + i); M.vis(el, t, tHb[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tHb[i]) / 0.25)); });
    M.vis(LCH, t, wt('D4', 'fungi') + 0.3, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tO1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('O1');
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
    PYR.forEach((p, k) => { const on = M.io((t - wt('Z5', 'store') - k * 0.15) / 0.3) * (1 - M.io((t - wt('Z5', 'store') - 0.9 - k * 0.15) / 0.4)); const [x, y] = [[230, 268], [520, 248], [800, 262]][k];
      attr(p, 'transform', on > 0.001 ? `translate(${x} ${y}) scale(${(1 + 0.12 * on).toFixed(3)}) translate(${-x} ${-y})` : ''); });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'ribbon') + 0.3, T0('Z5') + 2.4);
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tR1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    M.vis($('#om'), t, tO1 + 0.05, OUT('R1'), { dy: 36, ...o });
    FN.forEach((f, i) => { M.vis(OG[i], t, f[3] - 0.2, 1e9, { dy: 24, fade: 0.2 }); M.vis($('#fn' + i), t, f[3], 1e9, { dy: 10 }); });
    attr(OG[0], 'transform', `rotate(${((t - tO1) * 6).toFixed(2)} 270 270)`);
    KLB.forEach((l, i) => { const t0 = FN[2][3] + 0.6 + i * 0.4; M.draw(l.ln, t, t0, 0.35); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const tIso = T0('R5') - 0.2, outC = tIso - 0.3;
    M.vis($('#rch'), t, tR1 + 0.1, tR7 - 0.3, { dy: 12, ...o });
    let si = -1; tRs.forEach((tt, i) => { if (t >= tt - 0.1) si = i; });
    RN.forEach((_, i) => { const el = $('#rn' + i), on = i === si ? 1 : 0, done = i < si; el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#rc'), t, tRs[0] - 0.3, outC, { dy: 36, ...o });
    RP.forEach((_, i) => M.vis($('#rp' + i), t, tRs[i] + 0.05, i < 2 ? tRs[i + 1] - 0.05 : 1e9, { dy: 16, outDur: 0.2, ody: -10 }));
    RG.forEach((g, i) => M.vis(g, t, tRs[i], i < 2 ? tRs[i + 1] - 0.05 : 1e9, { dy: 0, fade: 0.25, outDur: 0.2, ody: 0 }));
    // way 1
    const b = M.io((t - tBreak) / 0.8), gr = M.io((t - tGrow) / 1.4);
    FCELL.forEach((c, k) => { const p = Math.floor(k / 4), j = k % 4, cw = 70 + 25 * gr, off = (p - 1) * (80 * b + 100 * gr), x = 520 + p * 280 + off - 2 * cw + j * cw;
      attr(c, 'transform', `translate(${x.toFixed(1)} 320) scale(${(cw / 70).toFixed(3)} 1)`); });
    // way 2
    ZSP.forEach((z, k) => { const a = k * Math.PI / 3 + 0.4, d = 100 + 520 * M.clamp((t - tZsp - k * 0.12) / 3.4), wob = Math.sin((t - tZsp) * 6 + k) * 10;
      const x = 400 + Math.cos(a) * d * (Math.cos(a) > 0 ? 1.2 : 0.55), y = 340 + Math.sin(a) * Math.min(d, 150) + wob;
      const vis = t > tZsp - 0.1; z.g.style.opacity = vis ? M.clamp((t - tZsp - k * 0.12) / 0.3).toFixed(2) : 0;
      attr(z.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(a * 180 / Math.PI + 90).toFixed(1)})`);
      attr(z.f1, 'd', flag(-4, -22, -Math.PI / 2 - 0.3, 34, t * 9 + k)); attr(z.f2, 'd', flag(4, -22, -Math.PI / 2 + 0.3, 34, t * 9 + k + 1)); });
    zl1.style.opacity = M.clamp((t - tZsp - 0.6) / 0.3); zl2.style.opacity = M.clamp((t - wt('R3', 'flagella')) / 0.3);
    // way 3
    const fu = M.io((t - tFuse + 0.4) / 1.0);
    GMT.forEach((g, k) => { const x = k ? M.lerp(1300, 820, fu) : M.lerp(300, 780, fu), y = 340 + Math.sin(t * 3 + k * 2) * 10 * (1 - fu); attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); g.style.opacity = fu >= 1 ? 0 : 1; });
    gmT.forEach(e => e.style.opacity = 1 - fu); M.vis(ZYG, t, tFuse + 0.6, 1e9, { ...POP, sc: 0.5 }); M.vis(zyT, t, tZyg, 1e9, { dy: 8 });
    // iso vs oo
    M.vis($('#ri'), t, tIso, tR7 - 0.05, { dx: -60, dy: 0, outDur: 0.01 }); M.vis($('#ro'), t, T0('R6') - 0.15, tR7 - 0.05, { dx: 60, dy: 0, outDur: 0.01 });
    const lp = ((t - tIso) % 3.2) / 3.2, mv = M.io(lp / 0.6), mg = lp > 0.62;
    ISO.forEach((z, k) => { const x = k ? M.lerp(640, 420, mv) : M.lerp(140, 360, mv); attr(z.g, 'transform', `translate(${x.toFixed(1)} 320) rotate(${k ? -90 : 90})`); z.g.style.opacity = mg && k ? 0 : 1;
      attr(z.f1, 'd', flag(-5, -30, -Math.PI / 2 - 0.35, 40, t * 9)); attr(z.f2, 'd', flag(5, -30, -Math.PI / 2 + 0.35, 40, t * 9 + 1)); });
    M.vis($('#ri0'), t, wt('R5', 'Chlamydomonas') - 0.1, 1e9, POP); M.vis($('#ri1'), t, wt('R5', 'Spirogyra') - 0.1, 1e9, POP);
    const lp2 = ((t - T0('R6')) % 3.0) / 3.0, sx = M.lerp(110, 360, M.io(lp2 / 0.75));
    attr(SP, 'transform', `translate(${sx.toFixed(1)} ${(320 + Math.sin(t * 8) * 8).toFixed(1)})`); SP.style.opacity = lp2 > 0.8 ? 0 : 1; attr(spF, 'd', flag(-14, 0, Math.PI, 40, t * 10));
    M.vis(spT, t, wt('R6', 'small') , 1e9, { dy: 6 });
    M.vis($('#ro0'), t, wt('R6', 'Volvox') - 0.1, 1e9, POP); M.vis($('#ro1'), t, wt('R6', 'Fucus') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tR7 + 0.05, tT - 0.05, { dy: 36, outDur: 0.01 });
    th1(t, { tin: tR7, tOpts: wt('R7', 'Isogamous') - 0.1, tCount: T1('R7') + 0.05, dur: 3, tAns: T0('R8') - 0.02, tWhy: wt('R8', 'The') });
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'pigments') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'wall') - 0.1, 0.8);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tU1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gt'), t, tG1 + 0.05, OUT('U1'), { dy: 36, ...o });
    TROW.forEach((_, i) => M.vis($('#trl' + i), t, tG1 + 0.4 + i * 0.1, 1e9, { dx: -12, dy: 0 }));
    let cc = -1; TH.forEach((h, c) => { if (t >= T0(h[2]) - 0.1) cc = c; }); if (t >= tHab - 0.1) cc = -1;
    TH.forEach((h, c) => { M.vis($('#tg' + c), t, T0(h[2]) - 0.1, 1e9, { dy: 12 });
      TV[c].forEach((v, i) => { const el = $('#tv' + c + i), tt = i < 4 ? tTv[c][i] : tHab + c * 0.25; M.vis(el, t, tt - 0.1, 1e9, POP);
        const on = c === cc ? 1 : 0; el.style.background = mix(C.soft, mix(CLS[c], '#FFFFFF', 0.85), i === 4 ? M.io((t - tHab) / 0.3) : on ? 1 : 0.35); }); });
    M.vis(RED, t, tRed - 0.1, 1e9, POP);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('W1');
    M.vis($('#ul'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const h = M.io((t - wt('U2', 'half') + 0.2) / 0.9), a = Math.PI * h;
    attr(half, 'd', h <= 0 ? '' : `M${UX},${UY} L${UX},${UY - UR} A${UR} ${UR} 0 0 0 ${(UX - UR * Math.sin(a)).toFixed(1)} ${(UY - UR * Math.cos(a)).toFixed(1)} Z`);
    uT.style.opacity = M.clamp((t - wt('U2', 'half') - 0.6) / 0.3); uT2.style.opacity = M.clamp((t - wt('U2', 'half') - 0.8) / 0.3);
    M.vis($('#uP'), t, wt('U2', 'half') + 0.4, 1e9, POP);
    M.vis($('#ur'), t, tU2[0] - 0.4, out, { dx: 60, dy: 0, ...o });
    U2.forEach((_, i) => M.vis($('#u2' + i), t, tU2[i] - 0.1, 1e9, { dy: 16 }));
    avU(t, wt('U2', 'jellies') + 0.3, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    SWC.forEach((_, c) => M.vis($('#gh' + c), t, tW1 + 0.3 + c * 0.1, 1e9, { dy: 10 }));
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.4 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.4, 1e9, { dy: 8 }); });
    avW(t, wt('W4', 'jelly') + 0.2, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'brown') - 0.2, tStrike: wt('X3', 'They') - 0.05, tRight: wt('X3', 'All') - 0.1 });
    TSW.forEach((g, k) => M.vis(g, t, wt('X3', 'All') + k * 0.15, 1e9, { ...POP, sc: 0.4 })); M.vis(tSl, t, wt('X3', 'hide'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'one') });
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
