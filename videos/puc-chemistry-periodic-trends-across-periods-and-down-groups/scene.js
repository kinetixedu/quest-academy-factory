// PUC Chemistry Ep 36: Periodic Trends Across Periods and Down Groups (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: the element in play teal, partners ink, moving electrons orange, NCERT values gold,
// basic oxides violet, acidic oxides red, amphoteric teal, neutral ink (same in strip, KaTeX and recap)
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', BC = C.violet, AC = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'], arrowU: ['M12 19V5', 'm5 12 7-7 7 7'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1');
const tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['box', 'Sodium', 'STORED UNDER KEROSENE', 'Sodium', 'Na', 'FAR LEFT'], ['droplet', 'Chlorine', 'CLEANS DRINKING WATER', 'Chlorine', 'Cl', 'NEAR FAR RIGHT'], ['zap', 'Neon', 'GLOWS, ALMOST NEVER REACTS', 'Neon', 'Ne', 'THE VERY END']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, ew], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ew}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['Na', 'far left', wt('H4', 'Sodium')], ['Cl', 'near right', wt('H4', 'Chlorine')], ['Ne', 'the end', wt('H4', 'Neon')]];
$('#wqs').innerHTML = KIT.map(([e, w], i) => `<div class="wq" id="wq${i}"><b style="color:var(--ac)">${e}</b><span>${w}</span></div>`).join('');

/* ---------- P: the idea + size and pull ---------- */
const QR = [['Across: more protons, same shell', 'P3', 'nucleus'], ['So the pull grows, atoms shrink', 'P3', 'shrink'], ['Down: a new shell each time, atoms grow', 'P4', 'new'], ['Size and pull drive almost every trend', 'P5', 'Size']];
$('#qrs').innerHTML = QR.map(([q], i) => `<div class="qr" id="qr${i}" style="top:${206 + i * 86}px;height:76px;right:36px;width:auto"><div class="nn">${i + 1}</div><div class="qt">${q}</div></div>`).join('');
const tQr = QR.map(q => wt(q[1], q[2]));
{ const card = $('#pq'), d = document.createElement('div'); d.id = 'pqIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;right:0;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
$('#mdef').style.width = 'auto'; $('#mdef').style.right = '36px';
const ps = $('#pS');
// across: Li (152 pm) -> F (64 pm); down: Li (152) -> Na (186) -> K (231). Drawn at 0.5 px per pm.
txt(ps, 36, 96, 'ACROSS PERIOD 2', { fill: C.mute, 'font-weight': 600 }); txt(ps, 36, 330, 'DOWN GROUP 1', { fill: C.mute, 'font-weight': 600 });
const PA = [['Li', 3, 152, 2, 150], ['F', 9, 64, 2, 560]], PD = [['Li', 3, 152, 2, 130], ['Na', 11, 186, 3, 360], ['K', 19, 231, 4, 620]];
const mini = (s, p, pm, sh, x, y) => { const g = mk(ps, 'g', {}), R = pm * 0.5; for (let i = 0; i < sh; i++) mk(g, 'circle', { cx: x, cy: y, r: (16 + (R - 16) * (i + 1) / sh).toFixed(1), fill: 'none', stroke: C.dim, 'stroke-width': 2 }); mk(g, 'circle', { cx: x, cy: y, r: 16, fill: NC }); txt(g, x, y + 6, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 16, fill: '#fff', 'text-anchor': 'middle' }); txt(g, x, y + R + 26, `${p} p · ${pm} pm`, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 17 }); return g; };
const pA = PA.map(e => mini(e[0], e[1], e[2], e[3], e[4], 186)), pD = PD.map(e => mini(e[0], e[1], e[2], e[3], e[4], 440));
const pArA = PUC.arrow(ps, NC, 4, 14), pArD = PUC.arrow(ps, NC, 4, 14);

