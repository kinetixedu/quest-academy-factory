// PUC Physics Ep 98: Angular acceleration and rotational kinematics (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const WC = C.ac, AC = C.red, TC = C.gold, VC = C.ac, XC = C.violet;    // omega blue, alpha red, theta gold, v blue, displacement violet
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180, TAU = 2 * Math.PI;
const w_ = tc(WC, '\\omega'), w0 = tc(WC, '\\omega_0'), a_ = tc(AC, '\\alpha'), th_ = tc(TC, '\\theta');

/* ceiling fan seen from below: 3 blades, angle a (rad) turns anticlockwise on screen */
const fan = (p, cx, cy, R, ghost = false) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {});
  [0, 120, 240].forEach(d => mk(g, 'path', { d: `M30,-15 L${R - 22},-25 Q${R},-25 ${R},0 Q${R},25 ${R - 22},25 L30,15 Z`, transform: `rotate(${d})`, fill: ghost ? C.ink2 : '#C9CED8', stroke: ghost ? 'none' : C.ink, 'stroke-width': 2.5 }));
  if (!ghost) { mk(g, 'circle', { r: 38, fill: C.ink2, stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'circle', { r: 12, fill: '#fff', opacity: 0.5 }); }
  return { o, g, set(a) { attr(g, 'transform', `translate(${cx},${cy}) rotate(${(-a / D2R).toFixed(2)})`); } }; };
