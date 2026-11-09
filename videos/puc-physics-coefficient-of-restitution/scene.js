// PUC Physics Ep 89: Coefficient of restitution (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', EC = C.teal, LC = '#8A93A6', HC = C.violet, EK = C.ink;   // momentum plum, K teal, lost grey, height h violet, e ink
const FC = C.orange, VC = C.ac, GC = C.red, MC = C.ink, CB = '#5B6B8C';
const BC = ['#2F3A57', '#8D7FB8', '#C9A27A'];                                      // rubber, cloth, dough
const G = 9.8, H0 = 1, V0 = Math.sqrt(2 * G * H0), TF = Math.sqrt(2 * H0 / G), ES = [0.9, 0.6, 0];
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

/* a ball dropped from H0 onto a still floor with coefficient e (instant contact). tau in sim seconds.
   Returns height y (m), velocity v (m/s, up +), bounces so far n, last vin/vout, and the time since the last contact. */
const bounce = (e, tau) => {
  if (tau <= TF) return { y: H0 - 0.5 * G * tau * tau, v: -G * tau, n: 0, vin: 0, vout: 0, sc: tau - TF };
  let acc = TF, k = 1, Vk = e * V0;
  while (true) {
    const Tk = 2 * Vk / G;
    if (Vk < 0.05) return { y: 0, v: 0, n: k, vin: Vk / (e || 1) || V0, vout: Vk, sc: tau - acc, rest: true };
    if (tau - acc < Tk) { const s = tau - acc; return { y: Vk * s - 0.5 * G * s * s, v: Vk - G * s, n: k, vin: Vk / e, vout: Vk, sc: s }; }
    acc += Tk; k++; Vk *= e;
  }
};
// a ball that flattens for a moment at each contact (dough stays flat)
const ballG = (p, col, R) => { const o = mk(p, 'g', {}), e = mk(o, 'ellipse', { fill: col }), hl = mk(o, 'ellipse', { fill: '#fff', opacity: 0.2 });
  return { o, set(cx, yb, sq) { const rx = R * (1 + 0.45 * sq), ry = R * (1 - 0.45 * sq), cy = yb - ry; attr(e, 'cx', cx); attr(e, 'cy', cy.toFixed(1)); attr(e, 'rx', rx.toFixed(1)); attr(e, 'ry', ry.toFixed(1)); attr(hl, 'cx', (cx - rx * 0.35).toFixed(1)); attr(hl, 'cy', (cy - ry * 0.4).toFixed(1)); attr(hl, 'rx', (rx * 0.3).toFixed(1)); attr(hl, 'ry', (ry * 0.22).toFixed(1)); } };
};
const squash = (e, q) => e === 0 && q.n > 0 ? 1 : (q.n > 0 && q.sc >= 0 && q.sc < 0.045 ? 1 - q.sc / 0.045 : (q.sc < 0 && q.sc > -0.02 ? 1 + q.sc / 0.02 : 0));

