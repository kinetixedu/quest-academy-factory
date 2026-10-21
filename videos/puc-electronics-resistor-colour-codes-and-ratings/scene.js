// PUC Electronics Ep 26 - Resistor colour codes and ratings ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink; power P gold
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, PW = C.gold;
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const ctr = e => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center'; return e; };

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
/* resistor body (what you hold): leads, beige body, colour bands. pos = band centres as fractions of the body length */
const BC = { black: '#1E1E1E', brown: '#7B4A26', red: '#D23B2F', orange: '#EE7A1A', yellow: '#F2C81F', green: '#2E9E4F', blue: '#2F6FEB', violet: '#7A4FE0', grey: '#9AA0A8', white: '#FFFFFF', gold: '#C9A23A', silver: '#BCC3CB' };
const BODY = '#E8D6AE';
const P4 = [0.2, 0.33, 0.46, 0.8], P5 = [0.16, 0.28, 0.4, 0.52, 0.82];
const resistor = (p, cx, cy, L, H, pos, o = {}) => {
  const g = mk(p, 'g'), x0 = cx - L / 2, lead = o.lead ?? 70;
  const leads = lead ? W(g, `M${x0 - lead},${cy} H${x0} M${x0 + L},${cy} H${x0 + L + lead}`, { 'stroke-width': o.lw ?? 5, stroke: '#8A93A6' }) : null;
  const body = mk(g, 'rect', { x: x0, y: cy - H / 2, width: L, height: H, rx: H * 0.42, fill: BODY, stroke: INK, 'stroke-width': o.sw ?? 4 });
  const bw = L * (o.bw ?? 0.07), bx = pos.map(f => x0 + L * f);
  const bands = bx.map(x => mk(g, 'rect', { x: x - bw / 2, y: cy - H / 2 + (o.sw ?? 4) / 2, width: bw, height: H - (o.sw ?? 4), fill: BODY }));
  const edge = mk(g, 'rect', { x: x0, y: cy - H / 2, width: L, height: H, rx: H * 0.42, fill: 'none', stroke: INK, 'stroke-width': o.sw ?? 4 });
  return { g, leads, body, edge, bands, bx, set(i, c) { PUC.attr(bands[i], 'fill', c ? BC[c] : BODY); }, all(cs) { cs.forEach((c, i) => this.set(i, c)); } };
};
const showBands = (r, cols, t, ts) => cols.forEach((c, i) => r.set(i, t >= ts[i] ? c : null));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Inside') - 0.2;
const tI = T0('I1'), tD = T0('D1'), tR = T0('R1'), tB = T0('B1'), tT = T0('T1'), tST = T0('ST'), tV = T0('V1'), tP = T0('P1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tST, tV], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const magS = $('#magS');
const magR = resistor(magS, 150, 140, 150, 50, P4, { lead: 26, sw: 3.5 });
const magP = [W(magS, 'M150,40 A100,100 0 1 1 149.9,40 Z', { 'stroke-width': 7 }), W(magS, 'M222,212 L282,272', { 'stroke-width': 14 })];
const bdS = $('#bdS');
mk(bdS, 'rect', { x: 32, y: 72, width: 720, height: 184, rx: 12, fill: '#DCEADF', stroke: '#9DB8A3', 'stroke-width': 3 });
[[40, 120, 744, 120], [40, 210, 744, 210], [300, 80, 300, 248], [520, 80, 520, 248]].forEach(([a, b, c, d]) => mk(bdS, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: '#B9CDBE', 'stroke-width': 6 }));
const BDR = [[150, 120, ['brown', 'black', 'red', 'gold']], [410, 120, ['yellow', 'violet', 'orange', 'gold']], [640, 120, ['red', 'red', 'brown', 'silver']], [150, 210, ['orange', 'white', 'brown', 'gold']], [410, 210, ['green', 'blue', 'red', 'gold']], [640, 210, ['blue', 'grey', 'red', 'gold']]]
  .map(([x, y, cs]) => { const r = resistor(bdS, x, y, 110, 32, P4, { lead: 22, sw: 3, lw: 4 }); r.all(cs); ctr(r.g); return r; });
const qR = resistor($('#qS'), 250, 150, 300, 80, P4, { lead: 60 });
const qCols = ['yellow', 'violet', 'red', 'gold'];

/* ================= I: why colours ================= */
const iS = $('#iLS');
const iR = resistor(iS, 392, 170, 300, 80, P4, { lead: 90 }); iR.all(['brown', 'black', 'red', 'gold']);
const iRL = mono(iS, 392, 268, 'WHAT YOU HOLD', { 'text-anchor': 'middle', 'font-size': 18 });
const iW = [W(iS, 'M60,392 H270'), W(iS, 'M270,392 L285,362 L315,422 L345,362 L375,422 L405,362 L435,422 L465,362 L495,422 L510,392'), W(iS, 'M510,392 H724')];
const iSL = mono(iS, 392, 462, 'ITS SYMBOL', { 'text-anchor': 'middle', 'font-size': 18 });
const iRt = tx(iS, 390, 342, 'R', { 'font-style': 'italic', 'font-size': 30, 'text-anchor': 'middle' });
const iE = flow(iS, [[60, 392], [724, 392]], 10, { skip: (x) => x > 262 && x < 518 });
const iSv = [$('#it0 svg'), $('#it1 svg')];
const VIEWS = ['FRONT', 'SIDE', 'BACK'];
const iViews = [0, 1].map(k => VIEWS.map((v, j) => { const cx = 140 + j * 220;
  const lab = mono(iSv[k], cx, 74, v, { 'text-anchor': 'middle', 'font-size': 16 });
  const r = resistor(iSv[k], cx, 126, 150, 48, P4, { lead: 22, sw: 3, lw: 4 });
  if (k === 1) r.all(['brown', 'black', 'red', 'gold']);
  const extra = [];
  if (k === 0) { if (j === 0) extra.push(mono(iSv[0], cx, 135, '1K0', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }));
    if (j === 1) extra.push(mono(iSv[0], cx - 52, 135, 'K0', { 'font-size': 22, fill: '#9AA0AC', 'font-weight': 600 }));
    if (j === 2) extra.push(mono(iSv[0], cx, 135, '- - -', { 'text-anchor': 'middle', 'font-size': 20, fill: '#C3C7CF' })); }
  const mko = mk(iSv[k], 'g', { transform: `translate(${cx + 56},${50})` }), mkx = mk(mko, 'g'); mkx.innerHTML = M.icon(k === 0 && j > 0 ? 'x' : 'check', 26, k === 0 && j > 0 ? C.red : C.ok, 3);
  return { lab, r, extra, mkx }; }));

