// PUC Chemistry Ep 59: Equilibrium in chemical processes (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: forward reaction orange, backward reaction blue, equal green; H ink, I violet, N teal, D (deuterium) gold
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tF = s => `\\textcolor{${XC}}{${s}}`, tBk = s => `\\textcolor{${BC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tI = s => `\\textcolor{${OC}}{${s}}`;
const H2 = '\\mathrm{H_2}', I2 = tI('\\mathrm{I_2}'), HI = `\\mathrm{H${tI('I')}}`;
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const fillC = (e, c) => { if (e._f !== c) { e._f = c; e.setAttribute('fill', c); } };
const line = (p, col, w = 5) => mk(p, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' });
const setL = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };

Object.assign(M.IC, {
  factory: ['M2 20h20', 'M4 20V9l5 3V9l5 3V9l5 3v8', 'M17 9V4h3v16'],
  heart: ['M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3', 'M12 17h.01'],
  lamp: ['M9 18h6', 'M10 22h4', 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tFc = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tFc, tFc + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['factory', 'Ammonia factory', 'NEVER 100% AMMONIA', 'factory', 'SOME STAY', XC], ['heart', 'Your blood', 'O₂ ON, O₂ OFF', 'Some', 'BOTH WAYS', RD], ['help', 'Halfway done', 'STOPPED OR RUNNING?', 'stay', 'RUNNING?', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'factory') - 0.3, wt('H1', 'never') - 0.1, wt('H1', 'stay') - 0.1];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Ammonia factory: never finishes', 'factory', 'H3'], ['Stopped, or secretly running?', 'secretly', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('lamp', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]) - 0.2);

/* ---------- P: escalator ---------- */
const QR = [['The steps carry you up', 'UP', 'P2', 'steps', XC], ['You walk down, same speed', 'DOWN', 'P2', 'walk', BC], ['You stay in one place', 'STILL', 'P3', 'stay', OK]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS'), EA = [140, 440], EB = [640, 140];
const esc = mk(ps, 'g', {});
mk(esc, 'path', { d: `M${EA[0] - 40} ${EA[1] + 30} L${EB[0] - 40} ${EB[1] + 30} H${EB[0] + 60} M${EA[0] - 100} ${EA[1] + 30} H${EA[0] - 40}`, stroke: C.ink2, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
mk(esc, 'path', { d: `M${EA[0] - 40} ${EA[1] - 70} L${EB[0] - 40} ${EB[1] - 70}`, stroke: C.dim, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const steps = Array.from({ length: 12 }, () => mk(esc, 'rect', { x: -26, y: -8, width: 52, height: 16, rx: 3, fill: '#D5DBE5' }));
const walker = mk(ps, 'g', {}); mk(walker, 'circle', { cx: 0, cy: -78, r: 14, fill: HC }); mk(walker, 'path', { d: 'M0 -62 V-22', stroke: HC, 'stroke-width': 9, 'stroke-linecap': 'round' });
const legA = line(walker, HC, 8), legB = line(walker, HC, 8), armA = line(walker, HC, 6);
const upA = mk(ps, 'g', {}); mk(upA, 'path', { d: 'M470 360 L600 270', stroke: XC, 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(upA, 'path', { d: 'M612 262 L582 268 L596 292 Z', fill: XC }); txt(upA, 560, 360, 'STEPS UP', { 'font-size': 18, fill: XC, 'font-weight': 600 });
const dnA = mk(ps, 'g', {}); mk(dnA, 'path', { d: 'M300 180 L170 270', stroke: BC, 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(dnA, 'path', { d: 'M158 278 L188 272 L174 248 Z', fill: BC }); txt(dnA, 120, 200, 'YOU WALK DOWN', { 'font-size': 18, fill: BC, 'font-weight': 600 });

/* ---------- S: H2 + I2 bench ---------- */
const b = $('#bS');
const flask = mk(b, 'path', { d: 'M110 100 V440 a20 20 0 0 0 20 20 H530 a20 20 0 0 0 20 -20 V100', stroke: C.ink2, 'stroke-width': 4, fill: '#FFF8F2', 'stroke-linecap': 'round' });
const lid = mk(b, 'rect', { x: 98, y: 86, width: 464, height: 16, rx: 6, fill: HC });
const flame = mk(b, 'path', { d: 'M330 520 q-26 -30 0 -54 q26 24 0 54 Z', fill: XC });
const PS = Array.from({ length: 8 }, (_, k) => [180 + (k % 4) * 100, 180 + Math.floor(k / 4) * 170]);
const pairs = PS.map((p, k) => { const g = mk(b, 'g', {}); const ring = mk(g, 'circle', { r: 46, fill: 'none', stroke: XC, 'stroke-width': 4 }); const bl = [line(g, '#9AA3B5', 6), line(g, '#9AA3B5', 6)]; const at = [dot(g, 11, HC), dot(g, 11, HC), dot(g, 16, OC), dot(g, 16, OC)]; return { g, ring, bl, at, p, ph: rnd(k, 3) * 6.283 }; });
// event list: [time, slot, dir] dir +1 forward (H2 + I2 -> 2HI), -1 backward
const EV = []; { const a = T0('S2') + 0.5, s3 = T0('S3'), s4 = wt('S4', 'breaks'), s5 = T0('S5');
  [[a, 0], [a + 1.6, 1], [a + 3.2, 2], [s3 + 0.6, 3], [s3 + 2.4, 4]].forEach(([tt, k]) => EV.push([tt, k, 1]));
  EV.push([s4, 0, -1], [s4 + 2.0, 5, 1], [s5 + 0.2, 6, 1], [s5 + 1.6, 1, -1], [s5 + 1.6, 7, 1]);
  let tt = s5 + 4.4; const back = [2, 0, 3, 5, 4, 6, 1, 7, 0, 2, 3, 5], fw = [0, 2, 1, 3, 5, 4, 6, 0, 1, 2, 3, 4]; for (let i = 0; i < 12; i++) { EV.push([tt, back[i], -1], [tt, fw[i] === back[i] ? (fw[i] + 1) % 8 : fw[i], 1]); tt += 2.2; } }
EV.sort((x, y) => x[0] - y[0]);
const pairState = t => { const st = Array(8).fill(0); let mv = []; for (const [tt, k, d] of EV) { if (t >= tt + 0.6) st[k] = d > 0 ? 1 : 0; else if (t >= tt) mv.push([k, d, (t - tt) / 0.6]); } return { st, mv }; };
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const fL = txt(b, 330, 500, '', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 });
const CN = [[H2, HC], [I2, OC], [HI, HC]];
$('#cnts').innerHTML = CN.map(([k], i) => `<div class="cnt" id="cn${i}" style="left:${36 + i * 244}px"><div class="ck">${K(k)}</div><div class="cv" id="cv${i}"></div></div>`).join('');
const es = $('#eS'), RX0 = 90, RX1 = 720, RYb = 520, RYt = 250;
mk(es, 'line', { x1: RX0, y1: RYt - 20, x2: RX0, y2: RYb, stroke: C.ink2, 'stroke-width': 3 }); mk(es, 'line', { x1: RX0, y1: RYb, x2: RX1, y2: RYb, stroke: C.ink2, 'stroke-width': 3 });
txt(es, RX0 + 12, RYt - 4, 'SPEED', { 'font-size': 18, fill: HC, 'font-weight': 600 }); txt(es, RX1, RYb + 30, 'TIME →', { 'text-anchor': 'end', 'font-size': 18, fill: HC, 'font-weight': 600 });
const rf = x => RYb - 70 - 190 * Math.exp(-x / 120), rb = x => RYb - 70 * (1 - Math.exp(-x / 120));
const rpath = f => { let d = ''; for (let x = 0; x <= RX1 - RX0 - 10; x += 8) d += (d ? ' L' : 'M') + `${RX0 + x} ${f(x).toFixed(1)}`; return d; };
const fPath = mk(es, 'path', { d: rpath(rf), stroke: XC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), bPath = mk(es, 'path', { d: rpath(rb), stroke: BC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const fT = txt(es, 200, 300, 'FORWARD', { 'font-size': 18, fill: XC, 'font-weight': 600 }), bT = txt(es, 400, RYb - 14, 'BACKWARD', { 'font-size': 18, fill: BC, 'font-weight': 600 });
const eqT = txt(es, RX1 - 10, RYb - 90, 'EQUAL', { 'text-anchor': 'end', 'font-size': 22, fill: OK, 'font-weight': 700 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the factory never finishes. It balances!' });

/* ---------- L: words ---------- */
$('#lEq').innerHTML = K(`${H2}(\\mathrm{g}) + ${I2}(\\mathrm{g}) \\;\\rightleftharpoons\\; 2${HI}(\\mathrm{g})`);
const GT = [['\\rightleftharpoons', 'REVERSIBLE', 'RUNS BOTH WAYS', OK, T0('L2') + 0.4], ['r', 'RATE', 'HOW FAST', XC, wt('L3', 'Rate')], ['[\\;\\;]', 'CONCENTRATION', 'HOW CROWDED · mol L⁻¹', BC, wt('L3', 'Concentration')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px;top:210px;height:250px"><div class="gk" style="top:36px">${K(k)}</div><div class="gv" style="color:${c};top:132px">${v}</div><div class="gs" style="top:186px">${s}</div></div>`).join('');
$('#lP').textContent = 'Equilibrium: forward rate = backward rate · concentrations constant';