const curl = (p, cx, cy, r, a0, a1, col, w = 4) => { const P = a => [cx + r * Math.cos(a * D2R), cy - r * Math.sin(a * D2R)], q0 = P(a0), q1 = P(a1), big = Math.abs(a1 - a0) > 180 ? 1 : 0, sw = a1 > a0 ? 0 : 1;
  const path = mk(p, 'path', { d: `M${q0[0].toFixed(1)},${q0[1].toFixed(1)} A${r},${r} 0 ${big} ${sw} ${q1[0].toFixed(1)},${q1[1].toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' });
  const e = a1 * D2R, s = a1 > a0 ? 1 : -1, tx = -Math.sin(e) * s, ty = -Math.cos(e) * s;
  const head = mk(p, 'path', { d: `M${(q1[0] + tx * 13).toFixed(1)},${(q1[1] + ty * 13).toFixed(1)} L${(q1[0] - ty * 8).toFixed(1)},${(q1[1] + tx * 8).toFixed(1)} L${(q1[0] + ty * 8).toFixed(1)},${(q1[1] - tx * 8).toFixed(1)} Z`, fill: col });
  const gq = mk(p, 'g', {}); gq.appendChild(path); gq.appendChild(head); return gq; };
const outMark = (p, x, y, r, col, out = true) => { const o = mk(p, 'g', {}); mk(o, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: col, 'stroke-width': 3.5 }); if (out) mk(o, 'circle', { cx: x, cy: y, r: r * 0.3, fill: col }); else { const q = r * 0.55; mk(o, 'path', { d: `M${x - q},${y - q} L${x + q},${y + q} M${x + q},${y - q} L${x - q},${y + q}`, stroke: col, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); } return o; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
Object.assign(M.IC, { mixer: ['M7 4h10l-1 10H8z', 'M6 14h12v6H6z', 'M12 8v3'], wheel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M3 12h18'], ferris: ['M12 13a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M12 6l-5 15', 'M12 6l5 15', 'M5 21h14'] });
const JOBS = [['mixer', 'Mixer', 'WHIRS UP TO SPEED', 1], ['wheel', "Potter's wheel", 'FASTER WITH EACH KICK', 1], ['ferris', 'Giant wheel', 'SLOWS TO A STOP', -1]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'mixer'), wt('H1', 'potter'), wt('H1', 'giant')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="330" height="100"></svg></div>`).join('');
const JA = JOBS.map((j, i) => { const s = $('#jsv' + i), o = mk(s, 'g', {}); mk(s, 'circle', { cx: 90, cy: 50, r: 38, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
  const sp = mk(s, 'g', {}); [0, 60, 120].forEach(d => mk(sp, 'line', { x1: -36, y1: 0, x2: 36, y2: 0, stroke: C.ink2, 'stroke-width': 3, transform: `rotate(${d})` })); mk(s, 'circle', { cx: 90, cy: 50, r: 6, fill: C.ink });
  mk(s, 'rect', { x: 160, y: 40, width: 150, height: 20, rx: 6, fill: C.soft }); const bar = mk(s, 'rect', { x: 160, y: 40, width: 0, height: 20, rx: 6, fill: WC });
  txt(s, 160, 30, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' }); return { sp, bar, dir: j[3] }; });
const hs = $('#hkS'); mk(hs, 'rect', { x: 36, y: 76, width: 510, height: 390, rx: 10, fill: '#F1F2F6', stroke: C.line, 'stroke-width': 2 });
const hG = [0, 1, 2].map(() => fan(hs, 290, 270, 170, true)); const hF = fan(hs, 290, 270, 170);
const tHon = wt('H3', 'switches') + 0.4, hAng = t => { const u = Math.max(0, t - tHon); return u < 4 ? 0.5 * 3 * u * u : 24 + 12 * (u - 4); };

/* ---------- P ---------- */
const QR = [['α', AC, 'Angular acceleration', 'how fast ω changes: α = Δω / Δt'], ['s²', C.ink, 'Unit: rad/s²', 'radians per second, every second'], ['⇅', AC, 'α along the axis', 'speeding up: same way as ω · slowing: opposite'], ['=', C.ink, 'Same α for every point', 'just like the same ω, in a rigid body']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 118}px"><div class="qs" style="color:${c};${i ? 'font-style:normal' : ''};${i === 1 ? 'font-size:32px;top:30px' : ''}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'Angular'), wt('P2', 'unit'), wt('P3', 'axis'), wt('P4', 'every')];
const pm = $('#pmS');
const PR = [['SPEEDING UP', 1, 200], ['SLOWING DOWN', -1, 440]].map(([lab, sg, y]) => { const gq = mk(pm, 'g', {}), cx = 300;
  txt(gq, 60, y - 110, lab, { 'font-size': 18, 'font-weight': 600, 'letter-spacing': 1.5, fill: sg > 0 ? C.ok : AC });
  mk(gq, 'line', { x1: cx, y1: y + 40, x2: cx, y2: y - 100, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
  mk(gq, 'ellipse', { cx, cy: y, rx: 150, ry: 36, fill: '#E7EAF0', stroke: C.ink, 'stroke-width': 2.5 });
  const wA = PUC.arrow(gq, WC, 7, 20), aA = PUC.arrow(gq, AC, 7, 20);
  const wl = txt(gq, cx - 50, y - 70, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' }), al = txt(gq, cx + 50, sg > 0 ? y - 70 : y + 70, 'α', { fill: AC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' });
  const note = txt(gq, cx + 190, y + 6, sg > 0 ? 'same way' : 'opposite', { fill: sg > 0 ? C.ok : AC, 'font-weight': 700, 'font-size': 22 });
  return { gq, wA, aA, wl, al, note, sg, cx, y }; });

/* ---------- S: the sim ---------- */
const s = $('#simS'), FC0 = [392, 300], FR = 200, RTIP = 0.6, PXV = 28;
const ring = mk(s, 'circle', { cx: FC0[0], cy: FC0[1], r: FR + 8, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const sG = [0, 1, 2].map(() => fan(s, FC0[0], FC0[1], FR, true)), sF = fan(s, FC0[0], FC0[1], FR);
const swO = mk(s, 'g', {}); mk(swO, 'rect', { x: 52, y: 470, width: 56, height: 84, rx: 10, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); const swK = mk(swO, 'rect', { x: 64, y: 482, width: 32, height: 30, rx: 6, fill: C.ink2 }); const swL = txt(swO, 120, 520, 'OFF', { fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const sCw = curl(s, FC0[0], FC0[1], 64, 200, 320, WC, 4), sCa = curl(s, FC0[0], FC0[1], 86, 200, 300, AC, 4), sCa2 = curl(s, FC0[0], FC0[1], 86, 300, 200, AC, 4);
const sWm = outMark(s, 700, 110, 16, WC), sAm = outMark(s, 700, 156, 16, AC), sAm2 = outMark(s, 700, 156, 16, AC, false);
const sWml = txt(s, 680, 116, 'ω out of page', { 'text-anchor': 'end', fill: WC, 'font-weight': 700, 'font-size': 17 }), sAml = txt(s, 680, 162, '', { 'text-anchor': 'end', fill: AC, 'font-weight': 700, 'font-size': 17 });
const sV = PUC.arrow(s, VC, 6, 18), sAt = PUC.arrow(s, AC, 6, 18), sVl = txt(s, 0, 0, 'v = rω = 4.8 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 }), sAtl = txt(s, 0, 0, 'rα = 2.4 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 19 });
const sRl = mk(s, 'line', { stroke: C.violet, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), sRlt = txt(s, 0, 0, 'r = 0.6 m', { fill: C.violet, 'font-weight': 700, 'font-size': 18 });
const wAt = tau => tau <= 0 ? 0 : tau <= 5 ? 4 * tau : 20, thAt = tau => tau <= 0 ? 0 : tau <= 5 ? 2 * tau * tau : 50 + 20 * (tau - 5);
const w2At = u => u <= 0 ? 20 : u <= 5 ? 20 - 4 * u : 0, th2At = u => u <= 0 ? 0 : u <= 5 ? 20 * u - 2 * u * u : 50;
const tOn = wt('S1', 'Switch') + 0.1, tFz = wt('S6', 'two') + 0.2, tRA = 2 - 0.25 * (tFz - tS6), tRes = OUT('S10') + 0.25, tOff = wt('S10', 'shrinks') - 0.2;
function state(t) {
  if (t >= tRes) { const u = t - tOff; return { r: 2, tau: u, w: w2At(u), th: th2At(u), al: u > 0 && u < 5 ? -4 : 0 }; }
  if (t >= tS6) { const tau = t < tFz ? tRA + 0.25 * (t - tS6) : 2; return { r: 1, tau, w: wAt(tau), th: thAt(tau), al: 4, replay: t < tFz, frozen: t >= tFz }; }
  const tau = t - tOn; return { r: 1, tau: Math.max(0, tau), w: wAt(tau), th: thAt(tau), al: tau > 0 && tau < 5 ? 4 : 0 };
}
$('#roA').innerHTML = `<span class="k" style="color:${C.ink};font-style:normal">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${WC}">ω</span><span class="v" id="r_w" style="color:${WC}">0.0</span><span class="u">rad/s</span>
  <span class="k" style="color:${AC}">α</span><span class="v" id="r_a" style="color:${AC}">0</span><span class="u">rad/s²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">0.0</span><span class="u">rad</span>
  <span class="k" style="color:${C.ink};font-style:normal;font-size:22px">turns</span><span class="v" id="r_n">0.00</span><span class="u"></span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 560, h: 160, xmax: 24, ymin: 0, ymax: 24, xt: [0, 5, 10, 15, 20], yt: [0, 10, 20], xl: 't (s)' });
attr(g.xlab, 'x', 696); attr(g.xlab, 'text-anchor', 'start'); txt(gs, 122, 70, 'ω (rad/s)', { 'font-size': 18 });
const gA1 = mk(gs, 'path', { fill: TC, opacity: 0.35 }), gA2 = mk(gs, 'path', { fill: TC, opacity: 0.12 }), gC = g.curve(WC, 5), gC2 = g.curve(C.ink2, 4), gD = g.dot(WC, 11);
const gL50 = txt(gs, g.X(3.4), g.Y(4), '50 rad', { fill: '#8A5A12', 'font-weight': 700, 'font-size': 18, 'text-anchor': 'middle' }), gSl = txt(gs, g.X(0.5), g.Y(18), 'slope = α = 4', { fill: AC, 'font-weight': 700, 'font-size': 18 });
const areaP = (a, b, f) => { if (b <= a + 0.01) return ''; let d = `M${g.X(a).toFixed(1)},${g.Y(0).toFixed(1)}`; for (let i = 0; i <= 30; i++) { const x = a + (b - a) * i / 30; d += ` L${g.X(x).toFixed(1)},${g.Y(f(x)).toFixed(1)}`; } return d + ` L${g.X(b).toFixed(1)},${g.Y(0).toFixed(1)} Z`; };
const th1 = PUC.think($('#th1'), { q: 'Now switch it off, and it slows down. Does α point the same way as ω, or opposite?', opts: ['Same way', 'Opposite'], right: 1, why: 'ω keeps its direction but shrinks, so α points the other way.' });

/* ---------- D ---------- */
const STEPS = [[`${a_} = \\dfrac{d${w_}}{dt}`, 'like a = dv/dt'], [`${w_} = ${w0} + ${a_}t`, 'like v = u + at'], [`${th_} = ${w0}t + \\tfrac12${a_}t^2`, 'area under the ω line · like s = ut + ½at²'], [`${w_}^2 = ${w0}^2 + 2${a_}${th_}`, 'remove t · like v² = u² + 2as']];
const SY = [80, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:100px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="left:430px;top:12px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), dg = PUC.graph(dp, { x: 80, y: 70, w: 380, h: 300, xmax: 5, ymin: 0, ymax: 25, xt: [], yt: [] });
const DW0 = 6, DA = 3.2, dW = x => DW0 + DA * x;
const dRect = mk(dp, 'rect', { x: dg.X(0), y: dg.Y(DW0), width: dg.X(5) - dg.X(0), height: dg.Y(0) - dg.Y(DW0), fill: TC, opacity: 0 });
const dTri = mk(dp, 'polygon', { points: `${dg.X(0)},${dg.Y(DW0)} ${dg.X(5)},${dg.Y(DW0)} ${dg.X(5)},${dg.Y(dW(5))}`, fill: TC, opacity: 0 });
const dLine = mk(dp, 'path', { d: `M${dg.X(0)},${dg.Y(DW0)} L${dg.X(5)},${dg.Y(dW(5))}`, fill: 'none', stroke: WC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dSl = mk(dp, 'path', { d: `M${dg.X(0.6)},${dg.Y(dW(0.6))} H${dg.X(1.8)} V${dg.Y(dW(1.8))}`, fill: 'none', stroke: AC, 'stroke-width': 3 });
const dL = [txt(dp, dg.X(2.5), dg.Y(DW0 / 2) + 8, 'ω₀ t', { 'text-anchor': 'middle', fill: '#8A5A12', 'font-weight': 700, 'font-size': 22 }), txt(dp, dg.X(3.9), dg.Y(DW0 + 3.5), '½ α t²', { 'text-anchor': 'middle', fill: '#8A5A12', 'font-weight': 700, 'font-size': 22 }),
  txt(dp, dg.X(1.8) + 10, dg.Y(dW(1.2)) + 10, 'α', { fill: AC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dp, dg.X(0) - 10, dg.Y(DW0) + 6, 'ω₀', { 'text-anchor': 'end', fill: WC, 'font-weight': 700, 'font-size': 20 }), txt(dp, dg.X(5) + 8, dg.Y(dW(5)) + 6, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 22 }),
  txt(dp, dg.X(5), dg.Y(0) + 30, 't', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' })];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${w_} = ${w0} + ${a_}t \\quad\\; ${th_} = ${w0}t + \\tfrac12${a_}t^2 \\quad\\; ${w_}^2 = ${w0}^2 + 2${a_}${th_}`);

/* ---------- R ---------- */
const LK = [`One blade turns as one piece: one ω`, `So ω changes by the same amount: same α`, `Speed is v = rω, so the gain in speed is rα`, `Farther out, bigger r: the tip gains fastest`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px;height:84px"><div class="n" style="top:19px">${i + 1}</div><div class="lt" style="height:84px">${h}</div></div>`).join('');
const tLk = [wt('R2', 'whole'), wt('R3', 'So'), wt('R4', 'speed'), wt('R4', 'tip')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So the tip of my fan gains speed three times faster!' });
const rr = $('#rrS'), RH = [110, 400], RPX = 900, RV = 26;
mk(rr, 'path', { d: `M${RH[0] + 30},${RH[1] - 18} L${RH[0] + 560},${RH[1] - 26} Q${RH[0] + 590},${RH[1]} ${RH[0] + 560},${RH[1] + 26} L${RH[0] + 30},${RH[1] + 18} Z`, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2.5 });
mk(rr, 'circle', { cx: RH[0], cy: RH[1], r: 40, fill: C.ink2, stroke: C.ink, 'stroke-width': 2.5 });
const RPT = [0.2, 0.4, 0.6].map((r, i) => { const x = RH[0] + r * RPX; mk(rr, 'circle', { cx: x, cy: RH[1], r: 8, fill: C.ink }); txt(rr, x, RH[1] + 52, `r = ${r} m`, { 'text-anchor': 'middle', fill: C.violet, 'font-weight': 700, 'font-size': 19 });
  return { r, x, b: PUC.arrow(rr, '#9DB7EE', 6, 18), a: PUC.arrow(rr, VC, 6, 18), d: mk(rr, 'line', { stroke: AC, 'stroke-width': 7, 'stroke-linecap': 'round' }), dl: txt(rr, x + 18, 0, `+${(r * 4).toFixed(1)}`, { fill: AC, 'font-weight': 700, 'font-size': 20 }) }; });
const rLeg = txt(rr, 392, 540, 'light: ω = 8 · dark: 1 s later, ω = 12 · red: gain rα', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 18 });

/* ---------- K ---------- */
const kh = $('#khS'); mk(kh, 'line', { x1: 60, y1: 190, x2: 720, y2: 190, stroke: C.ink, 'stroke-width': 3 });
const kBk = mk(kh, 'rect', { y: 150, width: 44, height: 40, rx: 8, fill: C.ink }), kBv = PUC.arrow(kh, VC, 5, 16);
const kg1 = PUC.graph(kh, { x: 110, y: 250, w: 520, h: 170, xmax: 5, ymin: 0, ymax: 12, xt: [0, 5], yt: [0, 10], xl: 't (s)' }); attr(kg1.xlab, 'x', 656); attr(kg1.xlab, 'text-anchor', 'start');
const kA1 = mk(kh, 'path', { fill: XC, opacity: 0.18 }), kC1 = kg1.curve(VC, 5), kD1 = kg1.dot(VC, 9); txt(kh, 122, 256, 'v (m/s)', { 'font-size': 17 });
const kl = $('#klS'), kF = fan(kl, 392, 150, 92);
const kg2 = PUC.graph(kl, { x: 110, y: 250, w: 520, h: 170, xmax: 5, ymin: 0, ymax: 24, xt: [0, 5], yt: [0, 20], xl: 't (s)' }); attr(kg2.xlab, 'x', 656); attr(kg2.xlab, 'text-anchor', 'start');
const kA2 = mk(kl, 'path', { fill: TC, opacity: 0.3 }), kC2 = kg2.curve(WC, 5), kD2 = kg2.dot(WC, 9); txt(kl, 122, 256, 'ω (rad/s)', { 'font-size': 17 });
$('#khC').innerHTML = `<span style="color:${AC}">a = 2</span><span style="color:${VC}">v = 10 m/s</span><span style="color:${XC}">s = 25 m</span>`;
$('#klC').innerHTML = `<span style="color:${AC}">α = 4</span><span style="color:${WC}">ω = 20 rad/s</span><span style="color:#8A5A12">θ = 50 rad</span>`;
const kArea = (gr, f, b) => { if (b < 0.01) return ''; let d = `M${gr.X(0)},${gr.Y(0)}`; for (let i = 0; i <= 20; i++) { const x = b * i / 20; d += ` L${gr.X(x).toFixed(1)},${gr.Y(f(x)).toFixed(1)}`; } return d + ` L${gr.X(b).toFixed(1)},${gr.Y(0)} Z`; };
const th2 = PUC.think($('#th2'), { q: 'Fan A: 0 to 20 rad/s in 5 s. Fan B: 10 to 30 rad/s in 5 s. Which has the bigger α?', opts: ['Fan B', 'The same'], right: 1, why: 'Both gain 20 rad/s in 5 s: α = 4 for both.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `From rest, the fan reaches 20 rad/s in 5 s, with steady α. Find α, and the number of turns.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${w_} = ${w0} + ${a_}t:\\; 20 = 0 + 5${a_} \\Rightarrow ${a_} = 4\\,\\text{rad/s}^2`)],
  [K(`${th_} = \\tfrac12${a_}t^2 = \\tfrac12(4)(25) = 50\\,\\text{rad}`)],
  [K(`1\\ \\text{turn} = 2\\pi\\,\\text{rad}`)],
  [K(`\\text{turns} = \\tfrac{50}{2\\pi} \\approx 7.96`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 88 });
$('#wl .lbl').style.top = '30px'; $('#wl').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '27px');
const w = $('#wrS'), wg = PUC.graph(w, { x: 110, y: 90, w: 520, h: 170, xmax: 5, ymin: 0, ymax: 24, xt: [0, 5], yt: [0, 20], xl: 't (s)' }); attr(wg.xlab, 'x', 656); attr(wg.xlab, 'text-anchor', 'start');
const wA = mk(w, 'path', { fill: TC, opacity: 0.3 }), wC = wg.curve(WC, 5); txt(w, 122, 96, 'ω (rad/s)', { 'font-size': 17 });
const wAl = txt(w, wg.X(3.3), wg.Y(5), 'area = 50 rad', { 'text-anchor': 'middle', fill: '#8A5A12', 'font-weight': 700, 'font-size': 20 });
const WT = [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const cx = 92 + i * 86, cy = 400; mk(w, 'circle', { cx, cy, r: 34, fill: '#fff', stroke: C.line, 'stroke-width': 3 }); return { cx, cy, p: mk(w, 'path', { fill: TC, opacity: 0.75 }) }; });
const wN = txt(w, 392, 488, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 26 });
const pie = (cx, cy, r, f) => { if (f <= 0) return ''; if (f >= 0.999) return `M${cx - r},${cy} A${r},${r} 0 1 1 ${cx + r},${cy} A${r},${r} 0 1 1 ${cx - r},${cy} Z`; const a = -Math.PI / 2 + f * TAU, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${f > 0.5 ? 1 : 0} 1 ${x.toFixed(1)},${y.toFixed(1)} Z`; };
const tW = [wt('W3', 'Omega'), wt('W4', 'Theta'), wt('W5', 'One'), wt('W6', 'That')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${th_} = 50`)} &nbsp;so 50 turns`, right: `${K(`${th_} = 50\\,\\text{rad}`)} &nbsp;÷ 2π ≈ 8 turns` });
const tp = $('#tpS'), TPc = [470, 140];
mk(tp, 'circle', { cx: TPc[0], cy: TPc[1], r: 70, fill: 'none', stroke: C.line, 'stroke-width': 3 }); mk(tp, 'circle', { cx: TPc[0], cy: TPc[1], r: 6, fill: C.ink });
const tArc = mk(tp, 'path', { d: `M${TPc[0] + 70},${TPc[1]} A70,70 0 1 0 ${TPc[0] + 69.9},${TPc[1] + 3}`, fill: 'none', stroke: TC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tL = txt(tp, TPc[0], TPc[1] + 108, '1 turn = 2π rad ≈ 6.28 rad', { 'text-anchor': 'middle', fill: '#8A5A12', 'font-weight': 700, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Wheels that speed up or brake, angles and turns in a given time' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A wheel speeds up steadily from 10 rad/s to 30 rad/s while turning through 80 rad. Find α and the time taken.', qW: 760,
  opts: [K('\\alpha = 5\\ \\text{rad/s}^2,\\ t = 8\\,\\text{s}'), K('\\alpha = 5\\ \\text{rad/s}^2,\\ t = 4\\,\\text{s}'), K('\\alpha = 10\\ \\text{rad/s}^2,\\ t = 2\\,\\text{s}'), K('\\alpha = 2.5\\ \\text{rad/s}^2,\\ t = 8\\,\\text{s}')], right: 1, cols: 1, optW: 968, optH: 64, optFs: 26, optY: 276 });
const so = PUC.solution($('#so'), [
  [K(`${w_}^2 = ${w0}^2 + 2${a_}${th_}`)], [K(`900 = 100 + 160${a_}`)], [K(`${a_} = 5\\,\\text{rad/s}^2`)], [K(`30 = 10 + 5t \\Rightarrow t = 4\\,\\text{s}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '26px');
const tSo = [wt('A2', 'Use'), wt('A2', 'Nine'), wt('A3', 'Alpha'), wt('A4', 'Then')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · angular acceleration', y0: 100, dy: 100, txt: [0, 0, 0, 1],
  lines: [K(`${a_} = \\tfrac{d${w_}}{dt}\\ \\ (\\text{rad/s}^2), \\qquad a_t = r${a_}`), K(`${w_} = ${w0} + ${a_}t, \\qquad ${th_} = ${w0}t + \\tfrac12${a_}t^2`), K(`${w_}^2 = ${w0}^2 + 2${a_}${th_}`), '<b>θ is in radians</b>: turns = θ ÷ 2π'] });
const YQ = ['What does an α of 4 rad/s² mean?', 'When does α point opposite to ω?', 'Why must you divide θ by 2π to get turns?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 99', topic: 'Why are door handles far from the hinge? Torque', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS9 - 0.6, 1, 960, 540]]);
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
    JA.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = M.clamp(t - tMorph - 0.6, 0, 6), al = 1.6;
      const wv = q.dir > 0 ? al * u : Math.max(0, 6 - al * u * 0.8), ang = q.dir > 0 ? 0.5 * al * u * u : (u < 6 / (al * 0.8) ? 6 * u - 0.4 * al * u * u : 6 * 6 / (al * 1.6));
      attr(q.sp, 'transform', `translate(90,50) rotate(${(-ang / D2R).toFixed(1)})`); attr(q.bar, 'width', (150 * Math.min(1, wv / 9.6)).toFixed(1)); });
    vis($('#hjP'), t, wt('H2', 'turning') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const a = hAng(t); hF.set(a); hG.forEach((gq, j) => { gq.set(hAng(t - 0.035 * (j + 1))); gq.o.style.opacity = t > tHon + 0.5 ? [0.18, 0.11, 0.06][j] : 0; });
    vis($('#hkQ'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    PR.forEach((q, i) => { const t0 = i ? wt('P3', 'Slowing') : wt('P3', 'Speeding'); vis(q.gq, t, i ? t0 - 0.3 : tP1 + 0.6, 1e9, { dy: 0 });
      const uw = M.o3((t - (i ? t0 - 0.2 : tP1 + 0.9)) / 0.5), ua = M.o3((t - t0) / 0.5);
      q.wA.set(q.cx - 24, q.y - 10, q.cx - 24, q.y - 10 - 90 * uw); q.wl.style.opacity = uw;
      q.aA.set(q.cx + 24, q.y - 10, q.cx + 24, q.y - 10 - q.sg * 70 * ua); q.al.style.opacity = ua; q.note.style.opacity = ua; });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S9'), simIn2 = OUT('S10') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    const S = state(t), OFF = -30 * D2R - 8; sF.set(S.th + OFF);
    const moving = !S.frozen && S.w > 0.3;
    sG.forEach((gq, j) => { const pt = state(t - (S.replay ? 0.04 : 0.025) * (j + 1)); gq.set((pt.r === S.r ? pt.th : S.th) + OFF); gq.o.style.opacity = moving ? [0.2, 0.12, 0.07][j] : 0; });
    const on = S.r === 1 ? t >= tOn - 0.05 : t < tOff; attr(swK, 'y', on ? 482 : 512); M.setT(swL, on ? 'ON' : 'OFF'); attr(swK, 'fill', on ? C.ok : C.ink2);
    // omega and alpha markers
    const uw = M.io((t - wt('S2', 'Every') + 0.1) / 0.4), slow = S.r === 2;
    vis(sWm, t, wt('S2', 'Every') - 0.1, 1e9, { dy: 0 }); sWml.style.opacity = uw; sCw.style.opacity = S.w > 0.2 ? uw : 0;
    const showA = Math.abs(S.al) > 0 && t >= wt('S2', 'Alpha') - 0.1;
    sAm.style.opacity = showA && !slow ? 1 : 0; sAm2.style.opacity = showA && slow ? 1 : 0; sCa.style.opacity = showA && !slow ? 1 : 0; sCa2.style.opacity = showA && slow ? 1 : 0;
    M.setT(sAml, slow ? 'α into page' : 'α out of page'); sAml.style.opacity = showA ? 1 : 0;
    // frozen at 2 s: tip velocity and tangential acceleration
    const fz = S.frozen ? 1 : 0, a0 = S.th + OFF, tip = [FC0[0] + FR * Math.cos(a0), FC0[1] - FR * Math.sin(a0)], tx = -Math.sin(a0), ty = -Math.cos(a0), nx2 = Math.cos(a0), ny2 = -Math.sin(a0);
    const uv = fz * M.o3((t - wt('S7', 'tip') + 0.1) / 0.5), ua = fz * M.o3((t - wt('S8', 'speeds') + 0.1) / 0.5), ur = fz * M.io((t - wt('S7', 'zero') + 0.1) / 0.4);
    sV.set(tip[0], tip[1], tip[0] + tx * 4.8 * PXV * uv, tip[1] + ty * 4.8 * PXV * uv); attr(sVl, 'x', (tip[0] + tx * 4.8 * PXV + 10).toFixed(1)); attr(sVl, 'y', (tip[1] + ty * 4.8 * PXV + 6).toFixed(1)); sVl.style.opacity = uv;
    const o2 = 22; sAt.set(tip[0] + nx2 * o2, tip[1] + ny2 * o2, tip[0] + nx2 * o2 + tx * 2.4 * PXV * ua, tip[1] + ny2 * o2 + ty * 2.4 * PXV * ua); attr(sAtl, 'x', (tip[0] + nx2 * (o2 + 14) + tx * 2.4 * PXV).toFixed(1)); attr(sAtl, 'y', (tip[1] + ny2 * (o2 + 14) + ty * 2.4 * PXV + 6).toFixed(1)); sAtl.style.opacity = ua;
    attr(sRl, 'x1', FC0[0]); attr(sRl, 'y1', FC0[1]); attr(sRl, 'x2', tip[0].toFixed(1)); attr(sRl, 'y2', tip[1].toFixed(1)); sRl.style.opacity = ur; attr(sRlt, 'x', ((FC0[0] + tip[0]) / 2 - ny2 * 22 - 40).toFixed(1)); attr(sRlt, 'y', ((FC0[1] + tip[1]) / 2 + nx2 * 22).toFixed(1)); sRlt.style.opacity = ur;
    vis($('#smo'), t, tS6 + 0.05, tFz - 0.2, { ...POP, sc: 0.8, outDur: 0.15 }); vis($('#frz'), t, tFz, simOut, { ...POP, sc: 0.8 });
    // readout: round t first
    const trr = Math.round(S.tau * 100) / 100, wr = S.r === 2 ? w2At(trr) : wAt(trr), thr = S.r === 2 ? th2At(trr) : thAt(trr), alr = S.r === 2 ? (trr > 0 && trr < 5 ? -4 : 0) : (trr > 0 && trr < 5 ? 4 : 0);
    M.setT($('#r_t'), Math.max(0, trr).toFixed(2)); M.setT($('#r_w'), wr.toFixed(1)); M.setT($('#r_a'), String(alr)); M.setT($('#r_th'), thr.toFixed(1)); M.setT($('#r_n'), (thr / TAU).toFixed(2));
    M.setT($('#roT'), S.r === 2 ? 'SWITCHED OFF' : S.frozen || S.replay ? 'REPLAY · t = 2 s' : 'SWITCHED ON'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    const tm = S.r === 1 ? Math.min(24, S.tau) : 24;
    gC(x => [x, wAt(x)], 0, S.r === 1 ? tm : 24, 60); attr(gA1, 'd', areaP(0, Math.min(5, tm), wAt)); attr(gA2, 'd', areaP(5, tm, wAt));
    gC2(x => [x, w2At(x)], 0, S.r === 2 ? M.clamp(S.tau, 0, 24) : 0, 30);
    gD(S.r === 2 ? M.clamp(S.tau, 0, 24) : tm, S.w, t >= tOn - 0.05);
    vis(gL50, t, wt('S5', 'Fifty') - 0.1, 1e9, { dy: 0 }); vis(gSl, t, wt('S3', 'slope') - 0.1, 1e9, { dy: 0 });
    vis($('#th1'), t, tS9 + 0.05, OUT('S10'), { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'Does') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: tS10 - 0.02, tWhy: wt('S10', 'Omega') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 14).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    M.draw(dLine, t, tStep[1] + 0.3, 0.8); vis(dSl, t, tStep[0] + 0.6, 1e9, { dy: 0 }); dL[2].style.opacity = M.io((t - tStep[0] - 0.6) / 0.3); dL[3].style.opacity = M.io((t - tStep[1] - 0.3) / 0.3); dL[4].style.opacity = M.io((t - tStep[1] - 1.0) / 0.3); dL[5].style.opacity = dL[3].style.opacity;
    const ua = M.io((t - wt('D4', 'area') + 0.1) / 0.4); dRect.style.opacity = 0.18 * ua; dTri.style.opacity = 0.4 * M.io((t - wt('D4', 'half') + 0.1) / 0.4); dL[0].style.opacity = ua; dL[1].style.opacity = M.io((t - wt('D4', 'half') + 0.1) / 0.4);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'same') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'turning') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ub = M.o3((t - tLk[0] - 0.3) / 0.6), ua = M.o3((t - tLk[1] - 0.3) / 0.6), ud = M.io((t - tLk[2] - 0.2) / 0.4);
    RPT.forEach((q, i) => { const vb = q.r * 8 * RV, va = q.r * 12 * RV; q.b.set(q.x - 10, RH[1] - 20, q.x - 10, RH[1] - 20 - vb * ub); q.a.set(q.x + 10, RH[1] - 20, q.x + 10, RH[1] - 20 - va * ua);
      attr(q.d, 'x1', q.x + 28); attr(q.d, 'x2', q.x + 28); attr(q.d, 'y1', RH[1] - 20 - vb); attr(q.d, 'y2', RH[1] - 20 - va); q.d.style.opacity = ud; attr(q.dl, 'y', RH[1] - 20 - (vb + va) / 2 + 7); attr(q.dl, 'x', q.x + 40); q.dl.style.opacity = ud;
      if (i === 2) { q.dl.textContent = '+2.4'; } });
    vis(rLeg, t, tLk[1] + 0.3, 1e9, { dy: 0 });
    avA(t, wt('R4', 'fastest') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK1'), t, tK1 + 0.4, 1e9, { dy: 8 });
    const u1 = M.clamp(t - wt('K1', 'speeds'), 0, 5), x1 = 60 + 20 * u1 * u1; attr(kBk, 'x', x1.toFixed(1)); kBv.set(x1 + 44, 170, x1 + 44 + 2 * u1 * 7, 170);
    kC1(x => [x, 2 * x], 0, u1, 20); attr(kA1, 'd', kArea(kg1, x => 2 * x, u1)); kD1(u1, 2 * u1, t > wt('K1', 'speeds'));
    const u2 = M.clamp(t - wt('K2', 'four'), 0, 5), tt2 = Math.max(0, t - wt('K2', 'four')); kF.set(tt2 <= 5 ? 2 * tt2 * tt2 : 50 + 20 * (tt2 - 5));
    kC2(x => [x, 4 * x], 0, u2, 20); attr(kA2, 'd', kArea(kg2, x => 4 * x, u2)); kD2(u2, 4 * u2, t > wt('K2', 'four'));
    vis($('#khC'), t, wt('K1', 'Ten') - 0.1, 1e9, POP); vis($('#klC'), t, wt('K2', 'reaches') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ul = M.clamp((t - T0('W2') - 0.6) / 2.5); wC(x => [x, 4 * x], 0, 5 * ul, 20);
    const ua = M.clamp((t - tW[1]) / 2.0); let d = ''; if (ua > 0) { d = `M${wg.X(0)},${wg.Y(0)}`; for (let i = 0; i <= 20; i++) { const x = 5 * ua * i / 20; d += ` L${wg.X(x).toFixed(1)},${wg.Y(4 * x).toFixed(1)}`; } d += ` L${wg.X(5 * ua).toFixed(1)},${wg.Y(0)} Z`; } attr(wA, 'd', d); wAl.style.opacity = M.clamp((ua - 0.6) / 0.4);
    const th = 50 * M.clamp((t - tW[2]) / (tW[3] - tW[2] + 0.5)), n = th / TAU;
    WT.forEach((q, i) => attr(q.p, 'd', pie(q.cx, q.cy, 30, M.clamp(n - i))));
    M.setT(wN, t >= tW[2] - 0.1 ? `${th.toFixed(1)} rad = ${n.toFixed(2)} turns` : '');
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'theta') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Divide') - 0.1 });
    M.draw(tArc, t, wt('X3', 'radians') - 0.1, 0.8); vis(tL, t, wt('X3', 'Divide'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'wheels') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
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
