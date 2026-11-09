// PUC Chemistry Ep 45: Polarity of bonds and dipole moment (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: H ink, F blue, O violet, N teal, C slate, B/Be brown, shared pair + bond pull arrows orange, total dipole green, distance teal, cation red, Cl slate-blue
const NC = C.ac, HC = C.ink, EC = '#C8461B', OC = '#7A4FE0', FC = '#2F6FD6', CC = '#4A5568', BC = '#8A6D3B', TC = '#2E9E4F', KC = '#D6336C', LC = '#5B6B8C';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, m = s => `\\mathrm{${s}}`;
const Tc = s => tc(TC, s);
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); const c = mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); g.c = c; g.l = g.lastChild; return g; };
const tr = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
const L2 = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
// arrow: line + head, set(x1,y1,x2,y2)
const arw = (p, col, w = 5, hs = 14, cross = false) => { const g = mk(p, 'g', {}), l = mk(g, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }), h = mk(g, 'path', { fill: col }), x = cross ? mk(g, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }) : null;
  g.set = (x1, y1, x2, y2) => { const d = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / d, uy = (y2 - y1) / d, bx = x2 - ux * hs, by = y2 - uy * hs; L2(l, x1, y1, bx, by);
    attr(h, 'd', `M${x2.toFixed(1)} ${y2.toFixed(1)} L${(bx - uy * hs * 0.6).toFixed(1)} ${(by + ux * hs * 0.6).toFixed(1)} L${(bx + uy * hs * 0.6).toFixed(1)} ${(by - ux * hs * 0.6).toFixed(1)}Z`);
    if (x) { const cx = x1 + ux * 16, cy = y1 + uy * 16; L2(x, cx - uy * 12, cy + ux * 12, cx + uy * 12, cy - ux * 12); } return g; }; return g; };
