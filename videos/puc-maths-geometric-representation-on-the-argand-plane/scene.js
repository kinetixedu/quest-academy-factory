// PUC Maths Ep 43: Geometric representation on the Argand plane (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 4 canon): real part / real axis blue, imaginary part / imaginary axis coral, i violet, modulus teal
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
const ZB = '\\bar{z}';

const plane = (svg, o) => {
  const { ox, oy, s, x0, x1, y0, y1 } = o, X = v => ox + v * s, Y = v => oy - v * s, g = mk(svg, 'g', {});
  const ax = mk(g, 'line', { x1: X(x0), y1: oy, x2: X(x1), y2: oy, stroke: C.ink, 'stroke-width': 2.5 });
  const ah = mk(g, 'path', { d: `M${X(x1) + 6},${oy} l-14,-7 v14 z`, fill: C.ink });
  const ay = mk(g, 'line', { x1: ox, y1: Y(y0), x2: ox, y2: Y(y1), stroke: C.ink, 'stroke-width': 2.5 });
  const yh = mk(g, 'path', { d: `M${ox},${Y(y1) - 6} l-7,14 h14 z`, fill: C.ink });
  if (o.ticks !== false) { for (let v = Math.ceil(x0); v <= Math.floor(x1); v++) if (v) mk(g, 'line', { x1: X(v), y1: oy - 6, x2: X(v), y2: oy + 6, stroke: C.ink, 'stroke-width': 1.5 });
    for (let v = Math.ceil(y0); v <= Math.floor(y1); v++) if (v) mk(g, 'line', { x1: ox - 6, y1: Y(v), x2: ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 1.5 }); }
  let lx = null, ly = null;
  if (o.lab !== false) { lx = txt(g, X(x1) - 2, oy + 30, o.lab === 'long' ? 'real axis' : 'real', { 'text-anchor': 'end', 'font-size': 16, fill: RE, 'font-weight': 600 }); ly = txt(g, ox + 12, Y(y1) + 10, o.lab === 'long' ? 'imaginary axis' : 'imaginary', { 'font-size': 16, fill: IM, 'font-weight': 600 }); }
  return { X, Y, g, ox, oy, s, ax, ay, ah, yh, lx, ly };
};
const zpt = (svg, bar, lab = 'z', col = C.ink) => {
  const pg = mk(svg, 'g', {}), g = mk(pg, 'g', {});
  mk(g, 'circle', bar ? { r: 11, fill: '#fff', stroke: col, 'stroke-width': 3, 'stroke-dasharray': '5 4' } : { r: 11, fill: col });
  let l = null; if (lab) { l = mk(g, 'g', {}); txt(l, 16, bar ? 32 : -14, lab, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }); if (bar) mk(l, 'line', { x1: 17, y1: 9, x2: 31, y2: 9, stroke: col, 'stroke-width': 2.5 }); }
  return { pg, g, l, set(x, y) { attr(pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } };
};
const seg = (svg, col, w = 6, dash) => mk(svg, 'line', Object.assign({ stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, dash ? { 'stroke-dasharray': dash } : {}));
const setL = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tL1 = T0('L1'), tK1 = T0('K1'), tG1 = T0('G1'), tD1 = T0('D1'), tV1 = T0('V1'), tS1 = T0('S1'), tS2 = T0('S2'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['MINUS TWO', 'left of zero'], ['THREE', 'right of zero'], ['THREE PLUS TWO i', K(cz(3, 2)) + ' ... where?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Minus') - 0.1, wt('H1', 'Three') - 0.1, tMorph - 0.6];

/* ---------- H ---------- */
const hs = $('#hlS'), HX = v => 392 + v * 62, HY = 300;
const hLn = mk(hs, 'line', { x1: 60, y1: HY, x2: 724, y2: HY, stroke: C.ink, 'stroke-width': 3 });
const hTk = []; for (let v = -5; v <= 5; v++) { hTk.push(mk(hs, 'line', { x1: HX(v), y1: HY - 9, x2: HX(v), y2: HY + 9, stroke: C.ink, 'stroke-width': 2 })); hTk.push(txt(hs, HX(v), HY + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 })); }
const hFull = mk(hs, 'line', { x1: 64, y1: HY, x2: 720, y2: HY, stroke: RE, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.85 });
const hD1 = mk(hs, 'circle', { cx: HX(-2), cy: HY, r: 12, fill: RE }), hD2 = mk(hs, 'circle', { cx: HX(3), cy: HY, r: 12, fill: RE });
const hChip = mk(hs, 'g', {}), hChipI = mk(hChip, 'g', {});
mk(hChipI, 'rect', { x: -96, y: -32, width: 192, height: 64, rx: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
txt(hChipI, -14, 12, '3 + 2i', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
txt(hChipI, 66, 13, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 36, fill: C.red, 'font-weight': 700 });
const hXL = txt(hs, HX(-3.5), HY - 70, '✗', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, fill: C.red, 'font-weight': 700 });
const hXR = txt(hs, HX(3.5), HY - 70, '✗', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, fill: C.red, 'font-weight': 700 });
const ks = $('#hkS');
const roads = [430, 480, 530].map(y => mk(ks, 'line', { x1: 60, y1: y, x2: 724, y2: y, stroke: '#D5D9E1', 'stroke-width': 8, 'stroke-linecap': 'round' }));
const cross = [200, 320, 440, 560].map(x => mk(ks, 'line', { x1: x, y1: 412, x2: x, y2: 548, stroke: '#D5D9E1', 'stroke-width': 8, 'stroke-linecap': 'round' }));
const kMain = mk(ks, 'line', { x1: 60, y1: 480, x2: 724, y2: 480, stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const kCross = mk(ks, 'line', { x1: 320, y1: 412, x2: 320, y2: 548, stroke: IM, 'stroke-width': 8, 'stroke-linecap': 'round' });
const kMainL = txt(ks, 724, 470, '4TH MAIN', { 'text-anchor': 'end', 'font-size': 16, fill: RE, 'font-weight': 600, 'letter-spacing': 1.5 });
const kCrossL = txt(ks, 332, 424, '2ND CROSS', { 'font-size': 16, fill: IM, 'font-weight': 600, 'letter-spacing': 1.5 });
const kHouse = mk(ks, 'rect', { x: 308, y: 468, width: 24, height: 24, rx: 4, fill: C.ink });

/* ---------- P: the plane ---------- */
const PS = [['The flat line: the <span style="color:#2F6FEB">real axis</span>', 'every real number keeps its spot', 1], ['The upright line: the <span style="color:#E4572E">imaginary axis</span>', 'it goes straight up through zero', 1],
  [`${re('x')} + ${iv('i')}\\,${im('y')} \\;\\longleftrightarrow\\; P(${re('x')},\\ ${im('y')})`, 'go x along, then y up', 0], ['One point for every number, and back', 'the complex plane, or the Argand plane', 1]];
$('#pSt').innerHTML = PS.map(([f, w, tx], i) => `<div class="st${tx ? ' t' : ''}" id="ps${i}" style="top:${84 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${tx ? f : K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#hs').innerHTML = `<div class="hist" id="hist" style="top:452px"><div class="hn">Jean-Robert Argand · essay, 1806</div><div class="hw">Caspar Wessel published the same idea in 1799</div></div>`;
const tPs = [wt('P2', 'flat'), wt('P2', 'second'), wt('P4', 'complex'), wt('P5', 'Every')];
const pS = $('#pS'), PP = plane(pS, { ox: 430, oy: 296, s: 48, x0: -6.6, x1: 6.2, y0: -3.8, y1: 5.2, lab: 'long' });
const pReH = mk(pS, 'line', { x1: PP.X(-6.6), y1: PP.oy, x2: PP.X(6.2), y2: PP.oy, stroke: RE, 'stroke-width': 7, 'stroke-linecap': 'round' });
const pImH = mk(pS, 'line', { x1: PP.ox, y1: PP.Y(-3.8), x2: PP.ox, y2: PP.Y(5.2), stroke: IM, 'stroke-width': 7, 'stroke-linecap': 'round' });
const pOL = txt(pS, PP.ox - 12, PP.oy + 28, 'O', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
// walkers: the demo 3 + 2i then the six NCERT points
const PTS = [[3, 2, '3 + 2i', 18, -14, 'start'], [2, 4, '2 + 4i', 18, -10, 'start'], [-2, 3, '-2 + 3i', -18, -12, 'end'], [-5, -2, '-5 - 2i', 0, 36, 'middle'], [1, -2, '1 - 2i', 18, 30, 'start'], [2, 0, '2 + 0i', 6, 38, 'start'], [0, 1, 'i', -16, -6, 'end']];
const tPts = [wt('P4', 'along') - 0.3, wt('L2', 'Two'), wt('L3', 'Minus'), wt('L4', 'Minus'), wt('L4', 'One'), wt('L5', 'Two'), wt('L5', 'Zero')];
const W = PTS.map(([x, y, l, dx, dy, an], i) => ({ x, y, a: seg(pS, RE, 5), b: seg(pS, IM, 5), d: zpt(pS, false, null, i ? C.ink : C.ink2), l: txt(pS, PP.X(x) + dx, PP.Y(y) + dy, l, { 'text-anchor': an, 'font-size': 20, fill: i ? C.ink : C.ink2, 'font-weight': 600 }) }));
W.forEach(w => w.d.set(PP.X(w.x), PP.Y(w.y)));
const LR = [[cz(2, 4), '(2, 4)'], [cz('-2', 3), '(-2, 3)'], [cz('-5', -2), '(-5, -2)'], [cz(1, -2), '(1, -2)'], [cz(2, 0), '(2, 0)'], [cz(0, 1), '(0, 1)']];
$('#lrs').innerHTML = LR.map(([f, a], i) => `<div class="lr" id="lr${i}" style="top:${84 + i * 66}px"><div class="lf">${K(f)}</div><div class="la">${a}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Where does -4i live?', opts: ['On the real axis', 'On the imaginary axis'], right: 1, why: 'Its real part is 0, so it sits at (0, -4): four steps below O.' });

/* ---------- G ---------- */
$('#gmF').innerHTML = K(`${mo('|z|')} = OP = \\sqrt{${re('x')}^2 + ${im('y')}^2}`);
$('#gcF').innerHTML = K(`${ZB} = ${re('x')} ${sg(1)} ${iv('i')}\\,${im('y')}`);
const gmS = $('#gmS'), GM = plane(gmS, { ox: 150, oy: 480, s: 64, x0: -0.5, x1: 9, y0: -0.4, y1: 4.6 });
const gmR = seg(gmS, MO, 6); setL(gmR, GM.ox, GM.oy, GM.X(4), GM.Y(3)); const gmZ = zpt(gmS, false, 'P'); gmZ.set(GM.X(4), GM.Y(3));
const gmL = txt(gmS, GM.X(2) - 16, GM.Y(1.5) - 14, '|z| = 5', { 'text-anchor': 'end', 'font-size': 24, fill: MO, 'font-weight': 600 });
const gmZL = txt(gmS, GM.X(4) + 22, GM.Y(3) + 34, '4 + 3i', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const gcS = $('#gcS'), GC = plane(gcS, { ox: 180, oy: 370, s: 44, x0: -0.5, x1: 11.5, y0: -4.2, y1: 4.2 });
const gcM = mk(gcS, 'line', { x1: GC.X(-0.5), y1: GC.oy, x2: GC.X(11.5), y2: GC.oy, stroke: RE, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 });
const gcL = seg(gcS, IM, 4, '7 6'); setL(gcL, GC.X(4), GC.Y(3) + 14, GC.X(4), GC.Y(-3) - 14);
const gcZ = zpt(gcS, false), gcB = zpt(gcS, true); gcZ.set(GC.X(4), GC.Y(3)); gcB.set(GC.X(4), GC.Y(-3));
const gcML = txt(gcS, GC.X(11.3), GC.oy - 14, 'the mirror', { 'text-anchor': 'end', 'font-size': 18, fill: RE, 'font-weight': 600 });

/* ---------- D ---------- */
const DS = [[`z_1 - z_2 = (${re('x_1 - x_2')}) + ${iv('i')}\\,(${im('y_1 - y_2')})`, 'subtract real from real, imaginary from imaginary'], [`|z_1 - z_2| = \\sqrt{(${re('x_1 - x_2')})^2 + (${im('y_1 - y_2')})^2}`, 'its modulus: square, add, take the root'],
  [`\\phantom{|z_1 - z_2|} = ${mo('P_1P_2')}`, 'exactly the distance formula']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${92 + i * 112}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:34px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Subtract'), wt('D3', 'modulus'), wt('D4', 'distance')];
const dS = $('#dS'), DP = plane(dS, { ox: 392, oy: 300, s: 54, x0: -6.4, x1: 6.4, y0: -4, y1: 4.4 });
const P1 = [-3, 3], P2 = [3, -1];
const dA = seg(dS, RE, 6), dB = seg(dS, IM, 6), dH = seg(dS, MO, 6);
const d1 = zpt(dS, false, null), d2 = zpt(dS, false, null); d1.set(DP.X(P1[0]), DP.Y(P1[1])); d2.set(DP.X(P2[0]), DP.Y(P2[1]));
const d1L = txt(dS, DP.X(P1[0]) - 16, DP.Y(P1[1]) - 14, 'P₁ (z₁)', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const d2L = txt(dS, DP.X(P2[0]) + 16, DP.Y(P2[1]) + 32, 'P₂ (z₂)', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const dAL = txt(dS, DP.X(0), DP.Y(P1[1]) - 14, 'x₁ - x₂', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 });
const dBL = txt(dS, DP.X(P2[0]) + 14, DP.Y(1.4), 'y₁ - y₂', { 'font-size': 20, fill: IM, 'font-weight': 600 });
const dHL = txt(dS, DP.X(-0.4) - 12, DP.Y(0.6) + 40, 'distance', { 'text-anchor': 'end', 'font-size': 20, fill: MO, 'font-weight': 600 });

/* ---------- V: rules draw shapes ---------- */
const vlS = $('#vlS'), VL = plane(vlS, { ox: 360, oy: 270, s: 80, x0: -3.9, x1: 4.6, y0: -2.9, y1: 2.9 });
const vrS = $('#vrS'), VR = plane(vrS, { ox: 392, oy: 270, s: 80, x0: -4.4, x1: 4.4, y0: -2.9, y1: 2.9 });
const vlTr = mk(vlS, 'path', { d: '', fill: 'none', stroke: RE, 'stroke-width': 6, 'stroke-linecap': 'round' });
const vrTr = mk(vrS, 'path', { d: '', fill: 'none', stroke: MO, 'stroke-width': 6, 'stroke-linecap': 'round' });
const vlZ = zpt(vlS, false), vlB = zpt(vlS, true), vrZ = zpt(vrS, false), vrB = zpt(vrS, true);
const vrR = seg(vrS, MO, 3, '6 6');
const tv0 = wt('V1', 'move') - 0.1, tv1 = T1('V1') - 0.2, tv2 = wt('V2', 'stay') - 0.4, tv3 = T1('V2') + 0.3;
const yL = t => -2.5 + 5 * M.io((t - tv0) / Math.max(0.5, tv1 - tv0)), aC = t => 0.4 + 2 * Math.PI * M.io((t - tv2) / Math.max(0.5, tv3 - tv2));
const th2 = PUC.think($('#th2'), { q: '|z - 1| = 3: a line, or a circle?', opts: ['A line', 'A circle'], right: 1, why: 'Every such z is 3 away from the point 1: a circle, centre 1, radius 3.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${re('x')} + ${iv('i')}\\,${im('y')} \\;\\leftrightarrow\\; (${re('x')},\\ ${im('y')}) \\qquad ${mo('|z_1 - z_2|')} = \\text{distance}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `${K(`z_1 = ${cz(1, 2)}, \\quad z_2 = ${cz(4, -2)}`)}<br>How far apart are they on the Argand plane?`;
const wsol = PUC.solution($('#wl'), [
  [K(`z_1 - z_2 = (1 - 4) + i\\,(2 + 2)`)], [K(`\\phantom{z_1 - z_2} = ${cz('-3', 4)}`)], [K(`${mo('|z_1 - z_2|')} = \\sqrt{9 + 16}`)], [K(`\\phantom{|z_1 - z_2|} = \\sqrt{25} = ${mo('5')}`)], ['5 units apart: a 3, 4, 5 triangle']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Step'), wt('W3', 'three'), wt('W4', 'modulus'), wt('W5', 'Root'), wt('W6', 'So')];
const wS = $('#wS'), WP = plane(wS, { ox: 230, oy: 330, s: 66, x0: -1, x1: 7, y0: -3.2, y1: 3.4 });
const wA = seg(wS, RE, 6), wB = seg(wS, IM, 6), wH = seg(wS, MO, 6);
setL(wA, WP.X(1), WP.Y(2), WP.X(4), WP.Y(2)); setL(wB, WP.X(4), WP.Y(2), WP.X(4), WP.Y(-2)); setL(wH, WP.X(1), WP.Y(2), WP.X(4), WP.Y(-2));
const w1 = zpt(wS, false, null), w2 = zpt(wS, false, null); w1.set(WP.X(1), WP.Y(2)); w2.set(WP.X(4), WP.Y(-2));
const w1L = txt(wS, WP.X(1) - 16, WP.Y(2) - 14, 'z₁', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const w2L = txt(wS, WP.X(4) + 16, WP.Y(-2) + 32, 'z₂', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const wAL = txt(wS, WP.X(2.5), WP.Y(2) - 14, '3', { 'text-anchor': 'middle', 'font-size': 24, fill: RE, 'font-weight': 600 });
const wBL = txt(wS, WP.X(4) + 14, WP.Y(0) - 10, '4', { 'font-size': 24, fill: IM, 'font-weight': 600 });
const wHL = txt(wS, WP.X(2.5) - 18, WP.Y(0) + 10, '5', { 'text-anchor': 'end', 'font-size': 26, fill: MO, 'font-weight': 700 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`|z + 2i| = 3 \\;\\Rightarrow\\; \\text{centre } 2i`), right: K(`z + 2i = z - (-2i) \\;\\Rightarrow\\; \\text{centre } -2i,\\ \\text{radius } 3`) });
const tS = $('#tS'), TP = plane(tS, { ox: 250, oy: 96, s: 30, x0: -4.2, x1: 4.4, y0: -5.5, y1: 2.7, ticks: false, lab: false });
const tC = mk(tS, 'circle', { cx: TP.X(0), cy: TP.Y(-2), r: 90, fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const tCd = mk(tS, 'circle', { cx: TP.X(0), cy: TP.Y(-2), r: 7, fill: C.ok });
const tCL = txt(tS, TP.X(0) + 14, TP.Y(-2) + 6, 'centre -2i', { 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const tWx = txt(tS, TP.X(0) + 2, TP.Y(2) + 9, '✗', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, fill: C.red, 'font-weight': 700 });
const tWL = txt(tS, TP.X(0) + 18, TP.Y(2) + 6, 'not 2i', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'What an equation in z draws: a line or a circle' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 760,
  q: `${K(`|z - 2| = |z + 4i|`)}<br>All such z = x + iy lie on which line?`,
  opts: [K('x + 2y + 3 = 0'), K('x - 2y + 3 = 0'), K('2x + y + 3 = 0'), K('x + 2y - 3 = 0')], right: 0, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`z = x + iy`)], [K(`(x - 2)^2 + y^2 = x^2 + (y + 4)^2`)], [K(`-4x + 4 = 8y + 16`)], [K(`x + 2y + 3 = 0`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Let'), wt('A2', 'left'), wt('A4', 'Expand'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · the Argand plane', y0: 100, dy: 78, txt: [0, 1, 0, 0, 0],
  lines: [K(`${re('x')} + ${iv('i')}\\,${im('y')} \\;\\leftrightarrow\\; P(${re('x')},\\ ${im('y')})`),
    'Real axis: a + i0 · Imaginary axis: 0 + ib',
    K(`${mo('|z|')} = OP, \\qquad ${ZB} = \\text{mirror image in the real axis}`),
    K(`${mo('|z_1 - z_2|')} = \\text{distance between } P_1 \\text{ and } P_2`),
    K(`|z - z_0| = r: \\ \\text{circle, centre } z_0,\\ \\text{radius } r`)] });
const YQ = [`Plot ${K('-3 + i')}. Which quadrant is it in?`, 'Where do the purely imaginary numbers live?', `What shape does ${K('|z| = 4')} draw?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 44', topic: 'Distance plus angle: the Polar Representation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPts[1] - 0.3, 1.05, 1010, 560], [T1('L6'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(hLn, t, tMorph + 0.3, 0.6); hTk.forEach((e, i) => M.vis(e, t, tMorph + 0.4 + (i >> 1) * 0.03, 1e9, { dy: 0 }));
    M.vis(hD1, t, tMorph + 0.6, 1e9, PT); M.vis(hD2, t, tMorph + 0.8, 1e9, PT);
    M.vis(hChipI, t, wt('H2', 'where') - 0.1, 1e9, { dy: -20, sp: M.SOFT });
    attr(hChip, 'transform', `translate(392,${(150 + 6 * Math.sin((t - tMorph) * 2.2)).toFixed(1)})`);
    M.vis(hXL, t, wt('H2', 'left') - 0.1, 1e9, PT); M.vis(hXR, t, wt('H2', 'right') - 0.1, 1e9, PT);
    M.draw(hFull, t, wt('H2', 'line') - 0.2, 0.6); M.vis($('#hlP'), t, wt('H2', 'full') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    [...roads, ...cross].forEach((r, i) => M.vis(r, t, tH4 - 0.1 + i * 0.05, 1e9, { dy: 0, fade: 0.25 }));
    M.draw(kMain, t, wt('H4', 'fourth') - 0.1, 0.5); M.vis(kMainL, t, wt('H4', 'fourth'), 1e9, { dy: 0 });
    M.draw(kCross, t, wt('H4', 'second') - 0.1, 0.4); M.vis(kCrossL, t, wt('H4', 'second'), 1e9, { dy: 0 });
    M.vis(kHouse, t, wt('H4', 'house') - 0.2, 1e9, PT);
  }

  /* P + L */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#pa'), t, tP1 + 0.1, tL1 - 0.1, { dx: -60, dy: 0, ...o });
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.8); M.vis(el.querySelector('.why'), t, tPs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tPs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#hist'), t, wt('P6', 'Argand') - 0.2, 1e9, { dy: 16 });
    M.vis($('#pb'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pl'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(PP.ax, t, wt('P2', 'flat') - 0.1, 0.6); M.vis(PP.ah, t, wt('P2', 'flat') + 0.4, 1e9, { dy: 0 });
    M.draw(PP.ay, t, wt('P2', 'second') - 0.1, 0.6); M.vis(PP.yh, t, wt('P2', 'second') + 0.4, 1e9, { dy: 0 });
    [...PP.g.querySelectorAll('line')].slice(2).forEach(l => M.vis(l, t, wt('P2', 'straight'), 1e9, { dy: 0, fade: 0.3 }));
    M.vis(PP.lx, t, tPs[0], 1e9, { dy: 0 }); M.vis(PP.ly, t, tPs[1], 1e9, { dy: 0 }); M.vis(pOL, t, wt('P2', 'zero'), 1e9, { dy: 0 });
    const hR = M.io((t - tPs[0] + 0.1) / 0.3) * (1 - M.io((t - tPs[1]) / 0.3)) + M.io((t - wt('L6', 'real') + 0.1) / 0.3), hI = M.io((t - tPs[1] + 0.1) / 0.3) * (1 - M.io((t - tPs[2]) / 0.3)) + M.io((t - wt('L6', 'imaginary') + 0.1) / 0.3);
    pReH.style.opacity = Math.min(1, hR) * 0.85; M.hide(pReH, hR < 0.01); pImH.style.opacity = Math.min(1, hI) * 0.85; M.hide(pImH, hI < 0.01);
    W.forEach((w, i) => {
      const t0 = tPts[i], ua = M.io((t - t0) / 0.45), ub = M.io((t - t0 - 0.45) / 0.45), fadeL = i < W.length - 1 ? 1 - M.io((t - tPts[i + 1] + 0.1) / 0.3) : 1 - M.io((t - T0('L6')) / 0.3);
      setL(w.a, PP.X(0), PP.oy, PP.X(w.x * ua), PP.oy); setL(w.b, PP.X(w.x), PP.oy, PP.X(w.x), PP.Y(w.y * ub));
      M.hide(w.a, ua < 0.01 || fadeL < 0.01 || w.x === 0); w.a.style.opacity = fadeL.toFixed(3); M.hide(w.b, ub < 0.01 || fadeL < 0.01 || w.y === 0); w.b.style.opacity = fadeL.toFixed(3);
      M.vis(w.d.g, t, t0 + (w.y ? 0.9 : 0.5), 1e9, PT); M.vis(w.l, t, t0 + (w.y ? 1.0 : 0.6), 1e9, { dy: 0 });
      if (i) { M.vis($('#lr' + (i - 1)), t, t0 - 0.1, 1e9, { dx: -16, dy: 0 }); }
    });
    M.vis($('#lP'), t, wt('L6', 'real') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'live') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'real') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('D1');
    M.vis($('#gm'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gc'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gmF'), t, wt('G2', 'modulus') - 0.2, 0.8); M.vis(gmZ.g, t, tG1 + 0.6, 1e9, PT); M.vis(gmZL, t, tG1 + 0.7, 1e9, { dy: 0 });
    M.draw(gmR, t, wt('G2', 'distance') - 0.1, 0.6); M.vis(gmL, t, wt('G2', 'modulus'), 1e9, { dy: 0 });
    PUC.write($('#gcF'), t, wt('G3', 'conjugate') - 0.1, 0.8); M.vis(gcZ.g, t, tG1 + 0.8, 1e9, PT);
    M.vis(gcB.g, t, wt('G3', 'mirror') - 0.2, 1e9, PT); M.draw(gcL, t, wt('G3', 'mirror'), 0.5); M.draw(gcM, t, wt('G3', 'real') - 0.1, 0.6); M.vis(gcML, t, wt('G3', 'real'), 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dGh'), t, tD1 + 0.6, 1e9, POP);
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(92, tDs.slice(1).map((tt, i) => [tt - 0.1, 92 + (i + 1) * 112]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dP'), t, wt('D5', 'distance') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(d1.g, t, tD1 + 0.6, 1e9, PT); M.vis(d1L, t, tD1 + 0.7, 1e9, { dy: 0 }); M.vis(d2.g, t, tD1 + 0.8, 1e9, PT); M.vis(d2L, t, tD1 + 0.9, 1e9, { dy: 0 });
    const ua = M.io((t - tDs[0] - 0.4) / 0.5), ub = M.io((t - tDs[0] - 0.9) / 0.5), uh = M.io((t - tDs[2] + 0.1) / 0.6);
    setL(dA, DP.X(P1[0]), DP.Y(P1[1]), DP.X(P1[0] + (P2[0] - P1[0]) * ua), DP.Y(P1[1])); M.hide(dA, ua < 0.01);
    setL(dB, DP.X(P2[0]), DP.Y(P1[1]), DP.X(P2[0]), DP.Y(P1[1] + (P2[1] - P1[1]) * ub)); M.hide(dB, ub < 0.01);
    setL(dH, DP.X(P1[0]), DP.Y(P1[1]), DP.X(P1[0] + (P2[0] - P1[0]) * uh), DP.Y(P1[1] + (P2[1] - P1[1]) * uh)); M.hide(dH, uh < 0.01);
    M.vis(dAL, t, tDs[0] + 0.7, 1e9, { dy: 0 }); M.vis(dBL, t, tDs[0] + 1.2, 1e9, { dy: 0 }); M.vis(dHL, t, tDs[2] + 0.4, 1e9, { dy: 0 });
  }

  /* V + S: live shapes, side by side, think */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('S2');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vGh'), t, tV1 + 0.5, 1e9, POP);
    const yv = yL(t), zx = VL.X(2), zy = VL.Y(yv);
    vlZ.set(zx, zy); vlB.set(zx, VL.Y(-yv)); M.vis(vlZ.g, t, wt('V1', 'Fix') - 0.1, 1e9, PT); M.vis(vlB.g, t, wt('V1', 'Fix') + 0.2, 1e9, PT);
    attr(vlTr, 'd', t > tv0 ? `M${zx},${VL.Y(-2.5)} L${zx},${zy.toFixed(1)}` : ''); M.hide(vlTr, t < tv0);
    $('#vlR').innerHTML = `<span style="color:${RE}">Re <span class="k">z</span> = 2.00</span>&nbsp;&nbsp;&nbsp;<span style="color:${IM}">Im <span class="k">z</span> = ${yv >= 0 ? ' ' : ''}${yv.toFixed(2)}</span>`; M.vis($('#vlR'), t, wt('V1', 'Fix'), 1e9, { dy: 8 });
    M.vis($('#vlP'), t, wt('V1', 'traces') - 0.1, 1e9, POP);
    M.vis($('#vr'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const a = aC(t), cx = VR.X(2 * Math.cos(a)), cy = VR.Y(2 * Math.sin(a));
    vrZ.set(cx, cy); vrB.set(cx, VR.Y(-2 * Math.sin(a))); M.vis(vrZ.g, t, wt('V2', 'modulus') - 0.1, 1e9, PT); M.vis(vrB.g, t, wt('V2', 'modulus') + 0.2, 1e9, PT);
    setL(vrR, VR.ox, VR.oy, cx, cy); M.hide(vrR, t < wt('V2', 'modulus'));
    let d = ''; if (t > tv2) { const n = 80; for (let i = 0; i <= n; i++) { const b = 0.4 + (a - 0.4) * i / n; d += (i ? 'L' : 'M') + VR.X(2 * Math.cos(b)).toFixed(1) + ',' + VR.Y(2 * Math.sin(b)).toFixed(1); } } attr(vrTr, 'd', d);
    const dg = Math.round(Math.atan2(Math.sin(a), Math.cos(a)) * 180 / Math.PI);
    $('#vrR').innerHTML = `<span style="color:${MO}">|<span class="k">z</span>| = 2.00</span>&nbsp;&nbsp;&nbsp;<span style="color:${IV}">arg <span class="k">z</span> = ${dg > 0 ? '+' : ''}${dg}°</span>`; M.vis($('#vrR'), t, wt('V2', 'modulus'), 1e9, { dy: 8 });
    M.vis($('#vrP'), t, wt('V2', 'circle') - 0.1, 1e9, POP);
    // S1: the side-by-side recap pulses each pill on its word
    [['#vlP', wt('S1', 'line')], ['#vrP', wt('S1', 'circle')]].forEach(([id, tt]) => { const p = M.io((t - tt + 0.1) / 0.15) * (1 - M.io((t - tt - 0.3) / 0.3)); const e = $(id); const tr = e.style.transform; if (p > 0.001) e.style.transform = `scale(${(1 + 0.08 * p).toFixed(4)})`; else if (tr && tr.startsWith('scale')) e.style.transform = 'none'; });
    M.vis($('#th2'), t, tS2 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS2, tOpts: wt('S2', 'line') - 0.1, tCount: T1('S2') + 0.05, dur: 3, tAns: T0('S3') - 0.02, tWhy: wt('S3', 'Every') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'lives') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'distance') - 0.3, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.4, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(WP.g, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.3 });
    M.vis(w1.g, t, wt('W2', 'one') , 1e9, PT); M.vis(w1L, t, wt('W2', 'one') + 0.1, 1e9, { dy: 0 }); M.vis(w2.g, t, wt('W2', 'four'), 1e9, PT); M.vis(w2L, t, wt('W2', 'four') + 0.1, 1e9, { dy: 0 });
    M.draw(wA, t, tW[1] - 0.2, 0.4); M.vis(wAL, t, tW[1], 1e9, { dy: 0 }); M.draw(wB, t, tW[1] + 0.3, 0.4); M.vis(wBL, t, tW[1] + 0.5, 1e9, { dy: 0 });
    M.draw(wH, t, tW[3] - 0.1, 0.6); M.vis(wHL, t, tW[3] + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'centre') - 0.3 });
    M.vis(TP.g, t, tX1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    M.vis(tWx, t, wt('X2', 'centre') - 0.1, 1e9, PT); M.vis(tWL, t, wt('X2', 'centre') + 0.1, 1e9, { dy: 0 });
    M.vis(tCd, t, wt('X3', 'centre') - 0.1, 1e9, PT); M.vis(tCL, t, wt('X3', 'centre'), 1e9, { dy: 0 }); M.draw(tC, t, wt('X3', 'radius') - 0.2, 0.7);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'equations') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'which'), tCount, tAns });
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
