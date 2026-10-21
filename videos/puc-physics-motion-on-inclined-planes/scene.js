// PUC Physics Ep 66: Motion on inclined planes (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, SC = C.violet, MC = C.ink, GC = C.gold;   // every force orange, a and g red, v blue, s violet, m ink, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const TH = tc(GC, '\\theta'), gg = tc(AC, 'g'), aa = tc(AC, 'a'), mu = tc(MC, '\\mu_k');
const ff = s => tc(FC, s), mgS = ff(`mg\\sin${TH}`), mgC = ff(`mg\\cos${TH}`);
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
const G = 9.8, rad = d => d * Math.PI / 180;
const aSm = th => G * Math.sin(rad(th)), aRo = (th, m = 0.3) => G * (Math.sin(rad(th)) - m * Math.cos(rad(th))), aUp = (th, m = 0.3) => G * (Math.sin(rad(th)) + m * Math.cos(rad(th)));
const ground = (p, x0, x1, y) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(g, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); return g; };
// a slope that falls from top-left to the pivot P (bottom right). d = distance along the surface from the top (px)
const geo = (P, SL, th) => { const c = Math.cos(rad(th)), s = Math.sin(rad(th)), tx = P[0] - SL * c, ty = P[1] - SL * s; return { c, s, tx, ty, at: d => [tx + d * c, ty + d * s], R: (x, y) => [x * c - y * s, x * s + y * c] }; };
// wedge (polygon) + rough hatch marks, redrawn for any angle
const wedge = (p, P, SL) => { const w = mk(p, 'polygon', { fill: '#ECE6D8', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }), h = mk(p, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0 }), arc = mk(p, 'path', { fill: 'none', stroke: GC, 'stroke-width': 3 }), al = it(p, 0, 0, 'θ', GC, { 'font-size': 26 });
  return { w, h, arc, al, set(th, rough = 0, SLo = SL) { const q = geo(P, SLo, th); attr(w, 'points', `${q.tx.toFixed(1)},${q.ty.toFixed(1)} ${P[0]},${P[1]} ${q.tx.toFixed(1)},${P[1]}`);
    let d = ''; for (let k = 30; k < SLo - 20; k += 22) { const [x, y] = q.at(k); d += `M${x.toFixed(1)},${y.toFixed(1)} l${(-8 * q.s + 7 * q.c).toFixed(1)},${(8 * q.c + 7 * q.s).toFixed(1)}`; } attr(h, 'd', d); h.style.opacity = (0.8 * rough).toFixed(3);
    const r = 58; attr(arc, 'd', `M${P[0] - r},${P[1]} A${r},${r} 0 0 1 ${(P[0] - r * q.c).toFixed(1)},${(P[1] - r * q.s).toFixed(1)}`); const hm = rad(th / 2); attr(al, 'x', (P[0] - (r + 30) * Math.cos(hm) - 6).toFixed(1)); attr(al, 'y', (P[1] - (r + 30) * Math.sin(hm) + 12).toFixed(1)); al.style.opacity = th > 4 ? 1 : 0; arc.style.opacity = th > 2 ? 1 : 0; return q; } };
};
// a block that sits on the surface at distance d from the top
const block = (p, BW, BH, label, col = '#C9A27A') => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: 0, y: -BH, width: BW, height: BH, rx: 7, fill: col, stroke: C.ink, 'stroke-width': 2.5 }); const l = txt(g, BW / 2, -BH / 2 + 7, label, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
  return { o, g, l, place(q, d) { const [x, y] = q.at(d); attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(Math.atan2(q.s, q.c) * 180 / Math.PI).toFixed(2)})`); const [cx, cy] = q.R(BW / 2, -BH / 2); return [x + cx, y + cy]; } };
};
// labelled arrow (force orange, or a / v): set(x1, y1, x2, y2, u, lx, ly)
const force = (p, name, col = FC, sub = null, o = {}) => { const a = PUC.arrow(p, col, o.sw ?? 6, o.hd ?? 18), l = it(p, 0, 0, name, col, { 'font-size': o.fs ?? 26 }); const v = sub != null ? txt(p, 0, 0, sub, { fill: col, 'font-weight': 600, 'font-size': o.vs ?? 16 }) : null;
  if (o.dash) a.g.querySelector('path').setAttribute('stroke-dasharray', o.dash);
  return { a, l, v, set(x1, y1, x2, y2, u, lx = 10, ly = 0) { const X = x1 + (x2 - x1) * u, Y = y1 + (y2 - y1) * u; a.set(x1, y1, X, Y); attr(l, 'x', (X + lx).toFixed(1)); attr(l, 'y', (Y + ly).toFixed(1)); const on = u > 0.05 && Math.hypot(X - x1, Y - y1) > 3; l.style.opacity = on ? 1 : 0; if (v) { attr(v, 'x', (X + lx).toFixed(1)); attr(v, 'y', (Y + ly + 20).toFixed(1)); v.style.opacity = on ? 1 : 0; } }, hide() { a.set(0, 0, 0, 0); l.style.opacity = 0; if (v) v.style.opacity = 0; } }; };

Object.assign(M.IC, {
  slide: ['M5 21V6', 'M5 6h4', 'M9 6l11 15', 'M5 11h3', 'M5 16h5'],
  road: ['M2 20h20', 'M2 20 22 9', 'M14 12.6l2.6-1.4'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  pedal: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 12l5-3', 'M12 12v.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS3 = T0('S3'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK4 = T0('K4'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['slide', 'Slide', 'A CHILD · PLAYGROUND', 22], ['home', 'Sloping roof', 'RAIN RUNS OFF', 35], ['road', 'Hill road', 'A TRUCK ROLLS DOWN', 12]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'slide'), wt('H1', 'roof'), wt('H1', 'downhill')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="200" height="100"></svg></div>`).join('');
