// PUC Biology Ep 39: Comparative Classification Diagrams (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// batch colours: notochord teal, nerve cord indigo (Ep 36); tissue tan, mesoderm brown, cavity sky
const BR = '#2E2A24', NO = '#2A9D8F', NC = '#4C5FD5', WAT = '#5AA0C8', TIS = '#F1DFC6', MES = '#C98A6A', CAV = '#DCEBF6';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

Object.assign(M.IC, {
  sponge: ['M7 21h10', 'M8 21c-1-6-1-12 0-17h8c1 5 1 11 0 17', 'M8 4h8', ci(10.5, 10, .9), ci(13.5, 13, .9), ci(10.6, 16, .9)],
  jelly: ['M4 12C4 6 20 6 20 12Z', 'M7 12c-1 3 1 5 0 8', 'M11 12c-1 3 1 5 0 8', 'M15 12c1 3-1 5 0 8'],
  worm: ['M3 14c2-4 5-4 7 0s5 4 7 0 3-3 4-2', 'M3.4 13.4h.01'],
  crow: ['M3 10l3-1.6c.6-2 2.4-3 4.4-2.6 3 .6 5 3 7 6l4 2.4-4.4-.2c-2 1.6-4.6 2.2-7 1.6-2.6-.6-4-2.6-4-4.6Z', 'M10 16l-.6 5', 'M12.4 16.4l.6 4.6', 'M8.4 8.6h.01'],
});

/* ---------- drawings ---------- */
function starfish(g, cx = 400, cy = 290, R = 130) { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? R * 0.38 : R; d += (k ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1); }
  mk(g, 'path', { d: d + 'Z', fill: '#E89A5C', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; for (let j = 1; j < 5; j++) mk(g, 'circle', { cx: cx + j * R * 0.185 * Math.cos(a), cy: cy + j * R * 0.185 * Math.sin(a), r: R * 0.04, fill: '#F6D2AE', stroke: '#B8662E', 'stroke-width': 1.5 }); } }