/* ---------- D: graphs ---------- */
const MS = [['Forward rate starts high, then falls', 'D2', XC], ['Backward rate starts at zero, then rises', 'D3', BC], ['The curves meet: rates equal', 'D4', OK], ['Concentrations level off', 'D5', HC]];
$('#mss').innerHTML = MS.map(([s, , c], i) => `<div class="rl" id="ms${i}" style="top:${96 + i * 100}px"><div class="nn" style="background:${c}">${i + 1}</div><div class="rt2">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const ax = (y0, y1, lab) => { mk(ds, 'line', { x1: 90, y1: y0, x2: 90, y2: y1, stroke: C.ink2, 'stroke-width': 3 }); mk(ds, 'line', { x1: 90, y1, x2: 720, y2: y1, stroke: C.ink2, 'stroke-width': 3 }); txt(ds, 102, y0 + 14, lab, { 'font-size': 16, fill: HC, 'font-weight': 600 }); txt(ds, 720, y1 + 26, 'TIME →', { 'text-anchor': 'end', 'font-size': 16, fill: HC, 'font-weight': 600 }); };
ax(80, 270, 'RATE'); ax(320, 520, 'CONCENTRATION');
const g1 = (f, y1) => { let d = ''; for (let x = 0; x <= 620; x += 8) d += (d ? ' L' : 'M') + `${90 + x} ${f(x, y1).toFixed(1)}`; return d; };
const dF = mk(ds, 'path', { d: g1(x => 270 - 50 - 140 * Math.exp(-x / 110)), stroke: XC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const dB = mk(ds, 'path', { d: g1(x => 270 - 50 * (1 - Math.exp(-x / 110))), stroke: BC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const dMeet = mk(ds, 'line', { x1: 480, y1: 100, x2: 480, y2: 520, stroke: OK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), dMeetT = txt(ds, 490, 112, 'EQUILIBRIUM', { 'font-size': 16, fill: OK, 'font-weight': 600 });
const cR = mk(ds, 'path', { d: g1(x => 520 - 30 - 150 * Math.exp(-x / 110)), stroke: HC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const cP = mk(ds, 'path', { d: g1(x => 520 - 150 * (1 - Math.exp(-x / 110))), stroke: OC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const cRT = txt(ds, 700, 482, 'H₂, I₂ LEFT', { 'text-anchor': 'end', 'font-size': 16, fill: HC, 'font-weight': 600 }), cPT = txt(ds, 700, 356, 'HI MADE', { 'text-anchor': 'end', 'font-size': 16, fill: OC, 'font-weight': 600 });

/* ---------- G: either direction ---------- */
const cgraph = (svg, fromHI) => {
  const g = mk(svg, 'g', {}); mk(g, 'line', { x1: 90, y1: 100, x2: 90, y2: 440, stroke: C.ink2, 'stroke-width': 3 }); mk(g, 'line', { x1: 90, y1: 440, x2: 720, y2: 440, stroke: C.ink2, 'stroke-width': 3 });
  txt(g, 102, 116, 'mol L⁻¹', { 'font-size': 16, fill: HC, 'font-weight': 600 }); txt(g, 720, 468, 'TIME →', { 'text-anchor': 'end', 'font-size': 16, fill: HC, 'font-weight': 600 });
  const Y = v => 440 - v * 150; const f = (a, z) => x => Y(z + (a - z) * Math.exp(-x / 100));
  const hS = fromHI ? 0 : 1, iS = fromHI ? 2 : 0;
  const pr = mk(g, 'path', { d: g1(f(hS, 0.22)), stroke: HC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  const pp = mk(g, 'path', { d: g1(f(iS, 1.56)), stroke: OC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  const l1 = mk(g, 'line', { x1: 90, y1: Y(1.56), x2: 720, y2: Y(1.56), stroke: OK, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), l2 = mk(g, 'line', { x1: 90, y1: Y(0.22), x2: 720, y2: Y(0.22), stroke: OK, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  const a = txt(g, 712, Y(1.56) - 12, 'HI 1.56', { 'text-anchor': 'end', 'font-size': 18, fill: OC, 'font-weight': 600 }), c = txt(g, 712, Y(0.22) - 12, 'H₂ = I₂ 0.22', { 'text-anchor': 'end', 'font-size': 18, fill: HC, 'font-weight': 600 });
  return { g, pr, pp, ends: [l1, l2, a, c] };
};
const gA = cgraph($('#gA'), false), gB = cgraph($('#gS'), true);
['#ga', '#gb'].forEach(id => { const gh = document.createElement('div'); gh.className = 'ghost'; gh.style.cssText = 'right:36px;top:20px'; gh.textContent = 'EXAMPLE FIGURES'; $(id).appendChild(gh); });

/* ---------- R: deuterium ---------- */
const RL = [['Deuterium, D: hydrogen + 1 neutron', 'R2', 'deuterium'], [K(`\\text{Mixture 1: } \\mathrm{N_2, H_2, NH_3}`), 'R3', 'normal'], [K(`\\text{Mixture 2: } \\mathrm{N_2, ${'\\textcolor{' + GC + '}{D_2}'}, N${'\\textcolor{' + GC + '}{D}'}_3}`), 'R3', 'deuterium'], ['Mix the two together', 'R4', 'mixed'], [K(`\\text{New: } \\mathrm{NH_2${'\\textcolor{' + GC + '}{D}'},\\ NH${'\\textcolor{' + GC + '}{D}'}_2,\\ H${'\\textcolor{' + GC + '}{D}'}}`), 'R5', 'found']];
$('#rrs').innerHTML = RL.map(([s], i) => `<div class="rl" id="rl${i}" style="top:${84 + i * 92}px"><div class="nn">${i + 1}</div><div class="rt2">${s}</div></div>`).join('');
const tRl = RL.map(r => wt(r[1], r[2], r[1] === 'R3' && r[2] === 'deuterium' ? 0 : 0) - 0.15);
tRl[1] = wt('R3', 'One') - 0.1; tRl[2] = wt('R3', 'deuterium') - 0.1;
const ks = $('#kS');
const fA = mk(ks, 'path', { d: 'M60 110 V420 a16 16 0 0 0 16 16 H350 a16 16 0 0 0 16 -16 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none' }), fB = mk(ks, 'path', { d: 'M418 110 V420 a16 16 0 0 0 16 16 H708 a16 16 0 0 0 16 -16 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none' });
const fM = mk(ks, 'path', { d: 'M60 110 V420 a16 16 0 0 0 16 16 H708 a16 16 0 0 0 16 -16 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none' });
const fAT = txt(ks, 213, 470, 'WITH H', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }), fBT = txt(ks, 571, 470, 'WITH D', { 'text-anchor': 'middle', 'font-size': 18, fill: GC, 'font-weight': 600 });
const hd = mk(ks, 'g', {});
[[230, 'H', HC, false], [554, 'D', GC, true]].forEach(([x, s, c, n]) => { mk(hd, 'circle', { cx: x, cy: 250, r: 110, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '6 6' }); mk(hd, 'circle', { cx: n ? x - 18 : x, cy: 250, r: 24, fill: RD }); txt(hd, n ? x - 18 : x, 257, 'p', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700 }); if (n) { mk(hd, 'circle', { cx: x + 22, cy: 250, r: 24, fill: '#8A93A6' }); txt(hd, x + 22, 257, 'n', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700 }); } mk(hd, 'circle', { cx: x + 110, cy: 250, r: 10, fill: XC }); txt(hd, x, 410, s === 'H' ? 'HYDROGEN, H' : 'DEUTERIUM, D', { 'text-anchor': 'middle', 'font-size': 20, fill: c, 'font-weight': 600 }); txt(hd, x, 440, s === 'H' ? 'MASS 1' : 'MASS 2: HEAVY TWIN', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); });
const fMT = txt(ks, 392, 470, 'MIXED: H AND D SWAP', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 });
// ammonia molecules: N centre + 3 H/D; hydrogen molecules: 2 atoms
const AM = Array.from({ length: 6 }, (_, i) => { const g = mk(ks, 'g', {}); const hs = [0, 1, 2].map(() => { const l = line(g, '#9AA3B5', 5); const a = dot(g, 10, HC); return { l, a }; }); const n = dot(g, 16, NC); return { g, hs, n, d: i >= 3, A: [120 + (i % 3) * 90, 180 + (i % 2) * 40], B: [i < 3 ? 140 + i * 130 : 220 + (i - 3) * 160, i < 3 ? 190 : 330], ph: rnd(i, 2) * 6.28 }; });
AM.forEach((m, i) => { if (m.d) m.A = [480 + ((i - 3) % 3) * 90, 180 + (i % 2) * 40]; });
const HM = Array.from({ length: 4 }, (_, i) => { const g = mk(ks, 'g', {}); const l = line(g, '#9AA3B5', 5); const a = [dot(g, 10, HC), dot(g, 10, HC)]; return { g, l, a, d: i >= 2, A: [i < 2 ? 140 + i * 110 : 500 + (i - 2) * 110, 340], B: [180 + i * 140, 400], ph: rnd(i, 4) * 6.28 }; });
// swap events after R5 start: [molecule type a, index, atom], with partner
const SWP = [[0, 0, 3, 1], [1, 2, 4, 0], [0, 2, 5, 2], [2, 1, 3, 2]]; // [ammonia i, atom k, ammonia j, atom l] (index 2 in first slot may be H2 molecule marker below)
const DC = GC;

/* ---------- C: stopped vs dynamic ---------- */
const eqr = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${tex}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqr('ca0', 84, '<span style="font:500 26px Poppins">Molecules: no change</span>', 'FROZEN', RD) + eqr('ca1', 172, '<span style="font:500 26px Poppins">Amounts: constant</span>', 'SAME', C.mute);
$('#cfr').innerHTML = eqr('cf0', 84, '<span style="font:500 26px Poppins">Molecules: keep changing</span>', 'BUSY', OK) + eqr('cf1', 172, '<span style="font:500 26px Poppins">Amounts: constant</span>', 'SAME', C.mute);
const miniPairs = (p, live) => [0, 1, 2].map(k => { const g = mk(p, 'g', {}); const bl = [line(g, '#9AA3B5', 5), line(g, '#9AA3B5', 5)]; const at = [dot(g, 9, HC), dot(g, 9, HC), dot(g, 13, OC), dot(g, 13, OC)]; return { g, bl, at, c: [250 + k * 140, 320], live, k }; });
const mpA = miniPairs($('#caS'), false), mpB = miniPairs($('#cfS'), true);
$('#caV').innerHTML = K(`r = 0`).replace('r', 'r'); $('#caV').innerHTML = `<span style="color:${RD}">${K('r = 0')}</span><span style="font:600 22px 'IBM Plex Mono';color:${C.mute}">NOT REAL</span>`;
$('#cfV').innerHTML = `<span>${K(`${tF('r_f')} = ${tBk('r_b')}`)}</span><span style="font:600 22px 'IBM Plex Mono';color:${OK}">DYNAMIC</span>`;
$('#caV').style.top = $('#cfV').style.top = '410px';
const th1 = PUC.think($('#th1'), { q: 'At equilibrium, is the rate of the forward reaction zero?', opts: ['Yes, zero', 'No'], right: 1, why: 'No. It is not zero. It equals the backward rate.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tF('r_{\\text{forward}}')} = ${tBk('r_{\\text{backward}}')} \\neq 0`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${H2}\\ \\text{used} = 1 - 0.22 = 0.78`)],
  [K(`[${I2}] = 1 - 0.78 = 0.22`)],
  [K(`[${HI}] = 2 \\times 0.78 = ${tO('1.56')}\\ \\text{mol L}^{-1}`)],
  ['All three present: nothing ran out']], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WB0 = 430, WS = 150;
mk(ws, 'line', { x1: 80, y1: WB0, x2: 700, y2: WB0, stroke: C.ink2, 'stroke-width': 3 });
const wbar = (x, col, lab) => { const r = mk(ws, 'rect', { x: x - 60, y: WB0, width: 120, height: 0, rx: 8, fill: col }); txt(ws, x, WB0 + 34, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); const v = txt(ws, x, WB0 - 14, '', { 'text-anchor': 'middle', 'font-size': 26, fill: col, 'font-weight': 600 }); return { r, v }; };
const WBs = [wbar(190, HC, 'H₂'), wbar(390, OC, 'I₂'), wbar(590, OC, 'HI')];
attr(WBs[2].r, 'fill', '#9B7BE8');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'At equilibrium, [reactants] = [products]', right: 'Rates equal. Concentrations constant, not equal' });
const tsv = $('#tS');
const tq1 = txt(tsv, 220, 110, '[H₂] = 0.22', { 'font-size': 28, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 220, 160, '[HI] = 1.56', { 'font-size': 28, fill: OC, 'font-weight': 600 }), tq3 = txt(tsv, 220, 216, 'constant, not equal', { 'font-size': 22, fill: OK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Meaning of dynamic equilibrium, the deuterium (isotope) proof, and rates at equilibrium' });
const U = '\\ \\text{mol L}^{-1}\\text{s}^{-1}';
const OPT = ['0', '0.010', '0.020', '0.040'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K(`${H2} + ${I2} \\rightleftharpoons 2${HI}`)} at equilibrium. The forward reaction makes HI at 0.020 mol L⁻¹ s⁻¹. How fast does the backward reaction make H₂?`, qW: 780,
  opts: OPT.map(s => K(s + U)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 28 });
