// PUC Physics Ep 95: Linear momentum of a system of particles (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', PD = '#6B2049', PL = '#CF7FAE', TC = C.gold;      // momentum plum (A darker, B lighter), centre-of-mass cross gold
const FC = C.orange, VC = C.ac, SA = C.ink, SB = '#5B6B8C', ICE = '#E8F1FB';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f0 = v => (Math.abs(v) < 0.5 ? 0 : v).toFixed(0);

/* a skater seen from the side: feet at (0,0), faces dir (+1 right, -1 left). outer g for M.vis, inner g for position */
const skater = (p, col, dir, lab, s = 1, ghost = false) => {
  const o = mk(p, 'g', {}), g = mk(o, 'g', {}), b = mk(g, 'g', { transform: `scale(${s})` });
  mk(b, 'line', { x1: -20, y1: 0, x2: 20, y2: 0, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
  mk(b, 'path', { d: 'M-7,-3 L-6,-42 M7,-3 L6,-42', stroke: col, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
  mk(b, 'rect', { x: -15, y: -96, width: 30, height: 58, rx: 13, fill: col });
  mk(b, 'circle', { cx: 0, cy: -112, r: 14, fill: col });
  mk(b, 'path', { d: `M0,-84 L${dir * 32},-74`, stroke: col, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
  if (lab && !ghost) txt(b, dir * 12, -140, lab, { 'text-anchor': dir > 0 ? 'end' : 'start', fill: col, 'font-weight': 700, 'font-size': 18 });
  return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } };
};
/* centre of mass marker: ink ring with a gold cross */
const comMark = (p, r = 12) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'path', { d: `M${-r + 3},0 H${r - 3} M0,${-r + 3} V${r - 3}`, stroke: TC, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const ice = (p, x, y, w) => { mk(p, 'rect', { x, y, width: w, height: 36, rx: 6, fill: ICE, stroke: '#9DB7D8', 'stroke-width': 2.5 }); for (let k = x + 30; k < x + w - 20; k += 70) mk(p, 'line', { x1: k, y1: y + 12, x2: k + 30, y2: y + 12, stroke: '#C7D9EE', 'stroke-width': 3, 'stroke-linecap': 'round' }); };

/* push-apart / pull-together of two skaters (masses mA, mB) by an inside force F that lasts DT seconds, starting at TP.
   x in px, sign: A at left. dirA = -1: A pushed left (push apart); +1: pulled right (rope). Stops when they meet (they grab each other). */
const mkRun = r => {
  const aA = r.F / r.mA, aB = r.F / r.mB, sA = r.dirA, sB = -r.dirA;
  const vAf = sA * aA * r.DT, vBf = sB * aB * r.DT;
  const dist = (a, v, s) => s <= 0 ? 0 : s <= r.DT ? 0.5 * a * s * s : 0.5 * a * r.DT * r.DT + v * (s - r.DT);
  let tMeet = 1e9;
  if (r.dirA > 0) { const gap = (r.xB0 - r.xA0 - r.touch) / r.PX, d0 = 0.5 * (aA + aB) * r.DT * r.DT; tMeet = r.TP + r.DT + (gap - d0) / (Math.abs(vAf) + Math.abs(vBf)); }
  const at = tau => { const s = Math.min(tau, tMeet) - r.TP, stop = tau >= tMeet;
    const vA = stop ? 0 : s <= 0 ? 0 : s <= r.DT ? sA * aA * s : vAf, vB = stop ? 0 : s <= 0 ? 0 : s <= r.DT ? sB * aB * s : vBf;
    return { xA: r.xA0 + sA * r.PX * dist(aA, Math.abs(vAf), s), xB: r.xB0 + sB * r.PX * dist(aB, Math.abs(vBf), s), vA, vB, push: s > 0 && s < r.DT && !stop }; };
  return Object.assign({ at, vAf, vBf, tMeet }, r);
};

Object.assign(M.IC, {
  boat: ['M2 15h20l-3 5H5z', 'M12 3v10', 'M12 4l6 8h-6'],
  skate: ['M5 15h13a3 3 0 0 0 3-3V9', 'M6 15V5h5l3 4', 'M7 19.5a1.5 1.5 0 1 0 0.01 0', 'M17 19.5a1.5 1.5 0 1 0 0.01 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['boat', 'Off a boat', 'THE BOAT SLIDES BACK', 0], ['skate', 'On skates', 'BOTH ROLL AWAY', 1], ['help', 'No outside push', 'YET BOTH MOVE', 2]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'boat'), wt('H1', 'skates'), wt('H2', 'outside')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="100"></svg></div>`).join('');
// each row: two bodies that start together and move apart (the lighter one faster)
const JA = JOBS.map((_, i) => { const s = $('#jsv' + i);
  if (i === 2) mk(s, 'ellipse', { cx: 160, cy: 50, rx: 140, ry: 34, fill: 'none', stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  const L = i === 0 ? mk(s, 'rect', { x: -60, y: 62, width: 120, height: 20, rx: 6, fill: '#8D6E52' }) : mk(s, 'circle', { r: 13, cy: 56, fill: SA });
  const R = mk(s, 'circle', { r: i === 0 ? 11 : 13, cy: i === 0 ? 46 : 56, fill: i === 1 ? SB : SA });
  const aL = PUC.arrow(s, VC, 4, 12), aR = PUC.arrow(s, VC, 4, 12);
  const sp = i === 0 ? [20, 90] : [60, 60];
  return { s, L, R, aL, aR, sp, P: i === 2 ? txt(s, 160, 99, 'P = 0', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 18 }) : null }; });
const hs = $('#hkS');
mk(hs, 'rect', { x: 36, y: 250, width: 510, height: 150, rx: 8, fill: '#F1F6FC', stroke: '#9DB7D8', 'stroke-width': 2 }); mk(hs, 'line', { x1: 36, y1: 262, x2: 546, y2: 262, stroke: '#9DB7D8', 'stroke-width': 4 });
for (let k = 76; k < 546; k += 60) mk(hs, 'line', { x1: k, y1: 262, x2: k, y2: 400, stroke: '#DCE7F4', 'stroke-width': 2 });
ice(hs, 36, 400, 510);
const HR = mkRun({ mA: 40, mB: 60, F: 300, DT: 0.4, TP: 0.2, dirA: -1, xA0: 262, xB0: 326, touch: 64, PX: 20 });
const hg = [0, 1, 2].map(k => [skater(hs, SA, 1, '', 1, true), skater(hs, SB, -1, '', 1, true)]);
const hA = skater(hs, SA, 1, '', 1), hB = skater(hs, SB, -1, '', 1);
const tHp = wt('H3', 'push') + 0.1 - HR.TP;
const hTau = t => M.clamp(t - tHp, 0, 2.3);

/* ---------- P: what a system is ---------- */
const QR = [['S', C.ink, 'System', 'a group of bodies we choose to look at'], ['p', PC, 'Momentum of each body', 'p = m v, a vector'], ['P', PC, 'Total momentum', 'add every p, as vectors'], ['F', FC, 'Inside or outside force?', 'between the skaters, or from anything else']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 118}px"><div class="qs" style="color:${c};${i ? '' : 'font-style:normal'}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'system'), wt('P2', 'momentum'), wt('P3', 'total'), wt('P4', 'inside')];
const pm = $('#pmS');
ice(pm, 36, 380, 712);
const sysB = mk(pm, 'rect', { x: 250, y: 150, width: 330, height: 280, rx: 40, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
const sysL = txt(pm, 266, 140, 'THE SYSTEM', { fill: C.ink2, 'font-weight': 600, 'font-size': 17, 'letter-spacing': 1.5 });
const pA0 = skater(pm, SA, 1, 'A', 1), pB0 = skater(pm, SB, -1, 'B', 1); pA0.set(382, 380); pB0.set(446, 380);
const pmIn = [PUC.arrow(pm, FC, 6, 18), PUC.arrow(pm, FC, 6, 18)], pmInL = txt(pm, 414, 200, 'inside', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
const coach = skater(pm, '#9AA3B5', 1, 'coach', 1); coach.set(150, 380);
const pmOut = PUC.arrow(pm, FC, 7, 20), pmOutL = txt(pm, 252, 270, 'outside', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
$('#io0').innerHTML = `${M.icon('arrowR', 22, FC, 2.6)}Inside: A on B, B on A`; $('#io1').innerHTML = `${M.icon('arrowR', 22, C.ink, 2.6)}Outside: a coach, a wall`;

/* ---------- S: the sim ---------- */
const s = $('#simS'), FY = 400, PX = 16, XC = 392, RD = 5, PVX = 22;
ice(s, 36, FY, 712);
const RUN1 = mkRun({ mA: 40, mB: 60, F: 300, DT: 0.4, TP: 0.25, dirA: -1, xA0: 353.6, xB0: 417.6, touch: 64, PX });
const RUN2 = mkRun({ mA: 40, mB: 60, F: 150, DT: 0.4, TP: 0.25, dirA: 1, xA0: 269.6, xB0: 473.6, touch: 64, PX });
const RUNS = [RUN1, RUN2];
const rope = mk(s, 'line', { stroke: '#8D6E52', 'stroke-width': 4, 'stroke-linecap': 'round' });
const gh = [0, 1, 2].map(() => [skater(s, SA, 1, '', 1, true), skater(s, SB, -1, '', 1, true)]);
const sA = skater(s, SA, 1, 'A · 40 kg'), sB = skater(s, SB, -1, 'B · 60 kg');
const cm = comMark(s, 13); cm.set(XC, FY + 18);
const cmL = txt(s, XC, FY + 66, 'centre of mass', { 'text-anchor': 'middle', fill: TC, 'font-weight': 700, 'font-size': 18 });
const cmLine = mk(s, 'line', { x1: XC, y1: FY - 30, x2: XC, y2: FY + 2, stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const aVA = PUC.arrow(s, VC, 6, 18), aVB = PUC.arrow(s, VC, 6, 18);
const lVA = txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' }), lVB = txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' });
const aFA = PUC.arrow(s, FC, 7, 20), aFB = PUC.arrow(s, FC, 7, 20);
const lFA = txt(s, 0, 0, 'F on A', { fill: FC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' }), lFB = txt(s, 0, 0, 'F on B', { fill: FC, 'font-weight': 700, 'font-size': 19 });
const aPA = PUC.arrow(s, PD, 7, 20), aPB = PUC.arrow(s, PL, 7, 20);
const lPA = txt(s, 0, 0, '', { fill: PD, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), lPB = txt(s, 0, 0, '', { fill: '#B5508A', 'font-weight': 700, 'font-size': 20 });
const TAU_FZ = RUN1.TP + 0.2, tL1 = wt('S3', 'push') - RUN1.TP, tFz = wt('S6', 'push') + 0.05, tRA = TAU_FZ - 0.25 * (tFz - tS6), tRes = wt('S8', 'cancel') + 0.1;
const tL2 = wt('S10', 'pull') - RUN2.TP;
function state(t) {
  if (t >= tS10 - 0.3) return { r: 1, tau: M.clamp(t - tL2, 0, RD), pause: t < tL2 };
  if (t >= tS9 - 0.3) return { r: 1, tau: 0, pause: true };
  if (t >= tS6) { const tau = t < tFz ? tRA + 0.25 * (t - tS6) : t < tRes ? TAU_FZ : t < tRes + 0.8 ? TAU_FZ + 0.25 * (t - tRes) : Math.min(RD, TAU_FZ + 0.2 + (t - tRes - 0.8)); return { r: 0, tau, replay: t < tRes + 0.8, frozen: t >= tFz && t < tRes }; }
  return { r: 0, tau: M.clamp(t - tL1, 0, RD), pause: t < tL1 };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r_vA" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r_vB" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${PD}">p<sub>A</sub></span><span class="v" id="r_pA" style="color:${PD}">0</span><span class="u">kg m/s</span>
  <span class="k" style="color:${PL}">p<sub>B</sub></span><span class="v" id="r_pB" style="color:${PL}">0</span><span class="u">kg m/s</span>
  <span class="k" style="color:${PC}">P</span><span class="v" id="r_P" style="color:${PC}">0</span><span class="u">kg m/s</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: RD, ymin: -150, ymax: 150, xt: [0, 1, 2, 3, 4, 5], yt: [-120, 0, 120], xl: 't (s)' });
txt(gs, 122, 78, 'p (kg m/s)', { 'font-size': 18 });
const gT = mk(gs, 'path', { d: '', fill: 'none', stroke: PC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 }), gA = mk(gs, 'path', { d: '', fill: 'none', stroke: PD, 'stroke-width': 4 }), gB = mk(gs, 'path', { d: '', fill: 'none', stroke: PL, 'stroke-width': 4, 'stroke-dasharray': '7 5' });
const dT = g.dot(PC, 10), dA = g.dot(PD, 8), dB = g.dot(PL, 8);
$('#leg').innerHTML = [[PD, '', 'A'], [PL, '7 5', 'B'], [PC, '', 'total P']].map(([c, da, n], i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${i === 2 ? 6 : 4}" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 120; for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const th1 = PUC.think($('#th1'), { q: 'Now they pull each other in on a rope. Will the total momentum change?', opts: ['Yes, it changes', 'No, still zero'], right: 1, why: 'The pull is an inside force too, so P stays zero.' });

/* ---------- D ---------- */
const P_ = tc(PC, '\\vec P'), v_ = i => tc(VC, `\\vec v_${i}`);
const STEPS = [[`${P_} = ${tc(PC, '\\vec p_1')} + ${tc(PC, '\\vec p_2')} + \\dots + ${tc(PC, '\\vec p_n')}`, 'add every momentum, as vectors'],
  [`${P_} = m_1${v_(1)} + m_2${v_(2)} + \\dots = M\\,${tc(VC, '\\vec V')}`, 'M = total mass, V = velocity of the centre of mass'],
  [`d${P_}/dt = \\textstyle\\sum ${tc(FC, '\\vec F')} = ${tc(FC, '\\vec F_{\\text{in}}')} + ${tc(FC, '\\vec F_{\\text{ext}}')}`, 'd P/d t: how fast P changes each second'],
  [`${tc(FC, '\\vec F_{\\text{in}}')} = 0 \\;\\Rightarrow\\; d${P_}/dt = ${tc(FC, '\\vec F_{\\text{ext}}')}`, 'inside forces cancel in equal, opposite pairs']];
const SY = [88, 196, 304, 420];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="pillp ink" id="dP" style="left:36px;top:510px">${K(`${tc(FC, '\\vec F_{\\text{ext}}')} = 0`)} &nbsp;→&nbsp; ${K(P_)} constant &nbsp;→&nbsp; ${K(tc(VC, '\\vec V'))} steady</div>`;
const tStep = [wt('D2', 'Add'), wt('D3', 'Each'), wt('D4', 'How'), wt('D5', 'Inside')];
const dp = $('#dpS'), DPT = [[262, 120], [130, 330], [394, 330]];
const dPair = [[0, 1], [0, 2], [1, 2]].map(([a, b]) => { const [x1, y1] = DPT[a], [x2, y2] = DPT[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return { a1: PUC.arrow(dp, FC, 5, 14), a2: PUC.arrow(dp, FC, 5, 14), mx, my, ux, uy }; });
DPT.forEach(([x, y], i) => { mk(dp, 'circle', { cx: x, cy: y, r: 20, fill: [SA, SB, '#7C8AA8'][i] }); txt(dp, x, y + 7, String(i + 1), { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins' }); });
const dSum = txt(dp, 262, 420, 'inside pairs: sum = 0', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });
const dExt = PUC.arrow(dp, FC, 7, 20), dExtL = txt(dp, 462, 284, 'F ext', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\dfrac{d${P_}}{dt} = ${tc(FC, '\\vec F_{\\text{ext}}')}`);

/* ---------- R ---------- */
const LK = [`P starts at 0, and no outside force acts`, `So ${K(tc(PD, 'p_A'))} and ${K(tc(PL, 'p_B'))}: equal size, opposite ways`, `40 × 3 = 60 × 2: less mass, more speed`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('') + `<div class="pillp ink" id="rP" style="left:36px;top:420px">Light boat: shoots back fast</div>`;
const tLk = [wt('R2', 'starts'), wt('R3', 'So'), wt('R4', 'Forty')];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'So the lighter skater always zooms off faster!' });
const rr = $('#rrS'), RW = 6, RH = 40;          // rectangle: width = mass x 6 px, height = speed x 40 px, area = momentum
const RRect = [[SA, 40, 3, 'A', 120, 250], [SB, 60, 2, 'B', 120, 470]].map(([col, m, v, n, x, yb]) => { const gq = mk(rr, 'g', {});
  const rc = mk(gq, 'rect', { x, y: yb, width: 0, height: 0, fill: PC, opacity: 0.88, rx: 4 });
  const wl = txt(gq, x + m * RW / 2, yb + 32, `m = ${m} kg`, { 'text-anchor': 'middle', fill: col, 'font-weight': 700, 'font-size': 20 });
  const hl = txt(gq, x - 14, yb - v * RH / 2 + 7, `v = ${v}`, { 'text-anchor': 'end', fill: VC, 'font-weight': 700, 'font-size': 20 });
  const pl = txt(gq, x + m * RW / 2, yb - v * RH / 2 + 8, `p = ${m * v}`, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 24 });
  const nl = txt(gq, x, yb - v * RH - 16, n, { 'text-anchor': 'start', fill: col, 'font-weight': 700, 'font-size': 28, 'font-family': 'Poppins' });
  return { gq, rc, wl, hl, pl, nl, m, v, x, yb }; });
const rEq = txt(rr, 392, 540, 'same area: 120 = 120', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 24 });

/* ---------- K ---------- */
const kh = $('#khS'); ice(kh, 36, 400, 712);
const KR = mkRun({ mA: 40, mB: 60, F: 300, DT: 0.4, TP: 0.2, dirA: -1, xA0: 353.6, xB0: 417.6, touch: 64, PX: 20 });
const kA = skater(kh, SA, 1, 'A', 0.9), kB = skater(kh, SB, -1, 'B', 0.9), kCm = comMark(kh, 12); kCm.set(392, 418);
const kVA = PUC.arrow(kh, VC, 5, 16), kVB = PUC.arrow(kh, VC, 5, 16);
const kl = $('#klS'); ice(kl, 36, 400, 712);
const kPA = skater(kl, SA, 1, 'A', 0.9), kPB = skater(kl, SB, -1, 'B', 0.9), kCm2 = comMark(kl, 12);
const kF = PUC.arrow(kl, FC, 7, 20), kFL = txt(kl, 0, 0, '50 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
const kV2 = PUC.arrow(kl, VC, 5, 16), kV2L = txt(kl, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const KX0 = 200, KPX = 40, KPair = t => t <= 0 ? [0, 0, 0] : t <= 2 ? [0.25 * t * t, 0.5 * t, 50 * t] : [1 + (t - 2), 1, 100];   // [x m, v m/s, P kg m/s]
$('#khP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Inside push: <i>P</i> stays 0`;
$('#klP').innerHTML = `Outside push: <i>P</i> grows to 100`;
const tKa = wt('K1', 'push') - KR.TP, tKb = wt('K2', 'pushes');
const th2 = PUC.think($('#th2'), { q: 'You sit in a cart and push hard on its front wall. Will the cart roll forward?', opts: ['Yes, it rolls', 'No, it stays put'], right: 1, why: 'You + cart = one system; your push is an inside force.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'Three balls slide on a smooth floor: 1 kg at 6 m/s east, 2 kg at 3 m/s west, 3 kg at 2 m/s north. Find <i>P</i> and the velocity of the centre of mass.';
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(PC, 'P_x')} = 1(6) + 2(-3) = 0`)],
  [K(`${tc(PC, 'P_y')} = 3(2) = 6\\,\\text{kg m/s}`)],
  [K(`${tc(PC, 'P')} = 6\\ \\text{north},\\;\\; M = 6\\,\\text{kg}`)],
  [K(`${tc(VC, 'V')} = \\tfrac{${tc(PC, 'P')}}{M} = \\tfrac66 = ${tc(VC, '1\\,\\text{m/s north}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 80 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'); mk(w, 'rect', { x: 36, y: 76, width: 712, height: 470, rx: 10, fill: '#F3F5F9', stroke: C.line, 'stroke-width': 2 });
txt(w, 60, 110, 'N ↑', { fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const WB = [[1, 100, 190, 6, 0, 22, SA], [2, 470, 300, -3, 0, 28, SB], [3, 260, 470, 0, -2, 34, '#7C8AA8']], WS = 2, WV = 20;   // [m, x0, y0, vx, vy(screen), r, col]
const wBalls = WB.map(([m, x, y, vx, vy, r, col]) => { const o = mk(w, 'g', {}), gq = mk(o, 'g', {}); mk(gq, 'circle', { r, fill: col }); txt(gq, 0, 6, m + 'kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 17, 'font-family': 'Poppins' }); return { o, gq, a: PUC.arrow(w, VC, 6, 18) }; });
const wCm = comMark(w, 12), wCmA = PUC.arrow(w, VC, 5, 15), wCmL = txt(w, 0, 0, '1 m/s', { fill: VC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'end' });
const WO = [560, 470], WU = 14;
const wP = [PUC.arrow(w, PD, 6, 18), PUC.arrow(w, PL, 6, 18), PUC.arrow(w, '#7C8AA8', 6, 18), PUC.arrow(w, PC, 7, 20)];
const wPl = [txt(w, WO[0] + 42, WO[1] - 12, '+6', { 'text-anchor': 'middle', fill: PD, 'font-weight': 700, 'font-size': 20 }), txt(w, WO[0] + 42, WO[1] + 44, '-6', { 'text-anchor': 'middle', fill: PL, 'font-weight': 700, 'font-size': 20 }), txt(w, WO[0] - 14, WO[1] - 40, '+6', { 'text-anchor': 'end', fill: '#7C8AA8', 'font-weight': 700, 'font-size': 20 }), txt(w, WO[0] + 20, WO[1] - 96, 'P = 6 north', { fill: PC, 'font-weight': 700, 'font-size': 22 })];
const wOL = txt(w, WO[0] + 40, WO[1] + 70, 'MOMENTA, TIP TO TAIL', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, 'letter-spacing': 1 });
const wCx = (WB[0][0] * WB[0][1] + WB[1][0] * WB[1][1] + WB[2][0] * WB[2][1]) / 6, wCy = (WB[0][0] * WB[0][2] + WB[1][0] * WB[1][2] + WB[2][0] * WB[2][2]) / 6;
const tW = [wt('W3', 'Along'), wt('W4', 'Along'), wt('W5', 'So'), wt('W6', 'V')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Total momentum zero: nothing is moving', right: 'Zero total: the centre of mass is at rest' });
const tp = $('#tpS'); mk(tp, 'rect', { x: 20, y: 196, width: 600, height: 26, rx: 5, fill: ICE, stroke: '#9DB7D8', 'stroke-width': 2 });
const tA = skater(tp, SA, 1, '', 0.8), tB = skater(tp, SB, -1, '', 0.8), tCm = comMark(tp, 11); tA.set(150, 196); tB.set(470, 196); tCm.set(320, 209);
const tpa = [PUC.arrow(tp, PD, 6, 18), PUC.arrow(tp, PL, 6, 18)], tpv = [PUC.arrow(tp, VC, 4, 13), PUC.arrow(tp, VC, 4, 13)];
const tpL = [txt(tp, 60, 68, '-120', { 'text-anchor': 'end', fill: PD, 'font-weight': 700, 'font-size': 20 }), txt(tp, 560, 68, '+120', { 'text-anchor': 'start', fill: PL, 'font-weight': 700, 'font-size': 20 }), txt(tp, 320, 254, 'P = 0, centre of mass still', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 20 })];
const where = PUC.where($('#wa'), { on: [], type: 'Centre of mass velocity, explosions, inside versus outside forces' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `2 kg moves at ${K('3\\hat i + 2\\hat j')} m/s, 3 kg at ${K('-2\\hat j')} m/s, joined by a spring. An outside force ${K('5\\hat j')} N acts for 2 s. Speed of the centre of mass at the end?`, qW: 760,
  opts: ['1.3 m/s', '2 m/s', '3.3 m/s', '1.6 m/s'], right: 1, optY: 380, optH: 90 });
$('#mq .mq').style.fontSize = '31px';
const so = PUC.solution($('#so'), [
  [K(`${tc(PC, '\\vec P_0')} = 6\\hat i + 4\\hat j - 6\\hat j`)], [K(`= 6\\hat i - 2\\hat j`)],
  [K(`\\text{spring: inside};\\; +${tc(FC, '5\\hat j')}(2)`)], [K(`${tc(PC, '\\vec P')} = 6\\hat i + 8\\hat j,\\ |${tc(PC, '\\vec P')}| = 10`)], [K(`${tc(VC, 'V')} = 10/5 = ${tc(VC, '2\\,\\text{m/s}')}`)]], { y0: 100, dy: 100 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'start'), wt('A2', 'That'), wt('A3', 'spring'), wt('A3', 'becomes'), wt('A4', 'Divide')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · momentum of a system', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`${P_} = \\textstyle\\sum m_i${tc(VC, '\\vec v_i')} = M\\,${tc(VC, '\\vec V_{\\text{cm}}')}`), K(`d${P_}/dt = ${tc(FC, '\\vec F_{\\text{ext}}')}`),
    '<b>Inside forces</b> cancel in equal, opposite pairs', '<b>No outside force</b>: P constant, centre of mass steady'] });
const YQ = ['Two skaters at rest push apart. Why does the total momentum stay zero?', 'How is the total momentum linked to the centre of mass?', 'Which forces can change the total momentum of a system?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 96', topic: 'Push sideways, the screw goes straight in? Vector (Cross) Product', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS9 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const ghostSet = (pair, run, tau, step, moving) => pair.forEach((gp, j) => { const q = run.at(Math.max(0, tau - step * (j + 1))), k = run.at(tau);
  gp[0].set(q.xA, run === HR ? 400 : FY); gp[1].set(q.xB, run === HR ? 400 : FY);
  gp[0].o.style.opacity = moving && Math.abs(q.xA - k.xA) > 4 ? [0.3, 0.2, 0.12][j] : 0; gp[1].o.style.opacity = moving && Math.abs(q.xB - k.xB) > 4 ? [0.3, 0.2, 0.12][j] : 0; });

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
    JA.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const t0 = tMorph + 0.8 + i * 0.45, u = M.clamp(t - t0, 0, 1.6), ua = M.o3((t - t0) / 0.3), xl = 150 - q.sp[0] * u, xr = 172 + q.sp[1] * u;
      if (i === 0) attr(q.L, 'x', (xl - 60).toFixed(1)); else attr(q.L, 'cx', xl.toFixed(1)); attr(q.R, 'cx', xr.toFixed(1));
      const yy = i === 0 ? 28 : 32; q.aL.set(xl, yy, xl - q.sp[0] * 0.6 * ua, yy); q.aR.set(xr, yy, xr + q.sp[1] * 0.6 * ua, yy);
      if (q.P) vis(q.P, t, t0 + 0.4, 1e9, { dy: 0 }); });
    vis($('#hjP'), t, wt('H2', 'Nobody') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const tau = hTau(t), k = HR.at(tau); hA.set(k.xA, 400); hB.set(k.xB, 400);
    vis(hA.o, t, tH3 + 0.3, 1e9, { dy: 0 }); vis(hB.o, t, tH3 + 0.35, 1e9, { dy: 0 });
    hg.forEach((gp, j) => { const q = HR.at(Math.max(0, tau - 0.08 * (j + 1))), mv = tau > 0.25 && tau < 2.3; gp[0].set(q.xA, 400); gp[1].set(q.xB, 400); gp[0].o.style.opacity = mv && Math.abs(q.xA - k.xA) > 4 ? [0.3, 0.2, 0.12][j] : 0; gp[1].o.style.opacity = mv && Math.abs(q.xB - k.xB) > 4 ? [0.3, 0.2, 0.12][j] : 0; });
    vis($('#hkQ'), t, wt('H4', 'where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    vis(pA0.o, t, tP1 + 0.7, 1e9, { dy: 0 }); vis(pB0.o, t, tP1 + 0.8, 1e9, { dy: 0 });
    M.draw(sysB, t, wt('P1', 'group') - 0.1, 0.8); vis(sysL, t, wt('P1', 'group') + 0.4, 1e9, { dy: 0 });
    const ui = M.o3((t - wt('P4', 'inside') + 0.1) / 0.4); pmIn[0].set(414, 300, 414 + 70 * ui, 300); pmIn[1].set(414, 316, 414 - 70 * ui, 316); pmInL.style.opacity = ui;
    vis(coach.o, t, wt('P4', 'coach') - 0.3, 1e9, { dy: 0 });
    const uo = M.o3((t - wt('P4', 'coach') + 0.1) / 0.4); pmOut.set(196, 300, 196 + 140 * uo, 300); pmOutL.style.opacity = uo;
    vis($('#io0'), t, wt('P4', 'inside') + 0.2, 1e9, POP); vis($('#io1'), t, wt('P4', 'outside') + 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S9'), simIn2 = OUT('S10') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), r = RUNS[S.r], k = r.at(S.tau);
    sA.set(k.xA, FY); sB.set(k.xB, FY); vis(sA.o, t, tS1 + 0.5, 1e9, { dy: 0 }); vis(sB.o, t, wt('S1', 'B') - 0.1, 1e9, { dy: 0 });
    const moving = !S.pause && !S.frozen && S.tau > r.TP && S.tau < Math.min(RD, r.tMeet);
    ghostSet(gh, r, S.tau, S.replay ? 0.04 : 0.1, moving);
    // rope (run 2): hand to hand
    if (S.r === 1 && S.tau < r.tMeet) { attr(rope, 'x1', (k.xA + 32).toFixed(1)); attr(rope, 'x2', (k.xB - 32).toFixed(1)); attr(rope, 'y1', FY - 74); attr(rope, 'y2', FY - 74); rope.style.opacity = 1; } else rope.style.opacity = 0;
    vis(cm.o, t, wt('S2', 'gold') - 0.1, 1e9, { dy: 0 }); vis(cmL, t, wt('S2', 'centre') - 0.1, 1e9, { dy: 0 }); vis(cmLine, t, wt('S2', 'centre'), 1e9, { dy: 0 });
    const pulse = M.io((t - wt('S5', 'gold') + 0.1) / 0.3) * (1 - M.io((t - wt('S5', 'move') - 0.6) / 0.3)); attr(cm.g, 'transform', `translate(${XC},${FY + 18}) scale(${(1 + 0.35 * pulse).toFixed(3)})`);
    // velocity arrows (blue) from the waist
    const vy = FY - 60;
    aVA.set(k.xA - 18, vy, k.xA - 18 + PVX * k.vA, vy); aVB.set(k.xB + 18, vy, k.xB + 18 + PVX * k.vB, vy);
    attr(lVA, 'x', (k.xA - 18 + PVX * k.vA / 2).toFixed(1)); attr(lVA, 'y', vy + 30); const far = k.xB - k.xA > 170 && !S.replay ? 1 : 0; M.setT(lVA, Math.abs(k.vA).toFixed(1) + ' m/s'); lVA.style.opacity = Math.abs(k.vA) > 0.6 ? far : 0; aVA.g.style.opacity = S.replay ? 0 : 1; aVB.g.style.opacity = S.replay ? 0 : 1;
    attr(lVB, 'x', (k.xB + 18 + PVX * k.vB / 2).toFixed(1)); attr(lVB, 'y', vy + 30); M.setT(lVB, Math.abs(k.vB).toFixed(1) + ' m/s'); lVB.style.opacity = Math.abs(k.vB) > 0.6 ? far : 0;
    // frozen mid-push: equal and opposite forces at the hands, equal and opposite momenta
    const fz = S.r === 0 && S.replay ? 1 - M.io((t - tRes - 0.5) / 0.3) : 0, hx = (k.xA + k.xB) / 2, hy = FY - 74;
    const uFB = fz * M.o3((t - wt('S7', 'pushes') + 0.1) / 0.4), uFA = fz * M.o3((t - wt('S7', 'pushes', 1) + 0.1) / 0.4);
    aFB.set(hx + 4, hy, hx + 4 + 96 * uFB, hy); aFA.set(hx - 4, hy, hx - 4 - 96 * uFA, hy);
    attr(lFB, 'x', hx + 108); attr(lFB, 'y', hy + 7); lFB.style.opacity = uFB; attr(lFA, 'x', hx - 108); attr(lFA, 'y', hy + 7); lFA.style.opacity = uFA;
    const uP = fz * M.o3((t - wt('S8', 'momentum') + 0.1) / 0.5), PS = 2.5;      // 1 px per kg m/s
    aPA.set(hx - 6, FY - 196, hx - 6 + PS * 40 * k.vA * uP, FY - 196); aPB.set(hx + 6, FY - 196, hx + 6 + PS * 60 * k.vB * uP, FY - 196);
    attr(lPA, 'x', (hx - 14 + PS * 40 * k.vA * uP).toFixed(1)); attr(lPA, 'y', FY - 189); M.setT(lPA, 'pA = ' + f0(40 * k.vA)); lPA.style.opacity = uP;
    attr(lPB, 'x', (hx + 14 + PS * 60 * k.vB * uP).toFixed(1)); attr(lPB, 'y', FY - 189); M.setT(lPB, 'pB = +' + f0(60 * k.vB)); lPB.style.opacity = uP;
    vis($('#rdy'), t, tS1 + 0.6, tL1 + r.TP - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); if (t >= tS9 - 0.3) vis($('#rdy'), t, simIn2 + 0.3, tL2 + RUN2.TP - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS6 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    vis($('#simP'), t, wt('S8', 'cancel') - 0.1, simOut, POP);
    // readout: round t first, then compute
    const tr = Math.round(S.tau * 100) / 100, kr = r.at(tr), pa = 40 * kr.vA, pb = 60 * kr.vB;
    M.setT($('#roT'), ['RUN 1 · PUSH APART', 'RUN 2 · PULL ON A ROPE'][S.r]); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_vA'), f2(kr.vA)); M.setT($('#r_vB'), f2(kr.vB));
    M.setT($('#r_pA'), f0(pa)); M.setT($('#r_pB'), f0(pb)); M.setT($('#r_P'), f0(pa + pb));
    const hA4 = M.io((t - wt('S4', 'A') + 0.1) / 0.3) * (1 - M.io((t - tS5) / 0.3)), hT4 = M.io((t - wt('S4', 'total') + 0.1) / 0.3) * (1 - M.io((t - tS6) / 0.3));
    $('#r_pA').style.background = mix('#FFFFFF', '#F6E3EE', hA4); $('#r_pB').style.background = mix('#FFFFFF', '#F6E3EE', hA4); $('#r_P').style.background = mix('#FFFFFF', '#F6E3EE', hT4);
    const pA = x => 40 * r.at(x).vA, pB = x => 60 * r.at(x).vB;
    plot(gA, pA, S.tau); plot(gB, pB, S.tau); plot(gT, x => pA(x) + pB(x), S.tau);
    const dOn = t >= tL1 + 0.05; dA(S.tau, 40 * k.vA, dOn); dB(S.tau, 60 * k.vB, dOn); dT(S.tau, 40 * k.vA + 60 * k.vB, dOn);
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    vis($('#th1'), t, tS9 + 0.05, OUT('S10'), { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'Will') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: tS10 - 0.02, tWhy: wt('S10', 'The') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dP'), t, wt('D6', 'With') - 0.1, 1e9, POP);
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    dPair.forEach((q, i) => { const u = M.o3((t - wt('D5', 'pairs') - 0.15 * i + 0.3) / 0.4), L = 52 * u; q.a1.set(q.mx - q.ux * 8, q.my - q.uy * 8, q.mx - q.ux * (8 + L), q.my - q.uy * (8 + L)); q.a2.set(q.mx + q.ux * 8, q.my + q.uy * 8, q.mx + q.ux * (8 + L), q.my + q.uy * (8 + L)); });
    vis(dSum, t, wt('D5', 'zero') - 0.1, 1e9, { dy: 0 });
    const ue = M.o3((t - wt('D5', 'outside') + 0.1) / 0.4); dExt.set(DPT[2][0] + 26, DPT[2][1] - 30, DPT[2][0] + 26 + 80 * ue, DPT[2][1] - 30); dExtL.style.opacity = ue;
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'total') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'light') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    RRect.forEach((q, i) => { const tg = i ? wt('R3', 'opposite') : wt('R3', 'momentum'), u = M.o3((t - tg + 0.1) / 0.6), W = q.m * RW, H = q.v * RH;
      vis(q.nl, t, tg - 0.2, 1e9, { dy: 0 }); vis(q.wl, t, tg - 0.1, 1e9, { dy: 0 }); vis(q.hl, t, tg + 0.2, 1e9, { dy: 0 });
      attr(q.rc, 'width', (W * u).toFixed(1)); attr(q.rc, 'height', (H * Math.min(1, u * 1.4)).toFixed(1)); attr(q.rc, 'y', (q.yb - H * Math.min(1, u * 1.4)).toFixed(1)); q.pl.style.opacity = M.clamp((u - 0.7) / 0.3); });
    vis(rEq, t, wt('R4', 'Less') - 0.1, 1e9, { dy: 0 });
    avD(t, wt('R4', 'boat') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK2 + 0.3, 1e9, { dy: 8 });
    { const tau = M.clamp(t - tKa, 0, 4), k = KR.at(tau); kA.set(k.xA, 400); kB.set(k.xB, 400); kVA.set(k.xA - 16, 340, k.xA - 16 + 20 * k.vA, 340); kVB.set(k.xB + 16, 340, k.xB + 16 + 20 * k.vB, 340);
      M.setT($('#khC'), 'P = 0'); $('#khC').style.color = PC; }
    { const tc2 = t - tKb, [xm, vm, P] = KPair(tc2), xa = KX0 + KPX * xm, xb = xa + 64, xcm = (40 * xa + 60 * xb) / 100;
      kPA.set(xa, 400); kPB.set(xb, 400); kCm2.set(xcm, 418);
      const fOn = tc2 > 0 && tc2 < 2 ? 1 : 0, uf = M.o3(tc2 / 0.3) * (1 - M.io((tc2 - 2) / 0.2)); kF.set(xa - 120, 330, xa - 22, 330); kF.g.style.opacity = uf; attr(kFL, 'x', xa - 72); attr(kFL, 'y', 316); kFL.style.opacity = uf;
      kV2.set(xb + 24, 340, xb + 24 + 80 * vm, 340); attr(kV2L, 'x', xb + 24 + 80 * vm + 8); attr(kV2L, 'y', 346); M.setT(kV2L, vm.toFixed(2) + ' m/s'); kV2L.style.opacity = vm > 0.2 ? 1 : 0;
      const trr = Math.round(M.clamp(tc2, 0, 99) * 100) / 100; M.setT($('#klC'), `t ${trr.toFixed(1)} s · P = ${f0(KPair(trr)[2])}`); $('#klC').style.color = PC; void fOn; }
    vis($('#khC'), t, tK1 + 0.5, 1e9, POP); vis($('#klC'), t, tK2 + 0.3, 1e9, POP);
    $('#klC').style.right = '36px'; $('#klC').style.top = '76px';
    vis($('#khP'), t, wt('K1', 'total') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'grows') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Will') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'You') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tg = M.clamp(t - T0('W2') - 1.0, 0, 8);
    WB.forEach(([m, x0, y0, vx, vy], i) => { const x = x0 + WS * vx * tg, y = y0 + WS * vy * tg, b = wBalls[i]; attr(b.gq, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      vis(b.o, t, [wt('W2', 'One'), wt('W2', 'Two'), wt('W2', 'Three', 2)][i] - 0.1, 1e9, { dy: 0 }); const ua = M.o3((t - [wt('W2', 'east'), wt('W2', 'west'), wt('W2', 'north')][i] + 0.1) / 0.4);
      const r = WB[i][5]; b.a.set(x + Math.sign(vx) * r + 0, y + Math.sign(vy) * r, x + Math.sign(vx) * r + WV * vx * ua, y + Math.sign(vy) * r + WV * vy * ua); });
    const cy = wCy - WS * 1 * tg; wCm.set(wCx, cy); vis(wCm.o, t, wt('W2', 'centre') - 0.1, 1e9, { dy: 0 });
    const uc = M.o3((t - tW[3] - 0.4) / 0.4); wCmA.set(wCx, cy - 14, wCx, cy - 14 - 40 * uc); attr(wCmL, 'x', wCx - 14); attr(wCmL, 'y', cy - 34); wCmL.style.opacity = uc;
    const u = [M.o3((t - tW[0] - 0.2) / 0.5), M.o3((t - wt('W3', 'Two')) / 0.5), M.o3((t - tW[1] - 0.2) / 0.5), M.o3((t - tW[2]) / 0.5)];
    wP[0].set(WO[0], WO[1], WO[0] + 6 * WU * u[0], WO[1]); wP[1].set(WO[0] + 6 * WU, WO[1] + 16, WO[0] + 6 * WU - 6 * WU * u[1], WO[1] + 16);
    wP[2].set(WO[0], WO[1], WO[0], WO[1] - 6 * WU * u[2]); wP[3].set(WO[0] - 14, WO[1], WO[0] - 14, WO[1] - 6 * WU * u[3]); wP[3].g.style.opacity = u[3];
    wPl.forEach((e, i) => e.style.opacity = u[i]); vis(wOL, t, tW[0] - 0.1, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'zero') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'Zero') });
    const u1 = M.o3((t - wt('X3', 'Both') + 0.1) / 0.4), u2 = M.o3((t - wt('X3', 'cancel') + 0.1) / 0.4);
    vis(tA.o, t, wt('X3', 'Both') - 0.2, 1e9, { dy: 0 }); vis(tB.o, t, wt('X3', 'Both') - 0.1, 1e9, { dy: 0 }); vis(tCm.o, t, wt('X3', 'centre') - 0.1, 1e9, { dy: 0 });
    tpv[0].set(126, 140, 126 - 60 * u1, 140); tpv[1].set(494, 140, 494 + 40 * u1, 140);
    tpa[0].set(140, 62, 140 - 120 * u2 * 0.6, 62); tpa[1].set(480, 62, 480 + 120 * u2 * 0.6, 62); tpL[0].style.opacity = u2; tpL[1].style.opacity = u2;
    vis(tpL[2], t, wt('X3', 'centre') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Centre') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Speed') - 0.2, tCount, tAns });
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
