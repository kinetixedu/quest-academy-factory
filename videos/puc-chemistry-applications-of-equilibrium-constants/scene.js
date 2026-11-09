// PUC Chemistry Ep 63: Applications of equilibrium constants (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: K gold, Q blue, reactants teal, products orange, forward green, backward red, x violet
const NC = C.ac, HC = C.ink, GC = '#B7791F', XC = '#C8461B', BC = '#2F6FEB', VC = '#7A4FE0', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3', GDT = '#F4E7CF';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tK = s => `\\textcolor{${GC}}{${s}}`, tQ = s => `\\textcolor{${BC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tV = s => `\\textcolor{${VC}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`;
const Kc = tK('K_c'), Qc = tQ('Q_c'), Kk = tK('K'), Qq = tQ('Q'), xx = tV('x');
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const harrow = (p, x1, x2, y, col, w = 10) => { const l = mk(p, 'path', { d: '', stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: '', fill: col }); const o = { l, h, set(xa, xb) { const dd = xb > xa ? 1 : -1; attr(l, 'd', `M${xa.toFixed(1)} ${y} H${(xb - dd * 14).toFixed(1)}`); attr(h, 'd', `M${(xb - dd * 24).toFixed(1)} ${y - 18} L${xb.toFixed(1)} ${y} L${(xb - dd * 24).toFixed(1)} ${y + 18} Z`); } }; o.set(x1, x2); return o; };
const sup = n => '10' + String(n).replace('-', '⁻').split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c] ?? c).join('');
const lab = (p, x, y, s, col, size = 18, anc = 'middle') => txt(p, x, y, s, { 'text-anchor': anc, 'font-size': size, fill: col, 'font-weight': 600 });

