// PUC Chemistry Ep 75: Balancing redox reactions, half reaction (ion electron) method (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: oxidation half / gives e- teal, reduction half / takes e- blue, electron e- orange, coefficients gold, H+ OH- H2O ink
const OX = C.ac, RE = '#2F6FEB', HC = C.ink, GC = '#B7791F', XC = '#C8461B', OK = C.ok, RD = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, tO = s => tc(OX, s), tR = s => tc(RE, s), tG = s => tc(GC, s), tK = s => tc(OK, s), tE = s => tc(XC, s);
const E = n => tE(`${n}\\mathrm{e^-}`);
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const tick = (p, x, y) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 20, fill: OK }); mk(g, 'path', { d: `M${x - 9} ${y} l6 6 l11 -12`, stroke: '#fff', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return g; };
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;

/* ---------- electron scale: left pan = taken (reduction), right pan = given (oxidation) ---------- */
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
    txt(q, 0, 156, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 });
    const cn = txt(q, 0, 186, '', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 });
    return { q, dots, cn }; };
  const pl = pan(RE, labL), pr = pan(OX, labR), tk = tick(g, cx, cy - 46);
  return { g, tk, upd(t, nL, nR) {
      let wL = 0, wR = 0;
      pl.dots.forEach((d, i) => { const u = nL[i] != null ? M.io((t - nL[i]) / 0.3) : 0; wL += u; d.style.opacity = u.toFixed(3); M.hide(d, u <= 0.002); });
      pr.dots.forEach((d, i) => { const u = nR[i] != null ? M.io((t - nR[i]) / 0.3) : 0; wR += u; d.style.opacity = u.toFixed(3); M.hide(d, u <= 0.002); });
      const a = M.clamp((wR - wL) * 2.6, -14, 14) * Math.PI / 180, ex = L * Math.cos(a), ey = L * Math.sin(a);
      attr(beam, 'x1', (cx - ex).toFixed(1)); attr(beam, 'y1', (cy - ey).toFixed(1)); attr(beam, 'x2', (cx + ex).toFixed(1)); attr(beam, 'y2', (cy + ey).toFixed(1));
      place(pl.q, cx - ex, cy - ey); place(pr.q, cx + ex, cy + ey);
      M.setT(pl.cn, `${Math.round(wL)} e⁻`); M.setT(pr.cn, `${Math.round(wR)} e⁻`);
    } };
}

