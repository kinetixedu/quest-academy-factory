// PUC Chemistry Ep 26: Development of periodic classification (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, number line, recap): the element in play (middle of a triad, the family being learnt) teal,
// its partners ink, a computed average gold, predicted (eka) values gold, found values teal
const NC = C.ac, HC = C.ink, GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, {
  music: ['M9 18V5l12-2v13', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
});

/* ---------- periodic table (hand-built SVG: 18 groups, 7 periods, f-block below) ---------- */
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const ZOF = {}; SYM.forEach((s, i) => { ZOF[s] = i + 1; });
const ptPos = Z => { // {r: row 0-8 (7, 8 = f rows), c: column 0-17}
  if (Z === 1) return { r: 0, c: 0 }; if (Z === 2) return { r: 0, c: 17 };
  for (const [s, r] of [[3, 1], [11, 2]]) if (Z >= s && Z < s + 8) { const o = Z - s; return { r, c: o < 2 ? o : o + 10 }; }
  for (const [s, r] of [[19, 3], [37, 4]]) if (Z >= s && Z < s + 18) return { r, c: Z - s };
  for (const [s, r, f] of [[55, 5, 7], [87, 6, 8]]) { if (Z < s || Z >= s + 32) continue; const o = Z - s; if (o < 3) return { r, c: o }; if (o < 17) return { r: f, c: o - 3 + 3 }; return { r, c: o - 14 }; }
  return null;
};
const ptable = (svg, o) => {
  const g = mk(svg, 'g', {}), cells = {}, s = o.cell + o.gap;
  for (let Z = 1; Z <= 118; Z++) {
    const p = ptPos(Z), x = o.x + p.c * s, y = o.y + p.r * s + (p.r >= 7 ? (o.fGap ?? 10) : 0);
    if (p.r >= 7 && o.noF) continue;
    const r = mk(g, 'rect', { x, y, width: o.cell, height: o.cell, rx: o.rx ?? 4, fill: '#FFFFFF', stroke: C.line, 'stroke-width': 1.5 });
    const t = o.fs ? txt(g, x + o.cell / 2, y + o.cell / 2 + o.fs * 0.36, SYM[Z - 1], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': o.fs, fill: '#FFFFFF' }) : null;
    cells[Z] = { r, t, x, y, p };
  }
  // paint(fn): fn(Z) -> [colour, u]; u = 0 plain, 1 filled
  const paint = fn => { for (const Z in cells) { const [col, u] = fn(+Z), c = cells[Z]; attr(c.r, 'fill', u > 0.01 ? mix('#FFFFFF', col, u) : '#FFFFFF'); attr(c.r, 'stroke', u > 0.01 ? mix(C.line, col, u) : C.line); if (c.t) { c.t.style.opacity = u.toFixed(3); } } };
  return { g, cells, paint };
};

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tS6 = T0('S6'), tM1 = T0('M1');
const tB1 = T0('B1'), tB2 = T0('B2'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three stories ---------- */
const JOBS = [['book', 'Library', 'SORTED BY SUBJECT', 'library', '3', 'TRIADS'], ['music', 'Music scale', 'REPEATS AFTER 8', 'music', '8', 'OCTAVES'], ['box', 'Empty shelf', 'SPACE FOR NEW STOCK', 'empty', '?', 'GAPS']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, lab], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${lab}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['book', 'Notes', 'notes'], ['layers', 'Loose pages', 'loose'], ['x', 'No order', 'order']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));
const tHid = [wt('H2', 'Sorting'), wt('H2', 'repeating'), wt('H2', 'leaving')];

/* ---------- P: elements known + sort into families ---------- */
$('#mdefI').innerHTML = M.icon('x', 26, '#fff', 2.6);
const KR = [['1800', 31, wt('P2', 'only')], ['1865', 63, wt('P2', 'By')], ['TODAY', 118, wt('P3', 'Today')]];
$('#krs').innerHTML = KR.map(([y], i) => `<div class="kr" id="kr${i}" style="top:${84 + i * 116}px"><div class="ky">${y}</div><div class="kb" id="kb${i}"></div><div class="kv" id="kv${i}"></div></div>`).join('');
const FAM = [['ALKALI METALS', ['Li', 'Na', 'K']], ['ALKALINE EARTH', ['Be', 'Mg', 'Ca']], ['HALOGENS', ['F', 'Cl', 'Br']], ['NOBLE GASES', ['He', 'Ne', 'Ar']]];
$('#fhs').innerHTML = FAM.map(([h], i) => `<div class="fh" id="fh${i}" style="left:${36 + i * 178}px">${h}</div>`).join('');
const fs = $('#fS'), SCAT = [[120, 160], [470, 300], [650, 140], [300, 380], [560, 420], [200, 270], [420, 150], [680, 320], [100, 400], [330, 210], [560, 240], [470, 420]];
const famT = []; FAM.forEach(([, els], i) => els.forEach((e, k) => {
  const g = mk(fs, 'g', {}), bg = mk(g, 'rect', { x: -46, y: -46, width: 92, height: 92, rx: 14, fill: '#FFFFFF', stroke: C.ink, 'stroke-width': 2.5 });
  const tx = txt(g, 0, 12, e, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: C.ink });
  famT.push({ g, bg, tx, i, k, s: SCAT[famT.length], d: [36 + i * 178 + 83, 170 + k * 108] });
}));
const tSort = wt('P4', 'sort'), tLearn = wt('P5', 'Learn');

