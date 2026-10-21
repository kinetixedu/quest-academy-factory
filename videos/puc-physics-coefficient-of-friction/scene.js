// PUC Physics Ep 63: Coefficient of friction (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, IC = C.ink;   // every force orange (N, W, pull P, friction f), a red, v blue, mu and numbers ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, setT = M.setT;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const FLT = 'Poppins';
const setL = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const sub = s => `<tspan baseline-shift="sub" font-size="14">${s}</tspan>`;
const FS_ = 'f' + sub('s'), FK_ = 'f' + sub('k'), MU = 'μ';
const lab = (p, s, col, a = {}) => { const e = txt(p, 0, 0, '', Object.assign({ fill: col, 'font-weight': 700, 'font-size': 20 }, a)); if (s) e.innerHTML = s; return e; };
const mS = tc(IC, '\\mu_s'), mK = tc(IC, '\\mu_k'), Nn = tc(FC, 'N'), fs = tc(FC, 'f_{s,\\max}'), fk = tc(FC, 'f_k');

/* ---------- drawings ---------- */
const handG = (p, w = 110, h = 46) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w, y: -h / 2, width: w, height: h, rx: h / 2.4, fill: '#E8B98F', stroke: C.ink, 'stroke-width': 3 }); [0, 1, 2].forEach(k => mk(g, 'line', { x1: -w * 0.42, y1: -h / 2 + 12 + k * 11, x2: -10, y2: -h / 2 + 12 + k * 11, stroke: '#B7835B', 'stroke-width': 2.5, 'stroke-linecap': 'round' })); return g; };
const floorT = (p, x0, x1, y, step = 45, fill = '#EFE6D3', joint = '#CDBF9F') => { mk(p, 'rect', { x: x0, y, width: x1 - x0, height: 40, fill }); mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 });
  const js = []; for (let x = x0; x <= x1 + step; x += step) js.push(mk(p, 'line', { x1: x, y1: y + 2, x2: x, y2: y + 40, stroke: joint, 'stroke-width': 2 }));
  return off => js.forEach((j, i) => { const x = x0 + i * step - (((off % step) + step) % step); attr(j, 'x1', x.toFixed(1)); attr(j, 'x2', x.toFixed(1)); M.hide(j, x < x0 || x > x1); }); };
const block = (p, w, h, label) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 0, y: -h, width: w, height: h, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); [0.3, 0.62].forEach(f => mk(g, 'line', { x1: 10, y1: -h * f, x2: w - 10, y2: -h * f + 3, stroke: '#A97F55', 'stroke-width': 2 })); if (label) txt(g, w / 2, -h / 2 + 7, label, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 18 }); return g; };
const weight = (p, w, h) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 0, y: -h, width: w, height: h, rx: 6, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3 }); txt(g, w / 2, -h / 2 + 6, '20 N', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 17 }); return g; };
const carton = (p, w, h, books) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 0, y: -h, width: w, height: h, rx: 6, fill: '#D9B47A', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'line', { x1: 0, y1: -h + 16, x2: w, y2: -h + 16, stroke: '#B08A50', 'stroke-width': 3 }); if (books) txt(g, w / 2, -h / 2 + 10, books, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 18 }); return g; };
// spring balance drawn horizontally: hook on the left at x 0; window scale 0..40 N
const BW = 160, BS = 3;   // case length, px per newton on the scale
const balance = (p) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: 0, y1: 0, x2: 18, y2: 0, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'rect', { x: 18, y: -20, width: BW, height: 40, rx: 10, fill: '#F2F4F8', stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'rect', { x: 28, y: -10, width: 40 * BS + 12, height: 20, rx: 4, fill: '#fff', stroke: C.ink2, 'stroke-width': 1.5 });
  for (let k = 0; k <= 40; k += 5) mk(g, 'line', { x1: 34 + k * BS, y1: -10, x2: 34 + k * BS, y2: k % 10 ? -4 : 0, stroke: C.ink, 'stroke-width': 1.5 });
  [0, 20, 40].forEach(k => txt(g, 34 + k * BS, -26, k, { 'text-anchor': 'middle', 'font-size': 13, fill: C.ink2, 'font-weight': 600 }));
  const ptr = mk(g, 'path', { d: 'M0,-8 L5,4 L-5,4 Z', fill: AC }); mk(g, 'line', { x1: BW + 18, y1: 0, x2: BW + 34, y2: 0, stroke: C.ink, 'stroke-width': 3 });
  return { g, set: P => attr(ptr, 'transform', `translate(${(34 + M.clamp(P, 0, 40) * BS).toFixed(1)},6)`) }; };

