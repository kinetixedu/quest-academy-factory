// PUC Maths Ep 42: Modulus and argument (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 4 canon): real part a blue, imaginary part b coral, i violet, modulus r teal, argument theta violet arc
const RE = '#2F6FEB', IM = C.ac, IV = C.violet, MO = C.teal, MOB = '#E2F2F2';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const PT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const re = s => `\\textcolor{${RE}}{${s}}`, im = s => `\\textcolor{${IM}}{${s}}`, iv = s => `\\textcolor{${IV}}{${s}}`, mo = s => `\\textcolor{${MO}}{${s}}`;
const sg = neg => `\\mathbin{\\textcolor{${IM}}{${neg ? '-' : '+'}}}`;
const cz = (a, b) => `${re(a)} ${sg(String(b)[0] === '-')} ${im(String(b).replace('-', ''))}${iv('i')}`;
const ZB = '\\bar{z}', TH = iv('\\theta'), MZ = mo('|z|');
const deg = r => r * 180 / Math.PI;

/* ---------- picture helpers ---------- */
const plane = (svg, o) => {
  const { ox, oy, s, x0, x1, y0, y1 } = o, X = v => ox + v * s, Y = v => oy - v * s, g = mk(svg, 'g', {});
  mk(g, 'line', { x1: X(x0), y1: oy, x2: X(x1), y2: oy, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${X(x1) + 6},${oy} l-14,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: ox, y1: Y(y0), x2: ox, y2: Y(y1), stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${ox},${Y(y1) - 6} l-7,14 h14 z`, fill: C.ink });
  if (o.ticks !== false) { for (let v = Math.ceil(x0); v <= Math.floor(x1); v++) if (v) mk(g, 'line', { x1: X(v), y1: oy - 6, x2: X(v), y2: oy + 6, stroke: C.ink, 'stroke-width': 1.5 });
    for (let v = Math.ceil(y0); v <= Math.floor(y1); v++) if (v) mk(g, 'line', { x1: ox - 6, y1: Y(v), x2: ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 1.5 }); }
  if (o.lab !== false) { txt(g, X(x1) - 2, oy + 30, 'real', { 'text-anchor': 'end', 'font-size': 16, fill: RE, 'font-weight': 600 }); txt(g, ox + 12, Y(y1) + 10, 'imaginary', { 'font-size': 16, fill: IM, 'font-weight': 600 }); }
  return { X, Y, g, ox, oy, s };
};
const zpt = (svg, bar, lab = 'z', col = C.ink) => {
  const pg = mk(svg, 'g', {}), g = mk(pg, 'g', {});
  mk(g, 'circle', bar ? { r: 11, fill: '#fff', stroke: col, 'stroke-width': 3, 'stroke-dasharray': '5 4' } : { r: 11, fill: col });
  let l = null; if (lab) { l = mk(g, 'g', {}); txt(l, 16, bar ? 32 : -14, lab, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }); if (bar) mk(l, 'line', { x1: 17, y1: 9, x2: 31, y2: 9, stroke: col, 'stroke-width': 2.5 }); }
  return { pg, g, l, set(x, y) { attr(pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } };
};
// arc (angles in radians, maths convention) as a sampled path; fill=true closes a sector
const arcD = (ox, oy, R, a0, a1, sector) => { const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 0.05)); let d = sector ? `M${ox},${oy} L` : 'M'; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; d += (i ? 'L' : '') + (ox + R * Math.cos(a)).toFixed(1) + ',' + (oy - R * Math.sin(a)).toFixed(1); } return d + (sector ? 'Z' : ''); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tM1 = T0('M1'), tG1 = T0('G1'), tK1 = T0('K1'), tR1 = T0('R1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['CYCLIST 1', '5 km from the gate'], ['CYCLIST 2', '5 km from the gate'], ['THE QUESTION', 'Same place?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Two') + 0.2, wt('H1', 'five') - 0.1, wt('H1', 'same', 1) - 0.1];

/* ---------- H ---------- */
const hs = $('#hlS'), GX = 392, GY = 272, GR = 190;
const hC = mk(hs, 'circle', { cx: GX, cy: GY, r: GR, fill: 'none', stroke: MO, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
const hCL = txt(hs, GX + 140, GY + 172, '5 km', { 'font-size': 22, fill: MO, 'font-weight': 600 });
const hA1 = PUC.arrow(hs, C.ink, 5), hA2 = PUC.arrow(hs, C.ink2, 5);
const e1 = [GX + GR * Math.SQRT1_2, GY - GR * Math.SQRT1_2], e2 = [GX - GR * Math.SQRT1_2, GY + GR * Math.SQRT1_2];
const hL1 = txt(hs, e1[0] + 14, e1[1] - 8, 'NORTH EAST', { 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
const hL2 = txt(hs, e2[0] - 14, e2[1] + 26, 'SOUTH WEST', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600, 'letter-spacing': 1.5 });
const hG = mk(hs, 'rect', { x: GX - 9, y: GY - 9, width: 18, height: 18, rx: 3, fill: C.ink });
const hGL = txt(hs, GX + 16, GY + 30, 'GATE', { 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 });
const ks = $("#hkS"), KO = [480, 360], KS = 56;
const kE = PUC.arrow(ks, RE, 6), kN = PUC.arrow(ks, IM, 6);
const kH = mk(ks, 'line', { x1: KO[0], y1: KO[1], x2: KO[0] + 4 * KS, y2: KO[1] - 3 * KS, stroke: MO, 'stroke-width': 4, 'stroke-dasharray': '8 7' });
const kEL = txt(ks, KO[0] + 2 * KS, KO[1] + 28, '4 km east', { 'text-anchor': 'middle', 'font-size': 18, fill: RE, 'font-weight': 600 });
const kNL = txt(ks, KO[0] + 4 * KS + 10, KO[1] - 3 * KS - 14, '3 km north', { 'text-anchor': 'end', 'font-size': 18, fill: IM, 'font-weight': 600 });
const kQ = txt(ks, KO[0] + 2 * KS - 22, KO[1] - 1.5 * KS - 12, '?', { 'text-anchor': 'middle', 'font-size': 34, fill: MO, 'font-weight': 700 });
const kHm = txt(ks, KO[0], KO[1] + 28, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 });
const kO = mk(ks, 'circle', { cx: KO[0], cy: KO[1], r: 8, fill: C.ink });

/* ---------- M: trip picture + modulus ---------- */
const ms = $('#mS'), MP = plane(ms, { ox: 110, oy: 468, s: 64, x0: -0.4, x1: 9.4, y0: -0.3, y1: 5.9 });
const mTri = mk(ms, 'path', { d: `M${MP.X(0)},${MP.Y(0)} L${MP.X(4)},${MP.Y(0)} L${MP.X(4)},${MP.Y(3)} Z`, fill: MOB });
const mA = mk(ms, 'line', { x1: MP.X(0), y1: MP.Y(0), x2: MP.X(4), y2: MP.Y(0), stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const mB = mk(ms, 'line', { x1: MP.X(4), y1: MP.Y(0), x2: MP.X(4), y2: MP.Y(3), stroke: IM, 'stroke-width': 8, 'stroke-linecap': 'round' });
const mRA = mk(ms, 'path', { d: `M${MP.X(4) - 22},${MP.Y(0)} v-22 h22`, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
const mH = mk(ms, 'line', { x1: MP.X(0), y1: MP.Y(0), x2: MP.X(4), y2: MP.Y(3), stroke: MO, 'stroke-width': 7, 'stroke-linecap': 'round' });
const mAL = txt(ms, MP.X(2), MP.Y(0) + 40, 'a = 4', { 'text-anchor': 'middle', 'font-size': 24, fill: RE, 'font-weight': 600 });
const mBL = txt(ms, MP.X(4) + 16, MP.Y(1.5) + 8, 'b = 3', { 'font-size': 24, fill: IM, 'font-weight': 600 });
const mHL = txt(ms, MP.X(2) - 18, MP.Y(1.5) - 18, '|z| = 5', { 'text-anchor': 'end', 'font-size': 26, fill: MO, 'font-weight': 600 });
const mO = txt(ms, MP.X(0) - 14, MP.Y(0) + 32, 'O', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const mP = zpt(ms, false, 'P'); mP.set(MP.X(4), MP.Y(3));
const mZL = txt(ms, MP.X(4) + 22, MP.Y(3) - 44, 'z = 4 + 3i', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
$('#tps').innerHTML = [[re('a'), 'steps along the real axis'], [im('b'), 'steps up, parallel to the imaginary axis']].map(([f, w], i) => `<div class="tp" id="tp${i}" style="top:${92 + i * 132}px"><div class="tf">${K(f)}</div><div class="tw" style="left:100px">${w}</div></div>`).join('');
const MSt = [[MZ, 'how far it is from O to P: the modulus'], [`OP^2 = ${re('a')}^2 + ${im('b')}^2`, 'Pythagoras: base a, height b'], [`${MZ} = \\sqrt{${re('a')}^2 + ${im('b')}^2}`, 'take the square root'],
  [`${mo('|4 + 3i|')} = \\sqrt{16 + 9} = ${mo('5')}`, 'Aarav is 5 km from home'], [`z\\,${ZB} = ${MZ}^2`, 'recall Ep 41: z z̄ = a² + b²']];
$('#mSt').innerHTML = MSt.map(([f, w], i) => `<div class="st" id="ms${i}" style="top:${84 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tMs = [wt('M1', 'modulus'), wt('M3', 'Pythagoras'), wt('M4', 'square'), wt('M5', 'four'), wt('M6', 'recall')];

/* ---------- G: argument + live trip ---------- */
$('#gf1').innerHTML = K(`${TH} = \\arg z`);
$('#gf2').innerHTML = K(`-\\pi < \\arg z \\le \\pi`);
const gs = $('#gS'), GP = plane(gs, { ox: 392, oy: 246, s: 36, x0: -9.4, x1: 9.4, y0: -5.4, y1: 5.4, ticks: false });
const gArc = mk(gs, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gArcB = mk(gs, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 3, 'stroke-dasharray': '5 5', opacity: 0.6 });
const gTr = mk(gs, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, opacity: 0.18 });
const gR = mk(gs, 'line', { stroke: MO, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gRB = mk(gs, 'line', { stroke: MO, 'stroke-width': 3, 'stroke-dasharray': '6 6', opacity: 0.7 });
const gTh = txt(gs, 0, 0, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 26, fill: IV, 'font-weight': 600, 'text-anchor': 'middle' });
const gZ = zpt(gs, false), gB = zpt(gs, true);
const tg0 = wt('G4', 'Watch'), tg1 = wt('G5', 'mirror') - 0.2, tgB = wt('G5', 'mirror') - 0.3, tg2 = wt('G6', 'Zero'), PH0 = Math.atan2(3, 4);
const zG = t => { const u = M.io((t - tg0) / Math.max(1, tg1 - tg0)), ph = PH0 + u * (2 * Math.PI - 0.95), r = (4.6 + 0.5 * Math.cos(2 * (ph - PH0)) - 0.1) * (1 - M.io((t - tg2) / 0.9)) + (u === 0 ? 0.4 * 0 : 0); return [r * Math.cos(ph), r * Math.sin(ph)]; };
const th1 = PUC.think($('#th1'), { q: '1 + i and -1 - i: same argument, or different?', opts: ['Same', 'Different'], right: 1, why: 'b/a = 1 for both, but they point opposite ways: π/4 and -3π/4.' });

/* ---------- R: quadrant rule ---------- */
const RS = [[`\\tan\\alpha = \\left|\\,${im('b')} / ${re('a')}\\,\\right|`, 'alpha: the sharp reference angle', 0], ['Signs of a and b give the quadrant', 'first, second, third or fourth', 1],
  [`\\text{Q1: } ${TH} = \\alpha \\qquad \\text{Q2: } ${TH} = \\pi - \\alpha`, 'above the real axis: positive', 0], [`\\text{Q3: } ${TH} = -\\pi + \\alpha \\qquad \\text{Q4: } ${TH} = -\\alpha`, 'below the real axis: negative', 0],
  [`\\tan\\alpha = \\tfrac{3}{4} \\;\\Rightarrow\\; \\alpha \\approx 37^\\circ`, "Aarav's trip: 37° north of east", 0]];
$('#rSt').innerHTML = RS.map(([f, w, tx], i) => `<div class="st${tx ? ' t' : ''}" id="rs${i}" style="top:${84 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${tx ? f : K(f)}</div><div class="why">${w}</div></div>`).join('');
const tRs = [wt('R2', 'reference'), wt('R3', 'signs'), wt('R4', 'First'), wt('R5', 'Third'), wt('R6', 'tan')];
const rs = $('#rS'), RP = plane(rs, { ox: 392, oy: 300, s: 44, x0: -7.6, x1: 7.6, y0: -4.9, y1: 4.9, ticks: false });
const QT = [[1, 1, 'Q1 · θ = α'], [-1, 1, 'Q2 · θ = π - α'], [-1, -1, 'Q3 · θ = -π + α'], [1, -1, 'Q4 · θ = -α']];
const rQ = QT.map(([sx, sy, l]) => { const r = mk(rs, 'rect', { x: sx > 0 ? RP.ox + 2 : RP.ox - 330, y: sy > 0 ? RP.oy - 214 : RP.oy + 2, width: 328, height: 212, rx: 10, fill: '#EFE9FC', opacity: 0 }); const tx = txt(rs, sx > 0 ? RP.ox + 318 : RP.ox - 318, sy > 0 ? RP.oy - 186 : RP.oy + 200, l, { 'text-anchor': sx > 0 ? 'end' : 'start', 'font-size': 18, fill: IV, 'font-weight': 600 }); return { r, tx }; });
rs.insertBefore(RP.g, rs.firstChild); rQ.forEach(q => rs.insertBefore(q.r, rs.firstChild));
const rWedge = mk(rs, 'path', { d: '', fill: IV, opacity: 0.16 });
const rArc = mk(rs, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 4, 'stroke-linecap': 'round' });
const rRad = mk(rs, 'line', { stroke: MO, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rAl = txt(rs, 0, 0, 'α', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: IV, 'font-weight': 600, 'text-anchor': 'middle' });
const rZ = zpt(rs, false);
const KQ = [[wt('R4', 'First') - 0.1, PH0], [wt('R4', 'Second') - 0.1, Math.PI - PH0], [wt('R5', 'Third') - 0.1, -Math.PI + PH0 + 2 * Math.PI], [wt('R5', 'Fourth') - 0.1, -PH0 + 2 * Math.PI], [wt('R6', 'tan') - 0.1, PH0 + 2 * Math.PI]];
const phR = t => { let v = KQ[0][1]; for (let i = 1; i < KQ.length; i++) { const u = M.io((t - KQ[i][0]) / 0.7); v += (KQ[i][1] - KQ[i - 1][1]) * u; } return v; };
const qOf = t => { let q = 0; [wt('R4', 'First'), wt('R4', 'Second'), wt('R5', 'Third'), wt('R5', 'Fourth'), wt('R6', 'tan')].forEach((tt, i) => { if (t >= tt - 0.1) q = i % 4; }); return q; };

/* ---------- S: mirror vs opposite ---------- */
$('#smF').innerHTML = K(`${mo('|3 + 4i|')} = ${mo('|3 - 4i|')} = ${mo('5')}`);
$('#snF').innerHTML = K(`${mo('|3 + 4i|')} = ${mo('|-3 - 4i|')} = ${mo('5')}`);
const sideP = (svg, neg) => {
  const P = plane(svg, { ox: 392, oy: 326, s: 30, x0: -6.4, x1: 6.4, y0: -4.6, y1: 4.6, ticks: false });
  const w = neg ? [-3, -4] : [3, -4], th = Math.atan2(4, 3), thw = Math.atan2(w[1], w[0]);
  const r1 = mk(svg, 'line', { x1: P.X(0), y1: P.Y(0), x2: P.X(3), y2: P.Y(4), stroke: MO, 'stroke-width': 5, 'stroke-linecap': 'round' });
  const r2 = mk(svg, 'line', { x1: P.X(0), y1: P.Y(0), x2: P.X(w[0]), y2: P.Y(w[1]), stroke: MO, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '9 7' });
  const a1 = mk(svg, 'path', { d: arcD(P.ox, P.oy, 44, 0, th), fill: 'none', stroke: IV, 'stroke-width': 4 });
  const a2 = mk(svg, 'path', { d: arcD(P.ox, P.oy, neg ? 60 : 44, 0, thw), fill: 'none', stroke: neg ? C.red : IV, 'stroke-width': 4, 'stroke-dasharray': '6 5' });
  const l1 = txt(svg, P.X(0) + 52, P.Y(0) - 30, '+53°', { 'font-size': 20, fill: IV, 'font-weight': 600 });
  const l2 = txt(svg, neg ? P.X(0) - 70 : P.X(0) + 52, neg ? P.Y(0) + 80 : P.Y(0) + 46, neg ? '-127°' : '-53°', { 'font-size': 20, fill: neg ? C.red : IV, 'font-weight': 600, 'text-anchor': neg ? 'end' : 'start' });
  const z = zpt(svg, false); z.set(P.X(3), P.Y(4));
  const b = neg ? zpt(svg, false, '-z', C.red) : zpt(svg, true); b.set(P.X(w[0]), P.Y(w[1]));
  return { r1, r2, a1, a2, l1, l2, z, b };
};
const SM = sideP($('#smS'), false), SN = sideP($('#snS'), true);
const th2 = PUC.think($('#th2'), { q: 'Is the modulus of 3 - 4i also 5?', opts: ['Yes', 'No'], right: 0, why: '3² + (-4)² = 9 + 16 = 25, and √25 = 5. Squaring removes the minus sign.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${MZ} = \\sqrt{${re('a')}^2 + ${im('b')}^2} \\qquad ${TH} = \\arg z`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`z = ${re('-1')} ${sg(1)} ${im('\\sqrt3')}\\,${iv('i')}`)}<br>Find the modulus and the principal argument.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${MZ} = \\sqrt{1 + 3} = ${mo('2')}`)],
  [K(`\\tan\\alpha = \\sqrt3 \\;\\Rightarrow\\; \\alpha = \\tfrac{\\pi}{3}`)],
  [K(`${re('a')} < 0,\\ ${im('b')} < 0 \\;\\Rightarrow\\; \\text{Q3}`)],
  [K(`${TH} = -\\pi + \\tfrac{\\pi}{3} = ${iv('-\\tfrac{2\\pi}{3}')}`)],
  [K(`${MZ} = ${mo('2')}, \\quad \\arg z = ${iv('-\\tfrac{2\\pi}{3}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'modulus'), wt('W4', 'tan'), wt('W5', 'third'), wt('W6', 'Theta'), wt('W7', 'So')];
const ws = $('#wS'), WP = plane(ws, { ox: 470, oy: 280, s: 92, x0: -2.9, x1: 2.6, y0: -2.3, y1: 2.3 });
const wPt = [-1, -Math.sqrt(3)];
const wQ = mk(ws, 'rect', { x: WP.X(-2.8), y: WP.oy + 2, width: WP.X(0) - WP.X(-2.8) - 2, height: 2.2 * 92, rx: 10, fill: '#EFE9FC' }); ws.insertBefore(wQ, ws.firstChild);
const wQL = txt(ws, WP.X(-2.7), WP.Y(-2.05), 'Q3', { 'font-size': 20, fill: IV, 'font-weight': 600 });
const wR = mk(ws, 'line', { x1: WP.X(0), y1: WP.Y(0), x2: WP.X(wPt[0]), y2: WP.Y(wPt[1]), stroke: MO, 'stroke-width': 6, 'stroke-linecap': 'round' });
const wRL = txt(ws, WP.X(-0.5) - 22, WP.Y(-0.87) + 6, '2', { 'text-anchor': 'end', 'font-size': 26, fill: MO, 'font-weight': 600 });
const wW = mk(ws, 'path', { d: arcD(WP.ox, WP.oy, 78, Math.PI, 4 * Math.PI / 3, true), fill: IV, opacity: 0.18 });
const wWL = txt(ws, WP.X(-1.05), WP.Y(-0.32), 'α = π/3', { 'text-anchor': 'end', 'font-size': 20, fill: IV, 'font-weight': 600 });
const wA = mk(ws, 'path', { d: arcD(WP.ox, WP.oy, 50, 0, -2 * Math.PI / 3), fill: 'none', stroke: IV, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const wAL = txt(ws, WP.X(0.62), WP.Y(-0.7), 'θ = -2π/3', { 'font-size': 22, fill: IV, 'font-weight': 600 });
const wZ = zpt(ws, false); wZ.set(WP.X(wPt[0]), WP.Y(wPt[1]));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\arg(-1 - i) = \\tan^{-1}(1) = \\tfrac{\\pi}{4}`), right: K(`-1 - i \\text{ is in Q3: } \\arg(-1 - i) = ${iv('-\\tfrac{3\\pi}{4}')}`) });
const ts = $('#tS'), TP = plane(ts, { ox: 300, oy: 140, s: 52, x0: -2.6, x1: 2.6, y0: -2.1, y1: 2.1, ticks: false, lab: false });
const tWr = mk(ts, 'line', { x1: TP.X(0), y1: TP.Y(0), x2: TP.X(1), y2: TP.Y(1), stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '7 6' });
const tWrL = txt(ts, TP.X(1) + 12, TP.Y(1) - 4, 'π/4: wrong way', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const tRt = mk(ts, 'line', { x1: TP.X(0), y1: TP.Y(0), x2: TP.X(-1), y2: TP.Y(-1), stroke: C.ok, 'stroke-width': 5 });
const tArc = mk(ts, 'path', { d: arcD(TP.ox, TP.oy, 30, 0, -3 * Math.PI / 4), fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const tPt = mk(ts, 'circle', { cx: TP.X(-1), cy: TP.Y(-1), r: 9, fill: C.ink });
const tRtL = txt(ts, TP.X(-1) - 14, TP.Y(-1) + 30, '-1 - i', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'JEE ADVANCED'], type: 'Modulus and principal argument, with quadrant traps' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 760,
  q: `${K(`z = \\dfrac{(1 + i)^2}{1 - i}`)}<br>The modulus and the principal argument of z are`,
  opts: [K(`\\sqrt2,\\ \\tfrac{3\\pi}{4}`), K(`\\sqrt2,\\ \\tfrac{\\pi}{4}`), K(`2,\\ \\tfrac{3\\pi}{4}`), K(`\\sqrt2,\\ -\\tfrac{\\pi}{4}`)], right: 0, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`(1 + i)^2 = 1 + 2i + i^2 = 2i`)], [K(`z = \\tfrac{2i(1 + i)}{(1 - i)(1 + i)} = \\tfrac{2i - 2}{2}`)], [K(`z = ${cz('-1', 1)}`)], [K(`${MZ} = \\sqrt{1 + 1} = \\sqrt2`)], [K(`\\text{Q2},\\ \\alpha = \\tfrac{\\pi}{4} \\Rightarrow ${TH} = \\tfrac{3\\pi}{4}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'squared'), wt('A3', 'Multiply'), wt('A3', 'becomes'), wt('A4', 'modulus'), wt('A4', 'second')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · modulus and argument', y0: 100, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${MZ} = \\sqrt{${re('a')}^2 + ${im('b')}^2}, \\qquad ${MZ}^2 = z\\,${ZB}`),
    K(`${TH} = \\arg z, \\qquad -\\pi < ${TH} \\le \\pi`),
    K(`\\tan\\alpha = |b/a|: \\quad \\alpha,\\ \\ \\pi - \\alpha,\\ \\ -\\pi + \\alpha,\\ \\ -\\alpha`),
    K(`${mo('|\\bar z|')} = ${mo('|{-z}|')} = ${MZ}`),
    'Find the quadrant first. Zero has no argument.'] });
const YQ = [`What is the modulus of ${K('-5 + 12i')}?`, `What is the principal argument of ${K('-1 + i')}?`, `Why do ${K('z')} and ${K(ZB)} always have the same modulus?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 43', topic: 'An address for every number: the Argand Plane', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tg0 - 0.3, 1.05, 1010, 560], [tg2 + 1.2, 1, 960, 540]]);

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
    M.vis(hG, t, tMorph + 0.3, 1e9, PT); M.vis(hGL, t, tMorph + 0.4, 1e9, { dy: 0 });
    M.draw(hC, t, tMorph + 0.4, 0.8); M.vis(hCL, t, tMorph + 0.9, 1e9, { dy: 0 });
    const u1 = M.io((t - wt('H2', 'north') + 0.3) / 0.6), u2 = M.io((t - wt('H2', 'south') + 0.3) / 0.6);
    hA1.set(GX, GY, GX + (e1[0] - GX) * u1, GY + (e1[1] - GY) * u1); M.hide(hA1.g, u1 < 0.01);
    hA2.set(GX, GY, GX + (e2[0] - GX) * u2, GY + (e2[1] - GY) * u2); M.hide(hA2.g, u2 < 0.01);
    M.vis(hL1, t, wt('H2', 'north') + 0.2, 1e9, { dy: 0 }); M.vis(hL2, t, wt('H2', 'south') + 0.2, 1e9, { dy: 0 });
    M.vis($('#hlP'), t, wt('H2', 'Distance') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis(kO, t, tH4 - 0.1, 1e9, PT); M.vis(kHm, t, tH4, 1e9, { dy: 0 });
    const ue = M.io((t - wt('H4', 'east')) / 0.5), un = M.io((t - wt('H4', 'north')) / 0.5);
    kE.set(KO[0], KO[1], KO[0] + 4 * KS * ue, KO[1]); M.hide(kE.g, ue < 0.01); kN.set(KO[0] + 4 * KS, KO[1], KO[0] + 4 * KS, KO[1] - 3 * KS * un); M.hide(kN.g, un < 0.01);
    M.vis(kEL, t, wt('H4', 'east'), 1e9, { dy: 0 }); M.vis(kNL, t, wt('H4', 'north'), 1e9, { dy: 0 });
    M.draw(kH, t, wt('H4', 'far') - 0.2, 0.6); M.vis(kQ, t, wt('H4', 'far'), 1e9, PT);
    M.vis($('#hkP'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* M */
  const mOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('G1');
    M.vis($('#ml'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(MP.g, t, tP1 + 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(mO, t, wt('P2', 'origin'), 1e9, { dy: 0 });
    M.draw(mA, t, wt('P2', 'along') - 0.2, 0.7); M.vis(mAL, t, wt('P2', 'along'), 1e9, { dy: 0 });
    M.draw(mB, t, wt('P2', 'up') - 0.3, 0.6); M.vis(mBL, t, wt('P2', 'up'), 1e9, { dy: 0 });
    M.vis(mP.g, t, wt('P2', 'point') - 0.3, 1e9, PT); M.vis(mZL, t, wt('P2', 'point'), 1e9, { dy: 0 });
    M.vis(mTri, t, wt('M2', 'triangle') - 0.1, 1e9, { dy: 0, fade: 0.4 }); M.vis(mRA, t, wt('M2', 'triangle'), 1e9, { dy: 0 });
    M.draw(mH, t, wt('M3', 'squared') - 0.3, 0.7); M.vis(mHL, t, wt('M5', 'five') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, wt('P2', 'Think') + 0.3, tM1 - 0.2, { dx: 60, dy: 0, ...o });
    M.vis($('#tp0'), t, wt('P2', 'along') - 0.2, 1e9, { dy: 14 }); M.vis($('#tp1'), t, wt('P2', 'up') - 0.2, 1e9, { dy: 14 });
    M.vis($('#prP'), t, wt('P3', 'builds') - 0.1, 1e9, POP);
    M.vis($('#mr'), t, tM1 + 0.05, out, { dx: 60, dy: 0, ...o });
    MSt.forEach((_, i) => { const el = $('#ms' + i); M.vis(el.querySelector('.n'), t, tMs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tMs[i], 0.8); M.vis(el.querySelector('.why'), t, tMs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tMs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#mHi'); M.vis(hb, t, tMs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
  }

  /* G: argument + live trip */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('K1');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#gf1'), t, wt('G1', 'argument') - 0.1, 0.6); M.vis($('#gGh'), t, wt('G1', 'argument') + 0.3, 1e9, POP);
    M.vis($('#gt1'), t, wt('G2', 'angle') - 0.1, 1e9, { dy: 10 });
    M.vis($('#gP1'), t, wt('G2', 'Anticlockwise') - 0.1, 1e9, POP); M.vis($('#gP2'), t, wt('G3', 'Clockwise') - 0.1, 1e9, POP);
    PUC.write($('#gf2'), t, wt('G3', 'pick') - 0.1, 0.8); M.vis($('#gL2'), t, wt('G3', 'principal') - 0.1, 1e9, { dy: 8 });
    M.vis($('#gP3'), t, wt('G6', 'Zero') - 0.1, 1e9, POP);
    M.vis($('#gr'), t, wt('G2', 'angle') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tp = wt('G2', 'angle');
    M.vis(GP.g, t, tp, 1e9, { dy: 0, fade: 0.3 });
    const [x, y] = zG(t), r = Math.hypot(x, y), th = Math.atan2(y, x), X = GP.X(x), Y = GP.Y(y);
    gZ.set(X, Y); M.vis(gZ.g, t, tp + 0.2, 1e9, PT);
    attr(gR, 'x1', GP.ox); attr(gR, 'y1', GP.oy); attr(gR, 'x2', X.toFixed(1)); attr(gR, 'y2', Y.toFixed(1)); M.hide(gR, t < tp + 0.3 || r < 0.05);
    const ar = Math.min(58, r * GP.s * 0.6); attr(gArc, 'd', r > 0.05 ? arcD(GP.ox, GP.oy, ar, 0, th) : ''); M.hide(gArc, t < tp + 0.4);
    attr(gTh, 'x', (GP.ox + (ar + 22) * Math.cos(th / 2)).toFixed(1)); attr(gTh, 'y', (GP.oy - (ar + 22) * Math.sin(th / 2) + 9).toFixed(1)); M.hide(gTh, t < tp + 0.4 || r < 0.5);
    const bOn = t >= tgB; gB.set(X, GP.Y(-y)); M.vis(gB.g, t, tgB, 1e9, PT);
    attr(gRB, 'x1', GP.ox); attr(gRB, 'y1', GP.oy); attr(gRB, 'x2', X.toFixed(1)); attr(gRB, 'y2', GP.Y(-y).toFixed(1)); M.hide(gRB, !bOn || r < 0.05);
    attr(gArcB, 'd', bOn && r > 0.05 ? arcD(GP.ox, GP.oy, ar * 0.75, 0, -th) : ''); M.hide(gArcB, !bOn);
    if (t > tg0) { let d = ''; const n = 60, te = Math.min(t, tg1); for (let i = 0; i <= n; i++) { const [a, b] = zG(tg0 + (te - tg0) * i / n); d += (i ? 'L' : 'M') + GP.X(a).toFixed(1) + ',' + GP.Y(b).toFixed(1); } attr(gTr, 'd', d); } else attr(gTr, 'd', '');
    const dg = Math.round(deg(th)), s1 = r < 0.05 ? 'no argument' : `${dg > 0 ? '+' : ''}${dg}°`;
    $('#gR1').innerHTML = `<span style="color:${MO}">|<span class="k">z</span>| = ${r.toFixed(2)}</span>&nbsp;&nbsp;&nbsp;<span style="color:${IV}">arg <span class="k">z</span> = ${s1}</span>`;
    const dgb = Math.round(deg(Math.atan2(-y, x))), s2 = r < 0.05 ? 'no argument' : `${dgb > 0 ? '+' : ''}${dgb}°`;
    $('#gR2').innerHTML = `<span style="color:${MO}">|<span class="k" style="text-decoration:overline">z</span>| = ${r.toFixed(2)}</span>&nbsp;&nbsp;&nbsp;<span style="color:${IV}">arg <span class="k" style="text-decoration:overline">z</span> = ${s2}</span>`;
    M.vis($('#gR1'), t, tp + 0.3, 1e9, { dy: 10 }); M.vis($('#gR2'), t, tgB + 0.1, 1e9, { dy: 10 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'same', 0) - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'over') });
  }

  /* R: quadrant rule */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#rs' + i); M.vis(el.querySelector('.n'), t, tRs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRs[i], 0.8); M.vis(el.querySelector('.why'), t, tRs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tRs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const ph = phR(t), q = qOf(t), lit = t >= tRs[2] - 0.1;
    rQ.forEach((Q, i) => { attr(Q.r, 'opacity', lit && i === q ? '1' : '0'); M.vis(Q.tx, t, i < 2 ? wt('R4', i ? 'Second' : 'First') : wt('R5', i === 2 ? 'Third' : 'Fourth'), 1e9, { dy: 0 }); });
    const x = 5 * Math.cos(ph), y = 5 * Math.sin(ph), th = Math.atan2(y, x), X = RP.X(x), Y = RP.Y(y);
    rZ.set(X, Y); M.vis(rZ.g, t, tRs[0] - 0.1, 1e9, PT);
    attr(rRad, 'x1', RP.ox); attr(rRad, 'y1', RP.oy); attr(rRad, 'x2', X.toFixed(1)); attr(rRad, 'y2', Y.toFixed(1)); M.hide(rRad, t < tRs[0]);
    const ax = Math.abs(th) <= Math.PI / 2 ? 0 : (th > 0 ? Math.PI : -Math.PI);
    attr(rWedge, 'd', arcD(RP.ox, RP.oy, 92, ax, th, true)); M.vis(rWedge, t, tRs[0] + 0.2, 1e9, { dy: 0, fade: 0.3 });
    const mid = (ax + th) / 2; attr(rAl, 'x', (RP.ox + 112 * Math.cos(mid)).toFixed(1)); attr(rAl, 'y', (RP.oy - 112 * Math.sin(mid) + 8).toFixed(1)); M.vis(rAl, t, tRs[0] + 0.3, 1e9, { dy: 0 });
    attr(rArc, 'd', arcD(RP.ox, RP.oy, 52, 0, th)); M.hide(rArc, t < tRs[2] - 0.1);
    const dg = Math.round(deg(th)); $('#rRd').innerHTML = `<span style="color:${IV}">θ = ${dg > 0 ? '+' : ''}${dg}°</span>`; M.vis($('#rRd'), t, tRs[2] - 0.1, 1e9, { dy: 8 });
  }

  /* S: mirror vs opposite + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    [[SM, '#sm', '#smF', '#smP', T0('S1'), 'mirror', 'Opposite'], [SN, '#sn', '#snF', '#snP', T0('S2'), 'point', 'opposite']].forEach(([P, c, f, p, t0, w1, w2], k) => {
      const id = k ? 'S2' : 'S1';
      M.vis($(c), t, t0 + 0.1 - (k ? 0.2 : 0), out, { dx: k ? 60 : -60, dy: 0, ...o });
      PUC.write($(f), t, wt(id, 'modulus') - 0.2, 0.8);
      M.vis(P.z.g, t, t0 + 0.4, 1e9, PT); M.draw(P.r1, t, t0 + 0.5, 0.4); M.draw(P.a1, t, t0 + 0.7, 0.4); M.vis(P.l1, t, t0 + 0.9, 1e9, { dy: 0 });
      M.vis(P.b.g, t, wt(id, k ? 'minus' : 'minus') - 0.1, 1e9, PT); M.draw(P.r2, t, wt(id, w1) - 0.2, 0.4);
      M.draw(P.a2, t, wt(id, w2) - 0.3, 0.5); M.vis(P.l2, t, wt(id, w2), 1e9, { dy: 0 });
      M.vis($(p), t, wt(id, w2) + 0.1, 1e9, POP);
    });
    M.vis($('#th2'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'five') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Square') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'modulus') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'argument') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.4, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(WP.g, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.vis(wZ.g, t, T0('W2') + 0.8, 1e9, PT);
    M.draw(wR, t, tW[0] - 0.1, 0.5); M.vis(wRL, t, tW[0] + 0.3, 1e9, { dy: 0 });
    M.vis(wW, t, tW[1], 1e9, { dy: 0, fade: 0.3 }); M.vis(wWL, t, tW[1] + 0.2, 1e9, { dy: 0 });
    M.vis(wQ, t, tW[2] - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wQL, t, tW[2], 1e9, { dy: 0 });
    M.draw(wA, t, tW[3] - 0.1, 0.8); M.vis(wAL, t, tW[3] + 0.5, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'points') - 0.1, tRight: wt('X3', 'right') - 0.2 });
    M.vis(TP.g, t, tX1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    M.draw(tWr, t, wt('X2', 'pi') - 0.1, 0.4); M.vis(tWrL, t, wt('X3', 'first') - 0.1, 1e9, { dy: 0 });
    M.vis(tPt, t, wt('X3', 'sits') - 0.2, 1e9, PT); M.vis(tRtL, t, wt('X3', 'sits'), 1e9, { dy: 0 });
    M.draw(tRt, t, wt('X3', 'right') - 0.1, 0.4); M.draw(tArc, t, wt('X3', 'minus') - 0.1, 0.6);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'Advanced')], tType: wt('J1', 'modulus') });
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
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
