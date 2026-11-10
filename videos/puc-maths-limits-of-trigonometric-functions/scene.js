// PUC Maths Ep 83: Limits of trigonometric functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Chapter 3 canon): angle x / arc violet, sin coral accent, cos blue, tan teal; the limit value gold
const XV = C.violet, SN = C.ac, CS = '#2F6FEB', TN = C.teal, LM = C.gold;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xv = s => `\\textcolor{${XV}}{${s}}`, sn = s => `\\textcolor{${SN}}{${s}}`, cs = s => `\\textcolor{${CS}}{${s}}`, tn = s => `\\textcolor{${TN}}{${s}}`, lm = s => `\\textcolor{${LM}}{${s}}`;
const X = xv('x'), SX = sn('\\sin x'), CX = cs('\\cos x'), TX = tn('\\tan x');
const RAT = `\\dfrac{${SX}}{${X}}`;

/* ---------- small plotter ---------- */
const plot = (svg, o) => {
  const Xp = v => o.px + o.pw * (v - o.x0) / (o.x1 - o.x0), Yp = v => o.py + o.ph - o.ph * (v - o.y0) / (o.y1 - o.y0);
  (o.xt || []).forEach(v => mk(svg, 'line', { x1: Xp(v), y1: Yp(o.y0), x2: Xp(v), y2: Yp(o.y1), stroke: '#E9E5DA', 'stroke-width': 2 }));
  (o.yt || []).forEach(v => mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(v), x2: Xp(o.x1), y2: Yp(v), stroke: '#E9E5DA', 'stroke-width': 2 }));
  mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(Math.max(0, o.y0)), x2: Xp(o.x1), y2: Yp(Math.max(0, o.y0)), stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'line', { x1: Xp(0), y1: Yp(o.y0), x2: Xp(0), y2: Yp(o.y1), stroke: C.ink, 'stroke-width': 3 });
  (o.xt || []).forEach(v => { if (v) txt(svg, Xp(v), Yp(Math.max(0, o.y0)) + 30, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (v) txt(svg, Xp(0) - 12, Yp(v) + 6, v, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
  const path = (fn, a, b, n = 100) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + Xp(x).toFixed(1) + ',' + Yp(fn(x)).toFixed(1); } return d; };
  return { X: Xp, Y: Yp, curve: (fn, a, b, col, sw = 5) => mk(svg, 'path', { d: path(fn, a, b), fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hole: (x, y, col, r = 9) => mk(svg, 'circle', { cx: Xp(x), cy: Yp(y), r, fill: '#fff', stroke: col, 'stroke-width': 4 }) };
};
const sinc = x => Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x;
const stepper = (v0, keys, gl = 0.8) => t => { let v = v0; keys.forEach(([tt, vv]) => { const u = M.io((t - tt) / gl); v = v + (vv - v) * u; }); return v; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tU1 = T0('U1'), tL1 = T0('L1'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tR3 = T0('R3'), tC1 = T0('C1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TYPE', '0.01 rad', XV], ['PRESS', 'sin', SN], ['GET', '0.0099998', SN]];
$('#lists').innerHTML = LS.map(([n, v, c], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${c}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'zero') - 0.05, wt('H1', 'sine') - 0.1, wt('H1', 'sine') + 0.5];

/* ---------- H: the calculator ---------- */
const HR = [[X, '0.01', XV], [SX, '0.0099998', SN], [`${SX} \\,/\\, ${X}`, '0.99998', LM]];
$('#hRs').innerHTML = HR.map(([s, v, c], i) => `<div class="lr" id="hr${i}" style="top:${96 + i * 96}px;height:80px"><div class="sy" style="top:18px;font-size:34px">${K(s)}</div><div class="v" style="color:${c};font-size:36px;top:20px">${v}</div></div>`).join('');
const tHr = [T0('H2') + 0.2, wt('H2', 'zero'), wt('H4', 'one')];

/* ---------- L: live circle ---------- */
const ls = $('#lS'), O = [110, 500], R = 380, P = x => [O[0] + R * Math.cos(x), O[1] - R * Math.sin(x)];
mk(ls, 'line', { x1: O[0], y1: O[1], x2: O[0] + R + 40, y2: O[1], stroke: C.ink, 'stroke-width': 3 });
mk(ls, 'line', { x1: O[0], y1: O[1], x2: O[0], y2: O[1] - R - 30, stroke: C.ink, 'stroke-width': 3 });
const lQ = mk(ls, 'path', { d: `M${O[0] + R},${O[1]} A${R},${R} 0 0 0 ${O[0]},${O[1] - R}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, opacity: 0.55 });
const lOP = mk(ls, 'line', { stroke: C.ink, 'stroke-width': 3 }), lCos = mk(ls, 'line', { stroke: CS, 'stroke-width': 4, 'stroke-linecap': 'round' });
const lArc = mk(ls, 'path', { fill: 'none', stroke: XV, 'stroke-width': 9, 'stroke-linecap': 'round' });
const lSin = mk(ls, 'line', { stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' });
const lAng = mk(ls, 'path', { fill: 'none', stroke: XV, 'stroke-width': 3 });
const lP = mk(ls, 'circle', { r: 10, fill: C.ink });
txt(ls, O[0] - 14, O[1] + 28, 'O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: C.ink });
txt(ls, O[0] + R, O[1] + 30, '1', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const lAx = txt(ls, 0, 0, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: XV });
const lSl = txt(ls, 0, 0, 'sin x', { 'font-size': 22, fill: SN, 'font-weight': 600 });
const setL = x => { const [px, py] = P(x); attr(lOP, 'x1', O[0]); attr(lOP, 'y1', O[1]); attr(lOP, 'x2', px.toFixed(1)); attr(lOP, 'y2', py.toFixed(1));
  attr(lCos, 'x1', O[0]); attr(lCos, 'y1', O[1]); attr(lCos, 'x2', px.toFixed(1)); attr(lCos, 'y2', O[1]);
  attr(lArc, 'd', `M${O[0] + R},${O[1]} A${R},${R} 0 0 0 ${px.toFixed(1)},${py.toFixed(1)}`);
  attr(lSin, 'x1', px.toFixed(1)); attr(lSin, 'y1', py.toFixed(1)); attr(lSin, 'x2', px.toFixed(1)); attr(lSin, 'y2', O[1]);
  const r = 64, ax = O[0] + r * Math.cos(x), ay = O[1] - r * Math.sin(x); attr(lAng, 'd', `M${O[0] + r},${O[1]} A${r},${r} 0 0 0 ${ax.toFixed(1)},${ay.toFixed(1)}`);
  attr(lAx, 'x', (O[0] + 90 * Math.cos(x / 2)).toFixed(1)); attr(lAx, 'y', (O[1] - 90 * Math.sin(x / 2) + 8).toFixed(1));
  attr(lP, 'cx', px.toFixed(1)); attr(lP, 'cy', py.toFixed(1));
  attr(lSl, 'x', (px - 14).toFixed(1)); attr(lSl, 'y', ((py + O[1]) / 2).toFixed(1)); attr(lSl, 'text-anchor', 'end'); lSl.style.opacity = x > 0.12 ? '1' : '0'; };
const LR = [[X, x => x.toFixed(3), XV], [SX, x => Math.sin(x).toFixed(3), SN], [`${SX} \\,/\\, ${X}`, x => sinc(x).toFixed(3), LM]];
$('#lRs').innerHTML = LR.map(([s, , c], i) => `<div class="lr" id="lr${i}" style="top:${140 + i * 84}px"><div class="sy">${K(s)}</div><div class="v" style="color:${c}"></div></div>`).join('');
const LT = [['x = 1', '0.841', '0.841'], ['x = 0.5', '0.479', '0.959'], ['x = 0.1', '0.0998', '0.998']];
$('#lTb').innerHTML = LT.map(([a, b, c], i) => `<div class="tr3" id="lt${i}" style="top:${400 + i * 60}px;height:52px"><span style="left:20px;top:12px;color:${XV}">${a}</span><span style="left:220px;top:12px;color:${SN}">sin ${b}</span><span style="right:20px;top:12px;color:${LM}">ratio ${c}</span></div>`).join('');
$('#lTb').querySelectorAll('.tr3 span').forEach(s => { s.style.fontSize = '24px'; });
const tLt = [wt('L2', 'ratio'), wt('L3', 'ratio'), wt('L3', 'it')];
const xLive = stepper(1, [[wt('L3', 'five') - 0.3, 0.5], [wt('L3', 'At', 1) - 0.2, 0.1], [T0('L4'), 0.02]]);

/* ---------- S: sandwich ---------- */
$('#sThm').innerHTML = K(`${cs('f(x)')} \\le ${sn('g(x)')} \\le ${lm('h(x)')}`);
$('#sThm2').innerHTML = K(`\\lim ${cs('f')} = \\lim ${lm('h')} = l \\ \\Rightarrow \\ \\lim ${sn('g')} = l`);
const sp = plot($('#sS1'), { x0: -1.6, x1: 1.6, y0: 0, y1: 1.15, px: 70, pw: 640, py: 230, ph: 260, xt: [-1, 1], yt: [0.5, 1] });
const sH = sp.curve(() => 1, -1.6, 1.6, LM, 5), sG = sp.curve(sinc, -1.6, 1.6, SN, 5), sFc = sp.curve(Math.cos, -1.6, 1.6, CS, 5);
const sLb = [['h', LM, 1.04], ['g', SN, sinc(1.55) + 0.04], ['f', CS, Math.cos(1.55) + 0.04]].map(([s, c, y]) => txt($('#sS1'), sp.X(1.58), sp.Y(y) - 4, s, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: c }));
const sDots = [[x => 1, LM], [sinc, SN], [Math.cos, CS]].map(([fn, c]) => ({ fn, c: mk($('#sS1'), 'circle', { r: 9, fill: c }) }));
const s2 = $('#sS2'), SY = 280;
const sLine = mk(s2, 'line', { x1: 80, y1: SY, x2: 700, y2: SY, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const sLl = txt(s2, 716, SY + 8, 'l', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28, fill: C.ink });
const bread = y => mk(s2, 'rect', { x: 150, y, width: 480, height: 56, rx: 26, fill: '#EBC98E', stroke: LM, 'stroke-width': 4 });
const bT = bread(100), bB = bread(404);
const cheese = mk(s2, 'path', { d: '', fill: '#F7D65A', stroke: '#C9A227', 'stroke-width': 3 });
const sLbs = [txt(s2, 660, 0, 'h', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: LM }), txt(s2, 660, 0, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: SN }), txt(s2, 660, 0, 'f', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: CS })];
const tSq = wt('S3', 'Squeeze');

/* ---------- D: proof ---------- */
const dsol = PUC.solution($('#da'), [
  [K(`\\triangle OAC \\ \\subset \\ \\text{sector } OAC \\ \\subset \\ \\triangle OAB`)],
  [K(`\\tfrac12 ${SX} < \\tfrac12 ${X} < \\tfrac12 ${TX}`)],
  [K(`${SX} < ${X} < ${TX}`)],
  [K(`${CX} < ${RAT} < 1`)],
  [K(`${CX} \\to 1 \\Rightarrow \\lim_{x \\to 0} ${RAT} = ${lm('1')}`)]], { label: '', y0: 96, dy: 92 });
[...$('#da').querySelectorAll('.lbl')].slice(1).forEach(e => e.remove());
const tD = [wt('D2', 'Compare'), wt('D3', 'areas'), wt('D3', 'So'), wt('D4', 'cos'), wt('D5', 'tends')];
const ds = $('#dS'), DO = [100, 500], DR = 330, DX0 = 0.8;
const dC = [DO[0] + DR * Math.cos(DX0), DO[1] - DR * Math.sin(DX0)], dA = [DO[0] + DR, DO[1]], dB = [DO[0] + DR, DO[1] - DR * Math.tan(DX0)];
const pts = a => a.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ');
const dT2 = mk(ds, 'polygon', { points: pts([DO, dA, dB]), fill: TN, opacity: 0 });
const dSe = mk(ds, 'path', { d: `M${DO[0]},${DO[1]} L${dA[0]},${dA[1]} A${DR},${DR} 0 0 0 ${dC[0].toFixed(1)},${dC[1].toFixed(1)} Z`, fill: XV, opacity: 0 });
const dT1 = mk(ds, 'polygon', { points: pts([DO, dA, dC]), fill: SN, opacity: 0 });
mk(ds, 'line', { x1: DO[0], y1: DO[1], x2: DO[0] + DR + 40, y2: DO[1], stroke: C.ink, 'stroke-width': 3 });
mk(ds, 'path', { d: `M${dA[0]},${dA[1]} A${DR},${DR} 0 0 0 ${DO[0]},${DO[1] - DR}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, opacity: 0.55 });
mk(ds, 'line', { x1: DO[0], y1: DO[1], x2: dB[0], y2: dB[1], stroke: C.ink, 'stroke-width': 3 });
mk(ds, 'line', { x1: dA[0], y1: dA[1], x2: dB[0], y2: dB[1], stroke: TN, 'stroke-width': 4 });
mk(ds, 'line', { x1: dC[0], y1: dC[1], x2: dA[0], y2: dA[1], stroke: C.ink, 'stroke-width': 2.5 });
mk(ds, 'line', { x1: dC[0], y1: dC[1], x2: dC[0], y2: DO[1], stroke: SN, 'stroke-width': 4, 'stroke-dasharray': '6 6' });
[[DO, 'O', -26, 26], [dA, 'A', 10, 28], [dC, 'C', -26, -8], [dB, 'B', 12, 0], [[dC[0], DO[1]], 'D', -8, 28]].forEach(([p, s, dx, dy]) => txt(ds, p[0] + dx, p[1] + dy, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: C.ink }));
txt(ds, DO[0] + 70, DO[1] - 14, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24, fill: XV });
const DL = [['small triangle OAC', '½ sin x', SN], ['sector OAC', '½ x', XV], ['big triangle OAB', '½ tan x', TN]];
$('#db').insertAdjacentHTML('beforeend', DL.map(([a, b, c], i) => `<div class="ch" id="dl${i}" style="left:470px;top:${200 + i * 64}px;border-left:6px solid ${c}">${a}<b style="margin-left:10px;color:${c};font-family:'IBM Plex Mono'" class="ar">${b}</b></div>`).join(''));
const tShp = [wt('D2', 'small'), wt('D2', 'sector'), wt('D2', 'big')];

/* ---------- R: radians vs degrees ---------- */
$('#r1F').innerHTML = K(`\\lim_{${X} \\to 0} ${RAT} = ${lm('1')}`);
$('#r2F').innerHTML = K(`\\dfrac{\\sin ${xv('x^\\circ')}}{${xv('x')}} \\to ${lm('\\dfrac{\\pi}{180}')}`);
const RT1 = [['x = 0.1 rad', '0.998'], ['x = 0.01 rad', '0.99998']], RT2 = [['x = 1°', '0.0175'], ['x = 0.1°', '0.0175']];
const tbl = (id, rows) => { $(id).innerHTML = rows.map(([a, b], i) => `<div class="tr3" id="${id.slice(1)}${i}" style="top:${250 + i * 76}px;height:60px"><span style="left:20px;color:${XV}">${a}</span><span style="right:20px;color:${LM}">ratio ${b}</span></div>`).join(''); };
tbl('#r1T', RT1); tbl('#r2T', RT2);
const th1 = PUC.think($('#th1'), { q: 'With x in degrees, does sin x / x tend to 1?', opts: ['Yes', 'No'], right: 1, why: 'Only in radians. In degrees the ratio tends to π/180, about 0.0175.' });

/* ---------- C: (1 - cos x)/x ---------- */
const csol = PUC.solution($('#ca'), [
  [K(`\\lim_{x \\to 0} \\dfrac{1 - ${CX}}{${X}} = 0`)],
  [K(`1 - ${CX} = 2\\sin^2 \\tfrac{x}{2}`)],
  [K(`\\dfrac{1 - ${CX}}{${X}} = \\dfrac{\\sin (x/2)}{x/2} \\cdot \\sin \\tfrac{x}{2}`)],
  [K(`\\to ${lm('1')} \\cdot 0 = 0`)]], { label: '', y0: 100, dy: 110 });
[...$('#ca').querySelectorAll('.lbl')].slice(1).forEach(e => e.remove());
const tCs = [T0('C1') + 0.3, wt('C2', 'equals'), wt('C2', 'splits'), wt('C2', 'One', 1)];
const cp = plot($('#cS'), { x0: -3, x1: 3, y0: -1.2, y1: 1.2, px: 70, pw: 640, py: 90, ph: 400, xt: [-3, -2, -1, 1, 2, 3], yt: [-1, -0.5, 0.5, 1] });
const cfn = x => (1 - Math.cos(x)) / x;
const cC = cp.curve(cfn, -3, -0.01, CS, 5), cC2 = cp.curve(cfn, 0.01, 3, CS, 5), cH = cp.hole(0, 0, LM, 9);
const cD = mk($('#cS'), 'circle', { r: 10, fill: CS });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\lim_{x \\to 0} \\dfrac{${SX}}{${X}} = ${lm('1')} \\qquad \\lim_{x \\to 0} \\dfrac{1 - ${CX}}{${X}} = 0`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find &nbsp;${K(`\\lim_{x \\to 0} \\dfrac{\\sin 5x}{\\sin 2x}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\sin 5x = \\dfrac{\\sin 5x}{5x} \\cdot 5x`)],
  [K(`\\sin 2x = \\dfrac{\\sin 2x}{2x} \\cdot 2x`)],
  [K(`\\dfrac{\\sin 5x}{5x} \\to ${lm('1')}, \\ \\ \\dfrac{\\sin 2x}{2x} \\to ${lm('1')}`)],
  [K(`\\dfrac{5x}{2x} = \\dfrac{5}{2}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Build'), wt('W4', 'Do'), wt('W5', 'Both'), wt('W6', 'What')];
const ub = s => `\\underbrace{${s}}_{\\to ${lm('1')}}`;
const WX = [`\\dfrac{\\sin 5x}{\\sin 2x}`, `\\dfrac{\\frac{\\sin 5x}{5x} \\cdot 5x}{\\sin 2x}`, `\\dfrac{\\frac{\\sin 5x}{5x} \\cdot 5x}{\\frac{\\sin 2x}{2x} \\cdot 2x}`, `\\dfrac{${ub('\\frac{\\sin 5x}{5x}')} \\cdot 5x}{${ub('\\frac{\\sin 2x}{2x}')} \\cdot 2x}`, `\\dfrac{5x}{2x} = ${lm('\\dfrac{5}{2}')}`];
let wLast = -1;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\lim_{x \\to 0} \\sin 3x \\,/\\, x = 1`), right: K(`3 \\cdot \\dfrac{\\sin 3x}{3x} \\to 3 \\cdot 1 = 3`) });
const tp = plot($('#tS'), { x0: -1.5, x1: 1.5, y0: 0, y1: 3.4, px: 60, pw: 460, py: 24, ph: 210, xt: [-1, 1], yt: [1, 2, 3] });
const t1c = tp.curve(sinc, -1.5, 1.5, C.dim, 4), t3c = tp.curve(x => 3 * sinc(3 * x), -1.0, 1.0, SN, 4);
const t1L = txt($('#tS'), tp.X(1.45), tp.Y(sinc(1.45)) - 10, 'sin x / x', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const t3L = txt($('#tS'), tp.X(0.12), tp.Y(3) - 8, 'sin 3x / x → 3', { 'font-size': 18, fill: SN, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Trig limits as x tends to 0: build sin(kx)/(kx) patterns, use 1 - cos x = 2 sin²(x/2).' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find &nbsp;${K(`\\lim_{x \\to 0} \\dfrac{1 - \\cos 2x}{x \\sin 3x}`)}`,
  opts: ['2/3', '1/3', '3/2', '0'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`1 - \\cos 2x = 2\\sin^2 x`)], [K(`= 2 \\left(\\tfrac{\\sin x}{x}\\right)^2 \\cdot \\tfrac{x}{\\sin 3x}`)], [K(`\\tfrac{x}{\\sin 3x} = \\tfrac13 \\cdot \\tfrac{3x}{\\sin 3x} \\to \\tfrac13`)], [K(`\\to 2 \\cdot 1 \\cdot \\tfrac13 = ${lm('\\tfrac23')}`)]], { y0: 100, dy: 108 });
