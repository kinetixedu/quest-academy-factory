// PUC Biology Ep 19: Viroids and Prions (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// canon: DNA violet; batch: RNA teal, capsid warm grey, normal protein slate blue, misfolded protein (prion) rose
const BR = '#2E2A24', CHL = '#3E9B5F', DNA = '#7B4B94', RNA = '#0E8F8F', CAP = '#D9CFC0', CAPD = '#7D7264', PRO = '#4F7CAC', PRI = '#C0587E', RED = '#D64545', POT = '#D9B77E', POTD = '#8A6A3A', SOIL = '#B08E66', LEAF = '#8CC48F';
const hexP = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const wave = (x0, y, w, a, n) => { let d = `M${x0},${y}`; for (let k = 0; k < n; k++) d += ` q${w / n / 4},${-a} ${w / n / 2},0 t${w / n / 2},0`; return d; };
// viroid: a short closed RNA rod with little bumps (drawn around x,y with length L)
const viroid = (p, x, y, L, s = 1) => { let top = `M${x},${y}`, bot = ''; const n = 10; for (let k = 1; k <= n; k++) top += ` L${(x + L * k / n).toFixed(1)},${(y - 6 * s * (k % 2 ? 1 : -1) - 8 * s).toFixed(1)}`;
  for (let k = n; k >= 0; k--) bot += ` L${(x + L * k / n).toFixed(1)},${(y + 6 * s * (k % 2 ? 1 : -1) + 8 * s).toFixed(1)}`; return mk(p, 'path', { d: top + bot + ' Z', fill: 'none', stroke: RNA, 'stroke-width': 4 * s, 'stroke-linejoin': 'round' }); };
// proteins: N points, normal = smooth coil, prion = flat zigzag sheet
const NP = 28;
const coil = (cx, cy, s) => { const p = []; for (let k = 0; k < NP; k++) { const u = k / (NP - 1), a = u * Math.PI * 5; p.push([cx - 60 * s + 120 * s * u + 18 * s * Math.sin(a), cy + 26 * s * Math.cos(a)]); } return p; };
const zig = (cx, cy, s) => { const p = []; for (let k = 0; k < NP; k++) { const row = Math.floor(k / 7), c = k % 7, dir = row % 2 ? -1 : 1; p.push([cx + dir * (c - 3) * 20 * s, cy - 30 * s + row * 20 * s + (c % 2 ? 6 : -6) * s]); } return p; };
const line = (cx, cy, s) => { const p = []; for (let k = 0; k < NP; k++) p.push([cx - 140 * s + 280 * s * k / (NP - 1), cy + 6 * Math.sin(k)]); return p; };
const lerpP = (A, B, u) => A.map((a, i) => [a[0] + (B[i][0] - a[0]) * u, a[1] + (B[i][1] - a[1]) * u]);
const pd = P => 'M' + P.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');

