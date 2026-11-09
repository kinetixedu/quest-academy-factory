// PUC Chemistry Ep 68: Common ion effect and hydrolysis of salts (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: took a proton (H3O+, NH4+) teal; lost a proton (acetate, OH-) violet; moving proton H+ orange; spectator ions (Na+, Cl-) grey; acidic red, basic blue, neutral ink; pKa, pKb gold
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, GR = '#9AA1AE';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tO = s => `\\textcolor{${OK}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tV = s => `\\textcolor{${OC}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tY = s => `\\textcolor{${GR}}{${s}}`;
const Ac = tV('\\mathrm{CH_3COO^-}'), HAc = '\\mathrm{CH_3COOH}', Hp = tN('\\mathrm{H_3O^+}'), pKa = tG('\\mathrm{p}K_a'), pKb = tG('\\mathrm{p}K_b');
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const harrow = (p, x1, x2, y, col, w = 8) => { const d = x2 > x1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x1} ${y} H${x2 - d * 14}`, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x2 - d * 24} ${y - 16} L${x2} ${y} L${x2 - d * 24} ${y + 16} Z`, fill: col }); return { l, h }; };
const ball = (p, r, fill, lab, fs = 16) => { const g = mk(p, 'g', {}); const c = mk(g, 'circle', { r, fill }); const tx = txt(g, 0, fs * 0.35, lab, { 'text-anchor': 'middle', 'font-size': fs, fill: '#fff', 'font-weight': 700 }); return { g, c, tx }; };
const at = (e, x, y) => attr(e, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

Object.assign(M.IC, {
  salt: ['M5 10h14l-1.5 10a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7Z', 'M8 10V7a4 4 0 0 1 8 0v3', 'M10 4h.01', 'M14 4h.01'],
  bucket: ['M4 8h16l-1.6 12.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9Z', 'M4 8a8 6 0 0 1 16 0'],
  flask: ['M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2', 'M8.5 2h7', 'M7 16h10'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tYy = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['salt', 'Table salt', 'STAYS NEUTRAL', 'Table', 'pH 7', HC], ['bucket', 'Washing soda', 'SLIPPERY, SOAPY', 'Washing', 'BASIC', BC], ['flask', 'Ammonium chloride', 'A LITTLE SOUR', 'Ammonium', 'ACIDIC', RD]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Fingers feel slippery', 'slippery', 'H3'], ['No base added, only a salt', 'base', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('bucket', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: swing ---------- */
const QR = [['Children get on and off', 'EQUILIBRIUM', 'P2', 'Children', GC], ['A crowd of the same rushes in', 'MORE OF ONE', 'P3', 'group', OC], ['Fewer new ones get on', 'BACKS OFF', 'P3', 'fewer', RD]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pEq = mk(ps, 'foreignObject', { x: 0, y: 80, width: 784, height: 70 }); pEq.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:36px">${K(`${HAc} \\rightleftharpoons ${Hp} + ${Ac}`)}</div>`;
const pF = harrow(ps, 180, 604, 210, OK, 8), pB = harrow(ps, 604, 180, 270, RD, 8);
const pFt = txt(ps, 392, 196, 'FORWARD', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 }), pBt = txt(ps, 392, 310, 'BACKWARD', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });
const pCrowd = Array.from({ length: 14 }, (_, i) => ball(ps, 15, OC, '−', 20));
const pCt = txt(ps, 600, 470, '+ MORE ACETATE', { 'text-anchor': 'middle', 'font-size': 18, fill: OC, 'font-weight': 600 });

/* ---------- S: bench ---------- */
const b = $('#bS');
const glass = mk(b, 'path', { d: 'M130 110 V420 a20 20 0 0 0 20 20 H634 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const water = mk(b, 'rect', { x: 132, y: 140, width: 520, height: 298, fill: '#E6F3FA' });
const HAm = Array.from({ length: 18 }, (_, i) => { const g = mk(b, 'g', {}); const a = mk(g, 'circle', { r: 14, fill: C.ink2 }); const h = mk(g, 'circle', { cx: 13, cy: -10, r: 8, fill: XC }); return { g, a, h, x: 190 + (i % 6) * 80 + rnd(i, 1) * 16, y: 200 + Math.floor(i / 6) * 80 + rnd(i, 2) * 16, ph: rnd(i, 3) * 6.28 }; });
const IONI = [4, 13];
const ADD = Array.from({ length: 16 }, (_, i) => ({ a: ball(b, 13, OC, '−', 18), n: ball(b, 9, GR, '+', 14), x: 180 + (i % 8) * 60 + rnd(i, 5) * 20, y: 180 + Math.floor(i / 8) * 150 + rnd(i, 6) * 90, ph: rnd(i, 7) * 6.28 }));
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const bKey = txt(b, 392, 490, 'ACETATE −   ·   Na⁺ +   ·   H⁺ ORANGE', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
$('#eE').innerHTML = K(`${HAc} \\rightleftharpoons ${Hp} + ${Ac}`);
const TL = [['α · FRACTION BROKEN UP', '1.32 %', '0.0174 %', BC], ['[H₃O⁺]', '1.32 × 10⁻³ M', '1.74 × 10⁻⁵ M', NC], ['pH', '2.88', '4.76', HC]];
$('#tls').innerHTML = TL.map(([k, a, bb, c], i) => `<div class="tile2" id="tl${i}" style="top:${170 + i * 112}px"><div class="tk">${k}</div><div class="ta" style="color:${c}">${a}</div><div class="tar" id="ta${i}">→</div><div class="tb" id="tb${i}" style="color:${c}">${bb}</div></div>`).join('');
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The shared ion calms the acid down!' });

/* ---------- L ---------- */
const LR = [[`${HAc} \\rightleftharpoons ${Hp} + ${Ac}`, 'ADD CH₃COONa · COMMON ION: ACETATE', OC], [`\\mathrm{NH_4OH} \\rightleftharpoons ${tN('\\mathrm{NH_4^+}')} + ${tV('\\mathrm{OH^-}')}`, 'ADD NH₄Cl · COMMON ION: AMMONIUM', NC]];
$('#lrs').innerHTML = LR.map(([k, tg, c], i) => `<div class="lr" id="lr${i}" style="top:${250 + i * 136}px">${K(k)}<span class="tg" style="color:${c}">${tg}</span></div>`).join('');

/* ---------- D: hydrolysis ---------- */
const MS = [[K('\\text{salt} = \\text{acid part} + \\text{base part}'), 'D2'], [K(`${Ac} + \\mathrm{H_2O} \\rightleftharpoons ${HAc} + ${tV('\\mathrm{OH^-}')}`), 'D3'], [K(`${tN('\\mathrm{NH_4^+}')} + \\mathrm{H_2O} \\rightleftharpoons \\mathrm{NH_4OH} + ${tN('\\mathrm{H^+}')}`), 'D4'], [K(`${tY('\\mathrm{Na^+}')},\\ ${tY('\\mathrm{Cl^-}')}:\\ \\text{no reaction}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${100 + i * 112}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const DR = [[150, OC, '−', 'ACETATE', 'BASIC · OH⁻ LEFT', BC, 1, 'D3'], [300, NC, '+', 'AMMONIUM', 'ACIDIC · H⁺ MADE', RD, -1, 'D4'], [450, GR, '±', 'Na⁺, Cl⁻', 'NEUTRAL · NOTHING', HC, 0, 'D5']];
const dRows = DR.map(([y, c, s, n, r, rc]) => { const g = mk(ds, 'g', {}); mk(g, 'rect', { x: 36, y: y - 56, width: 712, height: 112, rx: 14, fill: C.soft }); const ion = ball(g, 36, c, s, 34); at(ion.g, 110, y); txt(g, 110, y + 52, n, { 'text-anchor': 'middle', 'font-size': 13, fill: c, 'font-weight': 600 }); const w = ball(g, 34, C.ink2, 'H₂O', 17); at(w.g, 300, y); const p = mk(g, 'circle', { r: 11, fill: XC }); const res = txt(g, 720, y + 8, r, { 'text-anchor': 'end', 'font-size': 22, fill: rc, 'font-weight': 600 }); return { g, ion, w, p, res, y }; });

/* ---------- G: four types ---------- */
const FT = [['STRONG ACID + STRONG BASE', '\\mathrm{NaCl}', 'pH = 7', HC, '\\text{no hydrolysis}', 'G2'], ['WEAK ACID + STRONG BASE', '\\mathrm{CH_3COONa}', 'BASIC', BC, `\\text{pH} = 7 + \\tfrac{1}{2}(${pKa} + \\log c)`, 'G3'], ['STRONG ACID + WEAK BASE', '\\mathrm{NH_4Cl}', 'ACIDIC', RD, `\\text{pH} = 7 - \\tfrac{1}{2}(${pKb} + \\log c)`, 'G4'], ['WEAK ACID + WEAK BASE', '\\mathrm{CH_3COONH_4}', 'DEPENDS', GC, `\\text{pH} = 7 + \\tfrac{1}{2}(${pKa} - ${pKb})`, 'G5']];
$('#fts').innerHTML = FT.map(([k, e, v, c, f], i) => `<div class="ft" id="ft${i}" style="left:${36 + (i % 2) * 780}px;top:${84 + Math.floor(i / 2) * 248}px"><div class="fk">${k}</div><div class="fe">${K(e)}</div><div class="fv" style="color:${c}">${v}</div><div class="ff">${K(f)}</div></div>`).join('');
const tFt = FT.map(f => T0(f[5]) + 0.1);

/* ---------- C: NaCl vs NaAc ---------- */
const eqr = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqr('ca0', 84, '\\text{Acid parent: } \\mathrm{HCl}', 'STRONG', RD) + eqr('ca1', 172, '\\text{Base parent: } \\mathrm{NaOH}', 'STRONG', BC);
$('#cfr').innerHTML = eqr('cf0', 84, `\\text{Acid parent: } ${HAc}`, 'WEAK', C.mute) + eqr('cf1', 172, '\\text{Base parent: } \\mathrm{NaOH}', 'STRONG', BC);
const seesaw = p => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M372 380 L412 380 L392 346 Z', fill: C.ink2 }); const beam = mk(g, 'g', {}); mk(beam, 'rect', { x: -260, y: -6, width: 520, height: 12, rx: 6, fill: HC }); txt(beam, -200, -18, 'ACID', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 }); txt(beam, 200, -18, 'BASE', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 }); return { g, beam }; };
const sA = seesaw($('#caS')), sB = seesaw($('#cfS'));
$('#caV').innerHTML = `<span style="color:${HC}">NEUTRAL</span><span>·</span><span>pH 7</span>`; $('#cfV').innerHTML = `<span style="color:${BC}">BASIC</span><span>·</span><span>pH &gt; 7</span>`;
const th1 = PUC.think($('#th1'), { q: 'Washing soda, Na₂CO₃: from weak H₂CO₃ and strong NaOH. Acidic or basic?', opts: ['Acidic', 'Basic'], right: 1, why: 'Basic. The stronger parent, NaOH, decides the pH.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{pH} = 7 + \\tfrac{1}{2}(${pKa} + \\log c) \\qquad \\text{pH} = 7 - \\tfrac{1}{2}(${pKb} + \\log c)`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{pH} = 7 + \\tfrac{1}{2}(${pKa} + \\log c)`)],
  [K(`${pKa} + \\log c = 4.76 + (-1) = 3.76`)],
  [K('\\tfrac{1}{2} \\times 3.76 = 1.88')],
  [K(`\\text{pH} = 7 + 1.88 = ${tB('8.88')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W5', 'equals')];
const ws = $('#wS');
const wJar = mk(ws, 'path', { d: 'M90 150 V370 a20 20 0 0 0 20 20 H330 a20 20 0 0 0 20 -20 V150', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const wLiq = mk(ws, 'rect', { x: 92, y: 200, width: 256, height: 188, fill: '#E6F3FA' });
const wMet = mk(ws, 'g', {}); mk(wMet, 'rect', { x: 430, y: 90, width: 290, height: 190, rx: 16, fill: C.ink }); mk(wMet, 'rect', { x: 454, y: 114, width: 242, height: 100, rx: 8, fill: '#E8F5F5' }); txt(wMet, 575, 252, 'pH METER', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 });
mk(wMet, 'path', { d: 'M470 280 C470 330 260 300 260 340 V360', stroke: C.ink2, 'stroke-width': 5, fill: 'none' }); mk(wMet, 'rect', { x: 252, y: 300, width: 16, height: 70, rx: 6, fill: C.ink2 });
const wRd = txt(ws, 575, 186, '', { 'text-anchor': 'middle', 'font-size': 52, fill: BC, 'font-weight': 600 });
const wSc = mk(ws, 'g', {}); for (let i = 0; i < 14; i++) { const c = i + 0.5; mk(wSc, 'rect', { x: 90 + i * 45, y: 420, width: 45.5, height: 22, fill: c < 7 ? mix('#F2B8B8', '#FBEDED', c / 7) : mix('#EAF0FC', '#B9CDF5', (c - 7) / 7) }); }
[0, 7, 14].forEach(v => txt(wSc, 90 + v * 45, 470, String(v), { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 }));
const wMk = mk(ws, 'path', { d: 'M-9 -12 L9 -12 L0 0 Z', fill: BC });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every salt solution has pH 7', right: 'Only strong acid + strong base salts are neutral' });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'CH₃COONa: BASIC', { 'font-size': 30, fill: BC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 170, 'NH₄Cl: ACIDIC', { 'font-size': 30, fill: RD, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Acidic, basic or neutral salt; pH of a salt solution from pKa or pKb' });
const OPT = ['8.38', '5.63', '3.63', '7.00'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'pH of 0.01 M NH₄Cl at 298 K? pKb of NH₃ = 4.75', qW: 900, opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\text{pH} = 7 - \\tfrac{1}{2}(${pKb} + \\log c)`)], [K('4.75 + (-2) = 2.75')], [K(`7 - 1.375 = ${tO('5.63')}`)], ['A used the plus sign']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'used') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · common ion effect and hydrolysis', y0: 96, dy: 74, txt: [0, 0, 0, 1, 1],
  lines: [K(`\\text{add } ${Ac} \\text{ to } ${HAc}:\\ \\text{ionization falls}`), K(`\\text{weak acid + strong base: pH} = 7 + \\tfrac{1}{2}(${pKa} + \\log c)`), K(`\\text{strong acid + weak base: pH} = 7 - \\tfrac{1}{2}(${pKb} + \\log c)`),
    '<b>Weak + weak</b>: pH = 7 + ½(pKa - pKb) · <b>strong + strong</b>: pH 7', '<b>Stronger parent decides</b> · CH₃COONa (0.1 M): 8.88'] });
const YQ = ['Why does sodium acetate lower the ionization of acetic acid?', 'Is ammonium chloride solution acidic or basic, and why?', 'Which salt type always gives pH 7?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 69', topic: 'Why does blood stay at pH 7.4? Buffer Solutions', y: 764 });

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
  document.querySelectorAll('.ft .ff').forEach(q => { if (q.offsetWidth > 690) q.style.fontSize = Math.floor(30 * 690 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 520) q.style.fontSize = Math.floor(26 * 520 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.lr').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 900) q.style.fontSize = Math.floor(38 * 900 / k.offsetWidth) + 'px'; });
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
    const tBd = [wt('H2', 'All'), wt('H2', 'salts'), wt('H2', 'neutral')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'neutral') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'predict') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'swing') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(pEq, t, wt('P2', 'equilibrium') - 0.3); [pF.l, pF.h, pFt, pB.l, pB.h, pBt].forEach(e => fade(e, t, wt('P2', 'equilibrium')));
    const tc = wt('P3', 'group'), u = M.io((t - tc) / 1.0), tb = wt('P3', 'fewer'), v = M.io((t - tb) / 0.8);
    pCrowd.forEach((c, i) => { at(c.g, 470 + (i % 7) * 40, 380 + Math.floor(i / 7) * 40 + 120 * (1 - M.io((t - tc - i * 0.05) / 0.5))); fade(c.g, t, tc + i * 0.05, 1e9, 0.2); });
    fade(pCt, t, tc + 0.6);
    attr(pF.l, 'stroke-width', (8 - 4 * v).toFixed(1)); attr(pB.l, 'stroke-width', (8 + 8 * v).toFixed(1));
    M.vis($('#pP'), t, wt('P4', 'Chatelier') - 0.3, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(glass, t, tS1 + 0.3); fade(water, t, tS1 + 0.4); M.hide(bKey, true);
    const tAdd = wt('S3', 'sodium'), tGrab = wt('S4', 'grabs'), back = M.io((t - tGrab) / 0.9);
    HAm.forEach((m, i) => { const x = m.x + 4 * Math.sin(t * 2 + m.ph), y = m.y + 4 * Math.cos(t * 1.7 + m.ph); at(m.g, x, y); fade(m.g, t, T0('S2') - 0.3 + i * 0.03, 1e9, 0.2);
      const k = IONI.indexOf(i), sp = k >= 0 ? M.io((t - T0('S2') - 0.4 - k * 0.3) / 0.5) * (1 - back) : 0;
      attr(m.a, 'fill', mix(C.ink2, OC, M.clamp(sp * 2))); attr(m.h, 'cx', (13 + 26 * sp).toFixed(1)); attr(m.h, 'cy', (-10 - 30 * sp).toFixed(1)); attr(m.h, 'stroke', NC); attr(m.h, 'stroke-width', (3 * sp).toFixed(1)); });
    ADD.forEach((d, i) => { const u = M.io((t - tAdd - i * 0.06) / 0.6); const x = d.x + 4 * Math.sin(t * 2.3 + d.ph), y = M.lerp(60, d.y, u) + 4 * Math.cos(t * 1.9 + d.ph); at(d.a.g, x, y); at(d.n.g, x + 22, y + 18); fade(d.a.g, t, tAdd + i * 0.06, 1e9, 0.2); fade(d.n.g, t, tAdd + i * 0.06, 1e9, 0.2); });
    const TAG = [[tS1 + 0.3, 'IN WATER'], [T0('S2'), 'α ≈ 1.3 %'], [tAdd, '+ SODIUM ACETATE'], [tGrab, 'SHIFT LEFT'], [T0('S5'), 'pH 4.76']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eE'), t, T0('S2') + 0.2, 1e9, { dy: 14 });
    TL.forEach((_, i) => { const el = $('#tl' + i); M.vis(el, t, T0('S2') + 0.6 + i * 0.25, 1e9, { dy: 16 }); const tt = wt('S5', 'falls') + i * 1.0; M.vis($('#ta' + i), t, tt - 0.2, 1e9, POP); M.vis($('#tb' + i), t, tt, 1e9, POP); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tt - 1.0) / 0.25)))); });
    avD(t, T1('S5') - 1.4, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#lDef'), t, T0('L2') - 0.1, 1e9, { dy: 16 });
    M.vis($('#lr0'), t, wt('L2', 'weak') - 0.2, 1e9, { dy: 16 }); M.vis($('#lr1'), t, T0('L3') + 0.2, 1e9, { dy: 16 });
    setBg($('#lr0'), mix(C.soft, C.ac2, M.io((t - wt('L2', 'weak')) / 0.3) * (1 - M.io((t - T0('L3')) / 0.3)))); setBg($('#lr1'), mix(C.soft, C.ac2, M.io((t - T0('L3') - 0.3) / 0.3)));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    dRows.forEach((r, i) => { const t0 = T0(DR[i][7]); fade(r.g, t, t0); const dir = DR[i][6]; const u = M.io((t - t0 - 1.2) / 0.8);
      if (dir === 1) { attr(r.p, 'cx', M.lerp(300 + 18, 110 + 26, u).toFixed(1)); attr(r.p, 'cy', (r.y - 20 - 50 * Math.sin(Math.PI * u)).toFixed(1)); attr(r.w.c, 'fill', mix(C.ink2, OC, u)); M.setT(r.w.tx, u > 0.5 ? 'OH⁻' : 'H₂O'); attr(r.ion.c, 'fill', mix(OC, C.ink2, u)); }
      else if (dir === -1) { attr(r.p, 'cx', M.lerp(110 + 26, 300 - 18, u).toFixed(1)); attr(r.p, 'cy', (r.y - 20 - 50 * Math.sin(Math.PI * u)).toFixed(1)); attr(r.w.c, 'fill', mix(C.ink2, NC, u)); M.setT(r.w.tx, u > 0.5 ? 'H₃O⁺' : 'H₂O'); attr(r.ion.c, 'fill', mix(NC, C.ink2, u)); }
      else { r.p.style.display = 'none'; }
      fade(r.res, t, t0 + 1.8); });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dy: 36, ...o });
    FT.forEach((_, i) => { const el = $('#ft' + i); M.vis(el, t, tFt[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tFt[i + 1] : T1('G5') + 0.4; setBg(el, mix(C.soft, C.ac2, M.io((t - tFt[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'chloride') + 0.1, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'both') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, wt('C1', 'acetate') - 0.3, zc, { dx: 60, dy: 0, ...o });
    M.vis($('#cf0'), t, wt('C1', 'acetate') + 0.2, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C1', 'base') - 0.1, 1e9, { dy: 16 });
    fade(sA.g, t, wt('C1', 'neutral') - 0.3); fade(sB.g, t, wt('C1', 'base'));
    at(sA.beam, 392, 340); attr(sB.beam, 'transform', `translate(392,340) rotate(${(12 * M.io((t - wt('C1', 'basic') + 0.3) / 0.8)).toFixed(2)})`);
    M.vis($('#caV'), t, wt('C1', 'neutral'), 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'basic'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Acidic') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'stronger') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'stronger') - 0.3, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'decides') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'decides') + 0.2, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [wJar, wLiq, wMet, wSc].forEach(e => fade(e, t, T0('W2') + 0.4));
    const u = M.io((t - tWs[3]) / 1.2), v = M.lerp(7, 8.88, u);
    M.setT(wRd, t < T0('W3') ? '- - -' : v.toFixed(2)); attr(wMk, 'transform', `translate(${(90 + v * 45).toFixed(1)},418)`); fade(wMk, t, T0('W3'));
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Only') - 0.1 });
    fade(tq1, t, wt('X3', 'Sodium')); fade(tq2, t, wt('X3', 'Ammonium'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tYy - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tYy - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
