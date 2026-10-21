// PUC Physics Ep 47: Angular displacement and angular velocity (Motion notebook, one spinning wheel)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const TH = C.gold, OM = C.teal, SC = C.violet, VC = C.ac, RC = C.ink, AMB = '#E8A317';   // θ gold, ω teal, arc s violet, v blue, r ink; reflector amber
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }, FS = { dy: 0, fade: 0.25 };   // FS: fade only, for svg parts (no scale about the svg origin)
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const thK = tx(TH, '\\theta'), dthK = tx(TH, '\\Delta\\theta'), omK = tx(OM, '\\omega'), sK = tx(SC, 's'), vK = tx(VC, 'v');
const rad = d => d * Math.PI / 180, PI = Math.PI;
const P = (o, R, th) => [o[0] + R * Math.cos(th), o[1] - R * Math.sin(th)];      // anticlockwise, screen y down
const Tg = th => [-Math.sin(th), -Math.cos(th)];
const arcD = (o, r, a0, a1) => { if (a1 - a0 >= 2 * PI - 1e-3) return `M${o[0] + r},${o[1]} A${r},${r} 0 1 0 ${o[0] - r},${o[1]} A${r},${r} 0 1 0 ${o[0] + r},${o[1]}`; const p0 = P(o, r, a0), p1 = P(o, r, a1), big = (a1 - a0) > PI ? 1 : 0; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${big} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const ballAt = (el, p) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); };
const vArrow = (a, p, th, L, off = 0) => { const u = Tg(th); if (L < 2) { a.set(0, 0, 0, 0); return; } a.set(p[0] + u[0] * off, p[1] + u[1] * off, p[0] + u[0] * (off + L), p[1] + u[1] * (off + L)); };
// a bicycle wheel: tyre, rim, rotating spokes, hub. Returns the spoke group.
const wheel = (p, o, R, n = 16) => { mk(p, 'circle', { cx: o[0], cy: o[1], r: R + 8, fill: 'none', stroke: '#3A4560', 'stroke-width': 14 }); mk(p, 'circle', { cx: o[0], cy: o[1], r: R - 3, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
  const g = mk(p, 'g', {}); for (let i = 0; i < n; i++) { const a = 2 * PI * i / n; mk(g, 'line', { x1: 0, y1: 0, x2: (R - 5) * Math.cos(a), y2: (R - 5) * Math.sin(a), stroke: '#C9CDD6', 'stroke-width': 2 }); }
  mk(p, 'circle', { cx: o[0], cy: o[1], r: Math.max(8, R * 0.09), fill: C.ink2 }); return g; };
const spin = (g, o, th) => attr(g, 'transform', `translate(${o[0]},${o[1]}) rotate(${(-th * 180 / PI).toFixed(2)})`);

Object.assign(M.IC, {
  fan: ['M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z', 'M12 12v.01'],
  wheel: ['M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'M12 2v4', 'm6.8 15-3.5 2', 'm20.7 7-3.5 2', 'M6.8 9 3.3 7', 'm20.7 17-3.5-2', 'm9 22 3-8 3 8', 'M8 22h8', 'M18 18.7a9 9 0 1 0-12 0'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP4 = T0('P4'), tP5 = T0('P5'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['wheel', 'Merry-go-round', 'OUTER FAST, INNER SLOW', 'merry', 0.18, 'outer horse fast · inner horse slow'], ['fan', 'Ceiling fan', 'TIP FAST, CENTRE SLOW', 'fan', 0.3, 'tip fast · near the centre slow']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , , x], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 190}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jx">${x}</div><svg width="150" height="150" id="jrS${i}"></svg></div>`).join('');
const jrD = JOBS.map((j, i) => { const s = $('#jrS' + i), o = [75, 75]; mk(s, 'circle', { cx: 75, cy: 75, r: 64, fill: '#fff', stroke: C.dim, 'stroke-width': 3 });
  const ln = mk(s, 'line', { x1: 75, y1: 75, stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'circle', { cx: 75, cy: 75, r: 5, fill: C.ink });
  const gi = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 7, fill: AMB, opacity: op })), go = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 9, fill: C.ac, opacity: op }));
  const di = mk(s, 'circle', { r: 7, fill: AMB, stroke: C.ink, 'stroke-width': 1.5 }), dO = mk(s, 'circle', { r: 9, fill: C.ac }); return { o, ln, gi, go, di, dO, rate: j[4] }; });
const TILES = [['arrowR', 'Valve: far more distance', C.ink], ['help', 'Which turns faster?', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'distance'), wt('H4', 'faster')];
const hw = $('#whlS'), HO = [110, 122], HR = 72;
const hSp = wheel(hw, HO, HR, 12);
const hVal = mk(hw, 'circle', { r: 7, fill: C.ac, stroke: C.ink, 'stroke-width': 1.5 }), hRef = mk(hw, 'circle', { r: 6, fill: AMB, stroke: C.ink, 'stroke-width': 1.5 });
const hW = 2 * PI / 2.4;

