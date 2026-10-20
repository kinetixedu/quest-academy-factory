// PUC Maths Ep 34: Double-angle and triple-angle identities (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible, Ch 3): angle x violet, sin coral (accent), cos blue, tan teal
const XC = C.violet, SN = C.ac, CS = '#2F6FEB', TN = '#0E8F8F';
const CSB = '#E7EEFD', SNB = C.ac2, GREY = '#8A90A0', IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const ml = (p, x, y, parts, size = 28, col = C.ink, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'KaTeX_Main', 'font-size': size, fill: col }, a));
  parts.forEach(([s, k, c]) => { const sp = document.createElementNS(nsv, 'tspan'); sp.textContent = s; if (k === 'i') { sp.setAttribute('font-family', 'KaTeX_Math'); sp.setAttribute('font-style', 'italic'); } if (c) sp.setAttribute('fill', c); e.appendChild(sp); }); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f = (col, s) => `\\textcolor{${col}}{${s}}`;
const X = f(XC, 'x');
const sx = f(SN, `\\sin ${X}`), cx = f(CS, `\\cos ${X}`), tx = f(TN, `\\tan ${X}`), s2x = f(SN, `\\sin 2${X}`), c2x = f(CS, `\\cos 2${X}`), t2x = f(TN, `\\tan 2${X}`);
const sx2 = f(SN, `\\sin^2 ${X}`), cx2 = f(CS, `\\cos^2 ${X}`), tx2 = f(TN, `\\tan^2 ${X}`), s3x = f(SN, `\\sin 3${X}`), c3x = f(CS, `\\cos 3${X}`), sx3 = f(SN, `\\sin^3 ${X}`), cx3 = f(CS, `\\cos^3 ${X}`);
const D2R = Math.PI / 180;
const pulse = (t, a, d = 0.9) => M.io((t - a) / 0.2) * (1 - M.io((t - a - d) / 0.35));
const arcD = (cx0, cy0, r, a0, a1) => { const p = a => [cx0 + r * Math.cos(a * D2R), cy0 - r * Math.sin(a * D2R)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${x1.toFixed(1)},${y1.toFixed(1)}`; };
const rows = (host, R, y0, dy, pre) => { host.innerHTML = R.map(([s, w], i) => `<div class="st" id="${pre}${i}" style="top:${y0 + i * dy}px"><div class="n">${i + 1}</div><div class="sx">${K(s)}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join(''); };
const runRows = (t, pre, n, ts, hb, y0, dy, hin, hout = 1e9) => {
  for (let i = 0; i < n; i++) { const el = $('#' + pre + i); M.vis(el.querySelector('.n'), t, ts[i] - 0.2, hout, { ...POP, sc: 0.4, outDur: 0.25, ody: 0 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.8, hout); const w = el.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.7, hout, { dx: 12, dy: 0, outDur: 0.25, ody: 0 }); }
  if (hb) { const y = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t); M.vis(hb, t, hin ?? ts[0] - 0.1, hout, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); hb.style.top = (y - 12).toFixed(1) + 'px'; }
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tG1 = T0('G1'), tL1 = T0('L1'), tC1 = T0('C1'), tK1 = T0('K1'), tK3 = T0('K3'), tR1 = T0('R1'), tR6 = T0('R6');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ANGLE 30°', `${f(SN, '\\sin 30^\\circ')} = 0.5`], ['DOUBLE IT: 60°', `${f(SN, '\\sin 60^\\circ')} = 1\\;?`]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${465 + i * 510}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'Sine') - 0.1, wt('H1', 'half') + 0.2];

/* ---------- H: table ---------- */
const HR = [['30°', '0.500', ''], ['60°', '0.866', '1.000'], ['120°', '0.866', '1.732']];
$('#hcs').innerHTML = `<div class="hh" style="left:36px">ANGLE</div><div class="hh" style="left:226px">SINE</div><div class="hh" style="left:476px">IF IT DOUBLED</div>` +
  HR.map(([a, s, d], i) => `<div class="hc" id="ha${i}" style="left:36px;top:${130 + i * 104}px;width:170px;background:#fff;color:${XC};border:2.5px solid ${XC}">${a}</div>
    <div class="hc" id="hs${i}" style="left:226px;top:${130 + i * 104}px;width:230px;color:${SN}">${s}</div>` + (d ? `<div class="hc" id="hd${i}" style="left:476px;top:${130 + i * 104}px;width:272px;background:${C.redBg};color:${C.red};text-decoration:line-through;text-decoration-thickness:3px">${d}</div>` : '')).join('') +
  `<div class="pillp bad" id="hP" style="left:36px;top:470px">The sine does not double</div>`;
const tHr = [tMorph + 0.3, wt('H2', 'sixty'), wt('H4', 'twenty')], tHs = [tMorph + 0.5, wt('H2', 'zero'), wt('H4', 'sine')], tHd = [0, wt('H2', 'one'), wt('H4', 'grow')];

/* ---------- P: algebra rows ---------- */
const PR = [[`\\sin(${X} + y) = ${sx}\\cos y + ${cx}\\sin y`, 'the sum formula'], [`y = ${X}:\\ \\ ${X} + y = 2${X}`, 'put y equal to x'],
  [`${s2x} = ${sx}${cx} + ${cx}${sx}`, 'two equal terms'], [`${s2x} = 2${sx}${cx}`, '']];
rows($('#pRows'), PR, 84, 112, 'pr');
const tPr = [wt('P1', 'Sin'), wt('P2', 'put'), wt('P3', 'sin'), wt('P3', 'same')];
const GR = [[`\\text{area} = \\tfrac12 \\cdot 1 \\cdot ${s2x}`, 'base 1, height sin 2x'], [`\\text{each half} = \\tfrac12\\, ${sx}${cx}`, 'a right triangle with sides cos x and sin x'],
  [`\\tfrac12\\, ${s2x} = 2 \\cdot \\tfrac12\\, ${sx}${cx}`, 'same triangle, same area'], [`${s2x} = 2${sx}${cx}`, '']];
rows($('#gRows'), GR, 84, 112, 'gr');
const tGr = [wt('G2', 'area'), wt('G4', 'Each'), wt('G4', 'Same'), wt('G4', 'So')];
// right: unit circle, angle 2x, the isosceles triangle cut in half
const ps = $('#pS'), OX = 392, OY = 470, RR = 290, PP = a => [OX + RR * Math.cos(a * D2R), OY - RR * Math.sin(a * D2R)];
mk(ps, 'line', { x1: OX - RR - 30, y1: OY, x2: OX + RR + 30, y2: OY, stroke: C.ink, 'stroke-width': 2 });
const pCir = mk(ps, 'path', { d: arcD(OX, OY, RR, 0, 180), fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const hA = mk(ps, 'polygon', { fill: CSB, stroke: 'none' }), hB = mk(ps, 'polygon', { fill: SNB, stroke: 'none' });
const tri = mk(ps, 'polygon', { fill: C.ac3, stroke: 'none' });
const rA = mk(ps, 'line', { x1: OX, y1: OY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }), rB = mk(ps, 'line', { x1: OX, y1: OY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const ch1 = mk(ps, 'line', { stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' }), ch2 = mk(ps, 'line', { stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' });
const bis = mk(ps, 'line', { x1: OX, y1: OY, stroke: CS, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hgt = mk(ps, 'line', { y1: OY, stroke: SN, 'stroke-width': 3.5, 'stroke-dasharray': '8 6' });
const aX1 = mk(ps, 'path', { fill: 'none', stroke: XC, 'stroke-width': 4 }), aX2 = mk(ps, 'path', { fill: 'none', stroke: XC, 'stroke-width': 4 });
const rtM = mk(ps, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2 });
const lX1 = ml(ps, 0, 0, [['x', 'i']], 26, XC), lX2 = ml(ps, 0, 0, [['x', 'i']], 26, XC);
const lOne = txt(ps, 0, 0, '1', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' });
const lCos = ml(ps, 0, 0, [['cos ', 'r'], ['x', 'i']], 26, CS), lSin1 = ml(ps, 0, 0, [['sin ', 'r'], ['x', 'i']], 26, SN), lSin2 = ml(ps, 0, 0, [['sin ', 'r'], ['x', 'i']], 26, SN);
const lH = ml(ps, 0, 0, [['sin 2', 'r'], ['x', 'i']], 24, SN, { 'text-anchor': 'end' });
const lA1 = txt(ps, 0, 0, '½ sin·cos', { 'font-size': 17, fill: CS, 'font-weight': 600, 'text-anchor': 'middle' }), lA2 = txt(ps, 0, 0, '½ sin·cos', { 'font-size': 17, fill: SN, 'font-weight': 600, 'text-anchor': 'middle' });
const pic = (xd) => {
  const A = PP(0), B = PP(2 * xd), Mx = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], m = Math.cos(xd * D2R);
  attr(rA, 'x2', A[0]); attr(rA, 'y2', A[1]); attr(rB, 'x2', B[0].toFixed(1)); attr(rB, 'y2', B[1].toFixed(1));
  attr(ch1, 'x1', A[0]); attr(ch1, 'y1', A[1]); attr(ch1, 'x2', Mx[0].toFixed(1)); attr(ch1, 'y2', Mx[1].toFixed(1));
  attr(ch2, 'x1', Mx[0].toFixed(1)); attr(ch2, 'y1', Mx[1].toFixed(1)); attr(ch2, 'x2', B[0].toFixed(1)); attr(ch2, 'y2', B[1].toFixed(1));
  attr(bis, 'x2', Mx[0].toFixed(1)); attr(bis, 'y2', Mx[1].toFixed(1));
  attr(hgt, 'x1', B[0].toFixed(1)); attr(hgt, 'x2', B[0].toFixed(1)); attr(hgt, 'y2', B[1].toFixed(1));
  const pt = a => a.map(v => v.toFixed(1)).join(',');
  attr(tri, 'points', `${OX},${OY} ${pt(A)} ${pt(B)}`); attr(hA, 'points', `${OX},${OY} ${pt(A)} ${pt(Mx)}`); attr(hB, 'points', `${OX},${OY} ${pt(Mx)} ${pt(B)}`);
  attr(aX1, 'd', arcD(OX, OY, 64, 0, xd)); attr(aX2, 'd', arcD(OX, OY, 78, xd, 2 * xd));
  const q = (r, a) => [OX + r * Math.cos(a * D2R), OY - r * Math.sin(a * D2R)];
  const l1 = q(100, xd / 2), l2 = q(112, xd * 1.5); attr(lX1, 'x', l1[0].toFixed(1)); attr(lX1, 'y', (l1[1] + 9).toFixed(1)); attr(lX2, 'x', (l2[0] - 6).toFixed(1)); attr(lX2, 'y', (l2[1] + 9).toFixed(1));
  attr(lOne, 'x', (OX + RR * 0.62)); attr(lOne, 'y', OY + 36);
  const cm = q(RR * m * 0.5, xd); attr(lCos, 'x', (cm[0] + 16).toFixed(1)); attr(lCos, 'y', (cm[1] + 34).toFixed(1));
  attr(lSin1, 'x', ((A[0] + Mx[0]) / 2 + 14).toFixed(1)); attr(lSin1, 'y', ((A[1] + Mx[1]) / 2 + 8).toFixed(1));
  attr(lSin2, 'x', ((B[0] + Mx[0]) / 2 + 12).toFixed(1)); attr(lSin2, 'y', ((B[1] + Mx[1]) / 2).toFixed(1));
  attr(lH, 'x', (B[0] - 12).toFixed(1)); attr(lH, 'y', ((OY + B[1]) / 2 + 10).toFixed(1));
  const c1 = [(OX + A[0] + Mx[0]) / 3, (OY + A[1] + Mx[1]) / 3], c2 = [(OX + B[0] + Mx[0]) / 3, (OY + B[1] + Mx[1]) / 3];
  attr(lA1, 'x', c1[0].toFixed(1)); attr(lA1, 'y', (c1[1] + 6).toFixed(1)); attr(lA2, 'x', c2[0].toFixed(1)); attr(lA2, 'y', (c2[1] + 6).toFixed(1));
  const u = [(Mx[0] - OX) / (RR * m), (Mx[1] - OY) / (RR * m)], v = [(A[0] - Mx[0]), (A[1] - Mx[1])], vl = Math.hypot(...v) || 1, k = 14;
  attr(rtM, 'd', vl > 30 ? `M${(Mx[0] - u[0] * k).toFixed(1)},${(Mx[1] - u[1] * k).toFixed(1)} l${(v[0] / vl * k).toFixed(1)},${(v[1] / vl * k).toFixed(1)} l${(u[0] * k).toFixed(1)},${(u[1] * k).toFixed(1)}` : '');
};
// live graph (L)
const lg = $('#lG'), G = PUC.graph(lg, { x: 96, y: 150, w: 620, h: 330, xmax: 90, ymin: 0, ymax: 2, xt: [0, 30, 60, 90], yt: [0, 1, 2] });
G.ticks.forEach((e, i) => e.textContent = [0, 30, 60, 90][i] + '°');
const cv2 = G.curve(C.dim, 4); const p2 = lg.lastChild; p2.setAttribute('stroke-dasharray', '9 7'); p2.setAttribute('stroke', C.ink2);
const cvS = G.curve(SN, 6);
const dS = G.dot(SN, 11), d2 = G.dot(C.ink2, 9);
const gL1 = ml(lg, G.X(62), G.Y(2 * Math.sin(62 * D2R)) - 18, [['2 sin ', 'r'], ['x', 'i']], 24, C.ink2, { 'text-anchor': 'end' }), gL2 = ml(lg, G.X(45), G.Y(1) + 40, [['sin 2', 'r'], ['x', 'i']], 24, SN, { 'text-anchor': 'middle' });
const tLs0 = wt('L1', 'coral'), tLs1 = T1('L2') + 0.6;
const xL = t => 90 * M.clamp((t - tLs0) / (tLs1 - tLs0));
let roL = '';

/* ---------- C: cos 2x ---------- */
const CR = [[`${c2x} = ${cx2} - ${sx2}`, 'put y equal to x in cos(x + y)'], [`${c2x} = 2${cx2} - 1`, K(`${sx2} = 1 - ${cx2}`)], [`${c2x} = 1 - 2${sx2}`, K(`${cx2} = 1 - ${sx2}`)],
  [`${t2x} = \\dfrac{2${tx}}{1 - ${tx2}}`, ''], [`${s2x} = \\dfrac{2${tx}}{1 + ${tx2}},\\ \\ ${c2x} = \\dfrac{1 - ${tx2}}{1 + ${tx2}}`, '']];
rows($('#cRows'), CR, 76, 98, 'cr');
$('#cr3').querySelector('.sx').style.top = '-10px'; $('#cr4').querySelector('.sx').style.top = '-10px'; $('#cr4').querySelector('.sx').style.fontSize = '27px';
const tCr = [wt('C1', 'squared') - 0.5, wt('C2', 'Swap'), wt('C3', 'Swap'), wt('C4', 'tan'), wt('C5', 'Divide')];
const cs = $('#cS'), CX0 = 300, CY0 = 300, CRr = 220;
mk(cs, 'line', { x1: CX0 - CRr - 30, y1: CY0, x2: CX0 + CRr + 40, y2: CY0, stroke: C.ink, 'stroke-width': 2 });
mk(cs, 'path', { d: arcD(CX0, CY0, CRr, 0, 180), fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const cR = mk(cs, 'line', { x1: CX0, y1: CY0, x2: CX0 + CRr * 0.5, y2: CY0 - CRr * Math.sin(60 * D2R), stroke: C.ink, 'stroke-width': 4 });
const cA = mk(cs, 'path', { d: arcD(CX0, CY0, 56, 0, 60), fill: 'none', stroke: XC, 'stroke-width': 4 });
const cAl = ml(cs, CX0 + 78 * Math.cos(30 * D2R), CY0 - 78 * Math.sin(30 * D2R) + 8, [['2', 'r'], ['x', 'i']], 24, XC);
const cB = mk(cs, 'line', { x1: CX0, y1: CY0, x2: CX0 + CRr * 0.5, y2: CY0, stroke: CS, 'stroke-width': 8, 'stroke-linecap': 'round' });
const cBl = ml(cs, CX0 + CRr * 0.25, CY0 + 34, [['cos 2', 'r'], ['x', 'i']], 24, CS, { 'text-anchor': 'middle' });
const bar = (y, x0, w, col, bg) => mk(cs, 'rect', { x: x0, y, width: w, height: 26, rx: 6, fill: bg, stroke: col, 'stroke-width': 2.5 });
const cb1 = bar(360, CX0, CRr * 0.75, CS, CSB), cb2 = bar(404, CX0 + CRr * 0.5, CRr * 0.25, SN, SNB), cb3 = bar(448, CX0, CRr * 0.5, CS, CS);
const cg = mk(cs, 'line', { x1: CX0 + CRr * 0.5, y1: CY0 + 8, x2: CX0 + CRr * 0.5, y2: 474, stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const cl1 = txt(cs, CX0 + CRr * 0.75 + 20, 380, 'cos²x = 0.750', { 'font-size': 20, fill: CS, 'font-weight': 600 });
const cl2 = txt(cs, CX0 + CRr * 0.75 + 20, 424, '- sin²x = 0.250', { 'font-size': 20, fill: SN, 'font-weight': 600 });
const cl3 = txt(cs, CX0 + CRr * 0.75 + 20, 468, '= cos 2x = 0.500', { 'font-size': 20, fill: CS, 'font-weight': 600 });

/* ---------- K: side by side ---------- */
$('#kaF').innerHTML = K(`${c2x} = 2${cx2} - 1`); $('#kbF').innerHTML = K(`${c2x} = 1 - 2${sx2}`);
$('#kaE').innerHTML = K(`${cx} = \\tfrac12 \\Rightarrow ${c2x} = \\tfrac{2}{4} - 1 = -\\tfrac12`);
$('#kbE').innerHTML = K(`${sx} = \\tfrac12 \\Rightarrow ${c2x} = 1 - \\tfrac{2}{4} = \\tfrac12`);
const avD = PUC.avatar($('#sK'), { x: 976 + 36, y: 270 + 400, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Match the form to what you are given.' });
const th1 = PUC.think($('#th1'), { q: `${K(`${sx} = \\tfrac13`)}. Which form of ${K(c2x)} is quickest?`, opts: [K(`2${cx2} - 1`), K(`1 - 2${sx2}`)], right: 1, why: 'It uses sin x directly: 1 - 2(1/9) = 7/9. No need to find cos x first.' });

/* ---------- R: triple angle ---------- */
const RRw = [[`${s3x} = ${s2x}${cx} + ${c2x}${sx}`, '3x = 2x + x, the sum formula'], [`= 2${sx}${cx2} + (1 - 2${sx2})${sx}`, 'put in the double angle forms'],
  [`= 2${sx}(1 - ${sx2}) + ${sx} - 2${sx3}`, K(`${cx2} = 1 - ${sx2}`)], [`${s3x} = 3${sx} - 4${sx3}`, 'collect the terms'], [`${c3x} = 4${cx3} - 3${cx}`, 'the same way']];
rows($('#rRows'), RRw, 76, 98, 'rr');
const tRr = [wt('R2', 'Sin'), wt('R3', 'Put'), wt('R3', 'change'), wt('R4', 'Collect'), wt('R5', 'cos')];
const rs = $('#rS'), RX = 392, RY = 548, RRr = 230;
mk(rs, 'line', { x1: RX - RRr - 30, y1: RY, x2: RX + RRr + 30, y2: RY, stroke: C.ink, 'stroke-width': 2 });
const rC = mk(rs, 'path', { d: arcD(RX, RY, RRr, 0, 180), fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const rRays = [30, 60, 90].map(a => mk(rs, 'line', { x1: RX, y1: RY, x2: RX + RRr * Math.cos(a * D2R), y2: RY - RRr * Math.sin(a * D2R), stroke: a === 90 ? C.ink : C.ink2, 'stroke-width': a === 90 ? 4 : 2, 'stroke-dasharray': a === 90 ? '' : '5 5' }));
const rArcs = [0, 1, 2].map(i => mk(rs, 'path', { d: arcD(RX, RY, 66 + i * 4, i * 30, i * 30 + 30), fill: 'none', stroke: XC, 'stroke-width': 4 }));
const rAl = [0, 1, 2].map(i => ml(rs, RX + 96 * Math.cos((i * 30 + 15) * D2R) - 6, RY - 96 * Math.sin((i * 30 + 15) * D2R) + 9, [['x', 'i']], 24, XC));
const rH = mk(rs, 'line', { x1: RX, y1: RY, x2: RX, y2: RY - RRr, stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' });
const rHl = ml(rs, RX - 14, RY - RRr / 2, [['sin 3', 'r'], ['x', 'i'], [' = 1', 'r']], 24, SN, { 'text-anchor': 'end' });
$('#rRo').innerHTML = [[`${X} = 30^\\circ,\\ \\ 3${X} = 90^\\circ`, '', C.ink], [`${s3x}`, '= 1.000', SN], [`3${sx} - 4${sx3}`, '= 1.500 - 0.500 = 1.000 ✓', C.ok], [`3${sx}`, '= 1.500 ✗ more than 1', C.red]]
  .map(([k, v, col], i) => `<div class="rd" id="rd${i}" style="left:36px;top:${80 + i * 52}px;color:${col}">${K(k)}&nbsp; ${v}</div>`).join('');
const th2 = PUC.think($('#th2'), { q: `At 30°, is ${K(`${s3x} = 3${sx}`)} ?`, opts: ['Yes', 'No'], right: 1, why: '3 sin 30° = 1.5, more than 1. The formula: 1.5 - 4(0.125) = 1 = sin 90°.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${s2x} = 2${sx}${cx}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `If ${K(`${tx} = \\tfrac34`)} and ${K(X)} is acute,<br>find ${K(s2x)}, ${K(c2x)} and ${K(t2x)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${sx} = \\tfrac35,\\ \\ ${cx} = \\tfrac45`), '3, 4, 5 triangle'],
  [K(`${s2x} = 2 \\cdot \\tfrac35 \\cdot \\tfrac45 = \\tfrac{24}{25}`)],
  [K(`${c2x} = \\tfrac{16}{25} - \\tfrac{9}{25} = \\tfrac{7}{25}`)],
  [K(`${t2x} = \\dfrac{24/25}{7/25} = \\tfrac{24}{7}`)],
  [K(`\\dfrac{2 \\cdot \\frac34}{1 - \\frac{9}{16}} = \\tfrac{24}{7}`) + `&nbsp;${M.icon('check', 26, C.ok, 3)}`]], { label: 'WORKED EXAMPLE', y0: 184, dy: 78 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => { e.style.display = 'flex'; e.style.alignItems = 'center'; });
$('#wl').querySelectorAll('.sol .why').forEach(e => { e.style.marginLeft = '8px'; });
const tW = [wt('W3', 'three'), wt('W4', 'Sin'), wt('W5', 'Cos'), wt('W6', 'Tan'), wt('W6', 'formula')];
const wsv = $('#wS'), WS = 92, WO = [150, 470], WA = [150 + 4 * WS, 470], WB = [150 + 4 * WS, 470 - 3 * WS];
const wT = mk(wsv, 'polygon', { points: `${WO} ${WA} ${WB}`, fill: C.ac3, stroke: 'none' });
const wb = mk(wsv, 'line', { x1: WO[0], y1: WO[1], x2: WA[0], y2: WA[1], stroke: CS, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wh = mk(wsv, 'line', { x1: WA[0], y1: WA[1], x2: WB[0], y2: WB[1], stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wy = mk(wsv, 'line', { x1: WO[0], y1: WO[1], x2: WB[0], y2: WB[1], stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(wsv, 'path', { d: `M${WA[0] - 18},${WA[1]} V${WA[1] - 18} H${WA[0]}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2 });
const wa = mk(wsv, 'path', { d: arcD(WO[0], WO[1], 70, 0, Math.atan(0.75) / D2R), fill: 'none', stroke: XC, 'stroke-width': 4 });
const wal = ml(wsv, WO[0] + 88, WO[1] - 16, [['x', 'i']], 26, XC);
const wl4 = txt(wsv, (WO[0] + WA[0]) / 2, WO[1] + 40, '4', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: CS, 'text-anchor': 'middle' });
const wl3 = txt(wsv, WA[0] + 20, (WA[1] + WB[1]) / 2 + 10, '3', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: SN });
const wl5 = txt(wsv, (WO[0] + WB[0]) / 2 - 20, (WO[1] + WB[1]) / 2 - 14, '5', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink, 'text-anchor': 'end' });
const wtn = ml(wsv, 120, 140, [['tan ', 'r'], ['x', 'i'], [' = 3/4', 'r']], 28, TN);
const wsn = ml(wsv, 120, 184, [['sin ', 'r'], ['x', 'i'], [' = 3/5,  cos ', 'r'], ['x', 'i'], [' = 4/5', 'r']], 26, C.ink2);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K('\\cos 2x = 1 - 2\\cos^2 x'), right: K('\\cos 2x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x') });
const ts = $('#tS');
const xq0 = txt(ts, 40, 70, 'TEST AT x = 0: cos 0 = 1', { 'font-size': 16, 'letter-spacing': 1, 'font-weight': 600 });
const xq1 = txt(ts, 40, 128, '1 - 2(1)² = -1   wrong', { 'font-size': 22, fill: C.red, 'font-weight': 600 });
const xq2 = txt(ts, 40, 196, '2(1)² - 1 = 1    right', { 'font-size': 22, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'A product of cosines that collapses with sin 2x = 2 sin x cos x.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `If ${K(`${tx} = 2`)}, then ${K(`${c2x} + ${s2x}`)}<br>is equal to`,
  opts: [K('1/5'), K('7/5'), K('-1/5'), K('3/5')], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${s2x} = \\dfrac{2 \\cdot 2}{1 + 4} = \\tfrac45`)], [K(`${c2x} = \\dfrac{1 - 4}{1 + 4} = -\\tfrac35`)], [K('\\tfrac45 - \\tfrac35 = \\tfrac15')]], { y0: 110, dy: 120 });
const tSo = [wt('A2', 'Sin'), wt('A3', 'Cos'), wt('A4', 'Add')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 510, title: 'Recap · double and triple angles', y0: 96, dy: 82, txt: [1, 0, 0, 0, 0],
  lines: ['<b>Doubling</b> the angle does not double the sine',
    K(`${s2x} = 2${sx}${cx} = \\frac{2${tx}}{1 + ${tx2}}`),
    K(`${c2x} = ${cx2} - ${sx2} = 2${cx2} - 1 = 1 - 2${sx2}`),
    K(`${t2x} = \\frac{2${tx}}{1 - ${tx2}}`),
    K(`${s3x} = 3${sx} - 4${sx3},\\ \\ ${c3x} = 4${cx3} - 3${cx}`)] });
const YQ = [`Why is ${K('\\sin 2x')} not ${K('2\\sin x')}?`, `Write all three forms of ${K(c2x)}.`, `If ${K(`${cx} = \\tfrac35`)}, find ${K(c2x)}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nxt = PUC.next($('#sF'), { label: 'NEXT · EP 35', topic: 'Two notes make a beat: a sum hiding a product. Sums and Products', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((r, i) => { M.vis($('#ha' + i), t, tHr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#hs' + i), t, tHs[i] - 0.1, 1e9, POP); if (r[2]) M.vis($('#hd' + i), t, tHd[i] - 0.1, 1e9, POP); });
    M.vis($('#hP'), t, wt('H4', 'not') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'what') - 0.1, 1e9, POP);
  }

  /* P + G + L */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#plL0'), t, tP1 + 0.2, tG1, { dy: 10, outDur: 0.25 }); M.vis($('#plL1'), t, tG1 + 0.2, tL1, { dy: 10, outDur: 0.25 }); M.vis($('#plL2'), t, tL1 + 0.2, 1e9, { dy: 10 });
    runRows(t, 'pr', 4, tPr, null, 84, 112, null, tG1);
    runRows(t, 'gr', 4, tGr, null, 84, 112, null, tL1);
    const hb = $('#pHi'); const hy = t < tG1 ? 84 + 3 * 112 : 84 + 3 * 112; const hin = t < tG1 ? tPr[3] - 0.1 : tGr[3] - 0.1;
    M.vis(hb, t, hin, t < tG1 ? tG1 : tL1, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); hb.style.top = (hy - 12) + 'px';
    // live graph
    const gOn = t >= tL1 - 0.05; M.hide(lg, !gOn); M.hide($('#lRo'), !gOn);
    let xd = 30;
    if (gOn) {
      lg.style.opacity = M.clamp((t - tL1) / 0.3).toFixed(3);
      const xv = xL(t); xd = t >= tLs0 ? Math.max(1, xv) : 30;
      cvS(s => [s, Math.sin(2 * s * D2R)], 0, xv); cv2(s => [s, 2 * Math.sin(s * D2R)], 0, xv);
      dS(xv, Math.sin(2 * xv * D2R), t >= tLs0); d2(xv, 2 * Math.sin(xv * D2R), t >= tLs0);
      M.vis(gL2, t, wt('L1', 'coral'), 1e9, { dy: 0 }); M.vis(gL1, t, wt('L1', 'dashed'), 1e9, { dy: 0 });
      const v = t >= tLs0 ? xv : 0, key = Math.round(v);
      if (key !== roL) { roL = key; const r = v * D2R; $('#lRo').innerHTML = `<span style="color:${XC}"><span class="th">x</span> = ${Math.round(v)}°</span>&nbsp;&nbsp; ${K(`2${sx}${cx}`)} <span style="color:${SN}">= ${(2 * Math.sin(r) * Math.cos(r)).toFixed(3)}</span>&nbsp;&nbsp; ${K('2\\sin x')} <span style="color:${C.ink2}">= ${(2 * Math.sin(r)).toFixed(3)}</span>`; }
      if (t > tLs1) xd = 90;
    }
    // right picture
    M.vis($('#pr'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(pCir, t, tP1 + 0.5, 0.9);
    pic(Math.min(89.5, gOn ? (t < tLs0 ? M.lerp(30, 1, M.io((t - tL1) / 0.8)) : xd) : 30));
    M.vis(rA, t, wt('P2', 'put') - 0.2, 1e9, { dy: 0 }); M.vis(aX1, t, wt('P2', 'put'), 1e9, { dy: 0 }); M.vis(lX1, t, wt('P2', 'put') + 0.2, 1e9, { dy: 0 });
    M.vis(rB, t, wt('P2', 'two') - 0.2, 1e9, { dy: 0 }); M.vis(aX2, t, wt('P2', 'two'), 1e9, { dy: 0 }); M.vis(lX2, t, wt('P2', 'two') + 0.2, 1e9, { dy: 0 });
    M.vis(lOne, t, wt('G1', 'radii'), 1e9, { dy: 0 });
    [ch1, ch2].forEach(e => M.vis(e, t, wt('G2', 'Join') - 0.1, 1e9, { dy: 0 }));
    M.vis(tri, t, wt('G2', 'area') - 0.2, wt('G3', 'right'), { dy: 0, fade: 0.3, outDur: 0.3, ody: 0 });
    M.vis(hgt, t, wt('G2', 'height') - 0.1, 1e9, { dy: 0 }); M.vis(lH, t, wt('G2', 'height'), 1e9, { dy: 0 });
    M.vis(bis, t, wt('G3', 'cut') - 0.1, 1e9, { dy: 0 }); M.vis(rtM, t, wt('G3', 'right'), 1e9, { dy: 0 });
    [hA, hB].forEach((e, i) => M.vis(e, t, wt('G3', 'right') - 0.1 + i * 0.2, 1e9, { dy: 0, fade: 0.3 }));
    M.vis(lCos, t, wt('G3', 'cos'), 1e9, { dy: 0 }); [lSin1, lSin2].forEach(e => M.vis(e, t, wt('G3', 'sin'), 1e9, { dy: 0 }));
    [lA1, lA2].forEach(e => M.hide(e, true));
    const lf = 1 - M.io((t - tLs0) / 0.4); [lCos, lSin1, lSin2, lH, lX1, lX2, lOne].forEach(e => { if (t > tLs0) { e.style.opacity = lf.toFixed(3); if (lf < 0.01) M.hide(e, true); } else e.style.opacity = ''; });
    const g1 = pulse(t, tPr[3], 1.2) + pulse(t, tGr[3], 1.2) + pulse(t, wt('G3', 'sin'), 1.0), g2 = pulse(t, tPr[3], 1.2) + pulse(t, tGr[3], 1.2) + pulse(t, wt('G3', 'cos'), 1.0);
    [ch1, ch2].forEach(e => attr(e, 'stroke-width', (7 + 5 * g1).toFixed(2))); attr(bis, 'stroke-width', (7 + 5 * g2).toFixed(2));
    attr(hgt, 'stroke-width', (3.5 + 3 * pulse(t, tGr[0], 1.2)).toFixed(2));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    runRows(t, 'cr', 5, tCr, $('#cHi'), 76, 98);
    M.vis($('#cr'), t, tC1 + 0.25, out, { dx: 60, dy: 0, ...o });
    [cR, cA, cAl].forEach(e => M.vis(e, t, tC1 + 0.5, 1e9, { dy: 0 })); [cB, cBl].forEach(e => M.vis(e, t, tCr[0] - 0.2, 1e9, { dy: 0 }));
    M.vis(cb1, t, tCr[0] + 0.3, 1e9, { dx: -20, dy: 0 }); M.vis(cl1, t, tCr[0] + 0.4, 1e9, { dy: 0 });
    M.vis(cb2, t, tCr[0] + 0.9, 1e9, { dx: 20, dy: 0 }); M.vis(cl2, t, tCr[0] + 1.0, 1e9, { dy: 0 });
    M.vis(cb3, t, tCr[0] + 1.6, 1e9, { dx: -20, dy: 0 }); M.vis(cl3, t, tCr[0] + 1.7, 1e9, { dy: 0 }); M.vis(cg, t, tCr[0] + 1.8, 1e9, { dy: 0 });
    const gb = pulse(t, tCr[1], 1.2) + pulse(t, tCr[2], 1.2); attr(cB, 'stroke-width', (8 + 5 * gb).toFixed(2));
    M.vis($('#cP'), t, wt('C3', 'Three') - 0.1, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kaF'), t, wt('K1', 'Use'), 0.8); M.vis($('#ka .ex'), t, wt('K1', 'Use') + 0.6, 1e9, { dy: 14 });
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#kbF'), t, wt('K2', 'Use'), 0.8); M.vis($('#kb .ex'), t, wt('K2', 'Use') + 0.6, 1e9, { dy: 14 });
    avD(t, T1('K2'), out);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'ninths') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R6');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    runRows(t, 'rr', 5, tRr, $('#rHi'), 76, 98);
    const hb = $('#rHi'); if (t > tRr[4] - 0.1) hb.style.top = (76 + 3 * 98 - 12) + 'px';
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(rC, t, tR1 + 0.4, 0.8);
    rArcs.forEach((a, i) => { M.vis(rRays[i], t, wt('R1', 'three') + i * 0.25, 1e9, { dy: 0 }); M.draw(a, t, wt('R1', 'three') + i * 0.25, 0.35); M.vis(rAl[i], t, wt('R1', 'three') + i * 0.25 + 0.2, 1e9, { dy: 0 }); });
    M.draw(rH, t, tRr[0], 0.6); M.vis(rHl, t, tRr[0] + 0.4, 1e9, { dy: 0 });
    M.vis($('#rd0'), t, tR1 + 0.6, 1e9, { dy: 10 }); M.vis($('#rd1'), t, tRr[0] + 0.3, 1e9, { dy: 10 }); M.vis($('#rd2'), t, tRr[3] + 0.6, 1e9, { dy: 10 }); M.vis($('#rd3'), t, wt('R7', 'Three') - 0.1, 1e9, { dy: 10 });
    M.vis($('#th2'), t, tR6 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tR6, tOpts: wt('R6', 'equal') - 0.1, tCount: T1('R6') + 0.05, dur: 3, tAns: T0('R7') - 0.02, tWhy: T0('R7') + 0.3 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxp = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sxp ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Doubling') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Sin') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wtn, t, wt('W2', 'quarters') - 0.1, 1e9, { dy: 0 });
    [wT, wb, wh, wy].forEach((e, i) => M.vis(e, t, wt('W2', 'acute') + i * 0.15, 1e9, { dy: 0, fade: 0.25 }));
    M.vis(wa, t, wt('W2', 'acute') + 0.5, 1e9, { dy: 0 }); M.vis(wal, t, wt('W2', 'acute') + 0.6, 1e9, { dy: 0 });
    [wl4, wl3].forEach(e => M.vis(e, t, wt('W2', 'acute') + 0.7, 1e9, { dy: 0 })); M.vis(wl5, t, tW[0], 1e9, { dy: 0 });
    M.vis(wsn, t, tW[0] + 0.6, 1e9, { dy: 0 });
    attr(wh, 'stroke-width', (8 + 5 * (pulse(t, tW[1], 1.4) + pulse(t, tW[2], 1.2))).toFixed(2)); attr(wb, 'stroke-width', (8 + 5 * (pulse(t, tW[1], 1.4) + pulse(t, tW[2], 1.2))).toFixed(2));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'minus') - 0.1, tRight: wt('X3', 'right') });
    M.vis(xq0, t, wt('X3', 'Test') - 0.1, 1e9, { dy: 0 }); M.vis(xq1, t, wt('X3', 'minus') - 0.3, 1e9, { dx: -12, dy: 0 }); M.vis(xq2, t, wt('X3', 'right') + 0.2, 1e9, { dx: -12, dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'product') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nxt(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
