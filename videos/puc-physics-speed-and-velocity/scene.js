// PUC Physics Ep 21: Speed and velocity (Motion notebook, two riders at one gate)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const SC = C.violet, VC = C.ac, IC = C.ink;          // colour-coding: speed / distance violet, velocity / displacement blue (v), position ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }, SPOP = { dy: 10, sp: M.SOFT, fade: 0.15 };
const lin = x => M.clamp(x);
const vK = `\\textcolor{${VC}}{\\vec v}`, vbK = `\\textcolor{${VC}}{\\bar v}`, dxK = `\\textcolor{${VC}}{\\Delta x}`, sK = `\\textcolor{${SC}}{s}`;
const MI = '\u2212';   // minus sign for signed readouts

Object.assign(M.IC, {
  meter: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  wind: ['M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2', 'M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M5.5 17.5 9 10h6l3.5 7.5', 'M13 6h3l-1 4'],
  split: ['M3 12h7', 'm6 8-4 4 4 4', 'M14 12h7', 'm18 8 4 4-4 4'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV4 = T0('V4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['meter', 'Speedometer', '60 · NO DIRECTION', 'speedometer'], ['wind', 'Wind report', '20 · FROM THE WEST', 'wind']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${560 + i * 420}px"><i>${M.icon(ic, 32, i ? VC : SC, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#hrs').innerHTML = `<div class="hr" id="hr0" style="top:84px"><svg width="160" height="140" id="hrS0"></svg><div class="jn">60 km/h</div><div class="jw">SPEEDOMETER · SIZE ONLY</div></div>
  <div class="hr" id="hr1" style="top:280px"><svg width="160" height="140" id="hrS1"></svg><div class="jn">20 km/h, from the west</div><div class="jw">WIND · SIZE + DIRECTION</div></div>`;
{ const s0 = $('#hrS0'); mk(s0, 'path', { d: 'M30,100 A50,50 0 1 1 130,100', fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }); }
const hNeedle = mk($('#hrS0'), 'line', { x1: 80, y1: 100, x2: 80, y2: 60, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' });
mk($('#hrS0'), 'circle', { cx: 80, cy: 100, r: 7, fill: IC });
const hWind = PUC.arrow($('#hrS1'), VC, 7, 22);
txt($('#hrS1'), 22, 120, 'W', { 'font-weight': 600, fill: IC }); txt($('#hrS1'), 138, 120, 'E', { 'font-weight': 600, fill: IC, 'text-anchor': 'end' });
const TILES = [['meter', 'Both: 18 km/h', SC], ['split', '10 min: 6 km apart', VC], ['help', 'How?', IC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}" style="color:${c}">${M.icon(ic, 26, c, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'Both'), wt('H4', 'after'), wt('H4', 'How')];

/* ---------- P ---------- */
$('#plF').innerHTML = K(`\\textcolor{${SC}}{\\text{speed}} = \\dfrac{\\text{distance}}{\\text{time}}`);
$('#prF').innerHTML = K(`${vK} = \\dfrac{\\text{displacement}}{\\text{time}}`);
const pl = $('#plS'), PC = [392, 400];
mk(pl, 'path', { d: `M${PC[0] - 120},${PC[1]} A120,120 0 1 1 ${PC[0] + 120},${PC[1]}`, fill: 'none', stroke: C.line, 'stroke-width': 14, 'stroke-linecap': 'round' });
const pArc = mk(pl, 'path', { d: `M${PC[0] - 120},${PC[1]} A120,120 0 0 1 ${PC[0] + 120},${PC[1]}`, fill: 'none', stroke: SC, 'stroke-width': 14, 'stroke-linecap': 'round' });
const pNd = mk(pl, 'line', { x1: PC[0], y1: PC[1], x2: PC[0], y2: PC[1] - 100, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(pl, 'circle', { cx: PC[0], cy: PC[1], r: 10, fill: IC });
const pRd = txt(pl, PC[0], PC[1] + 60, '5 m/s', { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: SC });
const pr = $('#prS');
mk(pr, 'line', { x1: 80, y1: 360, x2: 704, y2: 360, stroke: C.dim, 'stroke-width': 3 });
txt(pr, 84, 400, 'WEST', { 'font-weight': 600 }); txt(pr, 700, 400, 'EAST', { 'font-weight': 600, 'text-anchor': 'end' });
mk(pr, 'circle', { cx: 392, cy: 360, r: 10, fill: IC });
const pA1 = PUC.arrow(pr, VC, 8, 24), pA2 = PUC.arrow(pr, VC, 8, 24);
const pL1 = txt(pr, 530, 300, '+5 m/s', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: VC });
const pL2 = txt(pr, 254, 300, MI + '5 m/s', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: VC });

/* ---------- S: two riders ---------- */
const s = $('#simS'), RX = x => 392 + x * 0.45, RY = 300;     // 0.45 px per metre, gate at x 392
mk(s, 'rect', { x: 50, y: RY, width: 684, height: 26, fill: '#D9DCE3' });
mk(s, 'line', { x1: 50, y1: RY + 13, x2: 734, y2: RY + 13, stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '18 14' });
for (let m = -600; m <= 600; m += 200) { mk(s, 'line', { x1: RX(m), y1: RY + 30, x2: RX(m), y2: RY + 42, stroke: IC, 'stroke-width': 2 }); txt(s, RX(m), RY + 64, (m > 0 ? '+' : m < 0 ? MI : '') + Math.abs(m), { 'text-anchor': 'middle', 'font-size': 16 }); }
txt(s, 734, RY + 92, 'x (m) · east +', { 'text-anchor': 'end', 'font-size': 16 });
const gate = mk(s, 'g', {}); mk(gate, 'path', { d: `M${RX(0) - 30},${RY - 4} V${RY - 70} H${RX(0) + 30} V${RY - 4}`, fill: 'none', stroke: IC, 'stroke-width': 5, 'stroke-linejoin': 'round' }); txt(gate, RX(0), RY - 84, 'GATE', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: IC });
const bikeG = (col) => { const o = mk(s, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { cx: -18, cy: -16, r: 15, fill: 'none', stroke: IC, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 18, cy: -16, r: 15, fill: 'none', stroke: IC, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M-18,-16 L-6,-38 H12 L18,-16 M-6,-38 L2,-16 H-18 M12,-38 L9,-46 H17', fill: 'none', stroke: col, 'stroke-width': 3.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M-10,-46 H-1', stroke: IC, 'stroke-width': 4, 'stroke-linecap': 'round' }); return o; };
const RIDERS = [{ dir: 1, col: VC, name: 'AARAV' }, { dir: -1, col: C.mute, name: 'FRIEND' }];
RIDERS.forEach(r => { r.gh = [0, 1, 2].map(k => { const g = bikeG(r.col); g.setAttribute('opacity', [0.3, 0.2, 0.12][k]); return g; }); r.b = bikeG(r.col); r.lab = txt(s, 0, RY - 74, r.name, { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: r.dir > 0 ? VC : IC }); r.a = PUC.arrow(s, VC, 7, 20); r.vl = txt(s, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: VC }); });
const sep = mk(s, 'path', { fill: 'none', stroke: IC, 'stroke-width': 3 }), sepL = txt(s, RX(0), 480, '1200 m apart', { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 600, fill: IC });
const slT = txt(s, RX(0), 540, '', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: VC });
$('#roT').innerHTML = `<div class="rt2" style="top:74px"><span class="h">&nbsp;</span><span class="h">AARAV</span><span class="h">FRIEND</span>
  <span class="k" style="color:${SC}">speed</span><span class="v" id="rs0" style="color:${SC}">0 m/s</span><span class="v" id="rs1" style="color:${SC}">0 m/s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv0" style="color:${VC}">0 m/s</span><span class="v" id="rv1" style="color:${VC}">0 m/s</span>
  <span class="k" style="color:${IC}">x</span><span class="v" id="rx0">0 m</span><span class="v" id="rx1">0 m</span></div>`;
const G = PUC.graph($('#grS'), { x: 120, y: 64, w: 580, h: 170, xmax: 120, ymin: -600, ymax: 600, xt: [0, 40, 80], yt: [-600, 0, 600], xl: 't (s)' });
const gA = G.curve(VC, 5), gB = G.curve(IC, 5), gdA = G.dot(VC, 10), gdB = G.dot(IC, 10);
const gLa = txt($('#grS'), 0, 0, 'Aarav · slope +5', { 'font-size': 17, fill: VC, 'font-weight': 600, 'text-anchor': 'end' }), gLb = txt($('#grS'), 0, 0, 'Friend · slope ' + MI + '5', { 'font-size': 17, fill: IC, 'font-weight': 600, 'text-anchor': 'end' });
const tGo = wt('S2', 'rides'), tA = T1('S5'), tSl0 = tS6 + 0.1, tSl1 = tS8 - 0.15;
const simT = t => {
  if (t < tSl0) return 60 * lin((t - tGo) / (tA - tGo));
  if (t < tS8) return 60 + lin((t - tSl0 - 0.6) / 4);          // 1 s of ride in 4 s: 0.25x
  return 61 + 59 * M.io((t - tS8) / 2.4);
};
const moving = t => (t > tGo && t < tA) || (t > tSl0 + 0.6 && t < tSl0 + 4.6) || (t > tS8 && t < tS8 + 2.4);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same speedometer, opposite arrows.' });

/* ---------- D ---------- */
const STEPS = [[`\\textcolor{${SC}}{\\text{avg speed}} = \\dfrac{\\text{path length}}{\\text{total time}}`, 'every bend of the path counts'],
  [`${vbK} = \\dfrac{${dxK}}{\\Delta t} = \\dfrac{x_f - x_i}{t_f - t_i}`, 'only the start and the end count'],
  [`\\textcolor{${SC}}{\\text{avg speed}} \\ge |${vbK}|`, 'because distance ≥ |displacement|']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:150px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 160}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:34px">${K(f)}</div><div class="why" style="top:104px">${w}</div></div>`).join('');
$('#dst2 .why').style.top = '64px';
const tStep = [wt('D2', 'Average'), wt('D3', 'Average'), wt('D4', 'So')];
$('#dru').innerHTML = `<div class="du" id="du0" style="top:100px">${K(`\\text{unit:}\\;\\; \\dfrac{\\text{m}}{\\text{s}} = \\text{m/s} \\;\\;(\\text{m s}^{-1})`)}</div>
  <div class="du" id="du1" style="top:250px">${K(`18\\,\\text{km/h} = \\dfrac{18 \\times 1000\\,\\text{m}}{3600\\,\\text{s}}`)}</div>
  <div class="du" id="du2" style="top:390px">${K(`= \\textcolor{${SC}}{5\\,\\text{m/s}} \\quad \\text{(the same riders)}`)}</div>`;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vbK} = \\dfrac{${dxK}}{\\Delta t}`);

/* ---------- C: reasoning ---------- */
const LK = [['Displacement is a vector', 'IT HAS A DIRECTION'], ['Time is a scalar', 'NO DIRECTION'], ['Vector ÷ positive number = same direction', 'ONLY THE SIZE CHANGES']];
$('#lks').innerHTML = LK.map(([a, b], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="tx">${a}</div><div class="tg">${b}</div></div>`).join('') +
  `<div class="lkc" id="lkc"><div class="a">SO</div><div class="b">${K(`\\textcolor{#AFC6F7}{\\vec v} \\parallel \\textcolor{#AFC6F7}{\\Delta \\vec x}`)}</div><div class="c">velocity points the same way<br>as displacement: a vector</div></div>`;
const tLk = [T0('C2'), T0('C3'), T0('C4')];
const cr = $('#crS');
const cA1 = PUC.arrow(cr, VC, 9, 26), cA2 = PUC.arrow(cr, VC, 9, 26);
mk(cr, 'circle', { cx: 120, cy: 190, r: 9, fill: IC }); mk(cr, 'circle', { cx: 120, cy: 430, r: 9, fill: IC });
const cL1 = txt(cr, 120, 150, 'Δx = 10 m east', { 'font-size': 28, 'font-weight': 600, fill: VC });
const cDiv = txt(cr, 120, 300, '÷  Δt = 2 s', { 'font-size': 30, 'font-weight': 600, fill: IC });
const cL2 = txt(cr, 120, 390, 'v = 5 m/s east', { 'font-size': 28, 'font-weight': 600, fill: VC });
const cNote = txt(cr, 392, 530, 'shorter arrow, same direction', { 'font-size': 22, 'font-weight': 600, fill: C.mute, 'text-anchor': 'middle' });

/* ---------- K: round trip side by side ---------- */
const kl = $('#klS'), KX = m => 120 + m * 2.7, KY = 300;
mk(kl, 'line', { x1: 80, y1: KY, x2: 704, y2: KY, stroke: IC, 'stroke-width': 3 });
for (let m = 0; m <= 200; m += 50) { mk(kl, 'line', { x1: KX(m), y1: KY - 8, x2: KX(m), y2: KY + 8, stroke: IC, 'stroke-width': 2 }); txt(kl, KX(m), KY + 36, m, { 'text-anchor': 'middle', 'font-size': 17 }); }
txt(kl, KX(0), KY + 66, 'START = END', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: IC });
const kO = mk(kl, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }), kR = mk(kl, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const kGh = [0, 1, 2].map(k => mk(kl, 'circle', { r: 13, fill: IC, opacity: 0 })), kDot = mk(kl, 'circle', { r: 13, fill: IC, cx: KX(0), cy: KY });
const kRo = txt(kl, 36, 470, '', { 'font-size': 26, 'font-weight': 600, fill: SC }), kRo2 = txt(kl, 36, 510, '', { 'font-size': 26, 'font-weight': 600, fill: VC }), kRo3 = txt(kl, 36, 430, '', { 'font-size': 26, 'font-weight': 600, fill: IC });
[kRo, kRo2, kRo3].forEach(e => e.setAttribute('xml:space', 'preserve'));
const tKgo = wt('K1', 'two'), tKend = T1('K1') + 0.2;
const kS = t => 400 * lin((t - tKgo) / (tKend - tKgo));
$('#kcols').innerHTML = `<div class="kc" id="kc0" style="left:36px"><div class="h" style="color:${SC}">Average speed</div><div class="s">PATH ÷ TIME</div><div class="f">${K(`\\dfrac{400\\,\\text{m}}{80\\,\\text{s}}`)}</div><div class="v" style="color:${SC}">5 m/s</div><div class="c">never zero while moving</div></div>
  <div class="kc" id="kc1" style="left:408px"><div class="h" style="color:${VC}">Average velocity</div><div class="s">DISPLACEMENT ÷ TIME</div><div class="f">${K(`\\dfrac{0\\,\\text{m}}{80\\,\\text{s}}`)}</div><div class="v" style="color:${VC}">0 m/s</div><div class="c">back at the start</div></div>`;
const th1 = PUC.think($('#th1'), { q: 'Can a moving body have zero average velocity?', opts: ['Yes', 'No'], right: 0, why: 'Any round trip: displacement 0, so average velocity 0, though the speed was never 0.' });

/* ---------- V: steady speed on a circle ---------- */
const v = $('#vcS'), CC = [392, 300], CR = 170;
mk(v, 'circle', { cx: CC[0], cy: CC[1], r: CR, fill: 'none', stroke: C.line, 'stroke-width': 5 });
mk(v, 'circle', { cx: CC[0], cy: CC[1], r: 6, fill: IC });
const vGhA = [0, 1, 2].map(k => { const a = PUC.arrow(v, VC, 5, 16); a.g.setAttribute('opacity', [0.3, 0.2, 0.12][k]); return a; });
const vA = PUC.arrow(v, VC, 7, 22), vDot = mk(v, 'circle', { r: 13, fill: IC });
const vLab = txt(v, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: VC });
txt(v, 392, 548, 'r = 20 m · speed 5 m/s', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.mute });
$('#vroG').innerHTML = `<span class="k" style="color:${SC}">speed</span><span class="v" style="color:${SC}">5.0</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">direction</span><span class="v" id="vdir" style="color:${VC}">N</span><span class="u">heading</span>
  <span class="k" style="color:${VC}">v east</span><span class="v" id="vx" style="color:${VC}">0.0</span><span class="u">m/s</span>`;