/* ---------- P: angular position + displacement ---------- */
const pa = $('#paS'), PO = [300, 280], PR = 190, TH1 = rad(35), TH2 = rad(110);
mk(pa, 'circle', { cx: PO[0], cy: PO[1], r: PR, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(pa, 'circle', { cx: PO[0], cy: PO[1], r: 6, fill: C.ink });
const pRef = mk(pa, 'line', { x1: PO[0], y1: PO[1], x2: PO[0] + PR + 150, y2: PO[1], stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const pRefL = txt(pa, PO[0] + PR + 150, PO[1] + 30, 'reference line', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute });
const pGhost = mk(pa, 'circle', { r: 13, fill: C.ink, opacity: 0.25 }), pGhR = mk(pa, 'line', { x1: PO[0], y1: PO[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.25 });
const pArc = mk(pa, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3 }), pThl = sym(pa, 0, 0, 'θ', '', TH, 30);
const pDArc = mk(pa, 'path', { fill: 'none', stroke: TH, 'stroke-width': 7, 'stroke-linecap': 'round' }), pDl = sym(pa, 0, 0, 'Δθ', '', TH, 30);
const pRad = mk(pa, 'line', { x1: PO[0], y1: PO[1], stroke: RC, 'stroke-width': 3 }), pPt = mk(pa, 'circle', { r: 13, fill: C.ink });
const pPl = txt(pa, 0, 0, 'P', { 'font-family': 'Poppins', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const pRot = mk(pa, 'path', { d: arcD(PO, PR + 34, rad(20), rad(70)), fill: 'none', stroke: TH, 'stroke-width': 3, 'stroke-linecap': 'round' });
const pRotH = mk(pa, 'path', { fill: TH }); { const e = P(PO, PR + 34, rad(70)), u = Tg(rad(70)), n = [Math.cos(rad(70)), -Math.sin(rad(70))]; attr(pRotH, 'd', `M${(e[0] + u[0] * 14).toFixed(1)},${(e[1] + u[1] * 14).toFixed(1)} L${(e[0] + n[0] * 8).toFixed(1)},${(e[1] + n[1] * 8).toFixed(1)} L${(e[0] - n[0] * 8).toFixed(1)},${(e[1] - n[1] * 8).toFixed(1)} Z`); }
const pRotL = txt(pa, 0, 0, '+ anticlockwise', { 'font-size': 18, fill: TH, 'font-weight': 600 }); { const e = P(PO, PR + 56, rad(30)); attr(pRotL, 'x', e[0].toFixed(1)); attr(pRotL, 'y', e[1].toFixed(1)); }
$('#paP').innerHTML = K(`${dthK} = ${tx(TH, '\\theta_2')} - ${tx(TH, '\\theta_1')}`) + '&nbsp; angular displacement';
const tPmove = wt('P3', 'changes') - 0.2, pTh = M.keys([[0, TH1], [tPmove, TH2]], 1.4, M.io);
/* ---------- P: one radian ---------- */
const pr = $('#prS'), RO = [392, 262], RRr = 150;
mk(pr, 'circle', { cx: RO[0], cy: RO[1], r: RRr, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(pr, 'circle', { cx: RO[0], cy: RO[1], r: 6, fill: C.ink });
const rR0 = mk(pr, 'line', { x1: RO[0], y1: RO[1], x2: RO[0] + RRr, y2: RO[1], stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round' }), rR0l = sym(pr, RO[0] + 62, RO[1] + 34, 'r', '', RC, 28);
const rBend = mk(pr, 'path', { fill: 'none', stroke: SC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const rR1 = mk(pr, 'line', { x1: RO[0], y1: RO[1], x2: P(RO, RRr, 1)[0], y2: P(RO, RRr, 1)[1], stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const rAng = mk(pr, 'path', { d: arcD(RO, 46, 0, 1), fill: 'none', stroke: TH, 'stroke-width': 3 }), rAngL = txt(pr, RO[0] + 56, RO[1] - 20, '1 rad', { 'font-size': 20, fill: TH, 'font-weight': 600 });
const rArcL = sym(pr, 0, 0, 'arc = r', '', SC, 24); { const e = P(RO, RRr + 34, 0.5); attr(rArcL, 'x', e[0].toFixed(1)); attr(rArcL, 'y', e[1].toFixed(1)); }
const rFull = mk(pr, 'path', { fill: 'none', stroke: SC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.45 });
const rTicks = [1, 2, 3, 4, 5, 6].map(k => { const a = P(RO, RRr - 12, k), b = P(RO, RRr + 12, k), l = P(RO, RRr + 34, k); const g = mk(pr, 'g', {}); mk(g, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: SC, 'stroke-width': 3 }); txt(g, l[0], l[1] + 7, String(k), { 'text-anchor': 'middle', 'font-size': 20, fill: SC, 'font-weight': 600 }); return g; });
$('#prP0').innerHTML = `arc = <i>&nbsp;r&nbsp;</i> &rarr; <span class="th">1 rad ≈ 57.3°</span>`;
$('#prP1').innerHTML = `1 turn = 2π rad = 360°`;
const tBend = wt('P4', 'arc') - 0.2, tFull = wt('P5', 'full') - 0.1;

/* ---------- S: the wheel sim ---------- */
const s = $('#simS'), O = [392, 290], RIM = 190, RV = 180, RF = 60, VPX = 160;    // 600 px per metre: valve 0.30 m, reflector 0.10 m; arrows 160 px per m/s
mk(s, 'line', { x1: O[0], y1: O[1], x2: O[0] + RIM + 90, y2: O[1], stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '8 8', opacity: 0.6 });
txt(s, O[0] + RIM + 90, O[1] + 40, 'θ = 0', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute });
const sSp = wheel(s, O, RIM, 16);
const sArcF = mk(s, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }), sArcV = mk(s, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const sArcFl = txt(s, 0, 0, 's = 0.16 m', { 'font-size': 20, fill: SC, 'font-weight': 600, stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' }), sArcVl = txt(s, 0, 0, 's = 0.47 m', { 'font-size': 20, fill: SC, 'font-weight': 600, stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' });
const sTh = mk(s, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3 }), sThl = sym(s, 0, 0, 'θ', '', TH, 26);
const sLine = mk(s, 'line', { x1: O[0], y1: O[1], stroke: C.ink, 'stroke-width': 2.5 });
const gF = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 11, fill: AMB, opacity: op })), gV = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 13, fill: C.ac, opacity: op }));
const aGF = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(s, VC, 4, 14); a.g.style.opacity = op; return a; }), aGV = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(s, VC, 5, 16); a.g.style.opacity = op; return a; });
const sRef = mk(s, 'circle', { r: 11, fill: AMB, stroke: C.ink, 'stroke-width': 2 }), sVal = mk(s, 'circle', { r: 13, fill: C.ac, stroke: C.ink, 'stroke-width': 2 });
const aF = PUC.arrow(s, VC, 5, 16), aV = PUC.arrow(s, VC, 7, 20);
const HALO = { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke', 'stroke-linejoin': 'round' };
const lF = txt(s, 0, 0, 'reflector', { 'font-size': 18, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'middle', ...HALO }), lV = txt(s, 0, 0, 'valve', { 'font-size': 18, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'middle', ...HALO });
const rowsT = [['', 'REFLECTOR', 'VALVE', ''], ['r', 'r0', 'r1', 'm', RC], ['θ', 't0', 't1', 'rad', TH], ['s', 's0', 's1', 'm', SC], ['v', 'v0', 'v1', 'm/s', VC]];
$('#rtab').innerHTML = rowsT.map((r, i) => i === 0 ? `<span></span><span class="h">${r[1]}</span><span class="h">${r[2]}</span><span></span>` :
  `<span class="k" style="color:${r[4]}">${r[0]}</span><span class="v" id="rt${r[1]}" style="color:${r[4]}"></span><span class="v" id="rt${r[2]}" style="color:${r[4]}"></span><span class="u">${r[3]}</span>`).join('');
const gr = PUC.graph($('#grS'), { x: 110, y: 74, w: 600, h: 146, xmax: 10, ymin: 0, ymax: 10 * PI, xt: [0, 2, 4, 6, 8, 10], yt: [] });
txt($('#grS'), 712, 254, 't (s)', { 'font-size': 16, 'text-anchor': 'end' });
['0', '2π', '4π', '6π', '8π', '10π'].forEach((l, i) => { const y = gr.Y(2 * PI * i); mk($('#grS'), 'line', { x1: 102, y1: y, x2: 110, y2: y, stroke: C.ink, 'stroke-width': 2 }); txt($('#grS'), 96, y + 6, l, { 'text-anchor': 'end', 'font-size': 16 }); });
const cTh = gr.curve(TH, 5), dGV = gr.dot(C.ac, 12), dGF = gr.dot(AMB, 7);
const slp = mk($('#grS'), 'path', { fill: 'none', stroke: OM, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const slpL = txt($('#grS'), 0, 0, 'slope = ω = π rad/s', { 'font-size': 18, fill: OM, 'font-weight': 600 });
// sim clock τ (s of wheel time)
const tSt = wt('S3', 'Start') + 0.2, tRes = wt('S5', 'Keep'), tSlo = wt('S6', 'slow'), tFrz = T0('S7'), tGo = wt('S7', 'But');
const tau1 = 0.5 + (tSlo - tRes), tauF = tau1 + 0.25 * (tFrz - tSlo);
const tau = t => t < tSt ? 0 : t < tSt + 0.5 ? t - tSt : t < tRes ? 0.5 : t < tSlo ? 0.5 + (t - tRes) : t < tFrz ? tau1 + 0.25 * (t - tSlo) : t < tGo ? tauF : tauF + 0.25 * (t - tGo);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same angle, three times the arc!' });

/* ---------- D: ω, s = rθ, v = rω ---------- */
const STEPS = [[`${omK} = ${dthK} / \\Delta t`, 'angular displacement ÷ time · unit rad/s'],
  [`${sK} = r\\,${thK}`, 'arc length · θ in radians'],
  [`${sK}/t = r\\,(${thK}/t) \\;\\Rightarrow\\; ${vK} = r\\,${omK}`, 'divide both sides by the time'],
  [`${omK} = 2\\pi / T = 2\\pi\\nu`, 'one turn: 2π rad in one period T'],
  [`${omK} = 2\\pi / 2 = \\pi \\approx ${tx(OM, '3.14\\,\\text{rad/s}')}`, "Aarav's wheel: T = 2 s"]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Omega', 1), wt('D3', 's'), wt('D4', 'Divide'), wt('D6', 'So'), wt('D7', 'For')];
const ar = $('#arS'), AO = [130, 440], A1 = 110, A2 = 330, AT = rad(60);
const aR0 = mk(ar, 'line', { x1: AO[0], y1: AO[1], x2: AO[0] + A2 + 30, y2: AO[1], stroke: RC, 'stroke-width': 3 });
const aR1 = mk(ar, 'line', { x1: AO[0], y1: AO[1], x2: P(AO, A2 + 30, AT)[0], y2: P(AO, A2 + 30, AT)[1], stroke: RC, 'stroke-width': 3 });
mk(ar, 'circle', { cx: AO[0], cy: AO[1], r: 6, fill: C.ink });
const aTh = mk(ar, 'path', { d: arcD(AO, 52, 0, AT), fill: 'none', stroke: TH, 'stroke-width': 3 }), aThl = sym(ar, AO[0] + 64, AO[1] - 16, 'θ', '', TH, 28);
const aS1 = mk(ar, 'path', { d: arcD(AO, A1, 0, AT), fill: 'none', stroke: SC, 'stroke-width': 7, 'stroke-linecap': 'round' }), aS2 = mk(ar, 'path', { d: arcD(AO, A2, 0, AT), fill: 'none', stroke: SC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const aP1 = [mk(ar, 'circle', { cx: P(AO, A1, AT)[0], cy: P(AO, A1, AT)[1], r: 10, fill: AMB, stroke: C.ink, 'stroke-width': 2 }), mk(ar, 'circle', { cx: P(AO, A2, AT)[0], cy: P(AO, A2, AT)[1], r: 12, fill: C.ac, stroke: C.ink, 'stroke-width': 2 })];
const aL1 = sym(ar, 0, 0, 's', '1', SC, 28), aL2 = sym(ar, 0, 0, 's', '2', SC, 30);
{ const e1 = P(AO, A1 + 26, AT / 2), e2 = P(AO, A2 + 30, AT / 2); attr(aL1, 'x', e1[0].toFixed(1)); attr(aL1, 'y', e1[1].toFixed(1)); attr(aL2, 'x', e2[0].toFixed(1)); attr(aL2, 'y', e2[1].toFixed(1)); }
const aR1l = sym(ar, AO[0] + A1 / 2 - 10, AO[1] + 36, 'r', '1', RC, 26), aR2l = sym(ar, AO[0] + A2 - 30, AO[1] + 36, 'r', '2', RC, 26);
const aEq = [txt(ar, 400, 120, '', {}), txt(ar, 400, 170, '', {})];
$('#dc0').innerHTML = K(`\\textcolor{#9DBBF7}{v_1} = r_1\\,\\textcolor{#7FD1D1}{\\omega}`);
$('#dc1').innerHTML = K(`\\textcolor{#9DBBF7}{v_2} = r_2\\,\\textcolor{#7FD1D1}{\\omega}`);
const aF1 = document.createElement('div'); aF1.className = 'fx'; aF1.style.cssText = 'left:430px;top:84px;font-size:40px;line-height:1.5'; aF1.innerHTML = K(`${tx(SC, 's_1')} = r_1\\,${thK}`) + '<br>' + K(`${tx(SC, 's_2')} = r_2\\,${thK}`); $('#dr').appendChild(aF1);
$('#stF').innerHTML = K(`${vK} = r\\,${omK}`);

/* ---------- C: side by side ---------- */
const sbWheel = (svg, hi) => { const o = [356, 125], R = 100; const sp = wheel(svg, o, R, 12);
  const f = mk(svg, 'circle', { r: 9, fill: AMB, stroke: C.ink, 'stroke-width': 2, opacity: hi ? 0.35 : 1 }), v = mk(svg, 'circle', { r: 11, fill: C.ac, stroke: C.ink, 'stroke-width': 2, opacity: hi ? 1 : 0.35 });
  const a = PUC.arrow(svg, VC, 6, 18), g = [0.3, 0.2, 0.12].map(op => { const q = PUC.arrow(svg, VC, 4, 14); q.g.style.opacity = op; return q; });
  return (t, t0) => { const th = 0.6 + (2 * PI / 6) * Math.max(0, t - t0); spin(sp, o, th); const pf = P(o, 33, th), pv = P(o, 95, th); ballAt(f, pf); ballAt(v, pv);
    const L = hi ? 90 : 30, p = hi ? pv : pf, gu = M.o3((t - t0 - 0.4) / 0.5); vArrow(a, p, th, L * gu);
    g.forEach((q, k) => { const t2 = t - 0.7 * (k + 1), th2 = 0.6 + (2 * PI / 6) * Math.max(0, t2 - t0); if (t2 > t0 + 0.9) vArrow(q, P(o, hi ? 95 : 33, th2), th2, L); else q.set(0, 0, 0, 0); }); }; };
const sb0 = sbWheel($('#c0S'), 0), sb1 = sbWheel($('#c1S'), 1);
const SBR = (r, v) => [['r', RC, `${r} <small>m</small>`], ['ω', OM, `π <small>rad/s</small>`], ['v', VC, `${v} <small>m/s</small>`]];
$('#c0r').innerHTML = SBR('0.10', '0.31').map(([k, c, v], i) => `<span class="k" style="color:${c}" id="c0k${i}">${k}</span><span class="v" style="color:${c}" id="c0v${i}">${v}</span>`).join('');
$('#c1r').innerHTML = SBR('0.30', '0.94').map(([k, c, v], i) => `<span class="k" style="color:${c}" id="c1k${i}">${k}</span><span class="v" style="color:${c}" id="c1v${i}">${v}${i === 2 ? ' &nbsp;<small style="color:#16213E">= 3 × 0.31</small>' : i === 0 ? ' &nbsp;<small style="color:#16213E">= 3 × 0.10</small>' : ' &nbsp;<small style="color:#16213E">the same</small>'}</span>`).join('');
const tC0 = [wt('C2', 'Radius'), wt('C2', 'omega'), wt('C2', 'v')], tC1r = [wt('C3', 'Radius'), wt('C3', 'same'), wt('C3', 'v')];
const th1 = PUC.think($('#th1'), { q: "A clock's second hand: its tip, or a point halfway along. Which has the bigger ω?", opts: ['The tip', 'The halfway point', 'The same'], right: 2,
  why: 'Both sweep 360° in 60 s. Only their speeds differ.' });
const th2 = PUC.think($('#th2'), { q: "Aarav spins the wheel twice as fast. What happens to the valve's speed?", opts: ['Stays the same', 'Doubles', 'Four times'], right: 1,
  why: 'v = rω. The radius is fixed, so double ω gives double v.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\nu = \\dfrac{300}{60\\,\\text{s}} = 5\\,\\text{Hz}`)],
  [K(`${omK} = 2\\pi\\nu = 10\\pi \\approx ${tx(OM, '31.4\\,\\text{rad/s}')}`)],
  [K(`${vK} = r\\,${omK} = 0.6 \\times 10\\pi = 6\\pi`)],
  [K(`${vK} \\approx ${tx(VC, '18.8\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [392, 290], WB = 190, WSH = 2 * PI * 5 / 20;     // 5 turns per second, shown at 1/20 speed
const wBl = mk(w, 'g', {}); [0, 120, 240].forEach(d => { const g = mk(wBl, 'g', { transform: `rotate(${d})` }); mk(g, 'path', { d: `M22,-14 L${WB},-26 Q${WB + 14},0 ${WB},26 L22,14 Z`, fill: '#DDE2EA', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 30, fill: C.ink2 });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { r: 11, fill: C.ac, opacity: op }));
const wTip = mk(w, 'circle', { r: 11, fill: C.ac, stroke: C.ink, 'stroke-width': 2 }), wMid = mk(w, 'circle', { r: 9, fill: AMB, stroke: C.ink, 'stroke-width': 2 });
const wAT = PUC.arrow(w, VC, 6, 18), wAM = PUC.arrow(w, VC, 5, 16);
const wTl = txt(w, 0, 0, 'tip · 0.6 m', { 'font-size': 18, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'middle', ...HALO });
const tWrun = T0('W2') + 0.2, wTh = t => rad(70) + WSH * Math.max(0, t - tWrun);
const tW = [wt('W3', 'So'), wt('W4', 'That'), wt('W5', 'That'), wt('W6', 'About')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'ω = 180°/s, so v = 0.3 × 180 = 54 m/s', right: '180°/s = π rad/s, so v = 0.3π ≈ 0.94 m/s' });
const tg = $('#tg'), GO = [210, 200], GR = 120;
const tgB = mk(tg, 'line', { x1: GO[0] - GR - 20, y1: GO[1], x2: GO[0] + GR + 20, y2: GO[1], stroke: C.ink, 'stroke-width': 2.5 });
const tgA = mk(tg, 'path', { d: arcD(GO, GR, 0, PI), fill: 'none', stroke: TH, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tgL1 = txt(tg, GO[0], GO[1] - 52, '180°', { 'text-anchor': 'middle', 'font-size': 30, fill: TH, 'font-weight': 600 }), tgL2 = txt(tg, GO[0], GO[1] - 16, '= π rad', { 'text-anchor': 'middle', 'font-size': 26, fill: TH, 'font-weight': 600 });
const tJn = wt('X3', 'eighty');
const where = PUC.where($('#wa'), { on: [], type: 'Quick numericals: clock hands, fan blades, rpm to rad/s, v = rω' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: "A clock's minute hand is 6 cm long. What are its angular velocity and the speed of its tip?", qW: 780,
  opts: [K('\\pi/30\\;\\text{rad/s}, \\;\\; \\pi/5\\;\\text{cm/s}'), K('\\pi/1800\\;\\text{rad/s}, \\;\\; \\pi/300\\;\\text{cm/s}'), K('\\pi/21600\\;\\text{rad/s}, \\;\\; \\pi/3600\\;\\text{cm/s}'), K('\\pi/1800\\;\\text{rad/s}, \\;\\; 0.6\\;\\text{cm/s}')],
  right: 1, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 256 });
const so = PUC.solution($('#so'), [[K(`${dthK} = 2\\pi \\text{ in } 3600\\,\\text{s}`)], [K(`${omK} = 2\\pi/3600 = \\pi/1800\\;\\text{rad/s}`)], [K(`${vK} = r\\,${omK} = 6 \\times \\pi/1800`)], [K(`= \\pi/300\\;\\text{cm/s} \\;\\Rightarrow\\; \\textbf{B}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'minute'), wt('A3', 'So'), wt('A4', 'tip'), wt('A4', 'three')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · angular velocity', y0: 92, dy: 92, txt: [0, 0, 1, 1],
  lines: [K(`${omK} = ${dthK}/\\Delta t = 2\\pi/T = 2\\pi\\nu \\quad (\\text{rad/s})`), K(`${sK} = r\\,${thK} \\qquad ${vK} = r\\,${omK}`),
    '<b>Every point</b> of a turning wheel: same θ, same ω', '<b>Radians only</b>: 1 turn = 2π rad = 360°'] });
const YQ = ['On a turning wheel, which is the same for every point: ω or the speed?', 'Why must θ be in radians when you use s = rθ?', 'How do you turn 60 turns a minute into rad/s?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 48', topic: 'Why does a salad spinner fling water? Centripetal Acceleration', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const p0 = $('#prP0'); $('#prP1').style.left = (p0.offsetLeft + p0.offsetWidth + 16) + 'px'; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    jrD.forEach((d, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const a = (t2) => PI / 2 + 2 * PI * d.rate * (t2 - tMorph), th = a(t), pi2 = P(d.o, 26, th), po = P(d.o, 58, th);
      attr(d.ln, 'x2', P(d.o, 64, th)[0].toFixed(1)); attr(d.ln, 'y2', P(d.o, 64, th)[1].toFixed(1)); ballAt(d.di, pi2); ballAt(d.dO, po);
      d.gi.forEach((g, k) => ballAt(g, P(d.o, 26, a(t - 0.15 * (k + 1))))); d.go.forEach((g, k) => ballAt(g, P(d.o, 58, a(t - 0.15 * (k + 1)))));
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'single')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'share') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#whl'), t, wt('H3', 'wheel') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    const ha = hW * Math.max(0, t - wt('H3', 'wheel')); spin(hSp, HO, ha); ballAt(hVal, P(HO, HR - 6, ha)); ballAt(hRef, P(HO, 26, ha));
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(pRef, t, wt('P2', 'reference') - 0.2, 0.5); M.vis(pRefL, t, wt('P2', 'reference'), 1e9, { dy: 6 });
    const th = pTh(t), pp = P(PO, PR, th), pin = M.o3((t - wt('P2', 'Draw')) / 0.5);
    ballAt(pPt, pp); M.vis(pPt, t, wt('P2', 'point') - 0.2, 1e9, FS);
    attr(pRad, 'x2', M.lerp(PO[0], pp[0], pin).toFixed(1)); attr(pRad, 'y2', M.lerp(PO[1], pp[1], pin).toFixed(1)); M.hide(pRad, pin <= 0);
    attr(pPl, 'x', (pp[0] + 18).toFixed(1)); attr(pPl, 'y', (pp[1] - 14).toFixed(1)); pPl.style.opacity = M.clamp((t - wt('P2', 'point')) / 0.3).toFixed(3);
    const aOn = M.clamp((t - wt('P2', 'angle') + 0.1) / 0.3); attr(pArc, 'd', arcD(PO, 56, 0, th)); pArc.style.opacity = aOn.toFixed(3);
    { const e = P(PO, 84, th / 2); attr(pThl, 'x', (e[0] - 6).toFixed(1)); attr(pThl, 'y', (e[1] + 10).toFixed(1)); pThl.style.opacity = aOn.toFixed(3); }
    const moved = t > tPmove; ballAt(pGhost, P(PO, PR, TH1)); attr(pGhR, 'x2', P(PO, PR, TH1)[0].toFixed(1)); attr(pGhR, 'y2', P(PO, PR, TH1)[1].toFixed(1)); M.hide(pGhost, !moved); M.hide(pGhR, !moved);
    const du = M.clamp((t - wt('P3', 'delta') + 0.1) / 0.4); attr(pDArc, 'd', du <= 0 ? '' : arcD(PO, 130, TH1, TH1 + (th - TH1) * du));
    { const e = P(PO, 162, (TH1 + TH2) / 2); attr(pDl, 'x', (e[0] - 22).toFixed(1)); attr(pDl, 'y', (e[1] + 10).toFixed(1)); pDl.style.opacity = du.toFixed(3); }
    const rOn = M.clamp((t - wt('P3', 'Anticlockwise') + 0.1) / 0.3); [pRot, pRotH, pRotL].forEach(e => e.style.opacity = rOn.toFixed(3));
    M.vis($('#paP'), t, wt('P3', 'displacement') - 0.1, 1e9, POP);
    // one radian
    M.vis($('#pr'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(rR0, t, tP4 + 0.4, 0.5); M.vis(rR0l, t, tP4 + 0.6, 1e9, FS);
    const k = M.io((t - tBend) / 1.2), lift = M.clamp((t - tBend + 0.4) / 0.3);
    let d = ''; for (let i = 0; i <= 40; i++) { const u = i / 40, a = [RO[0] + RRr + 22 * (1 - k), RO[1] - u * RRr], b = P(RO, RRr, u); d += (i ? 'L' : 'M') + M.lerp(a[0], b[0], k).toFixed(1) + ',' + M.lerp(a[1], b[1], k).toFixed(1); }
    attr(rBend, 'd', d); rBend.style.opacity = lift.toFixed(3);
    M.draw(rR1, t, tBend + 1.2, 0.4); M.draw(rAng, t, tBend + 1.4, 0.4); M.vis(rAngL, t, tBend + 1.6, 1e9, FS); M.vis(rArcL, t, tBend + 1.0, 1e9, FS);
    M.vis($('#prP0'), t, wt('P4', 'radius') - 0.1, 1e9, POP);
    const fu = M.io((t - tFull) / 2.2); attr(rFull, 'd', fu <= 0 ? '' : arcD(RO, RRr, 1, 1 + (2 * PI - 1) * fu));
    rTicks.forEach((g, i) => { const on = fu * (2 * PI - 1) + 1 >= i + 1 - 1e-6 && t > tFull - 0.05; g.style.opacity = on ? '1' : '0'; });
    M.vis($('#prP1'), t, wt('P5', 'three') - 0.1, 1e9, POP);
  }

  /* S: the wheel + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tu = Math.round(tau(t) * 100) / 100, th = PI * tu, pv = P(O, RV, th), pf = P(O, RF, th);   // ω = π rad/s
    spin(sSp, O, th); ballAt(sVal, pv); ballAt(sRef, pf);
    attr(sLine, 'x2', P(O, RV, th)[0].toFixed(1)); attr(sLine, 'y2', P(O, RV, th)[1].toFixed(1));
    M.vis(sVal, t, wt('S2', 'valve') - 0.1, 1e9, FS); M.vis(sRef, t, wt('S2', 'reflector') - 0.1, 1e9, FS);
    const lp = (r, off) => { const e = P(O, r + off, th); return e; };
    { const e = lp(RV, 46), f = lp(RF, -36); attr(lV, 'x', e[0].toFixed(1)); attr(lV, 'y', (e[1] + 6).toFixed(1)); attr(lF, 'x', f[0].toFixed(1)); attr(lF, 'y', (f[1] + 6).toFixed(1)); }
    M.vis(lV, t, wt('S2', 'valve'), tSlo, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); M.vis(lF, t, wt('S2', 'reflector'), tSlo, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    // the first quarter turn: arcs traced by both points
    const qa = Math.min(th, PI / 2), arcOn = 1 - M.clamp((t - tRes - 0.3) / 0.4);
    attr(sArcF, 'd', qa < 0.01 ? '' : arcD(O, RF, 0, qa)); attr(sArcV, 'd', qa < 0.01 ? '' : arcD(O, RV, 0, qa)); sArcF.style.opacity = sArcV.style.opacity = arcOn.toFixed(3);
    const hl = 6 + 4 * M.io((t - wt('S4', 'three')) / 0.3) * arcOn; attr(sArcF, 'stroke-width', hl.toFixed(2)); attr(sArcV, 'stroke-width', hl.toFixed(2));
    { const e = P(O, RV + 34, PI / 4); attr(sArcVl, 'x', e[0].toFixed(1)); attr(sArcVl, 'y', e[1].toFixed(1)); attr(sArcFl, 'x', (O[0] + 24).toFixed(1)); attr(sArcFl, 'y', (O[1] + 44).toFixed(1)); }
    const al = M.clamp((t - wt('S4', 'arc') + 0.1) / 0.3) * arcOn; sArcVl.style.opacity = sArcFl.style.opacity = al.toFixed(3);
    const thm = th % (2 * PI); attr(sTh, 'd', thm < 0.03 ? '' : arcD(O, 34, 0, thm)); const tho = M.clamp((t - wt('S3', 'angle')) / 0.3) * (1 - M.clamp((t - tRes) / 0.3));
    sTh.style.opacity = tho.toFixed(3); { const e = P(O, 46, PI / 4); attr(sThl, 'x', (e[0] + 8).toFixed(1)); attr(sThl, 'y', (e[1] - 6).toFixed(1)); sThl.style.opacity = (tho * (thm > 0.3 ? 1 : 0)).toFixed(3); }
    // ghosts while it moves
    const ghost = (gs, r, k0) => gs.forEach((g, k) => { const t2 = t - 0.08 * (k + 1), th2 = PI * Math.round(tau(t2) * 100) / 100; ballAt(g, P(O, r, th2)); M.hide(g, Math.abs(th2 - th) < 0.02); });
    ghost(gV, RV); ghost(gF, RF);
    // slow-mo: velocity arrows (v = rω), both turning together
    const gu = M.o3((t - wt('S7', 'arrow') + 0.2) / 0.6);
    vArrow(aV, pv, th, 0.3 * PI * VPX * gu); vArrow(aF, pf, th, 0.1 * PI * VPX * gu);
    [[aGV, RV, 0.3], [aGF, RF, 0.1]].forEach(([as, r, rr]) => as.forEach((a, k) => { const t2 = t - 0.5 * (k + 1), th2 = PI * tau(t2); if (t > tGo + 0.3 && t2 > tGo - 0.2) vArrow(a, P(O, r, th2), th2, rr * PI * VPX); else a.set(0, 0, 0, 0); }));
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    // readout from the rounded time
    const tt = tu, thr = PI * tt;
    M.setT($('#tnow'), tt.toFixed(2));
    M.setT($('#rtr0'), '0.10'); M.setT($('#rtr1'), '0.30');
    M.setT($('#rtt0'), thr.toFixed(2)); M.setT($('#rtt1'), thr.toFixed(2));
    M.setT($('#rts0'), (0.1 * thr).toFixed(2)); M.setT($('#rts1'), (0.3 * thr).toFixed(2));
    M.setT($('#rtv0'), (0.1 * PI).toFixed(2)); M.setT($('#rtv1'), (0.3 * PI).toFixed(2));
    const hiT = M.io((t - wt('S3', 'same')) / 0.3) * (1 - M.io((t - T0('S4')) / 0.3)); ['#rtt0', '#rtt1'].forEach(id => { $(id).style.background = M.rgba(TH, 0.16 * hiT); });
    const hiS = M.io((t - wt('S4', 'three')) / 0.3) * (1 - M.io((t - tRes) / 0.3)); ['#rts0', '#rts1'].forEach(id => { $(id).style.background = M.rgba(SC, 0.14 * hiS); });
    const hiV = M.io((t - wt('S7', 'three')) / 0.3); ['#rtv0', '#rtv1'].forEach(id => { $(id).style.background = M.rgba(VC, 0.12 * hiV); });
    // graph: one line for both points
    cTh(s2 => [s2, PI * s2], 0, Math.min(tt, 10)); dGV(Math.min(tt, 10), thr, t > tSt - 0.1); dGF(Math.min(tt, 10), thr, t > tSt - 0.1);
    M.vis($('#leg'), t, T0('S5') + 0.3, 1e9, { dy: 10 });
    const su = M.io((t - wt('S8', 'grows') + 0.2) / 0.6), x0 = gr.X(2), x1 = gr.X(4), y0 = gr.Y(2 * PI), y1 = gr.Y(4 * PI);
    attr(slp, 'd', `M${x0},${y0} H${x1} V${y1}`); M.drawU(slp, su); slp.style.opacity = su > 0 ? '1' : '0';
    attr(slpL, 'x', (x1 + 12).toFixed(1)); attr(slpL, 'y', ((y0 + y1) / 2 + 26).toFixed(1)); slpL.style.opacity = M.clamp((t - wt('S8', 'angular') + 0.2) / 0.3).toFixed(3);
    avA(t, wt('S4', 'arc', 1) + 0.3, tRes);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    const t3 = wt('D3', 'point');
    M.draw(aR0, t, t3 - 0.6, 0.5); M.draw(aR1, t, t3 - 0.3, 0.5); M.draw(aTh, t, t3, 0.4); M.vis(aThl, t, t3 + 0.2, 1e9, FS);
    M.draw(aS1, t, wt('D3', 'arc') - 0.1, 0.5); M.draw(aS2, t, wt('D3', 'arc') + 0.2, 0.7); aP1.forEach((e, i) => M.vis(e, t, wt('D3', 'arc') + 0.3 * i, 1e9, FS));
    M.vis(aL1, t, wt('D3', 'equals') - 0.1, 1e9, FS); M.vis(aL2, t, wt('D3', 'equals'), 1e9, FS); M.vis(aR1l, t, t3 - 0.2, 1e9, FS); M.vis(aR2l, t, t3, 1e9, FS);
    M.vis(aF1, t, wt('D3', 'theta') - 0.1, 1e9, { dy: 10 });
    M.vis($('#dc0'), t, wt('D5', 'equals') - 0.1, 1e9, POP); M.vis($('#dc1'), t, wt('D5', 'bigger') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'And'), 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o }); sb0(t, tC1 + 0.2);
    [0, 1, 2].forEach(i => { M.vis($('#c0k' + i), t, tC0[i] - 0.1, 1e9, POP); M.vis($('#c0v' + i), t, tC0[i], 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#c1'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o }); sb1(t, T0('C3') - 0.2);
    [0, 1, 2].forEach(i => { M.vis($('#c1k' + i), t, tC1r[i] - 0.1, 1e9, POP); M.vis($('#c1v' + i), t, tC1r[i], 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Both') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'What') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'v') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.2, 1e9, { dy: 8 }); M.vis($('#wslo'), t, T0('W2') + 0.4, 1e9, POP);
    const th = wTh(t); spin(wBl, WO, th);
    const pt = P(WO, WB - 8, th), pm = P(WO, (WB - 8) / 2, th); ballAt(wTip, pt); ballAt(wMid, pm);
    wGh.forEach((g, k) => { ballAt(g, P(WO, WB - 8, wTh(t - 0.15 * (k + 1)))); M.hide(g, t - 0.15 * (k + 1) < tWrun); });
    const gu = M.o3((t - wt('W5', 'equals')) / 0.5); vArrow(wAT, pt, th, 120 * gu, 12); vArrow(wAM, pm, th, 60 * gu, 10);
    { const e = P(WO, WB + 34, th); attr(wTl, 'x', e[0].toFixed(1)); attr(wTl, 'y', (e[1] + 6).toFixed(1)); wTl.style.opacity = M.clamp((t - wt('W2', 'tip')) / 0.3).toFixed(3); }
    [0, 1, 2].forEach(i => M.vis($('#wc' + i), t, tW[[0, 1, 3][i]] + 0.2, 1e9, POP));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'degrees') - 0.3, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'pi') - 0.2 });
    M.draw(tgB, t, tJn - 0.6, 0.4); M.draw(tgA, t, tJn - 0.3, 0.8); M.vis(tgL1, t, tJn, 1e9, FS); M.vis(tgL2, t, wt('X3', 'pi'), 1e9, FS);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
