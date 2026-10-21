// PUC Physics Ep 68: Circular motion and centripetal force (Motion notebook, stone on a string + T against v, car on a flat curve)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, OM = C.teal, MC = C.ink, RC = C.ink;   // v blue, a red, every force orange, omega teal, mass ink, radius ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vK = tx(VC, 'v'), aK = tx(AC, 'a'), wK = tx(OM, '\\omega'), mK = tx(MC, 'm'), FcK = tx(FC, 'F_c'), TK = tx(FC, 'T'), FK = tx(FC, 'F'), muK = '\\mu';
const rad = d => d * Math.PI / 180, PI = Math.PI, G = 9.8;
// point on a circle (counter-clockwise, screen y down), unit tangent along the motion, unit vector to the centre
const P = (o, R, th) => [o[0] + R * Math.cos(th), o[1] - R * Math.sin(th)];
const Tg = th => [-Math.sin(th), -Math.cos(th)];
const In = th => [-Math.cos(th), Math.sin(th)];
const ballAt = (el, p) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); };
const along = (a, p, u, L, off = 0) => { if (L < 2) { a.set(0, 0, 0, 0); return; } a.set(p[0] + u[0] * off, p[1] + u[1] * off, p[0] + u[0] * (off + L), p[1] + u[1] * (off + L)); };
const lbl = (el, p, u, d, dx = -8, dy = 10) => { attr(el, 'x', (p[0] + u[0] * d + dx).toFixed(1)); attr(el, 'y', (p[1] + u[1] * d + dy).toFixed(1)); };
// a top-view car: a group with body + windscreen, placed with a rotate about its centre (wrapped so M.vis never touches it)
const car = (p, w = 40, h = 22, col = C.ink) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: col }); mk(g, 'rect', { x: w * 0.08, y: -h / 2 + 3, width: w * 0.2, height: h - 6, rx: 2, fill: '#9DBDF7' }); return g; };
const place = (g, p, u) => attr(g, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${(Math.atan2(u[1], u[0]) * 180 / PI).toFixed(2)})`);

Object.assign(M.IC, {
  stone: ['M6 14c0-4 3-8 7-8s6 3 6 6-2 6-6 6H9c-2 0-3-1.5-3-4Z'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'M9 17h6', 'M19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0'],
  slow: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 12h8'],
  skid: ['M4 18c4-8 10-12 16-12', 'M14 4l6 2-2 6'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC5 = T0('C5'), tM1 = T0('M1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three things going round ---------- */
const JOBS = [['stone', 'Stone on a string', 'WHIRLED ROUND', 'stone', 0], ['moon', 'The Moon', 'CIRCLES THE EARTH', 'Moon', 1], ['car', 'A car', 'TAKES A BEND', 'car', 2]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="200" height="120" id="jrS${i}"></svg></div>`).join('');
const jrD = JOBS.map((j, i) => { const s = $('#jrS' + i), o = [100, 60], r = 42;
  mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
  const cen = i === 1 ? mk(s, 'circle', { cx: o[0], cy: o[1], r: 13, fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 2 }) : mk(s, 'circle', { cx: o[0], cy: o[1], r: 4, fill: C.ink });
  const ln = i === 0 ? mk(s, 'line', { x1: o[0], y1: o[1], stroke: C.ink, 'stroke-width': 2 }) : null;
  const d = i === 2 ? car(s, 22, 12) : mk(s, 'circle', { r: i === 1 ? 8 : 8, fill: i === 1 ? '#B8BCC6' : C.ink });
  return { o, r, d, ln, a: PUC.arrow(s, FC, 4, 12), w: [1.6, 0.9, 1.2][i] }; });
