// PUC Biology Ep 12: Five-Kingdom Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fb = el => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; return el; };
const BR = '#2E2A24', GRN = C.ac, NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', WALL = '#C9B36A', CHIT = '#8C6D4F';
// kingdom colours (one per kingdom, same in chips, table header dots, sort board and recap)
const KC = { Monera: '#0F8F8F', Protista: '#D0632F', Fungi: CHIT, Plantae: '#3E9B5F', Animalia: '#B5476E' };
const KN = ['Monera', 'Protista', 'Fungi', 'Plantae', 'Animalia'];
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  mush: ['M3.5 11.5a8.5 7 0 0 1 17 0Z', 'M9.5 11.5v6.5a2.5 2.5 0 0 0 5 0v-6.5', ci(9, 8, 0.8), ci(14.5, 7, 0.8)],
  eug: ['M3 13.5c3.2-4.2 9.6-4.8 13.6-1.6-4 3.4-10.4 3.6-13.6 1.6Z', 'M16.6 11.9c2-1.4 3-3.6 5-3.6', ci(8.5, 12.8, 1.4)],
  bread: ['M4 10a5 4 0 0 1 3-6h10a5 4 0 0 1 3 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z', ci(9, 13, 1.2), ci(14, 11, 1), ci(13, 16, 1.3)],
  amoeba: ['M6 8c2-4 7-3 8-1s5-1 6 2-2 4 0 6-3 5-6 3-5 3-7 0-4-1-3-4-1-4 2-6Z', ci(11, 12, 2)],
  para: ['M4 13c0-4 5-7 10-6s7 3 6 6-6 5-10 4-6-1-6-4Z', 'M8 12.5c2 1.6 5 1.6 6 0', 'M4 10 2.5 9', 'M6 7.5 5 6', 'M10 6 9.6 4.5', 'M15 6.4l.6-1.4', 'M19 9l1.4-.8', 'M20 14l1.5.4', 'M17 17.5l1 1', 'M12 18.8l-.2 1.5', 'M7 18l-1 1.2'],
  chlamy: [ci(12, 14, 6), 'M10.5 8.4C9 5.5 7 4 5 3.5', 'M13.5 8.4C15 5.5 17 4 19 3.5', ci(12, 15, 2.2)],
  yeast: [ci(10, 13, 6), ci(17.5, 8, 3.2), ci(10, 13, 1.8)],
  fern: ['M12 21V4', 'M12 7c-2-1-4-1-6 0', 'M12 7c2-1 4-1 6 0', 'M12 11c-2.5-1-5-1-7 .5', 'M12 11c2.5-1 5-1 7 .5', 'M12 15c-2.5-1-5-.5-7 1', 'M12 15c2.5-1 5-.5 7 1'],
  worm: ['M3 15c2-4 4-4 6 0s4 4 6 0 4-4 6 0', 'M6 13.5v2', 'M12 14.5v2', 'M18 13.5v2'],
  filament: [ci(4, 12, 2.2), ci(8.6, 12, 2.2), ci(13.2, 12, 2.6), ci(18, 12, 2.2)],
  cellI: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  body: [ci(12, 5, 2.4), 'M12 8v7', 'M8 11h8', 'M12 15l-3 5', 'M12 15l3 5'],
  food: ['M3 11h18a9 7 0 0 1-18 0Z', 'M8 7c0-1.5 1.5-1.5 1.5-3', 'M13 7c0-1.5 1.5-1.5 1.5-3'],
  split: [ci(7, 12, 4.5), ci(17, 12, 4.5)],
  tree2: ['M12 21v-6', 'M12 15l-5-5', 'M12 15l5-5', 'M7 10V5', 'M17 10V5', ci(7, 4, 1.4), ci(17, 4, 1.4)],
});
const KI = { Monera: 'microbe', Protista: 'eug', Fungi: 'mush', Plantae: 'leaf', Animalia: 'paw' };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tM1 = T0('M1'), tL1 = T0('L1'), tP1 = T0('P1'), tP4 = T0('P4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const labels = (g, L) => L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = fb(mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }));
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
});
const runLabs = (LB, t, ts) => LB.forEach((l, i) => { const t0 = ts[i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });

/* ---------- title card: five living things ---------- */
const JOBS = [['microbe', 'Curd bacteria', 'IN YOUR CURD', 'Curd'], ['eug', 'A green cell', 'IN POND WATER', 'green'], ['bread', 'Bread mould', 'ON OLD BREAD', 'Bread'], ['mango', 'A mango tree', 'IN THE GARDEN', 'mango'], ['paw', 'A cat', 'ON THE WALL', 'cat']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${160 + i * 328}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n], i) => `<div class="jr" id="jr${i}" style="top:${80 + i * 84}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jt" id="jt${i}">PLANT OR ANIMAL?</div></div>`).join('');
// Diya's notebook page with five boxes sketched in pencil
const hs = $('#hkS'), nbG = mk(hs, 'g', {}), nbBox = [], nbTx = [];
{ mk(nbG, 'rect', { x: 36, y: 84, width: 712, height: 392, rx: 10, fill: '#FFFDF6', stroke: C.line, 'stroke-width': 2 });
  for (let k = 0; k < 9; k++) mk(nbG, 'line', { x1: 36, y1: 126 + k * 40, x2: 748, y2: 126 + k * 40, stroke: '#DDE6F1', 'stroke-width': 2 });
  mk(nbG, 'line', { x1: 92, y1: 84, x2: 92, y2: 476, stroke: '#F0B8B8', 'stroke-width': 2 });
  const NB = ['No nucleus', 'One eukaryotic cell', 'Makes food', 'Chitin wall', 'No wall'];
  NB.forEach((n, i) => { const x = 116 + (i % 3) * 210, y = i < 3 ? 140 : 300;
    nbBox.push(mk(nbG, 'rect', { x, y, width: 190, height: 120, rx: 8, fill: 'none', stroke: '#5B6478', 'stroke-width': 3, 'stroke-dasharray': '2 0' }));
    nbTx.push(txt(nbG, x + 95, y + 68, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 17, 'font-weight': 600, fill: '#3A4560' })); }); }
