// PUC Physics Ep 65: Rolling friction (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink;   // every force orange (told apart by labels), a red, v blue, mass m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
// italic symbol with a subscript (f_k, f_r, mu_r ...)
const itS = (p, x, y, b, s, col, fs = 28, a = {}) => { const e = it(p, x, y, '', col, Object.assign({ 'font-size': fs }, a)); e.textContent = ''; const t1 = mk(e, 'tspan', {}); t1.textContent = b; const t2 = mk(e, 'tspan', { 'font-size': Math.round(fs * 0.62), dy: Math.round(fs * 0.22) }); t2.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const NN = tc(FC, 'N'), FK = tc(FC, 'f_k'), FR = tc(FC, 'f_r'), MM = tc(MC, 'm'), MUK = '\\mu_k', MUR = '\\mu_r';
const G = 9.8, MUk = 0.4, MUr = 0.01;
const hatch = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 24) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 12, y2: y + 16, stroke: C.dim, 'stroke-width': 2 }); };
const wheel = (p, r, fill = C.ink) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill, stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 0, cy: 0, r: r * 0.55, fill: '#8D99AE' }); const sp = mk(g, 'g', {}); [0, 60, 120].forEach(a => mk(sp, 'line', { x1: -r * 0.5 * Math.cos(a * Math.PI / 180), y1: -r * 0.5 * Math.sin(a * Math.PI / 180), x2: r * 0.5 * Math.cos(a * Math.PI / 180), y2: r * 0.5 * Math.sin(a * Math.PI / 180), stroke: C.ink, 'stroke-width': 2.5 })); mk(g, 'circle', { cx: 0, cy: 0, r: 3.5, fill: C.ink }); return { g, sp }; };

