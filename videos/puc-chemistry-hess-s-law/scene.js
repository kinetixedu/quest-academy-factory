// PUC Chemistry Ep 55: Hess's law (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: ΔH symbol gold, heat out (negative) green, heat in (positive) red, the unknown step x orange, C teal, O violet, H ink, S gold-free ink
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tG = s => `\\textcolor{${GC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`;
const dH = tG('\\Delta_r H');
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const level = (p, x1, x2, y, lab, col = HC) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1, y1: y, x2, y2: y, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }); txt(g, x1, y - 12, lab, { 'font-size': 20, fill: col, 'font-weight': 600 }); return g; };
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const head2 = (p, x1, y1, x2, y2, col) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 20, W = 12; return mk(p, 'path', { d: `M${x2} ${y2} L${(x2 - L * Math.cos(a) + W * Math.sin(a)).toFixed(1)} ${(y2 - L * Math.sin(a) - W * Math.cos(a)).toFixed(1)} L${(x2 - L * Math.cos(a) - W * Math.sin(a)).toFixed(1)} ${(y2 - L * Math.sin(a) + W * Math.cos(a)).toFixed(1)} Z`, fill: col }); };
const box = (p, x, y, w, s, col) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x - w / 2, y: y - 30, width: w, height: 60, rx: 12, fill: '#fff', stroke: col, 'stroke-width': 3 }); txt(g, x, y + 8, s, { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 }); return g; };
const along = (path, u) => { const L = path.getTotalLength(), p = path.getPointAtLength(L * M.clamp(u)); return [p.x, p.y]; };

