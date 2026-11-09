// PUC Chemistry Ep 73: Types of redox reactions (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electron e- orange (canon), positive score blue, negative score red, carbon / the element in play teal, oxygen violet, H ink, Cl green, Br brown, K+ grey, oxidised teal tag, reduced blue tag
const NC = C.ac, HC = C.ink, EC = '#C8461B', PL = '#2B6CB0', RD = C.red, GC = '#B7791F', OC = '#7A4FE0', CL = '#3C9A5F', BR = '#9C4A1A', KG = '#9AA3B5', OK = C.ok;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const col = (c, s) => `\\textcolor{${c}}{${s}}`;
const pl = s => col(PL, s), ng = s => col(RD, s), ov = (n, s) => `\\overset{${n.startsWith('-') ? ng(n) : n === '0' ? '0' : pl(n)}}{\\mathrm{${s}}}`;
const at = (p, r, fill, s, fs = 18) => { const g = mk(p, 'g', {}); g._c = mk(g, 'circle', { cx: 0, cy: 0, r, fill }); g._t = s ? txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }) : null; return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const chip = (p, x, y, s, c) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x - 34, y: y - 20, width: 68, height: 40, rx: 9, fill: '#fff', stroke: c, 'stroke-width': 3 }); txt(g, x, y + 8, s, { 'text-anchor': 'middle', 'font-size': 22, fill: c, 'font-weight': 700 }); return g; };
const mv = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const L = (a, b, u) => M.lerp(a, b, u);

