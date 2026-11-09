// PUC Chemistry Ep 60: Law of chemical equilibrium and Kc (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: products (top of K) violet, reactants (bottom) ink, powers orange, Kc teal, constant/ok green, wrong red; H2 ink, I2 violet, HI light violet
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', LV = '#9B7BE8', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tP = s => `\\textcolor{${OC}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`;
const Kc = tN('K_c'), HIc = tP('[\\mathrm{HI}]'), H2c = '[\\mathrm{H_2}]', I2c = '[\\mathrm{I_2}]';
const KHI = `${Kc} = \\dfrac{${HIc}^{${tX('2')}}}{${H2c}${I2c}}`;

Object.assign(M.IC, {
  cake: ['M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8', 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1', 'M2 21h20', 'M7 8v3', 'M12 8v3', 'M17 8v3'],
  flask: ['M9 3h6', 'M10 3v6L4 20a1 1 0 0 0 1 1.5h14a1 1 0 0 0 1-1.5L14 9V3'],
  therm: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  cup: ['M17 8h1a4 4 0 1 1 0 8h-1', 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z'],
  scroll: ['M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4', 'M19 17V5a2 2 0 0 0-2-2H4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tFc = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tFc, tFc + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['cake', 'A cake', '2 EGGS OR 4', 'cake', 'CHANGES', XC], ['flask', 'Two gases', 'ANY AMOUNTS', 'gases', 'MORE OR LESS', BC], ['therm', 'One number', 'NEVER CHANGES', 'number', 'SAME', OK]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'cake') - 0.3, wt('H1', 'gases') - 0.2, wt('H1', 'number') - 0.2];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Twice the milk, twice the leaves', 'Twice', 'H3'], ['Do the amounts follow a rule?', 'rule', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('cup', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]) - 0.2);

/* ---------- P: recipe ---------- */
const QR = [['Tea for one: 1 milk, 1 leaves', '1 : 1', 'P2', 'one', HC], ['Tea for ten: 10 milk, 10 leaves', '10 : 10', 'P2', 'ten', HC], ['The ratio stays fixed', 'RATIO', 'P2', 'ratio', OK]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const cupG = (x, w, h, n, tin) => { const g = mk(ps, 'g', {}); mk(g, 'path', { d: `M${x} ${420 - h} V${420} a14 14 0 0 0 14 14 H${x + w - 14} a14 14 0 0 0 14 -14 V${420 - h}`, stroke: C.ink2, 'stroke-width': 4, fill: '#FBF5EC' }); const items = []; const cols = n > 1 ? 5 : 1; for (let i = 0; i < n * 2; i++) { const milk = i % 2 === 0, k = Math.floor(i / 2), cx = x + 30 + (k % cols) * 44 + (milk ? 0 : 20), cy = 400 - Math.floor(k / cols) * 46 - (milk ? 0 : 18); items.push(milk ? mk(g, 'circle', { cx, cy, r: 11, fill: '#FFFFFF', stroke: '#B9C2D3', 'stroke-width': 2.5 }) : mk(g, 'path', { d: `M${cx - 9} ${cy} q9 -14 18 0 q-9 14 -18 0 Z`, fill: '#3E8E5A' })); } return { g, items }; };
const c1 = cupG(90, 120, 90, 1), c10 = cupG(330, 260, 160, 10);
const r1 = txt(ps, 150, 480, '1 : 1', { 'text-anchor': 'middle', 'font-size': 26, fill: HC, 'font-weight': 600 }), r10 = txt(ps, 460, 480, '10 : 10 = 1 : 1', { 'text-anchor': 'middle', 'font-size': 26, fill: OK, 'font-weight': 600 });
const key = txt(ps, 640, 140, '○ MILK', { 'font-size': 18, fill: C.mute, 'font-weight': 600 }), key2 = txt(ps, 640, 172, '● LEAVES', { 'font-size': 18, fill: '#3E8E5A', 'font-weight': 600 });

/* ---------- S: three flasks ---------- */
const FL = [{ s: [1, 1, 0], e: [0.22, 0.22, 1.56], n: 'FLASK 1', w: 'H₂ 1 · I₂ 1' }, { s: [2, 1, 0], e: [1.07, 0.065, 1.87], n: 'FLASK 2', w: 'H₂ 2 · I₂ 1' }, { s: [0, 0, 1], e: [0.11, 0.11, 0.78], n: 'FLASK 3', w: 'HI 1 only' }];
const b = $('#bS'), FB = 420, SC = 110, BCOL = [HC, OC, LV], BLAB = ['H₂', 'I₂', 'HI'];
const fl = FL.map((f, i) => { const x0 = 44 + i * 240; const g = mk(b, 'g', {}); mk(g, 'path', { d: `M${x0} 120 V${FB} a14 14 0 0 0 14 14 H${x0 + 192} a14 14 0 0 0 14 -14 V120`, stroke: C.ink2, 'stroke-width': 4, fill: '#FBFCFE' }); mk(g, 'rect', { x: x0 - 8, y: 108, width: 236, height: 14, rx: 5, fill: HC });
  txt(g, x0 + 110, 92, f.n, { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
  const bars = [0, 1, 2].map(k => { const bx = x0 + 22 + k * 58; const r = mk(g, 'rect', { x: bx, y: FB, width: 48, height: 0, rx: 6, fill: BCOL[k] }); txt(g, bx + 24, FB + 34, BLAB[k], { 'text-anchor': 'middle', 'font-size': 18, fill: BCOL[k], 'font-weight': 600 }); const v = txt(g, bx + 24, FB - 8, '', { 'text-anchor': 'middle', 'font-size': 16, fill: BCOL[k], 'font-weight': 600 }); return { r, v }; });
  const st = txt(g, x0 + 110, 478, f.w, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
  return { g, bars, st, f }; });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// table: [H2] [I2] [HI] | plain | squared
const COLX = [[20, 110], [130, 110], [240, 110], [360, 160], [530, 170]];
const sp = (k, s, st = '') => `<span style="left:${COLX[k][0]}px;width:${COLX[k][1]}px;${st}">${s}</span>`;
$('#tbl').innerHTML = `<div class="th" id="th0" style="top:84px">${sp(0, 'H₂')}${sp(1, 'I₂')}${sp(2, 'HI')}<span id="thP" style="left:${COLX[3][0]}px;width:${COLX[3][1]}px;color:${RD}">HI / H₂·I₂</span><span id="thS" style="left:${COLX[4][0]}px;width:${COLX[4][1]}px;color:${OK}">HI² / H₂·I₂</span></div>` +
  FL.map((f, i) => `<div class="tr" id="tr${i}" style="top:${136 + i * 92}px">${sp(0, f.e[0].toFixed(2).replace(/^0\.065$/, '0.065'), `color:${HC}`)}${sp(1, i === 1 ? '0.065' : f.e[1].toFixed(2), `color:${OC}`)}${sp(2, f.e[2].toFixed(2), `color:${LV}`)}<span class="tpl" style="left:${COLX[3][0]}px;width:${COLX[3][1]}px;color:${RD}">${(f.e[2] / (f.e[0] * f.e[1])).toFixed(1)}</span><span class="tsq" style="left:${COLX[4][0]}px;width:${COLX[4][1]}px;color:${OK}">${(f.e[2] ** 2 / (f.e[0] * f.e[1])).toFixed(1)}</span></div>`).join('');
$('#sP2').innerHTML = `The ${K(`${tX('2')}`)} in ${K(`\\mathrm{H_2 + I_2 \\rightleftharpoons ${tX('2')}HI}`)} becomes a power`;
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 490, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Different flasks, same number. Like my recipe!' });

/* ---------- D: law of mass action ---------- */
$('#hcI').innerHTML = M.icon('scroll', 26, '#fff', 2.4);
const MS = [[K(`a\\mathrm{A} + b\\mathrm{B} \\rightleftharpoons ${tP('c\\mathrm{C}')} + ${tP('d\\mathrm{D}')}`), 'D2', 'Write'], ['[ ] = concentration, mol L⁻¹', 'D3', 'Square'], ['Products on top, reactants below', 'D4', 'Products'], ['Power = number in the equation', 'D5', 'Raise']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="rl" id="ms${i}" style="top:${168 + i * 92}px"><div class="nn">${i + 1}</div><div class="rt2">${s}</div></div>`).join('');
const tMs = MS.map(m => wt(m[1], m[2]) - 0.1);
const KGEN0 = `${Kc} = \\dfrac{${tP('[\\mathrm{C}]')}\\,${tP('[\\mathrm{D}]')}}{[\\mathrm{A}]\\,[\\mathrm{B}]}`, KGEN = `${Kc} = \\dfrac{${tP('[\\mathrm{C}]')}^{${tX('c')}}\\,${tP('[\\mathrm{D}]')}^{${tX('d')}}}{[\\mathrm{A}]^{${tX('a')}}\\,[\\mathrm{B}]^{${tX('b')}}}`;
const dK = $('#dK'); dK.innerHTML = `<div id="dKa" style="position:absolute;left:0;width:784px;text-align:center">${K(KGEN0)}</div><div id="dKb" style="position:absolute;left:0;width:784px;text-align:center">${K(KGEN)}</div>`; dK.style.width = '784px';
$('#dK2').innerHTML = K(`\\text{e.g. } ${KHI}`); $('#dKe').innerHTML = MS[0][0];

/* ---------- G: rules ---------- */
const GR = [['Same equation', 'K', HC, wt('G2', 'seven')], ['Reverse it', '1 / K', BC, wt('G3', 'Reverse')], ['Halve it', '√K', OK, wt('G4', 'Halve')], ['Double it', 'K²', XC, wt('G5', 'Double')]];
$('#grs').innerHTML = GR.map(([k, v, c], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 104}px"><div class="nn" style="border-color:${c};color:${c}">${i + 1}</div><div class="qt">${k}</div><div class="qk" style="color:${c};font-size:26px;top:20px">${v}</div></div>`).join('');
const eqr = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px;height:80px">${tex}<span class="tg" style="color:${col};font-size:24px">${tag}</span></div>`;
const GE = [[`\\mathrm{H_2 + I_2 \\rightleftharpoons 2HI}`, '54.8', HC], [`\\mathrm{2HI \\rightleftharpoons H_2 + I_2}`, '0.0182', BC], [`\\mathrm{\\tfrac{1}{2}H_2 + \\tfrac{1}{2}I_2 \\rightleftharpoons HI}`, '7.40', OK], [`\\mathrm{2H_2 + 2I_2 \\rightleftharpoons 4HI}`, '≈ 3003', XC]];
$('#grr').innerHTML = GE.map(([e, v, c], i) => eqr('ge' + i, 96 + i * 104, K(e), v, c)).join('');

/* ---------- C: forward vs reverse ---------- */
$('#caK').innerHTML = K(KHI); $('#cfK').innerHTML = K(`${Kc}' = \\dfrac{${H2c}${I2c}}{${HIc}^{${tX('2')}}}`);
$('#caV').innerHTML = `<span style="color:${OC}">HI ON TOP</span><span style="color:${HC}">54.8</span>`; $('#cfV').innerHTML = `<span style="color:${OC}">HI BELOW</span><span style="color:${BC}">0.0182</span>`;
$('#caV').style.top = $('#cfV').style.top = '360px';
const th1 = PUC.think($('#th1'), { q: 'A forward reaction has Kc = 100. What is Kc for the reverse reaction?', opts: ['100', '0.01'], right: 1, why: '0.01. Just flip it: 1 ÷ 100.' });

/* ---------- R ---------- */
const RL = [['Change starting amounts', 'SAME Kc', OK, wt('R1', 'starting')], ['Change the temperature', 'NEW Kc', XC, wt('R2', 'temperature')], ['So always say the temperature', 'AT T', HC, wt('R2', 'always')]];
$('#rrs').innerHTML = RL.map(([k, v, c], i) => `<div class="qr" id="rl${i}" style="top:${96 + i * 104}px"><div class="nn" style="border-color:${c};color:${c}">${i + 1}</div><div class="qt">${k}</div><div class="qk" style="color:${c}">${v}</div></div>`).join('');
const ks = $('#kS');
const kT = mk(ks, 'g', {}); mk(kT, 'rect', { x: 120, y: 120, width: 26, height: 260, rx: 13, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(kT, 'circle', { cx: 133, cy: 392, r: 22, fill: XC }); const kTm = mk(kT, 'rect', { x: 127, y: 300, width: 12, height: 92, fill: XC });
const kV = [0, 1, 2].map(i => { const g = mk(ks, 'g', {}); mk(g, 'rect', { x: 260, y: 130 + i * 100, width: 440, height: 76, rx: 12, fill: OKT }); const a = txt(g, 290, 178 + i * 100, `FLASK ${i + 1}`, { 'font-size': 20, fill: HC, 'font-weight': 600 }); const v = txt(g, 670, 180 + i * 100, '50.3', { 'text-anchor': 'end', 'font-size': 30, fill: OK, 'font-weight': 600 }); return { g, v, bg: g.firstChild }; });
const kNote = txt(ks, 480, 470, '', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(KGEN);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${H2c} = ${I2c} = x`)],
  [K(`54.8 = \\dfrac{(0.5)^{${tX('2')}}}{x^{2}}`)],
  [K(`x^{2} = 0.25 \\div 54.8 \\approx 0.00456`)],
  [K(`x \\approx ${tO('0.068')}\\ \\text{mol L}^{-1}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WB0 = 420, WS2 = 400;
mk(ws, 'line', { x1: 80, y1: WB0, x2: 700, y2: WB0, stroke: C.ink2, 'stroke-width': 3 });
const wbar = (x, col, lab) => { const r = mk(ws, 'rect', { x: x - 60, y: WB0, width: 120, height: 0, rx: 8, fill: col }); txt(ws, x, WB0 + 34, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); const v = txt(ws, x, WB0 - 14, '', { 'text-anchor': 'middle', 'font-size': 26, fill: col, 'font-weight': 600 }); return { r, v }; };
const WBs = [wbar(590, LV, 'HI'), wbar(190, HC, 'H₂'), wbar(390, OC, 'I₂')];
const wq = txt(ws, 290, 170, 'x = ?', { 'text-anchor': 'middle', 'font-size': 34, fill: HC, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${Kc} = ${HIc} \\,/\\, ${H2c}${I2c}`), right: K(`${Kc} = ${HIc}^{${tX('2')}} \\,/\\, ${H2c}${I2c}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 220, 110, 'coefficient 2', { 'font-size': 26, fill: XC, 'font-weight': 600 }), tq2 = txt(tsv, 220, 160, '→ power 2', { 'font-size': 26, fill: XC, 'font-weight': 600 }), tq3 = txt(tsv, 220, 216, 'use the balanced equation', { 'font-size': 20, fill: OK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Writing the Kc expression, and how K changes when an equation is reversed, halved or multiplied' });
const OPT = ['8', '0.125', '0.0156', '4096'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K('\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3}')} has Kc = 64. Find Kc for ${K('\\mathrm{NH_3 \\rightleftharpoons \\tfrac{1}{2}N_2 + \\tfrac{3}{2}H_2}')} at the same T.`, qW: 780,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K('\\text{Reverse: } 1/64')], [K('\\text{Halve: } \\sqrt{1/64} = 1/8')], [K(`1/8 = ${tO('0.125')}`)], ['C forgot the root']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Law of chemical equilibrium', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${Kc} = ${tP('[\\mathrm{C}]')}^{${tX('c')}}${tP('[\\mathrm{D}]')}^{${tX('d')}} \\,/\\, [\\mathrm{A}]^{${tX('a')}}[\\mathrm{B}]^{${tX('b')}}`), K(`${Kc} = ${HIc}^{${tX('2')}} \\,/\\, ${H2c}${I2c}`),
    '<b>Law of mass action</b>: Guldberg and Waage, 1864',
    '<b>Reverse</b>: 1/K · <b>halve</b>: √K · <b>double</b>: K²',
    '<b>Kc</b> changes only with T · 54.8 at 700 K'] });
const YQ = ['Who gave the law of mass action, and when?', 'Why is [HI] squared in the Kc expression?', 'What happens to Kc when you reverse an equation?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 61', topic: 'A K for pressure? Homogeneous Equilibria and Kp', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S6') - 0.2, 1.05, 960, 560], [T1('S6') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 130; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rl .rt2').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 600 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.eqr').forEach(q => { const k = q.querySelector('.katex'); if (k && k.offsetWidth > 520) q.style.fontSize = Math.floor(26 * 520 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.querySelector('.katex'); if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
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
    const tBd = [T0('H2') + 0.3, wt('H2', 'hydrogen'), wt('H2', 'same')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H4', 'rule') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'equilibrium') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T0('P3') + 0.3; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'recipe') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(c1.g, t, wt('P1', 'recipe')); c1.items.forEach((e, i) => fade(e, t, wt('P1', 'amounts') + i * 0.1, 1e9, 0.2));
    fade(c10.g, t, tQr[1] - 0.3); c10.items.forEach((e, i) => fade(e, t, tQr[1] + i * 0.05, 1e9, 0.15));
    fade(key, t, wt('P1', 'amounts')); fade(key2, t, wt('P1', 'amounts'));
    fade(r1, t, tQr[0]); fade(r10, t, tQr[2]);
    M.vis($('#pP'), t, wt('P3', 'twist') - 0.2, 1e9, POP);
  }

  /* S (also carries L1-L3) */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tEq = T0('S5') + 0.2;
    fl.forEach((F, i) => {
      const tin = T0('S' + (i + 2)); fade(F.g, t, tin - 0.2);
      const u = M.io((t - tEq - i * 0.25) / 1.6);
      F.bars.forEach((B, k) => { const v = M.lerp(F.f.s[k], F.f.e[k], u), h = SC * v; attr(B.r, 'y', (FB - h).toFixed(1)); attr(B.r, 'height', h.toFixed(1)); attr(B.v, 'y', (FB - h - 8).toFixed(1)); M.setT(B.v, v < 0.001 ? '' : v < 0.1 ? v.toFixed(3) : v.toFixed(2)); fade(B.v, t, tin + 0.3); });
    });
    const TAG = [[tS1 + 0.3, 'SAME TEMPERATURE'], [T0('S2'), 'FLASK 1: H₂ + I₂'], [T0('S3'), 'FLASK 2: MORE H₂'], [T0('S4'), 'FLASK 3: HI ONLY'], [tEq, 'EACH REACHES EQUILIBRIUM'], [T0('L3'), 'THE 2 BECOMES A POWER']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#sP2'), t, wt('L3', 'two') - 0.2, 1e9, POP);
    M.vis($('#eb'), t, wt('S5', 'different') - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#th0'), t, wt('S5', 'different') - 0.1, 1e9, { dy: 10 });
    const tSq = wt('S6', 'divide'), tPl = T0('L2');
    FL.forEach((_, i) => { const r = $('#tr' + i); M.vis(r, t, wt('S5', 'different') + i * 0.2, 1e9, { dy: 14 }); M.vis(r.querySelector('.tsq'), t, wt('S6', 'fifty') + i * 0.3, 1e9, POP); M.vis(r.querySelector('.tpl'), t, tPl + 0.6 + i * 0.4, 1e9, POP); const on = M.io((t - wt('S6', 'fifty') - i * 0.3) / 0.3); setBg(r, mix(C.soft, OKT, on * (1 - M.io((t - tPl) / 0.3)) + on * M.io((t - T0('L3') - 0.5) / 0.3))); });
    M.vis($('#thS'), t, tSq, 1e9, { dy: 8 }); M.vis($('#thP'), t, tPl + 0.2, 1e9, { dy: 8 });
    M.vis($('#eP'), t, wt('L3', 'constant') - 0.2, 1e9, POP);
    avD(t, T0('S6') + 0.3 + 4.8, wt('L1', 'squared') + 0.6);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#hcd'), t, wt('D1', 'Guldberg') - 0.1, 1e9, POP);
    MS.forEach((_, i) => { const el = $('#ms' + i); M.vis(el, t, tMs[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tMs[i + 1] : T1('D5') + 0.3; const on = M.io((t - tMs[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tPow = wt('D5', 'power');
    PUC.write($('#dKe'), t, tMs[0], 1.0); PUC.write($('#dKa'), t, tMs[2], 1.0); fade($('#dKa'), t, tMs[2], tPow); fade($('#dKb'), t, tPow);
    M.vis($('#dP'), t, wt('D5', 'equilibrium') - 0.2, 1e9, POP);
    PUC.write($('#dK2'), t, wt('D5', 'fraction'), 1.0);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    GR.forEach((g, i) => { const el = $('#gr' + i), er = $('#ge' + i); M.vis(el, t, g[3] - 0.2, 1e9, { dy: 16 }); M.vis(er, t, g[3], 1e9, { dx: 24, dy: 0 }); const nx2 = i < 3 ? GR[i + 1][3] : T1('G5') + 0.4; const on = M.io((t - g[3]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); setBg(er, mix(C.soft, C.ac2, on)); });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o }); PUC.write($('#caK'), t, wt('C1', 'Forward'), 0.9);
    M.vis($('#cf'), t, wt('C1', 'Reverse') - 0.3, zc, { dx: 60, dy: 0, ...o }); PUC.write($('#cfK'), t, wt('C1', 'Reverse'), 0.9);
    M.vis($('#caV'), t, wt('C1', 'fifty') - 0.1, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'zero') - 0.1, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'What') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Just') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RL.forEach((r, i) => { const el = $('#rl' + i); M.vis(el, t, r[3] - 0.2, 1e9, { dy: 16 }); const nx2 = i < 2 ? RL[i + 1][3] : T1('R2') + 0.3; const on = M.io((t - r[3]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rb'), t, tR1 + 0.3, z, { dx: 60, dy: 0, ...o });
    const tTe = wt('R2', 'temperature'), u = M.io((t - tTe) / 1.0);
    fade(kT, t, tR1 + 0.5); attr(kTm, 'y', (300 - 120 * u).toFixed(1)); attr(kTm, 'height', (92 + 120 * u).toFixed(1));
    kV.forEach((k, i) => { fade(k.g, t, tR1 + 0.6 + i * 0.2); M.setT(k.v, u > 0.5 ? 'NEW' : '50.3'); attr(k.v, 'fill', u > 0.5 ? XC : OK); attr(k.bg, 'fill', u > 0.5 ? '#FBE3D9' : OKT); });
    M.setT(kNote, u > 0.5 ? 'HOTTER: A NEW Kc FOR ALL THREE' : 'SAME T: SAME Kc'); fade(kNote, t, wt('R1', 'same'));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Products') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'each') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'power') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const tHI = wt('W2', 'equilibrium') + 0.3, ux = M.io((t - wt('W6', 'about') + 0.2) / 1.0);
    const vals = [0.5 * M.io((t - tHI) / 0.8), 0.068 * ux, 0.068 * ux];
    WBs.forEach((w, i) => { const h = WS2 * vals[i]; attr(w.r, 'y', (WB0 - h).toFixed(1)); attr(w.r, 'height', h.toFixed(1)); attr(w.v, 'y', (WB0 - h - 14).toFixed(1)); M.setT(w.v, i ? (ux > 0.02 ? vals[i].toFixed(3) : '') : vals[0].toFixed(2)); fade(w.r, t, i ? T0('W3') : tHI - 0.2); fade(w.v, t, i ? T0('W3') : tHI - 0.2); });
    fade(wq, t, wt('W3', 'Call'), wt('W6', 'about'));
    M.vis($('#wG'), t, wt('W6', 'both') - 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'squared') - 0.4 });
    fade(tq1, t, wt('X3', 'two') - 0.2); fade(tq2, t, wt('X3', 'power') - 0.2); fade(tq3, t, wt('X3', 'Always') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tFc; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tFc; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tFc + 0.1, tout: tY - 0.3, tLines: [tFc + 0.4, tFc + 0.8, tFc + 1.2, tFc + 1.6, tFc + 2.0], tShot: wt('F1', 'Screenshot') });
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
