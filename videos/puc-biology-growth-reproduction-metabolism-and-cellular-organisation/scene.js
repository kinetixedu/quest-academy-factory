// PUC Biology Ep 03: Growth, Reproduction, Metabolism and Cellular Organisation (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible canon): sugar/food gold, energy orange, nucleus violet, water sky, chlorophyll green
const BR = '#2E2A24', GRN = C.ac, MITO = '#E58A3C', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', SAND = '#E2C98F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const TICK = M.icon('check', 20, '#fff', 3.2), CROSS = M.icon('x', 20, '#fff', 3.2);
const STAR = 'M0,-14 L6,-3 L16,-2 L8,6 L10,16 L0,10 L-10,16 L-8,6 L-16,-2 L-6,-3 Z';

Object.assign(M.IC, {
  mule: ['M4 10.5h10.5a3 3 0 0 1 3 3V15H4Z', 'M15 11l3-5 3 1-.8 3.4-2.7 1.6', 'M18 6l.4-3.6', 'M19.6 6.5 21.2 3.4', 'M6 15v5', 'M9 15v5', 'M12.5 15v5', 'M15.5 15v5', 'M4 11c-1.6.2-2.2 2-2 4'],
  bee: ['M7 14c0-3 2.2-5 5-5s5 2 5 5-2.2 5.5-5 5.5S7 17 7 14Z', 'M7.6 12.5h8.8', 'M7.4 15.5h9.2', 'M10.5 9.4C8.5 6 9.4 3.4 11.2 3.9s1.4 3 .9 5.2', 'M13.5 9.4c2-3.4 1.1-6-.7-5.5', 'M12 19.5v2'],
  mound: ['M2 20c3-7 6-11 10-11s7 4 10 11Z', 'M9 14h.01', 'M14 16h.01', 'M12 12h.01'],
  worm: ['M3 12c2-3 5-3 7-2s4 2 6 1.5 3.6-2 5-1.5c-1 2.5-3 3.5-5 3.5s-4-1-6-1.5S5 13 3 12Z', 'M18.4 11h.01', 'M19.8 11h.01'],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  grow: ['M3 21h18', 'M6 21v-4', 'M11 21v-8', 'M16 21V8', 'M14 6l2-2.5L18 6'],
  repro: [ci(7, 12, 4.2), ci(17, 12, 4.2), 'M11.2 12h1.6'],
  mito: ['M2.5 12c0-3.6 4.2-6 9.5-6s9.5 2.4 9.5 6-4.2 6-9.5 6-9.5-2.4-9.5-6Z', 'M6 12c1-2 2 2 3 0s2 2 3 0 2 2 3 0 2 2 3 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H3') - 0.05, tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tG1 = T0('G1'), tR1 = T0('R1'), tM1 = T0('M1'), tC1 = T0('C1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['mule', 'A mule', 'NEVER HAS YOUNG', ['H1', 'mule']], ['bee', 'A worker bee', 'CANNOT REPRODUCE', ['H2', 'worker']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3][0], j[3][1]));

/* ---------- H ---------- */
const chip = (ok, s, id) => `<span class="och" id="${id}"><b style="background:${ok ? 'var(--ok)' : 'var(--red)'}">${ok ? M.icon('check', 14, '#fff', 3.4) : M.icon('x', 14, '#fff', 3.4)}</b>${s}</span>`;
const OC = [['mule', 'A mule', 'PULLS CARTS UP HILL ROADS', [[1, 'Eats'], [1, 'Breathes'], [1, 'Gets tired'], [0, 'Has young']]], ['bee', 'A worker bee', 'WORKS ALL LIFE FOR THE HIVE', [[1, 'Eats'], [1, 'Flies'], [1, 'Builds'], [0, 'Lays eggs']]]];
$('#ocs').innerHTML = OC.map(([ic, n, w, ch], i) => `<div class="oc" id="oc${i}" style="top:${84 + i * 200}px"><i>${M.icon(ic, 46, C.ac, 2)}</i><div class="on">${n}</div><div class="ow">${w}</div><div class="ochs">${ch.map(([k, s], j) => chip(k, s, `och${i}${j}`)).join('')}</div></div>`).join('');
const tOch = [[tMorph + 0.7, tMorph + 0.85, tMorph + 1.0, wt('H3', 'never')], [tMorph + 1.2, tMorph + 1.35, tMorph + 1.5, wt('H3', 'never', 1)]];
const hq = $('#hq'); hq.insertAdjacentHTML('beforeend', `<div id="hqQ" style="position:absolute;left:36px;top:84px;width:712px;font:700 40px/1.25 Poppins">Is making babies really a sign of life?</div>`);
const F4 = [['grow', 'Growth'], ['repro', 'Reproduction'], ['mito', 'Metabolism'], ['cell', 'Cellular organisation']];
$('#f4s').innerHTML = F4.map(([ic, n], i) => `<div class="f4" id="f4${i}" style="top:${226 + i * 76}px"><b>${i + 1}</b>${M.icon(ic, 30, C.ac, 2.2)}${n}</div>`).join('');

/* ---------- B: the test ---------- */
{ const s = $('#btS'); [[480, 552], [1000, 1120]].forEach(([a, b]) => { mk(s, 'line', { x1: a + 4, y1: 246, x2: b - 14, y2: 246, stroke: C.dim, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(s, 'path', { d: `M${b - 18},234 L${b - 2},246 L${b - 18},258 Z`, fill: C.dim }); }); }
$('#bt').insertAdjacentHTML('beforeend', `<div id="btR" style="position:absolute;left:36px;top:444px;display:flex;gap:14px;align-items:center"><span class="lbl" style="position:static">ON TRIAL TODAY</span>${F4.map(([ic, n], i) => `<span class="och" id="bf${i}" style="background:var(--soft);height:48px;font-size:22px">${M.icon(ic, 24, C.ac, 2.2)}${n}</span>`).join('')}</div>`);

/* ---------- G: growth ---------- */
const ga = $('#gaS'), GEN0 = [[[392, 240, 74]], [[334, 240, 56], [450, 240, 56]], [[342, 196, 46], [442, 196, 46], [342, 290, 46], [442, 290, 46]],
  [[254, 196, 42], [338, 196, 42], [446, 196, 42], [530, 196, 42], [254, 288, 42], [338, 288, 42], [446, 288, 42], [530, 288, 42]]];
// cell i in generation g comes from parent i>>1 in generation g-1 (g3 parents follow a 2x2 to 4x2 map)
const GEN = GEN0.map(g => g.map(([x, y, r]) => [392 + (x - 392) * 1.3, 240 + (y - 240) * 1.3, r * 1.3]));
const PAR = [null, [0, 0], [0, 1, 0, 1], [0, 0, 1, 1, 2, 2, 3, 3]];
const gBlob = mk(ga, 'rect', { rx: 40, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const gCells = [], gNucs = [];
for (let k = 0; k < 8; k++) { gCells.push(mk(ga, 'circle', { fill: '#E6F2DF', stroke: GRN, 'stroke-width': 4 })); gNucs.push(mk(ga, 'circle', { fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 })); }
const tGen = [0, wt('G3', 'two'), wt('G3', 'four'), T0('G4') + 0.2];
const gb = $('#gbS'), GX0 = 110, GY0 = 400, GW = 600, GH = 270;
mk(gb, 'line', { x1: GX0, y1: GY0, x2: GX0 + GW, y2: GY0, stroke: C.ink, 'stroke-width': 3 }); mk(gb, 'line', { x1: GX0, y1: GY0, x2: GX0, y2: GY0 - GH, stroke: C.ink, 'stroke-width': 3 });
txt(gb, GX0 + GW, GY0 + 34, 'AGE', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.5 }); txt(gb, GX0 + 12, GY0 - GH + 6, 'SIZE', { 'font-size': 16, 'letter-spacing': 1.5 });
const gPl = mk(gb, 'path', { d: `M${GX0},${GY0 - 10} C${GX0 + 200},${GY0 - 80} ${GX0 + 400},${GY0 - 170} ${GX0 + GW - 20},${GY0 - GH + 10}`, stroke: GRN, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const gAn = mk(gb, 'path', { d: `M${GX0},${GY0 - 10} C${GX0 + 80},${GY0 - 50} ${GX0 + 150},${GY0 - 90} ${GX0 + 230},${GY0 - 95} L${GX0 + GW - 20},${GY0 - 95}`, stroke: MITO, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const gPlT = txt(gb, GX0 + GW - 20, GY0 - GH - 4, 'PLANT · ALL LIFE', { 'text-anchor': 'end', 'font-size': 16, fill: GRN, 'font-weight': 600, 'letter-spacing': 1.2 });
const gAnT = txt(gb, GX0 + GW - 20, GY0 - 66, 'ANIMAL · UP TO AN AGE', { 'text-anchor': 'end', 'font-size': 16, fill: '#B35F22', 'font-weight': 600, 'letter-spacing': 1.2 });
// non living growth: mountain, boulder, sand mound with grains landing on top
const gm = $('#gmS');
const gMtn = mk(gm, 'path', { d: 'M40,420 L130,250 L170,300 L210,230 L300,420 Z', fill: '#C9C2B4', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
const gBld = mk(gm, 'path', { d: 'M330,420 C320,370 350,330 400,330 C450,330 470,370 462,420 Z', fill: '#B9B2A6', stroke: BR, 'stroke-width': 3.5 });
const gSand = mk(gm, 'path', { fill: SAND, stroke: '#A8884A', 'stroke-width': 3.5 });
const gGr = [0, 1, 2, 3, 4, 5].map(() => mk(gm, 'circle', { r: 6, fill: '#C9A65A' }));
mk(gm, 'line', { x1: 30, y1: 420, x2: 754, y2: 420, stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
const gmT = [['MOUNTAIN', 170], ['BOULDER', 396], ['SAND MOUND', 610]].map(([s, x]) => txt(gm, x, 456, s, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 }));
const gmA = [0, 1].map(k => mk(gm, 'path', { d: k ? 'M690,190 L650,250 m0,-18 l0,18 l18,-6' : 'M530,190 L570,250 m0,-18 l0,18 l-18,-6', stroke: C.ink, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));

/* ---------- R: reproduction ---------- */
const RN = ['BUDDING', 'REGENERATION', 'FRAGMENTATION', 'ONE CELL SPLITS'];
$('#rch').innerHTML = RN.map((n, i) => `<span class="zc2" id="rc${i}">${n}</span>${i < 3 ? `<span style="display:inline-flex">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tRm = [tR1 + 0.3, T0('R3'), T0('R4'), T0('R5')];
const RI = [['Budding', 'A small bud grows out of the parent, then breaks away as a new one.', ['Yeast', 'Hydra']],
  ['Regeneration', 'Each cut piece regrows its lost parts and becomes a whole new organism.', ['Planaria (a flatworm)']],
  ['Fragmentation', 'The body breaks into pieces, and each piece grows on.', ['Fungi', 'Threadlike algae', 'Moss protonema']],
  ['Grow = reproduce', 'In one celled organisms, one cell divides into two. More cells means more individuals.', ['Bacteria', 'One celled algae']]];
$('#ris').innerHTML = RI.map(([n, d, ex], i) => `<div class="mI" id="ri${i}"><div class="lbl" style="left:36px;top:30px">WAY ${i + 1} OF 4</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lx">${ex.map(e => `<span>${e}</span>`).join('')}</div></div>`).join('');
const NV = [['mule', 'Mule'], ['bee', 'Worker bee'], ['users', 'Couples who cannot have children']];
$('#nvs').innerHTML = NV.map(([ic, n], i) => `<div class="nv" id="nv${i}" style="top:${84 + i * 76}px${i === 2 ? ';font-size:21px' : ''}"><i>${M.icon(ic, 30, C.red, 2.2)}</i>${n}</div>`).join('');
const rs = $('#rS'), RG = [0, 1, 2, 3].map(() => mk(rs, 'g', {})), RLAB = [];
const lab = (g, px, py, lx, ly, s, an) => { mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }); mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const t = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); t.textContent = s; };
// mode 0: yeast budding
const yB = {};
{ const g = RG[0];
  yB.bud = mk(g, 'circle', { fill: '#F3EBD3', stroke: BR, 'stroke-width': 4 }); yB.bn = mk(g, 'circle', { r: 12, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 });
  mk(g, 'ellipse', { cx: 430, cy: 290, rx: 140, ry: 126, fill: '#F3EBD3', stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'circle', { cx: 410, cy: 300, r: 34, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(g, 'circle', { cx: 414, cy: 296, r: 11, fill: NUC });
  mk(g, 'circle', { cx: 480, cy: 340, r: 26, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 2.5 });
  lab(g, 320, 300, 200, 300, 'Parent cell', 'end'); lab(g, 410, 300, 300, 440, 'Nucleus', 'end'); lab(g, 566, 160, 720, 100, 'Bud', 'start'); lab(g, 480, 340, 620, 420, 'Vacuole', 'start');
}
// mode 1: Planaria cut into three, each regrows
const PL = 'M0,0 C10,-30 40,-42 70,-36 C150,-30 300,-26 420,-18 C470,-14 500,-6 510,0 C500,6 470,14 420,18 C300,26 150,30 70,36 C40,42 10,30 0,0 Z';
const plW = {};
{ const g = RG[1], dfs = mk(g, 'defs', {});
  plW.full = mk(g, 'g', {}); mk(plW.full, 'path', { d: PL, fill: '#D9B79A', stroke: BR, 'stroke-width': 4, transform: 'translate(270 190) scale(1)' });
  [[310, 178], [310, 202]].forEach(([x, y]) => mk(plW.full, 'circle', { cx: x, cy: y, r: 6, fill: BR }));
  plW.cut = [0, 1].map(k => mk(g, 'line', { x1: 270 + 170 * (k + 1), y1: 130, x2: 270 + 170 * (k + 1), y2: 250, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
  plW.mini = [0, 1, 2].map(k => { const e = mk(g, 'g', {}); mk(e, 'path', { d: PL, fill: '#D9B79A', stroke: BR, 'stroke-width': 4 / 0.36 }); mk(e, 'circle', { cx: 40, cy: -12, r: 6 / 0.36 * 0.6, fill: BR }); mk(e, 'circle', { cx: 40, cy: 12, r: 6 / 0.36 * 0.6, fill: BR }); return e; });
  plW.l = mk(g, 'g', {}); lab(plW.l, 290, 170, 190, 92, 'Planaria', 'end'); lab(plW.l, 310, 178, 420, 92, 'Eyespot', 'start');
  plW.l2 = mk(g, 'g', {}); [0, 1, 2].forEach(k => txt(plW.l2, 175 + k * 280, 470, ['PIECE 1', 'PIECE 2', 'PIECE 3'][k], { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 }));
}
// mode 2: fragmentation of a filament
const frC = [];
{ const g = RG[2]; for (let k = 0; k < 15; k++) { const e = mk(g, 'g', {}); mk(e, 'rect', { x: -22, y: -26, width: 44, height: 52, rx: 8, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 }); mk(e, 'path', { d: 'M-12,-14 C0,-20 8,10 12,14', stroke: '#3E9B5F', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); frC.push(e); }
  frC.lab = mk(g, 'g', {}); lab(frC.lab, 200, 230, 160, 120, 'Filament', 'end'); frC.lab2 = mk(g, 'g', {}); lab(frC.lab2, 530, 296, 640, 420, 'Fragment', 'start'); }
// mode 3: one bacterium divides into two
const bac = {};
{ const g = RG[3]; bac.a = mk(g, 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 4 }); bac.b = mk(g, 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 4 });
  bac.d = [0, 1].map(() => mk(g, 'path', { stroke: NUC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
  bac.t1 = txt(g, 528, 140, 'ONE CELL', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ink }); bac.t2 = txt(g, 528, 140, 'TWO CELLS, TWO NEW INDIVIDUALS', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, 'font-weight': 600, fill: GRN }); }
const rod = (cx, cy, L, H, waist = 0) => { const x0 = cx - L / 2, x1 = cx + L / 2, r = H / 2, w = r * (1 - waist);
  return `M${x0 + r},${cy - r} L${cx - 10},${cy - r} Q${cx},${cy - w} ${cx + 10},${cy - r} L${x1 - r},${cy - r} A${r},${r} 0 0 1 ${x1 - r},${cy + r} L${cx + 10},${cy + r} Q${cx},${cy + w} ${cx - 10},${cy + r} L${x0 + r},${cy + r} A${r},${r} 0 0 1 ${x0 + r},${cy - r} Z`; };
const avR = PUC.avatar($('#sR'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Cut it, and you get three!' });

/* ---------- M: metabolism ---------- */
const ma = $('#maS');
mk(ma, 'rect', { x: 36, y: 84, width: 712, height: 300, rx: 60, fill: '#F7F3E2', stroke: '#7A6A2E', 'stroke-width': 4 });
mk(ma, 'line', { x1: 392, y1: 120, x2: 392, y2: 350, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
txt(ma, 214, 130, 'FOOD BROKEN DOWN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600, fill: '#8A6418' });
txt(ma, 570, 130, 'NEW PARTS BUILT', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600, fill: GRN });
const mBd = [0, 1, 2, 3].map(() => mk(ma, 'circle', { r: 20, fill: GOLD, stroke: BR, 'stroke-width': 2.5 }));
const mBl = [0, 1, 2].map(() => mk(ma, 'line', { stroke: BR, 'stroke-width': 4 }));
const mSt = [0, 1, 2].map(() => mk(ma, 'path', { d: STAR, fill: MITO, stroke: '#B35F22', 'stroke-width': 2 }));
const mUp = [0, 1, 2, 3].map(() => mk(ma, 'circle', { r: 18, fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 }));
const mUl = [0, 1, 2].map(() => mk(ma, 'line', { stroke: BR, 'stroke-width': 4 }));
const mb = $('#mbS');
{ mk(mb, 'path', { d: 'M332,84 L332,330 A60,60 0 0 0 452,330 L452,84', fill: '#FFFFFF', stroke: BR, 'stroke-width': 4.5 });
  mk(mb, 'path', { d: 'M336,200 L448,200 L448,330 A56,56 0 0 1 336,330 Z', fill: '#D6E9F5' }); mk(mb, 'line', { x1: 318, y1: 84, x2: 466, y2: 84, stroke: BR, 'stroke-width': 5, 'stroke-linecap': 'round' }); }
const mbB = [0, 1, 2, 3, 4].map(() => mk(mb, 'circle', { r: 7, fill: '#FFFFFF', stroke: WAT, 'stroke-width': 2.5 }));
const mbC = mk(mb, 'g', {}); mk(mbC, 'circle', { cx: 620, cy: 220, r: 56, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 4 }); mk(mbC, 'circle', { cx: 620, cy: 220, r: 15, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 });
mk(mbC, 'line', { x1: 572, y1: 172, x2: 668, y2: 268, stroke: C.red, 'stroke-width': 7, 'stroke-linecap': 'round' }); txt(mbC, 620, 310, 'NO CELL', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.red });
const mbT = txt(mb, 160, 230, 'ONE REACTION', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });

/* ---------- C: cellular organisation + response ---------- */
const ca = $('#caS'), caC = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const x = 60 + c * 112, y = 92 + r * 120, e = mk(ca, 'g', {});
  mk(e, 'rect', { x, y, width: 104, height: 112, rx: 14, fill: '#F3F7EA', stroke: '#7A6A2E', 'stroke-width': 3 }); mk(e, 'circle', { cx: x + 52, cy: y + 56, r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 });
  mk(e, 'ellipse', { cx: x + 24, cy: y + 88, rx: 11, ry: 6, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 1.5 }); caC.push(e); }
const caH = mk(ca, 'rect', { x: 278, y: 208, width: 112, height: 120, rx: 18, fill: 'none', stroke: C.ac, 'stroke-width': 5, 'stroke-dasharray': '10 8' });
const cb = $('#cbS');
mk(cb, 'path', { d: 'M90,360 L110,300 L210,300 L230,360 Z', fill: '#C97B4A', stroke: BR, 'stroke-width': 3.5 });
const cbSun = mk(cb, 'g', {}); mk(cbSun, 'circle', { cx: 340, cy: 120, r: 26, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(cbSun, 'line', { x1: 340 + 34 * Math.cos(a), y1: 120 + 34 * Math.sin(a), x2: 340 + 46 * Math.cos(a), y2: 120 + 46 * Math.sin(a), stroke: GOLD, 'stroke-width': 3, 'stroke-linecap': 'round' }); }
const cbSt = mk(cb, 'path', { stroke: '#4E8A3A', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
const cbLf = [0, 1].map(() => mk(cb, 'path', { d: 'M0,0 C10,-16 30,-20 42,-12 C32,0 14,4 0,0 Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 2.5 }));
// day length dial: gold arc = hours of daylight
mk(cb, 'circle', { cx: 590, cy: 210, r: 90, fill: 'none', stroke: '#2B3A63', 'stroke-width': 18 });
const cbDay = mk(cb, 'circle', { cx: 590, cy: 210, r: 90, fill: 'none', stroke: GOLD, 'stroke-width': 18, transform: 'rotate(-90 590 210)' });
txt(cb, 590, 204, 'DAY', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ink }); txt(cb, 590, 228, 'LENGTH', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ink });
const cbH = txt(cb, 590, 340, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ink });

/* ---------- V: side by side ---------- */
const va = $('#vaS'), vaM = mk(va, 'path', { fill: SAND, stroke: '#A8884A', 'stroke-width': 4 }), vaG = [0, 1, 2, 3, 4, 5, 6].map(() => mk(va, 'circle', { r: 7, fill: '#C9A65A' }));
mk(va, 'line', { x1: 60, y1: 420, x2: 724, y2: 420, stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
const vb = $('#vbS'), vbC = [];
mk(vb, 'line', { x1: 60, y1: 420, x2: 724, y2: 420, stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
const vbStem = mk(vb, 'rect', { x: 340, width: 104, rx: 16, fill: '#E6F2DF', stroke: '#4E8A3A', 'stroke-width': 4 });
for (let k = 0; k < 9; k++) { const e = mk(vb, 'g', {}); mk(e, 'rect', { x: 350, y: -16, width: 84, height: 32, rx: 7, fill: '#CFE6C6', stroke: '#4E8A3A', 'stroke-width': 2 }); mk(e, 'circle', { cx: 392, cy: 0, r: 6, fill: NUC }); vbC.push(e); }
const th1 = PUC.think($('#th1'), { q: 'A worker bee cannot reproduce. Is it non living?', opts: ['Yes', 'No'], right: 1, why: 'No. It has cells, runs metabolism and responds. Reproduction is not defining.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">cells + metabolism inside them · <b>no exception</b></span>';

/* ---------- W: worked example grid ---------- */
const GHD = ['GROWS', 'REPRODUCES', 'METABOLISM', 'CELLS'], GCX = [520, 690, 860, 1030];
const WR = [['mule', 'A mule', [1, 0, 1, 1], 'LIVING', ['W2', ['grows', 'cannot', 'metabolises', 'cells', 'Still']]], ['mound', 'A sand mound', [2, 0, 0, 0], 'NON LIVING', ['W3', ['grows', 'Nothing', 'Nothing', 'Nothing', 'Non']]],
  ['flask', 'A test tube reaction', [0, 0, 1, 0], 'NEITHER', ['W4', ['Metabolism', 'Metabolism', 'Metabolism', 'cells', 'Neither']]], ['worm', 'A piece of Planaria', [1, 1, 1, 1], 'LIVING', ['W5', ['regrows', 'regrows', 'metabolism', 'cells', 'Living']]]];
$('#gws').innerHTML = GHD.map((h, j) => `<div class="gh" style="left:${GCX[j] + 20 - 100}px">${h}</div>`).join('') + `<div class="gh" style="left:1214px;width:330px">VERDICT</div>` +
  WR.map(([ic, n, ck, v], i) => `<div class="gr" id="gr${i}" style="top:${136 + i * 104}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="gnm">${n}</div>
  ${ck.map((s, j) => `<div class="gc" id="gc${i}${j}" style="left:${GCX[j] - 36}px;background:${s === 1 ? 'var(--ok)' : s === 2 ? GOLD : 'var(--red)'}">${s ? TICK : CROSS}</div>`).join('')}
  <div class="gv" id="gv${i}" style="background:${v === 'LIVING' ? 'var(--ac)' : v === 'NON LIVING' ? 'var(--redBg)' : 'var(--ink)'};color:${v === 'NON LIVING' ? 'var(--red)' : '#fff'}">${v}</div></div>`).join('');
const tWr = WR.map(([, , , , [id, ws]]) => ws.map((w, j) => wt(id, w) + (j > 0 && ws[j - 1] === w ? 0.25 * j : 0)));
const avW = PUC.avatar($('#sW'), { x: 160 + 1600 - 520, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the test tube is neither!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A metabolic reaction in a test tube is living', right: 'No cells: neither living nor non living, a living reaction' });
const tS = $('#tS');
mk(tS, 'path', { d: 'M120,40 L120,190 A40,40 0 0 0 200,190 L200,40', fill: '#FFFFFF', stroke: BR, 'stroke-width': 4 });
mk(tS, 'path', { d: 'M124,120 L196,120 L196,190 A36,36 0 0 1 124,190 Z', fill: '#D6E9F5' });
const tCl = mk(tS, 'g', {}); mk(tCl, 'circle', { cx: 330, cy: 140, r: 46, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 4 }); mk(tCl, 'line', { x1: 298, y1: 108, x2: 362, y2: 172, stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tLb = txt(tS, 330, 222, 'NO CELL', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'letter-spacing': 1.5, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Match the column: each way of reproduction with its organism' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Match Column I with Column II.<table><tr><td><b>P</b>Budding</td><td><b>1</b>Fungi</td></tr><tr><td><b>Q</b>Regeneration</td><td><b>2</b>Yeast</td></tr><tr><td><b>R</b>Fragmentation</td><td><b>3</b>Planaria</td></tr><tr><td><b>S</b>Spores</td><td><b>4</b>Protonema of mosses</td></tr></table>',
  opts: ['P-3, Q-2, R-4, S-1', 'P-2, Q-3, R-4, S-1', 'P-2, Q-4, R-3, S-1', 'P-1, Q-3, R-4, S-2'], right: 1, optW: 474, optY: 400, optFs: 30 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['Budding: yeast <b style="color:var(--ac)">P-2</b>'], ['Regeneration: Planaria <b style="color:var(--ac)">Q-3</b>'], ['Fragmentation: protonema <b style="color:var(--ac)">R-4</b>'], ['Spores: fungi <b style="color:var(--ac)">S-1</b>']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Budding'), wt('A2', 'Regeneration'), wt('A3', 'Fragmentation'), wt('A3', 'Spores')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · four features of life', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Growth</b>: living things from inside; mounds from outside', '<b>Reproduction</b>: budding, regeneration, fragmentation, spores', '<b style="color:var(--red)">Exceptions</b>: mules and worker bees never reproduce',
    '<b>Metabolism</b>: in all life; a test tube reaction is not alive', '<b style="color:var(--ac)">Defining</b>: cellular organisation, and response'] });
const YQ = ['How is a sand mound\'s growth different from a plant\'s?', 'Why can a mule not prove that reproduction defines life?', 'Why is a reaction in a test tube not alive?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 04', topic: 'One garden walk: how many kinds of living things?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() { geo = 1; const g = $('#tgh'); g.style.left = (960 - g.offsetWidth / 2) + 'px'; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#tgh'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    OC.forEach((_, i) => { M.vis($('#oc' + i), t, tMorph + 0.45 + i * 0.4, 1e9, { dy: 16 }); [0, 1, 2, 3].forEach(j => M.vis($('#och' + i + j), t, tOch[i][j], 1e9, POP)); });
    M.vis($('#hjP'), t, wt('H4', 'alive') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, T0('H3') + 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = wt('H4', 'So') - 0.2;
    M.vis($('#hkImg'), t, T0('H3') + 0.3, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, T0('H3') + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'learnt') - 0.1, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, T0('H3') + 0.2, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis(hq, t, kOut + 0.2, 1e9, { dy: 0, fade: 0.25 })) {
      M.rise($('#hqQ'), t, kOut + 0.25, { st: 0.05 });
      F4.forEach((_, i) => M.vis($('#f4' + i), t, tH5 + 1.0 + i * 0.35, 1e9, { dx: -16, dy: 0 }));
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tG1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#bt'), t, tB1 + 0.1, OUT('G1'), { dy: 36, ...o }); M.vis($('#bgh'), t, tB1 + 0.5, 1e9, { dy: 8 });
    M.vis($('#gt0'), t, T0('B2') - 0.1, 1e9, { dy: 20 }); M.vis($('#gt1'), t, T0('B3') - 0.1, 1e9, { dy: 20 });
    M.vis($('#gt2'), t, wt('B3', 'Only') - 0.1, 1e9, { ...POP, sc: 0.85 }); M.vis($('#btS'), t, wt('B3', 'Only'), 1e9, { dy: 0 });
    M.vis($('#btR'), t, T1('B3') - 1.6, 1e9, { dy: 10 }); F4.forEach((_, i) => M.vis($('#bf' + i), t, T1('B3') - 1.4 + i * 0.12, 1e9, POP));
  }

  /* G: growth */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#ga'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    let g = 0; for (let k = 1; k < 4; k++) if (t >= tGen[k]) g = k;
    const u = g ? M.io((t - tGen[g]) / 0.9) : 1, cur = GEN[g], prev = g ? GEN[g - 1] : GEN[0];
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    gCells.forEach((c, i) => { if (i >= cur.length) { M.hide(c, true); M.hide(gNucs[i], true); return; }
      const p = g ? prev[PAR[g][i]] : cur[i], q = cur[i], x = M.lerp(p[0], q[0], u), y = M.lerp(p[1], q[1], u), r = M.lerp(p[2], q[2], u) * (g ? 0.85 + 0.15 * u : 1);
      attr(c, 'cx', x.toFixed(1)); attr(c, 'cy', y.toFixed(1)); attr(c, 'r', r.toFixed(1)); attr(gNucs[i], 'cx', x.toFixed(1)); attr(gNucs[i], 'cy', y.toFixed(1)); attr(gNucs[i], 'r', (r * 0.28).toFixed(1));
      M.hide(c, t < tG1 + 0.4); M.hide(gNucs[i], t < tG1 + 0.4); x0 = Math.min(x0, x - r); x1 = Math.max(x1, x + r); y0 = Math.min(y0, y - r); y1 = Math.max(y1, y + r); });
    attr(gBlob, 'x', (x0 - 22).toFixed(1)); attr(gBlob, 'y', (y0 - 22).toFixed(1)); attr(gBlob, 'width', (x1 - x0 + 44).toFixed(1)); attr(gBlob, 'height', (y1 - y0 + 44).toFixed(1)); M.hide(gBlob, t < tG1 + 0.4);
    M.setT($('#gaN'), String(cur.length)); $('#gaT').lastChild.textContent = cur.length > 1 ? ' CELLS' : ' CELL'; M.vis($('#gaT'), t, tG1 + 0.6, 1e9, POP);
    M.vis($('#gaP0'), t, wt('G2', 'mass') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#gaP1'), t, wt('G5', 'replaces') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#gb'), t, T0('G4') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tSw = wt('G6', 'mountains') - 0.2, gOut = M.vis($('#gbS'), t, T0('G4'), tSw, { dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#gbL'), t, T0('G4'), tSw, { dy: 8, outDur: 0.2 }); M.vis($('#gbG'), t, T0('G4') + 0.3, tSw, { dy: 8, outDur: 0.2 });
    if (gOut) { M.draw(gPl, t, wt('G4', 'Plants'), 1.6); M.draw(gAn, t, wt('G4', 'Animals'), 1.6); M.vis(gPlT, t, wt('G4', 'Plants') + 1.2, 1e9, { dy: 6 }); M.vis(gAnT, t, wt('G4', 'Animals') + 1.2, 1e9, { dy: 6 }); }
    if (M.vis($('#gm'), t, tSw + 0.2, 1e9, { dy: 0, fade: 0.25 })) {
      M.vis(gMtn, t, wt('G6', 'mountains'), 1e9, { dy: 16 }); M.vis(gBld, t, wt('G6', 'boulders'), 1e9, { dy: 16 });
      const ts = wt('G6', 'sand'), sg = M.clamp((t - ts) / 5), H = 60 + 120 * sg, W = 120 + 60 * sg;
      attr(gSand, 'd', `M${610 - W},420 C${610 - W * 0.5},420 ${610 - W * 0.4},${420 - H} 610,${420 - H} C${610 + W * 0.4},${420 - H} ${610 + W * 0.5},420 ${610 + W},420 Z`); M.hide(gSand, t < ts - 0.1);
      gGr.forEach((d, i) => { const p = ((t - ts) * 0.8 + i / 6) % 1; attr(d, 'cx', (560 + i * 20).toFixed(1)); attr(d, 'cy', (150 + p * (270 - H)).toFixed(1)); d.style.opacity = t > ts ? (1 - M.clamp((p - 0.85) / 0.15)).toFixed(3) : '0'; });
      gmT.forEach((e, i) => M.vis(e, t, [wt('G6', 'mountains'), wt('G6', 'boulders'), ts][i] + 0.2, 1e9, { dy: 6 }));
      gmA.forEach(a => M.vis(a, t, wt('G6', 'surface') - 0.1, 1e9, { dy: 0, fade: 0.25 }));
      M.vis($('#gmP'), t, wt('G7', 'fails') - 0.1, 1e9, POP);
    }
  }

  /* R: reproduction */
  const rOn = t >= tR1 - 0.1 && t < tM1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('M1');
    M.vis($('#rch'), t, tR1 + 0.1, out, { dy: 12, ...o });
    M.vis($('#rd'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#ri'), t, tRm[0] - 0.4, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tRm.forEach((tt, i) => { if (t >= tt) cur = i; });
    RN.forEach((_, i) => { const el = $('#rc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    const tX = T0('R6') + 0.1;
    RI.forEach((_, i) => M.vis($('#ri' + i), t, tRm[i] + 0.1, i < 3 ? tRm[i + 1] : tX, { dy: 16, outDur: 0.25, ody: -10 }));
    RG.forEach((g, i) => { const on = M.clamp((t - tRm[i]) / 0.4) * (1 - M.clamp((t - (tRm[i + 1] ?? 1e9) + 0.1) / 0.3)); g.style.opacity = on.toFixed(3); M.hide(g, on <= 0); });
    // budding loop (4 s): bud grows, gets a nucleus, separates
    { const p = ((t - tRm[0]) / 4) % 1, gr = M.io(p / 0.55), sep = M.io((p - 0.6) / 0.3), a = -0.85, R = 140, r = 70 * gr, d = R + r * 0.55 + sep * 60;
      const x = 430 + d * Math.cos(a), y = 290 + d * Math.sin(a) * 0.9;
      attr(yB.bud, 'cx', x.toFixed(1)); attr(yB.bud, 'cy', y.toFixed(1)); attr(yB.bud, 'r', Math.max(0.1, r).toFixed(1)); yB.bud.style.opacity = (1 - M.clamp((p - 0.9) / 0.1)).toFixed(3);
      attr(yB.bn, 'cx', x.toFixed(1)); attr(yB.bn, 'cy', y.toFixed(1)); yB.bn.style.opacity = (M.clamp((p - 0.45) / 0.1) * (1 - M.clamp((p - 0.9) / 0.1))).toFixed(3); }
    // regeneration loop (6 s)
    { const p = ((t - tRm[1]) / 6) % 1, cutU = M.clamp(p / 0.15), sep = M.io((p - 0.18) / 0.2), re = M.io((p - 0.42) / 0.35), end = M.clamp((p - 0.92) / 0.08);
      plW.cut.forEach(c => { M.drawU(c, cutU); c.style.opacity = (1 - sep).toFixed(3); });
      plW.full.style.opacity = (1 - M.clamp(sep * 3)).toFixed(3); plW.l.style.opacity = (1 - M.clamp(sep * 3)).toFixed(3);
      plW.mini.forEach((m, k) => { const cx = 175 + k * 280, s = 0.3 + 0.18 * re, sx = 340 + 170 * k + (k - 1) * 90 * sep;
        const x = M.lerp(sx, cx, re) - 255 * s, y = 190 + 140 * sep; attr(m, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
        m.style.opacity = (M.clamp(sep * 3) * (1 - end)).toFixed(3); });
      plW.l2.style.opacity = (M.clamp((p - 0.5) / 0.1) * (1 - end)).toFixed(3); }
    // fragmentation loop (5 s): filament breaks in two places, each piece adds cells
    { const p = ((t - tRm[2]) / 5) % 1, br = M.io((p - 0.2) / 0.25), gr = M.io((p - 0.5) / 0.35), end = M.clamp((p - 0.92) / 0.08);
      frC.forEach((c, k) => { if (typeof k !== 'number') return; const piece = k < 5 ? 0 : k < 10 ? 1 : 2, x = 170 + k * 48 + (piece - 1) * 110 * br, y = 270;
        attr(c, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(1 - 0.1 * br).toFixed(3)})`); c.style.opacity = (1 - end).toFixed(3); });
      frC.lab.style.opacity = (1 - M.clamp(br * 3)).toFixed(3); frC.lab2.style.opacity = (M.clamp((p - 0.4) / 0.1) * (1 - end)).toFixed(3);
      // growth of each piece: show one extra cell appearing at each piece end
      if (!frC.ex) { frC.ex = [0, 1, 2].map(() => { const e = mk(RG[2], 'g', {}); mk(e, 'rect', { x: -22, y: -26, width: 44, height: 52, rx: 8, fill: '#E6F2DF', stroke: BR, 'stroke-width': 3 }); return e; }); }
      frC.ex.forEach((e, k) => { const lastK = k * 5 + 4, x = 170 + lastK * 48 + (k - 1) * 110 * br + 48, y = 270;
        attr(e, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(0.9 * gr).toFixed(3)})`); e.style.opacity = (gr * (1 - end)).toFixed(3); }); }
    // one cell splits (4 s)
    { const p = ((t - tRm[3]) / 4) % 1, el = M.io(p / 0.35), pin = M.io((p - 0.35) / 0.25), sep = M.io((p - 0.6) / 0.25), end = M.clamp((p - 0.92) / 0.08);
      if (sep <= 0) { attr(bac.a, 'd', rod(528, 290, 200 + 160 * el, 110, pin * 0.95)); M.hide(bac.b, true); }
      else { attr(bac.a, 'd', rod(528 - 90 - 80 * sep, 290, 180, 110)); attr(bac.b, 'd', rod(528 + 90 + 80 * sep, 290, 180, 110)); M.hide(bac.b, false); }
      bac.d.forEach((d, k) => { const cx = sep > 0 ? 528 + (k ? 1 : -1) * (90 + 80 * sep) : 528 + (k ? 1 : -1) * 70 * el; attr(d, 'd', `M${cx - 30},290 q10,-14 20,0 t20,0 t20,0`); M.hide(d, sep <= 0 && k === 1 && el < 0.3); });
      [bac.a, bac.b].concat(bac.d).forEach(e => { e.style.opacity = (1 - end).toFixed(3); });
      bac.t1.style.opacity = (1 - M.clamp(sep * 3)).toFixed(3); bac.t2.style.opacity = M.clamp(sep * 3) * (1 - end); }
    // the exceptions
    if (M.vis($('#rx'), t, tX, 1e9, { dy: 16 })) { NV.forEach((_, i) => M.vis($('#nv' + i), t, [wt('R6', 'mules'), wt('R6', 'worker'), wt('R6', 'couples')][i] - 0.1, 1e9, { dx: -16, dy: 0 })); M.vis($('#rxP'), t, wt('R6', 'fails') - 0.2, 1e9, POP); }
    avR(t, wt('R3', 'whole') + 0.2, T0('R4') - 0.2);
  }

  /* M: metabolism */
  const mOn = t >= tM1 - 0.1 && t < tC1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('C1');
    M.vis($('#ma'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const t0 = wt('M2', 'Food'), p = ((t - t0) / 3.2) % 1, on = t > t0 - 0.2 ? 1 : 0, sp = M.io((p - 0.25) / 0.35), fd = 1 - M.clamp((p - 0.9) / 0.1);
    mBd.forEach((b, i) => { const x = 130 + i * 56 + (i - 1.5) * 26 * sp, y = 250 + (i % 2 ? -1 : 1) * 30 * sp; attr(b, 'cx', x.toFixed(1)); attr(b, 'cy', y.toFixed(1)); b.style.opacity = on * fd; });
    mBl.forEach((l, i) => { attr(l, 'x1', 130 + i * 56); attr(l, 'y1', 250); attr(l, 'x2', 186 + i * 56); attr(l, 'y2', 250); l.style.opacity = on * (1 - sp); });
    mSt.forEach((s, i) => { const q = M.clamp((p - 0.4 - i * 0.08) / 0.4); attr(s, 'transform', `translate(${(160 + i * 60).toFixed(1)} ${(320 + 20 * q).toFixed(1)}) scale(${(0.5 + 0.6 * q).toFixed(3)})`); s.style.opacity = on * (q > 0 ? 1 - M.clamp((q - 0.7) / 0.3) : 0); });
    const t1 = wt('M2', 'built'), p2 = ((t - t1) / 3.2) % 1, on2 = t > t1 - 0.2 ? 1 : 0, jn = M.io((p2 - 0.2) / 0.4), fd2 = 1 - M.clamp((p2 - 0.9) / 0.1);
    mUp.forEach((b, i) => { const x = 480 + i * 56 + (i - 1.5) * 30 * (1 - jn), y = 250 + (i % 2 ? -1 : 1) * 40 * (1 - jn); attr(b, 'cx', x.toFixed(1)); attr(b, 'cy', y.toFixed(1)); b.style.opacity = on2 * fd2; });
    mUl.forEach((l, i) => { attr(l, 'x1', 480 + i * 56); attr(l, 'y1', 250); attr(l, 'x2', 536 + i * 56); attr(l, 'y2', 250); l.style.opacity = on2 * M.clamp((jn - 0.8) / 0.2) * fd2; });
    M.vis($('#maP0'), t, wt('M3', 'Every') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#maP1'), t, wt('M3', 'no') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#mb'), t, T0('M4') - 0.1, out, { dx: 60, dy: 0, ...o });
    mbB.forEach((b, i) => { const q = ((t - T0('M4')) * 0.5 + i / 5) % 1; attr(b, 'cx', 370 + (i % 3) * 22); attr(b, 'cy', (360 - q * 150).toFixed(1)); b.style.opacity = (1 - M.clamp((q - 0.8) / 0.2)).toFixed(3); });
    M.vis(mbT, t, wt('M4', 'test') - 0.1, 1e9, { dy: 6 }); M.vis(mbC, t, wt('M4', 'no') - 0.1, 1e9, { dy: 12, fade: 0.25 });
    M.vis($('#mbP0'), t, wt('M4', 'neither') - 0.1, 1e9, POP); M.vis($('#mbP1'), t, wt('M4', 'reaction', 1) - 0.2, 1e9, POP);
  }

  /* C: cellular organisation + response */
  const cOn = t >= tC1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#ca'), t, wt('C1', 'four') - 0.4, out, { dx: -60, dy: 0, ...o });
    caC.forEach((c, i) => M.vis(c, t, wt('C1', 'four') - 0.1 + (i % 6) * 0.05 + Math.floor(i / 6) * 0.08, 1e9, { dy: 14, fade: 0.2 }));
    M.draw(caH, t, wt('C1', 'organised', 1) - 0.1, 0.5); M.vis($('#caP'), t, wt('C1', 'Life') - 0.1, 1e9, POP);
    M.vis($('#cb'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const bn = M.io((t - wt('C3', 'shoot')) / 1.6), sw = Math.sin(t * 1.2) * 2 * bn, top = [160 + 70 * bn + sw, 160 + 10 * bn];
    attr(cbSt, 'd', `M160,300 C160,240 ${160 + 20 * bn},${200 + 10 * bn} ${top[0].toFixed(1)},${top[1].toFixed(1)}`);
    cbLf.forEach((l, i) => attr(l, 'transform', `translate(${(160 + 8 * bn).toFixed(1)} ${(250 - 6 * i).toFixed(1)}) rotate(${i ? -30 - 20 * bn : 200 - 10 * bn})`));
    [cbSt, ...cbLf].forEach(e => { e.style.opacity = M.clamp((t - T0('C2') - 0.2) / 0.3).toFixed(3); }); M.vis(cbSun, t, wt('C3', 'light') - 0.1, 1e9, POP);
    const tDl = wt('C3', 'Day'), hrs = 11 + 3 * (0.5 - 0.5 * Math.cos(Math.max(0, t - tDl) * 1.4)), L = 2 * Math.PI * 90;
    cbDay.style.strokeDasharray = `${(L * hrs / 24).toFixed(1)} ${L.toFixed(1)}`; M.setT(cbH, `${hrs.toFixed(1)} h of light`);
    [cbDay, cbH].forEach(e => M.vis(e, t, tDl - 0.1, 1e9, { dy: 0, fade: 0.3 }));
    M.vis($('#cbP0'), t, wt('C3', 'shoot') + 0.4, 1e9, { dx: -16, dy: 0 }); M.vis($('#cbP1'), t, tDl + 0.4, 1e9, { dx: -16, dy: 0 }); M.vis($('#cbP2'), t, wt('C4', 'aware') - 0.1, 1e9, POP);
  }

  /* V: side by side + think */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#va'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const ts = T0('V2'), sg = M.clamp((t - ts) / 4.5), H = 80 + 150 * sg, W = 150 + 90 * sg;
    attr(vaM, 'd', `M${392 - W},420 C${392 - W * 0.5},420 ${392 - W * 0.4},${420 - H} 392,${420 - H} C${392 + W * 0.4},${420 - H} ${392 + W * 0.5},420 ${392 + W},420 Z`);
    vaG.forEach((d, i) => { const p = ((t - ts) * 0.9 + i / 7) % 1; attr(d, 'cx', (332 + i * 20).toFixed(1)); attr(d, 'cy', (90 + p * (330 - H)).toFixed(1)); d.style.opacity = t > ts ? (1 - M.clamp((p - 0.85) / 0.15)).toFixed(3) : '0'; });
    M.vis($('#vaP'), t, wt('V2', 'grains') - 0.1, 1e9, POP);
    const tb = T0('V3'), n = Math.min(9, 4 + Math.floor(M.clamp((t - tb) / 4) * 5.99)), hgt = n * 34 + 14;
    attr(vbStem, 'y', 420 - hgt); attr(vbStem, 'height', hgt);
    vbC.forEach((c, k) => { if (k >= n) { M.hide(c, true); return; } M.hide(c, false); const fresh = k === n - 1 ? M.io(((t - tb) / 4 * 5.99) % 1 / 0.5) : 1; attr(c, 'transform', `translate(0 ${(420 - 24 - k * 34).toFixed(1)}) scale(1 ${(0.3 + 0.7 * fresh).toFixed(3)})`); });
    M.vis($('#vbP'), t, wt('V3', 'cells') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tV4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV4, tOpts: wt('V4', 'Yes') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'It') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'metabolism') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    $('#gws').querySelectorAll('.gh').forEach((h, j) => M.vis(h, t, tW1 + 0.4 + j * 0.08, 1e9, { dy: 8 }));
    WR.forEach((w, i) => { M.vis($('#gr' + i), t, T0(w[4][0]) - 0.1, 1e9, { dx: -20, dy: 0 }); [0, 1, 2, 3].forEach(j => M.vis($('#gc' + i + j), t, tWr[i][j], 1e9, { ...POP, sc: 0.3 })); M.vis($('#gv' + i), t, tWr[i][4] - 0.05, 1e9, POP); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'metabolic') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'neither') - 0.1 });
    M.vis(tS, t, wt('X2', 'test') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(tCl, t, wt('X3', 'cells') - 0.1, 1e9, { dy: 10, fade: 0.25 }); M.vis(tLb, t, wt('X3', 'cells') + 0.1, 1e9, { dy: 6 });
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
