// PUC Physics Ep 79: Gravitational potential energy (Motion notebook, a 2 kg ball lifted by a rope then dropped + U against height)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, FC = C.orange, EC = C.teal, HC = C.violet, MC = C.ink, TH = C.gold;   // v blue, g red, forces orange, U/W teal, height violet, mass ink, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const mK = tx(MC, 'm'), gK = tx(GC, 'g'), hK = tx(HC, 'h'), UK = tx(EC, 'U'), WK = tx(EC, 'W'), FK = tx(FC, 'F');
const G = 9.8;
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
// force label with its giver under it
const flab = (p, b, giver, col = FC, fs = 26) => { const a = sym(p, 0, 0, b, '', col, fs); const g = txt(p, 0, 0, giver, { 'font-size': 16, fill: col, 'font-weight': 600 }); return (x, y, op) => { attr(a, 'x', x.toFixed(1)); attr(a, 'y', y.toFixed(1)); attr(g, 'x', x.toFixed(1)); attr(g, 'y', (y + 20).toFixed(1)); a.style.opacity = g.style.opacity = M.clamp(op).toFixed(3); }; };
const vArrow = (a, l, x, y0, len, dx = 12) => { if (Math.abs(len) < 3) { a.set(0, 0, 0, 0); l.style.opacity = '0'; return; } a.set(x, y0, x, y0 - len); attr(l, 'x', x + dx); attr(l, 'y', (y0 - len * 0.6 + 8).toFixed(1)); l.style.opacity = '1'; };
// a ball with its mass written on it
const ball = (p, r, lab, fill = '#FFFFFF') => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill, stroke: MC, 'stroke-width': 3 }); txt(g, 0, 7, lab, { 'font-size': Math.round(r * 0.66), fill: MC, 'font-weight': 600, 'text-anchor': 'middle' }); return g; };
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

