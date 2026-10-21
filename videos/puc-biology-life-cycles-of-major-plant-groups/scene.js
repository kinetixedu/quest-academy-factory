// PUC Biology Ep 29: Life Cycles of Major Plant Groups (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon + batch canon for chromosome sets: n teal, 2n indigo
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, WAT = '#5AA0C8';
const HN = '#0E8F8F', DN = '#4A5FC1', HNL = '#CDEDEA', DNL = '#D5DBF4', STALK = '#9A6B3E';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const nT = s => `<span style="color:${HN}">${s}</span>`, dT = s => `<span style="color:${DN}">${s}</span>`;
const moss = (g, x, y, s = 1, withSp = false) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  for (let k = 0; k < 4; k++) mk(G, 'path', { d: `M${-6 + k * 4},40 l${-6 + k * 4},14`, stroke: '#9A7A4E', 'stroke-width': 2, 'stroke-linecap': 'round' });
  mk(G, 'path', { d: 'M0,42 L0,-20', stroke: '#4E7A34', 'stroke-width': 4, 'stroke-linecap': 'round' });
  for (let k = 0; k < 6; k++) { const yy = 34 - k * 10, sd = k % 2 ? 1 : -1; mk(G, 'path', { d: `M0,${yy} q${sd * 10},-6 ${sd * 18},-14 q${-sd * 4},10 ${-sd * 18},14Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 }); }
  if (withSp) { mk(G, 'path', { d: 'M0,-20 C2,-40 6,-58 8,-72', stroke: STALK, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); mk(G, 'ellipse', { cx: 9, cy: -80, rx: 6, ry: 11, fill: '#C9A46A', stroke: BR, 'stroke-width': 1.8, transform: 'rotate(12 9 -80)' }); }
  return W(G); };
const heart = (g, x, y, s = 1, fill = '#9FD09A') => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'path', { d: 'M0,40 C-30,20 -52,2 -46,-22 C-40,-44 -12,-42 0,-24 C12,-42 40,-44 46,-22 C52,2 30,20 0,40 Z', fill, stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) mk(G, 'path', { d: `M${-14 + k * 7},30 l${-4 + k * 2},16`, stroke: '#9A7A4E', 'stroke-width': 1.6, 'stroke-linecap': 'round' }); return W(G); };
const frond = (g, x, y, s = 1, sori = true) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'path', { d: 'M0,120 C-4,60 4,0 18,-110', stroke: '#4E7A34', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 8; k++) { const yy = 96 - k * 26, xx = (k * 2.2), L = 62 - k * 6; [-1, 1].forEach(sd => { mk(G, 'path', { d: `M${xx},${yy} C${xx + sd * L * 0.4},${yy - 16} ${xx + sd * L * 0.8},${yy - 14} ${xx + sd * L},${yy - 4} C${xx + sd * L * 0.7},${yy + 6} ${xx + sd * L * 0.3},${yy + 6} ${xx},${yy} Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 });
    if (sori && k < 6) for (let q = 1; q <= 2; q++) mk(G, 'circle', { cx: xx + sd * L * q * 0.32, cy: yy - 3, r: 3, fill: '#8A5A2B' }); }); }
  return W(G); };
