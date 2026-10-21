// PUC Physics Ep 26: Motion under gravity (Motion notebook: drop tower, throw up, two stones)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, HC = C.violet, FC = C.orange, TC = C.ink;   // v blue, g/a red, h violet, F orange, t ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, s, col, fs = 30) => txt(p, x, y, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col });
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const g = 9.8;
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const v_ = c(VC, 'v'), g_ = c(GC, 'g'), a_ = c(GC, 'a'), h_ = c(HC, 'h'), F_ = c(FC, 'F');

Object.assign(M.IC, {
  mango: ['M12 6c4.5 0 7 3.5 7 7.5S16 21 11.5 21 5 17.5 5 13.5 7.5 6 12 6Z', 'M12 6c0-2 1-3 3-3.5'],
  drop: ['M12 3c0 0-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12Z'],
  feather: ['M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z', 'M16 8 2 22', 'M17.5 15H9'],
  stone: ['M4 15l3-7 6-3 6 4 1 7-5 4H8z'],
  wind: ['M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2', 'M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2'],
});
// a mango drawn in svg: body + leaf, centred at (0,0)
const mango = (p, r = 16, op = 1) => { const og = mk(p, 'g', { opacity: op }), gg = mk(og, 'g', {}); mk(gg, 'ellipse', { cx: 0, cy: 0, rx: r * 0.92, ry: r, fill: '#F2B33D', stroke: C.ink, 'stroke-width': 2.5 }); mk(gg, 'path', { d: `M0,${-r} q${r * 0.5},${-r * 0.55} ${r * 0.95},${-r * 0.35} q${-r * 0.4},${r * 0.45} ${-r * 0.95},${r * 0.35}Z`, fill: '#3E9B5F', stroke: C.ink, 'stroke-width': 1.8 }); return og; };
const place = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4'), tP5 = T0('P5');
const tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1');
const tK1 = T0('K1'), tK3 = T0('K3'), tK5 = T0('K5'), tU1 = T0('U1'), tU7 = T0('U7'), tW = T0('W2'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three falls ---------- */
const JOBS = [['mango', 'Mango', 'FROM A BRANCH', 'mango'], ['coin', 'Coin', 'OFF A TABLE', 'coin'], ['drop', 'Water drop', 'FROM A TAP', 'drop']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg class="jv" width="60" height="60"><line x1="30" y1="6" x2="30" y2="40" stroke="${GC}" stroke-width="6" stroke-linecap="round"/><path d="M16,36 L30,56 L44,36 Z" fill="${GC}"/></svg></div>`).join('');
const hk = $('#hkS'), HG = 470, HP = 24, HR = 16, HX = 270;              // 24 px per metre on the tree
const hc1 = HG - HR - 4.9 * HP, hc2 = HG - HR - 9.8 * HP;
mk(hk, 'line', { x1: 36, y1: HG, x2: 500, y2: HG, stroke: C.ink, 'stroke-width': 3 });
for (let x = 48; x < 500; x += 28) mk(hk, 'line', { x1: x, y1: HG + 4, x2: x - 14, y2: HG + 18, stroke: C.dim, 'stroke-width': 2 });
mk(hk, 'path', { d: `M110,${HG} L118,120 L142,120 L150,${HG} Z`, fill: '#8B5E3C', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(hk, 'ellipse', { cx: 130, cy: 112, rx: 92, ry: 56, fill: '#5FAF72', stroke: C.ink, 'stroke-width': 2.5 });
const br1 = mk(hk, 'path', { d: `M146,${hc1 - HR - 2} L${HX + 34},${hc1 - HR - 12}`, stroke: '#8B5E3C', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none' });
const br2 = mk(hk, 'path', { d: `M146,${hc2 - HR - 2} L${HX + 34},${hc2 - HR - 12}`, stroke: '#8B5E3C', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none', 'stroke-dasharray': '4 10' });
const hm1 = mango(hk, HR), hm2 = mango(hk, HR, 0.45);
const hgh = [0, 1, 2].map(() => mango(hk, HR, 0));
const hRul = mk(hk, 'g', {});
mk(hRul, 'line', { x1: 380, y1: HG, x2: 380, y2: HG - 9.8 * HP, stroke: C.ink, 'stroke-width': 2 });
[[0, '0'], [4.9, '4.9 m'], [9.8, '9.8 m']].forEach(([m, s]) => { mk(hRul, 'line', { x1: 372, y1: HG - m * HP, x2: 388, y2: HG - m * HP, stroke: C.ink, 'stroke-width': 2 }); txt(hRul, 398, HG - m * HP + 6, s, { fill: C.ink, 'font-weight': 600 }); });
const hRul2 = [...hRul.children].slice(-2);   // 9.8 m tick + label appear with the puzzle
const hQ = txt(hk, HX + 30, hc2 + 10, '?', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 40, fill: C.ac });
const tFall0 = wt('H3', 'lands') - 0.75;       // real 1.0 s fall from 4.9 m
const tNo = wt('H5', 'no');

/* ---------- P ---------- */
const FF = [['check', 'Only gravity acts', 'free fall', null], ['wind', 'Air is ignored', 'no push of the air', null], ['stone', 'Heavy stone', 'no air', '9.8'], ['mango', 'Mango', 'no air', '9.8'], ['feather', 'Light feather', 'no air', '9.8']];
$('#ffs').innerHTML = FF.map(([ic, n, s, v], i) => `<div class="ff" id="ff${i}" style="top:${84 + i * 92 + (i > 1 ? 24 : 0)}px"><i>${M.icon(ic, 26, i < 2 ? C.ok : C.ac, 2.2)}</i><div class="fn">${n}</div><div class="fs">${s}</div>${v ? `<div class="fv">${K(`${g_} = ${v}`)}</div>` : ''}</div>`).join('');
const tFF = [wt('P2', 'only'), wt('P2', 'ignore'), wt('P5', 'Heavy'), wt('P5', 'light') + 0.15, wt('P5', 'light') + 0.35];
$('#gbig').innerHTML = K(`${g_} \\approx 9.8\\,\\text{m/s}^2`);
const pg = $('#pgS'), PB = 560, PBX = 150;     // speed staircase: v after 0, 1, 2, 3 s
const pBars = [0, 1, 2, 3].map(k => { const r = mk(pg, 'rect', { x: PBX + k * 120, width: 72, rx: 6, fill: C.ac2, stroke: VC, 'stroke-width': 2.5 }); return r; });
const pLab = [0, 1, 2, 3].map(k => txt(pg, PBX + k * 120 + 36, PB - 10, '', { 'text-anchor': 'middle', 'font-size': 20, fill: VC, 'font-weight': 600 }));
const pT = [0, 1, 2, 3].map(k => txt(pg, PBX + k * 120 + 36, PB + 0, '', {}));
mk(pg, 'line', { x1: PBX - 20, y1: 540, x2: PBX + 470, y2: 540, stroke: C.ink, 'stroke-width': 2.5 });
[0, 1, 2, 3].forEach(k => { pT[k].textContent = k + ' s'; attr(pT[k], 'y', 566); attr(pT[k], 'x', PBX + k * 120 + 36); attr(pT[k], 'text-anchor', 'middle'); });
const pAr = PUC.arrow(pg, GC, 8, 22); const pAl = sym(pg, 690, 420, 'g', GC, 34); txt(pg, 668, 520, 'DOWN', { 'font-size': 16, 'letter-spacing': 2 });
const tBar = [wt('P4', 'nine') - 0.2, wt('P4', 'second'), wt('P4', 'every'), wt('P4', 'every') + 0.35];

/* ---------- S: drop sim ---------- */
const s = $('#simS'), SX = 300, SY0 = 90, SP = 9, SR = 18, SG = SY0 + 44.1 * SP;
mk(s, 'line', { x1: 120, y1: SY0, x2: 120, y2: SG, stroke: C.ink, 'stroke-width': 2 });
[0, 10, 20, 30, 40].forEach(m => { mk(s, 'line', { x1: 112, y1: SY0 + m * SP, x2: 128, y2: SY0 + m * SP, stroke: C.ink, 'stroke-width': 2 }); txt(s, 104, SY0 + m * SP + 6, m + ' m', { 'text-anchor': 'end' }); });
mk(s, 'line', { x1: 180, y1: SG + SR, x2: 560, y2: SG + SR, stroke: C.ink, 'stroke-width': 3 });
for (let x = 192; x < 560; x += 28) mk(s, 'line', { x1: x, y1: SG + SR + 4, x2: x - 14, y2: SG + SR + 18, stroke: C.dim, 'stroke-width': 2 });
const sGh = [0, 1, 2, 3].map(() => mango(s, SR, 0));
const sTr = [1, 2, 3].map(() => mango(s, SR, 0));
const sM = mango(s, SR);
const sV = PUC.arrow(s, VC, 6, 18), sG = PUC.arrow(s, GC, 6, 18);
const sVl = sym(s, 0, 0, 'v', VC), sGl = sym(s, 0, 0, 'g', GC);
const yAt = u => SY0 + 0.5 * g * u * u * SP;
const sBr = [0, 1, 2].map(k => mk(s, 'path', { d: `M440,${yAt(k).toFixed(1)} h12 V${yAt(k + 1).toFixed(1)} h-12`, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const sBl = ['4.9 m', '14.7 m', '24.5 m'].map((x, k) => txt(s, 466, (yAt(k) + yAt(k + 1)) / 2 + 7, x, { fill: HC, 'font-size': 22, 'font-weight': 600 }));
const sRat = document.createElement('div'); sRat.className = 'pillp ac'; sRat.style.cssText = 'left:560px;top:256px'; sRat.innerHTML = '1 : 3 : 5'; $('#sim').appendChild(sRat);
$('#roG').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${HC}">h</span><span class="v" id="rh" style="color:${HC}">0.0</span><span class="u">m</span>`;
$('#roF').innerHTML = K(`${v_} = ${g_}\\,t`);
const sGr = PUC.graph($('#grS'), { x: 110, y: 84, w: 580, h: 140, xmax: 3, ymin: 0, ymax: 30, xt: [0, 1, 2, 3], yt: [0, 9.8, 19.6, 29.4] });
txt($('#grS'), 702, 226, 't (s)'); txt($('#grS'), 170, 80, 'v (m/s)', { fill: VC, 'font-weight': 600 });
const sCv = sGr.curve(VC), sDt = sGr.dot(C.ink);
// sim clock: the first drop runs t 0 -> 3 s in step with the words; then a slow-mo replay from the top
const k1 = wt('S2', 'nine') - 0.05, k2 = wt('S3', 'nineteen') - 0.05, k3 = wt('S3', 'twenty') - 0.05, kd0 = tS1 + 0.9;
const tRp = tS5 + 0.2, tFrz = tRp + 4 * 1.0, tRes = wt('S6', 'keeps') - 0.3, tRe3 = tRes + 4 * 2 * 0.5;
const simT = t => {
  if (t < tRp) { if (t < kd0) return 0; if (t < k1) return (t - kd0) / (k1 - kd0); if (t < k2) return 1 + (t - k1) / (k2 - k1); return Math.min(3, 2 + (t - k2) / (k3 - k2)); }
  if (t < tFrz) return (t - tRp) * 0.25;                          // replay at 0.25x up to 1 s
  if (t < tRes) return 1;                                          // freeze at 1 s, vectors grow
  return Math.min(3, 1 + (t - tRes) * 0.5);                        // resume (0.5x) to the ground
};

/* ---------- D ---------- */
const STEPS = [[`u = 0,\\;\\; ${a_} = ${g_}`, 'start from rest; the acceleration is g'],
  [`${v_} = u + ${a_}t \\;\\Rightarrow\\; ${v_} = ${g_}\\,t`, 'speed grows in step with time'],
  [`s = ut + \\tfrac12 ${a_}t^2 \\;\\Rightarrow\\; ${h_} = \\tfrac12 ${g_}\\,t^2`, 'height fallen grows with time squared'],
  [`${v_}^2 = u^2 + 2${a_}s \\;\\Rightarrow\\; ${v_}^2 = 2${g_}${h_}`, 'landing speed without the time']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:108px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Take'), wt('D3', 'v'), wt('D4', 's'), wt('D5', 'v')];
const dGr = PUC.graph($('#drS'), { x: 130, y: 100, w: 540, h: 360, xmax: 3, ymin: 0, ymax: 45, xt: [0, 1, 2, 3], yt: [0, 4.9, 19.6, 44.1] });
txt($('#drS'), 684, 466, 't (s)'); txt($('#drS'), 142, 92, 'h (m)');
const dCv = dGr.curve(HC), dDt = dGr.dot(C.ink);
const dPts = [1, 2, 3].map(k => dGr.mk('circle', { r: 7, fill: HC, cx: dGr.X(k), cy: dGr.Y(4.9 * k * k) }));
const dTag = document.createElement('div'); dTag.className = 'pillp ac'; dTag.style.cssText = 'left:200px;top:120px'; dTag.innerHTML = '<span class="mono">t × 2</span> &rarr; <span class="mono">h × 4</span>'; $('#dr').appendChild(dTag);
const dLand = document.createElement('div'); dLand.className = 'fx'; dLand.style.cssText = 'left:36px;top:510px;font-size:30px'; dLand.innerHTML = K(`${h_} = 44.1\\,\\text{m} \\;\\Rightarrow\\; ${v_} = \\sqrt{2 \\times 9.8 \\times 44.1} = 29.4\\,\\text{m/s}`); $('#dr').appendChild(dLand);
const tCurve = wt('D4', 'half', 1) - 0.1;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${a_} = ${g_} = 9.8\\,\\text{m/s}^2 \\;\\; \\text{(down)}`);

/* ---------- K: two stones ---------- */
const kl = $('#klS'), KY0 = 140, KG = 500;
mk(kl, 'line', { x1: 60, y1: KG, x2: 724, y2: KG, stroke: C.ink, 'stroke-width': 3 });
for (let x = 72; x < 724; x += 28) mk(kl, 'line', { x1: x, y1: KG + 4, x2: x - 14, y2: KG + 18, stroke: C.dim, 'stroke-width': 2 });
mk(kl, 'line', { x1: 80, y1: KY0 - 40, x2: 704, y2: KY0 - 40, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '8 8' });
txt(kl, 84, KY0 - 52, 'SAME HEIGHT · DROPPED TOGETHER', { 'font-size': 16, 'letter-spacing': 2 });
const KS = [[230, 26, '1 kg', '9.8 N', 24], [520, 46, '5 kg', '49 N', 120]];
const kGh = KS.map(([x, r]) => [0, 1, 2].map(() => mk(kl, 'circle', { cx: x, r, fill: C.ink, opacity: 0 })));
const kSt = KS.map(([x, r, m]) => { const gg = mk(kl, 'g', {}); mk(gg, 'circle', { cx: 0, cy: 0, r, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3 }); txt(gg, 0, 7, m, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': r > 30 ? 22 : 16 }); return gg; });
const kF = KS.map(() => PUC.arrow(kl, FC, 6, 18)), kFl = KS.map(([, , , f]) => txt(kl, 0, 0, f, { fill: FC, 'font-weight': 600, 'font-size': 22 }));
const kLand = document.createElement('div'); kLand.className = 'pillp good'; kLand.style.cssText = 'left:36px;top:510px'; kLand.innerHTML = 'Both land at the same moment'; $('#kl').appendChild(kLand);
const KB = [['1 kg stone', '9.8', '1', '9.8'], ['5 kg stone', '49', '5', '9.8']];
$('#krs').innerHTML = KB.map(([n, f, m, a], i) => `<div class="sbx" id="kb${i}" style="left:${36 + i * 372}px;height:300px"><div class="h">${n}</div>
  <div class="fx" style="left:24px;top:84px;font-size:32px">${K(`\\text{pull } ${F_} = ${f}\\,\\text{N}`)}</div>
  <div class="fx" style="left:24px;top:144px;font-size:32px">${K(`\\text{mass } m = ${m}\\,\\text{kg}`)}</div>
  <div class="fx kbA" style="left:24px;top:212px;font-size:34px">${K(`${a_} = \\dfrac{${F_}}{m} = ${a}`)}</div></div>`).join('') +
  `<div class="pillp ink" id="kP" style="left:36px;top:420px">5 times the pull, 5 times the mass</div>`;
const th1 = PUC.think($('#th1'), { q: 'A 1 kg stone and a 5 kg stone are dropped together, with no air. Which lands first?', opts: ['The 5 kg stone', 'Both together'], right: 1, why: 'Both together: 5 times the pull on 5 times the mass gives the same g.' });
const tKdrop = wt('K5', 'fall') + 0.1, KFALL = 1.1;   // drawn drop, same for both
const avD = PUC.avatar($('#sK'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the mass does not matter at all!' });

/* ---------- U: thrown up ---------- */
const us = $('#usS'), UX = 540, UH = 500, UP = 16.5, UR = 18;
mk(us, 'line', { x1: 690, y1: UH, x2: 690, y2: UH - 20 * UP, stroke: C.ink, 'stroke-width': 2 });
[0, 5, 10, 15, 19.6].forEach(m => { mk(us, 'line', { x1: 682, y1: UH - m * UP, x2: 698, y2: UH - m * UP, stroke: C.ink, 'stroke-width': 2 }); txt(us, 708, UH - m * UP + 6, m === 19.6 ? '19.6' : m, { fill: m === 19.6 ? VC : C.mute, 'font-weight': m === 19.6 ? 600 : 400 }); });
txt(us, 708, UH + 34, 'm');
mk(us, 'path', { d: `M${UX - 40},${UH + UR + 2} h80 v14 a8 8 0 0 1 -8 8 h-64 a8 8 0 0 1 -8 -8 Z`, fill: '#E9C9A8', stroke: C.ink, 'stroke-width': 2.5 });
txt(us, UX, UH + UR + 46, 'HAND', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 2 });
const uTopL = mk(us, 'line', { x1: UX - 60, y1: UH - 19.6 * UP, x2: 690, y2: UH - 19.6 * UP, stroke: VC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const uGh = [0, 1, 2].map(() => mk(us, 'circle', { cx: UX, r: UR, fill: C.ink, opacity: 0 }));
const uB = mk(us, 'circle', { cx: UX, cy: UH, r: UR, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 });
const uV = PUC.arrow(us, VC, 6, 18), uG = PUC.arrow(us, GC, 6, 18), uVl = sym(us, 0, 0, 'v', VC), uGl = sym(us, 0, 0, 'g', GC);
$('#uroG').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="ut">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="uv" style="color:${VC}">+19.6</span><span class="u">m/s</span>
  <span class="k" style="color:${GC}">a</span><span class="v" style="color:${GC}">−9.8</span><span class="u">m/s²</span>`;
const uSym = document.createElement('div'); uSym.className = 'pillp'; uSym.style.cssText = 'left:420px;top:76px'; uSym.innerHTML = '<span class="mono">2 s</span> up = <span class="mono">2 s</span> down'; $('#uro').appendChild(uSym);
const uGr = PUC.graph($('#ugS'), { x: 110, y: 84, w: 580, h: 150, xmax: 4, ymin: -19.6, ymax: 19.6, xt: [0, 1, 2, 3, 4], yt: [19.6, 0, -19.6] });
txt($('#ugS'), 702, 166, 't (s)'); txt($('#ugS'), 170, 80, 'v (m/s)', { fill: VC, 'font-weight': 600 });
const uCv = uGr.curve(VC), uDt = uGr.dot(C.ink);
const uTopG = uGr.mk('text', { x: uGr.X(2) + 12, y: uGr.Y(0) - 12, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: VC, 'font-weight': 600 }); uTopG.textContent = 'TOP: v = 0';
const uZ = uGr.mk('circle', { cx: uGr.X(2), cy: uGr.Y(0), r: 12, fill: 'none', stroke: VC, 'stroke-width': 3 });
const u0 = wt('U3', 'Each') - 0.1, u2 = wt('U3', 'top') - 0.1, u2b = wt('U4', 'Two') - 0.1, u4 = wt('U4', 'hand');
const uT = t => t < u0 ? 0 : t < u2 ? 2 * (t - u0) / (u2 - u0) : t < u2b ? 2 : Math.min(4, 2 + 2 * (t - u2b) / (u4 - u2b));
const th2 = PUC.think($('#th2'), { q: 'At the very top, the velocity is zero. Is the acceleration zero too?', opts: ['Yes, a = 0', 'No, a = g down'], right: 1, why: 'Still g, pointing down: that is what turns the ball around.' });
const avA = PUC.avatar($('#sU'), { x: 160 + 36, y: 270 + 84, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'One straight line, up and down!' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${h_} = \\tfrac12 ${g_}\\,t^2 \\;\\Rightarrow\\; t = \\sqrt{\\dfrac{2${h_}}{${g_}}}`)],
  [K(`t = \\sqrt{\\dfrac{2 \\times 9.8}{9.8}} = \\sqrt{2}`)],
  [K(`t \\approx 1.41\\,\\text{s} \\quad (\\text{not } 2\\,\\text{s})`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 122 });
const wP = document.createElement('div'); wP.className = 'pillp ac'; wP.style.cssText = 'left:36px;top:500px'; wP.innerHTML = 'Height × 2 &rarr; time × √2'; $('#wl').appendChild(wP);
const tWs = [wt('W3', 'Use'), wt('W4', 'Two'), wt('W5', 'That')];
const w = $('#wrS'), WG = 480, WPX = 32, WR = 16, WXA = 300, WXB = 500;
const wcA = WG - WR - 4.9 * WPX, wcB = WG - WR - 9.8 * WPX;
mk(w, 'line', { x1: 60, y1: WG, x2: 724, y2: WG, stroke: C.ink, 'stroke-width': 3 });
for (let x = 72; x < 724; x += 28) mk(w, 'line', { x1: x, y1: WG + 4, x2: x - 14, y2: WG + 18, stroke: C.dim, 'stroke-width': 2 });
mk(w, 'path', { d: `M110,${WG} L116,90 L136,90 L142,${WG} Z`, fill: '#8B5E3C', stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'path', { d: `M138,${wcA - WR - 2} L${WXA + 30},${wcA - WR - 10}`, stroke: '#8B5E3C', 'stroke-width': 9, 'stroke-linecap': 'round' });
mk(w, 'path', { d: `M138,${wcB - WR - 2} L${WXB + 30},${wcB - WR - 10}`, stroke: '#8B5E3C', 'stroke-width': 9, 'stroke-linecap': 'round' });
mk(w, 'line', { x1: 640, y1: WG, x2: 640, y2: WG - 9.8 * WPX, stroke: C.ink, 'stroke-width': 2 });
[[0, '0'], [4.9, '4.9 m'], [9.8, '9.8 m']].forEach(([m, s2]) => { mk(w, 'line', { x1: 632, y1: WG - m * WPX, x2: 648, y2: WG - m * WPX, stroke: C.ink, 'stroke-width': 2 }); txt(w, 656, WG - m * WPX + 6, s2, { fill: HC, 'font-weight': 600 }); });
const wMA = mango(w, WR), wMB = mango(w, WR);
const wTA = txt(w, WXA, WG + 56, '0.00 s', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 }), wTB = txt(w, WXB, WG + 56, '0.00 s', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
const wTag = document.createElement('div'); wTag.className = 'tag'; wTag.style.cssText = 'right:36px;top:22px'; wTag.innerHTML = 'SLOW-MO · 0.5x'; $('#wr').appendChild(wTag);
const tWd = wt('W2', 'How') + 0.1;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Up is positive, yet ${K(`${a_} = +9.8\\,\\text{m/s}^2`)}`, right: `Up is positive, so ${K(`${a_} = -9.8\\,\\text{m/s}^2`)} going up and coming down` });
const tr = $('#trS');
mk(tr, 'line', { x1: 120, y1: 230, x2: 120, y2: 50, stroke: C.ink, 'stroke-width': 2.5 }); mk(tr, 'path', { d: 'M108,62 L120,40 L132,62 Z', fill: C.ink });
txt(tr, 140, 60, '+ up', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const trB = mk(tr, 'circle', { cx: 260, cy: 120, r: 22, fill: '#E4572E', stroke: C.ink, 'stroke-width': 2.5 });
const trG = PUC.arrow(tr, GC, 6, 18), trV = PUC.arrow(tr, VC, 6, 18);
const trGl = txt(tr, 350, 214, 'a = −g', { fill: GC, 'font-size': 24, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: a stone dropped or thrown from a tower - find the time, height or speed' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A ball is thrown straight up at 15 m/s from the top of a 20 m tall tower. When does it hit the ground? (g = 10 m/s²)', qW: 780,
  opts: ['1.5 s', '2 s', '3 s', '4 s'], right: 3, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`u = +15,\\; ${a_} = -10,\\; s = -20`)], [K(`-20 = 15t - 5t^2`)], [K(`t^2 - 3t - 4 = 0`)], [K(`t = 4\\,\\text{s} \\;\\; (t = -1 \\text{ rejected})`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Up'), wt('A3', 'Minus'), wt('A3', 'So'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · motion under gravity', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${v_} = ${g_}t \\qquad ${h_} = \\tfrac12 ${g_}t^2 \\qquad ${v_}^2 = 2${g_}${h_}`),
    `<b>No air</b>: every object falls with the same <b class="gv">g</b> = <span class="mono">9.8 m/s²</span>, down`,
    '<b>Thrown up</b>: <span class="vv">v = 0</span> at the top, but <span class="gv">a</span> is still <span class="gv">g</span>; time up = time down',
    '<b>From rest</b>: distances in the 1st, 2nd, 3rd second are <span class="mono">1 : 3 : 5</span>'] });
const YQ = ['Why does a heavy stone not fall faster than a light one?', 'What is the acceleration of a ball at the top of its flight?', 'If the height becomes 4 times bigger, how much longer is the fall?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 27', topic: 'What does the shape of a curve tell you? Position-Time Graphs', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.1, 720, 560], [tS7 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const a0 = $('#hq0'), a1 = $('#hq1'); a1.style.left = (36 + a0.offsetWidth + 16) + 'px'; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP2 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P2');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis(el.querySelector('.jv'), t, wt('H2', 'pull') - 0.1 + i * 0.1, 1e9, { dy: -20, sp: M.SOFT, fade: 0.1 }); });
    M.vis($('#hjP'), t, wt('H2', 'Earth') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.2, 1e9, { dx: 30, dy: 0 }); M.vis($('#dyF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const u = M.clamp(t - tFall0, 0, 1);
    place(hm1, HX, hc1 + 0.5 * g * u * u * HP);
    hgh.forEach((gg, k) => { const gu = u - 0.12 * (k + 1); place(gg, HX, hc1 + 0.5 * g * Math.max(0, gu) ** 2 * HP); attr(gg, 'opacity', u > 0 && u < 1 && gu > 0 ? [0.3, 0.2, 0.12][k] : 0); });
    M.vis(hRul, t, tH3 + 0.4, 1e9, { dy: 0 });
    hRul2.forEach(e => e.style.opacity = M.io((t - wt('H4', 'twice')) / 0.3));
    M.draw(br2, t, wt('H4', 'twice') - 0.1, 0.4); M.vis(hm2.firstChild, t, wt('H4', 'high') - 0.1, 1e9, POP); place(hm2, HX, hc2);
    M.vis(hQ, t, wt('H4', 'two') - 0.1, 1e9, POP);
    M.vis($('#hq0'), t, wt('H3', 'second') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H4', 'seconds') - 0.1, 1e9, POP);
    const no = M.io((t - tNo) / 0.3); $('#hq1').style.background = mix(C.ac2, C.redBg, no); $('#hq1').style.color = mix(C.ink, C.red, no);
  }

  /* P */
  const pOn = t >= tP2 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pf'), t, tP2 + 0.1, out, { dx: -60, dy: 0, ...o });
    FF.forEach((_, i) => M.vis($('#ff' + i), t, tFF[i] - 0.1, 1e9, POP));
    M.vis($('#pg'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gbig'), t, wt('P3', 'g') - 0.1, 0.7); M.vis($('#gsub'), t, wt('P4', 'every') - 0.2, 1e9, { dy: 10 });
    pBars.forEach((r, k) => { const u = M.o3((t - tBar[k]) / 0.5), H = 9.8 * k * 7 * u; attr(r, 'y', (540 - H).toFixed(1)); attr(r, 'height', H.toFixed(1)); r.style.opacity = t > tBar[0] - 0.3 ? 1 : 0; pLab[k].textContent = k ? '+9.8' : '0'; attr(pLab[k], 'y', (540 - H - 10).toFixed(1)); pLab[k].style.opacity = M.clamp((t - tBar[k]) / 0.3); pT[k].style.opacity = t > tBar[0] - 0.3 ? 1 : 0; });
    const ga = M.io((t - wt('P4', 'down') + 0.1) / 0.4); pAr.set(690, 330, 690, 330 + 160 * ga); pAl.style.opacity = ga; attr(pAl, 'x', 708);
  }

  /* S: drop sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = simT(t), y = yAt(u), v = g * u;
    place(sM, SX, y);
    // trail ghosts while moving
    sTr.forEach((gg, k) => { const gu = simT(t - 0.1 * (k + 1)), mv = Math.abs(gu - u) > 0.01 && u < 3; place(gg, SX, yAt(gu)); attr(gg, 'opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    // replay tag
    M.vis($('#slow'), t, tRp, tRe3 + 0.4, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    // vectors appear in the freeze and stay till the end of the scene
    const va = M.io((t - (tFrz + 0.1)) / 0.5);
    sG.set(SX - 70, y, SX - 70, y + 64 * va); sV.set(SX + 50, y, SX + 50, y + v * 2.2 * va);
    attr(sGl, 'x', SX - 108); attr(sGl, 'y', (y + 44).toFixed(1)); sGl.style.opacity = va;
    attr(sVl, 'x', SX + 64); attr(sVl, 'y', (y + Math.max(30, v * 1.1) * va + 10).toFixed(1)); sVl.style.opacity = va;
    // ghost copies at whole seconds + gap brackets
    const gOn = M.io((t - tS7 - 0.2) / 0.4);
    sGh.forEach((gg, k) => { place(gg, SX, yAt(k)); attr(gg, 'opacity', (0.25 * M.io((t - tS7 - 0.2 - k * 0.2) / 0.3)).toFixed(3)); });
    sBr.forEach((p, k) => { const tt = [wt('S8', 'four'), wt('S8', 'fourteen'), wt('S8', 'twenty')][k] - 0.2; M.draw(p, t, tt, 0.4); sBl[k].style.opacity = M.clamp((t - tt - 0.2) / 0.3); });
    M.vis(sRat, t, wt('S8', 'ratio') - 0.05, 1e9, POP);
    M.setT($('#rt'), u.toFixed(2)); M.setT($('#rv'), v.toFixed(1)); M.setT($('#rh'), (0.5 * g * u * u).toFixed(1));
    PUC.write($('#roF'), t, wt('S4', 'same') - 0.1, 0.7);
    sCv(k => [k, g * k], 0, u); sDt(u, v, t > kd0 - 0.3);
    void gOn;
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const cu = 3 * M.io((t - tCurve) / 1.6);
    dCv(k => [k, 4.9 * k * k], 0, cu); dDt(cu, 4.9 * cu * cu, t > tCurve - 0.1);
    dPts.forEach((p, k) => M.hide(p, cu < k + 1 - 0.01));
    M.vis(dTag, t, wt('D4', 'squared', 1) - 0.1, 1e9, POP);
    PUC.write(dLand, t, wt('D5', 'landing') - 0.1, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'In') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Speed') - 0.1, 0.8);
  }

  /* K: two stones */
  const kOn = t >= tK1 - 0.1 && t < tU1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const late = t >= T0('K4') + 1;   // cards come back after the think card for the drop
    const tin = late ? tK5 - 0.1 : tK1 + 0.1, tout = late ? OUT('U1') : OUT('K3');
    M.vis($('#kl'), t, tin, tout, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#kr'), t, late ? tK5 : T0('K2') - 0.3, tout, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    KB.forEach((_, i) => M.vis($('#kb' + i), t, T0('K2') - 0.2 + i * 0.15, 1e9, { dy: 20 }));
    M.vis($('#kP'), t, wt('K2', 'speed') - 0.1, 1e9, POP);
    const fu = M.clamp((t - tKdrop) / KFALL);
    KS.forEach(([x, r], i) => {
      const y = KY0 + (KG - r - KY0) * fu * fu; place(kSt[i], x, y);
      kGh[i].forEach((gc, k) => { const gu = M.clamp((t - 0.09 * (k + 1) - tKdrop) / KFALL); attr(gc, 'cy', (KY0 + (KG - r - KY0) * gu * gu).toFixed(1)); attr(gc, 'opacity', fu > 0 && fu < 1 ? [0.3, 0.2, 0.12][k] : 0); });
      const fa = M.io((t - wt('K2', 'pulled') + 0.1) / 0.4) * (late ? 0 : 1);
      kF[i].set(x, y + r + 6, x, y + r + 6 + KS[i][4] * fa); attr(kFl[i], 'x', x + 14); attr(kFl[i], 'y', (y + r + 6 + KS[i][4] * fa * 0.6).toFixed(1)); kFl[i].style.opacity = fa;
    });
    M.vis(kLand, t, tKdrop + KFALL, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('K5'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'bigger') });
    avD(t, tKdrop + KFALL + 0.4, OUT('U1'));
  }

  /* U: thrown up */
  const uOn = t >= tU1 - 0.1 && t < tW + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const late = t >= T0('U8') + 1;
    const tout = late ? OUT('W2') : OUT('U7');
    M.vis($('#usim'), t, late ? T0('U8') + 1.2 : tU1 + 0.05, tout, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#uro'), t, late ? T0('U8') + 1.3 : tU1 + 0.25, tout, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    M.vis($('#ugr'), t, late ? T0('U8') + 1.4 : tU1 + 0.4, tout, { dy: 36, ...o });
    M.vis($('#upTag'), t, wt('U2', 'positive') - 0.1, 1e9, POP);
    const u = uT(t), v = 19.6 - g * u, y = UH - (19.6 * u - 0.5 * g * u * u) * UP;
    attr(uB, 'cy', y.toFixed(1));
    uGh.forEach((gc, k) => { const gu = uT(t - 0.12 * (k + 1)), mv = Math.abs(gu - u) > 0.01; attr(gc, 'cy', (UH - (19.6 * gu - 0.5 * g * gu * gu) * UP).toFixed(1)); attr(gc, 'opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    const va = M.io((t - wt('U1', 'nineteen')) / 0.4), ga = M.io((t - wt('U2', 'Gravity')) / 0.4);
    uV.set(UX + 48, y, UX + 48, y - v * 4.2 * va); attr(uVl, 'x', UX + 62); attr(uVl, 'y', (y - v * 2.1 * va + 10).toFixed(1)); uVl.style.opacity = Math.abs(v) > 2 ? va : 0;
    uG.set(UX - 60, y, UX - 60, y + 64 * ga); attr(uGl, 'x', UX - 100); attr(uGl, 'y', (y + 44).toFixed(1)); uGl.style.opacity = ga;
    M.draw(uTopL, t, u2 - 0.1, 0.4);
    M.setT($('#ut'), u.toFixed(2)); M.setT($('#uv'), (v >= 0.05 ? '+' : v <= -0.05 ? '−' : '') + Math.abs(v).toFixed(1));
    M.vis($('#uTop'), t, u2, 1e9, POP); M.vis(uSym, t, wt('U5', 'Time') - 0.1, 1e9, POP);
    uCv(k => [k, 19.6 - g * k], 0, u); uDt(u, v, t > u0 - 0.3);
    uZ.style.opacity = M.clamp((t - wt('U6', 'zero') + 0.1) / 0.3); uTopG.style.opacity = uZ.style.opacity;
    M.vis($('#th2'), t, tU7 + 0.05, OUT('U8') + 1.5, { dy: 36, ...o });
    th2(t, { tin: tU7, tOpts: wt('U7', 'Is') - 0.1, tCount: T1('U7') + 0.05, dur: 3, tAns: T0('U8') - 0.02, tWhy: wt('U8', 'still') });
    avA(t, wt('U6', 'slopes') - 0.1, tU7 - 0.2);
  }

  /* W: worked example */
  const wOn = t >= tW - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, tW + 0.2, 1e9, { dy: 14 });
    wsol(t, tW, tWs);
    M.vis(wP, t, wt('W5', 'Double') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, tW + 0.2, out, { dx: 60, dy: 0, ...o });
    const su = Math.max(0, (t - tWd) * 0.5), uA = Math.min(1, su), uB2 = Math.min(Math.SQRT2, su);
    place(wMA, WXA, wcA + 0.5 * g * uA * uA * WPX); place(wMB, WXB, wcB + 0.5 * g * uB2 * uB2 * WPX);
    M.setT(wTA, uA.toFixed(2) + ' s'); M.setT(wTB, uB2.toFixed(2) + ' s');
    wTA.style.fill = uA >= 1 ? C.ok : C.ink; wTB.style.fill = uB2 >= Math.SQRT2 - 1e-6 ? C.ok : C.ink;
    M.vis(wTag, t, tWd - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'For') - 0.1, tStrike: T0('X3') - 0.05, tRight: wt('X3', 'If') - 0.1 });
    // ball goes up then down; red g arrow always points down
    const bu = M.clamp((t - wt('X3', 'Pick')) / 3), by = 200 - 110 * 4 * bu * (1 - bu);
    attr(trB, 'cy', by.toFixed(1)); M.hide(trB, t < wt('X2', 'thrown') - 0.1);
    const ga = M.io((t - wt('X3', 'minus') + 0.1) / 0.4); trG.set(330, by - 20, 330, by + 40 * ga); trGl.style.opacity = ga; attr(trGl, 'y', Math.min(240, by + 60).toFixed(1));
    const vv = 1 - 2 * bu; trV.set(220, by, 220, by - 60 * vv * M.clamp((t - wt('X2', 'thrown')) / 0.3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'When') - 0.1, tCount, tAns });
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