const TILES = [['slow', 'Slow: holds the curve', C.ok], ['skid', 'Fast: tyres slide out', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'Slowly'), wt('H4', 'Faster')];
// the turn, top view: road arc, a bike dot; slow it follows the arc, fast it runs wide
const tu = $('#tuS'), TUO = [118, 196], TUR = 104;
mk(tu, 'path', { d: `M${P(TUO, TUR, rad(170)).map(v => v.toFixed(1)).join(',')} A${TUR},${TUR} 0 0 1 ${P(TUO, TUR, rad(10)).map(v => v.toFixed(1)).join(',')}`, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 26, 'stroke-linecap': 'round' });
mk(tu, 'path', { d: `M${P(TUO, TUR, rad(170)).map(v => v.toFixed(1)).join(',')} A${TUR},${TUR} 0 0 1 ${P(TUO, TUR, rad(10)).map(v => v.toFixed(1)).join(',')}`, fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const tuGh = [0.3, 0.2, 0.12].map(op => mk(tu, 'circle', { r: 7, fill: C.ink, opacity: op }));
const tuB = mk(tu, 'circle', { r: 8, fill: C.ink });
// path: angle from 165 deg down to 15 deg; fast run leaves the arc after the top (radius grows)
const tuPos = (t) => { const fast = t >= tTile[1] - 0.1, t0 = fast ? tTile[1] - 0.1 : tTile[0] - 0.3, w = fast ? 1.5 : 0.75, a = rad(165) - w * Math.max(0, t - t0);
  const a2 = Math.max(a, rad(-40)); const extra = fast && a2 < rad(90) ? 260 * Math.pow(rad(90) - a2, 2) : 0; return P(TUO, TUR + extra, a2); };

/* ---------- P: chain + who does the job ---------- */
const CK = [[`${aK} = ${vK}^2/r`, 'EP 48 · TOWARD CENTRE'], [`${FK}_{\\text{net}} = ${mK}\\,${aK}`, "NEWTON'S 2ND LAW"], [`${FcK} = ${mK}${vK}^2/r`, 'CENTRIPETAL FORCE']];
$('#cks').innerHTML = CK.map(([f, tg], i) => `<div class="ck" id="ck${i}" style="top:${84 + i * 134}px"><div class="cf">${K(f)}</div><div class="ct">${tg}</div></div>`).join('') +
  [0, 1].map(i => `<div class="dn" id="dn${i}" style="top:${186 + i * 134}px">&darr;</div>`).join('');
const tCk = [wt('P2', 'acceleration'), wt('P3', 'net'), wt('P4', 'centripetal')];
const TL = [['Tension', 'THE STRING'], ['Friction', 'THE ROAD'], ['Gravity', 'THE EARTH'], ['Normal force', 'A SPINNING WALL']];
$('#tls').innerHTML = TL.map(([n, w], i) => `<div class="tl" id="tl${i}" style="left:${36 + (i % 2) * 372}px;top:${84 + Math.floor(i / 2) * 244}px"><svg width="340" height="150" id="tlS${i}"></svg><div class="tn">${n}</div><div class="tw">${w}</div></div>`).join('');
const tTl = [wt('P6', 'tension'), wt('P6', 'friction'), wt('P6', 'Gravity'), wt('P6', 'push')];
const TLD = TL.map((_, i) => { const s = $('#tlS' + i), o = [170, i === 1 ? 190 : 80], r = i === 1 ? 150 : i === 2 ? 66 : 56;
  if (i === 1) { mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 22 }); mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '6 6' }); }
  else if (i === 3) mk(s, 'circle', { cx: o[0], cy: o[1], r: r + 6, fill: '#fff', stroke: C.ink, 'stroke-width': 6 });
  else mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
  if (i === 2) mk(s, 'circle', { cx: o[0], cy: o[1], r: 22, fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 2 }); else if (i !== 1) mk(s, 'circle', { cx: o[0], cy: o[1], r: 4, fill: C.ink });
  const ln = i === 0 ? mk(s, 'line', { x1: o[0], y1: o[1], stroke: C.ink, 'stroke-width': 2 }) : null;
  const d = i === 1 ? car(s, 30, 16) : mk(s, 'circle', { r: i === 2 ? 9 : 10, fill: i === 2 ? '#B8BCC6' : C.ink });
  const lb = txt(s, 0, 0, ['T', 'f', 'F', 'N'][i], { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 22, fill: FC });
  return { o, r, d, ln, lb, a: PUC.arrow(s, FC, 4, 13), w: [1.2, -0.08, 0.6, 1.0][i], th0: [0.3, rad(104), 2.2, 4.0][i] }; });

