// PUC Physics Ep 64: Limiting friction (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink, TH = C.gold;   // every force orange (told apart by labels), a and g red, m ink, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const itS = (p, x, y, b, s, col, fs = 28, a = {}) => { const e = it(p, x, y, '', col, Object.assign({ 'font-size': fs }, a)); e.textContent = ''; const t1 = mk(e, 'tspan', {}); t1.textContent = b; const t2 = mk(e, 'tspan', { 'font-size': Math.round(fs * 0.62), dy: Math.round(fs * 0.22) }); t2.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const ff = tc(FC, 'f'), NN = tc(FC, 'N'), FL = tc(FC, 'f_L'), FS = tc(FC, 'f_s'), FF = tc(FC, 'F'), mg = `${tc(MC, 'm')}${tc(AC, 'g')}`, th = tc(TH, '\\theta'), thr = tc(TH, '\\theta_r'), lam = tc(TH, '\\lambda');
const G = 9.8, MASS = 2, MUs = 0.5, MUk = 0.4, W = MASS * G, THR = Math.atan(MUs) * 180 / Math.PI;   // 26.565 deg
const rad = d => d * Math.PI / 180, f1 = v => v.toFixed(1), r1 = v => Math.round(v * 10) / 10;
// incline helpers: pivot (px, py), angle in degrees; pt(d, h): d along the board, h above its surface
const ptF = (px, py, a) => { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); return (d, h = 0) => [px + d * c - h * s, py - d * s - h * c]; };
const dirU = a => [Math.cos(rad(a)), -Math.sin(rad(a))], dirN = a => [-Math.sin(rad(a)), -Math.cos(rad(a))];
const blockG = (p, w = 80, h = 48, lab = '2 kg', col = C.ink) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -h, width: w, height: h, rx: 6, fill: col }); if (lab) txt(g, 0, -h / 2 + 7, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); return { o, g }; };
const placeB = (b, P, d, a) => { const [x, y] = P(d); attr(b.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(-a).toFixed(2)})`); };
// a fixed incline drawing (board + floor + stand + angle arc)
const incline = (p, px, py, L, a, o = {}) => {
  const P = ptF(px, py, a), [ex, ey] = P(L);
  mk(p, 'line', { x1: px - 40, y1: py, x2: Math.max(ex + 50, px + L * Math.cos(rad(a)) + 50), y2: py, stroke: C.ink, 'stroke-width': 3 });
  mk(p, 'path', { d: `M${px},${py} L${ex.toFixed(1)},${ey.toFixed(1)} L${ex.toFixed(1)},${py} Z`, fill: '#EDE7D9', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const R = o.arc ?? 70;
  mk(p, 'path', { d: `M${px + R},${py} A${R},${R} 0 0 0 ${(px + R * Math.cos(rad(a))).toFixed(1)},${(py - R * Math.sin(rad(a))).toFixed(1)}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
  if (o.lab !== '') txt(p, px + R + 10, py - 10, o.lab ?? `${a === THR ? '26.6' : a}°`, { fill: TH, 'font-weight': 700, 'font-size': 20 });
  return P;
};

