// PUC Biology Ep 26: Angiosperms - Monocots and Dicots (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible canon) + batch canon for chromosome sets: n teal, 2n indigo, 3n gold
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, CHL = '#3E9B5F', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B';
const HN = '#0E8F8F', DN = '#4A5FC1', TN = '#C9962B';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
// labelled-diagram system: dot on the part, leader line, text pops after the line draws
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0, tout = 1e9) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, tout, { ...POP, sc: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - tout) / 0.25))).toFixed(3); if (t > tout + 0.25) M.hide(l.ln, true); };

Object.assign(M.IC, {
  grass: ['M6 22c0-6 1-12 3-18', 'M12 22c0-7 0-13 0-19', 'M18 22c0-6-1-12-3-18', 'M3 22h18'],
  maize: ['M12 3c3 0 4.5 4 4.5 9s-1.5 9-4.5 9-4.5-4-4.5-9S9 3 12 3Z', 'M8 9h8', 'M7.6 13h8.8', 'M8.2 17h7.6', 'M12 3v18', 'M7 21c-2-2-3-6-2-10', 'M17 21c2-2 3-6 2-10'],
  pea: ['M3 14c3-6 13-8 18-6-3 6-13 9-18 6Z', ci(8, 12, 1.6), ci(12, 11, 1.6), ci(16, 10, 1.6)],
  flower: [ci(12, 12, 2), 'M12 10c-2-2-2-6 0-7 2 1 2 5 0 7Z', 'M12 14c2 2 2 6 0 7-2-1-2-5 0-7Z', 'M10 12c-2 2-6 2-7 0 1-2 5-2 7 0Z', 'M14 12c2-2 6-2 7 0-1 2-5 2-7 0Z'],
  wheat: ['M12 22V8', 'M12 8c-2-1-2-4 0-6 2 2 2 5 0 6Z', 'M12 13c-3 0-4-3-4-5 2 0 4 2 4 5Z', 'M12 13c3 0 4-3 4-5-2 0-4 2-4 5Z', 'M12 18c-3 0-4-3-4-5 2 0 4 2 4 5Z', 'M12 18c3 0 4-3 4-5-2 0-4 2-4 5Z'],
  seed: ['M12 3c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z', 'M12 7c-2 2-2 8 0 10'],
  root: ['M12 2v8', 'M12 10c0 4-3 6-5 11', 'M12 10c0 4 3 6 5 11', 'M12 10v12', 'M4 6h16'],
  stem: [ci(12, 12, 9), ci(12, 6, 1.3), ci(17, 10, 1.3), ci(15, 16, 1.3), ci(9, 16, 1.3), ci(7, 10, 1.3)],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tC1 = T0('C1'), tV1 = T0('V1'), tV5 = T0('V5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['grass', 'A blade of grass', 'STRAIGHT LINES', 'grass'], ['leaf', 'A mango leaf', 'A NET OF VEINS', 'mango'], ['maize', 'A maize grain', 'ONE SEED', 'maize']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: two leaves ---------- */
const hl = $('#hlS');
const gB = mk(hl, 'path', { d: 'M196,440 C186,330 196,190 236,92 C262,190 260,330 252,440 Z', fill: '#B9DDA9', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const gV = [0, 1, 2, 3, 4].map(k => { const x0 = 204 + k * 10.5; return mk(hl, 'path', { d: `M${x0},436 C${x0 - 4},330 ${x0 + 6 + k * 1.5},200 ${232 + k * 1.2},104`, stroke: k === 2 ? '#4E7A34' : '#6E9C55', 'stroke-width': k === 2 ? 3 : 2.2, fill: 'none', 'stroke-linecap': 'round' }); });
mk(hl, 'path', { d: 'M520,470 L520,436', stroke: '#4E7A34', 'stroke-width': 8, 'stroke-linecap': 'round' });
const mB = mk(hl, 'path', { d: 'M520,436 C420,380 410,190 520,84 C630,190 620,380 520,436 Z', fill: LEAF, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const mV = [mk(hl, 'path', { d: 'M520,432 L520,96', stroke: '#EEF6EA', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' })];
for (let k = 0; k < 6; k++) { const y = 380 - k * 48; [-1, 1].forEach(s => mV.push(mk(hl, 'path', { d: `M520,${y} Q${520 + s * 40},${y - 24} ${520 + s * (78 - Math.abs(k - 2) * 6)},${y - 50}`, stroke: '#D8ECD2', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }))); }
{ const r = M.rng(7); for (let k = 0; k < 22; k++) { const y = 140 + r() * 260, s = r() < 0.5 ? -1 : 1, x = 520 + s * (16 + r() * 50); mV.push(mk(hl, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} l${(s * (10 + r() * 10)).toFixed(1)},${(-10 - r() * 10).toFixed(1)}`, stroke: '#D8ECD2', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' })); } }
const tLines = wt('H2', 'straight'), tNet = wt('H2', 'net');
const spl = $('#splS'), sL = [mk(spl, 'path', { d: 'M392,148 L392,196 L200,196 L200,252', stroke: C.dim, 'stroke-width': 3, fill: 'none' }), mk(spl, 'path', { d: 'M392,196 L584,196 L584,252', stroke: C.dim, 'stroke-width': 3, fill: 'none' })];
const FV = [['seed', 'Seed', 'seed'], ['root', 'Root', 'root'], ['leaf', 'Leaf', 'leaf'], ['stem', 'Stem', 'stem'], ['flower', 'Flower', 'flower']];
$('#fvs').innerHTML = FV.map(([ic, n], i) => `<div class="fv" id="fv${i}" style="left:${36 + i * 146}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><span>${n}</span></div>`).join('');
const tFv = FV.map(f => wt('H5', f[2]));

/* ---------- D: the word + range ---------- */
const dw = $('#dwS');
const pod = mk(dw, 'path', { d: 'M60,404 C120,326 440,316 560,376 C480,456 140,474 60,404 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(dw, 'path', { d: 'M86,402 C170,352 430,344 532,378', stroke: '#6E9C55', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
const seeds = [170, 250, 330, 410].map((x, i) => mk(dw, 'circle', { cx: x, cy: 400 - i * 3, r: 30, fill: '#C8DD8E', stroke: BR, 'stroke-width': 3 }));
const dLab = [lab(dw, 540, 372, 600, 330, 'Fruit wall'), lab(dw, 434, 400, 600, 440, 'Seed')];
const dr = $('#drS');
mk(dr, 'line', { x1: 36, y1: 450, x2: 300, y2: 450, stroke: WAT, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wolf = mk(dr, 'circle', { cx: 120, cy: 446, r: 5, fill: CHL }), wolfR = mk(dr, 'circle', { cx: 120, cy: 446, r: 20, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const tree = mk(dr, 'g', {});
mk(tree, 'line', { x1: 220, y1: 520, x2: 420, y2: 520, stroke: C.dim, 'stroke-width': 3 });
mk(tree, 'path', { d: 'M310,520 L314,330 L326,330 L330,520 Z', fill: '#B08A5A', stroke: BR, 'stroke-width': 3 });
mk(tree, 'path', { d: 'M320,186 C380,190 392,250 380,290 C400,320 370,360 330,350 C300,370 250,346 262,310 C236,280 256,220 290,214 C292,196 304,186 320,186 Z', fill: LEAF, stroke: BR, 'stroke-width': 3.5 });
const hBar = mk(dr, 'path', { d: 'M430,520 L430,186 M420,196 L430,186 L440,196 M420,510 L430,520 L440,510', stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
const tWolf = wt('D4', 'Wolffia'), tEuc = wt('D4', 'Eucalyptus');

/* ---------- Z: zoom ladder FLOWER -> OVARY -> OVULE -> EMBRYO SAC ---------- */
const ZN = ['FLOWER', 'OVARY', 'OVULE', 'EMBRYO SAC'], ZS = ['x1', 'x5', 'x40', 'x200'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Flower', 'Stamens make the pollen. The pistil holds the ovules.', 'Stamen: anther + filament. Pistil: stigma + style + ovary.'],
  ['RUNG 2 OF 4', 'Ovary', 'The swollen base of the pistil.', 'It holds the ovules. Later, it becomes the fruit.'],
  ['RUNG 3 OF 4', 'Ovule', 'A small body inside the ovary.', 'It holds the embryo sac. Later, it becomes the seed.'],
  ['RUNG 4 OF 4', 'Embryo sac', 'The female gametophyte: seven cells.', '1 egg · 2 synergids · 3 antipodals · 1 central cell']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Seven cells in one sac!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[528, 352, 62], [616, 362, 58], [528, 242, 76], null];
const LB = [];
// level 0: flower
{ const g = ZG[0], PET = '#F2B8C6';
  mk(g, 'path', { d: 'M528,520 L528,392', stroke: '#4E7A34', 'stroke-width': 12, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M500,388 C430,330 360,250 352,150 C430,170 500,260 520,372 Z', fill: PET, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M556,388 C626,330 696,250 704,150 C626,170 556,260 536,372 Z', fill: PET, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M470,404 C480,384 510,380 528,392 C546,380 576,384 586,404 C560,414 496,414 470,404 Z', fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M504,372 C480,320 450,260 424,214', stroke: '#9FBF7A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M552,372 C576,320 606,260 632,214', stroke: '#9FBF7A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  [[420, 196, -28], [636, 196, 28]].forEach(([x, y, a]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 16, ry: 28, fill: '#E8C46A', stroke: BR, 'stroke-width': 3, transform: `rotate(${a} ${x} ${y})` }));
  [[392, 150], [404, 134], [380, 132], [662, 150], [676, 134]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 6, fill: '#CDEDEA', stroke: HN, 'stroke-width': 2 }));
  mk(g, 'rect', { x: 518, y: 160, width: 20, height: 160, rx: 6, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 528, cy: 154, rx: 26, ry: 13, fill: '#9FD09A', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 528, cy: 352, rx: 50, ry: 44, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 4 });
  LB[0] = [lab(g, 416, 194, 220, 150, 'Anther', 'end'), lab(g, 456, 280, 220, 300, 'Filament', 'end'), lab(g, 392, 140, 220, 70, 'Pollen grains', 'end'),
    lab(g, 548, 152, 780, 100, 'Stigma'), lab(g, 538, 250, 780, 230, 'Style'), lab(g, 576, 360, 780, 380, 'Ovary')];
}
// level 1: ovary (cut open)
{ const g = ZG[1];
  mk(g, 'rect', { x: 512, y: 0, width: 32, height: 110, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 528, cy: 290, rx: 230, ry: 190, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: 528, cy: 290, rx: 202, ry: 162, fill: '#EEF6EA', stroke: '#2F7A4A', 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M528,140 L528,440', stroke: '#7FB069', 'stroke-width': 14, 'stroke-linecap': 'round' });
  [[440, 210, -1], [616, 210, 1], [440, 362, -1], [616, 362, 1]].forEach(([x, y, s]) => { mk(g, 'path', { d: `M528,${y} L${x - s * 40},${y}`, stroke: '#7FB069', 'stroke-width': 6 });
    mk(g, 'ellipse', { cx: x, cy: y, rx: 50, ry: 40, fill: '#F3E7C9', stroke: BR, 'stroke-width': 3 }); mk(g, 'ellipse', { cx: x, cy: y, rx: 16, ry: 22, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 2 }); });
  LB[1] = [lab(g, 544, 60, 780, 60, 'Style'), lab(g, 740, 260, 800, 180, 'Ovary wall'), lab(g, 660, 380, 800, 440, 'Ovule')];
}
// level 2: ovule
{ const g = ZG[2];
  mk(g, 'rect', { x: 516, y: 0, width: 24, height: 64, fill: '#E6D7B0', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 528, cy: 260, rx: 172, ry: 204, fill: '#F3E7C9', stroke: BR, 'stroke-width': 4 });
  mk(g, 'ellipse', { cx: 528, cy: 254, rx: 146, ry: 180, fill: '#F7EED8', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 528, cy: 248, rx: 120, ry: 156, fill: '#FBF5E6', stroke: '#B8A57A', 'stroke-width': 2.5 });
  mk(g, 'rect', { x: 516, y: 400, width: 24, height: 70, fill: '#FFFFFF' });
  mk(g, 'ellipse', { cx: 528, cy: 242, rx: 60, ry: 104, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 3 });
  [[528, 168], [510, 300], [546, 300], [528, 312]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 7, fill: NUC }));
  LB[2] = [lab(g, 688, 240, 790, 170, 'Integuments'), lab(g, 630, 330, 790, 330, 'Nucellus'), lab(g, 528, 448, 330, 480, 'Micropyle', 'end'), lab(g, 474, 210, 330, 140, 'Embryo sac', 'end')];
}
// level 3: embryo sac (7 cells, 8 nuclei)
const ES = {};
{ const g = ZG[3];
  mk(g, 'ellipse', { cx: 528, cy: 262, rx: 150, ry: 236, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 4 });
  [[476, 86], [580, 86], [528, 132]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 36, fill: '#E3EBD9', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x, cy: y, r: 9, fill: NUC }); });
  [[500, 262], [556, 262]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 22, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }));
  [[470, 420], [586, 420]].forEach(([x, y]) => { mk(g, 'ellipse', { cx: x, cy: y, rx: 34, ry: 50, fill: '#E3EBD9', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x, cy: y - 10, r: 8, fill: NUC }); });
  mk(g, 'ellipse', { cx: 528, cy: 380, rx: 40, ry: 50, fill: '#CDEDEA', stroke: HN, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 528, cy: 392, r: 11, fill: HN });
  LB[3] = [lab(g, 562, 380, 760, 400, 'Egg cell'), lab(g, 456, 432, 300, 470, 'Synergids', 'end'), lab(g, 610, 86, 760, 112, 'Antipodals'), lab(g, 440, 190, 300, 170, 'Central cell', 'end'), lab(g, 576, 262, 760, 262, 'Polar nuclei')];
}
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [
  [wt('Z2', 'anther'), wt('Z2', 'stamens'), wt('Z2', 'pollen'), wt('Z2', 'pistil'), wt('Z2', 'pistil') + 0.45, wt('Z2', 'pistil') + 0.9],
  [wt('Z3', 'pistil'), wt('Z3', 'ovary'), wt('Z3', 'ovules')],
  [wt('Z4', 'ovule') + 0.1, wt('Z4', 'ovule') + 0.6, wt('Z4', 'inside') , wt('Z4', 'embryo')],
  [wt('Z5', 'egg'), wt('Z5', 'synergids'), wt('Z5', 'antipodal'), wt('Z5', 'central'), wt('Z5', 'polar')]];

/* ---------- P: double fertilisation ---------- */
const PN = ['POLLEN TUBE', 'TWO MALE GAMETES', 'SYNGAMY', 'TRIPLE FUSION', 'SEED + FRUIT'];
$('#pch').innerHTML = PN.map((n, i) => `<span class="zc" id="pc${i}">${i + 1} ${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(id => T0(id));
const PI = [['ONLY IN FLOWERING PLANTS', 'Double fertilisation', 'Two male gametes. Two fusions inside one embryo sac.'],
  ['STAGE 1 OF 5', 'Pollen tube', 'Pollen lands on the stigma and grows a tube down to the ovule.'],
  ['STAGE 2 OF 5', 'Two male gametes', 'The tube carries two male gametes into the embryo sac.'],
  ['STAGE 3 OF 5', 'Syngamy', 'One male gamete fuses with the egg. Result: the zygote.'],
  ['STAGE 4 OF 5', 'Triple fusion', 'The other fuses with the two polar nuclei. Result: the PEN.'],
  ['STAGE 5 OF 5', 'Seed and fruit', 'Zygote to embryo, PEN to endosperm, ovule to seed, ovary to fruit.']];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 14 ? 46 : 54}px">${n}</div><div class="ld" style="font-size:25px;top:150px">${d}</div></div>`).join('');
const hc = s => `\\textcolor{${HN}}{${s}}`;
$('#pqx0').innerHTML = K(`${hc('n')} + ${hc('n')} \\rightarrow \\textcolor{${DN}}{2n}`) + ' <span style="font:600 17px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.06em">&nbsp;ZYGOTE</span>';
$('#pqx1').innerHTML = K(`${hc('n')} + ${hc('n')} + ${hc('n')} \\rightarrow \\textcolor{${TN}}{3n}`) + ' <span style="font:600 17px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.06em">&nbsp;PEN</span>';
const ps = $('#pS'), PE = {};
{ // left: pistil with one ovule
  mk(ps, 'rect', { x: 236, y: 84, width: 28, height: 220, rx: 8, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 });
  mk(ps, 'ellipse', { cx: 250, cy: 72, rx: 42, ry: 17, fill: '#9FD09A', stroke: BR, 'stroke-width': 3 });
  PE.ovary = mk(ps, 'ellipse', { cx: 250, cy: 382, rx: 130, ry: 100, fill: '#BFE0B4', stroke: '#1F5E37', 'stroke-width': 4 });
  PE.ovule = mk(ps, 'ellipse', { cx: 250, cy: 380, rx: 46, ry: 58, fill: '#F3E7C9', stroke: BR, 'stroke-width': 3 });
  mk(ps, 'ellipse', { cx: 250, cy: 376, rx: 18, ry: 32, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 2 });
  PE.tube = mk(ps, 'path', { d: 'M250,60 C252,140 248,220 250,300 C252,330 322,352 316,410 C312,452 268,466 250,440', stroke: HN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  PE.flow = mk(ps, 'path', { d: 'M250,60 C252,140 248,220 250,300 C252,330 322,352 316,410 C312,452 268,466 250,440', stroke: '#CDEDEA', 'stroke-width': 2, fill: 'none', 'stroke-dasharray': '10 12' });
  PE.pollen = mk(ps, 'circle', { cx: 250, cy: 50, r: 14, fill: '#CDEDEA', stroke: HN, 'stroke-width': 3 });
  PE.box = mk(ps, 'rect', { x: 192, y: 312, width: 116, height: 140, rx: 10, fill: 'none', stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  PE.zl = [mk(ps, 'line', { x1: 308, y1: 312, x2: 500, y2: 26, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(ps, 'line', { x1: 308, y1: 452, x2: 500, y2: 500, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
  PE.lab = [lab(ps, 290, 70, 330, 60, 'Stigma'), lab(ps, 264, 190, 330, 190, 'Style'), lab(ps, 372, 350, 400, 300, 'Ovary'), lab(ps, 204, 380, 100, 470, 'Ovule', 'end')];
  PE.fruitT = txt(ps, 412, 309, 'Fruit', { class: 'zl', 'font-family': 'Poppins' }); PE.seedT = txt(ps, 88, 479, 'Seed', { class: 'zl', 'font-family': 'Poppins', 'text-anchor': 'end' });
  // right: inset of the embryo sac
  PE.inset = mk(ps, 'rect', { x: 500, y: 26, width: 528, height: 474, rx: 16, fill: '#FBF8F0', stroke: '#CBD0DA', 'stroke-width': 2 });
  PE.sac = mk(ps, 'ellipse', { cx: 765, cy: 250, rx: 120, ry: 190, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 3 });
  PE.anti = [[725, 105], [805, 105], [765, 150]].map(([x, y]) => { const gg = mk(ps, 'g', {}); mk(gg, 'circle', { cx: x, cy: y, r: 28, fill: '#E3EBD9', stroke: BR, 'stroke-width': 2 }); mk(gg, 'circle', { cx: x, cy: y, r: 7, fill: NUC }); return gg; });
  PE.syn = [[712, 395], [818, 395]].map(([x, y]) => { const gg = mk(ps, 'g', {}); mk(gg, 'ellipse', { cx: x, cy: y, rx: 26, ry: 40, fill: '#E3EBD9', stroke: BR, 'stroke-width': 2 }); mk(gg, 'circle', { cx: x, cy: y - 8, r: 7, fill: NUC }); return gg; });
  PE.pol = [[740, 262], [790, 262]].map(([x, y]) => mk(ps, 'circle', { cx: x, cy: y, r: 18, fill: '#CDEDEA', stroke: HN, 'stroke-width': 3 }));
  PE.pen = mk(ps, 'circle', { cx: 765, cy: 262, r: 24, fill: '#F2DFAE', stroke: TN, 'stroke-width': 3.5 });
  PE.egg = mk(ps, 'ellipse', { cx: 765, cy: 352, rx: 30, ry: 38, fill: '#CDEDEA', stroke: HN, 'stroke-width': 3 }); PE.eggN = mk(ps, 'circle', { cx: 765, cy: 360, r: 9, fill: HN });
  PE.emb = [[752, 330], [778, 330], [752, 356], [778, 356], [765, 382]].map(([x, y]) => mk(ps, 'circle', { cx: x, cy: y, r: 13, fill: '#D5DBF4', stroke: DN, 'stroke-width': 2.5 }));
  PE.itube = mk(ps, 'path', { d: 'M540,500 C600,470 690,486 732,470 C752,462 762,452 765,440', stroke: HN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  PE.g = [0, 1].map(() => mk(ps, 'circle', { r: 9, fill: HN, stroke: '#FFFFFF', 'stroke-width': 2 }));
  PE.ring = mk(ps, 'circle', { r: 30, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
  PE.eggT = txt(ps, 870, 362, 'Egg (n)', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px' }); PE.zygT = txt(ps, 870, 362, 'Zygote (2n)', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px;fill:' + DN });
  PE.polT = txt(ps, 870, 270, 'Polar nuclei', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px' }); PE.penT = txt(ps, 870, 270, 'PEN (3n)', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px;fill:#8A6516' });
  PE.embT = txt(ps, 870, 362, 'Embryo', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px;fill:' + DN }); PE.endT = txt(ps, 870, 200, 'Endosperm', { class: 'zl', 'font-family': 'Poppins', style: 'font-size:22px;fill:#8A6516' });
}
const tubeL = PE.itube.getTotalLength();
const avP = null;

/* ---------- C: cotyledons ---------- */
const cs = $('#clS'), CL = {};
{ CL.maize = mk(cs, 'g', {});
  mk(CL.maize, 'path', { d: 'M210,110 C300,120 330,250 300,400 C285,456 140,460 120,400 C90,280 120,110 210,110 Z', fill: '#F2D27A', stroke: BR, 'stroke-width': 3.5 });
  mk(CL.maize, 'ellipse', { cx: 172, cy: 356, rx: 34, ry: 70, fill: '#B7D88A', stroke: BR, 'stroke-width': 2.5 });
  mk(CL.maize, 'ellipse', { cx: 150, cy: 372, rx: 10, ry: 40, fill: '#7FB069', stroke: BR, 'stroke-width': 2 });
  CL.pea = mk(cs, 'g', {});
  mk(CL.pea, 'ellipse', { cx: 610, cy: 290, rx: 152, ry: 134, fill: 'none', stroke: '#B08A5A', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
  mk(CL.pea, 'path', { d: 'M604,170 C520,166 470,230 474,300 C478,370 540,410 604,404 Z', fill: '#C8DD8E', stroke: BR, 'stroke-width': 3.5 });
  mk(CL.pea, 'path', { d: 'M616,170 C700,166 750,230 746,300 C742,370 680,410 616,404 Z', fill: '#C8DD8E', stroke: BR, 'stroke-width': 3.5 });
  mk(CL.pea, 'ellipse', { cx: 610, cy: 196, rx: 11, ry: 32, fill: '#7FB069', stroke: BR, 'stroke-width': 2 });
  CL.lab = [lab(cs, 172, 340, 172, 492, 'Cotyledon (1)', 'middle'), lab(cs, 236, 140, 300, 84, 'Endosperm'), lab(cs, 540, 330, 610, 492, 'Cotyledons (2)', 'middle'), lab(cs, 680, 330, 610, 492, '', 'middle'), lab(cs, 606, 200, 560, 128, 'Embryo axis', 'end')];
  CL.cap = [txt(cs, 210, 90, 'MAIZE GRAIN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 }), txt(cs, 610, 140, 'PEA SEED, OPENED', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 })];
}
const avC = PUC.avatar($('#sC'), { x: 976 + 36, y: 270 + 450, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Maize: one. Pea: two.' });

/* ---------- V: side by side ---------- */
const VR = [['root', 'Roots', 'Fibrous roots, all alike', 'One main tap root', 'V1', 'monocot', 'dicot'], ['leaf', 'Leaves', 'Parallel veins', 'A net of veins (reticulate)', 'V2', 'Monocot', 'Dicot'],
  ['stem', 'Stem', 'Vascular bundles scattered', 'Vascular bundles in a ring', 'V3', 'monocot', 'dicot'], ['flower', 'Flower', 'Parts usually in threes', 'Parts usually in fours or fives', 'V4', 'Monocot', 'Dicot']];
$('#vrs').innerHTML = VR.map(([ic, k, a, b], i) => `<div class="vr" id="vr${i}" style="top:${92 + i * 120}px"><div class="vk">${M.icon(ic, 30, C.ac, 2.2)}${k}</div>
  <svg id="va${i}" width="130" height="100" style="left:230px"></svg><div class="vt" id="vt${i}a" style="left:380px">${a}</div>
  <svg id="vb${i}" width="130" height="100" style="left:902px"></svg><div class="vt" id="vt${i}b" style="left:1052px">${b}</div></div>`).join('');
{ const S = id => $('#' + id);
  // roots
  const a0 = S('va0'); mk(a0, 'line', { x1: 40, y1: 8, x2: 90, y2: 8, stroke: '#7FB069', 'stroke-width': 4, 'stroke-linecap': 'round' });
  for (let k = 0; k < 7; k++) mk(a0, 'path', { d: `M65,10 C${50 + k * 5},40 ${20 + k * 15},60 ${16 + k * 16},${88 + (k % 2) * 6}`, stroke: '#9A7A4E', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
  const b0 = S('vb0'); mk(b0, 'line', { x1: 40, y1: 8, x2: 90, y2: 8, stroke: '#7FB069', 'stroke-width': 4, 'stroke-linecap': 'round' });
  mk(b0, 'path', { d: 'M65,10 L65,96', stroke: '#9A7A4E', 'stroke-width': 7, 'stroke-linecap': 'round' });
  [[30, -1], [50, 1], [66, -1], [80, 1]].forEach(([y, s]) => mk(b0, 'path', { d: `M65,${y} q${s * 14},6 ${s * 30},18`, stroke: '#9A7A4E', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }));
  // leaves
  const a1 = S('va1'); mk(a1, 'path', { d: 'M4,50 C40,32 100,34 126,50 C100,66 40,68 4,50 Z', fill: '#B9DDA9', stroke: BR, 'stroke-width': 2.5 });
  [-8, -3, 2, 7].forEach(d => mk(a1, 'path', { d: `M12,${50 + d * 0.6} C50,${50 + d} 90,${50 + d} 120,${50 + d * 0.3}`, stroke: '#4E7A34', 'stroke-width': 1.6, fill: 'none' }));
  const b1 = S('vb1'); mk(b1, 'path', { d: 'M8,50 C40,8 100,10 126,50 C100,90 40,92 8,50 Z', fill: LEAF, stroke: BR, 'stroke-width': 2.5 }); mk(b1, 'path', { d: 'M12,50 L122,50', stroke: '#EEF6EA', 'stroke-width': 3 });
  [30, 52, 74, 96].forEach(x => { mk(b1, 'path', { d: `M${x},50 l14,-22`, stroke: '#EEF6EA', 'stroke-width': 2 }); mk(b1, 'path', { d: `M${x},50 l14,22`, stroke: '#EEF6EA', 'stroke-width': 2 }); });
  [[44, 36, 56, 40], [66, 36, 78, 42], [88, 38, 98, 44], [44, 64, 56, 60], [66, 64, 78, 58], [88, 62, 98, 56]].forEach(([x1, y1, x2, y2]) => mk(b1, 'line', { x1, y1, x2, y2, stroke: '#EEF6EA', 'stroke-width': 1.6 }));
  // stems
  const a2 = S('va2'); mk(a2, 'circle', { cx: 65, cy: 50, r: 44, fill: '#E6F2DF', stroke: BR, 'stroke-width': 2.5 });
  const r = M.rng(5); for (let k = 0; k < 14; k++) { const ang = r() * 6.28, rr = 8 + r() * 30; mk(a2, 'circle', { cx: 65 + rr * Math.cos(ang), cy: 50 + rr * Math.sin(ang), r: 4.5, fill: '#4E7A34' }); }
  const b2 = S('vb2'); mk(b2, 'circle', { cx: 65, cy: 50, r: 44, fill: '#E6F2DF', stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 9; k++) { const ang = k * 6.283 / 9; mk(b2, 'ellipse', { cx: 65 + 28 * Math.cos(ang), cy: 50 + 28 * Math.sin(ang), rx: 5, ry: 7, fill: '#4E7A34', transform: `rotate(${(ang * 57.3 + 90).toFixed(0)} ${(65 + 28 * Math.cos(ang)).toFixed(1)} ${(50 + 28 * Math.sin(ang)).toFixed(1)})` }); }
  // flowers
  const pet = (svg, n) => { for (let k = 0; k < n; k++) { const a = -90 + k * 360 / n; mk(svg, 'ellipse', { cx: 65, cy: 26, rx: 13, ry: 24, fill: '#F2B8C6', stroke: BR, 'stroke-width': 2, transform: `rotate(${a + 90} 65 50)` }); } mk(svg, 'circle', { cx: 65, cy: 50, r: 9, fill: '#E8C46A', stroke: BR, 'stroke-width': 2 }); };
  pet(S('va3'), 3); pet(S('vb3'), 5);
}
const tVa = VR.map(v => wt(v[4], v[5])), tVb = VR.map(v => wt(v[4], v[6]));
const th1 = PUC.think($('#th1'), { q: 'A plant has a tap root, and leaves with a net of veins. Monocot or dicot?', opts: ['Monocot', 'Dicot'], right: 1, why: 'Dicot. A tap root and a net of veins are both dicot marks.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">monocot · <b style="color:var(--ac)">1</b> &nbsp;&nbsp;|&nbsp;&nbsp; dicot · <b style="color:var(--ac)">2</b></span>`;

/* ---------- W: sort board ---------- */
const WT = [['wheat', 'Wheat', 'Fibrous roots', 0, 0, wt('W2', 'Wheat')], ['leaf', 'Mango', 'A net of veins', 1, 0, wt('W3', 'Mango')], ['pea', 'Pea', 'Two cotyledons in each seed', 1, 1, wt('W4', 'pea')],
  ['maize', 'Maize', 'One cotyledon in the grain', 0, 1, wt('W5', 'maize')], ['flower', 'Mustard', 'Four petals', 1, 2, wt('W6', 'Mustard')], ['grass', 'Grass', 'Parallel veins', 0, 2, wt('W7', 'grass')]];
$('#tls').innerHTML = WT.map(([ic, n, c, b, s], i) => `<div class="tl" id="tl${i}" style="left:${56 + b * 780}px;top:${146 + s * 130}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><div class="tn">${n}</div><div class="tc">${c}</div></div>`).join('');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A dicot is a plant with two seeds', right: 'Di counts cotyledons: two seed leaves in one seed' });
const tS = $('#tS'), TP = {};
{ TP.pea = mk(tS, 'g', {}); mk(TP.pea, 'path', { d: 'M134,70 C90,70 66,110 68,146 C70,182 100,206 134,204 Z', fill: '#C8DD8E', stroke: BR, 'stroke-width': 3 }); mk(TP.pea, 'path', { d: 'M146,70 C190,70 214,110 212,146 C210,182 180,206 146,204 Z', fill: '#C8DD8E', stroke: BR, 'stroke-width': 3 });
  TP.peaT = txt(tS, 140, 244, 'PEA · 1 SEED · 2', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 });
  TP.mz = mk(tS, 'g', {}); mk(TP.mz, 'path', { d: 'M380,64 C430,70 446,140 430,186 C420,214 346,216 336,186 C320,130 336,64 380,64 Z', fill: '#F2D27A', stroke: BR, 'stroke-width': 3 }); mk(TP.mz, 'ellipse', { cx: 358, cy: 168, rx: 18, ry: 36, fill: '#B7D88A', stroke: BR, 'stroke-width': 2.5 });
  TP.mzT = txt(tS, 384, 244, 'MAIZE · 1 GRAIN · 1', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Feature matching: which features belong to a monocot, or to a dicot' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Which of these features belong to a monocot?<div class="sl"><b>I</b>Parallel venation in the leaves</div><div class="sl"><b>II</b>A tap root system</div><div class="sl"><b>III</b>Scattered vascular bundles in the stem</div><div class="sl"><b>IV</b>Flower parts in multiples of three</div>',
  opts: ['I, III and IV only', 'I and II only', 'II and III only', 'I, II, III and IV'], right: 0, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Tap root: a dicot mark'], ['Monocots: fibrous roots'], ['<b style="color:var(--ok)">I, III, IV</b>: monocot marks']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'tap'), wt('A2', 'Monocots'), wt('A3', 'Parallel')];
const fc = PUC.fcard($('#sF'), { x: 220, y: 262, w: 1480, h: 470, title: 'Recap · angiosperms, monocots and dicots', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Angiosperms</b>: seeds closed inside a fruit (the flowering plants)', '<b>Embryo sac</b>: 1 egg, 2 synergids, 3 antipodals, 1 central cell (2 polar nuclei)',
    `<b>Double fertilisation</b>: syngamy ${K(`${hc('n')}+${hc('n')}\\rightarrow\\textcolor{${DN}}{2n}`)} zygote · triple fusion ${K(`\\textcolor{${TN}}{3n}`)} PEN`,
    '<b>Monocot</b>: 1 cotyledon · fibrous roots · parallel veins · scattered bundles · parts in 3s', '<b>Dicot</b>: 2 cotyledons · tap root · net of veins · ring of bundles · parts in 4s or 5s'] });
const YQ = ['Name the seven cells of the embryo sac.', 'What is triple fusion, and what does it make?', 'Give two ways to tell a monocot from a dicot without opening a seed.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 27', topic: 'A moss lives two lives that take turns: Alternation of Generations', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tP4 = tPs[2];
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP4 - 0.2, 1.06, 1040, 560], [tPs[4] + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; ['wb0', 'wop', 'wb1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 22; });
  [['wm0', 'wb0'], ['wm1', 'wb1']].forEach(([m, b]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft + bb.offsetWidth / 2 - e.offsetWidth / 2) + 'px'; });
  const g = $('#ghT'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  [['hlt0', 224], ['hlt1', 520]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = '448px'; });
  [['sb0', 392], ['sb1', 200], ['sb2', 584]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    M.vis(gB, t, tMorph + 0.6, 1e9, { dy: 16 }); M.vis(mB, t, tMorph + 0.75, 1e9, { dy: 16 });
    gV.forEach((v, i) => M.draw(v, t, tLines - 0.1 + i * 0.08, 0.6)); mV.forEach((v, i) => M.draw(v, t, tNet - 0.2 + (i % 12) * 0.05, 0.45));
    M.vis($('#hlt0'), t, tLines + 0.2, 1e9, POP); M.vis($('#hlt1'), t, tNet + 0.2, 1e9, POP);
    M.vis($('#hlP'), t, tH4 + 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, wt('H3', 'doctor') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { M.vis($('#sb0'), t, tH4 + 0.05, 1e9, POP); sL.forEach(l => M.draw(l, t, wt('H4', 'two') - 0.4, 0.5));
      M.vis($('#sb1'), t, wt('H4', 'two'), 1e9, POP); M.vis($('#sb2'), t, wt('H4', 'two') + 0.15, 1e9, POP);
      FV.forEach((_, i) => M.vis($('#fv' + i), t, tFv[i] - 0.1, 1e9, { dy: 20 })); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dw'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 8 });
    M.vis($('#wb0'), t, wt('D2', 'Angio') - 0.1, 1e9, POP); M.vis($('#wm0'), t, wt('D2', 'vessel') - 0.1, 1e9, POP);
    M.vis($('#wop'), t, wt('D2', 'Sperm') - 0.25, 1e9, POP); M.vis($('#wb1'), t, wt('D2', 'Sperm') - 0.1, 1e9, POP); M.vis($('#wm1'), t, wt('D2', 'seed') - 0.1, 1e9, POP);
    const tPod = wt('D2', 'angiosperms'); M.vis(pod, t, tPod, 1e9, { dy: 16 }); seeds.forEach((s, i) => M.vis(s, t, wt('D2', 'seeds') + i * 0.1, 1e9, { ...POP, sc: 0.3 }));
    labRun(dLab[0], t, wt('D2', 'fruit') - 0.1); labRun(dLab[1], t, wt('D2', 'seeds') + 0.3);
    M.vis($('#dwP'), t, wt('D2', 'fruit') + 0.3, 1e9, POP);
    M.vis($('#dr'), t, T0('D3') - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis($('#drP'), t, wt('D3', 'sex') - 0.1, 1e9, POP); M.vis($('#drL'), t, T0('D4'), 1e9, { dy: 8 });
    M.vis(wolf, t, tWolf, 1e9, { ...POP, sc: 0.2 }); M.vis(wolfR, t, tWolf + 0.1, 1e9, { ...POP, sc: 0.3 }); wolfR.style.strokeDashoffset = (-(t * 12) % 13).toFixed(1);
    M.vis($('#dr0'), t, tWolf + 0.2, 1e9, { dy: 8 }); M.vis($('#dr0b'), t, tWolf + 0.4, 1e9, { dy: 8 });
    M.vis(tree, t, tEuc - 0.1, 1e9, { dy: 30 }); M.draw(hBar, t, tEuc + 0.3, 0.8);
    M.vis($('#dr1'), t, wt('D4', 'hundred') - 0.1, 1e9, { dy: 12 }); M.vis($('#dr1b'), t, wt('D4', 'hundred') + 0.2, 1e9, { dy: 8 });
  }

  /* Z: zoom ladder */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
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
      LB[k].forEach((l, i) => labRun(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, T1('Z5') - 0.6, out);
  }

  /* P: double fertilisation */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pch'), t, tP1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let st = -1; tPs.forEach((tt, i) => { if (t >= tt - 0.05) st = i; });
    PN.forEach((_, i) => { const el = $('#pc' + i), on = i === st ? 1 : 0, done = i < st ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    PI.forEach((_, i) => M.vis($('#pi' + i), t, i ? tPs[i - 1] + 0.1 : tP1 + 0.4, i < 5 ? tPs[i] : 1e9, { dy: 20, outDur: 0.25, ody: -12 }));
    M.vis($('#peL'), t, tPs[2] + 0.4, 1e9, { dy: 8 });
    M.vis($('#pq0'), t, wt('P4', 'zygote') - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write($('#pqx0'), t, wt('P4', 'zygote'), 0.6);
    M.vis($('#pq1'), t, wt('P5', 'triple') - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write($('#pqx1'), t, wt('P5', 'triple'), 0.6);
    // stage 1: pollen lands, tube grows
    const t1 = tPs[0];
    M.vis(PE.pollen, t, wt('P2', 'pollen') - 0.2, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 });
    attr(PE.pollen, 'r', (14 * (1 + (st === 0 ? 0.12 * Math.sin(t * 6) : 0))).toFixed(2));
    M.draw(PE.tube, t, wt('P2', 'grows') - 0.1, 1.6, M.o3);
    const flowOn = t > wt('P2', 'grows') + 1.6; M.hide(PE.flow, !flowOn); PE.flow.style.strokeDashoffset = (-(t * 30) % 22).toFixed(1);
    PE.lab.forEach((l, i) => labRun(l, t, tP1 + 0.6 + i * 0.25, i >= 2 ? tPs[4] + 0.6 : 1e9));
    const fr = M.io((t - tPs[4] - 0.4) / 0.6); attr(PE.ovary, 'fill', mix('#BFE0B4', '#E59A7A', fr)); attr(PE.ovule, 'fill', mix('#F3E7C9', '#B08A5A', fr));
    PE.fruitT.style.opacity = M.clamp((t - tPs[4] - 0.9) / 0.3); PE.seedT.style.opacity = M.clamp((t - tPs[4] - 0.9) / 0.3);
    M.vis(PE.box, t, tP1 + 0.9, 1e9, { dy: 0, fade: 0.3 }); PE.zl.forEach(l => M.draw(l, t, tP1 + 1.0, 0.5));
    M.vis(PE.inset, t, tP1 + 1.1, 1e9, { dy: 0, sc: 0.9, fade: 0.2 });
    [PE.sac, ...PE.anti, ...PE.syn, ...PE.pol, PE.egg, PE.eggN].forEach((e, i) => M.vis(e, t, tP1 + 1.3 + i * 0.03, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }));
    // stage 2: tube enters, two gametes travel to the micropyle
    M.draw(PE.itube, t, tPs[1] - 0.1, 0.8);
    const gp = M.io((t - wt('P3', 'two') + 0.1) / 1.2);
    const p0 = PE.itube.getPointAtLength(tubeL * M.clamp(gp)), p1 = PE.itube.getPointAtLength(tubeL * M.clamp(gp - 0.12));
    let g1 = [p0.x, p0.y - 6], g2 = [p1.x - 4, p1.y + 4];
    // stage 3: syngamy (g1 -> egg); stage 4: triple fusion (g2 -> polar nuclei)
    const u3 = M.io((t - wt('P4', 'fuses') + 0.1) / 0.8), u4 = M.io((t - wt('P5', 'fuses') + 0.1) / 1.0);
    g1 = [g1[0] + (765 - g1[0]) * u3, g1[1] + (352 - g1[1]) * u3]; g2 = [g2[0] + (765 - g2[0]) * u4, g2[1] + (262 - g2[1]) * u4];
    PE.g.forEach((g, i) => { const p = i ? g2 : g1, done = i ? u4 >= 1 : u3 >= 1; attr(g, 'cx', p[0].toFixed(1)); attr(g, 'cy', p[1].toFixed(1)); M.hide(g, gp <= 0 || done); });
    const z = M.io((t - wt('P4', 'fuses') - 0.7) / 0.3); attr(PE.egg, 'fill', mix('#CDEDEA', '#D5DBF4', z)); attr(PE.egg, 'stroke', mix(HN, DN, z)); attr(PE.eggN, 'fill', mix(HN, DN, z));
    const pz = M.io((t - wt('P5', 'fuses') - 0.8) / 0.4);
    PE.pol.forEach((p, i) => { attr(p, 'cx', ((i ? 790 : 740) + (765 - (i ? 790 : 740)) * pz).toFixed(1)); p.style.opacity = (1 - pz).toFixed(3); });
    M.vis(PE.pen, t, wt('P5', 'fuses') + 0.9, 1e9, { ...POP, sc: 0.3 });
    // stage 5: embryo + endosperm; synergids and antipodals fade
    const s5 = M.io((t - tPs[4] - 0.2) / 0.8);
    attr(PE.sac, 'fill', mix('#EEF6EA', '#F6EBC8', s5)); [...PE.anti, ...PE.syn].forEach(e => { if (t > tPs[4]) e.style.opacity = (1 - s5).toFixed(3); });
    PE.emb.forEach((e, i) => { M.vis(e, t, wt('P6', 'embryo') + i * 0.12, 1e9, { ...POP, sc: 0.2 }); attr(e, 'r', (13 * (1 + 0.06 * Math.sin(t * 5 + i))).toFixed(2)); });
    if (t > wt('P6', 'embryo')) { PE.egg.style.opacity = '0'; PE.eggN.style.opacity = '0'; } else { PE.egg.style.opacity = ''; PE.eggN.style.opacity = ''; }
    // dynamic labels
    PE.eggT.style.opacity = M.clamp((t - tPs[2] + 0.2) / 0.3) * (1 - z); PE.zygT.style.opacity = z * (1 - M.clamp((t - wt('P6', 'embryo')) / 0.3));
    PE.polT.style.opacity = M.clamp((t - tPs[3] + 0.2) / 0.3) * (1 - pz); PE.penT.style.opacity = pz * (1 - M.clamp((t - wt('P6', 'endosperm')) / 0.3));
    PE.embT.style.opacity = M.clamp((t - wt('P6', 'embryo')) / 0.3); PE.endT.style.opacity = M.clamp((t - wt('P6', 'endosperm')) / 0.3);
    // looping focus ring on the live fusion site
    const site = st === 2 ? [765, 352] : st === 3 ? [765, 262] : st === 1 ? [765, 440] : null;
    M.hide(PE.ring, !site || t < tPs[1] + 0.6); if (site) { attr(PE.ring, 'cx', site[0]); attr(PE.ring, 'cy', site[1]); attr(PE.ring, 'r', (34 + 4 * Math.sin(t * 4)).toFixed(1)); PE.ring.style.strokeDashoffset = (-(t * 16) % 14).toFixed(1); }
  }

  /* C: cotyledons */
  const cOn = t >= tC1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(CL.maize, t, tC1 + 0.4, 1e9, { dy: 20 }); M.vis(CL.pea, t, tC1 + 0.6, 1e9, { dy: 20 }); CL.cap.forEach((c, i) => M.vis(c, t, tC1 + 0.5 + i * 0.2, 1e9, { dy: 6 }));
    const tCot = wt('C2', 'cotyledons');
    labRun(CL.lab[0], t, wt('C3', 'one') - 0.1); labRun(CL.lab[1], t, wt('C3', 'maize') + 0.2); labRun(CL.lab[2], t, wt('C3', 'two') - 0.1); labRun(CL.lab[3], t, wt('C3', 'two') - 0.1); labRun(CL.lab[4], t, tCot);
    M.vis($('#cr'), t, wt('C3', 'Monocots') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cr0'), t, wt('C3', 'Monocots') - 0.1, 1e9, { dy: 20 }); M.vis($('#cr1'), t, wt('C3', 'Dicots') - 0.1, 1e9, { dy: 20 });
    avC(t, T1('C3') - 0.4, out);
  }

  /* V: side by side + think */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const tOutV = OUT('V5');
    M.vis($('#vc'), t, tV1 + 0.05, tOutV, { dy: 36, ...o });
    let cur = -1; VR.forEach((v, i) => { if (t >= T0(v[4]) - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, T0(v[4]) - 0.15, 1e9, { dy: 14 });
      r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#va' + i), t, tVa[i] - 0.1, 1e9, POP); M.vis($('#vt' + i + 'a'), t, tVa[i], 1e9, { dx: -12, dy: 0 });
      M.vis($('#vb' + i), t, tVb[i] - 0.1, 1e9, POP); M.vis($('#vt' + i + 'b'), t, tVb[i], 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#th1'), t, tV5 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tV5, tOpts: wt('V5', 'Monocot') - 0.1, tCount: T1('V5') + 0.05, dur: 3, tAns: T0('V6') - 0.02, tWhy: wt('V6', 'tap') - 0.3 });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'count') - 0.1, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    [0, 1].forEach(i => M.vis($('#bn' + i), t, tW1 + 0.4 + i * 0.15, 1e9, { dy: 12 }));
    WT.forEach((w, i) => { const el = $('#tl' + i); M.vis(el, t, w[5] - 0.15, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 });
      el.style.background = mix(C.ac2, C.soft, M.io((t - w[5] - 1.6) / 0.4)); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'dicot') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'cotyledons') - 0.1 });
    M.vis(TP.pea, t, wt('X3', 'pea') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(TP.peaT, t, wt('X3', 'pea'), 1e9, { dy: 6 });
    M.vis(TP.mz, t, wt('X3', 'maize') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(TP.mzT, t, wt('X3', 'maize'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'feature') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