// mini sketch: slope line, a dot; gravity arrow straight down (orange), motion arrow along the slope (blue)
const JA = JOBS.map(([, , , ang], i) => { const s = $('#jsv' + i), c = Math.cos(rad(ang)), sn = Math.sin(rad(ang)); mk(s, 'line', { x1: 20, y1: 30, x2: 20 + 170 * c, y2: 30 + 170 * sn, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }); const px = 20 + 60 * c, py = 30 + 60 * sn - 9; mk(s, 'circle', { cx: px, cy: py, r: 8, fill: C.ink }); return { g: PUC.arrow(s, FC, 4.5, 12), v: PUC.arrow(s, VC, 4.5, 12), px, py, c, sn }; });
const TILES = [[C.ink, 'No pedalling', 'pedal'], [C.ink, 'Slow speed-up', 'arrowR'], [C.ac, 'What holds it back?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'stops'), wt('H4', 'speeds'), wt('H4', 'holds')];

/* ---------- P: what an inclined plane is ---------- */
const QR = [['θ', GC, 'A flat surface, tilted', 'at an angle θ to the ground'], ['mg', FC, 'Weight', 'from the Earth, straight down'], ['N', FC, 'Normal force', 'from the slope, square to it'], ['f', FC, 'Friction', 'from a rough slope, along it']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 112}px"><div class="qs" style="color:${c};${s === 'mg' ? 'font-size:40px;top:24px' : ''}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'tilted'), wt('P2', 'weight'), wt('P2', 'normal'), wt('P3', 'friction')];
const pm = $('#pmS'), PP = [650, 380], PSL = 470;
ground(pm, 60, 744, PP[1]);
const pW = wedge(pm, PP, PSL), pq = pW.set(30, 1);
const pB = block(pm, 96, 66, '2 kg'); const [pcx, pcy] = pB.place(pq, 150);
const PF = [force(pm, 'mg', FC, 'Earth'), force(pm, 'N', FC, 'slope'), force(pm, 'f', FC, 'slope')];
const pmg = 19.6, PS = 4.4;
const PG = [[pcx, pcy, pcx, pcy + PS * pmg, 12, 6], [pcx, pcy, pcx + PS * pmg * Math.cos(rad(30)) * pq.s, pcy - PS * pmg * Math.cos(rad(30)) * pq.c, 10, -6], [pcx - 48 * pq.c + 33 * pq.s, pcy - 48 * pq.s - 33 * pq.c + 30, pcx - 48 * pq.c + 33 * pq.s - 70 * pq.c, pcy - 48 * pq.s - 33 * pq.c + 30 - 70 * pq.s, -34, -4]];

/* ---------- S: the tilting slope sim ---------- */
const s = $('#simS'), SP = [744, 470], SSL = 600, BW = 100, BH = 70, D0 = 40, PXM = 120, LRUN = 2.6, m = 2, MG = 19.6, FS = 5.2;
const sGr = ground(s, 40, 744, SP[1]);
const sW = wedge(s, SP, SSL);
const ghosts = [0, 1, 2].map(() => { const b = block(s, BW, BH, ''); b.o.style.opacity = 0; return b; });
const blk = block(s, BW, BH, '2 kg');
// a stopper at the end of the run
const stopP = mk(s, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
const fW = force(s, 'mg', FC, 'Earth'), fN = force(s, 'N', FC, 'slope'), fFr = force(s, 'f', FC, 'slope');
const cS = force(s, 'mg sin θ', FC, null, { dash: '7 7', sw: 5, fs: 20 }), cC = force(s, 'mg cos θ', FC, null, { dash: '7 7', sw: 5, fs: 20 });
const aA = force(s, 'a', AC, null, { sw: 6, fs: 28 }), vA = force(s, 'v', VC, null, { sw: 6, fs: 28 });
// tilted axes drawn away from the block (x down the slope, y into it)
const AX0 = [110, 96], axX = PUC.arrow(s, C.ink, 3, 13), axY = PUC.arrow(s, C.ink, 3, 13), axXl = it(s, 0, 0, 'x', C.ink, { 'font-size': 24 }), axYl = it(s, 0, 0, 'y', C.ink, { 'font-size': 24 });
const axDot = mk(s, 'circle', { cx: AX0[0], cy: AX0[1], r: 5, fill: C.ink });
// beats of the sim
const tTilt0 = wt('S1', 'tilted') - 0.1, tRel1 = wt('S2', 'Let') + 0.35;
const tFz = wt('S3', 'Freeze') + 0.15, TAU_FZ = 0.8, tRA = Math.max(0, TAU_FZ - 0.25 * (tFz - tS3)), tRes = wt('S5', 'Nothing') - 0.1;
const tTilt2 = wt('S7', 'Tilt'), tRel2 = wt('S7', 'jumps') - 0.05, tTilt3 = wt('S8', 'Tilt'), tRel3 = wt('S8', 'Only') - 0.25;
const tRough = wt('S10', 'rough'), tTilt4 = T0('S10') + 0.05, tFr = wt('S10', 'Friction'), tRel4 = wt('S11', 'drops') - 0.35;
const thT = M.keys([[0, 0], [tTilt0, 30], [tTilt2, 60], [tTilt3, 10], [tTilt4, 30]], 0.9);
const Tend = a => Math.sqrt(2 * LRUN / a);
const RUNS = [[tRel1, 30, 0], [tRel2, 60, 0], [tRel3, 10, 0], [tRel4, 30, 1]];
const RESETS = [tS3, tTilt2 - 0.3, tTilt3 - 0.3, tTilt4 - 0.3];
function state(t) {
  const th = thT(t), rough = t >= tRough ? 1 : 0;
  const held = (ph) => ({ th, rough, a: 0, v: 0, sx: 0, tau: 0, held: true, ph });
  const run = (r, tau, ph, rep) => { const a = r[2] ? aRo(r[1]) : aSm(r[1]), T = Tend(a), u = Math.min(tau, T); return { th, rough, a: tau >= T ? 0 : a, aRun: a, v: a * u, sx: 0.5 * a * u * u, tau: u, end: tau >= T, ph, rep }; };
  if (t >= tRel4) return run(RUNS[3], t - tRel4, 5);
  if (t >= tTilt4 - 0.3) return held(4.5);
  if (t >= tRel3) return run(RUNS[2], t - tRel3, 4);
  if (t >= tTilt3 - 0.3) return held(3.5);
  if (t >= tRel2) return run(RUNS[1], t - tRel2, 3);
  if (t >= tTilt2 - 0.3) return held(2.5);
  if (t >= tS3) { const tau = t < tFz ? tRA + 0.25 * (t - tS3) : t < tRes ? TAU_FZ : TAU_FZ + 0.25 * (t - tRes); const S = run(RUNS[0], tau, 2, true); S.frozen = t >= tFz && t < tRes; return S; }
  if (t >= tRel1) return run(RUNS[0], t - tRel1, 1);
  return held(0);
}
const tRepEnd = tRes + 4 * (Tend(aSm(30)) - TAU_FZ);
$('#roA').innerHTML = `<span class="k" style="color:${GC}">θ</span><span class="v" id="r_th" style="color:${GC}">0</span><span class="u">°</span>
  <span class="k" style="color:${MC}">μ<sub>k</sub></span><span class="v" id="r_mu">0</span><span class="u"></span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0.00</span><span class="u">m/s²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${SC}">s</span><span class="v" id="r_s" style="color:${SC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${MC}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>`;
const roRows = el => { const kids = [...el.children]; return [0, 1, 2].map(i => kids.slice(i * 3, i * 3 + 3)); };
const RA = roRows($('#roA')), RB = roRows($('#roB'));
// graph: a against theta, smooth and rough curves, dot linked to the sim
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 74, w: 560, h: 144, xmax: 90, ymin: 0, ymax: 10.5, xt: [0, 10, 30, 60, 90], yt: [0, 4.9, 9.8], yl: 'a (m/s²)' });
txt(gs, g.X(90) + 22, 74 + 144 + 32, 'θ (°)', { fill: C.mute });
const cSm = g.curve(AC, 4.5), cRo = g.curve(AC, 4);
const roPath = gs.lastChild; roPath.setAttribute('stroke-dasharray', '9 8'); roPath.setAttribute('opacity', 0.75);
const gTop = mk(gs, 'line', { x1: g.X(0), y1: g.Y(9.8), x2: g.X(90), y2: g.Y(9.8), stroke: AC, 'stroke-width': 2, 'stroke-dasharray': '3 7', opacity: 0.6 });
const gFF = txt(gs, g.X(40), g.Y(9.8) - 10, 'a = g · FREE FALL', { 'text-anchor': 'middle', fill: AC, 'font-weight': 700, 'font-size': 16 });
const GM = RUNS.map(([, th, r]) => mk(gs, 'circle', { cx: g.X(th), cy: g.Y(r ? aRo(th) : aSm(th)), r: 7, fill: '#fff', stroke: AC, 'stroke-width': 3, opacity: 0 }));
const gHollow = mk(gs, 'circle', { r: 10, fill: '#fff', stroke: AC, 'stroke-width': 3.5, cx: -99, cy: -99 });
const gDot = g.dot(AC, 11);
const TH0R = Math.atan(0.3) * 180 / Math.PI;

