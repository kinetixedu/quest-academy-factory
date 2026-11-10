// PUC Physics Ep 108: Conservation of angular momentum (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const LC = '#A23B72', FC = C.orange, VC = C.ac, RC = C.violet, EC = C.teal, IC = C.ink, TC = C.gold;   // L plum, tau/F orange, omega/v blue, r violet, K teal, I ink
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
const LL = tc(LC, 'L'), II = tc(IC, 'I'), om = tc(VC, '\\omega'), rr_ = tc(RC, 'r'), tau_ = tc(FC, '\\tau'), KK = tc(EC, 'K');
const curl = (p, col, sw = 5) => { const g = mk(p, 'g', {}), a = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), h = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, r, a0, s) { if (Math.abs(s) < 0.05) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + s, P = q => [cx + r * Math.cos(q), cy + r * Math.sin(q)], [x0, y0] = P(a0), hs = 14 / r * Math.sign(s), [x1, y1] = P(a1 - hs * 0.6);
    attr(a, 'd', `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(s - hs * 0.6) > Math.PI ? 1 : 0} ${s > 0 ? 1 : 0} ${x1.toFixed(1)},${y1.toFixed(1)}`);
    const [tx, ty] = P(a1), d = [-Math.sin(a1) * Math.sign(s), Math.cos(a1) * Math.sign(s)], n = [Math.cos(a1), Math.sin(a1)];
    attr(h, 'd', `M${(tx + d[0] * 8).toFixed(1)},${(ty + d[1] * 8).toFixed(1)} L${(tx - d[0] * 10 + n[0] * 8).toFixed(1)},${(ty - d[1] * 10 + n[1] * 8).toFixed(1)} L${(tx - d[0] * 10 - n[0] * 8).toFixed(1)},${(ty - d[1] * 10 - n[1] * 8).toFixed(1)} Z`); } }; };
// top view of a person on a spinning chair holding two weights at radius rp (px); rotate by phi
const spinner = (p, cx, cy, o = {}) => { const g = mk(p, 'g', {}), seat = mk(g, 'circle', { cx, cy, r: o.seat ?? 70, fill: '#E3E6EC', stroke: C.dim, 'stroke-width': 3 }), rot = mk(g, 'g', {});
  const armL = mk(rot, 'line', { stroke: '#C98B5E', 'stroke-width': o.aw ?? 14, 'stroke-linecap': 'round' }), armR = mk(rot, 'line', { stroke: '#C98B5E', 'stroke-width': o.aw ?? 14, 'stroke-linecap': 'round' });
  mk(rot, 'ellipse', { cx, cy, rx: o.sh ?? 52, ry: (o.sh ?? 52) * 0.5, fill: '#5B6B8C', stroke: IC, 'stroke-width': 3 });
  mk(rot, 'circle', { cx, cy, r: (o.sh ?? 52) * 0.5, fill: '#2B2B35', stroke: IC, 'stroke-width': 3 });
  mk(rot, 'path', { d: `M${cx - 6},${cy - (o.sh ?? 52) * 0.5 - 2} l6,-10 l6,10`, fill: '#C98B5E', stroke: IC, 'stroke-width': 2 });
  const wL = mk(rot, 'circle', { r: o.wr ?? 20, fill: IC }), wR = mk(rot, 'circle', { r: o.wr ?? 20, fill: IC });
  mk(g, 'circle', { cx, cy, r: 5, fill: '#fff', stroke: IC, 'stroke-width': 2 });
  return { g, rot, ws: [wL, wR], set(rp, phi) { const sh = (o.sh ?? 52) * 0.85; attr(armL, 'x1', cx - sh); attr(armL, 'y1', cy); attr(armL, 'x2', cx - rp); attr(armL, 'y2', cy); attr(armR, 'x1', cx + sh); attr(armR, 'y1', cy); attr(armR, 'x2', cx + rp); attr(armR, 'y2', cy);
    attr(wL, 'cx', cx - rp); attr(wL, 'cy', cy); attr(wR, 'cx', cx + rp); attr(wR, 'cy', cy); attr(rot, 'transform', `rotate(${(phi * 180 / Math.PI).toFixed(2)} ${cx} ${cy})`); } };
};
const lout = (p, x, y, s = 1) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 16 * s, fill: '#fff', stroke: LC, 'stroke-width': 4 * s }); mk(g, 'circle', { cx: x, cy: y, r: 5 * s, fill: LC }); return g; };

Object.assign(M.IC, {
  skate: ['M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M12 7v7', 'M5 9l7 1 7-1', 'M12 14l-3 6', 'M12 14l3 6', 'M6 21h12'],
  dive: ['M17 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M15 9a6 6 0 1 1-8 6', 'M7 15l-2 3'],
  chair: ['M7 3h10v8H7z', 'M5 11h14', 'M12 11v6', 'M8 21l4-4 4 4'],
});

