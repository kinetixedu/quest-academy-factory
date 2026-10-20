// PUC Maths Ep 44: Polar representation (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 4 canon): real part a blue, imaginary part b coral, i violet, modulus r teal, argument theta violet arc
const RE = '#2F6FEB', IM = C.ac, IV = C.violet, MO = C.teal;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const PT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const re = s => `\\textcolor{${RE}}{${s}}`, im = s => `\\textcolor{${IM}}{${s}}`, iv = s => `\\textcolor{${IV}}{${s}}`, mo = s => `\\textcolor{${MO}}{${s}}`;
const sg = neg => `\\mathbin{\\textcolor{${IM}}{${neg ? '-' : '+'}}}`;
const cz = (a, b) => `${re(a)} ${sg(String(b)[0] === '-')} ${im(String(b).replace('-', ''))}${iv('i')}`;
const ZB = '\\bar{z}', TH = iv('\\theta'), R = mo('r');
const D2R = Math.PI / 180;

const plane = (svg, o) => {
  const { ox, oy, s, x0, x1, y0, y1 } = o, X = v => ox + v * s, Y = v => oy - v * s, g = mk(svg, 'g', {});
  mk(g, 'line', { x1: X(x0), y1: oy, x2: X(x1), y2: oy, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${X(x1) + 6},${oy} l-14,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: ox, y1: Y(y0), x2: ox, y2: Y(y1), stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${ox},${Y(y1) - 6} l-7,14 h14 z`, fill: C.ink });
  if (o.ticks !== false) { for (let v = Math.ceil(x0); v <= Math.floor(x1); v++) if (v) mk(g, 'line', { x1: X(v), y1: oy - 6, x2: X(v), y2: oy + 6, stroke: C.ink, 'stroke-width': 1.5 });
    for (let v = Math.ceil(y0); v <= Math.floor(y1); v++) if (v) mk(g, 'line', { x1: ox - 6, y1: Y(v), x2: ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 1.5 }); }
  if (o.lab !== false) { txt(g, X(x1) - 2, oy + 30, 'real', { 'text-anchor': 'end', 'font-size': 16, fill: RE, 'font-weight': 600 }); txt(g, ox + 12, Y(y1) + 10, 'imaginary', { 'font-size': 16, fill: IM, 'font-weight': 600 }); }
  return { X, Y, g, ox, oy, s };
};
const zpt = (svg, bar, lab = 'z', col = C.ink) => {
  const pg = mk(svg, 'g', {}), g = mk(pg, 'g', {});
  mk(g, 'circle', bar ? { r: 11, fill: '#fff', stroke: col, 'stroke-width': 3, 'stroke-dasharray': '5 4' } : { r: 11, fill: col });
  let l = null; if (lab) { l = mk(g, 'g', {}); txt(l, 16, bar ? 32 : -14, lab, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }); if (bar) mk(l, 'line', { x1: 17, y1: 9, x2: 31, y2: 9, stroke: col, 'stroke-width': 2.5 }); }
  return { pg, g, l, set(x, y) { attr(pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } };
};
const seg = (svg, col, w = 6, dash) => mk(svg, 'line', Object.assign({ stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, dash ? { 'stroke-dasharray': dash } : {}));
const setL = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
const arcD = (ox, oy, Rr, a0, a1, sector) => { const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 0.05)); let d = sector ? `M${ox},${oy} L` : 'M'; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; d += (i ? 'L' : '') + (ox + Rr * Math.cos(a)).toFixed(1) + ',' + (oy - Rr * Math.sin(a)).toFixed(1); } return d + (sector ? 'Z' : ''); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tG1 = T0('G1'), tL1 = T0('L1'), tK1 = T0('K1'), tS1 = T0('S1'), tP1 = T0('P1'), tS3 = T0('S3'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const PH = Math.atan2(3, 4);

/* ---------- title card ---------- */
const LS = [['THE SHIP', '5 km out'], ['THE ANGLE', '37 degrees'], ['NO NEED FOR', 'east or north']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'five') - 0.1, wt('H1', 'thirty') - 0.1, wt('H1', 'No') - 0.1];

/* ---------- H ---------- */
const hs = $('#hlS'), HO = [130, 450], HS = 64, SH = 37 * D2R;
const rings = [1, 2, 3, 4, 5].map(k => mk(hs, 'path', { d: arcD(HO[0], HO[1], k * HS, -0.02, Math.PI / 2 + 0.02), fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const hBase = seg(hs, C.ink, 2.5); setL(hBase, HO[0], HO[1], HO[0] + 5.9 * HS, HO[1]);
const hRay = seg(hs, MO, 6); setL(hRay, HO[0], HO[1], HO[0] + 5 * HS * Math.cos(SH), HO[1] - 5 * HS * Math.sin(SH));
const hArc = mk(hs, 'path', { d: arcD(HO[0], HO[1], 92, 0, SH), fill: 'none', stroke: IV, 'stroke-width': 4.5 });
const hArcL = txt(hs, HO[0] + 112, HO[1] - 26, '37°', { 'font-size': 24, fill: IV, 'font-weight': 600 });
const hRayL = txt(hs, HO[0] + 2.5 * HS * Math.cos(SH) - 18, HO[1] - 2.5 * HS * Math.sin(SH) - 16, '5 km', { 'text-anchor': 'end', 'font-size': 24, fill: MO, 'font-weight': 600 });
const shipG = mk(hs, 'g', { transform: `translate(${HO[0] + 5 * HS * Math.cos(SH)},${HO[1] - 5 * HS * Math.sin(SH)})` }), ship = mk(shipG, 'g', {});
mk(ship, 'path', { d: 'M-22,0 h44 l-8,12 h-28 z', fill: C.ink }); mk(ship, 'path', { d: 'M-2,-2 v-26 l16,20 z', fill: C.ink2 });
const shipL = txt(hs, HO[0] + 5 * HS * Math.cos(SH) + 30, HO[1] - 5 * HS * Math.sin(SH) + 6, 'SHIP', { 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
const hHb = mk(hs, 'rect', { x: HO[0] - 10, y: HO[1] - 10, width: 20, height: 20, rx: 4, fill: C.ink });
const hHbL = txt(hs, HO[0], HO[1] + 34, 'HARBOUR', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 });
const ks = $('#hkS'), KO = [476, 362], KS = 46;
const kE = seg(ks, RE, 6), kN = seg(ks, IM, 6), kR = seg(ks, MO, 6);
const kA = mk(ks, 'path', { d: arcD(KO[0], KO[1], 60, 0, PH), fill: 'none', stroke: IV, 'stroke-width': 4 });
const kO = mk(ks, 'circle', { cx: KO[0], cy: KO[1], r: 7, fill: C.ink });
const kEL = txt(ks, KO[0] + 2 * KS, KO[1] + 28, '4 east', { 'text-anchor': 'middle', 'font-size': 18, fill: RE, 'font-weight': 600 });
const kNL = txt(ks, KO[0] + 4 * KS + 12, KO[1] - 1.5 * KS, '3 north', { 'font-size': 18, fill: IM, 'font-weight': 600 });
const kRL = txt(ks, KO[0] + 2 * KS - 16, KO[1] - 1.5 * KS - 14, '5', { 'text-anchor': 'end', 'font-size': 22, fill: MO, 'font-weight': 600 });

/* ---------- B: derivation ---------- */
$('#bl').insertAdjacentHTML('beforeend', `<div id="bN" style="position:absolute;left:36px;top:96px;width:712px;font:500 28px/1.4 Poppins;color:var(--ink2)">The JEE Main syllabus lists the <b style="color:var(--mo)">modulus</b> and the <b style="color:var(--iv)">argument</b> of a complex number. The polar form is built from exactly those two.</div>`);
const BS = [[`${R} = |z|, \\quad ${TH} = \\arg z`, 'recall Ep 42: how far, which way'], [`${re('a')} = ${R}\\cos${TH}`, 'cos θ = base ÷ long side'], [`${im('b')} = ${R}\\sin${TH}`, 'sin θ = height ÷ long side'],
  [`z = ${R}\\cos${TH} + ${iv('i')}\\,${R}\\sin${TH}`, 'put both back into a + ib'], [`z = ${R}\\,(\\cos${TH} + ${iv('i')}\\sin${TH})`, 'take r out: the polar form']];
$('#bSt').innerHTML = BS.map(([f, w], i) => `<div class="st" id="bs${i}" style="top:${84 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#bP').remove();
const tBs = [wt('B1', 'Recall'), wt('B3', 'base'), wt('B4', 'height'), wt('B5', 'Put'), wt('B6', 'Take')];
const bS = $('#bS'), BP = plane(bS, { ox: 120, oy: 452, s: 82, x0: -0.4, x1: 7.6, y0: -0.3, y1: 4.4 });
const bR = seg(bS, MO, 7), bDrop = seg(bS, C.ink, 3, '7 6'), bA = seg(bS, RE, 8), bB = seg(bS, IM, 8);
setL(bR, BP.X(0), BP.Y(0), BP.X(4), BP.Y(3)); setL(bDrop, BP.X(4), BP.Y(3), BP.X(4), BP.Y(0)); setL(bA, BP.X(0), BP.Y(0), BP.X(4), BP.Y(0)); setL(bB, BP.X(4), BP.Y(0), BP.X(4), BP.Y(3));
const bArc = mk(bS, 'path', { d: arcD(BP.ox, BP.oy, 74, 0, PH), fill: 'none', stroke: IV, 'stroke-width': 4.5 });
const bArcL = txt(bS, BP.X(0) + 96, BP.Y(0) - 18, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: IV, 'font-weight': 600 });
const bRA = mk(bS, 'path', { d: `M${BP.X(4) - 22},${BP.Y(0)} v-22 h22`, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
const bRL = txt(bS, BP.X(2) - 18, BP.Y(1.5) - 16, 'r = 5', { 'text-anchor': 'end', 'font-size': 26, fill: MO, 'font-weight': 600 });
const bAL = txt(bS, BP.X(2), BP.Y(0) + 40, 'a = r cos θ', { 'text-anchor': 'middle', 'font-size': 22, fill: RE, 'font-weight': 600 });
const bBL = txt(bS, BP.X(4) + 16, BP.Y(1.5) + 8, 'b = r sin θ', { 'font-size': 22, fill: IM, 'font-weight': 600 });
const bZ = zpt(bS, false, 'P'); bZ.set(BP.X(4), BP.Y(3));

/* ---------- L: live dials ---------- */
const lS = $('#lS'), LP = plane(lS, { ox: 392, oy: 292, s: 38, x0: -9.4, x1: 9.4, y0: -6.1, y1: 6.1, ticks: false });
const lOrb = mk(lS, 'circle', { cx: LP.ox, cy: LP.oy, r: 5 * 38, fill: 'none', stroke: MO, 'stroke-width': 2, 'stroke-dasharray': '6 7', opacity: 0.6 });
const lRad = seg(lS, MO, 6), lRadB = seg(lS, MO, 3, '6 6');
const lArc = mk(lS, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 4.5 }), lArcB = mk(lS, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 3, 'stroke-dasharray': '5 5', opacity: 0.7 });
const lZ = zpt(lS, false), lB = zpt(lS, true);
const tl0 = wt('L1', 'Theta'), tl1 = wt('L1', 'fixed') + 0.3, tl2 = wt('L2', 'grows') - 0.1, tl3 = wt('L2', 'direction') + 0.2, tlB = wt('L3', 'mirror') - 0.1;
const thL = t => 37 + 123 * M.io((t - tl0) / Math.max(0.5, tl1 - tl0)), rL = t => 5 + 2 * M.io((t - tl2) / Math.max(0.5, tl3 - tl2));
let lLast = '';
const th1 = PUC.think($('#th1'), { q: 'Add 2π to θ. Does z move?', opts: ['It moves', 'It stays put'], right: 1, why: 'A full turn of 360° lands on the same point. So we pick one value: -π < θ ≤ π.' });

/* ---------- S + P ---------- */
$('#scF').innerHTML = K(`z = ${cz(4, 3)}`);
$('#spF').innerHTML = K(`z \\approx ${mo('5')}\\,(\\cos ${iv('37^\\circ')} + i\\sin ${iv('37^\\circ')})`);
const scS = $('#scS'), SC = plane(scS, { ox: 150, oy: 462, s: 60, x0: -0.4, x1: 9.4, y0: -0.3, y1: 4.4 });
const scA = seg(scS, RE, 8), scB = seg(scS, IM, 8); setL(scA, SC.X(0), SC.Y(0), SC.X(4), SC.Y(0)); setL(scB, SC.X(4), SC.Y(0), SC.X(4), SC.Y(3));
const scZ = zpt(scS, false); scZ.set(SC.X(4), SC.Y(3));
const scAL = txt(scS, SC.X(2), SC.Y(0) + 36, 'along 4', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 }), scBL = txt(scS, SC.X(4) + 14, SC.Y(1.5) + 8, 'up 3', { 'font-size': 20, fill: IM, 'font-weight': 600 });
const spS = $('#spS'), SPP = plane(spS, { ox: 150, oy: 462, s: 60, x0: -0.4, x1: 9.4, y0: -0.3, y1: 4.4 });
const spR = seg(spS, MO, 7); setL(spR, SPP.X(0), SPP.Y(0), SPP.X(4), SPP.Y(3));
const spA = mk(spS, 'path', { d: arcD(SPP.ox, SPP.oy, 70, 0, PH), fill: 'none', stroke: IV, 'stroke-width': 4.5 });
const spZ = zpt(spS, false); spZ.set(SPP.X(4), SPP.Y(3));
const spRL = txt(spS, SPP.X(2) - 14, SPP.Y(1.5) - 14, 'how far: 5', { 'text-anchor': 'end', 'font-size': 20, fill: MO, 'font-weight': 600 }), spAL = txt(spS, SPP.X(0) + 86, SPP.Y(0) - 14, 'which way: 37°', { 'font-size': 20, fill: IV, 'font-weight': 600 });
const PSx = [[`z_1 z_2 = ${mo('r_1 r_2')}\\,[\\cos(${iv('\\theta_1 + \\theta_2')}) + i\\sin(${iv('\\theta_1 + \\theta_2')})]`, 'compound angle formulas (Ep 33) do the work', 32], [`${iv('i')} = ${mo('1')}\\,(\\cos ${iv('90^\\circ')} + i\\sin ${iv('90^\\circ')})`, 'i is one unit, at 90°', 38], [`${iv('i')}\\,z: \\ ${R}\\ \\text{stays},\\ \\ ${TH} \\to ${TH} + ${iv('90^\\circ')}`, 'multiplying by i turns z a quarter turn', 38]];
$('#pSt').innerHTML = PSx.map(([f, w, fs], i) => `<div class="st" id="pst${i}" style="top:${92 + i * 120}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${fs}px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('P1', 'Multiply'), wt('P2', 'which'), wt('P2', 'turns')];
const pS = $('#pS'), PP = plane(pS, { ox: 410, oy: 300, s: 48, x0: -6.6, x1: 7, y0: -4.6, y1: 5.2 });
const pGhost = seg(pS, MO, 3, '6 6'); setL(pGhost, PP.ox, PP.oy, PP.X(4), PP.Y(3));
const pRad = seg(pS, MO, 6), pTurn = mk(pS, 'path', { d: '', fill: 'none', stroke: IV, 'stroke-width': 4.5 });
const pZ0 = zpt(pS, true, 'z', C.ink2); pZ0.set(PP.X(4), PP.Y(3));
const pZ = zpt(pS, false, 'iz'); const pTL = txt(pS, PP.X(0) + 70, PP.Y(0) - 92, '+90°', { 'font-size': 22, fill: IV, 'font-weight': 600 });
const pZL = txt(pS, PP.X(-3) - 18, PP.Y(4) - 2, '-3 + 4i', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const th2 = PUC.think($('#th2'), { q: 'Is 2(cos 60° - i sin 60°) in polar form?', opts: ['Yes', 'No'], right: 1, why: 'Polar form needs a plus sign: 2(cos(-60°) + i sin(-60°)). The angle is -60°.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`z = ${R}\\,(\\cos${TH} + ${iv('i')}\\sin${TH})`);

/* ---------- W ---------- */
$('#wq').innerHTML = `${K(`z = ${re('1')} + ${im('\\sqrt3')}\\,${iv('i')}`)}<br>Write z in polar form.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${R} = \\sqrt{1 + 3} = ${mo('2')}`)], [K(`\\cos${TH} = \\tfrac{1}{2}, \\quad \\sin${TH} = \\tfrac{\\sqrt3}{2}`)], [K(`\\text{both} > 0 \\;\\Rightarrow\\; \\text{Q1},\\ \\ ${TH} = ${iv('\\tfrac{\\pi}{3}')}`)],
  [K(`z = ${mo('2')}\\left(\\cos${iv('\\tfrac{\\pi}{3}')} + i\\sin${iv('\\tfrac{\\pi}{3}')}\\right)`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'r'), wt('W4', 'cos'), wt('W5', 'Both'), wt('W6', 'So')];
const wS = $('#wS'), WP = plane(wS, { ox: 190, oy: 460, s: 160, x0: -0.25, x1: 3.3, y0: -0.15, y1: 2.35, ticks: false });
const wP = [1, Math.sqrt(3)];
const wA = seg(wS, RE, 7), wB = seg(wS, IM, 7, '8 6'), wR = seg(wS, MO, 7);
setL(wA, WP.X(0), WP.Y(0), WP.X(1), WP.Y(0)); setL(wB, WP.X(1), WP.Y(0), WP.X(1), WP.Y(wP[1])); setL(wR, WP.X(0), WP.Y(0), WP.X(1), WP.Y(wP[1]));
const wArc = mk(wS, 'path', { d: arcD(WP.ox, WP.oy, 70, 0, Math.PI / 3), fill: 'none', stroke: IV, 'stroke-width': 4.5 });
const wZ = zpt(wS, false); wZ.set(WP.X(1), WP.Y(wP[1]));
const wAL = txt(wS, WP.X(0.5), WP.Y(0) + 36, '1', { 'text-anchor': 'middle', 'font-size': 24, fill: RE, 'font-weight': 600 });
const wBL = txt(wS, WP.X(1) + 16, WP.Y(0.85), '√3', { 'font-size': 24, fill: IM, 'font-weight': 600 });
const wRL = txt(wS, WP.X(0.5) - 16, WP.Y(0.85) - 8, 'r = 2', { 'text-anchor': 'end', 'font-size': 24, fill: MO, 'font-weight': 600 });
const wArcL = txt(wS, WP.X(0) + 86, WP.Y(0) - 22, 'π/3', { 'font-size': 22, fill: IV, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`-2\\,(\\cos\\theta + i\\sin\\theta):\\ \\ r = -2`), right: K(`= 2\\,(\\cos(\\theta + \\pi) + i\\sin(\\theta + \\pi)),\\ \\ ${R} = 2`) });
const tS = $('#tS'), TP = plane(tS, { ox: 230, oy: 140, s: 46, x0: -2.8, x1: 2.8, y0: -2.4, y1: 2.4, ticks: false, lab: false });
const TA = 40 * D2R;
const tU = seg(tS, C.ink2, 3, '6 6'); setL(tU, TP.ox, TP.oy, TP.X(2 * Math.cos(TA)), TP.Y(2 * Math.sin(TA)));
const tUL = txt(tS, TP.X(2 * Math.cos(TA)) + 10, TP.Y(2 * Math.sin(TA)) - 4, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const tV = seg(tS, C.ok, 5); setL(tV, TP.ox, TP.oy, TP.X(-2 * Math.cos(TA)), TP.Y(-2 * Math.sin(TA)));
const tVd = mk(tS, 'circle', { cx: TP.X(-2 * Math.cos(TA)), cy: TP.Y(-2 * Math.sin(TA)), r: 9, fill: C.ink });
const tVa = mk(tS, 'path', { d: arcD(TP.ox, TP.oy, 34, TA, TA + Math.PI), fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const tVL = txt(tS, TP.X(-2 * Math.cos(TA)) - 14, TP.Y(-2 * Math.sin(TA)) + 30, 'θ + π, r = 2', { 'text-anchor': 'start', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'JEE ADVANCED'], type: 'Powers and products of complex numbers, easy only in polar form' });
const OP = (r, a) => K(`${r}\\left(\\cos\\tfrac{${a}}{12} + i\\sin\\tfrac{${a}}{12}\\right)`);
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 760, cols: 1, optW: 800, optH: 70, optY: 222, optFs: 30,
  q: `${K(`z = (1 + i)(\\sqrt3 + i)`)}<br>Which is the polar form of z?`,
  opts: [OP('2\\sqrt2', '5\\pi'), OP('2\\sqrt2', '\\pi'), OP('2', '5\\pi'), OP('4', '5\\pi')], right: 0 });
const so = PUC.solution($('#so'), [[K(`1 + i:\\ ${R} = \\sqrt2,\\ ${TH} = \\tfrac{\\pi}{4}`)], [K(`\\sqrt3 + i:\\ ${R} = 2,\\ ${TH} = \\tfrac{\\pi}{6}`)], [K(`${R} = \\sqrt2 \\times 2 = 2\\sqrt2`)], [K(`${TH} = \\tfrac{\\pi}{4} + \\tfrac{\\pi}{6} = \\tfrac{5\\pi}{12}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'One'), wt('A3', 'Root'), wt('A4', 'Multiply'), wt('A4', 'Add')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · polar form', y0: 100, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`z = ${R}\\,(\\cos${TH} + ${iv('i')}\\sin${TH}), \\quad ${R} > 0`),
    K(`${R} = |z| = \\sqrt{${re('a')}^2 + ${im('b')}^2}, \\quad ${TH} = \\arg z`),
    K(`${re('a')} = ${R}\\cos${TH}, \\qquad ${im('b')} = ${R}\\sin${TH}`),
    K(`${ZB} = ${R}\\,(\\cos(-${TH}) + i\\sin(-${TH}))`),
    'Multiply: the r\'s multiply, the angles add'] });
