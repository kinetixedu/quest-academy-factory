// PUC Maths Ep 36: Trigonometric equations (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 3 bible): sin coral (accent), cos blue, tan teal, the angle x violet; this episode: the level line y = k gold
const CB = '#2F6FEB', SC = C.ac, XC = C.violet, TC = C.teal, LV = C.gold;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const sn = `\\textcolor{${SC}}{\\sin}`, cs = `\\textcolor{${CB}}{\\cos}`, tn = `\\textcolor{${TC}}{\\tan}`, xv = `\\textcolor{${XC}}{x}`;
const xc = s => `\\textcolor{${XC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`, okc = s => `\\textcolor{${C.ok}}{${s}}`;
const PI = Math.PI, rad = d => d * PI / 180;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P1'), tG1 = T0('G1'), tD1 = T0('D1'), tC1 = T0('C1'), tS1 = T0('S1'), tS3 = T0('S3');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['VALVE HEIGHT', `${sn}\\,${xv}`], ['HALF HEIGHT', '\\tfrac{1}{2}'], ['WHEN?', `${sn}\\,${xv} = \\tfrac{1}{2}`]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'question') - 0.1, wt('H1', 'valve') - 0.1, wt('H1', 'half') - 0.1];

/* ---------- H: the wheel ---------- */
const hS = $('#hS'), WX = 220, WY = 300, WR = 150;
mk(hS, 'line', { x1: 40, y1: WY, x2: 410, y2: WY, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hTyre = mk(hS, 'circle', { cx: WX, cy: WY, r: WR, fill: 'none', stroke: C.ink, 'stroke-width': 12 });
const hRim = mk(hS, 'circle', { cx: WX, cy: WY, r: WR - 16, fill: 'none', stroke: C.dim, 'stroke-width': 2.5 });
const hSp = mk(hS, 'g', {}); const spokes = Array.from({ length: 12 }, () => mk(hSp, 'line', { x1: WX, y1: WY, stroke: C.dim, 'stroke-width': 1.6 }));
const hLvl = mk(hS, 'line', { x1: 40, y1: WY - WR / 2, x2: 410, y2: WY - WR / 2, stroke: LV, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const hLvlT = txt(hS, 40, WY - WR / 2 - 12, 'HALF HEIGHT', { 'font-size': 16, fill: LV, 'font-weight': 600, 'letter-spacing': 1.5 });
const hHt = mk(hS, 'line', { stroke: SC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hArm = mk(hS, 'line', { x1: WX, y1: WY, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
mk(hS, 'circle', { cx: WX, cy: WY, r: 9, fill: C.ink });
const hV = mk(hS, 'circle', { r: 12, fill: SC, stroke: '#fff', 'stroke-width': 3 });
const HV = [30, 150, 390, 510];
$('#hCs').innerHTML = HV.map((v, i) => `<div class="sc" id="hc${i}" style="left:${440 + (i % 2) * 156}px;top:${262 + Math.floor(i / 2) * 72}px;width:140px"><i>${i < 2 ? 'TURN 1' : 'TURN 2'}</i>${v}°</div>`).join('');
const tHk = [wt('H3', 'thirty'), wt('H3', 'fifty'), wt('H4', 'ninety'), wt('H4', 'ten')];
const hA0 = tMorph + 0.5;
const KX = [[hA0, 0], [tHk[0], 30], [tHk[1], 150], [tHk[2], 390], [tHk[3], 510], [T1('H5'), 600]];
const xOfH = t => { if (t <= KX[0][0]) return 0; for (let i = 1; i < KX.length; i++) if (t <= KX[i][0]) { const [a, va] = KX[i - 1], [b, vb] = KX[i]; return va + (vb - va) * (t - a) / Math.max(0.01, b - a); } return 600; };

/* ---------- P: definition + number line ---------- */
$('#dfE').innerHTML = K(`\\text{like}\\ \\ ${sn}\\,${xv} = \\tfrac{1}{2}`);
$('#tm0d').innerHTML = `${K(`0 \\le ${xv} < 2\\pi`)} &nbsp;· one full turn`;
$('#tm1d').innerHTML = `every solution, in one formula with an integer ${K('n')}`;
const pS = $('#pS'), PX = v => 60 + (v + 2 * PI) * 680 / (6 * PI), PY = 300;
const pZone = mk(pS, 'rect', { x: PX(0), y: PY - 70, width: PX(2 * PI) - PX(0), height: 140, rx: 10, fill: C.ac2 });
const pZT = txt(pS, PX(PI), PY - 86, 'ONE TURN · PRINCIPAL', { 'text-anchor': 'middle', 'font-size': 16, fill: SC, 'font-weight': 600, 'letter-spacing': 1.5 });
mk(pS, 'line', { x1: 50, y1: PY, x2: 740, y2: PY, stroke: C.ink, 'stroke-width': 2.5 });
['-2π', '-π', '0', 'π', '2π', '3π', '4π'].forEach((l, i) => { const x = PX((i - 2) * PI); mk(pS, 'line', { x1: x, y1: PY - 9, x2: x, y2: PY + 9, stroke: C.ink, 'stroke-width': 2 }); txt(pS, x, PY + 100, l, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
const PD = [[PI / 6, 'π/6', 1, 0], [5 * PI / 6, '5π/6', 1, 1], [13 * PI / 6, '13π/6', 0, 0], [17 * PI / 6, '17π/6', 0, 1], [-7 * PI / 6, '-7π/6', 0, 1], [-11 * PI / 6, '-11π/6', 0, 0]];
const pDots = PD.map(([v, l, pr, alt]) => { const g = mk(mk(pS, 'g', { transform: `translate(${PX(v).toFixed(1)},${PY})` }), 'g', {}); mk(g, 'circle', { r: 10, fill: pr ? SC : '#fff', stroke: pr ? SC : XC, 'stroke-width': 3.5 }); txt(g, 0, alt ? 62 : 38, l, { 'text-anchor': 'middle', 'font-size': 16, fill: pr ? SC : XC, 'font-weight': 600 }); return { g, pr }; });
const pNote = txt(pS, 392, 470, 'the general solution catches every one of them', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });

/* ---------- G: live graph ---------- */
const gS = $('#gS'), GX0 = 90, GX1 = 1000, GY = 330, GA = 150, GX = v => GX0 + (GX1 - GX0) * v / (4 * PI), GYf = v => GY - GA * v;
mk(gS, 'line', { x1: GX0, y1: GY, x2: GX1 + 10, y2: GY, stroke: C.ink, 'stroke-width': 2.5 });
mk(gS, 'line', { x1: GX0, y1: GYf(1.35), x2: GX0, y2: GYf(-1.35), stroke: C.ink, 'stroke-width': 2.5 });
[1, 2, 3, 4].forEach(i => { mk(gS, 'line', { x1: GX(i * PI), y1: GY - 8, x2: GX(i * PI), y2: GY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(gS, GX(i * PI), GY + 34, `${i === 1 ? '' : i}π`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
[[1, '1'], [-1, '-1']].forEach(([v, l]) => { mk(gS, 'line', { x1: GX0 - 8, y1: GYf(v), x2: GX0, y2: GYf(v), stroke: C.ink, 'stroke-width': 2 }); txt(gS, GX0 - 14, GYf(v) + 6, l, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
const gTurn = mk(gS, 'rect', { x: GX(0), y: GYf(1.35), width: GX(2 * PI) - GX(0), height: GA * 2.7, fill: C.ac3 });
gS.insertBefore(gTurn, gS.firstChild);
const gTurnT = txt(gS, GX(PI), GYf(1.25), 'TURN 1', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 });
const gTurnT2 = txt(gS, GX(3 * PI), GYf(1.25), 'TURN 2', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 });
const gCurve = mk(gS, 'path', { fill: 'none', stroke: SC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const gLvlP = mk(gS, 'g', {}), gLvl = mk(gLvlP, 'g', {});
mk(gLvl, 'line', { x1: GX0, y1: 0, x2: GX1, y2: 0, stroke: LV, 'stroke-width': 3.5, 'stroke-dasharray': '12 9' });
const gLvlT = txt(gLvl, GX1, -12, 'y = k', { 'text-anchor': 'end', 'font-size': 20, fill: LV, 'font-weight': 600 });
const gTip = mk(gS, 'circle', { r: 9, fill: SC });
const gDots = [0, 1, 2, 3].map(() => mk(mk(gS, 'g', {}), 'g', {}));
gDots.forEach(g => mk(g, 'circle', { r: 11, fill: XC, stroke: '#fff', 'stroke-width': 3 }));
const tG0 = wt('G1', 'Draw'), tGe = T1('G3') - 0.4;
const sweepOf = t => 4 * PI * M.clamp((t - tG0) / Math.max(1, tGe - tG0));
const tk1 = wt('G4', 'climb'), tk1e = wt('G5', 'touches'), tk2 = wt('G6', 'Above') - 0.1;
const kOf = t => 0.5 + 0.5 * M.io((t - tk1) / Math.max(0.8, tk1e - tk1)) + 0.2 * M.io((t - tk2) / 1.0);
const sols = k => { if (k > 1.0005) return []; const a = Math.asin(Math.min(1, k)); return [a, PI - a, 2 * PI + a, 3 * PI - a]; };
const tCross = x => tG0 + x / (4 * PI) * (tGe - tG0);
let gKey = '';

/* ---------- D: derivation ---------- */
const DS = [[`${sn}\\,${xv} = ${sn}\\,\\alpha \\;\\Rightarrow\\; ${xv} = \\alpha`, 'the easy answer'],
  [`${xv} = \\pi - \\alpha`, 'same height, on the mirror side'],
  [`${xv} = 2n\\pi + \\alpha \\ \\ \\text{or}\\ \\ 2n\\pi + \\pi - \\alpha`, 'every full turn brings the heights back'],
  [`\\text{even}\\ n\\pi: ${okc('+\\alpha')} \\qquad \\text{odd}\\ n\\pi: ${red('-\\alpha')}`, 'the pattern hiding in the list'],
  [`${xv} = n\\pi + (-1)^n\\,\\alpha,\\quad n \\in \\mathbb{Z}`, 'one line holds them all']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'easy'), wt('D3', 'point'), wt('D4', 'So'), wt('D5', 'Even'), wt('D6', 'equals')];
const dS = $('#dS'), DCX = 250, DCY = 230, DR = 120, DA = 40;
mk(dS, 'line', { x1: 80, y1: DCY, x2: 420, y2: DCY, stroke: C.ink, 'stroke-width': 2 });
mk(dS, 'line', { x1: DCX, y1: 90, x2: DCX, y2: 370, stroke: C.ink, 'stroke-width': 2 });
mk(dS, 'circle', { cx: DCX, cy: DCY, r: DR, fill: 'none', stroke: C.mute, 'stroke-width': 2 });
const dPt = a => [DCX + DR * Math.cos(rad(a)), DCY - DR * Math.sin(rad(a))];
const [ax, ay] = dPt(DA), [bx, by] = dPt(180 - DA);
const dLv = mk(dS, 'line', { x1: 70, y1: ay, x2: 430, y2: ay, stroke: LV, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const dA = mk(mk(dS, 'g', {}), 'g', {}); mk(dA, 'line', { x1: DCX, y1: DCY, x2: ax, y2: ay, stroke: C.ink, 'stroke-width': 3 }); mk(dA, 'line', { x1: ax, y1: DCY, x2: ax, y2: ay, stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(dA, 'circle', { cx: ax, cy: ay, r: 10, fill: XC }); txt(dA, ax + 14, ay - 14, 'x = α', { 'font-size': 20, fill: XC, 'font-weight': 600 });
const dB = mk(mk(dS, 'g', {}), 'g', {}); mk(dB, 'line', { x1: DCX, y1: DCY, x2: bx, y2: by, stroke: C.ink, 'stroke-width': 3 }); mk(dB, 'line', { x1: bx, y1: DCY, x2: bx, y2: by, stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(dB, 'circle', { cx: bx, cy: by, r: 10, fill: XC }); txt(dB, bx - 14, by - 14, 'x = π - α', { 'font-size': 20, fill: XC, 'font-weight': 600, 'text-anchor': 'end' });
const dTurn = mk(mk(dS, 'g', {}), 'g', {}); mk(dTurn, 'path', { d: `M${DCX + DR + 26},${DCY} A${DR + 26},${DR + 26} 0 1 0 ${DCX + DR + 22},${DCY + 24}`, fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
mk(dTurn, 'path', { d: `M${DCX + DR + 22},${DCY + 24} l2,-20 l14,14 z`, fill: XC });
const dTurnT = txt(dTurn, 470, DCY - 40, '+ 2π: same heights again', { 'font-size': 20, fill: XC, 'font-weight': 600 });
const NS = [['n = 0', `0\\pi ${okc('+\\,\\alpha')}`], ['n = 1', `1\\pi ${red('-\\,\\alpha')}`], ['n = 2', `2\\pi ${okc('+\\,\\alpha')}`], ['n = 3', `3\\pi ${red('-\\,\\alpha')}`]];
$('#dNs').innerHTML = NS.map(([a, b], i) => `<div class="nc" id="dn${i}" style="left:${36 + i * 178}px;top:440px"><div class="a">${a}</div><div class="b">${K(b)}</div></div>`).join('');
const tDn = [wt('D4', 'So'), wt('D4', 'So') + 0.3, wt('D4', 'or') - 0.1, wt('D4', 'or') + 0.2];

/* ---------- C: cos, tan, zeros ---------- */
const CR = [[`${cs}\\,${xv} = ${cs}\\,\\alpha \\;\\Rightarrow\\; ${xv} = 2n\\pi \\pm \\alpha`, 'SAME ACROSS AT α AND -α'],
  [`${tn}\\,${xv} = ${tn}\\,\\alpha \\;\\Rightarrow\\; ${xv} = n\\pi + \\alpha`, 'REPEATS EVERY HALF TURN'],
  [`${sn}\\,${xv} = 0 \\;\\Rightarrow\\; ${xv} = n\\pi`, 'EVERY MULTIPLE OF π'],
  [`${cs}\\,${xv} = 0 \\;\\Rightarrow\\; ${xv} = (2n+1)\\tfrac{\\pi}{2}`, 'EVERY ODD MULTIPLE OF π/2']];
$('#cR').innerHTML = CR.map(([f, tg], i) => `<div class="f4" id="cr${i}" style="top:${82 + i * 120}px"><div class="fx">${K(f)}</div><div class="tg">${tg}</div></div>`).join('');
const tCr = [wt('C2', 'gives'), wt('C3', 'gives'), wt('C4', 'Sine'), wt('C4', 'cos')];
const cS = $('#cS'), CCX = 330, CCY = 300, CRR = 160, cPt = a => [CCX + CRR * Math.cos(rad(a)), CCY - CRR * Math.sin(rad(a))];
mk(cS, 'line', { x1: 110, y1: CCY, x2: 560, y2: CCY, stroke: C.ink, 'stroke-width': 2 }); mk(cS, 'line', { x1: CCX, y1: 100, x2: CCX, y2: 500, stroke: C.ink, 'stroke-width': 2 });
mk(cS, 'circle', { cx: CCX, cy: CCY, r: CRR, fill: 'none', stroke: C.mute, 'stroke-width': 2 });
const cSt = [0, 1, 2].map(() => mk(mk(cS, 'g', {}), 'g', {}));
{ const [px, py] = cPt(50), [qx, qy] = cPt(-50), g = cSt[0];
  mk(g, 'line', { x1: px, y1: py, x2: qx, y2: qy, stroke: CB, 'stroke-width': 3, 'stroke-dasharray': '9 7' }); mk(g, 'line', { x1: CCX, y1: CCY, x2: px, y2: CCY, stroke: CB, 'stroke-width': 8, 'stroke-linecap': 'round' });
  [[px, py, 'α'], [qx, qy, '-α']].forEach(([x, y, l], i) => { mk(g, 'line', { x1: CCX, y1: CCY, x2: x, y2: y, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: 10, fill: XC }); txt(g, x + 16, y + (i ? 26 : -10), l, { 'font-size': 22, fill: XC, 'font-weight': 600 }); });
  txt(g, (CCX + px) / 2, CCY + 34, 'same across', { 'text-anchor': 'middle', 'font-size': 18, fill: CB, 'font-weight': 600 }); }
{ const [px, py] = cPt(50), [qx, qy] = cPt(230), g = cSt[1], ext = 1.35;
  mk(g, 'line', { x1: CCX + (qx - CCX) * ext, y1: CCY + (qy - CCY) * ext, x2: CCX + (px - CCX) * ext, y2: CCY + (py - CCY) * ext, stroke: TC, 'stroke-width': 4 });
  [[px, py, 'α', 1], [qx, qy, 'α + π', -1]].forEach(([x, y, l, s]) => { mk(g, 'circle', { cx: x, cy: y, r: 10, fill: XC }); txt(g, x + 18 * s, y + (s > 0 ? -8 : 30), l, { 'font-size': 22, fill: XC, 'font-weight': 600, 'text-anchor': s > 0 ? 'start' : 'end' }); });
  txt(g, CCX + 190, CCY - 210 + 24, 'same slope line', { 'font-size': 18, fill: TC, 'font-weight': 600 }); }
{ const g = cSt[2];
  [[0, '0', SC], [180, 'π', SC], [90, 'π/2', CB], [270, '3π/2', CB]].forEach(([a, l, col]) => { const [x, y] = cPt(a); mk(g, 'circle', { cx: x, cy: y, r: 11, fill: col }); txt(g, x + (a === 0 ? 18 : a === 180 ? -18 : 16), y + (a === 90 ? -12 : a === 270 ? 30 : -14), l, { 'font-size': 22, fill: col, 'font-weight': 600, 'text-anchor': a === 180 ? 'end' : 'start' }); });
  txt(g, 110, 540, 'sin is 0', { 'font-size': 18, fill: SC, 'font-weight': 600 }); txt(g, 300, 540, 'cos is 0', { 'font-size': 18, fill: CB, 'font-weight': 600 }); }
const CL = ['COS · SAME ACROSS AT α AND -α', 'TAN · α AND α + π, ONE LINE', 'ZEROS OF SIN AND COS'];

/* ---------- S: principal vs general ---------- */
$('#slF').innerHTML = K(`${xv} = \\tfrac{\\pi}{6},\\ \\tfrac{5\\pi}{6}`);
const slS = $('#slS'), SX = v => 70 + v * 640 / (2 * PI), SY = 330, SA = 110;
mk(slS, 'line', { x1: 60, y1: SY, x2: 730, y2: SY, stroke: C.ink, 'stroke-width': 2.5 });
['0', 'π', '2π'].forEach((l, i) => { const x = SX(i * PI); mk(slS, 'line', { x1: x, y1: SY - 8, x2: x, y2: SY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(slS, x, SY + 34, l, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
let sd = ''; for (let i = 0; i <= 200; i++) { const v = 2 * PI * i / 200; sd += (i ? 'L' : 'M') + SX(v).toFixed(1) + ',' + (SY - SA * Math.sin(v)).toFixed(1); }
const slC = mk(slS, 'path', { d: sd, fill: 'none', stroke: SC, 'stroke-width': 4 });
const slL = mk(slS, 'line', { x1: 60, y1: SY - SA / 2, x2: 730, y2: SY - SA / 2, stroke: LV, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const slD = [PI / 6, 5 * PI / 6].map(v => mk(slS, 'circle', { cx: SX(v), cy: SY - SA / 2, r: 11, fill: XC, stroke: '#fff', 'stroke-width': 3 }));
$('#srF').innerHTML = K(`${xv} = n\\pi + (-1)^n\\,\\tfrac{\\pi}{6}`);
const ST = [['n = 0', '\\tfrac{\\pi}{6}'], ['n = 1', '\\tfrac{5\\pi}{6}'], ['n = 2', '\\tfrac{13\\pi}{6}'], ['n = -1', '-\\tfrac{7\\pi}{6}']];
$('#srT').innerHTML = ST.map(([a, b], i) => `<div class="tb" id="tb${i}" style="top:${190 + i * 70}px"><div class="a">${a}</div><div class="b">${K(`${xv} = ${b}`)}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: `Is ${K(`${xv} = \\tfrac{13\\pi}{6}`)} a principal solution of ${K(`${sn}\\,${xv} = \\tfrac{1}{2}`)}?`, opts: ['Yes', 'No'], right: 1,
  why: `It solves the equation, but ${K('\\tfrac{13\\pi}{6} > 2\\pi')}: it lives in the second turn.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${sn}\\,${xv} = ${sn}\\,\\alpha \\;\\Rightarrow\\; ${xv} = n\\pi + (-1)^n\\,\\alpha`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Solve ${K(`${sn}\\,${xv} = -\\tfrac{\\sqrt{3}}{2}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${sn}\\tfrac{\\pi}{3} = \\tfrac{\\sqrt{3}}{2};\\ \\ ${sn} < 0 \\text{ below the hub}`)],
  [K(`${sn}\\,${xv} = ${sn}\\left(\\pi + \\tfrac{\\pi}{3}\\right) = ${sn}\\tfrac{4\\pi}{3}`)],
  [K(`${xv} = n\\pi + (-1)^n\\,\\tfrac{4\\pi}{3},\\ \\ n \\in \\mathbb{Z}`)],
  [K(`\\text{principal: } ${xv} = \\tfrac{4\\pi}{3},\\ \\tfrac{5\\pi}{3}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Sine'), wt('W4', 'So'), wt('W5', 'general'), wt('W6', 'Inside')];
const wS = $('#wS'), ECX = 300, ECY = 230, ER = 150, ePt = a => [ECX + ER * Math.cos(rad(a)), ECY - ER * Math.sin(rad(a))];
mk(wS, 'line', { x1: 110, y1: ECY, x2: 500, y2: ECY, stroke: C.ink, 'stroke-width': 2 }); mk(wS, 'line', { x1: ECX, y1: 66, x2: ECX, y2: 400, stroke: C.ink, 'stroke-width': 2 });
const wCirc = mk(wS, 'circle', { cx: ECX, cy: ECY, r: ER, fill: 'none', stroke: C.mute, 'stroke-width': 2 });
const wRef = mk(mk(wS, 'g', {}), 'g', {}); { const [x, y] = ePt(60); mk(wRef, 'line', { x1: ECX, y1: ECY, x2: x, y2: y, stroke: C.dim, 'stroke-width': 3 }); mk(wRef, 'circle', { cx: x, cy: y, r: 9, fill: C.dim }); txt(wRef, x + 14, y - 8, 'π/3', { 'font-size': 20, fill: C.mute, 'font-weight': 600 }); }
const wLv = mk(wS, 'line', { x1: 110, y1: ECY + ER * Math.sin(rad(60)), x2: 500, y2: ECY + ER * Math.sin(rad(60)), stroke: LV, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const wP = [[240, '4π/3', -1], [300, '5π/3', 1]].map(([a, l, s]) => { const [x, y] = ePt(a), g = mk(mk(wS, 'g', {}), 'g', {}); mk(g, 'line', { x1: ECX, y1: ECY, x2: x, y2: y, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'line', { x1: x, y1: ECY, x2: x, y2: y, stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: x, cy: y, r: 10, fill: XC }); txt(g, x + 16 * s, y + 30, l, { 'font-size': 22, fill: XC, 'font-weight': 600, 'text-anchor': s > 0 ? 'start' : 'end' }); return g; });
const wDep = txt(wS, 520, ECY + ER * Math.sin(rad(60)) + 7, 'sin x = -0.866', { 'font-size': 20, fill: SC, 'font-weight': 600 });
const wNote = txt(wS, 392, 500, 'same depth below the hub: two points per turn', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${cs}\\,${xv} = \\tfrac{1}{2} \\;\\Rightarrow\\; ${xv} = n\\pi \\pm \\tfrac{\\pi}{3}`), right: K(`${xv} = 2n\\pi \\pm \\tfrac{\\pi}{3}`) + '&nbsp; turns of 2π for cos' });
const tsv = $('#tS'), TCX = 130, TCY = 140, TR = 92, tPt = a => [TCX + TR * Math.cos(rad(a)), TCY - TR * Math.sin(rad(a))];
mk(tsv, 'line', { x1: 20, y1: TCY, x2: 240, y2: TCY, stroke: C.ink, 'stroke-width': 2 }); mk(tsv, 'circle', { cx: TCX, cy: TCY, r: TR, fill: 'none', stroke: C.mute, 'stroke-width': 2 });
const tG = [[60, C.ok, 'π/3'], [240, C.red, '4π/3']].map(([a, col, l], i) => { const [x, y] = tPt(a), g = mk(mk(tsv, 'g', {}), 'g', {}); mk(g, 'line', { x1: x, y1: y, x2: x, y2: TCY, stroke: CB, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }); mk(g, 'circle', { cx: x, cy: y, r: 10, fill: col }); txt(g, x + (i ? -14 : 14), y + (i ? 26 : -8), l, { 'font-size': 20, fill: col, 'font-weight': 600, 'text-anchor': i ? 'end' : 'start' }); return g; });
const tT1 = txt(tsv, 270, 110, 'n = 1:  cos(4π/3) = -1/2', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
const tT2 = txt(tsv, 270, 150, 'not 1/2, so nπ is wrong', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'JEE ADVANCED'], type: 'Count the solutions in an interval, or add them up' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`2\\,${sn}^2 ${xv} - 3\\,${sn}\\,${xv} + 1 = 0`)}<br>How many solutions in ${K('[\\,0,\\ 4\\pi\\,]')}?`,
  opts: ['4', '5', '6', '8'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [
  [K(`(2\\,${sn}\\,${xv} - 1)(${sn}\\,${xv} - 1) = 0`)],
  [K(`${sn}\\,${xv} = \\tfrac{1}{2}\\ \\ \\text{or}\\ \\ ${sn}\\,${xv} = 1`)],
  [K(`\\tfrac{1}{2}: 2 \\text{ per turn} \\to 4`)],
  [K(`1: 1 \\text{ per turn} \\to 2`)],
  [K(`4 + 2 = 6`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'factorises'), wt('A3', 'half'), wt('A4', 'gives'), wt('A4', 'gives', 1), wt('A4', 'Six')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · trigonometric equations', y0: 96, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${sn}\\,${xv} = 0 \\Rightarrow ${xv} = n\\pi \\qquad ${cs}\\,${xv} = 0 \\Rightarrow ${xv} = (2n+1)\\tfrac{\\pi}{2}`),
    K(`${sn}\\,${xv} = ${sn}\\,\\alpha \\;\\Rightarrow\\; ${xv} = n\\pi + (-1)^n\\,\\alpha`),
    K(`${cs}\\,${xv} = ${cs}\\,\\alpha \\;\\Rightarrow\\; ${xv} = 2n\\pi \\pm \\alpha`),
    K(`${tn}\\,${xv} = ${tn}\\,\\alpha \\;\\Rightarrow\\; ${xv} = n\\pi + \\alpha`),
    `<b>Principal</b>: ${K('0 \\le x < 2\\pi')} &nbsp;· <b>General</b>: every solution, ${K('n \\in \\mathbb{Z}')}`] });
const YQ = [`Find the principal solutions of ${K(`${cs}\\,${xv} = \\tfrac{1}{2}`)}`, `Write the general solution of ${K(`${tn}\\,${xv} = 1`)}`, `How many solutions does ${K(`${sn}\\,${xv} = \\tfrac{3}{2}`)} have?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 37', topic: 'x² + 1 = 0 has no real answer: Need for Complex Numbers', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('G5', 'touches') - 0.3, 1.08, 560, 500], [T0('G6') + 0.1, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  M.vis($('#gh'), t, tMorph + 0.8, tQ - 0.05, { dy: 0, dx: 16, outDur: 0.01 });

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the wheel */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = xOfH(t), vx = WX + WR * Math.cos(rad(a)), vy = WY - WR * Math.sin(rad(a));
    spokes.forEach((s, i) => { const b = rad(a + i * 30); attr(s, 'x2', (WX + (WR - 16) * Math.cos(b)).toFixed(1)); attr(s, 'y2', (WY - (WR - 16) * Math.sin(b)).toFixed(1)); });
    attr(hV, 'cx', vx.toFixed(1)); attr(hV, 'cy', vy.toFixed(1)); attr(hArm, 'x2', vx.toFixed(1)); attr(hArm, 'y2', vy.toFixed(1));
    attr(hHt, 'x1', vx.toFixed(1)); attr(hHt, 'x2', vx.toFixed(1)); attr(hHt, 'y1', WY); attr(hHt, 'y2', vy.toFixed(1));
    M.vis(hLvl, t, wt('H2', 'Half') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.hide(hLvlT, true);
    M.vis(hHt, t, wt('H2', 'radius') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.setT($('#hX'), `x = ${Math.round(a)}°`); M.vis($('#hX'), t, tMorph + 0.5, 1e9, { dy: 10 });
    M.vis($('#hSl'), t, tHk[0] - 0.2, 1e9, { dy: 10 });
    HV.forEach((_, i) => { const el = $('#hc' + i); M.vis(el, t, tHk[i] - 0.05, 1e9, POP); el.style.background = mix(C.ac2, C.soft, M.io((t - tHk[i] - 0.4) / 0.5)); });
    const flash = Math.max(0, ...tHk.map(tt => 1 - Math.abs(t - tt) / 0.35)); attr(hV, 'r', (12 + 5 * flash).toFixed(2));
    M.vis($('#hP'), t, wt('H4', 'forever') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, T0('H2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, T0('H2') + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, wt('H2', 'Aarav'), 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'endless') - 0.1, 1e9, POP);
  }

  /* P: definition */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('P2') + 0.05, { st: 0.05, sp: M.HEAVY });
    PUC.write($('#dfE'), t, wt('P2', 'like'), 0.8);
    M.vis($('#tm0'), t, wt('P3', 'solutions') - 0.1, 1e9, { dy: 16 }); M.vis($('#tm1'), t, T0('P4'), 1e9, { dy: 16 });
    M.vis($('#pl'), t, wt('P2', 'sine') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(pZone, t, wt('P3', 'zero') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(pZT, t, wt('P3', 'principal') - 0.1, 1e9, { dy: 0 });
    pDots.forEach((d, i) => M.vis(d.g, t, d.pr ? wt('P3', 'principal') + i * 0.15 : wt('P4', 'every') + (i - 2) * 0.15, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }));
    M.vis(pNote, t, wt('P4', 'general'), 1e9, { dy: 0 });
  }

  /* G: live graph */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('D1');
    M.vis($('#gg'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const sw = sweepOf(t), k = kOf(t);
    if (sw > 0.001) { let d = ''; const n = Math.max(2, Math.round(300 * sw / (4 * PI))); for (let i = 0; i <= n; i++) { const v = sw * i / n; d += (i ? 'L' : 'M') + GX(v).toFixed(1) + ',' + GYf(Math.sin(v)).toFixed(1); } attr(gCurve, 'd', d); M.hide(gCurve, false); } else M.hide(gCurve, true);
    attr(gTip, 'cx', GX(sw).toFixed(1)); attr(gTip, 'cy', GYf(Math.sin(sw)).toFixed(1)); M.hide(gTip, sw <= 0.001 || sw >= 4 * PI - 1e-6);
    attr(gLvlP, 'transform', `translate(0,${GYf(k).toFixed(1)})`); M.vis(gLvl, t, wt('G1', 'line') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(gTurn, t, wt('G3', 'first') - 0.2, 1e9, { dy: 0, fade: 0.4 }); M.vis(gTurnT, t, wt('G3', 'first') - 0.1, 1e9, { dy: 0 }); M.vis(gTurnT2, t, wt('G3', 'next') - 0.1, 1e9, { dy: 0 });
    const S = sols(k); let cnt = 0;
    gDots.forEach((g, i) => { const xs = S[i]; if (xs == null) { M.hide(g, true); return; }
      const tc = tCross(xs); const on = M.vis(g, t, tc, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      if (t >= tc) cnt++;
      g.parentNode.setAttribute('transform', `translate(${GX(xs).toFixed(1)},${GYf(Math.min(1, k)).toFixed(1)})`); });
    const uniq = k >= 0.9995 && k <= 1.0005 ? Math.min(cnt, 2) : cnt;
    const key = `${k.toFixed(2)}|${uniq}`;
    if (key !== gKey) { gKey = key; M.setT($('#gK'), `k = ${k.toFixed(2)}`); M.setT($('#gN'), String(k > 1.0005 ? 0 : k >= 0.9995 ? 2 : uniq)); M.setT($('#gT'), k > 1.0005 ? '0' : k >= 0.9995 ? '1' : '2'); M.setT(gLvlT, `y = ${k.toFixed(2)}`); }
    M.vis($('#gr'), t, wt('G1', 'line') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gK'), t, wt('G1', 'line') + 0.4, 1e9, { dy: 10 }); M.vis($('#gN'), t, wt('G2', 'Count') - 0.1, 1e9, { dy: 10 }); M.vis($('#gT'), t, wt('G3', 'first'), 1e9, { dy: 10 });
    M.vis($('#gP'), t, wt('G6', 'misses') - 0.1, 1e9, POP);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(dA, t, wt('D2', 'alpha') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(dLv, t, wt('D3', 'height') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(dB, t, wt('D3', 'point'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(dTurn, t, wt('D4', 'turn') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    NS.forEach((_, i) => { const el = $('#dn' + i); M.vis(el, t, tDn[i], 1e9, { dy: 14 }); const ev = i % 2 === 0, hl = M.io((t - wt('D5', ev ? 'Even' : 'Odd') + 0.1) / 0.3) * (1 - M.io((t - T0('D6')) / 0.4)); el.style.background = mix(C.soft, ev ? C.okBg : C.redBg, hl); });
  }

  /* C: cos, tan, zeros */
  const cOn = t >= tC1 - 0.1 && t < tS1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('S1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CR.forEach((_, i) => { const el = $('#cr' + i); M.vis(el, t, tCr[i] - 0.3, 1e9, { dy: 14 }); PUC.write(el.querySelector('.fx'), t, tCr[i] - 0.2, 0.8); M.vis(el.querySelector('.tg'), t, tCr[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
    M.vis($('#cr'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const st = t < T0('C3') - 0.2 ? 0 : t < T0('C4') - 0.2 ? 1 : 2;
    M.vis(cSt[0], t, wt('C2', 'across') - 0.2, T0('C3') - 0.3, { dy: 0, fade: 0.3, outDur: 0.25, ody: 0 });
    M.vis(cSt[1], t, T0('C3') + 0.05, T0('C4') - 0.3, { dy: 0, fade: 0.3, outDur: 0.25, ody: 0 });
    M.vis(cSt[2], t, T0('C4') + 0.05, 1e9, { dy: 0, fade: 0.3 });
    M.setT($('#crL'), CL[st]);
  }

  /* S: principal vs general + pause and think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(slC, t, wt('S1', 'Principal'), 1.0); M.vis(slL, t, wt('S1', 'half') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    PUC.write($('#slF'), t, wt('S1', 'they') - 0.1, 0.8); slD.forEach((d, i) => M.vis(d, t, wt('S1', 'they') + i * 0.5, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
    M.vis($('#slP'), t, wt('S1', 'inside') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#srF'), t, wt('S2', 'covers'), 0.9);
    ST.forEach((_, i) => { const el = $('#tb' + i); M.vis(el, t, wt('S2', 'Put') - 0.3 + i * 0.25, 1e9, { dy: 12 }); if (i === 2) el.style.background = mix(C.soft, '#EDE6FC', M.io((t - wt('S2', 'thirteen') + 0.1) / 0.3)); });
    M.vis($('#th1'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'principal') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'solution') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Find') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'every') - 0.1, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wCirc, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    M.vis(wRef, t, wt('W3', 'pi') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wLv, t, wt('W3', 'negative') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wDep, t, wt('W3', 'negative'), 1e9, { dy: 0 });
    M.vis(wP[0], t, wt('W4', 'four') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(wP[1], t, wt('W6', 'five') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wNote, t, wt('W6', 'principal') - 0.1, 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'right') - 0.1 });
    M.vis(tG[0], t, wt('X2', 'pi') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(tG[1], t, wt('X3', 'Four') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(tT1, t, wt('X3', 'minus') - 0.1, 1e9, { dy: 0 }); M.vis(tT2, t, wt('X3', 'Wrong'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'Advanced')], tType: wt('J1', 'count') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