const bnd = (p, x1, y1, x2, y2, n = 1) => { for (let i = 0; i < n; i++) { const k = (i - (n - 1) / 2) * 16, d = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / d * k, ny = (x2 - x1) / d * k; mk(p, 'line', { x1: x1 + nx, y1: y1 + ny, x2: x2 + nx, y2: y2 + ny, stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round' }); } };
Object.assign(M.IC, {
  moveh: ['m18 8 4 4-4 4', 'M2 12h20', 'm6 8-4 4 4 4'],
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['moveh', 'Tug of war', 'UNEQUAL PULL', 'tug', 'PULL'], ['magnet', 'A magnet', 'NORTH END, SOUTH END', 'magnet', 'TWO ENDS'], ['droplet', 'Oil and water', 'WILL NOT MIX', 'Oil', 'POLAR']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['Water: + end, − end', wt('H3', 'plus'), C.ac2], ['CO₂: no ends?', wt('H4', 'carbon'), C.redBg], ['Add the pulls', wt('H5', 'add'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: tug of war ---------- */
$('#mdefI').innerHTML = M.icon('moveh', 28, '#fff', 2.2);
const QR = [['Electronegativity', 'PULL ON A SHARED PAIR', T0('P1')], ['Nonpolar covalent', 'EQUAL PULL · H₂', wt('P2', 'nonpolar')], ['Polar covalent', 'UNEQUAL PULL · HF', wt('P3', 'polar')], ['Dipole', 'TWO CHARGED ENDS', T0('P5')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
mk(ps, 'line', { x1: 180, x2: 604, y1: 250, y2: 250, stroke: '#B08A5A', 'stroke-width': 8, 'stroke-linecap': 'round' });
mk(ps, 'line', { x1: 392, x2: 392, y1: 320, y2: 340, stroke: C.mute, 'stroke-width': 3 }); txt(ps, 392, 368, 'MIDDLE', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 });
const pA = atomG(ps, 44, HC, 'H', 32); tr(pA, 150, 250);
const pBH = atomG(ps, 44, HC, 'H', 32), pBF = atomG(ps, 58, FC, 'F', 40); tr(pBH, 634, 250); tr(pBF, 634, 250);
const pPr = [0, 1].map(() => mk(ps, 'circle', { r: 9, fill: EC }));
const pD = [txt(ps, 150, 180, 'δ+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 36, 'font-weight': 700, fill: HC }), txt(ps, 634, 166, 'δ−', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 36, 'font-weight': 700, fill: FC })];
const pDi = txt(ps, 392, 470, 'DI = TWO · POLE = END', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: TC });

/* ---------- S: bench ---------- */
const b = $('#bS');
const ph1 = mk(b, 'g', {});
const cl = mk(ph1, 'ellipse', { cy: 200, ry: 70, fill: FC, opacity: 0.1 });
mk(ph1, 'line', { x1: 232, x2: 552, y1: 200, y2: 200, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const aL = atomG(ph1, 40, HC, 'H', 30); tr(aL, 232, 200);
const aRH = atomG(ph1, 40, HC, 'H', 30), aRF = atomG(ph1, 52, FC, 'F', 36); tr(aRH, 552, 200); tr(aRF, 552, 200);
const sPr = [0, 1].map(() => mk(ph1, 'circle', { r: 8, fill: EC }));
const sD = [txt(ph1, 232, 132, 'δ+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 32, 'font-weight': 700, fill: HC }), txt(ph1, 552, 120, 'δ−', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 32, 'font-weight': 700, fill: FC })];
const sAr = arw(ph1, TC, 6, 20, true).set(232, 300, 552, 300);
const sRu = mk(ph1, 'g', {}); mk(sRu, 'line', { x1: 232, x2: 552, y1: 370, y2: 370, stroke: NC, 'stroke-width': 4 }); [232, 552].forEach(x => mk(sRu, 'line', { x1: x, x2: x, y1: 358, y2: 382, stroke: NC, 'stroke-width': 4 })); txt(sRu, 392, 404, 'd', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 30, 'font-weight': 600, fill: NC });
const sMu = document.createElement('div'); sMu.className = 'abs'; sMu.style.cssText = 'left:0;width:784px;top:440px;text-align:center;font-size:44px'; sMu.innerHTML = K(`\\mu = q \\times ${tc(NC, 'd')}`); $('#bn').appendChild(sMu);
// phase 2: CO2 pulls cancel
const ph2 = mk(b, 'g', {});
const COX = [222, 392, 562];
bnd(ph2, 222, 200, 392, 200, 2); bnd(ph2, 392, 200, 562, 200, 2);
[['O', OC, 46, 32], ['C', CC, 44, 30], ['O', OC, 46, 32]].forEach(([l, c, r, fs], i) => tr(atomG(ph2, r, c, l, fs), COX[i], 200));
const cA = [arw(ph2, EC, 6, 18), arw(ph2, EC, 6, 18)];
const cZ = txt(ph2, 392, 440, 'TOTAL μ = 0', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, 'font-weight': 700, fill: TC });
const cDot = mk(ph2, 'circle', { cx: 392, cy: 350, r: 10, fill: TC });
// phase D: shapes grid
const phD = mk(b, 'g', {});
const cell = (cx, cy) => mk(phD, 'g', {});
const gBe = cell(), gBF = cell(), gNH = cell(), gNF = cell();
{ const cx = 206, cy = 190; bnd(gBe, cx - 110, cy, cx + 110, cy); tr(atomG(gBe, 30, BC, 'Be', 22), cx, cy); [-1, 1].forEach(s => tr(atomG(gBe, 30, FC, 'F', 24), cx + s * 110, cy));
  [-1, 1].forEach(s => arw(gBe, EC, 4, 12).set(cx + s * 24, cy - 42, cx + s * 96, cy - 42)); txt(gBe, cx, cy + 82, 'BeF₂ · μ = 0', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: TC }); }
{ const cx = 578, cy = 176; [-90, 30, 150].forEach(a => { const r = a * Math.PI / 180; bnd(gBF, cx, cy, cx + 92 * Math.cos(r), cy + 92 * Math.sin(r)); });
  tr(atomG(gBF, 28, BC, 'B', 22), cx, cy); [-90, 30, 150].forEach(a => { const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); tr(atomG(gBF, 26, FC, 'F', 22), cx + 92 * c, cy + 92 * s); arw(gBF, EC, 4, 12).set(cx + 30 * c - 22 * s, cy + 30 * s + 22 * c, cx + 66 * c - 22 * s, cy + 66 * s + 22 * c); });
  txt(gBF, cx, cy + 108, 'BF₃ · μ = 0', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: TC }); }
const pyr = (g, cx, cy, lab, col, toN, net) => {
  const N = [cx, cy - 46], X = [[cx - 86, cy + 34], [cx, cy + 58], [cx + 86, cy + 34]];
  X.forEach(p => bnd(g, N[0], N[1], p[0], p[1]));
  const lp = mk(g, 'g', {}); mk(lp, 'ellipse', { cx: N[0], cy: N[1] - 48, rx: 22, ry: 30, fill: NC, opacity: 0.15 }); [-8, 8].forEach(d => mk(lp, 'circle', { cx: N[0] + d, cy: N[1] - 56, r: 6, fill: NC }));
  tr(atomG(g, 30, NC, 'N', 24), N[0], N[1]); X.forEach(p => tr(atomG(g, 24, col, lab, 20), p[0], p[1]));
  const ba = mk(g, 'g', {}); X.forEach(([x, y]) => { const a = toN ? [x + (N[0] - x) * 0.3, y + (N[1] - y) * 0.3, x + (N[0] - x) * 0.72, y + (N[1] - y) * 0.72] : [N[0] + (x - N[0]) * 0.3, N[1] + (y - N[1]) * 0.3, N[0] + (x - N[0]) * 0.72, N[1] + (y - N[1]) * 0.72]; const dx = -(N[1] - y), dy = N[0] - x, dd = Math.hypot(dx, dy); arw(ba, EC, 4, 11).set(a[0] + dx / dd * 16, a[1] + dy / dd * 16, a[2] + dx / dd * 16, a[3] + dy / dd * 16); });
  const na = arw(g, TC, 7, 18).set(cx + 140, cy + 30, cx + 140, cy + 30 - net); return { lp, ba, na };
};
const pNH = pyr(gNH, 196, 452, 'H', HC, true, 110), pNF = pyr(gNF, 560, 452, 'F', FC, false, 24);
const lNH = txt(gNH, 196, 556, 'NH₃ · 4.90', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: TC }), lNF = txt(gNF, 560, 556, 'NF₃ · 0.80', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: TC });
mk(phD, 'line', { x1: 392, x2: 392, y1: 80, y2: 540, stroke: C.line || '#E3E1DA', 'stroke-width': 2, 'stroke-dasharray': '4 8' }); mk(phD, 'line', { x1: 36, x2: 748, y1: 306, y2: 306, stroke: C.line || '#E3E1DA', 'stroke-width': 2, 'stroke-dasharray': '4 8' });
// phase P7: polarisation
const phE = mk(b, 'g', {});
const ion = (g, cx, cy, rc, cLab, rA) => { const cloud = mk(g, 'ellipse', { cx: cx + 200, cy, rx: rA, ry: rA, fill: LC, opacity: 0.22 }); const an = atomG(g, 34, LC, 'Cl⁻', 22); tr(an, cx + 200, cy); const ca = atomG(g, rc, KC, cLab, rc > 26 ? 22 : 18); tr(ca, cx, cy); return { cloud, cx, cy, rA }; };
const ionE = ion(phE, 210, 240, 24, 'Li⁺', 96);
txt(phE, 210, 380, 'SMALL CATION', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: KC }); txt(phE, 410, 380, 'BIG ANION CLOUD', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: LC });
const eAr = arw(phE, KC, 5, 14).set(330, 240, 250, 240);
const eLab = txt(phE, 392, 470, 'CLOUD PULLED OUT OF SHAPE = POLARISATION', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: KC });
const cloudSet = (I, u, k = 1) => { attr(I.cloud, 'cx', (I.cx + 200 - 56 * u * k).toFixed(1)); attr(I.cloud, 'rx', (I.rA + 40 * u * k).toFixed(1)); attr(I.cloud, 'ry', (I.rA - 22 * u * k).toFixed(1)); };
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// right cards
const rxA = PUC.solution($('#rxA'), [[K(`\\mu = q \\times ${tc(NC, 'd')}`)], [K(`\\text{unit: debye, D}`)], [K(`1\\ \\text{D} = 3.33564 \\times 10^{-30}\\ \\text{C m}`)]], { label: 'DIPOLE MOMENT', y0: 80, dy: 62 });
const tRA = [T0('S4'), wt('S5', 'debye'), wt('S5', 'three')];
const rxD = PUC.solution($('#rxD'), [[K(`\\mathrm{BeF_2},\\ \\mathrm{BF_3}: ${Tc('\\mu = 0')}`)], [K(`\\mathrm{NH_3}: ${Tc('4.90')} \\times 10^{-30}\\ \\text{C m}`)], [K(`\\mathrm{NF_3}: ${Tc('0.80')} \\times 10^{-30}\\ \\text{C m}`)]], { label: 'SHAPE · STEP BY STEP', y0: 80, dy: 62 });
const tRD = [wt('D3', 'Zero'), wt('D5', 'Four'), wt('D6', 'Only')];
const CRA = [[`${tc(HC, m('H_2'))}`, 'equal pull', '0', T0('S1')], [`${tc(HC, m('H'))}${tc(FC, m('F'))}`, 'one polar bond', 'not 0', T0('S2')], [`\\mathrm{CO_2}`, 'two polar bonds', '0', wt('S7', 'cancel')]];
$('#crA').innerHTML = CRA.map(([f, n, v], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${n}</div><div class="cv" style="color:${TC}">${v}</div></div>`).join('');
const LND = [['Equal pulls in a straight line or flat triangle cancel', TC, T0('D2')], ['A lone pair can add to the pull, or fight it', NC, wt('D4', 'lone')]];
$('#lnD').innerHTML = LND.map(([s, c], i) => `<div class="ln" id="ld${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const ISO = [[tc(KC, '\\mathrm{Li^+}'), 'small cation', 'pulls', KC], [tc(LC, '\\mathrm{Cl^-}'), 'big anion cloud', 'bends', LC], ['\\text{bond}', 'polarisation', 'some covalent', TC]];
$('#crE').innerHTML = ISO.map(([f, n, v, c], i) => `<div class="cr" id="ce${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${n}</div><div class="cv" style="color:${c};font-size:24px;top:12px">${v}</div></div>`).join('');
const tIso = [wt('D7', 'cation'), wt('D7', 'anion'), wt('D7', 'polarisation')];
const th1 = PUC.think($('#th1'), { q: 'Which one has a dipole moment?', opts: ['CO₂', 'H₂O'], right: 1, why: 'Water is bent, so the two O-H pulls add up to 1.85 D. CO₂ is straight, so its pulls cancel.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Tc('\\mu_{\\text{total}}')} = \\text{bond pulls added as arrows}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{1. small cation, big anion} \\Rightarrow \\text{more covalent}`)],
  [K(`\\text{2. bigger cation charge} \\Rightarrow \\text{more covalent}`)],
  [K(`\\text{3. } (n{-}1)d^n ns^0 \\text{ cation} > ns^2np^6 \\text{ cation}`)],
  [K(`${tc(KC, '\\mathrm{Li^+}')} < \\mathrm{Na^+} \\Rightarrow ${Tc('\\mathrm{LiCl}\\ \\text{more covalent}')}`)]], { label: 'FAJANS’ RULES · WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W2'), T0('W3'), T0('W4'), wt('W5', 'Lithium')];
const s2 = $('#wS2');
const wLi = ion(s2, 200, 170, 24, 'Li⁺', 84), wNa = ion(s2, 200, 400, 36, 'Na⁺', 84);
const wT = [txt(s2, 610, 176, 'MORE', { 'font-size': 22, 'font-weight': 600, fill: TC }), txt(s2, 610, 406, 'LESS', { 'font-size': 22, 'font-weight': 600, fill: C.mute })];
mk(s2, 'line', { x1: 36, x2: 748, y1: 286, y2: 286, stroke: '#E3E1DA', 'stroke-width': 2, 'stroke-dasharray': '4 8' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Polar bonds always make a polar molecule', right: 'CO₂, BF₃ and CH₄ have polar bonds, but μ = 0' });
const tsv = $('#tS'); const tG = mk(tsv, 'g', {});
bnd(tG, 150, 110, 270, 110, 2); bnd(tG, 270, 110, 390, 110, 2); [['O', OC, 150], ['C', CC, 270], ['O', OC, 390]].forEach(([l, c, x]) => tr(atomG(tG, 30, c, l, 22), x, 110));
arw(tG, EC, 5, 14).set(250, 64, 160, 64); arw(tG, EC, 5, 14).set(290, 64, 380, 64); txt(tG, 270, 190, 'μ = 0', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: TC });
const where = PUC.where($('#wa'), { on: [], type: 'Pick polar or nonpolar molecules, compare dipole moments, order covalent character' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `In which set does <b>every</b> molecule have zero dipole moment?`, qW: 760,
  opts: [K('\\mathrm{CO_2,\\ BF_3,\\ CH_4}'), K('\\mathrm{CO_2,\\ H_2O,\\ BF_3}'), K('\\mathrm{NH_3,\\ BF_3,\\ CH_4}'), K('\\mathrm{BeF_2,\\ NF_3,\\ CO_2}')], right: 0, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\text{straight, flat, tetrahedral: } ${Tc('\\mu = 0')}`)], [K(`\\mathrm{H_2O},\\ \\mathrm{NH_3}: \\text{polar}`)], [K(`\\mathrm{NF_3}: \\text{small, not } 0`)], [K(`\\text{Answer: A}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'every')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · polarity and dipole moment', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Polar bond</b>: pair shifts to the more electronegative atom · δ+ and δ−', '<b>Dipole moment</b>: μ = q × d · 1 D = 3.33564 × 10⁻³⁰ C m', '<b>Shape</b>: CO₂, BeF₂, BF₃, CH₄ have μ = 0 · H₂O is 1.85 D', '<b>Lone pair</b>: NH₃ 4.90 > NF₃ 0.80 (× 10⁻³⁰ C m)', '<b>Fajans</b>: small cation, big anion, high charge, d-block cation: more covalent'] });
const YQ = ['Why is the H-F bond polar, but the H-H bond is not?', 'Why is the dipole moment of water not zero, but that of CO₂ is?', 'Why is ammonia more polar than NF₃?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 46', topic: 'Why is water bent? VSEPR Theory and Shapes of Molecules', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tSl = wt('S2', 'slide');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSl - 0.3, 1.08, 760, 500], [T0('S3') + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tP2 = wt('S6', 'molecule'), tD7 = T0('D7') - 0.3;

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['Unequal', 'two', 'bonds'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'ends') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'pulls') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const f = M.io((t - wt('P3', 'differ') + 0.1) / 0.4), sh = M.io((t - wt('P3', 'shifts') + 0.1) / 0.9);
    op(pBH, 1 - f); op(pBF, f);
    pPr.forEach((c, j) => { attr(c, 'cx', (M.lerp(392, 500, sh) + (j ? 11 : -11)).toFixed(1)); attr(c, 'cy', 250); op(c, M.io((t - wt('P1', 'shared') + 0.1) / 0.3)); });
    pD.forEach(e => op(e, M.io((t - wt('P4', 'delta') + 0.1) / 0.3))); op(pDi, M.io((t - wt('P5', 'Di') + 0.1) / 0.3));
  }

  /* S + D: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const w1 = t < tD1 - 0.45, a = w1 ? tS1 + 0.05 : tD1 + 0.05, z = w1 ? OUT('B2') : OUT('T1');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    M.vis($('#rx'), t, w1 ? T0('S4') - 0.3 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, w1 ? tS1 + 0.4 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'dipole') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'bent') });
    const p2 = w1 ? M.io((t - tP2) / 0.4) : 0, p1 = w1 ? M.clamp((t - tS1 - 0.2) / 0.3) * (1 - p2) : 0, pE = w1 ? 0 : M.io((t - tD7) / 0.4);
    op(ph1, p1); op(ph2, p2); op(phD, w1 ? 0 : 1 - pE); op(phE, pE); op(sMu, p1 * M.io((t - T0('S4') - 0.4) / 0.3));
    M.setT($('#bnL'), w1 ? (t < tP2 ? 'MOLECULE BENCH · H₂ TO HF' : 'MOLECULE BENCH · CARBON DIOXIDE') : t < tD7 ? 'MOLECULE BENCH · SHAPE DECIDES' : 'MOLECULE BENCH · ION PAIR');
    if (p1 > 0) {
      const f = M.io((t - wt('S2', 'Swap')) / 0.4), sh = M.io((t - tSl) / 1.0);
      op(aRH, 1 - f); op(aRF, f);
      sPr.forEach((c, j) => { attr(c, 'cx', (M.lerp(392, 480, sh) + (j ? 10 : -10)).toFixed(1)); attr(c, 'cy', 200); });
      attr(cl, 'cx', M.lerp(392, 430, sh).toFixed(1)); attr(cl, 'rx', M.lerp(200, 230, sh).toFixed(1));
      sD.forEach(e => op(e, M.io((t - wt('S3', 'charge') + 0.1) / 0.3)));
      op(sAr, M.io((t - wt('S3', 'arrow') + 0.1) / 0.4)); op(sRu, M.io((t - wt('S4', 'distance') + 0.1) / 0.3));
    }
    if (p2 > 0) {
      const u = M.io((t - wt('S7', 'cancel') + 0.4) / 1.0), ap = M.io((t - wt('S6', 'arrows') + 0.1) / 0.4);
      cA[0].set(M.lerp(372, 392, u), M.lerp(140, 350, u), M.lerp(250, 270, u), M.lerp(140, 350, u)); cA[1].set(M.lerp(412, 392, u), M.lerp(140, 350, u), M.lerp(534, 514, u), M.lerp(140, 350, u));
      cA.forEach(e => op(e, ap * (1 - M.io((t - wt('S7', 'total') + 0.2) / 0.4))));
      op(cDot, M.io((t - wt('S7', 'total')) / 0.3)); op(cZ, M.io((t - wt('S7', 'zero')) / 0.3));
    }
    if (!w1) {
      op(gBe, M.io((t - T0('D2') + 0.1) / 0.3)); op(gBF, M.io((t - T0('D3') + 0.1) / 0.3)); op(gNH, M.io((t - T0('D4') + 0.1) / 0.3)); op(gNF, M.io((t - wt('D4', 'N', 1) + 0.1) / 0.3));
      [pNH, pNF].forEach(p => op(p.lp, M.io((t - wt('D4', 'lone') + 0.1) / 0.3)));
      op(pNH.ba, M.io((t - T0('D5') - 0.2) / 0.3)); op(pNH.na, M.io((t - wt('D5', 'add') + 0.1) / 0.3)); op(lNH, M.io((t - wt('D5', 'Four') + 0.1) / 0.3));
      op(pNF.ba, M.io((t - T0('D6') - 0.2) / 0.3)); op(pNF.na, M.io((t - wt('D6', 'cancel') + 0.1) / 0.3)); op(lNF, M.io((t - wt('D6', 'Only') + 0.1) / 0.3));
      cloudSet(ionE, M.io((t - wt('D7', 'pulls') + 0.1) / 1.0)); op(eAr, M.io((t - wt('D7', 'pulls') + 0.1) / 0.3)); op(eLab, M.io((t - wt('D7', 'polarisation') + 0.1) / 0.3));
    }
    const TAG = w1 ? [[T0('S1'), 'H₂ · EQUAL PULL'], [wt('S2', 'Swap'), 'HF · PAIR SHIFTS'], [T0('S3'), 'DIPOLE ARROW'], [T0('S4'), 'μ = q × d'], [tP2, 'ADD AS ARROWS'], [wt('S7', 'cancel'), 'CO₂ · μ = 0']]
      : [[T0('D2'), 'STRAIGHT · CANCEL'], [T0('D3'), 'FLAT TRIANGLE · CANCEL'], [T0('D4'), 'PYRAMIDS · LONE PAIR'], [T0('D5'), 'NH₃ · PULLS ADD'], [T0('D6'), 'NF₃ · PULLS FIGHT'], [tD7 + 0.3, 'POLARISATION']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1, T0('D7') - 0.2, { dy: 0, outDur: 0.25, ody: 0 }); M.vis($('#ctE'), t, T0('D7') - 0.1, 1e9, { dy: 0 });
    CRA.forEach(([, , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LND.forEach(([, , tt], i) => M.vis($('#ld' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    tIso.forEach((tt, i) => M.vis($('#ce' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Polar') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Shape') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'decides') + 0.1, 0.6);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W1') + 0.3, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - wt('W5', 'pulls') + 0.1) / 1.0); cloudSet(wLi, u, 1); cloudSet(wNa, u, 0.3);
    op(wT[0], M.io((t - wt('W5', 'more') + 0.1) / 0.3)); op(wT[1], M.io((t - wt('W5', 'more') + 0.1) / 0.3));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'methane') - 0.1 });
    fade(tG, t, wt('X3', 'shapes') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Pick') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'every'), tCount, tAns });
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
