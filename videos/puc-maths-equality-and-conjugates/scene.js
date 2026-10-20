// PUC Maths Ep 41: Equality and conjugates (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 4 canon): real part a blue, imaginary part b coral (accent), i violet, z ink, z bar = hollow ink ring
const RE = '#2F6FEB', REB = '#E7EEFD', IM = C.ac, IV = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const re = s => `\\textcolor{${RE}}{${s}}`, im = s => `\\textcolor{${IM}}{${s}}`, iv = s => `\\textcolor{${IV}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const sg = (neg) => `\\mathbin{\\textcolor{${IM}}{${neg ? '-' : '+'}}}`;
// a complex number with colour-coded parts: cz(3, -2) -> 3 - 2i
const cz = (a, b) => `${re(a)} ${sg(String(b)[0] === '-')} ${im(String(b).replace('-', ''))}${iv('i')}`;
const ZB = '\\bar{z}';
const fmt = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
const zHTML = (bar, a, b) => `<span class="k"${bar ? ' style="text-decoration:overline"' : ''}>z</span> = <span style="color:${RE}">${fmt(a)}</span> <span style="color:${IM}">${b < -0.05 ? '-' : '+'} ${fmt(Math.abs(b))}</span><span style="color:${IV}">i</span>`;

/* ---------- small Argand picture helpers ---------- */
const plane = (svg, o) => {
  const { ox, oy, s, x0, x1, y0, y1 } = o, X = v => ox + v * s, Y = v => oy - v * s, g = mk(svg, 'g', {});
  mk(g, 'line', { x1: X(x0), y1: oy, x2: X(x1), y2: oy, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${X(x1) + 6},${oy} l-14,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: ox, y1: Y(y0), x2: ox, y2: Y(y1), stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${ox},${Y(y1) - 6} l-7,14 h14 z`, fill: C.ink });
  for (let v = Math.ceil(x0); v <= Math.floor(x1); v++) if (v) mk(g, 'line', { x1: X(v), y1: oy - 6, x2: X(v), y2: oy + 6, stroke: C.ink, 'stroke-width': 1.5 });
  for (let v = Math.ceil(y0); v <= Math.floor(y1); v++) if (v) mk(g, 'line', { x1: ox - 6, y1: Y(v), x2: ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 1.5 });
  if (o.lab !== false) { txt(g, X(x1) - 2, oy + 30, 'real', { 'text-anchor': 'end', 'font-size': 16, fill: RE, 'font-weight': 600 }); txt(g, ox + 12, Y(y1) + 10, 'imaginary', { 'font-size': 16, fill: IM, 'font-weight': 600 }); }
  return { X, Y, g };
};
// a labelled point: solid (z) or hollow dashed ring (z bar); label offset dx, dy
const zpt = (svg, bar, lab = true) => {
  const pg = mk(svg, 'g', {}), g = mk(pg, 'g', {});
  mk(g, 'circle', bar ? { r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '5 4' } : { r: 12, fill: C.ink });
  let l = null; if (lab) { l = mk(g, 'g', {}); txt(l, 18, bar ? 34 : -14, 'z', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink }); if (bar) mk(l, 'line', { x1: 19, y1: 10, x2: 34, y2: 10, stroke: C.ink, 'stroke-width': 2.5 }); }
  return { pg, g, l, set(x, y) { attr(pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } };
};

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tE1 = T0('E1'), tC1 = T0('C1'), tK1 = T0('K1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1'), tD1 = T0('D1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the two numbers ---------- */
const LS = [['FIRST NUMBER', K(cz(3, 2))], ['SECOND NUMBER', K(cz(3, -2))], ['BOTH HAVE', 'an imaginary part']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'three') - 0.05, wt('H1', 'minus') - 0.05, wt('H1', 'Both') - 0.05];

