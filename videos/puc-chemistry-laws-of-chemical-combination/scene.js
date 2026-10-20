// PUC Chemistry Ep 06: Laws of chemical combination (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, counter, recap): O teal (element in play), H ink, C slate, Cu gold, electrons orange, iron grey, rust brown
const OC = C.ac, HC = C.ink, CC = '#5A6478', CUC = '#B7791F', EC = '#C8461B', FEC = '#8A8F99', RUC = '#A0522D';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const O_ = s => `\\textcolor{${OC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, C_ = s => `\\textcolor{${CC}}{\\mathrm{${s}}}`;
const H2 = `${H_('H')}_2`, O2 = `${O_('O')}_2`, H2O = `${H_('H')}_2${O_('O')}`;
const EQ = `2${H2} + ${O2} \\rightarrow 2${H2O}`;
const lbl = (g, x, y, s, fs) => txt(g, x, y + fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' });
const ball = (p, x, y, r, f, s) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); mk(g, 'circle', { r, fill: f }); if (s) lbl(g, 0, 0, s, r * 0.9); return g; };

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['flame', 'Candle', 'SEEMS TO LOSE MASS', 'candle'], ['link', 'Iron gate', 'RUSTS, GETS HEAVIER', 'iron'], ['droplet', 'Pure water', 'RIVER OR LAB: SAME', 'pure']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="qm" id="qm${i}">WHY? <b>?</b></div></div>`).join('');
const KIT = [['Gained mass?', 'gain'], ['Or lost it?', 'lose']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('scale', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H4', k[1]));

/* ---------- P: law 1 ---------- */
$('#l5').innerHTML = [1, 2, 3, 4, 5].map(i => `<span id="l5_${i}">${i}</span>`).join('');
$('#lr0').innerHTML = `${M.icon('link', 28, RUC, 2.4)}<span><b>Rusty chain:</b> heavier, it took in ${K(O2)} and ${K(H2O)}</span>`;
$('#lr1').innerHTML = `${M.icon('flame', 28, C.red, 2.4)}<span><b>Candle:</b> seems lighter, its gases escape</span>`;
const fsv = $('#fS');
mk(fsv, 'path', { d: 'M372 96 V172 A112 112 0 1 0 412 172 V96', fill: '#FBFAF6', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
mk(fsv, 'rect', { x: 360, y: 82, width: 64, height: 22, rx: 5, fill: C.ink2 });
const fe = []; for (let i = 0; i < 16; i++) { const x = 312 + (i % 8) * 23 + (Math.floor(i / 8) ? 11 : 0), y = 344 - Math.floor(i / 8) * 20 - (i % 3) * 3; fe.push(mk(fsv, 'circle', { cx: x, cy: y, r: 9, fill: FEC })); }
const airD = []; for (let i = 0; i < 7; i++) airD.push(mk(fsv, 'circle', { r: 6, fill: OC, opacity: 0.8 }));
mk(fsv, 'rect', { x: 222, y: 388, width: 340, height: 16, rx: 6, fill: C.ink });
mk(fsv, 'rect', { x: 262, y: 404, width: 260, height: 70, rx: 12, fill: C.ink2 });
const rd = txt(fsv, 392, 450, '250.0 g', { 'text-anchor': 'middle', 'font-size': 32, fill: '#F5C66B', 'font-weight': 600 });
const ba = [txt(fsv, 120, 528, 'BEFORE 250.0 g', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }), txt(fsv, 440, 528, 'AFTER 250.0 g', { 'font-size': 20, fill: C.ok, 'font-weight': 600 })];
const feTag = txt(fsv, 520, 300, 'IRON WOOL · DAMP AIR', { 'font-size': 15 });
const tRust = wt('P4', 'reaction'), tBef = wt('P4', 'before'), tAft = wt('P4', 'after');

/* ---------- U: law 2 ---------- */
const SEG = [['Cu', 51.35, CUC, 'fifty'], ['C', 9.74, CC, 'nine'], ['O', 38.91, OC, 'thirty']];
[0, 1].forEach(j => { let x = 0; $('#pb' + j).innerHTML = SEG.map(([e, p, c], i) => { const w = p / 100 * 1264, s = `<i id="sg${j}_${i}" style="left:${x.toFixed(1)}px;width:${w.toFixed(1)}px;background:${c}">${e} ${p.toFixed(2)}%</i>`; x += w; return s; }).join(''); });
$('#lg').innerHTML = [['Copper', CUC], ['Carbon', CC], ['Oxygen', OC]].map(([n, c]) => `<span><b style="background:${c}"></b>${n}</span>`).join('');
const tSeg = [wt('U3', 'copper', 1), wt('U3', 'carbon', 1), wt('U3', 'oxygen')];

/* ---------- S: law 3 on the bench ---------- */
const b = $('#bS');
const bondL = mk(b, 'g', {}), atomL = mk(b, 'g', {}), dotL = mk(b, 'g', {});
const atomG = (p, r, fill, l, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); lbl(g, 0, 0, l, fs); return g; };
const A = {};
const atom = (k, r, fill, l, fs) => { A[k] = { g: atomG(atomL, r, fill, l, fs), r }; };
atom('Ow', 36, OC, 'O', 30); atom('Hw1', 24, HC, 'H', 22); atom('Hw2', 24, HC, 'H', 22);
atom('Op1', 34, OC, 'O', 28); atom('Op2', 34, OC, 'O', 28); atom('Hp1', 24, HC, 'H', 22); atom('Hp2', 24, HC, 'H', 22);
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { w1: bond('Ow', 'Hw1', 1), w2: bond('Ow', 'Hw2', 1), p0: bond('Op1', 'Op2', 1), p1: bond('Op1', 'Hp1', 1), p2: bond('Op2', 'Hp2', 1) };
// electrons travel from each atom's side into the shared pair (ep 0..1), sticks grow (u)
const drawBond = (bd, P, u, ep) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17;
    const fx = mxp + px * k + ux * s * 9, fy = myp + py * k + uy * s * 9;
    const [ax, ay, ar] = s < 0 ? [x1, y1, A[bd.a].r] : [x2, y2, A[bd.c].r], sx = ax + px * (ar + 14) * (s < 0 ? 1 : -1), sy = ay + py * (ar + 14) * (s < 0 ? 1 : -1);
    attr(d, 'cx', M.lerp(sx, fx, ep).toFixed(1)); attr(d, 'cy', M.lerp(sy, fy, ep).toFixed(1)); const op = M.clamp(ep * 4); d.style.opacity = op.toFixed(3); M.hide(d, op <= 0.01); });
};
const tS2 = T0('S2'), tSh = wt('S2', 'shares'), tS3 = T0('S3'), tBo = wt('S3', 'bond'), tWg = wt('S4', 'weigh');
const KP = {
  Ow: [[0, 200, 120], [tS2, 200, 230]], Hw1: [[0, 90, 340], [tS2 + 0.1, 121, 291]], Hw2: [[0, 310, 340], [tS2 + 0.2, 279, 291]],
  Op1: [[0, 470, 110], [tS3, 500, 230]], Op2: [[0, 650, 110], [tS3 + 0.1, 600, 230]], Hp1: [[0, 420, 350], [tS3 + 0.2, 442, 170]], Hp2: [[0, 720, 350], [tS3 + 0.3, 658, 290]],
};
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
const mLab = [txt(b, 200, 372, 'WATER · H₂O', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }), txt(b, 550, 372, 'HYDROGEN PEROXIDE · H₂O₂', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 })];
const mMass = [txt(b, 200, 404, '2 g H : 16 g O', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 }), txt(b, 550, 404, '2 g H : 32 g O', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 })];
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avD = PUC.avatar($('#bnIn'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same two elements, two compounds!' });
const MR = [['Water', `\\textcolor{${HC}}{2\\,\\text{g H}} + \\textcolor{${OC}}{16\\,\\text{g O}} \\rightarrow 18\\,\\text{g}`, wt('S4', 'Two')], ['Peroxide', `\\textcolor{${HC}}{2\\,\\text{g H}} + \\textcolor{${OC}}{32\\,\\text{g O}} \\rightarrow 34\\,\\text{g}`, wt('S5', 'same')]];
$('#mrs').innerHTML = MR.map(([n, k], i) => `<div class="mr" id="mr${i}" style="top:${76 + i * 92}px"><div class="mn">${n}</div><div class="mv">${K(k)}</div></div>`).join('');
$('#crs').innerHTML = [['Oxygen with 2 g of H', '16 | 32'], ['Ratio of oxygen', '1 : 2']].map(([n, v], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 86}px"><div class="cn">${n}</div><div class="cv" style="color:${OC}">${v}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Oxygen is 16 g in one compound, 32 g in the other. What is the ratio?', opts: ['1 : 2', '8 : 9'], right: 0, why: '16 : 32 = 1 : 2. Compare oxygen with oxygen, for the same 2 g of hydrogen.' });

/* ---------- D: laws 4 and 5 ---------- */
const dsol = PUC.solution($('#dl'), [['Gay Lussac, 1808: simple volume ratios'], [K(`100\\,\\text{mL}\\ ${H2} + 50\\,\\text{mL}\\ ${O2} \\rightarrow 100\\,\\text{mL}\\ ${H2O}`)], ['Avogadro, 1811: equal volumes, equal molecules'], [K(`2${H2} + ${O2} \\rightarrow 2${H2O}`)]], { label: 'LAWS 4 AND 5 · STEP BY STEP', y0: 104, dy: 112 });
const tDs = [wt('D2', 'Gay'), T0('D3'), wt('D4', 'Avogadro'), wt('D5', 'So')];
const dPill = document.createElement('div'); dPill.className = 'pillp ac'; dPill.style.cssText = 'left:36px;top:494px'; dPill.textContent = 'O₂ splits: an oxygen molecule has 2 atoms'; $('#dl').appendChild(dPill);
const vs = $('#vS'), RB = [[36, 84, 'H₂'], [292, 84, 'H₂'], [548, 84, 'O₂']], PB = [[164, 356, 'H₂O'], [420, 356, 'H₂O']], SL = [[52, 92], [100, 58], [148, 102]];
const boxEl = [...RB, ...PB].map(([x, y, f], i) => { const g = mk(vs, 'g', {}); mk(g, 'rect', { x, y, width: 200, height: 150, rx: 14, fill: C.soft, stroke: i < 3 ? C.line : C.ac, 'stroke-width': 2.5 }); txt(g, x + 14, y + 26, `${f} · 50 mL`, { 'font-size': 16, fill: C.ink2, 'font-weight': 600 }); return g; });
const vMid = txt(vs, 392, 300, '2 VOLUMES + 1 VOLUME → 2 VOLUMES', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ac, 'font-weight': 600 });
const vAr = mk(vs, 'path', { d: 'M392 246 V276 M382 266 L392 278 L402 266', stroke: C.ac, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
// atoms: H pairs from boxes 0,1 -> product box 0,1; O2 k splits: atom p -> product p, slot k
const VA = [];
for (let p = 0; p < 2; p++) for (let k = 0; k < 3; k++) {
  const [bx, by] = RB[p], [sx, sy] = SL[k], [qx, qy] = PB[p];
  [-1, 1].forEach(s => VA.push({ el: ball(vs, 0, 0, 9, HC, ''), x0: bx + sx + s * 10, y0: by + sy, x1: qx + sx + s * 17, y1: qy + sy + 11, k, box: p }));
  const [ox, oy] = RB[2]; VA.push({ el: ball(vs, 0, 0, 13, OC, ''), x0: ox + sx + (p ? 13 : -13), y0: oy + sy, x1: qx + sx, y1: qy + sy - 4, k, box: 2 });
}
VA.forEach(a => vs.appendChild(a.el)); // H drawn under O after reorder: put O on top
VA.filter(a => a.box === 2).forEach(a => vs.appendChild(a.el));
const tVol = [wt('D2', 'Gay'), wt('D3', 'give')], tMol = wt('D4', 'equal'), tGo = wt('D5', 'give'), tSplit = wt('D5', 'split');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [[K(`${C_('C')}\\ \\text{fixed at } 12\\,\\text{g}`)], [K(`${O_('O')}:\\ 16\\,\\text{g} \\ \\text{and}\\ 32\\,\\text{g}`)], [K(`16 : 32 = \\textcolor{${C.ok}}{1 : 2}`)], ['Law of multiple proportions']], { label: 'WORKED EXAMPLE', y0: 232, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const stick = (p, x1, x2, y, n) => { for (let i = 0; i < n; i++) mk(p, 'line', { x1, y1: y + (i - (n - 1) / 2) * 14, x2, y2: y + (i - (n - 1) / 2) * 14, stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round' }); };
const gCO = mk(ws, 'g', {}); stick(gCO, 200, 320, 140, 3); ball(gCO, 200, 140, 32, CC, 'C'); ball(gCO, 320, 140, 32, OC, 'O'); txt(gCO, 260, 210, 'CO', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const gCO2 = mk(ws, 'g', {}); stick(gCO2, 450, 690, 140, 2); ball(gCO2, 450, 140, 32, OC, 'O'); ball(gCO2, 570, 140, 32, CC, 'C'); ball(gCO2, 690, 140, 32, OC, 'O'); txt(gCO2, 570, 210, 'CO₂', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const PX = 11, BX0 = 150;
const bar = (y, nO) => { const g = mk(ws, 'g', {}); txt(g, 36, y + 42, nO === 1 ? 'CO' : 'CO₂', { 'font-family': 'Poppins', 'font-size': 28, fill: C.ink, 'font-weight': 700 });
  const bl = [{ x: BX0, w: 12 * PX, c: CC, s: '12 g C' }]; for (let i = 0; i < nO; i++) bl.push({ x: BX0 + 12 * PX + i * 16 * PX, w: 16 * PX, c: OC, s: '16 g O' });
  const els = bl.map(q => { const gg = mk(g, 'g', {}); mk(gg, 'rect', { x: q.x + 2, y, width: q.w - 4, height: 64, rx: 10, fill: q.c }); txt(gg, q.x + q.w / 2, y + 40, q.s, { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 600 }); return gg; });
  return { g, els }; };
const bCO = bar(276, 1), bCO2 = bar(380, 2);
const brk = mk(ws, 'path', { d: `M${BX0 + 12 * PX} 464 V476 H${BX0 + 44 * PX} V464`, stroke: OC, 'stroke-width': 3, fill: 'none' });
const brT = txt(ws, BX0 + 28 * PX, 504, '2 × 16 = 32 g O', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 });
const wChip = document.createElement('div'); wChip.className = 'pillp ac'; wChip.style.cssText = 'left:36px;top:520px'; wChip.textContent = 'Fixed C · oxygen 1 : 2'; $('#wr').appendChild(wChip);

/* ---------- C: five laws ---------- */
const LW = [['Conservation of mass', '1789', 'Conservation', 'ANTOINE LAVOISIER · 1789', 'Total mass before a reaction equals the total mass after.', 'A rusty chain gains what it took from the air.'],
  ['Definite proportions', 'PROUST', 'Definite', 'JOSEPH PROUST · FRENCH CHEMIST', 'A compound always has the same proportion of elements by weight.', 'Pure water: H : O = 1 : 8 by mass'],
  ['Multiple proportions', '1803', 'Multiple', 'JOHN DALTON · 1803', 'Masses of one element joining a fixed mass of the other: small whole number ratio.', 'H₂O and H₂O₂: oxygen 16 g and 32 g, 1 : 2'],
  ['Gaseous volumes', '1808', 'Gaseous', 'JOSEPH LOUIS GAY LUSSAC · 1808', 'Gases react in simple volume ratios, at the same temperature and pressure.', 'H₂ : O₂ : water vapour = 2 : 1 : 2'],
  ["Avogadro's law", '1811', 'Avogadro', 'AMEDEO AVOGADRO · 1811', 'Equal volumes of gases, at the same temperature and pressure, hold equal numbers of molecules.', 'It shows an oxygen molecule has 2 atoms']];
$('#srs').innerHTML = LW.map(([n, y], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 96}px"><div class="nn2">${i + 1}</div><div class="sn2">${n}</div><div class="sw">${y}</div></div>`).join('');
$('#pns').innerHTML = LW.map(([n, , , who, d, e], i) => `<div class="pn" id="pn${i}"><div class="ps">LAW ${i + 1} OF 5</div><div class="ptt">${n}</div><div class="pw2">${who}</div><div class="pd">${d}</div><div class="pe" id="pe${i}">${e}</div></div>`).join('');
const tSc = LW.map((l, i) => wt('C' + (i + 2), l[2]));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A burning candle breaks conservation of mass', right: 'Gases escape. In a closed flask, the mass stays the same' });
const tsv = $('#tS');
const cand = (p, x) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x - 18, y: 120, width: 36, height: 80, rx: 6, fill: '#F2E6C9', stroke: C.ink2, 'stroke-width': 2 }); g.insertAdjacentHTML('beforeend', `<g transform="translate(${x - 16} 82)">${M.icon('flame', 32, C.red, 2.4)}</g>`); return g; };
const gOpen = mk(tsv, 'g', {}); cand(gOpen, 130); [100, 160].forEach(x => mk(gOpen, 'path', { d: `M${x} 76 V36 M${x - 8} 46 L${x} 34 L${x + 8} 46`, stroke: C.mute, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '5 5' }));
txt(gOpen, 130, 236, 'MASS LOST?', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xOpen = mk(tsv, 'path', { d: 'M70 60 L190 200 M190 60 L70 200', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const gClosed = mk(tsv, 'g', {}); mk(gClosed, 'path', { d: 'M420 40 H480 V70 Q540 90 540 150 V206 H360 V150 Q360 90 420 70 Z', fill: '#FBFAF6', stroke: C.ink, 'stroke-width': 3 }); cand(gClosed, 450);
mk(gClosed, 'rect', { x: 340, y: 208, width: 220, height: 14, rx: 5, fill: C.ink }); txt(gClosed, 450, 250, 'CLOSED: SAME MASS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Name the law behind given data, and short mass ratio numericals' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Element X forms two oxides. In the first, 4.0 g of X joins 1.6 g of oxygen. In the second, 2.0 g of X joins 1.2 g of oxygen. What is the ratio of the oxygen masses for a fixed mass of X?', qW: 800,
  opts: ['4 : 3', '2 : 3', '3 : 2', '1 : 2'], right: 1, optW: 474, optY: 380, optH: 90, optFs: 36 });
const so = PUC.solution($('#so'), [[K('\\text{2nd} \\times 2:\\ 4.0\\,\\text{g X},\\ 2.4\\,\\text{g O}')], [K('1.6 : 2.4')], [K(`= \\textcolor{${C.ok}}{2 : 3}`)], ['A skipped fixing X']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'two', 1), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · laws of chemical combination', y0: 100, dy: 72, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Conservation of mass</b>: Lavoisier, 1789 · total mass never changes', '<b>Definite proportions</b>: Proust · water is always H : O = 1 : 8 by mass', '<b>Multiple proportions</b>: Dalton, 1803 · small whole number ratios', '<b>Gaseous volumes</b>: Gay Lussac, 1808 · H₂ : O₂ : vapour = 2 : 1 : 2', '<b>Avogadro</b>, 1811: equal volumes, equal numbers of molecules'] });
const YQ = ['Why does a rusty iron chain weigh more than the clean chain?', 'In pure water, what is the mass ratio of hydrogen to oxygen?', 'What did Avogadro say about equal volumes of gases?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 07', topic: "What is an atom, really? Dalton's Atomic Theory", y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS3 - 0.2, 1.06, 960, 560], [tWg - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) { const ls = [...ft.querySelectorAll('.fl.txt')], mw = Math.max(...ls.map(l => l.offsetWidth)); if (mw > 1010) ls.forEach(l => { l.style.fontSize = Math.floor(30 * 1010 / mw) + 'px'; }); }
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.pn .ptt').forEach(q => { if (q.offsetWidth > 712) q.style.fontSize = Math.floor(52 * 712 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#dl .sol .sx, #wl .sol .sx').forEach(s => { if (s.offsetWidth > 650) s.style.fontSize = Math.floor(28 * 650 / s.offsetWidth) + 'px'; });
  document.querySelectorAll('.lr').forEach(s => { if (s.scrollWidth > 712) s.style.fontSize = Math.floor(24 * 690 / s.scrollWidth) + 'px'; });
}

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#qm' + i), t, wt('H2', 'puzzles') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Five') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'five') - 0.15, 1e9, POP);
  }

  /* P: law 1 */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.setT($('#pqL'), t < T0('P3') ? 'FIVE LAWS OF CHEMICAL COMBINATION' : 'LAW 1 OF 5 · CONSERVATION OF MASS');
    [1, 2, 3, 4, 5].forEach(i => { const el = $('#l5_' + i); M.vis(el, t, wt('P2', 'five') - 0.1 + i * 0.1, 1e9, { ...POP, sc: 0.6 }); const on = i === 1 ? M.io((t - T0('P3')) / 0.3) : 0; setBg(el, mix('#FFFFFF', C.ac, on)); el.style.color = mix(C.dim, '#FFFFFF', on); el.style.borderColor = mix(C.line, C.ac, on); });
    PUC.write($('#lst'), t, wt('P3', 'Matter') - 0.1, 1.2);
    M.vis($('#sc1'), t, wt('P3', 'Antoine') - 0.1, 1e9, { dy: 14 });
    M.vis($('#lr0'), t, wt('P5', 'rusty') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#lr1'), t, wt('P5', 'candle') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#pw'), t, wt('P1', 'weigh') - 0.1, out, { dx: 60, dy: 0, ...o });
    fe.forEach((d, i) => attr(d, 'fill', mix(FEC, RUC, M.io((t - tRust - i * 0.12) / 1.2))));
    airD.forEach((d, i) => { const a = i * 0.9 + t * 0.6, used = M.io((t - tRust - 0.5 - i * 0.2) / 0.8); attr(d, 'cx', (392 + 70 * Math.cos(a)).toFixed(1)); attr(d, 'cy', (240 + 34 * Math.sin(a * 1.3) + used * 80).toFixed(1)); d.style.opacity = (0.85 * (1 - used)).toFixed(3); });
    ba[0].style.opacity = M.clamp((t - tBef) / 0.3); ba[1].style.opacity = M.clamp((t - tAft) / 0.3); feTag.style.opacity = M.clamp((t - wt('P1', 'weigh') - 0.5) / 0.3);
  }

  /* U: law 2 */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#lp'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    M.rise($('#pst'), t, T0('U2') - 0.1, { st: 0.03 });
    [0, 1].forEach(j => { const tin = wt('U3', j ? 'lab' : 'natural') - 0.1; M.vis($('#pl' + j), t, tin, 1e9, { dx: -12, dy: 0 }); M.vis($('#ps' + j), t, tin + 0.1, 1e9, { dx: -12, dy: 0 }); M.vis($('#pb' + j), t, tin, 1e9, { dy: 10 });
      SEG.forEach((_, i) => { const u = M.o3((t - tSeg[i]) / 0.6); $(`#sg${j}_${i}`).style.clipPath = `inset(0 ${((1 - u) * 100).toFixed(1)}% 0 0)`; }); });
    M.vis($('#lg'), t, tSeg[0] - 0.1, 1e9, { dy: 10 });
  }

  /* S + B: law 3 */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tWg + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#rx'), t, tWg - 0.1, z, { dx: 60, dy: 0, ...o }); M.vis($('#ct'), t, T0('B1') - 0.3, z, { dy: 36, ...o });
    MR.forEach(([, , tt], i) => M.vis($('#mr' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    [0, 1].forEach(i => { const el = $('#cr' + i); M.vis(el, t, i ? wt('B3', 'One') - 0.1 : T0('B1'), 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, i ? M.io((t - wt('B3', 'One')) / 0.3) : M.io((t - wt('B1', 'Oxygen')) / 0.3))); });
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const wIn = M.io((t - tS1 - 0.3) / 0.4), pIn = M.io((t - tS1 - 0.6) / 0.4);
    for (const k in A) { const op = k[1] === 'w' ? wIn : pIn; attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`); A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002); }
    ['w1', 'w2'].forEach((k, i) => drawBond(BND[k], P, M.io((t - tSh - 0.6 - i * 0.15) / 0.4), M.io((t - tSh - i * 0.15) / 0.6)));
    ['p0', 'p1', 'p2'].forEach((k, i) => drawBond(BND[k], P, M.io((t - tBo - 0.6 - i * 0.15) / 0.4), M.io((t - tBo - i * 0.15) / 0.6)));
    mLab.forEach((e, i) => { e.style.opacity = M.clamp((t - (i ? tBo : tSh) - 0.8) / 0.3); });
    mMass.forEach((e, i) => { e.style.opacity = M.clamp((t - MR[i][2]) / 0.3); });
    const TAG = [[tS1 + 0.3, 'H AND O · TWO COMPOUNDS'], [tSh, 'H₂O · WATER'], [tBo, 'H₂O₂ · HYDROGEN PEROXIDE'], [tWg, 'FIX HYDROGEN AT 2 g'], [wt('S6', 'Dalton'), 'MULTIPLE PROPORTIONS · 1803']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    const stOff = T0('B1') + 0.2;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['H', wt('S1', 'Hydrogen'), HC], ['O', wt('S1', 'oxygen'), OC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avD(t, stOff + 0.35, z);
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'ratio') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'masses') });
  }

  /* D: laws 4 and 5 */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis(dPill, t, tSplit - 0.1, 1e9, POP);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    boxEl.forEach((g, i) => fade(g, t, i < 3 ? tVol[0] + i * 0.15 : tVol[1] + (i - 3) * 0.15));
    fade(vMid, t, wt('D3', 'Two') - 0.1); M.draw(vAr, t, tVol[1] - 0.2, 0.4);
    VA.forEach(a => { const tin = tMol + a.box * 0.15 + a.k * 0.08, u = M.io((t - tGo - a.k * 0.25 - (a.box === 2 ? 0 : 0.1)) / 0.9);
      const x = M.lerp(a.x0, a.x1, u), y = M.lerp(a.y0, a.y1, u) + Math.sin(Math.PI * u) * (a.box === 2 ? 30 : -20);
      attr(a.el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); const op = M.clamp((t - tin) / 0.25); a.el.style.opacity = op.toFixed(3); M.hide(a.el, op <= 0); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Atoms') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'They') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'ratios') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tco = wt('W2', 'monoxide'), tco2 = wt('W2', 'dioxide');
    fade(gCO, t, tco - 0.2); fade(gCO2, t, tco2 - 0.2);
    [[bCO, tco], [bCO2, tco2]].forEach(([bb, tt]) => { fade(bb.g, t, tt); bb.els.forEach((e, i) => { const u = M.o3((t - tt - i * 0.25) / 0.4); e.style.opacity = u.toFixed(3); e.style.transform = `scale(${(0.6 + 0.4 * u).toFixed(3)})`; e.style.transformOrigin = 'center'; e.style.transformBox = 'fill-box'; }); });
    const hiC = M.io((t - tWs[0]) / 0.3) * (1 - M.io((t - tWs[1]) / 0.3));
    [bCO, bCO2].forEach(bb => { bb.els[0].querySelector('rect').setAttribute('stroke', hiC > 0.05 ? C.gold : 'none'); bb.els[0].querySelector('rect').setAttribute('stroke-width', (5 * hiC).toFixed(2)); });
    M.draw(brk, t, tWs[2] - 0.1, 0.4); brT.style.opacity = M.clamp((t - tWs[2]) / 0.3);
    M.vis(wChip, t, tWs[3] - 0.1, 1e9, POP);
  }

  /* C: five laws */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cpn'), t, tSc[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    LW.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tC1 + 0.3 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tSc[i] + 0.15) / 0.3) * (i < 4 ? 1 - M.io((t - tSc[i + 1] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.sn2').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.sw').style.color = mix(C.mute, C.ac2, on);
      const pn = $('#pn' + i), tin = tSc[i] - 0.15, tout = i < 4 ? tSc[i + 1] - 0.15 : 1e9;
      M.vis(pn, t, tin, tout, { dy: 20, outDur: 0.2, ody: -10 }); M.vis($('#pe' + i), t, tin + 0.8, 1e9, { dy: 12 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'burning') - 0.1, tStrike: wt('X3', 'gases') - 0.1, tRight: wt('X3', 'Burn') - 0.1 });
    fade(gOpen, t, wt('X2', 'candle') - 0.1); M.draw(xOpen, t, wt('X3', 'escape') - 0.1, 0.4); fade(gClosed, t, wt('X3', 'closed') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
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