Object.assign(M.IC, {
  sand: ['M2 20 12 7l10 13Z', 'M7 20v-2', 'M12 20v-4', 'M17 20v-2'],
  tilt: ['M3 20 21 9', 'M3 20h18'],
  slide: ['M3 20 21 9', 'm8 14-3 2', 'M12 11l-5 3'],
  twin: ['M5 8h6v6H5z', 'M11 8h6v6h-6z', 'M3 18h16'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV4 = T0('V4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['book', 'Book on a tilted desk', 'STAYS, THEN SLIDES', 'book'], ['sand', 'Sand pile', 'NEVER STEEPER', 'sand']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${92 + i * 180}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="270" height="130"></svg></div>`).join('');
const J0 = $('#jsv0'), J1 = $('#jsv1');
const jP = ptF(30, 112, 0); const jBoard = mk(J0, 'line', { x1: 30, y1: 112, x2: 250, y2: 112, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
mk(J0, 'line', { x1: 10, y1: 112, x2: 260, y2: 112, stroke: C.dim, 'stroke-width': 2 });
const jBook = blockG(J0, 56, 22, '', VC); void jP;
mk(J1, 'path', { d: 'M30,112 L135,42 L240,112 Z', fill: '#E8D6A8', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(J1, 'line', { x1: 10, y1: 112, x2: 260, y2: 112, stroke: C.ink, 'stroke-width': 3 });
mk(J1, 'path', { d: `M80,112 A50,50 0 0 0 ${30 + 50 * Math.cos(Math.atan(70 / 105))},${112 - 50 * Math.sin(Math.atan(70 / 105))}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
txt(J1, 86, 104, 'steepest', { fill: TH, 'font-weight': 700, 'font-size': 14 });
const TILES = [[C.ink, 'Tilts slowly', 'tilt'], [C.ink, 'Shoots down!', 'slide'], [C.ac, 'Same angle?', 'twin']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'tilts'), wt('H4', 'shoots'), wt('H4', 'same')];
// drawing board on the desk picture
const hk = $('#hkS'), HPX = 60, HPY = 330, HL = 360;
const hBoardO = mk(hk, 'g', {}), hBoard = mk(hBoardO, 'g', {});
mk(hBoard, 'rect', { x: 0, y: 0, width: HL, height: 20, rx: 4, fill: '#F2D9A8', stroke: '#fff', 'stroke-width': 3 });
const hBox = blockG(hk, 64, 30, '', VC);
const hAng = M.keys([[0, 0], [wt('H4', 'tilts'), 9], [wt('H4', 'Still', 1), 14], [wt('H4', 'shoots') - 0.7, 18]], 1.0);
const tShoot = wt('H4', 'shoots');

/* ---------- P ---------- */
const PR = [['arrowR', 'Static friction', 'ONLY AS MUCH AS NEEDED', K(`${FS} \\le ${FL}`), wt('P2', 'pushes')], ['zap', 'Limiting friction', 'THE MOST IT CAN GIVE', K(`${FL} = \\mu_s ${NN}`), wt('P2', 'largest')]];
$('#prs').innerHTML = PR.map(([ic, n, s, v], i) => `<div class="prow" id="pr${i}" style="top:${300 + i * 124}px"><i>${M.icon(ic, 26, C.ac, 2.4)}</i><div class="pn">${n}</div><div class="pm">${s}</div><div class="pv" style="background:var(--soft);font-size:26px">${v}</div></div>`).join('');
$('#pF').innerHTML = K(`${FL} = \\mu_s\\,${NN}`);
const PL = [[K('\\mu_s'), 'coefficient of static friction', 'A PURE NUMBER, NO UNIT', wt('P4', 'coefficient')], [K(NN), 'normal force', 'HOW HARD THE SURFACES PRESS', wt('P4', 'normal')]];
$('#pls').innerHTML = PL.map(([sy, n, s], i) => `<div class="prow" id="pl${i}" style="top:${276 + i * 124}px"><i style="font-size:30px">${sy}</i><div class="pn">${n}</div><div class="pm">${s}</div></div>`).join('');

/* ---------- S: the tilting board ---------- */
const s = $('#simS'), PX = 100, PY = 470, BL = 620, D0 = 450, DMIN = 70, SCL = 25, FPX = 7;
mk(s, 'line', { x1: 40, y1: PY, x2: 744, y2: PY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 24) mk(s, 'line', { x1: x, y1: PY + 4, x2: x - 12, y2: PY + 16, stroke: C.dim, 'stroke-width': 2 });
const stand = mk(s, 'line', { x1: 0, y1: PY, x2: 0, y2: PY, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
const boardO = mk(s, 'g', {}), board = mk(boardO, 'g', {});
mk(board, 'rect', { x: 0, y: 0, width: BL, height: 16, rx: 3, fill: '#D9B98C', stroke: C.ink, 'stroke-width': 2.5 });
mk(board, 'rect', { x: 0, y: -14, width: 10, height: 14, fill: C.ink });           // a small stop at the bottom end
mk(s, 'circle', { cx: PX, cy: PY, r: 8, fill: C.ink });
const arc = mk(s, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 });
const arcL = it(s, 0, 0, 'θ', TH, { 'font-size': 26 });
const ghosts = [0.3, 0.2, 0.12].map(() => { const b = blockG(s, 80, 48, '', C.ink); b.o.style.opacity = 0; return b; });
const blk = blockG(s, 80, 48, '2 kg');
const aPull = PUC.arrow(s, FC, 6, 18), aFr = PUC.arrow(s, FC, 6, 18), aN = PUC.arrow(s, FC, 6, 18), aMc = PUC.arrow(s, FC, 4, 14);
aMc.g.setAttribute('opacity', 0.7);
const lPull = txt(s, 0, 0, 'mg sin θ', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
const lFs = itS(s, 0, 0, 'f', 's', FC, 26), lFk = itS(s, 0, 0, 'f', 'k', FC, 26), lFL = itS(s, 0, 0, 'f', 'L', FC, 26);
const lN = it(s, 0, 0, 'N', FC, { 'font-size': 26 }), lMc = txt(s, 0, 0, 'mg cos θ', { fill: FC, 'font-weight': 700, 'font-size': 18 });
$('#roA').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r_th" style="color:${TH}">0.0</span><span class="u">deg</span>
  <span class="k" style="color:${FC}">N</span><span class="v" id="r_n" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k" style="color:${FC}">f<sub>L</sub></span><span class="v" id="r_fl" style="color:${FC}">9.8</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC};font-size:24px">mg sin θ</span><span class="v" id="r_ps" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${FC}" id="r_fk">f<sub>s</sub></span><span class="v" id="r_f" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0</span><span class="u">m/s²</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 540, h: 156, xmax: 40, ymax: 12, xt: [0, 10, 20, 30, 40], yt: [0, 4, 8, 12], yl: 'f (N)' });
txt($('#grS'), 110 + 540 + 18, 64 + 156 + 6, 'θ (deg)', { fill: TH, 'font-size': 18 });
const guide = (fn, a0, a1, op) => { let d = ''; for (let a = a0; a <= a1 + 1e-6; a += 0.5) d += (d ? 'L' : 'M') + g.X(a).toFixed(1) + ',' + g.Y(fn(a)).toFixed(1); return mk($('#grS'), 'path', { d, fill: 'none', stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '4 7', opacity: op }); };
const gSin = guide(a => W * Math.sin(rad(a)), 0, 37.5, 0.7), gLim = guide(a => MUs * W * Math.cos(rad(a)), 0, 40, 0.9), gKin = guide(a => MUk * W * Math.cos(rad(a)), 0, 40, 0.45);
const gSinL = txt($('#grS'), g.X(31) - 10, g.Y(11), 'mg sin θ', { fill: FC, 'font-weight': 600, 'font-size': 16, 'text-anchor': 'end' });
const gLimL = itS($('#grS'), g.X(40) + 10, g.Y(7.5) + 2, 'f', 'L', FC, 20), gKinL = itS($('#grS'), g.X(40) + 10, g.Y(6.0) + 10, 'f', 'k', FC, 20);
const gCur = g.curve(FC, 5), gDrop = mk($('#grS'), 'line', { x1: g.X(THR), y1: g.Y(MUs * W * Math.cos(rad(THR))), x2: g.X(THR), y2: g.Y(MUk * W * Math.cos(rad(THR))), stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDot = g.dot(FC, 11);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px;background:var(--ac2);color:var(--ac)'; gTag.innerHTML = 'limit reached at 26.6°, then a drop'; $('#gr').appendChild(gTag);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'It held right up to the limit!' });
// timeline: angle, slip, replay
const tTilt = wt('S2', 'Tilt');
const angT = M.keys([[0, 0], [tTilt, 6], [wt('S3', 'ten') - 1.2, 10], [wt('S3', 'twenty') - 1.0, 20], [T0('S4') + 0.4, 23], [wt('S5', 'twenty') - 1.0, THR]], 1.0);
const tSlip = wt('S6', 'slips') - 0.15, tFz = wt('S7', 'Freeze') + 0.15, tRes = T1('S8') + 0.2;
const aK = G * (Math.sin(rad(26.6)) - MUk * Math.cos(rad(26.6)));        // from the displayed angle
const tau = t => { if (t < tSlip) return 0; if (t < tS7) return t - tSlip; if (t < tFz) return 0.25 * (t - tS7); if (t < tRes) return 0.25 * (tFz - tS7); return 0.25 * (tFz - tS7) + (t - tRes); };
const dPos = q => Math.max(DMIN, D0 - 0.5 * aK * SCL * q * q);
const sliding = t => (t >= tSlip && t < tS7) || t >= tRes;

/* ---------- D ---------- */
const STEPS = [[`${ff} = ${mg}\\sin${th}`, 'at rest: friction balances the pull down the slope'],
  [`${NN} = ${mg}\\cos${th}`, 'into the slope'],
  [`${ff} \\le ${FL} = \\mu_s ${NN}`, 'static friction has a limit'],
  [`${mg}\\sin${thr} = \\mu_s\\, ${mg}\\cos${thr}`, 'just about to slip'],
  [`\\tan${thr} = \\mu_s`, 'cancel mg: the angle of repose']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 'Step'));
const dr = $('#drS'), DPX = 110, DPY = 420, DF = 9;
const dP = incline(dr, DPX, DPY, 580, THR);
const dB = blockG(dr, 80, 48, '2 kg'); placeB(dB, dP, 330, THR);
const [ux, uy] = dirU(THR), [nx, ny] = dirN(THR), PS = W * Math.sin(rad(THR)), NV = W * Math.cos(rad(THR));
const dC = dP(330, 24), dCtop = dP(330, 48);
const dPull = PUC.arrow(dr, FC, 6, 18), dFr = PUC.arrow(dr, FC, 6, 18), dN = PUC.arrow(dr, FC, 6, 18), dMc = PUC.arrow(dr, FC, 4, 14);
dMc.g.setAttribute('opacity', 0.7);
const dPullL = txt(dr, 0, 0, 'mg sin θ', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), dFrL = itS(dr, 0, 0, 'f', '', FC, 26), dNL = it(dr, 0, 0, 'N', FC, { 'font-size': 26 }), dMcL = txt(dr, 0, 0, 'mg cos θ', { fill: FC, 'font-weight': 700, 'font-size': 18 });
const dLimT = document.createElement('div'); dLimT.className = 'tg'; dLimT.style.cssText = 'right:36px;top:84px;background:var(--soft);color:var(--ink)'; dLimT.innerHTML = 'f can grow only up to μ<sub>s</sub>N'; $('#dr').appendChild(dLimT);
$('#drF').innerHTML = K(`\\tan${thr} = \\mu_s`) + `<span style="font:500 24px Poppins;color:var(--mute);margin-left:20px">the mass has cancelled</span>`;
$('#stF').innerHTML = K(`\\tan${thr} = \\mu_s = \\tan${lam}`);

/* ---------- R ---------- */
const LK = [['A heavier box: bigger pull, mg sin θ', wt('R2', 'heavier')], ['It presses harder: bigger N', wt('R3', 'presses')], ['So the limit μ<sub>s</sub>N grows too', wt('R3', 'limit')], ['Both grow with m in the same ratio', wt('R4', 'Both')]];
$('#lks').innerHTML = LK.map(([s0], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 94}px"><div class="ln">${i + 1}</div><div class="lt">${s0}</div></div>`).join('') +
  `<div class="pillp good" id="lkP" style="left:36px;top:470px">m cancels: only μ<sub>s</sub> sets the angle</div>`;
const rr = $('#rrS'), RF = 4.2;
const rIn = [[40, 300, 1], [420, 300, 2]].map(([px, py, n]) => { const o = mk(rr, 'g', {}); const P = incline(o, px, py, 320, THR, { arc: 50, lab: '' });
  const bs = [...Array(n)].map((_, k) => { const b = blockG(o, 64, 36, n === 1 ? '2 kg' : '', C.ink); placeB(b, ptF(...P(190, 36 * k), THR), 0, THR); return b; });
  if (n === 2) { const [x, y] = P(190, 36); txt(o, x, y, '4 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 16, transform: `rotate(${-THR} ${x} ${y})` }); }
  const m = MASS * n, pull = m * G * Math.sin(rad(THR)), lim = MUs * m * G * Math.cos(rad(THR));
  const aP = PUC.arrow(o, FC, 5, 14), aL = PUC.arrow(o, FC, 5, 14);
  const [lx, ly] = P(158, 18), [hx, hy] = P(222, 4);
  return { o, P, pull, lim, aP, aL, lx, ly, hx, hy, m };
});
const TB = rIn.map(q => [`${q.m} kg`, `${f1(q.pull)} N`, `${f1(q.lim)} N`]);
$('#tbs').innerHTML = TB.map(([a, b, c], i) => `<div class="tb" id="tb${i}" style="top:${392 + i * 68}px"><span style="left:36px">${a}</span><span class="fo" style="left:258px">${b}</span><span class="fo" style="left:518px">${c}</span></div>`).join('');
const tTb = [wt('R2', 'heavier'), wt('R3', 'limit')];

/* ---------- K: below the limit vs at the limit ---------- */
const kSide = (host, svg, a, lab) => {
  const P = incline(svg, 90, 320, 520, a);
  const b = blockG(svg, 80, 48, '2 kg'); placeB(b, P, 300, a);
  const f = MASS * G * Math.sin(rad(a)), lim = MUs * MASS * G * Math.cos(rad(a));
  const aF = PUC.arrow(svg, FC, 6, 18); const [x0, y0] = P(340, 4), [u0, u1] = dirU(a);
  const L = itS(svg, 0, 0, 'f', '', FC, 26);
  host.insertAdjacentHTML('beforeend', `<div class="mtl" style="top:356px"><span class="fo">f = ${f1(f)} N</span> <span style="color:var(--mute)">of a limit of</span> <span class="fo">${f1(lim)} N</span></div><div class="meter" style="top:398px"><i></i><b></b></div>`);
  const mi = host.querySelector('.meter i'); const ml = host.querySelector('.mtl');
  return { b, f, lim, aF, x0, y0, u0, u1, L, mi, ml, lab };
};
const kA = kSide($('#k1M'), $('#k1S'), 15), kB = kSide($('#k2M'), $('#k2S'), THR);
$('#k1M').style.cssText = 'position:absolute;left:0;top:0'; $('#k2M').style.cssText = 'position:absolute;left:0;top:0';
$('#k1P').innerHTML = `<span>Below the limit: ${K(`${FS} = ${mg}\\sin${th}`)}</span>`;
$('#k2P').innerHTML = `<span>At the limit: ${K(`${FS} = ${FL} = \\mu_s${NN}`)}</span>`;
const th1 = PUC.think($('#th1'), { q: 'At 15°, is the friction on the 2 kg block 9.5 N?', opts: ['Yes', 'No'], right: 1, why: 'Only 5.1 N, equal to mg sin θ. It hits μsN only at slipping.' });

/* ---------- V: angle of repose vs angle of friction ---------- */
const v1 = $('#v1S'), v2 = $('#v2S');
const vP1 = incline(v1, 90, 400, 560, THR, { arc: 110, lab: '' }); const vB1 = blockG(v1, 80, 48, ''); placeB(vB1, vP1, 330, THR);
itS(v1, 220, 384, 'θ', 'r', TH, 30);
const vRep = txt(v1, 400, 470, 'STEEPEST SLOPE IT CAN REST ON', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1 });
$('#v1P').innerHTML = K(`\\tan${thr} = \\mu_s`);
const vP2 = incline(v2, 70, 470, 600, THR, { arc: 60, lab: '' }); const vB2 = blockG(v2, 80, 48, ''); placeB(vB2, vP2, 300, THR);
const VS = 8.5, [vcx, vcy] = vP2(300, 24);
const vN = PUC.arrow(v2, FC, 6, 18), vF = PUC.arrow(v2, FC, 6, 18), vR = PUC.arrow(v2, FC, 8, 20);
const vNt = [vcx + nx * NV * VS, vcy + ny * NV * VS], vFt = [vcx + ux * PS * VS, vcy + uy * PS * VS], vRt = [vcx + (nx * NV + ux * PS) * VS, vcy + (ny * NV + uy * PS) * VS];
const vPar = [mk(v2, 'line', { x1: vNt[0], y1: vNt[1], x2: vRt[0], y2: vRt[1], stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), mk(v2, 'line', { x1: vFt[0], y1: vFt[1], x2: vRt[0], y2: vRt[1], stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '5 6' })];
const vNl = it(v2, vNt[0] - 34, vNt[1] + 4, 'N', FC, { 'font-size': 26 }), vFl = itS(v2, vFt[0] + 8, vFt[1] + 4, 'f', 'L', FC, 26), vRl = it(v2, vRt[0] + 12, vRt[1] + 10, 'R', FC, { 'font-size': 26 });
const vRl2 = txt(v2, vRt[0] - 14, vRt[1] - 4, 'total contact force', { fill: FC, 'font-weight': 600, 'font-size': 15, 'text-anchor': 'end' });
const LR = 70, aNang = Math.atan2(ny, nx), aRang = -Math.PI / 2;
const vLam = mk(v2, 'path', { d: `M${(vcx + LR * Math.cos(aNang)).toFixed(1)},${(vcy + LR * Math.sin(aNang)).toFixed(1)} A${LR},${LR} 0 0 1 ${(vcx + LR * Math.cos(aRang)).toFixed(1)},${(vcy + LR * Math.sin(aRang)).toFixed(1)}`, fill: 'none', stroke: TH, 'stroke-width': 3.5 });
const vLamL = it(v2, vcx - 30, vcy - LR - 10, 'λ', TH, { 'font-size': 28 });
$('#v2P').innerHTML = K(`\\tan${lam} = ${FL}/${NN} = \\mu_s`);
const vEq = document.createElement('div'); vEq.className = 'pillp ac'; vEq.style.cssText = 'right:36px;top:84px'; vEq.innerHTML = K(`\\color{white}{\\theta_r = \\lambda}`); $('#v2').appendChild(vEq);
const th2 = PUC.think($('#th2'), { q: 'Dry sand has μs = 0.75. What is the steepest slope of a sand pile?', opts: ['About 37°', 'About 53°'], right: 0, why: 'tan 37° is about 0.75, so a steeper pile slides back to 37°.' });
const exV = document.createElement('div'); exV.className = 'ghost'; exV.style.cssText = 'right:48px;top:470px'; exV.textContent = 'EXAMPLE FIGURES'; $('#th2').appendChild(exV);

/* ---------- W: worked example ---------- */
const nw = h => `<span style="white-space:nowrap">${h}</span>`;
$('#wkq').innerHTML = `Aarav presses a ${K('1.2\\ \\text{kg}')} book against a wall with a sideways push ${K(FF)}, ${nw(K('\\mu_s = 0.4'))}. Find the smallest push that holds it up. ${nw(K('(g = 9.8\\ \\text{m/s}^2)'))}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${mg} = 1.2 \\times 9.8 = ${tc(FC, '11.76\\ \\text{N}')}`)],
  [K(`${ff} = ${mg}, \\quad ${NN} = ${FF}`)],
  [K(`\\mu_s ${FF} = 11.76 \\Rightarrow ${FF} = 11.76 / 0.4`)],
  [K(`${FF} = ${tc(FC, '29.4\\ \\text{N}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WX = 560, BKy0 = 190, BKy1 = 350, WS = 7;
mk(w, 'line', { x1: WX, y1: 80, x2: WX, y2: 520, stroke: C.ink, 'stroke-width': 4 });
for (let y = 92; y < 520; y += 24) mk(w, 'line', { x1: WX + 4, y1: y, x2: WX + 16, y2: y - 12, stroke: C.dim, 'stroke-width': 2 });
const book = mk(w, 'g', {}); mk(book, 'rect', { x: WX - 46, y: BKy0, width: 46, height: BKy1 - BKy0, rx: 5, fill: VC, stroke: C.ink, 'stroke-width': 2.5 }); mk(book, 'rect', { x: WX - 40, y: BKy0 + 8, width: 8, height: BKy1 - BKy0 - 16, fill: '#fff', opacity: 0.4 });
const wF = PUC.arrow(w, FC, 6, 18), wN = PUC.arrow(w, FC, 6, 18), wW = PUC.arrow(w, FC, 6, 18), wf = PUC.arrow(w, FC, 6, 18);
const wFl = txt(w, 0, 0, 'push F', { fill: FC, 'font-weight': 700, 'font-size': 20 }), wNl = txt(w, 0, 0, 'N from wall', { fill: FC, 'font-weight': 700, 'font-size': 20 }), wWl = txt(w, 0, 0, 'mg = 11.76 N', { fill: FC, 'font-weight': 700, 'font-size': 20 }), wfl = txt(w, 0, 0, 'friction f', { fill: FC, 'font-weight': 700, 'font-size': 20 });
const wVal = txt(w, 60, 130, '', { fill: FC, 'font-weight': 700, 'font-size': 30 });
const avW = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Press harder, and friction can hold more.' });
const tW = [wt('W3', 'weight'), wt('W4', 'Friction'), wt('W5', 'limit'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Slipping starts when ${K(`\\tan${th} = \\mu_k`)}`, right: `It starts when static friction runs out: ${K(`\\tan${thr} = \\mu_s`)}` });
const tp = $('#tpS');
const tg = PUC.graph(tp, { x: 70, y: 60, w: 360, h: 150, xmax: 40, ymax: 12 });
{ const c = tg.curve(FC, 4); c(q => [q, W * Math.sin(rad(q))], 0, THR); mk(tp, 'line', { x1: tg.X(THR), y1: tg.Y(MUs * W * Math.cos(rad(THR))), x2: tg.X(THR), y2: tg.Y(MUk * W * Math.cos(rad(THR))), stroke: FC, 'stroke-width': 4 }); mk(tp, 'line', { x1: tg.X(THR), y1: tg.Y(MUk * W * Math.cos(rad(THR))), x2: tg.X(38), y2: tg.Y(MUk * W * Math.cos(rad(38))), stroke: FC, 'stroke-width': 4 }); }
txt(tp, tg.X(THR) - 10, tg.Y(9.5) - 6, 'starts: μs', { 'text-anchor': 'end', fill: C.ok, 'font-weight': 700, 'font-size': 17 });
txt(tp, tg.X(THR) + 12, tg.Y(6.2) + 30, 'moving: μk', { fill: FC, 'font-weight': 700, 'font-size': 17 });
txt(tp, tg.X(40), tg.Y(0) + 26, 'θ', { 'text-anchor': 'end', fill: TH, 'font-size': 18, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Bodies about to slip: on slopes, pressed on walls, angle of repose' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 388,
  q: `A ${K('5\\ \\text{kg}')} block is on a ${K('37^\\circ')} incline, ${nw(K('\\mu_s = 0.5'))}. What least force along the incline will just start it moving up? ${nw(K('(g = 10\\ \\text{m/s}^2,\\ \\sin 37^\\circ = 0.6)'))}`,
  opts: ['10 N', '30 N', '50 N', '70 N'], right: 2 });
const so = PUC.solution($('#so'), [[K(`${mg}\\sin${th} = 30\\ \\text{N}`)], [K(`${NN} = ${mg}\\cos${th} = 40\\ \\text{N}`)], [K(`${FL} = 0.5 \\times 40 = 20\\ \\text{N}`)], [K(`${FF} = 30 + 20 = ${tc(C.ok, '50\\ \\text{N}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Down'), wt('A2', 'forty') - 0.6, T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · limiting friction', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`${FS} \\le ${FL} = \\mu_s ${NN}`),
    K(`\\tan${thr} = \\mu_s = \\tan${lam} \\;\\Rightarrow\\; ${thr} = ${lam}`),
    '<b>Static friction</b> gives only what is needed, up to the limit',
    '<b>Slipping starts</b> with μ<sub>s</sub>; once moving, μ<sub>k</sub> (smaller)'] });
const YQ = ['Why do a light and a heavy box of one material slip at the same angle?', 'Is static friction always equal to μsN? When is it?', 'What is the angle of friction, and why does it equal the angle of repose?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx2 = PUC.next($('#sF'), { label: 'NEXT · EP 65', topic: 'Why is a heavy box easier on wheels? Rolling Friction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tRes, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const arrowAlong = (A, P, a, d, h, len) => { const [x0, y0] = P(d, h), [u0, u1] = dirU(a); A.set(x0, y0, x0 + u0 * len, y0 + u1 * len); return [x0 + u0 * len, y0 + u1 * len]; };

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
    [0, 1].forEach(i => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    // the desk tilts, the book holds, then slides
    const ja = 22 * M.io((t - tMorph - 0.8) / 1.2), jd = 150 - 90 * M.i3((t - tMorph - 2.2) / 0.9), jx = 30 + 220 * Math.cos(rad(ja)), jy = 112 - 220 * Math.sin(rad(ja));
    attr(jBoard, 'x2', jx.toFixed(1)); attr(jBoard, 'y2', jy.toFixed(1)); placeB(jBook, ptF(30, 109, ja), Math.max(30, jd), ja);
    vis($('#hjP'), t, wt('H2', 'limit') - 0.2, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkW'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const ha = hAng(t), hd = 230 - 200 * M.i3((t - tShoot + 0.2) / 0.7);
    attr(hBoard, 'transform', `translate(${HPX},${HPY}) rotate(${(-ha).toFixed(2)})`); vis(hBoardO, t, wt('H3', 'board') - 0.1, 1e9, { dy: 16 });
    placeB(hBox, ptF(HPX, HPY, ha), Math.max(36, hd), ha); vis(hBox.o, t, wt('H3', 'geometry') - 0.1, 1e9, { dy: -20 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pD'), t, tP1 + 0.4, { st: 0.04 });
    PR.forEach((p, i) => vis($('#pr' + i), t, p[4] - 0.15, 1e9, POP));
    vis($('#pm'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P4', 'equals') - 0.2, 0.7);
    PL.forEach((p, i) => vis($('#pl' + i), t, p[3] - 0.15, 1e9, POP));
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const a = angT(t), ad = r1(a), P = ptF(PX, PY, a), c = Math.cos(rad(ad)), sn = Math.sin(rad(ad));
    attr(board, 'transform', `translate(${PX},${PY}) rotate(${(-a).toFixed(3)})`);
    const [bx, by] = ptF(PX, PY, a)(BL, -16); attr(stand, 'x1', bx.toFixed(1)); attr(stand, 'x2', bx.toFixed(1)); attr(stand, 'y2', by.toFixed(1)); M.hide(stand, a < 0.5);
    const R0 = 90; attr(arc, 'd', `M${PX + R0},${PY} A${R0},${R0} 0 0 0 ${(PX + R0 * Math.cos(rad(a))).toFixed(1)},${(PY - R0 * Math.sin(rad(a))).toFixed(1)}`); M.hide(arc, a < 0.5);
    attr(arcL, 'x', PX + R0 + 12); attr(arcL, 'y', PY - 8 - (a > 12 ? 6 : 0)); arcL.style.opacity = M.clamp(a / 3).toFixed(3);
    const q = tau(t), d = dPos(q);
    placeB(blk, P, d, a); vis(blk.o, t, tS1 + 0.5, 1e9, { dy: -30 });
    const slid = sliding(t), frozenRe = t >= tS7 && t < tRes;
    ghosts.forEach((gh, k) => { const dq = dPos(Math.max(0, q - (frozenRe ? 0.1 : 0.25) * (k + 1))); placeB(gh, P, dq, a); gh.o.style.opacity = slid && dq - d > 6 ? [0.3, 0.2, 0.12][k] : 0; });
    // forces: numbers from the displayed angle
    const Nv = W * c, pull = W * sn, lim = MUs * Nv, fv = slid ? MUk * Nv : Math.min(pull, lim);
    const fu = M.o3((t - tTilt + 0.1) / 0.5);
    const lp = FPX * pull * fu, lf = FPX * fv * fu;
    const [pe0, pe1] = arrowAlong(aPull, P, a, d - 44, 26, -lp); attr(lPull, 'x', (pe0 - 6).toFixed(1)); attr(lPull, 'y', (pe1 + 26).toFixed(1)); lPull.style.opacity = (fu * M.clamp(lp / 20)).toFixed(3);
    const [fe0, fe1] = arrowAlong(aFr, P, a, d + 44, 6, lf);
    const lab = frozenRe ? lFL : slid ? lFk : lFs;
    [lFs, lFk, lFL].forEach(L => { L.style.opacity = L === lab ? (fu * M.clamp(lf / 20)).toFixed(3) : 0; });
    attr(lab, 'x', (fe0 + 6).toFixed(1)); attr(lab, 'y', (fe1 - 12).toFixed(1));
    // slow-mo: N and mg cos theta
    const nu = frozenRe ? M.o3((t - wt('S8', 'N') + 0.1) / 0.5) : 0, [nx0, ny0] = dirN(a), [cx, cy] = P(d, 48);
    aN.set(cx, cy, cx + nx0 * FPX * Nv * nu, cy + ny0 * FPX * Nv * nu); attr(lN, 'x', (cx + nx0 * FPX * Nv * nu - 34).toFixed(1)); attr(lN, 'y', (cy + ny0 * FPX * Nv * nu + 10).toFixed(1)); lN.style.opacity = nu.toFixed(3);
    const [mx, my] = P(d, 24); aMc.set(mx + 14, my - 20, mx + 14 - nx0 * 70 * nu, my - 20 - ny0 * 70 * nu); attr(lMc, 'x', (mx + 30).toFixed(1)); attr(lMc, 'y', (my + 64).toFixed(1)); lMc.style.opacity = nu.toFixed(3);
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz + 0.05, tRes, { ...POP, sc: 0.8 });
    if (t >= tRes) vis($('#smo'), t, tRes + 0.05, tD1 - 0.4, { ...POP, sc: 0.8 });
    // readout
    const aNow = slid ? G * (sn - MUk * c) : 0;
    M.setT($('#r_th'), ad.toFixed(1)); M.setT($('#r_n'), f1(Nv)); M.setT($('#r_fl'), f1(lim)); M.setT($('#r_ps'), f1(pull)); M.setT($('#r_f'), f1(fv)); M.setT($('#r_a'), slid ? aNow.toFixed(2) : '0');
    $('#r_fk').innerHTML = frozenRe ? 'f<sub>L</sub>' : slid ? 'f<sub>k</sub>' : 'f<sub>s</sub>';
    const md = $('#mode'); M.setT(md, frozenRe ? 'ABOUT TO SLIP' : slid ? 'SLIPPING · KINETIC' : 'AT REST · STATIC'); md.style.background = slid ? C.redBg : frozenRe ? C.ac2 : C.soft; md.style.color = slid ? C.red : frozenRe ? C.ac : C.ink;
    // graph
    const amax = Math.min(a, THR);
    gCur(z => [z, W * Math.sin(rad(z))], 0, t > tTilt ? amax : 0);
    vis(gSin, t, wt('S2', 'pull') - 0.1, 1e9, { dy: 0 }); vis(gSinL, t, wt('S2', 'pull'), 1e9, { dy: 0 });
    vis(gLim, t, wt('S4', 'limit') - 0.1, 1e9, { dy: 0 }); vis(gLimL, t, wt('S4', 'limit'), 1e9, { dy: 0 });
    vis(gKin, t, wt('S6', 'Kinetic') - 0.1, 1e9, { dy: 0 }); vis(gKinL, t, wt('S6', 'Kinetic'), 1e9, { dy: 0 });
    const dropOn = t >= tSlip && !(frozenRe); M.drawU(gDrop, dropOn ? M.io((t - tSlip) / 0.3) : (t >= tRes ? 1 : 0));
    gDot(slid ? THR : a, slid ? MUk * W * Math.cos(rad(THR)) : W * Math.sin(rad(Math.min(a, THR))), t > tTilt);
    vis(gTag, t, wt('S5', 'meet') - 0.1, 1e9, POP);
    avS(t, wt('S6', 'drops') + 0.3, tS7 - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 472]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u1 = M.o3((t - wt('D2', 'balances') + 0.1) / 0.5), u2 = M.o3((t - wt('D3', 'N') + 0.1) / 0.5);
    const [pe0, pe1] = arrowAlong(dPull, dP, THR, 330 - 44, 26, -DF * PS * u1); attr(dPullL, 'x', (pe0 - 6).toFixed(1)); attr(dPullL, 'y', (pe1 + 26).toFixed(1)); dPullL.style.opacity = u1.toFixed(3);
    const [fe0, fe1] = arrowAlong(dFr, dP, THR, 330 + 44, 6, DF * PS * u1); attr(dFrL, 'x', (fe0 + 6).toFixed(1)); attr(dFrL, 'y', (fe1 - 12).toFixed(1)); dFrL.style.opacity = u1.toFixed(3);
    dN.set(dCtop[0], dCtop[1], dCtop[0] + nx * DF * NV * u2, dCtop[1] + ny * DF * NV * u2); attr(dNL, 'x', (dCtop[0] + nx * DF * NV - 34).toFixed(1)); attr(dNL, 'y', (dCtop[1] + ny * DF * NV + 10).toFixed(1)); dNL.style.opacity = u2.toFixed(3);
    dMc.set(dC[0] + 14, dC[1] - 20, dC[0] + 14 - nx * 70 * u2, dC[1] - 20 - ny * 70 * u2); attr(dMcL, 'x', (dC[0] + 30).toFixed(1)); attr(dMcL, 'y', (dC[1] + 64).toFixed(1)); dMcL.style.opacity = u2.toFixed(3);
    vis(dLimT, t, wt('D4', 'limit') - 0.1, 1e9, POP);
    vis($('#drF'), t, tStep[4] + 0.9, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'At') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'mass') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => vis($('#lk' + i), t, tt - 0.15, 1e9, { dx: -24, dy: 0 }));
    vis($('#lkP'), t, wt('R4', 'cancels') - 0.2, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    rIn.forEach((q, i) => { vis(q.o, t, tR1 + 0.7 + i * 0.3, 1e9, { dy: 16 });
      const up = M.o3((t - wt('R2', 'pulls') + 0.1) / 0.5), ul = M.o3((t - wt('R3', 'limit') + 0.1) / 0.5);
      arrowAlong(q.aP, q.P, THR, 158, 18, -RF * q.pull * up); arrowAlong(q.aL, q.P, THR, 222, 4, RF * q.lim * ul); });
    TB.forEach((_, i) => vis($('#tb' + i), t, tTb[i] - 0.15, 1e9, { dy: 14 }));
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#k1'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    vis($('#k2'), t, T0('K2') - 0.2, out, { dx: 60, dy: 0, ...o });
    [[kA, wt('K1', 'friction'), wt('K1', 'limit')], [kB, wt('K2', 'friction'), wt('K2', 'limit')]].forEach(([k, ta, tl]) => {
      const u = M.o3((t - ta + 0.1) / 0.5); k.aF.set(k.x0, k.y0, k.x0 + k.u0 * FPX * k.f * u, k.y0 + k.u1 * FPX * k.f * u);
      attr(k.L, 'x', (k.x0 + k.u0 * FPX * k.f + 6).toFixed(1)); attr(k.L, 'y', (k.y0 + k.u1 * FPX * k.f - 12).toFixed(1)); k.L.style.opacity = u.toFixed(3);
      vis(k.ml, t, ta, 1e9, { dy: 8 }); vis(k.mi.parentNode, t, ta, 1e9, { dy: 8 });
      k.mi.style.width = (712 * k.f / k.lim * M.io((t - tl + 0.2) / 0.6)).toFixed(1) + 'px';
    });
    vis($('#k1P'), t, wt('K1', 'limit') + 0.2, 1e9, POP); vis($('#k2P'), t, wt('K2', 'needed') - 0.2, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'newtons') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Only') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    vis($('#v1'), t, tV1 + 0.2, out, { dx: -60, dy: 0, ...o });
    vis(vRep, t, wt('V1', 'steepest') - 0.1, 1e9, { dy: 0 }); vis($('#v1P'), t, wt('V1', 'Tan') - 0.1, 1e9, POP);
    vis($('#v2'), t, T0('V2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const un = M.o3((t - wt('V2', 'between') + 0.1) / 0.5), uf = M.o3((t - wt('V2', 'between') + 0.3) / 0.5), ur = M.o3((t - wt('V2', 'total') + 0.1) / 0.6);
    vN.set(vcx, vcy, vcx + (vNt[0] - vcx) * un, vcy + (vNt[1] - vcy) * un); vNl.style.opacity = un.toFixed(3);
    vF.set(vcx, vcy, vcx + (vFt[0] - vcx) * uf, vcy + (vFt[1] - vcy) * uf); vFl.style.opacity = uf.toFixed(3);
    vPar.forEach(l => M.drawU(l, ur));
    vR.set(vcx, vcy, vcx + (vRt[0] - vcx) * ur, vcy + (vRt[1] - vcy) * ur); vRl.style.opacity = vRl2.style.opacity = ur.toFixed(3);
    M.draw(vLam, t, wt('V2', 'limit') - 0.1, 0.5); vis(vLamL, t, wt('V2', 'limit'), 1e9, { dy: 0 });
    vis($('#v2P'), t, wt('V2', 'Tan') - 0.1, 1e9, POP); vis(vEq, t, T0('V3') + 0.2, 1e9, POP);
    vis($('#th2'), t, tV4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'slope') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Tan') });
    vis(exV, t, tV4 + 0.6, 1e9, { dy: 8 });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis(book, t, wt('W2', 'book') - 0.1, 1e9, { dx: -20, dy: 0 });
    const cy = (BKy0 + BKy1) / 2, uF = M.o3((t - wt('W2', 'presses') + 0.1) / 0.5), uW = M.o3((t - tW[0] + 0.1) / 0.5), uf = M.o3((t - tW[1] + 0.1) / 0.5), uN = M.o3((t - wt('W4', 'N') + 0.1) / 0.5);
    const LF = WS * 29.4;
    wF.set(WX - 50 - LF * uF, cy - 30, WX - 50, cy - 30); attr(wFl, 'x', (WX - 50 - LF * uF).toFixed(1)); attr(wFl, 'y', cy - 46); wFl.style.opacity = uF.toFixed(3);
    wN.set(WX - 50, cy + 30, WX - 50 - LF * uN, cy + 30); attr(wNl, 'x', (WX - 50 - LF).toFixed(1)); attr(wNl, 'y', cy + 64); wNl.style.opacity = uN.toFixed(3);
    wW.set(WX - 23, BKy1 + 4, WX - 23, BKy1 + 4 + WS * 11.76 * uW); attr(wWl, 'x', WX - 10); attr(wWl, 'y', BKy1 + 4 + WS * 11.76 + 26); wWl.setAttribute('text-anchor', 'end'); wWl.style.opacity = uW.toFixed(3);
    wf.set(WX - 8, BKy0 - 4, WX - 8, BKy0 - 4 - WS * 11.76 * uf); attr(wfl, 'x', WX - 20); attr(wfl, 'y', BKy0 - 4 - WS * 11.76 + 8); wfl.setAttribute('text-anchor', 'end'); wfl.style.opacity = uf.toFixed(3);
    M.setT(wVal, t >= T0('W6') ? 'F = 29.4 N' : ''); vis(wVal, t, T0('W6'), 1e9, POP);
    avW(t, wt('W6', 'Any') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'slipping') - 0.2, tStrike: wt('X3', 'resting') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    vis(tp, t, wt('X3', 'matters') - 0.5, 1e9, { dy: 16 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Bodies') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'least') - 0.3, tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx2(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
