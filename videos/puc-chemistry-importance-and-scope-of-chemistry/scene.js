// PUC Chemistry Ep 01: Importance and scope of chemistry (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (same in bench, equation, counter, recap): N teal (element in play), H ink, O teal in water, electrons orange, coefficients gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
// LaTeX helpers with colour-coding
const N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const N2 = `${N_('N')}_2`, H2 = `${H_('H')}_2`, NH3 = `${N_('N')}${H_('H')}_3`;
const EQ = `${N2} + ${G_(3)}${H2} \\rightarrow ${G_(2)}${NH3}`;

Object.assign(M.IC, {
  sprout: ['M7 20h10', 'M10 20c5.5-2.5.8-6.4 3-10', 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z', 'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z'],
  pill: ['m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', 'm8.5 8.5 7 7'],
  video: ['m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.47.47 0 0 0-.75-.38L16 10.5', 'M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP3 = T0('P3'), tP5 = T0('P5'), tP6 = T0('P6'), tU = T0('U1'), tS1 = T0('S1');
const tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC2 = T0('C2'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three stories ---------- */
const JOBS = [['sprout', 'Farmer', 'MORE RICE', 'farmer', 'N'], ['pill', 'Doctor', 'CANCER TREATMENT', 'doctor', 'Pt'], ['video', 'Video call', 'A GLASS THREAD', 'thread', 'Si']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const ELW = ['FERTILISER', 'A DRUG', 'SILICA GLASS'];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ELW[i]}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['box', 'Salt', 'Salt'], ['droplet', 'Soap', 'soap'], ['flame', 'Steel cooker', 'steel'], ['pill', 'Medicine', 'medicine']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: what chemists ask + water ---------- */
$('#mdefI').innerHTML = M.icon('box', 28, '#fff', 2.2);
const QR = [['What is it made of?', 'COMPOSITION', 'P3', 'made'], ['How are its parts arranged?', 'STRUCTURE', 'P3', 'arranged'], ['How does it behave?', 'PROPERTIES', 'P4', 'behaves'], ['How does it change?', 'CHANGE', 'P4', 'changes']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
// water: shells and electrons
const ws = $('#wS'), OX = 392, OY = 236, HD = [[-0.791, 0.612], [0.791, 0.612]], DH = 150;
const HF = HD.map(([dx, dy]) => [OX + dx * DH, OY + dy * DH]), HS = [[118, 300], [666, 300]];
const wRing = [mk(ws, 'circle', { cx: OX, cy: OY, r: 72, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), mk(ws, 'circle', { cx: OX, cy: OY, r: 118, fill: 'none', stroke: C.dim, 'stroke-width': 2 })];
const hRing = [0, 1].map(() => mk(ws, 'circle', { r: 52, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const oG = atomG(ws, 44, NC, 'O', 34); attr(oG, 'transform', `translate(${OX} ${OY})`);
const hG = [0, 1].map(() => atomG(ws, 26, HC, 'H', 24));
const OE = [37.7, 142.3, 205, 245, 295, 335].map(a => a * Math.PI / 180), OI = [90, 270].map(a => a * Math.PI / 180);
const oe = OE.map(() => mk(ws, 'circle', { r: 8, fill: HC })), oi = OI.map(a => mk(ws, 'circle', { r: 8, fill: HC, cx: OX + 72 * Math.cos(a), cy: OY + 72 * Math.sin(a) }));
const he = [0, 1].map(() => mk(ws, 'circle', { r: 8, fill: HC }));
const oCfg = txt(ws, OX, OY - 136, 'O  2, 6', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
const hCfg = [0, 1].map(() => txt(ws, 0, 0, 'H  1', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }));
const pairTag = document.createElement('div'); pairTag.className = 'btag'; pairTag.style.cssText = 'right:36px;top:18px;background:#FBEDE6;color:#C8461B'; pairTag.textContent = 'SHARED PAIR = BOND'; $('#pw').appendChild(pairTag);
$('#wF').innerHTML = K(`${H_('H')}_2\\textcolor{${NC}}{\\mathrm{O}}`);

/* ---------- U: Hoffmann ---------- */
$('#hqI').innerHTML = M.icon('quote', 56, C.ac, 1.8);

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
// decoy N2 molecules (the air)
const DEC = [[110, 140, 30], [620, 150, -18], [654, 380, 50], [118, 392, -38]];
const decoys = DEC.map(([x, y, r]) => { const g = mk(bW, 'g', { transform: `translate(${x} ${y}) rotate(${r})` }); [-1, 0, 1].forEach(k => mk(g, 'line', { x1: -30, y1: k * 14, x2: 30, y2: k * 14, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })); mk(g, 'circle', { cx: -60, r: 40, fill: NC }); mk(g, 'circle', { cx: 60, r: 40, fill: NC }); txt(g, -60, 12, 'N', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: '#fff', 'text-anchor': 'middle' }); txt(g, 60, 12, 'N', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: '#fff', 'text-anchor': 'middle' }); return g; });
// atoms
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
atom('Na', 40, NC, 'N', 32); atom('Nb', 40, NC, 'N', 32);
for (let i = 1; i <= 6; i++) atom('H' + i, 26, HC, 'H', 24);
// bonds: n sticks + n electron pairs, endpoints follow the atoms
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { NN: bond('Na', 'Nb', 3), HHa: bond('H1', 'H2', 1), HHb: bond('H3', 'H4', 1), HHc: bond('H5', 'H6', 1),
  a1: bond('Na', 'H1', 1), a2: bond('Na', 'H3', 1), a3: bond('Na', 'H5', 1), b1: bond('Nb', 'H2', 1), b2: bond('Nb', 'H4', 1), b3: bond('Nb', 'H6', 1) };
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;   // sticks grow out from the middle
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
// beats on the bench
const tAir = wt('S1', 'nitrogen'), tTrip = wt('S2', 'three'), tTb = wt('S2', 'triple'), tPl = wt('S3', 'cannot'), tStr = wt('S3', 'strong');
const tHyd = wt('S4', 'hydrogen'), tAmm = wt('S4', 'ammonia'), tBrk = wt('S5', 'old'), tMov = wt('S5', 'move'), tForm = wt('S5', 'new');
const tD3 = wt('D3', 'two'), tD4 = wt('D4', 'three'), tD5 = T0('D5');
// positions: [t, x, y] keys per atom (eased)
const NA1 = [250, 250], NB1 = [560, 250];
const around = ([x, y]) => [[x - 95, y - 55], [x + 95, y - 55], [x, y + 110]];
const A1 = around(NA1), B1 = around(NB1);
const KP = {
  Na: [[0, 315, 250], [tBrk, 300, 250], [tMov, ...NA1]], Nb: [[0, 469, 250], [tBrk, 480, 250], [tMov, 520, 300], [tD3, ...NB1]],
  H1: [[0, 900, 140], [tHyd, 560, 140], [tBrk, 548, 132], [tMov, ...A1[0]]], H2: [[0, 972, 140], [tHyd, 632, 140], [tBrk, 650, 132], [tD3 + 0.15, ...B1[0]]],
  H3: [[0, 920, 260], [tHyd + 0.15, 580, 260], [tBrk, 568, 252], [tMov + 0.12, ...A1[1]]], H4: [[0, 992, 260], [tHyd + 0.15, 652, 260], [tBrk, 676, 252], [tD3 + 0.3, ...B1[1]]],
  H5: [[0, 900, 380], [tHyd + 0.3, 560, 380], [tBrk, 548, 388], [tMov + 0.24, ...A1[2]]], H6: [[0, 972, 380], [tHyd + 0.3, 632, 380], [tBrk, 650, 388], [tD3 + 0.45, ...B1[2]]],
};
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
// plant, blocked arrow
const plant = mk(bW, 'g', {}); mk(plant, 'circle', { cx: 660, cy: 250, r: 56, fill: C.okBg }); plant.insertAdjacentHTML('beforeend', `<g transform="translate(632 222)">${M.icon('sprout', 56, C.ok, 2.2)}</g>`);
const parr = mk(bW, 'path', { d: 'M440 250 H586', stroke: C.mute, 'stroke-width': 4, 'stroke-dasharray': '8 10', fill: 'none', 'stroke-linecap': 'round' });
const pX = mk(bW, 'g', {}); mk(pX, 'circle', { cx: 512, cy: 250, r: 22, fill: C.red }); pX.insertAdjacentHTML('beforeend', `<g transform="translate(500 238)">${M.icon('x', 24, '#fff', 3)}</g>`);
// bench tag + periodic strip
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same atoms, just a new arrangement?' });
// reaction card: pieces with growing coefficients
const PIECES = [['k', `${N2}`], ['k', '+'], ['c', '3'], ['k', `${H2}`], ['k', '\\rightarrow'], ['c', '2'], ['k', `${NH3}`]];
$('#eq').innerHTML = PIECES.map(([kind, s], i) => kind === 'c' ? `<span class="cf" id="cf${i}">${s}</span>` : `<span id="pc${i}">${K(s)}</span>`).join('');
const STX = ['Atoms are never made or destroyed', `Put <b class="g">2</b> in front of ${K(NH3)}: nitrogen is 2 | 2`, `Put <b class="g">3</b> in front of ${K(H2)}: hydrogen is 6 | 6`, 'Count again: balanced'];
const tStx = [wt('D2', 'atoms'), wt('D3', 'Put'), wt('D4', 'So'), wt('D5', 'Count')];
// counter
$('#crs').innerHTML = [['N', 'nitrogen', NC], ['H', 'hydrogen', HC]].map(([e, n, c], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 86}px"><div class="ce" style="color:${c}">${e}</div><div class="cn">${n}</div><div class="cv" id="cv${i}">2 | 1</div><div class="cm" id="cm${i}"></div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: `Is ${K(`${N2} + ${H2} \\rightarrow ${NH3}`)} balanced as written?`, opts: ['Yes', 'No'], right: 1, why: 'Left: 2 N and 2 H. Right: 1 N and 3 H. Atoms cannot vanish or appear.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: worked example + mass balance ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${N2} = 2 \\times 14 = 28\\,\\text{u}, \\quad ${G_(3)}${H2} = 3 \\times 2 = 6\\,\\text{u}`)],
  [K(`${NH3} = 14 + 3 = 17\\,\\text{u}, \\quad ${G_(2)}${NH3} = 34\\,\\text{u}`)],
  [K(`28\\,\\text{u} + 6\\,\\text{u} = 34\\,\\text{u} \\;\\checkmark`)],
  [K(`28\\,\\text{g}\\; ${N2} \\;\\rightarrow\\; \\textcolor{${NC}}{34\\,\\text{g}}\\; ${NH3}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W4'), T0('W5'), T0('W6'), wt('W7', 'So')];
const s2 = $('#wS2'), PVX = 392, PVY = 150, BL = 250;
mk(s2, 'path', { d: `M${PVX} ${PVY} L${PVX - 50} 440 H${PVX + 50} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(s2, 'rect', { x: PVX - 140, y: 436, width: 280, height: 14, rx: 7, fill: C.ink });
const beam = mk(s2, 'g', {}); mk(beam, 'rect', { x: -BL, y: -7, width: BL * 2, height: 14, rx: 7, fill: C.ink });
const pans = [0, 1].map(i => { const g = mk(s2, 'g', {}); mk(g, 'line', { x1: -90, y1: 150, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 90, y1: 150, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-110 150 H110 C110 176 70 186 0 186 C-70 186 -110 176 -110 150Z', fill: '#E9E5DA', stroke: C.ink, 'stroke-width': 2.5 }); return g; });
const blk = (p, x, y, w, fill, stroke, label, tc) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); mk(g, 'rect', { x: -w / 2, y: -48, width: w, height: 48, rx: 10, fill, stroke, 'stroke-width': 2.5 }); txt(g, 0, -16, label, { 'text-anchor': 'middle', 'font-size': 24, fill: tc, 'font-weight': 600 }); return g; };
const bN2 = blk(pans[0], 0, 148, 160, NC, NC, 'N₂ · 28 u', '#fff'), bH2 = blk(pans[0], 0, 96, 160, HC, HC, '3H₂ · 6 u', '#fff');
const bNH = blk(pans[1], 0, 148, 190, '#fff', NC, '2NH₃ · 34 u', NC);
const mL = txt(s2, PVX - BL, 92, '', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 }), mR = txt(s2, PVX + BL, 92, '', { 'text-anchor': 'middle', 'font-size': 30, fill: NC, 'font-weight': 600 });
mk(s2, 'circle', { cx: PVX, cy: PVY, r: 11, fill: C.ac });
const tLoad = [wt('W4', 'One'), wt('W4', 'Three'), wt('W5', 'Two')];
const tilt = M.keys([[0, 0], [tLoad[0], -7], [tLoad[1], -8.5], [tLoad[2], 0]], 0.9);

/* ---------- C: scope ---------- */
const SC = [['pill', 'Health', 'DRUGS', 'Health'], ['sprout', 'Food', 'CROPS', 'Food'], ['layers', 'New materials', 'LIGHT, CURRENT', 'materials'], ['factory', 'Industry', 'JOBS, ECONOMY', 'Industry'], ['globe', 'Environment', 'AIR, OZONE', 'Environment']];
$('#srs').innerHTML = SC.map(([ic, n, w], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 96}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="sn2">${n}</div><div class="sw">${w}</div></div>`).join('');
const tSc = [wt('C2', 'Health'), T0('C3'), T0('C4'), T0('C5'), T0('C6')];
const PANE = [
  ['01 / 05 · HEALTH', 'Life saving drugs', ['Cisplatin <em>CANCER</em>', 'Taxol <em>CANCER</em>', 'AZT <em>AIDS</em>'], ['Pt'], 'Cisplatin holds platinum'],
  ['02 / 05 · FOOD', 'More food per field', ['Urea <em>FERTILISER</em>', 'Pesticides <em>PROTECT CROPS</em>'], ['N'], 'Urea is rich in nitrogen'],
  ['03 / 05 · NEW MATERIALS', 'Made to order', ['Superconducting ceramics', 'Conducting polymers', 'Optical fibres'], ['Si'], 'Optical fibres: silica glass'],
  ['04 / 05 · INDUSTRY', 'Things we use daily', ['Acids', 'Alkalis', 'Salts', 'Dyes', 'Polymers', 'Soaps and detergents'], ['Na', 'Cl'], 'Common salt is NaCl'],
  ['05 / 05 · ENVIRONMENT', 'Cleaner air', ['Safer replacements for CFCs', 'Protect the ozone layer'], ['C', 'F', 'Cl'], 'CFC: chlorofluorocarbon'],
];
$('#pns').innerHTML = PANE.map(([s, t, ch, els, note], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="ptt">${t}</div><div class="chs">${ch.map((c, k) => `<span id="pc${i}_${k}">${c}</span>`).join('')}${i === 4 ? `<span id="pc4_x" style="background:var(--redBg);color:var(--red)">Open: methane, CO₂</span>` : ''}</div>
  <div class="eip">ELEMENT IN PLAY</div><div class="els">${els.map(e => `<div class="el">${e}</div>`).join('')}<b>${note}</b></div></div>`).join('');
const tPc = [[wt('C2', 'Cisplatin'), wt('C2', 'taxol'), wt('C2', 'Z')], [wt('C3', 'Fertilisers'), wt('C3', 'pesticides')], [wt('C4', 'Superconducting'), wt('C4', 'conducting', 1), wt('C4', 'optical')],
  [wt('C5', 'Acids'), wt('C5', 'alkalis'), wt('C5', 'salts'), wt('C5', 'dyes'), wt('C5', 'polymers'), wt('C5', 'soaps')], [wt('C6', 'safer'), wt('C6', 'ozone')]];
const avD = PUC.avatar($('#cp'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my doctor dream needs chemistry too!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Balance by changing ${K(H2)} into ${K(`${H_('H')}_3`)}`, right: `Change only the big numbers in front: ${K(`${G_(3)}${H2}`)}` });
const tsv = $('#tS');
const hM = (p, x, y) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); mk(g, 'line', { x1: -14, y1: 0, x2: 14, y2: 0, stroke: C.ink2, 'stroke-width': 5 }); [-26, 26].forEach(cx => { mk(g, 'circle', { cx, r: 18, fill: HC }); txt(g, cx, 7, 'H', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff', 'text-anchor': 'middle' }); }); return g; };
const gH3 = mk(tsv, 'g', {}); [[120, 86], [84, 148], [156, 148]].forEach(([x, y]) => { mk(gH3, 'circle', { cx: x, cy: y, r: 18, fill: HC }); txt(gH3, x, y + 7, 'H', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff', 'text-anchor': 'middle' }); });
txt(gH3, 120, 214, 'H₃ · NOT HYDROGEN GAS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xH3 = mk(tsv, 'path', { d: 'M60 70 L180 170 M180 70 L60 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const g3H = mk(tsv, 'g', {}); [[380, 78], [380, 124], [380, 170]].forEach(([x, y]) => hM(g3H, x, y)); txt(g3H, 380, 214, '3 H₂ · HYDROGEN GAS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short recall on the uses of chemistry, and balancing inside almost every numerical' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `56 g of ${K(N2)} reacts completely with ${K(H2)} to form ${K(NH3)}. What mass of ${K(NH3)} forms?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: N = 14 u, H = 1 u</span>`, qW: 780,
  opts: ['34 g', '62 g', '68 g', '112 g'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`28\\,\\text{g}\\;${N2} \\rightarrow 34\\,\\text{g}\\;${NH3}`)], [K(`56 = 2 \\times 28`)], [K(`${NH3} = 2 \\times 34 = \\textcolor{${C.ok}}{68\\,\\text{g}}`)], [K(`\\text{check: } 56 + 12 = 68`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'twice'), wt('A3', 'sixty'), wt('A4', 'Check')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · importance of chemistry', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Chemistry</b>: what matter is made of, how it is built, behaves and changes', '<b>Balance</b>: atoms are never made or destroyed; change only the big numbers', '<b>Health</b>: cisplatin, taxol (cancer) · AZT (AIDS)', '<b>Food · materials · air</b>: urea · optical fibres · CFC replacements'] });
const YQ = ['Name two drugs that chemistry gave to cancer treatment.', 'Why can\'t we balance an equation by changing H₂ into H₃?', 'Why must the total mass be the same on both sides of a reaction?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 03', topic: 'Is air a compound or a mixture? Nature and Classification of Matter', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tTrip - 0.2, 1.1, 960, 560], [tPl + 0.1, 1, 960, 540], ]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  $('#hB').style.left = (64 + $('#hN').offsetWidth + 28) + 'px';
  geo.cf = PIECES.map(([k], i) => k === 'c' ? $('#cf' + i).offsetWidth : 0);
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: the three stories pop in with their words, then leave as the title travels */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three stories, Diya's kitchen */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'science') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'three') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'chemistry') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'air') - 0.15, 1e9, POP);
  }

  /* P: what chemists ask + water */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'Matter') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : tP5; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'Matter') + 0.4, out, { dx: 60, dy: 0, ...o });
    // water: H atoms join at "join", electrons pair at "share"
    const j = M.io((t - wt('P5', 'join') + 0.1) / 0.9), sh = M.io((t - wt('P6', 'share') + 0.2) / 0.8), pu = M.io((t - wt('P6', 'pair') + 0.1) / 0.3);
    [0, 1].forEach(i => {
      const hx = M.lerp(HS[i][0], HF[i][0], j), hy = M.lerp(HS[i][1], HF[i][1], j);
      attr(hG[i], 'transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`); attr(hRing[i], 'cx', hx.toFixed(1)); attr(hRing[i], 'cy', hy.toFixed(1));
      attr(hCfg[i], 'x', hx.toFixed(1)); attr(hCfg[i], 'y', (hy + 84).toFixed(1)); hCfg[i].style.opacity = (1 - sh).toFixed(3);
      const [dx, dy] = HD[i], pxv = -dy, pyv = dx;
      // H electron: starts on its own ring (outer side), moves into the shared pair
      const ha = Math.atan2(-dy, -dx) + (i ? -0.6 : 0.6), e0x = hx + 52 * Math.cos(ha), e0y = hy + 52 * Math.sin(ha);
      const p1x = OX + dx * 116 - pxv * 8, p1y = OY + dy * 116 - pyv * 8, p2x = OX + dx * 116 + pxv * 8, p2y = OY + dy * 116 + pyv * 8;
      attr(he[i], 'cx', M.lerp(e0x, p1x, sh).toFixed(1)); attr(he[i], 'cy', M.lerp(e0y, p1y, sh).toFixed(1)); attr(he[i], 'fill', mix(HC, EC, sh));
      const oa = OE[i], o0x = OX + 118 * Math.cos(oa), o0y = OY + 118 * Math.sin(oa);
      attr(oe[i], 'cx', M.lerp(o0x, p2x, sh).toFixed(1)); attr(oe[i], 'cy', M.lerp(o0y, p2y, sh).toFixed(1)); attr(oe[i], 'fill', mix(HC, EC, sh));
    });
    OE.forEach((a, k) => { if (k > 1) { attr(oe[k], 'cx', (OX + 118 * Math.cos(a)).toFixed(1)); attr(oe[k], 'cy', (OY + 118 * Math.sin(a)).toFixed(1)); } });
    const wIn = M.clamp((t - wt('P2', 'Matter') - 0.6) / 0.3); [...wRing, oG, ...oe, ...oi, oCfg, ...hG, ...hRing, ...he].forEach(e => { e.style.opacity = wIn.toFixed(3); });
    [0, 1].forEach(i => { hCfg[i].style.opacity = (wIn * (1 - sh)).toFixed(3); });
    M.vis(pairTag, t, wt('P6', 'bond') - 0.1, 1e9, POP);
    PUC.write($('#wF'), t, wt('P5', 'oxygen', 1) - 0.1, 0.7);
  }

  /* U: Hoffmann */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#hof'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    M.vis($('#hqI'), t, tU + 0.3, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hN'), t, wt('U1', 'Roald') - 0.1, 1e9, { dy: 10 }); M.vis($('#hB'), t, wt('U1', 'Hoffmann') + 0.1, 1e9, { dy: 10 }); M.vis($('#hHr'), t, tU + 0.4, 1e9, { dy: 0 });
    PUC.write($('#hq0'), t, wt('U1', 'Chemistry') - 0.1, 1.4); PUC.write($('#hq1'), t, wt('U1', 'and') - 0.1, 1.0);
    $('#hqT').style.color = mix(C.ink, C.ac, M.io((t - wt('U1', 'transformations')) / 0.3));
    M.vis($('#hP'), t, wt('U1', 'Transformation') - 0.1, 1e9, POP);
  }

  /* S + B + D: the bench, the counter, balancing */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const w1 = t < tD1 - 0.45, a = w1 ? tS1 + 0.05 : tD1 + 0.05, z = w1 ? OUT('B2') : OUT('T1');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    { const sh = w1 ? M.spring(t - tAmm + 0.4, M.HEAVY) : 1, wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#rx'), t, w1 ? tAmm - 0.1 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, w1 ? tAmm + 0.25 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'balanced') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Two') });
    // decoys: the air, then focus on one molecule
    decoys.forEach((g, i) => fade(g, t, tS1 + 0.3 + i * 0.1, tTrip - 0.4, 0.3));
    // atom positions
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const hIn = M.io((t - tHyd + 0.2) / 0.3);
    for (const k in A) {
      attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`);
      let op = k[0] === 'N' ? M.clamp((t - tS1 - 0.2) / 0.3) : hIn;
      // leftovers dim between the first ammonia and step two
      const left = k === 'Nb' || k === 'H2' || k === 'H4' || k === 'H6';
      if (left) op *= 1 - 0.6 * M.io((t - tForm - 0.4) / 0.4) * (1 - M.io((t - tD3 + 0.2) / 0.4));
      A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002);
    }
    // bonds: N2 (sticks on air, electron pairs on "three shared pairs"), H2, then N-H
    const brk = M.io((t - tBrk) / 0.35);
    drawBond(BND.NN, P, M.clamp((t - tS1 - 0.2) / 0.3) * (1 - brk), M.io((t - tTrip + 0.1) / 0.4) * (1 - brk));
    ['HHa', 'HHb', 'HHc'].forEach((k, i) => drawBond(BND[k], P, hIn * (1 - brk), hIn * (1 - brk)));
    ['a1', 'a2', 'a3'].forEach((k, i) => { const u = M.io((t - tForm - i * 0.18) / 0.4); drawBond(BND[k], P, u, u); });
    ['b1', 'b2', 'b3'].forEach((k, i) => { const u = M.io((t - tD3 - 0.7 - i * 0.18) / 0.4); drawBond(BND[k], P, u, u); });
    // plant blocked
    const pl = fade(plant, t, tPl - 0.1, tHyd - 0.4, 0.3); M.drawU(parr, M.io((t - tPl) / 0.5) * (pl > 0 ? 1 : 0)); fade(pX, t, tStr - 0.1, tHyd - 0.4, 0.2);
    // bench tag
    const TAG = [[tAir, 'AIR · MOSTLY N₂'], [tTb - 0.1, 'N≡N · TRIPLE BOND'], [tStr, 'TOO STRONG FOR PLANTS'], [tHyd, 'N₂ + H₂'], [tBrk, 'OLD BONDS BREAK'], [tMov, 'ATOMS MOVE'], [tForm, 'NEW BONDS FORM'], [T0('S6') + 0.2, 'NH₃ · AMMONIA'], [tD3 + 0.6, '2 NH₃'], [tD4, '6 H = 3 H₂'], [tD5 + 0.2, 'SAME ATOMS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) { M.setT(btag, tg); } M.vis(btag, t, tAir - 0.1, 1e9, POP);
    // periodic strip: N lights with the air, H with hydrogen; it leaves for the avatar
    const stOff = tD5 + 0.1;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['N', tAir, NC], ['H', tHyd, HC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, tD5 + 0.4, OUT('T1'));
    // reaction card: equation as written, then the big numbers grow in
    M.setT($('#rxL'), t < tD1 ? 'REACTION · AS WRITTEN' : t < tD5 + 1.6 ? 'REACTION · BALANCING' : 'REACTION · BALANCED');
    PIECES.forEach(([k], i) => {
      if (k === 'c') { const tc = i === 5 ? tD3 + 0.2 : tD4 + 0.2, u = M.io((t - tc) / 0.45); const el = $('#cf' + i); snap(el, 'width', (geo.cf[i] * u).toFixed(1) + 'px'); el.style.opacity = u.toFixed(3); }
      else PUC.write($('#pc' + i), t, tAmm + i * 0.12, 0.4);
    });
    const si = tStx.reduce((a, tt, i) => t >= tt ? i : a, -1);
    if (si >= 0) { M.setT($('#eqN'), String(si + 1)); const tx = $('#eqT'); if (tx._s !== si) { tx._s = si; tx.innerHTML = STX[si]; } }
    M.vis($('#eqS'), t, tStx[0] - 0.1, 1e9, { dy: 12 });
    const pulse = si >= 0 ? M.io((t - tStx[si]) / 0.2) * (1 - M.io((t - tStx[si] - 0.6) / 0.4)) : 0; $('#eqS').style.transform = '';
    $('#eqN').style.background = mix(C.ac, GC, pulse);
    // counter values
    const nOk = t >= tD3 + 0.5, hOk = t >= tD4 + 0.5;
    const CV = [[nOk ? '2 | 2' : '2 | 1', nOk], [hOk ? '6 | 6' : t >= tD3 + 0.5 ? '2 | 6' : '2 | 3', hOk]];
    CV.forEach(([v, ok], i) => {
      M.setT($('#cv' + i), v); const m = $('#cm' + i); PUC.setIco(m, ok ? 'check' : 'x', '#fff', 24, 3); setBg(m, ok ? C.ok : C.red);
      const ch = i === 0 ? tD3 + 0.5 : t >= tD4 + 0.5 ? tD4 + 0.5 : tD3 + 0.5, fl = M.io((t - ch) / 0.2) * (1 - M.io((t - ch - 0.5) / 0.5));
      setBg($('#cr' + i), mix(C.soft, ok ? C.okBg : C.redBg, M.io((t - wt('B1', 'counter') + 0.1) / 0.3) * (0.55 + 0.45 * fl)));
      M.vis($('#cr' + i), t, tAmm + 0.5 + i * 0.15, 1e9, { dx: -16, dy: 0 });
    });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Chemistry') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'only') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'rearranges') + 0.2, 0.8);
  }

  /* W: worked example + mass balance */
  const wOn = t >= tW1 - 0.1 && t < tC2 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C2');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const an = tilt(t), r = an * Math.PI / 180;
    attr(beam, 'transform', `translate(${PVX} ${PVY}) rotate(${an.toFixed(2)})`);
    pans.forEach((p, i) => { const s = i ? 1 : -1, x = PVX + s * BL * Math.cos(r), y = PVY + s * BL * Math.sin(r); attr(p, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
    [[bN2, tLoad[0]], [bH2, tLoad[1]], [bNH, tLoad[2]]].forEach(([g, tt]) => { const u = M.io((t - tt + 0.2) / 0.35); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0.002); });
    M.vis($('#wGp'), t, wt('W7', 'twenty') - 0.1, 1e9, POP);
    const lv = (t >= tLoad[0] ? 28 : 0) + (t >= tLoad[1] ? 6 : 0), rv = t >= tLoad[2] ? 34 : 0;
    M.setT(mL, `LEFT ${lv} u`); M.setT(mR, `RIGHT ${rv} u`); mL.style.opacity = M.clamp((t - tLoad[0] + 0.2) / 0.3); mR.style.opacity = M.clamp((t - tLoad[0] + 0.2) / 0.3);
    attr(mR, 'fill', t >= T0('W6') ? C.ok : NC); attr(mL, 'fill', t >= T0('W6') ? C.ok : C.ink);
  }

  /* C: scope */
  const cOn = t >= tC2 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC2 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tSc[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    const cur = tSc.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, -1);
    SC.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tC2 + 0.3 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tSc[i] + 0.15) / 0.3) * (i < 4 ? 1 - M.io((t - tSc[i + 1] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.sn2').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.sw').style.color = mix(C.mute, C.ac2, on);
      PUC.setIco(el.querySelector('i'), SC[i][0], on > 0.5 ? C.ink : C.ac, 30, 2.2); });
    PANE.forEach((_, i) => {
      const pn = $('#pn' + i), tin = tSc[i] - 0.15, tout = i < 4 ? tSc[i + 1] - 0.15 : 1e9;
      M.vis(pn, t, tin, tout, { dy: 20, outDur: 0.2, ody: -10 });
      tPc[i].forEach((tt, k) => M.vis($(`#pc${i}_${k}`), t, tt - 0.1, 1e9, POP));
      M.vis(pn.querySelector('.eip'), t, tin + 0.6, 1e9, { dy: 8 }); M.vis(pn.querySelector('.els'), t, tin + 0.7, 1e9, { dy: 12 });
    });
    M.vis($('#pc4_x'), t, wt('C7', 'methane') - 0.15, 1e9, POP);
    avD(t, wt('C2', 'AIDS') + 0.3, tSc[1] - 0.2);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'small') - 0.1, tStrike: wt('X3', 'changes') - 0.1, tRight: wt('X3', 'Only') - 0.1 });
    fade(gH3, t, wt('X2', 'H') - 0.1); M.draw(xH3, t, wt('X3', 'not') - 0.1, 0.4); fade(g3H, t, wt('X3', 'Only') - 0.05);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
