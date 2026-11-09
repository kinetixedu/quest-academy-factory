// PUC Electronics Ep 41 - Diode V-I characteristics ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, holes hollow orange, V teal, I violet, r_d and R ink, barrier energy gold
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GO = '#B7791F', RED = '#D64545';
const CB_F = '#FFF4D6', VB_F = '#E3E6EC', CB_S = '#E8C77A', VB_S = '#B8BCC6';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const steps = (host, rows) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => { e.querySelector('.n').textContent = i + 1; }); return r; };
const runSteps = (rows, t, ts, tout = 1e9) => rows.forEach((r, i) => { M.vis(r, t, ts[i] - 0.1, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6);
  const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
const dot = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const hole = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: OR, 'stroke-width': 3 });
const mv = (e, x, y) => { PUC.attr(e, 'cx', x.toFixed(1)); PUC.attr(e, 'cy', y.toFixed(1)); };
/* double-headed energy arrow (gold) */
const dArrow = (p, x, y1, y2, col = GO) => { const g = mk(p, 'g'); W(g, `M${x},${y1 + 4} V${y2 - 4}`, { stroke: col, 'stroke-width': 3.5 });
  mk(g, 'path', { d: `M${x},${y1} l-8,14 h16 Z`, fill: col }); mk(g, 'path', { d: `M${x},${y2} l-8,-14 h16 Z`, fill: col }); return g; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions, roll-mode traces (newest at the right) */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};
const diode = (p, x, y, s = 1, a = {}) => { const g = mk(p, 'g'); mk(g, 'path', { d: `M${x - 16 * s},${y - 18 * s} L${x - 16 * s},${y + 18 * s} L${x + 16 * s},${y} Z`, fill: a.fill || '#fff', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }); W(g, `M${x + 16 * s},${y - 18 * s} V${y + 18 * s}`); return g; };
const lerpK = (keys, t) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return va + (vb - va) * M.io((t - a) / (b - a)); } return keys[keys.length - 1][1]; };
const jig = (e, x, y, t, k, a = 1.5) => mv(e, x + a * Math.sin(t * 5.3 + k * 2.1), y + a * Math.cos(t * 4.7 + k * 1.3));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'puts') - 0.3;
const tG = T0('G1'), tF2 = T0('F1'), tR = T0('R1'), tB = T0('B1'), tS = T0('S1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('FC'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const lampCard = (s, flip) => {
  const cells = [0, 1].map(i => { const x = 40 + i * 120, g = mk(s, 'g'); mk(g, 'rect', { x, y: 74, width: 108, height: 52, rx: 8, fill: '#DCE1EA', stroke: INK, 'stroke-width': 3 });
    mk(g, 'rect', { x: flip ? x - 10 : x + 108, y: 90, width: 10, height: 20, rx: 2, fill: INK }); tx(g, x + (flip ? 84 : 24), 108, flip ? '-' : '+', { 'text-anchor': 'middle', 'font-size': 24 }); return g; });
  const wr = W(s, 'M288,100 H460', { 'stroke-width': 4, stroke: '#9AA0AC' });
  const lamp = mk(s, 'circle', { cx: 520, cy: 100, r: 56, fill: '#C9CDD6', stroke: INK, 'stroke-width': 4 });
  const mark = tx(s, 640, 116, flip ? '✓' : '✗', { fill: flip ? C.ok : RED, 'font-size': 52 });
  return { cells, wr, lamp, mark };
};
const L1 = lampCard($('#h1S'), false), L2 = lampCard($('#h2S'), true);
const dIn = diode($('#h2S'), 520, 100, 0.9), dInL = mono($('#h2S'), 520, 190, 'a diode inside', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: INK });
const tClick = wt('H2', 'clicks'), tFlip = wt('H3', 'flips'), tShine = wt('H3', 'shines'), tDio = wt('I1', 'diode');

/* ================= G: swing door ================= */
const gS = $('#gS');
const wall = [W(gS, 'M40,300 H290', { 'stroke-width': 10 }), W(gS, 'M494,300 H744', { 'stroke-width': 10 })];
const door = W(gS, '', { 'stroke-width': 10, stroke: '#B7791F' }), hinge = mk(gS, 'circle', { cx: 290, cy: 300, r: 10, fill: INK });
const stop = mk(gS, 'rect', { x: 462, y: 262, width: 26, height: 26, rx: 4, fill: INK }), stopL = mono(gS, 500, 256, 'doorstep', { 'font-size': 16, 'font-weight': 600, fill: INK });
const sprL = mono(gS, 200, 346, 'strong spring', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: '#B7791F' });
const sideL = [mono(gS, 60, 200, 'FRONT', { 'font-size': 17, 'font-weight': 600 }), mono(gS, 60, 420, 'BACK', { 'font-size': 17, 'font-weight': 600 })];
const pF = PUC.arrow(gS, INK, 8, 22), pB = PUC.arrow(gS, INK, 8, 22);
const crack = W(gS, '', { stroke: RED, 'stroke-width': 4 });
const gState = mono(gS, 392, 560, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: INK });
const tG2 = wt('G2', 'Push'), tG3 = wt('G3', 'harder'), tSw = wt('G3', 'swings'), tG4 = wt('G4', 'Push'), tG5 = wt('G5', 'break');

