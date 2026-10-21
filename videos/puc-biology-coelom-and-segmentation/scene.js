// PUC Biology Ep 34: Coelom and Segmentation (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = AN.BR, GRN = C.ac, ECTO = AN.ECTO, MESO = AN.MESO, ENDO = AN.ENDO, COEL = AN.COEL, NOTO = '#3D7A8C', RED = '#C0392B', ECf = '#DCE6F5', MEf = '#F1D2CA', ENf = '#F6E5B5', WORM = AN.COL.worm;
Object.assign(M.IC, AN.IC, { drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'] });
const lab = (g, px, py, lx, ly, s, an = 'start') => { const ln = mk(g, 'path', { d: `M${px.toFixed(1)},${py.toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const labT = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };
const pol = (x, y, r, a) => [x + r * Math.cos(a), y + r * Math.sin(a)];
// cross-section of a body: kind 'c' coelomate, 'p' pseudocoelomate, 'a' acoelomate
const sec = (g, x, y, R, kind) => { const e = {}, c = (r, f, s, w = 2.5) => mk(g, 'circle', { cx: x, cy: y, r: r * R, fill: f, stroke: s, 'stroke-width': w });
  e.ecto = c(1, ECf, ECTO);
  if (kind === 'c') { e.mo = c(0.88, MEf, MESO); e.cav = c(0.78, COEL, MESO, 3); e.mi = c(0.5, MEf, MESO); }
  else if (kind === 'p') { e.cav = c(0.88, COEL, 'none', 0); e.pou = [];
    for (let k = 0; k < 7; k++) { const [px, py] = pol(x, y, 0.8 * R, k * 2 * Math.PI / 7 + 0.3); e.pou.push(mk(g, 'ellipse', { cx: px, cy: py, rx: 0.09 * R, ry: 0.06 * R, fill: MEf, stroke: MESO, 'stroke-width': 2, transform: `rotate(${(k * 360 / 7 + 17 + 90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})` })); }
    for (let k = 0; k < 4; k++) { const [px, py] = pol(x, y, 0.5 * R, k * Math.PI / 2 + 0.8); e.pou.push(mk(g, 'circle', { cx: px, cy: py, r: 0.06 * R, fill: MEf, stroke: MESO, 'stroke-width': 2 })); } }
  else { e.mf = c(0.88, MEf, MESO); for (let k = 0; k < 14; k++) { const [px, py] = pol(x, y, (0.6 + 0.18 * (k % 2)) * R, k * Math.PI / 7); mk(g, 'circle', { cx: px, cy: py, r: 3, fill: '#D8968A' }); } }
  e.endo = c(0.42, ENf, ENDO); e.lum = c(0.32, '#FFFFFF', ENDO, 2); return e; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tT = T0('T1'), tC1 = T0('C1'), tD1 = T0('D1'), tU1 = T0('U1'), tU4 = T0('U4'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['drop', 'A wet path', 'AFTER THE RAIN', 'garden'], ['worm', 'An earthworm', 'CRAWLS OUT', 'earthworm'], ['cavity', 'And inside?', 'A HIDDEN SPACE', 'crawls']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.1)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: the garden path ---------- */
const hj = $('#hjS');
mk(hj, 'rect', { x: 0, y: 70, width: 784, height: 230, fill: '#EEF3F6' });
mk(hj, 'path', { d: 'M0,300 C200,286 560,312 784,296 L784,580 L0,580 Z', fill: '#C9A27A' });
[[150, 410, 70, 14], [560, 450, 90, 16], [660, 360, 50, 10]].forEach(([x, y, rx, ry]) => mk(hj, 'ellipse', { cx: x, cy: y, rx, ry, fill: '#BFD9EA', stroke: '#8DB5CF', 'stroke-width': 2 }));
for (let k = 0; k < 40; k++) { const x = 8 + k * 20; mk(hj, 'path', { d: `M${x},${300 - (k % 3) * 2} q-4,-22 -10,-30 M${x + 6},${300} q2,-20 8,-28`, stroke: '#4E8A4C', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); }
const drops = []; for (let k = 0; k < 14; k++) drops.push({ x: 30 + k * 55, ph: k * 0.37, e: mk(hj, 'line', { stroke: '#8DB5CF', 'stroke-width': 3, 'stroke-linecap': 'round' }) });
const hw = AN.draw('worm', hj, 400, 390, 1, { n: 20, L: 540, clit: 1 });
const HC = [['Coelomates', 'coelomates'], ['Pseudocoelomates', 'pseudocoelomates'], ['Acoelomates', 'acoelomates'], ['Metamerism', 'metamerism'], ['Notochord', 'notochord']];
$('#hcs').innerHTML = HC.map(([s], i) => `<span class="chp" id="hc${i}" style="position:relative">${s}</span>`).join('');

/* ---------- B: tube inside a tube ---------- */
const bw = $('#bwS');
const bOut = mk(bw, 'path', { d: 'M110,150 L860,150 C900,150 920,190 920,280 C920,370 900,410 860,410 L110,410 C70,410 50,370 50,280 C50,190 70,150 110,150 Z', fill: '#F3E4D0', stroke: BR, 'stroke-width': 4 });
const bSp = mk(bw, 'rect', { x: 80, y: 176, width: 820, height: 208, rx: 40, fill: COEL, opacity: 0 });
const bIn = mk(bw, 'rect', { x: 40, y: 250, width: 900, height: 60, rx: 30, fill: ENf, stroke: BR, 'stroke-width': 3.5 });
const bX = 1260, bY = 280; const bO2 = mk(bw, 'circle', { cx: bX, cy: bY, r: 176, fill: '#F3E4D0', stroke: BR, 'stroke-width': 4 });
const bS2 = mk(bw, 'circle', { cx: bX, cy: bY, r: 150, fill: COEL, opacity: 0 }); const bI2 = mk(bw, 'circle', { cx: bX, cy: bY, r: 60, fill: ENf, stroke: BR, 'stroke-width': 3.5 }); mk(bw, 'circle', { cx: bX, cy: bY, r: 34, fill: '#fff', stroke: BR, 'stroke-width': 2 });
mk(bw, 'circle', { cx: bX, cy: bY, r: 150, fill: 'none', stroke: BR, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const bQ = [[300, 214], [640, 350], [bX + 100, bY - 40], [bX - 96, bY + 60]].map(([x, y]) => txt(bw, x, y, '?', { 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 600, fill: '#3A7FB0' }));
const bLine = [mk(bw, 'rect', { x: 80, y: 176, width: 820, height: 208, rx: 40, fill: 'none', stroke: MESO, 'stroke-width': 4, 'stroke-dasharray': '12 8' }), mk(bw, 'circle', { cx: bX, cy: bY, r: 148, fill: 'none', stroke: MESO, 'stroke-width': 4, 'stroke-dasharray': '12 8' })];
const LB = [lab(bw, 600, 152, 640, 96, 'Body wall (outer tube)'), lab(bw, 760, 280, 940, 470, 'Gut (inner tube)', 'end')];
txt(bw, 485, 470, 'ALONG THE BODY', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 }); const bCT = txt(bw, bX, 494, 'CUT ACROSS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });

/* ---------- Z: zoom ladder into the earthworm ---------- */
const ZN = ['EARTHWORM', 'CUT LENGTHWISE', 'CUT ACROSS'], ZS = ['x1', 'x4', 'x10'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4')];
const LVI = [['RUNG 1 OF 3', 'Earthworm', 'Divided into segments, from the front end to the back.', 'Phylum Annelida.'],
  ['RUNG 2 OF 3', 'Cut lengthwise', 'Thin walls divide the inside too.', 'Some organs repeat in every segment.'],
  ['RUNG 3 OF 3', 'Cut across', 'Body wall outside, gut in the middle.', 'Between them: the coelom, lined by mesoderm.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:52px">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The rings go all the way in!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const zw = AN.draw('worm', ZG[0], 528, 270, 1, { n: 26, L: 920, clit: 1 });
const Lz0 = [lab(ZG[0], 400, 248, 360, 120, 'Segment'), lab(ZG[0], 984, 270, 980, 420, 'Front end', 'end'), lab(ZG[0], 72, 270, 80, 420, 'Back end')];
const F0 = mk(ZG[0], 'circle', { cx: 528, cy: 270, r: 64, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const zOrg = [];
{ const g = ZG[1], x0 = 70, x1 = 990;
  mk(g, 'rect', { x: x0, y: 130, width: x1 - x0, height: 270, rx: 30, fill: COEL, stroke: 'none' });
  mk(g, 'rect', { x: x0, y: 130, width: x1 - x0, height: 26, fill: ECf, stroke: ECTO, 'stroke-width': 2.5 }); mk(g, 'rect', { x: x0, y: 156, width: x1 - x0, height: 14, fill: MEf, stroke: MESO, 'stroke-width': 2 });
  mk(g, 'rect', { x: x0, y: 374, width: x1 - x0, height: 26, fill: ECf, stroke: ECTO, 'stroke-width': 2.5 }); mk(g, 'rect', { x: x0, y: 360, width: x1 - x0, height: 14, fill: MEf, stroke: MESO, 'stroke-width': 2 });
  for (let k = 0; k <= 15; k++) { const x = x0 + 30 + k * 58; mk(g, 'line', { x1: x, y1: 170, x2: x, y2: 236, stroke: MESO, 'stroke-width': 4 }); mk(g, 'line', { x1: x, y1: 294, x2: x, y2: 360, stroke: MESO, 'stroke-width': 4 }); }
  mk(g, 'rect', { x: x0, y: 236, width: x1 - x0, height: 58, fill: MEf, stroke: MESO, 'stroke-width': 2 }); mk(g, 'rect', { x: x0, y: 244, width: x1 - x0, height: 42, fill: ENf, stroke: ENDO, 'stroke-width': 2 }); mk(g, 'rect', { x: x0, y: 254, width: x1 - x0, height: 22, fill: '#fff' });
  for (let k = 0; k < 15; k++) { const x = x0 + 59 + k * 58; zOrg.push(mk(g, 'path', { d: `M${x - 12},${206} c0,-18 24,-18 24,0 c0,14 -16,14 -16,4 c0,-6 8,-6 8,0`, stroke: '#B0505A', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })); } }
const Lz1 = [lab(ZG[1], 100 + 58 * 6, 200, 380, 84, 'Septum (thin wall)'), lab(ZG[1], 700, 265, 840, 450, 'Gut', 'end'), lab(ZG[1], 129 + 58 * 9, 196, 800, 84, 'Repeated organ')];
const F1 = mk(ZG[1], 'circle', { cx: 530, cy: 265, r: 56, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const z2 = sec(ZG[2], 360, 268, 200, 'c');
const Lz2 = [lab(ZG[2], ...pol(360, 268, 194, -0.9), 660, 96, 'Body wall'), lab(ZG[2], 360 + 76, 268 - 30, 660, 330, 'Gut'), lab(ZG[2], ...pol(360, 268, 128, -0.15), 660, 200, 'Coelom'), lab(ZG[2], ...pol(360, 268, 162, 0.7), 660, 440, 'Mesoderm lining')];
const tLab = [[wt('Z2', 'segments'), wt('Z2', 'front'), wt('Z2', 'back')], [wt('Z3', 'walls'), wt('Z3', 'walls') + 0.6, wt('Z3', 'organs')], [wt('Z4', 'wall'), wt('Z4', 'gut'), wt('Z5', 'coelom'), wt('Z5', 'mesoderm')]];
const LBZ = [Lz0, Lz1, Lz2], FOC = [[528, 270], [530, 265], null], FR = [F0, F1, null];

/* ---------- L: three kinds of body ---------- */
const STEPS = [['Coelom', 'a body cavity lined by mesoderm · coelomates'], ['Coelomates', 'annelids, molluscs, arthropods, echinoderms, hemichordates, chordates'],
  ['Mesoderm in pouches', 'scattered between ectoderm and endoderm'], ['Pseudocoelom', 'a false coelom · aschelminthes (roundworms)'], ['No cavity at all', 'acoelomates · platyhelminthes (flatworms)']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${80 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why" style="font-size:${i === 1 ? 18 : 20}px">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => T0(id) + 0.45);
const lr = $('#lrS'), LX = [140, 392, 644], LK = ['c', 'p', 'a'], LS = LK.map((k, i) => sec(lr, LX[i], 230, 104, k));
const LRing = LX.map(x => mk(lr, 'circle', { cx: x, cy: 230, r: 116, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const LCap = [['COELOMATE', 'annelids to chordates'], ['PSEUDOCOELOMATE', 'aschelminthes'], ['ACOELOMATE', 'platyhelminthes']].map(([a, b], i) => [txt(lr, LX[i], 384, a, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }), mk(lr, 'text', { x: LX[i], y: 414, 'text-anchor': 'middle', class: 'sl2', fill: C.mute })]);
LCap.forEach(([, e], i) => e.textContent = [['annelids to chordates'], ['roundworms'], ['flatworms']][i][0]);
$('#lg').innerHTML = [['ECTODERM', ECTO], ['MESODERM', MESO], ['ENDODERM', ENDO], ['CAVITY', '#7FB3D5']].map(([s, c]) => `<span><b style="background:${c}"></b>${s}</span>`).join('');
const tLs = [tSt[0], tSt[2], tSt[4]];

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad"><b>coelomate</b> · pseudocoelomate · acoelomate</span>';

/* ---------- C: segmentation, the crawl ---------- */
const STC = [['SEGMENTS OUTSIDE', wt('C2', 'outside')], ['SEGMENTS INSIDE', wt('C2', 'inside')], ['ORGANS REPEAT', wt('C2', 'repeat')], ['MUSCLE WAVE', wt('C4', 'waves')]];
$('#stc').innerHTML = STC.map(([s], i) => `<span id="sc${i}">${s}</span>${i < 3 ? '<em>›</em>' : ''}`).join('');
const cw = $('#cwS'), CN = 26, CW0 = 50, CX0 = 120;
const cSeg = [], cIn = [], cSep = [], cOr = [];
for (let k = 0; k < CN; k++) cSeg.push(mk(cw, 'rect', { rx: 12, fill: k === CN - 6 || k === CN - 5 ? '#D9787A' : WORM, stroke: BR, 'stroke-width': 3 }));
const cBand = mk(cw, 'rect', { y: 330, height: 120, rx: 26, fill: COEL, stroke: ECTO, 'stroke-width': 4 });
const cGut = mk(cw, 'rect', { y: 376, height: 28, rx: 12, fill: ENf, stroke: ENDO, 'stroke-width': 2.5 });
for (let k = 1; k < CN; k++) cSep.push(mk(cw, 'line', { y1: 334, y2: 446, stroke: MESO, 'stroke-width': 3.5 }));
for (let k = 0; k < CN; k++) cOr.push(mk(cw, 'circle', { r: 8, fill: '#fff', stroke: '#B0505A', 'stroke-width': 3 }));
const cLx = txt(cw, 0, 316, 'INSIDE · LENGTHWISE CUT', { 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });
const cLy = txt(cw, 0, 186, 'OUTSIDE', { 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });

/* ---------- D: notochord ---------- */
const da = $('#daS'); AN.draw('fish', da, 392, 270, 2.3);
const dRod = mk(da, 'path', { d: `M${392 - 66 * 2.3},${270 - 14 * 2.3} L${392 + 72 * 2.3},${270 - 14 * 2.3}`, stroke: NOTO, 'stroke-width': 12, 'stroke-linecap': 'round', fill: 'none' });
const Ld = [lab(da, 392 + 30 * 2.3, 270 - 14 * 2.3, 560, 410, 'Notochord'), lab(da, 392 + 40 * 2.3, 270 - 40 * 2.3, 560, 100, 'Dorsal side (back)', 'start')];
const dSub = txt(da, 572, 448, 'FORMS IN THE EMBRYO', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: NOTO });
const db = $('#dbS'), dw = AN.draw('worm', db, 392, 280, 1, { n: 20, L: 620, clit: 1 });
const dSlot = mk(db, 'path', { d: 'M100,240 L690,240', stroke: C.dim, 'stroke-width': 10, 'stroke-dasharray': '14 12', 'stroke-linecap': 'round', fill: 'none' });
const dX = (() => { const e = mk(db, 'g', {}); mk(e, 'circle', { cx: 392, cy: 170, r: 30, fill: '#FBE9E9', stroke: RED, 'stroke-width': 3.5 }); mk(e, 'path', { d: 'M380,158 l24,24 m0,-24 l-24,24', stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' }); return e; })();
const dT = txt(db, 392, 380, 'NON-CHORDATES: PORIFERA TO ECHINODERMS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink });
const avD = PUC.avatar($('#sD'), { x: 976 + 400, y: 270 + 410, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Rings, but no rod!' });

/* ---------- U: true vs false coelom ---------- */
const uA = sec($('#uaS'), 290, 290, 196, 'c'), uB = sec($('#ubS'), 290, 290, 196, 'p');
const LuA = [lab($('#uaS'), ...pol(290, 290, 192, -1.0), 520, 100, 'Body wall'), lab($('#uaS'), ...pol(290, 290, 125, -0.3), 520, 200, 'Coelom'), lab($('#uaS'), ...pol(290, 290, 162, 0.35), 520, 300, 'Mesoderm lining'), lab($('#uaS'), ...pol(290, 290, 70, 1.0), 520, 430, 'Gut')];
const pp = uB.pou[1], ppx = +pp.getAttribute('cx'), ppy = +pp.getAttribute('cy');
const LuB = [lab($('#ubS'), ...pol(290, 290, 192, -1.0), 496, 100, 'Body wall'), lab($('#ubS'), ...pol(290, 290, 125, -0.3), 496, 200, 'Pseudocoelom'), lab($('#ubS'), ppx, ppy, 496, 300, 'Mesoderm pouches'), lab($('#ubS'), ...pol(290, 290, 70, 1.0), 496, 430, 'Gut')];
const th1 = PUC.think($('#th1'), { q: 'In a hookworm, the body cavity is not lined by mesoderm. True coelom, or pseudocoelom?', opts: ['True coelom', 'Pseudocoelom'], right: 1, why: 'Pseudocoelom. The hookworm (Ancylostoma) is an aschelminth, a roundworm.' });

/* ---------- W: sort three sections ---------- */
const WC = [['SECTION 1', 'a', 'Acoelomate', 'FITS A FLATWORM · FASCIOLA', wt('W2', 'First'), wt('W2', 'Acoelomate')], ['SECTION 2', 'p', 'Pseudocoelomate', 'FITS A ROUNDWORM · ASCARIS', wt('W3', 'Second'), wt('W3', 'Pseudocoelomate')],
  ['SECTION 3', 'c', 'Coelomate', 'SEGMENTED TOO · PHERETIMA, AN ANNELID', wt('W4', 'Third'), wt('W4', 'Coelomate')]];
$('#cols').innerHTML = WC.map(([h, , n, c], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 516}px"><div class="ch2">${h}</div><div class="dz"><svg id="dzs${i}" width="496" height="290" style="position:absolute;left:0;top:0"></svg></div>
  <div class="it" id="it${i}"><div class="inm">${n}</div><div class="inc" id="ic${i}">${c}</div></div></div>`).join('');
const WS = WC.map((w, i) => sec($('#dzs' + i), 248, 145, 118, w[1]));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Any body cavity is a coelom', right: 'Only a cavity lined by mesoderm is a coelom' });
const tS = $('#tS'); const tP = sec(tS, 120, 122, 82, 'p'), tC = sec(tS, 340, 122, 82, 'c');
const tTg = [['PSEUDOCOELOM', 120, '#FBE9E9', '#8A1C1C'], ['COELOM', 340, '#E3F1E7', '#1F6B3F']].map(([s, x, b, f]) => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x: x - 92, y: 218, width: 184, height: 40, rx: 9, fill: b }); txt(g, x, 244, s, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: f }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Statement questions: a group with its body cavity, metamerism or the notochord' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Platyhelminthes are acoelomates.</div><div class="sl"><b>II</b>In aschelminthes, the body cavity is fully lined by mesoderm.</div><div class="sl"><b>III</b>The earthworm shows metameric segmentation.</div><div class="sl"><b>IV</b>The notochord is a mesodermal rod on the dorsal side.</div>',
  opts: ['I and II only', 'II and III only', 'I, II and IV only', 'I, III and IV only'], right: 3, optW: 474, optY: 404 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Pouches only: pseudocoelom'], ['<b style="color:var(--ok)">I, III, IV</b> are true'], ['Notochord: mesoderm, dorsal']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'pouches'), wt('A3', 'One'), wt('A3', 'notochord')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · coelom and segmentation', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Coelom</b>: a body cavity lined by mesoderm (annelids to chordates)', '<b>Pseudocoelom</b>: mesoderm in scattered pouches (aschelminthes)', '<b>Acoelomate</b>: no body cavity (platyhelminthes)',
    '<b>Metamerism</b>: segments outside and inside, organs repeat (earthworm)', '<b>Notochord</b>: dorsal mesodermal rod in the embryo = chordate'] });
const YQ = ['What lines a true coelom?', 'Name one pseudocoelomate and one acoelomate.', 'What is metamerism?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 35', topic: 'Ten jars, one key: Non-Chordate Phyla, Porifera to Hemichordata', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null; function measure() { geo = 1; }
const crawl = (segs, t, on, n, w0, x0, y, h0) => { let x = x0; segs.forEach((s, k) => { const ph = on * Math.sin(t * 3 - k * 0.55), w = w0 * (1 + 0.26 * ph), h = h0 * (1 - 0.2 * ph);
  attr(s, 'x', x.toFixed(1)); attr(s, 'width', (w + 1).toFixed(1)); attr(s, 'y', (y - h).toFixed(1)); attr(s, 'height', (2 * h).toFixed(1)); s._x = x; s._w = w; x += w; }); return x; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    drops.forEach(d => { const v = ((t * 0.9 + d.ph) % 1); attr(d.e, 'x1', d.x - 6 * v); attr(d.e, 'x2', d.x - 6 * v - 4); attr(d.e, 'y1', (80 + 200 * v).toFixed(1)); attr(d.e, 'y2', (96 + 200 * v).toFixed(1)); d.e.style.opacity = (0.8 * (1 - v)).toFixed(2); });
    hw.segs.forEach((s, k) => { const ph = Math.sin(t * 3 - k * 0.55), lit = M.io((t - wt('H2', 'rings') - k * 0.04) / 0.2) * (1 - M.io((t - wt('H2', 'alike') - 0.6) / 0.4)); attr(s, 'transform', `translate(0 ${(-3 * ph).toFixed(2)})`); s.setAttribute('fill', mix(k >= 14 && k <= 15 ? '#D9787A' : WORM, GRN, lit * 0.8)); });
    M.vis($('#hdF'), t, tH3 + 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hjP'), t, wt('H2', 'chain') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#qr0'), t, wt('H3', 'rings') - 0.2, 1e9, { dx: -16, dy: 0 }); M.vis($('#qr1'), t, wt('H3', 'inside') - 0.2, 1e9, { dx: -16, dy: 0 });
    M.vis($('#an1'), t, wt('H4', 'coelom') - 0.1, 1e9, POP); M.vis($('#an0'), t, wt('H4', 'segmentation') - 0.1, 1e9, POP);
    HC.forEach(([, w], i) => M.vis($('#hc' + i), t, wt('H5', w) - 0.1, 1e9, POP));
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#bw'), t, tB1 + 0.05, OUT('Z1'), { dy: 36, ...o });
    const tw = wt('B1', 'tube'); M.vis(bOut, t, tw - 0.1, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.2 }); M.vis(bIn, t, wt('B1', 'inside') - 0.1, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.2 });
    [bO2, bI2].forEach((e, i) => M.vis(e, t, tw + 0.3 + i * 0.4, 1e9, { ...POP, sc: 0.5 })); bCT.style.opacity = M.clamp((t - tw - 0.6) / 0.3);
    labT(LB[0], t, wt('B2', 'outer')); labT(LB[1], t, wt('B2', 'inner'));
    const sp = M.clamp((t - wt('B3', 'space')) / 0.4); bSp.style.opacity = (sp * (0.55 + 0.25 * Math.sin(t * 3))).toFixed(3); bS2.style.opacity = bSp.style.opacity;
    bQ.forEach((q, i) => q.style.opacity = M.clamp((t - wt('B3', 'space') - i * 0.12) / 0.25));
    const li = M.clamp((t - wt('B3', 'lines')) / 0.3); bLine.forEach(l => { l.style.opacity = li; l.style.strokeDashoffset = ((t * 30) % 20).toFixed(1); });
    M.vis($('#bP'), t, wt('B3', 'lines') + 0.2, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('L1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => lite($('#zc' + i), i < cur, i === cur));
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sc = (k === 0 ? 1 : 0.35 + 0.65 * e) * (1 + 2.4 * x), cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = Math.min(e, 1 - x).toFixed(3);
      LBZ[k].forEach((l, i) => labT(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    zw.segs.forEach((s, k) => s.setAttribute('fill', mix(k >= 20 && k <= 21 ? '#D9787A' : WORM, GRN, M.io((t - wt('Z2', 'one') - k * 0.05) / 0.2) * (1 - M.io((t - wt('Z2', 'back') - 0.5) / 0.4)) * 0.7)));
    zOrg.forEach((e, k) => { const lit = M.clamp((t - wt('Z3', 'repeat') - k * 0.08) / 0.2); e.setAttribute('stroke', mix('#B0505A', GRN, lit)); e.setAttribute('stroke-width', 3 + lit); });
    z2.cav.setAttribute('fill', mix(COEL, '#A9CFE6', M.clamp((t - wt('Z5', 'fluid')) / 0.4) * (0.5 + 0.5 * Math.sin(t * 3))));
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z3', 'every') + 0.3, T0('Z4') - 0.1);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lf'), t, tL1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#lr'), t, tL1 + 0.2, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.7); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tSt.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let cur = 0; tLs.forEach((tt, i) => { if (t >= tt - 0.2) cur = i; });
    LS.forEach((s, i) => { const g = [s.ecto, s.endo, s.lum, s.cav, s.mo, s.mi, s.mf, ...(s.pou || [])].filter(Boolean); const on = M.clamp((t - tLs[i] + 0.3) / 0.4);
      g.forEach(e => e.style.opacity = (0.25 + 0.75 * on).toFixed(3)); LCap[i].forEach(e => e.style.opacity = (0.3 + 0.7 * on).toFixed(3)); LRing[i].style.opacity = i === cur && t > tLs[i] - 0.2 ? 1 : 0; });
    LRing.forEach(r => r.style.strokeDashoffset = ((t * 20) % 18).toFixed(1));
    if (LS[0].cav) LS[0].cav.setAttribute('fill', mix(COEL, '#A9CFE6', 0.5 + 0.5 * Math.sin(t * 3)));
    M.vis($('#lg'), t, tL1 + 0.6, 1e9, { dy: 8 });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'true') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'mesoderm') - 0.1, 0.9);
  }

  /* C: segmentation */
  const cOn = t >= tC1 - 0.1 && t < tD1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cw'), t, tC1 + 0.2, OUT('D1'), { dy: 36, ...o });
    let cur = -1; STC.forEach(([, tt], i) => { if (t >= tt - 0.1) cur = i; });
    STC.forEach((_, i) => { M.vis($('#sc' + i), t, tC1 + 0.4 + i * 0.06, 1e9, { dy: 8 }); lite($('#sc' + i), i < cur, i === cur); });
    const on = M.io((t - STC[3][1]) / 0.8), xe = crawl(cSeg, t, on, CN, CW0, CX0, 234, 28);
    cSeg.forEach((s, k) => s.setAttribute('stroke', cur === 0 ? GRN : BR));
    attr(cLy, 'x', CX0); attr(cLx, 'x', CX0);
    const inOn = M.clamp((t - STC[1][1] + 0.1) / 0.4); [cBand, cGut, cLx].forEach(e => e.style.opacity = inOn); attr(cBand, 'x', CX0); attr(cBand, 'width', (xe - CX0).toFixed(1)); attr(cGut, 'x', CX0 + 6); attr(cGut, 'width', (xe - CX0 - 12).toFixed(1));
    cSep.forEach((l, k) => { const x = cSeg[k + 1]._x; attr(l, 'x1', x.toFixed(1)); attr(l, 'x2', x.toFixed(1)); l.style.opacity = inOn; });
    cOr.forEach((c, k) => { const s = cSeg[k]; attr(c, 'cx', (s._x + s._w / 2).toFixed(1)); attr(c, 'cy', 354); const lit = M.clamp((t - STC[2][1] - k * 0.06) / 0.2); c.style.opacity = inOn * lit; c.setAttribute('fill', mix('#FFFFFF', '#F2C2C6', lit)); });
    M.vis($('#cP'), t, wt('C3', 'metamerism') - 0.1, 1e9, POP);
  }

  /* D: notochord */
  const dOn = t >= tD1 - 0.1 && t < tU1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('U1');
    M.vis($('#da'), t, tD1 + 0.2, out, { dx: -60, dy: 0, ...o });
    M.draw(dRod, t, wt('D2', 'rod') - 0.1, 0.9); labT(Ld[0], t, wt('D2', 'mesoderm')); labT(Ld[1], t, wt('D2', 'dorsal')); dSub.style.opacity = M.clamp((t - wt('D2', 'embryo')) / 0.3);
    M.vis($('#daP'), t, wt('D3', 'chordates') - 0.1, 1e9, POP);
    M.vis($('#db'), t, wt('D3', 'never') - 0.4, out, { dx: 60, dy: 0, ...o });
    dw.segs.forEach((s, k) => attr(s, 'transform', `translate(0 ${(-3 * Math.max(0, Math.sin(t * 3 - k * 0.5))).toFixed(2)})`));
    M.draw(dSlot, t, wt('D3', 'never'), 0.6); M.vis(dX, t, wt('D3', 'never') + 0.5, 1e9, { ...POP, sc: 0.3 }); dT.style.opacity = M.clamp((t - wt('D3', 'porifera')) / 0.3);
    M.vis($('#dbP'), t, wt('D4', 'non') - 0.1, 1e9, POP);
    avD(t, wt('D4', 'rings') + 0.2, 1e9);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U4');
    M.vis($('#ua'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LuA.forEach((l, i) => labT(l, t, [T0('U2') + 0.3, wt('U2', 'cavity'), wt('U2', 'mesoderm'), wt('U2', 'true')][i]));
    uA.cav.setAttribute('fill', mix(COEL, '#A9CFE6', 0.5 + 0.5 * Math.sin(t * 3)));
    M.vis($('#ub'), t, T0('U3') - 0.15, out, { dx: 60, dy: 0, ...o });
    LuB.forEach((l, i) => labT(l, t, [T0('U3') + 0.3, wt('U3', 'cavity'), wt('U3', 'pouches'), wt('U3', 'pseudocoelom')][i]));
    uB.pou.forEach((p, k) => p.style.opacity = (0.6 + 0.4 * Math.sin(t * 3 + k)).toFixed(3));
    M.vis($('#th1'), t, tU4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tU4, tOpts: wt('U4', 'True') - 0.1, tCount: T1('U4') + 0.05, dur: 3, tAns: T0('U5') - 0.02, tWhy: wt('U5', 'hookworm') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#dzs' + i), t, w[4] - 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis($('#it' + i), t, w[5] - 0.1, 1e9, { dy: -16, sp: M.SOFT, fade: 0.1 }); });
    M.vis($('#ic2'), t, wt('W5', 'annelid') - 0.1, 1e9, { dy: 6 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'any') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'lined') - 0.3 });
    M.vis($('#tS'), t, wt('X3', 'roundworm') - 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis(tTg[1], t, wt('X3', 'coelom') - 0.1, 1e9, POP); M.vis(tTg[0], t, wt('X3', 'pseudocoelom') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statement') });
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