const PER = 2 * Math.PI * 20 / 5;   // one lap: 25.1 s
const VG = PUC.graph($('#vgS'), { x: 120, y: 64, w: 580, h: 170, xmax: 25, ymin: -6, ymax: 6, xt: [0, 5, 10, 15, 20], yt: [-5, 0, 5], xl: 't (s)' });
const vgS = VG.curve(SC, 5), vgX = VG.curve(VC, 5), vdS = VG.dot(SC, 10), vdX = VG.dot(VC, 10);
const tVgo = T0('V2'), tVend = T1('V3');
const vT = t => PER * lin((t - tVgo) / (tVend - tVgo));   // sim seconds, one lap
const thOf = ts => ts / PER * 2 * Math.PI;                  // anticlockwise from east point
const HEAD = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
const th2 = PUC.think($('#th2'), { q: 'Aarav cycles round a circular track at a constant speed. Is his velocity constant?', opts: ['Yes', 'No'], right: 1, why: 'The size stays 5 m/s, but the direction keeps turning. New direction = new velocity.' });
const avV = PUC.avatar($('#sV'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The needle stays still, the arrow turns.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${SC}}{\\text{distance}} = 3\\,\\text{km}, \\;\\; t = 15\\,\\text{min} = \\tfrac14\\,\\text{h}`)],
  [K(`\\textcolor{${SC}}{\\text{avg speed}} = \\dfrac{3}{1/4} = \\textcolor{${SC}}{12\\,\\text{km/h}}`)],
  [K(`${dxK} = 2 - 1 = 1\\,\\text{km east}`)],
  [K(`${vbK} = \\dfrac{1}{1/4} = \\textcolor{${VC}}{4\\,\\text{km/h east}}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Total'), wt('W4', 'Average'), wt('W5', 'Displacement'), wt('W6', 'Average')];
const w = $('#wrS'), WX = k => 130 + k * 250, WY = 340;
mk(w, 'line', { x1: 90, y1: WY, x2: 694, y2: WY, stroke: IC, 'stroke-width': 3 });
for (let k = 0; k <= 2; k++) { mk(w, 'line', { x1: WX(k), y1: WY - 8, x2: WX(k), y2: WY + 8, stroke: IC, 'stroke-width': 2 }); txt(w, WX(k), WY + 36, k + ' km', { 'text-anchor': 'middle', 'font-size': 18 }); }
txt(w, 694, WY + 66, 'east +', { 'text-anchor': 'end', 'font-size': 16 });
const wO = mk(w, 'path', { d: `M${WX(0)},${WY - 110} H${WX(2)}`, fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const wR = mk(w, 'path', { d: `M${WX(2)},${WY - 110} C${WX(2) + 40},${WY - 110} ${WX(2) + 40},${WY - 60} ${WX(2)},${WY - 60} H${WX(1)}`, fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const wl1 = txt(w, WX(1), WY - 126, '2 km · 10 min', { 'text-anchor': 'middle', 'font-size': 22, fill: SC, 'font-weight': 600 });
const wl2 = txt(w, WX(1.5), WY - 74, '1 km · 5 min', { 'text-anchor': 'middle', 'font-size': 22, fill: SC, 'font-weight': 600 });
const wA = PUC.arrow(w, VC, 8, 22), wl3 = txt(w, WX(0.5), WY + 120, 'Δx = 1 km east', { 'text-anchor': 'middle', 'font-size': 24, fill: VC, 'font-weight': 600 });
$('#wcS').innerHTML = '12 km/h'; $('#wcD').innerHTML = '4 km/h east';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Average speed = |average velocity|, always', right: 'Only on a straight path with no turning back' });
const tp = $('#tpS'), BX = 80, BW = 90;
const bS = mk(tp, 'rect', { x: BX, width: BW, rx: 8, fill: SC }), bV = mk(tp, 'rect', { x: BX + 140, width: BW, rx: 8, fill: VC });
txt(tp, BX + BW / 2, 250, 'speed', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: SC }); txt(tp, BX + 140 + BW / 2, 250, '|v̄|', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: VC });
const bL1 = txt(tp, BX + BW / 2, 0, '12', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: SC }), bL2 = txt(tp, BX + 140 + BW / 2, 0, '4', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: VC });
const where = PUC.where($('#wa'), { on: [], type: 'One step problems: round trip, part of a circle, a journey with stops' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Half a circular track of radius 21 m in 11 s. Average speed and magnitude of average velocity? (π = 22/7)', qW: 780,
  opts: ['6 m/s and 6 m/s', '6 m/s and 3.82 m/s', '3.82 m/s and 6 m/s', '6 m/s and 0 m/s'], right: 1, optW: 474, optH: 96, optFs: 30, optY: 320 });
const so = PUC.solution($('#so'), [[K(`${sK} = \\pi r = \\tfrac{22}{7}\\times 21 = 66\\,\\text{m}`)], [K(`\\textcolor{${SC}}{\\text{speed}} = \\tfrac{66}{11} = 6\\,\\text{m/s}`)], [K(`|${dxK}| = 2r = 42\\,\\text{m}`)], [K(`|${vbK}| = \\tfrac{42}{11} \\approx 3.82\\,\\text{m/s}`)]], { y0: 100, dy: 118 });
const tSo = [wt('A2', 'distance'), wt('A2', 'Sixty', 1), wt('A3', 'displacement'), wt('A4', 'Forty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · speed vs velocity', y0: 96, dy: 94, txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${SC}}{\\text{avg speed}} = \\text{path length} / \\text{time} \\;\\; \\text{(scalar)}`), K(`${vbK} = ${dxK} / \\Delta t \\;\\; \\text{(vector, same unit m/s)}`),
    '<b>Avg speed ≥ |avg velocity|</b>: equal only on a one-way straight path', '<b>Round trip</b>: avg velocity 0 &nbsp;·&nbsp; <b>circle at steady speed</b>: velocity changes'] });
const YQ = ['Why is velocity a vector, while speed is a scalar?', 'Constant speed with a changing velocity: possible?', 'Average velocity after one full round trip?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 22', topic: 'Velocity at one single instant? Average and Instantaneous Velocity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.2, 1.05, 900, 480], [tS8 + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  if (x > 760) { $('#wq2').style.left = '36px'; $('#wq2').style.top = '424px'; }
  $('#wcD').style.left = (36 + $('#wcS').offsetWidth + 24) + 'px';
}
const fmS = n => (Math.abs(n) < 0.5 ? '0' : (n > 0 ? '+' : MI) + Math.round(Math.abs(n))) + ' m';

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
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    M.vis($('#hr0'), t, tMorph + 0.3, 1e9, { dy: 16 }); M.vis($('#hr1'), t, tMorph + 0.45, 1e9, { dy: 16 });
    const an = -Math.PI / 2 + 0.55 * M.spring(t - tMorph - 0.5, M.SOFT); attr(hNeedle, 'x2', (80 + 40 * Math.cos(an)).toFixed(1)); attr(hNeedle, 'y2', (100 + 40 * Math.sin(an)).toFixed(1));
    const a = M.io((t - wt('H2', 'other') + 0.1) / 0.5); hWind.set(30, 70, 30 + 100 * a, 70);
    M.vis($('#hjP'), t, wt('H2', 'matter') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#plF'), t, wt('P1', 'distance') - 0.2, 0.8);
    const u = M.spring(t - wt('P1', 'fast'), M.SOFT); M.drawU(pArc, 0.5 * u); const an = Math.PI + Math.PI * 0.5 * u; attr(pNd, 'x2', (PC[0] + 100 * Math.cos(an)).toFixed(1)); attr(pNd, 'y2', (PC[1] + 100 * Math.sin(an)).toFixed(1));
    M.vis(pRd, t, wt('P1', 'fast'), 1e9, { dy: 8 });
    M.vis($('#plT'), t, wt('P2', 'scalar') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#prF'), t, wt('P3', 'displacement') - 0.2, 0.8);
    const a1 = M.io((t - wt('P3', 'which') + 0.1) / 0.5), a2 = M.io((t - wt('P4', 'direction') + 0.1) / 0.5);
    pA1.set(392, 330, 392 + 220 * a1, 330); pA2.set(392, 390, 392 - 220 * a2, 390); attr(pL2, 'y', 450);
    pL1.style.opacity = a1.toFixed(3); pL2.style.opacity = a2.toFixed(3);
    M.vis($('#prT'), t, wt('P4', 'metres') - 0.1, 1e9, POP);
  }

  /* S: two riders */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); M.vis($('#exS'), t, tS1 + 0.7, 1e9, { dy: 8 });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(gate, t, tS1 + 0.4, 1e9, SPOP);
    const ts = simT(t), mv = moving(t), slo = t >= tSl0 && t < tSl1 + 0.3;
    RIDERS.forEach((r, i) => {
      const x = r.dir * 5 * ts, px = RX(x);
      r.b.setAttribute('transform', `translate(${px.toFixed(1)},${RY}) scale(${r.dir},1)`); r.b.style.opacity = M.clamp((t - wt('S2', i ? 'friend' : 'Aarav') + 0.1) / 0.2).toFixed(3);
      r.gh.forEach((g, k) => { const xg = RX(r.dir * 5 * simT(t - (slo ? 0.35 : 0.1) * (k + 1))); g.setAttribute('transform', `translate(${xg.toFixed(1)},${RY}) scale(${r.dir},1)`); M.hide(g, !mv || Math.abs(xg - px) < 3); });
      attr(r.lab, 'x', px.toFixed(1)); M.vis(r.lab, t, wt('S2', i ? 'friend' : 'Aarav'), 1e9, { dy: 6 });
      const on = M.io((t - wt('S2', 'east') - (i ? wt('S2', 'west') - wt('S2', 'east') : 0) + 0.1) / 0.4) * (slo ? 1.6 : 1), L = 70 * on;
      r.a.set(px + r.dir * 30, RY - 110, px + r.dir * (30 + L), RY - 110);
      M.setT(r.vl, (r.dir > 0 ? '+' : MI) + '5 m/s'); attr(r.vl, 'x', (px + r.dir * (30 + L / 2)).toFixed(1)); attr(r.vl, 'y', RY - 126); r.vl.style.opacity = M.clamp(on).toFixed(3);
      M.setT($('#rs' + i), (t > tGo ? 5 : 0) + ' m/s'); M.setT($('#rv' + i), t > tGo ? (r.dir > 0 ? '+5' : MI + '5') + ' m/s' : '0 m/s'); M.setT($('#rx' + i), fmS(x));
    });
    const hs = M.io((t - wt('S3', 'same') + 0.1) / 0.3) * (1 - M.io((t - T0('S4')) / 0.3)), hv = M.io((t - wt('S4', 'plus') + 0.1) / 0.3) * (1 - M.io((t - T0('S5')) / 0.3));
    [0, 1].forEach(i => { $('#rs' + i).style.background = mix('#FFFFFF', C.ac3 || C.ac2, hs); $('#rv' + i).style.background = mix('#FFFFFF', C.ac2, hv); });
    // slow-mo tag + per-second distance note
    M.vis($('#slo'), t, tSl0, tSl1, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25 });
    M.setT(slT, 'in 1 s: 5 m east · 5 m west'); M.vis(slT, t, wt('S7', 'second') - 0.1, tSl1, { dy: 8 });
    // separation bracket
    const sp = M.io((t - wt('S8', 'apart') + 0.3) / 0.4), xa = RX(5 * ts), xb = RX(-5 * ts);
    attr(sep, 'd', `M${xb.toFixed(1)},430 v12 H${xa.toFixed(1)} v-12`); sep.style.opacity = sp.toFixed(3); M.hide(sep, sp <= 0); sepL.style.opacity = sp.toFixed(3);
    // graph
    gA(u => [u, 5 * u], 0, ts); gB(u => [u, -5 * u], 0, ts); gdA(ts, 5 * ts, t > tGo - 0.2); gdB(ts, -5 * ts, t > tGo - 0.2);
    const gl = M.io((t - wt('S5', 'climbs') + 0.1) / 0.3); attr(gLa, 'x', G.X(48)); attr(gLa, 'y', G.Y(480)); attr(gLb, 'x', G.X(48)); attr(gLb, 'y', G.Y(-400));
    gLa.style.opacity = (gl * (ts > 30 ? 1 : 0)).toFixed(3); gLb.style.opacity = (M.io((t - wt('S5', 'falls') + 0.1) / 0.3) * (ts > 30 ? 1 : 0)).toFixed(3);
    avA(t, wt('S8', 'twelve') + 0.6, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 244], [tStep[2] - 0.1, 404]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = (t > tStep[2] - 0.1 ? 104 : 150) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    PUC.write($('#du0'), t, wt('D3', 'v') - 0.1, 0.8);
    PUC.write($('#du1'), t, wt('D5', 'Eighteen') - 0.1, 0.8); PUC.write($('#du2'), t, wt('D5', 'five') - 0.1, 0.7);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Speed') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'which') + 0.1, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    M.vis($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); const on = M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('C5'))) / 0.3)); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#lkc'), t, T0('C5') - 0.05, 1e9, { dy: 24 });
    M.vis($('#cr'), t, tC1 + 0.5, out, { dx: 60, dy: 0, ...o }); M.vis($('#exC'), t, tC1 + 0.9, 1e9, { dy: 8 });
    const a1 = M.io((t - tLk[0] - 0.2) / 0.6); cA1.set(120, 190, 120 + 520 * a1, 190); M.vis(cL1, t, tLk[0] + 0.6, 1e9, { dy: 8 });
    M.vis(cDiv, t, tLk[1] + 0.1, 1e9, SPOP);
    const a2 = M.io((t - wt('C4', 'keeps') + 0.1) / 0.6); cA2.set(120, 430, 120 + 260 * a2, 430); M.vis(cL2, t, wt('C4', 'keeps') + 0.4, 1e9, { dy: 8 });
    M.vis(cNote, t, wt('C4', 'direction') - 0.1, 1e9, { dy: 8 });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exK'), t, tK1 + 0.5, 1e9, { dy: 8 });
    const sv = kS(t), x = sv <= 200 ? sv : 400 - sv;
    attr(kO, 'd', sv > 0 ? `M${KX(0)},${KY - 90} H${KX(Math.min(sv, 200)).toFixed(1)}` : ''); M.hide(kO, sv <= 0);
    attr(kR, 'd', sv > 200 ? `M${KX(200)},${KY - 90} C${KX(200) + 30},${KY - 90} ${KX(200) + 30},${KY - 50} ${KX(200)},${KY - 50} H${KX(x).toFixed(1)}` : ''); M.hide(kR, sv <= 200);
    attr(kDot, 'cx', KX(x).toFixed(1)); kGh.forEach((g, k) => { const sg = kS(t - 0.12 * (k + 1)), xg = sg <= 200 ? sg : 400 - sg; attr(g, 'cx', KX(xg).toFixed(1)); attr(g, 'cy', KY); g.style.opacity = Math.abs(xg - x) > 1 ? [0.3, 0.2, 0.12][k] : 0; });
    M.setT(kRo3, `time   ${Math.round(80 * sv / 400)} s`); M.setT(kRo, `path   ${Math.round(sv)} m`); M.setT(kRo2, `Δx     ${Math.round(x)} m`);
    [kRo3, kRo, kRo2].forEach(e => M.vis(e, t, tKgo - 0.2, 1e9, { dy: 6 }));
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kc0'), t, wt('K2', 'speed') - 0.1, 1e9, { dy: 24 }); M.vis($('#kc1'), t, wt('K2', 'velocity') - 0.1, 1e9, { dy: 24 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'zero') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'round') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vc'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#vro'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#exV'), t, tV1 + 0.7, 1e9, { dy: 8 }); M.vis($('#vgr'), t, tV1 + 0.45, out, { dy: 36, ...o });
    const place = (ts) => { const th = thOf(ts), px = CC[0] + CR * Math.cos(th), py = CC[1] - CR * Math.sin(th), tx = -Math.sin(th), ty = -Math.cos(th); return [px, py, tx, ty, th]; };
    const ts = vT(t), [px, py, tx, ty, th] = place(ts), on = M.io((t - wt('V2', 'velocity') + 0.1) / 0.4), L = 110 * on;
    attr(vDot, 'cx', px.toFixed(1)); attr(vDot, 'cy', py.toFixed(1));
    vA.set(px, py, px + tx * L, py + ty * L); attr(vLab, 'x', (px + tx * (L + 22) - 8).toFixed(1)); attr(vLab, 'y', (py + ty * (L + 22) + 10).toFixed(1)); vLab.style.opacity = on.toFixed(3);
    vGhA.forEach((a, k) => { const tsg = vT(t - 0.5 * (k + 1)), [gx, gy, gtx, gty] = place(tsg); if (Math.abs(tsg - ts) > 0.05 && on > 0.5) a.set(gx, gy, gx + gtx * 80, gy + gty * 80); else a.set(0, 0, 0, 0); });
    const hd = Math.round(((th / (2 * Math.PI)) * 8) % 8 + 8) % 8; M.setT($('#vdir'), HEAD[hd]);
    M.setT($('#vx'), (5 * tx).toFixed(1).replace('-', MI).replace(/^-?0\.0$/, '0.0'));
    vgS(u => [u, 5], 0, ts); vgX(u => [u, -5 * Math.sin(thOf(u))], 0, ts); vdS(ts, 5, t > tVgo); vdX(ts, -5 * Math.sin(th), t > tVgo);
    avV(t, wt('V3', 'curve') - 0.2, out);
    M.vis($('#th2'), t, tV4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'velocity') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'size') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wO, t, wt('W2', 'two') - 0.1, 0.8); M.vis(wl1, t, wt('W2', 'ten'), 1e9, { dy: 8 });
    M.draw(wR, t, wt('W2', 'one') - 0.1, 0.8); M.vis(wl2, t, wt('W2', 'five'), 1e9, { dy: 8 });
    const a = M.io((t - tW[2] + 0.1) / 0.6); wA.set(WX(0), WY + 80, WX(0) + (WX(1) - WX(0)) * a, WY + 80); M.vis(wl3, t, wt('W5', 'One'), 1e9, { dy: 8 });
    M.vis($('#wcS'), t, wt('W4', 'Twelve') + 0.1, 1e9, POP); M.vis($('#wcD'), t, wt('W6', 'Four') + 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'average') - 0.1, tStrike: wt('X3', 'not') - 0.1, tRight: wt('X3', 'four') + 0.5 });
    const h1 = 150 * M.io((t - wt('X3', 'twelve') + 0.1) / 0.5), h2 = 50 * M.io((t - wt('X3', 'four') + 0.1) / 0.5);
    attr(bS, 'y', (226 - h1).toFixed(1)); attr(bS, 'height', h1.toFixed(1)); attr(bV, 'y', (226 - h2).toFixed(1)); attr(bV, 'height', h2.toFixed(1));
    attr(bL1, 'y', (216 - h1).toFixed(1)); attr(bL2, 'y', (216 - h2).toFixed(1)); bL1.style.opacity = M.clamp(h1 / 60).toFixed(3); bL2.style.opacity = M.clamp(h2 / 30).toFixed(3);
    M.hide(bS, h1 < 1); M.hide(bV, h2 < 1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'one') });
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
