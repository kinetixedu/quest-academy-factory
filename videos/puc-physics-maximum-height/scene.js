// PUC Physics Ep 44: Maximum height (Motion notebook: launch at 60 degrees, v_y-t graph, side by side angles)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, HC = C.violet, THC = C.gold, TC = C.ink;   // v blue, g red, H / height violet, theta gold, t ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, s, col, fs = 28, sub) => { const e = txt(p, x, y, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }); if (sub) { const ts = mk(e, 'tspan', { 'font-size': fs * 0.62, dy: fs * 0.22 }); ts.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const g = 9.8;
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const u_ = c(VC, 'u'), g_ = c(GC, 'g'), a_ = c(GC, 'a'), H_ = c(HC, 'H'), th_ = c(THC, '\\theta'), vy_ = c(VC, 'v_y'), vx_ = c(VC, 'v_x'), v_ = c(VC, 'v');
const usin = `${u_}\\sin${th_}`, ucos = `${u_}\\cos${th_}`;
const ball = (p, r, op = 1) => { const og = mk(p, 'g', { opacity: op }); mk(og, 'circle', { cx: 0, cy: 0, r, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 }); return og; };
const place = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const sgn = v => (v >= 0.05 ? '+' : v <= -0.05 ? '−' : '') + Math.abs(v).toFixed(1);
const arcP = (cx, cy, r, a0, a1) => `M${(cx + r * Math.cos(a0)).toFixed(1)},${(cy - r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 0 ${(cx + r * Math.cos(a1)).toFixed(1)},${(cy - r * Math.sin(a1)).toFixed(1)}`;
const hatch = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

