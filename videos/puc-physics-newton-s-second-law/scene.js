// PUC Physics Ep 52: Newton's second law (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, XC = C.violet, MC = C.ink;   // force orange, a red, v blue, x violet, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const Fn = tc(FC, 'F_{\\text{net}}'), Fv = tc(FC, '\\vec{F}_{\\text{net}}'), av = tc(AC, '\\vec{a}'), aa = tc(AC, 'a'), FF = tc(FC, 'F'), mm = tc(MC, 'm');
const f2 = v => v.toFixed(2);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

Object.assign(M.IC, {
  cart: ['M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6.2', 'M9 20a1 1 0 1 0 0-.01', 'M17 20a1 1 0 1 0 0-.01'],
  cartF: ['M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6.2', 'M9 20a1 1 0 1 0 0-.01', 'M17 20a1 1 0 1 0 0-.01', 'M9 7V3h7v4', 'M12.5 3v4'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10 12 17.5 15 10', 'M14 6h3l1 4'],
  users2: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tS9 = T0('S9'), tS10 = T0('S10'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['cart', 'Empty trolley', 'SHOOTS AHEAD', 'empty', [170]], ['cartF', 'Full trolley', 'BARELY MOVES', 'full', [50]], ['ball', 'Ball', 'SOFT KICK VS HARD KICK', 'Kick', [60, 170]]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'empty'), wt('H1', 'full'), wt('H2', 'Kick')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="240" height="80"></svg></div>`).join('');
const JA = JOBS.map(([, , , , L], i) => { const s = $('#jsv' + i); return L.map((len, k) => { const y = L.length > 1 ? 24 + k * 34 : 40; const a = PUC.arrow(s, AC, 6, 16); const lb = it(s, 8, y + 9, 'a', AC, { 'font-size': 24 }); return { a, lb, len, y }; }); });
const TILES = [[C.ac, 'Empty: leaps ahead', 'arrowR'], [C.ink, 'With a friend: crawls', 'users2'], [C.ink, 'How much slower?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Empty'), wt('H4', 'With'), wt('H4', 'Exactly')];

/* ---------- P: what the law links + net force ---------- */
const QR = [['F', FC, 'Net force', 'all pushes and pulls, added', 'N'], ['m', MC, 'Mass', 'how much matter it has', 'kg'], ['a', AC, 'Acceleration', 'how fast its velocity changes', 'm/s²']];
$('#qrs').innerHTML = QR.map(([s, c, n, d, u], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 132}px"><div class="qs" style="color:${c}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div><div class="qu" style="color:${c}">${u}</div></div>`).join('') +
  `<div class="pillp ink" id="qrP" style="left:36px;top:490px">More mass: harder to speed up</div>`;
const tQr = [wt('P2', 'net'), wt('P2', 'mass'), wt('P2', 'acceleration')];
const pm = $('#pmS'), PG = 330;
ground(pm, 40, 744, PG);
const pBox = mk(pm, 'rect', { x: 322, y: 210, width: 140, height: 120, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
txt(pm, 392, 278, 'BOX', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const pPush = PUC.arrow(pm, FC, 7, 20), pFr = PUC.arrow(pm, FC, 7, 20), pNet = PUC.arrow(pm, FC, 9, 24);
const pPl = txt(pm, 228, 248, 'push 30 N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 22 });
const pFl = txt(pm, 252, 324, 'friction 10 N', { 'text-anchor': 'end', fill: FC, 'font-weight': 600, 'font-size': 20 });
const pNl = txt(pm, 452, 392, 'net 20 N', { fill: FC, 'font-weight': 700, 'font-size': 24 });
$('#pmF').innerHTML = K(`${Fn} = 30 - 10 = ${tc(FC, '20\\ \\text{N}')}\\ \\text{(right)}`);
$('#pmF').style.top = '440px';

/* ---------- S: the cart sim ---------- */
const s = $('#simS'), TY = 372, PXM = 70, CX0 = 50, CW = 120, RD = 2.0, BT = TY - 68;     // 70 px per metre, runs last 2 s, BT = cart body top
const FS = 20, AS = 50, VS = 50;                                            // px per N, per m/s^2, per m/s
ground(s, 40, 744, TY);
for (let k = 0; k <= 9; k++) { const x = CX0 + PXM * k; mk(s, 'line', { x1: x, y1: TY, x2: x, y2: TY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, TY + 38, k, { 'text-anchor': 'middle', 'font-size': 15 }); }
txt(s, 744, TY + 38, 'm', { 'text-anchor': 'end', 'font-size': 15 });
const ghosts = [0, 1, 2].map(() => mk(s, 'rect', { y: BT, width: CW, height: 48, rx: 8, fill: C.ink, opacity: 0 }));
const cartO = mk(s, 'g', {}), cart = mk(cartO, 'g', {});
mk(cart, 'rect', { x: 0, y: BT, width: CW, height: 48, rx: 8, fill: C.ink });
txt(cart, CW / 2, BT + 31, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
[26, 94].forEach(x => mk(cart, 'circle', { cx: x, cy: TY - 13, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
const BLK = [0, 1].map(k => { const o = mk(cart, 'g', {}); mk(o, 'rect', { x: 14, y: BT - 40 * (k + 1), width: 92, height: 38, rx: 5, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 }); txt(o, 60, BT - 40 * (k + 1) + 25, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); return o; });
const aF = PUC.arrow(s, FC, 7, 20), aA = PUC.arrow(s, AC, 6, 18), aV = PUC.arrow(s, VC, 6, 18);
const lF = it(s, 0, 0, 'F', FC, { 'font-size': 28 }), lA = it(s, 0, 0, 'a', AC, { 'font-size': 28 }), lV = it(s, 0, 0, 'v', VC, { 'font-size': 28 });
// sliders: F (0-8 N) and m (0-8 kg)
const SX = v => 120 + 55 * v;
const sl = [['F', FC, 466, 'N'], ['m', MC, 526, 'kg']].map(([n, c, y, u]) => {
  const g0 = mk(s, 'g', {});
  it(g0, 40, y + 10, n, c, { 'font-size': 30 });
  mk(g0, 'line', { x1: SX(0), y1: y, x2: SX(8), y2: y, stroke: C.line, 'stroke-width': 6, 'stroke-linecap': 'round' });
  const fill = mk(g0, 'line', { x1: SX(0), y1: y, x2: SX(0), y2: y, stroke: c, 'stroke-width': 6, 'stroke-linecap': 'round' });
  [0, 2, 4, 6, 8].forEach(v => txt(g0, SX(v), y + 30, v, { 'text-anchor': 'middle', 'font-size': 15 }));
  const kn = mk(g0, 'circle', { cx: SX(0), cy: y, r: 13, fill: '#fff', stroke: c, 'stroke-width': 4 });
  const val = txt(g0, 600, y + 10, '0 ' + u, { fill: c, 'font-weight': 600, 'font-size': 26 });
  return { g0, fill, kn, val, u };
});
// runs: [start, F, m]
const R = [[wt('S2', 'newtons') - 0.1, 2, 2], [wt('S3', 'four') - 0.05, 4, 2], [wt('S4', 'newtons') - 0.05, 6, 2], [wt('S5', 'four') - 0.05, 6, 4], [wt('S6', 'kilograms') + 0.1, 6, 6]];
const tAdd = [wt('S5', 'add') - 0.1, wt('S6', 'six') - 0.15], tBare = wt('S9', 'bare') - 0.1;
const tFz = wt('S7', 'Freeze') + 0.15, tRes = T0('S8') + 0.1;            // replay of run 5 at 0.25x
const tLG = wt('S9', 'Watch'), tCoast = wt('S12', 'goes');                // let-go run: push 1 s, frozen, then coast at 0.25x
const tFoff = wt('S12', 'force') - 0.1, tAoff = tFoff;
function sim(t) {
  if (t >= tS9) {
    if (t < tLG) return { x: 0, v: 0, a: 0, F: 0, m: t < tBare + 0.3 ? 6 : 2, tau: 0, mv: false, pre: true };
    if (t < tFoff) { const tau = M.clamp(t - tLG, 0, 1); return { x: 1.5 * tau * tau, v: 3 * tau, a: 3, F: 6, m: 2, tau, mv: tau > 0 && tau < 1 }; }
    const c = M.clamp(0.25 * (t - tCoast), 0, 1.4); return { x: 1.5 + 3 * c, v: 3, a: 0, F: 0, m: 2, tau: 1 + c, mv: c > 0 && c < 1.4, coast: true };
  }
  if (t >= tS7) {
    const tau = t < tFz ? 0.25 * (t - tS7) : t < tRes ? 0.25 * (tFz - tS7) : Math.min(RD, 0.25 * (tFz - tS7) + 0.25 * (t - tRes));
    return { x: 0.5 * tau * tau, v: tau, a: 1, F: 6, m: 6, tau, mv: (t < tFz || t > tRes) && tau < RD };
  }
  let r = null; for (const q of R) if (t >= q[0]) r = q;
  const mNow = t < tAdd[0] + 0.3 ? 2 : t < tAdd[1] + 0.3 ? 4 : 6;
  if (!r) return { x: 0, v: 0, a: 0, F: 0, m: mNow, tau: 0, mv: false, pre: true };
  const a = r[1] / r[2], tau = Math.min(t - r[0], RD);
  return { x: 0.5 * a * tau * tau, v: a * tau, a, F: r[1], m: r[2], tau, mv: tau < RD };
}
// slider tracks
const fTr = M.track(0, [[wt('S2', 'two') - 0.2, 2], [wt('S3', 'Double'), 4], [wt('S4', 'Six') - 0.2, 6], [tFoff, 0]], M.SOFT);
const mTr = M.track(2, [[tAdd[0], 4], [tAdd[1], 6], [tBare, 2]], M.SOFT);
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_F" style="color:${FC}">0</span><span class="u">N</span>
  <span class="k" style="color:${MC}">m</span><span class="v" id="r_m" style="color:${MC}">2</span><span class="u">kg</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="r_x" style="color:${XC}">0.00</span><span class="u">m</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 560, h: 156, xmax: 8, ymax: 4, xt: [0, 2, 4, 6], yt: [0, 1, 2, 3, 4], xl: 'F (N)', yl: 'a (m/s²)' });
const GL = [[2, 4], [4, 2], [6, 4 / 3]].map(([m, ye]) => ({ p: mk($('#grS'), 'path', { d: `M${g.X(0)},${g.Y(0)} L${g.X(8)},${g.Y(ye)}`, stroke: MC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '2 0', opacity: 0.55 }), l: txt($('#grS'), g.X(8) + 10, g.Y(ye) + 6, m + ' kg', { fill: MC, 'font-weight': 600, 'font-size': 18 }) }));
const tGL = [wt('S4', 'straight') - 0.1, wt('S5', 'halves') - 0.1, wt('S6', 'one') - 0.1];
const GM = R.map(([, F, m]) => mk($('#grS'), 'circle', { cx: g.X(F), cy: g.Y(F / m), r: 8, fill: '#fff', stroke: AC, 'stroke-width': 3, opacity: 0 }));
const gDot = g.dot(AC, 11);
const dotF = M.track(0, [...R.map(r => [r[0], r[1]]), [tLG, 6], [tAoff, 0]], M.SNAP), dotA = M.track(0, [...R.map(r => [r[0], r[1] / r[2]]), [tS7, 1], [tLG, 3], [tAoff, 0]], M.SNAP);
const gT = txt($('#grS'), g.X(4.6), g.Y(3.5), 'a ∝ F', { fill: AC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const th2 = PUC.think($('#th2'), { q: 'The moment the push stops, what is the cart\'s acceleration?', opts: ['Still 3 m/s²', 'Zero'], right: 1, why: 'No net force, no acceleration. It keeps the speed it had.' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${aa} \\propto ${FF}`, 'mass fixed: double F, double a'],
  [`${aa} \\propto 1/${mm}`, 'force fixed: double m, half a'],
  [`${aa} \\propto ${FF}/${mm} \\;\\Rightarrow\\; ${FF} = k\\,${mm}\\,${aa}`, 'k is a constant'],
  [`${FF} = ${mm}\\,${aa}`, 'pick the unit of force so that k = 1'],
  [`1\\ \\text{N} = 1\\ \\text{kg} \\times 1\\ \\text{m/s}^2 = 1\\ \\text{kg m s}^{-2}`, 'one newton']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dg = PUC.graph($('#drS'), { x: 110, y: 80, w: 560, h: 170, xmax: 8, ymax: 4, xt: [0, 2, 4, 6], yt: [0, 1, 2, 3, 4], xl: 'F (N)', yl: 'a (m/s²)' });
const DL = [[2, 4], [4, 2], [6, 4 / 3]].map(([m, ye]) => ({ p: mk($('#drS'), 'path', { d: `M${dg.X(0)},${dg.Y(0)} L${dg.X(8)},${dg.Y(ye)}`, stroke: MC, 'stroke-width': 3, fill: 'none' }), l: txt($('#drS'), dg.X(8) + 10, dg.Y(ye) + 6, m + ' kg', { fill: MC, 'font-weight': 600, 'font-size': 18 }) }));
const DD1 = [2, 4, 6].map(F => mk($('#drS'), 'circle', { cx: dg.X(F), cy: dg.Y(F / 2), r: 9, fill: AC }));
const DV = mk($('#drS'), 'line', { x1: dg.X(6), y1: dg.Y(0), x2: dg.X(6), y2: dg.Y(3.6), stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const DD2 = [4, 6].map(m => mk($('#drS'), 'circle', { cx: dg.X(6), cy: dg.Y(6 / m), r: 9, fill: AC }));
const DVl = txt($('#drS'), dg.X(6) - 10, dg.Y(3.75), 'F = 6 N', { 'text-anchor': 'end', fill: FC, 'font-weight': 600, 'font-size': 18 });
// one newton strip: 1 kg block, 1 N, x = t^2 / 2
const ds = $('#drS'), NG = 452, NX = 60, NP = 120;
const nsO = mk(ds, 'g', {});
ground(nsO, 40, 744, NG);
mk(nsO, 'line', { x1: NX, y1: NG - 64, x2: NX, y2: NG, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
txt(nsO, NX, NG - 72, 'START', { 'font-size': 14 });
const NB = [1, 2, 3].map(k => ({ k, r: mk(ds, 'rect', { x: NX + NP * 0.5 * k * k, y: NG - 44, width: 56, height: 44, rx: 6, fill: C.ink, opacity: 0 }), l: txt(ds, NX + NP * 0.5 * k * k + 28, NG + 40, k + ' m/s', { 'text-anchor': 'middle', fill: VC, 'font-weight': 600, 'font-size': 20 }), s: txt(ds, NX + NP * 0.5 * k * k + 28, NG + 66, 't = ' + k + ' s', { 'text-anchor': 'middle', 'font-size': 15 }) }));
const nbO = mk(ds, 'g', {}), nb = mk(nbO, 'g', {});
mk(nb, 'rect', { x: 0, y: NG - 44, width: 56, height: 44, rx: 6, fill: C.ink }); txt(nb, 28, NG - 16, '1 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 15 });
const nA = PUC.arrow(ds, FC, 6, 16), nAl = txt(ds, 0, NG - 50, '1 N', { fill: FC, 'font-weight': 700, 'font-size': 18 });
const tN0 = wt('D6', 'One') - 0.1;
$('#stF').innerHTML = K(`${Fv} = ${mm}\\,${av}`);

/* ---------- K: side by side ---------- */
const KS = [[$('#kfS'), [[5, 10], [5, 20]]], [$('#kmS'), [[5, 10], [10, 10]]]];
const KR = KS.map(([sv, rows]) => rows.map(([m, F], r) => {
  const base = r ? 452 : 262, sz = m === 10 ? 136 : 100, a = F / m;
  const o = mk(sv, 'g', {});
  ground(o, 40, 744, base);
  mk(o, 'rect', { x: 70, y: base - sz, width: sz, height: sz, rx: 8, fill: C.ink });
  txt(o, 70 + sz / 2, base - sz / 2 + 8, m + ' kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 22 });
  const fa = PUC.arrow(sv, FC, 8, 20), fl = txt(sv, 70 + sz + 16 + 9 * F, base - sz / 2 + 8, F + ' N', { fill: FC, 'font-weight': 700, 'font-size': 24 });
  const aw = PUC.arrow(sv, AC, 7, 18), al = txt(sv, 70 + sz / 2 + 60 * a + 14, base - sz - 26 + 8, 'a = ' + a + ' m/s²', { fill: AC, 'font-weight': 700, 'font-size': 24 });
  return { o, fa, fl, aw, al, x0: 70 + sz + 4, y: base - sz / 2, ya: base - sz - 26, xa: 70 + sz / 2, F, a };
}));
const tKr = [[wt('K1', 'Ten'), wt('K1', 'Twenty')], [wt('K1', 'Ten'), wt('K2', 'ten', 1)]];
$('#kfP').innerHTML = `${K(`${aa} \\propto ${FF}`)}<span style="font:500 22px Poppins;color:var(--mute)">mass fixed</span>`;
$('#kmP').innerHTML = `${K(`${aa} \\propto 1/${mm}`)}<span style="font:500 22px Poppins;color:var(--mute)">force fixed</span>`;
const th1 = PUC.think($('#th1'), { q: 'Double the force and double the mass. What happens to the acceleration?', opts: ['Doubles', 'Halves', 'Stays the same'], right: 2, why: 'a = F/m: twice the force over twice the mass, same ratio.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `Aarav and his bike: <b>${K('80\\ \\text{kg}')}</b>. He pedals with ${K(tc(FC, '160\\ \\text{N}'))}; friction and air push back with ${K(tc(FC, '40\\ \\text{N}'))}. Find his acceleration and his speed after ${K('4\\ \\text{s}')} from rest.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${Fn} = 160 - 40 = ${tc(FC, '120\\ \\text{N}')}`)],
  [K(`${aa} = \\dfrac{${Fn}}{${mm}} = \\dfrac{120}{80} = ${tc(AC, '1.5\\ \\text{m/s}^2')}`)],
  [K(`${tc(VC, 'v')} = ${aa}\\,t = 1.5 \\times 4 = ${tc(VC, '6\\ \\text{m/s}')}`)],
  [K(`\\text{friend on: } ${aa} = \\dfrac{120}{150} = ${tc(AC, '0.8\\ \\text{m/s}^2')}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 82 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = 380;
ground(w, 40, 744, WG);
const BK = { r: [250, WG - 52], f: [470, WG - 52] }, R0 = 52;
const bikeO = mk(w, 'g', {});
[BK.r, BK.f].forEach(([x, y]) => { mk(bikeO, 'circle', { cx: x, cy: y, r: R0, fill: 'none', stroke: C.ink, 'stroke-width': 5 }); mk(bikeO, 'circle', { cx: x, cy: y, r: 6, fill: C.ink }); });
const SEAT = [320, WG - 160], HEAD = [440, WG - 170], CRK = [345, WG - 52];
mk(bikeO, 'path', { d: `M${BK.r[0]},${BK.r[1]} L${SEAT[0]},${SEAT[1]} L${CRK[0]},${CRK[1]} Z M${SEAT[0]},${SEAT[1]} L${HEAD[0]},${HEAD[1]} L${CRK[0]},${CRK[1]} M${HEAD[0]},${HEAD[1]} L${BK.f[0]},${BK.f[1]} M${HEAD[0]},${HEAD[1]} l-8,-26 h34 M${SEAT[0] - 24},${SEAT[1] - 12} h44 M${SEAT[0]},${SEAT[1]} l-2,-12`, stroke: VC, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
mk(bikeO, 'circle', { cx: CRK[0], cy: CRK[1], r: 14, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
const mTag = txt(w, 380, WG - 214, '80 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 26 });
const frO = mk(w, 'g', {}); { mk(frO, 'rect', { x: 196, y: WG - 152, width: 92, height: 44, rx: 8, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 }); txt(frO, 242, WG - 123, '+70 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); }
const wF = PUC.arrow(w, FC, 7, 20), wR = PUC.arrow(w, FC, 7, 20), wN = PUC.arrow(w, FC, 9, 24), wA = PUC.arrow(w, AC, 7, 20);
const wFl = txt(w, 0, WG - 116, '160 N', { fill: FC, 'font-weight': 700, 'font-size': 22 }), wRl = txt(w, 0, WG - 116, '40 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const wNl = txt(w, 0, WG + 74, 'net 120 N', { fill: FC, 'font-weight': 700, 'font-size': 22 });
const wAl = txt(w, 0, 128, '', { fill: AC, 'font-weight': 700, 'font-size': 24 });
const wV = txt(w, 36, 128, '', { fill: VC, 'font-weight': 700, 'font-size': 24 });
const avA = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my friend nearly halves my speed-up!' });
const tW = [wt('W3', 'First'), wt('W4', 'Then'), wt('W5', 'From'), wt('W6', 'With')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'a = 50 N / 10 kg = 5 m/s²', right: 'a = (50 - 20) N / 10 kg = 3 m/s²' });
const tp = $('#tpS'), TG = 214;
ground(tp, 30, 530, TG);
mk(tp, 'rect', { x: 230, y: TG - 100, width: 100, height: 100, rx: 8, fill: C.ink }); txt(tp, 280, TG - 44, '10 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
const tPu = PUC.arrow(tp, FC, 8, 20), tFr = PUC.arrow(tp, FC, 7, 18), tNe = PUC.arrow(tp, FC, 9, 22);
const tPl = txt(tp, 160, TG - 78, 'push 50 N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
const tFl = txt(tp, 206, TG + 50, 'friction 20 N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 18 });
const tNl = txt(tp, 390, TG - 78, 'net 30 N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Find a from the net force: blocks pushed together, ropes and lifts' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A constant force acts on a ${K('2\\ \\text{kg}')} body for ${K('4\\ \\text{s}')}. Its velocity changes from <span style="white-space:nowrap">${K('(4\\hat{i} + 3\\hat{j})\\ \\text{m/s}')}</span> to <span style="white-space:nowrap">${K('(-4\\hat{i} - 3\\hat{j})\\ \\text{m/s}')}</span>. What is the size of the force?`,
  opts: ['0 N', '2.5 N', '5 N', '20 N'], right: 2 });
const so = PUC.solution($('#so'), [[K(`${tc(AC, '\\Delta\\vec{v}')} = -8\\hat{i} - 6\\hat{j}`)], [K(`|${tc(AC, '\\Delta\\vec{v}')}| = \\sqrt{64 + 36} = 10\\ \\text{m/s}`)], [K(`${aa} = 10/4 = 2.5\\ \\text{m/s}^2`)], [K(`${FF} = 2 \\times 2.5 = ${tc(C.ok, '5\\ \\text{N}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'change'), wt('A2', 'size'), wt('A3', 'acceleration'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Newton\'s second law', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${Fv} = ${mm}\\,${av} \\qquad 1\\ \\text{N} = 1\\ \\text{kg m s}^{-2}`),
    `<span class="ar">a</span> ∝ <span class="fo">F</span> (m fixed) &nbsp;·&nbsp; <span class="ar">a</span> ∝ 1/m (F fixed)`,
    `<span class="fo">F</span> is the <b>net</b> force; <span class="ar">a</span> points along it`,
    `Push stops: <span class="ar">a = 0</span> at once, <span class="vb">v</span> stays the same`] });
const YQ = ['Same push on an empty bike and a loaded bike: which speeds up more, and why?', 'What is one newton, in base units?', 'Why must F in F = ma be the net force?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 53', topic: 'He pushed the table. Why did he roll? Newton\'s Third Law', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tS9 - 0.3, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); JA[i].forEach((q, k) => { const u = M.o3((t - tMorph - 0.8 - i * 0.35 - k * 0.3) / 0.5); q.a.set(40, q.y, 40 + q.len * u, q.y); q.lb.style.opacity = u.toFixed(3); }); });
    vis($('#hjP'), t, wt('H2', 'rule') - 0.1, 1e9, POP);
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
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP);
      const on = i === 0 ? M.io((t - T0('P3')) / 0.3) * (1 - M.io((t - T0('P5')) / 0.3)) : i === 1 ? M.io((t - T0('P5')) / 0.3) : 0;
      el.style.background = mix(C.soft, C.ac2, on); });
    vis($('#qrP'), t, wt('P5', 'More') - 0.1, 1e9, POP);
    vis($('#pm'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exP'), t, T0('P3') + 0.3, 1e9, { dy: 8 });
    const u1 = M.o3((t - wt('P4', 'thirty') + 0.1) / 0.5), u2 = M.o3((t - wt('P4', 'friction') + 0.1) / 0.5), u3 = M.o3((t - wt('P4', 'net') + 0.1) / 0.5);
    pPush.set(318 - 180 * u1, 270, 318, 270); pPl.style.opacity = u1.toFixed(3);
    pFr.set(322, 318, 322 - 60 * u2, 318); pFl.style.opacity = u2.toFixed(3);
    pNet.set(322, 384, 322 + 120 * u3, 384); pNl.style.opacity = u3.toFixed(3);
    PUC.write($('#pmF'), t, wt('P4', 'twenty') - 0.1, 0.8);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S10'), simIn2 = OUT('S12') + 0.25;
    const back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = sim(t), X = CX0 + PXM * S.x;
    attr(cart, 'transform', `translate(${X.toFixed(1)},0)`); vis(cartO, t, tS1 + 0.5, 1e9, { dx: -30, dy: 0 });
    BLK.forEach((b, k) => vis(b, t, tAdd[k], tBare + (1 - k) * 0.08, { dy: -40, sp: M.SOFT, outDur: 0.3, ody: -40 }));
    ghosts.forEach((gh, k) => { const q = sim(t - (S.coast ? 0.5 : t > tS7 && t < tS9 ? 0.4 : 0.12) * (k + 1)), gx = CX0 + PXM * q.x; attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = S.mv && gx < X - 4 ? [0.3, 0.2, 0.12][k] : 0; });
    // vectors grow from the cart
    const replay = t >= tS7 && t < tS9, grow = replay ? M.o3((t - wt('S7', 'draw')) / 0.5) : 1;
    const lg = t >= tLG, fl = lg ? FS * 6 * (1 - M.io((t - tFoff) / 0.35)) : FS * S.F * grow;
    aF.set(X + CW + 2, BT + 24, X + CW + 2 + fl, BT + 24); attr(lF, 'x', (X + CW + 10 + fl).toFixed(1)); attr(lF, 'y', BT + 34); lF.style.opacity = fl > 6 ? 1 : 0;
    const aLen = AS * (lg ? 3 * (1 - M.io((t - tAoff) / 0.35)) : S.a * grow);
    const nb2 = t < tAdd[0] ? 0 : t < tAdd[1] ? 1 : t < tBare + 0.2 ? 2 : 0, ay = BT - 40 * nb2 - 26;
    aA.set(X + CW / 2, ay, X + CW / 2 + aLen, ay); attr(lA, 'x', (X + CW / 2 + aLen + 8).toFixed(1)); attr(lA, 'y', ay + 9); lA.style.opacity = aLen > 6 ? 1 : 0;
    const vShow = replay ? M.o3((t - wt('S8', 'blue') + 0.1) / 0.4) : t >= tLG ? 1 : 0, vLen = VS * S.v * vShow, vy = ay - 34;
    aV.set(X + CW / 2, vy, X + CW / 2 + vLen, vy); attr(lV, 'x', (X + CW / 2 + vLen + 8).toFixed(1)); attr(lV, 'y', vy + 9); lV.style.opacity = vLen > 6 ? 1 : 0;
    { const e = $('#simEq'), on = S.F > 0 || t >= tFoff; const k = on ? `${S.F}|${S.m}` : '';
      if (e._k !== k) { e._k = k; e.innerHTML = on ? `<span class="ar">a</span> = <span class="fo">F</span>/m = <span class="fo">${S.F}</span>/${S.m} = <span class="ar">${f2(S.F / S.m)}</span><span style="font-size:20px;color:var(--mute)">m/s²</span>` : ''; }
      vis(e, t, R[0][0], 1e9, POP); if (!on) M.hide(e, true); }
    // sliders
    const fv = fTr(t), mv = mTr(t);
    [[sl[0], fv], [sl[1], mv]].forEach(([q, v]) => { attr(q.kn, 'cx', SX(v).toFixed(1)); attr(q.fill, 'x2', SX(v).toFixed(1)); M.setT(q.val, Math.round(v) + ' ' + q.u); });
    vis(sl[0].g0, t, tS1 + 0.8, 1e9, { dy: 10 }); vis(sl[1].g0, t, tS1 + 0.95, 1e9, { dy: 10 });
    vis($('#smo'), t, tS7 + 0.05, tS9 - 0.2, { ...POP, sc: 0.8 }); if (t > tCoast - 0.2) vis($('#smo'), t, tCoast - 0.1, 1e9, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tLG + 1.0, tCoast - 0.2, { ...POP, sc: 0.8 });
    // readout: round t first, then compute
    const tr = Math.round(S.tau * 100) / 100, aR = S.a, vR = S.coast ? 3 : aR * tr, xR = S.coast ? 1.5 + 3 * (tr - 1) : 0.5 * aR * tr * tr;
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_F'), String(S.F)); M.setT($('#r_m'), String(S.m)); M.setT($('#r_a'), f2(aR)); M.setT($('#r_v'), f2(vR)); M.setT($('#r_x'), f2(xR));
    // graph: dot linked to (F, a), the m lines draw as they are named
    GL.forEach((q, k) => { M.draw(q.p, t, tGL[k], 0.6); vis(q.l, t, tGL[k] + 0.4, 1e9, { dy: 6 }); });
    GM.forEach((c, k) => { c.style.opacity = t > (R[k + 1] ? R[k + 1][0] : tS7) ? 1 : 0; });
    const dOn = t >= R[0][0] - 0.05 && !(t >= tS9 && t < tLG);
    gDot(dotF(t), dotA(t), dOn);
    vis(gT, t, wt('S4', 'proportional') - 0.1, 1e9, POP);
    vis($('#th2'), t, tS10 + 0.05, OUT('S12'), { dy: 36, ...o });
    th2(t, { tin: tS10, tOpts: wt('S10', 'what') - 0.1, tCount: T1('S10') + 0.05, dur: 3, tAns: T0('S11') - 0.02, tWhy: wt('S11', 'No') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476], [T0('D7') - 0.1, 378]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.draw(DL[0].p, t, wt('D2', 'proportional') - 0.2, 0.6); vis(DL[0].l, t, wt('D2', 'proportional') + 0.3, 1e9, { dy: 6 });
    DD1.forEach((c, k) => vis(c, t, wt('D2', 'Keep') + k * 0.25, 1e9, { ...POP, sc: 1 }));
    M.draw(DV, t, wt('D3', 'Keep') - 0.1, 0.4); vis(DVl, t, wt('D3', 'force'), 1e9, { dy: 6 });
    DD2.forEach((c, k) => vis(c, t, wt('D3', 'proportional') + k * 0.3, 1e9, { ...POP, sc: 1 }));
    [1, 2].forEach(k => { M.draw(DL[k].p, t, wt('D3', 'one') - 0.2 + (k - 1) * 0.3, 0.6); vis(DL[k].l, t, wt('D3', 'one') + 0.3 + (k - 1) * 0.3, 1e9, { dy: 6 }); });
    // one newton strip
    vis($('#d1L'), t, tN0 - 0.2, 1e9, { dy: 8 }); vis(nsO, t, tN0 - 0.1, 1e9, { dy: 10 });
    const tau = M.clamp(t - tN0 - 0.3, 0, 3), nx0 = NX + NP * 0.5 * tau * tau;
    attr(nb, 'transform', `translate(${nx0.toFixed(1)},0)`); vis(nbO, t, tN0, 1e9, { dy: 0, fade: 0.15 });
    nA.set(nx0 + 58, NG - 22, nx0 + 58 + 44 * (t > tN0 ? 1 : 0), NG - 22); attr(nAl, 'x', (nx0 + 62).toFixed(1)); nAl.style.opacity = t > tN0 ? 1 : 0;
    NB.forEach(q => { const on = tau >= q.k - 0.001 ? 1 : 0; q.r.style.opacity = (q.k < 3 ? [0.2, 0.3][q.k - 1] : 0) * on; q.l.style.opacity = on; q.s.style.opacity = on; });
    vis($('#dMo'), t, wt('D7', 'momentum') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Net') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'acceleration') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kf'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o });
    vis($('#km'), t, T0('K2') - 0.4, out, { dx: 60, dy: 0, ...o });
    KR.forEach((rows, c) => rows.forEach((q, r) => { const t0 = c === 0 && r === 0 ? wt('K1', 'same') : tKr[c][r] - 0.3; vis(q.o, t, t0, 1e9, { dy: 16 });
      const u = M.o3((t - tKr[c][r]) / 0.5), ua = M.o3((t - tKr[c][r] - 0.6) / 0.5);
      q.fa.set(q.x0, q.y, q.x0 + 9 * q.F * u, q.y); q.fl.style.opacity = u.toFixed(3);
      q.aw.set(q.xa, q.ya, q.xa + 60 * q.a * ua, q.ya); q.al.style.opacity = ua.toFixed(3); }));
    vis($('#kfP'), t, wt('K1', 'four') - 0.1, 1e9, POP); vis($('#kmP'), t, wt('K2', 'More') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'What') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'a') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(bikeO, t, T0('W2') + 0.4, 1e9, { dy: 16 });
    const fr = M.io((t - wt('W6', 'friend') + 0.2) / 0.3);
    vis(frO, t, wt('W6', 'seventy') - 0.1, 1e9, { dy: -40, sp: M.SOFT });
    M.setT(mTag, t > wt('W6', 'mass') ? '150 kg' : '80 kg'); vis(mTag, t, wt('W2', 'eighty') - 0.1, 1e9, { dy: 8 });
    const u1 = M.o3((t - wt('W2', 'sixty') + 0.1) / 0.5), u2 = M.o3((t - wt('W2', 'forty') + 0.1) / 0.5), u3 = M.o3((t - wt('W3', 'hundred') + 0.1) / 0.5);
    const FY = WG - 96;
    wF.set(530, FY, 530 + 128 * u1, FY); attr(wFl, 'x', 540); wFl.style.opacity = u1.toFixed(3);
    wR.set(190, FY, 190 - 32 * u2, FY); attr(wRl, 'x', 184); wRl.style.opacity = u2.toFixed(3);
    wN.set(300, WG + 52, 300 + 96 * u3, WG + 52); attr(wNl, 'x', 410); attr(wNl, 'y', WG + 60); wNl.style.opacity = u3.toFixed(3);
    const aNow = t < wt('W6', 'gives') ? 1.5 : 0.8, ua = M.o3((t - wt('W4', 'point') + 0.1) / 0.5);
    const aL = 80 * M.lerp(1.5, 0.8, M.io((t - wt('W6', 'gives') + 0.1) / 0.5)) * ua;
    wA.set(300, WG - 262, 300 + aL, WG - 262); M.setT(wAl, 'a = ' + aNow + ' m/s²'); attr(wAl, 'x', (300 + aL + 14).toFixed(1)); attr(wAl, 'y', WG - 254);
    wAl.style.opacity = ua.toFixed(3);
    M.count(wV, t, wt('W5', 'One') - 0.2, 1.4, 0, 6, v => 'v = ' + v.toFixed(1) + ' m/s'); vis(wV, t, wt('W5', 'One') - 0.3, wt('W6', 'Now') - 0.1, { dy: 8 });
    avA(t, wt('W6', 'eight') + 0.2, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Fifty') - 0.2, tStrike: wt('X3', 'net') - 0.1, tRight: wt('X3', 'Thirty') - 0.1 });
    const u1 = M.o3((t - wt('X2', 'Fifty') + 0.1) / 0.5), u2 = M.o3((t - wt('X3', 'friction') + 0.1) / 0.5), u3 = M.o3((t - wt('X3', 'net') + 0.1) / 0.5);
    tPu.set(226 - 120 * u1, TG - 52, 226, TG - 52); tPl.style.opacity = u1.toFixed(3);
    tFr.set(230, TG - 12, 230 - 48 * u2, TG - 12); tFl.style.opacity = u2.toFixed(3);
    tNe.set(342, TG - 52, 342 + 96 * u3, TG - 52); tNl.style.opacity = u3.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
