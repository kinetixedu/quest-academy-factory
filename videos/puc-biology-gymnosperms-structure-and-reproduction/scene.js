// PUC Biology Ep 25: Gymnosperms - structure and reproduction (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
// SVG pops scale about their own centre (not the svg origin)
const _vis = M.vis; M.vis = (el, t, a, b, o = {}) => { if (o.sc != null && el instanceof SVGElement && !el.hasAttribute('transform') && !el._tb) { el._tb = 1; el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; } return _vis(el, t, a, b, o); };
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = '#2E2A24', CHL = '#3E9B5F', MOSS = '#6DB27A', DARK = '#1F5E37', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', SPO = '#A8742A', SPOF = '#E3C68E', PINE = '#3F7D4E', BARK = '#8B5A2B', CONE = '#A0672E', CONEF = '#C98F52', POL = '#E8C15A', FUN = '#8A7E6A', CYA = '#2F8F8F';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const LBL = (g, px, py, lx, ly, s, an = 'start', el) => { const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const runL = (l, t, t0, tout = 1e9) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, tout, { ...POP, sc: 0.2, outDur: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - tout) / 0.2))).toFixed(3); l.ln.style.opacity = t > tout + 0.2 ? 0 : ''; };
// pine cone: rows of overlapping scales on an ellipse
const cone = (g, x, y, w, h, n = 7) => { mk(g, 'ellipse', { cx: x, cy: y, rx: w / 2, ry: h / 2, fill: CONE, stroke: BR, 'stroke-width': 3 });
  for (let r = 0; r < n; r++) { const yy = y - h / 2 + (r + 0.6) * h / n, ww = w / 2 * Math.sqrt(Math.max(0.05, 1 - ((yy - y) / (h / 2)) ** 2)), m = Math.max(2, Math.round(ww / 12));
    for (let k = 0; k < m; k++) { const xx = x - ww + (k + 0.5 + (r % 2) * 0.5) * (2 * ww / m); if (xx > x + ww - 4) continue; mk(g, 'path', { d: `M${xx - ww / m},${yy - 4} Q${xx},${yy + h / n * 0.9} ${xx + ww / m},${yy - 4}`, fill: CONEF, stroke: BR, 'stroke-width': 1.8 }); } } };
const pineTree = (g, x, yb, h, sc = 1) => { mk(g, 'rect', { x: x - 8 * sc, y: yb - h * 0.3, width: 16 * sc, height: h * 0.3, fill: BARK, stroke: BR, 'stroke-width': 2.5 * sc });
  [[0.0, 0.42, 0.3], [0.22, 0.34, 0.55], [0.42, 0.26, 0.78]].forEach(([y0, w, y1]) => mk(g, 'path', { d: `M${x},${yb - h + y0 * h} L${x + w * h},${yb - h + y1 * h} L${x - w * h},${yb - h + y1 * h} Z`, fill: PINE, stroke: BR, 'stroke-width': 3 * sc, 'stroke-linejoin': 'round' })); };

