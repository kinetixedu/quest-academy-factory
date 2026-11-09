// PUC Chemistry Ep 72: Oxidation number (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electron e- orange (canon), oxygen (element scored) teal, H ink, positive score blue, negative score red, Cr / Mn (element in the worked example) gold, Na teal-free violet, Cl green
const NC = C.ac, HC = C.ink, EC = '#C8461B', PL = '#2B6CB0', RD = C.red, GC = '#B7791F', VI = '#7A4FE0', CL = '#3C9A5F', OK = C.ok;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const col = (c, s) => `\\textcolor{${c}}{${s}}`;
const pl = s => col(PL, s), ng = s => col(RD, s), gd = s => col(GC, s);
const at = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); attr(g, 'transform', `translate(${x},${y})`); return g; };
const chip = (p, x, y, s, c) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x - 40, y: y - 22, width: 80, height: 44, rx: 10, fill: '#fff', stroke: c, 'stroke-width': 3 }); txt(g, x, y + 9, s, { 'text-anchor': 'middle', 'font-size': 26, fill: c, 'font-weight': 700 }); return g; };
const mv = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const bond = (p, x1, y1, x2, y2) => mk(p, 'line', { x1, y1, x2, y2, stroke: HC, 'stroke-width': 6, 'stroke-linecap': 'round' });

