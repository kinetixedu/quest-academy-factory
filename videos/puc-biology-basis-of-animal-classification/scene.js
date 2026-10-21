// PUC Biology Ep 31: Basis of Animal Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed colours: bible canon + this batch (germ layers, coelom, notochord)
const BR = AN.BR, GRN = C.ac, WAT = '#5AA0C8', ECTO = AN.ECTO, MESO = AN.MESO, ENDO = AN.ENDO, COEL = AN.COEL, NOTO = '#3D7A8C', RED = '#C0392B';
Object.assign(M.IC, AN.IC);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tT = T0('T1'), tC1 = T0('C1'), tU1 = T0('U1'), tU4 = T0('U4'), tP1 = T0('P1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['sponge', 'A sponge', 'FIXED TO A ROCK', 'sponge'], ['jelly', 'A jellyfish', 'DRIFTS IN THE SEA', 'jellyfish'], ['roach', 'A cockroach', 'RUNS IN A KITCHEN', 'cockroach']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 34, C.ac, 2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const TAGS = [['NO ORGANS', wt('H2', 'organs')], ['NO HEAD', wt('H2', 'head')], ['6 JOINTED LEGS', wt('H2', 'jointed')]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 40, C.ac, 2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${TAGS[i][0]}</div></div>`).join('');
const SPI = ['sponge', 'jelly', 'roach', 'worm', 'star', 'cells'];
let sg = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++) sg += `<i id="sp${r * 14 + c}" style="position:absolute;left:${c * 51}px;top:${r * 46}px">${M.icon(SPI[(r * 5 + c) % 6], 32, (r + c) % 3 ? C.dim : C.ac, 1.8)}</i>`;
$('#spG').innerHTML = sg;
const Q6 = ['cells', 'sym', 'layers', 'cavity', 'worm', 'rod'];
$('#q6').innerHTML = Q6.map((ic, i) => `<span id="q6${i}"><b id="q6q${i}">?</b><i id="q6i${i}" style="position:absolute">${M.icon(ic, 36, C.ac, 2)}</i></span>`).join('');
const tSpc = wt('H4', 'Over') - 0.3, tMil = wt('H4', 'million'), tSix = wt('H5', 'six');