/* ---------- H: add and multiply, the road ---------- */
const HR = [['ADD THEM', `(${cz(3, 2)}) + (${cz(3, -2)}) = ${re('6')}`], ['MULTIPLY THEM', `(${cz(3, 2)})(${cz(3, -2)}) = ${re('13')}`]];
$('#hrs').innerHTML = HR.map(([l, f], i) => `<div class="hrow" id="hr${i}" style="top:${84 + i * 156}px"><div class="hl">${l}</div><div class="hf">${K(f)}</div><div class="chip" style="background:var(--ok)">${M.icon('check', 22, '#fff', 3)}no i</div></div>`).join('');
const tHr = [wt('H2', 'Add') + 0.1, wt('H2', 'Multiply')], tHc = [wt('H2', 'six'), wt('H2', 'thirteen')];
const hs = $('#hkS');
const road = mk(hs, 'rect', { x: 36, y: 404, width: 712, height: 148, rx: 12, fill: '#E9EBF0' });
const mid = mk(hs, 'line', { x1: 48, y1: 478, x2: 736, y2: 478, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '18 12', opacity: 0.55 });
const midL = txt(hs, 736, 470, 'MIDDLE LINE', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600, 'letter-spacing': 1.5 });
const along = mk(hs, 'line', { x1: 120, y1: 478, x2: 480, y2: 478, stroke: RE, 'stroke-width': 6, 'stroke-linecap': 'round' });
const alongL = txt(hs, 120, 470, 'SAME DISTANCE ALONG', { 'font-size': 16, fill: RE, 'font-weight': 600, 'letter-spacing': 1.5 });
const gapU = mk(hs, 'line', { x1: 480, y1: 474, x2: 480, y2: 438, stroke: IM, 'stroke-width': 4, 'stroke-dasharray': '6 5' });
const gapD = mk(hs, 'line', { x1: 480, y1: 482, x2: 480, y2: 518, stroke: IM, 'stroke-width': 4, 'stroke-dasharray': '6 5' });
const gapL = txt(hs, 500, 484, 'SAME GAP', { 'font-size': 16, fill: IM, 'font-weight': 600, 'letter-spacing': 1.5 });
const pA = zpt(hs, false, false), pR = zpt(hs, true, false); pA.set(480, 430); pR.set(480, 526);
const pAL = txt(hs, 456, 436, 'AARAV', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
const pRL = txt(hs, 456, 532, 'RAVI', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });

/* ---------- E: equality + match test ---------- */
$('#eq1').innerHTML = K(`${re('a')} + ${im('b')}\\,${iv('i')} = ${re('c')} + ${im('d')}\\,${iv('i')}`);
$('#eq2').innerHTML = K(`\\iff\\ ${re('a = c')}\\ \\text{and}\\ ${im('b = d')}`);
const MR = [[cz(3, 2), cz(3, 2), 1, 1], [cz(3, 2), cz(3, -2), 1, 0]];
const mcH = (lab, ok, x) => `<div class="mc" style="left:${x}px;background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 16, '#fff', 3)}${lab}</div>`;
$('#mrs').innerHTML = MR.map(([p, q, r, i], k) => `<div class="mrow" id="mr${k}" style="top:${96 + k * 170}px"><div class="mf">${K(`${p} \\quad\\text{vs}\\quad ${q}`)}</div>${mcH('REAL', r, 22)}${mcH('IMAGINARY', i, 142)}<div class="vd" style="background:${r && i ? C.ok : C.red}">${r && i ? 'EQUAL' : 'NOT EQUAL'}</div></div>`).join('');
const tM = [[wt('E4', 'Three') - 0.1, wt('E4', 'Real'), wt('E4', 'Imaginary'), wt('E4', 'Equal')],
  [T0('E5'), wt('E5', 'real'), wt('E5', 'imaginary'), wt('E5', 'Not')]];