/* ================= F: forward / reverse bias ================= */
const biasCard = (s, fwd) => {
  const o = {};
  o.p = mk(s, 'rect', { x: 140, y: 210, width: 252, height: 100, fill: '#FDF3EA', stroke: OR, 'stroke-width': 3 }); o.n = mk(s, 'rect', { x: 392, y: 210, width: 252, height: 100, fill: '#FFFAEC', stroke: AM, 'stroke-width': 3 });
  o.dep = mk(s, 'rect', { x: 332, y: 212, width: 120, height: 96, fill: 'rgba(22,33,62,0.12)' });
  o.lab = [tx(s, 154, 200, 'p', { 'font-style': 'italic', fill: '#9A4A0E', 'font-size': 26 }), tx(s, 630, 200, 'n', { 'text-anchor': 'end', 'font-style': 'italic', fill: '#8A5A00', 'font-size': 26 })];
  o.w = [W(s, 'M140,260 H90 V120 H366'), W(s, 'M414,120 H694 V260 H644')];
  const xl = fwd ? 370 : 410, xs = fwd ? 410 : 370;
  o.bat = [W(s, `M${xl},92 V148`, { 'stroke-width': 5 }), W(s, `M${xs},106 V134`, { 'stroke-width': 9 })];
  o.bl = [tx(s, xl - (fwd ? 26 : -12), 88, '+', { 'font-size': 26 }), tx(s, xs + (fwd ? 12 : -26), 88, '-', { 'font-size': 28 })];
  o.car = []; for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { o.car.push({ e: hole(s, 0, 0, 8), x: 166 + i * 36, y: 240 + j * 40 }); o.car.push({ e: dot(s, 0, 0, 8), x: 618 - i * 36, y: 240 + j * 40 }); }
  o.hT = mono(s, 40, 346, 'ENERGY HILL', { 'font-size': 16, 'font-weight': 600, fill: INK });
  o.hill = W(s, '', { 'stroke-width': 5, stroke: GO });
  o.pills = (fwd ? ['Barrier lower', 'Layer thinner', 'Big current'] : ['Barrier higher', 'Layer wider', 'Tiny leak (µA)']).map((s2, i) => { const d = document.createElement('div'); d.className = 'pillp' + (i === 2 ? (fwd ? ' good' : ' bad') : ''); d.style.cssText = `left:${32 + i * 236}px;top:530px;height:44px;font-size:20px`; d.textContent = s2; s.parentNode.appendChild(d); return d; });
  o.flow = flow(s, fwd ? [[414, 120], [694, 120], [694, 260], [96, 260], [90, 260], [90, 120], [366, 120]] : [[370, 120], [90, 120], [90, 260], [694, 260], [694, 120], [414, 120]], 18, { skip: (x, y) => y > 200 && x > 140 && x < 644 });
  return o;
};
const FB = biasCard($('#fS'), true), RB = biasCard($('#rS'), false);
const hillD = (o, h) => PUC.attr(o.hill, 'd', `M110,${(500 - h).toFixed(1)} H330 C370,${(500 - h).toFixed(1)} 410,500 450,500 H680`);
const tF2b = wt('F2', 'Connect'), tF3 = wt('F3', 'forward'), tF4 = wt('F4', 'lower'), tF5 = wt('F5', 'thinner'), tF6 = wt('F6', 'flood');
const tR1 = wt('R1', 'flip'), tR3 = wt('R3', 'pulls'), tR4 = wt('R4', 'wider'), tR4b = wt('R4', 'higher'), tR5 = wt('R5', 'leak');

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bW = [W(ck, 'M120,262 V110 H260'), W(ck, 'M380,110 H470'), W(ck, 'M530,110 H628'), W(ck, 'M692,110 H820 V430 H120 V298')];
const res = W(ck, 'M260,110 L270,94 L290,126 L310,94 L330,126 L350,94 L370,126 L380,110', { 'stroke-width': 4 }), resL = [tx(ck, 320, 76, 'R', { 'text-anchor': 'middle', 'font-style': 'italic' }), mono(ck, 320, 160, 'protects the diode', { 'text-anchor': 'middle', 'font-size': 15 })];
const amm = mk(ck, 'circle', { cx: 500, cy: 110, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), ammT = tx(ck, 500, 119, 'A', { 'text-anchor': 'middle', 'font-size': 26, fill: VI });
const dB = diode(ck, 660, 110, 1), dBL = [mono(ck, 636, 76, 'p', { 'font-size': 18, 'font-weight': 600, fill: '#9A4A0E' }), mono(ck, 680, 76, 'n', { 'font-size': 18, 'font-weight': 600, fill: '#8A5A00' })];
const vW = W(ck, 'M612,110 V214 H632 M688,214 H708 V110', { 'stroke-width': 3 }), vm = mk(ck, 'circle', { cx: 660, cy: 214, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vmT = tx(ck, 660, 223, 'V', { 'text-anchor': 'middle', 'font-size': 26, fill: TE });
const batL = W(ck, 'M84,262 H156', { 'stroke-width': 5 }), batS = W(ck, 'M102,298 H138', { 'stroke-width': 9 }), batA = W(ck, 'M80,318 L160,240', { 'stroke-width': 3, stroke: '#9AA0AC' }), batAH = mk(ck, 'path', { d: 'M160,240 l-14,2 l12,12 Z', fill: '#9AA0AC' });
const sgn = [tx(ck, 52, 270, '+', { 'font-size': 28 }), tx(ck, 56, 314, '-', { 'font-size': 30 })];
const supL = mono(ck, 172, 288, 'variable supply', { 'font-size': 15 });
const knob = mk(ck, 'circle', { cx: 400, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), kPtr = W(ck, '', { 'stroke-width': 5, stroke: TE }), kL = mono(ck, 400, 236, 'SUPPLY KNOB', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600 });
const pathF = [[120, 298], [120, 430], [820, 430], [820, 110], [120, 110], [120, 262]];
const skipB = (x, y) => y < 128 && ((x > 256 && x < 384) || (x > 466 && x < 534) || (x > 624 && x < 696));
const eF = flow(ck, pathF, 24, { skip: skipB }), eR = flow(ck, [...pathF].reverse(), 24, { skip: skipB });
// graph
const gc = $('#gcS'), OX = 400, OY = 160;
const gx = v => v >= 0 ? OX + v / 0.9 * 200 : OX + v / 60 * 340, gyF = i => OY - i / 30 * 130, gyR = u => Math.min(292, OY + u / 10 * 110);
const gAx = [W(gc, `M50,${OY} H620`, { 'stroke-width': 2.5 }), W(gc, `M${OX},40 V292`, { 'stroke-width': 2.5 })];
const gLab = [mono(gc, 626, OY - 8, 'V', { 'text-anchor': 'end', 'font-size': 16, fill: TE, 'font-weight': 600 }), mono(gc, OX + 10, 52, 'I (mA)', { 'font-size': 15, fill: VI, 'font-weight': 600 }), mono(gc, OX + 10, 288, 'I (µA)', { 'font-size': 15, fill: VI, 'font-weight': 600 }),
  mono(gc, gx(0.7), OY + 22, '0.7', { 'text-anchor': 'middle', 'font-size': 14 }), mono(gc, gx(-50), OY - 10, '-50', { 'text-anchor': 'middle', 'font-size': 14 }), mono(gc, 54, OY - 10, 'V (volts)', { 'font-size': 13, fill: TE })];
const gTk = [W(gc, `M${gx(0.7)},${OY - 5} V${OY + 5}`, { 'stroke-width': 2 }), W(gc, `M${gx(-50)},${OY - 5} V${OY + 5}`, { 'stroke-width': 2 })];
const uHi = [mk(gc, 'rect', { x: OX + 4, y: 36, width: 70, height: 22, rx: 5, fill: '#F7E6C2' }), mk(gc, 'rect', { x: OX + 4, y: 272, width: 70, height: 22, rx: 5, fill: '#F7E6C2' })];
gc.insertBefore(uHi[0], gLab[1]); gc.insertBefore(uHi[1], gLab[2]);
const cF = W(gc, '', { stroke: VI, 'stroke-width': 4 }), cR = W(gc, '', { stroke: VI, 'stroke-width': 4 }), gDot = mk(gc, 'circle', { r: 8, fill: VI, stroke: '#fff', 'stroke-width': 2 });
const knee = mk(gc, 'circle', { r: 16, fill: 'none', stroke: GO, 'stroke-width': 3 }), kneeL = mono(gc, 0, 0, 'knee', { 'font-size': 15, 'font-weight': 600, fill: GO });
const bdL = mono(gc, gx(-50) - 8, 250, 'breakdown', { 'text-anchor': 'end', 'font-size': 15, 'font-weight': 600, fill: RED });
const IF = v => 10 * Math.exp((v - 0.7) / 0.05) - 10 * Math.exp(-14);
const IRu = u => 1 * (1 - Math.exp(-u / 1.5)) + (u > 50 ? 40 * (u - 50) : 0);
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">0.00</span><span class="u" id="rVu">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u" id="rIu">mA</span>`;
const tB4 = wt('B4', 'Turn'), tB9 = T0('B9');
const VFk = [[tB4 + 0.3, 0], [wt('B5', 'two'), 0.2], [wt('B5', 'four'), 0.4], [wt('B6', 'seven'), 0.7], [T1('B6'), 0.75]];
const VRk = [[wt('B9', 'turn'), 0], [T0('B10') + 0.5, 12], [wt('B10', 'flat'), 45], [wt('B11', 'breakdown'), 50], [wt('B11', 'shoots') + 0.6, 52]];
const avB = PUC.avatar($('#sB'), { x: 192, y: 762, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'So the lamp cared which way the batteries went!' });

/* ================= W: dynamic resistance ================= */
const wS = $('#wS'), XV = v => 90 + (v - 0.6) / 0.2 * 610, YI = i => 470 - i / 30 * 370;
const wAx = [W(wS, 'M90,470 H710', { 'stroke-width': 2.5 }), W(wS, 'M90,470 V90', { 'stroke-width': 2.5 })];
const wTk = []; [0.6, 0.7, 0.8].forEach(v => { wTk.push(W(wS, `M${XV(v)},464 V476`, { 'stroke-width': 2.5 }), mono(wS, XV(v), 498, v.toFixed(2), { 'text-anchor': 'middle', 'font-size': 15 })); });
[10, 20, 30].forEach(i => { wTk.push(W(wS, `M84,${YI(i)} H96`, { 'stroke-width': 2.5 }), mono(wS, 76, YI(i) + 5, String(i), { 'text-anchor': 'end', 'font-size': 15 })); });
const wAL = [mono(wS, 710, 520, 'V (volts)', { 'text-anchor': 'end', 'font-size': 15, fill: TE, 'font-weight': 600 }), mono(wS, 100, 82, 'I (mA)', { 'font-size': 15, fill: VI, 'font-weight': 600 })];
const aI = 0.001224, bI = 12.77, IW = v => aI * Math.exp(bI * v);
const wOhm = W(wS, `M${XV(0.6)},${YI(2.6)} L${XV(0.8)},${YI(28)}`, { 'stroke-width': 3, stroke: '#9AA0AC', 'stroke-dasharray': '10 8' }), wOhmL = mono(wS, XV(0.61), 320, 'resistor: straight', { 'font-size': 15, fill: '#6B7280', 'font-weight': 600 });
const wCur = W(wS, '', { stroke: VI, 'stroke-width': 5 }), wCurL = mono(wS, XV(0.72) - 20, YI(28), 'diode: curved', { 'text-anchor': 'end', 'font-size': 15, fill: VI, 'font-weight': 600 });
const P1 = [XV(0.72), YI(12)], P2 = [XV(0.76), YI(20)];
const wG = [W(wS, `M${P1[0]},${P1[1]} V470 M${P1[0]},${P1[1]} H90`, { 'stroke-width': 2, stroke: '#B8BCC6', 'stroke-dasharray': '5 6' }), W(wS, `M${P2[0]},${P2[1]} V470 M${P2[0]},${P2[1]} H90`, { 'stroke-width': 2, stroke: '#B8BCC6', 'stroke-dasharray': '5 6' })];
const wP = [mk(wS, 'circle', { cx: P1[0], cy: P1[1], r: 9, fill: VI }), mk(wS, 'circle', { cx: P2[0], cy: P2[1], r: 9, fill: VI })];
const wPL = [mono(wS, P1[0] - 14, P1[1] - 12, '0.72 V, 12 mA', { 'text-anchor': 'end', 'font-size': 15, 'font-weight': 600, fill: INK }), mono(wS, P2[0] - 14, P2[1] - 14, '0.76 V, 20 mA', { 'text-anchor': 'end', 'font-size': 15, 'font-weight': 600, fill: INK })];
const tdV = W(wS, `M${P1[0]},${P1[1]} H${P2[0]}`, { stroke: TE, 'stroke-width': 5 }), tdI = W(wS, `M${P2[0]},${P1[1]} V${P2[1]}`, { stroke: VI, 'stroke-width': 5 });
const tdVL = tx(wS, (P1[0] + P2[0]) / 2, P1[1] + 30, 'ΔV', { 'text-anchor': 'middle', fill: TE, 'font-size': 22 }), tdIL = tx(wS, P2[0] + 12, (P1[1] + P2[1]) / 2 + 8, 'ΔI', { fill: VI, 'font-size': 22 });
const VC = s => `\\textcolor{${TE}}{${s}}`, IC = s => `\\textcolor{${VI}}{${s}}`;
const wRows = steps($('#wSteps'), [
  [K(`r_d = \\dfrac{${VC('\\Delta V')}}{${IC('\\Delta I')}}`), '', 204],
  [K(`${VC('\\Delta V')} = 0.04\\,\\text{V}, \\quad ${IC('\\Delta I')} = 8\\,\\text{mA}`), '', 300],
  [K(`r_d = \\dfrac{0.04}{0.008}`), '', 364],
  [K(`r_d = 5\\,\\Omega`), 'forward: wide open', 462],
  [K(`R_{rev} = \\dfrac{10\\,\\text{V}}{1\\,\\mu\\text{A}} = 10^{7}\\,\\Omega`), '', 520]]);
const wBox = $('#wBox'); wBox.style.top = '450px'; wBox.style.height = '70px';
const tD1 = wt('D1', 'curve'), tD2 = wt('D2', 'dynamic'), tD3 = wt('D3', 'small'), tD4 = T0('D4');
const tWs = [tD4, wt('W4', 'Delta'), wt('W5', 'r'), wt('W6', 'just'), wt('W7', 'ten')];

/* ================= X: exam trap ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A diode is a fixed resistor', right: 'Its resistance changes: use ΔV / ΔI', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xAx = [W(tcS, 'M70,260 H420', { 'stroke-width': 2.5 }), W(tcS, 'M70,260 V60', { 'stroke-width': 2.5 })];
const xc = s => [70 + 340 * s, 260 - 190 * (Math.exp(4 * s) - 1) / (Math.exp(4) - 1)];
const xCur = W(tcS, '', { stroke: VI, 'stroke-width': 4 });
const tan = (s, L) => { const [x, y] = xc(s), [x2, y2] = xc(s + 0.01), m = (y2 - y) / (x2 - x), d = L / Math.hypot(1, m); return W(tcS, `M${(x - d).toFixed(1)},${(y - m * d).toFixed(1)} L${(x + d).toFixed(1)},${(y + m * d).toFixed(1)}`, { stroke: GO, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); };
const tg1 = tan(0.45, 70), tg2 = tan(0.9, 50);
const xL = [mono(tcS, 450, 130, 'steep slope: small r', { 'font-size': 18, 'font-weight': 600, fill: INK }), mono(tcS, 450, 220, 'gentle slope: large r', { 'font-size': 18, 'font-weight': 600, fill: INK })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS', 'JEE MAIN'], type: 'Draw and explain V-I curves · dynamic resistance from a graph (JEE Main, 26 Jun 2022, Shift 1)' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '25px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 5&nbsp;V battery, a forward-biased silicon diode (0.7&nbsp;V drop) and a 430&nbsp;Ω resistor are in series. The current in the circuit is:', qW: 780,
  opts: ['10 mA', '11.6 mA', '0 mA', '13.3 mA'], right: 0, cols: 1, optW: 760, optH: 70, optY: 300, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`${VC('V_D')} = 0.7\\,\\text{V}`)], [K(`${VC('V_R')} = 5 - 0.7 = 4.3\\,\\text{V}`)],
  [K(`${IC('I')} = \\dfrac{${VC('V_R')}}{R} = \\dfrac{4.3}{430}`)], [K(`${IC('I')} = 0.01\\,\\text{A} = 10\\,\\text{mA}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'diode'), wt('A3', 'So'), wt('A4', 'Current'), wt('A4', 'That')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 214, w: 1100, h: 552, y0: 90, dy: 88, title: 'Diode V-I · fact card', txt: [1, 1, 0, 1, 0],
  lines: ['Forward bias: p to +. Barrier lower, layer thinner, big current (mA)',
    'Reverse bias: p to -. Barrier higher, tiny minority current (µA)',
    K(`\\text{knee (cut-in)}:\\quad ${VC('V')} \\approx 0.7\\,\\text{V (Si)}\\quad 0.2\\,\\text{V (Ge)}`),
    'Breakdown: reverse current suddenly shoots up',
    K(`r_d = \\dfrac{${VC('\\Delta V')}}{${IC('\\Delta I')}} \\qquad \\text{a diode does not obey Ohm's law}`)] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 42', topic: 'Half-wave rectifier', y: 796 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tS - 0.2, 1.06, 1150, 520], [T1('S2'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const nc = $('#nchip'), nc2 = $('#nchip2');

M.on(t => {
  cam(t); head(t); sweep(t);
  { const cw = nc.offsetWidth, c2 = nc2.offsetWidth, tot = cw + 16 + c2, m = M.spring(t - tMorph, M.HEAVY);
    const x = M.lerp(960 - tot / 2, 160, m); nc.style.left = x.toFixed(2) + 'px'; nc2.style.left = (x + cw + 16).toFixed(2) + 'px'; nc2.style.top = nc.style.top;
    M.vis(nc2, t, 0.25, 1e9, { dy: 18 }); }
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tB && t < tT) || (t >= tW && t < tX); M.vis(ghost, t, t < tT ? tB + 0.5 : tW + 0.3, t < tT ? tT - 0.32 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tG + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tG - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#h1C'), t, tMorph + 0.5, out, { dx: 60, dy: 0, ...o }); fadeAt([...L1.cells, L1.wr, L1.lamp], t, tMorph + 0.8, 0.1); M.vis(L1.mark, t, wt('H2', 'Nothing'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis($('#h2C'), t, tFlip - 0.2, out, { dy: 36, ...o }); fadeAt([...L2.cells, L2.wr, L2.lamp], t, tFlip, 0.1);
    PUC.attr(L2.lamp, 'fill', M.mix('#C9CDD6', '#F6C453', M.io((t - tShine + 0.1) / 0.25))); M.vis(L2.mark, t, tShine, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis(dIn, t, tDio - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(dInL, t, tDio + 0.2, 1e9, { dy: 0, fade: 0.2 });
  }

  /* G: swing door */
  const gOn2 = t >= tG - 0.05 && t < tF2 + 0.1; M.hide($('#sG'), !gOn2);
  if (gOn2) {
    const out = tF2 - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG3 - 0.4, out, { dx: 60, dy: 0, ...o });
    drawSeq(wall, t, tG + 0.3, 0.4, 0.1); M.vis(hinge, t, tG + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt(sideL, t, tG + 0.8, 0.1);
    M.vis(sprL, t, wt('G1', 'spring'), 1e9, { dy: 0, fade: 0.2 }); M.vis(stop, t, tG + 0.9, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(stopL, t, tG + 1.1, 1e9, { dy: 0, fade: 0.2 });
    // door angle (degrees, + = swings to the back)
    let ang = 0;
    if (t >= tG2 && t < tG3) ang = 3 * Math.max(0, Math.sin((t - tG2) * 6)) * Math.exp(-(t - tG2));
    else if (t >= tG3 && t < tG4 - 0.3) ang = 75 * M.io((t - tSw + 0.3) / 0.6);
    else if (t >= tG4 - 0.3 && t < tG4 + 0.3) ang = 75 * (1 - M.io((t - tG4 + 0.3) / 0.5));
    else if (t >= tG4 + 0.3) ang = -1.2 * Math.max(0, Math.sin((t - tG4) * 9));
    const a = ang * Math.PI / 180; PUC.attr(door, 'd', `M290,300 L${(290 + 200 * Math.cos(a)).toFixed(1)},${(300 + 200 * Math.sin(a)).toFixed(1)}`); M.vis(door, t, tG + 0.5, 1e9, { dy: 0, fade: 0.2 });
    // push arrows
    const fl = t < tG3 ? 50 : 130, fOn = t >= tG2 - 0.1 && t < tG4 - 0.3, fu = M.io((t - (t < tG3 ? tG2 : tG3)) / 0.3);
    if (fOn) pF.set(420, 120, 420, 120 + fl * fu); else pF.set(0, 0, 0, 0);
    PUC.attr(pF.g.firstChild, 'stroke-width', t < tG3 ? 4 : 9);
    const bl = t < tG5 ? 110 : 170, bOn = t >= tG4 - 0.1, bu = M.io((t - (t < tG5 ? tG4 : tG5)) / 0.3);
    if (bOn) pB.set(420, 520, 420, 520 - bl * bu); else pB.set(0, 0, 0, 0);
    PUC.attr(pB.g.firstChild, 'stroke-width', t < tG5 ? 6 : 12);
    const cr = M.io((t - tG5 - 0.2) / 0.3); PUC.attr(crack, 'd', cr > 0 ? 'M370,288 L384,312 L398,290 L412,314 L426,292' : ''); PUC.attr(door, 'stroke', cr > 0 ? RED : '#B7791F');
    M.setT(gState, t < tG2 ? '' : t < tG3 ? 'gentle push: stays shut' : t < tG4 - 0.3 ? 'push past the spring: wide open' : t < tG5 ? 'from the back: blocked by the doorstep' : 'pushed far too hard: it breaks');
    gState.style.fill = t >= tG5 ? RED : INK; M.vis(gState, t, tG2, 1e9, { dy: 0, fade: 0.2 });
    [[tSw, 'gt0'], [wt('G3', 'certain'), 'gt1'], [tG4 + 0.2, 'gt2'], [tG5, 'gt3']].forEach(([a2, id]) => M.vis($('#' + id), t, a2, 1e9, { dy: 24 }));
  }

  /* F2: forward and reverse bias */
  const fOn2 = t >= tF2 - 0.05 && t < tB + 0.1; M.hide($('#sF2'), !fOn2);
  if (fOn2) {
    const out = tB - 0.32;
    M.vis($('#fL'), t, tF2 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#fR'), t, tR1 - 0.3, out, { dx: 60, dy: 0, ...o });
    [[FB, tF2 + 0.3, tF2b, tF4, tF5, tF6, 1], [RB, tR1, tR1 + 0.3, tR4b, tR4, tR5, -1]].forEach(([c, t0, tw, th, tl, tc, sgn2]) => {
      fadeAt([c.p, c.n, ...c.lab], t, t0, 0.08); c.car.forEach((q, k) => { M.vis(q.e, t, t0 + 0.2, 1e9, { dy: 0, fade: 0.2 }); jig(q.e, q.x, q.y, t, k); });
      drawSeq(c.w, t, tw, 0.4, 0.15); drawSeq(c.bat, t, tw + 0.3, 0.2, 0.1); fadeAt(c.bl, t, tw + 0.5, 0.1);
      const wd = 120 + (sgn2 > 0 ? -70 : 100) * M.io((t - tl + 0.2) / 0.8); PUC.attr(c.dep, 'x', (392 - wd / 2).toFixed(1)); PUC.attr(c.dep, 'width', wd.toFixed(1)); M.vis(c.dep, t, t0 + 0.2, 1e9, { dy: 0, fade: 0.2 });
      c.car.forEach(q => { if (Math.abs(q.x - 392) < wd / 2 + 6) M.hide(q.e, true); });
      M.vis(c.hT, t, th - 0.6, 1e9, { dy: 8 }); hillD(c, 80 + (sgn2 > 0 ? -55 : 55) * M.io((t - th) / 0.7)); M.vis(c.hill, t, th - 0.6, 1e9, { dy: 0, fade: 0.2 });
      c.pills.forEach((p, i) => M.vis(p, t, [th, tl, tc][i], 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }));
      const sp = sgn2 > 0 ? 130 : 6; c.flow.set(sp * Math.max(0, t - tc), t >= tc - 0.1);
    });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.02; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tT - 0.32, rev = t >= tB9;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...bW, res], t, wt('B2', 'variable') - 0.2, 0.3, 0.15); fadeAt([batL, batS, batA, batAH, ...sgn, supL], t, wt('B2', 'supply'), 0.05); fadeAt(resL, t, wt('B2', 'resistor'), 0.1);
    M.vis(dB, t, wt('B2', 'diode') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); fadeAt(dBL, t, wt('B2', 'diode') + 0.1, 0.1);
    M.draw(vW, t, wt('B3', 'voltmeter') - 0.2, 0.4); fadeAt([vm, vmT], t, wt('B3', 'voltmeter'), 0.1); fadeAt([amm, ammT], t, wt('B3', 'meter'), 0.1);
    // supply polarity flips for reverse bias
    const fl = M.io((t - tB9) / 0.4); PUC.attr(batL, 'transform', `translate(0,${(36 * fl).toFixed(1)})`); PUC.attr(batS, 'transform', `translate(0,${(-36 * fl).toFixed(1)})`);
    M.setT(sgn[0], rev ? '-' : '+'); M.setT(sgn[1], rev ? '+' : '-');
    const vf = lerpK(VFk, t), vr = lerpK(VRk, t), v = rev ? -vr : vf;
    const iF = IF(vf), iR = IRu(vr);
    const kn = rev ? (vr / 52) : vf / 0.75, ka = (-130 + 260 * kn) * Math.PI / 180;
    fadeAt([knob, kL], t, T0('B4') - 0.2, 0.1); PUC.attr(kPtr, 'd', `M400,300 L${(400 + 34 * Math.sin(ka)).toFixed(1)},${(300 - 34 * Math.cos(ka)).toFixed(1)}`); M.vis(kPtr, t, T0('B4') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    setH($('#mode'), rev ? 'REVERSE BIAS' : 'FORWARD BIAS'); M.vis($('#mode'), t, tB4, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    $('#mode').style.background = rev ? '#FBE6E6' : '#E2F3E9'; $('#mode').style.color = rev ? RED : '#1F6B3F';
    // electrons: speed follows the current
    const spd = τ => τ < tB9 ? 4 * IF(lerpK(VFk, τ)) : Math.min(140, 0.6 * IRu(lerpK(VRk, τ)) * (IRu(lerpK(VRk, τ)) > 2 ? 1 : 0.3));
    let off = 0; { const a = tB4, n = 60, b = t; if (b > a) { const dt = (b - a) / n; for (let k = 0; k < n; k++) { const tt = a + (k + 0.5) * dt; off += (tt < tB9 ? 1 : -1) * Math.min(140, spd(tt)) * dt; } } }
    eF.set(Math.max(0, off), !rev && t >= tB4); eR.set(Math.abs(off), rev);
    // graph
    fadeAt([...gAx, ...gTk], t, tB + 0.6, 0.1); fadeAt(gLab, t, tB + 0.9, 0.05);
    let d = ''; const vmax = rev ? 0.75 : vf; if (t >= tB4) { for (let i = 0; i <= 80; i++) { const vv = vmax * i / 80; d += (i ? 'L' : 'M') + gx(vv).toFixed(1) + ',' + Math.max(32, gyF(IF(vv))).toFixed(1); } }
    PUC.attr(cF, 'd', d);
    let dr = ''; if (rev) { for (let i = 0; i <= 120; i++) { const u = vr * i / 120; dr += (i ? 'L' : 'M') + gx(-u).toFixed(1) + ',' + gyR(IRu(u)).toFixed(1); } } PUC.attr(cR, 'd', dr);
    const dx = rev ? gx(-vr) : gx(vf), dy = rev ? gyR(iR) : Math.max(32, gyF(iF)); PUC.attr(gDot, 'cx', dx.toFixed(1)); PUC.attr(gDot, 'cy', dy.toFixed(1)); M.hide(gDot, t < tB4);
    PUC.attr(knee, 'cx', gx(0.7)); PUC.attr(knee, 'cy', gyF(10)); PUC.attr(kneeL, 'x', gx(0.7) - 64); PUC.attr(kneeL, 'y', gyF(10) - 4);
    M.vis(knee, t, wt('B7', 'knee') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis(kneeL, t, wt('B7', 'knee'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(bdL, t, wt('B11', 'breakdown'), 1e9, { dy: 0, fade: 0.2 });
    uHi.forEach((r, i) => r.style.opacity = M.io((t - (i ? wt('S2', 'Reverse') : wt('S2', 'Forward'))) / 0.3).toFixed(3));
    // readout
    M.vis($('#ro1'), t, wt('B3', 'meter'), 1e9, { dy: 12 });
    M.setT($('#rV'), rev ? (vr < 0.05 ? '0.0' : '-' + vr.toFixed(1)) : vf.toFixed(2));
    if (!rev) { M.setT($('#rI'), iF.toFixed(2)); M.setT($('#rIu'), 'mA'); }
    else if (iR < 1000) { M.setT($('#rI'), (iR < 0.05 ? '0.0' : '-' + iR.toFixed(1))); M.setT($('#rIu'), 'µA'); } else { M.setT($('#rI'), '-' + (iR / 1000).toFixed(2)); M.setT($('#rIu'), 'mA'); }
    const z = !rev ? (vf < 0.55 ? 'OFF · BELOW THE KNEE' : vf < 0.69 ? 'AT THE KNEE' : 'ON · CURRENT FLOWS') : (vr < 50 ? 'TINY LEAK' : 'BREAKDOWN');
    setH($('#zone'), z); $('#zone').style.background = z === 'BREAKDOWN' ? RED : z.startsWith('ON') ? C.ok : INK; M.vis($('#zone'), t, tB4 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    avB(t, wt('B12', 'Ordinary') - 0.2, wt('S1', 'Look'));
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'with') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* W: dynamic resistance + worked example */
  const wOn = t >= tD - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tD + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wR'), t, tD2 - 0.3, 1e9, { dx: 60, dy: 0 });
    drawSeq(wAx, t, tD + 0.3, 0.4, 0.1); fadeAt([...wTk, ...wAL], t, tD + 0.5, 0.03);
    M.draw(wOhm, t, tD1 - 0.2, 0.6); M.vis(wOhmL, t, tD1 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const cu = M.io((t - tD1 + 0.1) / 1.0); let d = ''; for (let i = 0; i <= 60; i++) { const v = 0.6 + (0.789 - 0.6) * cu * i / 60; d += (i ? 'L' : 'M') + XV(v).toFixed(1) + ',' + YI(IW(v)).toFixed(1); } PUC.attr(wCur, 'd', cu > 0 ? d : '');
    M.vis(wCurL, t, tD1 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dBox'), t, tD3 - 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.rise($('#dDef'), t, tD3);
    M.vis(wP[0], t, wt('W2', 'At'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); M.draw(wG[0], t, wt('W2', 'At') + 0.1, 0.5); M.vis(wPL[0], t, wt('W2', 'twelve'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(wP[1], t, wt('W3', 'At'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); M.draw(wG[1], t, wt('W3', 'At') + 0.1, 0.5); M.vis(wPL[1], t, wt('W3', 'twenty'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(tdV, t, wt('W4', 'Delta'), 0.4); M.vis(tdVL, t, wt('W4', 'Delta') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(tdI, t, wt('W4', 'Delta', 1), 0.4); M.vis(tdIL, t, wt('W4', 'Delta', 1) + 0.2, 1e9, { dy: 0, fade: 0.2 });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[3] + 0.3, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#wRev'), t, wt('W7', 'reverse'), 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'resistance') - 0.2 });
    drawSeq(xAx, t, tX + 0.6, 0.3, 0.1); const xu = M.io((t - tX - 0.9) / 0.9); let d = ''; for (let i = 0; i <= 50; i++) { const [x, y] = xc(xu * i / 50); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } PUC.attr(xCur, 'd', xu > 0 ? d : '');
    M.draw(tg2, t, wt('X3', 'changes'), 0.4); M.vis(xL[0], t, wt('X3', 'changes') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(tg1, t, wt('X3', 'curve') - 0.1, 0.4); M.vis(xL[1], t, wt('X3', 'curve') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC'), wt('X5', 'JEE')], tType: wt('X4', 'draw') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('FC', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
