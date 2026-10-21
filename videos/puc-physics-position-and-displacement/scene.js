// PUC Physics Ep 19: Position and displacement (Motion notebook: home -> shop -> home)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const XC = C.ink, DC = C.violet, VC = C.ac, PC = C.gold;   // colour-coding: position x ink, displacement violet, velocity blue, path length gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const op = (el, v) => { const s = v >= 0.999 ? '' : Math.max(0, v).toFixed(3); if (el.style.opacity !== s) el.style.opacity = s; M.hide(el, v <= 0.001); };
const at = (g, x, y, f = 1) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})${f < 0 ? ' scale(-1,1)' : ''}`);
const fade = (t, a, d = 0.3) => M.clamp((t - a) / d);
// piecewise linear: pts [[t, v], ...]
const lin = pts => t => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * (t - a) / Math.max(1e-6, b - a); } return pts[pts.length - 1][1]; };

Object.assign(M.IC, {
  lift: ['M5 3h14v18H5z', 'm9 9 3-3 3 3', 'm9 15 3 3 3-3'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  route: ['M6 19a3 3 0 1 0 0-.01', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', 'M18 5a3 3 0 1 0 0-.01'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  cup: ['M5 8h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z', 'M17 10h1.5a2.5 2.5 0 0 1 0 5H17', 'M9 3v2', 'M13 3v2'],
});

/* ---------- drawing helpers ---------- */
let clipN = 0;
function bike(p, face = true, s = 1) {
  const g0 = mk(p, 'g', {}), g = mk(g0, 'g', { transform: `scale(${s})` });
  [[-10, 58], [62, 58]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: x, cy: y, r: 3.5, fill: C.ink }); });
  mk(g, 'path', { d: 'M-10,58 L22,58 L12,24 Z M12,24 L54,22 L62,58 M22,58 L54,22', fill: 'none', stroke: '#1F3A8A', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M54,22 L50,8 L62,6', fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M14,22 L22,58 M17,0 L56,8 M14,22 L19,-4', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M4,22 H22', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  if (face) {
    const id = 'cf19_' + (clipN++), cp = mk(g, 'clipPath', { id }); mk(cp, 'circle', { cx: 21, cy: -22, r: 16 });
    mk(g, 'image', { href: IMG + 'aarav-face.jpg', x: 5, y: -38, width: 32, height: 32, 'clip-path': `url(#${id})` });
    mk(g, 'circle', { cx: 21, cy: -22, r: 16, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
  }
  return g0;
}
// small labelled landmark (house / shop / stall) sitting on the road at local (0, 0)
function place(p, kind, label, col = C.ink) {
  const g = mk(p, 'g', {});
  if (kind === 'home') { mk(g, 'path', { d: 'M-26,0 V-34 L0,-56 L26,-34 V0 Z', fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); mk(g, 'rect', { x: -7, y: -20, width: 14, height: 20, fill: C.ink }); }
  else if (kind === 'shop') { mk(g, 'rect', { x: -28, y: -44, width: 56, height: 44, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-34,-44 H34 L28,-58 H-28 Z', fill: C.red, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); mk(g, 'rect', { x: -16, y: -30, width: 32, height: 30, fill: C.ac2, stroke: C.ink, 'stroke-width': 2 }); }
  else { mk(g, 'rect', { x: -22, y: -30, width: 44, height: 30, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-28,-30 H28 L18,-46 H-18 Z', fill: C.ok, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); }
  txt(g, 0, kind === 'stall' ? -56 : -68, label, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: col, 'font-weight': 600 });
  return g;
}
// a number line: returns X(m)
function axis(p, { y, x0, sc, m0, m1, step, lab = 5, unit = 'x (m)', col = C.ink, zeroCol = C.ac, xe = 748 }) {
  mk(p, 'line', { x1: 36, y1: y, x2: xe, y2: y, stroke: C.ink, 'stroke-width': 3 });
  for (let m = m0; m <= m1 + 1e-6; m += step) { const x = x0 + m * sc, big = Math.abs(Math.round(m / step) % lab) === 0; mk(p, 'line', { x1: x, y1: y, x2: x, y2: y + (big ? 16 : 8), stroke: C.ink, 'stroke-width': 2 }); if (big) txt(p, x, y + 40, (m > 0 ? '+' : '') + Math.round(m), { 'text-anchor': 'middle', 'font-size': 18, fill: m === 0 ? zeroCol : col, 'font-weight': 600 }); }
  txt(p, xe, y + 66, unit, { 'text-anchor': 'end', 'font-size': 16 });
  return m => x0 + m * sc;
}
function bracket(p, col, label, lsz = 24) {
  const g = mk(p, 'g', {}), path = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round' });
  const l = txt(g, 0, 0, label, { 'font-size': lsz, fill: col, 'font-weight': 600, 'text-anchor': 'middle' });
  return { g, l, set(x1, x2, y, up = false) { attr(path, 'd', `M${x1.toFixed(1)},${y + (up ? 10 : -10)} v${up ? -10 : 10} H${x2.toFixed(1)} v${up ? 10 : -10}`); attr(l, 'x', ((x1 + x2) / 2).toFixed(1)); attr(l, 'y', up ? y - 14 : y + 30); } };
}
const dLab = (p, s, sz = 26) => txt(p, 0, 0, s, { 'font-family': 'Poppins', 'font-size': sz, fill: DC, 'font-weight': 700, 'text-anchor': 'middle' });

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tO1 = T0('O1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['lift', 'Lift', 'UP 3 FLOORS, DOWN 3'], ['waves', 'Swimmer', 'ONE LENGTH AND BACK'], ['route', 'Moved how far?', 'ENDS WHERE IT STARTED']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'lift'), wt('H1', 'swimmer'), wt('H2', 'started')];
$('#qi0').innerHTML = M.icon('route', 34, PC, 2.2); $('#qi1').innerHTML = M.icon('arrowR', 34, DC, 2.6);

/* ---------- P: position ---------- */
const pl = $('#plS'), PY = 330;
const PX = axis(pl, { y: PY, x0: 290, sc: 2, m0: -100, m1: 200, step: 10, lab: 5 });
const pHome = place(pl, 'home', 'HOME · O', C.ac); attr(pHome, 'transform', `translate(${PX(0)},${PY})`);
const pShop = place(pl, 'shop', 'SHOP'); attr(pShop, 'transform', `translate(${PX(200)},${PY})`);
const pStall = place(pl, 'stall', 'TEA STALL'); attr(pStall, 'transform', `translate(${PX(-100)},${PY})`);
const pDir = PUC.arrow(pl, C.ac, 5, 16), pDirL = txt(pl, 470, 140, '+ direction (to the shop)', { 'font-size': 20, fill: C.ac, 'font-weight': 600, 'text-anchor': 'middle' });
const pBs = bracket(pl, XC, 'x = +200 m', 26), pBt = bracket(pl, C.red, 'x = -100 m', 26);
pBs.set(PX(0), PX(200), PY + 110); pBt.set(PX(-100), PX(0), PY + 110);
attr(pBt.l, 'y', PY + 190);
const FR = [['home', 'Home (origin)', '0 m', C.ac], ['store', 'Shop', '+200 m', XC], ['cup', 'Tea stall', '-100 m', C.red]];
$('#frs').innerHTML = FR.map(([ic, n, v, col], i) => `<div class="fr" id="fr${i}" style="top:${84 + i * 116}px"><i>${M.icon(ic, 30, col, 2.2)}</i><div class="fn">${n}</div><div class="fv" style="color:${col}">x = ${v}</div></div>`).join('');

/* ---------- S: the ride sim ---------- */
const s = $('#simS'), SY = 330;
const SX = axis(s, { y: SY, x0: 290, sc: 2, m0: -100, m1: 200, step: 10, lab: 5 });
attr(place(s, 'home', 'HOME · O', C.ac), 'transform', `translate(${SX(0)},${SY})`);
attr(place(s, 'shop', 'SHOP'), 'transform', `translate(${SX(200)},${SY})`);
const ghosts = [0, 1, 2].map(() => bike(s, false, 0.8)), bk = bike(s, true, 0.8);
const dA = PUC.arrow(s, DC, 8, 22), dAL = dLab(s, 'Δx');
const vA = PUC.arrow(s, VC, 6, 18), vAL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
const pathBar = mk(s, 'rect', { x: 36, y: 500, height: 14, rx: 7, width: 0, fill: PC }), pathBg = mk(s, 'rect', { x: 36, y: 500, width: 712, height: 14, rx: 7, fill: C.soft });
s.insertBefore(pathBg, pathBar);
const pathT = txt(s, 36, 488, 'PATH ROLLED', { 'font-size': 16, 'letter-spacing': 1.5, fill: PC, 'font-weight': 600 });
const pathM = txt(s, 748, 488, '0 / 400 m', { 'font-size': 16, fill: PC, 'font-weight': 600, 'text-anchor': 'end' });
const tagR = $('#smo');
$('#roG').style.rowGap = '4px';
$('#roG').innerHTML = `<span class="k" style="color:${XC}">t</span><span class="v" id="rot">0</span><span class="u">s</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="rox">0</span><span class="u">m position</span>
  <span class="k" style="color:${DC};font-style:normal">Δ<i>x</i></span><span class="v" id="rod" style="color:${DC}">0</span><span class="u">m displacement</span>
  <span class="k" style="color:${PC};font-style:normal;font-size:24px">path</span><span class="v" id="rop" style="color:${PC}">0</span><span class="u">m rolled</span>`;
const G = PUC.graph($('#grS'), { x: 120, y: 70, w: 560, h: 140, xmax: 80, ymax: 200, xt: [0, 20, 40, 60, 80], yt: [0, 100, 200], yl: 'x (m)' });
txt($('#grS'), 760, 250, 't (s)', { 'text-anchor': 'end' });
const cv = G.curve(XC), gd = G.dot(XC), gdA = PUC.arrow($('#grS'), DC, 5, 14);
// ride clock (sim seconds, 5 m/s): home at 0, shop at 40 s, home at 80 s
const xOf = s2 => s2 <= 40 ? 5 * s2 : Math.max(0, 200 - 5 * (s2 - 40));
const tGo = wt('S2', 'leaves'), tShop = wt('S4', 'shop'), tTurn = wt('S5', 'turns'), tSl0 = T0('S6') + 0.25, tSl1 = T1('S6'), tHome = wt('S7', 'home');
const tau = lin([[tGo, 0], [tShop, 40], [tTurn, 40], [tSl0, 50], [tSl1, 54], [tHome, 80]]);

/* ---------- L: reasoning + three roads ---------- */
const LK = ['Displacement = change in position', 'Only the start and the end count', 'Start = end, so Δx = 0'];
$('#lks').innerHTML = LK.map((x, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${x}</div></div>` + (i < 2 ? `<div class="ld" id="ld${i}" style="top:${170 + i * 112}px">${M.icon('arrowD', 24, C.ac, 2.6)}</div>` : '')).join('') +
  `<div class="pillp ink" id="lkP" style="left:36px;top:412px">Home to home: displacement zero</div>`;
const tLk = [wt('L2', 'Displacement'), wt('L2', 'Only'), wt('L4', 'same'), wt('L4', 'zero')];
const lr = $('#lrS'), A = [120, 330], B = [660, 330];
const roads = ['M120,330 C220,120 420,120 660,330', 'M120,330 C260,470 380,200 500,420 S620,380 660,330', 'M120,330 L240,250 L330,400 L470,190 L560,420 L660,330'].map((d, i) => mk(lr, 'path', { d, fill: 'none', stroke: PC, 'stroke-width': 4, 'stroke-dasharray': i === 2 ? '2 10' : 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: [1, 0.75, 0.75][i] }));
[A, B].forEach(([x, y], i) => { mk(lr, 'circle', { cx: x, cy: y, r: 12, fill: i ? XC : C.ac }); txt(lr, x, y + 44, i ? 'END' : 'START', { 'text-anchor': 'middle', 'font-size': 18, fill: i ? XC : C.ac, 'font-weight': 600 }); });
const lA = PUC.arrow(lr, DC, 8, 22), lAL = dLab(lr, 'Δx is the same for all three', 24);
const avA = PUC.avatar($('#sL'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'My wheels did the work, but I went nowhere!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`\\text{start: }\\textcolor{${XC}}{x_1}\\qquad\\text{end: }\\textcolor{${XC}}{x_2}`, 'two positions, read from the same origin'],
  [`\\textcolor{${DC}}{\\Delta x} = \\textcolor{${XC}}{x_2} - \\textcolor{${XC}}{x_1}`, 'final minus initial'],
  [`\\textcolor{${DC}}{\\Delta x} > 0 \\;\\text{or}\\; \\textcolor{${DC}}{\\Delta x} < 0`, 'the sign is the direction'],
  [`\\text{m} - \\text{m} = \\text{m}`, 'a length with a direction: a vector']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Check')];
const dr = $('#drS'), DY = 300;
const DX = axis(dr, { y: DY, x0: 92, sc: 3, m0: 0, m1: 200, step: 10, lab: 5 });
const dGh = mk(dr, 'g', {}); dGh.innerHTML = `<foreignObject x="560" y="70" width="200" height="44"><div xmlns="http://www.w3.org/1999/xhtml" class="ghost" style="position:static">EXAMPLE FIGURES</div></foreignObject>`;
const d1 = mk(dr, 'circle', { r: 12, fill: XC }), d2 = mk(dr, 'circle', { r: 12, fill: XC });
const d1L = txt(dr, 0, 0, '', { 'font-size': 24, fill: XC, 'font-weight': 600, 'text-anchor': 'middle' }), d2L = txt(dr, 0, 0, '', { 'font-size': 24, fill: XC, 'font-weight': 600, 'text-anchor': 'middle' });
const dA2 = PUC.arrow(dr, DC, 8, 22), dA2L = dLab(dr, '', 30);
const dSign = txt(dr, 392, 470, '', { 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 600, 'text-anchor': 'middle', fill: C.ink });
const tFlip = wt('D4', 'Minus') - 0.1;

$('#stF').innerHTML = K(`\\textcolor{${DC}}{\\Delta x} = \\textcolor{${XC}}{x_2} - \\textcolor{${XC}}{x_1}`);
/* ---------- K: side by side + think ---------- */
const sideLine = (svg, from, to) => {
  const X = axis(svg, { y: 250, x0: 92, sc: 3, m0: 0, m1: 200, step: 10, lab: 5 });
  attr(place(svg, 'home', 'HOME', C.ac), 'transform', `translate(${X(0)},250)`); attr(place(svg, 'shop', 'SHOP'), 'transform', `translate(${X(200)},250)`);
  const a = PUC.arrow(svg, DC, 8, 22); return u => a.set(X(from), 128, X(from) + (X(to) - X(from)) * u, 128);
};
const kA1 = sideLine($('#klS'), 0, 200), kA2 = sideLine($('#krS'), 200, 0);
$('#klF').innerHTML = K(`\\textcolor{${DC}}{\\Delta x} = 200 - 0 = \\textcolor{${DC}}{+200\\,\\text{m}}`);
$('#krF').innerHTML = K(`\\textcolor{${DC}}{\\Delta x} = 0 - 200 = \\textcolor{${DC}}{-200\\,\\text{m}}`);
const th1 = PUC.think($('#th1'), { q: 'Shop (+200 m) to tea stall (-100 m): what is the displacement?', opts: ['+300 m', '-300 m'], right: 1, why: 'Δx = -100 - 200 = -300 m. He moved the negative way, so the sign is minus.' });

/* ---------- O: move the origin ---------- */
const th2 = PUC.think($('#th2'), { q: 'Move the origin to the shop. Does the home-to-shop displacement change?', opts: ['It changes', 'No change'], right: 1, why: 'Both positions shift by the same 200 m, so their difference stays +200 m.' });
const ol = $('#olS');
const OA = axis(ol, { y: 210, x0: 92, sc: 3, m0: 0, m1: 200, step: 10, lab: 5, unit: 'origin at home' });
const OB = axis(ol, { y: 430, x0: 692, sc: 3, m0: -200, m1: 0, step: 10, lab: 5, unit: 'origin at the shop' });
[[OA, 210, 0, 200, C.ac, XC], [OB, 430, -200, 0, XC, C.ac]].forEach(([X, y, h, sh, hc, sc]) => { attr(place(ol, 'home', 'HOME', hc), 'transform', `translate(${X(h)},${y})`); attr(place(ol, 'shop', 'SHOP', sc), 'transform', `translate(${X(sh)},${y})`); });
const oA1 = PUC.arrow(ol, DC, 8, 22), oA2 = PUC.arrow(ol, DC, 8, 22);
const ORS = [['home', 'Home', '0 &rarr; -200', XC], ['store', 'Shop', '200 &rarr; 0', XC], ['arrowR', 'Δx = x₂ - x₁', '+200 &rarr; +200', DC]];
$('#ors').innerHTML = ORS.map(([ic, n, v, col], i) => `<div class="fr" id="or${i}" style="top:${84 + i * 116}px"><i>${M.icon(ic, 30, col, 2.2)}</i><div class="fn">${n}</div><div class="fv" style="color:${col};font-size:34px;top:26px">${v}</div></div>`).join('') +
  `<div class="fx" id="orF" style="top:440px;font-size:40px">${K(`\\textcolor{${DC}}{\\Delta x} = 0 - (-200) = \\textcolor{${DC}}{+200\\,\\text{m}}`)}</div>`;

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${DC}}{\\Delta x} = \\textcolor{${XC}}{x_2} - \\textcolor{${XC}}{x_1}`)],
  [K(`\\textcolor{${XC}}{x_1} = 12\\,\\text{m},\\;\\; \\textcolor{${XC}}{x_2} = 30\\,\\text{m}`)],
  [K(`\\textcolor{${DC}}{\\Delta x} = 30 - 12 = \\textcolor{${DC}}{+18\\,\\text{m}}`)],
  [K(`\\textcolor{${PC}}{\\text{path}} = 35 + 17 = \\textcolor{${PC}}{52\\,\\text{m}}`)]], { label: 'WORKED EXAMPLE', y0: 228, dy: 88 });
const tW = [wt('W3', 'Use'), wt('W4', 'twelve'), wt('W5', 'So'), wt('W6', 'Fifty')];
const wr = $('#wrS'), WY = 300;
const WX = axis(wr, { y: WY, x0: 80, sc: 12, m0: 0, m1: 55, step: 1, lab: 10, unit: 'x (m) from the stairs' });
const wMarks = [[0, 'STAIRS'], [47, 'LIBRARY'], [30, 'COOLER']].map(([m, l]) => { const g = mk(wr, 'g', {}); mk(g, 'line', { x1: WX(m), y1: WY - 70, x2: WX(m), y2: WY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' }); txt(g, WX(m), WY - 80, l, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 }); return g; });
const wGh = [0, 1, 2].map(() => mk(wr, 'circle', { r: 13, fill: XC, opacity: 0 })), wDot = mk(wr, 'circle', { r: 14, fill: XC });
const wStart = mk(wr, 'circle', { cx: WX(12), cy: WY, r: 8, fill: '#fff', stroke: XC, 'stroke-width': 3 });
const wPath = mk(wr, 'path', { fill: 'none', stroke: PC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const wA = PUC.arrow(wr, DC, 8, 22), wAL = dLab(wr, 'Δx = +18 m', 26);
const wPL = txt(wr, 392, 520, '', { 'text-anchor': 'middle', 'font-size': 24, fill: PC, 'font-weight': 600 });
const tWa = wt('W2', 'starts'), tWb = wt('W2', 'library') + 0.3, tWc = wt('W2', 'then') + 0.2, tWd = wt('W2', 'cooler') + 0.3;
const wPos = lin([[tWa, 12], [tWb, 47], [tWc, 47], [tWd, 30]]);
const wPathLen = t => { const x = wPos(t); return t < tWc ? x - 12 : 35 + (47 - x); };

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Δx = bigger minus smaller (always +)', right: 'Δx = final minus initial (keep the sign)' });
const tp = $('#tpS');
const TX = axis(tp, { y: 180, x0: 60, sc: 2.2, m0: 0, m1: 200, step: 10, lab: 10, unit: '', xe: 530 });
const tpA = PUC.arrow(tp, DC, 8, 20), tpL = dLab(tp, 'Δx = 0 - 200 = -200 m', 26);
const tpD = [mk(tp, 'circle', { cx: TX(200), cy: 180, r: 10, fill: XC }), mk(tp, 'circle', { cx: TX(0), cy: 180, r: 10, fill: XC })];
const where = PUC.where($('#wa'), { on: [], type: 'Short displacement questions, with the path length placed in the options as a trap' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A particle moves along x with <span style="white-space:nowrap">${K('x = 3t^2 - 12t + 5')}</span> (x in m, t in s). Its displacement from ${K('t = 1\\,\\text{s}')} to ${K('t = 4\\,\\text{s}')} is:`,
  opts: [K('+15\\,\\text{m}'), K('-9\\,\\text{m}'), K('+9\\,\\text{m}'), K('+5\\,\\text{m}')], right: 2, optY: 320 });
const so = PUC.solution($('#so'), [[K('x(1) = 3 - 12 + 5 = -4\\,\\text{m}')], [K('x(4) = 48 - 48 + 5 = 5\\,\\text{m}')], [K(`\\textcolor{${DC}}{\\Delta x} = 5 - (-4) = \\textcolor{${DC}}{+9\\,\\text{m}}`)], [`<span style="color:${PC}">path = 15 m (turns at 2 s)</span>`]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'At'), wt('A2', 'At', 1), wt('A3', 'Delta'), wt('A3', 'Fifteen')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · position and displacement', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${DC}}{\\Delta x} = \\textcolor{${XC}}{x_2} - \\textcolor{${XC}}{x_1}`),
    '<b>Position x</b>: distance from the origin, with a sign', '<b>Displacement</b>: only the start and the end matter', '<b>Sign = direction</b> · same start and end: Δx = 0'] });
const YQ = ['Aarav rides to the shop and back. What is his displacement?', 'What does a minus sign in a displacement tell you?', 'If you move the origin, does the displacement change? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 20', topic: 'One lap, displacement zero? Distance and Displacement', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSl0 - 0.3, 1.05, 960, 540], [tSl1 + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hk'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hq'), t, tH4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#qr0'), t, wt('H4', 'rolled') - 0.1, 1e9, { dy: 16 }); M.vis($('#qr1'), t, wt('H4', 'displacement') - 0.1, 1e9, { dy: 16 });
    M.vis($('#hqP'), t, wt('H5', 'true') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    op(pHome, fade(t, wt('P2', 'origin') - 0.1)); op(pShop, fade(t, wt('P2', 'shop') - 0.1)); op(pStall, fade(t, wt('P4', 'tea') - 0.1));
    const u = M.io((t - wt('P2', 'positive') + 0.1) / 0.5); pDir.set(PX(0) + 10, 170, PX(0) + 10 + 300 * u, 170); attr(pDirL, 'x', PX(0) + 160); attr(pDirL, 'y', 156); op(pDirL, u);
    op(pBs.g, fade(t, wt('P4', 'shop') - 0.1)); op(pBt.g, fade(t, wt('P4', 'minus') - 0.1));
    M.vis($('#pr'), t, wt('P3', 'Position') - 0.2, out, { dx: 60, dy: 0, ...o });
    [wt('P3', 'origin'), wt('P4', 'shop'), wt('P4', 'tea')].forEach((tt, i) => M.vis($('#fr' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    M.vis($('#prP'), t, wt('P4', 'minus') + 0.6, 1e9, POP);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('L1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const ta = tau(t), x = xOf(ta), back = ta > 40.01 || (t > tTurn && ta >= 40), path = 5 * ta, f = back ? -1 : 1;
    const bxp = SX(x) - (back ? -26 : 26) * 0.8;
    at(bk, bxp, SY - 66, f);
    ghosts.forEach((g, k) => { const tg = tau(t - 0.3 * (k + 1)), xg = xOf(tg), d = Math.abs(x - xg); at(g, SX(xg) - (tg > 40 ? -26 : 26) * 0.8, SY - 66, tg > 40 ? -1 : 1); op(g, d > 1 && d < 60 ? [0.3, 0.2, 0.12][k] : 0); });
    const dOn = fade(t, wt('S3', 'violet') - 0.1);
    if (dOn > 0 && x > 0.5) { dA.set(SX(0), SY - 160, SX(0) + (SX(x) - SX(0)) * dOn, SY - 160); } else dA.set(0, 0, 0, 0);
    attr(dAL, 'x', ((SX(0) + SX(x)) / 2).toFixed(1)); attr(dAL, 'y', SY - 178); op(dAL, dOn * (x > 12 ? 1 : 0));
    // slow-mo: tag, velocity vector grows
    M.vis(tagR, t, tSl0 - 0.1, tSl1 + 0.2, POP);
    const vg = M.io((t - tSl0 - 0.2) / 0.6) * (1 - fade(t, tSl1 + 0.2));
    if (vg > 0.01) vA.set(SX(x) - 40, SY - 120, SX(x) - 40 - 90 * vg, SY - 120); else vA.set(0, 0, 0, 0);
    attr(vAL, 'x', (SX(x) - 85).toFixed(1)); attr(vAL, 'y', SY - 132); op(vAL, vg);
    op(pathT, fade(t, tGo - 0.2)); op(pathM, fade(t, tGo - 0.2)); op(pathBg, fade(t, tGo - 0.2)); attr(pathBar, 'width', (712 * path / 400).toFixed(1)); M.hide(pathBar, path < 0.5);
    M.setT(pathM, `${Math.round(path)} / 400 m`);
    M.setT($('#rot'), ta.toFixed(0)); M.setT($('#rox'), x.toFixed(0)); M.setT($('#rod'), (x > 0.5 ? '+' : '') + x.toFixed(0)); M.setT($('#rop'), path.toFixed(0));
    cv(s2 => [s2, xOf(s2)], 0, ta); gd(ta, x, t > tGo - 0.3);
    const gu = fade(t, wt('S3', 'violet') - 0.1); if (gu > 0 && x > 4) gdA.set(G.X(ta), G.Y(0), G.X(ta), G.Y(x)); else gdA.set(0, 0, 0, 0);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { M.vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dy: 16 }); if (i < 2) M.vis($('#ld' + i), t, tLk[i + 1] - 0.3, 1e9, { dy: -10 }); });
    M.vis($('#lkP'), t, tLk[3] - 0.1, 1e9, POP);
    M.vis($('#lr'), t, wt('L2', 'start') - 0.3, out, { dx: 60, dy: 0, ...o });
    const t3 = T0('L3') - 0.1; roads.forEach((r, i) => M.draw(r, t, t3 + i * 0.5, 0.7));
    const la = M.io((t - wt('L2', 'end') + 0.1) / 0.5); lA.set(A[0], A[1], A[0] + (B[0] - A[0] - 14) * la, B[1]); attr(lAL, 'x', 390); attr(lAL, 'y', 140); op(lAL, la);
    M.vis($('#lrP'), t, T1('L3') - 0.1, 1e9, POP);
    avA(t, wt('L4', 'zero') + 0.4, out);
  }

  /* D */
  const dOn2 = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn2);
  if (dOn2) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] - 0.2, 1e9, { dx: 60, dy: 0 });
    op(dGh, fade(t, tStep[0] + 0.3));
    const fl = M.io((t - tFlip) / 0.8), x1 = M.lerp(50, 170, fl), x2 = M.lerp(170, 50, fl);
    [[d1, d1L, x1, 'x₁', wt('D2', 'start')], [d2, d2L, x2, 'x₂', wt('D2', 'end')]].forEach(([c, l, xv, nm, tt]) => { attr(c, 'cx', DX(xv).toFixed(1)); attr(c, 'cy', DY); op(c, fade(t, tt - 0.1)); attr(l, 'x', DX(xv).toFixed(1)); attr(l, 'y', DY - 30); M.setT(l, `${nm} = ${Math.round(xv)}`); op(l, fade(t, tt)); });
    const au = M.io((t - wt('D3', 'Delta') + 0.1) / 0.6) * (fl > 0 && fl < 1 ? 0 : 1);
    if (au > 0) dA2.set(DX(x1), DY - 110, DX(x1) + (DX(x2) - DX(x1)) * au, DY - 110); else dA2.set(0, 0, 0, 0);
    const dv = Math.round(x2 - x1); M.setT(dA2L, `Δx = ${dv > 0 ? '+' : ''}${dv} m`); attr(dA2L, 'x', DX((x1 + x2) / 2).toFixed(1)); attr(dA2L, 'y', DY - 130); op(dA2L, au);
    M.setT(dSign, fl < 0.5 ? '+ : moved the positive way' : '- : moved the negative way'); attr(dSign, 'fill', fl < 0.5 ? C.ok : C.red); op(dSign, fade(t, wt('D4', 'Plus') - 0.1) * (fl > 0.05 && fl < 0.95 ? 0 : 1));
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Displacement') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tO1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kA1(M.io((t - wt('K1', 'Home')) / 0.8)); PUC.write($('#klF'), t, wt('K1', 'Delta') - 0.2, 0.8); M.vis($('#klP'), t, wt('K1', 'plus') + 0.4, 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kA2(M.io((t - wt('K2', 'Shop')) / 0.8)); PUC.write($('#krF'), t, wt('K2', 'Delta') - 0.2, 0.8); M.vis($('#krP'), t, wt('K2', 'Same') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('O1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Plus') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Minus', 1) });
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tW1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('W1');
    M.vis($('#th2'), t, tO1 + 0.05, T0('O3') + 1.6, { dy: 36, ...o });
    th2(t, { tin: tO1 + 0.05, tOpts: wt('O2', 'Does') - 0.1, tCount: T1('O2') + 0.05, dur: 3, tAns: T0('O3') - 0.02, tWhy: T0('O3') + 0.3 });
    const tR = T0('O3') + 1.9;
    M.vis($('#ol'), t, tR, out, { dx: -60, dy: 0, ...o }); M.vis($('#or'), t, tR + 0.15, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - tR - 0.4) / 0.6), u2 = M.io((t - wt('O4', 'Zero') + 0.1) / 0.6);
    oA1.set(OA(0), 104, OA(0) + (OA(200) - OA(0)) * u1, 104); oA2.set(OB(-200), 324, OB(-200) + (OB(0) - OB(-200)) * u2, 324);
    [wt('O3', 'home') + 0.2, wt('O3', 'shop') + 0.2, wt('O4', 'still')].forEach((tt, i) => M.vis($('#or' + i), t, Math.max(tR + 0.3, tt - 0.1), 1e9, { dy: 16 }));
    PUC.write($('#orF'), t, wt('O4', 'Zero'), 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const x = wPos(t), pl2 = wPathLen(t);
    attr(wDot, 'cx', WX(x).toFixed(1)); attr(wDot, 'cy', WY); op(wDot, fade(t, tWa - 0.2));
    wGh.forEach((g, k) => { const xg = wPos(t - 0.25 * (k + 1)); attr(g, 'cx', WX(xg).toFixed(1)); attr(g, 'cy', WY); op(g, Math.abs(x - xg) > 0.3 ? [0.3, 0.2, 0.12][k] : 0); });
    op(wStart, fade(t, tWa));
    const yo = WY + 100, yb = WY + 130;
    attr(wPath, 'd', t < tWa ? '' : (t < tWc ? `M${WX(12)},${yo} H${WX(x)}` : `M${WX(12)},${yo} H${WX(47)} V${yb} H${WX(x)}`));
    M.setT(wPL, `path walked: ${Math.round(pl2)} m`); op(wPL, fade(t, tWa));
    const au = M.io((t - wt('W5', 'thirty') + 0.1) / 0.6); if (au > 0) wA.set(WX(12), WY - 130, WX(12) + (WX(30) - WX(12)) * au, WY - 130); else wA.set(0, 0, 0, 0);
    attr(wAL, 'x', WX(21)); attr(wAL, 'y', WY - 150); op(wAL, au);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'bigger') - 0.1, tStrike: wt('X3', 'always') - 0.1, tRight: wt('X3', 'final') + 0.2 });
    const u = M.io((t - wt('X3', 'From') + 0.05) / 0.6); tpD.forEach(c => op(c, fade(t, wt('X3', 'From') - 0.2)));
    if (u > 0) tpA.set(TX(200), 120, TX(200) + (TX(0) - TX(200)) * u, 120); else tpA.set(0, 0, 0, 0);
    attr(tpL, 'x', TX(100)); attr(tpL, 'y', 92); op(tpL, fade(t, wt('X3', 'minus') - 0.1));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
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
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