Object.assign(M.IC, {
  ball: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
  splat: ['M4 17c2-1 3-3 8-3s6 2 8 3', 'M3 20h18'],
  bounce: ['M3 20h18', 'M5 18c1-6 3-10 4-10s2 4 3 10c1-4 2-6 3-6s2 2 3 6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bounce', 'Rubber ball', 'BOUNCES BACK HIGH', 0.9], ['bounce', 'Cricket ball', 'BOUNCES LESS', 0.5], ['splat', 'Lump of dough', 'GOES SPLAT', 0]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'rubber'), wt('H1', 'cricket'), wt('H1', 'dough')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="100"></svg></div>`).join('');
// mini height-time traces drawn on (x: 0..2.4 s, y: 0..1 m)
const JT = JOBS.map(([, , , e], i) => { const sv = $('#jsv' + i); mk(sv, 'line', { x1: 14, y1: 88, x2: 290, y2: 88, stroke: C.ink, 'stroke-width': 2.5 }); const p = mk(sv, 'path', { fill: 'none', stroke: HC, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); let d = ''; for (let k = 0; k <= 120; k++) { const ta = 2.4 * k / 120, q = bounce(e, ta); d += (k ? 'L' : 'M') + (20 + ta * 110).toFixed(1) + ',' + (88 - 70 * q.y).toFixed(1); } attr(p, 'd', d); return p; });
const hs = $('#hkS'), HF = 500, HPX = 300, HL = [460, 580, 700];   // hook: 1 m = 300 px, floor at y 500
ground(hs, 300, 748, HF);
mk(hs, 'line', { x1: 330, y1: HF - HPX, x2: 740, y2: HF - HPX, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0.5 });
txt(hs, 318, HF - HPX + 6, '1 m', { 'text-anchor': 'end', fill: HC, 'font-weight': 600 });
const HB = BC.map((c, i) => ballG(hs, c, 22));
const HPK = [[0.81, '81 cm'], [0.36, '36 cm'], [0, '0 cm']].map(([h, s], i) => { const g = mk(hs, 'g', {}), go = mk(g, 'g', {}); mk(go, 'line', { x1: HL[i] - 34, y1: HF - h * HPX, x2: HL[i] + 34, y2: HF - h * HPX, stroke: HC, 'stroke-width': 3 }); txt(go, HL[i] + (h ? 0 : 44), HF - h * HPX - (h ? 12 : 8), s, { 'text-anchor': h ? 'middle' : 'start', fill: HC, 'font-weight': 700, 'font-size': 20 }); return g; });
['rubber', 'cloth', 'dough'].forEach((n, i) => txt(hs, HL[i], HF + 64, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }));
const tHd = wt('H3', 'drops') + 0.3, tPk = [wt('H4', 'eighty'), wt('H4', 'thirty'), wt('H4', 'zero')];

/* ---------- P ---------- */
const QR = [['e', EK, 'Restitution = giving back', 'how much speed does a hit give back?'], ['←→', VC, 'Speed of separation', 'how fast they move apart (after)'], ['→←', VC, 'Speed of approach', 'how fast they come together (before)']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="height:116px;top:${84 + i * 128}px"><div class="qs" style="color:${c};top:24px;${i ? 'font:700 40px Poppins;font-style:normal;top:34px' : ''}">${s}</div><div class="qn" style="top:20px">${n}</div><div class="qd" style="top:66px">${d}</div></div>`).join('');
$('#lawP').innerHTML = `<i>e</i> = separation speed ÷ approach speed<span style="margin-left:auto;font:600 18px IBM Plex Mono;color:#C9CDD8">NO UNIT</span>`;
const tQr = [tP1, wt('P2', 'separation') - 0.1, wt('P2', 'approach') - 0.1];
const pm = $('#pmS'); ground(pm, 36, 748, 230); ground(pm, 36, 748, 470);
txt(pm, 40, 110, 'BEFORE', { 'font-size': 17, 'font-weight': 600 }); txt(pm, 40, 350, 'AFTER', { 'font-size': 17, 'font-weight': 600 });
const pBa = [mk(pm, 'circle', { cx: 300, cy: 194, r: 36, fill: MC }), mk(pm, 'circle', { cx: 480, cy: 194, r: 36, fill: CB }), mk(pm, 'circle', { cx: 300, cy: 434, r: 36, fill: MC }), mk(pm, 'circle', { cx: 480, cy: 434, r: 36, fill: CB })];
const pAr = [[300, 130, 5], [480, 130, -3], [300, 370, -1], [480, 370, 3]].map(([x, y, v]) => { const a = PUC.arrow(pm, VC, 6, 18), l = txt(pm, x + (v > 0 ? -12 : 12), y + 7, Math.abs(v) + ' m/s', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': v > 0 ? 'end' : 'start' }); return { a, l, x, y, v }; });
const pS0 = txt(pm, 392, 290, 'approach: 5 + 3 = 8 m/s', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 }), pS1 = txt(pm, 392, 530, 'separation: 1 + 3 = 4 m/s', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 });
const pE = txt(pm, 748, 350, 'e = 4 / 8 = 0.5', { 'text-anchor': 'end', fill: EK, 'font-weight': 700, 'font-size': 24 });

/* ---------- S: the drop test ---------- */
const s = $('#simS'), FY = 470, PX = 340, LX = [270, 440, 610], R = 22, PV = 20;
ground(s, 120, 748, FY);
// height ruler (m) on the left
mk(s, 'line', { x1: 90, y1: FY, x2: 90, y2: FY - PX, stroke: C.ink, 'stroke-width': 2.5 });
for (let c = 0; c <= 10; c++) { const y = FY - PX * c / 10; mk(s, 'line', { x1: 90, y1: y, x2: 90 + (c % 5 ? 10 : 18), y2: y, stroke: C.ink, 'stroke-width': 2 }); if (c % 5 === 0) txt(s, 80, y + 6, (c / 10).toFixed(1).replace('.0', ''), { 'text-anchor': 'end', 'font-size': 16, fill: HC, 'font-weight': 600 }); }
txt(s, 80, FY - PX - 20, 'h (m)', { 'text-anchor': 'end', 'font-size': 15, fill: HC });
mk(s, 'line', { x1: 120, y1: FY - PX, x2: 748, y2: FY - PX, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0.45 });
const PKL = [0.81, 0.36].map((h, i) => { const g = mk(s, 'g', {}), go = mk(g, 'g', {}); mk(go, 'line', { x1: LX[i] - 40, y1: FY - PX * h, x2: LX[i] + 40, y2: FY - PX * h, stroke: HC, 'stroke-width': 3 }); txt(go, LX[i] + 46, FY - PX * h + 6, Math.round(h * 100) + ' cm', { fill: HC, 'font-weight': 700, 'font-size': 18 }); return g; });
const LBL = ['rubber', 'cloth', 'dough'].map((n, i) => { const g = mk(s, 'g', {}); txt(g, LX[i], FY + 34, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 19 }); txt(g, LX[i], FY + 60, 'e = ' + ES[i], { 'text-anchor': 'middle', fill: EK, 'font-weight': 700, 'font-size': 19 }); return g; });
const GH = [0, 1, 2].map(() => mk(s, 'circle', { r: R, fill: BC[0], opacity: 0 }));
const SB = BC.map(c => ballG(s, c, R));
const aV = PUC.arrow(s, VC, 6, 18), lV = txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const aIn = PUC.arrow(s, VC, 6, 18), aOut = PUC.arrow(s, VC, 6, 18), lIn = txt(s, 0, 0, 'in: 4.43 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 }), lOut = txt(s, 0, 0, 'out: 3.98 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const lLost = txt(s, 434, 150, 'a little energy stays as heat + sound', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 20 });
// timelines
const tDR = wt('S2', 'hits') - TF, tFz = wt('S5', 'floor') + 0.05, tRA = TF - 0.25 * (tFz - tS5), tRes = tS7 + 0.1, tDC = wt('S8', 'rises') - 0.55, tDD = wt('S9', 'hits') - TF;
const tauR = t => { if (t < tS5) return M.clamp(t - tDR, 0, 9); if (t < tFz) return tRA + 0.25 * (t - tS5); if (t < tRes) return TF; const sl = 0.6; return t < tRes + sl ? TF + 0.25 * (t - tRes) : Math.min(9, TF + 0.15 + (t - tRes - sl)); };
const replay = t => t >= tS5 && t < tRes + 0.6, frozen = t => t >= tFz && t < tRes;
const tauB = (i, t) => i === 0 ? tauR(t) : M.clamp(t - (i === 1 ? tDC : tDD), 0, 9);
const focus = t => t >= tDD - 0.6 ? 2 : t >= tS8 ? 1 : 0;
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${HC}">h</span><span class="v" id="r_h" style="color:${HC}">1.00</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v<sub>in</sub></span><span class="v" id="r_i" style="color:${VC}">-</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>out</sub></span><span class="v" id="r_o" style="color:${VC}">-</span><span class="u">m/s</span>
  <span class="k" style="color:${EK};font-weight:700">e</span><span class="v" id="r_e" style="color:${EK}">-</span><span class="u">out ÷ in</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 4, ymin: 0, ymax: 1, xt: [0, 1, 2, 3, 4], yt: [0, 0.36, 0.81, 1], xl: 't (s)', yl: 'h (m)' });
