// PUC Biology Ep 10: Three-Domain System of Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// domain colours (this episode): Bacteria steel blue, Archaea brick, Eukarya violet (nucleus canon); RNA bases A gold, U sky, G green, C red
const BR = '#2E2A24', BA = '#4F7CAC', AR = '#B5525C', EU = '#7B4B94', WALL = '#C9B36A', WALLE = '#7A6A2E', NUC = '#7B4B94', MITO = '#E58A3C', CYTO = '#F3F7EA';
const BASE = { A: '#C9962B', U: '#5AA0C8', G: '#3E9B5F', C: '#D1495B' };
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const pulse = (t, t0, d = 1.0) => M.io((t - t0) / 0.2) * (1 - M.io((t - t0 - d) / 0.3));

Object.assign(M.IC, {
  spring: ['M3 18c0-2 4-3.5 9-3.5s9 1.5 9 3.5-4 3.5-9 3.5-9-1.5-9-3.5Z', 'M8 11c-1-1.5 1-3 0-4.5', 'M12 11c-1-1.5 1-3 0-4.5', 'M16 11c-1-1.5 1-3 0-4.5'],
  salt: ['M3 20h18', 'M5 20v-5h5v5', 'M12 20v-8h6v8', 'M8 15v-4h5'],
  cow: ['M5 9C3 9 2 7 2 6c2 0 3 1 4 2', 'M19 9c2 0 3-2 3-3-2 0-3 1-4 2', 'M6 8c0-2 3-3 6-3s6 1 6 3v6c0 3-3 6-6 6s-6-3-6-6Z', 'M9 17h6', ci(9.5, 11, 0.6), ci(14.5, 11, 0.6)],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  cell: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  mushroom: ['M3 12a9 7 0 0 1 18 0Z', 'M10 12v7a2 2 0 0 0 4 0v-7'],
  amoeba: ['M6 8c2-4 8-5 11-2s4 6 1 9-4 6-8 5-7-3-6-6 0-4 2-6Z', ci(11, 12, 2)],
  mango: ['M12 6.5c4 0 7 3.4 7 7.8S16 21 12 21s-7-2.6-7-7S8 6.5 12 6.5Z', 'M12 6.5c0-1.8.8-3 2.6-3.6', 'M13.4 5.2c1.8-1.4 4.6-1.2 5.6.6-2 1-4 .9-5.6-.6Z'],
});
function LBmake(g, L) { return L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; }); }
const LBrun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
// a rod-shaped prokaryote cell: wall, membrane, loose DNA loop, ribosome dots
function rod(p, x, y, w, h, wallC = WALL, wallE = WALLE, seed = 3, nRib = 14) { const g = mk(p, 'g', {}), r = M.rng(seed);
  mk(g, 'rect', { x, y, width: w, height: h, rx: h / 2, fill: mix('#FFFFFF', wallC, 0.55), stroke: wallE, 'stroke-width': 4 });
  mk(g, 'rect', { x: x + h * .1, y: y + h * .1, width: w - h * .2, height: h * .8, rx: h * .4, fill: CYTO, stroke: '#3E9B5F', 'stroke-width': 2.5 });
  const cx = x + w / 2, cy = y + h / 2; let d = ''; for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI * 2, rr = 1 + 0.18 * Math.sin(5 * a); d += (k ? 'L' : 'M') + (cx + w * .2 * rr * Math.cos(a)).toFixed(1) + ',' + (cy + h * .22 * rr * Math.sin(a)).toFixed(1); }
  mk(g, 'path', { d: d + 'Z', fill: 'none', stroke: NUC, 'stroke-width': 3 });
  const ribs = []; for (let k = 0; k < nRib; k++) { const u = r(), v = r(); const px = x + h * .3 + u * (w - h * .6), py = y + h * .22 + v * h * .56; if (Math.abs(px - cx) < w * .22 && Math.abs(py - cy) < h * .25) continue; ribs.push(mk(g, 'circle', { cx: px.toFixed(1), cy: py.toFixed(1), r: Math.max(3, h * .03), fill: BR })); }
  g.ribs = ribs; return g; }

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tS1 = T0('S1'), tD1 = T0('D1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['spring', 'A hot spring', 'STEAMING WATER', 'hot'], ['salt', 'A salt pan', 'WHITE WITH SALT', 'salt'], ['cow', "A cow's stomach", 'WARM, NO OXYGEN', 'stomach']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('microbe', 22, '#fff', 2.2)}MICROBES</div></div>`).join('');
const hs = $('#hsS'), hsA = mk(hs, 'g', {}), hsB = mk(hs, 'g', {});
{ const g = hsA; mk(g, 'path', { d: 'M36,300 C160,220 280,250 392,236 C520,220 640,200 748,260 L748,470 L36,470 Z', fill: '#DCEBD2' });
  mk(g, 'ellipse', { cx: 360, cy: 380, rx: 290, ry: 82, fill: '#E7D8A8', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'ellipse', { cx: 360, cy: 380, rx: 250, ry: 62, fill: '#9FD3D9', stroke: '#3B8C97', 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 360, cy: 384, rx: 150, ry: 32, fill: '#BDE3E7' });
  [[110, 420, 34], [612, 410, 28], [560, 448, 22], [170, 452, 20]].forEach(([x, y, r]) => mk(g, 'ellipse', { cx: x, cy: y, rx: r * 1.3, ry: r, fill: '#B7AE9E', stroke: BR, 'stroke-width': 3 }));
  g.rods = [[280, 372, 20], [330, 392, -15], [400, 368, 35], [450, 394, 5], [240, 396, -30], [500, 376, -10]].map(([x, y, a]) => mk(g, 'rect', { x: x - 11, y: y - 4.5, width: 22, height: 9, rx: 4.5, fill: AR, transform: `rotate(${a} ${x} ${y})` }));
  g.steam = [0, 1, 2, 3, 4].map(k => mk(g, 'path', { d: `M${250 + k * 50},340 c-14,-20 14,-34 0,-54 c-14,-20 14,-34 0,-54`, stroke: '#C9D3DA', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }));
  mk(g, 'line', { x1: 660, y1: 470, x2: 660, y2: 300, stroke: '#6B5B3A', 'stroke-width': 7 });
  mk(g, 'rect', { x: 560, y: 210, width: 200, height: 92, rx: 8, fill: '#fff', stroke: BR, 'stroke-width': 3 });
  txt(g, 660, 246, 'HOT SPRING', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ink }); txt(g, 660, 280, 'MICROBES LIVE HERE', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1, 'font-weight': 600, fill: AR }); }
{ const g = hsB; [[220, AR, 'HOT SPRING MICROBE'], [564, BA, 'CURD BACTERIUM']].forEach(([x, c, n], i) => { const s = mk(g, 'g', {});
    mk(s, 'circle', { cx: x, cy: 270, r: 150, fill: '#F7FAF4', stroke: C.ink, 'stroke-width': 5 });
    [[x - 50, 230, 25], [x + 30, 300, -20], [x - 20, 330, 60], [x + 60, 220, 10], [x - 80, 300, -40]].forEach(([px, py, a]) => mk(s, 'rect', { x: px - 34, y: py - 13, width: 68, height: 26, rx: 13, fill: mix('#FFFFFF', '#8A8F99', .35), stroke: BR, 'stroke-width': 2.5, transform: `rotate(${a} ${px} ${py})` }));
    s.rim = s.firstChild; s.lab = txt(g, x, 452, n, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 }); g['s' + i] = s; });
  g.eq = txt(g, 392, 286, '=', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 56, 'font-weight': 700, fill: C.mute }); }

