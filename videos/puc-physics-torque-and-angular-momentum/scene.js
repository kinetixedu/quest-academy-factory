// PUC Physics Ep 101: Torque and angular momentum (Motion notebook, a merry-go-round seen from above)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const LC = '#A23B72', PC = '#C2558F', RC = C.violet, TC = C.gold, VC = C.ac, IC = C.ink, FC = C.orange;    // L plum, p lighter plum, r violet, theta gold, v blue, tau and F orange
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const tau_ = tc(FC, '\\tau'), F_ = tc(FC, 'F'), L_ = tc(LC, 'L'), p_ = tc(PC, 'p'), r_ = tc(RC, 'r'), th_ = tc(TC, '\\theta'), rp_ = tc(RC, 'r_\\perp'), v_ = tc(VC, 'v'), w_ = tc(VC, '\\omega');
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

const disc = (p, cx, cy, R, seats = true) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {});
  mk(g, 'circle', { cx, cy, r: R, fill: '#EAF0FB', stroke: IC, 'stroke-width': 3 }); mk(g, 'circle', { cx, cy, r: R * 0.55, fill: 'none', stroke: '#C7D3EA', 'stroke-width': 2 });
  for (let k = 0; k < 6; k++) { const a = k * 60 * D2R; mk(g, 'line', { x1: cx, y1: cy, x2: cx + R * Math.cos(a), y2: cy - R * Math.sin(a), stroke: '#B9C6E0', 'stroke-width': 2.5 }); }
  if (seats) [90, 210, 330].forEach((a, k) => { const x = cx + R * 0.72 * Math.cos(a * D2R), y = cy - R * 0.72 * Math.sin(a * D2R); mk(g, 'circle', { cx: x, cy: y, r: R * 0.11, fill: k ? '#8D99AE' : VC, stroke: IC, 'stroke-width': 2 }); });
  ptMk(o, cx, cy, Math.max(8, R * 0.08));
  return { o, g, set(a) { attr(g, 'transform', `rotate(${(-a / D2R).toFixed(2)} ${cx} ${cy})`); } }; };