const so = PUC.solution($('#so'), [[K(`${HI}\\ \\text{breaks at } 0.020`)], [K(`2${HI} \\rightarrow 1\\,${H2}`)], [K(`0.020 \\div 2 = ${tO('0.010')}`)], ['A thought it stopped']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'thought') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Equilibrium in chemical processes', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${H2} + ${I2} \\rightleftharpoons 2${HI}`), K(`\\text{Equilibrium: } ${tF('r_{\\text{forward}}')} = ${tBk('r_{\\text{backward}}')} \\neq 0`),
    '<b>Concentrations</b> stay constant, but are usually not equal',
    '<b>Either direction</b>: from H₂ + I₂ or from HI alone, same mixture',
    '<b>Deuterium test</b>: NH₂D, NHD₂, HD appear, so it never stops'] });
const YQ = ['What is equal at chemical equilibrium?', 'How did deuterium prove the reaction never stops?', 'Can equilibrium be reached starting from the products?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 60', topic: 'One number for any mixture? Law of Chemical Equilibrium', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S6') - 0.2, 1.05, 960, 560], [T1('S6') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 110; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rl .rt2').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 600 / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
// pair drawing: s = 0 (H-H + I-I) .. 1 (two H-I)
const drawPair = (P, cx, cy, s, sc = 1) => {
  const R = [[cx - 30 * sc, cy - 14 * sc], [cx - 30 * sc, cy + 14 * sc], [cx + 30 * sc, cy - 16 * sc], [cx + 30 * sc, cy + 16 * sc]];
  const Q = [[cx - 18 * sc, cy - 26 * sc], [cx - 18 * sc, cy + 26 * sc], [cx + 18 * sc, cy - 26 * sc], [cx + 18 * sc, cy + 26 * sc]];
  const pts = R.map((r, i) => [M.lerp(r[0], Q[i][0], s), M.lerp(r[1], Q[i][1], s)]);
  pts.forEach((p, i) => pos(P.at[i], p[0], p[1]));
  if (s < 0.5) { setL(P.bl[0], ...pts[0], ...pts[1]); setL(P.bl[1], ...pts[2], ...pts[3]); } else { setL(P.bl[0], ...pts[0], ...pts[2]); setL(P.bl[1], ...pts[1], ...pts[3]); }
  P.bl.forEach(l => { l.style.opacity = (Math.abs(s - 0.5) * 2).toFixed(2); });
};

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
    const tBd = [T0('H2') + 0.4, wt('H2', 'Both'), T0('H3') - 0.2];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H4', 'stopped') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'heavy') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T0('P4') + 0.3; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'escalator') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(esc, t, wt('P1', 'escalator'));
    const sp = (t * 0.12) % 1;
    steps.forEach((s, i) => { const u = (i / 12 + sp) % 1; const x = M.lerp(EA[0] - 40, EB[0] - 40, u), y = M.lerp(EA[1] + 22, EB[1] + 22, u); attr(s, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); });
    const wx = M.lerp(EA[0], EB[0], 0.48) - 40, wy = M.lerp(EA[1], EB[1], 0.48) + 14; attr(walker, 'transform', `translate(${wx.toFixed(1)},${wy.toFixed(1)})`);
    const lg = Math.sin(t * 7) * 14; setL(legA, 0, -22, lg, 0); setL(legB, 0, -22, -lg, 0); setL(armA, 0, -54, -lg * 0.8, -32);
    fade(walker, t, wt('P2', 'walk') - 0.3); fade(upA, t, wt('P2', 'steps')); fade(dnA, t, wt('P2', 'walk'));
    M.vis($('#pP'), t, wt('P4', 'same') - 0.2, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    [flask, lid].forEach(e => fade(e, t, wt('S1', 'closed') - 0.2)); fade(flame, t, wt('S1', 'heat')); attr(flame, 'transform', `translate(0,${(3 * Math.sin(t * 9)).toFixed(1)}) scale(1,${(1 + 0.06 * Math.sin(t * 13)).toFixed(3)})`); flame.style.transformOrigin = '330px 520px';
    const st = pairState(t);
    pairs.forEach((P, k) => {
      const cx = P.p[0] + 10 * Math.sin(t * 1.3 + P.ph), cy = P.p[1] + 8 * Math.cos(t * 1.1 + P.ph);
      const m = st.mv.find(v => v[0] === k); let s = st.st[k], ring = 0, rc = XC;
      if (m) { const u = M.io(M.clamp(m[2])); s = m[1] > 0 ? u : 1 - u; ring = Math.sin(M.clamp(m[2]) * Math.PI); rc = m[1] > 0 ? XC : BC; }
      drawPair(P, cx, cy, s); pos(P.ring, cx, cy); P.ring.style.opacity = ring.toFixed(2); attr(P.ring, 'stroke', rc);
      fade(P.g, t, wt('S1', 'hydrogen') + k * 0.06, 1e9, 0.2);
    });
    const nP = st.st.reduce((a, v) => a + v, 0);
    [8 - nP, 8 - nP, 2 * nP].forEach((v, i) => { M.setT($('#cv' + i), String(v)); $('#cv' + i).style.color = CN[i][1]; M.vis($('#cn' + i), t, T0('S2') + i * 0.12, 1e9, { dy: 16 }); });
    const TAG = [[tS1 + 0.3, 'H₂ + I₂ · HEATED'], [T0('S2') + 0.3, 'FORWARD: MAKES HI'], [T0('S4'), 'BACKWARD: HI BREAKS UP'], [T0('S5'), 'SPEEDS CHANGING'], [wt('S6', 'equal'), 'EQUILIBRIUM']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    // rate graph grows with the bench clock
    const g0 = T0('S2'), g1e = wt('S6', 'equal') + 1;
    const gu = M.clamp((t - g0) / (g1e - g0)); M.drawU(fPath, gu); fade(fT, t, g0 + 0.3);
    const bu = M.clamp((t - g0) / (g1e - g0)); M.drawU(bPath, t < T0('S4') ? Math.min(bu, 0.3) : bu); fade(bT, t, T0('S4'));
    fade(eqT, t, wt('S6', 'equal'));
    avA(t, T1('S6') - 0.6, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    PUC.write($('#lEq'), t, wt('L1', 'H') - 0.1, 2.2);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.4, 1e9, { dy: 24 }); const on = M.io((t - g[4] + 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4] + 0.3) / 0.3) : 1 - M.io((t - T0('L4')) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#lP'), t, wt('L4', 'equals') - 0.2, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const el = $('#ms' + i); M.vis(el, t, tMs[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tMs[i + 1] : T1('D5') + 0.3; const on = M.io((t - tMs[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rr'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.draw(dF, t, tMs[0], 2.5); M.draw(dB, t, tMs[1], 2.5); fade(dMeet, t, tMs[2]); fade(dMeetT, t, tMs[2] + 0.2);
    M.draw(cR, t, tMs[3], 2.0); M.draw(cP, t, tMs[3] + 0.3, 2.0); fade(cRT, t, tMs[3] + 1.6); fade(cPT, t, tMs[3] + 1.8);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('R1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.draw(gA.pr, t, tG1 + 0.4, 1.6); M.draw(gA.pp, t, tG1 + 0.6, 1.6); gA.ends.forEach(e => fade(e, t, tG1 + 2.0));
    M.vis($('#gb'), t, T0('G2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tb = T0('G3'); M.draw(gB.pp, t, tb, 2.2); M.draw(gB.pr, t, tb + 0.2, 2.2); gB.ends.forEach(e => fade(e, t, wt('G4', 'same') - 0.2));
    M.vis($('#gP'), t, wt('G4', 'either') - 0.2, 1e9, POP);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('C1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RL.forEach((_, i) => { const el = $('#rl' + i); M.vis(el, t, tRl[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tRl[i + 1] : T1('R6') + 0.3; const on = M.io((t - tRl[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rb'), t, wt('R2', 'deuterium') - 0.1, z, { dx: 60, dy: 0, ...o }); fade(hd, t, wt('R2', 'deuterium') + 0.2, tRl[1] - 0.2);
    const tMix = wt('R4', 'mixed'), mu = M.io((t - tMix) / 1.2), tSw0 = wt('R5', 'found');
    fade(fA, t, tRl[1], tMix); fade(fB, t, tRl[2], tMix); fade(fM, t, tMix + 0.2); fade(fAT, t, tRl[1], tMix); fade(fBT, t, tRl[2], tMix); fade(fMT, t, tSw0);
    // swaps: k-th swap exchanges one H of ammonia a with one D of ammonia b (or hydrogen molecules)
    const swaps = [[0, 0, 3, 0], [4, 1, 1, 1], [2, 2, 5, 2], [3, 1, 2, 0]], hsw = [[0, 1, 2, 0]];
    const nS = t < tSw0 ? 0 : Math.min(4, 1 + Math.floor((t - tSw0) / 1.3)), hS = t > wt('R5', 'gas') ? 1 : 0;
    AM.forEach((m, i) => {
      const [ax0, ay0] = m.A, [bx0, by0] = m.B; const cx = M.lerp(ax0, bx0, mu) + 6 * Math.sin(t * 1.5 + m.ph), cy = M.lerp(ay0, by0, mu) + 5 * Math.cos(t * 1.3 + m.ph);
      pos(m.n, cx, cy);
      m.hs.forEach((h, k) => { const an = (k * 120 + 30 + 20 * Math.sin(t + m.ph)) * Math.PI / 180, x = cx + 26 * Math.cos(an), y = cy + 26 * Math.sin(an); pos(h.a, x, y); setL(h.l, cx, cy, x, y);
        let isD = m.d; swaps.slice(0, nS).forEach(([a, ka, bb, kb]) => { if (a === i && ka === k) isD = AM[bb].d; if (bb === i && kb === k) isD = AM[a].d; });
        fillC(h.a, isD ? DC : HC); attr(h.a, 'r', isD ? 12 : 10); });
      fade(m.g, t, m.d ? tRl[2] : tRl[1], 1e9, 0.3);
    });
    HM.forEach((m, i) => {
      const cx = M.lerp(m.A[0], m.B[0], mu) + 6 * Math.sin(t * 1.4 + m.ph), cy = M.lerp(m.A[1], m.B[1], mu) + 5 * Math.cos(t * 1.2 + m.ph);
      const p1 = [cx - 14, cy], p2 = [cx + 14, cy]; pos(m.a[0], ...p1); pos(m.a[1], ...p2); setL(m.l, ...p1, ...p2);
      m.a.forEach((a, k) => { let isD = m.d; if (hS && ((i === 0 && k === 1) || (i === 2 && k === 0))) isD = !m.d; fillC(a, isD ? DC : HC); attr(a, 'r', isD ? 12 : 10); });
      fade(m.g, t, m.d ? tRl[2] : tRl[1], 1e9, 0.3);
    });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'stopped') + 0.2, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'changes') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, wt('C1', 'equilibrium') - 0.3, zc, { dx: 60, dy: 0, ...o });
    M.vis($('#cf0'), t, wt('C1', 'keep') - 0.1, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C1', 'amounts') - 0.1, 1e9, { dy: 16 });
    [mpA, mpB].forEach((arr, j) => arr.forEach(P => { let s = P.k === 1 ? 1 : 0; if (P.live) { const c = (t * 0.5 + P.k * 0.33) % 1; s = c < 0.5 ? M.io(c * 2) : 1 - M.io((c - 0.5) * 2); s = P.k === 1 ? 1 - s : s; } drawPair(P, P.c[0], P.c[1], s, 0.8); fade(P.g, t, j ? wt('C1', 'keep') : wt('C1', 'stopped') + 0.3); }));
    M.vis($('#caV'), t, wt('C1', 'changes') + 0.3, 1e9, { dy: 16 }); M.vis($('#cfV'), t, T1('C1') - 0.4, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'At') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'not') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'forward') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Equal') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'zero') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - T0('W3') - 0.5) / 1.0), u2 = M.io((t - T0('W4') - 0.3) / 1.0), u3 = M.io((t - T0('W5') - 0.5) / 1.0);
    const vals = [M.lerp(1, 0.22, u1), M.lerp(1, 0.22, u2), M.lerp(0, 1.56, u3)];
    WBs.forEach((w, i) => { const h = WS * vals[i]; attr(w.r, 'y', (WB0 - h).toFixed(1)); attr(w.r, 'height', h.toFixed(1)); attr(w.v, 'y', (WB0 - h - 14).toFixed(1)); M.setT(w.v, vals[i].toFixed(2)); fade(w.r, t, T0('W2') + 0.8 + i * 0.15); fade(w.v, t, T0('W2') + 0.8 + i * 0.15); });
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'reactants') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'rates') - 0.2 });
    fade(tq1, t, wt('X3', 'concentrations') - 0.2); fade(tq2, t, wt('X3', 'concentrations') + 0.2); fade(tq3, t, wt('X3', 'usually') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tFc; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tFc; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tFc + 0.1, tout: tY - 0.3, tLines: [tFc + 0.4, tFc + 0.8, tFc + 1.2, tFc + 1.6, tFc + 2.0], tShot: wt('F1', 'Screenshot') });
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