Object.assign(M.IC, {
  rope: ['M2 12h20', 'M5 9l-3 3 3 3', 'M19 9l3 3-3 3'],
  pizza: ['M12 2 3 20c6 3 12 3 18 0z', 'M9 11h.01', 'M14 14h.01', 'M11 16h.01'],
  score: ['M4 5h16v14H4z', 'M8 12h3', 'M9.5 10.5v3', 'M14 12h3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tR1 = T0('R1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['rope', 'Tug of war', 'STRONGER PULLS', 'tug', 'PULL', NC], ['pizza', 'Shared pizza', 'MORE SLICES', 'pizza', 'MORE', GC], ['score', 'Game score', 'PLUS OR MINUS', 'score', '+ / -', PL]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Water: electrons are shared', 'share', 'H4'], ['Nobody gives them away fully', 'Nobody', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('score', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P ---------- */
const QR = [['NaCl: sodium gives 1 e⁻', 'EASY', 'P1', 'truly', OK], ['H₂O: electrons only shared', 'SHARED', 'P2', 'shared', RD], ['O pulls shared pairs harder', 'PULLS', 'P2', 'pulls', NC], ['Track shared electrons too', 'OX. NUMBER', 'P3', 'track', NC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pA = mk(ps, 'g', {}); txt(pA, 60, 110, 'NaCl · GIVEN', { 'font-size': 20, fill: HC, 'font-weight': 600 }); at(pA, 220, 190, 40, VI, 'Na', 24); at(pA, 560, 190, 44, CL, 'Cl', 24);
const pAe = mk(pA, 'circle', { r: 9, fill: EC });
const pB = mk(ps, 'g', {}); txt(pB, 60, 320, 'H₂O · SHARED, PULLED', { 'font-size': 20, fill: HC, 'font-weight': 600 }); bond(pB, 240, 410, 560, 410); at(pB, 240, 410, 30, HC, 'H', 22); at(pB, 560, 410, 46, NC, 'O', 26);
const pBe = [mk(pB, 'circle', { r: 9, fill: EC }), mk(pB, 'circle', { r: 9, fill: EC })];
const pBt = txt(pB, 520, 490, 'PAIR SITS NEARER O', { 'text-anchor': 'middle', 'font-size': 18, fill: NC, 'font-weight': 600 });

/* ---------- S: score water ---------- */
const b = $('#bS');
const OX = 392, OY = 220, H1 = [232, 400], H2 = [552, 400];
bond(b, OX, OY, H1[0], H1[1]); bond(b, OX, OY, H2[0], H2[1]);
const sO = at(b, OX, OY, 56, NC, 'O', 34), sH1 = at(b, H1[0], H1[1], 38, HC, 'H', 26), sH2 = at(b, H2[0], H2[1], 38, HC, 'H', 26);
const PR = [[H1, -1], [H1, 1], [H2, -1], [H2, 1]].map(() => mk(b, 'circle', { r: 9, fill: EC }));
const cO = chip(b, OX, OY - 96, '-2', RD), cH1 = chip(b, H1[0], H1[1] + 76, '+1', PL), cH2 = chip(b, H2[0], H2[1] + 76, '+1', PL);
const sSum = txt(b, 392, 548, '-2 + 1 + 1 = 0', { 'text-anchor': 'middle', 'font-size': 28, fill: HC, 'font-weight': 700 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const trow = (id, top, s, tag, c, h = 76) => `<div class="eqr" id="${id}" style="top:${top}px;height:${h}px;font:600 26px Poppins">${s}<span class="tg" style="color:${c};font-size:30px">${tag}</span></div>`;
const ER = [['Oxygen: takes both pairs', '-2', RD, () => wt('S3', 'minus')], ['Hydrogen 1: lost its electron', '+1', PL, () => wt('S4', 'plus')], ['Hydrogen 2: lost its electron', '+1', PL, () => wt('S4', 'plus') + 0.4], ['Total for H₂O', '0 ✓', OK, () => wt('S5', 'Zero')]];
$('#ets').innerHTML = ER.map(([s, tg, c], i) => trow('et' + i, 96 + i * 96, s, tg, c)).join('');
const tEr = ER.map(e => e[3]());

/* ---------- L ---------- */
$('#hcI').innerHTML = M.icon('score', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`\\text{up} = ${col(OK, '\\text{oxidation}')} \\qquad \\text{down} = ${ng('\\text{reduction}')}`);
const hs = $('#hS'), NX = v => 112 + (v + 2) * 70, NY = 300;
mk(hs, 'line', { x1: 80, y1: NY, x2: 704, y2: NY, stroke: HC, 'stroke-width': 3 });
for (let v = -2; v <= 6; v++) { mk(hs, 'line', { x1: NX(v), y1: NY - 10, x2: NX(v), y2: NY + 10, stroke: HC, 'stroke-width': 2 }); txt(hs, NX(v), NY + 40, (v > 0 ? '+' : '') + v, { 'text-anchor': 'middle', 'font-size': 20, fill: v < 0 ? RD : v > 0 ? PL : HC, 'font-weight': 600 }); }
const hM = at(hs, NX(0), NY - 50, 26, GC, 'Cu', 16);
const hUp = mk(hs, 'path', { d: `M${NX(0)} ${NY - 100} Q${NX(1)} ${NY - 160} ${NX(2)} ${NY - 100}`, stroke: OK, 'stroke-width': 4, fill: 'none' }), hUpT = txt(hs, NX(1), NY - 170, 'UP: OXIDATION', { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 700 });
const hDn = mk(hs, 'path', { d: `M${NX(2)} ${NY + 70} Q${NX(1)} ${NY + 130} ${NX(0)} ${NY + 70}`, stroke: RD, 'stroke-width': 4, fill: 'none' }), hDnT = txt(hs, NX(1), NY + 160, 'DOWN: REDUCTION', { 'text-anchor': 'middle', 'font-size': 20, fill: RD, 'font-weight': 700 });

/* ---------- D ---------- */
const MS = [[K(`\\mathrm{H_2},\\ \\mathrm{O_2},\\ \\mathrm{Na}:\\ 0`), 'D2'], [K(`\\mathrm{Na^+}: ${pl('+1')},\\ \\ \\mathrm{Cl^-}: ${ng('-1')}`), 'D3'], [K(`\\Sigma = 0\\ \\text{(molecule)},\\ \\ \\Sigma = \\text{charge (ion)}`), 'D4']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${100 + i * 120}px"><div class="sn">${i + 1}</div><div class="stx" style="font-size:40px">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const RL = [['Fluorine: always -1', K(`\\mathrm{F}: ${ng('-1')}`), () => wt('R2', 'Fluorine')], ['Group 1: +1 · Group 2: +2', K(`\\mathrm{Na, K}: ${pl('+1')}\\ \\ \\mathrm{Mg, Ca}: ${pl('+2')}`), () => wt('R2', 'Group')], ['Hydrogen: +1, with metals -1', K(`\\mathrm{HCl}: ${pl('+1')}\\ \\ \\mathrm{NaH}: ${ng('-1')}`), () => T0('R3')], ['Oxygen: -2, with exceptions', K(`\\mathrm{H_2O_2}: ${ng('-1')}\\ \\ \\mathrm{KO_2}: ${ng('-\\tfrac{1}{2}')}\\ \\ \\mathrm{OF_2}: ${pl('+2')}`), () => T0('R4')]];
$('#rls').innerHTML = RL.map(([a, k], i) => `<div class="rule" id="rl${i}" style="top:${84 + i * 114}px"><div class="nn">${i + 1}</div><div class="rt">${a}</div><div class="rk">${k}</div></div>`).join('');
const tRl = RL.map(r => r[2]());

/* ---------- G: Stock ---------- */
const eqrow = (id, top, tex, tag, c, fs = 30) => `<div class="eqr" id="${id}" style="top:${top}px;font-size:${fs}px">${K(tex)}<span class="tg" style="color:${c};font-size:20px">${tag}</span></div>`;
const GL = [eqrow('gl0', 96, `\\mathrm{Fe}:\\ ${pl('+2')}\\ \\text{or}\\ ${pl('+3')}`, 'TWO SCORES', GC), eqrow('gl1', 214, `\\overset{${pl('+2')}}{\\mathrm{Fe}}\\mathrm{O}`, 'IRON(II) OXIDE', PL, 40), eqrow('gl2', 332, `\\overset{${pl('+3')}}{\\mathrm{Fe}}_2\\mathrm{O_3}`, 'IRON(III) OXIDE', PL, 40)];
$('#gls').innerHTML = GL.join('');
$('#gb').querySelectorAll('.eqr').forEach((e, i) => { if (i) e.style.height = '96px'; });
const GR = [['\\mathrm{Cu_2O}', 'COPPER(I) OXIDE'], ['\\mathrm{SnCl_2}', 'TIN(II) CHLORIDE'], ['\\mathrm{MnO_2}', 'MANGANESE(IV) OXIDE'], ['\\mathrm{Hg_2Cl_2}', 'MERCURY(I) CHLORIDE']];
$('#grs').innerHTML = GR.map(([e, n], i) => eqrow('gr' + i, 84 + i * 96, e, n, PL)).join('');
const tGl = [wt('G1', 'more'), wt('G3', 'iron'), wt('G3', 'iron', 1)];

/* ---------- C: water vs peroxide ---------- */
const cA = $('#caS'), cB = $('#cfS');
bond(cA, 392, 170, 252, 300); bond(cA, 392, 170, 532, 300); at(cA, 392, 170, 46, NC, 'O', 28); at(cA, 252, 300, 32, HC, 'H', 22); at(cA, 532, 300, 32, HC, 'H', 22);
const cAc = [chip(cA, 392, 92, '-2', RD), chip(cA, 252, 366, '+1', PL), chip(cA, 532, 366, '+1', PL)];
bond(cB, 140, 300, 300, 200); bond(cB, 300, 200, 484, 200); bond(cB, 484, 200, 644, 300); at(cB, 300, 200, 46, NC, 'O', 28); at(cB, 484, 200, 46, NC, 'O', 28); at(cB, 140, 300, 32, HC, 'H', 22); at(cB, 644, 300, 32, HC, 'H', 22);
const cBc = [chip(cB, 300, 122, '?', RD), chip(cB, 484, 122, '?', RD), chip(cB, 140, 366, '+1', PL), chip(cB, 644, 366, '+1', PL)];
$('#caV').innerHTML = `<span>O in H₂O:</span><span style="color:${RD}">-2</span>`; $('#cfV').innerHTML = `<span>O in H₂O₂:</span><span style="color:${RD}">?</span>`;
const th1 = PUC.think($('#th1'), { q: 'What is the oxidation number of oxygen in hydrogen peroxide, H₂O₂?', opts: ['-2', '-1'], right: 1, why: 'Minus one. Two H give +2, split between two O. The O-O pair is shared equally.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\overset{${pl('+2')}}{\\mathrm{Cu}}\\mathrm{O} + \\overset{0}{\\mathrm{H_2}} \\rightarrow \\overset{0}{\\mathrm{Cu}} + \\overset{${pl('+1')}}{\\mathrm{H_2}}\\mathrm{O}`);

/* ---------- W ---------- */
const X = gd('x');
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{K}: 2 \\times (${pl('+1')}) = +2`)],
  [K(`\\mathrm{O}: 7 \\times (${ng('-2')}) = -14`)],
  [K(`+2 + 2${X} - 14 = 0`)],
  [K(`${X} = ${gd('+6')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const WR = [[eqrow('wr0', 84, '\\mathrm{K_2}', '2 × (+1) = +2', PL), () => T0('W3')], [eqrow('wr1', 166, `\\mathrm{Cr_2}`, '2x', GC), () => T0('W5')], [eqrow('wr2', 248, '\\mathrm{O_7}', '7 × (-2) = -14', RD), () => T0('W4')], [eqrow('wr3', 330, '\\text{Total}', '0', OK), () => wt('W5', 'zero')],
  [eqrow('wr4', 412, `\\overset{${pl('+2')}}{\\mathrm{Cu}}\\mathrm{O} + \\overset{0}{\\mathrm{H_2}} \\rightarrow \\overset{0}{\\mathrm{Cu}} + \\overset{${pl('+1')}}{\\mathrm{H_2}}\\mathrm{O}`, 'Cu ↓  H ↑', EC), () => T0('W7')]];
$('#wrs').innerHTML = WR.map(w => w[0]).join('');
$('#wr').querySelectorAll('.eqr').forEach((e, i) => { e.style.height = i < 4 ? '70px' : '84px'; });
const tWr = WR.map(w => w[1]());

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `O is -2 in ${K('\\mathrm{H_2O_2}')} too`, right: `Peroxide: O is ${K(ng('-1'))} · with F, O is positive` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'H₂O₂: 2(+1) + 2x = 0', { 'font-size': 28, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 180, 'x = -1', { 'font-size': 28, fill: RD, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Find an oxidation number, write a Stock name, or spot redox from oxidation number changes' });
const OPT = ['+7', '+6', '+4', '+2'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'What is the oxidation number of Mn in potassium manganate, K₂MnO₄?', qW: 940,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`2(+1) + ${X} + 4(-2) = 0`)], [K(`2 + ${X} - 8 = 0`)], [K(`${X} = ${gd('+6')}`)], [`A: +7 is KMnO₄`]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'So'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Oxidation number', y0: 96, dy: 74, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Free element</b> 0 · <b>ion</b> = its charge · <b>sum</b> = 0 (or the ion charge)', '<b>F</b> -1 · <b>Group 1</b> +1 · <b>Group 2</b> +2 · <b>H</b> +1 (metal hydride -1)', '<b>O</b> -2 · peroxide -1 · superoxide -½ · with F positive', '<b>Stock</b>: FeO iron(II) oxide · Fe₂O₃ iron(III) oxide', '<b>Up</b>: oxidation · <b>down</b>: reduction · Cr in K₂Cr₂O₇ = +6'] });
const YQ = ['What is the oxidation number of any free element?', 'Name Fe₂O₃ in Stock notation.', 'Find the oxidation number of S in H₂SO₄.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 73', topic: 'Redox reactions come in families? Types of Redox Reactions', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Oxygen wins the tug of war!' });

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
  document.querySelectorAll('.ms .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.rule .rk, .rule .rt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 620 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); if (k && tg && k.offsetWidth + tg.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * (640 - tg.offsetWidth) / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const hl = (t, els, ts, tEnd) => els.forEach((el, i) => { const nx2 = i < els.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
const shrink = (el, t, ts) => { const sh = M.spring(t - ts, M.HEAVY); snap(el, 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); };

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
    const tB = [wt('H2', 'atom'), wt('H2', 'score'), wt('H2', 'pulled')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'tells') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'lost') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => M.vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, QR.map((_, i) => $('#qr' + i)), tQr, T1('P3') + 0.4);
    M.vis($('#pw'), t, tQr[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    fade(pA, t, tQr[0]); const ua = M.io(((t - tQr[0]) % 2.4) / 1.2); mv(pAe, M.lerp(262, 514, ua), 190 - 40 * Math.sin(Math.PI * ua));
    fade(pB, t, tQr[1]); const ub = M.io((t - tQr[2]) / 0.8); pBe.forEach((e, k) => mv(e, M.lerp(400, 490, ub) + 4 * Math.sin(2 * t + k), 410 + (k ? 14 : -14)));
    fade(pBt, t, tQr[2] + 0.3);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1'), tPr = wt('S2', 'Hand');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    [[H1, -1], [H1, 1], [H2, -1], [H2, 1]].forEach(([h, s], k) => { const mx = (OX + h[0]) / 2, my = (OY + h[1]) / 2, nx2 = -(h[1] - OY), ny2 = h[0] - OX, L = Math.hypot(nx2, ny2), u = M.io((t - tPr - (k >> 1) * 0.3) / 0.8);
      const tx = M.lerp(mx, OX + (h[0] - OX) * 0.36, u), ty = M.lerp(my, OY + (h[1] - OY) * 0.36, u); mv(PR[k], tx + s * 13 * nx2 / L, ty + s * 13 * ny2 / L); fade(PR[k], t, wt('S1', 'shared') - 0.2, 1e9, 0.2); });
    fade(cO, t, wt('S3', 'minus')); fade(cH1, t, wt('S4', 'plus')); fade(cH2, t, wt('S4', 'plus') + 0.4); fade(sSum, t, wt('S5', 'Add'));
    const TAG = [[tS1 + 0.3, 'EACH BOND: ONE SHARED PAIR'], [tPr, 'PAIRS GO TO OXYGEN'], [T0('S3'), 'O: +2e⁻ → -2'], [T0('S4'), 'H: -1e⁻ → +1'], [T0('S5'), 'TOTAL = 0']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    ER.forEach((e, i) => { M.vis($('#et' + i), t, tS1 + 0.7 + i * 0.15, 1e9, { dy: 16 }); M.setT($('#et' + i + ' .tg'), t >= tEr[i] ? e[1] : '?'); });
    hl(t, ER.map((_, i) => $('#et' + i)), tEr, T1('S5') + 0.4);
    avA(t, T1('S5') - 0.4, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1'), tSh = T0('L2') - 0.3;
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o }); shrink($('#lw'), t, tSh);
    M.vis($('#hcd'), t, wt('L1', 'oxidation') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, wt('L1', 'charge'), 2.0); PUC.write($('#lEq'), t, wt('L3', 'Oxidation'), 0.9);
    M.vis($('#lh'), t, tSh, z, { dx: 60, dy: 0, ...o });
    const tu = wt('L3', 'up'), td = wt('L3', 'down'); let v = M.lerp(0, 2, M.io((t - tu) / 0.8)); v = M.lerp(v, 0, M.io((t - td) / 0.8));
    attr(hM, 'transform', `translate(${NX(v).toFixed(1)},${NY - 50})`); fade(hM, t, tSh + 0.3);
    M.draw(hUp, t, tu, 0.6); fade(hUpT, t, tu + 0.3); M.draw(hDn, t, td, 0.6); fade(hDnT, t, td + 0.3);
    M.vis($('#hP'), t, wt('L2', 'track') - 0.2, 1e9, POP);
  }

  /* D + fixed */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o }); shrink($('#mt'), t, tR1 - 0.2);
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.8); });
    M.vis($('#dP'), t, T1('D4') - 0.4, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.1, z, { dx: 60, dy: 0, ...o });
    RL.forEach((_, i) => M.vis($('#rl' + i), t, tRl[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, RL.map((_, i) => $('#rl' + i)), tRl, T1('R4') + 0.4);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1'), tSh = T0('G2') - 0.2;
    M.vis($('#gb'), t, tG1 + 0.05, z, { dy: 36, ...o }); shrink($('#gb'), t, tSh);
    tGl.forEach((tt, i) => M.vis($('#gl' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    hl(t, [0, 1, 2].map(i => $('#gl' + i)), tGl, T1('G3') + 0.3);
    M.vis($('#gr'), t, tSh, z, { dx: 60, dy: 0, ...o });
    GR.forEach((_, i) => M.vis($('#gr' + i), t, T0('G2') + 0.5 + i * 0.7, 1e9, { dy: 16 }));
    M.vis($('#gP'), t, wt('G3', 'name') - 0.1, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1'), tw = wt('C1', 'Water'), tp = wt('C1', 'peroxide');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, tp - 0.2, zc, { dx: 60, dy: 0, ...o });
    cAc.forEach((c, i) => fade(c, t, wt('C2', 'water') + i * 0.15)); M.vis($('#caV'), t, wt('C2', 'hydrogens'), 1e9, { dy: 16 });
    cBc.forEach((c, i) => fade(c, t, wt('C2', 'peroxide') + i * 0.15)); M.vis($('#cfV'), t, wt('C2', 'middle') - 0.2, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'oxygen') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'two') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Score') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'down') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'reduction') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    WR.forEach((_, i) => M.vis($('#wr' + i), t, i < 4 ? T0('W2') + 0.6 + i * 0.15 : tWr[4] - 0.1, 1e9, { dy: 16 }));
    const tg1 = $('#wr1 .tg'), tg3 = $('#wr3 .tg');
    M.setT($('#wr0 .tg'), t >= tWr[0] ? '2 × (+1) = +2' : '?'); M.setT($('#wr2 .tg'), t >= tWr[2] ? '7 × (-2) = -14' : '?');
    M.setT(tg1, t >= T0('W6') ? '2x = +12, x = +6' : t >= tWr[1] ? '2x' : '?'); M.setT(tg3, t >= tWr[3] ? '0' : 'MUST BE 0');
    hl(t, [0, 2, 1, 3, 4].map(i => $('#wr' + i)), [tWr[0], tWr[2], tWr[1], tWr[3], tWr[4]], T1('W7') + 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X2', 'wrong') - 0.1, tRight: T0('X3') - 0.1 });
    fade(tq1, t, wt('X3', 'peroxides')); fade(tq2, t, wt('X3', 'minus'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'potassium') - 0.1, tCount, tAns });
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