const GP = BC.map((c, i) => mk(gs, 'path', { d: '', fill: 'none', stroke: [HC, '#B49DF0', '#C9A27A'][i], 'stroke-width': i ? 4 : 5, 'stroke-dasharray': i === 1 ? '8 5' : '', 'stroke-linecap': 'round' }));
const GD = [HC, '#B49DF0', '#C9A27A'].map(c => g.dot(c, 9));
$('#leg').innerHTML = [[HC, '', 'rubber'], ['#B49DF0', '8 5', 'cloth'], ['#C9A27A', '', 'dough']].map(([c, da, n]) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="5" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const pathB = (e, s1) => { let d = ''; const n = Math.max(2, Math.round(140 * s1 / 4)); for (let k = 0; k <= n; k++) { const x = s1 * k / n; d += (k ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(bounce(e, x).y).toFixed(1); } return d; };
const NM = ['RUBBER', 'CLOTH', 'DOUGH'];

/* ---------- D ---------- */
const hh = tc(HC, 'h'), h1 = tc(HC, 'h_1'), vv = tc(VC, 'v'), gg = tc(GC, 'g'), ee = tc(EK, 'e');
const STEPS = [[`${vv} = \\sqrt{2${gg}${hh}}`, 'speed when it reaches the floor'],
  [`${tc(VC, 'v_{\\text{out}}')} = ${ee}\\,${vv}`, 'the floor gives back a share e of the speed'],
  [`${ee}\\,${vv} = \\sqrt{2${gg}${h1}}`, 'that speed carries it up to h₁'],
  [`${ee} = \\sqrt{\\dfrac{${h1}}{${hh}}} \\;\\Rightarrow\\; ${h1} = ${ee}^2\\,${hh}`, 'divide step 3 by step 1']];
const SY = [90, 196, 302, 420];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="left:auto;right:0;top:12px">${w}</div></div>`).join('') + `<div class="pillp ac" id="dChk" style="left:36px;top:520px;height:44px;font-size:22px">Rubber: 0.9² = 0.81, so 1 m → 81 cm</div>`;
const tStep = [wt('D2', 'Falling'), wt('D3', 'bounces'), wt('D4', 'rises'), wt('D5', 'Divide')];
const dp = $('#dpS'), DF = 420, DPX = 300; ground(dp, 20, 504, DF);
const dH = PUC.arrow(dp, HC, 4, 14), dH1 = PUC.arrow(dp, HC, 4, 14), dVi = PUC.arrow(dp, VC, 6, 18), dVo = PUC.arrow(dp, VC, 6, 18);
const dB0 = mk(dp, 'circle', { cx: 170, cy: DF - DPX - 20, r: 20, fill: BC[0] }), dB1 = mk(dp, 'circle', { cx: 360, cy: DF - 0.81 * DPX - 20, r: 20, fill: BC[0], opacity: 0.5 });
const dTx = [txt(dp, 100, DF - DPX / 2, 'h', { fill: HC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, 'text-anchor': 'end' }), txt(dp, 436, DF - 0.81 * DPX / 2, 'h₁', { fill: HC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30 }),
  txt(dp, 200, DF - 70, 'v', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28 }), txt(dp, 290, DF - 70, 'ev', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, 'text-anchor': 'end' })];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ee} = \\dfrac{${tc(VC, 'v_2')} - ${tc(VC, 'v_1')}}{${tc(VC, 'u_1')} - ${tc(VC, 'u_2')}} \\qquad 0 \\le ${ee} \\le 1`);

/* ---------- R ---------- */
const LK = [[`${K(`${ee} = 1`)}: part as fast as they met, ${K(tc(EC, 'K'))} kept`, 'ELASTIC', C.ok], [`${K(`${ee} = 0`)}: they do not part at all, they stick`, 'PERFECTLY INELASTIC', C.red], [`${K(`0 < ${ee} < 1`)}: some bounce, some ${K(tc(EC, 'K'))} lost`, 'INELASTIC', C.ink2]];
$('#lks').innerHTML = LK.map(([h, tg, col], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 128};height:112px;top:${84 + i * 128}px"><div class="n" style="top:33px">${i + 1}</div><div class="lt" style="height:70px">${h}</div><div class="tag" style="left:86px;top:66px;background:${col}">${tg}</div></div>`).join('');
const tLk = [wt('R2', 'e'), wt('R3', 'e'), wt('R4', 'Between')];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'So my dough ball is e = 0!' });
const rr = $('#rrS'), SX0 = 90, SX1 = 694, SYc = 250, SXv = e => SX0 + (SX1 - SX0) * e;
const rBand = [mk(rr, 'rect', { x: SX0, y: SYc - 18, width: SX1 - SX0, height: 36, rx: 18, fill: C.soft })];
const rFill = mk(rr, 'rect', { x: SX0, y: SYc - 18, height: 36, rx: 18, fill: C.ac2 });
[0, 0.5, 1].forEach(v => txt(rr, SXv(v), SYc + 56, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }));
const RM = [[0, 'dough', BC[2]], [0.6, 'cloth', BC[1]], [0.9, 'rubber', BC[0]]].map(([e, n, c]) => { const gq = mk(rr, 'g', {}), go = mk(gq, 'g', {}); mk(go, 'circle', { cx: SXv(e), cy: SYc, r: 16, fill: c, stroke: '#fff', 'stroke-width': 3 }); txt(go, SXv(e), SYc - 34, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 19 }); return gq; });
const RZ = [[1, 'ELASTIC', C.ok, SX1, 'end'], [0, 'PERFECTLY INELASTIC', C.red, SX0, 'start'], [0.5, 'INELASTIC: MOST REAL HITS', C.ink2, 392, 'middle']].map(([e, n, c, x, an]) => { const gq = mk(rr, 'g', {}), go = mk(gq, 'g', {}); txt(go, x, SYc + (e === 0.5 ? 150 : 100), n, { 'text-anchor': an, fill: c, 'font-weight': 700, 'font-size': 18 }); return gq; });
const rPtr = mk(rr, 'path', { d: '', fill: C.ink });
txt(rr, 392, 500, 'e = speed apart ÷ speed of approach', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 20 });

