// PUC Biology Ep 17: Lichens and Symbiotic Relationships (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// canon + batch colours: alga = chlorophyll green, hypha cream tube, lichen body grey-green, food gold, water sky, minerals brown
const BR = '#2E2A24', CHL = '#3E9B5F', WAT = '#5AA0C8', GOLD = '#C9962B', MIN = '#8A6A3A', RED = '#D64545', NUC = '#7B4B94';
const HY = '#FBF8EE', LIC = '#A9B99A', LICD = '#5E6B52', ROCK = '#C9C4BA', ROCKD = '#8C867B', ALG = '#6DB27A', ALGD = '#1F5E37', LEAF = '#8CC48F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const tube = (g, d, w = 7) => [mk(g, 'path', { d, stroke: BR, 'stroke-width': w + 4.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), mk(g, 'path', { d, stroke: HY, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })];
const drawT = (tb, t, t0, d) => tb.forEach(p => M.draw(p, t, t0, d));
const lobes = (cx, cy, R, n, seed) => { const r = M.rng(seed), pts = []; for (let k = 0; k < n * 6; k++) { const a = k / (n * 6) * Math.PI * 2, w = 1 + 0.18 * Math.sin(a * n) + 0.06 * (r() - 0.5); pts.push([cx + R * w * Math.cos(a), cy + R * w * Math.sin(a) * 0.82]); } return 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z'; };
const lichen = (g, cx, cy, R, seed) => { mk(g, 'path', { d: lobes(cx, cy, R, 9, seed), fill: LIC, stroke: LICD, 'stroke-width': 2.5 }); mk(g, 'path', { d: lobes(cx, cy, R * 0.62, 7, seed + 1), fill: '#BCCAAE', stroke: LICD, 'stroke-width': 1.8 }); mk(g, 'path', { d: lobes(cx, cy, R * 0.3, 5, seed + 2), fill: '#CBD6BF', stroke: LICD, 'stroke-width': 1.5 }); };

Object.assign(M.IC, {
  rock: ['M3 18l3-8 5-3 6 2 4 6-1 3Z', 'M9 10l2 4'],
  wall: ['M3 5h18v15H3Z', 'M3 10h18', 'M3 15h18', 'M8 5v5', 'M15 10v5', 'M10 15v5'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tM1 = T0('M1'), tL1 = T0('L1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['rock', 'A rock by the road', 'COUNTRY ROAD', 'rock', 'PATCHES', ''], ['tree', 'Tree bark in the hills', 'CLEAN HILL AIR', 'bark', 'PATCHES', ''], ['wall', 'A wall in a smoky city', 'DIRTY AIR', 'wall', 'NONE', ' bad']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n.replace('A rock by the road', 'A roadside rock').replace('Tree bark in the hills', 'Tree bark').replace('A wall in a smoky city', 'A city wall')}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg, cl], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt${cl}" id="jt${i}">${tg}</div></div>`).join('');

/* ---------- D ---------- */
const dS = $('#dS');
const dA = mk(dS, 'g', {}); mk(dA, 'circle', { cx: 130, cy: 220, r: 66, fill: '#BFE0B4', stroke: ALGD, 'stroke-width': 4 }); mk(dA, 'ellipse', { cx: 118, cy: 210, rx: 26, ry: 16, fill: CHL }); txt(dA, 130, 330, 'ALGA', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, fill: ALGD, 'font-weight': 600 });
const dPl = txt(dS, 250, 236, '+', { 'text-anchor': 'middle', 'font-size': 56, fill: C.mute, 'font-weight': 600 });
const dF = mk(dS, 'g', {}); tube(dF, 'M300,170 C340,200 330,240 370,260 M330,200 C360,180 400,190 420,170 M350,240 C390,250 410,280 440,270', 7); txt(dF, 370, 330, 'FUNGUS', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, fill: BR, 'font-weight': 600 });
const dEq = txt(dS, 500, 236, '=', { 'text-anchor': 'middle', 'font-size': 56, fill: C.mute, 'font-weight': 600 });
const dL = mk(dS, 'g', {}); lichen(dL, 640, 220, 86, 4); txt(dL, 640, 330, 'LICHEN', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, fill: C.ac, 'font-weight': 600 });
const dBoth = mk(dS, 'g', {}); mk(dBoth, 'rect', { x: 36, y: 400, width: 712, height: 120, rx: 14, fill: C.soft });
txt(dBoth, 60, 446, 'SYMBIOTIC ASSOCIATION', { 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
const dBt = mk(dBoth, 'text', { x: 60, y: 490, 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink }); dBt.textContent = 'Two organisms together, both gain';
const DW = [['Phycobiont', 'the alga · phyco = alga', wt('D4', 'phycobiont'), ALGD], ['Mycobiont', 'the fungus · myco = fungus', wt('D4', 'mycobiont'), '#7A5A2E']];
$('#dws').innerHTML = DW.map(([a, b, , c], i) => `<div class="dfr" id="dw${i}" style="top:${84 + i * 120}px;height:104px"><div class="t" style="color:${c}">${a}</div><div class="d" style="top:58px">${b}</div></div>`).join('')
  + `<div class="pillp ac" id="dP" style="left:36px;top:340px">Alga + fungus = one lichen</div>`;

/* ---------- Z: zoom ladder ---------- */
const ZN = ['ROCK', 'LICHEN', 'THIN SLICE', 'ALGAL CELL'], ZS = ['x1', 'x10', 'x100', 'x1,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Rock', 'Flat, crusty patches, firmly stuck down.', 'Each patch is one lichen.'],
  ['RUNG 2 OF 4', 'Lichen', 'Wavy, leaf-like lobes.', 'Most of the body is made by the fungus.'],
  ['RUNG 3 OF 4', 'Thin slice', 'Packed hyphae at the top and bottom.', 'A thin green layer of algal cells in between.'],
  ['RUNG 4 OF 4', 'Algal cell', 'Wrapped tightly in fungal hyphae.', 'This is where the two partners trade.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[620, 250, 80], [560, 280, 50], [540, 236, 40], null];
const LAB = [];
{ const g = ZG[0];
  mk(g, 'path', { d: 'M120,470 C110,380 160,260 260,190 C360,120 520,100 660,120 C800,140 920,240 950,360 C970,430 950,470 940,480 Z', fill: ROCK, stroke: ROCKD, 'stroke-width': 5 });
  [[300, 300, 40], [620, 250, 80], [800, 360, 50], [430, 400, 34], [520, 170, 30]].forEach(([x, y, r], i) => lichen(g, x, y, r, 10 + i * 3));
  mk(g, 'path', { d: 'M0,480 L1056,480', stroke: '#8C867B', 'stroke-width': 4 });
  LAB[0] = [[200, 440, 160, 100, 'Rock', 'start'], [690, 230, 840, 120, 'Lichen patch', 'start']];
}
{ const g = ZG[1];
  mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#D3CEC4' });
  lichen(g, 520, 270, 210, 31);
  LAB[1] = [[690, 250, 820, 110, 'Leaf-like lobe', 'start'], [420, 300, 230, 470, 'Body mostly fungus', 'end']];
}
{ const g = ZG[2], r = M.rng(41);
  mk(g, 'rect', { x: 0, y: 420, width: 1056, height: 106, fill: ROCK, stroke: ROCKD, 'stroke-width': 4 });
  mk(g, 'rect', { x: 60, y: 80, width: 860, height: 320, rx: 30, fill: '#F6F1E3', stroke: BR, 'stroke-width': 4 });
  for (let row = 0; row < 3; row++) for (let k = 0; k < 28; k++) mk(g, 'path', { d: `M${70 + k * 31},${100 + row * 18} q8,-8 16,0 t16,0`, stroke: '#A8875A', 'stroke-width': 4, fill: 'none' });
  for (let k = 0; k < 24; k++) mk(g, 'circle', { cx: 90 + k * 34 + (r() - 0.5) * 8, cy: 190 + (r() - 0.5) * 18, r: 13, fill: ALG, stroke: ALGD, 'stroke-width': 2.5 });
  for (let k = 0; k < 18; k++) mk(g, 'path', { d: `M${80 + r() * 800},${230 + r() * 100} q${30 + r() * 30},${(r() - 0.5) * 60} ${70 + r() * 40},${(r() - 0.5) * 40}`, stroke: '#BFA57A', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  for (let row = 0; row < 2; row++) for (let k = 0; k < 28; k++) mk(g, 'path', { d: `M${70 + k * 31},${362 + row * 18} q8,-8 16,0 t16,0`, stroke: '#A8875A', 'stroke-width': 4, fill: 'none' });
  LAB[2] = [[330, 118, 330, 40, 'Packed hyphae (top)', 'middle'], [880, 190, 980, 190, 'Algal cells', 'end', 1], [540, 270, 600, 270, '', 'start', 1], [700, 372, 700, 470, 'Packed hyphae (bottom)', 'middle', 2]];
}
{ const g = ZG[3];
  mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#F6F1E3' });
  mk(g, 'circle', { cx: 528, cy: 263, r: 150, fill: '#BFE0B4', stroke: ALGD, 'stroke-width': 5 }); mk(g, 'path', { d: 'M440,230 C470,180 560,170 610,220 C640,260 600,320 540,316 C470,312 420,280 440,230 Z', fill: ALG, stroke: ALGD, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 600, cy: 330, r: 26, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 });
  tube(g, 'M200,120 C330,90 380,140 360,200 C340,260 330,330 390,390 C450,440 560,450 640,420', 12); tube(g, 'M880,110 C760,110 700,150 690,220 C680,290 720,340 800,420', 12); tube(g, 'M200,440 C300,450 380,420 420,400', 12);
  LAB[3] = [[620, 200, 700, 62, 'Algal cell (phycobiont)', 'end'], [340, 300, 300, 470, 'Fungal hypha (mycobiont)', 'start']];
}
const LB = LAB.map((L, lv) => L.filter(l => l[4]).map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : an === 'end' ? -12 : 0), y: ly + (an === 'middle' ? (ly < py ? -10 : 30) : 9), 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'rock') - 0.1, wt('Z2', 'lichen')], [wt('Z3', 'leaf'), wt('Z3', 'fungus')], [wt('Z4', 'top'), wt('Z4', 'algal'), wt('Z4', 'bottom')], [wt('Z5', 'algal'), wt('Z5', 'hyphae')]];

/* ---------- M: the trade ---------- */
const STEPS = [['The alga makes food', 'chlorophyll + sunlight: autotrophic'], ['Food goes to the fungus', 'no chlorophyll: heterotrophic'], ['The fungus gives shelter', 'its hyphae wrap the alga'],
  ['The fungus gives water + minerals', 'absorbed and passed to the alga'], ['Two organisms, one body', 'you would never guess it is two']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['M2', 'M3', 'M4', 'M5', 'M6'].map(id => T0(id) + 0.45);
const mS = $('#mS'), MG = mk(mS, 'g', {});
const sun = mk(MG, 'g', {}); mk(sun, 'circle', { cx: 110, cy: 110, r: 30, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(sun, 'line', { x1: 110 + 40 * Math.cos(a), y1: 110 + 40 * Math.sin(a), x2: 110 + 52 * Math.cos(a), y2: 110 + 52 * Math.sin(a), stroke: GOLD, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); }
const ray = mk(MG, 'path', { d: 'M150,150 q14,-14 28,0 t28,0 t28,0 t28,0', stroke: GOLD, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round', transform: 'rotate(35 150 150)' });
mk(MG, 'circle', { cx: 392, cy: 290, r: 110, fill: '#BFE0B4', stroke: ALGD, 'stroke-width': 5 }); mk(MG, 'path', { d: 'M330,270 C350,230 420,220 460,260 C480,290 450,330 400,330 C350,330 320,300 330,270 Z', fill: ALG, stroke: ALGD, 'stroke-width': 3 });
const mHy = [tube(MG, 'M120,220 C200,200 260,230 270,290 C280,350 300,410 380,430 C460,450 560,420 600,380', 11), tube(MG, 'M680,170 C580,170 520,200 510,260 C500,320 540,380 620,470', 11), tube(MG, 'M140,500 C220,510 300,480 340,420', 11)];
const ground = mk(MG, 'rect', { x: 36, y: 520, width: 712, height: 30, rx: 8, fill: ROCK });
const flows = [];
const rM = M.rng(77);
for (let k = 0; k < 7; k++) flows.push({ kind: 'f', e: mk(MG, 'circle', { r: 8, fill: GOLD, stroke: '#8A6614', 'stroke-width': 1.5 }), ph: k / 7 });
for (let k = 0; k < 6; k++) flows.push({ kind: k % 2 ? 'm' : 'w', e: k % 2 ? mk(MG, 'rect', { width: 14, height: 14, rx: 3, fill: MIN }) : mk(MG, 'path', { d: 'M0,-10 C6,-2 8,2 8,5 a8,8 0 1 1 -16,0 C-8,2 -6,-2 0,-10 Z', fill: WAT }), ph: k / 6 });
const mKey = mk(mS, 'g', {}); [[GOLD, 'FOOD'], [WAT, 'WATER'], [MIN, 'MINERALS']].forEach(([c, s], i) => { mk(mKey, 'circle', { cx: 300 + i * 150, cy: 44, r: 9, fill: c }); txt(mKey, 316 + i * 150, 50, s, { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: c === GOLD ? '#8A6614' : c }); });
const mLab = [[392, 200, 560, 110, 'Alga: autotrophic'], [600, 380, 600, 470, '']];
const mTag = [mk(mS, 'g', {}), mk(mS, 'g', {})];
{ const a = mTag[0]; mk(a, 'path', { d: 'M440,200 L520,120', stroke: C.ink, 'stroke-width': 2.5 }); mk(a, 'circle', { cx: 440, cy: 200, r: 6, fill: C.ink }); const t = mk(a, 'text', { x: 530, y: 126, class: 'zl', fill: ALGD }); t.textContent = 'Alga: autotrophic';
  const b = mTag[1]; mk(b, 'path', { d: 'M560,410 L620,470', stroke: C.ink, 'stroke-width': 2.5 }); mk(b, 'circle', { cx: 560, cy: 410, r: 6, fill: C.ink }); const u = mk(b, 'text', { x: 470, y: 504, class: 'zl' }); u.textContent = 'Fungus: heterotrophic'; }
const avM = PUC.avatar($('#sM'), { x: 976 + 36, y: 270 + 470 - 80, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A food-for-shelter deal!' });
// a point along an SVG path for flows
const along = (p, u) => { const L = p.getTotalLength(), q = p.getPointAtLength(L * M.clamp(u)); return [q.x, q.y]; };

/* ---------- L: pollution panels ---------- */
const LPN = [['CLEAN AIR · VILLAGE', 0, 6], ['SOME SMOKE · TOWN', 0.5, 3], ['DIRTY AIR · CITY', 1, 0]];
$('#lps').innerHTML = LPN.map(([h], i) => `<div class="lpn" id="lpn${i}" style="left:${36 + i * 520}px"><svg id="lpS${i}" width="496" height="380" style="position:absolute;left:0;top:0"></svg><div class="h">${h}</div></div>`).join('');
const LPL = LPN.map(([, smoke, n], i) => { const s = $('#lpS' + i);
  mk(s, 'path', { d: 'M40,360 C40,280 100,190 200,170 C300,150 420,180 460,260 C480,300 470,350 470,360 Z', fill: ROCK, stroke: ROCKD, 'stroke-width': 4 });
  const pos = [[150, 290], [250, 230], [360, 270], [200, 330], [330, 330], [410, 310]];
  const pl = pos.slice(0, 6).map(([x, y], k) => { const g = mk(s, 'g', {}); lichen(g, x, y, 28, 50 + k * 3 + i); return { g, x, y, on: k < n }; });
  const sm = [0, 1, 2].map(k => mk(s, 'ellipse', { cx: 120 + k * 130, cy: 90, rx: 70, ry: 26, fill: '#9AA0AC' }));
  return { pl, sm, smoke }; });

/* ---------- C: three relationships ---------- */
const C3 = [['Mutualism', '+  +', 'Both partners gain.', [['Lichen'], ['Mycorrhiza']], 'C2'], ['Commensalism', '+  0', 'One gains; the other is not affected.', [['Orchid on a mango branch']], 'C3'], ['Parasitism', '+  -', 'One gains; the other is harmed.', [['Albugo on mustard']], 'C4']];
$('#c3s').innerHTML = C3.map(([n, sg, d, ex], i) => `<div class="card c3" id="cc${i}" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:30px">TYPE ${i + 1}</div><div class="sgn" id="sg${i}">${sg}</div><svg id="cs${i}" width="512" height="300" style="position:absolute;left:0;top:70px"></svg>
  <div class="nm3">${n}</div><div class="ds3">${d}</div>${ex.map(([a], k) => `<div class="ex3" id="ce${i}${k}" style="top:484px;left:${32 + k * 170}px">${a}</div>`).join('')}</div>`).join('');
const cDr = [];
{ const s = $('#cs0'); lichen(s, 150, 150, 70, 61); tube(s, 'M300,90 L330,170 L310,240 M330,170 L380,200', 6); mk(s, 'path', { d: 'M260,240 C300,250 360,250 420,240', stroke: '#7A5A2E', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  const a = PUC.arrow(s, GOLD, 5, 14), b = PUC.arrow(s, WAT, 5, 14); cDr.push([0, a, [220, 110, 290, 90]], [0, b, [290, 200, 220, 190]]); }
{ const s = $('#cs1'); mk(s, 'path', { d: 'M40,180 C160,170 300,160 470,150', stroke: '#7A5A2E', 'stroke-width': 22, fill: 'none', 'stroke-linecap': 'round' });
  mk(s, 'path', { d: 'M380,150 C360,110 330,80 300,60 M380,150 C400,110 420,90 450,80 M380,150 C370,100 380,70 390,40', stroke: '#4E7A34', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  [[300, 60], [450, 80], [390, 40]].forEach(([x, y]) => mk(s, 'circle', { cx: x, cy: y, r: 13, fill: '#E7A9D0', stroke: '#8E3E73', 'stroke-width': 2.5 }));
  mk(s, 'path', { d: 'M370,165 l-8,40 M384,166 l4,44 M396,164 l14,36', stroke: '#A8A29A', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  [[120, 120, 'MANGO BRANCH'], [380, 250, 'ORCHID']].forEach(([x, y, s2]) => txt(s, x, y, s2, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 })); }
{ const s = $('#cs2'); s._leaf = mk(s, 'path', { d: 'M70,230 C110,90 290,40 440,70 C430,210 250,280 70,230 Z', fill: LEAF, stroke: BR, 'stroke-width': 4 });
  [[200, 150], [270, 180], [320, 120], [170, 200], [380, 110]].forEach(([x, y]) => mk(s, 'ellipse', { cx: x, cy: y, rx: 16, ry: 11, fill: '#FFFFFF', stroke: '#A8A29A', 'stroke-width': 2 }));
  s._hx = mk(s, 'g', {}); mk(s._hx, 'circle', { cx: 440, cy: 230, r: 24, fill: '#FBE6E6', stroke: RED, 'stroke-width': 3 }); mk(s._hx, 'path', { d: 'M428,242 L452,218 M428,218 L452,242', stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' }); }
const tCc = [T0('C2'), T0('C3'), T0('C4')];
const th1 = PUC.think($('#th1'), { q: 'A cattle egret catches insects stirred up by grazing cattle. The cattle are not affected. Mutualism or commensalism?', opts: ['Mutualism', 'Commensalism'], right: 1, why: 'Commensalism. The egret gains food, and the cattle neither gain nor lose.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad"><b>ALGA</b> food &nbsp;+&nbsp; <b>FUNGUS</b> shelter, water, minerals</span>';

/* ---------- W: sort board ---------- */
const SC3 = [['MUTUALISM', '+ +'], ['COMMENSALISM', '+ 0'], ['PARASITISM', '+ -']];
const SI = [['Lichen', 'alga + fungus', 0, wt('W2', 'mutualism')], ['Mycorrhiza', 'fungus + roots', 0, wt('W3', 'Mutualism')], ['Orchid on mango', 'epiphyte', 1, wt('W4', 'Commensalism')], ['Albugo on mustard', 'leaf harmed', 2, wt('W5', 'Parasitism')], ['Egret with cattle', 'cattle unaffected', 1, wt('W5', 'commensalism')]];
$('#scs').innerHTML = SC3.map(([h, sg], i) => `<div class="scol" id="sc${i}" style="left:${36 + i * 520}px"><div class="h">${h}<b style="color:var(--ac)">${sg}</b></div></div>`).join('')
  + SI.map(([n, w, c], i) => `<div class="sit" id="si${i}">${n}<em>${w}</em></div>`).join('');
const slot = [0, 0, 0], SIpos = SI.map(([, , c]) => { const k = slot[c]++; return [36 + c * 520 + 24, 84 + 72 + k * 74]; });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'In a lichen, the fungus makes the food', right: 'The alga makes the food; the fungus gives shelter, water and minerals' });
const tS = $('#tS'); const tAl = mk(tS, 'circle', { cx: 150, cy: 140, r: 56, fill: '#BFE0B4', stroke: ALGD, 'stroke-width': 4 }); const tAlc = mk(tS, 'ellipse', { cx: 140, cy: 134, rx: 22, ry: 13, fill: CHL });
const tHy = tube(tS, 'M260,70 C300,110 290,160 330,200 M300,120 C340,100 380,120 400,100', 8);
const tFood = PUC.arrow(tS, GOLD, 5, 14);
const tLb = [txt(tS, 150, 232, 'ALGA · MAKES FOOD', { 'text-anchor': 'middle', 'font-size': 15, fill: ALGD, 'letter-spacing': 1.2, 'font-weight': 600 }), txt(tS, 340, 240, 'FUNGUS', { 'text-anchor': 'middle', 'font-size': 15, fill: BR, 'letter-spacing': 1.2, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: [], type: 'One-line statements: which partner is autotrophic; lichens and polluted air' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ASSERTION AND REASON · ORIGINAL', qW: 800,
  q: '<div class="sl" style="margin-top:0"><b>A</b>Lichens are rarely found in heavily polluted cities.</div><div class="sl"><b>R</b>In a lichen, the mycobiont is autotrophic and the phycobiont is heterotrophic.</div>',
  opts: ['Both true; R explains A', 'Both true; R does not explain A', 'A is true; R is false', 'A is false; R is true'], right: 2, optW: 474, optY: 330, optH: 96, optFs: 24 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['<b>A</b> true: pollution indicator'], ['<b>R</b> false: roles swapped'], ['Phycobiont: autotrophic'], ['Mycobiont: heterotrophic']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'assertion'), wt('A3', 'reason'), wt('A3', 'phycobiont'), wt('A3', 'mycobiont')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · lichens and symbiotic relationships', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Lichen</b> = alga + fungus, both gain', '<b>Phycobiont</b> (alga): autotrophic, makes food', '<b>Mycobiont</b> (fungus): shelter, water, minerals', '<b>Pollution indicators</b>: absent from polluted areas',
    '<b>Mutualism</b> + + &nbsp;·&nbsp; <b>Commensalism</b> + 0 &nbsp;·&nbsp; <b>Parasitism</b> + -'] });
const YQ = ['What does each partner give the other in a lichen?', 'How is commensalism different from mutualism?', 'Why can lichens tell us about the air?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 18', topic: 'A cold no antibiotic can cure? Viruses and their Structure', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('M5') - 0.3, 1.05, 960, 600], [T0('L1') - 0.6, 1, 960, 540]]);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, (i < 2 ? wt('H2', 'covered') : wt('H2', 'none')) - 0.1 + (i === 1 ? 0.15 : 0), 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Why') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'not') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    M.vis($('#tq3 .lbl'), t, tH4, 1e9, { dy: 8 });
    [wt('H4', 'who'), wt('H4', 'what'), wt('H4', 'why')].forEach((tt, i) => M.vis($('#tq' + i), t, tt - 0.2, 1e9, { dx: -20, dy: 0 }));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, T0('D4') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(dBoth, t, wt('D2', 'symbiotic') - 0.1, 1e9, { dy: 16 });
    M.vis(dA, t, wt('D3', 'alga') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(dPl, t, wt('D3', 'and') - 0.05, 1e9, POP); M.vis(dF, t, wt('D3', 'fungus') - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis(dEq, t, T1('D3') - 0.1, 1e9, POP); M.vis(dL, t, wt('D2', 'lichen') - 0.1, 1e9, { ...POP, sc: 0.4 });
    DW.forEach((w, i) => M.vis($('#dw' + i), t, w[2] - 0.15, 1e9, { dx: -16, dy: 0 })); M.vis($('#dP'), t, wt('D4', 'fungus', 1) + 0.2, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tM1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('M1');
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
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
  }

  /* M: the trade */
  const mOn = t >= tM1 - 0.1 && t < tL1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('L1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#mr'), t, tM1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis(sun, t, tSt[0] - 0.2, 1e9, { ...POP, sc: 0.4 }); ray.style.opacity = M.clamp((t - tSt[0]) / 0.4); ray.style.strokeDasharray = '18 10'; ray.style.strokeDashoffset = (-(t * 40) % 28).toFixed(1);
    mHy.forEach((tb, i) => drawT(tb, t, (i ? tSt[2] : tSt[1] - 0.6) + i * 0.3, 0.9));
    M.vis(mTag[0], t, tSt[0] + 0.6, 1e9, { dy: 6 }); M.vis(mTag[1], t, wt('M3', 'heterotrophic') - 0.1, 1e9, { dy: 6 });
    M.vis(mKey, t, tSt[1], 1e9, { dy: 6 });
    // loops: food from alga out along hypha 0; water and minerals in along hypha 1 from the ground
    const p0 = mHy[0][1], p1 = mHy[1][1];
    flows.forEach(f => { const tt = f.kind === 'f' ? tSt[1] : tSt[3]; const u = t < tt ? -1 : ((t - tt) * 0.22 + f.ph) % 1; M.hide(f.e, u < 0); if (u < 0) return;
      const [x, y] = f.kind === 'f' ? along(p0, 0.42 - u * 0.42) : along(p1, 1 - u * 0.62); const op = Math.min(1, u * 6, (1 - u) * 6).toFixed(2);
      if (f.kind === 'w') attr(f.e, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); else if (f.kind === 'm') { attr(f.e, 'x', (x - 7).toFixed(1)); attr(f.e, 'y', (y - 7).toFixed(1)); } else { attr(f.e, 'cx', x.toFixed(1)); attr(f.e, 'cy', y.toFixed(1)); }
      f.e.style.opacity = op; });
    avM(t, wt('M4', 'shelter') + 0.4, T0('M5') + 1.5);
  }

  /* L: pollution */
  const lOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lp'), t, tL1 + 0.05, OUT('C1'), { dy: 36, ...o });
    const tl = [wt('L3', 'grow'), wt('L3', 'disappear') - 0.6, wt('L3', 'disappear')];
    LPN.forEach((_, i) => M.vis($('#lpn' + i), t, tL1 + 0.3 + i * 0.15, 1e9, { dy: 16 }));
    LPL.forEach((p, i) => { const fade = i === 0 ? 0 : M.io((t - tl[i]) / 0.8);
      p.pl.forEach((l, k) => { const keep = l.on ? 1 : 1 - fade; M.hide(l.g, keep <= 0.01); attr(l.g, 'transform', `translate(${l.x} ${l.y}) scale(${keep.toFixed(3)}) translate(${-l.x} ${-l.y})`); });
      p.sm.forEach((s, k) => { s.style.opacity = (p.smoke * 0.75 * M.io((t - tL1 - 0.6) / 0.8)).toFixed(2); attr(s, 'cx', (120 + k * 130 + 16 * Math.sin(t * 0.8 + k)).toFixed(1)); }); });
    M.vis($('#lpP'), t, wt('L2', 'pollution') - 0.1, 1e9, POP);
  }

  /* C: three relationships + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    C3.forEach((c, i) => { const el = $('#cc' + i); M.vis(el, t, i ? tCc[i] - 0.2 : tC1 + 0.2, out, { dy: 36, ...o });
      M.vis(el.querySelector('.nm3'), t, tCc[i] - 0.1, 1e9, { dy: 10 }); M.vis(el.querySelector('.ds3'), t, tCc[i] + 0.4, 1e9, { dy: 10 }); M.vis($('#sg' + i), t, tCc[i] + 0.2, 1e9, POP);
      el.style.borderTopColor = mix(C.dim, C.ac, M.io((t - tCc[i]) / 0.3)); });
    [[0, 0, 'lichen'], [0, 1, 'mycorrhiza'], [1, 0, 'orchid'], [2, 0, 'Albugo']].forEach(([i, k, w]) => M.vis($('#ce' + i + k), t, wt(C3[i][4], w) - 0.15, 1e9, POP));
    cDr.forEach(([i, a, m], k) => { const tt = tCc[i] + 0.8, u = ((t - tt) * 0.7 + k * 0.5) % 1; if (t < tt) { a.set(0, 0, 0, 0); return; } const s = M.io(Math.min(1, u * 2.2)); a.set(m[0], m[1], m[0] + (m[2] - m[0]) * s, m[1] + (m[3] - m[1]) * s); a.g.style.opacity = (1 - M.clamp((u - 0.75) / 0.25)).toFixed(2); });
    { const s = $('#cs2'), h = M.io((t - tCc[2] - 1) / 2); s._leaf.setAttribute('fill', mix(LEAF, '#D9C77A', h)); M.vis(s._hx, t, wt('C4', 'harmed') - 0.1, 1e9, POP); }
    M.vis($('#th1'), t, T0('C5') + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: T0('C5'), tOpts: wt('C5', 'Mutualism') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'egret') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'lichen') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'alga') - 0.1, 0.9);
  }

  /* W: sort */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    SC3.forEach((_, i) => M.vis($('#sc' + i), t, tW1 + 0.3 + i * 0.1, 1e9, { dy: 12 }));
    SI.forEach(([n], i) => { const el = $('#si' + i), ts = [wt('W2', 'lichen'), wt('W3', 'Mycorrhiza'), wt('W4', 'orchid'), wt('W5', 'Albugo'), wt('W5', 'egret')][i], tl = SI[i][3];
      const u = M.io((t - tl + 0.1) / 0.6), [x1, y1] = SIpos[i], x0 = 1100, y0 = 410;
      M.vis(el, t, ts - 0.15, 1e9, POP); el.style.left = (x0 + (x1 - x0) * u - (i === 0 ? 0 : 0)).toFixed(1) + 'px'; el.style.top = (y0 + 60 + (y1 - y0 - 60) * u).toFixed(1) + 'px';
      el.style.background = u >= 1 ? C.ac2 : '#FFFFFF'; el.style.boxShadow = u < 1 ? '0 8px 24px rgba(22,33,62,.14)' : 'none'; });
    M.vis($('#wP'), t, tW1 + 0.6, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'lichen') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'phycobiont') - 0.1 });
    M.vis(tAl, t, wt('X3', 'alga') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tAlc, t, wt('X3', 'chlorophyll') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(tLb[0], t, wt('X3', 'makes'), 1e9, { dy: 6 });
    drawT(tHy, t, wt('X3', 'mycobiont') - 0.2, 0.6); M.vis(tLb[1], t, wt('X3', 'mycobiont'), 1e9, { dy: 6 });
    { const tt = wt('X3', 'makes'), u = ((t - tt) * 0.7) % 1; if (t < tt) tFood.set(0, 0, 0, 0); else { const s = M.io(Math.min(1, u * 2)); tFood.set(210, 140, 210 + 70 * s, 140 - 30 * s); tFood.g.style.opacity = (1 - M.clamp((u - 0.75) / 0.25)).toFixed(2); } }
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'which') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Choose') - 0.2, tCount, tAns });
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
