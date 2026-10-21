// PUC Physics Ep 07: Dimensional formulae (Motion notebook, the pressure cooker lid)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const DC = C.violet, VC = C.ac, AC = C.red, FC = C.orange, EC = C.teal;   // dims violet, v blue, a/g red, F orange, work/energy teal
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const D = s => `\\textcolor{${DC}}{${s}}`;

Object.assign(M.IC, {
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1');
const tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tG4 = T0('G4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['heart', 'Doctor', 'BLOOD PRESSURE', '120', 'mmHg', 'blood'], ['gauge', 'Tyre shop', 'AIR PRESSURE', '30', 'psi', 'tyre'], ['waves', 'Diver', 'WATER PRESSURE', '2', 'atm', 'diver']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, un], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span>${v}</span> <span class="u" style="font-size:30px">${un}</span></div></div>`).join('');
$('#blks').innerHTML = ['[M]', '[L]', '[T]'].map((b, i) => `<div class="blk3" id="bk${i}" style="left:${36 + i * 84}px">${b}</div>`).join('') +
  `<div class="wq" id="wq0" style="left:300px">${M.icon('help', 26, DC, 2.2)}<span>Pressure = ?</span></div>`;

/* ---------- P ---------- */
$('#pd0').innerHTML = K(`[Q] = ${D('[M^{a}\\,L^{b}\\,T^{c}]')}`);
$('#pd1').innerHTML = K(`[\\textcolor{${VC}}{v}] = ${D('[M^0\\,L\\,T^{-1}]')}`);
const PEX = [['Mass', '[M]'], ['Length', '[L]'], ['Time', '[T]'], ['Area = L × L', '[L^2]'], ['Velocity = L ÷ T', '[LT^{-1}]']];
$('#pexs').innerHTML = PEX.map(([h, d], i) => `<div class="pex" id="px${i}" style="top:${84 + i * 96}px"><div class="h">${h}</div><div class="d">${K(D(d))}</div></div>`).join('');

/* ---------- S: the cooker lid ---------- */
const s = $('#simS');
const CX = 300, POT = { x: 110, y: 330, w: 380, h: 200 };
const pot = mk(s, 'path', { d: `M${POT.x},${POT.y} v${POT.h - 30} q0,30 30,30 h${POT.w - 60} q30,0 30,-30 v${-(POT.h - 30)}`, fill: '#DDE2EA', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
mk(s, 'rect', { x: POT.x + POT.w, y: POT.y + 30, width: 150, height: 18, rx: 9, fill: C.ink });     // handle
const steamFill = mk(s, 'rect', { x: POT.x + 4, y: POT.y + 4, width: POT.w - 8, height: POT.h - 8, fill: '#F0F4FB' });
const steamL = [0, 1, 2, 3].map(i => mk(s, 'path', { d: `M${POT.x + 60 + i * 86},${POT.y + 160} q-14,-22 0,-44 q14,-22 0,-44`, fill: 'none', stroke: '#A9B8D3', 'stroke-width': 3, 'stroke-linecap': 'round' }));
mk(s, 'rect', { x: POT.x - 16, y: POT.y - 16, width: POT.w + 32, height: 20, rx: 8, fill: '#C8CFDA', stroke: C.ink, 'stroke-width': 3.5 });   // lid
mk(s, 'rect', { x: CX - 9, y: POT.y - 52, width: 18, height: 38, fill: '#C8CFDA', stroke: C.ink, 'stroke-width': 3 });     // vent pipe
const wgt = mk(s, 'g', {});
mk(wgt, 'rect', { x: CX - 30, y: -54, width: 60, height: 54, rx: 10, fill: C.ink });
mk(wgt, 'rect', { x: CX - 6, y: -72, width: 12, height: 20, rx: 4, fill: C.ink });
const puff = [0, 1, 2].map(i => mk(s, 'path', { d: `M${CX - 40 + i * 40},${POT.y - 70} q-12,-24 0,-48 q12,-24 0,-48`, fill: 'none', stroke: '#A9B8D3', 'stroke-width': 4, 'stroke-linecap': 'round' }));
const fA = PUC.arrow(s, FC, 7, 20), wA = PUC.arrow(s, AC, 7, 20);
const fL = txt(s, 0, 0, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: FC });
const wL = txt(s, 0, 0, 'W', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC });
const aBr = mk(s, 'path', { d: `M${CX - 9},${POT.y + 30} v-10 M${CX + 9},${POT.y + 30} v-10 M${CX - 9},${POT.y + 25} H${CX + 9}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
const aT = txt(s, CX + 22, POT.y + 34, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: C.ink });
// pressure clock: sim time s runs from S2; frozen during the slow-mo replay
const tS2 = wt('S2', 'Steam') - 0.1, tL = wt('S4', 'lifts'), tRep = wt('S4', 'replay') - 0.1, tJump = wt('S5', 'jumps') - 0.1, tPk2 = wt('S6', 'peak') - 0.3;
const REP = Math.max(0, tJump - tRep);
const sc = t => { let v = t - tS2; if (t > tRep) v -= Math.min(t - tRep, REP); return Math.max(0, v); };
const sL = sc(tL), sJ = sc(tJump), sP2 = sc(tPk2), PMAX = 98, PLOW = 80;
const Pof = x => { if (x <= sL) return PMAX * x / sL; if (x <= sJ) return PMAX; if (x <= sJ + 0.6) return M.lerp(PMAX, PLOW, M.io((x - sJ) / 0.6)); if (x <= sP2) return M.lerp(PLOW, PMAX, (x - sJ - 0.6) / Math.max(0.1, sP2 - sJ - 0.6)); if (x <= sP2 + 0.6) return M.lerp(PMAX, PLOW, M.io((x - sP2) / 0.6)); return PLOW + (PMAX - PLOW) * M.clamp((x - sP2 - 0.6) / (sP2 - sJ)); };
const SX = sc(T1('S6') + 0.6);
$('#roG').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" id="roF" style="color:${FC}">0.00</span><span class="u">N (push on the vent)</span>
  <span class="k">A</span><span class="v">10</span><span class="u">mm² (vent hole)</span>
  <span class="k">P</span><span class="v" id="roP">0</span><span class="u">kPa (above air)</span>`;
const G = PUC.graph($('#grS'), { x: 100, y: 78, w: 610, h: 132, xmax: SX, ymin: 0, ymax: 100, xt: [], yt: [0, 50, 100], xl: 't', yl: '' });
const gC = G.curve(C.ink, 5), gD = G.dot(C.ink);
const gLine = G.mk('line', { x1: G.X(0), y1: G.Y(PMAX), x2: G.X(SX), y2: G.Y(PMAX), stroke: AC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gLt = G.mk('text', { x: G.X(SX), y: G.Y(PMAX) - 10, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 16, fill: AC }); gLt.textContent = 'weight lifts';
const avD = PUC.avatar($('#sim'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Each whistle is one peak!' });

/* ---------- D: block by block ---------- */
const DR = [['Velocity', `[\\textcolor{${VC}}{v}] = \\dfrac{${D('[L]')}}{${D('[T]')}} = ${D('[LT^{-1}]')}`, 'displacement ÷ time'],
  ['Acceleration', `[\\textcolor{${AC}}{a}] = \\dfrac{${D('[LT^{-1}]')}}{${D('[T]')}} = ${D('[LT^{-2}]')}`, 'velocity ÷ time'],
  ['Force', `[\\textcolor{${FC}}{F}] = ${D('[M]')}\\,${D('[LT^{-2}]')} = ${D('[MLT^{-2}]')}`, 'mass × acceleration'],
  ['Area', `[A] = ${D('[L]')}\\,${D('[L]')} = ${D('[L^2]')}`, 'length × breadth'],
  ['Pressure', `[P] = \\dfrac{${D('[MLT^{-2}]')}}{${D('[L^2]')}} = \\textcolor{${VC}}{[ML^{-1}T^{-2}]}`, 'force ÷ area']];
$('#drs').innerHTML = `<div class="hiBox" id="hiB" style="left:30px;width:1540px;height:92px"></div>` + DR.map(([n, f, w], i) => `<div class="dr" id="dr${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="nm">${n}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDr = [wt('D2', 'Velocity'), wt('D3', 'Acceleration'), wt('D4', 'Force'), wt('D5', 'Area'), T0('D6')];

/* ---------- R: each power ---------- */
const LK = [['Mass', 'one M on top, from the force', 'M¹'], ['Length', 'one L on top, two L below', '1 − 2'], ['Time', 'divided by time twice', 'T⁻²']];
LK[1][2] = '1 - 2';
$('#lks').innerHTML = LK.map(([h, s2, op], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 152}px"><div class="h">${h}</div><div class="s">${s2}</div><div class="op">${op}</div></div>`).join('');
$('#pws').innerHTML = [['M', '1', 'FROM FORCE'], ['L', '-1', '1 UP, 2 DOWN'], ['T', '-2', '÷ TIME TWICE']].map(([l, p, s2], i) => `<div class="pw" id="pw${i}" style="left:${36 + i * 248}px"><div class="l">${l}</div><div class="p" id="pwp${i}">?</div><div class="s">${s2}</div></div>`).join('');
$('#rF').innerHTML = K(`[P] = ${D('[M^{1}\\,L^{-1}\\,T^{-2}]')}`);
const tLk = [T0('R2'), T0('R3'), T0('R4')], tPw = [wt('R2', 'one', 1), wt('R3', 'minus'), wt('R4', 'minus')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`P = \\dfrac{\\textcolor{${FC}}{F}}{A} \\;\\Rightarrow\\; \\dfrac{${D('[MLT^{-2}]')}}{${D('[L^2]')}} = ${D('[ML^{-1}T^{-2}]')}`);

/* ---------- K: side by side ---------- */
$('#kbF').innerHTML = K(`[\\textcolor{${FC}}{F}] = ${D('[M\\,L^{\\,1}\\,T^{-2}]')}`);
$('#kdF').innerHTML = K(`[P] = ${D('[M\\,L^{-1}\\,T^{-2}]')}`);
const kb = $('#kbS'), kd = $('#kdS');
mk(kb, 'rect', { x: 240, y: 170, width: 300, height: 26, rx: 4, fill: '#C8CFDA', stroke: C.ink, 'stroke-width': 3 });
const kbA = PUC.arrow(kb, FC, 8, 22); const kbT = txt(kb, 410, 60, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: FC });
mk(kd, 'rect', { x: 140, y: 170, width: 500, height: 26, rx: 4, fill: '#C8CFDA', stroke: C.ink, 'stroke-width': 3 });
for (let i = 0; i <= 5; i++) mk(kd, 'line', { x1: 140 + i * 100, y1: 170, x2: 140 + i * 100, y2: 196, stroke: C.ink, 'stroke-width': 2 });
const kdA = [0, 1, 2, 3, 4].map(() => PUC.arrow(kd, FC, 5, 14));
const kdT = txt(kd, 390, 238, 'each square: F ÷ A', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const kHi = [0, 1].map(i => { const d = document.createElement('div'); d.className = 'hiBox'; d.style.cssText = 'top:80px;height:76px;width:120px;z-index:-1'; (i ? $('#kd') : $('#kb')).insertBefore(d, (i ? $('#kd') : $('#kb')).firstChild); return d; });
const th1 = PUC.think($('#th1'), { q: 'A pin and a plate get the same push. Which gets the bigger pressure?', opts: ['The pin', 'The plate'], right: 0, why: 'Area sits below the line: P = F ÷ A. A tiny area gives a big pressure.' });

/* ---------- G: work and energy ---------- */
const EQ = [['WORK = FORCE × DISTANCE', `[W] = ${D('[MLT^{-2}]')}\\,${D('[L]')} = \\textcolor{${EC}}{[ML^2T^{-2}]}`], ['KINETIC ENERGY = ½ m v²', `[\\tfrac12 m\\textcolor{${VC}}{v}^2] = ${D('[M]')}\\,${D('[LT^{-1}]')}^2 = \\textcolor{${EC}}{[ML^2T^{-2}]}`], ['THE ½', `\\tfrac12 \\;\\text{is a pure number: no dimension}`]];
$('#eqs').innerHTML = EQ.map(([h, f], i) => `<div class="eq" id="eq${i}" style="top:${84 + i * 134}px"><div class="h">${h}</div><div class="ef">${K(f)}</div></div>`).join('');
const gS = $('#gS'), GY0 = 360;
mk(gS, 'line', { x1: 40, y1: GY0, x2: 744, y2: GY0, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(gS, 'line', { x1: x, y1: GY0 + 4, x2: x - 14, y2: GY0 + 18, stroke: C.dim, 'stroke-width': 2 });
const gGh = [0, 1, 2].map(() => mk(gS, 'rect', { y: GY0 - 100, width: 120, height: 100, rx: 10, fill: C.ink, opacity: 0 }));
const gBox = mk(gS, 'rect', { y: GY0 - 100, width: 120, height: 100, rx: 10, fill: C.ink });
const gF = PUC.arrow(gS, FC, 7, 20), gFl = txt(gS, 0, 0, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: FC });
const gBr = mk(gS, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); const gBt = txt(gS, 0, GY0 + 60, 'd  [L]', { 'text-anchor': 'middle', 'font-size': 24, fill: DC, 'font-weight': 600 });
const gW = txt(gS, 392, 160, 'W = F × d', { 'text-anchor': 'middle', 'font-size': 34, fill: EC, 'font-weight': 600 });
const gPos = t => 150 + 360 * M.io((t - wt('G2', 'distance')) / 1.6);
const th2 = PUC.think($('#th2'), { q: 'Does ½ m v² have the same dimensional formula as work?', opts: ['Yes', 'No'], right: 0, why: '[M][LT⁻¹]² = [ML²T⁻²], the same as work. That is why both use the joule.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`[W] = \\textcolor{${EC}}{[ML^2T^{-2}]}`)],
  [K(`[t] = ${D('[T]')}`)],
  [K(`[P] = \\dfrac{[ML^2T^{-2}]}{[T]} = [ML^2T^{-2-1}]`)],
  [K(`[P] = \\textcolor{${VC}}{[ML^2T^{-3}]} \\quad 1\\,\\text{W} = 1\\,\\text{J/s}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 104 });
const wS = $('#wrS');
const wBars = []; for (let i = 0; i < 3; i++) { wBars.push(mk(wS, 'rect', { x: 120 + i * 190, y: 140, width: 150, height: 0, rx: 8, fill: '#BFE3E3', stroke: EC, 'stroke-width': 3 })); txt(wS, 195 + i * 190, 340, `second ${i + 1}`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
mk(wS, 'line', { x1: 100, y1: 310, x2: 690, y2: 310, stroke: C.ink, 'stroke-width': 2.5 });
const wBT = [0, 1, 2].map(i => txt(wS, 195 + i * 190, 290, '10 J', { 'text-anchor': 'middle', 'font-size': 26, fill: EC, 'font-weight': 600 }));
const wSum = txt(wS, 392, 400, '30 J in 3 s = 10 J every second = 10 W', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
$('#wc').innerHTML = K(`P = W/t \\;\\to\\; [ML^2T^{-3}]`);
const tW = [wt('W3', 'Work'), wt('W4', 'Time'), wt('W5', 'Divide'), wt('W6', 'So')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Force = [MLT²]', right: 'Force = [MLT⁻²]: time is below the line' });
const tx = document.createElement('div'); tx.className = 'fx'; tx.style.cssText = 'left:1090px;top:100px;font-size:40px'; tx.innerHTML = K(`\\textcolor{${AC}}{a} = \\dfrac{\\textcolor{${VC}}{v}}{t} \\to \\dfrac{[LT^{-1}]}{\\textcolor{${AC}}{[T]}}`); $('#trap').appendChild(tx);
const where = PUC.where($('#wa'), { on: [], type: 'Short questions: write the formula of a quantity, or match quantities to formulae' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Surface tension is force per unit length. What is its dimensional formula?', qW: 780,
  opts: [K('[MLT^{-2}]'), K('[MT^{-2}]'), K('[ML^{-1}T^{-2}]'), K('[ML^{2}T^{-2}]')], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`[\\textcolor{${FC}}{F}] = [MLT^{-2}]`)], [K(`\\div\\,[L]`)], [K(`[MT^{-2}]`)], ['<span style="font:500 22px Poppins">A force · C pressure · D energy</span>']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Force'), wt('A2', 'divide'), wt('A3', 'cancels'), wt('A3', 'A')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · dimensional formulae', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`[v] = [LT^{-1}] \\quad [a] = [LT^{-2}] \\quad [F] = [MLT^{-2}]`), K(`[P] = [ML^{-1}T^{-2}] \\quad [W] = [ML^2T^{-2}] \\quad [\\text{power}] = [ML^2T^{-3}]`),
    '<b>Method</b>: known formula, replace each quantity by its dimensions',
    '<b>Dividing</b> by a quantity makes its power negative'] });
const YQ = ['What is [F], and why is the power of T negative?', 'Why does pressure have L⁻¹?', 'What is the dimensional formula of power?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 08', topic: 'Is that formula even possible? Dimensional Homogeneity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.15, 1.12, 520, 480], [tJump + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  // highlight boxes behind the L power in the side-by-side formulas
  [['#kbF', 0], ['#kdF', 1]].forEach(([id, i]) => { const f = $(id), host = f.parentNode, ms = f.querySelectorAll('.mord'); let L = null; ms.forEach(m => { if (m.textContent === 'L') L = m; });
    if (L) { const r = L.getBoundingClientRect(), hr = host.getBoundingClientRect(), sc2 = hr.width / host.offsetWidth; kHi[i].style.left = ((r.left - hr.left) / sc2 - 10) + 'px'; kHi[i].style.width = '96px'; } });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'pressures') + 0.1) / 0.3); el.style.background = mix(C.soft, C.ac3, on); });
    M.vis($('#hjP'), t, wt('H2', 'made') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    [wt('H4', 'mass'), wt('H4', 'length'), wt('H4', 'time')].forEach((tt, i) => M.vis($('#bk' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#wq0'), t, wt('H4', 'units') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pd0'), t, wt('P3', 'square') - 0.1, 0.9); M.vis($('#pt0'), t, wt('P2', 'depends'), 1e9, { dy: 10 });
    M.vis($('#pdL'), t, T0('P4') + 0.1, 1e9, { dy: 10 }); PUC.write($('#pd1'), t, wt('P4', 'velocity') - 0.1, 0.9);
    M.vis($('#plP'), t, T0('P5') + 0.3, 1e9, POP);
    M.vis($('#pr'), t, T0('P2') + 0.2, out, { dx: 60, dy: 0, ...o });
    PEX.forEach((_, i) => M.vis($('#px' + i), t, i < 3 ? wt('P2', ['mass', 'length', 'time'][i]) - 0.1 : wt('P5', i === 3 ? 'replace' : 'dimensions') - 0.1, 1e9, { dy: 14 }));
  }

  /* S: cooker */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); M.vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const x = sc(t), P = t < tS2 ? 0 : Pof(x), slow = t >= tRep && t < tJump;
    // weight lift: at tL it rises 10 px, replay goes back down then rises at 0.25x, jump at tJump, again at the 2nd peak
    let lift = 0;
    if (t >= tL && t < tRep) lift = 10 * M.io((t - tL) / 0.25);
    else if (slow) lift = 10 * M.io((t - tRep - 0.6) / Math.max(0.5, REP - 1.0));
    else if (t >= tJump) lift = 26 * (1 - M.io((t - tJump - 0.5) / 0.5)) + 26 * M.clamp(1 - Math.abs(t - tPk2 - 0.25) / 0.5);
    lift *= M.clamp((t - tL + 0.01) * 100);
    attr(wgt, 'transform', `translate(0,${(POT.y - 52 - lift).toFixed(1)})`);
    const wy = POT.y - 52 - lift;
    // F up on the vent (grows with P), W down (weight, constant 0.98 N)
    const fScale = 130 / PMAX, fl = P * fScale * (slow ? M.io((t - tRep - 0.2) / 0.6) : 1), wl = 128 * M.io((t - wt('S4', 'weight') + 0.1) / 0.4) * (slow ? M.io((t - tRep - 0.2) / 0.6) : 1);
    const fl2 = fl * 0.9; fA.set(CX, POT.y + 170, CX, POT.y + 170 - fl2 * 0.95); attr(fL, 'x', CX - 34); attr(fL, 'y', (POT.y + 180 - fl2 / 2).toFixed(1)); fL.style.opacity = fl > 20 ? 1 : 0;
    const wl2 = wl * 0.6; wA.set(CX, wy - 156, CX, wy - 156 + wl2); attr(wL, 'x', CX + 16); attr(wL, 'y', (wy - 120).toFixed(1)); wL.style.opacity = wl > 20 ? 1 : 0;
    M.hide(fA.g, t < tS2); M.vis(aBr, t, wt('S2', 'area') - 0.1, 1e9, { dy: 0 }); M.vis(aT, t, wt('S2', 'area'), 1e9, { dy: 0 });
    steamFill.setAttribute('fill', mix('#F0F4FB', '#D3E0F5', P / PMAX));
    steamL.forEach((l, i) => { l.style.opacity = (M.clamp(P / 40 - i * 0.4)).toFixed(3); });
    const pf = t >= tJump ? M.clamp(1 - Math.abs(t - tJump - 0.5) / 0.6) + M.clamp(1 - Math.abs(t - tPk2 - 0.3) / 0.6) : 0;
    puff.forEach((p2, i) => { p2.style.opacity = (pf * [0.5, 0.35, 0.22][i]).toFixed(3); M.hide(p2, pf <= 0.01); });
    M.vis($('#slo'), t, tRep, tJump, { dy: 0, sc: 0.8, sp: M.POP, outDur: 0.2, ody: 0 });
    M.setT($('#roP'), Math.round(P).toString()); M.setT($('#roF'), (P * 1e3 * 1e-5).toFixed(2));
    gC((u2) => [u2, Pof(u2)], 0, Math.min(x, SX), 160); gD(Math.min(x, SX), P, t >= tS2);
    avD(t, wt('S6', 'whistle') - 0.1, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, OUT('R1'), { dy: 36, ...o });
    DR.forEach((_, i) => { const el = $('#dr' + i); M.vis(el.querySelector('.n'), t, tDr[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); M.vis(el.querySelector('.nm'), t, tDr[i] - 0.1, 1e9, { dx: -12, dy: 0 }); PUC.write(el.querySelector('.sx'), t, tDr[i] + 0.2, 0.8); M.vis(el.querySelector('.why'), t, tDr[i] + 0.9, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDr.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tDr[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dy: 16 }); const on = M.io((t - tLk[i] - 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - tLk[i + 1]) / 0.3) : 1); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#rr'), t, tR1 + 0.3, 1e9, { dx: 60, dy: 0 });
    [0, 1, 2].forEach(i => { M.vis($('#pw' + i), t, tR1 + 0.5 + i * 0.1, 1e9, { dy: 16 }); const on = t >= tPw[i]; M.setT($('#pwp' + i), on ? ['1', '-1', '-2'][i] : '?'); $('#pw' + i).style.background = mix(C.soft, '#EDE6FB', M.io((t - tPw[i]) / 0.3)); });
    PUC.write($('#rF'), t, T1('R4') - 0.5, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'start') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'replace') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kbF'), t, wt('K1', 'Force') - 0.1, 0.8);
    const ka = M.io((t - wt('K1', 'push') + 0.1) / 0.5); kbA.set(390, 160 - 120 * ka - 4, 390, 164); M.hide(kbA.g, ka <= 0.01); kbT.style.opacity = ka.toFixed(3);
    M.vis($('#kbP'), t, wt('K1', 'push') + 0.2, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kdF'), t, wt('K2', 'Pressure') - 0.1, 0.8);
    kdA.forEach((a, i) => { const u2 = M.io((t - wt('K2', 'each') + 0.1 - i * 0.08) / 0.4); a.set(190 + i * 100, 160 - 50 * u2 - 4, 190 + i * 100, 164); M.hide(a.g, u2 <= 0.01); });
    M.vis(kdT, t, wt('K2', 'square') + 0.2, 1e9, { dy: 0 }); M.vis($('#kdP'), t, wt('K2', 'metre') + 0.1, 1e9, POP);
    kHi.forEach(h => M.vis(h, t, wt('K2', 'Only') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Area') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const tBack = T0('G5'), out = OUT('G4'), out2 = OUT('W1'), second = t >= tBack + 2.2;
    M.vis($('#gl'), t, second ? tBack + 2.4 : tG1 + 0.1, second ? out2 : out, { dx: -60, dy: 0, ...o });
    M.vis($('#eq0'), t, T0('G2') - 0.1, 1e9, { dy: 16 }); M.vis($('#eq1'), t, T0('G3') - 0.1, 1e9, { dy: 16 }); M.vis($('#eq2'), t, wt('G3', 'pure') - 0.1, 1e9, { dy: 16 });
    PUC.write($('#eq0 .ef'), t, wt('G2', 'gives') - 0.6, 0.8); PUC.write($('#eq1 .ef'), t, second ? tBack + 2.6 : 1e9, 0.8);
    M.vis($('#gP'), t, tBack + 3.0, 1e9, POP);
    M.vis($('#gr2'), t, tG1 + 0.25, second ? out2 : out, { dx: 60, dy: 0, ...o });
    const bx = gPos(t); attr(gBox, 'x', bx.toFixed(1));
    gGh.forEach((g, k) => { const gx = gPos(t - 0.15 * (k + 1)); attr(g, 'x', gx.toFixed(1)); g.style.opacity = Math.abs(gx - bx) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    const fu = M.io((t - wt('G2', 'force') + 0.1) / 0.4); gF.set(bx - 10 - 110 * fu, GY0 - 50, bx - 10, GY0 - 50); M.hide(gF.g, fu <= 0.01); attr(gFl, 'x', (bx - 70).toFixed(1)); attr(gFl, 'y', GY0 - 70); gFl.style.opacity = fu.toFixed(3);
    const d0 = 150, d1 = bx; attr(gBr, 'd', `M${d0},${GY0 + 26} v10 H${d1.toFixed(1)} v-10`); M.hide(gBr, d1 - d0 < 4); attr(gBt, 'x', ((d0 + d1) / 2).toFixed(1)); M.vis(gBt, t, wt('G2', 'distance') + 1.0, 1e9, { dy: 0 });
    M.vis(gW, t, wt('G2', 'gives') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tG4 + 0.05, tBack + 2.2, { dy: 36, ...o });
    th2(t, { tin: tG4, tOpts: wt('G4', 'Does') + 0.3, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'M') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    wBars.forEach((b, i) => { const u2 = M.o3((t - wt('W2', 'divided') - i * 0.5) / 0.45); attr(b, 'height', (150 * u2).toFixed(1)); attr(b, 'y', (310 - 150 * u2).toFixed(1)); M.hide(b, u2 <= 0); M.vis(wBT[i], t, wt('W2', 'divided') + i * 0.5 + 0.3, 1e9, { dy: 0 }); });
    M.vis(wSum, t, wt('W2', 'time') + 0.6, 1e9, { dy: 0 });
    M.vis($('#wc'), t, tW[3] + 0.3, 1e9, POP); $('#wc').style.left = (392 - $('#wc').offsetWidth / 2) + 'px';
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Force') - 0.2 });
    PUC.write(tx, t, wt('X3', 'time') - 0.2, 0.8);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Short') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