Object.assign(M.IC, {
  coconut: ['M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M9.5 12.5h.01', 'M12 10.5h.01', 'M14.5 12.5h.01', 'M12 6V2'],
  hammer: ['m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9', 'm18 15 4-4', 'm21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'], down: ['M12 5v14', 'm19 12-7 7-7-7'],
  tank: ['M5 3h14v9H5z', 'M12 12v9', 'M8 21h8', 'M5 8h14'],
  tap: ['M3 9h10a4 4 0 0 1 4 4v2', 'M17 19v.01', 'M8 5v4', 'M5 5h6'],
  store: ['M4 20h16', 'M6 20V9l6-5 6 5v11', 'M10 20v-6h4v6'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4'), tC6 = T0('C6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: two things that fall after being lifted ---------- */
const JOBS = [['coconut', 'A coconut falls', 'AND LANDS HARD', 'coconut'], ['hammer', 'A lifted hammer', 'DRIVES A NAIL', 'hammer']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${570 + i * 420}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const ROWS = [['coconut', 'A coconut falls', 'FROM A TALL TREE · LANDS HARD'], ['hammer', 'A lifted hammer', 'COMES DOWN · DRIVES A NAIL'], ['up', 'Both were lifted high first', 'NOBODY PUSHED THEM DOWN']];
$('#jrs').innerHTML = ROWS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, i === 2 ? EC : C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>${i < 2 ? `<svg width="220" height="120" id="jrS${i}"></svg>` : ''}</div>`).join('');
const tRow = [wt('H1', 'coconut'), wt('H1', 'hammer'), T0('H2')];
// row 0: a coconut drops from a palm crown; row 1: a hammer swings down onto a nail
const jr0 = $('#jrS0'), jr1 = $('#jrS1');
mk(jr0, 'path', { d: 'M60 120 C 64 80 58 50 66 24', fill: 'none', stroke: '#8A6A43', 'stroke-width': 7, 'stroke-linecap': 'round' });
['M66 22 q -22 -10 -44 8', 'M66 22 q -14 -18 -34 -14', 'M66 22 q 14 -18 34 -14', 'M66 22 q 22 -10 44 8'].forEach(d => mk(jr0, 'path', { d, fill: 'none', stroke: '#3E9B5F', 'stroke-width': 5, 'stroke-linecap': 'round' }));
mk(jr0, 'rect', { x: 0, y: 108, width: 220, height: 12, fill: '#C9B48A' });
const coco = mk(jr0, 'circle', { r: 9, fill: '#7A5230', stroke: MC, 'stroke-width': 1.5 });
mk(jr1, 'rect', { x: 0, y: 96, width: 220, height: 24, fill: '#C9B48A' }); mk(jr1, 'rect', { x: 140, y: 78, width: 5, height: 20, fill: C.ink2 }); mk(jr1, 'rect', { x: 134, y: 76, width: 17, height: 4, rx: 1, fill: C.ink2 });
const hamG = mk(jr1, 'g', {}), ham = mk(hamG, 'g', {});
mk(ham, 'rect', { x: 0, y: -3, width: 84, height: 7, rx: 3, fill: '#8A6A43' }); mk(ham, 'rect', { x: 78, y: -14, width: 16, height: 26, rx: 3, fill: C.ink });
const TILES = [['tank', 'Tank on the roof, 12 m up', C.ac], ['tap', 'Water gushes out fast', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'tank'), wt('H4', 'gushes')];
// the house: two floors, a rooftop tank, a pipe down to the ground-floor tap
const ho = $('#hoS');
mk(ho, 'rect', { x: 0, y: 350, width: 712, height: 40, fill: '#CFE3C0' });
mk(ho, 'rect', { x: 60, y: 130, width: 280, height: 220, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 });
mk(ho, 'line', { x1: 60, y1: 240, x2: 340, y2: 240, stroke: MC, 'stroke-width': 3 }); mk(ho, 'rect', { x: 48, y: 118, width: 304, height: 14, fill: MC });
[[90, 160], [210, 160], [90, 270]].forEach(([x, y]) => mk(ho, 'rect', { x, y, width: 70, height: 50, fill: '#BFD6F6', stroke: MC, 'stroke-width': 2 }));
mk(ho, 'rect', { x: 200, y: 266, width: 54, height: 84, fill: '#E3C9A1', stroke: MC, 'stroke-width': 2 });
mk(ho, 'rect', { x: 210, y: 48, width: 110, height: 70, rx: 6, fill: '#5B6B8C', stroke: MC, 'stroke-width': 3 }); mk(ho, 'rect', { x: 218, y: 60, width: 94, height: 50, rx: 3, fill: '#7FB2F0' });
txt(ho, 265, 92, 'TANK', { 'font-size': 15, fill: '#fff', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': 1 });
mk(ho, 'path', { d: 'M310 118 V 132 M 350 100 H 320 M 350 100 V 300 H 386', fill: 'none', stroke: C.ink2, 'stroke-width': 7, 'stroke-linejoin': 'round' });
mk(ho, 'rect', { x: 380, y: 292, width: 22, height: 16, rx: 3, fill: C.ink2 });
const hoW = mk(ho, 'path', { d: 'M396 308 C 400 324 404 334 406 350', fill: 'none', stroke: '#2F6FEB', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-dasharray': '10 8' });
mk(ho, 'path', { d: 'M384 336 h 44 l -5 16 h -34 z', fill: '#9AA3B5', stroke: MC, 'stroke-width': 2 });
const hoH = PUC.arrow(ho, HC, 4, 12); const hoHl = txt(ho, 28, 230, '12 m', { 'font-size': 18, fill: HC, 'font-weight': 600, 'text-anchor': 'middle' });
const tTap = wt('H3', 'opens');

/* ---------- P: lift a book, store it, get it back ---------- */
$('#dr0I').innerHTML = M.icon('up', 32, FC, 2.4); $('#dr1I').innerHTML = M.icon('store', 32, EC, 2.2); $('#dr2I').innerHTML = M.icon('down', 32, VC, 2.4);
const pt = $('#ptS'), PFL = 520, PSH = 230;
mk(pt, 'rect', { x: 36, y: PFL, width: 712, height: 6, fill: '#B8BCC6' });
mk(pt, 'rect', { x: 470, y: PSH, width: 240, height: 12, rx: 3, fill: '#8A6A43' }); mk(pt, 'rect', { x: 690, y: PSH, width: 14, height: PFL - PSH, fill: '#A88A63' });
const bkGh = [0.3, 0.2, 0.12].map(op => mk(pt, 'rect', { x: 440, width: 110, height: 30, rx: 4, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const bk = mk(pt, 'g', {}); mk(bk, 'rect', { x: 0, y: 0, width: 110, height: 30, rx: 4, fill: '#2F6FEB', stroke: MC, 'stroke-width': 2.5 }); mk(bk, 'rect', { x: 8, y: 6, width: 94, height: 4, fill: '#fff', opacity: 0.6 });
const pF = PUC.arrow(pt, FC, 6, 17), pFl = flab(pt, 'F', 'your hand'), pV = PUC.arrow(pt, VC, 6, 17), pVl = sym(pt, 0, 0, 'v', '', VC, 26);
const pH = PUC.arrow(pt, HC, 4, 12), pHl = sym(pt, 0, 0, 'h', '', HC, 26);
// two energy bars: U (stored by height) and K (motion), both teal
const BAR = (x, lab) => { mk(pt, 'rect', { x, y: 250, width: 56, height: 260, rx: 8, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); const f = mk(pt, 'rect', { x: x + 4, width: 48, rx: 6, fill: EC }); sym(pt, x + 28, 238, lab, '', EC, 26, { 'text-anchor': 'middle' }); return f; };
const bU = BAR(90, 'U'), bK = BAR(180, 'K'); bK.setAttribute('fill', mix(EC, '#FFFFFF', 0.45));
txt(pt, 168, 548, 'ENERGY', { 'font-size': 15, 'letter-spacing': 1.5, 'text-anchor': 'middle' });
const tLift = T0('P2') + 0.4, tFall = wt('P4', 'fall') - 0.05;
// lifted straight up beside the shelf, slid onto it; for the fall it slides back off the front edge, then drops
const tFall0 = tFall + 0.45;
const bkY = t => { const u = M.io((t - tLift) / 1.8), yUp = PFL - 30 - (PFL - PSH) * u; if (t < tFall0) return yUp; const τ = (t - tFall0) * 0.55, d = 0.5 * G * τ * τ * 105; return Math.min(PSH - 30 + d, PFL - 30); };
const bkX = t => t < tFall - 0.1 ? 330 + 200 * M.io((t - tLift - 1.9) / 0.6) : 530 - 200 * M.io((t - tFall + 0.1) / 0.5);

/* ---------- S: the sim ---------- */
const s = $('#simS'), SG = 520, PXM = 70, BR = 26, BX = 420;     // ground at y 520, 70 px per metre
mk(s, 'rect', { x: 36, y: SG, width: 712, height: 8, fill: '#B8BCC6' });
mk(s, 'line', { x1: 120, y1: SG, x2: 120, y2: SG - 5 * PXM - 10, stroke: HC, 'stroke-width': 3 });
for (let k = 0; k <= 5; k++) { const y = SG - k * PXM; mk(s, 'line', { x1: 108, y1: y, x2: 132, y2: y, stroke: HC, 'stroke-width': 2.5 }); txt(s, 96, y + 6, `${k} m`, { 'font-size': 18, fill: HC, 'font-weight': 600, 'text-anchor': 'end' }); }
mk(s, 'rect', { x: 340, y: 54, width: 160, height: 12, rx: 3, fill: MC }); mk(s, 'circle', { cx: BX, cy: 72, r: 7, fill: C.ink2 });
const sRope = mk(s, 'line', { x1: BX, y1: 72, x2: BX, y2: 72, stroke: C.ink2, 'stroke-width': 3 });
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { cx: BX, r: BR, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const sB = ball(s, BR, '2 kg');
const sF = PUC.arrow(s, FC, 7, 20), sM = PUC.arrow(s, FC, 7, 20), sFl = flab(s, 'F', 'rope'), sMl = flab(s, 'mg', 'Earth');
const sV = PUC.arrow(s, VC, 6, 18), sVl = sym(s, 0, 0, 'v', '', VC, 26);
const sH = PUC.arrow(s, HC, 4, 12), sHl = sym(s, 0, 0, 'h', '', HC, 26);
$('#roG').innerHTML = `<span class="k" style="color:${HC}">h</span><span class="v" id="r0" style="color:${HC}">0.00</span><span class="u">m · height</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r1" style="color:${FC}">0.0</span><span class="u">N · rope pull</span>
  <span class="k" style="color:${EC}">U</span><span class="v" id="r2" style="color:${EC}">0.0</span><span class="u">J · mgh, stored</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r3" style="color:${VC}">0.00</span><span class="u">m/s · speed</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 5, ymin: 0, ymax: 100, xt: [0, 1, 2, 3, 4, 5], yt: [0, 50, 100], xl: 'h (m)' });
gr.xlab.setAttribute('y', 78 + 140 + 56); gr.xlab.setAttribute('fill', HC);
txt($('#grS'), 96, 66, 'U (J)', { 'text-anchor': 'end', fill: EC });
const gCur = gr.curve(EC, 5), gDot = gr.dot(EC, 10);
// clock: the lift is slow and steady (0 -> 1 m on S3, 1 -> 5 m on S4); then a free fall from 5 m; then a 0.25x replay
const MS = 2, H0 = 5, TF = Math.sqrt(2 * H0 / G);                     // TF = 1.010 s
const tUp1 = wt('S3', 'One'), tUp2 = wt('S4', 'Every'), UP2 = Math.max(2.6, wt('S4', 'five') - tUp2 + 0.2);
const hLift = t => t < tUp1 ? 0 : t < tUp1 + 1.4 ? (t - tUp1) / 1.4 : t < tUp2 ? 1 : Math.min(5, 1 + 4 * (t - tUp2) / UP2);
const tDrop = wt('S6', 'go') + 0.15, tRep = T0('S7'), tRepGo = tRep + 0.5, τHalf = Math.sqrt(H0 / G);   // halfway: 0.714 s
const tFreeze = tRepGo + (τHalf - 0.45) / 0.25, tResume = Math.max(wt('S8', 'Gravity'), tFreeze + 1.5);
const τAt = t => { if (t < tDrop) return -1; if (t < tRep) return Math.min(TF, t - tDrop);
  if (t < tFreeze) return Math.min(τHalf, 0.45 + 0.25 * Math.max(0, t - tRepGo)); if (t < tResume) return τHalf; return Math.min(TF, τHalf + 0.25 * (t - tResume)); };
const hOf = τ => Math.max(0, H0 - 0.5 * G * τ * τ);
const ballY = h => SG - BR - h * PXM;

/* ---------- D: the formula ---------- */
const STEPS = [[`${FK} = ${mK}${gK}`, 'lift slowly: no speeding up, so the forces balance'],
  [`${WK} = ${FK}\\,${hK} = ${mK}${gK}${hK}`, 'force and movement both point up'],
  [`${UK} = ${mK}${gK}${hK}`, 'the work is stored (ground taken as zero)'],
  [`\\text{kg} \\cdot \\text{m/s}^2 \\cdot \\text{m} = \\text{N m} = \\text{J}`, 'units: a newton times a metre is a joule'],
  [`${WK}_{\\text{gravity}} = -${mK}${gK}${hK} \\;\\Rightarrow\\; ${UK} = -${WK}_{\\text{gravity}}`, 'U is the work done against gravity']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'one'), wt('D3', 'two'), wt('D4', 'three'), wt('D5', 'four'), wt('D6', 'five')];
const dr = $('#drS'), DBX = 330, DBY = 330;
mk(dr, 'rect', { x: 36, y: 520, width: 712, height: 6, fill: '#B8BCC6' });
const dRope = mk(dr, 'line', { x1: DBX, y1: 70, x2: DBX, y2: DBY - 50, stroke: C.ink2, 'stroke-width': 3 }); mk(dr, 'rect', { x: DBX - 70, y: 58, width: 140, height: 12, rx: 3, fill: MC });
const dGh = mk(dr, 'rect', { x: DBX - 50, y: 420, width: 100, height: 100, rx: 8, fill: 'none', stroke: MC, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.45 });
txt(dr, DBX + 64, 476, 'ground: U = 0', { 'font-size': 17, fill: C.mute });
mk(dr, 'rect', { x: DBX - 50, y: DBY - 50, width: 100, height: 100, rx: 8, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 }); txt(dr, DBX, DBY + 8, 'm', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: MC, 'text-anchor': 'middle' });
const dF = PUC.arrow(dr, FC, 7, 20), dM = PUC.arrow(dr, FC, 7, 20), dFl = flab(dr, 'F', 'rope'), dMl = flab(dr, 'mg', 'Earth');
const dH = PUC.arrow(dr, HC, 5, 14), dHl = sym(dr, 0, 0, 'h', '', HC, 30);
const dNote = [txt(dr, 520, 200, '', { 'font-size': 22, fill: EC, 'font-weight': 600 }), txt(dr, 520, 232, '', { 'font-size': 18, fill: C.mute })];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${UK} = ${mK}${gK}${hK}`);

/* ---------- R: height above what? ---------- */
const rl = $('#rlS'), RY = h => 400 - 24 * h;          // 24 px per metre: tank 12 m at y 112, sump -2 m at y 448
mk(rl, 'rect', { x: 36, y: RY(0), width: 712, height: 60, fill: '#E6DCC8' });
mk(rl, 'rect', { x: 150, y: RY(10), width: 260, height: RY(0) - RY(10), fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 });
mk(rl, 'line', { x1: 150, y1: RY(4), x2: 410, y2: RY(4), stroke: MC, 'stroke-width': 3 }); mk(rl, 'line', { x1: 150, y1: RY(7), x2: 410, y2: RY(7), stroke: MC, 'stroke-width': 1.5, opacity: 0.4 });
mk(rl, 'rect', { x: 140, y: RY(10) - 10, width: 280, height: 10, fill: MC });
mk(rl, 'rect', { x: 300, y: RY(12) - 14, width: 90, height: 48, rx: 5, fill: '#5B6B8C', stroke: MC, 'stroke-width': 2.5 }); mk(rl, 'rect', { x: 306, y: RY(12) - 6, width: 78, height: 34, rx: 3, fill: '#7FB2F0' });
mk(rl, 'rect', { x: 470, y: RY(0) + 4, width: 120, height: RY(-2) - RY(0) + 4, fill: '#7FB2F0', stroke: MC, 'stroke-width': 2.5 }); txt(rl, 530, RY(-2) - 8, 'SUMP', { 'font-size': 15, fill: '#fff', 'font-weight': 600, 'text-anchor': 'middle', 'letter-spacing': 1 });
txt(rl, 160, RY(0) - 12, 'GROUND', { 'font-size': 15, 'letter-spacing': 1 }); txt(rl, 160, RY(4) - 12, 'FIRST FLOOR · 4 m', { 'font-size': 15, 'letter-spacing': 1 });
const RIT = [[345, 12, 'tank'], [530, -2, 'sump']];
const rDot = RIT.map(([x, h]) => mk(rl, 'circle', { cx: x, cy: RY(h) + 10, r: 9, fill: '#2F6FEB', stroke: MC, 'stroke-width': 2 }));
const rZ = mk(rl, 'g', {}); mk(rZ, 'line', { x1: 36, y1: 0, x2: 748, y2: 0, stroke: EC, 'stroke-width': 3, 'stroke-dasharray': '10 8' }); const rZl = txt(rZ, 742, -10, 'U = 0 HERE', { 'font-size': 16, fill: EC, 'font-weight': 600, 'text-anchor': 'end', 'letter-spacing': 1 });
const rH = PUC.arrow(rl, HC, 4, 12), rHl = txt(rl, 0, 0, '', { 'font-size': 18, fill: HC, 'font-weight': 600 });
const rU = RIT.map(() => txt(rl, 0, 0, '', { 'font-size': 22, fill: EC, 'font-weight': 600 }));
const LK = [['Tank: 12 m above the ground'], [`From the ground: <span class="ee">U</span> = 9.8 × 12 ≈ <b class="ee mono">118 J</b>`], [`From the first floor: 9.8 × 8 ≈ <b class="ee mono">78 J</b>`], [`Sump, 2 m below: 9.8 × (-2) ≈ <b class="ee mono">-20 J</b>`]];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const zOf = t => t < tLk[2] ? 0 : t < tLk[3] ? 4 : 0;
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The zero is my choice. The change is not!' });

/* ---------- C: side by side + two thinks ---------- */
const sbs = (p, A, B) => {   // A, B = [mass label, radius, height m]; 100 px per metre, floor at y 320
  mk(p, 'rect', { x: 0, y: 320, width: 712, height: 20, fill: '#E6DCC8' });
  return [A, B].map(([lab, r, h, U], i) => {
    const x = 150 + i * 300, y = 320 - 100 * h;
    mk(p, 'rect', { x: x - 70, y, width: 140, height: 10, rx: 3, fill: '#8A6A43' }); mk(p, 'rect', { x: x - 4, y: y + 10, width: 8, height: 310 - y, fill: '#A88A63' });
    const b = ball(p, r, lab); at(b, x, y - r);
    const hA = PUC.arrow(p, HC, 4, 12); const hl = txt(p, x - 92, (y + 320) / 2 + 6, `${h} m`, { 'font-size': 18, fill: HC, 'font-weight': 600, 'text-anchor': 'end' });
    const bar = mk(p, 'rect', { x: x + 84, width: 34, rx: 5, fill: EC }); const ul = txt(p, x + 101, 0, `${U} J`, { 'font-size': 20, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });
    return { x, y, b, hA, hl, bar, ul, U };
  });
};
const c0P = sbs($('#c0S'), ['2 kg', 26, 1, 19.6], ['2 kg', 26, 2, 39.2]), c1P = sbs($('#c1S'), ['2 kg', 26, 1, 19.6], ['4 kg', 34, 1, 39.2]);
$('#c0a').innerHTML = K(`${hK} \\times 2 \\;\\Rightarrow\\; ${UK} \\times 2`); $('#c1a').innerHTML = K(`${mK} \\times 2 \\;\\Rightarrow\\; ${UK} \\times 2`);
const th1 = PUC.think($('#th1'), { q: 'A 1 kg ball on a 4 m shelf, or a 2 kg ball on a 2 m shelf. Which stores more U?', opts: ['1 kg at 4 m', '2 kg at 2 m', 'The same'], right: 2,
  why: 'm × h = 4 in both, so each stores 9.8 × 4 = 39.2 J.' });
const th2 = PUC.think($('#th2'), { q: 'A satellite is lifted 2000 km above the Earth. Can we still use U = mgh?', opts: ['Yes', 'No'], right: 1,
  why: 'Up there g is only about 5.7 m/s². mgh needs small heights.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${mK} = 500\\,\\text{L} \\times 1\\,\\text{kg/L} = 500\\,\\text{kg}`)],
  [K(`\\Delta ${hK} = 2 + 12 = ${tx(HC, '14\\,\\text{m}')}`)],
  [K(`\\Delta ${UK} = ${mK}${gK}\\,\\Delta ${hK} = 500 \\times 9.8 \\times 14`)],
  [K(`\\Delta ${UK} = ${tx(EC, '68{,}600\\,\\text{J}')} \\approx 68.6\\,\\text{kJ}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
const w = $('#wrS'), WY = h => 380 - 22 * h;          // 22 px per metre: tank at y 116, sump at y 424
mk(w, 'rect', { x: 36, y: WY(0), width: 712, height: 70, fill: '#E6DCC8' });
mk(w, 'rect', { x: 330, y: WY(0), width: 150, height: WY(-2) - WY(0), fill: '#7FB2F0', stroke: MC, 'stroke-width': 2.5 });
mk(w, 'rect', { x: 330, y: WY(12) - 50, width: 150, height: 50, rx: 6, fill: '#5B6B8C', stroke: MC, 'stroke-width': 2.5 });
const wLvl = mk(w, 'rect', { x: 338, width: 134, rx: 3, fill: '#7FB2F0' });
mk(w, 'path', { d: `M 500 ${WY(-1.4)} H 540 V ${WY(12) - 24} H 480`, fill: 'none', stroke: C.ink2, 'stroke-width': 8, 'stroke-linejoin': 'round' });
txt(w, 405, WY(12) - 64, 'TANK · 500 L', { 'font-size': 16, 'font-weight': 600, fill: MC, 'text-anchor': 'middle', 'letter-spacing': 1 });
txt(w, 300, WY(0) - 10, 'GROUND', { 'font-size': 15, 'letter-spacing': 1, 'text-anchor': 'end' });
const wDrop = [0, 1, 2].map(() => mk(w, 'circle', { r: 7, fill: '#2F6FEB' }));
const wB = [[0, -2, '2 m', 600], [0, 12, '12 m', 640], [-2, 12, '14 m', 690]].map(([a, b, l, x]) => ({ a, b, x, ar: PUC.arrow(w, HC, 4, 12), lb: txt(w, x + 10, (WY(a) + WY(b)) / 2 + 6, l, { 'font-size': 18, fill: HC, 'font-weight': 600 }) }));
const tW = [wt('W3', 'One'), wt('W4', 'water'), wt('W5', 'Change'), wt('W6', 'That')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'h = 5 m, the distance along the ramp', right: 'h = 5 sin 30° = 2.5 m. Only the height climbed counts' });
const tg = $('#tg');
mk(tg, 'path', { d: 'M40 236 H 360 V 51 Z', fill: '#F4F1EA', stroke: MC, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(tg, 'path', { d: 'M 100 236 A 60 60 0 0 0 92 206', fill: 'none', stroke: TH, 'stroke-width': 3 }); txt(tg, 112, 226, '30°', { 'font-size': 18, fill: TH, 'font-weight': 600 });
const tgB = mk(tg, 'g', {}); mk(tgB, 'rect', { x: -22, y: -40, width: 44, height: 40, rx: 4, fill: '#FFF8E7', stroke: MC, 'stroke-width': 2.5 });
const tgL = txt(tg, 170, 120, '5 m along', { 'font-size': 18, fill: C.ink2, 'font-weight': 600, transform: 'rotate(-30 170 120)' });
const tgH = PUC.arrow(tg, HC, 5, 14), tgHl = txt(tg, 372, 150, 'h = 2.5 m', { 'font-size': 18, fill: HC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short numericals on the change in U, and one step inside bigger energy problems' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 5 kg box goes from the floor to a shelf 2.5 m high. Take a table top 1 m above the floor as the zero of <i>U</i> (<i>g</i> = 10 m/s²). <i>U</i> on the floor and on the shelf?', qW: 780,
  opts: ['-50 J and +75 J', '0 J and +125 J', '+50 J and +75 J', '-50 J and +125 J'], right: 0, optY: 300, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\text{floor: } ${hK} = -1\\,\\text{m}`)], [K(`${UK} = 5 \\times 10 \\times (-1) = -50\\,\\text{J}`)],
  [K(`\\text{shelf: } ${hK} = +1.5\\,\\text{m}`)], [K(`${UK} = 5 \\times 10 \\times 1.5 = +75\\,\\text{J}`)], [K(`\\Delta ${UK} = 125\\,\\text{J either way} \\Rightarrow \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'floor'), wt('A2', 'Five'), wt('A3', 'shelf'), wt('A3', 'Five'), wt('A4', 'change')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · gravitational potential energy (NCERT writes it as V)', y0: 92, dy: 80, txt: [0, 1, 1, 1, 1],
  lines: [K(`${UK} = ${mK}${gK}${hK} \\qquad \\Delta ${UK} = ${mK}${gK}\\,(${hK}_2 - ${hK}_1) \\qquad 1\\,\\text{J} = 1\\,\\text{kg m}^2/\\text{s}^2`),
    '<b>Lift slowly</b>: the work done against gravity, <i>mgh</i>, is stored as <i>U</i>',
    '<b><i>h</i> = height above the zero you choose</b>. Only the change in <i>U</i> matters',
    '<b>Below the zero</b>, <i>U</i> is negative. On a ramp, <i>h</i> is the height climbed',
    '<b><i>mgh</i> works near the Earth</b>: heights small next to its radius'] });
const YQ = ['Where does the water from a rooftop tank get its energy?', 'How can potential energy be negative?', 'Why can we not use mgh for a satellite, far above the Earth?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT', topic: 'Does gravity care which path? Conservative and Non-Conservative Forces', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (sj.offsetLeft - bp.offsetWidth - 14) + 'px'; bp.style.top = '96px';
}

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  if (!geo) measure();
  M.vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    ROWS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, i < 2 ? tMorph + 0.3 + i * 0.12 : tRow[2] + 0.6, 1e9, { dy: 16 }); });
    const u = t - tMorph;
    { const k = (u % 2.4), τ = Math.min(k, 0.45), y = 34 + 0.5 * G * τ * τ * 70 * 2.4; attr(coco, 'cx', 74); attr(coco, 'cy', Math.min(y, 99).toFixed(1)); }
    { const k = (u % 2.0) / 2.0, a = k < 0.45 ? -95 + 95 * (k / 0.45) * (k / 0.45) : k < 0.7 ? 0 : -95 * M.io((k - 0.7) / 0.3); attr(hamG, 'transform', `translate(40,82) rotate(${a.toFixed(1)})`); }
    M.vis($('#hjP'), t, T0('H2') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#house'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#diyaC'), t, tH3 + 0.4, 1e9, { dy: 30, sp: M.SOFT });
    const on = M.clamp((t - tTap) / 0.3); hoW.style.opacity = on.toFixed(3); hoW.style.strokeDashoffset = (-(t - tTap) * 60).toFixed(1);
    const gh = M.o3((t - tTile[0] + 0.1) / 0.6); if (gh > 0.01) hoH.set(28, 350, 28, 350 - 252 * gh); else hoH.set(0, 0, 0, 0); hoHl.style.opacity = gh.toFixed(3);
    attr(hoHl, 'x', 28); attr(hoHl, 'y', 72);
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr0'), t, T0('P2') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, T0('P3') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr2'), t, T0('P4') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, T0('P5') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const y = bkY(t), x = bkX(t); at(bk, x, y);
    bkGh.forEach((g, k) => { const t2 = t - 0.06 * (k + 1), y2 = bkY(t2), x2 = bkX(t2); attr(g, 'x', x2.toFixed(1)); attr(g, 'y', y2.toFixed(1)); M.hide(g, Math.abs(y2 - y) < 4 || t < tFall0); });
    const lifting = t > tLift - 0.1 && t < tLift + 1.9, gf = M.o3((t - tLift + 0.2) / 0.4) * (1 - M.io((t - tLift - 1.9) / 0.3));
    if (gf > 0.02) pF.set(x - 30, y + 15, x - 30, y + 15 - 80 * gf); else pF.set(0, 0, 0, 0); pFl(x - 20, y - 50, gf);
    const hh = (PFL - 30 - y) / (PFL - PSH);           // 0 on the floor, 1 on the shelf
    const gH = M.o3((t - tLift) / 0.4); if (hh > 0.03 && t < tFall - 0.1) { pH.set(290, PFL, 290, y + 30); attr(pHl, 'x', 254); attr(pHl, 'y', ((PFL + y + 30) / 2 + 8).toFixed(1)); pHl.style.opacity = gH.toFixed(3); } else { pH.set(0, 0, 0, 0); pHl.style.opacity = '0'; }
    const fall = t > tFall0 + 0.05 && y < PFL - 31; const vv = fall ? Math.min(150, (y - (PSH - 30)) * 0.55, PFL - (y + 15) - 6) : 0;
    if (vv > 4) { pV.set(x + 130, y + 15, x + 130, y + 15 + vv); attr(pVl, 'x', x + 144); attr(pVl, 'y', (y + 15 + vv * 0.6).toFixed(1)); pVl.style.opacity = '1'; } else { pV.set(0, 0, 0, 0); pVl.style.opacity = '0'; }
    const uE = M.clamp(hh) * 240, kE = t > tFall0 ? 240 - uE : 0;
    attr(bU, 'height', uE.toFixed(1)); attr(bU, 'y', (506 - uE).toFixed(1)); attr(bK, 'height', Math.max(0, kE).toFixed(1)); attr(bK, 'y', (506 - Math.max(0, kE)).toFixed(1));
    if (y >= PFL - 31 && t > tFall0) { attr(bK, 'height', '0'); }
  }

  /* S: the sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const τ = τAt(t), falling = τ >= 0, τd = falling ? Math.round(τ * 100) / 100 : 0;
    const h = falling ? hOf(τd) : Math.round(hLift(t) * 100) / 100, v = falling ? G * Math.min(τd, TF) : 0, U = MS * G * h, by = ballY(h);
    at(sB, BX, by);
    attr(sRope, 'y2', (falling ? 72 + 18 : by - BR).toFixed(1));
    sGh.forEach((g, k) => { const t2 = falling && t >= tRep ? t - 0.24 * (k + 1) : t - 0.06 * (k + 1), τ2 = τAt(t2), h2 = τ2 >= 0 ? hOf(Math.round(τ2 * 100) / 100) : hLift(t2), y2 = ballY(h2);
      attr(g, 'cy', y2.toFixed(1)); M.hide(g, !falling || τ2 < 0 || Math.abs(y2 - by) < 4 || (t >= tRep && t2 < tRep + 0.05)); });
    const gF = M.o3((t - wt('S2', 'rope') + 0.1) / 0.5), FN = falling ? 0 : MS * G, kF = 3.4;
    if (!falling && gF > 0.01) { sF.set(BX + 40, by, BX + 40, by - FN * kF * gF); sFl(BX + 54, by - FN * kF * 0.7, gF); } else { sF.set(0, 0, 0, 0); sFl(0, 0, 0); }
    const gM = Math.max(gF, falling ? 1 : 0); if (gM > 0.01) { sM.set(BX + 40, by + 2, BX + 40, by + 2 + MS * G * kF * gM); sMl(BX + 54, by + MS * G * kF * 0.7 + 10, gM); } else { sM.set(0, 0, 0, 0); sMl(0, 0, 0); }
    vArrow(sV, sVl, BX - 46, by, -v * 9, -30);
    if (h > 0.05) { sH.set(170, SG, 170, by + BR); attr(sHl, 'x', 182); attr(sHl, 'y', ((SG + by + BR) / 2 + 8).toFixed(1)); sHl.style.opacity = '1'; } else { sH.set(0, 0, 0, 0); sHl.style.opacity = '0'; }
    M.setT($('#r0'), f2(h)); M.setT($('#r1'), f1(FN)); M.setT($('#r2'), f1(U)); M.setT($('#r3'), f2(v));
    // graph: the line grows with the lift; when it falls the dot slides back down the same line
    const hMax = t < tDrop ? hLift(t) : 5; gCur(x => [x, MS * G * x], 0, Math.max(hMax, 0.001), 40); gDot(h, U, t > tS1 + 0.6);
    M.vis($('#grP'), t, wt('S5', 'straight') - 0.1, 1e9, POP);
    M.vis($('#slo'), t, tRep - 0.1, out, POP);
    M.hide($('#pau'), !(t >= tFreeze && t < tResume));
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const g0 = M.o3((t - tStep[0] + 0.1) / 0.5), gh = M.o3((t - tStep[1] + 0.1) / 0.6);
    dF.set(DBX + 70, DBY - 10, DBX + 70, DBY - 10 - 110 * g0); dFl(DBX + 84, DBY - 80, g0);
    dM.set(DBX + 70, DBY + 10, DBX + 70, DBY + 10 + 110 * g0); dMl(DBX + 84, DBY + 90, g0);
    if (gh > 0.01) dH.set(DBX - 110, 520, DBX - 110, 520 - (520 - (DBY + 50)) * gh); else dH.set(0, 0, 0, 0); attr(dHl, 'x', DBX - 150); attr(dHl, 'y', 470); dHl.style.opacity = gh.toFixed(3);
    M.hide(dGh, gh < 0.01);
    const cs = t < tStep[2] ? -1 : t < tStep[3] ? 0 : t < tStep[4] ? 1 : 2;
    M.setT(dNote[0], ['U = mgh stored', 'N × m = J', 'mg down, h up'][Math.max(0, cs)]); M.setT(dNote[1], ['the work waits in the box', 'kg m²/s² = joule', 'gravity does -mgh'][Math.max(0, cs)]);
    const gn = cs < 0 ? 0 : M.o3((t - tStep[cs + 2] - 0.2) / 0.4); dNote[0].style.opacity = dNote[1].style.opacity = gn.toFixed(3);
    dM.g.style.opacity = cs === 2 ? (0.55 + 0.45 * Math.cos((t - tStep[4]) * 6)).toFixed(3) : '1';
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'equals') - 0.1, 0.8);
    M.rise($('#st2'), t, wt('T1', 'height') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* R: height above what? */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('R6'))) / 0.3))); });
    M.vis($('#rrP'), t, T0('R6') + 0.2, 1e9, POP);
    const zy = M.track(RY(0), [[tLk[2], RY(4)], [tLk[3], RY(0)]], M.SOFT)(t), gz = M.o3((t - tLk[1]) / 0.4);
    attr(rZ, 'transform', `translate(0,${zy.toFixed(1)})`); rZ.style.opacity = gz.toFixed(3);
    rDot[0].style.opacity = M.o3((t - tLk[0]) / 0.3).toFixed(3); rDot[1].style.opacity = M.o3((t - tLk[3]) / 0.3).toFixed(3);
    // height arrow from the zero to the tank (links 1-3), then from the zero down to the sump (link 4)
    const z = zOf(t), sump = t >= tLk[3], hT = sump ? -2 : 12, gA = M.o3((t - tLk[0] - 0.2) / 0.5);
    const y0 = RY(z), y1 = RY(hT) + 10, xA = sump ? 620 : 440;
    if (gA > 0.01) rH.set(xA, y0, xA, y0 + (y1 - y0) * gA); else rH.set(0, 0, 0, 0);
    M.setT(rHl, `${hT - z} m`); attr(rHl, 'x', xA + 12); attr(rHl, 'y', ((y0 + y1) / 2 + 6).toFixed(1)); rHl.style.opacity = gA.toFixed(3);
    const uT = t < tLk[1] ? '' : t < tLk[2] ? 'U ≈ 118 J' : 'U ≈ 78 J';
    M.setT(rU[0], uT); attr(rU[0], 'x', 470); attr(rU[0], 'y', RY(12) + 4); rU[0].style.opacity = (t < tLk[3] ? M.o3((t - tLk[1] - 0.4) / 0.3) : 0.35).toFixed(3);
    M.setT(rU[1], 'U ≈ -20 J'); attr(rU[1], 'x', 610); attr(rU[1], 'y', RY(-2) + 40); rU[1].style.opacity = M.o3((t - tLk[3] - 0.5) / 0.3).toFixed(3);
    avR(t, T0('R6') + 0.6, out);
  }

  /* C: side by side + two thinks */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    const run = (P, t0) => P.forEach((q, i) => {
      const g = M.o3((t - t0 - i * 0.9) / 0.5), H = 320 - q.y;
      if (g > 0.01) q.hA.set(q.x - 80, 320, q.x - 80, 320 - H * g); else q.hA.set(0, 0, 0, 0); q.hl.style.opacity = g.toFixed(3);
      const bh = q.U * 3.6 * M.o3((t - t0 - i * 0.9 - 0.3) / 0.5); attr(q.bar, 'height', bh.toFixed(1)); attr(q.bar, 'y', (320 - bh).toFixed(1));
      attr(q.ul, 'y', (312 - q.U * 3.6).toFixed(1)); q.ul.style.opacity = M.o3((t - t0 - i * 0.9 - 0.6) / 0.3).toFixed(3);
    });
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); run(c0P, T0('C2') + 0.2);
    PUC.write($('#c0a'), t, wt('C2', 'doubles') - 0.2, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o }); run(c1P, T0('C3') + 0.2);
    PUC.write($('#c1a'), t, wt('C3', 'doubles') - 0.3, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('C6'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'times') });
    M.vis($('#th2'), t, tC6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC6, tOpts: wt('C6', 'Can'), tCount: T1('C6') + 0.05, dur: 3, tAns: T0('C7') - 0.02, tWhy: wt('C7', 'Up') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    [0, 1, 2].forEach(i => { const g = M.o3((t - (i < 2 ? tW[1] + i * 0.8 : tW[1] + 2.0)) / 0.6), b = wB[i], ya = WY(b.a), yb = WY(b.b);
      if (g > 0.01) b.ar.set(b.x, ya, b.x, ya + (yb - ya) * g); else b.ar.set(0, 0, 0, 0); b.lb.style.opacity = g.toFixed(3); });
    // the pump runs from the first line: drops climb the pipe and the tank fills
    const pump = Math.max(0, t - T0('W2') - 1.0), fill = M.clamp(pump / 14);
    attr(wLvl, 'height', (38 * fill).toFixed(1)); attr(wLvl, 'y', (WY(12) - 6 - 38 * fill).toFixed(1));
    wDrop.forEach((d, i) => { const L = WY(-1.4) - (WY(12) - 24), k = ((pump * 0.5 + i / 3) % 1), on = pump > 0 && fill < 1; const yy = WY(-1.4) - L * k; attr(d, 'cx', 540); attr(d, 'cy', yy.toFixed(1)); M.hide(d, !on); });
    M.vis($('#wc0'), t, tW[3] + 0.6, 1e9, POP); M.vis($('#wc1'), t, tW[3] + 1.2, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Five') - 0.2 });
    const u = M.io((t - wt('X2', 'pushed')) / 1.6), bx = 60 + 280 * u, byy = 236 - 280 * u * Math.tan(Math.PI / 6);
    attr(tgB, 'transform', `translate(${bx.toFixed(1)},${byy.toFixed(1)}) rotate(-30)`);
    tgL.style.opacity = M.o3((t - wt('X2', 'five')) / 0.3).toFixed(3);
    const gh = M.o3((t - wt('X3', 'straight') + 0.1) / 0.5); if (gh > 0.01) tgH.set(372, 236, 372, 236 - 162 * gh); else tgH.set(0, 0, 0, 0); tgHl.style.opacity = gh.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
