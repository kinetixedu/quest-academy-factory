// PUC Chemistry Ep 34: Electronegativity (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, bars, recap): the element in play / stronger puller teal, the partner / weaker puller ink,
// the shared pair (electrons) orange, electronegativity values gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F';
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
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  comb: ['M3 6h18v4H3z', 'M5 10v8', 'M8 10v8', 'M11 10v8', 'M14 10v8', 'M17 10v8', 'M20 10v8'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP5 = T0('P5'), tU = T0('U1'), tS1 = T0('S1');
const tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three puzzles ---------- */
const JOBS = [['droplet', 'Bent stream', 'A CHARGED COMB', 'comb', 'O', 'O PULLS HARDER'], ['box', 'Salt', 'BREAKS INTO IONS', 'Salt', 'Cl', 'Cl TAKES THE PAIR'], ['layers', 'Oil and water', 'REFUSE TO MIX', 'Oil', 'C', 'EVEN SHARING IN OIL']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, ew], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ew}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['droplet', 'Water stream', 'stream'], ['comb', 'Charged comb', 'comb'], ['scale', 'Oxygen pulls harder', 'harder']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'stream'), wt('H3', 'comb'), wt('H4', 'harder')];

/* ---------- P: definition + HCl ---------- */
const QR = [['Two atoms share a pair of electrons', 'P2', 'share'], ['Each atom pulls on that pair', 'P2', 'Each'], ['Stronger pull = higher electronegativity', 'P3', 'strongly'], ['Not measured directly: compared on a scale', 'P4', 'measure']];
$('#qrs').innerHTML = QR.map(([q], i) => `<div class="qr" id="qr${i}" style="top:${206 + i * 86}px;height:76px;right:36px;width:auto"><div class="nn">${i + 1}</div><div class="qt">${q}</div></div>`).join('');
const tQr = QR.map(q => wt(q[1], q[2]));
const ps = $('#pS'), HX = 230, CX = 560, AY = 250;
const hStk = mk(ps, 'line', { x1: HX + 34, y1: AY, x2: CX - 50, y2: AY, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const hAt = atomG(ps, 34, HC, 'H', 28); attr(hAt, 'transform', `translate(${HX} ${AY})`);
const cAt = atomG(ps, 50, NC, 'Cl', 34); attr(cAt, 'transform', `translate(${CX} ${AY})`);
const lone = [[-90, 0], [0, -1], [0, 1]].map(() => [0, 1].map(() => mk(ps, 'circle', { r: 7, fill: HC })));
const LP = [[[CX - 9, AY - 70], [CX + 9, AY - 70]], [[CX - 9, AY + 70], [CX + 9, AY + 70]], [[CX + 70, AY - 9], [CX + 70, AY + 9]]];
lone.forEach((pr, i) => pr.forEach((d, k) => { attr(d, 'cx', LP[i][k][0]); attr(d, 'cy', LP[i][k][1]); }));
const pair = [0, 1].map(() => mk(ps, 'circle', { r: 9, fill: EC }));
const pullH = PUC.arrow(ps, HC, 3, 12), pullC = PUC.arrow(ps, NC, 7, 20);
const dP = txt(ps, HX, AY - 64, 'δ+', { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: HC, 'text-anchor': 'middle' });
const dM = txt(ps, CX, AY - 98, 'δ−', { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: NC, 'text-anchor': 'middle' });
const hLab = txt(ps, HX, AY + 104, 'WEAKER PULL', { 'text-anchor': 'middle', fill: HC, 'font-weight': 600 });
const cLab = txt(ps, CX, AY + 120, 'STRONGER PULL', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600 });
const pTag = document.createElement('div'); pTag.className = 'btag'; pTag.style.cssText = 'right:36px;top:18px;background:#FBEDE6;color:#C8461B'; pTag.textContent = 'SHARED PAIR'; $('#pw').appendChild(pTag);
$('#hclF').innerHTML = K(`\\overset{\\delta+}{${H_('H')}}{-}\\overset{\\delta-}{${N_('Cl')}}`);
{ const card = $('#pq'), d = document.createElement('div'); d.id = 'pqIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;right:0;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
$('#mdef').style.width = 'auto'; $('#mdef').style.right = '36px';

/* ---------- U: Pauling ---------- */
$('#scls').innerHTML = [['Pauling', 'MOST USED'], ['Mulliken-Jaffe', 'ANOTHER SCALE'], ['Allred-Rochow', 'ANOTHER SCALE']].map(([a, b], i) => `<div class="scl" id="sc${i}">${a}<em>${b}</em></div>`).join('');

/* ---------- S: the bench ---------- */
// NCERT Pauling values; atomic radii (pm, NCERT) only set the drawn size, scale 0.98 px per pm
const PER = [['Li', 3, 1, 152, 1.0], ['Be', 4, 2, 111, 1.5], ['B', 5, 3, 88, 2.0], ['C', 6, 4, 77, 2.5], ['N', 7, 5, 74, 3.0], ['O', 8, 6, 66, 3.5], ['F', 9, 7, 64, 4.0]];
const GRP = [['F', 9, 7, 64, 4.0, 2], ['Cl', 17, 7, 99, 3.0, 3], ['Br', 35, 7, 114, 2.8, 4], ['I', 53, 7, 133, 2.5, 5], ['At', 85, 7, 0, 2.2, 6]];
const tEl = [tS1 + 0.1, wt('S3', 'Move'), wt('S4', 'Boron'), wt('S4', 'Carbon'), wt('S5', 'Nitrogen'), wt('S5', 'Oxygen'), wt('S5', 'fluorine')];
const tGr = [T0('S6'), wt('S6', 'chlorine'), wt('S6', 'bromine'), wt('S6', 'iodine'), wt('S7', 'weaker')];
const SEQ = [...PER.map((e, i) => [tEl[i], { s: e[0], p: e[1], v: e[2], R: e[3] * 0.98, x: e[4], sh: 2 }]), ...GRP.slice(1, 4).map((e, i) => [tGr[i + 1], { s: e[0], p: e[1], v: e[2], R: e[3] * 0.98, x: e[4], sh: e[5] }])];
const cur = t => { let k = 0; SEQ.forEach(([tt], i) => { if (t >= tt - 0.15) k = i; }); return k; };
const fR = M.keys(SEQ.map(([tt, s]) => [tt, s.R]), 0.6), fSh = M.keys(SEQ.map(([tt, s]) => [tt, s.sh]), 0.5), fX = M.keys(SEQ.map(([tt, s]) => [tt, s.x]), 0.5);
const b = $('#bS'), BX = 392, BY = 296;
const rings = [0, 1, 2, 3, 4].map(() => mk(b, 'circle', { cx: BX, cy: BY, r: 50, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const dist = mk(b, 'line', { x1: BX, y1: BY, x2: BX + 100, y2: BY, stroke: C.mute, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const nuc = mk(b, 'circle', { cx: BX, cy: BY, r: 32, fill: NC });
const nucT = txt(b, BX, BY + 11, 'Li', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: '#fff', 'text-anchor': 'middle' });
const vEl = Array.from({ length: 7 }, () => mk(b, 'circle', { r: 7, fill: HC }));
const bPair = [0, 1].map(() => mk(b, 'circle', { r: 9, fill: EC }));
const bPull = PUC.arrow(b, NC, 5, 16);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#ptS').innerHTML = PER.map(e => `<span id="pt${e[0]}">${e[0]}<i>${e[4].toFixed(1)}</i></span>`).join('');
$('#ptG').innerHTML = GRP.map(e => `<span id="pg${e[0]}">${e[0]}<i>${e[4].toFixed(1)}</i></span>`).join('');
const barsIn = (host, list, sc, gap) => { host.innerHTML = list.map((e, i) => `<div class="bar" id="${host.id}${i}" style="left:${i * gap + (gap - 64) / 2}px"><i></i><b></b><span>${e[0]}</span></div>`).join(''); return list.map((e, i) => { const d = $('#' + host.id + i); d.querySelector('b').textContent = e[4].toFixed(1); return { d, h: e[4] * sc }; }); };
const BP = barsIn($('#brP'), PER, 30, 712 / 7), BG = barsIn($('#brG'), GRP, 30, 712 / 5);
$('#rxA').innerHTML = M.icon('arrowR', 18, C.mute, 2.4); $('#ctA').innerHTML = M.icon('arrowD', 18, C.mute, 2.4);
const tBarG = [tGr[0] + 0.1, tGr[1], tGr[2], tGr[3], tGr[4]];
const avD = PUC.avatar($('#bn'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So fluorine wins every tug of war!' });
const th1 = PUC.think($('#th1'), { q: `Which bond has the bigger tug of war?`, opts: ['Na-Cl', 'C-Cl'], right: 0,
  why: `Na-Cl: ${K(`${G_('3.0')} - ${G_('0.9')} = ${G_('2.1')}`)} &nbsp;·&nbsp; C-Cl: ${K(`${G_('3.0')} - ${G_('2.5')} = ${G_('0.5')}`)}` });

/* ---------- D: link by link ---------- */
const LK = [['More protons, same outer shell', 'D2', 'protons'], ['So the atom shrinks: Li 152 pm, F 64 pm', 'D3', 'shrinks'], ['The shared pair sits closer to the nucleus', 'D4', 'closer'], ['Stronger attraction = higher electronegativity', 'D5', 'Stronger'], ['Strong pull: non-metal · weak pull: metal', 'D6', 'Strong']];
$('#lks').innerHTML = LK.map(([s], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 94}px"><div class="lt">LINK ${i + 1}</div><div class="lx">${s}</div></div>`).join('');
const tLk = LK.map(l => wt(l[1], l[2]));
const ds = $('#dS');
const SIDE = [{ s: 'Li', x: 214, R: 149, v: 1, p: '3 PROTONS', r: '152 pm', ch: 'METAL', col: HC }, { s: 'F', x: 594, R: 63, v: 7, p: '9 PROTONS', r: '64 pm', ch: 'NON-METAL', col: NC }];
const DY = 262;
const SD = SIDE.map(o => {
  const g = {};
  g.r = [46, o.R].map(r => mk(ds, 'circle', { cx: o.x, cy: DY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
  g.rad = mk(ds, 'line', { x1: o.x, y1: DY, x2: o.x, y2: DY + o.R, stroke: GC, 'stroke-width': 3 });
  g.n = atomG(ds, 30, NC, o.s, 28); attr(g.n, 'transform', `translate(${o.x} ${DY})`);
  g.v = Array.from({ length: o.v }, (_, k) => { const a = Math.PI + (k - (o.v - 1) / 2) * 0.42; return mk(ds, 'circle', { cx: o.x + o.R * Math.cos(a), cy: DY + o.R * Math.sin(a), r: 7, fill: HC }); });
  g.pr = [0, 1].map(k => mk(ds, 'circle', { cx: o.x + o.R + 2, cy: DY - 9 + k * 18, r: 8, fill: EC }));
  g.ar = PUC.arrow(ds, NC, o.s === 'F' ? 8 : 3, o.s === 'F' ? 20 : 12);
  g.pt = txt(ds, o.x, 450, o.p, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
  g.rt = txt(ds, o.x, 484, `${o.s} · RADIUS ${o.r}`, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 20 });
  g.ch = document.createElement('div'); g.ch.className = 'pillp ' + (o.s === 'F' ? 'ac' : 'ink'); g.ch.style.cssText = `top:510px;left:${o.x - 80}px;width:160px;justify-content:center;padding:0`; g.ch.textContent = o.ch; $('#dr').appendChild(g.ch);
  return g;
});
const dTag = document.createElement('div'); dTag.className = 'btag'; dTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; dTag.textContent = 'DOWN A GROUP: REVERSED'; $('#dr').appendChild(dTag);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${N_('Li')}\\;${G_('1.0')} \\;\\longrightarrow\\; ${N_('F')}\\;${G_('4.0')}`);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{C{-}}${N_('F')}:\\; ${G_('4.0')} - ${G_('2.5')} = ${G_('1.5')}`)],
  [K(`\\mathrm{C{-}}${N_('O')}:\\; ${G_('3.5')} - ${G_('2.5')} = ${G_('1.0')}`)],
  [K(`\\mathrm{C{-}}${N_('Cl')}:\\; ${G_('3.0')} - ${G_('2.5')} = ${G_('0.5')}`)],
  [K(`\\mathrm{C{-}}${N_('F')} > \\mathrm{C{-}}${N_('O')} > \\mathrm{C{-}}${N_('Cl')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 90 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W6', 'So')];
const ws = $('#wS');
const WB = [['F', 4.0, 1.5, 120, 40], ['O', 3.5, 1.0, 250, 40], ['Cl', 3.0, 0.5, 380, 46]];
const WR = WB.map(([s, x, gp, y, r]) => {
  const g = mk(ws, 'g', {});
  mk(g, 'line', { x1: 184, y1: y, x2: 520 - r, y2: y, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
  const c = atomG(g, 34, HC, 'C', 28); attr(c, 'transform', `translate(150 ${y})`);
  const p = atomG(g, r, NC, s, 30); attr(p, 'transform', `translate(520 ${y})`);
  txt(g, 104, y + 8, '2.5', { 'text-anchor': 'end', fill: GC, 'font-weight': 600, 'font-size': 20 });
  txt(g, 520 + r + 12, y + 8, x.toFixed(1), { 'text-anchor': 'start', fill: GC, 'font-weight': 600, 'font-size': 20 });
  const pr = [0, 1].map(() => mk(ws, 'circle', { r: 9, fill: EC }));
  const gl = txt(ws, 700, y + 12, `GAP ${gp.toFixed(1)}`, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 26 });
  const dp = txt(ws, 150, y - 46, 'δ+', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: HC, 'text-anchor': 'middle' });
  const dm = txt(ws, 520, y - r - 12, 'δ−', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: NC, 'text-anchor': 'middle' });
  return { g, pr, gl, dp, dm, y, off: gp / 1.5 * 120 };
});
const tWr = [T0('W3'), T0('W4'), T0('W5')];

/* ---------- C: period 3 + not fixed ---------- */
const P3 = [['Na', 0, 0, 0, 0.9], ['Mg', 0, 0, 0, 1.2], ['Al', 0, 0, 0, 1.5], ['Si', 0, 0, 0, 1.8], ['P', 0, 0, 0, 2.1], ['S', 0, 0, 0, 2.5], ['Cl', 0, 0, 0, 3.0]];
const BT = barsIn($('#brT'), P3, 80, 712 / 7);
$('#clA').innerHTML = M.icon('arrowR', 18, C.mute, 2.4);
const tP3 = [wt('C1', 'Sodium'), wt('C1', 'Magnesium'), wt('C1', 'Aluminium'), wt('C1', 'Silicon'), wt('C2', 'Phosphorus'), wt('C2', 'Sulphur'), wt('C2', 'Chlorine')];
{ const g = 712 / 7, x0 = 36 + (g - 64) / 2; $('#brks').innerHTML = `<div class="brk" id="bk0" style="left:${x0}px;width:${2 * g + 64}px;top:484px;color:var(--ink)">METALS</div><div class="brk" id="bk1" style="left:${x0 + 4 * g}px;width:${2 * g + 64}px;top:484px;color:var(--ac)">NON-METALS</div>`; }
{ const card = $('#cl'), d = document.createElement('div'); d.id = 'clIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const FR = [['Bonded to a different atom?', 'VALUE SHIFTS A LITTLE', wt('C4', 'shifts')], ['Tables give typical values', 'APPROXIMATE', wt('C4', 'typical')], ['Fluorine stays the highest', 'F 4.0', wt('C4', 'typical') + 0.9]];
$('#frs').innerHTML = FR.map(([a, e], i) => `<div class="fr" id="fr${i}" style="top:${170 + i * 92}px">${a}<em>${e}</em></div>`).join('');
const avA = PUC.avatar($('#cp'), { x: 36, y: 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the table is a guide, not a law.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Cl has the most negative ${K('\\Delta_{eg}H')}, so Cl is the most electronegative`, right: `${K(N_('F'))} is the most electronegative, ${K(G_('4.0'))}: the pull inside a bond` });
$('#trap').insertAdjacentHTML('beforeend', `<div id="tmini" style="position:absolute;right:36px;top:84px;width:430px;display:flex;flex-direction:column;gap:14px">
  <div id="tm0" style="height:72px;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 15px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">FREE ATOM · Δ<sub>eg</sub>H<b style="font:600 21px 'IBM Plex Mono';color:var(--ink)">Cl −349 · F −328</b></div>
  <div id="tm1" style="height:72px;border-radius:12px;background:var(--okBg);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 15px 'IBM Plex Mono';letter-spacing:.06em;color:#1F6B3F">IN A BOND · PULL<b style="font:600 21px 'IBM Plex Mono';color:#1F6B3F">F 4.0 · Cl 3.0</b></div></div>`);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Ordering across a period, and statement questions that pair it with oxidation states' });
const pr2 = s => K(s.split('-').map((e, i) => i ? N_(e) : H_(e)).join('{-}'));
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `On the Pauling scale, which pair has the <b>largest</b> electronegativity difference?`, qW: 780,
  opts: [pr2('C-Cl'), pr2('Si-Cl'), pr2('Mg-Cl'), pr2('S-Cl')], right: 2, optW: 474, optY: 300, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${N_('Cl')} = ${G_('3.0')} \\text{ in all four}`)], [K(`\\text{weakest puller} \\Rightarrow \\text{biggest gap}`)], [K(`\\mathrm{Mg}: ${G_('3.0')} - ${G_('1.2')} = \\textcolor{${C.ok}}{1.8}`)], [K(`\\mathrm{Si}\\;${G_('1.2')}, \\;\\mathrm{C}, \\mathrm{S}\\;${G_('0.5')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · electronegativity', y0: 96, dy: 74, txt: [1, 0, 1, 1, 1],
  lines: ['<b>Electronegativity</b>: pull of a bonded atom on the shared pair', K(`${N_('Li')}\\,${G_('1.0')} \\rightarrow ${N_('F')}\\,${G_('4.0')} \\qquad ${N_('F')}\\,${G_('4.0')} \\rightarrow ${N_('I')}\\,${G_('2.5')}`), '<b>Across a period</b>: increases · <b>down a group</b>: decreases', '<b>Why</b>: smaller atom, pair closer to the nucleus, stronger pull', '<b>High</b>: non-metals · <b>low</b>: metals · F is the highest (Pauling)'] });
const YQ = ['Why is fluorine more electronegative than lithium?', 'Why does electronegativity fall from fluorine to iodine?', 'Cl has the most negative electron gain enthalpy. Why is F still more electronegative?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 35', topic: 'Can oxygen be +2 and -2? Valency and Oxidation States', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S3', 'smaller') - 0.2, 1.06, 760, 560], [wt('S4', 'Carbon') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  $('#hB').style.left = (64 + $('#hN').offsetWidth + 28) + 'px';
  x = 64; [0, 1, 2].forEach(i => { const e = $('#sc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.lk .lx').forEach(q => { if (q.offsetWidth > 560) q.style.fontSize = Math.floor(25 * 560 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(27 * 620 / q.offsetWidth) + 'px'; });
}
const grow = (bars, t, ts, curI) => bars.forEach((o, i) => { const u = M.io((t - ts[i] + 0.1) / 0.45); o.d.querySelector('i').style.height = (o.h * u).toFixed(1) + 'px'; const bb = o.d.querySelector('b'); bb.style.bottom = (o.h * u + 6).toFixed(1) + 'px'; bb.style.opacity = M.clamp((t - ts[i] - 0.15) / 0.2).toFixed(3); o.d.querySelector('span').style.opacity = (0.35 + 0.65 * M.clamp((t - ts[i] + 0.2) / 0.2)).toFixed(3); setBg(o.d.querySelector('i'), i === curI ? NC : mix(NC, '#FFFFFF', 0.55)); });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'tug') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'three') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, i === 2 ? M.io((t - tKit[2]) / 0.3) : 0)); });
    M.vis($('#hTz'), t, wt('H5', 'tug') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    { const sh = M.spring(t - tP5 + 0.25, M.HEAVY); snap($('#pq'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    M.vis($('#mdef'), t, wt('P1', 'electronegativity') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : tP5; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP5 - 0.05, out, { dx: 60, dy: 0, ...o });
    const aIn = M.clamp((t - tP5 - 0.1) / 0.3);
    [hStk, hAt, cAt, ...lone.flat()].forEach(e => { e.style.opacity = aIn.toFixed(3); });
    const sl = M.io((t - wt('P6', 'closer') + 0.2) / 0.8), px = M.lerp((HX + 34 + CX - 50) / 2, CX - 92, sl);
    const pu = M.clamp((t - wt('P5', 'pair') + 0.1) / 0.3);
    pair.forEach((d, k) => { attr(d, 'cx', px.toFixed(1)); attr(d, 'cy', (AY - 10 + k * 20).toFixed(1)); d.style.opacity = pu.toFixed(3); M.hide(d, pu <= 0); });
    const ar = M.io((t - wt('P6', 'Chlorine') + 0.05) / 0.4);
    if (ar > 0) { pullC.set(px + 14, AY + 30, px + 14 + 70 * ar, AY + 30); pullH.set(px - 14, AY + 30, px - 14 - 30 * ar, AY + 30); } else { pullC.set(0, 0, 0, 0); pullH.set(0, 0, 0, 0); }
    fade(dM, t, wt('P6', 'negative') - 0.1); fade(dP, t, wt('P6', 'positive') - 0.1);
    fade(hLab, t, wt('P6', 'harder') - 0.1); fade(cLab, t, wt('P6', 'harder') - 0.1);
    M.vis(pTag, t, wt('P5', 'pair') - 0.1, 1e9, POP);
    PUC.write($('#hclF'), t, wt('P6', 'positive') + 0.3, 0.7);
  }

  /* U */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#pau'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    M.vis($('#hN'), t, wt('U1', 'Linus') - 0.1, 1e9, { dy: 10 }); M.vis($('#hB'), t, wt('U1', 'Pauling') + 0.1, 1e9, { dy: 10 }); M.vis($('#hHr'), t, tU + 0.3, 1e9, { dy: 0 });
    PUC.write($('#hq0'), t, wt('U1', 'fluorine') - 0.1, 1.0); PUC.write($('#hq1'), t, wt('U1', 'set') - 0.1, 1.0);
    $('#hqT').style.color = mix(C.ink, GC, M.io((t - wt('U1', 'four')) / 0.3));
    [0, 1, 2].forEach(i => M.vis($('#sc' + i), t, wt('U1', 'scale') + i * 0.15, 1e9, POP));
    setBg($('#sc0'), mix(C.soft, C.ac2, M.io((t - wt('U1', 'compared')) / 0.3)));
  }

  /* S + B: the bench */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, T0('S6') - 0.2, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'sodium') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'gap') });
    const k = cur(t), st = SEQ[k][1], R = fR(t), nS = fSh(t), x = fX(t), grp = t >= T0('S6') - 0.1;
    M.setT($('#bnL'), grp ? 'MOLECULE BENCH · GROUP 17' : 'MOLECULE BENCH · PERIOD 2');
    rings.forEach((r, i) => { const n = Math.round(nS), rr = n <= 1 ? R : 46 + (R - 46) * Math.min(i, n - 1) / (n - 1); attr(r, 'r', rr.toFixed(1)); r.style.opacity = M.clamp(nS - i).toFixed(3); M.hide(r, nS - i <= 0.01); });
    M.setT(nucT, st.s);
    vEl.forEach((d, i) => { const a = Math.PI + (i - (st.v - 1) / 2) * 0.42; attr(d, 'cx', (BX + R * Math.cos(a)).toFixed(1)); attr(d, 'cy', (BY + R * Math.sin(a)).toFixed(1)); M.hide(d, i >= st.v); });
    const pIn = M.clamp((t - wt('S2', 'outer') + 0.1) / 0.3);
    bPair.forEach((d, j) => { attr(d, 'cx', (BX + R + 2).toFixed(1)); attr(d, 'cy', (BY - 10 + j * 20).toFixed(1)); d.style.opacity = pIn; M.hide(d, pIn <= 0); });
    attr(dist, 'x2', (BX + R - 12).toFixed(1)); dist.style.opacity = pIn; M.hide(dist, pIn <= 0);
    const aw = 2 + 2.2 * x; if (pIn > 0.5) bPull.set(BX + R - 16, BY + 34, BX + 40, BY + 34); else bPull.set(0, 0, 0, 0);
    bPull.g.style.opacity = pIn; bPull.g.querySelector('path').setAttribute('stroke-width', aw.toFixed(1));
    M.vis($('#gz'), t, tS1 + 0.3, 1e9, { dy: 8 });
    $('#gzI').style.width = (420 * x / 4).toFixed(1) + 'px'; M.setT($('#gzV'), x.toFixed(1));
    const TAG = [[tS1, `${st.s} · ${st.p} PROTONS`], [wt('S3', 'smaller'), `${st.s} · ${st.p} PROTONS · SMALLER`], [wt('S4', 'Beryllium') - 0.1, `${st.s} · ${st.p} PROTONS`], [wt('S5', 'strongest'), 'F · STRONGEST PULL'], [T0('S6'), `${st.s} · ${st.sh} SHELLS`], [wt('S7', 'adds'), `${st.s} · ${st.sh} SHELLS · NEW SHELL`], [wt('S7', 'weaker'), 'PAIR FARTHER · WEAKER']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (t >= wt('S7', 'weaker')) tg = 'PAIR FARTHER · WEAKER';
    M.setT(btag, tg); M.vis(btag, t, tS1 + 0.4, 1e9, POP);
    // strips
    const pOff = T0('S6') - 0.15, gOff = tB1 + 0.1;
    M.vis($('#ptS'), t, tS1 + 0.5, pOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptG'), t, T0('S6'), gOff, { dy: 8, outDur: 0.25, ody: 0 });
    PER.forEach((e, i) => { const el = $('#pt' + e[0]), u = M.io((t - tEl[i] + 0.1) / 0.3), c = i === k ? NC : mix(NC, '#FFFFFF', 0.45); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); el.querySelector('i').style.opacity = u.toFixed(3); });
    GRP.forEach((e, i) => { const el = $('#pg' + e[0]), u = M.io((t - tBarG[i] + 0.1) / 0.3), on = (i === 0 && k === 6) || SEQ[k][1].s === e[0], c = on ? NC : mix(NC, '#FFFFFF', 0.45); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); el.querySelector('i').style.opacity = u.toFixed(3); });
    grow(BP, t, tEl, grp ? -1 : k); grow(BG, t, tBarG, grp ? (k >= 6 ? k - 6 : -1) : -1);
    const hi1 = M.io((t - wt('B1', 'increases') + 0.1) / 0.3), hi2 = M.io((t - wt('B1', 'decreases') + 0.1) / 0.3);
    M.vis($('#rxH'), t, tS1 + 0.8, 1e9, POP); M.vis($('#ctH'), t, T0('S6') + 0.4, 1e9, POP);
    setBg($('#rxH'), mix(C.soft, NC, hi1)); $('#rxH').style.color = mix(C.mute, '#FFFFFF', hi1); PUC.setIco($('#rxA'), 'arrowR', hi1 > 0.5 ? '#fff' : C.mute, 18, 2.4);
    setBg($('#ctH'), mix(C.soft, HC, hi2)); $('#ctH').style.color = mix(C.mute, '#FFFFFF', hi2); PUC.setIco($('#ctA'), 'arrowD', hi2 > 0.5 ? '#fff' : C.mute, 18, 2.4);
    avD(t, tB1 + 0.3, z);
  }

  /* D: link by link */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.2, z, { dx: 60, dy: 0, ...o });
    const ci = tLk.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, -1);
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.15, 1e9, { dx: -16, dy: 0 }); const on = i === ci ? M.io((t - tLk[i] + 0.15) / 0.3) : 0; setBg(el, mix(C.soft, C.ac2, on)); });
    const aIn = M.clamp((t - tD1 - 0.3) / 0.3);
    SD.forEach((g, j) => { [...g.r, g.n, ...g.v, ...g.pr].forEach(e => { e.style.opacity = aIn.toFixed(3); });
      fade(g.pt, t, wt('D2', 'protons') - 0.1);
      const ru = M.io((t - wt('D3', j ? 'Fluorine' : 'Lithium') + 0.1) / 0.5); M.drawU(g.rad, ru); fade(g.rt, t, wt('D3', j ? 'Fluorine' : 'Lithium') - 0.1);
      const o2 = SIDE[j], au = M.io((t - wt('D4', 'closer') + 0.1 + j * 0.25) / 0.5);
      if (au > 0) g.ar.set(o2.x + o2.R - 14, DY - 30, o2.x + o2.R - 14 - (o2.R - 44) * au, DY - 30); else g.ar.set(0, 0, 0, 0);
      M.vis(g.ch, t, wt('D6', j ? 'Strong' : 'Weak') - 0.1, 1e9, POP);
    });
    M.vis(dTag, t, wt('D5', 'Down') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Electronegativity') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'and') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'and') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WR.forEach((r, i) => {
      const u = M.clamp((t - T0('W2') - 0.4 - i * 0.15) / 0.3); r.g.style.opacity = u.toFixed(3);
      const sl = M.io((t - tWr[i] - 0.3) / 0.8), px = M.lerp(335, 335 + r.off, sl);
      r.pr.forEach((d, k) => { attr(d, 'cx', px.toFixed(1)); attr(d, 'cy', (r.y - 10 + k * 20).toFixed(1)); d.style.opacity = u.toFixed(3); });
      fade(r.gl, t, tWr[i] + 0.5); fade(r.dp, t, wt('W6', 'positive') - 0.1); fade(r.dm, t, wt('W6', 'positive') - 0.1);
    });
    M.vis($('#wGp'), t, wt('W6', 'Bigger') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1'), tc4 = T0('C4');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    { const sh = M.spring(t - tc4 + 0.25, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#cl'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#clIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    const ci = tP3.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, -1);
    grow(BT, t, tP3, t < T0('C3') ? ci : -1);
    M.vis($('#clH'), t, tC1 + 0.6, 1e9, POP);
    M.vis($('#bk0'), t, wt('C3', 'metals') - 0.1, 1e9, { dy: 10 }); M.vis($('#bk1'), t, wt('C3', 'non') - 0.1, 1e9, { dy: 10 });
    M.vis($('#cp'), t, tc4 - 0.05, out, { dx: 60, dy: 0, ...o });
    FR.forEach((f, i) => M.vis($('#fr' + i), t, f[2] - 0.1, 1e9, { dy: 14 }));
    avA(t, wt('C4', 'values') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'students') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Electronegativity') - 0.1 });
    M.vis($('#tm0'), t, wt('X2', 'releases') - 0.1, 1e9, { dx: 20, dy: 0 }); M.vis($('#tm1'), t, wt('X3', 'pull') - 0.1, 1e9, { dx: 20, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Ordering') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'which'), tCount, tAns });
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