/* ---------- D: the rule ---------- */
const STEPS = [[`${ff('mg')} \\to ${mgS}\\ (x),\\ \\ ${mgC}\\ (y)`, 'the angle between mg and the y axis is also θ'],
  [`${ff('N')} = ${mgC}`, 'nothing moves across the slope (Ep 60)'],
  [`${mgS} = m${aa} \\;\\Rightarrow\\; ${aa} = ${gg}\\sin${TH}`, 'smooth: one force left along the slope'],
  [`${aa} = ${gg}\\,(\\sin${TH} - ${mu}\\cos${TH})`, 'sliding down: f = μk N points up the slope'],
  [`${aa} = ${gg}\\,(\\sin${TH} + ${mu}\\cos${TH})`, 'sliding up: f points down, the block slows']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), DP = [740, 520], DSL = 680;
ground(dS, 40, 744, DP[1]);
const dWd = wedge(dS, DP, DSL), dq = dWd.set(30, 0);
const dB = block(dS, 130, 90, 'm');
const [dcx, dcy] = dB.place(dq, 250);
const DSC = 6.5;
const dmg = force(dS, 'mg', FC, 'Earth', { fs: 28 }), dN = force(dS, 'N', FC, 'slope', { fs: 28 }), dF = force(dS, 'f', FC, 'slope', { fs: 28 });
const dCs = force(dS, 'mg sin θ', FC, null, { dash: '7 7', sw: 5, fs: 20 }), dCc = force(dS, 'mg cos θ', FC, null, { dash: '7 7', sw: 5, fs: 20 });
const dAx = PUC.arrow(dS, C.ink, 3, 13), dAy = PUC.arrow(dS, C.ink, 3, 13), dAxl = it(dS, 0, 0, 'x', C.ink, { 'font-size': 24 }), dAyl = it(dS, 0, 0, 'y', C.ink, { 'font-size': 24 });
// theta at the block: between mg (down) and the y axis (into the slope)
const dArc = mk(dS, 'path', { d: (() => { const r = 46, a0 = Math.PI / 2, a1 = Math.PI / 2 + rad(30); return `M${(dcx + r * Math.cos(a0)).toFixed(1)},${(dcy + r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(dcx + r * Math.cos(a1)).toFixed(1)},${(dcy + r * Math.sin(a1)).toFixed(1)}`; })(), fill: 'none', stroke: GC, 'stroke-width': 3 });
const dArcL = it(dS, dcx - 34, dcy + 74, 'θ', GC, { 'font-size': 24 });
const dDa = PUC.arrow(dS, AC, 6, 18), dDal = it(dS, 0, 0, 'a', AC, { 'font-size': 28 });

/* ---------- statement ---------- */
$('#st2').innerHTML = `Along a slope, gravity is only <i class="ar">g</i> sin <i class="gd">θ</i>.`;
$('#stF').innerHTML = K(`${aa} = ${gg}\\,(\\sin${TH} \\mp ${mu}\\cos${TH}) \\quad \\text{friction fights the sliding}`);