/* ---------- physics: chair + two 2.5 kg weights ---------- */
const I0 = 1.3, MW = 2.5, R_OUT = 0.8, R_IN = 0.2, W0 = 2, Lx = (I0 + 2 * MW * R_OUT * R_OUT) * W0;   // I 4.5 -> 1.5, L = 9
const Ir = r => I0 + 2 * MW * r * r, PXM = 260;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tV1 = T0('V1'), tV2 = T0('V2'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['skate', 'Skater', 'ARMS IN, SPINS FASTER'], ['dive', 'Diver', 'CURLS UP, FLIPS FASTER'], ['chair', 'Spinning chair', "DIYA'S TEST"]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'skater'), wt('H1', 'diver'), wt('H1', 'flips') + 0.4];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="120"></svg></div>`).join('');
const JW = JOBS.map((_, i) => { const s = $('#jsv' + i), sp = spinner(s, 200, 60, { seat: 0, sh: 22, aw: 6, wr: 8 }), c = curl(s, VC, 3); return { sp, c }; });
const hs = $('#hkS'), HC = [300, 290], hsp = spinner(hs, HC[0], HC[1], { seat: 90, sh: 56 }), hW = curl(hs, VC, 6), hWl = txt(hs, 0, 0, 'ω', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 32 });
const tHin = wt('H4', 'pulls'), hR = t => 220 - 150 * M.io((t - tHin) / 0.8), hWr = t => { const r = hR(t) / PXM * 1.0, I = I0 + 2 * MW * Math.pow(r * (0.8 / (220 / PXM)), 2); return Lx / I; };
const hPhase = t => { let p = 0; const dt = 1 / 30; for (let s = tH3; s < t; s += dt) p += 0.5 * hWr(s) * dt; return p; };

/* ---------- P ---------- */
const QR = [[LL, 'Angular momentum', 'the amount of spin a body carries'], [`${LL} = ${II}\\,${om}`, 'For a fixed axis', 'I times omega'], [II, 'Moment of inertia', 'how the mass is spread around the axis'], [om, 'Angular velocity', 'how fast it turns']];
$('#qrs').innerHTML = QR.map(([s, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 100}px;height:88px"><div class="qs">${K(s)}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('') +
  `<div class="eqc ink" id="pP" style="top:494px">No outside torque → ${K(tc('#E7A6C9', 'L'))} stays the same</div>`;
const tQr = [wt('P1', 'Angular'), wt('P2', 'equals'), wt('P3', 'I'), wt('P3', 'Omega')];
const pm = $('#pmS'), PA = [130, 470];
mk(pm, 'line', { x1: PA[0], y1: PA[1], x2: 720, y2: PA[1], stroke: IC, 'stroke-width': 2.5 }); mk(pm, 'line', { x1: PA[0], y1: PA[1], x2: PA[0], y2: 90, stroke: IC, 'stroke-width': 2.5 });
txt(pm, 716, PA[1] + 30, 'I →', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24, fill: IC, 'text-anchor': 'end' }); txt(pm, PA[0] - 14, 104, 'ω', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28, fill: VC, 'text-anchor': 'end' });
const pGh = mk(pm, 'rect', { x: PA[0], fill: 'none', stroke: LC, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0 });
const pRc = mk(pm, 'rect', { x: PA[0], fill: '#F6E3EE', stroke: LC, 'stroke-width': 3 }), pRl = txt(pm, 0, 0, 'L = 9', { fill: LC, 'font-weight': 700, 'font-size': 26, 'text-anchor': 'middle' });
const pIl = txt(pm, 0, PA[1] + 30, '', { fill: IC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' }), pWl = txt(pm, PA[0] + 10, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 20 });
const PSX = 120, PSY = 60;   // px per kg m^2, px per rad/s

/* ---------- S: the chair sim ---------- */
const s = $('#simS'), SC = [330, 286];
const ghW = [0.3, 0.2, 0.12].map(op => { const a = mk(s, 'circle', { r: 20, fill: IC, opacity: 0 }), b = mk(s, 'circle', { r: 20, fill: IC, opacity: 0 }); return { a, b, op }; });
const ssp = spinner(s, SC[0], SC[1]);
const sRl = mk(s, 'line', { stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '7 6' }), sRt = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const sV = [PUC.arrow(s, VC, 6, 18), PUC.arrow(s, VC, 6, 18)], sVl = txt(s, 0, 0, 'v', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 });
const sF = [PUC.arrow(s, FC, 7, 20), PUC.arrow(s, FC, 7, 20)], sFl = txt(s, SC[0], SC[1] + 200, 'pull points at the axis → τ = 0', { fill: FC, 'font-weight': 700, 'font-size': 21, 'text-anchor': 'middle' });
const sW = curl(s, VC, 6), sWl = txt(s, 0, 0, 'ω', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30 });
const sL = lout(s, 668, 112), sLl = txt(s, 668, 156, 'L out of', { fill: LC, 'font-weight': 700, 'font-size': 17, 'text-anchor': 'middle' }), sLl2 = txt(s, 668, 176, 'the screen', { fill: LC, 'font-weight': 700, 'font-size': 17, 'text-anchor': 'middle' });
// sim time s: arms out until s1, pull over Dp (eased), then arms in
const tL1 = tS2, tPu = wt('S4', 'pulls'), Dp = Math.max(2, wt('S5', 'six') - tPu), s1 = tPu - tL1;
const rAt = sv => R_OUT - (R_OUT - R_IN) * M.io((sv - s1) / Dp), wAt = sv => Lx / Ir(rAt(sv));
const PH = []; { let p = 0; for (let i = 0; i <= 60 * 120; i++) { PH.push(p); p += wAt(i / 60) / 60; } }
const phAt = sv => { const i = Math.max(0, Math.min(PH.length - 2, Math.floor(sv * 60))), f = sv * 60 - i; return PH[i] + (PH[i + 1] - PH[i]) * Math.max(0, f); };
const sMid = s1 + Dp / 2, tFz = wt('S7', 'Freeze') + 0.05, sRA = sMid - 0.25 * (tFz - tS7), tRes = tS10 + 0.1;
function state(t) {
  if (t >= tRes) { const sv = t < tRes + 0.8 ? sMid + 0.25 * (t - tRes) : sMid + 0.2 + (t - tRes - 0.8); return { sv, replay: t < tRes + 0.8 }; }
  if (t >= tS7) return t < tFz ? { sv: sRA + 0.25 * (t - tS7), replay: true } : { sv: sMid, frozen: true };
  if (t >= tL1) return { sv: t - tL1 };
  return { sv: 0, ready: true };
}
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r</span><span class="v" id="r_r" style="color:${RC}">0.80</span><span class="u">m</span>
  <span class="k" style="color:${IC}">I</span><span class="v" id="r_I">4.50</span><span class="u">kg m²</span>
  <span class="k" style="color:${FC}">τ<sub style="font-size:.55em">out</sub></span><span class="v" id="r_tq" style="color:${FC}">0</span><span class="u">N m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">ω</span><span class="v" id="r_w" style="color:${VC}">0.00</span><span class="u">rad/s</span>
  <span class="k" style="color:${LC}">L</span><span class="v" id="r_L" style="color:${LC}">0.00</span><span class="u">kg m²/s</span>
  <span class="k" style="color:${EC}">K</span><span class="v" id="r_k" style="color:${EC}">0.0</span><span class="u">J</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 5, ymin: 0, ymax: 10, xt: [0, 1, 2, 3, 4, 5], yt: [0, 5, 10], xl: 'I (kg m²)' });
const gL = mk(gs, 'path', { d: '', fill: 'none', stroke: LC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gW = mk(gs, 'path', { d: '', fill: 'none', stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gWh = mk(gs, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 60; i++) { const I = 1.4 + (4.6 - 1.4) * i / 60; d += (i ? 'L' : 'M') + g.X(I).toFixed(1) + ',' + g.Y(Lx / I).toFixed(1); } return d; })(), fill: 'none', stroke: VC, 'stroke-width': 2, 'stroke-dasharray': '4 7', opacity: 0.45 });
const dW = g.dot(VC, 10), dL = g.dot(LC, 10);
$('#leg').innerHTML = [[LC, 'L = Iω'], [VC, 'ω']].map(([c, n]) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="5" stroke-linecap="round"/></svg>${n}</span>`).join('');
$('#eq1').innerHTML = K(`${LL} = ${II}\\,${om} = 4.5 \\times 2 = ${tc(LC, '9')}`);
$('#eq2').innerHTML = K(`1.5 \\times 6 = ${tc('#E7A6C9', '9')}\\quad\\text{still}`);