Object.assign(M.IC, {
  cone: ['M12 3c4 2 6 6 6 10 0 4-3 8-6 8s-6-4-6-8c0-4 2-8 6-10Z', 'M8 9h8', 'M7 13h10', 'M8 17h8', 'M12 3v18'],
  cycas: ['M12 22V11', 'M12 11c-3-3-7-3-10-1', 'M12 11c3-3 7-3 10-1', 'M12 11c-2-4-5-6-8-6', 'M12 11c2-4 5-6 8-6', 'M12 11V4'],
  needles: ['M4 20 12 4', 'M8 20l4-16', 'M12 20V4', 'M16 20 12 4', 'M20 20 12 4'],
  tree: ['M12 22v-5', 'M12 2 5 12h4l-3 5h12l-3-5h4Z'],
  root: ['M12 3v9', 'M12 12l-5 8', 'M12 12l5 8', 'M12 15v6'],
  fungus: ['M3 12a9 7 0 0 1 18 0Z', 'M9.5 12v7a2.5 2.5 0 0 0 5 0v-7'],
  coral: ['M12 22v-6', 'M12 16c-3-1-5-4-5-8', 'M12 16c3-1 5-4 5-8', 'M7 8c-1-2-1-4 0-5', 'M7 8c2-1 3-3 3-5', 'M17 8c1-2 1-4 0-5', 'M17 8c-2-1-3-3-3-5'],
  seed: ['M12 3c5 3 6 9 3 14-1.6 2.6-4.4 2.6-6 0-3-5-2-11 3-14Z', 'M12 8v8'],
  pollen: [ci(12, 12, 4), ci(6, 12, 3.4), ci(18, 12, 3.4)],
  stemU: ['M12 22V6', 'M9 22h6', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  tall: ['M12 22V8', 'M12 2 8 8h8Z', 'M4 22h16', 'M19 22v-5', ci(19, 15, 1.2)],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tR1 = T0('R1'), tT = T0('T1'), tN2 = T0('N2'), tS1 = T0('S1'), tS4 = T0('S4'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tN2], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['cone', 'A pine cone', 'FROM A HILL TRIP', 'cone'], ['cycas', 'A cycas', 'IN THE CITY PARK', 'cycas'], ['needles', 'Tall pines', 'LEAVES LIKE NEEDLES', 'needles']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('seed', 22, '#fff', 2.4)}GYMNOSPERM</div></div>`).join('');
// hill scene: slopes, pines, and Aarav's cone dropping seeds
const gs = $('#gS');
mk(gs, 'rect', { x: 0, y: 0, width: 520, height: 390, rx: 12, fill: '#E4EEF3' });
mk(gs, 'path', { d: 'M0,220 C100,150 200,170 280,130 C360,100 450,140 520,120 L520,378 a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z', fill: '#B9D3A6' });
mk(gs, 'path', { d: 'M0,290 C160,250 340,270 520,240 L520,378 a12 12 0 0 1 -12 12 H12 a12 12 0 0 1 -12 -12 Z', fill: '#9CC48A' });
[[80, 230, 120], [150, 210, 140], [380, 170, 130], [450, 180, 110], [300, 200, 90]].forEach(([x, y, h]) => pineTree(gs, x, y, h, 0.8));
const HC = mk(gs, 'g', {}); cone(HC, 260, 300, 90, 130, 8);
mk(gs, 'path', { d: 'M248,236 L252,220 M272,236 L270,222', stroke: BARK, 'stroke-width': 4, 'stroke-linecap': 'round' });
const HSD = [0, 1, 2, 3].map(k => { const g = mk(gs, 'g', {}); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 7, ry: 5, fill: '#6B4A2A' }); mk(g, 'path', { d: 'M5,-2 C18,-10 30,-6 32,0 C26,4 14,4 5,2 Z', fill: '#D9B98A', stroke: '#8B6B44', 'stroke-width': 1.5 }); return g; });
const HL = [LBL(gs, 300, 300, 400, 330, 'Pine cone', 'start'), LBL(gs, 200, 340, 60, 330, 'Seed', 'end')];
HL.forEach(l => { l.tx.setAttribute('font-size', 20); });
const tShake = wt('H3', 'shook');

/* ---------- D ---------- */
const DR = [['tree', 'Trees and shrubs', 'medium or tall', wt('D2', 'medium')], ['tall', 'Sequoia', 'one of the tallest tree species', wt('D2', 'Sequoia')], ['root', 'Tap roots', 'one main root going down', wt('D3', 'tap')]];
$('#drs').innerHTML = DR.map(([ic, n, d], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 140}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="nm"${i === 1 ? ' style="font-style:italic"' : ''}>${n}</div><div class="ds">${d}</div></div>`).join('');
const dh = $('#dhS'), RP1 = mk(dh, 'g', {}), RP2 = mk(dh, 'g', {});
mk(dh, 'rect', { x: 36, y: 150, width: 712, height: 6, fill: '#B08A62' });
// Pinus root + fungal threads
mk(RP1, 'path', { d: 'M200,156 L200,470 M200,250 L130,330 M200,300 L270,380 M200,380 L150,450', stroke: BARK, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
const HY = []; { const r = M.rng(3); for (let k = 0; k < 16; k++) { const x = 120 + r() * 170, y = 200 + r() * 260; HY.push(mk(RP1, 'path', { d: `M${x.toFixed(0)},${y.toFixed(0)} q${(r() * 30 - 15).toFixed(0)},${(r() * 20 - 10).toFixed(0)} ${(r() * 50 - 25).toFixed(0)},${(r() * 40 - 20).toFixed(0)}`, stroke: FUN, 'stroke-width': 2.5, fill: 'none' })); } }
const rT1 = txt(dh, 200, 120, 'PINUS · MYCORRHIZA', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.2 });
// Cycas coralloid roots with cyanobacteria
mk(RP2, 'path', { d: 'M580,156 L580,470 M580,260 L650,340', stroke: BARK, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
const COR = mk(RP2, 'g', {}); [[520, 190], [640, 200], [560, 230]].forEach(([x, y]) => { for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.45; mk(COR, 'path', { d: `M${x},${y} l${(Math.cos(a) * 26).toFixed(1)},${(Math.sin(a) * 26).toFixed(1)}`, stroke: '#D9A060', 'stroke-width': 9, 'stroke-linecap': 'round' }); mk(COR, 'circle', { cx: x + Math.cos(a) * 28, cy: y + Math.sin(a) * 28, r: 6, fill: '#E9BB7A', stroke: BARK, 'stroke-width': 1.5 }); } });
const CYD = []; for (let k = 0; k < 9; k++) CYD.push(mk(RP2, 'circle', { cx: 520 + (k % 3) * 60 + (k > 5 ? 20 : 0), cy: 186 + Math.floor(k / 3) * 12 - 20, r: 4, fill: CYA }));
const rT2 = txt(dh, 580, 120, 'CYCAS · CORALLOID ROOTS', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.2 });
const DL = [LBL(dh, 250, 330, 330, 510, 'Fungus threads', 'start'), LBL(dh, 520, 176, 500, 300, 'Cyanobacteria', 'end'), LBL(dh, 640, 186, 700, 520, 'Fix nitrogen', 'end')];

/* ---------- Z: zoom ladder ---------- */
const ZN = ['PINE TREE', 'FEMALE CONE', 'SCALE', 'OVULE'], ZS = ['x1', 'x20', 'x60', 'x400'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Pine tree', 'The sporophyte, with two kinds of cones.', 'Pinus: both cones on one tree.'],
  ['RUNG 2 OF 4', 'Female cone', 'Scales in a spiral round an axis.', 'Each scale is a megasporophyll.'],
  ['RUNG 3 OF 4', 'Scale', 'One megasporophyll.', 'Two ovules sit on top, uncovered.'],
  ['RUNG 4 OF 4', 'Ovule', 'It will become the seed.', 'Inside: the female gametophyte.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Naked, right on the scale!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[700, 300, 46], [540, 250, 50], [460, 230, 44], null];
const LAB = [];
{ const g = ZG[0];
  mk(g, 'rect', { x: 500, y: 300, width: 34, height: 200, fill: BARK, stroke: BR, 'stroke-width': 3.5 });
  [[0, 330, 200, 120], [1, 270, 170, 100], [2, 210, 140, 80], [3, 150, 100, 60]].forEach(([k, y, w, h]) => { mk(g, 'path', { d: `M517,${y} L${517 - w},${y + h} L${517 + w},${y + h} Z`, fill: PINE, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
    for (let j = -3; j <= 3; j++) mk(g, 'path', { d: `M${517 + j * w / 4},${y + h - 6} l-6,-22 M${517 + j * w / 4},${y + h - 6} l6,-22`, stroke: '#2E5E3A', 'stroke-width': 2 }); });
  mk(g, 'path', { d: 'M517,100 L470,170 L564,170 Z', fill: PINE, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  [[360, 456], [380, 462], [660, 456]].forEach(([x, y]) => { for (let k = 0; k < 4; k++) mk(g, 'ellipse', { cx: x + k * 9, cy: y, rx: 5, ry: 10, fill: POL, stroke: BR, 'stroke-width': 1.8 }); });
  const fc = mk(g, 'g', {}); cone(fc, 700, 300, 46, 70, 5);
  LAB[0] = [[640, 280, 820, 150, 'Needle leaves', 'start'], [517, 470, 640, 500, 'Branched stem', 'start'], [372, 456, 220, 500, 'Male cones', 'end'], [700, 300, 840, 330, 'Female cone', 'start']]; }
{ const g = ZG[1];
  mk(g, 'path', { d: 'M528,40 L528,500', stroke: BARK, 'stroke-width': 10 });
  cone(g, 528, 270, 300, 420, 9);
  LAB[1] = [[540, 250, 660, 120, 'Scale (megasporophyll)', 'start'], [528, 470, 760, 470, 'Axis', 'start']]; }
{ const g = ZG[2];
  mk(g, 'path', { d: 'M180,380 C300,300 540,180 860,150 C880,190 860,240 820,260 C600,330 360,400 220,440 Z', fill: CONEF, stroke: BR, 'stroke-width': 5 });
  [[420, 260], [520, 228]].forEach(([x, y]) => { mk(g, 'ellipse', { cx: x, cy: y, rx: 44, ry: 30, fill: '#F3E6C4', stroke: SPO, 'stroke-width': 3.5, transform: `rotate(-20 ${x} ${y})` }); mk(g, 'ellipse', { cx: x, cy: y, rx: 24, ry: 15, fill: '#D7ECCF', stroke: DARK, 'stroke-width': 2, transform: `rotate(-20 ${x} ${y})` }); });
  LAB[2] = [[700, 210, 760, 380, 'Megasporophyll (scale)', 'end'], [420, 236, 300, 130, 'Ovule, uncovered', 'end'], [520, 204, 600, 100, 'Ovule', 'start']]; }
const ARCH = [];
{ const g = ZG[3];
  mk(g, 'path', { d: 'M528,470 C340,470 300,320 320,220 C336,140 420,90 500,86 L500,60 L556,60 L556,86 C636,90 720,140 736,220 C756,320 716,470 528,470 Z', fill: '#E9D3A2', stroke: SPO, 'stroke-width': 5 });
  mk(g, 'path', { d: 'M528,440 C380,440 350,320 366,236 C380,160 450,122 520,118 L536,118 C606,122 676,160 690,236 C706,320 676,440 528,440 Z', fill: '#DCEFD3', stroke: DARK, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M528,410 C420,410 400,330 410,270 C420,220 470,196 528,196 C586,196 636,220 646,270 C656,330 636,410 528,410 Z', fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 });
  [[490, 236], [566, 236]].forEach(([x, y]) => { const a = mk(g, 'g', {}); mk(a, 'path', { d: `M${x - 16},${y + 46} C${x - 20},${y + 20} ${x - 6},${y + 6} ${x - 5},${y - 14} L${x + 5},${y - 14} C${x + 6},${y + 6} ${x + 20},${y + 20} ${x + 16},${y + 46} Z`, fill: '#FFF7E3', stroke: BR, 'stroke-width': 2.5 }); mk(a, 'circle', { cx: x, cy: y + 30, r: 10, fill: NUC }); ARCH.push(a); });
  LAB[3] = [[528, 62, 380, 50, 'Opening of the ovule', 'end'], [330, 300, 200, 300, 'Envelope', 'end'], [380, 380, 200, 420, 'Nucellus', 'end'], [620, 360, 730, 440, 'Female gametophyte', 'start'], [566, 230, 780, 220, 'Archegonium with egg', 'start']]; }
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => LBL(ZG[lv], px, py, lx, ly, s, an, el)));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'needle'), wt('Z2', 'branched'), wt('Z2', 'male'), wt('Z2', 'female')], [wt('Z3', 'scales'), wt('Z3', 'spiral')], [wt('Z4', 'scale'), wt('Z4', 'ovules'), wt('Z4', 'naked')],
  [wt('Z5', 'ovule'), wt('Z5', 'envelope'), wt('Z5', 'nucellus'), wt('Z5', 'gametophyte'), wt('Z5', 'archegonia')]];

/* ---------- R: five stages ---------- */
const RN = ['1 POLLEN', '2 MEGASPORES', '3 POLLINATION', '4 POLLEN TUBE', '5 SEED'];
$('#rch').innerHTML = RN.map((n, i) => `<span class="zc" id="rn${i}">${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const RPT = [['Pollen grains', 'Microspores grow into pollen grains: male gametophytes of only a few cells.'], ['Four megaspores', 'Meiosis in the megaspore mother cell. One megaspore grows into the female gametophyte.'],
  ['Pollination', 'Air currents carry the pollen to the opening of the ovules.'], ['Pollen tube', 'It grows to the archegonia and releases the male gametes. One fuses with the egg.'], ['Naked seed', 'Zygote to embryo, ovule to seed. No ovary wall, so no fruit.']];
$('#rps').innerHTML = RPT.map(([n, d], i) => `<div class="rp" id="rp${i}"><div class="lbl" style="left:0;top:30px">STAGE ${i + 1} OF 5</div><div class="rt">${n}</div><div class="rd">${d}</div></div>`).join('');
const tRs = ['R2', 'R3', 'R4', 'R5', 'R6'].map(id => T0(id));
const rs = $('#rS');
const MC = mk(rs, 'g', {}); for (let k = 0; k < 5; k++) mk(MC, 'ellipse', { cx: 150 + (k % 2) * 34, cy: 160 + k * 52, rx: 26, ry: 30, fill: POL, stroke: BR, 'stroke-width': 2.5 }); mk(MC, 'path', { d: 'M167,130 L167,420', stroke: BARK, 'stroke-width': 6 });
const PG = [0, 1, 2, 3, 4, 5].map(() => { const g = mk(rs, 'g', {}); mk(g, 'circle', { cx: -11, cy: 0, r: 9, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2 }); mk(g, 'circle', { cx: 11, cy: 0, r: 9, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2 }); mk(g, 'circle', { cx: 0, cy: 0, r: 10, fill: POL, stroke: BR, 'stroke-width': 2 }); return g; });
// ovule (on its scale) on the right
const OV = mk(rs, 'g', {});
mk(OV, 'path', { d: 'M440,500 C520,470 760,440 960,420 L960,470 C760,490 520,520 440,526 Z', fill: CONEF, stroke: BR, 'stroke-width': 3 });
mk(OV, 'path', { d: 'M700,460 C580,460 556,360 568,290 C580,230 640,196 690,194 L690,170 L710,170 L710,194 C760,196 820,230 832,290 C844,360 820,460 700,460 Z', fill: '#E9D3A2', stroke: SPO, 'stroke-width': 4 });
mk(OV, 'path', { d: 'M700,440 C600,440 584,360 594,300 C604,250 650,222 700,222 C750,222 796,250 806,300 C816,360 800,440 700,440 Z', fill: '#DCEFD3', stroke: DARK, 'stroke-width': 2.5 });
const MMC = mk(rs, 'circle', { cx: 700, cy: 340, r: 30, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 });
const MEG = [0, 1, 2, 3].map(k => mk(rs, 'rect', { x: 684, y: 290 + k * 26, width: 32, height: 22, rx: 6, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2.5 }));
const FG = mk(rs, 'path', { d: 'M700,430 C630,430 616,370 624,320 C632,280 664,258 700,258 C736,258 768,280 776,320 C784,370 770,430 700,430 Z', fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 });
const RAR = [[676, 290], [724, 290]].map(([x, y]) => { const a = mk(rs, 'g', {}); mk(a, 'path', { d: `M${x - 12},${y + 36} C${x - 15},${y + 16} ${x - 4},${y + 4} ${x - 4},${y - 12} L${x + 4},${y - 12} C${x + 4},${y + 4} ${x + 15},${y + 16} ${x + 12},${y + 36} Z`, fill: '#FFF7E3', stroke: BR, 'stroke-width': 2 }); const e = mk(a, 'circle', { cx: x, cy: y + 24, r: 8, fill: NUC }); return { a, e }; });
const tube = mk(rs, 'path', { d: 'M700,176 C700,210 690,240 676,262', stroke: POL, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const MG = [0, 1].map(() => mk(rs, 'circle', { cx: 0, cy: 0, r: 6, fill: BR }));
const EMB = mk(rs, 'g', {}); mk(EMB, 'ellipse', { cx: 700, cy: 340, rx: 34, ry: 60, fill: '#B9DDA8', stroke: DARK, 'stroke-width': 3 }); mk(EMB, 'path', { d: 'M700,300 L700,380 M700,300 l-14,-14 M700,300 l14,-14', stroke: DARK, 'stroke-width': 3, fill: 'none' });
const RL = [LBL(rs, 176, 300, 240, 470, 'Male cone', 'start'), LBL(rs, 590, 260, 540, 180, 'Ovule', 'end'), LBL(rs, 684, 330, 540, 260, 'Four megaspores', 'end'), LBL(rs, 626, 350, 540, 330, 'Female gametophyte', 'end'),
  LBL(rs, 700, 186, 540, 100, 'Pollen tube', 'end'), LBL(rs, 668, 340, 540, 330, 'Embryo', 'end'), LBL(rs, 580, 410, 540, 430, 'Seed coat', 'end')];
RL.forEach(l => l.tx.setAttribute('class', 'zl'));
const tPol = wt('R2', 'pollen'), tMei = wt('R3', 'meiosis'), tOne = wt('R3', 'One'), tAir = wt('R4', 'Air'), tTube = wt('R5', 'tube'), tFuse = wt('R5', 'fuses'), tEmb = wt('R6', 'embryo'), tSeed = wt('R6', 'seed');

/* ---------- N: needle cross-section + steps ---------- */
const ns = $('#nS'), ND = mk(ns, 'g', {});
mk(ND, 'path', { d: 'M120,420 L664,420 A272 272 0 0 0 120,420 Z', fill: '#DCEFD3', stroke: BR, 'stroke-width': 4 });
const CUT = mk(ns, 'path', { d: 'M108,420 L676,420 A284 284 0 0 0 108,420 Z', fill: 'none', stroke: '#C9962B', 'stroke-width': 10, opacity: 0.85 });
mk(ND, 'circle', { cx: 392, cy: 360, r: 46, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 }); mk(ND, 'circle', { cx: 392, cy: 360, r: 20, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 2.5 });
const pits = [[-0.6], [0.0], [0.6]].map(([a]) => { const ang = -Math.PI / 2 + a, x = 392 + 272 * Math.cos(ang), y = 420 + 272 * Math.sin(ang); const g = mk(ns, 'g', {});
  mk(g, 'path', { d: `M${x - 18 * Math.cos(ang + Math.PI / 2)},${y - 18 * Math.sin(ang + Math.PI / 2)} L${x - 30 * Math.cos(ang)},${y - 30 * Math.sin(ang)} L${x + 18 * Math.cos(ang + Math.PI / 2)},${y + 18 * Math.sin(ang + Math.PI / 2)} Z`, fill: '#FFFFFF', stroke: BR, 'stroke-width': 3 }); return { g, x, y, ang }; });
const NDR = [0, 1, 2].map(() => mk(ns, 'path', { d: 'M0,-10 l-7,10 a8 8 0 1 0 14 0 Z', fill: WAT }));
const NL = [LBL(ns, 120, 420, 90, 520, 'Small surface', 'start'), LBL(ns, 600, 250, 660, 150, 'Thick cuticle', 'end'), LBL(ns, pits[1].x, pits[1].y + 30, 300, 110, 'Sunken stoma', 'end')];
const STEPS = [['A needle shape', 'a small surface, so less water escapes'], ['A thick cuticle', 'a waxy coat that holds the water in'], ['Sunken stomata', 'pores in pits, out of the dry wind']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${84 + i * 136}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['N3', 'N4', 'N5'].map(id => T0(id) + 0.35);

/* ---------- S: Pinus vs Cycas ---------- */
const sa = $('#saS'), PT = mk(sa, 'g', {}); pineTree(PT, 560, 520, 400, 1.2);
[[500, 320], [610, 360]].forEach(([x, y]) => { const c = mk(PT, 'g', {}); cone(c, x, y, 30, 46, 4); });
const PF = [['branch', 'Branched stem'], ['needles', 'Needle leaves'], ['fungus', 'Roots with a fungus'], ['cone', 'Both cones, one tree']];
Object.assign(M.IC, { branch: ['M12 22V4', 'M12 10 7 6', 'M12 14l5-4', 'M12 18l-4-3'] });
$('#pfs').innerHTML = PF.map(([ic, n], i) => `<div class="fch" id="pf${i}" style="top:${84 + i * 62}px"><i>${M.icon(ic, 24, C.ac, 2.2)}</i>${n}</div>`).join('');
const tPf = [wt('S2', 'branched'), wt('S2', 'needle'), wt('S2', 'fungus'), wt('S2', 'same')];
const sb = $('#sbS'), CY = mk(sb, 'g', {});
mk(CY, 'rect', { x: 548, y: 260, width: 44, height: 260, rx: 10, fill: '#9A7A52', stroke: BR, 'stroke-width': 3.5 });
for (let k = 0; k < 8; k++) mk(CY, 'line', { x1: 548, y1: 280 + k * 30, x2: 592, y2: 290 + k * 30, stroke: '#7A5A3A', 'stroke-width': 2 });
[[-1, 0.4], [-1, 0.9], [-1, 1.4], [1, 0.4], [1, 0.9], [1, 1.4], [0, 0]].forEach(([s, a]) => { const L = 170, ang = s === 0 ? -Math.PI / 2 : -Math.PI / 2 + s * a, x0 = 570, y0 = 262;
  const x1 = x0 + Math.cos(ang) * L, y1 = y0 + Math.sin(ang) * L * 0.8 + (s ? a * 40 : 0);
  mk(CY, 'path', { d: `M${x0},${y0} Q${(x0 + x1) / 2},${(y0 + y1) / 2 - 30} ${x1.toFixed(1)},${y1.toFixed(1)}`, stroke: '#4E7A34', 'stroke-width': 4, fill: 'none' });
  for (let j = 1; j < 11; j++) { const u = j / 11, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u - 30 * 4 * u * (1 - u) * 0.5; [-1, 1].forEach(q => mk(CY, 'line', { x1: px, y1: py, x2: px + q * 10 * Math.sin(ang) - 6 * Math.cos(ang), y2: py - q * 10 * Math.cos(ang) + 14, stroke: '#3F7D4E', 'stroke-width': 3, 'stroke-linecap': 'round' })); } });
const CF = [['stemU', 'No branches'], ['cycas', 'Compound leaves'], ['coral', 'Coralloid roots'], ['cone', 'Male, female: two trees']];
$('#cfs').innerHTML = CF.map(([ic, n], i) => `<div class="fch" id="cf${i}" style="top:${84 + i * 62}px"><i>${M.icon(ic, 24, C.ac, 2.2)}</i>${n}</div>`).join('');
const tCf = [wt('S3', 'branches'), wt('S3', 'compound'), wt('S3', 'coralloid'), wt('S3', 'different')];
const th1 = PUC.think($('#th1'), { q: 'Male cones grow on one tree, and megasporophylls on another tree. Pinus or Cycas?', opts: ['Pinus', 'Cycas'], right: 1, why: 'Cycas. In Cycas the male and female parts grow on separate trees; in Pinus both cones grow on one tree.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">gametophytes stay inside the <b>sporophyte</b></span>';

/* ---------- W ---------- */
const GRP = [['PINUS', C.ac], ['CYCAS', '#7A5A3A'], ['BOTH', C.ink]];
const WC = [['Needle leaves', 'needles', 0, 'small surface', wt('W2', 'Needle')], ['Mycorrhiza', 'fungus', 0, 'roots + a fungus', wt('W2', 'mycorrhiza')],
  ['Coralloid roots', 'coral', 1, 'with cyanobacteria', wt('W3', 'Coralloid')], ['Unbranched stem', 'stemU', 1, 'one straight trunk', wt('W3', 'unbranched')],
  ['Naked seeds', 'seed', 2, 'no fruit around them', wt('W4', 'Naked')], ['Pollen grains', 'pollen', 2, 'reduced male gametophyte', wt('W4', 'pollen')]];
$('#grhs').innerHTML = GRP.map(([n, col], c) => `<div class="grh" id="gh${c}" style="left:${36 + c * 518}px;width:491px;background:${col}">${n}</div>`).join('');
$('#cols').innerHTML = WC.map(([n, ic, c, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="dz"></div>
  <div class="it" id="it${i}" style="background:${mix(GRP[c][1], '#FFFFFF', 0.86)}"><div class="ic">${M.icon(ic, 84, GRP[c][1], 2)}</div><div class="inm">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'My cone had naked seeds too.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The pollen grain is a male gamete', right: 'It is a reduced male gametophyte that carries the male gametes' });
const tS = $('#tS'), TP = mk(tS, 'g', {}); mk(TP, 'circle', { cx: 160, cy: 130, r: 46, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 }); mk(TP, 'circle', { cx: 300, cy: 130, r: 46, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 });
mk(TP, 'circle', { cx: 230, cy: 130, r: 56, fill: POL, stroke: BR, 'stroke-width': 3.5 }); const TG = [[212, 120], [246, 140]].map(([x, y]) => mk(tS, 'circle', { cx: x, cy: y, r: 10, fill: BR }));
const tPl = txt(tS, 230, 230, 'GAMETOPHYTE · CARRIES GAMETES', { 'text-anchor': 'middle', 'font-size': 15, fill: C.ac, 'letter-spacing': 1, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Match the following, and one line facts on roots, cones and pollen' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 860,
  q: 'Match column I with column II.<div class="mtc"><div><b>A</b>Coralloid roots<br><b>B</b>Mycorrhiza<br><b>C</b>One of the tallest trees<br><b>D</b>Pollen grain</div><div><b>i</b>Pinus roots with a fungus<br><b>ii</b>Reduced male gametophyte<br><b>iii</b>Cycas roots with cyanobacteria<br><b>iv</b>Sequoia</div></div>',
  opts: ['A-i, B-iii, C-iv, D-ii', 'A-iii, B-i, C-iv, D-ii', 'A-iii, B-i, C-ii, D-iv', 'A-iv, B-i, C-iii, D-ii'], right: 1, optW: 474, optY: 400, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['<b style="color:var(--ok)">A-iii</b> Cycas, cyanobacteria'], ['<b style="color:var(--ok)">B-i</b> Pinus, fungus'], ['<b style="color:var(--ok)">C-iv</b> Sequoia'], ['<b style="color:var(--ok)">D-ii</b> male gametophyte']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 'B') + 0.05, wt('A2', 'Coralloid'), wt('A2', 'Mycorrhiza'), wt('A3', 'Sequoia'), wt('A3', 'pollen')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · gymnosperms', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Naked seeds</b>: ovules not covered by an ovary wall; no fruit', '<b>Roots</b>: tap roots; Pinus mycorrhiza; Cycas coralloid (cyanobacteria)', '<b>Heterosporous</b>: male cones make pollen; female cones bear ovules',
    '<b>Pollen grain</b> = reduced male gametophyte; carried by air to the ovule', '<b>Pinus</b>: both cones on one tree · <b>Cycas</b>: on separate trees'] });
const YQ = ['Why are gymnosperm seeds called naked?', 'What lives inside the coralloid roots of Cycas?', 'How do pine needles save water?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 26', topic: 'A grass blade and a mango leaf: lines or a net? Angiosperms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const capsF = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR1 + 0.1, 1, 960, 540]]);
let geo = null;
const measure = () => { geo = 1; let x = 36; ['wb0', 'wop', 'wb1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 24; });
  [['wm0', 'wb0'], ['wm1', 'wb1']].forEach(([m, b]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft + bb.offsetWidth / 2 - e.offsetWidth / 2) + 'px'; }); };
// naked seeds on an open scale, drawn under the word card
const hw = $('#hwS'), HWG = mk(hw, 'g', {});
mk(HWG, 'path', { d: 'M120,450 C240,380 460,320 680,300 C690,330 676,360 650,370 C470,410 300,450 160,480 Z', fill: CONEF, stroke: BR, 'stroke-width': 4 });
[[330, 380], [440, 354]].forEach(([x, y]) => { mk(HWG, 'ellipse', { cx: x, cy: y, rx: 40, ry: 24, fill: '#6B4A2A', stroke: BR, 'stroke-width': 3, transform: `rotate(-14 ${x} ${y})` }); });
const hwL = LBL(hw, 440, 344, 560, 250, 'Seeds, uncovered', 'start');

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'gymnosperms') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'never') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#gS'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const sh = Math.sin((t - tShake) * 18) * 6 * M.clamp((t - tShake) / 0.2) * (1 - M.clamp((t - tShake - 1.2) / 0.3)); attr(HC, 'transform', `rotate(${sh.toFixed(2)} 260 240)`);
    HSD.forEach((s, k) => { const u = M.clamp((t - tShake - 0.3 - k * 0.25) / 1.6); attr(s, 'transform', `translate(${(240 + k * 14 - u * (40 + k * 18)).toFixed(1)} ${(320 + u * 50).toFixed(1)}) rotate(${(u * 200 + k * 40).toFixed(0)})`); s.style.opacity = t > tShake + 0.2 ? 1 : 0; });
    runL(HL[0], t, wt('H3', 'cone')); runL(HL[1], t, wt('H3', 'seeds'));
    M.vis($('#hkP'), t, wt('H3', 'fruit') - 0.4, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.25, 1e9, { dy: 0, fade: 0.25 })) {
      M.vis($('#wb0'), t, wt('H4', 'Gymnos') - 0.1, 1e9, POP); M.vis($('#wm0'), t, wt('H4', 'naked') - 0.1, 1e9, POP); M.vis($('#wop'), t, wt('H4', 'Sperma') - 0.25, 1e9, POP);
      M.vis($('#wb1'), t, wt('H4', 'Sperma') - 0.1, 1e9, POP); M.vis($('#wm1'), t, wt('H4', 'seed') - 0.1, 1e9, POP);
      M.vis(HWG, t, wt('H4', 'plants') - 0.3, 1e9, { dy: 20 }); runL(hwL, t, wt('H4', 'naked', 1)); M.vis($('#hwP'), t, wt('H4', 'naked', 1) + 0.2, 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DR.forEach((d, i) => M.vis($('#dr' + i), t, d[3] - 0.15, 1e9, { dy: 16 }));
    M.vis($('#dh'), t, wt('D3', 'Pinus') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(RP1, t, wt('D3', 'Pinus') - 0.1, 1e9, { dy: 16 }); M.vis(rT1, t, wt('D3', 'Pinus'), 1e9, { dy: 6 });
    HY.forEach((h, k) => M.draw(h, t, wt('D3', 'fungus') + k * 0.05, 0.4));
    runL(DL[0], t, wt('D3', 'mycorrhiza'));
    M.vis(RP2, t, wt('D4', 'Cycas') - 0.1, 1e9, { dy: 16 }); M.vis(rT2, t, wt('D4', 'coralloid'), 1e9, { dy: 6 });
    CYD.forEach((d, k) => { M.vis(d, t, wt('D4', 'Cyanobacteria') + k * 0.05, 1e9, { ...POP, sc: 0.3 }); attr(d, 'r', (4 + 1.2 * Math.sin(t * 4 + k)).toFixed(2)); });
    runL(DL[1], t, wt('D4', 'Cyanobacteria')); runL(DL[2], t, wt('D4', 'nitrogen'));
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tR1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('R1');
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
      LB[k].forEach((l, i) => runL(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    ARCH.forEach((a, k) => { const on = M.io((t - wt('Z5', 'egg') - k * 0.2) / 0.3) * (1 - M.io((t - wt('Z5', 'egg') - 0.9) / 0.4)); const x = [490, 566][k]; attr(a, 'transform', on > 0.001 ? `translate(${x} 260) scale(${(1 + 0.15 * on).toFixed(3)}) translate(${-x} -260)` : ''); });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'naked') + 0.3, T0('Z5') + 1.6);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('T1');
    M.vis($('#rch'), t, tR1 + 0.1, out, { dy: 12, ...o });
    let si = -1; tRs.forEach((tt, i) => { if (t >= tt - 0.1) si = i; });
    RN.forEach((_, i) => { const el = $('#rn' + i), on = i === si ? 1 : 0, done = i < si; el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#rc'), t, tR1 + 0.2, out, { dy: 36, ...o });
    RPT.forEach((_, i) => M.vis($('#rp' + i), t, tRs[i] + 0.05, i < 4 ? tRs[i + 1] - 0.05 : 1e9, { dy: 16, outDur: 0.2, ody: -10 }));
    M.vis(MC, t, tRs[0] + 0.1, 1e9, { dy: 16 }); M.vis(OV, t, tRs[1] - 0.1, 1e9, { dy: 16 });
    // pollen: forms at the male cone, waits, then drifts on the air to the ovule opening
    PG.forEach((p, k) => { const form = M.io((t - tPol - k * 0.12) / 0.4), fly = M.io((t - tAir - k * 0.2) / 2.2);
      const x0 = 210 + (k % 2) * 30, y0 = 170 + k * 46, x = M.lerp(x0, 700 + (k - 2.5) * 6, fly), y = M.lerp(y0, 170 - 10 * (k % 3), fly) - 60 * Math.sin(Math.PI * fly) + Math.sin(t * 3 + k) * 6 * (1 - fly);
      p.style.opacity = form * (t > tTube + 0.6 && k ? 0 : 1); attr(p, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(0.6 + 0.4 * form).toFixed(2)})`); });
    const mm = M.io((t - tMei) / 0.4), om = M.io((t - tOne) / 0.6);
    MMC.style.opacity = (t > tRs[1] ? 1 : 0) * (1 - mm); MEG.forEach((m, k) => { m.style.opacity = (mm * (k === 3 ? 1 : 1 - om)).toFixed(2); });
    const fg = M.io((t - tOne - 0.4) / 0.8); FG.style.opacity = (fg * (1 - M.io((t - tEmb) / 0.6))).toFixed(2); attr(FG, 'transform', `translate(700 430) scale(${(0.3 + 0.7 * fg).toFixed(3)}) translate(-700 -430)`);
    RAR.forEach((r, k) => { r.a.style.opacity = (M.clamp((t - tOne - 1.0 - k * 0.2) / 0.3) * (1 - M.io((t - tEmb) / 0.6))).toFixed(2); r.e.setAttribute('fill', k === 0 && t > tFuse + 0.2 ? SPO : NUC); });
    M.draw(tube, t, tTube - 0.1, 1.0); tube.style.opacity = (1 - M.io((t - tEmb) / 0.6)).toFixed(2);
    MG.forEach((g, k) => { const u = M.clamp((t - tTube - 0.6 - k * 0.2) / 1.0); attr(g, 'cx', M.lerp(700, 676 + k * 6, u).toFixed(1)); attr(g, 'cy', M.lerp(178, 270 + k * 8, u).toFixed(1)); g.style.opacity = t > tTube + 0.5 && t < tFuse + 0.4 ? 1 : 0; });
    M.vis(EMB, t, tEmb - 0.1, 1e9, { ...POP, sc: 0.3, sp: M.SOFT });
    const LT = [[tRs[0] + 0.4, 1e9], [tRs[1] + 0.3, 1e9], [tMei + 0.3, tOne + 0.5], [tOne + 0.8, tEmb], [tTube + 0.3, tEmb], [tEmb + 0.2, 1e9], [tSeed, 1e9]];
    RL.forEach((l, i) => runL(l, t, LT[i][0], LT[i][1]));
  }

  /* statement */
  const stOn = t >= tT && t < tN2 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tN2 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'gametophytes') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'sporangia') - 0.1, 0.8);
  }

  /* N */
  const nOn = t >= tN2 - 0.1 && t < tS1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    M.vis($('#nl'), t, tN2 + 0.1, OUT('S1'), { dx: -60, dy: 0, ...o }); M.vis($('#nr'), t, tN2 + 0.25, OUT('S1'), { dx: 60, dy: 0, ...o });
    M.vis(ND, t, tN2 + 0.4, 1e9, { dy: 20 });
    CUT.style.opacity = (0.85 * M.clamp((t - wt('N4', 'cuticle')) / 0.4)).toFixed(2);
    pits.forEach((p, k) => M.vis(p.g, t, wt('N5', 'sunken') + k * 0.12, 1e9, { ...POP, sc: 0.3 }));
    NDR.forEach((d, k) => { const ph = ((t - tSt[0]) * 0.5 + k / 3) % 1, p = pits[k], blocked = t > wt('N5', 'sunken') + 0.5;
      const r0 = 200, r1 = blocked ? 262 : 330, r = M.lerp(r0, r1, blocked ? Math.min(ph * 2, 1) : ph); attr(d, 'transform', `translate(${(392 + r * Math.cos(p.ang)).toFixed(1)} ${(420 + r * Math.sin(p.ang)).toFixed(1)})`);
      d.style.opacity = t > tSt[0] ? (blocked ? 1 : (1 - ph)).toFixed(2) : 0; });
    runL(NL[0], t, wt('N3', 'surface')); runL(NL[1], t, wt('N4', 'cuticle')); runL(NL[2], t, wt('N5', 'stomata'));
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.7); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tSt.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 136]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tW1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sa'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(PT, t, wt('S2', 'Pinus') - 0.1, 1e9, { dy: 20 });
    PF.forEach((_, i) => M.vis($('#pf' + i), t, tPf[i] - 0.1, 1e9, POP));
    M.vis($('#sb'), t, T0('S3') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(CY, t, wt('S3', 'Cycas') - 0.1, 1e9, { dy: 20 });
    CF.forEach((_, i) => M.vis($('#cf' + i), t, tCf[i] - 0.1, 1e9, POP));
    M.vis($('#th1'), t, tS4 + 0.05, tW1 - 0.05, { dy: 36, outDur: 0.01 });
    th1(t, { tin: tS4, tOpts: wt('S4', 'Pinus') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'In') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    GRP.forEach((_, c) => M.vis($('#gh' + c), t, tW1 + 0.3 + c * 0.1, 1e9, { dy: 10 }));
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.4 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.4, 1e9, { dy: 8 }); });
    avW(t, wt('W4', 'Every') + 0.3, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'pollen') - 0.2, tStrike: wt('X3', 'It') - 0.05, tRight: wt('X3', 'tiny') - 0.1 });
    M.vis(TP, t, wt('X3', 'gametophyte') - 0.2, 1e9, { ...POP, sc: 0.4 }); TG.forEach((g, k) => M.vis(g, t, wt('X3', 'carries') + k * 0.15, 1e9, { ...POP, sc: 0.2 })); M.vis(tPl, t, wt('X3', 'carries'), 1e9, { dy: 6 });
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
  capsF(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
