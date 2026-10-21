// PUC Biology Ep 15: Kingdom Fungi - Characteristics and Classification (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fb = el => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; return el; };
// canon: fungal wall (chitin) brown, hypha fill cream, nuclei violet, mould dark grey green, spores plum
const BR = '#2E2A24', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', CHIT = '#8C6D4F', HYF = '#F3EAD8', MOLD = '#4B5A4A', SPO = '#6E5A8A', BREAD = '#E6C48E', CRUST = '#A86F3A';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  bread: ['M4 10a5 4 0 0 1 3-6h10a5 4 0 0 1 3 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z', ci(9, 13, 1.2), ci(14, 11, 1), ci(13, 16, 1.3)],
  leafS: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', ci(11, 13, 1.2), ci(15, 9, 1)],
  mush: ['M3.5 11.5a8.5 7 0 0 1 17 0Z', 'M9.5 11.5v6.5a2.5 2.5 0 0 0 5 0v-6.5', ci(9, 8, 0.8), ci(14.5, 7, 0.8)],
  hypha: ['M2 12c4-4 6 4 10 0s6 4 10 0', 'M7 8.5v7', 'M17 8.5v7'],
  tube: ['M2 9h20v6H2Z', ci(7, 12, 1), ci(12, 12, 1), ci(17, 12, 1)],
  log: ['M3 15h16a2 2 0 0 1 0 4H3Z', 'M7 15c0-3 1-5 3-6', 'M12 15c0-2 2-4 4-4'],
  partner: [ci(8, 12, 4), ci(16, 12, 4), 'M12 12h0'],
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  sac: ['M8 21c-2-4-2-12 4-18 6 6 6 14 4 18Z', ci(12, 8, 1), ci(12, 12, 1), ci(12, 16, 1)],
  club: ['M9 21v-8a3 3 0 0 1 6 0v8', 'M10 10l-2-4', 'M14 10l2-4', ci(8, 5, 1.4), ci(16, 5, 1.4), 'M11.4 9.6 11 5', 'M12.6 9.6 13 5', ci(11, 4, 1.2), ci(13, 4, 1.2)],
  quest: ['M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01', ci(12, 12, 10)],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tZ1 = T0('Z1'), tK1 = T0('K1'), tL1 = T0('L1'), tP1 = T0('P1'), tP4 = T0('P4'), tT = T0('T1'), tW1 = T0('W1');
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
// a hypha tube from x0 to x1 at y (h tall); septa at given x; nuclei at given x
const hypha = (g, x0, x1, y, h, septa, nuc) => {
  mk(g, 'rect', { x: x0, y: y - h / 2, width: x1 - x0, height: h, rx: h / 2, fill: '#E9D9BF', stroke: CHIT, 'stroke-width': 5 });
  mk(g, 'rect', { x: x0 + 9, y: y - h / 2 + 9, width: x1 - x0 - 18, height: h - 18, rx: (h - 18) / 2, fill: '#FBF6EC' });
  septa.forEach(x => mk(g, 'line', { x1: x, y1: y - h / 2 + 2, x2: x, y2: y + h / 2 - 2, stroke: CHIT, 'stroke-width': 6 }));
  nuc.forEach((x, k) => { mk(g, 'ellipse', { cx: x, cy: y + (k % 2 ? 8 : -8), rx: 13, ry: 9, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 2 }); mk(g, 'circle', { cx: x, cy: y + (k % 2 ? 8 : -8), r: 3.5, fill: NUC }); });
};
// bread slice
const slice = (g, x, y, w, h) => { mk(g, 'path', { d: `M${x},${y + h} L${x},${y + h * 0.36} C${x - w * 0.06},${y - h * 0.02} ${x + w * 0.3},${y - h * 0.12} ${x + w * 0.5},${y + h * 0.08} C${x + w * 0.7},${y - h * 0.12} ${x + w * 1.06},${y - h * 0.02} ${x + w},${y + h * 0.36} L${x + w},${y + h} Z`, fill: BREAD, stroke: CRUST, 'stroke-width': 10, 'stroke-linejoin': 'round' }); };

