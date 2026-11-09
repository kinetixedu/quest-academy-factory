// PUC Chemistry Ep 67: Ionization of weak acids and bases (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: took a proton (H3O+, NH4+) teal; lost a proton (A-, OH-) violet; moving proton H+ orange; whole acid HA ink; alpha blue; Ka, Kb, Kw gold
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tO = s => `\\textcolor{${OK}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tV = s => `\\textcolor{${OC}}{${s}}`;
const hyd = tN('[\\mathrm{H_3O^+}]'), Am = tV('[\\mathrm{A^-}]'), HA = '[\\mathrm{HA}]', al = tB('\\alpha'), Ka = tG('K_a'), Kb = tG('K_b'), Kw = tG('K_w');
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
// acid molecule: ink ball with an orange H+; ionise -> ball violet, H+ flies off and gets a teal ring (now H3O+)
const acid = (p, x, y, r) => { const g = mk(p, 'g', {}); const a = mk(g, 'circle', { cx: x, cy: y, r, fill: C.ink2 }); const h = mk(g, 'circle', { cx: x + r * 0.95, cy: y - r * 0.7, r: r * 0.55, fill: XC }); const ring = mk(g, 'circle', { cx: x, cy: y, r: r * 0.95, fill: 'none', stroke: NC, 'stroke-width': 3 }); return { g, a, h, ring, x, y, r }; };
const ionise = (m, u, dx = 30, dy = -40) => { attr(m.a, 'fill', mix(C.ink2, OC, M.clamp(u * 2))); const hx = m.x + m.r * 0.95 + dx * u, hy = m.y - m.r * 0.7 + dy * u; attr(m.h, 'cx', hx.toFixed(1)); attr(m.h, 'cy', hy.toFixed(1)); attr(m.ring, 'cx', hx.toFixed(1)); attr(m.ring, 'cy', hy.toFixed(1)); m.ring.style.opacity = M.clamp(u * 2 - 1).toFixed(2); };

Object.assign(M.IC, {
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flask: ['M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2', 'M8.5 2h7', 'M7 16h10'],
  tag: ['M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z', 'M7.5 7.5h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['drop', 'Vinegar', 'GOES ON A SALAD', 'Vinegar', 'GENTLE', OK], ['flask', 'Hydrochloric acid', 'BURNS SKIN', 'Hydrochloric', 'HARSH', RD], ['tag', 'Both 0.1 M', 'SAME LABEL', 'Both', 'WHY?', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Acetic acid pH 2.9 · HCl pH 1', 'acetic', 'H3'], ['About 75 times less H₃O⁺', 'seventy', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('flask', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: toffees ---------- */
const QR = [['Strong acid: every one gives H⁺', 'ALL GIVE', 'P2', 'strong', RD], ['Weak acid: only a few give H⁺', 'FEW GIVE', 'P3', 'weak', NC], ['Some take H⁺ back', '⇌ EQUILIBRIUM', 'P4', 'back', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pRowS = Array.from({ length: 10 }, (_, i) => acid(ps, 92 + i * 66, 200, 20)), pRowW = Array.from({ length: 10 }, (_, i) => acid(ps, 92 + i * 66, 400, 20));
const pTs = txt(ps, 60, 112, 'STRONG ACID · 10 OF 10 GIVE', { 'font-size': 20, fill: RD, 'font-weight': 600 }), pTw = txt(ps, 60, 312, 'WEAK ACID · 1 OF 10 GIVES', { 'font-size': 20, fill: NC, 'font-weight': 600 });
$('#pEq').innerHTML = K(`\\mathrm{HA + H_2O} \\rightleftharpoons ${tN('\\mathrm{H_3O^+}')} + ${tV('\\mathrm{A^-}')}`);

/* ---------- S: acetic acid bench ---------- */
const b = $('#bS');
const glass = mk(b, 'path', { d: 'M150 90 V420 a20 20 0 0 0 20 20 H614 a20 20 0 0 0 20 -20 V90', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const water = mk(b, 'rect', { x: 152, y: 110, width: 480, height: 328, fill: '#E6F3FA' });
const BM = Array.from({ length: 100 }, (_, i) => acid(b, 200 + (i % 10) * 43, 150 + Math.floor(i / 10) * 29, 9));
const ION = [37, 82];
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const bCnt = txt(b, 392, 500, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
$('#eR').innerHTML = K(`\\mathrm{CH_3COOH + H_2O} \\rightleftharpoons ${tN('\\mathrm{H_3O^+}')} + ${tV('\\mathrm{CH_3COO^-}')}`);
$('#eA').innerHTML = K(`${al} = \\dfrac{\\text{broken up}}{\\text{total}}`);
const BR = [['ACETIC ACID · 0.1 M', '≈ 1.3 %', 0.013, NC], ['HYDROCHLORIC ACID · 0.1 M', '≈ 100 %', 1, RD]];
$('#brs').innerHTML = BR.map(([k, v, , c], i) => `<div class="br" id="br${i}" style="top:${300 + i * 110}px"><div class="bk">${k}</div><div class="bt"><i id="bi${i}" style="background:${c}"></i><div class="bv" style="color:${i ? '#fff' : c}">${v}</div></div></div>`).join('');
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So most vinegar acid just stays whole!' });

/* ---------- L: Ka ---------- */
$('#lEq').innerHTML = K(`${Ka} = \\dfrac{${hyd}\\,${Am}}{${HA}}`);
const GT = [['K_a = 3.5 \\times 10^{-4}', 'HYDROFLUORIC ACID', 'pKa 3.46 · STRONGER', RD, wt('L3', 'Hydrofluoric')], ['K_a = 1.74 \\times 10^{-5}', 'ACETIC ACID', 'pKa 4.76', HC, wt('L3', 'means')], ['K_a = 4.9 \\times 10^{-10}', 'HYDROCYANIC ACID', 'pKa 9.31 · WEAKER', BC, wt('L3', 'Hydrocyanic')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px;top:270px"><div class="gk" style="font-size:38px">${K(k)}</div><div class="gv" style="color:${c};font-size:28px">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: Ka and alpha ---------- */
const MS = [[K(`\\text{start: } c\\ \\text{mol L}^{-1}\\ \\mathrm{HA}`), 'D2'], [K(`\\text{eq: } c(1-${al}),\\ c${al},\\ c${al}`), 'D3'], [K(`${Ka} = \\dfrac{c${al}^2}{1-${al}}`), 'D4'], [K(`1-${al} \\approx 1:\\ ${Ka} \\approx c${al}^2`), 'D5'], [K(`${al} = \\sqrt{${Ka}/c},\\ ${hyd} = c${al}`), 'D6']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS'), CX = [250, 440, 630], RY = [200, 300, 400];
const dHd = [txt(ds, CX[0], 120, 'HA', { 'text-anchor': 'middle', 'font-size': 26, fill: HC, 'font-weight': 600 }), txt(ds, CX[1], 120, 'H₃O⁺', { 'text-anchor': 'middle', 'font-size': 26, fill: NC, 'font-weight': 600 }), txt(ds, CX[2], 120, 'A⁻', { 'text-anchor': 'middle', 'font-size': 26, fill: OC, 'font-weight': 600 })];
const dRk = ['START', 'CHANGE', 'EQUIL.'].map((s, i) => txt(ds, 50, RY[i] + 8, s, { 'font-size': 18, fill: C.mute, 'font-weight': 600 }));
const dBg = RY.map(y => mk(ds, 'rect', { x: 36, y: y - 36, width: 712, height: 64, rx: 12, fill: C.soft }));
dBg.forEach(r => ds.insertBefore(r, ds.firstChild));
const CELL = [['c', '0', '0'], ['-cα', '+cα', '+cα'], ['c(1 - α)', 'cα', 'cα']];
const COLS = [HC, NC, OC];
const dCl = CELL.map((r, i) => r.map((s, j) => txt(ds, CX[j], RY[i] + 10, s, { 'text-anchor': 'middle', 'font-size': 28, fill: COLS[j], 'font-weight': 600 })));
const dHi = mk(ds, 'rect', { x: CX[0] - 90, y: RY[2] - 32, width: 180, height: 56, rx: 10, fill: 'none', stroke: BC, 'stroke-width': 3 });
const dHt = txt(ds, CX[0], RY[2] + 70, 'α TINY: ≈ c', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });

/* ---------- G: ammonia ---------- */
const gs = $('#gS');
const gN = mk(gs, 'g', {}); mk(gN, 'circle', { cx: 220, cy: 230, r: 60, fill: C.ink2 }); txt(gN, 220, 239, 'NH₃', { 'text-anchor': 'middle', 'font-size': 28, fill: '#fff', 'font-weight': 700 });
const gW = mk(gs, 'g', {}); mk(gW, 'circle', { cx: 560, cy: 230, r: 56, fill: C.ink2 }); const gWt = txt(gW, 560, 239, 'H₂O', { 'text-anchor': 'middle', 'font-size': 28, fill: '#fff', 'font-weight': 700 });
const gNc = gN.firstChild, gWc = gW.firstChild;
const gP = mk(gs, 'circle', { r: 18, fill: XC });
const gLa = txt(gs, 220, 330, 'NH₄⁺ · TOOK H⁺', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 }), gLb = txt(gs, 560, 330, 'OH⁻ · LOST H⁺', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 });
const gEq = mk(gs, 'foreignObject', { x: 0, y: 390, width: 784, height: 80 }); gEq.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:36px">${K(`\\mathrm{NH_3 + H_2O} \\rightleftharpoons ${tN('\\mathrm{NH_4^+}')} + ${tV('\\mathrm{OH^-}')}`)}</div>`;
const GR = [[K(`${Kb} = \\dfrac{${tN('[\\mathrm{NH_4^+}]')}\\,${tV('[\\mathrm{OH^-}]')}}{[\\mathrm{NH_3}]}`), 'G3', 'constant'], [K(`${Kb}(\\mathrm{NH_3}) = 1.77 \\times 10^{-5}`), 'G3', 'ammonia'], [K(`${Ka} \\times ${Kb} = ${Kw}`), 'G4', 'times'], [K(`\\mathrm{p}${Ka} + \\mathrm{p}${Kb} = 14`), 'G5', 'logs']];
$('#grs').innerHTML = GR.map(([s], i) => `<div class="dr" id="gr${i}" style="top:${96 + i * 112}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tGr = GR.map(g => wt(g[1], g[2]) - 0.1);

/* ---------- C: HF vs HCN ---------- */
const cup = (p, n) => { mk(p, 'path', { d: 'M232 90 V350 a20 20 0 0 0 20 20 H532 a20 20 0 0 0 20 -20 V90', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(p, 'rect', { x: 234, y: 110, width: 316, height: 258, fill: '#E6F3FA' }); const ms = Array.from({ length: 100 }, (_, i) => acid(p, 276 + (i % 10) * 26, 140 + Math.floor(i / 10) * 23, 7)); return { ms, ion: [12, 27, 45, 58, 73, 91].slice(0, n) }; };
const cA = cup($('#caS'), 6), cB = cup($('#cfS'), 0);
$('#caV').innerHTML = K(`${Ka} = 3.5 \\times 10^{-4}`); $('#cfV').innerHTML = K(`${Ka} = 4.9 \\times 10^{-10}`);
const cAt = txt($('#caS'), 392, 74, '≈ 6 IN 100 BREAK UP', { 'text-anchor': 'middle', 'font-size': 20, fill: RD, 'font-weight': 600 }), cBt = txt($('#cfS'), 392, 74, 'ALMOST NONE BREAK UP', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: 'Same concentration: which gives more H₃O⁺, HF or HCN?', opts: ['HCN', 'HF'], right: 1, why: 'HF. Its Ka is about 700,000 times bigger.' });

/* ---------- R: polybasic ---------- */
const RR = [[K(`\\mathrm{H_2CO_3} \\rightleftharpoons ${tN('\\mathrm{H^+}')} + ${tV('\\mathrm{HCO_3^-}')}\\quad ${tG('K_{a1}')}`), 'R2', 'one'], [K(`${tV('\\mathrm{HCO_3^-}')} \\rightleftharpoons ${tN('\\mathrm{H^+}')} + ${tV('\\mathrm{CO_3^{2-}}')}\\quad ${tG('K_{a2}')}`), 'R2', 'two'], [K(`${tG('K_{a1}')} > ${tG('K_{a2}')} > ${tG('K_{a3}')}`), 'R3', 'smaller']];
$('#rrs').innerHTML = RR.map(([s], i) => `<div class="dr" id="rr${i}" style="top:${110 + i * 120}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
const ks = $('#kS');
const kIon = mk(ks, 'g', {}); mk(kIon, 'circle', { cx: 290, cy: 250, r: 70, fill: '#ECE4FB', stroke: OC, 'stroke-width': 4 }); txt(kIon, 290, 270, '−', { 'text-anchor': 'middle', 'font-size': 64, fill: OC, 'font-weight': 700 }); txt(kIon, 290, 360, 'NEGATIVE ION', { 'text-anchor': 'middle', 'font-size': 18, fill: OC, 'font-weight': 600 });
const kP = mk(ks, 'g', {}); mk(kP, 'circle', { cx: 0, cy: 0, r: 28, fill: XC }); txt(kP, 0, 10, '+', { 'text-anchor': 'middle', 'font-size': 34, fill: '#fff', 'font-weight': 700 });
const kPull = mk(ks, 'path', { d: '', stroke: C.ink2, 'stroke-width': 5, fill: 'none', 'stroke-dasharray': '10 8' });
const kHand = txt(ks, 640, 210, 'PULL', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${al} = \\sqrt{${Ka}/c} \\qquad \\mathrm{p}${Ka} + \\mathrm{p}${Kb} = 14`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${al} = \\sqrt{${Ka}/c} = \\sqrt{1.74 \\times 10^{-4}}`)],
  [K(`${al} \\approx ${tB('0.0132')}\\ (1.32\\%)`)],
  [K(`${hyd} = c${al} = 1.32 \\times 10^{-3}\\ \\text{M}`)],
  [K(`\\text{pH} = -\\log(1.32 \\times 10^{-3}) \\approx ${tO('2.88')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const meter = (x, lab, col) => { const g = mk(ws, 'g', {}); mk(g, 'rect', { x, y: 90, width: 320, height: 220, rx: 16, fill: C.ink }); mk(g, 'rect', { x: x + 24, y: 114, width: 272, height: 110, rx: 8, fill: '#E8F5F5' }); txt(g, x + 160, 280, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 }); const r = txt(ws, x + 160, 192, '', { 'text-anchor': 'middle', 'font-size': 56, fill: col, 'font-weight': 600 }); return { g, r }; };
const wM1 = meter(36, 'HYDROCHLORIC ACID', RD), wM2 = meter(428, 'ACETIC ACID', NC);
const wSc = mk(ws, 'g', {}); for (let i = 0; i < 14; i++) { const c = i + 0.5; mk(wSc, 'rect', { x: 36 + i * 50.86, y: 400, width: 51.4, height: 24, fill: c < 7 ? mix('#F2B8B8', '#FBEDED', c / 7) : mix('#EAF0FC', '#B9CDF5', (c - 7) / 7) }); }
[0, 7, 14].forEach(v => txt(wSc, 36 + v * 50.86, 452, String(v), { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 }));
const wK1 = mk(ws, 'path', { d: `M${36 + 1 * 50.86 - 9} 386 L${36 + 1 * 50.86 + 9} 386 L${36 + 1 * 50.86} 398 Z`, fill: RD }), wK2 = mk(ws, 'path', { d: 'M-9 -12 L9 -12 L0 0 Z', fill: NC });
const wL1 = txt(ws, 36 + 50.86, 372, 'HCl 1.00', { 'text-anchor': 'middle', 'font-size': 16, fill: RD, 'font-weight': 600 }), wL2 = txt(ws, 0, 372, 'ACETIC 2.88', { 'text-anchor': 'middle', 'font-size': 16, fill: NC, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Dilute it ${K(`\\Rightarrow ${al}`)} falls`, right: `${K(`${al} = \\sqrt{${Ka}/c}:\\ c \\downarrow \\Rightarrow ${al} ${tO('\\uparrow')}`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, '0.1 M: α ≈ 1.3 %', { 'font-size': 28, fill: BC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 170, '0.001 M: α ≈ 12 %', { 'font-size': 28, fill: BC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'α or pH of a weak acid; Ka from pH' });
const OPT = ['1.0 \\times 10^{-4}', '1.0 \\times 10^{-8}', '1.0 \\times 10^{-6}', '1.0 \\times 10^{-2}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'A 0.01 M solution of a weak monobasic acid has pH 4. What is its Ka?', qW: 900, opts: OPT.map(s => K(s)), right: 2, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${hyd} = 10^{-4}\\ \\text{M}`)], [K(`${Ka} \\approx ${hyd}^2 / c`)], [K(`${Ka} = 10^{-8} \\div 0.01 = ${tO('1.0 \\times 10^{-6}')}`)], ['A forgot to square']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · weak acids and bases', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${Ka} = ${hyd}${Am} / ${HA} \\qquad \\mathrm{p}${Ka} = -\\log ${Ka}`), K(`${al} = \\sqrt{${Ka}/c} \\qquad ${hyd} = c${al} = \\sqrt{${Ka}\\,c}`),
    '<b>Ka × Kb = Kw</b> · <b>pKa + pKb = 14</b> at 298 K', '<b>Bigger Ka</b> or smaller pKa: stronger acid · <b>Ka1 &gt; Ka2 &gt; Ka3</b>', '<b>0.1 M acetic acid</b>: α ≈ 1.32 %, pH ≈ 2.88 · dilute it and α rises'] });
