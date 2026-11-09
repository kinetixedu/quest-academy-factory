// PUC Maths Ep 80: Intuitive idea of limits (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (this chapter): input x violet, the limit value l coral accent, approach from the left blue,
// approach from the right teal, the function's own graph ink, "no value" red
const XV = C.violet, LC = C.ac, LB = '#2F6FEB', RT = C.teal;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xv = s => `\\textcolor{${XV}}{${s}}`, lc = s => `\\textcolor{${LC}}{${s}}`, lb = s => `\\textcolor{${LB}}{${s}}`, rt = s => `\\textcolor{${RT}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const LIM = (a, f, l) => `\\lim_{${xv('x')} \\to ${a}} ${f} = ${l}`;

/* ---------- a small plotter: axes, grid, ticks ---------- */
const plot = (svg, o) => {
  const X = v => o.px + o.pw * (v - o.x0) / (o.x1 - o.x0), Y = v => o.py + o.ph - o.ph * (v - o.y0) / (o.y1 - o.y0);
  (o.xt || []).forEach(v => mk(svg, 'line', { x1: X(v), y1: Y(o.y0), x2: X(v), y2: Y(o.y1), stroke: '#E9E5DA', 'stroke-width': 2 }));
  (o.yt || []).forEach(v => mk(svg, 'line', { x1: X(o.x0), y1: Y(v), x2: X(o.x1), y2: Y(v), stroke: '#E9E5DA', 'stroke-width': 2 }));
  const ax0 = Math.max(o.x0, Math.min(o.x1, 0)), ay0 = Math.max(o.y0, Math.min(o.y1, 0));
  mk(svg, 'line', { x1: X(o.x0), y1: Y(ay0), x2: X(o.x1), y2: Y(ay0), stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'line', { x1: X(ax0), y1: Y(o.y0), x2: X(ax0), y2: Y(o.y1), stroke: C.ink, 'stroke-width': 3 });
  (o.xt || []).forEach(v => { if (v === 0 && o.y0 < 0) return; txt(svg, X(v), Y(ay0) + 32, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (v === 0) return; txt(svg, X(ax0) - 14, Y(v) + 7, v, { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); });
  const path = (fn, a, b, n = 60) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(fn(x)).toFixed(1); } return d; };
  const curve = (fn, a, b, col, sw = 5) => mk(svg, 'path', { d: path(fn, a, b), fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' });
  const hole = (x, y, col, r = 10) => mk(svg, 'circle', { cx: X(x), cy: Y(y), r, fill: '#fff', stroke: col, 'stroke-width': 4 });
  const dot = (x, y, col, r = 10) => mk(svg, 'circle', { cx: X(x), cy: Y(y), r, fill: col });
  return { X, Y, curve, hole, dot };
};
const H = x => x + 2; // h(x) = (x^2 - 4)/(x - 2) = x + 2 for x != 2
const drawH = (svg, o) => {
  const p = plot(svg, Object.assign({ x0: 0, x1: 4, y0: 0, y1: 6.5, xt: [0, 1, 2, 3, 4], yt: [0, 1, 2, 3, 4, 5, 6] }, o));
  p.line = p.curve(H, 0, 4, C.ink, 5); p.h = p.hole(2, 4, C.ink, 11);
  return p;
};
const mover = (svg, p, col) => {
  const g = mk(svg, 'g', {}), gx = mk(g, 'line', { stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }), gy = mk(g, 'line', { stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' });
  const c = mk(g, 'circle', { r: 11, fill: col }), xl = txt(g, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 });
  return { g, set: (x, fn, dec) => { const px = p.X(x), py = p.Y(fn(x)), y0 = p.Y(0), x0 = p.X(0);
    attr(c, 'cx', px.toFixed(1)); attr(c, 'cy', py.toFixed(1));
    attr(gx, 'x1', px.toFixed(1)); attr(gx, 'y1', py.toFixed(1)); attr(gx, 'x2', px.toFixed(1)); attr(gx, 'y2', y0);
    attr(gy, 'x1', px.toFixed(1)); attr(gy, 'y1', py.toFixed(1)); attr(gy, 'x2', x0); attr(gy, 'y2', py.toFixed(1));
    if (dec != null) { attr(xl, 'x', px.toFixed(1)); attr(xl, 'y', (y0 + 56).toFixed(1)); M.setT(xl, x.toFixed(dec)); } } };
};
// a value that steps through a list at given times (smooth 0.45 s glides)
const stepper = (v0, keys) => t => { let v = v0; keys.forEach(([tt, vv]) => { const u = M.io((t - tt) / 0.45); v = v + (vv - v) * u; }); return v; };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tL1 = T0('L1'), tD1 = T0('D1'), tS1 = T0('S1'), tS3 = T0('S3'), tR1 = T0('R1'), tR4 = T0('R4');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the first moves ---------- */
const LS = [['MOVE 1', '4 m left'], ['MOVE 2', '2 m left'], ['MOVE 3', '1 m left']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:var(--ac)">${v}</div></div>`).join('');
const tLs = [wt('H1', 'half') - 0.05, wt('H1', 'half', 1) - 0.05, wt('H1', 'Again') - 0.05];