/* ---------- K: side by side ---------- */
// wall: ball at 10 m/s in, 5 out (24 px per metre). carts: equal masses, 6 & 2 in, 3 & 5 out (36 px per metre)
const kw = $('#khS'), KY = 250; ground(kw, 36, 680, KY); mk(kw, 'rect', { x: 680, y: 80, width: 24, height: KY - 80 + 2, fill: C.ink2 });
const kBall = mk(kw, 'circle', { r: 26, cy: KY - 26, fill: BC[0] }), kVa = PUC.arrow(kw, VC, 6, 18), kVl = txt(kw, 0, KY - 92, '', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const kc = $('#klS'); ground(kc, 36, 748, KY);
const kCa = mk(kc, 'g', {}), kCb = mk(kc, 'g', {});
[[kCa, MC, 'A'], [kCb, CB, 'B']].forEach(([gq, col, lb]) => { mk(gq, 'rect', { x: 0, y: KY - 68, width: 100, height: 48, rx: 8, fill: col }); txt(gq, 50, KY - 37, lb, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 }); [22, 78].forEach(x => mk(gq, 'circle', { cx: x, cy: KY - 13, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 })); });
const kAa = PUC.arrow(kc, VC, 6, 18), kAb = PUC.arrow(kc, VC, 6, 18), kLa = txt(kc, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' }), kLb = txt(kc, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' });
const ramp = (u, v, th, D, tau) => tau < th ? u * tau : tau < th + D ? u * th + u * (tau - th) + 0.5 * (v - u) / D * (tau - th) ** 2 : u * th + (u + v) / 2 * D + v * (tau - th - D);
const velR = (u, v, th, D, tau) => u + (v - u) * M.clamp((tau - th) / D);
$('#khV').innerHTML = `<span id="kh0">approach 10</span><span id="kh1">apart 5</span>`;
$('#klV').innerHTML = `<span id="kl0">approach 6 - 2 = 4</span><span id="kl1">apart 5 - 3 = 2</span>`;
$('#khP').innerHTML = K(`${ee} = \\dfrac{5}{10} = 0.5`); $('#klP').innerHTML = K(`${ee} = \\dfrac{5 - 3}{6 - 2} = 0.5`);
const tKw = wt('K1', 'hits') - 0.7, tKc = wt('K2', 'After') - 0.7;
const th1 = PUC.think($('#th1'), { q: 'A ball hits the floor and rises to one quarter of its drop height. What is e?', opts: ['One quarter', 'One half'], right: 1, why: 'Height goes as e²: (1/2)² = 1/4, so e = 1/2.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A 2 kg ball at 6 m/s hits a still 1 kg ball, head on. e = 0.5. Find both velocities.';
const v1 = tc(VC, 'v_1'), v2 = tc(VC, 'v_2');
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(PC, 'p')}: \\; 12 = 2${v1} + ${v2}`)],
  [K(`${ee}: \\; ${v2} - ${v1} = 0.5 \\times 6 = 3`)],
  [K(`3${v1} + 3 = 12 \\;\\Rightarrow\\; ${v1} = ${tc(VC, '3')},\\; ${v2} = ${tc(VC, '6')}\\,\\text{m/s}`)],
  [K(`${tc(EC, 'K')}: 36 \\to 9 + 18 = 27\\,\\text{J}\\;\\; (9\\,\\text{J lost})`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 92 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 300, WPX = 30; ground(w, 36, 748, WY);
const wA = mk(w, 'circle', { r: 40, cy: WY - 40, fill: MC }), wB = mk(w, 'circle', { r: 30, cy: WY - 30, fill: CB });
const wAt = txt(w, 0, WY - 33, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 18 }), wBt = txt(w, 0, WY - 24, '1 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 16 });
const wvA = PUC.arrow(w, VC, 6, 18), wvB = PUC.arrow(w, VC, 6, 18), wlA = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' }), wlB = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const wTag = txt(w, 748, 110, '', { 'text-anchor': 'end', fill: C.ink2, 'font-weight': 700, 'font-size': 18 });
$('#wtb').innerHTML = `<span class="h" style="text-align:left"></span><span class="h">BEFORE</span><span class="h">AFTER</span>
  <span style="text-align:left;color:${PC};font-style:italic;font-family:Poppins">p</span><span id="wp0" style="color:${PC}">12</span><span id="wp1" style="color:${PC}">6 + 6</span>
  <span style="text-align:left;color:${EC};font-style:italic;font-family:Poppins">K</span><span id="wk0" style="color:${EC}">36 J</span><span id="wk1" style="color:${EC}">9 + 18 J</span>`;
const tW = [wt('W3', 'Momentum'), wt('W4', 'Restitution'), wt('W5', 'Put'), wt('W6', 'Check')];
const tWgo = wt('W2', 'hits') - 0.6;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'e = one ball\'s speed after ÷ its speed before', right: 'e = speed apart ÷ speed of approach (relative speeds)' });
const tp = $('#tpS'), tpH = txt(tp, 20, 52, 'WHEN DOES "AFTER ÷ BEFORE" WORK?', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 });
const tpr = [['floor stays still', 'v_out ÷ v_in works', C.ok], ['both bodies move', 'use relative speeds', C.red]].map(([a, b, col], i) => { const gq = mk(tp, 'g', {}), y = 112 + i * 76; txt(gq, 20, y, a, { fill: C.ink, 'font-weight': 600, 'font-size': 22 }); mk(gq, 'rect', { x: 268, y: y - 28, width: 290, height: 40, rx: 8, fill: col }); txt(gq, 413, y - 1, b, { fill: '#fff', 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' }); return gq; });
const where = PUC.where($('#wa'), { on: [], type: 'Bouncing ball numericals, heights after many bounces, two equation collision problems' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A ball is dropped from 5 m. e = 0.5. What total distance does it travel before it comes to rest?', qW: 780,
  opts: ['6.25 m', '8.33 m', '10 m', '15 m'], right: 1, optY: 290, optH: 96 });
const so = PUC.solution($('#so'), [
  [K(`\\text{first fall: } 5\\,\\text{m}`)], [K(`\\text{rises: } 1.25 + 0.3125 + \\dots = \\tfrac53\\,\\text{m}`)],
  [K(`\\text{up and down: } 2 \\times \\tfrac53 = 3.33\\,\\text{m}`)], [K(`\\text{total} = 5 + 3.33 = 8.33\\,\\text{m}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '22px');
