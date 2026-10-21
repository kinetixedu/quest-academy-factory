// PUC Maths Ep 27: Definitions of sine, cosine and the other trigonometric functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Chapter 3 canon, as in the puc-samples maths frame): cos x blue, sin x coral (accent), angle x violet, radius and P ink
const TH = C.violet, CS = '#2F6FEB', SN = C.ac, CIR = '#8C93A3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const th = s => `\\textcolor{${TH}}{${s}}`, cs = s => `\\textcolor{${CS}}{${s}}`, sn = s => `\\textcolor{${SN}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const COSEC = '\\operatorname{cosec}';
const f2 = v => v.toFixed(2), TAU = 2 * Math.PI, D2R = Math.PI / 180;
const fv = (v, d = 2) => { const s = v.toFixed(d); return /^-0\.0*$/.test(s) ? s.slice(1) : s; };
const P = (cx, cy, R, a) => [cx + R * Math.cos(a), cy - R * Math.sin(a)];
const arcD = (cx, cy, R, a0, a1) => {
  if (a1 < a0) [a0, a1] = [a1, a0];
  if (a1 - a0 < 1e-4) return '';
  if (a1 - a0 >= TAU - 1e-4) { const [x, y] = P(cx, cy, R, a0), [x2, y2] = P(cx, cy, R, a0 + Math.PI); return `M${f2(x)},${f2(y)} A${R},${R} 0 1 0 ${f2(x2)},${f2(y2)} A${R},${R} 0 1 0 ${f2(x)},${f2(y)}`; }
  const [x0, y0] = P(cx, cy, R, a0), [x1, y1] = P(cx, cy, R, a1);
  return `M${f2(x0)},${f2(y0)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${f2(x1)},${f2(y1)}`;
};
const ITAL = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 };
// the unit circle of the sample frame: axes, grey circle, blue cos base, coral sin height, ink radius, violet angle, P
const UCS = (svg, cx, cy, R, o = {}) => {
  const e = o.ext ?? 44, g = mk(svg, 'g', {});
  mk(g, 'line', { x1: cx - R - e, y1: cy, x2: cx + R + e, y2: cy, stroke: C.ink, 'stroke-width': 2 });
  mk(g, 'line', { x1: cx, y1: cy + R + e, x2: cx, y2: cy - R - e, stroke: C.ink, 'stroke-width': 2 });
  mk(g, 'circle', { cx, cy, r: R, fill: 'none', stroke: CIR, 'stroke-width': 2.5 });
  if (o.A !== false) { mk(g, 'circle', { cx: cx + R, cy, r: 5, fill: C.ink }); txt(g, cx + R + 8, cy + 26, 'A', { 'font-family': 'Poppins', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); }
  txt(g, cx - 10, cy + 26, 'O', { 'font-family': 'Poppins', 'font-size': 20, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'end' });
  const arc = mk(g, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 4 });
  const xl = txt(g, 0, 0, 'x', { ...ITAL, 'font-size': 24, fill: TH, 'text-anchor': 'middle' });
  const base = mk(g, 'line', { x1: cx, y1: cy, x2: cx, y2: cy, stroke: CS, 'stroke-width': 7, 'stroke-linecap': 'round' });
  const ht = mk(g, 'line', { x1: cx, y1: cy, x2: cx, y2: cy, stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' });
  const ray = mk(g, 'line', { x1: cx, y1: cy, x2: cx + R, y2: cy, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  const p = mk(g, 'circle', { cx: cx + R, cy, r: 10, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
  const pl = txt(g, 0, 0, o.pLabel ?? 'P', { 'font-family': 'Poppins', 'font-size': 22, fill: C.ink, 'font-weight': 700, 'text-anchor': 'middle' });
  const cl = txt(g, 0, 0, o.cLabel ?? 'cos x', { ...ITAL, 'font-size': o.fs ?? 24, fill: CS, 'text-anchor': 'middle' });
  const sl = txt(g, 0, 0, o.sLabel ?? 'sin x', { ...ITAL, 'font-size': o.fs ?? 24, fill: SN });
  const u = { g, arc, xl, base, ht, ray, p, pl, cl, sl, x: 0, set(x) {
    u.x = x; const [px, py] = P(cx, cy, R, x), c = Math.cos(x), s = Math.sin(x);
    attr(ray, 'x2', f2(px)); attr(ray, 'y2', f2(py)); attr(p, 'cx', f2(px)); attr(p, 'cy', f2(py));
    attr(base, 'x2', f2(px)); attr(ht, 'x1', f2(px)); attr(ht, 'x2', f2(px)); attr(ht, 'y1', f2(cy)); attr(ht, 'y2', f2(py));
    M.hide(base, Math.abs(c) < 0.01); M.hide(ht, Math.abs(s) < 0.01);
    const ra = o.ra ?? 40; attr(arc, 'd', x > 0.02 ? arcD(cx, cy, ra, 0, x) : ''); const [lx, ly] = P(cx, cy, ra + 22, x / 2); attr(xl, 'x', f2(lx)); attr(xl, 'y', f2(ly + 8)); M.hide(xl, x < 0.3);
    const [qx, qy] = P(cx, cy, R + 28, x); attr(pl, 'x', f2(qx)); attr(pl, 'y', f2(qy + 8));
    attr(cl, 'x', f2(cx + (px - cx) / 2)); attr(cl, 'y', f2(cy + (s >= 0 ? 32 : -14))); M.hide(cl, Math.abs(c) < 0.25);
    attr(sl, 'x', f2(px + (c >= 0 ? 12 : -12))); attr(sl, 'y', f2(cy + (py - cy) / 2 + 8)); attr(sl, 'text-anchor', c >= 0 ? 'start' : 'end'); M.hide(sl, Math.abs(s) < 0.25);
  } };
  return u;
};
const wheel = (svg, r) => {
  const o = mk(svg, 'g', {}), g = mk(o, 'g', {});
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; mk(g, 'line', { x1: 0, y1: 0, x2: f2((r - 10) * Math.cos(a)), y2: f2((r - 10) * Math.sin(a)), stroke: '#C3C7D0', 'stroke-width': 2 }); }
  mk(g, 'circle', { r: r - 9, fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
  mk(g, 'circle', { r: r - 3, fill: 'none', stroke: C.ink, 'stroke-width': 9 });
  mk(g, 'circle', { r: 10, fill: C.ink });
  return { o, g, set(x, y, phi) { attr(o, 'transform', `translate(${f2(x)},${f2(y)})`); attr(g, 'transform', `rotate(${(-phi / D2R).toFixed(3)})`); } };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tL1 = T0('L1'), tV1 = T0('V1'), tS1 = T0('S1'), tS3 = T0('S3'), tO1 = T0('O1'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['VALVE HEIGHT', 'sin x', SN], ['SIDEWAYS', 'cos x', CS], ['THE TURN', 'x', TH]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'rises') - 0.05, wt('H1', 'swings') - 0.05, wt('H1', 'swings') + 0.5];

/* ---------- H: the valve's height and sideways distance ---------- */
const hs = $('#hS'), HX = 392, HY = 300, HR = 150;
mk(hs, 'line', { x1: HX - HR - 40, y1: HY, x2: HX + HR + 40, y2: HY, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hW = wheel(hs, HR);
const hBase = mk(hs, 'line', { x1: HX, y1: HY, x2: HX, y2: HY, stroke: CS, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hHt = mk(hs, 'line', { x1: HX, y1: HY, x2: HX, y2: HY, stroke: SN, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hV = mk(hs, 'circle', { r: 10, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const hA0 = tMorph + 0.3, hAng = t => 0.35 + 0.62 * Math.max(0, t - hA0);

/* ---------- D: definition ---------- */
$('#dF0').innerHTML = K(`P = (${cs('a')},\\ ${sn('b')})`);
$('#dF1').innerHTML = K(`${cs('\\cos')}\\ ${th('x')} = ${cs('a')}`) + '<span style="font:500 24px Poppins;color:var(--mute);margin-left:24px">the x coordinate of P</span>';
$('#dF2').innerHTML = K(`${sn('\\sin')}\\ ${th('x')} = ${sn('b')}`) + '<span style="font:500 24px Poppins;color:var(--mute);margin-left:24px">the y coordinate of P</span>';
const dU = UCS($('#dS'), 392, 292, 180, { pLabel: 'P(a, b)', cLabel: 'a = cos x', sLabel: 'b = sin x', fs: 22 }); dU.set(50 * D2R);
const dX = 50 * D2R;

/* ---------- L: live values ---------- */
const lU = UCS($('#lS'), 392, 300, 190);
const LR = [['0', 1, 0], ['π/2', 0, 1], ['π', -1, 0], ['3π/2', 0, -1], ['2π', 1, 0]];
$('#lRows').innerHTML = LR.map(([x, c, s], i) => `<div class="vt" id="lr${i}" style="top:${210 + i * 72}px"><div class="th" style="left:20px">${x}</div><div class="cs" style="left:300px">${c}</div><div class="sn" style="left:520px">${s}</div></div>`).join('');
const tLr = [wt('L2', 'Cos'), wt('L3', 'Cos'), wt('L4', 'Cos'), wt('L5', 'Cos'), wt('L5', 'back')];
const lX = M.track(0, [[T0('L1') + 0.4, 0.7], [wt('L2', 'zero') - 0.4, 0], [wt('L3', 'pi') - 0.4, Math.PI / 2], [wt('L4', 'pi') - 0.4, Math.PI], [wt('L5', 'three') - 0.4, 1.5 * Math.PI], [wt('L5', 'two', 1) - 0.4, TAU]], M.HEAVY);

/* ---------- V: where sin and cos are zero ---------- */
const VS = [[`${sn('\\sin x')} = 0 \\iff P\\ \\text{on the } x\\text{-axis}`, 'no height: at A or at the far left'],
  [`${sn('\\sin x')} = 0 \\iff ${th('x')} = n\\pi, \\ n \\in \\mathbb{Z}`, '0, π, 2π, ... and -π, -2π, ...'],
  [`${cs('\\cos x')} = 0 \\iff P\\ \\text{on the } y\\text{-axis}`, 'no sideways distance: top or bottom'],
  [`${cs('\\cos x')} = 0 \\iff ${th('x')} = (2n+1)\\pi/2`, 'odd multiples of π/2']];
$('#vSt').innerHTML = VS.map(([f, w], i) => `<div class="pf" id="vs${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tVs = [wt('V2', 'Step'), wt('V3', 'Step'), wt('V4', 'Step'), T0('V5')];
const vsv = $('#vS'), VX = 392, VY = 290, VR = 170;
const vU = UCS(vsv, VX, VY, VR, { ext: 50 });
const ring = (x, y, col) => { const g = mk(mk(vsv, 'g', {}), 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 20, fill: 'none', stroke: col, 'stroke-width': 4 }); return g; };
const vR0 = [ring(VX + VR, VY, SN), ring(VX - VR, VY, SN)], vR1 = [ring(VX, VY - VR, CS), ring(VX, VY + VR, CS)];
const vT0 = [txt(vsv, VX + VR + 10, VY - 28, '0, 2π, ...', { 'font-size': 18, fill: SN, 'font-weight': 600 }), txt(vsv, VX - VR - 10, VY - 28, 'π, -π, ...', { 'text-anchor': 'end', 'font-size': 18, fill: SN, 'font-weight': 600 })];
const vT1 = [txt(vsv, VX + 30, VY - VR - 22, 'π/2, 5π/2, ...', { 'font-size': 18, fill: CS, 'font-weight': 600 }), txt(vsv, VX + 30, VY + VR + 36, '3π/2, -π/2, ...', { 'font-size': 18, fill: CS, 'font-weight': 600 })];
const vX = M.track(0.8, [[tVs[0] + 0.2, 0], [wt('V2', 'far') - 0.2, Math.PI], [tVs[2] + 0.2, Math.PI / 2], [wt('V4', 'bottom') - 0.2, 1.5 * Math.PI], [tVs[3] + 0.2, 1.5 * Math.PI]], M.HEAVY);

/* ---------- S: cos vs sin ---------- */
const sC = UCS($('#scS'), 392, 254, 160, { ext: 40 }); sC.set(60 * D2R); attr(sC.ht, 'opacity', '0.25'); M.hide(sC.sl, true);
$('#scF').innerHTML = K(`${cs('\\cos 60^\\circ')} = 1/2`);
const sS = UCS($('#ssS'), 260, 280, 160, { ext: 40 }); sS.set(30 * D2R); attr(sS.base, 'opacity', '0.25');
$('#ssF').innerHTML = K(`${sn('\\sin 30^\\circ')} = 1/2`);
const avD = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Cos goes left and right. Sin goes up and down.' });
const th1 = PUC.think($('#th1'), { q: 'At x = π/2, which one is zero: sine or cosine?', opts: ['Sine', 'Cosine'], right: 1, why: 'P is at the very top (0, 1): no sideways distance, so cos π/2 = 0 and sin π/2 = 1.' });

/* ---------- O: the other four ---------- */
const OS = [[`${COSEC}\\, x = 1 \\,/\\, ${sn('\\sin x')}`, 'needs sin x ≠ 0, so x ≠ nπ'], [`\\sec x = 1 \\,/\\, ${cs('\\cos x')}`, 'needs cos x ≠ 0, so x ≠ (2n+1)π/2'],
  [`\\tan x = ${sn('\\sin x')} \\,/\\, ${cs('\\cos x')}`, 'needs cos x ≠ 0, so x ≠ (2n+1)π/2'], [`\\cot x = ${cs('\\cos x')} \\,/\\, ${sn('\\sin x')}`, 'needs sin x ≠ 0, so x ≠ nπ']];
$('#oSt').innerHTML = OS.map(([f, w], i) => `<div class="pf" id="os${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tOs = [wt('O2', 'Cosecant'), wt('O2', 'Secant'), wt('O3', 'Tangent'), wt('O3', 'Cotangent')], tOw = wt('O4', 'tan');
const oU = UCS($('#oS'), 210, 280, 140, { ext: 34, fs: 20 });
const SIX = [['sin', SN], ['cos', CS], ['tan', C.ink], ['cot', C.ink], ['sec', C.ink], ['cosec', C.ink]];
$('#oSix').innerHTML = SIX.map(([n, col], i) => `<div class="six" id="o6${i}" style="top:${84 + i * 64}px"><b style="color:${col}">${n} x</b><span></span></div>`).join('');
const oXk = M.track(0.6, [[T0('O3') - 0.3, 1.2], [wt('O4', 'Division') - 0.2, Math.PI / 2]], M.HEAVY);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`P = (${cs('\\cos x')},\\ ${sn('\\sin x')})`);
const th2 = PUC.think($('#th2'), { q: 'Is tan(π/2) defined?', opts: ['Yes', 'No'], right: 1, why: 'tan = sin / cos, and cos(π/2) = 0. Division by zero is not allowed.' });

/* ---------- W: all six at pi/4 ---------- */
$('#wq').innerHTML = `Find all six trigonometric functions at ${K(th('x = \\pi/4'))}.`;
const wsol = PUC.solution($('#wl'), [['P is on the line y = x, so a = b'], [K(`${cs('a')}^2 + ${sn('b')}^2 = 1 \\;\\Rightarrow\\; 2${cs('a')}^2 = 1`)], [K(`${cs('a')} = ${sn('b')} = 1/\\sqrt{2}`)],
  [K(`${cs('\\cos(\\pi/4)')} = ${sn('\\sin(\\pi/4)')} = 1/\\sqrt{2}`)], [K(`\\tan = \\cot = 1, \\quad \\sec = ${COSEC} = \\sqrt{2}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 84 });
$('#wl .lbl').style.top = '30px';
const wsv = $('#wS'), WX = 392, WY = 300, WR = 180;
const wLn = mk(wsv, 'line', { x1: WX - 230, y1: WY + 230, x2: WX + 220, y2: WY - 220, stroke: C.mute, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
const wLL = txt(wsv, WX + 206, WY - 226, 'y = x', { 'font-size': 20, fill: C.mute, 'font-weight': 600, 'text-anchor': 'end' });
const wU = UCS(wsv, WX, WY, WR, { cLabel: 'a', sLabel: 'b' }); wU.set(Math.PI / 4);
const wPill = mk(mk(wsv, 'g', {}), 'g', {}); txt(wPill, 36, 548, 'a = b = 1/√2 ≈ 0.707', { 'font-size': 24, fill: C.ink, 'font-weight': 600 });
const tW = [wt('W2', 'Step'), wt('W3', 'Step'), wt('W3', 'root'), wt('W4', 'Step'), wt('W5', 'Step')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${COSEC}\\, x = \\sin^{-1} x`), right: K(`${COSEC}\\, x = \\dfrac{1}{${sn('\\sin x')}}`) + '&nbsp; a reciprocal', y1: 160 });
const ts = $('#tS'); const tG = mk(mk(ts, 'g', {}), 'g', {});
txt(tG, 40, 110, 'sin 30° = 1/2', { 'font-size': 26, fill: SN, 'font-weight': 600 }); txt(tG, 40, 160, 'cosec 30° = 2', { 'font-size': 26, fill: C.ink, 'font-weight': 600 }); txt(tG, 40, 204, 'flip the fraction', { 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Find the trigonometric functions at a given angle, or from a point on the unit circle.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `The terminal side of angle ${K(th('x'))} meets the unit circle at ${K(`P\\left(${cs('-3/5')},\\ ${sn('-4/5')}\\right)`)}. Find ${K(`\\cot x + ${COSEC}\\, x`)}.`,
  opts: [K('-1/2'), K('1/2'), K('-2'), K('2')], right: 0, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`${cs('\\cos x = -3/5')},\\ ${sn('\\sin x = -4/5')}`)], [K(`\\cot x = ${cs('\\cos x')}/${sn('\\sin x')} = 3/4`)], [K(`${COSEC}\\, x = 1/${sn('\\sin x')} = -5/4`)], [K(`3/4 - 5/4 = -1/2`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'So'), wt('A3', 'Cot'), wt('A4', 'Cosec'), wt('A4', 'Three')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · the six trigonometric functions', y0: 98, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`P = (${cs('\\cos x')},\\ ${sn('\\sin x')}) \\ \\text{on the unit circle}`),
    K(`\\tan x = ${sn('\\sin x')} / ${cs('\\cos x')} \\qquad \\cot x = ${cs('\\cos x')} / ${sn('\\sin x')}`),
    K(`\\sec x = 1 / ${cs('\\cos x')} \\qquad ${COSEC}\\, x = 1 / ${sn('\\sin x')}`),
    K(`${sn('\\sin x')} = 0 \\iff x = n\\pi \\qquad ${cs('\\cos x')} = 0 \\iff x = (2n+1)\\pi/2`),
    'cos 0 = 1, sin 0 = 0 · cos π/2 = 0, sin π/2 = 1'] });
const YQ = ['What are cos π and sin π?', 'Why is sec(π/2) not defined?', 'P = (0.6, 0.8). What is tan x?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 28', topic: 'Above or below, left or right: which signs in each quadrant?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('D3', 'cos') - 0.2, 1.08, 1368, 560], [T0('D4') + 0.6, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = hAng(t); hW.set(HX, HY, a); const [vx, vy] = P(HX, HY, HR - 14, a);
    attr(hV, 'cx', f2(vx)); attr(hV, 'cy', f2(vy)); attr(hBase, 'x2', f2(vx)); attr(hHt, 'x1', f2(vx)); attr(hHt, 'x2', f2(vx)); attr(hHt, 'y2', f2(vy));
    const sh = t >= wt('H2', 'height') - 0.1; M.hide(hBase, !sh); M.hide(hHt, !sh);
    M.setT($('#hHt span'), fv(Math.sin(a))); M.setT($('#hSd span'), fv(Math.cos(a)));
    M.vis($('#hHt'), t, wt('H2', 'height'), 1e9, { dy: 10 }); M.vis($('#hSd'), t, wt('H2', 'side'), 1e9, { dy: 10 });
    M.vis($('#hP'), t, wt('H4', 'how') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'sine') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#dF0'), t, wt('D2', 'coordinates') - 0.1, 0.7); PUC.write($('#dF1'), t, wt('D3', 'cos') - 0.1, 0.9); PUC.write($('#dF2'), t, wt('D3', 'sin') - 0.1, 0.9);
    M.vis($('#dP'), t, wt('D4', 'cosine') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, T0('D2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const x = dX * M.io((t - wt('D2', 'Turn')) / 1); dU.set(x);
    [dU.ray, dU.p, dU.arc, dU.xl].forEach(e => M.vis(e, t, wt('D2', 'Turn') - 0.1, 1e9, { dy: 0, fade: 0.15 })); M.vis(dU.pl, t, wt('D2', 'point'), 1e9, { dy: 0 });
    M.vis(dU.base, t, wt('D3', 'cos'), 1e9, { dy: 0, fade: 0.2 }); M.vis(dU.cl, t, wt('D3', 'cos') + 0.2, 1e9, { dy: 0 });
    M.vis(dU.ht, t, wt('D3', 'sin'), 1e9, { dy: 0, fade: 0.2 }); M.vis(dU.sl, t, wt('D3', 'sin') + 0.2, 1e9, { dy: 0 });
    if (Math.abs(Math.cos(x)) < 0.01) M.hide(dU.base, true);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tV1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('V1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const x = lX(t); lU.set(x);
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.setT($('#lx'), 'x = ' + fv(x)); M.setT($('#lc'), fv(Math.cos(x))); M.setT($('#ls'), fv(Math.sin(x)));
    LR.forEach((_, i) => M.vis($('#lr' + i), t, tLr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tS1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('S1');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o });
    VS.forEach((_, i) => { const el = $('#vs' + i); M.vis(el.querySelector('.n'), t, tVs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tVs[i], 0.7); M.vis(el.querySelector('.why'), t, tVs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tVs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#vHi'); M.vis(hb, t, tVs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#vr'), t, tV1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vU.set(vX(t));
    vR0.forEach((g, i) => M.vis(g, t, i ? wt('V2', 'far') : wt('V2', 'A', 2), 1e9, { dy: 0, sc: 0.5, sp: M.POP })); vT0.forEach(e => M.vis(e, t, tVs[1] + 0.3, 1e9, { dy: 0 }));
    vR1.forEach((g, i) => M.vis(g, t, i ? wt('V4', 'bottom') : wt('V4', 'top'), 1e9, { dy: 0, sc: 0.5, sp: M.POP })); vT1.forEach(e => M.vis(e, t, wt('V4', 'odd'), 1e9, { dy: 0 }));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tO1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sc'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o }); PUC.write($('#scF'), t, wt('S1', 'cos') - 0.1, 0.7);
    M.vis($('#ss'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#ssF'), t, wt('S2', 'sin') - 0.1, 0.7);
    avD(t, T1('S2') - 0.2, out);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('O1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'which') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'very') });
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tT + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    M.vis($('#ol'), t, tO1 + 0.05, 1e9, { dx: -60, dy: 0 });
    OS.forEach((_, i) => { const el = $('#os' + i); M.vis(el.querySelector('.n'), t, tOs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tOs[i], 0.7); M.vis(el.querySelector('.why'), t, tOw + i * 0.3, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#or'), t, tO1 + 0.25, 1e9, { dx: 60, dy: 0 });
    let x = oXk(t); const exact = Math.abs(x - Math.PI / 2) < 0.002; if (exact) x = Math.PI / 2; oU.set(x);
    const s = Math.sin(x), c = exact ? 0 : Math.cos(x), V = [s, c, exact ? null : s / c, c / s, exact ? null : 1 / c, 1 / s];
    V.forEach((v, i) => { const sp = $('#o6' + i + ' span'); M.setT(sp, v === null ? 'not defined' : fv(v, 3)); sp.style.color = v === null ? C.red : C.ink; M.vis($('#o6' + i), t, tO1 + 0.4 + i * 0.08, 1e9, { dx: -12, dy: 0 }); });
    M.setT($('#oX span'), exact ? 'π/2' : fv(x)); M.vis($('#oX'), t, tO1 + 0.5, 1e9, { dy: 10 });
  }

  /* statement */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'cos') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'sin') - 0.1, 0.8);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) { M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o }); th2(t, { tin: tZ1, tOpts: wt('Z1', 'defined') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Tan') }); }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Find') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, wt('W1', 'Find') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wLn, t, wt('W2', 'line') - 0.2, 0.7); M.vis(wLL, t, wt('W2', 'line'), 1e9, { dy: 0 });
    M.vis(wPill, t, wt('W3', 'root'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'one') - 0.2, tRight: wt('X3', 'reciprocal') - 0.3 });
    M.vis(tG, t, wt('X3', 'reciprocal'), 1e9, { dy: 0, fade: 0.25 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'find') });
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
