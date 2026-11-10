// PUC Physics Ep 109: Rolling motion (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, SC_ = C.violet, AC = C.red, IC = C.ink, OK = C.ok, TC = C.gold;   // v and total velocity blue, spin part R omega violet, a red
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const vv = tc(VC, 'v'), om = tc(VC, '\\omega'), RR = tc(IC, 'R');
const curl = (p, col, sw = 5) => { const g = mk(p, 'g', {}), a = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), h = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, r, a0, s) { if (Math.abs(s) < 0.05) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + s, P = q => [cx + r * Math.cos(q), cy + r * Math.sin(q)], [x0, y0] = P(a0), hs = 14 / r * Math.sign(s), [x1, y1] = P(a1 - hs * 0.6);
    attr(a, 'd', `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(s - hs * 0.6) > Math.PI ? 1 : 0} ${s > 0 ? 1 : 0} ${x1.toFixed(1)},${y1.toFixed(1)}`);
    const [tx, ty] = P(a1), d = [-Math.sin(a1) * Math.sign(s), Math.cos(a1) * Math.sign(s)], n = [Math.cos(a1), Math.sin(a1)];
    attr(h, 'd', `M${(tx + d[0] * 8).toFixed(1)},${(ty + d[1] * 8).toFixed(1)} L${(tx - d[0] * 10 + n[0] * 8).toFixed(1)},${(ty - d[1] * 10 + n[1] * 8).toFixed(1)} L${(tx - d[0] * 10 - n[0] * 8).toFixed(1)},${(ty - d[1] * 10 - n[1] * 8).toFixed(1)} Z`); } }; };
// a cycle wheel at the origin of its own group: tyre, rim, spokes, a gold mark on the rim (at the bottom when phi = 0)
const cwheel = (p, R, o = {}) => { const outer = mk(p, 'g', {}), tr = mk(outer, 'g', {}), g = mk(tr, 'g', {});   // outer: M.vis, tr: position, g: spin
  mk(g, 'circle', { r: R, fill: o.fill ?? '#F4F1EA', stroke: IC, 'stroke-width': o.tyre ?? 9 }); mk(g, 'circle', { r: R - 9, fill: 'none', stroke: '#8D99AE', 'stroke-width': 2 });
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; mk(g, 'line', { x1: 0, y1: 0, x2: (R - 9) * Math.cos(a), y2: (R - 9) * Math.sin(a), stroke: '#8D99AE', 'stroke-width': 1.6 }); }
  const mark = mk(g, 'circle', { cx: 0, cy: R, r: o.mr ?? 9, fill: TC, stroke: '#fff', 'stroke-width': 2 });
  mk(tr, 'circle', { r: 8, fill: '#fff', stroke: IC, 'stroke-width': 3 });
  return { o: outer, g, mark, set(x, y, phi) { attr(tr, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); attr(g, 'transform', `rotate(${(phi * 180 / Math.PI).toFixed(2)})`); } };
};
const road = (p, y, x0 = 36, x1 = 748) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: IC, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const lab = (p, s, col, sz = 22, a = {}) => txt(p, 0, 0, s, Object.assign({ fill: col, 'font-weight': 700, 'font-size': sz }, a));

Object.assign(M.IC, {
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 14l4-7h5l4 7', 'M9.5 7 12 14h-6.5'],
  tyre: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M2 22h20'],
  camera: ['M3 8h4l2-3h6l2 3h4v12H3z', 'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10'), tS11 = T0('S11');
const tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['camera', 'A bicycle photo', 'TOP BLURRED, BOTTOM SHARP'], ['tyre', 'A tyre print', 'CLEAN, NOT SMEARED'], ['bike', "Aarav's photo", 'AT THE COLLEGE GATE']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'photo'), wt('H1', 'top'), wt('H1', 'bottom')];
// the "photo": spokes near the top smeared, near the bottom sharp
const hj = $('#hjS'), HW = [392, 280], HR = 170;
mk(hj, 'rect', { x: 36, y: 84, width: 712, height: 380, rx: 12, fill: '#EEF0F4' });
road(hj, HW[1] + HR + 4, 36, 748);
const hwG = mk(hj, 'g', {});
mk(hwG, 'circle', { cx: HW[0], cy: HW[1], r: HR, fill: '#F7F5EF', stroke: IC, 'stroke-width': 12 });
for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, x2 = HW[0] + (HR - 10) * Math.cos(a), y2 = HW[1] + (HR - 10) * Math.sin(a), up = M.clamp((HW[1] - y2) / HR + 0.15);
  for (let k = 0; k < 5; k++) { const dx = (k - 2) * 9 * up; mk(hwG, 'line', { x1: HW[0] + dx * 0.3, y1: HW[1], x2: x2 + dx, y2, stroke: '#5B6B8C', 'stroke-width': 2, opacity: up > 0.05 ? 0.18 + 0.1 * (1 - up) : (k === 2 ? 0.9 : 0) }); } }
