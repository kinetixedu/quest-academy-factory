// PUC Maths Ep 32: Trigonometric identities (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible, Ch 3): theta violet, sin coral (accent), cos blue, tan teal; added here: sec gold, cot orange, cosec magenta
const TH = C.violet, SN = C.ac, CS = '#2F6FEB', TN = '#0E8F8F', SE = '#B7791F', CO = '#D9731A', CC = '#C2378A';
const CSB = '#E7EEFD', SNB = C.ac2, GREY = '#8A90A0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
// math label in svg: upright function name + italic theta (KaTeX fonts, like the formulas)
const mlab = (p, x, y, fn, col, size = 28, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'KaTeX_Main', 'font-size': size, fill: col }, a)); if (fn) e.appendChild(document.createTextNode(fn + ' ')); const s = document.createElementNS(nsv, 'tspan'); s.setAttribute('font-family', 'KaTeX_Math'); s.setAttribute('font-style', 'italic'); s.textContent = 'θ'; e.appendChild(s); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f = (col, s) => `\\textcolor{${col}}{${s}}`;
const th = f(TH, '\\theta');
const Ss = f(SN, '\\sin\\theta'), Cc = f(CS, '\\cos\\theta'), Tt = f(TN, '\\tan\\theta'), SEt = f(SE, '\\sec\\theta');
const S2 = f(SN, '\\sin^2\\theta'), C2 = f(CS, '\\cos^2\\theta'), T2 = f(TN, '\\tan^2\\theta'), SE2 = f(SE, '\\sec^2\\theta'), CO2 = f(CO, '\\cot^2\\theta'), CC2 = f(CC, '\\operatorname{cosec}^2\\theta');
const R35 = 35 * Math.PI / 180, c35 = Math.cos(R35), s35 = Math.sin(R35);
const pulse = (t, a, d = 0.9) => M.io((t - a) / 0.2) * (1 - M.io((t - a - d) / 0.35));
const seg = segs => t => { let v = segs[0][2]; for (const [a, b, v0, v1] of segs) if (t >= a) v = v0 + (v1 - v0) * M.io((t - a) / Math.max(0.01, b - a)); return v; };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tI5 = T0('I5'), tU1 = T0('U1'), tD1 = T0('D1'), tE1 = T0('E1'), tC1 = T0('C1'), tK1 = T0('K1'), tK3 = T0('K3');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three expressions ---------- */
const LS = [['EXPRESSION 1', `${S2} + ${C2}`], ['EXPRESSION 2', `${SE2} - ${T2}`], ['EXPRESSION 3', `${CC2} - ${CO2}`]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'Sine') - 0.1, wt('H1', 'Secant') - 0.1, wt('H1', 'Cosecant') - 0.1];

/* ---------- H: the table ---------- */
const HX = [196, 380, 564], HA = ['17°', '50°', '123°'];
$('#hcs').innerHTML = `<div class="lbl" style="left:36px;top:96px">ANGLE</div>` + LS.map(([, v], j) => `<div class="hh" id="hh${j}" style="left:${HX[j]}px">${K(v)}</div>`).join('') +
  HA.map((a, i) => `<div class="hc" id="ha${i}" style="left:36px;top:${148 + i * 96}px;width:140px;background:#fff;color:${TH};border:2.5px solid ${TH}">${a}</div>` +
    HX.map((x, j) => `<div class="hc" id="hv${i}${j}" style="left:${x}px;top:${148 + i * 96}px;width:172px">1.000</div>`).join('')).join('') +
  `<div class="pillp good" id="hP" style="left:36px;top:470px">${M.icon('check', 22, C.ok, 3)} Always exactly 1</div>`;
const tHa = [wt('H2', 'Seventeen'), wt('H2', 'fifty'), wt('H2', 'one')];