const avA = PUC.avatar($('#sE'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same street, other floor? A different home.' });

/* ---------- C: conjugate + live mirror ---------- */
$('#cf1').innerHTML = K(`z = ${re('a')} + ${im('b')}\\,${iv('i')}`);
$('#cf2').innerHTML = K(`${ZB} = ${re('a')} ${sg(1)} ${im('b')}\\,${iv('i')}`);
$('#cf3').innerHTML = K(ZB);
const cs = $('#cS'), CP = plane(cs, { ox: 392, oy: 280, s: 46, x0: -7.4, x1: 7.4, y0: -4.3, y1: 4.3 });
const trZ = mk(cs, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, opacity: 0.22, 'stroke-linecap': 'round' });
const trB = mk(cs, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, opacity: 0.22, 'stroke-dasharray': '6 6', 'stroke-linecap': 'round' });
const cLink = mk(cs, 'line', { stroke: IM, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
const cFoot = mk(cs, 'circle', { r: 7, fill: RE });
const cZ = zpt(cs, false), cB = zpt(cs, true);
const tc0 = wt('C5', 'Watch'), tc1 = wt('C5', 'reflection'), tc2 = wt('C6', 'climbs') - 0.1, tc3 = wt('C6', 'Real') - 0.1, tc4 = T1('C6') + 0.2, tc5 = wt('C7', 'lands') + 0.1;
const KZ = [[tc0, 3, 2], [tc1, -3, 1.2], [tc2, -3, 1.2], [tc3, -3, 3.4], [tc4, -1.2, 3.4], [tc5, 2.6, 0]];
const zAt = t => { if (t <= KZ[0][0]) return [KZ[0][1], KZ[0][2]]; for (let i = 1; i < KZ.length; i++) if (t < KZ[i][0]) { const [a, x0, y0] = KZ[i - 1], [b, x1, y1] = KZ[i], u = M.io((t - a) / Math.max(0.01, b - a)); return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u]; } const L = KZ[KZ.length - 1]; return [L[1], L[2]]; };
const tMeet = wt('C7', 'real');
const th1 = PUC.think($('#th1'), { q: 'Is 6i its own conjugate, like a real number?', opts: ['Yes', 'No'], right: 1, why: 'No: 6i = 0 + 6i, so its conjugate is -6i. Only real numbers are their own conjugates.' });

/* ---------- S: conjugate vs negative ---------- */
$('#scF').innerHTML = K(`${cz(3, 2)} \\;\\to\\; ${cz(3, -2)}`);
$('#snF').innerHTML = K(`${cz(3, 2)} \\;\\to\\; ${cz('-3', -2)}`);
const sideP = (svg, neg) => {
  const P = plane(svg, { ox: 392, oy: 310, s: 40, x0: -4.6, x1: 4.6, y0: -3.6, y1: 3.6 });
  const ln = neg ? mk(svg, 'line', { x1: P.X(3), y1: P.Y(2), x2: P.X(-3), y2: P.Y(-2), stroke: C.red, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' }) : mk(svg, 'line', { x1: P.X(3), y1: P.Y(2), x2: P.X(3), y2: P.Y(-2), stroke: IM, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
  const a = zpt(svg, false); a.set(P.X(3), P.Y(2));
  const pg = mk(svg, 'g', { transform: `translate(${neg ? P.X(-3) : P.X(3)},${P.Y(-2)})` }), b = mk(pg, 'g', {});
  mk(b, 'circle', neg ? { r: 12, fill: C.red } : { r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '5 4' });
  const l = neg ? txt(b, -22, 36, '-z', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.red }) : (() => { const q = mk(b, 'g', {}); txt(q, 18, 34, 'z', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink }); mk(q, 'line', { x1: 19, y1: 10, x2: 34, y2: 10, stroke: C.ink, 'stroke-width': 2.5 }); return q; })();
  return { ln, a, b };
};
const SC = sideP($('#scS'), false), SN = sideP($('#snS'), true);
const th2 = PUC.think($('#th2'), { q: 'What is the conjugate of 4 - 7i?', opts: ['4 + 7i', '-4 + 7i'], right: 0, why: 'Keep the real part 4, flip only the imaginary sign: -7i becomes +7i.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`z = ${re('a')} + ${im('b')}\\,${iv('i')} \\qquad\\Rightarrow\\qquad ${ZB} = ${re('a')} ${sg(1)} ${im('b')}\\,${iv('i')}`);

/* ---------- D: derivation + picture ---------- */
const DS = [[`z + ${ZB} = (${re('a')} + ${im('b')}${iv('i')}) + (${re('a')} ${sg(1)} ${im('b')}${iv('i')})`, 'real with real, imaginary with imaginary'],
  [`\\phantom{z + ${ZB}} = ${re('2a')}`, `+ib and -ib cancel: a real number`],
  [`z\\,${ZB} = (a + ib)(a - ib) = a^2 - (ib)^2`, 'the pattern (x + y)(x - y) = x² - y²'],
  [`\\phantom{z\\,${ZB}} = a^2 - ${iv('i')}^2 b^2 = ${re('a^2')} + ${im('b^2')}`, `because i² = -1`]];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Add'), wt('D3', 'cancel') - 0.2, wt('D4', 'Multiply'), wt('D5', 'squared')];
const ds = $('#dS'), DP = plane(ds, { ox: 92, oy: 214, s: 46, x0: -0.6, x1: 13.6, y0: -2.7, y1: 2.7, lab: false });
const aZ = PUC.arrow(ds, C.ink, 5), aB = PUC.arrow(ds, C.ink2, 5); aB.g.querySelector('path').setAttribute('stroke-dasharray', '9 7');
const dZl = txt(ds, DP.X(1.2), DP.Y(1.5), 'z', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink });
const dBl = mk(ds, 'g', {}); txt(dBl, DP.X(4.8), DP.Y(1.5), 'z', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink2 }); mk(dBl, 'line', { x1: DP.X(4.8) + 1, y1: DP.Y(1.5) - 24, x2: DP.X(4.8) + 16, y2: DP.Y(1.5) - 24, stroke: C.ink2, 'stroke-width': 2.5 });
const dUp = txt(ds, DP.X(3) + 12, DP.Y(1) + 6, '+2i', { 'font-size': 22, fill: IM, 'font-weight': 600 });
const dDn = txt(ds, DP.X(6) + 12, DP.Y(1) + 6, '-2i', { 'font-size': 22, fill: IM, 'font-weight': 600 });
const dCan = txt(ds, 748, 92, 'up 2, down 2: cancel', { 'text-anchor': 'end', 'font-size': 20, fill: IM, 'font-weight': 600 });
const d2a = mk(ds, 'line', { x1: DP.X(0), y1: DP.Y(0), x2: DP.X(6), y2: DP.Y(0), stroke: RE, 'stroke-width': 9, 'stroke-linecap': 'round' });
const d2aL = txt(ds, DP.X(3), DP.Y(0) + 40, '2a = 6', { 'text-anchor': 'middle', 'font-size': 24, fill: RE, 'font-weight': 600 });
const sqA = mk(ds, 'rect', { x: 92, y: 346, width: 96, height: 96, fill: REB, stroke: RE, 'stroke-width': 3 });
const sqAL = txt(ds, 140, 402, 'a² = 9', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 });
const sqB = mk(ds, 'rect', { x: 230, y: 378, width: 64, height: 64, fill: C.ac2, stroke: IM, 'stroke-width': 3 });
const sqBL = txt(ds, 262, 470, 'b² = 4', { 'text-anchor': 'middle', 'font-size': 20, fill: IM, 'font-weight': 600 });
const sqS = txt(ds, 330, 424, '9 + 4 = 13', { 'font-size': 34, fill: C.ink, 'font-weight': 600 });
const avD = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A number times its mirror is always real!' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`z + 2${ZB} = ${cz(9, -4)}`)}<br>Find the complex number z.`;
const wsol = PUC.solution($('#wl'), [
  [K(`z = ${re('x')} + ${im('y')}\\,${iv('i')}, \\quad ${ZB} = ${re('x')} - ${im('y')}\\,${iv('i')}`)],
  [K(`z + 2${ZB} = ${re('3x')} - ${im('y')}\\,${iv('i')}`)],
  [K(`${re('3x = 9')} \\;\\Rightarrow\\; ${re('x = 3')}`)],
  [K(`${im('-y = -4')} \\;\\Rightarrow\\; ${im('y = 4')}`)],
  [K(`z = ${cz(3, 4)}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Let'), wt('W4', 'Collect'), wt('W5', 'Equate'), wt('W6', 'Equate'), wt('W7', 'So')];
const PR = [['REAL PARTS', RE, re('3x = 9'), re('x = 3')], ['IMAGINARY PARTS', IM, im('-y = -4'), im('y = 4')], ['CHECK', C.ok, `(${cz(3, 4)}) + (${cz(6, -8)})`, `= ${cz(9, -4)}`]];
$('#prs').innerHTML = PR.map(([l, c, f, a], i) => `<div class="pr" id="pr${i}" style="top:${84 + i * 128}px"><div class="pl" style="color:${c}">${l}</div><div class="pf">${K(f)}</div><div class="pa">${K(a)}</div></div>`).join('');
$('#pr2 .pf').style.fontSize = '32px'; $('#pr2 .pa').style.fontSize = '32px'; $('#pr2 .pa').style.top = '46px';
$('#wRes').innerHTML = K(`z = 3 + 4i`) + `&nbsp;&nbsp;${M.icon('check', 24, '#fff', 3)}`;
const tPr = [wt('W5', 'real'), wt('W6', 'imaginary'), wt('W7', 'Check')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(1 + i)x + (1 - i)y = 2 + 4i \\;\\Rightarrow\\; x = 2,\\ y = 4`), right: K(`(${re('x + y')}) + ${iv('i')}(${im('x - y')}) = 2 + 4i \\;\\Rightarrow\\; x = 3,\\ y = -1`) });
$('#tpan').innerHTML = [[`\\text{real: } ${re('x + y = 2')}`, 0], [`\\text{imaginary: } ${im('x - y = 4')}`, 68], [`x = 3,\\ \\ y = -1`, 136]].map(([f, y], i) => `<div class="tp2" id="tp${i}" style="top:${y}px">${K(f)}</div>`).join('');
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'JEE ADVANCED', 'PUC BOARDS'], type: 'Equations in z and z bar, solved by equating real and imaginary parts' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 760,
  q: `${K(`S = \\{\\, z \\in \\mathbb{C} : z^2 + ${ZB} = 0 \\,\\}`)}<br>The sum of the real parts of all elements of S is`,
  opts: [K('-1'), K('0'), K('\\tfrac{1}{2}'), K('1')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{Re: } ${re('x^2 - y^2 + x')} = 0`)], [K(`\\text{Im: } ${im('y(2x - 1)')} = 0`)], [K(`y = 0 \\Rightarrow z = 0,\\ -1`)], [K(`x = \\tfrac12 \\Rightarrow z = \\tfrac12 \\pm \\tfrac{\\sqrt3}{2}i`)], [K(`0 - 1 + \\tfrac12 + \\tfrac12 = 0`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Real'), wt('A2', 'Imaginary'), wt('A4', 'If'), wt('A4', 'If', 1), wt('A5', 'add')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · equality and conjugates', y0: 100, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${re('a')} + ${im('b')}${iv('i')} = ${re('c')} + ${im('d')}${iv('i')} \\iff ${re('a = c')},\\ ${im('b = d')}`),
    K(`z = ${re('a')} + ${im('b')}${iv('i')} \\;\\Rightarrow\\; ${ZB} = ${re('a')} ${sg(1)} ${im('b')}${iv('i')}`),
    K(`z + ${ZB} = ${re('2a')} \\qquad z\\,${ZB} = ${re('a^2')} + ${im('b^2')}`),
    K(`\\overline{${ZB}} = z \\qquad ${ZB} = z \\iff z \\text{ is real}`),
    'Conjugate: keep the real part, flip the imaginary sign'] });
