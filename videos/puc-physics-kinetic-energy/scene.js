// PUC Physics Ep 75: Kinetic energy (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const EN = C.teal, FC = C.orange, DC = C.violet, VC = C.ac, AC = C.red, PC = '#A23B72', MC = C.ink;   // W,K teal; F orange; d violet; v blue; a red; p plum; m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kK = tc(EN, 'K'), kW = tc(EN, 'W'), kF = tc(FC, 'F'), kd = tc(DC, 'd'), kv = tc(VC, 'v'), ka = tc(AC, 'a'), km = tc(MC, 'm'), kp = tc(PC, 'p');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  hammer: ['m15 12-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9', 'M17.64 15 22 10.64', 'm20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91'],
  fan: ['M10.83 16.38a6.08 6.08 0 0 1-8.62-7l5.41 1.45a6.08 6.08 0 0 1 7-8.62l-1.45 5.41a6.08 6.08 0 0 1 8.62 7l-5.41-1.45a6.08 6.08 0 0 1-7 8.62l1.45-5.41Z', 'M12 12v.01'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
});
// a small cart drawn in svg: body + 2 wheels, origin = front-bottom of the body
const cart = (p, w = 90, h = 50, col = C.ink) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}), b = mk(g, 'rect', { x: -w, y: -h, width: w, height: h, rx: 8, fill: col }); mk(g, 'circle', { cx: -w + 20, cy: 6, r: 11, fill: '#fff', stroke: col, 'stroke-width': 4 }); mk(g, 'circle', { cx: -20, cy: 6, r: 11, fill: '#fff', stroke: col, 'stroke-width': 4 }); return { o, g, b, w, h }; };
const place = (c, x, y) => attr(c.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ball', 'Slow ball', 'TAPS THE PADS', 'slow', 50], ['ball', 'Fast ball', 'STINGS', 'fast', 150], ['hammer', 'Hammer', 'DRIVES A NAIL DEEP', 'hammer', 110]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , L], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg width="230" height="80"><circle cx="30" cy="40" r="16" fill="${C.ink}"/><path id="jv${i}" d="M52,40 H${52 + L}" stroke="${VC}" stroke-width="6" stroke-linecap="round" fill="none"/><path id="jh${i}" d="M${52 + L + 14},40 l-16,-10 v20 z" fill="${VC}"/></svg></div>`).join('');
const TILES = [[VC, '10 m/s: a tap', 'ball'], [VC, '20 m/s: twice as hard?', 'help'], [EN, '4 × the energy', 'zap']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'tap'), wt('H4', 'Twice'), wt('H5', 'four')];
// nets scene: ground, net, stumps, two balls (10 m/s then 20 m/s) that stop at the pads
const hk = $('#hkS'), HG = 450, HPAD = 520;
mk(hk, 'rect', { x: 36, y: 84, width: 712, height: HG - 84, rx: 10, fill: '#EEF4FB' });
for (let x = 52; x < 748; x += 26) mk(hk, 'line', { x1: x, y1: 92, x2: x, y2: HG, stroke: '#C9D3E2', 'stroke-width': 1.2 });
for (let y = 100; y < HG; y += 26) mk(hk, 'line', { x1: 36, y1: y, x2: 748, y2: y, stroke: '#C9D3E2', 'stroke-width': 1.2 });
mk(hk, 'rect', { x: 36, y: HG, width: 712, height: 26, fill: '#D8C7A0' });
mk(hk, 'line', { x1: 36, y1: HG, x2: 748, y2: HG, stroke: C.ink, 'stroke-width': 3 });
[0, 1, 2].forEach(k => mk(hk, 'line', { x1: 548 + k * 12, y1: HG - 120, x2: 548 + k * 12, y2: HG, stroke: '#B88E66', 'stroke-width': 6, 'stroke-linecap': 'round' }));
const HB = [0, 1].map(() => ({ gh: [0, 1, 2].map(() => mk(hk, 'circle', { r: 13, fill: '#B23A3A', opacity: 0 })), c: mk(hk, 'circle', { r: 13, fill: '#B23A3A' }), ar: PUC.arrow(hk, VC, 5, 16), lb: txt(hk, 0, 0, '', { 'font-size': 22, 'font-weight': 600, fill: VC, 'text-anchor': 'middle' }) }));
const HBv = [10, 20], HBy = [HG - 70, HG - 110], HBt = [wt('H3', 'ball'), wt('H4', 'ball')], HBpx = 30;   // 30 px per (m/s * s): drawn at 1x
const hit = [txt(hk, HPAD - 40, HG - 96, 'TAP', { 'font-size': 22, 'font-weight': 600, fill: C.ink, 'text-anchor': 'end' }), txt(hk, HPAD - 40, HG - 140, 'STING!', { 'font-size': 22, 'font-weight': 600, fill: C.red, 'text-anchor': 'end' })];