Object.assign(M.IC, {
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M11 18h2'],
  scissors: ['M6 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M6 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M20 4 8.1 15.9', 'M14.5 14.5 20 20', 'M8.1 8.1 12 12'],
  handshake: ['M3 12l4-4 4 3 3-3 7 7', 'M7 16l3 3', 'M10 13l4 4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tR1 = T0('R1'), tJ1 = T0('J1'), tL1 = T0('L1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['phone', 'Fifty debited', 'YOUR HALF', 'debited', '- 50', RD], ['phone', 'Fifty credited', "FRIEND'S HALF", 'credited', '+ 50', OK], ['handshake', 'Together', 'ONE DEAL', 'halves', 'MATCH', OX]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'debited'), wt('H1', 'credited'), wt('H2', 'halves') - 0.3];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Long equation will not balance', 'balance', 'H3'], ['Cut it in two: one half at a time', 'cuts', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('scissors', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: two halves ---------- */
const QR = [['Every reaction has two halves', '2 HALVES', 'P1', 'halves', GC], ['Oxidation half gives out electrons', 'GIVES e⁻', 'P2', 'gives', OX], ['Reduction half takes them in', 'TAKES e⁻', 'P2', 'takes', RE], ['Write each half, then join', 'JOIN', 'P3', 'join', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#pEq').innerHTML = K(`\\mathrm{${tO('Fe^{2+}')}} + \\mathrm{${tR('Cr_2O_7^{2-}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}} + \\mathrm{${tR('Cr^{3+}')}}`);
const ps = $('#pS');
const pCut = mk(ps, 'path', { d: 'M60 168 H724', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '12 10', fill: 'none' });
$('#prs').innerHTML = eqrow('pr0', 200, `\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}} + ${E('')}`, 'OXIDATION · GIVES', OX) + eqrow('pr1', 300, `\\mathrm{${tR('Cr_2O_7^{2-}')}} + ${E('')} \\rightarrow \\mathrm{${tR('Cr^{3+}')}}`, 'REDUCTION · TAKES', RE);
$('#pV').innerHTML = `<span>e⁻ given</span><span style="color:${GC}">=</span><span>e⁻ taken</span>`;

/* ---------- S: iron half ---------- */
const b = $('#bS');
const fRing = mk(b, 'circle', { cx: 300, cy: 260, r: 120, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), fRing2 = mk(b, 'circle', { cx: 300, cy: 260, r: 80, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const fAt = atom(b, 300, 260, 50, OX, 'Fe', 30);
const fCh = txt(b, 300, 420, '', { 'text-anchor': 'middle', 'font-size': 30, fill: OX, 'font-weight': 700 });
const fE = [0, 1, 2].map(() => mk(b, 'circle', { r: 12, fill: XC }));
const fOut = txt(b, 620, 150, 'ONE e⁻ LEAVES', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 700 });
$('#bF').innerHTML = K(`\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}} + ${E('')}`);
$('#bF').style.fontSize = '34px';
$('#ebs').innerHTML = eqrow('eb0', 96, `\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}}`, 'OXIDATION', OX) + eqrow('eb1', 196, `\\mathrm{${tR('Cr_2O_7^{2-}')}} \\rightarrow \\mathrm{${tR('Cr^{3+}')}}`, 'REDUCTION', RE)
  + eqrow('eb2', 316, `\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}} + ${E('')}`, 'GIVES 1 e⁻', OX) + eqrow('eb3', 416, `\\mathrm{${tR('Cr_2O_7^{2-}')}} \\rightarrow \\mathrm{${tR('Cr^{3+}')}}`, 'NEXT: 4 STEPS', RE);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- R: dichromate half, 4 steps ---------- */
const CRL = `\\mathrm{${tR('Cr_2O_7^{2-}')}}`;
const EQ = [`${CRL} \\rightarrow \\mathrm{${tR('Cr^{3+}')}}`, `${CRL} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr^{3+}')}}`, `${CRL} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr^{3+}')}} + ${tG('7')}\\mathrm{H_2O}`,
  `${CRL} + ${tG('14')}\\mathrm{H^+} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr^{3+}')}} + ${tG('7')}\\mathrm{H_2O}`, `${CRL} + ${tG('14')}\\mathrm{H^+} + ${E(6)} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr^{3+}')}} + ${tG('7')}\\mathrm{H_2O}`];
EQ.forEach((e, i) => { $('#dq' + i).innerHTML = K(e); });
const DS = [['Main atom: 2 in front of Cr³⁺', 'R2'], ['Oxygen: 7 H₂O on the right', 'R3'], ['Hydrogen: 14 H⁺ on the left', 'R4'], ['Charge +12 | +6: add 6 e⁻ on the left', 'R5']];
$('#dss').innerHTML = DS.map(([s], i) => `<div class="st5" id="ds${i}" style="top:${226 + i * 84}px;height:64px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tDs = DS.map(d => T0(d[1]) + 0.2);
const CN = [['CHROMIUM', 226], ['OXYGEN', 310], ['HYDROGEN', 394], ['CHARGE', 478]];
$('#cns').innerHTML = CN.map(([k, top], i) => `<div class="cnt" id="cn${i}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span><svg class="cz" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="${OK}"/><path d="M13 22 l6 6 l11 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`).join('');
$('#cnh').style.top = '190px';

/* ---------- J: match + add ---------- */
const scJ = makeScale($('#jS'), 392, 150, 'Cr₂O₇²⁻ TAKES', 'Fe²⁺ GIVES');
const x6 = txt($('#jS'), 652, 400, '× 6 IRON HALF', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 700 });
const jtag = txt($('#jS'), 392, 440, 'SIX GIVEN · SIX TAKEN', { 'text-anchor': 'middle', 'font-size': 24, fill: OK, 'font-weight': 700 });
const OXH = c => `${tG('6')}\\mathrm{${tO('Fe^{2+}')}} \\rightarrow ${tG('6')}\\mathrm{${tO('Fe^{3+}')}} + ${c ? `\\cancel{${E(6)}}` : E(6)}`;
const REH = c => `${CRL} + 14\\mathrm{H^+} + ${c ? `\\cancel{${E(6)}}` : E(6)} \\rightarrow 2\\mathrm{${tR('Cr^{3+}')}} + 7\\mathrm{H_2O}`;
$('#jrs2').innerHTML = eqrow('jo0', 96, OXH(0), '× 6', GC) + eqrow('jo1', 96, OXH(1), 'CANCEL', XC) + eqrow('jr0', 196, REH(0), '', RE) + eqrow('jr1', 196, REH(1), '', RE);
const jLn = mk($('#jL'), 'line', { x1: 36, y1: 300, x2: 748, y2: 300, stroke: HC, 'stroke-width': 3 }), jPl = txt($('#jL'), 36, 336, 'ADD · e⁻ CANCEL OUT', { 'font-size': 20, fill: XC, 'font-weight': 700 });
$('#jF').innerHTML = K(`${CRL} + ${tG('6')}\\mathrm{${tO('Fe^{2+}')}} + ${tG('14')}\\mathrm{H^+} \\rightarrow ${tG('2')}\\mathrm{${tR('Cr^{3+}')}} + ${tG('6')}\\mathrm{${tO('Fe^{3+}')}} + ${tG('7')}\\mathrm{H_2O}`);

/* ---------- L: law + steps ---------- */
$('#hcI').innerHTML = M.icon('scissors', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${tO('\\mathrm{e^-}\\ \\text{given}')} = ${tR('\\mathrm{e^-}\\ \\text{taken}')}`);
const LR = [['Split into two halves', 'SPLIT'], ['Balance the main atom', 'ATOM'], ['Oxygen: add H₂O', 'O'], ['Hydrogen: add H⁺', 'H'], ['Charge: add e⁻', 'e⁻ LAST'], ['Multiply so e⁻ match', 'MATCH'], ['Add halves, cancel e⁻', 'ADD']];
$('#lrs').innerHTML = LR.map(([s, k], i) => `<div class="lr" id="lr${i}" style="top:${80 + i * 66}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div><div class="tg" style="color:${i === 4 ? XC : C.ac}">${k}</div></div>`).join('');

/* ---------- C: acid vs base ---------- */
$('#car').innerHTML = eqrow('ca0', 96, '\\text{O short} \\Rightarrow +\\,\\mathrm{H_2O}', 'FIRST', HC) + eqrow('ca1', 190, '\\text{H short} \\Rightarrow +\\,\\mathrm{H^+}', 'THEN', HC);
$('#cfr').innerHTML = eqrow('cf0', 96, '\\text{Balance as if in acid}', 'FIRST', HC) + eqrow('cf1', 190, '\\text{Each } \\mathrm{H^+} \\Rightarrow +\\,\\mathrm{OH^-}\\ \\text{both sides}', 'THEN', HC);
const beaker = (p, ion, col) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M232 290 V384 a12 12 0 0 0 12 12 H540 a12 12 0 0 0 12 -12 V290', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'rect', { x: 236, y: 318, width: 312, height: 74, fill: col, opacity: 0.12 }); [[280, 352], [350, 376], [420, 344], [490, 372], [520, 336], [316, 334], [456, 384]].forEach(([x, y]) => txt(g, x, y, ion, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 700 })); return g; };
const bkA = beaker($('#caS'), 'H⁺', RD), bkB = beaker($('#cfS'), 'OH⁻', RE);
$('#caV').innerHTML = K('\\text{Use } \\mathrm{H_2O} \\text{ and } \\mathrm{H^+}');
$('#cfV').innerHTML = K('\\mathrm{H^+} + \\mathrm{OH^-} \\rightarrow \\mathrm{H_2O}');
const th1 = PUC.think($('#th1'), { q: 'After adding the two halves, should any electrons be left in the final equation?', opts: ['Yes, a few', 'No, none'], right: 1, why: 'None. Electrons given equal electrons taken, so they cancel completely.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{Cr_2O_7^{2-}} + 6\\mathrm{${tO('Fe^{2+}')}} + 14\\mathrm{H^+} \\rightarrow 2\\mathrm{${tR('Cr^{3+}')}} + 6\\mathrm{${tO('Fe^{3+}')}} + 7\\mathrm{H_2O}`);

/* ---------- W: basic example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tO('\\text{Oxidation: } 2\\mathrm{I^-} \\rightarrow \\mathrm{I_2}')} + ${E(2)}`)],
  [K(`${tR('\\text{Reduction (acid): } +4\\mathrm{H^+} + 3\\mathrm{e^-}')}`)],
  [K('\\text{Basic: } +4\\,\\mathrm{OH^-} \\text{ both sides}')],
  [K(`\\times 3 \\text{ and } \\times 2:\\ ${E(6)} = ${E(6)}`)],
  [K(`\\text{Add, cancel } \\mathrm{e^-} \\ \\ ${tK('\\checkmark')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 74 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W7'), T0('W8')];
const WR = [
  [`2\\mathrm{${tO('I^-')}} \\rightarrow \\mathrm{${tO('I_2')}} + ${E(2)}`, 'OXIDATION', OX, T0('W3')],
  [`\\mathrm{${tR('MnO_4^-')}} + 4\\mathrm{H^+} + ${E(3)} \\rightarrow \\mathrm{${tR('MnO_2')}} + 2\\mathrm{H_2O}`, 'IF ACID', RE, T0('W4')],
  [`\\mathrm{${tR('MnO_4^-')}} + 2\\mathrm{H_2O} + ${E(3)} \\rightarrow \\mathrm{${tR('MnO_2')}} + 4\\mathrm{OH^-}`, 'BASIC', RE, wt('W6', 'Permanganate')],
  [`${tG('2')}\\mathrm{${tR('MnO_4^-')}} + ${tG('6')}\\mathrm{${tO('I^-')}} + ${tG('4')}\\mathrm{H_2O} \\rightarrow ${tG('2')}\\mathrm{${tR('MnO_2')}} + ${tG('3')}\\mathrm{${tO('I_2')}} + ${tG('8')}\\mathrm{OH^-}`, '', OK, T0('W8')]];
$('#wrs').innerHTML = WR.map(([e, tg, c], i) => eqrow('wr' + i, [84, 184, 284, 440][i], e, tg, c)).join('');
const wM = document.createElement('div'); wM.className = 'pillp'; wM.style.cssText = 'left:36px;top:374px'; wM.innerHTML = '× 3 and × 2: 6 e⁻ = 6 e⁻'; $('#wr').appendChild(wM);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Add ${K(tE('\\mathrm{e^-}'))} first, then balance O and H`, right: 'Atoms first: main atom, O, H. Electrons last' });
const tsv = $('#tS');
const ORD = ['1 MAIN ATOM', '2 O: ADD H₂O', '3 H: ADD H⁺', '4 e⁻ LAST'];
const tqs = ORD.map((s, i) => txt(tsv, 60, 70 + i * 50, s, { 'font-size': 24, fill: i === 3 ? XC : HC, 'font-weight': 600 }));
const where = PUC.where($('#wa'), { on: [], type: 'Balance by the ion electron method, or find e⁻, H₂O or OH⁻ in one half' });
const OPT = ['3\\,\\mathrm{e^-},\\ 5\\,\\mathrm{OH^-}', '3\\,\\mathrm{e^-},\\ 2\\,\\mathrm{OH^-}', '6\\,\\mathrm{e^-},\\ 5\\,\\mathrm{OH^-}', '3\\,\\mathrm{e^-},\\ 8\\,\\mathrm{OH^-}'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Basic solution: Cr(OH)₃ → CrO₄²⁻. In the balanced oxidation half reaction, the number of electrons and OH⁻ ions are:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{Cr}: +3 \\rightarrow +6 \\Rightarrow ${E(3)}\\ \\text{right}`)], [K('\\text{Right: } {-2} - 3 = {-5}')], [K(`\\Rightarrow ${tK('5\\,\\mathrm{OH^-}')}\\ \\text{left}`)], [K('+\\,4\\mathrm{H_2O}\\ \\text{right}')], ["B forgot the electrons' charge"]], { y0: 100, dy: 96 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'five'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Half reaction method', y0: 96, dy: 74, txt: [0, 1, 1, 1, 0],
  lines: [K(`${tO('\\mathrm{e^-}\\ \\text{given}')} = ${tR('\\mathrm{e^-}\\ \\text{taken}')} \\quad (\\text{electrons cancel when you add})`), '<b>Order</b>: split · main atom · O (H₂O) · H (H⁺) · charge (e⁻) · match · add', '<b>Base</b>: balance as in acid, then add OH⁻ for each H⁺ on both sides', '<b>Also called</b>: the ion electron method', K(`\\mathrm{Cr_2O_7^{2-}} + 14\\mathrm{H^+} + 6\\mathrm{e^-} \\rightarrow 2\\mathrm{Cr^{3+}} + 7\\mathrm{H_2O}`)] });
const YQ = ['What are the two halves of a redox reaction called?', 'In which step do we add the electrons?', 'How do you turn an acid balance into a base balance?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 76', topic: 'One pink drop says the reaction is over? Redox titrations', y: 764 });
const avA = PUC.avatar($('#sJ'), { x: 160 + 36, y: 270 + 500, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like debit and credit. They must match!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('J3') - 0.2, 1.05, 960, 560], [T1('J3') + 0.2, 1, 960, 540]]);
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
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 676 - (tg && tg.textContent ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx').forEach(q => { const w = q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const rowsOn = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < ids.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    const tB = [wt('H2', 'Two'), wt('H2', 'alone'), wt('H2', 'match')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'together') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'messy') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2', '#qr3'], tQr, T1('P3') + 0.4, t);
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pEq'), t, tP1 + 0.5, 0.9); M.draw(pCut, t, wt('P1', 'halves') - 0.2, 0.6);
    M.vis($('#pr0'), t, wt('P2', 'gives') - 0.2, 1e9, { dy: 16 }); M.vis($('#pr1'), t, wt('P2', 'takes') - 0.2, 1e9, { dy: 16 });
    M.vis($('#pV'), t, wt('P3', 'join') - 0.2, 1e9, { dy: 16 });
  }

  /* S: iron half */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('R1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const ta = wt('S1', 'Iron');
    [fRing, fRing2, fAt].forEach(e => fade(e, t, ta));
    const tLeave = wt('S4', 'leaves') - 0.6;
    fE.forEach((e, i) => { let x, y; const a = (t - ta) * 1.3 + i * 2.094;
      if (i === 0 && t > tLeave) { const u = M.io((t - tLeave) / 1.2); const ax = 300 + 120 * Math.cos(a), ay = 260 + 120 * Math.sin(a); x = M.lerp(ax, 640, u); y = M.lerp(ay, 190, u); }
      else { x = 300 + 120 * Math.cos(a); y = 260 + 120 * Math.sin(a); }
      attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); fade(e, t, ta + 0.2, 1e9, 0.2); });
    fade(fOut, t, tLeave + 0.9); M.setT(fCh, t < wt('S4', 'three') ? 'Fe²⁺ · CHARGE +2' : 'Fe³⁺ · CHARGE +3'); fade(fCh, t, wt('S4', 'charge') - 0.2);
    M.vis($('#bF'), t, T0('S5') - 0.1, 1e9, { dy: 16 });
    const TAG = [[tS1 + 0.3, 'OXIDATION HALF'], [T0('S5'), 'GIVES 1 e⁻ EACH']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#eb0', '#eb1', '#eb2', '#eb3'], [wt('S2', 'Oxidation'), wt('S3', 'Reduction'), T0('S5'), wt('S5', 'number')], T1('S5') + 0.3, t);
  }

  /* R: dichromate half */
  const rOn = t >= tR1 - 0.1 && t < tJ1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('J1');
    M.vis($('#mt'), t, tR1 + 0.05, z, { dy: 36, ...o });
    const tq = [tR1 + 0.3, wt('R2', 'two'), wt('R3', 'seven', 1), wt('R4', 'fourteen', 1), wt('R5', 'Add')];
    EQ.forEach((_, i) => { const el = $('#dq' + i); const nx2 = i < 4 ? tq[i + 1] : 1e9; if (i === 0) PUC.write(el, t, tq[0], 0.9); fade(el, t, i === 0 ? tq[0] - 0.05 : tq[i], nx2, 0.25); });
    rowsOn(['#ds0', '#ds1', '#ds2', '#ds3'], tDs, T1('R5') + 0.4, t);
    M.vis($('#cnh'), t, tR1 + 0.6, 1e9, { dy: 10 });
    const V = [[tR1 + 0.7, t < tq[1] ? '2 | 1' : '2 | 2', t >= tq[1]], [tR1 + 0.8, t < tq[2] ? '7 | 0' : '7 | 7', t >= tq[2]], [tR1 + 0.9, t < tq[3] ? (t < tq[2] ? '0 | 0' : '0 | 14') : '14 | 14', t >= tq[3]], [tR1 + 1.0, t < tq[3] ? '-2 | +6' : t < tq[4] ? '+12 | +6' : '+6 | +6', t >= tq[4]]];
    V.forEach(([ti, s, ok], i) => { const el = $('#cn' + i); M.vis(el, t, ti - 0.1, 1e9, { dx: 30, dy: 0 }); const cv = el.querySelector('.cv'); M.setT(cv, s); cv.style.color = ok ? OK : RD; el.querySelector('.cz').style.opacity = ok ? 1 : 0; });
  }

  /* J: match + add */
  const jOn = t >= tJ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const z = OUT('L1');
    M.vis($('#ja'), t, tJ1 + 0.05, z, { dy: 36, ...o });
    fade(scJ.g, t, tJ1 + 0.2);
    const t6 = wt('J1', 'six'), t1 = wt('J1', 'gives'), tx = wt('J2', 'six');
    scJ.upd(t, [t6, t6 + 0.08, t6 + 0.16, t6 + 0.24, t6 + 0.32, t6 + 0.4], [t1, tx, tx + 0.15, tx + 0.3, tx + 0.45, tx + 0.6]);
    fade(x6, t, tx); fade(scJ.tk, t, wt('J2', 'level')); fade(jtag, t, wt('J2', 'taken'));
    M.vis($('#jb'), t, T0('J2') - 0.2, z, { dx: 60, dy: 0, ...o });
    const tAdd = T0('J3'), tCan = wt('J3', 'cancel');
    fade($('#jo0'), t, wt('J2', 'multiply'), tCan); fade($('#jo1'), t, tCan); fade($('#jr0'), t, wt('J2', 'taken'), tCan); fade($('#jr1'), t, tCan);
    M.draw(jLn, t, tAdd, 0.5); fade(jPl, t, tCan);
    M.vis($('#jF'), t, T0('J4') - 0.1, 1e9, { dy: 16 }); setBg($('#jF'), mix(C.soft, C.okBg, M.io((t - T0('J4') - 0.3) / 0.3)));
    avA(t, T1('J4') - 0.6, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('C1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('L2') + 0.3, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'ion') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.6); PUC.write($('#lEq'), t, wt('L2', 'given'), 0.9);
    M.vis($('#lh'), t, T0('L2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const t0 = T0('L2') + 0.2, step = (T1('L2') - t0) / 7.5;
    rowsOn(LR.map((_, i) => '#lr' + i), LR.map((_, i) => t0 + i * step), T1('L2') + 0.3, t);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    fade(bkA, t, wt('C1', 'acid', 1)); M.vis($('#ca0'), t, wt('C1', 'oxygen') - 0.1, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'hydrogen') - 0.1, 1e9, { dy: 16 }); M.vis($('#caV'), t, wt('C1', 'plus') , 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    fade(bkB, t, wt('C2', 'base')); M.vis($('#cf0'), t, wt('C2', 'first') - 0.1, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C2', 'add') - 0.1, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C2', 'pair'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'should') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Electrons') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Split') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'match') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'add') - 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WR.forEach(([, , , ti], i) => { const el = $('#wr' + i); M.vis(el, t, ti - 0.1, 1e9, { dy: 16 }); const fl = M.io((t - ti) / 0.2) * (1 - M.io((t - ti - 0.9) / 0.4)); setBg(el, i === 3 ? mix(C.soft, C.okBg, M.io((t - ti - 0.3) / 0.3)) : mix(C.soft, C.ac2, fl)); });
    { const tw5 = T0('W5'), el = $('#wr1'); const cur = el.style.opacity === '' ? 1 : parseFloat(el.style.opacity); el.style.opacity = (cur * (1 - 0.55 * M.io((t - wt('W6', 'Permanganate')) / 0.3))).toFixed(3); }
    M.vis(wM, t, T0('W7') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'electrons') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'first') - 0.3 });
    const tq = [wt('X3', 'main'), wt('X3', 'oxygen'), wt('X3', 'hydrogen'), wt('X3', 'Electrons')];
    tqs.forEach((e, i) => fade(e, t, tq[i] - 0.1));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'how') - 0.1, tCount, tAns });
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
