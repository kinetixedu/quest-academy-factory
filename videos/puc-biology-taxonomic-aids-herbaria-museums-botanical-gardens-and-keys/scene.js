// PUC Biology Ep 09: Taxonomic Aids - Herbaria, Museums, Botanical Gardens and Keys (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// palette: live leaf green, dried leaf olive, paper cream, wood brown, water sky (canon), hibiscus red
const BR = '#2E2A24', LEAF = '#8CC48F', DRY = '#A9B77E', VEIN = '#D8ECD2', PAPER = '#FBF8EE', WOOD = '#B07A45', WAT = '#5AA0C8', RED = '#D1495B', GRN = C.ac;
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const pulse = (t, t0, d = 1.0) => M.io((t - t0) / 0.2) * (1 - M.io((t - t0 - d) / 0.3));

Object.assign(M.IC, {
  jar: ['M8 2h8', 'M9 2v3.5L7 8v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8l-2-2.5V2', 'M7 12h10'],
  tree: ['M12 22v-6', 'M12 3a6 6 0 0 0-5.6 8.2A4 4 0 0 0 8 18.9h8a4 4 0 0 0 1.6-7.7A6 6 0 0 0 12 3Z'],
  key: [ci(7.5, 15.5, 4.5), 'm21 2-9.6 9.6', 'm15.5 7.5 3 3L22 7l-3-3'],
  sheet: ['M6 2h9l5 5v15H6Z', 'M15 2v5h5', 'M12 18v-7', 'M12 13c-2-.5-3-2-3-4 2 .5 3 2 3 4Z', 'M12 15c2-.5 3-2 3-4-2 .5-3 2-3 4Z'],
  zoo: ['M3 21h18', 'M5 21V8', 'M9 21V8', 'M15 21V8', 'M19 21V8', 'M3 8h18', 'M12 3 3 8h18Z'],
  fly: [ci(12, 6, 2.6), 'M12 8.6c-1.8 0-2.8 2.2-2.8 5.4S10.6 21 12 21s2.8-3.8 2.8-7-1-5.4-2.8-5.4Z', 'M10 11C6 8 2 9.5 3 12.5s4.4 1.6 7-.5', 'M14 11c4-3 8-1.5 7 1.5s-4.4 1.6-7-.5'],
  bird: ['M16 7h.01', 'M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20', 'm20 7 2 .5-2 .5', 'M10 18v3', 'M14 17.75V21', 'M7 18a6 6 0 0 0 3.84-10.61'],
  cat: ['M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z', 'M8 14v.5', 'M16 14v.5', 'M11.25 16.25h1.5L12 17l-.75-.75Z'],
  frog: [ci(8, 7, 2.5), ci(16, 7, 2.5), 'M4 14c0-4 3.6-6 8-6s8 2 8 6-3.6 6-8 6-8-2-8-6Z', 'M7.5 15c1.4 1.3 2.8 1.8 4.5 1.8s3.1-.5 4.5-1.8'],
  search: [ci(11, 11, 7), 'm21 21-4.3-4.3'],
});