Object.assign(M.IC, {
  fountain: ['M12 21v-9', 'M12 12c-2.5-6-6.5-6.5-9-1', 'M12 12c2.5-6 6.5-6.5 9-1', 'M7 21h10'],
  jump: ['M3 20h18', 'M4 20c2.5-12 11.5-12 15 0', 'M11.5 6.5a1.5 1.5 0 1 0 0.01 0'],
  ball: ['M12 3a9 9 0 1 0 0.01 0', 'M4 9.5c5 2 11 2 16 0', 'M4 14.5c5-2 11-2 16 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP3 = T0('P3'), tP4 = T0('P4'), tP5 = T0('P5');
const tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tD1 = T0('D1'), tT = T0('T1');
const tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tK5 = T0('K5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three arcs ---------- */
const JOBS = [['fountain', 'Fountain jet', 'WATER', 'fountain'], ['jump', 'Long jump', 'ATHLETE', 'long'], ['ball', 'Ball toss', 'TO A FRIEND', 'ball']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg class="jv" width="150" height="84"><path class="ja" d="M10,76 Q75,-30 140,76" fill="none" stroke="${C.ink2}" stroke-width="3" stroke-dasharray="5 7" stroke-linecap="round"/><circle class="jd" cx="75" cy="23" r="9" fill="${HC}"/></svg></div>`).join('');
const hk = $('#hkS'), HLX = 250, HLY = 380, HP = 24, HVX = 14 * Math.cos(Math.PI / 6), HVY = 7, HT = 2 * HVY / g;
hatch(hk, 36, 748, 470);
mk(hk, 'line', { x1: HLX, y1: HLY, x2: 690, y2: HLY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const hPath = mk(hk, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 40; i++) { const u = HT * i / 40; d += (i ? 'L' : 'M') + (HLX + HVX * u * HP).toFixed(1) + ',' + (HLY - (HVY * u - 0.5 * g * u * u) * HP).toFixed(1); } return d; })(), fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' });
mk(hk, 'path', { d: arcP(HLX, HLY, 44, 0, Math.PI / 6), fill: 'none', stroke: THC, 'stroke-width': 3 });
txt(hk, HLX + 52, HLY - 8, '30°', { fill: THC, 'font-weight': 600, 'font-size': 20 });
const hGh = [0, 1, 2].map(() => ball(hk, 12, 0)), hB = ball(hk, 12);
const hTopY = HLY - 2.5 * HP, hTopX = HLX + HVX * (HT / 2) * HP;
const hBr = mk(hk, 'path', { d: `M${hTopX + 34},${hTopY} h12 V${HLY} h-12`, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const hBl = txt(hk, hTopX + 56, (hTopY + HLY) / 2 + 7, '2.5 m', { fill: HC, 'font-weight': 600, 'font-size': 22 });
const hRul = mk(hk, 'g', {});
mk(hRul, 'line', { x1: 700, y1: HLY, x2: 700, y2: HLY - 5 * HP, stroke: C.ink, 'stroke-width': 2 });
const hTk = [[0, '0'], [2.5, '2.5 m'], [5, '5 m ?']].map(([m, s]) => { const gg = mk(hRul, 'g', {}); mk(gg, 'line', { x1: 692, y1: HLY - m * HP, x2: 708, y2: HLY - m * HP, stroke: C.ink, 'stroke-width': 2 }); txt(gg, 714, HLY - m * HP + 6, s, { 'text-anchor': 'start', fill: m === 5 ? C.ac : m ? HC : C.mute, 'font-weight': 600 }); return gg; });
const tThrow = wt('H3', 'throws') + 0.1;
const tNo = wt('H5', 'no');

/* ---------- P ---------- */
const pl = $('#plS'), PLX = 100, PLY = 450, PR = 560, PH = 280;
const pxy = s => [PLX + PR * s / 2, PLY - PH * (2 * s - s * s)];      // s = time / time-to-top (0..2)
mk(pl, 'line', { x1: 60, y1: PLY, x2: 724, y2: PLY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
txt(pl, 724, PLY + 28, 'LAUNCH LEVEL', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 2 });
const plPath = mk(pl, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 50; i++) { const [x, y] = pxy(2 * i / 50); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; })(), fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 8' });
mk(pl, 'circle', { cx: PLX, cy: PLY, r: 7, fill: C.ink });
const plTop = mk(pl, 'g', {}); { const [x, y] = pxy(1); mk(plTop, 'circle', { cx: x, cy: y, r: 13, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 }); }
const plH = mk(pl, 'line', { x1: pxy(1)[0], y1: pxy(1)[1] + 16, x2: pxy(1)[0], y2: PLY, stroke: HC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const plHl = sym(pl, pxy(1)[0] + 14, (pxy(1)[1] + PLY) / 2 + 10, 'H', HC, 36);
const plV = [0, 1 / 3, 2 / 3].map(() => PUC.arrow(pl, VC, 5, 15));
const plVl = sym(pl, 0, 0, 'v', VC, 26, 'y');
const plZ = document.createElement('div'); plZ.className = 'tag2'; plZ.style.cssText = `left:${pxy(1)[0] + 26}px;top:${pxy(1)[1] - 50}px;background:${C.ac2};color:${VC}`; plZ.innerHTML = 'v<sub>y</sub> = 0 · TOP'; $('#pl').appendChild(plZ);
const tVy = [wt('P5', 'keeps'), wt('P5', 'vertical'), wt('P5', 'points')];
// right: split u
const pr = $('#prS'), PO = [110, 470], PU = 330, PA = 56 * Math.PI / 180, PTx = PO[0] + PU * Math.cos(PA), PTy = PO[1] - PU * Math.sin(PA);
const pUa = PUC.arrow(pr, VC, 7, 22), pCx = mk(pr, 'line', { x1: PO[0], y1: PO[1], x2: PTx, y2: PO[1], stroke: VC, 'stroke-width': 4, 'stroke-dasharray': '10 8' }), pCy = mk(pr, 'line', { x1: PTx, y1: PO[1], x2: PTx, y2: PTy, stroke: VC, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const pArc = mk(pr, 'path', { d: arcP(PO[0], PO[1], 64, 0, PA), fill: 'none', stroke: THC, 'stroke-width': 3 });
const pGa = PUC.arrow(pr, GC, 7, 22), pGl = sym(pr, 712, 300, 'g', GC, 34);
$('#pU').innerHTML = K(u_); $('#pUc').innerHTML = K(ucos); $('#pUs').innerHTML = K(usin); $('#pTh').innerHTML = K(th_);
$('#pU').style.left = '150px'; $('#pU').style.top = '290px'; $('#pUs').style.left = (PTx + 18) + 'px'; $('#pUs').style.top = '232px'; $('#pUc').style.left = '150px'; $('#pUc').style.top = '492px'; $('#pTh').style.left = '186px'; $('#pTh').style.top = '412px';
$('#pB').style.left = (PTx + 18) + 'px'; $('#pB').style.top = '296px'; $('#pG').style.left = (PTx + 18) + 'px'; $('#pG').style.top = '430px';

/* ---------- S: launch sim ---------- */
const s = $('#simS'), LX = 110, B0 = 486, SP = 18, U = 19.6, UX = 9.8, UY = U * Math.sin(Math.PI / 3), TT = UY / g, TL = 3.46;   // TT = 1.732 s to the top
const sx = u => LX + UX * u * SP, sy = u => B0 - (UY * u - 0.5 * g * u * u) * SP, yv = u => UY * u - 0.5 * g * u * u;
hatch(s, 80, 760, B0 + 14);
mk(s, 'line', { x1: 64, y1: B0, x2: 64, y2: B0 - 14.7 * SP - 20, stroke: C.ink, 'stroke-width': 2 });
[0, 5, 10, 14.7].forEach(m => { mk(s, 'line', { x1: 56, y1: B0 - m * SP, x2: 72, y2: B0 - m * SP, stroke: C.ink, 'stroke-width': 2 }); txt(s, 48, B0 - m * SP + 6, m, { 'text-anchor': 'end', fill: m === 14.7 ? HC : C.mute, 'font-weight': m === 14.7 ? 600 : 400 }); });
txt(s, 48, B0 + 34, 'm', { 'text-anchor': 'end' });
const sTrace = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' });
const sU = PUC.arrow(s, VC, 6, 18), sUl = sym(s, LX + 36, B0 - 112, 'u', VC, 28);
const sArc = mk(s, 'path', { d: arcP(LX, B0, 46, 0, Math.PI / 3), fill: 'none', stroke: THC, 'stroke-width': 3 });
const sArcL = txt(s, LX + 54, B0 - 12, '60°', { fill: THC, 'font-weight': 600, 'font-size': 20 });
const sGh = [0, 1, 2, 3].map(() => ball(s, 14, 0));
const sTr = [0, 1, 2].map(() => ball(s, 14, 0));
const sB = ball(s, 14);
const sVx = PUC.arrow(s, VC, 6, 18), sVy = PUC.arrow(s, VC, 6, 18), sG = PUC.arrow(s, GC, 6, 18);
const sVxl = sym(s, 0, 0, 'v', VC, 26, 'x'), sVyl = sym(s, 0, 0, 'v', VC, 26, 'y'), sGl = sym(s, 0, 0, 'g', GC, 28);
const sH = mk(s, 'line', { x1: sx(TT), y1: sy(TT) + 16, x2: sx(TT), y2: B0, stroke: HC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const sHl = document.createElement('div'); sHl.className = 'pillp'; sHl.style.cssText = `left:${sx(TT) + 16}px;top:${B0 - 120}px;color:${HC}`; sHl.innerHTML = '<span class="mono">H = 14.7 m</span>'; $('#sim').appendChild(sHl);
const GK = [0, 1, 2, 3].map(k => k * TT / 4), BRX = 580;
const sBr = [0, 1, 2, 3].map(k => mk(s, 'path', { d: `M${BRX},${sy(GK[k]).toFixed(1)} h12 V${sy(k < 3 ? GK[k + 1] : TT).toFixed(1)} h-12`, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const sBl = [0, 1, 2, 3].map(k => { const a = yv(GK[k]), b = yv(k < 3 ? GK[k + 1] : TT); return txt(s, BRX + 22, (sy(GK[k]) + sy(k < 3 ? GK[k + 1] : TT)) / 2 + 7, (b - a).toFixed(1) + ' m', { fill: HC, 'font-size': 20, 'font-weight': 600 }); });
$('#roG').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>x</sub></span><span class="v" id="rvx" style="color:${VC}">9.8</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>y</sub></span><span class="v" id="rvy" style="color:${VC}">+17.0</span><span class="u">m/s</span>
  <span class="k" style="color:${HC}">y</span><span class="v" id="ry" style="color:${HC}">0.0</span><span class="u">m</span>`;
$('#roF1').innerHTML = K(`${vx_} = ${ucos}`); $('#roF2').innerHTML = K(`${vy_} = ${usin} - ${g_}t`);
const sGr = PUC.graph($('#grS'), { x: 110, y: 70, w: 560, h: 160, xmax: 3.5, ymin: -17.5, ymax: 17.5, xt: [0, 1, 2, 3], yt: [16.97, 0, -16.97] });
txt($('#grS'), 690, sGr.Y(0) + 6, 't (s)');
const sTri = sGr.mk('path', { d: `M${sGr.X(0)},${sGr.Y(UY)} L${sGr.X(TT)},${sGr.Y(0)} L${sGr.X(0)},${sGr.Y(0)} Z`, fill: HC, 'fill-opacity': 0.2, stroke: HC, 'stroke-width': 2 });
const sCv = sGr.curve(VC), sDt = sGr.dot(C.ink);
const sZ = sGr.mk('circle', { cx: sGr.X(TT), cy: sGr.Y(0), r: 13, fill: 'none', stroke: VC, 'stroke-width': 3 });
const sZl = sGr.mk('text', { x: sGr.X(TT) + 18, y: sGr.Y(0) - 14, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: VC, 'font-weight': 600 }); sZl.textContent = 'TOP · 1.73 s';
const sAr = sGr.mk('text', { x: 420, y: 100, 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: HC, 'font-weight': 600 }); sAr.textContent = 'area = 14.7 m = H';
// sim clock: first run at 0.5x, then a replay: 1x to 1 s, 0.25x to the top, freeze
const tA = wt('S2', 'readout') - 0.1, tRp = tS5 - 0.1, tSlow = tRp + 1;
const simT = t => {
  if (t < tRp) return M.clamp((t - tA) * 0.5, 0, TL);
  const d = t - tRp; return d < 1 ? d : Math.min(TT, 1 + (d - 1) * 0.25);
};
const tFrz = tSlow + (TT - 1) * 4;
const th1 = PUC.think($('#th1'), { q: 'At the very top of its flight, is the ball’s speed zero?', opts: ['Yes, zero', `No, ${K('u\\cos\\theta')}`], right: 1, why: `Only ${K(vy_)} is zero. ${K(`${vx_} = ${ucos}`)} never changes.` });

/* ---------- D ---------- */
const STEPS = [[`${vy_}\\text{ starts at } ${usin},\\;\\; ${a_} = -${g_}`, 'look only up and down; up is positive'],
  [`\\text{at the top: } ${vy_} = 0`, 'the ball stops rising'],
  [`${v_}^2 = u^2 + 2${a_}s \\;\\Rightarrow\\; 0 = ${u_}^2\\sin^2${th_} - 2${g_}${H_}`, 'final speed 0, start u sin θ, a = −g, s = H'],
  [`${H_} = \\dfrac{${u_}^2\\sin^2${th_}}{2${g_}}`, 'the maximum height']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:108px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .why').style.top = '96px';
const tStep = [wt('D2', 'Look'), wt('D3', 'At'), wt('D4', 'Use'), wt('D5', 'So')];
const dr = $('#drS'), DLX = 200, DB = 380, DP = 16, DAX = 110;
const dx = u => DLX + UX * u * DP, dy = u => DB - yv(u) * DP;
mk(dr, 'line', { x1: DAX - 30, y1: DB, x2: 740, y2: DB, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
mk(dr, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 50; i++) { const u = 2 * TT * i / 50; d += (i ? 'L' : 'M') + dx(u).toFixed(1) + ',' + dy(u).toFixed(1); } return d; })(), fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' });
mk(dr, 'line', { x1: DAX, y1: DB + 10, x2: DAX, y2: dy(TT) - 40, stroke: C.ink, 'stroke-width': 2 });
txt(dr, DAX, dy(TT) - 52, 'HEIGHT', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const dLink = mk(dr, 'line', { x1: DAX, y1: DB, x2: DLX, y2: DB, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '3 6' });
const dSh = mk(dr, 'circle', { cx: DAX, cy: DB, r: 11, fill: VC });
const dB = ball(dr, 13);
const dVy = PUC.arrow(dr, VC, 5, 16), dVyl = sym(dr, 0, 0, 'v', VC, 24, 'y');
const dZ = txt(dr, DAX + 24, dy(TT) - 12, 'vy = 0', { fill: VC, 'font-size': 24, 'font-weight': 600 });
const dH = mk(dr, 'path', { d: `M${DAX - 30},${dy(TT)} h-12 V${DB} h12`, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const dHl = sym(dr, DAX - 72, (dy(TT) + DB) / 2 + 10, 'H', HC, 32);
$('#dU').innerHTML = `unit: &nbsp;${K('\\dfrac{(\\text{m/s})^2}{\\text{m/s}^2} = \\text{m}')}`;
$('#dT').innerHTML = `time to the top: &nbsp;${K(`t = \\dfrac{${usin}}{${g_}}`)}`;
['#dU', '#dT'].forEach(id => { const e = $(id); e.style.height = '64px'; });
const tDrun = wt('D2', 'Look') + 0.2;
const dT = t => Math.min(TT, Math.max(0, (t - tDrun) * 0.5));
dZ.textContent = '';
{ const ts1 = mk(dZ, 'tspan', {}); ts1.textContent = 'v'; const ts2 = mk(dZ, 'tspan', { 'font-size': 14, dy: 5 }); ts2.textContent = 'y'; const ts3 = mk(dZ, 'tspan', { dy: -5 }); ts3.textContent = ' = 0'; }

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vy_} = 0, \\;\\; ${v_} = ${ucos}`);

/* ---------- R: link by link ---------- */
const LK = [['The up part doubles', 'u sin θ grows in step with u', '7 → 14 m/s'], ['Time up doubles', 'g takes away 9.8 m/s every second', '0.71 → 1.43 s'], ['Average speed doubles', 'half of u sin θ, on the way up', '3.5 → 7 m/s'], ['Height × 4', 'H = average speed × time: 2 × 2', '2.5 → 10 m']];
$('#lks').innerHTML = LK.map(([x, w, m], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lx">${x}</div><div class="lw">${w}</div><div class="lm" style="color:${[VC, TC, VC, HC][i]}">${m}</div></div>`).join('');
const tLk = [wt('R2', 'twice'), wt('R3', 'twice'), wt('R4', 'average'), wt('R5', 'four')];
const rr = $('#rrS'), rG = PUC.graph(rr, { x: 120, y: 96, w: 560, h: 300, xmax: 1.6, ymin: 0, ymax: 15.5, xt: [], yt: [0, 7, 14] });
[[0, '0'], [1 / 1.4, '0.71'], [2 / 1.4, '1.43']].forEach(([v, s2]) => { rG.mk('line', { x1: rG.X(v), y1: 396, x2: rG.X(v), y2: 404, stroke: C.ink, 'stroke-width': 2 }); const e = rG.mk('text', { x: rG.X(v), y: 428, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }); e.textContent = s2; });
txt(rr, 700, 428, 't (s)', { 'text-anchor': 'end' }); txt(rr, 132, 90, 'vy (m/s)', { fill: VC, 'font-weight': 600 });
const t1s = 7 / g, t2s = 14 / g;
const rT1 = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(7)} L${rG.X(t1s)},${rG.Y(0)} L${rG.X(0)},${rG.Y(0)} Z`, fill: HC, 'fill-opacity': 0.35, stroke: 'none' });
const rT2 = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(14)} L${rG.X(t2s)},${rG.Y(0)} L${rG.X(0)},${rG.Y(0)} Z`, fill: HC, 'fill-opacity': 0.12, stroke: HC, 'stroke-width': 2 });
const rL1 = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(7)} L${rG.X(t1s)},${rG.Y(0)}`, stroke: VC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const rL2 = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(14)} L${rG.X(t2s)},${rG.Y(0)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const rMid = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(7)} H${rG.X(t1s)} V${rG.Y(0)}`, stroke: HC, 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': '7 6' });
const rA1 = rG.mk('text', { x: rG.X(0) + 14, y: rG.Y(2) , 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: HC, 'font-weight': 600 }); rA1.textContent = '2.5 m';
const rL1t = rG.mk('text', { x: rG.X(t1s) + 12, y: rG.Y(0.9), 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: VC, 'font-weight': 600 }); rL1t.textContent = '14 m/s throw';
const rL2t = rG.mk('text', { x: rG.X(0.62) + 10, y: rG.Y(10.5), 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: VC, 'font-weight': 600 }); rL2t.textContent = '28 m/s throw';
const rBase = rG.mk('path', { d: `M${rG.X(0)},${rG.Y(0) + 46} v-8 H${rG.X(t2s)} v8`, stroke: TC, 'stroke-width': 2.5, fill: 'none' });
const rAvg = [7, 3.5].map(v => rG.mk('line', { x1: rG.X(0), y1: rG.Y(v), x2: rG.X(v === 7 ? t2s : t1s), y2: rG.Y(v), stroke: VC, 'stroke-width': 2, 'stroke-dasharray': '3 6' }));
const rP = document.createElement('div'); rP.className = 'pillp ink'; rP.style.cssText = 'left:36px;top:490px'; rP.innerHTML = '2 × taller, 2 × wider = 4 copies: <span class="mono" style="color:#C9B6F5">10 m</span>'; $('#rr').appendChild(rP);
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Twice as fast, four times as high!' });

/* ---------- K: two angles ---------- */
const kl = $('#klS'), KLX = 110, KB = 490, KP = 16;
hatch(kl, 70, 740, KB + 14);
const KA = [[30, 0], [60, 0], [90, 0]].map(([d]) => { const r = d * Math.PI / 180, ux = U * Math.cos(r), uy = U * Math.sin(r); return { d, ux, uy, T: 2 * uy / g, H: uy * uy / 2 / g, x: u => KLX + ux * u * KP, y: u => KB - (uy * u - 0.5 * g * u * u) * KP }; });
const kTr = KA.map(() => mk(kl, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' }));
const kArc = [mk(kl, 'path', { d: arcP(KLX, KB, 70, 0, Math.PI / 6), fill: 'none', stroke: THC, 'stroke-width': 3 }), mk(kl, 'path', { d: arcP(KLX, KB, 46, 0, Math.PI / 3), fill: 'none', stroke: THC, 'stroke-width': 3 })];
const kArcL = [txt(kl, KLX + 78, KB - 10, '30°', { fill: THC, 'font-weight': 600, 'font-size': 20 }), txt(kl, KLX - 52, KB - 64, '60°', { fill: THC, 'font-weight': 600, 'font-size': 20 })];
const kGh = KA.map(() => [0, 1, 2].map(() => ball(kl, 12, 0)));
const kB = KA.map(() => ball(kl, 12));
const kTop = KA.map((a, i) => mk(kl, 'line', { x1: i === 2 ? KLX + 24 : a.x(a.T / 2) + 20, y1: KB - a.H * KP, x2: 700, y2: KB - a.H * KP, stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '4 6' }));
const kTl = KA.map(a => txt(kl, 708, KB - a.H * KP + 7, a.H.toFixed(1) + ' m', { fill: HC, 'font-weight': 600, 'font-size': 22 }));
const kSp = document.createElement('div'); kSp.className = 'pillp'; kSp.style.cssText = 'left:36px;top:70px'; kSp.innerHTML = 'same <span class="vv mono">u = 19.6 m/s</span>'; $('#kl').appendChild(kSp);
const tKl = [wt('K1', 'thirty') + 0.2, wt('K1', 'sixty') + 0.2, wt('K5', 'straight') + 0.1];
$('#krs').innerHTML = [[30, '4.9', '\\tfrac14'], [60, '14.7', '\\tfrac34']].map(([d, h, s2], i) => `<div class="sbx" id="kb${i}" style="left:${36 + i * 372}px"><div class="h">θ = ${d}°</div><div class="s">u = 19.6 m/s</div><div class="hv">${h} <span style="font-size:30px">m</span></div>
  <div class="sn">${K(`\\sin^2 ${d}^\\circ = ${s2}`)}</div></div>`).join('') +
  `<div class="fx" id="kRat" style="left:36px;top:408px;font-size:36px">${K(`\\dfrac{14.7}{4.9} = \\dfrac{3/4}{1/4} = 3`)}</div>
   <div class="pillp ac" id="k90" style="left:36px;top:500px">θ = 90°: &nbsp;${K(`\\sin^2${th_} = 1 \\;\\Rightarrow\\; ${H_} = \\dfrac{u^2}{2g} = 19.6\\,\\text{m}`).replace(/#B7791F|#7A4FE0/g, '#FFFFFF')}</div>`;
$('#k90').style.height = '72px';
const th2 = PUC.think($('#th2'), { q: 'Same speed. The angle doubled from 30° to 60°. How many times higher did the ball go?', opts: ['2 times', '3 times'], right: 1, why: `${H_} follows ${K(`\\sin^2${th_}`)}: ${K('\\tfrac34 \\div \\tfrac14 = 3')}, not ${K('60 \\div 30 = 2')}.` });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${H_} = \\dfrac{${u_}^2\\sin^2${th_}}{2${g_}}`)],
  [K(`${usin} = 28 \\times \\sin 30^\\circ = 14\\,\\text{m/s}`)],
  [K(`${H_} = \\dfrac{14^2}{2 \\times 9.8} = \\dfrac{196}{19.6}`)],
  [K(`${H_} = 10\\,\\text{m} = 4 \\times 2.5\\,\\text{m}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
const tWs = [wt('W3', 'Use'), wt('W4', 'The'), wt('W5', 'So'), wt('W6', 'That')];
const w = $('#wrS'), WB = 470, WP = 30, WXA = 220, WXB = 500;
hatch(w, 80, 740, WB + 14);
mk(w, 'line', { x1: 650, y1: WB, x2: 650, y2: WB - 10 * WP, stroke: C.ink, 'stroke-width': 2 });
[[0, '0'], [2.5, '2.5 m'], [5, '5 m'], [10, '10 m']].forEach(([m, s2]) => { mk(w, 'line', { x1: 642, y1: WB - m * WP, x2: 658, y2: WB - m * WP, stroke: C.ink, 'stroke-width': 2 }); txt(w, 668, WB - m * WP + 6, s2, { fill: m === 2.5 || m === 10 ? HC : C.mute, 'font-weight': m === 2.5 || m === 10 ? 600 : 400 }); });
const wTop = [[WXA, 2.5], [WXB, 10]].map(([x, h]) => mk(w, 'line', { x1: x + 24, y1: WB - h * WP, x2: 640, y2: WB - h * WP, stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '4 6' }));
const wBa = ball(w, 13), wBb = ball(w, 13);
const wVa = PUC.arrow(w, VC, 5, 16), wVb = PUC.arrow(w, VC, 5, 16);
const wLa = txt(w, WXA, WB + 50, '', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 }), wLb = txt(w, WXB, WB + 50, '', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 });
wLa.textContent = '14 m/s · uy = 7'; wLb.textContent = '28 m/s · uy = 14';
const wTag = document.createElement('div'); wTag.className = 'tag'; wTag.style.cssText = 'right:36px;top:22px'; wTag.innerHTML = 'SLOW-MO · 0.5x'; $('#wr').appendChild(wTag);
const wX4 = document.createElement('div'); wX4.className = 'pillp ac'; wX4.style.cssText = 'left:300px;top:100px'; wX4.innerHTML = 'height × 4'; $('#wr').appendChild(wX4);
const tWd = wt('W2', 'How') + 0.1;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Height: ${K(`${H_} = ${u_}^2\\sin 2${th_} / 2${g_}`)}`, right: `Height uses ${K(`\\sin^2${th_}`)}: ${K(`${H_} = ${u_}^2\\sin^2${th_} / 2${g_}`)}` });
const tr = $('#trS');
const trP = mk(tr, 'path', { d: 'M20,214 Q200,-74 380,214', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 7' });
const trH = mk(tr, 'path', { d: 'M200,70 h12 V214 h-12', fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const trHl = txt(tr, 222, 156, 'H: sin²θ', { fill: HC, 'font-size': 20, 'font-weight': 600 });
const trR = mk(tr, 'path', { d: 'M20,228 v8 H380 v-8', fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const trRl = txt(tr, 200, 262, 'R: sin 2θ', { 'text-anchor': 'middle', fill: C.ink, 'font-size': 22, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals and ratios: height from speed and angle, or how H changes with the angle' });
const fr = (n, d) => K(`\\dfrac{${n}}{${d}}`);
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'At its highest point, a projectile’s speed is half its launch speed u. What is its maximum height?', qW: 780,
  opts: [fr('u^2', '8g'), fr('3u^2', '8g'), fr('u^2', '4g'), fr('3u^2', '4g')], right: 1, optW: 474, optY: 300, optH: 104 });
const so = PUC.solution($('#so'), [[K(`${ucos} = \\dfrac{${u_}}{2}`)], [K(`\\cos${th_} = \\tfrac12 \\;\\Rightarrow\\; ${th_} = 60^\\circ`)], [K(`\\sin^2${th_} = \\tfrac34`)], [K(`${H_} = \\dfrac{u^2 \\cdot \\frac34}{2g} = \\dfrac{3u^2}{8g}`)]], { y0: 100, dy: 116 });
const tSo = [wt('A2', 'So'), wt('A3', 'So'), wt('A3', 'sine'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · maximum height', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${H_} = ${u_}^2\\sin^2${th_} / 2${g_} \\qquad t_{\\text{top}} = ${usin} / ${g_}`),
    `<b>At the top</b>: <span class="vv">v<sub>y</sub> = 0</span>, but <span class="vv">v = u cos θ</span>: still moving`,
    `<b>H ∝ u²</b>: 2 × speed → 4 × height &nbsp;·&nbsp; <b>H ∝ sin²θ</b>: 30° : 60° = 1 : 3`,
    `<b>Greatest at 90°</b>: <span class="vi">H = u²/2g</span> &nbsp;·&nbsp; height sin²θ, range sin 2θ`] });