/* ---------- B ---------- */
const KG = [['microbe', 'Monera'], ['amoeba', 'Protista'], ['mushroom', 'Fungi'], ['leaf', 'Plantae'], ['paw', 'Animalia']];
$('#kgs').innerHTML = KG.map(([ic, n], i) => `<div class="kg" id="kg${i}" style="left:${36 + i * 144}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><span>${n}</span></div>`).join('') +
  `<div class="kgb" id="kb0" style="left:36px;width:132px;background:var(--ink);color:#fff">NO NUCLEUS</div><div class="kgb" id="kb1" style="left:180px;width:564px;background:#EFE6F4;color:${EU}">NUCLEUS · EUKARYOTES</div>`;
const tKg = [wt('B2', 'Monera'), wt('B4', 'Protista'), wt('B4', 'Fungi'), wt('B4', 'Plantae'), wt('B4', 'Animalia')];
const blS = $('#blS'), monB = mk(blS, 'g', {}); mk(monB, 'rect', { x: 36, y: 300, width: 712, height: 170, rx: 14, fill: C.soft });
txt(monB, 60, 334, 'INSIDE MONERA', { 'font-size': 15, 'letter-spacing': 1.5, 'font-weight': 600 });
const monRods = Array.from({ length: 12 }, (_, k) => { const x = 110 + (k % 6) * 110, y = 382 + Math.floor(k / 6) * 52; const w = mk(monB, 'g', { class: 'pp' }); mk(w, 'rect', { x: x - 32, y: y - 12, width: 64, height: 24, rx: 12, fill: '#B9BEC8', stroke: BR, 'stroke-width': 2.5, transform: `rotate(${(k * 37) % 30 - 15} ${x} ${y})` }); return w; });
const brS = $('#brS'), pro = rod(brS, 80, 180, 240, 120, WALL, WALLE, 5, 12);
const euk = mk(brS, 'g', {}); mk(euk, 'circle', { cx: 540, cy: 250, r: 112, fill: CYTO, stroke: '#3E9B5F', 'stroke-width': 4 });
mk(euk, 'circle', { cx: 520, cy: 232, r: 40, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3.5 }); mk(euk, 'circle', { cx: 524, cy: 228, r: 13, fill: NUC });
mk(euk, 'ellipse', { cx: 600, cy: 300, rx: 32, ry: 15, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5, transform: 'rotate(-20 600 300)' });
[[470, 300], [490, 320], [580, 180], [610, 230], [460, 260], [560, 330]].forEach(([x, y]) => mk(euk, 'circle', { cx: x, cy: y, r: 4, fill: BR }));
const LBB = LBmake(brS, [[150, 184, 110, 110, 'Cell wall', 'start'], [196, 228, 120, 380, 'DNA, loose', 'start', [120, 300]], [276, 268, 300, 432, 'Ribosome', 'start', [300, 340]],
  [520, 220, 500, 104, 'Nucleus', 'start'], [608, 304, 584, 420, 'Mitochondrion', 'start', [584, 360]], [470, 300, 440, 384, 'Ribosome', 'start', [440, 384]]]);
