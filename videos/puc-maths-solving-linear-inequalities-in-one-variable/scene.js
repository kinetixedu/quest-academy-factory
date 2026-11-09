// PUC Maths Ep 50: Solving linear inequalities in one variable (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: x violet, first number violet, second number blue, multiplier k teal, the flipped arrow coral (accent)
const XC = C.violet, RC = C.ac, BC = '#2F6FEB', KC = C.teal;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, kc = s => `\\textcolor{${KC}}{${s}}`;
const ok = s => `<span style="color:var(--ok);font-weight:600">${s}</span>`, why = s => `<span class="why2">&nbsp; ${s}</span>`;
const NL = (svg, o) => {
  const X = v => o.x0 + (v - o.v0) * (o.x1 - o.x0) / (o.v1 - o.v0), y = o.y; X.g = svg = mk(svg, 'g', {});
  mk(svg, 'line', { x1: X(o.v0) - 30, y1: y, x2: X(o.v1) + 30, y2: y, stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'path', { d: `M${X(o.v1) + 34},${y} l-14,-8 v16 z`, fill: C.ink }); mk(svg, 'path', { d: `M${X(o.v0) - 34},${y} l14,-8 v16 z`, fill: C.ink });
  for (let v = o.v0; v <= o.v1; v++) { mk(svg, 'line', { x1: X(v), y1: y - 9, x2: X(v), y2: y + 9, stroke: C.ink, 'stroke-width': 2 }); if ((v - o.v0) % (o.lab || 1) === 0) txt(svg, X(v), y + 42, v, { 'text-anchor': 'middle', 'font-size': o.fs || 20, fill: C.ink, 'font-weight': 600 }); }
  return X;
};
const dotG = (svg, x, y, r, fill, stroke) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': 4 }); return g; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tR1 = T0('R1'), tM1 = T0('M1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tD1 = T0('D1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TRUE', '2 < 5'], ['MINUS SIGN ON BOTH', '-2 < -5 ?'], ['WHICH IS SMALLER?', '-2 or -5']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v.replace('<', '&lt;')}</div></div>`).join('');
const tLs = [wt('H1', 'Two'), wt('H2', 'minus'), wt('H2', 'less')];

/* ---------- H: freezer thermometer ---------- */
const hs = $('#hS'), HY = v => 140 + (2 - v) * 38;
mk(hs, 'rect', { x: 150, y: HY(2) - 20, width: 40, height: HY(-8) - HY(2) + 40, rx: 20, fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
for (let v = 2; v >= -8; v--) { mk(hs, 'line', { x1: 190, y1: HY(v), x2: 204, y2: HY(v), stroke: C.ink, 'stroke-width': 2 }); txt(hs, 140, HY(v) + 6, v, { 'text-anchor': 'end', fill: v === 0 ? C.ink : C.mute, 'font-weight': 600 }); }
txt(hs, 170, 100, '°C', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const hM = [[-2, XC, '-2 °C'], [-5, BC, '-5 °C · colder']].map(([v, col, l]) => { const g = mk(hs, 'g', {}); mk(g, 'circle', { cx: 170, cy: HY(v), r: 13, fill: col }); mk(g, 'line', { x1: 204, y1: HY(v), x2: 236, y2: HY(v), stroke: col, 'stroke-width': 3 }); txt(g, 244, HY(v) + 7, l, { fill: col, 'font-weight': 600, 'font-size': 22 }); return g; });
const hF = [K(`${xc('2')} < ${bc('5')}`), K(`${xc('-2')} \\;\\,?\\;\\, {${bc('-5')}}`), K(`${xc('-2')} ${rc('>')} ${bc('-5')}`)];
hF.forEach((f, i) => { $('#hf' + i).innerHTML = f; });

/* ---------- B: rules + staircase ---------- */
const chip = (s, col) => `<span class="pillp" style="position:static;height:42px;font-size:20px;background:${col === 'ok' ? 'var(--okBg)' : 'var(--redBg)'};color:${col === 'ok' ? '#1F6B3F' : 'var(--red)'}">${s}</span>`;
const BRW = [['RULE 1', 'Add or take away the same number', chip('arrow stays', 'ok')], ['RULE 2', 'Multiply or divide by a positive', chip('arrow stays', 'ok')], ['ONE NEW RULE', 'Multiply or divide by a negative', chip('?', 'bad')]];
$('#bR').innerHTML = BRW.map(([n, s, c], i) => `<div class="rr${i === 2 ? ' gh' : ''}" id="br${i}" style="top:${204 + i * 120}px"><div class="rn">${n}</div><div class="rt">${s}</div><div class="rc">${c}</div></div>`).join('');
const bs = $('#bS'), SX = s => 40 + s * 48, SY = s => 520 - s * 46;
let sp = `M40,540 V${SY(0)}`; for (let i = 0; i < 8; i++) { sp += ` H${SX(i + 1)}`; if (i < 7) sp += ` V${SY(i + 1)}`; } sp += ' V540 Z';
mk(bs, 'path', { d: sp, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const person = (col) => { const pg = mk(bs, 'g', {}), g = mk(pg, 'g', {}); mk(g, 'circle', { cx: 0, cy: -46, r: 11, fill: col }); mk(g, 'path', { d: 'M-17,0 Q-17,-30 0,-30 Q17,-30 17,0 Z', fill: col }); return { pg, g }; };
const pA = person(XC), pB = person(BC);
const placeP = (p, s) => { const i = Math.min(7, Math.floor(s)), f = s - i; attr(p.pg, 'transform', `translate(${(SX(s) + 24).toFixed(1)},${(SY(i) - 10 * Math.sin(Math.PI * f)).toFixed(1)})`); };
const BCL = [K(`${xc('7')} < ${bc('10')}`), K(`${xc('7')} - 4 < ${bc('10')} - 4`), K(`${xc('3')} < ${bc('6')}`) + ' ' + ok('true'), K(`${xc('2')} < ${bc('5')}`), K(`${xc('2')} \\times 2 < ${bc('5')} \\times 2`), K(`${xc('4')} < ${bc('10')}`) + ' ' + ok('true')];
$('#bC').innerHTML = BCL.map((f, i) => `<div class="cl" id="bc${i}" style="top:${[96, 166, 236, 336, 406, 476][i]}px">${f}</div>`).join('');
const tBc = [wt('B3', 'Seven'), wt('B3', 'Take'), wt('B3', 'Three'), wt('B5', 'Two'), wt('B5', 'Double') + 0.4, wt('B5', 'four')];
tBc[4] = Math.min(wt('B5', 'becomes'), tBc[3] + 0.6);
const tClimb = wt('B2', 'climb');

/* ---------- M: multiplier k ---------- */
const ms = $('#mS'), MX = NL(ms, { x0: 72, x1: 712, y: 300, v0: -6, v1: 6, lab: 1, fs: 18 });
const mMir = mk(ms, 'line', { x1: MX(0), y1: 150, x2: MX(0), y2: 400, stroke: KC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const mMirT = txt(ms, MX(0), 138, 'mirror at 0', { 'text-anchor': 'middle', fill: KC, 'font-weight': 600, 'font-size': 18 });
const mG = [2, 5].map(v => mk(ms, 'circle', { cx: MX(v), cy: 300, r: 14, fill: '#fff', stroke: v === 2 ? XC : BC, 'stroke-width': 3, 'stroke-dasharray': '5 4' }));
const mDA = mk(ms, 'circle', { cx: MX(2), cy: 300, r: 15, fill: XC }), mDB = mk(ms, 'circle', { cx: MX(5), cy: 300, r: 15, fill: BC });
const mLA = txt(ms, MX(2), 262, '2', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 22 }), mLB = txt(ms, MX(5), 230, '5', { 'text-anchor': 'middle', fill: BC, 'font-weight': 600, 'font-size': 22 });
const tK0 = wt('M2', 'slide'), tKe = T1('M3');
const kOf = t => 1 - 2 * M.io((t - tK0) / Math.max(1, tKe - tK0));
const fmt = v => Math.abs(v - Math.round(v)) < 0.02 ? String(Math.round(v)) : v.toFixed(1);
let mLast = '';

/* ---------- K: divide by +2 vs -2 ---------- */
const KP = [K(`${xc('6')} < ${bc('10')}`), K(`${xc('6')} \\div 2 < ${bc('10')} \\div 2`), K(`${xc('3')} < ${bc('5')}`)];
const KN = [K(`${xc('6')} < ${bc('10')}`), K(`${xc('6')} \\div (-2) \\;\\,?\\;\\, ${bc('10')} \\div (-2)`), K(`${xc('-3')} ${rc('>')} ${bc('-5')}`)];
$('#kpC').innerHTML = KP.map((f, i) => `<div class="pc" id="kp${i}" style="top:${80 + i * 80}px">${f}</div>`).join('');
$('#knC').innerHTML = KN.map((f, i) => `<div class="pc" id="kn${i}" style="top:${80 + i * 80}px">${f}</div>`).join('');
const kpX = NL($('#kpS'), { x0: 72, x1: 712, y: 390, v0: -6, v1: 6, lab: 1, fs: 18 }), knX = NL($('#knS'), { x0: 72, x1: 712, y: 390, v0: -6, v1: 6, lab: 1, fs: 18 });
const kpD = [dotG($('#kpS'), kpX(3), 390, 14, XC), dotG($('#kpS'), kpX(5), 390, 14, BC)], knD = [dotG($('#knS'), knX(-3), 390, 14, XC), dotG($('#knS'), knX(-5), 390, 14, BC)];
const th1 = PUC.think($('#th1'), { q: `${K(`-3${xc('x')} > 12`)}: divide by -3. Which is right?`, opts: [K('x > -4'), K('x < -4')], right: 1, why: `Divided by a negative, so the arrow flips. Check x = -5: 15 > 12.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${xc('a')} < ${bc('b')} \\;\\Rightarrow\\; -${xc('a')} ${rc('>')} -${bc('b')}`);

/* ---------- D: solve 4x + 3 < 6x + 7 ---------- */
$('#dq').innerHTML = K(`4${xc('x')} + 3 < 6${xc('x')} + 7`);
const dsol = PUC.solution($('#dl'), [
  [K(`-2${xc('x')} + 3 < 7`) + why('take away 6x')],
  [K(`-2${xc('x')} < 4`) + why('take away 3')],
  [K(`${xc('x')} ${rc('>')} -2`) + why('divide by -2: flip')],
  [K(`${xc('x')} \\in (-2,\\ \\infty)`)],
  [`Check x = 0: &nbsp;${K('3 < 7')} &nbsp;${ok('true')}`]], { label: 'SOLVE · STEP BY STEP', y0: 168, dy: 80 });
$('#dl .lbl').style.top = '30px';
const tD = [wt('D2', 'Take'), wt('D3', 'Take'), wt('D4', 'Divide'), wt('D5', 'Draw'), wt('D6', 'Check')];
const ds = $('#dS'), DX = NL(ds, { x0: 72, x1: 712, y: 320, v0: -6, v1: 4, lab: 1 });
const dRay = mk(ds, 'line', { x1: DX(-2), y1: 320, x2: 746, y2: 320, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const dO = mk(ds, 'circle', { cx: DX(-2), cy: 320, r: 15, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const dLab = txt(ds, DX(-2), 278, '-2 not included', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 20 });
const dChk = dotG(ds, DX(0), 320, 12, C.ok, '#fff');

/* ---------- W: x/3 > x/2 + 1 ---------- */
$('#wq').innerHTML = K(`\\dfrac{${xc('x')}}{3} > \\dfrac{${xc('x')}}{2} + 1`);
const wsol = PUC.solution($('#wl'), [
  [K(`2${xc('x')} > 3${xc('x')} + 6`) + why('times 6, positive')],
  [K(`-${xc('x')} > 6`) + why('take away 3x')],
  [K(`${xc('x')} ${rc('<')} -6`) + why('times -1: flip')],
  [K(`${xc('x')} \\in (-\\infty,\\ -6)`)]], { label: 'WORKED EXAMPLE · NCERT EX 5.1 Q10', y0: 200, dy: 86 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '70px';
const tWs = [wt('W3', 'Multiply'), wt('W4', 'Take'), wt('W5', 'Multiply'), wt('W6', 'every')];
const wsv = $('#wS'), WX = NL(wsv, { x0: 72, x1: 712, y: 320, v0: -14, v1: 0, lab: 2 });
const wRay = mk(wsv, 'line', { x1: WX(-6), y1: 320, x2: 38, y2: 320, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const wO = mk(wsv, 'circle', { cx: WX(-6), cy: 320, r: 15, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const wLab = txt(wsv, WX(-6), 278, '-6 not included', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 20 });
const wChk = dotG(wsv, WX(-12), 320, 12, C.ok, '#fff');
$('#wP').innerHTML = `Test x = -12: &nbsp;${K('-4 > -5')} &nbsp;true`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`3${xc('x')} > -6 \\;\\Rightarrow\\; ${xc('x')} < -2`), right: K(`3${xc('x')} > -6 \\;\\Rightarrow\\; ${xc('x')} > -2`) + '&nbsp; divided by +3: no flip' });
const ts = $('#tS'), TX = NL(ts, { x0: 48, x1: 482, y: 170, v0: -5, v1: 2, lab: 1, fs: 18 });
const tWr = mk(ts, 'line', { x1: TX(-2), y1: 170, x2: 20, y2: 170, stroke: C.red, 'stroke-width': 8, 'stroke-dasharray': '10 8' });
const tRt = mk(ts, 'line', { x1: TX(-2), y1: 170, x2: TX(2) + 22, y2: 170, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const tO = mk(ts, 'circle', { cx: TX(-2), cy: 170, r: 13, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const where = PUC.where($('#wa'), { on: [], type: 'Solve, then pick the right interval. Often one step inside a bigger problem.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`5 - 2${xc('x')} \\ge ${xc('x')} - 10`)} &nbsp;and&nbsp; ${K(`4 - 3${xc('x')} < 13`)}<br>How many integers x make both true?`,
  opts: ['6', '7', '8', '9'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`15 \\ge 3${xc('x')} \\Rightarrow ${xc('x')} \\le 5`)], [K(`-3${xc('x')} < 9`)], [K(`${xc('x')} ${rc('>')} -3`) + '&nbsp; (flip)'], [K(`-3 < ${xc('x')} \\le 5`)], [K(`${xc('x')} = -2, \\dots, 5 \\Rightarrow 8`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Bring'), wt('A3', 'Take'), wt('A3', 'Divide'), wt('A4', 'Both'), wt('A4', 'Eight')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · solving linear inequalities', y0: 96, dy: 74, txt: [1, 1, 1, 0, 0],
  lines: ['<b>Solve</b>: find every x that keeps the inequality true',
    '<b>Rule 1</b>: add or take away the same number · arrow stays',
    '<b>Rule 2</b>: multiply or divide by a positive · arrow stays',
    K(`\\text{By a negative: flip} \\qquad ${xc('a')} < ${bc('b')} \\Rightarrow -${xc('a')} ${rc('>')} -${bc('b')}`),
    K(`-2${xc('x')} < 4 \\;\\Rightarrow\\; ${xc('x')} ${rc('>')} -2`)] });
