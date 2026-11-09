// PUC Physics Ep 73: Positive, negative and zero work (Motion notebook, Aarav's bike ride: push, cruise, brake)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const WC = C.teal, FC = C.orange, DC = C.violet, TH = C.gold, VC = C.ac, GC = C.red;   // W teal, forces orange, d violet, theta gold, v blue, g red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const W_ = tc(WC, 'W'), F_ = tc(FC, 'F'), d_ = tc(DC, 'd'), th = tc(TH, '\\theta');
const D2R = Math.PI / 180, cosd = a => Math.cos(a * D2R), sind = a => Math.sin(a * D2R);
const seg = (ln, x1, y1, x2, y2) => { attr(ln, 'x1', x1.toFixed(1)); attr(ln, 'y1', y1.toFixed(1)); attr(ln, 'x2', x2.toFixed(1)); attr(ln, 'y2', y2.toFixed(1)); };
const arcD = (cx, cy, r, a0, a1) => `M${(cx + r * cosd(a0)).toFixed(1)},${(cy - r * sind(a0)).toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 0 ${(cx + r * cosd(a1)).toFixed(1)},${(cy - r * sind(a1)).toFixed(1)}`;
const hatch = (s, x0, x1, y) => { mk(s, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(s, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const sgnTxt = v => v > 0.0005 ? '+' : v < -0.0005 ? '−' : '0';
const MINUS = '−';

Object.assign(M.IC, {
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M5.5 17.5L9 10h6l3.5 7.5', 'M12 17.5L9 10', 'M15 10l-1-3h3'],
  fan: ['M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0', 'M12 10.5C11 6 12 3 14 3s1 5-2 7.5', 'M13.3 12.8c4 1.8 6 4.2 5 6s-4.5-1.8-5-6', 'M10.7 12.8c-4 1.8-6 4.2-5 6s4.5-1.8 5-6'],
  books: ['M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z', 'M4 17a2 2 0 0 1 2-2h12'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook ---------- */
const JOBS = [['bike', 'Bike brakes', 'PUSH BACK ON THE BIKE', 'brakes'], ['fan', 'Ceiling fan', 'BLADES SPIN IN A CIRCLE', 'fan'], ['books', 'Books', 'HELD UP, CARRIED ALONG', 'books']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="300" height="120"></svg></div>`).join('');
const JR = [0, 1, 2].map(i => {
  const s = $('#js' + i);
  if (i !== 1) mk(s, 'line', { x1: 6, y1: 100, x2: 294, y2: 100, stroke: C.dim, 'stroke-width': 2.5 });
  if (i === 0) { [116, 176].forEach(x => mk(s, 'circle', { cx: x, cy: 82, r: 17, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 })); mk(s, 'path', { d: 'M116,82 L134,56 H164 L176,82 M146,82 L134,56', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); }
  if (i === 1) { mk(s, 'circle', { cx: 150, cy: 60, r: 44, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' }); mk(s, 'circle', { cx: 150, cy: 60, r: 7, fill: C.ink }); mk(s, 'line', { x1: 150, y1: 60, x2: 194, y2: 60, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }); }
  if (i === 2) { mk(s, 'rect', { x: 120, y: 60, width: 56, height: 22, rx: 3, fill: C.ac, stroke: C.ink, 'stroke-width': 2 }); mk(s, 'rect', { x: 124, y: 44, width: 48, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }); }
  return { f: PUC.arrow(s, FC, 5, 14), m: PUC.arrow(s, DC, 5, 14) };
});
const JRF = [[160, 66, 100, 66], [194, 60, 194, 18], [148, 112, 148, 84]], JRM = [[200, 112, 290, 112], [212, 70, 212, 108], [190, 112, 290, 112]];
// note row 1: fan blade tip moves along the circle (down at the right edge), motor push along it
JRF[1] = [200, 62, 200, 104]; JRM[1] = [222, 62, 222, 104];
$('#slots').innerHTML = [['fan', 'Fan motor push'], ['bike', 'Brakes'], ['books', 'Hands on the books']].map(([ic, n], i) => `<div class="mt3" id="sl${i}" style="left:20px;top:${36 + i * 100}px">${M.icon(ic, 26, C.ac, 2.2)}<span>${n}</span><b style="background:${C.dim}">?</b></div>`).join('');
const tSl = [wt('H3', 'motor'), wt('H3', 'brakes'), wt('H3', 'hands')];
const TILES = [['+', 'positive', C.ok], [MINUS, 'negative', C.red], ['0', 'none', C.ink]];
$('#wqs').innerHTML = TILES.map(([sg, w, c], i) => `<div class="wq" id="wq${i}"><b style="font:700 26px 'IBM Plex Mono';color:${c}">${sg}</b><span>${['Positive', 'Negative', 'Zero'][i]}</span></div>`).join('');
const tTile = [wt('H4', 'positive'), wt('H4', 'negative'), wt('H4', 'none')];

/* ---------- P: turn the force, watch the sign ---------- */
const pl = $('#plS'), PO = [392, 370], PR = 250;
mk(pl, 'path', { d: `M${PO[0]},${PO[1]} L${PO[0] + PR},${PO[1]} A${PR},${PR} 0 0 0 ${PO[0]},${PO[1] - PR} Z`, fill: C.okBg });
mk(pl, 'path', { d: `M${PO[0]},${PO[1]} L${PO[0]},${PO[1] - PR} A${PR},${PR} 0 0 0 ${PO[0] - PR},${PO[1]} Z`, fill: C.redBg });
mk(pl, 'line', { x1: PO[0], y1: PO[1], x2: PO[0], y2: PO[1] - PR, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0.5 });
txt(pl, PO[0] + 150, PO[1] - 150, 'HELPS', { 'text-anchor': 'middle', fill: '#1F6B3F', 'font-weight': 600, 'font-size': 20, 'letter-spacing': 2 });
txt(pl, PO[0] - 150, PO[1] - 150, 'FIGHTS', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 20, 'letter-spacing': 2 });
txt(pl, PO[0] + 8, PO[1] - PR - 10, '90°', { fill: C.ink, 'font-weight': 600 });
const pD = PUC.arrow(pl, DC, 7, 20), pF = PUC.arrow(pl, FC, 7, 20);
const pDl = it(pl, PO[0] + 200, PO[1] + 44, 'd', DC), pFl = it(pl, 0, 0, 'F', FC);
const pArc = mk(pl, 'path', { stroke: TH, 'stroke-width': 3, fill: 'none' }), pThl = it(pl, 0, 0, 'θ', TH, { 'font-size': 26 });
const pRd = txt(pl, PO[0], PO[1] + 100, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 30 });
mk(pl, 'line', { x1: 60, y1: PO[1], x2: 724, y2: PO[1], stroke: C.ink, 'stroke-width': 2 });
const thP = M.keys([[0, 20], [wt('P3', 'along') - 0.2, 40], [wt('P4', 'against') - 0.2, 140], [wt('P5', 'exactly') - 0.2, 90]], 1.0);
$('#prF').innerHTML = K(`${W_} = ${F_}\\,${d_}\\,\\cos${th}`);

/* ---------- S: Aarav's ride ---------- */
const s = $('#simS'), FY = 430, SC = 12, X0 = 60, WR = 30;
hatch(s, 20, 764, FY);
const tP = wt('S2', 'pedals'), tC_ = tP + 8, tBr = wt('S4', 'brakes'), Tc = tBr - tC_, xb0 = 16 + 4 * Tc, tEnd = tBr + 4;
const xv = t => { if (t <= tP) return [0, 0]; if (t < tC_) { const u = t - tP; return [0.25 * u * u, 0.5 * u]; } if (t < tBr) return [16 + 4 * (t - tC_), 4]; if (t < tEnd) { const u = t - tBr; return [xb0 + 4 * u - 0.5 * u * u, 4 - u]; } return [xb0 + 8, 0]; };
const tRep = tS6 + 0.05, tRes = wt('S7', 'minus') - 0.1, uRep = 2;
const xvS = t => { if (t < tRep) return xv(t); const u = Math.min(4, uRep + 0.25 * Math.max(0, t - tRes)); return [xb0 + 4 * u - 0.5 * u * u, 4 - u]; };
const bikeG = (p, op) => { const g0 = mk(p, 'g', {}), g = mk(g0, 'g', op != null ? { opacity: op } : {});
  const w = [0, 100].map(dx => { const wg = mk(g, 'g', {}); mk(wg, 'circle', { cx: 0, cy: 0, r: WR, fill: 'none', stroke: C.ink, 'stroke-width': 4 }); if (op == null) [0, 60, 120].forEach(a => mk(wg, 'line', { x1: -WR * cosd(a), y1: -WR * sind(a), x2: WR * cosd(a), y2: WR * sind(a), stroke: C.ink, 'stroke-width': 1.5, opacity: 0.6 })); return [wg, dx]; });
  mk(g, 'path', { d: `M0,${FY - WR} L32,${FY - 82} H78 L100,${FY - WR} M45,${FY - WR} L32,${FY - 82} M45,${FY - WR} L0,${FY - WR} M78,${FY - 82} L88,${FY - 100} H104`, fill: 'none', stroke: op == null ? C.ac : C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M24,${FY - 90} H44`, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
  return { g, w }; };
const ghosts = [0, 1, 2].map(() => bikeG(s, 0));
const bike = bikeG(s);
const aF = PUC.arrow(s, FC, 7, 20), af = PUC.arrow(s, FC, 7, 20), aN = PUC.arrow(s, FC, 6, 18), aG = PUC.arrow(s, FC, 6, 18), aV = PUC.arrow(s, VC, 6, 18), aD = PUC.arrow(s, DC, 6, 18);
const lF = it(s, 0, 0, 'F = 40 N', FC, { 'font-size': 22 }), lf = it(s, 0, 0, 'f = 80 N', FC, { 'font-size': 22 }), lN = it(s, 0, 0, 'N', FC, { 'font-size': 24 }), lG = it(s, 0, 0, 'mg', FC, { 'font-size': 24 }), lV = it(s, 0, 0, 'v', VC, { 'font-size': 24 }), lD = it(s, 0, 0, 'd', DC, { 'font-size': 26 });
const sArc = mk(s, 'path', { stroke: TH, 'stroke-width': 3, fill: 'none' }), sThl = txt(s, 0, 0, 'θ = 180°', { fill: TH, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' });
const zp = document.createElement('div'); zp.className = 'pillp good'; zp.style.cssText = 'left:36px;top:76px;height:44px;font-size:20px'; zp.innerHTML = `<i style="font-family:Poppins">N</i> and <i style="font-family:Poppins">mg</i>: zero work`; $('#sim').appendChild(zp);
$('#roG').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${DC}">x</span><span class="v" id="r_x" style="color:${DC}">0.0</span><span class="u">m</span>
  <span class="k" style="color:${WC}">W<sub>push</sub></span><span class="v" id="r_wp" style="color:${WC}">0</span><span class="u">J</span>
  <span class="k" style="color:${WC}">W<sub>brakes</sub></span><span class="v" id="r_wb" style="color:${WC}">0</span><span class="u">J</span>`;
const XT = Math.ceil(xb0 + 8);
const g = PUC.graph($('#grS'), { x: 110, y: 84, w: 540, h: 150, xmax: 48, ymin: -700, ymax: 700, xt: [0, 16, 32, 48], yt: [-640, 0, 640], xl: '', yl: '' });
txt($('#grS'), 664, g.Y(0) + 6, 'x (m)', { fill: DC, 'font-weight': 600 });
const gZ = mk($('#grS'), 'line', { x1: g.X(0), y1: g.Y(0), x2: g.X(48), y2: g.Y(0), stroke: DC, 'stroke-width': 4, 'stroke-dasharray': '6 6', opacity: 0 });
const gcP = g.curve(WC), gcB = g.curve(WC), gdP = g.dot(WC, 10), gdB = g.dot(WC, 10);
const glP = txt($('#grS'), g.X(30), g.Y(640) - 10, 'push: +640', { fill: WC, 'font-weight': 600 }), glB = txt($('#grS'), g.X(28), g.Y(-640) + 6, 'brakes: ' + MINUS + '640', { fill: WC, 'font-weight': 600, 'text-anchor': 'end' });
const glZ = txt($('#grS'), g.X(18), g.Y(0) - 10, 'N, mg: 0', { fill: DC, 'font-weight': 600 });
const PH = [['PEDAL', '+640 J', C.ok], ['CRUISE', '0 J', C.ink], ['BRAKE', MINUS + '640 J', C.red]];
PH.forEach(([n, w, c], i) => { const d = document.createElement('div'); d.className = 'mt3'; d.id = 'ph' + i; d.style.cssText = `left:${36 + i * 242}px;top:140px;width:228px;justify-content:space-between`; d.innerHTML = `<span>${n}</span><b style="background:${c}">${w}</b>`; $('#sim').appendChild(d); });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The brakes took back what my pedals put in!' });

/* ---------- D ---------- */
const STEPS = [[`${W_} = ${F_}\\,${d_}\\cos${th}`, 'F and d are sizes: never negative'],
  [`${th} < 90^\\circ \\Rightarrow \\cos${th} > 0 \\Rightarrow ${W_} > 0`, 'the force helps the motion'],
  [`${th} = 90^\\circ \\Rightarrow \\cos${th} = 0 \\Rightarrow ${W_} = 0`, 'the force does no work'],
  [`${th} > 90^\\circ \\Rightarrow \\cos${th} < 0 \\Rightarrow ${W_} < 0`, 'the force fights; at 180°, W = −Fd']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:36px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'W'), wt('D3', 'Theta'), wt('D4', 'Theta'), wt('D5', 'Theta')];
const ds = $('#drS'), dg = PUC.graph(ds, { x: 110, y: 90, w: 600, h: 320, xmax: 180, ymin: -1, ymax: 1, xt: [0, 45, 90, 135, 180], yt: [-1, 0, 1], xl: '', yl: '' });
{ let p1 = `M${dg.X(0)},${dg.Y(0)}`, p2 = `M${dg.X(90)},${dg.Y(0)}`; for (let a = 0; a <= 90; a += 3) p1 += ` L${dg.X(a).toFixed(1)},${dg.Y(cosd(a)).toFixed(1)}`; for (let a = 90; a <= 180; a += 3) p2 += ` L${dg.X(a).toFixed(1)},${dg.Y(cosd(a)).toFixed(1)}`;
  const z1 = mk(ds, 'path', { d: p1 + ' Z', fill: C.okBg }), z2 = mk(ds, 'path', { d: p2 + ` L${dg.X(180)},${dg.Y(0)} Z`, fill: C.redBg }); ds.insertBefore(z1, ds.firstChild); ds.insertBefore(z2, ds.firstChild); }
const dCv = dg.curve(C.ink, 4); dCv(a => [a, cosd(a)], 0, 180, 90);
txt(ds, dg.X(40), dg.Y(0.3), 'POSITIVE', { 'text-anchor': 'middle', fill: '#1F6B3F', 'font-weight': 600, 'letter-spacing': 2 });
txt(ds, dg.X(140), dg.Y(-0.3), 'NEGATIVE', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'letter-spacing': 2 });
txt(ds, dg.X(90) + 8, dg.Y(0) - 12, 'ZERO', { fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
txt(ds, 724, dg.Y(0) + 40, 'θ (°)', { fill: TH, 'font-weight': 600, 'text-anchor': 'end' }); txt(ds, 50, 80, 'cos θ', { fill: C.ink, 'font-weight': 600 });
const dDot = dg.dot(TH, 12), dGu = mk(ds, 'line', { stroke: TH, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const dRd = txt(ds, 392, 520, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 28 });
const thD = M.keys([[0, 0], [wt('D3', 'under') - 0.2, 45], [wt('D4', 'exactly') - 0.2, 90], [wt('D5', 'over') - 0.2, 135], [wt('D5', 'eighty') - 0.2, 180]], 0.8);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${W_} = ${F_}\\,${d_}\\cos${th}:\\quad ${th} < 90^\\circ \\to +,\\;\\; 90^\\circ \\to 0,\\;\\; > 90^\\circ \\to -`);

/* ---------- C: swing vs catch ---------- */
const c0 = $('#c0S'), c1 = $('#c1S'), SPV = [356, 24], SL = 220, OM = Math.sqrt(9.8 / 2.2);
mk(c0, 'rect', { x: SPV[0] - 120, y: 12, width: 240, height: 12, rx: 3, fill: C.ink2 });
const swR1 = mk(c0, 'line', { stroke: C.ink, 'stroke-width': 3 }), swSeat = mk(c0, 'rect', { width: 64, height: 14, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 });
const swArcP = mk(c0, 'path', { d: `M${(SPV[0] + SL * sind(-25)).toFixed(1)},${(SPV[1] + SL * cosd(-25)).toFixed(1)} A${SL},${SL} 0 0 0 ${(SPV[0] + SL * sind(25)).toFixed(1)},${(SPV[1] + SL * cosd(25)).toFixed(1)}`, stroke: DC, 'stroke-width': 3, 'stroke-dasharray': '6 8', fill: 'none' });
const swF = PUC.arrow(c0, FC, 6, 18), swD = PUC.arrow(c0, DC, 6, 18), swFl = it(c0, 0, 0, 'F', FC, { 'font-size': 26 }), swDl = it(c0, 0, 0, 'd', DC, { 'font-size': 26 });
hatch(c1, 20, 692, 300);
const ball = mk(c1, 'circle', { r: 22, fill: '#8E2B2B', stroke: C.ink, 'stroke-width': 2 });
const mitt = mk(c1, 'g', {}); mk(mitt, 'rect', { x: 0, y: -50, width: 44, height: 100, rx: 20, fill: '#E7B48A', stroke: C.ink, 'stroke-width': 2.5 }); mk(mitt, 'path', { d: 'M8,-30 h20 M8,-10 h20 M8,10 h20', stroke: C.ink, 'stroke-width': 1.5, opacity: 0.5 });
const ctF = PUC.arrow(c1, FC, 6, 18), ctD = PUC.arrow(c1, DC, 6, 18), ctFl = it(c1, 0, 0, 'F', FC, { 'font-size': 26 }), ctDl = it(c1, 0, 0, 'd', DC, { 'font-size': 26 });
const ctArc = mk(c1, 'path', { stroke: TH, 'stroke-width': 2.5, fill: 'none' }), ctThl = txt(c1, 0, 0, 'θ = 180°', { fill: TH, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'middle' });
$('#c0a').innerHTML = K(`${W_} = ${F_}${d_}\\cos ${tc(TH, '0^\\circ')} = +${F_}${d_}`);
$('#c1a').innerHTML = K(`${W_} = ${F_}${d_}\\cos ${tc(TH, '180^\\circ')} = -${F_}${d_}`);
const th1 = PUC.think($('#th1'), { q: 'Diya lowers a bucket into a well, slowly, on a rope. Is the work done by the rope positive, negative or zero?', opts: ['Positive', 'Negative', 'Zero'], right: 1, why: 'Rope pulls up, bucket moves down: θ = 180°, so W < 0.' });

/* ---------- R: the fan, link by link ---------- */
const fs = $('#fanS'), FO = [300, 250], FR = 160, OMF = 0.9;
mk(fs, 'circle', { cx: FO[0], cy: FO[1], r: FR, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const blades = mk(fs, 'g', {});
[0, 120, 240].forEach(a => mk(blades, 'path', { d: `M0,-10 L${FR - 6},-18 Q${FR + 4},0 ${FR - 6},18 L0,10 Z`, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2, transform: `rotate(${a})` }));
mk(fs, 'circle', { cx: FO[0], cy: FO[1], r: 18, fill: C.ink });
const tip = mk(fs, 'circle', { r: 8, fill: C.ink });
const fV = PUC.arrow(fs, VC, 6, 18), fP = PUC.arrow(fs, FC, 6, 18), fVl = it(fs, 0, 0, 'motion', VC, { 'font-size': 22 }), fPl = it(fs, 0, 0, 'pull', FC, { 'font-size': 22 });
const fRa = mk(fs, 'path', { stroke: TH, 'stroke-width': 2.5, fill: 'none' }), fRal = txt(fs, 0, 0, '90°', { fill: TH, 'font-weight': 600, 'font-size': 20 });
const fW = txt(fs, FO[0] + FR + 50, FO[1] - 120, 'W = 0', { fill: WC, 'font-weight': 600, 'font-size': 34 });
const ANS = [['fan', 'Fan motor', '+', C.ok], ['bike', 'Brakes', MINUS, C.red], ['books', 'Books', '0', C.ink]];
$('#ans').innerHTML = ANS.map(([ic, n, sg, c], i) => `<div class="mt3" id="an${i}" style="left:${36 + i * 238}px;top:490px">${M.icon(ic, 24, C.ac, 2.2)}<span>${n}</span><b style="background:${c}">${sg}</b></div>`).join('');
const tAn = [wt('R6', 'positive'), wt('R6', 'negative'), wt('R6', 'zero')];
const LKS = ['The tip moves along the circle\'s edge', 'The pull points to the centre', 'Centre line is at 90° to the edge', `${K('\\cos 90^\\circ = 0')}, so ${K(`${W_} = 0`)} all the way round`];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];

/* ---------- W ---------- */
$('#wq').innerHTML = `A box is pulled ${K('3\\,\\text{m}')} by a ${K('10\\,\\text{N}')} force at ${K('60^\\circ')}. Friction is ${K('3\\,\\text{N}')}. Find the work done by each force.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(WC, 'W_F')} = 10 \\times 3 \\times \\cos 60^\\circ = +15\\,\\text{J}`)],
  [K(`${tc(WC, 'W_f')} = 3 \\times 3 \\times \\cos 180^\\circ = -9\\,\\text{J}`)],
  [K(`${tc(WC, 'W_N')} = ${tc(WC, 'W_{mg}')} = 0 \\quad (90^\\circ)`)],
  [K(`${tc(WC, 'W_{\\text{total}}')} = 15 - 9 = 6\\,\\text{J}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
const tW = [wt('W3', 'pull'), wt('W4', 'Friction'), wt('W5', 'Gravity'), wt('W6', 'total')];
const ws = $('#wrS'), WF = 360, BX = [250, 390];
hatch(ws, 40, 744, WF);
mk(ws, 'rect', { x: BX[0], y: WF - 100, width: BX[1] - BX[0], height: 100, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const wFa = PUC.arrow(ws, FC, 6, 18), wfa = PUC.arrow(ws, FC, 6, 18), wNa = PUC.arrow(ws, FC, 6, 18), wGa = PUC.arrow(ws, FC, 6, 18), wDa = PUC.arrow(ws, DC, 6, 18);
const WL = [it(ws, 470, 190, '10 N', FC, { 'font-size': 22 }), it(ws, 150, WF - 14, '3 N', FC, { 'font-size': 22 }), it(ws, 334, 158, 'N', FC, { 'font-size': 24 }), it(ws, 334, 452, 'mg', FC, { 'font-size': 24 }), it(ws, 470, WF + 70, 'd = 3 m', DC, { 'font-size': 22 })];
const WT = [txt(ws, 560, 220, '+15 J', { fill: WC, 'font-weight': 600, 'font-size': 26 }), txt(ws, 70, WF - 40, MINUS + '9 J', { fill: WC, 'font-weight': 600, 'font-size': 26 }), txt(ws, 380, 170, '0', { fill: WC, 'font-weight': 600, 'font-size': 26 }), txt(ws, 390, 462, '0', { fill: WC, 'font-weight': 600, 'font-size': 26 })];
$('#wc2').innerHTML = 'Total work = +6 J';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${W_} = -9\\,\\text{J}`)} means the work points backwards`, right: `${K(`${W_} = -9\\,\\text{J}`)} is a scalar: the force opposes the motion` });
const tg = $('#tg');
const tgA = PUC.arrow(tg, C.ink, 6, 18); const tgX = mk(tg, 'path', { d: 'M80,60 L160,140 M160,60 L80,140', stroke: C.red, 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none' });
const tgN = txt(tg, 300, 124, MINUS + '9 J', { 'text-anchor': 'middle', 'font-size': 64, 'font-weight': 600, fill: WC });
const tgL0 = txt(tg, 120, 196, 'NO DIRECTION', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.red, 'letter-spacing': 1.5 });
const tgL1 = txt(tg, 300, 196, 'JUST A NUMBER', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.ok, 'letter-spacing': 1.5 });
const where = PUC.where($('#wa'), { on: [], type: 'The sign of the work done by gravity, friction, normal force and tension, often on a slope' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 262,
  q: `A 2 kg block slides 5 m down a rough 37° slope. ${K('\\mu = 0.5')}, ${K('g = 10\\,\\text{m/s}^2')}, sin 37° = 0.6, cos 37° = 0.8. Work done by gravity, friction and the normal force:`,
  opts: [`+60 J, ${MINUS}40 J, 0`, '+60 J, +40 J, 0', `+100 J, ${MINUS}40 J, 0`, `+80 J, ${MINUS}30 J, 0`], right: 0 });
const so = PUC.solution($('#so'), [[K(`m${tc(GC, 'g')}\\sin${th} = 12\\,\\text{N} \\Rightarrow +60\\,\\text{J}`)], [K(`\\mu m${tc(GC, 'g')}\\cos${th} = 8\\,\\text{N} \\Rightarrow -40\\,\\text{J}`)], [K(`N \\perp ${d_} \\Rightarrow 0`)], [K('\\Rightarrow \\textbf{A}')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Gravity'), wt('A3', 'Friction'), wt('A4', 'normal'), wt('A4', 'Zero')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 450, title: 'Recap · the sign of work', y0: 104, dy: 88, txt: [0, 1, 1, 1],
  lines: [K(`${W_} = ${F_}\\,${d_}\\cos${th} \\qquad ${F_},\\,${d_} \\geq 0`), '<span class="th">θ</span> &lt; 90°: <b style="color:#1F6B3F">positive</b>, the force helps the motion',
    '<span class="th">θ</span> = 90°: <b>zero</b> (normal force, circular pull)', `<span class="th">θ</span> &gt; 90°: <b style="color:var(--red)">negative</b>; at 180°, W = ${MINUS}Fd`] });
const YQ = ['F and d are never negative. So what makes work negative?', 'Why does the inward pull on a fan blade do no work?', 'When Diya lowers the bucket, what is the sign of the work by gravity?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 74', topic: 'A rubber band pulls back harder: Work Done by a Variable Force', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}
const placeBike = (b, xm) => { const x = X0 + xm * SC; attr(b.g.parentNode, 'transform', `translate(${x.toFixed(1)},0)`); b.w.forEach(([wg, dx]) => attr(wg, 'transform', `translate(${dx},${FY - WR}) rotate(${(xm * SC / WR / D2R).toFixed(1)})`)); return x; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JR.forEach((r, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const um = M.o3((t - tMorph - 0.8 - i * 0.3) / 0.5), uf = M.o3((t - tMorph - 1.2 - i * 0.3) / 0.5), [a, b, c, d] = JRF[i], [e, f, gg, h] = JRM[i];
      r.f.set(a, b, a + (c - a) * uf, b + (d - b) * uf); r.m.set(e, f, e + (gg - e) * um, f + (h - f) * um); });
    vis($('#hjP'), t, wt('H2', 'different') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis($('#hkSk'), t, tH3 + 0.2, 1e9, { dy: 20 });
    tSl.forEach((tt, i) => vis($('#sl' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    TILES.forEach((_, i) => { const el = $('#wq' + i); vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (1 - M.io((t - (i < 2 ? tTile[i + 1] : wt('H4', 'match'))) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = thP(t), aR = Math.round(a), cR = cosd(aR), ud = M.o3((t - tP1 - 0.4) / 0.5), uf = M.o3((t - tP1 - 0.7) / 0.5);
    pD.set(PO[0], PO[1], PO[0] + 290 * ud, PO[1]); pDl.style.opacity = ud.toFixed(3);
    const fx = PO[0] + 220 * cosd(a) * uf, fy = PO[1] - 220 * sind(a) * uf; pF.set(PO[0], PO[1], fx, fy);
    attr(pFl, 'x', (PO[0] + 240 * cosd(a) - 10).toFixed(1)); attr(pFl, 'y', (PO[1] - 240 * sind(a) - 4).toFixed(1)); pFl.style.opacity = uf.toFixed(3);
    attr(pArc, 'd', arcD(PO[0], PO[1], 64, 0, a)); pArc.style.opacity = uf.toFixed(3);
    attr(pThl, 'x', (PO[0] + 80 * cosd(a / 2) - 8).toFixed(1)); attr(pThl, 'y', (PO[1] - 80 * sind(a / 2) + 8).toFixed(1)); pThl.style.opacity = uf.toFixed(3);
    M.setT(pRd, `θ = ${aR}°   cos θ = ${Math.abs(cR) < 5e-4 ? '0.00' : (cR > 0 ? '+' : MINUS) + Math.abs(cR).toFixed(2)}`); vis(pRd, t, tP1 + 0.9, 1e9, { dy: 8 });
    vis($('#pr'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#prF'), t, tP1 + 0.6, 0.9);
    vis($('#sg0'), t, wt('P2', 'F') - 0.1, 1e9, POP); vis($('#sg1'), t, wt('P2', 'd') - 0.1, 1e9, POP); vis($('#sg2'), t, wt('P2', 'cos') - 0.1, 1e9, POP);
    const sg = sgnTxt(cR), col = sg === '+' ? C.ok : sg === '0' ? C.ink : C.red;
    M.setT($('#sgv'), sg); $('#sgv').style.color = col; $('#sg2').style.background = mix(C.soft, sg === '+' ? C.okBg : sg === '0' ? C.soft : C.redBg, M.io((t - wt('P2', 'cos')) / 0.3));
    const shown = t > wt('P3', 'positive', 1) - 0.1;
    $('#prW').innerHTML = K(`${W_} ${sg === '+' ? '> 0' : sg === '0' ? '= 0' : '< 0'}`); vis($('#prW'), t, wt('P3', 'work') - 0.1, 1e9, POP);
    const pp = $('#prP'); vis(pp, t, wt('P3', 'helps') - 0.1, 1e9, POP);
    const msg = sg === '+' ? 'The force helps the motion' : sg === '0' ? 'The force does no work' : 'The force fights the motion'; if (pp._m !== msg) { pp._m = msg; pp.textContent = msg; }
    pp.style.background = sg === '+' ? C.okBg : sg === '0' ? C.soft : C.redBg; pp.style.color = sg === '+' ? '#1F6B3F' : sg === '0' ? C.ink : C.red;
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const [xm, v] = xvS(t), x = placeBike(bike, xm);
    const moving = v > 0.05 && !(t > tRep && t < tRes);
    ghosts.forEach((gh, k) => { const dt = (t > tRep ? 1.2 : 0.3) * (k + 1), [gx] = xvS(t - dt), okG = !(t > tRep && t - dt < tRes);
      placeBike(gh, gx); gh.g.style.opacity = moving && okG && Math.abs(gx - xm) * SC > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    const rep = t >= tRep;
    // push during pedalling, brake force while braking (and in the replay)
    const uF = t > tP - 0.2 && t < tC_ && !rep ? M.o3((t - tP + 0.2) / 0.4) : 0;
    aF.set(x + 104, FY - 56, x + 104 + 40 * 1.6 * uF, FY - 56); attr(lF, 'x', (x + 104).toFixed(1)); attr(lF, 'y', FY - 70); lF.style.opacity = uF.toFixed(3);
    const uf = rep ? M.o3((t - wt('S7', 'brake') + 0.1) / 0.5) : (t > tBr - 0.2 && t < tEnd + 0.4 ? M.o3((t - tBr + 0.2) / 0.4) : 0);
    af.set(x - 4, FY - 56, x - 4 - 80 * 1.6 * uf, FY - 56); attr(lf, 'x', (x - 4 - 80 * 1.6).toFixed(1)); attr(lf, 'y', FY - 70); lf.style.opacity = uf.toFixed(3);
    const uz = M.o3((t - wt('S5', 'road') + 0.1) / 0.5) * (1 - M.io((t - tS6 + 0.2) / 0.3));
    aN.set(x + 50, FY - 4, x + 50, FY - 4 - 110 * uz); attr(lN, 'x', (x + 58).toFixed(1)); attr(lN, 'y', FY - 120); lN.style.opacity = uz.toFixed(3);
    const ug = M.o3((t - wt('S5', 'gravity') + 0.1) / 0.5) * (1 - M.io((t - tS6 + 0.2) / 0.3));
    aG.set(x + 66, FY - 70, x + 66, FY - 70 + 110 * ug); attr(lG, 'x', (x + 74).toFixed(1)); attr(lG, 'y', FY + 34); lG.style.opacity = ug.toFixed(3);
    vis(zp, t, wt('S5', 'Zero') - 0.1, 1e9, POP);
    const phT = [[tP, tC_, wt('S2', 'plus')], [tC_, tBr, wt('S3', 'no', 2)], [tBr, tEnd, wt('S4', 'Minus')]];
    phT.forEach(([a0, a1, tw], i) => { const el = $('#ph' + i); vis(el, t, tS1 + 0.6 + i * 0.1, 1e9, { dy: 10 }); const on = !rep && t >= a0 && t < a1 + 0.3 ? 1 : 0; el.style.background = on ? C.ac2 : C.soft; vis(el.querySelector('b'), t, tw - 0.1, 1e9, { ...POP, sc: 0.4 }); });
    const vL = v * 16; aV.set(x + 40, FY - 128, x + 40 + vL, FY - 128); attr(lV, 'x', (x + 48 + vL).toFixed(1)); attr(lV, 'y', FY - 120); lV.style.opacity = vL > 6 ? 1 : 0;
    const uD = rep ? M.o3((t - wt('S7', 'moves') + 0.1) / 0.5) : 0; aD.set(x + 20, FY + 44, x + 20 + 120 * uD, FY + 44); attr(lD, 'x', (x + 150).toFixed(1)); attr(lD, 'y', FY + 54); lD.style.opacity = uD.toFixed(3);
    const ua = rep ? M.io((t - wt('S7', 'Theta') + 0.1) / 0.4) : 0; attr(sArc, 'd', arcD(x - 4, FY - 56, 36, 0, 180)); sArc.style.opacity = ua.toFixed(3);
    attr(sThl, 'x', (x - 4).toFixed(1)); attr(sThl, 'y', FY - 100); sThl.style.opacity = ua.toFixed(3);
    vis($('#slo'), t, tRep, tS8 - 0.3, { ...POP, sc: 0.8 });
    // readout: round x first, then work from it
    const xR = Math.round(xm * 10) / 10, wp = 40 * Math.min(xR, 16), wb = -80 * Math.max(0, xR - xb0);
    M.setT($('#r_v'), v.toFixed(1)); M.setT($('#r_x'), xR.toFixed(1)); M.setT($('#r_wp'), wp.toFixed(0)); M.setT($('#r_wb'), Math.abs(wb) < 0.5 ? '0' : MINUS + Math.abs(wb).toFixed(0));
    const xMax = rep ? xb0 + 8 : xm;
    gcP(q => [q, 40 * Math.min(q, 16)], 0, xMax); gcB(q => [q, -80 * Math.max(0, q - xb0)], 0, xMax);
    gdP(xm, 40 * Math.min(xm, 16), t > tP - 0.3); gdB(xm, -80 * Math.max(0, xm - xb0), t > tP - 0.3);
    gZ.style.opacity = (0.8 * M.io((t - wt('S5', 'Zero') + 0.1) / 0.4)).toFixed(3); glZ.style.opacity = gZ.style.opacity;
    glP.style.opacity = M.io((t - wt('S2', 'plus')) / 0.3).toFixed(3); glB.style.opacity = M.io((t - wt('S4', 'Minus')) / 0.3).toFixed(3);
    avA(t, wt('S4', 'joules') + 0.2, OUT('S5') + 2.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const a = thD(t), aR = Math.round(a), cR = cosd(aR), on = t > tStep[1] - 0.3;
    dDot(a, cosd(a), on); seg(dGu, dg.X(a), dg.Y(cosd(a)), dg.X(a), dg.Y(0)); dGu.style.opacity = on ? 0.8 : 0;
    M.setT(dRd, `θ = ${aR}°   cos θ = ${Math.abs(cR) < 5e-4 ? '0.00' : (cR > 0 ? '+' : MINUS) + Math.abs(cR).toFixed(2)}`); dRd.style.opacity = on ? 1 : 0;
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Positive') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Zero') - 0.1, 0.8);
  }

  /* C: swing vs catch */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#c0'), t, T0('C2') - 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#c1'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tau = Math.max(0, t - T0('C2')), phi = -25 * Math.cos(OM * tau), dphi = 25 * OM * Math.sin(OM * tau);
    const sx = SPV[0] + SL * sind(phi), sy = SPV[1] + SL * cosd(phi);
    seg(swR1, SPV[0], SPV[1], sx, sy); attr(swSeat, 'x', (sx - 32).toFixed(1)); attr(swSeat, 'y', (sy - 2).toFixed(1));
    const fwd = dphi > 0 ? M.clamp(dphi / 30) : 0, tx = cosd(phi), ty = -sind(phi);
    const uF = fwd * M.io((t - wt('C2', 'forward') + 0.1) / 0.3);
    swF.set(sx - 40 * tx - 34, sy - 40 * ty + 6, sx - 34 + 30 * tx * uF, sy + 6 + 30 * ty * uF); swFl.style.opacity = uF.toFixed(3); attr(swFl, 'x', (sx - 70).toFixed(1)); attr(swFl, 'y', (sy - 16).toFixed(1));
    const uD = fwd * M.io((t - wt('C2', 'motion') + 0.1) / 0.3); swD.set(sx + 40, sy + 34, sx + 40 + 70 * tx * uD, sy + 34 + 70 * ty * uD); swDl.style.opacity = uD.toFixed(3); attr(swDl, 'x', (sx + 120).toFixed(1)); attr(swDl, 'y', (sy + 48).toFixed(1));
    M.draw(swArcP, t, wt('C2', 'motion') - 0.2, 0.5);
    vis($('#sn0'), t, wt('C2', 'Positive') - 0.1, 1e9, POP); PUC.write($('#c0a'), t, wt('C2', 'Theta') - 0.1, 0.9);
    // catch: ball flies in, slows to rest in the moving hands
    const t0c = wt('C3', 'moves') - 0.2, ub = M.clamp((t - t0c) / 1.0), us = M.clamp((t - t0c - 1.0) / 0.5);
    const bxp = 70 + 440 * ub + 60 * (1 - (1 - us) * (1 - us)), mx = 540 + 60 * (1 - (1 - us) * (1 - us));
    attr(ball, 'cx', bxp.toFixed(1)); attr(ball, 'cy', 200); ball.style.opacity = M.clamp((t - T0('C3')) / 0.2).toFixed(3);
    attr(mitt, 'transform', `translate(${mx.toFixed(1)},200)`);
    const uH = M.io((t - wt('C3', 'push') + 0.1) / 0.3); ctF.set(mx + 2, 260, mx + 2 - 90 * uH, 260); attr(ctFl, 'x', (mx - 80).toFixed(1)); attr(ctFl, 'y', 252); ctFl.style.opacity = uH.toFixed(3);
    const uM = M.io((t - wt('C3', 'moves') + 0.1) / 0.3); ctD.set(140, 130, 300, 130); ctD.g.style.opacity = uM.toFixed(3); attr(ctDl, 'x', 310); attr(ctDl, 'y', 140); ctDl.style.opacity = uM.toFixed(3);
    const ua = M.io((t - wt('C3', 'Theta') + 0.1) / 0.4); attr(ctArc, 'd', arcD(mx - 44, 260, 30, 0, 180)); ctArc.style.opacity = 0; attr(ctThl, 'x', 220); attr(ctThl, 'y', 108); ctThl.style.opacity = ua.toFixed(3);
    vis($('#sn1'), t, wt('C3', 'Negative') - 0.1, 1e9, POP); PUC.write($('#c1a'), t, wt('C3', 'Theta') - 0.1, 0.9);
    vis($('#th1'), t, T0('C4') + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'Is') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'The') });
  }

  /* R: the fan */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const al = -OMF * Math.max(0, t - tR1) / D2R;                 // degrees, anticlockwise on screen
    attr(blades, 'transform', `translate(${FO[0]},${FO[1]}) rotate(${al.toFixed(2)})`);
    const ang = -al, tx0 = FO[0] + (FR - 4) * cosd(-ang), ty0 = FO[1] + (FR - 4) * sind(-ang);   // tip of blade 0 (screen coords)
    attr(tip, 'cx', tx0.toFixed(1)); attr(tip, 'cy', ty0.toFixed(1));
    const ux = Math.cos(-ang * D2R), uy = Math.sin(-ang * D2R), vx = uy, vy = -ux;   // radial out (ux,uy); tangent along the motion (blades turn anticlockwise on screen)
    const uV = M.o3((t - wt('R2', 'moves') + 0.1) / 0.5), uP = M.o3((t - wt('R3', 'pull') + 0.1) / 0.5);
    fV.set(tx0, ty0, tx0 + 100 * vx * uV, ty0 + 100 * vy * uV); attr(fVl, 'x', (tx0 + 112 * vx - 30).toFixed(1)); attr(fVl, 'y', (ty0 + 112 * vy + 8).toFixed(1)); fVl.style.opacity = uV.toFixed(3);
    fP.set(tx0, ty0, tx0 - 90 * ux * uP, ty0 - 90 * uy * uP); attr(fPl, 'x', (tx0 - 60 * ux + 14 * vx - 20).toFixed(1)); attr(fPl, 'y', (ty0 - 60 * uy + 14 * vy + 26).toFixed(1)); fPl.style.opacity = uP.toFixed(3);
    const k = 18, p1x = tx0 - k * ux, p1y = ty0 - k * uy;
    attr(fRa, 'd', `M${p1x.toFixed(1)},${p1y.toFixed(1)} L${(p1x + k * vx).toFixed(1)},${(p1y + k * vy).toFixed(1)} L${(tx0 + k * vx).toFixed(1)},${(ty0 + k * vy).toFixed(1)}`);
    const ur = M.io((t - wt('R4', 'ninety') + 0.1) / 0.3); fRa.style.opacity = ur.toFixed(3);
    attr(fRal, 'x', (tx0 + 30 * ux + 20 * vx - 14).toFixed(1)); attr(fRal, 'y', (ty0 + 30 * uy + 20 * vy + 6).toFixed(1)); fRal.style.opacity = ur.toFixed(3);
    vis(fW, t, wt('R5', 'zero') - 0.1, 1e9, POP);
    tLk.forEach((tt, i) => { const el = $('#lk' + i); vis(el, t, tt - 0.1, 1e9, { dx: -24, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('R6'))) / 0.3))); });
    tAn.forEach((tt, i) => vis($('#an' + i), t, tt - 0.15, 1e9, POP));
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const u = k => M.o3((t - k + 0.1) / 0.5);
    const uF = u(wt('W2', 'force')), uf = u(wt('W2', 'Friction')), uN = u(wt('W5', 'normal')), uG = u(wt('W5', 'Gravity')), uD = u(wt('W2', 'pulled'));
    wFa.set(BX[1], WF - 80, BX[1] + 140 * cosd(60) * uF, WF - 80 - 140 * sind(60) * uF); wfa.set(BX[0], WF - 6, BX[0] - 90 * uf, WF - 6);
    wNa.set(320, WF - 100, 320, WF - 100 - 90 * uN); wGa.set(320, WF - 40, 320, WF - 40 + 110 * uG); wDa.set(BX[0], WF + 44, BX[0] + 200 * uD, WF + 44);
    [uF, uf, uN, uG, uD].forEach((v, i) => { WL[i].style.opacity = v.toFixed(3); });
    vis(WT[0], t, wt('W3', 'Plus') - 0.1, 1e9, POP); vis(WT[1], t, wt('W4', 'Minus') - 0.1, 1e9, POP); vis(WT[2], t, wt('W5', 'Zero') - 0.1, 1e9, POP); vis(WT[3], t, wt('W5', 'zero', 1) - 0.1, 1e9, POP);
    vis($('#wc2'), t, wt('W6', 'six') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'negative') - 0.1, tStrike: wt('X3', 'scalar') - 0.1, tRight: wt('X3', 'minus') });
    const ua = M.o3((t - wt('X2', 'backwards') + 0.1) / 0.5); tgA.set(180, 100, 180 - 120 * ua, 100);
    M.draw(tgX, t, wt('X3', 'scalar') - 0.1, 0.4); vis(tgL0, t, wt('X3', 'scalar'), 1e9, { dy: 6 });
    vis(tgN, t, wt('X3', 'minus') - 0.1, 1e9, { dy: 10 }); vis(tgL1, t, wt('X3', 'opposes'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'sign') });
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