/* ================= D: code ladder ================= */
const CODE = [['black', 0], ['brown', 1], ['red', 2], ['orange', 3], ['yellow', 4], ['green', 5], ['blue', 6], ['violet', 7], ['grey', 8], ['white', 9]];
$('#chips').innerHTML = CODE.map(([c, d], i) => `<div class="chp" style="left:${40 + i * 120}px"><div class="sw" style="background:${BC[c]}"></div><div class="dg">${d}</div><div class="cn">${c}</div></div>`).join('') +
  [['gold', '×0.1', '±5%'], ['silver', '×0.01', '±10%']].map(([c, m, tl], i) => `<div class="chp" style="left:${1290 + i * 140}px;width:120px"><div class="sw" style="background:${BC[c]};width:120px"></div><div class="dg" style="font-size:30px;margin-top:14px">${m}</div><div class="ml">${tl}</div><div class="cn">${c}</div></div>`).join('');
const CH = [...$('#chips').children];
const MNW = [['B', 0], ['B', 1], ['Roy', 2, 3, 4], ['of'], ['Great', 5], ['Britain', 6], ['had'], ['a'], ['Very', 7], ['Good', 8], ['Wife', 9]];
$('#mn').innerHTML = MNW.map(([w, ...ix]) => `<span>${ix.length ? (w === 'Roy' ? '<b>ROY</b>' : `<b>${w[0]}</b>${w.slice(1)}`) : w}</span>`).join('');
const MN = [...$('#mn').children];
const nthB = { 0: 0, 1: 1 };
const tMn = MNW.map(([w], i) => w === 'B' ? wt('D4', 'B', nthB[i]) : (w === 'a' ? wt('D4', 'a', 0) : wt('D4', w)));
const tChip = CODE.map(([c]) => wt(['black', 'brown', 'red', 'orange', 'yellow'].includes(c) ? 'D2' : 'D3', c));
const tGS = [wt('D5', 'Gold'), wt('D5', 'silver')];