for (let k = 0; k < 7; k++) mk(hwG, 'path', { d: `M${HW[0] - HR + 30},${HW[1] - 40 - k * 16} A${HR},${HR} 0 0 1 ${HW[0] + HR - 30},${HW[1] - 40 - k * 16}`, fill: 'none', stroke: IC, 'stroke-width': 3, opacity: 0.05 });
mk(hwG, 'circle', { cx: HW[0], cy: HW[1], r: 14, fill: '#fff', stroke: IC, 'stroke-width': 4 });
const hTop = lab(hj, 'BLUR', AC, 22, { 'text-anchor': 'middle' }), hBot = lab(hj, 'SHARP', OK, 22, { 'text-anchor': 'middle' });
attr(hTop, 'x', HW[0] + HR + 50); attr(hTop, 'y', HW[1] - HR + 40); attr(hBot, 'x', HW[0] + HR + 50); attr(hBot, 'y', HW[1] + HR - 20);
const hTopA = PUC.arrow(hj, AC, 4, 12), hBotA = PUC.arrow(hj, OK, 4, 12);

/* ---------- P ---------- */
const QR = [[`${tc(VC, '\\vec v')}`, 'Translation', 'the centre moves forward'], [`${om}`, 'Rotation', 'the wheel turns about its centre'], [`${vv} = ${RR}\\,${om}`, 'Rolling without slipping', 'one rule ties them together']];
$('#qrs').innerHTML = QR.map(([s, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 130}px"><div class="qs" style="width:${i === 2 ? 0 : 96}px">${i === 2 ? '' : K(s)}</div><div class="qn" style="${i === 2 ? 'left:24px' : ''}">${n}</div><div class="qd" style="${i === 2 ? 'left:24px' : ''}">${d}</div>${i === 2 ? `<div class="fx" style="right:28px;top:30px;font-size:44px">${K(s)}</div>` : ''}</div>`).join('');
document.querySelectorAll('#qrs .qs .katex').forEach(e => e.style.fontSize = '54px');
const tQr = [wt('P2', 'centre'), wt('P3', 'turns'), wt('P4', 'rule')];
const pm = $('#pmS'), PR = 64, PY = [170, 330, 490];
['TRANSLATION', 'ROTATION', 'ROLLING'].forEach((n, i) => { road(pm, PY[i] + PR + 4, 36, 748); txt(pm, 36, PY[i] - PR - 12, n, { 'font-size': 16, 'font-weight': 600 }); });
const PW = PY.map(y => cwheel(pm, PR, { tyre: 6, mr: 7 }));
const pV = PUC.arrow(pm, VC, 5, 15), pW = curl(pm, VC, 4);

/* ---------- S: the rolling sim ---------- */
const s = $('#simS'), RD = 0.25, VCM = 0.5, OMG = VCM / RD, PXM = 340, R = RD * PXM, YR = 450, YC = YR - R - 4.5, X0 = 100, XEND = 690;   // R = 70 px, centre 140 px/s
road(s, YR, 36, 748);
const trc = mk(s, 'path', { d: '', fill: 'none', stroke: TC, 'stroke-width': 3, 'stroke-dasharray': '2 7', 'stroke-linecap': 'round' });
const ghs = [0.3, 0.2, 0.12].map(op => { const c = mk(s, 'circle', { r: R, fill: 'none', stroke: IC, 'stroke-width': 6, opacity: 0 }); c._op = op; return c; });
const wS = cwheel(s, R);
const sV = PUC.arrow(s, VC, 6, 18), sVl = lab(s, 'v', VC, 26, { 'font-family': 'Poppins', 'font-style': 'italic' }), sW = curl(s, VC, 5), sWl = lab(s, 'ω', VC, 26, { 'font-family': 'Poppins', 'font-style': 'italic' });
const mV = PUC.arrow(s, VC, 5, 15);
// slow-mo vectors at top, front and bottom: translation (blue), spin (violet), total (blue, thick)
const PTS = ['top', 'front', 'bottom'].map(n => ({ n, tr: PUC.arrow(s, VC, 3, 11), sp: PUC.arrow(s, SC_, 3, 11), to: PUC.arrow(s, VC, 7, 20), l: lab(s, '', VC, 21), dot: mk(s, 'circle', { r: 7, fill: IC }) }));
const zeroL = lab(s, 'v − v = 0', OK, 21, { 'text-anchor': 'middle' }), legT = txt(s, 36, 96, '', { 'font-size': 17, 'font-weight': 600, fill: C.ink2 });
const SPX = 120;   // px per m/s for the velocity arrows
const tL1 = wt('S2', 'centre') - 0.2, PASS = (XEND - X0) / (VCM * PXM);  // one pass across the pane, then it starts again
const tFz = wt('S7', 'Freeze') + 0.05, tRes = T0('R1') - 0.2;
// sim time sv: rolls in passes; at the freeze the mark is near the top
const sFz = 1.62, sRA = sFz - 0.25 * (tFz - tS7);
function state(t) {
  if (t >= tS7) return t < tFz ? { sv: sRA + 0.25 * (t - tS7), replay: true } : { sv: sFz, frozen: true };
  if (t >= tL1) return { sv: (t - tL1) % PASS, pass: Math.floor((t - tL1) / PASS) };
  return { sv: 0, ready: true };
}
const geo = sv => { const phi = OMG * sv, xc = X0 + VCM * PXM * sv; return { phi, xc, mx: xc - R * Math.sin(phi), my: YC + R * Math.cos(phi), mvx: VCM - VCM * Math.cos(phi), mvy: -VCM * Math.sin(phi) }; };
$('#roA').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.50</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">ω</span><span class="v" id="r_w" style="color:${VC}">2.00</span><span class="u">rad/s</span>
  <span class="k" style="color:${VC}">Rω</span><span class="v" id="r_rw" style="color:${SC_}">0.50</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="font-style:normal;color:${IC}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${TC};font-style:normal">mark</span><span class="v" id="r_m" style="color:${TC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${TC};font-style:normal">h</span><span class="v" id="r_h" style="color:${TC}">0.00</span><span class="u">m</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 4, ymin: 0, ymax: 1.2, xt: [0, 1, 2, 3], yt: [0, 0.5, 1], xl: 't (s)' });
