// PUC Biology Ep 36: Chordate Characteristics (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed colours: bible canon + this batch (notochord teal, nerve cord indigo, gill slits coral, heart red, bone)
const BR = '#2E2A24', SKIN = '#F3E6D6', NO = '#2A9D8F', NOL = '#8FD3C9', NC = '#4C5FD5', NCL = '#E6E9FB', GS = '#E4572E', RBC = '#D1495B', GUT = '#B9895A', BONE = '#EFE6CC', BONED = '#8A7A4A', WAT = '#5AA0C8';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  fish: ['M2 12c3-5 9-6 14-3l5-3v12l-5-3c-5 3-11 2-14-3Z', 'M7 11h.01'],
  tadpole: [ci(8, 12, 4.5), 'M12.5 12c3-2.4 5 2.4 9-.8', 'M6.6 11h.01'],
  squirt: ['M5 21h14', 'M8 21c-1.6-4-1.4-9 .6-12', 'M16 21c1.6-4 1.4-9-.6-12', 'M8.6 9V5h2.2v4', 'M13.2 9V6.4h2.2V9'],
  lancelet: ['M2 12c4-3.4 12-3.4 20 0-8 3.4-16 3.4-20 0Z', 'M4.5 12h15'],
  worm: [ci(4.5, 12, 2.6), 'M7.1 12h1.4', 'M8.5 9.8h3v4.4h-3Z', 'M11.5 12c3-3 6 3 10 0'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  kidney: ['M15 3c-4 0-8 3-8 9s4 9 8 9c3 0 4-2 4-4 0-2-2-3-2-5s2-3 2-5c0-2-1-4-4-4Z', 'M7.4 12H3'],
  fin: ['M3 18c2-8 8-12 18-13-2 6-6 11-11 13Z', 'M7 15l7-7', 'M10 17l6-6'],
  roach: ['M6 12c0-3 3-5 7-5s8 2 8 5-4 5-8 5-7-2-7-5Z', ci(4.5, 12, 1.8), 'M3 10.5 1 7', 'M9 16l-1.5 3', 'M13 17v3', 'M17 16l1.5 3'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tV1 = T0('V1'), tK1 = T0('K1'), tK6 = T0('K6'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three animals ---------- */
const JOBS = [['fish', 'A pond fish', 'IN THE COLLEGE POND', 'fish'], ['tadpole', 'A tadpole', 'IN A RAIN PUDDLE', 'tadpole'], ['user', 'You', 'BEFORE YOU WERE BORN', 'You']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const HR = [['fish', 'A pond fish', 'NOTOCHORD IN THE EMBRYO'], ['tadpole', 'A tadpole', 'THE LARVA OF A FROG'], ['user', 'You', 'AS A FEW-WEEK EMBRYO']];
const FC = [NO, NC, GS];
$('#jrs').innerHTML = HR.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <div class="jt">${FC.map((c, k) => `<b id="jf${i}${k}" style="background:${c}">${M.icon('check', 22, '#fff', 3)}</b>`).join('')}</div></div>`).join('');
const tFeat = [wt('H2', 'rod'), wt('H2', 'nerves'), wt('H2', 'slits')];

/* ---------- Z: body plan (side view) + cross-section ---------- */
const ZN = ['BODY PLAN', 'CROSS-SECTION'], ZS = ['x1', 'x4'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tD1 + 0.15, wt('Z1', 'look')];
const zs = $('#zS'), ZG = [0, 1].map(() => mk(zs, 'g', {}));
// generic chordate, side view (head left). Returns refs to the animatable parts.
function chordate(g) {
  const r = {};
  mk(g, 'path', { d: 'M640,182 C780,150 944,204 1012,248 C944,296 780,352 640,342 Z', fill: '#F9EFE4', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  r.body = mk(g, 'path', { d: 'M96,268 C100,205 190,172 320,168 L760,182 C860,192 940,222 994,248 C940,274 860,312 760,338 L320,368 C190,368 100,330 96,268 Z', fill: SKIN, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M98,262 l-12,-12 M98,272 l-12,10', stroke: BR, 'stroke-width': 3, 'stroke-linecap': 'round' });
  r.phx = mk(g, 'rect', { x: 150, y: 252, width: 236, height: 74, rx: 30, fill: '#F7DCCB', stroke: '#B98A6A', 'stroke-width': 2.5 });
  r.gut = mk(g, 'path', { d: 'M384,290 L690,296 Q716,300 721,338', stroke: GUT, 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  r.anus = mk(g, 'circle', { cx: 722, cy: 346, r: 5, fill: BR });
  r.gs = [0, 1, 2, 3, 4, 5].map(i => mk(g, 'path', { d: `M${196 + i * 32},264 L${188 + i * 32},314`, stroke: GS, 'stroke-width': 8, 'stroke-linecap': 'round' }));
  r.no = mk(g, 'path', { d: 'M118,236 L700,236 Q850,238 978,248', stroke: NO, 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  r.noI = mk(g, 'path', { d: 'M126,236 L700,236 Q850,238 970,248', stroke: NOL, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  r.nc = mk(g, 'path', { d: 'M156,204 L700,206 Q830,212 930,230', stroke: NC, 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  r.ncI = mk(g, 'path', { d: 'M162,204 L700,206 Q830,212 924,229', stroke: NCL, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  return r;
}
const Z0 = chordate(ZG[0]);
const zVes = mk(ZG[0], 'path', { d: 'M300,352 L700,334 Q752,300 716,262 L196,256 Q140,300 280,350', stroke: RBC, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const zHeart = mk(ZG[0], 'ellipse', { cx: 300, cy: 350, rx: 20, ry: 12, fill: RBC, stroke: '#8E2A38', 'stroke-width': 2.5 });
const zCut = mk(ZG[0], 'path', { d: 'M560,132 L560,400', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8', fill: 'none' });
const zDV = [txt(ZG[0], 36, 56, 'DORSAL · BACK SIDE', { 'font-size': 16, 'letter-spacing': 1.5 }), txt(ZG[0], 36, 506, 'VENTRAL · BELLY SIDE', { 'font-size': 16, 'letter-spacing': 1.5 })];
// level 1: cross-section
const X1 = {};
{ const g = ZG[1], cx = 528;
  mk(g, 'ellipse', { cx, cy: 275, rx: 185, ry: 205, fill: SKIN, stroke: BR, 'stroke-width': 4.5 });
  for (let k = 0; k < 4; k++) { mk(g, 'path', { d: `M${cx - 168 + k * 8},${150 + k * 60} q40,30 0,60`, stroke: '#D9BFA6', 'stroke-width': 3, fill: 'none' }); mk(g, 'path', { d: `M${cx + 168 - k * 8},${150 + k * 60} q-40,30 0,60`, stroke: '#D9BFA6', 'stroke-width': 3, fill: 'none' }); }
  X1.co = mk(g, 'ellipse', { cx, cy: 300, rx: 105, ry: 72, fill: '#E4F0F8', stroke: WAT, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
  X1.gut = mk(g, 'circle', { cx, cy: 300, r: 44, fill: '#E8C8A0', stroke: '#9A6B3A', 'stroke-width': 4 }); mk(g, 'circle', { cx, cy: 300, r: 14, fill: '#FFFFFF', stroke: '#9A6B3A', 'stroke-width': 2 });
  X1.no = mk(g, 'circle', { cx, cy: 198, r: 30, fill: NOL, stroke: NO, 'stroke-width': 6 });
  X1.nc = mk(g, 'circle', { cx, cy: 128, r: 28, fill: NCL, stroke: NC, 'stroke-width': 12 }); X1.hole = mk(g, 'circle', { cx, cy: 128, r: 8, fill: '#FFFFFF', stroke: NC, 'stroke-width': 2 });
  X1.ht = mk(g, 'ellipse', { cx, cy: 420, rx: 36, ry: 24, fill: RBC, stroke: '#8E2A38', 'stroke-width': 3 });
  X1.sym = mk(g, 'path', { d: `M${cx},62 L${cx},492`, stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8', fill: 'none' });
  X1.dv = [txt(g, cx, 48, 'DORSAL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 }), txt(g, cx, 514, 'VENTRAL', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 })];
}
const LAB = [
  [[132, 236, 96, 110, 'Notochord', 'start', NO], [520, 205, 420, 92, 'Dorsal hollow nerve cord', 'start', NC], [252, 314, 250, 452, 'Pharyngeal gill slits', 'start', GS],
   [100, 276, 60, 404, 'Mouth', 'start'], [722, 346, 690, 452, 'Anus', 'end'], [900, 246, 1000, 132, 'Post-anal tail', 'end']],
  [[556, 128, 760, 110, 'Nerve cord', 'start', NC], [558, 198, 760, 190, 'Notochord', 'start', NO], [566, 300, 760, 290, 'Gut', 'start'], [436, 330, 300, 380, 'Coelom', 'end', WAT], [564, 420, 760, 430, 'Heart', 'start', RBC]]];
const LB = LAB.map((L, lv) => L.map(([px, py, lx, ly, s, an, col]) => {
  const g = ZG[lv], ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 7, fill: col || C.ink, stroke: '#fff', 'stroke-width': 2 });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
}));
const FOC = [[560, 268, 118], null];
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('D2', 'notochord'), wt('D3', 'dorsal'), wt('D4', 'pharyngeal'), wt('D4', 'throat'), wt('D5', 'anus'), wt('D5', 'tail')],
  [wt('Z2', 'nerve'), wt('Z3', 'notochord'), wt('Z3', 'gut'), wt('Z4', 'coelomate'), wt('Z3', 'heart')]];
// right card rows
const FRW = [[NO, '1', 'Notochord', 'a stiff, bendy rod along the back', wt('D2', 'notochord')], [NC, '2', 'Dorsal hollow nerve cord', 'a hollow tube on the back side', wt('D3', 'dorsal')],
  [GS, '3', 'Pharyngeal gill slits', 'paired openings in the throat', wt('D4', 'pharyngeal')], ['#9AA0AC', '+', 'Post-anal tail', 'a tail behind the anus', wt('D5', 'tail')], [RBC, '+', 'Closed circulation', 'blood stays inside vessels', wt('D5', 'closed')]];
$('#frs').innerHTML = FRW.map(([c, n, a, b], i) => `<div class="fr" id="fr${i}" style="top:${76 + i * 80}px"><div class="d" style="background:${c}">${n}</div><div class="fn">${a}</div><div class="fs">${b}</div></div>`).join('');
const FRX = [[NC, 'Nerve cord', 'on top: a tube with a hole', wt('Z2', 'nerve')], [NO, 'Notochord', 'a solid rod just below it', wt('Z3', 'notochord')], [GUT, 'Gut', 'inside the body cavity', wt('Z3', 'gut')], [RBC, 'Heart', 'on the belly side: ventral', wt('Z3', 'heart')]];
$('#frs2').innerHTML = FRX.map(([c, a, b], i) => `<div class="fr" id="fx${i}" style="top:${76 + i * 80}px"><div class="d" style="background:${c}">${i + 1}</div><div class="fn">${a}</div><div class="fs">${b}</div></div>`).join('');
const tZ4 = [wt('Z4', 'bilaterally'), wt('Z4', 'triploblastic'), wt('Z4', 'coelomate'), wt('Z4', 'organ')];

/* ---------- P: the notochord over a lifetime ---------- */
const SP = [['Urochordata', 'notochord: only in the larval tail', 'Ascidia, Salpa, Doliolum'], ['Cephalochordata', 'notochord: head to tail, for life', 'Branchiostoma (lancelet)'], ['Vertebrata', 'notochord: embryo only → backbone', 'fishes to mammals']];
$('#sp3s').innerHTML = SP.map(([n, f, e], i) => `<div class="sp3" id="sp${i}" style="top:${76 + i * 114}px"><div class="n">${i + 1}</div><div class="sn">${n}</div><div class="sf">${f}</div><div class="se">${e}</div></div>`).join('');
$('#proto').style.top = '422px';
const tSp = ['P2', 'P3', 'P4'].map(id => T0(id) + 0.3);
const avP = PUC.avatar($('#sP'), { x: 1248 + 28, y: 270 + 476, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A sea squirt starts life as a tadpole!' });
const ps = $('#pS'), PG = [0, 1, 2].map(() => mk(ps, 'g', {}));
// lifeline
const LL = { y: 524, x0: 90, x1: 966 };
mk(ps, 'line', { x1: LL.x0, y1: LL.y, x2: LL.x1, y2: LL.y, stroke: '#E1E4EA', 'stroke-width': 6, 'stroke-linecap': 'round' });
const llF = mk(ps, 'line', { x1: LL.x0, y1: LL.y, x2: LL.x0, y2: LL.y, stroke: C.ac, 'stroke-width': 6, 'stroke-linecap': 'round' });
const llM = mk(ps, 'circle', { cx: LL.x0, cy: LL.y, r: 11, fill: '#fff', stroke: C.ac, 'stroke-width': 4 });
const llA = txt(ps, LL.x0, LL.y + 34, 'LARVA', { class: 'tlx' }), llB = txt(ps, LL.x1, LL.y + 34, 'ADULT', { class: 'tlx', 'text-anchor': 'end' });
const pCap = txt(ps, 528, 104, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ink, 'letter-spacing': 1.5 });
// stage 0: ascidian larva -> settles -> adult sac
const U = {};
{ const g = PG[0];
  mk(g, 'rect', { x: 0, y: 444, width: 1056, height: 40, fill: '#EFE6D2' }); mk(g, 'line', { x1: 0, y1: 444, x2: 1056, y2: 444, stroke: '#C9B98F', 'stroke-width': 3 });
  mk(g, 'path', { d: 'M600,446 C604,404 640,380 690,378 C744,376 780,400 786,446 Z', fill: '#C9C2B4', stroke: BR, 'stroke-width': 3.5 });
  U.tailO = mk(g, 'path', { stroke: BR, 'stroke-width': 40, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  U.tailI = mk(g, 'path', { stroke: SKIN, 'stroke-width': 32, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  U.no = mk(g, 'path', { stroke: NO, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  U.nc = mk(g, 'path', { stroke: NC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  U.head = mk(g, 'ellipse', { rx: 62, ry: 50, fill: SKIN, stroke: BR, 'stroke-width': 4 });
  U.pap = mk(g, 'path', { stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  U.sac = mk(g, 'path', { fill: '#F2D7C4', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  U.flow = [0, 1].map(() => mk(g, 'path', { stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '10 10' }));
}
// stages 1 and 2: the generic chordate drawn smaller
const sub = (g, s, x, y) => mk(g, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
const L1 = sub(PG[1], 0.84, 84, 50), B1 = chordate(L1);
const L2 = sub(PG[2], 0.84, 84, 50), B2 = chordate(L2);
const VB = []; for (let k = 0; k < 10; k++) { const x = 200 + k * 76, h = 40 * (1 - 0.45 * k / 9), y = k < 7 ? 236 : 236 + (k - 6) * 3;
  VB.push(mk(L2, 'rect', { x: x - 30, y: y - h / 2, width: 60, height: h, rx: 10, fill: BONE, stroke: BONED, 'stroke-width': 3.5 })); }
const tSt = [T0('P2'), T0('P3'), T0('P4')];

/* ---------- V: vertebrata ---------- */
const vs = $('#vS');
const vBig = mk(vs, 'circle', { cx: 392, cy: 272, r: 198, fill: '#F6F8F3', stroke: C.ac, 'stroke-width': 4 });
const vBigT = txt(vs, 392, 112, 'PHYLUM CHORDATA', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: C.ac, 'letter-spacing': 1.5 });
const VC = [[290, 196, 72, 'UROCHORDATA', '#FFFFFF', C.ink], [296, 350, 72, 'CEPHALOCHORDATA', '#FFFFFF', C.ink], [474, 278, 104, 'VERTEBRATA', C.ac2, '#1F6B3F']];
const vCs = VC.map(([x, y, r, s, f, col]) => { const g = mk(vs, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: col === C.ink ? '#B8BEC9' : C.ac, 'stroke-width': 3 });
  txt(g, x, y + 5, s, { 'text-anchor': 'middle', 'font-size': r > 80 ? 18 : 14, 'font-weight': 600, fill: col, 'letter-spacing': 1 }); return g; });
const VR = [['heart', 'Ventral muscular heart', 'with two, three or four chambers', wt('V1', 'muscular')], ['kidney', 'Kidneys', 'remove waste, balance water', wt('V1', 'Kidneys')], ['fin', 'Paired appendages', 'fins in a fish, limbs in a frog or you', wt('V2', 'paired')]];
$('#vrs').innerHTML = VR.map(([ic, n, q], i) => `<div class="vr" id="vr${i}" style="top:${84 + i * 148}px"><i>${M.icon(ic, 34, i === 0 ? RBC : C.ac, 2.2)}</i><div class="vn">${n}</div><div class="vq">${q}</div></div>`).join('');

/* ---------- K: chordate vs non-chordate ---------- */
const KA = [['Notochord present', NO, wt('K2', 'notochord')], ['Nerve cord: dorsal, hollow, single', NC, wt('K3', 'dorsal')], ['Gill slits in the pharynx', GS, wt('K4', 'slits')], ['Heart ventral · post-anal tail', RBC, wt('K5', 'ventral')]];
const KB = [['No notochord', NO, wt('K2', 'none')], ['Nerve cord: ventral, solid, double', NC, wt('K3', 'ventral')], ['No gill slits', GS, wt('K4', 'no')], ['Heart dorsal · no post-anal tail', RBC, wt('K5', 'dorsal')]];
const row = (L, p, ok) => L.map(([s, c], i) => `<div class="cmp" id="${p}${i}" style="top:${258 + i * 78}px"><b style="background:${ok ? c : '#fff'};border:3px solid ${c}">${M.icon(ok ? 'check' : 'x', 16, ok ? '#fff' : c, 3.4)}</b>${s}</div>`).join('');
$('#kas').innerHTML = row(KA, 'ka', 1); $('#kbs').innerHTML = row(KB, 'kb', 0);
const KF = {};
{ const a = $('#kaS');
  mk(a, 'path', { d: 'M560,150 L650,92 L638,150 L650,212 Z', fill: '#F9EFE4', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(a, 'path', { d: 'M120,152 C140,98 260,84 400,90 C500,96 560,126 572,150 C560,176 500,206 400,212 C260,218 140,206 120,152 Z', fill: SKIN, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(a, 'circle', { cx: 160, cy: 136, r: 7, fill: BR });
  KF.no = mk(a, 'path', { d: 'M150,150 L590,150', stroke: NO, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  KF.nc = mk(a, 'path', { d: 'M176,126 L560,128', stroke: NC, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  KF.gs = [0, 1, 2, 3].map(i => mk(a, 'path', { d: `M${206 + i * 18},160 L${200 + i * 18},192`, stroke: GS, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  KF.ht = mk(a, 'ellipse', { cx: 228, cy: 200, rx: 18, ry: 9, fill: RBC, stroke: '#8E2A38', 'stroke-width': 2 });
  KF.tl = mk(a, 'path', { d: 'M470,200 L470,226 M470,226 L650,226', stroke: C.ink, 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': '6 6' });
  KF.tlT = txt(a, 660, 232, 'TAIL', { 'font-size': 15, 'letter-spacing': 1.5 });
  KF.lab = [txt(a, 600, 70, 'BACK', { 'font-size': 15, 'letter-spacing': 1.5, 'text-anchor': 'end' })];
  const b = $('#kbS');
  KF.legs = mk(b, 'path', { d: 'M270,196 L240,236 M330,198 L330,240 M400,196 L436,236', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(b, 'path', { d: 'M150,140 C120,100 100,86 70,82 M150,142 C130,120 110,112 84,112', stroke: BR, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
  mk(b, 'path', { d: 'M180,150 C200,100 320,88 470,96 C560,102 600,130 604,152 C600,176 560,200 470,204 C320,212 200,200 180,150 Z', fill: '#C99A6B', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 7; k++) mk(b, 'path', { d: `M${290 + k * 42},${100 + (k > 4 ? 3 : 0)} Q${282 + k * 42},150 ${290 + k * 42},${202 - (k > 4 ? 3 : 0)}`, stroke: '#8E6A45', 'stroke-width': 2.5, fill: 'none' });
  mk(b, 'circle', { cx: 168, cy: 150, r: 24, fill: '#C99A6B', stroke: BR, 'stroke-width': 4 });
  KF.bh = mk(b, 'path', { d: 'M230,110 L560,116', stroke: RBC, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '26 8' });
  KF.bn = [mk(b, 'path', { d: 'M200,186 L570,176', stroke: NC, 'stroke-width': 4, fill: 'none' }), mk(b, 'path', { d: 'M200,194 L570,184', stroke: NC, 'stroke-width': 4, fill: 'none' })];
  KF.bg = []; for (let k = 0; k < 6; k++) KF.bg.push(mk(b, 'circle', { cx: 230 + k * 62, cy: 190 - k * 1.6, r: 7, fill: NC }));
  KF.blab = txt(b, 690, 70, 'BACK', { 'font-size': 15, 'letter-spacing': 1.5, 'text-anchor': 'end' });
}
const th1 = PUC.think($('#th1'), { q: 'An earthworm has a nerve cord running along its belly. Chordate or not?', opts: ['Chordate', 'Not a chordate'], right: 1, why: 'Not a chordate: its nerve cord is ventral and solid, not dorsal and hollow.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">A <b>backbone</b> makes a vertebrate.</span>';

/* ---------- W: worked example (sort board) ---------- */
const WC = [['UROCHORDATA', 'Ascidia', 'notochord only in the tail of the larva', wt('W2', 'Ascidia'), 0], ['CEPHALOCHORDATA', 'Branchiostoma', 'notochord head to tail, for the whole life', wt('W3', 'Branchiostoma'), 1],
  ['VERTEBRATA', 'Labeo (rohu)', 'embryo notochord, adult backbone of bone', wt('W4', 'Labeo'), 2], ['NOT A CHORDATE', 'Balanoglossus', 'a stomochord, not a notochord: phylum Hemichordata', wt('W5', 'Balanoglossus'), 3]];
$('#cols').innerHTML = WC.map(([h, n, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 388}px"><div class="ch2"${i === 3 ? ' style="color:var(--red)"' : ''}>${h}</div><div class="dz"></div>
  <div class="it${i === 3 ? ' no' : ''}" id="it${i}"><svg class="dr" id="wd${i}" width="352" height="160"></svg><div class="inm">${n.replace(' (rohu)', '<span style="font-style:normal;font-weight:600"> (rohu)</span>')}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
{ // mini drawings
  const a = $('#wd0'); mk(a, 'path', { d: 'M110,150 C120,130 150,124 176,124 C204,124 232,130 242,150 Z', fill: '#C9C2B4', stroke: BR, 'stroke-width': 3 });
  mk(a, 'path', { d: 'M136,128 C122,90 128,52 150,40 L150,26 L170,26 L170,42 C182,44 190,48 196,52 L198,36 L218,36 L216,58 C230,80 228,108 216,128 Z', fill: '#F2D7C4', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  const b = $('#wd1'); mk(b, 'path', { d: 'M40,90 C80,62 220,58 312,86 C220,110 80,116 40,90 Z', fill: SKIN, stroke: BR, 'stroke-width': 3.5 });
  mk(b, 'path', { d: 'M50,89 L304,86', stroke: NO, 'stroke-width': 7, 'stroke-linecap': 'round' }); for (let i = 0; i < 4; i++) mk(b, 'path', { d: `M${82 + i * 12},94 L${78 + i * 12},106`, stroke: GS, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const c = $('#wd2'); mk(c, 'path', { d: 'M266,88 L318,52 L310,88 L318,124 Z', fill: '#F9EFE4', stroke: BR, 'stroke-width': 3 });
  mk(c, 'path', { d: 'M40,88 C56,52 140,42 220,48 C260,54 276,74 280,88 C276,102 260,122 220,128 C140,134 56,124 40,88 Z', fill: '#D6DCE4', stroke: BR, 'stroke-width': 3.5 }); mk(c, 'circle', { cx: 70, cy: 80, r: 5, fill: BR });
  for (let k = 0; k < 7; k++) mk(c, 'rect', { x: 92 + k * 26, y: 80, width: 20, height: 16, rx: 4, fill: BONE, stroke: BONED, 'stroke-width': 2.5 });
  const d = $('#wd3'); mk(d, 'path', { d: 'M126,88 C160,70 200,108 236,88 C270,68 300,104 330,92', stroke: BR, 'stroke-width': 24, fill: 'none', 'stroke-linecap': 'round' });
  mk(d, 'path', { d: 'M126,88 C160,70 200,108 236,88 C270,68 300,104 330,92', stroke: '#E9C9A8', 'stroke-width': 17, fill: 'none', 'stroke-linecap': 'round' });
  mk(d, 'rect', { x: 96, y: 72, width: 34, height: 34, rx: 8, fill: '#E2B27E', stroke: BR, 'stroke-width': 3 });
  mk(d, 'ellipse', { cx: 70, cy: 89, rx: 30, ry: 22, fill: '#F0D9A8', stroke: BR, 'stroke-width': 3 });
  txt(d, 70, 140, 'PROBOSCIS', { 'text-anchor': 'middle', 'font-size': 12, 'letter-spacing': 1 }); txt(d, 113, 140, 'COLLAR', { 'text-anchor': 'start', 'font-size': 12, 'letter-spacing': 1, x: 116 }); txt(d, 250, 140, 'TRUNK', { 'text-anchor': 'middle', 'font-size': 12, 'letter-spacing': 1 });
}
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Balanoglossus almost fooled me!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every chordate has a backbone', right: 'Only vertebrates replace the notochord with a backbone' });
const tS = $('#tS');
const tRod = mk(tS, 'path', { d: 'M60,96 L400,96', stroke: NO, 'stroke-width': 18, 'stroke-linecap': 'round', fill: 'none' });
const tRodT = txt(tS, 230, 62, 'NOTOCHORD · EVERY CHORDATE', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: NO, 'letter-spacing': 1 });
const tVb = []; for (let k = 0; k < 6; k++) tVb.push(mk(tS, 'rect', { x: 52 + k * 60, y: 160, width: 50, height: 40, rx: 9, fill: BONE, stroke: BONED, 'stroke-width': 3 }));
const tVbT = txt(tS, 230, 236, 'BACKBONE · VERTEBRATES ONLY', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: BONED, 'letter-spacing': 1 });
const where = PUC.where($('#wa'), { on: [], type: 'Statements on the notochord in each subphylum; one line differences (Table 4.1)' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 940,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Urochordata: notochord only in the larval tail.</div><div class="sl"><b>II</b>Cephalochordata: notochord from head to tail, for life.</div><div class="sl"><b>III</b>Chordates: nerve cord ventral, solid and double.</div><div class="sl"><b>IV</b>Hemichordata: now a separate non-chordate phylum.</div>',
  opts: ['I and III only', 'I, II and IV only', 'II and III only', 'I, II, III and IV'], right: 1, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b> (I, II, IV)'], ['<b style="color:var(--red)">III</b> is false'], ['that cord: non-chordates'], ['<b style="color:var(--ok)">I, II</b>: protochordate rules'], ['<b style="color:var(--ok)">IV</b>: Hemichordata today']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Three'), wt('A2', 'describes'), wt('A3', 'One'), wt('A3', 'Four')];
const sp = (c, s) => `<span style="color:${c}">${s}</span>`;
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · chordate characteristics', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: [`<b>Chordata</b>: ${sp(NO, 'notochord')} · ${sp(NC, 'dorsal hollow nerve cord')} · ${sp(GS, 'gill slits')}`, '<b>Also</b>: post-anal tail, closed circulation, ventral heart',
    '<b>Urochordata</b>: notochord in the larval tail only (<i>Ascidia</i>)', '<b>Cephalochordata</b>: head to tail, for life (<i>Branchiostoma</i>)', '<b>Vertebrata</b>: embryo notochord → vertebral column'] });
const YQ = ['What are the three fundamental features of a chordate?', 'Where is the nerve cord in a fish, and in a cockroach?', 'Why is Branchiostoma a chordate, but not a vertebrate?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 37', topic: 'A frog, a lizard, a crow, a cat: Vertebrate Groups', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const rep = (t, t0, per) => (t < t0 ? 0 : ((t - t0) % per) / per);
const pts = a => 'M' + a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); FC.forEach((c, k) => M.vis($('#jf' + i + k), t, tFeat[k] - 0.15 + i * 0.08, 1e9, POP)); });
    M.vis($('#hjP'), t, T1('H2') - 0.6, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'fish') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#plan'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) {
      M.vis($('#pW'), t, tH4 + 0.05, 1e9, { dy: 16 });
      M.vis($('#pL'), t, T0('H5') + 0.2, 1e9, { dy: 8 });
      [wt('H5', 'three'), wt('H5', 'differ'), wt('H5', 'groups')].forEach((tt, i) => M.vis($('#pc' + i), t, tt - 0.2, 1e9, { dx: -20, dy: 0 }));
    }
  }

  /* Z: body plan + cross-section */
  const zOn = t >= tD1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tD1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const cur = t >= tZ[1] + 0.3 ? 1 : 0;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tD1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tD1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 1 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      LB[k].forEach((l, i) => { const t0 = tLab[k][i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
      if (FR[k]) M.draw(FR[k], t, wt('Z1', 'cut') + 0.3, 0.5);
    });
    // side view: parts draw on with their feature
    M.draw(Z0.no, t, wt('D2', 'notochord') - 0.2, 0.9); M.draw(Z0.noI, t, wt('D2', 'notochord'), 0.9);
    M.draw(Z0.nc, t, wt('D3', 'dorsal') - 0.2, 0.9); M.draw(Z0.ncI, t, wt('D3', 'hollow') - 0.1, 0.9);
    Z0.gs.forEach((s, i) => { M.vis(s, t, wt('D4', 'pharyngeal') - 0.1 + i * 0.08, 1e9, { ...POP, sc: 0.3 }); attr(s, 'stroke', mix(GS, '#F6A88E', t > wt('D4', 'pairs') ? 0.5 + 0.5 * Math.sin((t - wt('D4', 'pairs')) * 5 + i) : 0)); });
    M.draw(zVes, t, wt('D5', 'closed') - 0.1, 1.2); M.vis(zHeart, t, wt('D5', 'closed') - 0.2, 1e9, { ...POP, sc: 0.3 });
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - wt('D5', 'closed')) * 7)) * (t > wt('D5', 'closed') ? 1 : 0); attr(zHeart, 'rx', (20 * hb).toFixed(2)); attr(zHeart, 'ry', (12 * hb).toFixed(2));
    zDV.forEach((d, i) => M.vis(d, t, wt('D3', 'Dorsal', 1) + i * 0.15, 1e9, { dy: 6 }));
    M.draw(zCut, t, wt('Z1', 'cut') - 0.1, 0.5);
    // cross-section: heart beats, symmetry line on Z4
    const hb2 = 1 + 0.1 * Math.max(0, Math.sin((t - tZ[1]) * 7)); attr(X1.ht, 'rx', (36 * hb2).toFixed(2)); attr(X1.ht, 'ry', (24 * hb2).toFixed(2));
    M.draw(X1.sym, t, wt('Z4', 'bilaterally') - 0.1, 0.6);
    X1.dv.forEach((d, i) => M.vis(d, t, tZ[1] + 0.6 + i * 0.15, 1e9, { dy: 6 }));
    // right card rows
    M.vis($('#lvi0'), t, tD1 + 0.4, tZ[1] + 0.1, { dy: 20, outDur: 0.25, ody: -12 });
    let last = -1; FRW.forEach((r, i) => { if (t >= r[4] - 0.1) last = i; });
    FRW.forEach((r, i) => { const el = $('#fr' + i); M.vis(el, t, r[4] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix('#FFFFFF', C.ac2, i === last ? 1 : 0.0) ; if (i !== last) el.style.background = C.soft; });
    M.vis($('#lvi1'), t, tZ[1] + 0.3, 1e9, { dy: 20 });
    let lx = -1; FRX.forEach((r, i) => { if (t >= r[3] - 0.1) lx = i; });
    FRX.forEach((r, i) => { const el = $('#fx' + i); M.vis(el, t, r[3] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = i === lx && t < tZ4[0] ? C.ac2 : C.soft; });
    tZ4.forEach((tt, i) => M.vis($('#z4' + i), t, tt - 0.1, 1e9, POP));
  }

  /* P: notochord over a lifetime */
  const pOn = t >= tP1 - 0.1 && t < tV1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('V1');
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; tSt.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    SP.forEach((_, i) => { const el = $('#sp' + i), on = i === cur && t >= tSt[0] - 0.1 ? 1 : 0, done = i < cur ? 1 : 0, n = el.querySelector('.n');
      M.vis(el, t, tP1 + 0.4 + i * 0.1, 1e9, { dy: 14 });
      el.style.borderColor = on || done ? C.ac : '#CBD0DA'; el.style.background = on ? '#F2F8F3' : '#FFFFFF';
      n.style.background = on ? C.ac : '#FFFFFF'; n.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; n.style.borderColor = on || done ? C.ac : '#CBD0DA';
      [el.querySelector('.sf'), el.querySelector('.se')].forEach((s, k) => M.vis(s, t, tSt[i] + 0.4 + k * 0.4, 1e9, { dx: -10, dy: 0 })); });
    M.vis($('#proto'), t, wt('P5', 'protochordates') - 0.1, 1e9, POP);
    avP(t, wt('P2', 'adult') + 0.3, tSt[1] - 0.2);
    M.setT($('#pTagN'), SP[cur][0].toUpperCase());
    M.vis($('#pTag'), t, tP1 + 0.5, 1e9, POP);
    PG.forEach((g, i) => { const show = i === cur; const e = i === 0 ? M.io((t - tP1 - 0.2) / 0.5) : M.io((t - tSt[i] + 0.1) / 0.5), x = i < 2 ? M.io((t - tSt[i + 1] + 0.3) / 0.35) : 0;
      M.hide(g, !(e > 0 && x < 1)); g.style.opacity = Math.min(e, 1 - x).toFixed(3); });
    const u = rep(t, tSt[cur], 6);
    llA.textContent = ['LARVA', 'YOUNG', 'EMBRYO'][cur];
    const mx = LL.x0 + (LL.x1 - LL.x0) * u; attr(llM, 'cx', mx.toFixed(1)); attr(llF, 'x2', mx.toFixed(1));
    let cap = '';
    if (cur === 0) {
      // swim (0-0.4), settle + tail absorbed (0.4-0.62), adult sac grows (0.62-1)
      const a = M.io(u / 0.4), b = M.io((u - 0.4) / 0.22), c = M.io((u - 0.62) / 0.25);
      const hx = 420 + 160 * a + 110 * b, hy = 262 + 58 * b, ang = -Math.PI / 2 * b;   // head turns down onto the rock
      const Lt = 330 * (1 - b), wig = t * 9;
      const tp = []; for (let k = 0; k <= 12; k++) { const s = k / 12, d = 56 + Lt * s, amp = 20 * s * (1 - b);
        const px = hx - d * Math.cos(ang), py = hy - d * Math.sin(ang), nx = -Math.sin(ang), ny = Math.cos(ang), w = amp * Math.sin(wig - k * 0.7);
        tp.push([px + nx * w, py + ny * w]); }
      const tailOn = Lt > 4 && c < 1;
      [U.tailO, U.tailI].forEach(p => { attr(p, 'd', pts(tp)); M.hide(p, !tailOn); });
      attr(U.no, 'd', pts(tp.slice(1))); M.hide(U.no, !tailOn); U.no.style.opacity = (1 - b).toFixed(3);
      attr(U.nc, 'd', pts(tp.slice(1).map(p => [p[0] - 12 * Math.sin(ang), p[1] - 12 * Math.cos(ang)]))); M.hide(U.nc, !tailOn); U.nc.style.opacity = (1 - b).toFixed(3);
      attr(U.head, 'cx', hx.toFixed(1)); attr(U.head, 'cy', hy.toFixed(1)); U.head.style.opacity = (1 - c).toFixed(3);
      attr(U.pap, 'd', `M${(hx + 40 * Math.cos(-ang)).toFixed(1)},${(hy - 10 + 40 * Math.sin(-ang)).toFixed(1)} l12,-8 M${(hx + 42 * Math.cos(-ang)).toFixed(1)},${(hy + 6 + 42 * Math.sin(-ang)).toFixed(1)} l12,6`); U.pap.style.opacity = (1 - b).toFixed(3);
      const H = 40 + 130 * c, bx = 690, by = 380;
      attr(U.sac, 'd', `M${bx - 46},${by} C${bx - 64},${by - H * 0.5} ${bx - 50},${by - H} ${bx - 26},${by - H} L${bx - 26},${by - H - 26 * c} L${bx - 6},${by - H - 26 * c} L${bx - 6},${by - H + 4} L${bx + 12},${by - H + 4} L${bx + 12},${by - H - 16 * c} L${bx + 32},${by - H - 16 * c} L${bx + 32},${by - H + 8} C${bx + 56},${by - H * 0.6} ${bx + 60},${by - H * 0.3} ${bx + 46},${by} Z`);
      M.hide(U.sac, c <= 0); U.sac.style.opacity = M.clamp(c * 3).toFixed(3);
      U.flow.forEach((f, i) => { const x0 = bx - 16 + i * 38, y0 = by - H - (i ? 16 : 26) * c; attr(f, 'd', i ? `M${x0},${y0} L${x0 + 10},${y0 - 60}` : `M${x0 - 12},${y0 - 64} L${x0},${y0}`);
        f.style.strokeDashoffset = (-(t * 40) % 20).toFixed(1); M.hide(f, c < 0.9); });
      cap = u < 0.4 ? 'LARVA · NOTOCHORD IN THE TAIL' : u < 0.62 ? 'SETTLES ON A ROCK · TAIL ABSORBED' : 'ADULT · NO NOTOCHORD';
    } else if (cur === 1) {
      const s = 0.55 + 0.45 * M.io(u / 0.7); attr(L1, 'transform', `translate(${(528 - 528 * 0.84 * s).toFixed(1)} ${(286 - 270 * 0.84 * s).toFixed(1)}) scale(${(0.84 * s).toFixed(4)})`);
      attr(B1.no, 'stroke-width', (16 + 4 * Math.sin(t * 4)).toFixed(2));
      cap = u < 0.7 ? 'GROWING · NOTOCHORD HEAD TO TAIL' : 'ADULT · NOTOCHORD STAYS FOR LIFE';
    } else {
      VB.forEach((v, k) => { const on = M.io((u - 0.12 - k * 0.045) / 0.1); v.style.opacity = on.toFixed(3); M.hide(v, on <= 0); });
      const f = M.io((u - 0.62) / 0.2); B2.no.style.opacity = (1 - 0.85 * f).toFixed(3); B2.noI.style.opacity = (1 - f).toFixed(3);
      cap = u < 0.12 ? 'EMBRYO · NOTOCHORD' : u < 0.62 ? 'VERTEBRAE FORM AROUND IT' : 'ADULT · VERTEBRAL COLUMN';
    }
    M.setT(pCap, cap);
  }

  /* V: vertebrata */
  const vOn = t >= tV1 - 0.1 && t < tK1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('K1');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#vr'), t, tV1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(vBig, t, tV1 + 0.2, 0.8); M.vis(vBigT, t, tV1 + 0.6, 1e9, { dy: 8 });
    vCs.forEach((g, i) => M.vis(g, t, tV1 + 0.7 + i * 0.2, 1e9, { ...POP, sc: 0.5 }));
    const tAll = wt('V2', 'all'); M.vis($('#vP'), t, tAll - 0.1, 1e9, POP);
    const pul = t > tAll ? 0.5 + 0.5 * Math.sin((t - tAll) * 5) : 0; vCs[2].firstChild.setAttribute('stroke-width', (3 + 3 * pul).toFixed(2));
    VR.forEach((r, i) => { const el = $('#vr' + i); M.vis(el, t, r[3] - 0.2, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - r[3]) / 0.25) * (1 - M.io((t - (VR[i + 1] ? VR[i + 1][3] : tAll)) / 0.3))); });
  }

  /* K: comparison + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K6');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'cockroach') - 0.2, out, { dx: 60, dy: 0, ...o });
    KA.forEach((r, i) => M.vis($('#ka' + i), t, r[2] - 0.15, 1e9, { dx: -16, dy: 0 })); KB.forEach((r, i) => M.vis($('#kb' + i), t, r[2] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.draw(KF.no, t, KA[0][2] - 0.1, 0.6); M.draw(KF.nc, t, KA[1][2] - 0.1, 0.6);
    KF.gs.forEach((g, i) => M.vis(g, t, KA[2][2] + i * 0.08, 1e9, { ...POP, sc: 0.3 }));
    M.vis(KF.ht, t, KA[3][2] - 0.1, 1e9, { ...POP, sc: 0.3 }); M.draw(KF.tl, t, wt('K5', 'tail') - 0.1, 0.5); M.vis(KF.tlT, t, wt('K5', 'tail') + 0.3, 1e9, { dy: 6 });
    M.vis(KF.lab[0], t, tK1 + 0.4, 1e9, { dy: 6 }); M.vis(KF.blab, t, wt('K1', 'cockroach'), 1e9, { dy: 6 });
    KF.bn.forEach(l => M.draw(l, t, KB[1][2] - 0.1, 0.6)); KF.bg.forEach((g, i) => M.vis(g, t, KB[1][2] + 0.2 + i * 0.06, 1e9, { ...POP, sc: 0.3 }));
    M.draw(KF.bh, t, KB[3][2] - 0.1, 0.6);
    M.vis($('#th1'), t, tK6 + 0.05, tT - 0.3, { dy: 36, ...o });
    th1(t, { tin: tK6, tOpts: wt('K6', 'Chordate') - 0.1, tCount: T1('K6') + 0.05, dur: 3, tAns: T0('K7') - 0.02, tWhy: wt('K7', 'chordate') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'notochord') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'backbone') - 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[3] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[3] + 0.6, 1e9, { dy: 8 }); });
    avW(t, wt('W5', 'separate') + 0.3, OUT('X1'));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Only') - 0.1 });
    M.draw(tRod, t, wt('X3', 'urochordates') - 0.1, 0.6); M.vis(tRodT, t, wt('X3', 'urochordates') + 0.2, 1e9, { dy: 6 });
    tVb.forEach((v, i) => M.vis(v, t, wt('X3', 'backbone') - 0.2 + i * 0.07, 1e9, { ...POP, sc: 0.3 })); M.vis(tVbT, t, wt('X3', 'backbone') + 0.3, 1e9, { dy: 6 });
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