/* drawing helpers */
const leafD = (L, W) => `M0,0 C${L * .25},${-W} ${L * .7},${-W * .9} ${L},0 C${L * .7},${W * .9} ${L * .25},${W} 0,0 Z`;
function leaf(p, x, y, ang, L, W, fill = LEAF, vein = VEIN) {
  const g = mk(p, 'g', { transform: `translate(${x} ${y}) rotate(${ang})` });
  mk(g, 'path', { d: leafD(L, W), fill, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'line', { x1: 2, y1: 0, x2: L * .95, y2: 0, stroke: vein, 'stroke-width': 2.6, 'stroke-linecap': 'round' });
  for (let s = .18; s < .8; s += .16) [-1, 1].forEach(sg => mk(g, 'path', { d: `M${L * s},0 L${L * (s + .12)},${sg * W * .55 * Math.sin(Math.PI * (s + .1))}`, stroke: vein, 'stroke-width': 1.8, 'stroke-linecap': 'round' }));
  return g;
}
function flower(p, x, y, r, col = RED) { const g = mk(p, 'g', {});
  for (let k = 0; k < 5; k++) { const a = k * 72 - 90; mk(g, 'ellipse', { cx: x + r * .62 * Math.cos(a * Math.PI / 180), cy: y + r * .62 * Math.sin(a * Math.PI / 180), rx: r * .5, ry: r * .38, transform: `rotate(${a} ${x + r * .62 * Math.cos(a * Math.PI / 180)} ${y + r * .62 * Math.sin(a * Math.PI / 180)})`, fill: col, stroke: BR, 'stroke-width': 2.5 }); }
  mk(g, 'circle', { cx: x, cy: y, r: r * .22, fill: '#F2C96B', stroke: BR, 'stroke-width': 2 }); return g; }
// a twig: stem from (x,y) up h, alternate leaves, flower on top
function twig(p, x, y, h, s = 1, fill = LEAF, fl = RED) { const g = mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(g, 'path', { d: `M0,0 C6,${-h * .35} -8,${-h * .7} 0,${-h}`, stroke: '#6B5B3A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  [[.22, -1], [.42, 1], [.6, -1], [.78, 1]].forEach(([f, sg]) => leaf(g, 0, -h * f, sg > 0 ? -30 : -150, h * .42, h * .1, fill, fill === LEAF ? VEIN : '#E3E7C9'));
  flower(g, 0, -h - 6, h * .13, fl); return g; }
function LBmake(g, L) { return L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }); }
const LBrun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
// herbarium sheet (paper + pressed twig + tape + label box) at x,y size w x h
function hsheet(p, x, y, w, h, withLabel = true) { const g = mk(p, 'g', {});
  mk(g, 'rect', { x, y, width: w, height: h, rx: 6, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2.5 });
  twig(g, x + w * .45, y + h * .9, h * .7, 1, DRY, '#B5525C');
  [[.45, .62], [.45, .35]].forEach(([fx, fy]) => mk(g, 'rect', { x: x + w * fx - w * .09, y: y + h * fy - 5, width: w * .18, height: 10, rx: 2, fill: '#E9E1C8', stroke: '#BDB49A', 'stroke-width': 1.5, transform: `rotate(-12 ${x + w * fx} ${y + h * fy})` }));
  if (withLabel) { const lx = x + w * .6, ly = y + h * .82; mk(g, 'rect', { x: lx, y: ly, width: w * .34, height: h * .13, rx: 3, fill: '#fff', stroke: '#9A9178', 'stroke-width': 2 });
    for (let k = 0; k < 3; k++) mk(g, 'line', { x1: lx + 8, y1: ly + 12 + k * (h * .13 - 16) / 2.6, x2: lx + w * .34 - 10, y2: ly + 12 + k * (h * .13 - 16) / 2.6, stroke: '#C9C2AC', 'stroke-width': 2 }); }
  return g; }

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tG1 = T0('G1'), tC1 = T0('C1'), tC4 = T0('C4'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['leaf', 'A pressed leaf', 'IN AN OLD BOOK', 'leaf'], ['jar', 'A frog in a jar', 'IN A MUSEUM', 'frog'], ['tree', 'A labelled tree', 'IN A GARDEN', 'tree']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('search', 20, '#fff', 2.4)}HELPS NAME</div></div>`).join('');
{ const s = $('#cabS'); mk(s, 'rect', { x: 132, y: 84, width: 520, height: 390, rx: 12, fill: '#E9DCC4', stroke: BR, 'stroke-width': 4 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 156 + c * 122, y = 104 + r * 122;
    mk(s, 'rect', { x, y, width: 108, height: 108, rx: 6, fill: '#F5ECD8', stroke: '#8E6B3E', 'stroke-width': 2.5 }); hsheet(s, x + 14, y + 10, 80, 88, false); }
  var cabSheets = s; }

/* ---------- B ---------- */
const bS = $('#blS');
const unk = mk(bS, 'g', {}); mk(unk, 'rect', { x: 36, y: 96, width: 180, height: 340, rx: 12, fill: '#F3F7EA', stroke: '#9FCFAE', 'stroke-width': 2.5 }); twig(unk, 126, 414, 290, 0.8);
const unkQ = txt(unk, 126, 468, 'UNKNOWN', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 });
const REF = [['Hibiscus', '#E7A33E'], ['Hibiscus', RED], ['Jasmine', '#FFFFFF']].map(([n, fc], i) => { const g = mk(bS, 'g', {}), x = 240 + i * 172;
  mk(g, 'rect', { x, y: 96, width: 160, height: 340, rx: 10, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2.5 }); twig(g, x + 80, 414, 290, 0.8, DRY, fc);
  const nm = txt(g, x + 80, 468, ['SPECIES A', 'SPECIES B', 'SPECIES C'][i], { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2, 'font-weight': 600 }); return { g, nm, x }; });
const lensW = mk(bS, 'g', {}), lens = mk(lensW, 'g', {}); mk(lens, 'circle', { cx: 0, cy: 0, r: 34, fill: 'rgba(255,255,255,.35)', stroke: C.ink, 'stroke-width': 5 }); mk(lens, 'line', { x1: 24, y1: 24, x2: 52, y2: 52, stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' });
const match = mk(bS, 'rect', { x: 404, y: 88, width: 176, height: 396, rx: 14, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const AIS = [['sheet', 'Herbarium', 'DRIED, PRESSED PLANTS', 'herbarium'], ['tree', 'Botanical garden', 'LIVING PLANTS', 'botanical'], ['jar', 'Museum', 'PRESERVED SPECIMENS', 'museum'], ['zoo', 'Zoological park', 'LIVE WILD ANIMALS', 'zoological'], ['key', 'Key', 'PAIRS OF CHOICES', 'key']];
$('#ais').innerHTML = AIS.map(([ic, n, w], i) => `<div class="ai" id="ai${i}" style="top:${84 + i * 92}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="an">${n}</div><div class="aw">${w}</div></div>`).join('');
const tAi = AIS.map(a => wt('B4', a[3]));

/* ---------- Z: herbarium zoom ladder ---------- */
const ZN = ['SHEET', 'LABEL', 'CUPBOARD'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z4'), T0('Z6')];
const LVI = [['LEVEL 1 OF 3', 'Sheet', 'One dried, pressed plant, fixed flat on stiff paper.', 'Leaves, stem and a flower, all on one sheet.'],
  ['LEVEL 2 OF 3', 'Label', 'What it is, where, when, and who found it.', 'Without its label, a sheet is just a dry leaf.'],
  ['LEVEL 3 OF 3', 'Cupboard', 'Sheets stored in order, family by family.', 'Arranged by an accepted system of classification.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Like a passport for a plant!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[636, 452, 54], null, null];
hsheet(ZG[0], 340, 26, 380, 480);
const LAB0 = LBmake(ZG[0], [[530, 300, 830, 330, 'Pressed plant', 'start'], [522, 102, 830, 90, 'Flower', 'start'], [470, 250, 250, 200, 'Leaf', 'end'], [356, 470, 250, 470, 'Mounting sheet', 'end'], [700, 440, 830, 452, 'Label', 'start']]);
const tL0 = [wt('Z3', 'pressed'), wt('Z3', 'flower'), wt('Z3', 'leaves'), wt('Z3', 'stiff'), wt('Z4', 'label')];
const FR0 = mk(ZG[0], 'circle', { cx: FOC[0][0], cy: FOC[0][1], r: FOC[0][2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
// level 1: the label, large
const LF = [['DATE OF COLLECTION', '12 Oct 2026', 'date', 0], ['PLACE', 'Bengaluru', 'place', 0], ['ENGLISH NAME', 'China rose', 'English', 0], ['LOCAL NAME', 'Dasavala (Kannada)', 'local', 0],
  ['BOTANICAL NAME', 'Hibiscus rosa-sinensis', 'botanical', 1], ['FAMILY', 'Malvaceae', 'family', 0], ['COLLECTED BY', 'Diya', 'person', 0]];
{ const g = ZG[1]; mk(g, 'rect', { x: 120, y: 40, width: 816, height: 450, rx: 10, fill: '#fff', stroke: '#9A9178', 'stroke-width': 4 });
  mk(g, 'rect', { x: 120, y: 40, width: 816, height: 58, rx: 10, fill: '#F1ECDD' }); txt(g, 148, 78, 'HERBARIUM · SHEET LABEL', { 'font-size': 18, 'letter-spacing': 2, 'font-weight': 600, fill: '#6B5B3A' }); }
const LFE = LF.map(([k, v, , it], i) => { const col = i < 4 ? (i % 2) : 0, row = i < 4 ? Math.floor(i / 2) : i - 2, x = 156 + col * 400, y = 140 + row * 72, g = ZG[1];
  const kk = txt(g, x, y, k, { class: 'lf', 'font-size': 15 }); const vv = mk(g, 'text', { x, y: y + 32, class: 'lv2' }); vv.textContent = v; if (it) vv.style.fontStyle = 'italic';
  const ul = mk(g, 'line', { x1: x, y1: y + 42, x2: x + 360, y2: y + 42, stroke: '#E3DFD2', 'stroke-width': 2 }); return { kk, vv, ul }; });
const tLF = LF.map(f => wt(f[2] === 'person' || f[2] === 'family' ? 'Z5' : 'Z4', f[2]));
// level 2: cupboard arranged by family
{ const g = ZG[2]; mk(g, 'rect', { x: 210, y: 30, width: 640, height: 470, rx: 12, fill: '#E9DCC4', stroke: BR, 'stroke-width': 4 });
  ['Malvaceae', 'Poaceae', 'Solanaceae'].forEach((f, r) => { const y = 54 + r * 150; mk(g, 'rect', { x: 234, y, width: 592, height: 132, rx: 8, fill: '#F5ECD8', stroke: '#8E6B3E', 'stroke-width': 2.5 });
    mk(g, 'rect', { x: 250, y: y + 12, width: 200, height: 32, rx: 6, fill: '#fff', stroke: '#8E6B3E', 'stroke-width': 2 }); txt(g, 264, y + 34, f.toUpperCase(), { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: '#6B5B3A' });
    for (let k = 0; k < 6; k++) mk(g, 'rect', { x: 470 + k * 56, y: y + 20, width: 44, height: 100, rx: 4, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2 }); }); }
const newSheet = mk(ZG[2], 'g', {}); hsheet(newSheet, 0, 0, 44, 100, false);

/* ---------- P: process ---------- */
const PS = [['Collect', 'A healthy plant part, with leaves and flowers if possible.', 'P2'], ['Press', 'Laid flat between sheets of paper, and squeezed.', 'P3'], ['Dry', 'The paper soaks up the water until the plant is dry.', 'P4'], ['Mount', 'The dry plant is fixed on a herbarium sheet.', 'P5'], ['Label · store', 'The label is filled in; the sheet joins the collection.', 'P6']];
$('#sps').innerHTML = PS.map(([n], i) => `<div class="sp" id="sp${i}" style="left:${36 + i * 306}px"><b>${i + 1}</b>${n}</div>`).join('');
$('#pds').innerHTML = PS.map(([n, w], i) => `<div class="pd" id="pd${i}"><div class="ph">STAGE ${i + 1} OF 5</div><div class="pt">${n}</div><div class="pw">${w}</div></div>`).join('');
const tPs = PS.map(p => T0(p[2]) + 0.05);
const pS = $('#pS'), PG = [0, 1, 2, 3, 4].map(() => mk(pS, 'g', {}));
// 0 collect: plant in soil, cut line, twig lifts into a collecting folder
const pc = {}; { const g = PG[0]; mk(g, 'path', { d: 'M120,330 Q300,316 480,330', stroke: '#8E6B3E', 'stroke-width': 6, fill: 'none' }); mk(g, 'rect', { x: 120, y: 330, width: 360, height: 40, fill: '#D9C29A' });
  mk(g, 'path', { d: 'M300,330 L300,250', stroke: '#6B5B3A', 'stroke-width': 6 }); leaf(g, 300, 290, -160, 70, 16); leaf(g, 300, 280, -20, 70, 16);
  pc.tw = mk(g, 'g', {}); twig(pc.tw, 300, 250, 180, 1);
  pc.cut = mk(g, 'line', { x1: 270, y1: 252, x2: 330, y2: 244, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '6 5' });
  mk(g, 'rect', { x: 640, y: 150, width: 300, height: 200, rx: 10, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 3 }); txt(g, 790, 380, 'COLLECTING FOLDER', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 }); }
// 1 press: two boards squeeze paper with the twig between
const pp = {}; { const g = PG[1]; pp.bot = mk(g, 'rect', { x: 250, y: 250, width: 540, height: 34, rx: 6, fill: WOOD, stroke: BR, 'stroke-width': 3 });
  pp.pap = mk(g, 'g', {}); mk(pp.pap, 'rect', { x: 270, y: 210, width: 500, height: 40, rx: 4, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2.5 });
  pp.tw = mk(pp.pap, 'g', {}); leaf(pp.tw, 330, 230, 0, 160, 16, DRY, '#E3E7C9'); leaf(pp.tw, 500, 230, 0, 150, 15, DRY, '#E3E7C9'); mk(pp.tw, 'line', { x1: 300, y1: 230, x2: 720, y2: 230, stroke: '#6B5B3A', 'stroke-width': 4 });
  pp.top = mk(g, 'rect', { x: 250, y: 172, width: 540, height: 34, rx: 6, fill: WOOD, stroke: BR, 'stroke-width': 3 });
  pp.ar = [mk(g, 'path', { d: 'M520,60 v60 m-16,-16 l16,16 l16,-16', stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), mk(g, 'path', { d: 'M520,350 v-50 m-16,16 l16,-16 l16,16', stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })]; }
// 2 dry: paper stack, water drops rising away, a water bar emptying
const pd = {}; { const g = PG[2]; for (let k = 0; k < 4; k++) mk(g, 'rect', { x: 230 + k * 6, y: 230 - k * 14, width: 440, height: 30, rx: 4, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2.5 });
  pd.drops = [0, 1, 2, 3, 4, 5].map(k => mk(g, 'path', { d: 'M0,-12 C6,-4 9,2 9,6 a9,9 0 0 1 -18,0 C-9,2 -6,-4 0,-12 Z', fill: WAT, stroke: '#3B7FA6', 'stroke-width': 2 }));
  mk(g, 'rect', { x: 780, y: 80, width: 60, height: 240, rx: 10, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); pd.bar = mk(g, 'rect', { x: 786, y: 86, width: 48, height: 228, rx: 6, fill: WAT });
  txt(g, 810, 350, 'WATER', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600, fill: '#3B7FA6' }); }
// 3 mount: dry twig drops onto a sheet, tape strips appear
const pm = {}; { const g = PG[3]; mk(g, 'rect', { x: 380, y: 30, width: 260, height: 330, rx: 6, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 3 });
  pm.tw = mk(g, 'g', {}); twig(pm.tw, 510, 330, 240, 1, DRY, '#B5525C');
  pm.tape = [[510, 270], [508, 180], [512, 120]].map(([x, y]) => mk(g, 'rect', { x: x - 30, y: y - 6, width: 60, height: 12, rx: 2, fill: '#E9E1C8', stroke: '#BDB49A', 'stroke-width': 1.5, transform: `rotate(-12 ${x} ${y})` })); }
// 4 label + store: label lines write, sheet slides into the cupboard
const pl = {}; { const g = PG[4]; mk(g, 'rect', { x: 620, y: 30, width: 340, height: 330, rx: 10, fill: '#E9DCC4', stroke: BR, 'stroke-width': 3.5 });
  for (let k = 0; k < 5; k++) mk(g, 'rect', { x: 640 + k * 62, y: 60, width: 50, height: 260, rx: 4, fill: PAPER, stroke: '#BDB49A', 'stroke-width': 2 });
  pl.sh = mk(g, 'g', {}); hsheet(pl.sh, 0, 0, 200, 300, true);
  pl.lines = [0, 1, 2].map(k => mk(pl.sh, 'line', { x1: 128, y1: 254 + k * 9, x2: 182, y2: 254 + k * 9, stroke: C.ink, 'stroke-width': 2.2 })); }

/* ---------- G: garden, museum, zoo ---------- */
{ const s = $('#g0S'); mk(s, 'line', { x1: 32, y1: 262, x2: 480, y2: 262, stroke: '#8E6B3E', 'stroke-width': 4 });
  mk(s, 'rect', { x: 160, y: 170, width: 26, height: 92, fill: '#8E6B3E', stroke: BR, 'stroke-width': 3 });
  mk(s, 'path', { d: 'M173,70 C110,70 86,120 100,152 C70,170 92,214 132,206 C150,226 200,226 214,206 C256,212 272,168 246,150 C262,116 236,70 173,70 Z', fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  mk(s, 'line', { x1: 380, y1: 262, x2: 380, y2: 196, stroke: '#6B5B3A', 'stroke-width': 6 }); mk(s, 'rect', { x: 290, y: 130, width: 190, height: 74, rx: 8, fill: '#fff', stroke: BR, 'stroke-width': 3 });
  txt(s, 306, 162, 'Mangifera indica', { 'font-family': 'Poppins', 'font-size': 19, 'font-style': 'italic', 'font-weight': 600, fill: C.ink }); txt(s, 306, 188, 'ANACARDIACEAE', { 'font-size': 14, 'letter-spacing': 1, 'font-weight': 600 }); }
{ const s = $('#g1S'); // jar with frog + insect box
  mk(s, 'rect', { x: 64, y: 96, width: 170, height: 166, rx: 22, fill: '#DCEBF3', stroke: BR, 'stroke-width': 3.5 }); mk(s, 'rect', { x: 84, y: 72, width: 130, height: 30, rx: 6, fill: '#B9A27A', stroke: BR, 'stroke-width': 3 });
  mk(s, 'line', { x1: 66, y1: 132, x2: 232, y2: 132, stroke: '#9FC4D8', 'stroke-width': 3 });
  mk(s, 'path', { d: 'M110,220 C108,180 130,164 150,164 C170,164 192,180 190,220 C200,232 186,244 172,236 C160,248 140,248 128,236 C114,244 100,232 110,220 Z', fill: '#9DBF7A', stroke: BR, 'stroke-width': 3 });
  mk(s, 'circle', { cx: 136, cy: 176, r: 8, fill: '#fff', stroke: BR, 'stroke-width': 2.5 }); mk(s, 'circle', { cx: 164, cy: 176, r: 8, fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
  mk(s, 'rect', { x: 276, y: 110, width: 190, height: 150, rx: 8, fill: '#F5ECD8', stroke: BR, 'stroke-width': 3.5 });
  [[322, 150], [420, 150], [322, 220], [420, 220]].forEach(([x, y], k) => { mk(s, 'ellipse', { cx: x - 10, cy: y, rx: 14, ry: 9, fill: ['#C9962B', '#D1495B', '#5AA0C8', '#8CC48F'][k], stroke: BR, 'stroke-width': 2, transform: `rotate(-25 ${x - 10} ${y})` });
    mk(s, 'ellipse', { cx: x + 10, cy: y, rx: 14, ry: 9, fill: ['#C9962B', '#D1495B', '#5AA0C8', '#8CC48F'][k], stroke: BR, 'stroke-width': 2, transform: `rotate(25 ${x + 10} ${y})` });
    mk(s, 'line', { x1: x, y1: y - 12, x2: x, y2: y + 12, stroke: BR, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(s, 'circle', { cx: x, cy: y - 2, r: 3, fill: '#E9E1C8', stroke: BR, 'stroke-width': 1.5 }); }); }
{ const s = $('#g2S'); // enclosure: pond, tree, elephant, fence
  mk(s, 'line', { x1: 32, y1: 262, x2: 480, y2: 262, stroke: '#8E6B3E', 'stroke-width': 4 });
  mk(s, 'ellipse', { cx: 390, cy: 252, rx: 80, ry: 14, fill: '#BFDCEB', stroke: WAT, 'stroke-width': 3 });
  mk(s, 'rect', { x: 92, y: 160, width: 18, height: 102, fill: '#8E6B3E', stroke: BR, 'stroke-width': 3 }); mk(s, 'circle', { cx: 101, cy: 130, r: 52, fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  const el = mk(s, 'g', {}); mk(el, 'ellipse', { cx: 250, cy: 196, rx: 68, ry: 46, fill: '#A7A9AE', stroke: BR, 'stroke-width': 3.5 });
  [210, 236, 266, 290].forEach(x => mk(el, 'rect', { x: x - 10, y: 222, width: 22, height: 40, rx: 6, fill: '#A7A9AE', stroke: BR, 'stroke-width': 3 }));
  mk(el, 'circle', { cx: 316, cy: 168, r: 34, fill: '#A7A9AE', stroke: BR, 'stroke-width': 3.5 }); mk(el, 'path', { d: 'M336,182 C352,206 348,236 334,250', stroke: BR, 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' });
  mk(el, 'path', { d: 'M336,182 C352,206 348,236 334,250', stroke: '#A7A9AE', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(el, 'ellipse', { cx: 300, cy: 166, rx: 20, ry: 26, fill: '#C3C5C9', stroke: BR, 'stroke-width': 3 }); mk(el, 'circle', { cx: 326, cy: 160, r: 4, fill: BR });
  for (let k = 0; k < 9; k++) mk(s, 'line', { x1: 40 + k * 55, y1: 262, x2: 40 + k * 55, y2: 220, stroke: '#8E6B3E', 'stroke-width': 4 }); mk(s, 'line', { x1: 40, y1: 236, x2: 480, y2: 236, stroke: '#8E6B3E', 'stroke-width': 3 }); }
const GCH = [['Royal Botanical Garden', 'KEW, ENGLAND', 'Kew'], ['Indian Botanical Garden', 'HOWRAH', 'Howrah'], ['National Botanical Research Institute', 'LUCKNOW', 'Lucknow']];
$('#gchs').innerHTML = GCH.map(([n, w], i) => `<div class="gch" id="gc${i}" style="top:${428 + i * 48}px;font-size:${i === 2 ? 15.5 : 18}px">${n}<em>${w}</em></div>`).join('');
const tGc = GCH.map(g => wt('G3', g[2]));

/* ---------- C: compare ---------- */
hsheet($('#caS'), 272, 76, 240, 340, true);
{ const s = $('#cbS'); mk(s, 'rect', { x: 200, y: 360, width: 380, height: 50, rx: 6, fill: '#D9C29A', stroke: '#8E6B3E', 'stroke-width': 3 }); twig(s, 330, 362, 280, 1, LEAF, RED);
  mk(s, 'line', { x1: 500, y1: 362, x2: 500, y2: 270, stroke: '#6B5B3A', 'stroke-width': 6 }); mk(s, 'rect', { x: 430, y: 214, width: 160, height: 60, rx: 8, fill: '#fff', stroke: BR, 'stroke-width': 3 });
  txt(s, 446, 240, 'Hibiscus', { 'font-family': 'Poppins', 'font-size': 18, 'font-style': 'italic', 'font-weight': 600, fill: C.ink }); txt(s, 446, 262, 'MALVACEAE', { 'font-size': 13, 'letter-spacing': 1, 'font-weight': 600 }); }
const th1 = PUC.think($('#th1'), { q: 'A teacher wants students to watch one tree flower and fruit over a year. Herbarium, or botanical garden?', opts: ['Herbarium', 'Botanical garden'], right: 1, why: 'Botanical garden. Only a living plant flowers and fruits; a sheet never changes.' });

/* ---------- K: the key ---------- */
const CPL = [['1a', 'Backbone present', '→ go to couplet 2'], ['1b', 'No backbone', '→ it is the housefly']];
$('#kS').insertAdjacentHTML('afterend', `<div class="pillp" id="kSep" style="left:36px;top:432px">Separate keys for each rank: family, genus, species</div>`);
$('#cpls').innerHTML = CPL.map(([n, a, b], i) => `<div class="cpl" id="cp${i}" style="top:${96 + i * 116}px;width:860px"><b>${n}</b>${a}<em>${b}</em></div>`).join('');
const kS = $('#kS'), kBr = mk(kS, 'path', { d: 'M1110,96 h24 v212 h-24', stroke: C.ac, 'stroke-width': 4, fill: 'none' });
const kBl = txt(kS, 1158, 196, 'Couplet', { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: C.ac }), kBl2 = txt(kS, 1158, 232, 'a pair of opposite leads', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 500, fill: C.ink2 || '#3A4560' });
const kLd = LBmake(kS, [[896, 144, 966, 144, 'Lead', 'start'], [896, 260, 966, 260, 'Lead', 'start']]);
const KEYS3 = [['FAMILY', 'family'], ['GENUS', 'genus'], ['SPECIES', 'species']];

/* ---------- W: run the key ---------- */
const ND = [['COUPLET 1', ['1a', 'Backbone present'], ['1b', 'No backbone']], ['COUPLET 2', ['2a', 'Feathers'], ['2b', 'No feathers']], ['COUPLET 3', ['3a', 'Hair'], ['3b', 'Moist skin, no hair']]];
const NX = [300, 660, 1020];
$('#nds').innerHTML = ND.map(([h, a, b], i) => `<div class="nd" id="nd${i}" style="left:${NX[i]}px"><div class="nh">${h}</div><div class="l1" id="nl${i}0"><b>${a[0]}</b>${a[1]}</div><div class="l2" id="nl${i}1"><b>${b[0]}</b>${b[1]}</div></div>`).join('');
const RSB = [['Housefly', 'fly', 290], ['Crow', 'bird', 650], ['Cat', 'cat', 1010], ['Frog', 'frog', 1300]];
$('#rsbs').innerHTML = RSB.map(([n, , x], i) => `<div class="rsb" id="rb${i}" style="left:${x}px"><div class="rn" id="rn${i}">${n}</div></div>`).join('');
$('#tkns').innerHTML = RSB.map(([, ic], i) => `<div class="tkn" id="tk${i}">${M.icon(ic, 36, C.ink, 2.2)}</div>`).join('');
const wS = $('#wS');
const wArr = [[618, 159, 660], [978, 159, 1020]].map(([x1, y, x2]) => mk(wS, 'path', { d: `M${x1 + 4},${y} H${x2 - 6} m-12,-10 l12,10 l-12,10`, stroke: C.dim, 'stroke-width': 3.5, fill: 'none', 'stroke-linejoin': 'round' }));
const wDn = [[410, 234, 410, 418], [770, 234, 770, 418], [1130, 234, 1130, 418], [1250, 234, 1420, 418]].map(([x1, y1, x2, y2]) => mk(wS, 'path', { d: `M${x1},${y1} L${x2},${y2}`, stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '7 7', fill: 'none' }));
const tWs = [T0('W2'), T0('W3'), T0('W4')], tOut = [wt('W2', 'leaves'), wt('W3', 'leaves'), wt('W4', 'hair', 1), wt('W4', 'moist', 1)];
// token tracks: [x, y] keyframes
const START = [[60, 120], [140, 120], [60, 200], [140, 200]], WAITY = 262;
const tk = (i, t) => { let p = START[i];
  const seq = [[tWs[0] + 0.3, [NX[0] + 20 + i * 66, WAITY]]];
  if (i === 0) seq.push([tOut[0], [RSB[0][2] + 88, 412]]);
  else { seq.push([tWs[1] + 0.2, [NX[1] + 20 + (i - 1) * 80, WAITY]]); if (i === 1) seq.push([tOut[1], [RSB[1][2] + 88, 412]]);
    else { seq.push([tWs[2] + 0.2, [NX[2] + 40 + (i - 2) * 110, WAITY]]); seq.push([tOut[i], [RSB[i][2] + 88, 412]]); } }
  for (const [ts, q] of seq) { const u = M.io((t - ts) / 0.7); p = [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u]; }
  return p; };
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 440, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Just yes or no!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Each statement in a key is a couplet', right: 'Each statement is a lead. A couplet is the pair of leads.' });
const tS = $('#tS');
const xr = [0, 1].map(i => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x: 30, y: 60 + i * 76, width: 330, height: 60, rx: 10, fill: C.soft });
  txt(g, 50, 98 + i * 76, ['1a  Backbone', '1b  No backbone'][i], { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: C.ink });
  txt(g, 330, 98 + i * 76, 'LEAD', { 'text-anchor': 'end', 'font-size': 14, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ac }); return g; });
const xBr = mk(tS, 'path', { d: 'M380,64 h18 v128 h-18', stroke: C.ok, 'stroke-width': 4, fill: 'none' }), xBl = txt(tS, 414, 136, 'COUPLET', { 'font-size': 18, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ok });
const where = PUC.where($('#wa'), { on: [], type: 'Not in the current NCERT text. Herbarium label; couplet and lead' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 900,
  q: 'Match each aid with its feature.' + [['1', 'Herbarium', 'p', 'Living plants, labelled'], ['2', 'Botanical garden', 'q', 'Couplets of opposite characters'], ['3', 'Museum', 'r', 'Dried, pressed plants on sheets'], ['4', 'Key', 's', 'Insects pinned in boxes']]
    .map(([a, b, c, d]) => `<div class="sl"><b>${a}</b><span style="display:inline-block;width:240px">${b}</span><i>${c}</i>${d}</div>`).join(''),
  opts: ['1-p, 2-r, 3-s, 4-q', '1-r, 2-p, 3-q, 4-s', '1-s, 2-q, 3-r, 4-p', '1-r, 2-p, 3-s, 4-q'], right: 3, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b>'], ['1 Herbarium: <b style="color:var(--ok)">r</b>'], ['2 Garden: <b style="color:var(--ok)">p</b>'], ['3 Museum: <b style="color:var(--ok)">s</b>'], ['4 Key: <b style="color:var(--ok)">q</b>']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'herbarium'), wt('A2', 'botanical'), wt('A3', 'museum'), wt('A3', 'key')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · taxonomic aids', y0: 100, dy: 68, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Herbarium</b>: dried, pressed plants on sheets, stored in order', '<b>Label</b>: date, place, English, local and botanical names, family, collector',
    '<b>Botanical garden</b>: living plants, labelled · Kew, Howrah, Lucknow', '<b>Museum</b>: jars, insect boxes, stuffed animals, skeletons · <b>Zoo</b>: live animals', '<b>Key</b>: lead = one statement · couplet = a pair of opposite leads'] });
const YQ = ['What does a herbarium sheet label carry?', 'How is a botanical garden different from a herbarium?', 'What is the difference between a lead and a couplet?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 10', topic: 'Life in a boiling hot spring: the Three-Domain System', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() { geo = 1; const g = $('#tgh'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#ca' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); x = 36; [0, 1, 2].forEach(i => { const e = $('#cb' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#tgh'), t, 1.2, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'help') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'name') + 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'asked') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hcab'), t, tH4 + 0.05, 1e9, { dy: 0, fade: 0.25 })) {
      [...cabSheets.children].forEach((c, k) => { if (k) M.vis(c, t, tH4 + 0.2 + k * 0.012, 1e9, { dy: 0, fade: 0.1 }); });
      M.vis($('#cabP'), t, wt('H4', 'aids') - 0.2, 1e9, POP); }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bgh'), t, tB1 + 0.5, 1e9, { dy: 8 });
    M.vis(unk, t, T0('B2') - 0.1, 1e9, { dy: 16 });
    REF.forEach((r, i) => M.vis(r.g, t, wt('B2', 'already') + i * 0.15, 1e9, { dy: 16 }));
    const ts = wt('B2', 'named') + 0.1, u = M.clamp((t - ts) / 2.4), lx = 320 + 344 * Math.min(1, u * 1.25) - (u > 0.8 ? 172 * M.io((u - 0.8) / 0.2) : 0);
    M.vis(lensW, t, ts - 0.1, 1e9, { dy: 0, fade: 0.2 }); attr(lens, 'transform', `translate(${lx.toFixed(1)} 250)`);
    const tm = ts + 2.3; M.draw(match, t, tm, 0.5); REF[1].nm.textContent = t > tm + 0.3 ? 'MATCH' : 'SPECIES B'; REF[1].nm.setAttribute('fill', t > tm + 0.3 ? GRN : C.mute);
    M.vis($('#blP'), t, wt('B3', 'Taxonomic') - 0.1, 1e9, POP);
    M.vis($('#br'), t, T0('B4') - 0.2, out, { dx: 60, dy: 0, ...o });
    AIS.forEach((_, i) => { const el = $('#ai' + i); M.vis(el, t, tAi[i] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, pulse(t, tAi[i], 0.7)); });
  }

  /* Z: herbarium ladder */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ['SHEET', 'LABEL', 'CUPBOARD'][cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ[1] + 0.6, tZ[2] + 0.2, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut, cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3); });
    LAB0.forEach((l, i) => LBrun(l, t, tL0[i])); M.draw(FR0, t, tZ[1] - 0.7, 0.5);
    LFE.forEach((f, i) => { const on = M.io((t - tLF[i] + 0.1) / 0.3); f.kk.setAttribute('fill', mix('#B8BCC6', '#6B7280', on)); PUC.write(f.vv, t, tLF[i] + 0.05, 0.5); f.ul.setAttribute('stroke', mix('#E3DFD2', C.ac, pulse(t, tLF[i], 0.6))); });
    const ns = M.io((t - wt('Z6', 'stored')) / 0.9); attr(newSheet, 'transform', `translate(${(470 + 6 * 56 + 400 * (1 - ns)).toFixed(1)} ${74 - 300 * (1 - ns) * 0.2})`); newSheet.style.opacity = M.clamp((t - wt('Z6', 'stored') + 0.2) / 0.2);
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, T0('Z5') + 0.6, T0('Z6') - 0.1);
  }

  /* P: process */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pw'), t, tP1 + 0.05, OUT('G1'), { dy: 36, ...o });
    let cur = -1; tPs.forEach((tt, k) => { if (t >= tt) cur = k; });
    PS.forEach((_, i) => { const el = $('#sp' + i), on = i === cur, done = i < cur; M.vis(el, t, tP1 + 0.3 + i * 0.08, 1e9, { dy: 12 });
      el.style.background = on ? C.ac : '#fff'; el.style.color = on ? '#fff' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      const b = el.querySelector('b'); b.style.background = on ? '#fff' : done ? C.ac2 : '#EEF0F4'; b.style.color = on || done ? C.ac : '#9AA0AC';
      M.vis($('#pd' + i), t, tPs[i] + 0.1, i < 4 ? tPs[i + 1] : 1e9, { dy: 16, outDur: 0.2, ody: -10 }); });
    M.vis($('#pst'), t, tP1 + 0.4, 1e9, { dy: 16 });
    PG.forEach((g, i) => { const on = M.vis(g, t, tPs[i] + 0.05, i < 4 ? tPs[i + 1] : 1e9, { dy: 0, fade: 0.25, outDur: 0.25, ody: 0 }); if (!on) return;
      const lt = t - tPs[i], ph = (lt % 2.2) / 2.2;
      if (i === 0) { const u = M.io((ph - 0.3) / 0.5); attr(pc.tw, 'transform', `translate(${(u * 490).toFixed(1)} ${(-u * 20).toFixed(1)}) scale(${(1 - 0.25 * u).toFixed(3)})`); pc.cut.style.opacity = ph < 0.3 ? (Math.sin(ph * 40) > 0 ? 1 : 0.3) : 0; }
      if (i === 1) { const s = 0.5 - 0.5 * Math.cos(ph * 2 * Math.PI); attr(pp.top, 'y', (150 + 22 * s).toFixed(1)); attr(pp.bot, 'y', (276 - 22 * s).toFixed(1)); pp.ar.forEach(a => a.style.opacity = (0.4 + 0.6 * s).toFixed(2)); }
      if (i === 2) { pd.drops.forEach((d, k) => { const q = ((lt * 0.6 + k / 6) % 1); attr(d, 'transform', `translate(${280 + k * 70} ${(200 - q * 170).toFixed(1)})`); d.style.opacity = (q < 0.1 ? q * 10 : 1 - q).toFixed(2); });
        const lv = 1 - M.clamp((lt - 0.2) / 3.2); attr(pd.bar, 'y', (86 + 228 * (1 - lv)).toFixed(1)); attr(pd.bar, 'height', (228 * lv).toFixed(1)); }
      if (i === 3) { const u = M.io(ph / 0.35); attr(pm.tw, 'transform', `translate(0 ${(-120 * (1 - u)).toFixed(1)})`); pm.tw.style.opacity = (0.3 + 0.7 * u).toFixed(2); pm.tape.forEach((tp, k) => tp.style.opacity = ph > 0.4 + k * 0.12 ? 1 : 0); }
      if (i === 4) { pl.lines.forEach((l, k) => M.drawU(l, M.clamp((ph - k * 0.1) / 0.15))); const u = M.io((ph - 0.45) / 0.35); attr(pl.sh, 'transform', `translate(${(120 + 440 * u).toFixed(1)} ${(40 + 20 * u).toFixed(1)}) scale(${(1 - 0.75 * u).toFixed(3)} ${(1 - 0.13 * u).toFixed(3)})`); }
    });
  }

  /* G: garden, museum, zoo */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('C1');
    [['g0', 'G2'], ['g1', 'G4'], ['g2', 'G5']].forEach(([id, l], i) => { M.vis($('#' + id), t, (i ? T0(l) : tG1 + 0.1) - 0.1, out, { dy: 36, ...o });
      const c = $('#' + id); c.style.borderTopColor = mix('#CBD0DA', C.ac, M.io((t - T0(l)) / 0.3)); });
    tGc.forEach((tt, i) => M.vis($('#gc' + i), t, tt - 0.15, 1e9, { dx: -12, dy: 0 }));
  }

  /* C: compare + think */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    M.vis($('#ca'), t, T0('C2') - 0.15, out, { dx: -60, dy: 0, ...o }); M.vis($('#cb'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o });
    [['dead', 'dried', 'sheets'], ['living', 'growing', 'label']].forEach((ws, j) => ws.forEach((w, i) => M.vis($(`#c${j ? 'b' : 'a'}${i}`), t, wt(j ? 'C3' : 'C2', w) - 0.1, 1e9, POP)));
    M.vis($('#caP'), t, T1('C2') - 0.3, 1e9, { dy: 8 }); M.vis($('#cbP'), t, T1('C3') - 0.3, 1e9, { dy: 8 });
    M.vis($('#th1'), t, tC4 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Herbarium') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Only') });
  }

  /* K: the key */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kw'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    CPL.forEach((_, i) => M.vis($('#cp' + i), t, wt('K2', 'pairs') + i * 0.3, 1e9, { dx: -16, dy: 0 }));
    M.draw(kBr, t, wt('K3', 'pair') - 0.1, 0.5); M.vis(kBl, t, wt('K3', 'couplet') - 0.1, 1e9, { dy: 8 }); M.vis(kBl2, t, wt('K3', 'couplet') + 0.2, 1e9, { dy: 6 });
    kLd.forEach((l, i) => LBrun(l, t, wt('K4', 'lead') - 0.1 + i * 0.3));
    const tPick = wt('K4', 'pick'); [0, 1].forEach(i => $('#cp' + i).style.background = mix(C.soft, C.ac2, i === 0 ? M.io((t - tPick) / 0.3) : 0));
    M.vis($('#kP'), t, wt('K4', 'next') - 0.2, 1e9, POP); M.vis($('#kSep'), t, wt('K4', 'name') + 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'key') - 0.2, { st: 0.07, sp: M.HEAVY });
  }

  /* W: run the key */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wk'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    RSB.forEach((_, i) => { M.vis($('#tk' + i), t, wt('W1', ['housefly', 'crow', 'cat', 'frog'][i]) - 0.1, 1e9, { ...POP, sc: 0.4 }); const p = tk(i, t); $('#tk' + i).style.left = (p[0] - 32).toFixed(1) + 'px'; $('#tk' + i).style.top = (p[1] - 32).toFixed(1) + 'px';
      M.vis($('#rb' + i), t, tWs[0] - 0.1 + i * 0.08, 1e9, { dy: 10 }); M.vis($('#rn' + i), t, tOut[i] + 0.5, 1e9, POP);
      $('#rb' + i).style.borderColor = mix('#CBD0DA', C.ac, M.io((t - tOut[i] - 0.5) / 0.3)); $('#rb' + i).style.borderStyle = t > tOut[i] + 0.5 ? 'solid' : 'dashed'; });
    ND.forEach((_, i) => { const el = $('#nd' + i); M.vis(el, t, tWs[i] - 0.15, 1e9, { dy: 14 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tWs[i]) / 0.3) * (1 - (i < 2 ? M.io((t - tWs[i + 1]) / 0.3) : 0)));
      const la = $(`#nl${i}0`), lb = $(`#nl${i}1`); const ta = i === 0 ? tOut[0] : i === 1 ? tOut[1] : tOut[2], tb = i === 2 ? tOut[3] : tWs[i + 1] || 1e9;
      la.style.color = i === 0 ? mix(C.ink, C.ac, M.io((t - tWs[1]) / 0.3)) : mix(C.ink, C.ac, M.io((t - ta) / 0.3)); lb.style.color = i === 0 ? mix(C.ink, C.ac, M.io((t - ta) / 0.3)) : mix(C.ink, C.ac, M.io((t - tb) / 0.3)); });
    wArr.forEach((a, i) => { M.draw(a, t, tWs[i + 1] - 0.1, 0.4); a.setAttribute('stroke', t > tWs[i + 1] ? C.ac : C.dim); });
    wDn.forEach((a, i) => { M.draw(a, t, tOut[i] - 0.2, 0.4); });
    avW(t, tOut[3] + 0.6, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'statement') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'lead') - 0.2 });
    xr.forEach((g, i) => M.vis(g, t, wt('X3', 'single') - 0.2 + i * 0.2, 1e9, { dx: -12, dy: 0 })); M.draw(xBr, t, wt('X3', 'couplet') - 0.1, 0.4); M.vis(xBl, t, wt('X3', 'couplet') + 0.1, 1e9, { dy: 4 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'If') });
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
