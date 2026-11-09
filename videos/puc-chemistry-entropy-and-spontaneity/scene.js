// PUC Chemistry Ep 56: Entropy and spontaneity (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: S / ΔS gold, increase green, decrease red, heat orange, system blue, surroundings violet, molecules teal
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tG = s => `\\textcolor{${GC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`;
const dS = (sub, col) => sub ? `${tG('\\Delta S')}_{\\textcolor{${col}}{\\text{${sub}}}}` : tG('\\Delta S');
const SYS = dS('sys', BC), SUR = dS('surr', OC), TOT = dS('total', GC);
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const tri = v => { const f = v - Math.floor(v); return f < 0.5 ? f * 2 : 2 - f * 2; };

Object.assign(M.IC, {
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  shuffle: ['M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22', 'm18 2 4 4-4 4', 'M2 6h1.9c1.5 0 2.9.9 3.6 2.2', 'M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8', 'm18 14 4 4-4 4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tM1 = T0('M1'), tD1 = T0('D1'), tL1 = T0('L1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['home', 'Tidy room', 'GETS MESSY', 'tidy', 'ONE WAY', RD], ['drop', 'Perfume drop', 'FILLS THE ROOM', 'perfume', 'ONE WAY', RD], ['snow', 'Ice, warm day', 'MELTS', 'ice', 'ONE WAY', RD]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Monday: a tidy desk', 'Monday', 'H3'], ['Friday: a mess. It never tidies itself', 'Friday', 'H3']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('book', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: spontaneous ---------- */
const QR = [['Happens on its own: spontaneous', 'ON ITS OWN', 'P1', 'spontaneous', NC], ['Not always fast: iron rusts slowly', 'SLOW', 'P2', 'rusts', GC], ['Ball rolls downhill: heat out', 'HEAT OUT', 'P3', 'ball', OK], ['Ice melts: heat in, still on its own', 'HEAT IN', 'P4', 'ice', RD]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const nail = mk(ps, 'g', {}); mk(nail, 'rect', { x: 80, y: 120, width: 110, height: 22, rx: 6, fill: '#8A94A3' }); mk(nail, 'path', { d: 'M115 142 H155 V360 L135 400 L115 360 Z', fill: '#8A94A3' });
const rust = mk(ps, 'g', {}); [[120, 180, 14], [148, 230, 12], [126, 290, 16], [146, 340, 10], [130, 380, 8], [100, 128, 9], [170, 132, 8]].forEach(([x, y, r]) => mk(rust, 'circle', { cx: x, cy: y, r, fill: '#B5532A' }));
const nT = txt(ps, 135, 450, 'RUSTS · SLOWLY', { 'text-anchor': 'middle', 'font-size': 18, fill: GC, 'font-weight': 600 });
const slope = mk(ps, 'path', { d: 'M270 170 L500 400', stroke: C.ink2, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const ball = dot(ps, 20, NC);
const [bA, bAh] = varrow(ps, 470, 300, 220, OK); const bT = txt(ps, 385, 450, 'HEAT OUT', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 });
const ice = mk(ps, 'rect', { x: 590, width: 110, rx: 10, fill: '#CFE8F7', stroke: '#7FB8DA', 'stroke-width': 3 });
const pud = mk(ps, 'ellipse', { cx: 645, cy: 400, rx: 0, ry: 0, fill: '#CFE8F7' });
const iA = [varrow(ps, 560, 220, 290, RD), varrow(ps, 730, 220, 290, RD)]; const iT = txt(ps, 645, 450, 'HEAT IN', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });

/* ---------- S: two flasks and a tap ---------- */
const b = $('#bS'), FL = [230, 554], FY = 230, FR = 128;
FL.forEach(x => mk(b, 'circle', { cx: x, cy: FY, r: FR, fill: '#F4FAF9', stroke: C.ink2, 'stroke-width': 4 }));
mk(b, 'rect', { x: 352, y: FY - 14, width: 80, height: 28, fill: '#F4FAF9' }); [FY - 14, FY + 14].forEach(y => mk(b, 'line', { x1: 352, y1: y, x2: 432, y2: y, stroke: C.ink2, 'stroke-width': 4 }));
const tap = mk(b, 'rect', { x: 386, y: FY - 26, width: 12, height: 52, rx: 4, fill: RD });
const tapH = mk(b, 'rect', { x: 372, y: FY - 44, width: 40, height: 12, rx: 4, fill: C.ink2 });
const NMOL = 16;
const mols = Array.from({ length: NMOL }, (_, i) => { const a = rnd(i, 1) * 6.283, r = 20 + rnd(i, 2) * 78; const hL = [FL[0] + r * Math.cos(a), FY + r * Math.sin(a)]; const side = i % 2; const a2 = rnd(i, 3) * 6.283, r2 = 20 + rnd(i, 4) * 78; const hF = side ? [FL[1] + r2 * Math.cos(a2), FY + r2 * Math.sin(a2)] : [FL[0] + r2 * Math.cos(a2), FY + r2 * Math.sin(a2)]; return { e: dot(b, 11, NC), hL, hF, side, ph: rnd(i, 5) * 6.283, f: 0.7 + rnd(i, 6) * 0.8, d: rnd(i, 7) * 1.8 }; });
const cntL = txt(b, FL[0], 410, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 }), cntR = txt(b, FL[1], 410, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), WAYS = [1, 4, 6, 4, 1], EB = 400, EK = 44;
const eHd = txt(es, 392, 96, 'MOLECULES ON THE LEFT | RIGHT', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const eBars = WAYS.map((w, i) => { const x = 132 + i * 130, g = mk(es, 'g', {}), bad = i === 0 || i === 4; const r = mk(g, 'rect', { x: x - 44, y: EB, width: 88, height: 0, rx: 8, fill: bad ? RDT : OKT, stroke: bad ? RD : OK, 'stroke-width': 3 }); const v = txt(g, x, EB - w * EK - 14, String(w), { 'text-anchor': 'middle', 'font-size': 28, fill: bad ? RD : OK, 'font-weight': 600 }); txt(g, x, EB + 34, `${4 - i} | ${i}`, { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }); return { g, r, v, w }; });
mk(es, 'line', { x1: 60, y1: EB, x2: 724, y2: EB, stroke: C.ink2, 'stroke-width': 3 });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Just like my desk. Never tidies itself!' });

/* ---------- M: entropy + states ---------- */
$('#hcI').innerHTML = M.icon('shuffle', 26, '#fff', 2.4);
const ms = $('#mS');
const room = (x, lab, sub, col, messy) => { const g = mk(ms, 'g', {}); mk(g, 'rect', { x, y: 290, width: 330, height: 170, rx: 14, fill: C.soft }); for (let i = 0; i < 12; i++) { const gx = x + 40 + (i % 6) * 46, gy = 320 + Math.floor(i / 6) * 70; const rx = messy ? x + 30 + rnd(i, 9) * 260 : gx, ry = messy ? 312 + rnd(i, 10) * 110 : gy; mk(g, 'rect', { x: rx, y: ry, width: 34, height: 24, rx: 4, fill: [NC, GC, OC, BC][i % 4], transform: messy ? `rotate(${(rnd(i, 11) * 80 - 40).toFixed(0)} ${rx + 17} ${ry + 12})` : '' }); } txt(g, x + 165, 496, lab, { 'text-anchor': 'middle', 'font-size': 19, fill: col, 'font-weight': 600 }); txt(g, x + 165, 524, sub, { 'text-anchor': 'middle', 'font-size': 17, fill: col, 'font-weight': 600 }); return g; };
const rT = room(36, 'TIDY · FEW WAYS', 'LOW ENTROPY', RD, false), rM = room(418, 'MESSY · MANY WAYS', 'HIGH ENTROPY', OK, true);
const hs = $('#hS'), BX = [40, 282, 524], BW = 220, BY = 84, BH = 290;
BX.forEach(x => mk(hs, 'rect', { x, y: BY, width: BW, height: BH, rx: 14, fill: C.soft }));
const stG = BX.map(() => mk(hs, 'g', {}));
const solid = Array.from({ length: 16 }, (_, i) => ({ e: dot(stG[0], 15, NC), x: BX[0] + 50 + (i % 4) * 40, y: BY + 140 + Math.floor(i / 4) * 40 }));
const liq = Array.from({ length: 14 }, (_, i) => ({ e: dot(stG[1], 15, NC), x0: rnd(i, 12), y: BY + 160 + (i % 4) * 34 + rnd(i, 13) * 8, v: 0.05 + rnd(i, 14) * 0.08 }));
const gas = Array.from({ length: 8 }, (_, i) => ({ e: dot(stG[2], 15, NC), a: rnd(i, 15), b: rnd(i, 16), vx: 0.35 + rnd(i, 17) * 0.4, vy: 0.3 + rnd(i, 18) * 0.4 }));
const stL = [['SOLID', 'LOW S', RD], ['LIQUID', 'MORE S', GC], ['GAS', 'HIGHEST S', OK]].map(([a, c, col], i) => { const g = mk(hs, 'g', {}); txt(g, BX[i] + BW / 2, BY + BH + 36, a, { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 }); txt(g, BX[i] + BW / 2, BY + BH + 64, c, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); return g; });
$('#mOrd').innerHTML = K(`${tG('S')}_{\\text{solid}} < ${tG('S')}_{\\text{liquid}} < ${tG('S')}_{\\text{gas}}`);

/* ---------- D: ΔS = q_rev / T + library vs street ---------- */
const MS = [['Add a little heat q, slowly (reversibly)', 'D2'], ['Divide by T, the temperature in kelvin', 'D3'], ['Cold things feel the same heat more', 'D4']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${96 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25);
$('#mt').insertAdjacentHTML('beforeend', '<div class="fx fxc" id="dF" style="top:370px;font-size:56px"></div>');
$('#dF').innerHTML = K(`${tG('\\Delta S')} = \\dfrac{${tX('q_{\\text{rev}}')}}{T}`);
$('#dP').innerHTML = 'Unit: J K⁻¹ mol⁻¹';
const ds = $('#dS');
const sysB = mk(ds, 'rect', { x: 300, y: 84, width: 184, height: 150, rx: 14, fill: '#EAF1FE', stroke: BC, 'stroke-width': 3 }); const sysT = txt(ds, 392, 220, 'SYSTEM', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
const drips = [0, 1, 2, 3].map(() => dot(ds, 9, XC)); const qT = txt(ds, 150, 140, 'q, TINY STEPS', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 });
const thm = mk(ds, 'g', {}); mk(thm, 'rect', { x: 600, y: 90, width: 22, height: 120, rx: 11, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(thm, 'circle', { cx: 611, cy: 214, r: 18, fill: RD }); mk(thm, 'rect', { x: 606, y: 140, width: 10, height: 74, fill: RD }); txt(thm, 650, 160, 'T (K)', { 'font-size': 22, fill: HC, 'font-weight': 600 });
const pan = (x, lab, col) => { const g = mk(ds, 'g', {}); mk(g, 'rect', { x, y: 270, width: 330, height: 200, rx: 14, fill: C.soft }); txt(g, x + 165, 300, lab, { 'text-anchor': 'middle', 'font-size': 17, fill: col, 'font-weight': 600 }); return g; };
const pL = pan(40, 'QUIET LIBRARY · COLD', BC), pR = pan(414, 'BUSY STREET · HOT', RD);
const pD = [40, 414].map((x, k) => Array.from({ length: 10 }, (_, i) => ({ e: dot(ds, 10, NC), x: x + 50 + (i % 5) * 58, y: 350 + Math.floor(i / 5) * 60, ph: rnd(i + k * 10, 19) * 6.283 })));
const sneeze = [40, 414].map(x => mk(ds, 'circle', { cx: x + 165, cy: 380, r: 0, fill: 'none', stroke: XC, 'stroke-width': 4 }));
const pV = [txt(ds, 205, 506, 'BIG ΔS', { 'text-anchor': 'middle', 'font-size': 24, fill: OK, 'font-weight': 600 }), txt(ds, 579, 506, 'SMALL ΔS', { 'text-anchor': 'middle', 'font-size': 24, fill: GC, 'font-weight': 600 })];

/* ---------- L: second law ---------- */
$('#lEq').innerHTML = K(`${TOT} = ${SYS} + ${SUR}`);
const LR = [[K(`\\text{Spontaneous: } ${TOT} > 0`), 'GOES UP', OK, 'L2', 'greater'], ['The second law of thermodynamics', 'THE RULE', NC, 'L2', 'second'], [K(`\\text{Equilibrium: } ${TOT} = 0`), 'NO CHANGE', GC, 'L3', 'zero']];
$('#lrs').innerHTML = LR.map(([q, k, c], i) => `<div class="qr" id="lr${i}" style="top:${210 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tLr = LR.map(l => wt(l[3], l[4]));
const ls = $('#lS');
const surA = mk(ls, 'rect', { x: 40, y: 80, width: 704, height: 400, rx: 18, fill: '#F3EEFD', stroke: OC, 'stroke-width': 3 }); const surT = txt(ls, 70, 116, 'SURROUNDINGS', { 'font-size': 20, fill: OC, 'font-weight': 600 });
const sysC = mk(ls, 'circle', { cx: 392, cy: 290, r: 90, fill: '#EAF1FE', stroke: BC, 'stroke-width': 3 }); const sysL = txt(ls, 392, 298, 'SYSTEM', { 'text-anchor': 'middle', 'font-size': 22, fill: BC, 'font-weight': 600 });
const sur = Array.from({ length: 18 }, (_, i) => { let a = rnd(i, 20) * 6.283, r = 140 + rnd(i, 21) * 110; return { e: dot(ls, 9, OC), x: 392 + r * Math.cos(a) * 1.25, y: 290 + r * Math.sin(a) * 0.62, ph: rnd(i, 22) * 6.283 }; });
const heat = Array.from({ length: 8 }, (_, i) => ({ e: dot(ls, 8, XC), a: i * 0.785 }));
const lsT = txt(ls, 392, 470, '', { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 600 });

/* ---------- C: melt vs freeze ---------- */
const grid = i => [392 - 75 + (i % 4) * 50, 170 + Math.floor(i / 4) * 50];
const scat = i => [392 - 230 + rnd(i, 23) * 460, 130 + rnd(i, 24) * 230];
const cM = Array.from({ length: 16 }, (_, i) => ({ e: dot($('#caS'), 13, NC), g: grid(i), s: scat(i), ph: rnd(i, 25) * 6.283 }));
const cZ = Array.from({ length: 16 }, (_, i) => ({ e: dot($('#cfS'), 13, NC), g: grid(i), s: scat(i + 40), ph: rnd(i, 26) * 6.283 }));
const ctag = [['#ca', '10 °C · ABOVE 0 °C'], ['#cf', '-10 °C · BELOW 0 °C']].map(([h, s]) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;background:var(--soft);color:var(--ink)'; d.textContent = s; $(h).appendChild(d); return d; });
$('#caV').innerHTML = `<span>${K(`${SYS} > 0`)}</span><span style="color:${OK}">MESSIER</span>`;
$('#cfV').innerHTML = `<span>${K(`${SYS} < 0`)}</span><span style="color:${RD}">TIDIER</span>`;
const th1 = PUC.think($('#th1'), { q: "Freezing at -10 °C lowers the water's entropy. How can it still be spontaneous?", opts: ['It is not', 'Surroundings gain more'], right: 1, why: "Heat goes to the cold surroundings. Their entropy rises more. The total goes up." });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${TOT} = ${SYS} + ${SUR} > 0`);

/* ---------- W: rusting ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{Surroundings get } q = ${tX('+1648000')}\\ \\text{J}`)],
  [K(`${SUR} = 1648000 \\div 298 \\approx ${tO('5530')}`)],
  [K(`${TOT} = 5530 - 549.4 = ${tO('+4980.6')}`)],
  ['Total positive: spontaneous']], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WK = 0.04, WY = 330;
mk(ws, 'line', { x1: 60, y1: WY, x2: 724, y2: WY, stroke: C.ink2, 'stroke-width': 3 }); txt(ws, 64, WY - 10, '0', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const wbar = (x, v, col, colT, lab, labC) => { const g = mk(ws, 'g', {}); const r = mk(g, 'rect', { x: x - 70, y: WY, width: 140, height: 0, rx: 6, fill: colT, stroke: col, 'stroke-width': 3 }); const vt = txt(g, x, 0, (v > 0 ? '+' : '') + v, { 'text-anchor': 'middle', 'font-size': 26, fill: col, 'font-weight': 600 }); txt(g, x, WY + (v < 0 ? 96 : 34), lab, { 'text-anchor': 'middle', 'font-size': 18, fill: labC, 'font-weight': 600 }); return { g, r, vt, v }; };
const wBars = [wbar(180, -549.4, RD, RDT, 'SYSTEM', BC), wbar(392, 5530, OK, OKT, 'SURROUNDINGS', OC), wbar(604, 4980.6, OK, '#E9D9B5', 'TOTAL', GC)];
wBars[2].r.setAttribute('stroke', GC);

/* ---------- X / G / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${SYS} < 0`)}, so it cannot be spontaneous`, right: `Check the total: ${K(`${SYS} + ${SUR}`)}` });
const tsv = $('#tS');
const tq = [['SYSTEM', '-549.4', RD, BC], ['SURROUNDINGS', '+5530', OK, OC], ['TOTAL', '+4980.6', OK, GC]].map(([a, v, c, lc], i) => { const g = mk(tsv, 'g', {}); txt(g, 40, 90 + i * 60, a, { 'font-size': 22, fill: lc, 'font-weight': 600 }); txt(g, 470, 90 + i * 60, v, { 'font-size': 26, fill: c, 'font-weight': 600, 'text-anchor': 'end' }); return g; });
$('#g3t').innerHTML = `A perfect crystal at absolute zero has zero entropy.<div style="margin-top:18px;font-size:44px">${K(`${tG('S')} = 0 \\text{ at } 0\\ \\text{K}`)}</div>`;
const g3 = $('#g3S'); mk(g3, 'rect', { x: 120, y: 60, width: 300, height: 180, rx: 14, fill: C.soft });
const g3d = Array.from({ length: 18 }, (_, i) => dot(g3, 12, NC)); g3d.forEach((e, i) => pos(e, 160 + (i % 6) * 44, 100 + Math.floor(i / 6) * 50));
const g3T = txt(g3, 470, 160, '0 K', { 'font-size': 34, fill: BC, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'State the second law idea, or predict the sign of ΔS for a reaction' });
const OPT = ['\\mathrm{H_2O(l) \\rightarrow H_2O(s)}', '\\mathrm{N_2(g) + 3H_2(g) \\rightarrow 2NH_3(g)}', '\\mathrm{CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)}', '\\mathrm{2SO_2(g) + O_2(g) \\rightarrow 2SO_3(g)}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which change has a positive entropy change, ΔS > 0?', qW: 780,
  opts: OPT.map(s => K(s)), right: 2, optW: 474, optY: 300, optH: 120, optFs: 22 });
const so = PUC.solution($('#so'), [['Gas has the most entropy'], [K(`\\text{C: } 0 \\text{ gas} \\rightarrow 1 \\text{ gas}`)], ['B, D: less gas · A: freezes'], [K(`\\text{A, B, D: } ${tR('\\Delta S < 0')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'All') - 0.1];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · entropy and spontaneity', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`\\text{Spontaneous: } ${TOT} = ${SYS} + ${SUR} > 0`), K(`${tG('\\Delta S')} = ${tX('q_{\\text{rev}}')} / T \\quad \\text{J K}^{-1}\\,\\text{mol}^{-1}`),
    '<b>Spontaneous</b>: happens on its own, not always fast', '<b>Entropy</b>: solid &lt; liquid &lt; gas · <b>equilibrium</b>: ΔS total = 0', '<b>Rusting</b>: -549.4 + 5530 = +4980.6 · <b>ISC</b>: perfect crystal at 0 K, S = 0'] });
const YQ = ['Does spontaneous mean fast?', 'Put solid, liquid and gas in order of entropy.', "How can a change that lowers the system's entropy still be spontaneous?"];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 57', topic: 'One number that decides direction? Gibbs energy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tOpen = wt('S2', 'Open');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tOpen - 0.2, 1.06, 960, 560], [T0('S3') - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room2 = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room2) nc.style.fontSize = Math.floor(22 * room2 / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#mss .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(27 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 150; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const grow = (card, t, t0, inner) => { const sh = M.spring(t - t0, M.HEAVY), wv = M.lerp(1600, 784, sh); snap(card, 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); const ofs = sh >= 1 ? 0 : (wv - 784) / 2; inner.forEach(e => { e.style.transform = `translateX(${ofs.toFixed(1)}px)`; }); };

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
    const tB = [wt('H2', 'Nobody'), wt('H2', 'happen'), wt('H2', 'backwards')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'never') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'hidden') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tr = wt('P2', 'Iron'); fade(nail, t, tr - 0.2); fade(rust, t, tr, 1e9, 4.0); fade(nT, t, wt('P2', 'slowly'));
    const tb = tQr[2]; fade(slope, t, tb - 0.3); const u = M.io((t - tb) / 2.2); pos(ball, M.lerp(270, 490, u) + 10, M.lerp(170, 390, u) - 18); fade(ball, t, tb - 0.3);
    M.draw(bA, t, wt('P3', 'energy') - 0.2, 0.4); fade(bAh, t, wt('P3', 'energy') + 0.1); fade(bT, t, wt('P3', 'energy'));
    const ti = tQr[3], m = M.io((t - ti) / 3.5); attr(ice, 'height', (110 - 80 * m).toFixed(1)); attr(ice, 'y', (390 - 110 + 80 * m).toFixed(1)); attr(pud, 'rx', (80 * m).toFixed(1)); attr(pud, 'ry', (14 * m).toFixed(1)); fade(ice, t, ti - 0.3); fade(pud, t, ti);
    iA.forEach(([l, h]) => { M.draw(l, t, wt('P4', 'heat') - 0.1, 0.4); fade(h, t, wt('P4', 'heat') + 0.2); }); fade(iT, t, wt('P4', 'heat') + 0.2);
    M.vis($('#pP'), t, wt('P4', 'alone') - 0.2, 1e9, POP);
  }

  /* S: flasks */
  const sOn = t >= tS1 - 0.1 && t < tM1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('M1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    grow($('#bn'), t, T0('S3') - 0.4, [b]);
    M.vis($('#eb'), t, T0('S3') - 0.2, z, { dx: 60, dy: 0, ...o });
    const op = M.io((t - tOpen) / 0.4); attr(tap, 'height', (52 - 46 * op).toFixed(1)); attr(tap, 'y', (FY - 26 + 46 * op).toFixed(1)); attr(tap, 'fill', mix(RD, OK, op)); attr(tapH, 'transform', `rotate(${(90 * op).toFixed(1)} 392 ${FY - 38})`);
    let nl = 0;
    mols.forEach((m2, i) => {
      fade(m2.e, t, wt('S1', 'gas') - 0.2 + i * 0.03, 1e9, 0.2);
      const u = m2.side ? M.clamp((t - tOpen - 0.3 - m2.d) / 1.6) : 0, w = 18;
      let x, y;
      const wx = w * Math.sin(t * m2.f * 2.1 + m2.ph), wy = w * Math.cos(t * m2.f * 1.7 + m2.ph * 1.3);
      if (u <= 0) { x = m2.hL[0] + wx; y = m2.hL[1] + wy; }
      else if (u < 0.35) { const k = M.io(u / 0.35); x = M.lerp(m2.hL[0] + wx, 350, k); y = M.lerp(m2.hL[1] + wy, FY, k); }
      else if (u < 0.6) { const k = (u - 0.35) / 0.25; x = M.lerp(350, 434, k); y = FY; }
      else { const k = M.io((u - 0.6) / 0.4); x = M.lerp(434, m2.hF[0] + wx, k); y = M.lerp(FY, m2.hF[1] + wy, k); }
      if (!m2.side && t > tOpen) { const k = M.io((t - tOpen) / 2.5); x = M.lerp(m2.hL[0], m2.hF[0], k) + wx; y = M.lerp(m2.hL[1], m2.hF[1], k) + wy; }
      pos(m2.e, x, y); if (x < 392) nl++;
    });
    M.setT(cntL, `LEFT ${nl}`); M.setT(cntR, `RIGHT ${NMOL - nl}`); fade(cntL, t, wt('S1', 'left') - 0.1); fade(cntR, t, wt('S1', 'left') - 0.1);
    const TAG = [[tS1 + 0.3, 'TAP CLOSED'], [wt('S1', 'left'), 'ALL GAS ON THE LEFT'], [tOpen, 'TAP OPEN'], [wt('S2', 'spread'), 'SPREAD INTO BOTH'], [T0('S3'), 'NO PUSH NEEDED'], [T0('S4'), 'NEVER CROWDS BACK']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    fade(eHd, t, T0('S3'));
    const tw = wt('S3', 'ways'); eBars.forEach((e, i) => { const u = M.io((t - tw - i * 0.18) / 0.5), h = e.w * EK * u; attr(e.r, 'height', h.toFixed(1)); attr(e.r, 'y', (EB - h).toFixed(1)); fade(e.g, t, tw - 0.2 + i * 0.18); e.v.style.opacity = M.clamp((t - tw - i * 0.18 - 0.4) / 0.2).toFixed(3); });
    M.vis($('#eP'), t, wt('S3', 'bunched') - 0.2, 1e9, POP);
    avD(t, wt('S4', 'Just') - 0.2, z);
  }

  /* M: entropy */
  const mOn = t >= tM1 - 0.1 && t < tD1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tM1 + 0.05, z, { dy: 36, ...o });
    grow($('#lw'), t, T0('M3') - 0.3, [$('#hcd'), $('#lst'), ms]);
    M.vis($('#hcd'), t, wt('M1', 'entropy') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, wt('M1', 'number') - 0.2, 1.2);
    fade(rT, t, wt('M2', 'tidy')); fade(rM, t, wt('M2', 'messy'));
    M.vis($('#lh'), t, T0('M3') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tSt = [wt('M3', 'solid'), wt('M4', 'liquid'), wt('M5', 'gas')];
    stG.forEach((g, i) => fade(g, t, tSt[i] - 0.1)); stL.forEach((g, i) => fade(g, t, tSt[i] + 0.3));
    solid.forEach((p, i) => pos(p.e, p.x + 2.5 * Math.sin(t * 9 + i), p.y + 2.5 * Math.cos(t * 8 + i * 1.7)));
    liq.forEach((p, i) => pos(p.e, BX[1] + 22 + 176 * tri(p.x0 + t * p.v), p.y + 6 * Math.sin(t * 2 + i)));
    gas.forEach(p => pos(p.e, BX[2] + 20 + 180 * tri(p.a + t * p.vx), BY + 20 + 250 * tri(p.b + t * p.vy)));
    PUC.write($('#mOrd'), t, wt('M5', 'Solid') - 0.2, 0.9);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('L1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6); });
    PUC.write($('#dF'), t, wt('D3', 'Delta') - 0.1, 0.9);
    M.vis($('#dP'), t, T0('D6') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tq = wt('D2', 'heat'); fade(sysB, t, T0('D2')); fade(sysT, t, T0('D2')); fade(qT, t, tq);
    drips.forEach((d, i) => { const ph = ((t - tq) / 2.4 + i / 4) % 1; pos(d, M.lerp(150, 330, ph), 170 + 10 * Math.sin(ph * 6.283)); fade(d, t, tq + i * 0.3, 1e9, 0.2); });
    fade(thm, t, wt('D3', 'temperature') - 0.1);
    fade(pL, t, wt('D4', 'library') - 0.2); fade(pR, t, wt('D4', 'street') - 0.2);
    const tsn = [wt('D4', 'sneeze'), wt('D4', 'street') + 0.4];
    pD.forEach((arr, k) => { const base = k ? 7 : 0.6; arr.forEach(p => { const kick = M.clamp(1 - Math.abs(t - tsn[k] - 0.4) / 1.4); const amp = base + (k ? 3 : 14) * kick; pos(p.e, p.x + amp * Math.sin(t * (k ? 11 : 7) + p.ph), p.y + amp * Math.cos(t * (k ? 9 : 6) + p.ph * 1.4)); fade(p.e, t, wt('D4', k ? 'street' : 'library')); }); const sr = M.clamp((t - tsn[k]) / 0.8); attr(sneeze[k], 'r', (70 * sr).toFixed(1)); sneeze[k].style.opacity = (sr > 0 && sr < 1 ? 1 - sr : 0).toFixed(3); });
    fade(pV[0], t, wt('D5', 'cold')); fade(pV[1], t, wt('D5', 'hot'));
  }

  /* L: second law */
  const lOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('C1');
    M.vis($('#la'), t, tL1 + 0.05, z, { dx: -60, dy: 0, ...o });
    PUC.write($('#lEq'), t, wt('L1', 'together') - 0.4, 0.9);
    LR.forEach((_, i) => { const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tLr[i + 1] : T1('L3') + 0.4; const on = M.io((t - tLr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#lb'), t, wt('L1', 'system') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(sysC, t, wt('L1', 'system')); fade(sysL, t, wt('L1', 'system')); fade(surA, t, wt('L1', 'surroundings') - 0.1); fade(surT, t, wt('L1', 'surroundings') - 0.1);
    const th = wt('L4', 'gives'), mess = M.io((t - th - 0.8) / 1.0);
    sur.forEach((p, i) => { fade(p.e, t, wt('L1', 'surroundings') + i * 0.02, 1e9, 0.2); const a = 1.5 + 9 * mess; pos(p.e, p.x + a * Math.sin(t * (3 + 6 * mess) + p.ph), p.y + a * Math.cos(t * (2.5 + 6 * mess) + p.ph * 1.3)); });
    heat.forEach((h, i) => { const ph = ((t - th) / 1.6 + (i % 2) * 0.5) % 1, r = M.lerp(96, 200, ph); pos(h.e, 392 + r * Math.cos(h.a) * 1.3, 290 + r * Math.sin(h.a) * 0.75); h.e.style.opacity = t < th ? 0 : (1 - ph).toFixed(3); });
    M.setT(lsT, 'HEAT OUT: SURROUNDINGS GET MESSIER'); fade(lsT, t, wt('L4', 'messier') - 0.2);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'Water') - 0.2, zc, { dx: 60, dy: 0, ...o });
    M.vis(ctag[0], t, wt('C1', 'Ice') - 0.1, 1e9, POP); M.vis(ctag[1], t, wt('C1', 'Water') + 0.1, 1e9, POP);
    const tm = wt('C2', 'Melting'), tf = wt('C2', 'Freezing');
    const um = M.io((t - tm) / 1.8), uf = M.io((t - tf) / 1.8);
    cM.forEach((p, i) => { const w = 3 + 10 * um; pos(p.e, M.lerp(p.g[0], p.s[0], um) + w * Math.sin(t * 5 + p.ph), M.lerp(p.g[1], p.s[1], um) + w * Math.cos(t * 4 + p.ph)); fade(p.e, t, wt('C1', 'Ice') + i * 0.02, 1e9, 0.2); });
    cZ.forEach((p, i) => { const w = 13 - 10 * uf; pos(p.e, M.lerp(p.s[0], p.g[0], uf) + w * Math.sin(t * 5 + p.ph), M.lerp(p.s[1], p.g[1], uf) + w * Math.cos(t * 4 + p.ph)); fade(p.e, t, wt('C1', 'Water') + i * 0.02, 1e9, 0.2); });
    M.vis($('#caV'), t, wt('C2', 'messier') - 0.1, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C2', 'tidier') - 0.1, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'How') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Their') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'spontaneous') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'total') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'surroundings') - 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const tb = [wt('W2', 'minus'), T0('W4') + 0.3, T0('W5') + 0.3];
    wBars.forEach((w, i) => { const u = M.io((t - tb[i]) / 0.8), h = Math.abs(w.v) * WK * u; attr(w.r, 'height', h.toFixed(1)); attr(w.r, 'y', (w.v < 0 ? WY : WY - h).toFixed(1)); attr(w.vt, 'y', (w.v < 0 ? WY + h + 30 : WY - h - 14).toFixed(1)); fade(w.g, t, tb[i] - 0.3); w.vt.style.opacity = M.clamp((t - tb[i] - 0.6) / 0.2).toFixed(3); });
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X + G */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'system') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'check') - 0.2 });
    tq.forEach((g, i) => fade(g, t, wt('X3', 'total') + i * 0.3));
    M.vis($('#g3'), t, T0('G1') - 0.1, T0('E1') - 0.35, { dy: 36, outDur: 0.25, ody: -16 });
    PUC.write($('#g3t'), t, wt('G1', 'perfect') - 0.2, 1.2);
    g3d.forEach((e, i) => fade(e, t, wt('G1', 'crystal') + i * 0.03, 1e9, 0.2)); fade(g3T, t, wt('G1', 'absolute'));
    M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'water') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
