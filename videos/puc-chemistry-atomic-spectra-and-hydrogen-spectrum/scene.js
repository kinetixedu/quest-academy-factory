// PUC Chemistry Ep 16: Atomic spectra and the hydrogen spectrum (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electron e- orange, nucleus teal, absorbed photon gold, each spectral line drawn in its own colour;
// series: Lyman violet (UV), Balmer teal (visible), Paschen orange, Brackett gold, Pfund ink (IR); n1 teal, n2 orange in the formula
const PC = C.ac, EC = '#C8461B', GC = '#B7791F';
const SER = { Lyman: C.violet, Balmer: C.ac, Paschen: C.orange, Brackett: GC, Pfund: C.ink2 };
const N1C = C.ac, N2C = EC;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const B = { fill: C.ink, 'font-weight': 600 };
const n1 = `\\textcolor{${N1C}}{n_1}`, n2 = `\\textcolor{${N2C}}{n_2}`;
const RY = 109677, lam = (a, b) => 1e7 / (RY * (1 / a ** 2 - 1 / b ** 2));   // nm
// wavelength (nm) -> colour (standard visible approximation)
const wl2c = w => { let r = 0, g = 0, b = 0;
  if (w < 440) { r = -(w - 440) / 60; b = 1; } else if (w < 490) { g = (w - 440) / 50; b = 1; } else if (w < 510) { g = 1; b = -(w - 510) / 20; } else if (w < 580) { r = (w - 510) / 70; g = 1; } else if (w < 645) { r = 1; g = -(w - 645) / 65; } else r = 1;
  const f = w < 420 ? 0.4 + 0.6 * (w - 380) / 40 : w > 700 ? 0.4 + 0.6 * (750 - w) / 50 : 1;
  return '#' + [r, g, b].map(v => Math.round(255 * Math.pow(Math.max(0, v * f), 0.8)).toString(16).padStart(2, '0')).join(''); };
