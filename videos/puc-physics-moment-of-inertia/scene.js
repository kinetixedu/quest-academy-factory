// PUC Physics Ep 104: Moment of inertia (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, RC = C.violet, EC = C.teal, MC = C.ink, IC = C.ink, FC = C.orange;   // v, omega blue; r violet; K teal; m and I ink
const ROD = '#8D99AE';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f3 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(3);
const axisM = (p, x, y, r = 11) => { const o = mk(p, 'g', {}); mk(o, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(o, 'circle', { cx: x, cy: y, r: 3.5, fill: MC }); return o; };
const ball = (p, R, lab, col = MC) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r: R, fill: col }); if (lab) txt(g, 0, 5, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': Math.round(R * 0.62) }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const curv = (p, col, sw = 4) => { const o = mk(p, 'g', {}), pa = mk(o, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hd = mk(o, 'path', { fill: col });
  return { o, set(cx, cy, r, a0, a1) { const p0 = [cx + r * Math.cos(a0 * D2R), cy + r * Math.sin(a0 * D2R)], p1 = [cx + r * Math.cos(a1 * D2R), cy + r * Math.sin(a1 * D2R)], s = Math.sign(a1 - a0);
    attr(pa, 'd', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${s > 0 ? 1 : 0} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    const tg = [-Math.sin(a1 * D2R) * s, Math.cos(a1 * D2R) * s], nm = [-tg[1], tg[0]];
    attr(hd, 'd', `M${(p1[0] + tg[0] * 13).toFixed(1)},${(p1[1] + tg[1] * 13).toFixed(1)} L${(p1[0] + nm[0] * 7).toFixed(1)},${(p1[1] + nm[1] * 7).toFixed(1)} L${(p1[0] - nm[0] * 7).toFixed(1)},${(p1[1] - nm[1] * 7).toFixed(1)} Z`); } }; };

Object.assign(M.IC, {
  door: ['M5 21V3h11v18', 'M3 21h18', 'M13 12h.01'],
  carousel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M3 12h18', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  top: ['M12 3v3', 'M5 9h14l-7 12z', 'M8 9a4 3 0 0 1 8 0'],
  trolley: ['M3 4h3l2 11h11l2-8H7', 'M9 20a1.5 1.5 0 1 0 0.01 0', 'M17 20a1.5 1.5 0 1 0 0.01 0'],
  spin: ['M20 12a8 8 0 1 1-3-6.2', 'M20 4v4h-4'],
  ruler2: ['M3 9h18v6H3z', 'M7 9v3', 'M11 9v3', 'M15 9v3', 'M19 9v3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4');
const tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['door', 'A heavy door', 'SLOW TO START SWINGING'], ['carousel', 'A full merry-go-round', 'HARD TO GET TURNING'], ['top', 'A small top', 'SPINS UP WITH ONE FLICK']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'door'), wt('H1', 'merry'), wt('H1', 'top')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="260" height="120"></svg></div>`).join('');
const MD = $('#jsv0'), MR = $('#jsv1'), MT = $('#jsv2');
mk(MD, 'line', { x1: 60, y1: 104, x2: 230, y2: 104, stroke: C.ink2, 'stroke-width': 2.5 }); mk(MD, 'line', { x1: 100, y1: 14, x2: 100, y2: 104, stroke: C.ink2, 'stroke-width': 4 });
const door = mk(MD, 'rect', { x: 100, y: 16, width: 80, height: 86, fill: '#C9A27A', stroke: MC, 'stroke-width': 2.5 });
const mrg = mk(MR, 'g', {}); mk(MR, 'circle', { cx: 160, cy: 60, r: 46, fill: '#E8EEF9', stroke: MC, 'stroke-width': 2.5 });
const mrgI = mk(mrg, 'g', {}); for (let k = 0; k < 6; k++) { const a = k * 60 * D2R; mk(mrgI, 'circle', { cx: 160 + 34 * Math.cos(a), cy: 60 + 34 * Math.sin(a), r: 8, fill: [C.ac, FC, C.ok, RC, C.red, C.gold][k] }); }
mk(MR, 'circle', { cx: 160, cy: 60, r: 6, fill: MC });
const topS = mk(MT, 'g', {}); mk(MT, 'path', { d: 'M110 30 H210 L160 104 Z', fill: '#F2C24E', stroke: MC, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); mk(MT, 'line', { x1: 160, y1: 30, x2: 160, y2: 12, stroke: MC, 'stroke-width': 4 });
const topStr = [0, 1, 2].map(() => mk(MT, 'line', { y1: 32, y2: 70, stroke: C.red, 'stroke-width': 4 }));
// Diya's ruler
const hs = $('#hkS'), HC = [290, 270], HL = 210;
const hPath = mk(hs, 'circle', { cx: HC[0], cy: HC[1], r: HL / 2, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const hRul = mk(hs, 'g', {}), hRulI = mk(hRul, 'g', {});
mk(hRulI, 'rect', { x: -HL / 2, y: -14, width: HL, height: 28, rx: 3, fill: '#F4D990', stroke: MC, 'stroke-width': 2.5 });
for (let k = 1; k < 20; k++) mk(hRulI, 'line', { x1: -HL / 2 + k * HL / 20, y1: -14, x2: -HL / 2 + k * HL / 20, y2: k % 5 ? -6 : 0, stroke: MC, 'stroke-width': 1.5 });
const hAx = axisM(hs, HC[0], HC[1], 10);
const hLab = txt(hs, 36, 470, '', { fill: C.ink2, 'font-weight': 700, 'font-size': 20 });
const tHa = wt('H3', 'middle'), tHb = wt('H4', 'end');

/* ---------- P ---------- */
const QR = [['trolley', MC, 'Mass: resists starting to move', 'a heavy trolley is hard to push off'], ['spin', VC, 'Moment of inertia: resists turning', 'how hard to start or stop a spin'], ['ruler2', RC, 'Depends on mass and distance', 'how far the mass sits from the axis']];
$('#qrs').innerHTML = QR.map(([ic, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 128}px"><div class="qs">${M.icon(ic, 30, c, 2.4)}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
$('#lawP').innerHTML = `${K(`I = \\textstyle\\sum ${tc('#FFFFFF', 'm')}\\,${tc('#C9B6F5', 'r')}^2`)}<span style="font:500 22px 'IBM Plex Mono';color:#B8BCC6;margin-left:12px">unit: kg m²</span>`;
const tQr = [wt('P1', 'First'), wt('P2', 'Turning'), wt('P3', 'depends')];
const pm = $('#pmS'), PA = [300, 300];
[70, 130, 190].forEach(r => mk(pm, 'circle', { cx: PA[0], cy: PA[1], r, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' }));
const pRot = mk(pm, 'g', {}), pRotI = mk(pRot, 'g', {});
const PB = [[70, 200], [130, 320], [190, 40]].map(([r, a], i) => { const x = PA[0] + r * Math.cos(a * D2R), y = PA[1] + r * Math.sin(a * D2R); const ln = mk(pRotI, 'line', { x1: PA[0], y1: PA[1], x2: x, y2: y, stroke: RC, 'stroke-width': 3 }); mk(pRotI, 'circle', { cx: x, cy: y, r: 13, fill: MC }); return { r, a, x, y, ln }; });
axisM(pm, PA[0], PA[1], 11); txt(pm, PA[0] - 16, PA[1] + 40, 'axis', { 'text-anchor': 'end', fill: C.ink2, 'font-weight': 600 });
const pRows = [['near: small m r²', 70], ['middle', 130], ['far: big m r²', 190]];
const pChips = PB.map((b, i) => { const g = mk(pm, 'g', {}); txt(g, 540, 176 + i * 90, `r = ${['0.1', '0.2', '0.3'][i]} m`, { fill: RC, 'font-weight': 700, 'font-size': 22 }); txt(g, 540, 204 + i * 90, `m r² = ${['0.01', '0.04', '0.09'][i]} kg m²`, { fill: MC, 'font-weight': 600, 'font-size': 19 }); return g; });
txt(pm, 540, 130, 'EACH BIT: 1 kg', { 'font-size': 17, 'font-weight': 600 }); const pNote = txt(pm, 392, 540, 'twice as far counts four times', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 21 });

/* ---------- S: spinning rod sim ---------- */
const s = $('#simS'), AX = [392, 300], PX = 225, KJ = 1, BR = 24;
const aKeys = M.keys([[0, 0], [wt('S6', 'slide') + 0.2, 0.5]], 3.2, M.io);   // axis position a (m from the rod's middle)
const Iof = a => (0.5 + a) ** 2 + (0.5 - a) ** 2;
const omOf = a => Math.sqrt(2 * KJ / Iof(a));
mk(s, 'circle', { cx: AX[0], cy: AX[1], r: PX * 0.5, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const bigC = mk(s, 'circle', { cx: AX[0], cy: AX[1], r: PX * 1, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const ghL = [0, 1, 2].map(() => mk(s, 'circle', { r: BR, fill: MC, opacity: 0 })), ghR = [0, 1, 2].map(() => mk(s, 'circle', { r: BR, fill: MC, opacity: 0 }));
const rod = mk(s, 'line', { stroke: ROD, 'stroke-width': 9, 'stroke-linecap': 'round' });
const bL = ball(s, BR, '1 kg'), bR = ball(s, BR, '1 kg');
const sAx = axisM(s, AX[0], AX[1], 12);
const rA = [PUC.arrow(s, RC, 5, 14), PUC.arrow(s, RC, 5, 14)], vA = [PUC.arrow(s, VC, 6, 18), PUC.arrow(s, VC, 6, 18)];
const rL = [0, 1].map(() => txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' })), vL = [0, 1].map(() => txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 20 }));
const omA = curv(s, VC, 4), omL = txt(s, 0, 0, 'ω', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: VC });
const tGo = wt('S3', 'turns') - 0.3, tFz = wt('S4', 'Freeze') + 0.1, tRes = T0('S6') - 0.1;
const rate = t => { if (t < tGo) return 0; if (t < tS4) return M.clamp((t - tGo) / 0.5); if (t < tFz) return 0.25; if (t < tRes) return 0; if (t < tRes + 0.8) return 0.25; return 1; };
// angle table: phi(t) = integral of omega(a(t)) * rate(t) dt (a changes only after the replay)
const T_A = tS1, T_B = tD1 + 0.2, DT = 1 / 120, PH = [0];
for (let t = T_A; t < T_B; t += DT) PH.push(PH[PH.length - 1] + omOf(aKeys(t)) * rate(t) * DT);
const phiAt = t => { const x = (t - T_A) / DT; if (x <= 0) return 0; const i = Math.min(PH.length - 2, Math.floor(x)), f = x - i; return PH[i] + (PH[i + 1] - PH[i]) * f; };
const simT = t => { let tau = 0; return tau; };
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r<sub>1</sub></span><span class="v" id="r_r1" style="color:${RC}">0.50</span><span class="u">m</span>
  <span class="k" style="color:${RC}">r<sub>2</sub></span><span class="v" id="r_r2" style="color:${RC}">0.50</span><span class="u">m</span>
  <span class="k" style="color:${IC}">I</span><span class="v" id="r_I">0.500</span><span class="u">kg m²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">ω</span><span class="v" id="r_om" style="color:${VC}">0.00</span><span class="u">rad/s</span>
  <span class="k" style="color:${VC}">v<sub>far</sub></span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${EC}">K</span><span class="v" id="r_K" style="color:${EC}">0.00</span><span class="u">J</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 120, y: 72, w: 560, h: 150, xmax: 0.5, ymin: 0, ymax: 1.2, xt: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yt: [0, 0.5, 1], xl: '' });
txt(gs, 748, 46, 'a = axis distance from the middle (m)', { 'text-anchor': 'end', 'font-size': 17 });
txt(gs, 132, 78, 'I (kg m²)', { 'font-size': 18 });
const gGhost = mk(gs, 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' }), gC = mk(gs, 'path', { d: '', fill: 'none', stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gDot = g.dot(IC, 10);
const plotA = (path, a1) => { if (a1 <= 0.002) { attr(path, 'd', ''); return; } let d = ''; for (let i = 0; i <= 40; i++) { const a = a1 * i / 40; d += (i ? 'L' : 'M') + g.X(a).toFixed(1) + ',' + g.Y(Iof(a)).toFixed(1); } attr(path, 'd', d); };
plotA(gGhost, 0.5);
const th1 = PUC.think($('#th1'), { q: 'Is moment of inertia fixed for a body, like its mass?', opts: ['Yes, it is fixed', 'No, it changes'], right: 1, why: 'It depends on the axis: same rod, same mass, I doubled.' });

/* ---------- D ---------- */
const m_ = tc(MC, 'm'), r_ = tc(RC, 'r'), v_ = tc(VC, 'v'), w_ = tc(VC, '\\omega'), K_ = tc(EC, 'K');
const STEPS = [[`${v_} = ${r_}\\,${w_}`, 'speed of one bit going round'],
  [`${K_}_i = \\tfrac12 ${m_}${v_}^2 = \\tfrac12 ${m_}${r_}^2${w_}^2`, 'kinetic energy of that bit'],
  [`${K_} = \\textstyle\\sum \\tfrac12 ${m_}_i${r_}_i^2${w_}^2`, 'add every bit: all share one ω'],
  [`${K_} = \\tfrac12 \\big(\\textstyle\\sum ${m_}_i${r_}_i^2\\big)${w_}^2 = \\tfrac12 I${w_}^2`, 'the bracket is I']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:940px;height:84px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="dres" id="dres">${K(`\\tfrac12 I${tc('#9DBCF7', '\\omega')}^2`)} &nbsp;is just like&nbsp; ${K(`\\tfrac12 m${tc('#9DBCF7', 'v')}^2`)} &nbsp;: I plays the part of mass</div>`;
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DA = [250, 250], DRr = 150;
mk(dp, 'circle', { cx: DA[0], cy: DA[1], r: DRr, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const dLine = mk(dp, 'line', { x1: DA[0], y1: DA[1], stroke: RC, 'stroke-width': 4 }), dBit = mk(dp, 'circle', { r: 14, fill: MC }), dV = PUC.arrow(dp, VC, 6, 18);
axisM(dp, DA[0], DA[1], 11);
const dRl = txt(dp, 0, 0, 'r', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: RC }), dVl = txt(dp, 0, 0, 'v = rω', { 'font-weight': 700, 'font-size': 22, fill: VC });
const dOm = curv(dp, VC, 4), dOml = txt(dp, DA[0] + 40, DA[1] - 30, 'ω', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24, fill: VC });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`I = \\textstyle\\sum ${m_}\\,${r_}^2`);

/* ---------- R ---------- */
const LK = ['About the end, the far ball swings a big circle', 'Bigger circle, same time: bigger speed, v = rω', 'Kinetic energy grows with v², so with r²', 'Same spin needs more energy: bigger I'];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
$('#lks').querySelectorAll('.lt').forEach(e => e.style.fontSize = '23px');
const tLk = [wt('R2', 'About'), wt('R3', 'bigger'), wt('R4', 'Kinetic'), wt('R5', 'same')];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'So the far end has to move fast. That is the hard part!' });
const rr = $('#rrS'), RP = 170, RCM = [200, 300], RCE = [540, 300];
mk(rr, 'circle', { cx: RCM[0], cy: RCM[1], r: RP * 0.5, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
mk(rr, 'circle', { cx: RCE[0], cy: RCE[1], r: RP, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const rRodM = mk(rr, 'line', { stroke: ROD, 'stroke-width': 7, 'stroke-linecap': 'round' }), rRodE = mk(rr, 'line', { stroke: ROD, 'stroke-width': 7, 'stroke-linecap': 'round' });
const rB = [ball(rr, 17, ''), ball(rr, 17, ''), ball(rr, 17, ''), ball(rr, 17, '')];
axisM(rr, RCM[0], RCM[1], 9); axisM(rr, RCE[0], RCE[1], 9);
const rV = [PUC.arrow(rr, VC, 5, 15), PUC.arrow(rr, VC, 5, 15), PUC.arrow(rr, VC, 5, 15)];
txt(rr, RCM[0], 116, 'ABOUT THE MIDDLE', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 }); txt(rr, RCE[0], 116, 'ABOUT THE END', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 });
const rT = [txt(rr, RCM[0], 512, 'v = 1 m/s each', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 21 }), txt(rr, RCE[0], 512, 'far ball: v = 2 m/s', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 21 }),
  txt(rr, RCM[0], 544, 'K = 1 J', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 22 }), txt(rr, RCE[0], 544, 'K = 2 J', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 22 })];