Object.assign(M.IC, {
  kick: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7l4 3-1.5 5h-5L8 10z'],
  brake: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 12h.01', 'M5 5l3 3'],
  spin: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tS1 = T0('S1'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook rows ---------- */
const JOBS = [['kick', 'A kick', 'THE BALL GOES FASTER'], ['brake', 'A brake', 'THE BICYCLE SLOWS DOWN'], ['spin', 'A push on a spinner', 'WHAT CHANGES A SPIN?']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'kick'), wt('H1', 'brake'), wt('H2', 'spin')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="110"></svg></div>`).join('');
const ROW = [0, 1].map(i => { const sv = $('#jsv' + i), b = ball(sv, 12, i ? '#5B6B8C' : IC), a = PUC.arrow(sv, PC, 5, 15); b.set(60, 55); return { set(u) { const L = i ? 150 - 110 * u : 40 + 110 * u; a.set(78, 55, 78 + L, 55); } }; });
const rd = disc($('#jsv2'), 200, 55, 44, true);

/* hook: the merry-go-round from above */
const hs = $('#hkS'), HO = [270, 270], hD = disc(hs, HO[0], HO[1], 130), hF = PUC.arrow(hs, FC, 6, 18);
const tFast = wt('H4', 'keeps');
const hPhi = t => { const a = Math.max(0, t - tH3 - 0.3) * 0.5, b = Math.max(0, t - tFast); return a + 0.5 * 0.4 * Math.min(b, 3) ** 2 + (b > 3 ? 1.2 * (b - 3) : 0); };

/* ---------- P ---------- */
const IG = [['τ', FC, 'Torque: the turning effect', 'τ = r × F'], ['L', LC, 'Angular momentum: going around', 'L = r × p']];
$('#igs').innerHTML = IG.map(([s, c, n, d], i) => `<div class="ig" id="ig${i}" style="top:${84 + i * 120}px;height:104px"><div class="s" style="color:${c}">${s}</div><div class="n">${n}</div><div class="d mono">${d}</div></div>`).join('') +
  `<div class="pillp ink" id="igP" style="left:36px;top:360px">Force changes p · Torque changes L</div>`;
$('#pmF').innerHTML = K(`${tau_} = \\dfrac{d${L_}}{dt}`); $('#pmF2').innerHTML = K(`${F_} = \\dfrac{d${p_}}{dt}`);

/* ---------- S: the merry-go-round sim ---------- */
const s = $('#simS'), O = [300, 290], PXM = 120, RR = 1.5, RPX = RR * PXM, FN = 50, I_M = 300, TQ = RR * FN, TPUSH = 4;   // I = 300 kg m^2 (example), tau = 75 N m
const phiOf = sv => sv <= 0 ? 0 : sv < TPUSH ? 0.5 * (TQ / I_M) * sv * sv : 0.5 * (TQ / I_M) * TPUSH * TPUSH + (TQ / I_M) * TPUSH * (sv - TPUSH);
const ghS = [0, 1, 2].map(() => mk(s, 'circle', { r: RPX * 0.11, fill: VC, opacity: 0 }));
const sD = disc(s, O[0], O[1], RPX);
const sF = PUC.arrow(s, FC, 7, 20), sFl = SYM(s, 0, 0, 'F', FC, 26), hand = mk(s, 'circle', { r: 9, fill: '#fff', stroke: FC, 'stroke-width': 3.5 });
const sR = PUC.arrow(s, RC, 4.5, 14), sRl = SYM(s, 0, 0, 'r', RC, 26);
const sL = turnArc(s, LC, 5), sLl = txt(s, O[0] + 40, O[1] - RPX - 22, '', { fill: LC, 'font-weight': 700, 'font-size': 21 });
const sOut = mk(s, 'g', {}); outMk(sOut, 600, 120, FC, false); txt(sOut, 624, 127, 'τ: out of the screen', { fill: FC, 'font-weight': 700, 'font-size': 18 });
const sOut2 = mk(s, 'g', {}); outMk(sOut2, 600, 166, LC, false); txt(sOut2, 624, 173, 'L grows the same way', { fill: LC, 'font-weight': 700, 'font-size': 18 });
txt(s, O[0], O[1] + RPX + 34, 'AXLE = AXIS AT THE CENTRE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const tGo = wt('S3', 'climbs') - 0.5, tFz = wt('S5', 'Freeze') + 0.15, tRes = wt('S6', 'that'), sF0 = 1.0, sFz = sF0 + 0.25 * (tFz - tS5 - 0.1);
const sOf = t => { if (t < tS5) return M.clamp(t - tGo, 0, TPUSH); if (t < tFz) return sF0 + 0.25 * (t - tS5 - 0.1); if (t < tRes) return sFz; if (t < tRes + 0.8) return sFz + 0.25 * (t - tRes);
  const sv = Math.min(TPUSH, sFz + 0.2 + (t - tRes - 0.8)); if (t < tS9 - 0.02) return sv; return TPUSH + (t - tS9 + 0.02); };
const Lof = sv => TQ * M.clamp(sv, 0, TPUSH);
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r</span><span class="v" id="r_r" style="color:${RC}">1.50</span><span class="u">m</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_F" style="color:${FC}">0</span><span class="u">N</span>
  <span class="k" style="color:${FC}">τ</span><span class="v" id="r_tq" style="color:${FC}">0.0</span><span class="u">N m</span>`;
$('#roB').innerHTML = `<span class="k" style="font-style:normal;color:${IC}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${LC}">L</span><span class="v" id="r_L" style="color:${LC}">0.0</span><span class="u">kg m²/s</span>
  <span class="k" style="color:${LC}">dL/dt</span><span class="v" id="r_dL" style="color:${LC}">0</span><span class="u">N m</span>`;
$('#roB').querySelectorAll('.k')[2].style.fontSize = '24px';
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 74, w: 560, h: 146, xmax: 9.4, ymax: 340, xt: [0, 2, 4, 6, 8], yt: [0, 150, 300], xl: 't (s)' });
txt(gs, 122, 80, 'L (kg m²/s)', { 'font-size': 18 });
const gL = g.curve(LC, 5), gD = g.dot(LC, 10), gM = [2, 4].map(x => { const c = mk(gs, 'circle', { cx: g.X(x), cy: g.Y(TQ * x), r: 8, fill: '#fff', stroke: LC, 'stroke-width': 3 }), l = txt(gs, g.X(x) - 12, g.Y(TQ * x) - 14, String(TQ * x), { 'text-anchor': 'end', fill: LC, 'font-weight': 700 }); return [c, l]; });
const th1 = PUC.think($('#th1'), { q: 'No friction. Once he lets go, will L drop, stay the same, or keep growing?', opts: ['L drops', 'L stays the same'], right: 1, why: 'No torque, so no change in L: dL/dt = τ = 0.' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Push longer, more L!' });

/* ---------- D ---------- */
const STEPS = [[`\\vec{${L_}} = \\vec{${r_}} \\times \\vec{${p_}}`, 'angular momentum of one particle'],
  [`\\dfrac{d\\vec{${L_}}}{dt} = \\dfrac{d\\vec{${r_}}}{dt} \\times \\vec{${p_}} + \\vec{${r_}} \\times \\dfrac{d\\vec{${p_}}}{dt}`, 'product rule: keep the order of each cross product'],
  [`\\dfrac{d\\vec{${r_}}}{dt} \\times \\vec{${p_}} = \\vec{${v_}} \\times m\\vec{${v_}} = 0`, 'v and p point the same way'],
  [`\\dfrac{d\\vec{${L_}}}{dt} = \\vec{${r_}} \\times \\vec{${F_}} = \\vec{${tau_}}`, 'dp/dt = F, the net force'],
  [`\\vec{${tau_}}_{\\text{ext}} = \\dfrac{d\\vec{${L_}}}{dt}`, 'many particles: inside torques cancel in pairs']];
const SY = [80, 168, 268, 356, 444];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:84px"></div>` + STEPS.map(([f, w, tg], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${FC}">${tg}</div>` : ''}</div>`).join('');
$('#steps').querySelectorAll('.sx').forEach((e, i) => { e.style.fontSize = '30px'; if (i === 1 || i === 2 || i === 3 || i === 4) e.style.top = '-12px'; });
$('#steps').querySelectorAll('.why').forEach((e, i) => { e.style.top = '0px'; e.style.left = '640px'; e.style.width = '320px'; e.style.whiteSpace = 'normal'; e.style.lineHeight = '1.3'; });
const tStep = [wt('D2', 'particle'), wt('D3', 'Find'), wt('D4', 'velocity'), wt('D5', 'force'), wt('D6', 'many')];
const dp = $('#dpS'), DO = [70, 390], DB = [300, 210], dpa = 25, du = U(dpa);
const dPath = mk(dp, 'line', { x1: DB[0] - du[0] * 220, y1: DB[1] - du[1] * 220, x2: DB[0] + du[0] * 200, y2: DB[1] + du[1] * 200, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const dAx = ptMk(dp, DO[0], DO[1], 12), dR = PUC.arrow(dp, RC, 5, 16), dP = PUC.arrow(dp, PC, 6, 18), dV = PUC.arrow(dp, VC, 5, 15), dF = PUC.arrow(dp, FC, 6, 18), dBl = ball(dp, 14);
dBl.set(DB[0], DB[1]);
const dRl = SYM(dp, (DO[0] + DB[0]) / 2 + 14, (DO[1] + DB[1]) / 2 + 30, 'r', RC, 26), dPl = SYM(dp, DB[0] + du[0] * 150, DB[1] + du[1] * 150 - 10, 'p', PC, 26), dVl = SYM(dp, DB[0] + du[0] * 90 + 4, DB[1] + du[1] * 90 + 34, 'v', VC, 24);
const dFl = SYM(dp, DB[0] + U(115)[0] * 120 - 30, DB[1] + U(115)[1] * 120, 'F', FC, 26);
const dN1 = txt(dp, 262, 398, 'v ∥ p, so v × p = 0', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 20 }), dN2 = txt(dp, 262, 430, 'only r × F is left: the torque', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\vec{${tau_}} = \\dfrac{d\\vec{${L_}}}{dt}`);

/* ---------- R ---------- */
const LK = [`His push makes a torque: <b class="fo">τ</b> = <i class="vi">r</i> <i class="fo">F</i>`, `Torque is the rate L grows: +75 every second`, `A longer push adds more seconds: more L`, `More L means a faster spin`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'push'), wt('R3', 'Torque'), wt('R4', 'longer'), wt('R4', 'more', 1)];
const BARS = [[1, 75], [2, 150], [4, 300]];
$('#bars').innerHTML = BARS.map(([s1, l], i) => `<div class="blab" id="bl${i}" style="left:36px;top:${104 + i * 110}px;color:${C.ink}">push ${s1} s</div><div class="bar" id="bb${i}" style="left:236px;top:${100 + i * 110}px;background:${LC}"></div><div class="blab" id="bv${i}" style="top:${109 + i * 110}px;color:${LC}">L = ${l}</div>`).join('');
$('#rrF').innerHTML = K(`\\Delta${L_} = ${tau_}\\,\\Delta t = 75 \\times \\Delta t`);

/* ---------- K ---------- */
const kl = $('#klS'), KY = 400;
mk(kl, 'line', { x1: 36, y1: KY + 40, x2: 748, y2: KY + 40, stroke: IC, 'stroke-width': 3 });
const cart = mk(kl, 'g', {}); mk(cart, 'rect', { x: 0, y: KY - 50, width: 150, height: 70, rx: 10, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2.5 }); [30, 120].forEach(x => mk(cart, 'circle', { cx: x, cy: KY + 26, r: 14, fill: IC }));
const kF = PUC.arrow(kl, FC, 7, 20), kP = PUC.arrow(kl, PC, 6, 18), kFl = SYM(kl, 0, 0, 'F', FC, 26), kPl = SYM(kl, 0, 0, 'p', PC, 26);
const kr = $('#krS'), KO = [600, 370], kD = disc(kr, KO[0], KO[1], 100), kT = turnArc(kr, FC, 5), kTl = SYM(kr, KO[0] - 160, KO[1] + 10, 'τ', FC, 28), kLl = txt(kr, KO[0] + 130, KO[1] - 90, '', { fill: LC, 'font-weight': 700, 'font-size': 22 });
$('#klF').innerHTML = K(`${F_} = \\dfrac{d${p_}}{dt}`); $('#klF2').innerHTML = K(`\\Delta${p_} = ${F_}\\,\\Delta t \\quad \\text{(impulse)}`);
$('#krF').innerHTML = K(`${tau_} = \\dfrac{d${L_}}{dt}`); $('#krF2').innerHTML = K(`\\Delta${L_} = ${tau_}\\,\\Delta t \\quad \\text{(angular impulse)}`);
$('#klP').innerHTML = `Force × time = change in <i class="pp">p</i>`; $('#krP').innerHTML = `Torque × time = change in <i class="pl">L</i>`;
const th2 = PUC.think($('#th2'), { q: '100 N m for 1 s, or 25 N m for 4 s. Which adds more angular momentum?', opts: ['100 N m for 1 s', 'Both the same'], right: 1, why: '100 × 1 = 25 × 4 = 100 kg m²/s each.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A 0.2 kg ball goes around on a 0.5 m string at 2 m/s. A push gives a torque of 0.3 N m for 2 s. Find its new speed.';
const wsol = PUC.solution($('#wl'), [
  [K(`${L_}_1 = m${v_}${r_} = 0.2 \\times 2 \\times 0.5 = 0.2`)],
  [K(`\\Delta${L_} = ${tau_}\\,\\Delta t = 0.3 \\times 2 = 0.6`)],
  [K(`${L_}_2 = 0.2 + 0.6 = 0.8\\ \\text{kg m}^2\\text{/s}`)],
  [K(`${v_} = \\dfrac{${L_}_2}{m${r_}} = \\dfrac{0.8}{0.1} = ${tc(VC, '8\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 84 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '27px');
const w = $('#wrS'), WO = [300, 300], WR = 150, wb = [WO[0] + WR, WO[1]], wt2 = U(90);
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' }); ptMk(w, WO[0], WO[1], 12);
mk(w, 'line', { x1: WO[0], y1: WO[1], x2: wb[0], y2: wb[1], stroke: C.ink2, 'stroke-width': 2.5 });
const wB = ball(w, 15); wB.set(wb[0], wb[1]);
const wP = PUC.arrow(w, VC, 6, 18), wPl = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 21 }), wT = turnArc(w, FC, 5), wTl = txt(w, WO[0] - 60, WO[1] + 80, 'τ = 0.3 N m', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
const wLl = txt(w, 392, 520, '', { 'text-anchor': 'middle', fill: LC, 'font-weight': 700, 'font-size': 24 });
const tW = [wt('W3', 'First'), wt('W4', 'change'), wt('W5', 'new'), wt('W6', 'v')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'L stays the same only when no force acts', right: 'L stays the same when no torque acts' });
const tp = $('#tpS'), TO = [180, 150], TR = 100, tb = [TO[0] + TR, TO[1]];
mk(tp, 'circle', { cx: TO[0], cy: TO[1], r: TR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' }); ptMk(tp, TO[0], TO[1], 10);
const tR = PUC.arrow(tp, RC, 4, 13), tFa = PUC.arrow(tp, FC, 6, 18), tB = ball(tp, 13); tB.set(tb[0], tb[1]);
const tTx = txt(tp, 320, 120, 'pull along r', { fill: FC, 'font-weight': 700, 'font-size': 21 }), tTx2 = txt(tp, 320, 152, 'so τ = 0, L fixed', { fill: C.ok, 'font-weight': 700, 'font-size': 21 });
const where = PUC.where($('#wa'), { on: [], type: 'Torque as dL/dt, angular impulse, and L of a falling body about a point' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 0.5 kg ball is dropped from rest at the point (2 m, 20 m). Take g = 10 m/s². Its angular momentum about the origin after 1&nbsp;s is', qW: 760,
  opts: [K('5\\ \\text{kg m}^2\\text{/s}'), K('10\\ \\text{kg m}^2\\text{/s}'), K('20\\ \\text{kg m}^2\\text{/s}'), K('100\\ \\text{kg m}^2\\text{/s}')], right: 1, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`m g = 5\\ \\text{N down, at } x = 2\\ \\text{m}`)], [K(`${tau_} = 2 \\times 5 = 10\\ \\text{N m (constant)}`)],
  [K(`${L_} = ${tau_}\\,t = 10 \\times 1 = 10`)], [K(`\\text{check: } ${p_} = 5,\\ ${rp_} = 2 \\Rightarrow 10`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '24px');
const tSo = [wt('A2', 'Gravity'), wt('A2', 'torque'), wt('A3', 'L'), wt('A4', 'Check')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · torque and angular momentum', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`\\vec{${tau_}} = d\\vec{${L_}}/dt \\qquad \\text{particle: } d\\vec{${L_}}/dt = \\vec{${r_}} \\times \\vec{${F_}}`), K(`\\Delta${L_} = ${tau_}\\,\\Delta t \\quad \\text{(angular impulse, constant torque)}`),
    '<b>Line</b>: F = dp/dt &nbsp;·&nbsp; <b>Turning</b>: τ = dL/dt', '<b>No torque about a point</b>: L about it stays the same, even if a force acts'] });
const YQ = ['Why does a longer push spin a merry-go-round faster?', 'Why is v × p always zero?', 'Why does the ball on a string keep its L, though the string pulls it?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 102', topic: 'See-saw balance: Equilibrium of a Rigid Body', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS7 + 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px';
  BARS.forEach(([, l], i) => { const W = 380 * l / 300; $('#bb' + i)._W = W; $('#bv' + i).style.left = (236 + W + 14) + 'px'; }); }

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
    ROW.forEach((r, i) => r.set(M.io((t - tMorph - 0.8 - i * 0.5) / 1.2))); rd.set(Math.max(0, t - tMorph - 1.5) * 1.5);
    vis($('#hjP'), t, wt('H2', 'spin') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 30 });
    const a = hPhi(t); hD.set(a);
    const pA = a - 90 * D2R, pp = [HO[0] + 130 * Math.cos(pA), HO[1] - 130 * Math.sin(pA)], tg = [-Math.sin(pA), -Math.cos(pA)], fo = M.io((t - tFast + 0.2) / 0.3);
    hF.set(pp[0], pp[1], pp[0] + tg[0] * 90 * fo, pp[1] + tg[1] * 90 * fo);
    vis($('#hp0'), t, wt('H3', 'slowly') - 0.1, 1e9, POP); vis($('#hp1'), t, wt('H4', 'faster') - 0.1, 1e9, POP);
    vis($('#hkQ'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#ig0'), t, wt('P1', 'torque') - 0.15, 1e9, POP); vis($('#ig1'), t, wt('P1', 'Angular') - 0.15, 1e9, POP); vis($('#igP'), t, T0('P3') + 0.2, 1e9, POP);
    vis($('#pm'), t, tP2 - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pmF'), t, wt('P2', 'Torque') - 0.1, 0.8); vis($('#pmW'), t, wt('P2', 'rate') - 0.1, 1e9, POP);
    vis($('#pmL2'), t, wt('P3', 'force') - 0.2, 1e9, { dy: 8 }); PUC.write($('#pmF2'), t, wt('P3', 'force'), 0.7);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#exS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const sv = sOf(t), ph = phiOf(sv); sD.set(ph);
    const pushing = sv > 0 && sv < TPUSH, frozen = t >= tFz && t < tRes, replay = t >= tS5 && t < tRes + 0.8;
    const seatA = (90 * D2R), gstep = replay ? 0.04 : 0.12;
    ghS.forEach((e, j) => { const pj = phiOf(Math.max(0, sv - gstep * (j + 1))), x = O[0] + RPX * 0.72 * Math.cos(seatA + pj), y = O[1] - RPX * 0.72 * Math.sin(seatA + pj); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = !frozen && sv > 0.3 && (ph - pj) > 0.02 && (t < tS4 || t > tS9 - 0.1 || replay) ? [0.3, 0.2, 0.12][j] : 0; });
    const pA = ph - 90 * D2R, pp = [O[0] + RPX * Math.cos(pA), O[1] - RPX * Math.sin(pA)], tg = [-Math.sin(pA), -Math.cos(pA)];
    const aim = t >= wt('S2', 'pushes') - 0.2 && sv <= 0 ? M.io((t - wt('S2', 'pushes') + 0.2) / 0.3) : 0, fo = pushing ? Math.min(1, sv / 0.1) : aim;
    attr(hand, 'cx', pp[0].toFixed(1)); attr(hand, 'cy', pp[1].toFixed(1)); M.hide(hand, !(fo > 0.01 || (sv >= TPUSH && t < tS9)));
    sF.set(pp[0], pp[1], pp[0] + tg[0] * 110 * fo, pp[1] + tg[1] * 110 * fo); attr(sFl, 'x', (pp[0] + tg[0] * 130 - 8).toFixed(1)); attr(sFl, 'y', (pp[1] + tg[1] * 130 - 14).toFixed(1)); sFl.style.opacity = fo;
    const ur = replay ? M.io((t - wt('S6', 'runs') + 0.1) / 0.4) * (1 - M.io((t - tRes - 0.5) / 0.3)) : 0;
    sR.set(O[0], O[1], O[0] + (pp[0] - O[0]) * 0.94 * ur, O[1] + (pp[1] - O[1]) * 0.94 * ur); attr(sRl, 'x', ((O[0] + pp[0]) / 2 + 14).toFixed(1)); attr(sRl, 'y', ((O[1] + pp[1]) / 2 + 6).toFixed(1)); sRl.style.opacity = ur;
    vis(sOut, t, wt('S6', 'torque') - 0.1, tRes + 0.6, { dy: 6 }); vis(sOut2, t, wt('S6', 'grows') - 0.2, tRes + 0.6, { dy: 6 });
    const Lv = Lof(sv); sL.set(O[0], O[1], 38, 100, 300 * Lv / 300); M.setT(sLl, 'L = ' + Math.round(Lv)); sLl.style.opacity = Lv > 1 ? 1 : 0;
    // readout: round t first
    const tr = Math.round(sv * 100) / 100, Lr = Lof(tr), pr = tr > 0 && tr < TPUSH;
    M.setT($('#r_t'), tr.toFixed(2)); M.setT($('#r_F'), pr ? String(FN) : '0'); M.setT($('#r_tq'), (pr ? TQ : 0).toFixed(1)); M.setT($('#r_L'), Lr.toFixed(1)); M.setT($('#r_dL'), pr ? String(TQ) : '0');
    M.setT($('#roT'), replay ? 'REPLAY' : sv >= TPUSH && t > tS9 ? 'LET GO' : sv >= TPUSH ? 'PUSH DONE' : sv > 0 ? 'PUSHING' : 'AT REST'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_dL').style.background = mix('#FFFFFF', '#F3DCE8', M.io((t - wt('S3', 'climbs') + 0.1) / 0.3) * (1 - M.io((t - tS4) / 0.3)));
    // graph
    gL(x => [x, Lof(x)], 0, Math.min(8.4, t >= tS5 && t < tS9 ? TPUSH : sv), 60); gD(Math.min(8.4, sv), Lof(sv), t > tGo - 0.1);
    gM.forEach(([c, l], i) => { const u = M.io((t - wt('S4', i ? 'four' : 'two') + 0.1) / 0.3); c.style.opacity = u; l.style.opacity = u; });
    vis($('#grT'), t, wt('S3', 'climbs') - 0.1, 1e9, POP);
    vis($('#smo'), t, tS5 - 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    const paused = (t > tGo + TPUSH && t < tS5) || (t > tRes + 0.8 && sv >= TPUSH && t < tS9 - 0.02);
    vis($('#pau'), t, paused ? Math.max(tGo + TPUSH, t - 10) : 1e9, paused ? 1e9 : 0, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#th1'), t, tS8 + 0.05, OUT('S9'), { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'drop') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: tS9 - 0.02, tWhy: wt('S9', 'No') });
    avA(t, wt('S4', 'Twice') + 0.2, OUT('S5'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    vis(dAx, t, tD1 + 0.6, 1e9, { dy: 0 }); vis(dBl.o, t, tD1 + 0.7, 1e9, { dy: 0 }); vis(dPath, t, tD1 + 0.8, 1e9, { dy: 0 });
    const L0 = Math.hypot(DB[0] - DO[0], DB[1] - DO[1]), u0 = M.o3((t - tStep[0] + 0.1) / 0.5), u1 = M.o3((t - tStep[0] + 0.3) / 0.5);
    dR.set(DO[0], DO[1], DO[0] + (DB[0] - DO[0]) * u0 * (L0 - 16) / L0, DO[1] + (DB[1] - DO[1]) * u0 * (L0 - 16) / L0); dRl.style.opacity = u0;
    dP.set(DB[0] + du[0] * 16, DB[1] + du[1] * 16, DB[0] + du[0] * (16 + 120 * u1), DB[1] + du[1] * (16 + 120 * u1)); dPl.style.opacity = u1;
    const uv = M.o3((t - wt('D4', 'velocity') + 0.1) / 0.5), nv = U(dpa - 90);
    dV.set(DB[0] + du[0] * 16 + nv[0] * 22, DB[1] + du[1] * 16 + nv[1] * 22, DB[0] + du[0] * (16 + 70 * uv) + nv[0] * 22, DB[1] + du[1] * (16 + 70 * uv) + nv[1] * 22); dVl.style.opacity = uv;
    vis(dN1, t, wt('D4', 'zero') - 0.1, 1e9, { dy: 6 });
    const uf = M.o3((t - wt('D5', 'force') + 0.1) / 0.5), fu = U(115); dF.set(DB[0], DB[1], DB[0] + fu[0] * 110 * uf, DB[1] + fu[1] * 110 * uf); dFl.style.opacity = uf;
    vis(dN2, t, wt('D5', 'torque') - 0.1, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Torque') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'change') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    BARS.forEach((_, i) => { const t0 = (i === 0 ? tLk[1] : tLk[2]) + i * 0.3, u = M.o3((t - t0) / 0.6); vis($('#bl' + i), t, t0 - 0.2, 1e9, { dy: 8 }); $('#bb' + i).style.width = (($('#bb' + i)._W || 0) * u).toFixed(1) + 'px'; M.hide($('#bb' + i), u <= 0); vis($('#bv' + i), t, t0 + 0.4, 1e9, POP); });
    PUC.write($('#rrF'), t, tLk[2] + 1.0, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tk = Math.max(0, t - tK1 - 0.6), cx = 140 + Math.min(240, 0.5 * 40 * tk * tk); attr(cart, 'transform', `translate(${cx.toFixed(1)},0)`);
    kF.set(cx - 100, KY - 15, cx - 6, KY - 15); attr(kFl, 'x', cx - 60); attr(kFl, 'y', KY - 30);
    const pl = Math.min(120, 30 * tk); kP.set(cx + 160, KY - 15, cx + 160 + pl, KY - 15); attr(kPl, 'x', cx + 170 + pl / 2); attr(kPl, 'y', KY - 30); kPl.style.opacity = pl > 10 ? 1 : 0;
    PUC.write($('#klF'), t, wt('K1', 'force') - 0.1, 0.7); PUC.write($('#klF2'), t, wt('K1', 'times') - 0.1, 0.7); vis($('#klP'), t, wt('K1', 'change') - 0.1, 1e9, POP);
    const tr2 = Math.max(0, t - T0('K2') - 0.3); kD.set(0.5 * 0.5 * Math.min(tr2, 4) ** 2 + (tr2 > 4 ? 2 * (tr2 - 4) : 0)); kT.set(KO[0], KO[1], 125, 150, 80 * M.io(tr2 / 0.6));
    PUC.write($('#krF'), t, wt('K2', 'torque') - 0.1, 0.7); PUC.write($('#krF2'), t, wt('K2', 'times') - 0.1, 0.7); vis($('#krP'), t, wt('K2', 'angular', 1) - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'One') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, tW1 + 0.7, 1e9, { dy: 8 });
    const vNow = 2 + 6 * M.io((t - wt('W6', 'v') + 0.1) / 0.8), L = 18 * vNow, u0 = M.o3((t - T0('W2') - 0.3) / 0.5);
    wP.set(wb[0] + wt2[0] * 16, wb[1] + wt2[1] * 16, wb[0] + wt2[0] * (16 + L * u0), wb[1] + wt2[1] * (16 + L * u0)); attr(wPl, 'x', (wb[0] + 18).toFixed(1)); attr(wPl, 'y', (wb[1] - 16 - L / 2).toFixed(1)); M.setT(wPl, 'v = ' + vNow.toFixed(0) + ' m/s'); wPl.style.opacity = u0;
    const ut = M.io((t - wt('W4', 'torque') + 0.1) / 0.5); wT.set(WO[0], WO[1], 46, 200, 160 * ut); wTl.style.opacity = ut;
    M.setT(wLl, t >= wt('W5', 'new') - 0.1 ? 'L: 0.2 → 0.8 kg m²/s' : 'L = 0.2 kg m²/s'); vis(wLl, t, wt('W3', 'First') + 0.3, 1e9, { dy: 6 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'torque') - 0.2 });
    const ur = M.o3((t - tX1 - 0.4) / 0.5); tR.set(TO[0], TO[1], TO[0] + (TR - 16) * ur, TO[1]);
    const uf = M.o3((t - wt('X3', 'pulls') + 0.1) / 0.5); tFa.set(tb[0] - 16, tb[1], tb[0] - 16 - 60 * uf, tb[1]); tTx.style.opacity = uf; tTx2.style.opacity = M.io((t - wt('X3', 'zero') + 0.1) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'torque') });
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
