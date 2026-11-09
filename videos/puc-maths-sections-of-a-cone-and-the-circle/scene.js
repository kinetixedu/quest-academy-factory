// PUC Maths Ep 74: Sections of a cone and the circle (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: alpha teal, beta violet, cutting plane and the curve coral (accent), generator blue,
// centre (h, k) violet, radius r blue, across (x - h) orange, up (y - k) gold
const AL = C.teal, BE = C.violet, RC = C.ac, GB = '#2F6FEB', CE = C.violet, RB = '#2F6FEB', OR = C.orange, GD = C.gold;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const col = c => s => `\\textcolor{${c}}{${s}}`;
const al = col(AL), be = col(BE), rc = col(RC), xc = col(CE), b = col(RB), o = col(OR), gd = col(GD), red = col(C.red);
const why = s => `<span class="why2">&nbsp; ${s}</span>`;
const HALO = { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' };
const ital = (p, x, y, s, fill, size = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': size, fill }, a));
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); g.c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); return g; };
const fade = (el, t, t0, d = 0.4, to = 1) => { el.style.opacity = (to * M.io((t - t0) / d)).toFixed(3); M.hide(el, t < t0); };
const cpath = (cx, cy, r) => `M${cx + r},${cy} A${r},${r} 0 1 1 ${cx - r},${cy} A${r},${r} 0 1 1 ${cx + r},${cy}`;
// small plane: axes through O (px), unit s px
const axes = (svg, O, x0, x1, y0, y1, lab = true) => { const g = mk(svg, 'g', {});
  mk(g, 'line', { x1: x0, y1: O[1], x2: x1, y2: O[1], stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${x1 + 6},${O[1]} l-13,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: O[0], y1: y0, x2: O[0], y2: y1, stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${O[0]},${y1 - 6} l-7,13 h14 z`, fill: C.ink });
  if (lab) { ital(g, x1 + 4, O[1] + 30, 'x', C.ink2, 22); ital(g, O[0] - 24, y1 + 4, 'y', C.ink2, 22); txt(g, O[0] - 10, O[1] + 24, 'O', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }); }
  return g; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tC1 = T0('C1'), tS1 = T0('S1'), tS7 = T0('S7'), tT = T0('T1'), tD1 = T0('D1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['CUT STRAIGHT ACROSS', 'a circle'], ['TILT THE KNIFE', 'an oval'], ['TILT IT MORE', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'straight'), wt('H2', 'oval'), wt('H2', 'more')];

/* ---------- H: one cone, four cuts ---------- */
const hs = $('#hS');
mk(hs, 'path', { d: 'M96,196 A94,94 0 0 1 284,196 Z', fill: '#FBE1D8', stroke: '#E9A891', 'stroke-width': 3 });
mk(hs, 'path', { d: 'M96,196 L284,196 L190,532 Z', fill: '#F4DDB0', stroke: '#C99A4A', 'stroke-width': 3, 'stroke-linejoin': 'round' });
[[130, 196, 214, 400], [170, 196, 246, 300], [250, 196, 166, 400], [210, 196, 134, 300]].forEach(([a, b1, c, d]) => mk(hs, 'line', { x1: a, y1: b1, x2: c, y2: d, stroke: '#D8B36E', 'stroke-width': 2 }));
const CUTS = [[66, 290, 314, 290], [66, 250, 314, 344], [146, 160, 240, 500], [226, 150, 226, 500]];
const hCut = CUTS.map(([x1, y1, x2, y2], i) => { const l = mk(hs, 'line', { x1, y1, x2, y2, stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const g = dotG(hs, x1 - (i < 2 ? 18 : 0), y1 - (i < 2 ? 0 : 16), 14, RC); txt(g, 0, 6, i + 1, { 'text-anchor': 'middle', fill: '#fff', 'font-size': 16, 'font-weight': 700 }); return { l, g }; });
const TL = [[360, 76], [564, 76], [360, 316], [564, 316]];
const par = (cx, cy) => { let d = ''; for (let i = 0; i <= 40; i++) { const dx = -62 + i * 3.1; d += (i ? 'L' : 'M') + (cx + dx).toFixed(1) + ',' + (cy + 48 - dx * dx / 42).toFixed(1); } return d; };
const hyp = (cx, cy) => { let d = ''; for (let i = 0; i <= 40; i++) { const dx = -66 + i * 3.3; d += (i ? 'L' : 'M') + (cx + dx).toFixed(1) + ',' + (cy + 50 - 1.25 * (Math.sqrt(dx * dx + 64) - 8)).toFixed(1); } return d; };
const NM = ['circle', 'ellipse', 'parabola', 'hyperbola'];
const hTile = TL.map(([x, y], i) => { const g = mk(mk(hs, 'g', {}), 'g', {}); mk(g, 'rect', { x, y, width: 188, height: 224, rx: 14, fill: C.soft });
  txt(g, x + 16, y + 30, `CUT ${i + 1}`, { 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.5 });
  const cx = x + 94, cy = y + 112;
  const d = [cpath(cx, cy, 50), `M${cx + 72},${cy} A72,42 0 1 1 ${cx - 72},${cy} A72,42 0 1 1 ${cx + 72},${cy}`, par(cx, cy), hyp(cx, cy)][i];
  const p = mk(g, 'path', { d, fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
  const n = txt(g, cx, y + 206, NM[i], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: RC });
  return { g, p, n }; });
const tCut = i => tMorph + 0.5 + i * 0.55;

/* ---------- C: spin the generator ---------- */
const cs = $('#cS'), V = [392, 300], CH = 200, TA = Math.tan(Math.PI / 6), CR = CH * TA, RY = 29;
const nFill = [mk(cs, 'path', { d: `M${V[0]},${V[1]} L${V[0] - CR},${V[1] - CH} A${CR},${RY} 0 0 0 ${V[0] + CR},${V[1] - CH} Z`, fill: '#E7EEFD' }),
  mk(cs, 'path', { d: `M${V[0]},${V[1]} L${V[0] - CR},${V[1] + CH} A${CR},${RY} 0 0 0 ${V[0] + CR},${V[1] + CH} Z`, fill: '#E7EEFD' })];
const cAx = mk(cs, 'line', { x1: V[0], y1: 66, x2: V[0], y2: 540, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '9 7' });
const cAxL = ital(cs, V[0] + 14, 566, 'l', C.ink, 26); const cAxT = txt(cs, V[0] + 34, 566, 'axis', { 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const sil = [mk(cs, 'line', { x1: V[0] - CR, y1: V[1] - CH, x2: V[0] + CR, y2: V[1] + CH, stroke: GB, 'stroke-width': 2.5 }), mk(cs, 'line', { x1: V[0] + CR, y1: V[1] - CH, x2: V[0] - CR, y2: V[1] + CH, stroke: GB, 'stroke-width': 2.5 })];
const rimT = mk(cs, 'path', { fill: 'none', stroke: GB, 'stroke-width': 2.5 }), rimB = mk(cs, 'path', { fill: 'none', stroke: GB, 'stroke-width': 2.5 });
const cGen = mk(cs, 'line', { stroke: GB, 'stroke-width': 6, 'stroke-linecap': 'round' });
const cGenL = ital(cs, 0, 0, 'm', GB, 26, HALO);
const cAl = mk(cs, 'path', { d: `M${V[0]},${V[1] - 64} A64,64 0 0 1 ${V[0] + 64 * Math.sin(Math.PI / 6)},${V[1] - 64 * Math.cos(Math.PI / 6)}`, fill: 'none', stroke: AL, 'stroke-width': 3.5 });
const cAlT = ital(cs, V[0] + 14, V[1] - 76, 'α', AL, 26);
const cV = dotG(cs, V[0], V[1], 8, C.ink); const cVT = ital(cs, V[0] + 16, V[1] + 30, 'V', C.ink, 26);
const cNp = [txt(cs, V[0] - 160, V[1] - 150, 'upper nappe', { 'text-anchor': 'end', 'font-size': 18, fill: GB, 'font-weight': 600 }), txt(cs, V[0] - 160, V[1] + 162, 'lower nappe', { 'text-anchor': 'end', 'font-size': 18, fill: GB, 'font-weight': 600 })];
const genAt = phi => { const c = Math.cos(phi), s = Math.sin(phi); return [V[0] + CR * c, V[1] - CH + RY * s, V[0] - CR * c, V[1] + CH - RY * s]; };
const rimD = (phi, top) => { let d = ''; const n = Math.max(2, Math.ceil(phi / 0.05)); for (let i = 0; i <= n; i++) { const q = phi * i / n, x = top ? V[0] + CR * Math.cos(q) : V[0] - CR * Math.cos(q), y = top ? V[1] - CH + RY * Math.sin(q) : V[1] + CH - RY * Math.sin(q); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const tSpin0 = wt('C3', 'Spin'), tSpin1 = T1('C3') - 0.1;
const coneIc = `<svg width="40" height="44" viewBox="0 0 40 44"><path d="M6 2 L34 2 L20 22 Z M6 42 L34 42 L20 22 Z" fill="#E7EEFD" stroke="${GB}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
const CPT = [[K('l'), 'Axis', 'THE STICK STANDING UP'], [K('V'), 'Vertex', 'WHERE THE STICKS CROSS'], [K(`\\textcolor{${GB}}{m}`), 'Generator', 'THE SPINNING STICK'], [coneIc, 'Nappes', 'THE TWO CONES, TIP TO TIP']];
$('#cR').innerHTML = CPT.map(([s, n, e], i) => `<div class="ss" id="cr${i}" style="top:${84 + i * 100}px;height:88px"><div class="sy" style="top:12px">${s}</div><div class="sn" style="top:12px">${n}</div><div class="se" style="top:52px">${e}</div></div>`).join('');
const tCr = [wt('C1', 'axis'), wt('C4', 'vertex'), wt('C4', 'generator'), wt('C4', 'nappe')];
const avA = PUC.avatar($('#sC'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two cones, tip to tip. Like an hourglass!' });

/* ---------- S: tilt the plane (live beta) ---------- */
const ss = $('#slS'), SV = [392, 312], SH = 168, SR = SH * TA, PV = [392, 396];
mk(ss, 'path', { d: `M${SV[0]},${SV[1]} L${SV[0] - SR},${SV[1] - SH} L${SV[0] + SR},${SV[1] - SH} Z`, fill: '#E7EEFD' });
mk(ss, 'path', { d: `M${SV[0]},${SV[1]} L${SV[0] - SR},${SV[1] + SH} L${SV[0] + SR},${SV[1] + SH} Z`, fill: '#E7EEFD' });
mk(ss, 'line', { x1: SV[0], y1: 132, x2: SV[0], y2: 548, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '9 7' });
const SEGS = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => { mk(ss, 'line', { x1: SV[0], y1: SV[1], x2: SV[0] + sx * SR, y2: SV[1] + sy * SH, stroke: GB, 'stroke-width': 3 }); return [SV[0] + sx * SR, SV[1] + sy * SH]; });
mk(ss, 'path', { d: `M${SV[0]},${SV[1] - 54} A54,54 0 0 1 ${SV[0] + 54 * 0.5},${SV[1] - 54 * 0.866}`, fill: 'none', stroke: AL, 'stroke-width': 3.5 });
ital(ss, SV[0] + 12, SV[1] - 64, 'α', AL, 24);
mk(ss, 'circle', { cx: SV[0], cy: SV[1], r: 6, fill: C.ink }); ital(ss, SV[0] - 30, SV[1] + 8, 'V', C.ink, 22);
const sBand = mk(ss, 'line', { stroke: RC, 'stroke-width': 26, 'stroke-linecap': 'round', opacity: 0.16 });
const sPl = mk(ss, 'line', { stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const sPlT = txt(ss, 0, 0, 'plane', { 'font-size': 18, fill: RC, 'font-weight': 600, ...HALO });
const sBa = mk(ss, 'path', { fill: 'none', stroke: BE, 'stroke-width': 3.5 }); const sBaT = ital(ss, 0, 0, 'β', BE, 24, HALO);
const sHit = [0, 1, 2, 3].map(() => mk(ss, 'circle', { r: 8, fill: RC, stroke: '#fff', 'stroke-width': 3 }));
$('#sA').innerHTML = `<i style="font-family:Poppins;font-style:italic">α</i>&nbsp;= 30°`;
const BX = [44, 740, 126, 552];
const plane = beta => { const r = beta * Math.PI / 180, u = [Math.sin(r), -Math.cos(r)]; let s0 = -1e9, s1 = 1e9;
  [[0, BX[0], BX[1]], [1, BX[2], BX[3]]].forEach(([k, lo, hi]) => { if (Math.abs(u[k]) < 1e-9) return; let a = (lo - PV[k]) / u[k], c = (hi - PV[k]) / u[k]; if (a > c) [a, c] = [c, a]; s0 = Math.max(s0, a); s1 = Math.min(s1, c); });
  return { u, p: [PV[0] + u[0] * s0, PV[1] + u[1] * s0], q: [PV[0] + u[0] * s1, PV[1] + u[1] * s1] }; };
const hits = (u) => SEGS.map(E => { const d = [E[0] - SV[0], E[1] - SV[1]], den = u[0] * (-d[1]) + u[1] * d[0]; if (Math.abs(den) < 1e-6) return null;
  const w = [SV[0] - PV[0], SV[1] - PV[1]], s = (w[0] * (-d[1]) + w[1] * d[0]) / den, v = (u[0] * w[1] - u[1] * w[0]) / den; return v >= 0 && v <= 1 ? [PV[0] + u[0] * s, PV[1] + u[1] * s] : null; });
const tB = [wt('S3', 'Tilt'), wt('S4', 'equals'), wt('S5', 'smaller')];
const betaAt = t => 90 - 30 * M.io((t - tB[0]) / 1.4) - 30 * M.io((t - tB[1]) / 1.4) - 15 * M.io((t - tB[2]) / 1.2);
// face-on view of the slice: focus-directrix form r = p / (1 - e cos th), e = cos(beta) / cos(alpha)
const sr = $('#srS'); const clip = mk(mk(sr, 'defs', {}), 'clipPath', { id: 'srClip' }); mk(clip, 'rect', { x: 24, y: 150, width: 736, height: 410, rx: 8 });
const sg = mk(sr, 'g', { 'clip-path': 'url(#srClip)' });
mk(sg, 'line', { x1: 24, y1: 355, x2: 760, y2: 355, stroke: '#ECEEF2', 'stroke-width': 2 });
const sCv = mk(sg, 'path', { fill: 'none', stroke: RC, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const sCv2 = mk(sg, 'path', { fill: 'none', stroke: RC, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const ss3 = u => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const conic = e => { const S = 120 / (1 + 5 * Math.max(0, e - 0.45)), cy = 355; let vx;
  if (e < 1 - 1e-6) vx = Math.max(110, 392 - S / (1 - e * e));
  else if (e <= 1 + 1e-6) vx = 110;
  else { const w = ss3((e - 1) / 0.115); vx = 110 + (392 + S / (e * e - 1) - 110) * w; }
  const fx = vx + S / (1 + e); let d1 = '', d2 = '', p1 = false, p2 = false;
  for (let i = 0; i <= 720; i++) { const th = i / 720 * 2 * Math.PI, den = 1 - e * Math.cos(th), r = S / den;
    const ok = Math.abs(r) < 3000, x = fx + r * Math.cos(th), y = cy + r * Math.sin(th);
    if (den > 0.002 && ok) { d1 += (p1 ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); p1 = true; } else p1 = false;
    if (den < -0.002 && ok) { d2 += (p2 ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); p2 = true; } else p2 = false; }
  return [d1, d2]; };
const NAMES = [['CIRCLE', 'β = 90°'], ['ELLIPSE', 'α < β < 90°'], ['PARABOLA', 'β = α'], ['HYPERBOLA', 'β < α']];
let sLast = '';
const th1 = PUC.think($('#th1'), { q: 'Keep β = 90°, but the plane passes through V. The slice?', opts: ['A small circle', 'A single point'], right: 1, why: 'The circle shrinks to nothing. Through V: a point, a line, or two crossing lines.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = 'circle · ellipse · parabola · hyperbola';

/* ---------- D: circle definition, live run ---------- */
$('#dfC').innerHTML = 'A compass keeps the pencil the same distance from its sharp point.';
$('#dP1').innerHTML = `<span style="width:16px;height:16px;border-radius:50%;background:${CE}"></span>Fixed point: the centre`;
$('#dP2').innerHTML = `<span style="width:28px;height:5px;border-radius:3px;background:${RB}"></span>Fixed distance: the radius <i style="font-family:Poppins;color:${RB}">r</i>`;
const ds = $('#dS'), DC = [392, 290], DU = 34, DRr = 5 * DU;
mk(ds, 'circle', { cx: DC[0], cy: DC[1], r: DRr, fill: 'none', stroke: '#ECEEF2', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dTr = mk(ds, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dRad = mk(ds, 'line', { x1: DC[0], y1: DC[1], stroke: RB, 'stroke-width': 4, 'stroke-linecap': 'round' }); const dRadT = ital(ds, 0, 0, 'r', RB, 26, HALO);
const dLeg1 = mk(ds, 'line', { stroke: '#6B7489', 'stroke-width': 8, 'stroke-linecap': 'round' }), dLeg2 = mk(ds, 'line', { stroke: '#6B7489', 'stroke-width': 8, 'stroke-linecap': 'round' });
const dHand = mk(ds, 'line', { stroke: C.ink2, 'stroke-width': 8, 'stroke-linecap': 'round' }); const dHinge = mk(ds, 'circle', { r: 10, fill: C.ink });
const dCg = dotG(ds, DC[0], DC[1], 9, CE); const dCt = txt(ds, DC[0] - 16, DC[1] + 34, 'C (2, 1)', { 'text-anchor': 'end', 'font-size': 20, fill: CE, 'font-weight': 600, ...HALO });
const dP = mk(ds, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 }); const dPt = ital(ds, 0, 0, 'P', RC, 24, HALO);
const dRo1 = txt(ds, 44, 540, '', { 'font-size': 26, fill: C.ink, 'font-weight': 600 }), dRo2 = txt(ds, 740, 540, 'CP = 5.00', { 'text-anchor': 'end', 'font-size': 26, fill: RB, 'font-weight': 600 });
const tRun = wt('D2', 'Turn'), TH0 = 0.6, thAt = t => TH0 - 2 * Math.PI * Math.max(0, t - tRun) / 9;
let dLast = '';

/* ---------- R: derivation ---------- */
const rsol = PUC.solution($('#rl'), [
  [K(`\\text{across} = ${o('x - h')}`)],
  [K(`\\text{up} = ${gd('y - k')}`)],
  [K(`${o('\\text{across}')}^2 + ${gd('\\text{up}')}^2 = ${b('r')}^2`) + why('Pythagoras')],
  [K(`(${o('x - h')})^2 + (${gd('y - k')})^2 = ${b('r')}^2`)],
  [K(`\\text{centre } (0, 0):\\ \\ x^2 + y^2 = ${b('r')}^2`)]], { label: 'THE EQUATION · STEP BY STEP', y0: 104, dy: 92 });
const tRs = [wt('R2', 'Across', 1), wt('R3', 'Up', 1), wt('R4', 'Pythagoras'), wt('R5', 'equation'), wt('R6', 'origin')];
const rs = $('#rS'), RO0 = [130, 488], RCc = [392, 300], RRr = 160, RA = 40 * Math.PI / 180, RP = [RCc[0] + RRr * Math.cos(RA), RCc[1] - RRr * Math.sin(RA)];
const rClip = mk(mk(rs, 'defs', {}), 'clipPath', { id: 'rClipA' }); mk(rClip, 'rect', { x: 20, y: 64, width: 744, height: 500 });
const rAxG = mk(mk(mk(rs, 'g', { 'clip-path': 'url(#rClipA)' }), 'g', {}), 'g', {}); axes(rAxG, [0, 0], -70, 610, 70, -420);
const rCirc = mk(rs, 'path', { d: cpath(RCc[0], RCc[1], RRr), fill: 'none', stroke: RC, 'stroke-width': 5 });
const rCircF = mk(rs, 'circle', { cx: RCc[0], cy: RCc[1], r: RRr, fill: 'none', stroke: '#F3D0C4', 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const rAc = mk(rs, 'line', { x1: RCc[0], y1: RCc[1], x2: RP[0], y2: RCc[1], stroke: OR, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rUp = mk(rs, 'line', { x1: RP[0], y1: RCc[1], x2: RP[0], y2: RP[1], stroke: GD, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rHy = mk(rs, 'line', { x1: RCc[0], y1: RCc[1], x2: RP[0], y2: RP[1], stroke: RB, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rSq = mk(rs, 'path', { d: `M${RP[0] - 18},${RCc[1]} v-18 h18`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 });
const rAcT = txt(rs, (RCc[0] + RP[0]) / 2, RCc[1] + 32, 'x - h', { 'text-anchor': 'middle', 'font-size': 22, fill: OR, 'font-weight': 600, ...HALO });
const rUpT = txt(rs, RP[0] + 14, (RCc[1] + RP[1]) / 2 + 8, 'y - k', { 'font-size': 22, fill: GD, 'font-weight': 600, ...HALO });
const rHyT = ital(rs, (RCc[0] + RP[0]) / 2 - 26, (RCc[1] + RP[1]) / 2 - 8, 'r', RB, 26, HALO);
const rCg = dotG(rs, RCc[0], RCc[1], 9, CE); const rCt = txt(rs, RCc[0] - 14, RCc[1] - 16, 'C (h, k)', { 'text-anchor': 'end', 'font-size': 20, fill: CE, 'font-weight': 600, ...HALO });
const rPg = dotG(rs, RP[0], RP[1], 10, RC, '#fff'); const rPt = txt(rs, RP[0] + 16, RP[1] - 14, 'P (x, y)', { 'font-size': 20, fill: RC, 'font-weight': 600, ...HALO });
const tR6 = wt('R6', 'origin') - 0.1;
let rLast = -1;

/* ---------- K: read the centre vs read the radius ---------- */
$('#kF').innerHTML = K(`(x ${o('- 2')})^2 + (y ${gd('+ 3')})^2 = ${b('16')}`); $('#kF').style.top = '86px';
$('#kr0').innerHTML = K(`x ${o('- 2')}`) + `<span class="why2">gives</span>` + K(`h = ${xc('+2')}`);
$('#kr1').innerHTML = K(`y ${gd('+ 3')}`) + `<span class="why2">gives</span>` + K(`k = ${xc('-3')}`);
$('#kP').innerHTML = 'Centre (2, -3)';
$('#kR').innerHTML = K(`r^2 = ${b('16')} \\;\\Rightarrow\\; r = ${b('4')}`) + `<span style="color:var(--red);text-decoration:line-through;margin-left:10px">r = 16</span>`;
const ks = $('#kS'), KO = [290, 196], KU = 28, KC = [KO[0] + 2 * KU, KO[1] + 3 * KU];
axes(ks, KO, 80, 700, 448, 92);
const kCirc = mk(ks, 'path', { d: cpath(KC[0], KC[1], 4 * KU), fill: 'none', stroke: RC, 'stroke-width': 5 });
const kRad = mk(ks, 'line', { x1: KC[0], y1: KC[1], x2: KC[0] + 4 * KU, y2: KC[1], stroke: RB, 'stroke-width': 4, 'stroke-linecap': 'round' }); const kRadT = txt(ks, KC[0] + 2 * KU, KC[1] - 12, '4', { 'text-anchor': 'middle', 'font-size': 22, fill: RB, 'font-weight': 700, ...HALO });
const kCg = dotG(ks, KC[0], KC[1], 8, CE); const kCt = txt(ks, KC[0] - 12, KC[1] + 30, '(2, -3)', { 'text-anchor': 'end', 'font-size': 20, fill: CE, 'font-weight': 600, ...HALO });
const th2 = PUC.think($('#th2'), { q: `${K(`x^2 + (y - 5)^2 = 9`)}: centre and radius?`, opts: ['(0, 5), radius 3', '(0, -5), radius 9'], right: 0, why: 'x² is (x - 0)², so the centre is (0, 5). And 9 = 3², so the radius is 3.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = K(`x^2 + y^2 ${o('- 6x')} ${gd('+ 4y')} - 12 = 0`);
const wsol = PUC.solution($('#wl'), [
  [K(`(x^2 ${o('- 6x')}) + (y^2 ${gd('+ 4y')}) = 12`)],
  [K(`(x^2 - 6x ${o('+ 9')}) + (y^2 + 4y ${gd('+ 4')}) = 12 ${o('+ 9')} ${gd('+ 4')}`)],
  [K(`(x ${o('- 3')})^2 + (y ${gd('+ 2')})^2 = ${b('25')}`)],
  [K(`\\text{centre } ${xc('(3, -2)')},\\ \\ \\text{radius } ${b('5')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Group'), wt('W4', 'Complete'), wt('W5', 'gives'), wt('W6', 'centre')];
const ws = $('#wS'), WO = [240, 226], WU = 34, WC = [WO[0] + 3 * WU, WO[1] + 2 * WU];
axes(ws, WO, 64, 722, 528, 84);
const wCirc = mk(ws, 'path', { d: cpath(WC[0], WC[1], 5 * WU), fill: 'none', stroke: RC, 'stroke-width': 5 });
const wRad = mk(ws, 'line', { x1: WC[0], y1: WC[1], x2: WC[0] + 5 * WU * 0.8, y2: WC[1] - 5 * WU * 0.6, stroke: RB, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wRadT = txt(ws, WC[0] + 2 * WU * 0.8 + 6, WC[1] - 2.5 * WU * 0.6 - 14, '5', { 'font-size': 24, fill: RB, 'font-weight': 700, ...HALO });
const wCg = dotG(ws, WC[0], WC[1], 9, CE); const wCt = txt(ws, WC[0] - 14, WC[1] + 32, '(3, -2)', { 'text-anchor': 'end', 'font-size': 20, fill: CE, 'font-weight': 600, ...HALO });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`x^2 - 4x ${o('+ 4')} + y^2 = 0 \\;\\Rightarrow\\; \\text{a point}`), right: K(`x^2 - 4x ${o('+ 4')} + y^2 = ${o('4')} \\;\\Rightarrow\\; (2, 0),\\ r = 2`) });
const ts = $('#tS'), TO = [150, 170], TU = 40;
axes(ts, TO, 40, 520, 250, 50);
const tCirc = mk(ts, 'path', { d: cpath(TO[0] + 2 * TU, TO[1], 2 * TU), fill: 'none', stroke: RC, 'stroke-width': 4 });
const tPt = mk(ts, 'circle', { cx: TO[0] + 2 * TU, cy: TO[1], r: 9, fill: C.red });
const tPtT = txt(ts, TO[0] + 2 * TU, TO[1] - 20, 'a point?', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600, ...HALO });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: "Find the centre and radius from a circle's equation, then use them in a bigger question." });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'A circle touches both coordinate axes and passes through the point (2, 1). The sum of all its possible radii is',
  opts: ['4', '5', '6', '7'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{touches both axes} \\Rightarrow C(r, r)`)], [K(`(2 - r)^2 + (1 - r)^2 = r^2`)], [K(`r^2 - 6r + 5 = 0`)], [K(`r = 1 \\ \\text{or}\\ r = 5`)], [K(`1 + 5 = 6`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'touching'), wt('A3', 'passes'), wt('A4', 'tidies'), wt('A4', 'one'), wt('A4', 'sum')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · conic sections and the circle', y0: 96, dy: 76, txt: [1, 1, 1, 0, 1],
  lines: ['<b>β = 90°</b> circle &nbsp;·&nbsp; <b>α &lt; β &lt; 90°</b> ellipse',
    '<b>β = α</b> parabola &nbsp;·&nbsp; <b>β &lt; α</b> hyperbola (both cones)',
    '<b>Circle</b>: every point the same distance r from the centre',
    K(`(x - ${xc('h')})^2 + (y - ${xc('k')})^2 = ${b('r')}^2 \\qquad x^2 + y^2 = ${b('r')}^2`),
    '<b>Complete the square</b>: add the same number to both sides'] });
const YQ = ['Which slice of a cone gives a parabola?', 'Find the centre and radius of (x + 1)² + y² = 49.', 'Write the equation of the circle with centre (2, 0) and radius 3.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 75', topic: 'A cricket ball and a dish antenna share one curve: The Parabola', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tB[0] - 0.3, 1.04, 960, 560], [T1('S6'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const oo = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tC1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('C1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...oo });
    hCut.forEach((c, i) => { M.draw(c.l, t, tCut(i), 0.45); M.vis(c.g, t, tCut(i), 1e9, DOT); });
    hTile.forEach((h, i) => { M.vis(h.g, t, tCut(i) + 0.15, 1e9, { dy: 14, fade: 0.15 }); M.draw(h.p, t, tCut(i) + 0.3, 0.6); M.vis(h.n, t, wt('H5', 'conic') + i * 0.18, 1e9, { dy: 8 }); });
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* C: build the cone */
  const cOn = t >= tC1 - 0.1 && t < tS1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('S1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.draw(cAx, t, wt('C1', 'Stand'), 0.7); M.vis(cAxL, t, wt('C1', 'axis') - 0.1, 1e9, { dy: 0 }); M.vis(cAxT, t, wt('C1', 'axis'), 1e9, { dy: 0 });
    const phi = 2 * Math.PI * M.io((t - tSpin0) / (tSpin1 - tSpin0)), g = genAt(phi);
    attr(cGen, 'x1', g[0].toFixed(1)); attr(cGen, 'y1', g[1].toFixed(1)); attr(cGen, 'x2', g[2].toFixed(1)); attr(cGen, 'y2', g[3].toFixed(1));
    M.vis(cGen, t, wt('C2', 'second'), 1e9, { dy: 0, fade: 0.2 });
    attr(cGenL, 'x', (g[0] + 14).toFixed(1)); attr(cGenL, 'y', (g[1] + 8).toFixed(1)); M.vis(cGenL, t, wt('C2', 'second') + 0.2, 1e9, { dy: 0 });
    M.vis(cV, t, wt('C2', 'V') - 0.05, 1e9, DOT); M.vis(cVT, t, wt('C2', 'V'), 1e9, { dy: 0 });
    M.draw(cAl, t, wt('C2', 'angle'), 0.5); M.vis(cAlT, t, wt('C2', 'alpha') - 0.1, 1e9, { dy: 0 });
    attr(rimT, 'd', rimD(Math.max(0.001, phi), true)); attr(rimB, 'd', rimD(Math.max(0.001, phi), false)); M.hide(rimT, t < tSpin0); M.hide(rimB, t < tSpin0);
    sil.forEach((s, i) => fade(s, t, wt('C4', 'two') + i * 0.15, 0.4));
    nFill.forEach((f, i) => fade(f, t, wt('C4', 'tip') + i * 0.2, 0.5, 0.9));
    cNp.forEach((n, i) => M.vis(n, t, wt('C4', 'nappe') + i * 0.15, 1e9, { dy: 0 }));
    M.vis($('#cr'), t, wt('C1', 'Stand') - 0.1, out, { dx: 60, dy: 0, ...oo });
    tCr.forEach((tt, i) => M.vis($('#cr' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    avA(t, T1('C4') - 1.6, out);
  }

  /* S: tilt the plane */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S7');
    M.vis($('#sl'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    const beta = betaAt(t), P = plane(beta), on = t >= wt('S1', 'plane') - 0.1;
    [sPl, sBand].forEach(l => { attr(l, 'x1', P.p[0].toFixed(1)); attr(l, 'y1', P.p[1].toFixed(1)); attr(l, 'x2', P.q[0].toFixed(1)); attr(l, 'y2', P.q[1].toFixed(1)); });
    M.vis(sPl, t, wt('S1', 'plane') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(sBand, t, wt('S1', 'plane'), 1e9, { dy: 0, fade: 0.25 });
    attr(sPlT, 'x', (P.q[0] - (P.u[0] > 0.6 ? 70 : 0) - 8).toFixed(1)); attr(sPlT, 'y', (P.q[1] + (P.u[0] > 0.6 ? -18 : 22)).toFixed(1)); attr(sPlT, 'text-anchor', 'end'); M.vis(sPlT, t, wt('S1', 'sheet'), 1e9, { dy: 0 });
    const br = beta * Math.PI / 180, R = 56;
    attr(sBa, 'd', `M${PV[0]},${PV[1] - R} A${R},${R} 0 0 1 ${(PV[0] + R * Math.sin(br)).toFixed(1)},${(PV[1] - R * Math.cos(br)).toFixed(1)}`);
    attr(sBaT, 'x', (PV[0] + 82 * Math.sin(br / 2) - 6).toFixed(1)); attr(sBaT, 'y', (PV[1] - 82 * Math.cos(br / 2) + 8).toFixed(1));
    M.vis(sBa, t, wt('S1', 'Beta'), 1e9, { dy: 0, fade: 0.2 }); M.vis(sBaT, t, wt('S1', 'Beta') + 0.1, 1e9, { dy: 0 });
    const H = hits(P.u); sHit.forEach((c, i) => { const h = H[i]; if (h && on) { attr(c, 'cx', h[0].toFixed(1)); attr(c, 'cy', h[1].toFixed(1)); } M.hide(c, !(h && on && t >= wt('S1', 'plane') + 0.3)); });
    $('#sB').innerHTML = `<i style="font-family:Poppins;color:${BE}">β</i> = ${Math.round(beta)}°`;
    M.vis($('#sB'), t, wt('S1', 'Beta') - 0.05, 1e9, { dy: 10 }); M.vis($('#sA'), t, wt('S1', 'axis'), 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...oo });
    const e = Math.cos(br) / Math.cos(Math.PI / 6), [d1, d2] = conic(Math.abs(beta - 30) < 0.05 ? 1 : e);
    if (d1 + d2 !== sLast) { sLast = d1 + d2; attr(sCv, 'd', d1); attr(sCv2, 'd', d2); sCv._L = null; }
    const tC = wt('S2', 'circle') - 0.3; if (t < tC + 0.9) M.draw(sCv, t, tC, 0.8); else { sCv.style.strokeDasharray = 'none'; sCv.style.strokeDashoffset = '0'; M.hide(sCv, false); }
    M.hide(sCv2, !d2);
    const ni = beta > 89.5 ? 0 : beta > 30.5 ? 1 : beta > 29.5 ? 2 : 3;
    $('#sName').innerHTML = `${NAMES[ni][0]}<i>${NAMES[ni][1]}</i>`; M.vis($('#sName'), t, wt('S2', 'circle'), 1e9, POP);
    M.vis($('#th1'), t, tS7 + 0.05, OUT('T1'), { dy: 36, ...oo });
    th1(t, { tin: tS7, tOpts: wt('S7', 'What') - 0.1, tCount: T1('S7') + 0.05, dur: 3, tAns: T0('S8') - 0.02, tWhy: wt('S8', 'circle') });
  }

  /* statement */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'circle') - 0.1, 2.4);
  }

  /* D: definition + live run */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.rise($('#dfC'), t, wt('D2', 'compass'), { st: 0.04 }); M.rise($('#dfT'), t, wt('D3', 'circle') - 0.1, { st: 0.05, sp: M.HEAVY });
    const sd = $('#dfT b'); sd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('D3', 'same')) / 0.3)); sd.style.borderRadius = '8px';
    M.vis($('#dP1'), t, wt('D4', 'centre') - 0.1, 1e9, POP); M.vis($('#dP2'), t, wt('D4', 'radius') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const th = thAt(t), Px = DC[0] + DRr * Math.cos(th), Py = DC[1] - DRr * Math.sin(th), sweepA = TH0 - th;
    let d = ''; const n = Math.ceil(Math.min(sweepA, 2 * Math.PI) / 0.04); for (let i = 0; i <= n; i++) { const q = TH0 - Math.min(sweepA, 2 * Math.PI) * i / Math.max(1, n); d += (i ? 'L' : 'M') + (DC[0] + DRr * Math.cos(q)).toFixed(1) + ',' + (DC[1] - DRr * Math.sin(q)).toFixed(1); }
    attr(dTr, 'd', d); M.hide(dTr, t < tRun + 0.05);
    attr(dP, 'cx', Px.toFixed(1)); attr(dP, 'cy', Py.toFixed(1)); M.vis(dP, t, tRun - 0.2, 1e9, { dy: 0, fade: 0.2 });
    attr(dPt, 'x', (DC[0] + (DRr + 28) * Math.cos(th) - 8).toFixed(1)); attr(dPt, 'y', (DC[1] - (DRr + 28) * Math.sin(th) + 9).toFixed(1)); M.vis(dPt, t, tRun, 1e9, { dy: 0 });
    M.vis(dCg, t, tRun - 0.3, 1e9, DOT); M.vis(dCt, t, wt('D4', 'centre'), 1e9, { dy: 0 });
    const mx = (DC[0] + Px) / 2, my = (DC[1] + Py) / 2, ux = (Px - DC[0]) / DRr, uy = (Py - DC[1]) / DRr, hx = mx - uy * 110, hy = my + ux * 110;
    attr(dLeg1, 'x1', DC[0]); attr(dLeg1, 'y1', DC[1]); attr(dLeg1, 'x2', hx.toFixed(1)); attr(dLeg1, 'y2', hy.toFixed(1));
    attr(dLeg2, 'x1', Px.toFixed(1)); attr(dLeg2, 'y1', Py.toFixed(1)); attr(dLeg2, 'x2', hx.toFixed(1)); attr(dLeg2, 'y2', hy.toFixed(1));
    attr(dHand, 'x1', hx.toFixed(1)); attr(dHand, 'y1', hy.toFixed(1)); attr(dHand, 'x2', (hx - uy * 34).toFixed(1)); attr(dHand, 'y2', (hy + ux * 34).toFixed(1));
    attr(dHinge, 'cx', hx.toFixed(1)); attr(dHinge, 'cy', hy.toFixed(1));
    const cOut = wt('D4', 'centre') - 0.2; [dLeg1, dLeg2, dHand, dHinge].forEach(el => M.vis(el, t, tRun - 0.3, cOut, { dy: 0, fade: 0.25, outDur: 0.3, ody: 0 }));
    attr(dRad, 'x2', Px.toFixed(1)); attr(dRad, 'y2', Py.toFixed(1)); M.vis(dRad, t, wt('D4', 'radius') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    attr(dRadT, 'x', (mx + uy * 22 - 7).toFixed(1)); attr(dRadT, 'y', (my - ux * 22 + 9).toFixed(1)); M.vis(dRadT, t, wt('D4', 'radius'), 1e9, { dy: 0 });
    const s = `P = (${(2 + 5 * Math.cos(th)).toFixed(2)}, ${(1 + 5 * Math.sin(th)).toFixed(2)})`; if (s !== dLast) { dLast = s; M.setT(dRo1, s); }
    M.vis(dRo1, t, tRun + 0.2, 1e9, { dy: 0 }); M.vis(dRo2, t, wt('D2', 'same'), 1e9, { dy: 0 });
  }

  /* R: derivation */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...oo }); rsol(t, tR1, tRs);
    const cur = tRs.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, -1);
    const hb = $('#rHi'); M.vis(hb, t, tRs[0] - 0.15, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (104 + Math.max(0, cur) * 92 - 18) + 'px';
    M.vis($('#rr'), t, tR1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const m = M.io((t - tR6) / 0.9), ox = RO0[0] + (RCc[0] - RO0[0]) * m, oy = RO0[1] + (RCc[1] - RO0[1]) * m;
    attr(rAxG.parentNode, 'transform', `translate(${ox.toFixed(1)},${oy.toFixed(1)})`); M.vis(rAxG, t, tR1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    M.vis(rCircF, t, tR1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    M.vis(rCg, t, wt('R1', 'centre'), 1e9, DOT); M.vis(rCt, t, wt('R1', 'h'), 1e9, { dy: 0 });
    M.vis(rPg, t, wt('R1', 'P', 2), 1e9, DOT); M.vis(rPt, t, wt('R1', 'P', 2) + 0.2, 1e9, { dy: 0 });
    M.draw(rAc, t, wt('R2', 'Walk'), 0.6); M.vis(rAcT, t, wt('R2', 'Across', 1), 1e9, { dy: 0 });
    M.draw(rUp, t, wt('R3', 'Walk'), 0.5); M.vis(rUpT, t, wt('R3', 'Up', 1), 1e9, { dy: 0 });
    M.draw(rHy, t, wt('R4', 'radius') - 0.1, 0.5); M.vis(rHyT, t, wt('R4', 'radius'), 1e9, { dy: 0 }); M.vis(rSq, t, wt('R4', 'right'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(rCirc, t, wt('R5', 'equation'), 1.4);
    const L = t >= tR6 + 0.45 ? 1 : 0; if (L !== rLast) { rLast = L; M.setT(rCt, L ? 'O (0, 0)' : 'C (h, k)'); M.setT(rAcT, L ? 'x' : 'x - h'); M.setT(rUpT, L ? 'y' : 'y - k'); }
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#kF'), t, tK1 + 0.3, 0.8);
    M.vis($('#kr0'), t, wt('K1', 'minus') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#kr1'), t, wt('K1', 'plus', 1) - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#kP'), t, wt('K1', 'three', 1), 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...oo });
    M.vis(kCg, t, T0('K2') + 0.2, 1e9, DOT); M.vis(kCt, t, T0('K2') + 0.3, 1e9, { dy: 0 });
    M.draw(kRad, t, wt('K2', 'Sixteen'), 0.4); M.vis(kRadT, t, wt('K2', 'four'), 1e9, { dy: 0 }); M.draw(kCirc, t, wt('K2', 'four') - 0.1, 1.0);
    M.vis($('#kR'), t, wt('K2', 'root') - 0.1, 1e9, { dy: 10 });
    M.vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...oo });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Centre') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'squared') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#wq'), t, T0('W2') + 0.3, 1.0); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.draw(wCirc, t, tWs[2], 1.4); M.vis(wCg, t, tWs[3], 1e9, DOT); M.vis(wCt, t, tWs[3] + 0.2, 1e9, { dy: 0 });
    M.draw(wRad, t, wt('W6', 'radius'), 0.5); M.vis(wRadT, t, wt('W6', 'five'), 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'real') - 0.2;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'add') - 0.1, tRight: wt('X3', 'Zero') });
    M.vis(tPt, t, wt('X2', 'point') - 0.2, 1e9, DOT); attr(tPt, 'fill', mix(C.red, CE, M.io((t - tR) / 0.3)));
    M.vis(tPtT, t, wt('X2', 'point'), tR, { dy: 0, outDur: 0.2, ody: 0 }); M.draw(tCirc, t, tR, 0.9);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'question') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
