// PUC Biology Ep 20: Economic and Ecological Importance of Microorganisms (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// canon: CO2 grey, nucleus violet, chlorophyll green, water sky; batch: bacterium sand, milk protein cream, acid terracotta, yeast cream
const BR = '#2E2A24', CHL = '#3E9B5F', NUC = '#7B4B94', WAT = '#5AA0C8', CO2 = '#6B7280', GOLD = '#C9962B', RED = '#D64545';
const BAC = '#F3DFA8', BACD = '#9A7A2E', PROT = '#FFF6E2', PROTD = '#C9B58A', ACID = '#E07A5F', YEA = '#F6E7C4', SOIL = '#8A6A4A', SOILL = '#B08E66', LEAF = '#8CC48F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const rod = (p, x, y, a = 0, s = 1) => mk(p, 'rect', { x: x - 22 * s, y: y - 8 * s, width: 44 * s, height: 16 * s, rx: 8 * s, fill: BAC, stroke: BACD, 'stroke-width': 2.5 * s, transform: `rotate(${a} ${x} ${y})` });

Object.assign(M.IC, {
  bowl: ['M3 11h18a9 7 0 0 1-18 0Z', 'M8 21h8', 'M8 7c0-1.5 1.5-1.5 1.5-3', 'M13 7c0-1.5 1.5-1.5 1.5-3'],
  pot: ['M5 9h14v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z', 'M4 9h16', 'M9 6a3 3 0 0 1 6 0'],
  pit: ['M3 10h18', 'M5 10l2 10h10l2-10', 'M9 6c1-2 3-2 3-4', 'M14 7c1-1 2-1 2-3'],
  factory: ['M2 20V9l6 4V9l6 4V5h3l1 15Z', 'M2 20h20'],
  sprout: ['M7 20h10', 'M12 20v-8', 'M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z', 'M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z'],
  flame: ['M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-6 2 1 3 2 3 4 1-3 1-6 1-9Z'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20', 'M12 2a15 15 0 0 0 0 20'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tM1 = T0('M1'), tU1 = T0('U1'), tC1 = T0('C1'), tL1 = T0('L1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['bowl', 'A bowl of curd', 'MILK SET OVERNIGHT', 'curd', 'BACTERIA'], ['pot', 'Idli batter, puffed up', 'FERMENTED OVERNIGHT', 'idli', 'BACTERIA'], ['pit', 'A compost pit', 'PEELS TURN TO SOIL', 'compost', 'MICROBES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n.replace('Idli batter, puffed up', 'Idli batter')}</div><div class="jw">${w.replace('FERMENTED OVERNIGHT', 'PUFFED UP')}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const PL4 = [['home', 'At home', 'home'], ['factory', 'In factories', 'factories'], ['sprout', 'On farms', 'farms'], ['globe', 'In nature', 'nature']];
$('#pl4s').innerHTML = PL4.map(([ic, n], i) => `<div class="pl4" id="pl${i}" style="left:${36 + (i % 2) * 372}px;top:${96 + Math.floor(i / 2) * 176}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="q">${n}</div></div>`).join('');

/* ---------- D ---------- */
const dS = $('#dS');
const dB = mk(dS, 'g', {}); [[120, 200, 20], [170, 240, -30], [110, 270, 60]].forEach(([x, y, a]) => rod(dB, x, y, a, 1.6)); txt(dB, 140, 360, 'BACTERIA', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600 });
const dY = mk(dS, 'g', {}); mk(dY, 'ellipse', { cx: 392, cy: 240, rx: 70, ry: 56, fill: YEA, stroke: BR, 'stroke-width': 4 }); mk(dY, 'circle', { cx: 382, cy: 244, r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(dY, 'circle', { cx: 466, cy: 196, r: 26, fill: YEA, stroke: BR, 'stroke-width': 4 });
txt(dY, 392, 360, 'FUNGI · YEAST', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600 });
const dPr = mk(dS, 'g', {}); mk(dPr, 'path', { d: 'M560,240 C560,170 620,160 650,180 C700,170 720,220 700,250 C730,290 690,320 650,300 C610,330 560,300 560,240 Z', fill: '#E9DDF0', stroke: BR, 'stroke-width': 4 }); mk(dPr, 'circle', { cx: 640, cy: 240, r: 18, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 });
txt(dPr, 640, 360, 'PROTISTS', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600 });
const DH = [['Cholera', 'cholera', 0], ['Typhoid', 'typhoid', 0], ['Tetanus', 'tetanus', 0]];
$('#dhs').innerHTML = `<div class="lbl" style="left:36px;top:84px;color:var(--red)">HARMFUL · BACTERIA CAUSE</div>` + DH.map(([n], i) => `<div class="hz" id="dh${i}" style="left:${36 + i * 196}px;top:120px;background:var(--redBg);color:var(--red)">${M.icon('x', 20, C.red, 3)}${n}</div>`).join('')
  + `<div class="lbl" style="left:36px;top:220px;color:var(--ok)" id="dhU">USEFUL · EVERY SINGLE DAY</div>` + ['Curd', 'Bread', 'Medicines', 'Biogas', 'Soil'].map((n, i) => `<div class="hz" id="du${i}" style="left:${36 + (i % 3) * 236}px;top:${256 + Math.floor(i / 3) * 68}px;background:var(--okBg);color:#1F6B3F">${M.icon('check', 20, C.ok, 3)}${n}</div>`).join('');

/* ---------- Z: zoom ladder ---------- */
const ZN = ['BOWL', 'CURD', 'BACTERIA', 'MOLECULE'], ZS = ['x1', 'x40', 'x1,000', 'x10,000,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Bowl', 'Thick, a little sour.', 'Last night it was runny milk.'],
  ['RUNG 2 OF 4', 'Curd', 'Milk proteins clumped into a soft mesh.', 'The mesh makes curd thick.'],
  ['RUNG 3 OF 4', 'Bacteria', 'Rod-shaped Lactobacillus and relatives.', 'Called lactic acid bacteria, or LAB.'],
  ['RUNG 4 OF 4', 'Molecule', 'Lactic acid, made by LAB.', 'Sour taste; makes milk proteins clump.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[528, 200, 50], [500, 260, 50], [560, 250, 30], null];
const LAB = [];
{ const g = ZG[0];
  mk(g, 'path', { d: 'M220,200 C220,380 330,450 528,450 C726,450 836,380 836,200 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: 528, cy: 200, rx: 308, ry: 70, fill: '#FBF7EE', stroke: BR, 'stroke-width': 5 });
  mk(g, 'path', { d: 'M360,190 C420,170 480,210 540,190 C600,170 660,210 700,190', stroke: '#E6DDC9', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M700,220 L900,90', stroke: '#9AA0AC', 'stroke-width': 12, 'stroke-linecap': 'round' }); mk(g, 'ellipse', { cx: 690, cy: 226, rx: 30, ry: 16, fill: '#C9CDD4', stroke: '#9AA0AC', 'stroke-width': 3 });
  LAB[0] = [[420, 200, 300, 80, 'Thick curd', 'end'], [300, 380, 180, 450, 'Bowl', 'end']];
}
{ const g = ZG[1], r = M.rng(5);
  mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#FDFBF4' });
  const cl = []; for (let k = 0; k < 26; k++) cl.push([80 + r() * 900, 70 + r() * 400]);
  cl.forEach(([x, y], k) => { cl.forEach(([x2, y2], j) => { if (j > k && Math.hypot(x - x2, y - y2) < 170) mk(g, 'line', { x1: x, y1: y, x2, y2, stroke: PROTD, 'stroke-width': 6, 'stroke-linecap': 'round' }); }); });
  cl.forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 22 + r() * 14, fill: PROT, stroke: PROTD, 'stroke-width': 3 }));
  LAB[1] = [[cl[3][0], cl[3][1], 820, 70, 'Clumped milk proteins', 'end'], [500, 260, 200, 470, 'Soft mesh', 'start']];
}
{ const g = ZG[2], r = M.rng(9);
  mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#FDFBF4' });
  [[240, 160, 80], [760, 140, 90], [380, 400, 70], [820, 400, 80]].forEach(([x, y, s]) => mk(g, 'circle', { cx: x, cy: y, r: s, fill: PROT, stroke: PROTD, 'stroke-width': 4 }));
  for (let k = 0; k < 22; k++) { const x = 120 + r() * 820, y = 60 + r() * 420; if ([[240, 160, 80], [760, 140, 90], [380, 400, 70], [820, 400, 80]].some(([a, b, s]) => Math.hypot(x - a, y - b) < s + 30)) continue; rod(g, x, y, r() * 180, 1.4); }
  rod(g, 560, 250, 20, 1.6);
  LAB[2] = [[560, 250, 640, 470, 'Lactobacillus (rod-shaped)', 'start'], [760, 210, 640, 60, 'Milk protein', 'end']];
}
{ const g = ZG[3];
  const A = { C1: [340, 300], C2: [528, 230], C3: [716, 300], O1: [528, 90], O2: [716, 440], O3: [880, 230], H: [[200, 250], [300, 440], [390, 160]], H2: [470, 330] };
  const bond = (a, b, dbl) => { mk(g, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: BR, 'stroke-width': 6 }); if (dbl) mk(g, 'line', { x1: a[0] + 14, y1: a[1] + 4, x2: b[0] + 14, y2: b[1] + 4, stroke: BR, 'stroke-width': 6 }); };
  bond(A.C1, A.C2); bond(A.C2, A.C3); bond(A.C2, A.O1); bond(A.C3, A.O2, true); bond(A.C3, A.O3); A.H.forEach(h => bond(A.C1, h)); bond(A.C2, A.H2);
  const at = (p, r, f, s) => { mk(g, 'circle', { cx: p[0], cy: p[1], r, fill: f, stroke: BR, 'stroke-width': 3.5 }); mk(g, 'text', { x: p[0], y: p[1] + 9, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: f === '#3A3A3A' ? '#FFFFFF' : BR }).textContent = s; };
  [A.C1, A.C2, A.C3].forEach(p => at(p, 40, '#3A3A3A', 'C')); [A.O1, A.O2, A.O3].forEach(p => at(p, 38, ACID, 'O')); A.H.concat([A.H2]).forEach(p => at(p, 24, '#FFFFFF', 'H'));
  mk(g, 'circle', { cx: 528, cy: 50, r: 0 });
  LAB[3] = [[880, 230, 950, 110, 'Acid group', 'end'], [340, 300, 180, 120, 'Carbon atoms', 'start']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'thick'), wt('Z2', 'runny')], [wt('Z3', 'proteins'), wt('Z3', 'mesh')], [wt('Z4', 'Lactobacillus'), wt('Z4', 'clumps')], [wt('Z5', 'sour'), wt('Z5', 'Lactic')]];
const zFx = document.createElement('div'); zFx.className = 'pillp'; zFx.style.cssText = 'left:776px;top:446px;height:52px;font-size:22px';
zFx.innerHTML = `Lactic acid &nbsp;<span style="font-size:26px">${K('\\mathrm{C_{3}H_{6}\\textcolor{' + ACID + '}{O_{3}}}')}</span>`; $('#zd').appendChild(zFx);
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Millions of tiny cooks!' });

/* ---------- M: milk to curd ---------- */
const STEPS = [['Add a starter', 'a spoon of old curd: millions of LAB'], ['LAB multiply', 'in warm milk, they divide again and again'], ['LAB make acids', 'lactic acid builds up'],
  ['Proteins clump', 'coagulate and partly digest: curd'], ['A bonus', 'more vitamin B12; LAB check harmful microbes']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['M2', 'M3', 'M4', 'M5', 'M6'].map(id => T0(id) + 0.45);
const MST = ['STARTER', 'LAB GROW', 'ACID', 'CURD', 'B12 +'];
const mS = $('#mS');
const bowlB = mk(mS, 'path', { d: 'M90,170 C90,420 220,500 392,500 C564,500 694,420 694,170 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 5 });
const milk = mk(mS, 'path', { d: 'M108,190 C108,400 230,480 392,480 C554,480 676,400 676,190 Z', fill: '#FBFBF7' });
const mR = M.rng(33); const mb = []; for (let k = 0; k < 32; k++) mb.push({ x: 180 + mR() * 420, y: 230 + mR() * 200, a: mR() * 180, e: null });
mb.forEach(b => b.e = rod(mS, 0, 0, 0, 0.9));
const acid = []; for (let k = 0; k < 26; k++) acid.push({ e: mk(mS, 'circle', { r: 6, fill: ACID }), x: 160 + mR() * 460, y: 230 + mR() * 210, ph: mR() });
const prot = []; for (let k = 0; k < 24; k++) { const x = 170 + mR() * 440, y = 230 + mR() * 200; prot.push({ e: mk(mS, 'circle', { r: 12, fill: PROT, stroke: PROTD, 'stroke-width': 2.5 }), x, y, cx: 250 + Math.round((x - 170) / 150) * 140, cy: 280 + Math.round((y - 230) / 100) * 90 }); }
const spoon = mk(mS, 'g', {}); mk(spoon, 'path', { d: 'M560,110 L720,40', stroke: '#9AA0AC', 'stroke-width': 12, 'stroke-linecap': 'round' }); mk(spoon, 'ellipse', { cx: 540, cy: 120, rx: 38, ry: 20, fill: '#F2EEE4', stroke: '#9AA0AC', 'stroke-width': 4 });
const b12 = mk(mS, 'g', {}); mk(b12, 'rect', { x: 92, y: 80, width: 180, height: 50, rx: 10, fill: C.ac }); mk(b12, 'text', { x: 182, y: 114, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'font-weight': 600, fill: '#FFFFFF' }).textContent = '+ VITAMIN B12';
const mKey = mk(mS, 'g', {}); [[BACD, 'LAB'], [ACID, 'ACID'], [PROTD, 'MILK PROTEIN']].forEach(([c, s], i) => { mk(mKey, 'circle', { cx: 60 + i * 140, cy: 548, r: 9, fill: c }); txt(mKey, 76 + i * 140, 554, s, { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: c }); });

/* ---------- U: four places ---------- */
const U4 = [['home', 'At home', [['Bacteria', 'idli, dosa batter (CO2 puffs it)'], ['Saccharomyces cerevisiae', "baker's yeast: bread"]], 'U2'],
  ['factory', 'Medicine, industry', [['Penicillium', 'gives penicillin'], ['Aspergillus niger', 'makes citric acid']], 'U3'],
  ['sprout', 'On farms', [['Rhizobium', 'root nodules: fixes nitrogen'], ['Nostoc, Anabaena', 'fix nitrogen in heterocysts']], 'U4'],
  ['flame', 'For energy', [['Methanobacterium', 'in cattle dung: biogas'], ['Biogas', 'mostly methane: gobar gas']], 'U5']];
$('#c4s').innerHTML = U4.map(([ic, h, rows], i) => `<div class="card c4" id="u${i}" style="left:${160 + i * 405}px"><div class="lbl" style="left:28px;top:30px">PLACE ${i + 1}</div><svg id="us${i}" width="384" height="230" style="position:absolute;left:0;top:60px"></svg><div class="h4">${h}</div>
  ${rows.map(([m, p], j) => `<div class="r4" id="ur${i}${j}" style="top:${356 + j * 92}px"><div class="m"${j === 1 && i === 3 ? ' style="font-style:normal"' : ''}>${m}</div><div class="p">${p}</div></div>`).join('')}</div>`).join('');
const uA = {};
{ const s = $('#us0'); mk(s, 'path', { d: 'M90,110 L294,110 L280,200 C276,214 108,214 104,200 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 4 }); uA.bat = mk(s, 'path', { d: 'M96,112 C130,96 160,108 192,100 C230,92 260,108 288,112 L288,116 L96,116 Z', fill: '#FBF6EA', stroke: BR, 'stroke-width': 3 });
  uA.bub = []; const r = M.rng(3); for (let k = 0; k < 10; k++) uA.bub.push({ e: mk(s, 'circle', { r: 6, fill: 'none', stroke: CO2, 'stroke-width': 2.5 }), x: 120 + r() * 150, ph: r() }); }
{ const s = $('#us1'); mk(s, 'path', { d: 'M150,40 L234,40 L234,70 L270,190 C274,206 110,206 114,190 L150,70 Z', fill: '#EEF3F8', stroke: BR, 'stroke-width': 4 }); uA.liq = mk(s, 'path', { d: 'M128,150 L256,150 L270,190 C274,206 110,206 114,190 Z', fill: '#E3D17A' });
  uA.drop = mk(s, 'path', { d: 'M0,-12 C7,-3 9,2 9,5 a9,9 0 1 1 -18,0 C-9,2 -7,-3 0,-12 Z', fill: GOLD }); }
{ const s = $('#us2'); mk(s, 'rect', { x: 0, y: 100, width: 384, height: 130, fill: SOILL }); mk(s, 'path', { d: 'M192,100 L192,40 M192,60 C170,40 150,40 140,50 M192,50 C214,30 236,30 246,40', stroke: '#4E7A34', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(s, 'path', { d: 'M192,100 C190,140 160,170 130,200 M192,100 C200,150 230,170 260,200', stroke: '#E8DDC6', 'stroke-width': 4, fill: 'none' });
  uA.nod = [[150, 170], [236, 168], [176, 140]].map(([x, y]) => mk(s, 'circle', { cx: x, cy: y, r: 0, fill: '#E7B7A6', stroke: '#9A5A48', 'stroke-width': 2.5 }));
  uA.n2 = []; for (let k = 0; k < 4; k++) uA.n2.push(mk(s, 'text', { 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: CO2 })); uA.n2.forEach(e => e.textContent = 'N2'); }
{ const s = $('#us3'); mk(s, 'path', { d: 'M110,200 C110,120 150,90 192,90 C234,90 274,120 274,200 Z', fill: '#B9A68A', stroke: BR, 'stroke-width': 4 }); mk(s, 'rect', { x: 100, y: 196, width: 184, height: 14, rx: 4, fill: SOIL });
  mk(s, 'path', { d: 'M192,90 L192,50 L300,50 L300,80', stroke: BR, 'stroke-width': 5, fill: 'none' }); uA.fl = mk(s, 'path', { d: 'M300,80 C290,60 296,50 300,36 C306,50 312,60 300,80 Z', fill: '#5AA0C8', stroke: '#2F6FEB', 'stroke-width': 2 }); }
const tU = U4.map(u => T0(u[3]));

/* ---------- C: economic vs ecological ---------- */
const CA = [['MEANS', 'Useful to people'], ['FOR', 'Food, medicine, fuel, farming'], ['EXAMPLE', 'Penicillin from Penicillium']], CB = [['MEANS', 'Keeps nature running'], ['EVEN', 'With no people around'], ['EXAMPLE', 'Bacteria breaking down leaves']];
$('#cak').innerHTML = CA.map(([k, v], i) => `<div class="kv" id="ka${i}" style="top:${330 + i * 76}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
$('#cbk').innerHTML = CB.map(([k, v], i) => `<div class="kv" id="kb${i}" style="top:${330 + i * 76}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
const caS = $('#caS'), cbS = $('#cbS');
const cA = mk(caS, 'g', {}); mk(cA, 'rect', { x: 300, y: 110, width: 184, height: 120, rx: 18, fill: '#FFFFFF', stroke: BR, 'stroke-width': 4 }); mk(cA, 'path', { d: 'M300,150 L484,150', stroke: BR, 'stroke-width': 3 });
for (let k = 0; k < 6; k++) mk(cA, 'circle', { cx: 330 + (k % 3) * 62, cy: 180 + Math.floor(k / 3) * 30, r: 10, fill: '#9CC9A9', stroke: '#1F6B3F', 'stroke-width': 2 });
txt(cA, 392, 136, 'PENICILLIN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink });
const cB = mk(cbS, 'g', {}); mk(cB, 'rect', { x: 120, y: 200, width: 544, height: 40, rx: 8, fill: SOILL });
const cLv = [[220, 190, 20], [330, 186, -15], [450, 190, 30], [560, 186, -25]].map(([x, y, a]) => mk(cB, 'ellipse', { cx: x, cy: y, rx: 46, ry: 18, fill: '#C9A75A', stroke: '#7A5A2E', 'stroke-width': 3, transform: `rotate(${a} ${x} ${y})` }));
const cRods = [[260, 210], [390, 214], [500, 208], [610, 212]].map(([x, y]) => rod(cB, x, y, 10, 0.8));
const th1 = PUC.think($('#th1'), { q: 'Diatoms are the chief producers of food in the oceans. Economic or ecological importance?', opts: ['Economic', 'Ecological'], right: 1, why: 'Ecological. Diatoms feed ocean life, whether or not people use them.' });

/* ---------- L: nature ---------- */
const laS = $('#laS');
mk(laS, 'path', { d: 'M60,180 L724,180 L660,520 L124,520 Z', fill: SOILL, stroke: BR, 'stroke-width': 4 });
const soil = mk(laS, 'path', { d: 'M110,440 L674,440 L660,520 L124,520 Z', fill: SOIL });
const peels = []; const rL = M.rng(71); for (let k = 0; k < 12; k++) peels.push({ e: mk(laS, 'path', { d: 'M-30,0 C-20,-16 20,-16 30,0 C20,8 -20,8 -30,0 Z', fill: ['#E9B44C', '#8CC48F', '#E07A5F'][k % 3], stroke: BR, 'stroke-width': 2.5 }), x: 160 + rL() * 460, y: 220 + rL() * 200, a: rL() * 180 });
const lRods = []; for (let k = 0; k < 16; k++) lRods.push({ e: rod(laS, 0, 0, 0, 0.6), x: 150 + rL() * 480, y: 230 + rL() * 220, ph: rL() * 6 });
const laT = [txt(laS, 392, 150, 'PEELS + DECOMPOSERS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 }), txt(laS, 392, 560, 'SOIL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600, fill: SOIL })];
const lbS = $('#lbS');
const RING = { cx: 392, cy: 290, r: 170 };
const ringP = mk(lbS, 'circle', { cx: RING.cx, cy: RING.cy, r: RING.r, fill: 'none', stroke: C.ac2, 'stroke-width': 10 });
const ringD = mk(lbS, 'circle', { r: 12, fill: C.ac });
const CYC = [['Dead matter', -90, wt('L2', 'dead')], ['Decomposers', 0, wt('L2', 'decomposers')], ['Nutrients: N, P, Fe, S', 90, wt('L3', 'nitrogen')], ['Plants and ocean producers', 180, wt('L4', 'diatoms')]];
$('#cycs').innerHTML = CYC.map(([n], i) => `<div class="cyc" id="cy${i}">${n}</div>`).join('') + `<div class="pillp ac" id="lbP" style="left:36px;top:494px">Nitrogen fixers: Nostoc, Anabaena, Rhizobium</div>`;
const cycPos = CYC.map(([, a]) => [RING.cx + RING.r * Math.cos(a * Math.PI / 180), RING.cy + RING.r * Math.sin(a * Math.PI / 180)]);

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">HOME · MEDICINE · FARMS · ENERGY · <b>NATURE</b></span>';

/* ---------- W: match board ---------- */
const WC = [['CURD', 'Lactobacillus', 'rod', 'a bacterium (LAB)', wt('W2', 'Lactobacillus')], ['BREAD', 'Saccharomyces cerevisiae', 'yeast', "baker's yeast, a fungus", wt('W2', 'Saccharomyces')], ['PENICILLIN', 'Penicillium', 'mould', 'a fungus', wt('W3', 'Penicillium')],
  ['CITRIC ACID', 'Aspergillus niger', 'mould', 'a fungus', wt('W3', 'Aspergillus')], ['BIOGAS', 'Methanobacterium', 'rod', 'a methanogen', wt('W4', 'Methanobacterium')], ['NITROGEN FIXING', 'Rhizobium', 'rod', 'a bacterium, in legume roots', wt('W4', 'Rhizobium')]];
$('#cols').innerHTML = WC.map(([h, n, ic, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2">${h}</div><div class="dz"></div>
  <div class="it" id="it${i}"><svg id="iti${i}" width="232" height="100" style="position:absolute;left:0;top:8px"></svg><div class="inm" style="top:${n.length > 18 ? 100 : 116}px">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
WC.forEach(([, , ic], i) => { const s = $('#iti' + i);
  if (ic === 'rod') { rod(s, 90, 50, 20, 1.3); rod(s, 140, 60, -20, 1.3); }
  else if (ic === 'yeast') { mk(s, 'ellipse', { cx: 108, cy: 54, rx: 36, ry: 28, fill: YEA, stroke: BR, 'stroke-width': 3 }); mk(s, 'circle', { cx: 150, cy: 32, r: 14, fill: YEA, stroke: BR, 'stroke-width': 3 }); }
  else { mk(s, 'path', { d: 'M116,92 L116,40 M116,40 L96,20 M116,40 L136,20 M116,40 L116,14', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); [[96, 20], [136, 20], [116, 14]].forEach(([x, y]) => mk(s, 'circle', { cx: x, cy: y - 6, r: 9, fill: '#9CC9A9', stroke: '#1F6B3F', 'stroke-width': 2 })); } });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Idli batter rises because of yeast, like bread', right: "Idli and dosa batter: bacteria. Bread: baker's yeast" });
const tS = $('#tS'); const tI = mk(tS, 'g', {}); mk(tI, 'path', { d: 'M40,110 L200,110 L188,190 C184,204 56,204 52,190 Z', fill: '#C9A27A', stroke: BR, 'stroke-width': 4 }); mk(tI, 'path', { d: 'M44,112 C80,94 160,94 196,112 Z', fill: '#FBF6EA', stroke: BR, 'stroke-width': 3 }); rod(tI, 100, 150, 15, 1); rod(tI, 140, 160, -20, 1);
txt(tI, 120, 236, 'IDLI · BACTERIA', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: BACD });
const tB = mk(tS, 'g', {}); mk(tB, 'path', { d: 'M260,190 L260,130 C260,90 300,80 340,80 C380,80 420,90 420,130 L420,190 Z', fill: '#E8C88C', stroke: '#A8743A', 'stroke-width': 4 }); mk(tB, 'ellipse', { cx: 320, cy: 150, rx: 18, ry: 14, fill: YEA, stroke: BR, 'stroke-width': 2.5 }); mk(tB, 'ellipse', { cx: 364, cy: 130, rx: 18, ry: 14, fill: YEA, stroke: BR, 'stroke-width': 2.5 });
txt(tB, 340, 236, 'BREAD · YEAST', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: '#A8743A' });
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Match the following: a microbe and its product or use' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · MATCH THE FOLLOWING · ORIGINAL', qW: 960,
  q: 'Match list I with list II.<div class="cols2"><div><div class="sl"><b>a</b><i>Lactobacillus</i></div><div class="sl"><b>b</b><i>Aspergillus niger</i></div><div class="sl"><b>c</b><i>Methanobacterium</i></div><div class="sl"><b>d</b><i>Rhizobium</i></div></div><div><div class="sl"><b>i</b>Biogas</div><div class="sl"><b>ii</b>Citric acid</div><div class="sl"><b>iii</b>Curd</div><div class="sl"><b>iv</b>Nitrogen fixing in root nodules</div></div></div>',
  opts: ['a-iii, b-ii, c-i, d-iv', 'a-iii, b-i, c-ii, d-iv', 'a-ii, b-iii, c-i, d-iv', 'a-iv, b-ii, c-i, d-iii'], right: 0, optW: 474, optY: 400, optH: 84, optFs: 26 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], ['<b>a-iii</b>: LAB make curd'], ['<b>b-ii</b>: citric acid'], ['<b>c-i</b>: biogas'], ['<b>d-iv</b>: root nodules']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Lactobacillus'), wt('A2', 'Aspergillus'), wt('A3', 'Methanobacterium'), wt('A3', 'Rhizobium')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · importance of microorganisms', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Food</b>: LAB › curd · bacteria › idli, dosa · <i>S. cerevisiae</i> › bread', '<b>Medicine, industry</b>: <i>Penicillium</i> › penicillin · <i>A. niger</i> › citric acid', '<b>Farms</b>: <i>Rhizobium</i> nodules · <i>Nostoc</i>, <i>Anabaena</i> heterocysts',
    '<b>Energy</b>: methanogens › biogas (gobar gas)', '<b>Nature</b>: decomposers, nutrient recycling, diatoms'] });
const YQ = ['Why does one spoon of old curd make fresh milk set?', 'Name one microbe that helps farmers, and say how.', 'What do decomposers do in a compost pit?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 21', topic: 'Moss, fern, pine, mango? Basis of Plant Classification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('M5') - 0.3, 1.05, 960, 540], [T0('U1') - 0.6, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'workers') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'small') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'who') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    M.vis($('#tq3 .lbl'), t, tH4, 1e9, { dy: 8 });
    PL4.forEach((p, i) => M.vis($('#pl' + i), t, wt('H4', p[2]) - 0.2, 1e9, POP));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, T0('D3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dP'), t, wt('D2', 'microscope') - 0.2, 1e9, POP);
    M.vis(dB, t, T0('D2') + 0.3, 1e9, { ...POP, sc: 0.5 }); M.vis(dY, t, wt('D2', 'yeast') - 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis(dPr, t, wt('D2', 'protists') - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#dhs .lbl'), t, T0('D3'), 1e9, { dy: 8 }); DH.forEach(([, w], i) => M.vis($('#dh' + i), t, wt('D3', w) - 0.1, 1e9, POP));
    M.vis($('#dhU'), t, wt('D3', 'useful') - 0.2, 1e9, { dy: 8 }); [0, 1, 2, 3, 4].forEach(i => M.vis($('#du' + i), t, wt('D3', 'useful') + i * 0.12, 1e9, POP));
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tM1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('M1');
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
    M.vis(zFx, t, wt('Z5', 'Lactic') + 0.3, 1e9, POP);
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'LAB') + 0.3, T0('Z5') + 1.5);
  }

  /* M: milk to curd */
  const mOn = t >= tM1 - 0.1 && t < tU1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('U1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#mr'), t, tM1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let st = -1; tSt.forEach((tt, i) => { if (t >= tt - 0.3) st = i; }); M.setT($('#mstT'), st < 0 ? 'MILK' : MST[st]); M.vis($('#mst'), t, tM1 + 0.4, 1e9, POP);
    const pour = M.io((t - tSt[0]) / 1.0), grow = M.clamp((t - tSt[1]) / 3.0), ac = M.io((t - tSt[2]) / 1.2), cl = M.io((t - tSt[3]) / 1.6);
    M.vis(spoon, t, tSt[0] - 0.3, tSt[1] + 0.5, { dy: -20, outDur: 0.3, ody: -20 }); attr(spoon, 'transform', `rotate(${(-25 * pour).toFixed(1)} 560 110)`);
    const nB = t < tSt[0] + 0.4 ? 0 : t < tSt[1] ? 4 : Math.min(32, Math.round(4 * Math.pow(2, grow * 3)));
    mb.forEach((b, k) => { const on = k < nB; M.hide(b.e, !on); if (on) { const wob = 4 * Math.sin(t * 1.6 + k); attr(b.e, 'transform', `translate(${(b.x + wob).toFixed(1)} ${(b.y + (k < 4 ? -60 * (1 - pour) : 0)).toFixed(1)}) rotate(${b.a})`); } });
    acid.forEach((a, k) => { const on = M.clamp(ac * 26 - k); M.hide(a.e, on <= 0); attr(a.e, 'cx', (a.x + 6 * Math.sin(t * 1.2 + a.ph * 6)).toFixed(1)); attr(a.e, 'cy', (a.y + 6 * Math.cos(t + a.ph * 6)).toFixed(1)); a.e.style.opacity = on; });
    prot.forEach(p => { attr(p.e, 'cx', (p.x + (p.cx - p.x) * cl * 0.85).toFixed(1)); attr(p.e, 'cy', (p.y + (p.cy - p.y) * cl * 0.85).toFixed(1)); M.vis(p.e, t, tM1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); });
    milk.setAttribute('fill', mix('#FBFBF7', '#F6EED8', cl));
    M.vis(b12, t, wt('M6', 'B12') - 0.2, 1e9, POP); M.vis(mKey, t, tSt[1], 1e9, { dy: 6 });
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tC1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('C1');
    U4.forEach((u, i) => { const el = $('#u' + i); M.vis(el, t, i ? tU[i] - 0.25 : tU1 + 0.2, out, { dy: 36, ...o }); el.style.borderTopColor = mix(C.dim, C.ac, M.io((t - tU[i]) / 0.3));
      M.vis(el.querySelector('.h4'), t, tU[i], 1e9, { dy: 8 }); [0, 1].forEach(j => M.vis($('#ur' + i + j), t, [[wt('U2', 'idli'), wt('U2', 'Bread')], [wt('U3', 'Penicillin'), wt('U3', 'Aspergillus')], [wt('U4', 'Rhizobium'), wt('U4', 'Cyanobacteria')], [wt('U5', 'Methanogens'), wt('U5', 'biogas')]][i][j] - 0.15, 1e9, { dx: -12, dy: 0 })); });
    // loops: bubbles rise in batter, a drop falls, nodules swell with N2 coming in, a biogas flame flickers
    const tb = wt('U2', 'carbon'); attr(uA.bat, 'transform', `translate(0 ${(-30 * M.io((t - tb) / 1.5)).toFixed(1)})`);
    uA.bub.forEach(b => { const u = t < tb ? -1 : ((t - tb) * 0.4 + b.ph) % 1; M.hide(b.e, u < 0); if (u >= 0) { attr(b.e, 'cx', b.x); attr(b.e, 'cy', (200 - u * 110).toFixed(1)); b.e.style.opacity = Math.min(1, (1 - u) * 3).toFixed(2); } });
    { const u = ((t - tU[1]) * 0.5) % 1; attr(uA.drop, 'transform', `translate(192 ${(10 + u * 120).toFixed(1)})`); M.hide(uA.drop, t < tU[1] + 0.3); uA.drop.style.opacity = (1 - u).toFixed(2); }
    uA.nod.forEach((n, k) => attr(n, 'r', (12 * M.io((t - wt('U4', 'nodules') - k * 0.2) / 0.5)).toFixed(1)));
    uA.n2.forEach((e, k) => { const u = t < wt('U4', 'nitrogen') ? -1 : ((t - wt('U4', 'nitrogen')) * 0.35 + k / 4) % 1; M.hide(e, u < 0); if (u >= 0) { attr(e, 'x', (40 + k * 90).toFixed(1)); attr(e, 'y', (30 + u * 120).toFixed(1)); e.style.opacity = Math.min(1, u * 5, (1 - u) * 4).toFixed(2); } });
    attr(uA.fl, 'transform', `translate(300 80) scale(${(M.io((t - wt('U5', 'biogas')) / 0.4) * (1 + 0.12 * Math.sin(t * 9))).toFixed(3)}) translate(-300 -80)`);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tL1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#ca'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cb'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(cA, t, tC1 + 0.5, 1e9, { ...POP, sc: 0.5 });
    CA.forEach((_, i) => M.vis($('#ka' + i), t, [wt('C2', 'useful'), wt('C2', 'food'), wt('C2', 'penicillin')][i] - 0.15, 1e9, { dx: -16, dy: 0 }));
    CB.forEach((_, i) => M.vis($('#kb' + i), t, [wt('C3', 'nature'), wt('C3', 'people'), wt('C3', 'bacteria')][i] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis(cB, t, T0('C3') + 0.2, 1e9, { dy: 10 }); const dec = M.io((t - wt('C3', 'breaking')) / 2.5); cLv.forEach((l, k) => { l.style.opacity = (1 - dec * 0.85).toFixed(2); attr(l, 'ry', (18 * (1 - dec * 0.6)).toFixed(1)); });
    cRods.forEach((r, k) => attr(r, 'transform', `rotate(10 ${[260, 390, 500, 610][k]} 212) translate(${(6 * Math.sin(t * 2 + k)).toFixed(1)} 0)`));
    M.vis($('#th1'), t, T0('C4') + 0.05, OUT('L1'), { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'Economic') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Diatoms') });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('T1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lb'), t, T0('L2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const dec = M.io((t - wt('L2', 'compost')) / 3);
    peels.forEach(p => { p.e.style.opacity = M.clamp((t - tL1 - 0.3) / 0.3).toFixed(2); attr(p.e, 'transform', `translate(${p.x} ${(p.y + dec * (430 - p.y) * 0.6).toFixed(1)}) rotate(${p.a}) scale(${(1 - dec * 0.75).toFixed(3)})`); });
    lRods.forEach(r => { M.hide(r.e, t < wt('L2', 'decomposers') - 0.2); attr(r.e, 'transform', `translate(${(r.x + 10 * Math.sin(t * 1.4 + r.ph)).toFixed(1)} ${(r.y + 8 * Math.cos(t * 1.1 + r.ph)).toFixed(1)}) rotate(${(r.ph * 30).toFixed(0)})`); });
    attr(soil, 'd', `M${(110 - 30 * dec).toFixed(1)},${(440 - 140 * dec).toFixed(1)} L${(674 + 30 * dec).toFixed(1)},${(440 - 140 * dec).toFixed(1)} L660,520 L124,520 Z`);
    laT.forEach((e, i) => M.vis(e, t, tL1 + 0.5 + i * 0.3, 1e9, { dy: 6 }));
    M.draw(ringP, t, T0('L2') + 0.5, 1.2);
    const lit = CYC.map(c => c[2]); let last = -1; lit.forEach((tt, i) => { if (t >= tt - 0.2) last = i; });
    CYC.forEach((c, i) => { const el = $('#cy' + i), [x, y] = cycPos[i]; M.vis(el, t, c[2] - 0.2, 1e9, POP); if (!el._w) el._w = el.offsetWidth; el.style.left = Math.min(748 - el._w, Math.max(36, x - el._w / 2)).toFixed(1) + 'px'; el.style.top = (y - 22).toFixed(1) + 'px';
      el.style.background = i === last ? C.ac : C.ac2; el.style.color = i === last ? '#FFFFFF' : C.ink; });
    const a = -Math.PI / 2 + ((t - T0('L2')) * 0.9) % (Math.PI * 2); attr(ringD, 'cx', (RING.cx + RING.r * Math.cos(a)).toFixed(1)); attr(ringD, 'cy', (RING.cy + RING.r * Math.sin(a)).toFixed(1)); M.hide(ringD, t < T0('L2') + 1.6);
    M.vis($('#lbP'), t, wt('L4', 'nitrogen') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Microbes') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'recycle') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.5, 1e9, { dy: 8 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'idli') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'dough') - 0.1 });
    M.vis(tI, t, wt('X3', 'bacteria') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tB, t, wt('X3', 'yeast') - 0.1, 1e9, { ...POP, sc: 0.5 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') - 0.2, tCount, tAns });
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