const whoC = document.createElement('div'); whoC.className = 'pillp ink'; whoC.style.cssText = 'left:470px;top:400px;height:52px;font-size:22px'; whoC.innerHTML = 'R. H. Whittaker · <span style="font-family:IBM Plex Mono">1969</span>'; $('#hk').appendChild(whoC);

/* ---------- B: Whittaker ---------- */
$('#k5s').innerHTML = KN.map((n, i) => `<div class="k5" id="k5${i}" style="left:${36 + i * 145}px"><i>${M.icon(KI[n], 52, KC[n], 2)}</i><span>${n}</span><b style="background:${KC[n]}"></b></div>`).join('');
const tK5 = KN.map((n, i) => wt('B2', i < 3 ? n : i === 3 ? 'Plantae' : 'Animalia'));
const CR = [['cellI', 'Cell structure', 'PROKARYOTIC OR EUKARYOTIC', 'cell'], ['body', 'Body organisation', 'CELL, THREADS, TISSUES, ORGANS', 'body'], ['food', 'Mode of nutrition', 'MAKES FOOD OR TAKES IT', 'nutrition'],
  ['split', 'Reproduction', 'HOW IT MAKES MORE OF ITSELF', 'reproduction'], ['tree2', 'Phylogenetic relationships', 'SHARED ANCESTORS', 'phylogenetic']];
$('#cr5s').innerHTML = CR.map(([ic, n, w], i) => `<div class="cr5" id="cr${i}" style="top:${80 + i * 94}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="cn">${n}</div><div class="cw">${w}</div></div>`).join('');
const tCr = CR.map(c => wt('B3', c[3]));

/* ---------- M: two boxes break into five ---------- */
$('#nbs').innerHTML = KN.map((n, i) => `<div class="nb" id="nb${i}" style="left:${36 + i * 309.5}px;border-color:${KC[n]}"><div class="nn" style="background:${KC[n]}">${M.icon(KI[n], 20, '#fff', 2.4)}${n.toUpperCase()}</div></div>`).join('');
// chip: [name, icon, old box (0 P, 1 A), new kingdom index, line/word of the move]
const CH = [['Bacteria', 'microbe', 0, 0, ['M2', 'Monera']], ['Fungi', 'mush', 0, 2, ['M3', 'Kingdom']], ['Chlamydomonas', 'chlamy', 0, 1, ['M6', 'Protista']], ['Chlorella', 'chlamy', 0, 1, ['M6', 'Protista']],
  ['Mango tree', 'mango', 0, 3, ['M7', 'Plantae']], ['Amoeba', 'amoeba', 1, 1, ['M6', 'Protista']], ['Paramoecium', 'para', 1, 1, ['M6', 'Protista']], ['Cat', 'paw', 1, 4, ['M7', 'Animalia']]];