Object.assign(M.IC, {
  board: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4'],
  cam: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', 'M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  paper: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQq = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQq, tQq + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['board', 'Final scoreboard', 'WHO WON', 'scoreboard', 'HOW FAR', GC], ['cam', 'Mid-match snapshot', 'WHO IS AHEAD', 'snapshot', 'WHICH WAY', BC], ['hash', 'One number', 'NO NEED TO WATCH', 'ahead', 'PREDICTS', NC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Given: just one number, K', 'number', 'H3'], ['Which way? How much is left?', 'which', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('paper', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: three jobs ---------- */
const QR = [['How far it goes', 'JOB 1', 'P2', 'far', GC], ['Which way it moves', 'JOB 2', 'P3', 'which', BC], ['How much is left', 'JOB 3', 'P4', 'calculate', VC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pK = mk(ps, 'g', {}); mk(pK, 'circle', { cx: 392, cy: 170, r: 70, fill: GDT, stroke: GC, 'stroke-width': 4 }); lab(pK, 392, 188, 'K', GC, 52);
const PJ = [['HOW FAR', 'EXTENT', GC, 140], ['WHICH WAY', 'DIRECTION', BC, 392], ['HOW MUCH', 'AMOUNTS', VC, 644]].map(([a, s, c, x]) => { const g = mk(ps, 'g', {}); mk(g, 'path', { d: `M392 240 L${x} 330`, stroke: c, 'stroke-width': 4, fill: 'none' }); mk(g, 'rect', { x: x - 112, y: 330, width: 224, height: 110, rx: 14, fill: '#fff', stroke: c, 'stroke-width': 3 }); lab(g, x, 380, a, c, 22); lab(g, x, 416, s, C.mute, 16); return g; });

/* ---------- S: extent ---------- */
const RX = [['N₂ + O₂ ⇌ 2NO · 298 K', 'K = 4.8 × 10⁻³¹', -30.32, 0.0, 'S2'], ['H₂ + I₂ ⇌ 2HI · 700 K', 'K = 57.0', 1.756, 0.79, 'S3'], ['2H₂ + O₂ ⇌ 2H₂O · 500 K', 'K = 2.4 × 10⁴⁷', 47.38, 1.0, 'S4']];
const b = $('#bS');
const jar = mk(b, 'path', { d: 'M150 100 V400 a20 20 0 0 0 20 20 H420 a20 20 0 0 0 20 -20 V100', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const mol = Array.from({ length: 20 }, (_, i) => ({ e: dot(b, 15, NC), x: 190 + (i % 5) * 52, y: 160 + Math.floor(i / 5) * 60, ph: rnd(i, 3) * 6.283, k: rnd(i, 4) }));
const bL1 = lab(b, 600, 170, 'REACTANTS', NC, 20), bV1 = lab(b, 600, 210, '', NC, 34), bL2 = lab(b, 600, 290, 'PRODUCTS', XC, 20), bV2 = lab(b, 600, 330, '', XC, 34);
const bK = lab(b, 295, 470, '', GC, 24);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), LX0 = 80, LX1 = 704, LY = 250, lx = e => LX0 + (e + 40) / 90 * (LX1 - LX0);
const zR = mk(es, 'rect', { x: lx(-40), y: LY - 30, width: lx(-3) - lx(-40), height: 60, fill: RDT }), zB = mk(es, 'rect', { x: lx(-3), y: LY - 30, width: lx(3) - lx(-3), height: 60, fill: GDT }), zP = mk(es, 'rect', { x: lx(3), y: LY - 30, width: lx(50) - lx(3), height: 60, fill: OKT });
mk(es, 'line', { x1: LX0, y1: LY, x2: LX1, y2: LY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
[-40, -20, 0, 20, 40].forEach(v => { const x = lx(v); mk(es, 'line', { x1: x, y1: LY - 10, x2: x, y2: LY + 10, stroke: C.ink2, 'stroke-width': 3 }); lab(es, x, LY + 44, v === 0 ? '1' : sup(v), HC, 16); });
lab(es, 392, 110, 'K ON A POWER-OF-TEN SCALE', C.mute, 18);
const eM = RX.map(([, k, e, , id], i) => { const g = mk(es, 'g', {}); mk(g, 'path', { d: `M${lx(e)} ${LY - 40} l-12 -22 h24 z`, fill: [RD, GC, OK][i] }); lab(g, lx(e), LY - 74, ['NO', 'HI', 'H₂O'][i], [RD, GC, OK][i], 20); return g; });
const zt = [lab(es, (lx(-40) + lx(-3)) / 2, 370, 'K < 10⁻³', RD, 22), lab(es, lx(0), 370, 'IN BETWEEN', GC, 18), lab(es, (lx(3) + lx(50)) / 2, 370, 'K > 10³', OK, 22)];
const zs = [lab(es, (lx(-40) + lx(-3)) / 2, 404, 'MOSTLY REACTANTS', RD, 16), lab(es, lx(0), 404, 'BOTH', GC, 16), lab(es, (lx(3) + lx(50)) / 2, 404, 'MOSTLY PRODUCTS', OK, 16)];
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Huge K: almost all products. Got it!' });

/* ---------- L: Q ---------- */
$('#lEq').style.cssText = 'position:absolute;left:36px;width:960px;text-align:center;top:110px;font-size:46px;white-space:nowrap';
$('#lEq').innerHTML = K(`${Qc} = \\dfrac{[\\mathrm{${'C'}}]^c\\,[\\mathrm{D}]^d}{[\\mathrm{A}]^a\\,[\\mathrm{B}]^b}\\ \\ \\text{right now}`);
const ls = $('#lS'), PX = 1290, PY = 236;
mk(ls, 'path', { d: `M${PX - 30} ${PY + 40} L${PX} ${PY} L${PX + 30} ${PY + 40} Z`, fill: HC });
const beam = mk(ls, 'g', {}); mk(beam, 'rect', { x: -220, y: -8, width: 440, height: 16, rx: 8, fill: '#B08B5A' }); mk(beam, 'rect', { x: -220, y: -56, width: 92, height: 48, rx: 8, fill: NC }); mk(beam, 'rect', { x: 128, y: -56, width: 92, height: 48, rx: 8, fill: XC });
const bR = lab(ls, PX - 174, 90, 'REACTANTS', NC, 16), bP = lab(ls, PX + 174, 90, 'PRODUCTS', XC, 16), bState = lab(ls, PX, 296, '', HC, 20);
const GT = [[`${Qq} < ${Kk}`, 'FORWARD →', 'MORE PRODUCTS FORM', OK, wt('L3', 'smaller')], [`${Qq} > ${Kk}`, '← BACKWARD', 'MORE REACTANTS FORM', RD, wt('L3', 'bigger')], [`${Qq} = ${Kk}`, 'EQUILIBRIUM', 'NO NET CHANGE', GC, wt('L3', 'equal')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: direction ---------- */
const MS = [[K(`\\mathrm{2A \\rightleftharpoons B + C}, \\ \\ ${Kc} = 2 \\times 10^{-3}`), 'D2'], [K(`[\\mathrm{A}] = [\\mathrm{B}] = [\\mathrm{C}] = 3 \\times 10^{-4}\\ \\text{M}`), 'D3'], [K(`${Qc} = \\dfrac{[\\mathrm{B}][\\mathrm{C}]}{[\\mathrm{A}]^2} = ${tQ('1')}`), 'D4'], [K(`${tQ('1')} > ${tK('0.002')} \\Rightarrow ${tR('\\text{backward}')}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 118}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS'), QX0 = 80, QX1 = 704, QY = 260, qx = e => QX0 + (e + 4) / 5 * (QX1 - QX0);
mk(ds, 'line', { x1: QX0, y1: QY, x2: QX1, y2: QY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
[-4, -3, -2, -1, 0, 1].forEach(v => { const x = qx(v); mk(ds, 'line', { x1: x, y1: QY - 10, x2: x, y2: QY + 10, stroke: C.ink2, 'stroke-width': 3 }); lab(ds, x, QY + 44, v === 0 ? '1' : v === 1 ? '10' : sup(v), HC, 16); });
const dK = mk(ds, 'g', {}); mk(dK, 'line', { x1: qx(Math.log10(0.002)), y1: QY - 70, x2: qx(Math.log10(0.002)), y2: QY + 70, stroke: GC, 'stroke-width': 5 }); lab(dK, qx(Math.log10(0.002)), QY - 84, 'K = 0.002', GC, 20);
const dQ = mk(ds, 'g', {}); mk(dQ, 'circle', { cx: 0, cy: 0, r: 18, fill: BC }); lab(dQ, 0, -32, 'Q', BC, 22);
const dA = harrow(ds, 600, 300, 400, RD, 10), dAl = lab(ds, 392, 450, '← REACTION RUNS BACKWARD · MORE A', RD, 18);
const dHi = lab(ds, 600, 140, 'Q TOO BIG', BC, 20);

/* ---------- G: ICE table ---------- */
const GR = [['I · Initial: what we start with', 'START', 'G2', 'Initial'], ['C · Change: written with x', 'REACTS', 'G3', 'Change'], ['E · Equilibrium: start + change', 'END', 'G4', 'Equilibrium'], ['Put row E into K, solve for x', 'SOLVE', 'G5', 'last']];
$('#grs').innerHTML = GR.map(([k, v], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${k}</div><div class="qk">${v}</div></div>`).join('');
const tGr = GR.map(g => wt(g[2], g[3]) - 0.1);
const gs = $('#gS');
const table = (p, x0, y0, cw, rh, hdr, rows, cols) => { const cells = []; const hg = mk(p, 'g', {}); hdr.forEach((h, j) => lab(hg, x0 + cw[0] + cw[1] * j + cw[1] / 2, y0 + 30, h, cols[j], 22)); const rg = rows.map((r, i) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x0, y: y0 + 50 + i * rh, width: cw[0] + cw[1] * hdr.length, height: rh - 10, rx: 10, fill: C.soft }); lab(g, x0 + 24, y0 + 50 + i * rh + rh / 2 + 2, r[0], HC, 22, 'start'); const cs = r.slice(1).map((v, j) => lab(g, x0 + cw[0] + cw[1] * j + cw[1] / 2, y0 + 50 + i * rh + rh / 2 + 2, v, cols[j], 26)); cells.push(cs); return g; }); return { hg, rg, cells }; };
const tb = table(gs, 40, 70, [100, 200], 92, ['A', 'B', 'C'], [['I', 'a', '0', '0'], ['C', '−x', '+x', '+x'], ['E', 'a − x', 'x', 'x']], [NC, XC, XC]);
const gK = mk(gs, 'g', {}); const gKf = document.createElement('div'); gKf.className = 'fx fxc'; gKf.style.cssText = 'top:440px;font-size:40px'; $('#gb').appendChild(gKf); gKf.innerHTML = K(`${Kc} = \\dfrac{${xx}^2}{a - ${xx}}`);

/* ---------- C: K vs Q ---------- */
const ca = $('#caS'); const cK = mk(ca, 'g', {}); mk(cK, 'rect', { x: 192, y: 100, width: 400, height: 200, rx: 18, fill: HC }); lab(cK, 392, 230, '57.0', '#F4D58D', 80);
const cL1 = lab(ca, 392, 360, 'FIXED AT ONE TEMPERATURE', GC, 20), cL2 = lab(ca, 392, 400, 'H₂ + I₂ ⇌ 2HI · 700 K', C.mute, 18);
const cf = $('#cfS'), FX0 = 90, FX1 = 720, FY0 = 420, fy = v => FY0 - v / 70 * 300;
mk(cf, 'line', { x1: FX0, y1: 100, x2: FX0, y2: FY0, stroke: C.ink2, 'stroke-width': 3 }); mk(cf, 'line', { x1: FX0, y1: FY0, x2: FX1, y2: FY0, stroke: C.ink2, 'stroke-width': 3 });
lab(cf, FX0 - 14, 124, 'Q', BC, 24, 'end'); lab(cf, FX1, FY0 + 34, 'TIME →', HC, 18, 'end');
const cKl = mk(cf, 'line', { x1: FX0, y1: fy(57), x2: FX1, y2: fy(57), stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '10 8' }); const cKt = lab(cf, FX1, fy(57) - 14, 'K = 57', GC, 18, 'end');
const cQ = mk(cf, 'path', { d: '', stroke: BC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), cQd = mk(cf, 'circle', { r: 10, fill: BC }), cQv = lab(cf, 0, 0, '', BC, 20);
const th1 = PUC.think($('#th1'), { q: 'Q is 10 and K is 57. Which way does the reaction move?', opts: ['Forward', 'Backward'], right: 0, why: 'Forward. Q < K, so more products form until Q grows to 57.' });

/* ---------- R: K, Q, ΔG ---------- */
const dG = '\\Delta G', RR = [[K(`${dG} = ${dG}^{\\ominus} + RT \\ln ${Qq}`), 'R2', 'Delta'], [K(`0 = ${dG}^{\\ominus} + RT \\ln ${Kk}`), 'R3', 'zero'], [K(`${dG}^{\\ominus} = -RT \\ln ${Kk}`), 'R3', 'So'], [K(`${dG} = RT \\ln (${Qq}/${Kk})`), 'R4', 'If']];
$('#rrs').innerHTML = RR.map(([s]) => s).map((s, i) => `<div class="dr" id="rr${i}" style="top:${96 + i * 96}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
$('#rP').innerHTML = `R = 8.314 J K⁻¹ mol⁻¹ · T in kelvin`;
const ks = $('#kS'), RX0 = 90, RX1 = 720, RY = 270, rx = v => RX0 + (v + 3) / 6 * (RX1 - RX0);
mk(ks, 'rect', { x: RX0, y: 100, width: rx(0) - RX0, height: RY - 100, fill: '#fff' });
const kZg = mk(ks, 'rect', { x: RX0, y: RY, width: rx(0) - RX0, height: 170, fill: OKT }), kZr = mk(ks, 'rect', { x: rx(0), y: 100, width: RX1 - rx(0), height: RY - 100, fill: RDT });
mk(ks, 'line', { x1: RX0, y1: RY, x2: RX1, y2: RY, stroke: C.ink2, 'stroke-width': 3 }); mk(ks, 'line', { x1: rx(0), y1: 90, x2: rx(0), y2: 450, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
lab(ks, RX0 - 12, 112, 'ΔG', HC, 22, 'end'); lab(ks, RX1, RY + 34, 'Q →', BC, 20, 'end'); lab(ks, rx(0), 480, 'Q = K · ΔG = 0', GC, 18);
const kLine = mk(ks, 'path', { d: `M${rx(-3)} ${RY + 160} L${rx(3)} ${RY - 160}`, stroke: HC, 'stroke-width': 5, fill: 'none' });
const kD = mk(ks, 'circle', { r: 14, fill: BC }), kLg = lab(ks, rx(-1.5), 524, 'Q < K · ΔG < 0 · FORWARD', OK, 16), kLr = lab(ks, rx(1.5), 524, 'Q > K · ΔG > 0 · BACKWARD', RD, 16);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Qq} < ${Kk}: ${tO('\\rightarrow')} \\qquad ${Qq} > ${Kk}: ${tR('\\leftarrow')} \\qquad ${Qq} = ${Kk}: \\rightleftharpoons`);

/* ---------- W: PCl5 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{E: } 3 - ${xx},\\ \\ ${xx},\\ \\ ${xx}`)],
  [K(`${Kc} = \\dfrac{${xx}^2}{3 - ${xx}} = 1.80`)],
  [K(`${xx}^2 + 1.8${xx} - 5.4 = 0 \\Rightarrow ${xx} \\approx 1.59`)],
  [K(`[\\mathrm{PCl_3}] = [\\mathrm{Cl_2}] = ${tO('1.59')},\\ [\\mathrm{PCl_5}] = ${tO('1.41')}`)]], { label: 'WORKED EXAMPLE', y0: 230, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W4'), wt('W4', 'So'), T0('W5'), T0('W6')];
const tw = table($('#wS'), 40, 70, [100, 200], 92, ['PCl₅', 'PCl₃', 'Cl₂'], [['I', '3.00', '0', '0'], ['C', '−x', '+x', '+x'], ['E', '3 − x', 'x', 'x']], [NC, XC, XC]);
const tE = ['1.41', '1.59', '1.59'];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${Qq} > ${Kk} \\Rightarrow \\text{forward}`), right: K(`${Qq} > ${Kk} \\Rightarrow ${tR('\\text{backward}')}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'BIG Q = TOO MUCH', { 'font-size': 28, fill: BC, 'font-weight': 600 }), tq2 = txt(tsv, 60, 170, 'PRODUCT ALREADY', { 'font-size': 28, fill: XC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Direction from Q and K; amounts at equilibrium with an ICE table; K and ΔG°' });
const OPT = [`${Qc} = 70,\\ \\text{backward}`, `${Qc} = 49,\\ \\text{forward}`, `${Qc} = 49,\\ \\text{backward}`, `${Qc} = 57,\\ \\text{at equilibrium}`];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'H₂ + I₂ ⇌ 2HI, Kc = 57.0 at 700 K. [H₂] = 0.10 M, [I₂] = 0.10 M, [HI] = 0.70 M. Which is correct?', qW: 780,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${Qc} = \\dfrac{[\\mathrm{HI}]^2}{[\\mathrm{H_2}][\\mathrm{I_2}]}`)], [K(`0.49 \\div 0.01 = ${tQ('49')}`)], [K(`${tQ('49')} < ${tK('57')} \\Rightarrow ${tO('\\text{forward}')}`)], ['A forgot to square']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Applications of equilibrium constants', y0: 96, dy: 74, txt: [1, 0, 0, 1, 1],
  lines: ['<b>K &gt; 10³</b> mostly products · <b>K &lt; 10⁻³</b> mostly reactants · between: both', K(`${Qq} < ${Kk} \\ \\text{forward} \\quad ${Qq} > ${Kk}\\ \\text{backward} \\quad ${Qq} = ${Kk}\\ \\text{equilibrium}`), K(`${dG} = ${dG}^{\\ominus} + RT\\ln ${Qq}, \\quad ${dG}^{\\ominus} = -RT \\ln ${Kk}`),
    '<b>ICE table</b>: Initial, Change (with x), Equilibrium, then solve K for x', '<b>PCl₅</b>: 3.00 M, Kc = 1.80 → PCl₃ = Cl₂ = 1.59 M, PCl₅ = 1.41 M'] });
const YQ = ['If K is 10⁵⁰, what does the mixture mostly hold?', 'Q is bigger than K. Which way does the reaction move?', 'What are the three rows of an ICE table?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 64', topic: 'What if we push an equilibrium? Le Chatelier\'s Principle', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQq - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S5') - 0.2, 1.05, 960, 560], [T0('S6') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 150; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const tRx = RX.map(r => T0(r[4]));

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    const tBd = [wt('H2', 'far'), wt('H2', 'which'), wt('H2', 'move')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'both') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'table') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'constant') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(pK, t, wt('P1', 'three') - 0.2); PJ.forEach((g, i) => fade(g, t, tQr[i] - 0.1));
    M.vis($('#pP'), t, T1('P4') - 0.4, 1e9, POP);
  }

  /* S: extent */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    let k = -1; tRx.forEach((tt, i) => { if (t >= tt) k = i; });
    // product fraction eases between reactions
    let f = 0; tRx.forEach((tt, i) => { const u = M.io((t - tt - 0.2) / 0.9); f = M.lerp(f, RX[i][3], u); });
    fade(jar, t, tS1 + 0.3);
    mol.forEach((m, i) => { const isP = m.k < f - 0.001 || (f > 0.999); m.e.setAttribute('fill', isP ? XC : NC); pos(m.e, m.x + 5 * Math.sin(t * 4 + m.ph), m.y + 5 * Math.cos(t * 3.4 + m.ph)); fade(m.e, t, tS1 + 0.4 + i * 0.02, 1e9, 0.2); });
    const nP = mol.filter(m => m.k < f - 0.001 || f > 0.999).length;
    [bL1, bL2, bV1, bV2].forEach(e => fade(e, t, tRx[0])); M.setT(bV1, String(20 - nP)); M.setT(bV2, String(nP));
    M.setT(bK, k >= 0 ? RX[k][1] : ''); fade(bK, t, tRx[0] + 0.2);
    const TAG = [[tS1 + 0.3, 'LINE THEM UP'], ...RX.map((r, i) => [tRx[i], r[0]])];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    eM.forEach((g, i) => fade(g, t, wt(RX[i][4], 'K') - 0.1));
    const t5 = wt('S5', 'K'), t6 = wt('S6', 'K'), t7 = wt('S6', 'between');
    fade(zP, t, t5); fade(zt[2], t, t5); fade(zs[2], t, wt('S5', 'mostly'));
    fade(zR, t, t6); fade(zt[0], t, t6); fade(zs[0], t, wt('S6', 'mostly'));
    fade(zB, t, t7); fade(zt[1], t, t7); fade(zs[1], t, t7 + 0.3);
    avA(t, T1('S6') - 0.6, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    PUC.write($('#lEq'), t, wt('L2', 'same'), 1.2);
    const ts = wt('L1', 'see'), a1 = wt('L3', 'smaller'), a2 = wt('L3', 'bigger'), a3 = wt('L3', 'equal');
    const ang = M.lerp(M.lerp(M.lerp(0, -12, M.io((t - a1) / 0.6)), 12, M.io((t - a2) / 0.6)), 0, M.io((t - a3) / 0.6));
    attr(beam, 'transform', `translate(${PX},${PY - 8}) rotate(${(-ang).toFixed(2)})`); [beam, bR, bP].forEach(e => fade(e, t, ts));
    M.setT(bState, t >= a3 ? 'BALANCED · Q = K' : t >= a2 ? 'TOO MANY PRODUCTS' : t >= a1 ? 'TOO FEW PRODUCTS' : 'BALANCES AT K'); fade(bState, t, ts + 0.3);
    bState.setAttribute('fill', t >= a3 ? GC : t >= a2 ? RD : t >= a1 ? OK : HC);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.3, 1e9, { dy: 24 }); const on = M.io((t - g[4]) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4]) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    fade(dK, t, tMs[0] + 0.4);
    const tq = wt('D4', 'one'), tb2 = wt('D5', 'backward'); const e = t < tb2 ? 0 : M.lerp(0, Math.log10(0.002) + 0.35, M.io((t - tb2) / 1.6));
    attr(dQ, 'transform', `translate(${qx(e).toFixed(1)},${QY})`); fade(dQ, t, tq - 0.1); fade(dHi, t, wt('D5', 'bigger'));
    [dA.l, dA.h, dAl].forEach(x => fade(x, t, tb2));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tGr[i + 1] : T1('G5') + 0.4; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    fade(tb.hg, t, tG1 + 0.7); tb.rg.forEach((g, i) => fade(g, t, tGr[i])); tb.cells.forEach((r, i) => r.forEach((c, j) => fade(c, t, tGr[i] + 0.3 + j * 0.2)));
    M.vis(gKf, t, tGr[3] + 0.2, 1e9, { dy: 16 });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'Q') - 0.2, zc, { dx: 60, dy: 0, ...o });
    fade(cK, t, wt('C1', 'K')); fade(cL1, t, wt('C1', 'fixed')); fade(cL2, t, wt('C1', 'fixed') + 0.3);
    [cKl, cKt].forEach(e => fade(e, t, wt('C1', 'Q') + 0.2));
    const t0 = wt('C1', 'Q', 1), t1 = T1('C1'), now = M.clamp((t - t0) / (t1 - t0)); const qf = u => 10 + 47 * (1 - Math.exp(-4 * u));
    let d = ''; for (let k = 0; k <= 50; k++) { const u = now * k / 50; d += (k ? 'L' : 'M') + (FX0 + u * (FX1 - FX0 - 40)).toFixed(1) + ' ' + fy(qf(u)).toFixed(1); } attr(cQ, 'd', t > t0 ? d : '');
    const ex = FX0 + now * (FX1 - FX0 - 40); pos(cQd, ex, fy(qf(now))); fade(cQd, t, t0); attr(cQv, 'x', ex.toFixed(1)); attr(cQv, 'y', (fy(qf(now)) + 36).toFixed(1)); M.setT(cQv, 'Q = ' + qf(now).toFixed(0)); fade(cQv, t, t0);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'smaller') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tRr[i], 0.9); });
    M.vis($('#rP'), t, wt('R2', 'R') - 0.2, 1e9, POP);
    M.vis($('#rb'), t, tR1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.draw(kLine, t, T0('R2'), 0.8);
    const t4 = T0('R4'), t5 = T0('R5'); const v = t < t4 ? 0 : t < t5 - 0.2 ? -1.8 * M.io((t - t4) / 0.8) : M.lerp(-1.8, 1.8, M.io((t - t5 + 0.2) / 1.0));
    pos(kD, rx(v), RY - v / 3 * 160); fade(kD, t, T0('R3'));
    fade(kZg, t, t4); fade(kLg, t, t4 + 0.3); fade(kZr, t, t5); fade(kLr, t, t5 + 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Q') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'bigger') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'backward') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const tr = [wt('W3', 'Initial'), wt('W3', 'Change'), T0('W4')];
    fade(tw.hg, t, T0('W2') + 0.6); tw.rg.forEach((g, i) => fade(g, t, tr[i])); tw.cells.forEach((r, i) => r.forEach((c, j) => { fade(c, t, tr[i] + 0.2 + j * 0.2); if (i === 2) M.setT(c, t >= T0('W6') ? tE[j] : ['3 − x', 'x', 'x'][j]); }));
    M.vis($('#wG'), t, T0('W6') + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQq + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'big') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'backward') - 0.2 });
    fade(tq1, t, wt('X3', 'big')); fade(tq2, t, wt('X3', 'product'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQq && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQq + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQq, tOpts: wt('Q1', 'Which') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