Object.assign(M.IC, {
  stairs: ['M4 20h4v-4h4v-4h4V8h4', 'M4 20v-2', 'M20 8V4'],
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6h2l3 11.5', 'M5.5 17.5 9 9h6l-4 8.5', 'M9 9 7.5 6H6'],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  scroll: ['M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4', 'M19 17V5a2 2 0 0 0-2-2H4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['stairs', 'Lift or stairs', 'SAME FLOOR', 'lift', 'SAME', NC], ['coin', '100 or 50 + 50', 'SAME TOTAL', 'hundred', 'SAME', NC], ['bike', 'Any hill road', 'SAME HEIGHT', 'road', 'SAME', NC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'lift'), wt('H1', 'hundred'), wt('H2', 'road') - 0.6];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Straight road: short but steep', 'steep', 'H3'], ['Same height gained either way', 'same', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('mountain', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: the CO problem ---------- */
const QR = [['Plenty of O₂: only CO₂', 'EASY', 'P1', 'plenty', OK], ['A little O₂: CO and CO₂ mixed', 'MIXED', 'P2', 'little', RD], ['Heat for pure CO: no direct way', 'CANNOT', 'P3', 'cannot', RD], ['So we take another road', 'ROAD 2', 'P3', 'road', NC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const mol = (p, x, y, co2) => { const g = mk(p, 'g', {}); const xs = co2 ? [-34, 0, 34] : [-17, 17]; mk(g, 'line', { x1: x + xs[0], y1: y, x2: x + xs[xs.length - 1], y2: y, stroke: HC, 'stroke-width': 5 }); xs.forEach((dx, i) => atom(g, x + dx, y, 15, (co2 ? i === 1 : i === 0) ? NC : OC, (co2 ? i === 1 : i === 0) ? 'C' : 'O', 14)); return g; };
const jar = (x, lab, sub, col) => { const g = mk(ps, 'g', {}); mk(g, 'path', { d: `M${x} 120 V400 a20 20 0 0 0 20 20 H${x + 260} a20 20 0 0 0 20 -20 V120`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); txt(g, x + 140, 100, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }); const s = txt(g, x + 140, 470, sub, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 600 }); return { g, s }; };
const jA = jar(70, 'PLENTY OF O₂', 'CO₂ ONLY', OK), jB = jar(434, 'A LITTLE O₂', 'CO + CO₂ MIXED', RD);
const mA = [[150, 190], [270, 260], [170, 340]].map(([x, y]) => mol(ps, x, y, true));
const mB = [[520, 190, false], [640, 250, true], [530, 330, false], [640, 370, false]].map(([x, y, c]) => mol(ps, x, y, c));

/* ---------- S: two roads (cycle + ladder) ---------- */
const b = $('#bS');
const bA = box(b, 392, 110, 380, 'C(graphite) + O₂(g)', HC), bB = box(b, 600, 290, 280, 'CO(g) + ½O₂(g)', XC), bC = box(b, 330, 460, 200, 'CO₂(g)', HC);
const r1 = mk(b, 'path', { d: 'M300 142 L320 426', stroke: C.ink2, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), r1h = head2(b, 300, 142, 321, 430, C.ink2);
const r2a = mk(b, 'path', { d: 'M470 142 L566 256', stroke: XC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 8' }), r2ah = head2(b, 470, 142, 570, 260, XC);
const r2b = mk(b, 'path', { d: 'M560 322 L436 446', stroke: NC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), r2bh = head2(b, 560, 322, 432, 450, NC);
const r1t = txt(b, 120, 300, 'ROAD 1: -393.5', { 'font-size': 22, fill: OK, 'font-weight': 600 });
const r2at = txt(b, 548, 180, 'x = ?', { 'font-size': 24, fill: XC, 'font-weight': 600 }), r2bt = txt(b, 520, 420, '-283.0', { 'font-size': 24, fill: OK, 'font-weight': 600 });
const bike = mk(b, 'circle', { r: 11, fill: XC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), EK = 0.85, EY0 = 120, EYm = EY0 + 110.5 * EK, EY1 = EY0 + 393.5 * EK;
const eTop = level(es, 80, 704, EY0, 'C(graphite) + O₂(g) · 0'), eMid = level(es, 420, 704, EYm, 'CO(g) + ½O₂(g)', XC), eBot = level(es, 80, 704, EY1, 'CO₂(g)');
const [e1, e1h] = varrow(es, 200, EY0 + 6, EY1 - 4, OK), e1t = txt(es, 220, (EY0 + EY1) / 2 + 8, '-393.5', { 'font-size': 30, fill: OK, 'font-weight': 600 });
const [e2, e2h] = varrow(es, 660, EY0 + 6, EYm - 4, XC), e2t = txt(es, 680, (EY0 + EYm) / 2 + 22, 'x', { 'font-size': 26, fill: XC, 'font-weight': 600 });
const [e3, e3h] = varrow(es, 560, EYm + 6, EY1 - 4, OK), e3t = txt(es, 540, (EYm + EY1) / 2 + 8, '-283.0', { 'font-size': 26, fill: OK, 'font-weight': 600, 'text-anchor': 'end' });
const eSame = txt(es, 392, EY1 + 56, 'SAME START · SAME END · SAME DROP', { 'font-size': 20, fill: GC, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- L: the law + hill ---------- */
$('#hcI').innerHTML = M.icon('scroll', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${dH} = ${dH}_1 + ${dH}_2 + ${dH}_3 + \\dots`);
const hs = $('#hS');
const hill = mk(hs, 'path', { d: 'M40 470 C160 470 180 130 300 130 C420 130 560 470 744 470 Z', fill: '#EEF7F4', stroke: C.dim, 'stroke-width': 2 });
const hStr = mk(hs, 'path', { d: 'M300 130 L640 452', stroke: C.ink2, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const hWin = mk(hs, 'path', { d: 'M300 130 C420 160 330 220 440 250 C560 280 380 330 520 370 C620 400 560 440 640 452', stroke: NC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 8' });
const hS1 = atom(hs, 300, 130, 12, HC, ''), hS2 = atom(hs, 640, 452, 12, HC, '');
const hT1 = txt(hs, 300, 104, 'START', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }), hT2 = txt(hs, 640, 500, 'END', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
const [hA, hAh] = varrow(hs, 720, 136, 446, GC), hAt = txt(hs, 704, 300, 'ΔH', { 'font-size': 26, fill: GC, 'font-weight': 600, 'text-anchor': 'end' });
const hDot = mk(hs, 'circle', { r: 11, fill: XC });

/* ---------- D: solve x + rules ---------- */
const MS = [[K(`-393.5 = ${tX('x')} + (-283.0)`), 'D2'], [K(`${tX('x')} = -393.5 + 283.0`), 'D3'], [K(`${tX('x')} = ${tO('-110.5')}\\ \\text{kJ mol}^{-1}`), 'D4']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${110 + i * 110}px"><div class="sn">${i + 1}</div><div class="stx" style="font-size:36px">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
$('#dP').innerHTML = `${K('\\mathrm{C(graphite)} + \\tfrac{1}{2}\\mathrm{O_2} \\rightarrow \\mathrm{CO(g)}')}&nbsp; ΔH = -110.5`;
const RL = [['Flip it: flip the sign', K(`\\mathrm{A \\rightarrow B}:\\ ${dH} \\;\\Rightarrow\\; \\mathrm{B \\rightarrow A}:\\ -${dH}`), 'R2'], ['Multiply by 2: ΔH doubles', K(`\\times 2 \\;\\Rightarrow\\; 2\\,${dH}`), 'R3'], ['Add equations: add ΔH', K(`${dH}_1 + ${dH}_2`), 'R4'], ['Write every state', K('\\mathrm{(s)},\\ \\mathrm{(l)},\\ \\mathrm{(g)}'), 'R4']];
$('#rls').innerHTML = RL.map(([a, k], i) => `<div class="rule" id="rl${i}" style="top:${84 + i * 114}px"><div class="nn">${i < 3 ? i + 1 : '+'}</div><div class="rt">${a}</div><div class="rk">${k}</div></div>`).join('');
const tRl = [T0('R2'), T0('R3'), T0('R4'), wt('R4', 'Write')];

/* ---------- C: compare roads ---------- */
const eqrow = (host, id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqrow('', 'ca0', 96, '\\mathrm{C} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2}', '-393.5', OK);
$('#cfr').innerHTML = eqrow('', 'cf0', 96, '\\mathrm{C} + \\tfrac{1}{2}\\mathrm{O_2} \\rightarrow \\mathrm{CO}', '-110.5', XC) + eqrow('', 'cf1', 190, '\\mathrm{CO} + \\tfrac{1}{2}\\mathrm{O_2} \\rightarrow \\mathrm{CO_2}', '-283.0', OK);
const cdA = $('#caS'), cdB = $('#cfS');
const [ca1, ca1h] = varrow(cdA, 392, 200, 380, OK), ca1t = txt(cdA, 416, 300, '-393.5', { 'font-size': 26, fill: OK, 'font-weight': 600 });
const [cb1, cb1h] = varrow(cdB, 392, 290, 290 + 110.5 * 0.46, XC), cb1t = txt(cdB, 416, 326, '-110.5', { 'font-size': 22, fill: XC, 'font-weight': 600 });
const [cb2, cb2h] = varrow(cdB, 392, 290 + 110.5 * 0.46 + 4, 380, OK), cb2t = txt(cdB, 416, 362, '-283.0', { 'font-size': 22, fill: OK, 'font-weight': 600 });
$('#caV').innerHTML = `<span>Total</span><span style="color:${OK}">-393.5 kJ</span>`;
$('#cfV').innerHTML = `<span>-110.5 + (-283.0) =</span><span style="color:${OK}">-393.5 kJ</span>`;
const th1 = PUC.think($('#th1'), { q: 'Road one has one step. Road two has two steps. Which road gives out more heat in total?', opts: ['Road two', 'Neither: the same'], right: 1, why: 'Neither. Both give -393.5 kJ. The road changes, the total does not.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${dH} = ${dH}_1 + ${dH}_2 + \\dots \\qquad -393.5 = ${tX('-110.5')} + (-283.0)`);

/* ---------- W: methane formation ---------- */
const wsol = PUC.solution($('#wl'), [
  [K('\\text{Keep (1): } -393.5')],
  [K('\\text{Double (2): } 2 \\times (-285.8) = -571.6')],
  [K(`\\text{Flip (3): } ${tR('+890.3')}`)],
  [K(`-393.5 - 571.6 + 890.3 = ${tO('-74.8')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W4') - 0.3, wt('W4', 'Double'), T0('W5'), T0('W6')];
const WR = [['\\mathrm{C} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2}', '-393.5', 'KEEP: -393.5', wt('W3', 'Carbon'), T0('W4')], ['\\mathrm{H_2} + \\tfrac{1}{2}\\mathrm{O_2} \\rightarrow \\mathrm{H_2O(l)}', '-285.8', '× 2: -571.6', wt('W3', 'Hydrogen'), wt('W4', 'Double')], ['\\mathrm{CH_4} + 2\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\mathrm{H_2O(l)}', '-890.3', 'FLIP: +890.3', wt('W3', 'Methane'), wt('W5', 'Flip')]];
$('#wrs').innerHTML = WR.map(([e, a], i) => eqrow('', 'wr' + i, 84 + i * 92, e, a, i === 2 ? OK : OK)).join('') + eqrow('', 'wr3', 360, `\\mathrm{C} + 2\\mathrm{H_2} \\rightarrow \\mathrm{CH_4}`, '-74.8', OK);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Flip methane's burning but keep ${K('-890.3')}`, right: `Flip the equation, flip the sign: ${K(tR('+890.3'))}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'A → B   -890.3', { 'font-size': 28, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 60, 180, 'B → A   +890.3', { 'font-size': 28, fill: RD, 'font-weight': 600 });
const tq3 = txt(tsv, 360, 150, '× 2 → 2 × ΔH', { 'font-size': 24, fill: GC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'State the law, or combine two or three equations to find an unknown ΔH' });
const OPT = ['-495', '-99', '-396', '+396'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'S(s) + O₂ → SO₂: ΔH = -297 kJ. 2SO₂ + O₂ → 2SO₃: ΔH = -198 kJ. Find ΔH for S(s) + 3/2 O₂ → SO₃(g).', qW: 940,
  opts: OPT.map(s => K(`${s}\\ \\text{kJ}`)), right: 2, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K('\\text{Halve (2): } -198 \\div 2 = -99')], [K('\\text{Add (1): } -297 + (-99)')], [K(`= ${tO('-396')}\\ \\text{kJ}`)], ['A forgot to halve']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A4', 'Minus'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: "Recap · Hess's law", y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${dH} = ${dH}_1 + ${dH}_2 + ${dH}_3 + \\dots`), '<b>Why</b>: H is a state function. Only the start and the end matter', '<b>Flip</b>: flip the sign · <b>× n</b>: n × ΔH · <b>add</b>: add the ΔH values', '<b>C → CO</b>: -393.5 - (-283.0) = -110.5 kJ mol⁻¹', '<b>CH₄ formation</b>: -393.5 - 571.6 + 890.3 = -74.8 kJ mol⁻¹'] });
const YQ = ["State Hess's law in one sentence.", "Why can't we measure the heat of making CO directly?", 'What happens to ΔH when you flip an equation?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 56', topic: 'Ice takes heat in, yet melts on its own? Entropy', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 70, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Any road down, same drop. Like my ride!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3') - 0.2, 1.08, 1368, 560], [T1('L3') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}

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
    const tB = [wt('H2', 'road'), wt('H2', 'start'), wt('H2', 'end')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'decide') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'heat') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P3') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'carbon', 1) - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(jA.g, t, wt('P1', 'carbon', 1)); mA.forEach((m, i) => fade(m, t, wt('P1', 'dioxide') + i * 0.2));
    fade(jB.g, t, wt('P2', 'little')); mB.forEach((m, i) => fade(m, t, wt('P2', 'mix') + i * 0.2));
  }

  /* S: two roads */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(bA, t, wt('S1', 'top')); const t1 = wt('S2', 'Road'), t2 = wt('S3', 'carbon'), t3 = wt('S4', 'burns');
    fade(bC, t, wt('S2', 'dioxide')); M.draw(r1, t, t1, 1.0); fade(r1h, t, t1 + 0.9); fade(r1t, t, wt('S2', 'Minus'));
    fade(bB, t, t2); M.draw(r2a, t, t2, 0.9); fade(r2ah, t, t2 + 0.8); fade(r2at, t, wt('S3', 'unknown'));
    M.draw(r2b, t, t3, 0.9); fade(r2bh, t, t3 + 0.8); fade(r2bt, t, wt('S4', 'Minus'));
    let bx, by; if (t < t2) { [bx, by] = along(r1, (t - t1) / 1.2); } else if (t < t3) { [bx, by] = along(r2a, (t - t2) / 1.0); } else { [bx, by] = along(r2b, (t - t3) / 1.0); }
    attr(bike, 'cx', bx.toFixed(1)); attr(bike, 'cy', by.toFixed(1)); fade(bike, t, t1, 1e9, 0.15);
    const TAG = [[tS1 + 0.3, 'START: C + O₂'], [t1, 'ROAD 1 · ONE STEP'], [t2, 'ROAD 2 · STEP 1: UNKNOWN'], [t3, 'ROAD 2 · STEP 2'], [T0('S5'), 'SAME START · SAME END']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    fade(eTop, t, T0('S2')); fade(eBot, t, T0('S2') + 0.2); M.draw(e1, t, t1, 1.0); fade(e1h, t, t1 + 0.9); fade(e1t, t, wt('S2', 'Minus'));
    fade(eMid, t, wt('S3', 'monoxide')); M.draw(e2, t, wt('S3', 'monoxide'), 0.6); fade(e2h, t, wt('S3', 'monoxide') + 0.5); fade(e2t, t, wt('S3', 'unknown'));
    M.draw(e3, t, t3, 0.6); fade(e3h, t, t3 + 0.5); fade(e3t, t, wt('S4', 'Minus'));
    fade(eSame, t, wt('S5', 'same', 1));
    avA(t, T1('S5') - 0.4, z);
  }

  /* L: the law */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('L3') + 0.3, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'Germain') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.6); PUC.write($('#lEq'), t, wt('L2', 'sum'), 0.9);
    M.vis($('#lh'), t, T0('L3') - 0.1, z, { dx: 60, dy: 0, ...o });
    fade(hill, t, T0('L3')); [hS1, hS2, hT1, hT2].forEach(e => fade(e, t, T0('L3') + 0.2)); M.draw(hStr, t, wt('L3', 'state'), 0.6); M.draw(hWin, t, wt('L3', 'Like'), 1.0);
    M.draw(hA, t, wt('L3', 'height'), 0.6); fade(hAh, t, wt('L3', 'height') + 0.5); fade(hAt, t, wt('L3', 'height') + 0.5);
    const [hx, hy] = along(hWin, (t - wt('L3', 'start')) / 2.2); attr(hDot, 'cx', hx.toFixed(1)); attr(hDot, 'cy', hy.toFixed(1)); fade(hDot, t, wt('L3', 'start') - 0.1, 1e9, 0.15);
    M.vis($('#hP'), t, wt('L3', 'road') - 0.3, 1e9, POP);
  }

  /* D + rules */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('C1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tR1 + 0.2, M.HEAVY); snap($('#mt'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.8); });
    M.vis($('#dP'), t, wt('D4', 'heat') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.1, z, { dx: 60, dy: 0, ...o });
    RL.forEach((_, i) => { const el = $('#rl' + i); M.vis(el, t, tRl[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tRl[i + 1] : T1('R4') + 0.4; const on = M.io((t - tRl[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'one') - 0.1, 1e9, { dy: 16 }); M.vis($('#caV'), t, wt('C1', 'one') + 0.4, 1e9, { dy: 16 });
    M.vis($('#cf'), t, wt('C1', 'two') - 0.4, zc, { dx: 60, dy: 0, ...o });
    M.vis($('#cf0'), t, wt('C1', 'two') - 0.1, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C1', 'two') + 0.3, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'steps') + 0.1, 1e9, { dy: 16 });
    const tc1 = wt('C1', 'one') + 0.2, tc2 = wt('C1', 'steps');
    M.draw(ca1, t, tc1, 0.6); fade(ca1h, t, tc1 + 0.5); fade(ca1t, t, tc1 + 0.5); M.draw(cb1, t, tc2 - 0.4, 0.3); fade(cb1h, t, tc2 - 0.1); fade(cb1t, t, tc2 - 0.1); M.draw(cb2, t, tc2, 0.5); fade(cb2h, t, tc2 + 0.4); fade(cb2t, t, tc2 + 0.4);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Both') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Same') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'enthalpy') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'road') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W3') - 0.2, out, { dx: 60, dy: 0, ...o });
    WR.forEach(([, a, b2, ti, tc], i) => { const el = $('#wr' + i); M.vis(el, t, ti - 0.1, 1e9, { dy: 16 }); const tg = el.querySelector('.tg'); M.setT(tg, t >= tc ? b2 : a); tg.style.color = t >= tc && i === 2 ? RD : OK; const fl = M.io((t - tc) / 0.2) * (1 - M.io((t - tc - 0.8) / 0.4)); setBg(el, mix(C.soft, C.ac2, fl)); });
    M.vis($('#wr3'), t, T0('W7') - 0.1, 1e9, { dy: 16 }); setBg($('#wr3'), mix(C.soft, C.okBg, M.io((t - T0('W7')) / 0.3)));
    M.vis($('#wG'), t, wt('W7', 'cancel') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'flip') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'enthalpy') - 0.3 });
    fade(tq1, t, wt('X2', 'flip')); fade(tq2, t, wt('X2', 'sign')); fade(tq3, t, wt('X2', 'double'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
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
