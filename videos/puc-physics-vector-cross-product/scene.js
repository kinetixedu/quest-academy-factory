// PUC Physics Ep 96: Vector (cross) product (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, BC = C.violet, RC = C.ink, TC = C.gold, FC = C.orange, KC = C.gold;   // A blue, B violet, A x B ink, theta gold, F orange, k-hat gold
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const ih = tc(AC, '\\hat i'), jh = tc(BC, '\\hat j'), kh = tc(KC, '\\hat k'), Av = tc(AC, '\\vec A'), Bv = tc(BC, '\\vec B');
const AxB = `${Av}\\times${Bv}`;
/* oblique drawing of a flat floor (x right, y into the page) with z up: a flat 2D projection, nothing flips or spins in 3D */
const OB = (O, S, SZ) => (x, y, z = 0) => [O[0] + S * (x + 0.5 * y), O[1] - S * 0.35 * y - SZ * z];
const pts = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
const floor = (p, P, x0, x1, y0, y1) => { mk(p, 'polygon', { points: pts([P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)]), fill: '#F3F5F9', stroke: C.line, 'stroke-width': 2 });
  for (let x = Math.ceil(x0); x <= x1; x++) { const a = P(x, y0), b = P(x, y1); mk(p, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#E3E6EC', 'stroke-width': 1.5 }); }
  for (let y = Math.ceil(y0); y <= y1; y++) { const a = P(x0, y), b = P(x1, y); mk(p, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#E3E6EC', 'stroke-width': 1.5 }); } };
const arcPath = (P, r, a0, a1, n = 24) => { let d = ''; for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * D2R, q = P(r * Math.cos(a), r * Math.sin(a)); d += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } return d; };
/* "into the page" mark: circle with a cross */
const intoMark = (p, r, col) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: col, 'stroke-width': 4 }); const q = r * 0.55; mk(g, 'path', { d: `M${-q},${-q} L${q},${q} M${q},${-q} L${-q},${q}`, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }); return { o, g, set(x, y, s = 1) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(3)})`); } }; };

Object.assign(M.IC, {
  bottle: ['M9 2h6v3H9z', 'M9 5c0 2-3 3-3 6v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9c0-3-3-4-3-6'],
  screw: ['M8 3h8v3H8z', 'M10 6v13l2 3 2-3V6', 'M10 9l4 2', 'M10 13l4 2'],
  angle: ['M4 20h16', 'M4 20V4', 'M4 14h6v6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10'), tS11 = T0('S11');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bottle', 'Bottle cap', 'TWIST · IT RISES'], ['screw', 'A screw', 'TURN · IT SINKS IN'], ['angle', 'Round vs straight', 'AT RIGHT ANGLES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'cap'), wt('H1', 'screw'), wt('H2', 'straight')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="100"></svg></div>`).join('');
