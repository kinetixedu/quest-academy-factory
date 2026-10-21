// PUC Biology Ep 30: Evolutionary Trends in Plant Organisation (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon (water sky, sugar gold) + batch canon: n teal, 2n indigo
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, WAT = '#5AA0C8', GOLD = '#C9962B';
const HN = '#0E8F8F', DN = '#4A5FC1', HNL = '#CDEDEA', DNL = '#D5DBF4', STALK = '#9A6B3E';
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const G = (p, x, y, s = 1) => mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
const moss = (g, x, y, s = 1, withSp = false) => { const Q = G(g, x, y, s);
  for (let k = 0; k < 4; k++) mk(Q, 'path', { d: `M${-6 + k * 4},40 l${-6 + k * 4},14`, stroke: '#9A7A4E', 'stroke-width': 2, 'stroke-linecap': 'round' });
  mk(Q, 'path', { d: 'M0,42 L0,-20', stroke: '#4E7A34', 'stroke-width': 4, 'stroke-linecap': 'round' });
  for (let k = 0; k < 6; k++) { const yy = 34 - k * 10, sd = k % 2 ? 1 : -1; mk(Q, 'path', { d: `M0,${yy} q${sd * 10},-6 ${sd * 18},-14 q${-sd * 4},10 ${-sd * 18},14Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 }); }
  if (withSp) { mk(Q, 'path', { d: 'M0,-20 C2,-40 6,-58 8,-72', stroke: STALK, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); mk(Q, 'ellipse', { cx: 9, cy: -80, rx: 6, ry: 11, fill: '#C9A46A', stroke: BR, 'stroke-width': 1.8, transform: 'rotate(12 9 -80)' }); }
  return W(Q); };
const frond = (g, x, y, s = 1, sori = true) => { const Q = G(g, x, y, s);
  mk(Q, 'path', { d: 'M0,120 C-4,60 4,0 18,-110', stroke: '#4E7A34', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 8; k++) { const yy = 96 - k * 26, xx = (k * 2.2), L = 62 - k * 6; [-1, 1].forEach(sd => { mk(Q, 'path', { d: `M${xx},${yy} C${xx + sd * L * 0.4},${yy - 16} ${xx + sd * L * 0.8},${yy - 14} ${xx + sd * L},${yy - 4} C${xx + sd * L * 0.7},${yy + 6} ${xx + sd * L * 0.3},${yy + 6} ${xx},${yy} Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 });
    if (sori && k < 6) for (let q = 1; q <= 2; q++) mk(Q, 'circle', { cx: xx + sd * L * q * 0.32, cy: yy - 3, r: 3, fill: '#8A5A2B' }); }); }
  return W(Q); };
