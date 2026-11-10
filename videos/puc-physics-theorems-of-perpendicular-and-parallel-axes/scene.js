// PUC Physics Ep 106: Theorems of perpendicular and parallel axes (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, RC = C.violet, MC = C.ink, IC = C.ink, ZC = C.gold, XC = C.ac, YC = C.violet;   // v, omega blue; r, d violet; I ink; axes x blue, y violet, z gold
const DISC = '#E3C77F', DISCS = '#A88536', ROD = '#8D99AE';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f3 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(3);
const axisM = (p, x, y, r = 9) => { const o = mk(p, 'g', {}); mk(o, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(o, 'circle', { cx: x, cy: y, r: 3, fill: MC }); return o; };
const gMark = (p, r = 11) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(g, 'path', { d: `M${-r + 4},0 H${r - 4} M0,${-r + 4} V${r - 4}`, stroke: ZC, 'stroke-width': 3, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const curv = (p, col, sw = 4) => { const o = mk(p, 'g', {}), pa = mk(o, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hd = mk(o, 'path', { fill: col });
  return { o, set(cx, cy, r, a0, a1, ry = r) { const P = a => [cx + r * Math.cos(a * D2R), cy + ry * Math.sin(a * D2R)], p0 = P(a0), p1 = P(a1), s = Math.sign(a1 - a0);
    attr(pa, 'd', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${ry} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${s > 0 ? 1 : 0} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    const p2 = P(a1 - s * 3), tg0 = [p1[0] - p2[0], p1[1] - p2[1]], L = Math.hypot(...tg0) || 1, tg = [tg0[0] / L, tg0[1] / L], nm = [-tg[1], tg[0]];
    attr(hd, 'd', `M${(p1[0] + tg[0] * 13).toFixed(1)},${(p1[1] + tg[1] * 13).toFixed(1)} L${(p1[0] + nm[0] * 7).toFixed(1)},${(p1[1] + nm[1] * 7).toFixed(1)} L${(p1[0] - nm[0] * 7).toFixed(1)},${(p1[1] - nm[1] * 7).toFixed(1)} Z`); } }; };
// face-on disc that spins (spoke + marks); set(cx, cy, phi)
const disc = (p, R, o2 = {}) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r: R, fill: o2.fill || DISC, stroke: DISCS, 'stroke-width': 3 }); mk(g, 'circle', { r: R * 0.78, fill: 'none', stroke: DISCS, 'stroke-width': 1.5, opacity: 0.6 });
  mk(g, 'line', { x1: 0, y1: 0, x2: R, y2: 0, stroke: MC, 'stroke-width': 3 }); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + 0.5; mk(g, 'circle', { cx: 0.55 * R * Math.cos(a), cy: 0.55 * R * Math.sin(a), r: 3.5, fill: DISCS }); }
  return { o, g, set(x, y, phi = 0) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(phi / D2R).toFixed(2)})`); } }; };

Object.assign(M.IC, {
  gate: ['M4 21V3', 'M4 5h14v14H4', 'M8 5v14', 'M12 5v14', 'M16 5v14'],
  wheel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M3 12h18', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  pend: ['M12 2v12', 'M12 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M8 2h8'],
  flat: ['M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4Z', 'M12 3v18'],
  shift: ['M6 12a6 6 0 1 0 12 0 6 6 0 0 0-12 0', 'M12 12h.01', 'M3 12h.01', 'M3 12h9'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3');
const tG1 = T0('G1'), tG5 = T0('G5'), tG6 = T0('G6'), tG7 = T0('G7');
const tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['gate', 'A gate', 'SWINGS ABOUT ITS HINGE'], ['wheel', 'A wheel', 'TURNS ON ITS AXLE'], ['pend', 'A clock pendulum', 'SWINGS FROM NEAR ITS TOP']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'gate'), wt('H1', 'wheel'), wt('H1', 'pendulum')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="240" height="120"></svg></div>`).join('');
const MG = $('#jsv0'), MWl = $('#jsv1'), MP = $('#jsv2');
mk(MG, 'line', { x1: 70, y1: 14, x2: 70, y2: 106, stroke: MC, 'stroke-width': 5 }); const gate = mk(MG, 'g', {}); mk(gate, 'rect', { x: 70, y: 24, width: 110, height: 70, fill: 'none', stroke: '#8D6B45', 'stroke-width': 5 }); for (let k = 1; k < 4; k++) mk(gate, 'line', { x1: 70 + k * 27.5, y1: 24, x2: 70 + k * 27.5, y2: 94, stroke: '#8D6B45', 'stroke-width': 3 });
const wheelG = mk(MWl, 'g', {}); mk(MWl, 'circle', { cx: 140, cy: 60, r: 44, fill: 'none', stroke: MC, 'stroke-width': 6 }); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; mk(wheelG, 'line', { x1: 140, y1: 60, x2: 140 + 44 * Math.cos(a), y2: 60 + 44 * Math.sin(a), stroke: C.ink2, 'stroke-width': 2 }); } mk(MWl, 'circle', { cx: 140, cy: 60, r: 6, fill: MC });
mk(MP, 'line', { x1: 110, y1: 10, x2: 170, y2: 10, stroke: MC, 'stroke-width': 4 }); const pend = mk(MP, 'g', {}); mk(pend, 'line', { x1: 140, y1: 10, x2: 140, y2: 84, stroke: '#8D6B45', 'stroke-width': 4 }); mk(pend, 'circle', { cx: 140, cy: 94, r: 16, fill: '#E3C77F', stroke: DISCS, 'stroke-width': 3 }); mk(MP, 'circle', { cx: 140, cy: 10, r: 4, fill: MC });
// three coin spins
const hs = $('#hkS'), CR = 52, CY = 210, CX = [120, 300, 480];
const hFlatE = mk(hs, 'ellipse', { cx: CX[0], cy: CY, rx: CR, ry: CR * 0.38, fill: DISC, stroke: DISCS, 'stroke-width': 3 }), hFlatM = mk(hs, 'circle', { r: 5, fill: MC });
mk(hs, 'line', { x1: CX[0], y1: CY - 90, x2: CX[0], y2: CY + 40, stroke: ZC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const hEdge = mk(hs, 'ellipse', { cx: CX[1], cy: CY, rx: CR, ry: CR, fill: DISC, stroke: DISCS, 'stroke-width': 3 });
mk(hs, 'line', { x1: CX[1], y1: CY - 90, x2: CX[1], y2: CY + 90, stroke: ZC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const hRim = disc(hs, CR), hPin = axisM(hs, CX[2], CY - 40, 7);
const hL = ['flat', 'on its edge', 'pin at the rim'].map((s2, i) => txt(hs, CX[i], 350, s2, { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }));
const hQ = [0, 1, 2].map(i => txt(hs, CX[i], 384, 'I = ?', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 22 }));
const tSp = [wt('H3', 'flat'), wt('H3', 'edge'), wt('H3', 'pin')];

/* ---------- P ---------- */
const QR = [['flat', ZC, 'Perpendicular axes theorem', 'flat bodies only: a coin, a plate'], ['shift', RC, 'Parallel axes theorem', 'any body: one axis through the centre of mass']];
$('#qrs').innerHTML = QR.map(([ic, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 128}px"><div class="qs">${M.icon(ic, 30, c, 2.4)}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P2', 'perpendicular'), wt('P3', 'parallel')];
const pm = $('#pmS');
const pPlate = mk(pm, 'g', {}); mk(pPlate, 'path', { d: 'M60,330 L260,280 L360,340 L160,390 Z', fill: DISC, stroke: DISCS, 'stroke-width': 3 }); mk(pPlate, 'line', { x1: 210, y1: 335, x2: 210, y2: 170, stroke: ZC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); txt(pPlate, 210, 160, 'z', { 'text-anchor': 'middle', fill: ZC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 });
txt(pPlate, 210, 450, 'flat plate: x, y in it, z out of it', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 18 });
const pBody = mk(pm, 'g', {}); mk(pBody, 'path', { d: 'M500,250 C560,190 680,210 690,290 C700,370 600,420 540,390 C480,360 450,300 500,250 Z', fill: '#C9D3E6', stroke: MC, 'stroke-width': 3 });
const pG = gMark(pBody, 11); pG.set(590, 305); mk(pBody, 'line', { x1: 590, y1: 190, x2: 590, y2: 420, stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }); mk(pBody, 'line', { x1: 690, y1: 190, x2: 690, y2: 420, stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
mk(pBody, 'path', { d: 'M590,440 v8 H690 v-8', fill: 'none', stroke: RC, 'stroke-width': 3 }); txt(pBody, 640, 474, 'd', { 'text-anchor': 'middle', fill: RC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 });
txt(pBody, 590, 180, 'cm axis', { 'text-anchor': 'middle', fill: MC, 'font-weight': 600, 'font-size': 17 }); txt(pBody, 700, 180, 'new', { 'text-anchor': 'middle', fill: RC, 'font-weight': 600, 'font-size': 17 });

/* ---------- G: perpendicular axes ---------- */
const LK = [`A bit at (x, y): its distance from z is r`, `r² = x² + y²`, `Multiply by m, add every bit`, `So I<sub>z</sub> = I<sub>x</sub> + I<sub>y</sub>`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px;height:76px"><div class="n" style="top:15px">${i + 1}</div><div class="lt" style="height:76px">${h}</div></div>`).join('');
const tLk = [wt('G2', 'bit'), wt('G2', 'squared'), wt('G3', 'Multiply'), wt('G4', 'So')];
$('#gLaw').innerHTML = `coin: ${K(`I_z = \\tfrac12MR^2,\\ I_x = I_y \\Rightarrow I_x = \\tfrac14MR^2`)}`;
$('#gLaw').style.top = '470px'; $('#gLaw').style.height = '84px';
const gv = $('#grS2'), GO = [392, 330], GR = 200, GK = 0.38;   // oblique view: y squashed
const gCoin = mk(gv, 'ellipse', { cx: GO[0], cy: GO[1], rx: GR, ry: GR * GK, fill: DISC, stroke: DISCS, 'stroke-width': 3 });
const gX = PUC.arrow(gv, XC, 4, 14), gY = PUC.arrow(gv, YC, 4, 14), gZ = PUC.arrow(gv, ZC, 4, 14);
const gXl = txt(gv, GO[0] + GR + 52, GO[1] + 8, 'x', { fill: XC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26 }), gYl = txt(gv, GO[0] - 150, GO[1] - 104, 'y', { fill: YC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26 }), gZl = txt(gv, GO[0] + 14, GO[1] - 228, 'z', { fill: ZC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26 });
const BP = [GO[0] + 110, GO[1] - 0.38 * 90];       // bit at x = 110, y = 90 (in plane units)
const gBit = mk(gv, 'circle', { cx: BP[0], cy: BP[1], r: 9, fill: MC });
const gDx = mk(gv, 'line', { x1: BP[0], y1: BP[1], x2: BP[0], y2: GO[1], stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }), gDy = mk(gv, 'line', { x1: BP[0], y1: BP[1], x2: GO[0] - 90 * 0.0, y2: BP[1], stroke: YC, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' });
const gDxl = txt(gv, (GO[0] + BP[0]) / 2, GO[1] + 30, 'x', { 'text-anchor': 'middle', fill: XC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 22 }), gDyl = txt(gv, BP[0] + 14, (GO[1] + BP[1]) / 2 + 6, 'y', { fill: YC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 22 });
const gR = mk(gv, 'line', { x1: GO[0], y1: GO[1], x2: BP[0], y2: BP[1], stroke: RC, 'stroke-width': 4 }), gRl = txt(gv, GO[0] + 40, GO[1] - 26, 'r', { fill: RC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 });
const gChips = [['I_z = \\tfrac12MR^2', ZC], ['I_x = \\tfrac14MR^2', XC], ['I_y = \\tfrac14MR^2', YC]].map(([f, c], i) => { const d = document.createElement('div'); d.className = 'pillp'; d.style.cssText = `left:${36 + i * 244}px;top:500px;height:52px;font-size:22px`; d.innerHTML = K(tc(c, f)); $('#gr2').appendChild(d); return d; });
const th1 = PUC.think($('#th1'), { q: 'A ring has I = MR² about its central axis. About a diameter, is it MR² or ½MR²?', opts: ['MR²', '½MR²'], right: 1, why: 'The two diameters share the total equally: ½MR² each.' });

/* ---------- S: parallel axes sim ---------- */
const s = $('#simS'), PX = 620, MASS = 2, RR = 0.2, AX = [392, 295], ICM = 0.5 * MASS * RR * RR, OMV = 1.3;
const dKeys = M.keys([[0, 0], [wt('S2', 'Move') + 0.2, 0.1], [wt('S6', 'Slide') + 0.2, 0.2]], 1.6, M.io);
const pathC = mk(s, 'circle', { cx: AX[0], cy: AX[1], fill: 'none', stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '5 7', opacity: 0.6 });
const ghosts = [0, 1, 2].map(() => mk(s, 'circle', { r: RR * PX, fill: 'none', stroke: DISCS, 'stroke-width': 2, opacity: 0 }));
const sD = disc(s, RR * PX), sG = gMark(s, 10), sAx = axisM(s, AX[0], AX[1], 11);
const dLine = mk(s, 'line', { stroke: RC, 'stroke-width': 4 }), dL = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const vCm = PUC.arrow(s, VC, 6, 18), vCl = txt(s, 0, 0, 'blue: the centre goes round → Md²', { fill: VC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' });
const spinA = curv(s, ZC, 4), spinL = txt(s, 0, 0, 'gold: spin about its centre → Icm', { fill: ZC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' });
const tFz = wt('S3', 'Freeze') + 0.1, tRes = wt('S6', 'Slide') - 0.3;
const rate = t => { if (t < tS1 + 0.6) return 0; if (t < tS3) return 1; if (t < tFz) return 0.25; if (t < tRes) return 0; if (t < tRes + 0.8) return 0.25; return 1; };
const T_A = tS1, T_B = tD1 + 0.2, DT = 1 / 120, PH = [0];
for (let t = T_A; t < T_B; t += DT) PH.push(PH[PH.length - 1] + OMV * rate(t) * DT);
const phiAt = t => { const x = (t - T_A) / DT; if (x <= 0) return 0; const i = Math.min(PH.length - 2, Math.floor(x)), f = x - i; return PH[i] + (PH[i + 1] - PH[i]) * f; };
$('#roA').innerHTML = `<span class="k" style="color:${RC}">d</span><span class="v" id="r_d" style="color:${RC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${IC}">I<sub>cm</sub></span><span class="v" id="r_icm">0.040</span><span class="u">kg m²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${RC}">Md²</span><span class="v" id="r_md" style="color:${RC}">0.000</span><span class="u">kg m²</span>
  <span class="k" style="color:${IC}">I</span><span class="v" id="r_I">0.040</span><span class="u">kg m²</span>`;
$('#ro').insertAdjacentHTML('beforeend', `<div class="lbl" style="left:36px;top:204px;text-transform:none">I = I<sub>cm</sub> + Md² &nbsp;(M = 2 kg)</div>`);
const gs = $('#grS'), g = PUC.graph(gs, { x: 120, y: 66, w: 560, h: 156, xmax: 0.04, ymin: 0, ymax: 0.14, xt: [0, 0.01, 0.02, 0.03, 0.04], yt: [0, 0.04, 0.08, 0.12], xl: '' });
txt(gs, 132, 72, 'I (kg m²)', { 'font-size': 18 }); txt(gs, 748, 46, 'd² (m²)', { 'text-anchor': 'end', 'font-size': 17 });
const IofD = d => ICM + MASS * d * d;
const gGhost = mk(gs, 'line', { x1: g.X(0), y1: g.Y(ICM), x2: g.X(0.04), y2: g.Y(IofD(0.2)), stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' });
const gC = mk(gs, 'line', { x1: g.X(0), y1: g.Y(ICM), stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gDot = g.dot(IC, 10);
const gInt = txt(gs, g.X(0) + 14, g.Y(ICM) + 22, 'starts at Icm = 0.04', { fill: IC, 'font-weight': 700, 'font-size': 16 }), gSl = txt(gs, g.X(0.026), g.Y(0.12) + 8, 'slope = M = 2 kg', { fill: RC, 'font-weight': 700, 'font-size': 16 });

/* ---------- D ---------- */
const r_ = tc(RC, '\\vec r'), d_ = tc(MC, '\\vec d');
const STEPS = [[`\\text{distance from new axis} = ${r_} + ${d_}`, 'r measured from the centre of mass'],
  [`I = \\textstyle\\sum m\\,|${r_} + ${d_}|^2 = \\sum m r^2 + 2${d_}\\cdot\\sum m${r_} + Md^2`, 'square it, add over every bit'],
  [`\\textstyle\\sum m${r_} = 0`, 'that is what the centre of mass means'],
  [`I = I_{\\text{cm}} + Md^2`, 'what is left']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:940px;height:84px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i === 1 ? 30 : 36}px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DC0 = [170, 260], DN = [400, 260], DB = [250, 150];
mk(dp, 'circle', { cx: DC0[0], cy: DC0[1], r: 130, fill: '#E9EDF5', stroke: C.dim, 'stroke-width': 2 });
const dGm = gMark(dp, 11); dGm.set(DC0[0], DC0[1]); axisM(dp, DN[0], DN[1], 10);
txt(dp, DC0[0], DC0[1] + 40, 'cm', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700 }); txt(dp, DN[0], DN[1] + 40, 'new axis', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700 });
mk(dp, 'circle', { cx: DB[0], cy: DB[1], r: 9, fill: MC });
const dR = PUC.arrow(dp, RC, 4, 13), dDv = PUC.arrow(dp, MC, 4, 13), dRD = PUC.arrow(dp, C.ok, 4, 13);
const dRl = txt(dp, 196, 196, 'r', { fill: RC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 }), dDl = txt(dp, 285, 290, 'd', { fill: MC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 }), dRDl = txt(dp, 336, 196, 'r + d', { fill: C.ok, 'font-weight': 700, 'font-size': 20 });

/* ---------- statement ---------- */
$('#st2').innerHTML = `Parallel axes: <span class="acc">I = I<sub style="font-size:.5em">cm</sub> + Md²</span>`; $('#st2').style.fontSize = '78px';
$('#stF').innerHTML = `<span style="font:500 40px Poppins;color:var(--mute)">Perpendicular axes, flat bodies only: </span>${K(`I_z = I_x + I_y`)}`;

/* ---------- K ---------- */
const KS = [['#khS', 0], ['#klS', 1]].map(([id, e]) => { const sv = $(id), A = [e ? 290 : 392, 290], L = 230;
  mk(sv, 'circle', { cx: A[0], cy: A[1], r: e ? L : L / 2, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
  const o = mk(sv, 'g', {}), rd = mk(o, 'rect', { x: e ? 0 : -L / 2, y: -9, width: L, height: 18, rx: 4, fill: ROD, stroke: MC, 'stroke-width': 2.5 }); axisM(sv, A[0], A[1], 9);
  return { sv, A, o }; });
$('#khP').innerHTML = K(`I_{\\text{cm}} = \\tfrac{1}{12}ML^2`);
$('#klP').innerHTML = K(`\\tfrac{1}{12}ML^2 + M\\big(\\tfrac{L}{2}\\big)^2 = \\tfrac13 ML^2`) + '<b style="margin-left:10px">4 ×</b>';
const th2 = PUC.think($('#th2'), { q: 'Of all the parallel axes through a body, which gives the smallest I?', opts: ['Through the centre of mass', 'Through one end'], right: 0, why: 'Any other axis adds Md², and that is never negative.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A 2 kg disc of radius 0.2 m. Find its moment of inertia about a tangent that lies in its plane.';
const wsol = PUC.solution($('#wl'), [
  [K(`I_{\\text{diam}} = \\tfrac12 I_z = \\tfrac12(0.04) = 0.02`)],
  [K(`\\text{tangent} \\parallel \\text{diameter},\\ ${tc(RC, 'd')} = R`)],
  [K(`MR^2 = 2(0.2)^2 = 0.08`)],
  [K(`I = 0.02 + 0.08 = 0.10\\ \\text{kg m}^2`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 86 });
$('#wl .lbl').style.top = '30px';
const wv = $('#wrS'), WC = [392, 260], WR = 150;
const wD = disc(wv, WR); wD.set(WC[0], WC[1], 0.4);
const wDia = mk(wv, 'line', { x1: WC[0] - 230, y1: WC[1], x2: WC[0] + 230, y2: WC[1], stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), wDl = txt(wv, WC[0] + 236, WC[1] + 6, 'diameter', { fill: XC, 'font-weight': 700, 'font-size': 19 });
const wTan = mk(wv, 'line', { x1: WC[0] - 230, y1: WC[1] + WR, x2: WC[0] + 230, y2: WC[1] + WR, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), wTl = txt(wv, WC[0] + 236, WC[1] + WR + 6, 'tangent', { fill: RC, 'font-weight': 700, 'font-size': 19 });
const wDd = mk(wv, 'path', { d: `M${WC[0] - 190},${WC[1]} h-10 V${WC[1] + WR} h10`, fill: 'none', stroke: RC, 'stroke-width': 3 }), wDdl = txt(wv, WC[0] - 214, WC[1] + WR / 2 + 6, 'd = R', { 'text-anchor': 'end', fill: RC, 'font-weight': 700, 'font-size': 20 });
const wGm = gMark(wv, 10); wGm.set(WC[0], WC[1]);
const tW = [wt('W3', 'First'), wt('W4', 'tangent'), wt('W4', 'Add'), wt('W5', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Shift between any two parallel axes by adding Md²', right: 'One axis must pass through the centre of mass' });
const tp = $('#tpS'), TY = 120;
mk(tp, 'rect', { x: 60, y: TY - 9, width: 420, height: 18, rx: 4, fill: ROD, stroke: MC, 'stroke-width': 2.5 });
const tA = axisM(tp, 60, TY, 9), tCm = gMark(tp, 10); tCm.set(270, TY); axisM(tp, 375, TY, 9);
txt(tp, 60, TY + 40, 'A', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }); txt(tp, 270, TY + 40, 'cm', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }); txt(tp, 375, TY + 40, 'B', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const tpBad = mk(tp, 'path', { d: `M60,${TY - 24} Q218,${TY - 90} 375,${TY - 24}`, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), tpBadL = txt(tp, 218, TY - 66, '✗ A to B directly', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 18 });
const tpOk = mk(tp, 'path', { d: `M60,${TY + 56} Q165,${TY + 96} 270,${TY + 56} Q322,${TY + 86} 375,${TY + 56}`, fill: 'none', stroke: C.ok, 'stroke-width': 3 }), tpOkL = txt(tp, 218, TY + 126, '✓ A to cm, then cm to B', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 18 });
const where = PUC.where($('#wa'), { on: [], type: 'Finding I about an edge, a corner or a tangent with one or both theorems' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A uniform square plate (mass M, side a) has I = Ma²/6 about its central axis at right angles to it. Find I about a diagonal.', qW: 780,
  opts: [K('Ma^2/6'), K('Ma^2/12'), K('Ma^2/24'), K('Ma^2/3')], right: 1, optW: 300, optY: 336, optH: 90 });
const mqs = $('#mqS'), SQ = [50, 70], SS = 160;
mk(mqs, 'rect', { x: SQ[0], y: SQ[1], width: SS, height: SS, fill: DISC, stroke: DISCS, 'stroke-width': 3 });
mk(mqs, 'line', { x1: SQ[0], y1: SQ[1], x2: SQ[0] + SS, y2: SQ[1] + SS, stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }); mk(mqs, 'line', { x1: SQ[0] + SS, y1: SQ[1], x2: SQ[0], y2: SQ[1] + SS, stroke: YC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
axisM(mqs, SQ[0] + SS / 2, SQ[1] + SS / 2, 8); txt(mqs, SQ[0] + SS / 2, SQ[1] - 16, 'a', { 'text-anchor': 'middle', fill: MC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 22 });
const so = PUC.solution($('#so'), [['Diagonals: ⟂, in the plane'], [K(`I_{d1} + I_{d2} = \\tfrac{Ma^2}{6}`)], [K(`I_{d1} = I_{d2}\\ \\text{(symmetry)}`)], [K(`I_d = \\tfrac{Ma^2}{12}\\ \\text{(B)}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach((e, i) => { if (i === 0) e.style.font = '500 21px Poppins'; else e.style.fontSize = '26px'; });
const tSo = [wt('A2', 'two'), wt('A3', 'So'), wt('A4', 'symmetry'), wt('A4', 'each')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 500, title: 'Recap · axes theorems', y0: 100, dy: 98, txt: [0, 0, 0, 0],
  lines: [`${K(`I = I_{\\text{cm}} + M${tc(RC, 'd')}^2`)} <span style="font:500 26px Poppins;color:var(--mute)">&nbsp; one axis through the cm</span>`, `${K(`I_z = I_x + I_y`)} <span style="font:500 26px Poppins;color:var(--mute)">&nbsp; flat bodies only</span>`,
    K(`\\text{coin: flat } \\tfrac12MR^2 \\quad \\text{diameter } \\tfrac14MR^2 \\quad \\text{rim } \\tfrac32MR^2`), K(`\\text{rod: middle } \\tfrac1{12}ML^2 \\;\\to\\; \\text{end } \\tfrac13ML^2`)] });
const YQ = ['Why must one of the two axes pass through the centre of mass?', 'Why does the perpendicular axes theorem work only for flat bodies?', 'Which parallel axis gives a body its smallest I, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 107', topic: 'A potter\'s wheel: Torque, Work and Rotational KE', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS3 + 0.1, 1.06, 960, 540], [tS6 - 0.3, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const dt = t - tMorph;
    attr(gate, 'transform', `translate(70,0) scale(${Math.cos(50 * D2R * Math.sin(dt * 0.9)).toFixed(3)},1) translate(-70,0)`);
    attr(wheelG, 'transform', `rotate(${(dt * 70).toFixed(1)} 140 60)`); attr(pend, 'transform', `rotate(${(18 * Math.sin(dt * 2.6)).toFixed(2)} 140 10)`);
    vis($('#hjP'), t, wt('H2', 'different') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    // flat spin: mark goes round the ellipse; edge: width wobbles; rim: turns about the pin
    vis(hFlatE, t, tSp[0] - 0.1, 1e9, { dy: 0 }); const a0 = 3 * Math.max(0, t - tSp[0]); attr(hFlatM, 'cx', (CX[0] + CR * 0.7 * Math.cos(a0)).toFixed(1)); attr(hFlatM, 'cy', (CY + CR * 0.38 * 0.7 * Math.sin(a0)).toFixed(1)); vis(hFlatM, t, tSp[0], 1e9, { dy: 0 });
    vis(hEdge, t, tSp[1] - 0.1, 1e9, { dy: 0 }); attr(hEdge, 'rx', (CR * Math.abs(Math.cos(3 * Math.max(0, t - tSp[1])))).toFixed(1));
    const a2 = 1.2 * Math.sin(1.8 * Math.max(0, t - tSp[2])) * 0.5; vis(hRim.o, t, tSp[2] - 0.1, 1e9, { dy: 0 }); vis(hPin, t, tSp[2], 1e9, { dy: 0 });
    hRim.set(CX[2] - (CR - 12) * Math.sin(a2), CY - 40 + (CR - 12) * Math.cos(a2), a2);
    hL.forEach((e, i) => vis(e, t, tSp[i], 1e9, { dy: 0 })); hQ.forEach((e, i) => vis(e, t, wt('H4', 'three', 1) - 0.1 + i * 0.12, 1e9, { dy: 0 }));
    vis($('#hkQ'), t, wt('H4', 'scratch') - 0.4, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#pNoteC'), t, wt('P1', 'not') - 0.1, 1e9, POP);
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, tP2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis(pPlate, t, wt('P2', 'flat') - 0.1, 1e9, { dy: 0 }); vis(pBody, t, wt('P3', 'any') - 0.1, 1e9, { dy: 0 });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const in2 = t >= tG7 ? tG7 + 0.15 : null, outG = t < tG7 ? OUT('G6') : OUT('S1');
    vis($('#gl'), t, in2 ?? tG1 + 0.1, outG, { dx: -60, dy: 0, ...o }); vis($('#gr2'), t, in2 ? in2 + 0.1 : tG1 + 0.3, outG, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#gLaw'), t, wt('G5', 'quarter') - 0.2, 1e9, POP);
    vis(gCoin, t, wt('G1', 'flat') - 0.1, 1e9, { dy: 0 });
    const ux = M.o3((t - wt('G1', 'x') + 0.1) / 0.5), uy = M.o3((t - wt('G1', 'y') + 0.1) / 0.5), uz = M.o3((t - wt('G1', 'z') + 0.1) / 0.5);
    gX.set(GO[0], GO[1], GO[0] + (GR + 40) * ux, GO[1]); gY.set(GO[0], GO[1], GO[0] - 130 * uy, GO[1] - (GR * GK + 30) * uy); gZ.set(GO[0], GO[1], GO[0], GO[1] - 210 * uz);
    gXl.style.opacity = ux; gYl.style.opacity = uy; gZl.style.opacity = uz;
    attr(gDy, 'x2', (GO[0] + 0).toFixed(1));
    const ub = M.io((t - wt('G2', 'bit') + 0.1) / 0.3); [gBit].forEach(e => e.style.opacity = ub); [gDx, gDy, gDxl, gDyl].forEach(e => e.style.opacity = M.io((t - wt('G2', 'x') + 0.1) / 0.3));
    M.draw(gR, t, wt('G2', 'distance') - 0.1, 0.5); vis(gRl, t, wt('G2', 'distance'), 1e9, { dy: 0 });
    gChips.forEach((c, i) => vis(c, t, [wt('G5', 'half'), wt('G5', 'quarter'), wt('G5', 'quarter') + 0.25][i] - 0.1, 1e9, POP));
    vis($('#th1'), t, tG6 + 0.05, OUT('G7'), { dy: 36, ...o });
    th1(t, { tin: tG6, tOpts: wt('G6', 'About') - 0.1, tCount: T1('G6') + 0.05, dur: 3, tAns: tG7 - 0.02, tWhy: wt('G7', 'two') });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const d = dKeys(t), ph = phiAt(t) + 0.6, c = [AX[0] + d * PX * Math.cos(ph), AX[1] + d * PX * Math.sin(ph)];
    sD.set(c[0], c[1], ph); sG.set(c[0], c[1]); vis(sD.o, t, tS1 + 0.4, 1e9, { dy: 0 }); vis(sG.o, t, tS1 + 0.5, 1e9, { dy: 0 });
    attr(pathC, 'r', (d * PX).toFixed(1)); pathC.style.opacity = d > 0.005 ? 0.6 : 0;
    const moving = rate(t) > 0.05 && d > 0.01;
    ghosts.forEach((e, j) => { const pg = phiAt(t - (rate(t) < 0.5 ? 0.25 : 0.08) * (j + 1)) + 0.6; attr(e, 'cx', (AX[0] + d * PX * Math.cos(pg)).toFixed(1)); attr(e, 'cy', (AX[1] + d * PX * Math.sin(pg)).toFixed(1)); e.style.opacity = moving ? [0.3, 0.2, 0.12][j] : 0; });
    attr(dLine, 'x1', AX[0]); attr(dLine, 'y1', AX[1]); attr(dLine, 'x2', c[0].toFixed(1)); attr(dLine, 'y2', c[1].toFixed(1)); dLine.style.opacity = d > 0.01 ? 1 : 0;
    attr(dL, 'x', ((AX[0] + c[0]) / 2 - 22 * Math.sin(ph)).toFixed(1)); attr(dL, 'y', ((AX[1] + c[1]) / 2 + 22 * Math.cos(ph) + 6).toFixed(1)); M.setT(dL, 'd = ' + f2(d)); dL.style.opacity = d > 0.03 ? 1 : 0;
    const sh = t >= tFz - 0.1 && t < tS6 ? 1 : 0, u1 = sh * M.io((t - wt('S4', 'centre') + 0.1) / 0.4), u2 = sh * M.io((t - wt('S5', 'turns') + 0.1) / 0.4);
    const tg = [-Math.sin(ph), Math.cos(ph)]; vCm.set(c[0], c[1], c[0] + tg[0] * 110 * u1, c[1] + tg[1] * 110 * u1);
    attr(vCl, 'x', 748); attr(vCl, 'y', 500); vCl.style.opacity = u1;
    spinA.set(c[0], c[1], 70, ph / D2R + 20, ph / D2R + 120); spinA.o.style.opacity = u2; attr(spinL, 'x', 748); attr(spinL, 'y', 532); spinL.style.opacity = u2;
    vis($('#simP'), t, wt('S7', 'graph') - 0.1, 1e9, POP);
    vis($('#smo'), t, tS3 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    const dr = Math.round(d * 100) / 100, md = MASS * dr * dr;
    M.setT($('#roT'), dr < 0.005 ? 'AXIS AT THE CENTRE' : dr > 0.195 ? 'AXIS AT THE RIM' : dr > 0.095 && dr < 0.105 ? 'AXIS 0.1 m OUT' : 'AXIS MOVING'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_d'), f2(dr)); M.setT($('#r_md'), f3(md)); M.setT($('#r_I'), f3(ICM + md));
    const hi = u1; $('#r_md').style.background = mix('#FFFFFF', '#EFE9FB', hi); $('#r_icm').style.background = mix('#FFFFFF', '#F7EBD3', u2);
    attr(gC, 'x2', g.X(d * d).toFixed(1)); attr(gC, 'y2', g.Y(IofD(d)).toFixed(1)); gDot(d * d, IofD(d), t >= tS1 + 0.8);
    vis(gGhost, t, tS7, 1e9, { dy: 0 }); vis(gInt, t, wt('S7', 'starts') - 0.1, 1e9, { dy: 0 }); vis(gSl, t, wt('S7', 'slope') - 0.1, 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const u1 = M.o3((t - wt('D2', 'Measure') + 0.1) / 0.5), u2 = M.o3((t - wt('D2', 'new') + 0.1) / 0.5);
    dR.set(DC0[0], DC0[1], DC0[0] + (DB[0] - DC0[0]) * u1, DC0[1] + (DB[1] - DC0[1]) * u1); dRl.style.opacity = u1;
    dDv.set(DN[0], DN[1], DN[0] + (DC0[0] - DN[0]) * u2, DN[1]); dDl.style.opacity = u2;
    const u3 = M.o3((t - wt('D2', 'plus') + 0.1) / 0.5); dRD.set(DN[0], DN[1], DN[0] + (DB[0] - DN[0]) * u3, DN[1] + (DB[1] - DN[1]) * u3); dRDl.style.opacity = u3;
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Parallel') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Perpendicular') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    KS.forEach((q, i) => attr(q.o, 'transform', `translate(${q.A[0]},${q.A[1]}) rotate(${(50 * Math.max(0, t - (i ? tK2 : tK1) - 0.4) - 30).toFixed(2)})`));
    vis($('#khP'), t, wt('K1', 'twelve') - 0.2, 1e9, POP); vis($('#klP'), t, wt('K2', 'three') - 0.2, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: tK4 - 0.02, tWhy: wt('K4', 'Any') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wDia, t, tW[0] + 0.3, 0.6); vis(wDl, t, tW[0] + 0.6, 1e9, { dy: 0 }); M.draw(wTan, t, wt('W2', 'tangent') - 0.1, 0.6); vis(wTl, t, wt('W2', 'tangent') + 0.2, 1e9, { dy: 0 });
    vis(wDd, t, wt('W4', 'distance') - 0.1, 1e9, { dy: 0 }); vis(wDdl, t, wt('W4', 'distance'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'add') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'one') - 0.1 });
    M.draw(tpBad, t, wt('X2', 'any') - 0.1, 0.6); vis(tpBadL, t, wt('X2', 'any') + 0.3, 1e9, { dy: 0 }); M.draw(tpOk, t, wt('X3', 'Between') - 0.1, 0.8); vis(tpOkL, t, wt('X3', 'Between') + 0.5, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'finding') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    vis($('#mqS'), t, wt('Q1', 'plate') - 0.1, 1e9, { dy: 16 });
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
