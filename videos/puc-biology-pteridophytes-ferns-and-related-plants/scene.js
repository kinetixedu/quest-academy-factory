// PUC Biology Ep 24: Pteridophytes - ferns and related plants (Living diagram, leaf green)
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
const BR = '#2E2A24', CHL = '#3E9B5F', MOSS = '#6DB27A', DARK = '#1F5E37', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', GAM = '#3E9B5F', SPO = '#A8742A', SPOF = '#E3C68E', SORI = '#9A6234', SOIL = '#B08A62';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const LBL = (g, px, py, lx, ly, s, an = 'start', el) => { const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const runL = (l, t, t0, tout = 1e9) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, tout, { ...POP, sc: 0.2, outDur: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - tout) / 0.2))).toFixed(3); l.ln.style.opacity = t > tout + 0.2 ? 0 : ''; };
// pinnate frond: rachis from (x,y) at angle ang (rad, 0 = up), length L
const frond = (g, x, y, L, ang, sc = 1, col = '#6DB27A') => { const pts = []; for (let k = 0; k <= 20; k++) { const u = k / 20, a = ang + 0.5 * u * Math.sign(ang || 0.001); pts.push([x + Math.sin(a) * L * u, y - Math.cos(a) * L * u]); }
  mk(g, 'path', { d: 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: '#4E7A34', 'stroke-width': 4 * sc, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 2; k < 20; k += 1.5) { const i = Math.floor(k), [px, py] = pts[i], u = i / 20, w = (1 - u) * 34 * sc + 8 * sc, a = ang + 0.5 * u * Math.sign(ang || 0.001), deg = a * 180 / Math.PI;
    [-1, 1].forEach(s => mk(g, 'ellipse', { cx: px + Math.cos(a) * s * w * 0.55, cy: py + Math.sin(a) * s * w * 0.55, rx: w * 0.55, ry: 6 * sc, fill: col, stroke: DARK, 'stroke-width': 1.5 * sc, transform: `rotate(${(deg + s * -18).toFixed(1)} ${(px + Math.cos(a) * s * w * 0.55).toFixed(1)} ${(py + Math.sin(a) * s * w * 0.55).toFixed(1)})` })); } };

Object.assign(M.IC, {
  fern: ['M12 22V4', 'M12 7 8 5', 'M12 7l4-2', 'M12 11 6.5 9', 'M12 11l5.5-2', 'M12 15 5 13', 'M12 15l7-2', 'M12 19 6 17.5', 'M12 19l6-1.5', 'M12 4c0-1.6 1.6-2 2.4-1'],
  horsetail: ['M12 22V3', 'M10 7h4', 'M10 11h4', 'M10 15h4', 'M10 19h4', 'M12 7l-5 3', 'M12 7l5 3', 'M12 11l-5 3', 'M12 11l5 3', 'M12 15l-4 3', 'M12 15l4 3'],
  floatfern: ['M2 16c3-1.5 5-1.5 8 0s5 1.5 8 0 3-1 4 0', 'M6 13c0-2 1.6-3.4 3-3.4S12 11 12 13', 'M12 13c0-2 1.6-3.4 3-3.4S18 11 18 13'],
  flower: [ci(12, 8, 2.2), 'M12 5.8C10 2 14 2 12 5.8', 'M14.2 8c3-1.4 3.6 2 0 0', 'M9.8 8c-3-1.4-3.6 2 0 0', 'M12 10.2V22'],
  seed: ['M12 3c5 3 6 9 3 14-1.6 2.6-4.4 2.6-6 0-3-5-2-11 3-14Z', 'M12 8v8'],
  spores: [ci(6, 8, 2), ci(12, 6, 2), ci(18, 9, 2), ci(8, 15, 2), ci(15, 15, 2), ci(12, 20, 1.6)],
  root: ['M12 3v9', 'M12 12l-5 8', 'M12 12l5 8', 'M12 15v6'],
  shade: ['M12 3v2', 'M4 12H2', 'M20 6l-2 2', 'M17 15a5 5 0 1 0-8-6', 'M3 20h18', 'M5 17h14'],
  pill: ['M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z', 'M8.5 8.5l7 7'],
  pot: ['M5 11h14l-2 10H7Z', 'M12 11V4', 'M12 7c-2-2-5-2-6 0', 'M12 6c2-2 5-2 6 0'],
  psilo: ['M12 22V12', 'M12 12 8 7', 'M12 12l4-5', 'M8 7 6 3', 'M8 7l2-4', 'M16 7l-2-4', 'M16 7l2-4'],
  selag: ['M4 20c4-2 6-6 8-10 2-4 5-6 8-6', 'M7 18l-1-2', 'M9 16l2 0', 'M11 13l-2-1', 'M13 10l2 1', 'M15 7l-1-2', 'M17 5h2', ci(20, 4, 1.6)],
  lyco: ['M12 22V5', 'M12 18l-3-2', 'M12 18l3-2', 'M12 14l-3-2', 'M12 14l3-2', 'M12 10l-3-2', 'M12 10l3-2', 'M11 5h2v-3h-2Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tR1 = T0('R1'), tT = T0('T1'), tS1 = T0('S1'), tS6 = T0('S6'), tL1 = T0('L1'), tC1 = T0('C1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tS1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['pot', 'A fern pot', 'IN THE CORRIDOR', 'fern'], ['horsetail', 'A horsetail', 'BY A STREAM', 'horsetail'], ['floatfern', 'A floating fern', 'ON A POND', 'floating']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('fern', 22, '#fff', 2.4)}PTERIDOPHYTE</div></div>`).join('');
// leaflet underside with sori (overlaid on the corridor card after the photo)
const gs = $('#gS');
mk(gs, 'rect', { x: 0, y: 0, width: 520, height: 390, rx: 12, fill: '#EEF4E8' });
const LFp = 'M40,200 C120,90 360,60 490,190 C360,320 120,310 40,200 Z';
mk(gs, 'path', { d: LFp, fill: '#9BCB8E', stroke: BR, 'stroke-width': 4 });
mk(gs, 'path', { d: 'M40,200 C200,180 360,180 490,190', stroke: '#E8F3E0', 'stroke-width': 5, fill: 'none' });
const HS = []; for (let k = 0; k < 7; k++) { const x = 120 + k * 46; [-1, 1].forEach(s => HS.push(mk(gs, 'circle', { cx: x, cy: 190 + s * 34 - (k > 4 ? 0 : 0), r: 10, fill: SORI, stroke: '#5C3A1C', 'stroke-width': 2 }))); }
const GLB = [LBL(gs, 258, 156, 300, 60, 'Brown dots', 'start')]; GLB[0].tx.setAttribute('class', 'zl');
const AM = [['flower', 'No flowers', 'never', wt('H2', 'flower')], ['seed', 'No seeds', 'never', wt('H2', 'seed')], ['spores', 'Spreads by spores', 'the dots are full of them', wt('H4', 'spores')]];
$('#ams').innerHTML = AM.map(([ic, n, d], i) => `<div class="dr" id="am${i}" style="top:${84 + i * 140}px"><i>${M.icon(ic, 34, i < 2 ? C.red : C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');

/* ---------- D: vascular tissue + the sporophyte ---------- */
const dl = $('#dlS'), DS = mk(dl, 'g', {});
mk(DS, 'rect', { x: 220, y: 90, width: 340, height: 440, rx: 30, fill: '#E6F2DF', stroke: BR, 'stroke-width': 4 });
const XY = mk(DS, 'rect', { x: 300, y: 104, width: 70, height: 412, rx: 14, fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3.5 });
const PH = mk(DS, 'rect', { x: 410, y: 104, width: 70, height: 412, rx: 14, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3.5 });
const WD = [0, 1, 2, 3, 4].map(() => mk(DS, 'path', { d: 'M0,-12 l-8,12 a9 9 0 1 0 16 0 Z', fill: WAT }));
const SG = [0, 1, 2, 3, 4].map(() => mk(DS, 'rect', { x: -9, y: -9, width: 18, height: 18, rx: 4, fill: GOLD }));
const DL = [LBL(dl, 335, 160, 180, 160, 'Xylem', 'end'), LBL(dl, 445, 160, 600, 160, 'Phloem', 'start')];
const dX1 = txt(dl, 120, 200, 'WATER UP', { 'text-anchor': 'middle', 'font-size': 15, fill: WAT, 'font-weight': 600, 'letter-spacing': 1.2 });
const dP1 = txt(dl, 664, 200, 'FOOD AROUND', { 'text-anchor': 'middle', 'font-size': 15, fill: GOLD, 'font-weight': 600, 'letter-spacing': 1.2 });
const tXy = wt('D2', 'xylem'), tPh = wt('D2', 'phloem'), tXw = wt('D2', 'Xylem', 0), tPf = wt('D2', 'Phloem', 0);
const DR = [['fern', 'Sporophyte', 'the main plant body', wt('D3', 'sporophyte')], ['root', 'True root, stem, leaves', 'real organs at last', wt('D3', 'true')], ['shade', 'Cool, damp, shady places', 'where most of them grow', wt('D4', 'cool')]];
$('#drs').innerHTML = DR.map(([ic, n, d], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="nm">${n}</div><div class="ds">${d}</div></div>`).join('');
const USE = [['Medicine', 'medicine'], ['Soil binders', 'soil'], ['Ornamentals', 'ornamental']];
const useD = document.createElement('div'); useD.style.cssText = 'position:absolute;left:36px;top:492px;display:flex;gap:12px'; useD.innerHTML = USE.map(([n], i) => `<span class="pillp" id="us${i}" style="position:relative;height:48px;font-size:22px">${n}</span>`).join(''); $('#dh').appendChild(useD);
const tUse = USE.map(u => wt('D4', u[1]));

/* ---------- Z: zoom ladder ---------- */
const ZN = ['FERN', 'LEAFLET', 'SORUS', 'SPORANGIUM'], ZS = ['x1', 'x4', 'x30', 'x200'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Fern', 'The sporophyte: root, stem, leaves.', 'Here: Diya\'s corridor fern.'],
  ['RUNG 2 OF 4', 'Leaflet', 'The underside of one leaflet.', 'Brown dots in rows beside the vein.'],
  ['RUNG 3 OF 4', 'Sorus', 'A cluster of sporangia.', 'Each tiny case holds spores.'],
  ['RUNG 4 OF 4', 'Sporangium', 'The case where spores are made.', 'Spore mother cells divide by meiosis.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Spore cases, not a disease!' });
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[640, 210, 50], [500, 222, 44], [520, 250, 54], null];
const LAB = [];
{ const g = ZG[0];
  mk(g, 'rect', { x: 40, y: 400, width: 976, height: 110, rx: 8, fill: SOIL });
  mk(g, 'path', { d: 'M200,430 C340,420 520,440 760,428', stroke: '#7A5222', 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 9; k++) { const x = 230 + k * 60; mk(g, 'path', { d: `M${x},${434} q${(k % 2 ? 10 : -10)},30 ${(k % 2 ? 4 : -6)},62`, stroke: '#7A5222', 'stroke-width': 3, fill: 'none' }); }
  frond(g, 330, 426, 300, -0.55, 1.05); frond(g, 470, 424, 360, -0.1, 1.15); frond(g, 600, 428, 320, 0.45, 1.05); frond(g, 720, 428, 220, 0.75, 0.9);
  mk(g, 'path', { d: 'M560,428 C560,380 590,360 600,372 C612,386 596,400 586,392', stroke: '#4E7A34', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  LAB[0] = [[300, 180, 150, 120, 'Frond (leaf)', 'end'], [700, 432, 820, 470, 'Rhizome (stem under soil)', 'end', [820, 470]], [320, 480, 150, 470, 'Roots', 'end'], [596, 374, 760, 330, 'Young frond, rolled up', 'start']];
  LAB[0][1] = [700, 432, 980, 470, 'Rhizome (stem under soil)', 'end']; }
{ const g = ZG[1];
  mk(g, 'path', { d: 'M60,250 C200,80 700,60 990,240 C700,420 200,420 60,250 Z', fill: '#9BCB8E', stroke: BR, 'stroke-width': 5 });
  mk(g, 'path', { d: 'M60,250 C400,232 700,232 990,240', stroke: '#E8F3E0', 'stroke-width': 7, fill: 'none' });
  for (let k = 0; k < 9; k++) { const x = 180 + k * 80; mk(g, 'path', { d: `M${x},240 q30,-60 70,-110`, stroke: '#CFE6C6', 'stroke-width': 3, fill: 'none' }); mk(g, 'path', { d: `M${x},240 q30,60 70,110`, stroke: '#CFE6C6', 'stroke-width': 3, fill: 'none' });
    [-1, 1].forEach(s => mk(g, 'circle', { cx: x + 22, cy: 240 + s * 40, r: 18, fill: SORI, stroke: '#5C3A1C', 'stroke-width': 2.5 })); }
  LAB[1] = [[500, 182, 520, 70, 'Sorus (brown dot)', 'start'], [820, 238, 860, 440, 'Vein', 'end'], [180, 140, 110, 70, 'Leaflet underside', 'start']]; }
const SPR = [];
{ const g = ZG[2];
  mk(g, 'rect', { x: 40, y: 380, width: 976, height: 130, fill: '#9BCB8E' });
  for (let k = 0; k < 13; k++) { const a = -1.2 + k * 0.2, x = 528 + Math.sin(a) * 250, y = 380 - Math.cos(a) * 230; const s = mk(g, 'g', {});
    mk(s, 'path', { d: `M528,380 Q${(528 + x) / 2},${(380 + y) / 2 + 30} ${x.toFixed(1)},${y.toFixed(1)}`, stroke: SPO, 'stroke-width': 4, fill: 'none' });
    mk(s, 'ellipse', { cx: x, cy: y, rx: 30, ry: 22, fill: SPOF, stroke: SPO, 'stroke-width': 3, transform: `rotate(${(a * 57).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})` }); SPR.push(s); }
  LAB[2] = [[528 + Math.sin(-0.2) * 250, 380 - Math.cos(-0.2) * 230, 700, 70, 'Sporangium', 'start'], [528, 360, 700, 440, 'Stalk', 'start']];
  FOC[2] = [528 + Math.sin(-0.2) * 250, 380 - Math.cos(-0.2) * 230, 48]; }
const SMC = [], TET = [];
{ const g = ZG[3];
  mk(g, 'path', { d: 'M528,500 L528,440', stroke: SPO, 'stroke-width': 14, 'stroke-linecap': 'round' });
  mk(g, 'ellipse', { cx: 528, cy: 270, rx: 260, ry: 180, fill: '#FBF3DE', stroke: SPO, 'stroke-width': 5 });
  const ring = []; for (let k = 0; k <= 24; k++) { const a = -Math.PI * 0.95 + k * Math.PI * 1.9 / 24; ring.push([528 + 260 * Math.cos(a), 270 + 180 * Math.sin(a)]); }
  for (let k = 0; k < 24; k++) mk(g, 'rect', { x: ring[k][0] - 12, y: ring[k][1] - 12, width: 24, height: 24, rx: 4, fill: '#C79A5A', stroke: SPO, 'stroke-width': 2, transform: `rotate(${(k * 7.9 - 80).toFixed(1)} ${ring[k][0].toFixed(1)} ${ring[k][1].toFixed(1)})` });
  [[420, 220], [560, 200], [640, 300], [470, 330], [540, 270]].forEach(([x, y], k) => { SMC.push(mk(g, 'circle', { cx: x, cy: y, r: 36, fill: '#E6F2DF', stroke: DARK, 'stroke-width': 3 }));
    const q = []; [[-14, -14], [14, -14], [-14, 14], [14, 14]].forEach(([dx, dy]) => q.push(mk(g, 'circle', { cx: x + dx, cy: y + dy, r: 15, fill: '#8FC994', stroke: DARK, 'stroke-width': 2.2 }))); TET.push(q); });
  LAB[3] = [[788, 270, 900, 120, 'Sporangium wall', 'end'], [470, 330, 300, 470, 'Spore mother cell', 'end'], [554, 186, 640, 70, 'Spores, made by meiosis', 'start']]; }
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, el]) => LBL(ZG[lv], px, py, lx, ly, s, an, el)));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'fronds'), wt('Z2', 'stem'), wt('Z2', 'roots'), wt('Z2', 'rolled')], [wt('Z3', 'brown'), wt('Z3', 'vein'), wt('Z3', 'leaflet')], [wt('Z4', 'sporangia'), wt('Z4', 'cases')], [wt('Z5', 'sporangium'), wt('Z5', 'mother'), wt('Z5', 'spores')]];
const tMeio = wt('Z5', 'meiosis');

/* ---------- R: five stages ---------- */
const RN = ['1 PROTHALLUS', '2 SEX ORGANS', '3 SWIM IN WATER', '4 ZYGOTE', '5 NEW FERN'];
$('#rch').innerHTML = RN.map((n, i) => `<span class="zc" id="rn${i}">${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const RP = [['Prothallus', 'The spore grows into a tiny, flat, green gametophyte that lives on its own.'], ['Sex organs', 'Antheridia (male) and archegonia (female) form under the prothallus.'],
  ['Swim in water', 'Antherozoids, the male gametes, swim through water to the archegonium.'], ['Zygote', 'One antherozoid fuses with the egg. The fused cell is the zygote.'], ['New fern', 'The zygote grows into the sporophyte, the big plant we see.']];
$('#rps').innerHTML = RP.map(([n, d], i) => `<div class="rp" id="rp${i}"><div class="lbl" style="left:0;top:30px">STAGE ${i + 1} OF 5</div><div class="rt">${n}</div><div class="rd">${d}</div></div>`).join('');
const tRs = ['R2', 'R3', 'R4', 'R5', 'R6'].map(id => T0(id));
const rs = $('#rS');
mk(rs, 'rect', { x: 40, y: 430, width: 920, height: 80, rx: 10, fill: SOIL });
const water = mk(rs, 'rect', { x: 40, y: 418, width: 920, height: 16, rx: 6, fill: '#BFDDEF', stroke: WAT, 'stroke-width': 2 });
const spr = mk(rs, 'circle', { cx: 500, cy: 0, r: 9, fill: '#8FC994', stroke: DARK, 'stroke-width': 2 });
const PRO = mk(rs, 'g', {}); mk(PRO, 'path', { d: 'M500,418 C400,418 330,380 340,320 C346,280 400,268 440,290 C460,300 480,296 500,276 C520,296 540,300 560,290 C600,268 654,280 660,320 C670,380 600,418 500,418 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 4 });
const ANT = [[400, 392], [430, 404], [600, 392], [570, 404]].map(([x, y]) => mk(rs, 'circle', { cx: x, cy: y, r: 10, fill: '#D7ECCF', stroke: DARK, 'stroke-width': 2.5 }));
const ARC = [[480, 300], [520, 300]].map(([x, y]) => { const g = mk(rs, 'g', {}); mk(g, 'path', { d: `M${x - 12},${y + 26} C${x - 14},${y + 10} ${x - 5},${y} ${x - 4},${y - 22} L${x + 4},${y - 22} C${x + 5},${y} ${x + 14},${y + 10} ${x + 12},${y + 26} Z`, fill: '#D7ECCF', stroke: DARK, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x, cy: y + 14, r: 7, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 2 }); return g; });
const zyg = mk(rs, 'circle', { cx: 480, cy: 314, r: 10, fill: SPOF, stroke: SPO, 'stroke-width': 3 });
const AZ = [0, 1, 2].map(k => { const g = mk(rs, 'g', {}); mk(g, 'path', { d: 'M-7,0 C-7,-5 7,-5 7,0 C7,5 -7,5 -7,0 Z', fill: GAM, stroke: DARK, 'stroke-width': 1.5 }); const f1 = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 2, fill: 'none' }); return { g, f1 }; });
const YF = mk(rs, 'g', {}); frond(YF, 480, 300, 250, -0.15, 0.85); mk(YF, 'path', { d: 'M480,300 q-20,40 -10,110', stroke: '#7A5222', 'stroke-width': 4, fill: 'none' });
const RL = [LBL(rs, 360, 330, 150, 240, 'Prothallus', 'end'), LBL(rs, 400, 392, 150, 330, 'Antheridium', 'end'), LBL(rs, 520, 300, 700, 210, 'Archegonium', 'start'), LBL(rs, 620, 412, 720, 470, 'Water film', 'start'), LBL(rs, 480, 314, 700, 300, 'Zygote', 'start'), LBL(rs, 430, 160, 250, 120, 'Young sporophyte', 'end')];
const tLand = wt('R2', 'lands'), tGrowP = wt('R2', 'prothallus'), tFuse = wt('R5', 'fuses'), tNew = wt('R6', 'grows');
const flag = (x, y, ang, len, ph) => { let d = `M${x},${y}`; for (let k = 1; k <= 8; k++) { const u = k / 8, px = x + Math.cos(ang) * len * u - Math.sin(ang) * 5 * Math.sin(u * 7 + ph), py = y + Math.sin(ang) * len * u + Math.cos(ang) * 5 * Math.sin(u * 7 + ph); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; } return d; };

/* ---------- S: homosporous vs heterosporous ---------- */
const sa = $('#saS'), SA = mk(sa, 'g', {});
mk(SA, 'ellipse', { cx: 392, cy: 350, rx: 200, ry: 140, fill: '#FBF3DE', stroke: SPO, 'stroke-width': 4.5 });
const HOM = []; { const r = M.rng(4); for (let k = 0; k < 22; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.82; HOM.push(mk(SA, 'circle', { cx: 392 + Math.cos(a) * d * 190, cy: 350 + Math.sin(a) * d * 125, r: 14, fill: '#8FC994', stroke: DARK, 'stroke-width': 2 })); } }
const saT = txt(sa, 392, 530, 'ALL SPORES ALIKE', { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.5, 'font-weight': 600 });
const sb = $('#sbS'), MEG = mk(sb, 'g', {}), MIC = mk(sb, 'g', {});
mk(MEG, 'ellipse', { cx: 200, cy: 300, rx: 130, ry: 100, fill: '#FBF3DE', stroke: SPO, 'stroke-width': 4 });
[[160, 260], [240, 260], [160, 340], [240, 340]].forEach(([x, y]) => mk(MEG, 'circle', { cx: x, cy: y, r: 32, fill: '#F6E7C4', stroke: GOLD, 'stroke-width': 3 }));
mk(MIC, 'ellipse', { cx: 560, cy: 300, rx: 130, ry: 100, fill: '#FBF3DE', stroke: SPO, 'stroke-width': 4 });
{ const r = M.rng(8); for (let k = 0; k < 40; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.85; mk(MIC, 'circle', { cx: 560 + Math.cos(a) * d * 115, cy: 300 + Math.sin(a) * d * 85, r: 7, fill: '#8FC994', stroke: DARK, 'stroke-width': 1.5 }); } }
const megT = txt(sb, 200, 436, 'MEGASPORES → FEMALE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1, 'font-weight': 600, fill: GOLD });
const micT = txt(sb, 560, 436, 'MICROSPORES → MALE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1, 'font-weight': 600, fill: DARK });
const emb = mk(sb, 'g', {}); mk(emb, 'circle', { cx: 200, cy: 300, r: 30, fill: SPOF, stroke: SPO, 'stroke-width': 3 }); txt(emb, 200, 306, 'EMBRYO', { 'text-anchor': 'middle', 'font-size': 11, fill: SPO, 'font-weight': 700 });
const embT = txt(sb, 200, 466, 'STAYS ON THE PARENT', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1, 'font-weight': 600, fill: C.ac });
const th1 = PUC.think($('#th1'), { q: 'Selaginella makes two kinds of spores, large and small. Homosporous or heterosporous?', opts: ['Homosporous', 'Heterosporous'], right: 1, why: 'Heterosporous. Hetero means different: two different kinds of spores.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">moss: gametophyte · <b>fern: sporophyte</b></span>';

/* ---------- L: leaves ---------- */
const la = $('#laS'), SEL = mk(la, 'g', {});
const sp = []; for (let k = 0; k <= 30; k++) { const u = k / 30; sp.push([140 + u * 480, 470 - 230 * u + 60 * Math.sin(u * 3)]); }
mk(SEL, 'path', { d: 'M' + sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L'), stroke: '#4E7A34', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
sp.forEach(([x, y], k) => { if (k > 25 || k < 1) return; [-1, 1].forEach(s => mk(SEL, 'ellipse', { cx: x, cy: y + s * 16, rx: 15, ry: 8, fill: MOSS, stroke: DARK, 'stroke-width': 1.5, transform: `rotate(${s * 40} ${x} ${y + s * 16})` })); });
const STR = mk(la, 'g', {}); { const [x, y] = sp[28]; for (let k = 0; k < 6; k++) mk(STR, 'path', { d: `M${x + k * 12},${y - k * 6 - 10} l12,6 l-12,6 l-12,-6 Z`, fill: '#C9D9A0', stroke: DARK, 'stroke-width': 2 }); }
const LAL = [LBL(la, sp[14][0], sp[14][1] + 12, 300, 500, 'Microphylls (small leaves)', 'start'), LBL(la, sp[28][0] + 30, sp[28][1] - 30, 560, 220, 'Strobilus (cone)', 'end')];
const lm = $('#lmS'), FRD = mk(lm, 'g', {}); frond(FRD, 392, 540, 360, 0.05, 1.3);
const LML = [LBL(lm, 430, 260, 620, 220, 'Macrophyll (a frond)', 'end')];
const eqC = document.createElement('div'); eqC.className = 'pillp'; eqC.style.cssText = 'left:36px;top:500px;height:44px;font-size:20px'; eqC.innerHTML = 'Strobili also in <i style="margin-left:6px">Equisetum</i>'; $('#la').appendChild(eqC);

/* ---------- C: four classes ---------- */
const CL = [['psilo', 'CLASS 1', 'Psilopsida', 'forked stems, almost no leaves', ['Psilotum'], 'C2', 'Psilopsida'], ['lyco', 'CLASS 2', 'Lycopsida', 'small leaves, cones', ['Selaginella', 'Lycopodium'], 'C2', 'Lycopsida'],
  ['horsetail', 'CLASS 3', 'Sphenopsida', 'jointed stems: horsetails', ['Equisetum'], 'C3', 'Sphenopsida'], ['fern', 'CLASS 4', 'Pteropsida', 'the ferns, with big fronds', ['Dryopteris', 'Pteris', 'Adiantum'], 'C3', 'Pteropsida']];
$('#clss').innerHTML = CL.map(([ic, a, b, c, ex], i) => `<div class="cls" id="cl${i}" style="left:${36 + i * 396}px"><div style="position:absolute;left:0;top:30px;width:376px;display:flex;justify-content:center">${M.icon(ic, 160, C.ac, 1.6)}</div><div class="a">${a}</div><div class="b">${b}</div><div class="c">${c}</div>
  ${ex.map((e, j) => `<div class="e" id="ce${i}${j}" style="top:${400}px;left:${20 + [0, 0, 0][j] + j * (e.length * 11 + 36)}px">${e}</div>`).join('')}</div>`).join('');
const tCl = CL.map(c => wt(c[5], c[6]));

/* ---------- W: sort ---------- */
const WI = [['Psilotum', 0, 'psilo', wt('W2', 'Psilotum')], ['Selaginella', 1, 'selag', wt('W3', 'Selaginella')], ['Lycopodium', 1, 'lyco', wt('W3', 'Lycopodium')], ['Equisetum', 2, 'horsetail', wt('W4', 'Equisetum')], ['Dryopteris', 3, 'fern', wt('W5', 'Dryopteris')], ['Adiantum', 3, 'fern', wt('W5', 'Adiantum')]];
$('#wcls').innerHTML = CL.map((c, i) => `<div class="wcl" id="wc${i}" style="left:${36 + i * 396}px"><div class="h">${c[2]}</div></div>`).join('');
const slot = [0, 0, 0, 0]; const WP = WI.map(([n, c]) => { const k = slot[c]++; return [36 + c * 396 + 20, 76 + 76 + k * 100]; });
$('#wits').innerHTML = WI.map(([n, c, ic], i) => `<div class="wit" id="wi${i}" style="left:${WP[i][0]}px;top:${WP[i][1]}px"><i>${M.icon(ic, 40, C.ac, 2)}</i>${n}</div>`).join('');
const avW = PUC.avatar($('#sW'), { x: 160 + 36 + 396 * 2, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Ferns get a class of their own.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'In pteridophytes the main plant is the gametophyte', right: 'The main plant is the sporophyte; the gametophyte is the tiny prothallus' });
const tS = $('#tS'), TF = mk(tS, 'g', {}); frond(TF, 150, 250, 210, -0.05, 0.8);
const TP = mk(tS, 'g', {}); mk(TP, 'path', { d: 'M330,250 C300,250 286,236 290,222 C292,212 306,210 316,216 C322,208 338,208 344,216 C354,210 368,212 370,222 C374,236 360,250 330,250 Z', fill: '#8FC994', stroke: DARK, 'stroke-width': 2.5 });
const tFl = txt(tS, 150, 30, 'SPOROPHYTE', { 'text-anchor': 'middle', 'font-size': 15, fill: C.ac, 'font-weight': 600, 'letter-spacing': 1.2 }), tPl = txt(tS, 330, 196, 'PROTHALLUS', { 'text-anchor': 'middle', 'font-size': 14, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 });
const where = PUC.where($('#wa'), { on: [], type: 'Assertion and reason, and match the class with its example' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ASSERTION AND REASON', qW: 900,
  q: '<div class="sl"><b>A</b>The spread of living pteridophytes is limited to<br><span style="margin-left:56px"></span>narrow geographical regions.</div><div class="sl"><b>R</b>Their gametophytes need cool, damp, shady places,<br><span style="margin-left:56px"></span>and fertilisation needs water.</div>',
  opts: ['Both true; R explains A', 'Both true; R does not explain A', 'A true; R false', 'A false; R true'], right: 0, optW: 474, optY: 380, optFs: 22 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], ['<b style="color:var(--ok)">A</b> and <b style="color:var(--ok)">R</b> are both true'], ['Prothallus: cool, damp shade'], ['Gametes swim in water'], ['So: narrow regions only']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 'A') + 0.05, wt('A1', 'Both'), wt('A2', 'prothallus'), wt('A2', 'water'), wt('A3', 'narrow')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · pteridophytes', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>First land plants with xylem and phloem</b>; no flowers, no seeds', '<b>Sporophyte</b> = main plant: true root, stem, leaves; sporangia on sporophylls', '<b>Prothallus</b>: small free-living gametophyte; water needed for fertilisation',
    '<b>Heterosporous</b>: Selaginella, Salvinia; a step towards the seed', '<b>Classes</b>: Psilopsida, Lycopsida, Sphenopsida, Pteropsida'] });
const YQ = ['What are the brown dots under a fern leaf?', 'What is a prothallus?', 'Name two heterosporous pteridophytes.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 25', topic: 'A pine cone from a hill trip: where are its seeds? Gymnosperms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const capsF = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR1 + 0.1, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'pteridophytes') - 0.2 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'flower') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const tLeaf = wt('H3', 'rows') - 0.2, kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, tLeaf, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.2 });
    M.vis($('#gS'), t, tLeaf + 0.2, kOut, { dy: 20, outDur: 0.25 });
    HS.forEach((d, k) => M.vis(d, t, tLeaf + 0.4 + (k >> 1) * 0.08, 1e9, { ...POP, sc: 0.2 })); runL(GLB[0], t, wt('H3', 'brown'));
    M.vis($('#hkP'), t, wt('H3', 'brown') - 0.1, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#hw'), t, kOut + 0.25, 1e9, { dy: 0, fade: 0.25 })) AM.forEach((a, i) => M.vis($('#am' + i), t, Math.max(a[3], kOut + 0.3) - 0.1 + i * 0.12, 1e9, { dx: -20, dy: 0 }));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(DS, t, wt('D2', 'vascular') - 0.2, 1e9, { dy: 20 });
    XY.style.opacity = M.clamp((t - tXy + 0.1) / 0.3); PH.style.opacity = M.clamp((t - tPh + 0.1) / 0.3);
    WD.forEach((d, k) => { const u = ((t - tXw) * 0.35 + k / 5) % 1; attr(d, 'transform', `translate(335 ${(500 - u * 380).toFixed(1)})`); d.style.opacity = t > tXw ? Math.min(1, (1 - u) * 4, u * 6).toFixed(2) : 0; });
    SG.forEach((d, k) => { const u = ((t - tPf) * 0.3 + k / 5) % 1; attr(d, 'transform', `translate(445 ${(120 + u * 380).toFixed(1)})`); d.style.opacity = t > tPf ? Math.min(1, (1 - u) * 4, u * 6).toFixed(2) : 0; });
    runL(DL[0], t, tXy); runL(DL[1], t, tPh); M.vis(dX1, t, tXw + 0.2, 1e9, { dy: 6 }); M.vis(dP1, t, tPf + 0.2, 1e9, { dy: 6 });
    M.vis($('#dh'), t, tPf + 0.8, out, { dx: 60, dy: 0, ...o });
    DR.forEach((d, i) => M.vis($('#dr' + i), t, d[3] - 0.15, 1e9, { dy: 16 }));
    USE.forEach((_, i) => M.vis($('#us' + i), t, tUse[i] - 0.1, 1e9, POP));
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
    const md = M.io((t - tMeio) / 0.6); SMC.forEach((c, k) => { c.style.opacity = (1 - md).toFixed(2); TET[k].forEach(q => q.style.opacity = md.toFixed(2)); });
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9; M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'spores') + 0.3, T0('Z5') + 1.4);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('T1');
    M.vis($('#rch'), t, tR1 + 0.1, out, { dy: 12, ...o });
    let si = -1; tRs.forEach((tt, i) => { if (t >= tt - 0.1) si = i; });
    RN.forEach((_, i) => { const el = $('#rn' + i), on = i === si ? 1 : 0, done = i < si; el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#rc'), t, tR1 + 0.2, out, { dy: 36, ...o });
    RP.forEach((_, i) => M.vis($('#rp' + i), t, tRs[i] + 0.05, i < 4 ? Math.min(tRs[i + 1], i === 3 ? 1e9 : 1e9) - 0.05 : T0('R7') - 0.1, { dy: 16, outDur: 0.2, ody: -10 }));
    const ld = M.io((t - tLand + 0.6) / 0.8); attr(spr, 'cy', (60 + 350 * ld).toFixed(1)); spr.style.opacity = t > tRs[0] - 0.2 && t < tGrowP + 0.5 ? 1 : 0;
    const pg = M.io((t - tGrowP) / 1.2); M.hide(PRO, pg <= 0); attr(PRO, 'transform', `translate(500 418) scale(${(0.05 + 0.95 * pg).toFixed(3)}) translate(-500 -418)`);
    const pf = M.io((t - tNew - 0.4) / 1.4); PRO.style.opacity = (1 - 0.6 * pf).toFixed(2);
    ANT.forEach((a, k) => M.vis(a, t, wt('R3', 'antheridia') + k * 0.1, 1e9, { ...POP, sc: 0.3 })); ARC.forEach((a, k) => M.vis(a, t, wt('R3', 'archegonia') + k * 0.15, 1e9, { ...POP, sc: 0.3 }));
    water.style.opacity = M.clamp((t - wt('R4', 'water') + 0.3) / 0.4);
    AZ.forEach((z, k) => { const st = tRs[2] + 0.2 + k * 0.5, u = M.clamp((t - st) / 2.4), x = M.lerp(400 + k * 15, 480, u), y = M.lerp(400, 330, u) + Math.sin(t * 7 + k) * 5 * (1 - u);
      z.g.style.opacity = t > st && t < tFuse + 0.4 ? 1 : 0; attr(z.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); attr(z.f1, 'd', flag(-7, 0, Math.PI + 0.4, 20, t * 10 + k)); });
    M.vis(zyg, t, tFuse + 0.3, tNew + 0.6, { ...POP, sc: 0.3, outDur: 0.3 });
    const yf = M.io((t - tNew) / 1.6); M.hide(YF, yf <= 0); attr(YF, 'transform', `translate(480 300) scale(${(0.05 + 0.95 * yf).toFixed(3)}) translate(-480 -300)`);
    const LT = [[tGrowP + 0.4, 1e9], [wt('R3', 'antheridia'), 1e9], [wt('R3', 'archegonia'), 1e9], [wt('R4', 'water'), 1e9], [wt('R5', 'zygote'), tNew + 0.5], [tNew + 1.0, 1e9]];
    RL.forEach((l, i) => runL(l, t, LT[i][0], LT[i][1]));
    M.vis($('#rW'), t, wt('R7', 'narrow') - 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tS1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tS1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'plant') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'sporophyte') - 0.1, 0.8);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S6');
    M.vis($('#sa'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(SA, t, wt('S2', 'homosporous') - 0.1, 1e9, { dy: 16 }); HOM.forEach((h, k) => M.vis(h, t, wt('S2', 'alike') - 0.3 + k * 0.03, 1e9, { ...POP, sc: 0.3 })); M.vis(saT, t, wt('S2', 'alike'), 1e9, { dy: 6 });
    M.vis($('#sb'), t, T0('S3') - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis(MEG, t, wt('S3', 'megaspores') - 0.1, 1e9, { dy: 16 }); M.vis(MIC, t, wt('S3', 'microspores') - 0.1, 1e9, { dy: 16 });
    M.vis(megT, t, wt('S4', 'female'), 1e9, { dy: 6 }); M.vis(micT, t, wt('S4', 'male'), 1e9, { dy: 6 });
    M.vis(emb, t, wt('S4', 'embryo'), 1e9, { dy: 0, fade: 0.3 }); M.vis(embT, t, wt('S4', 'parent'), 1e9, { dy: 6 });
    M.vis($('#sbP'), t, wt('S5', 'seed') - 0.2, 1e9, POP);
    M.vis($('#th1'), t, tS6 + 0.05, tL1 - 0.05, { dy: 36, outDur: 0.01 });
    th1(t, { tin: tS6, tOpts: wt('S6', 'Homosporous') - 0.1, tCount: T1('S6') + 0.05, dur: 3, tAns: T0('S7') - 0.02, tWhy: wt('S7', 'Hetero') });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('C1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write(SEL, t, wt('L1', 'Selaginella') - 0.2, 1.0); runL(LAL[0], t, wt('L1', 'microphylls'));
    M.vis(STR, t, wt('L2', 'cone') - 0.4, 1e9, { ...POP, sc: 0.4 }); runL(LAL[1], t, wt('L2', 'strobilus') - 0.2);
    M.vis(eqC, t, wt('L2', 'Equisetum'), 1e9, POP);
    M.vis($('#lm'), t, wt('L1', 'Ferns') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(FRD, t, wt('L1', 'Ferns'), 1e9, { dy: 24 }); runL(LML[0], t, wt('L1', 'macrophylls'));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cm'), t, tC1 + 0.05, OUT('W1'), { dy: 36, ...o });
    CL.forEach((c, i) => { const el = $('#cl' + i); M.vis(el, t, tCl[i] - 0.15, 1e9, { dy: 20 }); el.style.background = mix(C.soft, C.ac3, M.io((t - tCl[i]) / 0.3));
      c[4].forEach((e, j) => M.vis($('#ce' + i + j), t, wt(c[5], e) - 0.1, 1e9, POP)); });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    CL.forEach((_, i) => M.vis($('#wc' + i), t, tW1 + 0.3 + i * 0.08, 1e9, { dy: 12 }));
    WI.forEach((w, i) => M.vis($('#wi' + i), t, w[3] - 0.15, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 }));
    avW(t, wt('W5', 'ferns') + 0.3, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'main') - 0.2, tStrike: wt('X3', 'Not') - 0.05, tRight: wt('X3', 'sporophyte') - 0.3 });
    M.vis(TF, t, wt('X3', 'sporophyte') - 0.2, 1e9, { dy: 16 }); M.vis(tFl, t, wt('X3', 'sporophyte'), 1e9, { dy: 6 });
    M.vis(TP, t, wt('X3', 'prothallus') - 0.2, 1e9, { ...POP, sc: 0.3 }); M.vis(tPl, t, wt('X3', 'prothallus'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'assertion') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'assertion') - 0.2, tCount, tAns });
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
