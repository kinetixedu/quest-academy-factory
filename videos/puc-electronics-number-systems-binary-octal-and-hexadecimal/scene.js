// PUC Electronics Ep 51 - Number systems: binary, octal and hexadecimal ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, R and beta ink; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const IB = c(VI, 'I_B'), IC = c(VI, 'I_C'), IE = c(VI, 'I_E'), VCC = c(TE, 'V_{CC}'), VO = c(TE, 'V_{out}'), VIN = c(TE, 'V_{in}');
const KO = '\\text{k}\\Omega';

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 160) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
const GD = '#B7791F', CH1C = CH1;
const sub = (s, b) => K(`${s}_{${b}}`);

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'picks') - 0.2;
const tC = T0('C1'), tB = T0('B1'), tD = T0('D1'), tO = T0('O1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const codeS = [...$('#code').children];
const HB = '1111111110001000'.split('');
$('#hBits').innerHTML = HB.map(b => `<span>${b}</span>`).join('');
const hBits = [...$('#hBits').children];

/* ================= C: base ================= */
const cS = $('#cS');
const dig = [...Array(10)].map((_, i) => { const g = mk(cS, 'g'); mk(g, 'rect', { x: 47 + i * 70, y: 84, width: 60, height: 72, rx: 10, fill: C.soft });
  tx(g, 77 + i * 70, 134, String(i), { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 36 }); return g; });
const cnt = [tx(cS, 330, 340, '', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 150, fill: AM }), tx(cS, 430, 340, '', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 150 })];
const cntL = [mono(cS, 330, 400, 'tens', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(cS, 430, 400, 'ones', { 'text-anchor': 'middle', 'font-weight': 600 })];
const ten = tx(cS, 392, 454, 'base 10 · ten digits', { 'text-anchor': 'middle', 'font-size': 26, fill: INK });
const kS = $('#kS');
const kT = [mk(kS, 'circle', { cx: 120, cy: 200, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(kS, 'circle', { cx: 300, cy: 200, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
const kW = [W(kS, 'M40,200 H110'), W(kS, 'M310,200 H380')];
const kLev = W(kS, '', { 'stroke-width': 6 });
const kBig = tx(kS, 560, 250, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 150, fill: INK });
const kSt = mono(kS, 560, 290, 'OFF', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 });
mk(kS, 'rect', { x: 40, y: 330, width: 704, height: 130, rx: 12, fill: '#16213E' });
const kLvl = mk(kS, 'path', { d: '', fill: 'none', stroke: TE, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const kLb = [mono(kS, 56, 366, 'HIGH V = 1', { fill: '#C9D2E3', 'font-size': 17 }), mono(kS, 56, 446, 'LOW V = 0', { fill: '#C9D2E3', 'font-size': 17 })];
const kScope = kS.querySelector('rect:last-of-type');
const tOn = [wt('C5', 'Off'), wt('C5', 'on'), wt('C5', 'Zero'), wt('C5', 'one'), wt('C6', 'Low'), wt('C6b', 'High')];
const swState = t => { if (t < tOn[1]) return 0; if (t < tOn[2]) return 1; if (t < tOn[3]) return 0; if (t < tOn[4]) return 1; if (t < tOn[5]) return 0; if (t < T0('C7')) return 1; return Math.floor((t - T0('C7')) / 1.2) % 2 ? 1 : 0; };

/* ================= B: breadboard ================= */
const ck = $('#ckS'), CX = [176, 368, 560, 752];
$('#sw4').innerHTML = CX.map((x, i) => `<div class="tg sw4" style="left:${x - 88}px;width:176px"><div class="tr"><i></i></div><div><div class="tk">BIT ${4 - i}</div><div class="tv">0</div></div></div>`).join('') +
  CX.map(x => `<div class="wt" style="left:${x - 88}px;top:384px">0</div>`).join('') + `<div class="wl" id="wl" style="left:${CX[0] - 88}px;top:436px;width:${CX[3] - CX[0] + 176}px">PLACE VALUES</div>`;
const swT = [...$('#sw4').querySelectorAll('.sw4')], wtT = [...$('#sw4').querySelectorAll('.wt')];
const lampsB = CX.map(x => { const g = mk(ck, 'g'); W(g, `M${x},150 V208`); const c = mk(g, 'circle', { cx: x, cy: 250, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 });
  W(g, `M${x - 28},222 L${x + 28},278 M${x + 28},222 L${x - 28},278`, { 'stroke-width': 3 }); W(g, `M${x},290 V330`); return [g, c]; });
const gRail = W(ck, `M${CX[0] - 60},330 H${CX[3] + 60}`), gRailL = mono(ck, CX[3] + 70, 337, '0 V', { 'font-weight': 600 });
const msb = mk(ck, 'g'), lsb = mk(ck, 'g');
[[msb, CX[0], 'MOST SIGNIFICANT'], [lsb, CX[3], 'LEAST SIGNIFICANT']].forEach(([g, x, s]) => { mk(g, 'rect', { x: x - 104, y: 458, width: 208, height: 34, rx: 8, fill: INK }); mono(g, x, 481, s, { 'text-anchor': 'middle', fill: '#fff', 'font-size': 16, 'font-weight': 600 }); });
const TBS = [wt('B5', 'Switch'), wt('B6', 'Now'), wt('B7', 'Now'), wt('B9', 'All')];
const BS = ['0001', '0011', '1011', '1111'];
const bitsAt = t => { let s = '0000'; TBS.forEach((a, k) => { if (t >= a) s = BS[k]; }); return s; };
const sumAt = t => { const s = bitsAt(t), w = [8, 4, 2, 1], on = w.filter((v, i) => s[i] === '1'); return on.length ? `${on.join(' + ')} = <span style="color:${AM}">${on.reduce((a, b) => a + b, 0)}</span>` : ''; };
const sc = scope($('#scS'), 592, 184), trB = sc.tr(CH1C);
const scL = mono($('#scS'), 4, 212, 'CH1 · BITS, MSB FIRST · 1 = HIGH', { fill: CH1C, 'font-weight': 600, 'font-size': 18 });
const tScope = wt('B5', 'Switch');
const serial = tau => { const k = Math.floor((tau - tScope) / 0.5), i = ((k % 5) + 5) % 5; if (i === 4) return 0; return bitsAt(tau)[i] === '1' ? 1 : 0; };
$('#ro1').innerHTML = `<span class="k n">BINARY</span><span class="v" id="rBin" style="color:${AM}">0000</span><span class="u"></span>
  <span class="k n">DECIMAL</span><span class="v" id="rDec">0</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 1150, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Four switches, sixteen patterns!' });

/* ================= D: divide by 2 ================= */
const dS = $('#dS');
const DR = [[13, 6, 1], [6, 3, 0], [3, 1, 1], [1, 0, 1]];
const dRow = DR.map(([a, q, r], i) => { const y = 132 + i * 82, g = mk(dS, 'g');
  tx(g, 60, y, `${a} ÷ 2 = ${q}`, { 'font-family': 'IBM Plex Mono', 'font-size': 38 });
  mono(g, 420, y - 4, 'remainder', { 'font-size': 20 });
  const ch = mk(g, 'rect', { x: 540, y: y - 44, width: 60, height: 60, rx: 12, fill: C.ac2, stroke: AM, 'stroke-width': 2.5 });
  tx(g, 570, y, String(r), { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 38, fill: GD }); return g; });
const dArr = PUC.arrow(dS, AM, 6, 18), dArrL = mono(dS, 718, 260, 'read', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600 }), dArrL2 = mono(dS, 718, 284, 'upward', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600 });
const dRes = tx(dS, 392, 520, '', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44 });
const dRows = rows($('#dSteps'), [
  ['<span class="tt" style="font:600 30px Poppins">Divide by 2, keep the remainder</span>', '', 92],
  ['<span class="tt" style="font:600 30px Poppins">Repeat until the quotient is 0</span>', '', 186],
  ['<span class="tt" style="font:600 30px Poppins">Read remainders bottom to top</span>', '', 280],
  [K('13_{10} = 1101_2'), 'the answer', 374],
  [K('8 + 4 + 0 + 1 = 13'), 'check', 484]]);
const tDR = [wt('D2', 'Divide'), wt('D6', 'Stop'), wt('D7', 'bottom'), wt('D7', 'One'), wt('D8', 'Eight')];

/* ================= O: octal and hex ================= */
const HX = '0123456789ABCDEF'.split('');
$('#hxG').innerHTML = HX.map((h, i) => `<div class="hx" style="left:${36 + (i % 4) * 184}px;top:${84 + Math.floor(i / 4) * 122}px"><b style="${i > 9 ? 'color:var(--ac)' : ''}">${h}</b><i>${i > 9 ? '= ' + i : ''}</i><s>${i.toString(2).padStart(4, '0')}</s></div>`).join('');
const hxT = [...$('#hxG').children];
const oS = $('#oS');
const cell = (g, x, y, s, w = 44) => { mk(g, 'rect', { x, y, width: w, height: 56, rx: 8, fill: C.soft }); return tx(g, x + w / 2, y + 40, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 32 }); };
const brk = (g, x1, x2, y, col) => W(g, `M${x1},${y} v12 H${x2} v-12`, { stroke: col, 'stroke-width': 3 });
// octal demo: 110 011 -> 6 3
const oc = mk(oS, 'g'); '110011'.split('').forEach((b, i) => cell(oc, 60 + i * 52 + (i > 2 ? 24 : 0), 84, b));
const ocB = [brk(oc, 60, 200, 152, GD), brk(oc, 240, 380, 152, GD)];
const ocD = [tx(oc, 130, 210, '6', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: GD }), tx(oc, 310, 210, '3', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: GD })];
const ocL = mono(oc, 430, 130, '3 bits → 1 octal digit', { fill: INK, 'font-weight': 600 });
// colour code row (replaces the octal demo at O9)
const cc = mk(oS, 'g');
[['FF', 'red'], ['88', 'green'], ['00', 'blue']].forEach(([s, n], i) => { const x = 60 + i * 200; mk(cc, 'rect', { x, y: 84, width: 170, height: 76, rx: 12, fill: C.soft }); tx(cc, x + 85, 136, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: AM }); mono(cc, x + 85, 192, n + ' · 1 byte', { 'text-anchor': 'middle', 'font-weight': 600 }); });
// hex demo: 1111 1111 -> F F = 255
const hc = mk(oS, 'g'); '11111111'.split('').forEach((b, i) => cell(hc, 60 + i * 52 + (i > 3 ? 24 : 0), 290, b));
const hcB = [brk(hc, 60, 252, 358, AM), brk(hc, 292, 484, 358, AM)];
const hcD = [tx(hc, 156, 418, 'F', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: AM }), tx(hc, 388, 418, 'F', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: AM })];
const hcL = mono(hc, 520, 330, '4 bits → 1 hex digit', { fill: INK, 'font-weight': 600 });
const byteB = W(hc, 'M60,282 v-12 H484 v12', { stroke: INK, 'stroke-width': 3 }), byteL = mono(hc, 272, 262, '1 byte = 8 bits', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const h255 = tx(hc, 560, 422, '= 255', { 'font-family': 'IBM Plex Mono', 'font-size': 44 });

/* ================= W: worked example ================= */
const wS = $('#wS'), WB = '10011100'.split(''), WW = [128, 64, 32, 16, 8, 4, 2, 1];
const wx = i => 62 + i * 84;
const wCells = WB.map((b, i) => { const g = mk(wS, 'g'); const r = mk(g, 'rect', { x: wx(i), y: 140, width: 72, height: 80, rx: 12, fill: C.soft }); tx(g, wx(i) + 36, 196, b, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: b === '1' ? AM : INK }); return [g, r]; });
const wWt = WW.map((w, i) => mono(wS, wx(i) + 36, 120, String(w), { 'text-anchor': 'middle', 'font-weight': 600 }));
const wOct = [[0, 1], [2, 4], [5, 7]].map(([a, b], k) => [brk(wS, wx(a) + 4, wx(b) + 68, 236, GD), tx(wS, (wx(a) + wx(b) + 72) / 2, 300, '234'[k], { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: GD })]);
const wHex = [[0, 3], [4, 7]].map(([a, b], k) => [brk(wS, wx(a) + 4, wx(b) + 68, 330, AM), tx(wS, (wx(a) + wx(b) + 72) / 2, 394, '9C'[k], { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: AM })]);
const wOL = mono(wS, 30, 298, 'OCT', { 'font-weight': 600, fill: GD, 'font-size': 16 }), wHL = mono(wS, 30, 392, 'HEX', { 'font-weight': 600, fill: AM, 'font-size': 16 });
const wRes = mk(wS, 'g'); mk(wRes, 'rect', { x: 36, y: 456, width: 712, height: 92, rx: 14, fill: INK });
const wResT = tx(wRes, 392, 514, '', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 32, fill: '#fff' });
wResT.innerHTML = `156 = <tspan fill="${GD === '#B7791F' ? '#F2C14E' : GD}">234</tspan> (base 8) = <tspan fill="${AM}">9C</tspan> (base 16)`;
const wRows = rows($('#wSteps'), [
  ['<span class="tt" style="font:600 30px Poppins">Divide 156 by 2, read upward</span>', '', 92],
  [K('156_{10} = 10011100_2'), '', 186],
  [K('128 + 16 + 8 + 4 = 156'), 'check', 280],
  [K('10\\;011\\;100_2 = 234_8'), 'threes from the right', 374],
  [K('1001\\;1100_2 = 9C_{16}'), 'fours from the right', 484]]);
const tWR = [wt('W2', 'Divide'), wt('W3', 'We'), wt('W4', 'Check'), wt('W5', 'For'), wt('W6', 'For')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Read top to bottom: 13 = 1011', right: 'Read upward: 13 = 1101', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xr = '1011'.split('').map((b, i) => { const g = mk(tcS, 'g'); mk(g, 'rect', { x: 20, y: 6 + i * 48, width: 44, height: 40, rx: 8, fill: C.ac2 }); tx(g, 42, 36 + i * 48, b, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 28, fill: GD }); return g; });
const xA1 = PUC.arrow(tcS, C.red, 5, 14), xA2 = PUC.arrow(tcS, C.ok, 5, 14);
const xT1 = tx(tcS, 150, 70, 'top down: 1011 = 11', { 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: C.red }), xT2 = tx(tcS, 150, 150, 'bottom up: 1101 = 13', { 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: C.ok });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'ISC BOARDS'], type: 'Short conversions between binary, octal, decimal and hexadecimal (ISC: Class 11 Computer Science)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: `What is the hexadecimal number ${K('(2F)_{16}')} written in octal?`, qW: 780,
  opts: [K('(47)_8'), K('(75)_8'), K('(57)_8'), K('(217)_8')], right: 2, optW: 474, optY: 330, optFs: 38 });
const sol = PUC.solution($('#so'), [[K('2F_{16} = 0010\\;1111_2')], [K('00\\;101\\;111_2')], [K('= 57_8')], [K('5\\times 8 + 7 = 47')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Write'), wt('A3', 'regroup'), wt('A4', 'That'), wt('A5', 'Check')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Number systems · fact card', txt: [1, 0, 1, 1, 1],
  lines: ['Base: decimal 10 · binary 2 · octal 8 · hex 16', K('1011_2 = 8 + 0 + 2 + 1 = 11_{10}'), 'Decimal to binary: divide by 2, read remainders upward',
    'Octal: 3 bits per digit · Hex: 4 bits per digit (from the right)', 'A = 10 ... F = 15 · 4 bits = nibble · 8 bits = byte'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 52', topic: 'Basic logic gates: AND, OR and NOT', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
M.hide($('#ghost'), true);

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tC + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tC - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, wt('H1', 'colour') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#sw'), t, wt('H1', 'colour'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const tc = [wt('H2', 'code'), wt('H2', 'F'), wt('H2', 'eight'), wt('H2', 'zero')];
    codeS.forEach((e, i) => { M.vis(e, t, tc[i] - 0.1, 1e9, { dy: 12 }); const hl = i > 0 && t >= tc[i] && t < (tc[i + 1] ?? T1('H2')) + 0.2; e.style.background = hl ? C.ac2 : 'transparent'; });
    const tL = wt('H3', 'Letters'); codeS[1].style.color = t >= tL ? AM : ''; M.vis($('#h1Q'), t, tL, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    const t2 = wt('H3', 'phone') - 0.3;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o });
    hBits.forEach((e, i) => M.vis(e, t, t2 + 0.2 + i * 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    M.rise($('#h2X'), t, wt('H3', 'two') - 0.1);
  }

  /* C: base */
  const cOn = t >= tC - 0.05 && t < tB + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tB - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, T0('C4') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tz = wt('C1', 'zero');
    dig.forEach((g, i) => M.vis(g, t, wt('C1', 'ten') + i * 0.08, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }));
    const t10 = wt('C2', 'Ten'), nv = t < tz ? -1 : t < t10 ? Math.min(9, Math.floor((t - tz) / 0.35)) : 10;
    M.setT(cnt[0], nv >= 10 ? '1' : ''); M.setT(cnt[1], nv < 0 ? '' : String(nv % 10));
    dig.forEach((g, i) => PUC.attr(g.firstChild, 'fill', nv >= 0 && nv < 10 && nv === i ? C.ac2 : C.soft));
    fadeAt(cntL, t, wt('C2', 'one') - 0.1, 0.2);
    M.vis(ten, t, wt('C3', 'base'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#cStrip'), t, wt('C3', 'base') - 0.2, 1e9, { dy: 24 });
    // switch
    const s = swState(t), lv = M.io((t - tOn[0]) / 0.01);
    drawSeq([...kW], t, T0('C4') + 0.2, 0.3); fadeAt(kT, t, T0('C4') + 0.3, 0.1);
    M.vis(kLev, t, T0('C4') + 0.5, 1e9, { dy: 0, fade: 0.15 }); PUC.attr(kLev, 'd', s ? 'M120,200 L292,200' : 'M120,200 L272,128');
    M.vis(kBig, t, tOn[0] - 0.1, 1e9, { dy: 0, fade: 0.15 }); M.setT(kBig, String(s)); PUC.attr(kBig, 'fill', s ? AM : INK);
    M.vis(kSt, t, tOn[0], 1e9, { dy: 0, fade: 0.15 }); M.setT(kSt, s ? 'ON · HIGH VOLTAGE' : 'OFF · LOW VOLTAGE');
    M.vis(kScope, t, T0('C6') - 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt(kLb, t, T0('C6'), 0.1);
    let d = '', first = true; const t6 = T0('C6');
    for (let i = 0; i <= 120; i++) { const tau = t - 5 + 5 * i / 120; if (tau < t6) continue; const y = swState(tau) ? 360 : 440, x = 160 + 570 * i / 120; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; }
    PUC.attr(kLvl, 'd', d); M.hide(kLvl, t < t6);
    M.vis($('#kStrip'), t, wt('C7', 'binary') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32, bits = bitsAt(t);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    swT.forEach((e, i) => { M.vis(e, t, wt('B1', 'switches') - 0.2 + i * 0.1, 1e9, { dy: 10 }); const on = bits[i] === '1';
      e.querySelector('.tr i').style.transform = `translateX(${on ? 30 : 0}px)`; e.querySelector('.tr').style.background = on ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), on ? '1' : '0'); });
    lampsB.forEach(([g, c], i) => { M.vis(g, t, wt('B1', 'lamps') - 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(c, 'fill', bits[i] === '1' ? AM : '#fff'); });
    M.draw(gRail, t, wt('B1', 'lamps'), 0.5); M.vis(gRailL, t, wt('B1', 'lamps') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ckT'), t, wt('B2', 'On'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const tDec = wt('B3', 'decimal'), tBin = wt('B4', 'binary');
    wtT.forEach((e, i) => { M.vis(e, t, tDec + i * 0.1, 1e9, { dy: 10 }); M.setT(e, t < tBin ? ['1000', '100', '10', '1'][i] : String([8, 4, 2, 1][i])); e.style.color = t < tBin ? MU : (bits[i] === '1' ? AM : INK); });
    M.vis($('#wl'), t, tDec, 1e9, { dy: 10 }); M.setT($('#wl'), t < tBin ? 'DECIMAL PLACE VALUES · × 10 EACH STEP' : 'BINARY PLACE VALUES · × 2 EACH STEP');
    const sm = sumAt(t); if ($('#sumL')._h !== sm) { $('#sumL')._h = sm; $('#sumL').innerHTML = sm; } M.vis($('#sumL'), t, TBS[0], 1e9, { dy: 0, fade: 0.15 });
    M.vis(msb, t, wt('B10', 'most') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(lsb, t, wt('B11', 'least') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 }); M.setT($('#rBin'), bits); M.setT($('#rDec'), String(parseInt(bits, 2)));
    M.vis($('#slowT'), t, tScope, 1e9, { dy: 0, fade: 0.2 }); M.vis(scL, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    trB(u => 92 * serial(u), t, tScope, 6, 140, t >= tScope);
    avB(t, wt('B9', 'fifteen', 1) + 0.3, T0('B10') + 1.2);
  }

  /* D: decimal to binary */
  const dOn = t >= tD - 0.05 && t < tO + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tO - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    dRow.forEach((g, i) => M.vis(g, t, wt(['D3', 'D4', 'D5', 'D6'][i], 'divided') - 0.3, 1e9, { dy: 16 }));
    const ta = wt('D7', 'bottom'), u = M.io((t - ta) / 0.7); dArr.set(650, 390, 650, 390 - 300 * u); fadeAt([dArrL, dArrL2], t, ta + 0.3, 0.1);
    const nB = M.clamp(Math.floor((t - wt('D7', 'One')) / 0.32) + 1, 0, 4); M.setT(dRes, '13 = ' + (nB ? '1101'.slice(0, nB) : '?') + ' (base 2)'); M.vis(dRes, t, tD + 0.5, 1e9, { dy: 10 }); PUC.attr(dRes, 'fill', INK);
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* O: octal and hex */
  const oOn = t >= tO - 0.05 && t < tT + 0.05; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = tT - 0.3, tO4 = wt('O4', 'Hexadecimal');
    M.vis($('#oL'), t, wt('O2', 'Octal') - 0.3, out, { dx: -60, dy: 0, ...o }); M.vis($('#oR'), t, tO + 0.1, out, { dx: 60, dy: 0, ...o });
    hxT.forEach((e, i) => { M.vis(e, t, i < 8 ? wt('O2', 'zero') + i * 0.1 : tO4 + 0.2 + (i - 8) * 0.12, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const s = e.querySelector('s'); M.setT(s, t < tO4 ? (i < 8 ? i.toString(2).padStart(3, '0') : '') : i.toString(2).padStart(4, '0'));
      const hl = (t >= wt('O5', 'A') && t < T1('O6')) ? i > 9 : false; e.style.borderColor = hl ? AM : C.soft; e.style.background = hl ? C.ac2 : C.soft; });
    M.vis($('#oT'), t, wt('O2', 'Octal'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#oT'), t < tO4 ? 'OCTAL USES 0 TO 7' : 'HEX USES 0 TO F');
    const t9 = T0('O9') - 0.1;
    M.vis(oc, t, tO + 0.4, t9, { dy: 10, outDur: 0.25, ody: -10 }); fadeAt([...ocB, ...ocD], t, wt('O3', 'three', 1) - 0.2, 0.15); M.vis(ocL, t, wt('O3', 'holds'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(cc, t, t9 + 0.2, 1e9, { dy: 10 });
    M.vis(hc, t, wt('O6', 'Sixteen') - 0.2, 1e9, { dy: 10 }); fadeAt([...hcB, ...hcD], t, wt('O6b', 'four') - 0.2, 0.15); M.vis(hcL, t, wt('O6b', 'holds'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(byteB, t, wt('O7', 'Eight') - 0.1, 0.4); M.vis(byteL, t, wt('O7', 'byte') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(h255, t, wt('O8b', 'two') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#oStrip'), t, wt('O7', 'nibble') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Groups') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    wWt.forEach((e, i) => M.vis(e, t, tW + 0.6 + i * 0.05, 1e9, { dy: 0, fade: 0.2 }));
    wCells.forEach(([g, r], i) => { M.vis(g, t, wt('W3', 'one') + i * 0.18, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); PUC.attr(r, 'fill', t >= tWR[2] && WB[i] === '1' ? C.ac2 : C.soft); });
    wWt.forEach((e, i) => PUC.attr(e, 'fill', t >= tWR[2] && WB[i] === '1' ? GD : MU));
    wOct.forEach(([b, d], k) => { M.draw(b, t, tWR[3] + 0.3 + k * 0.2, 0.3); M.vis(d, t, wt('W5', ['Two', 'three', 'four'][k]) - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); });
    wHex.forEach(([b, d], k) => { M.draw(b, t, tWR[4] + 0.3 + k * 0.2, 0.3); M.vis(d, t, wt('W6', ['Nine', 'C'][k]) - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); });
    M.vis(wOL, t, tWR[3] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(wHL, t, tWR[4] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wRes, t, T0('W7') + 0.1, 1e9, { dy: 16 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'That') - 0.05, tRight: wt('X4', 'upward') - 0.3 });
    xr.forEach((g, i) => M.vis(g, t, tX + 0.5 + i * 0.1, 1e9, { dy: 0, fade: 0.15 }));
    const u1 = M.io((t - wt('X2', 'top')) / 0.5), u2 = M.io((t - wt('X4', 'upward')) / 0.5);
    xA1.set(90, 14, 90, 14 + 170 * u1); xA2.set(120, 186, 120, 186 - 170 * u2);
    M.vis(xT1, t, wt('X3', 'gives'), 1e9, { dy: 0, fade: 0.2 }); M.vis(xT2, t, wt('X4', 'upward') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P'), wt('X5b', 'I')], tType: wt('X6', 'Expect') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'written') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