Object.assign(M.IC, {
  box: ['M3 8h18v12H3z', 'M3 8l2-4h14l2 4', 'M10 12h4'],
  books: ['M4 4h4v16H4z', 'M10 4h4v16h-4z', 'M16 5l3-1 3 15-3 1z'],
  snow: ['M12 2v20', 'M4 7l16 10', 'M4 17l16-10'],
  arrowD: ['M12 5v14', 'm19 12-7 7-7-7'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tR1 = T0('R1'), tR6 = T0('R6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['box', 'Empty box', 'SLIDES EASILY', 'empty', 'EASY', 0], ['books', 'Full of books', 'MUCH HARDER', 'books', 'HARDER', 1], ['snow', 'On ice', 'IT GLIDES', 'ice', 'GLIDES', 0]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="background:${c ? 'var(--ac)' : 'var(--soft)'};color:${c ? '#fff' : 'var(--ink)'};border:2px solid ${c ? 'var(--ac)' : 'var(--line)'}">${tg}</div></div>`).join('');
const TILES = [[FC, 'Twice the books: twice the pull', 'books'], [VC, 'Narrow end: same pull', 'layers'], [C.ac, 'Why?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'Twice'), wt('H4', 'change'), wt('H4', 'Why')];
const hk = $('#hkS'), HF = 400;
floorT(hk, 0, 784, HF)(0);
const hW1 = mk(hk, 'g', {}), hC1 = carton(mk(hW1, 'g', { transform: `translate(110,${HF})` }), 300, 120, '20 BOOKS');
const hW2 = mk(hk, 'g', {}), hC2 = carton(mk(hW2, 'g', { transform: `translate(110,${HF})` }), 300, 230, '40 BOOKS');
const hW3 = mk(hk, 'g', {}), hC3 = carton(mk(hW3, 'g', { transform: `translate(290,${HF})` }), 120, 300, '');
txt(hW3, 350, HF - 150, '40', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 }); txt(hW3, 350, HF - 126, 'BOOKS', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 16 });
const hRope = mk(hk, 'line', { stroke: C.ink2, 'stroke-width': 3 });
const hHO = mk(hk, 'g', {}), hH = mk(hHO, 'g', {}); handG(mk(hH, 'g', { transform: 'scale(-1,1)' }), 120, 48);
const hP = PUC.arrow(hk, FC, 8, 22), hPl = lab(hk, '', FC, { 'text-anchor': 'middle', 'font-size': 22 });
const tHtw = wt('H3', 'Twice'), tHn = wt('H4', 'narrow');

/* ---------- P: what friction depends on ---------- */
$('#pls').innerHTML = `<div class="pr2" id="pl0" style="top:84px"><div class="fn">1 · How hard they press</div><div class="fs">THE NORMAL FORCE N</div>
    <div class="sc" id="pc0" style="left:28px">${M.icon('arrowD', 24, FC, 2.6)}<span>N bigger</span><span style="color:var(--mute)">&rarr;</span><span class="fo">friction bigger</span></div></div>
  <div class="pr2" id="pl1" style="top:310px"><div class="fn">2 · What they are made of</div><div class="fs">THE PAIR OF SURFACES</div>
    <div class="sc" id="pc1" style="left:28px">wood on wood</div><div class="sc" id="pc2" style="left:236px">rubber on road</div><div class="sc" id="pc3" style="left:460px">steel on ice</div></div>`;
const ps = $('#prS'), PF = 420;
floorT(ps, 0, 784, PF)(0);
const pBk = mk(ps, 'g', {}); block(mk(pBk, 'g', { transform: `translate(312,${PF})` }), 160, 110, 'BLOCK');
const pW = PUC.arrow(ps, FC, 8, 22), pWl = lab(ps, 'W', FC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 30 });
const pN = PUC.arrow(ps, FC, 8, 22), pNl = lab(ps, 'N', FC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 30 });
const pNt = txt(ps, 600, 200, 'floor pushes up', { fill: FC, 'font-weight': 600, 'font-size': 18 }), pWt = txt(ps, 600, 340, 'Earth pulls down', { fill: FC, 'font-weight': 600, 'font-size': 18 });

/* ---------- S: the block + spring balance sim ---------- */
const s = $('#simS'), sG = mk(s, 'g', { transform: 'translate(0,-150) scale(1.35)' }), FL = 440, PXM = 80, XB0 = 40, CAP = 50, BKW = 160, BKH = 70, WTH = 34, G = 9.8, MUS = 0.5, MUK = 0.4, VSL = 0.3, TAU = VSL / ((MUS - MUK) * G), ARW = 3.2;
const sFloor = floorT(sG, 0, 610, FL);
const trials = [1, 2, 3].map(i => ({ N: 20 * i }));
const tW2 = wt('S3', 'Add'), tW3 = wt('S4', 'Add');
const T = [
  { a: wt('S2', 'Pull') + 0.2, s: wt('S2', 'ten'), e: wt('S2', 'eight') + 1.0 },
  { a: wt('S3', 'forty') + 0.2, s: wt('S3', 'twenty', 1), e: wt('S3', 'sixteen') + 0.9 },
  { a: wt('S4', 'sixty') + 0.1, s: wt('S4', 'thirty'), e: wt('S4', 'four') + 0.9 }];
T.forEach((q, i) => { q.N = 20 * (i + 1); q.fs = MUS * q.N; q.fk = MUK * q.N; q.s = Math.max(q.s, q.a + 0.8); });
// one trial: ramp the pull to fs, slip, pull eases to fk (exp, tau), slide at 0.3 m/s, release, kinetic friction stops it at mu_k g
const trialState = (q, sv) => {
  if (sv < q.a) return { P: 0, f: 0, v: 0, x: 0, ph: 0 };
  if (sv < q.s) { const P = q.fs * (sv - q.a) / (q.s - q.a); return { P, f: P, v: 0, x: 0, ph: 1 }; }
  const u = Math.min(sv, q.e) - q.s, e = Math.exp(-u / TAU), v = VSL * (1 - e), x = VSL * (u - TAU * (1 - e));
  if (sv < q.e) return { P: q.fk + (q.fs - q.fk) * e, f: q.fk, v, x, ph: 2 };
  const dec = MUK * G, w = sv - q.e, ts = v / dec;
  if (w < ts) return { P: 0, f: q.fk, v: v - dec * w, x: x + v * w - 0.5 * dec * w * w, ph: 3 };
  return { P: 0, f: 0, v: 0, x: x + v * v / (2 * dec), ph: 4 };
};
const nW = sv => sv >= tW3 + 0.3 ? 2 : sv >= tW2 + 0.3 ? 1 : 0;
const simState = sv => { let x = 0; for (let i = 0; i < 3; i++) x += trialState(T[i], sv).x; const i = nW(sv); return { ...trialState(T[i], sv), x, i, N: T[i].N }; };
const sBk = mk(sG, 'g', {}); block(mk(sBk, 'g', {}), BKW, BKH, '20 N');
const sWt = [0, 1].map(k => { const o = mk(sG, 'g', {}), inr = mk(o, 'g', {}); weight(inr, 120, WTH); return { o, inr }; });
const sGh = [0.3, 0.2, 0.12].map(o => { const g = mk(sG, 'g', {}); mk(g, 'rect', { x: 0, y: -BKH, width: BKW, height: BKH, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }); g.setAttribute('opacity', 0); g._o = o; return g; });
const sBal = balance(sG); const sHO = mk(sG, 'g', {}); handG(mk(sHO, 'g', { transform: 'scale(-1,1)' }), 110, 46);
const aP = PUC.arrow(sG, FC, 7, 20), aPl = lab(sG, '', FC, { 'text-anchor': 'middle' });
const aF = PUC.arrow(sG, FC, 7, 20), aFl = lab(sG, '', FC, { 'text-anchor': 'middle' });
const aN = PUC.arrow(sG, FC, 7, 20), aNl = lab(sG, '', FC, { 'text-anchor': 'start' });
const aV = PUC.arrow(sG, VC, 6, 18), aVl = lab(sG, 'v', VC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 26 });
$('#roA').innerHTML = `<span class="k" style="color:${FC}">N</span><span class="v" id="r_N" style="color:${FC}">20</span><span class="u">N</span>
  <span class="k" style="color:${FC}">P</span><span class="v" id="r_P" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${FC}" id="r_fk">f<sub>s</sub></span><span class="v" id="r_f" style="color:${FC}">0.0</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${IC}">f / N</span><span class="v" id="r_r" style="color:${IC}">0.00</span><span class="u"></span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">state</span><span class="v" id="r_s" style="font-size:28px">at rest</span><span class="u"></span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 352, h: 220, xmax: 80, ymax: 40, xt: [0, 20, 40, 60, 80], yt: [0, 10, 20, 30, 40], yl: 'f (N)' });
txt(gs, g.X(80) + 16, g.Y(0) + 6, 'N (N)', { fill: FC, 'font-size': 18 });
const gLs = mk(gs, 'path', { d: `M${g.X(0)},${g.Y(0)} L${g.X(80)},${g.Y(40)}`, fill: 'none', stroke: FC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gLk = mk(gs, 'path', { d: `M${g.X(0)},${g.Y(0)} L${g.X(80)},${g.Y(32)}`, fill: 'none', stroke: FC, 'stroke-width': 4, 'stroke-dasharray': '10 7', 'stroke-linecap': 'round' });
const gTs = lab(gs, `static max: slope ${MU}${sub('s')} = 0.5`, FC, { 'font-size': 18 }); attr(gTs, 'x', g.X(80) + 14); attr(gTs, 'y', g.Y(40) + 4);
const gTk = lab(gs, `kinetic: slope ${MU}${sub('k')} = 0.4`, FC, { 'font-size': 18 }); attr(gTk, 'x', g.X(80) + 14); attr(gTk, 'y', g.Y(32) + 6);
const gPts = T.map(q => ({ s: mk(gs, 'circle', { cx: g.X(q.N), cy: g.Y(q.fs), r: 8, fill: '#fff', stroke: FC, 'stroke-width': 3.5 }), k: mk(gs, 'circle', { cx: g.X(q.N), cy: g.Y(q.fk), r: 8, fill: FC }) }));
const gDot = g.dot(IC, 10);
// replay of trial 3's slip
const tR0 = T0('S6'), tFz = wt('S6', 'Freeze') + 0.15, tRes = wt('S7', 'every') - 0.1, RATE = 0.25, sFz = T[2].s - 0.001, sR0 = sFz - RATE * (tFz - tR0);
const simT = t => t < tR0 ? t : t < tFz ? sR0 + RATE * (t - tR0) : t < tRes ? sFz : sFz + RATE * (t - tRes);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 96, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Double N, double friction!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${fs} \\propto ${Nn} \\;\\Rightarrow\\; ${fs} = ${mS}\\,${Nn}`, 'the most static friction grows with N'],
  [`${fk} = ${mK}\\,${Nn}`, 'kinetic friction too'],
  [`${mS} = \\dfrac{${fs}}{${Nn}} = \\dfrac{30}{60} = 0.5,\\quad ${mK} = \\dfrac{24}{60} = 0.4`, ''],
  [`\\mu = \\dfrac{\\text{N}}{\\text{N}} \\;\\Rightarrow\\; \\text{no unit}`, 'a pure number'],
  [`${mS} > ${mK}`, 'starting is harder than sliding']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