/* ---------- K ---------- */
const KS = [['#khS', 0.1], ['#klS', 0.5]].map(([id, r]) => { const sv = $(id), A = [392, 290], P = 300; mk(sv, 'circle', { cx: A[0], cy: A[1], r: r * P, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
  const rd = mk(sv, 'line', { stroke: ROD, 'stroke-width': 7, 'stroke-linecap': 'round' }), b1 = ball(sv, 18, ''), b2 = ball(sv, 18, ''); axisM(sv, A[0], A[1], 9);
  const lb = txt(sv, A[0], 470, `r = ${r} m`, { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 22 });
  return { sv, A, P, r, rd, b1, b2 }; });
$('#khP').innerHTML = `${K(`I = 2 \\times 1 \\times ${tc(RC, '0.1')}^2 = 0.02\\ \\text{kg m}^2`)}`;
$('#klP').innerHTML = `${K(`I = 2 \\times 1 \\times ${tc(RC, '0.5')}^2 = 0.5\\ \\text{kg m}^2`)} <b style="margin-left:10px">25 ×</b>`;
const th2 = PUC.think($('#th2'), { q: 'Every ball moves twice as far from the axis. Does I become 2 times or 4 times bigger?', opts: ['2 times', '4 times'], right: 1, why: 'r is squared: twice the distance, four times the I.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A light rod has a 1 kg ball 0.2 m from the axis and a 2 kg ball 0.5 m away. It spins at 10 rad/s. Find I and its kinetic energy.';
const wsol = PUC.solution($('#wl'), [
  [K(`I = 1(${tc(RC, '0.2')})^2 + 2(${tc(RC, '0.5')})^2`)],
  [K(`I = 0.04 + 0.5 = 0.54\\ \\text{kg m}^2`)],
  [K(`${K_} = \\tfrac12 I${w_}^2 = \\tfrac12 (0.54)(${tc(VC, '10')})^2`)],
  [K(`${K_} = ${tc(EC, '27\\ \\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 84 });
$('#wl .lbl').style.top = '30px';
const wv = $('#wrS'), WA = [380, 290], WP = 400;
mk(wv, 'circle', { cx: WA[0], cy: WA[1], r: 0.5 * WP, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' }); mk(wv, 'circle', { cx: WA[0], cy: WA[1], r: 0.2 * WP, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
mk(wv, 'line', { x1: WA[0] - 0.2 * WP, y1: WA[1], x2: WA[0] + 0.5 * WP, y2: WA[1], stroke: ROD, 'stroke-width': 7, 'stroke-linecap': 'round' });
const wB1 = ball(wv, 18, ''), wB2 = ball(wv, 24, ''); wB1.set(WA[0] - 0.2 * WP, WA[1]); wB2.set(WA[0] + 0.5 * WP, WA[1]); axisM(wv, WA[0], WA[1], 10);
const wR1 = mk(wv, 'path', { d: `M${WA[0]},${WA[1] + 34} v10 h${-0.2 * WP} v-10`, fill: 'none', stroke: RC, 'stroke-width': 3 }), wR2 = mk(wv, 'path', { d: `M${WA[0]},${WA[1] + 34} v10 h${0.5 * WP} v-10`, fill: 'none', stroke: RC, 'stroke-width': 3 });
const wR1l = txt(wv, WA[0] - 0.1 * WP, WA[1] + 72, '0.2 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 }), wR2l = txt(wv, WA[0] + 0.25 * WP, WA[1] + 72, '0.5 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 });
const wOm = curv(wv, VC, 4); wOm.set(WA[0], WA[1], 46, -150, -40); const wOml = txt(wv, WA[0] + 10, WA[1] - 66, 'ω = 10 rad/s', { fill: VC, 'font-weight': 700, 'font-size': 20 });
txt(wv, WA[0] - 0.2 * WP, WA[1] - 34, '1 kg', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }); txt(wv, WA[0] + 0.5 * WP, WA[1] - 40, '2 kg', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const tW = [wt('W3', 'I'), wt('W4', 'That'), wt('W5', 'K'), wt('W5', 'Twenty')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'r is measured from the centre of the body', right: 'r is the perpendicular distance from the axis' });
const tp = $('#tpS'), TA = [90, 150];
mk(tp, 'line', { x1: TA[0], y1: TA[1], x2: 470, y2: TA[1], stroke: ROD, 'stroke-width': 7, 'stroke-linecap': 'round' });
const tB = ball(tp, 18, ''); tB.set(470, TA[1]); axisM(tp, TA[0], TA[1], 10); mk(tp, 'circle', { cx: 280, cy: TA[1], r: 5, fill: C.dim });
txt(tp, TA[0], TA[1] + 44, 'axis', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600 }); txt(tp, 280, TA[1] + 44, 'centre', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });
const tpW = mk(tp, 'path', { d: `M280,${TA[1] - 30} v-10 H470 v10`, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '5 5' }), tpWl = txt(tp, 375, TA[1] - 52, 'not this', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 19 });
const tpR = mk(tp, 'path', { d: `M${TA[0]},${TA[1] + 64} v10 H470 v-10`, fill: 'none', stroke: RC, 'stroke-width': 3 }), tpRl = txt(tp, 280, TA[1] + 104, 'r: from the axis', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Finding I for a set of point masses, and using K = ½ Iω²' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Four 2 kg balls sit at the corners of a light square frame of side 1 m. Find I about an axis through one corner, at right angles to the square.', qW: 780,
  opts: ['4 kg m²', '6 kg m²', '8 kg m²', '12 kg m²'], right: 2, optW: 300, optY: 336, optH: 90 });
const mqs = $('#mqS'), MQ0 = [60, 80], MQS = 150;
mk(mqs, 'rect', { x: MQ0[0], y: MQ0[1], width: MQS, height: MQS, fill: 'none', stroke: ROD, 'stroke-width': 4 });
[[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([i, j]) => mk(mqs, 'circle', { cx: MQ0[0] + i * MQS, cy: MQ0[1] + j * MQS, r: 13, fill: MC }));
axisM(mqs, MQ0[0], MQ0[1] + MQS, 8);
txt(mqs, MQ0[0] + MQS / 2, MQ0[1] - 22, '1 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 }); txt(mqs, MQ0[0] + MQS + 22, MQ0[1] + MQS / 2 + 6, '1 m', { fill: RC, 'font-weight': 700, 'font-size': 20 });
txt(mqs, MQ0[0] - 14, MQ0[1] + MQS + 40, 'axis', { fill: C.ink2, 'font-weight': 600, 'font-size': 18 });
const so = PUC.solution($('#so'), [['Ball on the axis: r = 0, adds 0'], [K(`2 \\text{ balls}: 2(${tc(RC, '1')})^2 = 2\\ \\text{each}`)], [K(`\\text{far}: 2(${tc(RC, '\\sqrt2')})^2 = 4`)], [K(`I = 0 + 2 + 2 + 4 = 8\\ \\text{kg m}^2`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach((e, i) => { e.style.fontSize = i === 0 ? '' : '25px'; if (i === 0) e.style.font = '500 22px Poppins'; });
const tSo = [wt('A2', 'ball'), wt('A3', 'Two'), wt('A4', 'far'), wt('A4', 'Total')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · moment of inertia', y0: 100, dy: 98, txt: [0, 0, 1, 1],
  lines: [`${K(`I = \\textstyle\\sum ${m_}_i\\,${r_}_i^2`)} <span style="font:500 26px Poppins;color:var(--mute)">&nbsp; unit kg m²</span>`, `${K(`${K_} = \\tfrac12 I${w_}^2`)} <span style="font:500 26px Poppins;color:var(--mute)">&nbsp; like ${K(`\\tfrac12 m v^2`)}</span>`,
    '<b>Depends on</b>: the mass, how it is spread, and the axis', '<b>r</b> = perpendicular distance from the axis, not from the centre'] });
const YQ = ['Why is a ruler harder to spin about its end than its middle?', 'If every mass moves twice as far from the axis, what happens to I?', 'Why is moment of inertia not fixed for a body, the way mass is?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 105', topic: 'Ring vs disc, same mass, same push: Radius of Gyration', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS4 + 0.1, 1.06, 960, 540], [tS6 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const spinRod = (A, P, u1, u2, phi, rd, b1, b2) => { const c = Math.cos(phi), sn = Math.sin(phi), p1 = [A[0] + u1 * P * c, A[1] + u1 * P * sn], p2 = [A[0] + u2 * P * c, A[1] + u2 * P * sn];
  attr(rd, 'x1', p1[0].toFixed(1)); attr(rd, 'y1', p1[1].toFixed(1)); attr(rd, 'x2', p2[0].toFixed(1)); attr(rd, 'y2', p2[1].toFixed(1)); b1.set(...p1); b2.set(...p2); return [p1, p2]; };

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
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const dt = t - tMorph, dA = 70 * M.io(dt / 4);
    attr(door, 'width', (80 * Math.cos(dA * D2R)).toFixed(1));
    attr(mrgI, 'transform', `rotate(${(25 * M.i3(dt / 5) * 3).toFixed(2)} 160 60)`);
    topStr.forEach((l, k) => { const x = 160 + 38 * Math.sin(dt * 14 + k * 2.1), w = Math.cos(dt * 14 + k * 2.1); attr(l, 'x1', x.toFixed(1)); attr(l, 'x2', (160 + (x - 160) * 0.45).toFixed(1)); l.style.opacity = w > 0 ? 1 : 0; });
    vis($('#hjP'), t, wt('H2', 'fight') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    vis(hRul, t, tH3 + 0.3, 1e9, { dy: 0 });
    const end = t >= tHb - 0.2, sh = end ? M.io((t - tHb + 0.2) / 0.4) : 0;
    // about the middle: quick spin; about the end: slow, heavy swing
    const phM = 3.2 * Math.max(0, t - tHa), phE = 1.1 * Math.max(0, t - tHb - 0.3);
    const ph = end ? phM * 0 + (Math.max(0, tHb - 0.2 - tHa) * 3.2) + phE : phM;
    const off = end ? HL / 2 * sh : 0;
    attr(hRulI, 'transform', `translate(${HC[0]},${HC[1]}) rotate(${(ph / D2R).toFixed(2)}) translate(${off.toFixed(1)},0)`);
    attr(hPath, 'r', (HL / 2 + HL / 2 * sh).toFixed(1));
    M.setT(hLab, end ? 'held at one end: hard to swing' : 'held at the middle: spins easily'); vis(hLab, t, tHa - 0.1, 1e9, { dy: 0 }); attr(hLab, 'fill', end ? C.red : C.ok);
    vis($('#hkQ'), t, wt('H4', 'Same') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#lawP'), t, wt('P4', 'equals') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP2 + 0.2, out, { dx: 60, dy: 0, ...o });
    attr(pRotI, 'transform', `rotate(${(30 * Math.max(0, t - tP2)).toFixed(2)} ${PA[0]} ${PA[1]})`);
    PB.forEach((b, i) => M.draw(b.ln, t, wt('P3', 'far') - 0.1 + i * 0.2, 0.5));
    pChips.forEach((c, i) => vis(c, t, wt('P4', 'sum') + i * 0.3, 1e9, { dy: 0 }));
    vis(pNote, t, wt('P4', 'unit'), 1e9, { dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S9'), simIn2 = T0('S10') + 0.15, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const a = aKeys(t), phi = phiAt(t) + Math.PI / 2 + 0.35, u1 = -0.5 - a, u2 = 0.5 - a, I = Iof(a), om = omOf(a) * Math.min(1, rate(t) > 0 || t > tGo ? 1 : 0);
    const [p1, p2] = spinRod(AX, PX, u1, u2, phi, rod, bL, bR);
    vis(bL.o, t, tS1 + 0.5, 1e9, { dy: 0 }); vis(bR.o, t, tS1 + 0.6, 1e9, { dy: 0 }); vis(rod, t, tS1 + 0.4, 1e9, { dy: 0 });
    bigC.style.opacity = M.io((t - tS6) / 0.6).toFixed(3);
    const moving = rate(t) > 0.05;
    [[ghL, u1], [ghR, u2]].forEach(([gh, u]) => gh.forEach((e, j) => { const ph = phiAt(t - (rate(t) < 0.5 ? 0.16 : 0.05) * (j + 1)) + Math.PI / 2 + 0.35, x = AX[0] + u * PX * Math.cos(ph), y = AX[1] + u * PX * Math.sin(ph);
      attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = moving && Math.abs(u) > 0.05 ? [0.3, 0.2, 0.12][j] : 0; }));
    // r and v arrows (freeze, and again after the slide)
    const show = Math.max(t >= tFz - 0.1 && t < tS6 ? M.io((t - wt('S5', 'circle') + 0.1) / 0.4) : 0, M.io((t - wt('S7', 'other') + 0.1) / 0.4) * (t < simOut ? 1 : 0) * (back ? 0 : 1));
    const omNow = omOf(a) * (t < tGo ? 0 : 1);
    [[p1, u1], [p2, u2]].forEach(([p, u], i) => { const r = Math.abs(u), dir = Math.sign(u) || 1, c = Math.cos(phi), sn = Math.sin(phi);
      rA[i].set(AX[0] + dir * 14 * c, AX[1] + dir * 14 * sn, AX[0] + (p[0] - AX[0]) * show - dir * BR * c * show, AX[1] + (p[1] - AX[1]) * show - dir * BR * sn * show);
      const L = 90 * r * omNow * show, tg = [-sn * dir, c * dir]; vA[i].set(p[0], p[1], p[0] + tg[0] * L, p[1] + tg[1] * L);
      const mid = [(AX[0] + p[0]) / 2 + sn * 34 * dir, (AX[1] + p[1]) / 2 - c * 34 * dir]; attr(rL[i], 'x', mid[0].toFixed(1)); attr(rL[i], 'y', (mid[1] + 6).toFixed(1)); M.setT(rL[i], 'r = ' + f2(r)); rL[i].style.opacity = r > 0.05 ? show : 0;
      attr(vL[i], 'x', (p[0] + tg[0] * L + 10).toFixed(1)); attr(vL[i], 'y', (p[1] + tg[1] * L + (tg[1] > 0 ? 22 : -8)).toFixed(1)); M.setT(vL[i], f2(r * omNow) + ' m/s'); vL[i].style.opacity = r > 0.05 ? show : 0; });
    const uo = M.io((t - tGo) / 0.4) * (1 - show); omA.set(AX[0], AX[1], 42, -130, -20); omA.o.style.opacity = uo * 0.9; attr(omL, 'x', AX[0] + 30); attr(omL, 'y', AX[1] - 50); omL.style.opacity = uo;
    vis($('#simP'), t, wt('S10', 'doubled') - 0.2, 1e9, POP);
    vis($('#rdy'), t, tS1 + 0.6, tGo - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS4 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // readout: values from the axis position (I) and K = 1 J (omega = sqrt(2K/I))
    const ar = Math.round(a * 100) / 100, Ir = Iof(ar), omr = t < tGo ? 0 : Math.sqrt(2 * KJ / Ir), rf = 0.5 + ar;
    M.setT($('#roT'), ar < 0.005 ? 'AXIS AT THE MIDDLE' : ar > 0.495 ? 'AXIS AT ONE END' : 'AXIS MOVING'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_r1'), f2(0.5 + ar)); M.setT($('#r_r2'), f2(0.5 - ar)); M.setT($('#r_I'), f3(Ir)); M.setT($('#r_om'), f2(omr)); M.setT($('#r_v'), f2(rf * omr)); M.setT($('#r_K'), t < tGo ? '0.00' : '1.00');
    const hiI = M.io((t - wt('S2', 'So') + 0.1) / 0.3) * (1 - M.io((t - tS3) / 0.3)) + M.io((t - wt('S7', 'now') + 0.1) / 0.3) * (1 - M.io((t - tS8 - 0.5) / 0.3));
    $('#r_I').style.background = mix('#FFFFFF', '#E6E8EE', hiI);
    plotA(gC, a); gDot(a, I, t >= tS2); vis(gGhost, t, tS6, 1e9, { dy: 0 });
    vis($('#th1'), t, tS9 + 0.05, OUT('S10'), { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'fixed') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: tS10 - 0.02, tWhy: wt('S10', 'depends') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.1, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const ph = 0.9 * (t - tD1) - 1.2, bx = DA[0] + DRr * Math.cos(ph), by = DA[1] + DRr * Math.sin(ph);
    attr(dLine, 'x2', bx.toFixed(1)); attr(dLine, 'y2', by.toFixed(1)); attr(dBit, 'cx', bx.toFixed(1)); attr(dBit, 'cy', by.toFixed(1));
    const uv = M.o3((t - wt('D2', 'speed') + 0.1) / 0.5); dV.set(bx, by, bx - Math.sin(ph) * 100 * uv, by + Math.cos(ph) * 100 * uv);
    attr(dRl, 'x', ((DA[0] + bx) / 2 + 12).toFixed(1)); attr(dRl, 'y', ((DA[1] + by) / 2 - 8).toFixed(1)); attr(dVl, 'x', (bx - Math.sin(ph) * 100 + 10).toFixed(1)); attr(dVl, 'y', (by + Math.cos(ph) * 100 + 6).toFixed(1)); dVl.style.opacity = uv;
    dOm.set(DA[0], DA[1], 44, -40, 60); vis(dOm.o, t, tD1 + 0.8, 1e9, { dy: 0 }); vis(dOml, t, tD1 + 0.9, 1e9, { dy: 0 });
    vis($('#dres'), t, T0('D6') + 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'turning') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'equals') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ph = 2 * Math.max(0, t - tR1 - 0.8) * 0.5 - 1.0;   // shown at 0.5x so the arrows are readable
    const [m1, m2] = spinRod(RCM, RP, -0.5, 0.5, ph, rRodM, rB[0], rB[1]), [e1, e2] = spinRod(RCE, RP, 0, 1, ph, rRodE, rB[2], rB[3]);
    const uv = M.o3((t - wt('R3', 'speed') + 0.1) / 0.5), tg = [-Math.sin(ph), Math.cos(ph)];
    rV[0].set(m1[0], m1[1], m1[0] - tg[0] * 50 * uv, m1[1] - tg[1] * 50 * uv); rV[1].set(m2[0], m2[1], m2[0] + tg[0] * 50 * uv, m2[1] + tg[1] * 50 * uv); rV[2].set(e2[0], e2[1], e2[0] + tg[0] * 100 * uv, e2[1] + tg[1] * 100 * uv);
    vis(rT[0], t, wt('R3', 'speed'), 1e9, { dy: 0 }); vis(rT[1], t, wt('R3', 'speed') + 0.2, 1e9, { dy: 0 }); vis(rT[2], t, wt('R4', 'squared') - 0.1, 1e9, { dy: 0 }); vis(rT[3], t, wt('R4', 'squared'), 1e9, { dy: 0 });
    avD(t, wt('R5', 'moment') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    KS.forEach((q, i) => { const ph = 1.0 * Math.max(0, t - (i ? tK2 : tK1) - 0.5); spinRod(q.A, q.P, -q.r, q.r, ph, q.rd, q.b1, q.b2); });
    vis($('#khP'), t, wt('K1', 'point', 1) - 0.2, 1e9, POP); vis($('#klP'), t, wt('K2', 'point') - 0.2, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: tK4 - 0.02, tWhy: wt('K4', 'squared') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis(wR1, t, wt('W2', 'point') - 0.1, 1e9, { dy: 0 }); vis(wR1l, t, wt('W2', 'point'), 1e9, { dy: 0 }); vis(wR2, t, wt('W2', 'point', 1) - 0.1, 1e9, { dy: 0 }); vis(wR2l, t, wt('W2', 'point', 1), 1e9, { dy: 0 });
    vis(wOm.o, t, wt('W2', 'spins') - 0.1, 1e9, { dy: 0 }); vis(wOml, t, wt('W2', 'spins'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'measure') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'perpendicular') - 0.2 });
    vis(tpW, t, wt('X2', 'centre') - 0.1, 1e9, { dy: 0 }); vis(tpWl, t, wt('X2', 'centre'), 1e9, { dy: 0 }); vis(tpR, t, wt('X3', 'axis') - 0.1, 1e9, { dy: 0 }); vis(tpRl, t, wt('X3', 'axis'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'finding') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    vis($('#mqS'), t, wt('Q1', 'square') - 0.1, 1e9, { dy: 16 });
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
