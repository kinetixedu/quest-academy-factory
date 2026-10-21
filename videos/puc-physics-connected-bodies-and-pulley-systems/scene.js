// PUC Physics Ep 67: Connected bodies and pulley systems (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, SC = C.violet, MC = C.ink;     // every force (weights, T, F, friction) orange, a and g red, v blue, s violet, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); if (/_\w/.test(s)) e.innerHTML = s.replace(/_(\w)/g, '<tspan baseline-shift="sub" font-size="68%">$1</tspan>'); else e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const m1 = tc(MC, 'm_1'), m2 = tc(MC, 'm_2'), gg = tc(AC, 'g'), aa = tc(AC, 'a'), TT = tc(FC, 'T'), FF = tc(FC, 'F');
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const G = 9.8, aAtw = (p, q) => (p - q) * G / (p + q), TAtw = (p, q) => 2 * p * q * G / (p + q);
const ground = (p, x0, x1, y) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(g, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); return g; };
const ceiling = (p, x0, x1, y) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 24) mk(g, 'line', { x1: x, y1: y - 4, x2: x - 12, y2: y - 16, stroke: C.dim, 'stroke-width': 2 }); return g; };
// labelled arrow: set(x1, y1, x2, y2, u, lx, ly)
const force = (p, name, col = FC, sub = null, o = {}) => { const a = PUC.arrow(p, col, o.sw ?? 6, o.hd ?? 18), l = it(p, 0, 0, name, col, { 'font-size': o.fs ?? 26, 'text-anchor': o.anchor || 'start' }); const v = sub != null ? txt(p, 0, 0, sub, { fill: col, 'font-weight': 600, 'font-size': o.vs ?? 16, 'text-anchor': o.anchor || 'start' }) : null;
  return { a, l, v, set(x1, y1, x2, y2, u, lx = 10, ly = 0) { const X = x1 + (x2 - x1) * u, Y = y1 + (y2 - y1) * u; a.set(x1, y1, X, Y); attr(l, 'x', (X + lx).toFixed(1)); attr(l, 'y', (Y + ly).toFixed(1)); const on = u > 0.05 && Math.hypot(X - x1, Y - y1) > 3; l.style.opacity = on ? 1 : 0; if (v) { attr(v, 'x', (X + lx).toFixed(1)); attr(v, 'y', (Y + ly + 20).toFixed(1)); v.style.opacity = on ? 1 : 0; } }, hide() { a.set(0, 0, 0, 0); l.style.opacity = 0; if (v) v.style.opacity = 0; } }; };
// a smooth pulley: wheel + spokes that turn with the string
const pulley = (p, cx, cy, r, rod = null) => { const g = mk(p, 'g', {}); if (rod) mk(g, 'line', { x1: cx, y1: rod, x2: cx, y2: cy, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(g, 'circle', { cx, cy, r, fill: '#E6EAF2', stroke: C.ink, 'stroke-width': 3 }); const sp = mk(g, 'g', {}); for (let k = 0; k < 3; k++) mk(sp, 'line', { x1: cx - (r - 8) * Math.cos(k * Math.PI / 3), y1: cy - (r - 8) * Math.sin(k * Math.PI / 3), x2: cx + (r - 8) * Math.cos(k * Math.PI / 3), y2: cy + (r - 8) * Math.sin(k * Math.PI / 3), stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'circle', { cx, cy, r: 6, fill: C.ink });
  return { g, spin(ang) { attr(sp, 'transform', `rotate(${(ang * 180 / Math.PI).toFixed(2)} ${cx} ${cy})`); } }; };
// a box drawn from its top centre (hanging) or bottom left (on a floor)
const box = (p, w, h, label, col = '#C9A27A', fs = 20) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}), r = mk(g, 'rect', { x: -w / 2, y: 0, width: w, height: h, rx: 7, fill: col, stroke: C.ink, 'stroke-width': 2.5 }), l = txt(g, 0, h / 2 + 7, label, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': fs });
  return { o, g, r, l, at(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); }, size(w2, h2) { attr(r, 'x', (-w2 / 2).toFixed(1)); attr(r, 'width', w2.toFixed(1)); attr(r, 'height', h2.toFixed(1)); attr(l, 'y', (h2 / 2 + 7).toFixed(1)); } }; };

