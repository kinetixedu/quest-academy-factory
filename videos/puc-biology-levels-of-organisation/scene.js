// PUC Biology Ep 32: Levels of Organisation (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = AN.BR, GRN = C.ac, WAT = '#5AA0C8', NUC = '#7B4B94', ENDO = AN.ENDO, RBC = '#D1495B', PLUM = '#6D3B6E', FOOD = '#B8891C';
Object.assign(M.IC, AN.IC, {
  team: ['M5 8a2.5 2.5 0 1 0 .01 0Z', 'M12 6a2.5 2.5 0 1 0 .01 0Z', 'M19 8a2.5 2.5 0 1 0 .01 0Z', 'M2 18v-2a3 3 0 0 1 3-3h1', 'M8 18v-3a4 4 0 0 1 8 0v3', 'M22 18v-2a3 3 0 0 0-3-3h-1'],
});
const lab = (g, px, py, lx, ly, s, an = 'start') => { const ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const labT = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tT = T0('T1'), tC1 = T0('C1'), tV1 = T0('V1'), tU1 = T0('U1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['users', 'A crowd', 'EVERYONE ALONE', 'crowd'], ['team', 'A team', 'SHARING THE WORK', 'team'], ['gear', 'A machine', 'ONE JOB PER PART', 'machine']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const TAGS = [['OWN THING', wt('H2', 'own')], ['SHARE THE WORK', wt('H2', 'share')], ['ONE FIXED JOB', wt('H2', 'fixed')]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${TAGS[i][0]}</div></div>`).join('');
// four arrangements preview
const hp = $('#hpS'), HPX = [110, 290, 470, 650], HPG = HPX.map(() => mk(hp, 'g', {}));
const R0 = M.rng(3), hLoose = [];
for (let k = 0; k < 6; k++) hLoose.push({ x: HPX[0] + (R0() - 0.5) * 90, y: 150 + (R0() - 0.5) * 120, e: mk(HPG[0], 'circle', { r: 15, fill: '#F6E5B5', stroke: BR, 'stroke-width': 2.5 }) });
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) mk(HPG[1], 'rect', { x: HPX[1] - 52 + c * 26, y: 96 + r * 28, width: 25, height: 27, rx: 5, fill: '#CFE6C6', stroke: BR, 'stroke-width': 2 });
mk(HPG[2], 'ellipse', { cx: HPX[2], cy: 150, rx: 62, ry: 50, fill: '#F1D2CA', stroke: BR, 'stroke-width': 3 }); mk(HPG[2], 'ellipse', { cx: HPX[2], cy: 150, rx: 36, ry: 26, fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; mk(HPG[2], 'line', { x1: HPX[2] + 36 * Math.cos(a), y1: 150 + 26 * Math.sin(a), x2: HPX[2] + 62 * Math.cos(a), y2: 150 + 50 * Math.sin(a), stroke: '#B07A6E', 'stroke-width': 1.5 }); }
[[-40, 110, '#F2B57E'], [36, 130, '#D7C3E6'], [-20, 196, '#D6E9F5']].forEach(([dx, y, f]) => mk(HPG[3], 'ellipse', { cx: HPX[3] + dx, cy: y, rx: 30, ry: 24, fill: f, stroke: BR, 'stroke-width': 3 }));
mk(HPG[3], 'path', { d: `M${HPX[3] - 12},116 L${HPX[3] + 8},126 M${HPX[3] + 26},152 L${HPX[3] - 4},180`, stroke: BR, 'stroke-width': 4 });
['LOOSE', 'TISSUE', 'ORGAN', 'SYSTEM'].forEach((s, i) => txt(HPG[i], HPX[i], 270, s, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 }));
const HPQ = HPX.map(x => { const e = txt(hp, x, 160, '?', { 'text-anchor': 'middle', 'font-size': 64, fill: C.dim, 'font-weight': 600 }); return e; });

/* ---------- B: the four levels ---------- */
const LV = [['Cellular', 'users', 'LIKE A CROWD', 'Cells work loosely, side by side.', wt('B2', 'cellular'), wt('B2', 'crowd')],
  ['Tissue', 'team', 'LIKE A TEAM', 'Cells with the same job form a tissue.', wt('B3', 'tissue'), wt('B3', 'team')],
  ['Organ', 'check', 'ONE JOB EACH', 'Tissues group into an organ for one job.', wt('B4', 'organ'), wt('B4', 'particular')],
  ['Organ system', 'gear', 'LIKE A MACHINE', 'Organs link up into systems.', T0('B5') + 0.3, wt('B5', 'machine')]];
$('#lv4').innerHTML = LV.map(([n, ic, a, d], i) => `<div class="lv4c" id="lc${i}" style="left:${36 + i * 382}px"><svg id="lcs${i}" width="358" height="250" style="position:absolute;left:0;top:0"></svg><div class="nm">${n}</div>
  <div class="an"><span id="la${i}">${M.icon(ic, 20, C.ac, 2.2)}${a}</span></div><div class="ds">${d}</div></div>`).join('');
const bLoose = [];
{ const g = $('#lcs0'), R = M.rng(8); for (let k = 0; k < 8; k++) bLoose.push({ x: 179 + (R() - 0.5) * 200, y: 130 + (R() - 0.5) * 150, e: mk(g, 'circle', { r: 22, fill: '#F6E5B5', stroke: BR, 'stroke-width': 3 }) });
  bLoose.forEach(c => c.n = mk(g, 'circle', { r: 6, fill: NUC }));
  const t2 = $('#lcs1'); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { mk(t2, 'rect', { x: 89 + c * 30, y: 70 + r * 34, width: 29, height: 33, rx: 6, fill: '#CFE6C6', stroke: BR, 'stroke-width': 2.5 }); mk(t2, 'circle', { cx: 103.5 + c * 30, cy: 86.5 + r * 34, r: 4.5, fill: NUC }); }
  const t3 = $('#lcs2'); mk(t3, 'ellipse', { cx: 179, cy: 130, rx: 112, ry: 86, fill: '#F1D2CA', stroke: BR, 'stroke-width': 4 }); mk(t3, 'ellipse', { cx: 179, cy: 130, rx: 82, ry: 58, fill: '#DCE6F5', stroke: BR, 'stroke-width': 3 }); mk(t3, 'ellipse', { cx: 179, cy: 130, rx: 54, ry: 34, fill: '#fff', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12; mk(t3, 'line', { x1: 179 + 82 * Math.cos(a), y1: 130 + 58 * Math.sin(a), x2: 179 + 112 * Math.cos(a), y2: 130 + 86 * Math.sin(a), stroke: '#B07A6E', 'stroke-width': 1.8 }); mk(t3, 'line', { x1: 179 + 54 * Math.cos(a), y1: 130 + 34 * Math.sin(a), x2: 179 + 82 * Math.cos(a), y2: 130 + 58 * Math.sin(a), stroke: '#8FA9CF', 'stroke-width': 1.5 }); }
  const t4 = $('#lcs3'); mk(t4, 'path', { d: 'M60,60 C80,60 90,80 110,90 M160,120 C190,150 200,160 230,170 M262,188 C280,200 290,210 300,226', stroke: BR, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
  [[60, 60, 22, '#D6E9F5'], [136, 104, 34, '#F2B57E'], [250, 180, 30, '#D7C3E6']].forEach(([x, y, r, f]) => mk(t4, 'ellipse', { cx: x, cy: y, rx: r * 1.25, ry: r, fill: f, stroke: BR, 'stroke-width': 3.5 }));
  bLoose.t4 = [0, 1, 2].map(() => mk(t4, 'circle', { r: 7, fill: FOOD })); }

/* ---------- Z: zoom ladder into a sponge ---------- */
const ZN = ['SPONGE', 'BODY WALL', 'COLLAR CELL'], ZS = ['x1', 'x40', 'x400'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4')];
const LVI = [['RUNG 1 OF 3', 'Sponge', 'A hollow body. Water in through the ostia, out through the osculum.', 'Phylum Porifera.'],
  ['RUNG 2 OF 3', 'Body wall', 'Cells sit loosely, side by side.', 'No true tissues. No organs.'],
  ['RUNG 3 OF 3', 'Collar cell', 'Also called a choanocyte. Its flagellum beats and keeps water moving.', 'Different cells, different jobs: division of labour.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A crowd that shares jobs!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
// level 0: the sponge
const sp = AN.draw('sponge', ZG[0], 430, 280, 1.8), SWf = sp.P.W;
const flowIn = [-40, 12, 62].map(y => { const yy = 280 + y * 1.8, xo = 430 - 1.8 * SWf(y); return mk(ZG[0], 'path', { d: `M${xo - 90},${yy} L${xo - 10},${yy}`, stroke: WAT, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 10' }); });
const flowOut = mk(ZG[0], 'path', { d: 'M430,250 L430,52', stroke: WAT, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '14 10' }); const flowHd = mk(ZG[0], 'path', { d: 'M416,64 L430,40 L444,64 Z', fill: WAT });
const FW = [430 + 1.8 * (SWf(12) - 14), 280 + 12 * 1.8];
const L0 = [lab(ZG[0], 430 + 1.8 * SWf(-14), 280 - 14 * 1.8, 720, 250, 'Ostia (pores)'), lab(ZG[0], 452, 280 - 101 * 1.8, 720, 100, 'Osculum')];
const F0 = mk(ZG[0], 'circle', { cx: FW[0], cy: FW[1], r: 46, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
// level 1: the body wall (outside at top, spongocoel at bottom)
const fl = [], am = [];
{ const g = ZG[1], R = M.rng(21);
  mk(g, 'rect', { x: 40, y: 110, width: 780, height: 300, fill: '#FBF3DD' });
  for (let i = 0; i < 20; i++) { if (i === 11) continue; mk(g, 'path', { d: `M${40 + i * 39},${118} q19.5,-12 39,0`, fill: '#EBC77A', stroke: BR, 'stroke-width': 2.5 }); }
  for (let k = 0; k < 9; k++) { const x = 70 + k * 84 + (R() - 0.5) * 30, y = 190 + (R() - 0.5) * 70; if (Math.abs(x - 470) < 50) continue; am.push({ x, y, e: mk(g, 'path', { fill: '#F2DCA8', stroke: BR, 'stroke-width': 2.5 }) }); }
  [[120, 270, 30], [300, 160, -20], [640, 250, 15], [740, 170, 40]].forEach(([x, y, a]) => { const sg = mk(g, 'g', { transform: `rotate(${a} ${x} ${y})` }); mk(sg, 'path', { d: `M${x - 34},${y} L${x + 34},${y} M${x},${y} L${x - 14},${y - 20} M${x},${y} L${x + 14},${y - 20}`, stroke: '#9A7428', 'stroke-width': 3.5, 'stroke-linecap': 'round', fill: 'none' }); });
  for (let i = 0; i < 13; i++) { const x = 70 + i * 58; if (Math.abs(x - 470) < 40) continue;
    mk(g, 'path', { d: `M${x - 18},${300} L${x - 22},${276} M${x + 18},${300} L${x + 22},${276}`, stroke: '#7A8F3A', 'stroke-width': 2.5, fill: 'none' });
    mk(g, 'ellipse', { cx: x, cy: 322, rx: 24, ry: 26, fill: '#E2EBC2', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x, cy: 330, r: 7, fill: NUC });
    fl.push({ x, e: mk(g, 'path', { stroke: BR, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }) }); }
  mk(g, 'rect', { x: 40, y: 350, width: 780, height: 120, fill: '#EAF3FA' }); mk(g, 'line', { x1: 40, y1: 350, x2: 820, y2: 350, stroke: WAT, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  txt(g, 430, 470, 'SPONGOCOEL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, fill: WAT, 'font-weight': 600 }); txt(g, 430, 92, 'OUTSIDE · WATER', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, fill: WAT, 'font-weight': 600 });
  fl.forEach(f => g.appendChild(f.e)); }
const pore = mk(ZG[1], 'path', { d: 'M470,96 L470,330', stroke: WAT, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 10' });
const FC1 = [418, 322];
const L1 = [lab(ZG[1], 470, 150, 640, 150, 'Pore (ostium)'), lab(ZG[1], am[1] ? am[1].x : 210, am[1] ? am[1].y : 190, 230, 260, 'Loose cells'), lab(ZG[1], 763, 165, 880, 220, 'Spicule'), lab(ZG[1], 650, 322, 880, 330, 'Collar cells')];
const F1 = mk(ZG[1], 'circle', { cx: FC1[0], cy: FC1[1], r: 40, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
// level 2: one collar cell
const cc = {}; { const g = ZG[2], X = 420;
  for (let k = 0; k < 13; k++) { const u = k / 12; mk(g, 'line', { x1: X - 56 + u * 112, y1: 268, x2: X - 108 + u * 216, y2: 150, stroke: '#7A8F3A', 'stroke-width': 3, 'stroke-linecap': 'round' }); }
  mk(g, 'path', { d: `M${X - 120},330 C${X - 120},250 ${X - 60},262 ${X},262 C${X + 60},262 ${X + 120},250 ${X + 120},330 C${X + 120},420 ${X + 60},450 ${X},450 C${X - 60},450 ${X - 120},420 ${X - 120},330 Z`, fill: '#E2EBC2', stroke: BR, 'stroke-width': 4 });
  mk(g, 'circle', { cx: X, cy: 372, r: 38, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(g, 'circle', { cx: X + 6, cy: 368, r: 12, fill: NUC });
  cc.fl = mk(g, 'path', { stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  cc.food = [0, 1, 2, 3].map(() => mk(g, 'circle', { r: 7, fill: FOOD })); }
const L2 = [lab(ZG[2], 420, 120, 640, 80, 'Flagellum'), lab(ZG[2], 486, 190, 640, 200, 'Collar'), lab(ZG[2], 446, 380, 640, 380, 'Nucleus')];
const tLab = [[wt('Z2', 'ostia'), wt('Z2', 'osculum')], [wt('Z3', 'wall') + 0.3, wt('Z3', 'loosely'), wt('Z3', 'side'), wt('Z3', 'tissues')], [wt('Z4', 'flagellum'), wt('Z4', 'collar'), wt('Z5', 'Different')]];
const LBZ = [L0, L1, L2], FOC = [[...FW], FC1, null], FR = [F0, F1, null];

/* ---------- L: climb the levels ---------- */
const STEPS = [['Cellular level', 'loose groups of cells, some division of labour', 'EXAMPLE · SPONGES (PORIFERA)'], ['Tissue level', 'cells doing the same job form tissues', 'EXAMPLE · COELENTERATES, LIKE HYDRA'],
  ['Organ level', 'tissues group into organs, one job each', 'EXAMPLE · FLATWORMS (PLATYHELMINTHES)'], ['Organ-system level', 'organs work as systems, one function each', 'ANNELIDS · ARTHROPODS · MOLLUSCS · ECHINODERMS · CHORDATES']];
$('#st5s').innerHTML = STEPS.map(([s, w, e], i) => `<div class="st5 b" id="s5${i}" style="top:${80 + i * 114}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div><div class="eg">${e}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5'].map(id => T0(id) + 0.45);
const EX = [['Sponge', 'CELLULAR'], ['Hydra', 'TISSUE'], ['Flatworm', 'ORGAN'], ['Many phyla', 'ORGAN SYSTEM']];
$('#exs').innerHTML = EX.map(([n, l], i) => `<div class="exr" id="ex${i}" style="top:${80 + i * 114}px"><div class="en">${n}</div><div class="eg2">${l}</div></div>`).join('');
const lr = $('#lrS'), EXG = [0, 1, 2, 3].map(() => mk(lr, 'g', {}));
AN.draw('sponge', EXG[0], 600, 132, 0.36); const hyL = AN.draw('hydra', EXG[1], 600, 262, 0.34); AN.draw('flat', EXG[2], 600, 358, 0.36, { rot: 90 });
AN.draw('worm', EXG[3], 372, 470, 1, { n: 9, L: 130 }); AN.draw('roach', EXG[3], 480, 470, 0.28); AN.draw('star', EXG[3], 560, 470, 0.36); AN.draw('snail', EXG[3], 640, 472, 0.28); AN.draw('fish', EXG[3], 718, 470, 0.25);

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">cells › tissues › organs › <b>organ systems</b></span>';

/* ---------- C: digestive systems ---------- */
const ca = $('#caS'), cA = {};
{ mk(ca, 'path', { d: 'M70,290 C90,170 240,130 400,140 C560,150 700,210 714,290 C700,370 560,430 400,440 C240,450 90,410 70,290 Z', fill: AN.COL.flat, stroke: BR, 'stroke-width': 4 });
  mk(ca, 'path', { d: 'M380,410 C300,400 200,380 190,300 C180,220 280,200 400,200 C520,200 610,220 600,300 C590,380 500,400 420,410 L420,442 L380,442 Z', fill: '#F6E5B5', stroke: BR, 'stroke-width': 3.5 });
  cA.d = [0, 1, 2, 3, 4].map(i => mk(ca, 'circle', { r: 9, fill: i < 3 ? FOOD : '#7A5A3A' })); }
const LCa = [lab(ca, 400, 446, 560, 470, 'One opening'), lab(ca, 300, 260, 150, 100, 'Gut: a bag', 'start')];
const cb = $('#cbS'), cB = {};
{ mk(cb, 'path', { d: 'M60,300 C60,250 100,230 150,230 L650,230 C700,230 730,260 730,300 C730,340 700,370 650,370 L150,370 C100,370 60,350 60,300 Z', fill: AN.COL.round, stroke: BR, 'stroke-width': 4 });
  cB.seg = [[70, 170, '#F1D2CA'], [170, 290, '#F6E5B5'], [290, 640, '#F6E5B5'], [640, 722, '#F1D2CA']];
  cB.r = cB.seg.map(([a, b, f], i) => mk(cb, 'rect', { x: a, y: i === 1 ? 278 : 284, width: b - a, height: i === 1 ? 44 : 32, rx: i === 1 ? 14 : 10, fill: f, stroke: BR, 'stroke-width': 2.5 }));
  cB.d = [0, 1, 2, 3, 4, 5].map(() => mk(cb, 'circle', { r: 8, fill: FOOD })); }
const LCb = [lab(cb, 70, 300, 100, 440, 'Mouth'), lab(cb, 722, 300, 690, 440, 'Anus', 'end'), lab(cb, 230, 278, 300, 190, 'Muscular pharynx')];
const CST = ['MOUTH', 'PHARYNX', 'INTESTINE', 'ANUS'];
$('#cst').innerHTML = CST.map((s, i) => `<span id="cs${i}">${s}</span>${i < 3 ? '<em>›</em>' : ''}`).join('');
const avC = PUC.avatar($('#sC'), { x: 976 + 470, y: 270 + 30, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'In one end, out the other!' });

/* ---------- V: circulatory systems ---------- */
const va = $('#vaS'), vA = {};
{ mk(va, 'path', { d: 'M70,300 C70,170 220,120 400,120 C580,120 714,170 714,300 C714,420 580,460 400,460 C220,460 70,420 70,300 Z', fill: '#F3E4D0', stroke: BR, 'stroke-width': 4 });
  [[230, 300, 70, 46, '#F6E5B5'], [430, 330, 80, 50, '#F1D2CA'], [590, 290, 56, 40, '#D7C3E6']].forEach(([x, y, rx, ry, f]) => mk(va, 'ellipse', { cx: x, cy: y, rx, ry, fill: f, stroke: BR, 'stroke-width': 3 }));
  vA.h = mk(va, 'path', { d: 'M160,168 L620,168', stroke: RBC, 'stroke-width': 18, 'stroke-linecap': 'round' });
  for (let k = 0; k < 6; k++) mk(va, 'line', { x1: 220 + k * 70, y1: 158, x2: 220 + k * 70, y2: 178, stroke: '#8E2A38', 'stroke-width': 3 });
  const R = M.rng(4); vA.d = []; for (let k = 0; k < 16; k++) vA.d.push({ ph: R(), lane: R(), e: mk(va, 'circle', { r: 7, fill: RBC }) }); }
const LVa = [lab(va, 520, 168, 600, 80, 'Heart'), lab(va, 330, 400, 230, 470, 'Blood bathes the tissues', 'start')];
const vb = $('#vbS'), vB = {};
{ vB.path = 'M200,300 C200,170 360,140 470,170 C560,196 600,240 620,300 C600,360 560,404 470,430 C360,460 200,430 200,300';
  mk(vb, 'path', { d: 'M200,300 C200,170 360,140 470,170 C560,196 600,240 620,300', stroke: RBC, 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' });
  mk(vb, 'path', { d: 'M620,300 C600,360 560,404 470,430 C360,460 200,430 200,300', stroke: PLUM, 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 5; k++) mk(vb, 'path', { d: `M600,${250 + k * 4} C640,${240 + k * 16} 660,${300} 640,${300 + (k - 2) * 18} C630,${330 + k * 6} 610,${350} 600,${350 - k * 4}`, stroke: '#B05B78', 'stroke-width': 2.5, fill: 'none' });
  mk(vb, 'path', { d: 'M150,300 C150,250 180,240 200,252 C220,240 252,250 252,300 C252,340 220,370 200,380 C180,370 150,340 150,300 Z', fill: RBC, stroke: '#8E2A38', 'stroke-width': 3.5 });
  vB.pe = mk(vb, 'path', { d: vB.path, fill: 'none', stroke: 'none' }); vB.L = 0; vB.d = []; for (let k = 0; k < 18; k++) vB.d.push(mk(vb, 'circle', { r: 6.5, fill: '#fff', stroke: '#8E2A38', 'stroke-width': 2 })); }
const LVb = [lab(vb, 176, 296, 100, 120, 'Heart', 'start'), lab(vb, 470, 170, 520, 96, 'Artery'), lab(vb, 650, 300, 690, 210, 'Capillaries', 'end'), lab(vb, 470, 430, 520, 470, 'Vein')];
const th1 = PUC.think($('#th1'), { q: 'A honey bee is an arthropod. Is its circulation open or closed?', opts: ['Open', 'Closed'], right: 0, why: 'Open. In arthropods, blood leaves the heart and bathes the tissues.' });

/* ---------- W: worked example ---------- */
const WC = [['CELLULAR', 'Spongilla', 'FRESHWATER SPONGE', ['Loose cells'], wt('W2', 'Spongilla'), [wt('W2', 'Loose')]],
  ['TISSUE', 'Hydra', 'A COELENTERATE', ['Cells form tissues'], wt('W3', 'Hydra'), [wt('W3', 'tissues')]],
  ['ORGAN', 'Fasciola', 'LIVER FLUKE', ['Organs', 'Gut: one opening'], wt('W4', 'Fasciola'), [wt('W4', 'organs'), wt('W4', 'one')]],
  ['ORGAN SYSTEM', 'Pheretima', 'EARTHWORM', ['Gut: two openings', 'Closed circulation'], wt('W5', 'Pheretima'), [wt('W5', 'two'), wt('W5', 'vessels')]]];
$('#cols').innerHTML = WC.map(([h, n, c, rs], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 382}px"><div class="ch2">${h}</div><div class="dz"></div>
  <div class="it" id="it${i}"><svg id="its${i}" width="358" height="180" style="position:absolute;left:0;top:0"></svg><div class="inm">${n}</div><div class="inc">${c}</div></div>
  <div class="rs">${rs.map((r, k) => `<span id="rs${i}${k}">${r}</span>`).join('')}</div></div>`).join('');
AN.draw('sponge', $('#its0'), 179, 96, 0.62, { cut: false }); const hyW = AN.draw('hydra', $('#its1'), 179, 104, 0.5); AN.draw('flat', $('#its2'), 179, 92, 0.6, { rot: 90 }); const wmW = AN.draw('worm', $('#its3'), 179, 92, 1, { n: 16, L: 300, clit: 1 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every organ-system animal has closed circulation', right: 'Arthropods: organ-system level, yet open circulation' });
const tS = $('#tS'), tro = AN.draw('roach', tS, 110, 150, 0.68), tDots = [0, 1, 2, 3, 4, 5].map(() => mk(tS, 'circle', { r: 5, fill: RBC }));
const TC = [['ORGAN SYSTEM', '#E3F1E7', '#1F6B3F'], ['OPEN CIRCULATION', '#FBE9E9', '#8A1C1C']].map(([s, b, f], i) => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x: 210, y: 84 + i * 62, width: 226, height: 44, rx: 10, fill: b }); txt(g, 323, 112 + i * 62, s, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.2, 'font-weight': 600, fill: f }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Statement questions: a group with its level, its gut or its circulation' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Sponges show the cellular level of organisation.</div><div class="sl"><b>II</b>Coelenterates show the organ level of organisation.</div><div class="sl"><b>III</b>The digestive system of Platyhelminthes has a single opening.</div><div class="sl"><b>IV</b>In open circulation, blood flows only in arteries, veins and capillaries.</div>',
  opts: ['I and III only', 'I, II and III only', 'II and IV only', 'I, III and IV only'], right: 0, optW: 474, optY: 404 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (I, III)'], ['<b style="color:var(--red)">II</b> is false'], ['Coelenterates: tissue level'], ['<b style="color:var(--red)">IV</b> is false'], ['Only in vessels = closed']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'Coelenterates'), wt('A3', 'Four'), wt('A3', 'closed')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · levels of organisation', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Cellular</b>: loose cells, some division of labour (sponges)', '<b>Tissue</b>: cells with one job form tissues (coelenterates)', '<b>Organ</b>: tissues form organs (Platyhelminthes)',
    '<b>Organ system</b>: annelids, arthropods, molluscs, echinoderms, chordates', '<b>Gut</b>: 1 opening = incomplete, 2 = complete &nbsp;·&nbsp; <b>Blood</b>: open or closed'] });
const YQ = ['What is division of labour in a sponge?', 'What makes a digestive system complete?', 'How is open circulation different from closed circulation?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 33', topic: 'One straight cut: which animals split evenly? Body Symmetry and Germ Layers', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('C3') + 0.3, 1.06, 1368, 560], [T1('C4') + 0.2, 1, 960, 540]]);
const blob = (x, y, R, tt, k) => { const n = 18, pts = []; for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n, r = R * (1 + 0.18 * Math.sin(3 * a + tt * 1.2 + k) + 0.08 * Math.sin(5 * a - tt + k)); pts.push([x + r * Math.cos(a), y + r * Math.sin(a) * 0.7]); }
  return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z'; };
let geo = null;
function measure() { geo = 1; vB.L = vB.pe.getTotalLength(); }

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, TAGS[i][1] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H3', 'cells') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.1;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#spc'), t, tH4 + 0.15, 1e9, { dy: 0, fade: 0.25 })) {
      const tm = wt('H4', 'many'), tor = wt('H4', 'organised');
      HPG.forEach((g, i) => M.vis(g, t, tm + i * 0.15, 1e9, { dy: 10 }));
      HPQ.forEach((q, i) => q.style.opacity = M.clamp((t - tH4 - 0.3 - i * 0.1) / 0.2) * (1 - M.clamp((t - tm - i * 0.15) / 0.2)));
      hLoose.forEach((c, k) => { attr(c.e, 'cx', (c.x + 6 * Math.sin(t * 1.4 + k)).toFixed(1)); attr(c.e, 'cy', (c.y + 6 * Math.cos(t * 1.2 + k)).toFixed(1)); });
      M.vis($('#hpP'), t, tor - 0.2, 1e9, POP);
      M.vis($('#hc0'), t, wt('H5', 'four') - 0.1, 1e9, POP); M.vis($('#hc1'), t, wt('H5', 'two') - 0.1, 1e9, POP); M.vis($('#hc2'), t, wt('H5', 'two') + 0.1, 1e9, POP);
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#bw'), t, tB1 + 0.05, OUT('Z1'), { dy: 36, ...o });
    LV.forEach(([, , , , ti, ta], i) => { M.vis($('#lc' + i), t, ti - 0.15, 1e9, { dy: 20 }); M.vis($('#la' + i), t, ta - 0.1, 1e9, POP); $('#lc' + i).style.background = mix(C.soft, C.ac2, M.io((t - ti) / 0.3) * (1 - M.io((t - (LV[i + 1] ? LV[i + 1][4] : 1e9)) / 0.3))); });
    bLoose.forEach((c, k) => { const x = c.x + 9 * Math.sin(t * 1.3 + k), y = c.y + 9 * Math.cos(t * 1.1 + k * 2); attr(c.e, 'cx', x.toFixed(1)); attr(c.e, 'cy', y.toFixed(1)); attr(c.n, 'cx', x.toFixed(1)); attr(c.n, 'cy', y.toFixed(1)); });
    bLoose.t4.forEach((d, k) => { const u = ((t * 0.35 + k / 3) % 1); const P = [[60, 60], [136, 104], [250, 180], [300, 226]]; const s = u * 3, i = Math.min(2, Math.floor(s)), f = s - i; attr(d, 'cx', M.lerp(P[i][0], P[i + 1][0], f).toFixed(1)); attr(d, 'cy', M.lerp(P[i][1], P[i + 1][1], f).toFixed(1)); });
  }

  /* Z: zoom ladder */
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
    const wi = M.clamp((t - wt('Z2', 'Water')) / 0.4), wo = M.clamp((t - wt('Z2', 'leaves')) / 0.4);
    flowIn.forEach(f => { f.style.opacity = wi; f.style.strokeDashoffset = (-(t * 40) % 22).toFixed(1); }); flowOut.style.opacity = wo; flowHd.style.opacity = wo; flowOut.style.strokeDashoffset = ((t * 40) % 24).toFixed(1);
    pore.style.strokeDashoffset = (-(t * 40) % 22).toFixed(1);
    am.forEach((a, k) => attr(a.e, 'd', blob(a.x + 6 * Math.sin(t * 0.8 + k), a.y, 22, t, k)));
    fl.forEach((f, k) => { let d = `M${f.x},300`; for (let s = 1; s <= 6; s++) d += ` L${(f.x + 5 * Math.sin(t * 8 + k + s * 1.1) * s / 6).toFixed(1)},${300 - s * 12}`; attr(f.e, 'd', d); });
    { let d = 'M420,262'; for (let s = 1; s <= 10; s++) d += ` L${(420 + 16 * Math.sin(t * 7 - s * 0.9) * s / 10).toFixed(1)},${262 - s * 22}`; attr(cc.fl, 'd', d);
      cc.food.forEach((c, k) => { const u = (t * 0.3 + k / 4) % 1; attr(c, 'cx', (330 + k * 60 - 20 * u).toFixed(1)); attr(c, 'cy', (60 + 200 * u).toFixed(1)); c.style.opacity = M.clamp(u * 6) * M.clamp((1 - u) * 6); }); }
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'division') + 0.3, 1e9);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lf'), t, tL1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#lr'), t, tL1 + 0.2, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.7); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); M.vis(el.querySelector('.eg'), t, wt(['L2', 'L3', 'L4', 'L5'][i], 'Example'), 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tSt.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 114]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, T0('L6'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    EX.forEach((_, i) => { const tt = wt(['L2', 'L3', 'L4', 'L5'][i], 'Example'); M.vis($('#ex' + i), t, tt - 0.15, 1e9, { dx: 16, dy: 0 }); M.vis(EXG[i], t, tt, 1e9, { ...POP, sc: 0.5 }); $('#ex' + i).style.background = mix(C.soft, C.ac2, M.io((t - T0('L6')) / 0.4) * (i === 3 ? 1 : 0.0)); });
    hyL.wig(t);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Cells') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'organ', 2) - 0.3, 0.9);
  }

  /* C: digestive */
  const cOn = t >= tC1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#ca'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o });
    LCa.forEach((l, i) => labT(l, t, i ? wt('C2', 'gut') : wt('C2', 'opening')));
    { const u0 = t - T0('C2'); cA.d.forEach((d, k) => { const food = k < 3, v = ((u0 * 0.28 + k / 5) % 1);
      const a = food ? M.clamp(v * 2) : M.clamp(v * 2 - 1); let x, y;
      if (food) { x = 400 + (k - 1) * 40 * a; y = 470 - 220 * a; } else { x = 400 + (k - 3.5) * 30 * (1 - a); y = 260 + 210 * a; }
      attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1)); d.style.opacity = (u0 > 0 ? 1 : 0) * M.clamp(food ? (1 - v) * 6 : (v - 0.5) * 6) * M.clamp((1 - v) * 10); }); }
    M.vis($('#caP'), t, wt('C2', 'incomplete') - 0.1, 1e9, POP);
    M.vis($('#cb'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o });
    LCb.forEach((l, i) => labT(l, t, [wt('C3', 'mouth'), wt('C3', 'anus'), wt('C3', 'tube') + 0.2][i]));
    const u3 = t - T0('C3'); let stage = -1;
    cB.d.forEach((d, k) => { const v = (u3 * 0.16 + k / 6) % 1, x = 70 + 650 * v; attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', (300 + 4 * Math.sin(v * 30)).toFixed(1)); d.style.opacity = (u3 > 0.5 ? 1 : 0) * M.clamp(v * 12) * M.clamp((1 - v) * 12); if (k === 0) stage = x < 170 ? 0 : x < 290 ? 1 : x < 640 ? 2 : 3; });
    M.vis($('#cst'), t, T0('C3') + 0.3, 1e9, { dy: 10 });
    CST.forEach((_, i) => { lite($('#cs' + i), false, u3 > 0.5 && i === stage); cB.r[i].setAttribute('stroke', u3 > 0.5 && i === stage ? GRN : BR); cB.r[i].setAttribute('stroke-width', u3 > 0.5 && i === stage ? 4 : 2.5); });
    M.vis($('#cbP'), t, wt('C4', 'one') - 0.1, 1e9, POP);
    avC(t, wt('C4', 'factory') + 0.2, out);
  }

  /* V: circulatory + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('U1');
    M.vis($('#va'), t, tV1 + 0.2, out, { dx: -60, dy: 0, ...o });
    LVa.forEach((l, i) => labT(l, t, i ? wt('V2', 'bathed') : wt('V2', 'heart')));
    const u2 = t - wt('V2', 'pumps');
    vA.d.forEach((d, k) => { const v = (u2 * 0.12 + d.ph) % 1, lane = d.lane;
      let x, y; if (v < 0.25) { x = M.lerp(620, 160, v / 0.25); y = 168; } else { const w = (v - 0.25) / 0.75, a = Math.PI * (0.15 + 0.7 * w); x = 390 + 290 * Math.cos(a + Math.PI) * -1 * (lane > 0.5 ? 1 : 0.85); y = 200 + (180 + 50 * lane) * Math.sin(Math.PI * w) * 0.95; x = M.lerp(160, 640, w) + 30 * Math.sin(w * 9 + lane * 6); }
      attr(d.e, 'cx', x.toFixed(1)); attr(d.e, 'cy', y.toFixed(1)); d.e.style.opacity = u2 > 0 ? 1 : 0; });
    vA.h.setAttribute('stroke-width', (18 + 3 * Math.max(0, Math.sin(t * 6))).toFixed(1));
    M.vis($('#vaP'), t, wt('V2', 'arthropods') - 0.1, 1e9, POP); M.vis($('#vaA'), t, wt('V4', 'poured') - 0.1, 1e9, POP);
    M.vis($('#vb'), t, T0('V3') - 0.15, out, { dx: 60, dy: 0, ...o });
    LVb.forEach((l, i) => labT(l, t, [T0('V3') + 0.5, wt('V3', 'arteries'), wt('V3', 'capillaries'), wt('V3', 'veins')][i]));
    const u3 = t - T0('V3');
    vB.d.forEach((d, k) => { const v = (u3 * 0.09 + k / 18) % 1, p = vB.pe.getPointAtLength(v * vB.L); attr(d, 'cx', p.x.toFixed(1)); attr(d, 'cy', p.y.toFixed(1)); d.style.opacity = u3 > 0.3 ? 1 : 0; });
    M.vis($('#vbP'), t, wt('V3', 'annelids') - 0.1, 1e9, POP); M.vis($('#vbA'), t, wt('V4', 'pipes') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tU1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tU1, tOpts: wt('U1', 'open') - 0.1, tCount: T1('U1') + 0.05, dur: 3, tAns: T0('U2') - 0.02, tWhy: wt('U2', 'Arthropods') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 });
      w[3].forEach((_, k) => M.vis($('#rs' + i + k), t, w[5][k] - 0.1, 1e9, POP)); });
    hyW.wig(t); wmW.segs.forEach((s, k) => attr(s, 'transform', `translate(0 ${(-3 * Math.max(0, Math.cos(t * 2 - k * 0.5)) ** 2).toFixed(2)})`));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'open') - 0.3 });
    M.vis(tro.g, t, wt('X3', 'arthropods') - 0.1, 1e9, { ...POP, sc: 0.6 });
    tDots.forEach((d, k) => { const a = t * 1.2 + k; attr(d, 'cx', (110 + 26 * Math.sin(a)).toFixed(1)); attr(d, 'cy', (190 + 30 * Math.cos(a * 0.8)).toFixed(1)); d.style.opacity = M.clamp((t - wt('X3', 'open')) / 0.3); });
    M.vis(TC[0], t, wt('X3', 'organ-system') - 0.1, 1e9, { dx: -12, dy: 0 }); M.vis(TC[1], t, wt('X3', 'open') - 0.1, 1e9, { dx: -12, dy: 0 });
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
