// PUC Physics Ep 35: Multiplication of vectors by scalars (Motion notebook, lambda dial)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, LC = C.violet, NC = C.ink, FC = C.orange, GC = C.red;   // A / velocity blue, scaled vector lambda A violet, lambda ink, F orange, a red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vA = `\\textcolor{${AC}}{\\vec{A}}`, lam = `\\textcolor{${NC}}{\\lambda}`, lA = `\\textcolor{${LC}}{\\lambda\\vec{A}}`;

Object.assign(M.IC, {
  pot: ['M4 10h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z', 'M2 10h20', 'M9 6c0-1 1-1 1-2', 'M14 6c0-1 1-1 1-2'],
  image: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'm21 15-5-5L5 21', 'M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  car: ['M5 17h14v-5l-2-5H7l-2 5z', 'M7 17v2', 'M17 17v2', 'M5 12h14'],
});

const op = (el, t, tin, tout = 1e9, d = 0.25) => { const v = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)); M.hide(el, v <= 0.001); snap(el, 'opacity', v >= 0.999 ? '' : v.toFixed(3)); return v; };
const grow = (ar, p, t, t0, dur = 0.6) => { const u = M.o3((t - t0) / dur); ar.set(p[0], p[1], p[0] + (p[2] - p[0]) * u, p[1] + (p[3] - p[1]) * u); return u; };
const vlab = (svg, s, col, x, y, o = {}) => { const fs = o.fs || 34, g = mk(svg, 'g', { transform: `translate(${x},${y})` });
  const tx = mk(g, 'text', { x: 0, y: 0, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': fs, fill: col }); tx.textContent = s;
  if (!o.noArrow) { const w = fs * 0.3 * Math.max(1, s.length * 0.75); mk(g, 'path', { d: `M${-w},${-fs * 0.92} H${w} M${w - 5},${-fs * 0.92 - 4} L${w},${-fs * 0.92} L${w - 5},${-fs * 0.92 + 4}`, stroke: col, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); }
  return g; };
const moveG = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const fmt = (x, n = 1) => { const s = (Math.abs(x) < 0.005 ? 0 : x).toFixed(n); return s.replace('-', '−'); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tR1 = T0('R1');
const tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV5 = T0('V5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['pot', 'Recipe', '2 PEOPLE → 4 PEOPLE', 'recipe', 2], ['image', 'Photo', 'ZOOM TO DOUBLE SIZE', 'photo', 2], ['car', 'Car', 'TWICE AS FAST, SAME WAY', 'car', 2]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jrS${i}" width="220" height="100"></svg></div>`).join('');
const JR = [0, 1, 2].map(i => { const s = $('#jrS' + i); return { a: PUC.arrow(s, AC, 5, 13), b: PUC.arrow(s, LC, 5, 13), tx: txt(s, 206, 32, '×2', { 'text-anchor': 'end', 'font-size': 22, fill: LC, 'font-weight': 600 }) }; });
const TILES = ['Same direction', 'Double the speed', '<b>2 × v ?</b> &nbsp;<b>−2 × v ?</b>'];
$('#wqs').innerHTML = TILES.map((w, i) => `<div class="wq" id="wq${i}"><span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Same'), wt('H4', 'double'), wt('H4', 'minus')];

/* ---------- P ---------- */
$('#pqF').innerHTML = K(`${lam} \\times ${vA} = ${lA}`);
$('#pqG').innerHTML = K(`|${lA}| = |${lam}|\\,|${vA}|`);
const ruS = [0, 1, 2].map(i => { const s = $('#ru' + i + 'S'); const a = PUC.arrow(s, AC, 5, 14), b = PUC.arrow(s, LC, 6, 16); if (i === 2) mk(s, 'circle', { cx: 150, cy: 56, r: 8, fill: LC, class: 'z' }); return { s, a, b }; });

/* ---------- S: the lambda dial ---------- */
const s = $('#simS'), O = [392, 290], U = 50, DIR = 45;              // origin centre, 50 px per unit, A = 3 units at 45 deg (north east)
for (let x = 42; x <= 742; x += U) mk(s, 'line', { x1: x, y1: 70, x2: x, y2: 440, stroke: C.soft, 'stroke-width': 2 });
for (let y = 90; y <= 440; y += U) mk(s, 'line', { x1: 40, y1: y, x2: 744, y2: y, stroke: C.soft, 'stroke-width': 2 });
const ux = Math.cos(DIR * Math.PI / 180), uy = -Math.sin(DIR * Math.PI / 180);
mk(s, 'line', { x1: O[0] - 5 * U * ux, y1: O[1] - 5 * U * uy, x2: O[0] + 5 * U * ux, y2: O[1] + 5 * U * uy, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const cmp = mk(s, 'g', { transform: 'translate(700,130)' }); mk(cmp, 'path', { d: 'M0,26 V-26 M-8,-16 L0,-26 L8,-16', stroke: C.mute, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); txt(cmp, 0, -34, 'N', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const ghA = [0, 1, 2].map(() => PUC.arrow(s, LC, 6, 18));
const sA = PUC.arrow(s, AC, 5, 16), sL = PUC.arrow(s, LC, 9, 24);
const zDot = mk(s, 'circle', { cx: O[0], cy: O[1], r: 9, fill: LC });
mk(s, 'circle', { cx: O[0], cy: O[1], r: 6, fill: NC });
const lbA = vlab(s, 'A', AC, O[0] + 3 * U * ux * 0.5 + 34, O[1] + 3 * U * uy * 0.5 + 34, { fs: 28 });
const lbL = vlab(s, 'λA', LC, 0, 0, { fs: 34 });
const zTx = txt(s, O[0] + 18, O[1] + 40, 'zero vector', { 'font-size': 20, fill: LC, 'font-weight': 600 });
// slider
const SLx = l => 100 + (l + 1) * 196, SLy = 510;                        // lambda -1 .. 2 -> x 100 .. 688
mk(s, 'line', { x1: SLx(-1), y1: SLy, x2: SLx(2), y2: SLy, stroke: C.line, 'stroke-width': 8, 'stroke-linecap': 'round' });
[-1, -0.5, 0, 0.5, 1, 1.5, 2].forEach(l => { mk(s, 'line', { x1: SLx(l), y1: SLy - 14, x2: SLx(l), y2: SLy - 8, stroke: C.ink, 'stroke-width': 2 }); txt(s, SLx(l), SLy + 36, String(l).replace('-', '−').replace('0.5', '½'), { 'text-anchor': 'middle', 'font-size': 18, fill: l < 0 ? C.red : C.ink, 'font-weight': 600 }); });
txt(s, SLx(-1) - 30, SLy + 7, 'λ', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: NC, 'font-weight': 700 });
const knob = mk(s, 'circle', { cx: SLx(1), cy: SLy, r: 16, fill: '#fff', stroke: NC, 'stroke-width': 4 });
const fill = mk(s, 'line', { x1: SLx(0), y1: SLy, x2: SLx(1), y2: SLy, stroke: LC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const tTwo = wt('S3', 'two'), tHalf = wt('S4', 'half'), tSlide = wt('S5', 'slide'), tZ = wt('S5', 'zero', 1), tM1 = wt('S6', 'minus'), tRep = wt('S5', 'Watch'), tRepE = tRep + 4.2;
// lambda track: 1 (A itself) -> 2 -> 0.5 -> slow pass through 0 (0.25x replay) -> -1 -> sweep to show the V
const lamF = t => {
  if (t < tTwo - 0.3) return 1;
  if (t < tHalf - 0.3) return 1 + M.io((t - tTwo + 0.3) / 0.9);
  if (t < tSlide) return 2 - 1.5 * M.io((t - tHalf + 0.3) / 0.9);
  if (t < tRep) return 0.5 - 0.1 * M.io((t - tSlide) / 0.5);
  if (t < tRepE) return 0.4 - 0.6 * M.clamp((t - tRep) / (tRepE - tRep));          // slow-mo: 0.4 -> -0.2
  if (t < tS7) return -0.2 - 0.8 * M.io((t - Math.max(tRepE, tM1 - 0.4)) / 0.9);
  return -1 + 3 * M.io((t - wt('S7', 'V') + 0.2) / 3.2) - 0;                       // sweep -1 -> 2 to draw the V
};
$('#roA').innerHTML = `<span class="k" style="color:${NC}">λ</span><span class="v" id="rvL">1.0</span><span class="u"></span>
  <span class="k" style="color:${AC}">|A|</span><span class="v" id="rvA" style="color:${AC}">3.0</span><span class="u">units</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${LC}">|λA|</span><span class="v" id="rvS" style="color:${LC}">3.0</span><span class="u">units</span>
  <span class="k" style="color:${C.ink2};font-style:normal;font-size:22px">dir</span><span class="v" id="rvD" style="font-size:28px">NE</span><span class="u"></span>`;
const roNote = document.createElement('div'); roNote.className = 'pillp'; roNote.style.cssText = 'left:36px;top:196px;height:44px;font-size:22px'; $('#ro').appendChild(roNote);
const g = PUC.graph($('#grS'), { x: 110, y: 74, w: 600, h: 146, xmax: 3, ymax: 6, xt: [], yt: [0, 3, 6], xl: 'λ' });
const GX = l => g.X(l + 1);
[-1, 0, 1, 2].forEach(l => { mk($('#grS'), 'line', { x1: GX(l), y1: 220, x2: GX(l), y2: 228, stroke: C.ink, 'stroke-width': 2 }); txt($('#grS'), GX(l), 252, String(l).replace('-', '−'), { 'text-anchor': 'middle', fill: l < 0 ? C.red : C.mute }); });
mk($('#grS'), 'line', { x1: GX(0), y1: 74, x2: GX(0), y2: 220, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.35 });
const gc = g.curve(LC), gd = g.dot(LC);
const gV = txt($('#grS'), GX(0.12), g.Y(5.5), 'a V shape: |λA| = |λ| × 3', { 'font-size': 18, fill: LC, 'font-weight': 600 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Minus just turns it around!' });

/* ---------- D: rules ---------- */
const STEPS = [[`|${lA}| = |${lam}|\\,|${vA}|`, 'size: multiply by the size of λ'],
  [`${lam} > 0:\\ \\text{same} \\qquad ${lam} < 0:\\ \\text{reversed}`, 'direction: only the sign of λ matters'],
  [`${lam} = -1:\\quad (-1)${vA} = -${vA}`, 'minus A is just minus one times A'],
  [`2(2\\hat{i} + 3\\hat{j}) = 4\\hat{i} + 6\\hat{j}`, 'every component is multiplied']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'magnitude'), wt('D3', 'Lambda'), wt('D4', 'Lambda'), wt('D5', 'In')];
const d = $('#drS'), DO = [110, 470], DU = 50;
for (let i = 0; i <= 12; i++) mk(d, 'line', { x1: DO[0] + i * DU, y1: 100, x2: DO[0] + i * DU, y2: DO[1], stroke: C.soft, 'stroke-width': 2 });
for (let j = 0; j <= 7; j++) mk(d, 'line', { x1: DO[0], y1: DO[1] - j * DU, x2: DO[0] + 12 * DU, y2: DO[1] - j * DU, stroke: C.soft, 'stroke-width': 2 });
mk(d, 'path', { d: `M${DO[0]},90 V${DO[1]} H${DO[0] + 12 * DU + 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[2, 4].forEach(i => txt(d, DO[0] + i * DU, DO[1] + 30, i, { 'text-anchor': 'middle', fill: C.ink }));
[3, 6].forEach(j => txt(d, DO[0] - 12, DO[1] - j * DU + 6, j, { 'text-anchor': 'end', fill: C.ink }));
const dx2 = mk(d, 'line', { x1: DO[0], y1: DO[1] + 2, x2: DO[0] + 4 * DU, y2: DO[1] + 2, stroke: LC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const dy2 = mk(d, 'line', { x1: DO[0] + 4 * DU, y1: DO[1], x2: DO[0] + 4 * DU, y2: DO[1] - 6 * DU, stroke: LC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const dx1 = mk(d, 'line', { x1: DO[0], y1: DO[1] - 2, x2: DO[0] + 2 * DU, y2: DO[1] - 2, stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const dy1 = mk(d, 'line', { x1: DO[0] + 2 * DU, y1: DO[1], x2: DO[0] + 2 * DU, y2: DO[1] - 3 * DU, stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const dA2 = PUC.arrow(d, LC, 7, 20), dA1 = PUC.arrow(d, AC, 7, 20);
const dLA = vlab(d, 'A', AC, DO[0] + 2 * DU - 46, DO[1] - 1.5 * DU - 10, { fs: 30 }), dLL = vlab(d, '2A', LC, DO[0] + 4 * DU + 50, DO[1] - 4.5 * DU, { fs: 30 });
const dT1 = txt(d, DO[0] + 340, 150, '2 × (2, 3) = (4, 6)', { 'font-size': 26, fill: LC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`|${lA}| = |${lam}|\\,|${vA}| \\qquad ${lam} < 0 \\Rightarrow \\text{flipped}`);

/* ---------- C: laws ---------- */
const LAWS = [[`\\vec{s} = t\\,\\textcolor{${AC}}{\\vec{v}}`, 'displacement = time × velocity', AC, LC, 'C3'],
  [`\\textcolor{${FC}}{\\vec{F}} = m\\,\\textcolor{${GC}}{\\vec{a}}`, 'force = mass × acceleration', GC, FC, 'C4'],
  [`\\vec{p} = m\\,\\textcolor{${AC}}{\\vec{v}}`, 'momentum = mass × velocity', AC, NC, 'C5']];
$('#laws').innerHTML = LAWS.map(([f, w], i) => `<div class="law" id="lw${i}" style="top:${84 + i * 152}px"><div class="lf">${K(f)}</div><div class="lw">${w}</div><svg id="lwS${i}" width="420" height="100"></svg></div>`).join('');
const LW = LAWS.map(([, , c1, c2], i) => { const sv = $('#lwS' + i); return { v: PUC.arrow(sv, c1, 6, 18), r: PUC.arrow(sv, c2, 8, 22), t1: txt(sv, 20, 96, 'vector', { 'font-size': 18, fill: c1, 'font-weight': 600 }), t2: txt(sv, 400, 96, 'scalar × vector: same way', { 'text-anchor': 'end', 'font-size': 18, fill: c2 === NC ? C.ink2 : c2, 'font-weight': 600 }) }; });
const tLaw = [wt('C3', 'Displacement'), wt('C4', 'Force'), wt('C5', 'momentum')];

/* ---------- R: Aarav and his friend ---------- */
const rs = $('#rsS'), RY0 = 470;
const lane = [250, 530];
lane.forEach(x => { mk(rs, 'line', { x1: x, y1: 90, x2: x, y2: 500, stroke: '#E3E6EC', 'stroke-width': 60, 'stroke-linecap': 'round' }); mk(rs, 'line', { x1: x, y1: 100, x2: x, y2: 490, stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '14 14' }); });
txt(rs, lane[0], 540, 'COUSIN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 }); txt(rs, lane[1], 540, 'AARAV', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const rider = x => { const gg = mk(rs, 'g', {}); mk(gg, 'circle', { cx: 0, cy: 0, r: 16, fill: C.ink }); mk(gg, 'circle', { cx: 0, cy: 0, r: 6, fill: '#fff' }); return gg; };
const rGh = [[], []]; [0, 1].forEach(k => { for (let i = 0; i < 3; i++) rGh[k].push(rider()); });
const rB = [rider(), rider()];
const rV = [PUC.arrow(rs, AC, 7, 20), PUC.arrow(rs, LC, 7, 20)];
const rT = [txt(rs, lane[0] + 34, 0, '3 m/s', { 'font-size': 22, fill: AC, 'font-weight': 600 }), txt(rs, lane[1] + 34, 0, '6 m/s', { 'font-size': 22, fill: LC, 'font-weight': 600 })];
const tRide = T0('R2');
const rY = (k, t) => { const v = k ? 2 : 1, u = M.clamp((t - tRide) / 7); return RY0 - (v * 150 * u) % 330; };
const CH = [[`\\textcolor{${AC}}{\\vec{v}_C} = 3\\,\\text{m/s, north}`, 'cousin'], [`\\text{same direction} \\Rightarrow ${lam} > 0`, 'link 1'], [`6 = 2 \\times 3 \\Rightarrow ${lam} = 2`, 'link 2'], [`\\textcolor{${LC}}{\\vec{v}_{\\text{Aarav}}} = 2\\,\\textcolor{${AC}}{\\vec{v}_C}`, 'so']];
$('#chn').innerHTML = CH.map(([f, w], i) => `<div class="ctag" id="ct${i}" style="top:${86 + i * 120}px">${w.toUpperCase()}</div><div class="fr" id="cf${i}" style="top:${126 + i * 120}px">${K(f)}</div>`).join('');
const tCh = [T0('R2'), wt('R3', 'same'), wt('R4', 'six'), wt('R4', 'So')];

/* ---------- K: side by side ---------- */
const kSide = (svg, neg) => { const o = [neg ? 470 : 200, neg ? 150 : 420], a = PUC.arrow(svg, AC, 6, 18), b = PUC.arrow(svg, LC, 8, 22);
  mk(svg, 'circle', { cx: o[0], cy: o[1], r: 7, fill: NC });
  const L = 100, sh = neg ? 0 : 18, oa = [o[0] + sh, o[1] + sh], end1 = [oa[0] + L * ux, oa[1] + L * uy], end2 = [o[0] + (neg ? -2 : 2) * L * ux, o[1] + (neg ? -2 : 2) * L * uy];
  const la = vlab(svg, 'A', AC, end1[0] + (neg ? 26 : 22), end1[1] + (neg ? -4 : 30), { fs: 28 });
  const lb = vlab(svg, neg ? '−2A' : '2A', LC, end2[0] + (neg ? -10 : 50), end2[1] + (neg ? 50 : 10), { fs: 32 });
  const ln = txt(svg, 600, 120, '', { 'text-anchor': 'end', 'font-size': 26, fill: LC, 'font-weight': 600 }); ln.textContent = '|' + (neg ? '−2A' : '2A') + '| = 2|A|';
  return { o, oa, a, b, la, lb, ln, end1, end2 }; };
const KA = kSide($('#kaS'), false), KS = kSide($('#ksS'), true);
attr(KA.ln, 'x', 748); attr(KA.ln, 'y', 450); attr(KS.ln, 'x', 748); attr(KS.ln, 'y', 450);
const th1 = PUC.think($('#th1'), { q: 'Do 2A and −2A have the same magnitude?', opts: ['Yes', 'No'], right: 0, why: 'Both are twice as long as A. The minus flips only the direction.' });

/* ---------- V: velocity x time ---------- */
const v = $('#vsS'), VX = 200, VB = 480, VT = 110;
mk(v, 'line', { x1: VX, y1: VT - 20, x2: VX, y2: VB + 20, stroke: '#E3E6EC', 'stroke-width': 60, 'stroke-linecap': 'round' });
for (let m = 0; m <= 24; m += 8) { const y = VB - m * 15; mk(v, 'line', { x1: VX + 40, y1: y, x2: VX + 54, y2: y, stroke: C.ink, 'stroke-width': 2 }); txt(v, VX + 62, y + 6, m + ' m', { 'font-size': 18, fill: C.ink }); }
const vGh = [0, 1, 2].map(() => { const gg = mk(v, 'g', {}); mk(gg, 'circle', { cx: 0, cy: 0, r: 16, fill: C.ink }); return gg; });
const vBk = mk(v, 'g', {}); mk(vBk, 'circle', { cx: 0, cy: 0, r: 16, fill: C.ink }); mk(vBk, 'circle', { cx: 0, cy: 0, r: 6, fill: '#fff' });
const vVel = PUC.arrow(v, AC, 7, 20), vDis = PUC.arrow(v, LC, 9, 24);
const vLv = vlab(v, 'v', AC, 0, 0, { fs: 30 }), vLs = vlab(v, 's', LC, VX - 70, (VB + VT) / 2 + 10, { fs: 34 });
const tGo = wt('V3', 'cruises'), tGo1 = tGo + 4.0;
const yAt = t => VB - 360 * M.clamp((t - tGo) / (tGo1 - tGo));
$('#vro').innerHTML = `<span class="k" style="color:${C.ink2}">t</span><span class="v" id="vT">0.0</span><span class="u">s</span><span class="k" style="color:${LC}">s</span><span class="v" id="vS" style="color:${LC}">0</span><span class="u">m</span>`;
$('#vr0').innerHTML = K(`\\textcolor{${AC}}{\\vec{v}} = 6\\,\\text{m/s, north}`);
$('#vr1').innerHTML = K(`\\vec{s} = t\\,\\textcolor{${AC}}{\\vec{v}} = 4\\,\\text{s} \\times 6\\,\\text{m/s}`);
$('#vr2').innerHTML = K(`\\textcolor{${LC}}{\\vec{s}} = \\textcolor{${LC}}{24\\,\\text{m, north}}`);
const th2 = PUC.think($('#th2'), { q: 'Multiply a vector by 0.5. Does its direction change?', opts: ['Yes', 'No'], right: 1, why: '0.5 is positive: it only shrinks. Only a negative number flips it.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`-2${vA} = -2(3\\hat{i} + 4\\hat{j})`)],
  [K(`= -6\\hat{i} - 8\\hat{j}`)],
  [K(`|-2${vA}| = \\sqrt{36 + 64} = \\sqrt{100}`)],
  [K(`= \\textcolor{${LC}}{10} = 2 \\times 5 = 2|${vA}|`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Multiply'), wt('W5', 'So'), wt('W6', 'Its'), wt('W6', 'Root')];
const w = $('#wrS'), WO = [392, 300], WU = 26;
for (let i = -10; i <= 10; i += 2) mk(w, 'line', { x1: WO[0] + i * WU, y1: 80, x2: WO[0] + i * WU, y2: 540, stroke: C.soft, 'stroke-width': 2 });
for (let j = -8; j <= 8; j += 2) mk(w, 'line', { x1: 120, y1: WO[1] - j * WU, x2: 664, y2: WO[1] - j * WU, stroke: C.soft, 'stroke-width': 2 });
mk(w, 'line', { x1: 120, y1: WO[1], x2: 664, y2: WO[1], stroke: C.ink, 'stroke-width': 2 }); mk(w, 'line', { x1: WO[0], y1: 80, x2: WO[0], y2: 540, stroke: C.ink, 'stroke-width': 2 });
txt(w, 672, WO[1] + 6, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: C.ink }); txt(w, WO[0] + 10, 96, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: C.ink });
const wA = PUC.arrow(w, AC, 7, 20), wM = PUC.arrow(w, LC, 8, 22);
const wPa = txt(w, WO[0] + 3 * WU + 14, WO[1] - 4 * WU - 6, '(3, 4)', { 'font-size': 22, fill: AC, 'font-weight': 600 });
const wPm = txt(w, WO[0] - 6 * WU - 14, WO[1] + 8 * WU + 26, '(−6, −8)', { 'text-anchor': 'middle', 'font-size': 22, fill: LC, 'font-weight': 600 });
const wL5 = txt(w, WO[0] + 40, WO[1] - 40, '5', { 'font-size': 24, fill: AC, 'font-weight': 600 }), wL10 = txt(w, WO[0] - 3 * WU - 44, WO[1] + 4 * WU + 4, '10', { 'font-size': 24, fill: LC, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '|−3A| = −3|A|', right: '|−3A| = 3|A|: a length is never negative' });
const tp = $('#tpS'), TO = [270, 120];
const tpA = PUC.arrow(tp, AC, 6, 18), tpM = PUC.arrow(tp, LC, 7, 20);
const tpL = mk(tp, 'path', { d: '', fill: 'none', stroke: C.ok, 'stroke-width': 3 }), tpT = txt(tp, 0, 0, '3|A|, positive', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
mk(tp, 'circle', { cx: TO[0], cy: TO[1], r: 6, fill: NC });
const where = PUC.where($('#wa'), { on: [], type: 'Inside bigger problems: a vector parallel or opposite to a given one' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: K(`\\vec{A} = 2\\hat{i} - \\hat{j} + 2\\hat{k}`) + '. Which vector has magnitude 6 and points opposite to A?', qW: 780,
  opts: [K('4\\hat{i} - 2\\hat{j} + 4\\hat{k}'), K('-2\\hat{i} + \\hat{j} - 2\\hat{k}'), K('-4\\hat{i} + 2\\hat{j} - 4\\hat{k}'), K('-6\\hat{i} + 3\\hat{j} - 6\\hat{k}')], right: 2, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K('|\\vec{A}| = \\sqrt{4+1+4} = 3')], [K('\\text{size } 6 \\Rightarrow \\text{factor } 2')], [K('\\text{opposite} \\Rightarrow \\lambda = -2')], [K('-2\\vec{A} = -4\\hat{i} + 2\\hat{j} - 4\\hat{k}')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'size'), wt('A3', 'We'), wt('A3', 'Opposite'), wt('A3', 'Minus')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · a scalar times a vector', y0: 100, dy: 88, txt: [0, 1, 1, 0],
  lines: [K(`|${lA}| = |${lam}|\\,|${vA}| \\qquad -${vA} = (-1)${vA}`),
    '<b>λ &gt; 0</b>: same direction &nbsp;·&nbsp; <b>λ &lt; 0</b>: opposite &nbsp;·&nbsp; <b>λ = 0</b>: zero vector',
    '<b>Components</b>: every part is multiplied by λ',
    K(`\\vec{s} = t\\,\\textcolor{${AC}}{\\vec{v}} \\qquad \\textcolor{${FC}}{\\vec{F}} = m\\,\\textcolor{${GC}}{\\vec{a}} \\qquad \\vec{p} = m\\,\\textcolor{${AC}}{\\vec{v}}`)] });
const YQ = ['What happens to a vector when you multiply it by −1?', 'Is the magnitude of −5A positive or negative?', 'Why do force and acceleration always point the same way?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 36', topic: 'Split one slanted arrow in two? Resolution of Vectors into Components', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.2, 1.06, 960, 560], [tRepE + 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }

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
    const tUp = wt('H2', 'scales') - 0.1;
    JR.forEach((r, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      grow(r.a, [20, 40, 80, 40], t, tMorph + 0.6 + i * 0.12, 0.4); grow(r.b, [20, 76, 140, 76], t, tUp + i * 0.12, 0.5); op(r.tx, t, tUp + 0.3 + i * 0.12); });
    M.vis($('#hjP'), t, wt('H2', 'shape') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#exH'), t, tH3 + 0.4, 1e9, { dy: 8 });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H3', 'cousin') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25); el.style.background = i === 2 ? mix(C.soft, C.redBg, on) : mix(C.soft, C.ac2, on); el.style.color = i === 2 ? mix(C.ink, C.red, on) : C.ink; });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [wt('P2', 'two'), wt('P2', 'half'), wt('P2', 'minus')].forEach((tt, i) => M.vis($('#lm' + i), t, tt - 0.1, 1e9, POP));
    PUC.write($('#pqF'), t, wt('P3', 'Multiply'), 0.8); PUC.write($('#pqG'), t, wt('P4', 'size') - 0.1, 0.8);
    M.vis($('#pqP'), t, T0('P5') + 0.2, 1e9, POP);
    M.vis($('#pm'), t, T0('P4') + 0.3, out, { dx: 60, dy: 0, ...o });
    const tPos = wt('P5', 'positive'), tNeg = wt('P5', 'negative');
    M.vis($('#ru0'), t, tPos - 0.15, 1e9, { dy: 14 }); M.vis($('#ru1'), t, tNeg - 0.15, 1e9, { dy: 14 }); M.vis($('#ru2'), t, T1('P5') - 0.2, 1e9, { dy: 14 });
    grow(ruS[0].a, [40, 30, 140, 30], t, tPos, 0.4); grow(ruS[0].b, [40, 62, 260, 62], t, tPos + 0.3, 0.5);
    grow(ruS[1].a, [150, 30, 250, 30], t, tNeg, 0.4); grow(ruS[1].b, [150, 62, 30, 62], t, tNeg + 0.3, 0.5);
    grow(ruS[2].a, [150, 22, 250, 22], t, T1('P5') - 0.1, 0.4);
  }

  /* S: dial sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tAin = wt('S2', 'vector') - 0.1, l = lamF(t);
    grow(sA, [O[0], O[1], O[0] + 3 * U * ux, O[1] + 3 * U * uy], t, tAin, 0.6); op(lbA, t, tAin + 0.4);
    const show = t > tTwo - 0.4, L = 3 * U * l;
    if (show) sL.set(O[0], O[1] + 0, O[0] + L * ux, O[1] + L * uy); else sL.set(0, 0, 0, 0);
    ghA.forEach((ga, k) => { const lg = lamF(t - 0.12 * (k + 1)), Lg = 3 * U * lg; if (show && Math.abs(lg - l) > 0.02) { ga.set(O[0], O[1], O[0] + Lg * ux, O[1] + Lg * uy); ga.g.style.opacity = [0.3, 0.2, 0.12][k]; } else ga.set(0, 0, 0, 0); });
    const lp = L + (l >= 0 ? 34 : -34); moveG(lbL, O[0] + lp * ux + (l >= 0 ? 26 : -30), O[1] + lp * uy + 14); lbL.style.opacity = show ? M.clamp((Math.abs(l) - 0.15) / 0.2) : 0;
    const zon = show ? 1 - M.clamp(Math.abs(l) / 0.08) : 0; zDot.style.opacity = zon.toFixed(3); zTx.style.opacity = (show && t > tZ - 0.2 && t < tS6 + 1) ? zon.toFixed(3) : 0;
    attr(knob, 'cx', SLx(l).toFixed(1)); attr(fill, 'x1', SLx(Math.min(0, l)).toFixed(1)); attr(fill, 'x2', SLx(Math.max(0, l)).toFixed(1)); attr(fill, 'stroke', l < 0 ? C.red : LC);
    M.setT($('#rvL'), fmt(l)); M.setT($('#rvS'), fmt(Math.abs(3 * l))); M.setT($('#rvD'), Math.abs(l) < 0.01 ? 'none' : l > 0 ? 'NE' : 'SW');
    $('#rvD').style.color = l < -0.01 ? C.red : C.ink;
    roNote.innerHTML = Math.abs(l) < 0.01 ? '<span style="color:var(--mute)">zero vector: no size, no direction</span>' : l > 0 ? '<span style="color:var(--mute)">λ positive: same direction as A</span>' : '<span style="color:var(--red)">λ negative: flipped to the opposite side</span>';
    M.vis(roNote, t, tTwo, 1e9, { dy: 8 });
    // graph: |lambda A| vs lambda, drawn over the lambdas visited so far
    let lo = 1, hi = 1; for (let i = 0; i <= 50; i++) { const x = lamF(tS1 + (t - tS1) * i / 50); lo = Math.min(lo, x); hi = Math.max(hi, x); }
    const vline = x => [x + 1, Math.abs(3 * x)];
    gc(x => vline(x), t > tTwo - 0.4 ? lo : 1, t > tTwo - 0.4 ? hi : 1, 80); gd(l + 1, Math.abs(3 * l), t > tAin);
    op(gV, t, wt('S7', 'V') + 0.2);
    op($('#slo'), t, tRep - 0.2, tRepE);
    avA(t, wt('S6', 'west') + 0.3, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 200], [tStep[2] - 0.1, 316], [tStep[3] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[3] - 0.5, 1e9, { dx: 60, dy: 0 });
    const t2i = wt('D5', 'two', 1), t2a = wt('D5', 'four');
    grow(dA1, [DO[0], DO[1], DO[0] + 2 * DU, DO[1] - 3 * DU], t, t2i - 0.4); op(dLA, t, t2i);
    M.draw(dx1, t, t2i, 0.4); M.draw(dy1, t, t2i + 0.3, 0.4);
    grow(dA2, [DO[0], DO[1], DO[0] + 4 * DU, DO[1] - 6 * DU], t, t2a - 0.2, 0.7); op(dLL, t, t2a + 0.3);
    M.draw(dx2, t, t2a, 0.5); M.draw(dy2, t, wt('D5', 'six') - 0.2, 0.5); op(dT1, t, wt('D5', 'six') + 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'negative') - 0.15, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'flips') + 0.1, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cl'), t, tC1 + 0.3, OUT('R1'), { dy: 36, ...o });
    LW.forEach((r, i) => { const tt = tLaw[i]; M.vis($('#lw' + i), t, tt - 0.2, 1e9, { dx: -24, dy: 0 });
      grow(r.v, [20, 34, 160, 34], t, tt + 0.2, 0.4); op(r.t1, t, tt + 0.4); grow(r.r, [20, 66, 400, 66], t, tt + 0.9, 0.6); op(r.t2, t, tt + 1.3); });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rs'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1].forEach(k => { const y = rY(k, t); moveG(rB[k], lane[k], y); op(rB[k], t, tR1 + 0.3);
      rGh[k].forEach((gg, j) => { const yg = rY(k, t - 0.14 * (j + 1)); moveG(gg, lane[k], yg); gg.style.opacity = (t > tRide && yg > y && yg - y < 80) ? [0.3, 0.2, 0.12][j] : 0; });
      const vu = M.o3((t - tRide - k * 0.4) / 0.5) * (k ? 1 : 1); rV[k].set(lane[k], y - 22, lane[k], y - 22 - (k ? 120 : 60) * vu); attr(rT[k], 'y', (y - 22 - (k ? 120 : 60) / 2 + 8).toFixed(1)); op(rT[k], t, tRide + 0.3 + k * 0.4); });
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    tCh.forEach((tt, i) => { M.vis($('#ct' + i), t, tt - 0.15, 1e9, { dy: 8 }); PUC.write($('#cf' + i), t, tt, 0.7); });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [[KA, tK1 + 0.4, wt('K1', 'Two')], [KS, T0('K2') + 0.1, wt('K2', 'Minus')]].forEach(([S, ta, tb]) => {
      grow(S.a, [...S.oa, ...S.end1], t, ta, 0.4); op(S.la, t, ta + 0.3); grow(S.b, [...S.o, ...S.end2], t, tb + 0.2, 0.7); op(S.lb, t, tb + 0.6); op(S.ln, t, tb + 1.0); });
    M.vis($('#kaC'), t, wt('K1', 'same') - 0.1, 1e9, POP);
    M.vis($('#ks'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#ksC'), t, wt('K2', 'opposite') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'magnitude') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Both') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V5');
    M.vis($('#vs'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const y = yAt(t); moveG(vBk, VX, y); op(vBk, t, tV1 + 0.3);
    vGh.forEach((gg, k) => { const yg = yAt(t - 0.14 * (k + 1)); moveG(gg, VX, yg); gg.style.opacity = Math.abs(yg - y) > 3 ? [0.3, 0.2, 0.12][k] : 0; });
    const vu = M.o3((t - tGo + 0.2) / 0.4); if (t < tGo1 + 0.3) vVel.set(VX, y - 22, VX, y - 22 - 70 * vu); else vVel.set(0, 0, 0, 0);
    moveG(vLv, VX - 34, y - 40); op(vLv, t, tGo, tGo1 + 0.3);
    if (t > tGo) vDis.set(VX - 46, VB, VX - 46, y); else vDis.set(0, 0, 0, 0); op(vLs, t, tGo1 - 0.3);
    const tt = M.clamp((t - tGo) / (tGo1 - tGo)) * 4;
    M.vis($('#vro'), t, tGo - 0.2, 1e9, { dy: 8 }); M.setT($('#vT'), tt.toFixed(1)); M.setT($('#vS'), Math.round(6 * tt) + '');
    M.vis($('#vr'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#exV'), t, T0('V3'), 1e9, { dy: 8 });
    PUC.write($('#vr0'), t, T0('V3') + 0.2, 0.7); PUC.write($('#vr1'), t, wt('V4', 'Four') - 0.1, 0.8); PUC.write($('#vr2'), t, wt('V4', 'twenty') - 0.1, 0.7);
    M.vis($('#vrP'), t, wt('V4', 'displacement') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tV5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV5, tOpts: wt('V5', 'direction') - 0.1, tCount: T1('V5') + 0.05, dur: 3, tAns: T0('V6') - 0.02, tWhy: wt('V6', 'Zero') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    grow(wA, [...WO, WO[0] + 3 * WU, WO[1] - 4 * WU], t, T0('W2') + 0.6, 0.6); op(wPa, t, T0('W2') + 1.0);
    grow(wM, [...WO, WO[0] - 6 * WU, WO[1] + 8 * WU], t, wt('W4', 'Minus') + 0.2, 0.9); op(wPm, t, T0('W5'));
    op(wL5, t, wt('W6', 'two') - 0.2); op(wL10, t, wt('W6', 'ten') - 0.1);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'multiplying') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'size') - 0.1 });
    grow(tpA, [...TO, TO[0] + 70, TO[1]], t, T0('X2') + 0.3, 0.4);
    grow(tpM, [...TO, TO[0] - 210, TO[1]], t, wt('X3', 'minus') - 0.1, 0.6);
    const lu = M.o3((t - wt('X3', 'three', 1)) / 0.5); attr(tpL, 'd', lu > 0 ? `M${TO[0]},${TO[1] + 34} v10 h${(-210 * lu).toFixed(1)} v-10` : ''); attr(tpT, 'x', TO[0] - 105); attr(tpT, 'y', TO[1] + 76); op(tpT, t, wt('X3', 'three', 1) + 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Inside') });
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
