// PUC Chemistry Ep 03: Nature and classification of matter (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (same on the bench, in KaTeX, on the counter and the recap): O teal (element in play), H ink, N violet, Ar gold, C slate, electrons orange
const OC = C.ac, HC = C.ink, NVC = '#7A4FE0', ARC = '#B7791F', CC = '#5A6478', EC = '#C8461B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
// LaTeX helpers with colour-coding
const O_ = s => `\\textcolor{${OC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, N_ = s => `\\textcolor{${NVC}}{\\mathrm{${s}}}`;
const H2 = `${H_('H')}_2`, O2 = `${O_('O')}_2`, H2O = `${H_('H')}_2${O_('O')}`, N2 = `${N_('N')}_2`;
const EQ = `2${H2} + ${O2} \\rightarrow 2${H2O}`;

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  cup: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three samples ---------- */
const JOBS = [['droplet', 'Water', 'A GLASS OF IT', 'water'], ['wind', 'Air', 'WHAT YOU BREATHE', 'air'], ['cup', 'Sweet tea', 'SUGAR STIRRED IN', 'sugar']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="qm" id="qm${i}">PURE? <b>?</b></div></div>`).join('');
const KIT = [['Compound, like water?', 'compound'], ['Mixture, like sweet tea?', 'mixture']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('help', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H4', k[1]));

/* ---------- P: matter + three states ---------- */
$('#mdefI').innerHTML = M.icon('box', 28, '#fff', 2.2);
const QR = [['Solid', 'FIXED SHAPE · FIXED VOLUME', 'P3', 'solid'], ['Liquid', 'FIXED VOLUME · NO FIXED SHAPE', 'P4', 'liquid'], ['Gas', 'NO FIXED SHAPE OR VOLUME', 'P5', 'gas'], ['Heat or squeeze', 'STATES TURN INTO EACH OTHER', 'P6', 'Change']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i < 3 ? i + 1 : M.icon('flame', 22, C.ac, 2.4)}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ss = $('#stS'), BX = [36, 282, 528], BY = 84, BW = 220, BH = 236;
const stBox = BX.map(x => mk(ss, 'rect', { x, y: BY, width: BW, height: BH, rx: 16, fill: C.soft, stroke: C.line, 'stroke-width': 2.5 }));
const stLab = ['SOLID', 'LIQUID', 'GAS'].map((s, i) => txt(ss, BX[i] + BW / 2, BY + BH + 36, s, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }));
const stSub = ['SHAPE + VOLUME', 'VOLUME ONLY', 'NEITHER'].map((s, i) => txt(ss, BX[i] + BW / 2, BY + BH + 62, s, { 'text-anchor': 'middle', 'font-size': 15 }));
const stP = [[], [], []];
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) stP[0].push({ el: mk(ss, 'circle', { r: 15, fill: OC }), x: BX[0] + 44 + c * 44, y: BY + 52 + r * 44 });
const LQ = [[30, 150, 22], [70, 160, -18], [110, 152, 26], [150, 158, -24], [190, 150, 20], [45, 190, -26], [85, 196, 24], [125, 192, -20], [165, 198, 28], [60, 220, 18], [130, 222, -22], [190, 214, 24]];
LQ.forEach(([x, y, v]) => stP[1].push({ el: mk(ss, 'circle', { r: 15, fill: OC }), x: BX[1] + x, y: BY + y, v }));
const GS = [[40, 50, 150, 120], [160, 80, -130, 160], [90, 170, 170, -110], [180, 190, -160, -140], [60, 120, 120, 170], [130, 30, -150, 130]];
GS.forEach(([x, y, vx, vy]) => stP[2].push({ el: mk(ss, 'circle', { r: 15, fill: OC }), x: BX[2] + x, y: BY + y, vx, vy }));
const bounce = (v, a, b) => { const L = b - a, u = (((v - a) % (2 * L)) + 2 * L) % (2 * L); return a + (u < L ? u : 2 * L - u); };
const arw = (x1, x2, lab) => { const g = mk(ss, 'g', {}); const p = mk(g, 'path', { d: `M${x1} ${BY + BH + 84} Q${(x1 + x2) / 2} ${BY + BH + 124} ${x2} ${BY + BH + 84}`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(g, 'path', { d: `M${x2} ${BY + BH + 84} l-14 4 l8 10 Z`, fill: C.ac }); const tx = txt(g, (x1 + x2) / 2, BY + BH + 150, lab, { 'text-anchor': 'middle', 'font-size': 17, fill: C.ac, 'font-weight': 600 }); return { p, h, tx }; };
const aMelt = arw(BX[0] + 150, BX[1] + 70, 'MELT'), aBoil = arw(BX[1] + 150, BX[2] + 70, 'BOIL');

/* ---------- U: sorting tree (builder used twice: wide here, compact in D) ---------- */
const NODES = [['root', 'Matter', 'HAS MASS · TAKES SPACE'], ['mix', 'Mixture', 'TWO OR MORE · ANY RATIO'], ['pure', 'Pure substance', 'ONE KIND OF PARTICLE'],
  ['hom', 'Homogeneous', 'SAME ALL THROUGH'], ['het', 'Heterogeneous', 'PARTS DIFFER'], ['el', 'Element', 'ONE KIND OF ATOM'], ['cp', 'Compound', 'FIXED RATIO']];
const PAR = { mix: 'root', pure: 'root', hom: 'mix', het: 'mix', el: 'pure', cp: 'pure' };
const EXW = { hom: 'Sugar in water · air', het: 'Salt with sugar', el: 'Copper · oxygen', cp: 'Water · CO₂' }, EXS = { hom: 'Sugar water', het: 'Salt + sugar', el: 'Cu · O₂', cp: 'H₂O · CO₂' };
// mini particle pictures (viewBox 200 x 100)
const mini = (svg, k) => {
  const g = mk(svg, 'g', {}), dot = (x, y, r, f) => mk(g, 'circle', { cx: x, cy: y, r, fill: f });
  if (k === 'hom') { for (let i = 0; i < 12; i++) dot(22 + (i % 6) * 31, 30 + Math.floor(i / 6) * 40, 10, i % 2 === Math.floor(i / 6) % 2 ? OC : HC); }
  if (k === 'het') { [[30, 30], [52, 50], [28, 72], [62, 24], [70, 74], [44, 92]].forEach(([x, y]) => dot(x, y - 6, 10, OC)); [[120, 22], [150, 44], [124, 64], [160, 78], [176, 26]].forEach(([x, y]) => mk(g, 'rect', { x: x - 10, y: y - 10, width: 22, height: 22, rx: 4, fill: HC })); }
  if (k === 'el') { [[40, 34], [110, 30], [70, 74], [150, 70]].forEach(([x, y]) => { dot(x - 11, y, 13, OC); dot(x + 11, y, 13, OC); }); }
  if (k === 'cp') { [[44, 40], [124, 34], [84, 80], [164, 76]].forEach(([x, y]) => { dot(x, y, 15, OC); dot(x - 15, y + 13, 9, HC); dot(x + 15, y + 13, 9, HC); }); }
  return g;
};
const buildTree = (svg, host, G) => {
  const out = { n: {}, e: {} };
  host.innerHTML = NODES.map(([k, t, x]) => { const [cx, y, w, h] = G[k], leaf = !!EXW[k];
    return `<div class="tn${G.sm ? ' sm' : ''}" id="${G.id}${k}" style="left:${cx - w / 2}px;top:${y}px;width:${w}px;height:${h}px"><div class="tt" style="top:${G.sm ? 10 : 12}px">${t}</div><div class="tx" style="top:${G.sm ? 40 : 54}px">${x}</div>${leaf ? `<svg width="${w}" height="${G.mh}" viewBox="0 0 200 100" style="top:${G.my}px"></svg><div class="tx" style="top:${G.ey}px;font:600 ${G.sm ? 16 : 20}px Poppins;letter-spacing:0;color:var(--ink)">${G.sm ? EXS[k] : EXW[k]}</div>` : ''}</div>`; }).join('');
  NODES.forEach(([k]) => { out.n[k] = $('#' + G.id + k); const s = out.n[k].querySelector('svg'); if (s) mini(s, k); });
  for (const k in PAR) { const [px, py, , ph] = G[PAR[k]], [cx, cy] = G[k], my = (py + ph + cy) / 2;
    out.e[k] = mk(svg, 'path', { d: `M${px} ${py + ph} V${my} H${cx} V${cy}`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); }
  return out;
};
const TW = { id: 'tw', mh: 96, my: 82, ey: 182, root: [800, 66, 400, 88], mix: [420, 196, 380, 88], pure: [1180, 196, 380, 88], hom: [220, 330, 340, 222], het: [620, 330, 340, 222], el: [980, 330, 340, 222], cp: [1380, 330, 340, 222] };
const tw = buildTree($('#trS'), $('#trN'), TW);
const TS = { id: 'ts', sm: 1, mh: 80, my: 66, ey: 152, root: [392, 74, 320, 70], mix: [200, 186, 344, 70], pure: [584, 186, 344, 70], hom: [112, 300, 176, 188], het: [298, 300, 176, 188], el: [486, 300, 176, 188], cp: [672, 300, 176, 188] };
const ts = buildTree($('#dtS'), $('#dtN'), TS);
const tTree = { root: wt('U1', 'sort'), mix: wt('U1', 'mixture'), pure: wt('U1', 'pure'), hom: wt('U3', 'homogeneous'), het: wt('U4', 'heterogeneous'), el: wt('U5', 'element'), cp: wt('U6', 'compound') };
const tLit = [['mix', wt('U2', 'mixture'), T0('U3')], ['hom', tTree.hom, T0('U4')], ['het', tTree.het, T0('U5')], ['pure', wt('U5', 'pure'), wt('U5', 'element')], ['el', tTree.el, T0('U6')], ['cp', tTree.cp, tS1]];

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="36" y="76" width="712" height="368" rx="16"/></clipPath>';
const box = mk(b, 'rect', { x: 36, y: 76, width: 712, height: 368, rx: 16, fill: '#FBFAF6', stroke: C.line, 'stroke-width': 2.5 });
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const lbl = (g, x, y, s, fs) => txt(g, x, y + fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' });
const molG = (p, kind) => { const g = mk(p, 'g', {}), a = (x, y, r, f, s) => { mk(g, 'circle', { cx: x, cy: y, r, fill: f }); lbl(g, x, y, s, r * 0.9); };
  if (kind === 'N2') { a(-15, 0, 17, NVC, 'N'); a(15, 0, 17, NVC, 'N'); }
  if (kind === 'O2') { a(-15, 0, 17, OC, 'O'); a(15, 0, 17, OC, 'O'); }
  if (kind === 'Ar') a(0, 0, 19, ARC, 'Ar');
  if (kind === 'CO2') { a(-27, 0, 15, OC, 'O'); a(27, 0, 15, OC, 'O'); a(0, 0, 17, CC, 'C'); }
  if (kind === 'H2O') { a(-21, 16, 12, HC, 'H'); a(21, 16, 12, HC, 'H'); a(0, 0, 20, OC, 'O'); }
  return g; };
const AIR = [['N2', 120, 140, 60, 40], ['N2', 300, 120, -50, 55], ['N2', 480, 160, 45, -60], ['N2', 650, 130, -65, -35], ['N2', 160, 300, 55, -45], ['N2', 360, 380, -40, -55], ['N2', 560, 330, 60, 50], ['N2', 690, 390, -55, 40], ['N2', 250, 220, 35, 65], ['N2', 440, 260, -60, 30], ['N2', 610, 230, 50, -55],
  ['O2', 200, 400, -45, -50], ['O2', 520, 110, 55, 45], ['O2', 380, 180, -50, -40], ['Ar', 100, 220, 40, -60], ['CO2', 700, 280, -45, 50]];
const airM = AIR.map(([k, x, y, vx, vy], i) => ({ g: molG(bW, k), x, y, vx, vy, rot: (i * 47) % 180, w: (i % 3 - 1) * 18 }));
const WAT = [[150, 160, 40, 35], [380, 140, -35, 40], [600, 170, 30, -40], [240, 330, -40, -30], [470, 350, 35, -35], [660, 360, -30, 30], [330, 250, 30, 30], [540, 260, -35, 25]];
const watM = WAT.map(([x, y, vx, vy], i) => ({ g: molG(bW, 'H2O'), x, y, vx, vy, rot: (i * 61) % 360, w: (i % 2 ? 14 : -14) }));
const moveM = (m, t, op) => { const x = bounce(m.x + m.vx * t, 70, 714), y = bounce(m.y + m.vy * t, 108, 412); attr(m.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(m.rot + m.w * t).toFixed(1)})`); m.g.style.opacity = op.toFixed(3); M.hide(m.g, op <= 0.002); };
const noteT = txt(b, 730, 432, 'NOT TO SCALE', { 'text-anchor': 'end', 'font-size': 14 });
// the reaction: 2H2 + O2 -> 2H2O, atoms keyed, bonds with electron pairs
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
atom('Oa', 36, OC, 'O', 30); atom('Ob', 36, OC, 'O', 30);
for (let i = 1; i <= 4; i++) atom('H' + i, 24, HC, 'H', 22);
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { OO: bond('Oa', 'Ob', 2), Ha: bond('H1', 'H2', 1), Hb: bond('H3', 'H4', 1), a1: bond('Oa', 'H1', 1), a2: bond('Oa', 'H2', 1), b1: bond('Ob', 'H3', 1), b2: bond('Ob', 'H4', 1) };
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const tAirN = wt('S2', 'nitrogen'), tAirO = wt('S2', 'oxygen'), tAr = wt('S2', 'argon'), tCO2 = wt('S2', 'carbon'), tNot = wt('S3', 'Nothing');
const tWat = wt('S4', 'water'), tWatch = wt('S5', 'Watch'), tBrk = wt('S5', 'break'), tPair = wt('S5', 'electrons'), tNew = wt('S5', 'new'), tS6 = T0('S6');
const KP = {
  Oa: [[0, 350, 170], [tBrk, 328, 166], [tPair, 230, 222]], Ob: [[0, 434, 170], [tBrk, 456, 166], [tPair, 554, 222]],
  H1: [[0, 104, 350], [tBrk, 92, 356], [tPair, 151, 283]], H2: [[0, 186, 350], [tBrk, 198, 356], [tPair + 0.12, 309, 283]],
  H3: [[0, 598, 350], [tBrk, 586, 356], [tPair + 0.12, 475, 283]], H4: [[0, 680, 350], [tBrk, 692, 356], [tPair, 633, 283]],
};
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avD = PUC.avatar($('#bnIn'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So water is a brand new substance!' });
// composition bars
const CB = [['Nitrogen', 'N₂', 78, NVC, '78%', tAirN], ['Oxygen', 'O₂', 21, OC, '21%', tAirO], ['Argon', 'Ar', 0.9, ARC, '0.9%', tAr], ['Carbon dioxide', 'CO₂', 0.04, CC, '0.04%', tCO2]];
$('#cbs').innerHTML = CB.map(([n, f, , c, p], i) => `<div class="cbar" id="cb${i}" style="top:${82 + i * 100}px"><div class="cnm">${n} <span style="font:600 22px 'IBM Plex Mono';color:${c}">${f}</span></div><div class="cpc" style="color:${c}">${p}</div><div class="ctr"><div class="cfl" id="cf${i}" style="background:${c}"></div></div></div>`).join('');
// reaction card + property chips
$('#eq').innerHTML = K(EQ);
const PCH = [[`${'H₂'}: BURNS WITH A POP`, C.redBg, C.red, 'Hydrogen'], ['O₂: HELPS BURNING', '#FDF1E2', '#B05A12', 'Oxygen'], ['H₂O: PUTS OUT FIRE', C.okBg, '#1F6B3F', 'water']];
$('#pchs').innerHTML = PCH.map(([s, bg, c], i) => `<div class="pch" id="pc${i}" style="background:${bg};color:${c}">${s}</div>`).join('');
const tPch = PCH.map(p => wt('S6', p[3]));
// counter
const CR = [['Kinds of particle', '4 | 1'], ['Fixed ratio', 'no | yes']];
$('#crs').innerHTML = CR.map(([n, v], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 86}px"><div class="cn">${n}</div><div class="cv">${v}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'So is air a compound or a mixture?', opts: ['Compound', 'Mixture'], right: 1, why: 'Its gases are not bonded, the ratio can change, and each gas keeps its own properties.' });

/* ---------- D: sorting key ---------- */
const KR = [['Only one kind of particle?', 'NO: MIXTURE', 'D2', 'If'], ['Same all through?', 'YES: HOMOGENEOUS', 'D3', 'Then'], ['One kind of atom?', 'YES: ELEMENT', 'D4', 'Then'], ['Different atoms, fixed ratio?', 'YES: COMPOUND', 'D5', 'Then']];
$('#krs').innerHTML = KR.map(([q, a], i) => `<div class="kr" id="kr${i}" style="top:${80 + i * 98}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" id="kq${i}">${a}</div></div>`).join('');
const tKr = KR.map(k => T0(k[2])), tKq = KR.map(k => wt(k[2], k[3]));
const DLIT = [['mix', 'pure'], ['hom', 'het'], ['el'], ['cp']];
const avA = PUC.avatar($('#dk'), { x: 36, y: 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Four questions sort any sample!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: sorting six samples ---------- */
const BINS = [['Element', 'ONE KIND OF ATOM', OC], ['Compound', 'FIXED RATIO', C.ink], ['Homogeneous', 'MIXTURE', NVC], ['Heterogeneous', 'MIXTURE', ARC]];
const BXY = [[36, 76], [404, 76], [36, 326], [404, 326]];
$('#bins').innerHTML = BINS.map(([n, s, c], i) => `<div class="bin" id="bin${i}" style="left:${BXY[i][0]}px;top:${BXY[i][1]}px;border-top-color:${c}"><div class="bn">${n}</div><div class="bs">${s}</div></div>`).join('');
// tiles: name, tag, bin, slot, step time
const TL = [['Air', 'N₂ · O₂ · Ar', 2, 0, wt('W6', 'Air')], ['Water', 'H₂O', 1, 0, wt('W5', 'Water')], ['Copper wire', 'Cu', 0, 0, wt('W3', 'Copper')],
  ['Sugar solution', 'IN WATER', 2, 1, wt('W6', 'sugar')], ['Salt with sugar', 'GRAINS', 3, 0, wt('W7', 'Salt')], ['Oxygen gas', 'O₂', 0, 1, wt('W4', 'Oxygen')]];
$('#tiles').innerHTML = TL.map(([n, f], i) => `<div class="tile" id="tl${i}"><div class="tn2">${n}</div><div class="tf">${f}</div></div>`).join('');
const tTl = [wt('W2', 'Air'), wt('W2', 'water'), wt('W2', 'copper'), wt('W2', 'sugar'), wt('W2', 'salt'), wt('W2', 'oxygen')];
const RULE = [[wt('W3', 'Copper'), 'Only copper atoms: element'], [wt('W4', 'Oxygen'), 'O₂: both atoms are O, element'], [wt('W5', 'Water'), 'H and O in a fixed ratio: compound'], [wt('W6', 'Air'), 'Same all through: homogeneous'], [wt('W7', 'Salt'), 'Separate grains: heterogeneous']];

/* ---------- C: separating ---------- */
const SC = [['hand', 'Hand picking', 'LARGE PIECES', 'Hand'], ['filter', 'Filtration', 'SOLID BITS', 'Filtration'], ['gem', 'Crystallisation', 'PURE CRYSTALS', 'Crystallisation'], ['flame', 'Distillation', 'BOIL, COLLECT', 'Distillation'], ['zap', 'Chemical method', 'COMPOUNDS ONLY', 'compound']];
$('#srs').innerHTML = SC.map(([ic, n, w], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 96}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="sn2">${n}</div><div class="sw">${w}</div></div>`).join('');
const tSc = SC.map((s, i) => wt(i < 2 ? 'C2' : i < 4 ? 'C3' : 'C4', s[3]));
const PANE = [['01 / 05 · PHYSICAL METHOD', 'Hand picking', 'Lift out the large pieces by hand, like stones from rice.'],
  ['02 / 05 · PHYSICAL METHOD', 'Filtration', 'A filter holds back the solid bits. The liquid passes through.'],
  ['03 / 05 · PHYSICAL METHOD', 'Crystallisation', 'Pure crystals grow out of a hot, concentrated solution as it cools.'],
  ['04 / 05 · PHYSICAL METHOD', 'Distillation', 'Boil the liquid, cool its vapour, and collect the pure liquid.'],
  ['05 / 05 · CHEMICAL METHOD', 'Splitting a compound', 'Its atoms are bonded. An electric current splits water.']];
$('#pns').innerHTML = PANE.map(([s, t, d], i) => `<div class="pn" id="pn${i}"><div class="ps"${i === 4 ? ' style="color:var(--red)"' : ''}>${s}</div><div class="ptt">${t}</div><div class="pd">${d}</div><svg width="784" height="580" id="pv${i}"></svg></div>`).join('');
// pane drawings (y 270..540)
const PV = [];
{ // hand picking: rice grains + one stone lifted
  const s = $('#pv0'), g = mk(s, 'g', {}); for (let i = 0; i < 26; i++) { const x = 140 + (i * 37) % 500, y = 470 + ((i * 53) % 60); mk(g, 'ellipse', { cx: x, cy: y, rx: 14, ry: 6, fill: '#E9E5DA', stroke: C.mute, 'stroke-width': 1.5, transform: `rotate(${(i * 29) % 180} ${x} ${y})` }); }
  const st = mk(s, 'g', {}); mk(st, 'path', { d: 'M-22 6 Q-24 -16 0 -18 Q26 -16 22 4 Q14 18 -4 16 Q-20 16 -22 6Z', fill: C.ink2 });
  const ar = mk(s, 'path', { d: 'M392 380 V300', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), ah = mk(s, 'path', { d: 'M380 312 L392 296 L404 312', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  PV[0] = (t, t0) => { const u = M.io((t - t0 - 0.6) / 1.0); attr(st, 'transform', `translate(392 ${(490 - 160 * u).toFixed(1)})`); M.drawU(ar, M.io((t - t0 - 0.4) / 0.5)); ah.style.opacity = M.clamp((t - t0 - 0.8) / 0.2); };
}
{ // filtration: funnel, paper, beaker, drops
  const s = $('#pv1'); mk(s, 'path', { d: 'M300 270 H484 L410 370 V420 H374 V370 Z', fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(s, 'path', { d: 'M318 282 H466 L392 372 Z', fill: C.ac2, stroke: C.ac, 'stroke-width': 2 });
  for (let i = 0; i < 9; i++) mk(s, 'circle', { cx: 350 + (i % 5) * 22, cy: 300 + Math.floor(i / 5) * 18, r: 6, fill: C.ink2 });
  mk(s, 'path', { d: 'M320 440 V536 H464 V440', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  const lq = mk(s, 'rect', { x: 323, width: 138, fill: C.ac2 });
  const dr = [0, 1, 2].map(() => mk(s, 'circle', { cx: 392, r: 6, fill: C.ac }));
  mk(s, 'path', { d: 'M500 330 H620', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); txt(s, 630, 336, 'SOLID STAYS', { 'font-size': 15 });
  mk(s, 'path', { d: 'M480 500 H620', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); txt(s, 630, 506, 'LIQUID PASSES', { 'font-size': 15 });
  PV[1] = (t, t0) => { dr.forEach((d, i) => { const p = ((t - t0) * 0.9 + i / 3) % 1; attr(d, 'cy', (424 + p * 90).toFixed(1)); d.style.opacity = t > t0 + 0.4 ? (1 - p * 0.6).toFixed(2) : 0; }); const h = 10 + 50 * M.clamp((t - t0) / 6); attr(lq, 'y', (533 - h).toFixed(1)); attr(lq, 'height', h.toFixed(1)); };
}
{ // crystallisation: beaker, crystals grow
  const s = $('#pv2'); mk(s, 'path', { d: 'M290 300 V536 H494 V300', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(s, 'rect', { x: 293, y: 380, width: 198, height: 153, fill: C.ac2 });
  const cr = [[330, 506, 26], [380, 512, 18], [432, 500, 30], [462, 516, 14], [356, 470, 16]].map(([x, y, w]) => ({ el: mk(s, 'rect', { x: -w / 2, y: -w / 2, width: w, height: w, fill: '#fff', stroke: C.ac, 'stroke-width': 2.5, rx: 2 }), x, y }));
  txt(s, 520, 400, 'COOLS', { 'font-size': 15 }); txt(s, 520, 520, 'CRYSTALS FORM', { 'font-size': 15 });
  PV[2] = (t, t0) => cr.forEach((c, i) => { const u = M.o3((t - t0 - 0.4 - i * 0.35) / 0.8); attr(c.el, 'transform', `translate(${c.x} ${c.y}) scale(${Math.max(0.01, u).toFixed(3)}) rotate(${i * 13})`); });
}
{ // distillation: flask on flame, tube, receiver
  const s = $('#pv3'); mk(s, 'path', { d: 'M196 300 V350 Q140 380 140 440 Q140 510 216 510 Q292 510 292 440 Q292 380 236 350 V300', fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(s, 'path', { d: 'M146 450 Q216 470 286 450 Q284 506 216 506 Q148 506 146 450Z', fill: C.ac2 });
  mk(s, 'path', { d: 'M216 300 V286 H560 L600 420', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(s, 'path', { d: 'M560 450 V536 H660 V450', fill: 'none', stroke: C.ink, 'stroke-width': 3 });
  const rq = mk(s, 'rect', { x: 563, width: 94, fill: C.ac2 });
  const fl = mk(s, 'g', {}); fl.insertAdjacentHTML('beforeend', `<g transform="translate(196 512)">${M.icon('flame', 40, C.red, 2.4)}</g>`);
  const vp = [0, 1, 2, 3].map(() => mk(s, 'circle', { r: 5, fill: C.ac }));
  const dr = mk(s, 'circle', { cx: 600, r: 6, fill: C.ac });
  txt(s, 380, 274, 'VAPOUR', { 'font-size': 15, 'text-anchor': 'middle' }); txt(s, 680, 500, 'PURE LIQUID', { 'font-size': 15 });
  PV[3] = (t, t0) => { const on = t > t0 + 0.3; vp.forEach((v, i) => { const p = ((t - t0) * 0.35 + i / 4) % 1, L = 344 + 140; let x, y; const d = p * (90 + 344 + 140); if (d < 90) { x = 216; y = 390 - d; } else if (d < 90 + 344) { x = 216 + (d - 90); y = 296; } else { const q = (d - 434) / 140; x = 560 + 40 * q; y = 296 + 124 * q; } attr(v, 'cx', x.toFixed(1)); attr(v, 'cy', y.toFixed(1)); v.style.opacity = on ? 1 : 0; });
    const p = ((t - t0) * 0.8) % 1; attr(dr, 'cy', (426 + p * 70).toFixed(1)); dr.style.opacity = on ? 1 : 0; const h = 6 + 46 * M.clamp((t - t0) / 6); attr(rq, 'y', (533 - h).toFixed(1)); attr(rq, 'height', h.toFixed(1)); };
}
{ // chemical method: equation
  const s = $('#pv4'); const fo = mk(s, 'foreignObject', { x: 36, y: 300, width: 712, height: 120 });
  fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:54px;white-space:nowrap">${K(`2${H2O} \\xrightarrow{\\text{current}} 2${H2} + ${O2}`)}</div>`;
  const ch = mk(s, 'g', {}); mk(ch, 'rect', { x: 36, y: 450, width: 470, height: 56, rx: 12, fill: C.redBg }); txt(ch, 56, 486, 'NOT BY FILTERING OR BOILING', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
  PV[4] = (t, t0) => { PUC.write(fo, t, t0 + 0.5, 0.9); fade(ch, t, wt('C4', 'chemical') - 0.1); };
}

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(O2)} is a compound: it has two atoms`, right: `One kind of atom means an element, even as ${K(O2)}, ${K(N2)}, ${K(H2)}` });
const tsv = $('#tS');
const pair = (p, x, y, c, s, r = 20) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); [-r + 2, r - 2].forEach(cx => { mk(g, 'circle', { cx, r, fill: c }); txt(g, cx, r * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': r * 0.9, fill: '#fff', 'text-anchor': 'middle' }); }); return g; };
const gO2 = mk(tsv, 'g', {}); pair(gO2, 140, 124, OC, 'O', 28); txt(gO2, 140, 214, 'O₂ · A COMPOUND?', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xO2 = mk(tsv, 'path', { d: 'M80 70 L200 178 M200 70 L80 178', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const gEl = mk(tsv, 'g', {}); pair(gEl, 440, 70, HC, 'H', 18); pair(gEl, 440, 122, NVC, 'N', 18); pair(gEl, 440, 174, OC, 'O', 18); txt(gEl, 440, 222, 'ALL ELEMENTS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Classify a sample, or mark statements on matter true or false' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which set lists a homogeneous mixture, a compound and an element, in that order?', qW: 780,
  opts: ['Air, water, oxygen gas', 'Salt with sugar, water, copper', 'Sugar solution, oxygen gas, water', `Air, ozone ${K(`${O_('O')}_3`)}, carbon dioxide`], right: 0, cols: 1, optW: 968, optY: 236, optH: 76, optFs: 30 });
const so = PUC.solution($('#so'), [['Air: homogeneous mixture'], [`${K(H2O)}: compound`], [`${K(O2)}: element`], [`Ozone ${K(`${O_('O')}_3`)}: element too`]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'Water'), wt('A2', 'Oxygen'), wt('A4', 'ozone')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · classification of matter', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Matter</b>: has mass, takes up space · solid, liquid, gas', '<b>Mixture</b>: two or more substances, any ratio · homogeneous or heterogeneous', '<b>Element</b>: one kind of atom (Cu, O₂) · <b>Compound</b>: fixed ratio (H₂O)', '<b>Separate</b>: mixtures by physical methods · compounds only by chemical ones'] });
const YQ = ['Why is air a mixture and not a compound?', 'Is nitrogen gas, N₂, an element or a compound?', 'How would you separate sand from water?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 04', topic: 'Boiling or burning? Physical and Chemical Properties', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S3', 'Different') - 0.2, 1.1, 552, 520], [tWat - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; PCH.forEach((_, i) => { const e = $('#pc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
  if (x > 760) { const s = (724) / (x - 48); x = 36; PCH.forEach((_, i) => { const e = $('#pc' + i); e.style.fontSize = (17 * s).toFixed(1) + 'px'; e.style.left = x + 'px'; x += e.offsetWidth + 12; }); }
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.kr').forEach(r => { const q = r.querySelector('.qt'), k = r.querySelector('.qk'); if (86 + q.offsetWidth + 20 > 712 - 20 - k.offsetWidth) q.style.fontSize = Math.floor(27 * (712 - 20 - k.offsetWidth - 106) / q.offsetWidth) + 'px'; });
}
const tile = (el, x, y, w, h) => { snap(el, 'left', x.toFixed(1) + 'px'); snap(el, 'top', y.toFixed(1) + 'px'); snap(el, 'width', w.toFixed(1) + 'px'); snap(el, 'height', h.toFixed(1) + 'px'); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three samples, Diya at the water cooler */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#qm' + i), t, wt('H2', 'pure') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'only') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'sort') - 0.15, 1e9, POP);
  }

  /* P: matter + three states */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'Matter') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'three') - 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => { const ti = tQr[i] - 0.1, u = fade(stBox[i], t, ti, 1e9, 0.3); stLab[i].style.opacity = u; stSub[i].style.opacity = u;
      stP[i].forEach((p, k) => { let x = p.x, y = p.y;
        if (i === 0) { x += 2.6 * Math.sin(t * 13 + k * 1.7); y += 2.6 * Math.cos(t * 11 + k * 2.3); }
        if (i === 1) { x = bounce(p.x - BX[1] + p.v * t, 18, BW - 18) + BX[1]; y += 4 * Math.sin(t * 2.2 + k); }
        if (i === 2) { x = bounce(p.x - BX[2] + p.vx * t, 18, BW - 18) + BX[2]; y = bounce(p.y - BY + p.vy * t, 18, BH - 18) + BY; }
        attr(p.el, 'cx', x.toFixed(1)); attr(p.el, 'cy', y.toFixed(1)); const op = M.clamp((t - ti - 0.2 - k * 0.02) / 0.3); p.el.style.opacity = op.toFixed(3); M.hide(p.el, op <= 0); }); });
    [[aMelt, wt('P6', 'melts')], [aBoil, wt('P6', 'boils')]].forEach(([a, ta]) => { M.draw(a.p, t, ta - 0.1, 0.5); a.h.style.opacity = M.clamp((t - ta - 0.3) / 0.15); a.tx.style.opacity = M.clamp((t - ta) / 0.25); });
    M.vis($('#stP'), t, wt('P6', 'vapour') + 0.2, 1e9, POP);
  }

  /* U: sorting tree */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#tr'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    NODES.forEach(([k]) => { M.vis(tw.n[k], t, tTree[k] - 0.1, 1e9, { ...POP, sc: 0.85 }); if (PAR[k]) M.draw(tw.e[k], t, tTree[k] - 0.4, 0.4); });
    tLit.forEach(([k, a, z]) => { const on = M.io((t - a + 0.1) / 0.25) * (1 - M.io((t - z + 0.1) / 0.25)); const n = tw.n[k]; setBg(n, mix(C.soft, C.ac2, on)); n.style.borderColor = on > 0.01 ? mix(C.soft, C.ac, on) : 'transparent'; });
  }

  /* S + B: the bench, the counter, the think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tAirN + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.setT($('#bnL'), t < tWat ? 'MOLECULE BENCH · INSIDE AIR' : t < tWatch ? 'MOLECULE BENCH · WATER' : 'MOLECULE BENCH · MAKING WATER');
    // composition card, then reaction + counter
    M.vis($('#cp'), t, tAirN - 0.1, tWatch - 0.1, { dx: 60, dy: 0, outDur: 0.3, odx: 40, ody: 0 });
    CB.forEach((cb, i) => { M.vis($('#cb' + i), t, cb[5] - 0.1, 1e9, { dy: 12 }); const u = M.o3((t - cb[5]) / 0.8); snap($('#cf' + i), 'width', (Math.max(cb[2] / 100 * 712, 10) * u).toFixed(1) + 'px'); });
    M.vis($('#cpP'), t, tNot - 0.1, 1e9, POP);
    M.vis($('#rx'), t, tWatch + 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tWatch + 0.4, z, { dy: 36, ...o });
    PUC.write($('#eq'), t, tWatch + 0.4, 0.9);
    PCH.forEach((_, i) => M.vis($('#pc' + i), t, tPch[i] - 0.1, 1e9, POP));
    CR.forEach((_, i) => { const el = $('#cr' + i); M.vis(el, t, i ? wt('B1', 'ratio') - 0.1 : tWatch + 0.7, 1e9, { dx: -16, dy: 0 });
      const fl = M.io((t - wt('B1', 'Air') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, fl)); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'compound') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Its') });
    // air: molecules drift and bounce; then water; then the reaction
    const airOp = M.clamp((t - tS1 - 0.3) / 0.4) * (1 - M.io((t - tWat + 0.1) / 0.4));
    airM.forEach((m, i) => moveM(m, t, airOp * M.clamp((t - tS1 - 0.3 - i * 0.04) / 0.3)));
    const wOp = M.io((t - tWat - 0.1) / 0.4) * (1 - M.io((t - tWatch + 0.1) / 0.4));
    watM.forEach(m => moveM(m, t, wOp));
    noteT.style.opacity = (M.clamp((t - tS1 - 0.5) / 0.3) * (1 - M.clamp((t - tWatch) / 0.3))).toFixed(3);
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const rIn = M.io((t - tWatch - 0.3) / 0.4);
    for (const k in A) { attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`); A[k].g.style.opacity = rIn.toFixed(3); M.hide(A[k].g, rIn <= 0.002); }
    const brk = M.io((t - tBrk) / 0.35);
    drawBond(BND.OO, P, rIn * (1 - brk), rIn * (1 - brk)); drawBond(BND.Ha, P, rIn * (1 - brk), rIn * (1 - brk)); drawBond(BND.Hb, P, rIn * (1 - brk), rIn * (1 - brk));
    ['a1', 'a2', 'b1', 'b2'].forEach((k, i) => drawBond(BND[k], P, M.io((t - tNew - i * 0.15) / 0.4), M.io((t - tPair - 0.4 - i * 0.12) / 0.4)));
    const TAG = [[tS1 + 0.3, 'AIR · A MIX OF GASES'], [tNot, 'NO BONDS BETWEEN THEM'], [tWat, 'WATER · ONE KIND OF PARTICLE'], [tWatch + 0.3, '2H₂ + O₂'], [tBrk, 'OLD BONDS BREAK'], [tPair, 'ELECTRONS PAIR UP'], [tNew, 'NEW BONDS FORM'], [tS6 + 0.2, '2H₂O · A NEW SUBSTANCE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    // periodic strip lights N, O, C, H as they appear; leaves for Diya
    const stOff = wt('S6', 'pop');
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['N', tAirN, NVC], ['O', tAirO, OC], ['C', tCO2, CC], ['H', tWat, HC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avD(t, stOff + 0.35, z);
  }

  /* D: sorting key + compact tree */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dk'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dt'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    NODES.forEach(([k], i) => { M.vis(ts.n[k], t, tD1 + 0.4 + i * 0.06, 1e9, { dy: 10 }); if (PAR[k]) M.draw(ts.e[k], t, tD1 + 0.4, 0.4); });
    const si = tKr.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    KR.forEach((_, i) => { const el = $('#kr' + i); M.vis(el, t, tKr[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#kq' + i), t, tKq[i] - 0.1, 1e9, POP);
      setBg(el, mix(C.soft, C.ac2, i === si ? M.io((t - tKr[i] + 0.1) / 0.25) : 0)); });
    NODES.forEach(([k]) => { let on = 0; DLIT.forEach((ks, i) => { if (ks.includes(k)) on = Math.max(on, M.io((t - tKq[i] + 0.1) / 0.3)); }); const n = ts.n[k]; setBg(n, mix(C.soft, C.ac2, on)); n.style.borderColor = on > 0.01 ? mix(C.soft, C.ac, on) : 'transparent';
      if (PAR[k]) attr(ts.e[k], 'stroke', mix(C.dim, C.ac, on)); });
    avA(t, wt('D5', 'compound') + 0.3, out);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'mixture') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'compound') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'new') + 0.3, 0.8);
  }

  /* W: worked example: tiles fly into the four boxes */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    BINS.forEach((_, i) => { const el = $('#bin' + i); M.vis(el, t, T0('W2') + 0.4 + i * 0.08, 1e9, { dy: 12 });
      let fl = 0; TL.forEach(([, , bi, , tm]) => { if (bi === i) fl = Math.max(fl, M.io((t - tm - 0.6) / 0.2) * (1 - M.io((t - tm - 1.0) / 0.5))); }); setBg(el, mix(C.soft, C.ac2, fl)); });
    TL.forEach(([, , bi, sl, tm], i) => { const el = $('#tl' + i);
      const x0 = 196 + (i % 2) * 372, y0 = 410 + Math.floor(i / 2) * 92, x1 = 976 + BXY[bi][0] + 16, y1 = 270 + BXY[bi][1] + 60 + sl * 72;
      const u = M.io((t - tm) / 0.7), lift = Math.sin(Math.PI * u) * 60;
      tile(el, M.lerp(x0, x1, u), M.lerp(y0, y1, u) - lift, M.lerp(340, 312, u), M.lerp(76, 60, u));
      const op = M.clamp((t - tTl[i] + 0.1) / 0.2) * (1 - M.io((t - out) / 0.3)); el.style.opacity = op.toFixed(3); M.hide(el, op <= 0.002);
      el.style.borderColor = mix(C.line, BINS[bi][2], u); });
    const ri = RULE.reduce((a, [tt], i) => t >= tt - 0.1 ? i : a, -1);
    if (ri >= 0) { M.setT($('#wR'), RULE[ri][1]); M.vis($('#wR'), t, RULE[ri][0] - 0.1, 1e9, POP); } else M.hide($('#wR'), true);
  }

  /* C: separating */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cpn'), t, tSc[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    SC.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tC1 + 0.3 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tSc[i] + 0.15) / 0.3) * (i < 4 ? 1 - M.io((t - tSc[i + 1] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, i === 4 ? C.red : C.ink, on)); el.querySelector('.sn2').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.sw').style.color = mix(C.mute, i === 4 ? '#FFE1E1' : C.ac2, on);
      PUC.setIco(el.querySelector('i'), SC[i][0], on > 0.5 ? (i === 4 ? C.red : C.ink) : C.ac, 28, 2.2); });
    PANE.forEach((_, i) => { const pn = $('#pn' + i), tin = tSc[i] - 0.15, tout = i < 4 ? tSc[i + 1] - 0.15 : 1e9;
      const on = M.vis(pn, t, tin, tout, { dy: 20, outDur: 0.2, ody: -10 }); if (t >= tin - 0.05 && t < tout + 0.3) PV[i](t, tin); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'call') - 0.1, tStrike: wt('X3', 'oxygen') - 0.1, tRight: wt('X3', 'One') - 0.1 });
    fade(gO2, t, wt('X2', 'two') - 0.1); M.draw(xO2, t, wt('X3', 'But') - 0.1, 0.4); fade(gEl, t, wt('X3', 'Hydrogen') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') + 0.6, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
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
