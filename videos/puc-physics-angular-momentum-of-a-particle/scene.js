// PUC Physics Ep 100: Angular momentum of a particle (Motion notebook, a ball seen from above)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const LC = '#A23B72', PC = '#C2558F', RC = C.violet, TC = C.gold, VC = C.ac, IC = C.ink;    // L plum, p lighter plum, r violet, theta gold, v blue
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const L_ = tc(LC, 'L'), p_ = tc(PC, 'p'), r_ = tc(RC, 'r'), th_ = tc(TC, '\\theta'), rp_ = tc(RC, 'r_\\perp'), v_ = tc(VC, 'v'), w_ = tc(VC, '\\omega');
const SYM = (p, x, y, s, col, fs = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': fs, fill: col }, a));
const U = a => [Math.cos(a * D2R), -Math.sin(a * D2R)];
const angOf = (dx, dy) => Math.atan2(-dy, dx) / D2R;
const ptMk = (p, x, y, r = 13) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '4 4' }); mk(g, 'circle', { cx: x, cy: y, r: 4.5, fill: IC }); return g; };
const turnArc = (p, col, sw = 4) => { const g = mk(p, 'g', {}), pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hd = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, R, a0, span) { if (span < 4) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + span, p0 = [cx + R * Math.cos(a0 * D2R), cy - R * Math.sin(a0 * D2R)], p1 = [cx + R * Math.cos(a1 * D2R), cy - R * Math.sin(a1 * D2R)];
    attr(pa, 'd', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${span > 180 ? 1 : 0} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    const tg = [-Math.sin(a1 * D2R), -Math.cos(a1 * D2R)], nn = [Math.cos(a1 * D2R), -Math.sin(a1 * D2R)], h = 13;
    attr(hd, 'd', `M${(p1[0] + tg[0] * h).toFixed(1)},${(p1[1] + tg[1] * h).toFixed(1)} L${(p1[0] + nn[0] * h * 0.6).toFixed(1)},${(p1[1] + nn[1] * h * 0.6).toFixed(1)} L${(p1[0] - nn[0] * h * 0.6).toFixed(1)},${(p1[1] - nn[1] * h * 0.6).toFixed(1)} Z`); } }; };