$('#chps').innerHTML = CH.map(([n, ic], i) => `<div class="chp" id="cp${i}"><i>${M.icon(ic, 24, C.ink, 2.2)}</i>${n}</div>`).join('');
const tMove = CH.map(c => wt(c[4][0], c[4][1]) + (c[0] === 'Chlorella' || c[0] === 'Paramoecium' ? 0.2 : 0));
const tHi = { Chlamydomonas: wt('M4', 'Chlamydomonas'), Chlorella: wt('M4', 'Chlorella'), Amoeba: wt('M5', 'Amoeba'), Paramoecium: wt('M5', 'Paramoecium') };
const WTAG = [['Chlamydomonas', 'WALL'], ['Chlorella', 'WALL'], ['Amoeba', 'NO WALL'], ['Paramoecium', 'NO WALL']];
const posOld = [], posNew = [];

/* ---------- L: the table ---------- */
const TX = [260, 518, 776, 1034, 1292], TW = 250;
$('#ths').innerHTML = `<div class="th" style="left:24px;width:224px;background:var(--soft);color:var(--mute);font:600 16px 'IBM Plex Mono';letter-spacing:.08em">CHARACTER</div>` + KN.map((n, i) => `<div class="th" id="kh${i}" style="left:${TX[i]}px;width:${TW}px"><b style="background:${KC[n]}"></b>${n}</div>`).join('');
const ROWS = [['Cell type', 'ROW 1', [['Prokaryotic'], ['Eukaryotic'], ['Eukaryotic'], ['Eukaryotic'], ['Eukaryotic']], 'L2', ['prokaryotic', 'eukaryotic', 'eukaryotic', 'eukaryotic', 'eukaryotic'], [0, 0.15, 0.3, 0.45]],
  ['Cell wall', 'ROW 2', [['Non-cellulosic', 'POLYSACCHARIDE + AMINO ACID'], ['Present in some'], ['Present', 'WITH CHITIN'], ['Present', 'CELLULOSE'], ['Absent']], 'L3', ['Monera', 'protists', 'Fungi', 'Plants', 'Animals']],
  ['Nuclear membrane', 'ROW 3', [['Absent'], ['Present'], ['Present'], ['Present'], ['Present']], 'L4', ['absent', 'present', 'present', 'present', 'present'], [0, 0.15, 0.3, 0.45]],
  ['Body organisation', 'ROW 4', [['Cellular'], ['Cellular'], ['Multicellular', 'LOOSE TISSUE'], ['Tissue / organ'], ['Tissue / organ', '/ ORGAN SYSTEM']], 'L5', ['Monera', 'Protista', 'Fungi', 'Plants', 'Animals']],
  ['Mode of nutrition', 'ROW 5', [['Autotrophic and heterotrophic', 'CHEMO/PHOTO · SAPRO/PARASITIC'], ['Autotrophic and heterotrophic', 'AUTO = PHOTOSYNTHETIC'], ['Heterotrophic', 'SAPROPHYTIC / PARASITIC'], ['Autotrophic', 'PHOTOSYNTHETIC'], ['Heterotrophic', 'HOLOZOIC / SAPROPHYTIC ETC.']], 'L6', ['Monera', 'Protista', 'Fungi', 'Plants', 'Animals']]];
