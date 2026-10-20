// PUC Chemistry Ep 27: Modern periodic law (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: atomic number Z and protons teal (the element in play), electrons orange, neutrons grey,
// atomic mass ink, the IUPAC ending "ium" gold, a broken order red
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const tile = (p, x, y, w, h, s, fsz, col) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); const r = mk(g, 'rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(16, w / 6), fill: '#FFFFFF', stroke: col, 'stroke-width': 3 }); const t = txt(g, 0, fsz * 0.36, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fsz, fill: col }); return { g, r, t }; };

Object.assign(M.IC, {
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tL1 = T0('L1'), tB1 = T0('B1'), tB2 = T0('B2');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['users', 'Roll call', 'NUMBER, NOT HEIGHT', 'class', 'ROLL NO.'], ['home', 'Street', 'DOOR NUMBER, NOT SIZE', 'Houses', 'DOOR NO.'], ['grid', 'Exam hall', 'BY REGISTER NUMBER', 'exam', 'REG. NO.']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , lab], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${lab}</span><div class="el">#</div></div></div>`).join('');
const KIT = [['book', 'Notice board', 'notice'], ['users', 'Seating list', 'seating'], ['x', 'Out of place', 'place']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: atom + identity card ---------- */
const as = $('#aS'), AX = 392, AY = 300;
const rings = [120, 196].map(r => mk(as, 'circle', { cx: AX, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const NUC = [[-14, -24, 1], [14, -24, 0], [-28, 0, 0], [0, 0, 1], [28, 0, 1], [-14, 24, 0], [14, 24, 1], [-14, -48, 0], [14, 48, 0], [-42, 24, 1], [42, -24, 0], [42, 24, 1]];
const nuc = NUC.map(([dx, dy, p]) => { const g = mk(as, 'g', { transform: `translate(${AX + dx * 1.45} ${AY + dy * 1.45})` }); const c = mk(g, 'circle', { r: 19, fill: p ? '#FFFFFF' : C.dim, stroke: p ? NC : C.dim, 'stroke-width': 2.5 }); const tx = p ? txt(g, 0, 8, '+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: NC }) : null; return { g, c, tx, p }; });
const els = [[120, 0], [120, Math.PI], [196, 0.4], [196, 0.4 + Math.PI / 2], [196, 0.4 + Math.PI], [196, 0.4 + 1.5 * Math.PI]].map(([r, a]) => ({ r, a, c: mk(as, 'circle', { r: 10, fill: EC }) }));
const aTag = [['NUCLEUS', 'nucleus', AX, AY - 98, C.ink], ['6 PROTONS (+)', 'protons', 140, 120, NC], ['6 ELECTRONS (−)', 'electrons', 640, 120, EC]];
const aT = aTag.map(([s, w, x, y, col], i) => txt(as, x, y, s, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }));
const zBig = mk(as, 'g', {}); mk(zBig, 'rect', { x: 262, y: 500, width: 260, height: 56, rx: 12, fill: NC }); txt(zBig, 392, 538, 'Z = 6 · CARBON', { 'text-anchor': 'middle', 'font-size': 26, fill: '#FFFFFF', 'font-weight': 600 });
$('#idEq').innerHTML = K(`${tc(NC, 'Z')} = ${tc(NC, '\\text{protons}')} = ${tc(EC, '\\text{electrons}')}`);
const ID = [[0, 'H', '1', 'HYDROGEN'], [0, 'C', '6', 'CARBON'], [0, 'N', '7', 'NITROGEN'], [0, 'C', '6', 'CARBON']];
const tId = [wt('P3', 'Hydrogen'), wt('P3', 'Carbon'), wt('P5', 'Change'), wt('P5', 'Mass')];

/* ---------- U ---------- */
$('#hqI').innerHTML = M.icon('quote', 56, C.ac, 1.8);

/* ---------- S: X-ray bench ---------- */
const b = $('#bS');
mk(b, 'rect', { x: 60, y: 120, width: 26, height: 130, rx: 6, fill: C.ink });
txt(b, 73, 280, 'ELECTRON GUN', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const beam = Array.from({ length: 7 }, () => mk(b, 'circle', { r: 8, fill: EC }));
const tgt = mk(b, 'g', {}); mk(tgt, 'rect', { x: 380, y: 112, width: 120, height: 146, rx: 12, fill: NC }); const tgtS = txt(tgt, 440, 200, 'Ca', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 46, fill: '#FFFFFF' });
txt(b, 440, 280, 'METAL TARGET', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
let wav = 'M500 185'; for (let i = 1; i <= 40; i++) { const x = 500 + i * 5.2, y = 185 - Math.sin(i * 0.95) * 12; wav += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }
const xr = mk(b, 'path', { d: wav, fill: 'none', stroke: C.violet, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(b, 'rect', { x: 712, y: 130, width: 36, height: 110, rx: 8, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 });
const xrT = txt(b, 610, 150, 'X-RAYS', { 'text-anchor': 'middle', 'font-size': 17, fill: C.violet, 'font-weight': 600 });
txt(b, 36, 336, 'X-RAY LINE · HIGHER FREQUENCY →', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
mk(b, 'rect', { x: 36, y: 350, width: 712, height: 60, rx: 10, fill: C.soft });
const XLine = Z => 70 + (Z - 20) / 9 * 640;
const P4 = ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];
const MET = [['Ca', 20, 40.08], ['Sc', 21, 44.96], ['Ti', 22, 47.87], ['V', 23, 50.94], ['Cr', 24, 52.00], ['Mn', 25, 54.94], ['Fe', 26, 55.85], ['Co', 27, 58.93], ['Ni', 28, 58.69], ['Cu', 29, 63.55]];
const xls = MET.map(([s, Z]) => mk(b, 'line', { x1: XLine(Z), y1: 358, x2: XLine(Z), y2: 402, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' }));
txt(b, 36, 448, 'PERIOD 4 · METALS TESTED', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const p4 = P4.map((s, i) => { const g = mk(b, 'g', {}); const r = mk(g, 'rect', { x: 36 + i * 60, y: 462, width: 52, height: 52, rx: 8, fill: '#FFFFFF', stroke: C.line, 'stroke-width': 2 }); const t = txt(g, 62 + i * 60, 496, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: C.dim }); return { r, t, s }; });
const tMet = {}; [['Ca', 'Calcium'], ['Ti', 'titanium'], ['Fe', 'iron'], ['Co', 'cobalt'], ['Ni', 'nickel'], ['Cu', 'copper']].forEach(([s, w]) => { tMet[s] = wt('S3', w); });
const tMore = wt('S3', 'more'); [['Sc', 0], ['V', 1], ['Cr', 2], ['Mn', 3]].forEach(([s, k]) => { tMet[s] = tMore + 0.1 + k * 0.12; });
tMet.Ca = Math.min(tMet.Ca, T0('S3'));
const order = [...MET].sort((a, z) => tMet[a[0]] - tMet[z[0]]);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// law pane: repeating outer arrangement
const CF = [['Li', '2, ', '1', 'Z = 3'], ['Na', '2, 8, ', '1', 'Z = 11'], ['K', '2, 8, 8, ', '1', 'Z = 19']];
$('#cfrs').innerHTML = CF.map(([s, a, o, z], i) => `<div class="cfr" id="cf${i}" style="top:${330 + i * 76}px"><div class="s" style="color:${NC}">${s}</div><div class="c">${a}<span style="color:${EC}">${o}</span></div><div class="k">${z}</div></div>`).join('');
// order pane: by mass vs by Z
const os = $('#oS');
txt(os, 36, 110, 'ORDER BY ATOMIC MASS', { 'font-size': 18, fill: C.mute, 'font-weight': 600 }); const oz = txt(os, 36, 330, 'ORDER BY ATOMIC NUMBER', { 'font-size': 18, fill: NC, 'font-weight': 600 });
const OM = [['Fe', 26, '55.85'], ['Ni', 28, '58.69'], ['Co', 27, '58.93'], ['Cu', 29, '63.55']];
const ox = i => 120 + i * 180;
const oT = OM.map(([s, Z, m], i) => { const T = tile(os, ox(i), 196, 140, 110, s, 40, HC); attr(T.t, 'y', 4); T.l = txt(T.g, 0, 38, m + ' u', { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600 }); return { ...T, s, Z }; });
const zT = OM.map(([s, Z]) => { const T = tile(os, 0, 0, 140, 110, s, 40, HC); attr(T.t, 'y', 4); T.l = txt(T.g, 0, 38, 'Z = ' + Z, { 'text-anchor': 'middle', 'font-size': 18, fill: NC, 'font-weight': 600 }); return { ...T, s, Z }; });
const swX = mk(os, 'path', { d: `M${ox(1) - 40} 262 C${ox(1)} 290 ${ox(2)} 290 ${ox(2) + 40} 262`, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
const okT = txt(os, 392, 530, 'Co (27) before Ni (28)  ✓', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ok, 'font-weight': 600 });
// graph: √ν against Z, morphing to atomic mass
const gs = $('#gS'), GX0 = 120, GW = 590, GY0 = 90, GH = 390;
const Xz = Z => GX0 + (Z - 19) / 11 * GW, Xm = m => GX0 + (m - 38) / 28 * GW, Yv = Z => GY0 + GH - ((Z - 1) - 17.5) / 12 * GH;
mk(gs, 'path', { d: `M${GX0} ${GY0} V${GY0 + GH} H${GX0 + GW}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
const yl = txt(gs, GX0 + 14, GY0 + 4, '√ν', { 'font-size': 22, fill: C.violet, 'font-weight': 600 });
const ticksZ = mk(gs, 'g', {}), ticksM = mk(gs, 'g', {});
[20, 22, 24, 26, 28, 30].forEach(Z => { mk(ticksZ, 'line', { x1: Xz(Z), y1: GY0 + GH, x2: Xz(Z), y2: GY0 + GH + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ticksZ, Xz(Z), GY0 + GH + 32, String(Z), { 'text-anchor': 'middle', 'font-size': 18, fill: NC }); });
[40, 45, 50, 55, 60, 65].forEach(m => { mk(ticksM, 'line', { x1: Xm(m), y1: GY0 + GH, x2: Xm(m), y2: GY0 + GH + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ticksM, Xm(m), GY0 + GH + 32, String(m), { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink }); });
const xlab = txt(gs, GX0 + GW, GY0 + GH + 62, 'ATOMIC NUMBER Z', { 'text-anchor': 'end', 'font-size': 18, fill: NC, 'font-weight': 600 });
const gLine = mk(gs, 'path', { d: '', fill: 'none', stroke: NC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const gBad = mk(gs, 'path', { d: '', fill: 'none', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gPts = MET.map(([s]) => { const g = mk(gs, 'g', {}); const c = mk(g, 'circle', { r: 9, fill: C.violet }); const l = txt(g, 0, 0, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: C.ink }); return { g, c, l }; });
const gTag = document.createElement('div'); gTag.className = 'btag'; gTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#gr').appendChild(gTag);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So Z decides how an element behaves!' });
const th1 = PUC.think($('#th1'), { q: 'Nickel is lighter than cobalt. Which comes first in the modern table?', opts: ['Cobalt', 'Nickel'], right: 0, why: `Cobalt is ${K(`${tc(NC, 'Z')} = 27`)}, nickel is ${K(`${tc(NC, 'Z')} = 28`)}. Atomic number decides the order.` });
// bench beats
const tBeam = wt('S1', 'beam'), tXr = wt('S2', 'X'), tStr = wt('S4', 'straight'), tPlot = wt('S4', 'plotted'), tMass = wt('S5', 'against'), tCoNi = wt('S5', 'cobalt'), tHigh = wt('S5', 'higher');
const tBreak = wt('S6', 'breaks'), tBack = wt('S6', 'Against', 1), tBasic = wt('S6', 'basic');
const tBm = wt('B1', 'mass'), tBz = wt('B1', 'atomic');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{order by } ${tc(NC, 'Z')} \\text{, the number of protons}`);

/* ---------- W: naming Z > 100 ---------- */
const ROOT = [['0', 'nil', 'n'], ['1', 'un', 'u'], ['2', 'bi', 'b'], ['3', 'tri', 't'], ['4', 'quad', 'q'], ['5', 'pent', 'p'], ['6', 'hex', 'h'], ['7', 'sept', 's'], ['8', 'oct', 'o'], ['9', 'enn', 'e']];
$('#rts').innerHTML = ROOT.map(([d, r, l], i) => `<div class="rt" id="rt${i}" style="left:${36 + (i % 5) * 144}px;top:${80 + Math.floor(i / 5) * 112}px"><div class="d">${d}</div><div class="l">${l}</div><div class="r">${r}</div></div>`).join('');
const tRt = ['Nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'].map(w => wt('W3', w));
const ns = $('#nS'), DX = [232, 392, 552];
mk(ns, 'line', { x1: 36, y1: 316, x2: 748, y2: 316, stroke: C.line, 'stroke-width': 2 });
const dig = ['1', '1', '9'].map((d, i) => { const g = mk(ns, 'g', {}); mk(g, 'rect', { x: DX[i] - 56, y: 336, width: 112, height: 64, rx: 12, fill: C.soft }); txt(g, DX[i], 380, d, { 'text-anchor': 'middle', 'font-size': 36, fill: C.ink, 'font-weight': 600 }); return g; });
const rtx = ['un', 'un', 'enn'].map((r, i) => txt(ns, DX[i], 446, r, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: NC }));
const nmG = mk(ns, 'g', {}); const nmT = mk(nmG, 'text', { x: 300, y: 530, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 46, fill: C.ink });
nmT.innerHTML = `<tspan fill="${NC}">U</tspan>n<tspan fill="${NC}">u</tspan>n<tspan fill="${NC}">e</tspan>nn<tspan fill="${GC}">ium</tspan>`;
const syG = mk(ns, 'g', {}); mk(syG, 'rect', { x: 566, y: 482, width: 150, height: 64, rx: 14, fill: NC }); txt(syG, 641, 527, 'Uue', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 36, fill: '#FFFFFF' });
const wsol = PUC.solution($('#wl'), [
  [K(`119 \\rightarrow 1,\\; 1,\\; 9`)],
  [K(`${tc(NC, '\\text{un}')},\\; ${tc(NC, '\\text{un}')},\\; ${tc(NC, '\\text{enn}')}`)],
  [K(`\\text{un + un + enn + }${tc(GC, '\\text{ium}')} = \\text{Ununennium}`)],
  [K(`\\text{symbol: } ${tc(NC, '\\mathrm{U}')} + ${tc(NC, '\\mathrm{u}')} + ${tc(NC, '\\mathrm{e}')} = ${tc(NC, '\\mathrm{Uue}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const exm = document.createElement('div'); exm.className = 'pane'; exm.innerHTML = `<div class="lbl" style="left:36px;top:178px">NCERT EXAMPLE · TEMPORARY, THEN OFFICIAL</div><div class="cfr" style="top:214px;height:72px"><div class="s" style="top:14px;font-size:30px">101</div><div class="c" style="top:20px;font-size:26px">Unnilunium, Unu</div><div class="k" style="top:26px">→ MENDELEVIUM, Md</div></div>`;
$('#wl').appendChild(exm);
const tWs = [T0('W5'), T0('W6'), T0('W7'), T0('W8')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Potassium (39.10 u) comes before argon (39.95 u)', right: `Argon (${K(`${tc(NC, 'Z')} = 18`)}) comes before potassium (${K(`${tc(NC, 'Z')} = 19`)})` });
const tsv = $('#tS');
const tAr = tile(tsv, 0, 0, 150, 130, 'Ar', 48, HC), tK = tile(tsv, 0, 0, 150, 130, 'K', 48, HC);
[[tAr, '18', '39.95'], [tK, '19', '39.10']].forEach(([T, z, m]) => { attr(T.t, 'y', 8); txt(T.g, 0, -36, 'Z = ' + z, { 'text-anchor': 'middle', 'font-size': 17, fill: NC, 'font-weight': 600 }); txt(T.g, 0, 48, m + ' u', { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600 }); });
const tOk = mk(tsv, 'g', {}); mk(tOk, 'circle', { cx: 280, cy: 236, r: 18, fill: C.ok }); tOk.insertAdjacentHTML('beforeend', `<g transform="translate(268 224)">${M.icon('check', 24, '#fff', 3)}</g>`);
const where = PUC.where($('#wa'), { on: [], type: 'One-mark: the modern periodic law, and IUPAC names and symbols for Z above 100' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'What is the IUPAC temporary symbol for the element with atomic number 117?', qW: 780,
  opts: ['Uus', 'Uns', 'Uuh', 'Uut'], right: 0, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K('117 \\rightarrow 1,\\,1,\\,7')], [K(`${tc(NC, '\\text{un}')},\\, ${tc(NC, '\\text{un}')},\\, ${tc(NC, '\\text{sept}')}`)], ['Ununseptium'], [`<b style="color:${C.ok}">Uus</b> · B = 107, C = 116`]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'roots'), wt('A3', 'Ununseptium'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · modern periodic law', y0: 96, dy: 62, txt: [0, 1, 1, 1, 1, 1],
  lines: [K(`${tc(NC, 'Z')} = \\text{number of protons} = \\text{electrons (neutral atom)}`), '<b>Moseley, 1913</b>: √ν against Z gives a straight line', '<b>Modern periodic law</b>: properties are periodic functions of atomic number', '<b>Order by Z</b>: Ar (18) before K (19) · Co (27) before Ni (28)', '<b>IUPAC roots</b>: nil un bi tri quad pent hex sept oct enn, then add ium', '<b>Example</b>: 119 = Ununennium, Uue · 120 = Unbinilium, Ubn'] });
const YQ = ['What does the atomic number of an element count?', 'Why does argon come before potassium, even though argon is heavier?', 'What is the IUPAC temporary name of element 120?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 28', topic: 'Why exactly 18 columns? Structure of the Modern Periodic Table', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tCoNi - 0.3, 1.06, 980, 560], [tBack, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  $('#hB').style.left = (64 + $('#hN').offsetWidth + 28) + 'px';
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const tq = $('#th1 .tq'); if (tq) tq.style.width = '1180px';
}
const poly = (pts, p) => { if (p <= 0) return ''; const n = pts.length - 1, f = p * n, k = Math.floor(f); let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`; for (let i = 1; i <= Math.min(k, n); i++) d += ` L${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`; if (k < n) { const a = pts[k], c = pts[k + 1], u = f - k; d += ` L${(a[0] + (c[0] - a[0]) * u).toFixed(1)} ${(a[1] + (c[1] - a[1]) * u).toFixed(1)}`; } return d; };

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'right') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Pick') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = i === 2 ? M.io((t - wt('H4', 'order') + 0.1) / 0.3) : 0; setBg(el, mix(C.soft, C.redBg, on)); });
    M.vis($('#hTz'), t, wt('H5', 'nobody') - 0.15, 1e9, POP);
  }

  /* P: atom + identity */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tNuc = wt('P2', 'nucleus'), tPr = wt('P2', 'protons'), tEl = wt('P4', 'electrons');
    nuc.forEach((n, i) => { const u = M.spring(t - tNuc + 0.1 - i * 0.03, M.POP); attr(n.g, 'transform', `translate(${AX + NUC[i][0] * 1.45} ${AY + NUC[i][1] * 1.45}) scale(${Math.max(0.01, Math.min(1.15, u)).toFixed(3)})`); M.hide(n.g, t < tNuc - 0.1);
      if (n.p) { const l = M.io((t - tPr) / 0.3); attr(n.c, 'fill', mix('#FFFFFF', NC, l)); attr(n.tx, 'fill', mix(NC, '#FFFFFF', l)); } });
    rings.forEach(r => fade(r, t, tEl - 0.3));
    els.forEach((e, i) => { const a = e.a + (t - tEl) * (e.r === 120 ? 0.9 : 0.55); attr(e.c, 'cx', (AX + e.r * Math.cos(a)).toFixed(1)); attr(e.c, 'cy', (AY + e.r * Math.sin(a)).toFixed(1)); fade(e.c, t, tEl - 0.1 + i * 0.08); });
    fade(aT[0], t, tNuc + 0.2); fade(aT[1], t, tPr + 0.1); fade(aT[2], t, tEl + 0.3);
    const zb = M.spring(t - wt('P3', 'atomic') + 0.1, M.POP); attr(zBig, 'transform', `translate(392 528) scale(${Math.max(0.01, Math.min(1.1, zb)).toFixed(3)}) translate(-392 -528)`); M.hide(zBig, t < wt('P3', 'atomic') - 0.1);
    M.vis($('#pw'), t, wt('P3', 'number') + 0.1, out, { dx: 60, dy: 0, ...o });
    const ii = tId.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, 0), cur = ID[ii];
    M.setT($('#idZ'), cur[2]); M.setT($('#idS'), cur[1]); M.setT($('#idN'), cur[3]);
    const fl = M.io((t - tId[ii] + 0.1) / 0.2) * (1 - M.io((t - tId[ii] - 0.3) / 0.3)); $('#idT').style.background = mix('#FFFFFF', C.ac2, fl);
    M.vis($('#idT'), t, wt('P3', 'number') + 0.2, 1e9, POP);
    M.vis($('#idr0'), t, tId[0] + 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#idr1'), t, tId[1] + 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#idr2'), t, tId[3] + 0.1, 1e9, { dx: -16, dy: 0 });
    PUC.write($('#idEq'), t, wt('P4', 'equal') - 0.1, 0.8);
    M.vis($('#idP'), t, tId[2] + 0.2, 1e9, POP);
  }

  /* U: Moseley */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#hof'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    M.vis($('#hqI'), t, tU + 0.3, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hN'), t, wt('U1', 'Henry') - 0.1, 1e9, { dy: 10 }); M.vis($('#hB'), t, wt('U1', 'Moseley') + 0.1, 1e9, { dy: 10 }); M.vis($('#hHr'), t, tU + 0.4, 1e9, { dy: 0 });
    PUC.write($('#hq0'), t, wt('U1', 'number') - 0.2, 1.2); PUC.write($('#hq1'), t, wt('U1', 'true') - 0.1, 0.8);
    $('#hqT').style.color = mix(C.ink, C.mute, M.io((t - wt('U1', 'true')) / 0.3));
    M.vis($('#hP'), t, wt('U1', 'modern') - 0.1, 1e9, POP);
  }

  /* S + L + B: bench and graph */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#gr'), t, tPlot - 1.2, z, { dx: 60, dy: 0, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, 1e9, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'which') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Cobalt', 1) });
    const pa = fade($('#bnA'), t, tS1 + 0.2, tL1 - 0.2, 0.25), pb = fade($('#bnB'), t, tL1, tB1 - 0.2, 0.25), pc = fade($('#bnC'), t, tB1, 1e9, 0.25);
    M.setT($('#bnL'), t < tL1 - 0.1 ? 'MOLECULE BENCH · MOSELEY\'S X-RAY TEST' : t < tB1 - 0.1 ? 'THE MODERN PERIODIC LAW' : 'SIDE BY SIDE · MASS vs ATOMIC NUMBER');
    // current metal
    const curM = order.reduce((a, m) => t >= tMet[m[0]] - 0.05 ? m : a, order[0]);
    if (pa) {
      M.setT(tgtS, curM[0]); const ch = M.io((t - tMet[curM[0]] + 0.05) / 0.15) * (1 - M.io((t - tMet[curM[0]] - 0.25) / 0.3)); attr(tgt.firstChild, 'fill', mix(NC, C.ink, ch));
      beam.forEach((d, i) => { const ph = ((t - tBeam) * 1.2 + i / 7) % 1; attr(d, 'cx', (110 + ph * 262).toFixed(1)); attr(d, 'cy', 185); d.style.opacity = (t < tBeam ? 0 : M.clamp((t - tBeam) / 0.3) * Math.min(1, ph * 6, (1 - ph) * 6)).toFixed(3); });
      M.draw(xr, t, tXr - 0.1, 0.6); fade(xrT, t, tXr + 0.2);
      MET.forEach(([s, Z], i) => { const on = t >= tMet[s] - 0.05; const now = curM[0] === s; xls[i].style.opacity = on ? (now ? 1 : 0.28) : 0; M.hide(xls[i], !on || t < tXr); });
      p4.forEach(c => { const m = MET.find(x => x[0] === c.s), tested = m && t >= tMet[c.s] - 0.05, now = curM[0] === c.s && t >= tXr;
        attr(c.r, 'fill', now ? NC : tested ? C.ac2 : '#FFFFFF'); attr(c.r, 'stroke', now || tested ? NC : C.line); attr(c.t, 'fill', now ? '#FFFFFF' : tested ? NC : C.dim); });
    }
    if (pb) {
      PUC.write($('#lw0'), t, wt('L1', 'physical') - 0.1, 2.4);
      M.vis($('#orl'), t, T0('L2') - 0.05, 1e9, { dy: 8 });
      CF.forEach((_, i) => M.vis($('#cf' + i), t, wt('L2', 'outer') + i * 0.35, 1e9, { dx: -16, dy: 0 }));
    }
    avD(t, wt('L1', 'functions') + 0.2, wt('L2', 'outer') - 0.3);
    if (pc) {
      const zm = M.io((t - tBz) / 0.9);
      oT.forEach((T, i) => { fade(T.g, t, tBm - 0.1 + i * 0.08); const bad = (T.s === 'Co' || T.s === 'Ni') ? M.io((t - tBm - 0.6) / 0.3) : 0; attr(T.r, 'stroke', mix(HC, C.red, bad)); });
      M.draw(swX, t, tBm + 0.6, 0.5);
      zT.forEach((T, j) => { const from = OM.findIndex(m => m[0] === T.s), to = T.Z - 26; const x = M.lerp(ox(from), ox(to), zm), y = M.lerp(196, 416, zm); attr(T.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); fade(T.g, t, tBz - 0.05); attr(T.r, 'stroke', mix(HC, NC, M.io((t - tBz - 0.9) / 0.3))); });
      fade(oz, t, tBz - 0.1); fade(okT, t, tBz + 1.0);
    }
    // graph
    const mm = M.io((t - tMass) / 0.9) * (1 - M.io((t - tBack) / 0.9)) + M.io((t - tBm) / 0.9) * (1 - M.io((t - tBz) / 0.9));
    const pts = MET.map(([s, Z, m]) => [M.lerp(Xz(Z), Xm(m), mm), Yv(Z)]);
    MET.forEach(([s, Z], i) => { const g = gPts[i], on = t >= tMet[s] + 0.25; fade(g.g, t, tMet[s] + 0.25, 1e9, 0.2); attr(g.c, 'cx', pts[i][0].toFixed(1)); attr(g.c, 'cy', pts[i][1].toFixed(1));
      const hi = (s === 'Co' || s === 'Ni') ? M.io((t - tCoNi) / 0.3) * (1 - M.io((t - tBasic) / 0.4)) : 0; attr(g.c, 'r', (9 + 4 * hi).toFixed(1)); attr(g.c, 'fill', mix(C.violet, C.red, hi));
      attr(g.l, 'x', (pts[i][0] + (s === 'Ni' ? 30 : -30)).toFixed(1)); attr(g.l, 'y', (pts[i][1] + (s === 'Ni' ? 20 : -14)).toFixed(1)); g.l.style.opacity = (s === 'Ca' || s === 'Cu' ? 1 : hi).toFixed(3); });
    attr(gLine, 'd', poly(pts, M.io((t - tStr + 0.3) / 1.0))); attr(gLine, 'stroke', mix(NC, C.ink2, mm));
    const brkU = mm * M.io((t - tCoNi - 0.2) / 0.3); attr(gBad, 'd', `M${pts[7][0].toFixed(1)} ${pts[7][1].toFixed(1)} L${pts[8][0].toFixed(1)} ${pts[8][1].toFixed(1)}`); gBad.style.opacity = brkU.toFixed(3); M.hide(gBad, brkU < 0.01);
    ticksZ.style.opacity = (1 - mm).toFixed(3); ticksM.style.opacity = mm.toFixed(3);
    M.setT(xlab, mm > 0.5 ? 'ATOMIC MASS (u)' : 'ATOMIC NUMBER Z'); attr(xlab, 'fill', mm > 0.5 ? C.ink : NC);
    M.setT($('#grL'), mm > 0.5 ? '√ν AGAINST ATOMIC MASS' : '√ν AGAINST ATOMIC NUMBER');
    const GT = [[tPlot, 'ONE POINT PER METAL'], [tStr, 'ONE STRAIGHT LINE'], [tMass + 0.4, 'NOW AGAINST MASS'], [tCoNi, 'Ni LIGHTER, YET HIGHER'], [tBreak, 'THE LINE BREAKS'], [tBack + 0.4, 'Z GIVES THE LINE'], [tL1, 'PROPERTIES FOLLOW Z'], [tBm, 'BY MASS: Ni BEFORE Co'], [tBz + 0.5, 'BY Z: IN LINE']];
    let gt = null; for (const [tt, s] of GT) if (t >= tt) gt = s; if (gt) M.setT(gTag, gt); M.vis(gTag, t, tPlot - 0.1, 1e9, POP);
    setBg(gTag, (t >= tCoNi && t < tBack + 0.4) || (t >= tBm && t < tBz + 0.5) ? C.red : C.ink);
    const TAG = [[tBeam, 'FAST ELECTRONS'], [tXr, 'X-RAYS OUT'], [wt('S2', 'own'), 'EACH METAL, ITS OWN LINE'], [T0('S3'), 'ONE METAL AFTER ANOTHER'], [tL1 + 0.3, 'NCERT · MODERN LAW'], [T0('L2'), 'WHY IT REPEATS'], [tB1, 'Co AND Ni']];
    let bt = null; for (const [tt, s] of TAG) if (t >= tt) bt = s; if (bt) M.setT(btag, bt); M.vis(btag, t, tBeam - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Atomic') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'true') - 0.25, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'key') + 0.3, 0.8);
  }

  /* W: naming */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    fade(exm, t, wt('W2', 'official') - 0.1, tWs[0] - 0.3);
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W3') - 0.3, out, { dx: 60, dy: 0, ...o });
    ROOT.forEach((r, i) => { const el = $('#rt' + i); M.vis(el, t, tRt[i] - 0.1, 1e9, POP); const use = (i === 1 || i === 9) ? M.io((t - tWs[1] - 0.2) / 0.3) : 0; setBg(el, mix(C.soft, C.ac2, use)); });
    dig.forEach((g, i) => fade(g, t, wt('W5', ['one', 'one', 'nine'][i], [1, 2, 0][i]) - 0.05));
    rtx.forEach((r, i) => fade(r, t, wt('W6', ['Un', 'un', 'enn'][i], i === 1 ? 1 : 0) - 0.05));
    fade(nmG, t, wt('W7', 'Ununennium') - 0.1);
    { const u = M.spring(t - wt('W8', 'So') + 0.1, M.POP); attr(syG, 'transform', `translate(641 514) scale(${Math.max(0.01, Math.min(1.1, u)).toFixed(3)}) translate(-641 -514)`); M.hide(syG, t < wt('W8', 'So') - 0.1); }
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'Argon', 1) - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'potassium') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: tR });
    const sw = M.io((t - tR) / 0.8);
    attr(tK.g, 'transform', `translate(${M.lerp(130, 430, sw).toFixed(1)} ${(130 - Math.sin(sw * Math.PI) * 30).toFixed(1)})`); attr(tAr.g, 'transform', `translate(${M.lerp(430, 130, sw).toFixed(1)} ${(130 + Math.sin(sw * Math.PI) * 30).toFixed(1)})`);
    fade(tK.g, t, wt('X2', 'potassium') - 0.1); fade(tAr.g, t, wt('X2', 'argon') - 0.1);
    [tAr, tK].forEach(T => attr(T.r, 'stroke', mix(C.red, C.ok, sw))); fade(tOk, t, tR + 0.8);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'temporary'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') });
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