function jelly(g) { for (let k = 0; k < 7; k++) mk(g, 'path', { d: `M${310 + k * 30},300 q${k % 2 ? 14 : -14},40 0,80 t0,70`, stroke: '#B48CC8', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M280,300 C280,200 520,200 520,300 C480,312 320,312 280,300 Z', fill: '#E3D2EE', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 4; k++) mk(g, 'circle', { cx: 350 + k * 34, cy: 270, r: 10, fill: 'none', stroke: '#B48CC8', 'stroke-width': 3 }); }
function sycon(g) { mk(g, 'path', { d: 'M330,460 C300,380 300,250 340,170 L460,170 C500,250 500,380 470,460 Z', fill: '#EED9A8', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'ellipse', { cx: 400, cy: 170, rx: 60, ry: 14, fill: '#C9B080', stroke: BR, 'stroke-width': 3.5 });
  const r = M.rng(3); for (let k = 0; k < 26; k++) mk(g, 'circle', { cx: 340 + r() * 120, cy: 200 + r() * 240, r: 5, fill: '#B89A60' });
  for (let k = 0; k < 9; k++) mk(g, 'path', { d: `M${344 + k * 14},158 l${(k - 4) * 2},-22`, stroke: '#B89A60', 'stroke-width': 3, 'stroke-linecap': 'round' }); }
function taenia(g) { const P = []; for (let k = 0; k < 18; k++) P.push([140 + k * 34, 300 + 50 * Math.sin(k * 0.45)]);
  P.forEach(([x, y], k) => mk(g, 'rect', { x: x - 14, y: y - 8 - k * 0.7, width: 30, height: 16 + k * 1.4, rx: 4, fill: '#F3EAD3', stroke: BR, 'stroke-width': 2.5 }));
  mk(g, 'circle', { cx: 120, cy: 296, r: 12, fill: '#F3EAD3', stroke: BR, 'stroke-width': 3 }); }
function ascaris(g) { mk(g, 'path', { d: 'M120,330 C220,180 360,420 480,280 C560,190 640,250 700,300', stroke: BR, 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M120,330 C220,180 360,420 480,280 C560,190 640,250 700,300', stroke: '#F0D5CC', 'stroke-width': 19, fill: 'none', 'stroke-linecap': 'round' }); }
function pigeon(g) { const K = '#9AA3B2', W = '#7F8898';
  mk(g, 'path', { d: 'M360,346 L350,440 M400,346 L410,440 M350,440 l-22,8 M350,440 l10,12 M410,440 l-20,10 M410,440 l14,10', stroke: '#C9737A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M560,300 L702,320 L700,344 L580,334 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M200,250 C220,190 300,170 380,190 C470,212 540,260 600,304 C520,344 430,358 360,350 C270,340 210,310 200,250 Z', fill: K, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M296,228 C400,212 520,250 646,320 C520,324 400,312 316,284 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M330,250 L346,290 M380,256 L396,298', stroke: '#4A4F5A', 'stroke-width': 5, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 214, cy: 214, r: 50, fill: '#7F8898', stroke: BR, 'stroke-width': 4.5 }); mk(g, 'path', { d: 'M230,252 C250,270 270,276 300,272', stroke: '#6FB08A', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M168,206 L124,218 L170,228 Z', fill: '#4A4F5A', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 200, cy: 202, r: 7, fill: '#E58A3C' }); mk(g, 'circle', { cx: 199, cy: 202, r: 3.5, fill: BR }); }
const BBOX = { starfish: [270, 160, 530, 420], jelly: [280, 220, 520, 460], sycon: [300, 136, 500, 460], taenia: [108, 240, 730, 360], ascaris: [106, 220, 712, 372], pigeon: [124, 160, 702, 452] };
const fit = (g, key, W, H, cx = W / 2, cy = H / 2) => { const [x0, y0, x1, y1] = BBOX[key], s = Math.min(W / (x1 - x0), H / (y1 - y0));
  attr(g, 'transform', `translate(${(cx - s * (x0 + x1) / 2).toFixed(1)} ${(cy - s * (y0 + y1) / 2).toFixed(1)}) scale(${s.toFixed(4)})`); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tB1 = T0('B1'), tR1 = T0('R1'), tK1 = T0('K1'), tK5 = T0('K5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['sponge', 'A sponge', 'IN THE SEA', 'sponge'], ['jelly', 'A jellyfish', 'ON THE BEACH', 'jellyfish'], ['worm', 'An earthworm', 'AFTER RAIN', 'earthworm'], ['crow', 'A crow', 'ON THE WIRE', 'crow']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${245 + i * 370}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const PH = ['Porifera', 'Coelenterata', 'Ctenophora', 'Platyhelminthes', 'Aschelminthes', 'Annelida', 'Arthropoda', 'Mollusca', 'Echinodermata', 'Hemichordata', 'Chordata'];
const CLS = ['Cyclostomata', 'Chondrichthyes', 'Osteichthyes', 'Amphibia', 'Reptilia', 'Aves', 'Mammalia'];
{ const box = document.createElement('div'); box.style.cssText = 'position:absolute;left:36px;top:84px;width:712px;display:flex;flex-wrap:wrap;gap:12px'; box.id = 'pbox';
  box.innerHTML = PH.map((p, i) => `<span class="pch" id="ph${i}" style="position:relative">${p}</span>`).join('') + '<span style="flex-basis:100%;height:6px"></span>' + CLS.map((p, i) => `<span class="pch v" id="pk${i}" style="position:relative">${p}</span>`).join('');
  $('#pchs').appendChild(box); }

/* ---------- D: four questions ---------- */
const Q4 = [['Level of organisation', 'Cellular level, or tissues and organs?', wt('D2', 'One')], ['Symmetry', 'Radial, or bilateral?', wt('D2', 'Two')], ['Body cavity', 'None, a false cavity, or a true coelom?', wt('D3', 'Three')], ['Notochord', 'Absent, or present?', wt('D3', 'Four')]];
$('#q4s').innerHTML = Q4.map(([q, a], i) => `<div class="q4" id="q4${i}" style="left:${36 + i * 388}px"><div class="qn">${i + 1}</div><div class="qt">${q}</div><svg id="qd${i}" width="352" height="240"></svg><div class="qa">${a}</div></div>`).join('');
{ // 1 cells: loose vs tissue
  const a = $('#qd0'); [[60, 70], [100, 50], [92, 104], [134, 86], [58, 130]].forEach(([x, y]) => { mk(a, 'circle', { cx: x, cy: y, r: 20, fill: '#FBF3E4', stroke: BR, 'stroke-width': 2.5 }); mk(a, 'circle', { cx: x, cy: y, r: 6, fill: '#B69AD0' }); });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 200 + c * 32 + (r % 2) * 16, y = 46 + r * 30; mk(a, 'rect', { x, y, width: 30, height: 28, rx: 4, fill: '#FBF3E4', stroke: BR, 'stroke-width': 2.5 }); mk(a, 'circle', { cx: x + 15, cy: y + 14, r: 4.5, fill: '#B69AD0' }); }
  txt(a, 96, 196, 'CELLULAR', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 }); txt(a, 264, 196, 'TISSUES', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 });
  // 2 symmetry
  const b = $('#qd1'); mk(b, 'circle', { cx: 92, cy: 92, r: 60, fill: '#EFE3F5', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; mk(b, 'line', { x1: 92 - 70 * Math.cos(an), y1: 92 - 70 * Math.sin(an), x2: 92 + 70 * Math.cos(an), y2: 92 + 70 * Math.sin(an), stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }); }
  mk(b, 'ellipse', { cx: 262, cy: 92, rx: 46, ry: 68, fill: '#E6EEF8', stroke: BR, 'stroke-width': 3 }); mk(b, 'line', { x1: 262, y1: 14, x2: 262, y2: 170, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
  txt(b, 92, 196, 'RADIAL', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 }); txt(b, 262, 196, 'BILATERAL', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 });
  // 3 cavity: none, false, true
  const c = $('#qd2'); [[62, 'NONE'], [176, 'FALSE'], [290, 'TRUE']].forEach(([x, s], k) => { mk(c, 'circle', { cx: x, cy: 92, r: 48, fill: TIS, stroke: BR, 'stroke-width': 3 });
    if (k === 0) mk(c, 'circle', { cx: x, cy: 92, r: 30, fill: MES, opacity: .55 });
    if (k === 1) { mk(c, 'circle', { cx: x, cy: 92, r: 32, fill: CAV, stroke: WAT, 'stroke-width': 2 }); [[-26, -14], [22, 18], [6, -28]].forEach(([dx, dy]) => mk(c, 'ellipse', { cx: x + dx, cy: 92 + dy, rx: 8, ry: 6, fill: MES })); }
    if (k === 2) { mk(c, 'circle', { cx: x, cy: 92, r: 36, fill: MES }); mk(c, 'circle', { cx: x, cy: 92, r: 28, fill: CAV, stroke: WAT, 'stroke-width': 2 }); }
    mk(c, 'circle', { cx: x, cy: 92, r: 12, fill: '#E8C8A0', stroke: '#9A6B3A', 'stroke-width': 2.5 }); txt(c, x, 196, s, { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 }); });
  // 4 notochord
  const d = $('#qd3'); mk(d, 'path', { d: 'M40,92 C60,52 160,44 300,70 C320,80 330,92 330,92 C330,92 320,104 300,114 C160,140 60,132 40,92 Z', fill: '#F3E6D6', stroke: BR, 'stroke-width': 3 });
  mk(d, 'path', { d: 'M64,92 L310,92', stroke: NO, 'stroke-width': 10, 'stroke-linecap': 'round' }); mk(d, 'path', { d: 'M80,72 L290,76', stroke: NC, 'stroke-width': 8, 'stroke-linecap': 'round' });
  txt(d, 176, 196, 'PRESENT · ABSENT', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2 }); }

/* ---------- B + R: the key ---------- */
const SPN = [['an', 130, 200, 'Animalia', 'KINGDOM', 1], ['q1', 400, 230, 'Organisation', 'QUESTION 1', 0], ['q2', 680, 200, 'Symmetry', 'QUESTION 2', 0], ['q3', 960, 210, 'Body cavity', 'QUESTION 3', 0], ['q4', 1230, 200, 'Notochord', 'QUESTION 4', 0], ['ch', 1460, 180, 'Chordata', 'NOTOCHORD', 1]];
const SY = 92, SH = 64, SC2 = SY + SH / 2;
const LEAF = { // node: [[name, sub, top, time, exitLabel?]]
  q1: [['Porifera', 'SPONGES', 250, wt('B2', 'Porifera'), 'CELLULAR LEVEL']],
  q2: [['Coelenterata', 'CNIDARIA', 250, wt('B3', 'Coelenterata'), 'RADIAL · 2 LAYERS'], ['Ctenophora', 'COMB JELLIES', 310, wt('B3', 'Ctenophora')]],
  q3: [['Platyhelminthes', 'FLATWORMS', 250, wt('B4', 'Platyhelminthes'), 'NO CAVITY'], ['Aschelminthes', 'ROUNDWORMS', 340, wt('B5', 'Aschelminthes'), 'FALSE CAVITY']],
  q4: [['Annelida', '', 250, wt('B6', 'Annelida'), 'NO NOTOCHORD'], ['Arthropoda', '', 306, wt('B6', 'Arthropoda')], ['Mollusca', '', 362, wt('B6', 'Mollusca')], ['Echinodermata', '', 418, wt('B6', 'Echinodermata')], ['Hemichordata', '', 474, wt('B6', 'Hemichordata')]]};
const VL = [['Cyclostomata', 194, wt('B7', 'jaws'), 'NO JAWS'], ['Chondrichthyes', 258, wt('B7', 'fishes') - 0.2, 'JAWS · FINS'], ['Osteichthyes', 302, wt('B7', 'fishes')], ['Amphibia', 366, wt('B7', 'four'), 'JAWS · LIMBS'], ['Reptilia', 410, wt('B7', 'four') + 0.15], ['Aves', 454, wt('B7', 'four') + 0.3], ['Mammalia', 498, wt('B7', 'four') + 0.45]];
const tSpn = { an: tB1 + 0.3, q1: T0('B2') + 0.2, q2: T0('B3') + 0.2, q3: wt('B4', 'cavity'), q4: wt('B6', 'true'), ch: wt('B6', 'Chordata') };
const CONT = [['an', 'q1', '', tSpn.q1 - 0.3], ['q1', 'q2', 'TISSUES +', wt('B2', 'Everyone')], ['q2', 'q3', 'BILATERAL', wt('B4', 'Bilateral')], ['q3', 'q4', 'TRUE COELOM', wt('B6', 'true')], ['q4', 'ch', 'PRESENT', wt('B6', 'Chordata')]];
const SP = Object.fromEntries(SPN.map(n => [n[0], n]));
const kS = $('#kS');
let kh = SPN.map(([id, x, w, a, b, k]) => `<div class="kn" id="kn_${id}" style="left:${x - w / 2}px;top:${SY}px;width:${w}px;${k ? 'background:var(--ac);border-color:var(--ac);color:#fff' : ''}"><div class="b"${k ? ' style="color:#E4F3E8"' : ''}>${b}</div><div class="a">${a}</div></div>`).join('');
const EXL = [], LV = [];
Object.entries(LEAF).forEach(([n, L]) => { const x = SP[n][1], x0 = x - 135, last = L[L.length - 1][2] + 25;
  const trunk = mk(kS, 'path', { d: `M${x},${SY + SH} L${x},${SY + SH + 18} L${x0},${SY + SH + 18} L${x0},${last}`, stroke: '#B8BEC9', 'stroke-width': 3, fill: 'none' });
  L.forEach(([nm, sb, top, tt, el], i) => { const id = `kl_${n}${i}`; kh += `<div class="kl" id="${id}" style="left:${x - 120}px;top:${top}px;width:240px${sb ? '' : ';height:44px'}"><div class="a">${nm}</div>${sb ? `<div class="b">${sb}</div>` : ''}</div>`;
    const stub = mk(kS, 'path', { d: `M${x0},${top + 25} L${x - 120},${top + 25}`, stroke: '#B8BEC9', 'stroke-width': 3, fill: 'none' });
    LV.push({ id, tt, stub, trunk: i === 0 ? trunk : null });
    if (el) EXL.push({ e: txt(kS, x - 118, top - 10, el, { class: 'ke' }), tt: tt - 0.4 }); }); });
{ const x = SP.ch[1], x0 = x - 100; const trunk = mk(kS, 'path', { d: `M${x},${SY + SH} L${x},${SY + SH + 14} L${x0},${SY + SH + 14} L${x0},${VL[VL.length - 1][1] + 19}`, stroke: '#B8BEC9', 'stroke-width': 3, fill: 'none' });
  VL.forEach(([nm, top, tt, el], i) => { const id = `kv${i}`; kh += `<div class="kl" id="${id}" style="left:${x - 90}px;top:${top}px;width:180px;height:38px"><div class="a" style="font-size:19px">${nm}</div></div>`;
    const stub = mk(kS, 'path', { d: `M${x0},${top + 19} L${x - 90},${top + 19}`, stroke: '#B8BEC9', 'stroke-width': 3, fill: 'none' }); LV.push({ id, tt, stub, trunk: i === 0 ? trunk : null });
    if (el) EXL.push({ e: txt(kS, x - 88, top - 6, el, { class: 'ke', 'font-size': 13 }), tt: tt - 0.3 }); }); }
$('#kns').innerHTML = kh;
const CE = CONT.map(([a, b, l, tt]) => { const A = SP[a], B = SP[b], x1 = A[1] + A[2] / 2, x2 = B[1] - B[2] / 2;
  const p = mk(kS, 'path', { d: `M${x1 + 4},${SC2} L${x2 - 6},${SC2}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none' }), h = mk(kS, 'path', { d: `M${x2 - 14},${SC2 - 8} L${x2 - 2},${SC2} L${x2 - 14},${SC2 + 8} Z`, fill: C.ac });
  const lb = l ? txt(kS, (x1 + x2) / 2, SY - 8, l, { class: 'ke', 'text-anchor': 'middle', fill: C.ac }) : null; return { p, h, lb, tt }; });
const tStep = [T0('B2'), T0('B3'), T0('B4'), T0('B7')];
// token runs (R): keyframes [t, x, y]
const LC = id => { const e = document.getElementById(id); return [e.offsetLeft + e.offsetWidth / 2, e.offsetTop + e.offsetHeight / 2]; };
let RUN = null;
const avR = PUC.avatar($('#sB'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Four questions. Every animal!' });

/* ---------- K: jellyfish vs starfish ---------- */
const KA = [['Two germ layers: diploblastic', wt('K2', 'jellyfish')], ['No coelom', wt('K3', 'jellyfish')], ['Radial: on the radial branch', wt('K4', 'only')]];
const KB = [['Three germ layers: triploblastic', wt('K2', 'starfish')], ['A true coelom', wt('K3', 'starfish')], ['Adult radial, larva bilateral', wt('K4', 'larva')]];
const row = (L, p) => L.map(([s], i) => `<div class="cmp" id="${p}${i}" style="top:${266 + i * 82}px"><b style="background:var(--ac)">${M.icon('check', 16, '#fff', 3.4)}</b>${s}</div>`).join('');
$('#kas').innerHTML = row(KA, 'ka'); $('#kbs').innerHTML = row(KB, 'kb');
{ const a = mk($('#kaS'), 'g', {}); jelly(a); fit(a, 'jelly', 300, 170, 392, 158); const b = mk($('#kbS'), 'g', {}); starfish(b); fit(b, 'starfish', 300, 170, 392, 158); }
const th1 = PUC.think($('#th1'), { q: 'A leech has a true coelom, and its body is made of rings. Which phylum?', opts: ['Annelida', 'Aschelminthes'], right: 0, why: 'Annelida: a true coelom, bilateral, no notochord, and a segmented body.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">Four questions, in that order, sort <b>every</b> animal.</span>';

/* ---------- W ---------- */
const WC = [['PORIFERA', 'Sycon', '', 'CELLULAR LEVEL', wt('W2', 'Sycon'), 'sycon', sycon], ['PLATYHELMINTHES', 'Taenia', 'tapeworm', 'BILATERAL › NO CAVITY', wt('W3', 'Taenia'), 'taenia', taenia],
  ['ASCHELMINTHES', 'Ascaris', 'roundworm', 'BILATERAL › FALSE CAVITY', wt('W4', 'Ascaris'), 'ascaris', ascaris], ['AVES', 'Columba', 'pigeon', 'COELOM › NOTOCHORD › FEATHERS', wt('W5', 'Columba'), 'pigeon', pigeon]];
$('#cols').innerHTML = WC.map(([h, g, n, p], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 388}px"><div class="ch2" id="wh${i}">${h}</div><div class="dz"></div>
  <div class="it" id="it${i}"><svg class="dr" id="wd${i}" width="352" height="166"></svg><div class="inm"><i>${g}</i>${n ? `<span style="font-weight:500"> · ${n}</span>` : ''}</div></div><div class="rs" id="rs${i}"><span class="pa">${p}</span></div></div>`).join('');
WC.forEach((w, i) => { const g = mk($('#wd' + i), 'g', {}); w[6](g); fit(g, w[5], 280, 130, 176, 88); });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Starfish go with jellyfish, because both look radial', right: 'Echinoderms: triploblastic, coelomate, bilateral larvae' });
const tS = $('#tS'); const tSt = mk(tS, 'g', {}); starfish(tSt, 120, 130, 80);
const tLv = mk(tS, 'g', {}); mk(tLv, 'path', { d: 'M330,70 C380,70 400,110 396,140 C392,180 370,200 330,200 C290,200 268,180 264,140 C260,110 280,70 330,70 Z', fill: '#FBE7D6', stroke: BR, 'stroke-width': 3.5 });
mk(tLv, 'path', { d: 'M290,110 C310,130 350,130 370,110 M286,160 C310,180 350,180 374,160', stroke: '#B8662E', 'stroke-width': 3, fill: 'none' }); mk(tLv, 'line', { x1: 330, y1: 56, x2: 330, y2: 214, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const tLb = [txt(tS, 120, 248, 'ADULT: RADIAL', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: '#B8662E', 'letter-spacing': 1 }), txt(tS, 330, 248, 'LARVA: BILATERAL', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: C.ac, 'letter-spacing': 1 })];
const where = PUC.where($('#wa'), { on: [], type: 'Statements on the basis of classification; placing a phylum on the right branch' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 940,
  q: 'Which statements about the key are correct?<div class="sl"><b>I</b>Porifera: cellular level of organisation.</div><div class="sl"><b>II</b>Ctenophora: bilateral symmetry, triploblastic.</div><div class="sl"><b>III</b>Aschelminthes: pseudocoelomate.</div><div class="sl"><b>IV</b>Hemichordata: coelomate, but no notochord.</div>',
  opts: ['I and II only', 'II and IV only', 'I, II and III only', 'I, III and IV only'], right: 3, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">D</b> (I, III, IV)'], ['<b style="color:var(--red)">II</b> is false'], ['Ctenophora: radial, 2 layers'], ['<b style="color:var(--ok)">I</b> sponges · <b style="color:var(--ok)">III</b> roundworms'], ['<b style="color:var(--ok)">IV</b>: no true notochord']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'Ctenophores'), wt('A3', 'One'), wt('A3', 'Four')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · the key to kingdom Animalia', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>1 Organisation</b>: cellular level › Porifera', '<b>2 Symmetry</b>: radial, 2 layers › Coelenterata, Ctenophora', '<b>3 Cavity</b>: none › Platyhelminthes · false › Aschelminthes',
    '<b>True coelom, no notochord</b>: Annelida to Hemichordata (5 phyla)', '<b>4 Notochord</b> › Chordata › jaws, then fins or limbs › classes'] });
const YQ = ['What are the four questions of the key, in order?', 'Why is the starfish not placed with the jellyfish?', 'Walk a frog down the key. Where does it land?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'PART 1 COMPLETE', topic: 'Diversity in the Living World: all four chapters done', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
function buildRun() {
  const N = id => [SP[id][1], SC2], an = LC('kl_q40'), av = LC('kv5'), x4 = SP.q4[1] - 135, xv = SP.ch[1] - 100;
  const W = [[wt('R1', 'Drop') - 0.3, ...N('an')], [wt('R2', 'Organ'), ...N('q1')], [wt('R2', 'Bilateral'), ...N('q2')], [wt('R2', 'three'), ...N('q3')], [wt('R3', 'true'), ...N('q4')], [wt('R3', 'No'), x4, SC2 + 50], [wt('R3', 'No') + 0.5, x4, an[1]], [wt('R3', 'lands'), an[0], an[1]]];
  const K = [[wt('R4', 'crow') - 0.2, ...N('an')], [wt('R4', 'Coelomate') - 0.3, ...N('q1')], [wt('R4', 'Coelomate'), ...N('q3')], [wt('R4', 'notochord'), ...N('q4')], [wt('R4', 'jaws'), ...N('ch')], [wt('R4', 'limbs'), xv, SC2 + 50], [wt('R4', 'feathers'), xv, av[1]], [wt('R4', 'lands'), av[0], av[1]]];
  const mkT = P => ({ t0: P[0][0], t1: P[P.length - 1][0], x: M.track(P[0][1], P.slice(1).map(p => [p[0], p[1]]), M.SOFT), y: M.track(P[0][2], P.slice(1).map(p => [p[0], p[2]]), M.SOFT) });
  RUN = [mkT(W), mkT(K)];
}

/* ---------- frame ---------- */
M.on(t => {
  if (!RUN) buildRun();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    PH.forEach((_, i) => M.vis($('#ph' + i), t, wt('H2', 'eleven') - 0.2 + i * 0.09, 1e9, POP)); CLS.forEach((_, i) => M.vis($('#pk' + i), t, wt('H2', 'classes') - 0.2 + i * 0.09, 1e9, POP));
    M.vis($('#hjP'), t, wt('H2', 'Too') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'flowchart') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#plan'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) [wt('H5', 'build'), wt('H5', 'walk'), wt('H5', 'class')].forEach((tt, i) => M.vis($('#pc' + i), t, tt - 0.2, 1e9, { dx: -20, dy: 0 }));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tB1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dq'), t, tD1 + 0.05, OUT('B1'), { dy: 36, ...o });
    let last = -1; Q4.forEach((q, i) => { if (t >= q[2] - 0.1) last = i; });
    Q4.forEach((q, i) => { const el = $('#q4' + i); M.vis(el, t, q[2] - 0.2, 1e9, { dy: 20 }); el.style.background = i === last ? C.ac2 : C.soft; });
  }

  /* B + R: the key */
  const bOn = t >= tB1 - 0.1 && t < tK1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('K1');
    M.vis($('#kc'), t, tB1 + 0.05, out, { dy: 36, ...o });
    let st = 0; tStep.forEach((tt, i) => { if (t >= tt - 0.1) st = i; });
    M.setT($('#kTagN'), t >= tR1 - 0.2 ? 'RUN THE KEY' : `STEP ${st + 1} OF 4`); M.vis($('#kTag'), t, tB1 + 0.5, 1e9, POP);
    SPN.forEach(n => { const el = $('#kn_' + n[0]), g = M.vis(el, t, tB1 + 0.4, 1e9, { dy: 10 }); if (g) el.style.opacity = (0.28 + 0.72 * M.io((t - tSpn[n[0]] + 0.1) / 0.3)).toFixed(3); });
    // the question being asked is outlined green
    const ask = t < tR1 ? (t >= wt('B7', 'notochord') - 0.1 ? 'q4' : t >= tSpn.q3 ? 'q3' : t >= tSpn.q2 ? 'q2' : t >= tSpn.q1 ? 'q1' : '') : '';
    ['q1', 'q2', 'q3', 'q4'].forEach(id => { const el = $('#kn_' + id); el.style.borderColor = id === ask ? C.ac : '#CBD0DA'; el.style.background = id === ask ? '#F2F8F3' : '#FFFFFF'; });
    CE.forEach(c => { M.draw(c.p, t, c.tt - 0.3, 0.35); M.vis(c.h, t, c.tt, 1e9, { dy: 0, fade: 0.1 }); if (c.lb) M.vis(c.lb, t, c.tt, 1e9, { dy: 6 }); });
    LV.forEach(l => { if (l.trunk) M.draw(l.trunk, t, l.tt - 0.5, 0.4); M.draw(l.stub, t, l.tt - 0.2, 0.2); M.vis($('#' + l.id), t, l.tt - 0.1, 1e9, POP); });
    EXL.forEach(l => M.vis(l.e, t, l.tt, 1e9, { dy: 6 }));
    // token
    const tok = $('#ktok'); const r = RUN.findIndex((R, i) => t >= R.t0 - 0.2 && (i === 1 || t < RUN[1].t0 - 0.3));
    if (r >= 0 && t >= RUN[0].t0 - 0.2) { const R = RUN[r]; tok.style.left = (R.x(t) - 30).toFixed(1) + 'px'; tok.style.top = (R.y(t) - 30).toFixed(1) + 'px';
      if (tok._k !== r) { tok._k = r; tok.innerHTML = M.icon(r ? 'crow' : 'worm', 32, '#fff', 2.2); }
      M.vis(tok, t, R.t0 - 0.2, r === 0 ? RUN[1].t0 - 0.4 : 1e9, { dy: 0, sc: 0.5, sp: M.POP, outDur: 0.25, osc: 0.6, ody: 0 }); } else M.hide(tok, true);
    const land = [['kl_q40', RUN[0].t1, RUN[1].t0 - 0.4], ['kv5', RUN[1].t1, 1e9]];
    land.forEach(([id, a, b]) => { const u = M.io((t - a) / 0.3) * (1 - M.io((t - b) / 0.3)); const el = $('#' + id); el.style.background = mix(C.soft, C.ac, u); el.style.color = u > 0.5 ? '#FFFFFF' : C.ink; });
    avR(t, wt('R4', 'Aves') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K5');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'starfish') - 0.2, out, { dx: 60, dy: 0, ...o });
    KA.forEach((r, i) => M.vis($('#ka' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 })); KB.forEach((r, i) => M.vis($('#kb' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, tK5 + 0.05, tT - 0.3, { dy: 36, ...o });
    th1(t, { tin: tK5, tOpts: wt('K5', 'Which') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'true') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Cells') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Four') - 0.1, 1.2);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.6, 1e9, { dy: 8 });
      const hh = $('#wh' + i), on = M.io((t - w[4] - 0.3) / 0.3); hh.style.color = on > 0.5 ? C.ac : C.mute; hh.style.opacity = (0.35 + 0.65 * on).toFixed(2); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'starfish') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'triploblastic') - 0.1 });
    M.vis(tSt, t, wt('X2', 'radial') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tLb[0], t, wt('X2', 'radial'), 1e9, { dy: 6 });
    M.vis(tLv, t, wt('X3', 'bilateral') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(tLb[1], t, wt('X3', 'bilateral'), 1e9, { dy: 6 });
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
