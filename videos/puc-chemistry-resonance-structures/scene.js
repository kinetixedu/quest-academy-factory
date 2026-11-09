// PUC Chemistry Ep 44: Resonance structures (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: O violet, C ink, moving electron pair orange, bond length (ruler) teal, hybrid green, drawing I blue, drawing II yellow
const NC = C.ac, HC = C.ink, EC = '#C8461B', OC = '#7A4FE0', HY = '#2E9E4F', BL = '#2F6FD6', YL = '#E0A800';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, m = s => `\\mathrm{${s}}`;
const O_ = tc(OC, m('O')), C_ = tc(HC, m('C')), Lc = s => tc(NC, s), Hc = s => tc(HY, s);
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const tr = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
const L2 = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
Object.assign(M.IC, {
  palette: ['M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z', 'M13.5 6.5h.01', 'M17.5 10.5h.01', 'M8.5 7.5h.01', 'M6.5 12.5h.01'],
  coffee: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['palette', 'Blue + yellow paint', 'ONE NEW GREEN', 'blue', 'MIX'], ['coffee', 'Milk in tea', 'ONE NEW COLOUR', 'milk', 'MIX'], ['cloud', 'Grey sky', 'NOT WHITE, NOT BLACK', 'grey', 'BETWEEN']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['O₃: 1 double + 1 single', wt('H3', 'ozone'), C.ac2], ['Short + long?', wt('H4', 'short'), C.redBg], ['Both the same!', wt('H4', 'same'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: paint mix ---------- */
$('#mdefI').innerHTML = M.icon('palette', 28, '#fff', 2.2);
const QR = [['Lewis structure', 'DOT DRAWING', T0('P1')], ['Canonical structure', 'ONE DRAWING', wt('P3', 'canonical')], ['Double headed arrow ↔', 'JOINS DRAWINGS', wt('P3', 'arrow')], ['Resonance hybrid', 'THE REAL MOLECULE', wt('P4', 'hybrid')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
const pB = mk(ps, 'circle', { r: 92, fill: BL, opacity: 0.9 }), pY = mk(ps, 'circle', { r: 92, fill: YL, opacity: 0.9 }), pG = mk(ps, 'circle', { cx: 392, cy: 250, r: 112, fill: HY });
const pLb = [txt(ps, 0, 380, 'DRAWING I', { 'text-anchor': 'middle', 'font-weight': 600, fill: BL }), txt(ps, 0, 380, 'DRAWING II', { 'text-anchor': 'middle', 'font-weight': 600, fill: '#9A7400' })];
const pAr = txt(ps, 392, 266, '↔', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 56, 'font-weight': 700, fill: HC });
const pGT = txt(ps, 392, 410, 'HYBRID = THE REAL MOLECULE', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: HY });
const pNo = txt(ps, 392, 470, 'ALWAYS GREEN · NEVER FLIPS', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.mute });

/* ---------- ozone helper ---------- */
const OA = 58.4 * Math.PI / 180, SC = 1.3;
const oz = (p, cx, cy, r = 42, fs = 30, rul = true) => {
  const g = mk(p, 'g', {}), bl = mk(g, 'g', {}), rl = mk(g, 'g', {}), al = mk(g, 'g', {}), dl = mk(g, 'g', {});
  const sg = [0, 1].map(() => mk(bl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  const pi = [0, 1].map(() => mk(bl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  const da = [0, 1].map(() => mk(bl, 'line', { stroke: HY, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-dasharray': '10 9' }));
  const at = [0, 1, 2].map(() => atomG(al, r, OC, 'O', fs));
  const ep = [0, 1].map(() => mk(dl, 'circle', { r: 7, fill: EC }));
  const ru = [0, 1].map(() => { const gg = mk(rl, 'g', {}); return { gg, l: mk(gg, 'line', { stroke: NC, 'stroke-width': 4 }), t: txt(gg, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 600, fill: NC }) }; });
  if (!rul) op(rl, 0);
  const Z = { g, rl, ru, ep };
  // s: 0 = drawing I (left double), 1 = drawing II; h: hybrid amount; e: electron pair visibility
  Z.set = (s, h, e = 1) => {
    const lp = [M.lerp(M.lerp(121, 148, s), 128, h), M.lerp(M.lerp(148, 121, s), 128, h)];
    tr(at[0], cx, cy); const pts = [];
    [-1, 1].forEach((sd, i) => {
      const ux = sd * Math.sin(OA), uy = Math.cos(OA), d = lp[i] * SC, x = cx + ux * d, y = cy + uy * d; tr(at[i + 1], x, y); pts.push([x, y, ux, uy]);
      const nx = -uy, ny = ux; // in-plane normal
      L2(sg[i], cx, cy, x, y);
      const pf = (i ? s : 1 - s) * (1 - h), k = 11;
      L2(pi[i], cx + nx * k * sd, cy + ny * k * sd, x + nx * k * sd, y + ny * k * sd); op(pi[i], pf);
      L2(da[i], cx + nx * k * sd + ux * r, cy + ny * k * sd + uy * r, x + nx * k * sd - ux * r, y + ny * k * sd - uy * r); op(da[i], h);
      if (pf > 0.01 || h > 0.01) attr(sg[i], 'transform', `translate(${(-nx * 5 * sd * Math.max(pf, h)).toFixed(1)} ${(-ny * 5 * sd * Math.max(pf, h)).toFixed(1)})`);
      const ox = -Math.cos(OA) * (sd < 0 ? 1 : -1), oy = -Math.sin(OA); // outward normal
      const o1 = 52, o2 = 92; L2(ru[i].l, cx + ox * o1 + ux * r * 0.3, cy + oy * o1 + uy * r * 0.3, x + ox * o1 - ux * r * 0.3, y + oy * o1 - uy * r * 0.3);
      attr(ru[i].t, 'x', ((cx + x) / 2 + ox * o2).toFixed(1)); attr(ru[i].t, 'y', ((cy + y) / 2 + oy * o2 + 10).toFixed(1)); M.setT(ru[i].t, `${Math.round(lp[i])}`);
    });
    // electron pair travels from left pi bond, over the middle atom, to the right pi bond
    const mid = i => [(cx + pts[i][0]) / 2, (cy + pts[i][1]) / 2], [ax, ay] = mid(0), [bx, by] = mid(1), qx = cx, qy = cy - 120;
    const u = s, px = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * qx + u * u * bx, py = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * qy + u * u * by;
    ep.forEach((c, j) => { attr(c, 'cx', (px + (j ? 9 : -9)).toFixed(1)); attr(c, 'cy', py.toFixed(1)); op(c, e * (1 - h)); });
    Z.mids = [[ax, ay], [bx, by], [qx, qy]];
  };
  return Z;
};

/* ---------- S: bench ---------- */
const b = $('#bS');
const ph1 = mk(b, 'g', {});
const O3 = oz(ph1, 392, 150);
O3.set(0, 0);
const [[cax, cay], [cbx, cby]] = O3.mids;
const cArr = mk(ph1, 'path', { d: `M${cax - 14} ${cay - 20} Q392 0 ${cbx + 14} ${cby - 20}`, fill: 'none', stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const cHead = mk(ph1, 'path', { d: `M${cbx + 2} ${cby - 34} L${cbx + 14} ${cby - 20} L${cbx + 30} ${cby - 28}`, fill: 'none', stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
// number line: double 121, hybrid 128, single 148
const nl = mk(ph1, 'g', {}); const NX = v => 132 + (v - 112) * 13.5;
mk(nl, 'line', { x1: NX(114), x2: NX(152), y1: 500, y2: 500, stroke: C.ink, 'stroke-width': 3 });
const nlT = [[121, 'DOUBLE 121', HC], [148, 'SINGLE 148', HC]].map(([v, s, c]) => { mk(nl, 'line', { x1: NX(v), x2: NX(v), y1: 488, y2: 512, stroke: c, 'stroke-width': 3 }); return txt(nl, NX(v), 540, s, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: c }); });
const nlD = mk(nl, 'circle', { cx: NX(128), cy: 500, r: 12, fill: HY }); const nlH = txt(nl, NX(128), 476, 'OZONE 128', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: HY });
// phase D: carbonate
const phD = mk(b, 'g', {});
const CX = 392, CY = 280, CR = 150, CA = [-90, 30, 150].map(a => a * Math.PI / 180);
const cbl = mk(phD, 'g', {}), cal = mk(phD, 'g', {}), cdl = mk(phD, 'g', {});
const cS = CA.map(() => mk(cbl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const cP = CA.map(() => mk(cbl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const cD = CA.map(() => mk(cbl, 'line', { stroke: HY, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-dasharray': '10 9' }));
const cO = CA.map(a => { const g = atomG(cal, 40, OC, 'O', 28); tr(g, CX + CR * Math.cos(a), CY + CR * Math.sin(a)); return g; });
const cC = atomG(cal, 44, HC, 'C', 30); tr(cC, CX, CY);
const cE = [0, 1].map(() => mk(cdl, 'circle', { r: 7, fill: EC }));
const cChg = txt(phD, 610, 120, '2−', { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: HC });
const cBr = mk(phD, 'path', { d: 'M196 96 h-20 v330 h20 M588 96 h20 v330 h-20', fill: 'none', stroke: HC, 'stroke-width': 4 });
CA.forEach((a, i) => { const ux = Math.cos(a), uy = Math.sin(a), x = CX + CR * ux, y = CY + CR * uy; L2(cS[i], CX, CY, x, y); const nx = -uy * 11, ny = ux * 11; L2(cP[i], CX + nx + ux * 44, CY + ny + uy * 44, x + nx - ux * 40, y + ny - uy * 40); L2(cD[i], CX + nx + ux * 44, CY + ny + uy * 44, x + nx - ux * 40, y + ny - uy * 40); });
const c13 = CA.map(a => txt(phD, CX + 84 * Math.cos(a) + 44 * Math.sin(a), CY + 84 * Math.sin(a) - 44 * Math.cos(a) + 9, '1⅓', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: HY }));
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// right cards
const rxA = PUC.solution($('#rxA'), [[K(`${O_}{=}${O_}: ${Lc('121\\ \\text{pm}')}`)], [K(`${O_}{-}${O_}: ${Lc('148\\ \\text{pm}')}`)], [K(`\\mathrm{O_3}\\ \\text{measured: } ${Hc('128\\ \\text{pm, both}')}`)]], { label: 'THE RULER · OZONE', y0: 80, dy: 62 });
const tRA = [wt('S2', 'ruler'), wt('S2', 'forty'), wt('S5', 'both')];
const rxD = PUC.solution($('#rxD'), [[K(`\\text{3 drawings: the double bond moves}`)], [K(`\\text{all 3 } ${C_}{-}${O_} \\text{ equal} \\Rightarrow ${Hc('\\text{hybrid}')}`)], [K(`E_{${Hc('\\text{hybrid}')}} < E_{\\text{any drawing}}`)]], { label: 'CARBONATE · STEP BY STEP', y0: 80, dy: 62 });
const tRD = [T0('D4'), wt('D5', 'equal'), wt('D6', 'lower')];
const CRA = [['Drawing I', BL, '121 · 148', HC, wt('S2', 'drawing')], ['Drawing II', '#9A7400', '148 · 121', HC, T0('S4')], ['Real ozone', HY, '128 · 128', HY, wt('S5', 'measure')]];
$('#crA').innerHTML = CRA.map(([n, c, v, vc], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce" style="font:600 26px Poppins;top:12px;color:${c}">${n}</div><div class="cn">left · right, pm</div><div class="cv" style="color:${vc}">${v}</div></div>`).join('');
const LND = [['One drawing: 1 short bond, 2 long bonds', BL, wt('D3', 'predicts')], ['Real ion: 3 equal C-O bonds', HY, wt('D5', 'equal')]];
$('#lnD').innerHTML = LND.map(([s, c], i) => `<div class="ln" id="ld${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const ISO = [[`${C_}{=}${O_}`, 'double bond', '121', HC], [`\\mathrm{CO_2}`, 'measured', '115', HY], [`${C_}{\\equiv}${O_}`, 'triple bond', '110', HC]];
$('#crE').innerHTML = ISO.map(([f, n, v, c], i) => `<div class="cr" id="ce${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${n}</div><div class="cv" style="color:${c}">${v}</div></div>`).join('');
const tIso = [wt('D7', 'double'), wt('D7', 'fifteen'), wt('D7', 'triple')];
const th1 = PUC.think($('#th1'), { q: 'Does ozone keep flipping between drawing I and II?', opts: ['Yes, it flips', 'No, it is always the hybrid'], right: 1, why: 'Like green paint, it is always the mix. Both bonds stay at 128 pm.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(BL, '\\text{drawing I}')} \\leftrightarrow ${tc('#9A7400', '\\text{drawing II}')} \\;\\Rightarrow\\; ${Hc('\\text{one real hybrid}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{one drawing: } 2 + 1 + 1 = 4 \\text{ bonds}`)],
  [K(`\\text{shared by 3 } ${C_}{-}${O_} \\text{ links}`)],
  [K(`4 \\div 3 = ${Hc('1.33')}`)],
  [K(`1 < ${Hc('1.33')} < 2`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Four'), T0('W4'), wt('W5', 'Four'), wt('W5', 'little')];
const s2 = $('#wS2');
const BY = 470, BS = 160;
mk(s2, 'line', { x1: 120, x2: 664, y1: BY, y2: BY, stroke: C.ink, 'stroke-width': 3 });
const WB = [[1, 'SINGLE', HC, 0], [4 / 3, 'CARBONATE', HY, 2], [2, 'DOUBLE', HC, 0]];
const wb = WB.map(([v, l, c], i) => { const g = mk(s2, 'g', {}); const x = 170 + i * 170; const r = mk(g, 'rect', { x, width: 120, rx: 8, fill: c }); txt(g, x + 60, BY + 34, l, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: c }); const vt = txt(g, x + 60, 0, v === 1 ? '1' : v === 2 ? '2' : '1.33', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: c }); return { g, r, v, vt }; });
const wbT = [tWs[1], tWs[2], tWs[1] + 0.3];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Ozone stays in drawing I, then jumps to drawing II', right: 'No flip, no balance: always the hybrid, both bonds 128 pm' });
const tsv = $('#tS'); const tOz = mk(tsv, 'g', { transform: 'translate(-40 22) scale(0.8)' }); const tZ = oz(tOz, 392, 40, 42, 30); tZ.set(0, 1, 0);
const where = PUC.where($('#wa'), { on: [], type: 'Draw resonance structures, find bond order by resonance, compare bond lengths' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `Which order of C-O bond length is correct?`, qW: 760,
  opts: [K('\\mathrm{CO < CO_2 < CO_3^{2-}}'), K('\\mathrm{CO_3^{2-} < CO_2 < CO}'), K('\\mathrm{CO_2 < CO < CO_3^{2-}}'), K('\\mathrm{CO < CO_3^{2-} < CO_2}')], right: 0, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{CO}: \\text{bond order } 3`)], [K(`\\mathrm{CO_2}: \\text{bond order } 2`)], [K(`\\mathrm{CO_3^{2-}}: 4 \\div 3 = ${Hc('1.33')}`)], [K(`\\text{order} \\uparrow \\Rightarrow \\text{length} \\downarrow`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'has', 1), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · resonance structures', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Resonance</b>: one molecule, two or more Lewis drawings (canonical structures)', '<b>Hybrid</b>: the real molecule, a blend · never flips · no equilibrium', '<b>Ozone</b>: drawn as 121 + 148 pm · measured 128 pm for both bonds', '<b>Carbonate</b>: 3 drawings · 3 equal C-O bonds · bond order 4 ÷ 3 = 1.33', '<b>Stable</b>: hybrid energy < any one drawing · CO₂: C-O 115 pm'] });
const YQ = ['Why are both bonds in ozone the same length?', 'How many resonance structures does the carbonate ion have?', 'Why is a resonance hybrid more stable than any one drawing?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 45', topic: 'Why does water have ends, but CO₂ does not? Polarity and Dipole Moment', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tSl = wt('S3', 'slides');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSl - 0.3, 1.08, 760, 500], [T0('S4') + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tSw = M.keys([[0, 0], [tSl, 0], [tSl + 1.4, 1]], 1.4);
const tKs = [T0('D3'), wt('D4', 'any'), wt('D4', 'three'), wt('D4', 'drawings')];

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['mix', 'switch', 'molecules'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'switch') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'Same') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const a1 = M.io((t - wt('P2', 'two') + 0.1) / 0.4), mu = M.io((t - wt('P4', 'mix') + 0.1) / 1.0);
    attr(pB, 'cx', M.lerp(210, 392, mu).toFixed(1)); attr(pY, 'cx', M.lerp(574, 392, mu).toFixed(1)); attr(pB, 'cy', 250); attr(pY, 'cy', 250);
    op(pB, a1 * (1 - mu)); op(pY, a1 * (1 - mu));
    attr(pLb[0], 'x', 210); attr(pLb[1], 'x', 574); pLb.forEach(e => op(e, M.io((t - wt('P3', 'canonical')) / 0.3) * (1 - mu)));
    op(pAr, M.io((t - wt('P3', 'arrow')) / 0.3) * (1 - mu)); op(pG, mu); op(pGT, M.io((t - wt('P4', 'hybrid')) / 0.3)); op(pNo, M.io((t - T0('P5')) / 0.3));
  }

  /* S + D: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const w1 = t < tD1 - 0.45, a = w1 ? tS1 + 0.05 : tD1 + 0.05, z = w1 ? OUT('B2') : OUT('T1');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    M.vis($('#rx'), t, w1 ? wt('S2', 'ruler') - 0.3 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, w1 ? wt('S2', 'drawing') - 0.2 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'flipping') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Ozone') });
    op(ph1, w1 ? M.clamp((t - tS1 - 0.2) / 0.3) : 0); op(phD, w1 ? 0 : 1);
    M.setT($('#bnL'), w1 ? 'MOLECULE BENCH · OZONE' : 'MOLECULE BENCH · CARBONATE ION');
    if (w1) {
      const hy = M.io((t - wt('S5', 'measure') - 0.2) / 1.2);
      O3.set(tSw(t), hy, M.io((t - T0('S2')) / 0.4));
      op(O3.rl, M.io((t - wt('S2', 'ruler') + 0.1) / 0.3));
      M.drawU(cArr, M.io((t - wt('S3', 'electrons')) / 0.6) * (1 - M.io((t - T0('S4') - 0.4) / 0.3))); op(cHead, M.io((t - wt('S3', 'electrons') - 0.5) / 0.2) * (1 - M.io((t - T0('S4') - 0.4) / 0.3)));
      op(nl, M.io((t - T0('S6') + 0.1) / 0.4)); op(nlD, M.io((t - wt('S6', 'between') + 0.1) / 0.3)); op(nlH, M.io((t - wt('S6', 'between') + 0.1) / 0.3));
    } else {
      const k = tKs.reduce((acc, tt, i) => t >= tt ? i : acc, 0) % 3, hy = M.io((t - wt('D5', 'hybrid') + 0.1) / 1.0);
      op(cbl, M.io((t - T0('D2') - 0.3) / 0.3)); op(cal, M.io((t - T0('D2')) / 0.3)); op(cChg, M.io((t - T0('D2') - 0.4) / 0.3)); op(cBr, M.io((t - T0('D2') - 0.4) / 0.3));
      const pOn2 = M.io((t - wt('D3', 'double') + 0.1) / 0.3);
      cP.forEach((l, i) => op(l, (i === k ? 1 : 0) * pOn2 * (1 - hy))); cD.forEach(l => op(l, hy));
      const ang = CA[k], ex = CX + 92 * Math.cos(ang) - 11 * Math.sin(ang) * 2, ey = CY + 92 * Math.sin(ang) + 11 * Math.cos(ang) * 2;
      cE.forEach((c, j) => { attr(c, 'cx', (ex + (j ? 8 : -8) * Math.sin(ang)).toFixed(1)); attr(c, 'cy', (ey - (j ? 8 : -8) * Math.cos(ang)).toFixed(1)); op(c, pOn2 * (1 - hy)); });
      c13.forEach(e => op(e, M.io((t - T0('D6') + 0.2) / 0.3) * hy));
    }
    const TAG = w1 ? [[T0('S2'), 'DRAWING I'], [T0('S4'), 'DRAWING II'], [wt('S5', 'measure'), 'MEASURED · 128 | 128'], [T0('S7'), 'RESONANCE HYBRID']]
      : [[T0('D2'), 'CO₃²⁻'], [wt('D3', 'double'), 'DRAWING 1 OF 3'], [wt('D4', 'three'), '3 DRAWINGS'], [wt('D5', 'hybrid'), 'HYBRID · 3 EQUAL BONDS'], [T0('D6'), 'LOWER ENERGY · STABLE'], [T0('D7'), 'ALSO: CO₂']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1, T0('D7') - 0.2, { dy: 0, outDur: 0.25, ody: 0 }); M.vis($('#ctE'), t, T0('D7') - 0.1, 1e9, { dy: 0 });
    CRA.forEach(([, , , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LND.forEach(([, , tt], i) => M.vis($('#ld' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    tIso.forEach((tt, i) => M.vis($('#ce' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'real') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'blend') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'blend') + 0.5, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wb.forEach(({ g, r, v, vt }, i) => { const bu = M.io((t - wbT[i]) / 0.6), h = v * BS * bu; attr(r, 'y', (BY - h).toFixed(1)); attr(r, 'height', Math.max(0.1, h).toFixed(1)); attr(vt, 'y', (BY - h - 16).toFixed(1)); op(g, bu > 0 ? 1 : 0); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'flipping') - 0.1 });
    fade(tOz, t, wt('X3', 'hybrid') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'order'), tCount, tAns });
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