Object.assign(M.IC, {
  lego: ['M4 9h16v10H4z', 'M7 9V6h3v3', 'M14 9V6h3v3'],
  split: ['M4 9h7v10H4z', 'M14 9h6v10h-6z', 'M12 4v16'],
  swap: ['M7 7h13l-4-4', 'M17 17H4l4 4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tL1 = T0('L1'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['lego', 'Snap together', 'COMBINE', 'snap', 'JOIN', NC], ['split', 'Break apart', 'BREAK', 'break', 'SPLIT', GC], ['swap', 'Player swaps in', 'PUSH OUT', 'stronger', 'SWAP', PL]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Twenty reactions, all different', 'different', 'H3'], ['He wants to sort them fast', 'fast', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('lego', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: redox check ---------- */
const QR = [['Write every oxidation number', 'BEFORE + AFTER', 'P1', 'Write', NC], ['One goes up, one goes down', 'REDOX', 'P2', 'up', OK], ['No number changes', 'NOT REDOX', 'P3', 'no', RD], ['Then name its family', '4 FAMILIES', 'P3', 'dramatic', NC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const eqrow = (id, top, tex, tag, c, h = 76, fs = 26) => `<div class="eqr" id="${id}" style="top:${top}px;height:${h}px;font-size:${fs}px">${K(tex)}<span class="tg" style="color:${c}">${tag}</span></div>`;
const PE = [[`${ov('0', 'C')} + ${ov('0', 'O_2')} \\rightarrow ${ov('+4', 'C')}${ov('-2', 'O_2')}`, 'CHANGES: REDOX', OK, () => wt('P2', 'up')], [`${ov('+2', 'Ca')}${ov('+4', 'C')}${ov('-2', 'O_3')} \\rightarrow ${ov('+2', 'Ca')}${ov('-2', 'O')} + ${ov('+4', 'C')}${ov('-2', 'O_2')}`, 'NO CHANGE', RD, () => wt('P3', 'no')]];
$('#pes').innerHTML = PE.map(([e, tg, c], i) => eqrow('pe' + i, 84 + i * 120, e, tg, c, 100, 28)).join('') + `<div class="tile" id="pe2" style="top:330px;font:600 24px Poppins;justify-content:center">Combine · Break · Push out · Split the score</div>`;
const tPe = [...PE.map(p => p[3]()), wt('P3', 'dramatic')];

/* ---------- L: combination + decomposition ---------- */
const ls = $('#lS');
const lC = at(ls, 34, NC, 'C', 24), lO1 = at(ls, 30, OC, 'O', 22), lO2 = at(ls, 30, OC, 'O', 22);
const lB1 = mk(ls, 'line', { stroke: HC, 'stroke-width': 6 }), lB2 = mk(ls, 'line', { stroke: HC, 'stroke-width': 6 });
const lc0 = chip(ls, 200, 170, '0', HC), lc1 = chip(ls, 590, 170, '0', HC), lc2 = chip(ls, 392, 170, '+4', PL), lc3 = chip(ls, 290, 340, '-2', RD), lc4 = chip(ls, 494, 340, '-2', RD);
$('#lrs').innerHTML = eqrow('lr0', 420, `${ov('0', 'C')} + ${ov('0', 'O_2')} \\rightarrow ${ov('+4', 'C')}${ov('-2', 'O_2')}`, 'ONE PRODUCT', NC, 100, 30);
const hs = $('#hS');
const WA = [[250, 220], [205, 262], [295, 262], [250, 370], [205, 412], [295, 412]], WB = [[470, 150], [470, 230], [530, 230], [540, 150], [470, 310], [530, 310]];
// order: O1, Ha, Hb, O2, Hc, Hd -> O1 and O2 pair at top, H pairs below
const WB2 = [[400, 140], [400, 250], [460, 250], [464, 140], [400, 340], [460, 340]];
const hAt = WA.map((_, i) => i % 3 === 0 ? at(hs, 26, OC, 'O', 20) : at(hs, 20, HC, 'H', 16));
const hBd = [[0, 1], [0, 2], [3, 4], [3, 5]].map(() => mk(hs, 'line', { stroke: HC, 'stroke-width': 5 }));
const hNew = [[0, 3], [1, 2], [4, 5]].map(() => mk(hs, 'line', { stroke: HC, 'stroke-width': 5 }));
const hZap = mk(hs, 'path', { d: 'M360 200 l-24 60 h30 l-24 60', stroke: GC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round' });
const hT = [txt(hs, 520, 148, 'O₂: -2 → 0', { 'font-size': 20, fill: PL, 'font-weight': 700 }), txt(hs, 520, 258, 'H₂: +1 → 0', { 'font-size': 20, fill: RD, 'font-weight': 700 }), txt(hs, 520, 348, 'H₂: +1 → 0', { 'font-size': 20, fill: RD, 'font-weight': 700 })];
$('#hrs').innerHTML = eqrow('hr0', 420, '\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}', 'NO CHANGE · NOT REDOX', RD, 84, 28);

/* ---------- S: Cl2 into KBr ---------- */
const b = $('#bS');
const sol = mk(b, 'rect', { x: 156, y: 170, width: 472, height: 326, rx: 14, fill: '#F2F6F7' });
mk(b, 'path', { d: 'M152 110 V480 a20 20 0 0 0 20 20 H612 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
mk(b, 'path', { d: 'M190 60 V150', stroke: C.ink2, 'stroke-width': 10, 'stroke-linecap': 'round' }); txt(b, 210, 80, 'Cl₂ gas', { 'font-size': 18, fill: CL, 'font-weight': 600 });
const CC = [[310, 240], [470, 300], [330, 410]], BA = [[220, 300], [560, 230], [220, 455]], BB = [[420, 205], [545, 410], [450, 460]];
const spect = [[580, 330], [250, 380], [400, 330], [560, 470]].map(p => { const g = at(b, 14, KG, 'K⁺', 11); place(g, p[0], p[1]); return g; });
const cl = CC.map(() => [at(b, 20, CL, 'Cl', 14), at(b, 20, CL, 'Cl', 14)]);
const clB = CC.map(() => mk(b, 'line', { stroke: HC, 'stroke-width': 5 }));
const br = CC.map(() => [at(b, 21, BR, 'Br⁻', 12), at(b, 21, BR, 'Br⁻', 12)]);
const brB = CC.map(() => mk(b, 'line', { stroke: HC, 'stroke-width': 5 }));
const el = CC.map(() => [mk(b, 'circle', { r: 7, fill: EC }), mk(b, 'circle', { r: 7, fill: EC })]);
const lg = mk(b, 'g', {}); [[CL, 'Cl', 190], [BR, 'Br', 300], [KG, 'K⁺', 410], [EC, 'e⁻', 520]].forEach(([c, s, x]) => { mk(lg, 'circle', { cx: x, cy: 546, r: 9, fill: c }); txt(lg, x + 16, 553, s, { 'font-size': 19, fill: HC, 'font-weight': 600 }); });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
let TR = [];
const trT = () => [[wt('S2', 'bubbles'), wt('S3', 'snatches'), wt('S4', 'pair')], [T0('S4') + 0.2, T0('S4') + 1.0, T0('S4') + 1.8], [T0('S4') + 1.2, T0('S4') + 2.0, T0('S4') + 2.8]];
$('#bEq').innerHTML = K(`${ov('0', 'Cl_2')} + 2\\mathrm{K}${ov('-1', 'Br')} \\rightarrow 2\\mathrm{K}${ov('-1', 'Cl')} + ${ov('0', 'Br_2')}`);
const trow = (id, top, s, tag, c) => `<div class="eqr" id="${id}" style="top:${top}px;height:70px;font:600 25px Poppins">${s}<span class="tg" style="color:${c}">${tag}</span></div>`;
const ER = [['Chlorine: 0 → -1', 'REDUCED', PL, () => wt('S3', 'chloride')], ['Bromide: -1 → 0', 'OXIDISED', NC, () => wt('S4', 'bromine')], ['Solution turns orange', 'Br₂', BR, () => wt('S4', 'orange')]];
$('#ets').innerHTML = ER.map(([s, tg, c], i) => trow('et' + i, 170 + i * 80, s, tg, c)).join('');
const tEr = ER.map(e => e[3]());
$('#hsR').innerHTML = ['F₂', '>', 'Cl₂', '>', 'Br₂', '>', 'I₂'].map(s => `<span style="color:${s === '>' ? C.mute : s === 'Cl₂' ? CL : s === 'Br₂' ? BR : HC}">${s}</span>`).join('');

/* ---------- D: activity series ---------- */
const AS = [['K', 'Potassium'], ['Na', 'sodium'], ['Ca', 'calcium'], ['Mg', 'magnesium'], ['Al', 'aluminium'], ['Zn', 'zinc'], ['Fe', 'iron'], ['Pb', 'lead'], ['H', 'hydrogen'], ['Cu', 'copper'], ['Hg', 'mercury'], ['Ag', 'silver'], ['Au', 'gold']];
$('#acs').innerHTML = AS.map(([s], i) => `<div class="ac2c" id="as${i}" style="left:${36 + (i % 7) * 102}px;top:${92 + Math.floor(i / 7) * 68}px">${s}</div>`).join('') + `<div class="gl" id="asA" style="top:236px;color:${GC}">← MORE ACTIVE · PUSHES OUT ANY METAL BELOW IT</div>`;
const tAs = AS.map(a => wt('D2', a[1]));
$('#ars').innerHTML = eqrow('ar0', 284, '\\mathrm{Zn} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{Cu}', 'YES', OK) + eqrow('ar1', 376, '\\mathrm{Cu} + \\mathrm{ZnSO_4} \\rightarrow', 'NO REACTION', RD);
const RL = [[eqrow('rl0', 84, '\\mathrm{Zn} + 2\\mathrm{HCl} \\rightarrow \\mathrm{ZnCl_2} + \\mathrm{H_2}', 'Zn ABOVE H', OK), () => wt('D4', 'Zinc')], [eqrow('rl1', 180, '2\\mathrm{Na} + 2\\mathrm{H_2O} \\rightarrow 2\\mathrm{NaOH} + \\mathrm{H_2}', 'COLD WATER', OK), () => wt('D4', 'Sodium')], [eqrow('rl2', 276, '\\mathrm{Cu} + \\mathrm{HCl} \\rightarrow', 'Cu BELOW H: NO H₂', RD), () => wt('D4', 'water') + 0.2]];
$('#rls').innerHTML = RL.map(r => r[0]).join('');
const tRl = RL.map(r => r[1]());

/* ---------- G: disproportionation ---------- */
const gs = $('#gS');
const gC0 = chip(gs, 392, 96, '0', HC);
const gA = at(gs, 26, CL, 'Cl', 18), gB = at(gs, 26, CL, 'Cl', 18), gO = at(gs, 22, OC, 'O', 16), gBd = mk(gs, 'line', { stroke: HC, 'stroke-width': 5 });
const gUp = mk(gs, 'path', { d: 'M420 190 Q520 220 560 330', stroke: PL, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '10 7' }), gDn = mk(gs, 'path', { d: 'M364 190 Q264 220 224 330', stroke: RD, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '10 7' });
const gc1 = chip(gs, 224, 460, '-1', RD), gc2 = chip(gs, 580, 460, '+1', PL);
const gt1 = txt(gs, 224, 520, 'Cl⁻ · DOWN', { 'text-anchor': 'middle', 'font-size': 20, fill: RD, 'font-weight': 700 }), gt2 = txt(gs, 580, 520, 'ClO⁻ · UP', { 'text-anchor': 'middle', 'font-size': 20, fill: PL, 'font-weight': 700 });
$('#grs').innerHTML = eqrow('gr0', 84, `${ov('0', 'Cl_2')} + 2\\mathrm{OH^-} \\rightarrow ${ov('-1', 'Cl')}^- + ${ov('+1', 'Cl')}\\mathrm{O^-} + \\mathrm{H_2O}`, 'UP + DOWN', OC, 100, 28) +
  eqrow('gr1', 204, `2\\mathrm{H_2}${ov('-2', 'S')} + ${ov('+4', 'S')}\\mathrm{O_2} \\rightarrow 3${ov('0', 'S')} + 2\\mathrm{H_2O}`, 'MEET IN MIDDLE', GC, 100, 28);
const g2 = $('#g2S'), GX = v => 152 + (v + 2) * 80, GY = 420;
const g2g = mk(g2, 'g', {}); mk(g2g, 'line', { x1: 100, y1: GY, x2: 684, y2: GY, stroke: HC, 'stroke-width': 3 });
for (let v = -2; v <= 4; v++) { mk(g2g, 'line', { x1: GX(v), y1: GY - 9, x2: GX(v), y2: GY + 9, stroke: HC, 'stroke-width': 2 }); txt(g2g, GX(v), GY + 36, (v > 0 ? '+' : '') + v, { 'text-anchor': 'middle', 'font-size': 20, fill: v < 0 ? RD : v > 0 ? PL : HC, 'font-weight': 600 }); }
txt(g2g, 100, 350, 'SULPHUR SCORES', { 'font-size': 16 });
const gS1 = at(g2, 18, GC, 'S', 14), gS2 = at(g2, 18, GC, 'S', 14);

/* ---------- C ---------- */
const crow = (id, top, s, tag, c) => `<div class="eqr" id="${id}" style="top:${top}px;font:600 26px Poppins">${s}<span class="tg" style="color:${c}">${tag}</span></div>`;
$('#car').innerHTML = crow('ca0', 96, 'One compound → two or more', 'BREAKS', GC) + eqrow('ca1', 190, '2\\mathrm{H_2O} \\rightarrow 2\\mathrm{H_2} + \\mathrm{O_2}', 'EXAMPLE', GC) + crow('ca2', 284, 'Redox only if numbers change', 'CHECK', RD) + `<div class="vt" id="caV" style="font-size:30px">many elements change</div>`;
$('#cfr').innerHTML = crow('cf0', 96, 'One element goes up and down', 'SPLITS', OC) + eqrow('cf1', 190, `${ov('0', 'Cl_2')} \\rightarrow ${ov('-1', 'Cl')}^- + ${ov('+1', 'Cl')}\\mathrm{O^-}`, 'EXAMPLE', OC, 84) + crow('cf2', 284, 'Always a redox reaction', 'ALWAYS', OK) + `<div class="vt" id="cfV" style="font-size:30px">one element, two scores</div>`;
const th1 = PUC.think($('#th1'), { q: 'Hydrogen peroxide breaks into water and oxygen. Is it also disproportionation?', opts: ['No', 'Yes'], right: 1, why: 'Yes. O goes from -1 down to -2 in H₂O, and up to 0 in O₂. One reaction, two families.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{join} \\cdot \\text{break} \\cdot \\text{push out} \\cdot \\text{split the score}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K('3\\mathrm{Mg} + \\mathrm{N_2} \\rightarrow \\mathrm{Mg_3N_2}')],
  [K('2\\mathrm{KClO_3} \\rightarrow 2\\mathrm{KCl} + 3\\mathrm{O_2}')],
  [K('\\mathrm{Fe} + 2\\mathrm{HCl} \\rightarrow \\mathrm{FeCl_2} + \\mathrm{H_2}')],
  [K('\\mathrm{P_4} + 3\\mathrm{OH^-} + 3\\mathrm{H_2O} \\rightarrow \\mathrm{PH_3} + 3\\mathrm{H_2PO_2^-}')]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const WF = [['1 · COMBINATION', 'Mg 0 → +2 · N 0 → -3', NC, () => wt('W2', 'Combination')], ['2 · DECOMPOSITION', 'Cl +5 → -1 · O -2 → 0', GC, () => wt('W3', 'Decomposition')], ['3 · DISPLACEMENT', 'Fe above H in the series', PL, () => wt('W4', 'Displacement')], ['4 · DISPROPORTIONATION', 'P 0 → -3 and +1', OC, () => wt('W5', 'Disproportionation')]];
$('#wrs').innerHTML = WF.map(([a, s, c], i) => `<div class="tile" id="wf${i}" style="top:${84 + i * 104}px;flex-direction:column;align-items:flex-start;justify-content:center;gap:4px"><b style="font:700 24px Poppins;color:${c}">${a}</b><span id="wfs${i}" style="font:600 20px 'IBM Plex Mono'">${s}</span></div>`).join('');
const tWf = WF.map(w => w[3]());

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every decomposition is a redox reaction', right: `${K('\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}')}: no number changes, not redox` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'Ca +2 → +2   C +4 → +4', { 'font-size': 26, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 180, 'O -2 → -2   NO CHANGE', { 'font-size': 26, fill: RD, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Classify a reaction with a reason, or pick the disproportionation reaction from four' });
const OPT = ['2\\mathrm{KClO_3} \\rightarrow 2\\mathrm{KCl} + 3\\mathrm{O_2}', '\\mathrm{Cl_2} + 2\\mathrm{OH^-} \\rightarrow \\mathrm{Cl^-} + \\mathrm{ClO^-} + \\mathrm{H_2O}', '\\mathrm{Zn} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{Cu}', '2\\mathrm{H_2S} + \\mathrm{SO_2} \\rightarrow 3\\mathrm{S} + 2\\mathrm{H_2O}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these is a disproportionation reaction?', qW: 940,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 18 });
const so = PUC.solution($('#so'), [[K(`${ov('0', 'Cl_2')} \\rightarrow \\mathrm{Na}${ov('-1', 'Cl')} + \\mathrm{Na}${ov('+1', 'Cl')}\\mathrm{O}`)], ['Cl goes down and up: B'], ['A breaks up · C pushes out'], ['D: comproportionation']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'up'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Types of redox reactions', y0: 96, dy: 74, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Redox check</b>: one oxidation number up, another down', '<b>Combination</b>: C + O₂ → CO₂ · <b>decomposition</b>: 2H₂O → 2H₂ + O₂', '<b>Displacement</b>: metals (activity series), hydrogen, halogens F₂ > Cl₂ > Br₂ > I₂', '<b>Disproportionation</b>: Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O (one element up and down)', '<b>Comproportionation</b>: 2H₂S + SO₂ → 3S + 2H₂O (meet in the middle)'] });
const YQ = ['Why is heating CaCO₃ not a redox reaction?', 'Can copper push zinc out of zinc sulphate?', 'In disproportionation, what happens to one element?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 74', topic: 'Balance redox without guessing? Oxidation Number Method', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 512, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The stronger puller wins the electrons!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.2, 1.05, 960, 560], [T1('S4') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.beq').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); if (k && tg && k.offsetWidth + tg.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * (640 - tg.offsetWidth) / k.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sol .sx').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 620 / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
  TR = trT();
}
const hl = (t, els, ts, tEnd) => els.forEach((el, i) => { const nx2 = i < els.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
const shrink = (el, t, ts) => { const sh = M.spring(t - ts, M.HEAVY); snap(el, 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); };
const ln = (e, a, c) => { attr(e, 'x1', a[0].toFixed(1)); attr(e, 'y1', a[1].toFixed(1)); attr(e, 'x2', c[0].toFixed(1)); attr(e, 'y2', c[1].toFixed(1)); };
const tf = g => (g.getAttribute('transform') || 'translate(0,0)').match(/[-\d.]+/g).map(Number);

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
    const tB = [wt('H2', 'behave'), wt('H2', 'few'), wt('H2', 'families')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'families') + 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'oxidation') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => M.vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, QR.map((_, i) => $('#qr' + i)), tQr, T1('P3') + 0.4);
    M.vis($('#pw'), t, wt('P1', 'every') - 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#pe' + i), t, (i ? tPe[i] : wt('P1', 'number')) - 0.1, 1e9, { dy: 16 }));
    hl(t, [0, 1, 2].map(i => $('#pe' + i)), [wt('P2', 'up'), tPe[1], tPe[2]], T1('P3') + 0.4);
  }

  /* L: combination + decomposition */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('S1'), tSh = T0('L3') - 0.3, tj = wt('L2', 'burns');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o }); shrink($('#lw'), t, tSh); { const sh = M.spring(t - tSh, M.HEAVY), off = sh >= 1 ? 0 : (1 - sh) * 408; ls.style.transform = `translateX(${off.toFixed(1)}px)`; $('#lr0').style.left = (36 + off).toFixed(1) + 'px'; }
    const u = M.io((t - tj) / 1.2);
    const pc = [L(200, 392, u), 250], p1 = [L(560, 300, u), 250], p2 = [L(620, 484, u), 250];
    place(lC, ...pc); place(lO1, ...p1); place(lO2, ...p2); ln(lB2, p1, p2); lB1.style.opacity = 0;
    [lC, lO1, lO2].forEach((g, i) => fade(g, t, wt('L1', 'Two') + i * 0.15)); fade(lB2, t, wt('L1', 'Two') + 0.3);
    fade(lc0, t, wt('L1', 'element'), tj + 0.6); fade(lc1, t, wt('L1', 'element') + 0.1, tj + 0.6);
    fade(lc2, t, wt('L2', 'plus')); fade(lc3, t, wt('L2', 'minus')); fade(lc4, t, wt('L2', 'minus') + 0.1);
    M.vis($('#lr0'), t, wt('L2', 'dioxide') - 0.1, 1e9, { dy: 16 });
    M.vis($('#lh'), t, tSh, z, { dx: 60, dy: 0, ...o });
    const ts2 = wt('L3', 'splits'), v = M.io((t - ts2) / 1.4);
    hAt.forEach((g, i) => { place(g, L(WA[i][0], WB2[i][0], v), L(WA[i][1], WB2[i][1], v)); fade(g, t, T0('L3') + 0.2 + i * 0.05); });
    [[0, 1], [0, 2], [3, 4], [3, 5]].forEach(([a, c], k) => { ln(hBd[k], tf(hAt[a]), tf(hAt[c])); fade(hBd[k], t, T0('L3') + 0.3, ts2 + 0.2, 0.25); });
    [[0, 3], [1, 2], [4, 5]].forEach(([a, c], k) => { ln(hNew[k], tf(hAt[a]), tf(hAt[c])); fade(hNew[k], t, ts2 + 1.2); });
    fade(hZap, t, wt('L3', 'Electricity'), ts2 + 1.4); hT.forEach((e, i) => fade(e, t, ts2 + 1.3 + i * 0.2));
    M.vis($('#hr0'), t, wt('L4', 'calcium') - 0.1, 1e9, { dy: 16 }); setBg($('#hr0'), mix(C.soft, '#F6D3D3', M.io((t - wt('L4', 'not')) / 0.3)));
  }

  /* S: Cl2 into KBr */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, wt('S1', 'bench') - 0.2, z, { dx: 60, dy: 0, ...o });
    let nBr2 = 0;
    CC.forEach((c, k) => { const [tIn, tE, tP] = TR[k], ui = M.io((t - tIn) / 1.0), us = M.io((t - tE - 0.6) / 0.6), up = M.io((t - tP) / 0.8);
      const cx = L(190, c[0], ui) + 10 * Math.sin(0.7 * t + k) * ui, cy = L(150, c[1], ui) + 8 * Math.cos(0.6 * t + k) * ui;
      const a = [cx - 22 - 50 * us, cy - 10 * us], d = [cx + 22 + 50 * us, cy + 10 * us];
      place(cl[k][0], ...a); place(cl[k][1], ...d); ln(clB[k], a, d); clB[k].style.opacity = (fade(cl[k][0], t, tIn, 1e9, 0.2) * (1 - us)).toFixed(2); fade(cl[k][1], t, tIn, 1e9, 0.2);
      [0, 1].forEach(j => M.setT(cl[k][j]._t, t >= tE + 0.6 ? 'Cl⁻' : 'Cl'));
      const ba = [BA[k][0] + 12 * Math.sin(0.8 * t + k), BA[k][1] + 9 * Math.cos(0.7 * t + k)], bb0 = [BB[k][0] + 12 * Math.sin(0.9 * t + 2 * k), BB[k][1] + 9 * Math.cos(0.5 * t + k)];
      const bb = [L(bb0[0], ba[0] + 40, up), L(bb0[1], ba[1], up)];
      place(br[k][0], ...ba); place(br[k][1], ...bb); ln(brB[k], ba, bb); brB[k].style.opacity = M.clamp((up - 0.8) / 0.2).toFixed(2);
      [0, 1].forEach(j => { M.setT(br[k][j]._t, t >= tE + 0.6 ? 'Br' : 'Br⁻'); attr(br[k][j]._t, 'font-size', t >= tE + 0.6 ? 14 : 12); });
      el[k].forEach((e, j) => { const src = j ? bb : ba, dst = j ? d : a, u = M.io((t - tE) / 0.6); mv(e, L(src[0], dst[0], u), L(src[1] - 16, dst[1] - 16, u)); fade(e, t, tE - 0.1, 1e9, 0.15); });
      nBr2 += up; });
    attr(sol, 'fill', mix('#F2F6F7', '#F6D3A0', nBr2 / 3));
    const TAG = [[tS1 + 0.3, 'COLOURLESS KBr'], [TR[0][0], 'Cl₂ BUBBLES IN'], [TR[0][1], 'Cl TAKES e⁻ FROM Br⁻'], [TR[0][2], 'Br PAIRS UP: Br₂'], [T0('S5'), 'Cl PUSHED Br OUT']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    PUC.write($('#bEq'), t, wt('S1', 'bench'), 0.9);
    ER.forEach((e, i) => { M.vis($('#et' + i), t, wt('S1', 'bench') + 0.4 + i * 0.15, 1e9, { dy: 16 }); M.setT($('#et' + i + ' .tg'), t >= tEr[i] ? e[1] : '?'); });
    hl(t, ER.map((_, i) => $('#et' + i)), tEr, T0('S5'));
    M.vis($('#hsK'), t, wt('S5', 'harder') - 0.2, 1e9, { dy: 10 }); M.vis($('#hsR'), t, wt('S5', 'harder'), 1e9, { dy: 16 });
    setBg($('#hsR'), mix(C.soft, C.ac2, M.io((t - wt('S5', 'Fluorine')) / 0.3)));
    avA(t, T1('S5') - 0.4, z); fade(lg, t, tS1, T1('S5') - 0.4);
  }

  /* D: activity series */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('R1'), tSh = T0('D4') - 0.3;
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o }); shrink($('#mt'), t, tSh);
    const shD = M.spring(t - tSh, M.HEAVY), wD = shD >= 1 ? 1 : shD;
    AS.forEach(([s], i) => { const el2 = $('#as' + i); el2.style.left = L(36 + i * 118, 36 + (i % 7) * 102, wD).toFixed(1) + 'px'; el2.style.top = L(92, 92 + Math.floor(i / 7) * 68, wD).toFixed(1) + 'px'; M.vis(el2, t, i < 1 ? wt('D1', 'activity') : tAs[i] - 0.1, 1e9, POP); const isZ = s === 'Zn' || s === 'Cu', isH = s === 'H';
      const on = (isZ ? M.io((t - wt('D3', 'Zinc')) / 0.3) * (1 - M.io((t - T0('D4')) / 0.3)) : 0) + (isH ? M.io((t - T0('D4')) / 0.3) : 0) + M.io((t - tAs[i]) / 0.2) * (1 - M.io((t - tAs[i] - 0.5) / 0.3));
      setBg(el2, mix(C.soft, isH ? '#F3E3BF' : C.ac2, M.clamp(on))); });
    M.vis($('#asA'), t, T1('D2') - 0.2, 1e9, { dy: 8 });
    $('#asA').style.top = L(172, 236, wD).toFixed(1) + 'px'; $('#ar0').style.top = L(250, 284, wD).toFixed(1) + 'px'; $('#ar1').style.left = L(820, 36, wD).toFixed(1) + 'px'; $('#ar1').style.top = L(250, 376, wD).toFixed(1) + 'px';
    M.vis($('#ar0'), t, wt('D3', 'Zinc') - 0.1, 1e9, { dy: 16 }); M.vis($('#ar1'), t, wt('D3', 'cannot') - 0.2, 1e9, { dy: 16 });
    M.vis($('#dP'), t, wt('D3', 'lower') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, tSh, z, { dx: 60, dy: 0, ...o });
    RL.forEach((_, i) => M.vis($('#rl' + i), t, tRl[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, RL.map((_, i) => $('#rl' + i)), tRl, T1('D4') + 0.4);
  }

  /* G: disproportionation + comproportionation */
  const gOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1'), tSh = T0('R3') - 0.3, ts = wt('R3', 'Some'), u1 = M.io((t - ts) / 1.0), u2 = M.io((t - wt('R3', 'Some', 1)) / 1.0);
    M.vis($('#gb'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    const a = [L(370, 224, u1), L(170, 400, u1)], d = [L(414, 560, u2), L(170, 400, u2)];
    place(gA, ...a); place(gB, ...d); ln(gBd, a, d); gBd.style.opacity = (fade(gA, t, T0('R2') - 0.2) * (1 - Math.max(u1, u2))).toFixed(2); fade(gB, t, T0('R2') - 0.2);
    place(gO, d[0] + 44, d[1]); fade(gO, t, wt('R3', 'hypochlorite') - 0.3);
    fade(gC0, t, wt('R3', 'zero')); M.draw(gDn, t, ts - 0.1, 0.6); M.draw(gUp, t, wt('R3', 'Some', 1) - 0.1, 0.6);
    fade(gc1, t, wt('R3', 'minus')); fade(gt1, t, wt('R3', 'minus')); fade(gc2, t, wt('R3', 'plus')); fade(gt2, t, wt('R3', 'plus'));
    M.vis($('#gr'), t, tSh, z, { dx: 60, dy: 0, ...o });
    M.vis($('#gr0'), t, tSh + 0.3, 1e9, { dy: 16 }); M.vis($('#gr1'), t, wt('R4', 'Hydrogen') - 0.1, 1e9, { dy: 16 });
    hl(t, [$('#gr0'), $('#gr1')], [tSh + 0.3, wt('R4', 'Hydrogen')], T1('R4') + 0.3);
    fade(g2g, t, wt('R4', 'Hydrogen')); const tm = wt('R4', 'middle') - 0.5, um = M.io((t - tm) / 1.0);
    place(gS1, L(GX(-2), GX(0), um), GY - 34); place(gS2, L(GX(4), GX(0) + 1, um), GY - 34 - 36 * um);
    fade(gS1, t, wt('R4', 'minus')); fade(gS2, t, wt('R4', 'plus'));
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, T0('C2') - 0.3, zc, { dx: 60, dy: 0, ...o });
    const ta = [wt('C1', 'Decomposition'), wt('C1', 'compound') + 0.3, wt('C1', 'pieces')], tb = [wt('C2', 'element'), wt('C2', 'splitting'), wt('C2', 'up')];
    ta.forEach((tt, i) => M.vis($('#ca' + i), t, tt - 0.1, 1e9, { dy: 16 })); tb.forEach((tt, i) => M.vis($('#cf' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    M.vis($('#caV'), t, ta[2] + 0.3, 1e9, { dy: 16 }); M.vis($('#cfV'), t, tb[2] + 0.4, 1e9, { dy: 16 });
    hl(t, [0, 1, 2].map(i => $('#ca' + i)), ta, T0('C2')); hl(t, [0, 1, 2].map(i => $('#cf' + i)), tb, tK1);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Is') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Oxygen') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Combine') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'checked') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'numbers') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, tW1 + 0.2, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, wt('W1', 'Sort') - 0.1, out, { dx: 60, dy: 0, ...o });
    WF.forEach((_, i) => { M.vis($('#wf' + i), t, wt('W1', 'Sort') + 0.2 + i * 0.15, 1e9, { dy: 16 }); fade($('#wfs' + i), t, tWs[i] + 0.8); });
    hl(t, WF.map((_, i) => $('#wf' + i)), tWf, T1('W5') + 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X2', 'But') - 0.1, tRight: wt('X2', 'calcium') - 0.1 });
    fade(tq1, t, wt('X2', 'changes')); fade(tq2, t, wt('X3', 'No'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.1, tCount, tAns });
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