const arcD = (cx, cy, R, a0, a1) => { const p0 = [cx + R * Math.cos(a0 * D2R), cy - R * Math.sin(a0 * D2R)], p1 = [cx + R * Math.cos(a1 * D2R), cy - R * Math.sin(a1 * D2R)]; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const rAng = (x, y, a, b, q = 16) => { const ua = U(a), ub = U(b); return `M${(x + q * ua[0]).toFixed(1)},${(y + q * ua[1]).toFixed(1)} L${(x + q * ua[0] + q * ub[0]).toFixed(1)},${(y + q * ua[1] + q * ub[1]).toFixed(1)} L${(x + q * ub[0]).toFixed(1)},${(y + q * ub[1]).toFixed(1)}`; };
const ball = (p, R = 14, col = IC) => { const o = mk(p, 'g', {}), gi = mk(o, 'g', {}); mk(gi, 'circle', { r: R, fill: col }); mk(gi, 'circle', { r: R * 0.45, cx: -R * 0.3, cy: -R * 0.3, fill: '#fff', opacity: 0.25 }); return { o, set(x, y) { attr(gi, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const outMk = (p, x, y, col, into) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 15, fill: '#fff', stroke: col, 'stroke-width': 3 }); if (into) { mk(g, 'path', { d: `M${x - 7},${y - 7} L${x + 7},${y + 7} M${x + 7},${y - 7} L${x - 7},${y + 7}`, stroke: col, 'stroke-width': 3 }); } else mk(g, 'circle', { cx: x, cy: y, r: 4.5, fill: col }); return g; };

Object.assign(M.IC, {
  orbit: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 12h.01', 'M19 6a2 2 0 1 0 0 .01'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2'],
  sling: ['M5 19 12 5l7 14', 'M8 13h8', 'M12 5v.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS8 = T0('S8'), tS10 = T0('S10'), tS11 = T0('S11'), tS12 = T0('S12');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook rows ---------- */
const JOBS = [['orbit', 'Ball on a string', 'WHIRLED OVERHEAD'], ['sun', 'A planet', 'CIRCLING THE SUN'], ['sling', 'Stone in a sling', 'JUST BEFORE IT FLIES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'ball'), wt('H1', 'planet'), wt('H1', 'stone')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="110"></svg></div>`).join('');
const ORB = [0, 1, 2].map(i => { const sv = $('#jsv' + i), cx = 200, cy = 55, R = [40, 46, 36][i];
  mk(sv, 'circle', { cx, cy, r: R, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
  if (i === 1) mk(sv, 'circle', { cx, cy, r: 13, fill: '#E8A317' }); else ptMk(sv, cx, cy, 8);
  const str = mk(sv, 'line', { stroke: C.ink2, 'stroke-width': 2, opacity: i === 1 ? 0 : 1 }), b = ball(sv, i === 1 ? 9 : 8, i === 1 ? VC : IC);
  return { set(a) { const x = cx + R * Math.cos(a), y = cy - R * Math.sin(a); b.set(x, y); attr(str, 'x1', cx); attr(str, 'y1', cy); attr(str, 'x2', x.toFixed(1)); attr(str, 'y2', y.toFixed(1)); } }; });
// hook: Diya's ball from above, momentum arrow turning
const hs = $('#hkS'), HO = [270, 270], HR = 130;
mk(hs, 'circle', { cx: HO[0], cy: HO[1], r: HR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const hStr = mk(hs, 'line', { stroke: C.ink2, 'stroke-width': 2.5 }), hPt = ptMk(hs, HO[0], HO[1], 12), hB = ball(hs, 16), hP = PUC.arrow(hs, PC, 6, 18), hPl = SYM(hs, 0, 0, 'p', PC, 26);
const hGh = [0, 1, 2].map(() => mk(hs, 'circle', { r: 16, fill: IC, opacity: 0 }));
txt(hs, HO[0], HO[1] + 40, 'HAND', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });

/* ---------- P ---------- */
const IG = [['p', PC, 'The momentum', 'mass × velocity'], ['r', RC, 'The distance from the point', 'from the chosen point to the body'], ['θ', TC, 'The angle between them', 'between r and p']];
$('#igs').innerHTML = IG.map(([s, c, n, d], i) => `<div class="ig" id="ig${i}" style="top:${226 + i * 108}px"><div class="s" style="color:${c}">${s}</div><div class="n">${n}</div><div class="d">${d}</div></div>`).join('');
const tIg = [wt('P4', 'momentum'), wt('P4', 'distance'), wt('P4', 'angle')];
const pm = $('#pmS'), PO = [250, 330], PB = [520, 250], pu = U(115);
const pmPt = ptMk(pm, PO[0], PO[1], 14), pmL = txt(pm, PO[0], PO[1] + 46, 'THE CHOSEN POINT', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const pmPath = mk(pm, 'line', { x1: PB[0] - pu[0] * 220, y1: PB[1] - pu[1] * 220, x2: PB[0] + pu[0] * 200, y2: PB[1] + pu[1] * 200, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const pmR = PUC.arrow(pm, RC, 5, 16), pmP = PUC.arrow(pm, PC, 6, 18), pmB = ball(pm, 16);
pmB.set(PB[0], PB[1]);
const pmRl = SYM(pm, (PO[0] + PB[0]) / 2 + 8, (PO[1] + PB[1]) / 2 + 34, 'r', RC, 28), pmPl = SYM(pm, PB[0] + pu[0] * 130 - 30, PB[1] + pu[1] * 130, 'p', PC, 28);
const ra0 = angOf(PB[0] - PO[0], PB[1] - PO[1]);
const pmExt = mk(pm, 'line', { x1: PB[0], y1: PB[1], x2: PB[0] + U(ra0)[0] * 80, y2: PB[1] + U(ra0)[1] * 80, stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const pmTh = mk(pm, 'path', { d: arcD(PB[0], PB[1], 40, ra0, 115), fill: 'none', stroke: TC, 'stroke-width': 3.5 }), pmThl = SYM(pm, PB[0] + 40, PB[1] - 46, 'θ', TC, 24);
const pmNote = txt(pm, 392, 520, 'L is always about a chosen point', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 21 });

/* ---------- S: the sim ---------- */
const s = $('#simS'), M_B = 0.5;
// phase A: ball on a string, 300 px per metre, v = 2 m/s
const OA = [300, 310], PXA = 250, VA = 2, tA0 = tS1, tLong = wt('S5', 'longer');
const rA = t => 0.5 + 0.3 * M.io((t - tLong - 0.2) / 1.0);
const phiA = t => { const T = Math.max(0, t - tA0), n = Math.max(1, Math.ceil(T * 40)), h = T / n; let a = 0; for (let i = 0; i < n; i++) a += VA / rA(tA0 + (i + 0.5) * h) * h; return a; };
const gA = mk(s, 'g', {});
const orbA = mk(gA, 'circle', { cx: OA[0], cy: OA[1], r: 150, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const strA = mk(gA, 'line', { stroke: C.ink2, 'stroke-width': 2 });
const ghA = [0, 1, 2].map(() => mk(gA, 'circle', { r: 16, fill: IC, opacity: 0 }));
const bA = ball(gA, 16), ptA = ptMk(gA, OA[0], OA[1], 13);
txt(gA, OA[0], OA[1] + 44, 'HAND', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const rArA = PUC.arrow(gA, RC, 4.5, 14), pArA = PUC.arrow(gA, PC, 6, 18), raA = mk(gA, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3 });
const rlA = SYM(gA, 0, 0, 'r', RC, 26), plA = SYM(gA, 0, 0, 'p', PC, 26);
const LarcA = turnArc(gA, LC, 4.5), LlA = txt(gA, OA[0] + 60, OA[1] + 74, '', { fill: LC, 'font-weight': 700, 'font-size': 22 });
// phase B: ball in a straight line past Diya, 300 px per metre, v = 1 m/s, line 0.4 m away
const OB = [300, 440], PXB = 300, VB = 1, DB = 0.4, YL = OB[1] - DB * PXB, XB0 = 40, SB = (744 - XB0) / (VB * PXB);
const gB = mk(s, 'g', {});
const lineB = mk(gB, 'line', { x1: 36, y1: YL, x2: 748, y2: YL, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const ghB = [0, 1, 2].map(() => mk(gB, 'circle', { r: 16, fill: IC, opacity: 0 }));
const ptB = ptMk(gB, OB[0], OB[1], 13); txt(gB, OB[0], OB[1] + 44, 'DIYA', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const rArB = PUC.arrow(gB, RC, 4.5, 14), pArB = PUC.arrow(gB, PC, 6, 18), bB = ball(gB, 16);
const rlB = SYM(gB, 0, 0, 'r', RC, 26), plB = SYM(gB, 0, 0, 'p', PC, 26);
const rpB = mk(gB, 'line', { x1: OB[0], y1: OB[1], x2: OB[0], y2: YL, stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '8 6' }), rpBa = mk(gB, 'path', { d: rAng(OB[0], YL, 270, 0, 14), fill: 'none', stroke: TC, 'stroke-width': 3 });
const rpBl = txt(gB, OB[0] - 14, (OB[1] + YL) / 2 + 6, 'r⊥ = 0.4 m', { 'text-anchor': 'end', fill: RC, 'font-weight': 700, 'font-size': 21 });
const extB = mk(gB, 'line', { stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' }), thB = mk(gB, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), thBl = txt(gB, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 20 });
const tB1 = wt('S9', 'moves'), tFz = wt('S10', 'Freeze') + 0.15, sF = (300 - 16 - 160 - XB0) / (VB * PXB) + 0.0, tRes = wt('S12', 'So') - 0.1;
const sB0 = sF - 0.25 * (tFz - tS10 + 0.1);
const sBof = t => { if (t < tS10 - 0.1) return M.clamp(t - tB1, 0, SB); if (t < tFz) return sB0 + 0.25 * (t - tS10 + 0.1); if (t < tRes) return sF; if (t < tRes + 0.8) return sF + 0.25 * (t - tRes); return Math.min(SB, sF + 0.2 + (t - tRes - 0.8)); };
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r</span><span class="v" id="r_r" style="color:${RC}">0.50</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">2.00</span><span class="u">m/s</span>
  <span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">90</span><span class="u">deg</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${PC}">p</span><span class="v" id="r_p" style="color:${PC}">1.00</span><span class="u">kg m/s</span>
  <span class="k" style="color:${RC}">r<sub>⊥</sub></span><span class="v" id="r_rp" style="color:${RC}">0.50</span><span class="u">m</span>
  <span class="k" style="color:${LC}">L</span><span class="v" id="r_L" style="color:${LC}">0.50</span><span class="u">kg m²/s</span>`;
// graph 1: L and p_x against time (phase A); graph 2: L and r against time (phase B)
const XA = 30, g1s = $('#grS1'), g1 = PUC.graph(g1s, { x: 110, y: 74, w: 560, h: 146, xmax: 8.4, ymin: -1.2, ymax: 1.2, xt: [], yt: [-1, -0.5, 0, 0.5, 1], xl: 'last 8 s' });
const g1px = g1.curve(PC, 3), g1L = g1.curve(LC, 6), d1px = g1.dot(PC, 8), d1L = g1.dot(LC, 10);
const g2s = $('#grS2'), g2 = PUC.graph(g2s, { x: 110, y: 74, w: 560, h: 146, xmax: 2.6, ymin: 0, ymax: 1.6, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 0.4, 0.8, 1.2, 1.6], xl: 't (s)' });
const g2r = g2.curve(RC, 4), g2L = g2.curve(LC, 6), d2r = g2.dot(RC, 8), d2L = g2.dot(LC, 10);
const legH = (rows) => rows.map(([c, w, n]) => `<span style="display:flex;align-items:center;gap:8px"><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/></svg>${n}</span>`).join('');
$('#leg1').innerHTML = legH([[PC, 3, 'p<sub>x</sub> (kg m/s)'], [LC, 6, 'L (kg m²/s)']]);
$('#leg2').innerHTML = legH([[RC, 4, 'r (m)'], [LC, 6, 'L (kg m²/s)']]);
const th2 = PUC.think($('#th2'), { q: 'Diya halves the string but keeps L the same. Must the ball go slower or faster?', opts: ['Slower', 'Faster'], right: 1, why: 'L = m v r: half the r needs twice the v.' });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'It still goes around me!' });

/* ---------- D ---------- */
const STEPS = [[`\\vec{${L_}} = \\vec{${r_}} \\times \\vec{${p_}}`, 'a vector: position vector cross momentum', 'VECTOR'],
  [`${L_} = ${r_}\\,${p_}\\sin${th_}`, 'θ = the angle between r and p, tail to tail'],
  [`${L_} = (${r_}\\sin${th_})\\,${p_} = ${rp_}\\,${p_}`, 'r⊥: from the point to the line of motion'],
  [`\\text{circle: } ${L_} = m${v_}${r_} = m${r_}^2${w_}`, 'θ = 90°, and v = r ω'],
  [`[${L_}] = \\text{kg m}^2\\text{/s} = [\\text{M}\\,\\text{L}^2\\,\\text{T}^{-1}]`, 'unit kilogram metre squared per second']];
const SY = [84, 172, 260, 348, 436];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:80px"></div>` + STEPS.map(([f, w, tg], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${LC}">${tg}</div>` : ''}</div>`).join('');
$('#steps').querySelectorAll('.sx').forEach(e => e.style.fontSize = '34px'); $('#steps').querySelectorAll('.why').forEach(e => e.style.top = '48px');
const tStep = [wt('D2', 'Angular'), wt('D3', 'size'), wt('D4', 'perpendicular'), wt('D5', 'circle'), wt('D6', 'unit')];
const dp = $('#dpS'), DH = [70, 330], DP = [370, 330], DTH = 120, DFL = 112, du = U(DTH), DQ = [DP[0] + du[0] * 150, DP[1] + du[1] * 150];
const dLoa = mk(dp, 'line', { x1: DP[0] - du[0] * 60, y1: DP[1] - du[1] * 60, x2: DP[0] + du[0] * 230, y2: DP[1] + du[1] * 230, stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dLoaL = txt(dp, DP[0] - du[0] * 60 + 10, DP[1] - du[1] * 60 + 4, 'line of motion', { fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const dRp = mk(dp, 'line', { x1: DH[0], y1: DH[1], x2: DQ[0], y2: DQ[1], stroke: RC, 'stroke-width': 3.5, 'stroke-dasharray': '7 5' });
const dRa = mk(dp, 'path', { d: rAng(DQ[0], DQ[1], angOf(DH[0] - DQ[0], DH[1] - DQ[1]), DTH, 14), fill: 'none', stroke: TC, 'stroke-width': 3 });
const dRpL = SYM(dp, (DH[0] + DQ[0]) / 2 - 16, (DH[1] + DQ[1]) / 2 - 16, 'r⊥ = r sin θ', RC, 22, { 'text-anchor': 'end' });
const dAx = ptMk(dp, DH[0], DH[1], 12), dR = PUC.arrow(dp, RC, 5, 16), dF = PUC.arrow(dp, PC, 6, 18), dBall = ball(dp, 14);
dBall.set(DP[0], DP[1]);
const dRL = SYM(dp, 220, DH[1] + 34, 'r', RC, 28), dFL = SYM(dp, DP[0] + du[0] * DFL + 14, DP[1] + du[1] * DFL - 6, 'p', PC, 28);
const dExt = mk(dp, 'line', { x1: DP[0], y1: DP[1], x2: DP[0] + 90, y2: DP[1], stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const dTh = mk(dp, 'path', { d: arcD(DP[0], DP[1], 34, 0, DTH), fill: 'none', stroke: TC, 'stroke-width': 3.5 }), dThL = SYM(dp, DP[0] + 30, DP[1] - 40, 'θ', TC, 24);
const dTq = turnArc(dp, LC, 4), dOut = mk(dp, 'g', {});
outMk(dOut, 60, 414, LC, false);
txt(dOut, 86, 421, 'L points out of the screen', { fill: LC, 'font-weight': 700, 'font-size': 20 });
txt(dOut, 86, 448, 'curl r → p, thumb = L', { fill: C.ink2, 'font-weight': 600, 'font-size': 17 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${L_} = ${rp_}\\,${p_} \\qquad \\small{\\vec{${L_}} = \\vec{${r_}} \\times \\vec{${p_}}}`);

/* ---------- R ---------- */
const LK = [`L is measured about a <b>point</b>, not a path`, `The line misses Diya by 0.4 m: <i class="vi">r</i><sub class="vi">⊥</sub> ≠ 0`, `Along a straight line, <i class="vi">r</i><sub class="vi">⊥</sub> never changes`, `So <b class="pl">L</b> is not zero, and stays the same`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'point'), wt('R3', 'misses'), wt('R4', 'along'), wt('R4', 'not')];
const rr = $('#rrS'), RO = [330, 470], RYL = 230;
mk(rr, 'line', { x1: 36, y1: RYL, x2: 748, y2: RYL, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
ptMk(rr, RO[0], RO[1], 13); txt(rr, RO[0], RO[1] + 44, 'DIYA', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const rrP = mk(rr, 'line', { x1: RO[0], y1: RO[1], x2: RO[0], y2: RYL, stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '8 6' }), rrPa = mk(rr, 'path', { d: rAng(RO[0], RYL, 270, 0, 14), fill: 'none', stroke: TC, 'stroke-width': 3 });
const rrPl = txt(rr, RO[0] - 14, RYL + 34, 'r⊥ = 0.4 m', { 'text-anchor': 'end', fill: RC, 'font-weight': 700, 'font-size': 21 }), rrX = txt(rr, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 21 });
const SNAP = [60, 520, 690].map((x, i) => { const g = mk(rr, 'g', {}), ra = PUC.arrow(g, RC, 4, 13), pa = PUC.arrow(g, PC, 5, 16), b = ball(g, 15); b.set(x, RYL); ra.set(RO[0], RO[1], x + (RO[0] - x) * 0.0, RYL + 12); pa.set(x + 18, RYL, x + 100, RYL);
  txt(g, x, RYL - 34, 'L = 0.20', { 'text-anchor': 'middle', fill: LC, 'font-weight': 700, 'font-size': 20 }); return g; });
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Even passing by, it turns around me!' });

/* ---------- K ---------- */
const kl = $('#klS'), KO = [392, 340], KR = 150, ka = 40, kb = [KO[0] + KR * Math.cos(ka * D2R), KO[1] - KR * Math.sin(ka * D2R)];
mk(kl, 'circle', { cx: KO[0], cy: KO[1], r: KR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' }); ptMk(kl, KO[0], KO[1], 12);
const klR = PUC.arrow(kl, RC, 5, 16), klP = PUC.arrow(kl, PC, 6, 18), klB = ball(kl, 15); klB.set(kb[0], kb[1]);
const klRa = mk(kl, 'path', { d: rAng(kb[0], kb[1], ka + 180, ka + 90, 16), fill: 'none', stroke: TC, 'stroke-width': 3 });
const klRl = SYM(kl, (KO[0] + kb[0]) / 2 + 10, (KO[1] + kb[1]) / 2 + 30, 'r', RC, 28), klPl = SYM(kl, kb[0] + U(ka + 90)[0] * 110 - 30, kb[1] + U(ka + 90)[1] * 110, 'p', PC, 28);
const kr = $('#krS'), KO2 = [300, 460], KYL = 300;
mk(kr, 'line', { x1: 36, y1: KYL, x2: 748, y2: KYL, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' }); ptMk(kr, KO2[0], KO2[1], 12);
const krS = [140, 560].map((x, i) => { const g = mk(kr, 'g', {}), ra = PUC.arrow(g, RC, 4, 13), pa = PUC.arrow(g, PC, 5, 16), b = ball(g, 15); b.set(x, KYL); ra.set(KO2[0], KO2[1], x, KYL + 14); pa.set(x + 18, KYL, x + 96, KYL);
  const a = angOf(x - KO2[0], KYL - KO2[1]), ext = U(a); mk(g, 'line', { x1: x, y1: KYL, x2: x + ext[0] * 60, y2: KYL + ext[1] * 60, stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
  mk(g, 'path', { d: arcD(x, KYL, 34, 0, a), fill: 'none', stroke: TC, 'stroke-width': 3 }); txt(g, x + (i ? 40 : 30), KYL - (i ? 14 : 40), Math.round(a) + '°', { fill: TC, 'font-weight': 700, 'font-size': 19 }); return g; });
const krP = mk(kr, 'line', { x1: KO2[0], y1: KO2[1], x2: KO2[0], y2: KYL, stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '8 6' }), krPl = txt(kr, KO2[0] + 14, (KO2[1] + KYL) / 2 + 6, 'r⊥ fixed', { fill: RC, 'font-weight': 700, 'font-size': 21 });
$('#klF').innerHTML = K(`${L_} = m${v_}${r_}`); $('#krF').innerHTML = K(`${L_} = ${rp_}\\,${p_}`);
$('#klP').innerHTML = `<i class="vi">r</i> fixed · <i class="go">θ</i> = 90°`; $('#krP').innerHTML = `<i class="vi">r</i> and <i class="go">θ</i> change · <i class="vi">r</i><sub class="vi">⊥</sub> fixed`;
const th1 = PUC.think($('#th1'), { q: 'Is there any point about which the straight ball has no angular momentum?', opts: ['No such point', 'Any point on its line'], right: 1, why: 'On its line, r⊥ = 0, so L = r⊥ p = 0.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A 2 kg particle is at ${K(`\\vec{${r_}} = (3\\hat i + 4\\hat j)\\,\\text{m}`)}, moving at ${K(`\\vec{${v_}} = 2\\hat i\\ \\text{m/s}`)}. Find its angular momentum about the origin.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\vec{${p_}} = m\\vec{${v_}} = 2 \\times 2\\hat i = 4\\hat i\\ \\text{kg m/s}`)],
  [K(`\\vec{${L_}} = \\vec{${r_}} \\times \\vec{${p_}} = (3\\hat i + 4\\hat j) \\times 4\\hat i`)],
  [K(`= 12\\,(\\hat i \\times \\hat i) + 16\\,(\\hat j \\times \\hat i) = ${tc(LC, '-16\\hat k')}`)],
  [K(`\\text{check: } ${rp_} = 4,\\ ${rp_}\\,${p_} = 4 \\times 4 = 16`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 84 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '27px');
const w = $('#wrS'), WO = [120, 470], WU = 60;
for (let i = 0; i <= 10; i++) mk(w, 'line', { x1: WO[0] + i * WU, y1: WO[1], x2: WO[0] + i * WU, y2: WO[1] - 6 * WU, stroke: '#ECEEF3', 'stroke-width': 1.5 });
for (let j = 0; j <= 6; j++) mk(w, 'line', { x1: WO[0], y1: WO[1] - j * WU, x2: WO[0] + 10 * WU, y2: WO[1] - j * WU, stroke: '#ECEEF3', 'stroke-width': 1.5 });
mk(w, 'path', { d: `M${WO[0]},${WO[1] - 6.3 * WU} V${WO[1]} H${WO[0] + 10.2 * WU}`, fill: 'none', stroke: IC, 'stroke-width': 2.5 });
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => txt(w, WO[0] + i * WU, WO[1] + 26, i, { 'text-anchor': 'middle' })); [1, 2, 3, 4, 5].forEach(j => txt(w, WO[0] - 12, WO[1] - j * WU + 6, j, { 'text-anchor': 'end' }));
txt(w, WO[0] + 10.2 * WU, WO[1] + 26, 'x (m)', { 'text-anchor': 'end' }); txt(w, WO[0] + 12, WO[1] - 6.3 * WU + 4, 'y (m)');
const WP = [WO[0] + 3 * WU, WO[1] - 4 * WU];
const wLine = mk(w, 'line', { x1: WO[0], y1: WP[1], x2: WO[0] + 10 * WU, y2: WP[1], stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const wLineL = txt(w, WO[0] + 10 * WU - 4, WP[1] - 12, 'line of motion: y = 4', { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600, 'font-size': 17 });
const wR = PUC.arrow(w, RC, 5, 16), wP = PUC.arrow(w, PC, 6, 18), wB = ball(w, 14); wB.set(WP[0], WP[1]);
const wRl = SYM(w, (WO[0] + WP[0]) / 2 + 14, (WO[1] + WP[1]) / 2 + 10, 'r', RC, 28), wPl = SYM(w, WP[0] + 140, WP[1] + 34, 'p = 4i', PC, 24);
const wRp = mk(w, 'line', { x1: WO[0], y1: WO[1], x2: WO[0], y2: WP[1], stroke: RC, 'stroke-width': 5, 'stroke-dasharray': '8 6' }), wRpl = txt(w, WO[0] + 14, WO[1] - 3 * WU + 6, 'r⊥ = 4 m', { fill: RC, 'font-weight': 700, 'font-size': 21 });
const wIn = mk(w, 'g', {}); outMk(wIn, WO[0] + 40, WO[1] - 40, LC, true); txt(wIn, WO[0] + 64, WO[1] - 33, 'L into the screen', { fill: LC, 'font-weight': 700, 'font-size': 19 });
const tW = [wt('W3', 'First'), wt('W4', 'L'), wt('W4', 'Four'), wt('W6', 'Check')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A body in a straight line has no angular momentum', right: 'About any point off its line, L = r⊥ p, not zero' });
const tp = $('#tpS'), TO = [300, 230], TYL = 90;
mk(tp, 'line', { x1: 20, y1: TYL, x2: 540, y2: TYL, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
ptMk(tp, TO[0], TO[1], 11);
const tB = ball(tp, 13), tPa = PUC.arrow(tp, PC, 5, 16), tRp = mk(tp, 'line', { x1: TO[0], y1: TO[1], x2: TO[0], y2: TYL, stroke: C.ok, 'stroke-width': 4 }), tRpl = txt(tp, TO[0] + 14, (TO[1] + TYL) / 2 + 6, 'r⊥ ≠ 0', { fill: C.ok, 'font-weight': 700, 'font-size': 21 });
const where = PUC.where($('#wa'), { on: [], type: 'L as r × p, m v r for circles, and L of a projectile about its launch point' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 0.1 kg ball is thrown at 20 m/s, 30° above the ground (g = 10 m/s²). Its angular momentum about the launch point, at the highest point, is', qW: 760,
  opts: [K('10\\ \\text{kg m}^2\\text{/s}'), K('5\\ \\text{kg m}^2\\text{/s}'), K('5\\sqrt3\\ \\text{kg m}^2\\text{/s}'), K('10\\sqrt3\\ \\text{kg m}^2\\text{/s}')], right: 2, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{top: } ${v_} = 20\\cos 30^\\circ = 10\\sqrt3`)], [K(`H = \\dfrac{u^2\\sin^2 ${th_}}{2g} = \\dfrac{400 \\cdot \\frac14}{20} = 5\\ \\text{m}`)],
  [K(`${rp_} = H \\Rightarrow ${L_} = m${v_}H`)], [K(`${L_} = 0.1 \\times 10\\sqrt3 \\times 5 = 5\\sqrt3`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '24px');
const tSo = [wt('A2', 'top'), wt('A3', 'height'), wt('A4', 'moment'), wt('A4', 'Zero')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · angular momentum of a particle', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`\\vec{${L_}} = \\vec{${r_}} \\times \\vec{${p_}} \\qquad ${L_} = ${r_}${p_}\\sin${th_} = ${rp_}\\,${p_}`), K(`\\text{circle: } ${L_} = m${v_}${r_} = m${r_}^2${w_}`),
    '<b>Unit</b>: kg m²/s · <span class="mono">[M L² T⁻¹]</span> · <b>direction</b>: right-hand rule', '<b>Depends on the point</b>: zero for any point on the line of motion'] });
const YQ = ['How can a ball moving in a straight line have angular momentum?', 'About which points is the angular momentum of a moving body zero?', 'Why is L equal to m v r for a ball on a string?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 101', topic: 'Push longer, spin faster: Torque and Angular Momentum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS10 + 0.1, 1.06, 960, 540], [tS12 + 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); ORB[i].set((t - tMorph) * [3, 1.2, 4.5][i] + i); });
    vis($('#hjP'), t, wt('H2', 'around') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 30 });
    const a = Math.max(0, t - tH3 - 0.4) * 2.4, b = [HO[0] + HR * Math.cos(a), HO[1] - HR * Math.sin(a)], tg = [-Math.sin(a), -Math.cos(a)];
    hB.set(b[0], b[1]); attr(hStr, 'x1', HO[0]); attr(hStr, 'y1', HO[1]); attr(hStr, 'x2', b[0].toFixed(1)); attr(hStr, 'y2', b[1].toFixed(1));
    hGh.forEach((g, j) => { const aj = a - 0.12 * (j + 1); attr(g, 'cx', (HO[0] + HR * Math.cos(aj)).toFixed(1)); attr(g, 'cy', (HO[1] - HR * Math.sin(aj)).toFixed(1)); g.style.opacity = a > 0.5 ? [0.3, 0.2, 0.12][j] : 0; });
    const up = M.o3((t - wt('H4', 'direction') + 0.1) / 0.5); hP.set(b[0], b[1], b[0] + tg[0] * 100 * up, b[1] + tg[1] * 100 * up); attr(hPl, 'x', (b[0] + tg[0] * 118 - 8).toFixed(1)); attr(hPl, 'y', (b[1] + tg[1] * 118 + 8).toFixed(1)); hPl.style.opacity = up;
    vis($('#hp0'), t, wt('H3', 'speed') - 0.1, 1e9, POP); vis($('#hp1'), t, wt('H4', 'momentum') - 0.1, 1e9, POP);
    vis($('#hkQ'), t, wt('H4', 'Does') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#mv0'), t, wt('P1', 'mass') - 0.15, 1e9, POP); vis($('#mv1'), t, wt('P2', 'turning') - 0.15, 1e9, POP);
    vis($('#igL'), t, tP4 + 0.1, 1e9, { dy: 10 }); IG.forEach((_, i) => vis($('#ig' + i), t, tIg[i] - 0.15, 1e9, POP));
    vis($('#pm'), t, wt('P3', 'write') - 0.2, out, { dx: 60, dy: 0, ...o });
    vis(pmPt, t, wt('P3', 'point') - 0.1, 1e9, { dy: 0 }); vis(pmL, t, wt('P3', 'point'), 1e9, { dy: 0 }); vis(pmB.o, t, wt('P3', 'write') + 0.2, 1e9, { dy: 0 }); vis(pmPath, t, wt('P3', 'write') + 0.3, 1e9, { dy: 0 });
    const up = M.o3((t - tIg[0] + 0.1) / 0.5), ur = M.o3((t - tIg[1] + 0.1) / 0.5), ut = M.io((t - tIg[2] + 0.1) / 0.4);
    pmP.set(PB[0], PB[1], PB[0] + pu[0] * 120 * up, PB[1] + pu[1] * 120 * up); pmPl.style.opacity = up;
    pmR.set(PO[0], PO[1], PO[0] + (PB[0] - PO[0]) * ur, PO[1] + (PB[1] - PO[1]) * ur); pmRl.style.opacity = ur;
    pmExt.style.opacity = ut; M.drawU(pmTh, ut); pmThl.style.opacity = ut; vis(pmNote, t, wt('P3', 'chosen'), 1e9, { dy: 6 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#exS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const B = t >= tS8 - 0.15, bw = M.io((t - tS8 + 0.15) / 0.4);
    gA.style.opacity = (1 - bw).toFixed(3); gB.style.opacity = bw.toFixed(3); M.hide(gA, bw > 0.99); M.hide(gB, bw < 0.01);
    vis($('#simL1'), t, tS1 + 0.3, tS8 - 0.15, { dy: 0, outDur: 0.2 }); vis($('#simL2'), t, tS8 + 0.1, 1e9, { dy: 0 });
    if (!B || bw < 1) {
      const r = rA(t), ph = phiA(t), R = r * PXA, b = [OA[0] + R * Math.cos(ph), OA[1] - R * Math.sin(ph)], tg = [-Math.sin(ph), -Math.cos(ph)];
      attr(orbA, 'r', R.toFixed(1)); bA.set(b[0], b[1]); attr(strA, 'x1', OA[0]); attr(strA, 'y1', OA[1]); attr(strA, 'x2', b[0].toFixed(1)); attr(strA, 'y2', b[1].toFixed(1));
      ghA.forEach((g, j) => { const pj = phiA(t - 0.05 * (j + 1)), rj = rA(t - 0.05 * (j + 1)) * PXA; attr(g, 'cx', (OA[0] + rj * Math.cos(pj)).toFixed(1)); attr(g, 'cy', (OA[1] - rj * Math.sin(pj)).toFixed(1)); g.style.opacity = t > tA0 + 0.3 ? [0.3, 0.2, 0.12][j] : 0; });
      const ur = M.o3((t - wt('S2', 'position') + 0.1) / 0.5), up = M.o3((t - wt('S2', 'momentum') + 0.1) / 0.5), ua = M.io((t - wt('S2', 'right') + 0.1) / 0.3);
      rArA.set(OA[0], OA[1], OA[0] + (b[0] - OA[0]) * ur * (R - 18) / R, OA[1] + (b[1] - OA[1]) * ur * (R - 18) / R); attr(rlA, 'x', ((OA[0] + b[0]) / 2 + tg[0] * 22 - 8).toFixed(1)); attr(rlA, 'y', ((OA[1] + b[1]) / 2 + tg[1] * 22 + 8).toFixed(1)); rlA.style.opacity = ur;
      pArA.set(b[0], b[1], b[0] + tg[0] * 110 * up, b[1] + tg[1] * 110 * up); attr(plA, 'x', (b[0] + tg[0] * 130 - 8).toFixed(1)); attr(plA, 'y', (b[1] + tg[1] * 130 + 9).toFixed(1)); plA.style.opacity = up;
      attr(raA, 'd', rAng(b[0], b[1], ph / D2R + 180, ph / D2R + 90, 15)); raA.style.opacity = ua;
      const uL = M.io((t - wt('S3', 'L') + 0.1) / 0.6); LarcA.set(OA[0], OA[1], 44, 20, 230 * uL); M.setT(LlA, 'L = ' + f2(M_B * VA * Math.round(r * 100) / 100)); LlA.style.opacity = uL;
      if (!B) {
        const rr2 = Math.round(r * 100) / 100, Lv = M_B * VA * rr2;
        M.setT($('#r_r'), f2(rr2)); M.setT($('#r_v'), f2(VA)); M.setT($('#r_th'), '90'); M.setT($('#r_p'), f2(M_B * VA)); M.setT($('#r_rp'), f2(rr2)); M.setT($('#r_L'), f2(Lv));
        M.setT($('#roT'), t < tLong ? 'STRING 0.5 m' : 'STRING 0.8 m');
      }
    }
    if (B) {
      const sb = sBof(t), sr = Math.round(sb * 100) / 100, x = XB0 + 16 + VB * PXB * sb, xm = (x - OB[0]) / PXB, b = [x, YL];
      bB.set(b[0], b[1]);
      const mv = t > tB1 && sb > 0.02 && sb < SB && !(t >= tFz && t < tRes), gs = t >= tS10 - 0.1 && t < tRes + 0.8 ? 0.012 : 0.05;
      ghB.forEach((g, j) => { const xj = XB0 + 16 + VB * PXB * Math.max(0, sb - gs * (j + 1)); attr(g, 'cx', xj.toFixed(1)); attr(g, 'cy', YL); g.style.opacity = mv && x - xj > 4 ? [0.3, 0.2, 0.12][j] : 0; });
      const L0 = Math.hypot(b[0] - OB[0], b[1] - OB[1]);
      rArB.set(OB[0], OB[1], OB[0] + (b[0] - OB[0]) * (L0 - 18) / L0, OB[1] + (b[1] - OB[1]) * (L0 - 18) / L0); attr(rlB, 'x', ((OB[0] + b[0]) / 2 + (x < OB[0] ? -26 : 14)).toFixed(1)); attr(rlB, 'y', ((OB[1] + b[1]) / 2 + 6).toFixed(1));
      pArB.set(b[0] + 18, b[1], b[0] + 18 + 110 * M_B * VB * 2, b[1]); attr(plB, 'x', (b[0] + 70).toFixed(1)); attr(plB, 'y', (b[1] - 18).toFixed(1));
      const a = angOf(b[0] - OB[0], b[1] - OB[1]), ue = M.io((t - wt('S11', 'angle') + 0.1) / 0.3) * (t < tRes + 0.4 ? 1 : 1 - M.io((t - tRes - 0.4) / 0.3)), ext = U(a);
      attr(extB, 'x1', b[0]); attr(extB, 'y1', b[1]); attr(extB, 'x2', (b[0] + ext[0] * 70).toFixed(1)); attr(extB, 'y2', (b[1] + ext[1] * 70).toFixed(1)); extB.style.opacity = ue;
      attr(thB, 'd', arcD(b[0], b[1], 34, 0, a)); thB.style.opacity = ue; attr(thBl, 'x', (b[0] + 40).toFixed(1)); attr(thBl, 'y', (b[1] - 56).toFixed(1)); M.setT(thBl, 'θ = ' + Math.round(a) + '°'); thBl.style.opacity = ue;
      const up = M.io((t - wt('S11', 'perpendicular') + 0.1) / 0.5); M.drawU(rpB, up); rpBa.style.opacity = up; rpBl.style.opacity = up;
      // readout: round time first, then compute
      const xr = (XB0 + 16 + VB * PXB * sr - OB[0]) / PXB, rv = Math.hypot(xr, DB), thv = Math.atan2(DB, xr) / D2R;
      M.setT($('#r_r'), f2(rv)); M.setT($('#r_v'), f2(VB)); M.setT($('#r_th'), String(Math.round(thv))); M.setT($('#r_p'), f2(M_B * VB)); M.setT($('#r_rp'), f2(rv * Math.sin(thv * D2R))); M.setT($('#r_L'), f2(M_B * VB * rv * Math.sin(thv * D2R)));
      M.setT($('#roT'), t >= tS10 - 0.1 && t < tRes + 0.8 ? 'REPLAY' : 'STRAIGHT LINE');
      $('#r_rp').style.background = mix('#FFFFFF', '#EFE9FB', up);
    }
    vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_L').style.background = mix('#FFFFFF', '#F3DCE8', M.io((t - wt('S4', 'L') + 0.1) / 0.3) * (1 - M.io((t - tS5) / 0.3)) + M.io((t - wt('S12', 'L') + 0.1) / 0.3));
    vis($('#smo'), t, tS10 - 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // graphs
    const tw = M.io((t - tS8 + 0.15) / 0.35);
    vis($('#grL1'), t, tS1 + 0.5, tS8 - 0.15, { dy: 0, outDur: 0.2 }); vis($('#grL2'), t, tS8 + 0.1, 1e9, { dy: 0 });
    vis($('#leg1'), t, tS1 + 1.0, tS8 - 0.15, { dy: 0, outDur: 0.2 }); vis($('#leg2'), t, tS8 + 0.2, 1e9, { dy: 0 });
    g1s.style.opacity = (1 - tw).toFixed(3); g2s.style.opacity = tw.toFixed(3); M.hide(g1s, tw > 0.99); M.hide(g2s, tw < 0.01);
    const sa = Math.min(XA, Math.max(0, t - tA0)), sa0 = Math.max(0, sa - 0.001);
    const w0 = Math.max(0, sa - 8);
    g1px(x => [x - w0, -M_B * VA * Math.sin(phiA(tA0 + x))], w0, sa, 160); g1L(x => [x - w0, M_B * VA * rA(tA0 + x)], w0, sa, 40);
    d1px(sa - w0, -M_B * VA * Math.sin(phiA(tA0 + sa)), sa > 0.05); d1L(sa - w0, M_B * VA * rA(tA0 + sa), sa > 0.05);
    const sb2 = B ? sBof(t) : 0, rOf = q => Math.hypot((XB0 + 16 + VB * PXB * q - OB[0]) / PXB, DB);
    const sDone = t >= tS10 - 0.1 ? SB : sb2, sNow = sb2;
    g2r(q => [q, rOf(q)], 0, t >= tS10 - 0.1 ? SB : sb2, 60); g2L(q => [q, M_B * VB * DB], 0, t >= tS10 - 0.1 ? SB : sb2, 4);
    d2r(sNow, rOf(sNow), B && t > tB1); d2L(sNow, M_B * VB * DB, B && t > tB1);
    vis($('#th2'), t, tS6 + 0.05, OUT('S8'), { dy: 36, ...o });
    th2(t, { tin: tS6, tOpts: wt('S6', 'slower') - 0.1, tCount: T1('S6') + 0.05, dur: 3, tAns: T0('S7') - 0.02, tWhy: wt('S7', 'L') });
    avD(t, wt('S12', 'straight') - 0.1, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const u0 = M.o3((t - wt('D2', 'r') + 0.1) / 0.5), u1 = M.o3((t - wt('D2', 'p') + 0.1) / 0.5);
    vis(dAx, t, tD1 + 0.6, 1e9, { dy: 0 }); vis(dBall.o, t, tD1 + 0.7, 1e9, { dy: 0 });
    dR.set(DH[0], DH[1], DH[0] + (DP[0] - 16 - DH[0]) * u0, DH[1]); dRL.style.opacity = u0;
    dF.set(DP[0], DP[1], DP[0] + du[0] * DFL * u1, DP[1] + du[1] * DFL * u1); dFL.style.opacity = u1;
    const ut = M.io((t - wt('D3', 'theta') + 0.1) / 0.4); dExt.style.opacity = ut; M.drawU(dTh, ut); dThL.style.opacity = ut;
    const um = M.io((t - wt('D4', 'distance') + 0.1) / 0.5); M.drawU(dLoa, um); dLoaL.style.opacity = um; M.drawU(dRp, M.io((t - wt('D4', 'line') + 0.1) / 0.5));
    const ua = M.io((t - wt('D4', 'motion') + 0.1) / 0.3); dRa.style.opacity = ua; dRpL.style.opacity = ua;
    const ur = M.io((t - wt('D7', 'Curl') + 0.1) / 0.8); dTq.set(DH[0], DH[1], 46, 10, 150 * ur); vis(dOut, t, wt('D7', 'out') - 0.2, 1e9, { dy: 8 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Angular') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'perpendicular') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    avR(t, wt('R4', 'same') + 0.2, out);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    SNAP.forEach((g, i) => vis(g, t, tR1 + 0.9 + i * 0.35, 1e9, { dy: 0 }));
    const up = M.io((t - tLk[1] + 0.1) / 0.5); M.drawU(rrP, up); rrPa.style.opacity = up; rrPl.style.opacity = up;
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u1 = M.o3((t - tK1 - 0.4) / 0.5); klR.set(KO[0], KO[1], KO[0] + (kb[0] - KO[0]) * u1 * 0.88, KO[1] + (kb[1] - KO[1]) * u1 * 0.88); klRl.style.opacity = u1;
    const pu2 = U(ka + 90); klP.set(kb[0], kb[1], kb[0] + pu2[0] * 100 * u1, kb[1] + pu2[1] * 100 * u1); klPl.style.opacity = u1; klRa.style.opacity = M.io((t - wt('K1', 'angle') + 0.1) / 0.3);
    PUC.write($('#klF'), t, wt('K1', 'fixed') - 0.1, 0.7); vis($('#klP'), t, wt('K1', 'ninety') - 0.1, 1e9, POP);
    krS.forEach((g, i) => vis(g, t, T0('K2') + 0.3 + i * 0.4, 1e9, { dy: 0 }));
    const up = M.io((t - wt('K2', 'perpendicular') + 0.1) / 0.5); M.drawU(krP, up); krPl.style.opacity = up;
    PUC.write($('#krF'), t, wt('K2', 'perpendicular') + 0.3, 0.7); vis($('#krP'), t, wt('K2', 'fixed') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is') + 0.3, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'There') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...o });
    vis(wB.o, t, wt('W2', 'three') - 0.1, 1e9, { dy: 0 });
    const ur = M.o3((t - wt('W2', 'three') + 0.1) / 0.5), up = M.o3((t - wt('W3', 'Four') + 0.1) / 0.5);
    const L0 = Math.hypot(WP[0] - WO[0], WP[1] - WO[1]); wR.set(WO[0], WO[1], WO[0] + (WP[0] - WO[0]) * ur * (L0 - 16) / L0, WO[1] + (WP[1] - WO[1]) * ur * (L0 - 16) / L0); wRl.style.opacity = ur;
    wP.set(WP[0] + 16, WP[1], WP[0] + 16 + 160 * up, WP[1]); wPl.style.opacity = up;
    vis(wLine, t, wt('W6', 'moves') - 0.1, 1e9, { dy: 0 }); vis(wLineL, t, wt('W6', 'moves'), 1e9, { dy: 0 });
    const urp = M.io((t - wt('W6', 'perpendicular') + 0.1) / 0.5); M.drawU(wRp, urp); wRpl.style.opacity = urp;
    vis(wIn, t, wt('W5', 'into') - 0.2, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'body') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'About') - 0.1 });
    const bx = 60 + Math.min(400, 160 * Math.max(0, t - tX1 - 0.4)); tB.set(bx, TYL); tPa.set(bx + 16, TYL, bx + 86, TYL);
    const ur = M.io((t - wt('X3', 'perpendicular') + 0.1) / 0.5); M.drawU(tRp, ur); tRpl.style.opacity = ur;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'L') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
