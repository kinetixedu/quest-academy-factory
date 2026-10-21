// PUC Biology Ep 07: Species, Genus, Family, Order, Class, Phylum and Kingdom (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed colours (bible canon) + this batch: mango leaf green, wheat gold, housefly sky, human red
const BR = '#2E2A24', LEAF = '#8CC48F', VEIN = '#D8ECD2', GRN = C.ac, MG = '#3E9B5F', WH = '#C9962B', FL = '#5AA0C8', HU = '#D1495B';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const pulse = (t, t0, d = 1.0) => M.io((t - t0) / 0.2) * (1 - M.io((t - t0 - d) / 0.3));

Object.assign(M.IC, {
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
  wheat: ['M12 22V7', 'M12 7c-2-1-3-3-3-5 2 1 3 3 3 5Z', 'M12 7c2-1 3-3 3-5-2 1-3 3-3 5Z', 'M12 12c-2-1-3.5-3-3.5-5 2 1 3.5 3 3.5 5Z', 'M12 12c2-1 3.5-3 3.5-5-2 1-3.5 3-3.5 5Z', 'M12 17c-2-1-3.5-3-3.5-5 2 1 3.5 3 3.5 5Z', 'M12 17c2-1 3.5-3 3.5-5-2 1-3.5 3-3.5 5Z'],
  fly: [ci(12, 6, 2.6), 'M12 8.6c-1.8 0-2.8 2.2-2.8 5.4S10.6 21 12 21s2.8-3.8 2.8-7-1-5.4-2.8-5.4Z', 'M10 11C6 8 2 9.5 3 12.5s4.4 1.6 7-.5', 'M14 11c4-3 8-1.5 7 1.5s-4.4 1.6-7-.5'],
  spine: ['M12 2v20', 'M8 5h8', 'M8 9h8', 'M8 13h8', 'M8 17h8'],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
});