Object.assign(M.IC, {
  potato: ['M5 9c0-4 4-6 8-5 5 1 7 5 6 9-1 5-5 8-9 7S5 14 5 9Z', 'M9 9h.01', 'M14 12h.01', 'M11 15h.01'],
  cow: ['M4 9c0-2 2-3 4-3h8c2 0 4 1 4 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', 'M6 6 4 3', 'M18 6l2-3', 'M9 12h.01', 'M15 12h.01', 'M10 15h4'],
  virus: ['M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z', 'M12 7V3', 'M12 21v-4', 'M7 12H3', 'M21 12h-4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tV1 = T0('V1'), tP1 = T0('P1'), tB1 = T0('B1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['potato', 'A spindle-shaped potato', 'LONG AND THIN', 'potato', 'NOT A VIRUS', ' bad'], ['cow', 'A cow that stumbles', 'CANNOT STAND', 'cow', 'NOT A VIRUS', ' bad'], ['virus', 'A virus', 'SMALLEST GERM SO FAR', 'virus', 'VIRUS', '']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n.replace('A spindle-shaped potato', 'A thin potato').replace('A cow that stumbles', 'A sick cow')}</div><div class="jw">${w.replace('SMALLEST GERM SO FAR', 'SMALLEST SO FAR')}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg, cl], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt${cl}" id="jt${i}">${tg}</div></div>`).join('');

/* ---------- D: from a virus ---------- */
const dS = $('#dS');
const dV = mk(dS, 'g', {}); mk(dV, 'path', { d: hexP(260, 270, 130), fill: CAP, stroke: BR, 'stroke-width': 5 }); mk(dV, 'path', { d: hexP(260, 270, 100), fill: '#F6F1E8', stroke: CAPD, 'stroke-width': 2 });
mk(dV, 'path', { d: 'M190,250 c20,-40 50,30 70,0 s50,-30 70,0 M200,300 c20,-30 50,30 70,0 s40,-20 60,0', stroke: RNA, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const dVt = [txt(dS, 260, 450, 'VIRUS', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 2, 'font-weight': 600, fill: C.ink }), txt(dS, 260, 480, 'NUCLEIC ACID + PROTEIN COAT', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 })];
const dA1 = PUC.arrow(dS, C.dim, 5, 18), dA2 = PUC.arrow(dS, C.dim, 5, 18);
const dR = mk(dS, 'g', {}); viroid(dR, 690, 270, 200, 1.4); const dRt = [txt(dR, 790, 450, 'VIROID', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 2, 'font-weight': 600, fill: RNA }), txt(dR, 790, 480, 'RNA · NO COAT', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 })];
const dP = mk(dS, 'g', {}); mk(dP, 'path', { d: pd(zig(1300, 270, 2.2)), stroke: PRI, 'stroke-width': 7, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
txt(dP, 1300, 450, 'PRION', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 2, 'font-weight': 600, fill: PRI }); txt(dP, 1300, 480, 'PROTEIN ONLY · NO NUCLEIC ACID', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 });
const dMinus = [txt(dS, 520, 236, 'NO COAT', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 }), txt(dS, 1050, 236, 'NO RNA OR DNA', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 })];