const YQ = ['Which two moves never change the arrow?', 'Solve: -x < 4', 'Why does multiplying by -1 flip the order on a number line?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q.replace('<', '&lt;')}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 51', topic: 'A line splits a field in two. Which side wins? Inequalities in Two Variables', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tK0 - 0.2, 1.05, 960, 560], [T0('M5') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tR1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('R1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#hf0'), t, tMorph + 0.4, 0.5); PUC.write($('#hf1'), t, tMorph + 0.9, 0.6);
    M.vis(hM[1], t, wt('H4', 'Minus') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(hM[0], t, wt('H4', 'two') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    PUC.write($('#hf2'), t, wt('H4', 'arrow') - 0.1, 0.6);
    const fl = M.io((t - wt('H4', 'flip')) / 0.3) * (1 - M.io((t - wt('H4', 'flip') - 0.8) / 0.4)); $('#hf2').style.background = mix('#FFFFFF', C.ac2, fl); $('#hf2').style.borderRadius = '12px';
    M.vis($('#hP'), t, wt('H4', 'flip'), 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'Why') - 0.1, 1e9, POP);
  }

  /* B: rules */
  const bOn = t >= tR1 - 0.1 && t < tM1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('M1');
    M.vis($('#bl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.rise($('#rT'), t, tR1 + 0.15, { st: 0.05, sp: M.HEAVY });
    M.vis($('#br0'), t, T0('B1') - 0.1, 1e9, { dy: 14 }); M.vis($('#br1'), t, T0('B4') - 0.1, 1e9, { dy: 14 }); M.vis($('#br2'), t, wt('R2', 'new') - 0.1, 1e9, { dy: 14 });
    M.vis($('#br0 .rc'), t, wt('B1', 'stays') - 0.1, 1e9, POP); M.vis($('#br1 .rc'), t, wt('B4', 'stays') - 0.1, 1e9, POP); M.vis($('#br2 .rc'), t, wt('R2', 'rule') - 0.1, 1e9, POP);
    M.vis($('#br'), t, T0('B2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - tClimb) / 1.4); placeP(pA, 1 + 3 * u); placeP(pB, 3 + 3 * u);
    M.vis(pA.g, t, T0('B2') + 0.3, 1e9, { dy: -20 }); M.vis(pB.g, t, T0('B2') + 0.4, 1e9, { dy: -20 });
    BCL.forEach((_, i) => PUC.write($('#bc' + i), t, tBc[i], 0.5));
  }

  /* M: live k */
  const mOn = t >= tM1 - 0.1 && t < tK1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('K1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const k = kOf(t), a = 2 * k, b = 5 * k;
    M.setT($('#mKv'), (k < -0.004 ? '-' : '') + Math.abs(k).toFixed(2));
    M.setT($('#mA'), `2 × k = ${fmt(a)}`); M.setT($('#mB'), `5 × k = ${fmt(b)}`);
    $('#mA').style.color = XC; $('#mB').style.color = BC;
    const sym = k > 0.004 ? '<' : k < -0.004 ? rc('>') : '=';
    const key = fmt(a) + sym + fmt(b); if (key !== mLast) { mLast = key; $('#mCmp').innerHTML = K(`${xc(fmt(a))} ${sym} ${bc(fmt(b))}`); }
    M.vis($('#mK'), t, tM1 + 0.3, 1e9, { dy: 12 }); M.vis($('#mA'), t, tM1 + 0.5, 1e9, { dy: 10 }); M.vis($('#mB'), t, tM1 + 0.6, 1e9, { dy: 10 });
    M.vis($('#mCmp'), t, tM1 + 0.7, 1e9, { dy: 14 });
    M.vis($('#mP'), t, wt('M6', 'negative') - 0.1, 1e9, POP);
    M.vis($('#mr'), t, tM1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(mMir, t, wt('M2', 'number') - 0.1, 1e9, { dy: 0 }); M.vis(mMirT, t, wt('M2', 'number'), 1e9, { dy: 0 });
    mG.forEach(g => M.vis(g, t, tK0 + 0.2, 1e9, { dy: 0, fade: 0.3 }));
    attr(mDA, 'cx', MX(a).toFixed(1)); attr(mDB, 'cx', MX(b).toFixed(1)); attr(mLA, 'x', MX(a).toFixed(1)); attr(mLB, 'x', MX(b).toFixed(1));
    M.setT(mLA, fmt(a)); M.setT(mLB, fmt(b));
    M.vis(mDA, t, tM1 + 0.6, 1e9, DOT); M.vis(mDB, t, tM1 + 0.7, 1e9, DOT); M.vis(mLA, t, tM1 + 0.8, 1e9, { dy: 0 }); M.vis(mLB, t, tM1 + 0.9, 1e9, { dy: 0 });
    M.vis($('#mP2'), t, wt('M4', 'was') - 0.1, 1e9, POP);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kp0'), t, wt('K1', 'Six') - 0.05, 0.5); PUC.write($('#kp1'), t, wt('K1', 'Divide') - 0.05, 0.6); PUC.write($('#kp2'), t, wt('K1', 'Three') - 0.05, 0.5);
    kpD.forEach((d, i) => M.vis(d, t, wt('K1', 'Three') + 0.2 + i * 0.15, 1e9, DOT)); M.vis($('#kpP'), t, wt('K1', 'stays') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kn0'), t, T0('K2') + 0.1, 0.5); PUC.write($('#kn1'), t, wt('K2', 'divide') - 0.05, 0.7); PUC.write($('#kn2'), t, wt('K2', 'greater') - 0.2, 0.5);
    knD.forEach((d, i) => M.vis(d, t, wt('K2', 'Minus') + i * 0.4, 1e9, DOT)); M.vis($('#knP'), t, wt('K2', 'flips') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'greater', 1) - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'divided') });
  }

  /* statement */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Multiply') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'flips') - 0.1, 0.8);
  }

  /* D: solve */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('W1');
    M.vis($('#dl'), t, tD1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#dq'), t, wt('D1', 'Four'), 0.8);
    dsol(t, tD1 + 0.3, tD);
    M.vis($('#dr'), t, wt('D1', 'seven') , out, { dx: 60, dy: 0, ...o });
    const fp = $('#dFl'); if (!fp._s) { fp._s = 1; fp.innerHTML = `Divide by -2: the arrow flips`; } M.vis(fp, t, wt('D4', 'flips') - 0.1, 1e9, POP);
    M.vis(dO, t, wt('D5', 'empty') - 0.1, 1e9, DOT); M.vis(dLab, t, wt('D5', 'empty'), 1e9, { dy: 0 }); M.draw(dRay, t, wt('D5', 'every') - 0.1, 0.8);
    M.vis(dChk, t, wt('D6', 'zero') - 0.1, 1e9, DOT);
    const dp = $('#dP'), dk = t >= wt('D6', 'zero') ? 2 : 1; if (dp._k !== dk) { dp._k = dk; dp.innerHTML = dk === 2 ? `x = 0 is inside: &nbsp;${K('3 < 7')} &nbsp;true` : 'Every number to the right of -2'; dp.className = 'pillp ' + (dk === 2 ? 'good' : 'ac'); }
    M.vis(dp, t, wt('D5', 'every') + 0.3, 1e9, POP);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#wq'), t, T0('W2') + 0.1, 0.9);
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wO, t, tWs[3] - 0.1, 1e9, DOT); M.vis(wLab, t, tWs[3], 1e9, { dy: 0 }); M.draw(wRay, t, tWs[3], 0.8);
    M.vis(wChk, t, wt('W6', 'Test') + 0.2, 1e9, DOT); M.vis($('#wP'), t, wt('W6', 'Test') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'decides') + 0.2;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'divide') - 0.1, tRight: tR });
    M.draw(tWr, t, wt('X2', 'write'), 0.6); tWr.style.opacity = (1 - 0.75 * M.io((t - wt('X3', 'divide')) / 0.4)).toFixed(3);
    M.vis(tO, t, wt('X2', 'write') - 0.1, 1e9, DOT); M.draw(tRt, t, tR + 0.1, 0.7);
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'type') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
