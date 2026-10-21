// PUC Physics Ep 48: Centripetal acceleration (Motion notebook, ball on a circle + a against v, two triangles)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, TH = C.gold, DC = C.violet, RC = C.ink, FC = C.orange, WC = '#7FB2F0', LC = '#3E9B5F';   // v blue, a and Δv red, θ and ω gold, displacement violet, radius ink, push orange, water light blue, leaves green
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vK = tx(VC, 'v'), aK = tx(AC, 'a'), wK = tx(TH, '\\omega'), dvK = tx(AC, '\\Delta v'), thK = tx(TH, '\\Delta\\theta');
const rad = d => d * Math.PI / 180, PI = Math.PI;
// point on a circle (counter-clockwise, screen y down), unit tangent along the motion, unit vector to the centre
const P = (o, R, th) => [o[0] + R * Math.cos(th), o[1] - R * Math.sin(th)];
const Tg = th => [-Math.sin(th), -Math.cos(th)];
const In = th => [-Math.cos(th), Math.sin(th)];

Object.assign(M.IC, {
  wash: ['M3 2h18v20H3z', 'M3 6h18', 'M7 4h.01', 'M10 4h.01', 'M12 19a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', 'M12 17a2.5 2.5 0 0 0 0-5'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'M9 17h6', 'M19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: two everyday cases ---------- */
const JOBS = [['wash', 'Washing machine', 'SPIN DRY', 'washing'], ['car', 'Sharp turn', 'YOU SLIDE ON THE SEAT', 'sharp']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 172}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="200" height="140" id="jrS${i}"></svg></div>`).join('');
// each row: something going round (a dot on a circle) and a loose bit that carries straight on along the tangent
const jrD = JOBS.map((j, i) => { const s = $('#jrS' + i), o = [100, 70], r = 46;
  mk(s, 'circle', { cx: o[0], cy: o[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': i ? '' : '10 6' }); mk(s, 'circle', { cx: o[0], cy: o[1], r: 4, fill: C.ink });
  const d = mk(s, 'circle', { r: 9, fill: C.ink }), lo = mk(s, 'circle', { r: 6, fill: i ? C.ink2 : WC }); return { o, r, d, lo, w: i ? 1.6 : 2.6 }; });
const TILES = [['leaf', 'Leaves: stay in', LC], ['drop', 'Water: flies off', VC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'leaves'), wt('H3', 'water')];
// spinner basket, top view: slotted wall, leaves riding the wall, drops leaving along the tangent
const sp = $('#spS'), SO = [118, 122], SR = 66, SPW = 2.4;   // shown slowed
mk(sp, 'circle', { cx: SO[0], cy: SO[1], r: SR + 8, fill: '#EEF0F4', stroke: 'none' });
const spB = mk(sp, 'g', {});
mk(spB, 'circle', { cx: 0, cy: 0, r: SR, fill: '#fff', stroke: C.ink, 'stroke-width': 5, 'stroke-dasharray': '14 7' });
const spL = [0, 72, 144, 216, 288].map(d => mk(spB, 'ellipse', { cx: (SR - 13) * Math.cos(rad(d)), cy: -(SR - 13) * Math.sin(rad(d)), rx: 13, ry: 8, fill: LC, transform: `rotate(${-d + 90} ${(SR - 13) * Math.cos(rad(d))} ${-(SR - 13) * Math.sin(rad(d))})` }));
mk(sp, 'circle', { cx: SO[0], cy: SO[1], r: 6, fill: C.ink });
const spD = [0, 1, 2, 3, 4, 5].map(() => mk(sp, 'circle', { r: 5, fill: WC }));
const tSpin = wt('H3', 'spins') - 0.1, DROP_EVERY = 0.45;

/* ---------- P: definition + arrows to the centre ---------- */
$('#dr0I').innerHTML = M.icon('target', 32, AC, 2.2); $('#dr1I').innerHTML = M.icon('arrowR', 32, AC, 2.4);
const pt = $('#ptS'), PO = [392, 300], PR = 180, PW = 2 * PI / 4;
mk(pt, 'circle', { cx: PO[0], cy: PO[1], r: PR, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(pt, 'circle', { cx: PO[0], cy: PO[1], r: 6, fill: C.ink });
const pQ = [0, 1, 2, 3, 4, 5, 6, 7].map(() => PUC.arrow(pt, AC, 4, 14));
const pGh = [0.3, 0.2, 0.12].map(op => mk(pt, 'circle', { r: 14, fill: C.ink, opacity: op }));
const pBall = mk(pt, 'circle', { r: 15, fill: C.ink }), pV = PUC.arrow(pt, VC, 6, 18), pA = PUC.arrow(pt, AC, 7, 20);
const pVl = sym(pt, 0, 0, 'v', '', VC, 28), pAl = sym(pt, 0, 0, 'a', '', AC, 28);
const tPrun = tP1 + 0.2, pTh = t => rad(30) + PW * Math.max(0, t - tPrun);

/* ---------- S: the sim ---------- */
const s = $('#simS'), O = [392, 300], R = 180, PXM = R / 2, VPX = 35, APX = 16;   // r = 2 m drawn 180 px; v 35 px per m/s; a 16 px per m/s²
mk(s, 'line', { x1: O[0] - R - 40, y1: O[1], x2: O[0] + R + 40, y2: O[1], stroke: C.ink, 'stroke-width': 1.5, opacity: 0.25 });
mk(s, 'line', { x1: O[0], y1: O[1] - R - 40, x2: O[0], y2: O[1] + R + 40, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.25 });
mk(s, 'circle', { cx: O[0], cy: O[1], r: R, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
mk(s, 'circle', { cx: O[0], cy: O[1], r: 6, fill: C.ink });
sym(s, O[0] + 12, O[1] + 32, 'O', '', C.ink, 22);
const sRad = mk(s, 'line', { x1: O[0], y1: O[1], stroke: RC, 'stroke-width': 2.5 });
const sRl = txt(s, 0, 0, 'r = 2 m', { 'font-size': 20, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
const sTan = mk(s, 'line', { stroke: VC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8', opacity: 0.7 });
const sGap = mk(s, 'line', { stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '5 6' });
const sGapT = txt(s, 0, 0, 'bends inward', { 'font-size': 20, fill: AC, 'font-weight': 600 });
const sTanT = txt(s, 0, 0, 'no pull: straight on', { 'font-size': 18, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
const sGhost = mk(s, 'circle', { r: 15, fill: '#fff', stroke: VC, 'stroke-width': 3, 'stroke-dasharray': '5 4' }), sGhV = PUC.arrow(s, M.mix(VC, '#FFFFFF', 0.45), 5, 16);
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 15, fill: C.ink, opacity: op }));
const sBall = mk(s, 'circle', { r: 15, fill: C.ink });
const sV = PUC.arrow(s, VC, 7, 20), sA = PUC.arrow(s, AC, 7, 20);
const sVl = sym(s, 0, 0, 'v', '', VC, 30), sAl = sym(s, 0, 0, 'a', '', AC, 30);
$('#roG').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r0" style="color:${VC}">2.00</span><span class="u">m/s · speed</span>
  <span class="k">r</span><span class="v" id="r1">2.00</span><span class="u">m · radius</span>
  <span class="k" style="color:${TH}">ω</span><span class="v" id="r2" style="color:${TH}">1.00</span><span class="u">rad/s · v/r</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r3" style="color:${AC}">2.00</span><span class="u">m/s² · v²/r</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 5, ymin: 0, ymax: 12.5, xt: [0, 1, 2, 3, 4, 5], yt: [0, 4, 8, 12], xl: 'v (m/s)' });
gr.xlab.setAttribute('y', 78 + 140 + 56);
const gLin = gr.curve(C.ink, 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '4 7');
const gFull = gr.curve(M.mix(AC, '#FFFFFF', 0.65), 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '6 7');
const gCur = gr.curve(AC, 5), gDot = gr.dot(AC, 10);
const gDotL = gr.dot(C.ink, 7);
// speed: 2 m/s, then doubled to 4 m/s on "double"; the sim clock runs real time, then 0.25x slow-mo, then freezes
const tUp = wt('S3', 'double') + 0.1, vT = M.keys([[0, 2], [tUp, 4]], 1.4, M.io);
const tA = tS1 + 0.3, tSlo = wt('S6', 'slow'), tRep = wt('S7', 'Without'), tEnd = tRep + 2.4;
const DT = 1 / 120, I = [0]; for (let t2 = tA; t2 < tSlo; t2 += DT) I.push(I[I.length - 1] + (vT(t2) + vT(t2 + DT)) / 2 / 2 * DT);
const Ireal = t => { if (t <= tA) return 0; const x = (Math.min(t, tSlo) - tA) / DT, i = Math.floor(x), f = x - i; return i + 1 >= I.length ? I[I.length - 1] : I[i] + (I[i + 1] - I[i]) * f; };
const ISlo = Ireal(tSlo), TH0 = PI / 2 - ISlo - 2 * 0.25 * (tRep - tSlo);     // phase: the ball reaches the top exactly when the replay starts
const thS = t => t <= tSlo ? TH0 + Ireal(t) : TH0 + ISlo + 2 * 0.25 * (Math.min(t, tEnd) - tSlo);
const tauR = t => 0.25 * (M.clamp(t, tRep, tEnd) - tRep);             // replay sim time (s)
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Double the speed, four times the a!' });

/* ---------- D: two triangles ---------- */
const STEPS = [[`\\Delta s \\approx ${tx(DC, 'v\\,\\Delta t')}`, 'the tiny distance moved in a short time Δt'],
  [`\\text{turn of } r = \\text{turn of } ${tx(VC, '\\vec v')} = ${thK}`, 'v stays at 90° to r, so both turn together'],
  [`${dvK} \\,/\\, ${vK} = ${tx(DC, 'v\\,\\Delta t')} \\,/\\, r`, 'same shape, same ratio'],
  [`${aK} = ${dvK} / \\Delta t = ${vK}^2 / r`, 'divide both sides by Δt'],
  [`(\\text{m/s})^2/\\text{m} = \\text{m/s}^2 \\qquad ${aK} = ${wK}^2 r`, 'units check · and v = ωr']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'tiny'), wt('D3', 'radius'), wt('D4', 'same'), wt('D5', 'Divide'), wt('D6', 'Units')];
const tr = $('#trS'), TO = [250, 390], TR = 210, A1 = rad(70), A2 = rad(110), TQ = [722, 390], TVL = 190;
const p1 = P(TO, TR, A1), p2 = P(TO, TR, A2);
const trF1 = mk(tr, 'path', { d: `M${TO[0]},${TO[1]} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`, fill: C.ac2, stroke: 'none' });
const q1 = [TQ[0] + Tg(A1)[0] * TVL, TQ[1] + Tg(A1)[1] * TVL], q2 = [TQ[0] + Tg(A2)[0] * TVL, TQ[1] + Tg(A2)[1] * TVL];
const trF2 = mk(tr, 'path', { d: `M${TQ[0]},${TQ[1]} L${q1[0].toFixed(1)},${q1[1].toFixed(1)} L${q2[0].toFixed(1)},${q2[1].toFixed(1)} Z`, fill: C.ac2, stroke: 'none' });
const trArc = mk(tr, 'path', { d: `M${P(TO, TR, A1).map(v => v.toFixed(1)).join(',')} A${TR},${TR} 0 0 0 ${p2.map(v => v.toFixed(1)).join(',')}`, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
mk(tr, 'circle', { cx: TO[0], cy: TO[1], r: 6, fill: C.ink }); sym(tr, TO[0] - 14, TO[1] + 38, 'O', '', C.ink, 22);
const trR1 = mk(tr, 'line', { x1: TO[0], y1: TO[1], x2: p1[0], y2: p1[1], stroke: RC, 'stroke-width': 3 }), trR2 = mk(tr, 'line', { x1: TO[0], y1: TO[1], x2: p2[0], y2: p2[1], stroke: RC, 'stroke-width': 3 });
const trRl = [sym(tr, (TO[0] + p1[0]) / 2 + 14, (TO[1] + p1[1]) / 2 + 8, 'r', '', RC, 28), sym(tr, (TO[0] + p2[0]) / 2 - 34, (TO[1] + p2[1]) / 2 + 8, 'r', '', RC, 28)];
const trCh = mk(tr, 'line', { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: DC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const trChl = txt(tr, (p1[0] + p2[0]) / 2, p1[1] - 16, 'v Δt', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: DC, 'text-anchor': 'middle' });
const arcAt = (o, r, a0, a1) => { const b0 = [o[0] + r * Math.cos(a0), o[1] + r * Math.sin(a0)], b1 = [o[0] + r * Math.cos(a1), o[1] + r * Math.sin(a1)]; return `M${b0[0].toFixed(1)},${b0[1].toFixed(1)} A${r},${r} 0 0 1 ${b1[0].toFixed(1)},${b1[1].toFixed(1)}`; };   // screen angles, clockwise on screen
const trA1 = mk(tr, 'path', { d: arcAt(TO, 54, -A2, -A1), fill: 'none', stroke: TH, 'stroke-width': 3.5 }), trA1l = sym(tr, TO[0] - 20, TO[1] - 72, 'Δθ', '', TH, 24);
const trA2 = mk(tr, 'path', { d: arcAt(TQ, 64, PI - rad(20), PI + rad(20)), fill: 'none', stroke: TH, 'stroke-width': 3.5 }), trA2l = sym(tr, TQ[0] - 118, TQ[1] + 9, 'Δθ', '', TH, 24);
const trQ = mk(tr, 'circle', { cx: TQ[0], cy: TQ[1], r: 5, fill: C.ink });
const trBall = mk(tr, 'circle', { r: 13, fill: C.ink });
const trV1 = PUC.arrow(tr, VC, 6, 18), trV2 = PUC.arrow(tr, VC, 6, 18), trDv = PUC.arrow(tr, AC, 6, 18);
const trV1l = sym(tr, 0, 0, 'v', '1', VC, 26), trV2l = sym(tr, 0, 0, 'v', '2', VC, 26);
const trDvl = mk(tr, 'text', { x: q1[0] - 14, y: (q1[1] + q2[1]) / 2 + 10, 'text-anchor': 'end', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: AC }); trDvl.textContent = 'Δv';
const trDvT = txt(tr, q1[0] - 14, (q1[1] + q2[1]) / 2 + 36, 'to the centre', { 'text-anchor': 'end', 'font-size': 16, fill: AC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${aK} = \\dfrac{${vK}^2}{r} = ${wK}^2 r`);

/* ---------- C: side by side ---------- */
const CO = [356, 172], CR2 = 70, CR4 = 140;                     // 35 px per metre
const c0 = $('#c0S');
[CR2, CR4].forEach(r => mk(c0, 'circle', { cx: CO[0], cy: CO[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 3 })); mk(c0, 'circle', { cx: CO[0], cy: CO[1], r: 5, fill: C.ink });
const c0B = [mk(c0, 'circle', { r: 12, fill: C.ink }), mk(c0, 'circle', { r: 12, fill: C.ink })];
const c0V = [PUC.arrow(c0, VC, 5, 15), PUC.arrow(c0, VC, 5, 15)], c0A = [PUC.arrow(c0, AC, 6, 17), PUC.arrow(c0, AC, 6, 17)];
const c0T = [txt(c0, 36, 340, 'r = 2 m:  a = 16/2 = 8 m/s²', { 'font-size': 20, fill: AC, 'font-weight': 600 }), txt(c0, 676, 340, 'r = 4 m:  a = 4 m/s²', { 'font-size': 20, fill: AC, 'font-weight': 600, 'text-anchor': 'end' })];
const tC0run = T0('C2') - 0.3, c0Th = (i, t) => rad(i ? 20 : 200) + (i ? 1 : 2) * Math.max(0, t - tC0run);
$('#c0a').innerHTML = K(`${aK} = ${vK}^2/r \\;\\Rightarrow\\; \\text{smaller } r, \\text{ bigger } ${aK}`);
const c1 = $('#c1S');
[CR2, CR4].forEach(r => mk(c1, 'circle', { cx: CO[0], cy: CO[1], r, fill: 'none', stroke: C.dim, 'stroke-width': 3 }));
const c1Rod = mk(c1, 'line', { x1: CO[0], y1: CO[1], stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(c1, 'circle', { cx: CO[0], cy: CO[1], r: 7, fill: C.ink });
const c1B = [mk(c1, 'circle', { r: 12, fill: C.ink }), mk(c1, 'circle', { r: 12, fill: C.ink })];
const c1V = [PUC.arrow(c1, VC, 5, 15), PUC.arrow(c1, VC, 5, 15)], c1A = [PUC.arrow(c1, AC, 6, 17), PUC.arrow(c1, AC, 6, 17)];
const c1T = [txt(c1, 36, 340, 'r = 2 m:  a = 1² × 2 = 2 m/s²', { 'font-size': 20, fill: AC, 'font-weight': 600 }), txt(c1, 676, 340, 'r = 4 m:  a = 4 m/s²', { 'font-size': 20, fill: AC, 'font-weight': 600, 'text-anchor': 'end' })];
const tC1run = T0('C3') - 0.4, c1Th = t => rad(60) + 1 * Math.max(0, t - tC1run);
$('#c1a').innerHTML = K(`${aK} = ${wK}^2 r \\;\\Rightarrow\\; \\text{bigger } r, \\text{ bigger } ${aK}`);
const th1 = PUC.think($('#th1'), { q: 'On a spinning merry go round, you walk from the edge to halfway in. Does your acceleration go up or down?', opts: ['Goes up', 'Goes down'], right: 1,
  why: 'Same ω, and a = ω²r: half the radius, half the acceleration.' });

/* ---------- R: the spinner, link by link ---------- */
const rl = $('#rlS'), RO = [392, 304], RR = 190, RW = 0.8;    // shown slowed
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: RR + 12, fill: '#EEF0F4', stroke: 'none' });
const rBk = mk(rl, 'g', {});
mk(rBk, 'circle', { cx: 0, cy: 0, r: RR, fill: '#fff', stroke: C.ink, 'stroke-width': 9, 'stroke-dasharray': '34 14' });
const LANG = [30, 102, 174, 246, 318];
LANG.forEach(d => { const x = (RR - 26) * Math.cos(rad(d)), y = -(RR - 26) * Math.sin(rad(d)); mk(rBk, 'ellipse', { cx: x, cy: y, rx: 26, ry: 15, fill: LC, transform: `rotate(${-d + 90} ${x} ${y})` }); });
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: 8, fill: C.ink });
const rA = LANG.map(() => PUC.arrow(rl, AC, 5, 16)), rF = LANG.map(() => PUC.arrow(rl, FC, 6, 17));
const rPath = mk(rl, 'line', { stroke: VC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const rNot = mk(rl, 'line', { stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '4 7', opacity: 0.6 });
const rNotT = txt(rl, 0, 0, 'not straight out', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const rPathT = txt(rl, 0, 0, 'along the tangent', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const rGh = [0.3, 0.2, 0.12].map(op => mk(rl, 'circle', { r: 11, fill: WC, opacity: op }));
const rDrop = mk(rl, 'circle', { r: 11, fill: WC, stroke: C.ink, 'stroke-width': 2 }), rDV = PUC.arrow(rl, VC, 6, 18);
const tRel = wt('R4', 'slips') + 0.2, REL = rad(150), tR0 = tR1 - 0.2;
const rTh = t => rad(0) + RW * Math.max(0, t - tR0);              // basket angle
const rDropTh0 = REL - RW * (tRel - tR0);                         // the drop sits in a slot, released at 120°
const relP = P(RO, RR, REL), relU = Tg(REL), VD = RW * RR;        // after release: straight line at the speed it had
const LK = [['Going round needs <i class="rd">a</i> toward the centre'], ['The basket wall <span class="ff">pushes</span> the leaves in'], ['Water slips through the holes: no push'], ['So it flies off along the tangent']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avA = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Not thrown out. Just not held in!' });
const th2 = PUC.think($('#th2'), { q: 'Diya turns the spinner twice as fast. How many times more acceleration does the water need?', opts: ['2 times', '4 times'], right: 1,
  why: 'a = ω²r, and doubling ω gives 2² = 4 times the acceleration.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${wK} = 2\\pi\\nu = 2\\pi \\times 5 = 10\\pi\\,\\text{rad/s}`)],
  [K(`${aK} = ${wK}^2 r = (10\\pi)^2 \\times 0.1`)],
  [K(`${aK} = 10\\pi^2 \\approx ${tx(AC, '98.7\\,\\text{m/s}^2')}`)],
  [K(`${aK}/g = 98.7/9.8 \\approx 10`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [392, 280], WR = 170, WJ = 10 * PI / 10;   // 10π rad/s shown at 1/10 speed
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR + 12, fill: '#EEF0F4', stroke: 'none' });
const wBk = mk(w, 'g', {});
mk(wBk, 'circle', { cx: 0, cy: 0, r: WR, fill: '#fff', stroke: C.ink, 'stroke-width': 8, 'stroke-dasharray': '30 13' });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 7, fill: C.ink });
const wRad = mk(w, 'line', { x1: WO[0], y1: WO[1], stroke: RC, 'stroke-width': 2.5 });
const wRl = txt(w, 0, 0, '10 cm', { 'font-size': 22, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'ellipse', { rx: 22, ry: 13, fill: LC, opacity: op }));
const wLeaf = mk(w, 'ellipse', { rx: 22, ry: 13, fill: LC, stroke: C.ink, 'stroke-width': 2 }), wA = PUC.arrow(w, AC, 7, 20);
const wAl = sym(w, 0, 0, 'a', '', AC, 28);
const tWrun = T0('W2') + 0.2, wTh = t => rad(90) + WJ * Math.max(0, t - tWrun);
const tW = [wt('W3', 'Omega'), wt('W4', 'equals'), wt('W5', 'That'), wt('W6', 'ten')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Centripetal acceleration points outward', right: 'It points inward. Loose water leaves along the tangent' });
const tg = $('#tg'), GO = [210, 140], GR = 92;
const tgC = mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: GR, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const tgO = mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: 5, fill: C.ink });
const tgB = mk(tg, 'circle', { r: 12, fill: C.ink }), tgW = PUC.arrow(tg, AC, 5, 16), tgA = PUC.arrow(tg, AC, 6, 18);
const tgP = mk(tg, 'line', { stroke: VC, 'stroke-width': 2.5, 'stroke-dasharray': '5 7' });
const tgAl = sym(tg, 0, 0, 'a', '', AC, 24);
const tJn = wt('X2', 'outward'), TGA = rad(300);
const where = PUC.where($('#wa'), { on: [], type: 'Short numericals: a from speed, radius or period, and ratios' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A goes round a 1 m circle once every 2 s. B goes round a 4 m circle once every 4 s, both at steady speed. Find the ratio of their centripetal accelerations, <i>a</i><sub>A</sub> : <i>a</i><sub>B</sub>.', qW: 780,
  opts: [K('1 : 4'), K('1 : 1'), K('4 : 1'), K('1 : 2')], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${aK} = ${wK}^2 r,\\; ${wK} = 2\\pi/T`)], [K(`\\Rightarrow\\; ${aK} = 4\\pi^2 r / T^2`)],
  [K(`a_A = 4\\pi^2 \\times 1/2^2 = \\pi^2`)], [K(`a_B = 4\\pi^2 \\times 4/4^2 = \\pi^2`)], [K(`a_A : a_B = 1 : 1 \\;\\Rightarrow\\; \\textbf{B}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'omega'), wt('A2', 'four'), wt('A3', 'For'), wt('A4', 'For'), wt('A4', 'One')];
const fc = PUC.fcard($('#sF'), { x: 340, y: 262, w: 1240, h: 470, title: 'Recap · centripetal acceleration', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${aK} = ${vK}^2/r = ${wK}^2 r \\qquad ${vK} = ${wK}\\, r`),
    '<b>Direction</b>: always toward the centre (centre seeking)', '<b>Same <i>v</i></b>: smaller <i>r</i>, bigger <i>a</i> &nbsp;·&nbsp; <b>Same <i>ω</i></b>: bigger <i>r</i>, bigger <i>a</i>', '<b>Size</b> fixed, <b>direction</b> turning: not a constant vector'] });
const YQ = ['Why does water fly off a salad spinner, while the leaves stay in?', 'On the same circle, the speed doubles. What happens to a?', 'Is centripetal acceleration a constant vector? Why or why not?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 49', topic: 'Which way to tilt the umbrella? Relative Velocity in 2D', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const ballAt = (el, p) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); };
const along = (a, p, u, L, off = 0) => { if (L < 2) { a.set(0, 0, 0, 0); return; } a.set(p[0] + u[0] * off, p[1] + u[1] * off, p[0] + u[0] * (off + L), p[1] + u[1] * (off + L)); };
const lbl = (el, p, u, d, dx = -8, dy = 10) => { attr(el, 'x', (p[0] + u[0] * d + dx).toFixed(1)); attr(el, 'y', (p[1] + u[1] * d + dy).toFixed(1)); };
const ell = (el, p, th) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); attr(el, 'transform', `rotate(${(-th * 180 / PI + 90).toFixed(2)} ${p[0].toFixed(1)} ${p[1].toFixed(1)})`); };

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const g = jrD[i], a = g.w * (t - tMorph), p = P(g.o, g.r, a); ballAt(g.d, p);
      // the loose bit rides along, lets go every 2.4 s and carries straight on along the tangent
      const cyc = 2.4, k = Math.floor((t - tMorph) / cyc), ts = tMorph + k * cyc, ar = g.w * (ts - tMorph) + 0.6, pr = P(g.o, g.r, ar), u = Tg(ar), d = (t - ts) < 0.8 ? 0 : (t - ts - 0.8) * g.w * g.r;
      const al = ar + (t - ts < 0.8 ? g.w * (t - ts) - g.w * 0.8 : 0), pl = d > 0 ? [pr[0] + u[0] * d, pr[1] + u[1] * d] : P(g.o, g.r, al);
      ballAt(g.lo, pl); g.lo.style.opacity = M.clamp(1 - (d - 50) / 30).toFixed(3);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'round')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'does') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#spin'), t, wt('H3', 'salad') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    const ba = SPW * Math.max(0, t - tSpin);
    attr(spB, 'transform', `translate(${SO[0]},${SO[1]}) rotate(${(-ba * 180 / PI).toFixed(2)})`);
    // drops: one leaves a slot every 0.45 s and flies straight on along the tangent
    const nOut = Math.floor(Math.max(0, t - tSpin - 0.6) / DROP_EVERY);
    spD.forEach((d, j) => { const k = nOut - j; if (k < 0 || t < wt('H3', 'water') - 0.6) { M.hide(d, true); return; }
      const tk = tSpin + 0.6 + k * DROP_EVERY, ak = SPW * (tk - tSpin) + k * 2.1, pk = P(SO, SR + 4, ak), u = Tg(ak), dd = SPW * SR * (t - tk);
      ballAt(d, [pk[0] + u[0] * dd, pk[1] + u[1] * dd]); M.hide(d, false); d.style.opacity = M.clamp(1 - (dd - 40) / 30).toFixed(3); });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.ac2 : C.okBg, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, tP2 + 0.05, { st: 0.04 });
    M.vis($('#dr0'), t, wt('P3', 'points') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, wt('P3', 'Centripetal') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, wt('P3', 'how') - 0.2, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const th = pTh(t), bp = P(PO, PR, th), uT = Tg(th), uI = In(th);
    ballAt(pBall, bp);
    pGh.forEach((g, k) => { ballAt(g, P(PO, PR, pTh(t - 0.12 * (k + 1)))); M.hide(g, t - 0.12 * (k + 1) < tPrun); });
    const gv = M.o3((t - wt('P2', 'velocity')) / 0.5); along(pV, bp, uT, 110 * gv); lbl(pVl, bp, uT, 134); pVl.style.opacity = gv.toFixed(3);
    const ga = M.o3((t - wt('P3', 'points') + 0.1) / 0.5); along(pA, bp, uI, 96 * ga, 18); lbl(pAl, bp, uI, 70, uI[1] * 26 - 8, -uI[0] * 26 + 10); pAl.style.opacity = ga.toFixed(3);
    pQ.forEach((a, k) => { const q = rad(22.5 + 45 * k), pq = P(PO, PR, q), u = In(q), g = M.o3((t - wt('P3', 'centre') - k * 0.08) / 0.5); along(a, pq, u, 60 * g, 14); a.g.style.opacity = '0.4'; });
  }

  /* S: the ball on a circle + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const th = thS(t), bp = P(O, R, th), uT = Tg(th), uI = In(th);
    const vd = Math.round(vT(Math.min(t, tSlo)) * 100) / 100, ad = vd * vd / 2, wd = vd / 2;     // displayed values, a and ω from the displayed v
    ballAt(sBall, bp);
    sGh.forEach((g, k) => { const t2 = t - 0.12 * (k + 1), gp = P(O, R, thS(t2)); ballAt(g, gp); M.hide(g, t2 < tA || Math.hypot(gp[0] - bp[0], gp[1] - bp[1]) < 4); });
    attr(sRad, 'x2', bp[0].toFixed(1)); attr(sRad, 'y2', bp[1].toFixed(1));
    const mid = P(O, R * 0.55, th); attr(sRl, 'x', (mid[0] - 30 * Math.sin(th)).toFixed(1)); attr(sRl, 'y', (mid[1] - 30 * Math.cos(th) + 7).toFixed(1));
    M.vis(sRl, t, tS1 + 0.8, T0('S2'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    // v (blue, along the tangent) and a (red, to the centre); lengths follow the live values
    const gv = M.o3((t - wt('S2', 'two') + 0.2) / 0.5), ga = M.o3((t - wt('S2', 'red') + 0.1) / 0.5);
    along(sV, bp, uT, VPX * vd * gv); lbl(sVl, bp, uT, VPX * vd + 24); sVl.style.opacity = gv.toFixed(3);
    along(sA, bp, uI, APX * ad * ga, 18); lbl(sAl, bp, uI, 18 + APX * ad * 0.55, uI[1] * 26 - 8, -uI[0] * 26 + 10); sAl.style.opacity = ga.toFixed(3);
    // slow-mo replay: from the top, a hollow ghost carries straight on along the tangent; the real ball bends inward
    const tau = tauR(t), rep = t >= tRep, top = P(O, R, PI / 2), u0 = Tg(PI / 2), gp = [top[0] + u0[0] * 4 * PXM * tau, top[1] + u0[1] * 4 * PXM * tau];
    const tanOn = M.clamp((t - tRep + 0.2) / 0.3) * (1 - M.clamp((t - out) / 0.2));
    attr(sTan, 'x1', (top[0] + 60).toFixed(1)); attr(sTan, 'y1', top[1].toFixed(1)); attr(sTan, 'x2', (top[0] - 330).toFixed(1)); attr(sTan, 'y2', top[1].toFixed(1)); sTan.style.opacity = (0.7 * tanOn).toFixed(3);
    ballAt(sGhost, gp); M.hide(sGhost, !rep); if (rep) along(sGhV, gp, u0, VPX * 4 * 0.75, 18); else sGhV.set(0, 0, 0, 0);
    attr(sTanT, 'x', (top[0] - 170).toFixed(1)); attr(sTanT, 'y', (top[1] - 22).toFixed(1)); sTanT.style.opacity = M.clamp((t - wt('S7', 'tangent') + 0.1) / 0.3).toFixed(3);
    const gu = M.clamp((t - wt('S8', 'bending')) / 0.4);
    attr(sGap, 'x1', gp[0].toFixed(1)); attr(sGap, 'y1', gp[1].toFixed(1)); attr(sGap, 'x2', bp[0].toFixed(1)); attr(sGap, 'y2', bp[1].toFixed(1)); sGap.style.opacity = (gu * (rep ? 1 : 0)).toFixed(3);
    attr(sGapT, 'x', ((gp[0] + bp[0]) / 2 + 16).toFixed(1)); attr(sGapT, 'y', ((gp[1] + bp[1]) / 2 + 6).toFixed(1)); sGapT.style.opacity = gu.toFixed(3);
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    // readout + graph
    M.setT($('#r0'), vd.toFixed(2)); M.setT($('#r1'), '2.00'); M.setT($('#r2'), wd.toFixed(2)); M.setT($('#r3'), ad.toFixed(2));
    const hi = M.io((t - wt('S4', 'jumps')) / 0.3) * (1 - M.io((t - T0('S5')) / 0.3)); $('#r3').style.background = mix('#FFFFFF', C.redBg, hi);
    gCur(x => [x, x * x / 2], 0, vd); gDot(vd, ad, t > wt('S2', 'two') - 0.2);
    const sh = M.clamp((t - wt('S5', 'curve')) / 0.6); gFull(x => [x, x * x / 2], vd, vd + (5 - vd) * sh);
    const ln = M.clamp((t - wt('S5', 'straight')) / 0.6); gLin(x => [x, x], 0, 5 * ln); gDotL(4, 4, ln > 0.95);
    M.vis($('#leg'), t, wt('S5', 'straight') - 0.1, 1e9, { dy: 10 });
    avD(t, wt('S4', 'acceleration') + 0.5, tS6 - 0.2);
  }

  /* D: two triangles */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 }); M.vis($('#exD'), t, tD1 + 0.6, 1e9, { dy: 8 });
    // step 1: the ball slides from P1 to P2 and the chord v Δt draws
    const mv = M.io((t - tStep[0] + 0.3) / 1.2), bth = A1 + (A2 - A1) * mv, bp = P(TO, TR, bth);
    M.draw(trArc, t, tD1 + 0.4, 0.6); ballAt(trBall, bp); M.vis(trBall, t, tD1 + 0.5, 1e9, POP);
    M.draw(trCh, t, tStep[0] + 0.9, 0.5); M.vis(trChl, t, tStep[0] + 1.2, 1e9, POP);
    // step 2: radii and angle; velocity arrows at P1 and P2, then they slide tail to tail
    M.draw(trR1, t, tStep[1] - 0.2, 0.4); M.draw(trR2, t, tStep[1], 0.4); trRl.forEach((e, i) => M.vis(e, t, tStep[1] + i * 0.2, 1e9, POP));
    M.draw(trA1, t, wt('D3', 'angle') - 0.1, 0.4); M.vis(trA1l, t, wt('D3', 'angle') + 0.1, 1e9, POP);
    const gv1 = M.o3((t - wt('D3', 'velocity') + 0.1) / 0.5), sl = M.io((t - wt('D3', 'turns') + 0.1) / 0.9);
    const b1 = [M.lerp(p1[0], TQ[0], sl), M.lerp(p1[1], TQ[1], sl)], b2 = [M.lerp(p2[0], TQ[0], sl), M.lerp(p2[1], TQ[1], sl)], L = M.lerp(110, TVL, sl);
    along(trV1, b1, Tg(A1), L * gv1); along(trV2, b2, Tg(A2), L * gv1);
    lbl(trV1l, b1, Tg(A1), L + 10, -30, -6); lbl(trV2l, b2, Tg(A2), L + 10, -30, 30); trV1l.style.opacity = trV2l.style.opacity = gv1.toFixed(3);
    M.vis(trQ, t, wt('D3', 'turns') + 0.6, 1e9, POP);
    M.draw(trA2, t, wt('D3', 'same') - 0.1, 0.4); M.vis(trA2l, t, wt('D3', 'same') + 0.1, 1e9, POP);
    // step 3: Δv closes the velocity triangle; both triangles fill: one shape
    const dj = M.o3((t - tStep[2] + 0.2) / 0.6); if (dj > 0) trDv.set(q1[0], q1[1], q1[0], M.lerp(q1[1], q2[1], dj)); else trDv.set(0, 0, 0, 0);
    trDvl.style.opacity = dj.toFixed(3); trDvT.style.opacity = M.clamp((t - tStep[2] - 0.6) / 0.3).toFixed(3);
    const fl = M.io((t - wt('D4', 'shape') + 0.1) / 0.4); trF1.style.opacity = trF2.style.opacity = fl.toFixed(3);
    M.vis($('#drP'), t, wt('D4', 'shape'), 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'Centripetal'), 0.8);
    M.rise($('#st2'), t, wt('T1', 'always') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* C: side by side + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); M.vis($('#exC0'), t, tC1 + 0.6, 1e9, { dy: 8 });
    const g0 = M.o3((t - T0('C2') - 0.2) / 0.5);
    [CR2, CR4].forEach((r, i) => { const th = c0Th(i, t), bp = P(CO, r, th); ballAt(c0B[i], bp);
      along(c0V[i], bp, Tg(th), 4 * 20 * g0); along(c0A[i], bp, In(th), (i ? 4 : 8) * 7 * M.o3((t - wt('C2', i ? 'four' : 'eight', i ? 2 : 0) + 0.1) / 0.5), 14); });
    M.vis(c0T[0], t, wt('C2', 'eight') - 0.1, 1e9, { dy: 8 }); M.vis(c0T[1], t, wt('C2', 'only') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#c0a'), t, wt('C2', 'only') + 0.6, 0.7);
    M.vis($('#c1'), t, T0('C3') - 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#exC1'), t, T0('C3'), 1e9, { dy: 8 });
    const th = c1Th(t), e4 = P(CO, CR4 + 10, th); attr(c1Rod, 'x2', e4[0].toFixed(1)); attr(c1Rod, 'y2', e4[1].toFixed(1));
    const g1 = M.o3((t - wt('C3', 'faster') + 0.1) / 0.5), g2 = M.o3((t - wt('C3', 'twice') + 0.1) / 0.5);
    [CR2, CR4].forEach((r, i) => { const bp = P(CO, r, th); ballAt(c1B[i], bp); along(c1V[i], bp, Tg(th), (i ? 4 : 2) * 20 * g1); along(c1A[i], bp, In(th), (i ? 4 : 2) * 14 * g2, 14); });
    c1T.forEach(e => M.vis(e, t, wt('C3', 'twice') - 0.1, 1e9, { dy: 8 }));
    PUC.write($('#c1a'), t, wt('C3', 'big') - 0.2, 0.7);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'acceleration') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'same') });
  }

  /* R: why the water flies off + think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#rslo'), t, tR1 + 0.4, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tK1)) / 0.3))); });
    const ba = rTh(t); attr(rBk, 'transform', `translate(${RO[0]},${RO[1]}) rotate(${(-ba * 180 / PI).toFixed(2)})`);
    const ga = M.o3((t - tLk[0] - 0.4) / 0.5), gf = M.o3((t - wt('R3', 'wall') + 0.1) / 0.5);
    LANG.forEach((d, k) => { const q = ba + rad(d), lp = P(RO, RR - 26, q), wp = P(RO, RR + 4, q), u = In(q); along(rA[k], lp, u, 56 * ga, 20); along(rF[k], wp, u, 0, 0); if (gf > 0) rF[k].set(wp[0] - u[0] * 30, wp[1] - u[1] * 30, wp[0] - u[0] * (30 - 26 * gf), wp[1] - u[1] * (30 - 26 * gf)); });
    // the drop: rides in a slot, then from "slips" it keeps the velocity it had and carries straight on
    const rel = t >= tRel, dth = rDropTh0 + ba, dd = VD * Math.max(0, t - tRel), dp = rel ? [relP[0] + relU[0] * dd, relP[1] + relU[1] * dd] : P(RO, RR, dth);
    ballAt(rDrop, dp); M.vis(rDrop, t, wt('R4', 'water') - 0.2, 1e9, POP);
    rGh.forEach((g, k) => { const t2 = t - 0.15 * (k + 1), d2 = VD * Math.max(0, t2 - tRel); ballAt(g, [relP[0] + relU[0] * d2, relP[1] + relU[1] * d2]); M.hide(g, t2 < tRel + 0.02); });
    if (rel) along(rDV, dp, relU, 70 * M.o3((t - tRel) / 0.4), 16); else rDV.set(0, 0, 0, 0);
    const pOn2 = M.clamp((t - tRel) / 0.4);
    attr(rPath, 'x1', relP[0].toFixed(1)); attr(rPath, 'y1', relP[1].toFixed(1)); attr(rPath, 'x2', (relP[0] + relU[0] * 420).toFixed(1)); attr(rPath, 'y2', (relP[1] + relU[1] * 420).toFixed(1)); rPath.style.opacity = (0.7 * pOn2).toFixed(3);
    const uo = [-In(REL)[0], -In(REL)[1]], nOn = M.clamp((t - wt('R5', 'outward') + 0.1) / 0.3);
    attr(rNot, 'x1', relP[0].toFixed(1)); attr(rNot, 'y1', relP[1].toFixed(1)); attr(rNot, 'x2', (relP[0] + uo[0] * 100).toFixed(1)); attr(rNot, 'y2', (relP[1] + uo[1] * 100).toFixed(1)); rNot.style.opacity = (0.6 * nOn).toFixed(3);
    attr(rNotT, 'x', (relP[0] + uo[0] * 100 + 10).toFixed(1)); attr(rNotT, 'y', (relP[1] + uo[1] * 100 - 6).toFixed(1)); rNotT.style.opacity = nOn.toFixed(3);
    attr(rPathT, 'x', 36); attr(rPathT, 'y', 548); rPathT.style.opacity = M.clamp((t - wt('R5', 'tangent') + 0.1) / 0.3).toFixed(3);
    avA(t, wt('R5', 'held') + 0.4, out);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'How') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'equals') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.2, 1e9, { dy: 8 }); M.vis($('#wslo'), t, T0('W2') + 0.4, 1e9, POP);
    const th = wTh(t), bp = P(WO, WR - 30, th), uI = In(th);
    attr(wBk, 'transform', `translate(${WO[0]},${WO[1]}) rotate(${(-th * 180 / PI).toFixed(2)})`);
    ell(wLeaf, bp, th); attr(wRad, 'x2', bp[0].toFixed(1)); attr(wRad, 'y2', bp[1].toFixed(1));
    const md = P(WO, (WR - 30) * 0.5, th); attr(wRl, 'x', (md[0] - 30 * Math.sin(th)).toFixed(1)); attr(wRl, 'y', (md[1] - 30 * Math.cos(th) + 8).toFixed(1));
    wGh.forEach((g, k) => { const q = wTh(t - 0.1 * (k + 1)); ell(g, P(WO, WR - 30, q), q); M.hide(g, t - 0.1 * (k + 1) < tWrun); });
    const ga = M.o3((t - wt('W4', 'equals') + 0.1) / 0.5); along(wA, bp, uI, 80 * ga, 26); lbl(wAl, bp, uI, 70, uI[1] * 26 - 8, -uI[0] * 26 + 10); wAl.style.opacity = ga.toFixed(3);
    [0, 1, 2].forEach(i => M.vis($('#wc' + i), t, tW[[0, 2, 3][i]] + 0.3, 1e9, POP));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'centripetal') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'inward') - 0.2 });
    M.draw(tgC, t, tJn - 0.6, 0.6); M.vis(tgO, t, tJn - 0.2, 1e9, POP);
    const bp = P(GO, GR, TGA), ui = In(TGA); ballAt(tgB, bp); M.vis(tgB, t, tJn - 0.2, 1e9, POP);
    const gw = M.o3((t - tJn) / 0.4) * (1 - M.clamp((t - wt('X3', 'But')) / 0.3));
    along(tgW, bp, [-ui[0], -ui[1]], 60 * gw, 16); tgW.g.style.opacity = '0.6';
    const ga = M.o3((t - wt('X3', 'inward') + 0.1) / 0.5); along(tgA, bp, ui, 64 * ga, 16);
    lbl(tgAl, bp, ui, 50, ui[1] * 22 - 6, -ui[0] * 22 + 8); tgAl.style.opacity = ga.toFixed(3);
    const tp = M.clamp((t - wt('X3', 'tangent') + 0.1) / 0.4), u = Tg(TGA);
    attr(tgP, 'x1', bp[0].toFixed(1)); attr(tgP, 'y1', bp[1].toFixed(1)); attr(tgP, 'x2', (bp[0] + u[0] * 120 * tp).toFixed(1)); attr(tgP, 'y2', (bp[1] + u[1] * 120 * tp).toFixed(1)); M.hide(tgP, tp <= 0);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
