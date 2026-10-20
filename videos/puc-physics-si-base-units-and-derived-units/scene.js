// PUC Physics Ep 03: SI base units and derived units (Motion notebook, light sets the metre)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, UC = C.violet, EC = C.teal;   // v / c blue, a red, F orange, unit violet, energy teal
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, {
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP5 = T0('P5'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tR1 = T0('R1'), tR6 = T0('R6'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['weight', 'Cook, Chennai', '1 KG OF RICE', '1', 'kg', 'Chennai'], ['weight', 'Cook, Delhi', '1 KG OF RICE', '1', 'kg', 'Delhi'], ['clock', 'Every watch', 'THE SAME SECOND', '1', 's', 'watch']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'Chennai'), wt('H1', 'Delhi'), wt('H1', 'watch')];
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, u], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span>${v}</span> <span class="u">${u}</span></div></div>`).join('');
// spanner jaw vs bolt head, drawn to scale (20 px per mm)
const hs = $('#hkS'), MMp = 20, HX = 392, HY = 270;
const bolt = mk(hs, 'g', {});
{ const r = 12.7 * MMp / 2 / Math.cos(Math.PI / 6); let d = ''; for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; d += (k ? 'L' : 'M') + (HX + r * Math.cos(an)).toFixed(1) + ',' + (HY + r * Math.sin(an)).toFixed(1); } mk(bolt, 'path', { d: d + 'Z', fill: '#C3CAD6', stroke: C.ink, 'stroke-width': 3 }); mk(bolt, 'circle', { cx: HX, cy: HY, r: 34, fill: '#AEB7C6', stroke: C.ink, 'stroke-width': 2 }); }
const span = mk(hs, 'g', {});
const J = 13 * MMp / 2;
mk(span, 'path', { d: `M${HX - 190},${HY - J - 46} H${HX + 60} V${HY - J} H${HX - 140} V${HY + J} H${HX + 60} V${HY + J + 46} H${HX - 190} Z`, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round', opacity: 0.92 });
mk(span, 'rect', { x: HX - 470, y: HY - 34, width: 290, height: 68, rx: 12, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3 });
txt(span, HX - 330, HY + 9, '13 mm', { 'text-anchor': 'middle', 'font-size': 28, fill: '#fff', 'font-weight': 600 });
const gapT = txt(hs, HX + 120, HY - J + 10, 'gap 0.3 mm', { 'font-size': 26, fill: C.red, 'font-weight': 600 });
const gapL = mk(hs, 'path', { d: `M${HX + 64},${HY - J} H${HX + 112} M${HX + 64},${HY - 12.7 * MMp / 2} H${HX + 112}`, stroke: C.red, 'stroke-width': 3 });
const bLab = txt(hs, HX, HY + 186, '1/2 inch = 12.7 mm', { 'text-anchor': 'middle', 'font-size': 26, fill: UC, 'font-weight': 600 });
const TILES = [['wrench', 'spanner: 13 mm'], ['ruler', 'bolt: 1/2 in = 12.7 mm']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, i ? UC : C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'thirteen'), wt('H4', 'half')];

/* ---------- P ---------- */
const BQ = [['Length', 'metre', 'm'], ['Mass', 'kilogram', 'kg'], ['Time', 'second', 's'], ['Electric current', 'ampere', 'A'], ['Temperature', 'kelvin', 'K'], ['Amount of substance', 'mole', 'mol'], ['Luminous intensity', 'candela', 'cd']];
$('#bqs').innerHTML = BQ.map(([n, u, sy], i) => `<div class="bq" id="bq${i}" style="top:${80 + i * 68}px"><div class="bn">${n}</div><div class="bu">${u}</div><div class="bs">${sy}</div></div>`).join('');
const tBq = [wt('P3', 'Metre'), wt('P3', 'Kilogram'), wt('P3', 'Second'), wt('P3', 'Ampere'), wt('P4', 'Kelvin'), wt('P4', 'Mole'), wt('P4', 'Candela')];
const DQ = [[cv(FC, '\\text{newton (N)}'), '\\text{kg}\\,\\text{m}\\,\\text{s}^{-2}'], [cv(EC, '\\text{joule (J)}'), '\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}'], ['\\text{pascal (Pa)}', '\\text{kg}\\,\\text{m}^{-1}\\,\\text{s}^{-2}'], [cv(EC, '\\text{watt (W)}'), '\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-3}'], ['\\text{coulomb (C)}', '\\text{A}\\,\\text{s}']];
$('#dqs').innerHTML = DQ.map(([n, r], i) => `<div class="dq" id="dq${i}" style="top:${84 + i * 80}px"><div class="dn">${K(n)}</div><div class="dr">${K(r)}</div></div>`).join('');

/* ---------- S: light pulse sets the metre ---------- */
const s = $('#simS'), LX0 = 92, LX1 = 692, LY = 250;          // 600 px = 1 metre
mk(s, 'rect', { x: 40, y: 170, width: 52, height: 160, rx: 8, fill: C.ink });
txt(s, 66, 360, 'LASER', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
mk(s, 'rect', { x: LX1, y: 170, width: 14, height: 160, rx: 4, fill: '#C3CAD6', stroke: C.ink, 'stroke-width': 2 });
txt(s, LX1 + 7, 360, 'DETECTOR', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
mk(s, 'line', { x1: LX0, y1: LY, x2: LX1, y2: LY, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const rl = mk(s, 'g', {});
mk(rl, 'rect', { x: LX0 - 10, y: 400, width: 620, height: 64, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
for (let c = 0; c <= 100; c++) { const x = LX0 + c * 6, L = c % 10 ? (c % 5 ? 10 : 18) : 28; mk(rl, 'line', { x1: x, y1: 400, x2: x, y2: 400 + L, stroke: C.ink, 'stroke-width': c % 10 ? 1.2 : 2.2 }); if (c % 20 === 0) txt(rl, x, 452, (c / 100).toFixed(1).replace('0.0', '0').replace('1.0', '1'), { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(rl, LX0 + 600, 488, 'm', { 'text-anchor': 'end', 'font-size': 18, fill: UC, 'font-weight': 600 });
const beam = mk(s, 'line', { x1: LX0, y1: LY, x2: LX0, y2: LY, stroke: VC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.35 });
const gh = [0.12, 0.2, 0.3].map(o => mk(s, 'circle', { r: 14, cy: LY, cx: -99, fill: VC, opacity: 0 }));
const pulse = mk(s, 'circle', { r: 16, cy: LY, cx: LX0, fill: VC });
const cA = PUC.arrow(s, VC, 6, 18);
const cL = txt(s, 0, 0, 'c', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: VC });
const mBr = mk(s, 'path', { d: `M${LX0},${LY + 90} v12 H${LX1} v-12`, fill: 'none', stroke: UC, 'stroke-width': 3 });
const mBrT = txt(s, (LX0 + LX1) / 2, LY + 132, '1 metre', { 'text-anchor': 'middle', 'font-size': 24, fill: UC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k" style="color:${VC}">c</span><span class="v" style="color:${VC};font-size:30px">299 792 458</span><span class="u">m/s</span>
  <span class="k">t</span><span class="v" id="rt">0.000</span><span class="u">ns</span>
  <span class="k">x</span><span class="v" id="rx">0.000</span><span class="u">m</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 74, w: 560, h: 140, xmax: 3.5, ymax: 1.05, xt: [0, 1, 2, 3], yt: [0, 0.5, 1], xl: 't (ns)', yl: 'x (m)' });
G.ylab.setAttribute('x', 122); G.ylab.setAttribute('y', 78);
const gCur = G.curve(VC), gDot = G.dot(VC);
const TNS = 1e9 / 299792458;   // 3.3356 ns per metre
const tGo = wt('S4', 'Watch'), tSlo = T0('S5') + 0.1, REAL = 1.6;          // run: TNS ns of light in 1.6 s of video; slow-mo at 0.25x
const lightNs = t => { if (t < tGo) return 0; const a = (t - tGo) / REAL * TNS; if (t < tSlo) return Math.min(TNS, a); return Math.min(TNS, (t - tSlo) / (REAL * 4) * TNS); };
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So light is the ruler for the whole world.' });

/* ---------- L: anchors ---------- */
const AN = [['second (s)', 'CAESIUM-133 ATOM', '9 192 631 770 ticks = 1 s', VC], ['metre (m)', 'SPEED OF LIGHT c', 'c = 299 792 458 m/s', VC], ['kilogram (kg)', 'PLANCK CONSTANT h', 'h = 6.626 070 15 × 10⁻³⁴ J s', EC]];
$('#ans').innerHTML = AN.map(([u, w, c, col], i) => `<div class="an" id="an${i}" style="top:${84 + i * 152}px"><div class="au">${u}</div><div class="aw">${w}</div><div class="ac" style="color:${col}">${c}</div></div>`).join('');
const tAn = [wt('L2', 'second'), T0('L2') - 0.5, wt('L3', 'kilogram')];
const lb = $('#lbS');
const cyl = mk(lb, 'g', {});
mk(cyl, 'rect', { x: 120, y: 160, width: 150, height: 160, fill: '#D9DCE3', stroke: C.ink, 'stroke-width': 3 });
mk(cyl, 'ellipse', { cx: 195, cy: 160, rx: 75, ry: 18, fill: '#EEF0F4', stroke: C.ink, 'stroke-width': 3 });
mk(cyl, 'path', { d: 'M120,320 A75,18 0 0 0 270,320', fill: 'none', stroke: C.ink, 'stroke-width': 3 });
txt(cyl, 195, 380, 'METAL CYLINDER', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1 });
txt(cyl, 195, 404, 'until 2019', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute });
const xMark = mk(lb, 'path', { d: 'M110,150 L280,340 M280,150 L110,340', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const arr = PUC.arrow(lb, C.ink, 4, 16);
const hBox = mk(lb, 'g', {});
mk(hBox, 'rect', { x: 430, y: 180, width: 300, height: 130, rx: 14, fill: C.ac3 || '#EEF3FD', stroke: EC, 'stroke-width': 3 });
txt(hBox, 580, 238, 'h', { 'text-anchor': 'middle', 'font-size': 44, fill: EC, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' });
txt(hBox, 580, 282, 'PLANCK CONSTANT', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1 });
txt(hBox, 580, 380, 'from 2019', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute });

/* ---------- D: build the joule ---------- */
const STEPS = [[`${cv(FC, 'F')} = m\\,${cv(AC, 'a')}`, 'newton = kg m/s²'],
  [`${cv(EC, 'W')} = ${cv(FC, 'F')} \\times d`, 'joule = newton × metre'],
  [`1\\,${cv(EC, '\\text{J}')} = 1\\,\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}`, 'only base units inside']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:150px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 160}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:92px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Force'), wt('D3', 'Work'), wt('D4', 'Put')];
const BR = [['N', FC, 'kg m', '÷', 's²', 'kg m s⁻²'], ['J', EC, 'N', '×', 'm', 'kg m² s⁻²'], ['Pa', C.ink, 'N', '÷', 'm²', 'kg m⁻¹ s⁻²'], ['W', EC, 'J', '÷', 's', 'kg m² s⁻³']];
$('#brs').innerHTML = BR.map(([l, c, b1, op, b2, r], i) => `<div class="brow" id="br${i}" style="top:${88 + i * 112}px"><span class="rl" style="color:${c}">${l}</span><span class="blk">${b1}</span><span class="bop">${op}</span><span class="blk">${b2}</span><span class="bop">=</span><span class="bres" style="background:${c}">${r}</span></div>`).join('');
const tBr = [wt('D2', 'newton'), wt('D3', 'joule'), wt('D5', 'pascal'), wt('D5', 'watt')];
$('#stF').innerHTML = K(`\\text{m} \\cdot \\text{kg} \\cdot \\text{s} \\cdot \\text{A} \\cdot \\text{K} \\cdot \\text{mol} \\cdot \\text{cd}`);

/* ---------- K ---------- */
const kb = $('#kbS');
const kgW = mk(kb, 'g', {});
mk(kgW, 'path', { d: 'M282,380 L310,220 H474 L502,380 Z', fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(kgW, 'path', { d: 'M350,220 C350,170 434,170 434,220', fill: 'none', stroke: C.ink, 'stroke-width': 10 });
txt(kgW, 392, 320, '1 kg', { 'text-anchor': 'middle', 'font-size': 40, fill: '#fff', 'font-weight': 600 });
mk(kb, 'line', { x1: 150, y1: 382, x2: 634, y2: 382, stroke: C.ink, 'stroke-width': 3 });
$('#kdF').innerHTML = K(`1\\,${cv(FC, '\\text{N}')} = 1\\,\\text{kg}\\,\\text{m}\\,\\text{s}^{-2}`);
const th1 = PUC.think($('#th1'), { q: 'The watt is named after a scientist, like the newton. Base unit or derived unit?', opts: ['Base unit', 'Derived unit'], right: 1, why: '1 W = 1 J/s = 1 kg m² s⁻³. A name on the outside, base units inside.' });

/* ---------- R: writing rules ---------- */
const RW = [['NAME', 'newton, kelvin'], ['PERSON → SYMBOL', 'N · Pa · K'], ['OTHER SYMBOLS', 'm · s · kg'], ['NO PLURAL / DOT', '5 kg']];
$('#rws').innerHTML = RW.map(([k, v], i) => `<div class="rw" id="rw${i}" style="top:${84 + i * 92}px"><div class="rk">${k}</div><div class="rv">${v}</div></div>`).join('');
const tRw = [wt('R2', 'Unit'), wt('R3', 'symbol'), wt('R4', 'Other'), wt('R5', 'No')];
const LB = [['5 kg', 1, 36, 96], ['5 kgs', 0, 290, 96], ['5 Kg', 0, 36, 236], ['5 kg.', 0, 290, 236], ['10 N', 1, 36, 376], ['10 n', 0, 290, 376]];
$('#lbxs').innerHTML = LB.map(([s0, ok, x, y], i) => `<div class="lbx" id="lx${i}" style="left:${x}px;top:${y}px">${s0}<div class="m" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 18, '#fff', 3)}</div></div>`).join('');
const tLx = [wt('R5', 'Five'), wt('R5', 'never') + 0.2, wt('R5', 'never') + 0.5, wt('R5', 'stop'), wt('R3', 'N'), wt('R3', 'N') + 0.3];
const th2 = PUC.think($('#th2'), { q: 'A label says “5 Kg”. Is that a correct SI symbol?', opts: ['Correct', 'Wrong'], right: 1, why: 'Capital K is the kelvin, a temperature. The kilogram is small k, small g: kg.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${cv(EC, 'W')} = ${cv(FC, 'F')} \\times d = ${cv(FC, '20\\,\\text{N}')} \\times 15\\,\\text{m}`)],
  [K(`${cv(EC, 'W')} = 300\\,\\text{N m} = ${cv(EC, '300\\,\\text{J}')}`)],
  [K(`1\\,${cv(EC, '\\text{J}')} = 1\\,\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}`)],
  [K(`${cv(EC, 'W')} = 300\\,\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 96 });
const w = $('#wrS'), WX0 = 90, WPX = 34, WY = 300;   // 34 px per metre, 0 - 15 m
mk(w, 'line', { x1: 40, y1: WY, x2: 744, y2: WY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 15; m += 5) { mk(w, 'line', { x1: WX0 + 60 + m * WPX, y1: WY + 4, x2: WX0 + 60 + m * WPX, y2: WY + 18, stroke: C.ink, 'stroke-width': 2 }); txt(w, WX0 + 60 + m * WPX, WY + 42, m + ' m', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const wb = mk(w, 'g', {});
[-50, 20].forEach(x => mk(wb, 'circle', { cx: x, cy: -24, r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 4 }));
mk(wb, 'path', { d: 'M-50,-24 L-22,-24 L-28,-64 Z M-28,-64 L2,-68 L-22,-24 M2,-68 L20,-24', fill: 'none', stroke: C.ac, 'stroke-width': 5, 'stroke-linejoin': 'round' });
const wgh = [0, 1, 2].map(() => { const g = mk(w, 'g', { opacity: 0 }); [-50, 20].forEach(x => mk(g, 'circle', { cx: x, cy: -24, r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 4 })); return g; });
const wF = PUC.arrow(w, FC, 7, 20), wFL = txt(w, 0, 0, 'F = 20 N', { 'font-size': 24, fill: FC, 'font-weight': 600 });
const wD = mk(w, 'path', { d: '', stroke: UC, 'stroke-width': 3, fill: 'none' }), wDL = txt(w, 0, WY + 86, 'd = 15 m', { 'text-anchor': 'middle', 'font-size': 24, fill: UC, 'font-weight': 600 });
const tW = [wt('W3', 'Work'), wt('W4', 'That'), wt('W5', 'Now'), wt('W6', 'So')];
const tWgo = T0('W2') + 0.8;
const wPos = t => 15 * M.io((t - tWgo) / 3.2);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The gram is the SI base unit of mass', right: 'The kilogram (kg) is the base unit of mass' });
const cw = $('#cw');
const TR = [['m', 'metre'], ['s', 'second'], ['kg', 'kilo + gram']];
const trEl = TR.map(([a, b], i) => { const g = mk(cw, 'g', {}); const x = 40 + i * 170; mk(g, 'rect', { x, y: 70, width: i === 2 ? 200 : 140, height: 80, rx: 12, fill: i === 2 ? C.ac : C.soft }); txt(g, x + (i === 2 ? 100 : 70), 124, a, { 'text-anchor': 'middle', 'font-size': 36, fill: i === 2 ? '#fff' : C.ink, 'font-weight': 600 }); txt(g, x + (i === 2 ? 100 : 70), 184, b, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 }); return g; });
const trT = txt(cw, 380, 230, 'only base unit with a prefix', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ac, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'One mark questions: a unit in base units, the base unit, or the wrong symbol' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `Sunlight intensity is measured in ${K('\\text{J}\\,\\text{s}^{-1}\\,\\text{m}^{-2}')}. In SI base units this is:`, qW: 800,
  opts: [K('\\text{kg}\\,\\text{s}^{-3}'), K('\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-3}'), K('\\text{kg}\\,\\text{m}^{-1}\\,\\text{s}^{-2}'), K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-3}')], right: 0, cols: 2, optW: 440, optH: 84, optFs: 32, optY: 300 });
const so = PUC.solution($('#so'), [[`${K('\\text{J s}^{-1}')} = ${K('\\text{kg m}^2\\text{s}^{-3}')}`], [`${K('\\div\\,\\text{m}^2')}: ${K('\\text{m}^2')} cancels`], [`= ${K('\\text{kg}\\,\\text{s}^{-3}')}`], ['<b style="color:var(--red)">C</b> pascal · <b style="color:var(--red)">D</b> stray m']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Joule'), wt('A3', 'Divide'), wt('A3', 'leaving'), wt('A3', 'C')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · SI units', y0: 100, dy: 92, txt: [1, 1, 0, 1],
  lines: ['<b>7 base</b>: <span class="mono">m · kg · s · A · K · mol · cd</span>', '<b>Metre</b>: set by <i>c</i> = 299 792 458 m/s', K(`${cv(FC, '\\text{N}')} = \\text{kg m s}^{-2} \\quad ${cv(EC, '\\text{J}')} = \\text{kg m}^2\\text{s}^{-2} \\quad ${cv(EC, '\\text{W}')} = \\text{kg m}^2\\text{s}^{-3}`), '<b>Write</b>: 5 kg (never 5 Kg, kgs, kg.) · N, Pa capital'] });
const YQ = ['How is the metre defined today?', 'Write the joule using only base units.', 'Why is “5 Kg” wrong?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 04', topic: 'Tyre in psi, pump in bar: why? Systems of Units', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tH3 + 0.6, 1, 960, 540], [wt('H5', 'tiny') - 0.1, 1.12, 1380, 540], [T0('P1') - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }

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
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    M.vis($('#hjP'), t, wt('H2', 'agree') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis(span, t, wt('H3', 'spanner') - 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis(bolt, t, wt('H4', 'bolt') - 0.1, 1e9, { ...POP, sc: 0.6 });
    bLab.style.opacity = M.io((t - wt('H4', 'twelve')) / 0.3).toFixed(3);
    const slip = M.io((t - wt('H4', 'slips')) / 0.25) * (1 - M.io((t - wt('H4', 'slips') - 0.5) / 0.25));
    bolt.setAttribute('transform', `rotate(${(slip * 6).toFixed(2)} ${HX} ${HY})`);
    const g = M.io((t - wt('H5', 'gap') + 0.1) / 0.3); gapT.style.opacity = g.toFixed(3); gapL.style.opacity = g.toFixed(3);
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pb'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    BQ.forEach((_, i) => { const el = $('#bq' + i); M.vis(el, t, T0('P2') + 0.2 + i * 0.08, 1e9, { dy: 14 }); const on = M.io((t - tBq[i] + 0.05) / 0.25); el.style.background = mix(C.soft, C.ac2, on); el.querySelector('.bs').style.color = mix(C.dim, C.ac, on); el.querySelector('.bn').style.color = mix(C.dim, C.ink, on); el.querySelector('.bu').style.color = mix(C.dim, UC, on); });
    M.vis($('#pd'), t, tP5 - 0.1, out, { dx: 60, dy: 0, ...o });
    DQ.forEach((_, i) => { const el = $('#dq' + i), tt = wt('P5', 'built') + i * 0.35; M.vis(el, t, tt, 1e9, { dx: -20, dy: 0 }); PUC.write(el.querySelector('.dr'), t, tt + 0.15, 0.5); });
    M.vis($('#pdP'), t, wt('P5', 'derived') - 0.1, 1e9, POP);
  }

  /* S: light */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('L1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(rl, t, tS1 + 0.5, 1e9, { dy: 20 });
    M.draw(mBr, t, wt('S3', 'distance') - 0.1, 0.5); mBrT.style.opacity = M.io((t - wt('S3', 'distance')) / 0.3).toFixed(3);
    const ns = lightNs(t), x = ns / TNS, px = LX0 + 600 * x;
    attr(pulse, 'cx', px.toFixed(1)); attr(beam, 'x2', px.toFixed(1)); M.hide(pulse, t < tS1 + 0.6);
    const moving = (t > tGo && t < tGo + REAL) || (t > tSlo && t < tSlo + REAL * 4);
    gh.forEach((c, k) => { const nsg = Math.max(0, ns - 0.18 * (k + 1)); attr(c, 'cx', (LX0 + 600 * nsg / TNS).toFixed(1)); c.setAttribute('opacity', moving && ns > 0.1 ? [0.3, 0.2, 0.12][k] : 0); });
    const vOn = M.io((t - tSlo - 0.2) / 0.5);
    cA.set(px + 22, LY - 46, px + 22 + 110 * vOn, LY - 46); attr(cL, 'x', (px + 22 + 110 * vOn + 8).toFixed(1)); attr(cL, 'y', LY - 36); cL.style.opacity = vOn.toFixed(3);
    const tg = $('#sTag'); M.setT(tg, 'SLOW-MO REPLAY · 0.25x'); M.vis(tg, t, tSlo - 0.1, T0('S6') + 1, { ...POP, outDur: 0.25 });
    M.setT($('#rt'), ns.toFixed(3)); M.setT($('#rx'), x.toFixed(3));
    M.vis($('#roG'), t, tS1 + 0.5, 1e9, { dy: 10 });
    gCur(u => [u, u / TNS], 0, ns); gDot(ns, x, t > tS1 + 0.5);
    M.vis($('#grP'), t, wt('S6', 'slope') - 0.1, 1e9, POP);
    avD(t, wt('S6', 'Same') + 0.2, out);
  }

  /* L: anchors */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#la'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    AN.forEach((_, i) => { const el = $('#an' + i); M.vis(el, t, i === 1 ? tL1 + 0.4 : tAn[i] - 0.1, 1e9, { dy: 16 }); PUC.write(el.querySelector('.ac'), t, (i === 1 ? tL1 + 0.4 : tAn[i]) + 0.3, 0.7); });
    M.vis($('#lb'), t, wt('L3', 'kilogram') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(cyl, t, wt('L3', 'cylinder') - 0.2, 1e9, { dy: 20 });
    M.draw(xMark, t, wt('L3', 'Paris') + 0.2, 0.4);
    const ua = M.io((t - wt('L3', 'Paris') - 0.5) / 0.4); arr.set(300, 245, 300 + 110 * ua, 245);
    M.vis(hBox, t, wt('L3', 'Planck') - 0.1, 1e9, { ...POP, sc: 0.8 });
    M.vis($('#lbP'), t, T0('L4') + 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#hiB'), hiY = M.track(84, [[tStep[1] - 0.1, 244], [tStep[2] - 0.1, 404]], M.SOFT)(t); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] + 0.3, 1e9, { dx: 60, dy: 0 });
    BR.forEach((_, i) => { const r = $('#br' + i); [...r.children].forEach((c, k) => M.vis(c, t, tBr[i] - 0.2 + k * 0.12, 1e9, POP)); });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Seven') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Every') + 0.2, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(kgW, t, wt('K1', 'kilogram') - 0.1, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 }); M.vis($('#kbC'), t, wt('K1', 'Chosen') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kdF'), t, wt('K2', 'newton') + 0.1, 0.8);
    [...$('#kdB').children].forEach((c, k) => M.vis(c, t, wt('K2', 'inside') + k * 0.15, 1e9, POP));
    M.vis($('#kdC'), t, wt('K2', 'second') + 0.2, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'base') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'watt') });
  }

  /* R: rules */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R6');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RW.forEach((_, i) => { const el = $('#rw' + i); M.vis(el, t, tRw[i] - 0.1, 1e9, { dy: 14 }); PUC.write(el.querySelector('.rv'), t, tRw[i] + 0.1, 0.5); });
    M.vis($('#rr'), t, T0('R3') - 0.1, out, { dx: 60, dy: 0, ...o });
    LB.forEach((_, i) => { const el = $('#lx' + i); M.vis(el, t, tLx[i] - 0.1, 1e9, POP); M.vis(el.querySelector('.m'), t, tLx[i] + 0.3, 1e9, { ...POP, sc: 0.3 }); el.style.borderColor = mix(C.line, LB[i][1] ? C.ok : C.red, M.io((t - tLx[i] - 0.3) / 0.3)); });
    M.vis($('#rrP'), t, wt('R5', 'stop') + 0.3, 1e9, POP);
    M.vis($('#th2'), t, tR6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tR6, tOpts: wt('R6', 'correct') - 0.1, tCount: T1('R6') + 0.05, dur: 3, tAns: T0('R7') - 0.02, tWhy: wt('R7', 'Capital') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const p = wPos(t), bx = WX0 + 60 + p * WPX;
    wb.setAttribute('transform', `translate(${bx.toFixed(1)},${WY})`);
    const mv = t > tWgo && t < tWgo + 3.2;
    wgh.forEach((g, k) => { g.setAttribute('transform', `translate(${(WX0 + 60 + wPos(t - 0.15 * (k + 1)) * WPX).toFixed(1)},${WY})`); g.setAttribute('opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    const fo = M.io((t - wt('W2', 'force') + 0.1) / 0.4); wF.set(bx - 70 - 100 * fo, WY - 40, bx - 70, WY - 40); attr(wFL, 'x', (bx - 70 - 100 * fo).toFixed(1)); attr(wFL, 'y', WY - 70); wFL.style.opacity = fo.toFixed(3);
    const x0 = WX0 + 60; attr(wD, 'd', `M${x0},${WY + 56} v10 H${bx.toFixed(1)} v-10`); attr(wDL, 'x', ((x0 + bx) / 2).toFixed(1)); wDL.style.opacity = M.io((t - wt('W2', 'fifteen')) / 0.3).toFixed(3); M.hide(wD, p < 0.2);
    M.vis($('#wJ'), t, wt('W4', 'joules') - 0.1, 1e9, POP); M.vis($('#wB'), t, wt('W6', 'three') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'gram') - 0.1, tStrike: wt('X3', 'But') + 0.1, tRight: wt('X3', 'kilogram') - 0.1 });
    trEl.forEach((g, i) => M.vis(g, t, wt('X3', 'only') - 0.4 + i * 0.15, 1e9, POP)); trT.style.opacity = M.io((t - wt('X3', 'prefix')) / 0.3).toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
