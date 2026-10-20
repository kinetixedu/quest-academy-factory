// PUC Chemistry Ep 33: Electron gain enthalpy (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, bars, recap): the symbol ΔegH gold, energy released (negative) green, energy supplied (positive) red, the moving electron orange, element in play teal
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tN = s => `\\textcolor{${NC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tE = s => `\\textcolor{${EC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`;
const dH = tG('\\Delta_{eg} H');

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9a10 10 0 0 0 14.2 14.2'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  glass: ['M5 2h14l-2 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z', 'M5.5 7h13'],
  salt: ['M8 2h8', 'M9 2v3a6 6 0 0 0-3 5v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10a6 6 0 0 0-3-5V2', 'M10 9h.01', 'M14 9h.01', 'M12 12h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tG1 = T0('G1'), tD1 = T0('D1'), tC1 = T0('C1'), tB2 = T0('B2'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['ball', 'Ball downhill', 'GIVES ENERGY AWAY', 'ball', 'WELCOMES', OK], ['droplet', 'Dry sponge', 'PULLS IN WATER', 'sponge', 'WELCOMES', OK], ['glass', 'Full glass', 'NO ROOM LEFT', 'full', 'REFUSES', RD]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Salt = sodium chloride, NaCl', 'Salt'], ['Each Cl grabbed one e⁻ from Na', 'grabbed']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('salt', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'Salt'), wt('H4', 'grabbed')];

/* ---------- P: definition ---------- */
$('#mdefI').innerHTML = M.icon('plus', 28, '#fff', 2.6);
const QR = [['One isolated gas atom', 'ALONE', 'P2', 'isolated'], ['It becomes a negative ion', 'X⁻', 'P2', 'negative'], ['Energy released: negative', 'ENERGY OUT', 'P4', 'released'], ['Energy supplied: positive', 'ENERGY IN', 'P4', 'supplied']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${i === 2 ? OK : i === 3 ? RD : NC}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#eqB').innerHTML = K(`\\mathrm{X(g)} + ${tE('e^-')} \\rightarrow \\mathrm{X^{-}(g)}`);
const ps = $('#pS'), ZY = 350;
mk(ps, 'line', { x1: 120, y1: ZY, x2: 664, y2: ZY, stroke: C.ink2, 'stroke-width': 3 }); txt(ps, 676, ZY + 6, '0', { 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const pDn = mk(ps, 'path', { d: `M260 ${ZY} V${ZY + 120}`, stroke: OK, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }), pDnH = mk(ps, 'path', { d: `M244 ${ZY + 112} L260 ${ZY + 138} L276 ${ZY + 112} Z`, fill: OK });
const pDnT = txt(ps, 300, ZY + 90, 'RELEASED: Δ < 0', { 'font-size': 22, fill: OK, 'font-weight': 600 });
const pUp = mk(ps, 'path', { d: `M260 ${ZY} V${ZY - 120}`, stroke: RD, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }), pUpH = mk(ps, 'path', { d: `M244 ${ZY - 112} L260 ${ZY - 138} L276 ${ZY - 112} Z`, fill: RD });
const pUpT = txt(ps, 300, ZY - 80, 'SUPPLIED: Δ > 0', { 'font-size': 22, fill: RD, 'font-weight': 600 });

/* ---------- S: the bench (Cl gains, then He refuses) ---------- */
const b = $('#bS'), AX = 392, AY = 262, RR = [56, 104, 156];
const rings = RR.map(r => mk(b, 'circle', { cx: AX, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const nuc = mk(b, 'circle', { cx: AX, cy: AY, r: 34, fill: NC });
const nucT = txt(b, AX, AY + 10, 'Cl', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: '#fff', 'text-anchor': 'middle' });
const slot = (k, j, n) => { const a = -Math.PI / 2 + j * 2 * Math.PI / n; return [AX + RR[k] * Math.cos(a), AY + RR[k] * Math.sin(a)]; };
const clE = [...[0, 1].map(j => slot(0, j, 2)), ...Array.from({ length: 8 }, (_, j) => slot(1, j, 8)), ...Array.from({ length: 7 }, (_, j) => slot(2, j, 8))].map(([x, y]) => mk(b, 'circle', { cx: x, cy: y, r: 9, fill: HC }));
const gap = slot(2, 7, 8), gapRing = mk(b, 'circle', { cx: gap[0], cy: gap[1], r: 13, fill: 'none', stroke: EC, 'stroke-width': 3, 'stroke-dasharray': '4 4' });
const heE = [0, 1].map(j => mk(b, 'circle', { cx: slot(0, j, 2)[0], cy: slot(0, j, 2)[1], r: 9, fill: HC }));
const inE = mk(b, 'circle', { r: 12, fill: EC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const eqs = { Cl: K(`\\mathrm{Cl(g)} + ${tE('e^-')} \\rightarrow \\mathrm{Cl^{-}(g)} \\quad ${dH} = ${tO('-349')}`), He: K(`\\mathrm{He(g)} + ${tE('e^-')} \\rightarrow \\mathrm{He^{-}(g)} \\quad ${dH} = ${tR('+48')}`) };
// energy card: two vertical bars around zero
const es = $('#eS'), EZ = 250, EK = 0.62;
mk(es, 'line', { x1: 80, y1: EZ, x2: 704, y2: EZ, stroke: C.ink2, 'stroke-width': 3 }); txt(es, 60, EZ + 7, '0', { 'font-size': 22, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'end' });
const eBar = ([x, s, v]) => { const g = mk(es, 'g', {}); const r = mk(g, 'rect', { x: x - 60, y: EZ, width: 120, height: 0, rx: 8, fill: v < 0 ? OK : RD }); const l = txt(g, x, v < 0 ? EZ - 18 : EZ + 40, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: HC }); const vt = txt(g, x, 0, '', { 'text-anchor': 'middle', 'font-size': 30, fill: v < 0 ? OK : RD, 'font-weight': 600 }); return { g, r, vt, v }; };
const ebCl = eBar([250, 'Cl', -349]), ebHe = eBar([540, 'He', 48]);
const eOut = txt(es, 250, 540, 'ENERGY OUT', { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 600 }), eIn = txt(es, 540, 120, 'ENERGY IN', { 'text-anchor': 'middle', 'font-size': 20, fill: RD, 'font-weight': 600 });

/* ---------- G: Table 3.7 chart ---------- */
const EG = [['F', -328, 'G1', 'Fluorine'], ['Cl', -349, 'G1', 'Chlorine'], ['Br', -325, 'G2', 'Bromine'], ['I', -295, 'G2', 'Iodine'], ['He', 48, 'G3', 'noble'], ['Ne', 116, 'G3', 'Neon'], ['Ar', 96, 'G3', 'Argon']];
const tEG = EG.map(e => wt(e[2], e[3]));
const gs = $('#gS'), GZ = 240, GK = 0.6;
mk(gs, 'line', { x1: 50, y1: GZ, x2: 740, y2: GZ, stroke: C.ink2, 'stroke-width': 2 });
const sep = mk(gs, 'line', { x1: 434, y1: 90, x2: 434, y2: 470, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
txt(gs, 70, 520, 'GROUP 17 · HALOGENS', { 'font-size': 17, fill: OK, 'font-weight': 600 }); const ngL = txt(gs, 470, 520, 'NOBLE GASES', { 'font-size': 17, fill: RD, 'font-weight': 600 });
const bars = EG.map(([s, v], i) => { const x = i < 4 ? 110 + i * 86 : 500 + (i - 4) * 86, g = mk(gs, 'g', {}); const r = mk(g, 'rect', { x: x - 28, y: GZ, width: 56, height: 0, rx: 6, fill: v < 0 ? OKT : RDT }); const l = txt(g, x, v < 0 ? GZ - 14 : GZ + 32, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: HC }); const vt = txt(g, x, 0, (v > 0 ? '+' : '') + v, { 'text-anchor': 'middle', 'font-size': 19, fill: v < 0 ? OK : RD, 'font-weight': 600 }); return { x, g, r, vt, v }; });
const gTag = document.createElement('div'); gTag.className = 'btag'; gTag.style.cssText = 'left:36px;top:70px;background:var(--ac2);color:var(--ac)'; $('#gIn').appendChild(gTag);
const MS = [['A halogen has 7 outer electrons', 'D2'], ['One more gives a full noble gas shell', 'D3'], [`Small atom: a strong ${K(tN('\\text{pull}'))} on the new ${K(tE('e^-'))}`, 'D4'], [`A lot of energy out: ${K(`${dH}`)} large and ${K(tO('\\text{negative}'))}`, 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${96 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25);
const mtP = document.createElement('div'); mtP.className = 'pillp'; mtP.style.cssText = 'left:36px;top:470px'; mtP.innerHTML = `Down the group: bigger atoms, <b style="color:${OK};margin-left:6px">less negative</b>`; $('#mt').appendChild(mtP);
// F versus Cl
const xs = $('#xS');
const mini = (cx, cy, rr, sym, n, v) => { const g = mk(xs, 'g', {}); rr.forEach(r => mk(g, 'circle', { cx, cy, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 })); mk(g, 'circle', { cx, cy, r: 20, fill: NC }); txt(g, cx, cy + 7, sym, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: '#fff', 'text-anchor': 'middle' });
  const R = rr[rr.length - 1]; for (let j = 0; j < 7; j++) { const a = -Math.PI / 2 + j * 2 * Math.PI / 8; mk(g, 'circle', { cx: cx + R * Math.cos(a), cy: cy + R * Math.sin(a), r: 8, fill: HC }); }
  txt(g, cx, cy + R + 52, v, { 'text-anchor': 'middle', 'font-size': 30, fill: OK, 'font-weight': 600 }); return { g, R, cx, cy }; };
const mF = mini(210, 250, [30, 62], 'F', 7, '-328'), mCl = mini(570, 250, [30, 72, 118], 'Cl', 7, '-349');
const xF = mk(xs, 'circle', { r: 11, fill: EC }), xCl = mk(xs, 'circle', { r: 11, fill: EC });
const push = mk(xs, 'g', {}); [-0.35, 0.35].forEach(d => { const a = -Math.PI / 2 + 7 * 2 * Math.PI / 8 + d * 2.4; const x = 210 + 62 * Math.cos(a), y = 250 + 62 * Math.sin(a); mk(push, 'line', { x1: x, y1: y, x2: x + (x - 210) * 0.35, y2: y + (y - 250) * 0.35, stroke: RD, 'stroke-width': 3, 'stroke-linecap': 'round' }); });
const xTagF = txt(xs, 210, 92, 'CROWDED n = 2', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 }), xTagC = txt(xs, 570, 92, 'ROOMY n = 3', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 });
const xP = document.createElement('div'); xP.className = 'pillp'; xP.style.cssText = 'left:36px;top:494px'; xP.innerHTML = `O ${K(tO('-141'))} and S ${K(tO('-200'))}: the same pattern`; $('#ex').appendChild(xP);
const th1 = PUC.think($('#th1'), { q: 'Which releases more energy when it gains an electron: fluorine or chlorine?', opts: ['Fluorine', 'Chlorine'], right: 1, why: 'Chlorine: -349 is more negative than -328 kJ/mol. Fluorine\'s small shell is crowded.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{Cl}\\; ${tO('-349')} \\;<\\; \\mathrm{F}\\; ${tO('-328')} \\qquad \\mathrm{He}\\; ${tR('+48')} \\quad (\\text{kJ mol}^{-1})`);

/* ---------- W: grams to moles to energy ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`M(\\mathrm{Cl}) = 35.5\\,\\text{g mol}^{-1}`)],
  [K(`n = \\dfrac{3.55}{35.5} = 0.1\\,\\text{mol}`)],
  [K(`0.1 \\times 349 = ${tO('34.9')}\\,\\text{kJ released}`)],
  [K(`\\Delta H = ${tO('-34.9')}\\,\\text{kJ}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const TL = [['3.55 g', 'gaseous Cl atoms'], ['0.1 mol', 'of Cl atoms'], ['34.9 kJ', 'released']], OPS = ['÷ 35.5 g/mol', '× 349 kJ/mol'];
$('#tls').innerHTML = TL.map(([v, s], i) => `<div class="tile" id="tl${i}" style="top:${84 + i * 150}px"><b style="color:${i === 2 ? OK : HC}">${v}</b><span>${s}</span></div>`).join('') + OPS.map((s, i) => `<div class="op" id="op${i}" style="top:${180 + i * 150}px">${M.icon('arrowD', 22, C.ac, 2.6)}${s}</div>`).join('') + `<div class="pillp good" id="wG" style="left:36px;top:510px">Released, so the sign is minus: -34.9 kJ</div>`;
const tTl = [wt('W2', 'three') , wt('W4', 'zero'), wt('W5', 'thirty')], tOp = [wt('W4', 'divided'), wt('W5', 'times')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('-328 > -349')}, so fluorine releases more`, right: `More negative = more released: Cl, ${K(tO('-349'))}` });
const tsv = $('#tS'), NX = v => 50 + (v + 360) * 7;
const nl = mk(tsv, 'g', {}); mk(nl, 'line', { x1: 40, y1: 150, x2: 520, y2: 150, stroke: C.ink2, 'stroke-width': 3 });
[[-349, 'Cl'], [-328, 'F'], [-295, 'I']].forEach(([v, s]) => { mk(nl, 'circle', { cx: NX(v), cy: 150, r: 11, fill: OK }); txt(nl, NX(v), 124, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: HC }); txt(nl, NX(v), 190, String(v), { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 600 }); });
const nlA = mk(tsv, 'path', { d: 'M420 226 H80', stroke: OK, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }), nlAH = mk(tsv, 'path', { d: 'M84 214 L62 226 L84 238 Z', fill: OK });
const nlT = txt(tsv, 440, 232, 'MORE OUT', { 'font-size': 18, fill: OK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Order electron gain enthalpies, with the F and Cl exception' });
const OPT = ['F > Cl > Br > I', 'Cl > F > Br > I', 'Cl > Br > F > I', 'I > Br > Cl > F'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Arrange F, Cl, Br and I by the energy released when each atom gains an electron (most first).', qW: 780,
  opts: OPT.map(s => K(`\\mathrm{${s}}`)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [['Down the group: less negative'], [K(`\\mathrm{Cl}\\;${tO('349')} > \\mathrm{F}\\;${tO('328')}`)], [K(`\\mathrm{F}\\;${tO('328')} > \\mathrm{Br}\\;${tO('325')}`)], [K(`\\mathrm{Cl > F > Br > I}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'C')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · electron gain enthalpy', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\mathrm{X(g)} + ${tE('e^-')} \\rightarrow \\mathrm{X^{-}(g)} \\qquad ${dH} < 0 \\text{ released},\\; > 0 \\text{ supplied}`), '<b>Halogens</b> most negative: F -328 · Cl -349 · Br -325 · I -295 kJ mol⁻¹', '<b>Noble gases</b> positive: He +48 · Ne +116 · Ar +96 (a new shell is needed)', '<b>F vs Cl</b>: small, crowded 2p shell repels · <b>O</b> -141 vs <b>S</b> -200', '<b>3.55 g Cl atoms</b> = 0.1 mol: 34.9 kJ released'] });
const YQ = ['What does a negative electron gain enthalpy tell you?', 'Why are the values for noble gases positive?', 'Why does chlorine release more energy than fluorine?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 34', topic: 'In a shared bond, who pulls harder? Electronegativity', y: 764 });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 70, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Helium says no, unless you pay!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tArr = wt('S2', 'arrives'), tHe = T0('S5'), tNew = wt('S6', 'new');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tArr - 0.4, 1.1, 640, 540], [T0('S3') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#mss .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(27 * 640 / q.offsetWidth) + 'px'; });
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
    const tB = [wt('H2', 'welcome'), wt('H2', 'welcome') + 0.25, wt('H2', 'refuse')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'Some', 1) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'release') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P3', 'electron') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'add') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#eqB'), t, wt('P2', 'electron') - 0.1, 0.8);
    const tr = wt('P4', 'released'), ts = wt('P4', 'supplied');
    M.draw(pDn, t, tr, 0.4); fade(pDnH, t, tr + 0.3); fade(pDnT, t, tr + 0.3); M.draw(pUp, t, ts, 0.4); fade(pUpH, t, ts + 0.3); fade(pUpT, t, ts + 0.3);
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tG1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('G1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('S3') + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); const ofs = sh >= 1 ? 0 : (wv - 784) / 2; b.style.transform = `translateX(${ofs.toFixed(1)}px)`; $('#bEq').style.transform = `translateX(${ofs.toFixed(1)}px)`; }
    M.vis($('#eb'), t, T0('S3') - 0.2, z, { dx: 60, dy: 0, ...o });
    const he = t >= tHe - 0.2;
    // rings: Cl uses 3; He uses ring 1, then ring 2 appears for the new electron
    rings.forEach((r, k) => { if (!he) M.draw(r, t, tS1 + 0.3 + k * 0.15, 0.5); else { M.drawU(r, k === 0 ? 1 : k === 1 ? M.io((t - tNew + 0.2) / 0.5) : 0); } attr(r, 'stroke', he && k === 1 ? RD : C.dim); attr(r, 'stroke-dasharray', he && k === 1 ? '8 8' : 'none'); });
    fade(nuc, t, tS1 + 0.2); fade(nucT, t, tS1 + 0.3); M.setT(nucT, he ? 'He' : t >= T0('S4') ? 'Cl⁻' : 'Cl');
    clE.forEach((d, i) => { fade(d, t, wt('S1', 'Two') + (i < 2 ? 0 : i < 10 ? 0.4 : 0.8) + i * 0.02, tHe - 0.25, 0.15); });
    fade(gapRing, t, wt('S2', 'empty') - 0.1, tArr + 0.6);
    heE.forEach(d => fade(d, t, tHe + 0.1, 1e9, 0.15));
    // incoming electron: into chlorine's gap, then into helium's new shell
    let ex, ey;
    if (!he) { const u = M.io((t - tArr) / 0.9); ex = M.lerp(740, gap[0], u); ey = M.lerp(40, gap[1], u); fade(inE, t, tArr - 0.15, tHe - 0.25, 0.15); }
    else { const u = M.io((t - tNew) / 1.0), [nx2, ny2] = slot(1, 1, 4); ex = M.lerp(740, nx2, u); ey = M.lerp(40, ny2, u); fade(inE, t, tNew - 0.15, 1e9, 0.15); }
    attr(inE, 'cx', ex.toFixed(1)); attr(inE, 'cy', ey.toFixed(1));
    const TAG = [[tS1 + 0.3, 'Cl · 2, 8, 7'], [wt('S2', 'empty'), 'ONE EMPTY PLACE'], [T0('S3'), 'ENERGY OUT'], [T0('S4'), 'Cl⁻ · 2, 8, 8'], [tHe, 'He · 2 · FULL'], [tNew, 'NEW SHELL NEEDED'], [T0('S7'), 'ENERGY IN']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    const be = $('#bEq'), k = he ? 'He' : 'Cl'; if (be._k !== k) { be._k = k; be.innerHTML = eqs[k]; }
    if (!he) PUC.write(be, t, wt('S4', 'Minus') - 0.1, 0.8); else PUC.write(be, t, wt('S7', 'Plus') - 0.1, 0.8);
    // energy bars
    [[ebCl, wt('S3', 'falls') - 0.2, wt('S4', 'Minus')], [ebHe, wt('S7', 'rises') - 0.2, wt('S7', 'Plus')]].forEach(([eb, t0, tv]) => { const u = M.io((t - t0) / 0.9), h = Math.abs(eb.v) * EK * u;
      attr(eb.r, 'height', h.toFixed(1)); attr(eb.r, 'y', (eb.v < 0 ? EZ : EZ - h).toFixed(1)); attr(eb.vt, 'y', (eb.v < 0 ? EZ + h + 36 : EZ - h - 14).toFixed(1)); M.setT(eb.vt, (eb.v > 0 ? '+' : '-') + Math.round(Math.abs(eb.v) * u)); eb.vt.style.opacity = M.clamp((t - tv + 0.6) / 0.3).toFixed(3);
      eb.g.style.opacity = M.clamp((t - t0 + 0.3) / 0.3).toFixed(3); M.hide(eb.g, t < t0 - 0.3); });
    fade(eOut, t, wt('S3', 'Energy')); fade(eIn, t, wt('S7', 'energy'));
    avD(t, wt('S7', 'Plus') + 0.8, z);
  }

  /* G + D + C */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('T1');
    M.vis($('#gc'), t, tG1 + 0.05, z, { dy: 36, ...o });
    const sh = M.spring(t - tD1, M.HEAVY), gw = M.lerp(1600, 784, sh), gl = M.lerp(160, 976, sh);
    snap($('#gc'), 'width', (sh >= 1 ? 784 : gw.toFixed(1)) + 'px'); snap($('#gc'), 'left', (sh >= 1 ? 976 : gl.toFixed(1)) + 'px'); snap($('#gIn'), 'left', (sh >= 1 ? 0 : ((gw - 784) / 2).toFixed(1)) + 'px');
    let cur = -1; tEG.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    const hl = t < tD1 ? [cur] : t >= tC1 ? [0, 1] : [];
    bars.forEach((bb, i) => { const u = M.io((t - tEG[i] + 0.05) / 0.5), h = Math.abs(bb.v) * GK * u; attr(bb.r, 'height', h.toFixed(1)); attr(bb.r, 'y', (bb.v < 0 ? GZ : GZ - h).toFixed(1)); attr(bb.vt, 'y', (bb.v < 0 ? GZ + h + 26 : GZ - h - 10).toFixed(1));
      attr(bb.r, 'fill', hl.includes(i) ? (bb.v < 0 ? OK : RD) : (bb.v < 0 ? OKT : RDT)); bb.g.style.opacity = M.clamp((t - tEG[i] + 0.2) / 0.2).toFixed(3); M.hide(bb.g, t < tEG[i] - 0.2); });
    fade(ngL, t, tEG[4] - 0.2); fade(sep, t, tEG[4] - 0.2);
    M.setT(gTag, t < T0('G3') ? 'HALOGENS: ENERGY OUT' : t < tD1 ? 'NOBLE GASES: ENERGY IN' : t < tC1 ? 'WHY SO NEGATIVE?' : 'F IS LESS NEGATIVE THAN Cl'); M.vis(gTag, t, tEG[0] + 0.3, 1e9, POP);
    M.vis($('#mt'), t, tD1 + 0.15, tC1 - 0.3, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6); });
    M.vis(mtP, t, T1('D5') - 0.4, 1e9, POP);
    M.vis($('#ex'), t, tC1 + 0.05, OUT('B2'), { dx: -60, dy: 0, ...o });
    fade(mF.g, t, tC1 + 0.3); fade(mCl.g, t, tC1 + 0.5);
    const tFi = wt('C2', 'new'), tCi = wt('C3', 'new');
    const uF = M.io((t - tFi) / 0.8), aF = -Math.PI / 2 + 7 * 2 * Math.PI / 8, wob = t > tFi + 0.8 ? Math.sin((t - tFi - 0.8) * 9) * 4 * (1 - M.clamp((t - tFi - 0.8) / 2)) : 0;
    attr(xF, 'cx', M.lerp(380, 210 + (62 + 8 + wob) * Math.cos(aF), uF).toFixed(1)); attr(xF, 'cy', M.lerp(70, 250 + (62 + 8 + wob) * Math.sin(aF), uF).toFixed(1)); fade(xF, t, tFi - 0.15, 1e9, 0.15);
    const uC = M.io((t - tCi) / 0.8); attr(xCl, 'cx', M.lerp(740, 570 + 118 * Math.cos(aF), uC).toFixed(1)); attr(xCl, 'cy', M.lerp(70, 250 + 118 * Math.sin(aF), uC).toFixed(1)); fade(xCl, t, tCi - 0.15, 1e9, 0.15);
    fade(push, t, wt('C2', 'pushed')); fade(xTagF, t, wt('C2', 'tiny')); fade(xTagC, t, wt('C3', 'roomier'));
    M.vis(xP, t, T1('C3') - 0.2, 1e9, POP);
    M.vis($('#th1'), t, tB2 + 0.05, z, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'fluorine') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Minus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'More') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'negative') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'enthalpy') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    TL.forEach((_, i) => { const el = $('#tl' + i); M.vis(el, t, tTl[i] - 0.1, 1e9, { dy: 16 }); const fl = M.io((t - tTl[i]) / 0.2) * (1 - M.io((t - tTl[i] - 0.7) / 0.4)); setBg(el, mix(C.soft, i === 2 ? C.okBg : C.ac2, i === 2 ? M.io((t - tTl[i]) / 0.3) : fl)); });
    OPS.forEach((_, i) => M.vis($('#op' + i), t, tOp[i] - 0.15, 1e9, POP));
    M.vis($('#wG'), t, wt('W6', 'minus') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'minus') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Chlorine') - 0.1 });
    fade(nl, t, wt('X2', 'minus')); M.draw(nlA, t, wt('X3', 'negative') - 0.1, 0.5); fade(nlAH, t, wt('X3', 'negative') + 0.3); fade(nlT, t, wt('X3', 'released'));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'order') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'energy') - 0.1, tCount, tAns });
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