const BAL = [3, 4, 5, 6].map(n => ({ n, w: lam(2, n), c: wl2c(lam(2, n)) }));   // 656.5, 486.3, 434.2, 410.3 nm
const BALC = ['#E0321E', '#1FA7B8', '#5B4FE0', '#7B2FC0'];   // red, blue green, blue violet, violet (drawn colours)
BAL.forEach((b, i) => { b.c = BALC[i]; });
const rainbow = (p, id, x, y, w, h) => { const d = mk(p, 'defs', {}); const g = mk(d, 'linearGradient', { id, x1: 0, x2: 1, y1: 0, y2: 0 }); for (let k = 0; k <= 20; k++) { const wv = 380 + k * 18.5; mk(g, 'stop', { offset: (k / 20).toFixed(3), 'stop-color': wl2c(wv) }); } return mk(p, 'rect', { x, y, width: w, height: h, rx: 6, fill: `url(#${id})` }); };

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  spark: ['M12 3v4', 'M12 17v4', 'M3 12h4', 'M17 12h4', 'M5.6 5.6l2.8 2.8', 'M15.6 15.6l2.8 2.8', 'M5.6 18.4l2.8-2.8', 'M15.6 8.4l2.8-2.8'],
  lamp: ['M12 2v4', 'M8 6h8l-1 6H9Z', 'M12 12v10', 'M8 22h8'],
  salt: ['M7 8h10l-1 13H8Z', 'M8 4h8v4H8z', 'M10 6h.01', 'M14 6h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tR1 = T0('R1'), tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['flame', 'Salt on a flame', 'FLASHES YELLOW', 'Salt', 'SODIUM'], ['spark', 'Fireworks', 'RED AND GREEN', 'Fireworks', 'OWN COLOURS'], ['lamp', 'Street lamps', 'GLOW ORANGE', 'Street', 'A GLOWING GAS']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}">${el}</div></div>`).join('');
const KIT = [['salt', 'Pinch of salt', wt('H3', 'salt')], ['flame', 'Blue flame', wt('H3', 'blue')], ['flame', 'Bright yellow', wt('H3', 'yellow')]];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');

/* ---------- P: three kinds of spectrum + prism ---------- */
const SPX = w => 10 + (w - 380) / 370 * 652;
const SPR = [['CONTINUOUS · WHITE LIGHT', 'All colours, no gaps', wt('P2', 'White')], ['EMISSION · GLOWING GAS', 'Only a few bright lines', wt('P4', 'sharp')], ['ABSORPTION · LIGHT THROUGH COOL GAS', 'Dark lines on a bright band', wt('P5', 'dark')]];
$('#sps').innerHTML = SPR.map(([k, l], i) => `<div class="spr" id="spr${i}" style="top:${80 + i * 152}px"><div class="tg">${k}</div><div class="lt">${l}</div><svg width="672" height="44" id="sv${i}"></svg></div>`).join('');
{ const s0 = $('#sv0'), s1 = $('#sv1'), s2 = $('#sv2');
  rainbow(s0, 'rb0', 0, 0, 672, 44); mk(s1, 'rect', { x: 0, y: 0, width: 672, height: 44, rx: 6, fill: C.ink }); rainbow(s2, 'rb2', 0, 0, 672, 44);
  BAL.forEach(b => { mk(s1, 'rect', { x: SPX(b.w) - 3, y: 0, width: 6, height: 44, fill: b.c }); mk(s2, 'rect', { x: SPX(b.w) - 3, y: 0, width: 6, height: 44, fill: C.ink }); }); }
const ps = $('#pS');
const src = mk(ps, 'g', {}); mk(src, 'circle', { cx: 80, cy: 170, r: 34, fill: '#FFF4CF', stroke: C.ink, 'stroke-width': 2.5 }); const srcL = txt(src, 80, 232, 'WHITE LIGHT', { 'text-anchor': 'middle', 'font-size': 15, ...B });
const gasG = mk(ps, 'g', {}); mk(gasG, 'rect', { x: 46, y: 140, width: 68, height: 60, rx: 14, fill: '#F2D7F0', stroke: C.ink, 'stroke-width': 2.5 }); txt(gasG, 80, 232, 'GLOWING GAS', { 'text-anchor': 'middle', 'font-size': 15, ...B });
const beam = mk(ps, 'line', { x1: 116, y1: 170, x2: 318, y2: 170, stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round' });
const prism = mk(ps, 'path', { d: 'M360 92 L430 236 L290 236 Z', fill: '#E4F3F3', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
txt(ps, 360, 262, 'PRISM', { 'text-anchor': 'middle', 'font-size': 15, ...B });
const fanC = mk(ps, 'g', {}); for (let k = 0; k < 9; k++) { const w = 400 + k * 42; mk(fanC, 'line', { x1: 392, y1: 176, x2: 740, y2: 96 + k * 15, stroke: wl2c(w), 'stroke-width': 6, 'stroke-linecap': 'round' }); }
const fanL = mk(ps, 'g', {}); BAL.forEach(b => { const y = 96 + (b.w - 400) / 42 * 15; mk(fanL, 'line', { x1: 392, y1: 176, x2: 740, y2: y, stroke: b.c, 'stroke-width': 5, 'stroke-linecap': 'round' }); });
const FP = [['HYDROGEN', BAL.map(b => [b.w, b.c]), 320], ['SODIUM', [[589.0, '#E8B400'], [589.6, '#E8B400']], 410]];
const scrL = txt(ps, 36, 322, 'ON THE SCREEN', { 'font-size': 16, ...B }), scrR = rainbow(ps, 'rbS', 36, 334, 712, 44);
const fps = FP.map(([n, ls, y]) => { const g = mk(ps, 'g', {}); const lb = txt(g, 36, y + 2, n, { 'font-size': 16, ...B }); g._lab = lb; mk(g, 'rect', { x: 36, y: y + 14, width: 712, height: 44, rx: 6, fill: C.ink }); ls.forEach(([w, c]) => mk(g, 'rect', { x: 36 + (w - 380) / 370 * 712 - 2, y: y + 14, width: 4, height: 44, fill: c })); return g; });
const fpTag = txt(ps, 748, 322, 'EACH ELEMENT · ITS OWN LINES', { 'text-anchor': 'end', 'font-size': 15, fill: C.ac, 'font-weight': 600 });

/* ---------- S: energy levels + visible lines ---------- */
const b = $('#bS'), LYV = { 1: 500, 2: 330, 3: 240, 4: 185, 5: 150, 6: 128 }, LY = n => n === Infinity ? 96 : LYV[n];
const lev = mk(b, 'g', {});
[1, 2, 3, 4, 5, 6].forEach(n => mk(lev, 'line', { x1: 150, y1: LY(n), x2: 640, y2: LY(n), stroke: C.ink, 'stroke-width': n < 4 ? 3 : 1.5 }));
mk(lev, 'line', { x1: 150, y1: LY(Infinity), x2: 640, y2: LY(Infinity), stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
[1, 2, 3, 4, 5, 6].forEach(n => txt(lev, 140, LY(n) + 6, `n = ${n}`, { 'text-anchor': 'end', 'font-size': n > 4 ? 14 : 16, ...B }));
txt(lev, 140, LY(Infinity) + 6, 'n = ∞', { 'text-anchor': 'end', 'font-size': 14, fill: C.mute });
const arr = (x, nf, nt, col) => { const g = mk(b, 'g', {}); const y1 = LY(nf), y2 = LY(nt); const p = mk(g, 'path', { d: `M${x} ${y1} V${y2 - 12}`, stroke: col, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(g, 'path', { d: `M${x - 8} ${y2 - 14} L${x} ${y2} L${x + 8} ${y2 - 14} Z`, fill: col }); return { g, p, h }; };
const AR = { Balmer: BAL.map((bl, i) => arr(300 + i * 28, bl.n, 2, bl.c)), Lyman: [2, 3, 4, 5, 6].map((n, i) => arr(186 + i * 20, n, 1, SER.Lyman)), Paschen: [4, 5, 6].map((n, i) => arr(452 + i * 18, n, 3, SER.Paschen)), Brackett: [5, 6].map((n, i) => arr(530 + i * 16, n, 4, SER.Brackett)), Pfund: [arr(590, 6, 5, SER.Pfund)] };
const serL = { Lyman: txt(b, 226, LY(1) + 32, 'LYMAN · UV', { 'text-anchor': 'middle', 'font-size': 15, fill: SER.Lyman, 'font-weight': 700 }), Balmer: txt(b, 342, LY(2) + 28, 'BALMER · VISIBLE', { 'text-anchor': 'middle', 'font-size': 15, fill: SER.Balmer, 'font-weight': 700 }), Paschen: txt(b, 470, LY(3) + 26, 'PASCHEN · IR', { 'text-anchor': 'middle', 'font-size': 14, fill: SER.Paschen, 'font-weight': 700 }), Brackett: txt(b, 538, LY(4) + 24, 'BRACKETT', { 'text-anchor': 'middle', 'font-size': 13, fill: SER.Brackett, 'font-weight': 700 }), Pfund: txt(b, 602, LY(5) + 22, 'PFUND', { 'font-size': 13, fill: SER.Pfund, 'font-weight': 700 }) };
const eDot = mk(b, 'circle', { r: 10, fill: EC });
const wavy = (x1, y1, x2, y2, amp = 8, wl = 24) => { const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L; let d = `M${x1} ${y1}`; for (let s = 2; s <= L; s += 2) { const a = amp * Math.sin(s / wl * 2 * Math.PI) * Math.min(1, (L - s) / 24); d += ` L${(x1 + ux * s - uy * a).toFixed(1)} ${(y1 + uy * s + ux * a).toFixed(1)}`; } return d; };
const phIn = mk(b, 'path', { d: wavy(40, 470, 290, LY(1) - 6), fill: 'none', stroke: GC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const phOut = mk(b, 'path', { d: wavy(310, (LY(3) + LY(2)) / 2, 740, (LY(3) + LY(2)) / 2 + 120), fill: 'none', stroke: BAL[0].c, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const tUp = wt('S4', 'jumps') - 0.3, tDn = wt('S5', 'falls') - 0.1;
const tBal = [wt('S6', 'Three'), wt('S6', 'Four'), wt('S6', 'Five'), wt('S6', 'Six')];
// right card: visible strip + all series on a log scale
const sp = $('#spS'), VX = w => 36 + (w - 380) / 370 * 712;
const vis = mk(sp, 'rect', { x: 36, y: 84, width: 712, height: 90, rx: 8, fill: C.ink });
const vTick = mk(sp, 'g', {}); [400, 500, 600, 700].forEach(w => { mk(vTick, 'line', { x1: VX(w), y1: 176, x2: VX(w), y2: 186, stroke: C.mute, 'stroke-width': 2 }); txt(vTick, VX(w), 206, w + ' nm', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); });
const vLines = BAL.map(bl => mk(sp, 'rect', { x: VX(bl.w) - 3.5, y: 84, width: 7, height: 90, fill: bl.c }));
const vLab = BAL.map((bl, i) => { const g = mk(sp, 'g', {}); const x = VX(bl.w); const ly = i === 3 ? 254 : 216; mk(g, 'rect', { x: x - 34, y: ly, width: 68, height: 32, rx: 8, fill: bl.c }); txt(g, x, ly + 22, String(Math.round(bl.w)), { 'text-anchor': 'middle', 'font-size': 17, fill: '#fff', 'font-weight': 700 }); return g; });
const LX = w => 36 + Math.log10(w / 80) / 2 * 712;
const logG = mk(sp, 'g', {}); txt(logG, 36, 312, 'ALL SERIES · nm, LOG SCALE', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
mk(logG, 'rect', { x: LX(80), y: 346, width: LX(380) - LX(80), height: 44, fill: '#E6DDFB' }); mk(logG, 'rect', { x: LX(750), y: 346, width: LX(8000) - LX(750), height: 44, fill: '#FBE6D5' });
rainbow(logG, 'rbL', LX(380), 346, LX(750) - LX(380), 44);
[['UV', 160], ['VISIBLE', 530], ['INFRARED', 2600]].forEach(([s, w]) => txt(logG, LX(w), 338, s, { 'text-anchor': 'middle', 'font-size': 14, ...B }));
[100, 1000].forEach(w => txt(logG, LX(w), 410, String(w), { 'text-anchor': 'middle', 'font-size': 13, fill: C.mute }));
const SRS = [['Lyman', 1, 0], ['Balmer', 2, 0], ['Paschen', 3, 0], ['Brackett', 4, 1], ['Pfund', 5, 2]];
const serG = SRS.map(([nm, a, row]) => { const g = mk(sp, 'g', {}); const lo = lam(a, Infinity), hi = lam(a, a + 1), y = 424 + row * 38;
  for (let n = a + 1; n <= a + 8; n++) mk(g, 'line', { x1: LX(lam(a, n)), y1: 346, x2: LX(lam(a, n)), y2: 390, stroke: SER[nm], 'stroke-width': 2.5 });
  mk(g, 'rect', { x: LX(lo), y, width: LX(hi) - LX(lo), height: 26, rx: 6, fill: SER[nm] }); const tl = txt(g, LX(lo) + 8, y + 19, nm.toUpperCase(), { 'font-size': 14, fill: '#fff', 'font-weight': 700 });
  if (LX(hi) - LX(lo) < 110) { attr(tl, 'fill', SER[nm]); attr(tl, 'x', LX(hi) + 8); }
  return g; });
const CMP = [['Lyman', SER.Lyman, [['FALLS END ON', 'Orbit 1, n₁ = 1'], ['LIGHT', 'Ultraviolet, invisible'], ['FIRST LINE', '2 → 1, at 121.6 nm'], ['n₂ CAN BE', '2, 3, 4 ...']]], ['Balmer', SER.Balmer, [['FALLS END ON', 'Orbit 2, n₁ = 2'], ['LIGHT', 'Visible, four bright lines'], ['FIRST LINE', '3 → 2, at 656.5 nm, red'], ['n₂ CAN BE', '3, 4, 5 ...']]]];
$('#cmps').innerHTML = CMP.map(([h, col, rows], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ch" style="color:${col}">${h}</div>${rows.map(([k, v], j) => `<div class="cr2" id="cr${i}_${j}" style="top:${108 + j * 86}px"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`).join('');
const tCm = [wt('B1', 'Lyman'), wt('B1', 'Balmer')];
const th1 = PUC.think($('#th1'), { q: 'Which carries more energy: any Lyman photon, or any Balmer photon?', opts: ['Any Lyman photon', 'Any Balmer photon'], right: 0, why: 'The smallest Lyman gap (2 → 1) is bigger than even the largest Balmer gap (∞ → 2).' });

/* ---------- D: Rydberg formula + series table ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`\\bar{\\nu} = \\frac{1}{\\lambda} \\quad (\\text{waves per cm})`)],
  [K(`\\bar{\\nu} = 109\\,677 \\left(\\frac{1}{${n1}^2} - \\frac{1}{${n2}^2}\\right) \\text{cm}^{-1}`)],
  [K(`${n1} = \\text{lands}, \\;\\; ${n2} = \\text{starts}, \\;\\; ${n2} > ${n1}`)],
  [K(`${n1} = 1 \\text{ Lyman}, \\; 2 \\text{ Balmer}, \\; 3 \\text{ Paschen}`)]], { label: 'THE RYDBERG FORMULA', y0: 110, dy: 112 });
const tDs = [wt('D2', 'Wavenumber'), wt('D3', 'Nu'), T0('D4') + 0.6, wt('D5', 'Set')];
const SCI = [['1885 · VISIBLE LINES', 'Johann Balmer', 'BALMER SERIES', wt('D2', 'Balmer')], ['EVERY SERIES', 'Johannes Rydberg', 'ONE FORMULA', wt('D3', 'Rydberg')]];
$('#scis').innerHTML = SCI.map(([y, n, w], i) => `<div class="sci" id="sc${i}" style="top:${36 + i * 104}px;height:92px"><div class="sy" style="top:14px">${y}</div><div class="sn" style="top:38px;font-size:30px">${n}</div><div class="sw" style="top:48px">${w}</div></div>`).join('');
const TB = [['Lyman', '1', '2, 3, 4 ...', 'Ultraviolet'], ['Balmer', '2', '3, 4, 5 ...', 'Visible'], ['Paschen', '3', '4, 5, 6 ...', 'Infrared'], ['Brackett', '4', '5, 6, 7 ...', 'Infrared'], ['Pfund', '5', '6, 7, 8 ...', 'Infrared']];
$('#tbs').innerHTML = TB.map(([s, a, c, r], i) => `<div class="trow" id="tr${i}" style="top:${292 + i * 51}px"><span style="left:18px;color:${SER[s]}">${s}</span><span class="m" style="left:220px;color:${N1C}">${a}</span><span class="m" style="left:300px;color:${N2C}">${c}</span><span style="left:520px">${r}</span></div>`).join('');
const tTr = [0, 1, 2, 3, 4].map(i => wt('D3', 'every') + i * 0.25), tHi = [wt('D5', 'one'), wt('D5', 'two'), wt('D5', 'Three')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\bar{\\nu} = 109\\,677 \\left(\\frac{1}{${n1}^2} - \\frac{1}{${n2}^2}\\right) \\text{cm}^{-1}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${n1} = 2, \\; ${n2} = 3: \\;\\; \\frac{1}{4} - \\frac{1}{9} = \\frac{5}{36}`)], [K(`\\bar{\\nu} = 109\\,677 \\times \\frac{5}{36} = 15\\,233\\,\\text{cm}^{-1}`)],
  [K(`\\lambda = \\frac{1}{\\bar{\\nu}} = 6.565 \\times 10^{-5}\\,\\text{cm}`)], [K(`\\lambda = \\textcolor{#E0321E}{656.5\\,\\text{nm}} \\;\\; \\text{(red)}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const w2 = $('#wS2'), WLY = n => 470 - (1 - 4 / (n * n)) * 0 - (n === 2 ? 0 : 260);
mk(w2, 'line', { x1: 120, y1: 440, x2: 420, y2: 440, stroke: C.ink, 'stroke-width': 3 }); mk(w2, 'line', { x1: 120, y1: 190, x2: 420, y2: 190, stroke: C.ink, 'stroke-width': 3 });
txt(w2, 110, 446, 'n = 2', { 'text-anchor': 'end', 'font-size': 16, fill: N1C, 'font-weight': 700 }); txt(w2, 110, 196, 'n = 3', { 'text-anchor': 'end', 'font-size': 16, fill: N2C, 'font-weight': 700 });
const wAr = mk(w2, 'path', { d: 'M270 190 V426', stroke: BAL[0].c, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }), wAh = mk(w2, 'path', { d: 'M261 424 L270 440 L279 424 Z', fill: BAL[0].c });
const wE = mk(w2, 'circle', { cx: 270, r: 10, fill: EC });
const wPh = mk(w2, 'path', { d: wavy(290, 315, 520, 315), fill: 'none', stroke: BAL[0].c, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const wStrip = mk(w2, 'g', {}); mk(wStrip, 'rect', { x: 540, y: 120, width: 60, height: 360, rx: 8, fill: C.ink });
const wLine = mk(w2, 'rect', { x: 540, y: 300, width: 60, height: 7, fill: BAL[0].c }); const wLl = txt(w2, 612, 310, '656.5 nm', { 'font-size': 18, fill: BAL[0].c, 'font-weight': 700 });
const avD = PUC.avatar($('#wr'), { x: 36, y: 468, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my yellow flame is electrons falling!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${n1} = 3,\\; ${n2} = 2 \\Rightarrow \\bar{\\nu} < 0`)}`, right: `${K(`${n1}`)} = the lower orbit where it lands, ${K(`${n2}`)} = where it starts` });
const tsv = $('#tS'), tl = mk(tsv, 'g', {});
mk(tl, 'line', { x1: 160, y1: 70, x2: 400, y2: 70, stroke: C.ink, 'stroke-width': 3 }); mk(tl, 'line', { x1: 160, y1: 200, x2: 400, y2: 200, stroke: C.ink, 'stroke-width': 3 });
mk(tl, 'path', { d: 'M280 70 V186', stroke: BAL[0].c, 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(tl, 'path', { d: 'M271 184 L280 200 L289 184 Z', fill: BAL[0].c });
txt(tl, 150, 76, 'n = 3 · n₂ · STARTS', { 'text-anchor': 'end', 'font-size': 15, fill: N2C, 'font-weight': 700 }); txt(tl, 150, 206, 'n = 2 · n₁ · LANDS', { 'text-anchor': 'end', 'font-size': 15, fill: N1C, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals on the wavelength of a line · which series lies in which region' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `What is the shortest wavelength in the Lyman series of hydrogen?<br><span style="font:500 24px 'IBM Plex Mono';color:var(--mute)">Given: R = 109 677 cm⁻¹</span>`, qW: 780,
  opts: ['121.6 nm', '656.5 nm', '91.2 nm', '364.7 nm'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`\\text{shortest } \\lambda: \\; ${n2} = \\infty, \\; ${n1} = 1`)], [K(`\\bar{\\nu} = 109\\,677\\,(1 - 0)\\,\\text{cm}^{-1}`)], [K(`\\lambda = \\frac{1}{109\\,677}\\,\\text{cm}`)], [K(`= \\textcolor{${C.ok}}{91.2\\,\\text{nm}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'So'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 520, title: 'Recap · atomic spectra and the hydrogen spectrum', y0: 98, dy: 86, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\bar{\\nu} = \\frac{1}{\\lambda} = 109\\,677 \\left(\\frac{1}{${n1}^2} - \\frac{1}{${n2}^2}\\right) \\text{cm}^{-1}`), '<b>Continuous</b>: all colours · <b>line (emission)</b>: bright lines · <b>absorption</b>: dark lines', `<b style="color:${SER.Lyman}">Lyman</b> n₁ = 1 UV · <b class="n">Balmer</b> n₁ = 2 visible · Paschen 3, Brackett 4, Pfund 5 IR`, '<b>Balmer lines</b>: about 656 (red), 486, 434, 410 nm', '<b class="e">Each line</b>: one electron falling from n₂ to n₁, with n₂ > n₁'] });
const YQ = ['How is a line spectrum different from a continuous spectrum?', 'Which hydrogen series is visible, and on which orbit do its falls end?', 'Why must n₂ always be bigger than n₁?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 17', topic: 'Wave or packets? Electromagnetic Radiation and Planck\'s Quantum Theory', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S6', 'Three') - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  { const d = $('#sF .next'), nt = d && d.querySelector('.nt'); if (nt) { nt.style.flex = 'none'; const over = d.scrollWidth - d.clientWidth + 8; if (over > 0) nt.style.fontSize = Math.floor(34 * (nt.offsetWidth - over) / nt.offsetWidth) + 'px'; } }
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const showAr = (a, t, t0) => { const u = M.io((t - t0) / 0.45); M.drawU(a.p, u); fade(a.h, t, t0 + 0.35, 1e9, 0.15); M.hide(a.g, u <= 0); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'signature') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'atoms') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((k, i) => { const el = $('#wq' + i); M.vis(el, t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, i === 2 ? mix(C.soft, '#FBE9A6', M.io((t - k[2]) / 0.3)) : C.soft); });
    M.vis($('#hTz'), t, wt('H5', 'barcode') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    SPR.forEach((s, i) => { const el = $('#spr' + i); M.vis(el, t, s[2] - 0.15, 1e9, { dy: 16 }); const nx2 = i < 2 ? SPR[i + 1][2] : T0('U1'); setBg(el, mix(C.soft, C.ac2, M.io((t - s[2]) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const gas = M.io((t - wt('P3', 'heat')) / 0.3);
    fade(src, t, tP1 + 0.4, wt('P3', 'heat')); fade(gasG, t, wt('P3', 'heat'));
    M.draw(beam, t, wt('P2', 'prism') - 0.3, 0.4); fade(prism, t, wt('P2', 'prism') - 0.4);
    fade(fanC, t, wt('P2', 'spreads') - 0.1, wt('P3', 'heat')); fade(fanL, t, wt('P3', 'prism') - 0.1, T0('U1') - 0.2);
    attr(beam, 'stroke', mix(C.ink2, '#C04FB8', gas));
    fps.forEach((g, i) => fade(g, t, i ? wt('U1', 'fingerprint') + 0.3 : wt('P3', 'prism') - 0.1)); fade(fpTag, t, wt('U1', 'fingerprint'));
    fade(scrR, t, wt('P2', 'spreads'), wt('P3', 'prism')); fade(scrL, t, wt('P2', 'spreads'), T0('U1')); fade(fps[0]._lab, t, T0('U1'));
    M.vis($('#fpC'), t, wt('U1', 'Rubidium') - 0.1, 1e9, POP);
    M.setT($('#pwL'), t < T0('U1') ? 'MOLECULE BENCH · PRISM' : 'FINGERPRINTS · VISIBLE LINES');
    // fan / fingerprints share space: fan above, fingerprints below
  }

  /* S + R + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const zB = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, zB, { dy: 36, ...o });
    { const sh = M.spring(t - wt('S2', 'prism') + 0.3, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#sp'), t, wt('S2', 'prism') + 0.05, zB, { dx: 60, dy: 0, ...o });
    fade(lev, t, tS1 + 0.3);
    // electron: n=1 -> 3 (photon in), 3 -> 2 (red photon out)
    const up = M.io((t - tUp - 0.5) / 0.45), dn = M.io((t - tDn) / 0.45);
    const ey = t < tDn ? M.lerp(LY(1), LY(3), up) : M.lerp(LY(3), LY(2), dn);
    attr(eDot, 'cx', 300); attr(eDot, 'cy', ey.toFixed(1)); fade(eDot, t, tS1 + 0.5, tBal[1]);
    M.drawU(phIn, M.io((t - tUp) / 0.5)); phIn.style.opacity = 1 - M.io((t - tUp - 1) / 0.4);
    M.drawU(phOut, M.io((t - tDn - 0.1) / 0.5)); phOut.style.opacity = 1 - M.io((t - tDn - 1.6) / 0.4);
    AR.Balmer.forEach((a, i) => showAr(a, t, i ? tBal[i] : tDn));
    AR.Lyman.forEach((a, i) => showAr(a, t, wt('R1', 'one') + i * 0.15)); AR.Paschen.forEach((a, i) => showAr(a, t, wt('R2', 'three') + i * 0.15));
    AR.Brackett.forEach((a, i) => showAr(a, t, wt('R3', 'Brackett') + i * 0.15)); AR.Pfund.forEach(a => showAr(a, t, wt('R3', 'Pfund')));
    fade(serL.Balmer, t, wt('S6', 'Balmer') - 0.1); fade(serL.Lyman, t, wt('R1', 'Lyman') - 0.1); fade(serL.Paschen, t, wt('R2', 'Paschen') - 0.1); fade(serL.Brackett, t, wt('R3', 'Brackett')); fade(serL.Pfund, t, wt('R3', 'Pfund'));
    const TAG = [[tS1 + 0.3, 'NOT TO SCALE'], [tUp, 'TAKES IN ENERGY · JUMPS UP'], [tDn, 'FALLS · GIVES ONE PHOTON'], [wt('S6', 'Balmer'), 'BALMER · ENDS ON n = 2'], [wt('R1', 'Lyman'), 'LYMAN · ENDS ON n = 1'], [wt('R2', 'Paschen'), 'PASCHEN · ENDS ON n = 3'], [wt('R3', 'Pfund'), 'BRACKETT 4 · PFUND 5']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0], 1e9, POP);
    fade(vis, t, wt('S2', 'prism') + 0.3); fade(vTick, t, wt('S2', 'prism') + 0.5);
    const tLn = [wt('S2', 'Red'), wt('S2', 'green'), wt('S2', 'violet'), wt('S2', 'violet', 1)], tLb = [wt('S3', 'six'), wt('S3', 'eighty'), wt('S3', 'thirty'), wt('S3', 'ten')];
    vLines.forEach((l, i) => { fade(l, t, tLn[i] - 0.1, 1e9, 0.15); const hi = M.io((t - tBal[i] + 0.1) / 0.2) * (1 - M.io((t - (i < 3 ? tBal[i + 1] : wt('S6', 'All')) + 0.1) / 0.2)); attr(l, 'y', (84 - 10 * hi).toFixed(1)); attr(l, 'height', (90 + 20 * hi).toFixed(1)); });
    vLab.forEach((g, i) => fade(g, t, tLb[i] - 0.1));
    fade(logG, t, wt('R1', 'ultraviolet') - 0.3);
    serG.forEach((g, i) => fade(g, t, [wt('R1', 'Lyman'), wt('R1', 'Lyman') + 0.3, wt('R2', 'Paschen'), wt('R3', 'Brackett'), wt('R3', 'Pfund')][i] - 0.1));
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B2'), { dy: 36, ...o });
    CMP.forEach((c, i) => { M.vis($('#cm' + i), t, tCm[i] - 0.15, 1e9, { dy: 16 }); c[2].forEach((_, j) => M.vis($(`#cr${i}_${j}`), t, tCm[i] + 0.15 + j * 0.3, 1e9, { dx: -12, dy: 0 })); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Lyman') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'smallest') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, wt('D2', 'Balmer') - 0.3, out, { dx: 60, dy: 0, ...o });
    SCI.forEach((s, i) => M.vis($('#sc' + i), t, s[3] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#dr .lbl'), t, tTr[0] - 0.4, 1e9, { dy: 8 });
    TB.forEach((_, i) => { const el = $('#tr' + i); M.vis(el, t, tTr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const k = [1, 0, 2][i] ?? -1; const on = k < 0 ? 0 : M.io((t - tHi[k]) / 0.25) * (k < 2 ? 1 - M.io((t - tHi[k + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Every') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'falling') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'orbits') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const f = M.io((t - wt('W2', 'fall') + 0.1) / 0.8); attr(wE, 'cy', M.lerp(190, 440, f).toFixed(1));
    M.drawU(wAr, f); fade(wAh, t, wt('W2', 'fall') + 0.6, 1e9, 0.15);
    M.drawU(wPh, M.io((t - wt('W2', 'fall') - 0.4) / 0.5));
    fade(wStrip, t, T0('W2') + 0.3); fade(wLine, t, T0('W6') - 0.1); fade(wLl, t, T0('W6'));
    avD(t, wt('W6', 'Red') + 0.2, 1e9);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'higher') - 0.1, tStrike: wt('X2', 'negative') - 0.1, tRight: T0('X3') - 0.05 });
    fade(tl, t, wt('X3', 'lower') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