/* ---------- I: equation or identity ---------- */
$('#iqf0').innerHTML = K('2x = 6'); $('#iqf1').innerHTML = K(`${S2} + ${C2} = 1`);
$('#ilA').innerHTML = K('2x = 6'); $('#ilB').innerHTML = K(`${S2} + ${C2} = 1`);
const is = $('#iS'), AX = v => 76 + v * 632 / 6, AY = 200, BX = v => 76 + v * 632 / 360, BY = 420;
mk(is, 'line', { x1: 60, y1: AY, x2: 724, y2: AY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 6; v++) { mk(is, 'line', { x1: AX(v), y1: AY - 9, x2: AX(v), y2: AY + 9, stroke: C.ink, 'stroke-width': 2 }); txt(is, AX(v), AY + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const aTr = mk(is, 'line', { x1: AX(0), y1: AY, x2: AX(0), y2: AY, stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round', opacity: 0.55 });
const aOk = mk(is, 'circle', { cx: AX(3), cy: AY, r: 13, fill: C.ok });
const aDot = mk(is, 'circle', { cx: AX(0), cy: AY, r: 11, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const aVal = txt(is, AX(0), AY - 26, '', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
mk(is, 'line', { x1: 60, y1: BY, x2: 724, y2: BY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 360; v += 90) { mk(is, 'line', { x1: BX(v), y1: BY - 9, x2: BX(v), y2: BY + 9, stroke: C.ink, 'stroke-width': 2 }); txt(is, BX(v), BY + 40, v + '°', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const bTr = mk(is, 'line', { x1: BX(0), y1: BY, x2: BX(0), y2: BY, stroke: C.ok, 'stroke-width': 8, 'stroke-linecap': 'round' });
const bDot = mk(is, 'circle', { cx: BX(0), cy: BY, r: 11, fill: '#fff', stroke: TH, 'stroke-width': 3 });
const bVal = txt(is, BX(0), BY - 26, '', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const tAs = wt('I2', 'true'), tAe = T1('I2') + 0.2, tBs = wt('I3', 'every'), tBe = T1('I3') + 0.3;
const th1 = PUC.think($('#th1'), { q: `${K(`${Ss} = ${Cc}`)} is true at 45°. Is it an identity?`, opts: ['Yes', 'No'], right: 1, why: 'At 0°, sin 0° = 0 but cos 0° = 1. One failing angle is enough to break it.' });

/* ---------- U + D: unit circle ---------- */
const UC = (svg, cx, cy, R) => {
  const X = u => cx + R * u, Y = v => cy - R * v, o = { X, Y };
  o.ax = mk(svg, 'path', { d: `M${cx - R - 46},${cy} H${cx + R + 46} M${cx},${cy + R + 34} V${cy - R - 34}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
  o.circ = mk(svg, 'circle', { cx, cy, r: R, fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
  o.sqG = mk(svg, 'g', {});
  o.arc = mk(svg, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3.5 });
  o.hyp = mk(svg, 'line', { stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
  o.base = mk(svg, 'line', { stroke: CS, 'stroke-width': 7, 'stroke-linecap': 'round' });
  o.hgt = mk(svg, 'line', { stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' });
  o.rt = mk(svg, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2 });
  o.P = mk(svg, 'circle', { r: 10, fill: C.ink });
  o.Pl = txt(svg, 0, 0, 'P', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink });
  o.thl = mlab(svg, 0, 0, '', TH, 26);
  o.one = txt(svg, 0, 0, '1', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' });
  o.cl = mlab(svg, 0, 0, 'cos', CS, 28, { 'text-anchor': 'middle' });
  o.sl = mlab(svg, 0, 0, 'sin', SN, 28);
  // set the picture for angle a (deg) and stretch s
  o.set = (a, s = 1) => {
    const r = a * Math.PI / 180, c = Math.cos(r), n = Math.sin(r), Fx = X(s * c), Py = Y(s * n);
    attr(o.hyp, 'x1', cx); attr(o.hyp, 'y1', cy); attr(o.hyp, 'x2', Fx.toFixed(1)); attr(o.hyp, 'y2', Py.toFixed(1));
    attr(o.base, 'x1', cx); attr(o.base, 'y1', cy); attr(o.base, 'x2', Fx.toFixed(1)); attr(o.base, 'y2', cy);
    attr(o.hgt, 'x1', Fx.toFixed(1)); attr(o.hgt, 'y1', cy); attr(o.hgt, 'x2', Fx.toFixed(1)); attr(o.hgt, 'y2', Py.toFixed(1));
    const sx = c >= 0 ? -1 : 1, sy = n >= 0 ? -1 : 1, k = 16;
    attr(o.rt, 'd', Math.abs(s * c) > 0.12 && Math.abs(s * n) > 0.12 ? `M${(Fx + sx * k).toFixed(1)},${cy} V${(cy + sy * k).toFixed(1)} H${Fx.toFixed(1)}` : '');
    const ar = 46, neg = a < 0, aa = neg ? -a : ((a % 360) + 360) % 360, ae = (neg ? -aa : aa) * Math.PI / 180;
    attr(o.arc, 'd', aa < 1 ? '' : `M${cx + ar},${cy} A${ar},${ar} 0 ${aa > 180 ? 1 : 0} ${neg ? 1 : 0} ${(cx + ar * Math.cos(ae)).toFixed(1)},${(cy - ar * Math.sin(ae)).toFixed(1)}`);
    const am = ae / 2; attr(o.thl, 'x', (cx + 70 * Math.cos(am) - 8).toFixed(1)); attr(o.thl, 'y', (cy - 70 * Math.sin(am) + 10).toFixed(1));
    attr(o.P, 'cx', X(c).toFixed(1)); attr(o.P, 'cy', Y(n).toFixed(1));
    attr(o.Pl, 'x', (X(c) + 22 * Math.cos(r) - 8).toFixed(1)); attr(o.Pl, 'y', (Y(n) - 22 * Math.sin(r) + 8).toFixed(1));
    attr(o.one, 'x', (cx + (Fx - cx) * 0.5 - 26 * n * (c >= 0 ? 1 : -1)).toFixed(1)); attr(o.one, 'y', (cy + (Py - cy) * 0.5 - 22 * Math.abs(c) + 8).toFixed(1));
    attr(o.cl, 'x', (cx + (Fx - cx) / 2).toFixed(1)); attr(o.cl, 'y', (cy + (n >= 0 ? 40 : -20)).toFixed(1));
    attr(o.sl, 'x', (Fx + (c >= 0 ? 16 : -100)).toFixed(1)); attr(o.sl, 'y', (cy + (Py - cy) / 2 + 10).toFixed(1));
    return { c, n };
  };
  return o;
};
const us = $('#uS'), U = UC(us, 360, 344, 190);
// Pythagoras squares at 35 degrees (D4)
const sq = (pts, col, bg) => mk(U.sqG, 'polygon', { points: pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' '), fill: bg, stroke: col, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
const O = [360, 344], Fp = [U.X(c35), 344], Pp = [U.X(c35), U.Y(s35)], bL = 190 * c35, hL = 190 * s35;
const sqB = sq([O, Fp, [Fp[0], Fp[1] + bL], [O[0], O[1] + bL]], CS, CSB);
const sqH = sq([Fp, Pp, [Pp[0] + hL, Pp[1]], [Fp[0] + hL, Fp[1]]], SN, SNB);
const nx = -s35, ny = -c35; // up-left normal (screen) of OP, length 190
const sqP = sq([O, Pp, [Pp[0] + nx * 190, Pp[1] + ny * 190], [O[0] + nx * 190, O[1] + ny * 190]], C.ink, '#EEF0F4');
[sqB, sqH, sqP].forEach(p => attr(p, 'fill-opacity', '0.85'));
const sqBl = mlab(U.sqG, O[0] + bL / 2, O[1] + bL / 2 + 10, 'cos²', CS, 26, { 'text-anchor': 'middle' });
const sqHl = mlab(U.sqG, Fp[0] + hL / 2, Fp[1] - hL / 2 + 10, 'sin²', SN, 22, { 'text-anchor': 'middle' });
const sqPl = txt(U.sqG, O[0] + nx * 95 + (Pp[0] - O[0]) / 2, O[1] + ny * 95 + (Pp[1] - O[1]) / 2 + 10, '1²', { 'font-family': 'KaTeX_Main', 'font-size': 30, fill: C.ink, 'text-anchor': 'middle' });
$('#pBig').innerHTML = K(`P = (${Cc},\\ ${Ss})`);
const PS = [[`\\text{base} = ${Cc},\\ \\text{height} = ${Ss}`, 'the coordinates of P'], ['\\text{hypotenuse } OP = 1', 'radius of the circle'],
  [`(${f(CS, '\\text{base}')})^2 + (${f(SN, '\\text{height}')})^2 = (\\text{hyp})^2`, 'Pythagoras'], [`${C2} + ${S2} = 1`, 'put the values in']];
$('#pSt').innerHTML = PS.map(([s, w], i) => `<div class="st" id="ps${i}" style="top:${78 + i * 66}px"><div class="n">${i + 1}</div><div class="sx">${K(s)}</div><div class="why">${w}</div></div>`).join('');
$('#pNote').innerHTML = K(`${S2} = (${Ss})^2 \\;\\neq\\; \\sin(\\theta^2)`);
const tPs = [wt('D2', 'Drop'), wt('D3', 'hypotenuse'), wt('D4', 'Pythagoras'), wt('D5', 'cosine')];
const thU = seg([[wt('U2', 'Turn'), wt('U2', 'Turn') + 1.3, 0, 35], [wt('U4', 'Watch'), T1('U5') + 0.4, 35, 395],
  [wt('D7', 'slide'), wt('D7', 'negative') + 0.3, 35, 148], [wt('D7', 'total') - 0.3, T1('D7') + 0.5, 148, 395]]);
$('#ro').innerHTML = `<span style="color:${TH}"><span class="th">θ</span> = <span id="roA">35°</span></span>&nbsp;&nbsp;&nbsp;<span id="roC" style="color:${CS}"></span> + <span id="roS" style="color:${SN}"></span> = <b>1.000</b>`;
$('#ro2').innerHTML = `<span style="color:${CS}">cos²<span class="th">θ</span></span> + <span style="color:${SN}">sin²<span class="th">θ</span></span> = 1 &nbsp;·&nbsp; <span id="ro2c" style="color:${CS}"></span> &nbsp; <span id="ro2s" style="color:${SN}"></span>`;
let roLast = '';
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

/* ---------- E + C: stretch the triangle ---------- */
const es = $('#eS'), E = UC(es, 300, 372, 170);
const eGh = mk(es, 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
es.insertBefore(eGh, E.hyp);
const tgA = mk(es, 'line', { x1: E.X(1), y1: E.Y(-0.25), x2: E.X(1), y2: E.Y(1.15), stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
const tgB = mk(es, 'line', { x1: E.X(-0.6), y1: E.Y(1), x2: E.X(1.85), y2: E.Y(1), stroke: C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
es.insertBefore(tgA, E.hyp); es.insertBefore(tgB, E.hyp);
const eTan = mlab(es, 0, 0, 'tan', TN, 28), eSec = mlab(es, 0, 0, 'sec', SE, 28, { 'text-anchor': 'end' }), eOne = txt(es, 0, 0, '1', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' });
const eCot = mlab(es, 0, 0, 'cot', CO, 28, { 'text-anchor': 'middle' }), eCsc = mlab(es, 0, 0, 'cosec', CC, 28, { 'text-anchor': 'end' }), eOneB = txt(es, 0, 0, '1', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink });
const tE7 = wt('E7', 'Stretch'), tC2s = wt('C2', 'stretched') - 0.2;
const sA = seg([[tE7, tE7 + 1.8, 1, 1 / c35], [tC1 + 0.1, tC1 + 0.9, 1 / c35, 1]]);
const sB = seg([[tC2s, tC2s + 1.8, 1, 1 / s35]]);
const ER = [[`\\dfrac{${S2}}{${C2}}`, `\\dfrac{${C2}}{${C2}}`, `\\dfrac{1}{${C2}}`], [T2, '1', SE2]];
const trow = (id, parts) => `<span class="tm" id="${id}0">${K(parts[0])}</span>${K('+')}<span class="tm" id="${id}1">${K(parts[1])}</span>${K('=')}<span class="tm" id="${id}2">${K(parts[2])}</span>`;
$('#eSt').innerHTML = [[K(`${S2} + ${C2} = 1`), 'identity 1'], [trow('ea', ER[0]), K('\\cos\\theta \\neq 0')], [trow('eb', ER[1]), 'tan = sin ÷ cos, sec = 1 ÷ cos'], [K(`1 + ${T2} = ${SE2}`), 'identity 2']]
  .map(([s, w], i) => `<div class="dr" id="er${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
$('#cSt').innerHTML = [[trow('ca', [`\\dfrac{${S2}}{${S2}}`, `\\dfrac{${C2}}{${S2}}`, `\\dfrac{1}{${S2}}`]), K('\\sin\\theta \\neq 0')], [K(`1 + ${CO2} = ${CC2}`), 'identity 3']]
  .map(([s, w], i) => `<div class="dr" id="cr${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
document.querySelectorAll('.tm').forEach(e => { e.style.borderRadius = '8px'; e.style.padding = '0 4px'; e.style.display = 'inline-block'; });
const tEr = [T0('E1') + 0.2, wt('E2', 'Divide'), wt('E3', 'tan'), wt('E6', 'one')];
const tEb = [wt('E3', 'tan'), wt('E4', 'itself'), wt('E5', 'secant')];
const tCr = [wt('C1', 'Divide'), wt('C2', 'We')];
const avA = PUC.avatar($('#sE'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So all three are one fact, divided two ways.' });

/* ---------- K: side by side ---------- */
$('#kaF').innerHTML = K(`${S2} + ${C2} = 1`); $('#kbF').innerHTML = K(`1 + ${T2} = ${SE2}`);
$('#kbP').textContent = 'tan and sec undefined at 90° and 270°';
const strip = (svg, gaps) => {
  const X = v => 76 + v * 632 / 360, Y = 300, o = {};
  mk(svg, 'line', { x1: 60, y1: Y, x2: 724, y2: Y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = 0; v <= 360; v += 90) { mk(svg, 'line', { x1: X(v), y1: Y - 9, x2: X(v), y2: Y + 9, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), Y + 40, v + '°', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
  const cuts = [0, ...gaps, 360]; o.segs = [];
  for (let i = 0; i < cuts.length - 1; i++) o.segs.push(mk(svg, 'line', { x1: X(cuts[i]) + (i ? 14 : 0), y1: Y, x2: X(cuts[i + 1]) - (i < cuts.length - 2 ? 14 : 0), y2: Y, stroke: C.ok, 'stroke-width': 10, 'stroke-linecap': 'round' }));
  o.holes = gaps.map(g => mk(svg, 'circle', { cx: X(g), cy: Y, r: 11, fill: '#fff', stroke: C.red, 'stroke-width': 3.5 }));
  o.hl = gaps.map(g => txt(svg, X(g), Y - 30, `cos ${g}° = 0`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 }));
  o.ttl = txt(svg, 76, 230, 'TESTED FROM 0° TO 360°', { 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
  return o;
};
const kA = strip($('#kaS'), []), kB = strip($('#kbS'), [90, 270]);
const avD = PUC.avatar($('#sK'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So identity 1 is the safest place to start.' });
const th2 = PUC.think($('#th2'), { q: `Is ${K(`1 + ${T2} = ${SE2}`)} true at 90°?`, opts: ['Yes', 'No'], right: 1, why: 'cos 90° = 0, so tan 90° and sec 90° do not exist. Both sides are undefined.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${S2} + ${C2} = 1`);

/* ---------- W: worked example ---------- */
const CCt = f(CC, '\\operatorname{cosec}\\theta');
$('#wq').innerHTML = `If ${K(`${SEt} = \\tfrac{13}{5}`)} and ${K(th)} lies in quadrant IV,<br>find ${K(Tt)}, ${K(Ss)} and ${K(CCt)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${T2} = ${SE2} - 1 = \\tfrac{169}{25} - 1 = \\tfrac{144}{25}`)],
  [K(`${Tt} = \\pm\\tfrac{12}{5} \\;\\Rightarrow\\; -\\tfrac{12}{5}`), 'quadrant IV'],
  [K(`${Ss} = \\dfrac{${Tt}}{${SEt}} = -\\tfrac{12}{13}`)],
  [K(`${CCt} = \\dfrac{1}{${Ss}} = -\\tfrac{13}{12}`)],
  [K(`1 + \\tfrac{25}{144} = \\tfrac{169}{144} = ${CC2}`) + `&nbsp;${M.icon('check', 26, C.ok, 3)}`]], { label: 'WORKED EXAMPLE', y0: 184, dy: 78 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => { e.style.display = 'flex'; e.style.alignItems = 'center'; });
const tW = [wt('W3', 'second'), wt('W4', 'plus'), wt('W5', 'Sine'), wt('W6', 'Cosecant'), wt('W7', 'Check')];
const WCX = 392, WCY = 270, ws = $('#wS'), W = UC(ws, WCX, WCY, 190);
const wq2 = mk(ws, 'rect', { x: WCX + 8, y: WCY + 8, width: 236, height: 222, fill: '#F1ECFD', rx: 10 });
ws.insertBefore(wq2, ws.firstChild);
const wQl = txt(ws, WCX + 196, WCY + 170, 'IV', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: TH, 'text-anchor': 'middle' });
const wQx = txt(ws, WCX + 196, WCY + 200, 'x > 0, y < 0', { 'font-size': 18, fill: TH, 'font-weight': 600, 'text-anchor': 'middle' });
const mlab2 = (x, y, fn, col, sfx, a = {}) => { const e = mlab(ws, x, y, fn, col, 26, a); e.appendChild(document.createTextNode(' = ' + sfx)); return e; };
const wcv = mlab2(0, 0, 'cos', CS, '5/13');
const wsv = mlab2(0, 0, 'sin', SN, '-12/13');
const WA = -Math.asin(12 / 13) * 180 / Math.PI;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K('(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + \\cos^2\\theta = 1'), right: K('(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta') });
const ts = $('#tS'), Q0 = [40, 40], QS = 96;
const tq = (x, y, w, h, col, bg) => mk(ts, 'rect', { x, y, width: w, height: h, fill: bg, stroke: col, 'stroke-width': 2.5 });
const tqS = tq(Q0[0], Q0[1], QS, QS, SN, SNB), tqC = tq(Q0[0] + QS, Q0[1] + QS, QS, QS, CS, CSB), tqR1 = tq(Q0[0] + QS, Q0[1], QS, QS, C.ink2, '#EEF0F4'), tqR2 = tq(Q0[0], Q0[1] + QS, QS, QS, C.ink2, '#EEF0F4');
const qlab = (x, y, fn, col, sz, v) => { const g = mk(ts, 'g', {}); mlab(g, x, y, fn, col, sz, { 'text-anchor': 'middle' }); txt(g, x, y + 26, v, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); return g; };
const tlS = qlab(Q0[0] + QS / 2, Q0[1] + 44, 'sin²', SN, 24, '0.5'), tlC = qlab(Q0[0] + QS * 1.5, Q0[1] + QS + 44, 'cos²', CS, 24, '0.5');
const tlR1 = qlab(Q0[0] + QS * 1.5, Q0[1] + 44, 'sin·cos', C.ink2, 17, '0.5'), tlR2 = qlab(Q0[0] + QS / 2, Q0[1] + QS + 44, 'sin·cos', C.ink2, 17, '0.5');
const tChk = mk(ts, 'g', {});
txt(tChk, 270, 92, 'AT 45°: SIDE = 0.707 + 0.707', { 'font-size': 16, 'letter-spacing': 1, 'font-weight': 600 });
txt(tChk, 270, 140, '(0.707 + 0.707)² = 2.000', { 'font-size': 22, fill: C.ok, 'font-weight': 600 });
txt(tChk, 270, 184, '0.5 + 0.5 + 0.5 + 0.5 = 2', { 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Given one ratio, find the others, or simplify using the identities.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `If ${K(`${SEt} + ${Tt} = 3`)},<br>then ${K(Ss)} is equal to`,
  opts: [K('3/5'), K('4/5'), K('3/4'), K('1/3')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${SE2} - ${T2} = 1`)], [K(`(${SEt} - ${Tt}) \\times 3 = 1`)], [K(`${SEt} - ${Tt} = \\tfrac{1}{3}`)], [K(`${SEt} = \\tfrac{5}{3},\\ ${Tt} = \\tfrac{4}{3}`)], [K(`${Ss} = \\dfrac{${Tt}}{${SEt}} = \\tfrac{4}{5}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Secant'), wt('A2', 'which'), wt('A3', 'third'), wt('A4', 'Add'), wt('A5', 'Sine')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · trigonometric identities', y0: 98, dy: 78, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Identity</b>: true for every angle where both sides are defined',
    K(`${S2} + ${C2} = 1`),
    K(`1 + ${T2} = ${SE2}`) + `<span class="cn">${K('\\cos\\theta \\neq 0')}</span>`,
    K(`1 + ${CO2} = ${CC2}`) + `<span class="cn">${K('\\sin\\theta \\neq 0')}</span>`,
    '<b>Trap</b>: ' + K('(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta')] });
const YQ = [`Why is ${K(`${Ss} = ${Cc}`)} not an identity?`, `If ${K(`${Cc} = \\tfrac{3}{5}`)}, what are the two possible values of ${K(Ss)}?`, `At which angles is ${K(`1 + ${CO2} = ${CC2}`)} not defined?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nxt = PUC.next($('#sF'), { label: 'NEXT · EP 33', topic: 'Is sin(30° + 60°) = sin 30° + sin 60°? Compound-Angle Formulae', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: three expressions */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: any angle gives 1 */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    LS.forEach((_, j) => M.vis($('#hh' + j), t, tMorph + 0.3 + j * 0.1, 1e9, { dy: 12 }));
    HA.forEach((_, i) => { M.vis($('#ha' + i), t, tHa[i] - 0.1, 1e9, { dx: -16, dy: 0 });
      [0, 1, 2].forEach(j => { const el = $('#hv' + i + j); M.vis(el, t, tHa[i] + 0.35 + j * 0.15, 1e9, POP);
        const g = M.io((t - wt('H4', 'all')) / 0.3); el.style.background = mix(C.soft, C.okBg, g); el.style.color = mix(C.ink, '#1F6B3F', g); }); });
    M.vis($('#hP'), t, wt('H4', 'exactly') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'luck') - 0.1, 1e9, POP);
  }

  /* I: equation or identity + live test */
  const iOn = t >= tI1 - 0.1 && t < tU1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('I5');
    M.vis($('#il'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#iq0'), t, wt('I2', 'equation') - 0.1, 1e9, { dy: 16 }); M.vis($('#iq1'), t, wt('I3', 'identity') - 0.1, 1e9, { dy: 16 });
    M.rise($('#idT'), t, wt('I3', 'true'), { st: 0.05, sp: M.HEAVY });
    const ev = $('#idT b'); ev.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('I3', 'every')) / 0.3)); ev.style.borderRadius = '8px';
    M.vis($('#idW'), t, wt('I3', 'wherever') - 0.1, 1e9, { dy: 10 });
    M.vis($('#ir'), t, T0('I2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#ilA'), t, T0('I2') + 0.2, 1e9, { dy: 10 }); M.vis($('#ilB'), t, wt('I3', 'identity') - 0.1, 1e9, { dy: 10 });
    // strip A: scan x from 0 to 6, only x = 3 works
    const ua = M.clamp((t - tAs) / (tAe - tAs)), xa = 6 * ua; const aOn = t >= T0('I2') + 0.2;
    [aTr, aDot, aVal].forEach(e => M.hide(e, !aOn || t < tAs - 0.05)); M.hide(is, false);
    attr(aTr, 'x2', AX(xa).toFixed(1)); attr(aDot, 'cx', AX(xa).toFixed(1)); attr(aVal, 'x', AX(xa).toFixed(1)); M.setT(aVal, `2x = ${(2 * xa).toFixed(1)}`);
    M.vis(aOk, t, tAs + (tAe - tAs) * 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#irA'), t, tAe, 1e9, POP);
    const ub = M.clamp((t - tBs) / (tBe - tBs)), xb = 360 * ub; const bOn = t >= tBs - 0.05;
    [bTr, bDot, bVal].forEach(e => M.hide(e, !bOn));
    attr(bTr, 'x2', BX(xb).toFixed(1)); attr(bDot, 'cx', BX(xb).toFixed(1)); attr(bVal, 'x', BX(xb).toFixed(1)); M.setT(bVal, `${Math.round(xb)}°: 1.000`);
    M.vis($('#irB'), t, tBe, 1e9, POP);
    M.vis($('#iP'), t, wt('I4', 'lucky') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tI5 + 0.05, OUT('U1'), { dy: 36, ...o });
    th1(t, { tin: tI5, tOpts: wt('I5', 'identity') - 0.1, tCount: T1('I5') + 0.05, dur: 3, tAns: T0('I6') - 0.02, tWhy: wt('I6', 'zero') });
  }

  /* U + D: unit circle, live angle, proof */
  const uOn = t >= tU1 - 0.1 && t < tE1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('E1');
    M.vis($('#uc'), t, tU1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis(U.ax, t, tU1 + 0.3, 1e9, { dy: 0 }); M.draw(U.circ, t, wt('U1', 'Radius') - 0.1, 1.0);
    const a = thU(t), on = t >= wt('U2', 'Turn') - 0.1;
    [U.hyp, U.P, U.Pl, U.arc, U.thl].forEach(e => M.hide(e, !on));
    const { c, n } = U.set(a);
    const bOn = M.vis(U.base, t, wt('U3', 'x'), 1e9, { dy: 0, fade: 0.2 }), hOn2 = M.vis(U.hgt, t, wt('U3', 'y'), 1e9, { dy: 0, fade: 0.2 });
    const sqW = [wt('D4', 'base') - 0.3, wt('D6', 'means') + 0.2]; M.vis(U.cl, t, wt('U3', 'cosine'), 1e9, { dy: 0 }); M.vis(U.sl, t, wt('U3', 'sine'), 1e9, { dy: 0 }); if (t > sqW[0] && t < sqW[1]) { const q = 1 - M.io((t - sqW[0]) / 0.25) * (1 - M.io((t - sqW[1] + 0.25) / 0.25)); U.cl.style.opacity = q.toFixed(3); U.sl.style.opacity = q.toFixed(3); }
    M.vis(U.rt, t, wt('D2', 'right') - 0.1, 1e9, { dy: 0 });
    M.vis(U.one, t, wt('U5', 'slanted'), 1e9, { dy: 0 });
    // glow (thicker stroke) when a step talks about a part
    const gB = pulse(t, wt('D2', 'base'), 1.0) + pulse(t, wt('D5', 'cosine'), 0.8), gH = pulse(t, wt('D2', 'height'), 1.0) + pulse(t, wt('D5', 'sine'), 0.8), gP = pulse(t, wt('U5', 'radius'), 1.4) + pulse(t, wt('D3', 'hypotenuse'), 1.2);
    attr(U.base, 'stroke-width', (7 + 5 * gB).toFixed(2)); attr(U.hgt, 'stroke-width', (7 + 5 * gH).toFixed(2)); attr(U.hyp, 'stroke-width', (4 + 5 * gP).toFixed(2));
    // Pythagoras squares (step 3)
    const sqOn = t >= wt('D4', 'base') - 0.1 && t < wt('D6', 'means') + 0.3; M.hide(U.sqG, !sqOn);
    if (sqOn) { const so2 = wt('D6', 'means');
      M.vis(sqB, t, wt('D4', 'base') - 0.05, so2, { dy: 0, fade: 0.25 }); M.vis(sqBl, t, wt('D4', 'base') + 0.1, so2, { dy: 0 });
      M.vis(sqH, t, wt('D4', 'height') - 0.05, so2, { dy: 0, fade: 0.25 }); M.vis(sqHl, t, wt('D4', 'height') + 0.1, so2, { dy: 0 });
      M.vis(sqP, t, wt('D4', 'hypotenuse') - 0.05, so2, { dy: 0, fade: 0.25 }); M.vis(sqPl, t, wt('D4', 'hypotenuse') + 0.1, so2, { dy: 0 }); }
    // proof card
    M.vis($('#pfC'), t, wt('U2', 'point') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pfL0'), t, wt('U2', 'point'), tD1, { dy: 10, outDur: 0.25 }); PUC.write($('#pBig'), t, wt('U3', 'x') - 0.1, 0.8, tD1 - 0.1);
    M.vis($('#pfL1'), t, tD1 + 0.15, 1e9, { dy: 10 });
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.8); M.vis(el.querySelector('.why'), t, tPs[i] + 0.7, 1e9, { dx: 12, dy: 0 }); });
    const hiY = M.track(78, [[tPs[1] - 0.1, 144], [tPs[2] - 0.1, 210], [tPs[3] - 0.1, 276]], M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#pNote'), t, wt('D6', 'means') - 0.1, 1e9, POP);
    // slider card + live values
    M.vis($('#slC'), t, wt('U4', 'Watch') - 0.2, out, { dx: 60, dy: 0, ...o });
    const ad = ((Math.round(a) % 360) + 360) % 360, cc = Math.cos(a * Math.PI / 180), ss = Math.sin(a * Math.PI / 180);
    const key = ad + '|' + cc.toFixed(3);
    if (key !== roLast) { roLast = key; M.setT($('#roA'), ad + '°'); M.setT($('#roC'), (cc * cc).toFixed(3)); M.setT($('#roS'), (ss * ss).toFixed(3));
      M.setT($('#ro2c'), 'cos = ' + (cc < -0.0005 ? '-' : ' ') + Math.abs(cc).toFixed(3)); M.setT($('#ro2s'), 'sin = ' + (ss < -0.0005 ? '-' : ' ') + Math.abs(ss).toFixed(3)); }
    $('#ro2c').style.fontWeight = cc < -0.0005 ? '700' : '500';
  }

  /* E + C: stretch the triangle */
  const eOn = t >= tE1 - 0.1 && t < tK1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('K1');
    M.vis($('#ec'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const modeB = t >= tC1 + 0.9, s = modeB ? sB(t) : sA(t);
    E.set(35, s);
    const uA = modeB ? 0 : M.clamp((s - 1) / (1 / c35 - 1)), uB = modeB ? M.clamp((s - 1) / (1 / s35 - 1)) : 0;
    attr(E.base, 'stroke', mix(mix(CS, C.ink, uA), CO, uB)); attr(E.hgt, 'stroke', mix(mix(SN, TN, uA), C.ink, uB)); attr(E.hyp, 'stroke', mix(mix(C.ink, SE, uA), CC, uB));
    const gb = pulse(t, tEb[0], 1.2) + pulse(t, tEb[1], 1.2) + pulse(t, tEb[2], 1.2) + pulse(t, wt('E2', 'Divide'), 1.4), gh = pulse(t, tEb[0], 1.2), gp = pulse(t, tEb[2], 1.2);
    attr(E.base, 'stroke-width', (7 + 5 * gb).toFixed(2)); attr(E.hgt, 'stroke-width', (7 + 5 * gh).toFixed(2)); attr(E.hyp, 'stroke-width', (5 + 4 * gp).toFixed(2));
    attr(eGh, 'd', s > 1.01 ? `M${E.X(0)},${E.Y(0)} L${E.X(c35)},${E.Y(0)} L${E.X(c35)},${E.Y(s35)} Z` : ''); M.hide(eGh, s <= 1.01);
    // labels: small triangle -> stretched
    const lo = 1 - Math.max(M.clamp(uA * 3), M.clamp(uB * 3));
    [E.cl, E.sl, E.one].forEach(e => { e.style.opacity = lo.toFixed(3); M.hide(e, lo < 0.01); });
    const Ax = E.X(s * c35), Ay = E.Y(s * n35());
    function n35() { return s35; }
    attr(eTan, 'x', (Ax + 16).toFixed(1)); attr(eTan, 'y', ((E.Y(0) + Ay) / 2 + 10).toFixed(1));
    attr(eSec, 'x', ((E.X(0) + Ax) / 2 - 14).toFixed(1)); attr(eSec, 'y', ((E.Y(0) + Ay) / 2 - 14).toFixed(1));
    attr(eOne, 'x', ((E.X(0) + Ax) / 2).toFixed(1)); attr(eOne, 'y', (E.Y(0) + 40).toFixed(1));
    attr(eCot, 'x', ((E.X(0) + Ax) / 2).toFixed(1)); attr(eCot, 'y', (E.Y(0) + 40).toFixed(1));
    attr(eCsc, 'x', ((E.X(0) + Ax) / 2 - 14).toFixed(1)); attr(eCsc, 'y', ((E.Y(0) + Ay) / 2 - 14).toFixed(1));
    attr(eOneB, 'x', (Ax + 16).toFixed(1)); attr(eOneB, 'y', ((E.Y(0) + Ay) / 2 + 10).toFixed(1));
    const la = t < tC1 + 0.1 ? M.clamp((uA - 0.6) / 0.4) : 0, lb = M.clamp((uB - 0.6) / 0.4);
    [eTan, eSec, eOne].forEach(e => { e.style.opacity = la.toFixed(3); M.hide(e, la < 0.01); });
    [eCot, eCsc, eOneB].forEach(e => { e.style.opacity = lb.toFixed(3); M.hide(e, lb < 0.01); });
    M.vis(tgA, t, wt('E7', 'base') - 0.2, tC1 + 0.2, { dy: 0, fade: 0.3 }); M.vis(tgB, t, tC2s - 0.3, 1e9, { dy: 0, fade: 0.3 });
    M.vis($('#sCh'), t, tE7 - 0.1, 1e9, POP);
    M.setT($('#sCh'), modeB ? (uB > 0 ? `stretch × ${s.toFixed(3)}` : 'stretch × 1.000') : `stretch × ${s.toFixed(3)}`);
    // derivation card
    M.vis($('#ed'), t, tE1 + 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis($('#edL0'), t, tE1 + 0.3, tC1, { dy: 10, outDur: 0.25 }); M.vis($('#edL1'), t, tC1 + 0.3, 1e9, { dy: 10 });
    [0, 1, 2, 3].forEach(i => { const el = $('#er' + i); const on2 = M.vis(el, t, tEr[i] - 0.25, tC1, { dy: 0, fade: 0.01, outDur: 0.3, ody: -10 });
      if (on2) { M.vis(el.querySelector('.n'), t, tEr[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); if (i !== 2) PUC.write(el.querySelector('.sx'), t, tEr[i], 0.8); M.vis(el.querySelector('.why'), t, tEr[i] + 0.7, 1e9, { dx: 12, dy: 0 }); } });
    // row 3 writes term by term; the matching fraction in row 2 lights, then both settle
    const r3 = $('#er2 .sx'); M.hide(r3, t < tEb[0] - 0.05);
    const kids = [...r3.children]; // span, +, span, =, span
    kids.forEach((k, j) => { const ti = j <= 1 ? tEb[0] : j <= 3 ? tEb[1] : tEb[2]; M.vis(k, t, ti - 0.05, 1e9, { dy: 8, fade: 0.15 }); });
    [0, 1, 2].forEach(j => { const hl = pulse(t, tEb[j] - 0.1, 1.1); $('#ea' + j).style.background = hl > 0.001 ? M.rgba(C.ac, 0.16 * hl) : ''; $('#eb' + j).style.background = hl > 0.001 ? M.rgba(C.ac, 0.16 * hl) : ''; });
    const eh = $('#eHi'); M.vis(eh, t, tEr[3] - 0.1, tC1, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); eh.style.top = (80 + 3 * 100 - 4) + 'px';
    [0, 1].forEach(i => { const el = $('#cr' + i); M.vis(el.querySelector('.n'), t, tCr[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCr[i], 0.8); M.vis(el.querySelector('.why'), t, tCr[i] + 0.7, 1e9, { dx: 12, dy: 0 }); });
    const ch = $('#eHi'); if (t >= tC1) { M.vis(ch, t, tCr[1] - 0.1, 1e9, { dy: 0, fade: 0.2 }); ch.style.top = (80 + 100 - 4) + 'px'; }
    avA(t, wt('C2', 'height') + 0.3, out);
  }

  /* K: side by side + pause and think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kaF'), t, tK1 + 0.4, 0.8);
    M.vis(kA.ttl, t, wt('K1', 'works') - 0.2, 1e9, { dy: 0 }); kA.segs.forEach(s => M.draw(s, t, wt('K1', 'every') - 0.1, 1.2));
    M.vis($('#kaP'), t, wt('K1', 'exceptions') - 0.1, 1e9, POP);
    avD(t, T1('K1') + 0.1, out);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#kbF'), t, T0('K2') + 0.2, 0.8);
    M.vis(kB.ttl, t, T0('K2') + 0.4, 1e9, { dy: 0 }); kB.segs.forEach((s, i) => M.draw(s, t, wt('K2', 'needs') + i * 0.35, 0.5));
    kB.holes.forEach((h, i) => M.vis(h, t, wt('K2', 'ninety') - 0.1 + i * 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    kB.hl.forEach((h, i) => M.vis(h, t, wt('K2', 'zero') - 0.1 + i * 0.25, 1e9, { dy: 0 }));
    M.vis($('#kbP'), t, wt('K2', 'exist') - 0.3, 1e9, POP);
    M.vis($('#th2'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'ninety') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'both') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Three') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Pythagoras') - 0.3, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    W.set(M.lerp(0, WA, M.io((t - T0('W2') - 0.5) / 1.2)));
    [W.cl, W.sl].forEach(e => M.hide(e, true));
    M.vis(wq2, t, wt('W2', 'fourth') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wQl, t, wt('W2', 'fourth'), 1e9, { dy: 0 }); M.vis(wQx, t, wt('W4', 'fourth') - 0.2, 1e9, { dy: 0 });
    M.vis(W.base, t, wt('W2', 'fourth') + 0.3, 1e9, { dy: 0 }); M.vis(W.hgt, t, wt('W2', 'fourth') + 0.4, 1e9, { dy: 0 }); M.vis(W.one, t, wt('W2', 'fourth') + 0.5, 1e9, { dy: 0 });
    M.vis(wcv, t, wt('W2', 'fourth') + 0.6, 1e9, { dy: 0 }); M.vis(wsv, t, tW[2] + 0.4, 1e9, { dy: 0 });
    const gb = pulse(t, wt('W4', 'fourth'), 1.0), gh = pulse(t, wt('W4', 'negative'), 1.0) + pulse(t, tW[2], 1.4), gp = pulse(t, tW[0], 1.2);
    attr(W.base, 'stroke-width', (7 + 5 * gb).toFixed(2)); attr(W.hgt, 'stroke-width', (7 + 5 * gh).toFixed(2)); attr(W.hyp, 'stroke-width', (4 + 5 * gp).toFixed(2));
    const Fx = W.X(5 / 13); attr(wcv, 'x', WCX + 20); attr(wcv, 'y', WCY - 70); attr(wsv, 'x', (Fx + 18).toFixed(1)); attr(wsv, 'y', (W.Y(-6 / 13) + 10).toFixed(1));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'bracket') - 0.1, tRight: wt('X3', 'one') });
    [tqS, tlS].forEach(e => M.vis(e, t, wt('X2', 'write'), 1e9, { dy: 0, fade: 0.2 })); [tqC, tlC].forEach(e => M.vis(e, t, wt('X2', 'write') + 0.4, 1e9, { dy: 0, fade: 0.2 }));
    [tqR1, tlR1, tqR2, tlR2].forEach((e, i) => M.vis(e, t, wt('X3', 'middle') - 0.1 + (i >> 1) * 0.3, 1e9, { dy: 0, fade: 0.2 }));
    const rr = pulse(t, wt('X3', 'middle'), 1.4); [tqR1, tqR2].forEach(e => attr(e, 'fill', mix('#EEF0F4', C.okBg, rr)));
    M.vis(tChk, t, wt('X3', 'forty') - 0.1, 1e9, { dx: -12, dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'given') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nxt(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