const tSo = [wt('A2', 'first'), wt('A3', 'rises'), wt('A4', 'Up'), wt('A4', 'Add')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · coefficient of restitution', y0: 100, dy: 104, txt: [0, 0, 1, 1],
  lines: [K(`${ee} = \\dfrac{${v2} - ${v1}}{${tc(VC, 'u_1')} - ${tc(VC, 'u_2')}} = \\dfrac{\\text{speed apart}}{\\text{speed of approach}}`),
    K(`\\text{floor: } ${tc(VC, 'v_{\\text{out}}')} = ${ee}\\,${tc(VC, 'v_{\\text{in}}')} \\qquad ${h1} = ${ee}^2\\,${hh}`),
    '<i>e</i> = 1 elastic · <i>e</i> = 0 perfectly inelastic · between: inelastic', '<b>Two unknowns?</b> Use momentum + <i>e</i>: two equations'] });
const YQ = ['Why does a lump of dough not bounce at all?', 'What does e = 1 tell you about a collision?', 'A ball hits a floor at 10 m/s, and e = 0.6. How fast does it leave?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 90', topic: 'An off-centre carrom shot: why do they fly apart at an angle?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS8 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw(JT[i], t, tMorph + 0.6 + i * 0.3, 1.2, M.o3); });
    vis($('#hjP'), t, wt('H2', 'different') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    HB.forEach((b, i) => { const q = bounce(ES[i], Math.max(0, t - tHd)); b.set(HL[i], HF - q.y * HPX, squash(ES[i], q)); vis(b.o, t, wt('H3', ['rubber', 'cloth', 'dough'][i]) - 0.2, 1e9, { dy: 0 }); });
    HPK.forEach((p, i) => vis(p, t, tPk[i] - 0.1, 1e9, { dy: 0 }));
    vis($('#hkQ'), t, wt('H4', 'number') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#lawP'), t, tP3 + 0.2, 1e9, POP);
    vis($('#pm'), t, tP2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exP'), t, tP2 + 0.3, 1e9, { dy: 8 });
    const ub = M.o3((t - tQr[2]) / 0.5), ua = M.o3((t - tQr[1]) / 0.5);
    pBa.forEach((b, i) => vis(b, t, i < 2 ? tQr[2] - 0.2 : tQr[1] - 0.2, 1e9, { dy: 0 }));
    pAr.forEach((q, i) => { const u = i < 2 ? ub : ua; q.a.set(q.x, q.y, q.x + q.v * 18 * u, q.y); q.l.style.opacity = u.toFixed(3); });
    vis(pS0, t, tQr[2] + 0.6, 1e9, { dy: 6 }); vis(pS1, t, tQr[1] + 0.6, 1e9, { dy: 6 }); vis(pE, t, wt('P3', 'divided') - 0.1, 1e9, { dy: 6 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const fi = focus(t), Q = [0, 1, 2].map(i => bounce(ES[i], tauB(i, t)));
    SB.forEach((b, i) => { b.set(LX[i], FY - Q[i].y * PX, squash(ES[i], Q[i])); vis(b.o, t, [tS1 + 0.5, tS8, tS9][i], 1e9, { dy: 0 }); });
    LBL.forEach((l, i) => vis(l, t, [tS1 + 0.6, tS8 + 0.1, tS9 + 0.1][i], 1e9, { dy: 0 }));
    PKL.forEach((p, i) => vis(p, t, i ? wt('S8', 'thirty') - 0.1 : wt('S4', 'eighty') - 0.1, 1e9, { dy: 0 }));
    // ghosts of the focus ball, in sim time
    const tf = tauB(fi, t), qf = Q[fi], mv = !frozen(t) && tf > 0.02 && !qf.rest && !(fi === 2 && qf.n > 0), gstep = replay(t) && fi === 0 ? 0.02 : 0.05;
    GH.forEach((e, j) => { const qq = bounce(ES[fi], Math.max(0, tf - gstep * (j + 1))); attr(e, 'cx', LX[fi]); attr(e, 'cy', (FY - qq.y * PX - R).toFixed(1)); attr(e, 'fill', BC[fi]); e.style.opacity = mv && Math.abs(qq.y - qf.y) * PX > 4 ? [0.3, 0.2, 0.12][j] : 0; });
    // live velocity arrow on the focus ball (blue, up is +)
    const by = FY - qf.y * PX - R, vOn = M.o3((t - (fi ? [0, tS8, tS9][fi] : T0('S2') - 1)) / 0.4) * (frozen(t) ? 0 : 1);
    aV.set(LX[fi] + 40, by, LX[fi] + 40, by - PV * qf.v * vOn); attr(lV, 'x', LX[fi] + 52); attr(lV, 'y', (by - PV * qf.v * 0.5 + 6).toFixed(1)); M.setT(lV, Math.abs(qf.v).toFixed(2) + ' m/s'); lV.style.opacity = Math.abs(qf.v) > 0.3 ? vOn : 0;
    // freeze at the floor: in and out arrows
    const ui = frozen(t) || (t >= tS6 && t < tS8 - 0.4) ? M.o3((t - wt('S6', 'Coming') + 0.1) / 0.5) : 0, uo = t >= tS6 && t < tS8 - 0.4 ? M.o3((t - wt('S6', 'Going') + 0.1) / 0.5) : 0;
    const fx = LX[0] - 60, fyb = FY - R;
    aIn.set(fx, fyb - 110 * ui - 10, fx, fyb - 10); attr(lIn, 'x', fx); attr(lIn, 'y', fyb - 136); attr(lIn, 'text-anchor', 'middle'); lIn.style.opacity = ui;
    aOut.set(fx + 120, fyb - 10, fx + 120, fyb - 10 - 98 * uo); attr(lOut, 'x', fx + 134); attr(lOut, 'y', fyb - 100); lOut.style.opacity = uo; M.hide(aIn.g, ui < 0.01); M.hide(aOut.g, uo < 0.01);
    vis(lLost, t, wt('S7', 'little') - 0.1, tS8 - 0.3, { dy: 6 });
    vis($('#smo'), t, tS5 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.6, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // readout follows the focus ball: round t first, then compute from it
    const tr = Math.round(tf * 100) / 100, qr = bounce(ES[fi], tr);
    M.setT($('#roT'), NM[fi]); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_h'), f2(qr.y)); M.setT($('#r_v'), f2(qr.v));
    const hit = qr.n > 0, vi1 = V0, vo1 = ES[fi] * V0; M.setT($('#r_i'), hit ? f2(vi1) : '-'); M.setT($('#r_o'), hit ? f2(vo1) : '-'); M.setT($('#r_e'), hit ? f2(vo1 / vi1) : '-');
    $('#r_e').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('S3', 'Zero')) / 0.3) * (1 - M.io((t - tS4) / 0.3)));
    [0, 1, 2].forEach(i => { const ti = Math.min(4, tauB(i, t)), on = t >= [tS1 + 0.5, tS8, tS9][i] && tauB(i, t) > 0; attr(GP[i], 'd', on ? pathB(ES[i], ti) : ''); GD[i](ti, bounce(ES[i], ti).y, on && tauB(i, t) <= 4); });
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 14).toFixed(1) + 'px'; hb.style.height = (t > tStep[3] - 0.1 ? 104 : 80) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const u0 = M.o3((t - tStep[0] + 0.1) / 0.5), u1 = M.o3((t - tStep[1] + 0.1) / 0.5), u2 = M.o3((t - tStep[2] + 0.1) / 0.5);
    dH.set(116, DF, 116, DF - DPX * u0); dVi.set(200, DF - 150, 200, DF - 150 + 110 * u0);
    dVo.set(300, DF - 40, 300, DF - 40 - 99 * u1); dH1.set(420, DF, 420, DF - 0.81 * DPX * u2);
    vis(dB0, t, tD1 + 0.6, 1e9, { dy: 0 }); vis(dB1, t, tStep[2], 1e9, { dy: 0 });
    dTx.forEach((e, i) => e.style.opacity = [u0, u2, u0, u1][i]);
    vis($('#dChk'), t, wt('D6', 'For') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'speed') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'lies') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ev = M.track(0.5, [[tLk[0], 1, M.SOFT], [tLk[1], 0, M.SOFT], [tLk[2], 0.6, M.SOFT]])(t), px = SXv(M.clamp(ev));
    attr(rPtr, 'd', `M${px.toFixed(1)},${SYc - 60} l-12,-20 h24 Z`); vis(rPtr, t, tR1 + 0.9, 1e9, { dy: 0 });
    attr(rFill, 'width', Math.max(36, px - SX0 + 18).toFixed(1));
    RM.forEach((m, i) => vis(m, t, tLk[2] + 0.6 + i * 0.3, 1e9, { dy: 0 }));
    RZ.forEach((z, i) => vis(z, t, tLk[i] + 0.4, 1e9, { dy: 0 }));
    avD(t, wt('R4', 'lives') + 0.3, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#exK1'), t, tK1 + 0.5, 1e9, { dy: 8 }); vis($('#exK2'), t, tK2 + 0.3, 1e9, { dy: 8 });
    { const tau = M.clamp(t - tKw, 0, 3), th = 0.7, x0 = 680 - 26 - 24 * 10 * th, x = x0 + 24 * ramp(10, -5, th, 0.08, tau), v = velR(10, -5, th, 0.08, tau);
      attr(kBall, 'cx', x.toFixed(1)); kVa.set(x, KY - 70, x + 9 * v, KY - 70); attr(kVl, 'x', (x + 4.5 * v).toFixed(1)); M.setT(kVl, Math.abs(v).toFixed(0) + ' m/s'); kVl.style.opacity = Math.abs(v) > 0.5 ? 1 : 0; }
    { const tau = M.clamp(t - tKc, 0, 3), th = 0.7, xa0 = 50, xb0 = xa0 + 100 + 36 * (6 - 2) * th, xa = xa0 + 36 * ramp(6, 3, th, 0.1, tau), xb = xb0 + 36 * ramp(2, 5, th, 0.1, tau), va = velR(6, 3, th, 0.1, tau), vb = velR(2, 5, th, 0.1, tau);
      attr(kCa, 'transform', `translate(${xa.toFixed(1)},0)`); attr(kCb, 'transform', `translate(${xb.toFixed(1)},0)`);
      kAa.set(xa + 50, 140, xa + 50 + 14 * va, 140); kAb.set(xb + 50, 110, xb + 50 + 14 * vb, 110);
      attr(kLa, 'x', (xa + 50 + 7 * va).toFixed(1)); attr(kLa, 'y', 128); M.setT(kLa, f2(va).replace('.00', '') + ' m/s'); attr(kLb, 'x', (xb + 50 + 7 * vb).toFixed(1)); attr(kLb, 'y', 98); M.setT(kLb, f2(vb).replace('.00', '') + ' m/s');
      vis(kCa, t, tK2, 1e9, { dy: 0 }); vis(kCb, t, tK2 + 0.1, 1e9, { dy: 0 }); }
    vis($('#kh0'), t, wt('K1', 'ten') - 0.1, 1e9, POP); vis($('#kh1'), t, wt('K1', 'five') - 0.1, 1e9, POP); vis($('#khP'), t, wt('K1', 'half') - 0.3, 1e9, POP);
    vis($('#kl0'), t, wt('K2', 'four') - 0.1, 1e9, POP); vis($('#kl1'), t, wt('K2', 'part') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'half') - 0.3, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Height') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tau = M.clamp(t - tWgo, 0, 2.0), th = 0.6, D = 0.08, xa0 = 90, xb0 = xa0 + 40 + 30 + WPX * 6 * th;
    const xa = xa0 + WPX * ramp(6, 3, th, D, tau), xb = xb0 + WPX * ramp(0, 6, th, D, tau), va = velR(6, 3, th, D, tau), vb = velR(0, 6, th, D, tau), aft = tau > th + D;
    attr(wA, 'cx', xa.toFixed(1)); attr(wAt, 'x', xa.toFixed(1)); attr(wB, 'cx', xb.toFixed(1)); attr(wBt, 'x', xb.toFixed(1));
    [wA, wAt].forEach(e => vis(e, t, T0('W2') + 0.5, 1e9, { dy: 0 })); [wB, wBt].forEach(e => vis(e, t, wt('W2', 'still') - 0.1, 1e9, { dy: 0 }));
    wvA.set(xa, 160, xa + 16 * va, 160); wvB.set(xb, 200, xb + 16 * vb, 200);
    attr(wlA, 'x', (xa + 8 * va).toFixed(1)); attr(wlA, 'y', 146); M.setT(wlA, va.toFixed(0) + ' m/s'); wlA.style.opacity = 1;
    attr(wlB, 'x', (xb + 8 * vb).toFixed(1)); attr(wlB, 'y', 186); M.setT(wlB, vb.toFixed(0) + ' m/s'); wlB.style.opacity = vb > 0.3 ? 1 : 0;
    M.setT(wTag, aft ? 'AFTER THE HIT' : 'BEFORE THE HIT'); vis(wTag, t, T0('W2') + 0.6, 1e9, { dy: 6 });
    vis($('#wtb'), t, tW[3] - 0.1, 1e9, { dy: 16 });
    ['#wp0', '#wp1', '#wk0', '#wk1'].forEach((id, i) => vis($(id), t, tW[3] + [0.1, 0.3, wt('W6', 'Thirty') - tW[3], wt('W6', 'nine') - tW[3]][i], 1e9, POP));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'take') - 0.1, tStrike: wt('X3', 'That') - 0.1, tRight: wt('X3', 'general') - 0.1 });
    vis(tpH, t, wt('X3', 'works') - 0.3, 1e9, { dy: 0 }); vis(tpr[0], t, wt('X3', 'floor') - 0.1, 1e9, { dy: 0 }); vis(tpr[1], t, wt('X3', 'general') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'bouncing') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.2, tCount, tAns });
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
