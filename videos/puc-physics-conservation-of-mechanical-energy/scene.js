// PUC Physics Ep 81: Conservation of mechanical energy (Motion notebook, a swing let go at 60 degrees + K, U and E against angle)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, FC = C.orange, EC = C.teal, DC = C.violet, MC = C.ink, TH = C.gold;   // v blue, g red, forces orange, energy teal, height violet, mass ink, theta gold
const KC = mix(EC, '#FFFFFF', 0.42), EC2 = '#0A5F5F';                                             // K: light teal, U: teal, E: deep teal
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const mK = tx(MC, 'm'), gK = tx(GC, 'g'), hK = tx(DC, 'h'), vK = tx(VC, 'v'), KK = tx(EC, 'K'), UK = tx(EC, 'U'), EK = tx(EC, 'E'), WK = tx(EC, 'W');
const G = 9.8, MS = 20, L = 2.5, TH0 = Math.PI / 3, H0 = L * (1 - Math.cos(TH0)), E0 = MS * G * H0;   // 1.25 m, 245 J
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const flab = (p, b, giver, col = FC, fs = 26) => { const a = sym(p, 0, 0, b, '', col, fs); const g = txt(p, 0, 0, giver, { 'font-size': 16, fill: col, 'font-weight': 600 }); return (x, y, op) => { attr(a, 'x', x.toFixed(1)); attr(a, 'y', y.toFixed(1)); attr(g, 'x', x.toFixed(1)); attr(g, 'y', (y + 20).toFixed(1)); a.style.opacity = g.style.opacity = M.clamp(op).toFixed(3); }; };
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const bar = (p, x, y0, w, col) => { const r = mk(p, 'rect', { x, width: w, rx: 5, fill: col }); return h => { h = Math.max(0, h); attr(r, 'height', h.toFixed(1)); attr(r, 'y', (y0 - h).toFixed(1)); }; };
// pendulum, exact: integrate theta'' = -(g/L) sin(theta) from rest at 60 degrees (RK4, 1 ms steps)
const DT = 0.001, TAB = (() => { const n = 12000, a = new Float64Array(n); let th = TH0, w = 0; const f = th => -(G / L) * Math.sin(th);
  for (let i = 0; i < n; i++) { a[i] = th; const k1 = w, l1 = f(th), k2 = w + l1 * DT / 2, l2 = f(th + k1 * DT / 2), k3 = w + l2 * DT / 2, l3 = f(th + k2 * DT / 2), k4 = w + l3 * DT, l4 = f(th + k3 * DT);
    th += DT / 6 * (k1 + 2 * k2 + 2 * k3 + k4); w += DT / 6 * (l1 + 2 * l2 + 2 * l3 + l4); } return a; })();
