// PUC Physics Ep 90: Collisions in two dimensions (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', PD = '#6B2049', PL = '#CF7FAE', EC = C.teal, TC = C.gold;     // momentum plum (A darker, B lighter), K teal, angle gold
const FC = C.orange, VC = C.ac, MC = C.ink, CB = '#5B6B8C', BOARD = '#F6E7C8';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const D2R = Math.PI / 180;

/* elastic off-centre hit of a moving body A on a still body B (top view, screen y down).
   r = {m1, m2, u (m/s along +x), phi (deg: line of centres below the x axis), Bx, By, R1, R2, x0, PX}. The push acts along the line of centres. */
const mkHit = r => {
  const n = [Math.cos(r.phi * D2R), Math.sin(r.phi * D2R)], un = r.u * n[0], k2 = 2 * r.m1 / (r.m1 + r.m2) * un;
  const v2 = [k2 * n[0], k2 * n[1]], v1 = [r.u - r.m2 / r.m1 * v2[0], -r.m2 / r.m1 * v2[1]];
  const cy = r.By - (r.R1 + r.R2) * n[1], cx = r.Bx - (r.R1 + r.R2) * n[0], th = (cx - r.x0) / (r.PX * r.u);
  const at = tau => tau <= th ? { A: [r.x0 + r.PX * r.u * tau, cy], B: [r.Bx, r.By], vA: [r.u, 0], vB: [0, 0], hit: false }
    : { A: [cx + r.PX * v1[0] * (tau - th), cy + r.PX * v1[1] * (tau - th)], B: [r.Bx + r.PX * v2[0] * (tau - th), r.By + r.PX * v2[1] * (tau - th)], vA: v1, vB: v2, hit: true };
  const a1 = Math.atan2(-v1[1], v1[0]) / D2R, a2 = Math.atan2(v2[1], v2[0]) / D2R;   // a1: A above the line, a2: B below
  return Object.assign({ at, th, n, v1, v2, cx, cy, a1, a2, split: a1 + a2 }, r);
};
const coin = (p, R, col, lab) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r: R, fill: col }); mk(g, 'circle', { r: R * 0.68, fill: 'none', stroke: '#fff', 'stroke-width': 2, opacity: 0.45 }); if (lab) txt(g, 0, 7, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': Math.round(R * 0.75), 'font-family': 'Poppins' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const arcP = (cx, cy, r, a0, a1) => { const p0 = [cx + r * Math.cos(a0 * D2R), cy - r * Math.sin(a0 * D2R)], p1 = [cx + r * Math.cos(a1 * D2R), cy - r * Math.sin(a1 * D2R)]; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 0 ${a1 > a0 ? 0 : 1} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const board = (p, x, y, w, h) => { mk(p, 'rect', { x, y, width: w, height: h, rx: 10, fill: BOARD, stroke: '#C9A27A', 'stroke-width': 4 }); };

Object.assign(M.IC, {
  balls: ['M7 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  disc: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  users2: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['balls', 'Pool balls', 'SPLIT AT AN ANGLE', 35, 55], ['users2', 'Two players', 'BOTH KNOCKED SIDEWAYS', 50, 40], ['disc', 'A glancing hit', 'NOT A STRAIGHT LINE', 25, 65]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'Pool'), wt('H1', 'players'), wt('H2', 'angle')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="100"></svg></div>`).join('');
const JA = JOBS.map(([, , , a1, a2], i) => { const s = $('#jsv' + i); mk(s, 'circle', { cx: 130, cy: 50, r: 9, fill: C.dim }); const ain = PUC.arrow(s, VC, 4, 12), o1 = PUC.arrow(s, VC, 4, 12), o2 = PUC.arrow(s, VC, 4, 12); return { ain, o1, o2, a1, a2 }; });
const hs = $('#hkS'); board(hs, 36, 84, 510, 380);
const HK = [mkHit({ m1: 3, m2: 1, u: 2.4, phi: 50, Bx: 300, By: 280, R1: 26, R2: 18, x0: 90, PX: 60 }), mkHit({ m1: 1, m2: 1, u: 2.4, phi: 50, Bx: 300, By: 280, R1: 20, R2: 20, x0: 90, PX: 60 })];
const hT = [[0, 1, 2].map(() => mk(hs, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.6 }))].flat();
const hC = [[coin(hs, 26, MC, 'S'), coin(hs, 18, CB, '')], [coin(hs, 20, MC, 'A'), coin(hs, 20, CB, 'B')]];
const hArc = mk(hs, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), hArcL = txt(hs, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 22 });
const tHa = wt('H3', 'hits') + 0.2, tHb = wt('H4', 'split') - 0.2;
const hRunAt = (i, t) => { const r = HK[i], t0 = i ? tHb - r.th : tHa - r.th; return r.at(M.clamp(t - t0, 0, r.th + 1.6)); };

/* ---------- P ---------- */
const QR = [['2D', VC, 'Not head on', 'after the hit, the bodies move off at angles'], ['p<sub style="font-size:.55em">x</sub>', PC, 'Momentum along x: kept', 'a vector is kept in each direction'], ['p<sub style="font-size:.55em">y</sub>', PC, 'Momentum along y: kept', 'zero before, so zero after']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="height:116px;top:${84 + i * 128}px"><div class="qs" style="color:${c};top:24px;${i ? '' : 'font-size:44px;font-style:normal;top:34px'}">${s}</div><div class="qn" style="top:20px">${n}</div><div class="qd" style="top:66px">${d}</div></div>`).join('');
$('#lawP').innerHTML = `${K(`\\textstyle\\sum ${tc('#E7A6C9', 'p_x')}`)} and ${K(`\\sum ${tc('#E7A6C9', 'p_y')}`)} stay the same`;
const tQr = [wt('P1', 'collision'), wt('P2', 'along'), wt('P3', 'total')];
const pm = $('#pmS'), PO = [220, 380];
mk(pm, 'line', { x1: 120, y1: PO[1], x2: 700, y2: PO[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.4 }); mk(pm, 'line', { x1: PO[0], y1: 470, x2: PO[0], y2: 100, stroke: C.ink, 'stroke-width': 2, opacity: 0.4 });
txt(pm, 706, PO[1] + 6, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink }); txt(pm, PO[0] - 8, 92, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'text-anchor': 'end' });
const pV = PUC.arrow(pm, PC, 7, 20), pX = PUC.arrow(pm, PC, 5, 16), pY = PUC.arrow(pm, PC, 5, 16);
const pVl = txt(pm, 0, 0, 'p', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30, fill: PC }), pXl = txt(pm, 0, 0, 'pₓ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: PC }), pYl = txt(pm, 0, 0, 'p_y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: PC });
pYl.textContent = 'py';
const pDx = mk(pm, 'line', { stroke: PC, 'stroke-width': 2, 'stroke-dasharray': '5 5', opacity: 0.6 }), pDy = mk(pm, 'line', { stroke: PC, 'stroke-width': 2, 'stroke-dasharray': '5 5', opacity: 0.6 });
const pNote = txt(pm, 392, 520, 'coin A before the hit: only x, so total py = 0', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 20 });

/* ---------- S: top-view sim ---------- */
const s = $('#simS'), R = 26, PX = 50, RD = 2.6, PV = 26;
board(s, 36, 76, 712, 390);
for (let x = 76; x < 748; x += 40) mk(s, 'line', { x1: x, y1: 78, x2: x, y2: 464, stroke: '#E8D3A8', 'stroke-width': 1 });
const RUNS = [mkHit({ m1: 1, m2: 1, u: 4, phi: 60, Bx: 330, By: 290, R1: R, R2: R, x0: 90, PX }), mkHit({ m1: 1, m2: 1, u: 4, phi: 75, Bx: 330, By: 290, R1: R, R2: R, x0: 90, PX })];
const trA = mk(s, 'path', { fill: 'none', stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.45 }), trB = mk(s, 'path', { fill: 'none', stroke: CB, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.6 });
const loc = mk(s, 'line', { stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const ghA = [0, 1, 2].map(() => mk(s, 'circle', { r: R, fill: MC, opacity: 0 })), ghB = [0, 1, 2].map(() => mk(s, 'circle', { r: R, fill: CB, opacity: 0 }));
const cA = coin(s, R, MC, 'A'), cB = coin(s, R, CB, 'B');
const aVA = PUC.arrow(s, VC, 6, 18), aVB = PUC.arrow(s, VC, 6, 18);
const lVA = txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19 }), lVB = txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const aFA = PUC.arrow(s, FC, 7, 20), aFB = PUC.arrow(s, FC, 7, 20), lF = txt(s, 0, 0, 'push along the line of centres', { fill: FC, 'font-weight': 700, 'font-size': 19 });
const arc1 = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), arc2 = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), base = mk(s, 'line', { stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const lA1 = txt(s, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 20 }), lA2 = txt(s, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 20 });
const rAng = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3 }), l90 = txt(s, 0, 0, '90°', { fill: TC, 'font-weight': 700, 'font-size': 24 });
const cX = [PUC.arrow(s, VC, 4, 12), PUC.arrow(s, VC, 4, 12)], cY = [PUC.arrow(s, VC, 4, 12), PUC.arrow(s, VC, 4, 12)], cXl = [0, 1].map(() => txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 21, 'text-anchor': 'middle' })), cYl = [0, 1].map(() => txt(s, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 21 }));
const tL1 = wt('S2', 'hits') - RUNS[0].th, tFz = wt('S5', 'touch') + 0.05, TAU_FZ = RUNS[0].th, tRA = TAU_FZ - 0.25 * (tFz - tS5), tRes = tS7 + 0.1;
const tL2 = wt('S9', 'turns') - RUNS[1].th - 0.3;
function state(t) {
  if (t >= tS9 - 0.3) return { r: 1, tau: M.clamp(t - tL2, 0, RD), pause: t < tL2 };
  if (t >= tS8 - 0.3) return { r: 1, tau: 0, pause: true };
  if (t >= tS5) { const tau = t < tFz ? tRA + 0.25 * (t - tS5) : t < tRes ? TAU_FZ : t < tRes + 0.8 ? TAU_FZ + 0.25 * (t - tRes) : Math.min(RD, TAU_FZ + 0.2 + (t - tRes - 0.8)); return { r: 0, tau, replay: t < tRes + 0.8, frozen: t >= tFz && t < tRes }; }
  return { r: 0, tau: M.clamp(t - tL1, 0, RD), pause: t < tL1 };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r_vA" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r_vB" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${PC}">p<sub>x</sub>/m</span><span class="v" id="r_px" style="color:${PC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${PC}">p<sub>y</sub>/m</span><span class="v" id="r_py" style="color:${PC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${TC}">θ<sub>1</sub>+θ<sub>2</sub></span><span class="v" id="r_th" style="color:${TC}">-</span><span class="u">deg</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: RD, ymin: -2.5, ymax: 2.5, xt: [0, 0.5, 1, 1.5, 2, 2.5], yt: [-2, -1, 0, 1, 2], xl: 't (s)' });
txt(gs, 122, 78, 'py/m (m/s)', { 'font-size': 18 });
const gT = mk(gs, 'path', { d: '', fill: 'none', stroke: PC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 }), gA = mk(gs, 'path', { d: '', fill: 'none', stroke: PD, 'stroke-width': 4 }), gB = mk(gs, 'path', { d: '', fill: 'none', stroke: PL, 'stroke-width': 4, 'stroke-dasharray': '7 5' });
const dT = g.dot(PC, 10), dA = g.dot(PD, 8), dB = g.dot(PL, 8);
$('#leg').innerHTML = [[PD, '', 'A'], [PL, '7 5', 'B'], [PC, '', 'total']].map(([c, da, n], i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${i === 2 ? 6 : 4}" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 90; for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const th1 = PUC.think($('#th1'), { q: 'Aim again, closer to the edge. Will the angle between the coins still be 90°?', opts: ['Yes, still 90°', 'No, it changes'], right: 0, why: 'A turns 15°, B leaves at 75°: 15° + 75° = 90°.' });

/* ---------- D ---------- */
const uv = tc(VC, '\\vec u'), v1v = tc(VC, '\\vec v_1'), v2v = tc(VC, '\\vec v_2'), uu = tc(VC, 'u'), vv1 = tc(VC, 'v_1'), vv2 = tc(VC, 'v_2');
const STEPS = [[`m${uv} = m${v1v} + m${v2v} \\;\\Rightarrow\\; ${uv} = ${v1v} + ${v2v}`, 'momentum, as vectors; cancel m', 'MOMENTUM', PC],
  [`${uu}^2 = ${vv1}^2 + ${vv2}^2`, 'kinetic energy kept; cancel ½m', 'ENERGY', EC],
  [`${uu}^2 = ${vv1}^2 + ${vv2}^2 + 2\\,${v1v}\\cdot${v2v}`, 'square step 1'],
  [`2\\,${v1v}\\cdot${v2v} = 0 \\;\\Rightarrow\\; ${v1v} \\perp ${v2v}`, 'compare steps 2 and 3']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:84px"></div>` + STEPS.map(([f, w, tg, tcol], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${tcol}">${tg}</div>` : ''}</div>`).join('');
const tStep = [wt('D2', 'Momentum'), wt('D3', 'Kinetic'), wt('D4', 'Square'), wt('D5', 'Compare')];
const dp = $('#dpS'), Q0 = [50, 380], QS = 100, Q1 = [Q0[0] + 300, Q0[1] - 173.2], Q2 = [Q0[0] + 400, Q0[1]];
const dU = PUC.arrow(dp, VC, 6, 18), dV1 = PUC.arrow(dp, VC, 6, 18), dV2 = PUC.arrow(dp, VC, 6, 18);
const dRa = mk(dp, 'path', { d: `M${Q1[0] - 13.9},${Q1[1] + 8} L${Q1[0] - 5.9},${Q1[1] + 21.9} L${Q1[0] + 8},${Q1[1] + 13.9}`, fill: 'none', stroke: TC, 'stroke-width': 3 });
const dL = [txt(dp, 250, 412, 'u = 4', { fill: VC, 'font-weight': 700, 'font-size': 24, 'text-anchor': 'middle' }), txt(dp, 170, 270, 'v₁ = 3.46', { fill: VC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' }), txt(dp, 420, 280, 'v₂ = 2', { fill: VC, 'font-weight': 700, 'font-size': 22 })];
const dA30 = mk(dp, 'path', { d: arcP(Q0[0], Q0[1], 60, 0, 30), fill: 'none', stroke: TC, 'stroke-width': 3 }), dT30 = txt(dp, Q0[0] + 70, Q0[1] - 12, '30°', { fill: TC, 'font-weight': 700, 'font-size': 18 });
const dChk = txt(dp, 262, 100, '3.46² + 2² = 12 + 4 = 16 = 4²', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textstyle\\sum ${tc(PC, 'p_x')}\\;\\text{and}\\;\\sum ${tc(PC, 'p_y')}\\;\\text{stay constant}`);

/* ---------- R ---------- */
const LK = [`A real striker is heavier than a coin`, `A heavy striker keeps more of its forward motion`, `So it turns less: the split is under 90°`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('') + `<div class="pillp ink" id="rP" style="left:36px;top:420px">The right angle needs equal masses</div>`;
const tLk = [wt('R2', 'real'), wt('R3', 'heavy'), wt('R4', 'turns')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'That is why my striker never splits at 90!' });
const rr = $('#rrS');
// head-on rows: equal masses (striker stops) vs striker 3x (keeps half its speed); 50 px per u per second
const RRW = [[1, 'EQUAL COIN', 0, 1], [3, 'STRIKER 3x', 0.5, 1.5]].map(([m, lab, v1f, v2f], i) => { const y = 200 + i * 170, gq = mk(rr, 'g', {});
  mk(gq, 'line', { x1: 40, y1: y + 30, x2: 744, y2: y + 30, stroke: C.ink, 'stroke-width': 2.5 }); txt(gq, 40, y - 84, lab, { 'font-size': 18, 'font-weight': 600 });
  const a = coin(gq, i ? 30 : 22, MC, 'S'), b = coin(gq, 22, CB, '');
  const la = txt(gq, 0, y - 44, '', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' }), lb = txt(gq, 0, y - 44, '', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
  return { gq, a, b, la, lb, y, m, v1f, v2f, Ra: i ? 30 : 22 }; });
const tRgo = wt('R3', 'keeps') - 1.0;

/* ---------- K ---------- */
const KS = [mkHit({ m1: 1, m2: 1, u: 2.4, phi: 45, Bx: 330, By: 280, R1: 24, R2: 24, x0: 80, PX: 60 }), mkHit({ m1: 3, m2: 1, u: 2.4, phi: 50, Bx: 330, By: 280, R1: 32, R2: 20, x0: 80, PX: 60 })];
const KV = ['#khS', '#klS'].map((id, i) => { const sv = $(id); board(sv, 36, 84, 712, 380); const r = KS[i];
  const tA = mk(sv, 'path', { fill: 'none', stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.45 }), tB = mk(sv, 'path', { fill: 'none', stroke: CB, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.6 });
  const a = coin(sv, r.R1, MC, i ? 'S' : 'A'), b = coin(sv, r.R2, CB, i ? '' : 'B'), arc = mk(sv, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), al = txt(sv, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 24 });
  return { sv, r, tA, tB, a, b, arc, al }; });
$('#khP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Split = ${Math.round(KS[0].split)}°`;
$('#klP').innerHTML = `Split ≈ ${Math.round(KS[1].split)}°: less than 90°`;
const tKg = [wt('K1', 'Equal') - KS[0].th + 0.6, wt('K2', 'heavy') - KS[1].th + 0.6];
const th2 = PUC.think($('#th2'), { q: 'A light coin hits a heavy still disc, off centre. Is the split less than 90°, or more?', opts: ['Less than 90°', 'More than 90°'], right: 1, why: 'The light coin turns through a big angle; the disc moves on.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A 2 kg ball moves east at 3 m/s. Another 2 kg ball moves north at 4 m/s. They collide and stick. Find their velocity.';
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(PC, 'p_x')} = 2 \\times 3 = 6\\,\\text{kg m/s}`)],
  [K(`${tc(PC, 'p_y')} = 2 \\times 4 = 8\\,\\text{kg m/s}`)],
  [K(`${tc(PC, 'p')} = \\sqrt{6^2 + 8^2} = 10 \\;\\Rightarrow\\; ${tc(VC, 'v')} = \\tfrac{10}{4} = ${tc(VC, '2.5\\,\\text{m/s}')}`)],
  [K(`\\tan${tc(TC, '\\theta')} = \\tfrac86 \\;\\Rightarrow\\; ${tc(TC, '\\theta')} \\approx 53^\\circ\\ \\text{north of east}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 90 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WP = [330, 290], WPX = 40; board(w, 36, 76, 712, 400);
txt(w, 60, 110, 'N ↑', { fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const wA = coin(w, 22, MC, ''), wB = coin(w, 22, CB, ''), wAB = coin(w, 30, '#4A5675', '4 kg');
const wvA = PUC.arrow(w, VC, 6, 18), wvB = PUC.arrow(w, VC, 6, 18), wvC = PUC.arrow(w, VC, 6, 18), wlC = txt(w, 0, 0, '2.5 m/s', { fill: VC, 'font-weight': 700, 'font-size': 20 });
const wTx = [PUC.arrow(w, PC, 6, 18), PUC.arrow(w, PC, 6, 18), PUC.arrow(w, PC, 7, 20)], TB = [500, 450], TU = 22;
const wTl = [txt(w, TB[0] + 66, TB[1] + 30, '6', { fill: PC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' }), txt(w, TB[0] + 146, TB[1] - 84, '8', { fill: PC, 'font-weight': 700, 'font-size': 22 }), txt(w, TB[0] + 50, TB[1] - 104, '10', { fill: PC, 'font-weight': 700, 'font-size': 22 })];
const wTh = mk(w, 'path', { d: arcP(TB[0], TB[1], 40, 0, 53.13), fill: 'none', stroke: TC, 'stroke-width': 3 }), wThl = txt(w, TB[0] + 46, TB[1] - 12, '53°', { fill: TC, 'font-weight': 700, 'font-size': 18 });
const tWhit = wt('W2', 'collide'), tW = [wt('W3', 'Along'), wt('W4', 'Along'), wt('W5', 'Total'), wt('W6', 'direction')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every 2D collision splits at 90°', right: 'Only equal masses + elastic + one at rest' });
const tp = $('#tpS'), tpH = txt(tp, 20, 52, 'THE 90° RULE NEEDS ALL THREE', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 });
const tpr = ['equal masses', 'an elastic hit', 'one body at rest'].map((n, i) => { const gq = mk(tp, 'g', {}), y = 100 + i * 52; mk(gq, 'circle', { cx: 34, cy: y - 7, r: 15, fill: C.ok }); txt(gq, 34, y - 1, '✓', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 18 }); txt(gq, 62, y, n, { fill: C.ink, 'font-weight': 600, 'font-size': 22 }); return gq; });
const tpO = txt(tp, 320, 152, 'otherwise: x and y', { fill: C.red, 'font-weight': 700, 'font-size': 21 }), tpO2 = txt(tp, 320, 180, 'separately', { fill: C.red, 'font-weight': 700, 'font-size': 21 });
const where = PUC.where($('#wa'), { on: [], type: 'Glancing collisions, the 90° split, and bodies that stick at an angle' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 1 kg ball at 10 m/s hits an identical still ball elastically, off centre. The first ball leaves at 6 m/s. Speed of the second ball, and the angle between their paths?', qW: 760,
  opts: ['4 m/s, 90°', '8 m/s, 90°', '8 m/s, 60°', '4 m/s, 45°'], right: 1, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`${tc(EC, 'K')}\\ \\text{kept: } 10^2 = 6^2 + ${vv2}^2`)], [K(`${vv2}^2 = 64 \\;\\Rightarrow\\; ${vv2} = 8\\,\\text{m/s}`)],
  [K(`\\text{equal } m,\\ \\text{elastic},\\ \\text{one at rest}`)], [K(`\\Rightarrow\\ ${tc(TC, '90^\\circ')}\\ \\text{between paths}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '24px');
const tSo = [wt('A2', 'Kinetic'), wt('A3', 'So'), wt('A4', 'Equal'), wt('A4', 'paths')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · collisions in two dimensions', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`x:\\; ${tc(PC, 'm_1u_1 = m_1v_1\\cos\\theta_1 + m_2v_2\\cos\\theta_2')}`), K(`y:\\; ${tc(PC, '0 = m_1v_1\\sin\\theta_1 - m_2v_2\\sin\\theta_2')}`),
    '<b>Equal masses, elastic, one at rest</b>: split = 90°', '<b>Bodies stick?</b> Add the x and y momenta, then divide by total mass'] });
const YQ = ['Why must momentum be kept along x and along y separately?', 'When do two coins split at exactly 90°?', 'Why does a heavy striker split from a coin at less than 90°?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 6', topic: 'A spinning hammer: which point flies in a perfect curve?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS8 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const trail = (r, key, tau) => { const p0 = r.at(0)[key], ph = r.at(r.th)[key], p1 = r.at(tau)[key]; return tau <= r.th ? `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} L${p1[0].toFixed(1)},${p1[1].toFixed(1)}` : `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} L${ph[0].toFixed(1)},${ph[1].toFixed(1)} L${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const q = JA[i], t0 = tMorph + 0.7 + i * 0.4, ui = M.o3((t - t0) / 0.4), uo = M.o3((t - t0 - 0.5) / 0.5);
      q.ain.set(40, 50, 40 + 76 * ui, 50); q.o1.set(140, 46, 140 + 120 * uo * Math.cos(q.a1 * D2R), 46 - 120 * uo * Math.sin(q.a1 * D2R) * 0.7); q.o2.set(140, 54, 140 + 120 * uo * Math.cos(q.a2 * D2R), 54 + 120 * uo * Math.sin(q.a2 * D2R) * 0.7); });
    vis($('#hjP'), t, wt('H2', 'Most') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const ri = t < tH4 - 0.1 ? 0 : 1, r = HK[ri], k = hRunAt(ri, t);
    hC.forEach((pair, i) => pair.forEach(c => M.hide(c.o, i !== ri)));
    hC[ri][0].set(k.A[0], k.A[1]); hC[ri][1].set(k.B[0], k.B[1]); vis(hC[0][0].o, t, tH3 + 0.3, 1e9, { dy: 0 }); vis(hC[0][1].o, t, tH3 + 0.4, 1e9, { dy: 0 });
    const tau = ri ? M.clamp(t - (tHb - r.th), 0, r.th + 1.6) : M.clamp(t - (tHa - r.th), 0, r.th + 1.6);
    attr(hT[0], 'd', trail(r, 'A', tau)); attr(hT[1], 'd', tau > r.th ? `M${r.Bx},${r.By} L${k.B[0].toFixed(1)},${k.B[1].toFixed(1)}` : '');
    const ua = ri && k.hit ? M.io((tau - r.th - 0.6) / 0.4) : 0;
    attr(hArc, 'd', ua > 0.01 ? arcP(r.cx, r.cy, 50, -r.a2, -r.a2 + (r.a1 + r.a2) * ua) : ''); attr(hArcL, 'x', r.cx + 60); attr(hArcL, 'y', r.cy + 8); M.setT(hArcL, Math.round(r.split) + '°'); hArcL.style.opacity = ua;
    vis($('#hkQ'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#lawP'), t, wt('P3', 'after') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const u0 = M.o3((t - wt('P2', 'vector') + 0.1) / 0.5), ux = M.o3((t - wt('P2', 'x') + 0.1) / 0.5), uy = M.o3((t - wt('P2', 'y') + 0.1) / 0.5), up = M.io((t - tP3) / 0.8);
    const ang = 35 * (1 - up), L = 360, ex = PO[0] + L * Math.cos(ang * D2R) * u0, ey = PO[1] - L * Math.sin(ang * D2R) * u0;
    pV.set(PO[0], PO[1], ex, ey); attr(pVl, 'x', ex + 10); attr(pVl, 'y', ey - 8); pVl.style.opacity = u0;
    pX.set(PO[0], PO[1] + 0, PO[0] + (ex - PO[0]) * ux, PO[1]); attr(pXl, 'x', PO[0] + (ex - PO[0]) / 2); attr(pXl, 'y', PO[1] + 36); pXl.style.opacity = ux;
    pY.set(PO[0], PO[1], PO[0], PO[1] + (ey - PO[1]) * uy); attr(pYl, 'x', PO[0] - 44); attr(pYl, 'y', (PO[1] + ey) / 2); pYl.style.opacity = uy * (Math.abs(ey - PO[1]) > 20 ? 1 : 0);
    attr(pDx, 'x1', ex); attr(pDx, 'y1', ey); attr(pDx, 'x2', ex); attr(pDx, 'y2', PO[1]); attr(pDy, 'x1', ex); attr(pDy, 'y1', ey); attr(pDy, 'x2', PO[0]); attr(pDy, 'y2', ey); pDx.style.opacity = ux * 0.6; pDy.style.opacity = uy * 0.6;
    vis(pNote, t, tP3 + 0.4, 1e9, { dy: 6 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S8'), simIn2 = OUT('S9') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), r = RUNS[S.r], k = r.at(S.tau);
    cA.set(k.A[0], k.A[1]); cB.set(k.B[0], k.B[1]); vis(cA.o, t, tS1 + 0.5, 1e9, { dy: 0 }); vis(cB.o, t, wt('S1', 'B') - 0.1, 1e9, { dy: 0 });
    attr(trA, 'd', trail(r, 'A', S.tau)); attr(trB, 'd', k.hit ? `M${r.Bx},${r.By} L${k.B[0].toFixed(1)},${k.B[1].toFixed(1)}` : '');
    const moving = !S.pause && !S.frozen && S.tau > 0.02 && S.tau < RD, gstep = S.replay ? 0.03 : 0.07;
    [[ghA, 'A'], [ghB, 'B']].forEach(([gh, key]) => gh.forEach((e, j) => { const q = r.at(Math.max(0, S.tau - gstep * (j + 1)))[key]; attr(e, 'cx', q[0].toFixed(1)); attr(e, 'cy', q[1].toFixed(1)); e.style.opacity = moving && Math.hypot(q[0] - k[key][0], q[1] - k[key][1]) > 4 ? [0.3, 0.2, 0.12][j] : 0; }));
    const vO = M.o3((t - wt('S1', 'moves') + 0.1) / 0.5);
    aVA.set(k.A[0], k.A[1], k.A[0] + PV * k.vA[0] * vO, k.A[1] + PV * k.vA[1] * vO); aVB.set(k.B[0], k.B[1], k.B[0] + PV * k.vB[0], k.B[1] + PV * k.vB[1]);
    const sA = Math.hypot(...k.vA), sB = Math.hypot(...k.vB);
    attr(lVA, 'x', (k.A[0] + PV * k.vA[0] * vO + 8).toFixed(1)); attr(lVA, 'y', (k.A[1] + PV * k.vA[1] * vO - 8).toFixed(1)); M.setT(lVA, f2(sA) + ' m/s'); lVA.style.opacity = vO;
    attr(lVB, 'x', (k.B[0] + PV * k.vB[0] + 8).toFixed(1)); attr(lVB, 'y', (k.B[1] + PV * k.vB[1] + 20).toFixed(1)); M.setT(lVB, f2(sB) + ' m/s'); lVB.style.opacity = sB > 0.2 ? 1 : 0;
    // freeze: push along the line of centres
    const fz = S.r === 0 && S.replay ? M.o3((t - wt('S6', 'push') + 0.1) / 0.5) * (1 - M.io((t - tRes - 0.5) / 0.3)) : 0, at0 = S.tau >= r.th - 0.001 && S.tau <= r.th + 0.06 ? 1 : 0;
    const P = [r.cx + R * r.n[0], r.cy + R * r.n[1]];
    attr(loc, 'x1', (r.cx - 70 * r.n[0]).toFixed(1)); attr(loc, 'y1', (r.cy - 70 * r.n[1]).toFixed(1)); attr(loc, 'x2', (r.Bx + 120 * r.n[0]).toFixed(1)); attr(loc, 'y2', (r.By + 120 * r.n[1]).toFixed(1)); loc.style.opacity = S.r === 0 && S.replay ? M.io((t - wt('S6', 'line') + 0.1) / 0.4) * (1 - M.io((t - tRes - 0.5) / 0.3)) : 0;
    aFB.set(P[0], P[1], P[0] + 90 * fz * at0 * r.n[0], P[1] + 90 * fz * at0 * r.n[1]); aFA.set(P[0], P[1], P[0] - 90 * fz * at0 * r.n[0], P[1] - 90 * fz * at0 * r.n[1]);
    attr(lF, 'x', 300); attr(lF, 'y', 446); lF.style.opacity = (fz * at0).toFixed(3);
    // angles after the hit (gold): theta1 above, theta2 below, and the right angle
    const showAng = S.r === 0 ? (t >= wt('S2', 'thirty') - 0.1 && t < tS3 - 0.2) || (t >= wt('S7', 'Thirty') - 0.1) : t >= wt('S9', 'turns') - 0.1;
    const ua = showAng && k.hit ? M.io((S.tau - r.th - 0.3) / 0.3) : 0;
    attr(base, 'x1', r.cx); attr(base, 'y1', r.cy); attr(base, 'x2', r.cx + 150); attr(base, 'y2', r.cy); base.style.opacity = ua;
    attr(arc1, 'd', ua > 0.01 ? arcP(r.cx, r.cy, 80, 0, r.a1 * ua) : ''); attr(arc2, 'd', ua > 0.01 ? arcP(r.cx, r.cy, 64, 0, -r.a2 * ua) : '');
    attr(lA1, 'x', r.cx + 92); attr(lA1, 'y', r.cy - 10); M.setT(lA1, 'θ₁ = ' + Math.round(r.a1) + '°'); lA1.style.opacity = ua;
    attr(lA2, 'x', r.cx + 20); attr(lA2, 'y', r.cy + 92); M.setT(lA2, 'θ₂ = ' + Math.round(r.a2) + '°'); lA2.style.opacity = ua;
    const u90 = (S.r === 0 ? M.io((t - wt('S7', 'ninety') + 0.1) / 0.3) : M.io((t - wt('S9', 'ninety') + 0.1) / 0.3)) * (k.hit ? 1 : 0), d1 = [Math.cos(r.a1 * D2R), -Math.sin(r.a1 * D2R)], d2 = [r.n[0], r.n[1]], q = 22;
    attr(rAng, 'd', `M${(r.cx + q * d1[0]).toFixed(1)},${(r.cy + q * d1[1]).toFixed(1)} L${(r.cx + q * d1[0] + q * d2[0]).toFixed(1)},${(r.cy + q * d1[1] + q * d2[1]).toFixed(1)} L${(r.cx + q * d2[0]).toFixed(1)},${(r.cy + q * d2[1]).toFixed(1)}`); rAng.style.opacity = u90;
    attr(l90, 'x', r.cx - 70); attr(l90, 'y', r.cy + 8); l90.style.opacity = u90;
    // components (run 1, during S3 and S4)
    const ux = S.r === 0 ? M.io((t - wt('S3', 'Along') + 0.1) / 0.4) * (1 - M.io((t - tS5 + 0.3) / 0.3)) : 0, uy = S.r === 0 ? M.io((t - wt('S4', 'Along') + 0.1) / 0.4) * (1 - M.io((t - tS5 + 0.3) / 0.3)) : 0;
    { const O = [r.cx, r.cy]; [[r.v1, -14], [r.v2, 14]].forEach(([v, dy], i) => { const ex = O[0] + 60 * v[0] * ux; cX[i].set(O[0], O[1] + dy, ex, O[1] + dy);
      attr(cXl[i], 'x', O[0] + 60 * v[0] / 2); attr(cXl[i], 'y', O[1] + (i ? 40 : -24)); M.setT(cXl[i], 'x: ' + Math.round(v[0])); cXl[i].style.opacity = ux;
      const xe = O[0] + 60 * v[0]; cY[i].set(xe, O[1] + dy, xe, O[1] + dy + 60 * v[1] * uy); attr(cYl[i], 'x', xe + 12); attr(cYl[i], 'y', O[1] + dy + 60 * v[1] / 2 + 6); M.setT(cYl[i], 'y: ' + (v[1] > 0 ? '-' : '+') + Math.abs(v[1]).toFixed(2)); cYl[i].style.opacity = uy; }); }
    const hideV = Math.max(ux, uy); lVA.style.opacity = vO * (1 - hideV); lVB.style.opacity = (sB > 0.2 ? 1 : 0) * (1 - hideV);
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); if (t >= tS9 - 0.3) vis($('#rdy'), t, simIn2 + 0.3, tL2 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS5 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    vis($('#allP'), t, tS10 + 0.1, 1e9, POP);
    // readout: round t first, then compute (screen y down, so physics y = -screen y)
    const tr = Math.round(S.tau * 100) / 100, kr = r.at(tr), pxm = kr.vA[0] + kr.vB[0], pym = -(kr.vA[1] + kr.vB[1]);
    M.setT($('#roT'), ['RUN 1 · 30° + 60°', 'RUN 2 · 15° + 75°'][S.r]); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_vA'), f2(Math.hypot(...kr.vA))); M.setT($('#r_vB'), f2(Math.hypot(...kr.vB)));
    M.setT($('#r_px'), f2(pxm)); M.setT($('#r_py'), f2(pym)); M.setT($('#r_th'), kr.hit ? Math.round(r.split).toString() : '-');
    $('#r_px').style.background = mix('#FFFFFF', '#F6E3EE', ux); $('#r_py').style.background = mix('#FFFFFF', '#F6E3EE', uy);
    const pyA = x => -r.at(x).vA[1], pyB = x => -r.at(x).vB[1];
    plot(gA, pyA, S.tau); plot(gB, pyB, S.tau); plot(gT, x => pyA(x) + pyB(x), S.tau);
    const dOn = t >= wt('S1', 'moves'); dA(S.tau, -k.vA[1], dOn); dB(S.tau, -k.vB[1], dOn); dT(S.tau, -(k.vA[1] + k.vB[1]), dOn);
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    vis($('#th1'), t, tS8 + 0.05, OUT('S9'), { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'Will') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: tS9 - 0.02, tWhy: wt('S9', 'A') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const u0 = M.o3((t - tStep[0] - 0.4) / 0.5), u1 = M.o3((t - tStep[0] - 1.0) / 0.5), u2 = M.o3((t - tStep[0] - 1.6) / 0.5);
    dU.set(Q0[0], Q0[1], Q0[0] + 400 * u0, Q0[1]); dV1.set(Q0[0], Q0[1], Q0[0] + 300 * u1, Q0[1] - 173.2 * u1); dV2.set(Q1[0], Q1[1], Q1[0] + 100 * u2, Q1[1] + 173.2 * u2);
    vis(dRa, t, wt('D5', 'right') - 0.1, 1e9, { dy: 0 }); vis(dA30, t, wt('D6', 'triangle') - 0.1, 1e9, { dy: 0 }); vis(dT30, t, wt('D6', 'triangle'), 1e9, { dy: 0 });
    dL.forEach((e, i) => vis(e, t, [wt('D6', 'Four'), wt('D6', 'three'), wt('D6', 'two')][i] - 0.1, 1e9, { dy: 0 }));
    vis(dChk, t, wt('D3', 'squared') + 0.4, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'momentum') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'separately') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'right') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    RRW.forEach((q, i) => { vis(q.gq, t, i ? tLk[0] + 0.3 : tR1 + 0.8, 1e9, { dy: 0 }); const tau = M.clamp(t - tRgo, 0, 3.2), th = 0.8, U = 110, xa0 = 70, xb0 = xa0 + q.Ra + 22 + U * th;
      const xa = tau < th ? xa0 + U * tau : xa0 + U * th + U * q.v1f * (tau - th), xb = tau < th ? xb0 : xb0 + U * q.v2f * (tau - th);
      q.a.set(xa, q.y); q.b.set(xb, q.y); attr(q.la, 'x', xa); attr(q.lb, 'x', xb); const af = tau >= th;
      M.setT(q.la, af ? (q.v1f ? q.v1f + 'u' : 'stops') : 'u'); M.setT(q.lb, af ? q.v2f + 'u' : ''); });
    avA(t, wt('R4', 'masses') + 0.3, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK2 + 0.3, 1e9, { dy: 8 });
    KV.forEach((q, i) => { const r = q.r, tau = M.clamp(t - (tKg[i] - 0.6), 0, r.th + 1.8), k = r.at(tau);
      q.a.set(k.A[0], k.A[1]); q.b.set(k.B[0], k.B[1]); attr(q.tA, 'd', trail(r, 'A', tau)); attr(q.tB, 'd', k.hit ? `M${r.Bx},${r.By} L${k.B[0].toFixed(1)},${k.B[1].toFixed(1)}` : '');
      const ua = k.hit ? M.io((tau - r.th - 0.6) / 0.4) : 0; attr(q.arc, 'd', ua > 0.01 ? arcP(r.cx, r.cy, 56, -r.a2, -r.a2 + r.split * ua) : ''); attr(q.al, 'x', r.cx - 96); attr(q.al, 'y', r.cy + 8); M.setT(q.al, Math.round(r.split) + '°'); q.al.style.opacity = ua; });
    vis($('#khP'), t, wt('K1', 'ninety') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'less') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'The') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const s1 = t - tWhit, bef = s1 < 0, sa = Math.max(-1.6, Math.min(0, s1)), sc = M.clamp(s1, 0, 1.6);
    wA.set(WP[0] - 22 + WPX * 3 * sa, WP[1]); wB.set(WP[0], WP[1] + 22 - WPX * 4 * sa); wAB.set(WP[0] + WPX * 2.5 * 0.6 * sc, WP[1] - WPX * 2.5 * 0.8 * sc);
    M.hide(wA.o, !bef); M.hide(wB.o, !bef); M.hide(wAB.o, bef); vis(wA.o, t, T0('W2') + 0.5, 1e9, { dy: 0 }); vis(wB.o, t, wt('W2', 'Another') - 0.1, 1e9, { dy: 0 });
    const pa = [WP[0] - 22 + WPX * 3 * sa, WP[1]], pb = [WP[0], WP[1] + 22 - WPX * 4 * sa], pc = [WP[0] + WPX * 2.5 * 0.6 * sc, WP[1] - WPX * 2.5 * 0.8 * sc];
    wvA.set(pa[0], pa[1], pa[0] + (bef ? 66 : 0), pa[1]); wvB.set(pb[0], pb[1], pb[0], pb[1] - (bef ? 88 : 0)); wvC.set(pc[0], pc[1], pc[0] + (bef ? 0 : 33), pc[1] - (bef ? 0 : 44));
    attr(wlC, 'x', pc[0] + 40); attr(wlC, 'y', pc[1] - 30); wlC.style.opacity = bef ? 0 : 1;
    const uT = [M.o3((t - tW[0]) / 0.5), M.o3((t - tW[1]) / 0.5), M.o3((t - tW[2]) / 0.5)];
    wTx[0].set(TB[0], TB[1], TB[0] + 6 * TU * uT[0], TB[1]); wTx[1].set(TB[0] + 6 * TU, TB[1], TB[0] + 6 * TU, TB[1] - 8 * TU * uT[1]); wTx[2].set(TB[0], TB[1], TB[0] + 6 * TU * uT[2], TB[1] - 8 * TU * uT[2]);
    wTl.forEach((e, i) => e.style.opacity = uT[i]); vis(wTh, t, tW[3] - 0.1, 1e9, { dy: 0 }); vis(wThl, t, tW[3], 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'ninety') - 0.1, tStrike: wt('X3', 'works') - 0.1, tRight: wt('X3', 'only') });
    vis(tpH, t, wt('X3', 'works'), 1e9, { dy: 0 }); tpr.forEach((e, i) => vis(e, t, [wt('X3', 'equal'), wt('X3', 'elastic'), wt('X3', 'one', 1)][i] - 0.1, 1e9, { dy: 0 }));
    vis(tpO, t, wt('X3', 'Otherwise') - 0.1, 1e9, { dy: 0 }); vis(tpO2, t, wt('X3', 'Otherwise'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'glancing') });
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