const RY = r => 132 + r * 88;
$('#rws').innerHTML = ROWS.map(([n, rr], r) => `<div class="rw" id="rw${r}" style="top:${RY(r)}px"></div><div class="rl" id="rl${r}" style="top:${RY(r)}px"><em>${rr}</em>${n}</div>`).join('');
$('#tcs').innerHTML = ROWS.map(([, , cells], r) => cells.map(([m, s], k) => `<div class="tc" id="tc${r}${k}" style="left:${TX[k]}px;top:${RY(r)}px">${m}${s ? `<s>${s}</s>` : ''}</div>`).join('')).join('');
const tCell = ROWS.map(([, , , id, ws, same]) => ws.map((w, k) => { if (same && k > 0) return wt(id, w) + same[k - 1]; if (same) return wt(id, w); return wt(id, w); }));
// fix the "same word" rows (eukaryotic / present): the four cells pop in a quick run after the word
ROWS.forEach(([, , , id, ws, same], r) => { if (same) { const tw = wt(id, ws[1]); for (let k = 1; k < 5; k++) tCell[r][k] = tw + same[k - 1]; } });
// L5: Monera and Protista are both "just cells"
tCell[3][0] = wt('L5', 'Monera'); tCell[3][1] = wt('L5', 'Protista');
const gridS = document.createElementNS(nsv, 'svg'); gridS.setAttribute('width', 1600); gridS.setAttribute('height', 580); gridS.style.cssText = 'position:absolute;left:0;top:0'; $('#tb').insertBefore(gridS, $('#rws'));
const gl = [1, 2, 3, 4].map(r => mk(gridS, 'line', { x1: 24, y1: RY(r) - 4, x2: 1576, y2: RY(r) - 4, stroke: C.line, 'stroke-width': 2 }));