/* ---------- B: looks vs body plan ---------- */
$('#lk0 i').innerHTML = M.icon('bat', 84, C.ink, 1.8); $('#lk1 i').innerHTML = M.icon('crow', 84, C.ink, 1.8);
const bp = $('#bpS'), BX = 270, BY = 270;
const ring = (g, r, w, fill, st) => mk(g, 'circle', { cx: BX, cy: BY, r, fill, stroke: st || 'none', 'stroke-width': st ? 2.5 : 0 });
const bpG = mk(bp, 'g', {});
ring(bpG, 176, 0, '#DCE6F5', ECTO); ring(bpG, 156, 0, '#F1D2CA'); ring(bpG, 142, 0, COEL, MESO); ring(bpG, 84, 0, '#F1D2CA', MESO); ring(bpG, 72, 0, '#F6E5B5', ENDO); ring(bpG, 54, 0, '#FFFFFF', ENDO);
for (let k = 0; k < 28; k++) { const a = k * 2 * Math.PI / 28; mk(bpG, 'line', { x1: BX + 156 * Math.cos(a), y1: BY + 156 * Math.sin(a), x2: BX + 176 * Math.cos(a), y2: BY + 176 * Math.sin(a), stroke: ECTO, 'stroke-width': 1.5 }); }
const bLab = [[BX + 166 * Math.cos(-0.9), BY + 166 * Math.sin(-0.9), 470, 96, 'Cells'], [BX + 150 * Math.cos(-0.2), BY + 150 * Math.sin(-0.2), 470, 186, 'Layers'], [BX + 112 * Math.cos(0.35), BY + 112 * Math.sin(0.35), 470, 300, 'Body cavity'], [BX + 63 * Math.cos(0.9), BY + 63 * Math.sin(0.9), 470, 400, 'Gut']]
  .map(([px, py, lx, ly, s]) => { const ln = mk(bp, 'path', { d: `M${px.toFixed(1)},${py.toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }); const dot = mk(bp, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }); const tx = mk(bp, 'text', { x: lx + 12, y: ly + 9, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const tBl = [wt('B3', 'cells'), wt('B3', 'layers'), wt('B3', 'cavities'), wt('B3', 'cavities') + 0.5];

/* ---------- Z: the three animals, labelled ---------- */
const ZN = ['PAGE', 'SPONGE', 'JELLYFISH', 'COCKROACH'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z2'), T0('Z4'), T0('Z5')];
const LVI = [['THE PAGE', 'Three animals', 'Three very different bodies on one page.', 'All three belong to Kingdom Animalia.'],
  ['ANIMAL 1 OF 3', 'Sponge', 'A hollow body with pores in its wall.', 'Water in: the ostia. Water out: the osculum.'],
  ['ANIMAL 2 OF 3', 'Jellyfish', 'A soft bell, with tentacles at its edge.', 'Any cut through the centre gives matching halves.'],
  ['ANIMAL 3 OF 3', 'Cockroach', 'Head, thorax and abdomen.', 'Jointed legs and long antennae.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same six questions for all!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const LAB = [[], [], [], []];
// level 0: the page
const z0 = [AN.draw('sponge', ZG[0], 200, 262, 0.92), AN.draw('jelly', ZG[0], 520, 210, 0.92), AN.draw('roach', ZG[0], 850, 286, 0.92)];
const z0n = [['Sponge', 200], ['Jellyfish', 520], ['Cockroach', 850]].map(([s, x]) => { const e = mk(ZG[0], 'text', { x, y: 482, 'text-anchor': 'middle', class: 'zl' }); e.textContent = s; return e; });
const FOC0 = mk(ZG[0], 'circle', { cx: 200, cy: 262, r: 118, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
// level 1: the sponge, cut open, with water flowing
const sp1 = AN.draw('sponge', ZG[1], 400, 286, 1.8);
const SW_ = y => { const u = (104 - y) / 206; return 44 + 52 * Math.sin(Math.PI * u) - 6 * u; };
const flowIn = [[-1, -40], [-1, 12], [-1, 62]].map(([sd, y]) => { const yy = 286 + y * 1.8, xo = 400 + sd * 1.8 * SW_(y);
  return mk(ZG[1], 'path', { d: `M${xo + sd * 80},${yy} L${xo + sd * 10},${yy}`, stroke: WAT, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 10' }); });
const flowOut = mk(ZG[1], 'path', { d: 'M400,250 L400,40', stroke: WAT, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '14 10' });
const flowHead = mk(ZG[1], 'path', { d: 'M386,52 L400,28 L414,52 Z', fill: WAT });
LAB[1] = [[400 + 1.8 * 84, 286 - 14 * 1.8, 700, 250, 'Ostia (pores)', 'start'], [430, 340, 700, 360, 'Spongocoel (cavity)', 'start'], [424, 286 - 101 * 1.8, 700, 96, 'Osculum (opening)', 'start']];
// level 2: jellyfish side view + top view inset with a rotating cut
const je2 = AN.draw('jelly', ZG[2], 290, 214, 1.55);
const jt2 = AN.draw('jellyTop', ZG[2], 850, 290, 0.72);
const cut2 = mk(ZG[2], 'line', { x1: 850, y1: 190, x2: 850, y2: 390, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' });
const cutT = txt(ZG[2], 850, 420, 'TOP VIEW · ANY CUT', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600 });
LAB[2] = [[290 + 60 * 1.55, 214 - 60 * 1.55, 520, 80, 'Bell', 'start'], [290 + 92 * 1.55, 214 + 74 * 1.55, 520, 400, 'Tentacles', 'start']];
// level 3: cockroach
const ro3 = AN.draw('roach', ZG[3], 450, 300, 1.32);
const rp = n => ro3.p(n);
LAB[3] = [[...rp('head'), 250, 196, 'Head', 'end'], [...rp('thorax'), 720, 220, 'Thorax', 'start'], [...rp('abdomen'), 720, 372, 'Abdomen', 'start'], [...rp('leg2'), 720, 462, 'Jointed leg', 'start'], [...rp('antenna'), 250, 92, 'Antenna', 'end']];
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }));
const tLab = [[], [wt('Z2', 'ostia'), wt('Z3', 'spongocoel'), wt('Z3', 'osculum')], [wt('Z4', 'bell'), wt('Z4', 'tentacles')],
  [wt('Z5', 'head'), wt('Z5', 'thorax'), wt('Z5', 'abdomen'), wt('Z5', 'jointed'), wt('Z5', 'antennae')]];
const tWater = wt('Z2', 'Water'), tOut1 = wt('Z3', 'leaves'), tCut = wt('Z4', 'Cut');

/* ---------- L: six questions ---------- */
const STEPS = [['Level of organisation', 'loose cells, or tissues, organs, organ systems?'], ['Symmetry', 'matching halves? in how many directions?'], ['Germ layers', 'two or three layers in the embryo?'],
  ['Coelom', 'a body cavity lined by mesoderm?'], ['Segmentation', 'the body built from repeated segments?'], ['Notochord', 'a stiff rod along the back of the embryo?']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${80 + i * 80}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5', 'L6', 'L7'].map(id => T0(id) + 0.45);
const FQT = ['1 · LEVEL OF ORGANISATION', '2 · SYMMETRY', '3 · GERM LAYERS', '4 · COELOM', '5 · SEGMENTATION', '6 · NOTOCHORD', 'ALSO · BODY SYSTEMS'];
$('#fqs').innerHTML = FQT.map((s, i) => `<div class="lbl" id="fq${i}" style="left:36px;top:30px">${s}</div>`).join('');
const tFq = [...tSt, T0('L8') + 0.2];
const lr = $('#lrS'), FG = FQT.map(() => mk(lr, 'g', {}));
const cap = (g, x, y, s, col) => txt(g, x, y, s, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.3, 'font-weight': 600, fill: col || C.mute });
// state 0: loose cells / tissue / organ system
const f0 = { loose: [], tis: [] };
{ const g = FG[0]; const R = M.rng(5);
  for (let k = 0; k < 7; k++) f0.loose.push({ x: 140 + (R() - 0.5) * 120, y: 280 + (R() - 0.5) * 140, e: mk(g, 'circle', { r: 20, fill: '#F6E5B5', stroke: BR, 'stroke-width': 3 }) });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) mk(g, 'rect', { x: 330 + c * 32, y: 222 + r * 40, width: 30, height: 38, rx: 6, fill: '#CFE6C6', stroke: BR, 'stroke-width': 2.5 });
  [[560, 220], [660, 220], [560, 330], [660, 330]].forEach(([x, y], i) => { mk(g, 'rect', { x: x - 34, y: y - 30, width: 68, height: 60, rx: 14, fill: ['#F2B57E', '#D7C3E6', '#D6E9F5', '#F1D2CA'][i], stroke: BR, 'stroke-width': 3 }); });
  mk(g, 'path', { d: 'M594,220 H626 M560,250 V300 M660,250 V300 M594,330 H626', stroke: BR, 'stroke-width': 3.5 });
  cap(g, 140, 440, 'LOOSE CELLS'); cap(g, 392, 440, 'TISSUES'); cap(g, 612, 440, 'ORGAN SYSTEMS');
  [266, 504].forEach(x => mk(g, 'path', { d: `M${x - 20},286 h34 m-10,-10 l10,10 l-10,10`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })); }
// state 1: radial vs bilateral
const f1 = {}; { const g = FG[1]; AN.draw('jellyTop', g, 220, 290, 0.95); f1.rot = mk(g, 'line', { x1: 220, y1: 160, x2: 220, y2: 420, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' });
  AN.draw('roach', g, 570, 300, 0.8); f1.bi = mk(g, 'line', { x1: 570, y1: 160, x2: 570, y2: 420, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' });
  cap(g, 220, 470, 'RADIAL · MANY CUTS'); cap(g, 570, 470, 'BILATERAL · ONE CUT'); }
// state 2: 2 vs 3 germ layers (embryo sections)
const f2 = { a: [], b: [] }; { const g = FG[2];
  [[ECTO, '#DCE6F5', 120], ['#B8BCC6', '#F4F2EA', 98], [ENDO, '#F6E5B5', 80], ['#FFFFFF', '#FFFFFF', 52]].forEach(([s, f, r], i) => f2.a.push(mk(g, 'circle', { cx: 220, cy: 290, r, fill: f, stroke: i === 3 ? ENDO : s, 'stroke-width': i === 1 ? 2 : 3, 'stroke-dasharray': i === 1 ? '6 6' : 'none' })));
  [[ECTO, '#DCE6F5', 120], [MESO, '#F1D2CA', 100], [ENDO, '#F6E5B5', 80], ['#FFFFFF', '#FFFFFF', 52]].forEach(([s, f, r], i) => f2.b.push(mk(g, 'circle', { cx: 570, cy: 290, r, fill: f, stroke: i === 3 ? ENDO : s, 'stroke-width': 3 })));
  cap(g, 220, 450, 'TWO LAYERS'); cap(g, 570, 450, 'THREE LAYERS');
  f2.k = [['ECTODERM', ECTO], ['MESODERM', MESO], ['ENDODERM', '#B8891C']].map(([s, c], i) => cap(g, 200 + i * 192, 506, s, c)); }
// state 3: coelom cross-section
const f3 = {}; { const g = FG[3], X = 300, Y = 296;
  const rr = [[176, '#DCE6F5', ECTO], [158, '#F1D2CA', MESO], [146, COEL, MESO], [84, '#F1D2CA', MESO], [72, '#F6E5B5', ENDO], [54, '#FFFFFF', ENDO]];
  f3.r = rr.map(([r, f, s]) => mk(g, 'circle', { cx: X, cy: Y, r, fill: f, stroke: s, 'stroke-width': 2.5 }));
  f3.lab = [[X + 167 * Math.cos(-0.8), Y + 167 * Math.sin(-0.8), 540, 110, 'Body wall'], [X + 116 * Math.cos(-0.1), Y + 116 * Math.sin(-0.1), 540, 250, 'Coelom'], [X + 152 * Math.cos(0.5), Y + 152 * Math.sin(0.5), 540, 370, 'Mesoderm lining'], [X + 63 * Math.cos(1.1), Y + 63 * Math.sin(1.1), 540, 470, 'Gut']]
    .map(([px, py, lx, ly, s]) => { mk(g, 'path', { d: `M${px.toFixed(1)},${py.toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }); mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }); const e = mk(g, 'text', { x: lx + 12, y: ly + 9, class: 'zl' }); e.textContent = s; return e; }); }