txt(gs, 122, 78, 'speed (m/s)', { 'font-size': 18 });
const gC = mk(gs, 'line', { x1: g.X(0), y1: g.Y(0.5), x2: g.X(4), y2: g.Y(0.5), stroke: VC, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.6 }), gCl = txt(gs, g.X(4) - 4, g.Y(0.5) - 8, 'centre 0.5', { 'font-size': 16, fill: VC, 'text-anchor': 'end' });
const gM = mk(gs, 'path', { d: '', fill: 'none', stroke: TC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gD = g.dot(TC, 10);
$('#eq1').innerHTML = K(`${om} = \\dfrac{${vv}}{${RR}} = \\dfrac{0.5}{0.25} = 2\\ \\text{rad/s}`);
document.head.insertAdjacentHTML('beforeend', '<style>#eq1{height:76px}</style>');
const th1 = PUC.think($('#th1'), { q: 'Which moves faster: the centre of the wheel, or the top of the wheel?', opts: ['The centre', 'The top'], right: 1, why: 'The top moves at 1 m/s: twice the centre.' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So the bottom spokes really stand still!' });

/* ---------- R: why v = R omega ---------- */
const LK = ['In one turn, every rim point touches the road once', `So the centre moves one rim length: ${K(`2\\pi ${RR}`)}`, `${K(`${vv} = \\dfrac{2\\pi ${RR}}{T}`)} and ${K(`\\dfrac{2\\pi}{T} = ${om}`)}, so ${K(`${vv} = ${RR}\\,${om}`)}`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'one'), wt('R3', 'centre'), wt('R4', 'takes')];
const rs = $('#rrS'), RRr = 64, RX0 = 100, RYr = 380, RYc = RYr - RRr - 4;
road(rs, RYr, 36, 748);
const rTape = mk(rs, 'line', { x1: RX0, y1: RYr - 2, x2: RX0, y2: RYr - 2, stroke: TC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const rW = cwheel(rs, RRr, { tyre: 7 }), rTl = lab(rs, '2πR', TC, 24, { 'text-anchor': 'middle' }), rB = mk(rs, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3 });
const rTx = lab(rs, '', IC, 21, { 'text-anchor': 'middle' });
const tRgo = wt('R2', 'turn') - 0.2;

/* ---------- D ---------- */
const STEPS = [[`${vv}_{\\text{cm}} = ${RR}\\,${om}`, 'no slipping'],
  [`${tc(VC, '\\vec v_P')} = ${tc(VC, '\\vec v_{\\text{cm}}')} + ${tc(SC_, '\\vec v_{\\text{spin}}')}`, 'move with the centre, plus spin'],
  [`\\text{top: } ${vv} + ${RR}${om} = ${tc(VC, '2v')}`, 'both point forward'],
  [`\\text{bottom: } ${vv} - ${RR}${om} = ${tc(OK, '0')}`, 'the contact point is at rest'],
  [`v_P = ${om} \\times d \\quad (d = \\text{distance from contact point})`, 'it turns about the contact point']];
const SY = [84, 172, 260, 348, 436];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'No'), wt('D3', 'Any'), wt('D4', 'top'), wt('D5', 'bottom'), wt('D6', 'instant')];
const dp = $('#dpS'), DC = [262, 250], DR = 110, DP = [DC[0], DC[1] + DR];
mk(dp, 'line', { x1: 24, y1: DP[1] + 4, x2: 500, y2: DP[1] + 4, stroke: IC, 'stroke-width': 3 });
mk(dp, 'circle', { cx: DC[0], cy: DC[1], r: DR, fill: '#F4F1EA', stroke: IC, 'stroke-width': 7 });
mk(dp, 'circle', { cx: DP[0], cy: DP[1], r: 8, fill: OK });
const DL = [[DC[0], DC[1] - DR, 2, 'top: d = 2R → 2v'], [DC[0] + DR, DC[1], Math.SQRT2, 'front: d = √2R → √2v'], [DC[0], DC[1], 1, 'centre: d = R → v']].map(([x, y, k, n], i) => {
  const ln = mk(dp, 'line', { x1: DP[0], y1: DP[1], x2: x, y2: y, stroke: TC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), d = mk(dp, 'circle', { cx: x, cy: y, r: 7, fill: IC });
  const L = 44 * k, dx = -(y - DP[1]), dy = (x - DP[0]), nn = Math.hypot(dx, dy), ar = PUC.arrow(dp, VC, 5, 15); ar.set(x, y, x + dx / nn * L, y + dy / nn * L);
  const tl = txt(dp, 24, 40 + 0, '', { 'font-size': 18, 'font-weight': 700, fill: IC }); tl.textContent = n; attr(tl, 'y', 60 + i * 26);
  const gq = mk(dp, 'g', {}); [ln, d, ar.g, tl].forEach(e => gq.appendChild(e)); return gq; });
txt(dp, DP[0] + 14, DP[1] + 30, 'contact point', { 'font-size': 16, fill: OK, 'font-weight': 700 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vv}_{\\text{cm}} = ${RR}${om} \\qquad v_{\\text{top}} = 2v \\qquad v_{\\text{bottom}} = 0`);

/* ---------- K: rolling vs skidding ---------- */
const KV = [['#khS', 1], ['#klS', 0]].map(([id, roll]) => { const sv = $(id), yr = 400, Rk = 100; road(sv, yr, 36, 748);
  const streak = mk(sv, 'line', { stroke: AC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 }), w = cwheel(sv, Rk, { mr: 8 });
  const bd = mk(sv, 'circle', { r: 9, fill: roll ? OK : AC }), ba = PUC.arrow(sv, roll ? OK : AC, 5, 15), bl = lab(sv, roll ? 'bottom: 0' : 'bottom: slides at v', roll ? OK : AC, 21, { 'text-anchor': 'middle' }), cv = PUC.arrow(sv, VC, 6, 18);
  return { sv, roll, w, bd, ba, bl, cv, yr, Rk, streak }; });
$('#khP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Grips the road: ${K(`${vv} = ${RR}${om}`)}`; $('#klP').innerHTML = `${K(`${om} = 0`)}: the tyre scrapes`;
const th2 = PUC.think($('#th2'), { q: 'A wheel spins fast on ice, but does not move forward. Is its bottom point at rest?', opts: ['Yes, at rest', 'No, it moves'], right: 1, why: 'The centre is still, so the bottom moves backward at Rω.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A small cycle moves at 5 m/s on wheels of radius 0.25 m, rolling without slipping. Find ω, and the speeds of the top and front points.';
const wsol = PUC.solution($('#wl'), [
  [K(`${om} = \\dfrac{${vv}}{${RR}} = \\dfrac{5}{0.25} = ${tc(VC, '20\\ \\text{rad/s}')}`)],
  [K(`v_{\\text{top}} = 2${vv} = ${tc(VC, '10\\ \\text{m/s}')}`)],
  [K(`v_{\\text{front}} = \\sqrt2\\,${vv} \\approx ${tc(VC, '7.1\\ \\text{m/s}')}`)],
  [K(`v_{\\text{bottom}} = ${tc(OK, '0')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 92 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WC = [300, 300], WR = 150; road(w, WC[1] + WR + 5, 36, 748);
const wW = cwheel(w, WR); wW.set(WC[0], WC[1], 0.6);
const WP = [[WC[0], WC[1] - WR, 2, '10 m/s', [0, -18]], [WC[0] + WR, WC[1], Math.SQRT2, '7.1 m/s', [16, 40]], [WC[0], WC[1], 1, '5 m/s', [0, -18]], [WC[0], WC[1] + WR, 0, '0', [40, -10]]].map(([x, y, k, n, o]) => {
  const ar = PUC.arrow(w, VC, 6, 18), L = 70 * k, d = [-(y - (WC[1] + WR)), x - WC[0]], nn = Math.hypot(...d) || 1; const gq = mk(w, 'g', {}); gq.appendChild(ar.g); ar.set(x, y, x + d[0] / nn * L, y + d[1] / nn * L);
  mk(gq, 'circle', { cx: x, cy: y, r: 7, fill: k ? IC : OK }); const l = lab(gq, n, k ? VC : OK, 22); attr(l, 'x', x + d[0] / nn * L + o[0]); attr(l, 'y', y + d[1] / nn * L + o[1]); return gq; });
const wOm = lab(w, 'ω = 20 rad/s', VC, 22); attr(wOm, 'x', 36); attr(wOm, 'y', 120);
const tW = [wt('W3', 'Omega'), wt('W4', 'top'), wt('W5', 'front'), wt('W6', 'bottom')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Bottom point at rest, so its acceleration is zero', right: `It lifts off: ${K(`${tc(AC, 'a')} = ${om}^2 ${RR}`)}, up towards the centre` });
const tp = $('#tpS'), TPc = [300, 120], TPR = 80; road(tp, TPc[1] + TPR + 4, 120, 520);
mk(tp, 'circle', { cx: TPc[0], cy: TPc[1], r: TPR, fill: '#F4F1EA', stroke: IC, 'stroke-width': 6 }); mk(tp, 'circle', { cx: TPc[0], cy: TPc[1] + TPR, r: 8, fill: OK });
const tpA = PUC.arrow(tp, AC, 6, 18); tpA.set(TPc[0], TPc[1] + TPR - 6, TPc[0], TPc[1] + 20); const tpL = lab(tp, 'a = ω²R', AC, 22); attr(tpL, 'x', TPc[0] + 16); attr(tpL, 'y', TPc[1] + 40);
const tpV = lab(tp, 'v = 0', OK, 22); attr(tpV, 'x', TPc[0] + 22); attr(tpV, 'y', TPc[1] + TPR + 2);
const tpG = mk(tp, 'g', {}); [tpA.g, tpL].forEach(e => tpG.appendChild(e));
const where = PUC.where($('#wa'), { on: [], type: 'Speeds of points on a rolling wheel, and rolling with or without slipping' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A wheel of radius R rolls without slipping, its centre moving at v. Find the speed of a rim point at height R/2 above the ground.', qW: 760,
  opts: ['v', 'v/2', '√2 v', '√3 v/2'], right: 0, optY: 300, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{turns about contact: } ${om} = ${vv}/${RR}`)], [K(`d = \\sqrt{2${RR}h},\\ h = ${RR}/2`)],
  [K(`d = \\sqrt{${RR}^2} = ${RR}`)], [K(`v_P = ${om}d = \\tfrac{v}{R}\\cdot R = ${tc(VC, 'v')}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'turns'), wt('A3', 'rim'), wt('A3', 'Here'), wt('A4', 'speed')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · rolling motion', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`${vv}_{\\text{cm}} = ${RR}\\,${om} \\qquad ${tc(VC, '\\vec v_P')} = ${tc(VC, '\\vec v_{\\text{cm}}')} + ${tc(SC_, '\\vec v_{\\text{spin}}')}`), K(`v_{\\text{top}} = 2v \\qquad v_{\\text{bottom}} = 0 \\qquad v_{\\text{front}} = \\sqrt2\\,v`),
    '<b>At each instant</b>: it turns about the contact point, v = ω × d', '<b>Contact point</b>: v = 0, but a = ω²R (upward)'] });
const YQ = ['Why is the bottom point of a rolling wheel at rest for an instant?', 'Why does the top move at twice the speed of the centre?', 'Why must v equal Rω when a wheel rolls without slipping?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 110', topic: 'Ring, disc or ball: who wins the race? Kinetic Energy of Rolling', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tR1 - 0.6, 1, 960, 540]]);
let gm = null;
function measure() { gm = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }

/* ---------- frame ---------- */
M.on(t => {
  if (!gm) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); vis(hwG, t, tMorph + 0.3, 1e9, { dy: 0 });
    const uT = M.io((t - tMorph - 0.8) / 0.4), uB = M.io((t - tMorph - 1.4) / 0.4);
    hTop.style.opacity = uT; hBot.style.opacity = uB; hTopA.set(HW[0] + HR + 20, HW[1] - HR + 34, HW[0] + HR + 20 - 60 * uT, HW[1] - HR + 60); hBotA.set(HW[0] + HR + 20, HW[1] + HR - 28, HW[0] + HR + 20 - 60 * uB, HW[1] + HR - 46);
    vis($('#hjP'), t, tMorph + 1.6, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkI'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 20 });
    vis($('#hkQ'), t, wt('H4', 'Is') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#syl'), t, wt('P5', 'Note') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const loop = 4.2, PV = 90, PO = 2.0;  // px/s and rad/s (visual)
    [[tQr[0], 1, 0], [tQr[1], 0, 1], [tQr[2], 1, 1]].forEach(([t0, tr, rt], i) => { const u = Math.max(0, t - t0), q = u % loop, x = 120 + tr * PV * q, ph = rt * (PV / PR) * q; PW[i].set(x, PY[i], ph); vis(PW[i].o, t, t0 - 0.2, 1e9, { dy: 0 }); });
    const u0 = M.o3((t - tQr[0]) / 0.4), q0 = Math.max(0, t - tQr[0]) % loop, x0 = 120 + PV * q0; pV.set(x0 + PR + 8, PY[0], x0 + PR + 8 + 70 * u0, PY[0]);
    pW.set(120, PY[1], PR + 16, -2.2, 1.4 * M.o3((t - tQr[1]) / 0.4));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1'), simOut = OUT('S5'), simIn2 = OUT('S6') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const S = state(t), k = geo(S.sv);
    wS.set(k.xc, YC, k.phi); vis(wS.o, t, tS1 + 0.4, 1e9, { dy: 0 });
    const moving = !S.ready && !S.frozen && S.sv > 0.05;
    ghs.forEach((c, j) => { const q = geo(Math.max(0, S.sv - (S.replay ? 0.04 : 0.12) * (j + 1))); attr(c, 'cx', q.xc.toFixed(1)); attr(c, 'cy', YC.toFixed(1)); c.style.opacity = moving ? c._op : 0; });
    // cycloid trace of the mark (this pass)
    { let d = ''; const n = 80; for (let i = 0; i <= n; i++) { const q = geo(S.sv * i / n); d += (i ? 'L' : 'M') + q.mx.toFixed(1) + ',' + q.my.toFixed(1); } attr(trc, 'd', S.ready ? '' : d); trc.style.opacity = M.io((t - tS3) / 0.4); }
    const uV = M.o3((t - wt('S2', 'centre') + 0.1) / 0.4) * (S.frozen ? 0 : 1); sV.set(k.xc, YC, k.xc + SPX * VCM * uV, YC); attr(sVl, 'x', k.xc + SPX * VCM + 10); attr(sVl, 'y', YC + 8); sVl.style.opacity = uV;
    sW.set(k.xc, YC, R + 18, -2.4, 1.2 * M.o3((t - wt('S2', 'omega') + 0.1) / 0.4)); attr(sWl, 'x', k.xc - R - 40); attr(sWl, 'y', YC - R + 6); sWl.style.opacity = M.io((t - wt('S2', 'omega')) / 0.3);
    // the mark's own velocity (from S3)
    const uM = M.io((t - tS3 - 0.3) / 0.4) * (S.frozen ? 0 : 1); mV.set(k.mx, k.my, k.mx + SPX * k.mvx * uM, k.my + SPX * k.mvy * uM);
    // slow-mo vectors (frozen): top, front, bottom
    const fz = S.frozen ? 1 : 0, uP = [M.io((t - tS9) / 0.4), M.io((t - tS11) / 0.4), M.io((t - tS10) / 0.4)], uT = M.io((t - wt('S8', 'forward') + 0.1) / 0.4), uS = M.io((t - wt('S8', 'spin') + 0.1) / 0.4);
    const P = [[k.xc, YC - R, [1, 0]], [k.xc + R, YC, [0, 1]], [k.xc, YC + R, [-1, 0]]];
    PTS.forEach((q, i) => { const [x, y, sd] = P[i], on = fz; attr(q.dot, 'cx', x); attr(q.dot, 'cy', y); q.dot.style.opacity = on * Math.max(uT, uP[i]);
      const L = SPX * VCM; q.tr.set(x, y - 6 + i * 0, x + L * uT * on, y - 6 + i * 0); q.sp.set(x, y + 6, x + sd[0] * L * uS * on, y + 6 + sd[1] * L * uS * on);
      const tx = L + sd[0] * L, ty = sd[1] * L; q.to.set(x, y, x + tx * uP[i] * on, y + ty * uP[i] * on);
      M.setT(q.l, ['2v = 1 m/s', '√2 v', ''][i]); attr(q.l, 'x', x + tx + 12); attr(q.l, 'y', y + ty + (i === 1 ? 24 : -10)); q.l.style.opacity = uP[i] * on; });
    attr(zeroL, 'x', k.xc); attr(zeroL, 'y', YR + 36); zeroL.style.opacity = fz * uP[2];
    M.setT(legT, 'blue thin = v (centre) · violet = Rω (spin) · thick = total'); legT.style.opacity = fz * uS;
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz, out, { ...POP, sc: 0.8 });
    vis($('#eq1'), t, wt('S2', 'omega') + 0.2, tS5 - 0.4, POP);
    // readout: round t first, then compute
    const tr = Math.round(S.sv * 100) / 100, kr = geo(tr), sp = Math.hypot(kr.mvx, kr.mvy);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_m'), f2(sp)); M.setT($('#r_h'), f2((YC + R - kr.my) / PXM));
    $('#r_m').style.background = mix('#FFFFFF', '#F6ECD9', M.io((t - tS4) / 0.3) * (1 - M.io((t - tS5) / 0.3)));
    // graph: mark speed vs time (this pass)
    { let d = ''; const n = 80; for (let i = 0; i <= n; i++) { const x = S.sv * i / n, q = geo(x); d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(Math.hypot(q.mvx, q.mvy)).toFixed(1); } attr(gM, 'd', S.ready ? '' : d); }
    gD(Math.min(S.sv, 4), sp, !S.ready);
    vis($('#th1'), t, tS5 + 0.05, OUT('S6'), { dy: 36, ...o });
    th1(t, { tin: tS5, tOpts: wt('S5', 'Which') - 0.1, tCount: T1('S5') + 0.05, dur: 3, tAns: tS6 - 0.02, tWhy: wt('S6', 'moves') });
    avA(t, wt('S10', 'sharp') + 0.1, out);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - tRgo) / 3.0), phi = 2 * Math.PI * u, xc = RX0 + RRr * phi;
    rW.set(xc, RYc, phi); attr(rTape, 'x2', xc.toFixed(1)); vis(rW.o, t, tR1 + 0.7, 1e9, { dy: 0 });
    const uL = M.io((t - wt('R3', 'rim')) / 0.4), xe = RX0 + 2 * Math.PI * RRr;
    attr(rB, 'd', `M${RX0},${RYr + 30} v10 H${xe.toFixed(1)} v-10`); rB.style.opacity = uL; attr(rTl, 'x', (RX0 + xe) / 2); attr(rTl, 'y', RYr + 70); rTl.style.opacity = uL;
    M.setT(rTx, u >= 1 ? 'one turn in time T' : 'turn: ' + (u * 360).toFixed(0) + '°'); attr(rTx, 'x', 392); attr(rTx, 'y', 150); rTx.style.opacity = M.io((t - tRgo) / 0.3);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    DL.forEach((gq, i) => vis(gq, t, [tStep[2] + 0.4, tStep[4] + 1.0, tStep[4] + 0.6][i], 1e9, { dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'bottom') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'twice') + 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    KV.forEach((q, i) => { const t0 = i ? tK2 : tK1, loop = 4.0, u = Math.max(0, t - t0) % loop, VP = 120, x = 140 + VP * u, yc = q.yr - q.Rk - 4.5, ph = q.roll ? (VP / q.Rk) * u : 0;
      q.w.set(x, yc, ph); const bx = x, by = q.yr - 4; attr(q.bd, 'cx', bx); attr(q.bd, 'cy', by); q.cv.set(x, yc, x + 90, yc);
      if (q.roll) q.ba.set(bx, by, bx, by); else q.ba.set(bx, by + 2, bx + 70, by + 2);
      attr(q.bl, 'x', bx + (q.roll ? 0 : 30)); attr(q.bl, 'y', q.yr + 44);
      attr(q.streak, 'x1', 140); attr(q.streak, 'y1', q.yr - 2); attr(q.streak, 'x2', q.roll ? 140 : x); attr(q.streak, 'y2', q.yr - 2); });
    vis($('#khP'), t, wt('K1', 'grips') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'scrapes') - 0.3, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'centre') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(wOm, t, tW[0] + 0.4, 1e9, { dy: 0 });
    [tW[1], tW[2], T0('W2') + 1.0, tW[3]].forEach((tt, i) => vis(WP[i], t, tt + 0.2, 1e9, { dy: 0 }));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'bottom') - 0.1, tStrike: wt('X3', 'No') - 0.1, tRight: wt('X3', 'acceleration') });
    vis(tpG, t, wt('X3', 'acceleration') + 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'speeds') });
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