/* ---------- P ---------- */
const MT = [['hammer', 'Moving hammer', 'pushes a nail in'], ['ball', 'Moving ball', 'pushes the pads back'], ['fan', 'Moving air', 'turns a windmill']];
$('#mts').innerHTML = MT.map(([ic, n, i], k) => `<div class="mt" id="mt${k}" style="top:${164 + k * 106}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="mn">${n}</div><div class="mi">${i}</div><div class="mw">DOES WORK</div></div>`).join('');
const tMt = [wt('P3', 'hammer'), wt('P3', 'ball'), wt('P3', 'air')];

/* ---------- S: live track. m = 2 kg, F = 4 N, a = 2 m/s^2, from rest: d = t^2, v = 2t, W = 4d = K = v^2 ---------- */
const s = $('#simS'), GY = 380, X0 = 110, PX = 54, VS = 12, FS = 18;      // 54 px per metre, 12 px per m/s, 18 px per N
const FX = d => X0 + d * PX;
mk(s, 'line', { x1: 24, y1: GY + 18, x2: 760, y2: GY + 18, stroke: C.ink, 'stroke-width': 3 });
for (let k = 0; k <= 11; k++) { mk(s, 'line', { x1: FX(k), y1: GY + 18, x2: FX(k), y2: GY + (k % 5 ? 28 : 34), stroke: C.ink, 'stroke-width': 2 }); txt(s, FX(k), GY + 56, k, { 'text-anchor': 'middle', fill: k === 1 || k === 4 || k === 9 ? C.ink : C.mute, 'font-weight': k === 1 || k === 4 || k === 9 ? 600 : 400 }); }
txt(s, 760, GY + 56, 'd (m)', { 'text-anchor': 'end' });
txt(s, 760, GY + 92, 'SMOOTH TRACK · NO FRICTION', { 'font-size': 16, 'letter-spacing': 1, 'text-anchor': 'end' });
const MK = [1, 4, 9].map(d => { const x = FX(d), v = 2 * Math.sqrt(d); return { d, x, ln: mk(s, 'line', { x1: x, y1: 140, x2: x, y2: GY + 18, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' }),
  l1: txt(s, x, 104, `${v} m/s`, { 'text-anchor': 'middle', fill: VC, 'font-weight': 600, 'font-size': 20 }), l2: txt(s, x, 130, `${4 * d} J`, { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 20 }) }; });
const sGh = [0, 1, 2].map(() => { const c = cart(s, 90, 50, C.ink); c.g.style.opacity = 0; return c; });
const sC = cart(s, 90, 50, C.ink); txt(sC.g, -45, -18, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const sF = PUC.arrow(s, FC, 6, 18), sV = PUC.arrow(s, VC, 6, 18);
const sLF = it(s, 0, 0, 'F = 4 N', FC, { 'font-size': 24, 'text-anchor': 'middle' }), sLV = it(s, 0, 0, 'v', VC, { 'font-size': 26 });
const sBr = mk(s, 'path', { d: '', stroke: DC, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }), sLd = it(s, 0, GY + 142, '', DC, { 'font-size': 24, 'text-anchor': 'middle' });
const rS = [T0('S3') + 0.1, T0('S4') + 0.1, T0('S5') + 0.1], rp = wt('S6', 'replay') + 0.3, rq = rp + 4.4;   // three 1 s runs at 1x; replay 0.25x with a 0.4 s freeze at d = 1 m
const tauS = t => {
  if (t >= rp) return t < rp + 4 ? 0.25 * (t - rp) : t < rq ? 1 : Math.min(2, 1 + 0.25 * (t - rq));
  let q = 0; rS.forEach(r => { q += M.clamp(t - r, 0, 1); }); return q;
};
const moving = t => (t >= rp && t < rp + 4) || (t >= rq && t < rq + 4) || rS.some(r => t > r && t < r + 1);
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${DC}">d</span><span class="v" id="r_d" style="color:${DC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" style="color:${FC}">4</span><span class="u">N</span>
  <span class="k" style="color:${EN}">W</span><span class="v" id="r_w" style="color:${EN}">0.0</span><span class="u">J</span>
  <span class="k" style="color:${EN}">K</span><span class="v" id="r_k" style="color:${EN}">0.0</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 560, h: 150, xmax: 6.5, ymax: 40, xt: [0, 2, 4, 6], yt: [0, 16, 36], xl: 'v (m/s)', yl: 'K (J)' });
const gc = g.curve(EN), gd = g.dot(EN, 11);
const gM = [2, 4, 6].map(v => mk($('#grS'), 'circle', { cx: g.X(v), cy: g.Y(v * v), r: 7, fill: '#fff', stroke: EN, 'stroke-width': 3, opacity: 0 }));
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Twice the speed took four times the track!' });

/* ---------- D: derivation ---------- */
const STEPS = [[`${kW} = ${kF}\\,${kd}`, 'work = force × distance'],
  [`${kF} = ${km}\\,${ka}`, "Newton's second law"],
  [`${kv}^{2} = 2${ka}${kd} \\;\\Rightarrow\\; ${kd} = \\dfrac{${kv}^{2}}{2${ka}}`, 'from rest, so u = 0'],
  [`${kW} = ${km}\\,\\cancel{${ka}}\\cdot\\dfrac{${kv}^{2}}{2\\cancel{${ka}}} = \\tfrac{1}{2}${km}${kv}^{2}`, 'the a cancels']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst2 .why').style.top = '74px'; $('#dst3 .why').style.top = '74px';
const tStep = [wt('D2', 'work'), wt('D3', 'Newton'), wt('D4', 'Starting'), wt('D5', 'Put')];
const STEPS2 = [[`${kK} = \\tfrac{1}{2}${km}${kv}^{2}\\quad(\\text{J})`, 'kinetic energy'], [`${kp} = ${km}${kv} \\;\\Rightarrow\\; ${kK} = \\dfrac{${kp}^{2}}{2${km}}`, 'the same K, from momentum']];
$('#steps2').innerHTML = `<div class="kbox" id="kbx" style="top:270px;height:112px"></div>` + STEPS2.map(([f, w], i) => `<div class="st" id="dsu${i}" style="top:${282 + i * 132}px"><div class="n">${i + 5}</div><div class="sx">${K(f)}</div><div class="why" style="top:${i ? 84 : 58}px">${w}</div></div>`).join('');
const tStep2 = [wt('D6', 'kinetic'), wt('D7', 'Momentum')];
const dr = $('#drS');
const dWa = PUC.arrow(dr, FC, 7, 20), dWl = txt(dr, 150, 130, 'work in: W = F d', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
const dCart = cart(dr, 110, 56, C.ink); place(dCart, 420, 200); txt(dCart.g, -55, -21, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const dV = PUC.arrow(dr, VC, 6, 18);
mk(dr, 'rect', { x: 560, y: 96, width: 60, height: 120, rx: 8, fill: '#fff', stroke: EN, 'stroke-width': 3 });
const dFill = mk(dr, 'rect', { x: 563, y: 213, width: 54, height: 0, rx: 5, fill: EN });
txt(dr, 640, 150, 'stored', { fill: EN, 'font-weight': 600, 'font-size': 20 }); it(dr, 640, 186, 'K', EN, { 'font-size': 32 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${kK} = \\tfrac{1}{2}${km}${kv}^{2}`);

/* ---------- C: mass vs speed ---------- */
const BS = 10, BY = 450;                                // 10 px per joule, bar base
const sbs = [['#cmS', [[2, 2, 4, '2 kg · 2 m/s'], [4, 2, 8, '4 kg · 2 m/s']]], ['#cvS', [[2, 2, 4, '2 kg · 2 m/s'], [2, 4, 16, '2 kg · 4 m/s']]]].map(([id, rows]) => {
  const sv = $(id);
  mk(sv, 'line', { x1: 36, y1: BY, x2: 748, y2: BY, stroke: C.ink, 'stroke-width': 2.5 });
  return rows.map(([m, v, k, lab], i) => {
    const x = 120 + i * 320, w = m === 4 ? 120 : 84, c = cart(sv, w, m === 4 ? 56 : 46, C.ink); place(c, x + w, 200);
    txt(c.g, -w / 2, m === 4 ? -21 : -16, `${m} kg`, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 17 });
    const ar = PUC.arrow(sv, VC, 6, 16), al = it(sv, x + w + 14 + v * 30 + 8, 180, `${v} m/s`, VC, { 'font-size': 22 });
    const bar = mk(sv, 'rect', { x: x + 10, y: BY, width: 140, height: 0, fill: EN, rx: 4 });
    const bl = txt(sv, x + 80, BY - k * BS - 14, `${k} J`, { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 26 });
    const ll = txt(sv, x + 80, BY + 28, lab, { 'text-anchor': 'middle', fill: C.ink2, 'font-size': 17 });
    return { x, w, v, k, c, ar, al, bar, bl, ll };
  });
});
const tCb = [[wt('C2', 'Double'), wt('C2', 'Four'), wt('C2', 'eight'), wt('C2', 'doubles')], [wt('C3', 'Double'), wt('C3', 'Four'), wt('C3', 'sixteen'), wt('C3', 'four')]];
const th1 = PUC.think($('#th1'), { q: 'One kilogram at 6 m/s, or two kilograms at 3 m/s. Which has more kinetic energy?', opts: ['1 kg at 6 m/s', '2 kg at 3 m/s'], right: 0, why: 'Speed is squared: ½ × 1 × 36 = 18 J, but ½ × 2 × 9 = 9 J.' });

/* ---------- R: links + left/right carts ---------- */
const LK = [[`${km} > 0`, 'MASS: ALWAYS POSITIVE', 'R2'], [`${kv}^{2} \\geq 0`, 'EITHER DIRECTION', 'R3'], [`${kK} = \\tfrac{1}{2}${km}${kv}^{2} \\geq 0`, 'NEVER NEGATIVE · SCALAR', 'R4']];
$('#lks').innerHTML = LK.map(([f, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 140}px"><div class="n">${i + 1}</div><div class="fx2">${K(f)}</div><div class="tg" id="lt${i}">${tg}</div></div>`).join('') +
  [0, 1].map(i => `<div class="lkar" id="la${i}" style="top:${188 + i * 140}px">${M.icon('arrowD', 32, C.ac, 2.6)}</div>`).join('') +
  `<div class="pillp ink" id="lkP" style="left:36px;top:490px">So K can never be negative</div>`;
const tLk = [T0('R2'), T0('R3'), T0('R4')];
const rr = $('#rrS'), LN = [190, 370], RL = 904;
LN.forEach(y => mk(rr, 'line', { x1: 0, y1: y + 18, x2: 784, y2: y + 18, stroke: C.ink, 'stroke-width': 2.5 }));
const RC = LN.map((y, i) => ({ y, s: i ? -1 : 1, gh: [0, 1, 2].map(() => { const c = cart(rr, 90, 46, C.ink); c.g.style.opacity = 0; return c; }), c: cart(rr, 90, 46, C.ink), ar: PUC.arrow(rr, VC, 6, 16),
  t1: txt(rr, 36, y - 92, i ? 'v = -5 m/s   v² = 25' : 'v = +5 m/s   v² = 25', { fill: VC, 'font-weight': 600, 'font-size': 22 }), t2: txt(rr, 748, y - 92, 'K = 25 J', { fill: EN, 'font-weight': 600, 'font-size': 24, 'text-anchor': 'end' }) }));
RC.forEach(r => txt(r.c.g, -45, -15, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 16 }));
const tRm = T0('R3') - 0.4, RPX = 30;                  // constant 5 m/s drawn at 30 px per m/s, wrapping round the lane
const rx = (r, t) => { const u = ((5 * RPX * Math.max(0, t - tRm)) % RL + RL) % RL; return r.s > 0 ? -60 + u + 120 : 784 + 60 - u - 30; };
const th2 = PUC.think($('#th2'), { q: "A ball's velocity flips from +4 m/s to -4 m/s. Does its kinetic energy change?", opts: ['Yes', 'No'], right: 1, why: 'The speed is still 4 m/s. Momentum flips, but K stays the same.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A cricket ball of ${K('0.16\\ \\text{kg}')} is bowled at ${K(tc(VC, '20\\ \\text{m/s}'))}. Find its kinetic energy, and the speed at which it has a quarter of that.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${kK} = \\tfrac{1}{2}(0.16)(20)^{2}`)],
  [K(`${kK} = 0.08 \\times 400 = ${tc(EN, '32\\ \\text{J}')}`)],
  [K(`\\tfrac{1}{4}${kK} \\Rightarrow ${kv}^{2}\\times\\tfrac{1}{4} \\Rightarrow ${kv}\\times\\tfrac{1}{2}`)],
  [K(`${kv} = ${tc(VC, '10\\ \\text{m/s}')},\\;\\; ${kK} = ${tc(EN, '8\\ \\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const wg = PUC.graph($('#wrS'), { x: 120, y: 110, w: 580, h: 330, xmax: 24, ymax: 40, xt: [0, 10, 20], yt: [0, 8, 32], xl: 'v (m/s)', yl: 'K (J)' });
const wc = wg.curve(EN), wd = wg.dot(EN, 12);
const wG = [[20, 32], [10, 8]].map(([v, k]) => ({ h: mk($('#wrS'), 'path', { d: `M${wg.X(0)},${wg.Y(k)} H${wg.X(v)} V${wg.Y(0)}`, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6', fill: 'none' }),
  l: txt($('#wrS'), v === 20 ? wg.X(v) - 20 : wg.X(v) + 18, v === 20 ? wg.Y(k) - 16 : wg.Y(k) + 36, `${v} m/s · ${k} J`, { fill: C.ink, 'font-weight': 600, 'font-size': 22, 'text-anchor': v === 20 ? 'end' : 'start' }) }));
const wTag = txt($('#wrS'), 136, 500, 'HALF THE SPEED = A QUARTER OF K', { fill: EN, 'font-weight': 600, 'font-size': 20 });
const tW = [T0('W3'), wt('W4', 'Zero'), wt('W5', 'K'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Same momentum means the same kinetic energy', right: `${K(`${kK} = ${kp}^{2}/2${km}`)}: same <i>p</i>, the lighter body has more K` });
const tp = $('#tpS');
mk(tp, 'line', { x1: 30, y1: 220, x2: 610, y2: 220, stroke: C.ink, 'stroke-width': 2.5 });
const TC = [[1, 4, 8, 180, 70], [4, 1, 2, 520, 120]].map(([m, v, k, x, w]) => { const c = cart(tp, w, m === 4 ? 58 : 42, C.ink); place(c, x, 202); txt(c.g, -w / 2, m === 4 ? -22 : -14, `${m} kg`, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 16 });
  return { x, v, ar: PUC.arrow(tp, VC, 5, 14), l1: txt(tp, x - w / 2, 66, `p = ${m} × ${v} = 4`, { 'text-anchor': 'middle', fill: PC, 'font-weight': 600, 'font-size': 20 }), l2: txt(tp, x - w / 2, 96, `K = ${k} J`, { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 24 }) }; });
const where = PUC.where($('#wa'), { on: [], type: 'Quick ratio and percentage questions linking K, mass, speed and momentum' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 80, optFs: 32, optY: 330,
  q: `A trolley's momentum increases by 50%, with its mass unchanged. By what percentage does its kinetic energy increase?`,
  opts: ['50%', '125%', '150%', '225%'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${kK} = \\dfrac{${kp}^{2}}{2${km}} \\Rightarrow ${kK} \\propto ${kp}^{2}`)], [K(`${kp}' = 1.5\\,${kp}`)], [K(`${kK}' = (1.5)^{2}${kK} = 2.25\\,${kK}`)], [K(`\\Delta ${kK} = 1.25\\,${kK} \\Rightarrow ${tc(C.ok, '125\\%')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'new'), wt('A3', 'two'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · kinetic energy', y0: 100, dy: 88, txt: [0, 1, 1, 1],
  lines: [K(`${kK} = \\tfrac{1}{2}${km}${kv}^{2} \\qquad ${kK} = \\tfrac{${kp}^{2}}{2${km}} \\qquad \\text{unit: joule (J)}`),
    `<b>2 × speed</b> → 4 × K &nbsp;·&nbsp; <b>2 × mass</b> → 2 × K`,
    `K is never negative: a <b>scalar</b>, no direction`,
    `Same momentum: the <b>lighter</b> body has more K`] });
const YQ = ['Why does a ball at twice the speed carry four times the energy?', 'Can kinetic energy ever be negative?', 'Two bodies have the same momentum. Which one has more kinetic energy?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 76', topic: 'Twice as fast, four times the stopping distance? Work-Energy Theorem', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S7') - 0.2, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px'; bp.style.top = '96px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw($('#jv' + i), t, tMorph + 0.5 + i * 0.3, 0.5); vis($('#jh' + i), t, tMorph + 0.9 + i * 0.3, 1e9, { dy: 0, fade: 0.1 }); });
    vis($('#hjP'), t, wt('H2', 'Something') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); vis($('#hkA'), t, tH3 + 0.15, 1e9, { dx: 40, dy: 0 });
    HB.forEach((b, i) => {
      const t0 = HBt[i], x0 = 60, xe = HPAD - 14, T = (xe - x0) / (HBv[i] * HBpx), q = M.clamp(t - t0, 0, T), x = x0 + HBv[i] * HBpx * q, y = HBy[i];
      attr(b.c, 'cx', x.toFixed(1)); attr(b.c, 'cy', y); vis(b.c, t, t0 - 0.15, i === 0 ? tH4 - 0.1 : 1e9, { dy: 0, fade: 0.1, outDur: 0.2, ody: 0 });
      const mv = t > t0 && t < t0 + T;
      b.gh.forEach((gh, k) => { const qq = M.clamp(t - t0 - 0.06 * (k + 1), 0, T); attr(gh, 'cx', (x0 + HBv[i] * HBpx * qq).toFixed(1)); attr(gh, 'cy', y); gh.style.opacity = mv && qq < q - 0.01 ? [0.3, 0.2, 0.12][k] : 0; });
      const aOn = t > t0 - 0.1 && t < t0 + T && (i === 1 || t < tH4 - 0.1); b.ar.set(x + 16, y, x + 16 + (aOn ? HBv[i] * 4 : 0), y);
      M.setT(b.lb, `${HBv[i]} m/s`); attr(b.lb, 'x', (x0 + 60).toFixed(1)); attr(b.lb, 'y', y - 28); b.lb.style.opacity = (M.io((t - t0) / 0.3) * (i === 0 ? 1 - M.io((t - tH4 + 0.1) / 0.2) : 1)).toFixed(3);
      vis(hit[i], t, t0 + T, i === 0 ? tH4 - 0.1 : 1e9, { ...POP, outDur: 0.2, ody: 0 });
    });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    const e2 = M.io((t - tTile[2]) / 0.3); $('#wq2').style.background = mix(C.soft, EN, e2); $('#wq2').style.color = mix(C.ink, '#FFFFFF', e2);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, T0('P2') - 0.1, out, { dx: -60, dy: 0, ...o });
    MT.forEach((_, k) => { const el = $('#mt' + k); vis(el, t, tMt[k] - 0.1, 1e9, POP); vis(el.querySelector('.mw'), t, wt('P4', 'work') - 0.1 + k * 0.12, 1e9, { ...POP, sc: 0.4 }); });
    vis($('#pdef'), t, wt('P2', 'Energy', 1) - 0.1, 1e9, { dy: 14 });
    vis($('#pqP'), t, wt('P4', 'because') - 0.1, 1e9, POP);
    vis($('#pm'), t, T0('P5') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#kBig'), t, wt('P5', 'called') - 0.1, 1e9, { dy: 20 }); vis($('#kSub'), t, wt('P5', 'motion') - 0.1, 1e9, { dy: 10 });
    vis($('#pc0'), t, wt('P5', 'Greek') - 0.2, 1e9, POP); vis($('#pc1'), t, wt('P5', 'symbol') - 0.1, 1e9, POP); vis($('#pc2'), t, wt('P5', 'symbol') + 0.6, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tau = Math.round(tauS(t) * 100) / 100, d = tau * tau, v = 2 * tau, x = FX(d);   // round the time first, the rest follows
    place(sC, x, GY); vis(sC.o, t, wt('S2', 'cart') - 0.1, 1e9, { dy: 0, fade: 0.12 });
    const mv = moving(t);
    sGh.forEach((gh, k) => { const q = tauS(t - (t >= rp ? 0.3 : 0.08) * (k + 1)); place(gh, FX(q * q), GY); gh.g.style.opacity = mv && q < tau - 0.01 ? [0.3, 0.2, 0.12][k] : 0; });
    const fOn = M.o3((t - wt('S2', 'force') + 0.1) / 0.5);
    sF.set(x - 45 - 2 * FS * fOn, GY - 72, x - 45 + 2 * FS * fOn, GY - 72); attr(sLF, 'x', (x - 45).toFixed(1)); attr(sLF, 'y', GY - 86); sLF.style.opacity = fOn.toFixed(3);
    sV.set(x + 6, GY - 25, x + 6 + v * VS, GY - 25); attr(sLV, 'x', (x + 12 + v * VS).toFixed(1)); attr(sLV, 'y', GY - 34); sLV.style.opacity = v > 0.3 ? 1 : 0;
    MK.forEach((m, k) => { const on = t > rS[k] + 0.99 || (t >= rp && tau >= Math.sqrt(m.d) - 0.001); M.hide(m.ln, !on); vis(m.l1, t, rS[k] + 0.95, 1e9, { dy: 8 }); vis(m.l2, t, wt(['S3', 'S4', 'S5'][k], ['joules', 'sixteen', 'Thirty'][k]) - 0.1, 1e9, { dy: 8 }); });
    const br = t >= rp ? 1 : 0; attr(sBr, 'd', br && d > 0.05 ? `M${FX(0)},${GY + 100} v10 H${x.toFixed(1)} v-10` : ''); M.setT(sLd, `d = ${f2(d)} m`); attr(sLd, 'x', ((FX(0) + x) / 2).toFixed(1)); sLd.style.opacity = br && d > 0.3 ? 1 : 0;
    vis($('#smo'), t, rp - 0.4, tS8 - 0.3, { ...POP, sc: 0.8 });
    M.setT($('#r_t'), f2(tau)); M.setT($('#r_d'), f2(d)); M.setT($('#r_v'), f2(v)); M.setT($('#r_w'), f1(4 * d)); M.setT($('#r_k'), f1(0.5 * 2 * v * v));
    const vmax = t >= rp ? 6 : v; gc(q => [q, q * q], 0, vmax); gd(v, v * v, t > rS[0] - 0.3);
    gM.forEach((c, k) => { c.style.opacity = vmax >= 2 * (k + 1) - 0.001 ? 1 : 0; });
    vis($('#gTag'), t, wt('S8', 'curves') - 0.1, 1e9, POP);
    avA(t, wt('S8', 'Look'), out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, tStep2[0] - 0.2, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; hb.style.height = (hiY > 300 ? 128 : 112) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const uw = M.o3((t - tStep[0] - 0.2) / 0.6); dWa.set(60, 170, 60 + 220 * uw, 170); dWl.style.opacity = uw.toFixed(3);
    const uv = M.o3((t - tStep[3] - 0.3) / 0.6); dV.set(426, 175, 426 + 90 * uv, 175);
    const fill = 104 * M.io((t - tStep[0]) / 0.8) * 0.25 + 104 * 0.75 * M.io((t - tStep[3] - 0.2) / 1.2); attr(dFill, 'y', (213 - fill).toFixed(1)); attr(dFill, 'height', fill.toFixed(1));
    STEPS2.forEach((_, i) => { const el = $('#dsu' + i); vis(el.querySelector('.n'), t, tStep2[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep2[i], 0.8); vis(el.querySelector('.why'), t, tStep2[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    vis($('#kbx'), t, tStep2[0] - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'Kinetic') - 0.1, 0.8);
    M.rise($('#st2'), t, wt('T1', 'Double') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#cm'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o }); vis($('#cv'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    sbs.forEach((rows, s2) => {
      const [tA, tB, tC_, tR] = tCb[s2];
      rows.forEach((r, i) => {
        const tin = i ? tA + 0.4 : tA - 0.3, tb = i ? tC_ : tB;
        vis(r.c.o, t, tin, 1e9, { dy: 0, fade: 0.15 });
        const ua = M.o3((t - tin - 0.2) / 0.5), x0 = r.x + r.w + 10; r.ar.set(x0, 180, x0 + r.v * 30 * ua, 180); r.al.style.opacity = ua.toFixed(3);
        const ub = M.o3((t - tb + 0.15) / 0.6), h = r.k * BS * ub; attr(r.bar, 'y', (BY - h).toFixed(1)); attr(r.bar, 'height', h.toFixed(1));
        vis(r.bl, t, tb + 0.3, 1e9, { dy: 8 }); vis(r.ll, t, tin, 1e9, { dy: 8 });
      });
      vis($(s2 ? '#cvR' : '#cmR'), t, tR - 0.1, 1e9, POP);
    });
    vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'One') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Eighteen') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, { dy: 16 }); PUC.write(el.querySelector('.fx2'), t, tLk[i] + 0.2, 0.6); vis($('#lt' + i), t, tLk[i] + 0.8, 1e9, { ...POP, sc: 0.5 });
      if (i < 2) vis($('#la' + i), t, tLk[i + 1] - 0.3, 1e9, { dy: -10 }); });
    const fin = M.io((t - wt('R4', 'scalar')) / 0.3); $('#lk2').style.background = mix(C.soft, '#E3F3F3', fin);
    vis($('#lkP'), t, wt('R4', 'never') - 0.1, 1e9, POP);
    vis($('#rr'), t, T0('R3') - 0.5, out, { dx: 60, dy: 0, ...o });
    RC.forEach((r, i) => {
      const x = rx(r, t); place(r.c, x, r.y); vis(r.c.o, t, tRm - 0.1, 1e9, { dy: 0, fade: 0.15 });
      r.gh.forEach((gh, k) => { place(gh, rx(r, t - 0.08 * (k + 1)), r.y); gh.g.style.opacity = t > tRm + 0.3 ? [0.3, 0.2, 0.12][k] : 0; });
      const ax = r.s > 0 ? x + 6 : x - 96; r.ar.set(ax, r.y - 22, ax + r.s * 5 * 14, r.y - 22);
      vis(r.t1, t, wt('R3', 'squared') - 0.2 + i * 0.2, 1e9, { dy: 8 }); vis(r.t2, t, wt('R4', 'never') + i * 0.2, 1e9, { ...POP, sc: 0.6 });
    });
    vis($('#rrP'), t, wt('R4', 'direction') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Does') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'speed') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const uc = M.io((t - T0('W3')) / 1.4); wc(q => [q, 0.08 * q * q], 0, 21 * uc);
    const mvq = M.io((t - wt('W5', 'half') + 0.2) / 1.2), vv = 20 - 10 * mvq; wd(vv, 0.08 * vv * vv, t > wt('W4', 'thirty') - 0.1);
    M.draw(wG[0].h, t, wt('W4', 'thirty') - 0.1, 0.5); vis(wG[0].l, t, wt('W4', 'thirty'), 1e9, { dy: 8 });
    M.draw(wG[1].h, t, T0('W6') - 0.1, 0.5); vis(wG[1].l, t, T0('W6'), 1e9, { dy: 8 });
    vis(wTag, t, wt('W6', 'half') - 0.1, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'two') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'equals') });
    TC.forEach((c, k) => { const u = M.o3((t - wt('X2', 'momentum') - k * 0.3) / 0.5); c.ar.set(c.x + 6, 170, c.x + 6 + c.v * 22 * u, 170); vis(c.l1, t, wt('X2', 'momentum') + k * 0.3, 1e9, { dy: 8 }); vis(c.l2, t, wt('X3', 'lighter') + k * 0.25, 1e9, { ...POP, sc: 0.6 }); });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'quick') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'By'), tCount, tAns });
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