const JA = JOBS.map((_, i) => { const s = $('#jsv' + i), cx = 160, cy = 62;
  if (i < 2) mk(s, 'ellipse', { cx, cy, rx: 46, ry: 16, fill: i ? '#C9CED8' : '#E7A4A4', stroke: C.ink, 'stroke-width': 2.5 });
  else mk(s, 'polygon', { points: `${cx - 80},${cy + 14} ${cx + 40},${cy + 14} ${cx + 80},${cy - 14} ${cx - 40},${cy - 14}`, fill: '#F3F5F9', stroke: C.ink2, 'stroke-width': 2 });
  const curl = mk(s, 'path', { d: `M${cx + 52},${cy + 2} A58,20 0 1 1 ${cx + 20},${cy + 19}`, fill: 'none', stroke: TC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  const up = PUC.arrow(s, RC, 5, 14);
  return { s, curl, up, cx, cy, dir: i === 1 ? 1 : -1 }; });
// top view spanner on a bolt, turned clockwise; side view inset: the bolt sinks into the wood
const hs = $('#hkS'), HB = [230, 230];
mk(hs, 'rect', { x: 36, y: 76, width: 510, height: 290, rx: 10, fill: '#E9D6B4', stroke: '#C9A27A', 'stroke-width': 3 });
for (let y = 96; y < 366; y += 34) mk(hs, 'path', { d: `M40,${y} C160,${y - 8} 300,${y + 8} 542,${y - 2}`, fill: 'none', stroke: '#D8C09A', 'stroke-width': 2 });
const spO = mk(hs, 'g', {}), sp = mk(spO, 'g', {});
mk(sp, 'rect', { x: 30, y: -15, width: 230, height: 30, rx: 12, fill: '#9AA3B5', stroke: C.ink, 'stroke-width': 2.5 });
mk(sp, 'circle', { cx: 0, cy: 0, r: 42, fill: '#9AA3B5', stroke: C.ink, 'stroke-width': 2.5 });
mk(hs, 'polygon', { points: [0, 1, 2, 3, 4, 5].map(k => `${(HB[0] + 22 * Math.cos(k * Math.PI / 3)).toFixed(1)},${(HB[1] + 22 * Math.sin(k * Math.PI / 3)).toFixed(1)}`).join(' '), fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2.5 });
const hInto = intoMark(hs, 13, RC); hInto.set(HB[0], HB[1]);
const hF = PUC.arrow(hs, FC, 7, 20), hFl = txt(hs, 0, 0, 'push', { fill: FC, 'font-weight': 700, 'font-size': 20 });
const hTurn = mk(hs, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5, 'stroke-dasharray': '6 6' });
// side view inset
const inG = mk(hs, 'g', {}); mk(inG, 'rect', { x: 36, y: 380, width: 240, height: 96, rx: 8, fill: '#fff', stroke: C.line, 'stroke-width': 2 }); txt(inG, 48, 400, 'SIDE VIEW', { 'font-size': 14, 'font-weight': 600, 'letter-spacing': 1 });
mk(inG, 'rect', { x: 60, y: 440, width: 200, height: 30, fill: '#E9D6B4', stroke: '#C9A27A', 'stroke-width': 2 });
const bolt = mk(inG, 'g', {}); mk(bolt, 'rect', { x: 146, y: 0, width: 28, height: 10, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2 }); mk(bolt, 'rect', { x: 154, y: 10, width: 12, height: 34, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2 });
const inA = PUC.arrow(inG, RC, 4, 12);
const tHturn = wt('H3', 'pushes'), hAng = t => -20 + 50 * M.io((t - tHturn) / 3.2);

/* ---------- P ---------- */
const QR = [['×', RC, 'A × B is a new vector', 'multiply two vectors with a cross'], ['AB', RC, 'Size: A B sin θ', 'θ between them, tail to tail'], ['⊥', RC, 'At right angles to both', 'straight out of their flat plane'], ['↺', TC, 'Right-hand rule', 'curl fingers A to B: thumb = A × B']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 118}px"><div class="qs" style="color:${c};font-style:normal;${i === 1 ? 'font-size:34px;top:30px;font-style:italic' : ''}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'Multiply'), wt('P2', 'size'), wt('P3', 'direction'), wt('P4', 'right')];
const pm = $('#pmS'), PP = OB([250, 430], 84, 40), PTH = 60;
floor(pm, PP, -1.2, 4.6, -2.4, 2.4);
const pAr = PUC.arrow(pm, AC, 7, 20), pBr = PUC.arrow(pm, BC, 7, 20), pCr = PUC.arrow(pm, RC, 8, 22);
const pPar = mk(pm, 'polygon', { points: '', fill: RC, opacity: 0.1 });
const pLab = [txt(pm, 0, 0, 'A', { fill: AC, 'font-weight': 700, 'font-size': 28, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(pm, 0, 0, 'B', { fill: BC, 'font-weight': 700, 'font-size': 28, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(pm, 0, 0, 'A × B', { fill: RC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins' })];
const pTh = mk(pm, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), pThL = txt(pm, 0, 0, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' });
const pCurl = mk(pm, 'path', { fill: 'none', stroke: TC, 'stroke-width': 5, 'stroke-linecap': 'round' }), pCurlH = mk(pm, 'path', { fill: TC });
const pCurlL = txt(pm, 0, 0, 'curl fingers A → B', { fill: TC, 'font-weight': 700, 'font-size': 20 }), pThumb = txt(pm, 0, 0, 'thumb', { fill: RC, 'font-weight': 700, 'font-size': 20 });
const pRA = mk(pm, 'path', { fill: 'none', stroke: RC, 'stroke-width': 2.5 });

/* ---------- S: the sim ---------- */
const s = $('#simS'), SP = OB([262, 340], 88, 28), A0 = 3, B0 = 2;
floor(s, SP, -1.2, 4.0, -2.5, 2.5);
const zAx = mk(s, 'line', { stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' }); { const a = SP(0, 0, -6.3), b = SP(0, 0, 6.6); attr(zAx, 'x1', a[0]); attr(zAx, 'y1', a[1]); attr(zAx, 'x2', b[0]); attr(zAx, 'y2', b[1]); }
const par = mk(s, 'polygon', { points: '', fill: RC, opacity: 0.12, stroke: RC, 'stroke-opacity': 0.25, 'stroke-width': 1.5 });
const ghB = [0, 1, 2].map(() => mk(s, 'line', { stroke: BC, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }));
const ghC = [0, 1, 2].map(() => mk(s, 'line', { stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 }));
const sA = PUC.arrow(s, AC, 7, 20), sB = PUC.arrow(s, BC, 7, 20), sC = PUC.arrow(s, RC, 8, 22);
const sTh = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), sThL = txt(s, 0, 0, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const sLA = txt(s, 0, 0, 'A', { fill: AC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' }), sLB = txt(s, 0, 0, 'B', { fill: BC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' });
const sLC = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins' });
const sH = mk(s, 'line', { stroke: TC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), sHL = txt(s, 0, 0, 'h = 2 sin 30° = 1', { fill: TC, 'font-weight': 700, 'font-size': 19 });
const sBase = txt(s, 0, 0, 'base = 3', { fill: AC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' });
const sCurl = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 5, 'stroke-linecap': 'round' }), sCurlH = mk(s, 'path', { fill: TC }), sCurlL = txt(s, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 19 });
const tFz = wt('S7', 'thirty') + 0.2, tSwap = wt('S11', 'down') - 0.3;
const SEG = [[wt('S3', 'turn'), wt('S3', 'ninety') + 0.1, 0, 90], [wt('S4', 'Keep'), wt('S4', 'eighty') + 0.1, 90, 180], [wt('S5', 'Past'), wt('S5', 'flips') + 0.2, 180, 270], [wt('S6', 'graph'), T1('S6'), 270, 360]];
function state(t) {
  if (t >= tS7) { const th = t < tFz ? 30 * M.clamp((t - tS7) / (tFz - tS7)) : 30; return { th, replay: t < tFz, frozen: t >= tFz, swap: t >= tSwap ? M.io((t - tSwap) / 0.6) : 0, max: 360 }; }
  let th = 0; for (const [a, b, v0, v1] of SEG) { if (t >= a) th = M.lerp(v0, v1, M.clamp((t - a) / (b - a))); }
  return { th, max: th, swap: 0 };
}
$('#roA').innerHTML = `<span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">0</span><span class="u">deg</span>
  <span class="k" style="color:${AC}">A</span><span class="v" style="color:${AC}">3</span><span class="u">units</span>
  <span class="k" style="color:${BC}">B</span><span class="v" style="color:${BC}">2</span><span class="u">units</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${TC};font-style:normal;font-size:24px">sin θ</span><span class="v" id="r_s">0.00</span><span class="u"></span>
  <span class="k" id="r_cl" style="color:${RC};font-style:normal;font-size:24px">A×B</span><span class="v" id="r_c">0.00</span><span class="u">units</span>
  <span class="k" style="color:${RC};font-style:normal;font-size:22px">dir</span><span class="v" id="r_d" style="font-size:30px">none</span><span class="u"></span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 560, h: 160, xmax: 360, ymin: -6, ymax: 6, xt: [0, 90, 180, 270, 360], yt: [-6, 0, 6], xl: 'θ (deg)' });
const gC = g.curve(RC, 5), gD = g.dot(RC, 10); attr(g.xlab, 'x', 696); attr(g.xlab, 'text-anchor', 'start');
const gArea = mk(gs, 'path', { d: '', fill: RC, opacity: 0.08 });
const th1 = PUC.think($('#th1'), { q: 'Now swap the order: B × A. Same direction as A × B, or opposite?', opts: ['Same direction', 'Opposite'], right: 1, why: 'Curl from B to A: the thumb points down. B × A = - A × B.' });

/* ---------- D ---------- */
const STEPS = [[`${ih}\\times${ih} = ${jh}\\times${jh} = ${kh}\\times${kh} = 0`, 'sin 0° = 0: a vector crossed with itself'],
  [`${ih}\\times${jh} = ${kh},\\;\\; ${jh}\\times${kh} = ${ih},\\;\\; ${kh}\\times${ih} = ${jh}`, 'round the circle: plus'],
  [`${jh}\\times${ih} = -${kh},\\;\\; ${kh}\\times${jh} = -${ih},\\;\\; ${ih}\\times${kh} = -${jh}`, 'the other way round: minus'],
  [`${AxB} = \\begin{vmatrix} ${ih} & ${jh} & ${kh} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}`, 'multiply out the parts']];
const SY = [88, 186, 284, 384];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx" ${i === 3 ? 'style="font-size:30px"' : ''}>${K(f)}</div><div class="why" ${i === 3 ? 'style="left:520px;top:50px"' : ''}>${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DC = [262, 250], DR = 120, DN = [[-90, 'i', AC], [30, 'j', BC], [150, 'k', KC]].map(([a, n, c]) => ({ x: DC[0] + DR * Math.cos(a * D2R), y: DC[1] + DR * Math.sin(a * D2R), a, n, c }));
const dArc = [0, 1, 2].map(i => { const a0 = DN[i].a + 22, a1 = DN[i].a + 98; let d = ''; for (let k = 0; k <= 20; k++) { const a = (a0 + (a1 - a0) * k / 20) * D2R; d += (k ? 'L' : 'M') + (DC[0] + DR * Math.cos(a)).toFixed(1) + ',' + (DC[1] + DR * Math.sin(a)).toFixed(1); } const p = mk(dp, 'path', { d, fill: 'none', stroke: C.ok, 'stroke-width': 5, 'stroke-linecap': 'round' }); const e = a1 * D2R, ex = DC[0] + DR * Math.cos(e), ey = DC[1] + DR * Math.sin(e), tx = -Math.sin(e), ty = Math.cos(e); const h = mk(dp, 'path', { d: `M${(ex + tx * 14).toFixed(1)},${(ey + ty * 14).toFixed(1)} L${(ex - ty * 9).toFixed(1)},${(ey + tx * 9).toFixed(1)} L${(ex + ty * 9).toFixed(1)},${(ey - tx * 9).toFixed(1)} Z`, fill: C.ok }); return { p, h }; });
DN.forEach(q => { mk(dp, 'circle', { cx: q.x, cy: q.y, r: 30, fill: '#fff', stroke: q.c, 'stroke-width': 4 }); txt(dp, q.x, q.y + 10, q.n, { 'text-anchor': 'middle', fill: q.c, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' }); });
const dPlus = txt(dp, DC[0], DC[1] + 10, '+', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 48, 'font-family': 'Poppins' });
const dMinus = txt(dp, DC[0], DC[1] + 196, 'the other way round: minus', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 20 });
const dRev = mk(dp, 'path', { d: `M${DC[0] + 40},${DC[1] + 150} A170,40 0 0 1 ${DC[0] - 40},${DC[1] + 150}`, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 6' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`|${AxB}| = AB\\sin${tc(TC, '\\theta')}`);

/* ---------- R ---------- */
const LK = [`${K(tc(BC, '\\vec r'))}: from the bolt, along the handle`, `${K(tc(FC, '\\vec F'))}: his push, across the handle`, `Both flat, so ${K(`${tc(BC, '\\vec r')}\\times${tc(FC, '\\vec F')}`)} points along the bolt`, `Curl ${K(tc(BC, '\\vec r'))} to ${K(tc(FC, '\\vec F'))}: thumb into the wood`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px;height:84px"><div class="n" style="top:19px">${i + 1}</div><div class="lt" style="height:84px">${h}</div></div>`).join('');
const tLk = [wt('R2', 'r'), wt('R2', 'F'), wt('R3', 'So'), wt('R4', 'Curl')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'Turn clockwise, and the bolt goes in. Now I know why!' });
const rr = $('#rrS'), RB = [280, 300];
mk(rr, 'rect', { x: 36, y: 76, width: 712, height: 470, rx: 10, fill: '#E9D6B4', stroke: '#C9A27A', 'stroke-width': 3 });
for (let y = 100; y < 546; y += 40) mk(rr, 'path', { d: `M40,${y} C240,${y - 10} 480,${y + 10} 744,${y - 2}`, fill: 'none', stroke: '#D8C09A', 'stroke-width': 2 });
const rsO = mk(rr, 'g', {}), rsp = mk(rsO, 'g', {});
mk(rsp, 'rect', { x: 36, y: -17, width: 300, height: 34, rx: 13, fill: '#B8BFCC', stroke: C.ink, 'stroke-width': 2.5 }); mk(rsp, 'circle', { cx: 0, cy: 0, r: 48, fill: '#B8BFCC', stroke: C.ink, 'stroke-width': 2.5 });
mk(rr, 'polygon', { points: [0, 1, 2, 3, 4, 5].map(k => `${(RB[0] + 26 * Math.cos(k * Math.PI / 3)).toFixed(1)},${(RB[1] + 26 * Math.sin(k * Math.PI / 3)).toFixed(1)}`).join(' '), fill: '#D5D9E0', stroke: C.ink, 'stroke-width': 2.5 });
const rR = PUC.arrow(rr, BC, 7, 20), rF = PUC.arrow(rr, FC, 7, 20), rRl = txt(rr, 0, 0, 'r', { fill: BC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' }), rFl = txt(rr, 0, 0, 'F', { fill: FC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' });
const rRA = mk(rr, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3 });
const rInto = intoMark(rr, 16, RC), rIntoL = txt(rr, RB[0] - 60, RB[1] + 130, 'r × F: into the wood', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 22 });
const rTq = txt(rr, 392, 528, 'r × F has a name: torque', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });
const rAng = t => -10 + 35 * M.io((t - tR1 - 0.5) / (T1('R4') - tR1));

/* ---------- K ---------- */
$('#khF').innerHTML = K(`${Av}\\cdot${Bv} = AB\\cos${tc(TC, '\\theta')}`); $('#klF').innerHTML = K(`|${AxB}| = AB\\sin${tc(TC, '\\theta')}`);
const KP = ['#khS', '#klS'].map((id, i) => { const sv = $(id), gg = PUC.graph(sv, { x: 110, y: 236, w: 560, h: 210, xmax: 180, ymin: -1, ymax: 1, xt: [0, 90, 180], yt: [-1, 0, 1], xl: 'θ (deg)' });
  const f = i ? (x => Math.sin(x * D2R)) : (x => Math.cos(x * D2R)); const cv = gg.curve(i ? RC : C.ink2, 5), dt = gg.dot(TC, 11);
  const mx = mk(sv, 'circle', { r: 16, fill: 'none', stroke: C.ok, 'stroke-width': 3, cx: gg.X(i ? 90 : 0), cy: gg.Y(1) });
  const zs = (i ? [0, 180] : [90]).map(x => mk(sv, 'circle', { r: 12, fill: 'none', stroke: C.red, 'stroke-width': 3, cx: gg.X(x), cy: gg.Y(0) }));
  attr(gg.xlab, 'x', 696); attr(gg.xlab, 'text-anchor', 'start'); return { gg, f, cv, dt, mx, zs }; });
$('#khP').innerHTML = `Biggest at 0°, zero at 90°`; $('#klP').innerHTML = `Biggest at 90°, zero at 0° and 180°`;
const th2 = PUC.think($('#th2'), { q: 'A × B is zero, but neither vector is zero. What angle is between them?', opts: ['90°', '0° or 180°'], right: 1, why: 'sin 0° = sin 180° = 0: the vectors are parallel or opposite.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `${K(`${Av} = 2${ih} + 3${jh}`)}, &nbsp;${K(`${Bv} = 4${ih} + ${jh}`)}. Find ${K(AxB)} and the area of the parallelogram they make.`;
const wsol = PUC.solution($('#wl'), [
  [K(`(2${ih} + 3${jh})\\times(4${ih} + ${jh})`)],
  [K(`${ih}\\times${ih} = ${jh}\\times${jh} = 0`)],
  [K(`2(${ih}\\times${jh}) + 12(${jh}\\times${ih}) = 2${kh} - 12${kh}`)],
  [K(`${AxB} = -10${kh},\\;\\; \\text{area} = 10`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 84 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [180, 470], WU = 64, WX = (x, y) => [WO[0] + WU * x, WO[1] - WU * y];
for (let x = 0; x <= 8; x++) { const a = WX(x, 0), b = WX(x, 5.6); mk(w, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#E3E6EC', 'stroke-width': 1.5 }); }
for (let y = 0; y <= 5; y++) { const a = WX(0, y), b = WX(8.6, y); mk(w, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#E3E6EC', 'stroke-width': 1.5 }); }
mk(w, 'path', { d: `M${WO[0]},${WO[1] - WU * 5.6} V${WO[1]} H${WO[0] + WU * 8.6}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(w, WO[0] + WU * 8.6, WO[1] + 26, 'x', { 'text-anchor': 'end', fill: C.ink, 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22 }); txt(w, WO[0] - 12, WO[1] - WU * 5.6 + 8, 'y', { 'text-anchor': 'end', fill: C.ink, 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22 });
const wPar = mk(w, 'polygon', { points: pts([WX(0, 0), WX(2, 3), WX(6, 4), WX(4, 1)]), fill: RC, opacity: 0 });
const wA = PUC.arrow(w, AC, 7, 20), wB = PUC.arrow(w, BC, 7, 20);
const wAl = txt(w, WX(2, 3)[0] - 14, WX(2, 3)[1] - 10, 'A (2, 3)', { 'text-anchor': 'end', fill: AC, 'font-weight': 700, 'font-size': 20 }), wBl = txt(w, WX(4, 1)[0] + 14, WX(4, 1)[1] + 26, 'B (4, 1)', { fill: BC, 'font-weight': 700, 'font-size': 20 });
const wInto = intoMark(w, 18, RC), wIl = txt(w, WX(3, 2)[0] + 30, WX(3, 2)[1] + 8, '-10 k: into the page', { fill: RC, 'font-weight': 700, 'font-size': 20 });
const wAr = txt(w, WX(6.2, 2.4)[0], WX(6.2, 2.4)[1], 'area = 10', { 'text-anchor': 'start', fill: RC, 'font-weight': 700, 'font-size': 24 });
const tW = [wt('W3', 'Multiply'), wt('W3', 'i'), wt('W4', 'Two'), wt('W5', 'Add')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${ih}\\times${kh} = +${jh}`)}`, right: `${K(`${ih}\\times${kh} = -${jh}`)} &nbsp;(i to k goes against the circle)` });
const tp = $('#tpS'), TCn = [470, 140], TR = 82, TN = [[-90, 'i', AC], [30, 'j', BC], [150, 'k', KC]].map(([a, n, c]) => ({ x: TCn[0] + TR * Math.cos(a * D2R), y: TCn[1] + TR * Math.sin(a * D2R), n, c }));
TN.forEach(q => { mk(tp, 'circle', { cx: q.x, cy: q.y, r: 22, fill: '#fff', stroke: q.c, 'stroke-width': 3.5 }); txt(tp, q.x, q.y + 8, q.n, { 'text-anchor': 'middle', fill: q.c, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' }); });
const tpBad = PUC.arrow(tp, C.red, 4, 14), tpGood = PUC.arrow(tp, C.ok, 4, 14);
const tpBl = txt(tp, 300, 120, 'i → k: minus', { 'text-anchor': 'end', fill: C.red, 'font-weight': 700, 'font-size': 20 }), tpGl = txt(tp, 300, 160, 'k → i: plus', { 'text-anchor': 'end', fill: C.ok, 'font-weight': 700, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Cross products from parts, areas of parallelograms and triangles, parallel vectors' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K(`${Av} = 2${ih} - 3${jh} + ${kh}`)}, &nbsp;${K(`${Bv} = 4${ih} + \\lambda${jh} + \\mu${kh}`)},<br>and ${K(`${AxB} = \\vec 0`)}. Find λ and μ.`, qW: 760,
  opts: [K('\\lambda = -6,\\ \\mu = 2'), K('\\lambda = 6,\\ \\mu = 2'), K('\\lambda = -6,\\ \\mu = -2'), K('\\lambda = 6,\\ \\mu = -2')], right: 0, optY: 300, optH: 96 });
const so = PUC.solution($('#so'), [
  [K(`${AxB} = \\vec 0 \\Rightarrow ${Av} \\parallel ${Bv}`)], [K(`${Bv} = n${Av}:\\ 4 = 2n,\\ n = 2`)],
  [K(`\\lambda = 2(-3) = -6`)], [K(`\\mu = 2(1) = 2`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '26px');
const tSo = [wt('A2', 'zero'), wt('A3', 'So'), wt('A4', 'Lambda'), wt('A4', 'Mu')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · the cross product', y0: 100, dy: 100, txt: [0, 0, 0, 1],
  lines: [K(`|${AxB}| = AB\\sin${tc(TC, '\\theta')},\\;\\; \\perp\\ \\text{to both (right hand)}`), K(`${Bv}\\times${Av} = -${AxB},\\;\\; ${Av}\\times${Av} = 0`), K(`${ih}\\times${jh} = ${kh},\\;\\; ${jh}\\times${kh} = ${ih},\\;\\; ${kh}\\times${ih} = ${jh}`),
    '<b>Area</b> of the parallelogram of A and B = |A × B|'] });
const YQ = ['Why is the cross product of two parallel vectors zero?', 'How do you find which way A × B points?', 'Why does B × A point the opposite way to A × B?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 97', topic: 'Outer horse, faster ride? Angular Velocity and Linear Velocity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tS10 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const curlArrow = (path, head, P, r, a0, a1) => { attr(path, 'd', arcPath(P, r, a0, a1)); const e = a1 * D2R, q1 = P(r * Math.cos(e), r * Math.sin(e)), q0 = P(r * Math.cos(e - 0.12), r * Math.sin(e - 0.12)); const dx = q1[0] - q0[0], dy = q1[1] - q0[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; attr(head, 'd', `M${(q1[0] + ux * 14).toFixed(1)},${(q1[1] + uy * 14).toFixed(1)} L${(q1[0] - uy * 9).toFixed(1)},${(q1[1] + ux * 9).toFixed(1)} L${(q1[0] + uy * 9).toFixed(1)},${(q1[1] - ux * 9).toFixed(1)} Z`); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JA.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const t0 = tMorph + 0.7 + i * 0.5;
      M.draw(q.curl, t, t0, 0.6); const u = M.o3((t - t0 - 0.5) / 0.5); q.up.set(q.cx, q.cy + q.dir * 4, q.cx, q.cy + q.dir * (4 + 40 * u)); });
    vis($('#hjP'), t, wt('H2', 'motion') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const ang = hAng(t), e = ang * D2R; attr(sp, 'transform', `translate(${HB[0]},${HB[1]}) rotate(${ang.toFixed(2)})`);
    const hx = HB[0] + 240 * Math.cos(e), hy = HB[1] + 240 * Math.sin(e), uf = M.o3((t - tHturn + 0.1) / 0.4);
    hF.set(hx, hy, hx - 100 * Math.sin(e) * uf, hy + 100 * Math.cos(e) * uf); attr(hFl, 'x', (hx - 100 * Math.sin(e) + 12).toFixed(1)); attr(hFl, 'y', (hy + 100 * Math.cos(e)).toFixed(1)); hFl.style.opacity = uf;
    attr(hTurn, 'd', `M${HB[0] + 150 * Math.cos(-0.35)},${HB[1] + 150 * Math.sin(-0.35)} A150,150 0 0 1 ${HB[0] + 150 * Math.cos(0.9)},${HB[1] + 150 * Math.sin(0.9)}`); hTurn.style.opacity = uf * 0.8;
    const ui = M.io((t - wt('H4', 'straight') + 0.1) / 0.4); hInto.set(HB[0], HB[1], 0.6 + 0.6 * ui); hInto.o.style.opacity = ui;
    vis(inG, t, wt('H4', 'straight') - 0.2, 1e9, { dy: 0 }); const sink = 16 * M.io((t - tHturn) / 3.2); attr(bolt, 'transform', `translate(0,${(396 + sink).toFixed(1)})`); inA.set(196, 400, 196, 400 + 36 * ui);
    vis($('#hkQ'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const ua = M.o3((t - tP1 - 0.8) / 0.5), ub = M.o3((t - tP1 - 1.2) / 0.5), uc = M.o3((t - wt('P3', 'direction') + 0.1) / 0.6), O0 = PP(0, 0), Ae = PP(3 * ua, 0), Bq = [2 * Math.cos(PTH * D2R), 2 * Math.sin(PTH * D2R)], Be = PP(Bq[0] * ub, Bq[1] * ub), Ce = PP(0, 0, 6 * Math.sin(PTH * D2R) * uc);
    pAr.set(O0[0], O0[1], Ae[0], Ae[1]); pBr.set(O0[0], O0[1], Be[0], Be[1]); pCr.set(O0[0], O0[1], Ce[0], Ce[1]);
    attr(pLab[0], 'x', Ae[0] + 12); attr(pLab[0], 'y', Ae[1] + 10); pLab[0].style.opacity = ua; attr(pLab[1], 'x', Be[0] + 10); attr(pLab[1], 'y', Be[1] - 8); pLab[1].style.opacity = ub; attr(pLab[2], 'x', Ce[0] + 16); attr(pLab[2], 'y', Ce[1] + 10); pLab[2].style.opacity = uc;
    const up2 = M.io((t - wt('P2', 'size') + 0.1) / 0.5); attr(pPar, 'points', pts([PP(0, 0), PP(3, 0), PP(3 + Bq[0], Bq[1]), PP(Bq[0], Bq[1])])); pPar.style.opacity = 0.1 * up2;
    const ut = M.io((t - wt('P2', 'Theta') + 0.1) / 0.4); attr(pTh, 'd', arcPath(PP, 0.7, 0, PTH * ut)); const tl = PP(0.95 * Math.cos(30 * D2R), 0.95 * Math.sin(30 * D2R)); attr(pThL, 'x', tl[0] + 4); attr(pThL, 'y', tl[1] + 6); pThL.style.opacity = ut;
    const uR = M.io((t - wt('P3', 'right') + 0.1) / 0.3); const q1 = PP(0, 0, 0.9), q2 = PP(0.45, 0, 0.9), q3 = PP(0.45, 0, 0); attr(pRA, 'd', `M${q1[0]},${q1[1]} L${q2[0]},${q2[1]} L${q3[0]},${q3[1]}`); pRA.style.opacity = uR;
    const ucu = M.io((t - wt('P4', 'Curl') + 0.1) / 0.8); if (ucu > 0.01) curlArrow(pCurl, pCurlH, PP, 1.5, 8, 8 + (PTH - 16) * ucu); else { attr(pCurl, 'd', ''); attr(pCurlH, 'd', ''); }
    const cl = PP(1.9, 1.3); attr(pCurlL, 'x', cl[0] + 10); attr(pCurlL, 'y', cl[1] - 4); pCurlL.style.opacity = ucu;
    const uth = M.io((t - wt('P4', 'thumb') + 0.1) / 0.3); attr(pThumb, 'x', Ce[0] + 16); attr(pThumb, 'y', Ce[1] + 40); pThumb.style.opacity = uth;
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S10'), simIn2 = OUT('S11') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), th = S.th, e = th * D2R, O0 = SP(0, 0), ua = M.o3((t - tS1 - 0.6) / 0.5), ub = M.o3((t - wt('S1', 'B') + 0.1) / 0.5);
    const Ae = SP(A0 * ua, 0), bq = [B0 * Math.cos(e), B0 * Math.sin(e)], Be = SP(bq[0] * ub, bq[1] * ub);
    const cz = A0 * B0 * Math.sin(e) * (1 - 2 * S.swap), Ce = SP(0, 0, cz);
    sA.set(O0[0], O0[1], Ae[0], Ae[1]); sB.set(O0[0] + 0.01, O0[1] - 6 * (1 - Math.min(1, th / 8)), Be[0], Be[1] - 6 * (1 - Math.min(1, th / 8)));
    sC.set(O0[0], O0[1], Ce[0], Ce[1]);
    attr(par, 'points', pts([SP(0, 0), SP(A0, 0), SP(A0 + bq[0], bq[1]), SP(bq[0], bq[1])])); par.style.opacity = (0.12 * ub).toFixed(3);
    // ghost copies of B and of A x B while turning
    const moving = !S.frozen && Math.abs(th - state(t - 0.1).th) > 0.5;
    [0, 1, 2].forEach(j => { const pth = state(t - 0.1 * (j + 1)).th * D2R, pb = SP(B0 * Math.cos(pth), B0 * Math.sin(pth)), pc = SP(0, 0, A0 * B0 * Math.sin(pth));
      attr(ghB[j], 'x1', O0[0]); attr(ghB[j], 'y1', O0[1]); attr(ghB[j], 'x2', pb[0]); attr(ghB[j], 'y2', pb[1]); ghB[j].style.opacity = moving ? [0.3, 0.2, 0.12][j] : 0;
      attr(ghC[j], 'x1', O0[0]); attr(ghC[j], 'y1', O0[1]); attr(ghC[j], 'x2', pc[0]); attr(ghC[j], 'y2', pc[1]); ghC[j].style.opacity = moving ? [0.3, 0.2, 0.12][j] * 0.7 : 0; });
    attr(sTh, 'd', th > 1 ? arcPath(SP, 0.75, 0, th) : ''); const tl = SP(1.05 * Math.cos(e / 2), 1.05 * Math.sin(e / 2)); attr(sThL, 'x', tl[0] - 6); attr(sThL, 'y', tl[1] + 8); sThL.style.opacity = th > 8 ? 1 : 0;
    attr(sLA, 'x', Ae[0] + 12); attr(sLA, 'y', Ae[1] + 10); sLA.style.opacity = ua; attr(sLB, 'x', Be[0] + (Math.cos(e) < -0.3 ? -26 : 10)); attr(sLB, 'y', Be[1] - 10); sLB.style.opacity = ub;
    M.setT(sLC, S.swap > 0.5 ? 'B × A' : 'A × B'); attr(sLC, 'x', Ce[0] + (cz >= 0 ? 16 : -14)); attr(sLC, 'text-anchor', cz >= 0 ? 'start' : 'end'); attr(sLC, 'y', Ce[1] + (cz >= 0 ? 10 : 6)); sLC.style.opacity = Math.abs(cz) > 0.6 ? 1 : 0;
    // frozen at 30 degrees: base, height, right-hand curl
    const fz = S.frozen ? 1 : 0, uh = fz * M.io((t - wt('S8', 'height') + 0.1) / 0.4), ubs = fz * M.io((t - wt('S8', 'base') + 0.1) / 0.4);
    const hb = SP(bq[0], 0), ht = SP(bq[0], bq[1]); attr(sH, 'x1', hb[0]); attr(sH, 'y1', hb[1]); attr(sH, 'x2', ht[0]); attr(sH, 'y2', ht[1]); sH.style.opacity = uh * (1 - S.swap);
    attr(sHL, 'x', ht[0] - 40); attr(sHL, 'y', ht[1] - 46); sHL.style.opacity = uh * (1 - S.swap);
    const bl = SP(1.5, 0); attr(sBase, 'x', bl[0]); attr(sBase, 'y', bl[1] + 32); sBase.style.opacity = ubs * (1 - S.swap);
    const ucu = fz * M.io((t - wt('S9', 'Curl') + 0.1) / 0.7), sw = S.swap > 0.5;
    if (ucu > 0.01) { if (!sw) curlArrow(sCurl, sCurlH, SP, 1.45, 5, 5 + 20 * ucu); else curlArrow(sCurl, sCurlH, SP, 1.45, 25, 25 - 20 * ucu); } else { attr(sCurl, 'd', ''); attr(sCurlH, 'd', ''); }
    M.setT(sCurlL, sw ? 'curl B → A: thumb down' : 'curl A → B: thumb up'); const cl = SP(1.7, -1.3); attr(sCurlL, 'x', cl[0] - 40); attr(sCurlL, 'y', cl[1] + 20); sCurlL.style.opacity = ucu;
    vis($('#smo'), t, tS7 + 0.05, tFz - 0.25, { ...POP, sc: 0.8, outDur: 0.15 }); vis($('#frz'), t, tFz, simOut, { ...POP, sc: 0.8 }); if (t > simIn2) vis($('#frz'), t, simIn2 + 0.2, 1e9, { ...POP, sc: 0.8 });
    const sp1 = t >= tS11 - 0.3; $('#simP').innerHTML = sp1 ? K(`${Bv}\\times${Av} = -\\,${AxB}`) + '&nbsp; same size, opposite way' : `Size of ${K(AxB)} = the shaded area`;
    if (sp1) vis($('#simP'), t, wt('S11', 'B', 1) - 0.1, 1e9, POP); else vis($('#simP'), t, wt('S6', 'size') - 0.1, simOut, POP);
    // readout and graph
    const thr = Math.round(th), sr = Math.sin(thr * D2R), cr = A0 * B0 * sr * (S.swap > 0.5 ? -1 : 1);
    M.setT($('#r_th'), String(thr)); M.setT($('#r_s'), (Math.abs(sr) < 0.005 ? 0 : sr).toFixed(2)); M.setT($('#r_c'), (Math.abs(cr) < 0.005 ? 0 : cr).toFixed(2));
    M.setT($('#r_cl'), S.swap > 0.5 ? 'B×A' : 'A×B'); M.setT($('#r_d'), Math.abs(cr) < 0.005 ? 'none' : cr > 0 ? 'up' : 'down');
    M.setT($('#roT'), S.swap > 0.5 ? 'SWAPPED · B × A' : S.frozen || S.replay ? 'REPLAY · θ = 30°' : 'TURNING B'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    gC(x => [x, 6 * Math.sin(x * D2R)], 0, S.max, 90);
    let d = ''; if (S.max > 1) { for (let i = 0; i <= 60; i++) { const x = S.max * i / 60; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(6 * Math.sin(x * D2R)).toFixed(1); } d += `L${g.X(S.max).toFixed(1)},${g.Y(0).toFixed(1)} L${g.X(0)},${g.Y(0)} Z`; } attr(gArea, 'd', d);
    gD(th, A0 * B0 * Math.sin(e) * (S.swap > 0.5 ? -1 : 1), t >= wt('S2', 'zero') - 0.1);
    vis($('#th1'), t, tS10 + 0.05, OUT('S11'), { dy: 36, ...o });
    th1(t, { tin: tS10, tOpts: wt('S10', 'Same') - 0.1, tCount: T1('S10') + 0.05, dur: 3, tAns: tS11 - 0.02, tWhy: wt('S11', 'Curl') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; hb.style.height = (t > tStep[3] - 0.1 ? 150 : 96) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    dArc.forEach((q, i) => { const tt = [wt('D3', 'k'), wt('D3', 'i', 1), wt('D3', 'j', 2)][i]; M.draw(q.p, t, tt - 0.2, 0.5); vis(q.h, t, tt + 0.25, 1e9, { dy: 0 }); });
    vis(dPlus, t, wt('D3', 'plus') - 0.1, 1e9, { dy: 0 }); M.draw(dRev, t, wt('D4', 'other') - 0.1, 0.6); vis(dMinus, t, wt('D4', 'minus') - 0.1, 1e9, { dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'A', 1) - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'size') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ang = rAng(t), e = ang * D2R; attr(rsp, 'transform', `translate(${RB[0]},${RB[1]}) rotate(${ang.toFixed(2)})`);
    const ur = M.o3((t - tLk[0] + 0.1) / 0.5), uf = M.o3((t - tLk[1] + 0.1) / 0.5), L = 300, hx = RB[0] + L * Math.cos(e), hy = RB[1] + L * Math.sin(e);
    rR.set(RB[0], RB[1], RB[0] + L * Math.cos(e) * ur, RB[1] + L * Math.sin(e) * ur); attr(rRl, 'x', RB[0] + 150 * Math.cos(e) + 36 * Math.sin(e) - 8); attr(rRl, 'y', RB[1] + 150 * Math.sin(e) - 36 * Math.cos(e) + 8); rRl.style.opacity = ur;
    rF.set(hx, hy, hx - 130 * Math.sin(e) * uf, hy + 130 * Math.cos(e) * uf); attr(rFl, 'x', hx - 130 * Math.sin(e) + 16); attr(rFl, 'y', hy + 130 * Math.cos(e) + 10); rFl.style.opacity = uf;
    const q = 20, a1 = [hx - q * Math.cos(e), hy - q * Math.sin(e)], a2 = [a1[0] - q * Math.sin(e), a1[1] + q * Math.cos(e)], a3 = [hx - q * Math.sin(e), hy + q * Math.cos(e)];
    attr(rRA, 'd', `M${a1[0].toFixed(1)},${a1[1].toFixed(1)} L${a2[0].toFixed(1)},${a2[1].toFixed(1)} L${a3[0].toFixed(1)},${a3[1].toFixed(1)}`); rRA.style.opacity = uf;
    const ui = M.io((t - wt('R4', 'into') + 0.1) / 0.4); rInto.set(RB[0], RB[1], 0.5 + 0.7 * ui); rInto.o.style.opacity = M.io((t - tLk[2]) / 0.4); vis(rIntoL, t, wt('R4', 'into') - 0.1, 1e9, { dy: 0 });
    vis(rTq, t, wt('R4', 'torque') - 0.1, 1e9, { dy: 0 });
    avA(t, wt('R4', 'soon') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#khF'), t, tK1 + 0.4, 1e9, { dy: 10 }); vis($('#khT'), t, wt('K1', 'number') - 0.1, 1e9, POP); vis($('#klF'), t, tK2 + 0.2, 1e9, { dy: 10 }); vis($('#klT'), t, wt('K2', 'vector') - 0.1, 1e9, POP);
    KP.forEach((q, i) => { const t0 = i ? tK2 + 0.4 : tK1 + 0.6, t1 = i ? T1('K2') - 0.3 : T1('K1') - 0.3, th = 180 * M.clamp((t - t0) / (t1 - t0));
      q.cv(x => [x, q.f(x)], 0, th, 60); q.dt(th, q.f(th), t >= t0);
      vis(q.mx, t, i ? wt('K2', 'biggest') - 0.1 : wt('K1', 'biggest') - 0.1, 1e9, { dy: 0 }); q.zs.forEach(z => vis(z, t, i ? wt('K2', 'zero') - 0.1 : wt('K1', 'line'), 1e9, { dy: 0 })); });
    vis($('#khP'), t, wt('K1', 'line') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'zero') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'What') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Sine') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ua = M.o3((t - wt('W2', 'A') + 0.1) / 0.5), ub = M.o3((t - wt('W2', 'B') + 0.1) / 0.5), a = WX(2 * ua, 3 * ua), b = WX(4 * ub, 1 * ub);
    wA.set(WO[0], WO[1], a[0], a[1]); wB.set(WO[0], WO[1], b[0], b[1]); wAl.style.opacity = ua; wBl.style.opacity = ub;
    wPar.style.opacity = 0.14 * M.io((t - wt('W2', 'area') + 0.1) / 0.5);
    const ui = M.io((t - wt('W5', 'down') + 0.1) / 0.4), c = WX(3, 2); wInto.set(c[0], c[1], 0.5 + 0.5 * ui); wInto.o.style.opacity = ui; wIl.style.opacity = ui;
    vis(wAr, t, wt('W6', 'area') - 0.1, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'i') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'minus') - 0.2 });
    const i0 = TN[0], k0 = TN[2], ub = M.o3((t - wt('X3', 'against') + 0.1) / 0.5), ug = M.o3((t - wt('X3', 'Only') + 0.1) / 0.5);
    const lerpP = (p, q, u, off) => [p.x + (q.x - p.x) * u, p.y + (q.y - p.y) * u + off];
    { const s0 = lerpP(i0, k0, 0.3, -10), s1 = lerpP(i0, k0, 0.3 + 0.45 * ub, -10); tpBad.set(s0[0], s0[1], s1[0], s1[1]); }
    { const s0 = lerpP(k0, i0, 0.3, 14), s1 = lerpP(k0, i0, 0.3 + 0.45 * ug, 14); tpGood.set(s0[0] + 14, s0[1], s1[0] + 14, s1[1]); }
    tpBl.style.opacity = ub; tpGl.style.opacity = ug;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Cross') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
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

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