/* ---------- Z: zoom ladder ---------- */
const ZN = ['PLANT', 'TUBER', 'CELL', 'VIROID'], ZS = ['x1', 'x3', 'x400', 'x1,000,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Plant', 'Weak, with long thin tubers.', 'Potato spindle tuber disease.'],
  ['RUNG 2 OF 4', 'Tuber', 'The part we eat, stretched into a spindle.', 'A spindle is long and pointed at both ends.'],
  ['RUNG 3 OF 4', 'Cell', 'No virus to be seen.', 'Only tiny pieces of RNA.'],
  ['RUNG 4 OF 4', 'Viroid', 'Free RNA, with no protein coat.', 'Low molecular weight: very small RNA.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[520, 400, 60], [528, 263, 60], [600, 240, 36], null];
const LAB = [];
const spindle = (g, cx, cy, L, H) => mk(g, 'path', { d: `M${cx - L / 2},${cy} C${cx - L / 4},${cy - H} ${cx + L / 4},${cy - H} ${cx + L / 2},${cy} C${cx + L / 4},${cy + H} ${cx - L / 4},${cy + H} ${cx - L / 2},${cy} Z`, fill: POT, stroke: POTD, 'stroke-width': 4 });
{ const g = ZG[0];
  mk(g, 'rect', { x: 0, y: 300, width: 1056, height: 226, fill: SOIL });
  mk(g, 'path', { d: 'M528,300 L528,170 M528,230 L470,180 M528,210 L590,160 M528,190 L500,130', stroke: '#4E7A34', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  [[470, 180], [590, 160], [500, 130], [540, 150], [450, 210], [610, 200]].forEach(([x, y], k) => mk(g, 'ellipse', { cx: x, cy: y, rx: 34, ry: 18, fill: '#A9C48C', stroke: BR, 'stroke-width': 3, transform: `rotate(${k * 30 - 40} ${x} ${y})` }));
  mk(g, 'path', { d: 'M528,300 C520,340 470,380 420,400 M528,300 C540,350 580,380 640,400', stroke: '#8A6A3A', 'stroke-width': 4, fill: 'none' });
  spindle(g, 400, 410, 170, 34); spindle(g, 660, 405, 190, 36); spindle(g, 530, 450, 160, 30);
  LAB[0] = [[528, 200, 380, 90, 'Weak plant', 'end'], [700, 405, 860, 470, 'Spindle-shaped tubers', 'end']];
}
{ const g = ZG[1];
  mk(g, 'ellipse', { cx: 528, cy: 263, rx: 190, ry: 150, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '10 10' });
  spindle(g, 528, 263, 760, 130); [[360, 250], [520, 220], [700, 270], [600, 300]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 9, ry: 5, fill: POTD }));
  LAB[1] = [[860, 263, 900, 120, 'Spindle-shaped tuber', 'end'], [400, 130, 300, 70, 'Normal shape', 'end']];
}
{ const g = ZG[2];
  mk(g, 'rect', { x: 230, y: 50, width: 600, height: 420, rx: 40, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 248, y: 68, width: 564, height: 384, rx: 28, fill: '#FBF6EA', stroke: '#B7A36A', 'stroke-width': 3 });
  mk(g, 'circle', { cx: 330, cy: 380, r: 34, fill: '#D7C3E6', stroke: DNA, 'stroke-width': 3 });
  [[300, 120, 60], [440, 300, 80], [560, 160, 70], [700, 400, 64], [640, 300, 50]].forEach(([x, y, r]) => mk(g, 'ellipse', { cx: x, cy: y, rx: r * 0.6, ry: r * 0.42, fill: '#F1E7CF', stroke: '#C9B58A', 'stroke-width': 2 }));
  const r = M.rng(23); for (let k = 0; k < 14; k++) { const x = 300 + r() * 460, y = 100 + r() * 330; if (Math.hypot(x - 330, y - 380) < 60) continue; viroid(g, x, y, 34, 0.45); }
  viroid(g, 580, 240, 40, 0.5);
  LAB[2] = [[250, 160, 200, 110, 'Tuber cell', 'end'], [600, 240, 880, 160, 'Tiny pieces of RNA', 'end']];
}
{ const g = ZG[3];
  mk(g, 'path', { d: hexP(840, 263, 150), fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '10 10' });
  txt(g, 840, 450, 'A VIRUS, FOR SIZE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 });
  viroid(g, 150, 263, 420, 2.2);
  LAB[3] = [[360, 240, 300, 90, 'Free RNA', 'end'], [520, 300, 440, 430, 'No protein coat', 'end'], [180, 290, 140, 470, 'Low molecular weight', 'start']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'weak'), wt('Z2', 'tubers')], [wt('Z3', 'tuber'), wt('Z3', 'spindle')], [wt('Z4', 'cell'), wt('Z4', 'RNA')], [wt('Z5', 'free'), wt('Z5', 'coat'), wt('Z5', 'low')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Not even a coat!' });

/* ---------- V: Diener ---------- */
const VK = [['DISEASE', 'Potato spindle tuber', wt('V2', 'potato')], ['MADE OF', 'Free RNA', wt('V3', 'free')], ['COAT', 'None', wt('V3', 'lacked')]];
$('#vks').innerHTML = VK.map(([k, v], i) => `<div class="kv" id="vk${i}" style="top:${270 + i * 80}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
const crS = $('#crS');
const vCap = mk(crS, 'path', { d: hexP(392, 250, 140), fill: CAP, stroke: BR, 'stroke-width': 5 }); const vR = viroid(crS, 310, 250, 164, 1.2);
const vWord = mk(crS, 'text', { x: 392, y: 470, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 56, 'font-weight': 700, fill: C.ink }); vWord.textContent = 'virus';
const vNote = txt(crS, 392, 520, 'LIKE A VIRUS, MINUS THE COAT', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });

/* ---------- P: prion steps ---------- */
const STEPS = [['A protein folds', 'its exact shape decides its job'], ['A prion is misfolded', 'an abnormally folded protein'], ['It passes the misfold on', 'a normal protein of the same kind folds wrongly'],
  ['A chain reaction', 'two, then four, then many'], ['Nerve cells are damaged', 'so prion diseases are neurological']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['P2', 'P3', 'P4', 'P5', 'P6'].map(id => T0(id) + 0.45);
const pS = $('#pS');
const pA = mk(pS, 'path', { d: '', stroke: PRO, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const pB = mk(pS, 'path', { d: '', stroke: PRI, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const many = []; for (let k = 0; k < 8; k++) many.push(mk(pS, 'path', { d: '', stroke: PRI, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
const pLbl = [txt(pS, 0, 0, 'NORMAL PROTEIN', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: PRO }), txt(pS, 0, 0, 'PRION', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: PRI })];
const neu = mk(pS, 'g', {}); mk(neu, 'circle', { cx: 392, cy: 300, r: 60, fill: '#E6D2EF', stroke: BR, 'stroke-width': 4 }); mk(neu, 'circle', { cx: 392, cy: 300, r: 20, fill: DNA });
[[332, 290, 200, 210], [340, 330, 220, 420], [420, 250, 470, 140], [450, 310, 640, 330], [640, 330, 700, 280], [640, 330, 690, 400]].forEach(([a, b, c, d]) => mk(neu, 'path', { d: `M${a},${b} L${c},${d}`, stroke: BR, 'stroke-width': 5, 'stroke-linecap': 'round' }));
const plaq = []; const rP = M.rng(61); for (let k = 0; k < 12; k++) plaq.push({ e: mk(pS, 'path', { d: '', stroke: PRI, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' }), x: 240 + rP() * 320, y: 200 + rP() * 220 });
const neuT = txt(pS, 392, 500, 'NERVE CELL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 });
const avP = PUC.avatar($('#sP'), { x: 976 + 36, y: 270 + 470 - 80, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'One bad fold copies itself!' });

/* ---------- B: diseases ---------- */
const bS = $('#bS');
const brain = mk(bS, 'path', { d: 'M200,300 C180,200 260,120 360,130 C400,90 500,100 540,150 C620,150 660,220 640,290 C670,350 610,400 540,390 C500,420 420,420 380,400 C300,420 220,380 200,300 Z', fill: '#F2D9DE', stroke: BR, 'stroke-width': 5 });
[['M300,180 C330,210 320,250 350,270'], ['M420,150 C440,190 420,230 450,260'], ['M520,190 C500,230 540,260 520,300'], ['M300,320 C340,300 380,330 420,310']].forEach(([d]) => mk(bS, 'path', { d, stroke: '#B58A92', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' }));
const holes = []; const rH = M.rng(19); for (let k = 0; k < 22; k++) { const x = 250 + rH() * 360, y = 170 + rH() * 200; holes.push(mk(bS, 'circle', { cx: x, cy: y, r: 0, fill: '#FFFFFF', stroke: '#B58A92', 'stroke-width': 2 })); }

/* ---------- C: compare three ---------- */
const C3 = [['VIRUS', 'Virus', [['NUCLEIC ACID', 'RNA or DNA'], ['PROTEIN COAT', 'Yes'], ['EXAMPLE', 'Tobacco mosaic virus']], 'C2'], ['VIROID', 'Viroid', [['NUCLEIC ACID', 'Free RNA, small'], ['PROTEIN COAT', 'No'], ['EXAMPLE', 'Potato spindle tuber']], 'C3'],
  ['PRION', 'Prion', [['NUCLEIC ACID', 'None'], ['MADE OF', 'Misfolded protein'], ['EXAMPLE', 'Mad cow disease']], 'C4']];
$('#c3s').innerHTML = C3.map(([h, n, rows], i) => `<div class="card c3" id="cc${i}" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:30px">${h}</div><svg id="cs${i}" width="512" height="220" style="position:absolute;left:0;top:60px"></svg>
  ${rows.map(([k, v], j) => `<div class="kr" id="cr${i}${j}" style="top:${300 + j * 60}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>`).join('');
{ const s = $('#cs0'); mk(s, 'path', { d: hexP(256, 110, 80), fill: CAP, stroke: BR, 'stroke-width': 4 }); mk(s, 'path', { d: 'M210,100 c16,-26 32,16 48,0 s30,-20 46,0 M214,130 c16,-20 30,16 46,0', stroke: RNA, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }
viroid($('#cs1'), 146, 110, 220, 1.3);
mk($('#cs2'), 'path', { d: pd(zig(256, 110, 1.8)), stroke: PRI, 'stroke-width': 6, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const th1 = PUC.think($('#th1'), { q: 'An agent has RNA, but no protein coat. Virus or viroid?', opts: ['Virus', 'Viroid'], right: 1, why: 'Viroid. A virus always has a protein coat. A viroid is free RNA.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">VIRUS = RNA/DNA + COAT · <b>VIROID</b> = RNA · <b>PRION</b> = PROTEIN</span>';

/* ---------- W: classification key ---------- */
const wS = $('#wS');
const KQ = [['Nucleic acid?', 120, 120], ['Protein coat?', 620, 120]];
const KB2 = [['PRION', 120, 340], ['VIROID', 620, 340], ['VIRUS', 1120, 340]];
$('#wks').innerHTML = KQ.map(([q, x, y], i) => `<div class="kq" id="kq${i}" style="left:${x}px;top:${y}px">${i + 1} · ${q}</div>`).join('') + KB2.map(([h, x, y], i) => `<div class="kbin" id="kb${i}" style="left:${x - 20}px;top:${y}px"><div class="h">${h}</div></div>`).join('')
  + [['NO', 150, 250], ['NO', 650, 250], ['YES', 430, 140], ['YES', 930, 140]].map(([s, x, y], i) => `<div class="kyn" id="ky${i}" style="left:${x}px;top:${y}px;color:${s === 'NO' ? 'var(--red)' : 'var(--ok)'}">${s}</div>`).join('');
const kLines = ['M220,184 L220,340', 'M720,184 L720,340', 'M420,152 L600,152', 'M920,152 L1260,152 L1260,340'].map(d => mk(wS, 'path', { d, stroke: C.dim, 'stroke-width': 4, fill: 'none' }));
const AG = [['BSE agent', 0, wt('W2', 'BSE')], ['Potato spindle tuber agent', 1, wt('W3', 'potato')], ['Tobacco mosaic virus', 2, wt('W4', 'tobacco')], ['Bacteriophage', 2, wt('W4', 'bacteriophage')]];
$('#wks').insertAdjacentHTML('beforeend', AG.map(([n], i) => `<div class="kag" id="ag${i}">${n}</div>`).join(''));
const agPos = (i, u) => { const bin = AG[i][1], start = [40, 40], q1 = [130, 200], q2 = [630, 200], end = [KB2[bin][1] - 4, KB2[bin][2] + 50 + (i === 3 ? 50 : 0)];
  const pts = bin === 0 ? [start, q1, end] : bin === 1 ? [start, q1, [400, 160], q2, end] : [start, q1, [400, 160], q2, [900, 160], end];
  const n = pts.length - 1, f = M.clamp(u) * n, k = Math.min(n - 1, Math.floor(f)), r = f - k; return [pts[k][0] + (pts[k + 1][0] - pts[k][0]) * r, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * r]; };

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Viroid RNA is of high molecular weight', right: 'Viroid RNA is of low molecular weight, with no protein coat' });
const tS = $('#tS'); const tVr = mk(tS, 'g', {}); viroid(tVr, 60, 120, 120, 1); txt(tVr, 120, 200, 'VIROID · SMALL RNA', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: RNA });
const tVi = mk(tS, 'g', {}); mk(tVi, 'path', { d: hexP(340, 120, 76), fill: CAP, stroke: BR, 'stroke-width': 4 }); txt(tVi, 340, 230, 'VIRUS · BIGGER', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: CAPD });
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Statement questions: which line about viroids is wrong' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Viroids were discovered by T. O. Diener in 1971.</div><div class="sl"><b>II</b>Viroids have a protein coat but no RNA.</div><div class="sl"><b>III</b>Prions are agents made of abnormally folded protein.</div><div class="sl"><b>IV</b>BSE is a viroid disease of cattle.</div>',
  opts: ['I and III only', 'I, II and III only', 'III and IV only', 'I, III and IV only'], right: 0, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (I, III)'], ['<b style="color:var(--red)">II</b>: no coat, free RNA'], ['<b style="color:var(--red)">IV</b>: BSE is a prion disease'], ['<b style="color:var(--ok)">I</b>: Diener, 1971'], ['<b style="color:var(--ok)">III</b>: misfolded protein']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A3', 'Four'), wt('A3', 'prion') + 0.4, wt('A3', 'viroid') + 0.3];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · viroids and prions', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Viroid</b>: free RNA, no protein coat, low molecular weight', '<b>T. O. Diener, 1971</b>: potato spindle tuber disease', '<b>Prion</b>: abnormally folded protein, virus-sized',
    '<b>BSE</b> (mad cow disease) in cattle · <b>CJD</b> in humans', '<b>Virus</b> RNA/DNA + coat · <b>viroid</b> RNA · <b>prion</b> protein'] });
const YQ = ['What does a viroid lack that a virus has?', 'What is a prion made of?', 'What does the word spongiform tell you about BSE?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 20', topic: 'Curd, idli and compost? Importance of Microorganisms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('P4') - 0.3, 1.05, 960, 600], [T0('B1') - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; ['bw0', 'bw1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 20; });
  [['bm0', 'bw0', 206], ['bm1', 'bw1', 206], ['bm2', 'bw2', 390]].forEach(([m, b, y]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft) + 'px'; e.style.top = y + 'px'; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, (i < 2 ? wt('H2', 'not') : wt('H2', 'virus')) - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'simpler') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'Something') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    M.vis($('#tq3 .lbl'), t, tH4, 1e9, { dy: 8 });
    M.vis($('#tq0'), t, wt('H4', 'viroids') - 0.2, 1e9, { dx: -20, dy: 0 }); M.vis($('#tq1'), t, wt('H4', 'prions') - 0.2, 1e9, { dx: -20, dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dw'), t, tD1 + 0.05, OUT('Z1'), { dy: 36, ...o });
    M.vis(dV, t, T0('D2') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 }); dVt.forEach((e, i) => M.vis(e, t, wt('D2', 'protein') - 0.1 + i * 0.2, 1e9, { dy: 6 }));
    const tv = wt('D3', 'viroid'), tp = wt('D3', 'prion');
    { const u = M.io((t - wt('D3', 'RNA') + 0.2) / 0.6); if (u <= 0) dA1.set(0, 0, 0, 0); else dA1.set(420, 270, 420 + 200 * u, 270); M.vis(dMinus[0], t, wt('D3', 'coat') - 0.1, 1e9, { dy: 6 }); }
    M.vis(dR, t, tv - 0.2, 1e9, { ...POP, sc: 0.5 });
    { const u = M.io((t - wt('D3', 'nucleic') + 0.2) / 0.6); if (u <= 0) dA2.set(0, 0, 0, 0); else dA2.set(940, 270, 940 + 200 * u, 270); M.vis(dMinus[1], t, wt('D3', 'nucleic'), 1e9, { dy: 6 }); }
    M.vis(dP, t, tp - 0.2, 1e9, { ...POP, sc: 0.5 });
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tV1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('V1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 3 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'coat') + 0.3, out);
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tP1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('P1');
    M.vis($('#cl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cr'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const ev = $('#ev0'); M.vis(ev, t, wt('V2', 'nineteen') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis(ev.querySelector('.dt'), t, wt('V2', 'nineteen') - 0.15, 1e9, { ...POP, sc: 0.3 });
    VK.forEach((v, i) => M.vis($('#vk' + i), t, v[2] - 0.15, 1e9, { dx: -16, dy: 0 }));
    const lk = M.io((t - wt('V3', 'lacked')) / 0.8); vCap.style.opacity = (1 - lk).toFixed(2); attr(vCap, 'transform', `translate(392 250) scale(${(1 + 0.3 * lk).toFixed(3)}) translate(-392 -250)`);
    M.vis(vR, t, T0('V3') + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 });
    M.setT(vWord, t >= wt('V3', 'viroid') - 0.1 ? 'viroid' : 'virus'); vWord.setAttribute('fill', t >= wt('V3', 'viroid') - 0.1 ? RNA : C.ink); M.vis(vWord, t, T0('V3') + 0.2, 1e9, { dy: 8 });
    M.vis(vNote, t, wt('V3', 'viroid') + 0.2, 1e9, { dy: 6 });
  }

  /* P: prions */
  const pOn = t >= tP1 - 0.1 && t < tB1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('B1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    const fold = M.io((t - tSt[0] - 0.3) / 1.4), mis = M.io((t - tSt[1]) / 0.8), conv = M.io((t - wt('P4', 'fold') + 0.3) / 1.0), chain = M.clamp((t - tSt[3]) / 3.0), dmg = M.io((t - tSt[4]) / 1.0);
    // step 1: a chain folds (single protein centred); step 2+: normal on the left, prion on the right
    const s2 = t >= tSt[1] - 0.2;
    const Aat = s2 ? [250, 270] : [392, 270], Bat = [540, 270];
    const A = s2 ? lerpP(coil(Aat[0], Aat[1], 1.2), zig(Aat[0], Aat[1], 1.2), conv) : lerpP(line(392, 270, 1), coil(392, 270, 1.4), fold);
    attr(pA, 'd', pd(A)); pA.setAttribute('stroke', mix(PRO, PRI, conv)); M.hide(pA, t < tSt[0] - 0.3 || dmg > 0.3); pA.style.opacity = (1 - chain * 1.2).toFixed(2);
    const Bx = Bat[0] - 120 * M.io((t - wt('P4', 'meets') + 0.2) / 0.8) * (1 - conv);
    attr(pB, 'd', pd(zig(Bx, Bat[1], 1.2))); M.hide(pB, mis <= 0 || dmg > 0.3); pB.style.opacity = (mis * (1 - chain * 1.2)).toFixed(2);
    attr(pLbl[0], 'x', Aat[0]); attr(pLbl[0], 'y', 360); attr(pLbl[1], 'x', Bx); attr(pLbl[1], 'y', 360); M.setT(pLbl[0], conv > 0.5 ? 'NOW A PRION' : 'NORMAL PROTEIN'); pLbl[0].setAttribute('fill', conv > 0.5 ? PRI : PRO);
    M.vis(pLbl[0], t, tSt[0] + 0.6, tSt[3], { dy: 6 }); M.vis(pLbl[1], t, tSt[1] + 0.3, tSt[3], { dy: 6 });
    const n = chain <= 0 ? 0 : chain < 0.33 ? 2 : chain < 0.66 ? 4 : 8;
    many.forEach((m, k) => { const col = k % 4, row = Math.floor(k / 4); attr(m, 'd', pd(zig(170 + col * 150, 220 + row * 130, 0.85))); M.hide(m, k >= n || dmg > 0.5); m.style.opacity = (1 - dmg * 2).toFixed(2); });
    M.setT($('#pcN'), String(t < tSt[1] ? 0 : t < wt('P4', 'too') ? 1 : n < 2 ? 2 : n)); M.vis($('#pcnt'), t, tSt[1], 1e9, POP);
    M.vis(neu, t, tSt[4] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.SOFT, fade: 0.2 }); M.vis(neuT, t, tSt[4] + 0.2, 1e9, { dy: 6 });
    plaq.forEach((p, k) => { const on = M.io((t - tSt[4] - 0.6 - k * 0.12) / 0.3); attr(p.e, 'd', pd(zig(p.x, p.y, 0.5))); M.hide(p.e, on <= 0); p.e.style.opacity = on; });
    neu.style.filter = `saturate(${(1 - 0.7 * M.io((t - tSt[4] - 1.4) / 1.2)).toFixed(2)})`;
    avP(t, wt('P5', 'chain') + 0.4, OUT('P6'));
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tC1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('C1');
    M.vis($('#ba'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bb'), t, T0('B3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tw = [wt('B2', 'bovine'), wt('B2', 'spongiform'), wt('B2', 'encephalopathy')], tm = [wt('B3', 'cattle'), wt('B3', 'sponge'), wt('B3', 'brain')];
    [0, 1, 2].forEach(i => { M.vis($('#bw' + i), t, tw[i] - 0.1, 1e9, POP); M.vis($('#bm' + i), t, tm[i] - 0.2, 1e9, POP); });
    M.vis($('#bP'), t, wt('B2', 'mad') - 0.1, 1e9, POP);
    M.vis(brain, t, T0('B3') + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.SOFT, fade: 0.15 });
    const th = wt('B3', 'holes'); holes.forEach((h, k) => attr(h, 'r', (11 * M.io((t - th + 0.3 - k * 0.07) / 0.3)).toFixed(1)));
    M.vis($('#bQ'), t, wt('B4', 'CJD') - 0.2, 1e9, POP); M.vis($('#bR'), t, wt('B4', 'size') - 0.2, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    C3.forEach((c, i) => { const el = $('#cc' + i), tt = T0(c[3]); M.vis(el, t, i ? tt - 0.2 : tC1 + 0.2, out, { dy: 36, ...o });
      c[2].forEach((_, j) => M.vis($('#cr' + i + j), t, tt + 0.3 + j * 0.5, 1e9, { dx: -12, dy: 0 })); el.style.borderTopColor = mix(C.dim, C.ac, M.io((t - tt) / 0.3)); });
    M.vis($('#th1'), t, T0('C5') + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: T0('C5'), tOpts: wt('C5', 'Virus') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'virus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Viroid') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'protein') - 0.1, 0.9);
  }

  /* W: key */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    M.vis($('#kq0'), t, T0('W2') - 0.1, 1e9, POP); M.vis($('#kq1'), t, T0('W3') - 0.1, 1e9, POP);
    kLines.forEach((l, i) => M.draw(l, t, [T0('W2') + 0.3, T0('W3') + 0.3, T0('W3') + 0.1, T0('W4') - 0.1][i], 0.5));
    [0, 1, 2, 3].forEach(i => M.vis($('#ky' + i), t, [wt('W2', 'not'), wt('W3', 'not'), T0('W3'), T0('W4')][i], 1e9, { dy: 6 }));
    KB2.forEach((_, i) => { const el = $('#kb' + i); M.vis(el, t, [wt('W2', 'prion'), wt('W3', 'viroid'), wt('W4', 'virus')][i] - 0.2, 1e9, { dy: 10 }); });
    AG.forEach((a, i) => { const el = $('#ag' + i), tt = a[2]; M.vis(el, t, tt - 0.3, 1e9, POP); const u = M.io((t - tt) / 1.6), [x, y] = agPos(i, u); el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      el.style.background = u >= 1 ? C.ac2 : '#FFFFFF'; el.style.boxShadow = u >= 1 ? 'none' : ''; });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'viroid') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'low') - 0.1 });
    M.vis(tVr, t, wt('X3', 'low'), 1e9, { ...POP, sc: 0.5 }); M.vis(tVi, t, wt('X3', 'smaller') - 0.2, 1e9, { ...POP, sc: 0.5 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'statement') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Read') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 }); so(t, tAns + 0.1, tSo);
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
