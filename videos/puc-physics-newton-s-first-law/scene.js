// PUC Physics Ep 51: Newton's first law (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, VC = C.ac, XC = C.violet, AC = C.red, IK = C.ink;     // canon: F orange, v blue, x violet, a red, numbers ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const lab = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ fill: col, 'font-size': 19, 'font-weight': 600 }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2), nz = s => s.replace(/^-(0\.0+)$/, '$1');
const G = 9.8;
const Fv = tc(FC, '\\vec{F}'), av = tc(AC, '\\vec{a}'), vv = tc(VC, '\\vec{v}');
const mkFloor = (p, y, x0 = 40, x1 = 744) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

Object.assign(M.IC, {
  bus: ['M4 6h14a2 2 0 0 1 2 2v8H2V8a2 2 0 0 1 2-2Z', 'M2 11h18', 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M16 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  puck: ['M12 9c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z', 'M4 12v2c0 1.7 3.6 3 8 3s8-1.3 8-3v-2'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tB1 = T0('B1'), tK3 = T0('K3'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tB1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bus', 'Bus brakes', 'EVERYONE LURCHES FORWARD', 'brakes'], ['bus', 'Bus starts', 'EVERYONE FALLS BACK', 'starts'], ['puck', 'Puck on ice', 'GLIDES ON AND ON', 'puck']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="270" height="92"></svg></div>`).join('');
const jsEl = [];
[0, 1].forEach(i => { const s = $('#js' + i); mk(s, 'rect', { x: 40, y: 10, width: 200, height: 66, rx: 10, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); [80, 200].forEach(x => mk(s, 'circle', { cx: x, cy: 80, r: 9, fill: C.ink }));
  const lean = i ? -18 : 18, fx = 140, fy = 72, hx = fx + 44 * Math.sin(lean * Math.PI / 180), hy = fy - 44 * Math.cos(lean * Math.PI / 180);
  const g = mk(s, 'g', {}); mk(g, 'line', { x1: fx, y1: fy, x2: hx, y2: hy, stroke: C.ac, 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: hx + 6 * Math.sin(lean * Math.PI / 180), cy: hy - 8, r: 8, fill: C.ac }); jsEl.push(g);
  const a = PUC.arrow(s, AC, 4, 12); if (i) a.set(10, 44, 34, 44); else a.set(266, 44, 244, 44); jsEl.push(a.g); });
{ const s = $('#js2'); mk(s, 'line', { x1: 10, y1: 84, x2: 260, y2: 84, stroke: C.dim, 'stroke-width': 2.5 }); [30, 90, 150, 210].forEach((x, k) => jsEl.push(mk(s, 'ellipse', { cx: x + 14, cy: 72, rx: 18, ry: 7, fill: C.ink, opacity: [0.12, 0.2, 0.3, 1][k] }))); }
const TILES = [[C.ink, 'Bike stops', 'bike'], [C.ink, 'Bottle flies on. Why?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'bicycle'), wt('H4', 'bottle'), wt('H4', 'why')];

/* ---------- P: the law ---------- */
$('#nwF').innerHTML = K(`\\Sigma ${Fv} = 0 \\;\\Rightarrow\\; \\Delta ${vv} = 0`);
const tLw = [wt('P3', 'stays'), wt('P3', 'keeps'), wt('P3', 'straight'), wt('P4', 'unless'), wt('P4', 'change')];

/* ---------- S: sliding block, friction turned down to zero ---------- */
const s = $('#sS2'), FY = 380, SC = 75, X0 = 50, BW = 80, BH = 64, MASS = 2, V0 = 4;
const MU = [0.4, 0.2, 0.1, 0];
$('#dial').innerHTML = `<span style="border:none;background:none;padding:0 4px;color:${IK}">μ =</span>` + MU.map(m => `<span>${m}</span>`).join('');
mkFloor(s, FY, 20, 764);
const rough = mk(s, 'path', { d: (() => { let d = ''; for (let x = 20; x < 764; x += 10) d += `M${x},${FY} l5,-5 l5,5 `; return d; })(), stroke: C.ink2, 'stroke-width': 2, fill: 'none' });
const sGh = [0.12, 0.2, 0.3].map(o => mk(s, 'rect', { y: FY - BH, width: BW, height: BH, rx: 8, fill: C.ink, opacity: 0 }));
const blk = mk(s, 'rect', { y: FY - BH, width: BW, height: BH, rx: 8, fill: C.ink });
const blkL = txt(s, 0, FY - BH / 2 + 6, '2 kg', { fill: '#fff', 'font-size': 17, 'font-weight': 600, 'text-anchor': 'middle' });
const sV = PUC.arrow(s, VC, 5, 16), sVl = it(s, 0, 0, 'v', VC, { 'font-size': 26 });
const sFr = PUC.arrow(s, FC, 6, 18), sFrl = lab(s, 0, FY + 44, '', FC, { 'text-anchor': 'middle' });
const sW = PUC.arrow(s, FC, 6, 18), sN = PUC.arrow(s, FC, 6, 18);
const sWl = lab(s, 0, 0, 'W = mg = 19.6 N', FC), sNl = lab(s, 0, 0, 'N = 19.6 N', FC), sF0 = lab(s, 0, 0, 'friction = 0', FC);
const sStb = [1, 2, 3, 4, 5, 6, 7].map(j => mk(s, 'rect', { x: X0 + V0 * 0.25 * j * SC, y: FY - BH, width: BW, height: BH, rx: 8, fill: C.ink, opacity: 0.16 }));
const sFlr = lab(s, 392, FY + 62, '', IK, { 'text-anchor': 'middle', 'font-size': 22 });
const sStl = lab(s, 392, 200, 'FLASH EVERY 0.25 S: EQUAL GAPS', VC, { 'text-anchor': 'middle' });
const RUN = [wt('S2', 'friction'), wt('S3', 'Less'), wt('S4', 'Smoother')]; RUN.push(Math.max(wt('S5', 'zero'), RUN[2] + V0 / (0.1 * G) + 0.4));
const runAt = t => { let k = -1; RUN.forEach((tt, i) => { if (t >= tt) k = i; }); return k; };
const st = (mu, tau) => { const a = mu * G; if (tau <= 0) return { x: 0, v: V0, a: -a }; if (a > 0 && tau >= V0 / a) return { x: V0 * V0 / (2 * a), v: 0, a: 0 }; return { x: V0 * tau - 0.5 * a * tau * tau, v: V0 - a * tau, a: -a }; };
// slow-mo replay of the friction-free run: 0.25x, freeze, forces, resume
const tFz = wt('S7', 'Freeze'), tRes = wt('S9', 'nothing'), RS = 0.25, TAUF = RS * (tFz - tS7);
const sTau = t => { if (t < tS7) { const k = runAt(t); return k < 0 ? 0 : t - RUN[k]; } if (t < tFz) return RS * (t - tS7); if (t < tRes) return TAUF; return TAUF + RS * (t - tRes); };
$('#roA').innerHTML = `<span class="k" style="color:${IK}">μ</span><span class="v" id="r_mu">0.4</span><span class="u"></span>
  <span class="k" style="color:${IK}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="r_x" style="color:${XC}">0.00</span><span class="u">m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">4.00</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">-3.92</span><span class="u">m/s²</span>
  <span class="k" style="color:${FC}">F<sub style="font-style:normal">net</sub></span><span class="v" id="r_f" style="color:${FC}">-7.84</span><span class="u">N</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 560, h: 156, xmax: 5, ymax: 5, xt: [0, 1, 2, 3, 4, 5], yt: [0, 2, 4], xl: 't (s)', yl: 'v (m/s)' });
const gCur = g.curve(VC), gGh = [0, 1, 2].map(() => g.curve(VC, 4)), gDot = g.dot(VC, 10);
const gGhP = [...$('#grS').querySelectorAll('path')].slice(-3);
const gTags = MU.map(m => lab($('#grS'), 0, 0, 'μ = ' + m, IK, { 'font-size': 17 }));
const gFlat = lab($('#grS'), 676, g.Y(4) - 14, 'flat: v stays 4', VC, { 'text-anchor': 'end', 'font-size': 18 });
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'No friction, and it never slows!' });

/* ---------- D: the law in steps ---------- */
const STEPS = [[`\\Sigma ${Fv} = 0`, 'add every force: they cancel'], [`\\Rightarrow\\; ${av} = 0`, 'no acceleration'], [`\\Rightarrow\\; ${vv} = \\text{constant}`, 'v = 0 stays 0: rest is a special case']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:132px"></div>` + STEPS.map(([f, w], i) => `<div class="dst" id="dst${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Add'), wt('D3', 'Zero'), wt('D4', 'So')];
const dg = PUC.graph($('#drS'), { x: 110, y: 110, w: 560, h: 300, xmax: 5, ymax: 5, xt: [0, 1, 2, 3, 4, 5], yt: [0, 2, 4], xl: 't (s)', yl: 'v (m/s)' });
const dC1 = dg.curve(VC), dC2 = dg.curve(VC);
const dL1 = lab($('#drS'), dg.X(5), dg.Y(4) - 16, 'MOVING · v = 4 m/s, constant', VC, { 'text-anchor': 'end' }), dL2 = lab($('#drS'), dg.X(5), dg.Y(0) - 16, 'AT REST · v = 0, constant', VC, { 'text-anchor': 'end' });
const dP = lab($('#drS'), 392, 520, 'BOTH: a = 0, NET FORCE = 0', AC, { 'text-anchor': 'middle', 'font-size': 22 });
const tDl = [wt('D4', 'constant'), wt('D4', 'Rest')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\Sigma ${Fv} = 0 \\;\\Rightarrow\\; ${vv} = \\text{constant}`);

/* ---------- B: the bus (link by link) ---------- */
const b = $('#bS'), BF = 410, BSC = 40;      // bus floor y, 40 px per metre for the road
const road = mk(b, 'line', { x1: 0, y1: 470, x2: 784, y2: 470, stroke: C.ink, 'stroke-width': 3 });
const dash = mk(b, 'line', { x1: 0, y1: 500, x2: 784, y2: 500, stroke: C.dim, 'stroke-width': 6, 'stroke-dasharray': '40 40' });
mk(b, 'rect', { x: 40, y: 180, width: 704, height: 250, rx: 26, fill: '#EEF4FD', stroke: C.ink, 'stroke-width': 4 });
[0, 1, 2, 3].forEach(k => mk(b, 'rect', { x: 80 + k * 160, y: 204, width: 120, height: 80, rx: 10, fill: '#fff', stroke: C.ink2, 'stroke-width': 2 }));
mk(b, 'line', { x1: 40, y1: BF, x2: 744, y2: BF, stroke: C.ink, 'stroke-width': 3 });
const wheels = [160, 620].map(x => { const w = mk(b, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r: 34, fill: C.ink }); mk(w, 'line', { x1: -22, y1: 0, x2: 22, y2: 0, stroke: '#8D99AE', 'stroke-width': 4 }); mk(w, 'line', { x1: 0, y1: -22, x2: 0, y2: 22, stroke: '#8D99AE', 'stroke-width': 4 }); return [w, x]; });
const pas = mk(b, 'g', {}); const PX = 392;
const pLegs = mk(pas, 'path', { d: '', stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
const pBody = mk(pas, 'path', { d: '', stroke: C.ac, 'stroke-width': 14, 'stroke-linecap': 'round', fill: 'none' });
const pHead = mk(pas, 'circle', { r: 20, fill: C.ac });
const bBr = PUC.arrow(b, FC, 6, 18), bBrl = lab(b, 0, 0, '', FC, { 'text-anchor': 'middle' });
const bFt = PUC.arrow(b, FC, 5, 14), bFtl = lab(b, 0, 0, 'friction on feet', FC, { 'text-anchor': 'middle', 'font-size': 17 });
const bBv = PUC.arrow(b, VC, 5, 16), bBvl = lab(b, 0, 0, 'keeps moving', VC, { 'font-size': 17 });
// bus speed: cruise 8 m/s, brake at -4 m/s^2 to rest, then start at +3 m/s^2 to 6 m/s
const tBr = wt('B2', 'brakes'), tSt = wt('B6', 'starts'), VB0 = 8, AB = Math.round(10 * VB0 / (wt('B5', 'lurch') + 0.6 - wt('B2', 'brakes'))) / 10, AS = 1.5;
const bv = t => { if (t < tBr) return VB0; if (t < tBr + VB0 / AB) return VB0 - AB * (t - tBr); if (t < tSt) return 0; return Math.min(6, AS * (t - tSt)); };
const ba = t => { if (t >= tBr && t < tBr + VB0 / AB) return -AB; if (t >= tSt && t < tSt + 2) return AS; return 0; };
const bx = t => { const t0 = tB1 - 0.5; let x = 0; const n = 400; const T = t - t0; if (T <= 0) return 0; for (let i = 0; i < n; i++) x += bv(t0 + T * (i + 0.5) / n) * T / n; return x; };
const lean = M.track(0, [[tBr, 16, [7, 0.8]], [tBr + VB0 / AB, 0, [7, 0.8]], [tSt, -14, [7, 0.8]], [tSt + 2, 0, [7, 0.8]]], [7, 0.8]);
$('#bro').innerHTML = `<span class="k" style="color:${VC}">v<sub style="font-style:normal">bus</sub></span><span class="v" id="b_v" style="color:${VC}">8.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a<sub style="font-style:normal">bus</sub></span><span class="v" id="b_a" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
const LK = [['The brakes slow the bus', 'FORCE ON BUS'], ['Floor friction slows your feet', 'FORCE ON FEET'], ['Nothing slows your upper body', 'NO FORCE'], ['It keeps moving: you lurch forward', 'FIRST LAW']];
$('#lks').innerHTML = LK.map(([a, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 98}px;font-size:26px"><div class="ln">${i + 1}</div><span>${a}</span><span class="lt2">${tg}</span></div>`).join('') +
  [0, 1, 2].map(i => `<div class="lka" id="lka${i}" style="top:${160 + i * 98}px">${M.icon('arrowD', 22, C.mute, 2.6)}</div>`).join('');
const tLk = [wt('B2', 'act'), wt('B3', 'Friction'), wt('B4', 'nothing'), wt('B5', 'lurch')];
const th1 = PUC.think($('#th1'), { q: 'A bus takes a sharp left turn. Which way do standing passengers lean?', opts: ['Left', 'Right'], right: 1, why: 'Your body keeps going straight while the bus turns left.' });

/* ---------- V: side by side ---------- */
const vb = $('#vbS');
mk(vb, 'rect', { x: 180, y: 330, width: 420, height: 22, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
[210, 550].forEach(x => mk(vb, 'rect', { x, y: 352, width: 20, height: 110, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 }));
mkFloor(vb, 462);
const book = mk(vb, 'rect', { x: 330, y: 290, width: 120, height: 40, rx: 4, fill: C.ac, stroke: C.ink, 'stroke-width': 2.5 });
const vbW = PUC.arrow(vb, FC, 6, 18), vbN = PUC.arrow(vb, FC, 6, 18);
const vbWl = it(vb, 404, 420, 'W', FC, { 'font-size': 28 }), vbNl = it(vb, 404, 196, 'N', FC, { 'font-size': 28 });
const vbV = lab(vb, 392, 140, 'v = 0, AND IT STAYS 0', VC, { 'text-anchor': 'middle', 'font-size': 21 });
const vc = $('#vcS');
const vcRoad = mk(vc, 'line', { x1: 0, y1: 400, x2: 784, y2: 400, stroke: C.ink, 'stroke-width': 3 });
const vcDash = mk(vc, 'line', { x1: 0, y1: 430, x2: 784, y2: 430, stroke: C.dim, 'stroke-width': 6, 'stroke-dasharray': '40 40' });
const car = mk(vc, 'g', {});
mk(car, 'path', { d: 'M262,372 V322 Q262,312 274,310 L320,306 L356,266 H448 L492,306 L520,312 Q532,316 532,328 V372 Z', fill: C.ac, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(car, 'path', { d: 'M366,276 H402 V304 H338 Z M412,276 H442 L474,304 H412 Z', fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
const cwh = [312, 482].map(x => { const w = mk(vc, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r: 26, fill: C.ink }); mk(w, 'line', { x1: -16, y1: 0, x2: 16, y2: 0, stroke: '#8D99AE', 'stroke-width': 3 }); mk(w, 'line', { x1: 0, y1: -16, x2: 0, y2: 16, stroke: '#8D99AE', 'stroke-width': 3 }); return [w, x]; });
const vcF = PUC.arrow(vc, FC, 6, 18), vcD = PUC.arrow(vc, FC, 6, 18), vcW = PUC.arrow(vc, FC, 6, 18), vcN = PUC.arrow(vc, FC, 6, 18), vcV = PUC.arrow(vc, VC, 5, 16);
const vcFl = lab(vc, 640, 300, 'push', FC), vcDl = lab(vc, 150, 300, 'drag', FC, { 'text-anchor': 'end' }), vcWl = it(vc, 410, 470, 'W', FC, { 'font-size': 26 }), vcNl = it(vc, 410, 196, 'N', FC, { 'font-size': 26 });
const vcVl = lab(vc, 392, 120, 'v = CONSTANT', VC, { 'text-anchor': 'middle', 'font-size': 21 });
const th2 = PUC.think($('#th2'), { q: 'A car moves at a steady 60 km/h on a straight road. What is the net force on it?', opts: ['Forward', 'Zero', 'Backward'], right: 1, why: 'No acceleration, so the forward push balances the drag.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A ${K('1200\\ \\text{kg}')} car cruises at a steady ${K(tc(VC, '20\\ \\text{m/s}'))}. Friction and air drag total ${K(tc(FC, '600\\ \\text{N}'))}. Find the driving force and the normal force. Take ${K('g = 9.8\\ \\text{m/s}^2')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${vv} = \\text{constant} \\;\\Rightarrow\\; \\Sigma ${Fv} = 0`)],
  [K(`${tc(FC, 'F_{\\text{drive}}')} = ${tc(FC, 'f')} = ${tc(FC, '600\\ \\text{N}')}`)],
  [K(`${tc(FC, 'N')} = mg = 1200 \\times 9.8`)],
  [K(`${tc(FC, 'N')} = ${tc(FC, '11{,}760\\ \\text{N}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS');
mk(w, 'line', { x1: 40, y1: 400, x2: 744, y2: 400, stroke: C.ink, 'stroke-width': 3 });
const wcar = mk(w, 'g', {}); wcar.innerHTML = car.innerHTML; [312, 482].forEach(x => { mk(w, 'circle', { cx: x, cy: 374, r: 26, fill: C.ink }); });
const wF = PUC.arrow(w, FC, 6, 18), wD = PUC.arrow(w, FC, 6, 18), wWa = PUC.arrow(w, FC, 6, 18), wNa = PUC.arrow(w, FC, 6, 18);
const wFl = lab(w, 560, 310, 'F = 600 N', FC), wDl = lab(w, 230, 310, 'f = 600 N', FC, { 'text-anchor': 'end' }), wWl = lab(w, 410, 490, 'W = 11,760 N', FC), wNl = lab(w, 410, 150, 'N = 11,760 N', FC);
const tW = [T0('W3'), T0('W4'), T0('W5'), wt('W5', 'eleven')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Net force zero, so the body must be at rest', right: 'Net force zero: at rest OR moving at constant velocity' });
const tp = $('#tpS'); mk(tp, 'line', { x1: 40, y1: 200, x2: 600, y2: 200, stroke: C.ink, 'stroke-width': 3 });
const tpA = mk(tp, 'rect', { x: 100, y: 150, width: 80, height: 50, rx: 8, fill: C.ink }), tpB = mk(tp, 'rect', { x: 380, y: 150, width: 80, height: 50, rx: 8, fill: C.ink });
const tpV = PUC.arrow(tp, VC, 5, 16), tpVl = lab(tp, 470, 132, 'v constant', VC), tpRl = lab(tp, 140, 132, 'v = 0', VC, { 'text-anchor': 'middle' });
const tpS = lab(tp, 320, 60, 'BOTH HAVE ΣF = 0', C.ok, { 'text-anchor': 'middle', 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Concept MCQs on net force, and finding a missing force for steady motion' });
const NB = h => `<span style="white-space:nowrap">${h}</span>`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 372,
  q: `A ${K('2\\ \\text{kg}')} particle moves with constant velocity ${NB(K(tc(VC, '(3\\hat{i} + 4\\hat{j})\\ \\text{m/s}')))}. Two of the forces on it are ${NB(K(tc(FC, '(2\\hat{i} - 3\\hat{j})\\ \\text{N}')))} and ${NB(K(tc(FC, '(-5\\hat{i} + \\hat{j})\\ \\text{N}')))}. The third force is:`,
  opts: [K('(-3\\hat{i} - 2\\hat{j})\\ \\text{N}'), K('(3\\hat{i} + 2\\hat{j})\\ \\text{N}'), K('(-3\\hat{i} + 2\\hat{j})\\ \\text{N}'), K('(6\\hat{i} + 8\\hat{j})\\ \\text{N}')], right: 1 });
const so = PUC.solution($('#so'), [[K(`${vv}\\ \\text{const} \\Rightarrow \\Sigma ${Fv} = 0`)], [K(`${tc(FC, '\\vec{F}_1 + \\vec{F}_2')} = -3\\hat{i} - 2\\hat{j}`)], [K(`${tc(FC, '\\vec{F}_3')} = -(${tc(FC, '\\vec{F}_1 + \\vec{F}_2')})`)], [K(`${tc(FC, '\\vec{F}_3')} = ${tc(C.ok, '3\\hat{i} + 2\\hat{j}')}\\ \\text{N}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A4', 'third'), wt('A4', 'Plus')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: "Recap · Newton's first law", y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\Sigma ${Fv} = 0 \\;\\Rightarrow\\; ${av} = 0 \\;\\Rightarrow\\; ${vv} = \\text{constant}`),
    'No net force: rest stays rest, steady motion stays steady',
    '<b>Rest</b> (v = 0) is just a special case of constant velocity',
    '<b>Bus brakes</b>: feet slow, the body keeps moving, you lurch forward'] });
const YQ = ['Why does the bottle fly out of the basket when Aarav brakes?', 'A car moves at a steady speed in a straight line. What is the net force?', 'Why do you fall back when a bus starts suddenly?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 52', topic: "How much change does a net force make? Newton's Second Law", y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFz - 0.2, 1.06, 960, 540], [tRes + 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    jsEl.forEach((el, k) => M.hide(el, t < tMorph + 0.7 + k * 0.12));
    vis($('#hjP'), t, wt('H2', 'law') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq1').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#lw'), t, tP1 + 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#nw'), t, T0('P2') - 0.1, out, { dx: -60, dy: 0, ...o }); M.rise($('#nwQ'), t, wt('P2', 'building') - 0.05, { st: 0.05 });
    tLw.forEach((tt, i) => M.rise($('#lw' + i), t, tt - 0.15, { st: 0.05 }));
    vis($('#nw2'), t, wt('P4', 'short') - 0.3, out, { dx: -60, dy: 0, ...o }); PUC.write($('#nwF'), t, wt('P4', 'net'), 0.8);
    vis($('#lwP'), t, wt('P4', 'velocity') + 0.2, 1e9, POP);
  }

  /* S: sliding block */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const k0 = runAt(t), k = t >= tS7 ? 3 : k0, mu = k < 0 ? MU[0] : MU[k], tau = sTau(t), S = st(mu, tau);
    const X = X0 + S.x * SC;
    attr(blk, 'x', X.toFixed(1)); attr(blkL, 'x', (X + BW / 2).toFixed(1)); vis(blk, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.2 }); vis(blkL, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const moving = S.v > 0 && k >= 0;
    sGh.forEach((gh, j) => { const q = st(mu, tau - (t < tS7 ? 0.08 : 0.32) * (j + 1)); const gx = X0 + q.x * SC; attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = moving && tau > 0.05 && X - gx > 3 && !(t > tFz && t < tRes) ? [0.3, 0.2, 0.12][j] : 0; });
    rough.style.opacity = (mu / 0.4).toFixed(3);
    M.setT(sFlr, k < 0 ? '' : ['ROUGH FLOOR', 'SMOOTHER FLOOR', 'SMOOTHER STILL', 'FRICTION SWITCHED OFF'][k]); M.hide(sFlr, t > tS7);
    $('#dial').querySelectorAll('span').forEach((sp, i) => { if (!i) return; const on = (k < 0 ? 0 : k) === i - 1 ? 1 : 0; sp.style.background = on ? IK : '#fff'; sp.style.color = on ? '#fff' : C.mute; sp.style.borderColor = on ? IK : C.line; });
    vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const vl = S.v * 26 * (k >= 0 ? 1 : 0); sV.set(X + BW + 6, FY - BH / 2, X + BW + 6 + vl, FY - BH / 2); attr(sVl, 'x', (X + BW + 10).toFixed(1)); attr(sVl, 'y', FY - BH - 10); sVl.style.opacity = vl > 2 ? 1 : 0;
    const fr = mu * MASS * G, frOn = moving && mu > 0 ? 1 : 0; sFr.set(X + BW / 2, FY - 6, X + BW / 2 - fr * 9 * frOn, FY - 6);
    attr(sFrl, 'x', (X + BW / 2 - 20).toFixed(1)); M.setT(sFrl, 'friction ' + f2(fr) + ' N'); sFrl.style.opacity = frOn;
    // slow-mo: W and N, balanced
    vis($('#smo'), t, tS7 + 0.05, out, { ...POP, sc: 0.8 });
    const uw = M.o3((t - wt('S8', 'Weight') + 0.1) / 0.4) * (t > tS7 ? 1 : 0), un = M.o3((t - wt('S8', 'floor') + 0.1) / 0.4) * (t > tS7 ? 1 : 0), cx = X + BW / 2;
    sW.set(cx, FY - BH / 2, cx, FY - BH / 2 + 110 * uw); if (uw > 0.01) M.hide(blkL, true); sN.set(cx, FY - BH / 2, cx, FY - BH / 2 - 110 * un);
    attr(sWl, 'x', (cx + 14).toFixed(1)); attr(sWl, 'y', FY + 40); sWl.style.opacity = uw.toFixed(3); attr(sNl, 'x', (cx + 14).toFixed(1)); attr(sNl, 'y', FY - BH / 2 - 90); sNl.style.opacity = un.toFixed(3);
    attr(sF0, 'x', (cx - 210).toFixed(1)); attr(sF0, 'y', FY - BH - 40); vis(sF0, t, wt('S9', 'friction') - 0.1, 1e9, { dy: 6 });
    sStb.forEach((sb, j) => M.hide(sb, !(k === 3 && t < tS7 && tau > 0.25 * (j + 1)))); M.hide(sStl, !(k === 3 && t < tS7 && tau > 0.6));
    // readout (time rounded first)
    const tr = Math.round(Math.max(0, tau) * 100) / 100, R = st(mu, tr), stopped = R.v <= 0;
    M.setT($('#r_mu'), String(mu)); M.setT($('#r_t'), f2(tr)); M.setT($('#r_x'), f2(R.x)); M.setT($('#r_v'), f2(R.v));
    M.setT($('#r_a'), nz(f2(stopped ? 0 : -mu * G))); M.setT($('#r_f'), nz(f2(stopped ? 0 : -mu * MASS * G)));
    // graph
    const e = Math.min(Math.max(0, tau), 5); if (k >= 0) { gCur(q => [q, st(mu, q).v], 0, e, 80); gDot(e, st(mu, e).v, true); } else { gCur(q => [0, 0], 0, 0); gDot(0, V0, t > tS1 + 0.6); }
    gGh.forEach((f, j) => { if (k > j) { const ee = Math.min(5, (RUN[j + 1] - RUN[j]) - 0.1); f(q => [q, st(MU[j], q).v], 0, ee, 80); gGhP[j].style.opacity = 0.25; } else f(q => [0, 0], 0, 0); });
    gTags.forEach((tg, j) => { const show = k === j; if (show) { attr(tg, 'x', (g.X(e) + 10).toFixed(1)); attr(tg, 'y', (g.Y(st(mu, e).v) - 10).toFixed(1)); } M.hide(tg, !show || j === 3); });
    vis(gFlat, t, wt('S6', 'flat') - 0.1, 1e9, { dy: 6 });
    avS(t, wt('S6', 'watch') + 0.3, OUT('S7'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 240], [tStep[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u1 = 5 * M.io((t - tDl[0] + 0.2) / 1.0), u2 = 5 * M.io((t - tDl[1] + 0.2) / 1.0);
    dC1(q => [q, 4], 0, u1); dC2(q => [q, 0.04], 0, u2);
    vis(dL1, t, tDl[0] + 0.4, 1e9, { dy: 6 }); vis(dL2, t, tDl[1] + 0.4, 1e9, { dy: 6 }); vis(dP, t, tDl[1] + 1.0, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tB1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tB1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Zero') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'not') - 0.1, 0.8);
  }

  /* B: the bus */
  const bOn = t >= tB1 - 0.1 && t < tV1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('K3');
    vis($('#bsim'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#exB'), t, tB1 + 0.4, 1e9, { dy: 8 });
    vis($('#bch'), t, tB1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const X = bx(t) * BSC; attr(dash, 'stroke-dashoffset', (X % 80).toFixed(1));
    wheels.forEach(([wl, x]) => wl.setAttribute('transform', `translate(${x},440) rotate(${((X / 34) * 180 / Math.PI % 360).toFixed(1)})`));
    const ang = lean(t) * Math.PI / 180, FX = PX, FYb = BF, hx = FX + 130 * Math.sin(ang), hy = FYb - 70 - 130 * Math.cos(ang) + 70;
    attr(pLegs, 'd', `M${FX - 14},${FYb} L${FX},${FYb - 70} L${FX + 14},${FYb}`);
    const hipX = FX, hipY = FYb - 70, shX = hipX + 110 * Math.sin(ang), shY = hipY - 110 * Math.cos(ang);
    attr(pBody, 'd', `M${hipX},${hipY} L${shX.toFixed(1)},${shY.toFixed(1)}`); attr(pHead, 'cx', (hipX + 142 * Math.sin(ang)).toFixed(1)); attr(pHead, 'cy', (hipY - 142 * Math.cos(ang)).toFixed(1));
    const brk = t >= tBr && t < tBr + VB0 / AB + 0.3, strt = t >= tSt && t < tSt + 2.2;
    const ub = M.o3((t - wt('B2', 'act') + 0.1) / 0.4) * (t < tSt - 0.2 ? 1 : 0), us = M.o3((t - tSt - 0.1) / 0.4);
    if (t < tSt - 0.2) { bBr.set(560, 440, 560 - 120 * ub, 440); attr(bBrl, 'x', 500); attr(bBrl, 'y', 540); M.setT(bBrl, 'brakes act on the bus'); bBrl.style.opacity = ub.toFixed(3); }
    else { bBr.set(200, 455, 200 + 120 * us, 455); attr(bBrl, 'x', 260); attr(bBrl, 'y', 540); M.setT(bBrl, 'engine pushes the bus on'); bBrl.style.opacity = us.toFixed(3); }
    const uf = M.o3((t - wt('B3', 'Friction') + 0.1) / 0.4) * (t < tSt - 0.2 ? 1 : 0); bFt.set(FX + 10, FYb - 6, FX + 10 - 60 * uf, FYb - 6); attr(bFtl, 'x', FX - 60); attr(bFtl, 'y', FYb - 14); attr(bFtl, 'text-anchor', 'end'); bFtl.style.opacity = uf.toFixed(3);
    const ukv = M.o3((t - wt('B4', 'keeps') + 0.1) / 0.4) * (t < tSt - 0.2 ? 1 : 0); bBv.set(shX + 24, shY, shX + 24 + 90 * ukv, shY); attr(bBvl, 'x', (shX + 30).toFixed(1)); attr(bBvl, 'y', (shY - 16).toFixed(1)); bBvl.style.opacity = ukv.toFixed(3);
    M.setT($('#b_v'), f1(bv(t))); M.setT($('#b_a'), nz(f1(ba(t))));
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }));
    [0, 1, 2].forEach(i => vis($('#lka' + i), t, tLk[i + 1] - 0.2, 1e9, { dy: -8 }));
    $('#lk3').style.background = mix(C.soft, C.ac2, M.io((t - tLk[3]) / 0.3));
    vis($('#bchP'), t, wt('B6', 'other') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'bus') });
  }

  /* V: side by side */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    vis($('#vb'), t, tV1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const uw = M.o3((t - wt('V1', 'weight') + 0.1) / 0.4), un = M.o3((t - wt('V1', 'push') + 0.1) / 0.4);
    vbW.set(390, 310, 390, 310 + 90 * uw); vbN.set(390, 310, 390, 310 - 90 * un); vbWl.style.opacity = uw.toFixed(3); vbNl.style.opacity = un.toFixed(3);
    vis(vbV, t, wt('V1', 'Velocity') - 0.1, 1e9, { dy: 6 }); vis($('#vbP'), t, wt('V1', 'stays') - 0.1, 1e9, POP);
    vis($('#vc'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const X = Math.max(0, t - T0('V2')) * 220; attr(vcDash, 'stroke-dashoffset', (X % 80).toFixed(1));
    cwh.forEach(([wl, x]) => wl.setAttribute('transform', `translate(${x},372) rotate(${((X / 26) * 180 / Math.PI % 360).toFixed(1)})`));
    const uf = M.o3((t - wt('V2', 'forward') + 0.1) / 0.4), ud = M.o3((t - wt('V2', 'drag') + 0.1) / 0.4), uv = M.o3((t - wt('V2', 'Velocity') + 0.1) / 0.4);
    vcF.set(532, 342, 532 + 100 * uf, 342); vcD.set(262, 342, 262 - 100 * ud, 342); vcFl.style.opacity = uf.toFixed(3); vcDl.style.opacity = ud.toFixed(3);
    vcW.set(397, 340, 397, 340 + 100 * uf); vcN.set(397, 300, 397, 300 - 80 * uf); vcWl.style.opacity = uf.toFixed(3); vcNl.style.opacity = uf.toFixed(3);
    vcV.set(300, 150, 300 + 180 * uv, 150); vis(vcVl, t, wt('V2', 'Velocity'), 1e9, { dy: 6 }); vis($('#vcP'), t, wt('V2', 'constant') - 0.1, 1e9, POP);
    vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'What') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Steady') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const u1 = M.o3((t - wt('W4', 'driving') + 0.1) / 0.4), u2 = M.o3((t - wt('W4', 'drag') + 0.1) / 0.4), u3 = M.o3((t - wt('W5', 'weight') + 0.1) / 0.4), u4 = M.o3((t - wt('W5', 'normal') + 0.1) / 0.4);
    wF.set(532, 342, 532 + 110 * u1, 342); wD.set(262, 342, 262 - 110 * u2, 342); wWa.set(397, 360, 397, 360 + 100 * u3); wNa.set(397, 300, 397, 300 - 110 * u4);
    wFl.style.opacity = u1.toFixed(3); wDl.style.opacity = u2.toFixed(3); wWl.style.opacity = u3.toFixed(3); wNl.style.opacity = u4.toFixed(3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'if') - 0.1, tStrike: wt('X3', 'zero') - 0.1, tRight: wt('X3', 'body') });
    vis(tpA, t, wt('X3', 'rest') - 0.2, 1e9, { dy: 0, fade: 0.2 }); vis(tpRl, t, wt('X3', 'rest'), 1e9, { dy: 6 });
    vis(tpB, t, wt('X3', 'moving') - 0.2, 1e9, { dy: 0, fade: 0.2 }); const uv = M.o3((t - wt('X3', 'constant') + 0.1) / 0.4); tpV.set(466, 175, 466 + 110 * uv, 175); tpVl.style.opacity = uv.toFixed(3);
    vis(tpS, t, wt('X3', 'cruising') - 0.1, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Two'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