/* ---------- S: the live periodic table ---------- */
const PT = [['H', '', '', '', '', '', '', 'He'], ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'], ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'], ['K', 'Ca', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'], ['Rb', 'Sr', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'], ['Cs', 'Ba', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn']];
const TX = c => 96 + c * 92 + (c >= 2 ? 24 : 0), TY = r => 116 + r * 70;
const GN = ['1', '2', '13', '14', '15', '16', '17', '18'];
$('#tbl').innerHTML = PT.map((row, r) => row.map((e, c) => e ? `<div class="ptile" id="t_${e}" style="left:${TX(c)}px;top:${TY(r)}px">${e}<i></i></div>` : '').join('')).join('') + GN.map((g, c) => `<div class="lbl" style="left:${TX(c)}px;width:84px;text-align:center;top:${TY(0) - 30}px">${g}</div>`).join('');
const bs = $('#bS');
const arH = PUC.arrow(bs, NC, 6, 20), arV = PUC.arrow(bs, NC, 6, 20);
const XL = TX(0), XR = TX(7) + 84, YT = TY(0), YB = TY(5) + 58;
// trends: dx = +1 if it increases to the right, dy = +1 if it increases downwards; noble gases excluded where NCERT gives no value
const TR = [
  { n: 'Atomic radius', d: 'Size of the atom', a: 'Decreases across', b: 'Increases down', dx: -1, dy: 1, ng: 1, t: wt('S1', 'radius'), v: [['Li', '152'], ['F', '64'], ['Cs', '262']], vt: [wt('S2', 'lithium'), wt('S2', 'fluorine'), wt('S2', 'caesium')], vs: 'pm' },
  { n: 'Ionization enthalpy', d: 'Energy to pull an electron out', a: 'Increases across', b: 'Decreases down', dx: 1, dy: -1, ng: 1, t: wt('S3', 'ionization'), v: [['Li', '520'], ['Ne', '2081']], vt: [wt('S3', 'lithium'), wt('S3', 'neon')], vs: 'kJ/mol' },
  { n: 'Electron gain enthalpy', d: 'Energy change when an electron is added', a: 'More negative across', b: 'Less negative down', dx: 1, dy: -1, ng: 0, t: wt('S4', 'electron'), v: [], vt: [], vs: '' },
  { n: 'Electronegativity', d: 'Pull on a shared pair', a: 'Increases across', b: 'Decreases down', dx: 1, dy: -1, ng: 0, t: wt('S5', 'electronegativity'), v: [['F', '4.0']], vt: [wt('S5', 'four')], vs: '' },
  { n: 'Metallic character', d: 'How easily an atom loses electrons', a: 'Decreases across', b: 'Increases down', dx: -1, dy: 1, ng: 0, t: wt('S6', 'metallic'), v: [], vt: [], vs: '' }];
const curTr = t => TR.reduce((a, tr, i) => t >= tr.t - 0.3 ? i : a, -1);
const level = (tr, r, c) => { const u = tr.dx > 0 ? c / 7 : (7 - c) / 7, v = tr.dy > 0 ? (r - 1) / 4 : (5 - r) / 4; return M.clamp((u + v) / 2); };
const corner = [document.createElement('div'), document.createElement('div')];
corner.forEach((d, i) => { d.className = 'pillp ' + (i ? 'ac' : 'ink'); d.style.cssText = i ? `left:${TX(5)}px;top:${TY(0) + 8}px` : `left:${TX(0)}px;top:${TY(5) + 72}px`; d.textContent = i ? 'IE · EGE · EN' : 'RADIUS · METALLIC'; $('#bn').appendChild(d); });
const avA = PUC.avatar($('#rp'), { x: 0, y: 380, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two arrows, five trends!' });
const th1 = PUC.think($('#th1'), { q: 'Which is more metallic?', opts: ['Potassium (K)', 'Magnesium (Mg)'], right: 0, why: 'K is further left AND further down: both moves raise metallic character.' });

/* ---------- D: why the ends react most ---------- */
const dsol = PUC.solution($('#dl'), [
  ['Far left: lowest ionization enthalpy, forms cations'],
  ['Far right: most negative electron gain enthalpy, forms anions'],
  ['Middle: neither loses nor gains easily'],
  ['Noble gases: full shells, positive electron gain enthalpy']], { label: 'STEP BY STEP', y0: 100, dy: 96 });
$('#dl').querySelectorAll('.sol .sx').forEach(e => { e.style.font = '600 24px Poppins'; });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const P3 = ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];
const DX = i => 64 + i * 88;
$('#dts').innerHTML = P3.map((e, i) => `<div class="ptile" id="d_${e}" style="left:${DX(i)}px;top:430px;width:76px">${e}<i></i></div>`).join('');
const dsv = $('#dS');
const RE = [0.95, 0.62, 0.34, 0.16, 0.3, 0.55, 0.92, 0.04];   // qualitative sketch (NCERT: highest at the two extremes, lowest in the centre)
const dax = mk(dsv, 'path', { d: 'M52 110 V392 H748', fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
txt(dsv, 64, 104, 'REACTIVITY', { fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const curvePts = P3.slice(0, 7).map((_, i) => [DX(i) + 38, 380 - RE[i] * 250]);
const dCur = mk(dsv, 'path', { d: 'M' + curvePts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L'), fill: 'none', stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const dAr = mk(dsv, 'circle', { cx: DX(7) + 38, cy: 380 - RE[7] * 250, r: 9, fill: C.dim });
const eNa = mk(dsv, 'circle', { r: 9, fill: EC }), eCl = mk(dsv, 'circle', { r: 9, fill: EC });
const ionT = [['Na⁺', DX(0) + 92, NC], ['Cl⁻', DX(6) - 16, NC]].map(([s, x, c]) => txt(dsv, x, 168, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: c }));
const lowT = txt(dsv, DX(3) + 38, 300, 'LOWEST', { 'text-anchor': 'middle', fill: HC, 'font-weight': 600 });
const fullT = txt(dsv, DX(7) + 38, 344, 'FULL', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{across: } r\\downarrow \\quad \\text{down: } r\\uparrow`);

/* ---------- W: oxides with water ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${BC}}{\\mathrm{Na_2O}} + \\mathrm{H_2O} \\rightarrow 2\\mathrm{NaOH}`)],
  [K(`\\mathrm{Na}\\ 2|2 \\quad \\mathrm{O}\\ 2|2 \\quad \\mathrm{H}\\ 2|2 \\;\\checkmark`)],
  [K(`\\textcolor{${AC}}{\\mathrm{Cl_2O_7}} + \\mathrm{H_2O} \\rightarrow 2\\mathrm{HClO_4}`)],
  [K(`\\mathrm{Cl}\\ 2|2 \\quad \\mathrm{O}\\ 8|8 \\quad \\mathrm{H}\\ 2|2 \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 92 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const CRA = [['Na', [2, 2], wt('W4', 'Sodium')], ['O', [2, 2], wt('W4', 'Oxygen')], ['H', [2, 2], wt('W4', 'Hydrogen')]], CRB = [['Cl', [2, 2], wt('W6', 'Chlorine')], ['O', [8, 8], wt('W6', 'Oxygen')], ['H', [2, 2], wt('W6', 'Hydrogen')]];
$('#crs').innerHTML = [0, 1, 2].map(i => `<div class="cr" id="cr${i}" style="top:${84 + i * 76}px"><div class="ce" id="ce${i}"></div><div class="cv" id="cv${i}"></div><div class="cm" id="cm${i}"></div></div>`).join('');
const lm = $('#lmS');
const strip = (x, c0, lab) => { const g = mk(lm, 'g', {}); const r = mk(g, 'rect', { x, y: 50, width: 300, height: 56, rx: 10, fill: c0 }); txt(g, x + 150, 140, lab, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }); return { g, r }; };
const RED = '#E07A7A', BLUE = '#6C8FD8';
const lmA = strip(36, RED, 'NaOH · RED TURNS BLUE'), lmB = strip(412, BLUE, 'HClO₄ · BLUE TURNS RED');

/* ---------- C: oxides across period 3 ---------- */
const OX = [['Na_2O', 'MOST BASIC', BC, 0], ['MgO', 'BASIC', BC, 0.25], ['Al_2O_3', 'AMPHOTERIC', NC, 0.5], ['SiO_2', 'ACIDIC', AC, 0.7], ['P_4O_{10}', 'ACIDIC', AC, 0.8], ['SO_3', 'ACIDIC', AC, 0.9], ['Cl_2O_7', 'MOST ACIDIC', AC, 1]];
const OXX = i => 48 + i * 216;
$('#oxs').innerHTML = OX.map(([f, l], i) => `<div class="oxt" id="ox${i}" style="left:${OXX(i)}px">${K(`\\mathrm{${f}}`)}</div><div class="oxl" id="ol${i}" style="left:${OXX(i)}px">${l}</div>`).join('');
const cs = $('#cS');
mk(cs, 'defs', {}).innerHTML = `<linearGradient id="og" x1="0" x2="1"><stop offset="0" stop-color="${BC}"/><stop offset="0.5" stop-color="${NC}"/><stop offset="1" stop-color="${AC}"/></linearGradient>`;
const ogBar = mk(cs, 'rect', { x: 48, y: 300, width: 1500, height: 16, rx: 8, fill: 'url(#og)' });
const ogL = txt(cs, 48, 350, 'BASIC', { fill: BC, 'font-weight': 600 }), ogR = txt(cs, 1548, 350, 'ACIDIC', { fill: AC, 'font-weight': 600, 'text-anchor': 'end' });
const tOx = [wt('C1', 'left'), wt('C1', 'step') + 0.2, wt('C2', 'aluminium'), wt('C1', 'step', 1) + 0.1, wt('C1', 'step', 1) + 0.3, wt('C1', 'step', 1) + 0.5, wt('C1', 'right')];
const NU = [['CO', 'carbon'], ['NO', 'nitric'], ['N_2O', 'nitrous']];
$('#nus').innerHTML = NU.map(([f], i) => `<div class="oxt" id="nu${i}" style="left:${48 + i * 216}px;top:456px;height:80px;font-size:32px">${K(`\\mathrm{${f}}`)}</div>`).join('') + `<div class="pillp" id="nuP" style="left:${48 + 3 * 216}px;top:472px">Neither acidic nor basic</div>`;
const avD = PUC.avatar($('#cl'), { x: 1100, y: 454, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Aluminium oxide plays both sides!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'More electrons across a period, so the atom gets bigger', right: 'Same shell, more protons pulling: the radius shrinks across a period' });
$('#trap').insertAdjacentHTML('beforeend', `<div id="tm0" style="position:absolute;right:36px;top:84px;width:380px;height:72px;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:space-between;padding:0 18px;box-sizing:border-box;font:600 24px 'IBM Plex Mono';color:${GC}">Li 152 pm<span style="color:var(--mute)">→</span>F 64 pm</div>`);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Order questions on radius, ionization enthalpy and metallic character, and statement pairs' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Which of these orders is correct?`, qW: 760,
  opts: [`Radius: ${K('\\mathrm{F > Cl > Br}')}`, `First IE: ${K('\\mathrm{Na > Mg}')}`, `EN: ${K('\\mathrm{F > O > N > C}')}`, `Metallic: ${K('\\mathrm{Na < Mg < Al}')}`], right: 2, cols: 1, optW: 940, optY: 196, optH: 84, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`${G_('4.0')} > ${G_('3.5')} > ${G_('3.0')} > ${G_('2.5')}`)], [K(`\\text{A: } \\mathrm{F < Cl < Br}`)], [K(`\\text{B: } \\mathrm{Na < Mg}`)], [K(`\\text{D: } \\mathrm{Na > Mg > Al}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'D')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · periodic trends', y0: 96, dy: 74, txt: [1, 1, 1, 0, 1],
  lines: ['<b>Across</b>: radius ↓ · IE ↑ · EGE more negative · EN ↑ · metallic ↓', '<b>Down</b>: radius ↑ · IE ↓ · EGE less negative · EN ↓ · metallic ↑', '<b>Cause</b>: across, more protons, same shell · down, a new shell', K(`\\textcolor{${BC}}{\\mathrm{Na_2O}} \\rightarrow 2\\mathrm{NaOH} \\qquad \\textcolor{${AC}}{\\mathrm{Cl_2O_7}} \\rightarrow 2\\mathrm{HClO_4}`), '<b>Ends</b> most reactive · Al₂O₃ amphoteric · CO, NO, N₂O neutral'] });
const YQ = ['Why does atomic radius shrink across a period?', 'Which is more metallic, sodium or aluminium, and why?', 'Why are the two ends of a period the most reactive?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 37', topic: 'Why does boron break the rule? Exceptions and Anomalous Behaviour', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S2', 'caesium') - 0.3, 1.05, 900, 560], [T0('S3') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(27 * 620 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#dl .sol .sx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(24 * 640 / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, KIT[i][2] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'map') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((k, i) => { const el = $('#wq' + i); M.vis(el, t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); });
    M.vis($('#hTz'), t, wt('H5', 'five') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1'), tP3 = T0('P3');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    { const sh = M.spring(t - tP3 + 0.25, M.HEAVY); snap($('#pq'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    M.vis($('#mdef'), t, wt('P2', 'trend') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    pA.forEach((g, i) => fade(g, t, i ? wt('P3', 'shrink') - 0.1 : tP3 + 0.3, 1e9, 0.35));
    pD.forEach((g, i) => fade(g, t, wt('P4', i === 0 ? 'Down' : i === 1 ? 'new' : 'grow') - 0.1, 1e9, 0.35));
    const ua = M.io((t - wt('P3', 'pull') + 0.1) / 0.5), ud = M.io((t - wt('P4', 'farther') + 0.1) / 0.5);
    if (ua > 0) pArA.set(260, 186, 260 + 200 * ua, 186); else pArA.set(0, 0, 0, 0);
    if (ud > 0) pArD.set(240, 440, 240 + 260 * ud, 440); else pArD.set(0, 0, 0, 0);
  }

  /* S: live table */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'potassium') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'It') });
    const k = curTr(t), sum = t >= tB1 - 0.1;
    PT.forEach((row, r) => row.forEach((e, c) => { if (!e) return; const el = $('#t_' + e);
      M.vis(el, t, tS1 + 0.2 + (r + c) * 0.025, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
      let lv = 0, dim = false;
      if (k >= 0 && !sum) { const tr = TR[k], ng = c === 7 && !tr.ng; dim = ng || r === 0; lv = dim ? 0 : level(tr, r, c) * M.io((t - tr.t + 0.3) / 0.6); }
      setBg(el, dim ? '#F4F5F7' : mix('#FFFFFF', NC, lv * 0.9)); el.style.color = dim ? C.dim : lv > 0.5 ? '#fff' : C.ink; el.style.borderColor = dim ? C.line : mix(C.line, NC, lv);
      const vi = el.querySelector('i'); let vs = ''; if (k >= 0 && !sum) TR[k].v.forEach(([s, v], j) => { if (s === e && t >= TR[k].vt[j] - 0.1) vs = v; }); M.setT(vi, vs);
    }));
    // arrows point to where the property grows
    const tr = TR[Math.max(k, 0)], au = k >= 0 && !sum ? M.io((t - tr.t + 0.1) / 0.5) : 0;
    const hy = YT - 52, vx = 56;
    if (au > 0) { const [a0, a1] = tr.dx > 0 ? [XL, XR] : [XR, XL]; arH.set(a0, hy, M.lerp(a0, a1, au), hy); const [b0, b1] = tr.dy > 0 ? [YT, YB] : [YB, YT]; arV.set(vx, b0, vx, M.lerp(b0, b1, au)); } else { arH.set(0, 0, 0, 0); arV.set(0, 0, 0, 0); }
    // readout panel
    M.vis($('#rp'), t, tS1 + 0.4, 1e9, { dy: 10 });
    if (k >= 0) { M.setT($('#rpN'), sum ? 'THE PATTERN' : `TREND ${k + 1} OF 5`); M.setT($('#rpT'), sum ? 'Two corners' : tr.n); M.setT($('#rpD'), sum ? 'Bottom left vs top right' : tr.d);
      $('#tr0').innerHTML = sum ? `Radius, metallic character<em>BOTTOM LEFT</em>` : `${tr.a}<em>ACROSS →</em>`; $('#tr1').innerHTML = sum ? `IE, EGE, electronegativity<em>TOP RIGHT</em>` : `${tr.b}<em>DOWN ↓</em>`;
      let vs = ''; tr.v.forEach(([s, v], j) => { if (t >= tr.vt[j] - 0.1) vs += (vs ? '   ' : '') + `${s} ${v}`; }); M.setT($('#rpV'), sum ? '' : vs + (vs && tr.vs ? ' ' + tr.vs : '')); }
    const pulse = k >= 0 ? M.io((t - TR[k].t + 0.2) / 0.3) : 0;
    ['#rpT', '#rpD', '#tr0', '#tr1'].forEach((s, i) => M.vis($(s), t, (k >= 0 ? TR[0].t : 1e9) + i * 0.1, 1e9, { dy: 10 }));
    $('#rpT').style.opacity = (0.35 + 0.65 * (sum ? M.io((t - tB1) / 0.3) : pulse)).toFixed(3);
    corner.forEach((d, i) => M.vis(d, t, wt('B1', i ? 'other' : 'Radius') - 0.1, 1e9, POP));
    M.vis($('#bnL'), t, tS1 + 0.1, 1e9, { dy: 8 });
    avA(t, wt('B1', 'other') + 0.6, z);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.2, z, { dx: 60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    P3.forEach((e, i) => { const el = $('#d_' + e); M.vis(el, t, tD1 + 0.4 + i * 0.05, 1e9, POP);
      const hot = (i === 0 && t >= tDs[0]) || (i === 6 && t >= tDs[1]), mid = i >= 2 && i <= 4 && t >= tDs[2], ng = i === 7 && t >= tDs[3];
      setBg(el, hot ? NC : mid ? '#E3E6EC' : ng ? '#F4F5F7' : '#FFFFFF'); el.style.color = hot ? '#fff' : ng ? C.dim : C.ink; });
    // curve draws on in two halves with the steps
    M.drawU(dax, M.io((t - tD1 - 0.4) / 0.4));
    M.drawU(dCur, M.lerp(0, 1, M.io((t - tDs[0]) / 1.2)) * (t < tDs[2] ? 0.999 : 1));
    fade(dAr, t, tDs[3]);
    // Na loses its electron, Cl gains one
    const u1 = M.io((t - wt('D2', 'lose') + 0.1) / 0.8), u2 = M.io((t - wt('D3', 'take') + 0.1) / 0.8);
    attr(eNa, 'cx', (DX(0) + 38 + 60 * u1).toFixed(1)); attr(eNa, 'cy', (420 - 80 * u1).toFixed(1)); eNa.style.opacity = (M.clamp((t - tDs[0]) / 0.2) * (1 - M.clamp((u1 - 0.8) / 0.2))).toFixed(3);
    attr(eCl, 'cx', (DX(6) + 38 - 60 + 60 * u2).toFixed(1)); attr(eCl, 'cy', (340 + 80 * u2).toFixed(1)); eCl.style.opacity = (M.clamp((t - tDs[1] - 0.3) / 0.2) * (1 - M.clamp((u2 - 0.85) / 0.15))).toFixed(3);
    fade(ionT[0], t, wt('D2', 'cations') - 0.1); fade(ionT[1], t, wt('D3', 'anions') - 0.1);
    fade(lowT, t, wt('D4', 'lowest') - 0.1); fade(fullT, t, wt('D5', 'full') - 0.1);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Small') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.1, { st: 0.07, sp: M.HEAVY });
    M.hide($('#stF'), true);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const second = t >= T0('W5') - 0.1, CR = second ? CRB : CRA;
    CR.forEach(([e, [l, r], tt], i) => { M.setT($('#ce' + i), e); $('#ce' + i).style.color = e === 'Na' || e === 'Cl' ? NC : HC; const done = t >= tt;
      M.setT($('#cv' + i), done ? `${l} | ${r}` : '? | ?'); const m = $('#cm' + i); PUC.setIco(m, done ? 'check' : 'help', '#fff', 24, 3); setBg(m, done ? C.ok : C.dim);
      setBg($('#cr' + i), mix(C.soft, C.okBg, M.io((t - tt) / 0.3)));
      M.vis($('#cr' + i), t, (second ? T0('W5') : T0('W3')) + i * 0.12, 1e9, { dx: -16, dy: 0 }); });
    M.vis($('#lmL'), t, T0('W7') - 0.1, 1e9, { dy: 8 }); fade(lmA.g, t, T0('W7') - 0.1); fade(lmB.g, t, T0('W7') - 0.1);
    attr(lmA.r, 'fill', mix(RED, BLUE, M.io((t - wt('W7', 'blue') + 0.2) / 0.6))); attr(lmB.r, 'fill', mix(BLUE, RED, M.io((t - wt('W7', 'red', 1) + 0.2) / 0.6)));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dy: 36, ...o });
    OX.forEach(([, , col], i) => { const tt = tOx[i]; M.vis($('#ox' + i), t, tC1 + 0.3 + i * 0.08, 1e9, { dy: 14 }); const u = M.io((t - tt + 0.1) / 0.3), ox = $('#ox' + i);
      setBg(ox, mix(C.soft, mix(col, '#FFFFFF', 0.8), u)); ox.style.boxShadow = u > 0.5 && (i === 0 || i === 2 || i === 6) ? `inset 0 0 0 3px ${col}` : 'none';
      const ol = $('#ol' + i); ol.style.color = col; M.vis(ol, t, tt - 0.05, 1e9, { dy: 8 }); });
    const gu = M.io((t - wt('C1', 'step') + 0.1) / 0.8); attr(ogBar, 'width', (1500 * gu).toFixed(1)); M.hide(ogBar, gu <= 0); fade(ogL, t, wt('C1', 'basic') - 0.1); fade(ogR, t, wt('C1', 'acidic') - 0.1);
    M.vis($('#nuL'), t, T0('C3') - 0.1, 1e9, { dy: 8 });
    NU.forEach(([, w], i) => M.vis($('#nu' + i), t, wt('C3', w) - 0.1, 1e9, POP)); M.vis($('#nuP'), t, wt('C3', 'neither') - 0.1, 1e9, POP);
    avD(t, wt('C2', 'acids') + 0.3, T0('C3') - 0.2);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'same') - 0.1 });
    M.vis($('#tm0'), t, wt('X3', 'shrinks') - 0.1, 1e9, { dx: 20, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'order') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