/* ================= R: reading rules ================= */
const rS = $('#rS');
const rRes = resistor(rS, 392, 200, 460, 120, P4, { lead: 80 });
const rCols = ['orange', 'white', 'brown', 'gold'];
const LX4 = [130, 300, 470, 650];
const rLead = rRes.bx.map((x, i) => W(rS, `M${x},${266} V${300} L${LX4[i]},${360}`, { 'stroke-width': 2.5, stroke: MU }));
$('#rLab').innerHTML = [['1st digit', 'band 1'], ['2nd digit', 'band 2'], ['multiplier', 'band 3'], ['tolerance', 'band 4']].map(([a, b], i) => `<div class="bl" style="left:${LX4[i] - 75}px;top:370px"><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const rLabs = [...$('#rLab').children];
const rArr = PUC.arrow(rS, INK, 4, 14), rArrL = mono(rS, 160, 110, 'READ THIS WAY', { 'font-size': 18, fill: INK, 'font-weight': 600 });
const rGap = W(rS, `M${rRes.bx[2] + 22},${128} V${116} H${rRes.bx[3] - 22} V${128}`, { stroke: AM, 'stroke-width': 3 }), rGapL = mono(rS, (rRes.bx[2] + rRes.bx[3]) / 2, 104, 'GAP', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 18 });
const rStrip = document.createElement('div'); rStrip.className = 'pillp ink'; rStrip.style.cssText = 'left:32px;top:500px'; rStrip.textContent = 'Gold or silver band on the right'; $('#rL').appendChild(rStrip);
const rSteps = [[K(`${tc(INK, 'd_1')}`), 'band 1 · first digit', 84], [K(`${tc(INK, 'd_2')}`), 'band 2 · second digit', 166], [K(`\\times 10^{\\,m}`), 'band 3 · how many zeros', 248], [K(`\\pm\\ \\text{tol}`), 'band 4 · tolerance', 330]];
$('#rSteps').innerHTML = rSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="st2" id="rF" style="top:432px;left:56px"><div class="sx" style="font-size:42px">${K(`${tc(INK, 'R')} = (d_1 d_2) \\times 10^{\\,m} \\ \\pm\\ \\text{tol}`)}</div></div><div class="sm" id="rU" style="left:36px;top:540px;font-family:'IBM Plex Mono'">R in ohms (Ω)   ·   1 kΩ = 1000 Ω</div>`;
const rRows = [...$('#rSteps').querySelectorAll('.st2')].slice(0, 4);
const tRs = [wt('R3', 'first'), wt('R3', 'second'), wt('R4', 'third'), wt('R5', 'fourth')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bRes = resistor(ck, 270, 150, 340, 92, P4, { lead: 60 });
const bLab = mono(ck, 270, 92, '', { 'text-anchor': 'middle', 'font-size': 18 });
const bVal = tx(ck, 560, 140, '', { 'font-family': 'IBM Plex Mono', 'font-size': 44, fill: INK });
const bVal2 = mono(ck, 560, 178, '', { 'font-size': 20 });
$('#dgls').innerHTML = [0, 1, 2, 3].map(i => `<div class="dgl" style="left:${bRes.bx[i] - 40}px;top:214px"></div>`).join('');
const DG = [...$('#dgls').children]; DG[2].style.cssText += ';width:120px;margin-left:-20px;top:252px;font-size:26px'; DG[3].style.cssText += ';width:120px;margin-left:-20px;top:252px;font-size:26px';
const bW = [W(ck, 'M120,410 V330 H360'), W(ck, 'M560,330 H800 V390'), W(ck, 'M800,470 V540 H120 V446')];
const bZ = W(ck, 'M360,330 L375,300 L405,360 L435,300 L465,360 L495,300 L525,360 L545,300 L560,330');
const bBat = [W(ck, 'M85,410 H155', { 'stroke-width': 5 }), W(ck, 'M102,446 H138', { 'stroke-width': 9 })];
const bAm = [mk(ck, 'circle', { cx: 800, cy: 430, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
const bLb = [tx(ck, 58, 404, '+', { 'font-size': 28 }), tx(ck, 62, 462, '-', { 'font-size': 30 }), mono(ck, 172, 436, '9 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }),
  tx(ck, 800, 440, 'A', { 'text-anchor': 'middle', 'font-size': 28 }), mono(ck, 856, 436, 'meter', { 'font-size': 18 })];
const bRL = tx(ck, 460, 282, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 });
const bRV = mono(ck, 460, 398, '', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const bE = flow(ck, [[120, 446], [120, 540], [800, 540], [800, 330], [120, 330], [120, 410]], 24, { skip: (x, y) => (y < 332 && x > 352 && x < 568) || (Math.abs(x - 800) < 2 && y > 386 && y < 474) });
const SC = scope($('#scS'), 592, 200), trI = SC.tr(VI);
const sLab = [SC.lab(14, 26, 'CH1 · I · 1 mA/div', '#B9A6F2')];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" style="color:${TE}">9.0</span><span class="u">V</span>
  <span class="k">R</span><span class="v" id="r1R">?</span><span class="u">kΩ</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="r1I" style="color:${VI}">0.00</span><span class="u">mA</span>`;
const B1c = ['yellow', 'violet', 'red', 'gold'], B2c = ['brown', 'black', 'orange', 'gold'];
const tB1 = [wt('B2', 'Yellow'), wt('B2', 'violet'), wt('B2', 'red'), wt('B2', 'gold')];
const tB2 = [wt('B6', 'brown'), wt('B6', 'black'), wt('B6', 'orange')];
const tDg1 = [wt('B3', 'four'), wt('B3', 'seven'), wt('B3', 'two'), wt('B4', 'plus')];
const tDg2 = [wt('B6', 'One'), wt('B6', 'zero'), wt('B6', 'three')];
const tCon = wt('B5', 'Connect') + 0.5, tSwap = wt('B6', 'swap'), tTen = wt('B6', 'Ten');
const Iof = τ => τ < tCon ? 0 : (τ < tTen ? 9 / 4.7 : 0.9);
const eOff = t => 60 * (9 / 4.7 * (M.clamp(t, tCon, tTen) - tCon) + 0.9 * Math.max(0, t - tTen));

/* ================= T: tolerance ================= */
const tS = $('#tS');
const TX = v => 80 + 880 * (v - 4400) / 600, TY = 330;
const tWin = mk(tS, 'rect', { x: TX(4465), y: TY - 80, width: TX(4935) - TX(4465), height: 104, rx: 12, fill: C.ac2, stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const tAx = W(tS, `M60,${TY} H980`, { 'stroke-width': 3 });
const tTk = [4400, 4500, 4600, 4700, 4800, 4900, 5000].map(v => [W(tS, `M${TX(v)},${TY} V${TY + 12}`, { 'stroke-width': 2.5 }), mono(tS, TX(v), TY + 40, String(v), { 'text-anchor': 'middle', 'font-size': 18 })]).flat();
const tNom = W(tS, `M${TX(4700)},${TY - 96} V${TY + 4}`, { 'stroke-width': 4 }), tNomL = mono(tS, TX(4700), TY - 106, '4700 Ω MARKED', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
const tLo = mono(tS, TX(4465), TY + 74, '4465 Ω', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 22 }), tHi = mono(tS, TX(4935), TY + 74, '4935 Ω', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 22 });
const tEq = document.createElement('div'); tEq.className = 'st2'; tEq.style.top = '76px';
tEq.innerHTML = `<div class="sx" style="font-size:34px">${K(`5\\%\\ \\text{of}\\ 4700 = 235\\,\\Omega`)}</div><div class="why" id="tEq2">${K(`4700 \\pm 235\\,\\Omega`)}</div>`; $('#tL').appendChild(tEq);
$('#tEq2').style.fontSize = '30px'; $('#tEq2').style.color = INK;
const MEAS = [4652, 4581, 4733, 4690, 4812, 4547, 4766, 4705, 4873, 4628, 4905, 4744];
const tDots = MEAS.map(v => mk(tS, 'circle', { cx: TX(v), cy: TY, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 }));
const tMeasL = mono(tS, 80, 170, 'MEASURED BATCH', { 'font-size': 18, fill: INK, 'font-weight': 600 });
const TOL = [['gold', 'Gold', '±5%'], ['silver', 'Silver', '±10%'], [null, 'No band', '±20%']];
$('#tRows').innerHTML = TOL.map(([c, n, p], i) => `<div class="tr" style="top:${84 + i * 88}px"><div class="s" style="${c ? `background:${BC[c]}` : 'border-style:dashed;border-color:#9AA0AC'}"></div><div class="n">${n}</div><div class="p">${p}</div></div>`).join('');
const tRw = [...$('#tRows').children];
const tRSv = document.createElementNS(NS, 'svg'); tRSv.setAttribute('width', 528); tRSv.setAttribute('height', 600); tRSv.setAttribute('class', 'full'); $('#tR').appendChild(tRSv);
const tRes = resistor(tRSv, 264, 440, 300, 76, P4, { lead: 60 }); tRes.all(['yellow', 'violet', 'red', 'gold']);
const tRing = ctr(mk(tRSv, 'rect', { x: tRes.bx[3] - 24, y: 392, width: 48, height: 96, rx: 10, fill: 'none', stroke: AM, 'stroke-width': 4 }));
const tRingL = mono(tRSv, tRes.bx[3], 530, 'THIS BAND', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 18 });
const avT = PUC.avatar($('#sT'), { x: 196, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So no two resistors are exactly the same!' });

/* ================= V: five band ================= */
const vS = $('#vS');
const vRes = resistor(vS, 520, 200, 640, 130, P5, { lead: 90 });
const vCols = ['brown', 'black', 'black', 'red', 'brown'];
const LX5 = [150, 330, 510, 700, 890];
const vLead = vRes.bx.map((x, i) => W(vS, `M${x},${272} V${300} L${LX5[i]},${352}`, { 'stroke-width': 2.5, stroke: MU }));
$('#vLab').innerHTML = [['1st digit', '1'], ['2nd digit', '0'], ['3rd digit', '0'], ['multiplier', '× 100'], ['tolerance', '± 1%']].map(([a, b], i) => `<div class="bl" style="left:${LX5[i] - 75}px;top:362px"><div class="a">${a}</div><div class="b" style="font:600 30px 'IBM Plex Mono';color:var(--ink);margin-top:6px">${b}</div></div>`).join('');
const vLabs = [...$('#vLab').children];
const vStrip = document.createElement('div'); vStrip.className = 'pillp ink'; vStrip.style.cssText = 'left:36px;top:500px'; vStrip.innerHTML = `4 bands: 2 digits <span style="color:${AM}">·</span> 5 bands: 3 digits, for precise work`; $('#vL').appendChild(vStrip);
const vSteps = [[K(`(d_1 d_2 d_3) \\times 10^{\\,m} \\pm \\text{tol}`), 'five bands', 84], [K(`1\\ 0\\ 0`), 'three digits', 166], [K(`100 \\times 10^{2}`), 'red = 2 zeros', 248], [K(`= 10\\,000\\,\\Omega`), '', 330], [K(`= 10\\,\\text{k}\\Omega \\pm 1\\%`), '', 440]];
$('#vSteps').innerHTML = `<div class="hb" id="vBox" style="left:20px;width:488px;top:422px;height:100px"></div>` + vSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px;left:32px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const vRows = [...$('#vSteps').querySelectorAll('.st2')];
const tV5 = [wt('V3', 'Brown'), wt('V3', 'black'), wt('V3', 'black', 1), wt('V3', 'red'), wt('V3', 'brown', 1)];
const tVL = [wt('V2', 'first'), wt('V2', 'first') + 0.25, wt('V2', 'first') + 0.5, wt('V2', 'fourth'), wt('V2', 'fifth')];
const tVs = [wt('V2', 'Here'), wt('V3', 'One'), wt('V3', 'times'), wt('V3', 'Ten') - 0.3, wt('V3', 'Ten')];

/* ================= P: power rating + worked example ================= */
const pS = $('#pS');
const pW = [W(pS, 'M100,200 V130 H280'), W(pS, 'M500,130 H680 V290 H100 V236')];
const pRes = resistor(pS, 390, 130, 220, 64, P4, { lead: 0 }); pRes.all(['brown', 'black', 'red', 'gold']);
const pBat = [W(pS, 'M65,200 H135', { 'stroke-width': 5 }), W(pS, 'M82,236 H118', { 'stroke-width': 9 }), W(pS, 'M60,250 L140,180', { 'stroke-width': 3 }), mk(pS, 'path', { d: 'M140,180 L124,184 L134,195 Z', fill: INK })];
const pLb = [mono(pS, 160, 226, 'adjustable supply', { 'font-size': 18 }), mono(pS, 390, 86, '1 kΩ · rated ¼ W', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 })];
const pE = flow(pS, [[100, 236], [100, 290], [680, 290], [680, 130], [100, 130], [100, 200]], 18, { skip: (x, y) => y < 132 && x > 278 && x < 502 });
$('#pRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="pI" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k" style="color:${PW}">P</span><span class="v" id="pP" style="color:${PW}">0</span><span class="u">mW</span>
  <span class="k n">RATING</span><span class="v">250</span><span class="u">mW</span>`;
const pDer = [[K(`${tc(PW, 'P')} = ${tc(TE, 'V')}\\,${tc(VI, 'I')}`), 'power = voltage × current', 84], [K(`${tc(TE, 'V')} = ${tc(VI, 'I')}\\,${tc(INK, 'R')}`), "Ohm's law", 164],
  [K(`${tc(PW, 'P')} = ${tc(VI, 'I')}^{2}\\,${tc(INK, 'R')}`), 'put V = IR', 248], [K(`${tc(PW, 'P')} = \\dfrac{${tc(TE, 'V')}^{2}}{${tc(INK, 'R')}}`), 'or put I = V/R', 326]];
$('#pSteps').innerHTML = pDer.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="sm" id="pU" style="left:36px;top:440px;font-family:'IBM Plex Mono'">P in watts (W)   ·   1 W = 1000 mW</div>`;
$('#pBox').style.cssText += ';top:236px;height:186px';
const pRows = [...$('#pSteps').querySelectorAll('.st2')];
const szS = $('#szS'), SZ = [[90, 46, 16, '⅛ W'], [220, 66, 22, '¼ W'], [370, 88, 28, '½ W'], [530, 118, 36, '1 W'], [690, 150, 44, '2 W']];
const szR = SZ.map(([x, L, H, l]) => { const r = resistor(szS, x, 512, L, H, P4, { lead: 12, sw: 3, lw: 3 }); r.all(['brown', 'black', 'red', 'gold']); const lb = mono(szS, x, 576, l, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 }); return [r.g, lb]; });
const wRows = [[K(`${tc(INK, 'R')} = 10 \\times 10^{2} = 1000\\,\\Omega`), 'brown, black, red', 84], [K(`${tc(VI, 'I')}^{2}${tc(INK, 'R')} = ${tc(PW, 'P')} \\ \\Rightarrow\\ ${tc(VI, 'I')} = \\sqrt{${tc(PW, 'P')}/${tc(INK, 'R')}}`), '', 176],
  [K(`${tc(VI, 'I')} = \\sqrt{\\dfrac{0.25}{1000}}`), '', 268], [K(`${tc(VI, 'I')} \\approx 15.8\\,\\text{mA}`), 'the safe limit', 446]];
$('#wSteps').innerHTML = wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wR = [...$('#wSteps').querySelectorAll('.st2')];
const tPd = [wt('P3', 'P'), wt('P4', 'V'), wt('P5', 'P'), wt('P5', 'using')];
const tWr = [wt('W2', 'Brown'), wt('W3', 'I'), wt('W4', 'That'), wt('W5', 'About')];
const avP = PUC.avatar($('#sP'), { x: 192, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the watts decide the safe current!' });
// heat test: two ramps. P2 shows burning (0 -> 25 mA), W3..W5 climbs to the limit 15.8 mA and holds
const tH1 = wt('P2', 'Current'), tH1e = wt('P2', 'burns') + 0.2, tH2 = wt('W3', 'largest'), tH2e = wt('W5', 'About');
const Ip = t => { if (t >= tH1 && t < tP3r) return 25 * M.io((t - tH1) / (tH1e - tH1)); if (t >= tH2) return 15.81 * M.io((t - tH2) / (tH2e - tH2)); return 0; };
const tP3r = T0('P3') - 0.1;

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Red, violet, orange = 273 Ω', right: 'Third band = × 10³, so 27 kΩ', y0: 96, y1: 184 });
const xS = $('#tcS');
const xRes = resistor(xS, 200, 170, 240, 76, P4, { lead: 50 }); xRes.all(['red', 'violet', 'orange', 'gold']);
const xWr = mono(xS, 420, 140, '2  7  3  Ω', { fill: C.red, 'font-weight': 600, 'font-size': 34 });
const xSk = W(xS, 'M412,128 H600', { stroke: C.red, 'stroke-width': 4 });
const xRt = mono(xS, 420, 216, '27 × 10³ Ω', { fill: C.ok, 'font-weight': 600, 'font-size': 34 });
const xRt2 = mono(xS, 420, 258, '= 27 kΩ', { fill: INK, 'font-weight': 600, 'font-size': 28 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS'], type: 'Decode bands to value and tolerance, write the bands for a value, or find a safe current from the power rating' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '25px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A resistor has bands green, blue, red, gold and a power rating of 0.5&nbsp;W. The largest current it can safely carry is about:', qW: 780,
  opts: [K('89\\,\\mu\\text{A}'), K('9.4\\,\\text{mA}'), K('30\\,\\text{mA}'), K('94\\,\\text{mA}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${tc(INK, 'R')} = 56\\times10^{2} = 5600\\,\\Omega`)], [K(`${tc(VI, 'I')} = \\sqrt{${tc(PW, 'P')}/${tc(INK, 'R')}}`)],
  [K(`${tc(VI, 'I')} = \\sqrt{\\dfrac{0.5}{5600}}`)], [K(`${tc(VI, 'I')} \\approx 9.45\\,\\text{mA}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Green'), wt('A3', 'I'), wt('A4', 'The'), wt('A4', 'about')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 82, title: 'Resistor colour codes and ratings · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K(`${tc(INK, 'R')} = (d_1 d_2) \\times 10^{\\,m} \\ \\pm\\ \\text{tol}`),
    K(`${tc(PW, 'P')} = ${tc(TE, 'V')}${tc(VI, 'I')} = ${tc(VI, 'I')}^{2}${tc(INK, 'R')} = ${tc(TE, 'V')}^{2}/${tc(INK, 'R')}`),
    K(`${tc(VI, 'I')}_{\\max} = \\sqrt{${tc(PW, 'P')}/${tc(INK, 'R')}}`),
    '0 to 9: Black Brown Red Orange Yellow Green Blue Violet Grey White',
    'Gold ×0.1, ±5% · Silver ×0.01, ±10% · No band ±20%'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 27', topic: 'Capacitors and capacitance', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tBz = wt('B2', 'Yellow') - 0.2, tBz2 = T0('B5');
const tTz = wt('T3', 'anywhere'), tTz2 = T0('T4') + 0.4;
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tBz, 1.1, 700, 540], [tBz2, 1, 960, 540], [tTz, 1.1, 820, 600], [tTz2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const g1 = t >= tB + 0.5 && t < tST, g2 = t >= tP + 0.5 && t < tX;
  M.vis(ghost, t, t < tP ? tB + 0.5 : tP + 0.5, t < tP ? tST - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!g1 && !g2) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(magP, t, tMorph + 0.8, 0.45, 0.2); M.vis(magR.g, t, tMorph + 1.1, 1e9, { dy: 0, fade: 0.25 });
    showBands(magR, ['yellow', 'violet', 'red', 'gold'], t, [0, 1, 2, 3].map(i => wt('H1', 'coloured') + i * 0.12));
    M.vis($('#aPill'), t, wt('H2', 'label') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#bdC'), t, wt('H1', 'Inside') - 0.1, out, { dx: 60, dy: 0, ...o });
    BDR.forEach((r, i) => M.vis(r.g, t, wt('H1', 'beads') - 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#qC'), t, wt('H1', 'not') - 0.3, out, { dy: 36, ...o });
    showBands(qR, qCols, t, [0, 1, 2, 3].map(i => wt('H2', 'how') + i * 0.15));
    M.vis($('#qN'), t, wt('H1', 'number') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#qL'), t, wt('H1', 'number') + 0.1, 1e9, { dy: 10 });
  }

  /* I: why colours */
  const iOn = t >= tI - 0.05 && t < tD + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tD - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(iR.g, t, tI + 0.4, 1e9, { dy: 16 }); M.vis(iRL, t, tI + 0.6, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(iW, t, wt('I1', 'job') - 0.3, 0.35, 0.15); M.vis(iRt, t, wt('I1', 'job'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iSL, t, wt('I1', 'job') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const lim = wt('I1', 'limit');
    iE.set(110 * Math.max(0, t - lim + 0.6) - 70 * Math.max(0, t - lim), t >= lim - 0.6);
    M.vis($('#iPill'), t, lim - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    [0, 1].forEach(k => { const tile = $('#it' + k), t0 = k === 0 ? wt('I2', 'printed') - 0.2 : wt('I3', 'Colour') - 0.2;
      M.vis(tile, t, t0, 1e9, { dy: 20 });
      iViews[k].forEach((v, j) => { const tj = t0 + 0.3 + j * 0.35; M.vis(v.lab, t, tj, 1e9, { dy: 0, fade: 0.2 }); M.vis(v.r.g, t, tj, 1e9, { dy: 10 }); v.extra.forEach(e => M.vis(e, t, tj + 0.1, 1e9, { dy: 0, fade: 0.2 })); M.vis(v.mkx, t, tj + 0.35, 1e9, { dy: 0, fade: 0.15 }); });
      M.vis(tile.querySelector('.tn'), t, t0 + 1.4, 1e9, { dy: 8 });
      const lit = k === 1 ? M.io((t - wt('I3', 'any')) / 0.3) : 0; tile.style.borderColor = M.mix(C.soft, AM, lit); tile.style.background = M.mix(C.soft, '#FFFFFF', lit); });
  }

  /* D: code ladder */
  const dOn = t >= tD - 0.05 && t < tR + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tR - 0.32;
    M.vis($('#cC'), t, tD + 0.1, out, { dy: 36, ...o });
    CH.forEach((c, i) => {
      const ti = i < 10 ? tChip[i] - 0.15 : tGS[i - 10] - 0.15;
      M.vis(c, t, ti, 1e9, { dy: 24 });
      let ring = 0; if (i < 10) MNW.forEach(([w, ...ix], k) => { if (ix.includes(i)) ring = Math.max(ring, M.io((t - tMn[k]) / 0.2)); });
      c.querySelector('.sw').style.boxShadow = ring > 0 ? `0 0 0 ${(5 * ring).toFixed(1)}px ${AM}` : 'none';
    });
    M.vis($('#mn'), t, T0('D4') - 0.1, 1e9, { dy: 24 });
    MN.forEach((s, k) => M.vis(s, t, tMn[k] - 0.08, 1e9, { dy: 10, fade: 0.12 }));
    M.vis($('#cGS'), t, tGS[0] - 0.2, 1e9, { dy: 10 }); M.rise($('#gsL'), t, wt('D6', 'multiplier') - 0.3);
  }

  /* R: reading rules */
  const rOn = t >= tR - 0.05 && t < tB + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tB - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    showBands(rRes, rCols, t, [0, 1, 2, 3].map(i => tR + 0.6 + i * 0.12));
    const ra = M.io((t - wt('R2', 'turn')) / 0.5); rArr.set(160, 86, 160 + 200 * ra, 86); rArrL.style.opacity = ra;
    M.draw(rGap, t, wt('R2', 'apart') - 0.2, 0.4); M.vis(rGapL, t, wt('R2', 'apart'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(rStrip, t, wt('R2', 'gold') - 0.1, 1e9, { dy: 16 });
    rLead.forEach((l, i) => { M.draw(l, t, tRs[i] - 0.15, 0.35); M.vis(rLabs[i], t, tRs[i] + 0.1, 1e9, { dy: 10 });
      PUC.attr(rRes.bands[i], 'stroke', t >= tRs[i] && t < (tRs[i + 1] ?? wt('R6', 'So')) ? AM : 'none'); PUC.attr(rRes.bands[i], 'stroke-width', 5); });
    rRows.forEach((r, i) => { const t0 = tR + 0.8 + i * 0.15; M.vis(r.querySelector('.n'), t, t0, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tRs[i], 0.6); M.vis(r.querySelector('.why'), t, t0 + 0.1, 1e9, { dx: -10, dy: 0 }); r.querySelector('.why').style.color = t >= tRs[i] ? INK : MU; M.hide(r, t < t0 - 0.05); });
    M.vis($('#rBox'), t, wt('R6', 'So') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#rF'), t, wt('R6', 'So'), 1.4);
    M.vis($('#rU'), t, wt('R6', 'Resistance'), 1e9, { dy: 10 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tT - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tCon - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(bRes.g, t, tB + 0.4, 1e9, { dy: 16 });
    const sw = t >= tSwap;
    showBands(bRes, sw ? B2c : B1c, t, sw ? [...tB2, 0] : tB1);
    DG.forEach((d, i) => { const v1 = ['4', '7', '× 100', '± 5%'][i], v2 = ['1', '0', '× 1000', '± 5%'][i];
      const s = sw ? (i < 3 ? (t >= tDg2[i] ? v2 : '') : v2) : (t >= tDg1[i] ? v1 : '');
      M.setT(d, s); d.style.color = i === 2 ? C.gold : INK; M.hide(d, !s); });
    const vOn = sw ? t >= tTen : t >= wt('B4', 'four');
    M.setT(bVal, sw ? '10 kΩ ± 5%' : '4.7 kΩ ± 5%'); M.setT(bVal2, sw ? '10 × 1000 = 10 000 Ω' : '47 × 100 = 4700 Ω');
    M.hide(bVal, !vOn); M.hide(bVal2, !vOn);
    drawSeq(bW, t, tB + 0.6, 0.45, 0.15); M.draw(bZ, t, tB + 0.9, 0.5); drawSeq(bBat, t, tB + 1.0, 0.25, 0.1); M.vis(bAm[0], t, tB + 1.1, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([...bLb, bRL], t, tB + 1.2, 0.06);
    M.setT(bRV, t >= tTen ? '10 kΩ' : (t >= wt('B4', 'four') ? '4.7 kΩ' : ''));
    bE.set(eOff(t), t >= tB + 1.2);
    trI(τ => 50 * Iof(τ), t, tB + 0.6, 6, 190, t >= tB + 0.6);
    sLab.forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#r1R'), t >= tTen ? '10.0' : (t >= wt('B4', 'four') ? '4.70' : '?'));
    M.setT($('#r1I'), Iof(t).toFixed(2));
  } else { bE.set(0, false); }

  /* T: tolerance */
  const tOn = t >= tT - 0.05 && t < tST; M.hide($('#sT'), !tOn);
  if (tOn) {
    const out = tST - 0.45;
    M.vis($('#tL'), t, tT + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tR'), t, tT + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(tAx, t, tT + 0.4, 0.6); fadeAt(tTk, t, tT + 0.5, 0.03);
    M.draw(tNom, t, tT + 0.9, 0.3); M.vis(tNomL, t, tT + 1.0, 1e9, { dy: 0, fade: 0.2 });
    M.vis(tEq, t, wt('T2', 'Five') - 0.1, 1e9, { dy: 10 }); PUC.write(tEq.querySelector('.sx'), t, wt('T2', 'Five'), 0.8);
    M.vis($('#tEq2'), t, wt('T3', 'anywhere') - 0.2, 1e9, { dx: -12, dy: 0 });
    const wn = M.io((t - wt('T3', 'anywhere')) / 0.6), xm = TX(4700), x0 = M.lerp(xm, TX(4465), wn), x1 = M.lerp(xm, TX(4935), wn);
    PUC.attr(tWin, 'x', x0.toFixed(1)); PUC.attr(tWin, 'width', Math.max(0, x1 - x0).toFixed(1)); M.hide(tWin, wn <= 0);
    M.vis(tLo, t, wt('T3', 'four', 1) - 0.1, 1e9, { dy: 8 }); M.vis(tHi, t, wt('T3', 'four', 3) - 0.1, 1e9, { dy: 8 });
    const tm = wt('T4', 'Measure');
    M.vis(tMeasL, t, tm - 0.1, 1e9, { dy: 0, fade: 0.2 });
    tDots.forEach((d, i) => { const ti = tm + 0.15 + i * 0.16, u = M.clamp((t - ti) / 0.45), y = 190 + (TY - 190) * u * u;
      PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, t < ti); PUC.attr(d, 'fill', u >= 1 ? C.ok : '#fff'); PUC.attr(d, 'stroke', u >= 1 ? '#1F6B3F' : INK); });
    tRw.forEach((r, i) => { const ti = [wt('T4', 'Gold'), wt('T4', 'silver'), wt('T4', 'no')][i]; M.vis(r, t, i === 0 ? tT + 0.6 : ti - 0.15, 1e9, { dy: 16 });
      const lit = M.io((t - (i === 0 ? tT + 0.9 : ti)) / 0.25) * (i === 0 ? 1 - M.io((t - wt('T4', 'silver')) / 0.25) : (i === 1 ? 1 - M.io((t - wt('T4', 'no')) / 0.25) : 1));
      r.style.background = M.mix(C.soft, C.ac2, lit); r.style.boxShadow = lit > 0 ? `inset 0 0 0 ${(3 * lit).toFixed(1)}px ${AM}` : 'none'; });
    M.vis(tRes.g, t, tT + 0.7, 1e9, { dy: 16 }); M.vis(tRing, t, tT + 1.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(tRingL, t, tT + 1.2, 1e9, { dy: 0, fade: 0.2 });
    avT(t, wt('T4', 'window') + 0.2, out);
  }

  /* ST: statement */
  const sOn = t >= tST - 0.1 && t < tV; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tST + 0.05, { out: tV - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('ST', 'third') - 0.05, { out: tV - 0.35, outDur: 0.25 }); }

  /* V: five band */
  const vOn2 = t >= tV - 0.05 && t < tP + 0.1; M.hide($('#sV'), !vOn2);
  if (vOn2) {
    const out = tP - 0.32;
    M.vis($('#vL'), t, tV + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vR'), t, tV + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(vRes.g, t, tV + 0.4, 1e9, { dy: 16 });
    showBands(vRes, vCols, t, tV5.map((x, i) => Math.min(x, tV + 0.8 + i * 0.12)));
    vLead.forEach((l, i) => { M.draw(l, t, tVL[i] - 0.15, 0.35); const lb = vLabs[i]; M.vis(lb, t, tVL[i], 1e9, { dy: 10 }); M.vis(lb.querySelector('.b'), t, tV5[i], 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      PUC.attr(vRes.bands[i], 'stroke', t >= tV5[i] && t < tV5[i] + 0.6 ? AM : 'none'); PUC.attr(vRes.bands[i], 'stroke-width', 5); });
    M.vis(vStrip, t, wt('V2', 'fifth') + 0.4, 1e9, { dy: 16 });
    vRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tVs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tVs[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tVs[i] + 0.4, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tVs[i] - 0.15); });
    M.vis($('#vBox'), t, tVs[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* P: power rating + worked example */
  const pOn = t >= tP - 0.05 && t < tX + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tX - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(pW, t, tP + 0.5, 0.45, 0.2); M.vis(pRes.g, t, tP + 0.7, 1e9, { dy: 0, fade: 0.2 }); fadeAt(pBat, t, tP + 0.8, 0.06); fadeAt(pLb, t, tP + 1.0, 0.1);
    M.vis($('#pRo'), t, wt('P1', 'power') - 0.2, 1e9, { dy: 12 });
    const I = Ip(t), P = I * I; // (mA)^2 x 1 kOhm = mW
    M.setT($('#pI'), I.toFixed(1)); M.setT($('#pP'), Math.round(P).toString());
    const u = P / 250; PUC.attr(pRes.body, 'fill', u <= 1 ? M.mix(BODY, '#F4A261', u) : M.mix('#F4A261', C.red, M.clamp((u - 1) / 1.2)));
    pE.set(eInt(t), I > 0.05);
    $('#pP').style.color = P > 251 ? C.red : PW;
    const hot = t >= tH1 && t < tP3r && P > 250; M.vis($('#hotP'), t, hot ? tH1 + (tH1e - tH1) * Math.sqrt(250 / 625) : 1e9, tP3r - 0.25, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0 }); if (t < tH1 || t >= tP3r) M.hide($('#hotP'), true);
    const wOn = t >= tW - 0.3;
    M.vis($('#pRL1'), t, tP + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    pRows.forEach((r, i) => { M.vis(r, t, tPd[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (!wOn) { M.vis(r.querySelector('.n'), t, tPd[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tPd[i], 0.6); M.vis(r.querySelector('.why'), t, tPd[i] + 0.4, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#pBox'), t, tPd[3] + 0.6, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#pU'), t, wt('P6', 'watts') - 0.2, tW - 0.3, { dy: 10, outDur: 0.25 });
    const tsz = [wt('P6', 'eighth'), wt('P6', 'quarter'), wt('P6', 'half'), wt('P6', 'one', 1), wt('P6', 'two')];
    szR.forEach(([g, lb], i) => { M.vis(g, t, tsz[i] - 0.15, tW - 0.3, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.25, ody: 0 }); M.vis(lb, t, tsz[i], tW - 0.3, { dy: 0, fade: 0.15, outDur: 0.25, ody: 0 }); });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
    M.vis($('#wBox'), t, tWr[3] - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avP(t, wt('W5', 'overheats') + 0.1, out);
  } else pE.set(0, false);

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Red') - 0.05, tStrike: wt('X2', 'Wrong'), tRight: wt('X3', 'third') - 0.1 });
    M.vis(xRes.g, t, tX + 0.5, 1e9, { dy: 12 });
    M.vis(xWr, t, wt('X2', 'two') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.draw(xSk, t, wt('X2', 'Wrong'), 0.3);
    M.vis(xRt, t, wt('X3', 'twenty') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(xRt2, t, wt('X3', 'kilo') - 0.3, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'NEET'), wt('X5', 'PUC')], tType: wt('X4', 'decode') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
// electron offset in the heat test: integral of the current (speed proportional to I)
function eInt(t) { const N = 40; let s = 0; const a = tH1; if (t <= a) return 0; const dt = (t - a) / N; for (let i = 0; i < N; i++) s += Ip(a + (i + 0.5) * dt) * dt; return 8 * s; }
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