/* ---------- R ---------- */
const LK = [`Nothing outside twists her: ${K(`${LL}\\ \\text{stays the same}`)}`, `${K(`${LL} = ${II}\\,${om}`)} and I becomes 3 times smaller`, `So ${K(om)} must become 3 times bigger: 2 → 6`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('') + `<div class="eqc ink" id="rP" style="top:430px;height:76px;font-size:36px">${K(`4.5 \\times 2 = 1.5 \\times 6 = ${tc('#E7A6C9', '9')}`)}</div>`;
const tLk = [wt('R2', 'Nothing'), wt('R3', 'Pulling'), wt('R4', 'omega')];
$('#rbars').innerHTML = [['I', IC, 'kg m²'], ['ω', VC, 'rad/s'], ['L', LC, 'kg m²/s']].map(([n, c, u], i) => `<div class="blab" style="left:36px;top:${118 + i * 130}px;font:700 34px Poppins;font-style:italic;color:${c}">${n}</div><div class="bar" id="rb${i}" style="left:110px;top:${112 + i * 130}px;background:${c}"></div><div class="blab" id="rv${i}" style="top:${120 + i * 130}px;color:${c}"></div><div class="blab" style="left:110px;top:${166 + i * 130}px;font-size:16px;color:var(--mute)">${u}</div>`).join('');
const tRb = wt('R3', 'three'), tRw = wt('R4', 'three');

/* ---------- D ---------- */
const STEPS = [[`${LL} = \\textstyle\\sum m${rr_}^2\\,${om} = ${II}\\,${om}`, 'each bit carries m r² ω; add them all'],
  [`d${LL}/dt = ${tau_}_{\\text{out}}`, 'the outside torque changes L'],
  [`${tau_}_{\\text{out}} = 0 \\;\\Rightarrow\\; ${LL} = \\text{constant}`, 'no outside twist, no change'],
  [`${II}_1\\,${om}_1 = ${II}_2\\,${om}_2`, 'before = after'],
  [`${KK} = \\tfrac12 ${II}${om}^2 = ${LL}^2/2${II}`, 'same L, smaller I: more spin energy']];
const SY = [84, 180, 278, 370, 456];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:84px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Each'), wt('D3', 'rate'), wt('D4', 'outside'), wt('D5', 'So'), wt('D6', 'Spin')];
const dp = $('#dpS'), DB = 400;
const DBARS = [['L', LC, 9, 9, 20], ['K', EC, 9, 27, 10]].map(([n, c, a, b, sc], i) => { const x0 = 60 + i * 230; txt(dp, x0 + 70, DB + 36, n + ' (' + (i ? 'J' : 'kg m²/s') + ')', { 'text-anchor': 'middle', fill: c, 'font-weight': 700, 'font-size': 20 });
  const r1 = mk(dp, 'rect', { x: x0, width: 60, fill: M.mix(c, '#FFFFFF', 0.55) }), r2 = mk(dp, 'rect', { x: x0 + 80, width: 60, fill: c }), l1 = txt(dp, x0 + 30, 0, String(a), { 'text-anchor': 'middle', fill: c, 'font-weight': 700, 'font-size': 22 }), l2 = txt(dp, x0 + 110, 0, String(b), { 'text-anchor': 'middle', fill: c, 'font-weight': 700, 'font-size': 22 });
  txt(dp, x0 + 30, DB + 60, 'out', { 'text-anchor': 'middle', 'font-size': 16 }); txt(dp, x0 + 110, DB + 60, 'in', { 'text-anchor': 'middle', 'font-size': 16 });
  return { r1, r2, l1, l2, a, b, sc }; });
mk(dp, 'line', { x1: 40, y1: DB, x2: 500, y2: DB, stroke: IC, 'stroke-width': 2.5 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tau_}_{\\text{out}} = 0 \\;\\Rightarrow\\; ${II}_1${om}_1 = ${II}_2${om}_2`);

/* ---------- K: arms out vs arms in ---------- */
const KC = [330, 270];
const KV = [['#khS', R_OUT, 2], ['#klS', R_IN, 6]].map(([id, r, w]) => { const sv = $(id), sp = spinner(sv, KC[0], KC[1]), wc = curl(sv, VC, 6);
  const rl = mk(sv, 'line', { x1: KC[0], y1: KC[1] + 120, x2: KC[0] + r * PXM, y2: KC[1] + 120, stroke: RC, 'stroke-width': 3 }); txt(sv, KC[0] + r * PXM / 2, KC[1] + 150, 'r = ' + r + ' m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 });
  return { sp, wc, r, w }; });
$('#khP').innerHTML = K(`${II} = 4.5,\\;\\; ${om} = 2,\\;\\; ${LL} = 9`); $('#klP').innerHTML = K(`${II} = 1.5,\\;\\; ${om} = 6,\\;\\; ${LL} = 9`);
document.querySelectorAll('#sK .kp .katex').forEach(e => e.style.fontSize = '30px');
const th1 = PUC.think($('#th1'), { q: 'When she pulls her arms in, does her spin energy stay the same, go up, or go down?', opts: ['Same', 'Up', 'Down'], right: 1, why: 'K = L²/2I: 9 J becomes 27 J. Her muscles did 18 J of work.' });

/* ---------- V: she lets go ---------- */
const vs = $('#vsS'), VCn = [330, 280], vsp = spinner(vs, VCn[0], VCn[1]);
const vb = [mk(vs, 'circle', { r: 20, fill: IC }), mk(vs, 'circle', { r: 20, fill: IC })], vtr = [mk(vs, 'line', { stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.5 }), mk(vs, 'line', { stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.5 })];
const vva = [PUC.arrow(vs, VC, 6, 18), PUC.arrow(vs, VC, 6, 18)], vwc = curl(vs, VC, 6);
txt(vs, 392, 548, 'each weight flies off in a straight line', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 20 });
$('#vro').innerHTML = `<span class="k" style="color:${VC}">ω</span><span class="v" id="v_w" style="color:${VC}">2.00</span><span class="u">rad/s · Diya</span>
  <span class="k" style="color:${LC}">L</span><span class="v" id="v_L" style="color:${LC}">9.00</span><span class="u">kg m²/s · Diya + weights</span>
  <span class="k" style="color:${LC}">L<sub style="font-size:.55em">D</sub></span><span class="v" id="v_Ld" style="color:${LC}">9.00</span><span class="u">kg m²/s · Diya alone</span>`;
$('#vP').innerHTML = `${K(`${tc(LC, 'L_D')} = 1.3 \\times 2 = 2.6,\\;\\; ${om}\\ \\text{stays}\\ 2`)}`;
const th2 = PUC.think($('#th2'), { q: 'Arms out, she simply lets go of both weights. Does she speed up?', opts: ['Yes, she speeds up', 'No, ω stays the same'], right: 1, why: 'The weights carry off their share of L. Her ω stays at 2 rad/s.' });
const tRel = wt('V1', 'lets'), tFly = wt('V3', 'flies');

/* ---------- W: ring dropped on a disc ---------- */
$('#wkq').innerHTML = 'A disc (I = 4 kg m²) turns freely at 10 rad/s. A ring (I = 1 kg m²), not spinning, is dropped onto it, and they turn together. Find the new ω and the energy lost.';
const wsol = PUC.solution($('#wl'), [
  [K(`${LL} = 4 \\times 10 = 40\\ \\text{kg m}^2\\text{/s}`)],
  [K(`${om}' = \\dfrac{40}{4 + 1} = ${tc(VC, '8\\ \\text{rad/s}')}`)],
  [K(`${KK}_1 = \\tfrac12 \\times 4 \\times 10^2 = 200\\ \\text{J}`)],
  [K(`${KK}_2 = \\tfrac12 \\times 5 \\times 8^2 = 160\\ \\text{J} \\Rightarrow ${tc(C.red, '40\\ \\text{J lost}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WC = [250, 300];
const wd = mk(w, 'g', {}), wdi = mk(wd, 'g', {}); mk(wdi, 'circle', { cx: WC[0], cy: WC[1], r: 170, fill: '#D9DEE7', stroke: IC, 'stroke-width': 5 }); mk(wdi, 'line', { x1: WC[0], y1: WC[1], x2: WC[0] + 164, y2: WC[1], stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const wrg = mk(w, 'g', {}), wri = mk(wrg, 'g', {}); mk(wri, 'circle', { cx: WC[0], cy: WC[1], r: 110, fill: 'none', stroke: '#8A6A4A', 'stroke-width': 18 }); mk(wri, 'circle', { cx: WC[0] + 110, cy: WC[1], r: 7, fill: IC });
mk(w, 'circle', { cx: WC[0], cy: WC[1], r: 12, fill: '#fff', stroke: IC, 'stroke-width': 4 });
const wwc = curl(w, VC, 6);
$('#wro').innerHTML = `<span class="k" style="color:${IC}">I</span><span class="v" id="w_I">4</span><span class="u">kg m²</span>
  <span class="k" style="color:${VC}">ω</span><span class="v" id="w_w" style="color:${VC}">10.0</span><span class="u">rad/s</span>
  <span class="k" style="color:${LC}">L</span><span class="v" id="w_L" style="color:${LC}">40.0</span><span class="u">kg m²/s</span>
  <span class="k" style="color:${EC}">K</span><span class="v" id="w_k" style="color:${EC}">200</span><span class="u">J</span>`;
const tDrop = wt('W2', 'dropped'), tW = [wt('W3', 'No'), wt('W4', 'Together'), wt('W5', 'Energy'), wt('W6', 'Energy')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A faster spin means a torque acted', right: `No torque here: I fell, so ω rose (${K(`${tc(LC, 'L')} = I\\omega`)} fixed)` });
$('#cvs').innerHTML = [['τ = 0', FC], ['I ÷ 3', IC], ['ω × 3', VC], ['L = 9, same', LC]].map(([n, c], i) => `<div class="ochip" id="cv${i}" style="left:${1100 + (i % 2) * 220}px;top:${60 + Math.floor(i / 2) * 64}px;color:${c};font-size:24px;height:50px">${n}</div>`).join('');
const where = PUC.where($('#wa'), { on: [], type: 'Skaters and divers, bodies dropped on turning discs, a shrinking planet or star' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'If the Earth shrank to half its radius, keeping its mass and staying a uniform sphere, how long would one day be?', qW: 760,
  opts: ['6 hours', '12 hours', '48 hours', '96 hours'], right: 0, optY: 300, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`${II} = \\tfrac25 MR^2 \\Rightarrow R/2:\\ ${II}/4`)], [K(`${LL}\\ \\text{kept} \\Rightarrow ${om} \\times 4`)],
  [K(`T = \\dfrac{2\\pi}{${om}} \\Rightarrow T/4`)], [K(`T = \\dfrac{24\\ \\text{h}}{4} = 6\\ \\text{h}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'For'), wt('A3', 'L'), wt('A4', 'day'), wt('A4', 'Six')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · conservation of angular momentum', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`${LL} = ${II}\\,${om} \\qquad d${LL}/dt = ${tau_}_{\\text{out}}`), K(`${tau_}_{\\text{out}} = 0 \\;\\Rightarrow\\; ${II}_1${om}_1 = ${II}_2${om}_2`),
    `<b>Pull in</b>: I ↓, ω ↑, and ${K(`${KK} = ${LL}^2/2${II}`)} goes up`, '<b>L points along the axis</b> (right-hand rule)'] });
