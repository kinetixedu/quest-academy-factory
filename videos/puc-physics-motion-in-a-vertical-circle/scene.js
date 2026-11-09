// PUC Physics Ep 83: Motion in a vertical circle (Motion notebook, ball on a string seen from the side + T against angle, bucket of water)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, HC = C.violet, TH = C.gold, MC = C.ink;   // v blue, a red, every force orange, height violet, theta gold, mass ink
const WATER = '#9CC3F5';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vK = tx(VC, 'v'), TK = tx(FC, 'T'), mgK = tx(FC, 'mg'), NK = tx(FC, 'N');
const PI = Math.PI, G = 9.8, deg = r => r * 180 / PI;
// vertical circle, theta measured from the bottom; the ball moves right at the bottom, up the right side, over the top
const VP = (o, R, th) => [o[0] + R * Math.sin(th), o[1] + R * Math.cos(th)];
const VT = th => [Math.cos(th), -Math.sin(th)];      // along the motion
const VI = th => [-Math.sin(th), -Math.cos(th)];     // toward the centre
const DN = [0, 1], UPv = [0, -1];
const ballAt = (el, p) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); };
const along = (a, p, u, L, off = 0, side = 0) => { if (L < 2) { a.set(0, 0, 0, 0); return; } const s = [-u[1] * side, u[0] * side]; a.set(p[0] + u[0] * off + s[0], p[1] + u[1] * off + s[1], p[0] + u[0] * (off + L) + s[0], p[1] + u[1] * (off + L) + s[1]); };
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
const op = (el, v) => { el.style.opacity = M.clamp(v).toFixed(3); };
// a bucket in its own frame: mouth toward the centre (local -y), base outward (local +y)
const bucket = (p, s = 1) => { const g = mk(p, 'g', {}), w1 = 30 * s, w2 = 22 * s, h = 30 * s;
  const wat = mk(g, 'path', { d: `M${-w2 / 2 - 1.5 * s},${h / 2 - 12 * s} L${w2 / 2 + 1.5 * s},${h / 2 - 12 * s} L${w2 / 2},${h / 2} L${-w2 / 2},${h / 2} Z`, fill: WATER });
  mk(g, 'path', { d: `M${-w1 / 2},${-h / 2} L${w1 / 2},${-h / 2} L${w2 / 2},${h / 2} L${-w2 / 2},${h / 2} Z`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 * Math.min(1, s), 'stroke-linejoin': 'round' });
  return { g, wat, h }; };
const placeB = (b, p, th) => attr(b.g, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${(-deg(th)).toFixed(2)})`);

Object.assign(M.IC, {
  loop: ['M12 4a7 7 0 1 1-6.6 4.7', 'M2 20h20', 'M5.4 8.7 3 6.5', 'M5.4 8.7 8.2 7.4'],
  toycar: ['M5 15h14l-1.5-4.5h-11Z', 'M8 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z', 'M16 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z', 'M8 10.5 9.5 7h5l1.5 3.5'],
  bucket: ['M5 7h14l-2 13H7Z', 'M5 7c0-3 14-3 14 0'],
  drop: ['M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z'],
  okc: ['M20 6 9 17l-5-5'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tK2 = T0('K2');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- physics: ball on a 1 m string, m = 0.5 kg, started at the bottom with speed v0 ---------- */
const MASS = 0.5, RM = 1;
const v2At = (v0, th) => v0 * v0 - 2 * G * RM * (1 - Math.cos(th));
const TAt = (v0, th) => MASS * v2At(v0, th) / RM + MASS * G * Math.cos(th);
// integrate theta(t) (real seconds) until the string goes slack or a full turn is done
const run = (v0) => { const dt = 1 / 2000, th = [0]; let a = 0, slack = null;
  while (a < 2 * PI) { if (TAt(v0, a) <= 0) { slack = a; break; } const v = Math.sqrt(Math.max(v2At(v0, a), 0)); a += v / RM * dt; th.push(a); }
  const n = th.length - 1, P = n * dt;
  const f = t => { if (t <= 0) return 0; const x = t / dt, i = Math.floor(x); if (i >= n) return th[n]; return th[i] + (th[i + 1] - th[i]) * (x - i); };
  const inv = (ang) => { let lo = 0, hi = n; while (hi - lo > 1) { const md = (lo + hi) >> 1; if (th[md] < ang) lo = md; else hi = md; } return lo * dt; };
  return { f, P, slack, inv }; };
const R5 = run(5), R7 = run(7);                 // 5 m/s: slack near 100.6 deg ; 7 m/s = root(5 g r): just over the top
const TS = R5.P;                                // real time to the slack point
// after the slack point: free flight inside the circle until the string is tight again (sim units: px)
const S = $('#simS'), O = [392, 280], R = 180, PXM = R / RM;
const FL = (() => { const th = R5.slack, p0 = VP(O, R, th), v = Math.sqrt(v2At(5, th)), u = VT(th), vx = u[0] * v * PXM, vy = u[1] * v * PXM, g = G * PXM;
  let tf = 0.01; while (tf < 2) { const x = p0[0] + vx * tf, y = p0[1] + vy * tf + 0.5 * g * tf * tf; if (Math.hypot(x - O[0], y - O[1]) >= R) break; tf += 0.001; }
  return { th, p0, vx, vy, g, tf, at: t => [p0[0] + vx * t, p0[1] + vy * t + 0.5 * g * t * t], vel: t => Math.hypot(vx, vy + g * t) / PXM }; })();

/* ---------- title card: three loops ---------- */
const JOBS = [['loop', 'Roller coaster', 'LOOPS THE LOOP', 'roller'], ['toycar', 'Toy car', 'LOOPS ITS TRACK', 'toy'], ['bucket', 'Bucket of water', 'SWUNG OVERHEAD', 'bucket']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="200" height="120" id="jrS${i}"></svg></div>`).join('');
const jrD = JOBS.map((j, i) => { const s = $('#jrS' + i), o = [100, 60], r = 40;
  mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: i < 2 ? '#8D99AE' : C.dim, 'stroke-width': i < 2 ? 5 : 2.5, 'stroke-dasharray': i < 2 ? '' : '6 5' });
  if (i < 2) mk(s, 'line', { x1: 20, y1: o[1] + r + 2, x2: 180, y2: o[1] + r + 2, stroke: '#8D99AE', 'stroke-width': 5, 'stroke-linecap': 'round' });
  const ln = i === 2 ? mk(s, 'line', { x1: o[0], y1: o[1], stroke: C.ink, 'stroke-width': 2 }) : null;
  if (i === 2) mk(s, 'circle', { cx: o[0], cy: o[1], r: 5, fill: C.ink });
  const d = i === 2 ? bucket(s, 0.55) : { g: mk(s, 'rect', { x: -9, y: -6, width: 18, height: 12, rx: 3, fill: i ? C.red : C.ac }) };
  return { o, r: i < 2 ? r - 9 : r, d, ln, w: [2.2, 2.8, 2.0][i] }; });
