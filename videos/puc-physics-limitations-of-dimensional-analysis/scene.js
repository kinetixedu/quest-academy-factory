// PUC Physics Ep 10: Limitations of dimensional analysis (Motion notebook, pendulum bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const KC = C.violet, GC = C.red, VC = C.ac, FC = C.orange, IC = C.ink;   // k violet, g red, v blue, F orange, l / T ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const kk = `\\textcolor{${KC}}{k}`, gg = `\\textcolor{${GC}}{g}`, rlg = `\\sqrt{l/${gg}}`;
const G = 9.8, TH0 = 0.2;                     // g (NCERT), swing amplitude in rad (small swings)

Object.assign(M.IC, {
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  pend: ['M4 3h16', 'M12 3l4 13', 'M18.5 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H3') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tM1 = T0('M1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4');
const tW1 = T0('W1'), tW3 = T0('W3'), tZ1 = T0('Z1'), tT = T0('T1'), tE1 = T0('E1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tE1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: every tool has a limit ---------- */
const TOOLS = [['ruler', 'Ruler', 'LENGTH', 'COLOUR', ['H1', 'ruler']], ['thermo', 'Thermometer', 'TEMPERATURE', 'MOOD', ['H2', 'thermometer']], ['pend', 'Dimensions', 'M · L · T', 'THE NUMBER 2π', ['H2', 'limit']]];
$('#tools').innerHTML = TOOLS.map(([ic, n, y, x], i) => `<div class="tool" id="tl${i}" style="left:${190 + i * 535}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="tn">${n}</div><div class="ty" id="ty${i}">✓ ${y}</div><div class="tx" id="tx${i}">✗ ${x}</div></div>`).join('');
const tTool = TOOLS.map(tl => wt(...tl[4]));
const tToolX = [wt('H1', 'colour'), wt('H2', 'mood'), wt('H2', 'limit') + 0.5];

/* ---------- H: corridor swing ---------- */
$('#hf0').innerHTML = K(`T \\propto ${rlg}`);
$('#hf1').innerHTML = K(`T = \\textcolor{${C.red}}{2\\pi}\\,${rlg}`);

/* ---------- P: what it sees / can do ---------- */
const CANS = [['Check if a formula is balanced', 1, ['P3', 'check']], ['Convert units', 1, ['P3', 'convert']], ['Guess a formula', 1, ['P3', 'guess']], ['Find a plain number like 2π', 0, ['P4', 'numbers']]];
$('#cans').innerHTML = CANS.map(([n, ok], i) => `<div class="can" id="cn${i}" style="top:${84 + i * 92}px;background:${ok ? C.soft : C.redBg}"><div class="ck" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 22, '#fff', 3)}</div><div class="cn">${n}</div></div>`).join('') +
  `<div class="pillp ink" id="pP" style="left:36px;top:470px">It never looks at plain numbers</div>`;
const tCan = CANS.map(c => wt(...c[2]));

/* ---------- S: pendulum bench ---------- */
const s = $('#simS'), PX = 175, PVX = 430, PVY = 108;      // 150 px per metre, pivot
mk(s, 'rect', { x: 300, y: 94, width: 260, height: 14, rx: 3, fill: C.ink });
for (let x = 310; x < 560; x += 22) mk(s, 'line', { x1: x, y1: 94, x2: x + 12, y2: 82, stroke: C.dim, 'stroke-width': 2 });
// vertical metre scale
const RX = 630;
mk(s, 'rect', { x: RX, y: PVY, width: 34, height: 2.1 * PX, rx: 4, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2 });
for (let d = 0; d <= 20; d++) { const y = PVY + d * PX / 10, L = d % 5 ? 10 : 20; mk(s, 'line', { x1: RX, y1: y, x2: RX + L, y2: y, stroke: C.ink, 'stroke-width': d % 5 ? 1.4 : 2.2 }); if (d % 5 === 0) txt(s, RX + 44, y + 6, (d / 10).toString(), { 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(s, RX + 44, PVY + 2.1 * PX + 26, 'm', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const arc = mk(s, 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const lvl = mk(s, 'line', { x1: 0, y1: 0, x2: RX, y2: 0, stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.7 });
const ghosts = [0, 1, 2].map(() => ({ s: mk(s, 'line', { stroke: C.ink, 'stroke-width': 2, opacity: 0 }), b: mk(s, 'circle', { r: 20, fill: C.ink, opacity: 0 }) }));
const str = mk(s, 'line', { x1: PVX, y1: PVY, stroke: C.ink, 'stroke-width': 3 });
const bob = mk(s, 'circle', { r: 20, fill: C.ac, stroke: C.ink, 'stroke-width': 2.5 });
mk(s, 'circle', { cx: PVX, cy: PVY, r: 6, fill: C.ink });
const vA = PUC.arrow(s, VC, 6, 16), gA = PUC.arrow(s, GC, 6, 16);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const gL = txt(s, 0, 0, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: GC });
// segments: 0.5 m, 1 m, 2 m (each released from TH0 at ts)
const SEG = [[wt('S2', 'string') - 0.1, 0.5], [wt('S3', 'Make') + 0.3, 1], [T0('S4') + 0.25, 2]].map(([ts, l]) => ({ ts, l, T: 2 * Math.PI * Math.sqrt(l / G), r: Math.sqrt(l / G) }));
const tSlow = tM1 + 0.15, FREEZE = 0.7;
const clock = (t, i) => { const sg = SEG[i]; if (i === 2 && t > tSlow) return (tSlow - sg.ts) + 0.25 * Math.max(0, t - tSlow - FREEZE); return t - sg.ts; };
const pend = (t) => {
  let i = 0; for (let k = 0; k < 3; k++) if (t >= SEG[k].ts - 0.6) i = k;
  const sg = SEG[i], w = 2 * Math.PI / sg.T;
  if (t < SEG[0].ts) return { i: 0, l: 0.5, th: TH0 * M.io((t - tS1 - 0.3) / 0.8), om: 0, tau: 0 };
  if (t < sg.ts && i > 0) {           // transition: lengthen the string while bringing the bob back to the release angle
    const p = SEG[i - 1], u = M.io((t - sg.ts + 0.6) / 0.6), tp = clock(t, i - 1), thp = TH0 * Math.cos(2 * Math.PI / p.T * tp);
    return { i, l: M.lerp(p.l, sg.l, u), th: M.lerp(thp, TH0, u), om: 0, tau: 0 };
  }
  const tau = clock(t, i);
  return { i, l: sg.l, th: TH0 * Math.cos(w * tau), om: -TH0 * w * Math.sin(w * tau), tau };
};
$('#roG').innerHTML = `<span class="k" style="color:${IC}">l</span><span class="v" id="rl">0.50</span><span class="u">m</span>
  <span class="k" style="color:${IC}">T</span><span class="v" id="rT">0.00</span><span class="u">s</span>
  <span class="k" style="color:${IC};font-style:normal">√(<i>l</i>/<i style="color:${GC}">g</i>)</span><span class="v" id="rr">0.226</span><span class="u">s</span>
  <span class="k" id="rkK" style="color:${KC};font-style:normal">T ÷ √(<i>l</i>/<i>g</i>)</span><span class="v" id="rk" style="color:${KC}">6.28</span><span class="u"></span>`;
// graph: T against sqrt(l/g); slope = 2 pi
const gr = PUC.graph($('#grS'), { x: 110, y: 66, w: 600, h: 150, xmax: 0.5, ymin: 0, ymax: 3.2, xt: [0.1, 0.2, 0.3, 0.4, 0.5], yt: [1, 2, 3] });
const gLine = mk($('#grS'), 'path', { d: `M${gr.X(0)},${gr.Y(0)} L${gr.X(0.5)},${gr.Y(Math.PI)}`, stroke: KC, 'stroke-width': 3, 'stroke-dasharray': '8 8', fill: 'none' });
const gPts = SEG.map(() => mk($('#grS'), 'circle', { r: 9, fill: C.ink, cx: -99, cy: -99 }));
const gStem = mk($('#grS'), 'line', { stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gDot = gr.dot(C.ac, 10);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = `right:36px;top:18px;height:40px;font-size:19px;background:${C.violet};color:#fff`; gTag.innerHTML = 'slope = 2&pi; &asymp; 6.28'; $('#gr').appendChild(gTag);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: '6.28 for every length!' });
const tSegT = SEG.map(sg => sg.ts + sg.T);

/* ---------- D: let the method try ---------- */
const STEPS = [[`T = ${kk}\\, l^{\\,a}\\, m^{\\,b}\\, ${gg}^{\\,c}`, 'guess a product of powers'],
  [`\\text{T} = \\text{L}^{a}\\,\\text{M}^{b}\\,(\\text{L}\\,\\text{T}^{-2})^{c}`, 'write each dimension'],
  [`b = 0,\\;\\; c = -\\tfrac{1}{2},\\;\\; a = \\tfrac{1}{2}`, 'match the powers'],
  [`T = ${kk}\\,${rlg}`, `but what is ${'<i style="color:' + KC + '">k</i>'}?`]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Guess'), wt('D3', 'Write'), wt('D4', 'Match'), wt('D5', 'So')];
const PW = [['M', `0 = b`, `b = 0`, ['D4', 'Mass']], ['T', `1 = -2c`, `c = -\\tfrac{1}{2}`, ['D4', 'Time']], ['L', `0 = a + c`, `a = \\tfrac{1}{2}`, ['D4', 'Length']]];
$('#pws').innerHTML = PW.map(([d, e, r], i) => `<div class="pw" id="pw${i}" style="top:${84 + i * 104}px"><div class="pd">${d}</div><div class="pe">${K(e)}</div><div class="pr">${K(r)}</div></div>`).join('');
const tPw = PW.map(p => wt(...p[3]));
$('#stopF').innerHTML = K(`T = \\textcolor{${KC}}{\\boxed{k}}\\,${rlg}`);

/* ---------- R: why it stops ---------- */
const LKS = ['<i class="kk">k</i> is a plain number: no mass, length or time', K(`\\text{So}\\;\\; [${kk}] = \\text{M}^{0}\\,\\text{L}^{0}\\,\\text{T}^{0}`), '2π, 10 or ½: the dimensions never change', 'So 2π must come from experiment'];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px;height:76px"><div class="n" style="top:14px">${i + 1}</div><div class="lt" style="top:18px">${l}</div></div>`).join('') + [0, 1, 2].map(i => `<div class="lka" id="la${i}" style="top:${160 + i * 96}px;height:20px"></div>`).join('');
const tLk = [wt('R2', 'plain'), wt('R3', 'So'), wt('R4', 'Multiply'), wt('R5', 'experiment') - 0.6];
const KCS = [['\\tfrac{1}{2}', ['R4', 'half']], ['2\\pi', ['R4', 'two']], ['10', ['R4', 'ten']]];
$('#kcs').innerHTML = KCS.map(([v], i) => `<div class="kc" id="kc${i}" style="top:${84 + i * 112}px"><div class="kv">${K(`${kk} = ${v}`)}</div><div class="kd">${K(`[${kk}\\,${rlg}\\,] = \\text{T}`)}</div><div class="km">${M.icon('check', 24, '#fff', 3)}</div></div>`).join('');
const tKc = KCS.map(c => wt(...c[1]));

/* ---------- C: right dimensions, wrong formula ---------- */
$('#cf0').innerHTML = K(`s = ut + \\tfrac{1}{2}\\textcolor{${GC}}{a}t^{2}`);
$('#cf1').innerHTML = K(`s = ut + \\textcolor{${C.red}}{2}\\,\\textcolor{${GC}}{a}t^{2}`);
$('#cd0').innerHTML = `<div class="dims" style="left:36px">[ut] = L</div><div class="dims" style="left:220px">[at²] = L</div>`;
$('#cv1').innerHTML = 'Dimensions: ?'; $('#cv1').style.background = C.soft; $('#cv1').style.color = C.mute;
const th1 = PUC.think($('#th1'), { q: `Is ${K('s = ut + 2at^{2}')} dimensionally correct?`, opts: ['Yes', 'No'], right: 0, why: 'Yes: every term is a length. Still wrong: dimensions cannot see the 2.' });

/* ---------- W: work vs torque ---------- */
const wk = $('#wkS'), FLY = 330;
mk(wk, 'line', { x1: 40, y1: FLY, x2: 744, y2: FLY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(wk, 'line', { x1: x, y1: FLY + 4, x2: x - 14, y2: FLY + 18, stroke: C.dim, 'stroke-width': 2 });
const wGh = [0, 1, 2].map(() => mk(wk, 'rect', { y: FLY - 90, width: 110, height: 90, rx: 10, fill: C.ink, opacity: 0 }));
const wBox = mk(wk, 'rect', { y: FLY - 90, width: 110, height: 90, rx: 10, fill: C.ink });
const wF = PUC.arrow(wk, FC, 7, 20), wFL = txt(wk, 0, FLY - 70, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: FC });
const wD = mk(wk, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }), wDL = txt(wk, 0, FLY + 64, 'd', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: C.ink, 'text-anchor': 'middle' });
const BX0 = 150, BX1 = 470;
const tq = $('#tqS'), PV = [180, 250], RL = 400;
const tqArc = mk(tq, 'path', { d: `M${PV[0] + 120},${PV[1]} A120,120 0 0 0 ${PV[0] + 120 * Math.cos(0.45)},${PV[1] - 120 * Math.sin(0.45)}`, fill: 'none', stroke: KC, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const rod = mk(tq, 'line', { x1: PV[0], y1: PV[1], stroke: '#8D99AE', 'stroke-width': 24, 'stroke-linecap': 'round' });
mk(tq, 'circle', { cx: PV[0], cy: PV[1], r: 18, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); mk(tq, 'circle', { cx: PV[0], cy: PV[1], r: 5, fill: C.ink });
const tqF = PUC.arrow(tq, FC, 7, 20), tFL = txt(tq, 0, 0, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: FC });
const tR = mk(tq, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }), tRL = txt(tq, 0, 0, 'r', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: C.ink, 'text-anchor': 'middle' });
$('#wd0').innerHTML = K(`[\\textcolor{${FC}}{F}\\,d] = \\text{M}\\,\\text{L}^{2}\\,\\text{T}^{-2}`);
$('#wd1').innerHTML = K(`[\\textcolor{${FC}}{F}\\,r] = \\text{M}\\,\\text{L}^{2}\\,\\text{T}^{-2}`);
const th2 = PUC.think($('#th2'), { q: 'Same dimensions. Can dimensional analysis tell work from torque?', opts: ['Yes', 'No'], right: 1, why: 'No. Same dimensions, different quantities. Matching never proves a formula.' });

/* ---------- Z: limitations 3 and 4 ---------- */
const BD = [[`l^{1/2}\\,${gg}^{-1/2}`, 'PRODUCT OF POWERS', 1, ['Z1', 'products']], ['ut + \\tfrac{1}{2}at^{2}', 'A SUM', 0, ['Z2', 'sum']], ['\\sin\\theta,\\;\\; \\log x,\\;\\; e^{x}', 'NEEDS A PURE NUMBER', 0, ['Z3', 'sine']]];
$('#bds').innerHTML = BD.map(([f, l, ok], i) => `<div class="bd" id="bd${i}" style="top:${84 + i * 112}px;background:${ok ? C.okBg : C.redBg}"><div class="bx">${K(f)}</div><div class="bt">${l}</div><div class="bm" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 24, '#fff', 3)}</div></div>`).join('') +
  `<div class="pillp ink" id="zP" style="left:36px;top:470px">It builds only products of powers</div>`;
const tBd = BD.map(b => wt(...b[3]));
$('#eqs').innerHTML = [['M', 'one equation for mass'], ['L', 'one equation for length'], ['T', 'one equation for time']].map(([d, n], i) => `<div class="eqr" id="eq${i}" style="top:${84 + i * 76}px"><div class="ed">${d}</div><div class="et">${n}</div></div>`).join('');
$('#unks').innerHTML = ['a', 'b', 'c', 'd'].map((u, i) => `<div class="unk" id="uk${i}" style="left:${36 + i * 144}px;${i === 3 ? 'border-color:var(--red);color:var(--red)' : ''}">${u}</div>`).join('');
const tEq = [wt('Z4', 'M'), wt('Z4', 'L'), wt('Z4', 'T', 1)];

/* ---------- E: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${kk} = T \\,/\\, ${rlg}`)],
  [K(`l/${gg} = 2.45 \\,/\\, 9.8 = 0.25\\,\\text{s}^{2}`)],
  [K(`\\sqrt{0.25\\,\\text{s}^{2}} = 0.5\\,\\text{s}`)],
  [K(`${kk} = 3.14 \\,/\\, 0.5 = 6.28 = \\textcolor{${KC}}{2\\pi}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WPX = 130, WPV = [250, 100], WL = 2.45, WT = 2 * Math.PI * Math.sqrt(WL / G);
mk(w, 'rect', { x: 120, y: 86, width: 260, height: 14, rx: 3, fill: C.ink });
for (let x = 130; x < 380; x += 22) mk(w, 'line', { x1: x, y1: 86, x2: x + 12, y2: 74, stroke: C.dim, 'stroke-width': 2 });
mk(w, 'path', { d: `M${WPV[0] - WL * WPX * Math.sin(TH0)},${WPV[1] + WL * WPX * Math.cos(TH0)} A${WL * WPX},${WL * WPX} 0 0 0 ${WPV[0] + WL * WPX * Math.sin(TH0)},${WPV[1] + WL * WPX * Math.cos(TH0)}`, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const wgh = [0, 1, 2].map(() => mk(w, 'circle', { r: 20, fill: C.ink, opacity: 0 }));
const wstr = mk(w, 'line', { x1: WPV[0], y1: WPV[1], stroke: C.ink, 'stroke-width': 3 });
const wbob = mk(w, 'circle', { r: 20, fill: C.ac, stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'circle', { cx: WPV[0], cy: WPV[1], r: 6, fill: C.ink });
const wBr = mk(w, 'path', { d: `M${WPV[0] - 40},${WPV[1]} h-10 v${WL * WPX} h10`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(w, WPV[0] - 60, WPV[1] + WL * WPX / 2 + 8, 'l = 2.45 m', { 'text-anchor': 'end', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const tWs = T0('E2') + 0.6;   // release
const tWsol = [wt('E3', 'k', 1), wt('E4', 'l'), wt('E5', 'square'), wt('E6', 'So')];
const avE = PUC.avatar($('#sE'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The swing itself told us the 2π.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Dimensions match, so the formula is correct', right: 'Dimensions match: it may be right, not must be' });
$('#tvF').innerHTML = K(`s = ut + \\textcolor{${C.red}}{2}\\,\\textcolor{${GC}}{a}t^{2}`);
$('#tv0').innerHTML = M.icon('check', 20, '#1F6B3F', 3) + 'Dimensions'; $('#tv1').innerHTML = M.icon('x', 20, C.red, 3) + 'Physics';
const where = PUC.where($('#wa'), { on: [], type: 'Statement questions: which formula can it derive, and which can it not?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Which relation could dimensional analysis alone derive, apart from a number constant?', qW: 780,
  opts: [K('s = ut + \\tfrac{1}{2}at^{2}'), K('T = 2\\pi\\sqrt{l/g}'), K('N = N_0\\,e^{-\\lambda t}'), K('y = A\\sin(\\omega t - kx)')], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [['<b style="color:var(--red)">A</b>: a sum of two terms'], ['<b style="color:var(--red)">C</b>: an exponential'], ['<b style="color:var(--red)">D</b>: a sine'], ['<b style="color:var(--ok)">B</b>: one product of powers'], ['the 2π still needs experiment']], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'A'), wt('A2', 'C'), wt('A2', 'D'), wt('A3', 'Only'), wt('A3', 'experiment') - 0.6];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · limits of dimensional analysis', y0: 92, dy: 80, txt: [0, 1, 1, 1, 1],
  lines: [K(`T = ${kk}\\,${rlg} \\qquad [${kk}] = \\text{M}^{0}\\,\\text{L}^{0}\\,\\text{T}^{0}`),
    '<b>1.</b> Cannot find number constants like 2π or ½', '<b>2.</b> Right dimensions = only maybe right (work vs torque)', '<b>3.</b> Builds only products of powers: no sums, sin, log, eˣ', '<b>4.</b> Only 3 equations (M, L, T): 4 unknowns get stuck'] });
const YQ = ['Why can the method not find the 2π in the pendulum formula?', 'Work and torque have the same dimensions. What does that tell you?', 'Why can the method not derive s = ut + ½at²?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 11', topic: 'Is that extra zero worth anything? Significant Figures', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tM1 - 0.1, 1.12, 560, 560], [T1('M2') - 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  // ring around the 2 pi of the textbook formula, "?" after the method's answer
  const h1 = $('#hf1'), base = h1.querySelectorAll('.mord'), r2 = [...h1.querySelectorAll('.mord')].find(e => e.textContent === 'π');
  const box = $('#hr').getBoundingClientRect(), pb = r2.getBoundingClientRect();
  const two = [...base].find(e => e.textContent === '2');
  const tb = two.getBoundingClientRect(), cx = (tb.left + pb.right) / 2 - box.left, cy = (pb.top + pb.bottom) / 2 - box.top, rw = (pb.right - tb.left) / 2 + 22;
  Object.assign($('#ring2').style, { left: (cx - rw) + 'px', top: (cy - rw * 0.8) + 'px', width: 2 * rw + 'px', height: 1.6 * rw + 'px' });
  const h0 = $('#hf0'); $('#qmk').style.left = (36 + 24 + h0.offsetWidth + 30) + 'px'; $('#qmk').style.top = '120px';
  // C: chips under the real formula
  const tv0 = $('#tv0'); $('#tv1').style.left = (24 + tv0.offsetWidth + 16) + 'px';
}
const fmt = (v, d) => v.toFixed(d);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: tools with what they can and cannot read */
  TOOLS.forEach((_, i) => { M.vis($('#tl' + i), t, tTool[i] - 0.15, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }); M.vis($('#ty' + i), t, tTool[i] + 0.2, 1e9, { dx: -10, dy: 0 }); M.vis($('#tx' + i), t, tToolX[i] - 0.1, 1e9, { dx: -10, dy: 0 }); });

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hP'), t, wt('H3', 'depends') - 0.1, 1e9, POP);
    M.vis($('#hr'), t, wt('H3', 'Its') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hr0'), t, wt('H3', 'Its'), 1e9, { dy: 16 }); PUC.write($('#hf0'), t, wt('H3', 'depends'), 0.7);
    M.vis($('#hr1'), t, wt('H4', 'textbook') - 0.1, 1e9, { dy: 16 }); PUC.write($('#hf1'), t, wt('H4', 'equals'), 0.8);
    const rg = $('#ring2'), u = M.io((t - wt('H4', 'Where')) / 0.35); M.hide(rg, u <= 0); rg.style.opacity = u.toFixed(3); rg.style.transform = `scale(${(1.3 - 0.3 * u).toFixed(3)})`;
    M.vis($('#qmk'), t, wt('H5', 'method') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis($('#hB'), t, wt('H5', 'could') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [['dt0', 'Mass'], ['dt1', 'length'], ['dt2', 'time']].forEach(([id, wd]) => M.vis($('#' + id), t, wt('P2', wd) - 0.1, 1e9, POP));
    M.vis($('#nL'), t, wt('P4', 'never') - 0.1, 1e9, { dy: 10 });
    [0, 1, 2, 3, 4].forEach(i => M.vis($('#nu' + i), t, wt('P4', 'plain') - 0.1 + i * 0.1, 1e9, POP));
    M.vis($('#pr'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    CANS.forEach((_, i) => { const el = $('#cn' + i); M.vis(el, t, tCan[i] - 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.ck'), t, tCan[i] + 0.15, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#pP'), t, wt('P4', 'trouble') - 0.1, 1e9, POP);
  }

  /* S + M: pendulum bench, readout, graph, slow-mo */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const P = pend(t), L = P.l * PX, bx = PVX + L * Math.sin(P.th), by = PVY + L * Math.cos(P.th);
    attr(str, 'x2', bx.toFixed(1)); attr(str, 'y2', by.toFixed(1)); attr(bob, 'cx', bx.toFixed(1)); attr(bob, 'cy', by.toFixed(1));
    attr(arc, 'd', `M${(PVX - L * Math.sin(TH0)).toFixed(1)},${(PVY + L * Math.cos(TH0)).toFixed(1)} A${L.toFixed(1)},${L.toFixed(1)} 0 0 0 ${(PVX + L * Math.sin(TH0)).toFixed(1)},${(PVY + L * Math.cos(TH0)).toFixed(1)}`);
    attr(lvl, 'x1', (PVX + 26).toFixed(1)); attr(lvl, 'y1', (PVY + L).toFixed(1)); attr(lvl, 'y2', (PVY + L).toFixed(1));
    // ghost trails (sim time, only while swinging)
    const slow = t > tSlow && t < tD1;
    ghosts.forEach((gh, k) => {
      const dtk = (slow ? 0.25 : 1) * 0.07 * (k + 1), Q = P.tau > 0.2 ? pend(t - (slow ? 0.07 * (k + 1) : dtk)) : null;
      if (!Q || Q.i !== P.i || Math.abs(Q.th - P.th) < 0.01) { gh.s.style.opacity = 0; gh.b.style.opacity = 0; return; }
      const gx = PVX + L * Math.sin(Q.th), gy = PVY + L * Math.cos(Q.th);
      attr(gh.b, 'cx', gx.toFixed(1)); attr(gh.b, 'cy', gy.toFixed(1)); attr(gh.s, 'x1', PVX); attr(gh.s, 'y1', PVY); attr(gh.s, 'x2', gx.toFixed(1)); attr(gh.s, 'y2', gy.toFixed(1));
      gh.b.style.opacity = [0.3, 0.2, 0.12][k]; gh.s.style.opacity = [0.15, 0.1, 0.06][k];
    });
    // slow-mo vectors: v tangent (grows with speed), g straight down
    const sv = M.io((t - tSlow - 0.3) / 0.4);
    const vlen = 160 * P.om * L / PX * sv;   // v = L * omega (m/s) scaled
    if (sv > 0) { vA.set(bx, by, bx + vlen * Math.cos(P.th), by - vlen * Math.sin(P.th)); gA.set(bx, by + 22, bx, by + 22 + 56 * sv); }
    else { vA.set(0, 0, 0, 0); gA.set(0, 0, 0, 0); }
    attr(vL, 'x', (bx + vlen * Math.cos(P.th) + (vlen > 0 ? 10 : -30)).toFixed(1)); attr(vL, 'y', (by - 28).toFixed(1)); vL.style.opacity = (sv * M.clamp(Math.abs(vlen) / 40)).toFixed(3);
    attr(gL, 'x', (bx + 14).toFixed(1)); attr(gL, 'x', (bx + 14).toFixed(1)); attr(gL, 'y', (by + 76).toFixed(1)); gL.style.opacity = sv.toFixed(3);
    M.vis($('#smo'), t, tSlow, 1e9, POP);
    // dial + stopwatch
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = P.i === i && t > SEG[0].ts - 0.6 ? 1 : 0; sp.style.background = on ? C.ink : '#fff'; sp.style.color = on ? '#fff' : C.mute; sp.style.borderColor = on ? C.ink : C.line; });
    M.vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 10 });
    const sg = SEG[P.i], el = t < sg.ts ? 0 : Math.min(t - sg.ts, sg.T);
    M.vis($('#sw'), t, SEG[0].ts - 0.2, wt('S5', 'Every') + 0.1, POP); M.setT($('#swN'), fmt(el, 2));
    // readout
    M.setT($('#rl'), fmt(P.l, 2)); M.setT($('#rT'), fmt(el, 2)); M.setT($('#rr'), fmt(Math.sqrt(P.l / G), 3));
    const kOn = t >= wt('S5', 'Divide') - 0.1; ['#rkK', '#rk'].forEach(id => M.vis($(id), t, wt('S5', 'Divide') - 0.1, 1e9, { dx: -10, dy: 0 }));
    M.setT($('#rk'), kOn && el >= sg.T - 1e-6 ? '6.28' : kOn ? '...' : '');
    // graph: dot climbs at x = sqrt(l/g) as the stopwatch runs, then plants a point
    SEG.forEach((sgk, k) => { const done = t >= tSegT[k]; attr(gPts[k], 'cx', gr.X(sgk.r).toFixed(1)); M.hide(gPts[k], !done); attr(gPts[k], 'cy', gr.Y(sgk.T).toFixed(1)); });
    const run = t >= sg.ts && t < sg.ts + sg.T;
    gDot(sg.r, el, t >= sg.ts && t < tD1);
    attr(gStem, 'x1', gr.X(sg.r).toFixed(1)); attr(gStem, 'x2', gr.X(sg.r).toFixed(1)); attr(gStem, 'y1', gr.Y(0).toFixed(1)); attr(gStem, 'y2', gr.Y(el).toFixed(1)); M.hide(gStem, !run);
    M.draw(gLine, t, wt('S6', 'straight') - 0.3, 0.9);
    M.vis(gTag, t, wt('S6', 'slope') - 0.1, 1e9, POP);
    avS(t, wt('S5', 'Every') + 0.2, tM1 - 0.3);
  }

  /* D: let the method try */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o });
    PW.forEach((_, i) => { const el = $('#pw' + i); M.vis(el, t, tPw[i] - 0.15, 1e9, { dy: 14 }); PUC.write(el.querySelector('.pe'), t, tPw[i], 0.5); PUC.write(el.querySelector('.pr'), t, tPw[i] + 0.6, 0.5); });
    M.vis($('#stop'), t, wt('D5', 'method') - 0.2, 1e9, { dy: 20 });
  }

  /* R: why it stops, link by link */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    LKS.forEach((_, i) => { M.vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dy: 14 }); if (i) M.vis($('#la' + (i - 1)), t, tLk[i] - 0.25, 1e9, { dy: -8 }); });
    M.vis($('#lim1'), t, T0('L1') - 0.05, 1e9, POP);
    M.vis($('#rr'), t, T0('R4') - 0.2, out, { dx: 60, dy: 0, ...o });
    KCS.forEach((_, i) => { const el = $('#kc' + i); M.vis(el, t, tKc[i] - 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.km'), t, tKc[i] + 0.25, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#rrP'), t, wt('R5', 'cannot') - 0.1, 1e9, POP);
  }

  /* C: real vs fake, think */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#cf0'), t, wt('C2', 'equals') - 0.1, 0.8);
    $('#cd0').querySelectorAll('.dims').forEach((d, i) => M.vis(d, t, wt('C2', 'real') - 0.4 + i * 0.15, 1e9, POP));
    M.vis($('#cv0'), t, wt('C2', 'real'), 1e9, POP);
    M.vis($('#cr'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#cf1'), t, wt('C3', 'equals') - 0.1, 0.8);
    M.vis($('#cv1'), t, wt('C3', 'two', 1), 1e9, POP);
    const tb = wt('C3', 'replaced');
    M.vis($('#exC'), t, tb - 0.2, 1e9, { dy: 8 });
    [['cx0', 'cb0', 'bn0', 9], ['cx1', 'cb1', 'bn1', 36]].forEach(([x, b, n, v], i) => {
      M.vis($('#' + x), t, tb - 0.1, 1e9, { dy: 8 });
      const u = M.o3((t - tb - i * 0.5) / 0.9), wd = 15 * v * u; $('#' + b).style.width = wd.toFixed(1) + 'px'; M.hide($('#' + b), u <= 0);
      $('#' + n).style.left = (36 + wd + 14).toFixed(1) + 'px'; M.vis($('#' + n), t, tb + i * 0.5 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Yes') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Every') });
  }

  /* W: work vs torque, think */
  const wOn = t >= tW1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('W3');
    M.vis($('#wkl'), t, tW1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wkr'), t, wt('W1', 'torque') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tWk = wt('W2', 'Work'), tMv = wt('W2', 'distance'), u = M.io((t - tMv + 0.3) / 1.0), bx = M.lerp(BX0, BX1, u);
    attr(wBox, 'x', bx.toFixed(1));
    wGh.forEach((gb, k) => { const uk = M.io((t - 0.1 * (k + 1) - tMv + 0.3) / 1.0), gx = M.lerp(BX0, BX1, uk); attr(gb, 'x', gx.toFixed(1)); gb.style.opacity = Math.abs(gx - bx) > 3 ? [0.3, 0.2, 0.12][k] : 0; });
    const fOn = M.io((t - tWk) / 0.4), fl = 100 * fOn;
    wF.set(bx - 10 - fl, FLY - 45, bx - 10, FLY - 45); attr(wFL, 'x', (bx - 10 - fl / 2 - 10).toFixed(1)); wFL.style.opacity = fOn.toFixed(3);
    const du = M.io((t - tMv + 0.3) / 1.0); attr(wD, 'd', `M${BX0},${FLY + 26} v10 h${((BX1 - BX0) * du).toFixed(1)} v-10`); M.hide(wD, du <= 0);
    attr(wDL, 'x', (BX0 + (BX1 - BX0) * du / 2).toFixed(1)); wDL.style.opacity = du.toFixed(3);
    const tTq = wt('W2', 'Torque'), ph = 0.45 * M.io((t - wt('W2', 'arm') + 0.2) / 1.2), ex = PV[0] + RL * Math.cos(ph), ey = PV[1] - RL * Math.sin(ph);
    attr(rod, 'x2', ex.toFixed(1)); attr(rod, 'y2', ey.toFixed(1));
    const tf = M.io((t - tTq) / 0.4), fl2 = 100 * tf, nx_ = -Math.sin(ph), ny_ = -Math.cos(ph);
    tqF.set(ex - nx_ * (14 + fl2), ey - ny_ * (14 + fl2), ex - nx_ * 14, ey - ny_ * 14); attr(tFL, 'x', (ex - nx_ * (fl2 + 20) + 16).toFixed(1)); attr(tFL, 'y', (ey - ny_ * (fl2 + 20) + 10).toFixed(1)); tFL.style.opacity = tf.toFixed(3);
    const ru = M.io((t - wt('W2', 'arm')) / 0.5), bxr = Math.sin(ph) * 40, byr = Math.cos(ph) * 40;
    attr(tR, 'd', `M${(PV[0] + bxr).toFixed(1)},${(PV[1] + byr).toFixed(1)} L${(PV[0] + bxr + (ex - PV[0]) * ru).toFixed(1)},${(PV[1] + byr + (ey - PV[1]) * ru).toFixed(1)}`); M.hide(tR, ru <= 0);
    attr(tRL, 'x', (PV[0] + bxr * 1.9 + (ex - PV[0]) / 2).toFixed(1)); attr(tRL, 'y', (PV[1] + byr * 1.9 + (ey - PV[1]) / 2 + 10).toFixed(1)); tRL.style.opacity = ru.toFixed(3);
    M.draw(tqArc, t, wt('W2', 'arm') - 0.2, 1.2);
    PUC.write($('#wd0'), t, T0('W3') - 0.05, 0.7); PUC.write($('#wd1'), t, T0('W3') + 0.5, 0.7);
    M.vis($('#th2'), t, wt('W3', 'Can') - 0.1, OUT('Z1'), { dy: 36, ...o });
    th2(t, { tin: wt('W3', 'Can') - 0.1, tOpts: wt('W3', 'apart') - 0.2, tCount: T1('W3') + 0.05, dur: 3, tAns: T0('W4') - 0.02, tWhy: wt('W4', 'Same') });
  }

  /* Z: limitations 3 and 4 */
  const zOn = t >= tZ1 - 0.1 && t < tT + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    M.vis($('#zl'), t, tZ1 + 0.05, 1e9, { dx: -60, dy: 0 });
    BD.forEach((_, i) => { const el = $('#bd' + i); M.vis(el, t, tBd[i] - 0.2, 1e9, { dy: 14 }); M.vis(el.querySelector('.bm'), t, tBd[i] + 0.2, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#zP'), t, wt('Z3', 'pure') - 0.1, 1e9, POP);
    M.vis($('#zr'), t, T0('Z4') - 0.1, 1e9, { dx: 60, dy: 0 });
    tEq.forEach((tt, i) => M.vis($('#eq' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    [0, 1, 2, 3].forEach(i => M.vis($('#uk' + i), t, wt('Z5', i < 3 ? 'three' : 'four') + (i < 3 ? i * 0.12 : 0), 1e9, POP));
    M.vis($('#stuck'), t, wt('Z5', 'stuck') - 0.1, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tE1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tE1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Wrong') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.rise($('#stF'), t, wt('T1', 'Right') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* E: worked example */
  const eOn = t >= tE1 - 0.1 && t < tX1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('E2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tE1, tWsol);
    M.vis($('#wr'), t, T0('E2') + 0.1, out, { dx: 60, dy: 0, ...o });
    const ww = 2 * Math.PI / WT, tau = Math.max(0, t - tWs), th = TH0 * Math.cos(ww * tau), L = WL * WPX;
    const bx = WPV[0] + L * Math.sin(th), by = WPV[1] + L * Math.cos(th);
    attr(wstr, 'x2', bx.toFixed(1)); attr(wstr, 'y2', by.toFixed(1)); attr(wbob, 'cx', bx.toFixed(1)); attr(wbob, 'cy', by.toFixed(1));
    wgh.forEach((gc, k) => { const tk = Math.max(0, tau - 0.08 * (k + 1)), thk = TH0 * Math.cos(ww * tk); attr(gc, 'cx', (WPV[0] + L * Math.sin(thk)).toFixed(1)); attr(gc, 'cy', (WPV[1] + L * Math.cos(thk)).toFixed(1)); gc.style.opacity = tau > 0.3 ? [0.3, 0.2, 0.12][k] : 0; });
    M.vis($('#wSw'), t, tWs - 0.3, 1e9, POP); M.setT($('#wSwN'), fmt(Math.min(tau, 3.14), 2));
    M.vis($('#kRes'), t, wt('E6', 'pi') - 0.1, 1e9, POP);
    avE(t, wt('E6', 'measuring') + 0.2, out);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('G1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'dimensions') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'only') - 0.1 });
    M.vis($('#tv'), t, wt('X3', 'wrong', 1) - 0.3, 1e9, { dy: 16 }); PUC.write($('#tvF'), t, wt('X3', 'wrong', 1) - 0.2, 0.6);
    M.vis($('#tv0'), t, wt('X3', 'number') - 0.1, 1e9, POP); M.vis($('#tv1'), t, wt('X3', 'hide') - 0.1, 1e9, POP);
    where(t, { tin: T0('G1'), tLight: [], tType: wt('G1', 'statement') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