const tSo = [wt('A2', 'Use'), wt('A3', 'Rearrange'), wt('A3', 'third'), wt('A4', 'thirds')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · trigonometric limits', y0: 98, dy: 78, txt: [0, 0, 0, 1, 1],
  lines: [K(`\\lim_{x \\to 0} \\frac{${SX}}{${X}} = ${lm('1')} \\ \\ (x \\text{ in radians})`),
    K(`\\lim_{x \\to 0} \\frac{1 - ${CX}}{${X}} = 0`),
    K(`${CX} < \\frac{${SX}}{${X}} < 1 \\ \\ \\text{for } 0 < x < \\tfrac{\\pi}{2}`),
    '<b>Sandwich</b>: trapped between two equal limits, it shares that limit',
    '<b>Match the angle</b>: sin 3x needs 3x below, so sin 3x / x → 3'] });
const YQ = ['Why must x be in radians for sin x / x to tend to 1?', 'What is the limit of sin 7x / x, as x tends to 0?', 'Which theorem traps sin x / x between cos x and 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 84', topic: 'Speed at one instant: Derivative from First Principles', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L4') - 0.3, 1.05, 960, 560], [T1('L4') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tU1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('U1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => M.vis($('#hr' + i), t, tHr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#hP'), t, wt('H4', 'nearly') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'why') - 0.1, 1e9, POP);
  }

  /* L: circle + live */
  const lOn = t >= tU1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1');
    M.vis($('#la'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const x = t < tL1 ? 1 : xLive(t); setL(x);
    M.draw(lQ, t, wt('U2', 'circle') - 0.1, 0.8);
    M.vis(lOP, t, wt('U2', 'angle') - 0.1, 1e9, { dy: 0 }); M.vis(lAng, t, wt('U2', 'angle'), 1e9, { dy: 0 }); M.vis(lAx, t, wt('U2', 'angle') + 0.2, 1e9, { dy: 0 });
    M.vis(lP, t, wt('U2', 'angle'), 1e9, { dy: 0 });
    M.vis(lArc, t, wt('U3', 'arc') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(lSin, t, wt('U3', 'height') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(lSl, t, wt('U3', 'height'), 1e9, { dy: 0 }); M.vis(lCos, t, wt('U3', 'height'), 1e9, { dy: 0, fade: 0.3 });
    M.vis($('#lb'), t, wt('U3', 'arc') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lc0'), t, wt('U3', 'length'), 1e9, POP); M.vis($('#lc1'), t, wt('U3', 'height'), 1e9, POP);
    LR.forEach(([, fn], i) => { const el = $('#lr' + i); M.vis(el, t, tL1 + 0.2 + i * 0.15, 1e9, { dx: -16, dy: 0 }); M.setT(el.querySelector('.v'), fn(x)); });
    LT.forEach((_, i) => M.vis($('#lt' + i), t, tLt[i], 1e9, { dx: -16, dy: 0 }));
  }

  /* S: sandwich */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sa'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#sThm'), t, wt('S2', 'between') - 0.3, 0.8); PUC.write($('#sThm2'), t, wt('S2', 'same') - 0.3, 0.9);
    M.draw(sFc, t, wt('S2', 'f') - 0.1, 0.6); M.draw(sH, t, wt('S2', 'h') - 0.1, 0.6); M.draw(sG, t, wt('S2', 'g') - 0.1, 0.6);
    sLb.forEach((l, i) => M.vis(l, t, wt('S2', 'and') + i * 0.1, 1e9, { dy: 0 }));
    const xs = 1.4 * (1 - M.io((t - wt('S2', 'trapped')) / 1.8)) + 0.001;
    sDots.forEach(d => { M.vis(d.c, t, wt('S2', 'trapped') - 0.2, 1e9, { dy: 0, fade: 0.1 }); attr(d.c, 'cx', sp.X(xs).toFixed(1)); attr(d.c, 'cy', sp.Y(d.fn(xs)).toFixed(1)); });
    M.vis($('#sb'), t, T0('S3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const q = M.io((t - tSq) / 1.4), yT = 100 + 150 * q, yB = 404 - 150 * q;
    attr(bT, 'y', yT.toFixed(1)); attr(bB, 'y', yB.toFixed(1));
    const room = (yB - yT - 56) / 2 - 14, wig = Math.max(0, room) * Math.sin(t * 3.1) * 0.9, cy = SY + wig;
    attr(cheese, 'd', `M190,${(cy - 12).toFixed(1)} L590,${(cy - 12).toFixed(1)} L590,${(cy + 12).toFixed(1)} L190,${(cy + 12).toFixed(1)} Z`);
    attr(sLbs[0], 'y', (yT + 38).toFixed(1)); attr(sLbs[1], 'y', (cy + 9).toFixed(1)); attr(sLbs[2], 'y', (yB + 38).toFixed(1));
    [bT, bB, cheese, ...sLbs].forEach((e, i) => M.vis(e, t, T0('S3') + 0.1 + i * 0.05, 1e9, { dy: 0 }));
    M.vis(sLine, t, wt('S3', 'Squeeze'), 1e9, { dy: 0 }); M.vis(sLl, t, wt('S3', 'Squeeze'), 1e9, { dy: 0 });
    M.vis($('#sP'), t, wt('S3', 'goes') - 0.1, 1e9, POP);
  }

  /* D: proof */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#da'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tD);
    M.vis($('#db'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    [dT1, dSe, dT2].forEach((e, i) => { const on = M.io((t - tShp[i]) / 0.4); attr(e, 'opacity', ((i === 2 ? 0.16 : 0.24) * on).toFixed(3)); });
    DL.forEach((_, i) => { M.vis($('#dl' + i), t, tShp[i], 1e9, { dx: -12, dy: 0 }); M.vis($('#dl' + i + ' .ar'), t, tD[1] + 0.3 + i * 0.5, 1e9, POP); });
  }

  /* R: radians vs degrees + think */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R3');
    M.vis($('#r1'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#r1F'), t, wt('R1', 'radians') - 0.1, 0.7); RT1.forEach((_, i) => M.vis($('#r1T' + i), t, wt('R1', 'tends') + i * 0.3, 1e9, { dx: -12, dy: 0 })); M.vis($('#r1P'), t, wt('R1', 'one') - 0.1, 1e9, POP);
    M.vis($('#r2'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#r2F'), t, wt('R2', 'degrees'), 0.8); RT2.forEach((_, i) => M.vis($('#r2T' + i), t, wt('R2', 'Sine') + i * 0.6, 1e9, { dx: -12, dy: 0 })); M.vis($('#r2P'), t, wt('R2', 'pi') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tR3 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tR3, tOpts: wt('R3', 'degrees') - 0.1, tCount: T1('R3') + 0.05, dur: 3, tAns: T0('R4') - 0.02, tWhy: wt('R4', 'Only') });
  }

  /* C: second result */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#ca'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    csol(t, tC1, tCs);
    M.vis($('#cb'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(cC, t, tC1 + 0.6, 0.7); M.draw(cC2, t, tC1 + 0.9, 0.7); M.vis(cH, t, tC1 + 1.4, 1e9, { dy: 0 });
    const xc = 2.6 * (1 - M.io((t - wt('C1', 'zero')) / 2.0)) + 0.02; attr(cD, 'cx', cp.X(xc).toFixed(1)); attr(cD, 'cy', cp.Y(cfn(xc)).toFixed(1)); M.vis(cD, t, wt('C1', 'zero') - 0.2, 1e9, { dy: 0, fade: 0.1 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'In') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'tends') - 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const st = tW.reduce((a, tt, i) => t >= tt + 0.3 ? i + 1 : a, 0);
    if (st !== wLast) { wLast = st; $('#wX').innerHTML = K(WX[st]); }
    M.vis($('#wX'), t, T0('W2') + 0.6, 1e9, { dy: 12 });
    M.vis($('#wRes'), t, wt('W6', 'five', 1) - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'match') - 0.1, tRight: wt('X3', 'Write') });
    M.draw(t1c, t, wt('X2', 'sine', 1), 0.7); M.vis(t1L, t, wt('X2', 'write'), 1e9, { dy: 0 });
    M.draw(t3c, t, wt('X3', 'Write'), 0.8); M.vis(t3L, t, wt('X3', 'tends'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'tan') });
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
