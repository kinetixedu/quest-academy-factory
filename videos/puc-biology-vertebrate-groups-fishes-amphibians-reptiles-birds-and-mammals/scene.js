// PUC Biology Ep 37: Vertebrate Groups (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed colours (bible canon: oxygenated blood red, deoxygenated plum; batch: bone)
const BR = '#2E2A24', RBC = '#D1495B', PLUM = '#6D3B6E', WAT = '#5AA0C8', BONE = '#EFE6CC', BONED = '#8A7A4A';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
let CLIP = 0;

Object.assign(M.IC, {
  frog: [ci(7.5, 7.5, 2.2), ci(16.5, 7.5, 2.2), 'M4 13c0-3 3.6-5 8-5s8 2 8 5-3.6 6-8 6-8-3-8-6Z', 'M4 17l-2 3', 'M20 17l2 3', 'M9 14.5c1.6 1 4.4 1 6 0'],
  lizard: ['M3 12c2-2 5-2 7-1.5s5 .5 7 0 4 0 6 1.5', 'M6 11.5 4.5 8.5', 'M6.5 12.5 5 15.5', 'M13 11 12 8', 'M13.5 12.5 13 16', ci(4, 11.6, .4)],
  crow: ['M3 10l3-1.6c.6-2 2.4-3 4.4-2.6 3 .6 5 3 7 6l4 2.4-4.4-.2c-2 1.6-4.6 2.2-7 1.6-2.6-.6-4-2.6-4-4.6Z', 'M10 16l-.6 5', 'M12.4 16.4l.6 4.6', 'M8.4 8.6h.01'],
  cat: ['M6 9 5 3l4 3.4h6L19 3l-1 6', 'M6 9c-1 4 1 8 6 8s7-4 6-8', 'M9.5 11h.01', 'M14.5 11h.01', 'M10.6 13.6h2.8L12 15Z', 'M3 13.6l4 .4', 'M21 13.6l-4 .4'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  temp: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  skin: ['M3 6c3-2 6 2 9 0s6-2 9 0', 'M3 12c3-2 6 2 9 0s6-2 9 0', 'M3 18c3-2 6 2 9 0s6-2 9 0'],
});

/* ---------- animal drawings (canonical, in a 1056 x 526 card) ---------- */
const clipTo = (g, d) => { const id = 'clp' + (++CLIP); const cp = mk(g, 'clipPath', { id }); mk(cp, 'path', { d }); return `url(#${id})`; };
function shark(g) {
  const r = {}, F = '#93A3B2', B = '#A9B8C6';
  mk(g, 'path', { d: 'M320,214 L372,150 L404,212 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M530,228 L556,196 L574,238 Z', fill: F, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const body = 'M70,284 C100,236 220,206 380,208 C480,210 560,232 620,258 L700,176 L676,270 L712,330 L610,300 C540,326 440,344 340,344 C200,344 96,326 70,284 Z';
  mk(g, 'path', { d: body, fill: B, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M120,300 C220,320 420,326 600,296', stroke: '#E6ECF1', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round', opacity: .7 });
  mk(g, 'path', { d: 'M220,330 L178,404 L292,338 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M470,338 L452,384 L522,340 Z', fill: F, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  for (let i = 0; i < 5; i++) mk(g, 'path', { d: `M${200 + i * 12},262 L${196 + i * 12},302`, stroke: BR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 150, cy: 262, r: 7, fill: BR });
  mk(g, 'path', { d: 'M108,306 Q130,320 160,308', stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  const sg = mk(g, 'g', { 'clip-path': clipTo(g, body) }), rnd = M.rng(5);
  for (let k = 0; k < 70; k++) mk(sg, 'circle', { cx: 260 + rnd() * 340, cy: 226 + rnd() * 100, r: 1.8, fill: '#6E7F8F' });
  r.sk = mk(g, 'path', { d: 'M120,268 C260,250 460,252 660,262', stroke: '#F4F7FA', 'stroke-width': 7, fill: 'none', 'stroke-dasharray': '16 7', 'stroke-linecap': 'round' });
  return r;
}
function rohu(g) {
  const r = {}, F = '#D98C7A', B = '#C9D0D6';
  mk(g, 'path', { d: 'M330,202 L380,140 L450,200 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M630,270 L722,198 L702,272 L722,346 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  const body = 'M80,280 C120,214 260,190 400,196 C520,202 600,236 640,270 C600,304 520,336 400,342 C260,348 120,342 80,280 Z';
  mk(g, 'path', { d: body, fill: B, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  const sg = mk(g, 'g', { 'clip-path': clipTo(g, body) });
  for (let y = 214; y < 340; y += 22) for (let x = 250 + ((y / 22) % 2) * 13; x < 640; x += 26) mk(sg, 'path', { d: `M${x},${y} q11,11 0,22`, stroke: '#A3AEB8', 'stroke-width': 2, fill: 'none' });
  r.ab = mk(g, 'ellipse', { cx: 420, cy: 250, rx: 120, ry: 26, fill: '#F4F8FB', stroke: '#7F93A8', 'stroke-width': 3, 'stroke-dasharray': '9 6' });
  r.sk = mk(g, 'path', { d: 'M250,282 L640,276', stroke: '#F4F1E8', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  r.vb = []; for (let k = 0; k < 13; k++) r.vb.push(mk(g, 'rect', { x: 262 + k * 28, y: 275 - 1 + k * -0.4, width: 18, height: 12, rx: 3, fill: BONE, stroke: BONED, 'stroke-width': 2 }));
  mk(g, 'path', { d: 'M220,316 L188,372 L272,322 Z', fill: F, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M420,340 L410,386 L472,338 Z', fill: F, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M540,324 L542,362 L592,314 Z', fill: F, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  r.op = mk(g, 'path', { d: 'M206,214 Q246,280 206,338', stroke: BR, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 132, cy: 260, r: 10, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: 130, cy: 260, r: 5, fill: BR });
  mk(g, 'path', { d: 'M80,280 L98,274', stroke: BR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  return r;
}
function frog(g) {
  const G = '#8CC48F', D = '#5E9A62';
  mk(g, 'path', { d: 'M440,356 C520,346 584,396 566,440 C548,462 470,462 420,458 L372,458 L372,440 L440,440 C480,440 500,420 470,400 Z', fill: G, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const body = 'M150,330 C150,250 230,200 330,206 C440,212 520,270 540,340 C548,380 520,410 470,414 L250,414 C190,410 150,380 150,330 Z';
  mk(g, 'path', { d: body, fill: G, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  [[360, 280, 22, 14], [440, 320, 18, 11], [300, 340, 16, 10], [470, 370, 14, 9]].forEach(([x, y, a, b]) => mk(g, 'ellipse', { cx: x, cy: y, rx: a, ry: b, fill: D, opacity: .55 }));
  [[300, 240], [380, 236], [420, 262]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y} q14,-8 28,0`, stroke: '#FFFFFF', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round', opacity: .9 }));
  mk(g, 'circle', { cx: 210, cy: 214, r: 28, fill: G, stroke: BR, 'stroke-width': 4 }); mk(g, 'circle', { cx: 206, cy: 214, r: 13, fill: BR }); mk(g, 'circle', { cx: 202, cy: 209, r: 4, fill: '#fff' });
  mk(g, 'path', { d: 'M184,200 Q210,180 236,198', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M152,306 Q196,320 244,300', stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 264, cy: 254, r: 20, fill: '#B5DCB2', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M236,372 L222,448 L192,456 M222,448 L236,462 M222,448 L210,466', stroke: BR, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M236,372 L222,448', stroke: G, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
}
function lizard(g) {
  const G = '#B7B46A', D = '#7E7B3C';
  const legs = 'M230,316 L206,370 L180,378 M262,318 L280,366 L306,372 M468,322 L446,374 L420,382 M500,322 L522,372 L548,378';
  mk(g, 'path', { d: legs, stroke: BR, 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: legs, stroke: G, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  for (let k = 0; k < 9; k++) mk(g, 'path', { d: `M${176 + k * 18},${262 - (k < 5 ? 0 : 1)} l9,-${18 - k} l9,${18 - k}`, fill: D, stroke: BR, 'stroke-width': 2, 'stroke-linejoin': 'round' });
  const body = 'M100,300 C110,270 160,256 220,258 C320,262 420,262 520,280 C600,294 700,300 830,296 C700,312 600,320 520,322 C420,326 320,330 220,320 C170,316 110,322 100,300 Z';
  mk(g, 'path', { d: body, fill: G, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  const sg = mk(g, 'g', { 'clip-path': clipTo(g, body) });
  for (let x = 160; x < 840; x += 16) mk(sg, 'path', { d: `M${x},250 l40,90`, stroke: D, 'stroke-width': 1.6, opacity: .7 });
  for (let x = 120; x < 840; x += 16) mk(sg, 'path', { d: `M${x + 40},250 l-40,90`, stroke: D, 'stroke-width': 1.6, opacity: .7 });
  mk(g, 'circle', { cx: 140, cy: 284, r: 7, fill: BR }); mk(g, 'path', { d: 'M102,302 Q130,310 168,302', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'circle', { cx: 180, cy: 292, r: 8, fill: '#D6D39A', stroke: BR, 'stroke-width': 2.5 });
}
function crow(g) {
  const K = '#4A4F5A', W = '#3A3F49';
  mk(g, 'path', { d: 'M360,346 L350,440 M400,346 L410,440 M350,440 l-22,8 M350,440 l10,12 M410,440 l-20,10 M410,440 l14,10', stroke: '#8A7A6A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 4; k++) { mk(g, 'path', { d: `M346,${372 + k * 16} l12,0`, stroke: BR, 'stroke-width': 2 }); mk(g, 'path', { d: `M398,${372 + k * 16} l12,0`, stroke: BR, 'stroke-width': 2 }); }
  mk(g, 'path', { d: 'M560,300 L702,320 L700,344 L580,334 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M200,250 C220,190 300,170 380,190 C470,212 540,260 600,304 C520,344 430,358 360,350 C270,340 210,310 200,250 Z', fill: K, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M296,228 C400,212 520,250 646,320 C520,324 400,312 316,284 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M${360 + k * 54},${238 + k * 14} q20,24 ${10 + k * 6},${46 - k * 4}`, stroke: '#646B78', 'stroke-width': 2.5, fill: 'none' });
  for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M${236 + k * 22},${300 + (k % 2) * 8} q10,10 20,0`, stroke: '#646B78', 'stroke-width': 2.5, fill: 'none' });
  mk(g, 'circle', { cx: 214, cy: 214, r: 52, fill: K, stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M168,200 L84,224 L170,236 Z', fill: '#2E2A24', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 200, cy: 202, r: 7, fill: '#fff' }); mk(g, 'circle', { cx: 198, cy: 202, r: 3.5, fill: BR });
  mk(g, 'circle', { cx: 604, cy: 312, r: 7, fill: '#E2B27E', stroke: BR, 'stroke-width': 2 });
  // inset: hollow bone section
  const ins = mk(g, 'g', {}); mk(ins, 'circle', { cx: 860, cy: 404, r: 62, fill: '#fff', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
  mk(ins, 'circle', { cx: 860, cy: 404, r: 44, fill: BONE, stroke: BONED, 'stroke-width': 3 }); mk(ins, 'circle', { cx: 860, cy: 404, r: 32, fill: '#E8F2F8', stroke: BONED, 'stroke-width': 2 });
  [[832, 392, 888, 414], [846, 380, 872, 428], [836, 418, 884, 392]].forEach(([a, b, c, d]) => mk(ins, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: BONED, 'stroke-width': 2.5 }));
  return ins;
}
function cat(g) {
  const F = '#D9A66B', D = '#B9834A';
  mk(g, 'path', { d: 'M520,430 C620,440 664,400 646,340', stroke: BR, 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M520,430 C620,440 664,400 646,340', stroke: F, 'stroke-width': 19, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M300,444 C280,360 300,262 380,232 C450,206 520,240 540,322 C556,392 540,432 520,444 Z', fill: F, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 9; k++) mk(g, 'path', { d: `M${360 + (k % 3) * 46},${270 + Math.floor(k / 3) * 46} l10,14`, stroke: D, 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M318,300 L346,300 L350,444 L316,444 Z', fill: F, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M246,154 L250,84 L300,134 Z', fill: F, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' }); mk(g, 'path', { d: 'M256,140 L258,104 L284,132 Z', fill: '#EBB2A8' });
  mk(g, 'path', { d: 'M316,132 L360,80 L370,152 Z', fill: F, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' }); mk(g, 'path', { d: 'M330,132 L356,100 L360,140 Z', fill: '#EBB2A8' });
  mk(g, 'circle', { cx: 302, cy: 202, r: 70, fill: F, stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'ellipse', { cx: 276, cy: 196, rx: 8, ry: 10, fill: '#7CA35A', stroke: BR, 'stroke-width': 2 }); mk(g, 'ellipse', { cx: 276, cy: 196, rx: 2.5, ry: 8, fill: BR });
  mk(g, 'path', { d: 'M240,222 l10,6 -10,4 Z', fill: '#C9737A' }); mk(g, 'path', { d: 'M250,232 q-6,10 -16,8', stroke: BR, 'stroke-width': 2.5, fill: 'none' });
  mk(g, 'path', { d: 'M248,228 L190,214 M248,232 L186,236 M250,236 L196,254', stroke: BR, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' });
  [[400, 418], [436, 420], [472, 418]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 5, fill: '#EBB2A8', stroke: BR, 'stroke-width': 1.5 }));
}
const BBOX = { shark: [70, 150, 712, 404], rohu: [80, 140, 722, 386], frog: [150, 180, 568, 466], lizard: [100, 240, 830, 384], crow: [84, 160, 702, 456], cat: [186, 80, 664, 450] };
const fit = (g, key, W, H, pad = 0) => { const [x0, y0, x1, y1] = BBOX[key], s = Math.min((W - pad) / (x1 - x0), (H - pad) / (y1 - y0));
  attr(g, 'transform', `translate(${(W / 2 - s * (x0 + x1) / 2).toFixed(1)} ${(H / 2 - s * (y0 + y1) / 2).toFixed(1)}) scale(${s.toFixed(4)})`); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tC1 = T0('C1'), tP1 = T0('P1'), tK1 = T0('K1'), tK5 = T0('K5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['frog', 'A frog', 'ON THE HOSTEL STEPS', 'frog'], ['lizard', 'A lizard', 'ON THE WALL', 'lizard'], ['crow', 'A crow', 'ON THE WIRE', 'crow'], ['cat', 'A cat', 'UNDER THE STAND', 'cat']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${245 + i * 370}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n], i) => `<div class="jr" id="jr${i}" style="top:${80 + i * 104}px;height:92px"><i style="top:12px;width:68px;height:68px">${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn" style="top:12px">${n}</div><div class="jw" style="top:54px">BACKBONE · YES</div>
  <div class="jt" style="top:22px"><span class="tag" id="jq${i}" style="position:relative;background:#fff;color:var(--mute);border:2px solid var(--line)">CLASS ?</span></div></div>`).join('');

/* ---------- D: the vertebrate tree ---------- */
const ND = [ // id, x centre, y top, w, a, b, key?, time
  ['vt', 800, 70, 300, 'Vertebrata', 'BACKBONE IN THE ADULT', 1, tD1 + 0.3],
  ['ag', 330, 176, 300, 'Agnatha', 'NO JAWS', 0, wt('D2', 'No')], ['gn', 1060, 176, 340, 'Gnathostomata', 'WITH JAWS', 0, wt('D3', 'With')],
  ['cy', 330, 296, 300, 'Cyclostomata', 'ROUND SUCKING MOUTH', 1, wt('D2', 'cyclostomes')],
  ['pi', 720, 296, 260, 'Pisces', 'FINS', 0, wt('D3', 'Pisces')], ['te', 1310, 296, 300, 'Tetrapoda', 'FOUR LIMBS', 0, wt('D3', 'tetrapods')],
  ['ch', 590, 420, 236, 'Chondrichthyes', 'CARTILAGE', 1, wt('D4', 'Fishes') + 0.4], ['os', 846, 420, 236, 'Osteichthyes', 'BONE', 1, wt('D4', 'Fishes') + 0.6],
  ['am', 1052, 420, 150, 'Amphibia', '', 1, wt('D4', 'amphibians')], ['re', 1212, 420, 150, 'Reptilia', '', 1, wt('D4', 'reptiles')], ['av', 1372, 420, 140, 'Aves', '', 1, wt('D4', 'birds')], ['ma', 1504, 420, 104, 'Mammalia', '', 1, wt('D4', 'mammals')]];
$('#nds').innerHTML = ND.map(([id, x, y, w, a, b, k]) => `<div class="nd${k ? ' k' : ''}" id="nd_${id}" style="left:${x - w / 2}px;top:${y}px;width:${w}px${b ? '' : ';height:52px'}"><div class="a"${b ? '' : ' style="font-size:20px"'}>${a}</div>${b ? `<div class="b">${b}</div>` : ''}</div>`).join('') +
  `<div class="exs" id="cyx" style="left:180px;top:372px">Petromyzon (lamprey), Myxine (hagfish)</div><div class="cnt" id="cn0" style="left:614px;top:500px">2 CLASSES OF FISHES</div><div class="cnt" id="cn1" style="left:1150px;top:500px">4 CLASSES OF TETRAPODS</div>`;
const ED = [['vt', 'ag'], ['vt', 'gn'], ['ag', 'cy'], ['gn', 'pi'], ['gn', 'te'], ['pi', 'ch'], ['pi', 'os'], ['te', 'am'], ['te', 're'], ['te', 'av'], ['te', 'ma']];
const NDm = Object.fromEntries(ND.map(n => [n[0], n]));
const dS = $('#dS'), EDl = ED.map(([a, b]) => { const A = NDm[a], B = NDm[b], y0 = A[2] + 60, y1 = B[2], ym = (y0 + y1) / 2;
  return [mk(dS, 'path', { d: `M${A[1]},${y0} L${A[1]},${ym} L${B[1]},${ym} L${B[1]},${y1}`, stroke: '#B8BEC9', 'stroke-width': 3, fill: 'none' }), B[7]]; });
// the mouth chip: a small lamprey disc beside cyclostomata
const cyD = mk(dS, 'g', {}); mk(cyD, 'circle', { cx: 520, cy: 326, r: 24, fill: '#F2D7C4', stroke: BR, 'stroke-width': 3 }); mk(cyD, 'circle', { cx: 520, cy: 326, r: 10, fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; mk(cyD, 'circle', { cx: 520 + 17 * Math.cos(a), cy: 326 + 17 * Math.sin(a), r: 2.2, fill: BR }); }

/* ---------- C: class tour ---------- */
const CL = [
  ['CHONDRICHTHYES', 'Chondrichthyes', 'CARTILAGINOUS FISHES', ['Skeleton of cartilage', 'Mouth underneath: ventral', 'Tiny placoid scales', 'Males: claspers on pelvic fins'], ['Scoliodon', 'dog fish'], 'C2', shark, 'shark'],
  ['OSTEICHTHYES', 'Osteichthyes', 'BONY FISHES', ['Skeleton of bone', 'Operculum covers the gills', 'Air bladder present', 'Cycloid or ctenoid scales'], ['Labeo', 'rohu'], 'C3', rohu, 'rohu'],
  ['AMPHIBIA', 'Amphibia', 'WATER AND LAND', ['Moist skin, no scales', 'Tympanum is the ear', 'Cloaca: one common opening', 'Gills, lungs and skin breathe'], ['Rana', 'frog'], 'C4', frog, 'frog'],
  ['REPTILIA', 'Reptilia', 'CREEP OR CRAWL', ['Dry, horny skin with scales', 'No external ear opening', 'Limbs, when present: 2 pairs', 'Snakes, lizards shed skin'], ['Calotes', 'garden lizard'], 'C5', lizard, 'lizard'],
  ['AVES', 'Aves', 'THE BIRDS', ['Feathers and a beak', 'Forelimbs are wings', 'Pneumatic bones: hollow, air', 'Only gland: oil gland at tail'], ['Corvus', 'crow'], 'C6', crow, 'crow'],
  ['MAMMALIA', 'Mammalia', 'THE MAMMALS', ['Hair on the skin', 'Outer ears: pinnae', 'Mammary glands: milk', 'Different types of teeth'], ['Felis', 'cat'], 'C7', cat, 'cat']];
$('#zch').innerHTML = CL.map((c, i) => `<span class="zc" id="zc${i}">${c[0]}</span>${i < 5 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
$('#cis').innerHTML = CL.map(([, n, m, fs, [g, c]], i) => `<div class="cI" id="ci${i}"><div class="lbl" style="left:28px;top:30px">CLASS ${i + 1} OF 6</div><div class="cn">${n}</div><div class="cm">${m}</div>
  ${fs.map((f, k) => `<div class="cf" id="cf${i}${k}" style="top:${168 + k * 64}px"><b></b>${f}</div>`).join('')}<div class="ce" id="ce${i}">Example: <i>${g}</i> · ${c}</div></div>`).join('');
const zs = $('#zS'), CG = CL.map(c => { const g = mk(zs, 'g', {}); c.ref = c[6](g); return g; });
const LABS = [
  [[134, 312, 64, 150, 'Ventral mouth', 'start', wt('C2', 'underneath')], [300, 262, 300, 96, 'Cartilage skeleton', 'start', wt('C2', 'cartilage')], [440, 318, 560, 452, 'Placoid scales', 'start', wt('C2', 'placoid')]],
  [[300, 280, 330, 452, 'Bony skeleton', 'start', wt('C3', 'bony', 1)], [222, 276, 250, 104, 'Operculum', 'start', wt('C3', 'operculum')], [470, 248, 560, 110, 'Air bladder', 'start', wt('C3', 'air')]],
  [[400, 250, 640, 196, 'Moist skin, no scales', 'start', wt('C4', 'Moist')], [264, 254, 320, 110, 'Tympanum (ear)', 'start', wt('C4', 'tympanum')], [536, 392, 640, 320, 'Cloaca', 'start', wt('C4', 'cloaca')]],
  [[380, 292, 430, 150, 'Dry, scaly skin', 'start', wt('C5', 'Dry')], [180, 292, 190, 150, 'Tympanum', 'end', wt('C5', 'ear')], [206, 372, 260, 452, 'Two pairs of limbs', 'start', wt('C5', 'creep')]],
  [[120, 226, 120, 344, 'Beak', 'start', wt('C6', 'beak')], [460, 236, 520, 120, 'Feathers', 'start', wt('C6', 'Feathers')], [560, 290, 700, 210, 'Wing (forelimb)', 'start', wt('C6', 'wings')], [860, 342, 860, 300, 'Hollow bone', 'middle', wt('C6', 'hollow')]],
  [[356, 104, 450, 92, 'Pinna (outer ear)', 'start', wt('C7', 'pinnae')], [480, 300, 640, 250, 'Hair', 'start', wt('C7', 'Hair')], [436, 420, 640, 420, 'Mammary glands', 'start', wt('C7', 'mammary')]]];
const LB = LABS.map((L, k) => L.map(([px, py, lx, ly, s, an, t0]) => { const g = CG[k];
  const ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 7, fill: C.ink, stroke: '#fff', 'stroke-width': 2 });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : an === 'end' ? -12 : 0), y: ly + (an === 'middle' ? -12 : 9), 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx, t0 }; }));
const tCl = CL.map(c => T0(c[5]));

/* ---------- P: the heart ---------- */
const SP = [['Fishes', '2 chambers: 1 auricle, 1 ventricle'], ['Amphibians, most reptiles', '3 chambers: 2 auricles, 1 ventricle'], ['Crocodiles, birds, mammals', '4 chambers: 2 auricles, 2 ventricles']];
$('#sp3s').innerHTML = SP.map(([n, f], i) => `<div class="sp3" id="sp${i}" style="top:${76 + i * 108}px"><div class="n">${i + 1}</div><div class="sn">${n}</div><div class="sf">${f}</div></div>`).join('');
const tSt = ['P2', 'P3', 'P4'].map(id => T0(id) + 0.2);
const ps = $('#pS');
// chamber layouts per stage: [A1, A2, V1, V2] as [x, y, w, h]
const LAY = [
  [[438, 132, 180, 110], [438, 132, 180, 110], [408, 262, 240, 160], [408, 262, 240, 160]],
  [[328, 132, 190, 110], [538, 132, 190, 110], [388, 262, 280, 160], [388, 262, 280, 160]],
  [[338, 132, 180, 110], [538, 132, 180, 110], [338, 262, 180, 160], [538, 262, 180, 160]]];
const ch = [0, 1, 2, 3].map(i => { const g = mk(ps, 'g', {}); const r = mk(g, 'rect', { rx: 26, fill: i < 2 ? '#F6E3E6' : '#F1D2D7', stroke: BR, 'stroke-width': 4.5 });
  const t = txt(g, 0, 0, i < 2 ? 'AURICLE' : 'VENTRICLE', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: '#7A3A47', 'letter-spacing': 1.5 }); return { g, r, t }; });
const dots = []; for (let k = 0; k < 28; k++) dots.push(mk(ps, 'circle', { r: 8, fill: PLUM, stroke: '#fff', 'stroke-width': 2 }));
const pCap = txt(ps, 528, 476, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ink, 'letter-spacing': 1.5 });
const key = mk(ps, 'g', {}); mk(key, 'circle', { cx: 300, cy: 526, r: 9, fill: RBC }); txt(key, 318, 532, 'OXYGEN-RICH BLOOD', { 'font-size': 15, 'letter-spacing': 1 });
mk(key, 'circle', { cx: 580, cy: 526, r: 9, fill: PLUM }); txt(key, 598, 532, 'OXYGEN-POOR BLOOD', { 'font-size': 15, 'letter-spacing': 1 });
const lerp = (a, b, u) => a + (b - a) * u;
const along = (P, u) => { let L = 0; const seg = []; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(d); L += d; }
  let s = u * L; for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { const f = s / seg[i]; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)]; } s -= seg[i]; } return P[P.length - 1]; };

/* ---------- K: shark vs rohu ---------- */
const KA = [['Skeleton: cartilage', wt('K2', 'shark')], ['Gill slits separate, no cover', wt('K3', 'shark')], ['No air bladder: keeps swimming', wt('K4', 'shark')]];
const KB = [['Skeleton: bone', wt('K2', 'rohu')], ['Gills under the operculum', wt('K3', 'rohu')], ['Air bladder: controls floating', wt('K4', 'rohu')]];
const row = (L, p) => L.map(([s], i) => `<div class="cmp" id="${p}${i}" style="top:${266 + i * 82}px"><b style="background:var(--ac)">${M.icon('check', 16, '#fff', 3.4)}</b>${s}</div>`).join('');
$('#kas').innerHTML = row(KA, 'ka'); $('#kbs').innerHTML = row(KB, 'kb');
const kSh = mk($('#kaS'), 'g', {}), kRo = mk($('#kbS'), 'g', {}); const KS = shark(kSh), KR = rohu(kRo);
const fitK = (g, key) => { const [x0, y0, x1, y1] = BBOX[key], s = 150 / (y1 - y0) * 0.95; attr(g, 'transform', `translate(${(392 - s * (x0 + x1) / 2).toFixed(1)} ${(160 - s * (y0 + y1) / 2).toFixed(1)}) scale(${s.toFixed(4)})`); };
fitK(kSh, 'shark'); fitK(kRo, 'rohu');
const th1 = PUC.think($('#th1'), { q: 'Which one must keep swimming all the time, or it sinks?', opts: ['The shark', 'The rohu'], right: 0, why: 'The shark. With no air bladder, a cartilaginous fish swims constantly to avoid sinking.' });
const avK = PUC.avatar($('#sK'), { x: 976 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The air bladder is a float!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">Count the <b>heart</b>, place the class.</span>';

/* ---------- W: worked example ---------- */
const WC = [['AMPHIBIA', 'Frog', 'moist skin, no scales; it breathes through its skin too', wt('W2', 'frog'), 'frog'], ['REPTILIA', 'Lizard', 'dry skin covered with scales', wt('W3', 'lizard'), 'lizard'],
  ['AVES', 'Crow', 'feathers, and hollow long bones with air inside', wt('W4', 'crow'), 'crow'], ['MAMMALIA', 'Cat', 'hair, outer ears, and milk for its kittens', wt('W5', 'cat'), 'cat']];
$('#cols').innerHTML = WC.map(([h, n, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 388}px"><div class="ch2">${h}</div><div class="dz"></div>
  <div class="it" id="it${i}"><svg class="dr" id="wd${i}" width="352" height="166"></svg><div class="inm">${n}</div></div><div class="rs" id="rs${i}">${r}</div></div>`).join('');
const WDR = { frog, lizard, crow, cat };
WC.forEach((w, i) => { const g = mk($('#wd' + i), 'g', {}); const ins = WDR[w[4]](g); if (w[4] === 'crow' && ins) ins.remove(); fit(g, w[4], 352, 166, 40); });
const tWi = WC.map(w => w[3]);
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Four animals, four classes!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The air bladder helps a fish breathe', right: 'Gills breathe. The air bladder regulates buoyancy' });
const tS = $('#tS'), tG = mk(tS, 'g', {}), tGi = mk(tG, 'g', {}); const TR = rohu(tGi);
{ const [x0, y0, x1, y1] = BBOX.rohu, s = 0.56; attr(tGi, 'transform', `translate(${(230 - s * (x0 + x1) / 2).toFixed(1)} ${(150 - s * (y0 + y1) / 2).toFixed(1)}) scale(${s})`); }
const tArr = [mk(tS, 'path', { d: 'M412,96 L412,60 M400,72 L412,58 L424,72', stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), mk(tS, 'path', { d: 'M412,176 L412,212 M400,200 L412,214 L424,200', stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })];
const tLb = [txt(tS, 230, 252, 'AIR BLADDER: UP OR DOWN', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: '#4F6C88', 'letter-spacing': 1 })];
const where = PUC.where($('#wa'), { on: [], type: 'Match the following: a class with its feature, or an animal with its class' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 940,
  q: 'Match Column I (class) with Column II (feature).<div class="sl"><b>a</b>Chondrichthyes<span class="c2"><b>i</b>Pneumatic bones</span></div><div class="sl"><b>b</b>Osteichthyes<span class="c2"><b>ii</b>Operculum</span></div><div class="sl"><b>c</b>Amphibia<span class="c2"><b>iii</b>Claspers in males</span></div><div class="sl"><b>d</b>Aves<span class="c2"><b>iv</b>Gills, lungs and skin</span></div>',
  opts: ['a-ii, b-iii, c-iv, d-i', 'a-iii, b-ii, c-i, d-iv', 'a-iii, b-ii, c-iv, d-i', 'a-iv, b-ii, c-iii, d-i'], right: 2, optW: 474, optY: 400, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['a-iii: claspers, cartilaginous'], ['b-ii: operculum, bony fish'], ['c-iv: gills, lungs, skin'], ['d-i: pneumatic bones, birds']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Claspers'), wt('A2', 'operculum'), wt('A3', 'Breathing'), wt('A3', 'Pneumatic')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · vertebrate groups', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>No jaws</b>: Cyclostomata · <b>Jaws</b>: Pisces (fins), Tetrapoda (limbs)', '<b>Fishes</b>: cartilage, no air bladder · bone, operculum, air bladder',
    '<b>Amphibia</b>: moist skin, no scales · <b>Reptilia</b>: dry skin, scales', '<b>Aves</b>: feathers, pneumatic bones · <b>Mammalia</b>: hair, pinnae, milk',
    `<b>Heart</b>: <span style="font-family:'IBM Plex Mono'">2</span> fishes · <span style="font-family:'IBM Plex Mono'">3</span> amphibians, most reptiles · <span style="font-family:'IBM Plex Mono'">4</span> the rest`] });
const YQ = ['What separates the cyclostomes from all other vertebrates?', 'Which reptiles have a four chambered heart?', 'Name two differences between a shark and a rohu.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 38', topic: 'A whale, a bat, a penguin: Distinguishing Features', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jq' + i), t, wt('H2', 'different') + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Yet') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'frog') - 0.3, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#plan'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) {
      [wt('H4', 'skin'), wt('H4', 'heart'), wt('H4', 'warm')].forEach((tt, i) => M.vis($('#pc' + i), t, tt - 0.2, 1e9, { dx: -20, dy: 0 }));
      M.vis($('#pcP'), t, wt('H5', 'every') - 0.1, 1e9, POP);
    }
  }

  /* D: tree */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dt'), t, tD1 + 0.05, OUT('C1'), { dy: 36, ...o });
    ND.forEach(n => M.vis($('#nd_' + n[0]), t, n[7] - 0.1, 1e9, POP));
    EDl.forEach(([p, tt]) => M.draw(p, t, tt - 0.4, 0.35));
    M.vis($('#cyx'), t, wt('D2', 'Lampreys') - 0.1, 1e9, { dy: 8 }); M.vis(cyD, t, wt('D2', 'round') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis($('#cn0'), t, wt('D4', 'Fishes') + 0.8, 1e9, POP); M.vis($('#cn1'), t, wt('D4', 'four') - 0.1, 1e9, POP);
    // the jaw question lights the two answers in turn
    const qa = M.io((t - wt('D2', 'No')) / 0.3) * (1 - M.io((t - wt('D3', 'With')) / 0.3)), qb = M.io((t - wt('D3', 'With')) / 0.3) * (1 - M.io((t - T0('D4')) / 0.3));
    $('#nd_ag').style.borderColor = mix('#CBD0DA', C.ac, qa); $('#nd_gn').style.borderColor = mix('#CBD0DA', C.ac, qb);
  }

  /* C: class tour */
  const cOn = t >= tC1 - 0.1 && t < tP1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tC1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tCl[0] - 0.3, out, { dx: 60, dy: 0, ...o });
    let cur = 0; tCl.forEach((tt, i) => { if (t >= tt - 0.2) cur = i; });
    CL.forEach((_, i) => { const el = $('#zc' + i), on = i === cur && t >= tCl[0] - 0.2 ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), `CLASS ${cur + 1} OF 6`); M.vis($('#zsc'), t, tCl[0] - 0.1, 1e9, POP);
    CG.forEach((g, k) => { const tin = tCl[k] - 0.25, tout = k < 5 ? tCl[k + 1] - 0.3 : 1e9;
      const e = M.io((t - tin) / 0.5), x = M.io((t - tout) / 0.4);
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      attr(g, 'transform', `translate(${(60 * (1 - e) - 60 * x).toFixed(1)} 0)`); g.style.opacity = Math.min(e, 1 - x).toFixed(3);
      LB[k].forEach(l => { M.draw(l.ln, t, l.t0, 0.4); M.vis(l.dot, t, l.t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - l.t0 - 0.3) / 0.25).toFixed(3); }); });
    if (CL[0].ref) attr(CL[0].ref.sk, 'opacity', M.clamp((t - wt('C2', 'cartilage') + 0.2) / 0.4));
    if (CL[1].ref) { const u = M.clamp((t - wt('C3', 'bony', 1) + 0.2) / 0.6); CL[1].ref.vb.forEach((v, i) => { v.style.opacity = M.clamp(u * 13 - i).toFixed(2); });
      CL[1].ref.ab.style.opacity = M.clamp((t - wt('C3', 'air') + 0.2) / 0.4).toFixed(2); attr(CL[1].ref.op, 'stroke', mix(BR, C.ac, M.io((t - wt('C3', 'operculum')) / 0.3) * (1 - M.io((t - wt('C3', 'air')) / 0.3)))); }
    CL.forEach((c, i) => { const tin = tCl[i] - 0.2, tout = i < 5 ? tCl[i + 1] - 0.3 : 1e9; M.vis($('#ci' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 });
      const tl = LABS[i].map(l => l[6]); const span = (i < 5 ? tCl[i + 1] : T1('C7')) - tCl[i];
      c[3].forEach((_, k) => M.vis($('#cf' + i + k), t, k < tl.length ? Math.min(tl[k], tCl[i] + 0.4 + k * 0.5) - 0.1 : tCl[i] + span * 0.62, 1e9, { dx: -14, dy: 0 }));
      M.vis($('#ce' + i), t, wt(c[5], 'Example') - 0.1, 1e9, POP); });
  }

  /* P: heart */
  const pOn = t >= tP1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; tSt.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    SP.forEach((_, i) => { const el = $('#sp' + i), on = i === cur && t >= tSt[0] - 0.1 ? 1 : 0, done = i < cur ? 1 : 0, n = el.querySelector('.n');
      M.vis(el, t, tP1 + 0.4 + i * 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.sf'), t, tSt[i] + 0.3, 1e9, { dx: -10, dy: 0 });
      el.style.borderColor = on || done ? C.ac : '#CBD0DA'; el.style.background = on ? '#F2F8F3' : '#FFFFFF';
      n.style.background = on ? C.ac : '#FFFFFF'; n.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; n.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.vis($('#tm0'), t, wt('P5', 'Fishes') - 0.1, 1e9, POP); M.vis($('#tm1'), t, wt('P5', 'Birds') - 0.1, 1e9, POP);
    M.setT($('#pTagN'), `${cur + 2} CHAMBERS`); M.vis($('#pTag'), t, tP1 + 0.5, 1e9, POP);
    M.setT(pCap, ['FISH · 1 AURICLE + 1 VENTRICLE', 'FROG · 2 AURICLES + 1 VENTRICLE', 'BIRD, MAMMAL · 2 AURICLES + 2 VENTRICLES'][cur]);
    // morph the chambers between layouts
    const a = cur, b = Math.max(0, cur - 1), m = cur === 0 ? 1 : M.io((t - tSt[cur]) / 0.8);
    const beat = Math.max(0, Math.sin((t - tP1) * 6.2)) ** 2;
    ch.forEach((c, i) => { const A = LAY[b][i], B = LAY[a][i], R = A.map((v, k) => lerp(v, B[k], m)), sq = i >= 2 ? 1 - 0.05 * beat : 1;
      const h = R[3] * sq, y = R[1] + (R[3] - h) / 2; attr(c.r, 'x', R[0].toFixed(1)); attr(c.r, 'y', y.toFixed(1)); attr(c.r, 'width', R[2].toFixed(1)); attr(c.r, 'height', h.toFixed(1));
      attr(c.t, 'x', (R[0] + R[2] / 2).toFixed(1)); attr(c.t, 'y', (R[1] + R[3] / 2 + 6).toFixed(1)); M.vis(c.g, t, tP1 + 0.3 + (i % 2) * 0.1, 1e9, { dy: 10 }); });
    // blood: two streams (oxygen-poor from the body, oxygen-rich from the lungs). Fish: one stream only.
    const L = LAY[cur], cx = r => r[0] + r[2] / 2, cy = r => r[1] + r[3] / 2;
    const S0 = cur === 0 ? [[150, 110], [cx(L[0]) - 30, cy(L[0])], [cx(L[2]) - 30, cy(L[2])], [cx(L[2]) + 40, cy(L[2]) + 30], [900, 450]]
      : [[150, 110], [cx(L[0]), cy(L[0])], [cx(L[2]) - (cur === 1 ? 50 : 0), cy(L[2]) + 10], [cx(L[2]) - (cur === 1 ? 20 : 0), L[2][1] + L[2][3] - 10], [150, 470]];
    const S1 = [[906, 110], [cx(L[1]), cy(L[1])], [cx(L[3]) + (cur === 1 ? 50 : 0), cy(L[3]) - 10], [cx(L[3]) + (cur === 1 ? 20 : 0), L[3][1] + L[3][3] - 10], [906, 470]];
    const showB = t >= tP1 + 0.6 && (t < tSt[cur] + 0.1 || t > tSt[cur] + 0.8 || cur === 0);
    dots.forEach((d, k) => { const s = k % 2, j = Math.floor(k / 2), on = showB && (cur > 0 || s === 0);
      M.hide(d, !on); if (!on) return;
      const u = ((t - tP1) * 0.16 + j / 14) % 1, P = s === 0 ? S0 : S1; const [x, y] = along(P, u);
      attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1)); attr(d, 'fill', s === 0 ? PLUM : RBC); });
    M.vis(key, t, tP1 + 0.8, 1e9, { dy: 8 }); key.children[0].style.opacity = cur === 0 ? 0.35 : 1; key.children[1].style.opacity = cur === 0 ? 0.35 : 1;
  }

  /* K: shark vs rohu + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K5');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'rohu') - 0.2, out, { dx: 60, dy: 0, ...o });
    KA.forEach((r, i) => M.vis($('#ka' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 })); KB.forEach((r, i) => M.vis($('#kb' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 }));
    KS.sk.style.opacity = M.clamp((t - KA[0][1]) / 0.4); KR.vb.forEach((v, i) => v.style.opacity = M.clamp((t - KB[0][1]) / 0.4 * 13 - i).toFixed(2));
    KR.ab.style.opacity = M.clamp((t - KB[2][1]) / 0.4).toFixed(2); attr(KR.op, 'stroke', mix(BR, C.ac, M.io((t - KB[1][1]) / 0.3)));
    avK(t, wt('K4', 'floats') + 0.2, out);
    M.vis($('#th1'), t, tK5 + 0.05, tT - 0.3, { dy: 36, ...o });
    th1(t, { tin: tK5, tOpts: wt('K5', 'shark') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'With') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Two') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Count') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, tWi[i] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, tWi[i] + 0.6, 1e9, { dy: 8 }); });
    avW(t, wt('W5', 'Mammalia') + 0.2, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'air') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'regulates') - 0.1 });
    M.vis(tG, t, wt('X2', 'fish') - 0.1, 1e9, { dy: 10 });
    const tb = wt('X3', 'buoyancy'), bob = t > tb ? Math.sin((t - tb) * 3) * 8 : 0; TR.ab.style.opacity = M.clamp((t - tb + 0.3) / 0.3); attr(TR.ab, 'cy', (250 + bob).toFixed(1));
    tArr.forEach((a, i) => M.vis(a, t, tb + i * 0.15, 1e9, { ...POP, sc: 0.4 })); M.vis(tLb[0], t, tb + 0.3, 1e9, { dy: 6 });
    attr(TR.op, 'stroke', mix(BR, C.ac, M.io((t - wt('X3', 'gills')) / 0.3)));
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
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
