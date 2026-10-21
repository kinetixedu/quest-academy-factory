// PUC Biology Ep 18: Viruses and their Structure (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// canon: DNA violet; batch: RNA teal, capsid protein warm grey, bacterium sand
const BR = '#2E2A24', CHL = '#3E9B5F', DNA = '#7B4B94', RNA = '#0E8F8F', CAP = '#D9CFC0', CAPD = '#7D7264', BAC = '#F3DFA8', BACD = '#9A7A2E', RED = '#D64545', LEAF = '#8CC48F', LEAFL = '#C9E3B5';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const hexP = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const wave = (x0, y, w, a, n) => { let d = `M${x0},${y}`; for (let k = 0; k < n; k++) d += ` q${w / n / 4},${-a} ${w / n / 2},0 t${w / n / 2},0`; return d; };
// a bacteriophage drawn at (x, y) = head centre, size s
const phage = (p, x, y, s, dnaOn = true) => { const g = mk(p, 'g', {});
  mk(g, 'path', { d: hexP(x, y, 40 * s), fill: CAP, stroke: BR, 'stroke-width': 3.5 * Math.max(0.6, s) });
  const dna = dnaOn ? mk(g, 'path', { d: `M${x - 22 * s},${y - 8 * s} c${10 * s},${-20 * s} ${24 * s},${20 * s} ${34 * s},0 s${10 * s},${-16 * s} ${10 * s},${8 * s} M${x - 18 * s},${y + 12 * s} c${12 * s},${-14 * s} ${22 * s},${14 * s} ${34 * s},0`, stroke: DNA, 'stroke-width': 3.5 * s, fill: 'none', 'stroke-linecap': 'round' }) : null;
  mk(g, 'rect', { x: x - 14 * s, y: y + 36 * s, width: 28 * s, height: 8 * s, fill: CAPD, stroke: BR, 'stroke-width': 2 * s });
  mk(g, 'rect', { x: x - 9 * s, y: y + 44 * s, width: 18 * s, height: 50 * s, fill: CAP, stroke: BR, 'stroke-width': 2.5 * s });
  for (let k = 0; k < 5; k++) mk(g, 'line', { x1: x - 9 * s, y1: y + (52 + k * 9) * s, x2: x + 9 * s, y2: y + (52 + k * 9) * s, stroke: BR, 'stroke-width': 1.5 * s });
  mk(g, 'rect', { x: x - 18 * s, y: y + 94 * s, width: 36 * s, height: 6 * s, fill: CAPD, stroke: BR, 'stroke-width': 2 * s });
  [[-1, 1], [1, 1], [-1, 0.6], [1, 0.6]].forEach(([sx, f]) => mk(g, 'path', { d: `M${x + sx * 14 * s},${y + 100 * s} l${sx * 26 * s * f},${22 * s} l${sx * 8 * s},${26 * s}`, stroke: BR, 'stroke-width': 2.5 * s, fill: 'none', 'stroke-linecap': 'round' }));
  return { g, dna }; };