const YQ = [`Write ${K('-1')} in polar form.`, `What are r and θ for ${K('3i')}?`, 'Why can r never be negative?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 45', topic: 'Some heights twice, some never: Quadratic Equations', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tl0 - 0.3, 1.06, 1360, 560], [tK1 - 0.4, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tG1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('G1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    rings.forEach((r, i) => M.vis(r, t, tMorph + 0.3 + i * 0.08, 1e9, { dy: 0, fade: 0.3 }));
    M.vis(hHb, t, tMorph + 0.3, 1e9, PT); M.vis(hHbL, t, tMorph + 0.4, 1e9, { dy: 0 }); M.draw(hBase, t, tMorph + 0.5, 0.5);
    M.draw(hRay, t, tMorph + 0.7, 0.7); M.vis(hRayL, t, tMorph + 1.1, 1e9, { dy: 0 }); M.draw(hArc, t, tMorph + 1.2, 0.5); M.vis(hArcL, t, tMorph + 1.5, 1e9, { dy: 0 });
    M.vis(ship, t, tMorph + 1.3, 1e9, PT); M.vis(shipL, t, tMorph + 1.4, 1e9, { dy: 0 });
    M.vis($('#hlP'), t, wt('H2', 'enough') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis(kO, t, tH4 - 0.1, 1e9, PT);
    const ue = M.io((t - wt('H4', 'four')) / 0.5), un = M.io((t - wt('H4', 'three')) / 0.5);
    setL(kE, KO[0], KO[1], KO[0] + 4 * KS * ue, KO[1]); M.hide(kE, ue < 0.01); setL(kN, KO[0] + 4 * KS, KO[1], KO[0] + 4 * KS, KO[1] - 3 * KS * un); M.hide(kN, un < 0.01);
    M.vis(kEL, t, wt('H4', 'four') + 0.2, 1e9, { dy: 0 }); M.vis(kNL, t, wt('H4', 'three') + 0.2, 1e9, { dy: 0 });
    M.vis($('#hkP1'), t, wt('H4', 'north') - 0.1, 1e9, POP);
    M.draw(kR, t, wt('H4', 'five') - 0.1, 0.5); M.vis(kRL, t, wt('H4', 'five') + 0.3, 1e9, { dy: 0 }); M.draw(kA, t, wt('H4', 'thirty') - 0.1, 0.5);
    M.vis($('#hkP2'), t, wt('H4', 'degrees') - 0.1, 1e9, POP);
  }

  /* B */
  const bOn = t >= tG1 - 0.1 && t < tL1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('L1');
    M.vis($('#bl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bGh'), t, wt('G1', 'not') - 0.1, 1e9, POP);
    M.vis($('#bN'), t, wt('G1', 'JEE') - 0.1, tBs[0] - 0.3, { dy: 14, outDur: 0.25, ody: -10 });
    BS.forEach((_, i) => { const el = $('#bs' + i); M.vis(el.querySelector('.n'), t, tBs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tBs[i], 0.8); M.vis(el.querySelector('.why'), t, tBs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tBs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#bHi'); M.vis(hb, t, tBs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#br'), t, tG1 + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(BP.g, t, tG1 + 0.6, 1e9, { dy: 0, fade: 0.3 }); M.vis(bZ.g, t, tG1 + 1.0, 1e9, PT);
    M.draw(bR, t, wt('B1', 'modulus') - 0.1, 0.6); M.vis(bRL, t, wt('B1', 'modulus') + 0.4, 1e9, { dy: 0 });
    M.draw(bArc, t, wt('B1', 'argument') - 0.1, 0.5); M.vis(bArcL, t, wt('B1', 'argument') + 0.3, 1e9, { dy: 0 });
    M.draw(bDrop, t, wt('B2', 'Drop') - 0.1, 0.5); M.vis(bRA, t, wt('B2', 'triangle'), 1e9, { dy: 0 });
    M.draw(bA, t, wt('B3', 'base') - 0.1, 0.5); M.vis(bAL, t, wt('B3', 'equals') - 0.1, 1e9, { dy: 0 });
    M.draw(bB, t, wt('B4', 'height') - 0.1, 0.5); M.vis(bBL, t, wt('B4', 'equals') - 0.1, 1e9, { dy: 0 });
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const th = thL(t), r = rL(t), a = th * D2R, X = LP.X(r * Math.cos(a)), Y = LP.Y(r * Math.sin(a)), Yb = LP.Y(-r * Math.sin(a));
    attr(lOrb, 'r', (r * 38).toFixed(1)); M.vis(lOrb, t, tL1 + 0.5, 1e9, { dy: 0, fade: 0.3 });
    lZ.set(X, Y); M.vis(lZ.g, t, tL1 + 0.4, 1e9, PT); setL(lRad, LP.ox, LP.oy, X, Y); M.hide(lRad, t < tL1 + 0.5);
    attr(lArc, 'd', arcD(LP.ox, LP.oy, 54, 0, a)); M.hide(lArc, t < tL1 + 0.6);
    const bOnL = t >= tlB; lB.set(X, Yb); M.vis(lB.g, t, tlB, 1e9, PT); setL(lRadB, LP.ox, LP.oy, X, Yb); M.hide(lRadB, !bOnL); attr(lArcB, 'd', arcD(LP.ox, LP.oy, 40, 0, -a)); M.hide(lArcB, !bOnL);
    const thS = Math.round(th), rS = r.toFixed(2), key = thS + '|' + rS + '|' + bOnL;
    if (key !== lLast) { lLast = key;
      $('#lR').innerHTML = `<span class="k">r</span> = ${rS}`; $('#lT').innerHTML = `<span class="k">θ</span> = ${thS}°`;
      $('#lP').innerHTML = K(`z = ${mo(r.toFixed(1))}\\,(\\cos ${iv(thS + '^\\circ')} + i\\sin ${iv(thS + '^\\circ')})`);
      const ca = r * Math.cos(a), sa = r * Math.sin(a);
      $('#lC').innerHTML = K(`\\phantom{z} = ${re(ca.toFixed(1))} ${sg(sa < 0)} ${im(Math.abs(sa).toFixed(1))}${iv('i')}`);
      $('#lB').innerHTML = K(`${ZB} = ${mo(r.toFixed(1))}\\,(\\cos(${iv('-' + thS + '^\\circ')}) + i\\sin(${iv('-' + thS + '^\\circ')}))`); }
    M.vis($('#lR'), t, tL1 + 0.3, 1e9, { dy: 10 }); M.vis($('#lT'), t, tL1 + 0.4, 1e9, { dy: 10 });
    M.vis($('#lP'), t, tL1 + 0.6, 1e9, { dy: 10 }); M.vis($('#lC'), t, tL1 + 0.8, 1e9, { dy: 10 }); M.vis($('#lB'), t, tlB + 0.1, 1e9, { dy: 10 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('S1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'move') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'full') });
  }

  /* S + P */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const outS = tP1 - 0.3, out = OUT('S3');
    M.vis($('#sc'), t, tS1 + 0.1, outS, { dx: -60, dy: 0, ...o }); PUC.write($('#scF'), t, wt('S1', 'Cartesian'), 0.7);
    M.vis(SC.g, t, tS1 + 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(scZ.g, t, tS1 + 0.5, 1e9, PT);
    M.draw(scA, t, wt('S1', 'along') - 0.1, 0.4); M.vis(scAL, t, wt('S1', 'along'), 1e9, { dy: 0 }); M.draw(scB, t, wt('S1', 'up') - 0.1, 0.4); M.vis(scBL, t, wt('S1', 'up'), 1e9, { dy: 0 });
    M.vis($('#scP'), t, wt('S1', 'adding') - 0.1, 1e9, POP);
    M.vis($('#sp'), t, T0('S2') - 0.1, outS, { dx: 60, dy: 0, ...o }); PUC.write($('#spF'), t, T0('S2') + 0.1, 0.8);
    M.vis(SPP.g, t, T0('S2') + 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(spZ.g, t, T0('S2') + 0.3, 1e9, PT);
    M.draw(spR, t, wt('S2', 'far') - 0.1, 0.4); M.vis(spRL, t, wt('S2', 'far'), 1e9, { dy: 0 }); M.draw(spA, t, wt('S2', 'which') - 0.1, 0.4); M.vis(spAL, t, wt('S2', 'which'), 1e9, { dy: 0 });
    M.vis($('#spP'), t, wt('S2', 'multiplying') - 0.1, 1e9, POP);
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pGh'), t, tP1 + 0.4, 1e9, POP);
    PSx.forEach((_, i) => { const el = $('#pst' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.9); M.vis(el.querySelector('.why'), t, tPs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#pP'), t, wt('P1', 'add') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(PP.g, t, tP1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(pZ0.g, t, tP1 + 0.6, 1e9, PT); M.draw(pGhost, t, tP1 + 0.7, 0.4);
    const tr = wt('P2', 'Watch') - 0.6, u = M.io((t - tr) / 1.2), ang = PH + u * Math.PI / 2, X = PP.X(5 * Math.cos(ang)), Y = PP.Y(5 * Math.sin(ang));
    pZ.set(X, Y); M.vis(pZ.g, t, tr - 0.1, 1e9, PT); setL(pRad, PP.ox, PP.oy, X, Y); M.hide(pRad, t < tr - 0.1);
    attr(pTurn, 'd', u > 0.01 ? arcD(PP.ox, PP.oy, 5 * 48, PH, ang) : ''); M.vis(pTL, t, tr + 1.0, 1e9, { dy: 0 }); M.vis(pZL, t, tr + 1.2, 1e9, { dy: 0 });
    M.vis($('#th2'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'polar') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Polar') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'times') - 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.4, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(WP.g, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.vis(wZ.g, t, T0('W2') + 0.8, 1e9, PT);
    M.draw(wA, t, T0('W2') + 0.9, 0.4); M.vis(wAL, t, T0('W2') + 1.1, 1e9, { dy: 0 }); M.draw(wB, t, T0('W2') + 1.2, 0.4); M.vis(wBL, t, T0('W2') + 1.4, 1e9, { dy: 0 });
    M.draw(wR, t, tW[0] - 0.1, 0.5); M.vis(wRL, t, tW[0] + 0.3, 1e9, { dy: 0 });
    M.draw(wArc, t, tW[2] + 0.4, 0.6); M.vis(wArcL, t, tW[2] + 0.8, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'never') - 0.1, tRight: wt('X3', 'Turn') - 0.1 });
    M.vis(TP.g, t, tX1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.draw(tU, t, wt('X2', 'cos') - 0.1, 0.4); M.vis(tUL, t, wt('X2', 'cos'), 1e9, { dy: 0 });
    M.draw(tVa, t, wt('X3', 'Turn'), 0.6); M.draw(tV, t, wt('X3', 'pi') - 0.1, 0.4); M.vis(tVd, t, wt('X3', 'pi'), 1e9, PT); M.vis(tVL, t, wt('X3', 'pi') + 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'Advanced')], tType: wt('J1', 'powers') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