Object.assign(M.IC, {
  suitcase: ['M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z', 'M9 7V4h6v3', 'M7 22h1', 'M16 22h1'],
  cupboard: ['M5 2h14v18H5z', 'M12 2v18', 'M10 10v2', 'M14 10v2', 'M6 20v2', 'M18 20v2'],
  tyre: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  road: ['M2 20h20', 'M5 15h4', 'M15 15h4', 'M10 10h4'],
  hill: ['M2 20 9 9l4 5 3-3 6 9Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV2 = T0('V2'), tV4 = T0('V4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['suitcase', 'Suitcase on wheels', 'ONE FINGER', 'suitcase'], ['cupboard', 'Steel cupboard', 'TWO PEOPLE TO DRAG', 'cupboard']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = [['suitcase', 'Suitcase on wheels', 'ROLLS · ONE FINGER'], ['cupboard', 'Steel cupboard', 'SLIDES · TWO PEOPLE']].map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${92 + i * 180}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="270" height="130"></svg></div>`).join('');
// mini drawings: suitcase on wheels (short push), cupboard dragged (long push)
const J0 = $('#jsv0'), J1 = $('#jsv1');
mk(J0, 'line', { x1: 10, y1: 112, x2: 260, y2: 112, stroke: C.ink, 'stroke-width': 3 });
mk(J0, 'rect', { x: 40, y: 40, width: 70, height: 60, rx: 8, fill: VC, stroke: C.ink, 'stroke-width': 2.5 });
mk(J0, 'path', { d: 'M62,40 V26 H88 V40', fill: 'none', stroke: C.ink, 'stroke-width': 3 });
[52, 98].forEach(x => mk(J0, 'circle', { cx: x, cy: 105, r: 6, fill: C.ink }));
mk(J1, 'line', { x1: 10, y1: 112, x2: 260, y2: 112, stroke: C.ink, 'stroke-width': 3 });
mk(J1, 'rect', { x: 30, y: 10, width: 70, height: 102, rx: 4, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
mk(J1, 'line', { x1: 65, y1: 10, x2: 65, y2: 112, stroke: C.ink, 'stroke-width': 2 });
const jA0 = PUC.arrow(J0, FC, 5, 14), jA1 = PUC.arrow(J1, FC, 7, 18);
const jL0 = it(J0, 150, 66, '1 finger', FC, { 'font-size': 18 }), jL1 = it(J1, 130, 52, 'two people', FC, { 'font-size': 18 });
const TILES = [[C.ink, 'Flat back tyre', 'tyre'], [C.ink, 'Same level road', 'road'], [C.ac, 'Feels like a hill?', 'hill']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'flat'), wt('H4', 'level'), wt('H4', 'hill')];

/* ---------- P: what it is + ideal vs real contact ---------- */
const PR = [['tyre', 'Ideal: hard wheel, hard floor', 'TOUCHES AT ONE POINT', 'NO FRICTION', C.okBg, C.ok, wt('P3', 'perfectly')], ['road', 'Real: both squash a little', 'TOUCHES ON A SMALL PATCH', 'ROLLING FRICTION', C.ac2, C.ac, wt('P5', 'squash')]];
$('#prs').innerHTML = PR.map(([ic, n, s, v, bg, fg], i) => `<div class="prow" id="pr${i}" style="top:${300 + i * 124}px"><i>${M.icon(ic, 26, C.ac, 2.4)}</i><div class="pn">${n}</div><div class="pm">${s}</div><div class="pv" style="background:${bg};color:${fg}">${v}</div></div>`).join('');
const pm = $('#pmS');
// ideal (left) and real (right), floor y 330
const PY = 330;
const pIdeal = mk(pm, 'g', {}), pReal = mk(pm, 'g', {});
mk(pIdeal, 'line', { x1: 50, y1: PY, x2: 350, y2: PY, stroke: C.ink, 'stroke-width': 3 });
mk(pIdeal, 'circle', { cx: 200, cy: PY - 120, r: 120, fill: C.soft, stroke: C.ink, 'stroke-width': 4 });
mk(pIdeal, 'circle', { cx: 200, cy: PY - 120, r: 8, fill: C.ink });
const pDot = mk(pIdeal, 'circle', { cx: 200, cy: PY, r: 9, fill: VC });
txt(pIdeal, 200, PY + 52, 'ONE POINT', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.ink });
txt(pIdeal, 200, PY + 80, 'IDEAL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
// real: the floor dips under the wheel, the wheel is flattened on a patch
const RX = 580, Rr = 120, dent = 22;
mk(pReal, 'path', { d: `M430,${PY} H${RX - 70} C${RX - 46},${PY} ${RX - 40},${PY + dent} ${RX - 20},${PY + dent} H${RX + 20} C${RX + 40},${PY + dent} ${RX + 46},${PY} ${RX + 70},${PY} H740`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const flatY = PY + dent;
const hc = Math.sqrt(Rr * Rr - 0), cyR = flatY - Rr + 30;     // circle sinks 16 px below the patch line, then cut flat
mk(pReal, 'path', { d: `M${RX - Math.sqrt(Rr * Rr - (flatY - cyR) ** 2)},${flatY} A${Rr},${Rr} 0 1 1 ${RX + Math.sqrt(Rr * Rr - (flatY - cyR) ** 2)},${flatY} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(pReal, 'circle', { cx: RX, cy: cyR, r: 8, fill: C.ink });
const pw = Math.sqrt(Rr * Rr - (flatY - cyR) ** 2);
const pPatch = mk(pReal, 'line', { x1: RX - pw, y1: flatY, x2: RX + pw, y2: flatY, stroke: VC, 'stroke-width': 8, 'stroke-linecap': 'round' });
txt(pReal, RX, PY + 52, 'A SMALL PATCH', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.ink });
txt(pReal, RX, PY + 80, 'REAL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
void hc;

/* ---------- S: the sim ---------- */
const s = $('#simS'), FY = 440, BW = 150, BH = 110, DH = 48, WR = 20, V = 20, PXN = 0.36;
hatch(s, 40, 744, FY);
// ghosts (outline copies)
const ghosts = [0.3, 0.2, 0.12].map(() => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 0, y: -BH, width: BW, height: BH, rx: 8, fill: C.ink }); const d = mk(g, 'rect', { x: -20, y: 0, width: BW + 40, height: 14, rx: 4, fill: C.ink }); g.style.opacity = 0; return { g, d }; });
// trolley
const troO = mk(s, 'g', {}), tro = mk(troO, 'g', {});
mk(tro, 'rect', { x: -20, y: FY - DH, width: BW + 40, height: 14, rx: 4, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
const wh = [10, BW - 10].map(x => { const w0 = mk(tro, 'g', { transform: `translate(${x},${FY - WR})` }); return wheel(w0, WR); });
// box + loads
const boxO = mk(s, 'g', {}), box = mk(boxO, 'g', {});
mk(box, 'rect', { x: 0, y: -BH, width: BW, height: BH, rx: 8, fill: C.ink });
mk(box, 'rect', { x: 14, y: -BH + 14, width: BW - 28, height: 30, rx: 4, fill: '#fff', opacity: 0.12 });
txt(box, BW / 2, -BH / 2 + 18, '50 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 22 });
const crates = [0, 1].map(k => { const o = mk(box, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: 25, y: -BH - 60 * (k + 1), width: 100, height: 58, rx: 6, fill: '#3A4560', stroke: '#fff', 'stroke-width': 2 }); txt(g, BW / 2, -BH - 60 * (k + 1) + 36, '25 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); return { o, g }; });
const aF = PUC.arrow(s, FC, 6, 18), aFr = PUC.arrow(s, FC, 6, 18);
const lF = it(s, 0, 0, 'F', FC, { 'font-size': 28 }), lFk = itS(s, 0, 0, 'f', 'k', FC, 28), lFr = itS(s, 0, 0, 'f', 'r', FC, 28);
const lFv = txt(s, 0, 0, '', { fill: FC, 'font-weight': 600, 'font-size': 18 });
// slow-mo inset under the back wheel
const IX = 220, IY = 236, IR = 122;
const ins = mk(s, 'g', {}), insIn = mk(ins, 'g', {});
const clipId = 'insClip'; const defs = mk(s, 'defs', {}); const cp = mk(defs, 'clipPath', { id: clipId }); mk(cp, 'circle', { cx: IX, cy: IY, r: IR });
const leadL = mk(s, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const leadC = mk(s, 'circle', { cx: 0, cy: 0, r: 26, fill: 'none', stroke: C.mute, 'stroke-width': 2.5 });
mk(insIn, 'circle', { cx: IX, cy: IY, r: IR, fill: '#fff' });
const insC = mk(insIn, 'g', { 'clip-path': `url(#${clipId})` });
const IF = IY + 46, ID = 12;    // floor line in the inset and the dent depth (drawn larger)
mk(insC, 'circle', { cx: IX, cy: IF + ID - 300 + 10, r: 300, fill: C.soft, stroke: C.ink, 'stroke-width': 4 });
mk(insC, 'path', { d: `M${IX - IR - 10},${IF} H${IX - 78} C${IX - 58},${IF} ${IX - 54},${IF + ID} ${IX - 34},${IF + ID} H${IX + 34} C${IX + 54},${IF + ID} ${IX + 58},${IF} ${IX + 78},${IF} H${IX + IR + 10} V${IY + IR + 10} H${IX - IR - 10} Z`, fill: '#EDE7D9', stroke: C.ink, 'stroke-width': 3 });
const insP = mk(insC, 'line', { x1: IX - 40, y1: IF + ID, x2: IX + 40, y2: IF + ID, stroke: VC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const iR = PUC.arrow(insC, FC, 6, 16), iN = PUC.arrow(insC, FC, 3.5, 12), iFr = PUC.arrow(insC, FC, 5, 14);
iN.g.setAttribute('opacity', 0.55);
const iRl = txt(insC, 0, 0, 'push of floor', { fill: FC, 'font-weight': 700, 'font-size': 15 });
const iFrl = itS(insC, 0, 0, 'f', 'r', FC, 24);
const iV = PUC.arrow(insC, VC, 4, 12), iVl = it(insC, IX - 32, IY - 12, 'v', VC, { 'font-size': 22 });
mk(ins, 'circle', { cx: IX, cy: IY, r: IR, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const insT = txt(ins, IX, IY + IR + 26, 'SQUASH AND LEAN DRAWN LARGER', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1, 'font-weight': 600 });
// readout
$('#roA').innerHTML = `<span class="k" style="color:${MC}">m</span><span class="v" id="r_m">50</span><span class="u">kg</span>
  <span class="k" style="color:${FC}">N</span><span class="v" id="r_n" style="color:${FC}">490.0</span><span class="u">N</span>
  <span class="k" style="color:${MC}" id="r_muk">μ<sub>k</sub></span><span class="v" id="r_mu">0.40</span><span class="u"></span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" id="r_f" style="color:${FC}">196.0</span><span class="u">N pull</span>
  <span class="k" style="color:${FC}" id="r_fk">f<sub>k</sub></span><span class="v" id="r_fr" style="color:${FC}">196.0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a</span><span class="v" style="color:${AC}">0</span><span class="u">m/s²</span>`;
// graph: force needed vs load
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 540, h: 156, xmax: 100, ymax: 400, xt: [0, 25, 50, 75, 100], yt: [0, 200, 400], yl: 'F (N)' });
txt($('#grS'), 110 + 540 + 18, 64 + 156 + 6, 'm (kg)', { fill: MC, 'font-size': 18 });
const gS = g.curve(FC, 5), gR = g.curve(FC, 5), gDs = g.dot(FC, 11), gDr = g.dot(FC, 11);
const gLs = txt($('#grS'), g.X(100) + 14, g.Y(392) + 6, 'sliding', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const gLr = txt($('#grS'), g.X(100) - 20, g.Y(9.8) - 16, 'rolling', { fill: FC, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px;background:var(--ac2);color:var(--ac)'; gTag.innerHTML = 'rolling line: 40x flatter'; $('#gr').appendChild(gTag);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Forty times less pull on wheels!' });
// timeline
const tA0 = wt('S2', 'pulls') - 0.3, tB = T0('S4'), tB0 = tB + 0.6;
const tFz = wt('S7', 'Freeze') + 0.05, tRes = T1('S9') + 0.2;
const mA = M.keys([[0, 50], [wt('S3', 'Seventy') - 0.3, 75], [wt('S3', 'One') - 0.3, 100]], 0.5);
const mB = M.keys([[0, 50], [wt('S5', 'same') - 0.1, 75], [wt('S5', 'hundred') - 0.5, 100]], 0.5);
const crA = [wt('S3', 'Seventy') - 0.3, wt('S3', 'One') - 0.3], crB = [wt('S5', 'same') - 0.1, wt('S5', 'hundred') - 0.5];
const warp = t => { if (t < tS7) return t; if (t < tFz) return tS7 + 0.25 * (t - tS7); if (t < tRes) return tS7 + 0.25 * (tFz - tS7); return tS7 + 0.25 * (tFz - tS7) + (t - tRes); };
const posA = t => 90 + V * Math.max(0, t - tA0), posB = t => 90 + V * Math.max(0, warp(t) - tB0);

/* ---------- D: the rule ---------- */
const STEPS = [[`${NN} = ${MM}g`, 'the normal force on a level floor'],
  [`${FK} = ${MUK}\\,${NN}`, 'sliding friction'],
  [`${FR} = ${MUR}\\,${NN}`, 'rolling friction: same form, μr has no unit'],
  [`${FR} / ${FK} = ${MUR} / ${MUK}`, 'same load, same N'],
  [`${MUR} \\ll ${MUK} \\;\\Rightarrow\\; ${FR} \\ll ${FK}`, 'rolling friction is far smaller']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 'Step'));
const dr = $('#drS');
const fbd = (oy, roll) => {
  const o = mk(dr, 'g', {}), g0 = mk(o, 'g', {});
  const fy = oy + 150, bx = 250, bw = 120, bh = 80, base = roll ? fy - 34 : fy;
  mk(g0, 'line', { x1: 60, y1: fy, x2: 724, y2: fy, stroke: C.ink, 'stroke-width': 3 });
  if (roll) { mk(g0, 'rect', { x: bx - 14, y: fy - 34, width: bw + 28, height: 12, rx: 3, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2 }); [bx + 6, bx + bw - 6].forEach(x => { const w0 = mk(g0, 'g', { transform: `translate(${x},${fy - 13})` }); wheel(w0, 13); }); }
  mk(g0, 'rect', { x: bx, y: base - bh, width: bw, height: bh, rx: 6, fill: C.ink });
  const cx = bx + bw / 2, cy = base - bh / 2;
  const aN = PUC.arrow(g0, FC, 5, 14), aW = PUC.arrow(g0, FC, 5, 14), aP = PUC.arrow(g0, FC, 5, 14), aF2 = PUC.arrow(g0, FC, 5, 14);
  aN.set(cx - 22, base - bh, cx - 22, base - bh - 60); aW.set(cx + 22, base - bh, cx + 22, base - bh - 0.1);
  const L = roll ? 14 : 80;
  aP.set(bx + bw + 4, cy, bx + bw + 4 + L, cy); aF2.set(bx - 4, fy - 8, bx - 4 - L, fy - 8);
  it(g0, cx - 50, base - bh - 34, 'N', FC, { 'font-size': 24 });
  it(g0, bx + bw + 10 + L, cy - 10, 'F', FC, { 'font-size': 24 });
  itS(g0, bx - 4 - L - 40, fy - 20, 'f', roll ? 'r' : 'k', FC, 24);
  // weight drawn downward through the floor side label
  aW.g.setAttribute('opacity', 0);
  const aMg = PUC.arrow(g0, FC, 5, 14); aMg.set(cx + 22, cy - 18, cx + 22, cy + 36);
  it(g0, cx + 34, cy + 30, 'mg', FC, { 'font-size': 22 });
  const tg = document.createElement('div'); tg.className = 'tg'; tg.style.cssText = `left:520px;top:${oy + 40}px;background:${roll ? 'var(--ac2)' : 'var(--soft)'};color:${roll ? 'var(--ac)' : 'var(--ink)'}`;
  tg.innerHTML = roll ? 'ROLLING · μ<sub>r</sub> = 0.010' : 'SLIDING · μ<sub>k</sub> = 0.40'; $('#dr').appendChild(tg);
  return { o, tg };
};
const fS = fbd(70, false), fR = fbd(260, true);
const exD = document.createElement('div'); exD.className = 'ghost'; exD.style.cssText = 'right:36px;top:18px'; exD.textContent = 'EXAMPLE FIGURES'; $('#dr').appendChild(exD);
$('#drF').innerHTML = K(`\\dfrac{${FR}}{${FK}} = \\dfrac{0.010}{0.40} = \\dfrac{1}{40}`) + `<span style="font:500 24px Poppins;color:var(--mute);margin-left:20px">for the same load</span>`;
$('#stF').innerHTML = K(`${MUR} \\ll ${MUK} \\qquad ${FR} \\ll ${FK}`);

/* ---------- R: link by link ---------- */
const LK = [['A flat tyre squashes more against the road', wt('R2', 'flat')], [`A bigger squash: a bigger μ<sub>r</sub>`, wt('R3', 'bigger')], [`So a bigger rolling friction <span class="fo">f<sub>r</sub></span>`, wt('R3', 'rolling')], ['Same speed needs a harder push', wt('R4', 'harder')]];
$('#lks').innerHTML = LK.map(([s0], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 94}px"><div class="ln">${i + 1}</div><div class="lt">${s0}</div></div>`).join('') +
  `<div class="pillp bad" id="lkP" style="left:36px;top:470px">That extra push is the hill he feels</div>`;
const rr = $('#rrS'), RRY = 290;
const tyreDraw = (cx, sq) => { const o = mk(rr, 'g', {}), g0 = mk(o, 'g', {});
  mk(g0, 'line', { x1: cx - 160, y1: RRY, x2: cx + 160, y2: RRY, stroke: C.ink, 'stroke-width': 3 });
  const r = 92, cy = RRY - r + sq, w = Math.sqrt(r * r - (RRY - cy) ** 2);
  mk(g0, 'path', { d: `M${cx - w},${RRY} A${r},${r} 0 1 1 ${cx + w},${RRY} Z`, fill: '#3A4560', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g0, 'circle', { cx, cy, r: 46, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g0, 'circle', { cx, cy, r: 6, fill: C.ink });
  const p = mk(g0, 'line', { x1: cx - w, y1: RRY, x2: cx + w, y2: RRY, stroke: VC, 'stroke-width': 8, 'stroke-linecap': 'round' });
  return { o, p, w };
};
const tyP = tyreDraw(210, 4), tyF = tyreDraw(570, 40);
const tyPl = txt(rr, 210, RRY + 36, 'PUMPED · SMALL PATCH', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.ink });
const tyFl = txt(rr, 570, RRY + 36, 'FLAT · BIG PATCH', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.red });
const TB = [['Pumped', '0.005', '3.9 N'], ['Flat', '0.020', '15.7 N']];
$('#tbs').innerHTML = TB.map(([a, mu, f], i) => `<div class="tb" id="tb${i}" style="top:${392 + i * 68}px"><span style="left:36px">${a}</span><span style="left:294px">${mu}</span><span class="fo" style="left:524px">${f}</span></div>`).join('');
const tTb = [wt('R3', 'bigger'), wt('R3', 'rolling')];

/* ---------- K: sliding vs rolling + think ---------- */
const k1 = $('#k1S'), TP = 40;
const kFloor = mk(k1, 'path', { d: '', fill: '#EDE7D9', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
{ let d = `M60,420 L60,300`; for (let x = 60; x < 724; x += TP) d += ` L${x + TP / 2},${284 + ((x / TP) % 3) * 4} L${x + TP},300`; d += ' L724,420 Z'; attr(kFloor, 'd', d); }
const kTopO = mk(k1, 'g', {}), kTop = mk(kTopO, 'g', {});
{ let d = `M-40,150 L-40,282`; for (let x = -40; x < 760; x += TP) d += ` L${x + TP / 2},${300 - ((x / TP + 1) % 3) * 4} L${x + TP},282`; d += ' L760,150 Z'; mk(kTop, 'path', { d, fill: C.ink, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); }
const k1clip = mk(mk(k1, 'defs', {}), 'clipPath', { id: 'k1c' }); mk(k1clip, 'rect', { x: 60, y: 120, width: 664, height: 320 });
kTopO.setAttribute('clip-path', 'url(#k1c)'); kFloor.setAttribute('clip-path', 'url(#k1c)');
txt(k1, 80, 190, 'BOX', { fill: '#fff', 'font-weight': 600, 'letter-spacing': 2 }); txt(k1, 80, 400, 'FLOOR', { fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
const kMarks = [0, 1, 2, 3].map(i => mk(k1, 'circle', { cx: 0, cy: 291, r: 7, fill: 'none', stroke: FC, 'stroke-width': 3, opacity: 0 }));
const kExk = txt(k1, 392, 470, 'BUMPS DRAWN MUCH LARGER', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1, 'font-weight': 600 });
$('#k1P').innerHTML = `${M.icon('x', 24, C.red, 3)}<span>The whole surface scrapes: big <span class="fo">f<sub>k</sub></span></span>`;
const k2 = $('#k2S'), KF = 400, KR = 110;
mk(k2, 'line', { x1: 40, y1: KF, x2: 744, y2: KF, stroke: C.ink, 'stroke-width': 3 });
const kTr = mk(k2, 'g', {});
const kWo = mk(k2, 'g', {}), kW = mk(kWo, 'g', {});
mk(kW, 'circle', { cx: 0, cy: 0, r: KR, fill: C.soft, stroke: C.ink, 'stroke-width': 5 });
const kRim = mk(kW, 'g', {});
const RIM = 12; const rimD = [...Array(RIM)].map((_, i) => mk(kRim, 'circle', { cx: (KR - 14) * Math.cos(i * 2 * Math.PI / RIM), cy: (KR - 14) * Math.sin(i * 2 * Math.PI / RIM), r: 7, fill: C.dim }));
mk(kW, 'circle', { cx: 0, cy: 0, r: 9, fill: C.ink });
const kPrints = [...Array(14)].map(() => mk(kTr, 'line', { x1: 0, y1: KF + 2, x2: 0, y2: KF + 2, stroke: VC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 }));
const kVa = PUC.arrow(k2, VC, 5, 14), kVl = it(k2, 0, 0, 'v', VC, { 'font-size': 24 });
$('#k2P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>Touch down, lift off: small <span class="fo">f<sub>r</sub></span></span>`;
const th1 = PUC.think($('#th1'), { q: 'A steel ball rolls on a soft carpet and on a steel plate. Where is the rolling friction bigger?', opts: ['Carpet', 'Steel plate'], right: 0, why: 'The carpet squashes far more. More squash, more rolling friction.' });

/* ---------- V: friction helps + think + cutting it ---------- */
const v1 = $('#v1S'), GY = 400;
hatch(v1, 40, 744, GY);
mk(v1, 'path', { d: `M270,120 L300,240 L320,330`, stroke: '#3A4560', 'stroke-width': 40, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' });
mk(v1, 'path', { d: `M300,330 h140 a24,24 0 0 1 24,24 v22 a24,24 0 0 1 -24,24 h-150 a20,20 0 0 1 -20,-20 v-30 a20,20 0 0 1 20,-20 Z`, fill: '#3A4560', stroke: C.ink, 'stroke-width': 3 });
const vA1 = PUC.arrow(v1, FC, 6, 18), vA2 = PUC.arrow(v1, FC, 6, 18);
const vL1 = txt(v1, 0, 0, 'foot on ground', { fill: FC, 'font-weight': 700, 'font-size': 18 }), vL2 = txt(v1, 0, 0, 'friction on foot', { fill: FC, 'font-weight': 700, 'font-size': 18 });
$('#v1P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>Friction moves you forward</span>`;
const v2 = $('#v2S'), BY = 400, BR = 130, BX = 330;
hatch(v2, 40, 744, BY);
const bW2 = mk(v2, 'g', { transform: `translate(${BX},${BY - BR})` });
mk(bW2, 'circle', { cx: 0, cy: 0, r: BR, fill: 'none', stroke: C.ink, 'stroke-width': 16 });
mk(bW2, 'circle', { cx: 0, cy: 0, r: BR - 16, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const bSp = mk(bW2, 'g', {}); for (let a = 0; a < 180; a += 30) mk(bSp, 'line', { x1: -(BR - 18) * Math.cos(a * Math.PI / 180), y1: -(BR - 18) * Math.sin(a * Math.PI / 180), x2: (BR - 18) * Math.cos(a * Math.PI / 180), y2: (BR - 18) * Math.sin(a * Math.PI / 180), stroke: C.dim, 'stroke-width': 2 });
mk(bW2, 'circle', { cx: 0, cy: 0, r: 14, fill: C.ink });
const bA1 = PUC.arrow(v2, FC, 6, 18), bA2 = PUC.arrow(v2, FC, 6, 18), bV = PUC.arrow(v2, VC, 6, 18);
const bL1 = txt(v2, 0, 0, 'tyre on road', { fill: FC, 'font-weight': 700, 'font-size': 18 }), bL2 = txt(v2, 0, 0, 'friction on tyre', { fill: FC, 'font-weight': 700, 'font-size': 18 }), bVl = it(v2, 0, 0, 'v', VC, { 'font-size': 26 });
$('#v2P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>The same for a bicycle tyre</span>`;
const th2 = PUC.think($('#th2'), { q: 'On a perfectly frictionless road, could Aarav\'s bicycle start moving?', opts: ['Yes', 'No'], right: 1, why: 'The wheel just spins: no friction, no forward push. Brakes fail too.' });
// oil
const v3 = $('#v3S');
const rough = (y, up, fill, amp) => { let d = `M60,${up ? y + 120 : y - 120} L60,${y}`; for (let x = 60; x < 724; x += 32) d += ` L${x + 16},${y + (up ? -amp : amp) * (0.6 + 0.4 * ((x / 32) % 2))} L${x + 32},${y}`; d += ` L724,${up ? y + 120 : y - 120} Z`; return mk(v3, 'path', { d, fill, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); };
const oil = mk(v3, 'rect', { x: 60, y: 236, width: 664, height: 82, fill: '#F2C94C', opacity: 0.75 });
rough(236, false, C.ink, 14); rough(318, true, '#EDE7D9', 14);
const oilL = txt(v3, 392, 284, 'OIL FILM', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22, 'letter-spacing': 2 });
txt(v3, 80, 160, 'MOVING PART', { fill: '#fff', 'font-weight': 600, 'letter-spacing': 2 }); txt(v3, 80, 420, 'FIXED PART', { fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
$('#v3P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>Oil keeps the bumps apart</span>`;
// ball bearing
const v4 = $('#v4S'), BCX = 392, BCY = 270, RI = 70, RB = 24, RO = RI + 2 * RB;
mk(v4, 'circle', { cx: BCX, cy: BCY, r: RO + 12, fill: 'none', stroke: '#8D99AE', 'stroke-width': 24 });
mk(v4, 'circle', { cx: BCX, cy: BCY, r: RO + 12, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); mk(v4, 'circle', { cx: BCX, cy: BCY, r: RO + 24, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); mk(v4, 'circle', { cx: BCX, cy: BCY, r: RO, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const axO = mk(v4, 'g', { transform: `translate(${BCX},${BCY})` }), ax = mk(axO, 'g', {});
mk(ax, 'circle', { cx: 0, cy: 0, r: RI, fill: '#5B6478', stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'circle', { cx: 0, cy: 0, r: 30, fill: C.ink }); mk(ax, 'line', { x1: 0, y1: -RI + 6, x2: 0, y2: -34, stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' });
const balls = [...Array(8)].map(() => { const o = mk(v4, 'g', {}), b = mk(o, 'g', {}); mk(b, 'circle', { cx: 0, cy: 0, r: RB - 1.5, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2.5 }); mk(b, 'line', { x1: 0, y1: -RB + 6, x2: 0, y2: -6, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }); return b; });
txt(v4, BCX, BCY + RO + 64, 'AXLE · BALLS · WHEEL HUB', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
$('#v4P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>The balls roll: sliding becomes rolling</span>`;

/* ---------- W: worked example ---------- */
const nw = h => `<span style="white-space:nowrap">${h}</span>`;
$('#wkq').innerHTML = `A ${K('10\\ \\text{t}')} wagon rolls on rails with ${nw(K(`${MUR} = 0.002`))}. Find the rolling friction, and the friction if it skids with ${nw(K(`${MUK} = 0.4`))}. ${nw(K('(g = 9.8\\ \\text{m/s}^2)'))}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${NN} = 10\\,000 \\times 9.8 = ${tc(FC, '98\\,000\\ \\text{N}')}`)],
  [K(`${FR} = 0.002 \\times 98\\,000 = ${tc(FC, '196\\ \\text{N}')}`)],
  [K(`${FK} = 0.4 \\times 98\\,000 = ${tc(FC, '39\\,200\\ \\text{N}')}`)],
  [K(`${FK} / ${FR} = 200`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), RLY = 300;
mk(w, 'line', { x1: 40, y1: RLY, x2: 744, y2: RLY, stroke: C.ink, 'stroke-width': 6 });
for (let x = 50; x < 744; x += 46) mk(w, 'rect', { x, y: RLY + 3, width: 24, height: 10, fill: '#8D99AE' });
const wag = mk(w, 'g', {});
mk(wag, 'rect', { x: 170, y: 140, width: 440, height: 110, rx: 8, fill: C.ink });
mk(wag, 'rect', { x: 190, y: 158, width: 400, height: 32, rx: 4, fill: '#fff', opacity: 0.12 });
txt(wag, 390, 228, 'WAGON · 10 t', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 22, 'letter-spacing': 2 });
[220, 290, 490, 560].forEach(x => { const w0 = mk(wag, 'g', { transform: `translate(${x},${RLY - 26})` }); wheel(w0, 24); });
const wBar = [mk(w, 'rect', { x: 200, y: 352, width: 0, height: 34, rx: 4, fill: FC }), mk(w, 'rect', { x: 200, y: 420, width: 0, height: 34, rx: 4, fill: FC })];
const wBl = [itS(w, 60, 378, 'f', 'r', FC, 26), itS(w, 60, 446, 'f', 'k', FC, 26)];
txt(w, 100, 378, 'rolling', { fill: C.mute, 'font-size': 16 }); txt(w, 100, 446, 'skid', { fill: C.mute, 'font-size': 16 });
const wBv = [txt(w, 0, 378, '196 N', { fill: FC, 'font-weight': 700, 'font-size': 22 }), txt(w, 0, 446, '39,200 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' })];
const avW = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Diya', face: IMG + 'diya-face.jpg', text: '200 times less, just from wheels!' });
const tW = [wt('W3', 'N'), wt('W4', 'Rolling'), wt('W5', 'Skidding'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The contact point does not slide, so rolling friction is zero', right: 'Real surfaces squash: rolling friction is small, never zero' });
const tp = $('#tpS'), TPY = 200;
[[140, 0, 'IDEAL · f_r = 0'], [380, 1, 'REAL · f_r small']].forEach(([cx, real, lab]) => {
  mk(tp, 'line', { x1: cx - 100, y1: TPY, x2: cx + 100, y2: TPY, stroke: C.ink, 'stroke-width': 3 });
  const r = 70, cy = TPY - r + (real ? 12 : 0), ww = Math.sqrt(Math.max(0, r * r - (TPY - cy) ** 2));
  if (real) mk(tp, 'path', { d: `M${cx - ww},${TPY} A${r},${r} 0 1 1 ${cx + ww},${TPY} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3.5 });
  else mk(tp, 'circle', { cx, cy, r, fill: C.soft, stroke: C.ink, 'stroke-width': 3.5 });
  if (real) mk(tp, 'line', { x1: cx - ww, y1: TPY, x2: cx + ww, y2: TPY, stroke: VC, 'stroke-width': 7, 'stroke-linecap': 'round' }); else mk(tp, 'circle', { cx, cy: TPY, r: 7, fill: VC });
  const tt = txt(tp, cx, TPY + 40, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 17, fill: real ? C.ok : C.red }); tt.textContent = lab;
});
const where = PUC.where($('#wa'), { on: [], type: 'Comparing sliding and rolling friction; why wheels and ball bearings help' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 388,
  q: `A ${K('60\\ \\text{kg}')} crate is pushed at a steady speed across a floor (${K(`${MUK} = 0.5`)}). It is then put on a ${K('20\\ \\text{kg}')} trolley (${K(`${MUR} = 0.02`)}). By what factor does the force needed fall? <span style="white-space:nowrap">${K('(g = 10\\ \\text{m/s}^2)')}</span>`,
  opts: ['25 times', '18.75 times', '12.5 times', '7.5 times'], right: 1 });
const so = PUC.solution($('#so'), [[K(`\\text{slide: } ${NN} = 600\\ \\text{N}`)], [K(`${FK} = 0.5 \\times 600 = 300\\ \\text{N}`)], [K(`\\text{trolley: } ${NN} = 800\\ \\text{N}`)], [K(`${FR} = 0.02 \\times 800 = 16\\ \\text{N}`)], [K(`300/16 = ${tc(C.ok, '18.75')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Sliding'), wt('A2', 'force'), wt('A3', 'eighty'), wt('A3', 'force'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · rolling friction', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${FK} = ${MUK}${NN} \\quad ${FR} = ${MUR}${NN} \\quad ${MUR} \\ll ${MUK}`),
    '<b>Cause</b>: wheel and surface squash a little at the contact',
    '<b>Wheels, ball bearings</b>: turn sliding into rolling',
    '<b>Friction helps too</b>: walking, cycling, braking'] });
const YQ = ['Why does a flat tyre make cycling harder on the same road?', 'Why is rolling friction not zero, if the contact point does not slide?', 'How do ball bearings reduce friction in a machine?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 66', topic: 'What pulls a block down a slope? Motion on Inclined Planes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tRes, 1, 960, 540]]);
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
    [0, 1].forEach(i => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const u0 = M.o3((t - tMorph - 0.8) / 0.5), u1 = M.o3((t - tMorph - 1.2) / 0.7);
    jA0.set(116, 70, 116 + 26 * u0, 70); jA1.set(106, 62, 106 + 110 * u1, 62); jL0.style.opacity = u0.toFixed(3); jL1.style.opacity = u1.toFixed(3);
    vis($('#hjP'), t, wt('H2', 'easy') - 0.2, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkW'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pD'), t, wt('P2', 'force') - 0.1, { st: 0.04 });
    PR.forEach((p, i) => { vis($('#pr' + i), t, p[6] - 0.15, 1e9, POP); vis($('#pr' + i + ' .pv'), t, i ? wt('P5', 'causes') : wt('P3', 'No'), 1e9, POP); });
    vis($('#pm'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis(pIdeal, t, wt('P3', 'wheel') - 0.1, 1e9, { dy: 20 });
    pDot.setAttribute('r', (9 + 4 * Math.max(0, Math.sin((t - wt('P3', 'point')) * 6)) * (t > wt('P3', 'point') && t < wt('P3', 'point') + 1.6 ? 1 : 0)).toFixed(2));
    vis(pReal, t, wt('P5', 'real') - 0.1, 1e9, { dy: 20 });
    M.draw(pPatch, t, wt('P5', 'meet') - 0.1, 0.5);
    vis($('#exP'), t, wt('P5', 'squash') - 0.1, 1e9, { dy: 8 });
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const B = t >= tB;                           // phase B: on the trolley
    const fade = B ? M.io((t - tB - 0.05) / 0.35) : 1 - M.io((t - tB + 0.3) / 0.3);
    const mv = B ? mB(t) : mA(t), m = Math.round(mv), mu = B ? MUr : MUk;
    const x = B ? posB(t) : posA(t), yb = B ? FY - DH : FY;
    attr(box, 'transform', `translate(${x.toFixed(1)},${yb})`);
    vis(boxO, t, tS1 + 0.4, 1e9, { dy: -30 }); boxO.setAttribute('opacity', fade.toFixed(3));
    // crates drop in with the load
    const crT = B ? crB : crA;
    crates.forEach((c, k) => { const u = M.spring(t - crT[k], M.SOFT), on = t >= crT[k] - 0.05; attr(c.g, 'transform', `translate(0,${(-70 * (1 - u)).toFixed(1)})`); c.o.setAttribute('opacity', on ? M.clamp((t - crT[k] + 0.05) / 0.12).toFixed(3) : 0); });
    // trolley
    attr(tro, 'transform', `translate(${x.toFixed(1)},0)`); troO.setAttribute('opacity', B ? fade.toFixed(3) : 0);
    const ang = ((x - 90) / WR) * 180 / Math.PI; wh.forEach(q => attr(q.sp, 'transform', `rotate(${ang.toFixed(1)})`));
    // ghosts
    const moving = B ? (t > tB0 && (t < tS7 || t > tRes) || (t >= tS7 && t < tFz)) : t > tA0;
    ghosts.forEach((gh, k) => { const dt = (t >= tS7 && t < tRes ? 4 : 1) * (k + 1), gx = B ? posB(t - dt) : posA(t - dt); attr(gh.g, 'transform', `translate(${gx.toFixed(1)},${yb})`); M.hide(gh.d, !B); gh.d.setAttribute('y', DH - 14 + 0); gh.g.style.opacity = moving && x - gx > 6 && fade > 0.9 && !(B && t < tB0 + 0.5) ? [0.3, 0.2, 0.12][k] * 0.6 : 0; });
    // forces: pull F and friction, to scale (0.36 px per newton, min 14 px)
    const Nv = G * m, Fv = mu * Nv, fu = M.o3((t - (B ? tB + 0.5 : wt('S2', 'pulls')) + 0.1) / 0.5) * fade, L = Math.max(14, PXN * Fv) * fu;
    const right = x + BW + (B ? 24 : 4), my = yb - BH / 2;
    aF.set(right, my, right + L, my); attr(lF, 'x', (right + L + 8).toFixed(1)); attr(lF, 'y', (my + 10).toFixed(1)); lF.style.opacity = fu.toFixed(3);
    const fx0 = B ? x - 14 : x - 4, fy0 = FY - 8;
    aFr.set(fx0, fy0, fx0 - L, fy0);
    const lab = B ? lFr : lFk; attr(lab, 'x', (fx0 - L - 40).toFixed(1)); attr(lab, 'y', (fy0 - 2).toFixed(1)); lFk.style.opacity = B ? 0 : fu.toFixed(3); lFr.style.opacity = B ? fu.toFixed(3) : 0;
    M.setT(lFv, (B ? Fv.toFixed(2) : Fv.toFixed(1)) + ' N'); attr(lFv, 'x', (right + 4).toFixed(1)); attr(lFv, 'y', (my - 18).toFixed(1)); lFv.style.opacity = fu.toFixed(3);
    // readout (m rounded first, then N and F from it)
    M.setT($('#r_m'), String(m)); M.setT($('#r_n'), Nv.toFixed(1)); M.setT($('#r_mu'), B ? '0.010' : '0.40');
    $('#r_muk').innerHTML = B ? 'μ<sub>r</sub>' : 'μ<sub>k</sub>'; $('#r_fk').innerHTML = B ? 'f<sub>r</sub>' : 'f<sub>k</sub>';
    const fs = B ? Fv.toFixed(2) : Fv.toFixed(1); M.setT($('#r_f'), fs); M.setT($('#r_fr'), fs);
    const md = $('#mode'); M.setT(md, B ? 'ROLLING · ON WHEELS' : 'SLIDING'); md.style.background = B ? C.ac2 : C.soft; md.style.color = B ? C.ac : C.ink;
    // graph: sliding line and rolling line grow with the load, dot linked to the sim
    const mAmax = B ? 100 : mA(t), mBmax = B ? mB(t) : 0;
    gS(q => [q, MUk * G * q], 0, t > wt('S2', 'pulls') - 0.1 ? mAmax * M.io((t - wt('S2', 'pulls') + 0.1) / 0.6) : 0);
    gR(q => [q, MUr * G * q], 0, B ? mBmax * M.io((t - tB - 0.5) / 0.6) : 0);
    gDs(B ? 100 : mv, MUk * G * (B ? 100 : mv), t > wt('S2', 'pulls') - 0.1);
    gDr(mv, MUr * G * mv, B && t > tB + 0.5);
    vis(gLs, t, wt('S3', 'One'), 1e9, { dy: 0 }); vis(gLr, t, wt('S5', 'hundred'), 1e9, { dy: 0 });
    vis(gTag, t, wt('S6', 'forty') - 0.1, 1e9, POP);
    // slow-mo replay: freeze, magnify the back wheel's contact
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz + 0.05, tRes, { ...POP, sc: 0.8 });
    if (t >= tRes) vis($('#smo'), t, tRes + 0.05, tD1 - 0.4, { ...POP, sc: 0.8 });
    const iu = M.io((t - wt('S7', 'look') + 0.1) / 0.4) * (1 - M.io((t - tRes - 0.4) / 0.3));
    const wx = x + 10, wy = FY;
    M.hide(ins, iu <= 0.01); ins.setAttribute('opacity', iu.toFixed(3));
    attr(leadC, 'cx', wx.toFixed(1)); attr(leadC, 'cy', wy); leadC.setAttribute('opacity', iu.toFixed(3));
    const ang2 = Math.atan2(wy - IY, wx - IX); attr(leadL, 'x1', (IX + IR * Math.cos(ang2)).toFixed(1)); attr(leadL, 'y1', (IY + IR * Math.sin(ang2)).toFixed(1)); attr(leadL, 'x2', (wx - 26 * Math.cos(ang2)).toFixed(1)); attr(leadL, 'y2', (wy - 26 * Math.sin(ang2)).toFixed(1)); leadL.setAttribute('opacity', iu.toFixed(3));
    M.draw(insP, t, wt('S8', 'patch') - 0.2, 0.5);
    const ru = M.o3((t - wt('S9', 'pushes') + 0.05) / 0.6), cu = M.o3((t - wt('S9', 'backward') + 0.05) / 0.5);
    const px = IX + 30, py = IF + ID - 2, Rl = 120 * ru, lean = 0.2;
    iR.set(px, py, px - Rl * lean, py - Rl); iN.set(px + 14, py, px + 14, py - Rl * cu); iFr.set(px, py + 1, px - 40 * cu, py + 1);
    attr(iRl, 'x', (px + 12).toFixed(1)); attr(iRl, 'y', (py - Rl + 40).toFixed(1)); iRl.style.opacity = ru.toFixed(3);
    attr(iFrl, 'x', (px - 40 * cu - 34).toFixed(1)); attr(iFrl, 'y', (py - 6).toFixed(1)); iFrl.style.opacity = cu.toFixed(3);
    const vu = M.o3((t - wt('S7', 'look') - 0.3) / 0.5); iV.set(IX - 100, IY - 20, IX - 100 + 60 * vu, IY - 20); iVl.style.opacity = vu.toFixed(3);
    avS(t, wt('S6', 'flatter') + 0.3, tS7 - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 472]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    vis(exD, t, tD1 + 0.6, 1e9, { dy: 8 });
    vis(fS.o, t, wt('D3', 'Sliding') - 0.1, 1e9, { dy: 16 }); vis(fS.tg, t, wt('D3', 'Sliding') + 0.2, 1e9, POP);
    vis(fR.o, t, wt('D4', 'Rolling') - 0.1, 1e9, { dy: 16 }); vis(fR.tg, t, wt('D4', 'Rolling') + 0.2, 1e9, POP);
    vis($('#drF'), t, tStep[3] + 0.9, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'For') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'sliding') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => vis($('#lk' + i), t, tt - 0.15, 1e9, { dx: -24, dy: 0 }));
    vis($('#lkP'), t, wt('R4', 'hill') - 0.2, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    vis($('#exR'), t, tR1 + 0.8, 1e9, { dy: 8 });
    vis(tyP.o, t, tR1 + 0.7, 1e9, { dy: 16 }); vis(tyPl, t, tR1 + 0.9, 1e9, { dy: 0 });
    vis(tyF.o, t, wt('R2', 'flat') - 0.1, 1e9, { dy: 16 }); vis(tyFl, t, wt('R2', 'squashes'), 1e9, { dy: 0 });
    M.draw(tyP.p, t, tR1 + 1.1, 0.4); M.draw(tyF.p, t, wt('R2', 'squashes') - 0.1, 0.5);
    TB.forEach((_, i) => { const el = $('#tb' + i); vis(el, t, tTb[i] - 0.15, 1e9, { dy: 14 }); el.style.background = i ? mix(C.soft, C.redBg, M.io((t - tTb[1]) / 0.3)) : C.soft; });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#k1'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const sx = 50 * Math.max(0, t - wt('K1', 'Sliding'));
    attr(kTop, 'transform', `translate(${(sx % TP).toFixed(1)},0)`);
    // where the bumps catch: marks that flash at the contact peaks
    kMarks.forEach((c, i) => { const ph = ((((t - wt('K1', 'catch')) * 2 + i * 0.25) % 1) + 1) % 1; attr(c, 'cx', 140 + i * 160); c.setAttribute('opacity', t > wt('K1', 'catch') - 0.1 ? (1 - ph).toFixed(3) : 0); attr(c, 'r', (6 + 10 * ph).toFixed(1)); });
    vis(kExk, t, tK1 + 0.6, 1e9, { dy: 0 });
    vis($('#k1P'), t, wt('K1', 'tear') - 0.1, 1e9, POP);
    vis($('#k2'), t, T0('K2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const t2 = wt('K2', 'each'), d2 = Math.min(400, 34 * Math.max(0, t - t2)), wx = 160 + d2, ang = d2 / KR;
    attr(kW, 'transform', `translate(${wx.toFixed(1)},${KF - KR})`); attr(kRim, 'transform', `rotate(${(ang * 180 / Math.PI).toFixed(1)})`);
    rimD.forEach((d, i) => { const a = i * 2 * Math.PI / RIM + ang, yb = Math.sin(a); d.setAttribute('fill', yb > 0.966 ? VC : C.dim); attr(d, 'r', yb > 0.966 ? 9 : 7); });
    kPrints.forEach((p, i) => { const xp = 160 + i * (2 * Math.PI * (KR - 14) / RIM) * (KR / (KR - 14)); const on = xp <= wx + 2 && t > t2; attr(p, 'x1', (xp - 6).toFixed(1)); attr(p, 'x2', (xp + 6).toFixed(1)); p.setAttribute('opacity', on ? 0.45 : 0); });
    const vu = M.o3((t - t2) / 0.5); kVa.set(wx - 50, KF - 2 * KR - 30, wx - 50 + 100 * vu, KF - 2 * KR - 30); attr(kVl, 'x', (wx + 60).toFixed(1)); attr(kVl, 'y', KF - 2 * KR - 20); kVl.style.opacity = vu.toFixed(3);
    vis($('#k2P'), t, wt('K2', 'squash') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'bigger') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'soft') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V2');
    vis($('#v1'), t, tV1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const u1 = M.o3((t - wt('V1', 'pushes') + 0.1) / 0.5), u2 = M.o3((t - wt('V1', 'friction', 1) + 0.1) / 0.5);
    vA1.set(390, GY + 30, 390 - 150 * u1, GY + 30); attr(vL1, 'x', 240); attr(vL1, 'y', GY + 66); vL1.style.opacity = u1.toFixed(3);
    vA2.set(472, GY - 8, 472 + 130 * u2, GY - 8); attr(vL2, 'x', 480); attr(vL2, 'y', GY - 26); vL2.style.opacity = u2.toFixed(3);
    vis($('#v1P'), t, wt('V1', 'forward') - 0.1, 1e9, POP);
    vis($('#v2'), t, wt('V1', 'friction', 1) - 0.1, out, { dx: 60, dy: 0, ...o });
    const b1 = M.o3((t - wt('V1', 'friction', 1) + 0.3) / 0.5);
    bA1.set(BX, BY + 30, BX - 130 * b1, BY + 30); attr(bL1, 'x', BX - 150); attr(bL1, 'y', BY + 66); bL1.style.opacity = b1.toFixed(3);
    bA2.set(BX + 10, BY - 8, BX + 10 + 130 * b1, BY - 8); attr(bL2, 'x', BX + 150); attr(bL2, 'y', BY - 2); bL2.style.opacity = b1.toFixed(3);
    bV.set(BX - 50, BY - 2 * BR - 30, BX - 50 + 100 * b1, BY - 2 * BR - 30); attr(bVl, 'x', BX + 64); attr(bVl, 'y', BY - 2 * BR - 20); bVl.style.opacity = b1.toFixed(3);
    attr(bSp, 'transform', `rotate(${(80 * Math.max(0, t - tV1)).toFixed(1)})`);
    vis($('#v2P'), t, wt('V1', 'forward') + 0.4, 1e9, POP);
    vis($('#th2'), t, tV2 + 0.05, OUT('V4'), { dy: 36, ...o });
    th2(t, { tin: tV2, tOpts: wt('V2', 'moving') - 0.1, tCount: T1('V2') + 0.05, dur: 3, tAns: T0('V3') - 0.02, tWhy: wt('V3', 'wheel') });
    vis($('#v3'), t, tV4 + 0.1, OUT('W1'), { dx: -60, dy: 0, ...o });
    vis(oil, t, wt('V4', 'oil') - 0.1, 1e9, { dy: 0 }); vis(oilL, t, wt('V4', 'oil') + 0.1, 1e9, { dy: 0 });
    vis($('#v3P'), t, wt('V4', 'oil') + 0.3, 1e9, POP);
    vis($('#v4'), t, wt('V4', 'ball') - 0.2, OUT('W1'), { dx: 60, dy: 0, ...o });
    const wA = 1.4 * Math.max(0, t - wt('V4', 'ball')), oA = wA * RI / (RI + RO);
    attr(ax, 'transform', `rotate(${(wA * 180 / Math.PI).toFixed(1)})`);
    balls.forEach((b, i) => { const a = oA + i * Math.PI / 4, r = RI + RB; attr(b, 'transform', `translate(${(BCX + r * Math.cos(a)).toFixed(1)},${(BCY + r * Math.sin(a)).toFixed(1)}) rotate(${(-wA * RI / RB * 180 / Math.PI * 0.5).toFixed(1)})`); });
    vis($('#v4P'), t, wt('V4', 'rolling') - 0.2, 1e9, POP);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    vis(wag, t, wt('W2', 'wagon') - 0.1, 1e9, { dy: -20 });
    const r1 = M.o3((t - tW[1] - 0.6) / 0.5), r2 = M.o3((t - tW[2] - 0.6) / 0.9);
    attr(wBar[0], 'width', (4 * r1).toFixed(1)); attr(wBar[1], 'width', (480 * r2).toFixed(1));
    wBl[0].style.opacity = r1.toFixed(3); wBl[1].style.opacity = r2.toFixed(3);
    attr(wBv[0], 'x', 216); wBv[0].style.opacity = r1.toFixed(3); attr(wBv[1], 'x', 200 + 480 * r2 - 12); wBv[1].setAttribute('fill', '#fff'); wBv[1].style.opacity = M.clamp((r2 - 0.6) / 0.4).toFixed(3);
    avW(t, wt('W6', 'pull') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'rolling') - 0.2, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Real') - 0.1 });
    vis(tp, t, wt('X3', 'perfectly') - 0.3, 1e9, { dy: 16 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'factor') - 0.3, tCount, tAns });
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
