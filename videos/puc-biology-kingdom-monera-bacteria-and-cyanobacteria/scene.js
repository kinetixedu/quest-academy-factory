// PUC Biology Ep 13: Kingdom Monera - Bacteria and Cyanobacteria (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fb = el => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; return el; };
// canon colours; Monera teal is the kingdom colour from Ep 12 (bacterial cells drawn in it)
const BR = '#2E2A24', GRN = C.ac, NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', MITO = '#E58A3C', MON = '#0F8F8F', MONF = '#BFE3DF';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  bowl: ['M3 11h18a9 7 0 0 1-18 0Z', 'M8 21h8', 'M8 7c0-1.5 1.5-1.5 1.5-3', 'M13 7c0-1.5 1.5-1.5 1.5-3'],
  spring: ['M2 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M7 13c-1-2 1-3 0-5', 'M12 13c-1-2 1-3 0-5', 'M17 13c-1-2 1-3 0-5'],
  pond: ['M2 15c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M2 19c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', ci(7, 9, 1.4), ci(12, 7, 1.6), ci(16, 10, 1.2)],
  microbe: ['M5 9h10a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6Z', 'M18 12c1.2-1.6 2.4 1.6 3.6 0', 'M8 12h.01', 'M12 12h.01'],
  filament: [ci(4, 12, 2.2), ci(8.6, 12, 2.2), ci(13.2, 12, 2.6), ci(18, 12, 2.2)],
  sun: [ci(12, 12, 4), 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'm4.9 4.9 1.4 1.4', 'm17.7 17.7 1.4 1.4', 'm4.9 19.1 1.4-1.4', 'm17.7 6.3 1.4-1.4'],
  snow: ['M12 2v20', 'M3.3 7 20.7 17', 'M3.3 17 20.7 7', 'm9 4 3 2 3-2', 'm9 20 3-2 3 2'],
  wave: ['M2 8c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M2 13c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M2 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0'],
  spore: [ci(12, 12, 8), ci(12, 12, 5)],
  swap: ['M3 9h7a3 3 0 0 1 0 6H3', 'M21 9h-7a3 3 0 0 0 0 6h7', 'M10 12h4'],
  blob: ['M5 9c1-4 6-5 9-3s6 1 6 5-3 7-7 7-8 0-8-4 0-3 0-5Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tZ1 = T0('Z1'), tK1 = T0('K1'), tG1 = T0('G1'), tG6 = T0('G6'), tC1 = T0('C1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1');
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
const rod = (g, x, y, w, h, a = 0, o = {}) => mk(g, 'rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: h / 2, fill: o.f || MONF, stroke: o.s || MON, 'stroke-width': o.sw || 3, transform: a ? `rotate(${a} ${x} ${y})` : '' });

/* ---------- title card ---------- */
const JOBS = [['bowl', 'Curd sets', 'OVERNIGHT', 'curd'], ['spring', 'Hot springs', 'TINY CELLS LIVE THERE', 'springs'], ['pond', 'Green scum', 'ON A DIRTY POND', 'scum']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const JR = [['bowl', 'Milk into curd', 'OVERNIGHT, ON A SHELF'], ['spring', 'Life in hot springs', 'WHERE LITTLE ELSE SURVIVES'], ['pond', 'Green pond scum', 'SPREADS IN DIRTY WATER']];
$('#jrs').innerHTML = JR.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${M.icon('microbe', 22, '#fff', 2.4)}BACTERIA</div></div>`).join('');

/* ---------- Z: zoom ladder (curd -> one drop -> one bacterium) ---------- */
const ZN = ['CURD', 'ONE DROP', 'ONE BACTERIUM'], ZS = ['x1', 'x1,000', 'x10,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4')];
const LVI = [['RUNG 1 OF 3', 'Curd', 'Milk, set thick and sour overnight.', 'Something tiny did the work.'],
  ['RUNG 2 OF 3', 'One drop', 'Milk fat droplets, and tiny rod shaped cells.', 'Those rods are bacteria.'],
  ['RUNG 3 OF 3', 'Bacterium', 'One cell: the whole organism.', 'DNA lies loose: no nuclear membrane.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'No nucleus at all!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[470, 236, 44], [610, 300, 40], null], LAB = [];
{ const g = ZG[0]; // bowl of curd
  mk(g, 'path', { d: 'M250,250 L806,250 C800,380 690,450 528,450 C366,450 256,380 250,250 Z', fill: '#E7EEF4', stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M440,452 L616,452 L630,480 L426,480 Z', fill: '#D5DEE7', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'ellipse', { cx: 528, cy: 250, rx: 278, ry: 56, fill: '#FBFBF5', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M330,250 q60,-26 130,-10 q70,16 120,-6 q60,-22 120,4', stroke: '#E4E0CF', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'ellipse', { cx: 660, cy: 262, rx: 70, ry: 16, fill: '#EEF0D2', stroke: '#C9C79A', 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M720,90 L600,236', stroke: '#9AA0AC', 'stroke-width': 10, 'stroke-linecap': 'round' }); mk(g, 'ellipse', { cx: 586, cy: 246, rx: 34, ry: 18, fill: '#C9CED8', stroke: BR, 'stroke-width': 3, transform: 'rotate(-40 586 246)' });
  LAB[0] = [[400, 232, 260, 120, 'Set curd', 'end'], [680, 266, 830, 340, 'Whey (sour liquid)', 'end', [830, 340]]];
  LAB[0][1] = [680, 266, 760, 360, 'Whey (sour liquid)', 'start'];
}
const rodsL1 = [];
{ const g = ZG[1], r = M.rng(5);
  mk(g, 'circle', { cx: 528, cy: 263, r: 232, fill: '#FDFCF6', stroke: BR, 'stroke-width': 5 });
  [[420, 170, 46], [600, 190, 36], [470, 330, 52], [660, 330, 30], [350, 260, 28], [560, 400, 26], [720, 240, 24]].forEach(([x, y, rr]) => mk(g, 'circle', { cx: x, cy: y, r: rr, fill: '#F6EFCF', stroke: '#D8CB8E', 'stroke-width': 2.5 }));
  for (let k = 0; k < 26; k++) { const a = r() * Math.PI * 2, d = 40 + r() * 170, x = 528 + d * Math.cos(a), y = 263 + d * Math.sin(a);
    if ([[420, 170, 46], [600, 190, 36], [470, 330, 52], [660, 330, 30]].some(([cx, cy, rr]) => Math.hypot(x - cx, y - cy) < rr + 14)) continue;
    rodsL1.push(rod(g, x, y, 34, 12, r() * 180, { sw: 2.5 })); }
  rod(g, 610, 300, 36, 13, 20, { sw: 2.5 });
  LAB[1] = [[420, 170, 220, 80, 'Milk fat droplet', 'end'], [610, 300, 800, 430, 'Bacteria (rod shaped)', 'end', [800, 430]]];
  LAB[1][1] = [610, 300, 760, 440, 'Bacteria (rods)', 'start'];
}
const flag = { };
{ const g = ZG[2];
  flag.p = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'rect', { x: 260, y: 160, width: 520, height: 210, rx: 105, fill: '#E7E1C2', stroke: '#7A6A2E', 'stroke-width': 6 });
  mk(g, 'rect', { x: 278, y: 178, width: 484, height: 174, rx: 87, fill: '#F1FAF8', stroke: MON, 'stroke-width': 3 });
  flag.dna = mk(g, 'path', { d: '', stroke: NUC, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' });
  const r = M.rng(8); for (let k = 0; k < 22; k++) { const x = 320 + r() * 400, y = 200 + r() * 130; if (Math.hypot((x - 520) / 150, (y - 265) / 50) < 1) continue; mk(g, 'circle', { cx: x, cy: y, r: 6, fill: '#8E7AB0' }); }
  LAB[2] = [[300, 180, 230, 90, 'Cell wall', 'end'], [380, 180, 420, 90, 'Cell membrane', 'start'], [520, 262, 600, 450, 'DNA (loose)', 'start'], [340, 300, 240, 450, 'Ribosomes', 'start'], [880, 300, 900, 150, 'Flagellum', 'end']];
  LAB[2][3] = [340, 300, 200, 450, 'Ribosomes', 'start'];
}
const LB = LAB.map((L, lv) => labels(ZG[lv], L));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'Thick'), wt('Z2', 'sour')], [wt('Z3', 'droplets'), wt('Z3', 'rod')], [wt('Z4', 'wall'), wt('Z4', 'membrane'), wt('Z5', 'DNA'), wt('Z5', 'ribosomes'), wt('Z5', 'flagellum')]];
const zNo = document.createElement('div'); zNo.className = 'pillp bad'; zNo.style.cssText = 'left:36px;top:22px;height:44px;font-size:20px'; zNo.textContent = 'No nuclear membrane'; $('#zd').appendChild(zNo);

/* ---------- K: kingdom + shapes ---------- */
const HB = [['spring', 'Hot springs', 'hot'], ['sun', 'Deserts', 'deserts'], ['snow', 'Snow', 'snow'], ['wave', 'Deep oceans', 'deep']];
$('#habs').innerHTML = HB.map(([ic, n], i) => `<div class="hab" id="hb${i}" style="left:${36 + i * 178}px"><i style="position:absolute;left:0;width:160px;top:26px;display:flex;justify-content:center">${M.icon(ic, 56, MON, 2)}</i><span>${n}</span></div>`).join('');
const tHb = HB.map(h => wt('K2', h[2]));
const SH = [['Cocci', 'ROUND · SPHERICAL', 'Round'], ['Bacilli', 'ROD SHAPED', 'Rod'], ['Vibrio', 'COMMA SHAPED', 'Comma'], ['Spirilla', 'SPIRAL', 'Spiral']];
$('#shps').innerHTML = SH.map(([n, w], i) => `<div class="shp" id="sh${i}" style="left:${36 + (i % 2) * 368}px;top:${84 + Math.floor(i / 2) * 244}px"><svg id="shS${i}" width="344" height="150" style="position:absolute;left:0;top:0"></svg><div class="sn">${n}</div><div class="sw">${w}</div></div>`).join('');
const tSh = [wt('K3', 'Round'), wt('K3', 'Rod'), wt('K4', 'Comma'), wt('K4', 'Spiral')];
const shA = [];
{ let s = $('#shS0'); [[110, 76], [150, 60], [150, 96], [190, 78], [230, 64], [230, 100]].forEach(([x, y]) => mk(s, 'circle', { cx: x, cy: y, r: 17, fill: MONF, stroke: MON, 'stroke-width': 3 }));
  s = $('#shS1'); [[110, 60, 10], [210, 56, -6], [140, 104, -14], [250, 100, 8]].forEach(([x, y, a]) => rod(s, x, y, 78, 26, a));
  s = $('#shS2'); [[120, 80], [230, 70]].forEach(([x, y]) => { mk(s, 'path', { d: `M${x - 34},${y - 20} C${x - 10},${y + 30} ${x + 20},${y + 30} ${x + 34},${y - 12}`, stroke: MON, 'stroke-width': 22, fill: 'none', 'stroke-linecap': 'round' }); mk(s, 'path', { d: `M${x - 34},${y - 20} C${x - 10},${y + 30} ${x + 20},${y + 30} ${x + 34},${y - 12}`, stroke: MONF, 'stroke-width': 15, fill: 'none', 'stroke-linecap': 'round' }); });
  s = $('#shS3'); shA.push(mk(s, 'path', { d: '', stroke: MON, 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' }), mk(s, 'path', { d: '', stroke: MONF, 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' })); }

/* ---------- G: archaebacteria vs eubacteria ---------- */
const AR = [['Halophiles', 'very salty places', 'Halophiles'], ['Thermoacidophiles', 'hot springs', 'Thermoacidophiles'], ['Methanogens', 'marshy places · cow and buffalo gut', 'Methanogens']];
$('#arcs').innerHTML = AR.map(([n, w], i) => `<div class="arc" id="ac${i}" style="top:${84 + i * 130}px"><svg id="acS${i}" width="130" height="110" style="position:absolute;left:10px;top:0"></svg><div class="an">${n}</div><div class="aw">${w}</div></div>`).join('');
const tAr = AR.map(a => wt('G2', a[2]));
const bub = [];
{ let s = $('#acS0'); [[40, 70], [70, 56], [96, 74], [58, 86]].forEach(([x, y]) => mk(s, 'rect', { x: x - 11, y: y - 11, width: 22, height: 22, rx: 3, fill: '#fff', stroke: '#9AA0AC', 'stroke-width': 2.5, transform: `rotate(12 ${x} ${y})` }));
  s = $('#acS1'); mk(s, 'path', { d: 'M14,86 q14,-10 28,0 t28,0 t28,0 t28,0', stroke: WAT, 'stroke-width': 4, fill: 'none' }); [40, 66, 92].forEach(x => bub.push(mk(s, 'path', { d: `M${x},70 c-8,-10 8,-16 0,-28 c-8,-10 8,-14 0,-24`, stroke: '#D98D6B', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' })));
  s = $('#acS2'); mk(s, 'path', { d: 'M14,92 q14,-8 28,0 t28,0 t28,0 t28,0', stroke: '#6B8A3A', 'stroke-width': 4, fill: 'none' }); for (let k = 0; k < 5; k++) bub.push(mk(s, 'circle', { cx: 30 + k * 18, cy: 80, r: 6, fill: '#fff', stroke: '#6B7280', 'stroke-width': 2.5 })); }
const bioTag = document.createElement('div'); bioTag.className = 'pillp ac'; bioTag.style.cssText = 'right:20px;top:14px;height:40px;font-size:18px'; bioTag.innerHTML = 'Methane = biogas'; $('#ac2').appendChild(bioTag);
// right card: an archaebacterium (special wall), then a eubacterium (rigid wall + flagellum)
const gb = $('#gbS'), gA = fb(mk(gb, 'g', {})), gE = fb(mk(gb, 'g', {}));
const gTab = ['Archaebacteria', 'Eubacteria'].map((n, i) => { const d = document.createElement('div'); d.className = 'pillp'; d.style.cssText = `left:${36 + i * 290}px;top:78px;height:48px;font-size:22px`; d.textContent = n; $('#gb').appendChild(d); return d; });
mk(gA, 'rect', { x: 200, y: 220, width: 380, height: 170, rx: 85, fill: '#F1FAF8', stroke: '#5E4B8B', 'stroke-width': 12, 'stroke-dasharray': '18 6' });
mk(gA, 'path', { d: 'M310,306 c16,-30 40,24 60,0 s40,24 60,-4 s30,22 44,0', stroke: NUC, 'stroke-width': 4, fill: 'none' });
const gALB = labels(gA, [[200, 300, 120, 440, 'Special cell wall', 'start']]);
const gFl = mk(gE, 'path', { d: '', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
mk(gE, 'rect', { x: 140, y: 220, width: 380, height: 170, rx: 85, fill: '#E7E1C2', stroke: '#7A6A2E', 'stroke-width': 7 }); mk(gE, 'rect', { x: 156, y: 236, width: 348, height: 138, rx: 69, fill: '#F1FAF8', stroke: MON, 'stroke-width': 3 });
mk(gE, 'path', { d: 'M250,306 c16,-30 40,24 60,0 s40,24 60,-4 s30,22 44,0', stroke: NUC, 'stroke-width': 4, fill: 'none' });
const gELB = labels(gE, [[160, 260, 120, 160, 'Rigid cell wall', 'start'], [640, 300, 640, 440, 'Flagellum', 'end']]);
const th1 = PUC.think($('#th1'), { q: 'A bacterium lives in a hot, acidic spring. Archaebacteria or eubacteria?', opts: ['Archaebacteria', 'Eubacteria'], right: 0, why: 'Archaebacteria. It is a thermoacidophile: its special cell wall lets it survive the heat.' });

/* ---------- C: eubacteria by food ---------- */
const ca = $('#caS'), nG = mk(ca, 'g', {}), n2 = [];
const NX = k => 96 + k * 52, NY = k => 250 + 18 * Math.sin(k * 0.7);
mk(nG, 'path', { d: (() => { let d = ''; for (let k = 0; k < 12; k++) d += (k ? ' L' : 'M') + NX(k) + ',' + (NY(k) - 46).toFixed(1); for (let k = 11; k >= 0; k--) d += ' L' + NX(k) + ',' + (NY(k) + 46).toFixed(1); return d + ' Z'; })(), fill: '#E6F1F7', stroke: WAT, 'stroke-width': 2.5, 'stroke-linejoin': 'round', opacity: 0.9 });
for (let k = 0; k < 12; k++) { const het = k === 5;
  mk(nG, 'circle', { cx: NX(k), cy: NY(k).toFixed(1), r: het ? 30 : 25, fill: het ? '#F3EFD8' : '#8CC48F', stroke: het ? '#7A6A2E' : '#1F5E37', 'stroke-width': het ? 6 : 3 }); }
for (let k = 0; k < 4; k++) { const g = mk(ca, 'g', {}); txt(g, 0, 0, 'N≡N', { 'font-family': 'IBM Plex Mono', 'font-size': 20, 'font-weight': 600, fill: '#6B7280', 'text-anchor': 'middle' }); n2.push(g); }
const nLB = labels(nG, [[NX(2), NY(2) - 10, 150, 120, 'Vegetative cell', 'start'], [NX(5), NY(5), 400, 410, 'Heterocyst', 'start'], [NX(10), NY(10) - 44, 740, 130, 'Gelatinous sheath', 'end']]);
nLB[1] = nLB[1]; // heterocyst label sits below the filament
const bloom = mk(ca, 'g', {}), bloomD = [];
mk(bloom, 'path', { d: 'M36,470 q40,-12 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 L748,520 L36,520 Z', fill: '#D6E9F5', stroke: WAT, 'stroke-width': 3 });
{ const r = M.rng(3); for (let k = 0; k < 40; k++) bloomD.push(mk(bloom, 'circle', { cx: 50 + r() * 690, cy: 478 + r() * 34, r: 5 + r() * 5, fill: '#5FA86F' })); }
const bloomP = document.createElement('div'); bloomP.className = 'pillp'; bloomP.style.cssText = 'left:36px;top:400px;height:44px;font-size:20px'; bloomP.textContent = 'Blooms in polluted water'; $('#ca').appendChild(bloomP);
$('#stp').innerHTML = [`${K('\\mathrm{NH_3}\\;\\cdot\\;\\mathrm{NO_2^-}\\;\\cdot\\;\\mathrm{NO_3^-}')}`, 'Oxidised', 'Energy released', `<b style="color:${MITO}">ATP</b>`].map((s, i) => `<span id="sp${i}">${s}</span>${i < 3 ? '<em>↓</em>' : ''}`).join('');
const rec = document.createElement('div'); rec.style.cssText = 'position:absolute;left:36px;top:410px;width:712px'; rec.innerHTML = `<div class="lbl" style="position:relative;margin-bottom:14px">THEY HELP RECYCLE</div><div style="display:flex;gap:12px">${['Nitrogen', 'Phosphorus', 'Iron', 'Sulphur'].map(n => `<span class="pillp" style="position:relative;height:44px;font-size:21px">${n}</span>`).join('')}</div>`; $('#chemo').appendChild(rec);
const FRW = [['Cyanobacteria', 'blue green algae · chlorophyll a · make food', [['Nostoc'], ['Anabaena'], ['Heterocysts fix N₂']], 132, 'C2'],
  ['Chemosynthetic', 'oxidise inorganic substances → ATP', [], 92, 'C5'],
  ['Heterotrophic · most common', 'decomposers, and much more', [['Decomposers'], ['Set curd'], ['Antibiotics'], ['N₂ fixing, legume roots']], 210, 'C6']];
let fy = 80; $('#frs').innerHTML = FRW.map(([n, w, ch, h], i) => { const s = `<div class="fr" id="fr${i}" style="top:${fy}px;height:${h}px"><div class="fn">${n}</div><div class="fw">${w}</div>${ch.length ? `<div class="fc" id="fc${i}" style="top:86px">${ch.map((c, k) => `<span id="fc${i}${k}">${c[0]}</span>`).join('')}</div>` : ''}${i === 2 ? `<div class="fc" style="top:136px">${['Cholera', 'Typhoid', 'Tetanus', 'Citrus canker'].map((c, k) => `<span class="bad" id="fd${k}">${c}</span>`).join('')}</div>` : ''}</div>`; fy += h + 14; return s; }).join('');
const tFc = [[wt('C3', 'Nostoc'), wt('C3', 'Anabaena'), wt('C3', 'heterocysts')], [], [wt('C6', 'decompose'), wt('C6', 'curd'), wt('C6', 'antibiotics'), wt('C6', 'legumes')]];
const tFd = [wt('C7', 'cholera'), wt('C7', 'typhoid'), wt('C7', 'tetanus'), wt('C7', 'citrus')];

/* ---------- R: reproduction ---------- */
const ra = $('#raS'), cellsR = [0, 1, 2, 3, 4, 5, 6, 7].map(() => { const g = mk(ra, 'g', {}); mk(g, 'rect', { x: -55, y: -23, width: 110, height: 46, rx: 23, fill: MONF, stroke: MON, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M-28,0 c8,-12 14,10 22,0 s14,10 22,0', stroke: NUC, 'stroke-width': 3, fill: 'none' }); return g; });
const LVP = [[[392, 300]], [[267, 300], [517, 300]], [[167, 300], [317, 300], [467, 300], [617, 300]], [[167, 240], [167, 360], [317, 240], [317, 360], [467, 240], [467, 360], [617, 240], [617, 360]]];
const tSplit = [wt('R1', 'splits'), wt('R1', 'Two', 0) + 0.2, wt('R1', 'Four') + 0.2];
const RR = [['spore', 'Spores', 'In hard times, they form spores.', 'spores'], ['swap', 'DNA transfer', 'DNA passes from one cell to another: a simple kind of sexual reproduction.', 'DNA'], ['blob', 'Mycoplasma', 'No cell wall · smallest living cells known · live without oxygen', 'Mycoplasma']];
$('#rrs').innerHTML = RR.map(([ic, n, w], i) => `<div class="rr" id="rr${i}" style="top:${84 + i * 156}px"><i style="position:absolute;left:36px;top:26px;width:88px;height:88px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(ic, 48, i === 2 ? C.red : MON, 2)}</i><div class="rn">${n}</div><div class="rw2">${w}</div></div>`).join('');
const tRr = [wt('R2', 'spores'), wt('R2', 'DNA'), wt('R3', 'Mycoplasma')];

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:600 30px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.02em">in <b style="color:var(--ac)">every</b> member of Monera</span>';

/* ---------- W ---------- */
const WC = [['IN A BUFFALO\'S GUT', 'Methanogen', 'microbe', 'ARCHAEBACTERIA', 'makes methane', wt('W2', 'Archaebacteria')], ['HAS HETEROCYSTS', 'Anabaena', 'filament', 'CYANOBACTERIA', 'fixes nitrogen', wt('W3', 'Cyanobacteria')],
  ['OXIDISES AMMONIA', 'Ammonia oxidiser', 'microbe', 'CHEMOSYNTHETIC', 'energy for ATP', wt('W4', 'Chemosynthetic')], ['SETS CURD', 'Curd bacterium', 'bowl', 'HETEROTROPHIC', 'a useful one', wt('W5', 'heterotrophic')],
  ['CAUSES TYPHOID', 'Typhoid bacterium', 'microbe', 'HETEROTROPHIC', 'a pathogen', wt('W5', 'heterotrophic') + 0.3], ['NO CELL WALL', 'Mycoplasma', 'blob', 'MYCOPLASMA', 'smallest known cells', wt('W6', 'Mycoplasma')]];
const tWi = [wt('W2', 'methanogen'), wt('W3', 'Anabaena'), wt('W4', 'bacterium'), wt('W5', 'curd'), wt('W5', 'typhoid'), wt('W6', 'cell')];
$('#cols').innerHTML = WC.map(([h, n, ic, k, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2">${h}</div><div class="it" id="it${i}"><div class="ic">${M.icon(ic, 72, i === 5 ? C.red : MON, 2)}</div><div class="inm">${n}</div></div>
  <div class="dz"></div><div class="kg" id="kg${i}" style="${i === 5 ? 'background:var(--ink)' : ''}">${k}</div><div class="rs" id="rs${i}">${r}</div></div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Blue green algae are algae, so they are plants', right: 'They are cyanobacteria: prokaryotes in Monera' });
const tSv = $('#tS'), tG = fb(mk(tSv, 'g', {}));
{ for (let k = 0; k < 7; k++) mk(tG, 'circle', { cx: 70 + k * 56, cy: 120, r: k === 3 ? 26 : 22, fill: k === 3 ? '#F3EFD8' : '#8CC48F', stroke: k === 3 ? '#7A6A2E' : '#1F5E37', 'stroke-width': k === 3 ? 5 : 3 });
  txt(tG, 238, 196, 'CYANOBACTERIA · NO NUCLEUS', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.2, fill: MON }); }
const where = PUC.where($('#wa'), { on: [], type: 'Assertion-reason, or statements on archaebacteria, heterocysts, Mycoplasma' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ASSERTION AND REASON', qW: 790, cols: 1, optW: 968, optH: 54, optFs: 24, optY: 330,
  q: '<div class="ar2"><b>A</b>Cyanobacteria are placed in kingdom Monera, though they make their own food.</div><div class="ar2"><b>R</b>Cyanobacteria have chlorophyll a, like green plants.</div>',
  opts: ['Both true, and R explains A', 'Both true, but R does not explain A', 'A is true, R is false', 'A is false, R is true'], right: 1 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['<b style="color:var(--ok)">A</b> is true'], ['<b style="color:var(--ok)">R</b> is true'], ['R is not the reason'], ['Reason: they are prokaryotes']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A1', 'Both'), wt('A2', 'chlorophyll'), wt('A3', 'not'), wt('A3', 'prokaryotes')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · kingdom Monera', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Monera</b>: bacteria only · no nuclear membrane', '<b>Shapes</b>: cocci, bacilli, vibrio, spirilla', '<b>Archaebacteria</b>: halophiles, thermoacidophiles, methanogens',
    '<b>Cyanobacteria</b>: chlorophyll a · heterocysts fix N₂', '<b>Chemosynthetic</b>: oxidise nitrates, nitrites, ammonia → ATP', '<b>Mycoplasma</b>: no cell wall · smallest living cells'] });
const YQ = ['Name the four shapes of bacteria.', 'Where do methanogens live, and what do they make?', 'What is a heterocyst, and what does it do?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 14', topic: 'A drop of pond water: what swims inside? Kingdom Protista', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('C3') - 0.2, 1.04, 960, 560], [T0('C4') + 0.5, 1, 960, 540]]);
const flagD = (x0, y0, t, amp = 14, len = 150) => { let d = `M${x0},${y0}`; for (let k = 1; k <= 20; k++) { const x = x0 + k * len / 20; d += ` L${x.toFixed(1)},${(y0 + amp * Math.sin(k * 0.8 - t * 8) * k / 20).toFixed(1)}`; } return d; };

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
    JR.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'kingdom') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'three') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hkL'), t, tH3, 1e9, { dy: 8 });
    M.vis($('#hkP'), t, wt('H3', 'milk') - 0.2, wt('H3', 'morning') - 0.1, { ...POP, outDur: 0.2 }); M.vis($('#hkN'), t, wt('H3', 'morning'), wt('H4', 'Bacteria') - 0.1, { ...POP, outDur: 0.2 });
    const hb = document.getElementById('hkB') || (() => { const d = document.createElement('div'); d.id = 'hkB'; d.className = 'pillp ink'; d.style.cssText = 'left:132px;top:494px'; d.innerHTML = `${M.icon('microbe', 24, '#fff', 2.4)}Bacteria: far too small to see`; $('#hk').appendChild(d); return d; })();
    M.vis(hb, t, wt('H4', 'Bacteria'), 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tK1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('K1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sc = sIn * (1 + 2.4 * x), cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      runLabs(LB[k], t, tLab[k]); if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    attr(flag.p, 'd', flagD(780, 265, t, 18, 150));
    { let d = 'M420,262'; for (let k = 1; k <= 24; k++) d += ` L${(420 + k * 8.5).toFixed(1)},${(262 + 22 * Math.sin(k * 0.9 + t * 1.5) * Math.sin(k * 0.13 * Math.PI)).toFixed(1)}`; attr(flag.dna, 'd', d); }
    M.vis(zNo, t, wt('Z5', 'no') - 0.1, 1e9, POP);
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'no') + 0.6, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('G1');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kf0'), t, wt('K1', 'only') - 0.3, 1e9, { dy: 14 }); M.vis($('#kf1'), t, wt('K2', 'abundant') - 0.2, 1e9, { dy: 12 }); M.vis($('#kfL'), t, wt('K2', 'everywhere') - 0.1, 1e9, { dy: 8 });
    HB.forEach((_, i) => M.vis($('#hb' + i), t, tHb[i] - 0.1, 1e9, POP));
    M.vis($('#kb'), t, T0('K3') - 0.2, out, { dx: 60, dy: 0, ...o });
    SH.forEach((_, i) => { const el = $('#sh' + i); M.vis(el, t, tSh[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tSh[i]) / 0.25) * (1 - M.io((t - (tSh[i + 1] ?? T1('K4') + 0.3)) / 0.25))); });
    let d = 'M64,74'; for (let k = 1; k <= 40; k++) d += ` L${(64 + k * 5.4).toFixed(1)},${(74 + 26 * Math.sin(k * 0.42 - t * 2.4)).toFixed(1)}`; shA.forEach(p => attr(p, 'd', d));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G6');
    M.vis($('#ga'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#gb'), t, tG1 + 0.25, out, { dx: 60, dy: 0, ...o });
    AR.forEach((_, i) => { const el = $('#ac' + i); M.vis(el, t, wt('G1', 'Archaebacteria') + i * 0.12, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tAr[i]) / 0.25) * (1 - M.io((t - (tAr[i + 1] ?? T0('G3') + 0.2)) / 0.25))); if (i === 2) el.style.background = mix(C.soft, C.ac2, M.io((t - tAr[2]) / 0.25) * (1 - M.io((t - T0('G4')) / 0.25))); });
    bub.forEach((b, i) => { if (i < 3) b.style.opacity = (0.4 + 0.6 * ((Math.sin(t * 3 + i) + 1) / 2)).toFixed(2); else { const ph = ((t * 0.7 + (i - 3) * 0.23) % 1); attr(b, 'cy', (80 - 64 * ph).toFixed(1)); b.style.opacity = (1 - ph).toFixed(2); } });
    M.vis(bioTag, t, wt('G3', 'biogas') - 0.2, 1e9, POP);
    M.vis($('#gaP'), t, wt('G4', 'wall') - 0.2, 1e9, POP);
    const tE = T0('G5');
    gTab.forEach((d, i) => { M.vis(d, t, wt('G1', i ? 'eubacteria' : 'Archaebacteria') - 0.1, 1e9, POP); const on = i ? M.io((t - tE) / 0.3) : M.io((t - T0('G2')) / 0.3) * (1 - M.io((t - tE) / 0.3));
      d.style.background = mix(C.soft, C.ac, on); d.style.color = mix(C.ink, '#FFFFFF', on); });
    M.vis(gA, t, wt('G1', 'Archaebacteria') + 0.3, tE - 0.1, { ...POP, sc: 0.8, outDur: 0.25 }); runLabs(gALB, t, [wt('G4', 'cell')]);
    M.vis(gE, t, tE + 0.1, 1e9, { ...POP, sc: 0.8 }); runLabs(gELB, t, [wt('G5', 'rigid'), wt('G5', 'flagellum')]); attr(gFl, 'd', flagD(520, 305, t, 16, 150));
    M.vis($('#gbP'), t, wt('G5', 'move') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tG6 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tG6, tOpts: wt('G6', 'Archaebacteria') - 0.1, tCount: T1('G6') + 0.05, dur: 3, tAns: T0('G7') - 0.02, tWhy: wt('G7', 'It') });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('R1'), tCh = T0('C5') - 0.1;
    M.vis($('#ca'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#cb'), t, tC1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#caL0'), t, T0('C2'), tCh, { dy: 8, outDur: 0.25 });
    M.vis(nG, t, T0('C2') - 0.1, tCh, { dy: 16, outDur: 0.3 });
    runLabs(nLB, t, [wt('C2', 'chlorophyll'), wt('C3', 'heterocysts'), wt('C3', 'Nostoc')]);
    n2.forEach((g, i) => { const ph = ((t - wt('C3', 'fix')) * 0.45 + i * 0.25) % 1, on = t > wt('C3', 'fix') && t < tCh;
      const x = NX(5) + (60 + i * 70) * (1 - ph), y = 96 + (NY(5) - 96) * ph; attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); g.style.opacity = on ? (Math.min(1, ph * 4) * (1 - ph)).toFixed(2) * 1.6 : 0; });
    M.vis(bloom, t, wt('C4', 'blooms') - 0.6, tCh, { dy: 10, outDur: 0.25 }); M.vis(bloomP, t, wt('C4', 'blooms') - 0.2, tCh, { ...POP, outDur: 0.25 });
    bloomD.forEach((d, i) => { d.style.opacity = M.clamp((t - wt('C4', 'blooms') + 0.6 - i * 0.05) / 0.3).toFixed(2); });
    M.vis($('#chemo'), t, tCh + 0.1, 1e9, { dy: 16 });
    const spT = [wt('C5', 'oxidise'), wt('C5', 'oxidise') + 0.8, wt('C5', 'energy'), wt('C5', 'ATP')], spCur = Math.floor(((t - spT[3] - 0.6) / 0.7)) % 4;
    [0, 1, 2, 3].forEach(i => { const el = $('#sp' + i), done = t >= spT[i]; M.vis(el, t, spT[i] - 0.15, 1e9, POP);
      const lit = t < spT[3] + 0.6 ? (done && (i === 3 || t < spT[i + 1])) : spCur === i;
      el.style.background = lit ? C.ac : '#FFFFFF'; el.style.color = lit ? '#FFFFFF' : done ? C.ink : '#9AA0AC'; el.style.borderColor = done ? C.ac : '#CBD0DA'; });
    M.vis(rec, t, wt('C5', 'ATP') + 0.6, 1e9, { dy: 12 });
    FRW.forEach((f, i) => { M.vis($('#fr' + i), t, T0(f[4]) - 0.1, 1e9, { dx: -16, dy: 0 }); tFc[i].forEach((tt, k) => M.vis($('#fc' + i + k), t, tt - 0.1, 1e9, POP)); });
    tFd.forEach((tt, k) => M.vis($('#fd' + k), t, tt - 0.1, 1e9, POP));
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#ra'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#rb'), t, T0('R2') - 0.2, 1e9, { dx: 60, dy: 0 });
    const u = tSplit.map(ts => M.io((t - ts) / 0.8)); let lvl = 0; u.forEach((v, i) => { if (v > 0) lvl = i + 1; });
    cellsR.forEach((g, i) => { const L = Math.max(0, lvl), n = 1 << L; if (i >= n) { M.hide(g, true); return; } M.hide(g, false);
      const p = LVP[L][i], q = L ? LVP[L - 1][i >> 1] : p, v = L ? u[L - 1] : 1, x = q[0] + (p[0] - q[0]) * v, y = q[1] + (p[1] - q[1]) * v;
      attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(L ? 0.85 + 0.15 * v : 1).toFixed(3)})`); });
    const fs = [...$('#fis').querySelectorAll('span')]; M.vis($('#fis'), t, tR1 + 0.2, 1e9, { dy: 8 });
    fs.forEach((s, i) => { const on = i === lvl, done = i < lvl; s.style.background = on ? C.ac : '#FFFFFF'; s.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; s.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    RR.forEach((_, i) => M.vis($('#rr' + i), t, tRr[i] - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Monera') - 0.1, 1.0);
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
    trap(t, { tin: tX1, tWrong: wt('X2', 'blue') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'cyanobacteria') - 0.1 });
    M.vis(tG, t, wt('X3', 'Prokaryotes') - 0.2, 1e9, { ...POP, sc: 0.6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'assertion') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Read') + 0.4, tCount, tAns });
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
