// PUC Physics Ep 102: Equilibrium of a rigid body (Motion notebook, a see-saw from the side)
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

// curved arrow about (cx, cy) from a0 sweeping span degrees (span > 0 anticlockwise, < 0 clockwise)
const cArc = (p, col, sw = 4.5) => { const g = mk(p, 'g', {}), pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hd = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, R, a0, span) { if (Math.abs(span) < 4) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + span, p0 = [cx + R * Math.cos(a0 * D2R), cy - R * Math.sin(a0 * D2R)], p1 = [cx + R * Math.cos(a1 * D2R), cy - R * Math.sin(a1 * D2R)], cw = span < 0;
    attr(pa, 'd', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${Math.abs(span) > 180 ? 1 : 0} ${cw ? 1 : 0} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    const sg = cw ? -1 : 1, tg = [-Math.sin(a1 * D2R) * sg, -Math.cos(a1 * D2R) * sg], nn = [Math.cos(a1 * D2R), -Math.sin(a1 * D2R)], h = 13;
    attr(hd, 'd', `M${(p1[0] + tg[0] * h).toFixed(1)},${(p1[1] + tg[1] * h).toFixed(1)} L${(p1[0] + nn[0] * h * 0.6).toFixed(1)},${(p1[1] + nn[1] * h * 0.6).toFixed(1)} L${(p1[0] - nn[0] * h * 0.6).toFixed(1)},${(p1[1] - nn[1] * h * 0.6).toFixed(1)} Z`); } }; };