/* ---------- title card ---------- */
const JOBS = [['bread', 'Spots on bread', 'AFTER A WEEK', 'bread'], ['leafS', 'Mustard leaves', 'WHITE SPOTS', 'mustard'], ['mush', 'A mushroom', 'AFTER THE RAIN', 'mushroom']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const JT = ['RHIZOPUS', 'ALBUGO', 'AGARICUS'];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="font-style:italic;background:${CHIT}">${JT[i]}</div></div>`).join('');
// hook: a slice of bread with mould spots that grow
const hs = $('#hkS'), hbG = mk(hs, 'g', {}), hsp = [];
{ mk(hbG, 'rect', { x: 36, y: 84, width: 712, height: 396, rx: 12, fill: '#F5EFE4' });
  mk(hbG, 'rect', { x: 36, y: 400, width: 712, height: 80, rx: 0, fill: '#E2D3BC' });
  slice(hbG, 190, 130, 400, 300);
  [[300, 260, 40], [440, 230, 30], [380, 340, 46], [500, 330, 26], [260, 360, 22], [470, 400, 18]].forEach(([x, y, r], k) => { const g = mk(hbG, 'g', {});
    mk(g, 'circle', { cx: x, cy: y, r, fill: k % 2 ? '#7E9C78' : MOLD, opacity: 0.85 }); for (let j = 0; j < 10; j++) { const a = j / 10 * 6.28; mk(g, 'line', { x1: x + r * 0.6 * Math.cos(a), y1: y + r * 0.6 * Math.sin(a), x2: x + (r + 8) * Math.cos(a), y2: y + (r + 8) * Math.sin(a), stroke: '#EDEFE8', 'stroke-width': 2 }); }
    hsp.push([g, x, y]); }); }

/* ---------- Z: bread -> spot -> mycelium -> one hypha ---------- */
const ZN = ['BREAD', 'MOULD SPOT', 'MYCELIUM', 'ONE HYPHA'], ZS = ['x1', 'x10', 'x100', 'x1,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Bread', 'Spots of mould on old bread.', 'The fungus feeds on the bread.'],
  ['RUNG 2 OF 4', 'Mould spot', 'A fuzz of fine threads, standing up.', 'Each thread is a hypha.'],
  ['RUNG 3 OF 4', 'Mycelium', 'The whole network of hyphae.', 'It spreads through the bread.'],
  ['RUNG 4 OF 4', 'One hypha', 'A thread with a chitin wall.', 'Coenocytic: no cross walls. Septate: cross walls.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Threads, not cells in a leaf!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[470, 250, 44], [520, 200, 40], [560, 260, 40], null], LAB = [];
{ const g = ZG[0]; slice(g, 300, 70, 460, 380);
  [[470, 250, 50], [600, 300, 34], [420, 360, 40], [650, 400, 24]].forEach(([x, y, r], k) => mk(g, 'circle', { cx: x, cy: y, r, fill: k % 2 ? '#7E9C78' : MOLD }));
  LAB[0] = [[470, 250, 230, 140, 'Mould spot', 'end'], [360, 420, 230, 400, 'Bread', 'end']]; }
const fuzz = [];
{ const g = ZG[1]; mk(g, 'rect', { x: 60, y: 380, width: 936, height: 120, fill: BREAD, stroke: CRUST, 'stroke-width': 4 });
  const r = M.rng(12); for (let k = 0; k < 40; k++) { const x = 120 + k * 21 + r() * 10, h = 120 + r() * 170; const p = mk(g, 'path', { d: `M${x},380 C${x + 10},${380 - h / 2} ${x - 10},${380 - h * 0.8} ${x + 4},${380 - h}`, stroke: '#8A8F86', 'stroke-width': 3, fill: 'none' }); fuzz.push([p, x, h]);
    if (k % 2 === 0) mk(g, 'circle', { cx: x + 4, cy: 380 - h, r: 7, fill: MOLD }); }
  LAB[1] = [[520, 200, 700, 90, 'Fine threads', 'start'], [300, 420, 160, 470, 'Bread surface', 'start']];
  LAB[1][1] = [300, 440, 420, 470, 'Bread surface', 'start']; }
{ const g = ZG[2], r = M.rng(21); const pts = [[120, 260]]; mk(g, 'rect', { x: 40, y: 40, width: 976, height: 446, rx: 20, fill: '#FBF3E4' });
  const br = (x, y, a, d) => { if (d > 5) return; const L = 70 + r() * 60, x2 = x + L * Math.cos(a), y2 = y + L * Math.sin(a); if (x2 < 60 || x2 > 1000 || y2 < 60 || y2 > 470) return;
    mk(g, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} Q${((x + x2) / 2 + 12).toFixed(1)},${((y + y2) / 2 - 10).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`, stroke: CHIT, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
    mk(g, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} Q${((x + x2) / 2 + 12).toFixed(1)},${((y + y2) / 2 - 10).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`, stroke: HYF, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
    br(x2, y2, a - 0.5 + r() * 0.2, d + 1); br(x2, y2, a + 0.5 - r() * 0.2, d + 1); };
  br(90, 270, 0, 0); br(90, 270, -0.4, 1); br(90, 270, 0.45, 1);
  LAB[2] = [[560, 260, 640, 470, 'Hypha (one thread)', 'start'], [300, 200, 200, 90, 'Mycelium (the network)', 'start']]; }
{ const g = ZG[3]; hypha(g, 90, 960, 170, 90, [], [180, 260, 340, 420, 500, 580, 660, 740, 820, 900]);
  hypha(g, 90, 960, 370, 90, [330, 600, 840], [210, 260, 460, 520, 720, 900]);
  txt(g, 92, 108, 'COENOCYTIC · NO CROSS WALLS', { 'font-size': 18, 'font-weight': 600, 'letter-spacing': 1.5, fill: CHIT });
  txt(g, 92, 452, 'SEPTATE · WITH CROSS WALLS', { 'font-size': 18, 'font-weight': 600, 'letter-spacing': 1.5, fill: CHIT });
  LAB[3] = [[760, 126, 780, 82, 'Cell wall (chitin)', 'start'], [420, 162, 520, 250, 'Many nuclei', 'start'], [600, 340, 660, 270, 'Cross wall', 'start']]; }
const LB = LAB.map((L, lv) => labels(ZG[lv], L));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'spots'), wt('Z2', 'bread')], [wt('Z3', 'threads'), wt('Z3', 'bread')], [wt('Z4', 'hyphae'), wt('Z4', 'mycelium')], [wt('Z5', 'chitin'), wt('Z5', 'nuclei'), wt('Z5', 'cross')]];

/* ---------- K: characteristics ---------- */
const KR = [['quest', 'Heterotrophic: cannot make food', ['K2', 'heterotrophic']], ['hypha', 'Made of hyphae (yeasts: one cell)', ['K2', 'yeasts']], ['log', 'Saprophytes: absorb from dead matter', ['K3', 'saprophytes']],
  ['leafS', 'Parasites: feed on the living', ['K3', 'parasites']], ['partner', 'Partners: lichens, mycorrhiza', ['K4', 'partnership']]];
$('#krs').innerHTML = KR.map(([ic, n], i) => `<div class="kr" id="kr${i}" style="top:${80 + i * 96}px"><i>${M.icon(ic, 30, CHIT, 2.2)}</i><span style="font-size:24px">${n}</span></div>`).join('');
const tKr = KR.map(k => wt(k[2][0], k[2][1]));
const FP = [['Saprophyte', 'absorbs food from dead matter', 'saprophytes'], ['Parasite', 'feeds on a living plant or animal', 'parasites'], ['Symbiont', 'lichen with algae, mycorrhiza with roots', 'partnership']];
$('#fps').innerHTML = FP.map(([n, w], i) => `<div class="fp" id="fp${i}" style="left:${36 + i * 242}px"><svg id="fpS${i}" width="228" height="200" style="position:absolute;left:0;top:0"></svg><div class="fn2">${n}</div><div class="fw2">${w}</div></div>`).join('');
const tFp = FP.map(f => wt(f[2] === 'partnership' ? 'K4' : 'K3', f[2]));
const fpA = [];
{ let s = $('#fpS0'); mk(s, 'path', { d: 'M24,150 L204,150 L204,180 L24,180 Z', fill: '#9A7454', stroke: BR, 'stroke-width': 3 }); for (let k = 0; k < 6; k++) mk(s, 'path', { d: `M${50 + k * 26},150 q6,-40 0,-70`, stroke: '#8A8F86', 'stroke-width': 3, fill: 'none' });
  fpA[0] = [0, 1, 2].map(k => mk(s, 'path', { d: `M${70 + k * 44},176 l0,-24 m-7,8 l7,-8 l7,8`, stroke: GOLD, 'stroke-width': 3, fill: 'none' }));
  s = $('#fpS1'); mk(s, 'path', { d: 'M40,150 C60,60 160,40 190,60 C190,120 120,160 40,150 Z', fill: '#8CC48F', stroke: BR, 'stroke-width': 3 }); fpA[1] = [[90, 110], [130, 90], [120, 130]].map(([x, y]) => mk(s, 'circle', { cx: x, cy: y, r: 9, fill: '#fff', stroke: '#9AA0AC', 'stroke-width': 2 }));
  s = $('#fpS2'); mk(s, 'circle', { cx: 80, cy: 100, r: 30, fill: '#8CC48F', stroke: BR, 'stroke-width': 3 }); for (let k = 0; k < 4; k++) mk(s, 'path', { d: `M${110 + k * 6},${70 + k * 18} q30,-6 60,10`, stroke: CHIT, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  fpA[2] = mk(s, 'path', { d: 'M110,140 C130,160 160,160 180,140', stroke: GOLD, 'stroke-width': 3, 'stroke-dasharray': '8 6', fill: 'none' }); }
// K5-K6: warm and humid; useful and harmful
const ku = $('#kuS'); { const th = mk(ku, 'g', {}); mk(th, 'rect', { x: 36, y: 84, width: 712, height: 120, rx: 14, fill: '#F6F1E6' }); }
const kuTx = txt(ku, 60, 136, 'WARM + HUMID = FUNGI GROW FAST', { 'font-size': 20, 'font-weight': 600, 'letter-spacing': 1.5, fill: CHIT });
const kuTx2 = txt(ku, 60, 176, 'a fridge keeps food cold, so mould grows slowly', { 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 500, fill: C.ink2 });
const US = [['Yeast', 'bread and beer', 0, 'Yeast'], ['Penicillium', 'antibiotics', 0, 'Penicillium'], ['Puccinia', 'wheat rust', 1, 'Puccinia']];
$('#uss').innerHTML = US.map(([n, w, bad], i) => `<div class="us" id="us${i}" style="top:${244 + i * 84}px"><em>${bad ? 'HARMFUL' : 'USEFUL'}</em><span class="${bad ? 'bad' : ''}" style="font-style:italic">${n}</span><span class="${bad ? 'bad' : ''}">${w}</span></div>`).join('');
const tUs = US.map(u => wt('K6', u[3]));

/* ---------- L: the four classes ---------- */
const GN = ['PHYCOMYCETES', 'ASCOMYCETES', 'BASIDIOMYCETES', 'DEUTEROMYCETES'];
$('#gch').innerHTML = GN.map((n, i) => `<span class="zc" id="gc${i}"><b><i>${i + 1}</i></b>${n}</span>${i < 3 ? `<span class="za" style="display:inline-flex">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const tGs = [T0('L2'), T0('L4'), T0('L6'), T0('L7')];
const GI = [['Phycomycetes', [['Water, damp wood, or parasites on plants', 'L2', 'water'], ['Mycelium coenocytic: no cross walls', 'L2', 'coenocytic'], ['Asexual spores inside a sporangium', 'L3', 'sporangium'], ['Gametes fuse: a zygospore', 'L3', 'zygospore']], 'Mucor · Rhizopus · Albugo'],
  ['Ascomycetes', [['The sac fungi', 'L4', 'sac'], ['Branched mycelium, with cross walls', 'L4', 'branched'], ['Conidia form outside, on conidiophores', 'L4', 'conidia'], ['Ascospores form inside an ascus', 'L4', 'ascospores']], 'Penicillium · yeast · Neurospora'],
  ['Basidiomycetes', [['Mushrooms, bracket fungi, puffballs', 'L6', 'Mushrooms'], ['Also rusts and smuts', 'L6', 'rusts'], ['Four basidiospores form outside, on a basidium', 'L6', 'Four']], 'Agaricus · Ustilago · Puccinia'],
  ['Deuteromycetes', [['The imperfect fungi', 'L7', 'imperfect'], ['Only asexual or vegetative stages known', 'L7', 'asexual'], ['Reproduce by conidia', 'L7', 'conidia']], 'Alternaria · Trichoderma']];
$('#gis').innerHTML = GI.map(([n, ls, ex], i) => { let y = 140; const rows = ls.map(([l], k) => { const h = l.length > 34 ? 66 : 36, s = `<div class="gl" id="gl${i}${k}" style="left:54px;width:422px;top:${y}px">${l}</div>`; y += h + 18; return s; }).join('');
  return `<div class="gI" id="gI${i}"><div class="lbl" style="left:36px;top:30px">CLASS ${i + 1} OF 4</div><div class="gn" style="font-size:36px">${n}</div>${rows}<div class="gx" id="gx${i}" style="background:${CHIT}">${ex}</div></div>`; }).join('');
const tGl = GI.map(([, ls]) => ls.map(([, id, w]) => wt(id, w)));
const tGx = [wt('L3', 'Examples'), wt('L5', 'Examples'), wt('L6', 'Examples'), wt('L7', 'Examples')];
const gS = $('#gS'), GA = [0, 1, 2, 3].map(() => mk(gS, 'g', {}));
const ovG = document.createElement('div'); ovG.style.cssText = 'position:absolute;left:36px;top:96px;width:984px;height:400px';
ovG.innerHTML = `<div class="lbl" style="position:absolute;left:0;top:0">SORTED BY THREE THINGS</div>` + [['hypha', 'The mycelium', 'mycelium'], ['sac', 'How spores form', 'spores'], ['mush', 'The fruiting body', 'fruiting']].map(([ic, n], i) => `<div id="ov${i}" style="position:absolute;left:${i * 328}px;top:48px;width:310px;height:300px;border-radius:14px;background:var(--soft)"><div style="position:absolute;left:0;width:310px;top:56px;display:flex;justify-content:center">${M.icon(ic, 88, CHIT, 2)}</div><div style="position:absolute;left:0;width:310px;top:196px;text-align:center;font:700 28px Poppins;white-space:nowrap">${n}</div></div>`).join('');
$('#gd').appendChild(ovG);
const tOv = [wt('L1', 'mycelium'), wt('L1', 'spores'), wt('L1', 'fruiting')];
const ovI = document.createElement('div'); ovI.style.cssText = 'position:absolute;left:0;top:0;width:512px;height:526px';
ovI.innerHTML = `<div class="lbl" style="left:36px;top:30px">KINGDOM FUNGI</div><div style="position:absolute;left:36px;top:70px;font:600 120px/1 'IBM Plex Mono';color:${CHIT}">4</div><div style="position:absolute;left:36px;top:206px;font:700 40px Poppins">classes</div><div style="position:absolute;left:36px;top:268px;width:440px;font:500 24px/1.35 Poppins;color:var(--ink2)">Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes</div>`;
$('#gi').appendChild(ovI);
const ph = {}, as = {}, ba = {}, de = {};
{ const g = GA[0]; hypha(g, 60, 620, 400, 60, [], [120, 190, 260, 330, 400, 470, 540]);
  mk(g, 'path', { d: 'M340,370 L340,210', stroke: CHIT, 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M340,370 L340,210', stroke: HYF, 'stroke-width': 7 });
  mk(g, 'circle', { cx: 340, cy: 160, r: 62, fill: '#EDE4F3', stroke: SPO, 'stroke-width': 5 });
  ph.sp = [0, 1, 2, 3, 4, 5, 6, 7].map(k => mk(g, 'circle', { r: 8, fill: SPO }));
  ph.zy = fb(mk(g, 'g', {})); mk(ph.zy, 'circle', { cx: 820, cy: 300, r: 46, fill: '#3E3550', stroke: BR, 'stroke-width': 4 }); for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; mk(ph.zy, 'circle', { cx: 820 + 46 * Math.cos(a), cy: 300 + 46 * Math.sin(a), r: 6, fill: '#3E3550' }); }
  ph.g1 = mk(g, 'circle', { r: 26, fill: '#EDE4F3', stroke: SPO, 'stroke-width': 4 }); ph.g2 = mk(g, 'circle', { r: 26, fill: '#EDE4F3', stroke: SPO, 'stroke-width': 4 });
  ph.lab = labels(g, [[200, 400, 140, 490, 'Coenocytic hypha', 'start'], [390, 120, 520, 80, 'Sporangium', 'start'], [820, 346, 820, 470, 'Zygospore', 'end', [820, 470]]]);
 }
{ const g = GA[1]; hypha(g, 60, 960, 440, 50, [240, 480, 720], [150, 360, 600, 840]);
  mk(g, 'path', { d: 'M250,416 L250,200', stroke: CHIT, 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M250,416 L250,200', stroke: HYF, 'stroke-width': 7 });
  as.con = [0, 1, 2, 3, 4].map(k => fb(mk(g, 'circle', { cx: 250, cy: 184 - k * 30, r: 14, fill: '#7E9C78', stroke: BR, 'stroke-width': 2.5 })));
  mk(g, 'path', { d: 'M640,416 C600,330 600,180 660,110 C720,180 720,330 680,416 Z', fill: '#FBF6EC', stroke: CHIT, 'stroke-width': 5 });
  as.asp = [0, 1, 2, 3, 4, 5, 6, 7].map(k => fb(mk(g, 'ellipse', { cx: 660, cy: 150 + k * 32, rx: 14, ry: 11, fill: SPO })));
  as.lab = labels(g, [[250, 330, 330, 330, 'Conidiophore', 'start'], [264, 100, 400, 70, 'Conidia (outside)', 'start'], [700, 300, 760, 220, 'Ascus (a sac)', 'start'], [660, 342, 760, 380, 'Ascospores (inside)', 'start']]); }
{ const g = GA[2];
  mk(g, 'path', { d: 'M150,470 C154,420 156,380 160,340 L196,340 C200,380 202,420 206,470 Z', fill: HYF, stroke: BR, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M70,344 C84,240 272,240 286,344 Q178,360 70,344 Z', fill: '#B9805A', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M260,350 L460,200 M260,350 L460,470', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
  mk(g, 'rect', { x: 460, y: 100, width: 520, height: 390, rx: 18, fill: '#FBF6EC', stroke: C.line, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M680,470 L680,300 C680,250 780,250 780,300 L780,470', fill: '#E9D9BF', stroke: CHIT, 'stroke-width': 5 });
  ba.st = [[690, 270, 660, 210], [715, 258, 705, 190], [745, 258, 755, 190], [770, 270, 800, 210]].map(([a, b, c, d]) => mk(g, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: CHIT, 'stroke-width': 4 }));
  ba.sp = [[660, 196], [705, 176], [755, 176], [800, 196]].map(([x, y]) => fb(mk(g, 'ellipse', { cx: x, cy: y, rx: 16, ry: 12, fill: SPO })));
  ba.lab = labels(g, [[100, 320, 60, 140, 'Basidiocarp', 'start'], [690, 400, 610, 450, 'Basidium', 'end'], [800, 196, 840, 130, 'Basidiospores', 'start']]); }
{ const g = GA[3]; hypha(g, 60, 960, 440, 50, [300, 600], [180, 450, 760]);
  mk(g, 'path', { d: 'M450,416 L450,230', stroke: CHIT, 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M450,416 L450,230', stroke: HYF, 'stroke-width': 7 });
  de.con = [0, 1, 2, 3].map(k => fb(mk(g, 'circle', { cx: 450, cy: 214 - k * 30, r: 14, fill: '#7E9C78', stroke: BR, 'stroke-width': 2.5 })));
  de.q = fb(mk(g, 'g', {})); mk(de.q, 'rect', { x: 640, y: 120, width: 300, height: 150, rx: 16, fill: '#fff', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  txt(de.q, 790, 190, 'SEXUAL STAGE', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, 'letter-spacing': 1.5, fill: C.mute }); txt(de.q, 790, 230, 'NOT KNOWN', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, 'letter-spacing': 1.5, fill: C.red });
  de.lab = labels(g, [[464, 140, 560, 90, 'Conidia only', 'start'], [300, 440, 220, 340, 'Septate hypha', 'end']]); }

/* ---------- P: ascus vs basidium ---------- */
const pA = {}, pB = {};
{ const s = $('#paS'); mk(s, 'path', { d: 'M360,460 C300,360 300,170 392,90 C484,170 484,360 424,460 Z', fill: '#FBF6EC', stroke: CHIT, 'stroke-width': 6 });
  pA.sp = [0, 1, 2, 3, 4, 5, 6, 7].map(k => fb(mk(s, 'ellipse', { cx: 392, cy: 140 + k * 40, rx: 20, ry: 15, fill: SPO })));
  pA.lab = labels(s, [[470, 300, 560, 260, 'Ascus', 'start'], [392, 260, 220, 200, 'Ascospores', 'end']]); }
{ const s = $('#pbS'); mk(s, 'path', { d: 'M330,470 L330,280 C330,200 454,200 454,280 L454,470', fill: '#E9D9BF', stroke: CHIT, 'stroke-width': 6 });
  [[342, 240, 300, 150], [375, 222, 360, 120], [409, 222, 424, 120], [442, 240, 484, 150]].forEach(([a, b, c, d]) => mk(s, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: CHIT, 'stroke-width': 5 }));
  pB.sp = [[300, 134], [360, 102], [424, 102], [484, 134]].map(([x, y]) => fb(mk(s, 'ellipse', { cx: x, cy: y, rx: 20, ry: 15, fill: SPO })));
  pB.lab = labels(s, [[454, 380, 560, 380, 'Basidium', 'start'], [484, 134, 580, 160, 'Basidiospores', 'start']]); }
const th1 = PUC.think($('#th1'), { q: 'Puccinia, the wheat rust, makes basidiospores. Inside a sac, or outside on a club?', opts: ['Inside a sac', 'Outside on a club'], right: 1, why: 'Outside, on a club. Basidiospores always form on a basidium: Puccinia is a basidiomycete.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:600 32px Poppins;color:var(--ink)"><b style="color:' + CHIT + '">Basidio</b>, outside on a club.</span>';

/* ---------- W ---------- */
const WC = [['NO CROSS WALLS', 'Rhizopus', 'bread', 'PHYCOMYCETES', 'the bread mould', wt('W2', 'Phycomycetes')], ['ON MUSTARD LEAVES', 'Albugo', 'leafS', 'PHYCOMYCETES', 'a plant parasite', wt('W3', 'Phycomycetes')],
  ['ASCOSPORES IN SACS', 'Penicillium', 'sac', 'ASCOMYCETES', 'gives antibiotics', wt('W4', 'Ascomycetes')], ['SPORES ON A BASIDIUM', 'Agaricus', 'mush', 'BASIDIOMYCETES', 'a mushroom', wt('W5', 'Basidiomycetes')],
  ['SPORES ON A BASIDIUM', 'Ustilago', 'club', 'BASIDIOMYCETES', 'a smut', wt('W5', 'Basidiomycetes') + 0.25], ['NO KNOWN SEXUAL STAGE', 'Trichoderma', 'quest', 'DEUTEROMYCETES', 'imperfect fungi', wt('W6', 'Deuteromycetes')]];
const tWi = [wt('W2', 'Rhizopus'), wt('W3', 'Albugo'), wt('W4', 'Penicillium'), wt('W5', 'Agaricus'), wt('W5', 'Ustilago'), wt('W6', 'Trichoderma')];
$('#cols').innerHTML = WC.map(([h, n, ic, k, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2" style="font-size:12.5px">${h}</div><div class="it" id="it${i}"><div class="ic">${M.icon(ic, 68, CHIT, 2)}</div><div class="inm" style="font-style:italic">${n}</div></div>
  <div class="dz"></div><div class="kg" id="kg${i}" style="font-size:15px;background:${CHIT}">${k}</div><div class="rs" id="rs${i}">${r}</div></div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Deuteromycetes can never reproduce sexually', right: 'Their sexual stage is simply not known yet' });
const tSv = $('#tS'), tG = fb(mk(tSv, 'g', {}));
{ mk(tG, 'rect', { x: 40, y: 90, width: 190, height: 70, rx: 12, fill: '#fff', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); txt(tG, 135, 132, 'DEUTERO ?', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.mute, 'letter-spacing': 1.2 });
  mk(tG, 'path', { d: 'M236,124 L320,80 M236,124 L320,170', stroke: C.ok, 'stroke-width': 4, fill: 'none' });
  [['ASCO', 70], ['BASIDIO', 176]].forEach(([n, y]) => { mk(tG, 'rect', { x: 330, y: y - 30, width: 180, height: 56, rx: 12, fill: '#E2F3E9', stroke: C.ok, 'stroke-width': 3 }); txt(tG, 420, y + 6, n, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: '#1F6B3F', 'letter-spacing': 1.2 }); });
  txt(tG, 280, 250, 'WHEN THE SEXUAL STAGE IS FOUND', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, fill: C.mute, 'letter-spacing': 1 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Statements on hyphae and spores, or matching each fungus to its class' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, optY: 404, optW: 474,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Phycomycetes have aseptate, coenocytic mycelium.</div><div class="sl"><b>II</b>Ascospores form exogenously on conidiophores.</div><div class="sl"><b>III</b>Basidiospores form exogenously on a basidium.</div><div class="sl"><b>IV</b>Deuteromycetes reproduce only by conidia.</div>',
  opts: ['I and III only', 'II and IV only', 'I, II and III only', 'I, III and IV only'], right: 3 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Ascospores: inside the ascus'], ['Conidia: on conidiophores'], ['Endo = inside · exo = outside']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'Ascospores'), wt('A2', 'Conidia'), wt('A3', 'endogenous')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · kingdom Fungi', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Fungi</b>: heterotrophic · chitin walls · hyphae (yeasts: one cell)', '<b>Hyphae</b>: coenocytic or septate · the network is the mycelium', '<b>Phycomycetes</b>: coenocytic · zygospore · <i>Mucor, Rhizopus, Albugo</i>',
    '<b>Ascomycetes</b>: conidia outside · ascospores inside an ascus · <i>Penicillium</i>', '<b>Basidiomycetes</b>: four basidiospores on a basidium · <i>Agaricus</i>', '<b>Deuteromycetes</b>: imperfect · only conidia · <i>Alternaria, Trichoderma</i>'] });
const YQ = ['What is a coenocytic hypha?', 'Why are Deuteromycetes called imperfect fungi?', 'Name one example from each class of fungi.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 16', topic: 'Bread mould spreads: how? Nutrition and Reproduction in Fungi', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L6', 'Four') - 0.3, 1.04, 960, 580], [T0('L7') - 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tZ1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('Z1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'fungi') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'fungi') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(hbG, t, tH3 + 0.1, 1e9, { dy: 16 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hkL'), t, tH3, 1e9, { dy: 8 });
    const gr = wt('H3', 'Spots');
    hsp.forEach(([g, x, y], k) => { const u = M.o3((t - gr - k * 0.25) / 1.6); attr(g, 'transform', u <= 0 ? 'scale(0)' : `translate(${x} ${y}) scale(${(u * (1 + 0.05 * Math.sin(t * 2 + k))).toFixed(3)}) translate(${-x} ${-y})`); });
    M.vis($('#hkP'), t, wt('H3', 'Fuzzy') - 0.2, tH4 - 0.1, { ...POP, outDur: 0.2 }); M.vis($('#hkN'), t, tH4 + 0.1, 1e9, POP);
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
      const f = FOC[k] || [528, 263], sc = (k === 0 ? 1 : 0.35 + 0.65 * e) * (1 + 2.4 * x), cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      runLabs(LB[k], t, tLab[k]); if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    fuzz.forEach(([p, x, h], k) => attr(p, 'd', `M${x},380 C${(x + 10 + 4 * Math.sin(t * 2 + k)).toFixed(1)},${380 - h / 2} ${(x - 10 + 5 * Math.sin(t * 1.6 + k)).toFixed(1)},${380 - h * 0.8} ${x + 4},${380 - h}`));
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'cross') + 0.6, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tL1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('L1'), tKu = T0('K5') - 0.2;
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o });
    KR.forEach((_, i) => { const el = $('#kr' + i); M.vis(el, t, tKr[i] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tKr[i]) / 0.25) * (1 - M.io((t - (tKr[i + 1] ?? T1('K4') + 0.3)) / 0.25))); });
    M.vis($('#kb'), t, tFp[0] - 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kfeed'), t, tFp[0] - 0.3, tKu, { dy: 0, fade: 0.2, outDur: 0.25 });
    FP.forEach((_, i) => M.vis($('#fp' + i), t, tFp[i] - 0.15, 1e9, POP));
    fpA[0].forEach((a, k) => { const ph = ((t * 0.8 + k / 3) % 1); attr(a, 'transform', `translate(0 ${(-40 * ph).toFixed(1)})`); a.style.opacity = (1 - ph).toFixed(2); });
    fpA[1].forEach((c, k) => attr(c, 'r', (9 + 2 * Math.sin(t * 3 + k)).toFixed(1)));
    fpA[2].style.strokeDashoffset = (-(t * 30) % 14).toFixed(1);
    M.vis($('#kuse'), t, tKu + 0.1, 1e9, { dy: 16 });
    US.forEach((_, i) => M.vis($('#us' + i), t, tUs[i] - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* L: classes */
  const lOn = t >= tL1 - 0.1 && t < tP1 + 0.1; M.hide($('#sG'), !lOn);
  if (lOn) {
    const out = OUT('P1');
    M.vis($('#gch'), t, tL1, out, { dy: 12, ...o });
    M.vis($('#gd'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#gi'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tGs.forEach((tt, i) => { if (t >= tt - 0.2) cur = i; });
    GN.forEach((_, i) => { const el = $('#gc' + i), on = i === cur ? 1 : 0, done = i < cur;
      M.vis(el, t, tL1 + 0.3 + i * 0.12, 1e9, POP);
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      el.querySelector('b').style.background = on ? '#FFFFFF' : done ? C.ac : '#CBD0DA'; el.querySelector('b i').style.color = on ? C.ac : '#FFFFFF'; });
    GI.forEach((gI, i) => { M.vis($('#gI' + i), t, tGs[i] - 0.1, i < 3 ? tGs[i + 1] - 0.25 : 1e9, { dy: 18, outDur: 0.22, ody: -12 });
      gI[1].forEach((_, k) => M.vis($('#gl' + i + k), t, tGl[i][k] - 0.15, 1e9, { dx: -12, dy: 0 })); M.vis($('#gx' + i), t, tGx[i] - 0.1, 1e9, POP); });
    GA.forEach((g, i) => M.vis(g, t, tGs[i] - 0.05, i < 3 ? tGs[i + 1] - 0.25 : 1e9, { dy: 18, outDur: 0.22, ody: -12 }));
    M.vis(ovG, t, tL1 + 0.3, tGs[0] - 0.3, { dy: 16, outDur: 0.25 }); [0, 1, 2].forEach(i => { const el = $('#ov' + i); M.vis(el, t, tOv[i] - 0.15, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tOv[i]) / 0.25)); }); M.vis(ovI, t, tL1 + 0.4, tGs[0] - 0.3, { dy: 16, outDur: 0.25 });
    // 1 Phycomycetes: spores swirl inside the sporangium; two gametes fuse into a zygospore
    ph.sp.forEach((s, k) => { const a = k / 8 * 6.28 + t * 1.5, r = 34 + 8 * Math.sin(t * 2 + k); attr(s, 'cx', (340 + r * Math.cos(a)).toFixed(1)); attr(s, 'cy', (160 + r * Math.sin(a)).toFixed(1)); });
    { const tz = wt('L3', 'fuse'), u = M.io((t - tz + 0.2) / 1.0); attr(ph.g1, 'cx', (700 + 90 * u).toFixed(1)); attr(ph.g2, 'cx', (940 - 90 * u).toFixed(1)); attr(ph.g1, 'cy', 300); attr(ph.g2, 'cy', 300);
      const z = M.io((t - tz - 0.9) / 0.3); ph.g1.style.opacity = ph.g2.style.opacity = (1 - z).toFixed(2); M.vis(ph.zy, t, tz + 0.9, 1e9, { ...POP, sc: 0.4 }); }
    runLabs(ph.lab, t, [wt('L2', 'coenocytic'), wt('L3', 'sporangium'), wt('L3', 'zygospore')]);
    // 2 Ascomycetes: conidia bud outside one by one; ascospores form inside the ascus
    as.con.forEach((c, k) => M.vis(c, t, wt('L4', 'conidia') + k * 0.25, 1e9, { ...POP, sc: 0.2 }));
    as.asp.forEach((c, k) => M.vis(c, t, wt('L4', 'ascospores') + k * 0.15, 1e9, { ...POP, sc: 0.2 }));
    runLabs(as.lab, t, [wt('L4', 'conidiophores'), wt('L4', 'conidia') + 0.4, wt('L4', 'ascus'), wt('L4', 'ascospores') + 0.5]);
    // 3 Basidiomycetes: four basidiospores grow on the club
    ba.sp.forEach((s, k) => M.vis(s, t, wt('L6', 'basidiospores') + k * 0.2, 1e9, { ...POP, sc: 0.2 }));
    runLabs(ba.lab, t, [wt('L6', 'Mushrooms'), wt('L6', 'basidium'), wt('L6', 'basidiospores') + 0.6]);
    // 4 Deuteromycetes: conidia only, sexual stage unknown
    de.con.forEach((c, k) => M.vis(c, t, wt('L7', 'conidia') + k * 0.2, 1e9, { ...POP, sc: 0.2 }));
    M.vis(de.q, t, wt('L7', 'asexual') - 0.1, 1e9, { ...POP, sc: 0.8 });
    runLabs(de.lab, t, [wt('L7', 'conidia'), wt('L7', 'imperfect')]);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P4');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pb'), t, T0('P3') - 0.15, out, { dx: 60, dy: 0, ...o });
    pA.sp.forEach((s, k) => M.vis(s, t, wt('P2', 'inside') + k * 0.12, 1e9, { ...POP, sc: 0.2 })); runLabs(pA.lab, t, [wt('P2', 'sac'), wt('P2', 'spores')]);
    pB.sp.forEach((s, k) => M.vis(s, t, wt('P3', 'outside') + k * 0.18, 1e9, { ...POP, sc: 0.2 })); runLabs(pB.lab, t, [wt('P3', 'basidium'), wt('P3', 'outside') + 0.6]);
    M.vis($('#paP'), t, wt('P2', 'endogenous') - 0.3, 1e9, POP); M.vis($('#pbP'), t, wt('P3', 'exogenous') - 0.3, 1e9, POP);
    M.vis($('#th1'), t, tP4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tP4, tOpts: wt('P4', 'Inside') - 0.1, tCount: T1('P4') + 0.05, dur: 3, tAns: T0('P5') - 0.02, tWhy: wt('P5', 'Basidiospores') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Asco') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Basidio') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); const it = $('#it' + i);
      it.style.background = mix(C.soft, C.ac2, M.io((t - tWi[i]) / 0.25) * (1 - M.io((t - w[5] - 0.4) / 0.3)));
      M.vis($('#kg' + i), t, w[5] - 0.1, 1e9, { dy: -30, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[5] + 0.4, 1e9, { dy: 8 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Deuteromycetes') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'sexual') - 0.1 });
    M.vis(tG, t, wt('X3', 'found') - 0.2, 1e9, { ...POP, sc: 0.6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
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