const tLB = [wt('B3', 'cell'), wt('B3', 'DNA'), wt('B3', 'loose') + 0.4, wt('B3', 'nucleus', 1), wt('B3', 'eukaryote') + 0.3, wt('B3', 'eukaryote') + 0.6];
const hdB = [txt(brS, 200, 500, 'PROKARYOTE', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ink }), txt(brS, 540, 500, 'EUKARYOTE', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.5, 'font-weight': 600, fill: EU })];

/* ---------- Z: cell -> ribosome -> rRNA ---------- */
const ZN = ['CELL', 'RIBOSOME', 'RIBOSOMAL RNA'], ZS = ['x1,000', 'x1,000,000', 'x10,000,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4')];
const LVI = [['RUNG 1 OF 3', 'Cell', 'Every living cell has ribosomes.', 'Here: one bacterial cell.'],
  ['RUNG 2 OF 3', 'Ribosome', 'A tiny part that builds proteins.', 'Made of protein and ribosomal RNA.'],
  ['RUNG 3 OF 3', 'rRNA', 'A long chain of four kinds of building blocks.', 'Written as letters: A, U, G and C.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same part in every cell!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[640, 300, 34], [462, 214, 50], null];
const zCell = rod(ZG[0], 150, 120, 760, 300, WALL, WALLE, 9, 36);
const LZ0 = LBmake(ZG[0], [[300, 128, 230, 64, 'Cell wall', 'start'], [210, 230, 120, 470, 'Cell membrane', 'start', [120, 400]], [530, 214, 640, 64, 'DNA', 'start'], [640, 300, 700, 470, 'Ribosome', 'start']]);
const tLZ0 = [wt('Z2', 'cell'), wt('Z2', 'living') + 0.2, wt('Z2', 'has'), wt('Z2', 'ribosomes')];
// level 1: ribosome
const rib = {}; { const g = ZG[1];
  mk(g, 'path', { d: 'M300,230 C290,140 400,96 520,104 C650,110 740,170 720,250 C706,300 620,312 520,306 C410,300 306,296 300,230 Z', fill: '#E9D5BD', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M340,350 C340,312 420,300 520,302 C620,304 690,320 686,360 C682,400 600,414 510,412 C420,410 340,396 340,350 Z', fill: '#DCC3A6', stroke: BR, 'stroke-width': 4 });
  [['M380,200 q20,-30 40,0 t40,0 t40,0', 0], ['M560,170 q16,-24 32,0 t32,0', 0], ['M420,360 q18,-20 36,0 t36,0 t36,0', 1]].forEach(([d]) => mk(g, 'path', { d, stroke: NUC, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' }));
  rib.m = mk(g, 'path', { d: 'M150,312 C300,318 700,300 900,312', stroke: '#8A8F99', 'stroke-width': 5, fill: 'none', 'stroke-dasharray': '14 8' });
  rib.beads = Array.from({ length: 9 }, (_, k) => mk(g, 'circle', { cx: 712 + k * 28, cy: 134 + (k % 2) * 8, r: 11, fill: ['#E58A3C', '#3E9B5F', '#5AA0C8', '#C9962B'][k % 4], stroke: BR, 'stroke-width': 2 })); }
const LZ1 = LBmake(ZG[1], [[702, 252, 770, 262, 'Large subunit', 'start'], [640, 392, 760, 440, 'Small subunit', 'start'], [420, 200, 300, 72, 'Ribosomal RNA inside', 'start'], [824, 138, 850, 72, 'New protein', 'start']]);
const tLZ1 = [wt('Z3', 'protein') - 0.2, wt('Z3', 'protein') + 0.2, wt('Z3', 'ribosomal'), wt('Z2', 'proteins') + 99];
// level 2: rRNA chain
const SEQ = 'AUGGCACUAGCU', rna = []; { const g = ZG[2], pts = [];
  for (let k = 0; k < SEQ.length; k++) pts.push([120 + k * 72, 270 + 70 * Math.sin(k * 0.8)]);
  mk(g, 'path', { d: 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: NUC, 'stroke-width': 6, fill: 'none', 'stroke-linejoin': 'round' });
  pts.forEach(([x, y], k) => { const b = mk(g, 'g', { class: 'pp' }); mk(b, 'circle', { cx: x, cy: y, r: 27, fill: BASE[SEQ[k]], stroke: BR, 'stroke-width': 3 });
    txt(b, x, y + 9, SEQ[k], { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, 'font-weight': 600, fill: '#fff' }); rna.push(b); }); }
const LZ2 = LBmake(ZG[2], [[264, 270 + 70 * Math.sin(2 * .8) - 28, 300, 72, 'One building block', 'start'], [700, 270 + 70 * Math.sin(8 * .8), 760, 470, 'One long chain', 'start'], [120, 297, 140, 470, 'Four kinds: A, U, G, C', 'start', [120, 470]]]);
const tLZ2 = [wt('Z4', 'building'), wt('Z4', 'chain'), wt('Z4', 'letters')];
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));

/* ---------- S: compare rRNA ---------- */
const PSs = ['Read the letters', 'Line them up', 'Count differences', 'Grow the tree'];
$('#sps').innerHTML = PSs.map((n, i) => `<div class="sp" id="sp${i}" style="left:${36 + i * 386}px"><b>${i + 1}</b>${n}</div>`).join('');
const SQ = [['CURD BACTERIUM', 'AUGCCAGUACGU', BA, 26], ['HOT SPRING MICROBE', 'AUGGCACUUCGA', AR, -40], ['YEAST', 'AUGGCACUGCGA', EU, 58]];
$('#sqs').innerHTML = SQ.map(([n, s, c], r) => `<div class="sq" id="sq${r}" style="left:36px;top:${176 + r * 78}px;width:960px"><div class="nm" style="color:${c}">${n}</div>${[...s].map((b, k) => `<div class="bs" id="bs${r}${k}" style="left:${250 + k * 56}px">${b}</div>`).join('')}</div>`).join('');
const PAIRS = [[0, 1, 'Bacterium · hot spring'], [0, 2, 'Bacterium · yeast'], [1, 2, 'Hot spring · yeast']];
$('#dcs').innerHTML = PAIRS.map(([, , n], i) => `<div class="dc" id="dc${i}" style="top:${176 + i * 78}px">${n}<b id="dn${i}">0</b></div>`).join('');
const DIFF = PAIRS.map(([a, b]) => [...SQ[a][1]].map((ch, k) => ch !== SQ[b][1][k] ? 1 : 0));
const tSs = ['S2', 'S3', 'S4', 'S5'].map(id => T0(id) + 0.05);
const sS2 = $('#sS2');
const tree = [mk(sS2, 'path', { d: 'M736,520 V488 H904 V520', stroke: C.ink, 'stroke-width': 4, fill: 'none' }), mk(sS2, 'path', { d: 'M820,488 V456 H420 V520', stroke: C.ink, 'stroke-width': 4, fill: 'none' })];
const tLab = [[420, 'Bacteria', BA], [736, 'Archaea', AR], [904, 'Eukarya', EU]].map(([x, n, c]) => txt(sS2, x, 550, n.toUpperCase(), { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.5, 'font-weight': 600, fill: c }));
const tNote = txt(sS2, 1120, 500, '', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: AR });

/* ---------- D: three domains ---------- */
const LADR = ['DOMAIN', 'KINGDOM', 'PHYLUM', 'CLASS', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES'];
$('#lad').innerHTML = LADR.map((n, i) => `<span id="ld${i}">${n}</span>${i < 7 ? M.icon('arrowR', 18, C.dim, 2.4) : ''}`).join('');
const DM = [['Bacteria', 'The true bacteria, like the ones that turn milk into curd.', 'NO NUCLEUS', BA, 'D3'], ['Archaea', 'Microbes of harsh places: salty water, hot springs, marshes.', 'NO NUCLEUS', AR, 'D4'], ['Eukarya', 'Every organism with a nucleus: protists, fungi, plants, animals.', 'NUCLEUS', EU, 'D5']];
$('#dms').innerHTML = DM.map(([n, q, c, col], i) => `<div class="card dm" id="dm${i}" style="left:${160 + i * 544}px;border-top-color:${col}"><svg id="dmS${i}" width="512" height="200" style="position:absolute;left:0;top:0"></svg><div class="dn" style="color:${col}">${n}</div><div class="dq">${q}</div><div class="nuc" style="background:${mix('#FFFFFF', col, 0.15)};color:${col}">${c}</div></div>`).join('');
rod($('#dmS0'), 120, 60, 200, 90, mix('#FFFFFF', BA, 0.6), BA, 2, 9); rod($('#dmS0'), 330, 110, 110, 50, mix('#FFFFFF', BA, 0.6), BA, 4, 4);
rod($('#dmS1'), 110, 70, 180, 84, mix('#FFFFFF', AR, 0.6), AR, 7, 8); { const s = $('#dmS1'); mk(s, 'circle', { cx: 380, cy: 110, r: 46, fill: mix('#FFFFFF', AR, 0.4), stroke: AR, 'stroke-width': 4 }); mk(s, 'circle', { cx: 380, cy: 110, r: 36, fill: CYTO, stroke: '#3E9B5F', 'stroke-width': 2 }); mk(s, 'path', { d: 'M366,110 q7,-12 14,0 t14,0', stroke: NUC, 'stroke-width': 3, fill: 'none' }); }
{ const s = $('#dmS2'); mk(s, 'circle', { cx: 170, cy: 105, r: 72, fill: CYTO, stroke: '#3E9B5F', 'stroke-width': 4 }); mk(s, 'circle', { cx: 158, cy: 96, r: 26, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 }); mk(s, 'circle', { cx: 160, cy: 94, r: 9, fill: NUC });
  mk(s, 'ellipse', { cx: 208, cy: 136, rx: 22, ry: 11, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5 });
  [['amoeba', 300], ['mushroom', 360], ['leaf', 420]].forEach(([ic, x]) => { const f = document.createElementNS(nsv, 'foreignObject'); f.setAttribute('x', x - 4); f.setAttribute('y', 82); f.setAttribute('width', 52); f.setAttribute('height', 52); f.innerHTML = M.icon(ic, 44, EU, 2.2); s.appendChild(f); }); }

/* ---------- C: bacteria vs archaea ---------- */
const cRod = [rod($('#caS'), 150, 110, 480, 190, mix('#FFFFFF', BA, 0.55), BA, 11, 18), rod($('#cbS'), 150, 110, 480, 190, mix('#FFFFFF', AR, 0.55), AR, 13, 18)];
{ const s = $('#caS'); for (let k = 0; k < 15; k++) mk(s, 'line', { x1: 200 + k * 26, y1: 110, x2: 214 + k * 26, y2: 122, stroke: BA, 'stroke-width': 2.5 }); }
const LBC = [LBmake($('#caS'), [[330, 112, 300, 70, 'Wall with peptidoglycan', 'start'], [390, 205, 470, 350, 'No nucleus: DNA loose', 'start', [470, 330]]]),
  LBmake($('#cbS'), [[330, 112, 300, 70, 'A different cell wall', 'start'], [390, 205, 470, 350, 'No nucleus: DNA loose', 'start', [470, 330]]])];
const tLC = [[wt('C2', 'peptidoglycan'), wt('C2', 'nucleus')], [wt('C3', 'different'), wt('C3', 'nucleus')]];
$('#cas').innerHTML = `<div class="ctg" id="ct0" style="left:36px;top:420px">Example: the curd bacteria</div><div class="ctg" id="ct1" style="left:36px;top:478px;font-style:italic">Lactobacillus</div>`;
$('#cbs').innerHTML = `<div class="ctg" id="ct2" style="left:36px;top:420px">Example: methanogens</div><div class="ctg" id="ct3" style="left:36px;top:478px">Make methane in the gut of cows and buffaloes</div>`;
const th1 = PUC.think($('#th1'), { q: 'A microbe lives in a salt lake, far saltier than the sea. Bacteria or Archaea?', opts: ['Bacteria', 'Archaea'], right: 1, why: 'Archaea. Microbes of extremely salty places are halophiles, in Archaea.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:500 52px Poppins;color:var(--mute)">two without a nucleus, and one with</span>';

/* ---------- W: sort six organisms ---------- */
const BINS = [['Bacteria', BA], ['Archaea', AR], ['Eukarya', EU]], BX = i => 36 + i * 522;
$('#bins').innerHTML = BINS.map(([n, c], i) => `<div class="bin" id="bn${i}" style="left:${BX(i)}px"><div class="bh" style="background:${c}">${n}</div></div>`).join('');
const ORG = [['microbe', 'Curd bacterium', 0, BA, wt('W2', 'Bacteria')], ['microbe', 'Methanogen', 1, AR, wt('W3', 'Archaea')], ['microbe', 'Halophile', 1, AR, wt('W3', 'halophile')],
  ['microbe', 'Yeast', 2, EU, wt('W4', 'Eukarya')], ['amoeba', 'Amoeba', 2, EU, wt('W4', 'amoeba')], ['mango', 'Mango tree', 2, EU, wt('W4', 'mango')]];
$('#orgs').innerHTML = ORG.map(([ic, n, , c], i) => `<div class="org" id="og${i}">${M.icon(ic, 30, c, 2.2)}${n}</div>`).join('');
const slot = [0, 0, 0], SL = ORG.map(o => slot[o[2]]++);
const wS = $('#wS'), monL = mk(wS, 'path', { stroke: C.ink, 'stroke-width': 4, fill: 'none' }), monR = mk(wS, 'path', { stroke: C.ink, 'stroke-width': 4, fill: 'none' });
const tSplit = wt('W5', 'split');
const avW = PUC.avatar($('#sW'), { x: 1080 + 160 + 20, y: 270 + 230, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Monera split in two!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Archaea are just one more type of bacteria', right: 'Archaea are a separate domain, closer to Eukarya' });
const tS = $('#tS');
const xT = [mk(tS, 'path', { d: 'M300,200 V150 H430 V200', stroke: C.ink, 'stroke-width': 4, fill: 'none' }), mk(tS, 'path', { d: 'M365,150 V100 H120 V200', stroke: C.ink, 'stroke-width': 4, fill: 'none' })];
const xL = [[120, 'BACTERIA', BA], [300, 'ARCHAEA', AR], [430, 'EUKARYA', EU]].map(([x, n, c]) => txt(tS, x, 232, n, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, 'font-weight': 600, fill: c }));
const xNote = txt(tS, 365, 80, 'CLOSEST PAIR', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.5, 'font-weight': 600, fill: C.ok });
const where = PUC.where($('#wa'), { on: [], type: 'Not in the current NCERT text. Who proposed it; which domain an organism is in' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 860,
  q: 'Which statements are correct?<div class="sl"><b>I</b>Woese and co-workers proposed three domains in 1990.</div><div class="sl"><b>II</b>A domain is a rank above kingdom.</div><div class="sl"><b>III</b>Kingdom Fungi falls in the domain Archaea.</div><div class="sl"><b>IV</b>The domains rest on ribosomal RNA sequences.</div>',
  opts: ['I and III only', 'II and III only', 'I, II and III only', 'I, II and IV only'], right: 3, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b> (I, II, IV)'], ['<b style="color:var(--red)">III</b> is false'], ['Fungi: nucleus, so Eukarya'], ['<b style="color:var(--ok)">I, II, IV</b> are true']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Three'), wt('A2', 'Fungi'), wt('A3', 'One')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · the three domains', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: [`<b>Three domains</b> (Woese and co-workers, 1990): <b style="color:${BA}">Bacteria</b> · <b style="color:${AR}">Archaea</b> · <b style="color:${EU}">Eukarya</b>`, '<b>Domain</b>: the rank above kingdom',
    '<b>Basis</b>: ribosomal RNA, found in every cell', `<b style="color:${BA}">Bacteria</b>, <b style="color:${AR}">Archaea</b>: no nucleus, different cell walls`,
    `<b style="color:${EU}">Eukarya</b>: nucleus · protists, fungi, plants, animals`, '<b>Monera</b> split into Bacteria and Archaea'] });
const YQ = ['Name the three domains of life.', 'Why did Woese compare ribosomal RNA, not cell shape?', 'Which old kingdom was split across two domains?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 11', topic: 'Why a mushroom is not a plant: Basis of Biological Classification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.1, 1.05, 960, 580], [T0('S5') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const g = $('#tgh'); g.style.left = (960 - g.offsetWidth / 2) + 'px'; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#tgh'), t, 1.2, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'microbes') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'happily') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = wt('H4', 'Under') - 0.15;
    M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hkL'), t, tH3, 1e9, { dy: 8 });
    if (M.vis(hsA, t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 })) {
      hsA.steam.forEach((s, k) => { const q = ((t * 0.35 + k * 0.21) % 1); attr(s, 'transform', `translate(0 ${(-q * 60).toFixed(1)})`); s.style.opacity = (q < 0.15 ? q / 0.15 : 1 - q).toFixed(2); });
      hsA.rods.forEach((r, k) => { r.style.opacity = M.clamp((t - wt('H3', 'bacteria') - k * 0.08) / 0.2); }); }
    M.vis($('#hkP'), t, wt('H3', 'asked') - 0.2, kOut, { ...POP, outDur: 0.25 });
    if (M.vis(hsB, t, kOut + 0.1, 1e9, { dy: 0, fade: 0.25 })) {
      const tIn = wt('H4', 'inside'), d = M.io((t - tIn) / 0.4);
      hsB.s0.rim.setAttribute('stroke', mix(C.ink, AR, d)); hsB.s1.rim.setAttribute('stroke', mix(C.ink, BA, d)); hsB.eq.textContent = t > tIn ? '≠' : '='; hsB.eq.setAttribute('fill', t > tIn ? C.red : C.mute); }
    M.vis($('#hkP2'), t, wt('H4', 'inside') - 0.1, 1e9, POP);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bgh'), t, tB1 + 0.5, 1e9, { dy: 8 });
    KG.forEach((_, i) => { const el = $('#kg' + i); M.vis(el, t, T0('B2') + i * 0.1, 1e9, { dy: 14 }); el.style.background = mix(C.soft, i ? '#EFE6F4' : C.ac2, M.io((t - tKg[i]) / 0.3)); });
    M.vis($('#kb0'), t, wt('B2', 'without') - 0.1, 1e9, POP); M.vis($('#kb1'), t, wt('B4', 'eukaryotes') - 0.1, 1e9, POP);
    M.vis(monB, t, wt('B2', 'Monera') + 0.3, 1e9, { dy: 16 }); monRods.forEach((r, k) => M.vis(r, t, wt('B2', 'Monera') + 0.5 + k * 0.05, 1e9, { ...POP, sc: 0.4 }));
    M.vis($('#blP'), t, wt('B4', 'Monera') - 0.1, 1e9, POP);
    M.vis($('#br'), t, T0('B3') - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis(pro, t, wt('B3', 'cell') - 0.1, 1e9, { dy: 16 }); M.vis(euk, t, wt('B3', 'nucleus', 1) - 0.2, 1e9, { dy: 16 });
    LBB.forEach((l, i) => LBrun(l, t, tLB[i])); M.vis(hdB[0], t, wt('B3', 'prokaryote') - 0.1, 1e9, { dy: 6 }); M.vis(hdB[1], t, wt('B3', 'eukaryote') - 0.1, 1e9, { dy: 6 });
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tS1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('S1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut, cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5); });
    LZ0.forEach((l, i) => LBrun(l, t, tLZ0[i])); LZ1.forEach((l, i) => LBrun(l, t, i === 3 ? T0('Z3') + 1.2 : tLZ1[i])); LZ2.forEach((l, i) => LBrun(l, t, tLZ2[i]));
    zCell.ribs.forEach((r, k) => attr(r, 'r', (9 * (1 + 0.6 * pulse(t, wt('Z2', 'ribosomes') + k * 0.02, 0.6))).toFixed(2)));
    // ribosome at work: the mRNA slides, the protein chain grows (loop)
    const lt = t - tZ[1]; rib.m.style.strokeDashoffset = (-(lt * 40) % 22).toFixed(1);
    rib.beads.forEach((b, k) => { const n = (lt * 2.2) % 11; b.style.opacity = k < n ? 1 : 0; });
    rna.forEach((b, k) => M.vis(b, t, tZ[2] + 0.4 + k * 0.08, 1e9, { ...POP, sc: 0.3 }));
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'fair') - 0.2, out);
  }

  /* S: compare */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    M.vis($('#sw'), t, tS1 + 0.05, OUT('D1'), { dy: 36, ...o }); M.vis($('#sgh'), t, tS1 + 0.5, 1e9, { dy: 8 });
    let cur = -1; tSs.forEach((tt, k) => { if (t >= tt) cur = k; }); if (t >= T0('S6')) cur = 4;
    PSs.forEach((_, i) => { const el = $('#sp' + i), on = i === cur, done = i < cur; M.vis(el, t, tS1 + 0.3 + i * 0.08, 1e9, { dy: 12 });
      el.style.background = on ? C.ac : '#fff'; el.style.color = on ? '#fff' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      const b = el.querySelector('b'); b.style.background = on ? '#fff' : done ? C.ac2 : '#EEF0F4'; b.style.color = on || done ? C.ac : '#9AA0AC'; });
    const al = M.io((t - tSs[1] - 0.3) / 0.9), scan = M.clamp((t - tSs[2] - 0.4) / 3.0) * 12;
    SQ.forEach(([, s, , off], r) => { const row = $('#sq' + r); M.vis(row, t, tSs[0] + r * 0.2, 1e9, { dy: 10 }); row.style.left = (36 + off * (1 - al)).toFixed(1) + 'px';
      [...s].forEach((b, k) => { const el = $(`#bs${r}${k}`); M.vis(el, t, tSs[0] + 0.2 + r * 0.25 + k * 0.08, 1e9, { ...POP, sc: 0.5 });
        const anyDiff = DIFF[0][k] || DIFF[1][k] || DIFF[2][k], lit = scan > k ? 1 : 0, mine = anyDiff && (s[k] !== SQ[(r + 1) % 3][1][k] || s[k] !== SQ[(r + 2) % 3][1][k]);
        el.style.borderColor = lit && mine ? C.red : '#D9DCE3'; el.style.background = lit && mine ? '#FBE6E6' : '#fff'; el.style.color = BASE[b]; }); });
    PAIRS.forEach((_, i) => { const el = $('#dc' + i); M.vis(el, t, tSs[2] + 0.1 + i * 0.12, 1e9, { dx: 16, dy: 0 });
      const n = DIFF[i].slice(0, Math.floor(scan)).reduce((a, b) => a + b, 0); M.setT($('#dn' + i), String(n));
      el.style.background = mix(C.soft, i < 2 ? '#FBE6E6' : C.ac2, M.io((t - T0('S6') - 0.2) / 0.3)); });
    tree.forEach((p, i) => M.draw(p, t, tSs[3] + 0.3 + i * 0.9, 0.8)); tLab.forEach((l, i) => M.vis(l, t, tSs[3] + 0.2 + i * 0.1, 1e9, { dy: 6 }));
  }

  /* D: domains */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dst'), t, tD1 + 0.05, out, { dy: 30, ...o });
    LADR.forEach((_, i) => { const el = $('#ld' + i); M.vis(el, t, T0('D2') + i * 0.06, 1e9, POP); const on = i === 0 ? M.io((t - wt('D2', 'domain')) / 0.3) : 0;
      el.style.background = mix('#FFFFFF', C.ac, on); el.style.color = i === 0 ? mix('#9AA0AC', '#FFFFFF', on) : '#6B7280'; el.style.borderColor = i === 0 ? mix('#CBD0DA', C.ac, on) : '#CBD0DA'; });
    DM.forEach((d, i) => { const c = $('#dm' + i), ti = T0(d[4]) - 0.1; M.vis(c, t, T0('D1') + 1.2 + i * 0.15, out, { dy: 36, ...o });
      [c.querySelector('svg'), c.querySelector('.dq'), c.querySelector('.nuc')].forEach((e, k) => M.vis(e, t, ti + k * 0.2, 1e9, { dy: 12 }));
      c.style.borderTopColor = mix('#CBD0DA', d[3], M.io((t - ti) / 0.3)); c.querySelector('.dn').style.color = mix('#9AA0AC', d[3], M.io((t - ti) / 0.3)); });
  }

  /* C: compare + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#ca'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cb'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o });
    LBC.forEach((L, j) => L.forEach((l, i) => LBrun(l, t, tLC[j][i])));
    M.vis($('#ct0'), t, wt('C2', 'Example') - 0.1, 1e9, POP); M.vis($('#ct1'), t, wt('C2', 'curd') + 0.2, 1e9, POP);
    M.vis($('#ct2'), t, wt('C3', 'methanogens') - 0.1, 1e9, POP); M.vis($('#ct3'), t, wt('C3', 'methane') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC4 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Bacteria') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Microbes') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Three') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'two') - 0.1, 0.8);
  }

  /* W: sort */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wk'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    BINS.forEach((_, i) => M.vis($('#bn' + i), t, tW1 + 0.4 + i * 0.1, 1e9, { dy: 16 }));
    ORG.forEach(([, , b, c, tt], i) => { const el = $('#og' + i); M.vis(el, t, tW1 + 0.6 + i * 0.08, 1e9, { dy: 12 });
      const u = M.io((t - tt) / 0.7), x0 = 36 + i * 256, y0 = 150, x1 = BX(b) + 18 + (SL[i] % 2) * 238, y1 = 406 + Math.floor(SL[i] / 2) * 76;
      el.style.left = (x0 + (x1 - x0) * u).toFixed(1) + 'px'; el.style.top = (y0 + (y1 - y0) * u - Math.sin(Math.PI * u) * 40).toFixed(1) + 'px';
      el.style.background = mix(C.soft, mix('#FFFFFF', c, 0.16), u); });
    BINS.forEach((_, i) => $('#bn' + i).style.borderStyle = t > ORG.find(o => o[2] === i)[4] + 0.6 ? 'solid' : 'dashed');
    const mv = M.vis($('#mon'), t, wt('W5', 'Monera') - 0.1, 1e9, POP); $('#mon').style.left = (36 + 522 - 140 + 26).toFixed(1) + 'px';
    const g = 160 * M.io((t - tSplit) / 0.6), mid = 36 + 522 + 13 - 16;
    M.hide(monL, !mv); M.hide(monR, !mv); attr(monL, 'd', `M40,324 V312 H${(mid - g / 2).toFixed(1)}`); attr(monR, 'd', `M${(mid + g / 2).toFixed(1)},312 H1044 V324`);
    if (mv) { monL.setAttribute('stroke', t > tSplit ? BA : C.ink); monR.setAttribute('stroke', t > tSplit ? AR : C.ink); }
    avW(t, tSplit + 0.6, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Archaea') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'separate') - 0.2 });
    xL.forEach((l, i) => M.vis(l, t, wt('X3', 'separate') + i * 0.12, 1e9, { dy: 6 })); M.draw(xT[0], t, wt('X3', 'closer') - 0.1, 0.5); M.draw(xT[1], t, wt('X3', 'closer') + 0.4, 0.6); M.vis(xNote, t, wt('X3', 'Eukarya') - 0.1, 1e9, { dy: 4 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'If') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
