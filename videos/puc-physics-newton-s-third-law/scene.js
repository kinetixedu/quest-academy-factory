// PUC Physics Ep 53: Newton's third law (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink;      // every force orange, a red, v blue, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const fsub = (p, x, y, sub, col, a = {}) => { const e = it(p, x, y, 'F', col, a); const s = document.createElementNS(nsv, 'tspan'); s.setAttribute('font-size', '0.62em'); s.setAttribute('dy', '6'); s.setAttribute('font-style', 'normal'); s.textContent = sub; e.appendChild(s); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const FAB = tc(FC, '\\vec{F}_{AB}'), FBA = tc(FC, '\\vec{F}_{BA}'), FF = tc(FC, 'F'), aA = tc(AC, 'a_A'), aB = tc(AC, 'a_B'), mA = tc(MC, 'm_A'), mB = tc(MC, 'm_B');
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const sg = v => (v > 0.0049 ? '+' : v < -0.0049 ? '-' : '') + Math.abs(v).toFixed(2);
const sg1 = v => (v > 0.049 ? '+' : v < -0.049 ? '-' : '') + Math.abs(v).toFixed(1);

Object.assign(M.IC, {
  swim: ['M2 18c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0', 'M8 13l4-4 3 3 3-1', 'M15 6a2 2 0 1 0 0-.01', 'M4 4v12'],
  boat: ['M2 17h20l-3 4H5z', 'M12 3v12', 'M12 4l6 9h-6'],
  hands: ['M5 12h5', 'M19 12h-5', 'M10 9v6', 'M14 9v6', 'm7 9-3 3 3 3', 'm17 9 3 3-3 3'],
  chair: ['M7 3h10v8H7z', 'M12 11v5', 'M6 16h12', 'M7 21a1 1 0 1 0 0-.01', 'M17 21a1 1 0 1 0 0-.01', 'M12 16v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS3 = T0('S3'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK4 = T0('K4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['swim', 'Pool wall', 'YOU GLIDE AWAY', ['on you', 'on wall']], ['boat', 'Small boat', 'IT SLIDES BACK', ['on boat', 'on you']], ['hands', 'Every push', 'A PUSH COMES BACK', ['on B', 'on A']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'swimming'), wt('H1', 'boat'), wt('H2', 'something')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="250" height="80"></svg></div>`).join('');
const JA = JOBS.map(([, , , L], i) => { const s = $('#jsv' + i); mk(s, 'circle', { cx: 125, cy: 34, r: 7, fill: C.ink });
  return [0, 1].map(k => ({ a: PUC.arrow(s, FC, 6, 16), lb: txt(s, k ? 200 : 50, 72, L[k], { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 16 }), dir: k ? 1 : -1 })); });
const TILES = [[FC, 'He pushes the table', 'arrowR'], [C.ink, 'He rolls back', 'chair'], [C.ink, 'What pushed him?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'pushes'), wt('H4', 'rolls'), wt('H4', 'what')];

/* ---------- P: the law ---------- */
$('#lawQ').innerHTML = 'To every action, there is always an <span class="acc">equal and opposite</span> reaction.';
const LP = [['Forces come in pairs', 36, 252, 'ac'], ['Same size', 36, 330, ''], ['Opposite directions', 230, 330, ''], ['Same instant', 36, 408, ''], ['Neither comes first', 270, 408, '']];
$('#lps').innerHTML = LP.map(([s, x, y, c], i) => `<div class="lp${c ? ' pillp ac' : ''}" id="lp${i}" style="left:${x}px;top:${y}px">${s}</div>`).join('');
const tLp = [wt('P3', 'forces'), wt('P4', 'same'), wt('P4', 'opposite'), wt('P4', 'instant'), wt('P4', 'Neither')];
const pm = $('#pmS');
// A and B touching
ground(pm, 40, 744, 250);
mk(pm, 'rect', { x: 230, y: 160, width: 150, height: 90, rx: 8, fill: C.ink }); txt(pm, 305, 214, 'A', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins' });
mk(pm, 'rect', { x: 384, y: 160, width: 150, height: 90, rx: 8, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 }); txt(pm, 459, 214, 'B', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins' });
const pOnB = PUC.arrow(pm, FC, 8, 22), pOnA = PUC.arrow(pm, FC, 8, 22);
const pLB = txt(pm, 610, 196, 'on B, by A', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 }), pLA = txt(pm, 154, 196, 'on A, by B', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
// chair and study table
const ps2 = mk(pm, 'g', {});
ground(ps2, 40, 744, 520);
mk(ps2, 'rect', { x: 400, y: 420, width: 300, height: 18, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
[414, 668].forEach(x => mk(ps2, 'rect', { x, y: 438, width: 18, height: 82, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 }));
txt(ps2, 550, 412, 'TABLE', { 'text-anchor': 'middle', 'font-size': 15 });
const chO = mk(ps2, 'g', {}), ch = mk(chO, 'g', {});
mk(ch, 'rect', { x: 250, y: 380, width: 16, height: 70, rx: 4, fill: C.ink }); mk(ch, 'rect', { x: 250, y: 440, width: 100, height: 16, rx: 4, fill: C.ink });
mk(ch, 'line', { x1: 300, y1: 456, x2: 300, y2: 500, stroke: C.ink, 'stroke-width': 6 }); mk(ch, 'line', { x1: 262, y1: 500, x2: 338, y2: 500, stroke: C.ink, 'stroke-width': 5 });
[266, 334].forEach(x => mk(ch, 'circle', { cx: x, cy: 510, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }));
mk(ch, 'circle', { cx: 300, cy: 400, r: 22, fill: C.ac2, stroke: C.ink, 'stroke-width': 2.5 }); txt(ch, 300, 406, 'A', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 18, 'font-family': 'Poppins' });
const pT = PUC.arrow(pm, FC, 7, 18), pC = PUC.arrow(pm, FC, 7, 18);
const pTl = txt(pm, 470, 368, 'on table', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 17 }), pCl = txt(pm, 270, 368, 'on Aarav', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 17 });
const tChair = wt('P5', 'rolls');

/* ---------- S: two carts and a spring ---------- */
const MA = 2, MB = 8, W = 4, X0 = 1.25, TP = Math.PI / 8, FM = 32;           // k = 25.6 N/m, push lasts pi/8 s
const ph = tau => { tau = Math.max(0, tau);
  const on = tau < TP, d = on ? X0 * (1 - Math.cos(W * tau)) : X0 + 5 * (tau - TP), F = on ? FM * Math.cos(W * tau) : 0, rv = on ? 5 * Math.sin(W * tau) : 5;
  return { xA: -0.8 * d, xB: 0.2 * d, F, vA: -0.8 * rv, vB: 0.2 * rv, d }; };
const tRun = wt('S2', 'go'), tRes = wt('S6', 'run'), TF = 0.2;
const tauS = t => {
  if (t < tRun) return { tau: 0, rel: false };
  if (t < tS3) return { tau: M.clamp(t - tRun, 0, 1), rel: true, mv: t - tRun < 1 };
  if (t < tRes) { const q = Math.min(0.25 * (t - tS3), TF); return { tau: q, rel: true, mv: q < TF, rep: true }; }
  const q = Math.min(TF + 0.25 * (t - tRes), 1); return { tau: q, rel: true, mv: q < 1, rep: true };
};
const s = $('#simS'), TY = 400, PXM = 70, XC = 430;
ground(s, 40, 744, TY);
const CA = { w: 112, h: 60 }, CB = { w: 180, h: 84 };
const ghA = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 14 - CA.h, width: CA.w, height: CA.h, rx: 8, fill: C.ink, opacity: 0 }));
const ghB = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 14 - CB.h, width: CB.w, height: CB.h, rx: 8, fill: '#8D99AE', opacity: 0 }));
const spring = mk(s, 'path', { d: '', stroke: C.ink2, 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' });
const cart = (c, fill, lab) => { const o = mk(s, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: 0, y: TY - 14 - c.h, width: c.w, height: c.h, rx: 8, fill, stroke: C.ink, 'stroke-width': 2.5 });
  txt(g, c.w / 2, TY - 14 - c.h / 2 + 7, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 19 });
  [18, c.w - 18].forEach(x => mk(g, 'circle', { cx: x, cy: TY - 12, r: 11, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 })); return { o, g }; };
const cA = cart(CA, C.ink, 'A · 2 kg'), cB = cart(CB, '#8D99AE', 'B · 8 kg');
const fA = PUC.arrow(s, FC, 7, 20), fB = PUC.arrow(s, FC, 7, 20), arA = PUC.arrow(s, AC, 6, 18), arB = PUC.arrow(s, AC, 6, 18), vA = PUC.arrow(s, VC, 6, 18), vB = PUC.arrow(s, VC, 6, 18);
const lfA = fsub(s, 0, 0, 'AB', FC, { 'font-size': 28, 'text-anchor': 'end' }), lfB = fsub(s, 0, 0, 'BA', FC, { 'font-size': 28 });
const laA = it(s, 0, 0, 'a', AC, { 'font-size': 26, 'text-anchor': 'end' }), laB = it(s, 0, 0, 'a', AC, { 'font-size': 26 }), lvA = it(s, 0, 0, 'v', VC, { 'font-size': 26, 'text-anchor': 'end' }), lvB = it(s, 0, 0, 'v', VC, { 'font-size': 26 });
const FS = 2.5, AS = 6, VS = 20;     // px per N, per m/s^2, per m/s
const springD = (x0, x1, y) => { const L = x1 - x0, n = 8; let d = `M${x0.toFixed(1)},${y}`; for (let i = 1; i <= n; i++) { const xx = x0 + L * (i - 0.5) / n; d += ` L${xx.toFixed(1)},${y + (i % 2 ? -12 : 12)}`; } return d + ` L${x1.toFixed(1)},${y}`; };
$('#roA').innerHTML = `<span class="k" style="color:${FC}">F<sub>AB</sub></span><span class="v" id="r_FA" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a<sub>A</sub></span><span class="v" id="r_aA" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r_vA" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">F<sub>BA</sub></span><span class="v" id="r_FB" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a<sub>B</sub></span><span class="v" id="r_aB" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r_vB" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 520, h: 156, xmax: 0.6, ymin: -40, ymax: 40, xt: [0, 0.2, 0.4], yt: [-32, 0, 32], xl: 't (s)', yl: 'F (N)' });
const cvB = g.curve(FC), cvA = g.curve(FC), dB = g.dot(FC, 10), dA = g.dot(FC, 10);
const gLB = txt($('#grS'), g.X(0.42), g.Y(26), 'on B, by A', { fill: FC, 'font-weight': 700, 'font-size': 18 }), gLA = txt($('#grS'), g.X(0.42), g.Y(-20), 'on A, by B', { fill: FC, 'font-weight': 700, 'font-size': 18 });
const gTag = txt($('#grS'), 744, g.Y(4), 'mirror', { fill: C.ink, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
const th1 = PUC.think($('#th1'), { q: 'A heavy truck hits a small scooter. Which one feels the bigger force?', opts: ['The truck', 'The scooter', 'Same force'], right: 2, why: 'Equal forces. The scooter has less mass, so a bigger a.' });

/* ---------- D ---------- */
const STEPS = [[`${FAB}:\\ \\text{on A by B} \\qquad ${FBA}:\\ \\text{on B by A}`, 'name each force: on whom, by whom'],
  [`${FAB} = -\\,${FBA}`, 'the third law: same size, opposite direction'],
  [`${aA} = ${FF}/${mA}, \\qquad ${aB} = ${FF}/${mB}`, 'second law on each body, on its own'],
  [`${aA}/${aB} = ${mB}/${mA}`, 'lighter body, bigger acceleration'],
  [`${aA}/${aB} = 8/2 = 4`, 'our carts: A gets four times the acceleration']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), T0('D6')];
$('#steps').querySelectorAll('.sx')[0].style.fontSize = '32px';
const d = $('#drS');
const fbd = (x, y, w, h, fill, lab, dir, fsb, aLen, ty) => { const o = mk(d, 'g', {}); mk(o, 'rect', { x, y, width: w, height: h, rx: 8, fill, stroke: C.ink, 'stroke-width': 2.5 }); txt(o, x + w / 2, y + h / 2 + 8, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
  txt(o, x + w / 2, y - 64, ty, { 'text-anchor': 'middle', 'font-size': 15 });
  const fa = PUC.arrow(d, FC, 8, 22), fl = fsub(d, dir < 0 ? x - 140 : x + w + 100, y + h / 2 - 18, fsb, FC, { 'font-size': 30, 'text-anchor': 'middle' }), aa = PUC.arrow(d, AC, 6, 18), al = it(d, 0, y - 18, 'a', AC, { 'font-size': 26 });
  return { o, fa, fl, aa, al, x0: dir < 0 ? x - 2 : x + w + 2, y: y + h / 2, dir, ax: x + w / 2, ay: y - 30, aLen }; };
const FA = fbd(300, 150, 130, 84, C.ink, 'A · 2 kg', -1, 'AB', 160, 'FREE-BODY DIAGRAM OF A'), FBb = fbd(230, 390, 200, 120, '#8D99AE', 'B · 8 kg', 1, 'BA', 40, 'FREE-BODY DIAGRAM OF B');
$('#stF').innerHTML = K(`${FAB} = -\\,${FBA}`);

/* ---------- K: one body vs two bodies ---------- */
const table = (p, top, op = 1) => { const o = mk(p, 'g', { opacity: op }); mk(o, 'rect', { x: 150, y: top, width: 480, height: 20, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); [170, 592].forEach(x => mk(o, 'rect', { x, y: top + 20, width: 18, height: 100, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 })); return o; };
const book = (p, y) => { mk(p, 'rect', { x: 290, y, width: 200, height: 56, rx: 6, fill: C.ac, stroke: C.ink, 'stroke-width': 2.5 }); txt(p, 350, y + 35, 'BOOK', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 }); };
const kf = $('#kfS'); ground(kf, 40, 744, 470); table(kf, 350); book(kf, 294);
const kW = PUC.arrow(kf, FC, 8, 22), kN = PUC.arrow(kf, FC, 8, 22);
const kNl = txt(kf, 464, 160, 'table pushes book up', { fill: FC, 'font-weight': 700, 'font-size': 20 });
// weight drawn from the book's centre: label to the left, clear of the table
const kWt = mk(kf, 'g', {}); txt(kWt, 436, 420, 'weight', { 'text-anchor': 'end', fill: FC, 'font-weight': 700, 'font-size': 19 }); txt(kWt, 436, 444, 'Earth pulls book', { 'text-anchor': 'end', fill: FC, 'font-weight': 700, 'font-size': 19 });
const kOn1 = txt(kf, 510, 330, 'BOTH ON THE BOOK', { fill: C.ink, 'font-weight': 600, 'font-size': 17 });
const km = $('#kmS'); ground(km, 40, 744, 470); table(km, 350); book(km, 210);
const kT = PUC.arrow(km, FC, 8, 22), kB = PUC.arrow(km, FC, 8, 22);
const kTl = mk(km, 'g', {}); txt(kTl, 436, 420, 'book pushes table down', { 'text-anchor': 'end', fill: FC, 'font-weight': 700, 'font-size': 18 }); txt(kTl, 436, 444, 'ON TABLE', { 'text-anchor': 'end', fill: FC, 'font-weight': 700, 'font-size': 18 });
const kBl = mk(km, 'g', {}); txt(kBl, 464, 130, 'table pushes book up', { fill: FC, 'font-weight': 700, 'font-size': 18 }); txt(kBl, 464, 154, 'ON BOOK', { fill: FC, 'font-weight': 700, 'font-size': 18 });
txt(km, 390, 310, 'drawn apart to show each body', { 'text-anchor': 'middle', 'font-size': 15 });
const th2 = PUC.think($('#th2'), { q: 'The book\'s weight and the table\'s push are equal and opposite. An action-reaction pair?', opts: ['Yes', 'No'], right: 1, why: 'Both act on the book. Weight pairs with the book pulling Earth.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `Aarav (${K('60\\ \\text{kg}')}) on skates on a smooth floor pushes his friend (${K('40\\ \\text{kg}')}) with ${K(tc(FC, '120\\ \\text{N}'))}. Find each one's acceleration.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{friend: } ${tc(AC, 'a')} = 120/40 = ${tc(AC, '3\\ \\text{m/s}^2')}\\ \\text{forward}`)],
  [K(`\\text{third law: } ${tc(FC, '120\\ \\text{N}')}\\ \\text{on Aarav, backwards}`)],
  [K(`\\text{Aarav: } ${tc(AC, 'a')} = 120/60 = ${tc(AC, '2\\ \\text{m/s}^2')}\\ \\text{backwards}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 96 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = 440;
ground(w, 40, 744, WG);
const person = (x, bw, bh, lab, kg, fill) => { const o = mk(w, 'g', {}); mk(o, 'rect', { x: x - bw / 2, y: WG - 22 - bh, width: bw, height: bh, rx: 20, fill, stroke: C.ink, 'stroke-width': 2.5 }); mk(o, 'circle', { cx: x, cy: WG - 22 - bh - 30, r: 26, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
  mk(o, 'line', { x1: x - bw / 2, y1: WG - 12, x2: x + bw / 2, y2: WG - 12, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }); [-bw / 4, bw / 4].forEach(dx => mk(o, 'circle', { cx: x + dx, cy: WG - 5, r: 5, fill: C.ink }));
  txt(o, x, WG + 48, lab, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 17 }); txt(o, x, WG + 72, kg, { 'text-anchor': 'middle', 'font-size': 16 }); return o; };
const pAar = person(300, 84, 170, 'AARAV', '60 kg', C.ink), pFr = person(400, 70, 140, 'FRIEND', '40 kg', '#8D99AE');
const wOnF = PUC.arrow(w, FC, 8, 22), wOnA = PUC.arrow(w, FC, 8, 22), waF = PUC.arrow(w, AC, 6, 18), waA = PUC.arrow(w, AC, 6, 18);
const wlF = txt(w, 0, 0, '120 N', { fill: FC, 'font-weight': 700, 'font-size': 22 }), wlA = txt(w, 0, 0, '120 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const walF = txt(w, 0, 0, '3 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 22 }), walA = txt(w, 0, 0, '2 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const avA = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same push both ways. My friend shoots off faster!' });
const tW = [wt('W3', 'friend'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Action and reaction cancel, so the cart cannot move', right: 'They act on different bodies, so they never cancel' });
const tp = $('#tpS'), TG = 200;
ground(tp, 20, 580, TG);
mk(tp, 'rect', { x: 60, y: TG - 70, width: 150, height: 56, rx: 6, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); [95, 175].forEach(x => mk(tp, 'circle', { cx: x, cy: TG - 12, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }));
txt(tp, 135, TG - 36, 'CART', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 16 });
mk(tp, 'line', { x1: 210, y1: TG - 50, x2: 330, y2: TG - 50, stroke: C.ink, 'stroke-width': 3 });
mk(tp, 'rect', { x: 330, y: TG - 110, width: 150, height: 110, rx: 14, fill: C.ink }); txt(tp, 405, TG - 50, 'HORSE', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 18 });
const xC = PUC.arrow(tp, FC, 7, 18), xH = PUC.arrow(tp, FC, 7, 18);
const xCl = txt(tp, 150, TG - 124, 'on cart', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 18 }), xHl = txt(tp, 405, TG - 156, 'on horse', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 18 });
const xBox = mk(tp, 'rect', { x: 44, y: TG - 150, width: 190, height: 150, rx: 12, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const where = PUC.where($('#wa'), { on: [], type: 'Spot action-reaction pairs; find the push between bodies in contact' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 28, optY: 352,
  q: `Blocks A (${K('2\\ \\text{kg}')}) and B (${K('3\\ \\text{kg}')}) touch on a smooth floor. A ${K('20\\ \\text{N}')} push acts on A, towards B. What force does B exert on A?`,
  opts: ['20 N, along the push', '12 N, against the push', '8 N, against the push', '12 N, along the push'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${tc(AC, 'a')} = 20/(2+3) = 4\\ \\text{m/s}^2`)], [K(`\\text{on B: } 3 \\times 4 = ${tc(FC, '12\\ \\text{N}')}`)], [K(`${FAB} = -\\,${FBA}`)], [K(`\\text{on A: } ${tc(C.ok, '12\\ \\text{N, against}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'acceleration'), wt('A3', 'So'), T0('A4'), wt('A4', 'twelve')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Newton\'s third law', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${FAB} = -\\,${FBA} \\qquad ${aA}/${aB} = ${mB}/${mA}`),
    'Same size, opposite directions, same instant',
    'On two <b>different</b> bodies: they never cancel',
    'Same force: the lighter body gets the bigger <span class="ar">a</span>'] });
const YQ = ['Aarav pushes his table. What pushes him back?', 'Why do action and reaction never cancel each other?', 'A book rests on a table. What is the reaction to its weight?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 54', topic: 'Slow truck or fast ball: which is harder to stop? Momentum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S3', 'Freeze'), 1.06, 960, 540], [T0('S5') - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = M.o3((t - tMorph - 0.8 - i * 0.4) / 0.5);
      JA[i].forEach(q => { q.a.set(125 + q.dir * 14, 34, 125 + q.dir * (14 + 80 * u), 34); q.lb.style.opacity = u.toFixed(3); }); });
    vis($('#hjP'), t, wt('H2', 'Every') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#lawQ'), t, wt('P2', 'To') - 0.05, { st: 0.06 });
    LP.forEach((_, i) => vis($('#lp' + i), t, tLp[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u1 = M.o3((t - wt('P3', 'pushes') + 0.1) / 0.5), u2 = M.o3((t - wt('P3', 'pushes', 1) + 0.1) / 0.5);
    pOnB.set(538, 205, 538 + 110 * u1, 205); pLB.style.opacity = u1.toFixed(3); attr(pLB, 'y', 184);
    pOnA.set(226, 205, 226 - 110 * u2, 205); pLA.style.opacity = u2.toFixed(3); attr(pLA, 'y', 184);
    vis($('#pmL2'), t, T0('P5') - 0.1, 1e9, { dy: 8 }); vis(ps2, t, T0('P5'), 1e9, { dy: 16 });
    const ch1 = M.o3((t - wt('P5', 'pushed') + 0.1) / 0.5), ch2 = M.o3((t - wt('P5', 'back') + 0.1) / 0.5);
    pT.set(372, 430, 372 + 70 * ch1, 430); pTl.style.opacity = ch1.toFixed(3);
    const cx = -120 * M.io((t - tChair) / 1.2); attr(ch, 'transform', `translate(${cx.toFixed(1)},0)`);
    pC.set(330 + cx, 430, 330 + cx - 70 * ch2, 430); pCl.style.opacity = ch2.toFixed(3); attr(pCl, 'x', (300 + cx).toFixed(1));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S8') + 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, dd]) => vis($(id), t, tS1 + dd, simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const st = tauS(t), P = ph(st.tau), F = st.rel ? P.F : 0;
    const xAR = XC - 15 + PXM * P.xA, xBL = XC + 15 + PXM * P.xB, xAL = xAR - CA.w, xBR = xBL + CB.w;
    attr(cA.g, 'transform', `translate(${xAL.toFixed(1)},0)`); attr(cB.g, 'transform', `translate(${xBL.toFixed(1)},0)`);
    vis(cA.o, t, wt('S1', 'is') - 0.3, 1e9, { dx: -30, dy: 0 }); vis(cB.o, t, wt('S1', 'B') - 0.1, 1e9, { dx: 30, dy: 0 });
    attr(spring, 'd', springD(xAR, Math.min(xBL, xAR + 30 + 87.5), TY - 44)); vis(spring, t, wt('S1', 'spring') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    [[ghA, 'xA', CA, -1], [ghB, 'xB', CB, 1]].forEach(([arr, key, c, sgn]) => arr.forEach((gh, k) => { const q = tauS(t - (st.rep ? 0.25 : 0.05) * (k + 1)), Q = ph(q.tau), gx = sgn < 0 ? XC - 15 + PXM * Q.xA - c.w : XC + 15 + PXM * Q.xB; attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = st.mv && q.tau < st.tau - 0.005 && q.rel ? [0.3, 0.2, 0.12][k] : 0; }));
    // vectors (drawn in the replay)
    const fOn = st.rep ? M.o3((t - wt('S3', 'draw')) / 0.5) : 0, aOn = st.rep ? M.o3((t - wt('S5', 'accelerations')) / 0.5) : 0, vOn = st.rep ? M.o3((t - wt('S6', 'run')) / 0.5) : 0;
    const yA = TY - 44, yB = TY - 56, fl = FS * F * fOn;
    fA.set(xAL - 2, yA, xAL - 2 - fl, yA); fB.set(xBR + 2, yB, xBR + 2 + fl, yB);
    attr(lfA, 'x', (xAL - 12 - fl).toFixed(1)); attr(lfA, 'y', yA + 10); lfA.style.opacity = fl > 8 ? 1 : 0;
    attr(lfB, 'x', (xBR + 12 + fl).toFixed(1)); attr(lfB, 'y', yB + 10); lfB.style.opacity = fl > 8 ? 1 : 0;
    const aAy = TY - 14 - CA.h - 28, aBy = TY - 14 - CB.h - 28, cAx = xAL + CA.w / 2, cBx = xBL + CB.w / 2, la = AS * F / MA * aOn, lb = AS * F / MB * aOn;
    arA.set(cAx, aAy, cAx - la, aAy); arB.set(cBx, aBy, cBx + lb, aBy);
    attr(laA, 'x', (cAx - la - 8).toFixed(1)); attr(laA, 'y', aAy + 9); laA.style.opacity = la > 6 ? 1 : 0; attr(laB, 'x', (cBx + lb + 8).toFixed(1)); attr(laB, 'y', aBy + 9); laB.style.opacity = lb > 6 ? 1 : 0;
    const lva = VS * -P.vA * vOn, lvb = VS * P.vB * vOn;
    vA.set(cAx, aAy - 34, cAx - lva, aAy - 34); vB.set(cBx, aBy - 34, cBx + lvb, aBy - 34);
    attr(lvA, 'x', (cAx - lva - 8).toFixed(1)); attr(lvA, 'y', aAy - 25); lvA.style.opacity = lva > 6 ? 1 : 0; attr(lvB, 'x', (cBx + lvb + 8).toFixed(1)); attr(lvB, 'y', aBy - 25); lvB.style.opacity = lvb > 6 ? 1 : 0;
    vis($('#smo'), t, tS3 + 0.05, simOut, { ...POP, sc: 0.8 });
    // readout: round t first, then compute every value from it
    const tr = Math.round(st.tau * 100) / 100, R = ph(tr), Fr = st.rel ? R.F : 0;
    M.setT($('#r_FA'), sg1(-Fr)); M.setT($('#r_FB'), sg1(Fr)); M.setT($('#r_aA'), sg(-Fr / MA)); M.setT($('#r_aB'), sg(Fr / MB));
    M.setT($('#r_vA'), sg(st.rel ? R.vA : 0)); M.setT($('#r_vB'), sg(st.rel ? R.vB : 0));
    const tc0 = $('#tChip'); M.setT(tc0, 't = ' + tr.toFixed(2) + ' s'); vis(tc0, t, tRun - 0.3, 1e9, POP);
    // graph: both forces against time, dots linked to the carts
    const gm = st.rel ? Math.min(st.tau, 0.6) : 0;
    cvB(q => [q, ph(q).F], 0, gm, 80); cvA(q => [q, -ph(q).F], 0, gm, 80);
    dB(Math.min(st.tau, 0.6), F, st.rel); dA(Math.min(st.tau, 0.6), -F, st.rel);
    vis(gLB, t, tRun + 0.4, 1e9, { dy: 6 }); vis(gLA, t, tRun + 0.5, 1e9, { dy: 6 }); vis(gTag, t, wt('S6', 'mirror') - 0.1, 1e9, POP);
    vis($('#th1'), t, tS8 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'Which') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: T0('S9') - 0.02, tWhy: wt('S9', 'The') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    [[FA, wt('D2', 'force'), wt('D4', 'acceleration')], [FBb, wt('D2', 'force', 1), wt('D4', 'Of')]].forEach(([q, tf, ta]) => {
      vis(q.o, t, tD1 + 0.5 + (q === FBb ? 0.2 : 0), 1e9, { dy: 16 });
      const u = M.o3((t - tf + 0.1) / 0.5), ua = M.o3((t - ta + 0.1) / 0.5);
      q.fa.set(q.x0, q.y, q.x0 + q.dir * 120 * u, q.y); q.fl.style.opacity = u.toFixed(3);
      q.aa.set(q.ax, q.ay, q.ax + q.dir * q.aLen * ua, q.ay); attr(q.al, 'x', (q.ax + q.dir * (q.aLen * ua + 14) - (q.dir < 0 ? 14 : 0)).toFixed(1)); attr(q.al, 'y', q.ay + 9); q.al.style.opacity = ua.toFixed(3);
    });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Equal') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'different') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    vis($('#kf'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#km'), t, tK1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u1 = M.o3((t - wt('K2', 'weight') + 0.1) / 0.5), u2 = M.o3((t - wt('K2', 'pushes') + 0.1) / 0.5);
    kW.set(450, 322, 450, 322 + 120 * u1); kWt.style.opacity = u1.toFixed(3);  kN.set(450, 294, 450, 294 - 120 * u2); kNl.style.opacity = u2.toFixed(3);
    vis(kOn1, t, wt('K2', 'Both') - 0.1, 1e9, { dy: 6 }); vis($('#kfP'), t, wt('K2', 'cancel') - 0.1, 1e9, POP);
    const u3 = M.o3((t - wt('K3', 'pushes') + 0.1) / 0.5), u4 = M.o3((t - wt('K3', 'pushes', 1) + 0.1) / 0.5);
    kT.set(450, 372, 450, 372 + 80 * u3); kTl.style.opacity = u3.toFixed(3);
    kB.set(450, 210, 450, 210 - 80 * u4); kBl.style.opacity = u4.toFixed(3);
    vis($('#kmP'), t, wt('K3', 'never') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK4, tOpts: wt('K4', 'Are', 1) - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(pAar, t, wt('W2', 'Aarav') + 0.2, 1e9, { dy: 16 }); vis(pFr, t, wt('W2', 'friend') - 0.1, 1e9, { dy: 16 });
    const yF = WG - 100, u1 = M.o3((t - wt('W2', 'newtons') + 0.1) / 0.5), u2 = M.o3((t - wt('W4', 'pushes') + 0.1) / 0.5);
    wOnF.set(437, yF, 437 + 120 * u1, yF); attr(wlF, 'x', 447); attr(wlF, 'y', yF - 18); attr(wlF, 'x', 450); wlF.style.opacity = u1.toFixed(3);
    wOnA.set(256, yF, 256 - 120 * u2, yF); attr(wlA, 'x', 250); attr(wlA, 'y', yF - 18); wlA.style.opacity = u2.toFixed(3);
    const a1 = M.o3((t - wt('W3', 'Three') + 0.1) / 0.5), a2 = M.o3((t - wt('W5', 'Two') + 0.1) / 0.5), ya = 150;
    waF.set(400, ya, 400 + 40 * 3 * a1, ya); attr(walF, 'x', 412 + 120 * a1); attr(walF, 'y', ya + 8); walF.style.opacity = a1.toFixed(3);
    waA.set(300, ya, 300 - 40 * 2 * a2, ya); attr(walA, 'x', 288 - 80 * a2); attr(walA, 'y', ya + 8); walA.style.opacity = a2.toFixed(3);
    avA(t, wt('W6', 'more') + 0.2, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'horse') - 0.2, tStrike: wt('X3', 'different') - 0.1, tRight: wt('X3', 'bodies') });
    const u1 = M.o3((t - wt('X2', 'pulls') + 0.1) / 0.5), u2 = M.o3((t - wt('X2', 'pulls', 1) + 0.1) / 0.5);
    xC.set(100, TG - 100, 100 + 100 * u1, TG - 100); xCl.style.opacity = u1.toFixed(3);
    xH.set(450, TG - 132, 450 - 100 * u2, TG - 132); xHl.style.opacity = u2.toFixed(3);
    M.draw(xBox, t, wt('X3', 'add') - 0.1, 0.6);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