const thAt = τ => { const i = Math.max(0, Math.min(TAB.length - 2, Math.floor(τ / DT))), u = τ / DT - i; return TAB[i] + (TAB[i + 1] - TAB[i]) * u; };
let TQ = 0; for (let i = 1; i < TAB.length; i++) if (TAB[i] <= 0) { TQ = i * DT; break; }   // quarter period (about 0.85 s)
const hOf = th => L * (1 - Math.cos(th)), vOf = th => Math.sqrt(Math.max(0, 2 * G * (H0 - hOf(th))));

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z'],
  slide: ['M4 4v16', 'M4 6h3', 'M7 6c6 0 6 12 13 12', 'M4 20h16'],
  run: ['M13 4a1.5 1.5 0 1 0 0-.01', 'M7 21l3-6 3 2v4', 'M10 15l1-5 4 2 3-1', 'M8 10l3-1'],
  store: ['M4 20h16', 'M6 20V9l6-5 6 5v11', 'M10 20v-6h4v6'],
  plus: ['M5 12h14', 'M12 5v14'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v6', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4'), tC6 = T0('C6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['ball', 'A ball in a valley', 'DOWN, THEN UP AGAIN', 'ball'], ['slide', 'A child on a slide', 'SPEEDS UP GOING DOWN', 'slide']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${570 + i * 420}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const ROWS = [['ball', 'A ball rolls down', 'AND UP THE OTHER SIDE'], ['slide', 'A child on a slide', 'FASTER AND FASTER'], ['help', 'Speed comes and goes', 'WHERE DOES IT GO?']];
$('#jrs').innerHTML = ROWS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, i === 2 ? EC : C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>${i < 2 ? `<svg width="220" height="120" id="jrS${i}"></svg>` : ''}</div>`).join('');
const tRow = [wt('H1', 'ball'), wt('H1', 'slide'), T0('H2')];
const jr0 = $('#jrS0'), jr1 = $('#jrS1');
const vy = x => 30 + 70 * Math.pow((x - 110) / 90, 2);
let vd = ''; for (let i = 0; i <= 30; i++) { const x = 20 + 180 * i / 30; vd += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (vy(x) + 8).toFixed(1); }
mk(jr0, 'path', { d: vd, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); const jb0 = mk(jr0, 'circle', { r: 8, fill: VC });
mk(jr1, 'path', { d: 'M40,20 C 90 20 110 104 200 104', fill: 'none', stroke: C.ink2, 'stroke-width': 4 }); mk(jr1, 'line', { x1: 40, y1: 20, x2: 40, y2: 112, stroke: C.ink2, 'stroke-width': 3 });
const jsl = mk(jr1, 'path', { d: 'M40,20 C 90 20 110 104 200 104', fill: 'none' }), jb1 = mk(jr1, 'circle', { r: 8, fill: VC });
const TILES = [['hand', 'Pulled back, then let go', C.ac], ['help', 'Nobody pushes it', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'pulls'), wt('H4', 'Nobody')];
const ho = $('#hoS');
mk(ho, 'rect', { x: 0, y: 350, width: 712, height: 40, fill: '#CFE3C0' });
mk(ho, 'path', { d: 'M60,350 L130,40 L200,350 M260,350 L330,40 L400,350', fill: 'none', stroke: '#C2410C', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
mk(ho, 'line', { x1: 120, y1: 44, x2: 340, y2: 44, stroke: '#C2410C', 'stroke-width': 10, 'stroke-linecap': 'round' });
const hoR = [mk(ho, 'line', { stroke: C.ink2, 'stroke-width': 3 }), mk(ho, 'line', { stroke: C.ink2, 'stroke-width': 3 })], hoS = mk(ho, 'rect', { width: 64, height: 12, rx: 3, fill: MC });
const hoKid = mk(ho, 'circle', { r: 16, fill: '#F2B37A', stroke: MC, 'stroke-width': 2 });
const tLetGo = wt('H3', 'lets') + 0.2;

/* ---------- P: a ball in a smooth bowl, two bars trade ---------- */
$('#dr0I').innerHTML = M.icon('run', 32, EC, 2.2); $('#dr1I').innerHTML = M.icon('store', 32, EC, 2.2); $('#dr2I').innerHTML = M.icon('plus', 32, EC, 2.6);
const pt = $('#ptS'), BY = x => 460 - 300 * Math.pow((x - 450) / 280, 2);     // bowl from x 170 to 730
let bd = ''; for (let i = 0; i <= 50; i++) { const x = 170 + 560 * i / 50; bd += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (BY(x) + 14).toFixed(1); }
mk(pt, 'path', { d: bd + ' L730,520 L170,520 Z', fill: '#F4F1EA', stroke: C.ink2, 'stroke-width': 3 });
const pB = mk(pt, 'circle', { r: 14, fill: VC, stroke: MC, 'stroke-width': 2 });
const PBAR = [['K', KC, 50], ['U', EC, 100]].map(([l, c, x]) => { mk(pt, 'rect', { x, y: 200, width: 40, height: 300, rx: 6, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); sym(pt, x + 20, 188, l, '', EC, 24, { 'text-anchor': 'middle' }); return bar(pt, x + 4, 496, 32, c); });
const pE = mk(pt, 'line', { x1: 44, x2: 146, y1: 204, y2: 204, stroke: EC2, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); txt(pt, 98, 540, 'E = K + U', { 'font-size': 15, fill: EC2, 'text-anchor': 'middle', 'font-weight': 600 });
// smooth bowl: x(t) like a pendulum of small amplitude, energy split by height
const pX = t => 450 - 260 * Math.cos(2.2 * Math.max(0, t - T0('P2')));

/* ---------- S: the swing ---------- */
const s = $('#simS'), PVX = 392, PVY = 74, PXM = 150, SL = L * PXM;           // 150 px per metre
mk(s, 'rect', { x: 36, y: 520, width: 712, height: 8, fill: '#CFE3C0' });
mk(s, 'rect', { x: 250, y: 58, width: 284, height: 14, rx: 4, fill: '#C2410C' }); mk(s, 'circle', { cx: PVX, cy: PVY, r: 7, fill: MC });
const yLow = PVY + SL;
mk(s, 'line', { x1: 60, y1: yLow, x2: 724, y2: yLow, stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0.55 }); txt(s, 60, yLow + 26, 'lowest point: U = 0', { 'font-size': 15, fill: DC });
mk(s, 'line', { x1: PVX, y1: PVY, x2: PVX, y2: yLow + 10, stroke: C.dim, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });
const sArc = mk(s, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 }), sArcL = sym(s, 0, 0, 'θ', '', TH, 24);
const sRope = mk(s, 'line', { stroke: C.ink2, 'stroke-width': 3 });
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 24, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const sSeat = mk(s, 'g', {}); mk(sSeat, 'circle', { cx: 0, cy: 0, r: 24, fill: '#F2B37A', stroke: MC, 'stroke-width': 3 }); txt(sSeat, 0, 6, '20 kg', { 'font-size': 14, fill: MC, 'font-weight': 600, 'text-anchor': 'middle' });
const sH = PUC.arrow(s, DC, 4, 12), sHl = sym(s, 0, 0, 'h', '', DC, 24);
const sV = PUC.arrow(s, VC, 6, 17), sVl = sym(s, 0, 0, 'v', '', VC, 26);
const sT = PUC.arrow(s, FC, 6, 17), sTl = flab(s, 'T', 'rope'), sM = PUC.arrow(s, FC, 6, 17), sMl = flab(s, 'mg', 'Earth');
const sBar = [['K', KC, 44], ['U', EC, 94]].map(([l, c, x]) => { mk(s, 'rect', { x, y: 100, width: 36, height: 120, rx: 6, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); sym(s, x + 18, 92, l, '', EC, 22, { 'text-anchor': 'middle' }); return bar(s, x + 4, 216, 28, c); });
mk(s, 'line', { x1: 38, x2: 136, y1: 104, y2: 104, stroke: EC2, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }); txt(s, 146, 110, 'E', { 'font-size': 18, fill: EC2, 'font-weight': 700 });
$('#roA').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r0" style="color:${TH}">60.0</span><span class="u">deg</span>
  <span class="k" style="color:${DC}">h</span><span class="v" id="r1" style="color:${DC}">1.25</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r2" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${EC}">K</span><span class="v" id="r3" style="color:${EC}">0.0</span><span class="u">J · ½mv²</span>
  <span class="k" style="color:${EC}">U</span><span class="v" id="r4" style="color:${EC}">245.0</span><span class="u">J · mgh</span>
  <span class="k" style="color:${EC2}">E</span><span class="v" id="r5" style="color:${EC2}">245.0</span><span class="u">J · K + U</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 120, ymin: 0, ymax: 260, xt: [], yt: [0, 125, 250], xl: 'θ (deg)' });
gr.xlab.setAttribute('y', 78 + 140 + 56); gr.xlab.setAttribute('fill', TH);
[-60, -30, 0, 30, 60].forEach(d => { gr.mk('line', { x1: gr.X(d + 60), y1: 218, x2: gr.X(d + 60), y2: 226, stroke: MC, 'stroke-width': 2 }); const t2 = gr.mk('text', { x: gr.X(d + 60), y: 250, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }); t2.textContent = d; });
txt($('#grS'), 96, 66, 'J', { 'text-anchor': 'end', fill: EC });
const gcU = gr.curve(EC, 4), gcK = gr.curve(KC, 4), gcE = gr.curve(EC2, 3);
const gDU = gr.dot(EC, 9), gDK = gr.dot(KC, 9);
const gLab = [['U', EC], ['K', KC], ['E', EC2]].map(([l, c]) => { const t2 = gr.mk('text', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 20, fill: c }); t2.textContent = l; return t2; });
attr(gLab[0], 'x', gr.X(117)); attr(gLab[0], 'y', gr.Y(240)); attr(gLab[1], 'x', gr.X(57)); attr(gLab[1], 'y', gr.Y(215)); attr(gLab[2], 'x', gr.X(117)); attr(gLab[2], 'y', gr.Y(252) - 6);
attr(gLab[2], 'x', gr.X(104));
// clock: held at 60 degrees until "Let go", then real time; replay at 0.25x into the bottom, freeze, resume
const tGo = wt('S3', 'Let') + 0.1, tRep = T0('S7'), tRepGo = tRep + 0.5, R0 = TQ * 3 - 0.3;      // replay: the third pass through the bottom
const tFreeze = tRepGo + 0.3 / 0.25, tResume = Math.max(wt('S8', 'Only'), tFreeze + 1.6);
const τAt = t => { if (t < tGo) return 0; if (t < tRep) return t - tGo; if (t < tFreeze) return R0 + 0.25 * Math.max(0, t - tRepGo); if (t < tResume) return R0 + 0.3; return R0 + 0.3 + 0.25 * (t - tResume); };

/* ---------- D ---------- */
const STEPS = [[`${WK} = \\Delta ${KK}`, 'work energy theorem'],
  [`${WK} = -\\Delta ${UK}`, 'for a conservative force like gravity'],
  [`\\Delta ${KK} = -\\Delta ${UK}`, 'what K gains, U loses'],
  [`\\Delta ${KK} + \\Delta ${UK} = 0 \\;\\Rightarrow\\; ${KK} + ${UK} = \\text{constant}`, 'E = K + U never changes'],
  [`${KK}_1 + ${UK}_1 = ${KK}_2 + ${UK}_2`, 'between any two points']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'one'), wt('D3', 'two'), wt('D4', 'three'), wt('D5', 'four'), wt('D6', 'five')];
const dr = $('#drS'), DY = x => 140 + 300 * (1 - Math.pow(Math.max(0, Math.min(1, (x - 90) / 420)), 0.9) * 0 ) ;
// a smooth slope from (90, 160) down to (520, 460); point 1 high, point 2 low
const SLx = u => 90 + 430 * u, SLy = u => 160 + 300 * (u * u * (3 - 2 * u));
let sd = ''; for (let i = 0; i <= 40; i++) { const u = i / 40; sd += (i ? 'L' : 'M') + SLx(u).toFixed(1) + ',' + (SLy(u) + 14).toFixed(1); }
mk(dr, 'path', { d: sd + ' L520,520 L90,520 Z', fill: '#F4F1EA', stroke: C.ink2, 'stroke-width': 3 });
const dB = mk(dr, 'circle', { r: 14, fill: VC, stroke: MC, 'stroke-width': 2 });
const DBAR = [['K', KC, 580], ['U', EC, 650]].map(([l, c, x]) => { mk(dr, 'rect', { x, y: 160, width: 44, height: 320, rx: 6, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); sym(dr, x + 22, 148, l, '', EC, 26, { 'text-anchor': 'middle' }); return bar(dr, x + 4, 476, 36, c); });
mk(dr, 'line', { x1: 572, x2: 704, y1: 164, y2: 164, stroke: EC2, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); txt(dr, 638, 512, 'E stays', { 'font-size': 17, fill: EC2, 'font-weight': 600, 'text-anchor': 'middle' });
const dNote = txt(dr, 300, 556, '', { 'font-size': 21, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });

$('#stF').innerHTML = K(`${KK}_1 + ${UK}_1 = ${KK}_2 + ${UK}_2`);

/* ---------- R ---------- */
const rl = $('#rlS'), RPX = 140, RPV = [392, 70], RL = L * RPX;
mk(rl, 'rect', { x: 250, y: 56, width: 284, height: 14, rx: 4, fill: '#C2410C' });
const rTop = [RPV[0] - RL * Math.sin(TH0), RPV[1] + RL * Math.cos(TH0)], rBot = [RPV[0], RPV[1] + RL];
mk(rl, 'line', { x1: RPV[0], y1: RPV[1], x2: rTop[0], y2: rTop[1], stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); mk(rl, 'line', { x1: RPV[0], y1: RPV[1], x2: rBot[0], y2: rBot[1], stroke: C.ink2, 'stroke-width': 3 });
mk(rl, 'circle', { cx: rTop[0], cy: rTop[1], r: 22, fill: '#fff', stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }); mk(rl, 'circle', { cx: rBot[0], cy: rBot[1], r: 22, fill: '#F2B37A', stroke: MC, 'stroke-width': 2.5 });
mk(rl, 'line', { x1: 60, y1: rBot[1], x2: 724, y2: rBot[1], stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0.6 }); mk(rl, 'line', { x1: 60, y1: rTop[1], x2: rTop[0], y2: rTop[1], stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0.6 });
const rH = PUC.arrow(rl, DC, 4, 12); const rHl = txt(rl, 312, (rTop[1] + rBot[1]) / 2 + 6, 'h = 1.25 m', { 'font-size': 18, fill: DC, 'font-weight': 600 });
const rLt = txt(rl, rTop[0] - 30, rTop[1] + 60, 'TOP: at rest, all U', { 'font-size': 18, fill: EC, 'font-weight': 600 }), rLb = txt(rl, rBot[0] + 36, rBot[1] + 8, 'BOTTOM: all K', { 'font-size': 18, fill: EC, 'font-weight': 600 });
const rV = PUC.arrow(rl, VC, 6, 17), rVl = sym(rl, rBot[0] + 70, rBot[1] + 60, 'v', '', VC, 26);
const LK = [[`Top: at rest, all <span class="ee">U</span> = <i>mgh</i>`], [`Bottom: <i>h</i> = 0, all <span class="ee">K</span> = ½<i>mv</i>²`], [`½<s id="mx1">m</s><i>v</i>² = <s id="mx2">m</s><i>gh</i>: the mass cancels`], [`<i class="vv">v</i> = √(2 × 9.8 × 1.25) ≈ <b class="vv mono">4.95 m/s</b>`]];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the swing does not care how heavy you are!' });

/* ---------- C ---------- */
const sbs = (p, m, r) => {
  const pv = [200, 20], Ls = 250, top = [pv[0] - Ls * Math.sin(TH0), pv[1] + Ls * Math.cos(TH0)], bot = [pv[0], pv[1] + Ls];
  mk(p, 'line', { x1: 110, y1: 20, x2: 290, y2: 20, stroke: '#C2410C', 'stroke-width': 8, 'stroke-linecap': 'round' });
  mk(p, 'line', { x1: pv[0], y1: pv[1], x2: top[0], y2: top[1], stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 5' }); mk(p, 'circle', { cx: top[0], cy: top[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 4' });
  const rope = mk(p, 'line', { x1: pv[0], y1: pv[1], stroke: C.ink2, 'stroke-width': 3 }), b = mk(p, 'g', {}); mk(b, 'circle', { r, fill: '#F2B37A', stroke: MC, 'stroke-width': 2.5 }); txt(b, 0, 6, `${m} kg`, { 'font-size': 14, fill: MC, 'font-weight': 600, 'text-anchor': 'middle' });
  const KE = m * G * H0, bk = bar(p, 480, 320, 50, KC); mk(p, 'rect', { x: 476, y: 20, width: 58, height: 304, rx: 6, fill: 'none', stroke: C.line, 'stroke-width': 2 });
  const kl = txt(p, 505, 0, `K = ${KE.toFixed(0)} J`, { 'font-size': 18, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' }), vl = txt(p, 620, 180, '', { 'font-size': 22, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
  return { pv, Ls, rope, b, bk, kl, vl, KE };
};
const c0P = sbs($('#c0S'), 20, 22), c1P = sbs($('#c1S'), 60, 30);
$('#c0a').innerHTML = K(`${KK} = 245\\,\\text{J} \\quad ${vK} = 4.95\\,\\text{m/s}`); $('#c1a').innerHTML = K(`${KK} = 735\\,\\text{J} \\quad ${vK} = 4.95\\,\\text{m/s}`);
const th1 = PUC.think($('#th1'), { q: 'Where on the swing is the kinetic energy largest: at the top, or at the bottom?', opts: ['At the top', 'At the bottom'], right: 1,
  why: 'Lowest point: U is smallest, so K = E - U is largest.' });
const th2 = PUC.think($('#th2'), { q: 'A real swing slowly dies down. Is energy being destroyed?', opts: ['Yes', 'No'], right: 1,
  why: 'Drag and hook friction turn it into heat. Total energy stays.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${KK}_1 = \\tfrac12 ${mK}(3)^2,\\quad ${UK}_1 = ${mK}${gK}(10)`)],
  [K(`${UK}_2 = 0,\\quad ${KK}_2 = \\tfrac12 ${mK}${vK}^2`)],
  [K(`4.5 + 98 = \\tfrac12 ${vK}^2`), 'cancel m, g = 9.8'],
  [K(`${vK}^2 = 205 \\;\\Rightarrow\\; ${vK} \\approx ${tx(VC, '14.3\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
const w = $('#wrS'), WG = 470, WPX = 32;           // 32 px per metre: balcony 10 m up at y 150
mk(w, 'rect', { x: 36, y: WG, width: 712, height: 10, fill: '#CFE3C0' });
mk(w, 'rect', { x: 120, y: WG - 10 * WPX, width: 180, height: 10 * WPX, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 });
mk(w, 'rect', { x: 290, y: WG - 10 * WPX - 8, width: 90, height: 10, fill: MC }); [0, 1, 2].forEach(i => mk(w, 'rect', { x: 150, y: WG - 10 * WPX + 30 + i * 100, width: 60, height: 50, fill: '#BFD6F6', stroke: MC, 'stroke-width': 2 }));
const wBx = 360, wTop = WG - 10 * WPX - 22, wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { cx: wBx, r: 12, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const wB = mk(w, 'circle', { cx: wBx, r: 12, fill: VC, stroke: MC, 'stroke-width': 2 }), wV = PUC.arrow(w, VC, 6, 17), wVl = txt(w, 0, 0, '', { 'font-size': 18, fill: VC, 'font-weight': 600 });
const wH = PUC.arrow(w, DC, 4, 12); txt(w, 470, (WG + wTop) / 2, '10 m', { 'font-size': 20, fill: DC, 'font-weight': 600 });
const tDrop = T0('W3') - 0.2, WSL = 0.35;      // the 1.15 s fall shown at 0.35x, looping until W6
const wY = τ => { const d = 3 * τ + 0.5 * G * τ * τ; return Math.min(10, d); };
const TFALL = (-3 + Math.sqrt(9 + 2 * G * 10)) / G;       // 1.155 s
const tW = [wt('W3', 'top'), wt('W4', 'ground'), wt('W5', 'K'), wt('W6', 'So')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'K + U = constant, even with friction', right: 'With friction: K₁ + U₁ = K₂ + U₂ + heat' });
const tg = $('#tg');
mk(tg, 'path', { d: 'M40,236 L380,236 L40,60 Z', fill: '#F4F1EA', stroke: MC, 'stroke-width': 3, 'stroke-linejoin': 'round' });
for (let k = 0; k < 9; k++) { const u = k / 9; mk(tg, 'line', { x1: 40 + 340 * u, y1: 60 + 176 * u, x2: 40 + 340 * u + 6, y2: 60 + 176 * u + 12, stroke: C.ink2, 'stroke-width': 2 }); }
const tgB = mk(tg, 'g', {}); mk(tgB, 'rect', { x: -20, y: -36, width: 40, height: 36, rx: 4, fill: '#FFF8E7', stroke: MC, 'stroke-width': 2.5 });
const tgHeat = txt(tg, 260, 140, 'heat', { 'font-size': 20, fill: C.red, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Speed at the bottom: swings, slopes, falling bodies, often one step' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A bob on a 1 m string is pulled aside till the string makes 60° with the vertical, and let go (<i>g</i> = 10 m/s², cos 37° = 0.8). Its speed when the string makes 37° with the vertical?', qW: 780,
  opts: [K('\\sqrt{6}\\;\\text{m/s}'), K('\\sqrt{10}\\;\\text{m/s}'), K('2\\sqrt{2}\\;\\text{m/s}'), K('\\sqrt{3}\\;\\text{m/s}')], right: 0, optY: 300, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\Delta ${hK} = L(\\cos 37^\\circ - \\cos 60^\\circ)`)], [K(`\\Delta ${hK} = 1 \\times (0.8 - 0.5) = 0.3\\,\\text{m}`)],
  [K(`\\tfrac12 ${vK}^2 = ${gK}\\,\\Delta ${hK}`)], [K(`${vK}^2 = 2 \\times 10 \\times 0.3 = 6`)], [K(`${vK} = \\sqrt{6} \\approx 2.45\\,\\text{m/s} \\Rightarrow \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'drops'), wt('A2', 'One'), wt('A3', 'Half'), wt('A3', 'So'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · conservation of mechanical energy (NCERT writes U as V)', y0: 92, dy: 80, txt: [0, 1, 1, 1, 1],
  lines: [K(`${EK} = ${KK} + ${UK} \\qquad ${KK}_1 + ${UK}_1 = ${KK}_2 + ${UK}_2 \\qquad ${vK} = \\sqrt{2${gK}${hK}}`),
    '<b>Holds when only conservative forces do work</b> (gravity, spring force)',
    '<b>A rope or a normal force at right angles</b> to the motion does no work',
    '<b>From rest, a drop of <i>h</i></b>: the same speed for any mass',
    '<b>With friction</b>: <i>K</i>₁ + <i>U</i>₁ = <i>K</i>₂ + <i>U</i>₂ + heat'] });
const YQ = ['What are the two parts of mechanical energy?', 'Why do a light child and a heavy adult reach the same speed?', 'When is mechanical energy not conserved?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT', topic: 'Where was the energy hiding? Potential Energy of a Spring', y: 764 });

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
// precomputed graph curves (static once drawn)
const curveU = th => [th + 60, MS * G * hOf(th * Math.PI / 180)], curveK = th => [th + 60, E0 - MS * G * hOf(th * Math.PI / 180)];

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
    ROWS.forEach((_, i) => M.vis($('#jr' + i), t, i < 2 ? tMorph + 0.3 + i * 0.12 : tRow[2] + 0.6, 1e9, { dy: 16 }));
    const u = t - tMorph, x0 = 110 - 82 * Math.cos(3.0 * u); attr(jb0, 'cx', x0.toFixed(1)); attr(jb0, 'cy', (vy(x0) - 1).toFixed(1));
    const k = ((u % 2.2) / 1.4), q = M.clamp(k) * M.clamp(k), Lp = jsl.getTotalLength(), pp = jsl.getPointAtLength(Lp * q); attr(jb1, 'cx', pp.x.toFixed(1)); attr(jb1, 'cy', (pp.y - 8).toFixed(1));
    M.vis($('#hjP'), t, T0('H2') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#house'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#diyaC'), t, tH3 + 0.4, 1e9, { dy: 30, sp: M.SOFT });
    // the swing: held back, then a real pendulum (2.6 m rope drawn at 100 px per metre, small damping ignored)
    const th = t < tLetGo ? TH0 * 0.85 * M.clamp((t - tH3) / 0.8) : thAt(Math.max(0, t - tLetGo)) * 0.85, px = 230, py = 44, Lr = 270;
    const sx = px + Lr * Math.sin(th), sy = py + Lr * Math.cos(th);
    [-24, 24].forEach((d, i) => { attr(hoR[i], 'x1', px + d); attr(hoR[i], 'y1', py); attr(hoR[i], 'x2', (sx + d).toFixed(1)); attr(hoR[i], 'y2', sy.toFixed(1)); });
    attr(hoS, 'x', (sx - 32).toFixed(1)); attr(hoS, 'y', sy.toFixed(1)); attr(hoKid, 'cx', sx.toFixed(1)); attr(hoKid, 'cy', (sy - 18).toFixed(1));
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
    const x = pX(t), y = BY(x), hFrac = (y - 160) / 300 * 0;       // height above the bottom of the bowl (y 460)
    attr(pB, 'cx', x.toFixed(1)); attr(pB, 'cy', y.toFixed(1));
    const U = (460 - y) / (460 - BY(190)), gB = M.o3((t - T0('P2') + 0.2) / 0.4);
    PBAR[1](290 * U * M.o3((t - T0('P3') + 0.2) / 0.4)); PBAR[0](290 * (1 - U) * gB); pE.style.opacity = M.o3((t - T0('P4')) / 0.4).toFixed(3);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const τ = Math.round(τAt(t) * 100) / 100, th = -thAt(τ), h = hOf(th), v = vOf(th), U = MS * G * h, Kk = E0 - U;   // swing starts on the left
    const x = PVX + SL * Math.sin(th), y = PVY + SL * Math.cos(th);
    attr(sRope, 'x1', PVX); attr(sRope, 'y1', PVY); attr(sRope, 'x2', x.toFixed(1)); attr(sRope, 'y2', y.toFixed(1)); at(sSeat, x, y);
    sGh.forEach((g, j) => { const τ2 = Math.round(τAt(t - (t >= tRep ? 0.24 : 0.06) * (j + 1)) * 100) / 100, th2 = -thAt(τ2), x2 = PVX + SL * Math.sin(th2), y2 = PVY + SL * Math.cos(th2);
      attr(g, 'cx', x2.toFixed(1)); attr(g, 'cy', y2.toFixed(1)); M.hide(g, t < tGo || Math.hypot(x2 - x, y2 - y) < 4 || (t >= tRep && t - 0.24 * (j + 1) < tRepGo)); });
    const ra = 70, a0 = Math.PI / 2, a1 = Math.PI / 2 - th; attr(sArc, 'd', Math.abs(th) > 0.03 ? `M${PVX},${PVY + ra} A ${ra} ${ra} 0 0 ${th < 0 ? 1 : 0} ${(PVX + ra * Math.sin(th)).toFixed(1)},${(PVY + ra * Math.cos(th)).toFixed(1)}` : '');
    attr(sArcL, 'x', (PVX + 92 * Math.sin(th / 2) - 8).toFixed(1)); attr(sArcL, 'y', (PVY + 92 * Math.cos(th / 2) + 8).toFixed(1)); sArcL.style.opacity = Math.abs(th) > 0.15 ? '1' : '0';
    if (h > 0.02) { sH.set(x + (th < 0 ? -40 : 40), yLow, x + (th < 0 ? -40 : 40), y); attr(sHl, 'x', (x + (th < 0 ? -66 : 50)).toFixed(1)); attr(sHl, 'y', ((yLow + y) / 2 + 8).toFixed(1)); sHl.style.opacity = '1'; } else { sH.set(0, 0, 0, 0); sHl.style.opacity = '0'; }
    // velocity along the tangent (direction of motion from the table)
    const dir = Math.sign(-thAt(τ + 0.01) + thAt(τ)) || 0, vx = Math.cos(th) * dir, vy2 = -Math.sin(th) * dir;
    if (v > 0.05 && t > tGo) { sV.set(x + vx * 30, y + vy2 * 30, x + vx * (30 + 16 * v), y + vy2 * (30 + 16 * v)); attr(sVl, 'x', (x + vx * (40 + 16 * v) - 6).toFixed(1)); attr(sVl, 'y', (y + vy2 * (40 + 16 * v) + 34).toFixed(1)); sVl.style.opacity = '1'; } else { sV.set(0, 0, 0, 0); sVl.style.opacity = '0'; }
    // slow-mo: tension along the rope (towards the pivot) and the weight down
    const gf = t >= tRep ? M.o3((t - tFreeze + 0.2) / 0.5) : 0;
    if (gf > 0.01) { const ux = (PVX - x) / SL, uy = (PVY - y) / SL; sT.set(x + ux * 26, y + uy * 26, x + ux * (26 + 110 * gf), y + uy * (26 + 110 * gf)); sTl(x + ux * 120 + 14, y + uy * 120, gf); sM.set(x, y + 26, x, y + 26 + 70 * gf); sMl(x + 14, y + 90, gf); } else { sT.set(0, 0, 0, 0); sTl(0, 0, 0); sM.set(0, 0, 0, 0); sMl(0, 0, 0); }
    sBar[0](112 * Kk / E0); sBar[1](112 * U / E0);
    M.setT($('#r0'), f1(Math.abs(th) * 180 / Math.PI)); M.setT($('#r1'), f2(h)); M.setT($('#r2'), f2(v)); M.setT($('#r3'), f1(Kk)); M.setT($('#r4'), f1(U)); M.setT($('#r5'), f1(E0));
    const gd = M.o3((t - tS1 - 0.8) / 1.0), thd = th * 180 / Math.PI;
    gcU(curveU, -60, -60 + 120 * gd, 60); gcK(curveK, -60, -60 + 120 * M.o3((t - tGo) / 1.0), 60); gcE(d => [d + 60, E0], -60, -60 + 120 * M.o3((t - wt('S6', 'flat') + 0.6) / 0.8), 4);
    gDU(thd + 60, U, t > tS1 + 0.6); gDK(thd + 60, Kk, t > tGo);
    gLab[0].style.opacity = gd.toFixed(3); gLab[1].style.opacity = M.o3((t - tGo - 0.8) / 0.3).toFixed(3); gLab[2].style.opacity = M.o3((t - wt('S6', 'flat')) / 0.3).toFixed(3);
    M.vis($('#grP'), t, wt('S6', 'flat') - 0.1, 1e9, POP);
    M.vis($('#slo'), t, tRep - 0.1, out, POP); M.hide($('#pau'), !(t >= tFreeze && t < tResume));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    // the ball slides down and back on a loop; bars trade, E stays
    const u = 0.5 - 0.5 * Math.cos(1.6 * Math.max(0, t - tD1 - 0.6)), x = SLx(u), y = SLy(u), Uf = 1 - (u * u * (3 - 2 * u));
    attr(dB, 'cx', x.toFixed(1)); attr(dB, 'cy', y.toFixed(1)); DBAR[1](312 * Uf); DBAR[0](312 * (1 - Uf));
    const cs = t < tStep[2] ? 0 : t < tStep[3] ? 1 : 2; M.setT(dNote, ['', 'U goes down by exactly what K goes up', 'K + U: the same at every point'][cs]); dNote.style.opacity = cs ? '1' : '0';
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'stays') - 0.2, 0.8);
    M.rise($('#st2'), t, wt('T1', 'K') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5'))) / 0.3))); });
    ['#mx1', '#mx2'].forEach(id => { const e = $(id); e.style.textDecorationColor = C.red; e.style.textDecorationThickness = '3px'; e.style.textDecorationLine = t > wt('R4', 'cancels') ? 'line-through' : 'none'; });
    M.vis($('#rrP'), t, wt('R5', 'About') + 0.4, 1e9, POP);
    const gh = M.o3((t - tLk[0]) / 0.5); if (gh > 0.01) rH.set(300, rBot[1], 300, rBot[1] - (rBot[1] - rTop[1]) * gh); else rH.set(0, 0, 0, 0); rHl.style.opacity = gh.toFixed(3);
    rLt.style.opacity = M.o3((t - tLk[0] - 0.3) / 0.3).toFixed(3); rLb.style.opacity = M.o3((t - tLk[1]) / 0.3).toFixed(3);
    const gv = M.o3((t - tLk[1] - 0.2) / 0.5); if (gv > 0.01) rV.set(rBot[0] + 30, rBot[1] + 34, rBot[0] + 30 + 90 * gv, rBot[1] + 34); else rV.set(0, 0, 0, 0); rVl.style.opacity = gv.toFixed(3);
    avR(t, wt('R5', 'About') + 1.2, out);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    const run = (q, t0) => { const τ = Math.max(0, t - t0) * 0.5, th = -thAt(Math.min(τ, TQ)), x = q.pv[0] + q.Ls * Math.sin(th), y = q.pv[1] + q.Ls * Math.cos(th);
      attr(q.rope, 'x2', x.toFixed(1)); attr(q.rope, 'y2', y.toFixed(1)); at(q.b, x, y);
      const k = (q.KE - MS * 0 - (q.KE * hOf(th) / H0)) ; const hk = 300 * (q.KE / 735) * (1 - hOf(th) / H0); q.bk(hk); attr(q.kl, 'y', (312 - hk).toFixed(1)); q.kl.style.opacity = τ >= TQ ? '1' : '0';
      M.setT(q.vl, `v = ${vOf(th).toFixed(2)} m/s`); q.vl.style.opacity = t > t0 ? '1' : '0'; };
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); run(c0P, T0('C2') + 0.3);
    PUC.write($('#c0a'), t, T0('C3') + 0.2, 0.8);
    M.vis($('#c1'), t, T0('C2') + 1.2, out, { dx: 60, dy: 0, ...o }); run(c1P, T0('C2') + 1.5);
    PUC.write($('#c1a'), t, wt('C3', 'same') - 0.3, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('C6'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'top') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'There') });
    M.vis($('#th2'), t, tC6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC6, tOpts: wt('C6', 'Is'), tCount: T1('C6') + 0.05, dur: 3, tAns: T0('C7') - 0.02, tWhy: wt('C7', 'Air') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const cyc = TFALL / WSL + 1.4, ph = Math.max(0, t - tDrop) % cyc, τ = Math.round(Math.min(TFALL, ph * WSL) * 100) / 100, d = wY(τ), y = wTop + d * WPX, v = 3 + G * τ;
    attr(wB, 'cy', y.toFixed(1)); wGh.forEach((g, j) => { const τ2 = Math.max(0, Math.min(TFALL, (ph - 0.1 * (j + 1)) * WSL)), y2 = wTop + wY(τ2) * WPX; attr(g, 'cy', y2.toFixed(1)); M.hide(g, t < tDrop || Math.abs(y2 - y) < 3); });
    wV.set(wBx - 30, y, wBx - 30, y + 6 * v); attr(wVl, 'x', wBx - 140); attr(wVl, 'y', (y + 3 * v + 6).toFixed(1)); M.setT(wVl, `v = ${v.toFixed(1)}`);
    const gh = M.o3((t - T0('W2') - 0.6) / 0.5); if (gh > 0.01) wH.set(450, WG, 450, WG - (WG - wTop) * gh); else wH.set(0, 0, 0, 0);
    M.vis($('#wc0'), t, tW[3] + 1.0, 1e9, POP); M.vis($('#wc1'), t, wt('W6', 'fourteen') + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Then') - 0.2 });
    const u = M.io((t - wt('X2', 'friction')) / 2.2), bx = 60 + 290 * u, by = 60 + 176 * ((bx - 40) / 340);
    attr(tgB, 'transform', `translate(${bx.toFixed(1)},${(by - 2).toFixed(1)}) rotate(27.4)`);
    tgHeat.style.opacity = M.o3((t - wt('X3', 'heat')) / 0.3).toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'speed') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
