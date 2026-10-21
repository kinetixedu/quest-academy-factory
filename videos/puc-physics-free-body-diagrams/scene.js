// PUC Physics Ep 57: Free-body diagrams (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink, GC = C.gold;      // every force orange, a red, v blue, m ink, angle gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const fv = s => tc(FC, `\\vec{${s}}`), ff = s => tc(FC, s), aa = tc(AC, 'a'), mm = tc(MC, 'm');
const f1 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(2);
const ground = (p, x0, x1, y) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(g, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); return g; };
const blockG = (p, w, h, label, y, col = '#C9A27A') => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: 0, y: y - h, width: w, height: h, rx: 8, fill: col, stroke: C.ink, 'stroke-width': 2.5 }); txt(g, w / 2, y - h / 2 + 8, label, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 }); return { o, g }; };
// a labelled force arrow (orange): set(x1, y1, x2, y2, u) grows it by u, label follows the tip
const force = (p, name, val, o = {}) => { const a = PUC.arrow(p, FC, o.sw ?? 7, o.hd ?? 20), l = it(p, 0, 0, name, FC, { 'font-size': o.fs ?? 28 }); const v = val != null ? txt(p, 0, 0, val, { fill: FC, 'font-weight': 600, 'font-size': o.vs ?? 20 }) : null;
  return { a, l, v, set(x1, y1, x2, y2, u, lx = 10, ly = 0) { const X = x1 + (x2 - x1) * u, Y = y1 + (y2 - y1) * u; a.set(x1, y1, X, Y); attr(l, 'x', (X + lx).toFixed(1)); attr(l, 'y', (Y + ly).toFixed(1)); l.style.opacity = u > 0.05 ? 1 : 0; if (v) { attr(v, 'x', (X + lx).toFixed(1)); attr(v, 'y', (Y + ly + 22).toFixed(1)); v.style.opacity = u > 0.05 ? 1 : 0; } } }; };

