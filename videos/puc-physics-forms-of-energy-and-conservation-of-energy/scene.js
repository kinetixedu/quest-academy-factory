// PUC Physics Ep 85: Forms of energy and conservation of energy (Motion notebook, block on a rough ramp + energy against distance, kitchen energy flow)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, FC = C.orange, UC = C.teal, KC = '#4FB3B3', QC = C.red, TC = C.ink;   // v blue, force orange, U teal, K light teal, heat red, total ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const UK = tx(UC, 'U'), KK = tx('#2E8F8F', 'K'), QK = tx(QC, 'Q'), FK = tx(FC, 'f'), EK = tx(TC, 'E');
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
const op = (el, v) => { el.style.opacity = M.clamp(v).toFixed(3); };
const G = 9.8, PI = Math.PI;
// a vertical stacked bar: segs = [[colour, label]], set(values) draws from the base upward
const vbar = (p, x, y0, w, segs, px = 3, name = '') => { const R = segs.map(([c]) => mk(p, 'rect', { x, width: w, y: y0, height: 0, fill: c, rx: 4 }));
  const L = segs.map(([c]) => txt(p, x + w + 14, y0, '', { 'font-size': 20, fill: c === KC ? '#2E8F8F' : c, 'font-weight': 600 }));
  if (name) txt(p, x + w / 2, y0 + 32, name, { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
  mk(p, 'line', { x1: x - 16, y1: y0, x2: x + w + 16, y2: y0, stroke: C.ink, 'stroke-width': 2.5 });
  return (vals, labs) => { let y = y0; vals.forEach((v, i) => { const h = Math.max(0, v * px); attr(R[i], 'y', (y - h).toFixed(1)); attr(R[i], 'height', h.toFixed(1)); M.hide(R[i], h < 0.5);
    M.setT(L[i], labs && labs[i] ? labs[i] : ''); at(L[i], x + w + 14, y - h / 2 + 7); M.hide(L[i], h < 8 || !(labs && labs[i])); y -= h; }); }; };

Object.assign(M.IC, {
  flame: ['M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6 1 1 2 2 3 2 0-2-1-4 0-6Z'],
  bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z'],
  cooker: ['M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', 'M6 11V9h12v2', 'M12 9V5', 'M10 5h4'],
  run: ['M13 5a2 2 0 1 0 0-.01', 'M7 21l3-6 3 2v4', 'M10 15l1-5 4 2 3-1', 'M11 10 8 12'],
  up: ['M12 20V5', 'm6 11 6-6 6 6'],
  sun: ['M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2'],
  apple: ['M12 7c-3-2-7 0-7 5s3 8 5 8c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-3 5-8s-4-7-7-5Z', 'M12 7c0-2 1-4 3-4'],
  plug: ['M9 3v5', 'M15 3v5', 'M6 8h12v3a6 6 0 0 1-12 0Z', 'M12 17v4'],
  wave: ['M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0'],
  atom: ['M12 12h.01', 'M4 12c0-3 3.6-5 8-5s8 2 8 5-3.6 5-8 5-8-2-8-5Z', 'M8 5c2.5-1.5 6 1 8 4.5s2.5 7.5 0 9-6-1-8-4.5S5.5 6.5 8 5Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tK1 = T0('K1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook ---------- */
const JOBS = [['flame', 'Gas flame', 'HEATS A PAN', 'flame', 'heat'], ['bulb', 'Bulb', 'LIGHTS THE ROOM', 'bulb', 'light'], ['cooker', 'Pressure cooker', 'WHISTLES', 'cooker', 'sound']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , f], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="color:${[QC, '#B7791F', C.violet][i]}">${f}</div></div>`).join('');
const tJt = [wt('H2', 'Heat'), wt('H2', 'light'), wt('H2', 'sound')];
const KCS = [['Gas', 'CHEMICAL'], ['Flame', 'HEAT + LIGHT'], ['Pan', 'HEAT'], ['Whistle', 'SOUND']];
$('#kcs').innerHTML = KCS.map(([n, f], i) => `<div class="kc" id="kc${i}" style="top:${44 + i * 48}px"><span>${n}</span><b>${f}</b></div>`).join('');
const tKc = [wt('H3', 'gas'), wt('H3', 'burns'), wt('H3', 'pan'), wt('H3', 'cooker')];
const TILES = [['up', 'Stove off: warmth fades', C.ink2], ['flame', 'Used up, or moved?', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'fades'), wt('H4', 'used')];

/* ---------- P ---------- */
const FT = [['run', 'Kinetic', 'MOVING THINGS'], ['up', 'Potential', 'RAISED OR STRETCHED'], ['flame', 'Heat', 'HOT THINGS'], ['apple', 'Chemical', 'FUEL AND FOOD'], ['plug', 'Electrical', 'CURRENT IN WIRES'], ['sun', 'Light', 'BULB, SUN, FLAME'], ['wave', 'Sound', 'A WHISTLE, A HUM'], ['atom', 'Nuclear', 'INSIDE THE NUCLEUS']];
$('#fts').innerHTML = FT.map(([ic, n, e], i) => `<div class="ft" id="ft${i}" style="left:${36 + (i % 2) * 372}px;top:${76 + Math.floor(i / 2) * 104}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="fn">${n}</div><div class="fe">${e}</div></div>`).join('');
const tFt = [wt('P3', 'kinetic'), wt('P3', 'potential'), wt('P4', 'heat'), wt('P4', 'chemical'), wt('P5', 'electrical'), wt('P5', 'light'), wt('P5', 'sound'), wt('P5', 'nuclear')];
const ND = [['Gas', 'CHEMICAL', C.ink], ['Flame', 'HEAT + LIGHT', QC], ['Pan and food', 'HEAT', QC], ['Cooker whistle', 'SOUND + MOTION', C.violet]];
$('#nds').innerHTML = ND.map(([n, tg, c], i) => `<div class="nd" id="nd${i}" style="top:${80 + i * 114}px"><div class="nn">${n}</div><div class="nt" style="color:${c}">${tg}</div></div>`).join('') +
  [0, 1, 2].map(i => `<div class="dn" id="dn${i}" style="top:${166 + i * 114}px">&darr;</div>`).join('');
const tNd = [wt('P6', 'Chemical'), wt('P6', 'heat'), wt('P6', 'light'), wt('P6', 'sound')];

/* ---------- S: block on a rough ramp ---------- */
const S = $('#simS'), RX0 = 170, RY0 = 150, RX1 = 690, RY1 = 450, LPX = Math.hypot(RX1 - RX0, RY1 - RY0) / 10, AN = Math.atan2(RY1 - RY0, RX1 - RX0);   // 10 m ramp, 5 m high
const MASS = 2, FR = 4, ACC = G * Math.sin(PI / 6) - FR / MASS, TB = Math.sqrt(2 * 10 / ACC);     // a = 2.9 m/s^2, 2.63 s to the bottom
mk(S, 'path', { d: `M${RX0},${RY0} L${RX1},${RY1} L${RX0},${RY1} Z`, fill: '#EFECE3' });
mk(S, 'path', { d: `M${RX0},${RY0} L${RX1},${RY1} H744`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
for (let k = 0; k < 26; k++) { const u = (k + 0.5) / 26, x = RX0 + (RX1 - RX0) * u, y = RY0 + (RY1 - RY0) * u; mk(S, 'line', { x1: x, y1: y + 3, x2: x - 6, y2: y + 11, stroke: C.dim, 'stroke-width': 2 }); }
mk(S, 'path', { d: `M${RX0 - 24},${RY0} h-12 V${RY1} h12`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); txt(S, RX0 - 44, (RY0 + RY1) / 2 + 6, 'h = 5 m', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
txt(S, 430, 470 + 18, '10 m of ramp · 30°', { 'font-size': 17 }); txt(S, 744, 86, 'm = 2 kg · friction f = 4 N', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'end' });
const blockG = (op2) => { const o2 = mk(S, 'g', {}), g = mk(o2, 'g', {}); mk(g, 'rect', { x: -27, y: -54, width: 54, height: 54, rx: 7, fill: C.ink, opacity: op2 }); return g; };
const sGh = [0.3, 0.2, 0.12].map(o2 => blockG(o2)), sB = blockG(1);
const heatW = [0, 1, 2].map(() => mk(S, 'path', { d: '', fill: 'none', stroke: QC, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const sF = PUC.arrow(S, FC, 7, 19), sG = PUC.arrow(S, FC, 7, 19), sV = PUC.arrow(S, VC, 6, 18);
const sFl = txt(S, 0, 0, 'f', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: FC }), sGl = txt(S, 0, 0, 'mg', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: FC }), sVl = txt(S, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: VC });
const ramp = s => [RX0 + LPX * s * Math.cos(AN), RY0 + LPX * s * Math.sin(AN)];
const placeBlk = (g, s) => { const p = ramp(0.45 + s * 0.91); attr(g, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${(AN * 180 / PI).toFixed(2)})`); return p; };
$('#roG').innerHTML = `<span class="k">s</span><span class="v" id="r0">0.0</span><span class="u">m · down the ramp</span>
  <span class="k" style="color:${UC}">U</span><span class="v" id="r1" style="color:${UC}">98.0</span><span class="u">J · potential</span>
  <span class="k" style="color:#2E8F8F">K</span><span class="v" id="r2" style="color:#2E8F8F">0.0</span><span class="u">J · kinetic</span>
  <span class="k" style="color:${QC}">Q</span><span class="v" id="r3" style="color:${QC}">0.0</span><span class="u">J · heat</span>
  <span class="k" style="color:${TC};font-style:normal">Σ</span><span class="v" id="r4">98.0</span><span class="u">J · total</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 82, w: 540, h: 138, xmax: 10, ymin: 0, ymax: 100, xt: [0, 2, 4, 6, 8, 10], yt: [0, 50, 100] });
txt($('#grS'), 96, 72, 'E (J)', { 'text-anchor': 'end' });
const gT = gr.curve(TC, 3), gU = gr.curve(UC, 5), gK = gr.curve(KC, 5), gQ = gr.curve(QC, 5);
$('#grS').querySelectorAll('path')[1].setAttribute('stroke-dasharray', '7 7');
const dU = gr.dot(UC, 9), dK = gr.dot(KC, 9), dQ = gr.dot(QC, 9);
const glab = [['U', UC, 0], ['K', '#2E8F8F', 58], ['Q heat', QC, 40], ['total 98', TC, 98]].map(([s2, c, y]) => txt($('#grS'), gr.X(10) + 10, gr.Y(y) + 6, s2, { 'font-size': 17, fill: c, 'font-weight': 600 }));
const tRel = wt('S3', 'go') + 0.2, kPlay = Math.max(2, Math.min(4, Math.round(2 * (wt('S5', 'bottom') - tRel) / TB) / 2));
$('#half').textContent = `SHOWN AT ${(1 / kPlay).toFixed(2).replace(/0$/, '')}x`;
const tSlo = wt('S7', 'Slow'), tRes = tSlo + 0.6, TH4 = Math.sqrt(2 * 4 / ACC), TH5 = Math.sqrt(2 * 5 / ACC), tHold = tRes + 4 * (TH5 - TH4);
const sAt = t => { let tr; if (t < tSlo) tr = (t - tRel) / kPlay; else if (t < tRes) tr = TB; else if (t < tHold) tr = TH4 + (t - tRes) / 4; else tr = TH5;
  tr = M.clamp(tr, 0, TB); return { s: Math.min(10, 0.5 * ACC * tr * tr), v: ACC * tr }; };
const avS = PUC.avatar($('#sS'), { x: 160 + 384, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Heat counts too!' });

/* ---------- D ---------- */
const STEPS = [[`W_{${FK}} = ${FK}\\,d = 4 \\times 10 = 40\\,\\text{J}`, 'friction does work as the block slides'],
  [`${QK} = 40\\,\\text{J}`, 'that work becomes heat in the block and the ramp'],
  [`${UK}_{\\text{top}} = ${KK}_{\\text{bottom}} + ${QK}:\\;\\; 98 = 58 + 40`, 'every joule is counted'],
  [`${EK}_{\\text{total}} = \\text{constant}`, 'never created, never destroyed: it only changes form']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Friction'), wt('D3', 'That'), wt('D4', 'So'), wt('D5', 'total')];
const dr = $('#drS'), dTop = vbar(dr, 170, 440, 150, [[UC]], 3, 'AT THE TOP'), dBot = vbar(dr, 470, 440, 150, [[KC], [QC]], 3, 'AT THE BOTTOM');
const dEq = txt(dr, 392, 116, '98 J  =  58 J + 40 J', { 'font-size': 28, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${UK} + ${KK} + ${QK} + \\dots = \\text{constant}`);

/* ---------- C ---------- */
const c0 = $('#c0S'), cM0 = vbar(c0, 150, 440, 150, [[UC]], 3, 'TOP'), cM1 = vbar(c0, 440, 440, 150, [[KC]], 3, 'BOTTOM');
const c1 = $('#c1S'), cT0 = vbar(c1, 150, 440, 150, [[UC]], 3, 'TOP'), cT1 = vbar(c1, 440, 440, 150, [[KC], [QC]], 3, 'BOTTOM');
const th1 = PUC.think($('#th1'), { q: 'A ball bounces lower and lower, then stops. Is energy lost from the universe?', opts: ['Yes, it is lost', 'No, it changed form'], right: 1,
  why: 'It became heat and sound in the ball, floor and air.' });
const th2 = PUC.think($('#th2'), { q: 'A ceiling fan takes in electrical energy. Is all of it turned into the motion of air?', opts: ['Yes, all of it', 'No, some is heat and sound'], right: 1,
  why: 'A warm motor and a hum. All the parts add up to the input.' });

/* ---------- R: the kitchen flow ---------- */
const rl = $('#rlS');
const box = (x, y, w, h, t1, t2, c) => { const g0 = mk(rl, 'g', {}), g = mk(g0, 'g', {}); mk(g, 'rect', { x, y, width: w, height: h, rx: 12, fill: C.soft });
  txt(g, x + 16, y + 34, t1, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: C.ink }); txt(g, x + 16, y + 60, t2, { 'font-size': 15, fill: c, 'font-weight': 600, 'letter-spacing': 1 }); return g; };
const RB = [box(36, 84, 230, 76, 'Gas', 'CHEMICAL', C.ink), box(320, 84, 260, 76, 'Flame', 'HEAT + LIGHT', QC), box(36, 236, 230, 76, 'Pan and food', 'HEAT', QC), box(320, 236, 260, 76, 'Air', 'HEAT ESCAPES', QC),
  box(36, 388, 230, 76, 'Cooker whistle', 'MOTION + SOUND', C.violet), box(320, 388, 400, 76, 'The whole room', 'A LITTLE WARMTH, SPREAD OUT', C.mute)];
const flow = (d) => mk(rl, 'path', { d, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': '' });
const RF = [flow('M266,122 H316'), flow('M450,160 L180,232'), flow('M450,160 V232'), flow('M151,312 V384'), flow('M266,426 H316'), flow('M450,312 V384')];
const rHead = RF.map(() => mk(rl, 'circle', { r: 6, fill: C.ac }));
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const rBoxT = [tLk[0], tLk[0] + 0.6, tLk[1] + 0.2, tLk[1] + 0.9, tLk[2] + 0.2, tLk[3] + 0.3], rFlowT = [tLk[0] + 0.4, tLk[1], tLk[1] + 0.7, tLk[2], tLk[3], tLk[3] + 0.2];
const LK = [['Gas: <span style="color:var(--ink)">chemical</span> → <span class="qq">heat</span> and light'], ['<span class="qq">Heat</span> goes into the pan, food and air'], ['Steam lifts the whistle: motion and <span style="color:#7A4FE0">sound</span>'], ['All spreads out as warmth. None is destroyed']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Not used up. Just spread too thin!' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${UK} = mgh = 0.5 \\times 9.8 \\times 10 = 49\\,\\text{J}`)],
  [K(`${KK} = \\tfrac12 mv^2 = \\tfrac12 \\times 0.5 \\times 144 = 36\\,\\text{J}`)],
  [K(`${QK}_{\\text{air}} = ${UK} - ${KK} = 49 - 36`)],
  [K(`${QK}_{\\text{air}} = ${tx(QC, '13\\,\\text{J}')}\\ \\text{(heat)}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WX = 170, WY0 = 110, WY1 = 450;
mk(w, 'line', { x1: WX - 60, y1: WY1 + 16, x2: WX + 60, y2: WY1 + 16, stroke: C.ink, 'stroke-width': 3 });
mk(w, 'path', { d: `M${WX - 70},${WY0} h-12 V${WY1 + 16} h12`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); txt(w, WX - 90, (WY0 + WY1) / 2, '10 m', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const wGh = [0.3, 0.2, 0.12].map(o2 => mk(w, 'circle', { r: 16, fill: C.ink, opacity: o2 })), wB = mk(w, 'circle', { cx: WX, cy: WY0, r: 16, fill: C.ink });
const wA = vbar(w, 340, 450, 110, [[UC]], 5, 'TOP'), wBb = vbar(w, 560, 450, 110, [[KC], [QC]], 5, 'GROUND');
const wV = txt(w, WX + 30, WY1 + 6, 'v = 12 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const AW = 144 / 20, TF = Math.sqrt(2 * 10 / AW), tDrop = T0('W2') + 0.8;     // steady a = 7.2 m/s^2 gives 12 m/s after 10 m (drag folded in)
const wY = t => { const tr = M.clamp((t - tDrop) / 2, 0, TF); return WY0 + (WY1 - WY0) * (0.5 * AW * tr * tr) / 10; };
const tW = [wt('W3', 'At'), wt('W4', 'At'), wt('W5', 'So'), wt('W5', 'Thirteen')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Energy is conserved, so ' + K(`${KK}_{\\text{bottom}} = mgh`), right: 'Only the total is conserved: ' + K(`${KK} + ${QK} = mgh`) + ', so K is less' });
const tg = $('#tg'), tA = vbar(tg, 110, 230, 80, [[UC]], 1.6, ''), tB = vbar(tg, 250, 230, 80, [[KC], [QC]], 1.6, '');
txt(tg, 150, 258, 'mgh', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }); txt(tg, 290, 258, 'K + Q', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Board questions on energy changes; numericals where friction makes heat' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 1 kg block slides from rest down a rough curved track 5 m high, reaches the bottom at 8 m/s, then stops after 4 m on a rough floor. <i>g</i> = 10 m/s². Heat made on the curve, and friction on the floor?', qW: 800,
  opts: ['18 J, 8 N', '32 J, 8 N', '18 J, 4.5 N', '50 J, 12.5 N'], right: 0, optY: 330 });
const so = PUC.solution($('#so'), [[K(`${UK} = mgh = 1 \\times 10 \\times 5 = 50\\,\\text{J}`)], [K(`${KK} = \\tfrac12 (1)(64) = 32\\,\\text{J}`)],
  [K(`${QK} = 50 - 32 = 18\\,\\text{J}`)], [K(`f = 32/4 = 8\\,\\text{N} \\Rightarrow \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'At'), wt('A3', 'At'), wt('A3', 'So'), wt('A4', 'f')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · forms of energy and conservation', y0: 92, dy: 92, txt: [1, 0, 1, 1],
  lines: ['<b>Forms</b>: kinetic, potential, heat, chemical, electrical, light, sound, nuclear',
    K(`${EK}_{\\text{total}} = ${UK} + ${KK} + ${QK} + \\dots = \\text{constant}`),
    '<b>Mechanical</b> energy (K + U) falls with friction; the <b>total</b> never does',
    '<b>Friction</b> turns K into heat: ' + K(`${KK} + ${QK} = mgh`)] });
const YQ = ['Name four forms of energy in a kitchen.', 'Where does mechanical energy go when friction acts?', 'What does the law of conservation of energy say?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 86', topic: 'Striker bounces, clay sticks: who keeps its energy? Collisions', y: 764 });

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, tJt[i] - 0.1, 1e9, POP);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - tJt[i]) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'Where') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#kit'), t, tKc[0] - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    const fade = M.io((t - wt('H4', 'fades')) / 1.2);
    KCS.forEach((_, i) => { const el = $('#kc' + i); M.vis(el, t, tKc[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i === 0 ? '#E3E6EC' : '#FBE6E6', M.io((t - tKc[i]) / 0.3) * (1 - fade)); el.style.opacity = (1 - 0.55 * fade).toFixed(3); });
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pf'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pfG'), t, wt('P2', 'forms') - 0.1, 1e9, { dy: 8 });
    FT.forEach((_, i) => { const el = $('#ft' + i); M.vis(el, t, tFt[i] - 0.12, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tFt[i]) / 0.3) * (1 - M.io((t - tFt[i] - 1.2) / 0.4))); });
    M.vis($('#pc'), t, T0('P6') - 0.15, out, { dx: 60, dy: 0, ...o });
    ND.forEach((_, i) => { const el = $('#nd' + i); M.vis(el, t, tNd[i] - 0.15, 1e9, { dx: -20, dy: 0 }); });
    [0, 1, 2].forEach(i => M.vis($('#dn' + i), t, tNd[i + 1] - 0.3, 1e9, { dy: -10 }));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#half'), t, tS1 + 0.5, tSlo - 0.1, { dy: 8, outDur: 0.15 }); M.vis($('#slo'), t, tSlo - 0.05, out, POP);
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const st = sAt(t), p = placeBlk(sB, st.s);
    sGh.forEach((g, k) => { const t2 = t - (t > tRes ? 0.35 : 0.12) * (k + 1), s2 = sAt(t2).s; placeBlk(g, s2); M.hide(g, (t > tSlo && t < tRes + 0.2) || Math.abs(s2 - st.s) < 0.08); });
    // readout: s rounded first, then U, K, Q from it (U = 98 - 9.8 s, Q = 4 s, K = 5.8 s)
    const sd = Math.round(st.s * 10) / 10, U = MASS * G * (5 - sd * 0.5), Q = FR * sd, Kd = MASS * G * sd * 0.5 - FR * sd;
    M.setT($('#r0'), sd.toFixed(1)); M.setT($('#r1'), U.toFixed(1)); M.setT($('#r2'), Kd.toFixed(1)); M.setT($('#r3'), Q.toFixed(1)); M.setT($('#r4'), (U + Kd + Q).toFixed(1));
    const hi = M.io((t - wt('S6', 'total') + 0.1) / 0.3) * (1 - M.io((t - T0('S7')) / 0.3)); $('#r4').style.background = mix('#FFFFFF', '#E3E6EC', hi);
    gT(x => [x, 98], 0, Math.min(10, Math.max(sd, 10 * M.io((t - wt('S6', 'total')) / 0.6))));
    const se = t >= tSlo ? 10 : sd; gU(x => [x, 98 - 9.8 * x], 0, se); gK(x => [x, 5.8 * x], 0, se); gQ(x => [x, 4 * x], 0, se);
    const don = t > tS1 + 0.8; dU(sd, U, don); dK(sd, Kd, don && sd > 0); dQ(sd, Q, don && sd > 0);
    glab.forEach((l, i) => op(l, M.clamp((t - (i === 3 ? wt('S6', 'total') : wt('S5', 'bottom'))) / 0.3)));
    M.vis($('#grP'), t, wt('S6', 'flat') - 0.1, 1e9, POP);
    // slow-mo: friction up the slope, weight down, v down the slope, heat ticks at the contact
    const slo = t > tRes - 0.1 && t < out, gf = M.o3((t - wt('S8', 'Friction') + 0.1) / 0.5) * (slo ? 1 : 0), ux = Math.cos(AN), uy = Math.sin(AN), nx2 = Math.sin(AN), ny2 = -Math.cos(AN);
    const c0 = [p[0] + nx2 * 27, p[1] + ny2 * 27];
    if (gf > 0.01) { sF.set(c0[0] - ux * 30, c0[1] - uy * 30, c0[0] - ux * (30 + 70 * gf), c0[1] - uy * (30 + 70 * gf)); sG.set(c0[0], c0[1], c0[0], c0[1] + 90 * gf); sV.set(c0[0] + ux * 30 + nx2 * 40, c0[1] + uy * 30 + ny2 * 40, c0[0] + ux * (30 + 90 * gf) + nx2 * 40, c0[1] + uy * (30 + 90 * gf) + ny2 * 40); }
    else { sF.set(0, 0, 0, 0); sG.set(0, 0, 0, 0); sV.set(0, 0, 0, 0); }
    at(sFl, c0[0] - ux * 110 - 6, c0[1] - uy * 110 - 18); at(sGl, c0[0] + 12, c0[1] + 100); at(sVl, c0[0] + ux * 130 + nx2 * 40, c0[1] + uy * 130 + ny2 * 40 - 6); [sFl, sGl, sVl].forEach(e => op(e, gf));
    const gh = M.o3((t - wt('S8', 'warms') + 0.1) / 0.4) * (slo ? 1 : 0) + (t > tRel && t < tSlo && st.s < 10 ? 0.7 : 0);
    heatW.forEach((hw, k) => { const b = [p[0] + ux * (-20 + 20 * k), p[1] + uy * (-20 + 20 * k)], ph = (t * 6 + k) % 2;
      attr(hw, 'd', `M${(b[0]).toFixed(1)},${(b[1] + 8).toFixed(1)} q 4 6 0 12 q -4 6 0 12`); hw.style.opacity = (gh * (0.5 + 0.5 * Math.abs(1 - ph))).toFixed(3); });
    M.vis($('#hchip'), t, wt('S8', 'warms') - 0.1, 1e9, POP);
    avS(t, wt('S8', 'disappears') + 0.3, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 118]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const a = M.o3((t - tD1 - 0.5) / 0.7), q = M.o3((t - wt('D3', 'heat') + 0.1) / 0.6), k = M.o3((t - wt('D4', 'bottom') + 0.1) / 0.6);
    dTop([98 * a], ['U 98']); dBot([58 * k, 40 * q], ['K 58', 'Q 40']); op(dEq, M.clamp((t - wt('D4', 'Ninety') + 0.1) / 0.3));
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Energy') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'only') - 0.2, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const m0 = M.o3((t - T0('C2') + 0.1) / 0.6), m1 = M.o3((t - wt('C2', 'down') + 0.1) / 0.6);
    cM0([98 * m0], ['98 J']); cM1([58 * m1], ['58 J']); M.vis($('#c0P'), t, wt('C2', 'down') - 0.1, 1e9, POP);
    M.vis($('#c1'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const t0 = M.o3((t - T0('C3') + 0.1) / 0.6), t1 = M.o3((t - wt('C3', 'heat') + 0.1) / 0.6);
    cT0([98 * t0], ['98 J']); cT1([58 * t1, 40 * t1], ['K 58', 'heat 40']); M.vis($('#c1P'), t, wt('C3', 'never') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Is') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'It') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Is') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Some') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RB.forEach((b, i) => M.vis(b, t, rBoxT[i] - 0.1, 1e9, { dy: 14 }));
    RF.forEach((f, i) => { M.draw(f, t, rFlowT[i], 0.6); const L = f.getTotalLength(), u = ((t - rFlowT[i] - 0.6) * 0.6) % 1; const pt = f.getPointAtLength(L * (u < 0 ? 0 : u)); attr(rHead[i], 'cx', pt.x.toFixed(1)); attr(rHead[i], 'cy', pt.y.toFixed(1)); M.hide(rHead[i], t < rFlowT[i] + 0.6); });
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5') + 0.5)) / 0.3))); });
    avR(t, wt('R5', 'destroyed') + 0.2, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const y = wY(t); attr(wB, 'cy', y.toFixed(1)); wGh.forEach((g, k) => { const y2 = wY(t - 0.1 * (k + 1)); attr(g, 'cx', WX); attr(g, 'cy', y2.toFixed(1)); M.hide(g, Math.abs(y2 - y) < 3); });
    op(wV, M.clamp((t - tDrop - 2 * TF) / 0.3));
    const a = M.o3((t - tW[0] - 0.4) / 0.6), b = M.o3((t - tW[1] - 0.4) / 0.6), c = M.o3((t - tW[3] + 0.1) / 0.6);
    wA([49 * a], ['U 49 J']); wBb([36 * b, 13 * c], ['K 36 J', 'Q 13 J']);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'energy') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'With') });
    const g = M.o3((t - wt('X3', 'With') + 0.1) / 0.6); tA([98 * M.o3((t - tX1 - 0.3) / 0.5)], ['']); tB([58 * g, 40 * g], ['', '']);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'board') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
