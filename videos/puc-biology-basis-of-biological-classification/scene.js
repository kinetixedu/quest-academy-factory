// PUC Biology Ep 11: Basis of Biological Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fb = el => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; return el; };
// fixed biology colours (bible "Living diagram canon"); fungal wall (chitin) brown is new in this batch
const BR = '#2E2A24', GRN = C.ac, CHL = '#3E9B5F', MITO = '#E58A3C', NUC = '#7B4B94', WAT = '#5AA0C8', RBC = '#D1495B', GOLD = '#C9962B', WALL = '#C9B36A', CHIT = '#8C6D4F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  mush: ['M3.5 11.5a8.5 7 0 0 1 17 0Z', 'M9.5 11.5v6.5a2.5 2.5 0 0 0 5 0v-6.5', ci(9, 8, 0.8), ci(14.5, 7, 0.8)],
  eug: ['M3 13.5c3.2-4.2 9.6-4.8 13.6-1.6-4 3.4-10.4 3.6-13.6 1.6Z', 'M16.6 11.9c2-1.4 3-3.6 5-3.6', ci(8.5, 12.8, 1.4)],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tB1 = T0('B1'), tS1 = T0('S1'), tZ1 = T0('Z1'), tC1 = T0('C1'), tP1 = T0('P1'), tP4 = T0('P4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- labelled diagram helper: dot on the part, leader line, text ---------- */
const labels = (g, L) => L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = fb(mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }));
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
});
const runLabs = (LB, t, ts) => LB.forEach((l, i) => { const t0 = ts[i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });

/* ---------- title card: three misfits ---------- */
const JOBS = [['mush', 'A mushroom', 'ON THE LAWN', 'mushroom'], ['eug', 'A green speck', 'SWIMS IN A POND', 'green'], ['microbe', 'Curd bacteria', 'SET YOUR CURD', 'bacteria']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const JT = ['PLANT?', 'PLANT? ANIMAL?', 'NEITHER?'], JW = ['NO GREEN · NEVER MOVES', 'GREEN · BUT IT SWIMS', 'NO NUCLEUS IN ITS CELL'];
$('#jrs').innerHTML = JOBS.map(([ic, n], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${JW[i]}</div><div class="jt" id="jt${i}">${JT[i]}</div></div>`).join('');
// garden scene (hand-built SVG): grass, a sapling and a mushroom after rain
const hs = $('#hkS'), hsG = mk(hs, 'g', {});
{ const g = hsG;
  mk(g, 'rect', { x: 36, y: 84, width: 712, height: 390, rx: 12, fill: '#EAF3F7' });
  const rain = mk(g, 'g', { id: 'rain' });
  for (let k = 0; k < 22; k++) { const x = 70 + (k * 97) % 660, y = 104 + (k * 53) % 170; mk(rain, 'line', { x1: x, y1: y, x2: x - 8, y2: y + 22, stroke: WAT, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.55 }); }
  mk(g, 'path', { d: 'M36,392 Q200,372 392,386 T748,380 L748,462 Q748,474 736,474 L48,474 Q36,474 36,462 Z', fill: '#9CCB8E', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M36,430 Q220,418 392,428 T748,424 L748,462 Q748,474 736,474 L48,474 Q36,474 36,462 Z', fill: '#B98F62', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 14; k++) { const x = 60 + k * 50; mk(g, 'path', { d: `M${x},392 l-6,-16 M${x},392 l4,-18 M${x},392 l12,-12`, stroke: '#4E7A34', 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }); }
  // sapling
  mk(g, 'path', { d: 'M200,394 C202,340 196,300 204,250', stroke: '#4E7A34', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  [[204, 252, -30], [198, 300, 210], [204, 320, -20], [196, 350, 200]].forEach(([x, y, a]) => { const l = mk(g, 'g', { transform: `rotate(${a} ${x} ${y})` }); mk(l, 'path', { d: `M${x},${y} C${x + 20},${y - 30} ${x + 70},${y - 30} ${x + 84},${y} C${x + 70},${y + 22} ${x + 20},${y + 22} ${x},${y} Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 3 }); });
  // mushroom
  mk(g, 'path', { d: 'M470,396 C474,350 476,320 480,286 L532,286 C536,320 538,350 542,396 Z', fill: '#F3EAD8', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M392,292 C404,180 608,180 620,292 Q506,316 392,292 Z', fill: '#B9805A', stroke: BR, 'stroke-width': 4 });
  [[460, 236, 10], [520, 220, 8], [570, 250, 9], [430, 270, 7]].forEach(([x, y, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: '#E7C9A6' }));
}
const hkRing = mk(hs, 'ellipse', { cx: 506, cy: 300, rx: 150, ry: 130, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
$('#q7s').innerHTML = [0, 1, 2, 3, 4, 5, 6].map(i => `<div class="q7" id="q7${i}" style="left:${36 + i * 98}px"><b>${i + 1}</b>?</div>`).join('');
const tSeven = wt('H5', 'seven'), tTwo = wt('H5', 'two');

/* ---------- B: Aristotle + Linnaeus ---------- */
const FM = [['Trees', 70], ['Shrubs', 256], ['Herbs', 442]];
$('#fms').innerHTML = FM.map(([n, x], i) => `<div class="fm" id="fm${i}" style="left:${x + 40}px"><span>${n}</span></div>`).join('');
const arG = FM.map(() => fb(mk($('#arS'), 'g', {})));
{ // tree, shrub, herb (simple forms, Aristotle's basis)
  let g = arG[0]; mk(g, 'rect', { x: 204, y: 104, width: 12, height: 50, rx: 4, fill: '#8A6A44', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 210, cy: 84, r: 40, fill: '#8CC48F', stroke: BR, 'stroke-width': 3 });
  g = arG[1]; [[372, 124, 26], [400, 112, 30], [428, 124, 26]].forEach(([x, y, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: '#8CC48F', stroke: BR, 'stroke-width': 3 })); mk(g, 'path', { d: 'M386,150 l14,-20 M414,150 l-14,-20', stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
  g = arG[2]; mk(g, 'path', { d: 'M582,152 C582,130 578,116 582,100', stroke: '#4E7A34', 'stroke-width': 4, fill: 'none' });
  [[582, 112, -40], [582, 128, 220], [582, 104, 250]].forEach(([x, y, a]) => { const l = mk(g, 'g', { transform: `rotate(${a} ${x} ${y})` }); mk(l, 'path', { d: `M${x},${y} c8,-12 26,-12 32,0 c-6,10 -24,10 -32,0Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 2.5 }); });
}
$('#bl0').insertAdjacentHTML('afterbegin', `<span style="display:flex">${M.icon('drop', 34, RBC, 2.4)}</span>`);
$('#bl1').insertAdjacentHTML('afterbegin', `<span style="display:flex">${M.icon('drop', 34, C.dim, 2.4)}</span>`);
const KB = [['leaf', 'Plantae', 'PLANTS'], ['paw', 'Animalia', 'ANIMALS']];
$('#kbs').innerHTML = KB.map(([ic, n, w], i) => `<div class="kb" id="kb${i}" style="left:${36 + i * 368}px;height:340px"><i>${M.icon(ic, 96, C.ac, 1.8)}</i><div class="kn" style="top:186px">${n}</div><div class="kw" style="top:248px">${w}</div></div>`).join('');
const avB = PUC.avatar($('#sB'), { x: 976 + 36, y: 270 + 460, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two boxes for all of life?' });

/* ---------- S: the two kingdom sort ---------- */
const ORG = [['mango', 'Mango tree', 0, [60, 340], 'S2', 'mango', null, 'PLANTAE · FITS'],
  ['paw', 'Cat', 1, [584, 340], 'S2', 'cat', null, 'ANIMALIA · FITS'],
  ['mush', 'Mushroom', 0, [280, 340], 'S3', 'mushroom', ['S3', 'chlorophyll'], 'NO CHLOROPHYLL'],
  ['microbe', 'Bacterium', 0, [60, 420], 'S4', 'bacterium', ['S4', 'nucleus'], 'NO NUCLEUS'],
  ['eug', 'Euglena', -1, [426, 196], 'S5', 'Euglena', ['S5', 'neither'], 'GREEN + SWIMS']];
$('#orgs').innerHTML = ORG.map(([ic, n], i) => `<div class="org" id="og${i}"><i>${M.icon(ic, 30, C.ac, 2.2)}</i>${n}${ORG[i][6] ? '<div class="fl">!</div>' : ''}</div>`).join('');
$('#vrs').innerHTML = ORG.map(([ic, n, , , , , bad, w], i) => `<div class="vr" id="vr${i}" style="top:${84 + i * 80}px"><div class="vn">${n}</div><div class="vw" style="color:${bad ? 'var(--red)' : '#1F6B3F'}">${w}</div><div class="vk" style="background:${bad ? 'var(--red)' : 'var(--ok)'}">${M.icon(bad ? 'x' : 'check', 20, '#fff', 3)}</div></div>`).join('');
const tOrg = ORG.map(o => wt(o[4], o[5])), tFlag = ORG.map(o => o[6] ? wt(o[6][0], o[6][1]) : null);
const MS = [['True nucleus or none', 'Prokaryotic', 'Eukaryotic', 'S7'], ['One cell or many', 'Unicellular', 'Multicellular', 'S8'], ['Makes food or cannot', 'Green algae', 'Fungi', 'S9']];
$('#mss').innerHTML = MS.map(([h, a, b], i) => `<div class="ms" id="ms${i}" style="top:${84 + i * 148}px"><div class="mn">${i + 1}</div><div class="mt">${h}</div><div class="mp"><span>${a}</span><em>VS</em><span>${b}</span></div></div>`).join('');
{ const s = $('#soS'); // funnel from the drop point into both boxes
  mk(s, 'path', { d: 'M528,170 C528,230 270,240 266,290', stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' });
  mk(s, 'path', { d: 'M528,170 C528,230 786,240 790,290', stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' });
  mk(s, 'circle', { cx: 528, cy: 160, r: 8, fill: C.dim }); }

/* ---------- Z: the zoom ladder (mushroom -> hyphae -> one hypha -> chitin) ---------- */
const ZN = ['MUSHROOM', 'HYPHAE', 'ONE HYPHA', 'CELL WALL'], ZS = ['x1', 'x100', 'x1,000', 'x100,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Mushroom', 'The part we see above the soil.', 'Looks like a plant: grows, never moves.'],
  ['RUNG 2 OF 4', 'Hyphae', 'Thin threads, packed tightly together.', 'No leaves, no true roots.'],
  ['RUNG 3 OF 4', 'One hypha', 'A tube of cells, with nuclei and cross walls.', 'No chloroplasts: it cannot make food.'],
  ['RUNG 4 OF 4', 'Chitin', 'The tough material of its cell wall.', 'Plants use cellulose. Insects use chitin too.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So it is not a plant!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[510, 380, 46], [520, 250, 40], [760, 204, 40], null];
const LAB = [];
// level 0: mushroom
{ const g = ZG[0];
  mk(g, 'path', { d: 'M60,446 Q300,430 528,440 T1000,436', stroke: BR, 'stroke-width': 4, fill: 'none' });
  for (let k = 0; k < 16; k++) { const x = 90 + k * 58; mk(g, 'path', { d: `M${x},440 l-6,-16 M${x},440 l4,-18 M${x},440 l12,-12`, stroke: '#4E7A34', 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }); }
  mk(g, 'path', { d: 'M468,442 C474,380 478,320 484,262 L536,262 C542,320 546,380 552,442 Z', fill: '#F3EAD8', stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M318,264 Q510,300 702,264 Q510,284 318,264 Z', fill: '#E8D3B6', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 15; k++) { const x = 340 + k * 24; mk(g, 'line', { x1: x, y1: 268 + Math.sin((k / 14) * Math.PI) * 14, x2: 510 + (x - 510) * 0.82, y2: 276 + Math.sin((k / 14) * Math.PI) * 10, stroke: '#9A7A55', 'stroke-width': 2 }); }
  mk(g, 'path', { d: 'M300,266 C318,100 702,100 720,266 Q510,250 300,266 Z', fill: '#B9805A', stroke: BR, 'stroke-width': 4.5 });
  [[420, 180, 14], [520, 150, 12], [610, 190, 13], [380, 228, 10], [660, 236, 9]].forEach(([x, y, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: '#E7C9A6' }));
  LAB[0] = [[430, 200, 250, 110, 'Cap', 'end'], [640, 274, 790, 330, 'Gills', 'start'], [546, 380, 700, 410, 'Stalk', 'start']];
}
// level 1: hyphae packed together
const hyLines = [];
{ const g = ZG[1];
  for (let k = 0; k < 17; k++) { const x = 140 + k * 46, ph = k * 1.3;
    let d = `M${x},60`; for (let y = 60; y <= 470; y += 20) d += ` L${(x + 9 * Math.sin(y / 46 + ph)).toFixed(1)},${y}`;
    mk(g, 'path', { d, stroke: CHIT, 'stroke-width': 30, fill: 'none', 'stroke-linecap': 'round' });
    hyLines.push(mk(g, 'path', { d, stroke: '#F3EAD8', 'stroke-width': 23, fill: 'none', 'stroke-linecap': 'round' })); }
}
// labels for level 1 sit on a white tab so they read over the threads
const tabs1 = [mk(ZG[1], 'rect', { x: 668, y: 74, width: 300, height: 52, rx: 10, fill: '#fff', stroke: C.line, 'stroke-width': 2 }), mk(ZG[1], 'rect', { x: 668, y: 382, width: 252, height: 52, rx: 10, fill: '#fff', stroke: C.line, 'stroke-width': 2 })];
LAB[1] = [[554, 120, 668, 100, 'Hypha (one thread)', 'start'], [586, 408, 668, 408, 'Packed tightly', 'start']];
// level 2: one hypha with cross walls and nuclei, no chloroplasts
{ const g = ZG[2];
  mk(g, 'rect', { x: 70, y: 196, width: 900, height: 140, rx: 70, fill: '#E9D9BF', stroke: CHIT, 'stroke-width': 6 });
  mk(g, 'rect', { x: 86, y: 212, width: 868, height: 108, rx: 54, fill: '#FBF6EC', stroke: '#B79C78', 'stroke-width': 2 });
  [330, 600].forEach(x => { mk(g, 'line', { x1: x, y1: 200, x2: x, y2: 254, stroke: CHIT, 'stroke-width': 7 }); mk(g, 'line', { x1: x, y1: 278, x2: x, y2: 332, stroke: CHIT, 'stroke-width': 7 }); });
  [[200, 248], [250, 290], [460, 258], [520, 300], [730, 250], [840, 292]].forEach(([x, y]) => { mk(g, 'ellipse', { cx: x, cy: y, rx: 20, ry: 14, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x + 2, cy: y, r: 5, fill: NUC }); });
  // the missing chloroplast: a crossed-out green lens
  const nc = fb(mk(g, 'g', { id: 'noChl' })); mk(nc, 'ellipse', { cx: 520, cy: 444, rx: 30, ry: 16, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 2.5 });
  mk(nc, 'path', { d: 'M494,422 L546,466 M546,422 L494,466', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
  txt(nc, 566, 452, 'NO CHLOROPLASTS', { 'font-size': 20, fill: C.red, 'font-weight': 600, 'letter-spacing': 1.5 });
  LAB[2] = [[250, 199, 190, 110, 'Cell wall', 'end'], [330, 300, 330, 400, 'Cross wall', 'end', [330, 400]], [460, 258, 460, 110, 'Nucleus', 'start']];
}
// level 3: chitin chain (rings = sugar units)
{ const g = ZG[3], hexP = (x, y, r) => { const p = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; p.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`); } return 'M' + p.join(' L') + ' Z'; };
  for (let k = 0; k < 6; k++) { const x = 140 + k * 150, y = 220 + (k % 2 ? 22 : -22);
    if (k < 5) mk(g, 'line', { x1: x + 38, y1: y, x2: x + 112, y2: 220 + ((k + 1) % 2 ? 22 : -22), stroke: BR, 'stroke-width': 4 });
    mk(g, 'path', { d: hexP(x, y, 42), fill: '#E2CFB2', stroke: CHIT, 'stroke-width': 4 });
    mk(g, 'path', { d: `M${x},${y + 42} l0,30`, stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y + 78, r: 7, fill: C.mute }); }
  mk(g, 'path', { d: 'M60,220 L94,198 M946,220 L996,238', stroke: BR, 'stroke-width': 4, 'stroke-dasharray': '6 6' });
  LAB[3] = [[290, 228, 250, 110, 'Sugar unit', 'start'], [740, 320, 800, 400, 'Nitrogen group', 'start'], [960, 226, 960, 110, 'Chain goes on', 'end']];
}
const LB = LAB.map((L, lv) => labels(ZG[lv], L));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'cap'), wt('Z2', 'gills'), wt('Z2', 'stalk')], [wt('Z3', 'threads'), wt('Z3', 'packed')],
  [wt('Z4', 'tube'), wt('Z4', 'cross'), wt('Z4', 'nuclei')], [wt('Z5', 'chitin'), wt('Z5', 'chitin') + 0.6, wt('Z5', 'same')]];
const tNoChl = wt('Z4', 'no');
const zW = document.createElement('div'); zW.style.cssText = 'position:absolute;left:36px;top:446px;display:flex;gap:14px';
zW.innerHTML = `<div class="pillp" style="position:relative;height:48px;font-size:22px"><b style="width:18px;height:18px;border-radius:4px;background:${WALL}"></b>Plant wall: cellulose</div><div class="pillp ac" style="position:relative;height:48px;font-size:22px;background:${CHIT}"><b style="width:18px;height:18px;border-radius:4px;background:#E2CFB2"></b>Mushroom wall: chitin</div>`;
$('#zd').appendChild(zW);

/* ---------- C: the seven tests ---------- */
const C7 = [['Cell type', 'prokaryotic, or eukaryotic?'], ['Cell wall', 'is there one? made of what?'], ['Nuclear membrane', 'DNA wrapped up, or loose?'], ['Body organisation', 'one cell, threads, or organs?'],
  ['Mode of nutrition', 'makes its food, or takes it?'], ['Reproduction', 'spores, seeds, or splitting?'], ['Phylogenetic relationships', 'who shares an ancestor?']];
$('#c7s').innerHTML = C7.map(([n, w], i) => `<div class="c7" id="c7${i}" style="top:${76 + i * 68}px"><div class="n">${i + 1}</div><div class="cx">${n}</div><div class="why">${w}</div></div>`).join('');
const tC7 = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'].map(id => T0(id) + 0.3);
const CPQ = [['Cell type', 'Simple, or with membrane-wrapped parts?'], ['Cell wall', 'Present or absent, and of what?'], ['Nuclear membrane', 'Where does the DNA sit?'], ['Body organisation', 'How is the body built?'],
  ['Mode of nutrition', 'Where does the food come from?'], ['Reproduction', 'How does it make more of itself?'], ['Phylogeny', 'The family history of living things']];
$('#cps').innerHTML = CPQ.map(([n, q], i) => `<div class="cp" id="cp${i}"><div class="lbl" style="left:36px;top:30px">TEST ${i + 1} OF 7</div><div class="ct">${n}</div><div class="cq">${q}</div><svg id="cpS${i}" width="784" height="580" style="position:absolute;left:0;top:0"></svg></div>`).join('');
const cpLab = (s, x, y, t, col = C.mute) => txt(s, x, y, t, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, 'letter-spacing': 1.5, fill: col });
const cpAnim = [];
{ let s = $('#cpS0'); // prokaryotic vs eukaryotic
  mk(s, 'rect', { x: 96, y: 250, width: 220, height: 120, rx: 60, fill: '#F3F7EA', stroke: WALL, 'stroke-width': 6 });
  mk(s, 'path', { d: 'M150,310 c14,-24 30,20 44,0 s30,20 44,-4 s24,18 30,0', stroke: NUC, 'stroke-width': 4, fill: 'none' });
  mk(s, 'rect', { x: 444, y: 210, width: 260, height: 210, rx: 48, fill: '#F3F7EA', stroke: CHIT, 'stroke-width': 5 });
  mk(s, 'circle', { cx: 530, cy: 300, r: 40, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 4 }); mk(s, 'circle', { cx: 530, cy: 300, r: 13, fill: NUC });
  mk(s, 'ellipse', { cx: 640, cy: 270, rx: 30, ry: 16, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5 }); mk(s, 'ellipse', { cx: 630, cy: 370, rx: 34, ry: 24, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 2.5 });
  cpLab(s, 206, 470, 'PROKARYOTIC'); cpLab(s, 574, 470, 'EUKARYOTIC'); cpLab(s, 206, 500, 'simple', C.dim); cpLab(s, 574, 500, 'parts in membranes', C.dim);
  s = $('#cpS1'); [['CELLULOSE', WALL, '#F3F7EA', 0], ['CHITIN', CHIT, '#FBF6EC', 0], ['NO WALL', C.dim, '#FBF2F5', 1]].forEach(([n, st, f, dash], i) => { const x = 150 + i * 240;
    mk(s, 'rect', { x: x - 80, y: 230, width: 160, height: 160, rx: 26, fill: f, stroke: st, 'stroke-width': dash ? 3 : 10, 'stroke-dasharray': dash ? '8 8' : 'none' });
    mk(s, 'circle', { cx: x, cy: 310, r: 22, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); cpLab(s, x, 440, n, i === 2 ? C.mute : st); cpLab(s, x, 470, ['plants', 'fungi', 'animals'][i], C.dim); });
  s = $('#cpS2'); mk(s, 'circle', { cx: 210, cy: 320, r: 100, fill: '#F3F7EA', stroke: C.ac, 'stroke-width': 4 });
  cpAnim[2] = mk(s, 'path', { d: '', stroke: NUC, 'stroke-width': 4, fill: 'none' });
  mk(s, 'circle', { cx: 574, cy: 320, r: 100, fill: '#F3F7EA', stroke: C.ac, 'stroke-width': 4 }); mk(s, 'circle', { cx: 574, cy: 320, r: 48, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 5 });
  mk(s, 'path', { d: 'M548,320 c8,-16 16,14 24,0 s16,14 24,0 s12,12 20,0', stroke: NUC, 'stroke-width': 3.5, fill: 'none' });
  cpLab(s, 210, 470, 'DNA LOOSE'); cpLab(s, 574, 470, 'DNA IN A MEMBRANE');
  s = $('#cpS3'); mk(s, 'circle', { cx: 150, cy: 320, r: 50, fill: '#F3F7EA', stroke: C.ac, 'stroke-width': 4 }); mk(s, 'circle', { cx: 150, cy: 320, r: 14, fill: NUC });
  for (let k = 0; k < 5; k++) mk(s, 'path', { d: `M${330 + k * 26},250 q14,35 0,70 t0,70`, stroke: CHIT, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
  mk(s, 'path', { d: 'M620,400 C620,340 616,300 622,250', stroke: '#4E7A34', 'stroke-width': 7, fill: 'none' }); mk(s, 'path', { d: 'M622,280 c20,-34 70,-34 86,0 c-16,26 -66,26 -86,0Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 3 });
  mk(s, 'path', { d: 'M620,330 c-20,-30 -66,-30 -80,0 c14,24 60,24 80,0Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 3 }); mk(s, 'path', { d: 'M620,400 l-24,24 M620,400 l22,26 M620,400 l0,30', stroke: '#8A6A44', 'stroke-width': 4, 'stroke-linecap': 'round' });
  cpLab(s, 150, 470, 'ONE CELL'); cpLab(s, 382, 470, 'THREADS'); cpLab(s, 620, 470, 'TISSUES, ORGANS');
  s = $('#cpS4'); mk(s, 'circle', { cx: 130, cy: 260, r: 30, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
  cpAnim[4] = mk(s, 'path', { d: 'M164,276 l70,40', stroke: GOLD, 'stroke-width': 5, 'stroke-dasharray': '12 8', fill: 'none' });
  mk(s, 'path', { d: 'M236,330 c26,-46 100,-46 120,0 c-20,36 -96,36 -120,0Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 3 });
  mk(s, 'path', { d: 'M470,380 L720,380', stroke: '#8A6A44', 'stroke-width': 26, 'stroke-linecap': 'round' });
  mk(s, 'path', { d: 'M560,368 C564,340 566,320 570,300 L590,300 C594,320 596,340 600,368 Z', fill: '#F3EAD8', stroke: BR, 'stroke-width': 3 }); mk(s, 'path', { d: 'M530,302 C540,240 620,240 630,302 Q580,312 530,302Z', fill: '#B9805A', stroke: BR, 'stroke-width': 3 });
  cpLab(s, 250, 470, 'AUTOTROPHIC', C.ac); cpLab(s, 250, 500, 'makes its own food', C.dim); cpLab(s, 596, 470, 'HETEROTROPHIC', CHIT); cpLab(s, 596, 500, 'takes food from others', C.dim);
  s = $('#cpS5'); for (let k = 0; k < 9; k++) mk(s, 'circle', { cx: 110 + (k % 3) * 34, cy: 270 + Math.floor(k / 3) * 34, r: 10, fill: '#E2CFB2', stroke: CHIT, 'stroke-width': 2.5 });
  mk(s, 'ellipse', { cx: 392, cy: 310, rx: 46, ry: 30, fill: '#D9B97F', stroke: BR, 'stroke-width': 3 }); mk(s, 'path', { d: 'M392,282 q-10,28 0,56', stroke: BR, 'stroke-width': 2.5, fill: 'none' });
  cpAnim[5] = [mk(s, 'circle', { cx: 640, cy: 310, r: 40, fill: '#F3F7EA', stroke: C.ac, 'stroke-width': 4 }), mk(s, 'circle', { cx: 640, cy: 310, r: 40, fill: '#F3F7EA', stroke: C.ac, 'stroke-width': 4 })];
  cpLab(s, 144, 470, 'SPORES'); cpLab(s, 392, 470, 'SEEDS'); cpLab(s, 640, 470, 'SPLITTING');
  s = $('#cpS6'); const P6 = [[392, 440], [392, 360], [250, 290], [534, 290], [180, 220], [320, 220], [534, 220]];
  [[0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [3, 6]].forEach(([a, b]) => mk(s, 'path', { d: `M${P6[a][0]},${P6[a][1]} L${P6[b][0]},${P6[a][1] - 20} L${P6[b][0]},${P6[b][1]}`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' }));
  P6.slice(4).forEach(([x, y]) => mk(s, 'circle', { cx: x, cy: y - 14, r: 14, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 }));
  mk(s, 'circle', { cx: 392, cy: 440, r: 10, fill: C.ink }); cpLab(s, 392, 484, 'COMMON ANCESTOR', C.ink);
}

/* ---------- P: prokaryotic vs eukaryotic ---------- */
const pLB = [];
{ const s = $('#paS'), g = mk(s, 'g', {});
  mk(g, 'rect', { x: 150, y: 190, width: 470, height: 200, rx: 100, fill: '#E7E1C2', stroke: '#7A6A2E', 'stroke-width': 5 });
  mk(g, 'rect', { x: 166, y: 206, width: 438, height: 168, rx: 84, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M270,290 c16,-36 40,30 60,0 s40,30 60,-6 s36,26 52,0 s30,24 44,4 c-6,-20 -30,-30 -56,-20 s-60,-12 -90,4 s-52,-6 -70,18', stroke: NUC, 'stroke-width': 4, fill: 'none' });
  for (let k = 0; k < 14; k++) mk(g, 'circle', { cx: 210 + (k * 67) % 360, cy: 236 + (k * 41) % 110, r: 5, fill: '#8E7AB0' });
  pLB.push(labels(g, [[160, 290, 120, 120, 'Cell wall', 'start'], [300, 206, 330, 120, 'Cell membrane', 'start'], [420, 300, 520, 460, 'DNA (loose)', 'start'], [210, 348, 160, 460, 'Ribosomes', 'start']])); }
{ const s = $('#pbS'), g = mk(s, 'g', {});
  mk(g, 'ellipse', { cx: 392, cy: 300, rx: 210, ry: 150, fill: '#E9D9BF', stroke: CHIT, 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: 392, cy: 300, rx: 196, ry: 136, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 330, cy: 290, r: 56, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 6 }); mk(g, 'circle', { cx: 330, cy: 290, r: 47, fill: 'none', stroke: NUC, 'stroke-width': 2 });
  mk(g, 'path', { d: 'M302,292 c8,-16 16,14 24,0 s16,14 24,0 s12,12 18,0', stroke: NUC, 'stroke-width': 3.5, fill: 'none' });
  mk(g, 'ellipse', { cx: 470, cy: 340, rx: 52, ry: 40, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 470, cy: 236, rx: 36, ry: 18, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M444,236 q5,-8 10,0 t10,0 t10,0 t10,0', stroke: '#B35F22', 'stroke-width': 2, fill: 'none' });
  pLB.push(labels(g, [[196, 260, 150, 120, 'Cell wall', 'start'], [330, 290, 330, 470, 'Nucleus', 'end', [330, 470]], [372, 270, 400, 120, 'Nuclear membrane', 'start'], [500, 360, 560, 470, 'Vacuole', 'start'], [500, 236, 620, 160, 'Mitochondrion', 'start']])); }
const tPa = [wt('P2', 'small'), wt('P2', 'simple'), wt('P2', 'DNA'), wt('P2', 'lies')], tPb = [wt('P3', 'yeast'), wt('P3', 'nucleus'), wt('P3', 'membrane'), wt('P3', 'other'), wt('P3', 'parts')];
const th1 = PUC.think($('#th1'), { q: 'Cyanobacteria are green and make their own food. Is their cell prokaryotic or eukaryotic?', opts: ['Prokaryotic', 'Eukaryotic'], right: 0, why: 'Prokaryotic. Cyanobacteria are bacteria: being green does not give a cell a nucleus.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:600 30px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.02em">not by the <b style="color:var(--red)">looks</b></span>';

/* ---------- W: worked example (a four-question key) ---------- */
const QN = ['Nuclear membrane?', 'A single cell?', 'Makes own food?', 'Chitin wall?'], QX = [36, 344, 652, 960];
$('#qns').innerHTML = QN.map((q, i) => `<div class="qn" id="qn${i}" style="left:${QX[i]}px;width:248px"><b>Q${i + 1}</b><span>${q}</span></div>`).join('');
const KX = ['NO NUCLEAR MEMBRANE', 'ONE EUKARYOTIC CELL', 'MAKES ITS OWN FOOD', 'CHITIN WALL', 'NO CELL WALL'], BX = [36, 344, 652, 960, 1268];
$('#kxs').innerHTML = KX.map((k, i) => `<div class="kx" id="kx${i}" style="left:${BX[i]}px"><div class="kh">${k}</div></div>`).join('');
const TK = [['microbe', 'Bacterium', 0, wt('W2', 'bacterium')], ['eug', 'Euglena', 1, wt('W3', 'Euglena')], ['mango', 'Mango tree', 2, wt('W4', 'mango')], ['mush', 'Mushroom', 3, wt('W5', 'mushroom')], ['paw', 'Cat', 4, wt('W5', 'cat')]];
$('#toks').innerHTML = TK.map(([ic, n], i) => `<div class="tok" id="tk${i}"><i>${M.icon(ic, 28, C.ac, 2.2)}</i>${n}</div>`).join('');
const YN = [];
{ const s = $('#wkS'); const down = [['NO', 0], ['YES', 1], ['YES', 2], ['YES', 3]];
  down.forEach(([w, i]) => { const x = QX[i] + 124; YN.push([mk(s, 'path', { d: `M${x},192 L${x},352`, stroke: C.ink, 'stroke-width': 3, fill: 'none' }), w, x, 300]); });
  [0, 1, 2].forEach(i => YN.push([mk(s, 'path', { d: `M${QX[i] + 248},144 L${QX[i + 1]},144`, stroke: C.ink, 'stroke-width': 3, fill: 'none' }), i === 0 ? 'YES' : 'NO', QX[i] + 278, 144]));
  YN.push([mk(s, 'path', { d: `M${QX[3] + 248},144 L1396,144 L1396,352`, stroke: C.ink, 'stroke-width': 3, fill: 'none' }), 'NO', 1396, 260]); }
const ynEl = YN.map(([, w, x, y]) => { const d = document.createElement('div'); d.className = 'yn'; d.textContent = w; d.style.cssText = `left:${x - 26}px;top:${y - 15}px;width:52px;justify-content:center;padding:0;background:${w === 'YES' ? C.okBg : C.redBg};color:${w === 'YES' ? '#1F6B3F' : C.red}`; $('#wk').appendChild(d); return d; });
const tQn = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const ynT = [tQn[0] + 1.2, tQn[1] + 1.2, tQn[2] + 1.2, tQn[3] + 1.2, tQn[1] - 0.2, tQn[2] - 0.2, tQn[3] - 0.2, TK[4][3] - 0.4];
const kTag = document.createElement('div'); kTag.className = 'pillp ac'; kTag.style.cssText = 'right:36px;top:18px;height:44px;font-size:21px'; kTag.textContent = 'Five boxes, not two'; $('#wk').appendChild(kTag);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'It has a cell wall, so it must be a plant', right: 'Wall material matters, and plants make their own food' });
const tSv = $('#tS'), tCel = [];
[['CELLULOSE', WALL, 'plant'], ['CHITIN', CHIT, 'fungus'], ['NOT CELLULOSE', '#7A6A2E', 'bacterium']].forEach(([n, st, w], i) => { const x = 96 + i * 168, g = fb(mk(tSv, 'g', {}));
  if (i === 2) mk(g, 'rect', { x: x - 60, y: 106, width: 120, height: 64, rx: 32, fill: '#F3F7EA', stroke: st, 'stroke-width': 6 });
  else mk(g, 'rect', { x: x - 56, y: 82, width: 112, height: 112, rx: 20, fill: i ? '#FBF6EC' : '#F3F7EA', stroke: st, 'stroke-width': 8 });
  if (i === 0) [[x - 26, 112], [x + 22, 160]].forEach(([a, b]) => mk(g, 'ellipse', { cx: a, cy: b, rx: 14, ry: 8, fill: '#6DB27A', stroke: '#1F5E37', 'stroke-width': 2 }));
  if (i < 2) mk(g, 'circle', { cx: x, cy: 138, r: 16, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 });
  txt(g, x, 230, n, { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, 'letter-spacing': 1.2, fill: i === 0 ? '#7A6A2E' : st }); txt(g, x, 252, w, { 'text-anchor': 'middle', 'font-size': 15, fill: C.dim }); tCel.push(g); });
const where = PUC.where($('#wa'), { on: [], type: 'Statements on why two kingdoms failed, or on the features used to classify' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>A mushroom\'s cell wall is made of cellulose.</div><div class="sl"><b>II</b>A prokaryotic cell has no nuclear membrane.</div><div class="sl"><b>III</b>The two kingdom system placed fungi with plants.</div><div class="sl"><b>IV</b>Phylogeny groups living things by body size.</div>',
  opts: ['II and III only', 'I and II only', 'I, II and III only', 'II, III and IV only'], right: 0, optW: 474, optY: 404 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (II, III)'], ['<b style="color:var(--red)">I</b> is false'], ['Mushroom wall: chitin'], ['<b style="color:var(--red)">IV</b> is false'], ['Phylogeny: shared ancestry']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'One'), wt('A2', 'chitin'), wt('A3', 'Four'), wt('A3', 'shared')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · basis of classification', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Aristotle</b>: trees, shrubs, herbs · red blood or not', '<b>Linnaeus</b>: two kingdoms, Plantae and Animalia', '<b>Two kingdoms missed</b>: nucleus · one cell or many · food',
    '<b>Tests 1-4</b>: cell type · cell wall · nuclear membrane · body', '<b>Tests 5-7</b>: nutrition · reproduction · phylogeny', '<b>Mushroom</b>: chitin wall, no chloroplasts, heterotrophic'] });
const YQ = ['Why is a mushroom not a plant?', 'Which three differences did two kingdoms miss?', 'Autotrophic vs heterotrophic: what is the difference?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 12', topic: 'Five boxes instead of two: Five-Kingdom Classification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tEu = wt('S5', 'Euglena');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tEu - 0.2, 1.045, 930, 560], [T0('S6'), 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'Plant') - 0.1 + i * 0.25, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'None') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tSeven - 0.25;
    M.vis(hsG, t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const rn = $('#rain'); rn.setAttribute('transform', `translate(0 ${((t * 60) % 40).toFixed(1)})`);
    M.vis($('#hkP'), t, wt('H3', 'grows') - 0.2, tH4 - 0.1, { ...POP, outDur: 0.2 }); M.vis($('#hkN'), t, tH4 + 0.1, kOut, { ...POP, outDur: 0.25 });
    M.draw(hkRing, t, wt('H4', 'not') - 0.2, 0.6); hkRing.style.opacity = 1 - M.clamp((t - kOut) / 0.25);
    M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const on7 = M.vis($('#h7'), t, tSeven - 0.1, 1e9, { dy: 0, fade: 0.25 });
    if (on7) { M.vis($('#h7T'), t, tSeven - 0.05, 1e9, { dy: 14 });
      for (let i = 0; i < 7; i++) M.vis($('#q7' + i), t, tSeven + 0.2 + i * 0.09, 1e9, { ...POP, sc: 0.5 });
      M.vis($('#h7P'), t, tTwo - 0.1, 1e9, POP); }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tS1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('S1');
    M.vis($('#ba'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ar0'), t, wt('B2', 'plants') - 0.2, 1e9, { dy: 16 });
    const tf = [wt('B2', 'trees'), wt('B2', 'shrubs'), wt('B2', 'herbs')];
    FM.forEach((_, i) => { M.vis($('#fm' + i), t, tf[i] - 0.1, 1e9, POP); M.vis(arG[i], t, tf[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); });
    M.vis($('#ar1'), t, T0('B3') - 0.1, 1e9, { dy: 16 });
    M.vis($('#bl0'), t, wt('B3', 'with') - 0.1, 1e9, POP); M.vis($('#bl1'), t, wt('B3', 'without') - 0.1, 1e9, POP);
    M.vis($('#baP'), t, T1('B3') + 0.1, 1e9, POP);
    M.vis($('#bk'), t, T0('B4') - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kb0'), t, wt('B4', 'Plantae') - 0.1, 1e9, { dy: 20 }); M.vis($('#kb1'), t, wt('B4', 'Animalia') - 0.1, 1e9, { dy: 20 });
    avB(t, T1('B4') - 0.2, out);
  }

  /* S: two kingdom sort */
  const sOn = t >= tS1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('Z1');
    M.vis($('#so2'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#bin0'), t, tS1 + 0.3, 1e9, { dy: 16 }); M.vis($('#bin1'), t, tS1 + 0.42, 1e9, { dy: 16 });
    ORG.forEach((og, i) => { const el = $('#og' + i), t0 = tOrg[i], u = M.io((t - t0 - 0.55) / 0.7);
      M.vis(el, t, t0 - 0.1, 1e9, { ...POP, sc: 0.6 });
      let x = 426 + (og[3][0] - 426) * u, y = 100 + (og[3][1] - 100) * u;
      if (og[2] < 0) { const w = M.clamp((t - t0 - 0.6) / 0.4); x = 426 + 150 * Math.sin((t - t0) * 3.2) * w; y = 100 + 96 * u; }
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      const f = tFlag[i] != null ? M.io((t - tFlag[i]) / 0.3) : 0; el.style.borderColor = mix(C.line, C.red, f);
      const fl = el.querySelector('.fl'); if (fl) M.vis(fl, t, tFlag[i], 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#vl'), t, tOrg[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    const vOut = T0('S6') + 0.1;
    M.vis($('#vlL'), t, tOrg[0] - 0.1, vOut, { dy: 8, outDur: 0.25 });
    ORG.forEach((_, i) => M.vis($('#vr' + i), t, (tFlag[i] ?? tOrg[i] + 0.9), vOut, { dx: -16, dy: 0, outDur: 0.25, ody: -10 }));
    M.vis($('#msL'), t, vOut + 0.3, 1e9, { dy: 8 });
    MS.forEach((m, i) => { const t0 = T0(m[3]); M.vis($('#ms' + i), t, t0 - 0.1, 1e9, { dx: -20, dy: 0 }); });
  }

  /* Z: zoom ladder */
  const zOn = t >= tZ1 - 0.1 && t < tC1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('C1');
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
      runLabs(LB[k], t, tLab[k]);
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    tabs1.forEach((r, i) => { r.style.opacity = M.clamp((t - tLab[1][i] - 0.2) / 0.25).toFixed(3); });
    // threads gently sway (the hyphae are alive)
    hyLines.forEach((l, i) => l.setAttribute('stroke', mix('#F3EAD8', '#FFF8EA', 0.5 + 0.5 * Math.sin(t * 2 + i))));
    M.vis($('#noChl'), t, tNoChl - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis(zW, t, wt('Z5', 'cellulose') - 0.1, 1e9, { dy: 14 });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'insect') + 0.4, out);
  }

  /* C: seven tests */
  const cOn = t >= tC1 - 0.1 && t < tP1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('P1');
    M.vis($('#cf'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#cr'), t, tC7[0] - 0.4, out, { dx: 60, dy: 0, ...o });
    C7.forEach((_, i) => { const el = $('#c7' + i); M.vis(el, t, tC1 + 0.4 + i * 0.07, 1e9, { dy: 10 });
      const on = M.io((t - tC7[i] + 0.2) / 0.25); el.querySelector('.n').style.background = mix('#FFFFFF', C.ac, on); el.querySelector('.n').style.color = mix(C.ac, '#FFFFFF', on);
      el.querySelector('.cx').style.color = mix(C.dim, C.ink, Math.max(on, 0)); el.querySelector('.why').style.color = mix(C.dim, C.mute, on); });
    const hiY = M.track(76, tC7.slice(1).map((tt, i) => [tt - 0.2, 76 + (i + 1) * 68]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tC7[0] - 0.2, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px';
    C7.forEach((_, i) => M.vis($('#cp' + i), t, tC7[i] - 0.3, i < 6 ? tC7[i + 1] - 0.35 : 1e9, { dy: 18, outDur: 0.22, ody: -12 }));
    // loose DNA wriggles; sunlight flows; one cell splits
    { let d = 'M150,320'; for (let k = 0; k <= 12; k++) d += ` L${150 + k * 10},${(320 + 18 * Math.sin(k * 0.9 + t * 3)).toFixed(1)}`; cpAnim[2].setAttribute('d', d); }
    cpAnim[4].style.strokeDashoffset = (-(t * 40) % 20).toFixed(1);
    { const u = (Math.sin((t - tC7[5]) * 1.6) + 1) / 2; attr(cpAnim[5][0], 'cx', (640 - 34 * u).toFixed(1)); attr(cpAnim[5][1], 'cx', (640 + 34 * u).toFixed(1)); }
  }

  /* P: prokaryotic vs eukaryotic, then pause and think */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P4');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    runLabs(pLB[0], t, tPa); M.vis($('#paP'), t, wt('P2', 'no') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P3') - 0.15, out, { dx: 60, dy: 0, ...o });
    runLabs(pLB[1], t, tPb); M.vis($('#pbP'), t, wt('P3', 'wrapped') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tP4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tP4, tOpts: wt('P4', 'prokaryotic') - 0.1, tCount: T1('P4') + 0.05, dur: 3, tAns: T0('P5') - 0.02, tWhy: wt('P5', 'Cyanobacteria') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Classify') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'looks') - 0.5, 0.8);
  }

  /* W: worked example (key) */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wk'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    QN.forEach((_, i) => { const el = $('#qn' + i); M.vis(el, t, tW1 + 0.3 + i * 0.1, 1e9, { dy: 12 });
      const on = M.io((t - tQn[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tQn[i + 1]) / 0.25) : 1 - M.io((t - T0('W6')) / 0.25)); el.style.background = mix(C.ink, C.ac, on); });
    KX.forEach((_, i) => { const el = $('#kx' + i); M.vis(el, t, tW1 + 0.6 + i * 0.08, 1e9, { dy: 12 });
      const fin = M.io((t - T0('W6')) / 0.3); el.style.borderStyle = fin > 0.5 ? 'solid' : 'dashed'; el.style.borderColor = mix('#CBD0DA', C.ac, fin); });
    YN.forEach(([p], i) => { M.draw(p, t, ynT[i] - 0.3, 0.4); M.vis(ynEl[i], t, ynT[i], 1e9, { ...POP, sc: 0.5 }); });
    TK.forEach(([, , k, t0], i) => { const el = $('#tk' + i); M.vis(el, t, t0 - 0.1, 1e9, { ...POP, sc: 0.6 });
      const steps = Math.min(k, 3), hx = M.io((t - t0 - 0.4) / (0.35 + 0.15 * steps)), extra = k === 4 ? M.io((t - t0 - 0.8) / 0.3) : 0, dn = M.io((t - t0 - (k === 4 ? 1.15 : 0.8)) / 0.45);
      const x = 18 + QX[0] + (QX[steps] - QX[0]) * hx + (BX[4] - QX[3]) * extra, y = 202 + (414 - 202) * dn;
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; el.style.background = mix('#FFFFFF', C.ac2, dn); el.style.boxShadow = dn < 1 ? '0 6px 16px rgba(22,33,62,.12)' : 'none'; });
    M.vis(kTag, t, wt('W6', 'five') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'it') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'What') - 0.1 });
    const tw = [wt('X2', 'plant') - 0.1, wt('X3', 'fungi') - 0.1, wt('X3', 'bacteria') - 0.1];
    tCel.forEach((g, i) => M.vis(g, t, tw[i], 1e9, { ...POP, sc: 0.5 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + questions + NEXT */
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