const tree = (g, x, y, s = 1) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'path', { d: 'M-10,90 L-7,10 L7,10 L10,90 Z', fill: '#B08A5A', stroke: BR, 'stroke-width': 3 });
  mk(G, 'path', { d: 'M0,-90 C50,-88 70,-50 62,-20 C80,0 60,40 20,30 C0,46 -40,40 -40,20 C-72,10 -70,-40 -40,-50 C-40,-76 -20,-90 0,-90 Z', fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
  [[-20, -30], [24, -50], [30, 0], [-10, 6]].forEach(([dx, dy]) => mk(G, 'ellipse', { cx: dx, cy: dy, rx: 8, ry: 11, fill: '#E8C46A', stroke: BR, 'stroke-width': 2 })); return W(G); };
const spiro = (g, x, y, s = 1) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'rect', { x: -84, y: -18, width: 168, height: 36, rx: 18, fill: '#E6F2DF', stroke: BR, 'stroke-width': 2.5 });
  [-28, 28].forEach(cx => mk(G, 'line', { x1: cx, y1: -18, x2: cx, y2: 18, stroke: BR, 'stroke-width': 2 }));
  let d = 'M-80,0'; for (let k = 0; k <= 32; k++) { const xx = -80 + k * 5, yy = 12 * Math.sin(k * 0.8); d += ` L${xx},${yy.toFixed(1)}`; } mk(G, 'path', { d, stroke: GRN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  return W(G); };
const few = (g, x, y, s = 1) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` }); [[-8, -4], [8, -4], [0, 9]].forEach(([dx, dy]) => mk(G, 'circle', { cx: dx, cy: dy, r: 8, fill: HNL, stroke: HN, 'stroke-width': 2 })); return W(G); };

Object.assign(M.IC, {
  moss: ['M12 22V9', 'M12 18c-3-1-5-3-5-5 3 0 5 2 5 5Z', 'M12 14c3-1 5-3 5-5-3 0-5 2-5 5Z', 'M12 10c-2-1-3-3-3-5 2 0 3 2 3 5Z', 'M4 22h16'],
  fern: ['M12 22c0-6 1-13 4-19', 'M12 18c-3 0-5-1-6-3', 'M12 14c-3 0-5-1-6-3', 'M13 10c-2 0-4-1-5-2', 'M12 18c3 0 5-1 6-3', 'M12 14c3 0 5-1 6-3', 'M13 10c2 0 4-1 5-2'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
  list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  dna: ['M2 15c6.7-6 13.3 0 20-6', 'M2 9c6.7 6 13.3 0 20 6'],
  split: ['M12 3v6', 'M12 9 6 15v6', 'M12 9l6 6v6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tL1 = T0('L1'), tM1 = T0('M1'), tB1 = T0('B1'), tB3 = T0('B3'), tB4 = T0('B4'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['moss', 'A moss', 'ON THE WALL', 'moss'], ['fern', 'A fern', 'IN A POT', 'fern'], ['tree', 'A mango tree', 'IN THE YARD', 'mango']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const hl = $('#hlS'), HP = [moss(hl, 130, 300, 2.4, true), frond(hl, 392, 300, 1.3, true), tree(hl, 650, 290, 1.6)];
mk(hl, 'line', { x1: 36, y1: 432, x2: 748, y2: 432, stroke: C.dim, 'stroke-width': 3 });
const HQ = [130, 392, 650].map(x => { const G = mk(hl, 'g', {}); mk(G, 'rect', { x: x - 70, y: 446, width: 140, height: 38, rx: 9, fill: C.soft }); txt(G, x, 471, 'n OR 2n?', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.2, fill: C.ink, 'font-weight': 600 }); return G; });
const FV = [['list', 'The three patterns', 'patterns'], ['tree', 'The plants', 'plants'], ['split', 'Where meiosis is', 'meiosis']];
$('#fvs').innerHTML = FV.map(([ic, n], i) => `<div class="fv" id="fv${i}">${M.icon(ic, 24, C.ac, 2.2)}${n}</div>`).join('');
const tFv = FV.map(f => wt('H5', f[2]));

/* ---------- D ---------- */
const CK = [['Big', 'big'], ['Green', 'green'], ['Living on its own', 'living']];
CK.forEach(([s], i) => $('#ck' + i).innerHTML = `${M.icon('check', 26, C.ac, 3)}${s}`);
const dr = $('#drS'), DF = frond(dr, 600, 300, 1.25, false); const DRg = mk(dr, 'ellipse', { cx: 604, cy: 290, rx: 120, ry: 160, fill: 'none', stroke: C.ac, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });

/* ---------- P: the three living cycles ---------- */
const PN = ['HAPLONTIC', 'DIPLONTIC', 'HAPLO-DIPLONTIC'];
$('#pch').innerHTML = PN.map((n, i) => `<span class="zc" id="pc${i}">${i + 1} ${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const PI = [['PATTERN 1 OF 3', 'Haplontic', 'The haploid gametophyte is the main plant. The zygote is the only diploid cell.'],
  ['PATTERN 2 OF 3', 'Diplontic', 'The diploid sporophyte is the main plant. The gametophyte has one to a few cells.'],
  ['PATTERN 3 OF 3', 'Haplo-diplontic', 'Both phases have many cells. In bryophytes, n is the boss.'],
  ['PATTERN 3 OF 3', 'Haplo-diplontic', 'Both phases have many cells. In pteridophytes, 2n is the boss.']];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 12 ? 46 : 56}px">${n}</div><div class="ld" style="font-size:25px;top:150px">${d}</div><div class="lbl" style="left:36px;top:300px">EXAMPLES</div></div>`).join('');
const EX = [[['Volvox', 1, wt('L4', 'Volvox')], ['Spirogyra', 1, wt('L4', 'Spirogyra')], ['some Chlamydomonas', 1, wt('L4', 'Chlamydomonas')]],
  [['Gymnosperms', 0, wt('M4', 'gymnosperms')], ['Angiosperms', 0, wt('M4', 'angiosperms')], ['Fucus', 1, wt('M4', 'Fucus')]],
  [['Bryophytes', 0, wt('B3', 'bryophytes')]], [['Pteridophytes', 0, wt('B4', 'pteridophytes')], ['Ectocarpus', 1, wt('B5', 'Ectocarpus')], ['Polysiphonia', 1, wt('B5', 'Polysiphonia')], ['kelps', 0, wt('B5', 'kelps')]]];
$('#exs').innerHTML = EX.map((g, j) => `<div class="exs" id="ex${j}">${g.map(([s, it], i) => `<span id="e${j}${i}" class="${it ? 'it' : ''}">${s.replace('some ', '<span style="font-style:normal">some&nbsp;</span>')}</span>`).join('')}</div>`).join('');
const PW = [tL1, tM1, tB1, tB4], PW1 = [tM1, tB1, tB4, tC1];
const ps = $('#pS'), CX = 528, CY = 285, RX = 330, RY = 170, PT = th => [CX + RX * Math.cos(th * Math.PI / 180), CY + RY * Math.sin(th * Math.PI / 180)];
const arcD = (a0, a1) => { let d = ''; for (let k = 0; k <= 48; k++) { const [x, y] = PT(a0 + (a1 - a0) * k / 48); d += (k ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const RING = { n: mk(ps, 'path', { stroke: HN, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', opacity: 0.85 }), d: mk(ps, 'path', { stroke: DN, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', opacity: 0.85 }) };
const NA = [-90, -20, 40, 140, 200];
const ND = NA.map((a, i) => { const [x, y] = PT(a), G = mk(ps, 'g', {}), ring = mk(G, 'circle', { cx: x, cy: y, r: 52, fill: '#FFFFFF', stroke: i === 2 || i === 3 ? DN : HN, 'stroke-width': 3 }); return { G, ring, x, y }; });
// pattern drawings for the gametophyte (node 0) and the sporophyte (node 3)
const G0 = [spiro(ND[0].G, ND[0].x, ND[0].y, 0.7), few(ND[0].G, ND[0].x, ND[0].y, 1.1), moss(ND[0].G, ND[0].x, ND[0].y - 6, 1.1), heart(ND[0].G, ND[0].x, ND[0].y - 2, 0.75)];
const S3x = mk(ND[3].G, 'g', {}); mk(S3x, 'path', { d: `M${ND[3].x - 14},${ND[3].y - 14} L${ND[3].x + 14},${ND[3].y + 14} M${ND[3].x + 14},${ND[3].y - 14} L${ND[3].x - 14},${ND[3].y + 14}`, stroke: C.dim, 'stroke-width': 4, 'stroke-linecap': 'round' });
const G3 = [S3x, tree(ND[3].G, ND[3].x, ND[3].y + 4, 0.55), moss(ND[3].G, ND[3].x - 6, ND[3].y + 22, 0.75, true), frond(ND[3].G, ND[3].x, ND[3].y + 4, 0.42, true)];
{ const g1 = ND[1]; mk(g1.G, 'circle', { cx: g1.x + 12, cy: g1.y, r: 17, fill: HNL, stroke: HN, 'stroke-width': 2.5 }); mk(g1.G, 'circle', { cx: g1.x + 12, cy: g1.y, r: 5, fill: HN });
  mk(g1.G, 'circle', { cx: g1.x - 22, cy: g1.y - 8, r: 6, fill: HN }); mk(g1.G, 'path', { d: `M${g1.x - 28},${g1.y - 6} q-6,6 -2,12 t-2,12`, stroke: HN, 'stroke-width': 2, fill: 'none' });
  const g2 = ND[2]; mk(g2.G, 'circle', { cx: g2.x, cy: g2.y, r: 24, fill: DNL, stroke: DN, 'stroke-width': 3 }); mk(g2.G, 'circle', { cx: g2.x, cy: g2.y, r: 8, fill: DN });
  const g4 = ND[4]; [[-12, -12], [12, -12], [-12, 12], [12, 12]].forEach(([dx, dy]) => mk(g4.G, 'circle', { cx: g4.x + dx, cy: g4.y + dy, r: 9, fill: HNL, stroke: HN, 'stroke-width': 2 })); }
const NL = { g0: mk(ps, 'text', { 'text-anchor': 'middle', class: 'zl', x: ND[0].x }), g1: mk(ps, 'text', { 'text-anchor': 'middle', class: 'zl', x: ND[1].x, y: ND[1].y - 66 }), g2: mk(ps, 'text', { 'text-anchor': 'middle', class: 'zl', x: ND[2].x, y: ND[2].y + 84 }),
  g3: mk(ps, 'text', { 'text-anchor': 'middle', class: 'zl', x: ND[3].x }), g4: mk(ps, 'text', { 'text-anchor': 'middle', class: 'zl', x: ND[4].x, y: ND[4].y - 66 }) };
Object.values(NL).forEach(e => e.style.fontSize = '23px'); NL.g1.textContent = 'Gametes (n)'; NL.g2.textContent = 'Zygote (2n)'; NL.g4.textContent = 'Spores (n)';
const L0 = ['Gametophyte (n)', 'Gametophyte (n)', 'Gametophyte (n)', 'Gametophyte (n)'], L3 = ['No free living sporophyte', 'Sporophyte (2n)', 'Sporophyte (2n)', 'Sporophyte (2n)'];
const TAG = (s, col, w) => { const G = mk(ps, 'g', {}), P = mk(G, 'g', {}); const r = mk(P, 'rect', { x: -w / 2, y: -20, width: w, height: 40, rx: 9, fill: col }); const tx = txt(P, 0, 6, s, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: '#FFFFFF', 'font-weight': 600 }); return { G, P, r, tx }; };
const TG = { fert: TAG('FERTILISATION', C.ink, 190), mei: TAG('MEIOSIS', C.ac, 120), dom: TAG('DOMINANT', '#E58A3C', 132), sub: TAG('', '#9AA0AC', 200) };
attr(TG.fert.P, 'transform', `translate(${PT(10).map(v => v.toFixed(1)).join(' ')})`);
const DOT = mk(ps, 'circle', { r: 11, fill: HN, stroke: '#FFFFFF', 'stroke-width': 3 });
// pattern parameters: gametophyte radius, sporophyte radius, meiosis angle
const PP = [[70, 34, 80], [32, 70, 170], [66, 46, 170], [46, 66, 170]];
const avP = PUC.avatar($('#sP'), { x: 1248 + 28, y: 324 + 526 - 104, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the fern I see is 2n!' });

/* ---------- V: side by side ---------- */
const VR = [['Meiosis happens in', 'The zygote', 'The sporophyte', 'The sporophyte', wt('C2', 'zygote'), wt('C2', 'Diplontic') + 0.2, wt('C2', 'haplo') + 0.4],
  ['Diploid phase', 'Just one cell: the zygote', 'The main plant', 'Many cells', wt('C3', 'diploid'), wt('C3', 'Diplontic') - 0.2, wt('C3', 'many')],
  ['Haploid phase', 'The main plant', 'One to a few cells', 'Many cells', wt('C3', 'diploid') + 0.5, wt('C3', 'few'), wt('C3', 'both')],
  ['Examples', '<i>Volvox</i>, <i>Spirogyra</i>', 'Seed plants, <i>Fucus</i>', 'Bryophytes, ferns', T1('C3') - 0.2, T1('C3') + 0.1, T1('C3') + 0.4]];
$('#vrs').innerHTML = VR.map(([k, a, b, c], i) => `<div class="vr" id="vr${i}" style="top:${94 + i * 112}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:300px">${a}</div><div class="vt" id="vt${i}b" style="left:732px">${b}</div><div class="vt" id="vt${i}c" style="left:1164px">${c}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'A moss and a fern are both haplo-diplontic. Which phase is dominant in the fern?', opts: ['Gametophyte · n', 'Sporophyte · 2n'], right: 1, why: 'The sporophyte. The big leafy fern is diploid. In a moss, it is the other way round.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">bryophytes + pteridophytes: <b style="color:var(--ink)">haplo-diplontic</b> · seed plants: <b style="color:${DN}">diplontic</b></span>`;

/* ---------- W: which phase do we see ---------- */
const FPN = [['THE MOSS ON THE WALL', 'We see the gametophyte', 'WE SEE · n', HN, 'W2'], ['THE FERN IN THE POT', 'We see the sporophyte', 'WE SEE · 2n', DN, 'W3'],
  ['THE MANGO TREE', 'The tree is the sporophyte', 'WE SEE · 2n', DN, 'W4'], ['SPIROGYRA IN A POND', 'Every thread is haploid', 'WE SEE · n', HN, 'W5']];
$('#fps').innerHTML = FPN.map(([h, s, g, c], i) => `<div class="fp" id="fp${i}" style="left:${36 + i * 388}px"><div class="fh">${h}</div><svg id="fs${i}" width="356" height="320" style="position:absolute;left:0;top:44px"></svg><div class="ft">${s}</div><div class="fg" style="background:${c}">${g}</div></div>`).join('');
const FW = {};
{ const S = i => $('#fs' + i);
  FW.d0 = moss(S(0), 178, 200, 2.2, true); FW.r0 = mk(S(0), 'ellipse', { cx: 178, cy: 236, rx: 70, ry: 100, fill: 'none', stroke: HN, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
  FW.d1 = frond(S(1), 178, 170, 1.2, true); FW.r1 = mk(S(1), 'ellipse', { cx: 186, cy: 170, rx: 120, ry: 150, fill: 'none', stroke: DN, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
  FW.d2 = tree(S(2), 178, 170, 1.45); FW.r2 = mk(S(2), 'ellipse', { cx: 178, cy: 160, rx: 130, ry: 152, fill: 'none', stroke: DN, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
  FW.g2 = mk(S(2), 'g', {}); mk(FW.g2, 'rect', { x: 34, y: 280, width: 288, height: 34, rx: 8, fill: '#E1F4F2' }); txt(FW.g2, 178, 303, 'POLLEN + EMBRYO SAC = n', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1, fill: HN, 'font-weight': 600 });
  FW.d3 = mk(S(3), 'g', {}); [100, 170, 240].forEach((y, k) => spiro(FW.d3, 178 + (k - 1) * 10, y, 1.6)); FW.r3 = mk(S(3), 'rect', { x: 20, y: 60, width: 316, height: 220, rx: 30, fill: 'none', stroke: HN, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
  FW.z3 = mk(S(3), 'g', {}); mk(FW.z3, 'circle', { cx: 300, cy: 300, r: 15, fill: DNL, stroke: DN, 'stroke-width': 3 }); txt(FW.z3, 280, 306, 'ZYGOTE 2n', { 'text-anchor': 'end', 'font-size': 15, 'letter-spacing': 1, fill: DN, 'font-weight': 600 }); }
const tFp = FPN.map(f => T0(f[4]));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every alga is haplontic', right: 'Most are. Fucus: diplontic. Kelps: haplo-diplontic.' });
const tS = $('#tS'), TP = [['Spirogyra', 'HAPLONTIC', HN, 'Most'], ['Fucus', 'DIPLONTIC', DN, 'Fucus'], ['Kelps', 'HAPLO-DIPLONTIC', C.ink, 'kelps']].map(([n, p, c, w], i) => {
  const G = mk(tS, 'g', {}); mk(G, 'rect', { x: 20, y: 40 + i * 70, width: 420, height: 56, rx: 12, fill: C.soft }); const nt = txt(G, 40, 76 + i * 70, n, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.ink, 'font-style': i < 2 ? 'italic' : 'normal' });
  mk(G, 'rect', { x: 230, y: 50 + i * 70, width: 196, height: 36, rx: 8, fill: c }); txt(G, 328, 74 + i * 70, p, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1, fill: '#FFFFFF', 'font-weight': 600 }); return { G, w }; });
const where = PUC.where($('#wa'), { on: [], type: 'Match the following: an organism and its type of life cycle' });
const mt = (a, b) => `<tr><td><b>${a[0]}</b>${a[1]}</td><td style="padding-left:48px"><b>${b[0]}</b>${b[1]}</td></tr>`;
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 820,
  q: 'Match each organism with its life cycle.<table class="mt" style="margin-top:8px;border-spacing:0">' + mt(['P', '<i>Spirogyra</i>'], ['(i)', 'Haplontic']) + mt(['Q', '<i>Fucus</i>'], ['(ii)', 'Diplontic']) + mt(['R', '<i>Polysiphonia</i>'], ['(iii)', 'Haplo-diplontic']) + mt(['S', 'A fern'], ['', '']) + '</table>',
  opts: ['P-ii, Q-i, R-iii, S-iii', 'P-i, Q-ii, R-iii, S-iii', 'P-i, Q-iii, R-ii, S-iii', 'P-iii, Q-ii, R-i, S-ii'], right: 1, optW: 474, optY: 352, optFs: 30 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['<i>Spirogyra</i>: haplontic'], ['<i>Fucus</i>: diplontic'], ['<i>Polysiphonia</i>: haplo-diplontic'], ['Fern: haplo-diplontic']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3), wt('A2', 'Spirogyra'), wt('A2', 'Fucus'), wt('A3', 'Polysiphonia'), wt('A3', 'fern')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · life cycles of plant groups', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: [`<b>Haplontic</b>: ${nT('n')} dominant · the zygote is the only ${dT('2n')} cell`, `<b>Diplontic</b>: ${dT('2n')} dominant · gametophyte of 1 to few cells`,
    '<b>Haplo-diplontic</b>: both phases multicellular', `<b>Bryophytes</b>: ${nT('gametophyte')} dominant · <b>pteridophytes</b>: ${dT('sporophyte')} dominant`,
    '<b>Examples</b>: <i>Spirogyra</i> haplontic · seed plants, <i>Fucus</i> diplontic · kelps haplo-diplontic'] });
const YQ = ['In a haplontic cycle, which is the only diploid cell?', 'Name one alga with a diplontic life cycle.', 'Which phase is dominant in a moss, and which in a fern?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 30', topic: 'Slime to tall trees: Evolutionary Trends in Plant Organisation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tB4 - 0.1, 1.06, 1040, 560], [tC1 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const g = $('#ghT'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  let x = 36; FV.forEach((_, i) => { const e = $('#fv' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    HP.forEach((p, i) => M.vis(p, t, tMorph + 0.4 + i * 0.2, 1e9, { dy: 30 }));
    HQ.forEach((q, i) => M.vis(q, t, wt('H2', 'single') + i * 0.2, 1e9, POP)); M.vis($('#hlP'), t, wt('H2', 'notice') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, wt('H3', 'which') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { [0, 1, 2].forEach(i => M.vis($('#sb' + i), t, wt('H4', 'three') + i * 0.18, 1e9, { dx: -16, dy: 0 })); FV.forEach((_, i) => M.vis($('#fv' + i), t, tFv[i] - 0.1, 1e9, { dy: 16 })); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dw'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 8 });
    M.vis($('#cr0'), t, T0('D2') - 0.1, 1e9, { dy: 20 }); M.vis($('#cr1'), t, T0('D3') - 0.1, 1e9, { dy: 20 });
    M.vis($('#dr'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o });
    CK.forEach(([s, w], i) => M.vis($('#ck' + i), t, wt('D4', w) - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis(DF, t, T0('D4') + 0.2, 1e9, { dy: 30 }); M.draw(DRg, t, wt('D4', 'dominant') - 0.3, 0.6); DRg.style.strokeDashoffset = t > wt('D4', 'dominant') + 0.3 ? (-(t * 14) % 18).toFixed(1) : DRg.style.strokeDashoffset;
    if (t > wt('D4', 'dominant') + 0.3) DRg.style.strokeDasharray = '10 8';
    M.vis($('#drP'), t, wt('D4', 'dominant') - 0.1, 1e9, POP);
  }

  /* P: cycles */
  const pOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pch'), t, tL1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const st = t >= tB4 - 0.05 ? 3 : t >= tB1 - 0.05 ? 2 : t >= tM1 - 0.05 ? 1 : 0, chip = Math.min(st, 2);
    PN.forEach((_, i) => { const el = $('#pc' + i), on = i === chip ? 1 : 0, done = i < chip ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    PI.forEach((_, i) => M.vis($('#pi' + i), t, PW[i] + (i === 3 ? 0 : 0.3), PW1[i] - (i === 2 ? 0 : 0.05), { dy: i === 3 ? 0 : 20, fade: i === 3 ? 0.01 : 0.18, outDur: i === 2 ? 0.01 : 0.25, ody: -12 }));
    EX.forEach((g, j) => { const tout = j === 2 ? 1e9 : PW1[j] - 0.05; M.vis($('#ex' + j), t, PW[j], j === 2 ? tB4 : tout, { dy: 0, fade: 0.01, outDur: j === 2 ? 0.01 : 0.25 }); g.forEach((e, i) => M.vis($('#e' + j + i), t, e[2] - 0.1, 1e9, POP)); });
    // morph parameters between patterns
    const k = [0, 1, 2, 3].map(i => i === 0 ? 1 : M.io((t - PW[i]) / 0.8));
    let par = PP[0].slice(); for (let i = 1; i < 4; i++) par = par.map((v, j) => v + (PP[i][j] - v) * k[i]);
    const [rG, rS, aM] = par;
    attr(RING.d, 'd', arcD(10, aM)); attr(RING.n, 'd', arcD(aM, 370));
    M.draw(RING.n, t, tL1 + 0.3, 0.9); M.draw(RING.d, t, tL1 + 1.0, 0.5);
    ND.forEach((n, i) => { const r = i === 0 ? rG : i === 3 ? rS : 52; M.vis(n.G, t, tL1 + 0.5 + i * 0.2, 1e9, { ...POP, sc: 0.4 }); attr(n.ring, 'r', r.toFixed(1)); });
    const dim3 = 1 - k[1]; attr(ND[3].ring, 'stroke-dasharray', dim3 > 0.5 ? '8 7' : 'none'); attr(ND[3].ring, 'stroke', mix(DN, '#B8BCC6', dim3));
    G0.forEach((g, i) => g.style.opacity = (st === i ? 1 : 0).toFixed(2)); G3.forEach((g, i) => g.style.opacity = (st === i ? 1 : 0).toFixed(2));
    NL.g0.textContent = L0[st]; attr(NL.g0, 'y', (ND[0].y + rG + 32).toFixed(1)); NL.g3.textContent = L3[st]; attr(NL.g3, 'y', (ND[3].y + Math.max(rS, 34) + 32).toFixed(1));
    Object.values(NL).forEach((e, i) => e.style.opacity = M.clamp((t - tL1 - 0.8 - i * 0.15) / 0.3).toFixed(3));
    M.vis(TG.fert.G, t, tL1 + 1.4, 1e9, POP); M.vis(TG.mei.G, t, wt('L3', 'meiosis') - 0.2, 1e9, POP);
    attr(TG.mei.P, 'transform', `translate(${PT(aM).map(v => v.toFixed(1)).join(' ')})`);
    const dn = st === 1 || st === 3 ? 3 : 0, dr0 = dn === 3 ? rS : rG, dxy = dn === 3 ? [ND[3].x - dr0 - 80, ND[3].y - 20] : [ND[0].x + dr0 + 82, ND[0].y];
    M.vis(TG.dom.G, t, wt('L2', 'dominant') - 0.1, 1e9, POP); attr(TG.dom.P, 'transform', `translate(${dxy[0].toFixed(1)} ${dxy[1].toFixed(1)})`);
    const subS = st === 0 ? '' : st === 1 ? '1 TO FEW CELLS' : st === 2 ? 'DEPENDS ON IT' : 'SMALL · INDEPENDENT', subXY = st === 2 ? [ND[3].x + rS + 112, ND[3].y] : [ND[0].x, ND[0].y + rG + 72];
    M.setT(TG.sub.tx, subS); M.hide(TG.sub.G, !subS || t < (st === 1 ? wt('M3', 'tiny') : st === 2 ? wt('B3', 'depends') : wt('B4', 'small')) - 0.1); attr(TG.sub.P, 'transform', `translate(${subXY[0].toFixed(1)} ${subXY[1].toFixed(1)})`);
    // looping dot around the cycle
    const ang = -90 + (((t - tL1 - 1.5) / 7) % 1) * 360; const [dx, dy] = PT(ang); attr(DOT, 'cx', dx.toFixed(1)); attr(DOT, 'cy', dy.toFixed(1));
    const nh = ((ang % 360) + 360) % 360; attr(DOT, 'fill', nh > 10 && nh < aM ? DN : HN); M.hide(DOT, t < tL1 + 1.5);
    avP(t, T1('B4') - 0.6, tB4 + 7);
  }

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT('C4'), { dy: 36, ...o });
    let cur = -1; VR.forEach((v, i) => { if (t >= v[4] - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, v[4] - 0.15, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      ['a', 'b', 'c'].forEach((c, j) => M.vis($('#vt' + i + c), t, v[4 + j], 1e9, { dx: -12, dy: 0 })); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'The', 1) - 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Most') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Bryophytes') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    const cur = tFp.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    FPN.forEach((_, i) => { const el = $('#fp' + i); M.vis(el, t, tFp[i] - 0.15, 1e9, { dy: 24 }); el.style.background = i === cur ? C.ac2 : C.soft; });
    [[FW.r0, wt('W2', 'gametophyte')], [FW.r1, wt('W3', 'sporophyte')], [FW.r2, wt('W4', 'sporophyte')], [FW.r3, wt('W5', 'haploid')]].forEach(([r, tt]) => { M.draw(r, t, tt - 0.3, 0.6); if (t > tt + 0.4) { r.style.strokeDasharray = '10 8'; r.style.strokeDashoffset = (-(t * 14) % 18).toFixed(1); } });
    M.vis(FW.g2, t, wt('W4', 'pollen') - 0.1, 1e9, POP); M.vis(FW.z3, t, wt('W5', 'zygote') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Fucus') - 0.1 });
    TP.forEach((p, i) => M.vis(p.G, t, (i === 0 ? wt('X3', 'Most') : wt('X3', p.w)) - 0.1, 1e9, { dx: -16, dy: 0 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') - 0.2, tCount, tAns });
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
