// PUC Maths Ep 18: Real-valued functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: input (x, h, C) violet, output (f(x), T, t) coral, domain blue, excluded points red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
// example temperature curve: lowest at 4 h, highest at 16 h, 0.5 degree swing (EXAMPLE FIGURES)
const TMP = h => 36.75 - 0.25 * Math.cos(2 * Math.PI * (h - 4) / 24);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tC1 = T0('C1'), tD1 = T0('D1'), tD5 = T0('D5');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['LOWEST', 'around 4 a.m.'], ['HIGHEST', 'late afternoon'], ['DAILY SHIFT', 'about 0.5 °C']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'lowest'), wt('H1', 'highest'), wt('H1', 'afternoon') + 0.4];

/* ---------- H: hourly readings ---------- */
const HR = [[4, '4 a.m.', 'LOWEST'], [10, '10 a.m.', ''], [16, '4 p.m.', 'HIGHEST'], [22, '10 p.m.', '']];
$('#hRows').innerHTML = HR.map(([h, s, n], i) => `<div class="hr" id="hr${i}" style="top:${92 + i * 100}px"><div class="hh">${s}</div><div class="ha">→</div><div class="ht">${TMP(h).toFixed(1)} °C</div><div class="hn">${n}</div></div>`).join('');

/* ---------- P: definitions + line-to-line picture ---------- */
const PR = [['REAL VALUED FUNCTION', RC, `\\text{range} \\subset \\mathbb{R}`, 'every output is a real number'], ['REAL FUNCTION', AC, `${ac('\\text{domain}')} \\subset \\mathbb{R} \\ \\text{ and }\\ ${rc('\\text{range}')} \\subset \\mathbb{R}`, 'real inputs, and real outputs']];
$('#pRows').innerHTML = PR.map(([n, col, f, w], i) => `<div class="dr" id="pd${i}" style="top:${92 + i * 172}px"><div class="dn" style="color:${col}">${n}</div><div class="df">${K(f)}</div><div class="dw">${w}</div></div>`).join('');
const ps = $('#pS'), PYo = 170, PYi = 450, PX = v => 92 + v * 120;
const pLo = mk(ps, 'line', { x1: 56, y1: PYo, x2: 728, y2: PYo, stroke: C.ink, 'stroke-width': 3 });
const pLi = mk(ps, 'line', { x1: 56, y1: PYi, x2: 728, y2: PYi, stroke: C.ink, 'stroke-width': 3 });
const pHo = mk(ps, 'line', { x1: 56, y1: PYo, x2: 728, y2: PYo, stroke: RC, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 });
const pHi = mk(ps, 'line', { x1: 56, y1: PYi, x2: 728, y2: PYi, stroke: AC, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 });
const pTo = txt(ps, 56, PYo - 30, 'OUTPUTS · REAL NUMBERS', { 'font-size': 18, fill: RC, 'font-weight': 600, 'letter-spacing': 1.5 });
const pTi = txt(ps, 56, PYi + 50, 'INPUTS · REAL NUMBERS', { 'font-size': 18, fill: AC, 'font-weight': 600, 'letter-spacing': 1.5 });
const PIN = [0.5, 1.6, 2.7, 3.8, 4.9], POU = [0.9, 0.3, 2.5, 3.7, 3.1];
const pAr = PIN.map(() => PUC.arrow(ps, C.ink2, 3, 12));
const pDi = PIN.map(v => mk(ps, 'circle', { cx: PX(v), cy: PYi, r: 11, fill: XC }));
const pDo = POU.map(v => mk(ps, 'circle', { cx: PX(v), cy: PYo, r: 11, fill: RC }));

