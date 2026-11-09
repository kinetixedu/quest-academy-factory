// PUC Chemistry Ep 74: Balancing redox reactions, oxidation number method (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: oxidised / loses e- teal, reduced / gains e- blue, electron e- orange, coefficients gold, H+ OH- H2O ink
const OX = C.ac, RE = '#2F6FEB', HC = C.ink, GC = '#B7791F', XC = '#C8461B', OK = C.ok, RD = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, tO = s => tc(OX, s), tR = s => tc(RE, s), tG = s => tc(GC, s), tK = s => tc(OK, s), tX = s => tc(XC, s);
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const tick = (p, x, y) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 20, fill: OK }); mk(g, 'path', { d: `M${x - 9} ${y} l6 6 l11 -12`, stroke: '#fff', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return g; };

/* ---------- electron scale: left pan = gained (reduced), right pan = lost (oxidised) ---------- */
function makeScale(p, cx, cy, labL, labR) {
  const L = 230, g = mk(p, 'g', {});
  mk(g, 'path', { d: `M${cx} ${cy} L${cx - 22} ${cy + 200} H${cx + 22} Z`, fill: C.soft, stroke: C.ink2, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'line', { x1: cx - 90, y1: cy + 200, x2: cx + 90, y2: cy + 200, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const beam = mk(g, 'line', { x1: cx - L, y1: cy, x2: cx + L, y2: cy, stroke: HC, 'stroke-width': 7, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx, cy, r: 9, fill: HC });
  const pan = (col, lab) => { const q = mk(g, 'g', {});
    mk(q, 'path', { d: 'M0 0 L-80 90 M0 0 L80 90', stroke: C.ink2, 'stroke-width': 2 });
    mk(q, 'path', { d: 'M-94 90 Q0 132 94 90 Z', fill: '#fff', stroke: col, 'stroke-width': 4, 'stroke-linejoin': 'round' });
    const dots = []; for (let i = 0; i < 6; i++) dots.push(mk(q, 'circle', { cx: -50 + (i % 3) * 50, cy: i < 3 ? 76 : 50, r: 12, fill: XC }));
    const lb = txt(q, 0, 156, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 });
    const cn = txt(q, 0, 186, '', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 });
    return { q, dots, cn }; };
  const pl = pan(RE, labL), pr = pan(OX, labR), tk = tick(g, cx, cy - 46);
  return { g, tk, upd(t, nL, nR, tin, step = 0.12) {
      // nL / nR: arrays of appear-times per dot
      let wL = 0, wR = 0;
      pl.dots.forEach((d, i) => { const u = nL[i] != null ? M.io((t - nL[i]) / 0.3) : 0; wL += u; d.style.opacity = u.toFixed(3); M.hide(d, u <= 0.002); });
      pr.dots.forEach((d, i) => { const u = nR[i] != null ? M.io((t - nR[i]) / 0.3) : 0; wR += u; d.style.opacity = u.toFixed(3); M.hide(d, u <= 0.002); });
      const a = M.clamp((wR - wL) * 2.6, -14, 14) * Math.PI / 180, ex = L * Math.cos(a), ey = L * Math.sin(a);
      attr(beam, 'x1', (cx - ex).toFixed(1)); attr(beam, 'y1', (cy - ey).toFixed(1)); attr(beam, 'x2', (cx + ex).toFixed(1)); attr(beam, 'y2', (cy + ey).toFixed(1));
      place(pl.q, cx - ex, cy - ey); place(pr.q, cx + ex, cy + ey);
      M.setT(pl.cn, `${Math.round(wL)} e⁻`); M.setT(pr.cn, `${Math.round(wR)} e⁻`);
      return [Math.round(wL), Math.round(wR)];
    } };
}

Object.assign(M.IC, {
  seesaw: ['M2 15l20-5', 'M12 12.5l-3.5 7.5h7z'],
  scale: ['M12 3v17', 'M7 20h10', 'M5 7h14', 'M5 7l-3 7h6z', 'M19 7l-3 7h6z'],
  cards: ['M3 7h10v13H3z', 'M9 4h11v13h-4'],
  rupee: ['M6 4h12', 'M6 9h12', 'M6 4h3a5 5 0 0 1 0 10H6l9 7'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['seesaw', 'See-saw', 'LEVEL ONLY IF EQUAL', 'see', 'EQUAL', OX], ['scale', "Shopkeeper's scale", 'POINTER STRAIGHT', 'shopkeeper', 'EQUAL', OX], ['cards', 'Swap 3 cards', 'GET 3 BACK', 'Swap', 'EQUAL', OX]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'see'), wt('H1', 'shopkeeper'), wt('H2', 'Swap') - 0.2];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Pointer straight: both pans equal', 'straight', 'H3'], ['One side up, one side down, till they match', 'match', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('scale', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: the puzzle ---------- */
const QR = [['One thing loses electrons', 'LOSES', 'P1', 'loses', OX], ['Another thing takes them', 'GAINS', 'P1', 'takes', RE], ['Electrons never vanish', 'LOST = GAINED', 'P2', 'vanish', GC], ['Balance atoms, electrons, charge', '3 CHECKS', 'P3', 'charge', OX]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const ringA = mk(ps, 'circle', { cx: 210, cy: 250, r: 92, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), ringB = mk(ps, 'circle', { cx: 574, cy: 250, r: 92, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const pA = atom(ps, 210, 250, 46, OX, 'S', 30), pB = atom(ps, 574, 250, 46, RE, 'Cr', 28);
const pAl = txt(ps, 210, 390, 'LOSES e⁻ · OXIDISED', { 'text-anchor': 'middle', 'font-size': 20, fill: OX, 'font-weight': 600 });
const pBl = txt(ps, 574, 390, 'GAINS e⁻ · REDUCED', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 });
const pE = [0, 1].map(() => mk(ps, 'circle', { r: 12, fill: XC }));
const pArc = mk(ps, 'path', { d: 'M210 158 Q392 40 574 158', stroke: XC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' });
const pCnt = txt(ps, 392, 470, 'LOST 2 | GAINED 2', { 'text-anchor': 'middle', 'font-size': 30, fill: HC, 'font-weight': 600 });
const pTk = tick(ps, 600, 460);

/* ---------- S: bench + ladder ---------- */
$('#bEq').innerHTML = K(`\\overset{${tR('+6')}}{\\mathrm{${tR('Cr')}}}\\mathrm{_2O_7^{2-}} + \\overset{${tO('+4')}}{\\mathrm{${tO('S')}}}\\mathrm{O_3^{2-}} \\rightarrow \\overset{${tR('+3')}}{\\mathrm{${tR('Cr')}}}\\mathrm{^{3+}} + \\overset{${tO('+6')}}{\\mathrm{${tO('S')}}}\\mathrm{O_4^{2-}}`);
const b = $('#bS');
const scS = makeScale(b, 392, 230, 'Cr GAINS', 'S LOSES');
const x3 = txt(b, 652, 470, '× 3 SULPHITE', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 700 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), ONY = v => 470 - (v + 2) * 38;
mk(es, 'line', { x1: 150, y1: ONY(-2) + 10, x2: 150, y2: ONY(7) - 10, stroke: C.ink2, 'stroke-width': 3 });
for (let v = -2; v <= 7; v++) { mk(es, 'line', { x1: 140, y1: ONY(v), x2: 160, y2: ONY(v), stroke: C.ink2, 'stroke-width': 2 }); txt(es, 124, ONY(v) + 7, (v > 0 ? '+' : '') + v, { 'text-anchor': 'end', 'font-size': 20, fill: v === 0 ? HC : C.mute, 'font-weight': 600 }); mk(es, 'line', { x1: 170, y1: ONY(v), x2: 740, y2: ONY(v), stroke: C.line, 'stroke-width': 1 }); }
const lCr = atom(es, 300, ONY(6), 22, RE, 'Cr', 16), lS = atom(es, 580, ONY(4), 22, OX, 'S', 18);
const [eCr, eCrh] = varrow(es, 300, ONY(6) + 26, ONY(3), RE), [eS1, eS1h] = varrow(es, 580, ONY(4) - 26, ONY(6), OX);
const eCrT = txt(es, 330, ONY(4.5) + 8, 'FALL 3', { 'font-size': 22, fill: RE, 'font-weight': 600 }), eST = txt(es, 610, ONY(5) + 8, 'RISE 2', { 'font-size': 22, fill: OX, 'font-weight': 600 });
const eCrN = txt(es, 300, 530, '3 × 2 Cr = 6 GAINED', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 });
const eSN = txt(es, 600, 530, '2 × 3 S = 6 LOST', { 'text-anchor': 'middle', 'font-size': 20, fill: OX, 'font-weight': 600 });

/* ---------- L: rule + money ---------- */
$('#hcI').innerHTML = M.icon('scale', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${tO('\\text{total rise}')} = ${tR('\\text{total fall}')}`);
const hs = $('#hS');
const wal = (x, col, a, bb) => { const g = mk(hs, 'g', {}); mk(g, 'rect', { x: x - 130, y: 130, width: 260, height: 220, rx: 18, fill: '#fff', stroke: col, 'stroke-width': 4 }); txt(g, x, 390, a, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 700 }); txt(g, x, 420, bb, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 }); return g; };
const wA = wal(200, OX, 'PAYS 6', 'LOSES e⁻ · OXIDISED'), wB = wal(584, RE, 'RECEIVES 6', 'GAINS e⁻ · REDUCED');
const coins = []; for (let i = 0; i < 6; i++) { const g = mk(hs, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r: 22, fill: GC }); txt(g, 0, 8, '₹', { 'text-anchor': 'middle', 'font-size': 22, fill: '#fff', 'font-family': 'Poppins', 'font-weight': 700 }); coins.push(g); }
const coinPos = (side, i) => [side + (i % 3 - 1) * 56, 210 + Math.floor(i / 3) * 60];

/* ---------- D: 5 steps, wide ---------- */
const EQ = [
  `\\mathrm{${tR('Cr')}_2O_7^{2-}} + \\mathrm{${tO('S')}O_3^{2-}} \\rightarrow \\mathrm{${tR('Cr')}^{3+}} + \\mathrm{${tO('S')}O_4^{2-}}`,
  `\\mathrm{${tR('Cr')}_2O_7^{2-}} + ${tG('3')}\\mathrm{${tO('S')}O_3^{2-}} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr')}^{3+}} + ${tG('3')}\\mathrm{${tO('S')}O_4^{2-}}`,
  `\\mathrm{${tR('Cr')}_2O_7^{2-}} + ${tG('3')}\\mathrm{${tO('S')}O_3^{2-}} + ${tG('8')}\\mathrm{H^+} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr')}^{3+}} + ${tG('3')}\\mathrm{${tO('S')}O_4^{2-}}`,
  `\\mathrm{${tR('Cr')}_2O_7^{2-}} + ${tG('3')}\\mathrm{${tO('S')}O_3^{2-}} + ${tG('8')}\\mathrm{H^+} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr')}^{3+}} + ${tG('3')}\\mathrm{${tO('S')}O_4^{2-}} + ${tG('4')}\\mathrm{H_2O}`];
EQ.forEach((e, i) => { $('#dq' + i).innerHTML = K(e); });
const DS = [['Skeleton, mark the oxidation numbers that change', 'D2'], ['Rise = fall: 3 sulphite, 2 Cr³⁺, 3 sulphate', 'D3'], ['Charge -8 | 0: add 8 H⁺ on the left (acid)', 'D4'], ['Hydrogen 8 | 0: add 4 H₂O on the right', 'D5'], ['Oxygen 16 | 16: balanced', 'D6']];
$('#dss').innerHTML = DS.map(([s], i) => `<div class="st5" id="ds${i}" style="top:${226 + i * 68}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tDs = DS.map(d => T0(d[1]) + 0.2);
const CN = [['CHARGE', 'cn0', 226], ['HYDROGEN', 'cn1', 326], ['OXYGEN', 'cn2', 426]];
$('#cns').innerHTML = CN.map(([k, id, top]) => `<div class="cnt" id="${id}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span><svg class="cz" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="${OK}"/><path d="M13 22 l6 6 l11 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`).join('');

/* ---------- C: acid vs base ---------- */
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqrow('ca0', 96, '\\text{Charge short} \\Rightarrow +\\,\\mathrm{H^+}', 'STEP 3', HC) + eqrow('ca1', 190, '\\text{H short} \\Rightarrow +\\,\\mathrm{H_2O}', 'STEP 4', HC);
$('#cfr').innerHTML = eqrow('cf0', 96, '\\text{Charge short} \\Rightarrow +\\,\\mathrm{OH^-}', 'STEP 3', HC) + eqrow('cf1', 190, '\\text{H short} \\Rightarrow +\\,\\mathrm{H_2O}', 'STEP 4', HC);
const beaker = (p, ion, col) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M232 290 V384 a12 12 0 0 0 12 12 H540 a12 12 0 0 0 12 -12 V290', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'rect', { x: 236, y: 318, width: 312, height: 74, fill: col, opacity: 0.12 }); [[280, 352], [350, 376], [420, 344], [490, 372], [520, 336], [316, 334], [456, 384]].forEach(([x, y]) => txt(g, x, y, ion, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 700 })); return g; };
const bkA = beaker($('#caS'), 'H⁺', RD), bkB = beaker($('#cfS'), 'OH⁻', RE);
$('#caV').innerHTML = `<span>Fix charge with</span><span style="color:${RD}">H⁺</span>`;
$('#cfV').innerHTML = `<span>Fix charge with</span><span style="color:${RE}">OH⁻</span>`;
const th1 = PUC.think($('#th1'), { q: 'A reaction runs in a basic solution. Which ion do you add to balance the charge?', opts: ['H⁺', 'OH⁻'], right: 1, why: 'OH⁻. A base has almost no H⁺, so H⁺ cannot last there.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{${tR('Cr')}_2O_7^{2-}} + 3\\mathrm{${tO('S')}O_3^{2-}} + 8\\mathrm{H^+} \\rightarrow 2\\mathrm{${tR('Cr')}^{3+}} + 3\\mathrm{${tO('S')}O_4^{2-}} + 4\\mathrm{H_2O}`);

/* ---------- W: basic example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{O.N.: } ${tR('\\mathrm{Mn}\\ {+7} \\rightarrow {+4}')}\\ \\ ${tO('\\mathrm{Br}\\ {-1} \\rightarrow {+5}')}`)],
  [K(`${tR('\\text{gains } 3')}\\ \\ ${tO('\\text{loses } 6')} \\Rightarrow ${tG('2')}\\,\\mathrm{MnO_4^-}`)],
  [K(`\\text{Charge } {-3} \\mid {-1} \\Rightarrow +\\,${tG('2')}\\,\\mathrm{OH^-}\\ \\text{right}`)],
  [K(`\\text{H } 0 \\mid 2 \\Rightarrow +\\,\\mathrm{H_2O}\\ \\text{left}`)],
  [K(`\\text{O } 9 \\mid 9 \\ \\ ${tK('\\checkmark')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 74 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), wt('W6', 'Oxygen')];
$('#wEq').innerHTML = K(`\\mathrm{${tR('Mn')}O_4^-} + \\mathrm{${tO('Br')}^-} \\rightarrow \\mathrm{${tR('Mn')}O_2} + \\mathrm{${tO('Br')}O_3^-}`);
const scW = makeScale($('#wS'), 392, 190, 'Mn GAINS', 'Br LOSES');
const x2 = txt($('#wS'), 132, 440, '× 2 MnO₄⁻', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 700 });
$('#wF').innerHTML = K(`${tG('2')}\\mathrm{MnO_4^-} + \\mathrm{Br^-} + \\mathrm{H_2O} \\rightarrow ${tG('2')}\\mathrm{MnO_2} + \\mathrm{BrO_3^-} + ${tG('2')}\\mathrm{OH^-}`);
$('#wF').style.fontSize = '24px';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Dichromate gains ${K('3')} electrons`, right: `Two Cr atoms: ${K(tR('2 \\times 3 = 6'))} electrons` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'PER Cr ATOM: +6 → +3 = 3', { 'font-size': 24, fill: HC, 'font-weight': 600 });
const tq2 = txt(tsv, 40, 150, 'Cr₂ HAS 2 ATOMS', { 'font-size': 24, fill: GC, 'font-weight': 600 });
const tq3 = txt(tsv, 40, 200, 'PER ION: 2 × 3 = 6', { 'font-size': 26, fill: RE, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Balance a full redox equation, or find one coefficient (H⁺ or H₂O) in it' });
const OPT = ['8\\ \\text{and}\\ 7', '14\\ \\text{and}\\ 7', '8\\ \\text{and}\\ 4', '6\\ \\text{and}\\ 3'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Cr₂O₇²⁻ + H₂S → Cr³⁺ + S (acidic). In the balanced equation, the coefficients of H⁺ and H₂O are:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${tR('2\\,\\mathrm{Cr}\\text{ gain } 6')} \\ \\ ${tO('\\mathrm{S}: -2 \\rightarrow 0')}`)], [K(`\\Rightarrow ${tG('3')}\\,\\mathrm{H_2S}`)], [K('\\text{Charge } {-2} \\mid {+6} \\Rightarrow 8\\,\\mathrm{H^+}')], [K(`\\text{H: } 14 \\Rightarrow ${tK('7\\,\\mathrm{H_2O}')}`)], ['B counted all 14 as H⁺']], { y0: 100, dy: 96 });
const tSo = [T0('A2'), wt('A2', 'three'), T0('A3'), T0('A4'), wt('A4', 'counted') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Oxidation number method', y0: 96, dy: 74, txt: [0, 1, 1, 1, 0],
  lines: [K(`${tO('\\text{e}^-\\ \\text{lost}')} = ${tR('\\text{e}^-\\ \\text{gained}')} \\quad (\\text{rise in O.N.} = \\text{fall in O.N.})`), '<b>Steps</b>: skeleton · O.N. · rise = fall · charge · water · check O', '<b>Acid</b>: fix charge with H⁺ · <b>Base</b>: fix charge with OH⁻', '<b>Per ion</b>: change per atom × number of atoms (Cr₂: 2 × 3 = 6)', K(`\\mathrm{Cr_2O_7^{2-}} + 3\\mathrm{SO_3^{2-}} + 8\\mathrm{H^+} \\rightarrow 2\\mathrm{Cr^{3+}} + 3\\mathrm{SO_4^{2-}} + 4\\mathrm{H_2O}`)] });
const YQ = ['In the oxidation number method, what must be equal?', 'In a basic solution, what do you add to balance the charge?', 'Why does dichromate gain six electrons, not three?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 75', topic: 'Split a reaction into two halves? Half reaction method', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 500, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Six lost, six gained. Like my rice scale!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3') - 0.2, 1.05, 960, 560], [T1('L3') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const fit = (q, w) => { const k = q.firstElementChild; if (k && k.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / k.offsetWidth) + 'px'; };
  document.querySelectorAll('.fxc,.eqtop').forEach(q => fit(q, 712));
  document.querySelectorAll('.eqbig').forEach(q => fit(q, 1520));
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 676 - (tg ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx, .st5 .stx').forEach(q => { const w = q.closest('.st5') ? 790 : q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
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
    const tB = [wt('H2', 'Give'), wt('H2', 'must'), wt('H2', 'back')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'three', 1) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'electrons') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P3') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const ta = tP1 + 0.5, tm = wt('P1', 'takes');
    [ringA, ringB, pA, pB].forEach(e => fade(e, t, ta)); fade(pAl, t, wt('P1', 'loses')); fade(pBl, t, tm);
    M.draw(pArc, t, wt('P1', 'loses'), 0.8);
    pE.forEach((e, i) => { const t0 = tm + i * 0.35, u = M.io((t - t0) / 1.0); let x, y;
      if (u <= 0) { const a = (t - ta) * 1.6 + i * Math.PI; x = 210 + 92 * Math.cos(a); y = 250 + 92 * Math.sin(a); }
      else { const s = M.clamp(u); x = (1 - s) * (1 - s) * 210 + 2 * (1 - s) * s * 392 + s * s * 574; y = (1 - s) * (1 - s) * 158 + 2 * (1 - s) * s * 40 + s * s * 158; if (s >= 1) { const a = (t - t0 - 1) * 1.6 + i * Math.PI - Math.PI / 2; x = 574 + 92 * Math.cos(a); y = 250 + 92 * Math.sin(a); } }
      attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); fade(e, t, ta, 1e9, 0.2); });
    fade(pCnt, t, wt('P2', 'Every')); fade(pTk, t, wt('P2', 'gained'));
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    PUC.write($('#bEq'), t, wt('S1', 'Dichromate'), 1.0); fade(scS.g, t, wt('S1', 'acid') - 0.3);
    const tg3 = wt('S3', 'gains'), tg6 = wt('S3', 'six'), tl2 = wt('S4', 'loses'), t3s = wt('S5', 'three'), tBal = wt('S5', 'Balanced');
    const nL = [tg3, tg3 + 0.1, tg3 + 0.2, tg6, tg6 + 0.1, tg6 + 0.2], nR = [tl2, tl2 + 0.1, t3s, t3s + 0.1, t3s + 0.35, t3s + 0.45];
    const [wl, wr] = scS.upd(t, nL, nR);
    fade(x3, t, t3s); fade(scS.tk, t, tBal);
    const TAG = [[tS1 + 0.3, 'LOST 0 | GAINED 0'], [tg3, `LOST ${wr} | GAINED ${wl}`], [tBal, 'LOST 6 | GAINED 6 ✓']];
    let tgs = null; for (const [tt, s] of TAG) if (t >= tt) tgs = s; if (tgs) M.setT(btag, tgs); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    fade(lCr, t, wt('S2', 'chromium')); M.draw(eCr, t, wt('S2', 'ends'), 0.7); fade(eCrh, t, wt('S2', 'ends') + 0.6); fade(eCrT, t, wt('S3', 'three'));
    fade(eCrN, t, tg6);
    fade(lS, t, wt('S4', 'sulphur')); M.draw(eS1, t, wt('S4', 'six'), 0.6); fade(eS1h, t, wt('S4', 'six') + 0.5); fade(eST, t, tl2);
    fade(eSN, t, t3s);
    avA(t, T1('S5') - 0.4, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('L2') + 0.3, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'oxidation') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.6); PUC.write($('#lEq'), t, wt('L2', 'Electrons'), 0.9);
    M.vis($('#lh'), t, T0('L2') - 0.1, z, { dx: 60, dy: 0, ...o });
    fade(wA, t, T0('L2') + 0.2); fade(wB, t, T0('L2') + 0.4);
    const tc0 = wt('L3', 'pays');
    coins.forEach((g, i) => { const t0 = tc0 + i * 0.32, u = M.io((t - t0) / 0.6); const [ax, ay] = coinPos(200, i), [bx, by] = coinPos(584, i); place(g, M.lerp(ax, bx, u), M.lerp(ay, by, u) - Math.sin(Math.PI * u) * 70); fade(g, t, T0('L2') + 0.6); });
    M.vis($('#hP'), t, wt('L3', 'receive') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('C1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o });
    const tq = [tDs[0], tDs[1] + 0.6, wt('D4', 'add') , wt('D5', 'four')];
    EQ.forEach((_, i) => { const el = $('#dq' + i); const nx2 = i < 3 ? tq[i + 1] : 1e9; if (i === 0) PUC.write(el, t, tq[0], 0.9); fade(el, t, i === 0 ? tq[0] - 0.05 : tq[i], nx2, 0.25); });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el, t, tDs[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tDs[i + 1] : T1('D6') + 0.4; const on = M.io((t - tDs[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#cnh'), t, tDs[2] - 0.2, 1e9, { dy: 10 });
    const tChg = wt('D4', 'add'), tH2 = wt('D5', 'four');
    const V = [[tDs[2], t < tChg ? '-8 | 0' : '0 | 0', t >= tChg], [wt('D5', 'Eight') - 0.2, t < tH2 ? '8 | 0' : '8 | 8', t >= tH2], [tDs[4], '16 | 16', true]];
    V.forEach(([ti, s, ok], i) => { const el = $('#cn' + i); M.vis(el, t, ti - 0.1, 1e9, { dx: 30, dy: 0 }); M.setT(el.querySelector('.cv'), s); el.querySelector('.cv').style.color = ok ? OK : RD; const z2 = el.querySelector('.cz'); z2.style.opacity = ok ? 1 : 0; });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    fade(bkA, t, wt('C1', 'acid') ); M.vis($('#ca0'), t, wt('C1', 'charge') - 0.1, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'water') - 0.2, 1e9, { dy: 16 }); M.vis($('#caV'), t, wt('C1', 'plus'), 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    fade(bkB, t, wt('C2', 'basic')); M.vis($('#cf0'), t, wt('C2', 'charge') - 0.1, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C2', 'charge') + 0.4, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C2', 'hydroxide'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'plus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Electrons') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'fix') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'water') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#wEq'), t, T0('W2') + 0.4, 0.9); fade(scW.g, t, T0('W2') + 0.6);
    const tg = wt('W3', 'gains'), tl = wt('W3', 'loses'), t2 = wt('W4', 'two');
    scW.upd(t, [tg, tg + 0.1, tg + 0.2, t2, t2 + 0.1, t2 + 0.2], [tl, tl + 0.08, tl + 0.16, tl + 0.24, tl + 0.32, tl + 0.4]);
    fade(x2, t, t2); fade(scW.tk, t, wt('W4', 'six'));
    M.vis($('#wF'), t, T0('W7') - 0.1, 1e9, { dy: 16 }); setBg($('#wF'), mix(C.soft, C.okBg, M.io((t - T0('W7') - 0.3) / 0.3)));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'three') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Two') - 0.3 });
    fade(tq1, t, wt('X2', 'change')); fade(tq2, t, wt('X2', 'two')); fade(tq3, t, wt('X3', 'six'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'coefficients') - 0.1, tCount, tAns });
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
