// PUC Chemistry Ep 21: Quantum mechanical model (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: nucleus (H) teal, electron and psi squared (where it is found) orange, wave function psi violet, energy E gold
const NC = C.ac, EC = '#C8461B', VC = '#7A4FE0', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const hash = n => { const s = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return s - Math.floor(s); };
const PSI = `\\textcolor{${VC}}{\\psi}`, PSI2 = `\\textcolor{${EC}}{\\psi^2}`, E_ = `\\textcolor{${GC}}{E}`;
const SCH = `\\hat{H}${PSI} = ${E_}${PSI}`;
// electron positions sampled from the hydrogen ground state: radial r^2 e^(-2r) (gamma 3), direction uniform on a sphere, seen from the front
const sample = (n, s = 0) => { const r = -(Math.log(1 - hash(n + s) * 0.999) + Math.log(1 - hash(n + s + 0.31) * 0.999) + Math.log(1 - hash(n + s + 0.57) * 0.999)) / 2; const c = 2 * hash(n + s + 0.71) - 1, ph = hash(n + s + 0.83) * Math.PI * 2, q = Math.sqrt(1 - c * c); return [r * q * Math.cos(ph), r * q * Math.sin(ph)]; };

Object.assign(M.IC, {
  fan: ['M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M10.8 9.2C8 7 5 4 7 2.5s5 2 5 5.5', 'M13.2 10.6C16 9.5 21 9 20.5 11.5S15 14 12 12', 'M11 12c-1 3-3 7-5 5.5S8.5 13 11 12'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1');
const tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['fan', 'Ceiling fan', 'A BLUR, NOT ONE BLADE'], ['cloud', 'Weather report', '70% CHANCE OF RAIN'], ['atom', 'Electron', 'ONLY CHANCES']];
$('#jobs').innerHTML = JOBS.slice(0, 2).map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'fan'), wt('H2', 'weather')];
const JV = [['WHERE IT IS LIKELY', C.soft, C.ink], ['A CHANCE', C.soft, C.ink], ['A PROBABILITY CLOUD', '#FBEDE6', EC]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" id="jv${i}" style="background:${JV[i][1]};color:${JV[i][2]}">${JV[i][0]}</div></div>`).join('');
const KIT = [['fan', 'Fan above', 'fan'], ['help', 'Where is one blade?', 'Where']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P ---------- */
const QR = [['Electrons are waves', 'DE BROGLIE · 1924', 'P2', 'waves'], ['No exact path', 'HEISENBERG · 1927', 'P2', 'path'], ['Bohr\'s circles had to go', 'OUT', 'P3', 'circles'], ['Quantum mechanics', 'THE NEW THEORY', 'P4', 'quantum']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${92 + i * 112}px;height:92px"><div class="nn" style="top:22px">${i + 1}</div><div class="qt" style="top:24px">${q}</div><div class="qk" style="top:30px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const pS = $('#pS'), OX = 392, OY = 260;
[80, 140, 190].forEach(r => mk(pS, 'circle', { cx: OX, cy: OY, r, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }));
mk(pS, 'circle', { cx: OX, cy: OY, r: 16, fill: NC });
const pE = mk(pS, 'circle', { r: 12, fill: EC });
const pX = mk(pS, 'path', { d: `M${OX - 200},${OY - 200} L${OX + 200},${OY + 200} M${OX + 200},${OY - 200} L${OX - 200},${OY + 200}`, stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });

/* ---------- U: Schrodinger ---------- */
$('#uEq').innerHTML = K(SCH);
const UL = [['Ĥ', 'an operator: the total energy recipe', C.ink, 'H'], ['ψ', 'the wave function', VC, 'psi'], ['E', 'total energy of the electron', GC, 'E']];
$('#uls').innerHTML = UL.map(([s, w, c], i) => `<div class="ul" id="ul${i}" style="left:${820}px;top:${120 + i * 92}px"><b style="color:${c}">${s}</b>${w}</div>`).join('');
const uP = document.createElement('div'); uP.className = 'pillp ac'; uP.style.cssText = 'left:64px;top:470px'; uP.textContent = 'Solve it, and the electron\'s allowed states come out'; $('#uc').appendChild(uP);

/* ---------- S: bench ---------- */
const b = $('#bS'), BX = 392, BY = 300, SC = 62;
const dots = Array.from({ length: 900 }, (_, n) => { const [x, y] = sample(n); return mk(b, 'circle', { cx: (BX + x * SC).toFixed(1), cy: (BY + y * SC).toFixed(1), r: 3, fill: EC, opacity: 0.55 }); });
const newDot = mk(b, 'circle', { r: 9, fill: 'none', stroke: EC, 'stroke-width': 3 });
const nuc = mk(b, 'circle', { cx: BX, cy: BY, r: 16, fill: NC }); const nucL = txt(b, BX, BY + 6, 'p⁺', { 'text-anchor': 'middle', 'font-size': 16, fill: '#fff', 'font-weight': 700 });
const qE = mk(b, 'text', { x: BX + 140, y: BY - 120, 'font-family': 'Poppins', 'font-size': 64, 'font-weight': 700, fill: EC, 'text-anchor': 'middle' }); qE.textContent = '?';
const orbL = txt(b, BX, 540, 'ORBITAL · HYDROGEN, LOWEST ENERGY', { 'text-anchor': 'middle', 'font-size': 18, fill: EC, 'font-weight': 700 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const G1 = PUC.graph($('#g1S'), { x: 110, y: 74, w: 600, h: 140, xmax: 4, ymin: 0, ymax: 1, xt: [1, 2, 3, 4], yt: [], xl: 'r (Bohr radii, 52.9 pm)', yl: 'ψ' });
const G2 = PUC.graph($('#g2S'), { x: 110, y: 74, w: 600, h: 140, xmax: 4, ymin: 0, ymax: 1, xt: [1, 2, 3, 4], yt: [], xl: 'r (Bohr radii)', yl: 'ψ²' });
const c1 = G1.curve(VC, 5), c2 = G2.curve(EC, 5); const d1 = G1.dot(VC, 9), d2 = G2.dot(EC, 9);
const g1N = txt($('#g1S'), 410, 110, 'NO PHYSICAL MEANING BY ITSELF', { 'font-size': 16, fill: VC, 'font-weight': 600 });
const g2N = txt($('#g2S'), 410, 110, 'HIGH NEAR THE NUCLEUS', { 'font-size': 16, fill: EC, 'font-weight': 600 });
const tPsi = wt('S2', 'psi') - 0.1, tPsi2 = wt('S3', 'squared') - 0.1, tLook = wt('S4', 'again') - 0.2, tCrowd = wt('S5', 'crowd'), tOrb = wt('S6', 'orbital');
// compare
$('#cmps').innerHTML = [['Orbit · Bohr', 'A FLAT, FIXED CIRCLE', C.ink], ['Orbital · quantum model', 'A 3D REGION OF PROBABILITY', EC]].map(([n, w, c], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ct">${n}</div><div class="cw2" style="color:${c}">${w}</div><svg id="cmS${i}" width="736" height="460" style="position:absolute;left:0;top:0"></svg></div>`).join('');
const cm0 = $('#cmS0'), cm1 = $('#cmS1');
mk(cm0, 'circle', { cx: 368, cy: 250, r: 130, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); mk(cm0, 'circle', { cx: 368, cy: 250, r: 14, fill: NC }); const cmE = mk(cm0, 'circle', { r: 13, fill: EC });
txt(cm0, 368, 430, 'EXACT POSITION EVERY MOMENT', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
Array.from({ length: 420 }, (_, n) => { const [x, y] = sample(n, 50); mk(cm1, 'circle', { cx: (368 + x * 52).toFixed(1), cy: (250 + y * 52).toFixed(1), r: 2.6, fill: EC, opacity: 0.55 }); }); mk(cm1, 'circle', { cx: 368, cy: 250, r: 14, fill: NC });
txt(cm1, 368, 430, 'ONLY WHERE IT IS LIKELY TO BE', { 'text-anchor': 'middle', 'font-size': 18, fill: EC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: 'Can we draw the exact path of an electron inside an orbital?', opts: ['Yes', 'No'], right: 1, why: 'An orbital gives only probability. The uncertainty principle forbids an exact path.' });

/* ---------- D ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${E_}\\ \\text{is quantised}`), 'only certain values'],
  [K(`\\text{wave nature} \\Rightarrow \\text{allowed } ${E_}`), 'solutions of the equation'],
  [K(`${PSI} = \\text{atomic orbital}`), 'one wave function each'],
  [K(`\\text{probability} \\propto ${PSI2}`), 'probability density'],
  [K(`\\text{one orbital} \\leq 2\\ \\mathrm{e^-}`), 'never more than two']], { label: 'THE MODEL · LINK BY LINK', y0: 104, dy: 92 });
const tDs = [wt('D2', 'energy'), wt('D3', 'These'), wt('D4', 'Each'), wt('D5', 'probability'), wt('D6', 'orbital')];
const dS = $('#dS');
const LV = [1, 2, 3, 4, 5].map(n => { const y = 110 + 250 * (1 - 1 / (n * n)) * 0 + (n === 1 ? 330 : 330 - 250 * (1 - 1 / (n * n))); const g = mk(dS, 'g', {}); mk(g, 'line', { x1: 60, y1: y, x2: 330, y2: y, stroke: GC, 'stroke-width': 4, 'stroke-linecap': 'round' }); txt(g, 346, y + 6, `n = ${n}`, { 'font-size': 16, fill: GC, 'font-weight': 600 }); return g; });
const lvL = txt(dS, 60, 370, 'n = 1 : E = -2.18 × 10⁻¹⁸ J', { 'font-size': 17, fill: GC, 'font-weight': 600 });
const lvT = txt(dS, 60, 70, 'ALLOWED ENERGIES ONLY', { 'font-size': 16, fill: GC, 'font-weight': 600 });
const dCl = mk(dS, 'g', {}); Array.from({ length: 260 }, (_, n) => { const [x, y] = sample(n, 90); mk(dCl, 'circle', { cx: (590 + x * 34).toFixed(1), cy: (210 + y * 34).toFixed(1), r: 2.2, fill: EC, opacity: 0.6 }); }); mk(dCl, 'circle', { cx: 590, cy: 210, r: 9, fill: NC });
const dClL = txt(dS, 590, 330, 'ψ → ORBITAL · ψ² → DOTS', { 'text-anchor': 'middle', 'font-size': 16, fill: VC, 'font-weight': 600 });
const dBox = mk(dS, 'g', {}); mk(dBox, 'rect', { x: 500, y: 400, width: 180, height: 110, rx: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
const dUp = PUC.arrow(dBox, EC, 6, 18), dDn = PUC.arrow(dBox, EC, 6, 18); dUp.set(565, 490, 565, 420); dDn.set(615, 420, 615, 490);
txt(dBox, 590, 540, 'ONE ORBITAL: MAX 2', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${PSI2} \\;\\rightarrow\\; \\text{probability density}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${PSI}_A^2 = (0.6)^2 = ${'\\textcolor{' + EC + '}{0.36}'}`)],
  [K(`${PSI}_B^2 = (-0.8)^2 = ${'\\textcolor{' + EC + '}{0.64}'}`)],
  [K(`${PSI}_C^2 = (0.2)^2 = ${'\\textcolor{' + EC + '}{0.04}'}`)],
  [K(`\\text{largest } ${PSI2}: \\text{point B}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W4', 'A'), wt('W5', 'B'), wt('W6', 'C'), wt('W7', 'point')];
const s2 = $('#wS2'), WY0 = 290;
mk(s2, 'line', { x1: 60, y1: WY0, x2: 724, y2: WY0, stroke: C.ink, 'stroke-width': 2.5 });
txt(s2, 60, 110, 'ψ', { 'font-size': 26, fill: VC, 'font-weight': 700, 'font-family': 'Poppins' }); txt(s2, 400, 110, 'ψ²', { 'font-size': 26, fill: EC, 'font-weight': 700, 'font-family': 'Poppins' });
const WV = [0.6, -0.8, 0.2];
const wB = WV.map((v, i) => { const g = mk(s2, 'g', {}); const bp = mk(g, 'rect', { x: 80 + i * 90, width: 60, rx: 6, fill: VC }); const bq = mk(g, 'rect', { x: 420 + i * 90, width: 60, rx: 6, fill: EC });
  const lp = txt(g, 110 + i * 90, 0, (v > 0 ? '+' : '') + v.toFixed(1), { 'text-anchor': 'middle', 'font-size': 18, fill: VC, 'font-weight': 600 }); const lq = txt(g, 450 + i * 90, 0, (v * v).toFixed(2), { 'text-anchor': 'middle', 'font-size': 18, fill: EC, 'font-weight': 600 });
  txt(g, 110 + i * 90, WY0 + 170, 'ABC'[i], { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 700 }); txt(g, 450 + i * 90, WY0 + 170, 'ABC'[i], { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 700 }); return { bp, bq, lp, lq, v }; });

/* ---------- C ---------- */
$('#cws').innerHTML = [['Ignored the wave nature', 'WAVE'], ['Gave an exact path', 'PATH']].map(([n, k], i) => `<div class="qr" id="cwr${i}" style="top:${96 + i * 112}px;height:92px"><div class="nn" style="top:22px;border-color:var(--red);color:var(--red)">${M.icon('x', 22, C.red, 3)}</div><div class="qt" style="top:24px">${n}</div><div class="qk" style="top:30px;color:var(--red)">${k}</div></div>`).join('');
$('#cps').innerHTML = [['Keeps quantised energy', 'KEPT'], ['Probability, not paths', 'NEW'], ['The atom chemists use today', 'TODAY']].map(([n, k], i) => `<div class="qr" id="cpr${i}" style="top:${96 + i * 112}px;height:92px"><div class="nn" style="top:22px;border-color:var(--ok);color:var(--ok)">${M.icon('check', 22, C.ok, 3)}</div><div class="qt" style="top:24px">${n}</div><div class="qk" style="top:30px;color:var(--ok)">${k}</div></div>`).join('');
const tCw = [wt('C2', 'wave'), wt('C2', 'exact')], tCp = [wt('C3', 'keeps'), wt('C3', 'replaces'), wt('C3', 'atom')];
const avA = PUC.avatar($('#sC'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like my fan: a blur of chances!' });

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(PSI)} gives the probability of finding the electron`, right: `${K(PSI2)} gives the probability density; ${K(PSI)} alone has no meaning` });
const tsv = $('#tS');
const tg = mk(tsv, 'g', {}); mk(tg, 'line', { x1: 40, y1: 130, x2: 380, y2: 130, stroke: C.ink, 'stroke-width': 2 });
mk(tg, 'rect', { x: 90, y: 130, width: 70, height: 88, rx: 6, fill: VC }); txt(tg, 125, 250, 'ψ = -0.8', { 'text-anchor': 'middle', 'font-size': 16, fill: VC, 'font-weight': 600 });
mk(tg, 'rect', { x: 250, y: 60, width: 70, height: 70, rx: 6, fill: EC }); txt(tg, 285, 48, 'ψ² = 0.64', { 'text-anchor': 'middle', 'font-size': 16, fill: EC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: `Statement questions on ${K(PSI)}, ${K(PSI2)}, orbit vs orbital, and the features of the model` });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which statement about the quantum mechanical model is correct?', qW: 760,
  opts: [`${K(PSI)} gives the probability of finding the electron`, `${K(PSI2)} is the probability density and is never negative`, 'An orbital can hold up to three electrons', 'An orbital is a fixed circular path'], right: 1, cols: 1, optW: 968, optY: 190, optH: 84, optFs: 28 });
const so = PUC.solution($('#so'), [[`<b style="color:var(--ok)">B</b> ${K(`${PSI2} \\geq 0`)}`], [`<b style="color:var(--red)">A</b> ${K(PSI)}: no meaning`], ['<b style="color:var(--red)">C</b> at most 2'], ['<b style="color:var(--red)">D</b> a region, not a path']], { y0: 100, dy: 112 });
const tSo = [wt('A1', 'Psi'), T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · quantum mechanical model', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${SCH} \\qquad \\text{Schrödinger, 1926}`), '<b>ψ</b>: wave function = atomic orbital · no physical meaning alone', '<b>ψ²</b>: probability density, never negative', '<b>Orbit</b>: Bohr\'s fixed path · <b>orbital</b>: 3D region of probability', '<b>Energy is quantised</b> · one orbital holds at most 2 electrons'] });
const YQ = ['What is the difference between an orbit and an orbital?', 'Which gives the probability of finding an electron, ψ or ψ²?', 'How many electrons can one orbital hold?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 22', topic: 'How does an atom label its orbitals? Orbitals and Quantum Numbers', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tCrowd - 0.2, 1.12, 552, 570], [T0('S6'), 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const w4 = $('#wa .wat'); if (w4 && w4.offsetWidth > 1528) w4.style.fontSize = Math.floor(28 * 1528 / w4.offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  [0, 1].forEach(i => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, i < 2 ? tMorph + 0.3 + i * 0.12 : wt('H4', 'electron') - 0.1, 1e9, { dy: 16 }));
    [0, 1].forEach(i => M.vis($('#jv' + i), t, wt('H2', 'percent') - 0.1 + i * 0.15, 1e9, POP)); M.vis($('#jv2'), t, wt('H4', 'chances') - 0.1, 1e9, POP);
    M.vis($('#hjP'), t, wt('H4', 'only') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'cloud') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); setBg(el, mix(C.soft, i === 2 ? C.redBg : C.ac2, M.io((t - tQr[i]) / 0.25) * (i === 3 ? 1 : 0.6))); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const a = (t - tP1) * 2; attr(pE, 'cx', (OX + 140 * Math.cos(a)).toFixed(1)); attr(pE, 'cy', (OY + 140 * Math.sin(a)).toFixed(1));
    M.draw(pX, t, wt('P3', 'go') - 0.1, 0.5);
    M.vis($('#pP'), t, wt('P4', 'quantum') - 0.1, 1e9, POP);
  }

  /* U */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#uc'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    PUC.write($('#uEq'), t, wt('U1', 'H') - 0.1, 0.9);
    [wt('U1', 'H'), wt('U1', 'psi', 1), wt('U1', 'total')].forEach((tt, i) => M.vis($('#ul' + i), t, tt + 0.3 + (i === 0 ? 0.6 : 0), 1e9, { dx: -16, dy: 0 }));
    M.vis(uP, t, T1('U1') - 0.2, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tSplit = tPsi - 0.2;
    { const sh = M.spring(t - tSplit, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#g1'), t, tSplit + 0.1, z, { dx: 60, dy: 0, ...o }); M.vis($('#g2'), t, tPsi2 - 0.1, z, { dy: 36, ...o });
    fade(nuc, t, tS1 + 0.3); fade(nucL, t, tS1 + 0.3); fade(qE, t, wt('S1', 'electron') - 0.1, tLook);
    const u1 = M.clamp((t - tPsi) / 1.2), u2 = M.clamp((t - tPsi2) / 1.2);
    c1(r => [r, Math.exp(-r)], 0, 4 * u1); c2(r => [r, Math.exp(-2 * r)], 0, 4 * u2);
    fade(g1N, t, wt('S2', 'meaning') - 0.1); fade(g2N, t, wt('S3', 'probability') - 0.1);
    // dots: slow at first (one at a time), then a flood
    const tA = tLook, n = t < tA ? 0 : t < tCrowd ? Math.floor((t - tA) * 4) : Math.min(dots.length, Math.floor((tCrowd - tA) * 4 + Math.pow((t - tCrowd) * 14, 1.6)));
    dots.forEach((d, i) => M.hide(d, i >= n));
    const last = dots[Math.max(0, n - 1)]; const fl = t < tCrowd && n > 0; if (fl) { attr(newDot, 'cx', last.getAttribute('cx')); attr(newDot, 'cy', last.getAttribute('cy')); } M.hide(newDot, !fl);
    // link the last dot to the graphs: its distance as a dot on psi and psi^2
    if (n > 0) { const rx = (+last.getAttribute('cx') - BX) / SC, ry = (+last.getAttribute('cy') - BY) / SC, rr = Math.min(4, Math.hypot(rx, ry)); d1(rr, Math.exp(-rr), u1 >= 1 && t < tOrb); d2(rr, Math.exp(-2 * rr), u2 >= 1 && t < tOrb); } else { d1(0, 0, false); d2(0, 0, false); }
    fade(orbL, t, tOrb - 0.1);
    const TAG = [[tS1 + 0.4, 'H · ONE PROTON, ONE ELECTRON'], [tPsi, 'SOLVE: GET ψ'], [tPsi2, 'ψ² = PROBABILITY'], [tLook, `FOUND HERE · ${n}`], [tOrb, 'AN ORBITAL']];
    let tg0 = null; for (const [tt, s0] of TAG) if (t >= tt) tg0 = s0; if (t >= tLook && t < tOrb) tg0 = `DOTS · ${n}`; if (tg0) M.setT(btag, tg0); M.vis(btag, t, tS1 + 0.3, 1e9, POP);
    // compare
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B4'), { dy: 36, ...o });
    M.vis($('#cm0'), t, T0('B2') - 0.1, 1e9, { dy: 16 }); M.vis($('#cm1'), t, T0('B3') - 0.1, 1e9, { dy: 16 });
    const a = (t - tB1) * 1.8; attr(cmE, 'cx', (368 + 130 * Math.cos(a)).toFixed(1)); attr(cmE, 'cy', (250 + 130 * Math.sin(a)).toFixed(1));
    M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB4, tOpts: wt('B4', 'Can') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'An') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dR'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    LV.forEach((g, i) => fade(g, t, tDs[0] + 0.2 + i * 0.15)); fade(lvL, t, tDs[0] + 1.0); fade(lvT, t, tDs[0] + 0.1);
    fade(dCl, t, tDs[2] + 0.1); fade(dClL, t, tDs[3]); fade(dBox, t, tDs[4] + 0.1);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'An') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'An', 1) - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'cloud') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wEx'), t, T0('W2') + 0.5, 1e9, POP);
    const tP = [wt('W2', 'Point', 0), wt('W2', 'Point', 1), wt('W2', 'Point', 2)];
    wB.forEach((w, i) => { const up = M.io((t - tP[i]) / 0.4), uq = M.io((t - tWs[i]) / 0.5), hp = Math.abs(w.v) * 160 * up, hq = w.v * w.v * 160 * uq;
      attr(w.bp, 'y', (w.v > 0 ? WY0 - hp : WY0).toFixed(1)); attr(w.bp, 'height', hp.toFixed(1)); M.hide(w.bp, up <= 0);
      attr(w.lp, 'y', (w.v > 0 ? WY0 - hp - 12 : WY0 + hp + 26).toFixed(1)); w.lp.style.opacity = up;
      attr(w.bq, 'y', (WY0 - hq).toFixed(1)); attr(w.bq, 'height', hq.toFixed(1)); M.hide(w.bq, uq <= 0); attr(w.lq, 'y', (WY0 - hq - 12).toFixed(1)); w.lq.style.opacity = uq;
      attr(w.bq, 'fill', i === 1 && t >= tWs[3] ? C.ok : EC); });
    M.vis($('#wGp'), t, wt('W7', 'B') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cw'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    tCw.forEach((tt, i) => M.vis($('#cwr' + i), t, tt - 0.15, 1e9, { dy: 14 }));
    M.vis($('#cp'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    tCp.forEach((tt, i) => M.vis($('#cpr' + i), t, tt - 0.15, 1e9, { dy: 14 }));
    avA(t, tCw[1] + 1.2, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'psi') - 0.1, tStrike: T0('X3') + 0.1, tRight: wt('X3', 'squared') - 0.4 });
    fade(tg, t, wt('X3', 'negative') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') + 0.6, tCount, tAns });
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
