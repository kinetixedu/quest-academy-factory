// PUC Biology Ep 06: Taxonomic Categories and Hierarchy (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = '#2E2A24', GRN = C.ac, GOLD = '#C9962B', WHEAT = '#C9962B';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const ico = (p, name, x, y, s, col, sw = 1.8) => { const g = mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s / 24})` }); g.innerHTML = M.IC[name].map(d => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`).join(''); return g; };

Object.assign(M.IC, {
  letter: ['M3 6h18v12H3Z', 'M3 6l9 7 9-7'],
  house: ['M3 11 12 4l9 7', 'M5 10v10h14V10', 'M10 20v-6h4v6'],
  wheat: ['M12 22V8', 'M12 8c-2-1.5-2-4 0-6 2 2 2 4.5 0 6', 'M12 12c-3 0-4.5-2-4.5-4 2.5 0 4.5 1.5 4.5 4', 'M12 12c3 0 4.5-2 4.5-4-2.5 0-4.5 1.5-4.5 4', 'M12 16c-3 0-4.5-2-4.5-4 2.5 0 4.5 1.5 4.5 4', 'M12 16c3 0 4.5-2 4.5-4-2.5 0-4.5 1.5-4.5 4'],
  moss: ['M3 20h18', 'M6 20v-4', 'M9 20v-6', 'M12 20v-5', 'M15 20v-7', 'M18 20v-4', ci(6, 15, 1.2), ci(9, 13, 1.2), ci(12, 14, 1.2), ci(15, 12, 1.2), ci(18, 15, 1.2)],
  fern: ['M12 22V4', 'M12 7l-4-2', 'M12 7l4-2', 'M12 11l-6-3', 'M12 11l6-3', 'M12 15l-7-3', 'M12 15l7-3', 'M12 19l-6-2', 'M12 19l6-2'],
  pine: ['M12 2 6 10h3l-4 6h4l-3 4h12l-3-4h4l-4-6h3Z', 'M12 20v2'],
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  rose: [ci(12, 9, 5), 'M12 9c-1.5-1.5 0-3 1.5-2', 'M12 14v8', 'M12 18c-2-2-4-2-5-1 1 2 3 2 5 1Z'],
  banana: ['M5 20C4 13 7 6 12 3c-1 5-1 11 3 17', 'M12 3c3 3 6 9 6 17'],
  lily: ['M12 22v-9', 'M12 13C9 11 7 7 8 3c2 2 4 5 4 10Z', 'M12 13c3-2 5-6 4-10-2 2-4 5-4 10Z', 'M12 13C8 13 4 11 3 8c3 0 7 1 9 5Z', 'M12 13c4 0 8-2 9-5-3 0-7 1-9 5Z'],
  grass: ['M5 21c0-6 1-10 3-13', 'M10 21c0-5 .5-9 2-14', 'M15 21c0-5 1-8 4-11', 'M3 21h18'],
  maize: ['M12 21c-3 0-4-4-4-9s1.5-9 4-9 4 4 4 9-1 9-4 9Z', 'M10 7h4', 'M9.5 10h5', 'M9.5 13h5', 'M10 16h4', 'M8 15c-3 1-4 4-4 7', 'M16 15c3 1 4 4 4 7'],
  bamboo: ['M8 21V3', 'M16 21V3', 'M6.5 8h3', 'M6.5 14h3', 'M14.5 6h3', 'M14.5 12h3', 'M14.5 18h3', 'M8 8c3-1 5-3 6-6'],
  fly: [ci(12, 5.6, 2.4), 'M12 8c1.8 0 2.6 2 2.6 5S13.6 20 12 20s-2.6-3.6-2.6-7 .8-5 2.6-5Z', 'M10 9.6C6 5.6 2.5 7.6 3.5 10.1S8 11.6 10 11.1', 'M14 9.6c4-4 7.5-2 6.5.5S16 11.6 14 11.1', 'M9.6 13 6 15l-1 3', 'M14.4 13l3.6 2 1 3', 'M9.8 16.2 7 19.4', 'M14.2 16.2 17 19.4'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') - 0.05, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1'), tP1 = T0('P1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tP1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['letter', 'A letter', 'CROSSES INDIA', ['H1', 'letter']], ['house', 'One house', 'FOUND EXACTLY', ['H1', 'single']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3][0], j[3][1]));

/* ---------- H: the address ---------- */
const hs = $('#hjS');
mk(hs, 'rect', { x: 60, y: 84, width: 664, height: 340, rx: 10, fill: '#FBF7EC', stroke: BR, 'stroke-width': 4 });
mk(hs, 'path', { d: 'M60,84 L392,214 L724,84', stroke: '#CDBDA2', 'stroke-width': 3, fill: 'none' });
mk(hs, 'rect', { x: 600, y: 112, width: 92, height: 104, rx: 6, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const AD = [['COUNTRY', 'India', 'Country'], ['STATE', 'Karnataka', 'state'], ['CITY', 'Bengaluru', 'city'], ['STREET', '4th Cross Road', 'street'], ['HOUSE', 'House No. 12', 'house']];
$('#adl').innerHTML = AD.map(([k, v], i) => `<div id="ad${4 - i}" style="position:absolute;left:96px;top:${264 - (4 - i) * 0}px"></div>`).join('');
// address lines written in the usual order (house first), lit in the order spoken (country first)
const ADL = [['HOUSE', 'House No. 12'], ['STREET', '4th Cross Road'], ['CITY', 'Bengaluru'], ['STATE', 'Karnataka'], ['COUNTRY', 'India']];
$('#adl').innerHTML = ADL.map(([k, v], i) => `<div class="adr" id="al${i}" style="position:absolute;left:230px;top:${236 + i * 34}px;font:600 24px Poppins;white-space:nowrap"><span style="display:inline-block;width:110px;font:600 14px 'IBM Plex Mono';letter-spacing:.08em;color:var(--mute)">${k}</span>${v}</div>`).join('') +
  `<div class="pillp ac" id="adP" style="left:36px;top:494px">Each line narrows the search</div>`;
const tAd = { COUNTRY: wt('H2', 'Country'), STATE: wt('H2', 'state'), CITY: wt('H2', 'city'), STREET: wt('H2', 'street'), HOUSE: wt('H2', 'house') };
const HQ = ['KINGDOM', 'DIVISION / PHYLUM', 'CLASS', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES'];
$('#hqs').innerHTML = HQ.map((n, i) => `<div class="stp" id="hq${i}s" style="left:${36 + i * 64}px;top:${84 + i * 50}px;width:${300}px">${n}</div>`).join('');

/* ---------- B: ladder of steps ---------- */
const RK = ['KINGDOM', 'PHYLUM / DIVISION', 'CLASS', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES'];
$('#stps').innerHTML = RK.map((n, i) => `<div class="stp" id="sp${i}" style="left:${36 + i * 210}px;top:${86 + i * 44}px">${n}</div>`).join('');
const bS = $('#bbS'), bAr = mk(bS, 'path', { d: 'M1240,96 L1540,96 L1540,400', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' });
const bT = [txt(bS, 1240, 136, 'ALL STEPS TOGETHER', { 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 }), txt(bS, 1240, 166, 'TAXONOMIC HIERARCHY', { 'font-size': 20, 'letter-spacing': 1.4, 'font-weight': 600, fill: GRN })];

/* ---------- Z + R: nested groups for wheat ---------- */
const ZN = ['KINGDOM', 'DIVISION', 'CLASS', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES'];
$('#zch2').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 6 ? `<span style="display:inline-flex">${M.icon('arrowR', 18, C.dim, 2.4)}</span>` : ''}`).join('');
const ZT = [['KINGDOM', 'Plantae', 'every plant on Earth', 0], ['DIVISION', 'Angiospermae', 'the flowering plants', 0], ['CLASS', 'Monocotyledonae', 'one cotyledon in the seed', 0], ['ORDER', 'Poales', 'an order of grass-like plants', 0],
  ['FAMILY', 'Poaceae', 'the grasses', 0], ['GENUS', 'Triticum', 'the wheats', 1], ['SPECIES', 'aestivum', 'Triticum aestivum: one kind', 1]];
const BX = [{ x: 24, y: 24, w: 1008, h: 478 }]; for (let k = 1; k < 7; k++) { const p = BX[k - 1]; BX.push({ x: p.x + p.w * 0.36, y: p.y + p.h * 0.3, w: p.w * 0.6, h: p.h * 0.6 }); }
const zs = $('#zS'), ZW = mk(zs, 'g', {});
const MEM = [[['moss', 'Moss'], ['fern', 'Fern'], ['pine', 'Pine']], [['mango', 'Mango'], ['rose', 'Rose']], [['banana', 'Banana'], ['lily', 'Lily']], [['grass', 'Other families']], [['grass', 'Rice'], ['maize', 'Maize'], ['bamboo', 'Bamboo']], [['wheat', 'Other wheats']], []];
const BXE = BX.map((b, k) => { const s = b.w / 1008, g = mk(ZW, 'g', {});
  mk(g, 'rect', { x: b.x, y: b.y, width: b.w, height: b.h, rx: 30 * s, fill: k % 2 ? '#F3F7EA' : '#FFFFFF', stroke: k === 6 ? GOLD : GRN, 'stroke-width': 3.5 * s });
  txt(g, b.x + 24 * s, b.y + 40 * s, ZT[k][0], { 'font-size': 18 * s, 'letter-spacing': 1.4 * s, 'font-weight': 600 });
  txt(g, b.x + 24 * s, b.y + 82 * s, ZT[k][1], { 'font-family': 'Poppins', 'font-size': 34 * s, 'font-weight': 700, fill: C.ink, 'font-style': ZT[k][3] ? 'italic' : 'normal' });
  const m = MEM[k]; m.forEach(([ic, n], j) => { const cx = b.x + b.w * 0.17, cy = b.y + b.h * (0.36 + j * 0.2); ico(g, ic, cx - 30 * s, cy - 30 * s, 60 * s, ic === 'wheat' ? WHEAT : GRN, 1.8);
    txt(g, cx + 40 * s, cy + 8 * s, n, { 'font-family': 'Poppins', 'font-size': 22 * s, 'font-weight': 600, fill: C.ink2 }); });
  if (k === 6) { ico(g, 'wheat', b.x + b.w * 0.5 - 70 * s, b.y + b.h * 0.3, 140 * s, WHEAT, 1.6); txt(g, b.x + b.w * 0.5, b.y + b.h * 0.88, 'Triticum aestivum', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 36 * s, 'font-weight': 700, 'font-style': 'italic', fill: C.ink }); }
  return g; });
const tLv = [T0('Z2'), T0('Z3'), T0('Z4'), wt('Z5', 'Order'), wt('Z5', 'Family'), wt('Z6', 'Genus'), wt('Z6', 'species')];
const tUp0 = T0('R3') - 0.2, tUp1 = T1('R4') - 0.4;
const lvAt = t => { if (t >= tUp0) return 6 * (1 - M.io((t - tUp0) / (tUp1 - tUp0))); let l = 0; for (let k = 1; k < 7; k++) l += M.io((t - tLv[k]) / 1.1); return l; };
const view = l => { const k = Math.min(5, Math.floor(l)), u = l - k, b = BX[k], f = (1 - Math.pow(0.6, u)) / 0.4;
  return { x: b.x + 0.36 * b.w * f, y: b.y + 0.3 * b.h * f, w: b.w * Math.pow(0.6, u) }; };

/* ---------- L: the rule ---------- */
const STEPS = [['Species is the lowest', 'for plants and animals alike'], ['Going up, fewer shared', 'species to kingdom: shared features fall'], ['Lower taxon, more in common', 'its members share more features'], ['Higher category, harder to judge', 'how its members are related']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5'].map(id => T0(id) + 0.45);
$('#rks').innerHTML = ZN.map((n, i) => `<div class="rk" id="rk${i}" style="top:${80 + i * 58}px"><div class="rn">${n}</div><div class="b1" id="rm${i}" style="left:210px;height:18px;top:6px;background:var(--ink);width:${(60 + 440 * (6 - i) / 6).toFixed(0)}px"></div><div class="b2" id="rf${i}" style="left:210px;height:18px;top:28px;background:var(--ac);width:${(60 + 440 * i / 6).toFixed(0)}px"></div></div>`).join('');

/* ---------- V: taxa ---------- */
const va = $('#vaS'), VX = 392, VY = 260, vLeg = [];
[-1, 1].forEach(s => [-34, 0, 34].forEach((dy, k) => vLeg.push(mk(va, 'path', { d: `M${VX + s * 26},${VY + dy} L${VX + s * 96},${VY + dy - 34 + k * 14} L${VX + s * 132},${VY + dy + 40 + k * 10}`, stroke: BR, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))));
const vJ = vLeg.map((_, i) => { const s = i < 3 ? -1 : 1, k = i % 3, dy = [-34, 0, 34][k]; return mk(va, 'circle', { cx: VX + s * 96, cy: VY + dy - 34 + k * 14, r: 7, fill: GOLD, stroke: BR, 'stroke-width': 2 }); });
[-1, 1].forEach(s => mk(va, 'path', { d: `M${VX},${VY - 40} C${VX + s * 70},${VY - 150} ${VX + s * 200},${VY - 130} ${VX + s * 180},${VY - 70} C${VX + s * 160},${VY - 30} ${VX + s * 60},${VY - 30} ${VX},${VY - 40} Z`, fill: '#DCEBF5', stroke: BR, 'stroke-width': 3, opacity: 0.9 }));
mk(va, 'ellipse', { cx: VX, cy: VY + 76, rx: 34, ry: 64, fill: '#6B7A52', stroke: BR, 'stroke-width': 3.5 }); mk(va, 'ellipse', { cx: VX, cy: VY, rx: 38, ry: 36, fill: '#7E8C62', stroke: BR, 'stroke-width': 3.5 }); mk(va, 'circle', { cx: VX, cy: VY - 60, r: 28, fill: '#7E8C62', stroke: BR, 'stroke-width': 3.5 });
[-1, 1].forEach(s => mk(va, 'circle', { cx: VX + s * 16, cy: VY - 66, r: 12, fill: '#C8432F', stroke: BR, 'stroke-width': 2 }));
const vL = [[VX + 28, VY - 60, 560, 110, 'Head'], [VX + 38, VY, 600, 200, 'Thorax'], [VX + 30, VY + 100, 560, 400, 'Abdomen'], [VX - 96, VY - 34, 60, 440, 'Jointed leg']].map(([px, py, lx, ly, s]) => { const g = mk(va, 'g', {});
  const ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }); mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const an = s === 'Jointed leg' || lx > px ? 'start' : 'end', tx = mk(g, 'text', { x: lx + (s === 'Jointed leg' ? -8 : an === 'start' ? 12 : -12), y: ly + (s === 'Jointed leg' ? 34 : 9), 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { g, ln, tx }; });
const vb = $('#vbS');
const VO = [[392, 260, 340, 200, 'ANIMALS', 'KINGDOM'], [440, 290, 230, 140, 'MAMMALS', 'CLASS'], [480, 310, 120, 80, 'DOGS', 'GENUS']];
const vO = VO.map(([cx, cy, rx, ry, n, r], i) => { const g = mk(vb, 'g', {}); mk(g, 'ellipse', { cx, cy, rx, ry, fill: ['#FFFFFF', '#F3F7EA', '#E6F2DF'][i], stroke: GRN, 'stroke-width': 4 });
  txt(g, cx - rx * 0.62, cy - ry * 0.55, n, { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink }); txt(g, cx - rx * 0.62, cy - ry * 0.55 + 24, r, { 'font-size': 14, 'letter-spacing': 1.2 }); return g; });
ico(vO[2], 'paw', 470, 304, 44, C.ink, 2);
const th1 = PUC.think($('#th1'), { q: 'Who share more features: two members of one genus, or two of one class?', opts: ['One genus', 'One class'], right: 0, why: 'One genus. It sits lower in the hierarchy, so its members share more features.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">kingdom: fewest shared · <b>species: most shared</b></span>';

/* ---------- P: phylum vs division ---------- */
const lad = (svg, top, low, ic, col) => { const g = mk(svg, 'g', {});
  [[top, 120, 1], [low, 300, 0]].forEach(([[k, v], y, h]) => { mk(g, 'rect', { x: 260, y, width: 470, height: 110, rx: 16, fill: h ? '#E6F2DF' : '#FFFFFF', stroke: h ? GRN : C.line, 'stroke-width': 3 });
    txt(g, 290, y + 40, k, { 'font-size': 17, 'letter-spacing': 1.4, 'font-weight': 600, fill: h ? GRN : C.mute }); txt(g, 290, y + 84, v, { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ink }); });
  mk(g, 'path', { d: 'M495,296 L495,238 M481,252 L495,236 L509,252', stroke: C.dim, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  if (ic === 'fly') { const X = 135, Y = 270, f = mk(g, 'g', {});
    [-1, 1].forEach(s2 => mk(f, 'ellipse', { cx: X + s2 * 44, cy: Y - 44, rx: 46, ry: 22, fill: '#DCEBF5', stroke: BR, 'stroke-width': 2.5, transform: `rotate(${s2 * -25} ${X + s2 * 44} ${Y - 44})` }));
    [-1, 1].forEach(s2 => [-14, 4, 22].forEach((dy, k) => mk(f, 'path', { d: `M${X + s2 * 12},${Y + dy} l${s2 * 30},${-12 + k * 6} l${s2 * 14},${24}`, stroke: BR, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })));
    mk(f, 'ellipse', { cx: X, cy: Y + 34, rx: 16, ry: 30, fill: '#6B7A52', stroke: BR, 'stroke-width': 2.5 }); mk(f, 'ellipse', { cx: X, cy: Y, rx: 18, ry: 17, fill: '#7E8C62', stroke: BR, 'stroke-width': 2.5 });
    mk(f, 'circle', { cx: X, cy: Y - 26, r: 14, fill: '#7E8C62', stroke: BR, 'stroke-width': 2.5 }); [-1, 1].forEach(s2 => mk(f, 'circle', { cx: X + s2 * 8, cy: Y - 30, r: 7, fill: '#C8432F', stroke: BR, 'stroke-width': 1.5 })); }
  else ico(g, ic, 60, 200, 150, col, 1.6); txt(g, 135, 380, ic === 'fly' ? 'HOUSEFLY' : 'WHEAT', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600 }); return g; };
const pL = lad($('#paS'), ['PHYLUM', 'Arthropoda'], ['CLASS', 'Insecta'], 'fly', C.ink), pR = lad($('#pbS'), ['DIVISION', 'Angiospermae'], ['CLASS', 'Monocotyledonae'], 'wheat', WHEAT);
const avP = PUC.avatar($('#sP'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same rank, two names.' });

/* ---------- W: wheat vs mango ---------- */
const CM = [['KINGDOM', 'Plantae', 'Plantae', 0], ['DIVISION', 'Angiospermae', 'Angiospermae', 0], ['CLASS', 'Monocotyledonae', 'Dicotyledonae', 2], ['ORDER', 'Poales', 'Sapindales', 1], ['FAMILY', 'Poaceae', 'Anacardiaceae', 1], ['GENUS', 'Triticum', 'Mangifera', 1], ['SPECIES', 'aestivum', 'indica', 1]];
$('#cmps').innerHTML = CM.map(([k, a, b, d], i) => `<div class="cmp" id="cm${i}" style="top:${120 + i * 62}px"><div class="ck">${k}</div><div class="ca"${i > 4 ? ' style="font-style:italic"' : ''}>${a}</div><div class="cb"${i > 4 ? ' style="font-style:italic"' : ''}>${b}</div>
  <div class="cs" id="cs${i}" style="background:${d === 0 ? 'var(--okBg)' : d === 2 ? 'var(--red)' : 'var(--redBg)'};color:${d === 0 ? '#1F6B3F' : d === 2 ? '#fff' : 'var(--red)'}">${d === 0 ? 'SAME' : d === 2 ? 'THEY SPLIT HERE' : 'DIFFERENT'}</div></div>`).join('');
const tCm = [T0('W2'), T0('W3'), T0('W4'), wt('W5', 'class'), wt('W5', 'class') + 0.5, wt('W5', 'family'), wt('W5', 'mango')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Members of a kingdom share more features than a genus', right: 'Reverse: the kingdom is biggest, so it shares the fewest' });
const tS = $('#tS');
const tO = mk(tS, 'circle', { cx: 230, cy: 138, r: 110, fill: '#FFFFFF', stroke: GRN, 'stroke-width': 4 }), tI = mk(tS, 'circle', { cx: 270, cy: 168, r: 44, fill: '#E6F2DF', stroke: GRN, 'stroke-width': 4 });
const tL = [txt(tS, 150, 96, 'KINGDOM', { 'font-size': 16, 'letter-spacing': 1.4, 'font-weight': 600, fill: C.ink }), txt(tS, 150, 118, 'FEWEST SHARED', { 'font-size': 13, 'letter-spacing': 1, fill: C.red, 'font-weight': 600 }),
  txt(tS, 270, 166, 'GENUS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink }), txt(tS, 270, 186, 'MOST', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1, fill: GRN, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: [], type: 'Match the column: an organism with its family, order and class' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'For wheat, <i>Triticum aestivum</i>, which pair of taxon and category is correctly matched?',
  opts: ['Poales : family', 'Poaceae : order', 'Monocotyledonae : class', 'Angiospermae : class'], right: 2, cols: 1, optW: 700, optH: 72, optY: 236, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['Monocotyledonae: <b style="color:var(--ok)">class</b>'], ['Poales: order, not family'], ['Poaceae: family, not order'], ['Angiospermae: division']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A1', 'Monocotyledonae'), wt('A2', 'Poales'), wt('A2', 'Poaceae'), wt('A3', 'Angiospermae')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · taxonomic hierarchy', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<span style="font-size:25px">Kingdom › Phylum or Division › Class › Order › Family › Genus › Species</span>', '<b>Taxon</b>: a real group at any rank (Plantae, Poaceae, insects)', '<b style="color:var(--ac)">Lower taxon</b>: more shared features; higher: fewer',
    '<b>Species</b>: the lowest category, for plants and animals', '<b>Animals</b>: phylum &nbsp;·&nbsp; <b>Plants</b>: division'] });
const YQ = ['Name the seven categories, from kingdom down to species.', 'Why do members of a genus share more than a class?', 'At which category do wheat and mango part ways?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 07', topic: 'Mango, potato, housefly, human: what does each rank mean?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    let curA = null; ['COUNTRY', 'STATE', 'CITY', 'STREET', 'HOUSE'].forEach(k => { if (t >= tAd[k] - 0.05) curA = k; });
    ADL.forEach(([k], i) => { const el = $('#al' + i), on = M.io((t - tAd[k] + 0.05) / 0.25); M.vis(el, t, tMorph + 0.5 + i * 0.08, 1e9, { dy: 6 });
      el.style.color = mix(C.dim, C.ink, Math.max(0.25, on)); el.style.background = k === curA && t < T1('H2') + 0.3 ? C.ac2 : 'transparent'; el.style.borderRadius = '8px'; el.style.padding = '0 8px'; });
    M.vis($('#adP'), t, T1('H2') - 1.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hq'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) {
      HQ.forEach((_, i) => { const el = $('#hq' + i + 's'); M.vis(el, t, wt('H4', 'huge') - 0.2 + i * 0.12, 1e9, { dx: -16, dy: 0 }); el.style.borderColor = i === 6 ? C.ac : '#CBD0DA'; el.style.background = i === 6 && t > wt('H4', 'kind') - 0.1 ? C.ac2 : '#FFFFFF'; });
      M.vis($('#hq0'), t, wt('H5', 'seven') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H5', 'rule') - 0.1, 1e9, POP);
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#bb'), t, tB1 + 0.1, OUT('Z1'), { dy: 36, ...o });
    const tl = wt('B2', 'ladder'), tr = wt('B2', 'rank');
    RK.forEach((_, i) => { const el = $('#sp' + i); M.vis(el, t, tl + i * 0.16, 1e9, { dy: -14 }); const on = M.io((t - tr - i * 0.12) / 0.3); el.style.borderColor = mix('#CBD0DA', C.ac, on); });
    M.vis($('#bbR'), t, wt('B2', 'taxonomic') - 0.1, 1e9, POP);
    M.draw(bAr, t, wt('B3', 'together') - 0.2, 0.7); bT.forEach((e, i) => M.vis(e, t, wt('B3', i ? 'hierarchy' : 'together') + 0.1, 1e9, { dy: 6 }));
    [wt('B4', 'taxon'), wt('B4', 'taxon') + 0.5, wt('B4', 'taxon') + 1.0].forEach((tt, i) => M.vis($('#tx' + i), t, tt, 1e9, POP)); M.vis($('#txP'), t, wt('B4', 'taxa') - 0.2, 1e9, POP);
  }

  /* Z + R */
  const zOn = t >= tZ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('L1');
    M.vis($('#zch2'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const l = lvAt(t), cur = Math.min(6, Math.round(l)), v = view(l), s = 1008 / v.w;
    attr(ZW, 'transform', `translate(24 24) scale(${s.toFixed(5)}) translate(${(-v.x).toFixed(3)} ${(-v.y).toFixed(3)})`);
    BXE.forEach((g, k) => { g.style.opacity = (k < Math.floor(l) - 1 ? 0 : k <= l + 1.2 ? 1 : 0).toString(); });
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = t < tUp0 ? i < cur : i > cur;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zrK'), ZT[cur][0]); M.setT($('#zrV'), ZT[cur][1]); M.setT($('#zrS'), ZT[cur][2]); $('#zrV').classList.toggle('it', !!ZT[cur][3]);
    $('#bM').style.width = (440 * (0.1 + 0.9 * (1 - l / 6))).toFixed(1) + 'px'; $('#bF').style.width = (440 * (0.1 + 0.9 * l / 6)).toFixed(1) + 'px';
    M.vis($('#ziP'), t, wt('R3', 'fewer') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tV1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('V1');
    M.vis($('#lf'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.6); M.vis(el.querySelector('.why'), t, tSt[i] + 0.5, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 112]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    ZN.forEach((_, i) => { M.vis($('#rk' + i), t, tL1 + 0.4 + i * 0.06, 1e9, { dy: 8 });
      const el = $('#rk' + i); el.querySelector('.rn').style.color = (i === 6 && t > tSt[0] && t < tSt[1]) ? C.ac : C.ink;
      PUC.write($('#rf' + i), t, tSt[1] + (6 - i) * 0.15, 0.4); PUC.write($('#rm' + i), t, tSt[3] + i * 0.12, 0.4); });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#va'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const tj = wt('V2', 'jointed'); vLeg.forEach((g, i) => M.draw(g, t, tj - 0.4 + i * 0.12, 0.4)); vJ.forEach((j, i) => M.vis(j, t, tj + 0.3 + i * 0.08, 1e9, { dy: 0, fade: 0.1 }));
    vL.forEach((l, i) => { const t0 = [wt('V2', 'Insects') + 0.3, wt('V2', 'Insects') + 0.6, wt('V2', 'Insects') + 0.9, tj][i]; M.draw(l.ln, t, t0, 0.35); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); l.g.style.opacity = t > t0 ? 1 : 0; });
    M.vis($('#vaP'), t, wt('V2', 'three') - 0.1, 1e9, POP);
    M.vis($('#vb'), t, T0('V3') - 0.2, out, { dx: 60, dy: 0, ...o });
    vO.forEach((g, i) => M.vis(g, t, [wt('V3', 'Animals'), wt('V3', 'mammals'), wt('V3', 'dogs')][i] - 0.1, 1e9, { dy: 0, fade: 0.25 }));
    M.vis($('#vbP'), t, wt('V3', 'dog') + 0.1, 1e9, POP);
    M.vis($('#th1'), t, tV4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV4, tOpts: wt('V4', 'genus') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'A') });
  }

  /* statement */
  const stOn = t >= tT && t < tP1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tP1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Lower') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'shared') + 0.2, 0.8);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tW1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('W1');
    M.vis($('#pa'), t, tP1 + 0.3, out, { dx: -60, dy: 0, ...o }); M.vis(pL, t, T0('P2') - 0.1, 1e9, { dy: 16 });
    M.vis($('#pb'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis(pR, t, T0('P3'), 1e9, { dy: 16 });
    avP(t, wt('P3', 'Angiospermae') + 0.4, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    CM.forEach((_, i) => { M.vis($('#cm' + i), t, tCm[i] - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#cs' + i), t, tCm[i] + 0.6, 1e9, POP); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'members') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'kingdom') - 0.2 });
    M.vis(tO, t, wt('X3', 'kingdom') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(tI, t, wt('X3', 'kingdom') + 0.2, 1e9, { dy: 0, fade: 0.25 });
    tL.forEach((e, i) => M.vis(e, t, wt('X3', i < 2 ? 'biggest' : 'fewest') + i * 0.1, 1e9, { dy: 6 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
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
