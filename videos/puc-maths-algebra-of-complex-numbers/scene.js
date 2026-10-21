// PUC Maths Ep 40: Algebra of complex numbers (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: real part blue, imaginary part coral (accent), i violet, modulus teal. Arrows: z1 ink, z2 orange, sum green.
const RE = '#2F6FEB', REB = '#E7EEFD', IM = C.violet, IMB = '#EFE9FC', RC = C.ac, Z1 = C.ink2, Z2 = C.orange, ZS = C.ok;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${RE}}{${s}}`, B = s => `\\textcolor{${RC}}{${s}}`, I = `\\textcolor{${IM}}{i}`;
const col = (c, s) => `\\textcolor{${c}}{${s}}`;
const seg = (v0, ks) => t => { let v = v0; for (const [a, b, to] of ks) { const u = M.io((t - a) / Math.max(0.01, b - a)); if (u <= 0) break; v = v + (to - v) * u; } return v; };
const hiMove = (el, t, ts, y0, dy, h) => { const y = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t); M.vis(el, t, ts[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); el.style.top = (y - h).toFixed(1) + 'px'; };
const steps = (host, rows, y0, dy) => { host.innerHTML = rows.map(([f, w], i) => `<div class="st" style="top:${y0 + i * dy}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join(''); return [...host.querySelectorAll('.st')]; };
const runSteps = (els, t, ts) => els.forEach((el, i) => { M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.7); const w = el.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
const cx = (a, b) => { const f = v => (Math.abs(v - Math.round(v)) < 0.05 ? Math.round(v) : v.toFixed(1)); return `${A(f(a))} ${b < 0 ? '-' : '+'} ${B(f(Math.abs(b)))}\\,${I}`; };
const board = (svg, o) => {
  const X = a => o.x0 + a * o.ux, Y = b => o.y0 - b * o.uy, g = mk(mk(svg, 'g', {}), 'g', {});
  for (let a = Math.ceil(o.a0); a <= o.a1; a++) mk(g, 'line', { x1: X(a), y1: Y(o.b0), x2: X(a), y2: Y(o.b1), stroke: C.grid, 'stroke-width': 1.5 });
  for (let b = Math.ceil(o.b0); b <= o.b1; b++) mk(g, 'line', { x1: X(o.a0), y1: Y(b), x2: X(o.a1), y2: Y(b), stroke: C.grid, 'stroke-width': 1.5 });
  mk(g, 'line', { x1: X(o.a0), y1: Y(0), x2: X(o.a1), y2: Y(0), stroke: RE, 'stroke-width': 3.5 });
  mk(g, 'line', { x1: X(0), y1: Y(o.b0), x2: X(0), y2: Y(o.b1), stroke: RC, 'stroke-width': 3.5 });
  (o.at || []).forEach(a => txt(g, X(a), Y(0) + 26, a, { 'text-anchor': 'middle', fill: RE, 'font-weight': 600 }));
  (o.bt || []).forEach(b => txt(g, X(0) - 10, Y(b) + 6, b, { 'text-anchor': 'end', fill: RC, 'font-weight': 600 }));
  return { X, Y, g };
};
const arr = (svg, c, sw = 6) => PUC.arrow(svg, c, sw, 18);

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tA1 = T0('B1'), tL1 = T0('L1'), tS1 = T0('S1'), tS3 = T0('S3'), tM1 = T0('M1'), tT = T0('T1'), tR1 = T0('R1'), tR3 = T0('R3'), tV1 = T0('V1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['RIDE 1', '3 east, 2 north'], ['RIDE 2', '1 east, 4 north']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${500 + i * 480}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'three'), wt('H1', 'Then')];

/* ---------- H: map of two rides ---------- */
const hb = board($('#hS'), { x0: 150, y0: 450, ux: 96, uy: 52, a0: -0.6, a1: 5.8, b0: -0.6, b1: 6.8, at: [1, 2, 3, 4, 5], bt: [2, 4, 6] });
txt(hb.g, 700, hb.Y(0) - 12, 'east', { 'text-anchor': 'end', fill: RE, 'font-size': 18, 'font-weight': 600 }); txt(hb.g, hb.X(0) + 12, hb.Y(6.5), 'north', { fill: RC, 'font-size': 18, 'font-weight': 600 });
const hR1 = arr($('#hS'), Z1), hR2 = arr($('#hS'), Z2), hRS = arr($('#hS'), ZS, 5);
const hEnd = txt($('#hS'), hb.X(4) + 18, hb.Y(6) + 8, '4 east, 6 north', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: ZS });

/* ---------- A: addition steps ---------- */
$('#aG').innerHTML = K(`z_1 = ${A('a')} + ${I}\\,${B('b')}, \\qquad z_2 = ${A('c')} + ${I}\\,${B('d')}`);
const aEl = steps($('#aSt'), [[`\\text{real: } ${A('a + c')}`, 'add the real parts'], [`\\text{imaginary: } ${B('b + d')}`, 'add the imaginary parts'], [`z_1 + z_2 = (${A('a + c')}) + ${I}\\,(${B('b + d')})`, 'put them together']], 170, 110);
const tAs = [wt('B2', 'Add'), wt('B3', 'Add'), wt('B4', 'Put')];
$('#aC0').innerHTML = K(`\\phantom{+}\\ ${cx(3, 2)}`); $('#aC1').innerHTML = K(`+\\ ${cx(1, 4)}`); $('#aC2').innerHTML = K(`\\phantom{+}\\ ${cx(4, 6)}`);

/* ---------- L: tip to tail ---------- */
const lb = board($('#lS'), { x0: 236, y0: 380, ux: 64, uy: 38, a0: -2.4, a1: 7.6, b0: -2.6, b1: 7.4, at: [-2, 2, 4, 6], bt: [-2, 2, 4, 6] });
const lZ1 = arr($('#lS'), Z1), lZ2 = arr($('#lS'), Z2), lZS = arr($('#lS'), ZS, 5), lZm = arr($('#lS'), Z2);
const lTip = mk($('#lS'), 'circle', { r: 9, fill: ZS });
const cK = seg(1, [[wt('L5', 'Change'), wt('L5', 'Change') + 1.1, 2.5], [wt('L5', 'sum'), wt('L5', 'sum') + 1.0, -1], [wt('L5', 'Always'), wt('L5', 'Always') + 0.9, 1]]);
const dK = seg(4, [[wt('L5', 'Change'), wt('L5', 'Change') + 1.1, 1], [wt('L5', 'sum'), wt('L5', 'sum') + 1.0, 2.5], [wt('L5', 'Always'), wt('L5', 'Always') + 0.9, 4]]);
const tFlip = wt('L6', 'flip');
let lLast = '';

/* ---------- S: add vs multiply ---------- */
$('#slF').innerHTML = K(`(${A('a')} + ${I}\\,${B('b')}) + (${A('c')} + ${I}\\,${B('d')})`);
$('#slR').innerHTML = K(`= (${A('a + c')}) + ${I}\\,(${B('b + d')})`);
const sls = $('#slS');
const sLk = [[166, 180, 456, 180, RE], [300, 180, 590, 180, RC]].map(([x1, y1, x2, y2, c]) => { const p = mk(sls, 'path', { d: `M${x1},${y1 + 14} Q${(x1 + x2) / 2},${y1 + 110} ${x2},${y1 + 14}`, fill: 'none', stroke: c, 'stroke-width': 4, 'stroke-dasharray': '2 0' }); return p; });
const GH = [[`${A('c')}`, 370], [`${I}\\,${B('d')}`, 580]], GR = [[`${A('a')}`, 196], [`${I}\\,${B('b')}`, 312]];
const gridHTML = (cols, rows, cells, id) => cols.map(([f, x], k) => `<div class="gh" style="left:${x - 75}px;top:84px">${K(f)}</div>`).join('') + rows.map(([f, y], k) => `<div class="gh" style="left:56px;top:${y - 36}px">${K(f)}</div>`).join('') +
  cells.map((f, k) => `<div class="gc" id="${id}${k}" style="left:${[370, 580][k % 2] - 100}px;top:${[196, 312][Math.floor(k / 2)] - 48}px">${K(f)}</div>`).join('');
$('#sG').innerHTML = gridHTML(GH, GR, [`${A('ac')}`, `${I}\\,${A('a')}${B('d')}`, `${I}\\,${B('b')}${A('c')}`, `${I}^2 ${B('bd')}`], 'sg') + `<div class="fx2" id="sGr" style="top:400px;font-size:36px"></div>`;
$('#sGr').innerHTML = K(`= (${A('ac')} - ${B('bd')}) + ${I}\\,(${A('a')}${B('d')} + ${B('b')}${A('c')})`);
const th1 = PUC.think($('#th1'), { q: `What is ${K(`(5 + 2${I}) - (3 - ${I})`)} ?`, opts: [K(`2 + 3${I}`), K(`2 + ${I}`)], right: 0, why: `Real: 5 - 3 = 2. Imaginary: 2 - (-1) = 3. So ${K(`2 + 3${I}`)}.` });

/* ---------- M: multiplication ---------- */
const mEl = steps($('#mSt'), [[`3 \\cdot 2 = 6, \\quad 3 \\cdot 6${I} = 18${I}`, 'first row'], [`5${I} \\cdot 2 = 10${I}, \\quad 5${I} \\cdot 6${I} = 30${I}^2`, 'second row'], [`30${I}^2 = 30(-1) = -30`, 'i squared is -1'], [`(${A('6 - 30')}) + (${B('18 + 10')})${I}`, 'collect real, then imaginary']], 84, 108);
const tMs = [wt('M2', 'Multiply'), wt('M3', 'Five'), wt('M4', 'squared'), wt('M5', 'Collect')];
$('#mG').innerHTML = gridHTML([['2', 370], [`6${I}`, 580]], [['3', 196], [`5${I}`, 312]], ['6', `18${I}`, `10${I}`, `30${I}^2`], 'mg');
$('#mRes').innerHTML = K(`= ${cx(-24, 28)}`);
let mSwap = false;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(${A('a')} + ${I}\\,${B('b')})(${A('c')} + ${I}\\,${B('d')}) = (${A('ac')} - ${B('bd')}) + ${I}\\,(${A('a')}${B('d')} + ${B('b')}${A('c')})`);

/* ---------- R: times i ---------- */
const rb = board($('#rS'), { x0: 392, y0: 340, ux: 66, uy: 66, a0: -4.6, a1: 4.6, b0: -1.4, b1: 4.0, at: [-3, -2, -1, 1, 2, 3], bt: [1, 2, 3] });
const rZ = arr($('#rS'), Z1), rZi = arr($('#rS'), IM);
const rArc = mk($('#rS'), 'path', { fill: 'none', stroke: IM, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const rL0 = txt($('#rS'), rb.X(3) + 10, rb.Y(2) - 12, '3 + 2i', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: Z1 });
const rL1 = txt($('#rS'), rb.X(-2) - 10, rb.Y(3) - 14, '-2 + 3i', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: IM, 'text-anchor': 'end' });
const r0 = Math.atan2(2, 3), rr = Math.hypot(3, 2);
const rAng = seg(0, [[wt('R2', 'turns') - 0.2, wt('R2', 'turns') + 0.9, Math.PI / 2]]);
$('#rF0').innerHTML = K(`(${cx(3, 2)}) \\cdot ${I}`); $('#rF1').innerHTML = K(`= 3${I} + 2${I}^2`); $('#rF2').innerHTML = K(`= ${cx(-2, 3)}`);
const th2 = PUC.think($('#th2'), { q: `${K(`(1 + ${I})^2`)} : is it 2i, or 2 + 2i?`, opts: [K(`2${I}`), K(`2 + 2${I}`)], right: 0, why: `${K(`(1 + ${I})^2 = 1 + 2${I} + ${I}^2 = 1 + 2${I} - 1 = 2${I}`)}` });

/* ---------- V: division ---------- */
$('#vBig').innerHTML = K(`\\dfrac{1}{z} = \\dfrac{${A('a')} - ${I}\\,${B('b')}}{${A('a')}^2 + ${B('b')}^2}`);
$('#vD').innerHTML = K(`\\dfrac{z_1}{z_2} = z_1 \\cdot \\dfrac{1}{z_2}`);
const vEl = steps($('#vSt'), [[`z = 2 - 3${I}`, 'a = 2, b = -3'], [`\\tfrac{1}{z} = \\tfrac{2 + 3${I}}{4 + 9} = \\tfrac{2 + 3${I}}{13}`, 'a squared plus b squared is 13'], [`(2 - 3${I})(2 + 3${I}) = 4 - 9${I}^2 = 13`, 'every term by every term'], [`\\tfrac{13}{13} = 1 \\ \\checkmark`, 'so it really is the inverse']], 84, 112);
const tVs = [T0('V3'), wt('V3', 'One'), wt('V3', 'Multiply'), wt('V3', 'thirteen', 1)];

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Simplify ${K(`(1 + 2${I})(3 - ${I}) + (2 - 5${I})`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`3 - ${I} + 6${I} - 2${I}^2`)],
  [K(`-2${I}^2 = +2 \\;\\Rightarrow\\; ${cx(5, 5)}`)],
  [K(`(${cx(5, 5)}) + (${cx(2, -5)})`)],
  [K(`= ${A('7')} + ${B('0')}\\,${I} = 7`)],
  ['Purely real: the imaginary parts cancel']], { label: 'WORKED EXAMPLE', y0: 170, dy: 80 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Multiply'), wt('W4', 'Minus'), wt('W5', 'Add'), wt('W5', 'seven'), wt('W6', 'imaginary')];
const wb = board($('#wS'), { x0: 120, y0: 400, ux: 76, uy: 50, a0: -0.8, a1: 8.2, b0: -1, b1: 6.4, at: [1, 2, 3, 4, 5, 6, 7], bt: [1, 2, 3, 4, 5] });
const wA1 = arr($('#wS'), Z1), wA2 = arr($('#wS'), Z2);
const wL1 = txt($('#wS'), wb.X(5) + 12, wb.Y(5) - 10, '5 + 5i', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: Z1 });
const wL2 = txt($('#wS'), wb.X(6) + 30, wb.Y(2.6), '+ (2 - 5i)', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 700, fill: Z2 });
const wEnd = mk(mk($('#wS'), 'g', { transform: `translate(${wb.X(7)},${wb.Y(0)})` }), 'g', {}); mk(wEnd, 'circle', { r: 16, fill: 'none', stroke: ZS, 'stroke-width': 5 }); txt(wEnd, 0, -26, '7', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: ZS });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(2 + 3${I})(4 + 5${I}) = 8 + 15${I}`), right: K(`8 + 10${I} + 12${I} + 15${I}^2 = -7 + 22${I}`) });
const ts = $('#tS');
const tG = [['8', 'a·c'], ['10i', 'a·id'], ['12i', 'ib·c'], ['15i²', 'ib·id']].map(([s, w], k) => { const g = mk(mk(ts, 'g', { transform: `translate(${70 + (k % 2) * 160},${70 + Math.floor(k / 2) * 92})` }), 'g', {}); mk(g, 'rect', { x: -66, y: -34, width: 140, height: 70, rx: 12, fill: k === 1 || k === 2 ? C.okBg : C.soft, stroke: k === 1 || k === 2 ? C.ok : 'none', 'stroke-width': 3 }); txt(g, 4, 10, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: C.ink }); return g; });
const tGT = txt(ts, 150, 250, 'the middle terms', { 'text-anchor': 'middle', fill: C.ok, 'font-size': 18, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Simplify sums, products and quotients of complex numbers to the form a + ib.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`(1 + ${I})^4 + (1 - ${I})^4 = \\ ?`)}`,
  opts: [K('0'), K('8'), K('-8'), K(`8${I}`)], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`(1 + ${I})^2 = 1 + 2${I} + ${I}^2 = 2${I}`)], [K(`(1 - ${I})^2 = -2${I}`)], [K(`(2${I})^2 = -4`)], [K(`(-2${I})^2 = -4`)], [K(`-4 + (-4) = -8`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'One'), wt('A3', 'One'), wt('A4', 'Two'), wt('A4', 'minus', 1), wt('A4', 'total')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · algebra of complex numbers', y0: 98, dy: 80, txt: [0, 1, 0, 0, 1],
  lines: [K(`(${A('a')} + ${I}${B('b')}) + (${A('c')} + ${I}${B('d')}) = (${A('a + c')}) + ${I}(${B('b + d')})`),
    '<b>Subtract</b>: add the opposite &nbsp;·&nbsp; <b>times i</b>: a quarter turn',
    K(`(${A('a')} + ${I}${B('b')})(${A('c')} + ${I}${B('d')}) = (${A('ac')} - ${B('bd')}) + ${I}(${A('a')}${B('d')} + ${B('b')}${A('c')})`),
    K(`\\dfrac{1}{z} = \\dfrac{${A('a')} - ${I}${B('b')}}{${A('a')}^2 + ${B('b')}^2} \\quad (z \\ne 0)`),
    'The usual identities still hold, with i² = -1'] });
const YQ = ['What is (4 - i) + (2 + 5i)?', 'What is i(1 + i)?', 'Why is (2 + 3i)(4 + 5i) not 8 + 15i?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 41', topic: 'A mirror image across the road: Equality and Conjugates', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const grow = (a, t, t0, x1, y1, x2, y2, d = 0.6) => { const u = M.io((t - t0) / d); a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tA1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hb.g, t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.3 });
    grow(hR1, t, tMorph + 0.6, hb.X(0), hb.Y(0), hb.X(3), hb.Y(2), 0.8); grow(hR2, t, tMorph + 1.5, hb.X(3), hb.Y(2), hb.X(4), hb.Y(6), 0.8);
    grow(hRS, t, wt('H4', 'Adding'), hb.X(0), hb.Y(0), hb.X(4), hb.Y(6), 0.8); M.vis(hEnd, t, wt('H4', 'Adding') + 0.6, 1e9, { dy: 0 });
    M.vis($('#hlP'), t, wt('H4', 'Real') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Imaginary') - 0.1, 1e9, POP);
  }

  /* A */
  const aOn = t >= tA1 - 0.1 && t < tL1 + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = OUT('L1');
    M.vis($('#al'), t, tA1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#aG'), t, wt('B1', 'Take'), 1.0);
    runSteps(aEl, t, tAs); hiMove($('#aHi'), t, tAs, 170, 110, 8);
    M.vis($('#ar'), t, tA1 + 0.4, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#aC0'), t, tA1 + 0.8, 0.6); PUC.write($('#aC1'), t, tA1 + 1.4, 0.6);
    M.vis($('#aLine'), t, tAs[2] - 0.2, 1e9, { dy: 0, dx: -20 }); PUC.write($('#aC2'), t, tAs[2], 0.8);
    M.vis($('#aP'), t, tAs[2] + 0.8, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(lb.g, t, tL1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    const c = cK(t), d = dK(t), fl = M.io((t - tFlip) / 0.7);
    grow(lZ1, t, T0('L2') + 0.4, lb.X(0), lb.Y(0), lb.X(3), lb.Y(2), 0.8);
    // z2 slides from the origin to the tip of z1
    const sl = M.io((t - wt('L3', 'Slide')) / 0.8), ox = 3 * sl, oy = 2 * sl;
    const on2 = t >= T0('L3');
    if (on2) { const u = M.io((t - T0('L3')) / 0.6); lZ2.set(lb.X(ox), lb.Y(oy), lb.X(ox + c * u), lb.Y(oy + d * u)); } else lZ2.set(0, 0, 0, 0);
    lZ2.g.style.opacity = (1 - 0.65 * fl).toFixed(3);
    const sOn = t >= T0('L4'); const sx = 3 + c * (1 - 2 * fl), sy = 2 + d * (1 - 2 * fl);
    if (sOn) { const u = M.io((t - T0('L4')) / 0.6); lZS.set(lb.X(0), lb.Y(0), lb.X(sx * u), lb.Y(sy * u)); } else lZS.set(0, 0, 0, 0);
    if (fl > 0) lZm.set(lb.X(3), lb.Y(2), lb.X(3 - c * fl), lb.Y(2 - d * fl)); else lZm.set(0, 0, 0, 0);
    attr(lTip, 'cx', lb.X(sx).toFixed(1)); attr(lTip, 'cy', lb.Y(sy).toFixed(1)); M.hide(lTip, !sOn || t < T0('L4') + 0.6);
    M.vis($('#lr'), t, T0('L2'), out, { dx: 60, dy: 0, ...o });
    const key = c.toFixed(1) + d.toFixed(1) + (fl > 0.5);
    if (key !== lLast) { lLast = key;
      $('#lR0').innerHTML = K(`${col(Z1, 'z_1')} = ${cx(3, 2)}`); $('#lR1').innerHTML = K(`${col(Z2, 'z_2')} = ${cx(c, d)}`);
      $('#lR2').innerHTML = K(`${col(ZS, 'z_1 + z_2')} = ${cx(3 + c, 2 + d)}`); $('#lR3').innerHTML = K(`${col(ZS, 'z_1 - z_2')} = ${cx(3 - c, 2 - d)}`); }
    M.vis($('#lR0'), t, T0('L2') + 0.3, 1e9, { dy: 10 }); M.vis($('#lR1'), t, T0('L3'), 1e9, { dy: 10 }); M.vis($('#lR2'), t, T0('L4') + 0.3, tFlip - 0.1, { dy: 10, outDur: 0.2 });
    M.vis($('#lSL'), t, T0('L6'), 1e9, { dy: 10 }); M.vis($('#lR3'), t, tFlip + 0.4, 1e9, { dy: 10 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tM1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slF'), t, tS1 + 0.3, 0.8); sLk.forEach((p, k) => M.draw(p, t, wt('S1', 'Real') + k * 0.6, 0.6)); PUC.write($('#slR'), t, wt('S1', 'imaginary', 1), 0.8);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#sG'), t, T0('S2') + 0.1, 1e9, { dy: 0 });
    for (let k = 0; k < 4; k++) { const el = $('#sg' + k); M.vis(el, t, wt('S2', 'Every') + k * 0.25, 1e9, { ...POP, sc: 0.6 }); if (k === 3) { const r = M.io((t - wt('S2', 'minus')) / 0.3); el.style.borderColor = mix('#EEF0F4', C.red, r); el.style.background = mix(C.soft, C.redBg, r); } }
    PUC.write($('#sGr'), t, wt('S2', 'minus') + 0.3, 1.0);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'minus') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Five') });
  }

  /* M */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#ml'), t, tM1 + 0.1, 1e9, { dx: -60, dy: 0 });
    runSteps(mEl, t, tMs); hiMove($('#mHi'), t, tMs, 84, 108, 6);
    M.vis($('#mr'), t, tM1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.vis($('#mG'), t, tM1 + 0.6, 1e9, { dy: 0 });
    const tc = [wt('M2', 'six') + 0.2, wt('M2', 'eighteen'), wt('M3', 'ten'), wt('M3', 'thirty')];
    for (let k = 0; k < 4; k++) { const el = $('#mg' + k); el.style.opacity = M.clamp((t - tc[k]) / 0.2); M.hide(el, t < tc[k]); const r = M.io((t - tMs[3]) / 0.4); el.style.background = mix(C.soft, k === 0 || k === 3 ? REB : C.ac2, r); }
    const sw = t >= tMs[2] + 0.5; if (sw !== mSwap) { mSwap = sw; $('#mg3').innerHTML = K(sw ? '-30' : `30${I}^2`); }
    PUC.write($('#mRes'), t, T0('M6') + 0.2, 0.9);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Add') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'turn') - 0.2, 1.0);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tV1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R3');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis(rb.g, t, tR1 + 0.5, 1e9, { dy: 0, fade: 0.3 });
    grow(rZ, t, wt('R1', 'Multiply'), rb.X(0), rb.Y(0), rb.X(3), rb.Y(2), 0.7); M.vis(rL0, t, wt('R1', 'Multiply') + 0.5, 1e9, { dy: 0 });
    const a = rAng(t), ang = r0 + a, on = t >= wt('R2', 'turns') - 0.2;
    if (on) rZi.set(rb.X(0), rb.Y(0), rb.X(rr * Math.cos(ang)), rb.Y(rr * Math.sin(ang))); else rZi.set(0, 0, 0, 0);
    let d = ''; for (let k = 0; k <= 30; k++) { const q = r0 + a * k / 30; d += (k ? 'L' : 'M') + rb.X(rr * Math.cos(q)).toFixed(1) + ',' + rb.Y(rr * Math.sin(q)).toFixed(1); } attr(rArc, 'd', a > 0.01 ? d : '');
    M.vis(rL1, t, wt('R2', 'turns') + 0.8, 1e9, { dy: 0 });
    M.vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#rF0'), t, wt('R1', 'Multiply') + 0.2, 0.8); PUC.write($('#rF1'), t, wt('R1', 'get'), 0.8); PUC.write($('#rF2'), t, wt('R1', 'which'), 0.8);
    M.vis($('#rP'), t, wt('R2', 'never') - 0.2, 1e9, POP);
    M.vis($('#th2'), t, tR3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th2(t, { tin: tR3, tOpts: wt('R3', 'two') - 0.1, tCount: T1('R3') + 0.05, dur: 3, tAns: T0('R4') - 0.02, tWhy: wt('R4', 'One') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#vD'), t, wt('V1', 'multiplying'), 0.8);
    PUC.write($('#vBig'), t, wt('V2', 'minus') - 0.4, 1.0); M.vis($('#vW'), t, wt('V2', 'not') - 0.2, 1e9, { dy: 10 });
    M.vis($('#vr'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    runSteps(vEl, t, tVs); hiMove($('#vHi'), t, tVs, 84, 112, 8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wb.g, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    grow(wA1, t, tW[1] + 0.4, wb.X(0), wb.Y(0), wb.X(5), wb.Y(5), 0.8); M.vis(wL1, t, tW[1] + 1.0, 1e9, { dy: 0 });
    grow(wA2, t, tW[2] + 0.2, wb.X(5), wb.Y(5), wb.X(7), wb.Y(0), 0.8); M.vis(wL2, t, tW[2] + 0.8, 1e9, { dy: 0 });
    M.vis(wEnd, t, tW[3], 1e9, { ...POP, sc: 0.3 });
    M.vis($('#wP'), t, wt('W6', 'purely') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'full') });
    tG.forEach((g, k) => M.vis(g, t, wt('X3', 'eight') + k * 0.4, 1e9, { ...POP, sc: 0.5 })); M.vis(tGT, t, wt('X3', 'skips'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'simplified') });
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