['2', '3'].forEach(i => { const e = $('#dst' + i).querySelector('.sx'); e.style.fontSize = '30px'; e.style.top = '-8px'; });
$('#dst3').querySelector('.why').style.cssText += ';left:450px;top:12px';
const tStep = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 'Step'));
const ds = $('#drS'), dg = PUC.graph(ds, { x: 110, y: 100, w: 400, h: 280, xmax: 80, ymax: 40, xt: [0, 20, 40, 60, 80], yt: [0, 24, 30, 40], yl: 'f (N)' });
txt(ds, dg.X(80) + 16, dg.Y(0) + 6, 'N (N)', { fill: FC, 'font-size': 18 });
const dLs = mk(ds, 'path', { d: `M${dg.X(0)},${dg.Y(0)} L${dg.X(80)},${dg.Y(40)}`, fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dLk = mk(ds, 'path', { d: `M${dg.X(0)},${dg.Y(0)} L${dg.X(80)},${dg.Y(32)}`, fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-dasharray': '10 7', 'stroke-linecap': 'round' });
const dTs = lab(ds, `${FS_},max`, FC, { 'font-size': 20 }); attr(dTs, 'x', dg.X(80) + 12); attr(dTs, 'y', dg.Y(40) + 6); setL(dTs, `f${sub('s,max')}`);
const dTk = lab(ds, FK_, FC, { 'font-size': 20 }); attr(dTk, 'x', dg.X(80) + 12); attr(dTk, 'y', dg.Y(32) + 8);
const dTri = mk(ds, 'path', { d: `M${dg.X(0)},${dg.Y(0)} H${dg.X(60)} V${dg.Y(30)}`, fill: 'none', stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dTri2 = mk(ds, 'line', { x1: dg.X(60), y1: dg.Y(24), x2: dg.X(60) + 12, y2: dg.Y(24), stroke: IC, 'stroke-width': 2.5 });
const dRun = lab(ds, 'run: N = 60', IC, { 'font-size': 18, 'text-anchor': 'middle' }); attr(dRun, 'x', dg.X(30)); attr(dRun, 'y', dg.Y(0) - 10);
const dRise = lab(ds, 'rise: 30 and 24', IC, { 'font-size': 18 }); attr(dRise, 'x', dg.X(60) - 10); attr(dRise, 'y', dg.Y(8)); attr(dRise, 'text-anchor', 'end');
$('#drF').innerHTML = K(`\\mu = \\dfrac{\\text{friction}}{\\text{normal force}} = \\text{slope}`);
$('#stF').innerHTML = K(`${tc(FC, 'f_s')} \\le ${mS}\\,${Nn} \\qquad ${fk} = ${mK}\\,${Nn}`);

/* ---------- K: wood vs ice ---------- */
const ks = $('#kS'), KL = [[230, 'WOOD ON WOOD', 0.4, '#EFE6D3', '#CDBF9F'], [440, 'BLOCK ON ICE', 0.05, '#DDEEFB', '#B8D8F2']];
const kLn = KL.map(([y, nm, mu, fl, jt], i) => { const fln = floorT(ks, 0, 1564, y, 45, fl, jt);
  const gh = [0.3, 0.2, 0.12].map(o => { const gg = mk(ks, 'g', {}); mk(gg, 'rect', { x: 0, y: -70, width: 160, height: 70, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }); gg.setAttribute('opacity', 0); gg._o = o; return gg; });
  const bo = mk(ks, 'g', {}); block(mk(bo, 'g', { transform: `translate(700,${y})` }), 160, 70, 'N = 60 N');
  const fa = PUC.arrow(ks, FC, 7, 20), pa = PUC.arrow(ks, FC, 7, 20), va = PUC.arrow(ks, VC, 6, 18);
  const f = mu * 60, L = 4 * f; fa.set(700, y - 10, 700 - L, y - 10); pa.set(864, y - 40, 864 + L, y - 40); va.set(870, y - 84, 930, y - 84);
  const fl2 = lab(ks, `${FK_} = ${f % 1 ? f.toFixed(1) : f} N`, FC, { 'text-anchor': 'end' }); attr(fl2, 'x', 690 - L); attr(fl2, 'y', y - 4);
  const pl2 = lab(ks, `pull = ${f % 1 ? f.toFixed(1) : f} N`, FC); attr(pl2, 'x', 874 + L); attr(pl2, 'y', y - 34);
  const nm2 = txt(ks, 36, y - 120, nm, { fill: C.ink, 'font-weight': 700, 'font-size': 20, 'letter-spacing': 1.5 });
  const mu2 = lab(ks, `${MU}${sub('k')} = ${mu}`, IC, { 'font-size': 26 }); attr(mu2, 'x', 36); attr(mu2, 'y', y - 84);
  return { y, fln, gh, items: [bo, fa.g, pa.g, va.g, fl2, pl2, nm2, mu2] }; });
$('#kP').innerHTML = `${M.icon('layers', 24, IC, 2.4)}<span>Same N, different surfaces: ${K(`${tc(IC, '\\mu')}`)} decides</span>`;
const th1 = PUC.think($('#th1'), { q: 'Aarav doubles the books in his carton. What happens to μ<sub>k</sub>?', opts: ['It doubles', 'It stays the same'], right: 1, why: 'Friction doubles, but N doubles too. The ratio does not change.' });

/* ---------- R: area ---------- */
const LK = [['Surfaces touch only at tiny bumps', wt('R2', 'bumps')], ['Narrow end: each bump pressed harder', wt('R3', 'harder')], ['Wide face: more bumps, each pressed gently', wt('R4', 'gently')], ['True contact area is set by N, not the face', wt('R5', 'set')]];
$('#lks').innerHTML = LK.map(([a], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px"><div class="ln">${i + 1}</div><div class="lt">${a}</div></div>`).join('');
const rs = $('#rrS'), RF = 290;
floorT(rs, 0, 784, RF)(0);
const rWide = mk(rs, 'g', {}); carton(mk(rWide, 'g', { transform: `translate(60,${RF})` }), 260, 90, 'WIDE FACE');
const rNar = mk(rs, 'g', {}); carton(mk(rNar, 'g', { transform: `translate(560,${RF})` }), 90, 200, '');
txt(rNar, 605, RF - 216, 'NARROW END', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 16, 'letter-spacing': 1 });
// zoom strips: wide = 6 gentle contacts of 8 px, narrow = 3 hard contacts of 16 px (same total)
const zoom = (x0, w, n, cw) => { const gg = mk(rs, 'g', {}); mk(gg, 'rect', { x: x0, y: 360, width: w, height: 80, rx: 8, fill: '#fff', stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
  mk(gg, 'rect', { x: x0 + 8, y: 368, width: w - 16, height: 26, fill: '#D9B47A' }); mk(gg, 'rect', { x: x0 + 8, y: 406, width: w - 16, height: 26, fill: '#EFE6D3' });
  for (let i = 0; i < n; i++) { const cx = x0 + 8 + (w - 16) * (i + 0.5) / n; mk(gg, 'rect', { x: cx - cw / 2, y: 392, width: cw, height: 16, rx: 3, fill: AC }); }
  return gg; };
const rZw = zoom(40, 300, 6, 8), rZn = zoom(470, 270, 3, 16);
const rLw = lab(rs, '6 small contacts', AC, { 'font-size': 18, 'text-anchor': 'middle' }); attr(rLw, 'x', 190); attr(rLw, 'y', 470);
const rLn = lab(rs, '3 bigger contacts', AC, { 'font-size': 18, 'text-anchor': 'middle' }); attr(rLn, 'x', 605); attr(rLn, 'y', 470);
const rEq = lab(rs, 'true contact area: about the same', IC, { 'font-size': 22, 'text-anchor': 'middle' }); attr(rEq, 'x', 392); attr(rEq, 'y', 528);
const rF = [PUC.arrow(rs, FC, 6, 18), PUC.arrow(rs, FC, 6, 18)], rFl = [lab(rs, `${FK_} = 24 N`, FC, { 'font-size': 18, 'text-anchor': 'middle' }), lab(rs, `${FK_} = 24 N`, FC, { 'font-size': 18, 'text-anchor': 'middle' })];
attr(rFl[0], 'x', 60 - 48); attr(rFl[0], 'y', RF + 30); attr(rFl[0], 'text-anchor', 'start'); attr(rFl[1], 'x', 520); attr(rFl[1], 'y', RF + 30);
const th2 = PUC.think($('#th2'), { q: 'Wide face: 24 N of friction. On its narrow end, the friction is?', opts: ['Still 24 N', 'Less than 24 N'], right: 0, why: 'Same N, same surfaces, so μN is the same. Area does not matter.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ${K('5\\ \\text{kg}')} block. The balance reads ${K(tc(FC, '24.5\\ \\text{N}'))} as it starts to slide, and ${K(tc(FC, '19.6\\ \\text{N}'))} while sliding. Find ${K(mS)} and ${K(mK)}. ${K('(g = 9.8\\ \\text{m/s}^2)')}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${Nn} = mg = 5 \\times 9.8 = 49\\ \\text{N}`)],
  [K(`${mS} = \\dfrac{24.5}{49} = 0.5`)],
  [K(`${mK} = \\dfrac{19.6}{49} = 0.4`)],
  [K(`2\\times \\text{mass}: ${Nn} = 98\\ \\text{N},\\; ${fs} = 49\\ \\text{N}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'equals'), wt('W4', 'mu'), wt('W5', 'mu'), wt('W6', 'Add')];
const ws = $('#wrS'), WF = 400;
floorT(ws, 0, 784, WF)(0);
const wBk = mk(ws, 'g', {}); block(mk(wBk, 'g', { transform: `translate(200,${WF})` }), 170, 80, '5 kg');
const wB2o = mk(ws, 'g', {}), wB2 = mk(wB2o, 'g', {}); block(mk(wB2, 'g', { transform: `translate(205,${WF - 80})` }), 160, 70, '+5 kg');
const wBal = balance(ws); attr(wBal.g, 'transform', `translate(370,${WF - 40})`);
const wN = PUC.arrow(ws, FC, 7, 20), wNl = lab(ws, '', FC, { 'font-size': 20 });
const wRd = lab(ws, '', FC, { 'font-size': 24, 'text-anchor': 'middle' }); attr(wRd, 'x', 470); attr(wRd, 'y', WF - 90);
const wTag = $('#wtag');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A block at rest always feels f = μ<sub>s</sub>N', right: 'μ<sub>s</sub>N is only the maximum: f ≤ μ<sub>s</sub>N, it matches the push' });
const tp = $('#tpS'), TF = 200;
floorT(tp, 220, 600, TF)(0);
mk(tp, 'rect', { x: 400, y: TF - 76, width: 120, height: 76, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); txt(tp, 460, TF - 32, 'N = 60 N', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 15 });
const tP = PUC.arrow(tp, FC, 6, 16), tPl = lab(tp, 'push 10 N', FC, { 'font-size': 17, 'text-anchor': 'middle' });
const tFw = PUC.arrow(tp, AC, 6, 16), tFwl = lab(tp, 'f = 30 N ?', AC, { 'font-size': 17, 'text-anchor': 'middle' }), tFr = PUC.arrow(tp, FC, 6, 16), tFrl = lab(tp, 'f = 10 N', FC, { 'font-size': 17, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Find μ from readings or a graph, then the friction for a new load' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ${K('2\\ \\text{kg}')} block slides on a level floor at ${K(tc(VC, '6\\ \\text{m/s}'))}. ${K(`${mK} = 0.3`)}, ${K('g = 10\\ \\text{m/s}^2')}. How far does it slide before it stops?`,
  opts: ['3 m', '6 m', '12 m', '1.8 m'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${fk} = ${mK} m g = 0.3 \\cdot 2 \\cdot 10 = 6\\ \\text{N}`)], [K(`${tc(AC, 'a')} = \\dfrac{6}{2} = 3\\ \\text{m/s}^2 = ${mK}\\,g`)], [K(`${tc(VC, 'v')}^2 = 2${tc(AC, 'a')}s \\Rightarrow 36 = 6s`)], [K(`s = ${tc(C.ok, '6\\ \\text{m}')}`)]], { y0: 100, dy: 112 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '23px');
const tSo = [wt('A2', 'Friction'), wt('A3', 'a'), wt('A4', 'squared'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · coefficient of friction', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`${tc(FC, 'f_s')} \\le ${mS}\\,${Nn} \\qquad ${fk} = ${mK}\\,${Nn}`),
    `${K(`\\mu = \\dfrac{f}{${Nn}}`)}<span style="font:500 30px Poppins;margin:0 22px">no unit,</span>${K(`${mS} > ${mK}`)}`,
    '<b>μ</b> depends on the two surfaces, not on N or the area',
    `Sliding to a stop on a level floor: ${K(`${tc(AC, 'a')} = ${mK}\\,g`)}`] });
const YQ = ['Why does twice the load need twice the pull?', 'Why does μ have no unit?', 'Does a box slide more easily on a smaller face? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 64', topic: 'Tilt the floor: at what angle does it slip? Limiting Friction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR0 + 0.1, 1.06, 960, 540], [tD1 - 0.5, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const f1 = v => v.toFixed(1);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); vis($('#jt' + i), t, tMorph + 0.6 + i * 0.2, 1e9, POP); });
    vis($('#hjP'), t, wt('H2', 'friction') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const st = t < tHtw ? 0 : t < tHn ? 1 : 2;
    [hW1, hW2, hW3].forEach((w, i) => { w.style.opacity = st === i ? M.clamp((t - (i === 0 ? tH3 + 0.2 : i === 1 ? tHtw : tHn)) / 0.3).toFixed(3) : 0; });
    const xr = 410, L = st === 0 ? 80 : 160, on = M.io((t - tH3 - 0.6) / 0.5);
    attr(hRope, 'x1', xr); attr(hRope, 'y1', HF - 50); attr(hRope, 'x2', xr + 230); attr(hRope, 'y2', HF - 50); hRope.style.opacity = on;
    attr(hHO, 'transform', `translate(${xr + 230},${HF - 50})`); hHO.style.opacity = on;
    hP.set(xr + 4, HF - 100, xr + 4 + L * on, HF - 100);
    attr(hPl, 'x', xr + 8); attr(hPl, 'y', HF - 120); attr(hPl, 'text-anchor', 'start'); hPl.style.opacity = on;
    setT(hPl, st === 0 ? 'pull' : st === 1 ? '2 × pull' : 'same 2 × pull');
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, T0('P3') - 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#pl0'), t, wt('P3', 'press') - 0.2, 1e9, { dy: 16 }); vis($('#pc0'), t, wt('P3', 'press') + 0.3, 1e9, POP);
    vis($('#pl1'), t, wt('P3', 'made') - 0.2, 1e9, { dy: 16 }); [1, 2, 3].forEach(i => vis($('#pc' + i), t, wt('P3', 'made') + 0.2 + i * 0.15, 1e9, POP));
    vis($('#pr'), t, tP1 + 0.1, out, { dx: 60, dy: 0, ...o });
    vis(pBk, t, tP1 + 0.4, 1e9, { dy: 0 });
    const uW = M.io((t - wt('P4', 'weight') + 0.6) / 0.5), uN = M.io((t - wt('P4', 'normal') + 0.1) / 0.5);
    pW.set(392, PF - 55, 392, PF - 55 + 130 * uW); attr(pWl, 'x', 408); attr(pWl, 'y', PF + 70); pWl.style.opacity = uW; pWt.style.opacity = uW; attr(pWt, 'x', 440); attr(pWt, 'y', PF + 40);
    pN.set(392, PF - 110, 392, PF - 110 - 130 * uN); attr(pNl, 'x', 408); attr(pNl, 'y', PF - 220); pNl.style.opacity = uN; pNt.style.opacity = uN; attr(pNt, 'x', 440); attr(pNt, 'y', PF - 190);
    vis($('#prP'), t, wt('P4', 'weight') + 0.2, 1e9, POP);
  }

  /* S: sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const sv = simT(t), S = simState(sv), rp = t >= tR0, live = M.clamp((t - tS1 - 0.5) / 0.3);
    const wx = S.x * PXM, off = Math.max(0, wx - CAP), xb = XB0 + wx - off, nw = S.i; sFloor(off); const top = FL - BKH - nw * WTH;
    attr(sBk.firstChild, 'transform', `translate(${xb.toFixed(1)},${FL})`); sBk.style.opacity = live;
    sWt.forEach((w, k) => { const td = k ? tW3 : tW2, dropU = sv < td ? 0 : M.clamp((sv - td) / 0.35), y = FL - BKH - k * WTH - 120 * (1 - dropU * dropU);
      attr(w.inr, 'transform', `translate(${(xb + 20).toFixed(1)},${y.toFixed(1)})`); w.o.style.opacity = sv < td ? 0 : M.clamp((sv - td) / 0.12); });
    const lag = rp ? RATE : 1;
    sGh.forEach((gh, k) => { const S2 = simState(sv - 0.18 * (k + 1) * lag), gx = XB0 + S2.x * PXM - off, mv = S.v > 0.03 && xb - gx > 3 && !(t >= tFz && t < tRes); attr(gh, 'transform', `translate(${gx.toFixed(1)},${FL})`); gh.setAttribute('opacity', mv ? gh._o : 0); });
    // balance + hand on the right, hooked to the block's right face
    const bx = xb + BKW + 24; attr(sBal.g, 'transform', `translate(${bx.toFixed(1)},${FL - 36})`); sBal.set(S.P); sBal.g.style.opacity = live;
    attr(sHO, 'transform', `translate(${(bx + BW + 34).toFixed(1)},${FL - 36})`); sHO.style.opacity = live;
    const Pr = Math.round(S.P * 10) / 10, fr = S.ph >= 2 ? (S.ph === 4 ? 0 : T[S.i].fk) : Pr;
    const pl = ARW * Pr * live, fl = ARW * fr * live, nl = 1.0 * S.N * live;
    aP.set(xb + BKW + 4, FL - 92, xb + BKW + 4 + pl, FL - 92); attr(aPl, 'x', (xb + BKW + 4 + pl / 2).toFixed(1)); attr(aPl, 'y', FL - 108); setL(aPl, `P = ${f1(Pr)} N`); aPl.style.opacity = M.clamp((pl - 30) / 30).toFixed(3);
    aF.set(xb, FL - 9, xb - fl, FL - 9); attr(aFl, 'x', Math.max(62, xb - fl / 2).toFixed(1)); attr(aFl, 'y', FL + 30); setL(aFl, `${S.ph >= 2 ? FK_ : FS_} = ${f1(fr)} N`); aFl.style.opacity = M.clamp((fl - 10) / 20).toFixed(3);
    const nx0 = xb + BKW / 2; aN.set(nx0, FL + nl, nx0, FL + 2); attr(aNl, 'x', (nx0 + 14).toFixed(1)); attr(aNl, 'y', (FL + 32).toFixed(1)); setL(aNl, `N = ${S.N} N`); aNl.style.opacity = live;
    const vl = 200 * S.v; aV.set(xb + BKW / 2 - 40, top - 30, xb + BKW / 2 - 40 + vl, top - 30); attr(aVl, 'x', (xb + BKW / 2 - 30 + vl).toFixed(1)); attr(aVl, 'y', top - 22); aVl.style.opacity = M.clamp(S.v / 0.08).toFixed(3);
    setT($('#r_N'), String(S.N)); setT($('#r_P'), f1(Pr)); setT($('#r_f'), f1(fr)); setT($('#r_r'), (fr / S.N).toFixed(2)); setT($('#r_v'), S.v.toFixed(2));
    setT($('#r_s'), S.ph >= 2 && S.ph < 4 ? 'sliding' : 'at rest');
    const fkE = $('#r_fk'); const kin = S.ph >= 2 && S.ph < 4; if (fkE._k !== kin) { fkE._k = kin; fkE.innerHTML = kin ? 'f<sub>k</sub>' : 'f<sub>s</sub>'; }
    const stc = $('#stc'); setT(stc, kin ? 'SLIDING · KINETIC' : 'AT REST · STATIC'); stc.style.background = kin ? C.ac2 : C.soft; stc.style.color = kin ? C.ac : C.ink;
    vis(stc, t, tS1 + 0.8, tR0 - 0.1, { dy: 0, outDur: 0.15, ody: 0 });
    vis($('#smo'), t, tR0, tFz, { ...POP, outDur: 0.12, ody: 0 }); if (t >= tRes) vis($('#smo'), t, tRes, 1e9, { ...POP });
    vis($('#frz'), t, tFz, tRes, { ...POP, outDur: 0.12, ody: 0 });
    // graph: the measured points appear when measured (real time), lines at S5, dot follows the sim
    T.forEach((q, i) => { vis(gPts[i].s, t, q.s - 0.05, 1e9, { dy: 0 }); vis(gPts[i].k, t, q.s + 1.2, 1e9, { dy: 0 }); });
    M.draw(gLs, t, wt('S5', 'straight') - 0.2, 0.8); M.draw(gLk, t, wt('S5', 'lines') - 0.1, 0.8);
    vis(gTs, t, wt('S5', 'zero') - 0.1, 1e9, { dy: 0 }); vis(gTk, t, wt('S5', 'zero') + 0.1, 1e9, { dy: 0 });
    gDot(S.N, fr, t > tS1 + 0.8);
    avS(t, wt('S5', 'doubles') + 0.2, tR0 - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tStep[0] + 0.2, 1e9, { dx: 60, dy: 0 });
    M.draw(dLs, t, tStep[0] + 0.6, 0.8); vis(dTs, t, tStep[0] + 1.2, 1e9, { dy: 0 });
    M.draw(dLk, t, tStep[1] + 0.6, 0.8); vis(dTk, t, tStep[1] + 1.2, 1e9, { dy: 0 });
    M.draw(dTri, t, tStep[2] + 0.5, 0.8); vis(dTri2, t, tStep[2] + 1.2, 1e9, { dy: 0 }); vis(dRun, t, tStep[2] + 0.9, 1e9, { dy: 0 }); vis(dRise, t, tStep[2] + 1.3, 1e9, { dy: 0 });
    vis($('#drF'), t, tStep[3] + 0.6, 1e9, POP);
    const s5 = M.io((t - tStep[4] - 0.4) / 0.4); dLs.setAttribute('stroke-width', 5 + 3 * s5);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Friction') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'And'), 0.8);
  }

  /* K: wood vs ice + think */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    vis($('#kc'), t, tK1 + 0.05, OUT('K3'), { dy: 36, ...o }); vis($('#exK'), t, tK1 + 0.4, 1e9, { dy: 8 });
    kLn.forEach((ln, i) => { const t0 = i ? T0('K2') - 0.1 : wt('K1', 'wood') - 0.3, on = t >= t0, off = on ? 0.3 * 90 * (t - t0) : 0; ln.fln(off);
      ln.items.forEach(e => vis(e, t, t0, 1e9, { dy: 0 }));
      ln.gh.forEach((gh, k) => { const gx = 700 - 0.3 * 90 * 0.18 * (k + 1); attr(gh, 'transform', `translate(${gx.toFixed(1)},${ln.y})`); gh.setAttribute('opacity', on ? gh._o : 0); }); });
    vis($('#kP'), t, wt('K2', 'surfaces') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'What') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Friction') });
  }

  /* R: area + think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R6');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => vis($('#lk' + i), t, tt - 0.3, 1e9, { dx: -24, dy: 0 }));
    vis($('#rr'), t, tR1 + 0.4, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, T0('R2'), 1e9, { dy: 8 });
    vis(rWide, t, tR1 + 0.7, 1e9, { dy: 0 }); vis(rNar, t, tR1 + 0.9, 1e9, { dy: 0 });
    vis(rZn, t, wt('R3', 'narrow') - 0.1, 1e9, { dy: 0 }); vis(rLn, t, wt('R3', 'harder'), 1e9, { dy: 0 });
    vis(rZw, t, wt('R4', 'wide') - 0.1, 1e9, { dy: 0 }); vis(rLw, t, wt('R4', 'gently'), 1e9, { dy: 0 });
    vis(rEq, t, wt('R5', 'same') - 0.1, 1e9, POP);
    const u = M.io((t - wt('R5', 'face') + 0.1) / 0.4), L = 77 * u; rF[0].set(60, RF - 9, 60 - Math.min(L, 50), RF - 9); rF[1].set(560, RF - 9, 560 - L, RF - 9);
    rFl.forEach(e => e.style.opacity = u);
    vis($('#th2'), t, tR6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tR6, tOpts: wt('R6', 'narrow') - 0.1, tCount: T1('R6') + 0.05, dur: 3, tAns: T0('R7') - 0.02, tWhy: wt('R7', 'Same') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const dbl = t >= tWs[3], tA = wt('W2', 'reads'), tB = wt('W2', 'nineteen');
    const rd = dbl ? 49 : t < tA ? 0 : t < tB ? 24.5 : 19.6; wBal.set(rd); setT(wRd, rd ? `${rd} N` : ''); vis(wRd, t, tA, 1e9, { dy: 0 });
    vis(wB2o, t, tWs[3] - 0.1, 1e9, { dy: -40 });
    const uN = M.io((t - tWs[0]) / 0.4), nN = dbl ? 98 : 49, nl = 1.2 * nN * uN; wN.set(285, WF + nl, 285, WF + 2); attr(wNl, 'x', 300); attr(wNl, 'y', WF + 34); setT(wNl, `N = ${nN} N`); wNl.style.opacity = uN;
    setT(wTag, dbl ? '2 × MASS · STARTS AT 49 N' : t < tB ? 'JUST STARTING · STATIC MAX' : 'SLIDING · KINETIC'); wTag.style.background = t >= tB && !dbl ? C.ac2 : C.soft; wTag.style.color = t >= tB && !dbl ? C.ac : C.ink;
    vis(wTag, t, tA - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    const tSk = wt('X3', 'only') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'students') - 0.1, tStrike: tSk, tRight: wt('X3', 'maximum') + 0.2 });
    const u0 = M.io((t - wt('X3', 'push') + 0.4) / 0.4); tP.set(396 - 40 * u0, TF - 50, 396, TF - 50); attr(tPl, 'x', 360); attr(tPl, 'y', TF - 64); tPl.style.opacity = u0.toFixed(3);
    const u1 = M.io((t - wt('X2', 'mu') + 0.1) / 0.4) * (1 - M.io((t - tSk) / 0.3));
    tFw.set(400, TF - 10, 400 - 120 * u1, TF - 10); attr(tFwl, 'x', 340); attr(tFwl, 'y', TF + 30); tFwl.style.opacity = u1.toFixed(3);
    const u2 = M.io((t - wt('X3', 'meets')) / 0.4); tFr.set(400, TF - 10, 400 - 40 * u2, TF - 10); attr(tFrl, 'x', 380); attr(tFrl, 'y', TF + 30); tFrl.style.opacity = u2.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'finding') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