Object.assign(M.IC, {
  train: ['M4 16V6a2 2 0 0 1 2-2h8l4 5v7', 'M4 16h14', 'M7 19a2 2 0 1 0 0-.01', 'M15 19a2 2 0 1 0 0-.01', 'M18 12h3v4h-3'],
  lift: ['M5 3h14v18H5z', 'M12 3v18', 'm8 9 2-2 2 2', 'm16 15-2 2-2-2'],
  flag: ['M4 22V3', 'M4 4h11l-2 4 2 4H4'],
  bag: ['M6 8h12l1 13H5z', 'M9 8V6a3 3 0 0 1 6 0v2'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  x2: ['M4 7l6 10', 'M10 7 4 17', 'M14 9a3 3 0 1 1 6 0c0 2-6 4-6 8h6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS4 = T0('S4'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['train', 'Train', 'ENGINE + COACHES', 'h'], ['lift', 'Lift', 'CAR + COUNTERWEIGHT', 'v'], ['flag', 'Flagpole', 'PULL DOWN · FLAG UP', 'v']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'engine'), wt('H1', 'lift'), wt('H1', 'flag')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="200" height="100"></svg></div>`).join('');
// mini sketch: two bodies on one string, both get the same a (red)
const JA = JOBS.map(([, , , kind], i) => { const s = $('#jsv' + i);
  if (kind === 'h') { mk(s, 'rect', { x: 20, y: 40, width: 40, height: 28, rx: 4, fill: C.ink }); mk(s, 'line', { x1: 60, y1: 54, x2: 100, y2: 54, stroke: C.ink2, 'stroke-width': 3 }); mk(s, 'rect', { x: 100, y: 40, width: 40, height: 28, rx: 4, fill: C.ink }); return [[40, 30, 1, 0], [120, 30, 1, 0]].map(([x, y, dx, dy]) => ({ a: PUC.arrow(s, AC, 4, 11), x, y, dx, dy })); }
  mk(s, 'circle', { cx: 100, cy: 22, r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'line', { x1: 86, y1: 22, x2: 86, y2: 56, stroke: C.ink2, 'stroke-width': 2.5 }); mk(s, 'line', { x1: 114, y1: 22, x2: 114, y2: 46, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(s, 'rect', { x: 74, y: 56, width: 24, height: 30, rx: 4, fill: C.ink }); mk(s, 'rect', { x: 102, y: 46, width: 24, height: 22, rx: 4, fill: C.ink });
  return [[60, 60, 0, 1], [140, 64, 0, -1]].map(([x, y, dx, dy]) => ({ a: PUC.arrow(s, AC, 4, 11), x, y, dx, dy })); });
const TILES = [[C.ink, 'Bag drags trolley', 'bag'], [C.ink, 'Double the bag', 'x2'], [C.ac, 'Twice as fast?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'dragging'), wt('H4', 'doubles'), wt('H4', 'twice')];

/* ---------- P: what connected bodies are ---------- */
const QR = [['1', 'Does not stretch', 'both move together: same speed, same size of a'], ['2', 'Light', 'the tension is the same all along it (Ep 61)'], ['3', 'One diagram per body', 'then the second law for each one']];
$('#qrs').innerHTML = QR.map(([s, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 136}px"><div class="qs" style="color:var(--ac)">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P2', 'stretch'), wt('P3', 'light'), wt('P4', 'method')];
// table + trolley + pulley + hanging bag (shared drawing for P and K)
const tableRig = (sv, mBag, bagW, bagH) => {
  const TY = 250, PX = 600, PY = 228, PR = 22;
  const tb = mk(sv, 'g', {}); mk(tb, 'rect', { x: 40, y: TY, width: PX - 30, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); [80, PX - 60].forEach(x => mk(tb, 'rect', { x, y: TY + 16, width: 14, height: 110, fill: '#B58B62', stroke: C.ink, 'stroke-width': 2 }));
  mk(tb, 'rect', { x: PX - 10, y: PY - 4, width: 16, height: TY - PY + 4, fill: C.ink2 });
  const pl = pulley(sv, PX + 10, PY, PR);
  const str = mk(sv, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
  const tr = mk(sv, 'g', {}), trg = mk(tr, 'g', {}); mk(trg, 'rect', { x: 0, y: TY - 58, width: 130, height: 46, rx: 8, fill: '#8FB3F5', stroke: C.ink, 'stroke-width': 2.5 }); [24, 106].forEach(x => mk(trg, 'circle', { cx: x, cy: TY - 7, r: 7, fill: C.ink })); txt(trg, 65, TY - 28, '2 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
  const bg = box(sv, bagW, bagH, mBag + ' kg', '#E7A4A4', 17);
  return { TY, PX, PY, PR, pl, str, tr, trg, bg, bagX: PX + 10 + PR, place(sx) { const X = 120 + 100 * sx, Yb = 310 + 100 * sx; attr(trg, 'transform', `translate(${X.toFixed(1)},0)`); bg.at(PX + 10 + PR, Yb);
    attr(str, 'd', `M${(X + 130).toFixed(1)},${PY - PR} H${PX + 10} A${PR},${PR} 0 0 1 ${PX + 10 + PR},${PY} V${Yb.toFixed(1)}`); pl.spin(100 * sx / PR); return { X, Yb }; } };
};
const pm = $('#pmS'), PRig = tableRig(pm, 0.5, 46, 50);
const pT = [force(pm, 'T', FC, 'string'), force(pm, 'T', FC, 'string')], pA = [force(pm, 'a', AC), force(pm, 'a', AC)];
$('#pmP').innerHTML = `<span>Same string:</span>${K(`\\text{same } ${aa},\\ \\text{same } ${TT}`)}`;

/* ---------- S: the Atwood machine ---------- */
const s = $('#simS'), PC = [330, 150], PR = 80, XL = PC[0] - PR, XR = PC[0] + PR, Y0 = 340, PXM = 80, LRUN = 1.2, BW = 110, FS = 1.6;
const hB = m => 40 + 10 * m;
ceiling(s, 200, 460, 84);
const sPl = pulley(s, PC[0], PC[1], PR, 84);
const strL = mk(s, 'line', { x1: XL, y1: PC[1], x2: XL, y2: Y0, stroke: C.ink2, 'stroke-width': 3 }), strR = mk(s, 'line', { x1: XR, y1: PC[1], x2: XR, y2: Y0, stroke: C.ink2, 'stroke-width': 3 });
ground(s, 120, 560, 572);
const ghL = [0, 1, 2].map(() => { const b = box(s, BW, 54, ''); b.o.style.opacity = 0; return b; }), ghR = [0, 1, 2].map(() => { const b = box(s, BW, 54, ''); b.o.style.opacity = 0; return b; });
const bL = box(s, BW, 54, ''), bR = box(s, BW, 54, '');
const fW1 = force(s, 'm_1g', FC, '', { fs: 24 }), fW2 = force(s, 'm_2g', FC, '', { fs: 24 }), fT1 = force(s, 'T', FC, 'string', { anchor: 'end' }), fT2 = force(s, 'T', FC, 'string');
const aL = force(s, 'a', AC), aR = force(s, 'a', AC), vL = force(s, 'v', VC), vR = force(s, 'v', VC);
const tRel0 = wt('S2', 'Let') + 0.2, tM5 = wt('S3', 'five') - 0.3, tRel1 = wt('S3', 'falls') - 0.35;
const tFz = wt('S4', 'Freeze') + 0.1, TAU_FZ = 0.55, tRA = Math.max(0, TAU_FZ - 0.25 * (tFz - tS4)), tRes = T0('S8') - 1.9;
const tM9 = wt('S8', 'nine') - 0.3, tRel2 = wt('S8', 'jumps') - 0.3;
const m1T = M.keys([[0, 3], [tM5, 5], [tM9, 9]], 0.6);
const Tend = a => Math.sqrt(2 * LRUN / a);
function state(t) {
  const mm1 = m1T(t), mm2 = 3;
  const held = ph => ({ m1: mm1, m2: mm2, a: 0, v: 0, sx: 0, tau: 0, held: true, ph });
  const run = (p, tau, ph, rep) => { const a = aAtw(p, mm2), T = a > 0 ? Tend(a) : 1e9, u = Math.min(Math.max(tau, 0), T); return { m1: p, m2: mm2, a, aRun: a, v: a * u, sx: 0.5 * a * u * u, tau: u, end: tau >= T, ph, rep, rel: true }; };
  if (t >= tRel2) return run(9, t - tRel2, 4);
  if (t >= tM9 - 0.3) return held(3.5);
  if (t >= tS4) { const tau = t < tFz ? tRA + 0.25 * (t - tS4) : t < tRes ? TAU_FZ : TAU_FZ + 0.25 * (t - tRes); const S = run(5, tau, 2, true); S.frozen = t >= tFz && t < tRes; return S; }
  if (t >= tRel1) return run(5, t - tRel1, 1);
  if (t >= tM5 - 0.3) return held(0.5);
  if (t >= tRel0) { const S = run(3, t - tRel0, 0); S.even = true; return S; }
  return held(0);
}
const tRepEnd = tRes + 4 * (Tend(aAtw(5, 3)) - TAU_FZ);
const RESETS = [tS4, tM5 - 0.3, tM9 - 0.3];
$('#roA').innerHTML = `<span class="k" style="color:${MC}">m<sub>1</sub></span><span class="v" id="r_m1">3</span><span class="u">kg</span>
  <span class="k" style="color:${MC}">m<sub>2</sub></span><span class="v" id="r_m2">3</span><span class="u">kg</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0.00</span><span class="u">m/s²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">T</span><span class="v" id="r_T" style="color:${FC}">-</span><span class="u">N</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${MC}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>`;
const roRows = el => { const kids = [...el.children]; return [0, 1, 2].map(i => kids.slice(i * 3, i * 3 + 3)); };
const RA = roRows($('#roA')), RB = roRows($('#roB'));
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 74, w: 560, h: 144, xmax: 8, ymin: 0, ymax: 10.5, xt: [0, 1, 3, 5, 8], yt: [0, 4.9, 9.8], yl: 'a (m/s²)' });
txt(gs, g.X(8) + 20, 74 + 144 + 32, 'm_1/m_2', { fill: C.mute });
const cA = g.curve(AC, 4.5);
const gTop = mk(gs, 'line', { x1: g.X(0), y1: g.Y(9.8), x2: g.X(8), y2: g.Y(9.8), stroke: AC, 'stroke-width': 2, 'stroke-dasharray': '3 7', opacity: 0.6 });
const gNv = txt(gs, g.X(4.5), g.Y(9.8) - 10, 'g = 9.8 · NEVER REACHED', { 'text-anchor': 'middle', fill: AC, 'font-weight': 700, 'font-size': 16 });
const RUNS = [[tRel0, 1], [tRel1, 5 / 3], [tRel2, 3]];
const GM = RUNS.map(([, r]) => mk(gs, 'circle', { cx: g.X(r), cy: g.Y(G * (r - 1) / (r + 1)), r: 7, fill: '#fff', stroke: AC, 'stroke-width': 3, opacity: 0 }));
const gHollow = mk(gs, 'circle', { r: 10, fill: '#fff', stroke: AC, 'stroke-width': 3.5, cx: -99, cy: -99 });
const gDot = g.dot(AC, 11);

/* ---------- D: the rule ---------- */
const STEPS = [[`${m1}${gg} - ${TT} = ${m1}${aa}`, 'heavy block: down is positive', 0],
  [`${TT} - ${m2}${gg} = ${m2}${aa}`, 'light block: up is positive', 0],
  [`${aa} = \\dfrac{(${m1} - ${m2})\\,${gg}}{${m1} + ${m2}}`, 'add the two lines: the T\'s cancel', 1],
  [`${TT} = \\dfrac{2\\,${m1}${m2}\\,${gg}}{${m1} + ${m2}}`, 'put a back into line 2', 1],
  [`${m1} = ${m2} \\;\\Rightarrow\\; ${aa} = 0,\\ \\ ${TT} = m${gg}`, 'check: equal masses balance', 0]];
const SY = [78, 160, 262, 384, 498];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w, tall], i) => `<div class="st${tall ? ' tall' : ''}" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), DC = [392, 140], DR = 60, DXL = DC[0] - DR, DXR = DC[0] + DR, DYL = 300, DYR = 260, DFS = 2.4;
ceiling(dS, 290, 494, 62); pulley(dS, DC[0], DC[1], DR, 62);
mk(dS, 'line', { x1: DXL, y1: DC[1], x2: DXL, y2: DYL, stroke: C.ink2, 'stroke-width': 3 }); mk(dS, 'line', { x1: DXR, y1: DC[1], x2: DXR, y2: DYR, stroke: C.ink2, 'stroke-width': 3 });
const dL = box(dS, 96, hB(5), 'm_1 · 5 kg', '#C9A27A', 17), dR = box(dS, 96, hB(3), 'm_2 · 3 kg', '#C9A27A', 17); dL.at(DXL, DYL); dR.at(DXR, DYR);
const dW1 = force(dS, 'm_1g', FC, 'Earth', { fs: 24, anchor: 'end' }), dW2 = force(dS, 'm_2g', FC, 'Earth', { fs: 24 }), dT1 = force(dS, 'T', FC, 'string', { anchor: 'end' }), dT2 = force(dS, 'T', FC, 'string');
const dA1 = force(dS, 'a', AC), dA2 = force(dS, 'a', AC);
const dP1 = txt(dS, DXL - 120, DYL + hB(5) + 150, '+ DOWN', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 700, 'font-size': 18 }), dP2 = txt(dS, DXR + 120, DYR - 20, '+ UP', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 700, 'font-size': 18 });

/* ---------- statement ---------- */
$('#st2').innerHTML = `One string: one <i class="ar">a</i>, one <i class="fo">T</i>.`;
$('#stF').innerHTML = K(`\\textstyle\\sum ${FF} = m\\,${aa} \\ \\text{for each body, then add}`);

/* ---------- R: T between the weights ---------- */
const LK = [['The heavy block speeds up downward', `so ${K(`${m1}${gg} > ${TT}`)}:&nbsp; ${K(`${TT} < 49\\ \\text{N}`)}`], ['The light block speeds up upward', `so ${K(`${TT} > ${m2}${gg}`)}:&nbsp; ${K(`${TT} > 29.4\\ \\text{N}`)}`], ['So T sits between the two weights', K(`29.4 < ${TT} = 36.75 < 49\\ \\text{N}`)]];
$('#lks').innerHTML = LK.map(([l, sub], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 140}px"><div class="n">${i + 1}</div><div class="lt">${l}</div><div class="ls">${sub}</div></div>` + (i < 2 ? `<svg class="lkA" id="lka${i}" style="top:${84 + i * 140 + 110}px" viewBox="0 0 16 22"><path d="M8 0v16M2 11l6 7 6-7" fill="none" stroke="#2F6FEB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4')];
const rS = $('#rrS'), RB0 = 480, RSC = 6.4, BARS = [['m_2g', 29.4, 140], ['T', 36.75, 330], ['m_1g', 49, 520]];
mk(rS, 'line', { x1: 80, y1: RB0, x2: 720, y2: RB0, stroke: C.ink, 'stroke-width': 3 });
const RBar = BARS.map(([n, v, x]) => { const r = mk(rS, 'rect', { x, y: RB0, width: 124, height: 0, rx: 6, fill: n === 'T' ? FC : M.mix(FC, '#FFFFFF', 0.45), stroke: FC, 'stroke-width': 2.5 }); const l = it(rS, x + 62, RB0 + 34, n, FC, { 'text-anchor': 'middle', 'font-size': 26 }); const vl = txt(rS, x + 62, RB0 - RSC * v - 14, v + ' N', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 }); return { r, l, vl, v }; });
const rD = [29.4, 49].map(v => mk(rS, 'line', { x1: 80, y1: RB0 - RSC * v, x2: 720, y2: RB0 - RSC * v, stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '6 7', opacity: 0.7 }));
const rBr = mk(rS, 'path', { d: `M ${300} ${RB0 - RSC * 49} h-14 V ${RB0 - RSC * 29.4} h14`, fill: 'none', stroke: C.ac, 'stroke-width': 3 });
const rBrL = txt(rS, 300, RB0 - RSC * 49 - 16, 'T lives here', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 700, 'font-size': 18 });
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the string never feels the full weight!' });

/* ---------- K: two bags ---------- */
const KR = [[$('#kaS'), 0.5, 46, 50], [$('#kbS'), 1, 56, 64]].map(([sv, mb, w, h]) => { const r = tableRig(sv, mb, w, h); const a = mb * G / (2 + mb); r.mb = mb; r.a = a; r.T = 2 * a; r.Tend = Math.sqrt(2 * LRUN / a);
  r.gh = [0, 1, 2].map(() => { const b = box(sv, w, h, '', '#E7A4A4'); b.o.style.opacity = 0; return b; });
  r.fT1 = force(sv, 'T', FC, 'string'); r.fT2 = force(sv, 'T', FC, 'string', { anchor: 'end' }); r.fW = force(sv, 'm_2g', FC, 'Earth', { fs: 24, anchor: 'end' }); r.aT = force(sv, 'a', AC); r.aB = force(sv, 'a', AC); return r; });
$('#kaP').innerHTML = K(`${aa} = \\dfrac{${m2}${gg}}{${m1} + ${m2}} = \\dfrac{0.5 \\times 9.8}{2.5} = ${tc(AC, '1.96\\ \\text{m/s}^2')}`);
$('#kbP').innerHTML = K(`${aa} = \\dfrac{1 \\times 9.8}{3} = ${tc(AC, '3.27\\ \\text{m/s}^2')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">not 2 × 1.96</span>';
$('#kaT').innerHTML = K(`${TT} = ${m1}${aa} = ${tc(FC, '3.92\\ \\text{N}')} < ${m2}${gg} = 4.9\\ \\text{N}`);
$('#kbT').innerHTML = K(`${TT} = 2 \\times 3.27 = ${tc(FC, '6.53\\ \\text{N}')} < 9.8\\ \\text{N}`);
['#kaP', '#kbP', '#kaT', '#kbT'].forEach(id => { $(id).style.height = '64px'; });
$('#kaP').style.top = $('#kbP').style.top = '400px'; $('#kaT').style.top = $('#kbT').style.top = '484px';
const tKa = wt('K1', 'bag') - 0.1, tKb = wt('K2', 'Double') + 0.4;
const th1 = PUC.think($('#th1'), { q: 'Is the string tension equal to the bag\'s weight?', opts: ['Yes, equal', 'No, T is less'], right: 1, why: 'The bag speeds up downward, so its weight must beat T.' });

/* ---------- V: pull from either end ---------- */
const VL = [[$('#vaS'), 'A'], [$('#vbS'), 'B']].map(([sv, k]) => { const FY = 300; ground(sv, 40, 744, FY);
  const front = k === 'A' ? [4, 104, 84] : [2, 80, 62], back = k === 'A' ? [2, 80, 62] : [4, 104, 84];
  const gB = mk(sv, 'g', {}), gF = mk(sv, 'g', {});
  const bb = mk(gB, 'rect', { x: 0, y: FY - back[2], width: back[1], height: back[2], rx: 7, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); txt(gB, back[1] / 2, FY - back[2] / 2 + 7, back[0] + ' kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
  mk(gF, 'rect', { x: 0, y: FY - front[2], width: front[1], height: front[2], rx: 7, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); txt(gF, front[1] / 2, FY - front[2] / 2 + 7, front[0] + ' kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
  const str = mk(sv, 'line', { y1: FY - 30, y2: FY - 30, stroke: C.ink2, 'stroke-width': 3 });
  return { sv, FY, front, back, gB, gF, str, fF: force(sv, 'F', FC, 'hand · 18 N'), fTb: force(sv, 'T', FC, 'string'), fTf: force(sv, 'T', FC, 'string', { anchor: 'end' }), aA: force(sv, 'a', AC), tl: txt(sv, 0, FY - 92, '', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 }) }; });
$('#vaP').innerHTML = K(`${aa} = \\dfrac{${FF}}{${m1} + ${m2}} = \\dfrac{18}{6} = ${tc(AC, '3\\ \\text{m/s}^2')}`);
$('#vbP').innerHTML = K(`${aa} = \\dfrac{18}{6} = ${tc(AC, '3\\ \\text{m/s}^2')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">same a</span>';
$('#vaT').innerHTML = K(`${TT} = 2 \\times 3 = ${tc(FC, '6\\ \\text{N}')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">drags the 2 kg</span>';
$('#vbT').innerHTML = K(`${TT} = 4 \\times 3 = ${tc(FC, '12\\ \\text{N}')}`) + '<span style="font:500 20px Poppins;color:var(--mute)">drags the 4 kg</span>';
['#vaP', '#vbP', '#vaT', '#vbT'].forEach(id => { $(id).style.height = '64px'; });
$('#vaP').style.top = $('#vbP').style.top = '400px'; $('#vaT').style.top = $('#vbT').style.top = '484px';
const tVa = wt('V2', 'Pull') + 0.2, tVb = wt('V3', 'Same') + 0.2, VT = Math.sqrt(2 * 1.0 / 3);
const th2 = PUC.think($('#th2'), { q: 'Same 18 N, but pull the 2 kg block instead. Is T still 6 N?', opts: ['Still 6 N', 'No, it changes'], right: 1, why: 'The string now drags the 4 kg block: T = 4 × 3 = 12 N.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `An engine pulls three coaches on a smooth track with ${K(tc(FC, '30\\ \\text{N}'))}. They are ${K('5,\\ 3')} and ${K('2\\ \\text{kg}')}, tied in a line. Find both tensions.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${aa} = \\dfrac{30}{5 + 3 + 2} = ${tc(AC, '3\\ \\text{m/s}^2')}`)],
  [K(`${tc(FC, 'T_1')} = (3 + 2) \\times 3 = ${tc(FC, '15\\ \\text{N}')}`)],
  [K(`${tc(FC, 'T_2')} = 2 \\times 3 = ${tc(FC, '6\\ \\text{N}')}`)],
  [K(`\\text{check: } 30 - 15 = 15 = 5 \\times 3\\ \\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 92 });
$('#wl .lbl').style.top = '30px';
const wS = $('#wrS'), WY = 330;
ground(wS, 30, 754, WY);
const WC = [[2, 70, 54, 40], [3, 84, 62, 230], [5, 110, 80, 440]].map(([m, w, h, x]) => { const go = mk(wS, 'g', {}), g0 = mk(go, 'g', {}); mk(g0, 'rect', { x: 0, y: WY - h, width: w, height: h, rx: 7, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); txt(g0, w / 2, WY - h / 2 + 7, m + ' kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 }); return { go, g0, m, w, h, x }; });
const wStr = [mk(wS, 'line', { y1: WY - 26, y2: WY - 26, stroke: C.ink2, 'stroke-width': 3 }), mk(wS, 'line', { y1: WY - 26, y2: WY - 26, stroke: C.ink2, 'stroke-width': 3 })];
const wF = force(wS, 'F', FC, 'engine · 30 N'), wT1 = [force(wS, 'T_1', FC, '15 N', { anchor: 'end' }), force(wS, 'T_1', FC, '15 N')], wT2 = [force(wS, 'T_2', FC, '6 N', { anchor: 'end' }), force(wS, 'T_2', FC, '6 N')];
const wA = force(wS, 'a = 3 m/s²', AC, null, { fs: 22 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')], tWrun = wt('W3', 'share') - 0.1, WT = Math.sqrt(2 * 0.9 / 3);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The hook holds both weights: 49 + 29.4 = 78.4 N', right: 'The hook holds 2T = 73.5 N: less while they speed up' });
const tp = $('#tpS'), TPC = [300, 104], TPR = 40;
ceiling(tp, 220, 380, 26); pulley(tp, TPC[0], TPC[1], TPR, 26);
mk(tp, 'line', { x1: TPC[0] - TPR, y1: TPC[1], x2: TPC[0] - TPR, y2: 190, stroke: C.ink2, 'stroke-width': 3 }); mk(tp, 'line', { x1: TPC[0] + TPR, y1: TPC[1], x2: TPC[0] + TPR, y2: 160, stroke: C.ink2, 'stroke-width': 3 });
const xb1 = box(tp, 56, 58, '5 kg', '#C9A27A', 15), xb2 = box(tp, 56, 44, '3 kg', '#C9A27A', 15); xb1.at(TPC[0] - TPR, 190); xb2.at(TPC[0] + TPR, 160);
const xH = force(tp, '2T', FC, '73.5 N'), xT1 = force(tp, 'T', FC, null, { fs: 22, anchor: 'end' }), xT2 = force(tp, 'T', FC, null, { fs: 22 });
const where = PUC.where($('#wa'), { on: [], type: 'Connected body numericals: find a and T, or the force on a pulley' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 400,
  q: `A ${K('3\\ \\text{kg}')} block on a rough table (${K(`${tc(MC, '\\mu_k')} = 0.2`)}) is tied over a smooth pulley to a hanging ${K('2\\ \\text{kg}')} block. Find the tension. <span style="font:500 24px Poppins;color:var(--mute);white-space:nowrap">(${K('g = 10\\ \\text{m/s}^2')})</span>`,
  opts: [K('20\\ \\text{N}'), K('12\\ \\text{N}'), K('14.4\\ \\text{N}'), K('8.4\\ \\text{N}')], right: 2 });
const so = PUC.solution($('#so'), [[K(`${tc(FC, 'f')} = 0.2 \\times 30 = 6\\ \\text{N}`)], [K(`${aa} = \\dfrac{20 - 6}{3 + 2} = 2.8\\ \\text{m/s}^2`)], [K(`${TT} = 2\\,(10 - 2.8)`)], [K(`${TT} = ${tc(C.ok, '14.4\\ \\text{N}')}`)]], { y0: 100, dy: 110 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Fourteen')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · connected bodies', y0: 92, dy: 92, txt: [0, 0, 0, 0],
  lines: [K(`\\text{light string that does not stretch: same } ${aa},\\ \\text{same } ${TT}`),
    K(`\\text{floor: } ${aa} = \\tfrac{${FF}}{${m1} + ${m2}},\\ \\ ${TT} = m_{\\text{dragged}}\\,${aa} \\qquad \\text{table: } ${aa} = \\tfrac{${m2}${gg}}{${m1} + ${m2}}`),
    K(`\\text{Atwood: } ${aa} = \\tfrac{(${m1} - ${m2})\\,${gg}}{${m1} + ${m2}},\\ \\ ${TT} = \\tfrac{2\\,${m1}${m2}\\,${gg}}{${m1} + ${m2}}`),
    K(`\\text{method: one diagram per body,}\\ \\textstyle\\sum ${FF} = m${aa}\\ \\text{each, then add}`)] });
const YQ = ['Why does doubling the bag not double the trolley\'s acceleration?', 'Why is the tension in an Atwood machine between the two weights?', 'Why must both blocks on one string share the same acceleration?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 68', topic: 'What pulls a bicycle round a curve? Circular Motion and Centripetal Force', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFz - 0.3, 1.06, 960, 540], [tRes + 0.6, 1, 960, 540]]);
let geoOk = null;
function measure() { geoOk = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const keyHTML = (el, k, h) => { if (el._k !== k) { el._k = k; el.innerHTML = h; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geoOk) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = M.o3((t - wt('H2', 'move') - i * 0.15) / 0.4); JA[i].forEach(q => q.a.set(q.x, q.y, q.x + q.dx * 40 * u, q.y + q.dy * 26 * u)); });
    vis($('#hjP'), t, wt('H2', 'one') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - wt('H4', 'No')) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.15, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tQr[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tQr[i + 1]) / 0.3) : 1)); });
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const tau = M.clamp(t - wt('P2', 'together') + 0.3, 0, 1.0), sx = 0.5 * 1.96 * tau * tau, { X, Yb } = PRig.place(sx);
    const uA = M.o3((t - wt('P2', 'acceleration') + 0.1) / 0.4); pA[0].set(X + 65, PRig.TY - 90, X + 65 + 60, PRig.TY - 90, uA, 8, 8); pA[1].set(PRig.bagX - 60, Yb, PRig.bagX - 60, Yb + 60, uA, -30, 30);
    const uT = M.o3((t - wt('P3', 'tension') + 0.1) / 0.4); pT[0].set(X + 132, PRig.PY - PRig.PR - 16, X + 132 + 70, PRig.PY - PRig.PR - 16, uT, 6, -10); pT[1].set(PRig.bagX + 16, Yb, PRig.bagX + 16, Yb - 70, uT, 6, 4);
    vis($('#pmP'), t, wt('P3', 'same') - 0.1, 1e9, POP);
  }

  /* S: Atwood machine */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#atw'), t, wt('S1', 'Atwood') - 0.1, T0('S2') - 0.1, { dx: 60, dy: 0, ...o });
    vis($('#ro'), t, T0('S2') + 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const S = state(t), d = PXM * S.sx, h1 = hB(S.m1), h2 = hB(S.m2), yL = Y0 + d, yR = Y0 - d;
    let dip = 1; RESETS.forEach(r => { const u = Math.abs(t - r); if (u < 0.25) dip = Math.min(dip, u / 0.25); });
    bL.size(BW, h1); bR.size(BW, h2); bL.at(XL, yL); bR.at(XR, yR); M.setT(bL.l, S.m1.toFixed(0) + ' kg'); M.setT(bR.l, '3 kg');
    vis(bL.o, t, tS1 + 0.4, 1e9, { dy: -16 }); vis(bR.o, t, tS1 + 0.5, 1e9, { dy: -16 }); bL.g.style.opacity = bR.g.style.opacity = dip.toFixed(3);
    attr(strL, 'y2', yL.toFixed(1)); attr(strR, 'y2', yR.toFixed(1)); sPl.spin(-d / PR);
    const mov = !S.held && !S.end && !S.frozen && S.v > 0.2;
    [[ghL, 1], [ghR, -1]].forEach(([gh, sg]) => gh.forEach((b, k) => { const Q = state(t - (S.rep ? 0.25 : 1) * 0.06 * (k + 1)), dq = Q.ph === S.ph ? PXM * Q.sx : d; b.size(BW, sg > 0 ? h1 : h2); b.at(sg > 0 ? XL : XR, Y0 + sg * dq); b.o.style.opacity = mov ? [0.3, 0.2, 0.12][k] : 0; }));
    // forces: one diagram per block (replay), then fade before the 9 kg run
    const fOut = 1 - M.io((t - tM9 + 0.7) / 0.4), uW = M.o3((t - wt('S5', 'Left') + 0.1) / 0.5) * fOut, uW2 = M.o3((t - wt('S5', 'Right') + 0.1) / 0.5) * fOut, uT = M.o3((t - wt('S5', 'T') + 0.1) / 0.5) * fOut, uT2 = M.o3((t - wt('S5', 'T', 1) + 0.1) / 0.5) * fOut;
    const Tn = TAtw(5, 3);
    fW1.set(XL, yL + h1 / 2, XL, yL + h1 / 2 + FS * 49, uW, -12, 8); M.setT(fW1.v, '49 N'); attr(fW1.l, 'text-anchor', 'end'); attr(fW1.v, 'text-anchor', 'end');
    fW2.set(XR, yR + h2 / 2, XR, yR + h2 / 2 + FS * 29.4, uW2, 12, 8); M.setT(fW2.v, '29.4 N');
    fT1.set(XL - 16, yL, XL - 16, yL - FS * Tn, uT, -8, 18); fT2.set(XR + 16, yR, XR + 16, yR - FS * Tn, uT2, 8, 18);
    // a and v beside each block (one string: same size, opposite ways)
    const uA = (S.held ? 0 : 1) * (S.end ? 0 : 1) * M.o3((t - tRel1 + 0.05) / 0.4), aLn = 22 * (S.aRun || 0) * uA, vLn = 30 * S.v * (S.held ? 0 : 1);
    if (aLn > 4) { aL.set(XL - 100, yL, XL - 100, yL + aLn, 1, -30, -aLn / 2 + 10); aR.set(XR + 100, yR + h2, XR + 100, yR + h2 - aLn, 1, 10, aLn / 2 + 10); } else { aL.hide(); aR.hide(); }
    if (vLn > 4) { vL.set(XL - 150, yL, XL - 150, yL + vLn, 1, -30, -vLn / 2 + 10); vR.set(XR + 150, yR + h2, XR + 150, yR + h2 - vLn, 1, 10, vLn / 2 + 10); } else { vL.hide(); vR.hide(); }
    // tags
    vis($('#rdy'), t, tS1 + 0.6, tRel0 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); vis($('#rls'), t, tRel0, tM5 - 0.2, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS4 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRepEnd + 0.4, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    M.hide($('#lnd'), !(S.end && !S.rep && !S.even));
    { const e = $('#simEq'), on = t >= T0('S7') - 0.1, p = Math.round(S.m1), k = on ? String(p) : '';
      keyHTML(e, k, !on ? '' : `<span class="ar">a</span> = (${p} - 3) × 9.8 ÷ ${p + 3} = <span class="ar">${f2(aAtw(p, 3))}</span>`);
      vis(e, t, T0('S7') - 0.1, 1e9, POP); e.style.left = 'auto'; e.style.right = '36px'; }
    // readout: round the time first, then v from it
    const tr = Math.round(S.tau * 100) / 100, Te = S.aRun ? Math.round(Tend(S.aRun) * 100) / 100 : 0;
    M.setT($('#r_m1'), S.m1.toFixed(0)); M.setT($('#r_m2'), '3');
    M.setT($('#r_a'), f2(S.held || S.end ? 0 : S.aRun)); M.setT($('#r_T'), S.held ? '-' : f2(S.end ? S.m2 * G : TAtw(S.m1, S.m2)));
    M.setT($('#r_v'), f2(S.held ? 0 : S.end ? S.aRun * Te : S.aRun * tr)); M.setT($('#r_t'), f2(S.held ? 0 : S.end ? Te : (S.even ? Math.min(tr, 2) : tr)));
    [[RA[0], T0('S2') + 0.4], [RA[1], T0('S2') + 0.5], [RA[2], tRel0], [RB[0], tRel0], [RB[1], tRel0], [RB[2], tRel0]].forEach(([row, tt]) => row.forEach(e => vis(e, t, tt, 1e9, { dy: 8 })));
    // graph: a vs m1/m2
    const r = S.m1 / S.m2, aC = G * (r - 1) / (r + 1);
    attr(gHollow, 'cx', g.X(r).toFixed(1)); attr(gHollow, 'cy', g.Y(aC).toFixed(1)); M.hide(gHollow, !(S.held && t > tRel0));
    gDot(r, S.aRun || 0, !S.held && t >= tRel0);
    GM.forEach((c, k) => { c.style.opacity = t > RUNS[k][0] + 0.3 ? 1 : 0; });
    const uC = M.io((t - wt('S9', 'graph') + 0.1) / 1.3); cA(x => [x, G * (x - 1) / (x + 1)], 1, 1 + 7 * uC, 80);
    vis(gTop, t, wt('S9', 'never') - 0.2, 1e9, { dy: 0 }); vis(gNv, t, wt('S9', 'never'), 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(78, [[tStep[1] - 0.1, 160], [tStep[2] - 0.1, 258], [tStep[3] - 0.1, 380], [tStep[4] - 0.1, 498]], M.SOFT)(t), hiH = M.track(88, [[tStep[2] - 0.1, 116], [tStep[4] - 0.1, 88]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = hiH.toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const h1 = hB(5), h2 = hB(3), Tn = TAtw(5, 3);
    const lit1 = M.io((t - tStep[0]) / 0.3) * (1 - 0.6 * M.io((t - tStep[1]) / 0.3)), lit2 = M.io((t - tStep[1]) / 0.3);
    dW1.set(DXL, DYL + h1 / 2, DXL, DYL + h1 / 2 + DFS * 49, M.o3((t - tD1 - 0.8) / 0.5), -14, 4);
    dT1.set(DXL - 18, DYL, DXL - 18, DYL - DFS * Tn, M.o3((t - tD1 - 1.0) / 0.5), -8, 30);
    dW2.set(DXR, DYR + h2 / 2, DXR, DYR + h2 / 2 + DFS * 29.4, M.o3((t - tD1 - 1.2) / 0.5), 14, 4);
    dT2.set(DXR + 18, DYR, DXR + 18, DYR - DFS * Tn, M.o3((t - tD1 - 1.4) / 0.5), 8, 30);
    [dW1, dT1].forEach(f => f.a.g.style.opacity = (0.4 + 0.6 * Math.max(lit1, M.io((t - tStep[2]) / 0.3))).toFixed(3));
    [dW2, dT2].forEach(f => f.a.g.style.opacity = (0.4 + 0.6 * Math.max(lit2, t < tStep[0] ? 1 : 0)).toFixed(3));
    const ua = M.o3((t - tStep[0] - 0.4) / 0.5); dA1.set(DXL - 110, DYL + 30, DXL - 110, DYL + 30 + 70 * ua, ua, -26, 0); dA2.set(DXR + 110, DYR + h2, DXR + 110, DYR + h2 - 70 * ua, ua, 10, 10);
    vis(dP1, t, wt('D2', 'down') - 0.1, 1e9, { dy: 0 }); vis(dP2, t, wt('D3', 'up') - 0.1, 1e9, { dy: 0 });
    attr(dP1, 'y', DYL + 30 + 104); attr(dP1, 'x', DXL - 110);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Write') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.15, 1e9, { dx: -16, dy: 0 }); vis(el.querySelector('.ls'), t, tLk[i] + 1.2, 1e9, { dx: -10, dy: 0 }); el.style.background = mix(C.soft, i === 2 ? C.okBg : C.ac2, M.io((t - tLk[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tLk[i + 1]) / 0.3) : 1)); if (i < 2) vis($('#lka' + i), t, tLk[i + 1] - 0.3, 1e9, { dy: -6 }); });
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const tb = [tLk[1] + 0.3, tLk[2] + 0.3, tLk[0] + 0.3];
    RBar.forEach((b, i) => { const u = M.o3((t - tb[i]) / 0.7), hh = RSC * b.v * u; attr(b.r, 'y', (RB0 - hh).toFixed(1)); attr(b.r, 'height', hh.toFixed(1)); vis(b.l, t, tb[i], 1e9, { dy: 0 }); vis(b.vl, t, tb[i] + 0.5, 1e9, { dy: 0 }); M.hide(b.r, u <= 0); });
    M.draw(rD[1], t, tb[2] + 0.6, 0.6); M.draw(rD[0], t, tb[0] + 0.6, 0.6);
    M.draw(rBr, t, tLk[2] + 1.0, 0.5); vis(rBrL, t, tLk[2] + 1.2, 1e9, { dy: 0 });
    avA(t, wt('R4', 'newtons') + 0.3, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('V1'), cOut = OUT('K3'), in2 = wt('K4', 'three') - 0.7;
    vis($('#ka'), t, t > in2 - 0.4 ? in2 : tK1 + 0.2, t > in2 - 0.4 ? out : cOut, { dx: -60, dy: 0, ...o });
    vis($('#kb'), t, t > in2 - 0.4 ? in2 + 0.1 : T0('K2') - 0.3, t > in2 - 0.4 ? out : cOut, { dx: 60, dy: 0, ...o });
    KR.forEach((r, i) => {
      const t0 = i ? tKb : tKa, tau = M.clamp(t - t0, 0, r.Tend), sx = 0.5 * r.a * tau * tau, { X, Yb } = r.place(sx), mov = tau > 0.04 && tau < r.Tend;
      r.gh.forEach((b, k) => { const tk = M.clamp(t - t0 - 0.07 * (k + 1), 0, r.Tend); b.at(r.bagX, 310 + 100 * 0.5 * r.a * tk * tk); b.o.style.opacity = mov ? [0.3, 0.2, 0.12][k] : 0; });
      const uF = M.o3((t - t0 - 0.2) / 0.5), bh = r.mb === 1 ? 64 : 50, FSK = 7;
      r.fW.set(r.bagX - 6, Yb + bh / 2, r.bagX - 6, Yb + bh / 2 + FSK * r.mb * G, uF, 14, 4); attr(r.fW.l, 'text-anchor', 'start'); attr(r.fW.v, 'text-anchor', 'start');
      r.fT2.set(r.bagX + 14, Yb, r.bagX + 14, Yb - FSK * r.T, uF, -4, -8); attr(r.fT2.l, 'text-anchor', 'start'); attr(r.fT2.v, 'text-anchor', 'start'); attr(r.fT2.l, 'x', (r.bagX + 22).toFixed(1)); attr(r.fT2.v, 'x', (r.bagX + 22).toFixed(1));
      r.fT1.set(X + 132, r.PY - r.PR - 18, X + 132 + FSK * r.T * 1.5, r.PY - r.PR - 18, uF, 6, -12);
      const ua = mov ? 1 : 0; if (ua) { r.aT.set(X + 40, r.TY - 92, X + 40 + 14 * r.a, r.TY - 92, 1, 8, 8); r.aB.set(r.bagX - 70, Yb, r.bagX - 70, Yb + 14 * r.a, 1, -24, 26); } else { r.aT.hide(); r.aB.hide(); }
    });
    vis($('#kaP'), t, wt('K1', 'one') - 0.2, 1e9, POP); vis($('#kbP'), t, wt('K2', 'only') - 0.1, 1e9, POP);
    vis($('#kaT'), t, wt('K4', 'three') - 0.1, 1e9, POP); vis($('#kbT'), t, wt('K4', 'not') + 0.4, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, in2 - 0.3, { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'bag') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1'), cOut = OUT('V3'), in2 = wt('V4', 'still') - 0.3, back = t > in2 - 0.4;
    vis($('#va'), t, back ? in2 : tV1 + 0.2, back ? out : cOut, { dx: -60, dy: 0, ...o });
    vis($('#vb'), t, back ? in2 + 0.1 : wt('V2', 'six') + 0.4, back ? out : cOut, { dx: 60, dy: 0, ...o });
    VL.forEach((L, i) => {
      const t0 = i ? tVb : tVa, tau = M.clamp(t - t0, 0, VT), dx = 100 * 1.5 * tau * tau, xb = 60 + dx, xf = xb + L.back[1] + 170;
      attr(L.gB, 'transform', `translate(${xb.toFixed(1)},0)`); attr(L.gF, 'transform', `translate(${xf.toFixed(1)},0)`);
      attr(L.str, 'x1', (xb + L.back[1]).toFixed(1)); attr(L.str, 'x2', xf.toFixed(1));
      const uF = M.o3((t - (i ? wt('V3', 'Same') : wt('V2', 'eighteen')) + 0.1) / 0.5), FY = L.FY, ys = FY - 30;
      L.fF.set(xf + L.front[1], FY - L.front[2] / 2, xf + L.front[1] + 6 * 18, FY - L.front[2] / 2, uF, -40, -30);
      const Tv = i ? 12 : 6, uT = M.o3((t - (i ? wt('V3', 'still') : wt('V2', 'drags')) + 0.1) / 0.5);
      L.fTb.set(xb + L.back[1], ys, xb + L.back[1] + 5 * Tv, ys, uT, -20, -34); L.fTf.set(xf, ys, xf - 5 * Tv, ys, uT, 20, 40);
      const known = !i || t >= wt('V4', 'Twelve') - 0.1; M.setT(L.fTb.v, known ? Tv + ' N' : '? N'); M.setT(L.fTf.v, known ? Tv + ' N' : '? N');
      const ua = M.o3((t - t0 + 0.1) / 0.4); L.aA.set(xb + 40, FY - 120, xb + 40 + 3 * 22 * ua, FY - 120, ua, 8, 8);
    });
    vis($('#vaP'), t, wt('V2', 'three') - 0.1, 1e9, POP); vis($('#vaT'), t, wt('V2', 'six') - 0.1, 1e9, POP);
    vis($('#vbP'), t, wt('V4', 'still') + 0.2, 1e9, POP); vis($('#vbT'), t, wt('V4', 'drag') - 0.1, 1e9, POP);
    vis($('#th2'), t, tV3 + 0.05, in2 - 0.4, { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'Is') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Twelve') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const tau = M.clamp(t - tWrun, 0, WT), dx = 100 * 1.5 * tau * tau;
    WC.forEach((c, i) => { attr(c.g0, 'transform', `translate(${(c.x + dx).toFixed(1)},0)`); vis(c.go, t, T0('W2') + 0.4 + i * 0.12, 1e9, { dy: -12 }); });
    attr(wStr[0], 'x1', (WC[0].x + WC[0].w + dx).toFixed(1)); attr(wStr[0], 'x2', (WC[1].x + dx).toFixed(1)); attr(wStr[1], 'x1', (WC[1].x + WC[1].w + dx).toFixed(1)); attr(wStr[1], 'x2', (WC[2].x + dx).toFixed(1));
    const xF = WC[2].x + WC[2].w + dx; wF.set(xF, WY - 40, xF + 4.4 * 30 * 0.55, WY - 40, M.o3((t - wt('W2', 'thirty') + 0.1) / 0.5), -60, -40);
    const ys = WY - 26, u1 = M.o3((t - T0('W4') - 0.3) / 0.5), u2 = M.o3((t - T0('W5') - 0.3) / 0.5);
    wT1[0].set(WC[1].x + WC[1].w + dx, ys, WC[1].x + WC[1].w + dx + 50, ys, u1, -30, -30); wT1[1].set(WC[2].x + dx, ys, WC[2].x + dx - 50, ys, u1, 30, 34);
    wT2[0].set(WC[0].x + WC[0].w + dx, ys, WC[0].x + WC[0].w + dx + 30, ys, u2, -24, -30); wT2[1].set(WC[1].x + dx, ys, WC[1].x + dx - 30, ys, u2, 24, 34);
    const ua = M.o3((t - T0('W3') - 0.3) / 0.5); wA.set(300 + dx, 150, 300 + dx + 90 * ua, 150, ua, 8, 8);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'hook') - 0.2, tStrike: wt('X3', 'holds') - 0.1, tRight: wt('X3', 'Seventy') - 0.1 });
    const uT = M.o3((t - wt('X3', 'two') + 0.1) / 0.5), uH = M.o3((t - wt('X3', 'Seventy') + 0.1) / 0.5);
    xT1.set(TPC[0] - TPR - 14, 190, TPC[0] - TPR - 14, 130, uT, -6, 30); xT2.set(TPC[0] + TPR + 14, 160, TPC[0] + TPR + 14, 100, uT, 6, 30);
    xH.set(TPC[0] + 14, 60, TPC[0] + 14, 60 - 1, 0, 0, 0); xH.set(TPC[0] + 90, 104, TPC[0] + 90, 30, uH, 12, 30);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'connected') });
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