const pivot = (p, x, y, h = 60, col = '#8D99AE') => mk(p, 'path', { d: `M${x},${y} L${x - h * 0.62},${y + h} L${x + h * 0.62},${y + h} Z`, fill: col, stroke: IC, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
const faceImg = (p, x, y, r, who) => { const id = 'fc' + (faceImg.n = (faceImg.n || 0) + 1), g = mk(p, 'g', {}), cp = mk(g, 'clipPath', { id }); mk(cp, 'circle', { cx: x, cy: y, r });
  const im = mk(g, 'image', { href: IMG + who + '-face.jpg', x: x - r, y: y - r, width: 2 * r, height: 2 * r, 'clip-path': `url(#${id})` }); mk(g, 'circle', { cx: x, cy: y, r, fill: 'none', stroke: VC, 'stroke-width': 3 }); return g; };
const GV = 9.8;

Object.assign(M.IC, {
  seesaw: ['M3 15l18-6', 'M12 12l-3 7h6z'],
  scale: ['M12 3v17', 'M5 7h14', 'M5 7l-3 7h6z', 'M19 7l-3 7h6z', 'M8 20h8'],
  lever: ['M2 17l20-8', 'M15 12l-2 7h4z', 'M3 13h4v4H3z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tR5 = T0('R5'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['seesaw', 'A see-saw', 'TWO KIDS IN BALANCE'], ['scale', 'A beam balance', 'COMES TO REST'], ['lever', 'A crowbar', 'LIFTS A HEAVY STONE']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'see-saw'), wt('H1', 'beam'), wt('H1', 'crowbar')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="110"></svg></div>`).join('');
const MINI = [0, 1, 2].map(i => { const sv = $('#jsv' + i), px = i === 2 ? 230 : 170, py = 70, o = mk(sv, 'g', {}), g = mk(o, 'g', {});
  pivot(sv, px, py, 26); mk(g, 'rect', { x: px - 130 + (i === 2 ? 30 : 0), y: py - 5, width: 260 - (i === 2 ? 60 : 0) + (i === 2 ? 40 : 0), height: 8, rx: 3, fill: WOODc(i), stroke: IC, 'stroke-width': 1.5 });
  if (i === 0) { mk(g, 'rect', { x: px - 128, y: py - 33, width: 28, height: 28, rx: 5, fill: '#8D99AE' }); mk(g, 'rect', { x: px + 104, y: py - 25, width: 20, height: 20, rx: 4, fill: VC }); }
  if (i === 1) { [-110, 110].forEach(dx => { mk(g, 'line', { x1: px + dx, y1: py, x2: px + dx, y2: py + 22, stroke: IC, 'stroke-width': 1.5 }); mk(g, 'path', { d: `M${px + dx - 18},${py + 22} h36 l-6 8 h-24 z`, fill: '#C8CED9', stroke: IC, 'stroke-width': 1.5 }); }); }
  if (i === 2) mk(sv, 'rect', { x: px + 52, y: py - 34, width: 34, height: 30, rx: 6, fill: '#8D99AE', stroke: IC, 'stroke-width': 1.5 });
  return { set(b) { attr(g, 'transform', `rotate(${(-b).toFixed(2)} ${px} ${py})`); } }; });
function WOODc() { return '#D9B98C'; }
const hs = $('#hkS'), HP = [290, 330], HL = 230;
pivot(hs, HP[0], HP[1], 70); mk(hs, 'line', { x1: 36, y1: HP[1] + 70, x2: 520, y2: HP[1] + 70, stroke: IC, 'stroke-width': 3 });
const hBo = mk(hs, 'g', {}), hB = mk(hBo, 'g', {});
mk(hB, 'rect', { x: HP[0] - HL, y: HP[1] - 8, width: 2 * HL, height: 14, rx: 4, fill: '#D9B98C', stroke: '#B08A5A', 'stroke-width': 2.5 });
mk(hB, 'rect', { x: HP[0] - HL + 4, y: HP[1] - 76, width: 66, height: 68, rx: 10, fill: '#8D99AE', stroke: IC, 'stroke-width': 2 }); txt(hB, HP[0] - HL + 37, HP[1] - 36, '60 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 17 });
mk(hB, 'rect', { x: HP[0] + HL - 54, y: HP[1] - 58, width: 50, height: 50, rx: 9, fill: VC, stroke: IC, 'stroke-width': 2 }); txt(hB, HP[0] + HL - 29, HP[1] - 27, '30', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 17 });
const HB = Math.asin(70 / HL) / D2R;

/* ---------- P ---------- */
const IG = [['ΣF', FC, 'Total force = 0', 'its centre of mass does not speed up'], ['Στ', FC, 'Total torque = 0', 'it does not start to turn faster']];
$('#igs').innerHTML = IG.map(([s, c, n, d], i) => `<div class="ig" id="ig${i}" style="top:${84 + i * 130}px;height:110px"><div class="s" style="color:${c};font-size:40px;top:28px;font-style:normal">${s}</div><div class="n">${n}</div><div class="d">${d}</div></div>`).join('');
const pm = $('#pmS'), PP = [392, 300], PS = 105;
pivot(pm, PP[0], PP[1] + 7, 56); mk(pm, 'rect', { x: PP[0] - 2 * PS, y: PP[1] - 7, width: 4 * PS, height: 14, rx: 4, fill: '#D9B98C', stroke: '#B08A5A', 'stroke-width': 2.5 });
mk(pm, 'rect', { x: PP[0] - PS - 26, y: PP[1] - 59, width: 52, height: 52, rx: 9, fill: '#8D99AE' }); mk(pm, 'rect', { x: PP[0] + 2 * PS - 40, y: PP[1] - 45, width: 38, height: 38, rx: 7, fill: VC });
const pN = PUC.arrow(pm, FC, 6, 18), pW1 = PUC.arrow(pm, FC, 6, 18), pW2 = PUC.arrow(pm, FC, 6, 18), pT1 = cArc(pm, FC), pT2 = cArc(pm, FC);
const pNl = txt(pm, PP[0] + 14, PP[1] - 150, 'N = 90g', { fill: FC, 'font-weight': 700, 'font-size': 20 }), pWl = txt(pm, PP[0], PP[1] + 140, 'up = down', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 22 }), pTl = txt(pm, PP[0], PP[1] + 176, 'anticlockwise = clockwise', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 22 });

/* ---------- S: the see-saw sim ---------- */
const s = $('#simS'), P = [392, 380], PXM = 140, HALF = 2, GY = 450, BMAX = Math.asin((GY - P[1]) / (HALF * PXM)) / D2R, M1 = 60, M2 = 30, D2 = 2;
mk(s, 'line', { x1: 36, y1: GY, x2: 748, y2: GY, stroke: IC, 'stroke-width': 3 }); for (let x = 48; x < 748; x += 28) mk(s, 'line', { x1: x, y1: GY + 4, x2: x - 14, y2: GY + 18, stroke: C.dim, 'stroke-width': 2 });
pivot(s, P[0], P[1] + 7, GY - P[1] - 7);
const prop = mk(s, 'rect', { x: P[0] - HALF * PXM - 18, y: P[1] + 7, width: 36, height: GY - P[1] - 7, fill: '#C8CED9', stroke: IC, 'stroke-width': 2 });
const ghB = [0, 1, 2].map(() => { const o = mk(s, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: P[0] - HALF * PXM, y: P[1] - 7, width: 2 * HALF * PXM, height: 14, rx: 4, fill: '#D9B98C' }); return g; });
const bmO = mk(s, 'g', {}), bm = mk(bmO, 'g', {});
mk(bm, 'rect', { x: P[0] - HALF * PXM, y: P[1] - 7, width: 2 * HALF * PXM, height: 14, rx: 4, fill: '#D9B98C', stroke: '#B08A5A', 'stroke-width': 2.5 });
for (let k = -2; k <= 2; k++) { mk(bm, 'line', { x1: P[0] + k * PXM, y1: P[1] + 7, x2: P[0] + k * PXM, y2: P[1] + 16, stroke: IC, 'stroke-width': 2 }); }
const fr = mk(bm, 'g', {}); mk(fr, 'rect', { x: -34, y: -68, width: 68, height: 68, rx: 10, fill: '#8D99AE', stroke: IC, 'stroke-width': 2 }); txt(fr, 0, -38, 'FRIEND', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 13 }); txt(fr, 0, -18, '60 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 16 });
const dy = mk(bm, 'g', {}); mk(dy, 'rect', { x: -26, y: -52, width: 52, height: 52, rx: 9, fill: VC, stroke: IC, 'stroke-width': 2 }); txt(dy, 0, -20, '30 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 14 });
attr(dy, 'transform', `translate(${P[0] + D2 * PXM - 26},${P[1] - 7})`);
const dyF = faceImg(bm, P[0] + D2 * PXM - 26, P[1] - 86, 20, 'diya');
const sW1 = PUC.arrow(s, FC, 6, 18), sW2 = PUC.arrow(s, FC, 6, 18), sN = PUC.arrow(s, FC, 6, 18), sW1l = txt(s, 0, 0, 'W₁ = 588 N', { fill: FC, 'font-weight': 700, 'font-size': 18 }), sW2l = txt(s, 0, 0, 'W₂ = 294 N', { fill: FC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'end' }), sNl = txt(s, 0, 0, 'N', { fill: FC, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' });
const sA1 = mk(s, 'line', { stroke: RC, 'stroke-width': 4 }), sA2 = mk(s, 'line', { stroke: RC, 'stroke-width': 4 }), sA1l = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'middle' }), sA2l = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'middle' });
const sT1 = cArc(s, FC, 5), sT2 = cArc(s, FC, 3.5), sT1l = txt(s, P[0] - 96, P[1] - 92, '120g', { fill: FC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' }), sT2l = txt(s, P[0] + 96, P[1] - 92, '60g', { fill: FC, 'font-weight': 700, 'font-size': 19 });
// trials: hold level, then let go (the prop under the left end slides away)
const tFz = wt('S4', 'Freeze') + 0.1, tRes = T1('S5') + 0.05;
const d1Tr = M.track(2, [[wt('S6', 'moves'), 1.5, M.HEAVY], [wt('S7', 'At') - 0.2, 1.0, M.HEAVY]], M.HEAVY);
const tauN = d => GV * (M1 * d - M2 * D2), Iof = d => M1 * d * d + M2 * D2 * D2;
const bDyn = (d, sv) => sv <= 0 ? 0 : Math.min(BMAX, 0.5 * (tauN(d) / Iof(d)) * sv * sv / D2R);
const sRep0 = Math.max(0, Math.sqrt(2 * 5 * D2R / (tauN(2) / Iof(2))) - 0.25 * (tFz - tS4 - 0.45));
const TR = [{ tH: tS1 - 1, tRel: wt('S3', 'wins') - 0.2 }, { tH: tS4, replay: true }, { tH: wt('S6', 'Now'), tRel: wt('S6', 'still') - 0.3 }, { tH: wt('S7', 'At') - 0.8, tRel: wt('S7', 'stays') - 0.6 }];
const sRep = t => { if (t < tS4 + 0.45) return -1; if (t < tFz) return sRep0 + 0.25 * (t - tS4 - 0.45); const sf = sRep0 + 0.25 * (tFz - tS4 - 0.45); if (t < tRes) return sf; if (t < tRes + 0.8) return sf + 0.25 * (t - tRes); return sf + 0.2 + (t - tRes - 0.8); };
function simState(t) {
  let k = 0; TR.forEach((q, i) => { if (t >= q.tH) k = i; });
  const q = TR[k], d = k >= 2 ? d1Tr(t) : 2, sv = q.replay ? sRep(t) : t - q.tRel, prev = k ? (k === 3 ? bDyn(1.5, 99) : bDyn(2, 99)) : 0;
  let b = bDyn(d, sv), held = sv < 0;
  if (k && t < q.tH + 0.45) b = prev * (1 - M.io((t - q.tH) / 0.45)); else if (held) b = 0;
  return { k, d, sv, b, held, replay: !!q.replay, frozen: q.replay && t >= tFz && t < tRes, moving: sv > 0 && b > 0.05 && b < BMAX - 0.01 };
}
$('#roA').innerHTML = `<span class="k" style="color:${FC}">W<sub>1</sub></span><span class="v" style="color:${FC}">588</span><span class="u">N</span>
  <span class="k" style="color:${RC}">d<sub>1</sub></span><span class="v" id="r_d1" style="color:${RC}">2.00</span><span class="u">m</span>
  <span class="k" style="color:${FC}">τ<sub>1</sub></span><span class="v" id="r_t1" style="color:${FC}">1176</span><span class="u">N m ↺</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">W<sub>2</sub></span><span class="v" style="color:${FC}">294</span><span class="u">N</span>
  <span class="k" style="color:${RC}">d<sub>2</sub></span><span class="v" style="color:${RC}">2.00</span><span class="u">m</span>
  <span class="k" style="color:${FC}">τ<sub>2</sub></span><span class="v" id="r_t2" style="color:${FC}">588</span><span class="u">N m ↻</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 120, y: 70, w: 560, h: 150, xmax: 2.4, ymin: -700, ymax: 700, xt: [0, 0.5, 1, 1.5, 2], yt: [-588, 0, 588], xl: 'd₁ (m)' });
txt(gs, 132, 76, 'net τ (N m)', { 'font-size': 18 });
const gC = g.curve(FC, 5), gDt = g.dot(FC, 10), gZ = mk(gs, 'g', {}); mk(gZ, 'circle', { cx: g.X(1), cy: g.Y(0), r: 9, fill: '#fff', stroke: C.ok, 'stroke-width': 3.5 }); txt(gZ, g.X(1) + 14, g.Y(0) + 28, 'balance at 1 m', { fill: C.ok, 'font-weight': 700, 'font-size': 18 });
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Twice the weight, half the arm!' });

/* ---------- D ---------- */
const STEPS = [[`\\textstyle\\sum \\vec{${F_}} = 0`, 'translational equilibrium: no speeding up', 'FORCES'],
  [`\\textstyle\\sum \\vec{${tau_}} = 0`, 'rotational equilibrium: about any point', 'TORQUES'],
  [`N - ${tc(FC, 'W_1')} - ${tc(FC, 'W_2')} = 0 \\Rightarrow N = 90g`, 'the pivot pushes up with N'],
  [`${tc(FC, 'W_1')}\\,${tc(RC, 'd_1')} = ${tc(FC, 'W_2')}\\,${tc(RC, 'd_2')}`, 'torques about the pivot: anticlockwise = clockwise'],
  [`\\text{load} \\times \\text{load arm} = \\text{effort} \\times \\text{effort arm}`, 'principle of moments (a lever)']];
const SY = [84, 172, 260, 348, 436];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:80px"></div>` + STEPS.map(([f, w, tg], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${FC}">${tg}</div>` : ''}</div>`).join('');
$('#steps').querySelectorAll('.sx').forEach(e => e.style.fontSize = '32px'); $('#steps').querySelectorAll('.why').forEach(e => e.style.top = '46px');
const tStep = [wt('D2', 'Translational'), wt('D3', 'Rotational'), wt('D4', 'see-saw'), wt('D5', 'Torques'), wt('D6', 'principle')];
const dp = $('#dpS'), DPv = [262, 270], DS = 105;
pivot(dp, DPv[0], DPv[1] + 7, 50); mk(dp, 'rect', { x: DPv[0] - 2 * DS, y: DPv[1] - 7, width: 4 * DS, height: 14, rx: 4, fill: '#D9B98C', stroke: '#B08A5A', 'stroke-width': 2.5 });
const dN = PUC.arrow(dp, FC, 6, 18), dW1 = PUC.arrow(dp, FC, 6, 18), dW2 = PUC.arrow(dp, FC, 6, 18);
const dNl = txt(dp, DPv[0] + 12, DPv[1] - 130, 'N = 90g', { fill: FC, 'font-weight': 700, 'font-size': 19 }), dW1l = txt(dp, DPv[0] - DS + 10, DPv[1] + 100, 'W₁ = 60g', { fill: FC, 'font-weight': 700, 'font-size': 18 }), dW2l = txt(dp, DPv[0] + 2 * DS - 8, DPv[1] + 72, 'W₂ = 30g', { fill: FC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'end' });
const dA1 = mk(dp, 'line', { x1: DPv[0] - DS, y1: DPv[1] + 130, x2: DPv[0], y2: DPv[1] + 130, stroke: RC, 'stroke-width': 4 }), dA2 = mk(dp, 'line', { x1: DPv[0], y1: DPv[1] + 130, x2: DPv[0] + 2 * DS, y2: DPv[1] + 130, stroke: RC, 'stroke-width': 4 });
const dA1l = txt(dp, DPv[0] - DS / 2, DPv[1] + 156, 'd₁ = 1 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 18 }), dA2l = txt(dp, DPv[0] + DS, DPv[1] + 156, 'd₂ = 2 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 18 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textstyle\\sum \\vec{${F_}} = 0 \\qquad \\textstyle\\sum \\vec{${tau_}} = 0`);

/* ---------- R ---------- */
const LK = [`Diya's torque: 30g × 2 = <b class="fo">60g</b> N m`, `Twice the weight needs half the arm`, `Half of 2 m is <b class="vi">1 m</b>`, `So the friend sits 1 m from the pivot`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'torque'), wt('R3', 'twice'), wt('R4', 'Half'), wt('R4', 'Twice')];
const rr = $('#rrS'), RO = [90, 470], RX = 200, RY = 4;
mk(rr, 'path', { d: `M${RO[0]},${RO[1] - 280} V${RO[1]} H${RO[0] + 2.4 * RX}`, fill: 'none', stroke: IC, 'stroke-width': 2.5 });
txt(rr, RO[0] + 2.4 * RX, RO[1] + 56, 'arm (m)', { 'text-anchor': 'end' }); txt(rr, RO[0] + 10, RO[1] - 288, 'weight (kg × g)');
[1, 2].forEach(x => txt(rr, RO[0] + x * RX, RO[1] + 30, x, { 'text-anchor': 'middle' })); [30, 60].forEach(y => txt(rr, RO[0] - 10, RO[1] - y * RY + 6, y, { 'text-anchor': 'end' }));
const rD = mk(rr, 'rect', { x: RO[0], y: RO[1] - 30 * RY, width: 2 * RX, height: 30 * RY, fill: VC, 'fill-opacity': 0.18, stroke: VC, 'stroke-width': 3 }), rDl = txt(rr, RO[0] + 2 * RX - 10, RO[1] - 30 * RY + 76, 'Diya: 30 × 2 = 60', { 'text-anchor': 'end', fill: VC, 'font-weight': 700, 'font-size': 18 });
const rF = mk(rr, 'rect', { x: RO[0], y: RO[1] - 60 * RY, width: RX, height: 60 * RY, fill: IC, 'fill-opacity': 0.1, stroke: IC, 'stroke-width': 3, 'stroke-dasharray': '8 5' }), rFl = txt(rr, RO[0] + 12, RO[1] - 60 * RY - 14, 'Friend: 60 × 1 = 60', { fill: IC, 'font-weight': 700, 'font-size': 20 });
const rEq = txt(rr, 740, RO[1] - 220, 'same area = same torque', { 'text-anchor': 'end', fill: C.ok, 'font-weight': 700, 'font-size': 21 });
const th2 = PUC.think($('#th2'), { q: 'Balanced at 1 m and 2 m. Both move halfway in. Does it still balance?', opts: ['Yes, still balanced', 'No, it tips'], right: 0, why: '60 × 0.5 = 30 × 1: both torques halve, so they still match.' });

/* ---------- K ---------- */
const KC = [392, 330], KL = 200;
const kl = $('#klS'); mk(kl, 'rect', { x: KC[0] - KL, y: KC[1] - 9, width: 2 * KL, height: 18, rx: 6, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2 }); ptMk(kl, KC[0], KC[1], 8);
const kA = PUC.arrow(kl, FC, 7, 20), kB = PUC.arrow(kl, FC, 7, 20), kAl = SYM(kl, 0, 0, 'F', FC, 26), kBl = SYM(kl, 0, 0, 'F', FC, 26);
const kr = $('#krS'), kRo = mk(kr, 'g', {}), kRg = mk(kRo, 'g', {}); mk(kRg, 'rect', { x: KC[0] - KL, y: KC[1] - 9, width: 2 * KL, height: 18, rx: 6, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2 }); ptMk(kr, KC[0], KC[1], 8);
const kC = PUC.arrow(kr, FC, 7, 20), kD = PUC.arrow(kr, FC, 7, 20), kCl = SYM(kr, 0, 0, 'F', FC, 26), kDl = SYM(kr, 0, 0, 'F', FC, 26), kTq = cArc(kr, FC, 5), kTql = txt(kr, KC[0] + 74, KC[1] - 74, 'τ = F d', { fill: FC, 'font-weight': 700, 'font-size': 21 });
const kdl = mk(kr, 'line', { stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), kdlL = SYM(kr, 0, 0, 'd', RC, 24);
$('#klP').innerHTML = `Net force 0 · net torque 0 · no turn`; $('#krP').innerHTML = `Net force 0 · torque <i class="fo">F</i> <i class="vi">d</i> ≠ 0 · it turns`;
const th1 = PUC.think($('#th1'), { q: 'Aarav turns a steering wheel with a couple. Does the wheel also move off sideways?', opts: ['Yes, it moves', 'No, it only turns'], right: 1, why: 'The two forces cancel, so the centre stays put.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A light rod, 1 m long, hangs from two strings at its ends. A 60 N load hangs 0.25 m from the left end. Find the two tensions.';
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{torques about the left end: } ${tc(FC, 'T_R')} \\times 1 = 60 \\times 0.25`)],
  [K(`${tc(FC, 'T_R')} = 15\\ \\text{N}`)],
  [K(`${tc(FC, 'T_L')} + ${tc(FC, 'T_R')} = 60 \\Rightarrow ${tc(FC, 'T_L')} = 45\\ \\text{N}`)],
  [K(`\\text{check about the right end: } 45 \\times 1 = 60 \\times 0.75`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 84 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const w = $('#wrS'), WXL = 142, WXR = 642, WY = 300, WC = 110;
mk(w, 'line', { x1: 80, y1: WC, x2: 704, y2: WC, stroke: IC, 'stroke-width': 4 }); for (let x = 92; x < 704; x += 26) mk(w, 'line', { x1: x, y1: WC - 4, x2: x - 12, y2: WC - 16, stroke: C.dim, 'stroke-width': 2 });
[WXL, WXR].forEach(x => mk(w, 'line', { x1: x, y1: WC, x2: x, y2: WY, stroke: C.ink2, 'stroke-width': 2.5 }));
mk(w, 'rect', { x: WXL, y: WY - 8, width: WXR - WXL, height: 16, rx: 5, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2 });
const WXP = WXL + 0.25 * (WXR - WXL); mk(w, 'line', { x1: WXP, y1: WY, x2: WXP, y2: WY + 70, stroke: C.ink2, 'stroke-width': 2.5 }); mk(w, 'rect', { x: WXP - 32, y: WY + 70, width: 64, height: 50, rx: 8, fill: IC }); txt(w, WXP, WY + 101, '60 N', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 17 });
const wTL = PUC.arrow(w, FC, 6, 18), wTR = PUC.arrow(w, FC, 6, 18), wW = PUC.arrow(w, FC, 6, 18);
const wTLl = txt(w, WXL + 14, WY - 140, '', { fill: FC, 'font-weight': 700, 'font-size': 21 }), wTRl = txt(w, WXR - 14, WY - 140, '', { fill: FC, 'font-weight': 700, 'font-size': 21, 'text-anchor': 'end' });
const wA1 = mk(w, 'line', { x1: WXL, y1: WY + 160, x2: WXP, y2: WY + 160, stroke: RC, 'stroke-width': 4 }), wA2 = mk(w, 'line', { x1: WXL, y1: WY + 196, x2: WXR, y2: WY + 196, stroke: RC, 'stroke-width': 4 });
const wA1l = txt(w, (WXL + WXP) / 2, WY + 150, '0.25 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 18 }), wA2l = txt(w, (WXL + WXR) / 2, WY + 226, '1 m', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 18 });
const wAx = ptMk(w, WXL, WY, 10);
const tW = [wt('W3', 'Take'), wt('W4', 'right'), wt('W5', 'two'), wt('W6', 'closer')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Forces add to zero, so it is in equilibrium', right: 'Need zero total force AND zero total torque' });
const tp = $('#tpS'), TC0 = [260, 150], tRo = mk(tp, 'g', {}), tRg = mk(tRo, 'g', {});
mk(tRg, 'rect', { x: TC0[0] - 140, y: TC0[1] - 7, width: 280, height: 14, rx: 5, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2 });
const tA = PUC.arrow(tp, FC, 6, 18), tB = PUC.arrow(tp, FC, 6, 18);
const tL1 = txt(tp, 440, 110, 'ΣF = 0', { fill: C.ok, 'font-weight': 700, 'font-size': 22 }), tL2 = txt(tp, 440, 146, 'Στ ≠ 0', { fill: C.red, 'font-weight': 700, 'font-size': 22 });
const where = PUC.where($('#wa'), { on: [], type: 'Planks on two supports, see-saws and levers, and couples' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A uniform 4 m plank of weight 200 N rests on two supports, each 0.5 m from an end. A 600 N man stands 1 m from the left end. The push of the left support is', qW: 760,
  opts: ['600 N', '400 N', '200 N', '500 N'], right: 0, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{torques about the right support}`)], [K(`N_A \\times 3 = 200 \\times 1.5 + 600 \\times 2.5`)],
  [K(`N_A = \\dfrac{1800}{3} = 600\\ \\text{N}`)], [K(`N_B = 800 - 600 = 200\\ \\text{N}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '22px');
const tSo = [wt('A2', 'Take'), wt('A3', 'left'), wt('A4', 'So'), wt('A4', 'right')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · equilibrium of a rigid body', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`\\textstyle\\sum \\vec{${F_}} = 0 \\ (\\text{translational}) \\qquad \\textstyle\\sum \\vec{${tau_}} = 0 \\ (\\text{rotational})`), K(`${tc(FC, 'W_1')}\\,${tc(RC, 'd_1')} = ${tc(FC, 'W_2')}\\,${tc(RC, 'd_2')} \\quad \\text{(moments about the pivot)}`),
    '<b>Lever</b>: load × load arm = effort × effort arm', '<b>Couple</b>: total force 0, but torque F d ≠ 0, so it turns'] });
const YQ = ['What two conditions must a rigid body meet to be in equilibrium?', 'Why must the heavy friend sit closer to the pivot?', 'Why is a couple not in equilibrium, though its forces cancel?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 103', topic: 'A strange cut-out: where does it balance? Centre of Gravity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS4 + 0.1, 1.06, 960, 540], [tS6 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const rot = (x, y, b) => { const c = Math.cos(b * D2R), sn = Math.sin(b * D2R), dx = x - P[0], dy2 = y - P[1]; return [P[0] + dx * c + dy2 * sn, P[1] - dx * sn + dy2 * c]; };

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
    MINI.forEach((m, i) => m.set([0, 3 * Math.sin((t - tMorph) * 2) * Math.exp(-(t - tMorph) * 0.6), -8][i] * (i === 2 ? M.io((t - tMorph - 0.8) / 1) : 1)));
    vis($('#hjP'), t, wt('H2', 'balance') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 30 });
    attr(hB, 'transform', `rotate(${(-HB * M.io((t - wt('H4', 'shoots') + 0.2) / 0.6)).toFixed(2)} ${HP[0]} ${HP[1]})`);
    vis($('#hp0'), t, wt('H4', 'shoots') - 0.1, 1e9, POP); vis($('#hkQ'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#ig0'), t, wt('P2', 'total') - 0.15, 1e9, POP); vis($('#ig1'), t, wt('P3', 'total') - 0.15, 1e9, POP); vis($('#igP'), t, T0('P4') + 0.1, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const uf = M.o3((t - wt('P2', 'force') + 0.1) / 0.5); pN.set(PP[0], PP[1] - 7, PP[0], PP[1] - 7 - 140 * uf); pW1.set(PP[0] - PS, PP[1] - 30, PP[0] - PS, PP[1] - 30 + 93 * uf); pW2.set(PP[0] + 2 * PS - 21, PP[1] - 26, PP[0] + 2 * PS - 21, PP[1] - 26 + 47 * uf); pNl.style.opacity = uf; pWl.style.opacity = uf;
    const ut = M.io((t - wt('P3', 'torque') + 0.1) / 0.6); pT1.set(PP[0], PP[1], 50, 110, 60 * ut); pT2.set(PP[0], PP[1], 50, 70, -60 * ut); pTl.style.opacity = ut;
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#exS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const S = simState(t), b = S.b, d = S.d;
    attr(bm, 'transform', `rotate(${(-b).toFixed(2)} ${P[0]} ${P[1]})`); attr(fr, 'transform', `translate(${(P[0] - d * PXM).toFixed(1)},${P[1] - 7})`);
    const gstep = S.replay ? 0.03 : 0.06; ghB.forEach((gb, j) => { const bj = S.replay ? bDyn(2, S.sv - gstep * (j + 1)) : bDyn(d, S.sv - gstep * (j + 1)); attr(gb, 'transform', `rotate(${(-bj).toFixed(2)} ${P[0]} ${P[1]})`); gb.style.opacity = S.moving && !S.frozen && b - bj > 0.3 ? [0.3, 0.2, 0.12][j] : 0; });
    const pu = S.held ? 0 : M.io(S.sv / 0.3); attr(prop, 'x', (P[0] - HALF * PXM - 18 - 70 * pu).toFixed(1)); prop.style.opacity = (1 - pu).toFixed(3);
    vis($('#hld'), t, S.held && t > tS1 + 0.3 ? tS1 + 0.3 : 1e9, S.held ? 1e9 : 0, { ...POP, sc: 0.8, outDur: 0.15 });
    // weights from the blocks, straight down; lever arms horizontal
    const c1 = rot(P[0] - d * PXM, P[1] - 41, b), c2 = rot(P[0] + D2 * PXM - 26, P[1] - 33, b), w1 = rot(P[0] - d * PXM, P[1], b), w2 = rot(P[0] + D2 * PXM - 26, P[1], b);
    const fz = S.replay ? M.io((t - wt('S5', 'weight') + 0.1) / 0.4) * (1 - M.io((t - tRes - 0.5) / 0.3)) : 0, show = Math.max(fz, M.io((t - wt('S2', 'Diya') + 0.1) / 0.4) * (t < tS4 ? 1 : 0), t > tS6 ? 1 : 0);
    const b1 = rot(P[0] - d * PXM, P[1] + 12, b), b2 = rot(P[0] + D2 * PXM - 26, P[1] + 12, b);
    sW1.set(b1[0], b1[1], b1[0], b1[1] + 64 * show); sW2.set(b2[0], b2[1], b2[0], b2[1] + 32 * show);
    attr(sW1l, 'x', (b1[0] + 28).toFixed(1)); attr(sW1l, 'y', (b1[1] + 50).toFixed(1)); sW1l.style.opacity = show; attr(sW2l, 'x', (b2[0] - 10).toFixed(1)); attr(sW2l, 'y', (b2[1] + 30).toFixed(1)); sW2l.style.opacity = show;
    const ua = Math.max(fz, t > tS6 ? 1 : 0), ay = GY + 40;
    attr(sA1, 'x1', w1[0].toFixed(1)); attr(sA1, 'y1', ay); attr(sA1, 'x2', P[0]); attr(sA1, 'y2', ay); sA1.style.opacity = ua; attr(sA2, 'x1', P[0]); attr(sA2, 'y1', ay); attr(sA2, 'x2', w2[0].toFixed(1)); attr(sA2, 'y2', ay); sA2.style.opacity = ua;
    attr(sA1l, 'x', ((w1[0] + P[0]) / 2).toFixed(1)); attr(sA1l, 'y', ay + 26); M.setT(sA1l, 'd₁ = ' + (Math.round(d * 100) / 100).toFixed(2) + ' m'); sA1l.style.opacity = ua; attr(sA2l, 'x', ((w2[0] + P[0]) / 2).toFixed(1)); attr(sA2l, 'y', ay + 26); M.setT(sA2l, 'd₂ = 2.00 m'); sA2l.style.opacity = ua;
    const un = S.replay ? M.io((t - wt('S5', 'torque') + 0.1) / 0.4) * (1 - M.io((t - tRes - 0.5) / 0.3)) : 0;
    sT1.set(P[0], P[1], 70, 120, 90 * un); sT2.set(P[0], P[1], 70, 60, -45 * un); sT1l.style.opacity = un; sT2l.style.opacity = un;
    vis($('#smo'), t, tS4 - 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // readout: round d first
    const dr = Math.round(d * 100) / 100, t1 = GV * M1 * dr, t2 = GV * M2 * D2, net = t1 - t2;
    M.setT($('#r_d1'), dr.toFixed(2)); M.setT($('#r_t1'), Math.round(t1).toString()); M.setT($('#r_t2'), Math.round(t2).toString());
    M.setT($('#net'), Math.abs(net) < 0.5 ? 'NET TORQUE = 0 · BALANCED' : 'NET TORQUE = ' + Math.round(net) + ' N m ↺'); vis($('#net'), t, wt('S3', 'wins') - 0.1, 1e9, POP);
    $('#net').style.background = Math.abs(net) < 0.5 ? C.ok : C.ink;
    M.setT($('#roT'), S.replay ? 'REPLAY' : S.held ? 'HELD LEVEL' : Math.abs(net) < 0.5 ? 'LET GO · STAYS LEVEL' : 'LET GO · TIPS LEFT'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_t1').style.background = mix('#FFFFFF', '#FBEBDD', M.io((t - wt('S7', 'match') + 0.1) / 0.3)); $('#r_t2').style.background = $('#r_t1').style.background;
    // graph: net torque against d1, drawn from 2 m to where the friend is now
    const dMin = Math.min(2, d); gC(x => [x, GV * (M1 * x - M2 * D2)], dMin, 2, 30); gDt(d, GV * (M1 * d - M2 * D2), t > tS3);
    vis(gZ, t, wt('S8', 'zero') - 0.1, 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const uw = M.o3((t - tStep[0] - 0.3) / 0.5), un = M.o3((t - wt('D4', 'pushes') + 0.1) / 0.5), ua = M.io((t - tStep[3] + 0.1) / 0.5);
    dW1.set(DPv[0] - DS, DPv[1] + 8, DPv[0] - DS, DPv[1] + 8 + 80 * uw); dW2.set(DPv[0] + 2 * DS - 4, DPv[1] + 8, DPv[0] + 2 * DS - 4, DPv[1] + 8 + 40 * uw); dW1l.style.opacity = uw; dW2l.style.opacity = uw;
    dN.set(DPv[0], DPv[1] - 8, DPv[0], DPv[1] - 8 - 120 * un); dNl.style.opacity = un;
    M.drawU(dA1, ua); M.drawU(dA2, ua); dA1l.style.opacity = ua; dA2l.style.opacity = ua;
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'zero') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'torque') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R5');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    vis(rD, t, tLk[0] + 0.3, 1e9, { dy: 0 }); vis(rDl, t, tLk[0] + 0.5, 1e9, { dy: 0 }); vis(rF, t, tLk[2] + 0.2, 1e9, { dy: 0 }); vis(rFl, t, tLk[2] + 0.4, 1e9, { dy: 0 }); vis(rEq, t, tLk[3] + 0.2, 1e9, { dy: 6 });
    avD(t, wt('R4', 'Twice') + 0.3, out);
    vis($('#th2'), t, tR5 + 0.05, OUT('K1'), { dy: 36, ...o });
    th2(t, { tin: tR5, tOpts: wt('R5', 'Does') - 0.1, tCount: T1('R5') + 0.05, dur: 3, tAns: T0('R6') - 0.02, tWhy: wt('R6', 'Sixty') });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u1 = M.o3((t - wt('K1', 'pushes') + 0.1) / 0.5); kA.set(KC[0] - KL - 130 * u1 - 4, KC[1], KC[0] - KL - 4, KC[1]); kB.set(KC[0] + KL + 130 * u1 + 4, KC[1], KC[0] + KL + 4, KC[1]);
    attr(kAl, 'x', KC[0] - KL - 80); attr(kAl, 'y', KC[1] - 20); attr(kBl, 'x', KC[0] + KL + 60); attr(kBl, 'y', KC[1] - 20); kAl.style.opacity = u1; kBl.style.opacity = u1;
    vis($('#klP'), t, wt('K1', 'nothing') - 0.1, 1e9, POP);
    const tr = Math.max(0, t - wt('K2', 'turn') + 0.2), a = -(0.5 * 18 * Math.min(tr, 1.5) ** 2 + (tr > 1.5 ? 27 * (tr - 1.5) : 0)), u2 = M.o3((t - T0('K2') - 0.3) / 0.5);
    attr(kRg, 'transform', `rotate(${(-a).toFixed(2)} ${KC[0]} ${KC[1]})`);
    const ea = [KC[0] - KL * Math.cos(a * D2R), KC[1] + KL * Math.sin(a * D2R)], eb = [KC[0] + KL * Math.cos(a * D2R), KC[1] - KL * Math.sin(a * D2R)], n = U(a + 90);
    kC.set(ea[0], ea[1], ea[0] + n[0] * 110 * u2, ea[1] + n[1] * 110 * u2); kD.set(eb[0], eb[1], eb[0] - n[0] * 110 * u2, eb[1] - n[1] * 110 * u2);
    attr(kCl, 'x', (ea[0] + n[0] * 120 - 24).toFixed(1)); attr(kCl, 'y', (ea[1] + n[1] * 120).toFixed(1)); attr(kDl, 'x', (eb[0] - n[0] * 120 + 10).toFixed(1)); attr(kDl, 'y', (eb[1] - n[1] * 120 + 16).toFixed(1)); kCl.style.opacity = u2; kDl.style.opacity = u2;
    const ud = M.io((t - wt('K2', 'couple') + 0.1) / 0.4); attr(kdl, 'x1', ea[0].toFixed(1)); attr(kdl, 'y1', ea[1].toFixed(1)); attr(kdl, 'x2', eb[0].toFixed(1)); attr(kdl, 'y2', eb[1].toFixed(1)); kdl.style.opacity = ud * 0; 
    kTq.set(KC[0], KC[1], 60, 120, -90 * ud); kTql.style.opacity = ud; attr(kdlL, 'x', KC[0] - 10); attr(kdlL, 'y', KC[1] + 48); kdlL.style.opacity = 0;
    vis($('#krP'), t, wt('K2', 'couple') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'two') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const uw = M.o3((t - wt('W2', 'load') + 0.1) / 0.5); wW.set(WXP, WY + 124, WXP, WY + 124 + 60 * uw);
    const uR = M.o3((t - wt('W4', 'fifteen') + 0.1) / 0.5), uL = M.o3((t - wt('W5', 'forty') + 0.1) / 0.5);
    wTR.set(WXR, WY - 10, WXR, WY - 10 - 40 * uR); wTL.set(WXL + 0, WY - 10, WXL, WY - 10 - 120 * uL);
    M.setT(wTRl, 'right T = 15 N'); wTRl.style.opacity = uR; M.setT(wTLl, 'left T = 45 N'); wTLl.style.opacity = uL;
    const ua = M.io((t - wt('W3', 'times') + 0.1) / 0.5); M.drawU(wA1, ua); M.drawU(wA2, ua); wA1l.style.opacity = ua; wA2l.style.opacity = ua; vis(wAx, t, wt('W3', 'left') - 0.1, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'body') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'need') - 0.1 });
    const tr = Math.max(0, t - wt('X3', 'turns') + 0.2), a = -Math.min(60, 0.5 * 40 * tr * tr), uf = M.o3((t - tX1 - 0.5) / 0.5);
    attr(tRg, 'transform', `rotate(${(-a).toFixed(2)} ${TC0[0]} ${TC0[1]})`);
    const ea = [TC0[0] - 140 * Math.cos(a * D2R), TC0[1] + 140 * Math.sin(a * D2R)], eb = [TC0[0] + 140 * Math.cos(a * D2R), TC0[1] - 140 * Math.sin(a * D2R)], n = U(a + 90);
    tA.set(ea[0], ea[1], ea[0] + n[0] * 70 * uf, ea[1] + n[1] * 70 * uf); tB.set(eb[0], eb[1], eb[0] - n[0] * 70 * uf, eb[1] - n[1] * 70 * uf);
    tL1.style.opacity = M.io((t - wt('X3', 'zero') + 0.1) / 0.3); tL2.style.opacity = M.io((t - wt('X3', 'turns') + 0.1) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'planks') });
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