/* ---------- L: live temperature graph ---------- */
$('#lF').innerHTML = K(`${rc('T')} = f(${xc('h')})`);
const ls = $('#lS'), GX0 = 96, GW = 640, GY0 = 500, GH = 360, LX = h => GX0 + GW * h / 24, LY = v => GY0 - GH * (v - 36.4) / 0.75;
mk(ls, 'path', { d: `M${GX0},${GY0 - GH - 20} V${GY0} H${GX0 + GW + 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[0, 4, 8, 12, 16, 20, 24].forEach(h => { mk(ls, 'line', { x1: LX(h), y1: GY0, x2: LX(h), y2: GY0 + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ls, LX(h), GY0 + 32, h, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
[36.5, 36.75, 37.0].forEach(v => { mk(ls, 'line', { x1: GX0 - 8, y1: LY(v), x2: GX0, y2: LY(v), stroke: C.ink, 'stroke-width': 2 }); txt(ls, GX0 - 12, LY(v) + 6, v.toFixed(v === 36.75 ? 2 : 1), { 'text-anchor': 'end', 'font-size': 16, fill: C.ink, 'font-weight': 600 }); });
txt(ls, GX0 + GW + 10, GY0 + 56, 'h (hours)', { 'text-anchor': 'end', 'font-size': 18, fill: XC, 'font-weight': 600 });
txt(ls, GX0 + 12, GY0 - GH - 4, 'T (°C)', { 'font-size': 18, fill: RC, 'font-weight': 600 });
const lCur = mk(ls, 'path', { d: '', fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const lVg = mk(ls, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const lHg = mk(ls, 'line', { stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const lDot = mk(ls, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const lMk = [[4, 'LOWEST · 4 A.M.', 1], [16, 'HIGHEST · 4 P.M.', -1]].map(([h, s, d]) => { const g = mk(mk(ls, 'g', {}), 'g', {}); mk(g, 'circle', { cx: LX(h), cy: LY(TMP(h)), r: 9, fill: '#fff', stroke: RC, 'stroke-width': 4 }); txt(g, LX(h) + (d > 0 ? 16 : 0), LY(TMP(h)) + (d > 0 ? 26 : -22), s, { 'text-anchor': d > 0 ? 'start' : 'middle', 'font-size': 16, fill: RC, 'font-weight': 700, 'letter-spacing': 1 }); return g; });
const tL0 = wt('L2', 'counts'), tL1e = T0('L3') - 0.1;
const hOf = t => 24 * M.clamp((t - tL0) / (tL1e - tL0));
const lPath = h1 => { let d = ''; const n = Math.max(2, Math.ceil(h1 * 4)); for (let i = 0; i <= n; i++) { const h = h1 * i / n; d += (i ? 'L' : 'M') + LX(h).toFixed(1) + ',' + LY(TMP(h)).toFixed(1); } return d; };
$('#lD').innerHTML = K(`${xc('h')} \\in ${ac('[0, 24]')} \\subset \\mathbb{R}`);
$('#lR').innerHTML = K(`${rc('T')} \\in ${rc('[36.5, 37.0]')} \\subset \\mathbb{R}`);
let lLast = '';

/* ---------- K: real function vs real valued only ---------- */
$('#kaR').innerHTML = [['6 a.m.', TMP(6)], ['4 p.m.', TMP(16)]].map(([a, b], i) => `<div class="mp" id="ka${i}" style="top:${92 + i * 100}px"><div class="mi x" style="font-family:'IBM Plex Mono'">${a}</div><div class="ma">→</div><div class="mo">${b.toFixed(1)} °C</div></div>`).join('') +
  `<div class="ck" id="kaC0" style="top:316px;background:var(--okBg);color:#1F6B3F">${M.icon('check', 22, C.ok, 3)} Inputs are numbers</div><div class="ck" id="kaC1" style="top:380px;background:var(--okBg);color:#1F6B3F">${M.icon('check', 22, C.ok, 3)} Outputs are numbers</div><div class="pillp ac" id="kaP" style="left:36px;top:470px">Real function</div>`;
$('#kbR').innerHTML = [['Ravi', '168.5'], ['Meera', '155.0'], ['Kiran', '161.2']].map(([a, b], i) => `<div class="mp" id="kb${i}" style="top:${92 + i * 100}px"><div class="mi">${a}</div><div class="ma">→</div><div class="mo">${b} cm</div></div>`).join('') +
  `<div class="ck" id="kbC0" style="top:404px;background:var(--redBg);color:var(--red)">${M.icon('x', 22, C.red, 3)} Inputs are students</div><div class="ck" id="kbC1" style="top:404px;left:330px;background:var(--okBg);color:#1F6B3F">${M.icon('check', 22, C.ok, 3)} Outputs are numbers</div><div class="pillp" id="kbP" style="left:36px;top:478px">Real valued only</div>`;
const th1 = PUC.think($('#th1'), { q: 'The height rule: student → height in cm. Is it a real function?', opts: ['Yes', 'No'], right: 1, why: 'Its range is real, but its domain is a set of students: real valued, not a real function.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ac('\\text{domain}')} \\subset \\mathbb{R} \\quad \\text{and} \\quad ${rc('\\text{range}')} \\subset \\mathbb{R}`);

/* ---------- C: Celsius to Fahrenheit ---------- */
$('#cF').innerHTML = K(`${rc('t')}(${xc('C')}) = \\dfrac{9${xc('C')}}{5} + 32`);
const csol = PUC.solution($('#cl'), [
  [K(`${rc('t')}(${xc('0')}) = 0 + 32 = ${rc('32')}`) + '&nbsp; water freezes'],
  [K(`${rc('t')}(${xc('37')}) = 66.6 + 32 = ${rc('98.6')}`) + '&nbsp; body'],
  [K(`${rc('t')}(${xc('100')}) = 180 + 32 = ${rc('212')}`) + '&nbsp; water boils']], { label: 'STEPS', y0: 236, dy: 96 });
$('#cl .sol').parentNode.querySelectorAll('.lbl')[1].style.top = '196px';
const tCs = [wt('C2', 'Put'), wt('C3', 'Put'), wt('C4', 'Put')];
const cs = $('#cS'), CX0 = 110, CW = 610, CY0 = 500, CH = 380, CXp = v => CX0 + CW * v / 100, CYp = v => CY0 - CH * v / 220;
mk(cs, 'path', { d: `M${CX0},${CY0 - CH - 20} V${CY0} H${CX0 + CW + 14}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[0, 20, 40, 60, 80, 100].forEach(v => { mk(cs, 'line', { x1: CXp(v), y1: CY0, x2: CXp(v), y2: CY0 + 8, stroke: C.ink, 'stroke-width': 2 }); txt(cs, CXp(v), CY0 + 32, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
[0, 50, 100, 150, 200].forEach(v => { mk(cs, 'line', { x1: CX0 - 8, y1: CYp(v), x2: CX0, y2: CYp(v), stroke: C.ink, 'stroke-width': 2 }); txt(cs, CX0 - 12, CYp(v) + 6, v, { 'text-anchor': 'end', 'font-size': 16, fill: C.ink, 'font-weight': 600 }); });
txt(cs, CX0 + CW + 14, CY0 + 56, 'C (°C)', { 'text-anchor': 'end', 'font-size': 18, fill: XC, 'font-weight': 600 });
txt(cs, CX0 + 12, CY0 - CH - 4, 't (°F)', { 'font-size': 18, fill: RC, 'font-weight': 600 });
const cLine = mk(cs, 'line', { x1: CXp(0), y1: CYp(32), x2: CXp(0), y2: CYp(32), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const cPts = [[0, 32, '(0, 32)'], [37, 98.6, '(37, 98.6)'], [100, 212, '(100, 212)']].map(([c, f, s], i) => { const g = mk(mk(cs, 'g', {}), 'g', {}); mk(g, 'circle', { cx: CXp(c), cy: CYp(f), r: 10, fill: RC, stroke: '#fff', 'stroke-width': 3 }); txt(g, CXp(c) + (i === 2 ? -16 : 18), CYp(f) + (i === 2 ? 34 : -12), s, { 'text-anchor': i === 2 ? 'end' : 'start', 'font-size': 18, fill: RC, 'font-weight': 600 }); return g; });
const cDot = mk(cs, 'circle', { r: 11, fill: XC, stroke: '#fff', 'stroke-width': 3 });
const tCc0 = wt('C5', 'count'), tCc1 = T1('C5') - 0.2;
let cLast = '';

/* ---------- D: domain from the rule ---------- */
$('#daF').innerHTML = K(`f(${xc('x')}) = \\dfrac{1}{${xc('x')} - 2}`);
$('#dbF').innerHTML = K(`f(${xc('x')}) = \\sqrt{${xc('x')} - 1}`);
$('#daR').innerHTML = K(`\\text{Domain} = ${ac('\\mathbb{R} - \\{2\\}')}`);
$('#dbR').innerHTML = K(`\\text{Domain} = ${ac('[1, \\infty)')}`);
const DX = v => 392 + v * 70, DY = 300;
const nline = (svg) => { mk(svg, 'line', { x1: 40, y1: DY, x2: 744, y2: DY, stroke: C.ink, 'stroke-width': 3 }); for (let v = -4; v <= 4; v++) { mk(svg, 'line', { x1: DX(v), y1: DY - 8, x2: DX(v), y2: DY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(svg, DX(v), DY + 40, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); } };
const das = $('#daS'), dbs = $('#dbS'); nline(das); nline(dbs);
const daOk = [mk(das, 'line', { y1: DY, y2: DY, stroke: AC, 'stroke-width': 10, 'stroke-linecap': 'round' }), mk(das, 'line', { y1: DY, y2: DY, stroke: AC, 'stroke-width': 10, 'stroke-linecap': 'round' })];
const daHole = mk(das, 'circle', { cx: DX(2), cy: DY, r: 12, fill: '#fff', stroke: C.red, 'stroke-width': 4 });
const daTag = txt(das, DX(2), DY - 34, 'bottom = 0', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 700 });
const dbBad = mk(dbs, 'line', { x1: 44, y1: DY, x2: DX(1), y2: DY, stroke: C.red, 'stroke-width': 6, 'stroke-dasharray': '8 8', opacity: 0.8 });
const dbOk = mk(dbs, 'line', { x1: DX(1), y1: DY, x2: DX(1), y2: DY, stroke: AC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const dbDot = mk(dbs, 'circle', { cx: DX(1), cy: DY, r: 12, fill: AC });
const dbTag = txt(dbs, DX(-1.5), DY - 34, 'negative under the root', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 700 });
const scan = svg => { const g = mk(mk(svg, 'g', {}), 'g', {}); mk(g, 'line', { x1: 0, y1: DY - 58, x2: 0, y2: DY + 14, stroke: XC, 'stroke-width': 3 }); mk(g, 'circle', { cx: 0, cy: DY, r: 9, fill: XC }); const tt = txt(g, 0, DY - 68, 'x', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: XC, 'font-weight': 600 }); return { g, tt }; };
const scA = scan(das), scB = scan(dbs);
const tDa0 = wt('D2', 'Scan'), tDa1 = wt('D3', 'except') + 0.2, tDb0 = T0('D4') + 0.2, tDb1 = wt('D4', 'So') + 0.2;
const xA = t => -4.6 + 9.2 * M.clamp((t - tDa0) / (tDa1 - tDa0)), xB = t => -4.6 + 9.2 * M.clamp((t - tDb0) / (tDb1 - tDb0));
const th2 = PUC.think($('#th2'), { q: `Is ${K(`${xc('x')} = 1`)} in the domain of ${K(`\\sqrt{${xc('x')} - 1}`)}?`, opts: ['Yes', 'No'], right: 0, why: `${K('\\sqrt{1 - 1} = \\sqrt{0} = 0')}, a real number. The domain is ${K(ac('[1, \\infty)'))}, and it includes 1.` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the domain of<br>${K(`f(${xc('x')}) = \\dfrac{${xc('x')}^2 + 2${xc('x')} + 1}{${xc('x')}^2 - 8${xc('x')} + 12}`)}`;
const wsol = PUC.solution($('#wl'), [
  ['The top works for every ' + K(xc('x'))],
  [K(`${xc('x')}^2 - 8${xc('x')} + 12 = (${xc('x')} - 2)(${xc('x')} - 6)`)],
  ['Bottom is 0 when ' + K(`${xc('x')} = ${red('2')} \\text{ or } ${red('6')}`)],
  [K(`\\text{Domain} = ${ac('\\mathbb{R} - \\{2, 6\\}')}`)],
  ['Fractions: always check the bottom']], { label: 'WORKED EXAMPLE', y0: 236, dy: 68 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'top'), wt('W4', 'Factor'), wt('W5', 'zero'), wt('W6', 'Remove'), wt('W7', 'Notice')];
const wsv = $('#wS'), WX = v => 112 + v * 72, WY = v => 330 - v * 20;
mk(wsv, 'line', { x1: 60, y1: WY(0), x2: 740, y2: WY(0), stroke: C.ink, 'stroke-width': 2.5 });
mk(wsv, 'line', { x1: WX(0), y1: 90, x2: WX(0), y2: 430, stroke: C.ink, 'stroke-width': 2.5 });
for (let v = 1; v <= 8; v++) { mk(wsv, 'line', { x1: WX(v), y1: WY(0) - 7, x2: WX(v), y2: WY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); if (v !== 2 && v !== 6) txt(wsv, WX(v), WY(0) + 32, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(wsv, WX(0) + 12, 104, 'y = bottom', { 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
let wd = ''; for (let i = 0; i <= 80; i++) { const x = -0.2 + 8.4 * i / 80; wd += (i ? 'L' : 'M') + WX(x).toFixed(1) + ',' + WY(x * x - 8 * x + 12).toFixed(1); }
const wCur = mk(wsv, 'path', { d: wd, fill: 'none', stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wZ = [2, 6].map(v => { const g = mk(mk(wsv, 'g', {}), 'g', {}); mk(g, 'circle', { cx: WX(v), cy: WY(0), r: 11, fill: C.red }); txt(g, WX(v), WY(0) + 36, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.red, 'font-weight': 700 }); return g; });
const wNy = 500, wN = mk(wsv, 'line', { x1: 60, y1: wNy, x2: 740, y2: wNy, stroke: AC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const wH = [2, 6].map(v => mk(wsv, 'circle', { cx: WX(v), cy: wNy, r: 12, fill: '#fff', stroke: C.red, 'stroke-width': 4 }));
const wNl = txt(wsv, 740, wNy - 24, 'DOMAIN: ALL REAL x EXCEPT 2 AND 6', { 'text-anchor': 'end', 'font-size': 17, fill: AC, 'font-weight': 600, 'letter-spacing': 1 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x^2 - 4)/(x - 2) = x + 2 \\;\\Rightarrow\\; \\text{domain} = \\mathbb{R}`), right: K(`\\text{domain} = \\mathbb{R} - \\{2\\}`) + '&nbsp; at 2 the bottom is 0', y0: 76, y1: 182 });
const ts = $('#tS'), TX = v => 120 + v * 70, TY = v => 236 - v * 32;
mk(ts, 'line', { x1: 40, y1: TY(0), x2: 540, y2: TY(0), stroke: C.ink, 'stroke-width': 2 }); mk(ts, 'line', { x1: TX(0), y1: 250, x2: TX(0), y2: 40, stroke: C.ink, 'stroke-width': 2 });
[1, 2, 3, 4].forEach(v => txt(ts, TX(v), TY(0) + 24, v, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 }));
const tLn = mk(ts, 'line', { x1: TX(-1), y1: TY(1), x2: TX(4.5), y2: TY(6.5), stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const tHole = mk(ts, 'g', {}); mk(tHole, 'circle', { cx: TX(2), cy: TY(4), r: 11, fill: '#fff', stroke: C.ok, 'stroke-width': 4 }); txt(tHole, TX(2) + 22, TY(4) + 24, 'hole at x = 2', { 'font-size': 18, fill: C.ok, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find the domain of a function built from fractions, roots and logs.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`f(x) = \\dfrac{\\sqrt{9 - x^2}}{x^2 - 1}`)}<br>How many integers are in the domain of f?`,
  opts: ['4', '5', '6', '7'], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`9 - x^2 \\ge 0 \\Rightarrow -3 \\le x \\le 3`)], [K(`x^2 - 1 \\ne 0 \\Rightarrow x \\ne \\pm 1`)], ['Integers from -3 to 3: 7'], [K(`\\{-3, -2, 0, 2, 3\\}`)], ['So 5 integers']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Under'), wt('A3', 'bottom'), wt('A4', 'integers'), wt('A5', 'Remove'), wt('A5', 'Five')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · real-valued functions', y0: 100, dy: 78, txt: [1, 1, 0, 0, 1],
  lines: [`<b>Real valued</b>: range ${K('\\subset \\mathbb{R}')}, every output a real number`,
    `<b>Real function</b>: domain ${K('\\subset \\mathbb{R}')} as well, real inputs`,
    K(`${rc('t')}(${xc('C')}) = 9${xc('C')}/5 + 32, \\qquad ${rc('t')}(${xc('37')}) = ${rc('98.6')}`),
    K(`1/(x - 2): ${ac('\\mathbb{R} - \\{2\\}')} \\qquad \\sqrt{x - 1}: ${ac('[1, \\infty)')}`),
    'Domain from the rule as given: never cancel first'] });
const YQ = ['What is the difference: real valued, and real function?', `Find ${K('t(-40)')} for ${K('t(C) = 9C/5 + 32')}.`, `Find the domain of ${K('1/(x^2 - 9)')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 19', topic: 'A bus fare, a mirror, a square plot: Constant, Identity and Polynomial', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3') - 0.2, 1.04, 960, 540], [T0('L4') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => M.vis($('#hr' + i), t, wt('H2', 'Every') - 0.2 + i * 0.25, 1e9, { dy: 14 }));
    M.vis($('#hGh'), t, wt('H2', 'Every') + 0.6, 1e9, { dy: 10 });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'One') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pd0'), t, wt('P2', 'real') - 0.1, 1e9, { dy: 14 }); M.vis($('#pd1'), t, wt('P3', 'inputs') - 0.1, 1e9, { dy: 14 });
    M.vis($('#pr'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    PIN.forEach((v, i) => { M.vis(pDi[i], t, tP1 + 0.7 + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pDo[i], t, T0('P1') + 1.4 + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      const u = M.io((t - T0('P1') - 1.0 - i * 0.12) / 0.45), x1 = PX(v), y1 = PYi - 14, x2 = PX(POU[i]), y2 = PYo + 16; pAr[i].set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); });
    M.draw(pHo, t, wt('P2', 'output') - 0.1, 0.7); M.vis(pTo, t, wt('P2', 'output'), 1e9, { dy: 0 });
    M.draw(pHi, t, wt('P3', 'inputs') - 0.1, 0.7); M.vis(pTi, t, wt('P3', 'inputs'), 1e9, { dy: 0 });
  }

  /* L: live temperature */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#lF'), t, wt('L1', 'input') - 0.1, 0.7);
    M.vis($('#lH'), t, wt('L1', 'hour') - 0.1, 1e9, { dy: 14 }); M.vis($('#lT'), t, wt('L1', 'temperature') - 0.1, 1e9, { dy: 14 });
    const h = hOf(t), key = h.toFixed(1);
    if (key !== lLast) { lLast = key; M.setT($('#lHv'), h.toFixed(1)); M.setT($('#lTv'), TMP(h).toFixed(2)); attr(lCur, 'd', h > 0.01 ? lPath(h) : ''); }
    M.vis($('#lp'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#lGh'), t, tL1 + 0.8, 1e9, { dy: 0 });
    const on = M.clamp((t - tL0 + 0.3) / 0.3), px = LX(h), py = LY(TMP(h));
    attr(lDot, 'cx', px.toFixed(1)); attr(lDot, 'cy', py.toFixed(1)); lDot.style.opacity = on.toFixed(3); M.hide(lDot, on <= 0);
    attr(lVg, 'x1', px.toFixed(1)); attr(lVg, 'x2', px.toFixed(1)); attr(lVg, 'y1', GY0); attr(lVg, 'y2', py.toFixed(1)); M.hide(lVg, on <= 0);
    attr(lHg, 'x1', GX0); attr(lHg, 'x2', px.toFixed(1)); attr(lHg, 'y1', py.toFixed(1)); attr(lHg, 'y2', py.toFixed(1)); M.hide(lHg, on <= 0);
    M.vis(lMk[0], t, wt('L3', 'lowest') - 0.1, 1e9, POP); M.vis(lMk[1], t, wt('L3', 'highest') - 0.1, 1e9, POP);
    M.vis($('#lg0'), t, wt('L4', 'Inputs') - 0.1, 1e9, { dy: 14 }); M.vis($('#lg1'), t, wt('L4', 'Outputs') - 0.1, 1e9, { dy: 14 });
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1].forEach(i => M.vis($('#ka' + i), t, wt('K1', 'hours') - 0.1 + i * 0.2, 1e9, { dy: 14 }));
    M.vis($('#kaC0'), t, wt('K1', 'hours') + 0.3, 1e9, POP); M.vis($('#kaC1'), t, wt('K1', 'degrees') + 0.2, 1e9, POP); M.vis($('#kaP'), t, wt('K1', 'real') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#kb' + i), t, wt('K2', 'student') - 0.1 + i * 0.2, 1e9, { dy: 14 }));
    M.vis($('#kbC1'), t, wt('K2', 'outputs') - 0.1, 1e9, POP); M.vis($('#kbC0'), t, wt('K2', 'inputs') - 0.1, 1e9, POP); M.vis($('#kbP'), t, wt('K2', 'valued') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'real') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'range') });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'valued') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'inputs') - 0.2, 0.8);
  }

  /* C: Celsius to Fahrenheit */
  const cOn = t >= tC1 - 0.1 && t < tD1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('D1');
    M.vis($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#cF'), t, wt('C1', 't') - 0.05, 0.9);
    csol(t, tC1 + 0.4, tCs);
    M.vis($('#cr'), t, tC1 + 0.5, out, { dx: 60, dy: 0, ...o });
    cPts.forEach((g, i) => M.vis(g, t, wt(['C2', 'C3', 'C4'][i], i ? 'plus' : 'Add'), 1e9, POP));
    const cu = M.clamp((t - tCc0) / (tCc1 - tCc0)), cv = 100 * M.io(cu), cf = 9 * cv / 5 + 32;
    attr(cLine, 'x2', CXp(cv).toFixed(1)); attr(cLine, 'y2', CYp(cf).toFixed(1)); M.hide(cLine, cu <= 0);
    attr(cDot, 'cx', CXp(cv).toFixed(1)); attr(cDot, 'cy', CYp(cf).toFixed(1)); M.hide(cDot, cu <= 0 || cu >= 1);
    const key = cv.toFixed(0); if (key !== cLast) { cLast = key; M.setT($('#cRd'), `C = ${Math.round(cv)}  →  t = ${(9 * Math.round(cv) / 5 + 32).toFixed(1)}`); }
    M.vis($('#cRd'), t, tCc0 - 0.2, 1e9, POP);
  }

  /* D: domain from the rule */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('D5');
    M.vis($('#da'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#daF'), t, wt('D2', 'one') - 0.1, 0.8);
    const xa = xA(t); attr(scA.g.parentNode, 'transform', `translate(${DX(xa).toFixed(1)},0)`); M.vis(scA.g, t, tDa0 - 0.2, tDa1 + 0.3, { dy: 0 });
    attr(daOk[0], 'x1', DX(-4.6)); attr(daOk[0], 'x2', DX(Math.min(xa, 2) - (xa > 2 ? 0.18 : 0)).toFixed(1)); M.hide(daOk[0], t < tDa0);
    attr(daOk[1], 'x1', DX(2.18)); attr(daOk[1], 'x2', DX(Math.max(2.18, xa)).toFixed(1)); M.hide(daOk[1], xa <= 2.18);
    M.vis(daHole, t, tDa0 + (tDa1 - tDa0) * (6.6 / 9.2) - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(daTag, t, wt('D3', 'bottom') - 0.1, 1e9, { dy: 0 });
    PUC.write($('#daR'), t, wt('D3', 'domain') - 0.1, 0.8);
    M.vis($('#db'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#dbF'), t, T0('D4') + 0.1, 0.8);
    const xb = xB(t); attr(scB.g.parentNode, 'transform', `translate(${DX(xb).toFixed(1)},0)`); M.vis(scB.g, t, tDb0 - 0.2, tDb1 + 0.3, { dy: 0 });
    attr(dbBad, 'x2', DX(Math.min(xb, 1)).toFixed(1)); M.hide(dbBad, t < tDb0); M.vis(dbTag, t, wt('D4', 'negative') - 0.1, 1e9, { dy: 0 });
    attr(dbOk, 'x2', DX(Math.max(1, xb)).toFixed(1)); M.hide(dbOk, xb <= 1); M.vis(dbDot, t, tDb0 + (tDb1 - tDb0) * (5.6 / 9.2), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    PUC.write($('#dbR'), t, wt('D4', 'one') - 0.1, 0.8);
    M.vis($('#th2'), t, tD5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tD5, tOpts: wt('D5', 'domain') - 0.1, tCount: T1('D5') + 0.05, dur: 3, tAns: T0('D6') - 0.02, tWhy: wt('D6', 'One') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wCur, t, wt('W4', 'Factor'), 1.2);
    wZ.forEach((g, i) => M.vis(g, t, wt('W5', i ? 'six' : 'two') - 0.1, 1e9, POP));
    M.draw(wN, t, wt('W6', 'Remove') - 0.1, 0.8); wH.forEach((c, i) => M.vis(c, t, wt('W6', 'two') + i * 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); M.vis(wNl, t, wt('W6', 'domain'), 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'cancel') - 0.1, tStrike: wt('X3', 'rule') - 0.1, tRight: wt('X3', 'domain', 1) - 0.1 });
    M.draw(tLn, t, wt('X2', 'plus') - 0.1, 0.7);
    M.vis(tHole, t, wt('X3', 'two') - 0.1, 1e9, POP);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'find') });
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