const tmvRod = (p, x, y, L, H, cut = true) => { const g = mk(p, 'g', {}); const n = Math.floor(L / (H * 0.32));
  mk(g, 'rect', { x, y: y - H / 2, width: L, height: H, rx: 8, fill: CAP, stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k <= n; k++) mk(g, 'path', { d: `M${x + k * H * 0.32},${y - H / 2} l${H * 0.18},${H}`, stroke: CAPD, 'stroke-width': 2 });
  if (cut) { mk(g, 'ellipse', { cx: x + L, cy: y, rx: H * 0.22, ry: H / 2, fill: '#EFE8DC', stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: wave(x + L - 4, y, H * 1.3, H * 0.16, 4), stroke: RNA, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); }
  return g; };

Object.assign(M.IC, {
  nose: ['M12 3c-1 4-4 8-4 12a4 4 0 0 0 8 0c0-4-3-8-4-12Z', 'M9 19c-2 0-3 1-3 2', 'M15 19c2 0 3 1 3 2'],
  bac: ['M7 8h10a4 4 0 0 1 0 8H7a4 4 0 0 1 0-8Z', 'M3 12H1', 'M23 12h-2'],
  virus: [ci(12, 12, 5), 'M12 7V3', 'M12 21v-4', 'M7 12H3', 'M21 12h-4', 'm8.5 8.5-2.8-2.8', 'm18.3 18.3-2.8-2.8', 'm15.5 8.5 2.8-2.8', 'm5.7 18.3 2.8-2.8'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tV1 = T0('V1'), tZ1 = T0('Z1'), tK1 = T0('K1'), tI1 = T0('I1'), tC1 = T0('C1'), tG1 = T0('G1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['nose', 'A runny nose', 'THE COMMON COLD', 'nose', 'HUMAN'], ['leaf', 'A patchy tobacco leaf', 'MOSAIC DISEASE', 'tobacco', 'PLANT'], ['bac', 'A bursting bacterium', 'BACTERIOPHAGE', 'bacterium', 'BACTERIUM']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n.replace('A patchy tobacco leaf', 'A tobacco leaf').replace('A bursting bacterium', 'A bacterium')}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('virus', 20, '#fff', 2.4)}${tg}</div></div>`).join('');

/* ---------- D: discovery timeline + filter experiment ---------- */
const EV = [['1892', 'Dmitri Ivanowsky', 'TOBACCO MOSAIC', 'Smaller than bacteria: passed filters', wt('D2', 'eighteen')], ['1898', 'M. W. Beijerinek', 'INFECTIOUS FLUID', 'Contagium vivum fluidum', wt('D3', 'eighteen')],
  ['1935', 'W. M. Stanley', 'CRYSTALS', 'Viruses crystallised, mostly protein', wt('D4', 'nineteen')]];
$('#evs').innerHTML = EV.map(([y, n, w, d], i) => `<div class="ev" id="ev${i}" style="top:${92 + i * 150}px"><div class="dt"></div><div class="yr2">${y}</div><div class="nm">${n}</div><div class="wd">${w}</div><div class="ds"${i === 1 ? ' style="font-style:italic"' : ''}>${d}</div></div>`).join('');
const tlL = mk($('#clS'), 'line', { x1: 64, y1: 122, x2: 64, y2: 422, stroke: C.ac2, 'stroke-width': 5, 'stroke-linecap': 'round' });
const cr = $('#crS');
// funnel + filter, sick-leaf juice above, healthy leaf below
const fx = { jar: mk(cr, 'g', {}), fil: mk(cr, 'g', {}), leaf: mk(cr, 'g', {}), cry: mk(cr, 'g', {}) };
mk(fx.fil, 'path', { d: 'M170,190 L410,190 L320,300 L320,350 L260,350 L260,300 Z', fill: '#F3F6FA', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(fx.fil, 'line', { x1: 196, y1: 222, x2: 384, y2: 222, stroke: C.mute, 'stroke-width': 4, 'stroke-dasharray': '3 6' });
txt(fx.fil, 430, 228, 'BACTERIA-PROOF FILTER', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 });
const bacs = [[230, 208], [290, 206], [350, 210]].map(([x, y]) => mk(fx.fil, 'rect', { x: x - 22, y: y - 9, width: 44, height: 18, rx: 9, fill: BAC, stroke: BACD, 'stroke-width': 2.5 }));
const vir = []; const rV = M.rng(7); for (let k = 0; k < 16; k++) vir.push({ e: mk(cr, 'circle', { r: 3.5, fill: RNA }), ph: rV(), x: 230 + rV() * 120 });
mk(fx.leaf, 'path', { d: 'M180,470 C220,390 360,370 470,400 C450,480 320,520 180,470 Z', fill: LEAF, stroke: BR, 'stroke-width': 4 });
const mos = [[260, 440], [330, 420], [400, 440], [300, 470], [380, 470]].map(([x, y]) => mk(fx.leaf, 'ellipse', { cx: x, cy: y, rx: 22, ry: 13, fill: LEAFL }));
txt(fx.leaf, 500, 450, 'HEALTHY LEAF', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 }); const sickT = txt(fx.leaf, 500, 474, 'NOW SICK', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: RED });
[[150, 150], [250, 120], [350, 160], [450, 130], [550, 150]].forEach(([x, y], k) => { const s = 30 + (k % 2) * 12; mk(fx.cry, 'path', { d: hexP(x + 60, y + 170, s), fill: '#EFE8DC', stroke: CAPD, 'stroke-width': 3 }); mk(fx.cry, 'path', { d: hexP(x + 60, y + 170, s * 0.55), fill: 'none', stroke: CAPD, 'stroke-width': 1.5 }); });
txt(fx.cry, 392, 470, 'VIRUS CRYSTALS · MOSTLY PROTEIN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, 'font-weight': 600 });
const tFil = wt('D2', 'filters'), tJuice = wt('D3', 'juice'), tInf = wt('D3', 'healthy'), tCry = wt('D4', 'crystallised');

/* ---------- V: alive? ---------- */
const vaS = $('#vaS'), vaG = mk(vaS, 'g', {});
[[260, 250, 70], [420, 220, 54], [520, 300, 44], [340, 350, 40]].forEach(([x, y, s]) => { mk(vaG, 'path', { d: hexP(x, y, s), fill: '#EFE8DC', stroke: CAPD, 'stroke-width': 3.5 }); mk(vaG, 'path', { d: hexP(x, y, s * 0.55), fill: 'none', stroke: CAPD, 'stroke-width': 1.8 }); });
const vaZ = txt(vaS, 392, 450, 'NO FEEDING · NO GROWTH', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600 });
const vbS = $('#vbS');
mk(vbS, 'rect', { x: 120, y: 90, width: 540, height: 300, rx: 140, fill: BAC, stroke: BACD, 'stroke-width': 5 });
const vbC = mk(vbS, 'g', {}); const vbV = []; const rB = M.rng(31); for (let k = 0; k < 30; k++) vbV.push({ e: mk(vbC, 'path', { d: hexP(0, 0, 11), fill: CAP, stroke: BR, 'stroke-width': 2 }), x: 200 + rB() * 380, y: 140 + rB() * 200 });
const vbX = mk(vbS, 'g', {}); mk(vbX, 'circle', { cx: 650, cy: 110, r: 26, fill: '#FBE6E6', stroke: RED, 'stroke-width': 3 }); mk(vbX, 'path', { d: 'M638,122 L662,98 M638,98 L662,122', stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' });

/* ---------- Z: zoom ladder ---------- */
const ZN = ['LEAF', 'LEAF CELL', 'ONE VIRUS', 'CAPSID'], ZS = ['x1', 'x400', 'x100,000', 'x500,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Leaf', 'Light and dark green patches: a mosaic.', 'Tobacco mosaic disease.'],
  ['RUNG 2 OF 4', 'Leaf cell', 'Rod-shaped viruses piling up inside.', 'The virus uses the cell to copy itself.'],
  ['RUNG 3 OF 4', 'One virus', 'The tobacco mosaic virus (TMV).', 'A protein coat, the capsid, around RNA.'],
  ['RUNG 4 OF 4', 'Capsid', 'Built from protein subunits: capsomeres.', 'Packed in a spiral (helical) around the RNA.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Just RNA in a coat!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[600, 230, 50], [520, 260, 46], [800, 263, 60], null];
const LAB = [];
{ const g = ZG[0];
  mk(g, 'path', { d: 'M140,300 C260,120 640,60 900,150 C860,360 520,470 140,300 Z', fill: LEAF, stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M90,320 Q120,312 140,300 Q520,230 900,150', stroke: '#EEF6EA', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  const r = M.rng(13); for (let k = 0; k < 16; k++) { const x = 260 + r() * 560, y = 170 + r() * 190; if (y > 330 - (x - 200) * 0.2) continue; mk(g, 'path', { d: `M${x},${y} c20,-18 52,-14 60,4 c6,18 -28,30 -48,24 c-16,-4 -22,-16 -12,-28Z`, fill: LEAFL }); }
  LAB[0] = [[640, 200, 760, 70, 'Mosaic patches', 'start'], [300, 300, 220, 430, 'Tobacco leaf', 'end']];
}
{ const g = ZG[1];
  mk(g, 'rect', { x: 260, y: 60, width: 520, height: 400, rx: 40, fill: '#E3D3A0', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 278, y: 78, width: 484, height: 364, rx: 28, fill: '#F3F7EA', stroke: CHL, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 340, cy: 380, r: 30, fill: '#D7C3E6', stroke: DNA, 'stroke-width': 3 });
  const r = M.rng(17); for (let k = 0; k < 40; k++) { const x = 320 + r() * 400, y = 110 + r() * 300; if (Math.hypot(x - 340, y - 380) < 50) continue; mk(g, 'rect', { x, y, width: 34, height: 8, rx: 4, fill: CAPD, transform: `rotate(${(r() * 180).toFixed(0)} ${x + 17} ${y + 4})` }); }
  LAB[1] = [[280, 140, 220, 100, 'Leaf cell', 'end'], [540, 250, 860, 200, 'Rod-shaped viruses', 'start']];
}
{ const g = ZG[2]; tmvRod(g, 120, 263, 680, 90, true);
  LAB[2] = [[420, 220, 420, 90, 'Capsid (protein coat)', 'middle'], [880, 263, 930, 400, 'RNA', 'end']];
}
{ const g = ZG[3];
  mk(g, 'path', { d: wave(60, 263, 940, 40, 6), stroke: RNA, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 26; k++) { const x = 70 + k * 36, y = 263 + 70 * Math.sin(k * 0.62), front = Math.cos(k * 0.62) > 0;
    mk(g, 'path', { d: `M${x - 18},${y - 22} q18,-12 36,0 l0,44 q-18,12 -36,0 Z`, fill: front ? CAP : '#C4B8A6', stroke: BR, 'stroke-width': 2.5, opacity: front ? 1 : 0.85 }); }
  LAB[3] = [[178, 245, 178, 80, 'Capsomere', 'middle'], [528, 263, 600, 450, 'RNA strand', 'start'], [820, 200, 900, 90, 'Helical (spiral)', 'end']];
}
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : an === 'end' ? -12 : 0), y: ly + (an === 'middle' ? (ly < py ? -10 : 30) : 9), 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'mosaic'), wt('Z2', 'leaf') - 0.4], [wt('Z3', 'cell'), wt('Z3', 'rod')], [wt('Z4', 'capsid'), wt('Z4', 'RNA')], [wt('Z5', 'capsomeres'), wt('Z5', 'RNA'), wt('Z5', 'spiral')]];

/* ---------- K: two parts ---------- */
const kaS = $('#kaS');
const kV = mk(kaS, 'g', {}); mk(kV, 'path', { d: hexP(300, 290, 170), fill: '#F6F1E8', stroke: BR, 'stroke-width': 5 });
const kCaps = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; for (let j = 0; j < 5; j++) { const a2 = a + Math.PI / 3, x0 = 300 + 160 * Math.cos(a), y0 = 290 + 160 * Math.sin(a), x1 = 300 + 160 * Math.cos(a2), y1 = 290 + 160 * Math.sin(a2), u = (j + 0.5) / 5; kCaps.push(mk(kV, 'circle', { cx: x0 + (x1 - x0) * u, cy: y0 + (y1 - y0) * u, r: 13, fill: CAP, stroke: BR, 'stroke-width': 2.5 })); } }
const kNA = mk(kaS, 'path', { d: 'M220,250 c30,-50 70,40 100,0 s70,40 90,-10 M210,320 c30,-40 60,40 100,0 s60,40 100,0', stroke: RNA, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const kLab = [[300, 130, 560, 100, 'Capsid (protein coat)', wt('K2', 'capsid')], [450, 380, 560, 470, 'Capsomeres', wt('K3', 'Capsomeres')], [360, 290, 560, 300, 'Nucleic acid', wt('K2', 'genetic')]].map(([px, py, lx, ly, s, tt]) => {
  const ln = mk(kaS, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(kaS, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }); const tx = mk(kaS, 'text', { x: lx + 10, y: ly + 9, class: 'zl' }); tx.textContent = s; return { ln, dot, tx, tt }; });
const KB = [['Helical', 'a spiral, like the TMV rod', wt('K3', 'helical')], ['Polyhedral', 'many-faced, like this one', wt('K3', 'polyhedral')], ['RNA or DNA', 'never both in one virus', wt('K4', 'either')], ['Nucleoprotein', 'nucleic acid + protein', wt('K4', 'nucleoprotein')]];
$('#kbs').innerHTML = KB.map(([a, b], i) => `<div class="dfr" id="kb${i}" style="top:${84 + i * 116}px"><div class="t">${a}</div><div class="d">${b}</div></div>`).join('');

/* ---------- I: a phage infects a bacterium ---------- */
const IN = ['ATTACH', 'INJECT', 'COPY', 'ASSEMBLE', 'BURST'];
$('#ich').innerHTML = IN.map((n, i) => `<span class="zc" id="ic${i}"><b class="mono">${i + 1}</b>${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tIs = ['I2', 'I3', 'I4', 'I5', 'I6'].map(id => T0(id) + 0.3);
const IL = [['STEP 1 OF 5', 'Attach', 'The phage lands and holds on with its tail fibres.'], ['STEP 2 OF 5', 'Inject', 'Its DNA goes in. The empty coat stays outside.'],
  ['STEP 3 OF 5', 'Copy', 'The cell makes viral DNA and viral proteins.'], ['STEP 4 OF 5', 'Assemble', 'The parts join into many new phages.'], ['STEP 5 OF 5', 'Burst', 'The cell bursts and dies. New phages go out.']];
$('#ils').innerHTML = `<div class="lvI" id="ili"><div class="lbl" style="left:36px;top:30px">INSIDE THE BACTERIUM</div><div class="ln" style="font-size:44px;top:90px">Bacteriophage</div><div class="ld">A virus that infects bacteria.</div></div>` + IL.map(([r, n, d], i) => `<div class="lvI" id="il${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div></div>`).join('');
const iS = $('#iS');
const bOut = mk(iS, 'rect', { x: 180, y: 260, width: 700, height: 230, rx: 115, fill: BAC, stroke: BACD, 'stroke-width': 6 });
const bDNA = mk(iS, 'path', { d: 'M300,380 c40,-40 80,30 120,0 s80,-30 120,0 s80,30 120,0 s60,-20 80,0', stroke: '#B8A06A', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const bLab = txt(iS, 530, 470, 'BACTERIUM', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: BACD });
const ph = phage(iS, 530, 100, 1.1); // tail tip at y ~ 100 + 148*1.1
const inj = mk(iS, 'path', { d: 'M530,100 L530,290 C530,320 560,330 590,320 C620,310 640,330 660,350', stroke: DNA, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const copies = []; const rI = M.rng(51); for (let k = 0; k < 10; k++) copies.push({ d: mk(iS, 'path', { d: '', stroke: DNA, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), h: mk(iS, 'path', { d: hexP(0, 0, 13), fill: CAP, stroke: BR, 'stroke-width': 2 }), x: 260 + (k % 5) * 130 + rI() * 30, y: 320 + Math.floor(k / 5) * 90 + rI() * 20 });
const kids = copies.map(c => { const g = mk(iS, 'g', {}); const p = phage(g, 0, 0, 0.32); return { g, x: c.x, y: c.y - 10, a: rI() * Math.PI * 2, sp: 0.6 + rI() * 0.6 }; });
const shards = [0, 1, 2, 3, 4, 5].map(k => mk(iS, 'path', { d: '', stroke: BACD, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));
const iFib = txt(iS, 760, 200, 'TAIL FIBRES', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 });

/* ---------- C: nucleic acids ---------- */
const C3 = [['PLANT VIRUSES', 'Single stranded RNA', 'usually · e.g. TMV', 1, RNA, 'C2'], ['BACTERIOPHAGES', 'Double stranded DNA', 'usually', 2, DNA, 'C3'], ['ANIMAL VIRUSES', 'ssRNA, dsRNA or dsDNA', 'any one of these', 3, RNA, 'C4']];
$('#c3s').innerHTML = C3.map(([h, n, d], i) => `<div class="card c3" id="cc${i}" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:30px">${h}</div><svg id="cs${i}" width="512" height="300" style="position:absolute;left:0;top:60px"></svg>
  <div class="nm3" style="font-size:${i === 2 ? 28 : 32}px">${n}</div><div class="ds3">${d}</div></div>`).join('');
const strand = (s, y, col, dbl) => { mk(s, 'path', { d: wave(60, y, 392, 26, 4), stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); if (dbl) { mk(s, 'path', { d: wave(60, y + 40, 392, 26, 4), stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); for (let k = 0; k < 16; k++) mk(s, 'line', { x1: 72 + k * 24, y1: y + 6, x2: 72 + k * 24, y2: y + 34, stroke: col, 'stroke-width': 2.5, opacity: 0.6 }); } };
strand($('#cs0'), 150, RNA, false); strand($('#cs1'), 130, DNA, true);
{ const s = $('#cs2'); mk(s, 'path', { d: wave(60, 80, 392, 18, 4), stroke: RNA, 'stroke-width': 5, fill: 'none' }); mk(s, 'path', { d: wave(60, 150, 392, 18, 4), stroke: RNA, 'stroke-width': 5, fill: 'none' }); mk(s, 'path', { d: wave(60, 176, 392, 18, 4), stroke: RNA, 'stroke-width': 5, fill: 'none' });
  mk(s, 'path', { d: wave(60, 236, 392, 18, 4), stroke: DNA, 'stroke-width': 5, fill: 'none' }); mk(s, 'path', { d: wave(60, 262, 392, 18, 4), stroke: DNA, 'stroke-width': 5, fill: 'none' }); }
const ckey = mk($('#cs0'), 'g', {}); [[RNA, 'RNA'], [DNA, 'DNA']].forEach(([c, s2], i) => { mk(ckey, 'circle', { cx: 60 + i * 110, cy: 260, r: 9, fill: c }); txt(ckey, 76 + i * 110, 266, s2, { 'font-size': 16, 'font-weight': 600, fill: c }); });
const th1 = PUC.think($('#th1'), { q: 'A virus carries double stranded DNA. Is it more likely a plant virus or a bacteriophage?', opts: ['Plant virus', 'Bacteriophage'], right: 1, why: 'A bacteriophage. Plant viruses usually carry single stranded RNA.' });

/* ---------- G: diseases ---------- */
const GH = [['Mumps', 'mumps'], ['Small pox', 'small'], ['Herpes', 'herpes'], ['Influenza', 'influenza'], ['AIDS', 'AIDS']];
$('#ghs').innerHTML = GH.map(([n], i) => `<div class="gch" id="gh${i}" style="left:36px;top:${84 + i * 76}px">${M.icon('user', 24, C.ac, 2.2)}${n}</div>`).join('');
const GP = [['Mosaic patches', 'mosaic'], ['Leaf rolling, curling', 'rolling'], ['Yellowing', 'yellowing'], ['Vein clearing', 'vein'], ['Stunted growth', 'stunted']];
$('#gps').innerHTML = GP.map(([n], i) => `<div class="gt" id="gp${i}" style="left:${700 + (i % 3) * 292}px;top:${84 + Math.floor(i / 3) * 216}px"><svg id="gpS${i}" width="228" height="140" style="position:absolute;left:0;top:0"></svg><span>${n}</span></div>`).join('');
const gpL = GP.map((_, i) => { const s = $('#gpS' + i); const leaf = mk(s, 'path', { d: 'M40,110 C60,40 150,20 190,40 C186,100 120,130 40,110 Z', fill: LEAF, stroke: BR, 'stroke-width': 3 });
  const vein = mk(s, 'path', { d: 'M40,110 Q120,80 190,40', stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none' });
  if (i === 0) [[90, 80], [130, 60], [150, 90]].forEach(([x, y]) => mk(s, 'ellipse', { cx: x, cy: y, rx: 14, ry: 9, fill: LEAFL }));
  return { leaf, vein, s }; });
const avG = PUC.avatar($('#sG'), { x: 160 + 300, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'My cold is on this list too.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">NUCLEIC ACID + CAPSID = <b>NUCLEOPROTEIN</b></span>';

/* ---------- W: label two viruses ---------- */
const wS = $('#wS');
const wT = mk(wS, 'g', {}); tmvRod(wT, 90, 250, 560, 80, true);
const wP = phage(wS, 1160, 150, 1.55);
const WL = [[300, 210, 300, 120, 'Capsid', wt('W2', 'capsid')], [690, 250, 720, 360, 'RNA (single strand)', wt('W2', 'RNA')], [1160, 120, 1300, 90, 'Head', wt('W3', 'head')], [1190, 160, 1300, 150, 'DNA (double strand)', wt('W3', 'DNA')],
  [1180, 210, 1300, 210, 'Collar', wt('W3', 'collar')], [1172, 260, 1300, 270, 'Sheath', wt('W3', 'sheath')], [1130, 340, 980, 380, 'Tail fibres', wt('W3', 'fibres')]];
const wLB = WL.map(([px, py, lx, ly, s, tt]) => { const ln = mk(wS, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(wS, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const left = lx < px && lx < 1000 && lx > 900; const tx = mk(wS, 'text', { x: left ? lx - 10 : lx + 10, y: ly + 9, class: 'zl', 'text-anchor': left ? 'end' : 'start' }); tx.textContent = s; return { ln, dot, tx, tt }; });
const WC = [['SHAPE', 'Helical rod', 'Polyhedral head + tail'], ['NUCLEIC ACID', 'ssRNA', 'dsDNA'], ['HOST', 'Plant (tobacco)', 'Bacterium']];
$('#wcs').innerHTML = WC.map(([k, a, b], i) => `<div class="cmpW" id="wcA${i}" style="left:${90 + i * 196}px;top:${430 + 0}px"><b>${k}</b>${a}</div><div class="cmpW" id="wcB${i}" style="left:${830}px;top:${410 + i * 54}px"><b>${k}</b>${b}</div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A virus has both DNA and RNA, like a cell', right: 'A virus has either RNA or DNA, never both' });
const tS = $('#tS'); const tv = [0, 1].map(k => { const g = mk(tS, 'g', {}); mk(g, 'path', { d: hexP(120 + k * 220, 120, 62), fill: '#F6F1E8', stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: `M${88 + k * 220},112 c16,-24 32,16 48,0 s20,-18 30,0`, stroke: k ? DNA : RNA, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); txt(g, 120 + k * 220, 222, k ? 'DNA ONLY' : 'RNA ONLY', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: k ? DNA : RNA }); return g; });
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Statement questions: which line about virus structure is true' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · MATCH THE FOLLOWING · ORIGINAL', qW: 960,
  q: 'Match list I with list II.<div class="cols2"><div><div class="sl"><b>a</b>Ivanowsky</div><div class="sl"><b>b</b>Beijerinek</div><div class="sl"><b>c</b>Stanley</div><div class="sl"><b>d</b>Capsomeres</div></div><div><div class="sl"><b>i</b>Crystals, mostly protein</div><div class="sl"><b>ii</b><i>Contagium vivum fluidum</i></div><div class="sl"><b>iii</b>Subunits of the capsid</div><div class="sl"><b>iv</b>Agent smaller than bacteria</div></div></div>',
  opts: ['a-iv, b-ii, c-i, d-iii', 'a-ii, b-iv, c-i, d-iii', 'a-iv, b-i, c-ii, d-iii', 'a-i, b-ii, c-iv, d-iii'], right: 0, optW: 474, optY: 400, optH: 84, optFs: 26 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], ['<b>a-iv</b>: smaller than bacteria'], ['<b>b-ii</b>: <i>contagium vivum fluidum</i>'], ['<b>c-i</b>: crystals, mostly protein'], ['<b>d-iii</b>: capsid subunits']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Ivanowsky'), wt('A2', 'Beijerinek'), wt('A3', 'Stanley'), wt('A3', 'capsomeres')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · viruses and their structure', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Virus</b>: non-cellular, obligate parasite, inert outside a cell', '<b>Capsid</b> of capsomeres + <b>RNA or DNA</b>, never both', '<b>Plants</b> ssRNA · <b>phages</b> dsDNA · <b>animals</b> ssRNA, dsRNA or dsDNA',
    '<b>1892</b> Ivanowsky · <b>1898</b> Beijerinek · <b>1935</b> Stanley', '<b>Diseases</b>: mumps, small pox, herpes, influenza, AIDS'] });
const YQ = ['Why is a virus called an obligate parasite?', 'What is a capsid, and what is it made of?', 'What did Stanley show about viruses?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 19', topic: 'Smaller than a virus, with no coat? Viroids and Prions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('I4') - 0.3, 1.05, 960, 600], [T0('C1') - 0.6, 1, 960, 540]]);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'victims') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'smaller') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'Antibiotics') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    M.vis($('#tq3 .lbl'), t, tH4, 1e9, { dy: 8 });
    M.vis($('#tq0'), t, wt('H4', 'what') - 0.2, 1e9, { dx: -20, dy: 0 }); M.vis($('#tq1'), t, wt('H4', 'alive') - 0.5, 1e9, { dx: -20, dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#cl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cr'), t, EV[0][4] + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(tlL, t, EV[0][4] - 0.2, EV[2][4] - EV[0][4] + 0.2, M.o3);
    EV.forEach((e, i) => { const el = $('#ev' + i); M.vis(el, t, e[4] - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis(el.querySelector('.dt'), t, e[4] - 0.15, 1e9, { ...POP, sc: 0.3 }); });
    const cryOn = t >= tCry - 0.2;
    M.hide(fx.fil, cryOn); M.hide(fx.leaf, cryOn); M.vis(fx.fil, t, EV[0][4] + 0.6, 1e9, { dy: 12 });
    bacs.forEach((b, k) => M.vis(b, t, tFil - 0.6 + k * 0.1, 1e9, { ...POP, sc: 0.3 }));
    vir.forEach(v => { const u = t < tFil ? -1 : ((t - tFil) * 0.45 + v.ph) % 1; M.hide(v.e, u < 0 || cryOn); if (u >= 0) { const y = 170 + u * 260, x = y < 300 ? v.x + (290 - v.x) * M.clamp((y - 222) / 78) : 290 + (v.x - 290) * 0.4 * M.clamp((y - 350) / 80); attr(v.e, 'cx', x.toFixed(1)); attr(v.e, 'cy', y.toFixed(1)); v.e.style.opacity = Math.min(1, u * 6, (1 - u) * 5).toFixed(2); } });
    M.vis(fx.leaf, t, tJuice - 0.2, 1e9, { dy: 16 }); const sick = M.io((t - tInf) / 1.2); mos.forEach(m => m.style.opacity = sick); sickT.style.opacity = sick;
    M.setT($('#crL'), cryOn ? 'STANLEY · CRYSTALS' : t >= tJuice - 0.2 ? 'JUICE INFECTS A HEALTHY LEAF' : 'THE FILTER EXPERIMENT');
    M.vis(fx.cry, t, tCry - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('Z1');
    M.vis($('#va'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(vaG, t, wt('V2', 'inert') - 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.SOFT, fade: 0.15 }); M.vis(vaZ, t, wt('V2', 'feed') - 0.1, 1e9, { dy: 6 }); M.vis($('#vaP'), t, wt('V2', 'crystal') - 0.1, 1e9, POP);
    const tm = wt('V3', 'copies'), n = Math.floor(M.clamp((t - tm + 0.6) / 2.4) * 30);
    vbV.forEach((v, k) => { M.hide(v.e, k >= n); attr(v.e, 'transform', `translate(${(v.x + 4 * Math.sin(t * 2 + k)).toFixed(1)} ${(v.y + 4 * Math.cos(t * 1.7 + k)).toFixed(1)})`); });
    M.vis(vbX, t, wt('V3', 'killing') - 0.1, 1e9, POP);
    M.vis($('#vbP'), t, wt('V4', 'obligate') - 0.1, 1e9, POP); M.vis($('#vbQ'), t, wt('V4', 'cells') - 0.1, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tK1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('K1');
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
    avZ(t, wt('Z5', 'spiral') + 0.3, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tI1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('I1');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, T0('K3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(kV, t, wt('K2', 'Outside') - 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.SOFT, fade: 0.15 }); M.draw(kNA, t, wt('K2', 'Inside') - 0.1, 0.8);
    kCaps.forEach((c, k) => { const on = M.io((t - wt('K3', 'Capsomeres') - (k % 30) * 0.02) / 0.3); attr(c, 'fill', mix(CAP, C.ac2, on * (1 - M.io((t - wt('K3', 'Capsomeres') - 1.6) / 0.4)))); });
    kNA.setAttribute('stroke', t > wt('K4', 'DNA') - 0.1 && t < wt('K4', 'both') ? DNA : RNA);
    kLab.forEach(l => { M.draw(l.ln, t, l.tt, 0.4); M.vis(l.dot, t, l.tt - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - l.tt - 0.3) / 0.25).toFixed(3); });
    KB.forEach((k, i) => { const el = $('#kb' + i); M.vis(el, t, k[2] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - k[2]) / 0.25) * (1 - M.io((t - (KB[i + 1] ? KB[i + 1][2] : 1e9)) / 0.3))); });
  }

  /* I: infection */
  const iOn = t >= tI1 - 0.1 && t < tC1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('C1');
    M.vis($('#ich'), t, tI1 + 0.1, out, { dy: 12, ...o }); M.vis($('#iA'), t, tI1 + 0.15, out, { dx: -60, dy: 0, ...o }); M.vis($('#iL'), t, tI1 + 0.3, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tIs.forEach((tt, i) => { if (t >= tt - 0.2) cur = i; });
    IN.forEach((_, i) => { const el = $('#ic' + i), on = i === cur ? 1 : 0, done = i < cur; el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#ili'), t, tI1 + 0.4, tIs[0] - 0.2, { dy: 16, outDur: 0.25, ody: -12 });
    IL.forEach((_, i) => M.vis($('#il' + i), t, tIs[i] - 0.1, i < 4 ? tIs[i + 1] - 0.2 : 1e9, { dy: 16, outDur: 0.25, ody: -12 }));
    const land = M.io((t - tIs[0] + 0.2) / 1.0), inj2 = M.io((t - tIs[1]) / 1.2), cp = M.io((t - tIs[2]) / 1.8), as = M.io((t - tIs[3]) / 1.2), bu = M.io((t - tIs[4]) / 0.6);
    const py = -140 + 140 * land; attr(ph.g, 'transform', `translate(0 ${py.toFixed(1)})`); M.hide(ph.g, t < tI1 + 0.2 || bu > 0.3); ph.g.style.opacity = (1 - bu * 3).toFixed(2);
    ph.dna.style.opacity = (1 - inj2).toFixed(2); M.vis(iFib, t, tIs[0] + 0.6, tIs[2], { dy: 6 });
    M.drawU(inj, inj2); M.hide(inj, inj2 <= 0 || cp >= 1); inj.style.opacity = (1 - M.clamp((cp - 0.6) / 0.4)).toFixed(2);
    M.hide(bDNA, bu > 0.2); bDNA.style.opacity = (1 - cp * 0.7).toFixed(2);
    copies.forEach((c, k) => { const on = M.clamp(cp * 10 - k); const x = c.x, y = c.y; attr(c.d, 'd', `M${x - 26},${y + 22} c10,-12 18,12 28,0 s16,-12 24,0`); c.d.style.opacity = on * (1 - as); attr(c.h, 'transform', `translate(${x} ${y - 10}) scale(${on.toFixed(2)})`); c.h.style.opacity = (1 - as).toFixed(2); M.hide(c.d, on <= 0 || as >= 1); M.hide(c.h, on <= 0 || as >= 1); });
    kids.forEach((k, i) => { const on = M.clamp(as * 10 - i); const fly = bu; const a = k.a, d = 520 * fly * k.sp, x = k.x + Math.cos(a) * d, y = k.y + Math.sin(a) * d * 0.6 - 40 * fly;
      M.hide(k.g, on <= 0); attr(k.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${on.toFixed(2)}) rotate(${(fly * 120 * (i % 2 ? 1 : -1)).toFixed(0)})`); });
    M.hide(bOut, bu > 0); M.hide(bLab, bu > 0);
    shards.forEach((s, k) => { M.hide(s, bu <= 0); if (bu > 0) { const a0 = k * Math.PI / 3, cx = 530 + Math.cos(a0 + 0.5) * 200 * bu, cy = 375 + Math.sin(a0 + 0.5) * 80 * bu; attr(s, 'd', `M${(cx + 300 * Math.cos(a0) * 0.5).toFixed(1)},${(cy + 100 * Math.sin(a0) * 0.5).toFixed(1)} A350 115 0 0 1 ${(cx + 300 * Math.cos(a0 + 0.8) * 0.5).toFixed(1)},${(cy + 100 * Math.sin(a0 + 0.8) * 0.5).toFixed(1)}`); s.style.opacity = (1 - M.clamp((bu - 0.5) / 0.5) * 0.8).toFixed(2); } });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tG1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    C3.forEach((c, i) => { const el = $('#cc' + i), tt = T0(c[5]); M.vis(el, t, i ? tt - 0.2 : tC1 + 0.2, out, { dy: 36, ...o });
      M.vis(el.querySelector('.nm3'), t, tt + 0.1, 1e9, { dy: 10 }); M.vis(el.querySelector('.ds3'), t, tt + 0.5, 1e9, { dy: 10 });
      const s = $('#cs' + i); [...s.querySelectorAll('path')].forEach((p, k) => M.draw(p, t, tt + 0.2 + k * 0.15, 0.8)); el.style.borderTopColor = mix(C.dim, C.ac, M.io((t - tt) / 0.3)); });
    M.vis(ckey, t, T0('C2') + 1, 1e9, { dy: 6 });
    M.vis($('#th1'), t, T0('C5') + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: T0('C5'), tOpts: wt('C5', 'plant') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'Plant') });
  }

  /* G: diseases */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gd'), t, tG1 + 0.05, OUT('T1'), { dy: 36, ...o });
    GH.forEach(([, w], i) => M.vis($('#gh' + i), t, wt('G2', w) - 0.15, 1e9, { dx: -16, dy: 0 }));
    GP.forEach(([, w], i) => { const tt = wt('G2', w); M.vis($('#gp' + i), t, tt - 0.15, 1e9, POP); const g = gpL[i], u = M.io((t - tt) / 1.2);
      if (i === 1) attr(g.leaf, 'transform', `rotate(${(-14 * u).toFixed(1)} 115 75) scale(1 ${(1 - 0.35 * u).toFixed(3)})`); if (i === 2) g.leaf.setAttribute('fill', mix(LEAF, '#E8D46A', u));
      if (i === 3) g.vein.setAttribute('stroke', mix('#D8ECD2', '#FFFFFF', u)), g.vein.setAttribute('stroke-width', 3 + 3 * u); if (i === 4) attr(g.leaf, 'transform', `translate(${(40 * u).toFixed(1)} ${(30 * u).toFixed(1)}) scale(${(1 - 0.4 * u).toFixed(3)})`); });
    avG(t, wt('G2', 'influenza') + 0.2, wt('G2', 'plants') - 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'virus') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Never') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    M.vis(wT, t, T0('W2') - 0.1, 1e9, { dy: 16 }); M.vis(wP.g, t, T0('W3') - 0.1, 1e9, { dy: 16 });
    wLB.forEach(l => { M.draw(l.ln, t, l.tt, 0.4); M.vis(l.dot, t, l.tt - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - l.tt - 0.3) / 0.25).toFixed(3); });
    const ta = [wt('W2', 'helical'), wt('W2', 'RNA'), wt('W2', 'host')], tb = [wt('W3', 'many'), wt('W3', 'double'), wt('W4', 'bacterium')];
    WC.forEach((_, i) => { M.vis($('#wcA' + i), t, ta[i], 1e9, POP); M.vis($('#wcB' + i), t, tb[i], 1e9, POP); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'virus') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'only') - 0.1 });
    M.vis(tv[0], t, wt('X3', 'Either') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tv[1], t, wt('X3', 'DNA') - 0.1, 1e9, { ...POP, sc: 0.5 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'statement') });
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