const YQ = ['At the very top of the flight, what is the ball’s velocity?', 'If the launch speed triples, how many times higher does the ball go?', 'Why does the height use sin²θ, not sin 2θ?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 45', topic: 'Which angle throws the farthest? Horizontal Range', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS7 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const a0 = $('#hq0'), a1 = $('#hq1'); a1.style.left = (36 + a0.offsetWidth + 16) + 'px'; }
const trace = (path, fx, fy, u1, n = 48) => { if (u1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; for (let i = 0; i <= n; i++) { const u = u1 * i / n; d += (i ? 'L' : 'M') + fx(u).toFixed(1) + ',' + fy(u).toFixed(1); } attr(path, 'd', d); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw(el.querySelector('.ja'), t, wt('H2', 'rise') - 0.1 + i * 0.12, 0.6); M.vis(el.querySelector('.jd'), t, wt('H2', 'highest') - 0.1 + i * 0.1, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#hjP'), t, wt('H2', 'point') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.2, 1e9, { dx: -30, dy: 0 }); M.vis($('#aaF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const u = M.clamp((t - tThrow) * 0.6, 0, HT), hx = v => HLX + HVX * v * HP, hy = v => HLY - (HVY * v - 0.5 * g * v * v) * HP;
    place(hB, hx(u), hy(u)); M.hide(hB, t < tThrow - 0.4);
    hGh.forEach((gg, k) => { const gu = Math.max(0, u - 0.08 * (k + 1)); place(gg, hx(gu), hy(gu)); attr(gg, 'opacity', u > 0 && u < HT && gu > 0 ? [0.3, 0.2, 0.12][k] : 0); });
    M.draw(hPath, t, tThrow, HT / 0.6, x => x);
    M.vis(hRul, t, tH3 + 0.6, 1e9, { dy: 0 });
    hTk[2].style.opacity = M.io((t - wt('H4', 'high') + 0.1) / 0.3);
    M.draw(hBr, t, wt('H3', 'rises') - 0.1, 0.4); hBl.style.opacity = M.clamp((t - wt('H3', 'rises')) / 0.3);
    M.vis($('#hq0'), t, wt('H3', 'two') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H4', 'twice', 1) - 0.1, 1e9, POP);
    const no = M.io((t - tNo) / 0.3); $('#hq1').style.background = mix(C.ac2, C.redBg, no); $('#hq1').style.color = mix(C.ink, C.red, no);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(plPath, t, tP1 + 0.4, 1.2);
    M.vis(plTop, t, wt('P2', 'greatest') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.draw(plH, t, wt('P2', 'height') - 0.1, 0.5); plHl.style.opacity = M.clamp((t - wt('P2', 'height') - 0.3) / 0.3);
    M.vis($('#plD'), t, wt('P2', 'above') - 0.1, 1e9, POP);
    [0, 1 / 3, 2 / 3].forEach((sv, k) => { const [x, y] = pxy(sv), L = 120 * (1 - sv) * M.io((t - tVy[k] + 0.1) / 0.4); plV[k].set(x, y, x, y - L); });
    { const [x, y] = pxy(0); attr(plVl, 'x', x + 12); attr(plVl, 'y', y - 70); plVl.style.opacity = M.clamp((t - tVy[0]) / 0.3); }
    M.vis(plZ, t, wt('P5', 'zero') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const ua = M.io((t - wt('P3', 'velocity') + 0.1) / 0.5); pUa.set(PO[0], PO[1], PO[0] + (PTx - PO[0]) * ua, PO[1] + (PTy - PO[1]) * ua);
    M.vis($('#pU'), t, wt('P3', 'velocity') + 0.3, 1e9, POP); M.draw(pArc, t, wt('P3', 'velocity') + 0.3, 0.4); M.vis($('#pTh'), t, wt('P3', 'velocity') + 0.5, 1e9, POP);
    M.draw(pCx, t, wt('P3', 'cos') - 0.3, 0.4); M.vis($('#pUc'), t, wt('P3', 'cos') - 0.1, 1e9, POP);
    M.draw(pCy, t, wt('P3', 'sine') - 0.3, 0.4); M.vis($('#pUs'), t, wt('P3', 'sine') - 0.1, 1e9, POP);
    const ga = M.io((t - wt('P4', 'down') + 0.1) / 0.4); pGa.set(690, 220, 690, 220 + 130 * ga); pGl.style.opacity = ga; attr(pGl, 'x', 708); attr(pGl, 'y', 300);
    M.vis($('#pB'), t, wt('P4', 'slows') - 0.1, 1e9, POP); M.vis($('#pG'), t, wt('P4', 'leaves') - 0.1, 1e9, POP);
  }

  /* S: sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S9'), outT = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = simT(t), x = sx(u), y = sy(u);
    place(sB, x, y);
    const ua = M.io((t - wt('S1', 'sixty') + 0.2) / 0.4) * (1 - M.io((t - tA - 0.6) / 0.3));
    sU.set(LX, B0, LX + 120 * Math.cos(Math.PI / 3) * ua, B0 - 120 * Math.sin(Math.PI / 3) * ua); sUl.style.opacity = ua;
    sArc.style.opacity = M.clamp((t - wt('S1', 'sixty')) / 0.3); sArcL.style.opacity = sArc.style.opacity;
    // trail ghosts while moving
    const rate = t < tRp ? 0.5 : (t < tSlow ? 1 : 0.25);
    sTr.forEach((gg, k) => { const gu = simT(t - 0.1 * (k + 1)), mv = Math.abs(gu - u) > 0.004 && u > 0.01; place(gg, sx(gu), sy(gu)); attr(gg, 'opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    trace(sTrace, sx, sy, u);
    M.vis($('#slow'), t, tSlow - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
    // vectors in the replay: v_x, v_y (shrinking) and g
    const va = M.io((t - tRp - 0.1) / 0.5), vy = UY - g * u, K6 = 6;
    sVx.set(x, y, x + UX * K6 * va, y); attr(sVxl, 'x', (x + UX * K6 * va + 8).toFixed(1)); attr(sVxl, 'y', (y + 8).toFixed(1)); sVxl.style.opacity = va;
    sVy.set(x, y, x, y - vy * K6 * va); attr(sVyl, 'x', (x - 46).toFixed(1)); attr(sVyl, 'y', (y - Math.max(24, vy * K6 * 0.6) * va).toFixed(1)); sVyl.style.opacity = va * M.clamp(vy / 3);
    sG.set(x - 34, y + 6, x - 34, y + 6 + 56 * va); attr(sGl, 'x', (x - 66).toFixed(1)); attr(sGl, 'y', (y + 52).toFixed(1)); sGl.style.opacity = va;
    void rate;
    // ghost copies at equal time steps up to the top
    sGh.forEach((gg, k) => { place(gg, sx(GK[k]), sy(GK[k])); attr(gg, 'opacity', (0.28 * M.io((t - wt('S7', 'ghost') - 0.1 - k * 0.15) / 0.3)).toFixed(3)); });
    sBr.forEach((p, k) => { const tt = wt('S7', 'smaller') - 0.9 + k * 0.3; M.draw(p, t, tt, 0.35); sBl[k].style.opacity = M.clamp((t - tt - 0.2) / 0.3); });
    M.draw(sH, t, wt('S8', 'fourteen') - 0.2, 0.4); M.vis(sHl, t, wt('S8', 'fourteen'), 1e9, POP);
    // readout (time rounded first, values computed from it)
    const tr2 = Math.round(u * 100) / 100;
    M.setT($('#rt'), tr2.toFixed(2)); M.setT($('#rvy'), sgn(UY - g * tr2)); M.setT($('#ry'), Math.max(0, yv(tr2)).toFixed(1));
    PUC.write($('#roF1'), t, wt('S2', 'horizontal') - 0.1, 0.7); PUC.write($('#roF2'), t, wt('S3', 'drops') - 0.1, 0.8);
    const first = Math.min(TL, Math.max(0, (Math.min(t, tRp) - tA) * 0.5));
    sCv(k => [k, UY - g * k], 0, first); sDt(u, UY - g * u, t > tA - 0.3);
    const zt = wt('S4', 'zero') - 0.1; sZ.style.opacity = M.clamp((t - zt) / 0.3); sZl.style.opacity = sZ.style.opacity;
    sTri.style.opacity = M.clamp((t - wt('S8', 'shaded') + 0.1) / 0.4); sAr.style.opacity = M.clamp((t - wt('S8', 'triangle')) / 0.3);
    M.vis($('#th1'), t, tS9 + 0.05, outT, { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'is') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: T0('S10') - 0.02, tWhy: wt('S10', 'Only') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = (t > tStep[3] - 0.1 ? 140 : 108) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u = dT(t), x = dx(u), y = dy(u), vy = UY - g * u;
    place(dB, x, y); attr(dSh, 'cy', y.toFixed(1)); attr(dLink, 'x2', x.toFixed(1)); attr(dLink, 'y1', y.toFixed(1)); attr(dLink, 'y2', y.toFixed(1));
    const va = M.io((t - tDrun + 0.3) / 0.4); dVy.set(DAX, y, DAX, y - vy * 5 * va); attr(dVyl, 'x', DAX - 44); attr(dVyl, 'y', (y - vy * 2.5 + 8).toFixed(1)); dVyl.style.opacity = va * M.clamp(vy / 3);
    dZ.style.opacity = M.clamp((t - wt('D3', 'zero') + 0.1) / 0.3);
    M.draw(dH, t, wt('D4', 'H') - 0.2, 0.4); dHl.style.opacity = M.clamp((t - wt('D4', 'H')) / 0.3);
    M.vis($('#dU'), t, wt('D5', 'units') - 0.1, 1e9, POP); M.vis($('#dT'), t, wt('D6', 'time') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxw = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sxw ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'At') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'still') - 0.2, 0.8);
  }

  /* R: link by link */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.15, 1e9, { dx: -24, dy: 0 }); M.vis(el.querySelector('.lm'), t, tLk[i] + 0.4, 1e9, POP); const on = i === 3 ? M.io((t - tLk[3]) / 0.3) : 0; el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    M.draw(rL1, t, tR1 + 0.9, 0.5); rT1.style.opacity = M.clamp((t - tR1 - 1.2) / 0.4); rA1.style.opacity = rT1.style.opacity; rL1t.style.opacity = M.clamp((t - tR1 - 1.0) / 0.3);
    M.draw(rL2, t, tLk[0], 0.6); rL2t.style.opacity = M.clamp((t - tLk[0] - 0.4) / 0.3);
    rBase.style.opacity = M.clamp((t - tLk[1] - 0.2) / 0.3);
    rAvg.forEach((l, k) => l.style.opacity = M.clamp((t - tLk[2] - 0.2) / 0.3) * (1 - M.clamp((t - tLk[3] + 0.3) / 0.3)));
    rT2.style.opacity = M.clamp((t - tLk[3] + 0.1) / 0.4); M.draw(rMid, t, tLk[3] + 0.1, 0.6);
    M.vis(rP, t, wt('R5', 'height') - 0.1, 1e9, POP);
    avA(t, wt('R5', 'squared') + 0.3, out);
  }

  /* K: two angles + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const late = t >= T0('K4') + 1.6;
    const tin = late ? T0('K4') + 1.7 : tK1 + 0.1, tout = late ? OUT('W1') : OUT('K3');
    M.vis($('#kl'), t, tin, tout, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#kr'), t, late ? tin + 0.15 : tK1 + 0.3, tout, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    KA.forEach((a, i) => {
      const u = M.clamp(t - tKl[i], 0, i === 2 ? a.T / 2 : a.T);
      place(kB[i], a.x(u), a.y(u)); M.hide(kB[i], t < tKl[i] - 0.5);
      kGh[i].forEach((gg, k) => { const gu = Math.max(0, u - 0.09 * (k + 1)); place(gg, a.x(gu), a.y(gu)); attr(gg, 'opacity', u > 0.02 && u < (i === 2 ? a.T / 2 : a.T) && gu > 0 ? [0.3, 0.2, 0.12][k] : 0); });
      trace(kTr[i], a.x, a.y, u);
      const tl = i < 2 ? wt('K2', i ? 'fourteen' : 'four') - 0.1 : wt('K5', 'nineteen') - 0.1;
      M.draw(kTop[i], t, tl, 0.4); kTl[i].style.opacity = M.clamp((t - tl - 0.2) / 0.3);
    });
    kArc.forEach((p, i) => { p.style.opacity = M.clamp((t - tKl[i] + 0.4) / 0.3); kArcL[i].style.opacity = p.style.opacity; });
    [0, 1].forEach(i => { const el = $('#kb' + i); M.vis(el, t, wt('K1', 'speed') + i * 0.15, 1e9, { dy: 20 }); M.vis(el.querySelector('.hv'), t, wt('K2', i ? 'fourteen' : 'four') - 0.1, 1e9, POP); M.vis(el.querySelector('.sn'), t, late ? tin + 0.3 + i * 0.15 : 1e9, 1e9, POP); });
    M.vis($('#kRat'), t, late ? tin + 0.7 : 1e9, 1e9, { dy: 10 });
    M.vis(kSp, t, wt('K1', 'Same') - 0.1, 1e9, POP);
    M.vis($('#k90'), t, wt('K5', 'greatest') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tK3 + 0.05, T0('K4') + 1.5, { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'How') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'H') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wTag, t, tWd - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
    const su = Math.max(0, (t - tWd) * 0.5), ua = Math.min(7 / g, su), ub = Math.min(14 / g, su);
    const ya = WB - (7 * ua - 0.5 * g * ua * ua) * WP, yb = WB - (14 * ub - 0.5 * g * ub * ub) * WP;
    place(wBa, WXA, ya); place(wBb, WXB, yb);
    wVa.set(WXA + 26, ya, WXA + 26, ya - (7 - g * ua) * 7); wVb.set(WXB + 26, yb, WXB + 26, yb - (14 - g * ub) * 7);
    M.draw(wTop[0], t, tWd + 2 * 7 / g, 0.3); M.draw(wTop[1], t, tWd + 2 * 14 / g, 0.3);
    M.vis(wX4, t, wt('W6', 'Four') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: T0('X3') - 0.05, tRight: wt('X3', 'Height') - 0.1 });
    M.draw(trP, t, wt('X2', 'mix') - 0.1, 0.8);
    M.draw(trR, t, wt('X3', 'range') - 0.2, 0.4); trRl.style.opacity = M.clamp((t - wt('X3', 'range')) / 0.3);
    M.draw(trH, t, wt('X3', 'Height') - 0.1, 0.4); trHl.style.opacity = M.clamp((t - wt('X3', 'Height') - 0.1) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
