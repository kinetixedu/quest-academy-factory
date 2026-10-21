// PUC Physics Ep 17: Measurement uncertainty (Motion notebook, measuring bench + live error bars)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ink, EC = C.orange, UC = C.violet, MC = C.ac;   // colour-coding: value ink, uncertainty (delta) orange, unit violet, mean blue
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ITAL = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 };
const abar = `\\textcolor{${MC}}{\\bar a}`, dab = `\\textcolor{${EC}}{\\Delta \\bar a}`;

Object.assign(M.IC, {
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  balance: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  watch: ['M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M12 10v4l2 2', 'M10 2h4', 'M12 2v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tG1 = T0('G1'), tG5 = T0('G5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook ---------- */
const JOBS = [['thermo', 'Doctor', 'THERMOMETER', '37.0', '± 0.1 °C', 'doctor'], ['balance', 'Shopkeeper', 'WEIGHING SCALE', '5.00', '± 0.01 kg', 'shopkeeper'], ['watch', 'Student', 'STOPWATCH', '12.4', '± 0.2 s', 'student']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, e], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span>${v}</span> <span class="pm">${e}</span></div></div>`).join('');

/* ---------- P: range on a number line ---------- */
const pl = $('#plS'), NY = 250, NX = v => 392 + (v - 2.61) * 6000;     // 0.01 s = 60 px
mk(pl, 'line', { x1: 50, y1: NY, x2: 734, y2: NY, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
[2.56, 2.58, 2.60, 2.62, 2.64, 2.66].forEach(v => { mk(pl, 'line', { x1: NX(v), y1: NY - 8, x2: NX(v), y2: NY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(pl, NX(v), NY + 36, v.toFixed(2), { 'text-anchor': 'middle', 'font-size': 18 }); });
const plBand = mk(pl, 'rect', { y: NY - 28, height: 56, rx: 8, fill: EC, opacity: 0.22 });
const plM = mk(pl, 'circle', { cx: NX(2.61), cy: NY, r: 11, fill: C.ink });
const plA = PUC.arrow(pl, EC, 4, 14), plB = PUC.arrow(pl, EC, 4, 14);
const plT = txt(pl, NX(2.61), NY - 90, 'Δ = 0.02', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 26 });
const plTv = mk(pl, 'circle', { cx: NX(2.618), cy: NY, r: 9, fill: 'none', stroke: C.ok, 'stroke-width': 3 }), plTt = txt(pl, NX(2.618), NY + 84, 'true value: somewhere in here', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 20 });
const tPband = wt('P2', 'range');

/* ---------- S: bench with three instruments ---------- */
const s = $('#simS'), X0 = 70, PX = 60;    // 60 px per cm, ruler 0 - 10 cm; pencil 7.43 cm
const LEN = 7.43;
const pen = mk(s, 'g', {});
mk(pen, 'rect', { x: X0, y: 150, width: 26, height: 40, rx: 5, fill: '#E7A4A4', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: X0 + 26, y: 150, width: 16, height: 40, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: X0 + 42, y: 150, width: LEN * PX - 42 - 40, height: 40, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'path', { d: `M${X0 + LEN * PX - 40},150 L${X0 + LEN * PX},170 L${X0 + LEN * PX - 40},190 Z`, fill: '#EBD3AE', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(s, 'rect', { x: X0 - 20, y: 214, width: 660, height: 96, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
const RG = [mk(s, 'g', {}), mk(s, 'g', {}), mk(s, 'g', {})];
for (let c = 0; c <= 10; c++) { const x = X0 + c * PX; mk(RG[0], 'line', { x1: x, y1: 214, x2: x, y2: 254, stroke: C.ink, 'stroke-width': 2.2 }); txt(RG[0], x, 282, c, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
for (let mm = 0; mm <= 100; mm++) { const x = X0 + mm * PX / 10, L = mm % 10 === 0 ? 40 : mm % 5 === 0 ? 26 : 14; [1, 2].forEach(k => mk(RG[k], 'line', { x1: x, y1: 214, x2: x, y2: 214 + L, stroke: C.ink, 'stroke-width': mm % 10 ? 1.2 : 2.2 })); if (mm % 10 === 0) [1, 2].forEach(k => txt(RG[k], x, 282, mm / 10, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 })); }
txt(s, X0 + 620, 302, 'cm', { 'text-anchor': 'end', fill: UC, 'font-weight': 600 });
// vernier scale: 10 divisions = 9 main mm; zero at the pencil tip (7.43). The 3rd line meets a main line.
const vg = mk(RG[2], 'g', {}), VX = X0 + LEN * PX, VD = 0.09 * PX;
mk(vg, 'rect', { x: VX - 10, y: 310, width: 10 * VD + 20, height: 60, rx: 4, fill: '#E9EEF8', stroke: C.ink, 'stroke-width': 2 });
for (let k = 0; k <= 10; k++) { const x = VX + k * VD; mk(vg, 'line', { x1: x, y1: 310, x2: x, y2: k % 5 ? 330 : 340, stroke: k === 3 ? C.red : C.ink, 'stroke-width': k === 3 ? 3 : 1.6 }); if (k % 5 === 0) txt(vg, x, 362, k, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink }); }
const vTag = txt(RG[2], VX - 16, 394, 'vernier line 3 matches: + 0.03 cm', { fill: C.red, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
const tipL = mk(s, 'line', { x1: VX, y1: 140, x2: VX, y2: 214, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
// error band at the tip (drawn at true scale) + ghost bands of earlier instruments
const eb = mk(s, 'rect', { y: 132, height: 186, rx: 6, fill: EC, opacity: 0.22 });
const ebG = [0, 1].map(() => mk(s, 'rect', { y: 132, height: 186, rx: 6, fill: 'none', stroke: EC, 'stroke-width': 2, 'stroke-dasharray': '5 5', opacity: 0 }));
const tCm = wt('S2', 'centimetre'), tMm = wt('S3', 'millimetre'), tVn = wt('S4', 'vernier');
const mode = t => t < tMm ? 0 : t < tVn ? 1 : 2;
const DEL = [1, 0.1, 0.01], RDN = ['7', '7.4', '7.43'], RDE = ['± 1', '± 0.1', '± 0.01'];
const halfW = M.keys([[0, 1], [tMm, 0.1], [tVn, 0.01]], 0.8, M.io);   // band half-width in cm (shown as +- delta around the reading)
const centre = M.keys([[0, 7], [tMm, 7.4], [tVn, 7.43]], 0.8, M.io);
$('#roG').innerHTML = `<span class="k">x</span><span class="v" id="rN">7</span><span class="u">cm</span>
  <span class="k" style="color:${EC}">Δx</span><span class="v" id="rE" style="color:${EC}">1</span><span class="u">cm</span>
  <span class="k" style="color:${EC};font-style:normal;font-size:22px">rel</span><span class="v" id="rR" style="color:${EC}">14 %</span><span class="u">Δx ÷ x</span>`;
// graph: uncertainty vs instrument on a log axis, dot linked to the dial
const g = $('#grS'), GXi = i => 190 + i * 220, GY = d => 70 + 60 * (0 - Math.log10(d));   // 1 -> 70, 0.1 -> 130, 0.01 -> 190
mk(g, 'path', { d: 'M110,56 V214 H730', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
['cm scale', 'mm scale', 'vernier'].forEach((n, i) => { mk(g, 'line', { x1: GXi(i), y1: 214, x2: GXi(i), y2: 222, stroke: C.ink, 'stroke-width': 2 }); txt(g, GXi(i), 246, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[1, 0.1, 0.01].forEach(d => { mk(g, 'line', { x1: 102, y1: GY(d), x2: 110, y2: GY(d), stroke: C.ink, 'stroke-width': 2 }); txt(g, 96, GY(d) + 6, d, { 'text-anchor': 'end', fill: EC }); });
const gl = mk(g, 'path', { d: '', stroke: EC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const gd = mk(g, 'circle', { r: 11, fill: C.ink });
const gIdx = M.keys([[0, 0], [tMm, 1], [tVn, 2]], 0.8, M.io);
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'finer instrument &rarr; one more real digit'; $('#gr').appendChild(gTag);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 500, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the error bar never reaches zero.' });

/* ---------- R: repeated readings (pendulum + stopwatch) ---------- */
const RD = [2.62, 2.58, 2.64, 2.60, 2.61], MEAN = 2.61;
const rp = $('#rpS'), PVX = 392, PVY = 110, PL = 300;
mk(rp, 'line', { x1: 250, y1: PVY, x2: 534, y2: PVY, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
for (let x = 262; x < 534; x += 22) mk(rp, 'line', { x1: x, y1: PVY - 4, x2: x - 12, y2: PVY - 16, stroke: C.dim, 'stroke-width': 2 });
const arc = mk(rp, 'path', { d: `M${PVX - PL * Math.sin(0.35)},${PVY + PL * Math.cos(0.35)} A${PL},${PL} 0 0 0 ${PVX + PL * Math.sin(0.35)},${PVY + PL * Math.cos(0.35)}`, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const ghB = [0, 1, 2].map(() => mk(rp, 'circle', { r: 26, fill: C.ink, opacity: 0 }));
const str = mk(rp, 'line', { x1: PVX, y1: PVY, stroke: C.ink, 'stroke-width': 3 }), bob = mk(rp, 'circle', { r: 26, fill: C.ink });
mk(rp, 'circle', { cx: PVX, cy: PVY, r: 7, fill: C.ink });
const tR2 = T0('R2'), tRk = [0, 2, 3, 4, 5].map(n => wt('R2', 'two', n));
// one full swing per reading: each starts 2.0 s before the reading is spoken; motion is a true pendulum (small angle), period shown slowed down
const swingStart = tR1 + 0.6;
const theta = t => { const u = t - swingStart; return u < 0 ? 0.35 : 0.35 * Math.cos(2 * Math.PI * u / 2.61); };
$('#rlist').innerHTML = RD.map((v, i) => `<div class="rdg" id="rg${i}" style="top:${66 + i * 40}px"><span style="left:0;color:var(--mute);font-size:22px;top:4px">#${i + 1}</span><span style="left:60px">${v.toFixed(2)}</span><span class="f" id="rge${i}" style="left:250px;font-size:24px;top:3px">|${(v - MEAN >= 0 ? '+' : '−')}${Math.abs(v - MEAN).toFixed(2)}|</span></div>`).join('') +
  `<div class="pillp ac" id="rMean" style="left:440px;top:84px">mean = 2.61</div><div class="pillp" id="rDel" style="left:440px;top:148px;background:#FCEBDC;color:var(--f)">Δ = 0.016 ≈ 0.02</div>`;
const rg = PUC.graph($('#rgS'), { x: 90, y: 64, w: 620, h: 140, xmax: 0.12, ymin: 0, ymax: 1 });
M.hide(rg.axes, true);
const RGX = v => 90 + (v - 2.55) / 0.10 * 620;
mk($('#rgS'), 'line', { x1: 80, y1: 170, x2: 720, y2: 170, stroke: C.ink, 'stroke-width': 2.5 });
[2.56, 2.58, 2.60, 2.62, 2.64].forEach(v => { mk($('#rgS'), 'line', { x1: RGX(v), y1: 162, x2: RGX(v), y2: 178, stroke: C.ink, 'stroke-width': 2 }); txt($('#rgS'), RGX(v), 204, v.toFixed(2), { 'text-anchor': 'middle' }); });
const rgBand = mk($('#rgS'), 'rect', { x: RGX(MEAN - 0.016), y: 128, width: RGX(MEAN + 0.016) - RGX(MEAN - 0.016), height: 84, rx: 6, fill: EC, opacity: 0.22 });
const rgDots = RD.map((v, i) => mk($('#rgS'), 'circle', { cx: RGX(v), cy: 170 - 14 - (RD.slice(0, i).filter(w => Math.abs(w - v) < 0.005).length) * 24, r: 10, fill: C.ink2 }));
const rgMean = mk($('#rgS'), 'line', { x1: RGX(MEAN), y1: 100, x2: RGX(MEAN), y2: 186, stroke: MC, 'stroke-width': 4 });
const rgMt = txt($('#rgS'), RGX(MEAN), 92, 'mean', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700 });
const rgDev = RD.map(v => mk($('#rgS'), 'line', { x1: RGX(MEAN), x2: RGX(v), y1: 222, y2: 222, stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round' }));

/* ---------- D ---------- */
const STEPS = [[`${abar} = \\dfrac{a_1 + a_2 + \\dots + a_n}{n}`, 'best value: the mean'],
  [`${dab} = \\dfrac{|\\Delta a_1| + \\dots + |\\Delta a_n|}{n}`, 'uncertainty: the mean absolute error'],
  [`a = ${abar} \\pm ${dab}`, 'here: (2.61 ± 0.02) s']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:150px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 158}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step')];
$('#tbs').innerHTML = `<div class="tb" style="top:74px;background:none"><span style="left:20px;color:var(--mute);font-size:20px;top:18px">a (s)</span><span class="f" style="left:300px;color:var(--f);font-size:20px;top:18px">|Δa| = |a − ā|</span></div>` +
  RD.map((v, i) => `<div class="tb" id="tb${i}" style="top:${128 + i * 64}px"><span style="left:20px">${v.toFixed(2)}</span><span class="f" style="left:300px">${Math.abs(v - MEAN).toFixed(2)}</span></div>`).join('') +
  `<div class="tb" id="tbS" style="top:${128 + 5 * 64 + 10}px;background:var(--ink)"><span style="left:20px;color:#fff">ā = 2.61</span><span style="left:300px;color:#F6B57A">Δā = 0.08 ÷ 5 = 0.016</span></div>`;
$('#stF').innerHTML = K(`a = ${abar} \\pm ${dab}`);

/* ---------- K ---------- */
$('#ka1').innerHTML = K('\\rho = \\dfrac{52.3\\,\\text{g}}{52\\,\\text{mL}}'); $('#ka2').innerHTML = '';
$('#kb1').innerHTML = K(`\\Delta\\rho \\approx \\textcolor{${EC}}{0.02} \\;\\text{(1 sig fig)}`); $('#kb2').innerHTML = K(`\\Rightarrow \\text{cut the value at the 2nd decimal}`);
const th1 = PUC.think($('#th1'), { q: 'Which is written correctly?', opts: ['9.826 ± 0.1', '9.8 ± 0.1'], right: 1, why: 'The uncertainty is in the 1st decimal place, so the value must stop there too.' });

/* ---------- G ---------- */
const gbar = (svg, rel, col) => { txt(svg, 36, 236, 'RELATIVE UNCERTAINTY', { 'font-size': 16, 'letter-spacing': 2 }); mk(svg, 'rect', { x: 36, y: 256, width: 712, height: 52, rx: 10, fill: C.soft }); const b = mk(svg, 'rect', { x: 36, y: 256, width: 0, height: 52, rx: 10, fill: col }); return [b, rel]; };
const gA = gbar($('#gaS'), 0.02 / 2.61, C.ok), gC = gbar($('#gcS'), 0.2 / 2.6, C.red);
const GBW = 712 / 0.1;      // 10 % = full bar
const th2 = PUC.think($('#th2'), { q: 'Ruler: (10.0 ± 0.1) cm. Tape: (100.0 ± 0.5) cm. Which is better?', opts: ['Ruler', 'Tape'], right: 1, why: 'Relative uncertainty: ruler 0.1 ÷ 10 = 1 %, tape 0.5 ÷ 100 = 0.5 %. The tape wins.' });
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 350, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Compare percentages, not the plus or minus.' });

/* ---------- W ---------- */
const WR = [50.2, 50.5, 50.3, 50.4], WM = 50.35;
const wsol = PUC.solution($('#wl'), [
  [K(`\\bar l = \\dfrac{201.4}{4} = \\textcolor{${MC}}{50.35}\\,\\text{cm}`)],
  [K(`|\\Delta l| = 0.15,\\ 0.15,\\ 0.05,\\ 0.05`)],
  [K(`\\Delta \\bar l = \\dfrac{0.40}{4} = \\textcolor{${EC}}{0.1}\\,\\text{cm}`)],
  [K(`\\text{1st decimal: } 50.35 \\to 50.4`)],
  [K(`l = (50.4 \\pm \\textcolor{${EC}}{0.1})\\,\\text{cm}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 78 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'mean'), wt('W4', 'distances'), wt('W5', 'Their'), wt('W6', 'uncertainty'), wt('W7', 'answer')];
const w = $('#wrS'), WX = v => 392 + (v - WM) * 1200;    // 0.1 cm = 160 px
mk(w, 'line', { x1: 50, y1: 260, x2: 734, y2: 260, stroke: C.ink, 'stroke-width': 3 });
[50.1, 50.2, 50.3, 50.4, 50.5, 50.6].forEach(v => { mk(w, 'line', { x1: WX(v), y1: 252, x2: WX(v), y2: 268, stroke: C.ink, 'stroke-width': 2 }); txt(w, WX(v), 298, v.toFixed(1), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink }); });
const wDots = WR.map((v, i) => mk(w, 'circle', { cx: WX(v), cy: 226, r: 13, fill: C.ink2 }));
const wDev = WR.map((v, i) => mk(w, 'line', { x1: WX(WM), x2: WX(v), y1: 150 + i * 16, y2: 150 + i * 16, stroke: EC, 'stroke-width': 5, 'stroke-linecap': 'round' }));
const wMean = mk(w, 'line', { x1: WX(WM), y1: 130, x2: WX(WM), y2: 270, stroke: MC, 'stroke-width': 4 }), wMt = txt(w, WX(WM), 120, 'mean 50.35', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const wBand = mk(w, 'rect', { x: WX(50.3), y: 330, width: WX(50.5) - WX(50.3), height: 56, rx: 8, fill: EC, opacity: 0.25 });
const wBm = mk(w, 'circle', { cx: WX(50.4), cy: 358, r: 11, fill: C.ink }), wBt = txt(w, WX(50.4), 416, '50.4 ± 0.1', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'ρ = 1.0057692 ± 0.02 g/mL (every calculator digit)', right: 'ρ = 1.01 ± 0.02 g/mL (value stops where Δ stops)' });
const where = PUC.where($('#wa'), { on: [], type: 'Mean value and mean absolute error numericals; picking the correctly written result' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'A length is read 5 times: 8.58, 8.66, 8.62, 8.65, 8.61 cm. Which result is written correctly?', qW: 800,
  opts: ['(8.6240 ± 0.0248) cm', '(8.62 ± 0.02) cm', '(8.6 ± 0.02) cm', '(8.624 ± 0.02) cm'], right: 1, cols: 1, optW: 968, optH: 66, optFs: 30, optY: 270 });
const so = PUC.solution($('#so'), [[K('\\bar l = 43.12 / 5 = 8.624')], [K(`\\Delta\\bar l = 0.124 / 5 = 0.0248`)], [K(`\\Delta\\bar l \\to \\textcolor{${EC}}{0.02}\\ \\text{(2nd decimal)}`)], [K(`(8.62 \\pm 0.02)\\,\\text{cm}`)]], { y0: 100, dy: 108 });
const tSo = [wt('A2', 'mean'), wt('A2', 'absolute'), wt('A3', 'Rounded'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · measurement uncertainty', y0: 92, dy: 108, txt: [0, 0, 1, 1],
  lines: [K(`${abar} = \\dfrac{\\sum a_i}{n} \\qquad ${dab} = \\dfrac{\\sum |a_i - \\bar a|}{n}`), K(`\\text{result} = ${abar} \\pm ${dab} \\;\\text{unit}`),
    '<b>Round Δ</b> (usually 1 sig fig), then <b>cut the value</b> at the same place', '<b>Compare</b> results by relative uncertainty Δa ÷ a'] });
const YQ = ['Why can no measurement have zero uncertainty?', 'How do you find the uncertainty from repeated readings?', 'Why is 9.826 ± 0.1 written wrongly?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 18 · CH 2', topic: 'Still on a moving bus: moving or not? Reference Frames', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tVn - 0.1, 1.06, 960, 560], [T0('S5') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const a = [$('#r0'), $('#r1'), $('#r2')], pt = [$('#pt0'), $('#pt1'), $('#pt2')];
  a.forEach((e, i) => { const L = e.offsetLeft, W = e.offsetWidth; $('#bk' + i).setAttribute('d', `M${L} 4 V18 H${L + W} V4`); pt[i].style.left = (L + W / 2 - pt[i].offsetWidth / 2) + 'px'; });
}

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
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jr' + i).querySelector('.pm'), t, wt('H2', 'doubt') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'doubt') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#calc'), t, wt('H3', 'calculator') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    M.count($('#calcS'), t, wt('H3', 'eight'), 0.8, 0, 1.0057692, v => v.toFixed(7));
    M.vis($('#wq0'), t, wt('H4', 'jar') - 0.1, 1e9, POP); M.vis($('#wq1'), t, wt('H5', 'real') - 0.1, 1e9, POP); M.vis($('#wq2'), t, wt('H5', 'noise') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(plM, t, tP1 + 0.6, 1e9, POP);
    const bw = 120 * M.io((t - tPband) / 0.6); attr(plBand, 'x', (NX(2.61) - bw).toFixed(1)); attr(plBand, 'width', (2 * bw).toFixed(1));
    const ua = M.io((t - wt('P2', 'delta')) / 0.4); plA.set(NX(2.61), NY - 50, NX(2.61) - 120 * ua, NY - 50); plB.set(NX(2.61), NY - 50, NX(2.61) + 120 * ua, NY - 50);
    M.vis(plT, t, wt('P2', 'delta'), 1e9, { dy: 8 });
    M.vis(plTv, t, wt('P2', 'true') - 0.1, 1e9, POP); M.vis(plTt, t, wt('P2', 'true'), 1e9, { dy: 8 });
    M.vis($('#plP'), t, wt('P2', 'plus') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    const tp = [wt('P3', 'best'), wt('P3', 'uncertainty'), wt('P3', 'unit')];
    [0, 1, 2].forEach(i => { M.vis($('#r' + i), t, tp[i] - 0.15, 1e9, { dy: 20 }); M.draw($('#bk' + i), t, tp[i], 0.4); M.vis($('#pt' + i), t, tp[i] + 0.1, 1e9, { dy: 10 }); });
    M.vis($('#prP'), t, wt('P4', 'mistake') - 0.1, 1e9, POP);
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(pen, t, tS1 + 0.4, 1e9, { dx: -40, dy: 0 });
    const wv = [M.io((t - tCm + 2) / 0.3) * (1 - M.io((t - tMm) / 0.35)), M.io((t - tMm) / 0.35) * (1 - M.io((t - tVn) / 0.35)), M.io((t - tVn) / 0.35)];
    wv[0] = 1 - wv[1] - wv[2];
    RG.forEach((gg, i) => { gg.style.opacity = wv[i].toFixed(3); M.hide(gg, wv[i] < 0.01); });
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = wv[i]; sp.style.background = mix('#FFFFFF', UC, on); sp.style.color = mix(C.mute, '#FFFFFF', on); sp.style.borderColor = mix(C.line, UC, on); });
    M.vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 10 });
    M.vis(vTag, t, tVn + 0.8, 1e9, { dy: 6 });
    M.draw(tipL, t, tCm - 0.3, 0.4);
    const hw = halfW(t), c = centre(t);
    attr(eb, 'x', (X0 + (c - hw) * PX).toFixed(1)); attr(eb, 'width', Math.max(3, 2 * hw * PX).toFixed(1)); M.vis(eb, t, tCm, 1e9, { dy: 0, fade: 0.3 });
    // ghost bands: where the earlier, wider bands were
    [[tMm, 7, 1], [tVn, 7.4, 0.1]].forEach(([tt, cc, h], k) => { const r = ebG[k]; attr(r, 'x', X0 + (cc - h) * PX); attr(r, 'width', 2 * h * PX); r.style.opacity = t > tt + 0.8 ? (k ? 0.3 : 0.2) : 0; });
    const md = mode(t), rd = $('#rd'); M.vis(rd, t, tCm, 1e9, POP);
    M.setT($('#rdN'), RDN[md]); M.setT($('#rdE'), RDE[md]); rd.style.left = (392 - rd.offsetWidth / 2).toFixed(0) + 'px';
    M.setT($('#rN'), RDN[md]); M.setT($('#rE'), String(DEL[md])); M.setT($('#rR'), (DEL[md] / [7, 7.4, 7.43][md] * 100).toFixed(md === 0 ? 0 : md === 1 ? 1 : 2) + ' %');
    M.vis($('#roG'), t, tCm, 1e9, { dy: 10 });
    const gi = gIdx(t), gd0 = Math.pow(10, -gi);
    attr(gd, 'cx', (190 + gi * 220).toFixed(1)); attr(gd, 'cy', GY(gd0).toFixed(1)); M.hide(gd, t < tCm);
    attr(gl, 'd', t < tMm ? '' : `M${GXi(0)},${GY(1)} L${(190 + gi * 220).toFixed(1)},${GY(gd0).toFixed(1)}`);
    M.vis(gTag, t, T0('S6') + 0.2, 1e9, POP);
    avD(t, wt('S5', 'never') + 0.4, out);
  }

  /* R: repeated readings */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    M.vis($('#rp'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rro'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#rgr'), t, tR1 + 0.4, out, { dy: 36, ...o });
    const pos = tt => { const th = theta(tt); return [PVX + PL * Math.sin(th), PVY + PL * Math.cos(th)]; };
    const [bx, by] = pos(t); attr(str, 'x2', bx.toFixed(1)); attr(str, 'y2', by.toFixed(1)); attr(bob, 'cx', bx.toFixed(1)); attr(bob, 'cy', by.toFixed(1));
    ghB.forEach((gb, k) => { const [gx, gy] = pos(t - 0.08 * (k + 1)); attr(gb, 'cx', gx.toFixed(1)); attr(gb, 'cy', gy.toFixed(1)); gb.style.opacity = t > swingStart && Math.hypot(gx - bx, gy - by) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    // stopwatch: runs during each swing, then shows that reading
    let last = -1; tRk.forEach((tt, i) => { if (t >= tt - 0.05) last = i; });
    const runT = t < swingStart ? 0 : ((t - swingStart) % 2.61);
    M.setT($('#swT'), last < 0 ? runT.toFixed(2) : RD[last].toFixed(2));
    RD.forEach((_, i) => { M.vis($('#rg' + i), t, tRk[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#rge' + i), t, wt('R4', 'distance') + i * 0.15, 1e9, { dy: 0, fade: 0.2 }); M.vis(rgDots[i], t, tRk[i], 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#rMean'), t, wt('R3', 'mean') - 0.1, 1e9, POP); M.vis(rgMean, t, wt('R3', 'mean'), 1e9, { dy: 0, fade: 0.2 }); M.vis(rgMt, t, wt('R3', 'mean'), 1e9, { dy: 6 });
    RD.forEach((v, i) => M.draw(rgDev[i], t, wt('R4', 'distance') + i * 0.15, 0.4));
    M.vis($('#rDel'), t, wt('R5', 'uncertainty') - 0.1, 1e9, POP);
    const ub = M.io((t - wt('R5', 'uncertainty')) / 0.5); rgBand.style.opacity = (0.22 * ub).toFixed(3); M.hide(rgBand, ub <= 0);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 242], [tStep[2] - 0.1, 400]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    RD.forEach((_, i) => { const el = $('#tb' + i); M.vis(el, t, tD1 + 0.5 + i * 0.1, 1e9, { dy: 12 }); const on = M.io((t - tStep[0] - 0.4) / 0.3) * (1 - M.io((t - tStep[1]) / 0.3)); el.children[0].style.color = mix(C.ink, MC, on); const on2 = M.io((t - tStep[1]) / 0.3); el.children[1].style.opacity = (0.35 + 0.65 * on2).toFixed(3); });
    M.vis($('#tbS'), t, tStep[2] - 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'unit') - 0.4, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.count($('#kaV'), t, wt('K1', 'calculator'), 0.8, 0, 1.0057692, v => v.toFixed(7));
    PUC.write($('#ka1'), t, wt('K1', 'calculator') + 0.4, 0.7); M.vis($('#kaC'), t, wt('K1', 'One') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kbV'), t, wt('K2', 'physicist') - 0.1, 1e9, { dy: 14 });
    PUC.write($('#kb1'), t, wt('K2', 'Round') - 0.1, 0.7); PUC.write($('#kb2'), t, wt('K2', 'cut') - 0.1, 0.7);
    M.vis($('#kbC'), t, wt('K2', 'place') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Nine') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'uncertainty') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G5');
    M.vis($('#ga'), t, T0('G2') - 0.1, out, { dx: -60, dy: 0, ...o });
    attr(gA[0], 'width', (gA[1] * GBW * M.o3((t - wt('G2', 'Under')) / 0.6)).toFixed(1)); M.vis($('#gaC'), t, wt('G2', 'percent') - 0.1, 1e9, POP);
    M.vis($('#gc'), t, T0('G3') - 0.1, out, { dx: 60, dy: 0, ...o });
    attr(gC[0], 'width', (gC[1] * GBW * M.o3((t - wt('G3', 'About')) / 0.8)).toFixed(1)); M.vis($('#gcC'), t, wt('G3', 'percent') - 0.1, 1e9, POP);
    avA(t, wt('G4', 'ten') + 0.2, out);
    M.vis($('#th2'), t, tG5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG5, tOpts: wt('G5', 'Which') - 0.1, tCount: T1('G5') + 0.05, dur: 3, tAns: T0('G6') - 0.02, tWhy: wt('G6', 'error') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tv = [wt('W2', 'fifty'), wt('W2', 'fifty', 1), wt('W2', 'fifty', 2), wt('W2', 'fifty', 3)];
    wDots.forEach((dd, i) => M.vis(dd, t, tv[i], 1e9, { ...POP, sc: 0.3 }));
    M.vis(wMean, t, tW[0] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(wMt, t, tW[0] + 0.3, 1e9, { dy: 6 });
    wDev.forEach((l, i) => M.draw(l, t, tW[1] + 0.3 + i * 0.25, 0.4));
    M.vis(wBand, t, tW[3] + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(wBm, t, tW[3] + 0.4, 1e9, POP); M.vis(wBt, t, tW[3] + 0.6, 1e9, { dy: 6 });
    const rc = $('#resC'); M.vis(rc, t, tW[4] + 0.2, 1e9, POP); rc.style.left = (392 - rc.offsetWidth / 2).toFixed(0) + 'px';
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'copy') - 0.1, tStrike: wt('X3', 'never') - 0.1, tRight: wt('X3', 'Round') - 0.1 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'mean') });
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
