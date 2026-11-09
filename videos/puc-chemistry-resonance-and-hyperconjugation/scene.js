// PUC Chemistry Ep 85: Resonance and hyperconjugation (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: moving electrons e- and electron-rich delta minus orange, carbocation carbon and delta plus teal, ring and C ink, N / NO2 violet, H grey, alpha hydrogens gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', OC = '#7A4FE0', HG = '#8A93A6', GD = '#B7791F', RD = C.red, OK = C.ok;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const tr = (el, x, y, s = 1) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
const L2 = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
const ball = (p, r, fill, lab, fs = 26) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); const t = txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); g._t = t; g._c = g.firstChild; return g; };
const dot = (p, c = EC, r = 7) => mk(p, 'circle', { r, fill: c });
const pos = (el, x, y) => { attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1)); };
const line = (p, c = C.ink2, w = 6) => mk(p, 'line', { stroke: c, 'stroke-width': w, 'stroke-linecap': 'round' });
const lab = (p, x, y, s, c, fs = 24) => txt(p, x, y, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': fs, 'font-weight': 700, fill: c });
// curved electron arrow: draws on from the electrons to where they go; a pair of dots rides along it
const carrow = (p, x1, y1, x2, y2, bend, col = EC) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dl = Math.hypot(x2 - x1, y2 - y1), qx = mx + (-(y2 - y1) / dl) * bend, qy = my + ((x2 - x1) / dl) * bend;
  const g = mk(p, 'g', {}), pa = mk(g, 'path', { d: `M${x1} ${y1} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2} ${y2}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const a = Math.atan2(y2 - qy, x2 - qx), hl = 15, b1 = [x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45)], b2 = [x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45)];
  const hd = mk(g, 'path', { d: `M${b1[0].toFixed(1)} ${b1[1].toFixed(1)} L${x2} ${y2} L${b2[0].toFixed(1)} ${b2[1].toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return { g, run(u, out = 0) { M.drawU(pa, u); op(hd, M.clamp((u - 0.9) / 0.1)); op(g, u > 0 ? 1 - out : 0); } };
};
Object.assign(M.IC, {
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  feather: ['M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z', 'M16 8 2 22', 'M17.5 15H9'],
  swap: ['m16 3 4 4-4 4', 'M20 7H4', 'm8 21-4-4 4-4', 'M4 17h16'],
  shuffle: ['m18 14 4 4-4 4', 'm18 2 4 4-4 4', 'M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-7.6a4 4 0 0 1 3.3-1.7H22', 'M2 6h1.97a4 4 0 0 1 3.3 1.7l.4.56', 'M22 18h-6.04a4 4 0 0 1-3.3-1.8l-.36-.45'],
  minus: ['M5 12h14'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tK1 = T0('K1'), tB2 = T0('B2'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['bike', 'Tyre pump', 'AIR FILLS THE WHOLE TUBE', 'tyre', 'SPREADS'], ['users', 'Four friends', 'LIFT A BENCH EASILY', 'friends', 'SHARED'], ['feather', 'A shared load', 'MADE LIGHT', 'light', 'LIGHT']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['3° most stable', wt('H3', 'tertiary'), C.ac2], ['C-H not touching +', wt('H4', 'touching'), C.redBg], ['How?', wt('H4', 'help'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: conjugated system ---------- */
$('#mdefI').innerHTML = M.icon('waves', 28, '#fff', 2.2);
const QR = [['Resonance hybrid', 'MIX OF DRAWINGS', wt('P1', 'hybrid')], ['Conjugated system', '= - = - =', wt('P2', 'conjugated')], ['Resonance effect', 'ALSO: MESOMERIC', wt('P4', 'resonance')], ['+R and −R', 'PUSH IN · PULL OUT', wt('P5', 'plus')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
const zig = (y, n) => [...Array(n)].map((_, i) => [150 + i * 120, y + (i % 2 ? -40 : 40)]);
const Z1 = zig(200, 5), z1 = mk(ps, 'g', {}), z1d = [];
Z1.slice(0, -1).forEach(([x, y], i) => { const [x2, y2] = Z1[i + 1]; mk(z1, 'line', { x1: x, y1: y, x2, y2, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); if (i % 2 === 0) { const dx = x2 - x, dy = y2 - y, l = Math.hypot(dx, dy), nx = -dy / l * 13 * (i % 4 ? -1 : 1), ny = dx / l * 13 * (i % 4 ? -1 : 1); z1d.push(mk(z1, 'line', { x1: x + dx * 0.15 + nx, y1: y + dy * 0.15 + ny, x2: x2 - dx * 0.15 + nx, y2: y2 - dy * 0.15 + ny, stroke: NC, 'stroke-width': 6, 'stroke-linecap': 'round' })); } });
Z1.forEach(([x, y]) => mk(z1, 'circle', { cx: x, cy: y, r: 10, fill: HC }));
const z1t = txt(ps, 392, 300, 'DOUBLE, SINGLE, DOUBLE · TAKING TURNS', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: NC });
const z2 = mk(ps, 'g', {}); const Z2 = [[200, 430], [330, 430], [460, 430]];
mk(z2, 'line', { x1: 200, y1: 430, x2: 460, y2: 430, stroke: C.ink2, 'stroke-width': 6 }); mk(z2, 'line', { x1: 352, y1: 414, x2: 438, y2: 414, stroke: NC, 'stroke-width': 6 });
tr(ball(z2, 34, OC, 'N', 24), 200, 430); [330, 460].forEach(x => mk(z2, 'circle', { cx: x, cy: 430, r: 10, fill: HC }));
[[-9, -48], [9, -48]].forEach(([dx, dy]) => pos(dot(z2), 200 + dx, 430 + dy));
const z2t = txt(ps, 330, 500, 'LONE PAIR NEXT TO A DOUBLE BOND', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: OC });
const z2a = carrow(z2, 214, 386, 330, 404, -30);

/* ---------- S: bench ---------- */
const b = $('#bS');
// phase 1: aniline ring
const ph1 = mk(b, 'g', {});
const RC = [392, 330], RR = 100, V = [0, 1, 2, 3, 4, 5].map(i => { const a = (-90 + 60 * i) * Math.PI / 180; return [RC[0] + RR * Math.cos(a), RC[1] + RR * Math.sin(a)]; });
const NP = [392, 146], mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], ME = V.map((v, i) => mid(v, V[(i + 1) % 6]));
V.forEach((v, i) => { const w = V[(i + 1) % 6]; mk(ph1, 'line', { x1: v[0], y1: v[1], x2: w[0], y2: w[1], stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); });
mk(ph1, 'line', { x1: V[0][0], y1: V[0][1], x2: NP[0], y2: NP[1], stroke: C.ink2, 'stroke-width': 6 });
const PI = V.map((v, i) => { const w = V[(i + 1) % 6], ix = (q) => [q[0] + (RC[0] - q[0]) * 0.16, q[1] + (RC[1] - q[1]) * 0.16], a = ix(v), c = ix(w); return mk(ph1, 'line', { x1: a[0] + (c[0] - a[0]) * 0.14, y1: a[1] + (c[1] - a[1]) * 0.14, x2: c[0] - (c[0] - a[0]) * 0.14, y2: c[1] - (c[1] - a[1]) * 0.14, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); });
PI.push(mk(ph1, 'line', { x1: 406, y1: V[0][1] - 14, x2: 406, y2: NP[1] + 30, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const nB = ball(ph1, 40, OC, 'NH₂', 22); tr(nB, NP[0], NP[1]);
const nLp = [dot(ph1), dot(ph1)]; pos(nLp[0], 383, 94); pos(nLp[1], 401, 94);
const nPl = lab(ph1, 448, 120, '+', OC, 32);
const out = i => [V[i][0] + (V[i][0] - RC[0]) * 0.36, V[i][1] + (V[i][1] - RC[1]) * 0.36 + 8];
const CH = [1, 3, 5].reduce((o, i) => { const [x, y] = out(i); o[i] = lab(ph1, x, y, '−', EC, 34); return o; }, {});
const DL = [1, 3, 5].reduce((o, i) => { const [x, y] = out(i); o[i] = lab(ph1, x, y, '', EC, 26); return o; }, {});
const ST = [[1, 3, 5], [6, 1, 3], [6, 1, 4], [6, 2, 4]], SM = [null, 5, 3, 1];
const off = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
const AR = [[carrow(ph1, 392, 84, 420, 176, -40), carrow(ph1, ME[5][0], ME[5][1], ...off(V[5], RC, -0.22), 26)],
  [carrow(ph1, ...off(V[5], RC, -0.22), ...ME[4], 26), carrow(ph1, ME[3][0], ME[3][1], ...off(V[3], RC, -0.22), 26)],
  [carrow(ph1, ...off(V[3], RC, -0.22), ...ME[2], 26), carrow(ph1, ME[1][0], ME[1][1], ...off(V[1], RC, -0.22), 26)]];
const oLab = [1, 5].map(i => txt(ph1, V[i][0] + (i === 1 ? 64 : -64), V[i][1] - 22, 'ORTHO', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.mute }));
const pLab = txt(ph1, V[3][0], V[3][1] + 70, 'PARA', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.mute });
// phase D: ethyl cation hyperconjugation
const phD = mk(b, 'g', {});
const CP = [480, 300], CM = [300, 300];
const lob = [mk(phD, 'ellipse', { cx: CP[0], cy: CP[1] - 74, rx: 28, ry: 52, fill: NC, 'fill-opacity': 0, stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '7 6' }), mk(phD, 'ellipse', { cx: CP[0], cy: CP[1] + 74, rx: 28, ry: 52, fill: NC, 'fill-opacity': 0, stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '7 6' })];
const HS = [[CM[0], 176], [212, 352], [300, 418]], HP = [[570, 250], [570, 350]];
HS.forEach(h => mk(phD, 'line', { x1: CM[0], y1: CM[1], x2: h[0], y2: h[1], stroke: C.ink2, 'stroke-width': 6 }));
HP.forEach(h => mk(phD, 'line', { x1: CP[0], y1: CP[1], x2: h[0], y2: h[1], stroke: C.ink2, 'stroke-width': 6 }));
mk(phD, 'line', { x1: CM[0], y1: CM[1], x2: CP[0], y2: CP[1], stroke: C.ink2, 'stroke-width': 6 });
const hBalls = HS.map(h => { const g = ball(phD, 24, HG, 'H', 18); tr(g, ...h); return g; }); HP.forEach(h => tr(ball(phD, 24, HG, 'H', 18), ...h));
const hRing = HS.map(h => mk(phD, 'circle', { cx: h[0], cy: h[1], r: 32, fill: 'none', stroke: GD, 'stroke-width': 4 }));
tr(ball(phD, 40, HC, 'C', 28), ...CM); tr(ball(phD, 40, NC, 'C', 28), ...CP);
const cPl = lab(phD, CP[0] + 52, CP[1] - 30, '+', NC, 36), hDl = lab(phD, CM[0] + 44, 176, 'δ+', NC, 24), cDl = lab(phD, CP[0] + 56, CP[1] - 30, 'δ+', NC, 26);
const hPr = [dot(phD), dot(phD)];
const hArr = carrow(phD, 318, 230, 452, 226, -50);
const empT = txt(phD, CP[0], CP[1] + 160, 'EMPTY p ORBITAL', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: NC });
const alT = txt(phD, 150, 470, 'ALPHA HYDROGENS · ON THE NEXT CARBON', { 'font-size': 17, 'font-weight': 600, fill: GD });
// phase K: count the helpers
const phK = mk(b, 'g', {});
const KN = [['CH₃⁺', 'METHYL', 0], ['CH₃CH₂⁺', 'ETHYL', 3], ['(CH₃)₂CH⁺', 'ISOPROPYL', 6], ['(CH₃)₃C⁺', 'TERT-BUTYL', 9]];
mk(phK, 'line', { x1: 90, y1: 420, x2: 700, y2: 420, stroke: C.ink, 'stroke-width': 3 });
const KB = KN.map(([f, n, v], i) => { const x = 150 + i * 160, g = mk(phK, 'g', {}); const r = mk(g, 'rect', { x: x - 44, width: 88, rx: 8, fill: GD }); const tv = lab(g, x, 0, String(v), GD, 30); txt(g, x, 450, n, { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: HC }); txt(g, x, 476, f, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute }); return { g, r, tv, v, x }; });
const kAr = mk(phK, 'g', {}); mk(kAr, 'line', { x1: 110, y1: 520, x2: 680, y2: 520, stroke: NC, 'stroke-width': 5 }); mk(kAr, 'path', { d: 'M668 508 L692 520 L668 532', fill: 'none', stroke: NC, 'stroke-width': 5, 'stroke-linejoin': 'round' });
const kAt = txt(phK, 392, 104, 'ALPHA HYDROGENS = HELPERS', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: GD });
const kAs = txt(phK, 392, 552, 'MORE STABLE', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: NC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* right cards */
const rxA = PUC.solution($('#rxA'), [[K(`${tc(OC, '\\mathrm{NH_2}')} \\text{ lone pair next to the ring}`)], [K(`\\text{pair flows in} \\Rightarrow ${tc(EC, '-')} \\text{ at ortho, para}`)], [K(`{+R}: \\mathrm{-X, -OH, -OR, -NH_2, -NHR, -NR_2}`)], [K(`{-R}: \\mathrm{-COOH, -CHO, {>}C{=}O, -CN, -NO_2}`)]], { label: 'RESONANCE EFFECT · ON THE BENCH', y0: 70, dy: 50 });
const tRA = [T0('S2'), T0('S5'), T0('S6'), wt('S7', 'include')];
const rxD = PUC.solution($('#rxD'), [[K(`${tc(NC, '\\mathrm{C^+}')}: \\text{empty p orbital}`)], [K(`\\text{next carbon: } ${tc(GD, '\\alpha\\text{-H}')}`)], [K(`\\text{C-H pair leans in} \\Rightarrow ${tc(NC, '+')} \\text{ shared}`)], [K(`\\sigma \\text{ electrons spread: hyperconjugation}`)]], { label: 'HYPERCONJUGATION · STEP BY STEP', y0: 70, dy: 50 });
const tRD = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const rxG = PUC.solution($('#rxG'), [[K(`\\mathrm{CH_3^+}: 0 \\quad \\mathrm{CH_3CH_2^+}: 3`)], [K(`\\mathrm{(CH_3)_2CH^+}: 6 \\quad \\mathrm{(CH_3)_3C^+}: 9`)], [K(`3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+}`)]], { label: 'COUNT THE ALPHA HYDROGENS', y0: 80, dy: 62 });
const tRG = [wt('K2', 'three'), wt('K2', 'six'), T0('K3')];
const CRA = [['Aniline', '+R · ortho, para richer', 'δ−', EC, T0('S5')], ['Nitrobenzene', '−R · ortho, para poorer', 'δ+', NC, T0('S7')]];
$('#crA').innerHTML = CRA.map(([n, c, v, vc], i) => `<div class="cr" id="ca${i}" style="top:${80 + i * 72}px;height:60px"><div class="ce" style="font:600 26px Poppins;top:13px">${n}</div><div class="cn" style="left:250px;top:19px">${c}</div><div class="cv" style="color:${vc};top:10px">${v}</div></div>`).join('');
const PRD = [['σ electrons of C-H spread into the empty p orbital', 'σ', GD, T0('D5')], ['Also called no bond resonance', 'NAME', NC, wt('D5', 'no')], ['Works next to C=C too, as in propene', 'C=C', HC, T0('D6')]];
$('#prD').innerHTML = PRD.map(([s, k, c], i) => `<div class="pr" id="pd${i}" style="top:${70 + i * 62}px;height:50px"><div class="pa" style="top:12px">${s}</div><div class="pt" style="color:${c};top:14px">${k}</div></div>`).join('');
const LNG = [['Resonance: π electrons and lone pairs move', OC, wt('K3', 'stability')], ['Hyperconjugation: σ electrons of C-H move', GD, wt('K3', 'tertiary')]];
$('#lnG').innerHTML = LNG.map(([s, c], i) => `<div class="ln" id="lg${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Which cation has more hyperconjugation?', opts: ['Ethyl cation', 'Tert-butyl cation'], right: 1, why: 'Tert-butyl has nine alpha hydrogens. The ethyl cation has only three.' });
const TY = [['swap', 'Substitution', 'one group swaps for another', '\\mathrm{CH_3Cl + OH^- \\to CH_3OH + Cl^-}', 'Substitution'], ['plus', 'Addition', 'adds across a double bond', '\\mathrm{CH_2{=}CH_2 + Br_2 \\to CH_2BrCH_2Br}', 'Addition'], ['minus', 'Elimination', 'removes atoms, makes a double bond', '\\mathrm{CH_3CH_2Br \\to CH_2{=}CH_2 + HBr}', 'Elimination'], ['shuffle', 'Rearrangement', 'atoms reshuffle inside one molecule', '\\text{same formula, new structure}', 'Rearrangement']];
$('#tys').innerHTML = TY.map(([ic, n, w, e], i) => `<div class="ty" id="ty${i}" style="left:${36 + (i % 2) * 776}px;top:${84 + Math.floor(i / 2) * 240}px"><i>${M.icon(ic, 32, C.ac, 2.4)}</i><div class="tn">${n}</div><div class="tw">${w}</div><div class="te">${K(e)}</div></div>`).join('');
const tTy = TY.map(x => wt('R2', x[4]));

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(OC, '\\text{resonance: } \\pi,\\ \\text{lone pairs}')} \\quad\\big|\\quad ${tc(GD, '\\text{hyperconjugation: } \\sigma\\ (\\text{C-H})')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{plus carbon} = \\text{C2}`)],
  [K(`\\text{C1}: \\mathrm{CH_3} \\Rightarrow ${tc(GD, '3')}`)],
  [K(`\\text{C3}: \\mathrm{CH_2} \\Rightarrow ${tc(GD, '2')}`)],
  [K(`${tc(GD, '3 + 2 = 5')} \\;<\\; \\text{isopropyl } ${tc(GD, '6')}`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), wt('W4', 'three'), wt('W4', 'two'), wt('W5', 'six')];
const ws = $('#wS');
const wrow = (y, labs, ac, nums) => {
  const g = mk(ws, 'g', {}), xs = labs.map((_, i) => 392 + (i - (labs.length - 1) / 2) * 150);
  xs.slice(0, -1).forEach((x, i) => mk(g, 'line', { x1: x, y1: y, x2: xs[i + 1], y2: y, stroke: C.ink2, 'stroke-width': 6 }));
  const rings = [], nm = [];
  labs.forEach((l, i) => { const isP = l.includes('⁺'); tr(ball(g, 44, isP ? NC : nums[i] ? HC : C.dim, l, 22), xs[i], y); if (nums[i]) { rings.push(mk(g, 'circle', { cx: xs[i], cy: y, r: 54, fill: 'none', stroke: GD, 'stroke-width': 4 })); nm.push(lab(g, xs[i], y - 70, `${nums[i]} α-H`, GD, 22)); } });
  return { g, rings, nm };
};
const wA = wrow(200, ['CH₃', 'CH⁺', 'CH₂', 'CH₃'], 1, [3, 0, 2, 0]), wB = wrow(430, ['CH₃', 'CH⁺', 'CH₃'], 1, [3, 0, 3]);
const wAt = lab(ws, 392, 296, 'α-H = 3 + 2 = 5', GD, 26), wBt = lab(ws, 392, 526, 'ISOPROPYL · α-H = 3 + 3 = 6', GD, 26);
const wAn = txt(ws, 36, 112, '2-BUTYL CATION', { 'font-size': 18, 'font-weight': 600, fill: HC }), wBn = txt(ws, 36, 352, 'ISOPROPYL CATION', { 'font-size': 18, 'font-weight': 600, fill: HC });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Count every hydrogen in the cation', right: 'Count only H on carbons joined to the plus carbon' });
const tsv = $('#tS');
const tG = mk(tsv, 'g', {}); [[90, 'CH₃', 1], [200, 'CH⁺', 0], [310, 'CH₃', 1]].forEach(([x, l, a], i) => { if (i) mk(tG, 'line', { x1: x - 110, y1: 120, x2: x, y2: 120, stroke: C.ink2, 'stroke-width': 5 }); });
[[90, 'CH₃', 1], [200, 'CH⁺', 0], [310, 'CH₃', 1]].forEach(([x, l, a]) => tr(ball(tG, 34, a ? HC : NC, l, 18), x, 120));
const tWr = lab(tsv, 470, 112, 'ALL H: 7', RD, 24), tRt = lab(tsv, 470, 176, 'α-H: 6', OK, 26);
const tSk = mk(tsv, 'line', { x1: 410, y1: 104, x2: 530, y2: 104, stroke: RD, 'stroke-width': 4 });
const where = PUC.where($('#wa'), { on: [], type: 'Sort +R and −R groups, count alpha hydrogens, order carbocation stability' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `In which compound does resonance make the ortho and para carbons richer in electrons?`, qW: 760,
  opts: ['Nitrobenzene', 'Benzaldehyde', 'Aniline', 'Benzonitrile'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{-NH_2}: \\text{lone pair} \\Rightarrow +R`)], [K(`\\mathrm{-NO_2, -CHO, -CN}: -R`)], [K(`\\text{only aniline: o, p richer}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 500, title: 'Recap · resonance and hyperconjugation', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Conjugated</b>: double and single bonds taking turns, or a lone pair next to a double bond', '<b>+R</b>: -X, -OH, -OR, -NH₂ push in (aniline: o, p richer) · <b>−R</b>: -COOH, -CHO, C=O, -CN, -NO₂', '<b>Hyperconjugation</b>: σ electrons of α C-H spread into an empty p orbital · no bond resonance', '<b>α-H</b>: methyl 0, ethyl 3, isopropyl 6, tert-butyl 9 ⇒ 3° > 2° > 1° > methyl', '<b>Reactions</b>: substitution, addition, elimination, rearrangement'] });
const YQ = ['What is a conjugated system?', 'Why is NH₂ a +R group, but NO₂ a −R group?', 'How many alpha hydrogens does the tert-butyl cation have?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 86', topic: 'One pure compound from a messy mixture? Purification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tSw = [wt('S3', 'moves') - 0.2, T0('S4') + 0.2, wt('S4', 'Then') - 0.1], tHy = T0('S5') + 0.6;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSw[0] - 0.5, 1.08, 560, 580], [T0('S5') + 0.8, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
  document.querySelectorAll('.fcard .fl').forEach(q => { if (q.offsetWidth > 1230) q.style.fontSize = Math.floor(26 * 1230 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.pr .pa').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(19 * 600 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ty .te').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(28 * 600 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const uu = (t, a, d = 1.0) => M.io((t - a) / d);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['Spreading', 'easier', 'spread'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Electrons') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P3', 'flow') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    op(z1, M.io((t - T0('P2')) / 0.3)); z1d.forEach((l, i) => op(l, M.io((t - wt('P2', 'turns') - i * 0.25) / 0.3))); op(z1t, M.io((t - wt('P2', 'zebra')) / 0.3));
    op(z2, M.io((t - T0('P3')) / 0.3)); op(z2t, M.io((t - T0('P3') - 0.3) / 0.3)); z2a.run(uu(t, wt('P3', 'flow') - 0.2, 0.9));
  }

  /* S + D + K: the bench */
  const sOn = t >= tS1 - 0.1 && t < tB2 + 0.4;
  if (sOn) {
    const ph = t < tD1 - 0.45 ? 1 : t < tK1 - 0.45 ? 2 : 3, z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, T0('S5') - 0.3, z, { dy: 36, ...o });
    let lb = 'MOLECULE BENCH', tags = [];
    op(ph1, ph === 1 ? M.io((t - tS1 - 0.2) / 0.3) : 0); op(phD, ph === 2 ? M.io((t - tD1 + 0.3) / 0.3) : 0); op(phK, ph === 3 ? M.io((t - tK1 + 0.3) / 0.3) : 0);
    if (ph === 1) {
      const nitro = t >= T0('S7');
      let k = 0; tSw.forEach((tt, i) => { if (t >= tt + 0.5) k = i + 1; });
      const back = t >= tHy;
      const SWT = [[tSw[0] + 0.5, 1], [tSw[1] + 0.5, 2], [tSw[2] + 0.5, 3], [tHy + 0.4, 0]];
      PI.forEach((l, i) => { let cur = ST[0].includes(i) ? 1 : 0, v = cur; SWT.forEach(([sw, st]) => { const nv = ST[st].includes(i) ? 1 : 0, u = M.clamp((t - sw + 0.5) / 0.5); if (u > 0) { v = M.lerp(cur, nv, u); cur = u >= 1 ? nv : cur; } }); op(l, v); });
      AR.forEach((pr, i) => pr.forEach((a, j) => a.run(uu(t, tSw[i] - 0.9 + j * 0.25, 0.7), M.clamp((t - tSw[i] - 0.5) / 0.3))));
      [1, 3, 5].forEach(i => { op(CH[i], !back && SM[k] === i ? M.clamp((t - tSw[k - 1] - 0.4) / 0.3) : 0); });
      op(nPl, !back && k > 0 ? 1 : 0);
      [1, 3, 5].forEach(i => { M.setT(DL[i], nitro ? 'δ+' : 'δ−'); attr(DL[i], 'fill', nitro ? NC : EC); op(DL[i], back ? M.io((t - tHy - 0.3) / 0.3) : 0); });
      M.setT(nB._t, nitro ? 'NO₂' : 'NH₂'); nLp.forEach(d => op(d, nitro ? 0 : 1));
      oLab.forEach(e => op(e, M.io((t - wt('S3', 'ortho')) / 0.3))); op(pLab, M.io((t - wt('S4', 'para')) / 0.3));
      lb = nitro ? 'MOLECULE BENCH · NITROBENZENE' : 'MOLECULE BENCH · ANILINE';
      tags = [[T0('S1'), 'C₆H₅NH₂'], [T0('S2'), 'LONE PAIR'], [tSw[0], '− AT ORTHO'], [tSw[1], '− AT PARA'], [tSw[2], '− AT ORTHO'], [tHy, 'HYBRID · o, p RICHER'], [T0('S6'), '+R GROUP'], [T0('S7'), '−R · o, p POORER']];
    } else if (ph === 2) {
      const lean = uu(t, wt('D4', 'leans') - 0.2, 1.2);
      lob.forEach(l => attr(l, 'fill-opacity', (0.28 * lean).toFixed(3))); op(lob[0], M.io((t - wt('D2', 'empty')) / 0.3) || 0); op(lob[1], M.io((t - wt('D2', 'empty')) / 0.3) || 0);
      op(empT, M.io((t - wt('D2', 'empty')) / 0.3)); hRing.forEach(r => op(r, M.io((t - wt('D3', 'alpha')) / 0.3))); op(alT, M.io((t - wt('D3', 'alpha')) / 0.3));
      hPr.forEach((d, j) => pos(d, M.lerp(318, 360, lean) + (j ? 0 : 0), M.lerp(230 + j * 18, 220 + j * 14, lean)));
      hArr.run(uu(t, wt('D4', 'leans') - 0.4, 0.9));
      op(cPl, 1 - lean); op(cDl, M.clamp((lean - 0.5) * 2)); op(hDl, M.clamp((lean - 0.5) * 2));
      lb = 'MOLECULE BENCH · ETHYL CATION';
      tags = [[T0('D2'), 'EMPTY SEAT'], [T0('D3'), 'ALPHA HYDROGENS'], [T0('D4'), 'C-H PAIR LEANS IN'], [T0('D5'), 'HYPERCONJUGATION'], [T0('D6'), 'ALSO IN PROPENE']];
    } else {
      KB.forEach(({ r, tv, v, x }, i) => { const tt = i === 0 ? wt('K2', 'zero') : wt('K2', ['three', 'six', 'nine'][i - 1]), u = M.io((t - tt + 0.1) / 0.6), h = Math.max(4, v * 30 * u); attr(r, 'y', (420 - h).toFixed(1)); attr(r, 'height', h.toFixed(1)); attr(tv, 'y', (420 - h - 14).toFixed(1)); });
      KB.forEach((B, i) => op(B.g, M.io((t - (i === 0 ? wt('K2', 'methyl') : wt('K2', ['ethyl', 'isopropyl', 'tertiary'][i - 1])) + 0.2) / 0.3)));
      op(kAr, M.io((t - T0('K3')) / 0.4)); op(kAs, M.io((t - T0('K3')) / 0.4)); op(kAt, M.io((t - T0('K1')) / 0.3));
      lb = 'MOLECULE BENCH · COUNT THE HELPERS';
      tags = [[T0('K1'), '1 α-H = 1 HELPER'], [T0('K3'), 'TERTIARY WINS']];
    }
    M.setT($('#bnL'), lb);
    let tg = null; for (const [tt, s] of tags) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tags[0][0] - 0.1, 1e9, POP);
    M.vis($('#ctr'), t, 1e9, 1e9, { dy: 0 });
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1 - 0.4, tK1 - 0.45, { dy: 0 }); M.vis($('#rxG'), t, tK1 - 0.4, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD); rxG(t, tK1 + 0.2, tRG);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1 - 0.4, tK1 - 0.45, { dy: 0 }); M.vis($('#ctG'), t, tK1 - 0.4, 1e9, { dy: 0 });
    CRA.forEach(([, , , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    PRD.forEach(([, , , tt], i) => M.vis($('#pd' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LNG.forEach(([, , tt], i) => M.vis($('#lg' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }
  const thOn = t >= tB2 - 0.1 && t < tT + 0.1;
  M.hide($('#sS'), !(sOn || thOn));
  if (thOn || sOn) {
    M.vis($('#th1'), t, tB2 + 0.05, OUT('R1'), { dy: 36, ...o }); th1(t, { tin: tB2, tOpts: wt('B2', 'ethyl') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'nine') });
    M.vis($('#ty'), t, tR1 + 0.05, OUT('T1'), { dy: 36, ...o }); TY.forEach((_, i) => M.vis($('#ty' + i), t, Math.min(tTy[i], tR1 + 1.2 + i * 0.3) - 0.1, 1e9, { dy: 16 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Spread') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Resonance') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'sigma') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    op(wA.g, M.io((t - T0('W2') - 0.3) / 0.3)); op(wAn, M.io((t - T0('W2') - 0.3) / 0.3));
    wA.rings.forEach((r, i) => op(r, M.io((t - [wt('W4', 'one'), wt('W4', 'three', 1)][i]) / 0.3))); wA.nm.forEach((r, i) => op(r, M.io((t - [wt('W4', 'three'), wt('W4', 'two')][i]) / 0.3)));
    op(wAt, M.io((t - wt('W4', 'five')) / 0.3));
    op(wB.g, M.io((t - T0('W5')) / 0.3)); op(wBn, M.io((t - T0('W5')) / 0.3)); wB.rings.forEach(r => op(r, M.io((t - wt('W5', 'methyl')) / 0.3))); wB.nm.forEach(r => op(r, M.io((t - wt('W5', 'Three')) / 0.3))); op(wBt, M.io((t - wt('W5', 'six')) / 0.3));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'count') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'only') - 0.1 });
    op(tG, M.io((t - T0('X2')) / 0.3)); op(tWr, M.io((t - wt('X2', 'every')) / 0.3)); M.drawU(tSk, M.io((t - wt('X3', 'Wrong')) / 0.35)); op(tRt, M.io((t - wt('X3', 'alpha')) / 0.3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'richer'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
