// PUC Physics Ep 93: Centre of mass of common bodies (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const XC = C.violet, MC = C.ink, TC = C.gold, IC = C.ink;                 // position / distance violet, mass ink, angle gold
const METAL = '#8D99AE', PLATE = '#C8D1E0', SHEET = '#EAF2FD', BAT = '#D9B07A';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const D2R = Math.PI / 180;
const cmM = (p, r = 15) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: IC, 'stroke-width': r > 10 ? 4 : 3 }); mk(g, 'path', { d: `M${-r + 3.5},0 H${r - 3.5} M0,${-r + 3.5} V${r - 3.5}`, stroke: TC, 'stroke-width': r > 10 ? 4 : 3, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const pol = (cx, cy, r, a) => [cx + r * Math.cos(a * D2R), cy - r * Math.sin(a * D2R)];
// arc of angle phi (deg) centred on the downward direction
const arcD = (cx, cy, r, phi) => { if (phi >= 359.5) return `M${cx - r},${cy} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0`; const p0 = pol(cx, cy, r, -90 - phi / 2), p1 = pol(cx, cy, r, -90 + phi / 2); return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${phi > 180 ? 1 : 0} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const dArc = phi => phi < 0.01 ? 1 : Math.sin(phi * D2R / 2) / (phi * D2R / 2);   // d / R for an arc

Object.assign(M.IC, {
  bat: ['M3 21l4-4', 'M7 17l10-10a2.8 2.8 0 0 1 4 4L11 21H7z'],
  plate: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  ring: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4'), tP5 = T0('P5'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9');
const tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bat', 'A cricket bat', 'NOT AT THE MIDDLE'], ['plate', 'A steel plate', 'AT ITS CENTRE'], ['ring', 'A bangle', 'IN EMPTY SPACE']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'cricket'), wt('H1', 'steel'), wt('H1', 'bangle')];
$('#jrs').innerHTML = JOBS.map(([, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="120"></svg></div>`).join('');
const jc = [];
{ const s0 = $('#jsv0'); mk(s0, 'rect', { x: 40, y: 54, width: 80, height: 12, rx: 5, fill: '#7A4434', stroke: IC, 'stroke-width': 2 }); mk(s0, 'path', { d: 'M118,46 H290 Q300,60 290,74 H118 Z', fill: BAT, stroke: IC, 'stroke-width': 2.5 }); const c = cmM(s0, 9); c.set(212, 60); jc.push(c); }
{ const s1 = $('#jsv1'); mk(s1, 'circle', { cx: 170, cy: 60, r: 46, fill: PLATE, stroke: IC, 'stroke-width': 2.5 }); mk(s1, 'circle', { cx: 170, cy: 60, r: 30, fill: 'none', stroke: METAL, 'stroke-width': 2 }); const c = cmM(s1, 9); c.set(170, 60); jc.push(c); }
{ const s2 = $('#jsv2'); mk(s2, 'circle', { cx: 170, cy: 60, r: 44, fill: 'none', stroke: METAL, 'stroke-width': 9 }); const c = cmM(s2, 9); c.set(170, 60); jc.push(c); }
const hs = $('#hkS'), HC = [270, 284];
const hSh = mk(hs, 'rect', { x: HC[0] - 170, y: HC[1] - 170, width: 340, height: 340, rx: 6, fill: SHEET, stroke: '#9DB8E8', 'stroke-width': 2.5 });
const hRing = mk(hs, 'circle', { cx: HC[0], cy: HC[1], r: 112, fill: 'none', stroke: METAL, 'stroke-width': 16 });
const hTip = mk(hs, 'circle', { cx: HC[0], cy: HC[1], r: 26, fill: 'none', stroke: IC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const hTipL = txt(hs, HC[0], HC[1] + 60, 'fingertip below', { 'text-anchor': 'middle', fill: IC, 'font-weight': 600, 'font-size': 17 });
const hCm = cmM(hs, 13); hCm.set(HC[0], HC[1]);
const hNo = txt(hs, HC[0], HC[1] - 42, 'no metal here', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 19 });

/* ---------- P ---------- */
const ps = $('#pqS'), PRY = 250, PB = [...Array(10)].map((_, k) => 96 + k * 60);
const pBits = PB.map(x => mk(ps, 'rect', { x, y: PRY - 22, width: 52, height: 44, rx: 6, fill: C.ac2, stroke: C.ac, 'stroke-width': 2 }));
const pArcs = [0, 1, 2, 3, 4].map(k => { const a = PB[k] + 26, b = PB[9 - k] + 26, h = 30 + (4 - k) * 22; return mk(ps, 'path', { d: `M${a},${PRY - 26} Q${(a + b) / 2},${PRY - 26 - 2 * h} ${b},${PRY - 26}`, fill: 'none', stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }); });
const pMid = mk(ps, 'line', { x1: 392, y1: PRY - 150, x2: 392, y2: PRY + 60, stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '3 6' });
const pCm = cmM(ps, 15); pCm.set(392, PRY);
const pBr = mk(ps, 'path', { d: `M96,${PRY + 70} V${PRY + 80} H392 V${PRY + 70}`, fill: 'none', stroke: XC, 'stroke-width': 3 }), pBrL = txt(ps, 244, PRY + 110, 'L/2', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const pBr2 = mk(ps, 'path', { d: `M392,${PRY + 70} V${PRY + 80} H692 V${PRY + 70}`, fill: 'none', stroke: XC, 'stroke-width': 3 }), pBrL2 = txt(ps, 542, PRY + 110, 'L/2', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const tPair = [0, 1, 2, 3, 4].map(k => wt('P2', 'Pair') + 0.2 + k * 0.45);
const BXN = ['ROD', 'RING', 'DISC', 'SPHERE', 'RECTANGLE', 'TRIANGLE'];
$('#bxs').innerHTML = BXN.map((n, i) => `<div class="bx" id="bx${i}" style="left:${36 + (i % 3) * 244}px;top:${84 + Math.floor(i / 3) * 170}px"><div class="bn">${n}</div><svg id="bxS${i}" width="224" height="150"></svg></div>`).join('') +
  `<div class="pillp" id="pmP" style="left:36px;top:490px">Triangle plate: where the three medians meet</div>`;
const BC = [112, 88];
{ const b = $('#bxS0'); mk(b, 'line', { x1: 34, y1: BC[1], x2: 190, y2: BC[1], stroke: METAL, 'stroke-width': 12, 'stroke-linecap': 'round' }); }
{ const b = $('#bxS1'); mk(b, 'circle', { cx: BC[0], cy: BC[1], r: 44, fill: 'none', stroke: METAL, 'stroke-width': 8 }); }
{ const b = $('#bxS2'); mk(b, 'circle', { cx: BC[0], cy: BC[1], r: 46, fill: PLATE, stroke: IC, 'stroke-width': 2.5 }); }
{ const b = $('#bxS3'); mk(b, 'circle', { cx: BC[0], cy: BC[1], r: 46, fill: '#A9B4C8', stroke: IC, 'stroke-width': 2.5 }); mk(b, 'ellipse', { cx: BC[0], cy: BC[1], rx: 46, ry: 14, fill: 'none', stroke: IC, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }); mk(b, 'circle', { cx: BC[0] - 16, cy: BC[1] - 18, r: 9, fill: '#D5DCE8' }); }
{ const b = $('#bxS4'); mk(b, 'rect', { x: BC[0] - 70, y: BC[1] - 40, width: 140, height: 80, fill: PLATE, stroke: IC, 'stroke-width': 2.5 }); mk(b, 'path', { d: `M${BC[0] - 70},${BC[1] - 40} L${BC[0] + 70},${BC[1] + 40} M${BC[0] + 70},${BC[1] - 40} L${BC[0] - 70},${BC[1] + 40}`, stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 5' }); }
const TRI = [[112, 40], [46, 136], [178, 136]], TG = [(112 + 46 + 178) / 3, (40 + 136 + 136) / 3];
{ const b = $('#bxS5'); mk(b, 'path', { d: `M${TRI[0]} L${TRI[1]} L${TRI[2]} Z`.replace(/,/g, ' ').replace(/(\d) (\d)/g, '$1,$2'), fill: PLATE, stroke: IC, 'stroke-width': 2.5 });
  [0, 1, 2].forEach(i => { const a = TRI[i], b1 = TRI[(i + 1) % 3], b2 = TRI[(i + 2) % 3]; mk(b, 'line', { x1: a[0], y1: a[1], x2: (b1[0] + b2[0]) / 2, y2: (b1[1] + b2[1]) / 2, stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 5' }); }); }
const bxC = [0, 1, 2, 3, 4, 5].map(i => { const c = cmM($('#bxS' + i), 9); c.set(i === 5 ? TG[0] : BC[0], i === 5 ? TG[1] : BC[1]); return c; });
const tBx = [tP1 + 0.4, wt('P4', 'ring'), wt('P4', 'disc'), wt('P4', 'sphere'), wt('P4', 'rectangle'), wt('P5', 'triangle')];

/* ---------- S: build the bangle ---------- */
const s = $('#simS'), SC0 = [392, 250], SR = 180, RCM = 20;          // 180 px = 20 cm
const sFull = mk(s, 'circle', { cx: SC0[0], cy: SC0[1], r: SR, fill: 'none', stroke: METAL, 'stroke-width': 2, 'stroke-dasharray': '3 8', opacity: 0.6 });
const sArc = mk(s, 'path', { fill: 'none', stroke: METAL, 'stroke-width': 16, 'stroke-linecap': 'butt' });
const sChord = [0, 1, 2].map(() => mk(s, 'line', { stroke: IC, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0 }));
const sPhi = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), sPhiL = txt(s, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
mk(s, 'circle', { cx: SC0[0], cy: SC0[1], r: 5, fill: IC });
const sD = mk(s, 'line', { stroke: XC, 'stroke-width': 4 }), sDL = txt(s, 0, 0, '', { fill: XC, 'font-weight': 700, 'font-size': 21 });
const sGh = [0, 1, 2].map(() => mk(s, 'circle', { r: 15, fill: 'none', stroke: IC, 'stroke-width': 3, opacity: 0 }));
const sCm = cmM(s, 15);
const sNo = txt(s, SC0[0], SC0[1] - 30, 'no metal here', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 19 });
const tA0 = wt('S2', 'small') - 0.1, tG0 = wt('S3', 'Grow'), tG1 = wt('S4', 'half'), tRp = tS5 + 0.7, tZ = wt('S7', 'zero');
function phiAt(t) {
  if (t >= tS9 - 0.4) return { phi: 180, half: true };
  if (t < tA0) return { phi: 0 };
  let p = 30 + 150 * M.io((t - tG0) / Math.max(0.6, tG1 - tG0));
  if (t >= tS5) p = 180 + 120 * M.io((t - tS5) / 0.6);
  if (t >= tRp) p = 300 + 60 * M.clamp((t - tRp) / (tZ - tRp));
  return { phi: p, replay: t >= tRp && t < tZ + 0.3 };
}
$('#roA').innerHTML = `<span class="k" style="color:${TC}">φ</span><span class="v" id="r_p" style="color:${TC}">0</span><span class="u">deg</span>
  <span class="k" style="color:${XC}">d</span><span class="v" id="r_d" style="color:${XC}">-</span><span class="u">cm</span>
  <span class="k" style="color:${XC}">d/R</span><span class="v" id="r_q" style="color:${XC}">-</span><span class="u"></span>`;
$('#roB').innerHTML = `<span class="k" style="color:${C.ink}">R</span><span class="v">20.00</span><span class="u">cm</span>
  <span class="k" style="color:${XC}">X</span><span class="v" id="r_X" style="color:${XC}">-</span><span class="u">cm</span>
  <span class="k" style="color:${XC}">Y</span><span class="v" id="r_Y" style="color:${XC}">-</span><span class="u">cm</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 360, ymin: 0, ymax: 20, xt: [0, 90, 180, 270, 360], yt: [0, 5, 10, 15, 20], xl: 'φ (deg)' });
txt(gs, 122, 78, 'd (cm)', { 'font-size': 18 });
const gGh = mk(gs, 'path', { d: '', fill: 'none', stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '3 6', opacity: 0.45 }), gC = mk(gs, 'path', { d: '', fill: 'none', stroke: XC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDt = g.dot(XC, 10);
const gH = mk(gs, 'line', { x1: g.X(180), y1: g.Y(0), x2: g.X(180), y2: g.Y(RCM * 2 / Math.PI), stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' }), gHL = txt(gs, g.X(180) + 12, g.Y(RCM * 2 / Math.PI) - 10, 'half ring: 2R/π = 12.7', { fill: IC, 'font-weight': 600, 'font-size': 16 });
const gZL = txt(gs, g.X(360) - 6, g.Y(0) - 12, 'full ring: 0', { 'text-anchor': 'end', fill: IC, 'font-weight': 600, 'font-size': 16 });
const plot = (path, f, a, b) => { if (b - a <= 0.01) { attr(path, 'd', ''); return; } let d = ''; const n = 60; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'It keeps moving in, off the metal!' });
const th1 = PUC.think($('#th1'), { q: 'Cut the ring in half. Is the half ring\'s centre of mass on the metal, or in empty space?', opts: ['On the metal', 'In empty space'], right: 1, why: 'It sits 2R/π = 12.7 cm from the middle, inside the curve.' });

/* ---------- D ---------- */
const Xs = tc(XC, 'X'), M1 = tc(MC, 'M_1'), M2 = tc(MC, 'M_2'), X1 = tc(XC, 'X_1'), X2 = tc(XC, 'X_2');
const ST = [[`m(${tc(XC, '+x')}) + m(${tc(XC, '-x')}) = 0`, 'every bit has a partner'],
  [`\\text{uniform rod: } ${Xs} = \\dfrac{${tc(XC, 'L')}}{2}`, 'symmetric: X at the centre'],
  [`${Xs} = \\dfrac{${M1}${X1} + ${M2}${X2}}{${M1} + ${M2}}`, 'each part at its own centre'],
  [`\\text{plate: } M \\propto A \\;\\Rightarrow\\; ${Xs} = \\dfrac{A_1${X1} + A_2${X2}}{A_1 + A_2}`, 'use areas for masses']];
const SY = [80, 192, 302, 416];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:104px"></div>` + ST.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx" style="top:${i === 0 ? -4 : -18}px">${K(f)}</div><div class="why" style="left:${[480, 480, 520, 700][i]}px;top:12px;white-space:normal;width:${[400, 400, 400, 260][i]}px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'bit'), wt('D3', 'So'), wt('D4', 'body'), wt('D5', 'plate')];
const dp = $('#dpS'), DY1 = 140;
mk(dp, 'line', { x1: 40, y1: DY1, x2: 484, y2: DY1, stroke: IC, 'stroke-width': 2, opacity: 0.4 });
const dBits = [-1, 1].map(sg => { const o = mk(dp, 'g', {}); mk(o, 'rect', { x: 262 + sg * 150 - 22, y: DY1 - 22, width: 44, height: 44, rx: 6, fill: C.ac2, stroke: C.ac, 'stroke-width': 2 }); txt(o, 262 + sg * 150, DY1 + 50, sg > 0 ? '+x' : '−x', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 20 }); return o; });
const dC1 = cmM(dp, 12); dC1.set(262, DY1);
const dSum = txt(dp, 262, DY1 + 90, 'they cancel: centre at 0', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 19 });
const dPart = mk(dp, 'g', {}), DY2 = 330;
mk(dPart, 'rect', { x: 70, y: DY2 - 30, width: 120, height: 60, fill: PLATE, stroke: IC, 'stroke-width': 2.5 }); mk(dPart, 'rect', { x: 300, y: DY2 - 40, width: 160, height: 80, fill: PLATE, stroke: IC, 'stroke-width': 2.5 });
[[130, 'M₁'], [380, 'M₂']].forEach(([x, l]) => { mk(dPart, 'circle', { cx: x, cy: DY2, r: 6, fill: XC }); txt(dPart, x, DY2 - 12, l, { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 19 }); });
const DXc = (7200 * 130 + 12800 * 380) / 20000;
mk(dPart, 'line', { x1: 130, y1: DY2, x2: 380, y2: DY2, stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const dC2 = cmM(dPart, 12); dC2.set(DXc, DY2 + 62); mk(dPart, 'line', { x1: DXc, y1: DY2, x2: DXc, y2: DY2 + 50, stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '3 4' });
const dAr = txt(dp, 262, 438, 'plates: mass ∝ area', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 19 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Xs} = \\dfrac{${M1}${X1} + ${M2}${X2}}{${M1} + ${M2}}`);

/* ---------- K ---------- */
const kt = $('#ktS'), kr = $('#krS'), KC = [392, 260], KR = 150;
mk(kt, 'circle', { cx: KC[0], cy: KC[1], r: KR, fill: 'none', stroke: METAL, 'stroke-width': 14 });
const kDots = [...Array(24)].map((_, k) => { const p = pol(KC[0], KC[1], KR, k * 15); return mk(kt, 'circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 6, fill: IC }); });
const kPair = [0, 1, 2].map(k => { const a = pol(KC[0], KC[1], KR, 20 + k * 60), b = pol(KC[0], KC[1], KR, 200 + k * 60); return mk(kt, 'line', { x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }); });
const kC1 = cmM(kt, 15); kC1.set(KC[0], KC[1]);
mk(kr, 'circle', { cx: KC[0], cy: KC[1], r: KR, fill: PLATE, stroke: IC, 'stroke-width': 3 });
const kDisc = []; for (let rr = 30; rr < KR; rr += 30) for (let k = 0; k < Math.round(rr / 5); k++) { const p = pol(KC[0], KC[1], rr, k * 360 / Math.round(rr / 5)); kDisc.push(mk(kr, 'circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 3.5, fill: IC, opacity: 0 })); }
const kC2 = cmM(kr, 15); kC2.set(KC[0], KC[1]);
$('#ktP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Centre of mass at the centre: empty`;
$('#krP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Centre of mass at the centre: on metal`;
const th2 = PUC.think($('#th2'), { q: 'A ring and a disc, same mass, same radius. Whose centre of mass is at the centre?', opts: ['Only the disc', 'Both'], right: 1, why: 'Both are uniform and symmetric. For the ring, that point is empty.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'An L-shaped plate: a 40 cm × 10 cm strip lying flat, and a 10 cm × 30 cm strip standing on its left end. Find the centre of mass.';
const wsol = PUC.solution($('#wl'), [
  [K(`A_1 = 40 \\times 10 = 400 \\ \\text{at}\\ (${tc(XC, '20, 5')})`)],
  [K(`A_2 = 10 \\times 30 = 300 \\ \\text{at}\\ (${tc(XC, '5, 25')})`)],
  [K(`${Xs} = \\dfrac{400(20) + 300(5)}{700} \\approx ${tc(XC, '13.6\\,\\text{cm}')}`)],
  [K(`${tc(XC, 'Y')} = \\dfrac{400(5) + 300(25)}{700} \\approx ${tc(XC, '13.6\\,\\text{cm}')}`)]], { label: 'WORKED EXAMPLE', y0: 184, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [170, 480], WU = 8, wp = (x, y) => [WO[0] + WU * x, WO[1] - WU * y];
for (let k = 0; k <= 5; k++) { mk(w, 'line', { x1: wp(10 * k, 0)[0], y1: WO[1], x2: wp(10 * k, 44)[0], y2: wp(0, 44)[1], stroke: C.line, 'stroke-width': 1.5 }); }
for (let k = 0; k <= 4; k++) mk(w, 'line', { x1: WO[0], y1: wp(0, 10 * k)[1], x2: wp(54, 0)[0], y2: wp(0, 10 * k)[1], stroke: C.line, 'stroke-width': 1.5 });
mk(w, 'path', { d: `M${WO[0]},${wp(0, 44)[1]} V${WO[1]} H${wp(54, 0)[0]}`, fill: 'none', stroke: IC, 'stroke-width': 2.5 });
[10, 20, 30, 40, 50].forEach(k => txt(w, wp(k, 0)[0], WO[1] + 28, k, { 'text-anchor': 'middle', fill: IC, 'font-weight': 600 })); [10, 20, 30, 40].forEach(k => txt(w, WO[0] - 12, wp(0, k)[1] + 6, k, { 'text-anchor': 'end', fill: IC, 'font-weight': 600 }));
txt(w, wp(54, 0)[0], WO[1] + 28, 'x (cm)', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 }); txt(w, WO[0] + 10, wp(0, 44)[1] + 4, 'y (cm)', { fill: XC, 'font-weight': 600 });
const wR1 = mk(w, 'rect', { x: wp(0, 10)[0], y: wp(0, 10)[1], width: 40 * WU, height: 10 * WU, fill: PLATE, stroke: IC, 'stroke-width': 2.5 });
const wR2 = mk(w, 'rect', { x: wp(0, 40)[0], y: wp(0, 40)[1], width: 10 * WU, height: 30 * WU, fill: '#B9C4D6', stroke: IC, 'stroke-width': 2.5 });
const wP1 = mk(w, 'circle', { cx: wp(20, 5)[0], cy: wp(20, 5)[1], r: 7, fill: XC }), wP2 = mk(w, 'circle', { cx: wp(5, 25)[0], cy: wp(5, 25)[1], r: 7, fill: XC });
const wL1 = txt(w, wp(20, 5)[0] + 14, wp(20, 5)[1] - 12, 'A₁ = 400', { fill: MC, 'font-weight': 700, 'font-size': 18 }), wL2 = txt(w, wp(5, 25)[0] + 50, wp(5, 25)[1] + 6, 'A₂ = 300', { fill: MC, 'font-weight': 700, 'font-size': 18 });
const wJoin = mk(w, 'line', { x1: wp(20, 5)[0], y1: wp(20, 5)[1], x2: wp(5, 25)[0], y2: wp(5, 25)[1], stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const XL = 9500 / 700, wCm = cmM(w, 14); wCm.set(...wp(XL, XL));
const wCmL = txt(w, wp(XL, XL)[0] + 22, wp(XL, XL)[1] - 16, '(13.6, 13.6): off the plate', { fill: XC, 'font-weight': 700, 'font-size': 20 });
const tW = [wt('W3', 'flat'), wt('W4', 'standing'), wt('W5', 'X'), wt('W5', 'Y')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A piece is cut out: add its mass', right: 'A hole is negative mass: subtract it' });
const tp = $('#tpS'), TS = [70, 50, 160];
const tPl = mk(tp, 'path', { d: `M${TS[0]},${TS[1]} H${TS[0] + TS[2] / 2} V${TS[1] + TS[2] / 2} H${TS[0] + TS[2]} V${TS[1] + TS[2]} H${TS[0]} Z`, fill: PLATE, stroke: IC, 'stroke-width': 2.5 });
const tOut = mk(tp, 'rect', { x: TS[0] + TS[2] / 2, y: TS[1], width: TS[2] / 2, height: TS[2] / 2, fill: 'none', stroke: C.red, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const tPc = mk(tp, 'rect', { x: 330, y: 40, width: TS[2] / 2, height: TS[2] / 2, fill: '#F4D6D6', stroke: C.red, 'stroke-width': 2.5 }), tPcL = txt(tp, 370, 150, 'hole: −m', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 20 });
const tEq = txt(tp, 470, 200, '4m − m = 3m', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 22 });
const where = PUC.where($('#wa'), { on: [], type: 'Composite bodies, and plates or discs with a part cut out' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A uniform square plate has sides of 40 cm. A square of side 20 cm is cut from one corner. How far does the centre of mass move: away from the cut, or toward it?', qW: 780,
  opts: ['4.7 cm, away', '4.7 cm, toward', '3.3 cm, away', '7.1 cm, away'], right: 0, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`4m\\ \\text{at}\\ (0,0);\\ \\text{hole } {-m}\\ \\text{at}\\ (10,10)`)], [K(`${Xs} = \\tfrac{4m(0) - m(10)}{4m - m} = -\\tfrac{10}{3}\\,\\text{cm}`)],
  [K(`${tc(XC, 'Y')} = -\\tfrac{10}{3}\\,\\text{cm}\\ \\text{too}`)], [K(`d = \\sqrt2 \\times \\tfrac{10}{3} \\approx ${tc(XC, '4.7\\,\\text{cm}')}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '22px');
const tSo = [wt('A2', 'Full'), wt('A3', 'Subtract'), wt('A3', 'Y'), wt('A4', 'Distance')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · centre of mass of common bodies', y0: 100, dy: 78, txt: [1, 1, 0, 1, 1],
  lines: ['<b>Uniform + symmetric</b>: at the geometric centre', '<b>Rod</b>: <i>L</i>/2 · <b>ring, disc, sphere</b>: centre · <b>triangle</b>: medians meet',
    K(`${Xs} = \\tfrac{${M1}${X1} + ${M2}${X2}}{${M1} + ${M2}} \\qquad \\text{plate: use areas}`), '<b>Hole</b>: negative mass, subtract it', '<b>Empty space</b> is allowed: ring (centre), half ring (2R/π)'] });
const YQ = ['Why is a uniform rod\'s centre of mass at its middle?', 'How can a ring\'s centre of mass be where there is no metal?', 'How do you handle a hole cut out of a plate?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 94', topic: 'A rocket bursts: one point keeps the old curve. Motion of the Centre of Mass', y: 764 });
$('#sF .next .nt').style.fontSize = '30px';

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.05, 1.06, 960, 540], [tS8 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); vis(jc[i].o, t, wt('H2', i ? 'others' : 'easy') + i * 0.3, 1e9, { dy: 0 }); });
    vis($('#hjP'), t, wt('H2', 'surprise') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    vis(hSh, t, wt('H3', 'clear') - 0.1, 1e9, { dy: 0 }); vis(hRing, t, wt('H3', 'bangle') - 0.1, 1e9, { dy: -20 });
    vis(hTip, t, wt('H3', 'fingertip') - 0.1, 1e9, { dy: 0 }); vis(hTipL, t, wt('H3', 'fingertip'), 1e9, { dy: 0 });
    vis(hCm.o, t, wt('H4', 'centre') - 0.1, 1e9, { dy: 0 }); vis(hNo, t, wt('H4', 'metal') - 0.1, 1e9, { dy: 0 });
    vis($('#hkQ'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    pBits.forEach((b, k) => { vis(b, t, wt('P1', 'uniform') + k * 0.05, 1e9, { dy: -16 }); const j = Math.min(k, 9 - k), on = M.io((t - tPair[j]) / 0.3); b.style.fill = mix(C.ac2, '#DCD0F7', on); b.style.stroke = mix(C.ac, XC, on); });
    pArcs.forEach((a, k) => M.draw(a, t, tPair[k], 0.4));
    M.draw(pMid, t, wt('P3', 'middle') - 0.6, 0.4); vis(pCm.o, t, wt('P3', 'middle') - 0.1, 1e9, { dy: 0 });
    [pBr, pBr2].forEach(e => M.draw(e, t, wt('P3', 'middle', 1) - 0.1, 0.5)); [pBrL, pBrL2].forEach(e => vis(e, t, wt('P3', 'middle', 1) + 0.3, 1e9, { dy: 0 }));
    vis($('#pqP'), t, wt('P3', 'averages') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    BXN.forEach((_, i) => { vis($('#bx' + i), t, tBx[i] - 0.15, 1e9, POP); vis(bxC[i].o, t, i === 0 ? tP4 + 0.2 : i < 5 ? wt('P4', 'geometric') + i * 0.08 : wt('P5', 'medians') + 0.3, 1e9, { dy: 0 }); });
    vis($('#pmP'), t, wt('P5', 'medians') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S8'), simIn2 = OUT('S9') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const P = phiAt(t), phi = P.phi, on = phi > 0.5, dR = dArc(phi), dpx = SR * dR, cy = SC0[1] + dpx;
    vis(sFull, t, tS1 + 0.5, 1e9, { dy: 0 });
    attr(sArc, 'd', on ? arcD(SC0[0], SC0[1], SR, phi) : '');
    sCm.set(SC0[0], cy); vis(sCm.o, t, tA0 + 0.3, 1e9, { dy: 0 });
    const moving = Math.abs(dArc(phiAt(t - 0.08).phi) - dR) > 0.002 && t > tA0 + 0.5;
    sGh.forEach((e, j) => { const pj = phiAt(t - 0.14 * (j + 1)).phi, yj = SC0[1] + SR * dArc(pj); attr(e, 'cx', SC0[0]); attr(e, 'cy', yj.toFixed(1)); e.style.opacity = moving && Math.abs(yj - cy) > 3 ? [0.35, 0.22, 0.12][j] : 0; });
    attr(sD, 'x1', SC0[0] + 30); attr(sD, 'y1', SC0[1]); attr(sD, 'x2', SC0[0] + 30); attr(sD, 'y2', cy.toFixed(1)); sD.style.opacity = on && dpx > 4 ? 1 : 0;
    attr(sDL, 'x', SC0[0] + 42); attr(sDL, 'y', ((SC0[1] + cy) / 2 + 8).toFixed(1)); M.setT(sDL, 'd = ' + (RCM * dR).toFixed(1) + ' cm'); sDL.style.opacity = on && dpx > 20 ? 1 : 0;
    const ua = on ? 1 : 0; attr(sPhi, 'd', on && phi < 359.5 ? (() => { const p0 = pol(SC0[0], SC0[1], 46, -90 - phi / 2), p1 = pol(SC0[0], SC0[1], 46, -90 + phi / 2); return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A46,46 0 ${phi > 180 ? 1 : 0} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; })() : on ? `M${SC0[0] - 46},${SC0[1]} a46,46 0 1 0 92,0 a46,46 0 1 0 -92,0` : ''); sPhi.style.opacity = ua * 0.9;
    attr(sPhiL, 'x', SC0[0] - 70); attr(sPhiL, 'y', SC0[1] - 50); M.setT(sPhiL, 'φ = ' + Math.round(phi) + '°'); sPhiL.style.opacity = ua;
    const uc = M.io((t - wt('S6', 'partner') + 0.1) / 0.4) * (P.replay ? 1 : t < tZ + 1.5 && t > tS6 ? 1 : 0);
    sChord.forEach((e, k) => { const a = pol(SC0[0], SC0[1], SR, 90 - 40 + k * 40 - 180), b = pol(SC0[0], SC0[1], SR, 90 - 40 + k * 40); attr(e, 'x1', a[0].toFixed(1)); attr(e, 'y1', a[1].toFixed(1)); attr(e, 'x2', b[0].toFixed(1)); attr(e, 'y2', b[1].toFixed(1)); e.style.opacity = uc * 0.8; });
    sNo.style.opacity = (phi >= 359.5 ? M.io((t - tZ - 0.3) / 0.3) : 0).toFixed(3);
    vis($('#smo'), t, tS5 + 0.05, tZ + 0.3, { ...POP, sc: 0.8 });
    // readout: round phi first, then compute
    const pr = Math.round(phi), dr = RCM * dArc(pr);
    M.setT($('#r_p'), on ? String(pr) : '0'); M.setT($('#r_d'), on ? f2(dr) : '-'); M.setT($('#r_q'), on ? f2(dr / RCM) : '-'); M.setT($('#r_X'), on ? '0.00' : '-'); M.setT($('#r_Y'), on ? f2(-dr) : '-');
    M.setT($('#roT'), P.half ? 'HALF RING' : phi >= 359.5 ? 'FULL RING' : 'ARC GROWING'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_d').style.background = mix('#FFFFFF', '#EFE9FB', (P.half ? M.io((t - tS9) / 0.3) : 0) + M.io((t - wt('S4', 'two')) / 0.3) * (1 - M.io((t - tS5) / 0.3)));
    plot(gGh, x => RCM * dArc(x), 1, t > tS1 + 0.8 ? 360 : 1);
    plot(gC, x => RCM * dArc(x), 1, on ? (P.half ? 360 : Math.max(phi, 1)) : 1);
    gDt(phi, RCM * dR, on);
    vis(gH, t, wt('S4', 'two') - 0.1, 1e9, { dy: 0 }); vis(gHL, t, wt('S4', 'two'), 1e9, { dy: 0 }); vis(gZL, t, tZ, 1e9, { dy: 0 });
    avA(t, wt('S3', 'middle') + 0.2, tS5 - 0.2);
    vis($('#th1'), t, tS8 + 0.05, OUT('S9'), { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'Is') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: tS9 - 0.02, tWhy: wt('S9', 'sits') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    ST.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 26).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    dBits.forEach((e, i) => vis(e, t, wt('D2', i ? 'minus' : 'plus') - 0.1, 1e9, { dy: 0 })); vis(dC1.o, t, wt('D2', 'zero') - 0.1, 1e9, { dy: 0 }); vis(dSum, t, wt('D2', 'zero'), 1e9, { dy: 0 });
    vis(dPart, t, tStep[2] - 0.1, 1e9, { dy: 16 }); vis(dAr, t, tStep[3] + 0.3, 1e9, { dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxw = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sxw ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'centre') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'depends') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kt'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    kDots.forEach((d, k) => vis(d, t, wt('K1', 'rim') - 0.4 + k * 0.03, 1e9, { dy: 0 }));
    kPair.forEach((e, k) => M.draw(e, t, wt('K1', 'rim') + 0.6 + k * 0.25, 0.4)); vis(kC1.o, t, wt('K1', 'rim') + 1.4, 1e9, { dy: 0 });
    kDisc.forEach((d, k) => { d.style.opacity = M.clamp((t - wt('K2', 'spread') + 0.3 - k * 0.006) / 0.2).toFixed(3); });
    vis(kC2.o, t, wt('K2', 'symmetric') - 0.1, 1e9, { dy: 0 });
    vis($('#ktP'), t, wt('K1', 'rim') + 1.5, 1e9, POP); vis($('#krP'), t, wt('K2', 'symmetric'), 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Whose') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Each') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis(wR1, t, wt('W2', 'forty') - 0.1, 1e9, { dy: -16 }); vis(wR2, t, wt('W2', 'ten', 1) - 0.1, 1e9, { dy: -16 });
    vis(wP1, t, tW[0] + 0.4, 1e9, { dy: 0 }); vis(wL1, t, tW[0] + 0.5, 1e9, { dy: 0 }); vis(wP2, t, tW[1] + 0.4, 1e9, { dy: 0 }); vis(wL2, t, tW[1] + 0.5, 1e9, { dy: 0 });
    M.draw(wJoin, t, tW[2] - 0.2, 0.5); vis(wCm.o, t, wt('W6', 'centre') - 0.1, 1e9, { dy: 0 }); vis(wCmL, t, wt('W6', 'off') - 0.1, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'cut') - 0.1, tStrike: wt('X3', 'hole') - 0.1, tRight: wt('X3', 'Treat') });
    vis(tPl, t, tX1 + 0.4, 1e9, { dy: 0 }); vis(tOut, t, wt('X2', 'piece') - 0.1, 1e9, { dy: 0 }); vis(tPc, t, wt('X3', 'negative') - 0.1, 1e9, { dx: -30, dy: 0 }); vis(tPcL, t, wt('X3', 'negative'), 1e9, { dy: 0 }); vis(tEq, t, wt('X3', 'subtract') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'composite') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.2, tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
