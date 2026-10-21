// PUC Physics Ep 18: Reference frames (Motion notebook: one bicycle ride seen from two frames)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const XC = C.ink, PC = C.violet, VC = C.ac, BAG = C.gold;   // colour-coding: x ink, x' violet, V blue (velocity), the bag gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const op = (el, v) => { const s = v >= 0.999 ? '' : Math.max(0, v).toFixed(3); if (el.style.opacity !== s) el.style.opacity = s; M.hide(el, v <= 0.001); };
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

Object.assign(M.IC, {
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'],
});

/* ---------- drawing helpers ---------- */
let clipN = 0;
// a bicycle with Aarav and his bag; local origin = the bag (its position is "the bag's position")
function bike(p, face = true) {
  const g = mk(p, 'g', {});
  [[-10, 58], [62, 58]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: x, cy: y, r: 3.5, fill: C.ink }); });
  mk(g, 'path', { d: 'M-10,58 L22,58 L12,24 Z M12,24 L54,22 L62,58 M22,58 L54,22', fill: 'none', stroke: '#1F3A8A', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M54,22 L50,8 L62,6', fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M14,22 L22,58 M17,0 L56,8 M14,22 L19,-4', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M4,22 H22', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'rect', { x: -12, y: -16, width: 22, height: 30, rx: 5, fill: BAG, stroke: C.ink, 'stroke-width': 2.5 });
  if (face) {
    const id = 'cf18_' + (clipN++), cp = mk(g, 'clipPath', { id }); mk(cp, 'circle', { cx: 21, cy: -22, r: 16 });
    mk(g, 'image', { href: IMG + 'aarav-face.jpg', x: 5, y: -38, width: 32, height: 32, 'clip-path': `url(#${id})` });
    mk(g, 'circle', { cx: 21, cy: -22, r: 16, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
  }
  return g;
}
function gate(p) {
  const g = mk(p, 'g', {});
  mk(g, 'rect', { x: -10, y: -76, width: 20, height: 76, fill: '#EDE6D3', stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: -14, y: -86, width: 28, height: 12, rx: 2, fill: '#EDE6D3', stroke: C.ink, 'stroke-width': 2.5 });
  txt(g, 0, -96, 'GATE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 });
  return g;
}
function bracket(p, col, label, lsz = 24) {
  const g = mk(p, 'g', {}), path = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round' });
  const l = txt(g, 0, 0, label, { 'font-size': lsz, fill: col, 'font-weight': 600, 'text-anchor': 'middle' });
  return { g, l, set(x1, x2, y) { attr(path, 'd', `M${x1.toFixed(1)},${y - 10} v10 H${x2.toFixed(1)} v-10`); attr(l, 'x', ((x1 + x2) / 2).toFixed(1)); attr(l, 'y', y + 30); } };
}

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tO1 = T0('O1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three cases ---------- */
const JOBS = [['train', 'Passenger', 'ASLEEP ON A TRAIN'], ['globe', 'You', 'ON A SPINNING EARTH'], ['help', 'Still or moving?', 'WHO DECIDES?']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'passenger'), wt('H2', 'You'), wt('H2', 'spinning') + 0.5];

/* ---------- P: where, from where? + a frame = 3 things ---------- */
const pl = $('#plS'), PY = 330, PX0 = 120, PS = 28;
mk(pl, 'line', { x1: 40, y1: PY, x2: 744, y2: PY, stroke: C.ink, 'stroke-width': 3 });
const pTick = mk(pl, 'g', {});
for (let m = 0; m <= 20; m++) { const x = PX0 + m * PS; mk(pTick, 'line', { x1: x, y1: PY, x2: x, y2: PY + (m % 5 ? 10 : 20), stroke: C.ink, 'stroke-width': 2 }); if (m % 5 === 0) txt(pTick, x, PY + 46, m, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(pTick, PX0 + 20 * PS, PY + 70, 'm', { 'text-anchor': 'end', 'font-weight': 600 });
const pGate = gate(pl); at(pGate, PX0, PY);
const pBike = bike(pl); at(pBike, PX0 + 10 * PS, PY - 82);
const pB0 = bracket(pl, XC, 'from the gate: 10 m'), pB1 = { g: txt(pl, PX0 + 10 * PS + 76, 236, 'from Aarav: 0 m', { 'font-size': 24, fill: PC, 'font-weight': 600 }) };
pB0.set(PX0, PX0 + 10 * PS, 130);
const pFlag = mk(pl, 'g', {}); pFlag.innerHTML = `<g transform="translate(${PX0 - 14},${PY + 92})">${M.icon('flag', 28, C.ac, 2.4).replace('<svg', '<svg x="0" y="0"')}</g>`;
const pO = txt(pl, PX0 + 22, PY + 114, 'ORIGIN O', { 'font-size': 20, fill: C.ac, 'font-weight': 600 });
const pDir = PUC.arrow(pl, C.ac, 5, 16), pDirL = txt(pl, 560, PY + 112, '+ direction', { 'font-size': 20, fill: C.ac, 'font-weight': 600 });
const pClk = txt(pl, 36, 540, 't = 0 s  (start the clock)', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const FR = [['flag', 'Origin', 'the point you measure from', 'x = 0'], ['arrowR', 'Positive direction', 'which way counts as +', '+ &rarr;'], ['clock', 'A clock', 'to say when it happens', 't']];
$('#frs').innerHTML = FR.map(([ic, n, w, v], i) => `<div class="fr" id="fr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="fn">${n}</div><div class="fw">${w}</div><div class="fv">${v}</div></div>`).join('');

/* ---------- S: one ride, two frames (sim + readout + graph) ---------- */
const s = $('#simS'), X0 = 80, SC = 28, V = 5;                 // 28 px per metre; Aarav rides at 5 m/s
const Y1 = 230, Y2 = 478, X2 = 392;
// lane 1: ground frame
const L1 = mk(s, 'g', {});
txt(L1, 36, 100, 'GROUND FRAME · ORIGIN AT THE GATE', { 'font-size': 16, 'letter-spacing': 1.5, fill: XC, 'font-weight': 600 });
mk(L1, 'line', { x1: 36, y1: Y1, x2: 748, y2: Y1, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 23; m++) { const x = X0 + m * SC; mk(L1, 'line', { x1: x, y1: Y1, x2: x, y2: Y1 + (m % 5 ? 8 : 16), stroke: C.ink, 'stroke-width': 2 }); if (m % 5 === 0) txt(L1, x, Y1 + 38, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(L1, 748, Y1 + 38, 'x (m)', { 'text-anchor': 'end', 'font-size': 16 });
const g1 = gate(L1); at(g1, X0, Y1);
const gh1 = [0, 1, 2].map(() => bike(L1, false)), bk1 = bike(L1);
// lane 2: bicycle frame (axis rides with the bike, the ground slides back)
const L2 = mk(s, 'g', {});
txt(L2, 36, 346, "BICYCLE FRAME · ORIGIN AT AARAV", { 'font-size': 16, 'letter-spacing': 1.5, fill: PC, 'font-weight': 600 });
mk(L2, 'line', { x1: 36, y1: Y2, x2: 748, y2: Y2, stroke: C.ink, 'stroke-width': 3 });
const dash = mk(L2, 'g', {}); for (let x = 0; x < 900; x += 56) mk(dash, 'line', { x1: x, y1: Y2 + 22, x2: x + 26, y2: Y2 + 22, stroke: C.dim, 'stroke-width': 3, 'stroke-linecap': 'round' });
const dashClip = mk(s, 'clipPath', { id: 'dc18' }); mk(dashClip, 'rect', { x: 36, y: Y2, width: 712, height: 40 }); attr(dash, 'clip-path', 'url(#dc18)');
for (let m = -11; m <= 12; m++) { const x = X2 + m * SC; if (x < 40 || x > 746) continue; mk(L2, 'line', { x1: x, y1: Y2, x2: x, y2: Y2 + (m % 5 ? 8 : 16), stroke: PC, 'stroke-width': 2 }); if (m % 5 === 0) txt(L2, x, Y2 + 52, m, { 'text-anchor': 'middle', 'font-size': 18, fill: PC, 'font-weight': 600 }); }
txt(L2, 748, Y2 + 52, "x' (m)", { 'text-anchor': 'end', 'font-size': 16, fill: PC });
const gGh = [0, 1, 2].map(() => gate(L2)), g2 = gate(L2), bk2 = bike(L2); at(bk2, X2, Y2 - 82);
const gClip = mk(s, 'clipPath', { id: 'gc18' }); mk(gClip, 'rect', { x: 36, y: 300, width: 712, height: 280 });
[...gGh, g2].forEach(e => attr(e, 'clip-path', 'url(#gc18)'));
// slow-mo extras
const vA1 = PUC.arrow(s, VC, 6, 18), vL1 = txt(s, 0, 0, 'V = 5 m/s', { 'font-size': 22, fill: VC, 'font-weight': 600 });
const vA2 = PUC.arrow(s, VC, 6, 18), vL2 = txt(s, 0, 0, 'ground: 5 m/s back', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const br1 = bracket(s, XC, 'x = 10 m', 26), br2 = txt(s, X2 + 80, Y2 - 112, "x' = 0 m", { 'font-size': 26, fill: PC, 'font-weight': 600 });
const tagR = $('#smo');
// readout + graph
$('#roG').style.rowGap = '4px';
$('#roG').innerHTML = `<span class="k" style="color:${XC}">t</span><span class="v" id="rot">0.00</span><span class="u">s</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="rox">0.0</span><span class="u">m from the gate</span>
  <span class="k" id="rok2" style="color:${PC}">x&prime;</span><span class="v" id="rox2" style="color:${PC}">0.0</span><span class="u" id="rou2">m from Aarav</span>
  <span class="k" style="color:${VC}">V</span><span class="v" style="color:${VC}">5</span><span class="u">m/s</span>`;
const G = PUC.graph($('#grS'), { x: 120, y: 70, w: 560, h: 140, xmax: 4, ymax: 20, xt: [0, 1, 2, 3, 4], yt: [0, 10, 20], yl: 'x (m)' });
const gtl = txt($('#grS'), 760, 250, 't (s)', { 'text-anchor': 'end' });
const cvG = G.curve(XC), cvP = G.curve(PC), dG = G.dot(XC), dP = G.dot(PC);
const lgG = txt($('#grS'), 250, 104, 'ground frame', { 'font-size': 18, fill: XC, 'font-weight': 600 });
const lgP = txt($('#grS'), 420, 196, 'bicycle frame', { 'font-size': 18, fill: PC, 'font-weight': 600 });
// the ride clock: tau (sim seconds) from the voice
const tSl0 = T0('S6') + 0.3, tSl1 = wt('S6', 'From') - 0.1, rSlow = 0.4 / Math.max(1.2, tSl1 - tSl0), rS = 4 * rSlow;
const tA0 = wt('S3', 'Every'), tJump = T0('S4') + 0.2, tB0 = Math.max(wt('S5', 'In') - 0.1, tSl0 - 1.6 / rS), tC0 = T0('S7') + 0.2;
const rB = 1.6 / (tSl0 - tB0);
const tau = t => {
  if (t < tJump) return M.clamp((t - tA0) * rS, 0, 2);
  if (t < tB0) return 0;
  if (t < tSl0) return (t - tB0) * rB;
  if (t < tSl0 + 0.4 / rSlow) return 1.6 + (t - tSl0) * rSlow;
  if (t < tC0) return 2;
  return Math.min(4, 2 + (t - tC0) * rS);
};
const tLane2 = wt('S4', 'Frame') - 0.1;

/* ---------- L: reasoning chain + move the origin ---------- */
const LK = ['Moving = position changes with time', 'Position is measured from an origin', 'New origin = new positions'];
$('#lks').innerHTML = LK.map((x, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 124}px"><div class="n">${i + 1}</div><div class="lt">${x}</div></div>` + (i < 2 ? `<div class="ld" id="ld${i}" style="top:${172 + i * 124}px">${M.icon('arrowD', 30, C.ac, 2.6)}</div>` : '')).join('') +
  `<div class="pillp ink" id="lkP" style="left:36px;top:470px">So rest and motion are relative</div>`;
const tLk = [wt('L2', 'Moving'), wt('L3', 'position'), wt('L3', 'Pick'), wt('L4', 'relative')];
const lr = $('#lrS'), LY = 300, LB = 600;
mk(lr, 'line', { x1: 40, y1: LY, x2: 744, y2: LY, stroke: C.ink, 'stroke-width': 3 });
const lBike = bike(lr); at(lBike, LB, LY - 82); at(gate(lr), LB - 280, LY);
const lFlag = mk(lr, 'g', {}); lFlag.innerHTML = `<g transform="translate(-14,16)">${M.icon('flag', 28, C.ac, 2.4)}</g>`;
const lFt = txt(lFlag, 20, 38, 'ORIGIN', { 'font-size': 18, fill: C.ac, 'font-weight': 600 });
const lBr = bracket(lr, XC, 'bag from the origin', 22);
const avA = PUC.avatar($('#sL'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So Diya and I were both right.' });

/* ---------- D: the rule linking the two frames ---------- */
const STEPS = [[`\\textcolor{${XC}}{x}\\;\\;\\text{and}\\;\\;\\textcolor{${PC}}{x'}`, "x from the gate, x' from Aarav"],
  [`\\text{Aarav: }\\textcolor{${VC}}{V}t`, 'he rides at speed V for time t'],
  [`\\textcolor{${XC}}{x} = \\textcolor{${PC}}{x'} + \\textcolor{${VC}}{V}t`, 'lengths along a line add up'],
  [`\\text{m} = \\text{m} + \\tfrac{\\text{m}}{\\text{s}}\\times\\text{s}`, 'units match on both sides: it fits']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Check')];
const dr = $('#drS'), DY = 300, DX0 = 80, DS = 26;
mk(dr, 'line', { x1: 40, y1: DY, x2: 744, y2: DY, stroke: C.ink, 'stroke-width': 3 });
const dGate = gate(dr); at(dGate, DX0, DY);
const dBike = bike(dr);
const bottle = mk(dr, 'g', {}); mk(bottle, 'rect', { x: -7, y: -22, width: 14, height: 26, rx: 4, fill: '#CFE0F8', stroke: C.ink, 'stroke-width': 2.5 }); mk(bottle, 'rect', { x: -4, y: -28, width: 8, height: 7, rx: 1.5, fill: C.ink });
const dBV = bracket(dr, VC, 'Vt', 30), dBP = bracket(dr, PC, "x'", 30), dBX = bracket(dr, XC, 'x', 30);
const avD = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'One rule links my view and his.' });
$('#stF').innerHTML = K(`\\textcolor{${XC}}{x} = \\textcolor{${PC}}{x'} + \\textcolor{${VC}}{V}t`);

/* ---------- K: side by side tables + think ---------- */
const tabs = (host, col, sym, vals) => {
  host.innerHTML = `<div class="th"><span style="left:28px">t (s)</span><span style="right:36px;color:${col}">${sym} (m)</span></div>` +
    vals.map((v, i) => `<div class="tb" style="top:${120 + i * 86}px"><div class="c0">${i}</div><div class="c1" style="color:${col}">${v}</div></div>`).join('');
};
tabs($('#kla'), XC, '<i style="font-family:Poppins">x</i>', [0, 5, 10, 15]); tabs($('#kra'), PC, '<i style="font-family:Poppins">x&prime;</i>', [0, 0, 0, 0]);
const tKl = [wt('K1', 'zero'), wt('K1', 'five'), wt('K1', 'ten'), wt('K1', 'fifteen')], tKr = [0, 1, 2, 3].map(i => wt('K2', 'zero', i));
const th1 = PUC.think($('#th1'), { q: "In Aarav's frame, is Diya at the gate moving or at rest?", opts: ['Moving', 'At rest'], right: 0, why: 'Her distance from him grows 5 m every second: in his frame she moves backwards.' });

/* ---------- O: origin and sign ---------- */
const ol = $('#olS'), OY = 300, OX = 392, OS = 56;
mk(ol, 'line', { x1: 40, y1: OY, x2: 744, y2: OY, stroke: C.ink, 'stroke-width': 3 });
for (let m = -6; m <= 6; m++) { const x = OX + m * OS; mk(ol, 'line', { x1: x, y1: OY, x2: x, y2: OY + (m % 3 ? 10 : 18), stroke: C.ink, 'stroke-width': 2 }); txt(ol, x, OY + 44, m > 0 ? '+' + m : m, { 'text-anchor': 'middle', 'font-size': 18, fill: m ? C.ink : C.ac, 'font-weight': 600 }); }
const oGate = gate(ol); at(oGate, OX, OY);
const oPlus = PUC.arrow(ol, C.ac, 5, 16), oPlusL = txt(ol, 560, OY + 92, '+ side', { 'font-size': 22, fill: C.ac, 'font-weight': 600 }), oMinL = txt(ol, 140, OY + 92, '- side', { 'font-size': 22, fill: C.red, 'font-weight': 600 });
const dog = mk(ol, 'g', {});
mk(dog, 'ellipse', { cx: 0, cy: -34, rx: 30, ry: 16, fill: '#A8743F', stroke: C.ink, 'stroke-width': 2.5 });
mk(dog, 'path', { d: 'M-20,-24 V0 M-8,-22 V0 M10,-22 V0 M22,-24 V0', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
mk(dog, 'path', { d: 'M-28,-40 Q-42,-56 -36,-64', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(dog, 'circle', { cx: 30, cy: -54, r: 15, fill: '#A8743F', stroke: C.ink, 'stroke-width': 2.5 });
mk(dog, 'path', { d: 'M22,-66 L18,-48 L28,-56 Z', fill: '#6E4A26', stroke: C.ink, 'stroke-width': 2 });
mk(dog, 'circle', { cx: 35, cy: -56, r: 2.5, fill: C.ink }); mk(dog, 'circle', { cx: 45, cy: -50, r: 3, fill: C.ink });
const dogX = M.keys([[0, 3], [wt('O3', 'moves'), -3]], 1.6, M.io);
const ORS = [['flag', 'Your choice', 'where O is, which way is +', 'say it first'], ['arrowR', 'Right of O', 'positive position', '+3 m'], ['arrowL', 'Left of O', 'negative position', '-3 m']];
$('#ors').innerHTML = ORS.map(([ic, n, w, v], i) => `<div class="fr" id="or${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, i === 2 ? C.red : C.ac, 2.2)}</i><div class="fn">${n}</div><div class="fw">${w}</div><div class="fv" style="color:${i === 2 ? C.red : i === 1 ? C.ac : C.mute};font-size:${i ? 36 : 22}px;top:${i ? 34 : 44}px">${v}</div></div>`).join('') +
  `<div class="pillp ink" id="orP" style="left:36px;top:490px">The minus sign tells you the side</div>`;
const th2 = PUC.think($('#th2'), { q: 'The dog moves to 3 m left of the gate. What is its position?', opts: ['+3 m', '-3 m'], right: 1, why: 'Left of the origin is negative: the minus sign tells you the side.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${XC}}{x} = \\textcolor{${PC}}{x'} + \\textcolor{${VC}}{V}t`)],
  [K(`\\textcolor{${PC}}{x'} = 0.5\\,\\text{m},\\;\\textcolor{${VC}}{V} = 5\\,\\text{m/s},\\;t = 6\\,\\text{s}`)],
  [K(`\\textcolor{${VC}}{V}t = 5 \\times 6 = 30\\,\\text{m}`)],
  [K(`\\textcolor{${XC}}{x} = 0.5 + 30 = 30.5\\,\\text{m}`)]], { label: 'WORKED EXAMPLE', y0: 228, dy: 88 });
const tW = [wt('W3', 'Use'), wt('W4', 'Here'), wt('W5', 'V'), wt('W6', 'So')];
const wr = $('#wrS'), WY = 300, WX0 = 60, WS = 20;
mk(wr, 'line', { x1: 40, y1: WY, x2: 744, y2: WY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 33; m++) { const x = WX0 + m * WS; mk(wr, 'line', { x1: x, y1: WY, x2: x, y2: WY + (m % 5 ? 8 : 16), stroke: C.ink, 'stroke-width': 2 }); if (m % 10 === 0) txt(wr, x, WY + 40, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(wr, 744, WY + 40, 'm', { 'text-anchor': 'end' });
const wGate = gate(wr); at(wGate, WX0, WY);
const wgh = [0, 1, 2].map(() => bike(wr, false)), wBike = bike(wr);
const wBot = mk(wr, 'g', {}); mk(wBot, 'rect', { x: -6, y: -20, width: 12, height: 22, rx: 3, fill: '#CFE0F8', stroke: C.ink, 'stroke-width': 2.2 }); mk(wBot, 'rect', { x: -3.5, y: -25, width: 7, height: 6, rx: 1.5, fill: C.ink });
const wClock = txt(wr, 36, 108, 't = 0.0 s', { 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const wBV = bracket(wr, VC, 'Vt = 30 m', 24), wBP = txt(wr, 0, 0, "x' = 0.5 m", { 'font-size': 22, fill: PC, 'font-weight': 600, 'text-anchor': 'end' }), wBX = bracket(wr, XC, 'x = 30.5 m', 24);
const tRide0 = wt('W2', 'Where'), tRide1 = tRide0 + 3.2;
const wtau = t => 6 * M.clamp((t - tRide0) / (tRide1 - tRide0));

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The ground frame is the true frame', right: 'No frame is the true one: name it first' });
const tp = $('#tpS');
const tpRows = [['FROM THE GATE', 'moving', XC], ['FROM AARAV', 'at rest', PC]].map(([a, b, col], i) => {
  const g = mk(tp, 'g', {}); const y = 92 + i * 104;
  mk(g, 'rect', { x: 24, y: y - 44, width: 500, height: 84, rx: 14, fill: C.soft });
  txt(g, 48, y - 6, a, { 'font-size': 18, 'letter-spacing': 1.5, fill: col, 'font-weight': 600 });
  txt(g, 48, y + 26, 'the bag is ' + b, { 'font-family': 'Poppins', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
  mk(g, 'rect', { x: 400, y: y - 16, width: 22, height: 30, rx: 5, fill: BAG, stroke: C.ink, 'stroke-width': 2.5 });
  return g;
});
const tpA = PUC.arrow(tp, VC, 6, 16);
const where = PUC.where($('#wa'), { on: [], type: 'Concept questions on rest and motion, and step one of relative motion problems' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A truck passes a signal post at ${K('t = 0')}, moving at ${K('15\\,\\text{m/s}')}. A box lies ${K('4\\,\\text{m}')} behind its cab. At ${K('t = 2\\,\\text{s}')}, find ${K('x')} of the box (origin at the post) and ${K("x'")} of the post (origin at the cab).`,
  opts: [K('26\\,\\text{m},\\; -30\\,\\text{m}'), K('34\\,\\text{m},\\; +30\\,\\text{m}'), K('26\\,\\text{m},\\; +30\\,\\text{m}'), K('30\\,\\text{m},\\; -26\\,\\text{m}')], right: 0, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [[K(`\\textcolor{${XC}}{x} = \\textcolor{${PC}}{x'} + \\textcolor{${VC}}{V}t`)], [K(`\\text{box: } x = -4 + 15(2)`)], [K(`x = 26\\,\\text{m}`)], [K(`\\text{post: } x' = 0 - 30 = -30\\,\\text{m}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'For'), wt('A2', 'minus'), wt('A2', 'twenty'), wt('A3', 'For')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · reference frames', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${XC}}{x} = \\textcolor{${PC}}{x'} + \\textcolor{${VC}}{V}t`),
    '<b>Frame</b> = origin + positive direction + clock', '<b>Rest and motion are relative</b>: no frame is the true one', '<b>Sign = side</b>: right of O is +, left of O is -'] });
const YQ = ['How can the same bag be at rest and moving at the same time?', 'What three things make a frame of reference?', 'A ball sits 4 m left of your origin. What is its position?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 19', topic: 'Shop and back, displacement zero? Position and Displacement', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSl0 - 0.3, 1.05, 960, 540], [tC0, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const lr = $('#lrC'); lr.style.left = '0px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the ride past the gate */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hk'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hq'), t, tH4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#qr0'), t, wt('H4', 'my') - 0.2, 1e9, { dy: 16 }); M.vis($('#qt0'), t, wt('H4', 'centimetre'), 1e9, POP);
    M.vis($('#qr1'), t, wt('H4', 'Diya') - 0.1, 1e9, { dy: 16 }); M.vis($('#qt1'), t, wt('H4', 'shot'), 1e9, POP);
    M.vis($('#hqP'), t, wt('H5', 'right') - 0.1, 1e9, POP);
  }

  /* P: where from? a frame = 3 things */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    op(pBike, M.clamp((t - tP1 - 0.3) / 0.3)); op(pGate, M.clamp((t - tP1 - 0.4) / 0.3)); op(pTick, M.clamp((t - wt('P3', 'origin') + 0.2) / 0.4));
    op(pB0.g, M.clamp((t - wt('P2', 'gate') + 0.1) / 0.3)); op(pB1.g, M.clamp((t - wt('P2', 'Aarav') + 0.1) / 0.3));
    op(pFlag, M.clamp((t - wt('P3', 'origin')) / 0.3)); op(pO, M.clamp((t - wt('P3', 'origin') - 0.1) / 0.3));
    const u = M.io((t - wt('P4', 'direction') + 0.1) / 0.5); pDir.set(560, PY + 130, 560 + 150 * u, PY + 130); op(pDirL, M.clamp((t - wt('P4', 'direction')) / 0.3));
    attr(pDirL, 'y', PY + 120); attr(pDirL, 'x', 560); pDir.set(560, PY + 136, 560 + 150 * u, PY + 136); attr(pDirL, 'y', PY + 120 - 0);
    op(pClk, M.clamp((t - wt('P4', 'clock')) / 0.3));
    M.vis($('#pr'), t, wt('P3', 'origin') - 0.3, out, { dx: 60, dy: 0, ...o });
    [wt('P3', 'origin'), wt('P4', 'direction'), wt('P4', 'clock')].forEach((tt, i) => M.vis($('#fr' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    M.vis($('#prP'), t, wt('P5', 'frame') - 0.1, 1e9, POP);
  }

  /* S: one ride, two frames */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('L1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const ta = tau(t), x = V * ta;
    // lane 1: gate fixed, bike rides; fade across the re-run jump
    const jumpF = 1 - M.clamp(1 - Math.abs(t - tJump) / 0.25);
    op(L1, M.clamp((t - T0('S2') + 0.1) / 0.35));
    at(bk1, X0 + SC * x, Y1 - 82); op(bk1, jumpF);
    gh1.forEach((gb, k) => { const tg = tau(t - 0.28 * (k + 1)), d = ta - tg; at(gb, X0 + SC * V * tg, Y1 - 82); op(gb, d > 0.02 && d < 1.5 ? [0.3, 0.2, 0.12][k] * jumpF : 0); });
    // lane 2: the bike stays, the ground and gate slide back
    op(L2, M.clamp((t - tLane2) / 0.35));
    const sh = SC * x; attr(dash, 'transform', `translate(${(-(sh % 56)).toFixed(1)},0)`);
    at(g2, X2 - sh, Y2);
    gGh.forEach((gg, k) => { const tg = tau(t - 0.28 * (k + 1)), d = ta - tg; at(gg, X2 - SC * V * tg, Y2); op(gg, t > tJump && d > 0.02 && d < 1.5 ? [0.3, 0.2, 0.12][k] : 0); });
    // slow-mo replay: tag, vectors grow, brackets
    M.vis(tagR, t, tSl0 - 0.1, tC0, POP);
    const vg = M.io((t - tSl0 - 0.2) / 0.6) * (1 - M.clamp((t - tC0) / 0.3)), bx = X0 + SC * x;
    vA1.set(bx + 90, Y1 - 62, bx + 90 + 110 * vg, Y1 - 62); attr(vL1, 'x', (bx + 96).toFixed(1)); attr(vL1, 'y', Y1 - 76); op(vL1, vg);
    const gx = X2 - sh; vA2.set(gx + 24, Y2 - 40, gx + 24 - 0 , Y2 - 40); vA2.set(Math.max(150, gx + 130), Y2 - 40, Math.max(150, gx + 130) - 100 * vg, Y2 - 40);
    attr(vL2, 'x', 150); attr(vL2, 'y', Y2 - 56); op(vL2, vg * (1 - M.clamp((t - tC0) / 0.3)));
    if (vg > 0 && t > tC0 + 0.3) vA2.set(0, 0, 0, 0);
    const b1 = M.clamp((t - wt('S6', 'From') + 0.1) / 0.3) * (1 - M.clamp((t - tC0) / 0.3)); br1.set(X0, X0 + SC * 10, Y1 + 62); op(br1.g, b1);
    op(br2, M.clamp((t - wt('S6', 'Aarav')) / 0.3) * (1 - M.clamp((t - tC0) / 0.3)));
    // readout + graph
    M.setT($('#rot'), ta.toFixed(2)); M.setT($('#rox'), x.toFixed(1)); M.setT($('#rox2'), '0.0');
    [$('#rok2'), $('#rox2'), $('#rou2')].forEach(e => op(e, M.clamp((t - tLane2) / 0.3)));
    const gOn = t >= tA0 - 0.2;
    cvG(s2 => [s2, V * s2], 0, gOn ? ta : 0); dG(ta, x, gOn);
    const pOn2 = t >= tJump; cvP(s2 => [s2, 0], 0, pOn2 ? ta : 0); dP(ta, 0, pOn2);
    op(lgG, M.clamp((t - wt('S7', 'ground')) / 0.3)); op(lgP, M.clamp((t - wt('S7', 'bicycle')) / 0.3));
  }

  /* L: reasoning chain + move the origin */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { M.vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dy: 16 }); if (i < 2) M.vis($('#ld' + i), t, tLk[i + 1] - 0.3, 1e9, { dy: -10 }); });
    M.vis($('#lkP'), t, tLk[3] - 0.1, 1e9, POP);
    M.vis($('#lr'), t, wt('L3', 'origin') - 0.3, out, { dx: 60, dy: 0, ...o });
    const fx = M.lerp(LB - 10 * 28, LB, M.io((t - wt('L3', 'Pick') - 0.1) / 0.9));
    at(lFlag, fx, LY);
    const dist = (LB - fx) / 28; lBr.set(fx, LB, LY + 120); op(lBr.g, dist > 0.2 ? 1 : 0);
    const lc = $('#lrC'); M.vis(lc, t, wt('L3', 'origin'), 1e9, POP); M.setT($('#lrN'), dist.toFixed(dist > 9.95 || dist < 0.05 ? 0 : 1));
    lc.style.left = (Math.max(36, Math.min(748 - lc.offsetWidth, (fx + LB) / 2 - lc.offsetWidth / 2))).toFixed(0) + 'px';
    avA(t, wt('L4', 'relative') + 0.4, out);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const ride = M.io((t - wt('D3', 'Aarav')) / 1.4), ax = DX0 + DS * 15 * ride;
    at(dBike, ax, DY - 82); at(bottle, ax + 60, DY - 82 + 8);
    dBV.set(DX0, ax, DY + 70); op(dBV.g, M.clamp((t - wt('D3', 'V') + 0.1) / 0.3));
    dBP.set(ax, ax + 60, DY + 70); op(dBP.g, M.clamp((t - wt('D2', 'prime') + 0.1) / 0.3));
    dBX.set(DX0, ax + 60, DY + 120); op(dBX.g, M.clamp((t - wt('D4', 'equals') + 0.1) / 0.3));
    avD(t, T0('D5') + 0.2);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Rest') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'frame') + 0.2, 0.8);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tO1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kla .th'), t, tK1 + 0.3, 1e9, { dy: 8 });
    $('#kla').querySelectorAll('.tb').forEach((e, i) => M.vis(e, t, tKl[i] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#klP'), t, wt('K1', 'fifteen') + 0.5, 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kra .th'), t, T0('K2') + 0.2, 1e9, { dy: 8 });
    $('#kra').querySelectorAll('.tb').forEach((e, i) => M.vis(e, t, tKr[i] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#krP'), t, wt('K2', 'Same') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('O1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'moving') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Her') });
  }

  /* O: origin and sign */
  const oOn = t >= tO1 - 0.1 && t < tW1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('W1');
    M.vis($('#ol'), t, tO1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const pu = M.io((t - wt('O2', 'right') + 0.1) / 0.5); oPlus.set(560, OY + 120, 560 + 150 * pu, OY + 120); attr(oPlusL, 'y', OY + 104); op(oPlusL, pu);
    op(oMinL, M.clamp((t - T0('O4')) / 0.3)); attr(oMinL, 'y', OY + 104);
    const dx = dogX(t); at(dog, OX + OS * dx, OY); op(dog, M.clamp((t - wt('O2', 'dog') + 0.1) / 0.3));
    attr(dog, 'transform', `translate(${(OX + OS * dx).toFixed(1)},${OY}) scale(${t > wt('O3', 'moves') - 0.05 && t < wt('O3', 'moves') + 1.6 ? -1 : 1},1)`);
    const oc = $('#olC'); M.vis(oc, t, wt('O2', 'plus') - 0.1, 1e9, POP);
    M.setT($('#olN'), t < wt('O3', 'moves') ? '+3' : t < T0('O4') ? '?' : '-3');
    oc.style.left = Math.max(36, Math.min(748 - oc.offsetWidth, OX + OS * dx - oc.offsetWidth / 2)).toFixed(0) + 'px';
    M.vis($('#or'), t, wt('O1', 'choice') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#or0'), t, wt('O1', 'choice'), 1e9, { dy: 16 }); M.vis($('#or1'), t, wt('O2', 'plus'), 1e9, { dy: 16 }); M.vis($('#or2'), t, T0('O4') + 0.6, 1e9, { dy: 16 });
    M.vis($('#orP'), t, wt('O4', 'sign') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, wt('O3', 'What') - 0.1, wt('O4', 'minus') - 0.1, { dy: 36, ...o });
    th2(t, { tin: wt('O3', 'What') - 0.15, tOpts: wt('O3', 'position') - 0.1, tCount: T1('O3') + 0.05, dur: 3, tAns: T0('O4') - 0.02, tWhy: wt('O4', 'Left') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ta = wtau(t), ax = WX0 + WS * 5 * ta;
    at(wBike, ax, WY - 82); at(wBot, ax + 10 + 4, WY - 82 + 34);
    attr(wBot, 'transform', `translate(${(ax + 14).toFixed(1)},${WY - 30})`);
    wgh.forEach((gb, k) => { const tg = wtau(t - 0.3 * (k + 1)), d = ta - tg; at(gb, WX0 + WS * 5 * tg, WY - 82); op(gb, d > 0.02 && d < 2 ? [0.3, 0.2, 0.12][k] : 0); });
    M.setT(wClock, `t = ${ta.toFixed(1)} s`);
    wBV.set(WX0, WX0 + WS * 30, WY + 72); op(wBV.g, M.clamp((t - tW[2] + 0.1) / 0.3));
    attr(wBP, 'x', (WX0 + WS * 30 - 30).toFixed(1)); attr(wBP, 'y', WY - 110); op(wBP, M.clamp((t - tW[1]) / 0.3));
    wBX.set(WX0, WX0 + WS * 30.5 + 70 - 70, WY + 150); op(wBX.g, M.clamp((t - tW[3] + 0.1) / 0.3));
    const wc = $('#wrC'); M.vis(wc, t, tRide0 - 0.2, 1e9, POP); M.setT($('#wrN'), (0.5 + 5 * ta).toFixed(1));
    wc.style.left = (392 - wc.offsetWidth / 2).toFixed(0) + 'px';
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'ground') - 0.1, tStrike: wt('X3', 'no') - 0.1, tRight: wt('X3', 'true') + 0.2 });
    op(tpRows[0], M.clamp((t - wt('X3', 'gate') + 0.1) / 0.3)); op(tpRows[1], M.clamp((t - wt('X3', 'Aarav') + 0.1) / 0.3));
    const u = M.io((t - wt('X3', 'moves') + 0.05) / 0.4); tpA.set(436, 92, 436 + 70 * u, 92);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + questions + NEXT */
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