const YQ = ['Why does Diya spin faster when she pulls her arms in?', 'Why does her spin energy go up, though L stays the same?', 'Why does letting go of the weights not speed her up?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 109', topic: 'Why is the bottom of a rolling wheel still? Rolling Motion', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tS10 - 0.4, 1, 960, 540]]);
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
    JW.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const t0 = tMorph + 0.9 + i * 0.5, u = M.io((t - t0) / 0.6), rp = 70 - 44 * u, w = 2 * Math.pow(70 / rp, 2) * 0.35;
      let ph = 0; { const dt = 1 / 30; for (let s2 = tMorph; s2 < t; s2 += dt) { const uu = M.io((s2 - t0) / 0.6), r2 = 70 - 44 * uu; ph += 0.7 * Math.pow(70 / r2, 2) * dt; } }
      q.sp.set(rp, ph); q.c.set(200, 60, 52, -1.0, 0.6 + 1.0 * u); });
    vis($('#hjP'), t, wt('H2', 'Yet') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    hsp.set(hR(t), hPhase(t)); const wr = M.clamp((hWr(t) - 2) / 4);
    hW.set(HC[0], HC[1], 120, -2.4, 0.8 + 1.4 * wr); attr(hWl, 'x', HC[0] - 150); attr(hWl, 'y', HC[1] - 100);
    vis($('#hkQ'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#pP'), t, wt('P4', 'outside') - 0.1, 1e9, POP);
    vis($('#pm'), t, wt('P2', 'equals') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - wt('P4', 'change')) / 1.4), I = 4.5 - 3 * u, wv = Lx / I, W = I * PSX, H = wv * PSY * 0.75;
    attr(pRc, 'y', (PA[1] - H).toFixed(1)); attr(pRc, 'width', W.toFixed(1)); attr(pRc, 'height', H.toFixed(1));
    attr(pGh, 'y', (PA[1] - 2 * PSY * 0.75).toFixed(1)); attr(pGh, 'width', 4.5 * PSX); attr(pGh, 'height', 2 * PSY * 0.75); pGh.style.opacity = u > 0.05 ? 0.5 : 0;
    attr(pRl, 'x', (PA[0] + W / 2).toFixed(1)); attr(pRl, 'y', (PA[1] - H / 2 + 9).toFixed(1));
    attr(pIl, 'x', (PA[0] + W / 2).toFixed(1)); M.setT(pIl, 'I = ' + f2(I)); attr(pWl, 'y', (PA[1] - H - 12).toFixed(1)); M.setT(pWl, 'ω = ' + f2(wv));
    [pRc, pRl, pIl, pWl].forEach(e => vis(e, t, wt('P2', 'equals'), 1e9, { dy: 0 }));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const S = state(t), r = rAt(S.sv), I = Ir(r), wv = S.ready ? W0 : Lx / I, ph = S.ready ? 0 : phAt(S.sv), rp = r * PXM;
    ssp.set(rp, ph); vis(ssp.g, t, tS1 + 0.4, 1e9, { dy: 0 });
    const moving = !S.ready && !S.frozen;
    ghW.forEach((q, j) => { const pj = S.ready ? 0 : phAt(Math.max(0, S.sv - (S.replay ? 0.03 : 0.07) * (j + 1))), rj = rAt(Math.max(0, S.sv - (S.replay ? 0.03 : 0.07) * (j + 1))) * PXM;
      attr(q.a, 'cx', (SC[0] + rj * Math.cos(pj)).toFixed(1)); attr(q.a, 'cy', (SC[1] + rj * Math.sin(pj)).toFixed(1)); attr(q.b, 'cx', (SC[0] - rj * Math.cos(pj)).toFixed(1)); attr(q.b, 'cy', (SC[1] - rj * Math.sin(pj)).toFixed(1));
      q.a.style.opacity = q.b.style.opacity = moving ? q.op : 0; });
    const c = Math.cos(ph), sn = Math.sin(ph), E = [SC[0] + rp * c, SC[1] + rp * sn];
    const uR = M.io((t - wt('S2', 'point') + 0.1) / 0.3); attr(sRl, 'x1', SC[0]); attr(sRl, 'y1', SC[1]); attr(sRl, 'x2', E[0].toFixed(1)); attr(sRl, 'y2', E[1].toFixed(1)); sRl.style.opacity = uR;
    attr(sRt, 'x', (SC[0] + rp * 0.5 * c - 26 * sn).toFixed(1)); attr(sRt, 'y', (SC[1] + rp * 0.5 * sn + 26 * c + 6).toFixed(1)); M.setT(sRt, 'r = ' + f2(r) + ' m'); sRt.style.opacity = uR;
    // velocities of the weights (tangent, v = r omega), drawn 40 px per m/s
    const uV = S.ready ? 0 : M.io((t - tL1 - 0.3) / 0.4), vl = 40 * r * wv * uV;
    [1, -1].forEach((sg, i) => { const P = [SC[0] + sg * rp * c, SC[1] + sg * rp * sn], d = [-sg * sn, sg * c]; sV[i].set(P[0] + d[0] * 22, P[1] + d[1] * 22, P[0] + d[0] * (22 + vl), P[1] + d[1] * (22 + vl)); if (!i) { attr(sVl, 'x', (P[0] + d[0] * (34 + vl)).toFixed(1)); attr(sVl, 'y', (P[1] + d[1] * (34 + vl) + 8).toFixed(1)); } });
    sVl.style.opacity = uV;
    // the pull (radial, inward) only during the slow-mo freeze
    const uF = (S.frozen || (S.replay && t >= tRes)) ? M.io((t - wt('S8', 'pull') + 0.1) / 0.4) : 0;
    [1, -1].forEach((sg, i) => { const P = [SC[0] + sg * rp * c - sn * 30, SC[1] + sg * rp * sn + c * 30]; sF[i].set(P[0] + sg * c * 10, P[1] + sg * sn * 10, P[0] - sg * c * 70 * uF, P[1] - sg * sn * 70 * uF); });
    sFl.style.opacity = (S.frozen || S.replay && t >= tRes ? M.io((t - wt('S9', 'axis') + 0.1) / 0.4) : 0).toFixed(3);
    sW.set(SC[0], SC[1], 120, -2.6, 0.4 + 1.6 * M.clamp((wv - 1) / 5)); attr(sWl, 'x', SC[0] - 150); attr(sWl, 'y', SC[1] - 92);
    [sL, sLl, sLl2].forEach(e => vis(e, t, wt('S3', 'L') - 0.1, 1e9, { dy: 0 }));
    vis($('#rdy'), t, tS1 + 0.6, tL1 + 0.3, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    vis($('#eq1'), t, wt('S3', 'Nine') - 0.2, wt('S6', 'Still') - 0.5, POP); vis($('#eq2'), t, wt('S6', 'Still') - 0.2, tS7 - 0.2, POP);
    if (t >= tS10) vis($('#eq2'), t, wt('S10', 'omega') + 0.4, 1e9, POP);
    // readout: round r first, then compute
    const rr = Math.round(r * 100) / 100, Ir2 = Ir(rr), wr = S.ready ? W0 : Lx / Ir2;
    M.setT($('#r_r'), f2(rr)); M.setT($('#r_I'), f2(Ir2)); M.setT($('#r_tq'), '0'); M.setT($('#r_w'), f2(wr)); M.setT($('#r_L'), f2(Ir2 * wr)); M.setT($('#r_k'), f1(0.5 * Ir2 * wr * wr));
    $('#r_L').style.background = mix('#FFFFFF', '#F6E3EE', M.io((t - wt('S6', 'L')) / 0.3) * (1 - M.io((t - tS7) / 0.3)));
    $('#r_tq').style.background = mix('#FFFFFF', '#FBEBDD', M.io((t - wt('S9', 'zero')) / 0.3));
    // graph: L flat at 9 and omega on its curve, both drawn from I = 4.5 down to the current I
    const Ic = S.ready ? 4.5 : Ir2, on = t >= tL1;
    attr(gL, 'd', on ? `M${g.X(4.5).toFixed(1)},${g.Y(Lx).toFixed(1)} L${g.X(Ic).toFixed(1)},${g.Y(Lx).toFixed(1)}` : '');
    { let d = ''; const n = 40; for (let i = 0; i <= n; i++) { const Iv = 4.5 + (Ic - 4.5) * i / n; d += (i ? 'L' : 'M') + g.X(Iv).toFixed(1) + ',' + g.Y(Lx / Iv).toFixed(1); } attr(gW, 'd', on ? d : ''); }
    dW(Ic, Lx / Ic, on); dL(Ic, Lx, on); gWh.style.opacity = on ? 0.45 : 0;
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'Two') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const uI = M.io((t - tRb) / 1.2), I = 4.5 - 3 * uI, wv = Lx / I, L = I * wv;
    [[I, 4.5, 60], [wv, 6, 60], [L, 9, 40]].forEach(([v, mx, sc], i) => { const b = $('#rb' + i), wd = Math.max(8, v * sc); b.style.width = wd.toFixed(1) + 'px'; const lb = $('#rv' + i); lb.style.left = (110 + wd + 16).toFixed(1) + 'px'; M.setT(lb, i === 2 ? f2(L) : f2(v));
      vis(b, t, tR1 + 0.7 + i * 0.12, 1e9, { dy: 0 }); vis(lb, t, tR1 + 0.8 + i * 0.12, 1e9, { dy: 0 }); });
    $('#rb1').style.boxShadow = M.io((t - tRw) / 0.3) > 0 ? `0 0 0 ${(4 * M.io((t - tRw) / 0.3)).toFixed(1)}px ${C.ac2}` : '';
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; hb.style.height = (hiY > SY[0] + 40 && hiY < SY[3] - 40 ? 100 : 92) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    DBARS.forEach((q, i) => { const tin = i ? tStep[4] + 0.3 : tStep[3] + 0.3, u1 = M.o3((t - tin) / 0.5), u2 = M.o3((t - tin - 0.4) / 0.5), h1 = q.a * q.sc * u1, h2 = q.b * q.sc * u2;
      attr(q.r1, 'y', DB - h1); attr(q.r1, 'height', h1); attr(q.r2, 'y', DB - h2); attr(q.r2, 'height', h2); attr(q.l1, 'y', DB - h1 - 10); attr(q.l2, 'y', DB - h2 - 10); q.l1.style.opacity = u1; q.l2.style.opacity = u2; });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'angular') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'same') + 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK2 + 0.3, 1e9, { dy: 8 });
    KV.forEach((q, i) => { const ph = Math.max(0, t - (i ? tK2 : tK1)) * q.w * 0.5; q.sp.set(q.r * PXM, ph); q.wc.set(KC[0], KC[1], 112, -2.6, 0.5 + 0.25 * q.w); });
    vis($('#khP'), t, wt('K1', 'nine') - 0.2, 1e9, POP); vis($('#klP'), t, wt('K2', 'nine') - 0.2, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Nine') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1'), vin2 = tV3 + 0.2;
    vis($('#vs'), t, tV1 + 0.05, t < vin2 - 0.3 ? OUT('V2') : out, { dx: -60, dy: 0, ...o }); vis($('#vr'), t, tV1 + 0.25, t < vin2 - 0.3 ? OUT('V2') : out, { dx: 60, dy: 0, ...o });
    if (t >= vin2 - 0.3) { vis($('#vs'), t, vin2, out, { dx: -60, dy: 0, ...o }); vis($('#vr'), t, vin2 + 0.15, out, { dx: 60, dy: 0, ...o }); }
    const rp = R_OUT * PXM, ph = (t - tV1) * W0 * 0.5, tr = t < tFly ? 1e9 : tFly, rel = t >= tFly;
    vsp.set(rel ? 64 : rp, ph); vsp.ws.forEach(e => M.hide(e, rel));
    // released at tFly: each weight moves in a straight line at v = omega r along the tangent (drawn at 0.5x visual time, as the spin)
    const phR = (tFly - tV1) * W0 * 0.5, c = Math.cos(phR), sn = Math.sin(phR), dt = rel ? Math.min(0.32, (t - tFly) * 0.5) : 0, vpx = W0 * rp;
    [1, -1].forEach((sg, i) => { const P0 = rel ? [VCn[0] + sg * rp * c, VCn[1] + sg * rp * sn] : [VCn[0] + sg * rp * Math.cos(ph), VCn[1] + sg * rp * Math.sin(ph)], d = rel ? [-sg * sn, sg * c] : [-sg * Math.sin(ph), sg * Math.cos(ph)];
      const P = [P0[0] + d[0] * vpx * dt, P0[1] + d[1] * vpx * dt]; attr(vb[i], 'cx', P[0].toFixed(1)); attr(vb[i], 'cy', P[1].toFixed(1)); M.hide(vb[i], !rel);
      attr(vtr[i], 'x1', P0[0].toFixed(1)); attr(vtr[i], 'y1', P0[1].toFixed(1)); attr(vtr[i], 'x2', P[0].toFixed(1)); attr(vtr[i], 'y2', P[1].toFixed(1)); vtr[i].style.opacity = rel ? 0.5 : 0;
      vva[i].set(P[0] + d[0] * 22, P[1] + d[1] * 22, P[0] + d[0] * (22 + 64), P[1] + d[1] * (22 + 64)); M.hide(vva[i].g, !rel || dt >= 0.32); });
    vwc.set(VCn[0], VCn[1], 112, -2.6, 1.0);
    M.setT($('#v_w'), '2.00'); M.setT($('#v_L'), '9.00'); M.setT($('#v_Ld'), rel ? '2.60' : '9.00');
    $('#v_Ld').style.background = mix('#FFFFFF', '#F6E3EE', rel ? M.io((t - tFly - 0.3) / 0.3) : 0);
    vis($('#vro'), t, tV1 + 0.6, 1e9, { dy: 10 }); vis($('#vP'), t, wt('V3', 'omega') - 0.2, 1e9, POP);
    vis($('#th2'), t, tV2 + 0.05, OUT('V3'), { dy: 36, ...o });
    th2(t, { tin: tV2, tOpts: wt('V2', 'Does') - 0.1, tCount: T1('V2') + 0.05, dur: 3, tAns: tV3 - 0.02, tWhy: wt('V3', 'Each') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const tg = tDrop + 0.8, joined = t >= tg, wd = joined ? 8 : 10, phD = (Math.min(t, tg) - tW1) * 10 * 0.12 + (joined ? (t - tg) * 8 * 0.12 : 0);
    attr(wdi, 'transform', `rotate(${(phD * 180 / Math.PI).toFixed(2)} ${WC[0]} ${WC[1]})`);
    const ud = M.io((t - tDrop) / 0.8), scl = 1.25 - 0.25 * ud;
    attr(wrg, 'transform', `translate(${WC[0]},${WC[1]}) scale(${scl.toFixed(4)}) translate(${-WC[0]},${-WC[1]})`); wrg.style.opacity = ud.toFixed(3);
    attr(wri, 'transform', joined ? `rotate(${((t - tg) * 8 * 0.12 * 180 / Math.PI).toFixed(2)} ${WC[0]} ${WC[1]})` : '');
    wwc.set(WC[0], WC[1], 194, -2.4, 0.9 + 0.06 * wd);
    vis($('#wro'), t, T0('W2') + 0.6, 1e9, { dy: 10 });
    M.setT($('#w_I'), joined ? '5' : '4'); M.setT($('#w_w'), f1(wd)); M.setT($('#w_L'), '40.0'); M.setT($('#w_k'), joined ? '160' : '200');
    $('#w_L').style.background = mix('#FFFFFF', '#F6E3EE', M.io((t - tW[0]) / 0.3));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'faster') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'No') });
    [wt('X3', 'torque'), wt('X3', 'down'), wt('X3', 'up'), wt('X3', 'stayed')].forEach((tt, i) => vis($('#cv' + i), t, tt - 0.1, 1e9, POP));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'skaters') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.2, tCount, tAns });
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
