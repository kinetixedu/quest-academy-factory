// PUC Biology Ep 27: Alternation of Generations (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon + batch canon for chromosome sets: n teal, 2n indigo, 3n gold
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, CHL = '#3E9B5F', NUC = '#7B4B94', WAT = '#5AA0C8';
const HN = '#0E8F8F', DN = '#4A5FC1', HNL = '#CDEDEA', DNL = '#D5DBF4', STALK = '#9A6B3E';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const nT = s => `<span style="color:${HN}">${s}</span>`, dT = s => `<span style="color:${DN}">${s}</span>`;
// small drawings reused across the episode
const moss = (g, x, y, s = 1, withSp = false) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  for (let k = 0; k < 4; k++) mk(G, 'path', { d: `M${-6 + k * 4},40 l${-6 + k * 4},14`, stroke: '#9A7A4E', 'stroke-width': 2, 'stroke-linecap': 'round' });
  mk(G, 'path', { d: 'M0,42 L0,-20', stroke: '#4E7A34', 'stroke-width': 4, 'stroke-linecap': 'round' });
  for (let k = 0; k < 6; k++) { const yy = 34 - k * 10, sd = k % 2 ? 1 : -1; mk(G, 'path', { d: `M0,${yy} q${sd * 10},-6 ${sd * 18},-14 q${-sd * 4},10 ${-sd * 18},14Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 }); }
  if (withSp) { mk(G, 'path', { d: 'M0,-20 C2,-40 6,-58 8,-72', stroke: STALK, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); mk(G, 'ellipse', { cx: 9, cy: -80, rx: 6, ry: 11, fill: '#C9A46A', stroke: BR, 'stroke-width': 1.8, transform: 'rotate(12 9 -80)' }); }
  return W(G); };
const heart = (g, x, y, s = 1, fill = '#9FD09A') => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'path', { d: 'M0,40 C-30,20 -52,2 -46,-22 C-40,-44 -12,-42 0,-24 C12,-42 40,-44 46,-22 C52,2 30,20 0,40 Z', fill, stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) mk(G, 'path', { d: `M${-14 + k * 7},30 l${-4 + k * 2},16`, stroke: '#9A7A4E', 'stroke-width': 1.6, 'stroke-linecap': 'round' });
  return W(G); };
const frond = (g, x, y, s = 1, sori = true) => { const G = mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(G, 'path', { d: 'M0,120 C-4,60 4,0 18,-110', stroke: '#4E7A34', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 8; k++) { const yy = 96 - k * 26, xx = (k * 2.2), L = 62 - k * 6; [-1, 1].forEach(sd => { mk(G, 'path', { d: `M${xx},${yy} C${xx + sd * L * 0.4},${yy - 16} ${xx + sd * L * 0.8},${yy - 14} ${xx + sd * L},${yy - 4} C${xx + sd * L * 0.7},${yy + 6} ${xx + sd * L * 0.3},${yy + 6} ${xx},${yy} Z`, fill: LEAF, stroke: BR, 'stroke-width': 1.6 });
    if (sori && k < 6) for (let q = 1; q <= 2; q++) mk(G, 'circle', { cx: xx + sd * L * q * 0.32, cy: yy - 3, r: 3, fill: '#8A5A2B' }); }); }
  return W(G); };

Object.assign(M.IC, {
  moss: ['M12 22V9', 'M12 18c-3-1-5-3-5-5 3 0 5 2 5 5Z', 'M12 14c3-1 5-3 5-5-3 0-5 2-5 5Z', 'M12 10c-2-1-3-3-3-5 2 0 3 2 3 5Z', 'M4 22h16'],
  stalk: ['M12 22V9', 'M12 9c0-2 .5-4 1.5-5.5', ci(14, 3.5, 1.8), 'M8 22c1-2 2-3 4-4', 'M16 22c-1-2-2-3-4-4'],
  fern: ['M12 22c0-6 1-13 4-19', 'M12 18c-3 0-5-1-6-3', 'M12 14c-3 0-5-1-6-3', 'M13 10c-2 0-4-1-5-2', 'M12 18c3 0 5-1 6-3', 'M12 14c3 0 5-1 6-3', 'M13 10c2 0 4-1 5-2'],
  loop: ['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'],
  switch: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', ci(12, 12, 3)],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tS1 = T0('S1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['moss', 'Velvet moss', 'GREEN · ON THE WALL', 'moss'], ['stalk', 'Brown stalks', 'RISING FROM IT', 'stalks'], ['fern', 'Fern dots', 'UNDER A LEAF', 'dots']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: moss on the wall ---------- */
const hl = $('#hlS'), HW = {};
{ const wall = mk(hl, 'g', {}); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) mk(wall, 'rect', { x: 36 + c * 120 + (r % 2 ? 60 : 0) - 60, y: 300 + r * 46, width: 116, height: 42, fill: '#E4DCCB', stroke: '#CFC4AE', 'stroke-width': 2 });
  mk(wall, 'rect', { x: -40, y: 290, width: 900, height: 8, fill: '#FFFFFF' }); HW.wall = wall;
  HW.cush = mk(hl, 'path', { d: 'M90,360 C100,300 160,290 200,300 C240,262 320,262 360,292 C400,270 480,272 520,300 C560,284 640,296 660,340 C690,350 700,380 680,400 L100,400 C80,392 80,372 90,360 Z', fill: '#6FAE5E', stroke: BR, 'stroke-width': 3.5 });
  const r = M.rng(3); HW.tufts = []; for (let k = 0; k < 40; k++) { const x = 110 + r() * 560, y = 300 + r() * 90; HW.tufts.push(mk(hl, 'path', { d: `M${x.toFixed(0)},${y.toFixed(0)} l-4,-9 M${x.toFixed(0)},${y.toFixed(0)} l4,-9`, stroke: '#3F7A35', 'stroke-width': 2, 'stroke-linecap': 'round' })); }
  HW.st = [[180, 300, 150, 120], [280, 284, 300, 100], [390, 280, 372, 110], [480, 290, 520, 104], [590, 300, 600, 132]].map(([x0, y0, x1, y1]) => { const G = mk(hl, 'g', {});
    mk(G, 'path', { d: `M${x0},${y0} Q${(x0 + x1) / 2 + 8},${(y0 + y1) / 2} ${x1},${y1}`, stroke: STALK, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
    mk(G, 'ellipse', { cx: x1, cy: y1 - 14, rx: 10, ry: 18, fill: '#C9A46A', stroke: BR, 'stroke-width': 2.5, transform: `rotate(${(x1 - x0) / 6} ${x1} ${y1 - 14})` }); return G; });
  HW.tg = [mk(hl, 'g', {}), mk(hl, 'g', {})];
  [[0, 700, 360, 'GREEN', HN], [1, 640, 120, 'BROWN', DN]].forEach(([i, x, y, s]) => { const G = HW.tg[i]; mk(G, 'rect', { x: x - 64, y: y - 22, width: 128, height: 44, rx: 10, fill: C.soft }); txt(G, x, y + 7, s + ' ?', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, fill: C.ink, 'font-weight': 600 }); });
}
const spl = $('#splS'), SPL = {};
{ SPL.a = mk(spl, 'path', { d: 'M180,190 C260,90 520,90 600,190', stroke: HN, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); SPL.ah = mk(spl, 'path', { d: 'M600,190 l-4,-22 l-14,16 Z', fill: HN });
  SPL.b = mk(spl, 'path', { d: 'M604,280 C524,380 264,380 184,280', stroke: DN, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); SPL.bh = mk(spl, 'path', { d: 'M184,280 l4,22 l14,-16 Z', fill: DN });
  SPL.m = moss(spl, 120, 330, 1.1); SPL.s = moss(spl, 660, 330, 1.1, true); }
const FV = [['loop', 'Two generations', 'generations'], ['switch', 'Two switches', 'switches'], ['eye', 'How to spot each', 'spot']];
$('#fvs').innerHTML = FV.map(([ic, n], i) => `<div class="fv" id="fv${i}">${M.icon(ic, 26, C.ac, 2.2)}${n}</div>`).join('');
const tFv = FV.map(f => wt('H5', f[2]));

/* ---------- D: two names + alternation ---------- */
$('#cr0').insertAdjacentHTML('beforeend', `<div class="cn" style="background:${HN}">n</div>`); $('#cr1').insertAdjacentHTML('beforeend', `<div class="cn" style="background:${DN}">2n</div>`);
const CH = [['Gametophyte', HN, HNL, 36, 92], ['Sporophyte', DN, DNL, 372, 186], ['Gametophyte', HN, HNL, 36, 280], ['Sporophyte', DN, DNL, 372, 374]];
const drs = $('#drS'), DCH = CH.map(([s, c, bg, x, y]) => { const G = mk(drs, 'g', {}); mk(G, 'rect', { x, y, width: 300, height: 64, rx: 14, fill: bg, stroke: c, 'stroke-width': 2.5 });
  mk(G, 'text', { x: x + 150, y: y + 42, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: C.ink }).textContent = s; return G; });
const DAR = [[336, 124, 372, 218], [372, 218, 336, 312], [336, 312, 372, 406]].map(([x1, y1, x2, y2], i) => mk(drs, 'path', { d: i === 1 ? `M${x2 + 150},${y1 + 32} C${x2 + 150},${y1 + 70} ${x1 - 150},${y2 - 40} ${x1 - 150},${y2 - 32}` : `M${x1 - 150},${y1 + 32} C${x1 - 150},${y1 + 70} ${x2 + 150},${y2 - 40} ${x2 + 150},${y2 - 32}`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '0' }));
const tCh = [wt('D4', 'Gametophyte'), wt('D4', 'sporophyte'), wt('D4', 'gametophyte', 1), wt('D4', 'again') + 0.3];

/* ---------- Z: MOSS -> CAPSULE -> SPORE ---------- */
const ZN = ['MOSS PLANT', 'CAPSULE', 'SPORE'], ZS = ['x1', 'x20', 'x400'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 3', 'Moss plant', 'Two lives on one plant: green below, brown above.', 'Green leafy part: gametophyte. Brown stalk: sporophyte.'],
  ['RUNG 2 OF 3', 'Capsule', 'The top of the sporophyte.', 'Inside, spore mother cells divide by meiosis.'],
  ['RUNG 3 OF 3', 'Spore', 'One cell with one set of chromosomes (n).', 'It can grow into a new green moss.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The stalk grows on the moss!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[470, 82, 46], [640, 300, 34], null];
const LB = [], ZX = {};
{ const g = ZG[0];
  for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M${450 + k * 6},470 C${440 + k * 4},490 ${420 + k * 10},500 ${400 + k * 18},516`, stroke: '#9A7A4E', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M466,470 L466,262', stroke: '#4E7A34', 'stroke-width': 8, 'stroke-linecap': 'round' });
  for (let k = 0; k < 9; k++) { const yy = 456 - k * 22, sd = k % 2 ? 1 : -1, L = 70 - k * 3; mk(g, 'path', { d: `M466,${yy} q${sd * L * 0.5},-10 ${sd * L},-30 q${-sd * L * 0.3},22 ${-sd * L},30Z`, fill: LEAF, stroke: BR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); }
  mk(g, 'ellipse', { cx: 466, cy: 258, rx: 12, ry: 9, fill: '#B08A5A', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M466,252 C468,200 466,160 470,118', stroke: STALK, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'ellipse', { cx: 472, cy: 82, rx: 22, ry: 38, fill: '#C9A46A', stroke: BR, 'stroke-width': 3.5, transform: 'rotate(8 472 82)' });
  mk(g, 'path', { d: 'M454,52 Q472,36 490,52', stroke: BR, 'stroke-width': 3, fill: '#B08A5A' });
  ZX.brG = mk(g, 'path', { d: 'M290,262 L280,262 L280,470 L290,470', stroke: HN, 'stroke-width': 4, fill: 'none' }); ZX.brGt = txt(g, 270, 372, 'n', { 'text-anchor': 'end', 'font-size': 30, 'font-weight': 600, fill: HN });
  ZX.brS = mk(g, 'path', { d: 'M640,44 L650,44 L650,262 L640,262', stroke: DN, 'stroke-width': 4, fill: 'none' }); ZX.brSt = txt(g, 662, 162, '2n', { 'font-size': 30, 'font-weight': 600, fill: DN });
  LB[0] = [lab(g, 430, 380, 300, 330, 'Leafy gametophyte', 'end', null, 24), lab(g, 432, 500, 300, 500, 'Rhizoids', 'end', null, 24), lab(g, 478, 258, 700, 300, 'Foot', 'start', null, 24), lab(g, 468, 180, 700, 196, 'Seta (stalk)', 'start', null, 24), lab(g, 494, 82, 700, 92, 'Capsule', 'start', null, 24)];
}
{ const g = ZG[1];
  mk(g, 'path', { d: 'M500,526 L500,476 M556,526 L556,476', stroke: STALK, 'stroke-width': 8 });
  mk(g, 'ellipse', { cx: 528, cy: 262, rx: 190, ry: 224, fill: '#C9A46A', stroke: BR, 'stroke-width': 5 });
  mk(g, 'ellipse', { cx: 528, cy: 262, rx: 160, ry: 194, fill: '#F6EBD4', stroke: '#8A6A3A', 'stroke-width': 2.5 });
  mk(g, 'ellipse', { cx: 528, cy: 262, rx: 54, ry: 120, fill: '#E9DCC0', stroke: '#8A6A3A', 'stroke-width': 2 });
  ZX.mc = []; const P = [[420, 180], [420, 262], [420, 344], [636, 180], [636, 262], [636, 344], [470, 110], [586, 110], [470, 414], [586, 414]];
  P.forEach(([x, y]) => { const mc = mk(g, 'circle', { cx: x, cy: y, r: 24, fill: DNL, stroke: DN, 'stroke-width': 2.5 }); const sp = [[-10, -10], [10, -10], [-10, 10], [10, 10]].map(([dx, dy]) => mk(g, 'circle', { cx: x + dx, cy: y + dy, r: 9, fill: HNL, stroke: HN, 'stroke-width': 2 })); ZX.mc.push({ mc, sp }); });
  LB[1] = [lab(g, 708, 230, 790, 150, 'Capsule wall'), lab(g, 400, 262, 250, 230, 'Spore mother cell', 'end'), lab(g, 646, 352, 790, 420, 'Spores (n)')];
}
{ const g = ZG[2];
  mk(g, 'circle', { cx: 440, cy: 263, r: 180, fill: '#E9DCC0', stroke: '#8A6A3A', 'stroke-width': 10 });
  mk(g, 'circle', { cx: 440, cy: 263, r: 160, fill: '#F3F7EA', stroke: GRN, 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: 440, cy: 263, r: 62, fill: '#E1F4F2', stroke: HN, 'stroke-width': 3.5 });
  ZX.chr = [[-30, -18, 0], [0, -26, 40], [24, 4, -30], [-18, 18, 60], [12, 26, 10]].map(([dx, dy, a]) => mk(g, 'path', { d: `M${440 + dx - 12},${263 + dy} q6,-8 12,0 t12,0`, stroke: HN, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', transform: `rotate(${a} ${440 + dx} ${263 + dy})` }));
  ZX.arr = mk(g, 'path', { d: 'M650,263 L780,263 M764,250 L780,263 L764,276', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  ZX.nm = moss(g, 880, 250, 1.6); ZX.nmT = txt(g, 880, 380, 'NEW GAMETOPHYTE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: HN, 'font-weight': 600 });
  LB[2] = [lab(g, 300, 160, 200, 80, 'Spore wall', 'end'), lab(g, 478, 300, 560, 420, 'Nucleus'), lab(g, 452, 238, 560, 120, 'One set of chromosomes')];
}
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'green'), wt('Z2', 'Rhizoids'), wt('Z3', 'foot'), wt('Z3', 'seta'), wt('Z3', 'capsule')],
  [wt('Z4', 'capsule'), wt('Z4', 'cells'), wt('Z4', 'spores')], [wt('Z5', 'spore'), wt('Z5', 'carries'), wt('Z5', 'chromosomes')]];
const tMei = wt('Z4', 'meiosis');

/* ---------- P: the cycle (the signature: a looping life cycle) ---------- */
const PN = ['GAMETES', 'FERTILISATION', 'SPOROPHYTE GROWS', 'MEIOSIS', 'NEW GAMETOPHYTE'];
$('#pch').innerHTML = PN.map((n, i) => `<span class="zc" id="pc${i}">${i + 1} ${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(id => T0(id));
const PI = [['THE WHOLE CYCLE', 'One loop', 'Watch the two lives take turns, around and around.'],
  ['STAGE 1 OF 5', 'Gametes', 'The gametophyte makes male gametes and an egg.'],
  ['STAGE 2 OF 5', 'Fertilisation', 'A male gamete swims through water to the egg. They fuse: a zygote.'],
  ['STAGE 3 OF 5', 'Sporophyte', 'The zygote divides again and again into the sporophyte.'],
  ['STAGE 4 OF 5', 'Meiosis', 'In the capsule, cells divide by meiosis and make spores.'],
  ['STAGE 5 OF 5', 'New gametophyte', 'A spore lands on wet ground and grows into a new moss.']];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 13 ? 44 : 54}px">${n}</div><div class="ld" style="font-size:26px;top:150px">${d}</div></div>`).join('');
$('#swk0').innerHTML = K(`\\textcolor{${HN}}{n}\\rightarrow\\textcolor{${DN}}{2n}`); $('#swk1').innerHTML = K(`\\textcolor{${DN}}{2n}\\rightarrow\\textcolor{${HN}}{n}`); $('#swk2').innerHTML = '<span style="font:600 18px \'IBM Plex Mono\';color:var(--mute)">COUNT STAYS</span>';
const ps = $('#pS'), CX = 528, CY = 285, RX = 330, RY = 170, PT = th => [CX + RX * Math.cos(th * Math.PI / 180), CY + RY * Math.sin(th * Math.PI / 180)];
const arcD = (a0, a1) => { let d = ''; for (let k = 0; k <= 48; k++) { const [x, y] = PT(a0 + (a1 - a0) * k / 48); d += (k ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const RING = { n: mk(ps, 'path', { d: arcD(170, 370), stroke: HN, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', opacity: 0.85 }), d: mk(ps, 'path', { d: arcD(10, 170), stroke: DN, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', opacity: 0.85 }) };
const NODES = [['Gametophyte (n)', -90, 'up'], ['Gametes (n)', -20, 'up'], ['Zygote (2n)', 40, 'down'], ['Sporophyte (2n)', 140, 'down'], ['Spores (n)', 200, 'up']].map(([s, a, lp], i) => {
  const [x, y] = PT(a), G = mk(ps, 'g', {}), ring = mk(G, 'circle', { cx: x, cy: y, r: 52, fill: '#FFFFFF', stroke: i === 2 || i === 3 ? DN : HN, 'stroke-width': 3 });
  const ly = i === 0 ? y + 82 : lp === 'up' ? y - 64 : y + 82;
  const tx = mk(ps, 'text', { x, y: ly, 'text-anchor': 'middle', class: 'zl' }); tx.textContent = s; tx.style.fontSize = '24px';
  return { G, ring, tx, x, y, a }; });
{ const [g0, g1, g2, g3, g4] = NODES;
  moss(g0.G, g0.x, g0.y - 6, 0.85);
  mk(g1.G, 'circle', { cx: g1.x + 12, cy: g1.y, r: 17, fill: HNL, stroke: HN, 'stroke-width': 2.5 }); mk(g1.G, 'circle', { cx: g1.x + 12, cy: g1.y, r: 5, fill: HN });
  mk(g1.G, 'circle', { cx: g1.x - 22, cy: g1.y - 8, r: 6, fill: HN }); mk(g1.G, 'path', { d: `M${g1.x - 28},${g1.y - 6} q-6,6 -2,12 t-2,12`, stroke: HN, 'stroke-width': 2, fill: 'none' });
  mk(g2.G, 'circle', { cx: g2.x, cy: g2.y, r: 24, fill: DNL, stroke: DN, 'stroke-width': 3 }); mk(g2.G, 'circle', { cx: g2.x, cy: g2.y, r: 8, fill: DN });
  moss(g3.G, g3.x - 6, g3.y + 14, 0.6, true);
  [[-12, -12], [12, -12], [-12, 12], [12, 12]].forEach(([dx, dy]) => mk(g4.G, 'circle', { cx: g4.x + dx, cy: g4.y + dy, r: 9, fill: HNL, stroke: HN, 'stroke-width': 2 })); }
const TAG = (s, th, col, w) => { const [x, y] = PT(th), G = mk(ps, 'g', {}); const r = mk(G, 'rect', { x: x - w / 2, y: y - 20, width: w, height: 40, rx: 9, fill: col });
  txt(G, x, y + 6, s, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: '#FFFFFF', 'font-weight': 600 }); return { G, r }; };
const TG = { fert: TAG('FERTILISATION', 10, C.ink, 190), mei: TAG('MEIOSIS', 170, C.ink, 120), mit1: TAG('MITOSIS', 235, '#9AA0AC', 116), mit2: TAG('MITOSIS', 90, '#9AA0AC', 116) };
const DOT = mk(ps, 'circle', { r: 11, fill: HN, stroke: '#FFFFFF', 'stroke-width': 3 });
const avP = PUC.avatar($('#sP'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Two switches, one loop.' });

/* ---------- V: side by side ---------- */
const VR = [['Starts from', 'A spore', 'A zygote', 'spore', 'zygote'], ['Makes', 'Gametes, by mitosis', 'Spores, by meiosis', 'gametes', 'spores'],
  ['In a moss', 'The green leafy plant', 'The brown stalk with its capsule', 'moss', 'moss'], ['In a fern', 'A small heart shaped prothallus', 'The big leafy fern itself', 'fern', 'fern']];
$('#vrs').innerHTML = VR.map(([k, a, b], i) => `<div class="vr" id="vr${i}" style="top:${92 + i * 120}px"><div class="vk">${k}</div>
  <svg id="va${i}" width="120" height="100" style="left:290px"></svg><div class="vt" id="vt${i}a" style="left:430px">${a}</div>
  <svg id="vb${i}" width="120" height="100" style="left:942px"></svg><div class="vt" id="vt${i}b" style="left:1082px">${b}</div></div>`).join('');
{ const S = id => $('#' + id);
  [[-12, -12], [12, -12], [-12, 12], [12, 12]].forEach(([dx, dy], k) => { if (!k) mk(S('va0'), 'circle', { cx: 60, cy: 50, r: 16, fill: HNL, stroke: HN, 'stroke-width': 3 }); });
  mk(S('vb0'), 'circle', { cx: 60, cy: 50, r: 24, fill: DNL, stroke: DN, 'stroke-width': 3 }); mk(S('vb0'), 'circle', { cx: 60, cy: 50, r: 8, fill: DN });
  mk(S('va1'), 'circle', { cx: 72, cy: 50, r: 17, fill: HNL, stroke: HN, 'stroke-width': 2.5 }); mk(S('va1'), 'circle', { cx: 36, cy: 42, r: 7, fill: HN }); mk(S('va1'), 'path', { d: 'M30,44 q-6,6 -2,12 t-2,12', stroke: HN, 'stroke-width': 2, fill: 'none' });
  [[-14, -14], [14, -14], [-14, 14], [14, 14]].forEach(([dx, dy]) => mk(S('vb1'), 'circle', { cx: 60 + dx, cy: 50 + dy, r: 10, fill: HNL, stroke: HN, 'stroke-width': 2 }));
  moss(S('va2'), 60, 44, 0.9); moss(S('vb2'), 54, 66, 0.62, true);
  heart(S('va3'), 60, 46, 0.8); frond(S('vb3'), 60, 52, 0.38, true); }
const tVa = VR.map(v => wt('C2', v[3])), tVb = VR.map(v => wt('C3', v[4]));
const th1 = PUC.think($('#th1'), { q: 'The corridor fern has brown dots full of spores under its leaves. Which generation is that fern?', opts: ['Gametophyte', 'Sporophyte'], right: 1, why: 'Sporophyte. It makes spores, so it is the spore plant.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">fertilisation → <b style="color:${DN}">2n</b> sporophyte &nbsp;·&nbsp; meiosis → <b style="color:${HN}">n</b> spores</span>`;

/* ---------- W: the fern, walked around ---------- */
const FPN = [['1 · SPOROPHYTE', 'The big fern makes spores by meiosis', '2n', DN, 'W2'], ['2 · SPORE GROWS', 'A spore grows into a prothallus', 'n', HN, 'W3'],
  ['3 · GAMETES + WATER', 'Male gametes swim to the egg', 'n', HN, 'W4'], ['4 · NEW FERN', 'The zygote grows into a new fern', '2n', DN, 'W5']];
$('#fps').innerHTML = FPN.map(([h, s, g, c], i) => `<div class="fp" id="fp${i}" style="left:${36 + i * 388}px"><div class="fh">${h}</div><svg id="fs${i}" width="356" height="320" style="position:absolute;left:0;top:44px"></svg><div class="ft">${s}</div><div class="fg" style="background:${c}">${g === 'n' ? 'GAMETOPHYTE · n' : 'SPOROPHYTE · 2n'}</div></div>`).join('');
const FW = {};
{ const S = i => $('#fs' + i);
  frond(S(0), 178, 186, 1.15, true); FW.sori = txt(S(0), 300, 300, 'SORI', { 'text-anchor': 'end', 'font-size': 15, 'letter-spacing': 1.5, fill: '#8A5A2B', 'font-weight': 600 });
  FW.sp1 = mk(S(1), 'circle', { cx: 70, cy: 230, r: 12, fill: HNL, stroke: HN, 'stroke-width': 3 }); FW.ar1 = mk(S(1), 'path', { d: 'M96,226 C130,200 150,190 180,186', stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '6 6' });
  FW.pro1 = heart(S(1), 240, 170, 1.4); FW.pt1 = txt(S(1), 240, 300, 'PROTHALLUS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.5, fill: HN, 'font-weight': 600 });
  FW.pro2 = heart(S(2), 178, 150, 1.7); FW.egg = mk(S(2), 'circle', { cx: 178, cy: 128, r: 13, fill: HNL, stroke: HN, 'stroke-width': 3 });
  FW.wat = mk(S(2), 'path', { d: 'M20,262 q20,-10 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0', stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  FW.mg = mk(S(2), 'g', {}); mk(FW.mg, 'circle', { cx: 0, cy: 0, r: 6, fill: HN }); mk(FW.mg, 'path', { d: 'M-6,2 q-6,6 -2,10 t-4,10', stroke: HN, 'stroke-width': 2, fill: 'none' });
  FW.wt = txt(S(2), 30, 300, 'WATER', { 'font-size': 15, 'letter-spacing': 1.5, fill: WAT, 'font-weight': 600 });
  FW.pro3 = heart(S(3), 178, 220, 1.3, '#C8D9A8'); FW.yf = frond(S(3), 178, 136, 0.62, false); }
const tFp = FPN.map(f => T0(f[4]));
{ const a = $('#wS'); [404, 792, 1180].forEach(x => mk(a, 'path', { d: `M${x - 8},${290 - 14} L${x + 8},290 L${x - 8},${290 + 14}`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'fa2' })); }

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The gametophyte makes its gametes by meiosis', right: 'It is already n: gametes by mitosis, spores by meiosis' });
const tS = $('#tS'), TP = {};
{ TP.c0 = mk(tS, 'g', {}); mk(TP.c0, 'circle', { cx: 110, cy: 132, r: 52, fill: HNL, stroke: HN, 'stroke-width': 3.5 }); txt(TP.c0, 110, 142, 'n', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: HN });
  TP.ar = mk(tS, 'path', { d: 'M180,132 L250,132 M236,120 L250,132 L236,144', stroke: C.ink, 'stroke-width': 3, fill: 'none' });
  TP.c1 = mk(tS, 'g', {}); [[320, 90], [390, 176]].forEach(([x, y]) => { mk(TP.c1, 'circle', { cx: x, cy: y, r: 40, fill: HNL, stroke: HN, 'stroke-width': 3.5 }); txt(TP.c1, x, y + 10, 'n', { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 600, fill: HN }); });
  TP.cap = txt(tS, 250, 250, 'MITOSIS · n STAYS n', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: C.ac, 'font-weight': 600 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Statements: which generation makes spores or gametes, and by which division' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'In a moss, which of these statements are correct?<div class="sl"><b>I</b>The sporophyte makes spores by meiosis.</div><div class="sl"><b>II</b>The gametophyte makes gametes by meiosis.</div><div class="sl"><b>III</b>The zygote is the first cell of the sporophyte.</div><div class="sl"><b>IV</b>Spores grow into gametophytes by mitosis.</div>',
  opts: ['I and II only', 'II, III and IV only', 'I, III and IV only', 'I, II, III and IV'], right: 2, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Gametes form by mitosis'], ['<b style="color:var(--ok)">I</b>: meiosis makes spores'], ['<b style="color:var(--ok)">III, IV</b>: true']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'mitosis'), wt('A3', 'sporophyte'), wt('A3', 'zygote')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · alternation of generations', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: [`<b>Gametophyte</b> ${nT('(n)')}: starts from a spore, makes gametes by mitosis`, `<b>Sporophyte</b> ${dT('(2n)')}: starts from a zygote, makes spores by meiosis`,
    `<b>Switches</b>: fertilisation ${K(`\\textcolor{${HN}}{n}\\rightarrow\\textcolor{${DN}}{2n}`)} &nbsp;·&nbsp; meiosis ${K(`\\textcolor{${DN}}{2n}\\rightarrow\\textcolor{${HN}}{n}`)}`,
    '<b>Moss</b>: green leafy plant = gametophyte · stalk + capsule = sporophyte', '<b>Fern</b>: leafy fern = sporophyte · prothallus = gametophyte'] });
const YQ = ['Which generation makes spores?', 'Which two events switch one generation into the other?', 'In a fern, which generation is the prothallus?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 28', topic: 'Why one body has twice the chromosomes: Haploid and Diploid Phases', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S2') - 0.2, 1.06, 1040, 560], [tC1 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const g = $('#ghT'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  let x = 36; FV.forEach((_, i) => { const e = $('#fv' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sb0 = $('#sb0'), sb1 = $('#sb1'); sb0.style.left = (120 - sb0.offsetWidth / 2) + 'px'; sb1.style.left = (660 - sb1.offsetWidth / 2) + 'px'; sb0.style.top = sb1.style.top = '412px';
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
    M.vis($('#hl'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    M.vis(HW.wall, t, tMorph + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.vis(HW.cush, t, tMorph + 0.7, 1e9, { dy: 20 }); HW.tufts.forEach((e, i) => M.vis(e, t, tMorph + 0.8 + (i % 10) * 0.03, 1e9, { dy: 0, fade: 0.2 }));
    HW.st.forEach((s, i) => M.vis(s, t, wt('H2', 'details') - 0.3 + i * 0.1, 1e9, { dy: 30 }));
    M.vis(HW.tg[0], t, wt('H2', 'each') - 0.1, 1e9, POP); M.vis(HW.tg[1], t, wt('H2', 'different') - 0.1, 1e9, POP);
    M.vis($('#hlP'), t, wt('H4', 'both') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, wt('H3', 'asked') - 0.1, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { M.vis(SPL.m, t, tH4 + 0.1, 1e9, POP); M.vis(SPL.s, t, wt('H4', 'two') - 0.2, 1e9, POP); M.vis($('#sb0'), t, tH4 + 0.2, 1e9, POP); M.vis($('#sb1'), t, wt('H4', 'two'), 1e9, POP);
      M.draw(SPL.a, t, wt('H4', 'turns') - 0.3, 0.6); M.vis(SPL.ah, t, wt('H4', 'turns') + 0.2, 1e9, POP); M.draw(SPL.b, t, wt('H4', 'turns') + 0.2, 0.6); M.vis(SPL.bh, t, wt('H4', 'turns') + 0.7, 1e9, POP);
      if (t > wt('H4', 'turns') + 1) { [SPL.a, SPL.b].forEach(p => { p.style.strokeDasharray = '16 10'; p.style.strokeDashoffset = (-(t * 30) % 26).toFixed(1); }); }
      FV.forEach((_, i) => M.vis($('#fv' + i), t, tFv[i] - 0.1, 1e9, { dy: 16 })); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dw'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 8 });
    M.vis($('#cr0'), t, wt('D2', 'gametophyte') - 0.1, 1e9, { dy: 20 }); M.vis($('#cr1'), t, wt('D3', 'sporophyte') - 0.1, 1e9, { dy: 20 });
    M.vis($('#dwP'), t, wt('D3', 'spore') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o });
    DCH.forEach((g, i) => M.vis(g, t, tCh[i] - 0.1, 1e9, POP)); DAR.forEach((a, i) => M.draw(a, t, tCh[i + 1] - 0.35, 0.35));
    M.vis($('#drP'), t, wt('D4', 'alternation') - 0.1, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => labRun(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    M.draw(ZX.brG, t, wt('Z2', 'gametophyte'), 0.4); ZX.brGt.style.opacity = M.clamp((t - wt('Z2', 'gametophyte') - 0.3) / 0.3);
    M.draw(ZX.brS, t, wt('Z3', 'sporophyte'), 0.4); ZX.brSt.style.opacity = M.clamp((t - wt('Z3', 'sporophyte') - 0.3) / 0.3);
    ZX.mc.forEach((c, i) => { const u = M.io((t - tMei - i * 0.12) / 0.5); c.mc.style.opacity = (1 - u).toFixed(3); c.sp.forEach((s, j) => { s.style.opacity = u.toFixed(3); }); });
    M.draw(ZX.arr, t, wt('Z5', 'grow') - 0.1, 0.4); M.vis(ZX.nm, t, wt('Z5', 'grow') + 0.2, 1e9, { ...POP, sc: 0.4 }); M.vis(ZX.nmT, t, wt('Z5', 'new'), 1e9, { dy: 6 });
    ZX.chr.forEach((c, i) => attr(c, 'stroke-width', (4 + (t > wt('Z5', 'chromosomes') ? 1.2 * Math.max(0, Math.sin(t * 5 + i)) : 0)).toFixed(2)));
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, T1('Z3') - 0.5, tZ[1] + 0.2);
  }

  /* P + S: the cycle */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pch'), t, tP1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let st = -1; tPs.forEach((tt, i) => { if (t >= tt - 0.05) st = i; }); if (t >= tS1) st = 5;
    PN.forEach((_, i) => { const el = $('#pc' + i), on = i === st ? 1 : 0, done = i < st ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    PI.forEach((_, i) => M.vis($('#pi' + i), t, i ? tPs[i - 1] + 0.1 : tP1 + 0.4, i < 5 ? tPs[i] : tS1, { dy: 20, outDur: 0.25, ody: -12 }));
    const swOn = M.vis($('#sws'), t, tS1 + 0.2, 1e9, { dy: 16 });
    if (swOn) { [0, 1, 2].forEach(i => { const tt = T0('S' + (i + 2)); M.vis($('#sw' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write($('#swk' + i), t, tt + 0.4, 0.5); }); }
    // ring + nodes build during P1
    M.draw(RING.n, t, tP1 + 0.3, 1.0); M.draw(RING.d, t, tP1 + 0.9, 0.8);
    const NI = [4, 0, 1, 2, 3];
    NODES.forEach((n, i) => { const tin = tP1 + 0.5 + i * 0.22; M.vis(n.G, t, tin, 1e9, { ...POP, sc: 0.4 }); n.tx.style.opacity = M.clamp((t - tin - 0.2) / 0.3).toFixed(3);
      const lit = (st >= 0 && st < 5 && NI[st] === i) ? 1 : 0; attr(n.ring, 'stroke-width', lit ? 6 : 3); attr(n.ring, 'fill', lit ? (i === 2 || i === 3 ? '#F0F2FB' : '#EEF8F7') : '#FFFFFF');
      const pul = lit ? 1 + 0.05 * Math.sin(t * 5) : 1; attr(n.ring, 'r', (52 * pul).toFixed(2)); });
    const tagLit = (tg, on) => attr(tg.r, 'fill', on ? C.ac : C.ink);
    M.vis(TG.fert.G, t, tP1 + 1.6, 1e9, POP); M.vis(TG.mei.G, t, tP1 + 1.8, 1e9, POP);
    tagLit(TG.fert, st === 1 || (t >= T0('S2') && t < T0('S3'))); tagLit(TG.mei, st === 3 || (t >= T0('S3') && t < T0('S4')));
    M.vis(TG.mit1.G, t, wt('S4', 'mitosis') - 0.1, 1e9, POP); M.vis(TG.mit2.G, t, wt('S4', 'mitosis') + 0.1, 1e9, POP);
    // the looping dot: runs the loop, faster while the stages are told
    const per = 7.5, th = -90 + 360 * (((t - tP1 - 1.5) / per) % 1 + 1) % 360 / 360 * 1;
    const ang = -90 + (((t - tP1 - 1.5) / per) % 1) * 360; const [dx, dy] = PT(ang);
    attr(DOT, 'cx', dx.toFixed(1)); attr(DOT, 'cy', dy.toFixed(1)); const nh = ((ang % 360) + 360) % 360; attr(DOT, 'fill', nh > 10 && nh < 170 ? DN : HN); M.hide(DOT, t < tP1 + 1.5);
    avP(t, T1('S4') - 0.4, out);
  }

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT('C4'), { dy: 36, ...o });
    let cur = -1; VR.forEach((v, i) => { if (t >= Math.min(tVa[i], tVb[i]) - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, tVa[i] - 0.15, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#va' + i), t, tVa[i] - 0.1, 1e9, POP); M.vis($('#vt' + i + 'a'), t, tVa[i], 1e9, { dx: -12, dy: 0 });
      M.vis($('#vb' + i), t, tVb[i] - 0.1, 1e9, POP); M.vis($('#vt' + i + 'b'), t, tVb[i], 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'It') - 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Fertilisation') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Meiosis') - 0.1, 0.9);
  }

  /* W: fern */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    const cur = tFp.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    FPN.forEach((_, i) => { const el = $('#fp' + i); M.vis(el, t, tFp[i] - 0.15, 1e9, { dy: 24 }); el.style.background = i === cur ? C.ac2 : C.soft; });
    [...$('#wS').querySelectorAll('path')].forEach((p, i) => M.vis(p, t, tFp[i + 1] - 0.3, 1e9, POP));
    M.vis(FW.sori, t, wt('W2', 'sporangia'), 1e9, { dy: 6 });
    M.vis(FW.sp1, t, wt('W3', 'spore') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.draw(FW.ar1, t, wt('W3', 'grows') - 0.1, 0.5); M.vis(FW.pro1, t, wt('W3', 'prothallus') - 0.2, 1e9, { ...POP, sc: 0.4 }); M.vis(FW.pt1, t, wt('W3', 'gametophyte'), 1e9, { dy: 6 });
    M.vis(FW.pro2, t, tFp[2] + 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis(FW.egg, t, wt('W4', 'eggs') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.draw(FW.wat, t, wt('W4', 'water') - 0.2, 0.6); M.vis(FW.wt, t, wt('W4', 'water'), 1e9, { dy: 6 });
    if (FW.wat._L) { FW.wat.style.strokeDasharray = t > wt('W4', 'water') + 0.5 ? '14 8' : FW.wat.style.strokeDasharray; if (t > wt('W4', 'water') + 0.5) FW.wat.style.strokeDashoffset = (-(t * 20) % 22).toFixed(1); }
    { const u = (((t - wt('W4', 'swim')) / 2.2) % 1 + 1) % 1, x = 40 + (166 - 40) * u, y = 250 - 110 * u + 10 * Math.sin(u * 18); attr(FW.mg, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); M.hide(FW.mg, t < wt('W4', 'swim') - 0.05); }
    M.vis(FW.pro3, t, tFp[3] + 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis(FW.yf, t, wt('W5', 'grows') - 0.1, 1e9, { dy: 30, sp: M.SOFT });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'gametophyte') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'mitosis') - 0.3 });
    M.vis(TP.c0, t, wt('X3', 'one') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.draw(TP.ar, t, wt('X3', 'mitosis') - 0.2, 0.3); M.vis(TP.c1, t, wt('X3', 'mitosis'), 1e9, { ...POP, sc: 0.5 }); M.vis(TP.cap, t, wt('X3', 'mitosis') + 0.3, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Read') - 0.2, tCount, tAns });
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
