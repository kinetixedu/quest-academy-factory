// PUC Physics Ep 23: Average and Instantaneous Acceleration (Motion notebook, an ambulance from rest)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, BC = C.violet;            // colour-coding: v blue, a red (canon), average a-bar violet (second quantity)
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, fs = 30, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const AB = `\\textcolor{${BC}}{\\bar{a}}`, A = `\\textcolor{${AC}}{a}`, V = `\\textcolor{${VC}}{v}`;
const lin = pts => t => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; if (t <= b) return b === a ? vb : va + (vb - va) * (t - a) / (b - a); } return pts[pts.length - 1][1]; };

Object.assign(M.IC, {
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18a2 2 0 1 0 0-.01', 'M9 18h5', 'M16 18a2 2 0 1 0 0-.01'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c4 1.5 7.2 5.6 7.1 14', 'M19.1 4.9c-4 1.5-7.2 5.6-7.1 14'],
  lift: ['M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'm9 9 3-3 3 3', 'm9 15 3 3 3-3'],
  route: ['M6 19a3 3 0 1 0 0-.01', 'M18 5a3 3 0 1 0 0-.01', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15'],
});

/* ambulance glyph (no brand): body, cab, red cross, light bar, two wheels with spokes. set(x, y, s, dir, rot) */
const amb = (p) => {
  const g = mk(p, 'g', {}), w = [];
  mk(g, 'path', { d: 'M-70,-8 V-62 a6,6 0 0 1 6,-6 H24 L50,-40 L66,-34 a6,6 0 0 1 4,6 V-8 Z', fill: '#fff', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M28,-60 L46,-40 H28 Z', fill: C.ac2, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  mk(g, 'rect', { x: -48, y: -56, width: 12, height: 34, fill: AC }); mk(g, 'rect', { x: -59, y: -45, width: 34, height: 12, fill: AC });
  mk(g, 'rect', { x: -14, y: -76, width: 26, height: 8, rx: 3, fill: AC });
  mk(g, 'line', { x1: -70, y1: -20, x2: 70, y2: -20, stroke: C.ac, 'stroke-width': 4 });
  [-42, 40].forEach(cx => { mk(g, 'circle', { cx, cy: 0, r: 15, fill: C.ink }); mk(g, 'circle', { cx, cy: 0, r: 7, fill: '#fff' }); w.push(mk(g, 'path', { d: '', stroke: C.ink, 'stroke-width': 2.5 })); });
  return { g, set(x, y, s = 1, dir = 1, rot = 0) {
    attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * dir).toFixed(3)},${s.toFixed(3)})`);
    [-42, 40].forEach((cx, i) => { const c = Math.cos(rot) * 7, d = Math.sin(rot) * 7; attr(w[i], 'd', `M${(cx - c).toFixed(1)},${(-d).toFixed(1)} L${(cx + c).toFixed(1)},${d.toFixed(1)}`); });
  } };
};
const road = (p, y, x0 = 40, x1 = 744) => { mk(p, 'line', { x1: x0, y1: y + 16, x2: x1, y2: y + 16, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 20, x2: x - 14, y2: y + 34, stroke: C.dim, 'stroke-width': 2 }); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tZ1 = T0('Z1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tN1 = T0('N1'), tN4 = T0('N4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three cases ---------- */
const JOBS = [['bus', 'Bus pulls away', 'SPEEDING UP', 'bus', '0 → 8'], ['ball', 'Ball rolls to a halt', 'SLOWING DOWN', 'ball', '3 → 0'], ['lift', 'Lift starts to rise', 'STARTING UP', 'lift', '0 → 2']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${280 + i * 470}px"><i>${M.icon(ic, 32, VC, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, VC, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" style="color:${VC}">${v} <small>m/s</small></div></div>`).join('') + `<div class="ghost" id="exH" style="right:36px;top:18px">EXAMPLE FIGURES</div>`;
const TILES = [['route', 'Over an interval?', BC], ['clock', 'At one instant?', AC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'climbing'), wt('H4', 'exact')];
// hook scene: college gate + ambulance setting off
const hk = $('#hkS'), HY = 380;
road(hk, HY, 36, 748);
const gate = mk(hk, 'g', {}); [92, 232].forEach(x => mk(gate, 'rect', { x, y: HY - 210, width: 26, height: 226, fill: C.soft, stroke: C.ink, 'stroke-width': 3 }));
mk(gate, 'path', { d: `M92,${HY - 210} Q175,${HY - 268} 258,${HY - 210}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
txt(gate, 175, HY - 190, 'PU COLLEGE', { 'text-anchor': 'middle', 'font-size': 14, fill: C.ink, 'font-weight': 600, 'letter-spacing': 0.5 });
const ghH = [0, 1, 2].map(() => amb(hk)); ghH.forEach(b => b.g.style.opacity = 0);
const aH = amb(hk);
const hV = PUC.arrow(hk, VC, 6, 18);
const uH = t => { const s = M.clamp(t - tH3 - 0.6, 0, 5); return 175 + 9 * s * s; };

/* ---------- P ---------- */
$('#pa0').innerHTML = K(`\\text{acceleration} = \\dfrac{\\text{change in } ${V}}{\\text{time taken}}`);
$('#pa1').innerHTML = K(`\\dfrac{\\text{m/s}}{\\text{s}} = \\textcolor{${AC}}{\\text{m/s}^2}\\;\\; (\\text{m s}^{-2})`);
const PB = [0, 1, 2, 3, 4];
$('#pbs').innerHTML = PB.map(k => `<div class="pb" id="pb${k}" style="top:${84 + k * 80}px"><div class="pt">t = ${k} s</div>${k ? '<div class="pd">+2 m/s</div>' : ''}<div class="pv">v = ${2 * k} m/s</div></div>`).join('');
const tPb = PB.map(k => wt('P4', 'grows') - 0.6 + k * 0.45);

/* ---------- S: the sim, v = 4t - t^2/4 from rest ---------- */
const vf = t => 4 * t - t * t / 4, xf = t => 2 * t * t - t * t * t / 12, af = t => 4 - t / 2;
const s = $('#simS'), SX0 = 90, PXM = 6.8, SY = 360;      // 6.8 px per metre, 0 to 90 m
road(s, SY, 30, 754);
for (let m = 0; m <= 90; m += 10) { const x = SX0 + m * PXM; mk(s, 'line', { x1: x, y1: SY + 16, x2: x, y2: SY + 16 + (m % 30 ? 8 : 16), stroke: C.ink, 'stroke-width': m % 30 ? 1.5 : 2.5 }); if (m % 30 === 0) txt(s, x, SY + 58, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(s, SX0 + 90 * PXM + 4, SY + 58, 'm', { fill: C.mute });
const ghS = [0, 1, 2].map(() => amb(s)); ghS.forEach(b => b.g.style.opacity = 0);
const aS = amb(s);
const vS = PUC.arrow(s, VC, 7, 20), vSl = it(s, 0, 0, 'v', VC, 30), aSA = PUC.arrow(s, AC, 7, 20), aSl = it(s, 0, 0, 'a = ?', AC, 30);
$('#simF').innerHTML = K(`${V} = 4t - \\tfrac{1}{4}t^2 \\quad (\\text{m/s})`);
$('#roG').innerHTML = `<span class="k">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k">x</span><span class="v" id="rx">0.0</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 70, w: 600, h: 150, xmax: 8, ymax: 16, xt: [0, 2, 4, 6, 8], yt: [0, 16], xl: 't (s)', yl: 'v (m/s)' });
const gC = G.curve(VC, 4), gD = G.dot(C.ink, 10);
const tGo = wt('S2', 'starts') - 0.1, tRep = T0('S5') + 0.1, tFrz = wt('S5', 'Freeze');
const RUN = tRep - tGo - 0.3;
const SPD = Math.max(1, 8 / RUN), simT = t => t < tRep ? M.clamp((t - tGo) * SPD, 0, 8) : (t < tRep + 0.35 ? lin([[tRep, 8], [tRep + 0.35, 1.4]])(t) : M.clamp(1.4 + 0.25 * (t - tRep - 0.35), 1.4, 2));
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The arrow grows slower and slower.' });

/* ---------- Z: shrink the gap ---------- */
const ZR = [['4', '8', '2.00'], ['2', '5', '2.50'], ['1', '2.75', '2.75'], ['0.1', '0.2975', '2.975'], ['0.01', '0.029975', '2.9975']];
const ZC = [36, 242, 498];
$('#zrs').innerHTML = ['Δt (s)', 'Δv (m/s)', 'Δv/Δt (m/s²)'].map((h, i) => `<div class="zh" style="left:${ZC[i]}px;width:${[170, 220, 220][i]}px">${h}</div>`).join('') +
  ZR.map((r, i) => `<div class="zr" id="zr${i}" style="top:${122 + i * 64}px">${r.map((v, j) => `<span class="c${j}" style="${j === 2 ? 'color:' + BC : ''}">${v}</span>`).join('')}</div>`).join('') +
  `<div class="zr" id="zr5" style="top:${122 + 5 * 64 + 8}px;background:#FBE6E6"><span class="c0">→ 0</span><span class="c1">→ 0</span><span class="c2" style="color:${AC}">→ 3</span></div>`;
const tZr = [wt('Z1', 'six'), T0('Z2'), T0('Z3'), T0('Z4'), T0('Z5')];
const zg = PUC.graph($('#zgS'), { x: 110, y: 90, w: 600, h: 400, xmax: 8, ymax: 16, xt: [0, 2, 4, 6, 8], yt: [0, 7, 16], xl: 't (s)', yl: 'v (m/s)' });
const zC = zg.curve(VC, 4), zCh = mk($('#zgS'), 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), zTg = mk($('#zgS'), 'line', { stroke: AC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const zP = zg.dot(C.ink, 9), zQ = zg.dot(BC, 9);
const zLg = M.keys([[0, Math.log10(4)], [T0('Z2'), Math.log10(2)], [T0('Z3'), 0], [T0('Z4'), -1], [T0('Z5'), -2]], 0.9);
const tTan = wt('Z6', 'tangent');
const avZ = PUC.avatar($('#sZ'), { x: 976 + 36, y: 270 + 600, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'It settles on 3!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${AB} = \\dfrac{\\Delta ${V}}{\\Delta t}`, 'change in velocity ÷ time'],
  [`${A} = \\lim_{\\Delta t \\to 0} \\dfrac{\\Delta ${V}}{\\Delta t}`, 'shrink the gap to zero'],
  [`${A} = \\dfrac{d${V}}{dt}`, 'tangent slope on v-t graph'],
  [`${A}(2) = 4 - 1 = \\textcolor{${AC}}{3\\,\\text{m/s}^2}`, 'a = 4 - t/2, at t = 2 s']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Average'), wt('D3', 'shrink'), wt('D4', 'written'), wt('D5', 'Here')];
const dg = PUC.graph($('#drS'), { x: 110, y: 90, w: 600, h: 400, xmax: 8, ymax: 16, xt: [0, 2, 4, 6, 8], yt: [0, 7, 16], xl: 't (s)', yl: 'v (m/s)' });
const dC = dg.curve(VC, 4), dS = $('#drS');
const dTx = mk(dS, 'line', { stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), dTy = mk(dS, 'line', { stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const dCh = mk(dS, 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), dTg = mk(dS, 'line', { stroke: AC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dLt = it(dS, 0, 0, 'Δt', C.ink, 26), dLx = it(dS, 0, 0, 'Δv', C.ink, 26), dLs = txt(dS, 0, 0, 'slope = 3 m/s²', { 'font-size': 24, fill: AC, 'font-weight': 600 });
const dP = dg.dot(C.ink, 9);
const dLg = M.keys([[0, Math.log10(3)], [tStep[1] + 0.4, Math.log10(0.08)]], 1.6);
$('#stF').innerHTML = K(`${V} = \\dfrac{dx}{dt} \\qquad ${A} = \\dfrac{d${V}}{dt}`);

/* ---------- K: side by side ---------- */
const sideSim = (svg, opp) => {
  road(svg, 230, 40, 744);
  const gh = [0, 1, 2].map(() => amb(svg)); gh.forEach(b => b.g.style.opacity = 0);
  const b = amb(svg), va = PUC.arrow(svg, VC, 7, 20), aa = PUC.arrow(svg, AC, 7, 20), vl = it(svg, 0, 0, 'v', VC, 28), al = it(svg, 0, 0, 'a', AC, 28);
  // loop of 3.2 s: same direction: v 4 -> 12; opposite: v 12 -> 4 (a = 2.5 m/s^2 either way). 18 px per metre.
  const v0 = opp ? 12 : 4, aa0 = opp ? -2.5 : 2.5, X0 = 120;
  const st = u => ({ x: X0 + 18 * (v0 * u + 0.5 * aa0 * u * u) / 1.6, v: v0 + aa0 * u });
  return (t, tin) => { const T = 3.2, u = ((Math.max(0, t - tin)) % (T + 0.6)), uu = Math.min(u, T), p = st(uu);
    b.set(p.x, 230, 0.75, 1, p.x / 15);
    gh.forEach((g, k) => { const q = st(Math.max(0, uu - 0.3 * (k + 1))); g.set(q.x, 230, 0.75, 1, 0); g.g.style.opacity = uu > 0.3 * (k + 1) && uu < T ? [0.3, 0.2, 0.12][k] : 0; });
    va.set(p.x + 60, 120, p.x + 60 + p.v * 7, 120); attr(vl, 'x', (p.x + 60 + p.v * 3.5 - 8).toFixed(1)); attr(vl, 'y', 104);
    const ax = opp ? -1 : 1; aa.set(p.x + 60, 150, p.x + 60 + ax * 60, 150); attr(al, 'x', (p.x + 60 + ax * 30 - 8).toFixed(1)); attr(al, 'y', 186);
    return p.v; };
};
const kbF = sideSim($('#kbS'), false), kdF = sideSim($('#kdS'), true);
const roHTML = id => `<span class="k" style="color:${VC}">v</span><span class="v" id="${id}v" style="color:${VC}">0.0</span><span class="u">m/s</span><span class="k" style="color:${AC}">a</span><span class="v" id="${id}a" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
$('#kbR').innerHTML = roHTML('kb'); $('#kdR').innerHTML = roHTML('kd');
const th1 = PUC.think($('#th1'), { q: 'A ball thrown straight up has zero velocity at the top. Is its acceleration zero there too?', opts: ['Yes, zero', 'No, still g'], right: 1, why: 'Gravity still pulls it down at 9.8 m/s². v is zero only for an instant, because it keeps changing.' });

/* ---------- N: the sign rule ---------- */
const nn = $('#nnS'), NX0 = 664, NPX = 9, NY = 230;      // starts at the right, drives left
road(nn, NY, 40, 744);
const ax = PUC.arrow(nn, C.ink, 3, 12); ax.set(600, 300, 724, 300); txt(nn, 600, 290, '+ direction', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const ghN = [0, 1, 2].map(() => amb(nn)); ghN.forEach(b => b.g.style.opacity = 0);
const aN = amb(nn), vN = PUC.arrow(nn, VC, 7, 20), aNa = PUC.arrow(nn, AC, 7, 20), vNl = it(nn, 0, 0, 'v', VC, 28), aNl = it(nn, 0, 0, 'a', AC, 28);
$('#nnR').innerHTML = roHTML('nn');
const tNs = wt('N3', 'driving') - 0.2;
const nU = t => M.clamp(t - tNs, 0, 4.4);            // x = -(5u + u^2) m, v = -(5 + 2u), a = -2
const NR = [['v +,  a +', 'same direction', 'Speeds up', 1], ['v -,  a -', 'same direction', 'Speeds up', 1], ['v +,  a -', 'opposite directions', 'Slows down', 0], ['v -,  a +', 'opposite directions', 'Slows down', 0]];
$('#nrs').innerHTML = NR.map(([a, b, c, ok], i) => `<div class="nrr" id="nr${i}" style="top:${84 + i * 112}px"><div class="a">${a}</div><div class="b">${b}</div><div class="c" style="background:${ok ? C.okBg : C.redBg};color:${ok ? '#1F6B3F' : AC}">${c}</div></div>`).join('');
const tNr = [wt('N5', 'signs'), wt('N5', 'Speed', 1), wt('N5', 'Slow'), wt('N5', 'differ')];
const th2 = PUC.think($('#th2'), { q: 'v = -10 m/s and a = -2 m/s². Is the ambulance speeding up or slowing down?', opts: ['Speeding up', 'Slowing down'], right: 0, why: 'Both negative, so both point the same way. Signs match: speed up. Signs differ: slow down.' });

/* ---------- W ---------- */
$('#wq').innerHTML = `${K('v = 3t^2 + 2t')} (v in m/s, t in s). Find the average acceleration over the first 2 s, and ${K('a')} at t = 2 s.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${V}(0) = 0,\\;\\; ${V}(2) = 12 + 4 = 16\\,\\text{m/s}`)],
  [K(`${AB} = \\dfrac{16 - 0}{2 - 0} = \\textcolor{${BC}}{8\\,\\text{m/s}^2}`)],
  [K(`${A} = \\dfrac{d${V}}{dt} = 6t + 2`)],
  [K(`${A}(2) = 12 + 2 = \\textcolor{${AC}}{14\\,\\text{m/s}^2}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
$('#wl .lbl').style.top = '30px';
const vw = t => 3 * t * t + 2 * t;
const wg = PUC.graph($('#wrS'), { x: 110, y: 100, w: 600, h: 390, xmax: 2.5, ymax: 24, xt: [0, 1, 2], yt: [0, 8, 16, 24], xl: 't (s)', yl: 'v (m/s)' });
const wC = wg.curve(VC, 4), wCh = mk($('#wrS'), 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), wTg = mk($('#wrS'), 'line', { stroke: AC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wP0 = wg.dot(BC, 9), wP2 = wg.dot(C.ink, 9);
const wL1 = txt($('#wrS'), wg.X(0.15), wg.Y(16), 'ā = 8 m/s²', { 'font-size': 26, fill: BC, 'font-weight': 600 }), wL2 = txt($('#wrS'), wg.X(0.15), wg.Y(20), 'a = 14 m/s²', { 'font-size': 26, fill: AC, 'font-weight': 600 });
const tW = [wt('W3', 'At'), wt('W4', 'Average'), wt('W5', 'For'), wt('W6', 'At')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'v = 0, so a = 0', right: 'At the top v = 0, but a = g = 9.8 m/s² downwards' });
const tb = $('#tb'), BX = 300, BTOP = 70, BBOT = 236;
mk(tb, 'line', { x1: BX, y1: BBOT + 14, x2: BX, y2: BTOP, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 8' });
const tbG = [0, 1, 2].map(k => mk(tb, 'circle', { cx: BX, cy: BTOP + [36, 76, 126][k], r: 14, fill: C.ink, opacity: 0 }));
const tbB = mk(tb, 'circle', { cx: BX, cy: BTOP, r: 18, fill: C.ink, opacity: 0 });
const tbV = txt(tb, BX + 34, BTOP + 8, 'v = 0', { 'font-size': 24, fill: VC, 'font-weight': 600 });
const tbA = PUC.arrow(tb, AC, 7, 20), tbAl = txt(tb, BX - 66, BTOP + 110, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32, fill: AC, 'font-weight': 600, 'text-anchor': 'end' });
const where = PUC.where($('#wa'), { on: [], type: 'Given v as a function of t: average acceleration over an interval, acceleration at an instant' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A particle has ${K('v = t^2 - 4t + 3')} (v in m/s, t in s). Its average acceleration from t = 0 to 4 s, and its acceleration when it first stops, are:`, qW: 790,
  opts: [K('0\\;\\text{and}\\; 0'), K('0\\;\\text{and}\\; {-2}\\,\\text{m/s}^2'), K('{-1}\\,\\text{m/s}^2\\;\\text{and}\\; 2\\,\\text{m/s}^2'), K('0.75\\,\\text{m/s}^2\\;\\text{and}\\; {-4}\\,\\text{m/s}^2')], right: 1, cols: 1, optW: 968, optH: 60, optFs: 28, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${V}(0) = 3,\\; ${V}(4) = 3`)], [K(`\\Delta ${V} = 0 \\Rightarrow ${AB} = 0`)], [K(`${V} = 0 \\text{ first at } t = 1\\,\\text{s}`)], [K(`${A} = 2t - 4 = \\textcolor{${AC}}{-2\\,\\text{m/s}^2}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'v'), wt('A2', 'So'), wt('A3', 'first'), wt('A3', 'two')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · average and instantaneous acceleration', y0: 92, dy: 104, txt: [0, 0, 1, 1],
  lines: [K(`${AB} = \\dfrac{\\Delta ${V}}{\\Delta t}`) + '<span class="flc">unit m/s² · slope of the chord</span>',
    K(`${A} = \\lim_{\\Delta t \\to 0}\\dfrac{\\Delta ${V}}{\\Delta t} = \\dfrac{d${V}}{dt}`) + '<span class="flc">slope of the tangent (v-t)</span>',
    '<b>Same signs</b> of v and a: speeds up &nbsp;·&nbsp; <b>opposite</b>: slows down', '<b>v = 0</b> does not mean <b>a = 0</b> (top of a throw: a = g)'] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { e.style.top = [86, 196, 322, 392][i] + 'px'; });
const YQ = ['Can a body have zero velocity and still accelerate?', 'What does the slope of a v-t graph tell you?', 'v negative, a positive: speeding up or slowing down?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 24', topic: 'Same change every second, or not? Uniform and Non-Uniform Motion', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFrz - 0.2, 1.1, 600, 560], [T0('S6') + 2.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const line = (el, g, t0, y0, t1, y1) => { attr(el, 'x1', g.X(t0).toFixed(1)); attr(el, 'y1', g.Y(y0).toFixed(1)); attr(el, 'x2', g.X(t1).toFixed(1)); attr(el, 'y2', g.Y(y1).toFixed(1)); };
const tangent = (el, g, a, ya, m, w) => line(el, g, a - w, ya - m * w, a + w, ya + m * w);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.15, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); el.style.background = mix(C.soft, C.ac2, M.io((t - wt('H2', 'changing') + 0.1) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'velocity') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const x = uH(t); aH.set(x, HY, 1, 1, x / 15);
    ghH.forEach((b, k) => { const xx = uH(t - 0.18 * (k + 1)); b.set(xx, HY, 1, 1, 0); b.g.style.opacity = x - xx > 6 ? [0.3, 0.2, 0.12][k] : 0; });
    const sp = 18 * M.clamp(t - tH3 - 0.6, 0, 5) * 0.25; hV.set(x + 74, HY - 40, x + 74 + sp * 8, HY - 40);
    M.vis($('#note'), t, wt('H4', 'how') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-3deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : '#EDE6FB', M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pa'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pa0'), t, wt('P2', 'change') - 0.1, 0.8);
    M.vis($('#paL'), t, T0('P3') - 0.05, 1e9, { dy: 10 }); PUC.write($('#pa1'), t, wt('P3', 'metre') - 0.1, 0.8);
    M.vis($('#paP'), t, wt('P2', 'how') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#exP'), t, T0('P4') + 0.3, 1e9, { dy: 8 });
    PB.forEach(k => { const el = $('#pb' + k); M.vis(el, t, tPb[k], 1e9, { dx: -20, dy: 0 }); });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('Z1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    PUC.write($('#simF'), t, wt('S2', 'velocity') - 0.05, 0.8);
    const u = simT(t), x = xf(u), v = vf(u), bx = SX0 + x * PXM;
    aS.set(bx, SY, 0.8, 1, x / 3);
    const moving = t > tGo && (t < tRep || (t > tRep + 0.35 && t < tFrz));
    ghS.forEach((b, k) => { const uu = Math.max(0, u - 0.4 * (k + 1)); b.set(SX0 + xf(uu) * PXM, SY, 0.8, 1, 0); b.g.style.opacity = moving && (x - xf(uu)) * PXM > 20 ? [0.3, 0.2, 0.12][k] : 0; });
    const vOn = M.clamp((t - wt('S3', 'arrow') + 0.2) / 0.3);
    vS.set(bx - 40, SY - 96, bx - 40 + v * 8 * vOn, SY - 96); attr(vSl, 'x', (bx - 40 + v * 4 - 8).toFixed(1)); attr(vSl, 'y', SY - 112); vSl.style.opacity = vOn * (v > 1 ? 1 : 0);
    const fa = M.io((t - wt('S6', 'how') + 0.1) / 0.6); aSA.set(bx - 40, SY - 140, bx - 40 + 3 * 22 * fa, SY - 140); attr(aSl, 'x', (bx + 60).toFixed(1)); attr(aSl, 'y', SY - 130); aSl.style.opacity = fa;
    M.setT($('#rt'), u.toFixed(2)); M.setT($('#rx'), x.toFixed(1)); M.setT($('#rv'), v.toFixed(2));
    gC(k => [k, vf(k)], 0, u); gD(u, v, t > tGo - 0.3);
    M.vis($('#slow'), t, tRep, T0('Z1') - 0.4, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    avS(t, wt('S4', 'flattens') - 0.1, tRep - 0.2);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tD1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('D1');
    M.vis($('#zt'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#zg'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    ZR.forEach((_, i) => { const el = $('#zr' + i); M.vis(el, t, tZr[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, '#EDE6FB', M.io((t - tZr[i]) / 0.3) * (i < 4 ? 1 - M.io((t - tZr[i + 1]) / 0.3) : 1)); });
    M.vis($('#zr5'), t, wt('Z5', 'three') - 0.1, 1e9, POP);
    zC(k => [k, vf(k)], 0, 8);
    const dt = Math.pow(10, zLg(t)), b = 2 + dt, sl = (vf(b) - 7) / dt, tg = M.io((t - tTan + 0.1) / 0.6);
    line(zCh, zg, 2, 7, b, vf(b)); zCh.style.opacity = (1 - tg * 0.85).toFixed(3);
    zP(2, 7, true); zQ(b, vf(b), tg < 0.5);
    M.drawU(zTg, tg); tangent(zTg, zg, 2, 7, 3, 1.6);
    M.vis($('#zch'), t, tZ1 + 0.6, 1e9, POP);
    M.setT($('#zchK'), tg > 0.5 ? 'tangent' : 'chord'); M.setT($('#zchV'), (tg > 0.5 ? 3 : sl).toFixed(sl < 2.99 ? 2 : 3).replace(/^3\.000$/, '3.00'));
    $('#zch').style.color = tg > 0.5 ? AC : BC; $('#zch').style.borderColor = tg > 0.5 ? AC : BC;
    avZ(t, wt('Z5', 'close') - 0.1, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    dC(k => [k, vf(k)], 0, 8);
    const dt = Math.pow(10, dLg(t)), b = 2 + dt, on = M.clamp((t - tStep[0]) / 0.3);
    line(dTx, dg, 2, 7, b, 7); line(dTy, dg, b, 7, b, vf(b)); line(dCh, dg, 2, 7, b, vf(b));
    [dTx, dTy, dCh].forEach(e => e.style.opacity = (on * (1 - M.clamp((t - tStep[2]) / 0.4) * 0.9)).toFixed(3));
    attr(dLt, 'x', ((dg.X(2) + dg.X(b)) / 2 - 14).toFixed(1)); attr(dLt, 'y', (dg.Y(7) + 32).toFixed(1));
    attr(dLx, 'x', (dg.X(b) + 10).toFixed(1)); attr(dLx, 'y', ((dg.Y(7) + dg.Y(vf(b))) / 2 + 8).toFixed(1));
    const lo = on * (1 - M.clamp((t - tStep[1] - 0.6) / 0.4)); dLt.style.opacity = lo; dLx.style.opacity = lo;
    const tg = M.io((t - tStep[2]) / 0.6); M.drawU(dTg, tg); tangent(dTg, dg, 2, 7, 3, 1.8);
    attr(dLs, 'x', dg.X(2.6).toFixed(1)); attr(dLs, 'y', dg.Y(5) + 6); dLs.style.opacity = M.clamp((t - wt('D5', 'three') + 0.1) / 0.3);
    dP(2, 7, t > tStep[0] - 0.2);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Velocity') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Acceleration') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tN1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const v1 = kbF(t, wt('K1', 'velocity') - 0.2); M.setT($('#kbv'), v1.toFixed(1)); M.setT($('#kba'), '+2.5');
    M.vis($('#kbR'), t, wt('K1', 'velocity'), 1e9, { dy: 10 }); M.vis($('#kbC'), t, wt('K1', 'speed') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const v2 = kdF(t, T0('K2')); M.setT($('#kdv'), v2.toFixed(1)); M.setT($('#kda'), '-2.5');
    M.vis($('#kdR'), t, T0('K2') + 0.2, 1e9, { dy: 10 }); M.vis($('#kdC'), t, wt('K2', 'down') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('N1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is', 2) - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Gravity') });
  }

  /* N */
  const nOn = t >= tN1 - 0.1 && t < tW1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = OUT('N4');
    M.vis($('#nn'), t, tN1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const u = nU(t), x = -(5 * u + u * u), v = -(5 + 2 * u), bx = NX0 + x * NPX;
    aN.set(bx, NY, 0.75, -1, -x / 3);
    ghN.forEach((b, k) => { const uu = Math.max(0, u - 0.35 * (k + 1)), xx = -(5 * uu + uu * uu); b.set(NX0 + xx * NPX, NY, 0.75, -1, 0); b.g.style.opacity = u > 0 && u < 4.4 && uu < u - 0.05 ? [0.3, 0.2, 0.12][k] : 0; });
    const on = M.clamp((t - tNs) / 0.3);
    vN.set(bx, NY - 100, bx + v * 9 * on, NY - 100); attr(vNl, 'x', (bx + 12).toFixed(1)); attr(vNl, 'y', NY - 90); vNl.style.opacity = on;
    aNa.set(bx, NY - 150, bx - 60 * on, NY - 150); attr(aNl, 'x', (bx + 12).toFixed(1)); attr(aNl, 'y', NY - 140); aNl.style.opacity = on;
    M.vis($('#nnR'), t, tNs, 1e9, { dy: 10 }); M.setT($('#nnv'), v.toFixed(1)); M.setT($('#nna'), '-2.0');
    M.vis($('#nr'), t, T0('N2') - 0.1, out, { dx: 60, dy: 0, ...o });
    NR.forEach((_, i) => M.vis($('#nr' + i), t, i === 1 ? wt('N3', 'negative') - 0.1 : (i === 0 ? wt('N2', 'direction') - 0.1 : wt('N3', 'acceleration') + 0.2 + (i - 2) * 0.3), 1e9, { dx: -20, dy: 0 }));
    M.vis($('#th2'), t, tN4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tN4, tOpts: wt('N4', 'speeding') - 0.1, tCount: T1('N4') + 0.05, dur: 3, tAns: T0('N5') - 0.02, tWhy: wt('N5', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wC(k => [k, vw(k)], 0, 2.4 * M.o3((t - T0('W2') - 0.4) / 1.2));
    const c = M.io((t - tW[1] + 0.1) / 0.5); line(wCh, wg, 0, 0, 2 * c, 16 * c); wCh.style.opacity = c > 0 ? 1 : 0;
    wP0(0, 0, c > 0); wP2(2, 16, t > tW[0]); wL1.style.opacity = M.clamp((t - wt('W4', 'Eight')) / 0.3);
    const tg = M.io((t - wt('W6', 'fourteen') + 0.2) / 0.6); M.drawU(wTg, tg); tangent(wTg, wg, 2, 16, 14, 0.45);
    wL2.style.opacity = M.clamp((t - wt('W6', 'fourteen') - 0.2) / 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'zero') - 0.1, tStrike: wt('X3', 'Not') - 0.05, tRight: wt('X3', 'top') - 0.1 });
    const tt = wt('X3', 'top') - 0.3; tbG.forEach((c, k) => c.setAttribute('opacity', (M.clamp((t - tt - (2 - k) * 0.12) / 0.2) * [0.12, 0.2, 0.3][k]).toFixed(3)));
    tbB.setAttribute('opacity', M.clamp((t - tt - 0.36) / 0.2).toFixed(3)); tbV.style.opacity = M.clamp((t - wt('X3', 'v') ) / 0.3);
    const ga = M.io((t - wt('X3', 'g') + 0.1) / 0.5); tbA.set(BX - 50, BTOP + 10, BX - 50, BTOP + 10 + 120 * ga); tbAl.style.opacity = ga;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Given') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNX - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