const pine = (g, x, y, s = 1) => { const Q = G(g, x, y, s);
  mk(Q, 'path', { d: 'M-9,110 L-6,0 L6,0 L9,110 Z', fill: '#B08A5A', stroke: BR, 'stroke-width': 3 });
  [[-110, 70, 40], [-60, 60, 0], [-14, 50, -40], [30, 36, -80]].forEach(([yb, w, yt], k) => mk(Q, 'path', { d: `M0,${yt - 50} L${w},${yb + 120} L${-w},${yb + 120} Z`, fill: k % 2 ? '#5E9E62' : '#4E8A54', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' }));
  return W(Q); };
const cone = (g, x, y, s = 1) => { const Q = G(g, x, y, s);
  mk(Q, 'ellipse', { cx: 0, cy: 0, rx: 24, ry: 40, fill: '#B08A5A', stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) mk(Q, 'path', { d: `M-22,${-28 + k * 14} Q0,${-20 + k * 14} 22,${-28 + k * 14}`, stroke: BR, 'stroke-width': 1.8, fill: 'none' });
  [[-8, -14], [9, 0], [-8, 14]].forEach(([dx, dy]) => mk(Q, 'ellipse', { cx: dx, cy: dy, rx: 5, ry: 3.5, fill: '#F3E7C9', stroke: BR, 'stroke-width': 1.4 })); return W(Q); };
const flowerPlant = (g, x, y, s = 1) => { const Q = G(g, x, y, s);
  mk(Q, 'path', { d: 'M0,110 C-4,40 4,-30 0,-80', stroke: '#4E7A34', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  [[0, 50, -1], [2, 10, 1], [0, -30, -1]].forEach(([dx, yy, sd]) => mk(Q, 'path', { d: `M${dx},${yy} C${sd * 30},${yy - 30} ${sd * 70},${yy - 20} ${sd * 80},${yy - 6} C${sd * 60},${yy + 14} ${sd * 24},${yy + 12} ${dx},${yy} Z`, fill: LEAF, stroke: BR, 'stroke-width': 2.5 }));
  for (let k = 0; k < 5; k++) mk(Q, 'ellipse', { cx: 0, cy: -106, rx: 11, ry: 22, fill: '#F2B8C6', stroke: BR, 'stroke-width': 2, transform: `rotate(${k * 72} 0 -86)` });
  mk(Q, 'circle', { cx: 0, cy: -86, r: 9, fill: '#E8C46A', stroke: BR, 'stroke-width': 2 });
  return W(Q); };
const spiro = (g, x, y, s = 1) => { const Q = G(g, x, y, s);
  mk(Q, 'rect', { x: -84, y: -18, width: 168, height: 36, rx: 18, fill: '#E6F2DF', stroke: BR, 'stroke-width': 2.5 });
  [-28, 28].forEach(cx => mk(Q, 'line', { x1: cx, y1: -18, x2: cx, y2: 18, stroke: BR, 'stroke-width': 2 }));
  let d = 'M-80,0'; for (let k = 0; k <= 32; k++) d += ` L${-80 + k * 5},${(12 * Math.sin(k * 0.8)).toFixed(1)}`; mk(Q, 'path', { d, stroke: GRN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); return W(Q); };
const drop = (g, x, y, s = 1, col = WAT) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M0,-20 C10,-6 16,2 16,10 A16,16 0 0 1 -16,10 C-16,2 -10,-6 0,-20 Z', fill: '#D6E9F5', stroke: col, 'stroke-width': 3 }); return W(Q); };

Object.assign(M.IC, {
  moss: ['M12 22V9', 'M12 18c-3-1-5-3-5-5 3 0 5 2 5 5Z', 'M12 14c3-1 5-3 5-5-3 0-5 2-5 5Z', 'M12 10c-2-1-3-3-3-5 2 0 3 2 3 5Z', 'M4 22h16'],
  slime: ['M3 8h18v12H3Z', 'M3 13c3-2 6 2 9 0s6 2 9 0'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
  pipes: ['M8 3v18', 'M16 3v18', 'M5 7h6', 'M13 12h6', 'M5 17h6'],
  loop: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tS1 = T0('S1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['slime', 'Green slime', 'ON THE WATER TANK', 'slime'], ['moss', 'Velvet moss', 'ON THE COMPOUND WALL', 'moss'], ['tree', 'A tall tree', 'BY THE ROAD', 'tree']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: low and wet, tall and dry ---------- */
const hl = $('#hlS'), HS = {};
{ mk(hl, 'line', { x1: 36, y1: 440, x2: 700, y2: 440, stroke: C.dim, 'stroke-width': 3 });
  HS.tank = mk(hl, 'g', {}); mk(HS.tank, 'rect', { x: 60, y: 300, width: 170, height: 140, rx: 8, fill: '#D6E9F5', stroke: BR, 'stroke-width': 3.5 }); mk(HS.tank, 'rect', { x: 60, y: 300, width: 170, height: 26, fill: '#6FAE5E', opacity: 0.9 });
  mk(HS.tank, 'path', { d: 'M62,330 q14,8 28,0 t28,0 t28,0 t28,0 t28,0 t24,0', stroke: '#4E8A44', 'stroke-width': 3, fill: 'none' });
  HS.wall = mk(hl, 'g', {}); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) mk(HS.wall, 'rect', { x: 290 + c * 62 + (r % 2 ? 31 : 0) - (r % 2 ? 31 : 0) * (c === 2 ? 1 : 0), y: 300 + r * 35, width: 60, height: 33, fill: '#E4DCCB', stroke: '#CFC4AE', 'stroke-width': 2 });
  mk(HS.wall, 'path', { d: 'M286,304 C300,276 340,276 360,290 C380,272 430,276 470,300 L470,308 L286,308 Z', fill: '#6FAE5E', stroke: BR, 'stroke-width': 3 });
  HS.tree = mk(hl, 'g', {}); mk(HS.tree, 'path', { d: 'M592,440 L596,220 L612,220 L616,440 Z', fill: '#B08A5A', stroke: BR, 'stroke-width': 3 });
  mk(HS.tree, 'path', { d: 'M604,84 C670,88 690,140 676,180 C700,214 670,262 620,250 C596,268 540,256 548,214 C516,190 530,120 570,110 C576,92 590,84 604,84 Z', fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  HS.rule = mk(hl, 'path', { d: 'M730,440 L730,90 M720,100 L730,90 L740,100', stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
  HS.t0 = txt(hl, 145, 470, 'LOW · WET', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: WAT, 'font-weight': 600 });
  HS.t1 = txt(hl, 380, 470, 'LOW · DAMP', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
  HS.t2 = txt(hl, 604, 470, 'TALL · DRY AIR', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: C.ac, 'font-weight': 600 }); }
const SBR = [['leaf', 'The body', 'ROOTS · STEM · LEAVES'], ['pipes', 'The pipes', 'VASCULAR TISSUE'], ['loop', 'The dominant phase', 'n OR 2n'], ['drop', 'The need for water', 'FOR FERTILISATION']];
$('#sbs').innerHTML = SBR.map(([ic, n, s], i) => `<div class="sb" id="sb${i}" style="top:${84 + i * 94}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="sn">${n}</div><div class="ss">${s}</div></div>`).join('');

/* ---------- D: five groups ---------- */
const GT = [['Algae', 'Simple green bodies, mostly in water', wt('D2', 'Algae')], ['Bryophytes', 'Mosses and liverworts', wt('D2', 'Bryophytes')], ['Pteridophytes', 'Ferns and their relatives', wt('D2', 'Pteridophytes')],
  ['Gymnosperms', 'Naked seeds, like pines', wt('D3', 'Gymnosperms')], ['Angiosperms', 'Flowering plants, seeds inside fruits', wt('D3', 'Angiosperms')]];
$('#gts').innerHTML = GT.map(([n, s], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 308}px"><div class="gx">${i + 1} OF 5</div><svg id="gs${i}" width="288" height="230" style="position:absolute;left:0;top:0"></svg><div class="gn">${n}</div><div class="gs">${s}</div></div>`).join('');
{ spiro($('#gs0'), 144, 130, 1.2); moss($('#gs1'), 144, 156, 1.5, true); frond($('#gs2'), 144, 140, 0.72, true); pine($('#gs3'), 144, 126, 0.8); flowerPlant($('#gs4'), 144, 150, 0.7); }
const DA = [0, 1, 2, 3].map(i => mk($('#dwS'), 'path', { d: `M${36 + i * 308 + 292},266 l12,0 m-6,-8 l8,8 l-8,8`, stroke: C.ac, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
const TC = [['leaf', 'Body', 'body'], ['pipes', 'Pipes', 'pipes'], ['loop', 'Dominant phase', 'dominant'], ['drop', 'Need for water', 'water']];
$('#tcs').innerHTML = TC.map(([ic, n], i) => `<div class="tc" id="tc${i}">${M.icon(ic, 24, '#fff', 2.2)}${n}</div>`).join('');
const tTc = TC.map(c => wt('D4', c[2]));

/* ---------- Z: one plant from each group ---------- */
const ZN = ['ALGA', 'MOSS', 'FERN', 'PINE', 'FLOWERING PLANT'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')], tFlw = wt('Z5', 'flowering');
const LVI = [['GROUP 1 OF 5', 'Alga', 'A thallus: no true roots, stem or leaves.', 'Most algae live in water.'],
  ['GROUP 2 OF 5', 'Moss', 'Rhizoids hold it on. It looks leafy, but has no true organs.', 'No vascular tissue.'],
  ['GROUP 3 OF 5', 'Fern', 'True roots, stem and leaves.', 'The first vascular tissue: xylem for water, phloem for food.'],
  ['GROUPS 4 AND 5', 'Pine, flower', 'Pine: naked seeds on cones. Flowering plant: seeds inside a fruit.', '']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh" style="top:${i === 1 ? 336 : 300}px">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [], ZX = {};
{ const g = ZG[0];
  mk(g, 'path', { d: 'M300,330 C330,220 420,150 520,170 C600,186 640,120 720,140 C800,160 790,250 740,300 C700,340 760,400 700,430 C620,470 560,400 480,420 C400,440 300,430 300,330 Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M340,330 C400,280 470,260 540,270 C620,280 660,240 720,220', stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M40,470 q30,-14 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0', stroke: WAT, 'stroke-width': 4, fill: 'none' });
  LB[0] = [lab(g, 640, 250, 820, 170, 'Thallus'), lab(g, 400, 380, 220, 420, 'No true roots', 'end')];
  ZX.wat = txt(g, 960, 500, 'WATER', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.5, fill: WAT, 'font-weight': 600 }); }
{ const g = ZG[1];
  for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M${450 + k * 6},470 C${440 + k * 4},490 ${420 + k * 10},500 ${400 + k * 18},516`, stroke: '#9A7A4E', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M466,470 L466,170', stroke: '#4E7A34', 'stroke-width': 8, 'stroke-linecap': 'round' });
  for (let k = 0; k < 12; k++) { const yy = 456 - k * 24, sd = k % 2 ? 1 : -1, L = 76 - k * 3; mk(g, 'path', { d: `M466,${yy} q${sd * L * 0.5},-10 ${sd * L},-30 q${-sd * L * 0.3},22 ${-sd * L},30Z`, fill: LEAF, stroke: BR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); }
  LB[1] = [lab(g, 440, 500, 300, 490, 'Rhizoids', 'end'), lab(g, 520, 300, 700, 260, 'Leaf-like parts'), lab(g, 466, 380, 700, 400, 'Stem-like axis')]; }
{ const g = ZG[2];
  mk(g, 'path', { d: 'M150,400 C230,390 330,410 470,396', stroke: '#8A6A3A', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  [[200, 400], [260, 404], [330, 404], [400, 400], [450, 398]].forEach(([x, y], k) => mk(g, 'path', { d: `M${x},${y + 6} C${x - 10},${y + 40} ${x + 14},${y + 70} ${x - 6 + k * 3},${y + 110}`, stroke: '#9A7A4E', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
  frond(g, 240, 280, 1.0, false); frond(g, 340, 270, 1.1, false); frond(g, 430, 292, 0.9, false);
  ZX.ins = mk(g, 'g', {}); mk(ZX.ins, 'circle', { cx: 820, cy: 250, r: 160, fill: '#FBF8F0', stroke: '#CBD0DA', 'stroke-width': 2 });
  mk(ZX.ins, 'circle', { cx: 820, cy: 250, r: 120, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 4 });
  mk(ZX.ins, 'circle', { cx: 820, cy: 250, r: 62, fill: '#F6EBC8', stroke: GOLD, 'stroke-width': 4 });
  mk(ZX.ins, 'circle', { cx: 820, cy: 250, r: 34, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 4 });
  ZX.flowX = mk(ZX.ins, 'circle', { cx: 820, cy: 250, r: 20, fill: 'none', stroke: WAT, 'stroke-width': 4, 'stroke-dasharray': '6 6' });
  ZX.zl = [mk(g, 'line', { x1: 380, y1: 392, x2: 690, y2: 160, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(g, 'line', { x1: 380, y1: 404, x2: 690, y2: 340, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
  ZX.tag = mk(g, 'g', {}); mk(ZX.tag, 'rect', { x: 760, y: 430, width: 120, height: 36, rx: 8, fill: C.ink }); txt(ZX.tag, 820, 454, 'STEM x40', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1, fill: '#FFFFFF', 'font-weight': 600 });
  ZX.gh = mk(g, 'g', {}); mk(ZX.gh, 'rect', { x: 740, y: 476, width: 160, height: 30, rx: 7, fill: C.paper, stroke: C.dim, 'stroke-dasharray': '4 3' }); txt(ZX.gh, 820, 497, 'EXAMPLE FIGURES', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1.5 });
  LB[2] = [lab(g, 236, 200, 130, 120, 'Leaf', 'end'), lab(g, 170, 398, 110, 330, 'Stem', 'end'), lab(g, 200, 470, 110, 500, 'Roots', 'end'), lab(g, 808, 236, 700, 140, 'Xylem', 'end'), lab(g, 860, 300, 720, 470, 'Phloem', 'end')]; }
{ const g = ZG[3];
  pine(g, 210, 290, 1.35); ZX.cone = cone(g, 330, 380, 1.4);
  mk(g, 'line', { x1: 570, y1: 40, x2: 570, y2: 500, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  flowerPlant(g, 720, 300, 1.4);
  ZX.fruit = mk(g, 'g', {}); mk(ZX.fruit, 'ellipse', { cx: 880, cy: 300, rx: 54, ry: 44, fill: '#E59A7A', stroke: BR, 'stroke-width': 3 }); mk(ZX.fruit, 'ellipse', { cx: 880, cy: 300, rx: 40, ry: 30, fill: '#F6D6C6' });
  [[862, 296], [880, 306], [898, 294]].forEach(([x, y]) => mk(ZX.fruit, 'ellipse', { cx: x, cy: y, rx: 7, ry: 5, fill: '#F3E7C9', stroke: BR, 'stroke-width': 1.6 }));
  mk(g, 'path', { d: 'M760,300 L826,300', stroke: '#4E7A34', 'stroke-width': 4 });
  LB[3] = [lab(g, 342, 362, 430, 280, 'Cone'), lab(g, 320, 400, 390, 470, 'Naked seeds'), lab(g, 720, 150, 860, 110, 'Flower'), lab(g, 920, 280, 990, 220, 'Fruit', 'end'), lab(g, 880, 306, 930, 420, 'Seeds inside', 'end')]; }
const tLab = [[wt('Z2', 'thallus'), wt('Z2', 'roots')], [wt('Z3', 'rhizoids'), wt('Z3', 'leafy'), wt('Z3', 'stems')], [wt('Z4', 'roots'), wt('Z4', 'stem'), wt('Z4', 'roots') - 0.2, wt('Z4', 'xylem'), wt('Z4', 'phloem')],
  [wt('Z5', 'cones'), wt('Z5', 'naked'), wt('Z5', 'flowering'), wt('Z5', 'fruit') - 0.4, wt('Z5', 'fruit')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 104, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Pipes! So it can stand tall.' });

/* ---------- P: the tracker ---------- */
const GN = ['ALGAE', 'BRYOPHYTES', 'PTERIDOPHYTES', 'GYMNOSPERMS', 'ANGIOSPERMS'];
$('#pch').innerHTML = GN.map((n, i) => `<span class="zc" id="pc${i}">${i + 1} ${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const COLX = i => 284 + i * 168;
$('#ghs').innerHTML = GN.map((n, i) => `<div class="gh" id="gh${i}" style="left:${COLX(i) - 80}px">${n}</div>`).join('');
const RY = [130, 236, 340, 444];
$('#rls').innerHTML = [['Body', 0], ['Pipes', 1], ['Main plant', 2], ['Water for fertilisation', 3]].map(([n, i]) => `<div class="rl2" id="rl${i}" style="top:${RY[i] - (i === 3 ? 28 : 14)}px">${n}</div>`).join('');
const ps = $('#pS');
const CUR = mk(ps, 'rect', { x: 0, y: 74, width: 164, height: 438, rx: 14, fill: C.ac3, stroke: C.ac, 'stroke-width': 2.5 });
ps.insertBefore(CUR, ps.firstChild);
RY.forEach(y => mk(ps, 'line', { x1: 16, y1: y + 50, x2: 1040, y2: y + 50, stroke: C.line, 'stroke-width': 1.5 }));
const BODY = ['Thallus', 'No true organs', 'Roots, stem, leaves', 'Roots, stem, leaves', 'Roots, stem, leaves'], NFR = [0.88, 0.72, 0.26, 0.08, 0.06];
const CELL = GN.map((_, i) => { const x = COLX(i), c = {};
  c.body = mk(ps, 'g', {}); [() => spiro(c.body, x, RY[0] - 14, 0.62), () => moss(c.body, x, RY[0] - 18, 0.85), () => frond(c.body, x, RY[0] - 14, 0.24, false), () => pine(c.body, x, RY[0] - 20, 0.26), () => flowerPlant(c.body, x, RY[0] - 6, 0.26)][i]();
  c.bt = txt(c.body, x, RY[0] + 36, BODY[i], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 16, 'font-weight': 600, fill: C.ink });
  c.pipe = mk(ps, 'g', {});
  if (i >= 2) { c.x1 = mk(c.pipe, 'line', { x1: x - 14, y1: RY[1] - 30, x2: x - 14, y2: RY[1] + 14, stroke: WAT, 'stroke-width': 9, 'stroke-linecap': 'round' }); c.f1 = mk(c.pipe, 'line', { x1: x - 14, y1: RY[1] + 14, x2: x - 14, y2: RY[1] - 30, stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '5 9' });
    c.x2 = mk(c.pipe, 'line', { x1: x + 14, y1: RY[1] - 30, x2: x + 14, y2: RY[1] + 14, stroke: GOLD, 'stroke-width': 9, 'stroke-linecap': 'round' }); c.f2 = mk(c.pipe, 'line', { x1: x + 14, y1: RY[1] - 30, x2: x + 14, y2: RY[1] + 14, stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '5 9' });
    txt(c.pipe, x, RY[1] + 40, 'XYLEM + PHLOEM', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 0.8, fill: C.ink, 'font-weight': 600 }); }
  else { mk(c.pipe, 'path', { d: `M${x - 12},${RY[1] - 22} L${x + 12},${RY[1] + 2} M${x + 12},${RY[1] - 22} L${x - 12},${RY[1] + 2}`, stroke: C.dim, 'stroke-width': 4, 'stroke-linecap': 'round' }); txt(c.pipe, x, RY[1] + 36, 'NONE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 }); }
  c.ph = mk(ps, 'g', {}); const w = 136; mk(c.ph, 'rect', { x: x - w / 2, y: RY[2] - 26, width: w * NFR[i], height: 28, rx: 0, fill: HN }); mk(c.ph, 'rect', { x: x - w / 2 + w * NFR[i], y: RY[2] - 26, width: w * (1 - NFR[i]), height: 28, fill: DN });
  mk(c.ph, 'rect', { x: x - w / 2, y: RY[2] - 26, width: w, height: 28, rx: 6, fill: 'none', stroke: BR, 'stroke-width': 2 });
  txt(c.ph, x, RY[2] + 28, i < 2 ? 'GAMETOPHYTE · n' : 'SPOROPHYTE · 2n', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 0.6, fill: i < 2 ? HN : DN, 'font-weight': 600 });
  c.wa = mk(ps, 'g', {});
  if (i < 3) { drop(c.wa, x, RY[3] - 6, 1.1); c.sw = mk(c.wa, 'circle', { cx: x, cy: RY[3], r: 4, fill: HN }); txt(c.wa, x, RY[3] + 38, 'NEEDED', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: WAT, 'font-weight': 600 }); }
  else { mk(c.wa, 'circle', { cx: x - 22, cy: RY[3] - 14, r: 11, fill: HNL, stroke: HN, 'stroke-width': 2.5 }); c.tube = mk(c.wa, 'path', { d: `M${x - 14},${RY[3] - 6} C${x},${RY[3] + 10} ${x + 10},${RY[3] - 4} ${x + 26},${RY[3] + 6}`, stroke: HN, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
    txt(c.wa, x, RY[3] + 38, 'POLLEN TUBE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }
  return c; });
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(id => T0(id));
const RT = [[T0('P2') + 0.3, wt('P2', 'vascular'), wt('P2', 'haploid'), wt('P2', 'water')], [T0('P3') + 0.3, wt('P3', 'vascular'), wt('P3', 'haploid'), wt('P3', 'water')],
  [wt('P4', 'diploid') - 0.6, wt('P4', 'vascular'), wt('P4', 'diploid'), wt('P4', 'water')], [T0('P5') + 0.3, T0('P5') + 0.7, wt('P5', 'gametophytes'), wt('P5', 'tube')], [T0('P6') + 0.3, T0('P6') + 0.6, T0('P6') + 0.9, wt('P6', 'water')]];
const PI = [['FOUR TRENDS · FIVE GROUPS', 'The tracker', 'Watch each row change as we move along the line.'],
  ['GROUP 1 OF 5', 'Algae', 'Main body mostly haploid. No vascular tissue. Gametes meet in water.'],
  ['GROUP 2 OF 5', 'Bryophytes', 'Gametophyte is still the main plant. Still no pipes. Male gametes swim.'],
  ['GROUP 3 OF 5', 'Pteridophytes', 'The switch: sporophyte is the main plant, with vascular tissue. Water still needed.'],
  ['GROUP 4 OF 5', 'Gymnosperms', 'Gametophytes shrink and stay on the sporophyte. Pollen tube: no water needed.'],
  ['GROUP 5 OF 5', 'Angiosperms', 'Free from water too. Plus flowers, and seeds inside fruits.']];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 12 ? 44 : 54}px">${n}</div><div class="ld" style="font-size:25px;top:150px">${d}</div></div>`).join('');

/* ---------- S: heterospory ---------- */
const HPN = [['1 · TWO KINDS OF SPORES', '<i>Selaginella</i> and <i>Salvinia</i>: large megaspores, small microspores', 'S2'], ['2 · EMBRYO INSIDE', 'The young embryo starts inside the female gametophyte', 'S3'], ['3 · TOWARDS THE SEED', 'Seed plants keep the female gametophyte on the parent', 'S4']];
$('#hps').innerHTML = HPN.map(([h, s], i) => `<div class="hp" id="hp${i}" style="left:${36 + i * 516}px"><div class="hh">${h}</div><svg id="hq${i}" width="496" height="330" style="position:absolute;left:0;top:44px"></svg><div class="ht">${s}</div></div>`).join('');
const HX = {};
{ const a = $('#hq0'); HX.one = mk(a, 'g', {}); [[70, 120], [110, 120], [70, 160], [110, 160]].forEach(([x, y]) => mk(HX.one, 'circle', { cx: x, cy: y, r: 15, fill: HNL, stroke: HN, 'stroke-width': 2.5 }));
  txt(HX.one, 90, 220, 'MOST FERNS', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 }); txt(HX.one, 90, 240, 'ONE KIND', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 });
  HX.mega = mk(a, 'g', {}); mk(HX.mega, 'circle', { cx: 300, cy: 140, r: 62, fill: HNL, stroke: HN, 'stroke-width': 3.5 }); txt(HX.mega, 300, 240, 'MEGASPORE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: HN, 'font-weight': 600 });
  HX.micro = mk(a, 'g', {}); [[420, 100], [450, 126], [418, 150], [452, 172], [424, 194]].forEach(([x, y]) => mk(HX.micro, 'circle', { cx: x, cy: y, r: 10, fill: HNL, stroke: HN, 'stroke-width': 2.5 })); txt(HX.micro, 436, 240, 'MICROSPORES', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: HN, 'font-weight': 600 });
  const b = $('#hq1'); HX.fg = mk(b, 'g', {}); mk(HX.fg, 'circle', { cx: 248, cy: 160, r: 120, fill: HNL, stroke: HN, 'stroke-width': 4 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 182 + c * 44, y = 94 + r * 44; if (Math.hypot(x - 248, y - 160) < 100) mk(HX.fg, 'rect', { x: x - 20, y: y - 20, width: 40, height: 40, rx: 8, fill: '#E1F4F2', stroke: HN, 'stroke-width': 1.6 }); }
  HX.emb = mk(b, 'g', {}); HX.embI = mk(HX.emb, 'g', {}); [[238, 150], [258, 150], [238, 170], [258, 170]].forEach(([x, y]) => mk(HX.embI, 'circle', { cx: x, cy: y, r: 11, fill: DNL, stroke: DN, 'stroke-width': 2.5 }));
  HX.ebT = txt(b, 248, 314, 'YOUNG EMBRYO · 2n', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: DN, 'font-weight': 600 });
  const c = $('#hq2'); HX.sc = mk(c, 'g', {}); mk(HX.sc, 'path', { d: 'M90,250 C120,120 260,70 380,110 C400,180 360,240 300,262 Z', fill: '#C9A46A', stroke: BR, 'stroke-width': 3.5 });
  HX.ov = [[220, 170], [290, 150]].map(([x, y]) => { const Q = mk(c, 'g', {}); mk(Q, 'ellipse', { cx: x, cy: y, rx: 30, ry: 22, fill: '#F3E7C9', stroke: BR, 'stroke-width': 2.5 }); mk(Q, 'ellipse', { cx: x, cy: y, rx: 14, ry: 10, fill: HNL, stroke: HN, 'stroke-width': 2 }); return Q; });
  HX.ovT = txt(c, 248, 314, 'OVULE ON THE PARENT · NAKED', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1, fill: C.ink, 'font-weight': 600 }); }
const HA = [532, 1048].map(x => mk($('#hS'), 'path', { d: `M${x - 6},${296} l12,14 l-12,14`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));

/* ---------- V: bryophytes vs pteridophytes ---------- */
const VR = [['Fertilisation', 'Needs water', 'Needs water', 1, wt('C2', 'water'), wt('C2', 'water') + 0.3], ['Spreads by', 'Spores', 'Spores', 1, wt('C2', 'spores'), wt('C2', 'spores') + 0.3],
  ['Phases', 'Two, both multicellular', 'Two, both multicellular', 1, wt('C2', 'multicellular'), wt('C2', 'multicellular') + 0.3], ['Main plant', 'Gametophyte (n)', 'Sporophyte (2n)', 0, wt('C3', 'gametophyte'), wt('C3', 'sporophyte')],
  ['Vascular tissue', 'None', 'Xylem and phloem', 0, wt('C3', 'vascular'), wt('C3', 'xylem')]];
$('#vrs').innerHTML = VR.map(([k, a, b, same], i) => `<div class="vr" id="vr${i}" style="top:${100 + i * 92}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:320px;${i === 3 ? 'color:' + HN : ''}">${a}</div><div class="vt" id="vt${i}b" style="left:890px;${i === 3 ? 'color:' + DN : ''}">${b}</div>
  <div class="eq" id="eq${i}" style="background:${same ? C.soft : C.ac};color:${same ? C.mute : '#fff'}">${same ? 'SAME' : 'DIFFERENT'}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Which one can grow taller, and carry water up a stem: the moss, or the fern?', opts: ['The moss', 'The fern'], right: 1, why: 'The fern. Its xylem carries water up. A moss without pipes stays low.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">gametophyte <b style="color:${HN}">shrinks</b> · fertilisation stops needing <b style="color:${WAT}">water</b></span>`;

/* ---------- W: matching ---------- */
const MC = [['First vascular tissue, but water still needed', 2, 'W2'], ['Main plant body haploid, sporophyte attached', 0, 'W3'], ['Naked seeds, pollen carried by air', 3, 'W4'], ['Seeds enclosed inside fruits', 1, 'W5']];
const MG = ['Bryophytes', 'Angiosperms', 'Pteridophytes', 'Gymnosperms'];
$('#mcs').innerHTML = MC.map(([s], i) => `<div class="mc" id="mc${i}" style="top:${84 + i * 116}px"><div class="mn">${i + 1}</div><div class="mt2">${s}</div></div>`).join('') + MG.map((g, j) => `<div class="mg" id="mg${j}" style="top:${84 + j * 116}px">${g}</div>`).join('');
const MLN = MC.map(([s, j], i) => mk($('#wS'), 'path', { d: `M936,${132 + i * 116} C1060,${132 + i * 116} 1060,${132 + j * 116} 1180,${132 + j * 116}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none' }));
const tMc = MC.map(m => T0(m[2])), tMg = MC.map(m => wt(m[2], 'That'));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Bryophytes were the first plants with vascular tissue', right: 'Bryophytes have none. Pteridophytes came first.' });
const tS = $('#tS'), TP = {};
{ TP.m = moss(tS, 110, 140, 1.6); TP.mx = mk(tS, 'g', {}); mk(TP.mx, 'rect', { x: 50, y: 214, width: 120, height: 34, rx: 8, fill: C.redBg }); txt(TP.mx, 110, 237, 'NO PIPES', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: C.red, 'font-weight': 600 });
  TP.f = mk(tS, 'g', {}); mk(TP.f, 'circle', { cx: 330, cy: 130, r: 74, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 3.5 }); mk(TP.f, 'circle', { cx: 330, cy: 130, r: 38, fill: '#F6EBC8', stroke: GOLD, 'stroke-width': 3.5 }); mk(TP.f, 'circle', { cx: 330, cy: 130, r: 20, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3.5 });
  TP.fx = mk(tS, 'g', {}); mk(TP.fx, 'rect', { x: 250, y: 214, width: 160, height: 34, rx: 8, fill: C.okBg }); txt(TP.fx, 330, 237, 'FERN · PIPES', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: C.ok, 'font-weight': 600 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Statements: which group first had vascular tissue, or still needs water' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ASSERTION AND REASON', qW: 820,
  q: '<div class="sl"><b>A</b>Gymnosperms do not need external water for fertilisation.</div><div class="sl"><b>R</b>A pollen tube carries their male gametes to the archegonia.</div>',
  opts: ['Both A and R are true, and R explains A', 'Both A and R are true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'], right: 0, cols: 1, optW: 960, optY: 262, optH: 68, optFs: 27 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], ['A is true'], ['R is true'], ['Pollen reaches the ovule by air'], ['Tube carries the male gametes']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A1', 'Both'), wt('A1', 'reason'), wt('A2', 'Gymnosperm'), wt('A3', 'pollen')];
const fc = PUC.fcard($('#sF'), { x: 230, y: 262, w: 1460, h: 470, title: 'Recap · evolutionary trends in plants', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Body</b>: thallus → no true organs → true roots, stem and leaves', `<b>Pipes</b>: pteridophytes are the first with <span style="color:${WAT}">xylem</span> and <span style="color:${GOLD}">phloem</span>`,
    `<b>Main plant</b>: <span style="color:${HN}">gametophyte</span> in bryophytes → <span style="color:${DN}">sporophyte</span> from pteridophytes on`,
    `<b>Water</b>: needed up to pteridophytes · a pollen tube in seed plants`, '<b>Seed habit</b>: <i>Selaginella</i> and <i>Salvinia</i> make two kinds of spores'] });
const YQ = ['Which group first had vascular tissue?', 'In which group is the haploid gametophyte the main plant on land?', 'Why was making two kinds of spores a step towards seeds?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 31', topic: 'A sponge, a jellyfish, a cockroach: Basis of Animal Classification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('Z4', 'xylem') - 0.3, 1.06, 1040, 560], [tZ[3] - 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let w = 0; TC.forEach((_, i) => w += $('#tc' + i).offsetWidth); w += 3 * 16; let x = 800 - w / 2; TC.forEach((_, i) => { const e = $('#tc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
}

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
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis(HS.tank, t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis(HS.wall, t, tMorph + 0.6, 1e9, { dy: 20 }); M.vis(HS.tree, t, wt('H2', 'tree') - 0.2, 1e9, { dy: 30 });
    M.vis(HS.t0, t, wt('H2', 'wet'), 1e9, { dy: 6 }); M.vis(HS.t1, t, wt('H2', 'low'), 1e9, { dy: 6 }); M.vis(HS.t2, t, wt('H2', 'tall'), 1e9, { dy: 6 }); M.draw(HS.rule, t, wt('H2', 'tall') - 0.1, 0.6);
    M.vis($('#hlP'), t, wt('H2', 'plants') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, wt('H3', 'what') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { SBR.forEach((_, i) => M.vis($('#sb' + i), t, wt('H4', 'Four') + i * 0.25, 1e9, { dx: -16, dy: 0 })); M.vis($('#splP'), t, wt('H4', 'five') - 0.1, 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dw'), t, tD1 + 0.05, OUT('Z1'), { dy: 36, ...o });
    GT.forEach((g, i) => M.vis($('#gt' + i), t, g[2] - 0.15, 1e9, { dy: 24 })); DA.forEach((a, i) => M.vis(a, t, GT[i + 1][2] - 0.3, 1e9, POP));
    TC.forEach((_, i) => M.vis($('#tc' + i), t, tTc[i] - 0.1, 1e9, POP));
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.2) cur = k;
    const lit = i => i === cur || (cur === 3 && i === 4 && t >= tFlw - 0.1);
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = lit(i) ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    ZG.forEach((g, k) => { const tout = k < 3 ? tZ[k + 1] : 1e9; const on = M.vis(g, t, tZ[k] + (k ? 0.15 : 0.1), tout, { dy: 0, sc: 0.94, fade: 0.3, outDur: 0.3, osc: 1.04, ody: 0 }); if (on) LB[k].forEach((l, i) => labRun(l, t, tLab[k][i])); });
    M.vis(ZX.wat, t, tZ[0] + 0.6, 1e9, { dy: 6 });
    M.vis(ZX.ins, t, wt('Z4', 'Inside') - 0.2, 1e9, { ...POP, sc: 0.5 }); ZX.zl.forEach(l => M.draw(l, t, wt('Z4', 'Inside') - 0.3, 0.4)); M.vis(ZX.tag, t, wt('Z4', 'Inside') + 0.2, 1e9, POP); M.vis(ZX.gh, t, wt('Z4', 'Inside') + 0.4, 1e9, { dy: 6 });
    ZX.flowX.style.strokeDashoffset = (-(t * 18) % 12).toFixed(1);
    M.vis(ZX.fruit, t, wt('Z5', 'fruit') - 0.4, 1e9, { ...POP, sc: 0.4 });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'pipes') + 0.4, tZ[3] - 0.1);
  }

  /* P: tracker */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pch'), t, tP1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let st = -1; tPs.forEach((tt, i) => { if (t >= tt - 0.05) st = i; });
    GN.forEach((_, i) => { const el = $('#pc' + i), on = i === st ? 1 : 0, done = i < st ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      M.vis($('#gh' + i), t, tP1 + 0.4 + i * 0.08, 1e9, { dy: 8 }); $('#gh' + i).style.background = on ? C.ac : C.soft; $('#gh' + i).style.color = on ? '#FFFFFF' : C.mute; });
    [0, 1, 2, 3].forEach(i => M.vis($('#rl' + i), t, tP1 + 0.6 + i * 0.1, 1e9, { dx: -12, dy: 0 }));
    const cx = M.track(COLX(0), tPs.slice(1).map((tt, i) => [tt - 0.1, COLX(i + 1)]), M.SOFT)(t);
    attr(CUR, 'x', (cx - 82).toFixed(1)); M.vis(CUR, t, tPs[0] - 0.15, 1e9, { dy: 0, fade: 0.25 });
    CELL.forEach((c, i) => { [c.body, c.pipe, c.ph, c.wa].forEach((e, r) => M.vis(e, t, RT[i][r] - 0.1, 1e9, { ...POP, sc: 0.5 }));
      if (c.f1) { c.f1.style.strokeDashoffset = (-(t * 20) % 14).toFixed(1); c.f2.style.strokeDashoffset = (-(t * 16) % 14).toFixed(1); }
      if (c.sw) { const u = ((t * 0.7 + i * 0.3) % 1); attr(c.sw, 'cx', (COLX(i) - 8 + 16 * u).toFixed(1)); attr(c.sw, 'cy', (RY[3] + 4 - 8 * Math.sin(u * 6.28)).toFixed(1)); }
      if (c.tube) { c.tube.style.strokeDasharray = '40'; c.tube.style.strokeDashoffset = (40 * (1 - ((t * 0.6 + i * 0.2) % 1))).toFixed(1); } });
    PI.forEach((_, i) => M.vis($('#pi' + i), t, i ? tPs[i - 1] + 0.1 : tP1 + 0.4, i < 5 ? tPs[i] : 1e9, { dy: 20, outDur: 0.25, ody: -12 }));
  }

  /* S: heterospory */
  const sOn2 = t >= tS1 - 0.1 && t < tC1 + 0.1; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    M.vis($('#hs'), t, tS1 + 0.05, OUT('C1'), { dy: 36, ...o });
    const ts = [T0('S2'), T0('S3'), T0('S4')], cur = ts.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    HPN.forEach((_, i) => { const el = $('#hp' + i); M.vis(el, t, i ? ts[i] - 0.15 : tS1 + 0.4, 1e9, { dy: 24 }); el.style.background = i === cur ? C.ac2 : C.soft; });
    M.vis(HX.one, t, wt('S2', 'Most') - 0.1, 1e9, POP); M.vis(HX.mega, t, wt('S2', 'large') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(HX.micro, t, wt('S2', 'small') - 0.1, 1e9, { ...POP, sc: 0.3 });
    M.vis(HX.fg, t, wt('S3', 'megaspore') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(HX.emb, t, wt('S3', 'embryo') - 0.1, 1e9, { ...POP, sc: 0.2 }); M.vis(HX.ebT, t, wt('S3', 'embryo') + 0.2, 1e9, { dy: 6 });
    HX.embI.setAttribute('transform', `translate(248 160) scale(${(1 + 0.08 * Math.sin(t * 4)).toFixed(3)}) translate(-248 -160)`);
    M.vis(HX.sc, t, wt('S4', 'seed', 1) - 0.2, 1e9, { dy: 20 }); HX.ov.forEach((q, i) => M.vis(q, t, wt('S4', 'female') + i * 0.15, 1e9, { ...POP, sc: 0.3 })); M.vis(HX.ovT, t, wt('S4', 'parent') - 0.1, 1e9, { dy: 6 });
    HA.forEach((a, i) => M.vis(a, t, ts[i + 1] - 0.3, 1e9, POP));
  }

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT('C4'), { dy: 36, ...o });
    M.vis($('#vh0'), t, wt('C1', 'bryophytes') - 0.1, 1e9, POP); M.vis($('#vh1'), t, wt('C1', 'pteridophytes') - 0.1, 1e9, POP);
    let cur = -1; VR.forEach((v, i) => { if (t >= v[4] - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, v[4] - 0.15, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#vt' + i + 'a'), t, v[4], 1e9, { dx: -12, dy: 0 }); M.vis($('#vt' + i + 'b'), t, v[5], 1e9, { dx: -12, dy: 0 }); M.vis($('#eq' + i), t, v[5] + 0.3, 1e9, POP); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'moss') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Its') - 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'sporophyte') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'gametophyte') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    MG.forEach((_, j) => M.vis($('#mg' + j), t, tW1 + 0.4 + j * 0.1, 1e9, { dx: 16, dy: 0 }));
    MC.forEach(([s, j], i) => { M.vis($('#mc' + i), t, tMc[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.draw(MLN[i], t, tMg[i] - 0.2, 0.5);
      const on = M.io((t - tMg[i]) / 0.3), el = $('#mg' + j); el.style.background = mix('#FFFFFF', C.ac, on); el.style.borderColor = mix('#CBD0DA', C.ac, on); el.style.color = mix('#9AA0AC', '#FFFFFF', on); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'bryophytes') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Pteridophytes') - 0.1 });
    M.vis(TP.m, t, wt('X3', 'bryophytes') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(TP.mx, t, wt('X3', 'xylem') - 0.1, 1e9, POP);
    M.vis(TP.f, t, wt('X3', 'Pteridophytes') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(TP.fx, t, wt('X3', 'vascular') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Read') - 0.2, tCount, tAns });
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
