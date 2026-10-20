// PUC Physics Ep 06: Dimensions of physical quantities (Motion notebook, bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const DC = C.violet, VC = C.ac, AC = C.red;     // colour-coding: dimensions violet (unit colour, Ch 1), v blue, a red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const D = s => `\\textcolor{${DC}}{${s}}`;            // a dimensional formula in violet
const dimt = s => `<span class="dimt">${s}</span>`;

Object.assign(M.IC, {
  apple: ['M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z', 'M10 2c1 .5 2 2 2 5'],
  calc: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M8 6h8', 'M16 14v4', 'M16 10h.01', 'M12 10h.01', 'M8 10h.01', 'M12 14h.01', 'M8 14h.01', 'M12 18h.01', 'M8 18h.01'],
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1');
const tK1 = T0('K1'), tK3 = T0('K3'), tC1 = T0('C1'), tC4 = T0('C4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['apple', '5 + 5 apples', 'SAME KIND', 'apples'], ['coin', '₹5 + ₹5', 'SAME KIND', 'rupees'], ['calc', '5 m + 5 s', 'DIFFERENT KINDS', 'seconds']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, i < 2 ? C.ac : C.red, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'apples', 1), wt('H1', 'rupees', 1), tMorph - 0.9];
/* ---------- H ---------- */
const JR = [['apple', 'Apples', 'SAME KIND', '5 + 5 = 10'], ['coin', 'Rupees', 'SAME KIND', '₹5 + ₹5 = ₹10']];
$('#jrs').innerHTML = JR.map(([ic, n, w, v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv">${v}</div></div>`).join('') +
  `<div class="jr" id="jr2" style="top:352px"><i>${M.icon('calc', 34, C.red, 2.2)}</i><div class="jn">Metres + seconds</div><div class="jw">DIFFERENT KINDS</div><div class="jv" style="color:var(--red)">?</div></div>`;
const TILES = [['calc', 'Calculator: 10'], ['help', '10 what?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, DC, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'calculator'), wt('H4', 'Ten')];

/* ---------- P ---------- */
const BQ = [['Mass', '[M]', 1], ['Length', '[L]', 1], ['Time', '[T]', 1], ['Electric current', '[A]', 0], ['Temperature', '[K]', 0], ['Amount of substance', '[mol]', 0], ['Luminous intensity', '[cd]', 0]];
$('#bqs').innerHTML = BQ.map(([n, sy], i) => `<div class="bq" id="bq${i}" style="top:${80 + i * 68}px"><div class="bn">${n}</div><div class="bs">${sy}</div></div>`).join('');
const DCH = [['M', 'Mass', 'KILOGRAM'], ['L', 'Length', 'METRE'], ['T', 'Time', 'SECOND']];
$('#dchs').innerHTML = DCH.map(([l, n, s], i) => `<div class="dch" id="dch${i}" style="left:${36 + i * 248}px"><div class="l">[${l}]</div><div class="n">${n}</div><div class="s">${s}</div></div>`).join('');
$('#pDef').innerHTML = K(`[Q] = ${D('[M^{a}\\,L^{b}\\,T^{c}]')}`);

/* ---------- S: the ride, speeding up ---------- */
const s = $('#simS'), X0 = 110, PXM = 24, RY = 300, WR = 26;      // 24 px per metre, 0-25 m
mk(s, 'line', { x1: 40, y1: RY, x2: 744, y2: RY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 25; m++) { const x = X0 + m * PXM, L = m % 5 ? 10 : 22; mk(s, 'line', { x1: x, y1: RY + 3, x2: x, y2: RY + 3 + L, stroke: C.ink, 'stroke-width': m % 5 ? 1.5 : 2.5 }); if (m % 5 === 0) txt(s, x, RY + 52, m + ' m', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const bike = () => {
  const g = mk(s, 'g', {}); const wl = [];
  [-84, 0].forEach(cx => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx, cy: 0, r: WR, fill: 'none', stroke: C.ink, 'stroke-width': 4 }); [0, 45, 90, 135].forEach(a => { const r = a * Math.PI / 180; mk(w, 'line', { x1: cx - WR * Math.cos(r), y1: -WR * Math.sin(r), x2: cx + WR * Math.cos(r), y2: WR * Math.sin(r), stroke: C.ink, 'stroke-width': 1.5 }); }); mk(w, 'circle', { cx, cy: 0, r: 4, fill: C.ink }); wl.push([w, cx]); });
  mk(g, 'path', { d: 'M-84,0 L-46,0 L-60,-38 Z M-46,0 L-10,-38 L-60,-38 M-10,-38 L0,0 M-60,-38 L-64,-50 M-10,-38 L-6,-54 L6,-56', fill: 'none', stroke: '#2A3F7A', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-76,-52 L-54,-52', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  return { g, wl };
};
const ghosts = [0, 1, 2].map(() => bike()); const bk = bike();
const vA = PUC.arrow(s, VC, 6, 18), aA = PUC.arrow(s, AC, 6, 18);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const aL = txt(s, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC });
// phase 1: constant 5 m/s for 2 s (x 0 -> 10). phase 2 (from rest at x0 = 0): a = 2 m/s², 0 -> 4 s (x 0 -> 16 m, v 0 -> 8)
const tA = wt('S2', 'covers') - 0.1, tSp = wt('S4', 'speeds') - 0.1, tRep = wt('S4', 'replay') - 0.1, tRun = wt('S4', 'Every') - 0.1;
// phase 2 clock: real time, except the slow-mo replay window (first 1 s of motion at 0.25x)
const p2 = t => { if (t < tRep) return 0; if (t < tRun) return M.clamp((t - tRep) * 0.25, 0, 1); return M.clamp(1 + (t - tRun), 1, 4); };
const st1 = t => M.clamp(t - tA, 0, 2);
const phase = t => t < tSp ? 1 : 2;
const state = t => { if (phase(t) === 1) { const u = st1(t); return { u, x: 5 * u, v: u > 0 && u < 2 ? 5 : (u >= 2 ? 5 : 0), a: 0 }; } const u = p2(t); return { u, x: u * u, v: 2 * u, a: 2 }; };
const moving = t => (t > tA && t < tA + 2) || (t > tRep && t < tRun + 3);
const placeBike = (b, xm) => { const x = X0 + xm * PXM; attr(b.g, 'transform', `translate(${x.toFixed(1)},${RY - WR - 2})`); const ang = (xm / 0.33) * 180 / Math.PI; b.wl.forEach(([w, cx]) => attr(w, 'transform', `rotate(${(ang % 360).toFixed(1)} ${cx} 0)`)); return x; };
$('#roG').innerHTML = `<span class="k">x</span><span class="v" id="rx">0.0</span><span class="u">m ${dimt('[L]')}</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">0.0</span><span class="u">m/s ${dimt('[LT⁻¹]')}</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="ra" style="color:${AC}">0.0</span><span class="u">m/s² <span id="raD">${dimt('[LT⁻²]')}</span></span>`;
const G1 = PUC.graph($('#grS'), { x: 90, y: 78, w: 270, h: 132, xmax: 4, ymin: 0, ymax: 16, xt: [0, 2, 4], yt: [0, 16], xl: 't', yl: '' });
const G2 = PUC.graph($('#grS'), { x: 470, y: 78, w: 270, h: 132, xmax: 4, ymin: 0, ymax: 8, xt: [0, 2, 4], yt: [0, 8], xl: 't', yl: '' });
const g1c = G1.curve(C.ink, 4), g1d = G1.dot(C.ink, 9), g2c = G2.curve(VC, 4), g2d = G2.dot(VC, 9);
const g1o = G1.curve(C.ac2, 4);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = 'left:36px;top:218px;height:40px;font-size:18px;background:#EDE6FB;color:#7A4FE0'; gTag.innerHTML = 'slope of x-t = v · [LT⁻¹]'; $('#gr').appendChild(gTag);
const gTag2 = document.createElement('div'); gTag2.className = 'pillp'; gTag2.style.cssText = 'left:420px;top:218px;height:40px;font-size:18px;background:#FBE6E6;color:#D64545'; gTag2.innerHTML = 'slope of v-t = a · [LT⁻²]'; $('#gr').appendChild(gTag2);
const avA = PUC.avatar($('#sim'), { x: 36, y: 474, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Divide by T twice: T⁻²!' });

/* ---------- D: area ---------- */
const STEPS = [[`A = l \\times b`, 'area = length × breadth'], [`[l] = ${D('[L]')},\\;\\; [b] = ${D('[L]')}`, 'breadth is also a length'], [`[A] = ${D('[L]')}\\times${D('[L]')} = ${D('[L^2]')}`, 'L times L'], [`[A] = ${D('[M^0 L^2 T^0]')}`, 'no mass, no time']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Area'), wt('D3', 'Length'), wt('D4', 'L'), wt('D5', 'Mass')];
const dS = $('#dS'), RX = 170, RYY = 110, RW = 440, RH = 260;
const dRect = mk(dS, 'rect', { x: RX, y: RYY, width: RW, height: RH, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 });
const dB1 = mk(dS, 'path', { d: `M${RX},${RYY + RH + 18} v10 h${RW} v-10`, fill: 'none', stroke: DC, 'stroke-width': 3 });
const dB2 = mk(dS, 'path', { d: `M${RX - 18},${RYY + RH} h-10 v${-RH} h10`, fill: 'none', stroke: DC, 'stroke-width': 3 });
const dT1 = txt(dS, RX + RW / 2, RYY + RH + 62, 'l  →  [L]', { 'text-anchor': 'middle', 'font-size': 28, fill: DC, 'font-weight': 600 });
const dT2 = txt(dS, RX - 40, RYY + RH / 2 + 10, '[L]', { 'text-anchor': 'end', 'font-size': 28, fill: DC, 'font-weight': 600 });
const dT3 = txt(dS, RX + RW / 2, RYY + RH / 2 + 14, 'A = [L²]', { 'text-anchor': 'middle', 'font-size': 40, fill: C.ink, 'font-weight': 600 });
$('#zcs').innerHTML = [['weight', 'M', '0'], ['ruler', 'L', '2'], ['clock', 'T', '0']].map(([ic, l, p], i) => `<div class="zc" id="zc${i}" style="left:${36 + i * 244}px">${M.icon(ic, 26, C.ink2, 2.2)}<span>power of ${l}</span><b>${p}</b></div>`).join('');

/* ---------- R: volume and density chains ---------- */
const chain = (host, items, y) => host.insertAdjacentHTML('beforeend', items.map(([x, c, id]) => `<div class="${c}" id="${id}" style="top:${c === 'cop' ? y + 8 : y}px">${x}</div>`).join(''));
chain($('#chV'), [['Length', 'cb', 'v0'], ['×', 'cop', 'v1'], ['Breadth', 'cb', 'v2'], ['×', 'cop', 'v3'], ['Height', 'cb', 'v4']], 110);
$('#chV').insertAdjacentHTML('beforeend', ['v0', 'v2', 'v4'].map((id, i) => `<div class="ctag" id="${id}t" style="top:206px">[L]</div>`).join('') +
  `<div class="fl2" id="vF" style="top:300px">${K(`[V] = ${D('[L]')}\\,${D('[L]')}\\,${D('[L]')} = ${D('[L^3]')}`)}</div><div class="pillp ink" id="vP" style="left:36px;top:490px">Three lengths: L cubed</div>`);
chain($('#chD'), [['Mass', 'cb', 'd0'], ['÷', 'cop', 'd1'], ['Volume', 'cb', 'd2'], ['=', 'cop', 'd3'], ['Density', 'cb', 'd4']], 110);
$('#chD').insertAdjacentHTML('beforeend', `<div class="ctag" id="d0t" style="top:206px">[M]</div><div class="ctag" id="d2t" style="top:206px">[L³]</div>` +
  `<div class="fl2" id="dF" style="top:290px">${K(`[\\rho] = \\dfrac{${D('[M]')}}{${D('[L^3]')}} = ${D('[M\\,L^{-3}]')}`)}</div>`);
const tV = [wt('R2', 'length'), wt('R2', 'times'), wt('R2', 'breadth'), wt('R2', 'times', 1), wt('R2', 'height')];
const tDn = [wt('R3', 'Density'), wt('R3', 'divided'), wt('R3', 'volume'), wt('R3', 'volume') + 0.2, wt('R3', 'Density') + 0.1];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`[Q] = ${D('[M^{a}\\,L^{b}\\,T^{c}]')} \\qquad ${D('[L]')} + ${D('[T]')} \\;\\text{is not allowed}`);

/* ---------- K: side by side ---------- */
const kS = $('#kbS');
mk(kS, 'line', { x1: 36, y1: 120, x2: 748, y2: 120, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 5; m++) { const x = 36 + m * 120; mk(kS, 'line', { x1: x, y1: 120, x2: x, y2: 140, stroke: C.ink, 'stroke-width': 2.5 }); txt(kS, x, 170, m + ' m', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const kBar = mk(kS, 'rect', { x: 36, y: 70, width: 600, height: 36, rx: 6, fill: '#B9A3EE' });
const tS2 = $('#kdS'), CK = [140, 100];
mk(tS2, 'circle', { cx: CK[0], cy: CK[1], r: 80, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; mk(tS2, 'line', { x1: CK[0] + 66 * Math.sin(a), y1: CK[1] - 66 * Math.cos(a), x2: CK[0] + 76 * Math.sin(a), y2: CK[1] - 76 * Math.cos(a), stroke: C.ink, 'stroke-width': 2.5 }); }
const kArc = mk(tS2, 'path', { fill: '#EDE6FB', stroke: 'none' });
const kHand = mk(tS2, 'line', { x1: CK[0], y1: CK[1], x2: CK[0], y2: CK[1] - 62, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(tS2, 'circle', { cx: CK[0], cy: CK[1], r: 6, fill: C.ink });
const kTT = txt(tS2, 270, 112, '5 s on the clock', { 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: 'Can you add 5 m/s to 18 km/h?', opts: ['Yes', 'No'], right: 0, why: 'Both are [LT⁻¹]. 18 km/h = 5 m/s, so 5 m/s + 5 m/s = 10 m/s.' });

/* ---------- C: same or no dimensions ---------- */
const DQ = [['Speed', 'distance ÷ time', `${D('[LT^{-1}]')}`], ['Angle', 'arc length ÷ radius', `${D('[M^0L^0T^0]')}`], ['Frequency', 'how many times per second', `${D('[T^{-1}]')}`]];
$('#dqs').innerHTML = DQ.map(([h, s2, d], i) => `<div class="dq" id="dq${i}" style="top:${84 + i * 124}px"><div class="h">${h}</div><div class="s">${s2}</div><div class="d">${K(d)}</div></div>`).join('') +
  `<div class="pillp good" id="cP" style="left:36px;top:490px">Strain: length ÷ length = no dimension</div>`;
const cS = $('#cS'), OX = 220, OY = 380, RR = 240, TH = 0.9;
const cR1 = mk(cS, 'line', { x1: OX, y1: OY, x2: OX + RR, y2: OY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const cR2 = mk(cS, 'line', { x1: OX, y1: OY, x2: OX + RR * Math.cos(TH), y2: OY - RR * Math.sin(TH), stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const cArc = mk(cS, 'path', { d: `M${OX + RR},${OY} A${RR},${RR} 0 0 0 ${(OX + RR * Math.cos(TH)).toFixed(1)},${(OY - RR * Math.sin(TH)).toFixed(1)}`, fill: 'none', stroke: VC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const cTh = mk(cS, 'path', { d: `M${OX + 60},${OY} A60,60 0 0 0 ${(OX + 60 * Math.cos(TH)).toFixed(1)},${(OY - 60 * Math.sin(TH)).toFixed(1)}`, fill: 'none', stroke: DC, 'stroke-width': 3 });
mk(cS, 'circle', { cx: OX, cy: OY, r: 7, fill: C.ink });
const cLr = txt(cS, OX + RR / 2, OY + 40, 'r  [L]', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const cLs = txt(cS, OX + RR * Math.cos(TH / 2) + 20, OY - RR * Math.sin(TH / 2), 's  [L]', { 'font-size': 26, fill: VC, 'font-weight': 600 });
const cLt = txt(cS, OX + 74, OY - 20, 'θ', { 'font-size': 30, fill: DC, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' });
$('#cF').innerHTML = K(`\\textcolor{${DC}}{\\theta} = \\dfrac{\\textcolor{${VC}}{s}}{r} \\Rightarrow \\dfrac{${D('[L]')}}{${D('[L]')}} = ${D('[M^0L^0T^0]')}`);
const th2 = PUC.think($('#th2'), { q: 'Strain = change in length ÷ original length. Does strain have a dimension?', opts: ['Yes, [L]', 'No dimension'], right: 1, why: '[L] ÷ [L] cancels to [M⁰L⁰T⁰]. Strain is a pure number, like an angle.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`[m] = ${D('[M]')}`)],
  [K(`[v] = \\dfrac{${D('[L]')}}{${D('[T]')}} = ${D('[LT^{-1}]')}`)],
  [K(`[p] = ${D('[M]')} \\times ${D('[LT^{-1}]')}`)],
  [K(`[p] = \\textcolor{${VC}}{[M\\,L\\,T^{-1}]}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 104 });
const wS = $('#wrS');
mk(wS, 'line', { x1: 40, y1: 330, x2: 744, y2: 330, stroke: C.ink, 'stroke-width': 3 });
const wBox = mk(wS, 'rect', { x: 140, y: 230, width: 140, height: 100, rx: 10, fill: C.ink });
const wBt = txt(wS, 210, 290, 'm', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 34, fill: '#fff', 'font-weight': 600 });
const wGh = [0, 1, 2].map(() => mk(wS, 'rect', { x: 140, y: 230, width: 140, height: 100, rx: 10, fill: C.ink, opacity: 0 }));
const wV = PUC.arrow(wS, VC, 6, 18), wVl = txt(wS, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32, fill: VC, 'font-weight': 600 });
const wMt = txt(wS, 210, 384, '[M]', { 'text-anchor': 'middle', 'font-size': 26, fill: DC, 'font-weight': 600 });
const wVt = txt(wS, 0, 194, '[LT⁻¹]', { 'text-anchor': 'middle', 'font-size': 26, fill: DC, 'font-weight': 600 });
$('#wc').innerHTML = K(`p = m\\,v \\;\\to\\; [M\\,L\\,T^{-1}]`);
const tW = [wt('W3', 'Mass'), wt('W4', 'Velocity'), wt('W5', 'Multiply'), wt('W6', 'So')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'No unit means no dimension, so ignore it', right: 'Angle: no dimension, but it has a unit, the radian' });
const tS = $('#tS');
mk(tS, 'line', { x1: 80, y1: 200, x2: 330, y2: 200, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const trR = mk(tS, 'line', { x1: 80, y1: 200, x2: 80 + 250 * Math.cos(1), y2: 200 - 250 * Math.sin(1), stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const trA = mk(tS, 'path', { d: `M150,200 A70,70 0 0 0 ${(80 + 70 * Math.cos(1)).toFixed(1)},${(200 - 70 * Math.sin(1)).toFixed(1)}`, fill: 'none', stroke: DC, 'stroke-width': 4 });
const trT = txt(tS, 170, 160, '1 rad', { 'font-size': 26, fill: DC, 'font-weight': 600 });
const trT2 = txt(tS, 200, 250, 'unit: rad · dimension: none', { 'text-anchor': 'middle', 'font-size': 17, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short questions: dimensions of a quantity, or which pair has the same dimensions' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which pair of quantities has the same dimensions?', qW: 780,
  opts: ['Speed and acceleration', 'Area and volume', 'Frequency and angular velocity', 'Mass and density'], right: 2, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 220 });
const so = PUC.solution($('#so'), [[K(`f:\\ ${D('[T^{-1}]')}`)], [K(`\\omega = \\dfrac{\\theta}{t}:\\ ${D('[T^{-1}]')}`)], ['<b style="color:var(--red)">A</b>: LT⁻¹ vs LT⁻²'], ['<b style="color:var(--red)">B</b>: L² vs L³ · <b style="color:var(--red)">D</b>: M vs ML⁻³']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Frequency'), wt('A2', 'Angular'), wt('A3', 'In'), wt('A3', 'B')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · dimensions', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`[Q] = [M^{a}\\,L^{b}\\,T^{c}] \\qquad [v] = [LT^{-1}] \\qquad [a] = [LT^{-2}]`),
    '<b>Area</b> [L²] · <b>Volume</b> [L³] · <b>Density</b> [ML⁻³]',
    '<b>Add or subtract</b> only same dimensions: 5 m + 5 s ✗',
    '<b>Angle, strain</b>: no dimension (angle still has a unit, rad)'] });
const YQ = ['Why can you not add 5 m to 5 s?', 'What are the dimensions of acceleration?', 'Does an angle have a dimension? Does it have a unit?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 07', topic: 'Pressure in M, L and T? Dimensional Formulae', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.15, 1.12, 560, 560], [tRun + 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const row = (ids, gap) => { let x2 = 36; ids.forEach(id => { const e = $('#' + id); e.style.left = x2 + 'px'; x2 += e.offsetWidth + gap; }); };
  row(['v0', 'v1', 'v2', 'v3', 'v4'], 16); row(['d0', 'd1', 'd2', 'd3', 'd4'], 16);
  ['v0', 'v2', 'v4', 'd0', 'd2'].forEach(id => { const b = $('#' + id), tg = $('#' + id + 't'); tg.style.left = (b.offsetLeft + b.offsetWidth / 2 - tg.offsetWidth / 2) + 'px'; });
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
    [0, 1, 2].forEach(i => { const el = $('#jr' + i); M.vis(el, t, i < 2 ? tMorph + 0.3 + i * 0.12 : wt('H3', 'writes'), 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'same') + 0.1) / 0.3); if (i < 2) el.style.background = mix(C.soft, C.ac3, on); else el.style.background = mix(C.soft, C.redBg, M.io((t - wt('H3', 'writes')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'kind') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#haF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H3', 'writes') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25); el.style.background = mix(C.soft, i ? C.redBg : '#EDE6FB', on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    BQ.forEach(([, , m3], i) => { const el = $('#bq' + i); M.vis(el, t, T0('P2') + 0.2 + i * 0.08, 1e9, { dy: 14 }); const on = m3 ? M.io((t - wt('P3', ['Mass', 'length', 'time'][i]) + 0.05) / 0.25) : 0; el.style.background = mix(C.soft, '#EDE6FB', on); el.querySelector('.bs').style.color = mix(C.dim, DC, on); el.querySelector('.bn').style.color = m3 ? mix(C.mute, C.ink, on) : mix(C.ink, C.dim, M.io((t - wt('P3', 'three')) / 0.3)); });
    M.vis($('#pr'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('P4', 'M'), wt('P4', 'L'), wt('P4', 'T')].forEach((tt, i) => M.vis($('#dch' + i), t, tt - 0.15, 1e9, POP));
    M.vis($('#pDefL'), t, T0('P5') + 0.1, 1e9, { dy: 10 }); PUC.write($('#pDef'), t, wt('P5', 'powers') - 0.1, 0.9);
    M.vis($('#prP'), t, wt('P5', 'build') + 0.2, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const S = state(t), ph = phase(t), slow = t >= tRep && t < tRun;
    M.vis(bk.g, t, tS1 + 0.4, 1e9, { dx: -40, dy: 0 });
    const bx = placeBike(bk, S.x);
    ghosts.forEach((gb, k) => { const g = state(t - (slow ? 0.8 : 0.25) * (k + 1)); const gx = placeBike(gb, phase(t - (slow ? 0.8 : 0.25) * (k + 1)) === ph ? g.x : S.x); gb.g.style.opacity = (moving(t) && Math.abs(gx - bx) > 6) ? [0.3, 0.2, 0.12][k] : 0; });
    const vLen = S.v * 16 * (slow ? M.io((t - tRep - 0.2) / 0.8) : 1);
    vA.set(bx + 34, RY - 80, bx + 34 + vLen, RY - 80); attr(vL, 'x', (bx + 44 + vLen).toFixed(1)); attr(vL, 'y', RY - 70); vL.style.opacity = vLen > 20 ? 1 : 0;
    const aOn = ph === 2 && t >= tRep ? (slow ? M.io((t - tRep - 0.9) / 0.8) : 1) : 0, aLen = 2 * 30 * aOn;
    aA.set(bx + 34, RY - 120, bx + 34 + aLen, RY - 120); attr(aL, 'x', (bx + 44 + aLen).toFixed(1)); attr(aL, 'y', RY - 110); aL.style.opacity = aLen > 20 ? 1 : 0;
    M.vis($('#slo'), t, tRep, tRun, { dy: 0, sc: 0.8, sp: M.POP, outDur: 0.2, ody: 0 });
    M.setT($('#tV'), S.u.toFixed(2));
    M.setT($('#rx'), S.x.toFixed(1)); M.setT($('#rv'), S.v.toFixed(1)); M.setT($('#ra'), (ph === 2 && t >= tRep ? 2 : 0).toFixed(1));
    // dimension tags pop on their words
    const dt = $('#roG').querySelectorAll('.dimt'); [wt('S2', 'L'), wt('S3', 'minus'), wt('S6', 'L')].forEach((tt, i) => M.vis(dt[i], t, tt - 0.1, 1e9, POP));
    // graphs: x-t (ink) and v-t (blue), dots linked to the bike
    if (ph === 1) { g1o((u2) => [u2, 0], 0, 0); g1c((u2) => [u2, 5 * u2], 0, S.u); g1d(S.u, S.x, t > tS1 + 0.4); g2c((u2) => [u2, 5], 0, S.u); g2d(S.u, S.v, t > tA); }
    else { g1o((u2) => [u2, 5 * u2], 0, 2); g1c((u2) => [u2, u2 * u2], 0, S.u); g1d(S.u, S.x, true); g2c((u2) => [u2, 2 * u2], 0, S.u); g2d(S.u, S.v, true); }
    M.vis(gTag, t, wt('S6', 'slope') - 0.1, 1e9, POP); M.vis(gTag2, t, wt('S6', 'other') - 0.1, 1e9, POP);
    avA(t, wt('S5', 'again') + 0.1, OUT('S6') + 1.0);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tStep.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const g = M.o3((t - wt('D2', 'length') + 0.1) / 0.7); attr(dRect, 'height', (RH * g).toFixed(1)); attr(dRect, 'y', (RYY + RH * (1 - g)).toFixed(1)); M.hide(dRect, g <= 0);
    M.draw(dB1, t, wt('D3', 'Length'), 0.4); M.vis(dT1, t, wt('D3', 'Length') + 0.2, 1e9, { dy: 0 });
    M.draw(dB2, t, wt('D3', 'Breadth'), 0.4); M.vis(dT2, t, wt('D3', 'Breadth') + 0.2, 1e9, { dy: 0 });
    M.vis(dT3, t, wt('D4', 'squared') - 0.1, 1e9, POP);
    [wt('D5', 'Mass'), wt('D5', 'squared'), wt('D5', 'time')].forEach((tt, i) => { M.vis($('#zc' + i), t, tt - 0.1, 1e9, POP); });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    ['v0', 'v1', 'v2', 'v3', 'v4'].forEach((id, i) => M.vis($('#' + id), t, tV[i] - 0.1, 1e9, POP));
    ['v0', 'v2', 'v4'].forEach((id, i) => M.vis($('#' + id + 't'), t, wt('R2', 'Three') + i * 0.15, 1e9, POP));
    PUC.write($('#vF'), t, wt('R2', 'cubed') - 0.2, 0.8); M.vis($('#vP'), t, wt('R2', 'cubed') + 0.5, 1e9, POP);
    M.vis($('#rr'), t, T0('R3') - 0.1, 1e9, { dx: 60, dy: 0 });
    ['d0', 'd1', 'd2', 'd3', 'd4'].forEach((id, i) => M.vis($('#' + id), t, tDn[i] - 0.1, 1e9, POP));
    const d4 = M.io((t - wt('R4', 'density')) / 0.3); $('#d4').style.background = mix(C.soft, C.ink, d4); $('#d4').style.color = mix(C.ink, '#FFFFFF', d4);
    M.vis($('#d0t'), t, wt('R3', 'M') - 0.1, 1e9, POP); M.vis($('#d2t'), t, wt('R3', 'cubed') - 0.1, 1e9, POP);
    PUC.write($('#dF'), t, wt('R4', 'over') - 0.2, 0.9); M.vis($('#rrP'), t, wt('R4', 'negative') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'only') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Dimensions') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tC1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kbN'), t, wt('K1', 'five') - 0.1, 1e9, { dy: 20 }); M.vis($('#kbD'), t, wt('K1', 'L') - 0.1, 1e9, POP);
    attr(kBar, 'width', (600 * M.o3((t - wt('K1', 'five')) / 0.8)).toFixed(1));
    M.vis($('#kbP'), t, wt('K1', 'L') + 0.3, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kdN'), t, wt('K2', 'five') - 0.1, 1e9, { dy: 20 }); M.vis($('#kdD'), t, wt('K2', 'T') - 0.1, 1e9, POP);
    const hu = M.o3((t - wt('K2', 'five')) / 1.0), ha = hu * 5 / 60 * 2 * Math.PI;
    attr(kHand, 'x2', (CK[0] + 62 * Math.sin(ha)).toFixed(1)); attr(kHand, 'y2', (CK[1] - 62 * Math.cos(ha)).toFixed(1));
    attr(kArc, 'd', hu > 0.01 ? `M${CK[0]},${CK[1]} L${CK[0]},${CK[1] - 62} A62,62 0 0 1 ${(CK[0] + 62 * Math.sin(ha)).toFixed(1)},${(CK[1] - 62 * Math.cos(ha)).toFixed(1)} Z` : '');
    M.vis(kTT, t, wt('K2', 'seconds') + 0.1, 1e9, { dy: 0 });
    M.vis($('#kdP'), t, wt('K2', 'T') + 0.3, 1e9, POP);
    M.vis($('#kNo'), t, wt('K2', 'never') - 0.1, out, { ...POP, sc: 0.6, outDur: 0.3, ody: 0 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Can') + 0.3, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Both') });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const tBack = T0('C5') + 0.0, out = OUT('C4'), out2 = OUT('W1'), second = t >= tBack + 2.0;
    M.vis($('#cl'), t, second ? tBack + 2.3 : tC1 + 0.1, second ? out2 : out, { dx: -60, dy: 0, ...o });
    [T0('C2'), wt('C2', 'Angle'), T0('C3')].forEach((tt, i) => { const el = $('#dq' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); M.vis(el.querySelector('.d'), t, i === 0 ? wt('C2', 'minus') : i === 1 ? wt('C2', 'dimension') - 0.1 : wt('C3', 'minus'), 1e9, POP); });
    M.vis($('#cP'), t, tBack + 2.5, 1e9, POP);
    M.vis($('#cr'), t, second ? tBack + 2.4 : wt('C2', 'Angle') - 0.1, second ? out2 : out, { dx: 60, dy: 0, ...o });
    const a0 = wt('C2', 'arc');
    M.draw(cR1, t, a0 - 0.3, 0.4); M.draw(cR2, t, a0 - 0.1, 0.4); M.draw(cArc, t, a0, 0.6); M.draw(cTh, t, a0 + 0.4, 0.4);
    M.vis(cLs, t, a0 + 0.3, 1e9, { dy: 0 }); M.vis(cLr, t, wt('C2', 'radius'), 1e9, { dy: 0 }); M.vis(cLt, t, a0 + 0.5, 1e9, { dy: 0 });
    PUC.write($('#cF'), t, wt('C2', 'Length'), 0.9);
    M.vis($('#th2'), t, tC4 + 0.05, tBack + 2.0, { dy: 36, ...o });
    th2(t, { tin: tC4, tOpts: wt('C4', 'Does') + 0.2, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Length') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    // the box slides at constant speed (loops twice), velocity arrow on it, ghosts behind
    const m0 = wt('W2', 'velocity');
    const pos = tt => 140 + 300 * M.clamp((tt - m0) / 2.4);
    const bx = pos(t); attr(wBox, 'x', bx.toFixed(1)); attr(wBt, 'x', (bx + 70).toFixed(1)); attr(wMt, 'x', (bx + 70).toFixed(1));
    wGh.forEach((g, k) => { const gx = pos(t - 0.2 * (k + 1)); attr(g, 'x', gx.toFixed(1)); g.style.opacity = Math.abs(gx - bx) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    const vl = 140 * M.io((t - m0 + 0.1) / 0.4); wV.set(bx + 70, 200, bx + 70 + vl, 200); attr(wVl, 'x', (bx + 80 + vl).toFixed(1)); attr(wVl, 'y', 210); wVl.style.opacity = vl > 30 ? 1 : 0;
    M.vis(wMt, t, tW[0], 1e9, { dy: 0 }); attr(wVt, 'x', (bx + 70 + vl / 2).toFixed(1)); M.vis(wVt, t, tW[1] + 0.3, 1e9, { dy: 0 });
    M.vis($('#wc'), t, tW[3] + 0.2, 1e9, POP); $('#wc').style.left = (392 - $('#wc').offsetWidth / 2) + 'px';
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'quantity') - 0.1, tStrike: wt('X3', 'Half') - 0.1, tRight: wt('X3', 'Angle') - 0.1 });
    const r0 = wt('X3', 'Angle'); M.draw(trR, t, r0, 0.4); M.draw(trA, t, r0 + 0.3, 0.4); M.vis(trT, t, wt('X3', 'radian') - 0.1, 1e9, POP); M.vis(trT2, t, wt('X3', 'radian') + 0.3, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
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