const YQ = ['What does a small Ka tell you about an acid?', 'Why does a weak acid break up more when you dilute it?', 'If pKa is 4.76, what is pKb of its conjugate base?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 68', topic: 'Why is salt water not always neutral? Common Ion and Hydrolysis', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(34 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 190; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
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
    const tBd = [wt('H2', 'Same'), wt('H2', 'label'), wt('H2', 'gentle')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'gentle') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'calculate') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'class') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ts = wt('P2', 'every'), tw = wt('P3', 'few'), tb = wt('P4', 'back');
    fade(pTs, t, ts - 0.4); pRowS.forEach((m, i) => { fade(m.g, t, wt('P1', 'toffee') + i * 0.04, 1e9, 0.2); ionise(m, M.io((t - ts - i * 0.08) / 0.5)); });
    fade(pTw, t, tw - 0.4); pRowW.forEach((m, i) => { fade(m.g, t, ts + 0.6 + i * 0.04, 1e9, 0.2); const k = i === 6 ? 1 : 0; const back = i === 2 ? M.io((t - tb) / 0.5) * (1 - M.io((t - tb - 1.2) / 0.5)) : 0; ionise(m, Math.max(k * M.io((t - tw) / 0.5) * (1 - M.io((t - tb) / 0.5)) + (i === 6 ? M.io((t - tb - 1.2) / 0.5) : 0), back)); });
    M.vis($('#pEq'), t, wt('P4', 'equilibrium') - 0.3, 1e9, { dy: 14 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(glass, t, tS1 + 0.3); fade(water, t, tS1 + 0.4);
    const ti = wt('S3', 'Only');
    BM.forEach((m, i) => { fade(m.g, t, T0('S2') - 0.2 + i * 0.012, 1e9, 0.15); const k = ION.indexOf(i); const sw = k >= 0 ? M.io((t - ti - k * 0.4) / 0.6) : (i === 55 ? M.io((t - wt('S2', 'proton')) / 0.5) * (1 - M.io((t - wt('S2', 'acetate')) / 0.5)) : 0); ionise(m, sw, 12, -16); });
    const TAG = [[tS1 + 0.3, 'IN WATER'], [T0('S2'), 'GIVES H⁺'], [T0('S3'), '100 MOLECULES'], [wt('S3', 'Only'), '1 OR 2 SPLIT'], [T0('S5'), 'α ≈ 1.3 %']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.setT(bCnt, 'BROKEN UP: ABOUT 1.3 IN 100'); fade(bCnt, t, wt('S3', 'rest'), T1('S5') - 1.6);
    M.vis($('#eA'), t, wt('S4', 'fraction') - 0.2, 1e9, { dy: 14 }); M.vis($('#eR'), t, T0('S2') + 0.2, 1e9, { dy: 14 });
    BR.forEach((r, i) => { const tb = i ? wt('S5', 'hydrochloric') : wt('S5', 'alpha'); M.vis($('#br' + i), t, tb - 0.3, 1e9, { dy: 16 }); $('#bi' + i).style.width = (712 * Math.max(0.012, r[2]) * M.io((t - tb) / 0.9)).toFixed(1) + 'px'; });
    avA(t, T1('S5') - 1.4, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    PUC.write($('#lEq'), t, T0('L2'), 1.4);
    M.vis($('#hcd'), t, wt('L4', 'minus') - 0.3, 1e9, POP);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.3, 1e9, { dy: 24 }); const nxt = i === 0 ? GT[2][4] : i === 1 ? GT[0][4] : 1e9; const on = M.io((t - g[4] + 0.2) / 0.3) * (1 - M.io((t - nxt + 0.2) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    dHd.forEach(e => fade(e, t, T0('D2'))); fade(dRk[0], t, T0('D2') + 0.2); fade(dBg[0], t, T0('D2') + 0.2); dCl[0].forEach((e, j) => fade(e, t, wt('D2', 'acid') + j * 0.15));
    [1, 2].forEach(i => { fade(dRk[i], t, T0('D3') + (i - 1) * 1.2); fade(dBg[i], t, T0('D3') + (i - 1) * 1.2); dCl[i].forEach((e, j) => fade(e, t, T0('D3') + 0.3 + (i - 1) * 1.6 + j * 0.15)); });
    fade(dHi, t, wt('D5', 'one') - 0.1); fade(dHt, t, wt('D5', 'almost'));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, wt('G2', 'hydroxide') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(gN, t, tG1 + 0.5); fade(gW, t, tG1 + 0.7);
    const tp = wt('G2', 'takes'), u = M.io((t - tp) / 0.8);
    const px = M.lerp(560 - 50, 220 + 56, u), py = 186 - 80 * Math.sin(Math.PI * u) - (1 - u) * 0;
    attr(gP, 'cx', px.toFixed(1)); attr(gP, 'cy', py.toFixed(1)); fade(gP, t, tG1 + 0.8);
    attr(gNc, 'fill', mix(C.ink2, NC, M.clamp(u * 2 - 1))); attr(gWc, 'fill', mix(C.ink2, OC, M.clamp(u * 2 - 1))); M.setT(gWt, u > 0.5 ? 'OH⁻' : 'H₂O');
    fade(gLa, t, wt('G2', 'ammonium')); fade(gLb, t, wt('G2', 'hydroxide')); fade(gEq, t, wt('G2', 'hydroxide') + 0.4);
    GR.forEach((_, i) => { const r = $('#gr' + i); M.vis(r.querySelector('.sn'), t, tGr[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tGr[i], 0.9); });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'hydrocyanic') - 0.3, zc, { dx: 60, dy: 0, ...o });
    const ta = wt('C1', 'hydrofluoric') + 0.3, tb = wt('C1', 'hydrocyanic') + 0.3;
    cA.ms.forEach((m, i) => { fade(m.g, t, tC1 + 0.2 + i * 0.008, 1e9, 0.15); ionise(m, cA.ion.includes(i) ? M.io((t - ta - cA.ion.indexOf(i) * 0.15) / 0.5) : 0, 8, -10); });
    cB.ms.forEach((m, i) => { fade(m.g, t, wt('C1', 'hydrocyanic') + i * 0.008, 1e9, 0.15); ionise(m, 0); });
    fade(cAt, t, ta + 0.8); fade(cBt, t, tb + 0.6);
    M.vis($('#caV'), t, ta - 0.2, 1e9, { dy: 16 }); M.vis($('#cfV'), t, tb - 0.2, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Its') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tRr[i], 0.9); });
    M.vis($('#rb'), t, T0('R3') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(kIon, t, T0('R3')); fade(kP, t, T0('R3') + 0.1);
    const tp = wt('R3', 'Pulling'), k = t < tp ? 0 : (t - tp) % 2.2, st = M.io(k / 0.8) * (1 - M.io((k - 1.3) / 0.5));
    const px = 360 + 20 + 120 * st; attr(kP, 'transform', `translate(${px.toFixed(1)},250)`);
    attr(kPull, 'd', `M${(px + 30).toFixed(1)} 250 H600`); fade(kPull, t, tp); fade(kHand, t, tp);
    M.vis($('#rP'), t, wt('R3', 'magnet') - 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Bigger') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'times') - 0.5, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, T1('T1') - 0.6, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [wM1.g, wM2.g, wSc, wK1, wL1].forEach(e => fade(e, t, T0('W2') + 0.5));
    M.setT(wM1.r, '1.00'); fade(wM1.r, t, T0('W2') + 0.6);
    const u = M.io((t - T0('W6')) / 1.2), v = M.lerp(7, 2.88, u);
    M.setT(wM2.r, t < T0('W6') ? '- - -' : v.toFixed(2)); fade(wM2.r, t, T0('W2') + 0.6);
    const x = 36 + v * 50.86; attr(wK2, 'transform', `translate(${x.toFixed(1)},398)`); attr(wL2, 'x', x.toFixed(1)); attr(wL2, 'y', '352'); fade(wK2, t, T0('W6')); fade(wL2, t, T0('W6') + 1.1);
    M.vis($('#wG'), t, wt('W6', 'Much') - 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'adding') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Alpha') - 0.2 });
    fade(tq1, t, wt('X3', 'Smaller')); fade(tq2, t, wt('X3', 'point'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.1, tCount, tAns });
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
