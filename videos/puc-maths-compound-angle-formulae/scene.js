// PUC Maths Ep 33: Compound-angle formulae (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible, Ch 3): angle x violet, sin coral (accent), cos blue, tan teal; added here: second angle y gold
const XC = C.violet, YC = '#B7791F', SN = C.ac, CS = '#2F6FEB', TN = '#0E8F8F';
const GREY = '#8A90A0', IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
// svg maths label: parts [[text, 'r' upright | 'i' italic | 's' subscript, colour?]]
const ml = (p, x, y, parts, size = 28, col = C.ink, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'KaTeX_Main', 'font-size': size, fill: col }, a));
  parts.forEach(([s, k, c]) => { const sp = document.createElementNS(nsv, 'tspan'); sp.textContent = s; if (k === 'i') { sp.setAttribute('font-family', 'KaTeX_Math'); sp.setAttribute('font-style', 'italic'); } if (k === 's') { sp.setAttribute('font-size', size * 0.68); sp.setAttribute('dy', size * 0.22); } if (k === 'u') sp.setAttribute('dy', -size * 0.22); if (c) sp.setAttribute('fill', c); e.appendChild(sp); }); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f = (col, s) => `\\textcolor{${col}}{${s}}`;
const x = f(XC, 'x'), y = f(YC, 'y');
const sx = f(SN, `\\sin ${x}`), cx = f(CS, `\\cos ${x}`), sy = f(SN, `\\sin ${y}`), cy = f(CS, `\\cos ${y}`), tx = f(TN, `\\tan ${x}`), ty = f(TN, `\\tan ${y}`);
const sxy = f(SN, `\\sin(${x} + ${y})`), cxy = f(CS, `\\cos(${x} + ${y})`), sxmy = f(SN, `\\sin(${x} - ${y})`), cxmy = f(CS, `\\cos(${x} - ${y})`), txy = f(TN, `\\tan(${x} + ${y})`);
const al = f(XC, '\\alpha'), be = f(YC, '\\beta'), ta = f(TN, `\\tan ${al}`), tb = f(TN, `\\tan ${be}`);
const D2R = Math.PI / 180;
const pulse = (t, a, d = 0.9) => M.io((t - a) / 0.2) * (1 - M.io((t - a - d) / 0.35));
const arcD = (cx0, cy0, r, a0, a1) => { const p = a => [cx0 + r * Math.cos(a * D2R), cy0 - r * Math.sin(a * D2R)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${x1.toFixed(1)},${y1.toFixed(1)}`; };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tL1 = T0('L1'), tD1 = T0('D1'), tE1 = T0('E1'), tK1 = T0('K1'), tK3 = T0('K3');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['SINE OF THE SUM', '\\sin(30^\\circ + 60^\\circ) = \\;?'], ['SUM OF THE SINES', '\\sin 30^\\circ + \\sin 60^\\circ = \\;?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${465 + i * 510}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'sine') - 0.1, wt('H1', 'same') + 0.1];

/* ---------- H ---------- */
$('#htf0').innerHTML = K(`${f(SN, '\\sin(30^\\circ + 60^\\circ)')} = ${f(SN, '\\sin 90^\\circ')}`);
$('#htf1').innerHTML = K(`${f(SN, '\\sin 30^\\circ')} + ${f(SN, '\\sin 60^\\circ')}`);

/* ---------- P: definition + stacked heights ---------- */
$('#cg0').innerHTML = K(`${x} + ${y}`); $('#cg1').innerHTML = K(`${x} - ${y}`);
const pd = $('#pdS'), PO = [120, 520];
mk(pd, 'line', { x1: PO[0], y1: PO[1], x2: 700, y2: PO[1], stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const pRx = mk(pd, 'line', { x1: PO[0], y1: PO[1], x2: PO[0] + 540 * Math.cos(25 * D2R), y2: PO[1] - 540 * Math.sin(25 * D2R), stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const pRy = mk(pd, 'line', { x1: PO[0], y1: PO[1], x2: PO[0] + 300 * Math.cos(55 * D2R), y2: PO[1] - 300 * Math.sin(55 * D2R), stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const pAx = mk(pd, 'path', { d: arcD(PO[0], PO[1], 150, 0, 25), fill: 'none', stroke: XC, 'stroke-width': 5 });
const pAy = mk(pd, 'path', { d: arcD(PO[0], PO[1], 150, 25, 55), fill: 'none', stroke: YC, 'stroke-width': 5 });
const pAs = mk(pd, 'path', { d: arcD(PO[0], PO[1], 210, 0, 55), fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const pLx = ml(pd, PO[0] + 168 * Math.cos(12 * D2R), PO[1] - 168 * Math.sin(12 * D2R) + 10, [['x', 'i']], 30, XC);
const pLy = ml(pd, PO[0] + 168 * Math.cos(40 * D2R), PO[1] - 168 * Math.sin(40 * D2R) + 10, [['y', 'i']], 30, YC);
const pLs = ml(pd, PO[0] + 226 * Math.cos(30 * D2R), PO[1] - 226 * Math.sin(30 * D2R), [['x', 'i', XC], [' + ', 'r'], ['y', 'i', YC]], 28, C.ink);
// stacked heights on a unit circle
const ps = $('#pS'), QX = 300, QY = 330, QR = 170, QX_ = u => QX + QR * u, QY_ = v => QY - QR * v;
mk(ps, 'path', { d: `M${QX - QR - 40},${QY} H${QX + QR + 60} M${QX},${QY + QR + 30} V${QY - QR - 70}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const pCir = mk(ps, 'circle', { cx: QX, cy: QY, r: QR, fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const pTop = mk(ps, 'line', { x1: QX - 40, y1: QY_(1), x2: QX + QR + 160, y2: QY_(1), stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '7 6' });
const pTopL = txt(ps, QX + QR + 160, QY_(1) - 12, 'radius 1: the top', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const h60x = QX_(Math.cos(60 * D2R)), h30x = QX_(Math.cos(30 * D2R));
const pR60 = mk(ps, 'line', { x1: QX, y1: QY, x2: h60x, y2: QY_(Math.sin(60 * D2R)), stroke: C.ink, 'stroke-width': 3 });
const pR30 = mk(ps, 'line', { x1: QX, y1: QY, x2: h30x, y2: QY_(0.5), stroke: C.ink, 'stroke-width': 3 });
const pH60 = mk(ps, 'line', { x1: h60x, y1: QY, x2: h60x, y2: QY_(Math.sin(60 * D2R)), stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' });
const pH30g = mk(ps, 'g', {}), pH30 = mk(pH30g, 'line', { x1: 0, y1: 0, x2: 0, y2: -QR * 0.5, stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' });
const pOver = mk(pH30g, 'line', { x1: 0, y1: -QR * (1 - Math.sin(60 * D2R)), x2: 0, y2: -QR * 0.5, stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round' });
const pL60 = txt(ps, h60x - 14, QY_(0.43), '0.866', { 'text-anchor': 'end', 'font-size': 20, fill: SN, 'font-weight': 600 });
const pL30 = txt(pH30g, 16, -QR * 0.25 + 6, '0.5', { 'font-size': 20, fill: SN, 'font-weight': 600 });
const pSum = txt(ps, h60x + 18, QY_(1.366) + 6, '0.866 + 0.5 = 1.366', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
const tStack = wt('P2', 'Stack');
const th1 = PUC.think($('#th1'), { q: `Is ${K(`${f(CS, '\\cos(60^\\circ - 30^\\circ)')} = ${f(CS, '\\cos 60^\\circ')} - ${f(CS, '\\cos 30^\\circ')}`)} ?`, opts: ['Yes', 'No'], right: 1, why: 'cos 30° ≈ 0.866, but cos 60° - cos 30° ≈ -0.366. Cosine does not split over a minus sign.' });

/* ---------- L + D: the turning chord ---------- */
const ls = $('#lS'), LX = 380, LY = 300, LR = 200, AX = 50, AY = 35;
const LP = a => [LX + LR * Math.cos(a * D2R), LY - LR * Math.sin(a * D2R)];
mk(ls, 'path', { d: `M${LX - LR - 40},${LY} H${LX + LR + 50} M${LX},${LY + LR + 24} V${LY - LR - 30}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const lCir = mk(ls, 'circle', { cx: LX, cy: LY, r: LR, fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const lSec = mk(ls, 'path', { d: '', fill: C.ac2, stroke: 'none' });
const lAx = mk(ls, 'path', { d: arcD(LX, LY, 52, 0, AX), fill: 'none', stroke: XC, 'stroke-width': 4 });
const lAy = mk(ls, 'path', { d: arcD(LX, LY, 66, AX, AX + AY), fill: 'none', stroke: YC, 'stroke-width': 4 });
const lAmy = mk(ls, 'path', { d: arcD(LX, LY, 66, 0, -AY), fill: 'none', stroke: YC, 'stroke-width': 4 });
const lLx = ml(ls, LX + 74 * Math.cos(25 * D2R), LY - 74 * Math.sin(25 * D2R) + 8, [['x', 'i']], 26, XC);
const lLy = ml(ls, LX + 86 * Math.cos(67 * D2R) - 4, LY - 86 * Math.sin(67 * D2R) + 8, [['y', 'i']], 26, YC);
const lLmy = ml(ls, LX + 92 * Math.cos(-17 * D2R), LY - 92 * Math.sin(-17 * D2R) + 8, [['-', 'r'], ['y', 'i']], 26, YC);
const rays = [AX, AX + AY, -AY].map(a => mk(ls, 'line', { x1: LX, y1: LY, x2: LP(a)[0], y2: LP(a)[1], stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 5' }));
const chA = mk(ls, 'line', { x1: LP(-AY)[0], y1: LP(-AY)[1], x2: LP(AX)[0], y2: LP(AX)[1], stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const chB = mk(ls, 'line', { x1: LP(0)[0], y1: LP(0)[1], x2: LP(AX + AY)[0], y2: LP(AX + AY)[1], stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const chM = mk(ls, 'line', { stroke: C.ac, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '10 7' });
const tick = (a0, a1) => { const [x0, y0] = LP(a0), [x1, y1] = LP(a1), mx = (x0 + x1) / 2, my = (y0 + y1) / 2, L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L; return mk(ls, 'line', { x1: mx - uy * 14, y1: my + ux * 14, x2: mx + uy * 14, y2: my - ux * 14, stroke: C.ok, 'stroke-width': 4, 'stroke-linecap': 'round' }); };
const tkA = tick(-AY, AX), tkB = tick(0, AX + AY);
const PTS = [[AX, '1'], [AX + AY, '2'], [-AY, '3'], [0, '4']].map(([a, n]) => { const [px, py] = LP(a), g = mk(ls, 'g', {}); mk(g, 'circle', { cx: px, cy: py, r: 9, fill: C.ink });
  const lx = LX + (LR + 30) * Math.cos(a * D2R), ly = LY - (LR + 30) * Math.sin(a * D2R) + 9; ml(g, lx, ly, [['P', 'i'], [n, 's']], 26, C.ink, { 'text-anchor': 'middle' }); return g; });
const mvP = [0, 1].map(() => mk(ls, 'circle', { r: 9, fill: C.ac }));
const tPt = [wt('L2', 'one'), wt('L2', 'two'), wt('L3', 'three'), wt('L3', 'four')];
const tTurn = wt('L4', 'chord'), tLand = wt('L5', 'lands') - 0.2;
const rot = t => AY * M.io((t - tTurn) / Math.max(0.8, tLand - tTurn));
const CR = [[`P_1 = (${cx},\\ ${sx})`], [`P_2 = (${f(CS, `\\cos(${x}+${y})`)},\\ ${f(SN, `\\sin(${x}+${y})`)})`], [`P_3 = (${cy},\\ -${sy})`], ['P_4 = (1,\\ 0)']];
$('#cRows').innerHTML = CR.map(([s], i) => `<div class="cr" id="cr${i}" style="top:${92 + i * 96}px">${K(s)}</div>`).join('');
const PS = [['d^2 = (\\text{gap across})^2 + (\\text{gap up})^2', 'Pythagoras on the two points'],
  [`P_1P_3^{\\,2} = 2 - 2(${cx}${cy} - ${sx}${sy})`, K(`(${cx} - ${cy})^2 + (${sx} + ${sy})^2`) + ', then sin² + cos² = 1'],
  [`P_2P_4^{\\,2} = 2 - 2${cxy}`, K(`(${f(CS, `\\cos(${x}+${y})`)} - 1)^2 + ${f(SN, `\\sin^2(${x}+${y})`)}`) + ', same way'],
  [`${cxy} = ${cx}${cy} - ${sx}${sy}`, 'the chords are equal: cancel the 2s']];
$('#pSt').innerHTML = PS.map(([s, w], i) => `<div class="st" id="ps${i}" style="top:${88 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(s)}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('D2', 'Distance'), wt('D3', 'Expand'), wt('D4', 'So'), wt('D5', 'Cancel')];
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tTurn - 0.3, 1.08, 560, 560], [tLand + 1.6, 1, 960, 540]]);

/* ---------- E: the family + live angles ---------- */
const ES = [[`${cxmy} = ${cx}${cy} + ${sx}${sy}`, 'put -y in place of y'], [`${sxy} = ${sx}${cy} + ${cx}${sy}`, K('\\sin\\theta = \\cos(90^\\circ - \\theta)')],
  [`${sxmy} = ${sx}${cy} - ${cx}${sy}`, 'put -y again'], [`${txy} = \\dfrac{${tx} + ${ty}}{1 - ${tx}${ty}}`, K(`\\text{divide top and bottom by } ${cx}${cy}`)]];
$('#eSt').innerHTML = ES.map(([s, w], i) => `<div class="st" id="es${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(s)}</div><div class="why">${w}</div></div>`).join('');
$('#pSt').querySelectorAll('.why').forEach(e => e.style.fontSize = '20px');
const es3 = $('#es3'); es3.querySelector('.sx').style.top = '-14px'; es3.querySelector('.why').style.top = '74px';
const tEs = [wt('E1', 'So'), wt('E2', 'Then'), wt('E2', 'follows'), wt('E3', 'Divide')];
const eSv = $('#eS'), GX = 210, GY = 300, GR = 160;
mk(eSv, 'path', { d: `M${GX - GR - 30},${GY} H${GX + GR + 30} M${GX},${GY + GR + 24} V${GY - GR - 24}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
mk(eSv, 'circle', { cx: GX, cy: GY, r: GR, fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const gAx = mk(eSv, 'path', { d: '', fill: 'none', stroke: XC, 'stroke-width': 4 }), gAy = mk(eSv, 'path', { d: '', fill: 'none', stroke: YC, 'stroke-width': 4 });
const gR1 = mk(eSv, 'line', { x1: GX, y1: GY, stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 5' }), gR2 = mk(eSv, 'line', { x1: GX, y1: GY, stroke: C.ink, 'stroke-width': 3.5 });
const gH = mk(eSv, 'line', { stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' }), gB = mk(eSv, 'line', { y1: GY, y2: GY, x1: GX, stroke: CS, 'stroke-width': 8, 'stroke-linecap': 'round' });
const gP = mk(eSv, 'circle', { r: 9, fill: C.ink });
$('#rk0').innerHTML = K(sxy) + ' <span style="font:500 18px Poppins;color:var(--mute)">the real value</span>'; $('#rk1').innerHTML = K(`${sx}${cy} + ${cx}${sy}`); $('#rk2').innerHTML = K(`${sx} + ${sy}`);
const tMove = wt('E4', 'move'), tMoveE = T1('E4') + 0.6;
const xyAt = t => { const u = M.clamp((t - tMove) / (tMoveE - tMove)), w = M.io(u); return [50 + 70 * Math.sin(Math.PI * 2 * w) * 1, 35 + 25 * Math.sin(Math.PI * w) - 20 * Math.sin(Math.PI * 2 * w) * 0.5]; };
let roL = '';
const avD = PUC.avatar($('#sE'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'One proof for cosine, and the rest follow.' });

/* ---------- K: side by side ---------- */
$('#kaF').innerHTML = K(`\\sin(${x} \\pm ${y}) = ${sx}${cy} \\pm ${cx}${sy}`);
$('#kbF').innerHTML = K(`\\cos(${x} \\pm ${y}) = ${cx}${cy} \\mp ${sx}${sy}`);
const tiles = (host, ts, sgn, col) => { host.innerHTML = ts.map((s, i) => `<div class="tl" style="left:${36 + i * 128 + (i > 1 ? 52 : 0)}px;background:${s[1]}">${K(s[0])}</div>`).join('') + `<div class="sg" style="left:${36 + 2 * 128 - 4}px;color:${col}">${sgn}</div>`; };
tiles($('#kaT'), [[sx, '#FDEBE5'], [cy, '#E7EEFD'], [cx, '#E7EEFD'], [sy, '#FDEBE5']], '±', C.ok);
tiles($('#kbT'), [[cx, '#E7EEFD'], [cy, '#E7EEFD'], [sx, '#FDEBE5'], [sy, '#FDEBE5']], '∓', C.red);
$('#kaR').innerHTML = [['+', '+', 'same'], ['-', '-', 'same']].map(([a, b, w], i) => `<div class="sr" id="kar${i}" style="top:${292 + i * 70}px">${K(`\\sin(${x} ${a} ${y})`)}<span style="font:600 26px Poppins;color:var(--mute)">middle sign</span><b style="font:700 34px Poppins">${b === '-' ? '−' : '+'}</b><span class="c" style="background:var(--ok)">${w}</span></div>`).join('');
$('#kbR').innerHTML = [['+', '-', 'flipped'], ['-', '+', 'flipped']].map(([a, b, w], i) => `<div class="sr" id="kbr${i}" style="top:${292 + i * 70}px">${K(`\\cos(${x} ${a} ${y})`)}<span style="font:600 26px Poppins;color:var(--mute)">middle sign</span><b style="font:700 34px Poppins">${b === '-' ? '−' : '+'}</b><span class="c" style="background:var(--red)">${w}</span></div>`).join('');
const avA = PUC.avatar($('#sK'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Sine mixes. Cosine pairs and flips.' });
const th2 = PUC.think($('#th2'), { q: `${K(`${cxmy} = ${cx}${cy} \\;\\; ? \\;\\; ${sx}${sy}`)}`, opts: ['Plus', 'Minus'], right: 0, why: 'Cosine flips the sign: cos(x - y) = cos x cos y + sin x sin y.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${cxy} = ${cx}${cy} - ${sx}${sy}`);

/* ---------- W: worked example ---------- */
const s45 = f(SN, '\\sin 45^\\circ'), c45 = f(CS, '\\cos 45^\\circ'), s30 = f(SN, '\\sin 30^\\circ'), c30 = f(CS, '\\cos 30^\\circ'), s15 = f(SN, '\\sin 15^\\circ');
$('#wq').innerHTML = `Find the exact value of ${K(s15)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`15^\\circ = ${f(XC, '45^\\circ')} - ${f(YC, '30^\\circ')}`)],
  [K(`${s15} = ${s45}${c30} - ${c45}${s30}`)],
  [K(`= \\tfrac{\\sqrt2}{2}\\cdot\\tfrac{\\sqrt3}{2} - \\tfrac{\\sqrt2}{2}\\cdot\\tfrac{1}{2}`)],
  [K(`= \\dfrac{\\sqrt6 - \\sqrt2}{4}`)],
  [K('\\approx 0.259') + '&nbsp;&nbsp;matches a calculator'] ], { label: 'WORKED EXAMPLE', y0: 150, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W2', 'Fifteen'), wt('W3', 'Sin'), wt('W4', 'Root'), wt('W5', 'That'), wt('W6', 'About')];
const wsv = $('#wS'), WX = 130, WY = 500, WR = 380, WP = a => [WX + WR * Math.cos(a * D2R), WY - WR * Math.sin(a * D2R)];
mk(wsv, 'path', { d: `M${WX - 30},${WY} H${WX + WR + 50} M${WX},${WY + 24} V${WY - WR - 30}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
mk(wsv, 'path', { d: arcD(WX, WY, WR, 0, 90), fill: 'none', stroke: GREY, 'stroke-width': 2.5 });
const wR45 = mk(wsv, 'line', { x1: WX, y1: WY, x2: WP(45)[0], y2: WP(45)[1], stroke: XC, 'stroke-width': 3 });
const wR30 = mk(wsv, 'line', { x1: WX, y1: WY, x2: WP(30)[0], y2: WP(30)[1], stroke: YC, 'stroke-width': 3 });
const wR15 = mk(wsv, 'line', { x1: WX, y1: WY, x2: WP(15)[0], y2: WP(15)[1], stroke: C.ink, 'stroke-width': 4 });
const wA45 = mk(wsv, 'path', { d: arcD(WX, WY, 120, 0, 45), fill: 'none', stroke: XC, 'stroke-width': 4 });
const wA30 = mk(wsv, 'path', { d: arcD(WX, WY, 170, 0, 30), fill: 'none', stroke: YC, 'stroke-width': 4 });
const wA15 = mk(wsv, 'path', { d: arcD(WX, WY, 250, 30, 45), fill: 'none', stroke: C.ac, 'stroke-width': 5 });
const wL45 = txt(wsv, WX + 132 * Math.cos(50 * D2R), WY - 132 * Math.sin(50 * D2R), '45°', { 'font-size': 22, fill: XC, 'font-weight': 600 });
const wL30 = txt(wsv, WX + 178, WY - 34, '30°', { 'font-size': 22, fill: YC, 'font-weight': 600 });
const wL15 = txt(wsv, WX + 262 * Math.cos(37.5 * D2R), WY - 262 * Math.sin(37.5 * D2R), '15°', { 'font-size': 22, fill: C.ac, 'font-weight': 600 });
const wH = mk(wsv, 'line', { x1: WP(15)[0], y1: WY, x2: WP(15)[0], y2: WP(15)[1], stroke: SN, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wHl = txt(wsv, WP(15)[0] + 16, WY - 40, 'sin 15° ≈ 0.259', { 'font-size': 22, fill: SN, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K('\\cos(x + y) = \\cos x\\cos y + \\sin x\\sin y'), right: K('\\cos(x + y) = \\cos x\\cos y - \\sin x\\sin y') });
const ts = $('#tS');
const xL0 = txt(ts, 40, 70, 'TRY x = 60°, y = 30°: cos 90° = 0', { 'font-size': 16, 'letter-spacing': 1, 'font-weight': 600 });
const xL1 = txt(ts, 40, 128, 'with +: 0.433 + 0.433 = 0.866', { 'font-size': 22, fill: C.red, 'font-weight': 600 });
const xL2 = txt(ts, 40, 196, 'with -: 0.433 - 0.433 = 0', { 'font-size': 22, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Exact values like sin 15°, or tan 2α from cos(α + β) and sin(α - β).' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `If ${K(`${al} + ${be} = 135^\\circ`)}, then<br>${K(`(1 - ${ta})(1 - ${tb})`)} is equal to`,
  opts: [K('0'), K('1'), K('2'), K('-2')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\tan(${al}+${be}) = -1`)], [K(`\\dfrac{${ta} + ${tb}}{1 - ${ta}${tb}} = -1`)], [K(`${ta} + ${tb} = -1 + ${ta}${tb}`)],
  [K(`\\text{product} = 1 - (${ta} + ${tb}) + ${ta}${tb}`)], [K('= 1 + 1 = 2')]], { y0: 96, dy: 100 });
$('#so').querySelectorAll('.sol .sx').forEach((e, i) => { if (i === 3) e.style.fontSize = '22px'; });
const tSo = [wt('A2', 'Tan'), wt('A3', 'So'), wt('A4', 'Cross'), wt('A5', 'Expand'), wt('A5', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 510, title: 'Recap · compound-angle formulae', y0: 96, dy: 84, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Compound angle</b>: a sum or difference, x + y or x - y',
    K(`\\sin(${x} \\pm ${y}) = ${sx}${cy} \\pm ${cx}${sy}`),
    K(`\\cos(${x} \\pm ${y}) = ${cx}${cy} \\mp ${sx}${sy}`),
    K(`${txy} = \\frac{${tx} + ${ty}}{1 - ${tx}${ty}}`),
    '<b>Trap</b>: ' + K('\\sin(x + y) \\neq \\sin x + \\sin y')] });
const YQ = [`Why is ${K('\\sin(x + y)')} not just ${K('\\sin x + \\sin y')}?`, `Write the formula for ${K(cxmy)}.`, `Use 45° and 30° to find ${K(f(CS, '\\cos 75^\\circ'))}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nxt = PUC.next($('#sF'), { label: 'NEXT · EP 34', topic: 'Double the angle. Does the sine double? Double-Angle and Triple-Angle Identities', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);

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
    M.vis($('#ht0'), t, tMorph + 0.3, 1e9, { dy: 16 }); M.vis($('#htv0'), t, wt('H2', 'one') - 0.1, 1e9, POP);
    M.vis($('#ht1'), t, T0('H3') - 0.1, 1e9, { dy: 16 }); M.vis($('#htv1'), t, wt('H3', 'one') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#hP'), t, wt('H3', 'one') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH4 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH4 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'twice'), 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P4');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, tP1 + 0.2, { st: 0.05, sp: M.HEAVY });
    M.vis($('#cg0'), t, wt('P1', 'x') - 0.1, 1e9, POP); M.vis($('#cg1'), t, wt('P1', 'minus') - 0.1, 1e9, POP);
    M.vis(pRx, t, wt('P1', 'x'), 1e9, { dy: 0 }); M.vis(pRy, t, wt('P1', 'x') + 0.2, 1e9, { dy: 0 });
    M.draw(pAx, t, wt('P1', 'x'), 0.5); M.vis(pLx, t, wt('P1', 'x') + 0.3, 1e9, { dy: 0 });
    M.draw(pAy, t, wt('P1', 'x') + 0.4, 0.5); M.vis(pLy, t, wt('P1', 'x') + 0.7, 1e9, { dy: 0 });
    M.draw(pAs, t, wt('P1', 'x') + 0.9, 0.6); M.vis(pLs, t, wt('P1', 'x') + 1.2, 1e9, { dy: 0 });
    // stacked heights
    M.vis($('#pr'), t, T0('P2') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(pCir, t, T0('P2'), 0.8);
    [pR60, pH60, pL60].forEach(e => M.vis(e, t, wt('P2', 'sixty') - 0.2, 1e9, { dy: 0 }));
    const u = M.io((t - tStack - 0.6) / 1.1), sxp = M.lerp(h30x, h60x, u), syp = M.lerp(QY, QY_(Math.sin(60 * D2R)), u);
    attr(pH30g, 'transform', `translate(${sxp.toFixed(1)},${syp.toFixed(1)})`);
    [pR30, pH30g].forEach(e => M.vis(e, t, wt('P2', 'thirty') - 0.2, 1e9, { dy: 0 }));
    M.hide(pOver, t < wt('P3', 'pokes')); pOver.style.opacity = M.clamp((t - wt('P3', 'pokes')) / 0.3).toFixed(3);
    M.vis(pTop, t, wt('P3', 'circle') - 0.2, 1e9, { dy: 0 }); M.vis(pTopL, t, wt('P3', 'circle'), 1e9, { dy: 0 });
    M.vis(pSum, t, wt('P3', 'higher') - 0.1, 1e9, { dy: 0 });
    M.vis($('#pP'), t, wt('P3', 'radius'), 1e9, POP);
    M.vis($('#th1'), t, tP4 + 0.05, OUT('L1'), { dy: 36, ...o });
    th1(t, { tin: tP4, tOpts: wt('P4', 'equal') - 0.1, tCount: T1('P4') + 0.05, dur: 3, tAns: T0('P5') - 0.02, tWhy: wt('P5', 'Cosine') });
  }

  /* L + D: chord proof */
  const lOn = t >= tL1 - 0.1 && t < tE1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('E1');
    M.vis($('#lc'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.draw(lCir, t, tL1 + 0.3, 0.9);
    PTS.forEach((g, i) => M.vis(g, t, tPt[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }));
    M.vis(rays[0], t, tPt[0] - 0.2, 1e9, { dy: 0 }); M.vis(rays[1], t, tPt[1] - 0.2, 1e9, { dy: 0 }); M.vis(rays[2], t, tPt[2] - 0.2, 1e9, { dy: 0 });
    M.draw(lAx, t, tPt[0], 0.5); M.vis(lLx, t, tPt[0] + 0.3, 1e9, { dy: 0 });
    M.draw(lAy, t, tPt[1], 0.5); M.vis(lLy, t, tPt[1] + 0.3, 1e9, { dy: 0 });
    M.draw(lAmy, t, tPt[2], 0.5); M.vis(lLmy, t, tPt[2] + 0.3, 1e9, { dy: 0 });
    const r = rot(t), mvOn = t >= tTurn - 0.1;
    M.draw(chA, t, tTurn - 0.6, 0.5);
    const [a0, a1] = [LP(-AY + r), LP(AX + r)];
    attr(chM, 'x1', a0[0].toFixed(1)); attr(chM, 'y1', a0[1].toFixed(1)); attr(chM, 'x2', a1[0].toFixed(1)); attr(chM, 'y2', a1[1].toFixed(1));
    mvP.forEach((c, i) => { attr(c, 'cx', (i ? a1 : a0)[0].toFixed(1)); attr(c, 'cy', (i ? a1 : a0)[1].toFixed(1)); M.hide(c, !mvOn || t > tLand + 0.6); });
    M.hide(chM, !mvOn || t > tLand + 0.6);
    attr(lSec, 'd', mvOn ? `M${LX},${LY} L${a0[0].toFixed(1)},${a0[1].toFixed(1)} ${arcD(LX, LY, LR, -AY + r, AX + r).replace(/^M[^A]+/, '')} Z` : ''); lSec.style.opacity = (0.8 * M.clamp((t - tTurn + 0.1) / 0.3) * (1 - M.io((t - tLand - 1.2) / 0.4))).toFixed(3);
    M.draw(chB, t, tLand + 0.3, 0.4);
    const eq = M.io((t - wt('L5', 'equal') + 0.1) / 0.3); [chA, chB].forEach(c => attr(c, 'stroke', mix(C.ink, C.ok, eq)));
    [tkA, tkB].forEach(k => M.vis(k, t, wt('L5', 'equal') - 0.05, 1e9, { dy: 0 }));
    M.vis($('#lP'), t, wt('L5', 'stand') - 0.1, 1e9, POP);
    // glow the chord a step talks about
    const g1 = pulse(t, tPs[1], 1.6), g2 = pulse(t, tPs[2], 1.6), g3 = pulse(t, tPs[3], 1.4);
    attr(chA, 'stroke-width', (5 + 5 * (g1 + g3)).toFixed(2)); attr(chB, 'stroke-width', (5 + 5 * (g2 + g3)).toFixed(2));
    // right card: four points, then the proof
    M.vis($('#lr'), t, tPt[0] - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lrL0'), t, tPt[0] - 0.1, tD1, { dy: 10, outDur: 0.25 }); M.vis($('#lrL1'), t, tD1 + 0.2, 1e9, { dy: 10 });
    CR.forEach((_, i) => PUC.write($('#cr' + i), t, tPt[i], 0.7, tD1 - 0.1));
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.9); M.vis(el.querySelector('.why'), t, tPs[i] + 0.8, 1e9, { dx: 12, dy: 0 }); });
    const hiY = M.track(88, [[tPs[1] - 0.1, 204], [tPs[2] - 0.1, 320], [tPs[3] - 0.1, 436]], M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 14).toFixed(1) + 'px';
  }

  /* E: family + live */
  const eOn = t >= tE1 - 0.1 && t < tK1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('K1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o });
    ES.forEach((_, i) => { const el = $('#es' + i); M.vis(el.querySelector('.n'), t, tEs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tEs[i], 0.9); M.vis(el.querySelector('.why'), t, tEs[i] + 0.8, 1e9, { dx: 12, dy: 0 }); });
    const hiY = M.track(84, [[tEs[1] - 0.1, 200], [tEs[2] - 0.1, 316], [tEs[3] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#eHi'); M.vis(hb, t, tEs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 14).toFixed(1) + 'px';
    M.vis($('#er'), t, tE1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const [xa, ya] = xyAt(t), s = xa + ya;
    attr(gAx, 'd', arcD(GX, GY, 40, 0, xa)); attr(gAy, 'd', arcD(GX, GY, 54, xa, s));
    const P1 = [GX + GR * Math.cos(xa * D2R), GY - GR * Math.sin(xa * D2R)], P2 = [GX + GR * Math.cos(s * D2R), GY - GR * Math.sin(s * D2R)];
    attr(gR1, 'x2', P1[0].toFixed(1)); attr(gR1, 'y2', P1[1].toFixed(1)); attr(gR2, 'x2', P2[0].toFixed(1)); attr(gR2, 'y2', P2[1].toFixed(1));
    attr(gH, 'x1', P2[0].toFixed(1)); attr(gH, 'x2', P2[0].toFixed(1)); attr(gH, 'y1', GY); attr(gH, 'y2', P2[1].toFixed(1)); attr(gB, 'x2', P2[0].toFixed(1));
    attr(gP, 'cx', P2[0].toFixed(1)); attr(gP, 'cy', P2[1].toFixed(1));
    const gs = pulse(t, tEs[1], 1.6) + pulse(t, tEs[2], 1.2), gc = pulse(t, tEs[0], 1.6);
    attr(gH, 'stroke-width', (8 + 5 * gs).toFixed(2)); attr(gB, 'stroke-width', (8 + 5 * gc).toFixed(2));
    const xr = xa * D2R, yr = ya * D2R, real = Math.sin(xr + yr), form = Math.sin(xr) * Math.cos(yr) + Math.cos(xr) * Math.sin(yr), naive = Math.sin(xr) + Math.sin(yr);
    const key = Math.round(xa) + '|' + Math.round(ya);
    if (key !== roL) { roL = key; $('#rAng').innerHTML = `<span style="color:${XC}"><span class="th">x</span> = ${Math.round(xa)}°</span>&nbsp;&nbsp;<span style="color:${YC}"><span class="th">y</span> = ${Math.round(ya)}°</span>`;
      M.setT($('#rv0'), real.toFixed(3)); M.setT($('#rv1'), form.toFixed(3) + '  ✓'); M.setT($('#rv2'), naive.toFixed(3) + '  ✗'); }
    M.vis($('#rAng'), t, tE1 + 0.6, 1e9, { dy: 10 });
    M.vis($('#rb0'), t, tE1 + 0.8, 1e9, { dy: 10 }); M.vis($('#rb1'), t, tEs[1] + 0.2, 1e9, { dy: 10 }); M.vis($('#rb2'), t, tMove - 0.3, 1e9, { dy: 10 });
    M.vis($('#eP'), t, wt('E4', 'always') - 0.1, 1e9, POP);
    avD(t, tEs[3] + 1.6, wt('E4', 'always') - 0.4);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kaF'), t, tK1 + 0.4, 0.8);
    [...$('#kaT').children].forEach((e, i) => M.vis(e, t, wt('K1', 'mixes') + i * 0.12, 1e9, POP));
    [0, 1].forEach(i => M.vis($('#kar' + i), t, wt('K1', 'keep') - 0.2 + i * 0.3, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#kbF'), t, T0('K2') + 0.2, 0.8);
    [...$('#kbT').children].forEach((e, i) => M.vis(e, t, wt('K2', 'pairs') + i * 0.12, 1e9, POP));
    [0, 1].forEach(i => M.vis($('#kbr' + i), t, wt('K2', 'flip') - 0.2 + i * 0.3, 1e9, { dx: -16, dy: 0 }));
    avA(t, T1('K2') + 0.1, out);
    M.vis($('#th2'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'plus') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: T0('K4') + 0.8 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxp = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sxp ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Sine') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Cosine') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'exact') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, wt('W1', 'exact') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wR45, t, wt('W2', 'forty') - 0.1, 1e9, { dy: 0 }); M.draw(wA45, t, wt('W2', 'forty'), 0.5); M.vis(wL45, t, wt('W2', 'forty') + 0.3, 1e9, { dy: 0 });
    M.vis(wR30, t, wt('W2', 'thirty') - 0.1, 1e9, { dy: 0 }); M.draw(wA30, t, wt('W2', 'thirty'), 0.5); M.vis(wL30, t, wt('W2', 'thirty') + 0.3, 1e9, { dy: 0 });
    M.draw(wA15, t, wt('W2', 'two') - 0.1, 0.5); M.vis(wL15, t, wt('W2', 'two') + 0.2, 1e9, { dy: 0 });
    M.vis(wR15, t, tW[4] - 0.6, 1e9, { dy: 0 }); M.draw(wH, t, tW[4] - 0.3, 0.6); M.vis(wHl, t, tW[4], 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'cosine') - 0.1, tRight: wt('X3', 'minus') });
    M.vis(xL0, t, wt('X3', 'thirty') - 0.1, 1e9, { dy: 0 }); M.vis(xL1, t, wt('X3', 'zero') - 0.1, 1e9, { dx: -12, dy: 0 }); M.vis(xL2, t, wt('X3', 'minus'), 1e9, { dx: -12, dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'exact') });
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