/* leaf drawing helper: local leaf along +x, base at 0,0. venation 'net' or 'par' */
const leafD = (L, W) => `M0,0 C${L * .25},${-W} ${L * .7},${-W * .9} ${L},0 C${L * .7},${W * .9} ${L * .25},${W} 0,0 Z`;
function leaf(p, x, y, ang, L, W, ven, fill = LEAF) {
  const g = mk(p, 'g', { transform: `translate(${x} ${y}) rotate(${ang})` });
  mk(g, 'path', { d: leafD(L, W), fill, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  if (ven === 'net') {
    mk(g, 'line', { x1: 0, y1: 0, x2: L * .97, y2: 0, stroke: VEIN, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
    const pts = [];
    for (let s = .12; s < .86; s += .12) { const h = Math.sin(Math.PI * Math.min(.95, s + .1)) * W * .72;
      [-1, 1].forEach(sg => mk(g, 'path', { d: `M${(L * s).toFixed(1)},0 Q${(L * (s + .06)).toFixed(1)},${(sg * h * .5).toFixed(1)} ${(L * (s + .13)).toFixed(1)},${(sg * h).toFixed(1)}`, stroke: VEIN, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }));
      pts.push([L * (s + .07), h * .48]); }
    [-1, 1].forEach(sg => { for (let k = 0; k < pts.length - 1; k++) mk(g, 'path', { d: `M${pts[k][0].toFixed(1)},${(sg * pts[k][1]).toFixed(1)} L${(pts[k][0] + L * .05).toFixed(1)},${(sg * pts[k][1] * 1.25).toFixed(1)} L${pts[k + 1][0].toFixed(1)},${(sg * pts[k + 1][1]).toFixed(1)}`, stroke: VEIN, 'stroke-width': 1.4, fill: 'none' }); });
  } else {
    [-.55, -.28, 0, .28, .55].forEach(k => mk(g, 'path', { d: `M${L * .02},${(k * W * .5).toFixed(1)} Q${L * .5},${(k * W * 1.1).toFixed(1)} ${L * .97},0`, stroke: VEIN, 'stroke-width': k === 0 ? 3 : 2, fill: 'none' }));
  }
  return g;
}
// labelled-diagram system: dot on the part, leader line, text (pops after the line draws)
function LBmake(g, L) { return L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx }; }); }
const LBrun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tR1 = T0('R1'), tZ1 = T0('Z1'), tV1 = T0('V1'), tC1 = T0('C1'), tC5 = T0('C5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: four living things ---------- */
const JOBS = [['mango', 'A mango', 'FRUIT TREE', 'mango', MG, 'Mangifera indica'], ['wheat', 'Wheat', 'GRAIN CROP', 'wheat', WH, 'Triticum aestivum'], ['fly', 'A housefly', 'INSECT', 'housefly', FL, 'Musca domestica'], ['user', 'You', 'HUMAN', 'you', HU, 'Homo sapiens']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w, , col], i) => `<div class="job" id="jb${i}" style="left:${160 + i * 408}px"><i>${M.icon(ic, 32, col, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, , , col, bi], i) => `<div class="jr" id="jr${i}" style="top:${80 + i * 102}px"><i>${M.icon(ic, 34, col, 2.2)}</i><div class="jn">${n}</div><div class="jw">${bi}</div><div class="jt" id="jt${i}">${'<b></b>'.repeat(7)}&nbsp;7 LINES</div></div>`).join('');
// ladder preview: four lanes climb; plants meet at division, animals only at kingdom
const RK = ['SPECIES', 'GENUS', 'FAMILY', 'ORDER', 'CLASS', 'DIVISION', 'KINGDOM'];
const hl = $('#hlS'), yR = r => 470 - r * 58;
RK.forEach((n, r) => { mk(hl, 'line', { x1: 196, y1: yR(r), x2: 720, y2: yR(r), stroke: '#E3E6EC', 'stroke-width': 2, 'stroke-dasharray': '6 6' }); txt(hl, 36, yR(r) + 6, r === 5 ? 'PHYLUM / DIV.' : n, { 'font-size': 15, 'letter-spacing': 1 }); });
const LANE = [[MG, 'M300,470 V222 L350,184 V104'], [WH, 'M400,470 V222 L350,184'], [FL, 'M520,470 V164 L570,126 V104'], [HU, 'M620,470 V164 L570,126']];
const lanes = LANE.map(([col, d]) => mk(hl, 'path', { d, stroke: col, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
const ldots = LANE.map(([col]) => mk(hl, 'circle', { r: 12, fill: col, stroke: '#fff', 'stroke-width': 3 }));
const topL = [txt(hl, 350, 88, 'PLANTAE', { 'text-anchor': 'middle', 'font-size': 16, fill: MG, 'font-weight': 600, 'letter-spacing': 1.5 }), txt(hl, 570, 88, 'ANIMALIA', { 'text-anchor': 'middle', 'font-size': 16, fill: FL, 'font-weight': 600, 'letter-spacing': 1.5 })];
const keyH = JOBS.map(([, n, , , col], i) => { const d = document.createElement('div'); d.className = 'keyt'; d.style.cssText = `left:${[36, 200, 340, 520][i]}px;top:520px`; d.innerHTML = `<b style="background:${col}"></b>${['MANGO', 'WHEAT', 'HOUSEFLY', 'HUMAN'][i]}`; $('#hlad').appendChild(d); return d; });
const tLane = [0, 1, 2, 3].map(i => wt('H4', 'walk') + i * 0.18);

/* ---------- R: the seven ranks ---------- */
const PR = [['Kingdom', 'BIGGEST', 'kingdom'], ['Phylum / Division', '', 'phylum'], ['Class', '', 'class'], ['Order', '', 'order'], ['Family', '', 'family'], ['Genus', '', 'genus'], ['Species', 'ONE KIND', 'Species']];
$('#prs').innerHTML = PR.map(([n, e], i) => { const w = 712 - i * 76; return `<div class="pr" id="pr${i}" style="left:${392 - w / 2}px;width:${w}px;top:${84 + i * 66}px">${n}${e ? `<em>${e}</em>` : ''}</div>`; }).join('');
const tPr = PR.map(p => wt('R2', p[2]));
const rr = $('#rrS'), RC = [392, 276], RW = k => 150 + k * 88, RH = k => 70 + k * 56;
const RING = [6, 5, 4, 3, 2, 1, 0].map(k => { const w = RW(k), h = RH(k);
  return [k, mk(rr, 'rect', { class: 'pp', x: RC[0] - w / 2, y: RC[1] - h / 2, width: w, height: h, rx: 18, fill: k % 2 ? '#FFFFFF' : '#F3F7EA', stroke: '#9FCFAE', 'stroke-width': 2.5 })]; }).sort((a, b) => a[0] - b[0]).map(r => r[1]);
const RLB = [0, 1, 2, 3, 4, 5, 6].map(k => txt(rr, RC[0], RC[1] - RH(k) / 2 + 20, RK[k] === 'DIVISION' ? 'PHYLUM' : RK[k], { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2, fill: '#3B7A52', 'font-weight': 600 }));
const RDOT = [0, 1, 2, 3, 4, 5, 6].map(k => { const n = 2 * k + 1, y = RC[1] + RH(k) / 2 - 14; return Array.from({ length: n }, (_, j) => mk(rr, 'circle', { cx: RC[0] + (j - (n - 1) / 2) * 20, cy: k === 0 ? RC[1] + 6 : y, r: k === 0 ? 9 : 5.5, fill: k === 0 ? GRN : '#8CC48F' })); });
const tRing = wt('R3', 'Each'), tMore = wt('R4', 'more'), tFew = wt('R4', 'fewer');

/* ---------- Z: mango climbs the rank ladder ---------- */
$('#zch').innerHTML = RK.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 6 ? `<span class="za">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = ['Z3', 'Z4', 'Z5', 'Z6', 'Z7', 'Z8', 'Z9'].map(id => T0(id) + 0.1);
const LVI = [['THE PLANT', 'Mango', '', 'Leaf: a net of veins. Seed: inside a fruit.', 'Each seed has two cotyledons (seed leaves).'],
  ['STEP 1 OF 7', 'Species', '<i>Mangifera indica</i>', 'One kind of organism, with the same basic features.', 'The smallest group: one kind.'],
  ['STEP 2 OF 7', 'Genus', '<i>Mangifera</i>', 'A group of closely related species.', 'The mango and its close relatives.'],
  ['STEP 3 OF 7', 'Family', 'Anacardiaceae', 'A group of related genera.', 'Also here: the cashew tree.'],
  ['STEP 4 OF 7', 'Order', 'Sapindales', 'A group of related families.', 'Plant orders end in -ales.'],
  ['STEP 5 OF 7', 'Class', 'Dicotyledonae', 'Plants with two cotyledons in each seed.', 'Leaves with a net of veins.'],
  ['STEP 6 OF 7', 'Division', 'Angiospermae', 'Flowering plants, with seeds inside fruits.', 'For plants: division, not phylum.'],
  ['STEP 7 OF 7', 'Kingdom', 'Plantae', 'Every plant on Earth.', 'The biggest group on this ladder.']];
$('#lvs').innerHTML = LVI.map(([r, n, v, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="lv">${v}</div><div class="ld" style="top:${v ? 214 : 160}px">${d}</div><div class="lh" style="top:${v ? 340 : 286}px">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Mango and cashew: cousins!' });
const zs = $('#zS');
// the plant (organism): twig, leaves with a net of veins, fruit, and a cut fruit with two cotyledons
const gP = mk(zs, 'g', {});
mk(gP, 'path', { d: 'M70,470 Q230,392 370,318 Q470,268 560,262', stroke: '#6B5B3A', 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' });
leaf(gP, 560, 262, -34, 250, 50, 'net'); leaf(gP, 556, 264, -98, 190, 42, 'net'); leaf(gP, 420, 296, -150, 230, 48, 'net'); leaf(gP, 250, 392, -128, 150, 34, 'net');
mk(gP, 'path', { d: 'M470,300 Q478,330 474,360', stroke: '#6B5B3A', 'stroke-width': 5, fill: 'none' });
mk(gP, 'path', { d: 'M474,358 C530,352 552,408 530,450 C508,494 440,500 418,462 C398,428 420,362 474,358 Z', fill: '#F2C96B', stroke: BR, 'stroke-width': 4 });
mk(gP, 'path', { d: 'M444,392 q10,-14 26,-14', stroke: '#FFF1C4', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
// cut fruit: flesh, seed coat, two cotyledons
mk(gP, 'ellipse', { cx: 860, cy: 410, rx: 128, ry: 82, fill: '#F2C96B', stroke: BR, 'stroke-width': 4 });
mk(gP, 'ellipse', { cx: 860, cy: 410, rx: 84, ry: 50, fill: '#F6ECCF', stroke: '#7A6A2E', 'stroke-width': 3 });
mk(gP, 'path', { d: 'M858,368 C820,366 790,384 790,410 C790,436 820,452 856,450 Z', fill: '#E3CF8A', stroke: '#7A6A2E', 'stroke-width': 2.5 });
mk(gP, 'path', { d: 'M862,368 C900,366 930,384 930,410 C930,436 900,452 864,450 Z', fill: '#E3CF8A', stroke: '#7A6A2E', 'stroke-width': 2.5 });
txt(gP, 860, 516, 'CUT FRUIT', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 });
const LBP = LBmake(gP, [[668, 196, 760, 96, 'Net of veins', 'start'], [516, 432, 610, 494, 'Fruit', 'start'], [800, 386, 700, 300, 'Seed inside the fruit', 'start'], [860, 430, 990, 478, 'Two cotyledons', 'end', [940, 478]]]);
const tLP = [wt('Z2', 'net'), wt('Z2', 'fruit'), wt('Z2', 'seed', 1), wt('Z2', 'cotyledons')];
// rings: one group inside the next (species innermost)
const ZC = [528, 300], ZW = k => 300 + k * 112, ZH = k => 120 + k * 52;
const gR = mk(zs, 'g', {});
const ZRING = [6, 5, 4, 3, 2, 1, 0].map(k => [k, mk(gR, 'rect', { rx: 22, fill: k % 2 ? '#FFFFFF' : '#F3F7EA', stroke: '#9FCFAE', 'stroke-width': 2.5 })]).sort((a, b) => a[0] - b[0]).map(r => r[1]);
const ZV = ['Mangifera indica', 'Mangifera', 'Anacardiaceae', 'Sapindales', 'Dicotyledonae', 'Angiospermae', 'Plantae'];
const ZLB = [0, 1, 2, 3, 4, 5, 6].map(k => { const e = mk(gR, 'text', { x: ZC[0], y: ZC[1] - ZH(k) / 2 + 21, 'text-anchor': 'middle', class: 'rk', fill: '#3B7A52' });
  const a = mk(e, 'tspan', {}); a.textContent = RK[k] + ' · '; const b = mk(e, 'tspan', { 'font-family': 'Poppins', 'font-size': 17, 'font-style': k < 2 ? 'italic' : 'normal', 'letter-spacing': 0, fill: C.ink }); b.textContent = k ? ZV[k] : 'one kind'; return e; });
const ZDOT = [1, 2, 3, 4, 5, 6].map(k => { const n = 2 * k + 1, y = ZC[1] + ZH(k) / 2 - 14; return Array.from({ length: n }, (_, j) => mk(gR, 'circle', { cx: ZC[0] + (j - (n - 1) / 2) * 24, cy: y, r: 6, fill: '#8CC48F' })); });
const gMw = mk(gR, 'g', { transform: 'translate(0 10)' }), gM = mk(gMw, 'g', { class: 'pp' }); // mini mango at the centre
mk(gM, 'path', { d: 'M418,296 C446,292 456,320 444,338 C432,356 400,354 392,336 C384,318 396,298 418,296 Z', fill: '#F2C96B', stroke: BR, 'stroke-width': 3 });
mk(gM, 'path', { d: 'M418,296 Q424,282 438,276', stroke: '#6B5B3A', 'stroke-width': 4, fill: 'none' }); leaf(gM, 438, 276, -20, 46, 11, 'net');
const zName = txt(gR, 466, 344, 'Mangifera indica', { 'font-family': 'Poppins', 'font-size': 24, 'font-style': 'italic', 'font-weight': 600, fill: C.ink });

/* ---------- V: the housefly, labelled ---------- */
const fS = $('#fS'), FX = 500; // body axis x
const gF = mk(fS, 'g', {});
const mir = x => 2 * FX - x;
const LEGS = [[[450, 246], [380, 214], [338, 160]], [[442, 278], [360, 292], [306, 324]], [[450, 306], [384, 352], [352, 420]]];
const legP = []; [1, -1].forEach(sg => LEGS.forEach(L => { const P = L.map(([x, y]) => [sg > 0 ? x : mir(x), y]);
  legP.push({ P, sg, p: mk(gF, 'path', { stroke: BR, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), j: mk(gF, 'circle', { cx: P[1][0], cy: P[1][1], r: 7, fill: '#fff', stroke: BR, 'stroke-width': 3 }) }); }));
const wingD = sg => { const X = x => sg > 0 ? x : mir(x); return `M${X(452)},${300} C${X(360)},${296} ${X(270)},${372} ${X(272)},${436} C${X(274)},${478} ${X(346)},${476} ${X(388)},${444} C${X(430)},${410} ${X(456)},${352} ${X(452)},${300} Z`; };
const wings = [1, -1].map(sg => { const g = mk(gF, 'g', {}); mk(g, 'path', { d: wingD(sg), fill: '#D6E9F5', 'fill-opacity': 0.8, stroke: BR, 'stroke-width': 3 });
  const X = x => sg > 0 ? x : mir(x); mk(g, 'path', { d: `M${X(450)},306 L${X(296)},432 M${X(450)},306 L${X(350)},458 M${X(380)},360 L${X(330)},400`, stroke: '#5A7FA0', 'stroke-width': 2, fill: 'none' }); return g; });
const abd = mk(gF, 'ellipse', { cx: FX, cy: 404, rx: 56, ry: 80, fill: '#A89A78', stroke: BR, 'stroke-width': 4 });
[372, 404, 436].forEach(y => mk(gF, 'path', { d: `M${FX - 50},${y} Q${FX},${y + 14} ${FX + 50},${y}`, stroke: '#6E6248', 'stroke-width': 3, fill: 'none' }));
const thx = mk(gF, 'ellipse', { cx: FX, cy: 276, rx: 64, ry: 58, fill: '#8A857A', stroke: BR, 'stroke-width': 4 });
[-24, -8, 8, 24].forEach(d => mk(gF, 'line', { x1: FX + d, y1: 236, x2: FX + d, y2: 316, stroke: '#55514A', 'stroke-width': 4, 'stroke-linecap': 'round' }));
const hd = mk(gF, 'circle', { cx: FX, cy: 172, r: 50, fill: '#9C9486', stroke: BR, 'stroke-width': 4 });
const eyes = [-1, 1].map(sg => mk(gF, 'ellipse', { cx: FX + sg * 34, cy: 162, rx: 24, ry: 34, fill: '#A0392F', stroke: BR, 'stroke-width': 3 }));
[-1, 1].forEach(sg => { mk(gF, 'path', { d: `M${FX + sg * 30},${150} q6,-10 0,-20`, stroke: '#E9B3A9', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); mk(gF, 'path', { d: `M${FX + sg * 8},${126} L${FX + sg * 16},${106}`, stroke: BR, 'stroke-width': 4, 'stroke-linecap': 'round' }); });
const LBF = LBmake(gF, [[534, 150, 650, 110, 'Compound eye', 'start'], [476, 132, 330, 92, 'Head', 'end'], [548, 254, 680, 236, 'Thorax', 'start'], [544, 432, 680, 476, 'Abdomen', 'start'], [mir(360), 292, 760, 354, 'Jointed leg', 'start'], [300, 430, 260, 516, 'One pair of wings', 'end']]);
const tLF = [tV1 + 1.0, wt('V2', 'head'), wt('V2', 'thorax'), wt('V2', 'abdomen'), wt('V3', 'jointed'), wt('V4', 'wings')];
const AD = [['KINGDOM', 'Animalia', '', wt('V5', 'kingdom')], ['PHYLUM', 'Arthropoda', 'JOINTED LEGS', wt('V3', 'Arthropoda')], ['CLASS', 'Insecta', '3 PARTS · 6 LEGS', wt('V2', 'Insecta')], ['ORDER', 'Diptera', '2 WINGS', wt('V4', 'Diptera')],
  ['FAMILY', 'Muscidae', '', wt('V5', 'Muscidae')], ['GENUS', '<i>Musca</i>', '', wt('V5', 'Musca')], ['SPECIES', '<i>Musca domestica</i>', '', wt('V5', 'domestica')]];
$('#ads').innerHTML = AD.map(([k, v, r], i) => `<div class="ad" id="ad${i}" style="top:${80 + i * 68}px"><div class="ak">${k}</div><div class="av2" id="adv${i}">${v}</div>${r ? `<div class="ar" id="adr${i}">${r}</div>` : ''}</div>`).join('');
const avF = PUC.avatar($('#sF2'), { x: 160 + 640, y: 270 + 496, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Only two wings!' });

/* ---------- C: mango vs wheat ---------- */
{ const a = $('#cmS');
  mk(a, 'ellipse', { cx: 180, cy: 196, rx: 112, ry: 84, fill: '#F6ECCF', stroke: BR, 'stroke-width': 4 });
  mk(a, 'path', { d: 'M176,122 C128,120 92,150 92,196 C92,242 128,272 174,270 Z', fill: '#E3CF8A', stroke: '#7A6A2E', 'stroke-width': 3 });
  mk(a, 'path', { d: 'M184,122 C232,120 268,150 268,196 C268,242 232,272 186,270 Z', fill: '#E3CF8A', stroke: '#7A6A2E', 'stroke-width': 3 });
  mk(a, 'ellipse', { cx: 180, cy: 132, rx: 9, ry: 15, fill: '#C9B36A', stroke: '#7A6A2E', 'stroke-width': 2 });
  leaf(a, 410, 262, -26, 340, 62, 'net');
  txt(a, 180, 306, 'SEED', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 }); }
{ const a = $('#cwS');
  mk(a, 'ellipse', { cx: 180, cy: 192, rx: 62, ry: 104, fill: '#E7C77A', stroke: BR, 'stroke-width': 4 });
  mk(a, 'path', { d: 'M184,96 Q194,190 184,290', stroke: '#B08A3E', 'stroke-width': 3, fill: 'none' });
  mk(a, 'path', { d: 'M150,250 C138,262 140,286 156,292 C170,296 176,280 172,264 C168,252 160,246 150,250 Z', fill: WH, stroke: '#7A5A1E', 'stroke-width': 2.5 });
  leaf(a, 400, 286, -24, 400, 26, 'par');
  txt(a, 180, 318, 'GRAIN', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5 }); }
const LBC = [LBmake($('#cmS'), [[120, 246, 74, 352, 'Two cotyledons', 'start', [74, 300]], [560, 196, 560, 84, 'Net of veins', 'start']]),
  LBmake($('#cwS'), [[150, 276, 74, 352, 'One cotyledon', 'start', [74, 300]], [600, 197, 548, 84, 'Parallel veins', 'start']])];
const tLC = [[wt('C2', 'Two'), wt('C2', 'net')], [wt('C3', 'One'), wt('C3', 'parallel')]];
const CSV = [['Plantae', 'Angiospermae', 'Dicotyledonae', 'Sapindales', 'Anacardiaceae', '<i>Mangifera</i>', '<i>M. indica</i>'], ['Plantae', 'Angiospermae', 'Monocotyledonae', 'Poales', 'Poaceae', '<i>Triticum</i>', '<i>T. aestivum</i>']];
const CX = i => 120 + i * 210;
$('#csts').innerHTML = RK.slice().reverse().map((n, i) => `<div class="csh" style="left:${CX(i)}px;width:200px">${n}</div>`).join('') +
  `<div class="csh" id="csm" style="left:24px;top:58px;text-align:left;color:${MG}">MANGO</div><div class="csh" id="csw" style="left:24px;top:106px;text-align:left;color:#9A7420">WHEAT</div>` +
  CSV.map((r, j) => r.map((v, i) => `<div class="cs" id="cs${j}${i}" style="left:${CX(i)}px;width:200px;top:${48 + j * 48}px">${v}</div>`).join('')).join('') +
  [0, 1].map(i => `<div class="cs" id="cS${i}" style="left:${CX(i)}px;width:200px;top:48px;height:86px;background:var(--ac);color:#fff">${CSV[0][i]}</div>`).join('');
const tCs = [T0('C2') + 0.3, T0('C3') + 0.3], tShare = wt('C4', 'share');
const th1 = PUC.think($('#th1'), { q: 'Mango and wheat. At which rank do they first split apart?', opts: ['Division', 'Class'], right: 1, why: 'Class. They share kingdom and division, but mango is a dicot and wheat a monocot.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:500 52px Poppins;color:var(--mute)">and the fewer features they share</span>';

/* ---------- W: worked example, NCERT Table 1.1 ---------- */
const TC = [['Common name', 170], ['Biological name', 250], ['Genus', 160], ['Family', 210], ['Order', 160], ['Class', 240], ['Phylum / Division', 230]];
const TX = []; { let x = 36; TC.forEach(([, w]) => { TX.push(x); x += w + 14; }); }
const TR = [['Man', '<i>Homo sapiens</i>', '<i>Homo</i>', 'Hominidae', 'Primata', 'Mammalia', 'Chordata'], ['Housefly', '<i>Musca domestica</i>', '<i>Musca</i>', 'Muscidae', 'Diptera', 'Insecta', 'Arthropoda'],
  ['Mango', '<i>Mangifera indica</i>', '<i>Mangifera</i>', 'Anacardiaceae', 'Sapindales', 'Dicotyledonae', 'Angiospermae'], ['Wheat', '<i>Triticum aestivum</i>', '<i>Triticum</i>', 'Poaceae', 'Poales', 'Monocotyledonae', 'Angiospermae']];
const RCOL = [HU, FL, MG, WH];
$('#tbs').innerHTML = TC.map(([h], i) => `<div class="th" style="left:${TX[i] + 14}px">${h.toUpperCase()}</div>`).join('') +
  `<div class="hiBox" id="tHi" style="left:24px;top:102px;width:1552px;height:68px"></div>` +
  TR.map((r, j) => r.map((v, i) => `<div class="tb" id="tb${j}${i}" style="left:${TX[i]}px;width:${TC[i][1]}px;top:${108 + j * 66}px;${j ? 'color:var(--ink2);font-weight:500' : ''}">${i === 0 ? `<b style="width:12px;height:12px;border-radius:50%;background:${RCOL[j]};display:inline-block;margin-right:10px"></b>` : ''}${v}</div>`).join('')).join('');
const tTb = [wt('W1', 'human'), wt('W6', 'sapiens'), wt('W6', 'Homo'), wt('W5', 'Hominidae'), wt('W5', 'Primata'), wt('W4', 'Mammalia'), wt('W3', 'Chordata')];
const RS = [['KINGDOM', 'Animalia', 'We are animals.', wt('W2', 'Animalia')], ['PHYLUM', 'Chordata', 'A notochord along the back, in the embryo.', wt('W3', 'Chordata')],
  ['CLASS', 'Mammalia', 'Hair, and milk for the babies.', wt('W4', 'Mammalia')], ['ORDER', 'Primata', 'With monkeys and gorillas.', wt('W5', 'Primata')]];
$('#rsns').innerHTML = RS.map(([k, v, w], i) => `<div class="rsn" id="rs${i}" style="left:${36 + i * 379}px"><div class="rk2">${k}</div><div class="rv">${v}</div><div class="rw">${w}</div></div>`).join('');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Diptera is the family of the housefly', right: 'Diptera is its order. Its family is Muscidae.' });
const tS = $('#tS');
txt(tS, 40, 50, 'FAMILY NAME ENDINGS', { 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600 });
const END = [['Musc', 'idae', 'ANIMAL'], ['Homin', 'idae', 'ANIMAL'], ['Po', 'aceae', 'PLANT'], ['Anacardi', 'aceae', 'PLANT']].map(([a, b, k], i) => {
  const e = mk(tS, 'text', { x: 40, y: 100 + i * 46, 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 600, fill: C.ink }); const s1 = mk(e, 'tspan', {}); s1.textContent = a; const s2 = mk(e, 'tspan', { fill: C.ac }); s2.textContent = b;
  const kk = txt(tS, 470, 96 + i * 46, k, { 'text-anchor': 'end', 'font-size': 15, 'letter-spacing': 1.5 }); return [e, s2, kk]; });
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Which organism is in family Muscidae? Match each rank to its name' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which pairs are correctly matched?<div class="sl"><b>I</b>Housefly - Order Diptera</div><div class="sl"><b>II</b>Wheat - Family Poales</div><div class="sl"><b>III</b>Man - Class Mammalia</div><div class="sl"><b>IV</b>Mango - Division Angiospermae</div>',
  opts: ['I and II only', 'II and III only', 'I, III and IV only', 'I, II, III and IV'], right: 2, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Poales: order of wheat'], ['Its family: Poaceae'], ['<b style="color:var(--ok)">I, III, IV</b>: Table 1.1']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'Poales'), wt('A2', 'family'), wt('A3', 'One')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · the seven ranks', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Ranks</b>, big to small: kingdom › phylum (division) › class › order › family › genus › species', '<b>Going up</b>: more kinds, fewer shared features',
    `<b style="color:${MG}">Mango</b>: <i>Mangifera</i> · Anacardiaceae · Sapindales · Dicotyledonae · Angiospermae`, `<b style="color:#9A7420">Wheat</b>: <i>Triticum</i> · Poaceae · Poales · Monocotyledonae · Angiospermae`,
    `<b style="color:#3F7FA6">Housefly</b>: <i>Musca</i> · Muscidae · Diptera · Insecta · Arthropoda`, `<b style="color:${HU}">Man</b>: <i>Homo</i> · Hominidae · Primata · Mammalia · Chordata`] });
const YQ = ['Which class holds wheat, and which holds the mango?', 'Why is the housefly in the order Diptera?', 'Which is the only rank a human and a housefly share?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 08', topic: 'One fish, many names: Binomial Nomenclature', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tWing = wt('V4', 'wings');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tWing - 0.3, 1.06, 960, 560], [T0('V5') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tR1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('R1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'seven') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'long') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'asked') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hlad'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) {
      lanes.forEach((l, i) => { M.draw(l, t, tLane[i], 2.4, M.o3 || M.io); const L = l.getTotalLength(), u = M.io((t - tLane[i]) / 2.4), p = l.getPointAtLength(L * u);
        attr(ldots[i], 'cx', p.x.toFixed(1)); attr(ldots[i], 'cy', p.y.toFixed(1)); M.hide(ldots[i], t < tLane[i] - 0.2 || (i % 2 === 1 && u >= 1)); });
      topL.forEach((e, i) => M.vis(e, t, tLane[i * 2] + 2.3, 1e9, { dy: 8 }));
      keyH.forEach((e, i) => M.vis(e, t, tH4 + 0.2 + i * 0.1, 1e9, { dy: 8 }));
    }
  }

  /* R: the seven ranks */
  const rOn = t >= tR1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('Z1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PR.forEach((_, i) => { const el = $('#pr' + i); M.vis(el, t, tPr[i] - 0.12, 1e9, { dy: 14 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tPr[i]) / 0.25) * (1 - M.io((t - tPr[i] - 0.9) / 0.3)) + (i === 0 || i === 6 ? 0 : 0)); });
    M.vis($('#rr'), t, T0('R3') - 0.15, out, { dx: 60, dy: 0, ...o });
    RING.forEach((r, k) => { M.vis(r, t, tRing + k * 0.22, 1e9, { dy: 0, sc: 0.85, fade: 0.15 }); M.vis(RLB[k], t, tRing + k * 0.22 + 0.15, 1e9, { dy: 6 }); });
    RDOT.forEach((ds, k) => ds.forEach((d, j) => M.vis(d, t, (k ? tMore : tRing) + k * 0.12 + j * 0.02, 1e9, { ...POP, sc: 0.2 })));
    M.vis($('#aw0'), t, tMore - 0.1, 1e9, POP); M.vis($('#aw1'), t, tFew - 0.1, 1e9, POP);
  }

  /* Z: mango climbs */
  const zOn = t >= tZ1 - 0.1 && t < tV1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('V1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tZ.forEach((tt, k) => { if (t >= tt) cur = k; });
    RK.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), cur < 0 ? 'THE ORGANISM' : `RANK ${cur + 1} OF 7`); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP);
    // plant: drawn, labelled, then shrinks into the centre of the rings
    const sh = M.io((t - tZ[0] + 0.1) / 0.8);
    if (sh < 1) { M.hide(gP, false); const s = 1 - 0.85 * sh, cx = 470 + (ZC[0] - 470) * 0, cy = 420;
      attr(gP, 'transform', sh <= 0 ? '' : `translate(${(420 + (cx - 420) * sh).toFixed(1)} ${(320).toFixed(1)}) scale(${s.toFixed(4)}) translate(-420 -320)`);
      gP.style.opacity = M.clamp((t - tZ1 - 0.2) / 0.4) * (1 - sh);
      LBP.forEach((l, i) => LBrun(l, t, tLP[i])); } else M.hide(gP, true);
    M.hide(gR, t < tZ[0] - 0.05);
    if (t >= tZ[0] - 0.05) {
      ZRING.forEach((r, k) => { const g = M.io((t - tZ[k]) / 0.7); ZLB[k].style.opacity = M.clamp((t - tZ[k] - 0.5) / 0.3).toFixed(3); if (g <= 0) { M.hide(r, true); return; } M.hide(r, false);
        const w = k ? ZW(k - 1) + (ZW(k) - ZW(k - 1)) * g : ZW(0) * (0.4 + 0.6 * g), h = k ? ZH(k - 1) + (ZH(k) - ZH(k - 1)) * g : ZH(0) * (0.4 + 0.6 * g);
        attr(r, 'x', (ZC[0] - w / 2).toFixed(1)); attr(r, 'y', (ZC[1] - h / 2).toFixed(1)); attr(r, 'width', w.toFixed(1)); attr(r, 'height', h.toFixed(1));
        r.setAttribute('stroke', k === cur ? C.ac : '#9FCFAE'); r.setAttribute('stroke-width', k === cur ? 4 : 2.5);
        ZLB[k].style.opacity = M.clamp((t - tZ[k] - 0.5) / 0.3).toFixed(3); });
      ZDOT.forEach((ds, k) => ds.forEach((d, j) => M.vis(d, t, tZ[k + 1] + 0.6 + j * 0.03, 1e9, { ...POP, sc: 0.2 })));
      M.vis(gM, t, tZ[0] + 0.3, 1e9, { ...POP, sc: 0.4 }); M.vis(zName, t, tZ[0] + 0.5, 1e9, { dy: 8 });
    }
    LVI.forEach((_, i) => { const tin = i ? tZ[i - 1] + 0.25 : tZ1 + 0.4, tout = i < 7 ? tZ[i] + 0.05 : 1e9;
      M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'cashew') + 0.4, T0('Z7') - 0.2);
  }

  /* V: the housefly */
  const vOn = t >= tV1 - 0.1 && t < tC1 + 0.1; M.hide($('#sF2'), !vOn);
  if (vOn) {
    const out = OUT('C1');
    M.vis($('#fd'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#fa'), t, tV1 + 0.25, out, { dx: 60, dy: 0, ...o });
    gF.style.opacity = M.clamp((t - tV1 - 0.2) / 0.5).toFixed(3);
    // parts flash green as they are named
    [[hd, wt('V2', 'head'), '#9C9486'], [thx, wt('V2', 'thorax'), '#8A857A'], [abd, wt('V2', 'abdomen'), '#A89A78']].forEach(([e, tt, base]) => e.setAttribute('fill', mix(base, '#7FC28F', pulse(t, tt, 1.6))));
    const tJ = wt('V3', 'jointed'), legOn = pulse(t, wt('V2', 'six'), 1.2), flex = M.clamp((t - tJ) / 0.4);
    legP.forEach((L, i) => { const [a, j, b] = L.P, ang = flex * 0.16 * Math.sin((t - tJ) * 5 + i), dx = b[0] - j[0], dy = b[1] - j[1];
      const bx = j[0] + dx * Math.cos(ang) - dy * Math.sin(ang), by = j[1] + dx * Math.sin(ang) + dy * Math.cos(ang);
      attr(L.p, 'd', `M${a[0]},${a[1]} L${j[0]},${j[1]} L${bx.toFixed(1)},${by.toFixed(1)}`); L.p.setAttribute('stroke', mix(BR, C.ac, legOn));
      attr(L.j, 'r', (7 * (1 + 0.4 * pulse(t, tJ + 0.1, 1.0))).toFixed(2)); L.j.setAttribute('stroke', mix(BR, C.ac, flex)); });
    const fl = M.clamp((t - tWing) / 0.3);
    wings.forEach((g, i) => { const sg = i ? -1 : 1, a = fl * 7 * Math.sin((t - tWing) * 14), px = sg > 0 ? 452 : mir(452);
      attr(g, 'transform', Math.abs(a) < 0.01 ? '' : `rotate(${(sg * a).toFixed(2)} ${px} 300)`); });
    LBF.forEach((l, i) => LBrun(l, t, tLF[i]));
    AD.forEach((a, i) => { const el = $('#ad' + i); M.vis(el, t, tV1 + 0.4 + i * 0.06, 1e9, { dy: 10 }); PUC.write($('#adv' + i), t, a[3] - 0.05, 0.6);
      const r = $('#adr' + i); if (r) M.vis(r, t, a[3] + 0.5, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - a[3]) / 0.25)); });
    avF(t, wt('V4', 'pair') + 0.2, out);
  }

  /* C: mango vs wheat, then think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#cm'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cw'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cmP'), t, wt('C2', 'Dicotyledonae') - 0.1, 1e9, POP); M.vis($('#cwP'), t, wt('C3', 'Monocotyledonae') - 0.1, 1e9, POP);
    LBC.forEach((L, j) => L.forEach((l, i) => LBrun(l, t, tLC[j][i])));
    M.vis($('#cst'), t, T0('C2') + 0.1, out, { dy: 36, ...o });
    ['csm', 'csw'].forEach((id, j) => M.vis($('#' + id), t, tCs[j] - 0.1, 1e9, { dy: 6 }));
    CSV.forEach((r, j) => r.forEach((_, i) => { const el = $(`#cs${j}${i}`); M.vis(el, t, tCs[j] + i * 0.12, i < 2 ? tShare + 0.1 : 1e9, { dy: 8, outDur: 0.2, ody: 0 }); }));
    [0, 1].forEach(i => M.vis($('#cS' + i), t, tShare + 0.1 + i * 0.25, 1e9, POP));
    M.vis($('#split'), t, wt('C4', 'kingdom') + 0.3, 1e9, POP); M.hide($('#split'), t < wt('C4', 'kingdom') + 0.3); $('#split').style.left = (CX(2) - 64) + 'px';
    M.vis($('#th1'), t, tC5 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tC5, tOpts: wt('C5', 'which') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'They') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'higher') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'fewer') - 0.1, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    M.vis($('#tHi'), t, tTb[0] - 0.1, 1e9, { dy: 0, fade: 0.25 });
    TR.forEach((r, j) => r.forEach((_, i) => { const el = $(`#tb${j}${i}`);
      if (j) { M.vis(el, t, tW1 + 0.6 + j * 0.15 + i * 0.03, 1e9, { dy: 8 }); el.style.opacity = (Math.min(+(el.style.opacity || 1), 0.75)).toFixed(3); }
      else { M.vis(el, t, tTb[i] - 0.1, 1e9, { ...POP, sc: 0.85 }); } }));
    RS.forEach((r, i) => { const el = $('#rs' + i); M.vis(el, t, r[3] - 0.15, 1e9, { dy: 20 }); el.style.background = mix(C.soft, C.ac2, M.io((t - r[3]) / 0.25) * (1 - M.io((t - (RS[i + 1] ? RS[i + 1][3] : T1('W6'))) / 0.3))); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Diptera') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'order') - 0.1 });
    const tEnd = wt('X3', 'Animal');
    M.vis(tS.firstChild, t, tEnd - 0.3, 1e9, { dy: 6 });
    END.forEach(([e, s2, kk], i) => { const ti = i < 2 ? tEnd + i * 0.3 : wt('X3', 'Plant') + (i - 2) * 0.3; M.vis(e, t, ti, 1e9, { dx: -12, dy: 0 }); M.vis(kk, t, ti + 0.1, 1e9, { dy: 4 }); });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'Expect') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