// state 4: segmentation
const f4 = {}; { const g = FG[4]; f4.w = AN.draw('worm', g, 392, 290, 1, { n: 16, L: 640 }); cap(g, 392, 400, 'THE SAME SEGMENT, REPEATED'); }
// state 5: notochord
const f5 = {}; { const g = FG[5]; AN.draw('fish', g, 392, 290, 2.4); f5.rod = mk(g, 'path', { d: `M${392 - 64 * 2.4},${290 - 14 * 2.4} L${392 + 70 * 2.4},${290 - 14 * 2.4}`, stroke: NOTO, 'stroke-width': 12, 'stroke-linecap': 'round', fill: 'none' });
  const l = mk(g, 'path', { d: `M${392 + 30 * 2.4},${290 - 14 * 2.4} L560,140`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }); mk(g, 'circle', { cx: 392 + 30 * 2.4, cy: 290 - 14 * 2.4, r: 6, fill: C.ink });
  f5.t = mk(g, 'text', { x: 572, y: 148, class: 'zl' }); f5.t.textContent = 'Notochord'; f5.l = l; cap(g, 392, 470, 'PRESENT: CHORDATE · ABSENT: NON-CHORDATE'); }
// state 6: gut with one opening vs two
const f6 = {}; { const g = FG[6];
  mk(g, 'path', { d: 'M140,200 C80,200 70,380 160,390 C250,400 300,330 290,260 C282,214 250,200 230,200', fill: '#F6E5B5', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M480,250 C540,230 640,230 700,250 L700,330 C640,350 540,350 480,330 Z', fill: '#F6E5B5', stroke: BR, 'stroke-width': 4 });
  f6.a = [0, 1, 2].map(() => mk(g, 'circle', { r: 9, fill: '#B8891C' })); f6.b = [0, 1, 2, 3].map(() => mk(g, 'circle', { r: 9, fill: '#B8891C' }));
  cap(g, 190, 450, 'ONE OPENING · INCOMPLETE'); cap(g, 590, 450, 'TWO OPENINGS · COMPLETE'); }

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">level · symmetry · germ layers · coelom · segments · notochord</span>';

/* ---------- C: run all three ---------- */
const SQ = ['LEVEL', 'SYMMETRY', 'GERM LAYERS', 'COELOM', 'SEGMENTS', 'NOTOCHORD'];
$('#stc').innerHTML = SQ.map((s, i) => `<span id="sq${i}">Q${i + 1} ${s}</span>`).join('');
const AH = [['sponge', 'Sponge'], ['jelly', 'Jellyfish'], ['roach', 'Cockroach']];
$('#gh').innerHTML = AH.map(([ic, n], c) => `<div class="gh" id="gh${c}" style="left:${852 + c * 240}px;top:150px;width:226px">${M.icon(ic, 30, C.ac, 2)}${n}</div>`).join('');
$('#gq').innerHTML = SQ.map((s, r) => `<div class="gq" id="gq${r}" style="top:${222 + r * 54}px">Q${r + 1} ${s}</div>`).join('');
const ANS = [[['Cellular', wt('C2', 'cellular')], ['Tissue', wt('C2', 'tissues')], ['Organ system', wt('C2', 'systems')]],
  [['None', wt('C3', 'no')], ['Radial', wt('C3', 'radial')], ['Bilateral', wt('C3', 'bilateral')]],
  [['-', wt('C4', 'jellyfish')], ['2 · diploblastic', wt('C4', 'diploblastic')], ['3 · triploblastic', wt('C4', 'triploblastic')]],
  [['None', wt('C5', 'no')], ['None', wt('C5', 'no') + 0.15], ['Coelom', wt('C5', 'coelom')]],
  [['No', wt('C6', 'not')], ['No', wt('C6', 'not') + 0.15], ['Segmented', wt('C6', 'segmented')]],
  [['No', wt('C7', 'None')], ['No', wt('C7', 'None') + 0.15], ['No', wt('C7', 'None') + 0.3]]];
$('#ga').innerHTML = ANS.map((row, r) => row.map(([s], c) => `<div class="ga" id="ga${r}${c}" style="left:${852 + c * 240}px;top:${223 + r * 54}px">${s}</div>`).join('')).join('');
const tCq = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'].map(id => T0(id));
const SWL = ['Q1 · HOW ARE THE CELLS ORGANISED?', 'Q2 · HOW MANY CUTS GIVE MATCHING HALVES?', 'Q3 · HOW MANY GERM LAYERS?', 'Q4 · IS THERE A COELOM?', 'Q5 · IS THE BODY SEGMENTED?', 'Q6 · IS THERE A NOTOCHORD?'];
const sw = $('#swS'), SG = SQ.map(() => mk(sw, 'g', {})), CX3 = [96, 280, 464];
const swCap = (g, i, s, col) => txt(g, CX3[i], 360, s, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600, fill: col || C.mute });
const sw0 = []; { const g = SG[0]; AN.draw('sponge', g, CX3[0], 200, 0.62); AN.draw('jelly', g, CX3[1], 170, 0.62); AN.draw('roach', g, CX3[2], 206, 0.6);
  ['LOOSE CELLS', 'TISSUES', 'ORGAN SYSTEMS'].forEach((s, i) => sw0.push(swCap(g, i, s))); }
const sw1 = {}; { const g = SG[1]; AN.draw('sponge', g, CX3[0], 205, 0.6, { cut: false });
  sw1.a = mk(g, 'line', { x1: CX3[0] - 70, y1: 120, x2: CX3[0] + 70, y2: 300, stroke: RED, 'stroke-width': 3.5, 'stroke-dasharray': '10 7' });
  AN.draw('jellyTop', g, CX3[1], 205, 0.62); sw1.b = mk(g, 'line', { x1: CX3[1], y1: 125, x2: CX3[1], y2: 285, stroke: RED, 'stroke-width': 3.5, 'stroke-dasharray': '10 7' });
  AN.draw('roach', g, CX3[2], 214, 0.58); sw1.c = mk(g, 'line', { x1: CX3[2], y1: 115, x2: CX3[2], y2: 300, stroke: RED, 'stroke-width': 3.5, 'stroke-dasharray': '10 7' });
  ['NONE', 'RADIAL', 'BILATERAL'].forEach((s, i) => swCap(g, i, s)); }
const disc = (g, x, y, layers) => layers.map(([f, s, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': 2.5 }));
const sw2 = {}; { const g = SG[2]; AN.draw('sponge', g, CX3[0], 205, 0.6, { cut: false });
  sw2.a = disc(g, CX3[1], 205, [['#DCE6F5', ECTO, 72], ['#F4F2EA', '#B8BCC6', 56], ['#F6E5B5', ENDO, 44], ['#fff', ENDO, 28]]);
  sw2.b = disc(g, CX3[2], 205, [['#DCE6F5', ECTO, 72], ['#F1D2CA', MESO, 58], ['#F6E5B5', ENDO, 44], ['#fff', ENDO, 28]]);
  ['NO TRUE TISSUES', '2 · DIPLOBLASTIC', '3 · TRIPLOBLASTIC'].forEach((s, i) => swCap(g, i, s)); }
const sw3 = {}; { const g = SG[3]; AN.draw('sponge', g, CX3[0], 205, 0.6, { cut: false });
  disc(g, CX3[1], 205, [['#DCE6F5', ECTO, 72], ['#F4F2EA', '#B8BCC6', 56], ['#F6E5B5', ENDO, 44], ['#fff', ENDO, 28]]);
  sw3.c = disc(g, CX3[2], 205, [['#DCE6F5', ECTO, 72], [COEL, MESO, 62], ['#F1D2CA', MESO, 36], ['#F6E5B5', ENDO, 30], ['#fff', ENDO, 20]]);
  ['NO CAVITY', 'NO CAVITY', 'COELOM'].forEach((s, i) => swCap(g, i, s)); }
const sw4 = {}; { const g = SG[4]; AN.draw('sponge', g, CX3[0], 205, 0.6, { cut: false }); AN.draw('jelly', g, CX3[1], 175, 0.6);
  sw4.seg = []; for (let k = 0; k < 6; k++) sw4.seg.push(mk(g, 'rect', { x: CX3[2] - 40 + (k % 2 ? 2 : 0), y: 120 + k * 30, width: 80 - (k % 2 ? 4 : 0), height: 28, rx: 12, fill: AN.COL.roach, stroke: BR, 'stroke-width': 3 }));
  ['NOT SEGMENTED', 'NOT SEGMENTED', 'SEGMENTED'].forEach((s, i) => swCap(g, i, s)); }
const sw5 = {}; { const g = SG[5]; [['sponge', 205, 0.6, { cut: false }], ['jelly', 175, 0.6, {}], ['roach', 214, 0.58, {}]].forEach(([k, y, s, o], i) => AN.draw(k, g, CX3[i], y, s, o));
  sw5.x = CX3.map(x => { const e = mk(g, 'g', {}); mk(e, 'circle', { cx: x + 52, cy: 110, r: 22, fill: '#FBE9E9', stroke: RED, 'stroke-width': 3 }); mk(e, 'path', { d: `M${x + 44},102 l16,16 m0,-16 l-16,16`, stroke: RED, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); return e; });
  ['NO ROD', 'NO ROD', 'NO ROD'].forEach((s, i) => swCap(g, i, s)); }

/* ---------- U: jellyfish vs starfish ---------- */
const ujw = AN.draw('jelly', $('#uaS'), 392, 120, 0.85);
AN.draw('star', $('#ubS'), 392, 150, 1.0);
const CRA = [['SYMMETRY', 'Radial'], ['GERM LAYERS', 'Two · diploblastic'], ['BODY CAVITY', 'None']];
const CRB = [['SYMMETRY', 'Radial (adult)'], ['GERM LAYERS', 'Three · triploblastic'], ['BODY CAVITY', 'True coelom'], ['LARVA', 'Bilateral']];
$('#crA').innerHTML = CRA.map(([k, v], i) => `<div class="cr" id="ca${i}" style="top:${330 + i * 56}px"><b>${k}</b>${v}</div>`).join('');
$('#crB').innerHTML = CRB.map(([k, v], i) => `<div class="cr" id="cb${i}" style="top:${330 + i * 56}px"><b>${k}</b>${v}</div>`).join('');
const tCa = [wt('U2', 'radial'), wt('U2', 'two'), wt('U2', 'no')], tCb = [wt('U3', 'radial'), wt('U3', 'three'), wt('U3', 'true'), wt('U3', 'bilateral')];
const th1 = PUC.think($('#th1'), { q: 'A jellyfish and a starfish are both radial. Are they in the same phylum?', opts: ['Same phylum', 'Different phyla'], right: 1, why: 'Different: the starfish is an echinoderm, the jellyfish a coelenterate.' });

/* ---------- P: branching map ---------- */
const ND = [['n0', 'Kingdom Animalia', 36, 229, 250, '', tP1 + 0.4],
  ['q1', 'CELLS ONLY', 340, 84, 230, 'q', wt('P2', 'Cells')], ['l1', 'Porifera', 640, 84, 230, 'ph', wt('P2', 'Porifera')],
  ['q2', '2 GERM LAYERS', 340, 185, 230, 'q', wt('P3', 'Two')], ['l2', 'Coelenterata', 640, 156, 230, 'ph', wt('P3', 'coelenterates')], ['l3', 'Ctenophora', 640, 214, 230, 'ph', wt('P3', 'comb')],
  ['q3', '3 GERM LAYERS', 340, 373, 230, 'q', wt('P4', 'Three')],
  ['q4', 'NO CAVITY', 640, 296, 230, 'q', wt('P4', 'No')], ['l4', 'Platyhelminthes', 930, 296, 270, 'ph', wt('P4', 'flatworms')],
  ['q5', 'FALSE CAVITY', 640, 360, 230, 'q', wt('P4', 'false')], ['l5', 'Aschelminthes', 930, 360, 270, 'ph', wt('P4', 'roundworms')],
  ['q6', 'TRUE COELOM', 640, 446, 230, 'q', wt('P4', 'true')],
  ['q7', 'NO NOTOCHORD', 930, 424, 270, 'q', wt('P5', 'non')], ['l7', 'Annelida · Arthropoda · Mollusca', 1224, 372, 340, 'ph', wt('P5', 'non') + 0.35], ['l8', 'Echinodermata · Hemichordata', 1224, 428, 340, 'ph', wt('P5', 'non') + 0.5],
  ['q8', 'NOTOCHORD', 930, 500, 270, 'q', wt('P5', 'chordates')], ['l9', 'Chordata', 1224, 500, 340, 'ph', wt('P5', 'chordates') + 0.25]];
$('#nds').innerHTML = ND.map(([id, s, x, y, w, c]) => `<div class="nd ${c}" id="tn${id}" style="left:${x}px;top:${y}px;width:${w}px;${id === 'l7' || id === 'l8' ? 'font-size:19px' : ''}">${s}</div>`).join('');
const NI = {}; ND.forEach(n => NI[n[0]] = n);
const EDG = [['n0', 'q1'], ['n0', 'q2'], ['n0', 'q3'], ['q1', 'l1'], ['q2', 'l2'], ['q2', 'l3'], ['q3', 'q4'], ['q3', 'q5'], ['q3', 'q6'], ['q4', 'l4'], ['q5', 'l5'], ['q6', 'q7'], ['q6', 'q8'], ['q7', 'l7'], ['q7', 'l8'], ['q8', 'l9']];
const pm = $('#pmS');
const EL = EDG.map(([a, b]) => { const A = NI[a], B = NI[b], x1 = A[2] + A[4], y1 = A[3] + 26, x2 = B[2], y2 = B[3] + 26, xm = x1 + 30;
  return [mk(pm, 'path', { d: `M${x1},${y1} H${xm} V${y2} H${x2}`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' }), B[6]]; });

/* ---------- W: earthworm ---------- */
const wl = $('#wlS'), ww = AN.draw('worm', wl, 392, 220, 1, { n: 22, L: 660, clit: 1 });
const WLB = [[...ww.p('seg'), 230, 110, 'Segments (rings)', 'start'], [...ww.p('front'), 640, 330, 'Front end', 'end']].map(([px, py, lx, ly, s, an]) => {
  const ln = mk(wl, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(wl, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(wl, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
const wx = mk(wl, 'g', {}); disc(wx, 130, 420, [['#DCE6F5', ECTO, 58], [COEL, MESO, 48], ['#F1D2CA', MESO, 26], ['#F6E5B5', ENDO, 21], ['#fff', ENDO, 13]]);
const wxt = mk(wl, 'text', { x: 210, y: 412, class: 'zl' }); wxt.textContent = 'Cut across:'; const wxt2 = mk(wl, 'text', { x: 210, y: 446, class: 'zl', fill: GRN }); wxt2.textContent = 'a true coelom';
const WR = [['LEVEL', 'Organ system', wt('W2', 'Organ')], ['SYMMETRY', 'Bilateral', wt('W3', 'Bilateral')], ['GERM LAYERS', 'Three · triploblastic', wt('W4', 'Triploblastic')],
  ['COELOM', 'True coelom', wt('W5', 'true')], ['SEGMENTS', 'Yes · ring after ring', wt('W5', 'yes', 1)], ['NOTOCHORD', 'None · non-chordate', wt('W6', 'No')]];
$('#wrs').innerHTML = WR.map(([q, a], i) => `<div class="wr" id="wr${i}" style="top:${74 + i * 68}px;height:60px"><div class="wq">${q}</div><div class="wa2" id="wa${i}" style="top:6px">${a}</div></div>`).join('');
const avW = PUC.avatar($('#sW'), { x: 160 + 420, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'All six answered!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A sponge is a plant: it never moves', right: 'A sponge is an animal: no cell walls, no chlorophyll' });
const tS = $('#tS'), tsp = AN.draw('sponge', tS, 120, 146, 0.86);
const tIn = [-40, 12, 62].map(y => mk(tS, 'path', { d: `M${(120 - 0.86 * SW_(y) - 48).toFixed(1)},${146 + y * 0.86} L${(120 - 0.86 * SW_(y) - 6).toFixed(1)},${146 + y * 0.86}`, stroke: WAT, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-dasharray': '10 8', fill: 'none' }));
const TC = ['NO CELL WALLS', 'NO CHLOROPHYLL', 'FOOD FROM WATER'].map((s, i) => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x: 250, y: 64 + i * 58, width: 236, height: 44, rx: 10, fill: '#E3F1E7' }); txt(g, 368, 92 + i * 58, s, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.2, 'font-weight': 600, fill: '#1F6B3F' }); return g; });
const tTc = [wt('X3', 'cell'), wt('X3', 'chlorophyll'), wt('X3', 'food')];
const where = PUC.where($('#wa'), { on: [], type: 'Statement or match questions: a group with its level, symmetry, germ layers or coelom' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Match each feature with the right animal group.<div class="mt"><div><div class="h">COLUMN I · FEATURE</div><div><b>a</b>Cellular level</div><div><b>b</b>Diploblastic</div><div><b>c</b>Acoelomate</div><div><b>d</b>Metameric segmentation</div></div><div><div class="h">COLUMN II · GROUP</div><div><b>i</b>Coelenterates</div><div><b>ii</b>Platyhelminthes</div><div><b>iii</b>Sponges</div><div><b>iv</b>Earthworm</div></div></div>',
  opts: ['a-i, b-iii, c-ii, d-iv', 'a-iii, b-i, c-ii, d-iv', 'a-iii, b-ii, c-i, d-iv', 'a-iv, b-i, c-ii, d-iii'], right: 1, optW: 474, optY: 404, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['a-iii · sponges: cellular'], ['b-i · coelenterates: 2 layers'], ['c-ii · flatworms: no cavity'], ['d-iv · earthworm: metameric']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Sponges'), wt('A2', 'Coelenterates'), wt('A3', 'Flatworms'), wt('A3', 'earthworm')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · basis of animal classification', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Bases</b>: level · symmetry · germ layers · coelom · segments · notochord', '<b>Levels</b>: cellular (sponges) › tissue › organ › organ system',
    '<b>Symmetry</b>: none (sponges) · radial (jellyfish) · bilateral (cockroach)', '<b>Germ layers</b>: 2 = diploblastic &nbsp;·&nbsp; 3 = triploblastic',
    '<b>Notochord</b>: chordates have one, non-chordates do not'] });
const YQ = ['Name the six features used to classify animals.', 'Why is symmetry alone not enough to place an animal?', 'Is a sponge a plant or an animal, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 32', topic: 'Crowd, team or machine? Levels of Organisation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('P5') - 0.2, 1.05, 960, 600], [T1('P5') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1;
  Q6.forEach((_, i) => { const s = $('#q6' + i), ic = $('#q6i' + i); ic.style.left = (s.offsetWidth / 2 - 18) + 'px'; ic.style.top = (s.offsetHeight / 2 - 18) + 'px'; });
}
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };

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
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, TAGS[i][1] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'animals') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tSpc - 0.1;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spc'), t, tSpc + 0.15, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) {
      for (let k = 0; k < 56; k++) M.vis($('#sp' + k), t, tSpc + 0.2 + (k % 14) * 0.03 + Math.floor(k / 14) * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.SNAP, fade: 0.08 });
      M.vis($('#spBig'), t, tMil - 0.5, 1e9, { dy: 12 }); M.count($('#spN'), t, tMil - 0.5, 1.2, 0, 1000000, v => Math.round(v).toLocaleString('en-US'));
      M.vis($('#spSrc'), t, tMil + 0.4, 1e9, { dy: 8 });
      Q6.forEach((_, i) => { const s = $('#q6' + i), on = M.io((t - tSix - 0.25 - i * 0.12) / 0.3);
        M.vis(s, t, T0('H5') + 0.1 + i * 0.06, 1e9, { dy: 10 }); s.style.borderStyle = on > 0.5 ? 'solid' : 'dashed'; s.style.borderColor = mix('#CBD0DA', C.ac, on); s.style.background = mix('#FFFFFF', C.ac2, on);
        $('#q6q' + i).style.opacity = (1 - on).toFixed(3); $('#q6i' + i).style.opacity = on.toFixed(3); });
      M.vis($('#q6P'), t, wt('H5', 'sort') - 0.1, 1e9, POP);
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lk0'), t, wt('B2', 'bat') - 0.1, 1e9, POP); M.vis($('#lk1'), t, wt('B2', 'crow') - 0.1, 1e9, POP);
    M.vis($('#gp0'), t, wt('B2', 'mammal') - 0.1, 1e9, { dy: 12 }); M.vis($('#gp1'), t, wt('B2', 'bird') - 0.1, 1e9, { dy: 12 });
    M.vis($('#blP'), t, wt('B2', 'bird') + 0.4, 1e9, POP);
    M.vis($('#bp'), t, T0('B3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(bpG, t, T0('B3') + 0.2, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.2 });
    bLab.forEach((l, i) => { M.draw(l.ln, t, tBl[i], 0.4); M.vis(l.dot, t, tBl[i] - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - tBl[i] - 0.3) / 0.25).toFixed(3); });
    M.vis($('#bpP'), t, wt('B4', 'basis') - 0.1, 1e9, POP);
  }

  /* Z: three animals */
  const zOn = t >= tZ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('L1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => lite($('#zc' + i), i < cur, i === cur));
    M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      let e, x, tr = '';
      if (k === 0) { e = M.io((t - tZ[0]) / 0.6); x = M.io((t - tZ[1]) / 0.75); const sc = 1 + 2.4 * x; tr = x > 0 ? `translate(200 262) scale(${sc.toFixed(4)}) translate(-200 -262)` : ''; }
      else if (k === 1) { e = M.io((t - tZ[1] - 0.25) / 0.85); x = M.io((t - tZ[2]) / 0.6); const sc = 0.35 + 0.65 * e; tr = `translate(${(-260 * x).toFixed(1)} 0) translate(400 286) scale(${sc.toFixed(4)}) translate(-400 -286)`; }
      else { e = M.io((t - tZ[k] - 0.1) / 0.6); x = k < 3 ? M.io((t - tZ[k + 1]) / 0.6) : 0; tr = `translate(${(260 * (1 - e) - 260 * x).toFixed(1)} 0)`; }
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      attr(g, 'transform', tr); g.style.opacity = Math.min(e, 1 - x).toFixed(3);
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
    });
    z0n.forEach((e, i) => e.style.opacity = M.clamp((t - tZ1 - 0.5 - i * 0.25) / 0.3).toFixed(3));
    M.draw(FOC0, t, tZ[1] - 0.7, 0.5);
    // water through the sponge
    const wi = M.clamp((t - tWater) / 0.4), wo = M.clamp((t - tOut1) / 0.4);
    flowIn.forEach(f => { f.style.opacity = wi; f.style.strokeDashoffset = (-(t * 40) % 22).toFixed(1); });
    flowOut.style.opacity = wo; flowHead.style.opacity = wo; flowOut.style.strokeDashoffset = ((t * 40) % 24).toFixed(1);
    z0[1].wig(t); je2.wig(t);
    const ci = M.clamp((t - tCut) / 0.4); cut2.style.opacity = ci; cutT.style.opacity = ci; attr(cut2, 'transform', `rotate(${(((t - tCut) * 45) % 180).toFixed(1)} 850 290)`);
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, T0('Z6') + 0.6, 1e9);
  }

  /* L: six questions */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lf'), t, tL1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#lr'), t, tL1 + 0.2, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.7); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tSt.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 80]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, T0('L8'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let st = -1; tFq.forEach((tt, i) => { if (t >= tt - 0.3) st = i; });
    FG.forEach((g, i) => { const on = i === st; const a = M.clamp((t - tFq[i] + 0.3) / 0.35) * (1 - M.clamp((t - (tFq[i + 1] ?? 1e9) + 0.3) / 0.25)); M.hide(g, a <= 0); g.style.opacity = a.toFixed(3); M.hide($('#fq' + i), a <= 0); $('#fq' + i).style.opacity = a.toFixed(3); });
    const lt = t - tL1;
    f0.loose.forEach((c, k) => { attr(c.e, 'cx', (c.x + 8 * Math.sin(lt * 1.3 + k)).toFixed(1)); attr(c.e, 'cy', (c.y + 8 * Math.cos(lt * 1.1 + k * 2)).toFixed(1)); });
    attr(f1.rot, 'transform', `rotate(${((lt * 50) % 180).toFixed(1)} 220 290)`); f1.bi.style.opacity = (0.55 + 0.45 * Math.sin(lt * 4)).toFixed(3);
    const p2 = ((t - tFq[2]) % 3.2 + 3.2) % 3.2; f2.a.forEach((c, i) => c.style.opacity = M.clamp((p2 - i * 0.35) / 0.3)); f2.b.forEach((c, i) => c.style.opacity = M.clamp((p2 - i * 0.35) / 0.3));
    f3.r[2].setAttribute('fill', mix(COEL, '#A9CFE6', 0.5 + 0.5 * Math.sin(lt * 3)));
    f3.lab.forEach((e, i) => e.style.opacity = M.clamp((t - tFq[3] - 0.4 - i * 0.35) / 0.3));
    f4.w.segs.forEach((s, k) => { const ph = Math.max(0, Math.cos((lt * 2.2 - k * 0.5))); s.setAttribute('fill', mix(AN.COL.worm, GRN, ph > 0.92 ? (ph - 0.92) / 0.08 : 0)); });
    M.draw(f5.rod, t, tFq[5] + 0.3, 0.8); M.draw(f5.l, t, tFq[5] + 1.1, 0.3); f5.t.style.opacity = M.clamp((t - tFq[5] - 1.3) / 0.25);
    { const u = (lt * 0.5) % 1; f6.a.forEach((d, k) => { const v = (u + k / 3) % 1, a = v < 0.5 ? v * 2 : 2 - v * 2; attr(d, 'cx', (240 - 80 * a).toFixed(1)); attr(d, 'cy', (200 + 100 * a).toFixed(1)); });
      f6.b.forEach((d, k) => { const v = (u + k / 4) % 1; attr(d, 'cx', (460 + 260 * v).toFixed(1)); attr(d, 'cy', 290); d.style.opacity = M.clamp(v * 8) * M.clamp((1 - v) * 8); }); }
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'sorted') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'looks') - 0.1, 0.9);
  }

  /* C: run all three */
  const cOn = t >= tC1 - 0.1 && t < tU1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cw'), t, tC1 + 0.3, OUT('U1'), { dy: 36, ...o });
    let cur = -1; tCq.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    SQ.forEach((_, i) => { M.vis($('#sq' + i), t, tC1 + 0.5 + i * 0.06, 1e9, { dy: 10 }); lite($('#sq' + i), i < cur, i === cur); });
    M.vis($('#sw'), t, tC1 + 0.6, 1e9, { dy: 16 });
    M.setT($('#swL'), SWL[Math.max(0, cur)]); M.vis($('#swL'), t, tCq[0], 1e9, { dy: 8 });
    SG.forEach((g, i) => { const a = M.clamp((t - tCq[i] + 0.1) / 0.35) * (1 - M.clamp((t - (tCq[i + 1] ?? 1e9) + 0.1) / 0.25)); M.hide(g, a <= 0); g.style.opacity = a.toFixed(3); });
    AH.forEach((_, c) => M.vis($('#gh' + c), t, tC1 + 0.7 + c * 0.1, 1e9, { dy: 10 }));
    SQ.forEach((_, r) => { M.vis($('#gq' + r), t, tC1 + 0.9 + r * 0.05, 1e9, { dx: -10, dy: 0 }); $('#gq' + r).style.color = r === cur ? C.ac : C.mute; });
    ANS.forEach((row, r) => row.forEach(([s, tt], c) => { const el = $('#ga' + r + c), yes = !['None', 'No', '-'].includes(s); M.vis(el, t, tt - 0.1, 1e9, POP);
      const on = M.io((t - tt) / 0.3); el.style.background = mix('#FFFFFF', yes ? C.ac2 : C.soft, on); el.style.borderColor = mix(C.line, yes ? C.ac : C.line, on); el.style.color = yes ? '#1F6B3F' : C.mute; }));
    // stage loops
    const lt = t - tC1;
    sw0.forEach((e, i) => e.setAttribute('fill', t >= ANS[0][i][1] ? C.ac : C.mute));
    attr(sw1.b, 'transform', `rotate(${((lt * 50) % 180).toFixed(1)} ${CX3[1]} 205)`); sw1.a.style.opacity = (0.5 + 0.5 * Math.sin(lt * 4)).toFixed(3);
    const p2 = ((t - tCq[2]) % 2.6 + 2.6) % 2.6; [...sw2.a, ...sw2.b].forEach((c, i) => c.style.opacity = M.clamp((p2 - (i % 4) * 0.3) / 0.25));
    sw3.c[1].setAttribute('fill', mix(COEL, '#A9CFE6', 0.5 + 0.5 * Math.sin(lt * 3)));
    sw4.seg.forEach((s, k) => { const ph = Math.max(0, Math.cos(lt * 2.4 - k * 0.7)); s.setAttribute('fill', mix(AN.COL.roach, GRN, ph > 0.9 ? (ph - 0.9) / 0.1 : 0)); });
    sw5.x.forEach((e, i) => M.vis(e, t, ANS[5][i][1], 1e9, { ...POP, sc: 0.3 }));
  }

  /* U: jellyfish vs starfish, then think */
  const uOn = t >= tU1 - 0.1 && t < tP1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U4');
    M.vis($('#ua'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o }); ujw.wig(t);
    CRA.forEach((_, i) => { const el = $('#ca' + i); M.vis(el, t, tCa[i] - 0.1, 1e9, { dx: -16, dy: 0 }); });
    M.vis($('#ub'), t, T0('U3') - 0.15, out, { dx: 60, dy: 0, ...o });
    CRB.forEach((_, i) => { const el = $('#cb' + i); M.vis(el, t, tCb[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const on = M.io((t - tCb[i]) / 0.3);
      el.style.background = mix(C.soft, i === 0 ? C.ac2 : '#FCE3D4', on); });
    $('#ca0').style.background = mix(C.soft, C.ac2, M.io((t - tCb[0]) / 0.3));
    [1, 2].forEach(i => $('#ca' + i).style.background = mix(C.soft, '#FCE3D4', M.io((t - tCb[i]) / 0.3)));
    M.vis($('#th1'), t, tU4 + 0.05, OUT('P1'), { dy: 36, ...o });
    th1(t, { tin: tU4, tOpts: wt('U4', 'same') - 0.1, tCount: T1('U4') + 0.05, dur: 3, tAns: T0('U5') - 0.02, tWhy: wt('U5', 'starfish') });
  }

  /* P: branching map */
  const pOn = t >= tP1 - 0.1 && t < tW1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pm'), t, tP1 + 0.05, OUT('W1'), { dy: 36, ...o });
    ND.forEach(([id, , , , , , tt]) => M.vis($('#tn' + id), t, tt - 0.1, 1e9, POP));
    EL.forEach(([e, tt]) => M.draw(e, t, tt - 0.45, 0.4));
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wr'), t, tW1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const lt = t - tW1;
    ww.segs.forEach((s, k) => { const ph = Math.max(0, Math.cos(lt * 2 - k * 0.45)); attr(s, 'transform', `translate(0 ${(-4 * ph * ph).toFixed(2)})`); });
    WLB.forEach((l, i) => { const t0 = i ? wt('W2', 'Level') : tW1 + 1.2; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
    M.vis(wx, t, wt('W5', 'coelom') - 0.1, 1e9, { ...POP, sc: 0.4 }); wxt.style.opacity = M.clamp((t - wt('W5', 'coelom')) / 0.3); wxt2.style.opacity = M.clamp((t - wt('W5', 'coelom') - 0.2) / 0.3);
    WR.forEach(([, , tt], i) => { M.vis($('#wr' + i), t, tW1 + 0.5 + i * 0.06, 1e9, { dy: 10 }); const a = $('#wa' + i); M.vis(a, t, tt - 0.1, 1e9, POP); a.style.background = mix('#FFFFFF', C.ac2, M.io((t - tt) / 0.3)); a.style.color = '#1F6B3F'; });
    M.vis($('#wrP'), t, wt('W6', 'Annelida') - 0.1, 1e9, POP);
    avW(t, T1('W6') - 0.4, out);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'sponge') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'animal') - 0.4 });
    M.vis(tsp.g, t, wt('X2', 'sponge'), 1e9, { ...POP, sc: 0.6 });
    const fi = M.clamp((t - wt('X3', 'water')) / 0.3); tIn.forEach(f => { f.style.opacity = fi; f.style.strokeDashoffset = (-(t * 40) % 18).toFixed(1); });
    TC.forEach((g, i) => M.vis(g, t, tTc[i] - 0.1, 1e9, { dx: -12, dy: 0 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statement') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') + 0.4, tCount, tAns });
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