/* ---------- U: timeline ---------- */
const tlS = $('#tlL'), TLX = [300, 800, 1300];
const tlLine = mk(tlS, 'line', { x1: 140, y1: 250, x2: 1460, y2: 250, stroke: C.line, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tlOn = mk(tlS, 'line', { x1: 140, y1: 250, x2: 1460, y2: 250, stroke: C.ac, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tlDot = TLX.map(x => { const g = mk(tlS, 'g', { transform: `translate(${x} 250)` }); mk(g, 'circle', { r: 20, fill: '#FFFFFF', stroke: C.ac, 'stroke-width': 6 }); mk(g, 'circle', { r: 8, fill: C.ac }); return g; });
const TL = [['1829', 'Dobereiner', 'TRIADS', ['Ca', 'Sr', 'Ba'], 1], ['1865', 'Newlands', 'LAW OF OCTAVES', ['Li', '...', 'Na'], 0], ['1869', 'Mendeleev', 'PERIODIC LAW', ['Al', '?', 'Si'], 1]];
$('#tns').innerHTML = TL.map(([y, n, i], k) => `<div class="tn" id="tn${k}" style="left:${TLX[k] - 220}px;top:120px"><div class="ty">${y}</div><div class="tw">${n}</div><div class="ti">${i}</div></div>`).join('');
const tlMini = TL.map(([, , , els, hi], k) => { const g = mk(tlS, 'g', {}); els.forEach((e, j) => { const x = TLX[k] - 96 + j * 64 + 32 - 28, gap = e === '?' || e === '...';
  mk(g, 'rect', { x, y: 440, width: 56, height: 56, rx: 10, fill: j === hi && !gap ? NC : '#FFFFFF', stroke: gap ? C.dim : j === hi ? NC : C.ink, 'stroke-width': 2.5, 'stroke-dasharray': e === '?' ? '6 6' : 'none' });
  txt(g, x + 28, 476, e, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: j === hi && !gap ? '#FFFFFF' : gap ? C.mute : C.ink }); }); return g; });
const tTl = [wt('U1', 'Dobereiner'), wt('U1', 'Newlands'), wt('U1', 'Mendeleev')];

/* ---------- S: the bench ---------- */
const b = $('#bS');
const stA = mk(b, 'g', {}), stB = mk(b, 'g', {}), stC = mk(b, 'g', {});
const tile = (p, x, y, w, h, s, fsz, col) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); const r = mk(g, 'rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(18, w / 6), fill: '#FFFFFF', stroke: col, 'stroke-width': 3 }); const t = txt(g, 0, fsz * 0.36, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fsz, fill: col }); return { g, r, t }; };
// stage A: Ca Sr Ba triad
const TA = [['Ca', 'CALCIUM', 40, HC], ['Sr', 'STRONTIUM', 88, NC], ['Ba', 'BARIUM', 137, HC]];
const tA = TA.map(([s, n, w, col], i) => { const x = 170 + i * 222, T = tile(stA, x, 200, 150, 150, s, 64, col); txt(T.g, 0, 58, n, { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
  const wv = txt(stA, x, 322, String(w), { 'text-anchor': 'middle', 'font-size': 38, fill: col, 'font-weight': 600 }); return { ...T, wv, x }; });
const arcs = [mk(stA, 'path', { d: 'M170 340 C170 400 300 420 392 420', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }), mk(stA, 'path', { d: 'M614 340 C614 400 484 420 392 420', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' })];
const sumG = mk(stA, 'g', {}); mk(sumG, 'rect', { x: 212, y: 424, width: 360, height: 60, rx: 12, fill: C.soft }); const sumT = txt(sumG, 392, 465, '40 + 137 = 177', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
const cmpG = mk(stA, 'g', {}); mk(cmpG, 'rect', { x: 242, y: 500, width: 300, height: 52, rx: 12, fill: C.okBg }); txt(cmpG, 392, 536, '88 ≈ 88.5  ✓', { 'text-anchor': 'middle', 'font-size': 28, fill: C.ok, 'font-weight': 600 });
// stage B: Newlands' octaves
const OCT = [['Li', 'Be', 'B', 'C', 'N', 'O', 'F'], ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl'], ['K', 'Ca']];
const tB = []; OCT.forEach((row, r) => row.forEach((s, c) => { const T = tile(stB, 92 + c * 100, 150 + r * 116, 84, 84, s, 32, HC); const n = r * 7 + c; const bd = mk(T.g, 'g', {}); mk(bd, 'circle', { cx: 0, cy: -58, r: 15, fill: n < 8 ? C.ink : C.soft }); txt(bd, 0, -52, String(n + 1), { 'text-anchor': 'middle', 'font-size': 17, fill: '#FFFFFF', 'font-weight': 600 }); tB.push({ ...T, bd, row: r, col: c, n }); }));
const brk = mk(stB, 'g', {}); [2, 3, 4].forEach(c => mk(brk, 'rect', { x: 92 + c * 100 - 42, y: 382 - 42, width: 84, height: 84, rx: 14, fill: C.redBg, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }));
txt(brk, 392, 398, '? ? ?', { 'text-anchor': 'middle', 'font-size': 28, fill: C.red, 'font-weight': 600 });
const tOct = ['Lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'eighth'].map(w => wt('S7', w));
// stage C: Mendeleev's table (a slice of it)
const GH = ['III', 'IV', 'V', 'VI', 'VII'], MG = [['B', 'C', 'N', 'O', 'F'], ['Al', 'Si', 'P', 'S', 'Cl'], ['', '', 'As', 'Se', 'Br'], ['In', 'Sn', 'Sb', 'Te', 'I']];
const gx = c => 104 + c * 144, gy = r => 152 + r * 96;
GH.forEach((h, c) => txt(stC, gx(c), 92, 'GROUP ' + h, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }));
const colBg = mk(stC, 'rect', { x: gx(4) - 66, y: 100, width: 132, height: 400, rx: 16, fill: C.ac2 });
const tC = {}; MG.forEach((row, r) => row.forEach((s, c) => { if (!s) return; tC[s] = { ...tile(stC, gx(c), gy(r), 120, 80, s, 32, HC), row: r, col: c }; }));
['Te', 'I'].forEach(s => { const T = tC[s]; attr(T.t, 'y', 6); T.w = txt(T.g, 0, 30, s === 'Te' ? '127.6' : '126.9', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); });
const gaps = [0, 1].map(c => { const g = mk(stC, 'g', { transform: `translate(${gx(c)} ${gy(2)})` }); const r = mk(g, 'rect', { x: -60, y: -40, width: 120, height: 80, rx: 18, fill: 'none', stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '8 7' }); const q = txt(g, 0, 12, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: GC }); const e = txt(g, 0, 8, c ? 'eka-Si' : 'eka-Al', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 600 }); const f = mk(g, 'rect', { x: -60, y: -40, width: 120, height: 80, rx: 18, fill: NC }); const ft = txt(g, 0, 12, c ? 'Ge' : 'Ga', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: '#FFFFFF' }); return { g, r, q, e, f, ft }; });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 474, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So order alone is not enough?' });
// rule card A: triad average
$('#eq').innerHTML = `<span id="eq0">${K(`\\dfrac{${tc(HC, '40')} + ${tc(HC, '137')}}{2} = ${tc(GC, '88.5')}`)}</span><span id="eq1" style="margin-left:18px">${K(`\\approx ${tc(NC, '88')}\\;(${tc(NC, '\\mathrm{Sr}')})`)}</span>`;
$('#eq').style.fontSize = '40px'; $('#eq').style.top = '70px';
const STX = ['Triad: three elements that behave alike', 'Add the first and the last, then halve', 'Middle weight ≈ average of the other two'];
const tStx = [wt('S1', 'triad'), wt('S3', 'Add'), wt('S4', 'middle')];
// rule card B: eight keys
const pk = $('#pkS'), keys = Array.from({ length: 8 }, (_, i) => { const g = mk(pk, 'g', {}); const r = mk(g, 'rect', { x: 36 + i * 64, y: 80, width: 56, height: 140, rx: 8, fill: '#FFFFFF', stroke: C.ink, 'stroke-width': 2.5 }); const t = txt(g, 36 + i * 64 + 28, 206, String(i + 1), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); return { r, t }; });
[0, 1, 3, 4, 5].forEach(i => mk(pk, 'rect', { x: 36 + i * 64 + 40, y: 80, width: 34, height: 84, rx: 5, fill: C.ink }));
const pkT = txt(pk, 680, 140, '8th', { 'text-anchor': 'middle', 'font-size': 40, fill: NC, 'font-weight': 600 }), pkT2 = txt(pk, 680, 180, 'LIKE 1st', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
// rule card C: periodic law, then predicted vs found
const law = document.createElement('div'); law.className = 'pane'; law.id = 'rxD';
law.innerHTML = `<div id="lw0" style="position:absolute;left:36px;top:76px;font:600 32px/1.3 Poppins;width:712px">Properties of the elements are a <span class="acc">periodic</span> function of their atomic weights.</div><div class="btag" id="lw1" style="left:36px;top:196px;background:var(--ac2);color:var(--ink)">PERIODIC = REPEATING AT REGULAR STEPS</div>`;
$('#rx').appendChild(law);
const CT = [['Atomic weight', '68', '70', '72', '72.6'], ['Density (g/cm³)', '5.9', '5.94', '5.5', '5.36'], ['Oxide', K('\\mathrm{E_2O_3}'), K('\\mathrm{Ga_2O_3}'), K('\\mathrm{EO_2}'), '?']];
$('#ctab').innerHTML = `<div class="cth" id="ch1" style="left:300px;color:${GC}">EKA-ALUMINIUM</div><div class="cth" id="ch2" style="left:510px;color:${NC}">GALLIUM · 1875</div>` +
  CT.map(([a], i) => `<div class="ctr" id="ctr${i}" style="top:${26 + i * 56}px;height:48px"><div class="c0">${a}</div><div class="c1" id="c1_${i}" style="color:${GC}"></div><div class="c2" id="c2_${i}"></div></div>`).join('');
// today: mini periodic table
const td = ptable($('#tdS'), { x: 36, y: 66, cell: 24, gap: 4, noF: true, rx: 3 });
const TD = [[tS1, ['Ca', 'Sr', 'Ba'], 'Ca · Sr · Ba', 'GROUP 2 TODAY'], [tS6, ['Li', 'Na', 'K'], 'Li · Na · K', 'GROUP 1 TODAY'], [wt('M4', 'chlorine'), ['F', 'Cl', 'Br', 'I'], 'F · Cl · Br · I', 'GROUP 17 TODAY'], [wt('M7', 'gallium'), ['Ga'], 'Ga', 'GROUP 13 TODAY'], [tB1, ['Ge'], 'Ge', 'GROUP 14 TODAY']];
const th1 = PUC.think($('#th1'), { q: `Silicon forms ${K('\\mathrm{SiO_2}')}. Which oxide should eka-silicon form?`, opts: [K('\\mathrm{EO_2}'), K('\\mathrm{E_2O_3}')], right: 0, why: `Same group, same way of combining. Germanium forms ${K(`${tc(NC, '\\mathrm{Ge}')}\\mathrm{O_2}`)}.` });
// bench beats
const tS2 = T0('S2'), tAdd = wt('S3', 'Add'), tHalf = wt('S3', 'Half'), tSr = wt('S4', 'strontium'), tFew = wt('S5', 'only');
const tLike = wt('S8', 'sodium'), tEvery = wt('S8', 'Every'), tCa = wt('S9', 'calcium'), tBroke = wt('S9', 'broke');
const tLaw = T0('M2'), tLight = wt('M3', 'Iodine'), tSwap = wt('M4', 'So'), tGap = wt('M5', 'gap'), tGapS = wt('M5', 'silicon'), tEka = wt('M6', 'eka'), tGa = wt('M7', 'gallium');
const tRow = [wt('M8', 'Atomic'), wt('M8', 'Density'), wt('M9', 'Oxide')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{eka-Al} \\rightarrow ${tc(NC, '\\mathrm{Ga}')}, \\qquad \\text{eka-Si} \\rightarrow ${tc(NC, '\\mathrm{Ge}')}`);

/* ---------- W: worked example + number line ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(HC, '35.5')} + ${tc(HC, '127')} = 162.5`)],
  [K(`162.5 \\div 2 = ${tc(GC, '81.25')}`)],
  [K(`${tc(NC, '\\mathrm{Br}')} = ${tc(NC, '80')} \\approx ${tc(GC, '81.25')}`)],
  [K(`\\text{Br sits in the middle of the triad} \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const s2 = $('#wS2'), X = v => 80 + (v - 30) * 6.24, LY = 300;
mk(s2, 'line', { x1: X(30), y1: LY, x2: X(130), y2: LY, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
[30, 50, 70, 90, 110, 130].forEach(v => { mk(s2, 'line', { x1: X(v), y1: LY, x2: X(v), y2: LY + 12, stroke: C.ink, 'stroke-width': 2 }); txt(s2, X(v), LY + 40, String(v), { 'text-anchor': 'middle', 'font-size': 18 }); });
const WP = [['Cl', 35.5, HC, '35.5'], ['Br', 80, NC, '80'], ['I', 127, HC, '127']];
const wDots = WP.map(([s, v, col, l]) => { const g = mk(s2, 'g', {}); mk(g, 'circle', { cx: X(v), cy: LY, r: 13, fill: col }); txt(g, X(v), LY - 62, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: col }); txt(g, X(v), LY - 30, l, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); return g; });
const brc = mk(s2, 'path', { d: `M${X(35.5)} ${LY - 92} C${X(35.5)} 120 ${X(127)} 120 ${X(127)} ${LY - 92}`, fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
const brT = txt(s2, X(81.25), 118, '35.5 + 127 = 162.5', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
const avg = mk(s2, 'g', {}); mk(avg, 'line', { x1: 0, y1: LY + 52, x2: 0, y2: LY + 4, stroke: GC, 'stroke-width': 4 }); mk(avg, 'path', { d: `M-11 ${LY + 66} L11 ${LY + 66} L0 ${LY + 50} Z`, fill: GC }); txt(avg, 0, LY + 100, 'AVERAGE 81.25', { 'text-anchor': 'middle', 'font-size': 20, fill: GC, 'font-weight': 600 });
const gapT = txt(s2, 392, 456, 'Br = 80 · only 1.25 away', { 'text-anchor': 'middle', 'font-size': 24, fill: NC, 'font-weight': 600 });
const tWl = [wt('W2', 'thirty'), wt('W2', 'eighty'), wt('W2', 'one')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Mendeleev arranged the elements by atomic number', right: 'Mendeleev: atomic weights. Atomic number: Moseley, 1913' });
const tsv = $('#tS');
mk(tsv, 'line', { x1: 70, y1: 120, x2: 490, y2: 120, stroke: C.line, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tn = [[120, '1869', 'MENDELEEV', 'ATOMIC WEIGHT', C.ok], [440, '1913', 'MOSELEY', 'ATOMIC NUMBER', NC]].map(([x, y, n, w, col]) => { const g = mk(tsv, 'g', {}); mk(g, 'circle', { cx: x, cy: 120, r: 13, fill: col }); txt(g, x, 92, y, { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 }); txt(g, x, 166, n, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); txt(g, x, 194, w, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'One-mark recall: triads, octaves, and which elements filled Mendeleev\'s gaps' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which statement about early classification of elements is correct?', qW: 780,
  opts: ['Newlands\' law of octaves held for all known elements', 'Mendeleev arranged elements by atomic number', 'Mendeleev\'s eka-aluminium was later found as gallium', 'In a triad, the middle weight is the sum of the other two'], right: 2, cols: 1, optW: 968, optY: 236, optH: 76, optFs: 28 });
const so = PUC.solution($('#so'), [[`<b>C</b> · eka-Al = Ga &nbsp;✓`], [`<b>A</b> · fails after Ca`], [`<b>B</b> · he used weights`], [`<b>D</b> · average, not sum`]], { y0: 100, dy: 112 });
const tSo = [T0('A1') + 0.3, T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · development of the periodic table', y0: 96, dy: 62, txt: [0, 1, 1, 1, 1, 1],
  lines: [K(`\\text{triad: } ${tc(NC, '\\mathrm{Sr}')} \\approx \\tfrac{40 + 137}{2} = ${tc(GC, '88.5')}`), '<b>Dobereiner, 1829</b>: triads; middle weight ≈ average of the other two', '<b>Newlands, 1865</b>: law of octaves; every 8th element like the 1st (up to Ca)', '<b>Mendeleev, 1869</b>: properties are a periodic function of atomic weights', '<b>Gaps</b>: eka-aluminium = gallium · eka-silicon = germanium', '<b>Properties over weight</b>: iodine placed after tellurium'] });
const YQ = ['Ca is 40 and Ba is 137. What weight does the triad rule give Sr?', 'Why did Newlands\' law of octaves fail after calcium?', 'Why did Mendeleev place iodine after tellurium?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 27', topic: 'If not atomic weight, then what? The Modern Periodic Law', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLight - 0.3, 1.06, 960, 600], [tGap - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(28 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three stories, Aarav's desk */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, tHid[i] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'periodic') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'mess') + 0.1) / 0.3); setBg(el, mix(C.soft, C.redBg, on)); });
    M.vis($('#hTz'), t, wt('H5', 'nobody') - 0.15, 1e9, POP);
  }

  /* P: elements known + families */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    KR.forEach(([, n, tt], i) => { M.vis($('#kr' + i), t, tt - 0.15, 1e9, { dy: 16 }); const u = M.io((t - tt) / 0.8);
      snap($('#kb' + i), 'width', (Math.max(0.01, u) * n / 118 * 400).toFixed(1) + 'px'); const kv = $('#kv' + i); kv.style.left = (150 + u * n / 118 * 400 + 18).toFixed(1) + 'px'; M.count(kv, t, tt, 0.8, 0, n);
      setBg($('#kb' + i), i === 2 ? C.ac : C.ink2); });
    M.vis($('#mdef'), t, wt('P3', 'impossible') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, T0('P2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const so2 = M.io((t - tSort) / 0.9);
    famT.forEach((f, j) => {
      const u = M.clamp(so2 * 1.4 - j * 0.035), x = M.lerp(f.s[0], f.d[0], M.io(u)), y = M.lerp(f.s[1], f.d[1], M.io(u));
      attr(f.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); fade(f.g, t, T0('P2') + 0.6 + j * 0.05, 1e9, 0.25);
      const fam = M.io((t - tLearn - 0.3) / 0.35) * (f.i === 0 ? 1 : 0), me = f.i === 0 && f.k === 1 ? M.io((t - tLearn) / 0.3) : 0;
      attr(f.bg, 'fill', me > 0 ? mix('#FFFFFF', NC, me) : mix('#FFFFFF', C.ac2, fam)); attr(f.bg, 'stroke', mix(C.ink, NC, Math.max(me, fam))); attr(f.tx, 'fill', mix(C.ink, '#FFFFFF', me));
    });
    FAM.forEach((_, i) => M.vis($('#fh' + i), t, wt('P4', 'families') + i * 0.1, 1e9, { dy: 8 }));
    M.vis($('#fP'), t, tLearn + 0.4, 1e9, POP);
  }

  /* U: timeline */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#tl'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    const lu = t < tTl[0] ? 0 : t < tTl[1] ? 0.122 + 0.379 * M.io((t - tTl[1] + 0.6) / 0.6) : 0.5 + 0.379 * M.io((t - tTl[2] + 0.6) / 0.6) + 0.121 * M.io((t - tTl[2]) / 0.8);
    M.drawU(tlOn, Math.max(M.io((t - tU - 0.3) / 0.6) * 0.122, lu)); fade(tlLine, t, tU + 0.2);
    tlDot.forEach((g, k) => { const u = M.spring(t - tTl[k] + 0.1, M.POP); attr(g, 'transform', `translate(${TLX[k]} 250) scale(${Math.max(0.01, u).toFixed(3)})`); M.hide(g, t < tTl[k] - 0.1); });
    TL.forEach((_, k) => { M.vis($('#tn' + k), t, tTl[k] - 0.05, 1e9, { dy: 20 }); fade(tlMini[k], t, tTl[k] + 0.35); });
  }

  /* S + M + B: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS2 - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tS2 + 0.3, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, 1e9, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'oxide') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Elements') });
    const sA = fade(stA, t, tS1 + 0.2, tS6 - 0.3), sB = fade(stB, t, tS6, tM1 - 0.3), sC = fade(stC, t, tM1);
    M.setT($('#bnL'), t < tS6 - 0.15 ? 'MOLECULE BENCH · DOBEREINER\'S TRIADS' : t < tM1 - 0.15 ? 'MOLECULE BENCH · NEWLANDS\' OCTAVES' : 'MOLECULE BENCH · MENDELEEV\'S TABLE');
    // stage A
    if (sA > 0) {
      tA.forEach((T, i) => { const u = M.spring(t - wt('S2', ['Calcium', 'strontium', 'barium'][i]) + 0.1, M.POP); attr(T.g, 'transform', `translate(${T.x} 200) scale(${Math.max(0.01, Math.min(u, 1.2)).toFixed(3)})`); M.hide(T.g, t < tS1); fade(T.wv, t, wt('S2', ['forty', 'eighty', 'one'][i]) - 0.05); });
      const lit = M.io((t - tSr) / 0.35); attr(tA[1].r, 'fill', mix('#FFFFFF', NC, lit)); attr(tA[1].t, 'fill', mix(NC, '#FFFFFF', lit));
      arcs.forEach(a => M.draw(a, t, tAdd, 0.6)); fade(sumG, t, tAdd + 0.4); M.setT(sumT, t < tHalf ? '40 + 137 = 177' : '177 ÷ 2 = 88.5'); attr(sumT, 'fill', t < tHalf ? C.ink : GC);
      fade(cmpG, t, tSr + 0.2);
    }
    // stage B
    if (sB > 0) {
      tB.forEach(T => { const tin = T.n < 8 ? tOct[T.n] - 0.1 : tEvery + 0.05 * (T.n - 8); const u = M.spring(t - tin, M.POP); attr(T.g, 'transform', `translate(${92 + T.col * 100} ${150 + T.row * 116}) scale(${Math.max(0.01, Math.min(u, 1.2)).toFixed(3)})`); M.hide(T.g, t < tin);
        const one = T.col === 0 ? M.io((t - (T.n === 0 ? tLike : T.n === 7 ? tLike + 0.15 : tEvery + 0.5)) / 0.3) : 0; attr(T.r, 'fill', mix('#FFFFFF', NC, one)); attr(T.r, 'stroke', mix(HC, NC, one)); attr(T.t, 'fill', mix(HC, '#FFFFFF', one));
        fade(T.bd, t, tin + 0.05, T.n < 8 ? tEvery + 0.3 : 1e9); if (T.n === 15) { const cu = M.io((t - tCa) / 0.3) * (1 - M.io((t - tBroke - 0.2) / 0.3)); attr(T.r, 'stroke-width', (3 + 3 * cu).toFixed(1)); } });
      fade(brk, t, tBroke - 0.1);
    }
    avA(t, tBroke + 0.4, tM1 - 0.35);
    // stage C
    if (sC > 0) {
      const sw = M.io((t - tSwap - 0.1) / 0.9);
      for (const s in tC) { const T = tC[s]; let x = gx(T.col), y = gy(T.row);
        if (s === 'Te' || s === 'I') { const from = s === 'I' ? 3 : 4, to = T.col; x = M.lerp(gx(from), gx(to), sw); y = gy(3) + Math.sin(sw * Math.PI) * (s === 'I' ? 54 : -54); }
        const tin = tM1 + 0.15 + T.row * 0.12 + T.col * 0.05, u = M.spring(t - tin, M.POP); attr(T.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${Math.max(0.01, Math.min(u, 1.15)).toFixed(3)})`); M.hide(T.g, t < tin);
        const fam = T.col === 4 ? M.io((t - wt('M4', 'chlorine') - (T.row * 0.12)) / 0.3) : 0, si = s === 'Si' ? M.io((t - wt('B1', 'silicon')) / 0.3) : 0;
        attr(T.r, 'fill', mix('#FFFFFF', s === 'I' ? NC : C.ac2, s === 'I' ? M.io((t - tSwap - 1) / 0.3) : Math.max(fam * 0, si))); attr(T.r, 'stroke', mix(HC, NC, Math.max(fam, si, s === 'I' ? M.io((t - tSwap - 1) / 0.3) : 0))); attr(T.t, 'fill', s === 'I' ? mix(HC, '#FFFFFF', M.io((t - tSwap - 1) / 0.3)) : HC);
        if (T.w) { fade(T.w, t, tLight - 0.1); attr(T.w, 'fill', s === 'I' ? mix(C.mute, '#FFFFFF', M.io((t - tSwap - 1) / 0.3)) : C.mute); }
      }
      fade(colBg, t, wt('M4', 'chlorine') - 0.1, tGap - 0.2, 0.3);
      gaps.forEach((G, c) => { const tg = c ? tGapS : wt('M5', 'aluminium'); M.draw(G.r, t, tg - 0.1, 0.6); fade(G.q, t, tg + 0.2, tEka + (c ? 0.4 : 0)); fade(G.e, t, tEka + (c ? 0.5 : 0.1)); const f = c ? 0 : M.io((t - tGa) / 0.35); G.f.style.opacity = f.toFixed(3); M.hide(G.f, f <= 0.01); G.ft.style.opacity = f.toFixed(3); M.hide(G.ft, f <= 0.01);
        attr(G.r, 'stroke-width', c && t > tB1 ? (3 + 2 * M.io((t - wt('B1', 'below')) / 0.3)).toFixed(1) : 3); });
    }
    // bench tag
    const TAG = [[wt('S1', 'triads'), 'TRIAD = GROUP OF THREE'], [tS2 + 0.3, 'THEY BEHAVE ALIKE'], [tAdd, 'ADD FIRST + LAST'], [tHalf, 'THEN HALVE'], [tSr, 'MIDDLE ≈ AVERAGE'], [tFew, 'ONLY A FEW WORKED'],
      [T0('S6') + 0.2, 'IN ORDER OF WEIGHT'], [tOct[7], '8th = Na'], [tLike, 'Na LIKE Li'], [T0('S9'), 'LAW OF OCTAVES'], [tBroke, 'BREAKS AFTER Ca'],
      [tM1 + 0.3, 'GROUPED BY BEHAVIOUR'], [tLight, 'I IS LIGHTER THAN Te'], [tSwap, 'PROPERTIES WIN'], [tGap, 'GAPS LEFT'], [tEka, 'EKA = ONE PLACE BELOW'], [tGa, 'eka-Al = Ga'], [tB1, 'NEXT: eka-Si']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    setBg(btag, t >= tFew && t < T0('S6') + 0.2 || t >= tBroke && t < tM1 + 0.3 ? C.red : C.ink);
    // rule card panes
    const pa = fade($('#rxA'), t, tS2 - 0.1, tS6 - 0.2, 0.2), pb = fade($('#rxB'), t, tS6 + 0.1, tM1 - 0.2, 0.2), pd = fade(law, t, tM1 + 0.1, tRow[0] - 0.35, 0.2), pc = fade($('#rxC'), t, tGa - 0.2, 1e9, 0.2);
    M.setT($('#rxL'), t < tS6 ? 'TRIAD RULE · DOBEREINER, 1829' : t < tM1 ? 'LAW OF OCTAVES · NEWLANDS, 1865' : t < tGa - 0.2 ? 'PERIODIC LAW · MENDELEEV, 1869' : 'GUESSED vs FOUND');
    if (pa) {
      PUC.write($('#eq0'), t, tAdd + 0.2, 1.2); PUC.write($('#eq1'), t, tSr - 0.05, 0.6);
      const si = tStx.reduce((a, tt, i) => t >= tt ? i : a, -1);
      if (si >= 0) { M.setT($('#eqN'), String(si + 1)); const tx = $('#eqT'); if (tx._s !== si) { tx._s = si; tx.innerHTML = STX[si]; } }
      M.vis($('#eqS'), t, tStx[0] - 0.1, 1e9, { dy: 12 });
      const pulse = si >= 0 ? M.io((t - tStx[si]) / 0.2) * (1 - M.io((t - tStx[si] - 0.6) / 0.4)) : 0; $('#eqN').style.background = mix(C.ac, GC, pulse);
    }
    if (pb) {
      keys.forEach((k, i) => { const on = M.io((t - tOct[i] + 0.05) / 0.2), hi = (i === 0 || i === 7) ? M.io((t - tLike) / 0.3) : 0;
        attr(k.r, 'fill', hi > 0 ? mix(C.ac2, NC, hi) : mix('#FFFFFF', C.ac2, on)); attr(k.t, 'fill', mix(C.ink, '#FFFFFF', hi)); });
      fade(pkT, t, tEvery - 0.1); fade(pkT2, t, tEvery);
    }
    if (pd) { PUC.write($('#lw0'), t, wt('M2', 'properties') - 0.1, 2.2); M.vis($('#lw1'), t, wt('M2', 'Periodic', 2) - 0.1, 1e9, POP); }
    if (pc) {
      const eks = t >= tB1 - 0.1;
      M.setT($('#ch1'), eks ? 'EKA-SILICON' : 'EKA-ALUMINIUM'); M.setT($('#ch2'), eks ? 'GERMANIUM · 1886' : 'GALLIUM · 1875');
      CT.forEach((r, i) => { const row = $('#ctr' + i); M.vis(row, t, eks ? tB1 + 0.1 * i : tRow[i] - 0.15, 1e9, { dx: -16, dy: 0 });
        const c1 = $('#c1_' + i), c2 = $('#c2_' + i), k1 = eks ? r[3] : r[1], k2 = eks ? r[4] : r[2];
        if (c1._k !== k1) { c1._k = k1; c1.innerHTML = k1; } if (c2._k !== k2) { c2._k = k2; c2.innerHTML = k2; }
        M.vis(c2, t, eks ? tB1 + 0.3 + 0.1 * i : tRow[i] + 0.6, 1e9, POP);
        setBg(row, mix(C.soft, C.okBg, eks ? 0 : M.io((t - wt('M9', 'perfect') + 0.1) / 0.3))); });
      M.vis($('#ch1'), t, tGa, 1e9, { dy: 8 }); M.vis($('#ch2'), t, tGa + 0.1, 1e9, { dy: 8 });
    }
    // today: mini table
    const ti = TD.reduce((a, d, i) => t >= d[0] ? i : a, 0), cur = TD[ti], u0 = M.io((t - cur[0] - 0.2) / 0.35), lit = new Set(cur[1].map(s => ZOF[s]));
    td.paint(Z => lit.has(Z) ? [NC, u0] : [NC, 0]);
    M.setT($('#tdA'), cur[2]); M.setT($('#tdB'), cur[3]); $('#tdR').style.opacity = u0.toFixed(3);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'good') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'predicts') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'predicts') + 0.4, 0.8);
  }

  /* W: worked example + number line */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wDots.forEach((g, i) => fade(g, t, tWl[i] - 0.1));
    M.draw(brc, t, tWs[0] + 0.2, 0.7); fade(brT, t, tWs[0] + 0.6);
    const am = M.io((t - tWs[1] - 0.2) / 0.8); attr(avg, 'transform', `translate(${M.lerp(X(35.5), X(81.25), am).toFixed(1)} 0)`); fade(avg, t, tWs[1] + 0.1, 1e9, 0.2);
    fade(gapT, t, tWs[2] + 0.4);
    M.vis($('#wGp'), t, wt('W7', 'Bromine') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Mendeleev') - 0.1, tStrike: wt('X3', 'not') - 0.1, tRight: wt('X3', 'Mendeleev') - 0.1 });
    fade(tn[0], t, wt('X3', 'weights') - 0.1); fade(tn[1], t, wt('X3', 'Moseley') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'correct'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