/* ---------- H: halfway to the wall ---------- */
const hs = $('#hS'), HX = g => 716 - g * 82, HY = 290;
mk(hs, 'line', { x1: 40, y1: HY, x2: 716, y2: HY, stroke: C.ink, 'stroke-width': 3 });
const wall = mk(hs, 'rect', { x: 718, y: 180, width: 26, height: 200, rx: 4, fill: C.ink });
txt(hs, 731, 404, 'WALL', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
[8, 4, 2, 1].forEach(g => { mk(hs, 'line', { x1: HX(g), y1: HY - 9, x2: HX(g), y2: HY + 9, stroke: C.ink, 'stroke-width': 2 }); txt(hs, HX(g), HY + 40, g + ' m', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
const hGap = mk(hs, 'line', { y1: HY + 70, y2: HY + 70, stroke: LC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hGapL = txt(hs, 0, HY + 104, 'gap', { 'text-anchor': 'middle', 'font-size': 20, fill: LC, 'font-weight': 600 });
const hMark = mk(hs, 'circle', { cy: HY, r: 8, fill: LC });
const tMv = [wt('H2', 'Four'), wt('H2', 'Two'), wt('H2', 'One'), wt('H2', 'Half'), wt('H2', 'quarter')];
const tFast0 = wt('H4', 'After'), tFast1 = wt('H4', 'moves');
const kOf = t => tMv.reduce((s, tt) => s + M.io((t - tt) / 0.45), 0) + 15 * M.clamp((t - tFast0) / Math.max(0.5, tFast1 - tFast0));
const fmtG = g => g >= 0.1 ? g.toFixed(2).replace(/\.00$/, '') + ' m' : g >= 0.001 ? g.toFixed(4) + ' m' : g.toFixed(7) + ' m';

/* ---------- P: what a limit means ---------- */
$('#dfF').innerHTML = K(LIM('a', `f(${xv('x')})`, lc('l')));
const DR = [[`${xv('x')} \\to a`, 'x tends to a', 'x creeps towards a, never has to equal it'], [`f(${xv('x')})`, 'the output', 'what the function gives for each x'], [lc('l'), 'the limit', 'the value f(x) settles near']];
$('#dRs').innerHTML = DR.map(([s, n, e], i) => `<div class="dr" id="dr${i}" style="top:${232 + i * 108}px"><div class="sy">${K(s)}</div><div class="sn">${n}</div><div class="se">${e}</div></div>`).join('');
const tDr = [wt('P4', 'tends'), wt('P3', 'f'), wt('P5', 'l')];
const ps = $('#pS'), PX = v => 92 + (v - 1) * 300, PY = 300;
mk(ps, 'line', { x1: 60, y1: PY, x2: 724, y2: PY, stroke: C.ink, 'stroke-width': 3 });
[1, 1.5, 2, 2.5, 3].forEach(v => { mk(ps, 'line', { x1: PX(v), y1: PY - 9, x2: PX(v), y2: PY + 9, stroke: C.ink, 'stroke-width': 2 }); });
txt(ps, PX(2), PY + 46, 'a', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700 });
const pA = mk(ps, 'line', { x1: PX(2), y1: PY - 70, x2: PX(2), y2: PY + 12, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const pDotG = mk(mk(ps, 'g', {}), 'g', {}); const pDot = mk(pDotG, 'circle', { cx: 0, cy: PY, r: 12, fill: XV });
const pArr = mk(ps, 'path', { d: `M${PX(1.1)},${PY - 44} L${PX(1.8)},${PY - 44}`, stroke: XV, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const pArrH = mk(ps, 'path', { d: `M${PX(1.8)},${PY - 44} l-14,-8 v16 z`, fill: XV });
const tXa = wt('P4', 'creeps'), tXb = wt('P4', 'never');
const xOf = t => 2 - 0.5 * Math.pow(10, -3 * M.io((t - tXa) / Math.max(0.5, tXb - tXa)));

/* ---------- L: live table + graph ---------- */
const lp = drawH($('#lS'), { px: 96, pw: 620, py: 96, ph: 380 });
const lL = mover($('#lS'), lp, LB), lR = mover($('#lS'), lp, RT);
const lHole = txt($('#lS'), lp.X(2) + 22, lp.Y(4) - 18, 'hole at x = 2', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const lFn = txt($('#lS'), lp.X(3.2), lp.Y(5.2) - 30, 'y = h(x)', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
$('#lF').innerHTML = K(`h(${xv('x')}) = \\dfrac{${xv('x')}^2 - 4}{${xv('x')} - 2}`);
const TL = [['1.9', '3.9'], ['1.99', '3.99'], ['1.999', '3.999']], TR = [['2.1', '4.1'], ['2.01', '4.01'], ['2.001', '4.001']];
const tab = (id, head, rows, col) => { $(id).innerHTML = `<div class="th" style="color:${col}">${head}</div><div class="tr" style="background:#fff;height:40px;font:600 18px 'IBM Plex Mono';color:var(--mute)"><span>x</span>h(x)</div>` + rows.map(([a, b], i) => `<div class="tr" id="${id.slice(1)}${i}"><span style="color:${XV}">${a}</span><b class="hv" style="color:${col}">${b}</b></div>`).join(''); };
tab('#tL', 'FROM THE LEFT', TL, LB); tab('#tR', 'FROM THE RIGHT', TR, RT);
$('#tL').style.top = $('#tR').style.top = '170px';
const tLx = [wt('L3', 'one'), wt('L3', 'then'), wt('L3', 'then', 1)], tLh = [wt('L4', 'three'), wt('L4', 'three', 1), wt('L4', 'three', 2)];
const tRx = [wt('L5', 'two'), wt('L5', 'two', 1), wt('L5', 'two', 2)], tRh = [wt('L5', 'four'), wt('L5', 'four', 1), wt('L5', 'four', 2)];
const xL = stepper(1, [[tLx[0], 1.9], [tLx[1], 1.99], [tLx[2], 1.999]]), xR = stepper(3, [[tRx[0], 2.1], [tRx[1], 2.01], [tRx[2], 2.001]]);

/* ---------- D: why four ---------- */
const DS = [[`${xv('x')}^2 - 4 = (${xv('x')} - 2)(${xv('x')} + 2)`, 'split the top into two brackets'],
  [`h(${xv('x')}) = \\dfrac{\\cancel{(${xv('x')} - 2)}(${xv('x')} + 2)}{\\cancel{${xv('x')} - 2}}`, ''],
  [`h(${xv('x')}) = ${xv('x')} + 2, \\ \\ ${xv('x')} \\ne 2`, 'a straight line with one hole'],
  [`${LIM('2', `(${xv('x')} + 2)`, lc('4'))}`, 'even though h(2) does not exist']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${[84, 196, 334, 446][i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#ds1 .why').innerHTML = ''; $('#ds1').insertAdjacentHTML('beforeend', `<div class="why" style="left:420px;top:26px;white-space:normal;width:280px;line-height:1.3">x ≠ 2, so x - 2 ≠ 0: cancel it</div>`);
const tDs = [wt('D2', 'splits'), wt('D3', 'cancel'), wt('D4', 'left'), wt('D5', 'tends')];
const DY = [84, 196, 334, 446];
const dp = drawH($('#dS'), { px: 96, pw: 620, py: 96, ph: 380 });
const dL = mover($('#dS'), dp, LB), dR = mover($('#dS'), dp, RT);
const d4 = mk($('#dS'), 'line', { x1: dp.X(0), y1: dp.Y(4), x2: dp.X(2) - 12, y2: dp.Y(4), stroke: LC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const d4L = txt($('#dS'), dp.X(0) + 14, dp.Y(4) - 14, 'limit 4', { 'font-size': 22, fill: LC, 'font-weight': 600 });
const dLab = txt($('#dS'), dp.X(3.1), dp.Y(5.1) - 30, 'y = x + 2', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const tD5 = wt('D5', 'tends');

/* ---------- S: value vs limit ---------- */
$('#s1F').innerHTML = K(`h(2) = \\dfrac{${red('0')}}{${red('0')}}`);
$('#s2F').innerHTML = K(LIM('2', 'h(x)', lc('4')));
const sp1 = drawH($('#s1S'), { px: 120, pw: 560, py: 210, ph: 260, y1: 6.5, yt: [0, 2, 4, 6] });
const s1Q = txt($('#s1S'), sp1.X(2) + 20, sp1.Y(4) - 20, '?', { 'font-size': 40, fill: C.red, 'font-weight': 700, 'font-family': 'Poppins' });
const s1V = mk($('#s1S'), 'line', { x1: sp1.X(2), y1: sp1.Y(0), x2: sp1.X(2), y2: sp1.Y(4) + 14, stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const sp2 = drawH($('#s2S'), { px: 120, pw: 560, py: 210, ph: 260, y1: 6.5, yt: [0, 2, 4, 6] });
const s2L = mover($('#s2S'), sp2, LB), s2R = mover($('#s2S'), sp2, RT);
const s24 = mk($('#s2S'), 'line', { x1: sp2.X(0), y1: sp2.Y(4), x2: sp2.X(2) - 12, y2: sp2.Y(4), stroke: LC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const th1 = PUC.think($('#th1'), { q: 'Can a function have a limit where it has no value?', opts: ['Yes', 'No'], right: 0, why: 'h(2) does not exist, but h(x) gets close to 4 near 2. The hole does not stop the limit.' });

/* ---------- R: two sides ---------- */
const RS = [[`\\lim_{${xv('x')} \\to a^-} f(${xv('x')})`, 'left hand limit: x just below a', LB], [`\\lim_{${xv('x')} \\to a^+} f(${xv('x')})`, 'right hand limit: x just above a', RT], [`\\text{${'LHL'}} = \\text{${'RHL'}} = ${lc('l')}`, 'only then does the limit exist: it is l', LC]];
$('#rSt').innerHTML = RS.map(([f, w, c], i) => `<div class="st" id="rs${i}" style="top:${84 + i * 136}px"><div class="n" style="border-color:${c};color:${c}">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:72px">${w}</div></div>`).join('');
$('#rs0 .sx').innerHTML = K(`\\textcolor{${LB}}{\\lim_{x \\to a^-}} f(${xv('x')})`); $('#rs1 .sx').innerHTML = K(`\\textcolor{${RT}}{\\lim_{x \\to a^+}} f(${xv('x')})`);
$('#rs2 .sx').innerHTML = K(`${lb('\\text{LHL}')} = ${rt('\\text{RHL}')} = ${lc('l')}`);
const tRs = [wt('R1', 'left'), wt('R2', 'right'), wt('R3', 'same')];
const rp = plot($('#rS'), { x0: 0, x1: 3, y0: 0, y1: 2.6, px: 96, pw: 600, py: 140, ph: 320, xt: [0, 1, 2, 3], yt: [0, 1, 2] });
const rSeg = [0, 1, 2].map(k => { const l = mk($('#rS'), 'line', { x1: rp.X(k), y1: rp.Y(k), x2: rp.X(k + 1), y2: rp.Y(k), stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }); const d = rp.dot(k, k, C.ink, 9); const h = rp.hole(k + 1, k, C.ink, 9); return [l, d, h]; });
const rLab = txt($('#rS'), rp.X(2.5), rp.Y(2) - 24, 'y = [x]', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const rLd = mk($('#rS'), 'circle', { r: 12, fill: LB }), rRd = mk($('#rS'), 'circle', { r: 12, fill: RT });
const rLt = txt($('#rS'), rp.X(0.75), rp.Y(0) - 26, 'just below 1: 0', { 'text-anchor': 'middle', 'font-size': 20, fill: LB, 'font-weight': 600 });
const rRt = txt($('#rS'), rp.X(1.3), rp.Y(1) - 26, 'just above 1: 1', { 'text-anchor': 'start', 'font-size': 20, fill: RT, 'font-weight': 600 });
const th2 = PUC.think($('#th2'), { q: 'Greatest integer function [x] at x = 1: does the limit exist?', opts: ['Yes', 'No'], right: 1, why: 'Just below 1, [x] = 0. Just above 1, [x] = 1. Left and right do not match: no limit.' });
const tR5 = T0('R5');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${lb('\\lim_{x \\to a^-}')} f(x) = ${rt('\\lim_{x \\to a^+}')} f(x) = ${lc('l')}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`f(x) = x^2 \\ (x < 2), \\ \\ 3x - 2 \\ (x > 2)`)}<br>and ${K('f(2) = 7')}. Find ${K('\\lim_{x \\to 2} f(x)')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${lb('x \\to 2^-')}:\\ x^2 \\to ${lb('4')}`)],
  [K(`${rt('x \\to 2^+')}:\\ 3x - 2 \\to 6 - 2 = ${rt('4')}`)],
  [K(`${lb('4')} = ${rt('4')} \\Rightarrow \\text{limit} = ${lc('4')}`)],
  [K(`f(2) = 7: \\text{ not used}`)],
  [K(`\\lim_{x \\to 2} f(x) = ${lc('4')} \\ne f(2) = 7`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 74 });
$('#wl .lbl').style.top = '30px';
const wp = plot($('#wS'), { x0: 0, x1: 3.2, y0: 0, y1: 8, px: 96, pw: 620, py: 90, ph: 380, xt: [0, 1, 2, 3], yt: [0, 2, 4, 6, 8] });
const wC1 = wp.curve(x => x * x, 0, 2, LB), wC2 = wp.curve(x => 3 * x - 2, 2, 3, RT);
const wH = wp.hole(2, 4, C.ink, 10), wD = wp.dot(2, 7, C.ink, 10);
const wDl = txt($('#wS'), wp.X(2) - 16, wp.Y(7) + 6, 'f(2) = 7', { 'text-anchor': 'end', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const w4 = mk($('#wS'), 'line', { x1: wp.X(0), y1: wp.Y(4), x2: wp.X(2) - 12, y2: wp.Y(4), stroke: LC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const w4L = txt($('#wS'), wp.X(0) + 14, wp.Y(4) - 14, 'limit 4', { 'font-size': 22, fill: LC, 'font-weight': 600 });
const wL = mover($('#wS'), wp, LB), wR = mover($('#wS'), wp, RT);
const tW = [wt('W3', 'left'), wt('W4', 'right'), wt('W5', 'Both'), wt('W6', 'seven'), wt('W7', 'limit')];
const wxL = t => 1 + 0.995 * M.io((t - tW[0]) / 1.6), wxR = t => 3 - 0.995 * M.io((t - tW[1]) / 1.6);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\lim_{x \\to 0} \\frac{|x|}{x} = 1`) + '&nbsp; (tried only 0.1, 0.01)', right: K(`x \\to 0^-: \\ \\frac{|x|}{x} = ${lb('-1')} \\ne ${rt('1')}`) + '&nbsp; so the limit does not exist' });
const ts = $('#tS'), TXv = v => 280 + v * 110, TYv = v => 137 - v * 62;
mk(ts, 'line', { x1: 40, y1: TYv(0), x2: 520, y2: TYv(0), stroke: C.ink, 'stroke-width': 2.5 });
mk(ts, 'line', { x1: TXv(0), y1: 30, x2: TXv(0), y2: 244, stroke: C.ink, 'stroke-width': 2.5 });
const tRay = mk(ts, 'line', { x1: TXv(0) + 10, y1: TYv(1), x2: TXv(2), y2: TYv(1), stroke: RT, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tLay = mk(ts, 'line', { x1: TXv(-2), y1: TYv(-1), x2: TXv(0) - 10, y2: TYv(-1), stroke: LB, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tH1 = mk(ts, 'circle', { cx: TXv(0), cy: TYv(1), r: 9, fill: '#fff', stroke: RT, 'stroke-width': 3.5 }), tH2 = mk(ts, 'circle', { cx: TXv(0), cy: TYv(-1), r: 9, fill: '#fff', stroke: LB, 'stroke-width': 3.5 });
const tq1 = txt(ts, TXv(1.2), TYv(1) - 16, '+1', { 'text-anchor': 'middle', 'font-size': 22, fill: RT, 'font-weight': 600 }), tq2 = txt(ts, TXv(-1.2), TYv(-1) + 34, '-1', { 'text-anchor': 'middle', 'font-size': 22, fill: LB, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A function in pieces, or with [x]: check the left and right hand limits at a point.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`f(x) = \\begin{cases} ax + 3, & x < 2 \\\\ x^2 + a, & x > 2 \\end{cases}`)}<br>If ${K('\\lim_{x \\to 2} f(x)')} exists, its value is`,
  opts: ['3', '5', '7', 'does not exist'], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`${lb('x \\to 2^-')}: \\ 2a + 3`)], [K(`${rt('x \\to 2^+')}: \\ 4 + a`)], [K(`2a + 3 = 4 + a \\Rightarrow a = 1`)], [K(`\\text{limit} = 4 + 1 = ${lc('5')}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'tends'), wt('A3', 'tends'), wt('A4', 'equals'), wt('A4', 'five')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · limits', y0: 98, dy: 80, txt: [1, 0, 0, 1, 0],
  lines: ['<b>Limit</b>: what f(x) gets close to, as x gets close to a',
    K(LIM('a', 'f(x)', lc('l'))),
    K(`${lb('\\text{LHL}')} = ${rt('\\text{RHL}')} = ${lc('l')} \\ \\Rightarrow \\ \\text{the limit exists}`),
    'Looks <b>near</b> a, never at a: the value and the limit can differ',
    K(`\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = ${lc('4')}, \\ \\ \\text{but } h(2) \\text{ does not exist}`)] });
const YQ = ['What does "x tends to a" mean, in plain words?', 'h(2) does not exist. Why is the limit of h at 2 still 4?', 'When does a limit fail to exist?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 81', topic: 'Break a big limit into small ones: Algebra of Limits', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLx[0] - 0.3, 1.05, 960, 560], [T1('L5') + 0.2, 1, 960, 540]]);

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
    const k = kOf(t), g = 8 / Math.pow(2, k), x = HX(g);
    M.setT($('#hN'), String(Math.round(k))); M.setT($('#hG'), fmtG(g));
    $('#hD').style.left = (x - 62).toFixed(1) + 'px'; attr(hMark, 'cx', x.toFixed(1));
    attr(hGap, 'x1', x.toFixed(1)); attr(hGap, 'x2', '716'); attr(hGapL, 'x', ((x + 716) / 2).toFixed(1));
    M.vis($('#hD'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 }); M.vis(hGap, t, tMorph + 0.5, 1e9, { dy: 0 }); M.vis(hGapL, t, tMorph + 0.5, wt('H4', 'After'), { dy: 0 });
    M.vis($('#hP'), t, wt('H5', 'zero') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Does') - 0.1, 1e9, POP);
  }

  /* P: what a limit means */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#dfF'), t, wt('P3', 'limit') - 0.1, 1.0);
    DR.forEach((_, i) => M.vis($('#dr' + i), t, tDr[i] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#pb'), t, wt('P3', 'tends') - 0.2, out, { dx: 60, dy: 0, ...o });
    const xv_ = xOf(t); attr(pDotG, 'transform', `translate(${PX(xv_).toFixed(1)},0)`); M.setT($('#pXv'), xv_.toFixed(3));
    M.vis($('#pX'), t, wt('P3', 'tends'), 1e9, { dy: 14 }); M.vis(pDot, t, wt('P3', 'tends') + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis(pA, t, wt('P3', 'a', 1), 1e9, { dy: 0 }); M.draw(pArr, t, tXa, 0.5); M.vis(pArrH, t, tXa + 0.4, 1e9, { dy: 0 });
    M.vis($('#pP1'), t, wt('P4', 'never') - 0.1, 1e9, POP);
    M.vis($('#pP2'), t, wt('P5', 'Diya') - 0.1, 1e9, POP);
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(lp.line, t, tL1 + 0.4, 0.9); M.vis(lp.h, t, wt('L2', 'two') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(lHole, t, wt('L2', 'exist') - 0.2, 1e9, { dy: 0 });
    M.vis(lFn, t, tL1 + 1.0, 1e9, { dy: 0 });
    M.vis(lL.g, t, tLx[0] - 0.3, 1e9, { dy: 0, fade: 0.2 }); lL.set(xL(t), H, 3);
    M.vis(lR.g, t, tRx[0] - 0.3, 1e9, { dy: 0, fade: 0.2 }); lR.set(xR(t), H, 3);
    M.vis($('#lb'), t, wt('L1', 'h') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#lF'), t, wt('L1', 'squared') - 0.2, 0.9);
    M.vis($('#lNo'), t, wt('L2', 'value') - 0.1, 1e9, POP);
    M.vis($('#tL'), t, T0('L3') - 0.1, 1e9, { dy: 14 }); M.vis($('#tR'), t, T0('L5') - 0.1, 1e9, { dy: 14 });
    TL.forEach((_, i) => { const r = $('#tL' + i); M.vis(r, t, tLx[i] - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis(r.querySelector('.hv'), t, tLh[i] - 0.05, 1e9, POP); });
    TR.forEach((_, i) => { const r = $('#tR' + i); M.vis(r, t, tRx[i] - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis(r.querySelector('.hv'), t, tRh[i] - 0.05, 1e9, POP); });
    M.vis($('#lYes'), t, wt('L5', 'Also') - 0.1, 1e9, POP);
  }

  /* D: why four */
  const dOn = t >= tD1 - 0.1 && t < tS1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('S1');
    M.vis($('#da'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); el.querySelectorAll('.why').forEach(w => M.vis(w, t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 })); });
    const hy = M.track(DY[0], tDs.slice(1).map((tt, i) => [tt - 0.1, DY[i + 1]]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 8).toFixed(1) + 'px'; hb.style.height = (Math.abs(hy - DY[1]) < 2 ? 130 : 112) + 'px';
    M.vis($('#db'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(dLab, t, wt('D4', 'straight'), 1e9, { dy: 0 });
    M.vis(dL.g, t, tD5 - 0.2, 1e9, { dy: 0, fade: 0.2 }); dL.set(1 + 0.99 * M.io((t - tD5) / 1.4), H);
    M.vis(dR.g, t, tD5 - 0.2, 1e9, { dy: 0, fade: 0.2 }); dR.set(3 - 0.99 * M.io((t - tD5) / 1.4), H);
    M.draw(d4, t, tD5 + 1.2, 0.5); M.vis(d4L, t, tD5 + 1.4, 1e9, { dy: 0 });
  }

  /* S: value vs limit + think */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#s1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s1F'), t, wt('S1', 'value') - 0.1, 0.7);
    M.draw(s1V, t, wt('S1', 'exactly') - 0.1, 0.5); M.vis(s1Q, t, wt('S1', 'none') - 0.2, 1e9, POP);
    M.vis($('#s1P'), t, wt('S1', 'none') - 0.1, 1e9, POP);
    M.vis($('#s2'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s2F'), t, T0('S2') + 0.2, 0.8);
    const ts2 = wt('S2', 'near');
    M.vis(s2L.g, t, ts2 - 0.2, 1e9, { dy: 0, fade: 0.2 }); s2L.set(1 + 0.98 * M.io((t - ts2) / 1.2), H);
    M.vis(s2R.g, t, ts2 - 0.2, 1e9, { dy: 0, fade: 0.2 }); s2R.set(3 - 0.98 * M.io((t - ts2) / 1.2), H);
    M.draw(s24, t, wt('S2', 'four') - 0.1, 0.5);
    M.vis($('#s2P'), t, wt('S2', 'looks') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'value') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'value') });
  }

  /* R: two sides + think */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R4');
    M.vis($('#ra'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#rs' + i); M.vis(el.querySelector('.n'), t, tRs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRs[i], 0.8); M.vis(el.querySelector('.why'), t, tRs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tRs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 136]), M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 8).toFixed(1) + 'px'; hb.style.height = '124px';
    M.vis($('#rb'), t, tR1 + 0.3, OUT('R4'), { dx: 60, dy: 0, ...o });
    rSeg.forEach(([l, d, h], i) => { M.draw(l, t, tR1 + 0.6 + i * 0.25, 0.4); M.vis(d, t, tR1 + 0.6 + i * 0.25, 1e9, { dy: 0 }); M.vis(h, t, tR1 + 0.9 + i * 0.25, 1e9, { dy: 0 }); });
    M.vis(rLab, t, tR1 + 1.4, 1e9, { dy: 0 });
    const xl = 0.2 + 0.78 * M.io((t - tRs[0]) / 1.2), xr = 1.8 - 0.78 * M.io((t - tRs[1]) / 1.2);
    attr(rLd, 'cx', rp.X(xl).toFixed(1)); attr(rLd, 'cy', rp.Y(0)); attr(rRd, 'cx', rp.X(xr).toFixed(1)); attr(rRd, 'cy', rp.Y(1));
    M.vis(rLd, t, tRs[0] - 0.1, 1e9, { dy: 0, fade: 0.1 }); M.vis(rRd, t, tRs[1] - 0.1, 1e9, { dy: 0, fade: 0.1 });
    M.vis(rLt, t, tRs[0] + 0.8, 1e9, { dy: 0 }); M.vis(rRt, t, tRs[1] + 0.8, 1e9, { dy: 0 });
    M.vis($('#rP'), t, wt('R3', 'same') + 0.3, 1e9, POP);
    M.vis($('#th2'), t, tR4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tR4, tOpts: wt('R4', 'Does') - 0.1, tCount: T1('R4') + 0.05, dur: 3, tAns: tR5 - 0.02, tWhy: wt('R5', 'Just') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'limit') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'both', 1) - 0.2, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wC1, t, wt('W2', 'squared') - 0.1, 0.6); M.draw(wC2, t, wt('W2', 'three') - 0.1, 0.6);
    M.vis(wH, t, wt('W2', 'three') + 0.4, 1e9, { dy: 0 }); M.vis(wD, t, wt('W2', 'seven') - 0.1, 1e9, POP); M.vis(wDl, t, wt('W2', 'seven'), 1e9, { dy: 0 });
    M.vis(wL.g, t, tW[0] - 0.2, 1e9, { dy: 0, fade: 0.2 }); wL.set(wxL(t), x => x * x);
    M.vis(wR.g, t, tW[1] - 0.2, 1e9, { dy: 0, fade: 0.2 }); wR.set(wxR(t), x => 3 * x - 2);
    M.draw(w4, t, tW[2], 0.5); M.vis(w4L, t, tW[2] + 0.3, 1e9, { dy: 0 });
    const pk = M.io((t - tW[3] + 0.1) / 0.3) * (1 - M.io((t - tW[3] - 1.4) / 0.4)); attr(wD, 'r', (10 + 6 * pk).toFixed(2));
    M.vis($('#wRes'), t, wt('W7', 'value') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'one') - 0.1, tRight: wt('X3', 'left') });
    M.draw(tRay, t, wt('X2', 'try') - 0.1, 0.5); M.vis(tH1, t, wt('X2', 'try'), 1e9, { dy: 0 }); M.vis(tq1, t, wt('X2', 'get'), 1e9, { dy: 0 });
    M.draw(tLay, t, wt('X3', 'left') - 0.1, 0.5); M.vis(tH2, t, wt('X3', 'left'), 1e9, { dy: 0 }); M.vis(tq2, t, wt('X3', 'minus'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'functions') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'If'), tCount, tAns });
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
