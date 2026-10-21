// PUC Physics Ep 45: Horizontal range (Motion notebook: launch at 45 degrees, x-t graph, angle sweep with R-theta graph)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, VY = C.violet, GC = C.red, RC = C.violet, THC = C.gold, TC = C.ink;   // v, v_x blue; v_y violet; R / x violet; g red; theta gold; t ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, s, col, fs = 28, sub) => { const e = txt(p, x, y, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }); if (sub) { const ts = mk(e, 'tspan', { 'font-size': fs * 0.62, dy: fs * 0.22 }); ts.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const g = 9.8, U = 14, D2R = Math.PI / 180;
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const u_ = c(VC, 'u'), g_ = c(GC, 'g'), R_ = c(RC, 'R'), th_ = c(THC, '\\theta'), vx_ = c(VC, 'v_x'), x_ = c(RC, 'x');
const usin = `${c(VY, 'u\\sin')}${th_}`, ucos = `${u_}\\cos${th_}`;
const ball = (p, r, op = 1) => { const og = mk(p, 'g', { opacity: op }); mk(og, 'circle', { cx: 0, cy: 0, r, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 }); return og; };
const place = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const sgn = v => (v >= 0.05 ? '+' : v <= -0.05 ? '−' : '') + Math.abs(v).toFixed(1);
const arcP = (cx, cy, r, a0, a1) => `M${(cx + r * Math.cos(a0)).toFixed(1)},${(cy - r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 0 ${(cx + r * Math.cos(a1)).toFixed(1)},${(cy - r * Math.sin(a1)).toFixed(1)}`;
const hatch = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const trace = (path, fx, fy, u1, n = 48) => { if (u1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; for (let i = 0; i <= n; i++) { const u = u1 * i / n; d += (i ? 'L' : 'M') + fx(u).toFixed(1) + ',' + fy(u).toFixed(1); } attr(path, 'd', d); };
// a launch at angle deg, speed U, from (lx, b0) with px per metre sp
const shot = (deg, lx, b0, sp, u = U) => { const ux = u * Math.cos(deg * D2R), uy = u * Math.sin(deg * D2R); return { deg, ux, uy, T: 2 * uy / g, R: 2 * ux * uy / g, H: uy * uy / 2 / g, x: t => lx + ux * t * sp, y: t => b0 - (uy * t - 0.5 * g * t * t) * sp }; };
const ruler = (p, x0, y, sp, mmax, step) => { mk(p, 'line', { x1: x0, y1: y, x2: x0 + mmax * sp, y2: y, stroke: C.ink, 'stroke-width': 2 }); for (let m = 0; m <= mmax + 1e-6; m += step) { mk(p, 'line', { x1: x0 + m * sp, y1: y - 6, x2: x0 + m * sp, y2: y + 6, stroke: C.ink, 'stroke-width': 2 }); txt(p, x0 + m * sp, y + 28, m, { 'text-anchor': 'middle' }); } txt(p, x0 + mmax * sp + 22, y + 28, 'm'); };

Object.assign(M.IC, {
  shot: ['M12 4a8 8 0 1 0 0.01 0', 'M9 9a3 3 0 0 1 3-2'],
  jump: ['M3 20h18', 'M4 20c2.5-12 11.5-12 15 0', 'M11.5 6.5a1.5 1.5 0 1 0 0.01 0'],
  throwA: ['M3 19c4-12 12-14 18-8', 'M17 9l4 2-1 4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP3 = T0('P3'), tP4 = T0('P4');
const tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1');
const tG1 = T0('G1'), tG4 = T0('G4'), tK1 = T0('K1'), tK3 = T0('K3'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three throws ---------- */
const JOBS = [['shot', 'Shot put', 'ATHLETE', 'shot'], ['jump', 'Long jump', 'SAND PIT', 'long'], ['throwA', 'Fielder’s throw', 'FROM THE BOUNDARY', 'fielder']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg class="jv" width="150" height="84"><path class="ja" d="M10,64 Q75,-24 140,64" fill="none" stroke="${C.ink2}" stroke-width="3" stroke-dasharray="5 7" stroke-linecap="round"/><path class="jb" d="M10,70 v8 H140 v-8" fill="none" stroke="${RC}" stroke-width="3" stroke-linecap="round"/></svg></div>`).join('');
const hk = $('#hkS'), HLX = 250, HLY = 400, HP = 22;
hatch(hk, 36, 748, 430);
ruler(hk, HLX, 456, HP, 20, 5);
const hA = [15, 75].map(d => PUC.arrow(hk, VC, 6, 18));
const hArc = [mk(hk, 'path', { d: arcP(HLX, HLY, 90, 0, 15 * D2R), fill: 'none', stroke: THC, 'stroke-width': 3 }), mk(hk, 'path', { d: arcP(HLX, HLY, 46, 0, 75 * D2R), fill: 'none', stroke: THC, 'stroke-width': 3 })];
const hArcL = [txt(hk, HLX + 98, HLY - 6, '15°', { fill: THC, 'font-weight': 600, 'font-size': 20 }), txt(hk, HLX - 6, HLY - 64, '75°', { fill: THC, 'font-weight': 600, 'font-size': 20 })];
const hUl = txt(hk, HLX + 150, HLY - 150, 'same u = 14 m/s', { fill: VC, 'font-weight': 600, 'font-size': 20 });
const hQ = txt(hk, 560, 360, '?', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 72, fill: C.ac, 'text-anchor': 'middle' });
const tA30 = wt('H3', 'fifteen'), tA60 = wt('H3', 'seventy');

/* ---------- P ---------- */
const pl = $('#plS'), PLX = 100, PLY = 400, PR = 560, PH = 250;
const pxy = s => [PLX + PR * s / 2, PLY - PH * (2 * s - s * s)];
mk(pl, 'line', { x1: 60, y1: PLY, x2: 724, y2: PLY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
txt(pl, 724, PLY + 46, 'LAUNCH LEVEL', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 2 });
const plPath = mk(pl, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 50; i++) { const [x, y] = pxy(2 * i / 50); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; })(), fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 8' });
mk(pl, 'circle', { cx: PLX, cy: PLY, r: 7, fill: C.ink });
const plEnd = mk(pl, 'g', {}); mk(plEnd, 'circle', { cx: PLX + PR, cy: PLY - 13, r: 13, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 });
const plR = mk(pl, 'path', { d: `M${PLX},${PLY + 14} v12 H${PLX + PR} v-12`, fill: 'none', stroke: RC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const plRl = sym(pl, PLX + PR / 2 - 10, PLY + 66, 'R', RC, 36);
const plV = [0, 0.5, 1, 1.5].map(() => PUC.arrow(pl, VC, 5, 15));
const plVl = sym(pl, 0, 0, 'v', VC, 24, 'x');
const pr = $('#prS'), PO = [110, 470], PU = 300, PA = 50 * D2R, PTx = PO[0] + PU * Math.cos(PA), PTy = PO[1] - PU * Math.sin(PA);
const pUa = PUC.arrow(pr, VC, 7, 22), pCx = mk(pr, 'line', { x1: PO[0], y1: PO[1], x2: PTx, y2: PO[1], stroke: VC, 'stroke-width': 4, 'stroke-dasharray': '10 8' }), pCy = mk(pr, 'line', { x1: PTx, y1: PO[1], x2: PTx, y2: PTy, stroke: VY, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const pArc = mk(pr, 'path', { d: arcP(PO[0], PO[1], 64, 0, PA), fill: 'none', stroke: THC, 'stroke-width': 3 });
$('#pU').innerHTML = K(u_); $('#pUc').innerHTML = K(ucos); $('#pUs').innerHTML = K(usin); $('#pTh').innerHTML = K(th_);
const setP = (id, l, t) => { const e = $(id); e.style.left = l + 'px'; e.style.top = t + 'px'; };
setP('#pU', 160, 300); setP('#pUc', 150, 492); setP('#pUs', PTx + 18, 330); setP('#pTh', 186, 410); setP('#pG', PTx + 30, 446);
$('#pF').innerHTML = K(`${R_} = (${ucos}) \\times \\text{time in air}`);

/* ---------- S: launch sim ---------- */
const s = $('#simS'), LX = 80, B0 = 430, SP = 30, S45 = shot(45, LX, B0, SP), TT = S45.T, TL = 2.02, UX = S45.ux, UY = S45.uy;   // T = 2.02 s, R = 20 m
const sx = S45.x, sy = S45.y, yv = u => UY * u - 0.5 * g * u * u;
hatch(s, 50, 750, B0 + 14);
ruler(s, LX, B0 + 70, SP, 20, 5);
const sTrace = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' });
const sU = PUC.arrow(s, VC, 6, 18), sUl = sym(s, LX + 64, B0 - 96, 'u', VC, 28);
const sArc = mk(s, 'path', { d: arcP(LX, B0, 50, 0, Math.PI / 4), fill: 'none', stroke: THC, 'stroke-width': 3 });
const sArcL = txt(s, LX + 58, B0 - 12, '45°', { fill: THC, 'font-weight': 600, 'font-size': 20 });
const GK = [0, 1, 2, 3, 4].map(k => k * TT / 4);
const sGh = GK.map(() => ball(s, 14, 0));
const sDrop = GK.map(k => mk(s, 'line', { x1: sx(k), y1: sy(k) + 16, x2: sx(k), y2: B0 + 58, stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '4 6' }));
const sStep = [0, 1, 2, 3].map(k => txt(s, (sx(GK[k]) + sx(GK[k + 1])) / 2, B0 + 52, '5 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 600, 'font-size': 20 }));
const sTr = [0, 1, 2].map(() => ball(s, 14, 0));
const sB = ball(s, 14);
const sVx = PUC.arrow(s, VC, 6, 18), sVy = PUC.arrow(s, VY, 6, 18), sG = PUC.arrow(s, GC, 6, 18);
const sVxl = sym(s, 0, 0, 'v', VC, 26, 'x'), sVyl = sym(s, 0, 0, 'v', VY, 26, 'y'), sGl = sym(s, 0, 0, 'g', GC, 28);
const sR = mk(s, 'line', { x1: LX, y1: B0 + 70, x2: LX + 20 * SP, y2: B0 + 70, stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const sRp = document.createElement('div'); sRp.className = 'pillp'; sRp.style.cssText = `left:520px;top:110px;color:${RC}`; sRp.innerHTML = '<span class="mono">R = 20 m</span>'; $('#sim').appendChild(sRp);
const sF = document.createElement('div'); sF.className = 'pillp ink'; sF.style.cssText = 'left:36px;top:70px;height:64px'; sF.innerHTML = K(`R = v_x \\times T = 9.9 \\times 2.02 = 20\\,\\text{m}`); $('#sim').appendChild(sF);
$('#roG').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>x</sub></span><span class="v" id="rvx" style="color:${VC}">9.9</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" id="rvy" style="color:${VY}">+9.9</span><span class="u">m/s</span>
  <span class="k" style="color:${RC}">x</span><span class="v" id="rx" style="color:${RC}">0.0</span><span class="u">m</span>`;
$('#roF1').innerHTML = K(`${vx_} = ${ucos}`); $('#roF2').innerHTML = K(`${x_} = (${ucos})\\,t`);
const sGr = PUC.graph($('#grS'), { x: 110, y: 70, w: 560, h: 160, xmax: 2.3, ymin: 0, ymax: 22, xt: [0, 1, 2], yt: [0, 10, 20] });
txt($('#grS'), 690, 236, 't (s)'); txt($('#grS'), 122, 66, 'x (m)', { fill: RC, 'font-weight': 600 });
const sCv = sGr.curve(RC), sDt = sGr.dot(C.ink);
const sTm = sGr.mk('path', { d: `M${sGr.X(0)},${sGr.Y(20)} H${sGr.X(TT)} V${sGr.Y(0)}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const sTl = sGr.mk('text', { x: sGr.X(TT) - 8, y: sGr.Y(20) - 12, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: RC, 'font-weight': 600 }); sTl.textContent = 'lands: T = 2.02 s, R = 20 m';
const tA = wt('S2', 'readout') - 0.1, tRp = tS5 - 0.1, tSlow = tRp + 0.5;
const simT = t => { if (t < tRp) return M.clamp((t - tA) * 0.4, 0, TL); const d = t - tRp; return d < 0.5 ? d : Math.min(TT / 2, 0.5 + (d - 0.5) * 0.25); };

/* ---------- D ---------- */
const STEPS = [[`T = \\dfrac{2\\,${usin}}{${g_}}`, 'time up + time down, each u sin θ / g', 1],
  [`${R_} = ${ucos} \\times \\dfrac{2\\,${usin}}{${g_}}`, 'speed across × time in air', 1],
  [`2\\sin${th_}\\cos${th_} = \\sin 2${th_}`, 'a trigonometry identity', 0],
  [`${R_} = \\dfrac{${u_}^2 \\sin 2${th_}}{${g_}}`, 'the horizontal range', 1]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w, tall], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 124}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:${tall ? 84 : 56}px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dG = PUC.graph($('#drS'), { x: 120, y: 110, w: 540, h: 280, xmax: 2.4, ymin: 0, ymax: 12, xt: [0, 1, 2], yt: [0, 9.9] });
txt($('#drS'), 680, 422, 't (s)', { 'text-anchor': 'end' }); txt($('#drS'), 132, 104, 'vx (m/s)', { fill: VC, 'font-weight': 600 });
const dRect = dG.mk('rect', { x: dG.X(0), y: dG.Y(UX), width: dG.X(TT) - dG.X(0), height: dG.Y(0) - dG.Y(UX), fill: RC, 'fill-opacity': 0.2, stroke: 'none' });
const dLine = dG.mk('path', { d: `M${dG.X(0)},${dG.Y(UX)} H${dG.X(TT)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const dEnd = dG.mk('path', { d: `M${dG.X(TT)},${dG.Y(UX)} V${dG.Y(0)}`, stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 6', fill: 'none' });
const dTl = dG.mk('text', { x: dG.X(TT), y: dG.Y(0) + 54, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: TC, 'font-weight': 600 }); dTl.textContent = 'T = 2.02 s';
const dVl = dG.mk('text', { x: dG.X(0.08), y: dG.Y(UX) - 14, 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: VC, 'font-weight': 600 }); dVl.textContent = 'vx = u cos θ = 9.9 m/s';
const dAl = dG.mk('text', { x: (dG.X(0) + dG.X(TT)) / 2, y: dG.Y(UX / 2) + 8, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 22, fill: RC, 'font-weight': 600 }); dAl.textContent = 'area = 9.9 × 2.02 = 20 m = R';
$('#dU').innerHTML = `unit: &nbsp;${K('\\dfrac{(\\text{m/s})^2}{\\text{m/s}^2} = \\text{m}')}`; $('#dU').style.height = '64px';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${R_} = (${ucos}) \\times T`);

/* ---------- G: many angles ---------- */
const gl = $('#glS'), GLX = 80, GB = 470, GP = 30;
hatch(gl, 50, 750, GB + 14);
ruler(gl, GLX, GB + 56, GP, 20, 5);
const GA = [15, 75, 45].map(d => shot(d, GLX, GB, GP));
const gTr = GA.map(() => mk(gl, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' }));
const gGh = GA.map(() => [0, 1, 2].map(() => ball(gl, 12, 0)));
const gB = GA.map(() => ball(gl, 12));
const gL = GA.map(a => txt(gl, a.x(a.T / 2) + (a.deg === 75 ? 18 : 0), a.y(a.T / 2) - 20, a.deg + '°', { 'text-anchor': a.deg === 75 ? 'start' : 'middle', fill: THC, 'font-weight': 600, 'font-size': 20 }));
const gLand = GA.map(a => txt(gl, a.x(a.T), GB - 30, a.R.toFixed(0) + ' m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 600, 'font-size': 20 }));
const tG5back = wt('G5', 'across') + 0.4;
const tGl = [wt('G2', 'Fifteen') + 0.1, wt('G3', 'Seventy') + 0.1, wt('G5', 'Sine') - 0.1];
const g2 = $('#g2S'), gG = PUC.graph(g2, { x: 120, y: 100, w: 560, h: 320, xmax: 90, ymin: 0, ymax: 23, xt: [0, 15, 30, 45, 60, 75, 90], yt: [0, 10, 17.3, 20] });
txt(g2, 690, 482, 'θ (°)', { 'text-anchor': 'end' }); txt(g2, 132, 94, 'R (m)', { fill: RC, 'font-weight': 600 });
const gCv = gG.curve(RC);
const gDots = GA.map(a => gG.mk('circle', { cx: gG.X(a.deg), cy: gG.Y(a.R), r: 11, fill: C.ink }));
const gSym = [[15, 75, 10], [30, 60, 17.32]].map(([a, b, r]) => gG.mk('path', { d: `M${gG.X(a)},${gG.Y(r)} H${gG.X(b)}`, stroke: THC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6', fill: 'none' }));
const gSymD = [30, 60].map(a => gG.mk('circle', { cx: gG.X(a), cy: gG.Y(17.32), r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }));
const gPk = document.createElement('div'); gPk.className = 'pillp ac'; gPk.style.cssText = 'left:36px;top:490px;height:64px'; gPk.innerHTML = `45°: &nbsp;${K('\\sin 90^\\circ = 1 \\;\\Rightarrow\\; R = \\dfrac{u^2}{g} = 20\\,\\text{m}')}`; $('#gr2').appendChild(gPk);
const th1 = PUC.think($('#th1'), { q: 'Same speed. Which angle between 15° and 75° goes the farthest?', opts: ['30°', '45°', '60°'], right: 1, why: 'Speed shared equally: sin 2θ = sin 90° = 1, the most it can be.' });

/* ---------- K: 30 vs 60 ---------- */
const kl = $('#klS'), KLX = 80, KB = 470, KP = 30;
hatch(kl, 50, 750, KB + 14);
ruler(kl, KLX, KB + 56, KP, 20, 5);
const KA = [20, 70].map(d => shot(d, KLX, KB, KP));
const kTr = KA.map(() => mk(kl, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' }));
const kGh = KA.map(() => [0, 1, 2].map(() => ball(kl, 12, 0)));
const kB = KA.map(() => ball(kl, 12));
const kL = KA.map(a => txt(kl, a.x(a.T / 2), a.y(a.T / 2) - 22, a.deg + '°', { 'text-anchor': 'middle', fill: THC, 'font-weight': 600, 'font-size': 20 }));
const kV = KA.map(() => PUC.arrow(kl, VC, 6, 18));
const kRing = mk(kl, 'circle', { cx: KA[0].x(KA[0].T), cy: KB, r: 22, fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const kRl = txt(kl, KA[0].x(KA[0].T), KB - 44, '12.9 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 600, 'font-size': 22 });
const tKl = [wt('K1', 'Twenty') + 0.1, wt('K1', 'seventy') + 0.1];
const KBX = [[20, '13.2', '0.98'], [70, '4.8', '2.68']];
$('#krs').innerHTML = KBX.map(([d, vx, T], i) => `<div class="sbx" id="kb${i}" style="left:${36 + i * 372}px;height:310px"><div class="h">θ = ${d}°</div><div class="s">u = 14 m/s</div>
  <div class="fx kv" style="left:24px;top:100px;font-size:30px">${K(`${vx_} = ${vx}\\,\\text{m/s}`)}</div>
  <div class="fx kt" style="left:24px;top:150px;font-size:30px">${K(`T = ${T}\\,\\text{s}`)}</div>
  <div class="hv kr" style="top:212px;font-size:52px">12.9 <span style="font-size:28px">m</span></div></div>`).join('') +
  `<div class="fx" id="kRat" style="left:36px;top:412px;font-size:34px">${K(`\\sin 40^\\circ = \\sin 140^\\circ \\;\\Rightarrow\\; \\text{same } ${R_}`)}</div>`;
const th2 = PUC.think($('#th2'), { q: 'Same speed, 14 m/s. Thrown at 20° and at 70°. Which one lands farther?', opts: ['20°', '70°', 'Same spot'], right: 2, why: 'sin 40° = sin 140°: angles adding to 90° share a range.' });
const avA = PUC.avatar($('#sK'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the two angles just add up to 90°!' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${R_} = \\dfrac{${u_}^2\\sin 2${th_}}{${g_}}`)],
  [K(`${u_}^2 = 196,\\;\\; 2${th_} = 30^\\circ,\\;\\; \\sin 30^\\circ = \\tfrac12`)],
  [K(`${R_} = \\dfrac{196 \\times 0.5}{9.8}`)],
  [K(`${R_} = 10\\,\\text{m}\\;\\; (\\text{same at } 75^\\circ)`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
const tWs = [wt('W3', 'Use'), wt('W4', 'u'), wt('W5', 'So'), wt('W6', 'That')];
const w = $('#wrS'), WLX = 80, WB = 440, WP = 30;
hatch(w, 50, 750, WB + 14);
ruler(w, WLX, WB + 56, WP, 20, 5);
const WA = [15, 75].map(d => shot(d, WLX, WB, WP));
const wTr = WA.map(() => mk(w, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' }));
const wGh = WA.map(() => [0, 1, 2].map(() => ball(w, 12, 0)));
const wB = WA.map(() => ball(w, 12));
const wL = WA.map(a => txt(w, a.x(a.T / 2), a.y(a.T / 2) - 22, a.deg + '°', { 'text-anchor': 'middle', fill: THC, 'font-weight': 600, 'font-size': 20 }));
const wRb = mk(w, 'line', { x1: WLX, y1: WB + 56, x2: WLX + WA[0].R * WP, y2: WB + 56, stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const wRl = document.createElement('div'); wRl.className = 'pillp'; wRl.style.cssText = `left:${WLX + WA[0].R * WP - 230}px;top:110px;color:${RC}`; wRl.innerHTML = '<span class="mono">R = 10 m · both throws</span>'; $('#wr').appendChild(wRl);
const wTag = document.createElement('div'); wTag.className = 'tag'; wTag.style.cssText = 'right:36px;top:22px'; wTag.innerHTML = 'SLOW-MO · 0.5x'; $('#wr').appendChild(wTag);
const tWd = [wt('W2', 'How'), wt('W2', 'How') + 3.0];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${R_} = ${ucos} \\times ${usin} / ${g_}`)} &nbsp;(time to the top only)`, right: `${K(`${R_} = ${ucos} \\times 2${usin} / ${g_}`)} &nbsp;(the whole flight)` });
const tr = $('#trS');
const trP = mk(tr, 'path', { d: 'M20,200 Q200,-60 380,200', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 7' });
const trH = mk(tr, 'path', { d: 'M20,214 v8 H200 v-8', fill: 'none', stroke: C.red, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const trHl = txt(tr, 110, 206, 'R/2 ✗', { 'text-anchor': 'middle', fill: C.red, 'font-size': 22, 'font-weight': 600 });
const trR = mk(tr, 'path', { d: 'M20,232 v8 H380 v-8', fill: 'none', stroke: RC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const trRl = txt(tr, 200, 266, 'R ✓', { 'text-anchor': 'middle', fill: C.ok, 'font-size': 22, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: range for a speed and angle, the best angle, two angles with one range' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Thrown at one speed, a ball lands at the same spot for two angles. Its times of flight are 2 s and 3 s. Find the range (g&nbsp;=&nbsp;10&nbsp;m/s²).', qW: 780,
  opts: ['15 m', '30 m', '60 m', '25 m'], right: 1, optW: 474, optY: 340 });
const so = PUC.solution($('#so'), [[K(`${th_}_1 = ${th_},\\;\\; ${th_}_2 = 90^\\circ - ${th_}`)], [K(`T_1 = \\dfrac{2u\\sin${th_}}{g},\\; T_2 = \\dfrac{2u\\cos${th_}}{g}`)], [K(`T_1T_2 = \\dfrac{2}{g}\\cdot\\dfrac{u^2\\sin 2${th_}}{g} = \\dfrac{2${R_}}{g}`)], [K(`${R_} = \\dfrac{gT_1T_2}{2} = \\dfrac{10 \\times 6}{2} = 30\\,\\text{m}`)]], { y0: 100, dy: 116 });
const tSo = [wt('A2', 'same'), T0('A3'), wt('A4', 'Multiply'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · horizontal range', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${R_} = ${u_}^2\\sin 2${th_} / ${g_} \\qquad T = 2${usin} / ${g_}`),
    `<b>Range</b> = <span class="vv">speed across</span> × time in air: <span class="vi">R</span> = <span class="vv">u cos θ</span> × T`,
    `<b>Greatest at 45°</b>: <span class="vi">R = u²/g</span> &nbsp;·&nbsp; θ and 90° − θ share a range`,
    `<b>Trap</b>: use the whole flight, up + down, not just the time to the top`] });
const YQ = ['Why does 45° give the greatest range?', 'Which angle has the same range as 35°?', 'If g were half as big, how far would the same throw go?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 46', topic: 'Steady speed, yet accelerating? Uniform Circular Motion', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS7 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; ['#hq0', '#hq1', '#hq2'].forEach(id => { const e = $(id); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const fly = (a, bl, gh, tr2, t, t0, rate = 1) => { const u = M.clamp((t - t0) * rate, 0, a.T); place(bl, a.x(u), a.y(u)); M.hide(bl, t < t0 - 0.4); gh.forEach((gg, k) => { const gu = Math.max(0, u - 0.09 * (k + 1)); place(gg, a.x(gu), a.y(gu)); attr(gg, 'opacity', u > 0.02 && u < a.T && gu > 0 ? [0.3, 0.2, 0.12][k] : 0); }); trace(tr2, a.x, a.y, u); return u; };

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw(el.querySelector('.ja'), t, wt('H2', 'land') - 0.3 + i * 0.12, 0.6); M.draw(el.querySelector('.jb'), t, wt('H2', 'far') - 0.1 + i * 0.12, 0.4); });
    M.vis($('#hjP'), t, wt('H2', 'possible') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.2, 1e9, { dx: -30, dy: 0 }); M.vis($('#aaF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    [15, 75].forEach((d, i) => { const ua = M.io((t - (i ? tA60 : tA30) + 0.1) / 0.45), L = 170 * ua; hA[i].set(HLX, HLY, HLX + L * Math.cos(d * D2R), HLY - L * Math.sin(d * D2R)); hArc[i].style.opacity = M.clamp((t - (i ? tA60 : tA30)) / 0.3); hArcL[i].style.opacity = hArc[i].style.opacity; });
    hUl.style.opacity = M.clamp((t - tA60 - 0.4) / 0.3);
    hQ.style.opacity = M.clamp((t - wt('H4', 'farther') + 0.2) / 0.3);
    M.vis($('#hq0'), t, wt('H4', 'flat') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H4', 'high') - 0.1, 1e9, POP); M.vis($('#hq2'), t, wt('H4', 'which') - 0.1, 1e9, POP);
    const nw = M.io((t - wt('H5', 'neither')) / 0.3); $('#hq2').style.background = mix(C.ac2, C.okBg, nw);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(plPath, t, tP1 + 0.4, 1.2);
    plEnd.style.opacity = M.clamp((t - wt('P2', 'back') + 0.1) / 0.25);
    M.draw(plR, t, wt('P2', 'horizontal') - 0.1, 0.6); plRl.style.opacity = M.clamp((t - wt('P2', 'distance')) / 0.3);
    M.vis($('#plD'), t, wt('P2', 'launch') - 0.2, 1e9, POP);
    [0, 0.5, 1, 1.5].forEach((sv, k) => { const [x, y] = pxy(sv), L = 70 * M.io((t - wt('P3', 'never') - k * 0.12) / 0.4); plV[k].set(x + 10, y, x + 10 + L, y); });
    { const [x, y] = pxy(0); attr(plVl, 'x', x + 30); attr(plVl, 'y', y - 14); plVl.style.opacity = M.clamp((t - wt('P3', 'never')) / 0.3); }
    M.vis($('#pr'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const ua = M.io((t - wt('P3', 'velocity') + 0.2) / 0.5); pUa.set(PO[0], PO[1], PO[0] + (PTx - PO[0]) * ua, PO[1] + (PTy - PO[1]) * ua);
    M.vis($('#pU'), t, wt('P3', 'velocity'), 1e9, POP); M.draw(pArc, t, wt('P3', 'velocity'), 0.4); M.vis($('#pTh'), t, wt('P3', 'velocity') + 0.2, 1e9, POP);
    M.draw(pCx, t, wt('P3', 'u') - 0.2, 0.4); M.vis($('#pUc'), t, wt('P3', 'cos') - 0.1, 1e9, POP);
    M.draw(pCy, t, wt('P3', 'u') + 0.3, 0.4); M.vis($('#pUs'), t, wt('P3', 'u') + 0.5, 1e9, POP);
    M.vis($('#pG'), t, wt('P3', 'forward') - 0.1, 1e9, POP);
    PUC.write($('#pF'), t, wt('P4', 'horizontal') - 0.2, 0.9);
  }

  /* S: sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = simT(t), x = sx(u), y = sy(u);
    place(sB, x, y);
    const ua = M.io((t - wt('S1', 'forty') + 0.2) / 0.4) * (1 - M.io((t - tA - 0.6) / 0.3));
    sU.set(LX, B0, LX + 120 * Math.SQRT1_2 * ua, B0 - 120 * Math.SQRT1_2 * ua); sUl.style.opacity = ua;
    sArc.style.opacity = M.clamp((t - wt('S1', 'forty')) / 0.3); sArcL.style.opacity = sArc.style.opacity;
    sTr.forEach((gg, k) => { const gu = simT(t - 0.1 * (k + 1)), mv = Math.abs(gu - u) > 0.004 && u > 0.01; place(gg, sx(gu), sy(gu)); attr(gg, 'opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    trace(sTrace, sx, sy, t < tRp ? u : Math.max(u, 0));
    M.vis($('#slow'), t, tSlow - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
    const va = M.io((t - tRp - 0.1) / 0.5), vy = UY - g * u, K6 = 6;
    sVx.set(x, y, x + UX * K6 * va, y); attr(sVxl, 'x', (x + UX * K6 * va + 8).toFixed(1)); attr(sVxl, 'y', (y + 8).toFixed(1)); sVxl.style.opacity = va;
    sVy.set(x, y, x, y - vy * K6 * va); attr(sVyl, 'x', (x - 46).toFixed(1)); attr(sVyl, 'y', (y - Math.max(24, vy * K6 * 0.6) * va).toFixed(1)); sVyl.style.opacity = va * M.clamp(Math.abs(vy) / 3);
    sG.set(x - 34, y + 6, x - 34, y + 6 + 56 * va); attr(sGl, 'x', (x - 66).toFixed(1)); attr(sGl, 'y', (y + 52).toFixed(1)); sGl.style.opacity = va;
    // ghost copies at equal times across the whole flight, equal steps across
    const tg = wt('S7', 'ghost') - 0.1;
    sGh.forEach((gg, k) => { place(gg, sx(GK[k]), sy(GK[k])); attr(gg, 'opacity', k === 2 ? 0 : (0.3 * M.io((t - tg - k * 0.12) / 0.3)).toFixed(3)); });
    sDrop.forEach((p, k) => M.draw(p, t, wt('S7', 'Every') - 0.2 + k * 0.1, 0.3));
    sStep.forEach((e, k) => e.style.opacity = M.clamp((t - wt('S7', 'step') - k * 0.12) / 0.3));
    if (t > tS7) trace(sTrace, sx, sy, TT);
    M.draw(sR, t, wt('S4', 'twenty') - 0.1, 0.5); M.vis(sRp, t, wt('S4', 'range') - 0.1, 1e9, POP);
    M.vis(sF, t, wt('S7', 'So') - 0.1, 1e9, POP);
    const tr2 = Math.round(u * 100) / 100;
    M.setT($('#rt'), tr2.toFixed(2)); M.setT($('#rvy'), sgn(UY - g * tr2)); M.setT($('#rx'), (UX * tr2).toFixed(1));
    PUC.write($('#roF1'), t, wt('S2', 'horizontal') - 0.1, 0.7); PUC.write($('#roF2'), t, wt('S3', 'grows') - 0.1, 0.8);
    const first = Math.min(TL, Math.max(0, (Math.min(t, tRp) - tA) * 0.4));
    sCv(k => [k, UX * k], 0, first); sDt(u, UX * u, t > tA - 0.3);
    M.draw(sTm, t, wt('S4', 'lands') - 0.1, 0.6); sTl.style.opacity = M.clamp((t - wt('S4', 'two')) / 0.3);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 208], [tStep[2] - 0.1, 332], [tStep[3] - 0.1, 456]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = (t > tStep[2] - 0.1 && t < tStep[3] - 0.1 ? 92 : 120) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.draw(dLine, t, wt('D2', 'time') - 0.1, 0.6); dVl.style.opacity = M.clamp((t - wt('D2', 'time')) / 0.3);
    M.draw(dEnd, t, wt('D2', 'T') - 0.1, 0.4); dTl.style.opacity = M.clamp((t - wt('D2', 'T')) / 0.3);
    dRect.style.opacity = M.clamp((t - wt('D3', 'R') + 0.1) / 0.4); dAl.style.opacity = M.clamp((t - wt('D3', 'R') - 0.2) / 0.3);
    M.vis($('#dU'), t, wt('D5', 'units') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxw = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sxw ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Range') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'times') - 0.1, 0.8);
  }

  /* G: many angles */
  const gOn = t >= tG1 - 0.1 && t < tK1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const late = t >= tG5back;
    const tin = late ? tG5back + 0.05 : tG1 + 0.1, tout = late ? OUT('K1') : OUT('G4');
    M.vis($('#gl'), t, tin, tout, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#gr2'), t, late ? tin + 0.15 : tG1 + 0.3, tout, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    GA.forEach((a, i) => {
      const u = fly(a, gB[i], gGh[i], gTr[i], t, tGl[i]);
      gL[i].style.opacity = M.clamp((t - tGl[i] - a.T / 2) / 0.3);
      const landed = u >= a.T - 1e-6; gLand[i].style.opacity = landed ? M.clamp((t - tGl[i] - a.T) / 0.3) : 0;
      M.vis(gDots[i], t, landed ? tGl[i] + a.T : 1e9, 1e9, { dy: 0, fade: 0.15 });
    });
    const cu = 90 * M.io((t - wt('G6', 'follows') + 0.2) / 1.4);
    gCv(d => [d, 20 * Math.sin(2 * d * D2R)], 0, cu);
    gSym.forEach((p, k) => M.draw(p, t, wt('G6', 'both') - 0.3 + k * 0.3, 0.4)); gSymD.forEach(d => M.vis(d, t, wt('G6', 'both'), 1e9, { dy: 0, fade: 0.15 }));
    M.vis(gPk, t, wt('G5', 'Twenty') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tG4 + 0.05, tG5back - 0.1, { dy: 36, ...o });
    th1(t, { tin: tG4, tOpts: wt('G4', 'Which') - 0.1, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'shares') });
  }

  /* K: 30 vs 60 */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const late = t >= T0('K4') + 1.0;
    const tin = late ? T0('K4') + 1.1 : tK1 + 0.1, tout = late ? OUT('W1') : OUT('K3');
    M.vis($('#kl'), t, tin, tout, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#kr'), t, late ? tin + 0.15 : tK1 + 0.3, tout, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    KA.forEach((a, i) => {
      fly(a, kB[i], kGh[i], kTr[i], t, tKl[i]);
      kL[i].style.opacity = M.clamp((t - tKl[i] - a.T / 2) / 0.3);
      const tv = wt('K2', i ? 'slower' : 'faster') - 0.2, L = a.ux * 6 * M.io((t - tv) / 0.4); kV[i].set(a.x(a.T / 2) + 16, a.y(a.T / 2), a.x(a.T / 2) + 16 + L, a.y(a.T / 2));
      const el = $('#kb' + i); M.vis(el, t, tKl[i] - 0.1, 1e9, { dy: 20 });
      M.vis(el.querySelector('.kv'), t, wt('K2', i ? 'slower' : 'faster') - 0.1, 1e9, POP); M.vis(el.querySelector('.kt'), t, wt('K2', i ? 'longer' : 'shorter') - 0.1, 1e9, POP);
      M.vis(el.querySelector('.kr'), t, late ? tin + 0.4 + i * 0.15 : 1e9, 1e9, POP);
    });
    M.vis(kRing, t, late ? tin + 0.3 : 1e9, 1e9, { dy: 0, fade: 0.15 }); kRl.style.opacity = late ? M.clamp((t - tin - 0.3) / 0.3) : 0;
    M.vis($('#kRat'), t, late ? tin + 0.8 : 1e9, 1e9, { dy: 10 });
    M.vis($('#th2'), t, tK3 + 0.05, T0('K4') + 0.9, { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Sine') });
    avA(t, T0('K4') + 2.3, OUT('W1'));
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wTag, t, tWd[0] - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
    WA.forEach((a, i) => { fly(a, wB[i], wGh[i], wTr[i], t, tWd[i], 0.5); wL[i].style.opacity = M.clamp((t - tWd[i] - a.T) / 0.3); });
    M.draw(wRb, t, wt('W6', 'ten') - 0.1, 0.5); M.vis(wRl, t, wt('W6', 'same') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: T0('X3') - 0.05, tRight: wt('X3', 'Use') - 0.1 });
    M.draw(trP, t, wt('X2', 'multiply') - 0.1, 0.8);
    M.draw(trH, t, wt('X2', 'top') - 0.2, 0.4); trHl.style.opacity = M.clamp((t - wt('X3', 'half')) / 0.3);
    M.draw(trR, t, wt('X3', 'whole') - 0.1, 0.5); trRl.style.opacity = M.clamp((t - wt('X3', 'whole') - 0.2) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