/* ---------- R: why the mass cancels ---------- */
const LK = [['Double the mass: the pull along the slope doubles', 'x2'], ['Twice the mass needs twice the force', 'x2'], ['The two cancel: a = g sin θ for both', '=']];
$('#lks').innerHTML = LK.map(([l], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 136}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>` + (i < 2 ? `<svg class="lkA" id="lka${i}" style="top:${84 + i * 136 + 100}px" viewBox="0 0 16 22"><path d="M8 0v16M2 11l6 7 6-7" fill="none" stroke="#2F6FEB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
$('#lk0 .lt').innerHTML = `Double the mass: the pull ${K(mgS)} doubles`;
$('#lk1 .lt').innerHTML = `Twice the mass needs twice the force`;
$('#lk2 .lt').innerHTML = `The two cancel: ${K(`${aa} = ${gg}\\sin${TH}`)} for both`;
const tLk = [wt('R2', 'Double'), wt('R3', 'twice'), wt('R4', 'cancel')];
const rS = $('#rrS'), LANES = [[[720, 300], '2 kg', 70, 50], [[720, 540], '4 kg', 96, 64]], RSL = 400, RPXM = 100, RL = 2.5;
const RLn = LANES.map(([P, lab, bw, bh]) => { ground(rS, 40, 744, P[1]); const w = wedge(rS, P, RSL), q = w.set(30, 0); const gh = [0, 1, 2].map(() => { const b = block(rS, bw, bh, ''); b.o.style.opacity = 0; return b; }); const b = block(rS, bw, bh, lab); return { P, q, b, gh, bw, bh }; });
const RCH = [['pull 9.8 N', 'a = 9.8 ÷ 2 = 4.9'], ['pull 19.6 N', 'a = 19.6 ÷ 4 = 4.9']].map(([p0, a0], i) => { const mkc = (x, y, s0, bg) => { const d = document.createElement('div'); d.className = 'chipG'; d.textContent = s0; d.style.left = x + 'px'; d.style.top = y + 'px'; if (bg) d.style.background = bg; $('#rr').appendChild(d); return d; };
  const y0 = LANES[i][0][1]; return [mkc(36, y0 - 168, p0, FC), mkc(36, y0 - 124, a0, AC)]; });
const tRrun = wt('R4', 'slide') - 0.2, tRT = Math.sqrt(2 * RL / aSm(30));
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my heavy bag gets no head start!' });

/* ---------- K: up vs down ---------- */
const KS = [$('#kuS'), $('#kdS')].map((sv, c) => { const P = [700, 440], SL = 540; ground(sv, 40, 744, P[1]); const w = wedge(sv, P, SL), q = w.set(30, 1); const gh = [0, 1, 2].map(() => { const b = block(sv, 84, 60, ''); b.o.style.opacity = 0; return b; }); const b = block(sv, 84, 60, '2 kg');
  return { sv, P, SL, q, b, gh, cs: force(sv, 'mg sin θ', FC, null, { dash: '7 7', sw: 5, fs: 20 }), f: force(sv, 'f', FC, 'slope'), va: force(sv, 'v', VC), aa: force(sv, 'a', AC) }; });
const KD = 2.4, KPX = 125, aU = aUp(30), aD = aRo(30), v0U = Math.sqrt(2 * aU * KD), TU = v0U / aU, TD = Math.sqrt(2 * KD / aD);
const tKu = wt('K1', 'pushed'), tKd = wt('K3', 'slides') - 0.1;
$('#kuP').innerHTML = K(`${aa} = ${gg}(\\sin${TH} + ${mu}\\cos${TH}) = ${tc(AC, '7.45\\ \\text{m/s}^2')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">slowing</span>';
$('#kdP').innerHTML = K(`${aa} = ${gg}(\\sin${TH} - ${mu}\\cos${TH}) = ${tc(AC, '2.35\\ \\text{m/s}^2')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">speeding up</span>';
const th1 = PUC.think($('#th1'), { q: 'It goes up, stops, then slides back the same distance. Which trip takes longer?', opts: ['The trip up', 'The trip down'], right: 1, why: 'Same distance, smaller a coming down: 2.35 vs 7.45 m/s².' });

/* ---------- V: same height race ---------- */
const vS = $('#vrS'), VY = 470, VPX = 100, VH = 2.5, APX = 0.6, VAX = 230, vApex = [VAX, VY - VPX * (VH + APX)], VSY = VY - VPX * VH;
ground(vS, 40, 744, VY);
const V60 = { th: 60, dir: -1 }, V30 = { th: 30, dir: 1 };
[V60, V30].forEach(L => { L.c = Math.cos(rad(L.th)); L.s = Math.sin(rad(L.th)); L.tn = Math.tan(rad(L.th)); L.len = VH / L.s; L.x0 = VAX + L.dir * VPX * APX / L.tn; L.foot = VAX + L.dir * VPX * (VH + APX) / L.tn; L.a = aSm(L.th); L.T = Math.sqrt(2 * L.len / L.a); });
mk(vS, 'polygon', { points: `${vApex[0]},${vApex[1]} ${V30.foot.toFixed(1)},${VY} ${V60.foot.toFixed(1)},${VY}`, fill: '#ECE6D8', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const vH = mk(vS, 'line', { x1: 40, y1: VSY, x2: 744, y2: VSY, stroke: SC, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const vHl = txt(vS, 744, VSY - 12, 'start height h = 2.5 m', { 'text-anchor': 'end', fill: SC, 'font-weight': 700, 'font-size': 18 });
const vLab = [it(vS, V60.foot + 44, VY - 16, '60°', GC, { 'font-size': 24 }), it(vS, V30.foot - 96, VY - 16, '30°', GC, { 'font-size': 24 })];
// block reference point = its downhill bottom corner; the block body extends uphill along the face
[V60, V30].forEach(L => { const body = g0 => { const g1 = mk(g0, 'g', {}); mk(g1, 'rect', { x: L.dir > 0 ? -56 : 0, y: -40, width: 56, height: 40, rx: 6, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); return g1; };
  L.gh = [0, 1, 2].map(() => { const g0 = mk(vS, 'g', {}); const g1 = body(g0); g0.style.opacity = 0; return { g0, g1 }; });
  L.o = mk(vS, 'g', {}); L.g = body(L.o);
  L.place = (gEl, sx) => { const x = L.x0 + L.dir * sx * L.c * VPX, y = VSY + sx * L.s * VPX; attr(gEl, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(L.dir * L.th).toFixed(2)})`); }; });
const tRace = wt('V2', 'Race') + 0.35;
$('#rcs').innerHTML = [['30°', 'v30'], ['60°', 'v60']].map(([l, id], i) => `<div class="rc" id="rc${i}" style="top:${84 + i * 104}px"><div class="rh"><span style="color:${GC}">${l}</span> · ${i ? 'STEEP' : 'GENTLE'}</div><div class="rv"><span id="${id}t">0.00</span> <span style="font-size:20px;color:var(--mute)">s</span> &nbsp;&nbsp; <span style="color:${VC}">v</span> = <span id="${id}v" style="color:${VC}">?</span> <span style="font-size:20px;color:var(--mute)">m/s</span></div></div>`).join('') + `<div class="pillp" id="rcW" style="left:36px;top:300px">The steep one arrives first</div>`;
$('#vF').innerHTML = K(`${tc(VC, 'v')}^2 = 2${aa}${tc(SC, 'L')} = 2${gg}${tc(SC, 'h')}`); $('#vF2').innerHTML = K(`${tc(VC, 'v')} = \\sqrt{2 \\times 9.8 \\times 2.5} = ${tc(VC, '7\\ \\text{m/s}')}`);
const th2 = PUC.think($('#th2'), { q: 'Same height, both smooth. Which block is moving faster at the bottom?', opts: ['The steep one', 'Same speed'], right: 1, why: 'v² = 2aL = 2gh: on a smooth slope only the height counts.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ramp ${K(tc(SC, '5\\ \\text{m}'))} long rises ${K('3\\ \\text{m}')}. A box slides down from rest, ${K(`${mu} = 0.25`)}. Find its speed and time at the bottom. Take ${K('g = 9.8\\ \\text{m/s}^2')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\sin${TH} = \\tfrac{3}{5} = 0.6,\\ \\ \\cos${TH} = \\tfrac{4}{5} = 0.8`)],
  [K(`${aa} = 9.8\\,(0.6 - 0.25 \\times 0.8) = ${tc(AC, '3.92\\ \\text{m/s}^2')}`)],
  [K(`${tc(VC, 'v')}^2 = 2${aa}${tc(SC, 'L')} = 2 \\times 3.92 \\times 5 \\Rightarrow ${tc(VC, 'v \\approx 6.26\\ \\text{m/s}')}`)],
  [K(`t = \\dfrac{${tc(VC, 'v')}}{${aa}} = \\dfrac{6.26}{3.92} \\approx 1.60\\ \\text{s}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 86 });
$('#wl .lbl').style.top = '30px';
const wS = $('#wrS'), WP = [640, 440], WPX = 100, WSL = 500;
ground(wS, 40, 744, WP[1]);
const wWd = wedge(wS, WP, WSL), wq = wWd.set(Math.asin(0.6) * 180 / Math.PI, 0);
const wHatch = wWd.h; wHatch.style.opacity = 0.8; { let d = ''; for (let k = 30; k < WSL - 20; k += 22) { const [x, y] = wq.at(k); d += `M${x.toFixed(1)},${y.toFixed(1)} l${(-8 * wq.s + 7 * wq.c).toFixed(1)},${(8 * wq.c + 7 * wq.s).toFixed(1)}`; } attr(wHatch, 'd', d); }
txt(wS, wq.tx - 14, (wq.ty + WP[1]) / 2 + 6, '3 m', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
txt(wS, (wq.tx + WP[0]) / 2, WP[1] + 44, '4 m', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const wL = txt(wS, (wq.tx + WP[0]) / 2 + 0.6 * 70, (wq.ty + WP[1]) / 2 - 0.8 * 70, 'L = 5 m', { 'text-anchor': 'middle', fill: SC, 'font-weight': 700, 'font-size': 22 });
const wGh = [0, 1, 2].map(() => { const b = block(wS, 70, 50, ''); b.o.style.opacity = 0; return b; }), wB = block(wS, 70, 50, 'box');
const wA = 3.92, wT = Math.sqrt(2 * 5 / wA), tWrun = wt('W5', 'squared');
const wRo = document.createElement('div'); wRo.className = 'ro2'; wRo.style.cssText = 'left:36px;top:506px;grid-template-columns:auto auto auto auto auto auto auto auto auto;column-gap:10px';
wRo.innerHTML = `<span class="k" style="color:${AC}">a</span><span class="v" style="color:${AC}">3.92</span><span class="u">m/s² &nbsp;</span><span class="k" style="color:${VC}">v</span><span class="v" id="w_v" style="color:${VC}">0.00</span><span class="u">m/s &nbsp;</span><span class="k">t</span><span class="v" id="w_t">0.00</span><span class="u">s</span>`;
$('#wr').appendChild(wRo);
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Sliding up: a = g (sin θ - μk cos θ)', right: 'Sliding up: friction points down, a = g (sin θ + μk cos θ)' });
const tp = $('#tpS'), TP = [520, 236], TSL = 440, tq = geo(TP, TSL, 24);
mk(tp, 'polygon', { points: `${tq.tx.toFixed(1)},${tq.ty.toFixed(1)} ${TP[0]},${TP[1]} ${tq.tx.toFixed(1)},${TP[1]}`, fill: '#ECE6D8', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const tB = block(tp, 70, 50, ''); const [tbx, tby] = tB.place(tq, 190);
const tV = force(tp, 'v', VC), tFw = force(tp, 'f', C.red, 'NOT up'), tFrc = force(tp, 'f', FC, 'slope');
const tX = mk(tp, 'path', { d: '', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
const where = PUC.where($('#wa'), { on: [], type: 'Block on a slope numericals: find a, the time, the speed or μk' });
const th37 = tc(GC, '37^\\circ');
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 400,
  q: `A block slides from rest down a smooth ${K(th37)} incline and reaches ${K(tc(VC, '6\\ \\text{m/s}'))} at the bottom. The incline is made rough, ${K(`${mu} = 0.5`)}. Its speed at the bottom now? <span style="font:500 24px Poppins;color:var(--mute);white-space:nowrap">(${K(`\\sin ${th37} = 0.6,\\ \\cos ${th37} = 0.8`)})</span>`,
  opts: [K('2\\ \\text{m/s}'), K('2\\sqrt{3}\\ \\text{m/s}'), K('4\\ \\text{m/s}'), K('3\\sqrt{2}\\ \\text{m/s}')], right: 1 });
const so = PUC.solution($('#so'), [[K(`\\text{smooth: } ${aa}_1 = 0.6\\,${gg}`)], [K(`\\text{rough: } ${aa}_2 = (0.6 - 0.4)\\,${gg} = 0.2\\,${gg}`)], [K(`${tc(VC, 'v')}^2 = 2${aa}${tc(SC, 'L')},\\ \\text{same } ${tc(SC, 'L')}`)], [K(`${tc(VC, 'v')}_2^2 = \\tfrac{1}{3} \\times 36 = 12`)], [K(`${tc(VC, 'v')}_2 = ${tc(C.ok, '2\\sqrt{3} \\approx 3.46\\ \\text{m/s}')}`)]], { y0: 100, dy: 100 });
const tSo = [T0('A2'), wt('A2', 'Rough'), T0('A3'), wt('A3', 'third'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · inclined planes', y0: 96, dy: 86, txt: [0, 0, 0, 0],
  lines: [K(`${ff('mg')} \\to ${mgS} \\text{ along},\\ \\ ${mgC} \\text{ into};\\ \\ ${ff('N')} = ${mgC}`),
    K(`\\text{smooth: } ${aa} = ${gg}\\sin${TH} \\quad (\\text{mass cancels})`),
    K(`\\text{down: } ${aa} = ${gg}(\\sin${TH} - ${mu}\\cos${TH}) \\quad \\text{up: } ${gg}(\\sin${TH} + ${mu}\\cos${TH})`),
    K(`\\text{from rest, length } ${tc(SC, 'L')}:\\ \\ ${tc(VC, 'v')}^2 = 2${aa}${tc(SC, 'L')},\\ \\ t = \\sqrt{2${tc(SC, 'L')}/${aa}}`)] });
const YQ = ['Why does a heavy block not slide down a smooth slope any faster?', 'Why does friction add to the slowing when a block slides up?', 'On a smooth 30° slope, what is a, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 67', topic: 'A falling bag drags a trolley. How fast? Connected Bodies and Pulleys', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFz - 0.3, 1.06, 960, 540], [tRes + 0.6, 1, 960, 540]]);
let geoOk = null;
function measure() { geoOk = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const keyHTML = (el, k, h) => { if (el._k !== k) { el._k = k; el.innerHTML = h; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geoOk) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const q = JA[i], ug = M.o3((t - tMorph - 0.7 - i * 0.25) / 0.4), uv = M.o3((t - wt('H2', 'Yet') - i * 0.15) / 0.4);
      q.g.set(q.px, q.py, q.px, q.py + 44 * ug); q.v.set(q.px + 14 * q.c, q.py + 14 * q.sn - 14, q.px + (14 + 70 * uv) * q.c, q.py + (14 + 70 * uv) * q.sn - 14); });
    vis($('#hjP'), t, wt('H2', 'slope') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - T0('H5')) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.15, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tQr[i]) / 0.3) * (i < 3 ? 1 - M.io((t - tQr[i + 1]) / 0.3) : 1)); });
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(pW.arc, t, wt('P1', 'angle') - 0.1, 0.5); vis(pW.al, t, wt('P1', 'angle'), 1e9, { dy: 0 });
    vis(pB.o, t, wt('P2', 'block') - 0.1, 1e9, { dy: -16 });
    PF.forEach((q, i) => q.set(...PG[i].slice(0, 4), M.o3((t - tQr[i + 1] + 0.05) / 0.5), PG[i][4], PG[i][5]));
    pW.h.style.opacity = (0.8 * M.io((t - tQr[3] + 0.2) / 0.4)).toFixed(3);
    vis($('#gal'), t, wt('P3', 'friction') + 0.3, 1e9, { dy: 20 });
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), kz = Math.min(1, 410 / (SSL * Math.sin(rad(Math.max(S.th, 1))))), PXe = PXM * kz, q = sW.set(S.th, S.rough, SSL * kz);
    { const [x, y] = q.at(D0 + PXe * LRUN + BW + 4); attr(stopP, 'd', `M${x.toFixed(1)},${y.toFixed(1)} l${(q.s * 20).toFixed(1)},${(-q.c * 20).toFixed(1)}`); }
    // block (fades out and back in when it is reset to the top)
    let dip = 1; RESETS.forEach(r => { const u = Math.abs(t - r); if (u < 0.25) dip = Math.min(dip, u / 0.25); });
    const d = D0 + PXe * S.sx, [cx, cy] = blk.place(q, d);
    vis(blk.o, t, tS1 + 0.4, 1e9, { dy: -20 }); blk.g.style.opacity = dip.toFixed(3);
    ghosts.forEach((gh, k) => { const Q = state(t - (S.rep ? 0.25 : 1) * 0.07 * (k + 1)); const same = Q.ph === S.ph && !S.frozen && !S.held && !S.end && S.v > 0.3; gh.place(q, D0 + PXe * (same ? Q.sx : S.sx)); gh.o.style.opacity = same ? [0.3, 0.2, 0.12][k] : 0; });
    // forces
    const uW = M.o3((t - wt('S2', 'weight') + 0.1) / 0.5); fW.set(cx, cy, cx, cy + FS * MG, uW, 12, 6);
    const uC = M.o3((t - wt('S4', 'cos') + 0.1) / 0.5), uN = M.o3((t - wt('S4', 'pushes') + 0.1) / 0.5), uSn = M.o3((t - wt('S5', 'sine') + 0.1) / 0.5);
    const Lc = FS * MG * q.c, Ls = FS * MG * q.s;
    cC.set(cx, cy, cx - q.s * Lc, cy + q.c * Lc, uC, -128, 18); fN.set(cx, cy, cx + q.s * Lc, cy - q.c * Lc, uN, 10, -4);
    cS.set(cx, cy, cx + q.c * Ls, cy + q.s * Ls, uSn, 22, 48);
    const uF = M.o3((t - tFr + 0.1) / 0.5) * (S.rough ? 1 : 0), Lf = FS * 0.3 * MG * q.c;
    const fx0 = cx - q.c * 42 + q.s * 26, fy0 = cy - q.s * 42 - q.c * 26;
    fFr.set(fx0, fy0, fx0 - q.c * Lf, fy0 - q.s * Lf, uF, -28, -8);
    // a and v above the block, along the slope
    // a and v grow from the block, parallel to the slope, above it (bases kept inside the card)
    const base = off => { let bx = cx + q.s * off, by = cy - q.c * off; if (by < 100) { bx += (100 - by) * q.c / Math.max(q.s, 0.2) * 0; by = 100; } return [bx, by]; };
    const uA = M.o3((t - tRel1 + 0.05) / 0.4) * (S.held || S.end ? 0 : 1), aLen = 12 * (S.aRun || 0) * uA, vLen = 12 * S.v * (S.held ? 0 : 1);
    const [ax0, ay0] = base(128 * kz), [vx0, vy0] = base(168 * kz);
    if (aLen > 4) aA.set(ax0, ay0, ax0 + q.c * aLen, ay0 + q.s * aLen, 1, 6, -6); else aA.hide();
    if (vLen > 4) vA.set(vx0, vy0, vx0 + q.c * vLen, vy0 + q.s * vLen, 1, 6, -6); else vA.hide();
    // tilted axes
    const uAx = M.o3((t - wt('S3', 'tilt') + 0.1) / 0.6) * (1 - M.io((t - tTilt2 + 0.6) / 0.4));
    axX.set(AX0[0], AX0[1], AX0[0] + q.c * 100 * uAx, AX0[1] + q.s * 100 * uAx); axY.set(AX0[0], AX0[1], AX0[0] - q.s * 86 * uAx, AX0[1] + q.c * 86 * uAx);
    attr(axXl, 'x', (AX0[0] + q.c * 100 * uAx + 8).toFixed(1)); attr(axXl, 'y', (AX0[1] + q.s * 100 * uAx + 22).toFixed(1)); attr(axYl, 'x', (AX0[0] - q.s * 86 * uAx - 26).toFixed(1)); attr(axYl, 'y', (AX0[1] + q.c * 86 * uAx + 8).toFixed(1));
    axXl.style.opacity = axYl.style.opacity = uAx.toFixed(3); axDot.style.opacity = uAx.toFixed(3);
    // tags
    const repOn = t >= tS3 && t < tRepEnd + 0.4;
    vis($('#sw2'), t, T0('S10') - 0.2, 1e9, { dy: 10 });
    $('#sw2').querySelectorAll('span').forEach((sp, i) => { const on = i ? M.io((t - tRough) / 0.3) : 1 - M.io((t - tRough) / 0.3); sp.style.background = mix('#FFFFFF', C.ac, on); sp.style.color = mix(C.mute, '#FFFFFF', on); sp.style.borderColor = mix(C.line, C.ac, on); });
    vis($('#smo'), t, tS3 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRepEnd + 0.4, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // equation strip
    { const e = $('#simEq'), on = t >= T0('S6') - 0.1, th = Math.round(S.th), a = S.rough ? aRo(th) : aSm(th), k = on ? `${th}|${S.rough}` : '';
      keyHTML(e, k, !on ? '' : S.rough ? `<span class="ar">a</span> = 9.8 (sin <span class="gd">${th}°</span> - 0.3 cos <span class="gd">${th}°</span>) = <span class="ar">${f2(a)}</span>` : `<span class="ar">a</span> = 9.8 × sin <span class="gd">${th}°</span> = <span class="ar">${f2(a)}</span> <span style="font-size:18px;color:var(--mute)">m/s²</span>`);
      vis(e, t, T0('S6') - 0.1, 1e9, POP); e.style.top = '500px'; }
    // readout: round the time first, then compute v and s from it
    const tr = Math.round(S.tau * 100) / 100, aR = S.held ? 0 : S.aRun, vR = S.held ? 0 : aR * tr, sR = S.held ? 0 : Math.min(LRUN, 0.5 * aR * tr * tr);
    M.setT($('#r_th'), String(Math.round(S.th))); M.setT($('#r_mu'), S.rough ? '0.3' : '0'); M.setT($('#r_a'), f2(S.held || S.end ? 0 : aR)); M.setT($('#r_v'), f2(S.end ? aR * Math.round(Tend(aR) * 100) / 100 : vR)); M.setT($('#r_s'), f2(S.end ? LRUN : sR)); M.setT($('#r_t'), f2(S.end ? Math.round(Tend(aR) * 100) / 100 : tr));
    [[RA[0], tS1 + 0.5], [RA[1], tS1 + 0.6], [RA[2], tRel1 - 0.1], [RB[0], tRel1 - 0.1], [RB[1], tRel1 - 0.1], [RB[2], tRel1 - 0.1]].forEach(([row, tt]) => row.forEach(e => vis(e, t, tt, 1e9, { dy: 8 })));
    // graph: hollow dot = the a it would have if let go; filled dot while it slides
    const aCur = S.rough ? aRo(S.th) : aSm(S.th), showH = S.held && t > tRel1 && (!S.rough || S.th > TH0R);
    attr(gHollow, 'cx', g.X(S.th).toFixed(1)); attr(gHollow, 'cy', g.Y(Math.max(0, aCur)).toFixed(1)); M.hide(gHollow, !showH);
    gDot(S.th, S.aRun || 0, !S.held && t >= tRel1);
    GM.forEach((c, k) => { c.style.opacity = t > RUNS[k][0] + 0.2 ? 1 : 0; });
    const uSm = M.io((t - wt('S9', 'sine') + 0.2) / 1.2), uRo = M.io((t - wt('S11', 'rough') + 0.1) / 1.0);
    cSm(th => [th, aSm(th)], 0, 90 * uSm, 80); cRo(th => [th, aRo(th)], TH0R, TH0R + (90 - TH0R) * uRo, 70);
    vis(gTop, t, wt('S9', 'ninety'), 1e9, { dy: 0 }); vis(gFF, t, wt('S9', 'Free') - 0.1, 1e9, { dy: 0 });
    vis($('#gleg'), t, wt('S9', 'sine'), 1e9, { dy: 6 }); M.hide($('#glR'), t < wt('S11', 'rough') - 0.1);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    vis(dB.o, t, tD1 + 0.6, 1e9, { dy: -16 });
    const q = dq, Lc = DSC * 19.6 * q.c, Ls = DSC * 19.6 * q.s, uAx = M.o3((t - wt('D2', 'axes') + 0.1) / 0.5);
    dAx.set(dcx, dcy, dcx + q.c * 230 * uAx, dcy + q.s * 230 * uAx); dAy.set(dcx, dcy, dcx - q.s * 190 * uAx, dcy + q.c * 190 * uAx);
    attr(dAxl, 'x', (dcx + q.c * 230 * uAx + 6).toFixed(1)); attr(dAxl, 'y', (dcy + q.s * 230 * uAx + 26).toFixed(1)); attr(dAyl, 'x', (dcx - q.s * 190 * uAx - 26).toFixed(1)); attr(dAyl, 'y', (dcy + q.c * 190 * uAx + 6).toFixed(1));
    dAxl.style.opacity = dAyl.style.opacity = uAx.toFixed(3); dAx.g.style.opacity = dAy.g.style.opacity = '0.45';
    dmg.set(dcx, dcy, dcx, dcy + DSC * 19.6, M.o3((t - tD1 - 0.9) / 0.5), 12, 4);
    dCs.set(dcx, dcy, dcx + q.c * Ls, dcy + q.s * Ls, M.o3((t - wt('D2', 'sine') + 0.1) / 0.5), 6, 26);
    dCc.set(dcx, dcy, dcx - q.s * Lc, dcy + q.c * Lc, M.o3((t - wt('D2', 'cos') + 0.1) / 0.5), -130, 16);
    vis(dArc, t, wt('D2', 'splits'), 1e9, { dy: 0 }); vis(dArcL, t, wt('D2', 'splits'), 1e9, { dy: 0 });
    dN.set(dcx, dcy, dcx + q.s * Lc, dcy - q.c * Lc, M.o3((t - wt('D3', 'N') + 0.1) / 0.5), 10, -4);
    const uFd = M.o3((t - wt('D5', 'Friction') + 0.1) / 0.5) * (1 - M.io((t - wt('D6', 'friction') + 0.1) / 0.3)), uFu = M.o3((t - wt('D6', 'friction') + 0.1) / 0.5);
    const fx0 = dcx - q.c * 60 + q.s * 36, fy0 = dcy - q.s * 60 - q.c * 36, Lf = 70;
    if (uFu > 0.01) dF.set(fx0 + q.c * 120, fy0 + q.s * 120, fx0 + q.c * (120 + Lf), fy0 + q.s * (120 + Lf), uFu, 4, 26); else dF.set(fx0, fy0, fx0 - q.c * Lf, fy0 - q.s * Lf, uFd, -34, -30);
    const ua = M.o3((t - wt('D4', 'equals', 1) + 0.1) / 0.5), aL = 70 * ua, ax0 = dcx + q.s * 160 + q.c * 30, ay0 = dcy - q.c * 160 + q.s * 30;
    dDa.set(ax0, ay0, ax0 + q.c * aL, ay0 + q.s * aL); attr(dDal, 'x', (ax0 + q.c * aL + 6).toFixed(1)); attr(dDal, 'y', (ay0 + q.s * aL - 6).toFixed(1)); dDal.style.opacity = ua.toFixed(3);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Along') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'friction') - 0.1, 0.8);
  }

  /* R: why mass cancels */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, i === 2 ? C.okBg : C.ac2, M.io((t - tLk[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tLk[i + 1]) / 0.3) : 1)); if (i < 2) vis($('#lka' + i), t, tLk[i + 1] - 0.3, 1e9, { dy: -6 }); });
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const tau = M.clamp(t - tRrun, 0, tRT), sx = 0.5 * aSm(30) * tau * tau;
    RLn.forEach((L, i) => { vis(L.b.o, t, tR1 + 0.8 + i * 0.15, 1e9, { dy: -12 }); L.b.place(L.q, 30 + RPXM * sx);
      L.gh.forEach((gh, k) => { const tk = M.clamp(t - tRrun - 0.07 * (k + 1), 0, tRT), on = tau > 0.05 && tau < tRT; gh.place(L.q, 30 + RPXM * 0.5 * aSm(30) * tk * tk); gh.o.style.opacity = on ? [0.3, 0.2, 0.12][k] : 0; }); });
    RCH.forEach(([c0, c1]) => { vis(c0, t, wt('R2', 'pull') - 0.1, 1e9, POP); vis(c1, t, wt('R3', 'force') - 0.1, 1e9, POP); });
    avA(t, wt('R4', 'together') + 0.3, out);
  }

  /* K: up vs down */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    vis($('#ku'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    vis($('#kd'), t, T0('K3') - 0.3, out, { dx: 60, dy: 0, ...o });
    KS.forEach((k, i) => {
      const up = i === 0, t0 = up ? tKu : tKd, T = up ? TU : TD, a = up ? aU : aD;
      const sAt = tt => { const tau = M.clamp(tt - t0, 0, T); return up ? v0U * tau - 0.5 * a * tau * tau : 0.5 * a * tau * tau; };
      const vAt = tt => { const tau = M.clamp(tt - t0, 0, T); return up ? v0U - a * tau : a * tau; };
      const d = up ? k.SL - 10 - 84 - KPX * sAt(t) : 40 + KPX * sAt(t);
      vis(k.b.o, t, (up ? tK1 : T0('K3')) + 0.3, 1e9, { dy: -12 });
      const [cx, cy] = k.b.place(k.q, d), q = k.q, moving = t > t0 && t < t0 + T;
      k.gh.forEach((gh, j) => { const dj = up ? k.SL - 10 - 84 - KPX * sAt(t - 0.07 * (j + 1)) : 40 + KPX * sAt(t - 0.07 * (j + 1)); gh.place(q, dj); gh.o.style.opacity = moving ? [0.3, 0.2, 0.12][j] : 0; });
      const tG = up ? wt('K2', 'Gravity') : T0('K3'), tFk = up ? wt('K2', 'friction') : wt('K3', 'Friction');
      const Ls = 0.5 * 19.6 * 7, Lf = 0.3 * 19.6 * 0.866 * 7;
      k.cs.set(cx, cy, cx + q.c * Ls, cy + q.s * Ls, M.o3((t - tG + 0.1) / 0.5), 6, 26);
      const sg = up ? 1 : -1, fx0 = cx - 30 * q.s + sg * 42 * q.c, fy0 = cy + 30 * q.c + sg * 42 * q.s;
      k.f.set(fx0, fy0, fx0 + sg * q.c * Lf, fy0 + sg * q.s * Lf, M.o3((t - tFk + 0.1) / 0.5), up ? -6 : -30, 30);
      const v = vAt(t), nx = q.s * 72, ny = -q.c * 72, vl = 16 * v * (t > t0 ? 1 : 0);
      if (vl > 4) k.va.set(cx + nx * 1.6, cy + ny * 1.6, cx + nx * 1.6 - sg * q.c * vl, cy + ny * 1.6 - sg * q.s * vl, 1, 4, -6); else k.va.hide();
      const ua = M.o3((t - t0 + 0.05) / 0.4); k.aa.set(cx + nx, cy + ny, cx + nx + q.c * 9 * a, cy + ny + q.s * 9 * a, ua, 4, -6);
    });
    vis($('#kuP'), t, wt('K2', 'slows') - 0.1, 1e9, POP); vis($('#kdP'), t, wt('K3', 'speeds') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK4 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'Which') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Same') });
  }

  /* V: same height race */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1'), in2 = wt('V4', 'gentle') - 0.2, back = t > in2 - 0.3;
    vis($('#vr'), t, back ? in2 : tV1 + 0.1, back ? out : OUT('V3'), { dx: -60, dy: 0, ...o });
    vis($('#vt'), t, back ? in2 + 0.15 : tV1 + 0.3, back ? out : OUT('V3'), { dx: 60, dy: 0, ...o });
    M.draw(vH, t, wt('V1', 'high') - 0.2, 0.6); vis(vHl, t, wt('V1', 'high'), 1e9, { dy: 0 });
    vis(vLab[1], t, wt('V1', 'thirty') - 0.1, 1e9, { dy: 0 }); vis(vLab[0], t, wt('V1', 'sixty') - 0.1, 1e9, { dy: 0 });
    [V30, V60].forEach((L, i) => {
      const tau = M.clamp(t - tRace, 0, L.T), sx = 0.5 * L.a * tau * tau;
      vis(L.o, t, tV1 + 0.6, 1e9, { dy: -12 }); L.place(L.g, sx);
      L.gh.forEach((gh, k) => { const tk = M.clamp(t - tRace - 0.07 * (k + 1), 0, L.T); L.place(gh.g1, 0.5 * L.a * tk * tk); gh.g0.style.opacity = tau > 0.04 && tau < L.T ? [0.3, 0.2, 0.12][k] : 0; });
      const tr = Math.round(tau * 100) / 100, done = tau >= L.T;
      M.setT($(`#v${L.th}t`), f2(done ? Math.round(L.T * 100) / 100 : tr));
      M.setT($(`#v${L.th}v`), t >= wt('V4', 'Seven') - 0.05 ? '7.00' : '?');
      const row = $('#rc' + (L.th === 30 ? 0 : 1)); vis(row, t, tV1 + 0.6 + i * 0.12, 1e9, { dy: 14 });
      row.style.background = mix(C.soft, C.ac2, M.io((t - tRace - L.T) / 0.3));
    });
    vis($('#rcW'), t, wt('V2', 'wins') - 0.1, 1e9, POP);
    PUC.write($('#vF'), t, wt('V4', 'times') - 0.3, 0.8); PUC.write($('#vF2'), t, wt('V4', 'always') + 0.2, 0.8);
    vis($('#th2'), t, tV3 + 0.05, in2 - 0.3, { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'Which') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Seven') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(wL, t, wt('W2', 'long') - 0.1, 1e9, { dy: 0 });
    const tau = M.clamp(t - tWrun, 0, wT), sx = 0.5 * wA * tau * tau;
    vis(wB.o, t, T0('W2') + 0.5, 1e9, { dy: -12 }); wB.place(wq, 14 + WPX * sx * (WSL - 14 - 70 - 6) / (WPX * 5));
    wGh.forEach((gh, k) => { const tk = M.clamp(t - tWrun - 0.07 * (k + 1), 0, wT); gh.place(wq, 14 + WPX * 0.5 * wA * tk * tk * (WSL - 90) / (WPX * 5)); gh.o.style.opacity = tau > 0.05 && tau < wT ? [0.3, 0.2, 0.12][k] : 0; });
    const tr = Math.round(tau * 100) / 100, done = tau >= wT;
    M.setT($('#w_t'), f2(done ? 1.60 : tr)); M.setT($('#w_v'), f2(done ? 6.26 : wA * tr));
    vis(wRo, t, tWrun - 0.3, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'minus') - 0.2, tStrike: wt('X3', 'opposes') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    vis(tB.o, t, tX1 + 0.4, 1e9, { dy: -10 });
    const q = tq, uv = M.o3((t - wt('X2', 'sliding') + 0.1) / 0.4), nx = q.s * 52, ny = -q.c * 52;
    tV.set(tbx + nx, tby + ny, tbx + nx - q.c * 90, tby + ny - q.s * 90, uv, -10, -10);
    const fx0 = tbx - q.c * 36 + q.s * 20, fy0 = tby - q.s * 36 - q.c * 20;
    const uw = M.o3((t - wt('X2', 'sliding') - 0.3) / 0.4) * (1 - M.io((t - wt('X3', 'down') + 0.1) / 0.3)); tFw.set(fx0, fy0, fx0 - q.c * 70, fy0 - q.s * 70, uw, -20, -10);
    attr(tX, 'd', `M${(fx0 - q.c * 40 - 12).toFixed(1)},${(fy0 - q.s * 40 - 12).toFixed(1)} l24,24 m0,-24 l-24,24`); vis(tX, t, wt('X3', 'opposes'), wt('X3', 'down') - 0.1, { dy: 0 });
    const fr0 = tbx + q.c * 36 + q.s * 20, fr1 = tby + q.s * 36 - q.c * 20; tFrc.set(fr0, fr1, fr0 + q.c * 80, fr1 + q.s * 80, M.o3((t - wt('X3', 'down') + 0.1) / 0.4), 4, -10);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'slope') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