/* ---------- P: Monera vs Protista ---------- */
const pLB = [];
{ const s = $('#paS'), g = mk(s, 'g', {});
  mk(g, 'rect', { x: 150, y: 190, width: 470, height: 200, rx: 100, fill: '#E7E1C2', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 166, y: 206, width: 438, height: 168, rx: 84, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M270,290 c16,-36 40,30 60,0 s40,30 60,-6 s36,26 52,0 s30,24 44,4 c-6,-20 -30,-30 -56,-20 s-60,-12 -90,4 s-52,-6 -70,18', stroke: NUC, 'stroke-width': 4, fill: 'none' });
  for (let k = 0; k < 14; k++) mk(g, 'circle', { cx: 210 + (k * 67) % 360, cy: 236 + (k * 41) % 110, r: 5, fill: '#8E7AB0' });
  pLB.push(labels(g, [[160, 290, 120, 120, 'Cell wall', 'start'], [420, 300, 460, 460, 'DNA (no membrane)', 'start'], [300, 206, 330, 120, 'Cell membrane', 'start']])); }
const amb = { };
{ const s = $('#pbS'), g = mk(s, 'g', {});
  amb.b = mk(g, 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  amb.n = mk(g, 'circle', { cx: 360, cy: 290, r: 40, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 6 }); mk(g, 'circle', { cx: 360, cy: 290, r: 32, fill: 'none', stroke: NUC, 'stroke-width': 2 }); mk(g, 'circle', { cx: 362, cy: 292, r: 12, fill: NUC });
  mk(g, 'circle', { cx: 450, cy: 330, r: 18, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 300, cy: 352, r: 13, fill: '#fff', stroke: WAT, 'stroke-width': 2.5 });
  pLB.push(labels(g, [[360, 252, 300, 120, 'Nuclear membrane', 'start'], [362, 292, 220, 470, 'Nucleus', 'start', [220, 470]], [560, 270, 600, 150, 'Pseudopodium', 'end']])); }
const amoeba = (cx, cy, R, tt) => { const n = 36, pts = [];
  for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n, r = R * (1 + 0.14 * Math.sin(3 * a + 0.9 * tt) + 0.07 * Math.sin(5 * a - 1.3 * tt + 1) + 0.22 * Math.max(0, Math.cos(a)) ** 6); pts.push([cx + r * Math.cos(a) * 1.15, cy + r * Math.sin(a) * 0.86]); }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let k = 0; k < n; k++) { const p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; }
  return d + 'Z'; };
const tPa = [wt('P2', 'One'), wt('P2', 'no'), wt('P2', 'small')], tPb = [wt('P3', 'nuclear'), wt('P3', 'true'), wt('P3', 'Amoeba')];
const th1 = PUC.think($('#th1'), { q: 'Paramoecium is one cell with a true nucleus. Monera or Protista?', opts: ['Monera', 'Protista'], right: 1, why: 'Protista. It has a nuclear membrane, so it is a eukaryote. Monera have none.' });
const avP = PUC.avatar($('#sP'), { x: 976 + 400, y: 270 + 26, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'One cell, two kingdoms?' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:600 30px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.02em">' + KN.map(n => `<b style="color:${KC[n]}">${n}</b>`).join(' · ') + '</span>';

/* ---------- W: worked example (sort board) ---------- */
const WC = [['NO NUCLEAR MEMBRANE', 'Anabaena', 'filament', 0, 'a blue green filament', wt('W2', 'Anabaena')], ['ONE EUKARYOTIC CELL', 'Paramoecium', 'para', 1, 'cilia, a true nucleus', wt('W3', 'Paramoecium')],
  ['ONE CELL · GREEN', 'Chlamydomonas', 'chlamy', 1, 'green, yet a protist', wt('W4', 'Chlamydomonas')], ['ONE CELL · A FUNGUS', 'Yeast', 'yeast', 2, 'a sac fungus', wt('W5', 'Yeast')],
  ['CELLULOSE · MAKES FOOD', 'Fern', 'fern', 3, 'many cells, organs', wt('W6', 'fern')], ['NO WALL · EATS', 'Earthworm', 'worm', 4, 'organ systems', wt('W6', 'earthworm')]];
$('#cols').innerHTML = WC.map(([h, n, ic, k, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2">${h}</div><div class="it" id="it${i}"><div class="ic">${M.icon(ic, 76, C.ink, 2)}</div><div class="inm">${n}</div></div>
  <div class="dz"></div><div class="kg" id="kg${i}" style="background:${KC[KN[k]]}">${KN[k].toUpperCase()}</div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
const tKg = [wt('W2', 'Monera'), wt('W3', 'Protista'), wt('W4', 'Protista'), wt('W5', 'Fungi'), wt('W6', 'Plantae'), wt('W6', 'Animalia')];
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Yeast is one cell, but a fungus!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every single celled living thing is a protist', right: 'Protista = single celled eukaryotes only' });
const tSv = $('#tS'), tCel = [];
[['MONERA', 'bacterium'], ['PROTISTA', 'amoeba'], ['FUNGI', 'yeast']].forEach(([n, w], i) => { const x = 96 + i * 168, g = fb(mk(tSv, 'g', {})), col = KC[KN[[0, 1, 2][i]]];
  if (i === 0) { mk(g, 'rect', { x: x - 60, y: 106, width: 120, height: 64, rx: 32, fill: '#F3F7EA', stroke: '#7A6A2E', 'stroke-width': 5 }); mk(g, 'path', { d: `M${x - 30},138 c8,-14 16,12 24,0 s16,12 24,0 s12,10 16,0`, stroke: NUC, 'stroke-width': 3, fill: 'none' }); }
  if (i === 1) { mk(g, 'path', { d: `M${x - 56},140 C${x - 60},96 ${x - 10},76 ${x + 20},92 C${x + 70},96 ${x + 66},150 ${x + 40},172 C${x + 10},196 ${x - 50},186 ${x - 56},140 Z`, fill: '#E9DDF0', stroke: BR, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: x, cy: 138, r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); }
  if (i === 2) { mk(g, 'circle', { cx: x - 8, cy: 142, r: 42, fill: '#FBF6EC', stroke: CHIT, 'stroke-width': 5 }); mk(g, 'circle', { cx: x + 40, cy: 100, r: 20, fill: '#FBF6EC', stroke: CHIT, 'stroke-width': 4 }); mk(g, 'circle', { cx: x - 8, cy: 142, r: 14, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); }
  txt(g, x, 230, n, { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.2, fill: col }); txt(g, x, 252, 'one cell · ' + w, { 'text-anchor': 'middle', 'font-size': 14, fill: C.dim }); tCel.push(g); });
const where = PUC.where($('#wa'), { on: [], type: 'Match the following on kingdom features, or statements from the table' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, optY: 404, optW: 474, optFs: 28,
  q: 'Match each kingdom with its feature.<div class="mt2"><div><b>a</b>Monera<br><b>b</b>Fungi<br><b>c</b>Plantae<br><b>d</b>Animalia</div><div><b>i</b>Cell wall with chitin<br><b>ii</b>No cell wall<br><b>iii</b>Non-cellulosic wall, no nuclear membrane<br><b>iv</b>Cellulose cell wall</div></div>',
  opts: ['a-i, b-iii, c-iv, d-ii', 'a-iii, b-iv, c-i, d-ii', 'a-iii, b-i, c-iv, d-ii', 'a-ii, b-i, c-iv, d-iii'], right: 2 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['<b style="color:' + KC.Monera + '">a</b> Monera: iii'], ['<b style="color:' + KC.Fungi + '">b</b> Fungi: i, chitin'], ['<b style="color:' + KC.Plantae + '">c</b> Plantae: iv'], ['<b style="color:' + KC.Animalia + '">d</b> Animalia: ii']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Monera'), wt('A3', 'Fungi'), wt('A3', 'Plants'), wt('A3', 'Animals')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · five kingdom classification', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>R. H. Whittaker, 1969</b>: five kingdoms', `<b style="color:${KC.Monera}">Monera</b>: prokaryotic, no nuclear membrane`, `<b style="color:${KC.Protista}">Protista</b>: single celled eukaryotes`,
    `<b style="color:${KC.Fungi}">Fungi</b>: chitin wall, heterotrophic`, `<b style="color:${KC.Plantae}">Plantae</b>: cellulose wall, autotrophic`, `<b style="color:${KC.Animalia}">Animalia</b>: no cell wall, heterotrophic`] });
const YQ = ['Who proposed five kingdoms, and when?', 'Which kingdom has no nuclear membrane?', 'Why are Chlamydomonas and Amoeba in one kingdom?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 13', topic: 'Milk into curd overnight: who does it? Kingdom Monera', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L6') - 0.3, 1.04, 960, 580], [tP1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  // chips: old positions (in a row inside each old box) and new positions (stacked in their kingdom box)
  const rowX = [56, 836], rowY = [100, 100], cnt = [0, 0, 0, 0, 0];
  CH.forEach((c, i) => { const el = $('#cp' + i), w = el.offsetWidth; if (rowX[c[2]] + w > (c[2] ? 1564 : 784) - 16) { rowX[c[2]] = c[2] ? 836 : 56; rowY[c[2]] += 58; }
    posOld[i] = [rowX[c[2]], rowY[c[2]]]; rowX[c[2]] += w + 12;
    posNew[i] = [36 + c[3] * 309.5 + 18, 296 + 30 + cnt[c[3]] * 54]; cnt[c[3]]++; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.1, 1e9, { dy: 14 }); M.vis($('#jt' + i), t, wt('H2', 'Two') - 0.1 + i * 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'hold') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(nbG, t, tH3 + 0.1, 1e9, { dy: 16 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hkL'), t, tH3, 1e9, { dy: 8 });
    nbBox.forEach((b, i) => { M.draw(b, t, wt('H3', 'five') + i * 0.18, 0.4); M.vis(nbTx[i], t, wt('H3', 'five') + 0.3 + i * 0.18, 1e9, { dy: 6 }); });
    M.vis($('#hkP'), t, wt('H3', 'questions') - 0.2, tH4 - 0.1, { ...POP, outDur: 0.2 });
    M.vis(whoC, t, wt('H3', 'scientist') - 0.1, 1e9, POP);
    M.vis($('#hkN'), t, wt('H4', 'NCERT') - 0.2, 1e9, POP);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('M1');
    M.vis($('#bw'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#yrB'), t, wt('B1', 'nineteen') - 0.1, 1e9, { dy: 16 }); M.vis($('#whN'), t, wt('B1', 'R') - 0.1, 1e9, { dy: 12 }); M.vis($('#whW'), t, wt('B1', 'proposed'), 1e9, { dy: 8 });
    KN.forEach((n, i) => M.vis($('#k5' + i), t, tK5[i] - 0.1, 1e9, { ...POP, sc: 0.6 }));
    M.vis($('#bc'), t, T0('B3') - 0.2, out, { dx: 60, dy: 0, ...o });
    CR.forEach((_, i) => { const el = $('#cr' + i); M.vis(el, t, tCr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tCr[i]) / 0.25) * (1 - M.io((t - (tCr[i + 1] ?? T1('B3') + 0.3)) / 0.25))); });
  }

  /* M: the move */
  const mOn = t >= tM1 - 0.1 && t < tL1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mv'), t, tM1 + 0.05, OUT('L1'), { dy: 36, ...o });
    M.vis($('#ob0'), t, tM1 + 0.2, 1e9, { dy: 10 }); M.vis($('#ob1'), t, tM1 + 0.3, 1e9, { dy: 10 });
    KN.forEach((_, i) => M.vis($('#nb' + i), t, wt('M1', 'five') + i * 0.1, 1e9, { dy: 20 }));
    CH.forEach((c, i) => { const el = $('#cp' + i), u = M.io((t - tMove[i] + 0.1) / 0.7);
      M.vis(el, t, tM1 + 0.35 + i * 0.06, 1e9, { dy: 8 });
      el.style.left = (posOld[i][0] + (posNew[i][0] - posOld[i][0]) * u).toFixed(1) + 'px'; el.style.top = (posOld[i][1] + (posNew[i][1] - posOld[i][1]) * u).toFixed(1) + 'px';
      const hi = tHi[c[0]] != null ? M.io((t - tHi[c[0]]) / 0.25) * (1 - u) : 0;
      el.style.borderColor = u > 0.5 ? KC[KN[c[3]]] : mix(C.line, C.ac, hi); el.style.background = u > 0.5 ? '#FFFFFF' : mix('#FFFFFF', C.ac2, hi);
      el.style.zIndex = u > 0 && u < 1 ? 5 : 1; });
    KN.forEach((n, i) => { const any = CH.some((c, j) => c[3] === i && t >= tMove[j] + 0.5); $('#nb' + i).style.background = any ? mix('#FFFFFF', KC[n], 0.07) : '#FFFFFF'; });
  }

  /* L: the table */
  const lOn = t >= tL1 - 0.1 && t < tP1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#tb'), t, tL1 + 0.05, OUT('P1'), { dy: 36, ...o });
    M.vis($('#ths').firstElementChild, t, tL1 + 0.3, 1e9, { dy: 8 });
    KN.forEach((_, i) => M.vis($('#kh' + i), t, tL1 + 0.4 + i * 0.1, 1e9, { dy: 10 }));
    gl.forEach((l, i) => M.draw(l, t, T0(ROWS[i + 1][3]) - 0.4, 0.5));
    ROWS.forEach(([, , cells, id], r) => { const t0 = T0(id), t1 = r < 4 ? T0(ROWS[r + 1][3]) : 1e9;
      M.vis($('#rl' + r), t, t0 - 0.1, 1e9, { dx: -16, dy: 0 });
      $('#rw' + r).style.background = mix('#FFFFFF', C.ac3, M.io((t - t0 + 0.1) / 0.25) * (1 - M.io((t - t1 + 0.1) / 0.25)));
      cells.forEach((_, k) => { const el = $('#tc' + r + k), tc = tCell[r][k]; M.vis(el, t, tc - 0.1, 1e9, { ...POP, sc: 0.8 });
        el.style.color = mix(C.ac, C.ink, M.io((t - tc - 0.6) / 0.4)); }); });
  }

  /* P: Monera vs Protista, then think */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P4');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o }); runLabs(pLB[0], t, tPa); M.vis($('#paP'), t, wt('P2', 'nuclear') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P3') - 0.15, out, { dx: 60, dy: 0, ...o }); runLabs(pLB[1], t, tPb); M.vis($('#pbP'), t, wt('P3', 'true') - 0.1, 1e9, POP);
    attr(amb.b, 'd', amoeba(392, 300, 150, t - tP1));
    avP(t, wt('P3', 'membrane') + 0.4, out);
    M.vis($('#th1'), t, tP4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tP4, tOpts: wt('P4', 'Monera') - 0.1, tCount: T1('P4') + 0.05, dur: 3, tAns: T0('P5') - 0.02, tWhy: wt('P5', 'It') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Five') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Monera') - 0.1, 2.2);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); const it = $('#it' + i), on = M.io((t - w[5]) / 0.25);
      it.style.background = mix(C.soft, C.ac2, on * (1 - M.io((t - tKg[i] - 0.4) / 0.3)));
      M.vis($('#kg' + i), t, tKg[i] - 0.1, 1e9, { dy: -30, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, tKg[i] + 0.4, 1e9, { dy: 8 }); });
    avW(t, wt('W5', 'fungus') + 0.3, wt('W6', 'fern') - 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Protista') - 0.1 });
    [wt('X3', 'bacteria'), wt('X3', 'yeast') - 0.6, wt('X3', 'yeast')].forEach((tt, i) => M.vis(tCel[i], t, tt - 0.1, 1e9, { ...POP, sc: 0.5 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') + 0.6, tCount, tAns });
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