const YQ = [`What is the conjugate of ${K('-2 + 7i')}?`, `If ${K('x + 3i = 4 + yi')} with x, y real, find x and y.`, `Why is ${K(`z\\,${ZB}`)} never negative?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 42', topic: 'How far, and which way? Modulus and Argument', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tc2 - 0.3, 1.06, 1300, 560], [T1('C7') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tE1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('E1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1].forEach(i => { const r = $('#hr' + i); M.vis(r, t, tHr[i] - 0.25, 1e9, { dy: 14 }); M.vis(r.querySelector('.hl'), t, tHr[i] - 0.2, 1e9, { dy: 8 }); PUC.write(r.querySelector('.hf'), t, tHr[i], 0.8); M.vis(r.querySelector('.chip'), t, tHc[i], 1e9, POP); });
    M.vis($('#hlP'), t, wt('H2', 'vanished') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis(road, t, tH4 - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.draw(mid, t, tH4, 0.6); M.vis(midL, t, tH4 + 0.3, 1e9, { dy: 0 });
    M.vis(pA.g, t, wt('H4', 'friend') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pAL, t, wt('H4', 'friend'), 1e9, { dy: 0 });
    M.vis(pR.g, t, wt('H4', 'across') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pRL, t, wt('H4', 'across'), 1e9, { dy: 0 });
    M.draw(along, t, wt('H4', 'along') - 0.2, 0.6); M.vis(alongL, t, wt('H4', 'along'), 1e9, { dy: 0 });
    M.draw(gapU, t, wt('H4', 'middle') - 0.2, 0.4); M.draw(gapD, t, wt('H4', 'middle'), 0.4); M.vis(gapL, t, wt('H4', 'middle') + 0.2, 1e9, { dy: 0 });
  }

  /* E: equality */
  const eOn = t >= tE1 - 0.1 && t < tC1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('C1');
    M.vis($('#el'), t, tE1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#eq1'), t, T0('E2') + 0.2, 0.9);
    PUC.write($('#eq2'), t, wt('E3', 'both') - 0.1, 0.8);
    M.vis($('#eP1'), t, wt('E3', 'Real') - 0.1, 1e9, POP); M.vis($('#eP2'), t, wt('E3', 'imaginary', 0) - 0.1, 1e9, POP);
    M.vis($('#eP3'), t, wt('E7', 'one') - 0.1, 1e9, POP);
    M.vis($('#em'), t, T0('E4') - 0.1, out, { dx: 60, dy: 0, ...o });
    tM.forEach(([a, r, i, v], k) => { const row = $('#mr' + k), c = row.querySelectorAll('.mc'); M.vis(row, t, a, 1e9, { dy: 16 }); M.vis(c[0], t, r, 1e9, POP); M.vis(c[1], t, i, 1e9, POP); M.vis(row.querySelector('.vd'), t, v - 0.05, 1e9, POP); });
    avA(t, T1('E5') + 0.1, out);
  }

  /* C: conjugate + live mirror + think */
  const cOn = t >= tC1 - 0.1 && t < tS1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#cf1'), t, wt('C2', 'conjugate') - 0.1, 0.7); PUC.write($('#cf2'), t, wt('C2', 'minus') - 0.25, 0.8);
    M.vis($('#cHi'), t, wt('C3', 'Flip') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#cP1'), t, wt('C3', 'Keep') - 0.1, 1e9, POP); M.vis($('#cP2'), t, wt('C3', 'Flip') - 0.1, 1e9, POP);
    PUC.write($('#cf3'), t, wt('C4', 'bar') - 0.2, 0.5); M.vis($('#cRd'), t, wt('C4', 'read') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#cp'), t, wt('C2', 'minus') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tp = wt('C2', 'minus') + 0.2;
    M.vis(CP.g, t, tp, 1e9, { dy: 0, fade: 0.3 });
    const [x, y] = zAt(t), X = CP.X(x), Yz = CP.Y(y), Yb = CP.Y(-y);
    cZ.set(X, Yz); cB.set(X, Yb);
    M.vis(cZ.g, t, tp + 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(cB.g, t, tp + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    attr(cLink, 'x1', X.toFixed(1)); attr(cLink, 'x2', X.toFixed(1)); attr(cLink, 'y1', (Yz + 14).toFixed(1)); attr(cLink, 'y2', (Yb - 14).toFixed(1));
    M.hide(cLink, t < tp + 0.6 || Math.abs(y) < 0.35); attr(cFoot, 'cx', X.toFixed(1)); attr(cFoot, 'cy', CP.Y(0)); M.hide(cFoot, t < tp + 0.6);
    // trails since the live run started
    if (t > tc0) { let dz = '', db = ''; const n = 48, te = Math.min(t, tc5 + 0.5); for (let i = 0; i <= n; i++) { const [a, b] = zAt(tc0 + (te - tc0) * i / n); dz += (i ? 'L' : 'M') + CP.X(a).toFixed(1) + ',' + CP.Y(b).toFixed(1); db += (i ? 'L' : 'M') + CP.X(a).toFixed(1) + ',' + CP.Y(-b).toFixed(1); } attr(trZ, 'd', dz); attr(trB, 'd', db); } else { attr(trZ, 'd', ''); attr(trB, 'd', ''); }
    const meet = M.io((t - tMeet + 0.2) / 0.3); if (cZ.l) { cB.l.style.opacity = (1 - meet).toFixed(3); }
    $('#cZ').innerHTML = zHTML(false, x, y); $('#cB').innerHTML = zHTML(true, x, -y);
    M.vis($('#cZ'), t, tp + 0.3, 1e9, { dy: 10 }); M.vis($('#cB'), t, tp + 0.6, 1e9, { dy: 10 });
    $('#cMeet').innerHTML = `${M.icon('check', 22, C.ok, 3)} z = z̄ : a real number`; M.vis($('#cMeet'), t, tMeet - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('S1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'conjugate') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Six') });
  }

  /* S: conjugate vs negative + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sc'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#scF'), t, wt('S1', 'Three') - 0.1, 0.8);
    M.vis(SC.a.g, t, wt('S1', 'Three'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(SC.b, t, wt('S1', 'becomes'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.draw(SC.ln, t, wt('S1', 'mirror') - 0.2, 0.5); M.vis($('#scP'), t, wt('S1', 'mirror') - 0.1, 1e9, POP);
    M.vis($('#sn'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#snF'), t, wt('S2', 'Three') - 0.1, 0.8);
    M.vis(SN.a.g, t, wt('S2', 'Three'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(SN.b, t, wt('S2', 'becomes'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.draw(SN.ln, t, wt('S2', 'through') - 0.2, 0.6); M.vis($('#snP'), t, wt('S2', 'through') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'conjugate') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Keep') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Keep') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'flip') - 0.1, 0.9);
  }

  /* D: why the i vanishes */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('W1');
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 100]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dP'), t, wt('D6', 'Always') - 0.1, 1e9, POP);
    M.vis($('#dg'), t, tD1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - tDs[0] - 0.2) / 0.7), u2 = M.io((t - wt('D2', 'imaginary') - 0.1) / 0.7);
    aZ.set(DP.X(0), DP.Y(0), DP.X(3 * u1), DP.Y(2 * u1)); M.hide(aZ.g, u1 <= 0.01);
    aB.set(DP.X(3), DP.Y(2), DP.X(3 + 3 * u2), DP.Y(2 - 2 * u2)); M.hide(aB.g, u2 <= 0.01);
    M.vis(dZl, t, tDs[0] + 0.5, 1e9, { dy: 0 }); M.vis(dBl, t, wt('D2', 'imaginary') + 0.5, 1e9, { dy: 0 });
    M.vis(dUp, t, tDs[1] - 0.3, 1e9, { dy: 0 }); M.vis(dDn, t, tDs[1] - 0.1, 1e9, { dy: 0 }); M.vis(dCan, t, tDs[1] + 0.1, 1e9, POP);
    M.draw(d2a, t, wt('D3', 'two') - 0.2, 0.6); M.vis(d2aL, t, wt('D3', 'two'), 1e9, { dy: 0 });
    M.vis(sqA, t, wt('D6', 'squared') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis(sqAL, t, wt('D6', 'squared'), 1e9, { dy: 0 });
    M.vis(sqB, t, wt('D6', 'squared', 1) - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis(sqBL, t, wt('D6', 'squared', 1), 1e9, { dy: 0 });
    M.vis(sqS, t, wt('D6', 'thirteen') - 0.4, 1e9, { dx: -12, dy: 0 });
    avD(t, wt('D6', 'nine') - 0.2, out);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W3') + 0.2, out, { dx: 60, dy: 0, ...o });
    PR.forEach((_, i) => { const el = $('#pr' + i); M.vis(el, t, tPr[i] - 0.2, 1e9, { dy: 16 }); PUC.write(el.querySelector('.pf'), t, tPr[i], 0.6); PUC.write(el.querySelector('.pa'), t, tPr[i] + (i === 2 ? 1.2 : 0.9), 0.5); });
    M.vis($('#wRes'), t, tW[4] + 0.2, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'both') - 0.1, tRight: wt('X3', 'three') - 0.2 });
    [wt('X3', 'Collect'), wt('X3', 'minus'), wt('X3', 'So')].forEach((tt, i) => { const el = $('#tp' + i); M.vis(el, t, tt - 0.1, 1e9, { dx: 20, dy: 0 }); });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'Advanced'), wt('J1', 'PUC')], tType: wt('J1', 'equations') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'sum'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