Object.assign(M.IC, {
  kite: ['M12 2 19 9 12 22 5 9Z', 'M5 9h14', 'M12 2v20'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  rope: ['M3 12c3-3 5 3 8 0s5 3 8 0', 'M19 12h2'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS10 = T0('S10'), tS12 = T0('S12'), tS13 = T0('S13'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
// mini free-body sketches: arrows [dx, dy] from a dot
const JOBS = [['kite', 'Kite', 'WIND · STRING · WEIGHT', 'kite', [[0, -30], [-26, 22], [0, 34]]], ['package', 'Box on a floor', 'PULL · FRICTION · N · W', 'box', [[40, 0], [-30, 0], [0, -30], [0, 30]]], ['ball', 'Kicked ball', 'WEIGHT · AIR', 'ball', [[0, 34], [-30, -10]]]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'kite'), wt('H1', 'box'), wt('H1', 'kicked')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="160" height="80"></svg></div>`).join('');
const JA = JOBS.map(([, , , , L], i) => { const s = $('#jsv' + i); mk(s, 'circle', { cx: 80, cy: 40, r: 7, fill: C.ink }); return L.map(d => ({ a: PUC.arrow(s, FC, 4.5, 12), d })); });
const TILES = [[C.ink, 'Pulls with a rope', 'rope'], [C.ink, 'Box speeds up', 'arrowR'], [C.ac, 'How many forces?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'rope'), wt('H4', 'speeds'), wt('H4', 'many')];

/* ---------- P: what a free-body diagram is ---------- */
const QR = [['1', C.ac, 'One body, cut free', 'draw it alone, as a box'], ['2', FC, 'Every force on it', 'one arrow each, from the body'], ['3', C.red, 'Never forces it exerts', 'those belong to other bodies']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 132}px"><div class="qs" style="color:${c};font-style:normal;font-family:'IBM Plex Mono'">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'cut'), wt('P2', 'every'), wt('P3', 'Never')];
const pm = $('#pmS'), PG = 360;
const pFl = ground(pm, 40, 744, PG);
const pBx = blockG(pm, 150, 110, 'BOX', PG); attr(pBx.g, 'transform', 'translate(240,0)');
const pRope = mk(pm, 'line', { x1: 390, y1: PG - 55, x2: 640, y2: PG - 55, stroke: C.ink2, 'stroke-width': 4 });
const pHand = mk(pm, 'g', {}); pHand.innerHTML = `<g transform="translate(636,${PG - 78}) scale(-1,1) translate(-44,0)">${M.icon('hand', 44, C.ink2, 2.2)}</g>`;
const pCut = mk(pm, 'rect', { x: 222, y: PG - 128, width: 186, height: 146, rx: 16, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const pCutL = txt(pm, 210, PG - 60, 'FREE BODY', { fill: C.ac, 'font-weight': 600, 'font-size': 18, 'letter-spacing': 2, 'text-anchor': 'end' });
const PF = [force(pm, 'W', null), force(pm, 'N', null), force(pm, 'T', null), force(pm, 'f', null)];
const pBy = PUC.arrow(pm, FC, 5, 14); pBy.g.setAttribute('opacity', 0.9); pBy.g.querySelector('path').setAttribute('stroke-dasharray', '8 7');
const pByL = txt(pm, 330, PG + 70, 'box presses the floor: NOT in the box\'s diagram', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 18 });
$('#lawP').innerHTML = K(`\\text{then along each axis:}\\quad \\sum ${ff('F')} = ${mm}\\,${aa}`);
$('#lawP').style.cssText += ';background:var(--ac2);color:var(--ink);font-size:30px';

/* ---------- S: the block sim ---------- */
const s = $('#simS'), TY = 420, PXM = 60, RD = 1.5, FSC = 6, BW = 160, BH = 120, X0 = 60, m = 2, W = 19.6, FK = 6;   // 60 px per metre, 6 px per newton
const sFl = ground(s, 40, 744, TY);
const ghosts = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - BH, width: BW, height: BH, rx: 8, fill: '#C9A27A', opacity: 0 }));
const rope = mk(s, 'line', { y1: TY - 60, y2: TY - 60, x2: 784, stroke: C.ink2, 'stroke-width': 4 });
const ropeEnd = mk(s, 'line', { y1: TY - 60, y2: TY - 60, stroke: C.ink2, 'stroke-width': 4 });
const blk = blockG(s, BW, BH, '2 kg', TY);
const cut = mk(s, 'rect', { y: TY - BH - 18, width: BW + 36, height: BH + 36, rx: 16, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const cutL = txt(s, 0, TY - BH - 28, 'FREE BODY', { fill: C.ac, 'font-weight': 600, 'font-size': 15, 'letter-spacing': 1, 'text-anchor': 'end' });
const fW = force(s, 'W', '19.6 N'), fN = force(s, 'N', '19.6 N'), fT = force(s, 'T', ''), fF = force(s, 'f', '6 N');
const fNet = PUC.arrow(s, FC, 10, 24), lNet = txt(s, 0, 0, '', { fill: FC, 'font-weight': 700, 'font-size': 22 });
const aA = PUC.arrow(s, AC, 6, 18), lA = it(s, 0, 0, 'a', AC, { 'font-size': 28 });
const byA = PUC.arrow(s, FC, 5, 14); byA.g.querySelector('path').setAttribute('stroke-dasharray', '8 7');
const byL = txt(s, 0, TY + 40, 'its push: acts on the floor', { 'text-anchor': 'start', fill: C.red, 'font-weight': 600, 'font-size': 18 });
// runs: [launch time, rope pull T]; replay of run 3; the snap run
const tL1 = wt('S5', 'ten') - 0.1, tL2 = wt('S8', 'Fourteen') - 0.1, tL3 = wt('S8', 'Eighteen') - 0.1;
const RUNS = [[tL1, 10], [tL2, 14], [tL3, 18]];
const tFz = wt('S10', 'Freeze') + 0.15, TAU_FZ = 0.6, tRA = TAU_FZ - 0.25 * (tFz - tS10), tRes = T0('S11') + 0.1;
const tSnapAt = wt('S13', 'alone') - 0.25, TSN = 1.0, tSnapL = tSnapAt - TSN;          // rope pulls 10 N for 1 s, then snaps; friction alone stops it
function state(t) {
  if (t >= tS13) { const tau = t < tSnapAt ? Math.max(0, t - tSnapL) : Math.min(2.2, TSN + 0.25 * (t - tSnapAt)); if (t < tSnapL) return { T: 0, a: 0, v: 0, x: 0, tau: 0, rest: true, snap: true };
    if (tau < TSN) return { T: 10, a: 2, v: 2 * tau, x: tau * tau, tau, snap: true };
    const c = tau - TSN, ts = 2 / 3; if (c < ts) return { T: 0, a: -3, v: 2 - 3 * c, x: 1 + 2 * c - 1.5 * c * c, tau, snap: true, cut: true };
    return { T: 0, a: 0, v: 0, x: 1 + 2 / 3, tau, snap: true, cut: true, stop: true }; }
  if (t >= tS10) { const tau = t < tFz ? tRA + 0.25 * (t - tS10) : t < tRes ? TAU_FZ : Math.min(RD, TAU_FZ + 0.25 * (t - tRes)); return { T: 18, a: 6, v: 6 * tau, x: 3 * tau * tau, tau, replay: true, frozen: t >= tFz && t < tRes }; }
  let r = null; for (const q of RUNS) if (t >= q[0]) r = q;
  if (!r) return { T: 0, a: 0, v: 0, x: 0, tau: 0, rest: true };
  const a = (r[1] - FK) / m, tau = Math.min(t - r[0], RD);
  return { T: r[1], a, v: a * tau, x: 0.5 * a * tau * tau, tau };
}
$('#roA').innerHTML = `<span class="k" style="color:${FC}">W</span><span class="v" id="r_W" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k" style="color:${FC}">N</span><span class="v" id="r_N" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k" style="color:${FC}">T</span><span class="v" id="r_T" style="color:${FC}">0</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">f</span><span class="v" id="r_f" style="color:${FC}">0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
const roRows = el => { const kids = [...el.children]; return [0, 1, 2].map(i => kids.slice(i * 3, i * 3 + 3)); };
const RA = roRows($('#roA')), RB = roRows($('#roB'));
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 560, h: 156, xmax: 22, ymin: -4, ymax: 8, xt: [0, 6, 10, 14, 18], yt: [-3, 0, 2, 4, 6], xl: 'T (N)', yl: 'a (m/s²)' });
const gLine = mk(gs, 'path', { d: `M${g.X(6)},${g.Y(0)} L${g.X(20)},${g.Y(7)}`, stroke: AC, 'stroke-width': 3.5, fill: 'none', opacity: 0.7 });
const gDash = mk(gs, 'path', { d: `M${g.X(0)},${g.Y(-3)} L${g.X(6)},${g.Y(0)}`, stroke: AC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '6 7', opacity: 0.7 });
const gDl = txt(gs, g.X(0.6), g.Y(-3) + 30, 'still sliding, rope gone', { fill: AC, 'font-weight': 600, 'font-size': 16 });
const gSl = txt(gs, g.X(20) - 4, g.Y(7) - 12, 'slope = 1/m', { 'text-anchor': 'end', fill: AC, 'font-weight': 700, 'font-size': 18 });
const GM = RUNS.map(([, T]) => mk(gs, 'circle', { cx: g.X(T), cy: g.Y((T - FK) / m), r: 8, fill: '#fff', stroke: AC, 'stroke-width': 3, opacity: 0 }));
const gDot = g.dot(AC, 11);
const th2 = PUC.think($('#th2'), { q: 'The rope snaps. Which forces act on the block as it slides on?', opts: ['W, N and friction', 'W, N, friction + a "force of motion"'], right: 0, why: 'Each force needs something pushing or pulling. Nothing pushes it on.' });

/* ---------- D: the method ---------- */
const STEPS = [[`\\text{one body: the block},\\ ${mm} = 2\\ \\text{kg}`, 'draw it alone'],
  [`${fv('W')},\\ ${fv('N')},\\ ${fv('T')},\\ ${fv('f')}`, 'weight + one force per contact'],
  [`x\\ \\text{along the motion},\\ \\ y\\ \\text{across it}`, 'choose the axes'],
  [`\\textstyle\\sum F_y = ${ff('N')} - ${mm}g = 0 \\;\\Rightarrow\\; ${ff('N')} = ${mm}g`, 'no acceleration along y'],
  [`\\textstyle\\sum F_x = ${ff('T')} - ${ff('f')} = ${mm}\\,${aa}`, 'second law along x']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), DCX = 432, DCY = 250;
const dB = mk(dS, 'rect', { x: DCX - 80, y: DCY - 60, width: 160, height: 120, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const dBl = txt(dS, DCX, DCY + 8, '2 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const DF = { W: force(dS, 'W', '19.6 N'), N: force(dS, 'N', '19.6 N'), T: force(dS, 'T', '10 N'), f: force(dS, 'f', '6 N') };
const axX = PUC.arrow(dS, C.ink, 3, 14), axY = PUC.arrow(dS, C.ink, 3, 14);
const axXl = it(dS, 0, 0, 'x', C.ink, { 'font-size': 26 }), axYl = it(dS, 0, 0, 'y', C.ink, { 'font-size': 26 });
const dA = PUC.arrow(dS, AC, 6, 18), dAl = it(dS, 0, 0, 'a', AC, { 'font-size': 28 });
$('#drF').innerHTML = K(`${ff('N')} = 19.6\\ \\text{N} \\qquad ${aa} = \\dfrac{10 - 6}{2} = ${tc(AC, '2\\ \\text{m/s}^2')}`);
$('#stF').innerHTML = K(`\\textstyle\\sum F_x = ${mm}\\,${tc(AC, 'a_x')} \\qquad \\sum F_y = ${mm}\\,${tc(AC, 'a_y')}`);

/* ---------- R: one giver per arrow ---------- */
const GV = [['Weight', 'W', 'the Earth', 0], ['Normal force', 'N', 'the floor', 0], ['Friction', 'f', 'the floor', 0], ['Tension', 'T', 'the rope', 0], ['"Force of motion"', '?', 'nobody', 1]];
$('#gvs').innerHTML = GV.map(([n, sy, gvr, bad], i) => `<div class="gv${bad ? ' bad' : ''}" id="gv${i}" style="top:${80 + i * 92}px"><div class="gf"><i style="font-family:Poppins;color:${bad ? C.red : FC};font-weight:700;width:30px">${sy}</i><span>${n}</span></div><div class="gg">${bad ? M.icon('x', 20, C.red, 3) : M.icon('arrowL', 20, C.ink2, 2.4)}<span>${gvr}</span></div></div>`).join('');
const tGv = [wt('R2', 'weight'), wt('R3', 'normal'), wt('R3', 'friction'), wt('R4', 'tension'), wt('R5', 'force')];
const rS = $('#rrS'), RCX = 392, RCY = 270;
const rFl = ground(rS, 40, 744, RCY + 55);
mk(rS, 'rect', { x: RCX - 70, y: RCY - 55, width: 140, height: 110, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
txt(rS, RCX, RCY + 8, '2 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const RF = [force(rS, 'W', null), force(rS, 'N', null), force(rS, 'f', null), force(rS, 'T', null)];
const RFgeo = [[RCX, RCY, RCX, RCY + 120, 14, 4], [RCX, RCY, RCX, RCY - 120, 14, 12], [RCX - 60, RCY + 46, RCX - 140, RCY + 46, -30, 34], [RCX + 70, RCY, RCX + 170, RCY, 10, -14]];
const RCh = [['THE EARTH', RCX + 40, RCY + 104], ['THE FLOOR', RCX + 40, RCY - 150], ['THE FLOOR', RCX - 250, RCY + 92], ['THE ROPE', RCX + 110, RCY + 18]].map(([s0, x, y]) => { const d = document.createElement('div'); d.className = 'chipG'; d.textContent = s0; d.style.left = x + 'px'; d.style.top = y + 'px'; $('#rr').appendChild(d); return d; });
const rFoM = PUC.arrow(rS, C.red, 6, 18); rFoM.g.querySelector('path').setAttribute('stroke-dasharray', '9 8');
const rFoML = txt(rS, RCX + 190, RCY - 120, 'force of motion?', { fill: C.red, 'font-weight': 700, 'font-size': 20 });
const rX = mk(rS, 'path', { d: `M${RCX + 196},${RCY - 84} l28,28 m0,-28 l-28,28`, stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });

/* ---------- K: on vs by ---------- */
const KS = [$('#kiS'), $('#keS')].map((sv, c) => {
  const y = 330, cx = 392; const fl = ground(sv, 40, 744, y);
  mk(sv, 'rect', { x: cx - 60, y: y - 96, width: 120, height: 96, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
  const rp = mk(sv, 'line', { x1: cx + 60, y1: y - 48, x2: 744, y2: y - 48, stroke: C.ink2, 'stroke-width': 4 });
  return { sv, y, cx };
});
const KON = [force(KS[0].sv, 'W', 'Earth'), force(KS[0].sv, 'N', 'floor'), force(KS[0].sv, 'f', 'floor'), force(KS[0].sv, 'T', 'rope')];
const KONg = [[392, 282, 392, 392, 12, 2], [392, 282, 392, 172, 12, 12], [332, 318, 262, 318, -26, -10], [452, 282, 552, 282, 6, -10]];
// by the block: on the floor (down), on the floor (friction forward), on the rope (back), on the Earth (up)
const ke = KS[1].sv;
const earth = mk(ke, 'g', {}); mk(earth, 'circle', { cx: 150, cy: 470, r: 38, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 }); txt(earth, 150, 476, 'EARTH', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 600, 'font-size': 14 });
const KBY = [force(ke, '', 'on the floor'), force(ke, '', 'on the floor'), force(ke, '', 'on the rope'), force(ke, '', 'on the Earth')];
const KBYg = [[392, 334, 392, 404, 12, 0], [452, 352, 522, 352, 10, -16], [640, 282, 560, 282, -60, -34], [150, 428, 150, 360, 16, -10]];
KBY.forEach(q => q.a.g.querySelector('path').setAttribute('stroke-dasharray', '8 7'));
$('#kiP').innerHTML = `<span>In its diagram</span><span style="font:500 22px Poppins;color:var(--mute)">4 forces, 3 givers</span>`;
$('#keP').innerHTML = `<span style="color:var(--red)">Not in its diagram</span><span style="font:500 22px Poppins;color:var(--mute)">they act on other bodies</span>`;
const th1 = PUC.think($('#th1'), { q: 'A kicked ball flies through the air (ignore air). Which forces are on its diagram?', opts: ['Weight only', 'Weight + the kick'], right: 0, why: 'The foot no longer touches it. Only the Earth still pulls.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `Aarav lifts a <b>${K('5\\ \\text{kg}')}</b> box with a rope, speeding it up as it rises at ${K(tc(AC, '2\\ \\text{m/s}^2'))}. Find the tension ${K(ff('T'))}. Take ${K('g = 9.8\\ \\text{m/s}^2')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{diagram: } ${ff('T')} \\uparrow,\\ \\ ${ff('W')} \\downarrow`)],
  [K(`${ff('W')} = 5 \\times 9.8 = ${ff('49\\ \\text{N}')}`)],
  [K(`\\text{up +:}\\ \\ ${ff('T')} - 49 = 5 \\times ${tc(AC, '2')}`)],
  [K(`${ff('T')} = ${ff('59\\ \\text{N}')} \\;>\\; ${ff('W')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WX = 440, WY = 330;
const wHand = mk(w, 'g', {}); wHand.innerHTML = `<g transform="translate(${WX - 4},70)">${M.icon('hand', 48, C.ink2, 2.2)}</g>`;
const wRope = mk(w, 'line', { x1: WX + 20, y1: 116, x2: WX + 20, y2: WY - 55, stroke: C.ink2, 'stroke-width': 4 });
const wB0 = mk(w, 'g', {}); const wBox = blockG(wB0, 120, 110, '5 kg', WY + 55); attr(wBox.g, 'transform', `translate(${WX - 40},0)`);
const wT = force(w, 'T', '59 N'), wW = force(w, 'W', '49 N');
const wA = PUC.arrow(w, AC, 6, 18), wAl = txt(w, 0, 0, 'a = 2 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 22 });
const wNet = txt(w, 392, 548, 'net up: 59 - 49 = 10 N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });
const avA = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So I pull harder than the box weighs!' });
const tW = [wt('W3', 'Two'), wt('W3', 'weight', 1), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Block\'s diagram: W, N, T, f + its push on the floor', right: 'Block\'s diagram: W, N, T, f only' });
const tp = $('#tpS'), TG = 190;
ground(tp, 30, 530, TG);
mk(tp, 'rect', { x: 230, y: TG - 90, width: 110, height: 90, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const xBy = PUC.arrow(tp, FC, 6, 16); xBy.g.querySelector('path').setAttribute('stroke-dasharray', '8 7');
const xByL = txt(tp, 380, TG + 52, 'acts on the floor', { fill: C.red, 'font-weight': 700, 'font-size': 20 });
const xX = mk(tp, 'path', { d: `M300,${TG + 30} l24,24 m0,-24 l-24,24`, stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
const where = PUC.where($('#wa'), { on: [], type: 'Nearly every laws of motion numerical: blocks, ropes, pulleys and lifts' });
const th37 = tc(GC, '37^\\circ');
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 28, optY: 380,
  q: `A ${K('4\\ \\text{kg}')} block on a smooth floor is pulled by a rope with ${K(ff('20\\ \\text{N}'))} at ${K(th37)} above the horizontal. Find the normal force and the acceleration. <span style="font:500 24px Poppins;color:var(--mute);white-space:nowrap">(${K(`\\sin ${th37} = 0.6,\\ \\cos ${th37} = 0.8,\\ g = 10\\ \\text{m/s}^2`)})</span>`,
  opts: [K('40\\ \\text{N},\\ 5\\ \\text{m/s}^2'), K('28\\ \\text{N},\\ 4\\ \\text{m/s}^2'), K('52\\ \\text{N},\\ 4\\ \\text{m/s}^2'), K('28\\ \\text{N},\\ 5\\ \\text{m/s}^2')], right: 1 });
const so = PUC.solution($('#so'), [[K(`${ff('W')} = 4 \\times 10 = 40\\ \\text{N}`)], [K(`y:\\ ${ff('N')} + 20 \\times 0.6 = 40`)], [K(`${ff('N')} = 40 - 12 = 28\\ \\text{N}`)], [K(`x:\\ 20 \\times 0.8 = 16 = 4\\,${aa}`)], [K(`${aa} = ${tc(C.ok, '4\\ \\text{m/s}^2')}`)]], { y0: 100, dy: 100 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'N', 1), T0('A4'), wt('A4', 'Over')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · free-body diagrams', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textstyle\\sum F_x = ${mm}\\,${tc(AC, 'a_x')} \\qquad \\sum F_y = ${mm}\\,${tc(AC, 'a_y')}`),
    `Draw <b>one</b> body; arrows only for forces <b>on</b> it`,
    `Weight + one force per contact: <span class="fo"><i>N</i>, <i>f</i></span> (floor), <span class="fo"><i>T</i></span> (rope)`,
    `Every force needs a giver: no giver, no force`] });
const YQ = ['How many forces act on Aarav\'s box, and who gives each one?', 'Why is the block\'s push on the floor left out of its diagram?', 'A box speeds up as it rises. Why is the tension more than its weight?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 58', topic: 'Pulled tight, it still sags. Why? Equilibrium of Forces', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS10 + 0.1, 1.06, 960, 540], [tS12 - 0.3, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); JA[i].forEach((q, k) => { const u = M.o3((t - tMorph - 0.7 - i * 0.3 - k * 0.15) / 0.4); q.a.set(80, 40, 80 + q.d[0] * u, 40 + q.d[1] * u); }); });
    vis($('#hjP'), t, wt('H2', 'drawing') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - wt('H4', 'four')) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i === 2 ? C.redBg : C.ac2, M.io((t - tQr[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tQr[i + 1]) / 0.3) : 1)); });
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const fade = 1 - 0.75 * M.io((t - wt('P1', 'cut')) / 0.5);
    [pFl, pRope, pHand].forEach(e => e.style.opacity = fade.toFixed(3));
    M.draw(pCut, t, wt('P1', 'cut'), 0.6); vis(pCutL, t, wt('P1', 'free') - 0.1, 1e9, { dy: 6 });
    const tA = wt('P2', 'arrow') - 0.6;
    const PG2 = [[315, PG - 55, 315, PG + 35, 10, 4], [315, PG - 55, 315, PG - 145, 10, 12], [390, PG - 55, 470, PG - 55, 6, -12], [250, PG - 8, 190, PG - 8, -24, -10]];
    PF.forEach((q, i) => q.set(...PG2[i].slice(0, 4), M.o3((t - tA - i * 0.2) / 0.4), PG2[i][4], PG2[i][5]));
    const ub = M.o3((t - wt('P3', 'exerts') + 0.1) / 0.4); pBy.set(340, PG + 4, 340, PG + 4 + 40 * ub); M.hide(pBy.g, ub < 0.02); pByL.style.opacity = ub.toFixed(3);
    vis($('#lawP'), t, wt('P4', 'add') - 0.1, 1e9, POP);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S12'), simIn2 = OUT('S13') + 0.25;
    const back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), X = X0 + PXM * S.x, cx = X + BW / 2, cy = TY - BH / 2;
    attr(blk.g, 'transform', `translate(${X.toFixed(1)},0)`); vis(blk.o, t, tS1 + 0.5, 1e9, { dy: -20 });
    ghosts.forEach((gh, k) => { const q = state(t - (S.replay ? 0.25 : 1) * 0.08 * (k + 1)); const gx = X0 + PXM * (q.snap === S.snap && q.replay === S.replay ? q.x : S.x); attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = !S.frozen && Math.abs(S.v) > 0.05 && gx < X - 4 ? [0.3, 0.2, 0.12][k] : 0; });
    // isolate: surroundings fade, dashed outline around the block
    const iso = M.io((t - wt('S2', 'isolate')) / 0.5), fade = 1 - 0.72 * iso;
    sFl.style.opacity = fade.toFixed(3);
    const snapCut = S.cut ? 1 : 0;
    attr(rope, 'x1', (X + BW).toFixed(1)); rope.style.opacity = (fade * (1 - snapCut)).toFixed(3); vis(rope, t, wt('S1', 'rope') - 0.1, 1e9, { dy: 0 });
    attr(ropeEnd, 'x1', (X + BW).toFixed(1)); attr(ropeEnd, 'x2', (X + BW + 34).toFixed(1)); ropeEnd.style.opacity = (fade * snapCut).toFixed(3);
    attr(cut, 'x', (X - 18).toFixed(1)); M.draw(cut, t, wt('S2', 'isolate'), 0.6); attr(cutL, 'x', (X + BW + 18).toFixed(1)); M.hide(cutL, true);
    // forces appear one at a time, then follow the block
    const uW = M.o3((t - wt('S3', 'weight') + 0.1) / 0.5), uN = M.o3((t - wt('S4', 'normal') + 0.1) / 0.5), uT0 = M.o3((t - wt('S5', 'tension') + 0.1) / 0.5), uF0 = M.o3((t - wt('S6', 'friction') + 0.1) / 0.5);
    const repl = S.replay ? M.o3((t - wt('S10', 'check') + 0.1) / 0.5) : 1;
    fW.set(cx, cy, cx, cy + FSC * W, uW * repl, 12, 4); fN.set(cx, cy, cx, cy - FSC * W, uN * repl, 12, 2);
    const Tlen = FSC * S.T, uT = uT0 * repl * (S.T > 0 ? 1 : 0);
    fT.set(X + BW, cy, X + BW + Tlen, cy, uT, 8, -42); M.setT(fT.v, S.T + ' N');
    const sliding = Math.abs(S.v) > 1e-6 || (!S.rest && !S.stop), uF = uF0 * repl * (sliding && !S.rest ? 1 : 0);
    fF.set(X + 10, TY - 8, X + 10 - FSC * FK, TY - 8, uF, -30, 34);
    // net force and acceleration above the block
    const Fnet = S.rest || S.stop ? 0 : m * S.a, uNet = M.o3((t - wt('S7', 'leaves') + 0.1) / 0.5) * (S.replay ? repl : 1);
    fNet.set(cx, 196, cx + FSC * Fnet * uNet, 196); attr(lNet, 'x', (cx + (Fnet >= 0 ? FSC * Fnet * uNet + 14 : -150)).toFixed(1)); attr(lNet, 'y', 204); M.setT(lNet, 'net ' + f1(Fnet) + ' N'); lNet.style.opacity = uNet > 0.05 && Math.abs(Fnet) > 0.01 ? 1 : 0;
    const uA = M.o3((t - wt('S7', 'two', 1) + 0.1) / 0.5) * (S.replay ? repl : 1), aLen = 24 * S.a * uA;
    aA.set(cx, 166, cx + aLen, 166); attr(lA, 'x', (cx + aLen + (aLen >= 0 ? 8 : -26)).toFixed(1)); attr(lA, 'y', 175); lA.style.opacity = Math.abs(aLen) > 5 ? 1 : 0;
    // not in its diagram: its push on the floor (frozen check)
    const ub = S.replay ? M.o3((t - wt('S11', 'push') + 0.1) / 0.4) * (1 - M.io((t - tS12 + 0.5) / 0.3)) : 0;
    byA.set(cx + 56, TY + 4, cx + 56, TY + 4 + 44 * ub); M.hide(byA.g, ub < 0.02); attr(byL, 'x', (cx + 66).toFixed(1)); byL.style.opacity = ub.toFixed(3);
    { const e = $('#simEq'), on = t >= wt('S7', 'leaves') - 0.1 && !S.rest; const kk = on ? `${S.T}|${S.cut ? 1 : 0}|${S.stop ? 1 : 0}` : '';
      if (e._k !== kk) { e._k = kk; e.innerHTML = !on ? '' : S.stop ? `<span class="fo">F</span><sub style="font-size:16px">net</sub> = 0 <span style="font-size:20px;color:var(--mute)">at rest</span>` : `<span class="fo">F</span><sub style="font-size:16px">net</sub> = <span class="fo">${S.T}</span> - <span class="fo">6</span> = <span class="fo">${S.T - 6}</span> N · <span class="ar">a</span> = <span class="ar">${f1(S.a)}</span>`; }
      vis(e, t, wt('S7', 'leaves') - 0.1, 1e9, POP); if (!on) M.hide(e, true); }
    // tags
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); if (t >= tS13) vis($('#rdy'), t, simIn2 + 0.3, tSnapL - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS10 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tS12 - 0.2, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    vis($('#snp'), t, tSnapAt - 0.05, 1e9, { ...POP, sc: 0.8 }); if (t > tS13) M.hide($('#smo'), true); if (t > tSnapAt + 0.05) { M.hide($('#snp'), true); vis($('#smo'), t, tSnapAt + 0.6, 1e9, { ...POP, sc: 0.8 }); }
    vis($('#exS'), t, wt('S6', 'friction'), 1e9, { dy: 8 });
    // readout: round the time first, then compute
    const tr = Math.round(S.tau * 100) / 100, vR = S.snap ? (tr < TSN ? 2 * tr : Math.max(0, 2 - 3 * (tr - TSN))) : S.rest ? 0 : S.a * tr;
    M.setT($('#r_T'), String(S.T)); M.setT($('#r_f'), uF0 > 0.5 && sliding && !S.rest ? '6' : '0'); M.setT($('#r_a'), f2(S.rest || S.stop ? 0 : S.a)); M.setT($('#r_v'), f2(vR));
    [[RA[0], wt('S3', 'weight')], [RA[1], wt('S4', 'normal')], [RA[2], wt('S5', 'tension')], [RB[0], wt('S6', 'friction')], [RB[1], tL1], [RB[2], tL1]].forEach(([row, tt]) => row.forEach(e => vis(e, t, tt - 0.1, 1e9, { dy: 8 })));
    // graph: dot linked to (T, a); run markers; the line and its sliding extension
    GM.forEach((c, k) => { c.style.opacity = t > (RUNS[k + 1] ? RUNS[k + 1][0] : tS10) ? 1 : 0; });
    M.draw(gLine, t, wt('S9', 'straight') - 0.2, 0.6); vis(gSl, t, wt('S9', 'slope') - 0.1, 1e9, POP);
    M.draw(gDash, t, tSnapAt + 0.2, 0.5); vis(gDl, t, tSnapAt + 0.4, 1e9, { dy: 6 });
    const dShow = t >= tL1 - 0.05 && !S.rest && !S.stop;
    gDot(S.T, S.a, dShow);
    vis($('#th2'), t, tS12 + 0.05, OUT('S13'), { dy: 36, ...o });
    th2(t, { tin: tS12, tOpts: wt('S12', 'Which') - 0.1, tCount: T1('S12') + 0.05, dur: 3, tAns: T0('S13') - 0.02, tWhy: wt('S13', 'No') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    vis(dB, t, wt('D2', 'body'), 1e9, { dy: -16 }); vis(dBl, t, wt('D2', 'body') + 0.1, 1e9, { dy: -16 });
    const tF0 = wt('D3', 'Weight');
    const DG = { W: [DCX, DCY, DCX, DCY + 5 * 19.6 + 40, 12, 4], N: [DCX, DCY, DCX, DCY - 5 * 19.6 - 40, 12, 12], T: [DCX + 80, DCY, DCX + 80 + 9 * 10, DCY, 8, -14], f: [DCX - 70, DCY + 50, DCX - 70 - 9 * 6, DCY + 50, -30, 38] };
    ['W', 'N', 'T', 'f'].forEach((k, i) => { const hl = (k === 'W' || k === 'N') ? M.io((t - tStep[3]) / 0.3) * (1 - M.io((t - tStep[4]) / 0.3)) : M.io((t - tStep[4]) / 0.3); DF[k].set(...DG[k].slice(0, 4), M.o3((t - (i ? wt('D3', 'thing') - 0.2 + (i - 1) * 0.25 : tF0 - 0.1)) / 0.5), DG[k][4], DG[k][5]); DF[k].a.g.style.opacity = t > tStep[3] ? (0.35 + 0.65 * hl).toFixed(3) : 1; });
    const ux = M.o3((t - wt('D4', 'x') + 0.1) / 0.5), uy = M.o3((t - wt('D4', 'y') + 0.1) / 0.5);
    axX.set(120, 450, 120 + 110 * ux, 450); axY.set(120, 450, 120, 450 - 110 * uy); attr(axXl, 'x', 120 + 110 * ux + 8); attr(axXl, 'y', 460); attr(axYl, 'x', 106); attr(axYl, 'y', 450 - 110 * uy - 10); axXl.style.opacity = ux; axYl.style.opacity = uy;
    const ua = M.o3((t - tStep[4] - 0.6) / 0.5); dA.set(DCX + 110, DCY - 100, DCX + 110 + 48 * ua, DCY - 100); attr(dAl, 'x', DCX + 110 + 48 * ua + 8); attr(dAl, 'y', DCY - 91); dAl.style.opacity = ua;
    PUC.write($('#drF'), t, wt('D6', 'So') - 0.1, 0.8);
    $('#drF').style.left = '150px';
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'only') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'add') - 0.1, 0.8);
  }

  /* R: one giver per arrow */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    GV.forEach((_, i) => { const el = $('#gv' + i); vis(el, t, tGv[i] - 0.15, 1e9, { dx: -16, dy: 0 }); vis(el.querySelector('.gg'), t, tGv[i] + 0.35, 1e9, POP); });
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    RF.forEach((q, i) => q.set(...RFgeo[i].slice(0, 4), M.o3((t - tR1 - 0.9 - i * 0.15) / 0.5), RFgeo[i][4], RFgeo[i][5]));
    RCh.forEach((c, i) => vis(c, t, tGv[i] + 0.35, 1e9, POP));
    const uf = M.o3((t - tGv[4] + 0.1) / 0.5); rFoM.set(RCX + 70, RCY - 70, RCX + 70 + 110 * uf, RCY - 70); M.hide(rFoM.g, uf < 0.02); rFoML.style.opacity = uf;
    vis(rX, t, wt('R5', 'motion') - 0.1, 1e9, { dy: 0 });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#ki'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    vis($('#ke'), t, T0('K2') - 0.3, out, { dx: 60, dy: 0, ...o });
    const tOn = [wt('K1', 'Earth'), wt('K1', 'floor'), wt('K1', 'floor') + 0.2, wt('K1', 'rope')];
    KON.forEach((q, i) => q.set(...KONg[i].slice(0, 4), M.o3((t - tOn[i] + 0.1) / 0.5), KONg[i][4], KONg[i][5]));
    const tBy = [wt('K2', 'presses'), wt('K2', 'presses') + 0.25, wt('K2', 'rope'), wt('K2', 'Earth')];
    KBY.forEach((q, i) => q.set(...KBYg[i].slice(0, 4), M.o3((t - tBy[i] + 0.1) / 0.5), KBYg[i][4], KBYg[i][5]));
    vis(earth, t, wt('K2', 'Earth') - 0.3, 1e9, { dy: 0 });
    vis($('#kiP'), t, wt('K1', 'diagram') - 0.1, 1e9, POP); vis($('#keP'), t, wt('K2', 'belong') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'foot') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    // the box rises from rest at 2 m/s^2 (shown 10 px per metre), then holds for the diagram
    const tau = M.clamp(t - wt('W2', 'lifts'), 0, 1.2), dy = -10 * 0.5 * 2 * tau * tau;
    [wHand, wRope, wBox.o].forEach(e => attr(e, 'transform', `translate(0,${dy.toFixed(1)})`));
    vis(wB0, t, T0('W2') + 0.4, 1e9, { dy: 16 });
    const bc = WX + 20, by = WY + dy;
    wT.set(bc, by - 55, bc, by - 55 - 2.5 * 59, M.o3((t - tW[0] - 0.2) / 0.5), 14, 30); wW.set(bc, by, bc, by + 2.5 * 49, M.o3((t - wt('W3', 'weight') + 0.1) / 0.5), 14, -10);
    const ua = M.o3((t - wt('W2', 'speeding') + 0.1) / 0.5); wA.set(bc + 140, by, bc + 140, by - 70 * ua); attr(wAl, 'x', bc + 156); attr(wAl, 'y', (by - 70 * ua + 8).toFixed(1)); wAl.style.opacity = ua;
    vis(wNet, t, wt('W5', 'equals') - 0.1, 1e9, POP);
    avA(t, wt('W6', 'rises') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'push') - 0.2, tStrike: wt('X3', 'floor') - 0.1, tRight: wt('X3', 'holds') - 0.1 });
    const u = M.o3((t - wt('X2', 'push') + 0.1) / 0.5); xBy.set(285, TG + 4, 285, TG + 4 + 50 * u); M.hide(xBy.g, u < 0.02); xByL.style.opacity = M.io((t - wt('X3', 'floor') + 0.1) / 0.3);
    vis(xX, t, wt('X3', 'floor'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'almost') });
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