/* ---------- S: the sim ---------- */
const s = $('#simS'), O = [392, 286], R = 180, VPX = 28, TPX = 13, MASS = 0.5;     // r = 1 m drawn 180 px; v 28 px per m/s; T 13 px per N
mk(s, 'rect', { x: 36, y: 72, width: 712, height: 412, rx: 14, fill: '#F3F1EA' });
txt(s, 736, 472, 'SMOOTH TABLE', { 'text-anchor': 'end', 'font-size': 15, 'letter-spacing': 1.5 });
txt(s, 52, 472, 'm = 0.5 kg', { 'font-size': 18, fill: MC, 'font-weight': 600 });
mk(s, 'circle', { cx: O[0], cy: O[1], r: R, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(s, 'circle', { cx: O[0], cy: O[1], r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const sStr = mk(s, 'line', { x1: O[0], y1: O[1], stroke: C.ink, 'stroke-width': 2.5 });
const sRl = txt(s, 0, 0, 'r = 1 m', { 'font-size': 20, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
const sTan = mk(s, 'line', { stroke: VC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const sTanT = txt(s, 0, 0, 'along the tangent', { 'font-size': 20, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
const sOut = mk(s, 'line', { stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '4 7' });
const sOutT = txt(s, 0, 0, 'not outward', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const sCut = mk(s, 'path', { d: '', stroke: C.red, 'stroke-width': 3.5, 'stroke-linecap': 'round', fill: 'none' });
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 16, fill: MC, opacity: op }));
const sBall = mk(s, 'circle', { r: 16, fill: MC });
const sV = PUC.arrow(s, VC, 7, 20), sT = PUC.arrow(s, FC, 7, 20);
const sVl = sym(s, 0, 0, 'v', '', VC, 30), sTl = sym(s, 0, 0, 'T', '', FC, 30);
const sTw = txt(s, 0, 0, 'string', { 'font-size': 17, fill: FC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r0" style="color:${VC}">2.00</span><span class="u">m/s · speed</span>
  <span class="k">r</span><span class="v" id="r1">1.00</span><span class="u">m · string</span>
  <span class="k" style="color:${FC}">T</span><span class="v" id="r2" style="color:${FC}">2.00</span><span class="u">N · string pull</span>
  <span class="k" style="color:${FC}">F<sub>c</sub></span><span class="v" id="r3" style="color:${FC}">2.00</span><span class="u">N · mv²/r</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 5, ymin: 0, ymax: 12.5, xt: [0, 1, 2, 3, 4, 5], yt: [0, 4, 8, 12], xl: 'v (m/s)' });
gr.xlab.setAttribute('y', 78 + 140 + 56);
txt($('#grS'), 96, 66, 'T (N)', { 'text-anchor': 'end' });
const gFull = gr.curve(M.mix(FC, '#FFFFFF', 0.6), 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '6 7');
const gCur = gr.curve(FC, 5), gDot = gr.dot(FC, 10);
const gDrop = mk($('#grS'), 'line', { stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' });
// speed 2 -> 4 m/s on "speed"; real time until "Slow-mo", a 0.6 s freeze, then 0.25x; the string is cut on "cut" with the stone at the top
const tUp = wt('S3', 'speed') + 0.1, vT = M.keys([[0, 2], [tUp, 4]], 1.4, M.io);
const tA = tS1 + 0.3, tSlo = wt('S6', 'Slow'), tRes = tSlo + 0.6, tCut = Math.max(wt('S6', 'cut') + 0.15, tRes + 0.3), tEnd = tCut + 1.2;
const DT = 1 / 120, I = [0]; for (let t2 = tA; t2 < tSlo; t2 += DT) I.push(I[I.length - 1] + (vT(t2) + vT(t2 + DT)) / 2 / 1 * DT);
const Ireal = t => { if (t <= tA) return 0; const x = (Math.min(t, tSlo) - tA) / DT, i = Math.floor(x), f = x - i; return i + 1 >= I.length ? I[I.length - 1] : I[i] + (I[i + 1] - I[i]) * f; };
const ISlo = Ireal(tSlo), SLOW_W = 4 * 0.25, TH0 = PI / 2 - ISlo - SLOW_W * (tCut - tRes);
const thS = t => t <= tSlo ? TH0 + Ireal(t) : TH0 + ISlo + SLOW_W * Math.max(0, Math.min(t, tCut) - tRes);
const TOP = P(O, R, PI / 2), UT = Tg(PI / 2);
const stoneAt = t => t < tCut ? P(O, R, thS(t)) : [TOP[0] + UT[0] * R * SLOW_W * (Math.min(t, tEnd) - tCut), TOP[1] + UT[1] * R * SLOW_W * (Math.min(t, tEnd) - tCut)];
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Not thrown out. Just not held in!' });

/* ---------- D: the formula ---------- */
const STEPS = [[`${aK} = ${vK}^2/r`, 'going round: toward the centre (Ep 48)'],
  [`${FK}_{\\text{net}} = ${mK}\\,${aK}`, "Newton's second law: same direction as a"],
  [`${FcK} = ${mK}${vK}^2/r = ${mK}${wK}^2 r`, 'the net inward force, with v = ωr'],
  [`\\text{kg}\\cdot\\text{m/s}^2 = \\text{N}`, 'units: it really is a force']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'acceleration'), wt('D3', 'Newton'), wt('D4', 'net'), wt('D5', 'Units')];
const dr = $('#drS'), DO = [392, 270], DR = 170;
mk(dr, 'circle', { cx: DO[0], cy: DO[1], r: DR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(dr, 'circle', { cx: DO[0], cy: DO[1], r: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const dStr = mk(dr, 'line', { x1: DO[0], y1: DO[1], stroke: C.ink, 'stroke-width': 2.5 });
const dGh = [0.3, 0.2, 0.12].map(op => mk(dr, 'circle', { r: 15, fill: MC, opacity: op }));
const dBall = mk(dr, 'circle', { r: 15, fill: MC });
const dV = PUC.arrow(dr, VC, 6, 18), dA = PUC.arrow(dr, AC, 6, 18), dT = PUC.arrow(dr, FC, 7, 20);
const dVl = sym(dr, 0, 0, 'v', '', VC, 28), dAl = sym(dr, 0, 0, 'a', '', AC, 28, { 'text-anchor': 'middle' }), dTl = sym(dr, 0, 0, 'T = F', 'c', FC, 26, { 'text-anchor': 'middle' });
const tDrun = tD1 + 0.2, dTh = t => rad(200) + 0.35 * Math.max(0, t - tDrun);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${FcK} = \\dfrac{${mK}${vK}^2}{r}`);

/* ---------- C: side by side ---------- */
const c0 = $('#c0S'), CO = [356, 150], CR = 104;
mk(c0, 'circle', { cx: CO[0], cy: CO[1], r: CR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
mk(c0, 'circle', { cx: CO[0], cy: CO[1], r: 7, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const c0Str = mk(c0, 'line', { x1: CO[0], y1: CO[1], stroke: C.ink, 'stroke-width': 2.5 });
const c0Gh = [0.3, 0.2, 0.12].map(op => mk(c0, 'circle', { r: 13, fill: MC, opacity: op }));
const c0B = mk(c0, 'circle', { r: 13, fill: MC }), c0T = PUC.arrow(c0, FC, 6, 17), c0Tl = sym(c0, 0, 0, 'T', '', FC, 26);
const c0Snap = txt(c0, 0, 0, 'SNAP', { 'font-size': 18, fill: C.red, 'font-weight': 600, 'letter-spacing': 2 });
// spin-up: omega 1.5 -> 4 rad/s through C2, the string snaps on "snaps", then the stone carries on along the tangent
const tC2 = T0('C2'), tSnap = wt('C2', 'snaps') + 0.1, c0W = M.keys([[0, 1.5], [wt('C2', 'faster'), 4]], 1.6, M.io);
const C0I = [0]; for (let t2 = tC2 - 0.3; t2 < tSnap; t2 += DT) C0I.push(C0I[C0I.length - 1] + c0W(t2) * DT);
const c0Th = t => { const x = (Math.min(Math.max(t, tC2 - 0.3), tSnap) - (tC2 - 0.3)) / DT, i = Math.min(Math.floor(x), C0I.length - 1); return rad(250) + C0I[i]; };
const c0Pos = t => { if (t < tSnap) return P(CO, CR, c0Th(t)); const th = c0Th(tSnap), p = P(CO, CR, th), u = Tg(th), d = Math.min(c0W(tSnap) * CR * (t - tSnap), 120); return [p[0] + u[0] * d, p[1] + u[1] * d]; };
$('#c0a').innerHTML = K(`${TK} = ${FcK} = ${mK}${vK}^2/r`);
const c1 = $('#c1S'), C1O = [356, 400], C1R = 270;
mk(c1, 'circle', { cx: C1O[0], cy: C1O[1], r: C1R, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 44 });
mk(c1, 'circle', { cx: C1O[0], cy: C1O[1], r: C1R, fill: 'none', stroke: '#fff', 'stroke-width': 2.5, 'stroke-dasharray': '10 10' });
const c1Car = car(c1, 46, 24), c1V = PUC.arrow(c1, VC, 6, 17), c1F = PUC.arrow(c1, FC, 7, 19);
const c1Fl = sym(c1, 0, 0, 'f', '', FC, 26), c1Fw = txt(c1, 0, 0, 'road', { 'font-size': 17, fill: FC, 'font-weight': 600 });
const c1Lim = txt(c1, 24, 40, 'friction ≤ μmg', { 'font-size': 20, fill: FC, 'font-weight': 600 });
const tC1run = T0('C3') - 0.4, c1Th = t => rad(112) - 0.03 * Math.max(0, t - tC1run);
const C1A = [K(`\\dfrac{${mK}${vK}^2}{r} \\le ${muK}\\,${mK}\\,g`), K(`\\dfrac{\\cancel{${mK}}${vK}^2}{r} \\le ${muK}\\,\\cancel{${mK}}\\,g`)]; $('#c1a').innerHTML = C1A[0];
$('#c1b').innerHTML = K(`${vK}_{\\text{max}} = \\sqrt{${muK}\\, r\\, g}`);
const th1 = PUC.think($('#th1'), { q: 'A heavy truck takes the same flat curve as a small car. Is its top safe speed lower, or the same?', opts: ['Lower', 'The same'], right: 1,
  why: 'm cancels: more mass needs more friction, but presses harder.' });
const th2 = PUC.think($('#th2'), { q: 'The Moon goes round the Earth. What supplies its centripetal force?', opts: ['Gravity', 'A new centripetal force'], right: 0,
  why: "The Earth's pull does the whole job. No extra force is needed." });

/* ---------- R: car on a flat curve, link by link ---------- */
const rl = $('#rlS'), RO = [392, 262], RR = 160, PXM = RR / 20, MU = 0.5, MCAR = 1000, VMAX = Math.sqrt(MU * 20 * G);   // r = 20 m drawn 160 px (8 px per m)
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: RR, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 40 });
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: RR, fill: 'none', stroke: '#fff', 'stroke-width': 2.5, 'stroke-dasharray': '10 10' });
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: 5, fill: C.ink }); sym(rl, RO[0] + 10, RO[1] + 28, 'O', '', C.ink, 20);
const rTan = mk(rl, 'line', { stroke: VC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' }), rTanT = txt(rl, 0, 0, 'tangent', { 'font-size': 18, fill: VC, 'font-weight': 600 });
const rTrail = mk(rl, 'path', { d: '', fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round' });
const rGh = [0.3, 0.2, 0.12].map(op => { const g = car(rl, 40, 22); g.setAttribute('opacity', op); return g; });
const rCar = car(rl, 40, 22), rV = PUC.arrow(rl, VC, 6, 17), rF = PUC.arrow(rl, FC, 7, 19);
const rFl = sym(rl, 0, 0, 'f', '', FC, 26), rFw = txt(rl, 0, 0, 'road', { 'font-size': 16, fill: FC, 'font-weight': 600 });
const rVc = document.createElement('div'); rVc.className = 'stag'; rVc.style.cssText = 'left:36px;top:66px'; $('#rl').appendChild(rVc);
// speed: 6 m/s, then from "Three" a steady rise that reaches v_max exactly on "Past", then keeps rising
const tR4 = T0('R4'), tPast = wt('R5', 'Past'), RISE = (VMAX - 6) / (tPast - tR4);
const vR = t => t < tR4 ? 6 : Math.min(12, 6 + RISE * (t - tR4));
const RT0 = tR1 - 0.4, RT1 = tW1 + 0.2, RDT = 1 / 240;
let RS = []; { let th = 0; for (let t2 = RT0; t2 < tPast; t2 += RDT) th += vR(t2) / 20 * RDT;
  let th0 = PI / 2 - th, p = null, u = null; th = th0;
  for (let t2 = RT0; t2 <= RT1 + RDT; t2 += RDT) {
    const v = vR(t2);
    if (t2 < tPast) { p = P(RO, RR, th); u = Tg(th); RS.push([p[0], p[1], u[0], u[1], v]); th += v / 20 * RDT; }
    else { const n = [u[1], -u[0]], k = MU * G / v * RDT; u = [u[0] + n[0] * k, u[1] + n[1] * k]; const L = Math.hypot(u[0], u[1]); u = [u[0] / L, u[1] / L];
      p = [p[0] + u[0] * v * PXM * RDT, p[1] + u[1] * v * PXM * RDT]; RS.push([p[0], p[1], u[0], u[1], v]); } } }
const rAt = t => RS[M.clamp(Math.round((t - RT0) / RDT), 0, RS.length - 1)];
const BW = 360, BMAX = 7200;
$('#bMf').style.width = (BW * MU * MCAR * G / BMAX).toFixed(1) + 'px'; $('#bL').style.left = (36 + 200 + BW * MU * MCAR * G / BMAX).toFixed(1) + 'px';
const LK = [['Going round needs <i>m</i><i class="vv">v</i>²/<i>r</i> inward'], ['Flat road: only <span class="ff">friction</span>, at most μ<i>mg</i>'], ['Faster: the force needed grows as <i class="vv">v</i>²'], ['Past the limit: it runs wide, to the tangent']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt" style="top:28px">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Nothing pushed it out. Friction ran out.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${FK}_{\\text{need}} = \\dfrac{${mK}${vK}^2}{r} = \\dfrac{60 \\times 25}{10} = ${tx(FC, '150\\,\\text{N}')}`)],
  [K(`${FK}_{\\text{max}} = ${muK}\\,${mK}\\,g = 0.4 \\times 60 \\times 9.8 \\approx ${tx(FC, '235\\,\\text{N}')}`)],
  [K(`150\\,\\text{N} < 235\\,\\text{N} \\;\\Rightarrow\\; \\text{no skid}`)],
  [K(`${vK}_{\\text{max}} = \\sqrt{${muK}\\, r\\, g} = \\sqrt{39.2} \\approx ${tx(VC, '6.3\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [392, 180], WR = 92;     // r = 10 m drawn 92 px
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 26 });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR, fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 4, fill: C.ink }); txt(w, WO[0] + 12, WO[1] + 24, 'r = 10 m', { 'font-size': 18, fill: RC, 'font-weight': 600 });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { r: 10, fill: MC, opacity: op }));
const wB = mk(w, 'circle', { r: 10, fill: MC }), wVa = PUC.arrow(w, VC, 5, 15), wFa = PUC.arrow(w, FC, 6, 17);
const tWrun = T0('W2') + 0.2, wTh = t => rad(90) + 0.5 * Math.max(0, t - tWrun);   // 5 m/s on a 10 m circle: 0.5 rad/s
const WBW = 360, WBMAX = 300;
$('#wNf').style.width = (WBW * 150 / WBMAX) + 'px'; $('#wMf').style.width = (WBW * 235.2 / WBMAX).toFixed(1) + 'px';
const tW = [wt('W3', 'Friction'), wt('W4', 'Friction'), wt('W5', 'Needed'), wt('W6', 'His')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Forces on the stone: tension + a centripetal force', right: 'Only one force: the tension IS the centripetal force' });
const tg = $('#tg'), GO = [196, 140], GR = 96;
mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: GR, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
mk(tg, 'line', { x1: GO[0], y1: GO[1], x2: GO[0] + GR, y2: GO[1], stroke: C.ink, 'stroke-width': 2 });
const tgB = mk(tg, 'circle', { cx: GO[0] + GR, cy: GO[1], r: 13, fill: MC });
const tgT = PUC.arrow(tg, FC, 6, 17), tgX = PUC.arrow(tg, FC, 6, 17);
const tgTl = sym(tg, GO[0] + GR - 64, GO[1] - 16, 'T', '', FC, 24), tgXl = sym(tg, GO[0] + GR - 78, GO[1] + 66, 'F', 'c', FC, 24);
const tgSk = mk(tg, 'line', { x1: GO[0] + GR - 92, y1: GO[1] + 62, x2: GO[0] + GR - 8, y2: GO[1] + 30, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: string tension, top speed on a flat curve, which force does the job' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A horizontal disc turns at a steady 5 rad/s. For a coin on it, <i>μ</i> = 0.5 and <i>g</i> = 10 m/s². How far from the centre can the coin sit without slipping?', qW: 780,
  opts: ['10 cm', '20 cm', '50 cm', '1 m'], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${mK}${wK}^2 r \\le ${muK}\\,${mK}\\,g`)], [K(`\\Rightarrow\\; r \\le ${muK}\\, g/${wK}^2`)],
  [K(`r \\le 5/25 = 0.2\\,\\text{m}`)], [K(`r_{\\text{max}} = 20\\,\\text{cm} \\;\\Rightarrow\\; \\textbf{B}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Friction'), wt('A3', 'Cancel'), wt('A4', 'That'), wt('A4', 'twenty', 1)];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · centripetal force', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${FcK} = ${mK}${vK}^2/r = ${mK}${wK}^2 r \\quad \\text{toward the centre}`),
    '<b>Not a new force</b>: tension, friction, gravity or a normal force does the job',
    '<b>Flat curve</b>: ' + K(`${mK}${vK}^2/r \\le ${muK}${mK}g \\Rightarrow ${vK}_{\\text{max}} = \\sqrt{${muK} r g}`) + ', mass cancels',
    '<b>No outward force</b> (ground frame): cut the string, it goes along the tangent'] });
const YQ = ['What supplies the centripetal force for a stone on a string?', 'Why does a car run wide on a flat curve if it goes too fast?', 'Why does the top safe speed on a flat curve not depend on mass?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 69', topic: 'How can a tilted road turn a car? Banking of Roads', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const gp = M.o3((t - wt('H2', 'pulling') + 0.1) / 0.5);
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const g = jrD[i], th = 0.8 + i * 2 + g.w * (t - tMorph), p = P(g.o, g.r, th), u = In(th);
      if (i === 2) place(g.d, p, Tg(th)); else ballAt(g.d, p);
      if (g.ln) { attr(g.ln, 'x2', p[0].toFixed(1)); attr(g.ln, 'y2', p[1].toFixed(1)); }
      along(g.a, p, u, 26 * gp, 12);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'round')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'pulling') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#turn'), t, wt('H3', 'turn') - 0.1, 1e9, { dy: -30, sp: M.SOFT });
    const bp = tuPos(t); ballAt(tuB, bp);
    tuGh.forEach((g, k) => { const t2 = t - 0.1 * (k + 1), q = tuPos(t2); ballAt(g, q); M.hide(g, Math.hypot(q[0] - bp[0], q[1] - bp[1]) < 3); });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : C.okBg, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pc'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CK.forEach((_, i) => { const el = $('#ck' + i); M.vis(el, t, tCk[i] - 0.15, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, i === 2 ? C.ac2 : C.soft, M.io((t - tCk[i]) / 0.3)); });
    [0, 1].forEach(i => M.vis($('#dn' + i), t, tCk[i + 1] - 0.3, 1e9, { dy: -10 }));
    M.vis($('#pcP'), t, wt('P5', 'new') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, wt('P5', 'job') - 0.2, out, { dx: 60, dy: 0, ...o });
    TLD.forEach((g, i) => { const el = $('#tl' + i); M.vis(el, t, tTl[i] - 0.15, 1e9, POP);
      const th = g.th0 + g.w * Math.max(0, t - tTl[i]), p = P(g.o, g.r, th), u = In(th);
      if (i === 1) place(g.d, p, Tg(th)); else ballAt(g.d, p);
      if (g.ln) { attr(g.ln, 'x2', p[0].toFixed(1)); attr(g.ln, 'y2', p[1].toFixed(1)); }
      const ga = M.o3((t - tTl[i] - 0.2) / 0.5), L = (i === 1 ? 46 : 34) * ga, off = i === 1 ? 14 : 13;
      along(g.a, p, u, L, off); lbl(g.lb, p, u, off + L * 0.5, u[1] * 20 - 6, -u[0] * 20 + 8); g.lb.style.opacity = ga.toFixed(3);
      el.style.background = mix(C.soft, '#FBEBDD', M.io((t - tTl[i]) / 0.3) * (1 - M.io((t - (tTl[i + 1] ?? T1('P6'))) / 0.3))); });
  }

  /* S: stone on a string + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const cut = t >= tCut, bp = stoneAt(t), th = thS(t), uT = cut ? UT : Tg(th), uI = In(th);
    const vd = Math.round(vT(Math.min(t, tSlo)) * 100) / 100, Td = cut ? 0 : MASS * vd * vd / 1;     // displayed values: T from the displayed v
    ballAt(sBall, bp);
    sGh.forEach((g, k) => { const t2 = t - (t > tSlo ? 0.3 : 0.1) * (k + 1), gp = stoneAt(t2); ballAt(g, gp); M.hide(g, t2 < tA || Math.hypot(gp[0] - bp[0], gp[1] - bp[1]) < 4); });
    // string: O to the stone; after the cut it fades
    const sOp = cut ? 1 - M.clamp((t - tCut) / 0.3) : 1; attr(sStr, 'x2', (cut ? TOP[0] : bp[0]).toFixed(1)); attr(sStr, 'y2', (cut ? TOP[1] : bp[1]).toFixed(1)); sStr.style.opacity = sOp.toFixed(3);
    const mid = P(O, R * 0.5, th); attr(sRl, 'x', (mid[0] - 34 * Math.sin(th)).toFixed(1)); attr(sRl, 'y', (mid[1] - 34 * Math.cos(th) + 7).toFixed(1));
    M.vis(sRl, t, tS1 + 0.8, T0('S2'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    const cu = M.clamp((t - tCut) / 0.25) * (1 - M.clamp((t - tCut - 1.2) / 0.3)), cm = [O[0], (O[1] + TOP[1]) / 2];
    attr(sCut, 'd', `M${cm[0] - 14},${cm[1] - 10} L${cm[0] + 14},${cm[1] + 10} M${cm[0] - 14},${cm[1] + 10} L${cm[0] + 14},${cm[1] - 10}`); sCut.style.opacity = cu.toFixed(3);
    // v (blue, along the tangent) and T (orange, along the string to the centre, labelled with its giver)
    const gv = M.o3((t - wt('S2', 'two') + 0.2) / 0.5), gt = M.o3((t - wt('S2', 'pulls') + 0.1) / 0.5);
    along(sV, bp, uT, VPX * vd * gv, 18); lbl(sVl, bp, uT, 18 + VPX * vd + 22); sVl.style.opacity = gv.toFixed(3);
    along(sT, bp, uI, TPX * Td * gt, 18); const tl = 18 + TPX * Td * 0.5; lbl(sTl, bp, uI, tl, uI[1] * 30 - 10, -uI[0] * 30 + 10); lbl(sTw, bp, uI, tl, uI[1] * 30 - 2, -uI[0] * 30 + 30);
    sTl.style.opacity = sTw.style.opacity = (gt * (cut ? 0 : 1)).toFixed(3);
    // after the cut: tangent path (blue) and the outward path that does not happen (red)
    const tanOn = M.clamp((t - wt('S7', 'straight') + 0.2) / 0.3);
    attr(sTan, 'x1', (TOP[0] + 40).toFixed(1)); attr(sTan, 'y1', TOP[1]); attr(sTan, 'x2', (TOP[0] - 330).toFixed(1)); attr(sTan, 'y2', TOP[1]); sTan.style.opacity = (0.8 * tanOn).toFixed(3);
    attr(sTanT, 'x', (TOP[0] - 196).toFixed(1)); attr(sTanT, 'y', (TOP[1] + 46).toFixed(1)); sTanT.style.opacity = M.clamp((t - wt('S7', 'tangent') + 0.1) / 0.3).toFixed(3);
    const outOn = M.clamp((t - wt('S7', 'outward') + 0.1) / 0.3);
    attr(sOut, 'x1', TOP[0]); attr(sOut, 'y1', TOP[1] - 20); attr(sOut, 'x2', TOP[0]); attr(sOut, 'y2', TOP[1] - 20 - 30 * outOn); sOut.style.opacity = outOn.toFixed(3);
    attr(sOutT, 'x', TOP[0] + 14); attr(sOutT, 'y', TOP[1] - 30); sOutT.style.opacity = outOn.toFixed(3);
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    // readout + graph
    M.setT($('#r0'), vd.toFixed(2)); M.setT($('#r1'), '1.00'); M.setT($('#r2'), Td.toFixed(2)); M.setT($('#r3'), Td.toFixed(2));
    const hi = M.io((t - wt('S4', 'jumps')) / 0.3) * (1 - M.io((t - T0('S5')) / 0.3)); $('#r2').style.background = mix('#FFFFFF', '#FBEBDD', hi);
    const vg = Math.min(vd, 4); gCur(x => [x, MASS * x * x], 0, vg);
    const drop = M.io((t - tCut) / 0.4); gDot(vg, MASS * vg * vg * (1 - drop), t > wt('S2', 'two') - 0.2);
    attr(gDrop, 'x1', gr.X(4)); attr(gDrop, 'x2', gr.X(4)); attr(gDrop, 'y1', gr.Y(8)); attr(gDrop, 'y2', gr.Y(8 * (1 - drop)).toFixed(1)); gDrop.style.opacity = drop > 0.02 ? '1' : '0';
    const sh = M.clamp((t - wt('S5', 'curve')) / 0.6); gFull(x => [x, MASS * x * x], vg, vg + (5 - vg) * sh);
    M.vis($('#grP'), t, wt('S5', 'tension') - 0.1, 1e9, POP);
    avA(t, wt('S8', 'centripetal') - 0.2, out);
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 118]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const th = dTh(t), bp = P(DO, DR, th), uT = Tg(th), uI = In(th);
    ballAt(dBall, bp); attr(dStr, 'x2', bp[0].toFixed(1)); attr(dStr, 'y2', bp[1].toFixed(1));
    dGh.forEach((g, k) => { const t2 = t - 0.3 * (k + 1); ballAt(g, P(DO, DR, dTh(t2))); M.hide(g, t2 < tDrun); });
    const gv = M.o3((t - wt('D2', 'speed') + 0.1) / 0.5), ga = M.o3((t - wt('D2', 'acceleration') + 0.1) / 0.5), gt = M.o3((t - wt('D4', 'force') + 0.1) / 0.5);
    along(dV, bp, uT, 100 * gv, 17); lbl(dVl, bp, uT, 140); dVl.style.opacity = gv.toFixed(3);
    // a (red) sits just beside the string; T = F_c (orange) runs along the string
    const side = [uI[1] * 16, -uI[0] * 16];
    if (ga > 0.01) dA.set(bp[0] + uI[0] * 18 + side[0], bp[1] + uI[1] * 18 + side[1], bp[0] + uI[0] * (18 + 80 * ga) + side[0], bp[1] + uI[1] * (18 + 80 * ga) + side[1]); else dA.set(0, 0, 0, 0);
    lbl(dAl, bp, uI, 58, side[0] * 2.6, side[1] * 2.6 + 9); dAl.style.opacity = ga.toFixed(3);
    if (gt > 0.01) dT.set(bp[0] + uI[0] * 18 - side[0], bp[1] + uI[1] * 18 - side[1], bp[0] + uI[0] * (18 + 120 * gt) - side[0], bp[1] + uI[1] * (18 + 120 * gt) - side[1]); else dT.set(0, 0, 0, 0);
    lbl(dTl, bp, uI, 78, -side[0] * 3.6, -side[1] * 3.6 + 9); dTl.style.opacity = gt.toFixed(3);
    M.vis($('#drP'), t, wt('D3', 'net') - 0.1, tStep[3] - 0.2, { ...POP, outDur: 0.2 });
    M.vis($('#drU'), t, tStep[3] + 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'Centripetal'), 0.8);
    M.rise($('#st2'), t, wt('T1', 'not') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* C: side by side + two thinks */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const bp = c0Pos(t), th = c0Th(t), snap = t >= tSnap; ballAt(c0B, bp);
    c0Gh.forEach((g, k) => { const t2 = t - 0.06 * (k + 1), gp = c0Pos(t2); ballAt(g, gp); M.hide(g, Math.hypot(gp[0] - bp[0], gp[1] - bp[1]) < 4); });
    attr(c0Str, 'x2', (snap ? P(CO, CR * 0.55, th)[0] : bp[0]).toFixed(1)); attr(c0Str, 'y2', (snap ? P(CO, CR * 0.55, th)[1] : bp[1]).toFixed(1));
    const w0 = c0W(Math.min(t, tSnap)), Tl = snap ? 0 : 6 + 6 * w0 * w0 * M.o3((t - wt('C2', 'tension') + 0.1) / 0.5);
    along(c0T, bp, In(th), Tl, 15); lbl(c0Tl, bp, In(th), 15 + Tl * 0.5, In(th)[1] * 26 - 8, -In(th)[0] * 26 + 10); c0Tl.style.opacity = snap ? '0' : M.clamp((t - wt('C2', 'tension')) / 0.3).toFixed(3);
    const sp = P(CO, CR * 0.75, c0Th(tSnap)); attr(c0Snap, 'x', (sp[0] + 10).toFixed(1)); attr(c0Snap, 'y', (sp[1] - 10).toFixed(1)); c0Snap.style.opacity = (M.clamp((t - tSnap) / 0.2)).toFixed(3);
    PUC.write($('#c0a'), t, wt('C2', 'pulls') - 0.2, 0.7);
    M.vis($('#c0P'), t, wt('C2', 'harder') - 0.1, 1e9, POP);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o });
    const ct = c1Th(t), cp = P(C1O, C1R, ct); place(c1Car, cp, Tg(ct));
    const gf = M.o3((t - wt('C3', 'friction') + 0.1) / 0.5), cI = In(ct);
    along(c1V, cp, Tg(ct), 90 * M.o3((t - T0('C3') + 0.1) / 0.5), 26); along(c1F, cp, cI, 80 * gf, 16);
    lbl(c1Fl, cp, cI, 56, 16, 0); lbl(c1Fw, cp, cI, 56, 16, 22); c1Fl.style.opacity = c1Fw.style.opacity = gf.toFixed(3);
    M.vis(c1Lim, t, wt('C3', 'limit') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#c1a'), t, wt('C3', 'So') - 0.1, 0.8);
    PUC.write($('#c1b'), t, wt('C4', 'top') - 0.1, 0.8);
    { const k = t > wt('C4', 'Cancel') + 0.1 ? 1 : 0; if ($('#c1a')._k !== k) { $('#c1a')._k = k; $('#c1a').innerHTML = C1A[k]; } }
    M.vis($('#th1'), t, tC5 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tC5, tOpts: wt('C5', 'lower') - 0.4, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'needs') });
    M.vis($('#th2'), t, tM1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tM1, tOpts: wt('M1', 'supplies'), tCount: T1('M1') + 0.05, dur: 3, tAns: T0('M2') - 0.02, tWhy: wt('M2', 'pull') });
  }

  /* R: car on a flat curve, link by link */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exR'), t, tR1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tW1)) / 0.3))); });
    const [x, y, ux, uy, v] = rAt(t), cp = [x, y], u = [ux, uy], n = [uy, -ux];
    place(rCar, cp, u);
    rGh.forEach((g, k) => { const t2 = t - 0.3 * (k + 1), q = rAt(t2); place(g, [q[0], q[1]], [q[2], q[3]]); M.hide(g, t2 < tR1 || Math.hypot(q[0] - x, q[1] - y) < 4); });
    const vd = Math.round(v * 100) / 100, need = MCAR * vd * vd / 20, fmax = MU * MCAR * G, f = Math.min(need, fmax), over = need > fmax + 0.5;
    along(rV, cp, u, 9 * vd, 26);
    const gf = M.o3((t - wt('R3', 'friction') + 0.1) / 0.5), FL = 80 * f / fmax * gf;
    along(rF, cp, n, FL, 16); lbl(rFl, cp, n, 16 + FL * 0.5, u[0] * 22 - 6, u[1] * 22 + 8); lbl(rFw, cp, n, 16 + FL * 0.5, u[0] * 22 + 10, u[1] * 22 + 8);
    rFl.style.opacity = rFw.style.opacity = gf.toFixed(3);
    M.setT(rVc, `v = ${vd.toFixed(2)} m/s`); M.vis(rVc, t, tR1 + 0.5, 1e9, POP);
    // bars: needed m v^2/r (orange, red past the limit) and the most friction can give
    M.vis($('#bN'), t, T0('R2') + 0.1, 1e9, { dy: 10 }); M.vis($('#bM'), t, wt('R3', 'most') - 0.1, 1e9, { dy: 10 }); M.vis($('#bL'), t, wt('R3', 'most'), 1e9, { dy: 0 });
    $('#bNf').style.width = (BW * Math.min(need, BMAX) / BMAX).toFixed(1) + 'px'; $('#bNf').style.background = over ? C.red : FC;
    M.setT($('#bNv'), `${Math.round(need)} N`); $('#bNv').style.color = over ? C.red : FC; M.setT($('#bMv'), `${Math.round(fmax)} N`);
    // past the limit: the tangent at the break point and the path it really takes
    const bi = Math.round((tPast - RT0) / RDT), b = RS[bi], tn = M.clamp((t - tPast - 0.3) / 0.3);
    attr(rTan, 'x1', b[0].toFixed(1)); attr(rTan, 'y1', b[1].toFixed(1)); attr(rTan, 'x2', (b[0] + b[2] * 420).toFixed(1)); attr(rTan, 'y2', (b[1] + b[3] * 420).toFixed(1)); rTan.style.opacity = (0.8 * tn).toFixed(3);
    attr(rTanT, 'x', (b[0] - 330).toFixed(1)); attr(rTanT, 'y', (b[1] - 12).toFixed(1)); rTanT.style.opacity = M.clamp((t - wt('R5', 'tangent') + 0.1) / 0.3).toFixed(3);
    if (t > tPast) { const ci = Math.round((t - RT0) / RDT); let d = ''; for (let i = bi; i <= Math.min(ci, RS.length - 1); i += 12) d += (d ? 'L' : 'M') + RS[i][0].toFixed(1) + ',' + RS[i][1].toFixed(1); attr(rTrail, 'd', d); } else attr(rTrail, 'd', '');
    avR(t, wt('R5', 'Nothing') - 0.1, out);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const th = wTh(t), bp = P(WO, WR, th); ballAt(wB, bp);
    wGh.forEach((g, k) => { const t2 = t - 0.3 * (k + 1); ballAt(g, P(WO, WR, wTh(t2))); M.hide(g, t2 < tWrun); });
    along(wVa, bp, Tg(th), 5 * 12 * M.o3((t - T0('W2') - 0.6) / 0.5), 14);
    along(wFa, bp, In(th), 56 * M.o3((t - tW[0] + 0.1) / 0.5), 13);
    M.vis($('#wN'), t, tW[0] + 0.6, 1e9, { dy: 10 }); M.vis($('#wM'), t, tW[1] + 0.6, 1e9, { dy: 10 });
    M.vis($('#wOk'), t, tW[2] + 0.3, 1e9, POP);
    M.vis($('#wV'), t, tW[3] + 0.6, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'two') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'tension') });
    const gT = M.o3((t - wt('X2', 'Tension') + 0.1) / 0.4), gX = M.o3((t - wt('X2', 'separate') + 0.1) / 0.4), kill = M.io((t - wt('X3', 'only')) / 0.4);
    const bx = GO[0] + GR;
    tgT.set(bx - 18, GO[1] - 18, bx - 18 - 70 * gT, GO[1] - 18); tgTl.style.opacity = gT.toFixed(3);
    if (gX > 0.01) tgX.set(bx - 18, GO[1] + 22, bx - 18 - 70 * gX, GO[1] + 22); else tgX.set(0, 0, 0, 0);
    tgX.g.style.opacity = (1 - 0.75 * kill).toFixed(3); tgXl.style.opacity = (gX * (1 - 0.75 * kill)).toFixed(3); M.drawU(tgSk, kill);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'disc'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + three questions + NEXT */
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