const TILES = [['okc', 'Fast: not a drop falls', C.ok], ['drop', 'Slow: he gets wet', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Fast'), wt('H4', 'Slow')];
// the swing: a bucket on a circle round the shoulder; fast it keeps the water, slow the water spills near the top
const sws = $('#swS'), SWO = [125, 136], SWR = 68;
mk(sws, 'circle', { cx: SWO[0], cy: SWO[1], r: SWR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const swArm = mk(sws, 'line', { x1: SWO[0], y1: SWO[1], stroke: C.ink, 'stroke-width': 2.5 });
mk(sws, 'circle', { cx: SWO[0], cy: SWO[1], r: 6, fill: C.ink });
const swGh = [0.3, 0.2, 0.12].map(o2 => { const b = bucket(sws, 0.8); b.g.setAttribute('opacity', o2); return b; });
const swB = bucket(sws, 0.8);
const swDrops = [0, 1, 2].map(k => mk(sws, 'circle', { r: 4 - k * 0.6, fill: WATER, stroke: '#5E8FD6', 'stroke-width': 1 }));
const SW_SLOW = wt('H4', 'Slow') - 0.2;
const swW = M.keys([[0, 4.2], [SW_SLOW, 1.6]], 0.5, M.io);
const SWI = [0]; { const DT = 1 / 240; for (let t2 = tH3 - 0.2; t2 < tP1 + 0.5; t2 += DT) SWI.push(SWI[SWI.length - 1] + swW(t2) * DT); }
const swTh = t => { const x = (Math.max(t, tH3 - 0.2) - (tH3 - 0.2)) * 240, i = Math.min(Math.floor(x), SWI.length - 1); return 0.4 + SWI[i]; };
// spill: the first time after the slow-down that the bucket passes 117 deg (water leaves where N = 0 for v^2/r < g)
const SPILL = (() => { for (let t2 = SW_SLOW + 0.5; t2 < tP1; t2 += 0.005) { const a = swTh(t2) % (2 * PI); if (a > 2.04 && a < 2.2) return t2; } return 1e9; })();

/* ---------- P: what it is ---------- */
const pa = $('#paS'), PO = [392, 290], PR = 140;
mk(pa, 'circle', { cx: PO[0], cy: PO[1], r: PR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(pa, 'circle', { cx: PO[0], cy: PO[1], r: 7, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const paStr = mk(pa, 'line', { x1: PO[0], y1: PO[1], stroke: C.ink, 'stroke-width': 2.5 });
const paGh = [0.3, 0.2, 0.12].map(o2 => mk(pa, 'circle', { r: 14, fill: MC, opacity: o2 }));
const paB = mk(pa, 'circle', { r: 14, fill: MC }), paV = PUC.arrow(pa, VC, 6, 17), paVl = sym(pa, 0, 0, 'v', '', VC, 28);
const tPrun = tP1 + 0.3, paTh = t => R7.f(((Math.max(0, t - tPrun)) / 2) % R7.P) ;      // 7 m/s loop, shown at 0.5x
const pb = $('#pbS'), QO = [392, 214], QR = 128, QTH = 50 * PI / 180, QB = VP(QO, QR, QTH);
mk(pb, 'circle', { cx: QO[0], cy: QO[1], r: QR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(pb, 'circle', { cx: QO[0], cy: QO[1], r: 7, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
txt(pb, QO[0] - 14, QO[1] - 14, 'centre', { 'font-size': 16, 'text-anchor': 'end' });
mk(pb, 'line', { x1: QO[0], y1: QO[1], x2: QB[0], y2: QB[1], stroke: C.ink, 'stroke-width': 2.5 });
mk(pb, 'circle', { cx: QB[0], cy: QB[1], r: 15, fill: MC });
const pbT = PUC.arrow(pb, FC, 6, 17), pbW = PUC.arrow(pb, FC, 6, 17);
const pbTl = sym(pb, 0, 0, 'T', '', FC, 28), pbWl = sym(pb, 0, 0, 'mg', '', FC, 26);
const pbTw = txt(pb, 0, 0, 'string pull', { 'font-size': 16, fill: FC, 'font-weight': 600 }), pbWw = txt(pb, 0, 0, 'weight', { 'font-size': 16, fill: FC, 'font-weight': 600 });
$('#pbF').innerHTML = '<span style="font:600 32px Poppins">Total pull to the centre</span> &nbsp;' + K(`= \\dfrac{m${vK}^2}{r}`);

/* ---------- S: the sim ---------- */
mk(S, 'circle', { cx: O[0], cy: O[1], r: R, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const thArc = mk(S, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 });
const thL = sym(S, 0, 0, 'θ', '', TH, 24);
mk(S, 'line', { x1: O[0], y1: O[1], x2: O[0], y2: O[1] + R, stroke: C.dim, 'stroke-width': 1.5, 'stroke-dasharray': '3 6' });
const sStr = mk(S, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
mk(S, 'circle', { cx: O[0], cy: O[1], r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
txt(S, 36, 86, 'm = 0.5 kg · r = 1 m', { 'font-size': 18, fill: MC, 'font-weight': 600 });
const slackMk = mk(S, 'g', {}); { const p = VP(O, R, R5.slack); mk(slackMk, 'circle', { cx: p[0], cy: p[1], r: 9, fill: 'none', stroke: AC, 'stroke-width': 3 }); txt(slackMk, p[0] + 18, p[1] - 10, 'T = 0 · slack', { 'font-size': 18, fill: AC, 'font-weight': 600 }); }
const sGh = [0.3, 0.2, 0.12].map(o2 => mk(S, 'circle', { r: 16, fill: MC, opacity: o2 }));
const sBall = mk(S, 'circle', { r: 16, fill: MC });
const sV = PUC.arrow(S, VC, 7, 20), sT = PUC.arrow(S, FC, 7, 20), sW = PUC.arrow(S, FC, 7, 18);
const sVl = sym(S, 0, 0, 'v', '', VC, 30), sTl = sym(S, 0, 0, 'T', '', FC, 30), sWl = sym(S, 0, 0, 'mg', '', FC, 26);
const sT0 = txt(S, 0, 0, 'T = 0', { 'font-size': 22, fill: FC, 'font-weight': 600 });
const VPX = 22, TPX = 5;                            // 22 px per m/s, 5 px per N
$('#roG').innerHTML = `<span class="k" style="color:${TH};font-style:normal">θ</span><span class="v" id="r0" style="color:${TH}">0</span><span class="u">deg · from bottom</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r1" style="color:${VC}">0.00</span><span class="u">m/s · speed</span>
  <span class="k" style="color:${HC}">h</span><span class="v" id="r2" style="color:${HC}">0.00</span><span class="u">m · height</span>
  <span class="k" style="color:${FC}">T</span><span class="v" id="r3" style="color:${FC}">4.90</span><span class="u">N · string pull</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 86, w: 600, h: 134, xmax: 360, ymin: 0, ymax: 30, xt: [0, 90, 180, 270, 360], yt: [0, 10, 20, 30], xl: 'θ (deg)' });
gr.xlab.setAttribute('y', 86 + 134 - 12); txt($('#grS'), 96, 76, 'T (N)', { 'text-anchor': 'end' });
const gC5 = gr.curve(M.mix(FC, '#FFFFFF', 0.45), 4), gC7 = gr.curve(FC, 5), gDot = gr.dot(FC, 10);
const gL1 = txt($('#grS'), 0, 0, '29.4 N', { 'font-size': 20, fill: FC, 'font-weight': 600 }), gL2 = txt($('#grS'), 0, 0, '0 at the top', { 'font-size': 20, fill: FC, 'font-weight': 600, 'text-anchor': 'middle' });
at(gL1, gr.X(30), gr.Y(29.4) + 2); at(gL2, gr.X(186), gr.Y(0) - 14); gL2.setAttribute('text-anchor', 'start');
const gSl = txt($('#grS'), gr.X(deg(R5.slack)) + 8, gr.Y(0) - 6, 'slack', { 'font-size': 18, fill: AC, 'font-weight': 600 });
// timeline: run A (5 m/s) on "Start", run B (5 m/s) timed so the slack falls on "zero", run C (7 m/s) on "seven", loops at 0.5x
const tLA = wt('S2', 'Start') + 0.2, tLB = wt('S3', 'zero') - 2 * TS, tLC = wt('S4', 'seven') + 0.3;
const tSlo = wt('S6', 'Slow'), tRes = tSlo + 0.6, TOPR = R7.inv(PI), T140 = R7.inv(140 * PI / 180), tHold = tRes + 4 * (TOPR - T140), tRel = wt('S7', 'enough') + 0.3;
const st5 = (tr) => { if (tr <= 0) return { th: 0, p: VP(O, R, 0), v: 0, T: MASS * G, rest: 1 };
  if (tr < TS) { const th = R5.f(tr); return { th, p: VP(O, R, th), v: Math.sqrt(v2At(5, th)), T: TAt(5, th), v0: 5 }; }
  if (tr - TS > FL.tf + 0.25) return { th: 0, p: VP(O, R, 0), v: 0, T: MASS * G, rest: 1 };
  const tf = Math.min(tr - TS, FL.tf); return { th: null, p: FL.at(tf), v: FL.vel(tf), T: 0, free: 1, u: [FL.vx / PXM, (FL.vy + FL.g * tf) / PXM], done: tr - TS > FL.tf }; };
const st7 = (thr) => { const th = thr % (2 * PI); return { th, p: VP(O, R, th), v: Math.sqrt(v2At(7, th)), T: Math.max(0, TAt(7, th)), v0: 7 }; };
const state = t => {
  if (t >= tSlo) { if (t < tRes) return st7(R7.f(((tSlo - tLC) / 2) % R7.P)); if (t < tHold) return st7(R7.f(T140 + (t - tRes) / 4)); if (t < tRel) return st7(PI); return st7(R7.f(Math.min(TOPR + (t - tRel) / 4, R7.P))); }
  if (t >= tLC) return st7(R7.f(((t - tLC) / 2) % R7.P));
  if (t >= tLB - 0.3) return st5((t - tLB) / 2);
  const a = st5((t - tLA) / 2); if (a.done && t > tLA + 2 * (TS + FL.tf) + 0.5) return st5(0); return a; };
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'At the top, gravity does the whole job!' });

/* ---------- D: the formula ---------- */
const STEPS = [[`${TK} + ${mgK} = m${vK}^2/r`, 'at the top, both point down to the centre'],
  [`${TK} \\ge 0 \\;\\Rightarrow\\; \\text{slowest: } ${TK} = 0`, 'a string can pull, never push'],
  [`${mgK} = m${vK}^2/r \\;\\Rightarrow\\; ${vK}_{\\text{top}} = \\sqrt{g r}`, 'cancel m · units: √(m/s² · m) = m/s'],
  [`${vK}_{\\text{bot}}^2 = ${vK}_{\\text{top}}^2 + 4gr \\;\\Rightarrow\\; ${vK}_{\\text{bot}} = \\sqrt{5 g r}`, 'energy: it drops 2r from the top']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${74 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'So'), wt('D3', 'So'), wt('D4', 'Then'), wt('D5', 'So')];
const dr = $('#drS'), DO = [372, 300], DR = 160, DTOP = VP(DO, DR, PI), DBOT = VP(DO, DR, 0);
mk(dr, 'circle', { cx: DO[0], cy: DO[1], r: DR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(dr, 'line', { x1: DO[0], y1: DO[1], x2: DTOP[0], y2: DTOP[1], stroke: C.ink, 'stroke-width': 2.5 });
mk(dr, 'circle', { cx: DO[0], cy: DO[1], r: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const dBall = mk(dr, 'circle', { cx: DTOP[0], cy: DTOP[1], r: 15, fill: MC });
const dGhost = mk(dr, 'circle', { cx: DBOT[0], cy: DBOT[1], r: 15, fill: MC, opacity: 0.35 });
const dT = PUC.arrow(dr, FC, 6, 17), dW = PUC.arrow(dr, FC, 6, 17), dV = PUC.arrow(dr, VC, 6, 17), dVb = PUC.arrow(dr, VC, 6, 17);
const dTl = sym(dr, DTOP[0] - 56, DTOP[1] + 70, 'T', '', FC, 26), dWl = sym(dr, DTOP[0] + 32, DTOP[1] + 70, 'mg', '', FC, 24);
const dT0 = txt(dr, DTOP[0] - 120, DTOP[1] + 70, 'T = 0', { 'font-size': 22, fill: FC, 'font-weight': 600 });
const dVl = sym(dr, 0, 0, 'v', 'top', VC, 26), dVbl = sym(dr, 0, 0, 'v', 'bot', VC, 26);
const dBr = mk(dr, 'path', { d: `M${DO[0] + 210},${DTOP[1]} h14 V${DBOT[1]} h-14`, fill: 'none', stroke: HC, 'stroke-width': 3 });
const dBrL = sym(dr, DO[0] + 236, DO[1] + 10, '2r', '', HC, 28);
const dTag = document.createElement('div'); dTag.className = 'chipd'; dTag.style.cssText = 'left:36px;top:492px'; dTag.innerHTML = `<span>slowest top</span><span style="color:#9DBDF7">v = √(gr)</span>`; $('#dr').appendChild(dTag);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vK}_{\\text{top}} \\ge \\sqrt{g\\,r}`);

/* ---------- C: bottom vs top ---------- */
const sideFig = (svg, top) => { const o = [356, top ? 172 : 110], r = 110, p = VP(o, r, top ? PI : 0);
  mk(svg, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
  mk(svg, 'line', { x1: o[0], y1: o[1], x2: p[0], y2: p[1], stroke: C.ink, 'stroke-width': 2.5 });
  mk(svg, 'circle', { cx: o[0], cy: o[1], r: 7, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'circle', { cx: p[0], cy: p[1], r: 14, fill: MC });
  const T = PUC.arrow(svg, FC, 6, 16), W = PUC.arrow(svg, FC, 6, 16), V = PUC.arrow(svg, VC, 5, 15);
  const Tl = sym(svg, 0, 0, 'T', '', FC, 26), Wl = sym(svg, 0, 0, 'mg', '', FC, 24);
  const cen = txt(svg, o[0] + 18, o[1] - 12, 'centre', { 'font-size': 15 });
  return { o, r, p, T, W, V, Tl, Wl, cen }; };
const cB = sideFig($('#c0S'), 0), cT = sideFig($('#c1S'), 1);
$('#c0a').innerHTML = K(`${TK} = ${mgK} + m${vK}^2/r`); $('#c1a').innerHTML = K(`${TK} = m${vK}^2/r - ${mgK}`);
const th1 = PUC.think($('#th1'), { q: 'A weak rope swings a bucket in a vertical circle. Where will it snap first?', opts: ['At the bottom', 'At the top'], right: 0,
  why: 'There it holds the weight, and also bends the path.' });
const th2 = PUC.think($('#th2'), { q: 'Swap the string for a stiff rod. What is the slowest speed at the top?', opts: [K('\\sqrt{g r}'), 'Almost zero'], right: 1,
  why: 'A rod can push the ball up. It only has to reach the top.' });
const rs = $('#rodS'), RO2 = [150, 200], RR2 = 120;
mk(rs, 'circle', { cx: RO2[0], cy: RO2[1], r: RR2, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(rs, 'line', { x1: RO2[0], y1: RO2[1], x2: RO2[0], y2: RO2[1] - RR2, stroke: '#5A6478', 'stroke-width': 9, 'stroke-linecap': 'round' });
mk(rs, 'circle', { cx: RO2[0], cy: RO2[1], r: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
mk(rs, 'circle', { cx: RO2[0], cy: RO2[1] - RR2, r: 15, fill: MC });
txt(rs, RO2[0] + 16, RO2[1] + 30, 'stiff rod', { 'font-size': 17 });
const rsP = PUC.arrow(rs, FC, 6, 16), rsPl = txt(rs, RO2[0] + 14, RO2[1] - RR2 - 34, 'rod pushes', { 'font-size': 18, fill: FC, 'font-weight': 600 });

/* ---------- R: why the water stays in ---------- */
const rl = $('#rlS'), BO = [392, 250], BR = 150, BPX = BR / 0.9;      // r = 0.9 m drawn 150 px
mk(rl, 'circle', { cx: BO[0], cy: BO[1], r: BR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const rArm = mk(rl, 'line', { x1: BO[0], y1: BO[1], stroke: C.ink, 'stroke-width': 2.5 });
mk(rl, 'circle', { cx: BO[0], cy: BO[1], r: 8, fill: C.ink }); txt(rl, BO[0] + 14, BO[1] + 24, 'hand', { 'font-size': 16 });
const rGh = [0.3, 0.2, 0.12].map(o2 => { const b = bucket(rl, 1.8); b.g.setAttribute('opacity', o2); return b; });
const rB = bucket(rl, 1.8);
const rN = PUC.arrow(rl, FC, 6, 16), rW = PUC.arrow(rl, FC, 6, 16), rNl = sym(rl, 0, 0, 'N', '', FC, 24), rWl = sym(rl, 0, 0, 'mg', '', FC, 22);
const rDrops = [0, 1, 2, 3].map(k => mk(rl, 'circle', { r: 7 - k, fill: WATER, stroke: '#5E8FD6', 'stroke-width': 1.2 }));
const tSlowR = wt('R5', 'slowly') - 0.2, rVel = M.keys([[0, 4], [tSlowR, 2]], 0.6, M.io);        // hand-driven speed, m/s
const RI = [0]; { const DT = 1 / 240; for (let t2 = tR1 - 0.5; t2 < tW1 + 0.5; t2 += DT) RI.push(RI[RI.length - 1] + rVel(t2) / 0.9 / 2 * DT); }   // shown at 0.5x
const rTh = t => { const x = (Math.max(t, tR1 - 0.5) - (tR1 - 0.5)) * 240, i = Math.min(Math.floor(x), RI.length - 1); return 2.6 + RI[i]; };
window.__RSP = 0; const RSP = (() => { for (let t2 = tSlowR + 0.7; t2 < tW1; t2 += 0.004) { const a = rTh(t2) % (2 * PI); if (a > 2.04 && a < 2.12) return t2; } return 1e9; })();
const rSpill = (() => { const th = rTh(RSP), p = VP(BO, BR - 12, th), u = VT(th), v = 2 * BPX; return { p, vx: u[0] * v, vy: u[1] * v, g: G * BPX }; })();
const BW = 360, BMAX = 20;
const LK = [['At the top it needs <i>m</i><i class="vv">v</i>²/<i>r</i> downward'], ['<i class="ff">mg</i> gives some, the <span class="ff">base</span> pushes the rest'], ['Fast: <i>m</i><i class="vv">v</i>²/<i>r</i> &gt; <i>mg</i>, base presses, water stays'], ['Slow: <i>mg</i> &gt; <i>m</i><i class="vv">v</i>²/<i>r</i>, the water falls out']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So swing it fast, and stay dry!' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${vK}_{\\text{top}} = \\sqrt{gr} = \\sqrt{9.8 \\times 0.9} \\approx ${tx(VC, '3.0\\,\\text{m/s}')}`)],
  [K(`${vK}_{\\text{bot}}^2 = 5gr = 5 \\times 9.8 \\times 0.9 = 44.1`)],
  [K(`${NK} = ${mgK} + m${vK}^2/r = 9.8 + 44.1/0.9`)],
  [K(`${NK} = 9.8 + 49 = ${tx(FC, '58.8\\,\\text{N}')} = 6\\,${mgK}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [392, 262], WR = 150, WTOP = VP(WO, WR, PI), WBOT = VP(WO, WR, 0);
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 7, fill: C.ink }); txt(w, WO[0] - 130, WO[1] + 6, 'r = 0.9 m', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const wBt = bucket(w, 1.6), wBb = bucket(w, 1.6); placeB(wBt, WTOP, PI); placeB(wBb, WBOT, 0);
const wVt = PUC.arrow(w, VC, 6, 17), wVb = PUC.arrow(w, VC, 6, 17), wN = PUC.arrow(w, FC, 7, 18), wW = PUC.arrow(w, FC, 6, 16);
const wVtl = txt(w, WTOP[0] - 200, WTOP[1] - 34, 'v ≈ 3.0 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const wVbl = txt(w, WBOT[0] + 70, WBOT[1] + 50, 'v² = 44.1', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const wNl = txt(w, WBOT[0] + 24, WBOT[1] - 118, 'N = 58.8 N', { 'font-size': 20, fill: FC, 'font-weight': 600 });
const wWl = txt(w, WBOT[0] - 140, WBOT[1] + 64, 'mg = 9.8 N', { 'font-size': 20, fill: FC, 'font-weight': 600 });
const tW = [wt('W3', 'slowest'), wt('W4', 'At'), wt('W5', 'So'), wt('W5', 'Nine')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'At the top: ' + K(`${TK} = m${vK}^2/r + ${mgK}`), right: 'At the top: ' + K(`${TK} = m${vK}^2/r - ${mgK}`) + ', both pull to the centre' });
const tg = $('#tg'), GO = [170, 172], GR = 92, GT = VP(GO, GR, PI);
mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: GR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
mk(tg, 'line', { x1: GO[0], y1: GO[1], x2: GT[0], y2: GT[1], stroke: C.ink, 'stroke-width': 2 });
mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
mk(tg, 'circle', { cx: GT[0], cy: GT[1], r: 13, fill: MC });
const tgT = PUC.arrow(tg, FC, 5, 15), tgW = PUC.arrow(tg, FC, 5, 15);
const tgTl = sym(tg, GT[0] - 44, GT[1] + 56, 'T', '', FC, 22), tgWl = sym(tg, GT[0] + 24, GT[1] + 56, 'mg', '', FC, 20);
const tgC = txt(tg, GO[0] + 12, GO[1] + 24, 'centre', { 'font-size': 15 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: top and bottom speeds, the tension at a point' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 0.2 kg ball whirls in a vertical circle on a 1 m string. The tension at the top is 3 N, and <i>g</i> = 10 m/s². Find the tension at the bottom.', qW: 780,
  opts: ['7 N', '11 N', '15 N', '12 N'], right: 2, optY: 300 });
const so = PUC.solution($('#so'), [[K(`3 + 2 = 0.2\\,${vK}_t^2 \\Rightarrow ${vK}_t^2 = 25`)], [K(`${vK}_b^2 = 25 + 4(10)(1) = 65`)],
  [K(`${TK}_b = 2 + 0.2(65) = 2 + 13`)], [K(`${TK}_b = 15\\,\\text{N} \\;\\Rightarrow\\; \\textbf{C}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Three'), wt('A3', 'Down'), wt('A4', 'Two'), wt('A4', 'Fifteen')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · motion in a vertical circle', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`\\text{Top: } ${TK} + ${mgK} = m${vK}^2/r \\qquad \\text{Bottom: } ${TK} - ${mgK} = m${vK}^2/r`),
    '<b>String</b>: ' + K(`${vK}_{\\text{top}} \\ge \\sqrt{gr},\\;\\; ${vK}_{\\text{bot}} \\ge \\sqrt{5gr}`) + ' &nbsp;(energy: ' + K(`${vK}_b^2 = ${vK}_t^2 + 4gr`) + ')',
    '<b>Rod</b>: it can push, so the top speed only has to be just above zero',
    '<b>Tension</b>: biggest at the bottom, smallest at the top'] });
const YQ = ['Why does the speed change on a vertical circle?', 'Why can the top speed on a string not be zero?', 'Where does the string pull hardest, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 84', topic: 'Same stairs, one friend faster: who has more power? Power', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 14 - bp.offsetWidth) + 'px'; bp.style.top = '96px'; }

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); if (!geo) measure(); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  M.vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const g = jrD[i], th = 1.2 + i * 2 + g.w * (t - tMorph), p = VP(g.o, g.r, th);
      if (i === 2) { placeB(g.d, p, th); attr(g.ln, 'x2', p[0].toFixed(1)); attr(g.ln, 'y2', p[1].toFixed(1)); }
      else attr(g.d.g, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${(-deg(th) + 180).toFixed(1)})`);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'top') + 0.1) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'nothing') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#swing'), t, wt('H3', 'over') - 0.1, 1e9, { dy: -30, sp: M.SOFT });
    const th = swTh(t), p = VP(SWO, SWR, th); placeB(swB, p, th); attr(swArm, 'x2', p[0].toFixed(1)); attr(swArm, 'y2', p[1].toFixed(1));
    const spilled = t >= SPILL; swB.wat.style.opacity = spilled ? '0' : '1';
    swGh.forEach((b, k) => { const t2 = t - 0.06 * (k + 1), th2 = swTh(t2); placeB(b, VP(SWO, SWR, th2), th2); b.wat.style.opacity = t2 >= SPILL ? '0' : '1'; M.hide(b.g, Math.abs(th2 - th) < 0.05); });
    const ts = t - SPILL, sp0 = VP(SWO, SWR - 8, swTh(SPILL)), su = VT(swTh(SPILL));
    swDrops.forEach((d, k) => { const tt = ts - k * 0.05; if (tt < 0) { M.hide(d, true); return; } M.hide(d, false); const q = 1.6 * 0.5; attr(d, 'cx', (sp0[0] + su[0] * 110 * q * tt + (k - 1) * 4).toFixed(1)); attr(d, 'cy', (sp0[1] + su[1] * 110 * q * tt + 0.5 * 600 * tt * tt).toFixed(1)); });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : C.okBg, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const th = paTh(t), p = VP(PO, PR, th), v = Math.sqrt(v2At(7, th));
    ballAt(paB, p); attr(paStr, 'x2', p[0].toFixed(1)); attr(paStr, 'y2', p[1].toFixed(1));
    paGh.forEach((g, k) => { const t2 = t - 0.07 * (k + 1), q = VP(PO, PR, paTh(t2)); ballAt(g, q); M.hide(g, Math.hypot(q[0] - p[0], q[1] - p[1]) < 3); });
    const gv = M.o3((t - wt('P2', 'round') + 0.2) / 0.5); along(paV, p, VT(th), 14 * v * gv, 16); const lv = VP(p, 0, 0), u = VT(th);
    at(paVl, p[0] + u[0] * (30 + 14 * v) - 8, p[1] + u[1] * (30 + 14 * v) + 10); op(paVl, gv);
    M.vis($('#pa0'), t, wt('P3', 'Going') - 0.1, 1e9, POP); M.vis($('#pa1'), t, wt('P3', 'Coming') - 0.1, 1e9, POP); M.vis($('#paP'), t, wt('P3', 'speed') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P4') - 0.15, out, { dx: 60, dy: 0, ...o });
    const gt = M.o3((t - wt('P4', 'tension') + 0.1) / 0.5), gw = M.o3((t - wt('P4', 'weight') + 0.1) / 0.5), uI = VI(QTH);
    along(pbT, QB, uI, 80 * gt, 18); at(pbTl, QB[0] + uI[0] * 58 + 20, QB[1] + uI[1] * 58 - 20); at(pbTw, QB[0] + uI[0] * 58 + 44, QB[1] + uI[1] * 58 - 22); op(pbTl, gt); op(pbTw, gt);
    along(pbW, QB, DN, 64 * gw, 18); at(pbWl, QB[0] + 14, QB[1] + 66); at(pbWw, QB[0] + 54, QB[1] + 64); op(pbWl, gw); op(pbWw, gw);
    PUC.write($('#pbF'), t, wt('P5', 'total') - 0.1, 0.9);
    M.vis($('#pbP'), t, wt('P5', 'bends') - 0.1, 1e9, POP);
  }

  /* S: the sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#half'), t, tS1 + 0.6, tSlo - 0.1, { dy: 8, outDur: 0.15 }); M.vis($('#slo'), t, tSlo - 0.05, out, POP);
    const s = state(t), p = s.p;
    ballAt(sBall, p);
    sGh.forEach((g, k) => { const t2 = t - 0.07 * (k + 1), q = state(t2).p; ballAt(g, q); M.hide(g, (t > tSlo && t < tRes + 0.3) || Math.hypot(q[0] - p[0], q[1] - p[1]) < 4); });
    // string: straight when tight, a sagging curve when slack
    const dd = Math.hypot(p[0] - O[0], p[1] - O[1]);
    if (s.free && dd < R - 2) { const mx = (O[0] + p[0]) / 2, my = (O[1] + p[1]) / 2, sag = Math.sqrt(Math.max(0, R * R - dd * dd)) * 0.5; attr(sStr, 'd', `M${O[0]},${O[1]} Q${mx.toFixed(1)},${(my + sag).toFixed(1)} ${p[0].toFixed(1)},${p[1].toFixed(1)}`); }
    else attr(sStr, 'd', `M${O[0]},${O[1]} L${p[0].toFixed(1)},${p[1].toFixed(1)}`);
    // theta arc (gold) from the downward line
    const tha = s.th == null ? 0 : s.th; if (tha > 0.05 && tha < 2 * PI - 0.05) { const a = VP(O, 50, 0), b = VP(O, 50, tha); attr(thArc, 'd', `M${a[0]},${a[1]} A50,50 0 ${tha > PI ? 1 : 0} 0 ${b[0].toFixed(1)},${b[1].toFixed(1)}`); const l = VP(O, 74, tha / 2); at(thL, l[0] - 7, l[1] + 9); M.hide(thArc, false); M.hide(thL, false); } else { M.hide(thArc, true); M.hide(thL, true); }
    // vectors: v blue along the motion, T orange to the centre, mg orange down (only in the slow-mo)
    const u = s.free ? (() => { const L = Math.hypot(s.u[0], s.u[1]); return [s.u[0] / L, s.u[1] / L]; })() : VT(s.th ?? 0);
    const gv = M.o3((t - wt('S2', 'five') + 0.2) / 0.5); along(sV, p, u, VPX * s.v * gv, 18); at(sVl, p[0] + u[0] * (40 + VPX * s.v) - 8, p[1] + u[1] * (40 + VPX * s.v) + 10); op(sVl, gv * (s.v > 0.3 ? 1 : 0));
    const uI = s.th == null ? [0, 0] : VI(s.th), gt = M.o3((t - tS1 - 0.6) / 0.5);
    along(sT, p, uI, TPX * s.T * gt, 18); const tl = 18 + TPX * s.T * 0.5; at(sTl, p[0] + uI[0] * tl + uI[1] * 26 - 8, p[1] + uI[1] * tl - uI[0] * 26 + 10); op(sTl, gt * (s.T > 8 ? 1 : 0));
    const slo = t > tSlo && t < out, gw = M.o3((t - tRes) / 0.5) * (slo ? 1 : 0);
    along(sW, p, DN, TPX * MASS * G * gw, 18); at(sWl, p[0] + 14, p[1] + 66); op(sWl, gw);
    at(sT0, p[0] - 120, p[1] + 50); op(sT0, M.o3((t - wt('S7', 'not') + 0.1) / 0.3) * (slo ? 1 : 0));
    slackMk.style.opacity = (M.clamp((t - (tLB + 2 * TS)) / 0.3) * (1 - M.clamp((t - tLC + 0.2) / 0.3))).toFixed(3);
    // readout: theta rounded first, then v, h, T from it
    if (s.free) { M.setT($('#r0'), '--'); M.setT($('#r1'), s.v.toFixed(2)); M.setT($('#r2'), ((O[1] + R - p[1]) / PXM).toFixed(2)); M.setT($('#r3'), '0.00'); }
    else { const thd = Math.round(deg(s.th ?? 0)) % 360, tr = thd * PI / 180, v0 = s.rest ? 0 : s.v0;
      M.setT($('#r0'), String(thd)); M.setT($('#r1'), s.rest ? '0.00' : Math.sqrt(Math.max(0, v2At(v0, tr))).toFixed(2)); M.setT($('#r2'), (RM * (1 - Math.cos(tr))).toFixed(2));
      M.setT($('#r3'), (s.rest ? MASS * G : Math.max(0, TAt(v0, tr))).toFixed(2)); }
    const hi = M.io((t - wt('S3', 'zero') + 0.1) / 0.3) * (1 - M.io((t - T0('S4')) / 0.3)) + M.io((t - wt('S7', 'not')) / 0.3) * (1 - M.io((t - out) / 0.3));
    $('#r3').style.background = mix('#FFFFFF', '#FBEBDD', hi);
    // graph: T against theta, dot linked to the ball
    const r5 = t >= tLA ? (t >= tLC ? deg(R5.slack) : (s.v0 === 5 ? deg(s.th) : (t > tLA + 1 ? deg(R5.slack) : 0))) : 0;
    gC5(x => [x, Math.max(0, TAt(5, x * PI / 180))], 0, r5);
    const c7 = t >= tLC ? (t > tLC + 2 * R7.P ? 360 : (s.v0 === 7 ? deg(s.th) : 360)) : 0; gC7(x => [x, Math.max(0, TAt(7, x * PI / 180))], 0, c7);
    if (s.free) gDot(deg(R5.slack), 0, true); else gDot(Math.round(deg(s.th ?? 0)) % 360, s.rest ? MASS * G : Math.max(0, TAt(s.v0, Math.round(deg(s.th)) * PI / 180)), t > tS1 + 0.8);
    gSl.style.opacity = M.clamp((t - (tLB + 2 * TS)) / 0.3).toFixed(3);
    op(gL1, M.clamp((t - wt('S5', 'twenty') + 0.1) / 0.3)); op(gL2, M.clamp((t - wt('S5', 'zero') + 0.1) / 0.3));
    avS(t, wt('S7', 'enough') + 0.2, out);
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(74, tStep.slice(1).map((tt, i) => [tt - 0.1, 74 + (i + 1) * 120]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const gT = M.o3((t - wt('D2', 'T') + 0.1) / 0.5) * (1 - M.io((t - wt('D3', 'zero') + 0.2) / 0.6)), gW = M.o3((t - wt('D2', 'm') + 0.1) / 0.5), gV = M.o3((t - wt('D2', 'top') + 0.1) / 0.5);
    along(dT, DTOP, DN, 60 * gT, 18, -18); op(dTl, gT > 0.05 ? M.clamp(gT * 2) : 0);
    along(dW, DTOP, DN, 60 * gW, 18, 18); op(dWl, gW);
    op(dT0, M.clamp((t - wt('D3', 'zero') + 0.1) / 0.3));
    along(dV, DTOP, [-1, 0], 60 * gV, 18); at(dVl, DTOP[0] - 108, DTOP[1] - 16); op(dVl, gV);
    const g4 = M.o3((t - wt('D5', 'drops') + 0.1) / 0.5); op(dGhost, 0.35 * g4); M.draw(dBr, t, wt('D5', 'drops') - 0.1, 0.6); op(dBrL, g4);
    const gB = M.o3((t - wt('D5', 'bottom') + 0.1) / 0.5); along(dVb, DBOT, [1, 0], 60 * Math.sqrt(5) * gB, 18); at(dVbl, DBOT[0] + 40, DBOT[1] - 22); op(dVbl, gB);
    M.vis(dTag, t, wt('D4', 'root') - 0.1, 1e9, POP);
    if (t > wt('D5', 'Root')) dTag.innerHTML = `<span>string</span><span style="color:#9DBDF7">v<sub>top</sub> ≥ √(gr) · v<sub>bot</sub> ≥ √(5gr)</span>`; else dTag.innerHTML = `<span>slowest top</span><span style="color:#9DBDF7">v = √(gr)</span>`;
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'On') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'least') - 0.1, 0.8);
  }

  /* C: bottom vs top + two thinks */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const bw = M.o3((t - wt('C2', 'weight') + 0.1) / 0.5), bt = M.o3((t - wt('C2', 'holds') + 0.1) / 0.5), bt2 = M.o3((t - wt('C2', 'gives') + 0.1) / 0.6);
    along(cB.W, cB.p, DN, 46 * bw, 16); at(cB.Wl, cB.p[0] + 14, cB.p[1] + 52); op(cB.Wl, bw);
    along(cB.T, cB.p, UPv, (30 * bt + 36 * bt2), 16, 0); at(cB.Tl, cB.p[0] - 36, cB.p[1] - 44); op(cB.Tl, bt);
    along(cB.V, cB.p, [1, 0], 70 * M.o3((t - tC1 - 0.5) / 0.5), 18);
    PUC.write($('#c0a'), t, wt('C2', 'gives') - 0.1, 0.8); M.vis($('#c0P'), t, wt('C2', 'biggest') - 0.15, 1e9, POP);
    M.vis($('#c1'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tw = M.o3((t - wt('C3', 'weight') + 0.1) / 0.5), tt2 = M.o3((t - wt('C3', 'string') + 0.1) / 0.5);
    along(cT.W, cT.p, DN, 46 * tw, 16, 12); at(cT.Wl, cT.p[0] + 22, cT.p[1] + 62); op(cT.Wl, tw);
    along(cT.T, cT.p, DN, 20 * tt2, 16, -12); at(cT.Tl, cT.p[0] - 46, cT.p[1] + 52); op(cT.Tl, tt2);
    along(cT.V, cT.p, [-1, 0], 70 * M.o3((t - T0('C3') + 0.2) / 0.5), 18);
    PUC.write($('#c1a'), t, wt('C3', 'less') - 0.1, 0.8); M.vis($('#c1P'), t, wt('C3', 'smallest') - 0.15, 1e9, POP);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K2'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'bottom') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'There') });
    M.vis($('#th2'), t, tK2 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tK2, tOpts: wt('K2', 'Root') - 0.1, tCount: T1('K2') + 0.05, dur: 3, tAns: T0('K3') - 0.02, tWhy: wt('K3', 'If') });
    const gp = M.o3((t - wt('K3', 'pushes') + 0.1) / 0.5); along(rsP, [RO2[0], RO2[1] - RR2], UPv, 46 * gp, 18); op(rsPl, gp);
  }

  /* R: why the water stays in */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exR'), t, tR1 + 0.4, 1e9, { dy: 8 });
    const th = rTh(t), p = VP(BO, BR, th); placeB(rB, p, th); attr(rArm, 'x2', p[0].toFixed(1)); attr(rArm, 'y2', p[1].toFixed(1));
    const spilled = t >= RSP; rB.wat.style.opacity = spilled ? '0' : '1';
    rGh.forEach((b, k) => { const t2 = t - 0.06 * (k + 1), th2 = rTh(t2); placeB(b, VP(BO, BR, th2), th2); b.wat.style.opacity = t2 >= RSP ? '0' : '1'; M.hide(b.g, Math.abs(th2 - th) < 0.04); });
    rDrops.forEach((d, k) => { const tt = (t - RSP) / 2 - k * 0.025; if (tt < 0) { M.hide(d, true); return; } M.hide(d, false);
      attr(d, 'cx', (rSpill.p[0] + rSpill.vx * tt + (k - 1.5) * 5).toFixed(1)); attr(d, 'cy', (rSpill.p[1] + rSpill.vy * tt + 0.5 * rSpill.g * tt * tt).toFixed(1)); });
    // forces on the water: mg down, N from the base toward the centre (N = mv^2/r + mg cos theta, 1 kg, r = 0.9 m)
    const v = rVel(t), wp = VP(BO, BR + 10, th), Nv = spilled ? 0 : Math.max(0, v * v / 0.9 + G * Math.cos(th));
    const up = M.clamp((-Math.cos(th) - 0.1) / 0.25), gF = M.o3((t - wt('R3', 'weight') + 0.1) / 0.5) * (spilled ? 0 : 1) * up, gN = M.o3((t - wt('R3', 'base') + 0.1) / 0.5) * (spilled ? 0 : 1) * up;
    along(rW, wp, DN, 7 * G * gF, 14, -12); at(rWl, wp[0] - 52, wp[1] + 64); op(rWl, gF);
    const uI = VI(th); along(rN, wp, uI, 7 * Nv * gN, 14, 12); at(rNl, wp[0] + uI[0] * (14 + 3.5 * Nv) - uI[1] * 34 - 8, wp[1] + uI[1] * (14 + 3.5 * Nv) + uI[0] * 34 + 8); op(rNl, gN * (Nv > 1.5 ? 1 : 0));
    M.setT($('#rV'), `v = ${v < 3 ? 2 : 4} m/s`); M.vis($('#rV'), t, tR1 + 0.5, 1e9, POP);
    const need = v * v / 0.9;
    $('#bNf').style.width = (BW * need / BMAX).toFixed(1) + 'px'; $('#bMf').style.width = (BW * G / BMAX).toFixed(1) + 'px';
    M.setT($('#bNv'), need.toFixed(1) + ' N');
    M.vis($('#bN'), t, wt('R2', 'needs') - 0.1, 1e9, { dy: 10 }); M.vis($('#bM'), t, wt('R3', 'weight') - 0.1, 1e9, { dy: 10 });
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, i === 3 ? C.redBg : C.ac3 || C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5') + 0.5)) / 0.3))); });
    avR(t, wt('R5', 'wet') + 0.1, out);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const g1 = M.o3((t - wt('W3', 'About') + 0.1) / 0.5); along(wVt, WTOP, [-1, 0], 66 * g1, 26); op(wVtl, g1);
    const g2 = M.o3((t - wt('W4', 'five') + 0.1) / 0.5); along(wVb, WBOT, [1, 0], 66 * Math.sqrt(5) * g2, 26); op(wVbl, g2);
    const g3 = M.o3((t - wt('W5', 'Nine') + 0.1) / 0.5), g4 = M.o3((t - wt('W5', 'Fifty') + 0.1) / 0.6);
    along(wW, WBOT, DN, 24.5 * g3, 26, 0); op(wWl, g3);
    along(wN, WBOT, UPv, 2.2 * 58.8 * g4, 26); op(wNl, g4);
    M.vis($('#wC'), t, wt('W6', 'Six') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'T') - 0.1, tStrike: wt('X3', 'gravity') - 0.1, tRight: wt('X3', 'So') });
    const g = M.o3((t - wt('X3', 'gravity') + 0.1) / 0.5); along(tgT, GT, DN, 50 * g, 16, -11); along(tgW, GT, DN, 50 * g, 16, 11); op(tgTl, g); op(tgWl, g);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
