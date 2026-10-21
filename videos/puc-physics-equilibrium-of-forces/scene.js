// PUC Physics Ep 58: Equilibrium of forces (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, TH = C.gold;   // every force orange, a red, v blue, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const TT = tc(FC, 'T'), T1s = tc(FC, 'T_1'), T2s = tc(FC, 'T_2'), WW = tc(FC, 'W'), th = tc(TH, '\\theta'), FF = tc(FC, '\\vec{F}');
const rad = d => d * Math.PI / 180, f1 = v => v.toFixed(1);
const hatch = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 24) mk(p, 'line', { x1: x, y1: y, x2: x - 12, y2: y - 12, stroke: C.dim, 'stroke-width': 2 }); };
const lampG = (p, x, y, s = 1) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: `M${x - 44 * s},${y + 48 * s} L${x - 18 * s},${y} H${x + 18 * s} L${x + 44 * s},${y + 48 * s} Z`, fill: C.ink, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); mk(g, 'path', { d: `M${x - 16 * s},${y + 48 * s} a${16 * s},${12 * s} 0 0 0 ${32 * s},0`, fill: '#F2C94C', stroke: C.ink, 'stroke-width': 2.5 }); return g; };

Object.assign(M.IC, {
  lamp: ['M9 2h6l3 8H6z', 'M12 10v3', 'M9.5 16a2.5 2.5 0 0 0 5 0', 'M12 2V0'],
  rope: ['M2 12c3-3 5 3 8 0s5 3 8 0 3-1 4 0', 'M2 9v6', 'M22 9v6'],
  bridge: ['M2 18h20', 'M4 18V11', 'M20 18V11', 'M2 11c5-6 15-6 20 0', 'M9 18v-6', 'M15 18v-6'],
  drop: ['M12 2.7c3 3.8 6 7.3 6 11.3a6 6 0 0 1-12 0c0-4 3-7.5 6-11.3Z'],
  bag: ['M5 8h14l-1 13H6z', 'M9 8V6a3 3 0 0 1 6 0v2'],
  sag: ['M2 6c6 10 14 10 20 0', 'M12 14v5'],
  pull: ['M2 12h7', 'm6 9 3 3-3 3', 'M22 12h-7', 'm18 9-3 3 3 3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK4 = T0('K4'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['lamp', 'Hanging lamp', 'HANGS STILL', 'lamp'], ['rope', 'Tug of war', 'STOPS DEAD', 'tug'], ['bridge', 'Bridge', 'HOLDS UP A BUS', 'bridge']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="240" height="100"></svg></div>`).join('');
// balanced force pairs in each row: [x1,y1,x2,y2] from a centre dot
const JP = [[[120, 50, 120, 10], [120, 50, 120, 90]], [[120, 50, 40, 50], [120, 50, 200, 50]], [[120, 50, 120, 92], [60, 50, 60, 12], [180, 50, 180, 12]]];
const JA = JP.map((L, i) => { const s = $('#jsv' + i); if (i === 2) mk(s, 'line', { x1: 40, y1: 50, x2: 200, y2: 50, stroke: C.ink, 'stroke-width': 4 }); mk(s, 'circle', { cx: 120, cy: 50, r: 7, fill: C.ink }); return L.map(q => ({ a: PUC.arrow(s, FC, 5, 14), q })); });
const TILES = [[C.ink, 'Pulls tighter', 'pull'], [C.ink, 'Still sags', 'sag'], [C.ac, 'Why never straight?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'tighter'), wt('H4', 'Still'), wt('H4', 'Why')];
// rope across the window in the picture
const hk = $('#hkS'), HA = [40, 64], HB = [480, 64];
[HA, HB].forEach(([x, y]) => { mk(hk, 'circle', { cx: x, cy: y, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); });
const hRope = mk(hk, 'path', { d: '', fill: 'none', stroke: '#8B5A2B', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const hBagO = mk(hk, 'g', {}), hBag = mk(hBagO, 'g', {});
mk(hBag, 'line', { x1: 0, y1: 0, x2: 0, y2: 20, stroke: C.ink, 'stroke-width': 3 });
mk(hBag, 'path', { d: 'M-14,28 a14,14 0 0 1 28,0', fill: 'none', stroke: C.ink, 'stroke-width': 4 });
mk(hBag, 'rect', { x: -36, y: 24, width: 72, height: 62, rx: 10, fill: VC, stroke: C.ink, 'stroke-width': 3 });
mk(hBag, 'rect', { x: -22, y: 44, width: 44, height: 22, rx: 4, fill: '#fff', opacity: 0.35 });
const hTag = txt(hk, 260, 380, '', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
const hAng = M.keys([[0, 24], [wt('H4', 'tighter') + 0.1, 13], [wt('H4', 'tighter', 1) + 0.1, 7]], 0.7);

/* ---------- P: equilibrium + two forces ---------- */
$('#pF').innerHTML = K(`\\sum ${FF} = 0`);
const PR = [['zap', 'No acceleration', `<span class="ar">a = 0</span>`, wt('P3', 'acceleration')], ['pin', 'Stays at rest', `<span class="vb">v = 0</span>`, wt('P3', 'rest')], ['arrowR', 'Or moves at a steady velocity', `<span class="vb">v = const</span>`, wt('P3', 'steady')]];
$('#prs').innerHTML = PR.map(([ic, n, v], i) => `<div class="prow" id="pr${i}" style="top:${262 + i * 100}px"><i>${M.icon(ic, 26, i ? VC : AC, 2.4)}</i><div class="pn">${n}</div><div class="pv">${v}</div></div>`).join('');
const pm = $('#pmS'), LX = 250, LY = 290;
hatch(pm, 150, 350, 100);
const pCord = mk(pm, 'line', { x1: LX, y1: 100, x2: LX, y2: LY, stroke: C.ink, 'stroke-width': 3 });
const pLamp = lampG(pm, LX, LY);
const pT = PUC.arrow(pm, FC, 7, 20), pW = PUC.arrow(pm, FC, 7, 20);
const pTl = it(pm, LX + 18, LY - 96, 'T', FC), pWl = it(pm, LX + 18, LY + 166, 'W', FC);
const pLine = mk(pm, 'line', { x1: LX, y1: 70, x2: LX, y2: 520, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const pLl = txt(pm, LX + 14, 540, 'ONE LINE OF ACTION', { 'font-size': 16, 'letter-spacing': 1.5 });
$('#pmF').innerHTML = K(`${TT} = ${WW}`);
const pTags = [['EQUAL', 434, 150, C.soft, C.ink], ['OPPOSITE', 434, 210, C.soft, C.ink], ['SAME LINE', 434, 270, C.soft, C.ink]].map(([s, x, y]) => { const d = document.createElement('div'); d.className = 'tg'; d.style.cssText = `left:${x}px;top:${y}px;background:var(--soft);color:var(--ink)`; d.textContent = s; $('#pm').appendChild(d); return d; });
const tPt = [wt('P6', 'equal'), wt('P6', 'opposite'), wt('P6', 'line')];

/* ---------- S: the hanging bag sim ---------- */
const s = $('#simS'), HY = 140, HS = 170, KX = 392, FS = 2.6;           // hooks at KX +- HS, 2.2 px per newton
const W = 19.6, Tof = d => W / (2 * Math.sin(rad(d)));
[KX - HS, KX + HS].forEach(x => { mk(s, 'rect', { x: x - 22, y: HY - 58, width: 44, height: 50, rx: 6, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'circle', { cx: x, cy: HY, r: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); });
const hz = mk(s, 'line', { x1: KX - 150, y1: 0, x2: KX + 150, y2: 0, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const st1 = mk(s, 'line', { x1: KX - HS, y1: HY, x2: KX, y2: HY, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const st2 = mk(s, 'line', { x1: KX + HS, y1: HY, x2: KX, y2: HY, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const bagDraw = (p, op) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: 0, y1: 0, x2: 0, y2: 40, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'rect', { x: -44, y: 40, width: 88, height: 72, rx: 12, fill: op ? C.ink : VC, stroke: C.ink, 'stroke-width': 3, opacity: op || 1 }); if (!op) { mk(g, 'rect', { x: -26, y: 66, width: 52, height: 26, rx: 5, fill: '#fff', opacity: 0.35 }); txt(g, 0, 109, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 16 }); } return g; };
const ghosts = [0.3, 0.2, 0.12].map(o => { const g = bagDraw(s, 1); g.style.opacity = 0; return g; });
const bagO = mk(s, 'g', {}), bag = bagDraw(bagO, 0);
mk(s, 'circle', { cx: 0, cy: 0, r: 0 });
const knot = mk(s, 'circle', { cx: KX, cy: HY, r: 7, fill: C.ink });
const arc = mk(s, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 });
const arcL = it(s, 0, 0, 'θ', TH, { 'font-size': 26 });
const aT1 = PUC.arrow(s, FC, 6, 18), aT2 = PUC.arrow(s, FC, 6, 18), aW = PUC.arrow(s, FC, 6, 18);
const lT1 = it(s, 0, 0, 'T₁', FC, { 'font-size': 26, 'text-anchor': 'middle' }), lT2 = it(s, 0, 0, 'T₂', FC, { 'font-size': 26, 'text-anchor': 'middle' }), lW = it(s, 0, 0, 'W', FC, { 'font-size': 26 });
// components (slow-mo replay)
const cH1 = PUC.arrow(s, FC, 4, 14), cH2 = PUC.arrow(s, FC, 4, 14), cV1 = PUC.arrow(s, FC, 4, 14), cV2 = PUC.arrow(s, FC, 4, 14);
[cH1, cH2, cV1, cV2].forEach(c => c.g.setAttribute('opacity', 0.75));
const CP = [['Sideways', `<span class="fo">T</span> cos <span class="th">θ</span> = <b class="mono fo">36.6 N</b> each way`, 'cancel'], ['Upward', `<span class="fo">T</span> sin <span class="th">θ</span> = <b class="mono fo">9.8 N</b> each, 2 × 9.8 = <span class="fo">W</span>`, 'hold W']];
$('#sim').insertAdjacentHTML('beforeend', CP.map(([a, b, c], i) => `<div class="cp" id="cp${i}" style="top:${404 + i * 76}px"><span class="cpa">${a}</span><span class="cpb">${b}</span><span class="cpc">${c}</span></div>`).join(''));
// theta timeline
const tA30 = wt('S3', 'thirty') - 0.9, tA10 = wt('S4', 'ten') - 0.6, tA5 = wt('S4', 'five') - 0.4;
const tFz = wt('S6', 'Freeze') + 0.05, tRes = wt('S8', 'whole') + 0.4;
const angN = M.keys([[0, 60], [tA30, 30], [tA10, 10], [tA5, 5]], 0.9);
function ang(t) {
  if (t < tS6) return angN(t);
  if (t < tFz) return 30 - 15 * M.io(M.clamp((t - tS6) / (tFz - tS6)));      // replay: 30 -> 15 at 0.25x
  if (t < tRes) return 15;
  return 15 - 5 * M.io((t - tRes) / 1.6);
}
const moving = t => Math.abs(ang(t) - ang(t - 0.05)) > 0.02;
$('#roA').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r_th" style="color:${TH}">60</span><span class="u">deg</span>
  <span class="k" style="color:${FC}">T<sub>1</sub></span><span class="v" id="r_t1" style="color:${FC}">11.3</span><span class="u">N</span>
  <span class="k" style="color:${FC}">T<sub>2</sub></span><span class="v" id="r_t2" style="color:${FC}">11.3</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">W</span><span class="v" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k" style="color:${C.ink}">ΣF<sub>x</sub></span><span class="v" id="r_fx">0.0</span><span class="u">N</span>
  <span class="k" style="color:${C.ink}">ΣF<sub>y</sub></span><span class="v" id="r_fy">0.0</span><span class="u">N</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 540, h: 156, xmax: 90, ymax: 120, xt: [0, 30, 60, 90], yt: [0, 40, 80], yl: 'T (N)' });
txt($('#grS'), 110 + 540 + 18, 64 + 156 + 6, 'θ (deg)', { fill: TH, 'font-size': 18 });
const gWl = mk($('#grS'), 'line', { x1: g.X(0), y1: g.Y(W), x2: g.X(90), y2: g.Y(W), stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const gWt = txt($('#grS'), g.X(90) + 10, g.Y(W) + 6, 'W', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const gGuide = mk($('#grS'), 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '3 7' });
{ let d = ''; for (let a = 4.7; a <= 90; a += 0.5) d += (d ? 'L' : 'M') + g.X(a).toFixed(1) + ',' + g.Y(Tof(a)).toFixed(1); attr(gGuide, 'd', d); }
const gCurve = g.curve(FC, 5), gDot = g.dot(FC, 11);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px;background:var(--redBg);color:var(--red)'; gTag.innerHTML = 'flatter &nbsp;&rarr;&nbsp; T shoots up'; $('#gr').appendChild(gTag);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So pulling harder only makes it worse!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`\\sum ${FF} = 0`, 'equilibrium: the net force is zero'],
  [`\\sum F_x = 0, \\quad \\sum F_y = 0`, 'each direction on its own'],
  [`${T1s}\\cos${th} = ${T2s}\\cos${th} \\;\\Rightarrow\\; ${T1s} = ${T2s} = ${TT}`, 'the sideways parts cancel'],
  [`2${TT}\\sin${th} = ${WW}`, 'the upward parts hold the weight'],
  [`${TT} = ${WW} \\,/\\, (2\\sin${th})`, 'the tension in each string']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 'Step'));
const dr = $('#drS'), DX = 392, DY = 300, DL = 150, DA = 30;
mk(dr, 'line', { x1: 60, y1: DY, x2: 724, y2: DY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
mk(dr, 'line', { x1: DX, y1: 80, x2: DX, y2: 450, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
txt(dr, 724, DY - 10, 'x', { 'text-anchor': 'end', 'font-size': 18 }); txt(dr, DX + 10, 96, 'y', { 'font-size': 18 });
const cA = Math.cos(rad(DA)), sA = Math.sin(rad(DA));
mk(dr, 'line', { x1: DX, y1: DY, x2: DX - 250 * cA, y2: DY - 250 * sA, stroke: C.ink, 'stroke-width': 3 });
mk(dr, 'line', { x1: DX, y1: DY, x2: DX + 250 * cA, y2: DY - 250 * sA, stroke: C.ink, 'stroke-width': 3 });
mk(dr, 'line', { x1: DX, y1: DY, x2: DX, y2: DY + 40, stroke: C.ink, 'stroke-width': 3 });
const dBag = mk(dr, 'g', {}); mk(dBag, 'rect', { x: DX - 34, y: DY + 40, width: 68, height: 58, rx: 10, fill: VC, stroke: C.ink, 'stroke-width': 3 });
mk(dr, 'circle', { cx: DX, cy: DY, r: 7, fill: C.ink });
const dT1 = PUC.arrow(dr, FC, 6, 18), dT2 = PUC.arrow(dr, FC, 6, 18), dW = PUC.arrow(dr, FC, 6, 18);
dT1.set(DX, DY, DX - DL * cA, DY - DL * sA); dT2.set(DX, DY, DX + DL * cA, DY - DL * sA); dW.set(DX + 70, DY + 10, DX + 70, DY + 10 + DL);
it(dr, DX - DL * cA - 50, DY - DL * sA - 6, 'T₁', FC, { 'font-size': 28 }); it(dr, DX + DL * cA + 14, DY - DL * sA - 6, 'T₂', FC, { 'font-size': 28 }); it(dr, DX + 84, DY + 10 + DL - 10, 'W', FC, { 'font-size': 28 });
mk(dr, 'path', { d: `M${DX + 70},${DY} A70,70 0 0 0 ${DX + 70 * cA},${DY - 70 * sA}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
it(dr, DX + 80, DY - 18, 'θ', TH, { 'font-size': 24 });
const dHc = [mk(dr, 'line', { x1: DX, y1: DY - 2, x2: DX - DL * cA, y2: DY - 2, stroke: FC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 }), mk(dr, 'line', { x1: DX, y1: DY - 2, x2: DX + DL * cA, y2: DY - 2, stroke: FC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 })];
const dHl = [txt(dr, DX - 92, DY + 30, 'T₁ cos θ', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 18 }), txt(dr, DX + 92, DY + 30, 'T₂ cos θ', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 18 })];
const dVc = [mk(dr, 'line', { x1: DX - DL * cA, y1: DY, x2: DX - DL * cA, y2: DY - DL * sA, stroke: FC, 'stroke-width': 4, 'stroke-dasharray': '6 6' }), mk(dr, 'line', { x1: DX + DL * cA, y1: DY, x2: DX + DL * cA, y2: DY - DL * sA, stroke: FC, 'stroke-width': 4, 'stroke-dasharray': '6 6' })];
const dVl = [txt(dr, DX - DL * cA - 10, DY - 30, 'T sin θ', { 'text-anchor': 'end', fill: FC, 'font-weight': 600, 'font-size': 19 }), txt(dr, DX + DL * cA + 10, DY - 30, 'T sin θ', { fill: FC, 'font-weight': 600, 'font-size': 19 })];
$('#drF').innerHTML = K(`${TT} = \\dfrac{${WW}}{2\\sin${th}}`) + `<span style="font:500 24px Poppins;color:var(--mute);margin-left:20px">tension in each string</span>`;
$('#stF').innerHTML = K(`\\sum F_x = 0, \\qquad \\sum F_y = 0`);

/* ---------- R: link by link ---------- */
const LK = [['Flatter strings', wt('R2', 'Flatter')], [`Smaller angle <span class="th">θ</span>, so smaller sin <span class="th">θ</span>`, wt('R2', 'smaller')], ['Smaller upward part from each string', wt('R3', 'upward')], [`To hold <span class="fo">W</span>, the tension <span class="fo">T</span> must grow`, wt('R3', 'grow') - 0.4], [`<span class="th">θ</span> = 0: no upward part at all`, wt('R5', 'zero')]];
$('#lks').innerHTML = LK.map(([s0], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 84}px"><div class="ln">${i + 1}</div><div class="lt">${s0}</div></div>`).join('') +
  `<div class="pillp bad" id="lkP" style="left:36px;top:504px">The rope can never be perfectly straight</div>`;
const TB = [[60, 0.866, '11.3 N'], [30, 0.5, '19.6 N'], [10, 0.174, '56.4 N'], [1, 0.017, '561.5 N'], [0, 0, 'none']];
$('#tbs').innerHTML = TB.map(([a, sn, tv], i) => `<div class="tb" id="tb${i}" style="top:${120 + i * 70}px"><span class="th" style="left:36px">${a}°</span><span style="left:294px">${sn === 0 ? '0' : sn.toFixed(3)}</span><span class="fo" style="left:524px">${tv}</span></div>`).join('');
const tTb = [wt('R2', 'Flatter'), wt('R2', 'smaller') + 0.3, wt('R2', 'sine'), wt('R3', 'grow') - 0.2, wt('R5', 'zero')];
const rr = $('#rrS');
const rrP = document.createElement('div'); rrP.className = 'pillp bad'; rrP.style.cssText = 'left:36px;top:504px'; rrP.innerHTML = `sin 0 = 0: no <span class="fo">T</span> can hold <span class="fo">W</span>`; $('#rr').appendChild(rrP);

/* ---------- K: two forces vs three forces ---------- */
const k2 = $('#k2S'), KLX = 300, KLY = 250;
hatch(k2, 200, 400, 100); mk(k2, 'line', { x1: KLX, y1: 100, x2: KLX, y2: KLY, stroke: C.ink, 'stroke-width': 3 });
const k2L = lampG(k2, KLX, KLY);
const k2T = PUC.arrow(k2, FC, 7, 20), k2W = PUC.arrow(k2, FC, 7, 20);
const k2Tl = it(k2, KLX + 20, KLY - 60, 'F₁ = T', FC, { 'font-size': 26 }), k2Wl = it(k2, KLX + 20, KLY + 150, 'F₂ = W', FC, { 'font-size': 26 });
$('#k2P').innerHTML = `${K(`\\vec{F}_1 + \\vec{F}_2 = 0`)}<span style="font:500 22px Poppins;color:var(--mute)">equal, opposite, one line</span>`;
const k3 = $('#k3S'), KN = [210, 290], KLN = 160, c30 = Math.cos(rad(30)), s30 = 0.5;
mk(k3, 'line', { x1: KN[0], y1: KN[1], x2: KN[0] - 190 * c30, y2: KN[1] - 190 * s30, stroke: C.ink, 'stroke-width': 3 });
mk(k3, 'line', { x1: KN[0], y1: KN[1], x2: KN[0] + 190 * c30, y2: KN[1] - 190 * s30, stroke: C.ink, 'stroke-width': 3 });
mk(k3, 'line', { x1: KN[0], y1: KN[1], x2: KN[0], y2: KN[1] + 36, stroke: C.ink, 'stroke-width': 3 });
mk(k3, 'rect', { x: KN[0] - 30, y: KN[1] + 36, width: 60, height: 50, rx: 9, fill: VC, stroke: C.ink, 'stroke-width': 3 });
mk(k3, 'circle', { cx: KN[0], cy: KN[1], r: 7, fill: C.ink });
// vectors: T2 (up-right), W (down), T1 (up-left); triangle start P0
const VEC = [[KLN * c30, -KLN * s30, 'T₂'], [0, KLN, 'W'], [-KLN * c30, -KLN * s30, 'T₁']];
const P0 = [450, 370];
const triS = []; { let p = P0.slice(); VEC.forEach(([dx, dy]) => { triS.push(p.slice()); p = [p[0] + dx, p[1] + dy]; }); }
const TRC = [(triS[0][0] + triS[1][0] + triS[2][0]) / 3, (triS[0][1] + triS[1][1] + triS[2][1]) / 3];
const k3A = VEC.map(() => PUC.arrow(k3, FC, 7, 20));
const k3L = VEC.map(([, , n]) => it(k3, 0, 0, n, FC, { 'font-size': 24, 'text-anchor': 'middle' }));
const k3Tri = mk(k3, 'path', { d: `M${P0[0]},${P0[1]} L${triS[1][0]},${triS[1][1]} L${triS[2][0]},${triS[2][1]} Z`, fill: C.ac3, stroke: 'none', opacity: 0 });
k3.insertBefore(k3Tri, k3.firstChild);
const k3V = txt(k3, 0, 0, '19.6 N each', { fill: FC, 'font-weight': 600, 'font-size': 20 });
$('#k3P').innerHTML = `${K(`\\vec{F}_1 + \\vec{F}_2 + \\vec{F}_3 = 0`)}<span style="font:500 22px Poppins;color:var(--mute)">a closed triangle</span>`;
const th1 = PUC.think($('#th1'), { q: 'Can forces of 3 N, 4 N and 9 N keep a ring in equilibrium?', opts: ['Yes', 'No'], right: 1, why: '3 + 4 = 7 can never reach 9, so the triangle cannot close.' });

/* ---------- V: moving in equilibrium vs at rest, not in equilibrium ---------- */
const v1 = $('#v1S'), RX = 300, RY0 = 200, RY1 = 420, RV = 120;      // drop falls at a steady 120 px/s on screen
const dropP = (p) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M0,-34 C14,-14 24,0 24,12 A24,24 0 0 1 -24,12 C-24,0 -14,-14 0,-34 Z', fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 2.5 }); return g; };
const dGh = [0.3, 0.2, 0.12].map(o => { const gg = dropP(v1); gg.setAttribute('opacity', o); return gg; });
const dropO = mk(v1, 'g', {}), drop = dropP(dropO);
const vDr = PUC.arrow(v1, FC, 6, 18), vWt = PUC.arrow(v1, FC, 6, 18), vV = PUC.arrow(v1, VC, 6, 18);
const vDl = txt(v1, 0, 0, 'drag', { fill: FC, 'font-weight': 600, 'font-size': 20 }), vWl = txt(v1, 0, 0, 'W', { fill: FC, 'font-weight': 600, 'font-size': 20 }), vVl = it(v1, 0, 0, 'v', VC, { 'font-size': 26 });
const vRo = document.createElement('div'); vRo.className = 'ro2'; vRo.style.cssText = 'left:500px;top:110px;width:248px'; vRo.innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" style="color:${VC}">steady</span><span class="u"></span><span class="k" style="color:${AC}">a</span><span class="v" style="color:${AC}">0</span><span class="u">m/s²</span><span class="k" style="color:${FC}">F<sub>net</sub></span><span class="v" style="color:${FC}">0</span><span class="u">N</span>`; $('#v1').appendChild(vRo);
$('#v1P').innerHTML = `${M.icon('check', 24, C.ok, 3)}<span>Moving, yet the net force is zero</span>`;
const v2 = $('#v2S'), BX = 300, BTOP = 210, BG = 470;
mk(v2, 'line', { x1: 60, y1: BG, x2: 724, y2: BG, stroke: C.ink, 'stroke-width': 3 });
const bGh = [0.3, 0.2, 0.12].map(o => mk(v2, 'circle', { cx: BX, cy: BG - 30, r: 28, fill: C.ink, opacity: 0 }));
const ballC = mk(v2, 'circle', { cx: BX, cy: BG - 30, r: 28, fill: C.ink });
const bW = PUC.arrow(v2, FC, 6, 18), bA = PUC.arrow(v2, AC, 6, 18);
const bWl = txt(v2, 0, 0, 'W', { fill: FC, 'font-weight': 600, 'font-size': 20 }), bAl = it(v2, 0, 0, 'a = g', AC, { 'font-size': 24 });
const bQ = txt(v2, BX - 40, BTOP - 60, 'nothing pushes up', { 'text-anchor': 'end', fill: AC, 'font-weight': 600, 'font-size': 19 });
const bRo = document.createElement('div'); bRo.className = 'ro2'; bRo.style.cssText = 'left:500px;top:110px;width:248px'; bRo.innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" style="color:${VC}" id="b_v">0</span><span class="u">m/s</span><span class="k" style="color:${AC}">a</span><span class="v" style="color:${AC}">9.8</span><span class="u">m/s² ↓</span><span class="k" style="color:${FC}">F<sub>net</sub></span><span class="v" style="color:${FC}">W</span><span class="u">↓</span>`; $('#v2').appendChild(bRo);
$('#v2P').innerHTML = `${M.icon('x', 24, C.red, 3)}<span>At rest for an instant, net force = <span class="fo">W</span></span>`;
const tBall = wt('V2', 'thrown') - 0.1, tTop = wt('V2', 'top') + 0.05;
const th2 = PUC.think($('#th2'), { q: 'A parachutist drifts down at a steady 5 m/s. Is she in equilibrium?', opts: ['Yes', 'No'], right: 0, why: 'Steady velocity means a = 0: the drag balances her weight.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ${K('5\\ \\text{kg}')} lamp hangs from two wires at ${K(tc(TH, '30^\\circ'))} and ${K(tc(TH, '60^\\circ'))} to the ceiling. Find both tensions. ${K('(g = 9.8\\ \\text{m/s}^2)')}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${WW} = 5 \\times 9.8 = ${tc(FC, '49\\ \\text{N}')}`)],
  [K(`${T1s}\\cos 30^\\circ = ${T2s}\\cos 60^\\circ \\Rightarrow ${T2s} = \\sqrt{3}\\,${T1s}`)],
  [K(`${T1s}\\sin 30^\\circ + ${T2s}\\sin 60^\\circ = 49 \\Rightarrow 2${T1s} = 49`)],
  [K(`${T1s} = ${tc(FC, '24.5\\ \\text{N}')}, \\;\\; ${T2s} \\approx ${tc(FC, '42.4\\ \\text{N}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WX = 470, WY = 270, CY = 120, WS = 3;     // 3 px per newton
hatch(w, 60, 724, CY);
const a1x = WX - (WY - CY) / Math.tan(rad(30)), a2x = WX + (WY - CY) / Math.tan(rad(60));
const wW1 = mk(w, 'line', { x1: a1x, y1: CY, x2: WX, y2: WY, stroke: C.ink, 'stroke-width': 3 }), wW2 = mk(w, 'line', { x1: a2x, y1: CY, x2: WX, y2: WY, stroke: C.ink, 'stroke-width': 3 });
mk(w, 'path', { d: `M${a1x + 56},${CY} A56,56 0 0 1 ${a1x + 56 * Math.cos(rad(30))},${CY + 56 * Math.sin(rad(30))}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
mk(w, 'path', { d: `M${a2x - 46},${CY} A46,46 0 0 0 ${a2x - 46 * Math.cos(rad(60))},${CY + 46 * Math.sin(rad(60))}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
txt(w, a1x + 66, CY + 30, '30°', { fill: TH, 'font-weight': 600, 'font-size': 20 }); txt(w, a2x - 92, CY + 34, '60°', { fill: TH, 'font-weight': 600, 'font-size': 20 });
const wLamp = lampG(w, WX, WY, 0.7); mk(w, 'circle', { cx: WX, cy: WY, r: 6, fill: C.ink });
const wT1 = PUC.arrow(w, FC, 6, 18), wT2 = PUC.arrow(w, FC, 6, 18), wWa = PUC.arrow(w, FC, 6, 18);
const wT1l = txt(w, 0, 0, '', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' }), wT2l = txt(w, 0, 0, '', { fill: FC, 'font-weight': 700, 'font-size': 22 }), wWl = txt(w, WX + 46, WY + 110, 'W = 49 N', { fill: FC, 'font-weight': 700, 'font-size': 22 });
const avW = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The steeper wire does more of the lifting.' });
const tW = [wt('W3', 'weight'), wt('W4', 'Sideways'), wt('W5', 'Upward'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Each string holds half the weight: ${K('T = W/2')}`, right: `Only the upward parts share it: ${K(`${TT} = ${WW}/(2\\sin${th})`)}` });
const tp = $('#tpS');
hatch(tp, 40, 240, 50); hatch(tp, 300, 540, 50);
[120, 160].forEach(x => mk(tp, 'line', { x1: x, y1: 50, x2: x, y2: 160, stroke: C.ink, 'stroke-width': 3 }));
mk(tp, 'rect', { x: 110, y: 160, width: 60, height: 44, rx: 8, fill: VC, stroke: C.ink, 'stroke-width': 2.5 });
txt(tp, 140, 236, 'straight down: W/2', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 18 });
const tA = 20, tdx = 110, tdy = tdx * Math.tan(rad(tA));
mk(tp, 'line', { x1: 420 - tdx, y1: 50, x2: 420, y2: 50 + tdy, stroke: C.ink, 'stroke-width': 3 }); mk(tp, 'line', { x1: 420 + tdx, y1: 50, x2: 420, y2: 50 + tdy, stroke: C.ink, 'stroke-width': 3 });
mk(tp, 'line', { x1: 420, y1: 50 + tdy, x2: 420, y2: 50 + tdy + 26, stroke: C.ink, 'stroke-width': 3 });
mk(tp, 'rect', { x: 390, y: 50 + tdy + 26, width: 60, height: 44, rx: 8, fill: VC, stroke: C.ink, 'stroke-width': 2.5 });
txt(tp, 420, 236, 'at 20°: T = 1.46 W', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 18 });
const where = PUC.where($('#wa'), { on: [], type: 'Weights hung from strings at angles; can these forces balance?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ${K('2\\ \\text{m}')} string is tied to two hooks ${K('1.2\\ \\text{m}')} apart at the same height. A ${K('4\\ \\text{kg}')} bag hangs from its midpoint. Find the tension in the string. <span style="white-space:nowrap">${K('(g = 10\\ \\text{m/s}^2)')}</span>`,
  opts: ['20 N', '25 N', '33.3 N', '50 N'], right: 1 });
const so = PUC.solution($('#so'), [[K(`\\text{half: } 1\\ \\text{m},\\ \\text{span } 0.6\\ \\text{m}`)], [K(`\\cos${th} = 0.6,\\ \\sin${th} = 0.8`)], [K(`2${TT}\\sin${th} = 40\\ \\text{N}`)], [K(`${TT} = 40/1.6 = ${tc(C.ok, '25\\ \\text{N}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Each'), wt('A2', 'cos'), T0('A3') + 0.3, T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · equilibrium of forces', y0: 100, dy: 90, txt: [0, 1, 1, 0],
  lines: [K(`\\sum ${FF} = 0 \\;\\Rightarrow\\; \\sum F_x = 0,\\ \\sum F_y = 0`),
    '<b>Two forces</b>: equal, opposite, on one line',
    '<b>Three forces</b>: tip to tail, they close a triangle',
    `${K(`${TT} = \\dfrac{${WW}}{2\\sin${th}}`)}<span style="font:500 30px Poppins;margin-left:24px">flatter strings, bigger <span class="fo">T</span></span>`] });
const YQ = ['Why can Aarav never pull his rope perfectly straight?', 'Can forces of 2 N, 3 N and 6 N balance? Why?', 'Is a ball at the top of its throw in equilibrium? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 59', topic: 'How can a pull cross a gap? Contact and Non-Contact Forces', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tD1 - 0.5, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); JA[i].forEach((q, k) => { const u = M.o3((t - tMorph - 0.8 - i * 0.4) / 0.5); const [x1, y1, x2, y2] = q.q; q.a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); }); });
    vis($('#hjP'), t, wt('H2', 'nothing') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkW'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const ru = M.io((t - wt('H3', 'rope')) / 0.6), a = hAng(t), sag = 220 * Math.tan(rad(a)), mx = 260, my = HA[1] + sag;
    attr(hRope, 'd', `M${HA[0]},${HA[1]} L${mx},${my.toFixed(1)} L${HB[0]},${HB[1]}`); M.drawU(hRope, ru);
    attr(hBag, 'transform', `translate(${mx},${my.toFixed(1)})`); vis(hBagO, t, wt('H3', 'bag') - 0.1, 1e9, { dy: -30, sp: M.SOFT });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P1', 'net') - 0.1, 0.7); vis($('#pL'), t, wt('P1', 'forces') - 0.1, 1e9, { dy: 10 });
    PR.forEach((p, i) => vis($('#pr' + i), t, p[3] - 0.15, 1e9, POP));
    vis($('#pm'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis(pLamp, t, wt('P4', 'lamp') - 0.1, 1e9, { dy: -20 }); M.draw(pCord, t, wt('P4', 'cord') - 0.3, 0.4);
    const uW = M.o3((t - wt('P5', 'weight') + 0.05) / 0.5), uT = M.o3((t - wt('P5', 'cord') + 0.05) / 0.5);
    pW.set(LX, LY + 52, LX, LY + 52 + 100 * uW); pWl.style.opacity = uW.toFixed(3);
    pT.set(LX, LY - 4, LX, LY - 4 - 100 * uT); pTl.style.opacity = uT.toFixed(3);
    pTags.forEach((d, i) => vis(d, t, tPt[i] - 0.1, 1e9, POP));
    M.draw(pLine, t, tPt[2] - 0.1, 0.5); vis(pLl, t, tPt[2] + 0.2, 1e9, { dy: 6 });
    PUC.write($('#pmF'), t, wt('P6', 'equals') - 0.2, 0.6);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const a = ang(t), ky = HY + HS * Math.tan(rad(a)), ar = Math.round(a), Tn = Tof(Math.max(ar, 1));
    attr(st1, 'y2', ky.toFixed(1)); attr(st2, 'y2', ky.toFixed(1)); attr(knot, 'cy', ky.toFixed(1));
    attr(bag, 'transform', `translate(${KX},${ky.toFixed(1)})`); vis(bagO, t, tS1 + 0.5, 1e9, { dy: -30 });
    const mv = moving(t);
    ghosts.forEach((gh, k) => { const q = HY + HS * Math.tan(rad(ang(t - (t > tS6 && t < tRes ? 0.45 : 0.12) * (k + 1)))); attr(gh, 'transform', `translate(${KX},${q.toFixed(1)})`); gh.style.opacity = mv && Math.abs(q - ky) > 3 ? [0.3, 0.2, 0.12][k] : 0; });
    // angle arc at the knot (to the right string)
    attr(hz, 'y1', ky.toFixed(1)); attr(hz, 'y2', ky.toFixed(1));
    const R0 = 62; attr(arc, 'd', `M${KX + R0},${ky.toFixed(1)} A${R0},${R0} 0 0 0 ${(KX + R0 * Math.cos(rad(a))).toFixed(1)},${(ky - R0 * Math.sin(rad(a))).toFixed(1)}`);
    attr(arcL, 'x', (KX + R0 + 10).toFixed(1)); attr(arcL, 'y', (ky - (a > 12 ? 14 : -26)).toFixed(1));
    vis(arc, t, wt('S1', 'angle') - 0.1, 1e9, { dy: 0 }); vis(arcL, t, wt('S1', 'theta') - 0.1, 1e9, { dy: 0 }); vis(hz, t, wt('S1', 'horizontal') - 0.2, 1e9, { dy: 0 });
    // forces on the knot (2.2 px per newton)
    const fu = M.o3((t - wt('S2', 'pulls') + 0.1) / 0.5), Tl = FS * Tof(a) * fu, ca = Math.cos(rad(a)), sa = Math.sin(rad(a));
    aT1.set(KX, ky, KX - Tl * ca, ky - Tl * sa); aT2.set(KX, ky, KX + Tl * ca, ky - Tl * sa);
    attr(lT1, 'x', (KX - Tl * ca - 4).toFixed(1)); attr(lT1, 'y', (ky - Tl * sa - 14).toFixed(1)); attr(lT2, 'x', (KX + Tl * ca + 4).toFixed(1)); attr(lT2, 'y', (ky - Tl * sa - 14).toFixed(1));
    lT1.style.opacity = lT2.style.opacity = fu.toFixed(3);
    const wu = M.o3((t - wt('S2', 'weighs') + 0.1) / 0.5); aW.set(KX + 58, ky + 22, KX + 58, ky + 22 + FS * W * wu); attr(lW, 'x', KX + 70); attr(lW, 'y', (ky + 22 + FS * W).toFixed(1)); lW.style.opacity = wu.toFixed(3);
    // slow-mo replay: components
    const repl = t >= tS6 && t < tRes + 1.6;
    vis($('#smo'), t, tS6 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz + 0.05, tRes, { ...POP, sc: 0.8 });
    if (t >= tRes) vis($('#smo'), t, tRes + 0.05, tD1 - 0.4, { ...POP, sc: 0.8 });
    const cu = repl ? M.o3((t - wt('S6', 'split') + 0.1) / 0.5) * (1 - M.io((t - tRes - 1.2) / 0.4)) : 0, Tn2 = FS * Tof(a);
    const hu = cu * (t > wt('S7', 'sideways') - 0.2 || t < wt('S6', 'split') + 1 ? 1 : 1);
    cH1.set(KX, ky + 2, KX - Tn2 * ca * hu, ky + 2); cH2.set(KX, ky + 2, KX + Tn2 * ca * hu, ky + 2);
    cV1.set(KX - 16, ky, KX - 16, ky - Tn2 * sa * cu); cV2.set(KX + 16, ky, KX + 16, ky - Tn2 * sa * cu);
    vis($('#cp0'), t, wt('S7', 'sideways') - 0.1, tRes + 1.2, { dx: -20, dy: 0 }); vis($('#cp1'), t, wt('S8', 'upward') - 0.1, tRes + 1.2, { dx: -20, dy: 0 });
    vis($('#cp0 .cpc'), t, wt('S7', 'cancel') - 0.1, 1e9, POP); vis($('#cp1 .cpc'), t, wt('S8', 'whole') - 0.1, 1e9, POP);
    // readout: round theta first, then compute
    M.setT($('#r_th'), String(ar)); M.setT($('#r_t1'), f1(Tn)); M.setT($('#r_t2'), f1(Tn));
    M.setT($('#r_fx'), '0.0'); M.setT($('#r_fy'), '0.0');
    // graph
    const amin = Math.min(angN(Math.min(t, tS6)), a);
    gCurve(q => [q, Tof(q)], amin, 60);
    vis(gGuide, t, wt('S4', 'graph') - 0.1, 1e9, { dy: 0 }); vis(gTag, t, wt('S4', 'shoots') - 0.1, 1e9, POP);
    vis(gWl, t, wt('S2', 'weighs'), 1e9, { dy: 0 }); vis(gWt, t, wt('S2', 'weighs'), 1e9, { dy: 0 });
    gDot(a, Tof(a), t > tS1 + 0.6);
    avS(t, wt('S4', 'shoots') + 0.3, tS6 - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 472]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; 
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const hOn2 = M.io((t - wt('D4', 'Sideways') + 0.1) / 0.3), vOn2 = M.io((t - wt('D5', 'Upward') + 0.1) / 0.3);
    dHc.forEach(l => { l.style.opacity = (0.55 * hOn2).toFixed(3); }); dHl.forEach(l => { l.style.opacity = hOn2.toFixed(3); });
    dVc.forEach(l => M.drawU(l, vOn2)); dVl.forEach(l => { l.style.opacity = vOn2.toFixed(3); });
    vis($('#drF'), t, tStep[4] + 0.6, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'equilibrium') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'add') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => { const el = $('#lk' + i); vis(el, t, tt - 0.15, 1e9, { dx: -24, dy: 0 }); if (i === 4) el.style.background = mix(C.soft, C.redBg, M.io((t - tt) / 0.3)); });
    vis($('#lkP'), t, wt('R5', 'never') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    TB.forEach((_, i) => { const el = $('#tb' + i); vis(el, t, tTb[i] - 0.15, 1e9, { dy: 14 }); el.style.background = i === 4 ? mix(C.soft, C.redBg, M.io((t - tTb[4]) / 0.3)) : C.soft; });
    vis(rrP, t, wt('R5', 'tension') - 0.1, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    vis($('#k2'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const u2 = M.o3((t - wt('K1', 'Two') + 0.1) / 0.5);
    k2T.set(KLX, KLY - 4, KLX, KLY - 4 - 120 * u2); k2W.set(KLX, KLY + 52, KLX, KLY + 52 + 120 * u2); k2Tl.style.opacity = k2Wl.style.opacity = u2.toFixed(3);
    vis($('#k2P'), t, wt('K1', 'Equal') - 0.1, 1e9, POP);
    vis($('#k3'), t, T0('K2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const u3 = M.o3((t - wt('K2', 'Three') + 0.1) / 0.5), mvT = M.io((t - wt('K2', 'Tip') + 0.1) / 1.0);
    VEC.forEach(([dx, dy], i) => { const sx0 = KN[0], sy0 = KN[1] + (i === 1 ? 0 : 0), x0 = M.lerp(sx0, triS[i][0], mvT), y0 = M.lerp(sy0, triS[i][1], mvT);
      k3A[i].set(x0, y0, x0 + dx * u3, y0 + dy * u3); const L = k3L[i];
      const cen = [M.lerp(KN[0] - 10, TRC[0], mvT), M.lerp(KN[1] + 30, TRC[1], mvT)], mx = x0 + dx * 0.5, my = y0 + dy * 0.5, ll = Math.hypot(dx, dy);
      let nx0 = -dy / ll, ny0 = dx / ll; if (nx0 * (mx - cen[0]) + ny0 * (my - cen[1]) < 0) { nx0 = -nx0; ny0 = -ny0; }
      attr(L, 'x', (mx + 28 * nx0).toFixed(1)); attr(L, 'y', (my + 28 * ny0 + 9).toFixed(1)); L.style.opacity = u3.toFixed(3); });
    k3Tri.setAttribute('opacity', M.io((t - wt('K3', 'closes') + 0.1) / 0.4).toFixed(3));
    attr(k3V, 'x', 560); attr(k3V, 'y', 150); vis(k3V, t, wt('K2', 'nineteen') - 0.1, 1e9, { dy: 6 });
    vis($('#k3P'), t, wt('K3', 'zero') - 0.2, 1e9, POP);
    vis($('#th1'), t, tK4 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'equilibrium') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Three') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    vis($('#v1'), t, tV1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const dy0 = (q) => RY0 + ((Math.max(0, q - tV1) * RV) % (RY1 - RY0));
    const dyn = dy0(t); attr(drop, 'transform', `translate(${RX},${dyn.toFixed(1)})`); vis(dropO, t, wt('V1', 'raindrop') - 0.1, 1e9, { dy: 0 });
    dGh.forEach((gg, k) => { const q = dy0(t - 0.18 * (k + 1)); attr(gg, 'transform', `translate(${RX},${q.toFixed(1)})`); gg.style.opacity = t > wt('V1', 'raindrop') + 0.6 && q < dyn ? '' : 0; });
    const ud = M.o3((t - wt('V1', 'Drag') + 0.1) / 0.5);
    vDr.set(RX, dyn - 38, RX, dyn - 38 - 70 * ud); vWt.set(RX, dyn + 38, RX, dyn + 38 + 70 * ud);
    attr(vDl, 'x', RX + 14); attr(vDl, 'y', (dyn - 76).toFixed(1)); attr(vWl, 'x', RX + 14); attr(vWl, 'y', (dyn + 96).toFixed(1)); vDl.style.opacity = vWl.style.opacity = ud.toFixed(3);
    const uv = M.o3((t - wt('V1', 'steady') + 0.1) / 0.5); vV.set(RX - 80, dyn - 30, RX - 80, dyn - 30 + 70 * uv); attr(vVl, 'x', RX - 112); attr(vVl, 'y', (dyn + 10).toFixed(1)); vVl.style.opacity = uv.toFixed(3);
    vis(vRo, t, wt('V1', 'moves') - 0.1, 1e9, { dy: 10 }); vis($('#v1P'), t, wt('V1', 'equilibrium') - 0.1, 1e9, POP);
    vis($('#v2'), t, T0('V2') - 0.2, out, { dx: 60, dy: 0, ...o });
    // ball thrown up from the ground, rising (decelerating), then that instant at the top
    const hT = (BG - 30) - BTOP, tUp = 1.2, gp = 2 * hT / (tUp * tUp);
    const by = q => { if (q < tBall) return BG - 30; const r = Math.min(q - tBall, tUp); return BTOP + 0.5 * gp * (tUp - r) * (tUp - r); };
    const bY = by(t); attr(ballC, 'cy', bY.toFixed(1)); vis(ballC, t, tBall - 0.3, 1e9, { dy: 0 });
    bGh.forEach((c, k) => { const q = by(t - 0.14 * (k + 1)); attr(c, 'cy', q.toFixed(1)); c.setAttribute('opacity', t < tBall + tUp && q > bY + 3 ? [0.3, 0.2, 0.12][k] : 0); });
    const atTop = t >= tBall + tUp; M.setT($('#b_v'), atTop ? '0' : f1(gp * Math.max(0, tUp - (t - tBall)) / 50));
    const uw = M.o3((t - wt('V2', 'weight') + 0.1) / 0.5);
    bW.set(BX, bY + 32, BX, bY + 32 + 90 * uw); attr(bWl, 'x', BX + 14); attr(bWl, 'y', (bY + 112).toFixed(1)); bWl.style.opacity = uw.toFixed(3);
    bA.set(BX - 60, bY - 10, BX - 60, bY - 10 + 70 * uw); attr(bAl, 'x', BX - 72); attr(bAl, 'y', (bY + 40).toFixed(1)); attr(bAl, 'text-anchor', 'end'); bAl.style.opacity = uw.toFixed(3);
    vis(bQ, t, wt('V2', 'unbalanced') - 0.1, 1e9, { dy: 6 }); attr(bQ, 'y', (bY - 40).toFixed(1));
    vis(bRo, t, tTop - 0.1, 1e9, { dy: 10 }); vis($('#v2P'), t, wt('V2', 'rest') - 0.1, 1e9, POP);
    vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'equilibrium') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Steady') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wW1, t, wt('W2', 'wires') - 0.2, 0.5); M.draw(wW2, t, wt('W2', 'wires'), 0.5); vis(wLamp, t, wt('W2', 'lamp') - 0.1, 1e9, { dy: -16 });
    const uw = M.o3((t - wt('W3', 'Forty') + 0.1) / 0.5), u1 = M.o3((t - wt('W6', 'twenty') + 0.1) / 0.6), u2 = M.o3((t - wt('W6', 'forty') + 0.1) / 0.6);
    wWa.set(WX, WY + 40, WX, WY + 40 + WS * 49 * uw); wWl.style.opacity = uw.toFixed(3);
    const c1 = Math.cos(rad(30)), s1 = Math.sin(rad(30)), c2 = Math.cos(rad(60)), s2 = Math.sin(rad(60)), L1 = WS * 24.5 * u1, L2 = WS * 42.4 * u2;
    wT1.set(WX - 8, WY + 12, WX - 8 - L1 * c1, WY + 12 - L1 * s1); wT2.set(WX + 8, WY + 12, WX + 8 + L2 * c2, WY + 12 - L2 * s2);
    M.setT(wT1l, 'T₁ = 24.5 N'); M.setT(wT2l, 'T₂ = 42.4 N');
    attr(wT1l, 'x', (WX - 8 - WS * 24.5 * c1 - 8).toFixed(1)); attr(wT1l, 'y', (WY + 12 - WS * 24.5 * s1 + 34).toFixed(1)); wT1l.style.opacity = u1.toFixed(3);
    attr(wT2l, 'x', (WX + 8 + WS * 42.4 * c2 + 16).toFixed(1)); attr(wT2l, 'y', (WY + 12 - WS * 42.4 * s2 + 70).toFixed(1)); wT2l.style.opacity = u2.toFixed(3);
    avW(t, wt('W6', 'steeper') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'half') - 0.2, tStrike: wt('X3', 'upward') - 0.1, tRight: wt('X3', 'T') - 0.1 });
    vis(tp, t, wt('X3', 'holds') - 0.3, 1e9, { dy: 16 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'strings') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
