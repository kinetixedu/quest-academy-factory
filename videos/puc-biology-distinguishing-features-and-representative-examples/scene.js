// PUC Biology Ep 38: Distinguishing Features and Representative Examples (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = '#2E2A24', WAT = '#5AA0C8', RBC = '#D1495B';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
let CLIP = 0; const clipTo = (g, d) => { const id = 'clp' + (++CLIP); const cp = mk(g, 'clipPath', { id }); mk(cp, 'path', { d }); return `url(#${id})`; };

Object.assign(M.IC, {
  whale: ['M2 12c2-4 8-5 13-3.6 2 .6 3.4 2 4.4 3.6l2.6-2.4v5L19.4 13c-1.4 3-5 4.4-9.4 4.2C5.6 17 3 15.6 2 12Z', 'M6 11h.01', 'M8 4c0 1.4-.6 2.4-1 3', 'M8 4c0 1.4.6 2.4 1 3'],
  bat: ['M12 8c-1.4 0-2 1.4-2 3s.6 4 2 4 2-2.4 2-4-.6-3-2-3Z', 'M10.6 8.4 10 6', 'M13.4 8.4 14 6', 'M10 11C7 7 4 7 1.5 8.5c1.5 1 2 2.6 1.6 4 1.4-.4 2.6 0 3.4 1 .4-1.6 2-2.4 3.5-2', 'M14 11c3-4 6-4 8.5-2.5-1.5 1-2 2.6-1.6 4-1.4-.4-2.6 0-3.4 1-.4-1.6-2-2.4-3.5-2'],
  penguin: ['M12 2.6c-2.6 0-4 2.4-4 5 0 1.2-1.6 3.6-1.6 7 0 4 2.4 6.4 5.6 6.4s5.6-2.4 5.6-6.4c0-3.4-1.6-5.8-1.6-7 0-2.6-1.4-5-4-5Z', 'M10.4 10.6c-.6 1.4-1 2.8-1 4.4 0 2.4 1 4 2.6 4s2.6-1.6 2.6-4c0-1.6-.4-3-1-4.4', 'M14.6 5.8l2.6.8-2.4.8', 'M12.6 5.6h.01'],
  fish: ['M2 12c3-5 9-6 14-3l5-3v12l-5-3c-5 3-11 2-14-3Z', 'M7 11h.01'],
  worm: ['M3 12c2-4 5-4 7 0s5 4 7 0 3-3 4-2', 'M3.4 11.4h.01'],
  platypus: ['M7 12c0-2.4 3-4 7-4s7 1.6 7 4-3 4-7 4-7-1.6-7-4Z', 'M7 11.2c-1.6-1-3.6-1-5 0 1.4 1.6 3.4 1.6 5 .6', 'M10 16l-1 2.6', 'M17 16l1 2.6', 'M9.4 10.6h.01'],
  crow: ['M3 10l3-1.6c.6-2 2.4-3 4.4-2.6 3 .6 5 3 7 6l4 2.4-4.4-.2c-2 1.6-4.6 2.2-7 1.6-2.6-.6-4-2.6-4-4.6Z', 'M10 16l-.6 5', 'M12.4 16.4l.6 4.6', 'M8.4 8.6h.01'],
  waves: ['M2 8c2-2 4 2 6 0s4-2 6 0 4 2 6 0', 'M2 14c2-2 4 2 6 0s4-2 6 0 4 2 6 0'],
  wind: ['M3 8h10a3 3 0 1 0-3-3', 'M3 16h14a3 3 0 1 1-3 3', 'M3 12h17'],
});

/* ---------- animal drawings (canonical, in a 1056 x 580 card) ---------- */
function whale(g) {
  const r = {};
  mk(g, 'path', { d: 'M736,262 L796,238 L846,196 L842,236 L812,264 L842,292 L846,334 L796,292 L736,280 Z', fill: '#6F8399', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const body = 'M78,256 C112,190 290,168 470,176 C600,182 690,222 746,262 C690,302 570,338 420,342 C250,346 102,322 78,256 Z';
  mk(g, 'path', { d: body, fill: '#7F93A8', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  const cg = mk(g, 'g', { 'clip-path': clipTo(g, body) });
  mk(cg, 'path', { d: 'M60,270 C200,300 420,300 760,262 L760,360 L60,360 Z', fill: '#C9D3DD' });
  for (let k = 0; k < 6; k++) mk(cg, 'path', { d: `M${100 + k * 10},${282 + k * 6} L${320 + k * 6},${302 + k * 4}`, stroke: '#9AA9B8', 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: 152, cy: 252, r: 7, fill: BR }); mk(g, 'path', { d: 'M80,258 Q150,272 214,270', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M236,322 L208,404 L318,330 Z', fill: '#6F8399', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M218,182 q12,-8 24,0', stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  r.sp = [0, 1, 2].map(k => mk(g, 'path', { d: `M230,170 Q${214 + k * 16},${120 - k * 4} ${200 + k * 30},${96 + (k === 1 ? -14 : 0)}`, stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '10 8' }));
  return r;
}
function bat(g) {
  const W = '#4E3B30', F = '#7A5A44';
  const wing = s => { const x = v => 400 + s * (v - 400);
    mk(g, 'path', { d: `M${x(370)},236 L${x(250)},196 L${x(130)},168 L${x(156)},238 L${x(108)},298 L${x(182)},318 L${x(170)},384 L${x(372)},322 Z`, fill: W, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
    [[130, 168], [108, 298], [170, 384]].forEach(([a, b]) => mk(g, 'path', { d: `M${x(250)},196 L${x(a)},${b}`, stroke: '#8B6F5C', 'stroke-width': 2.5 }));
    mk(g, 'path', { d: `M${x(370)},236 L${x(250)},196`, stroke: '#8B6F5C', 'stroke-width': 3 }); };
  wing(1); wing(-1);
  mk(g, 'ellipse', { cx: 400, cy: 286, rx: 46, ry: 84, fill: F, stroke: BR, 'stroke-width': 4.5 });
  for (let k = 0; k < 12; k++) mk(g, 'path', { d: `M${376 + (k % 4) * 16},${236 + Math.floor(k / 4) * 34} l6,12`, stroke: '#5E4434', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M372,170 L362,104 L400,150 Z', fill: F, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' }); mk(g, 'path', { d: 'M428,170 L438,104 L400,150 Z', fill: F, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 400, cy: 184, r: 38, fill: F, stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'circle', { cx: 386, cy: 178, r: 5, fill: BR }); mk(g, 'circle', { cx: 414, cy: 178, r: 5, fill: BR }); mk(g, 'path', { d: 'M394,200 L406,200 L400,208 Z', fill: BR });
  mk(g, 'path', { d: 'M384,366 L376,392 M416,366 L424,392', stroke: BR, 'stroke-width': 4, 'stroke-linecap': 'round' });
}
function penguin(g) {
  const K = '#2F3440';
  mk(g, 'path', { d: 'M296,456 l-34,10 l40,4 Z M356,456 l-6,14 l40,-2 Z', fill: '#E58A3C', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const body = 'M330,110 C390,110 420,160 420,210 C420,250 460,320 452,380 C444,440 396,466 330,466 C262,466 214,440 208,380 C202,320 240,250 240,210 C240,160 270,110 330,110 Z';
  mk(g, 'path', { d: body, fill: K, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M350,200 C390,240 420,300 414,370 C408,430 376,452 336,452 C300,452 280,420 286,360 C292,300 320,250 350,200 Z', fill: '#F5F2EA' });
  for (let k = 0; k < 10; k++) mk(g, 'path', { d: `M${310 + (k % 3) * 30},${290 + Math.floor(k / 3) * 40} q8,8 16,0`, stroke: '#CFC8B8', 'stroke-width': 2.5, fill: 'none' });
  mk(g, 'path', { d: 'M408,156 L470,170 L408,184 Z', fill: '#E58A3C', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 380, cy: 160, r: 9, fill: '#fff' }); mk(g, 'circle', { cx: 383, cy: 160, r: 4.5, fill: BR });
  mk(g, 'path', { d: 'M418,248 C470,290 486,350 470,400 C450,370 432,320 410,290 Z', fill: '#262A33', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
}
function flyfish(g) {
  const r = {};
  r.wv = mk(g, 'path', { d: 'M40,440 q30,-16 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0', stroke: WAT, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  const fin = 'M290,250 L470,96 L560,104 L600,128 L330,268 Z';
  mk(g, 'path', { d: fin, fill: '#BFD8EE', 'fill-opacity': .9, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M300,258 L${480 + k * 28},${100 + k * 6}`, stroke: '#7FA6C8', 'stroke-width': 2 });
  mk(g, 'path', { d: 'M640,262 L740,206 L716,262 L762,334 Z', fill: '#6E8FB8', stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  const body = 'M90,270 C130,226 260,218 400,224 C520,230 600,248 650,266 C600,286 520,302 400,306 C260,310 130,306 90,270 Z';
  mk(g, 'path', { d: body, fill: '#D3DCE5', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  const cg = mk(g, 'g', { 'clip-path': clipTo(g, body) }); mk(cg, 'path', { d: 'M60,200 L700,200 L700,262 C560,252 300,248 60,262 Z', fill: '#6E8FB8' });
  r.op = mk(g, 'path', { d: 'M196,232 Q226,268 196,302', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 132, cy: 258, r: 9, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: 130, cy: 258, r: 4.5, fill: BR });
  mk(g, 'path', { d: 'M470,300 L520,360 L560,352 L520,300 Z', fill: '#BFD8EE', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  return r;
}
function ichthyophis(g) {
  const P = [[110, 250], [220, 236], [330, 300], [450, 330], [570, 280], [680, 250], [780, 300], [840, 360]];
  let d = `M${P[0][0]},${P[0][1]}`; for (let i = 1; i < P.length; i++) { const a = P[i - 1], b = P[i]; d += ` Q${a[0] + (b[0] - a[0]) / 2 + (i % 2 ? 0 : 0)},${i % 2 ? a[1] - 40 : a[1] + 40} ${b[0]},${b[1]}`; }
  mk(g, 'path', { d, stroke: BR, 'stroke-width': 52, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  const inner = mk(g, 'path', { d, stroke: '#6E5D52', 'stroke-width': 44, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  const L = inner.getTotalLength ? inner.getTotalLength() : 900;
  for (let s = 40; s < L - 10; s += 22) { const p = inner.getPointAtLength(s), q = inner.getPointAtLength(s + 1), nx = -(q.y - p.y), ny = q.x - p.x, n = Math.hypot(nx, ny) || 1;
    mk(g, 'line', { x1: p.x + nx / n * 20, y1: p.y + ny / n * 20, x2: p.x - nx / n * 20, y2: p.y - ny / n * 20, stroke: '#4A3D35', 'stroke-width': 2.2 }); }
  mk(g, 'path', { d, stroke: '#FFFFFF', 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '30 90', opacity: .55, transform: 'translate(0 -12)' });
  mk(g, 'circle', { cx: 100, cy: 244, r: 6, fill: '#F2EADF', stroke: BR, 'stroke-width': 2 }); mk(g, 'path', { d: 'M86,262 Q110,270 134,260', stroke: BR, 'stroke-width': 2.5, fill: 'none' });
}
function platypus(g) {
  const F = '#8A6A4E', r = {};
  mk(g, 'path', { d: 'M620,292 C700,270 770,282 780,302 C770,322 700,334 620,318 Z', fill: '#6E5440', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M300,346 l-30,40 l60,0 Z M540,346 l-22,40 l60,0 Z', fill: '#4A3D35', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'ellipse', { cx: 430, cy: 302, rx: 210, ry: 70, fill: F, stroke: BR, 'stroke-width': 4.5 });
  for (let k = 0; k < 14; k++) mk(g, 'path', { d: `M${300 + (k % 7) * 40},${264 + Math.floor(k / 7) * 40} l8,10`, stroke: '#6E5440', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M232,290 C170,264 96,272 82,294 C96,318 170,324 232,310 Z', fill: '#3E3A36', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 252, cy: 284, r: 6, fill: BR });
  r.egg = mk(g, 'g', {}); mk(r.egg, 'ellipse', { cx: 760, cy: 436, rx: 30, ry: 38, fill: '#F6EFDC', stroke: BR, 'stroke-width': 3.5 }); mk(r.egg, 'path', { d: 'M744,418 q8,-8 16,-4', stroke: '#fff', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  return r;
}
function crow(g) {
  const K = '#4A4F5A', W = '#3A3F49';
  mk(g, 'path', { d: 'M360,346 L350,440 M400,346 L410,440 M350,440 l-22,8 M350,440 l10,12 M410,440 l-20,10 M410,440 l14,10', stroke: '#8A7A6A', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M560,300 L702,320 L700,344 L580,334 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M200,250 C220,190 300,170 380,190 C470,212 540,260 600,304 C520,344 430,358 360,350 C270,340 210,310 200,250 Z', fill: K, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M296,228 C400,212 520,250 646,320 C520,324 400,312 316,284 Z', fill: W, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M${360 + k * 54},${238 + k * 14} q20,24 ${10 + k * 6},${46 - k * 4}`, stroke: '#646B78', 'stroke-width': 2.5, fill: 'none' });
  mk(g, 'circle', { cx: 214, cy: 214, r: 52, fill: K, stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M168,200 L84,224 L170,236 Z', fill: '#2E2A24', stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 200, cy: 202, r: 7, fill: '#fff' }); mk(g, 'circle', { cx: 198, cy: 202, r: 3.5, fill: BR });
}
function starfish(g) { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, R = k % 2 ? 50 : 130; d += (k ? 'L' : 'M') + (400 + R * Math.cos(a)).toFixed(1) + ',' + (290 + R * Math.sin(a)).toFixed(1); }
  mk(g, 'path', { d: d + 'Z', fill: '#E89A5C', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; for (let j = 1; j < 5; j++) mk(g, 'circle', { cx: 400 + j * 24 * Math.cos(a), cy: 290 + j * 24 * Math.sin(a), r: 5, fill: '#F6D2AE', stroke: '#B8662E', 'stroke-width': 1.5 }); } }
function jelly(g) { for (let k = 0; k < 7; k++) mk(g, 'path', { d: `M${310 + k * 30},300 q${k % 2 ? 14 : -14},40 0,80 t0,70`, stroke: '#B48CC8', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M280,300 C280,200 520,200 520,300 C480,312 320,312 280,300 Z', fill: '#E3D2EE', stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 4; k++) mk(g, 'circle', { cx: 350 + k * 34, cy: 270, r: 10, fill: 'none', stroke: '#B48CC8', 'stroke-width': 3 }); }
function cuttle(g) { for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M220,${270 + k * 8} q-50,${(k - 2.5) * 10} -90,${(k - 2.5) * 22}`, stroke: '#B47A5C', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M220,240 C300,214 520,216 600,260 C620,280 620,300 600,320 C520,364 300,366 220,340 C200,320 200,260 220,240 Z', fill: '#E6B79C', stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'path', { d: 'M230,246 C330,224 520,226 596,262', stroke: '#C98E6E', 'stroke-width': 10, fill: 'none' }); mk(g, 'path', { d: 'M230,334 C330,356 520,354 596,318', stroke: '#C98E6E', 'stroke-width': 10, fill: 'none' });
  mk(g, 'circle', { cx: 250, cy: 286, r: 9, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: 'M246,286 h10', stroke: BR, 'stroke-width': 3 }); }
function dogfish(g) { const F = '#93A3B2', B = '#A9B8C6';
  mk(g, 'path', { d: 'M320,214 L372,150 L404,212 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M70,284 C100,236 220,206 380,208 C480,210 560,232 620,258 L700,176 L676,270 L712,330 L610,300 C540,326 440,344 340,344 C200,344 96,326 70,284 Z', fill: B, stroke: BR, 'stroke-width': 4.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M220,330 L178,404 L292,338 Z', fill: F, stroke: BR, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
  for (let i = 0; i < 5; i++) mk(g, 'path', { d: `M${200 + i * 12},262 L${196 + i * 12},302`, stroke: BR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 150, cy: 262, r: 7, fill: BR }); }
const BBOX = { whale: [78, 96, 846, 404], bat: [108, 104, 692, 392], penguin: [208, 110, 486, 470], flyfish: [40, 96, 762, 450], ichthyophis: [74, 196, 866, 386], platypus: [82, 230, 790, 474],
  crow: [84, 160, 702, 452], starfish: [270, 160, 530, 400], jelly: [280, 220, 520, 460], cuttle: [120, 214, 616, 366], dogfish: [70, 150, 712, 404] };
const fit = (g, key, W, H, cx = W / 2, cy = H / 2) => { const [x0, y0, x1, y1] = BBOX[key], s = Math.min(W / (x1 - x0), H / (y1 - y0));
  attr(g, 'transform', `translate(${(cx - s * (x0 + x1) / 2).toFixed(1)} ${(cy - s * (y0 + y1) / 2).toFixed(1)}) scale(${s.toFixed(4)})`); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tS1 = T0('S1'), tK1 = T0('K1'), tK5 = T0('K5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['whale', 'A whale', 'SWIMS LIKE A FISH', 'whale'], ['bat', 'A bat', 'FLIES LIKE A BIRD', 'bat'], ['penguin', 'A penguin', 'CANNOT FLY AT ALL', 'penguin']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const HR = [['whale', 'A whale', 'SWIMS, SO: A FISH?', 'whale'], ['bat', 'A bat', 'FLIES, SO: A BIRD?', 'bat'], ['penguin', 'A penguin', 'NO FLYING, SO: NOT A BIRD?', 'penguin']];
$('#jrs').innerHTML = HR.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="wr" id="wr${i}">${M.icon('x', 18, C.red, 3)}&nbsp;WRONG</div></div>`).join('');
const tHq = [wt('H2', 'whale'), wt('H2', 'bat'), wt('H2', 'penguin')];

/* ---------- D ---------- */
const FL = [['waves', 'Where it lives', 'sea, land, air'], ['wind', 'How it moves', 'swims, flies, crawls']];
$('#fls').innerHTML = FL.map(([ic, a, b], i) => `<div class="fool" id="fl${i}" style="top:${84 + i * 92}px"><i>${M.icon(ic, 30, C.red, 2.4)}</i>${a}<span style="font:500 21px Poppins;color:#B98A8A">· ${b}</span></div>`).join('');
const MK = [['FISHES', 'Fins and gills', wt('D3', 'Fishes')], ['AMPHIBIA', 'Moist skin, no scales', wt('D3', 'Amphibians')], ['REPTILIA', 'Dry skin with scales', wt('D3', 'Reptiles')], ['AVES', 'Feathers', wt('D4', 'Birds')], ['MAMMALIA', 'Mammary glands + hair', wt('D4', 'Mammals')]];
$('#mks').innerHTML = MK.map(([c, m], i) => `<div class="mk5" id="mk${i}" style="top:${80 + i * 92}px"><div class="c">${c}</div><div class="m">${m}</div></div>`).join('');

/* ---------- S: the sorter ---------- */
const GT = [['Fins and gills?', 'FISHES'], ['Moist skin, no scales?', 'AMPHIBIA'], ['Dry skin with scales?', 'REPTILIA'], ['Feathers?', 'AVES'], ['Hair and mammary glands?', 'MAMMALIA']];
const GY = i => 76 + i * 98;
$('#gts').innerHTML = GT.map(([q, b], i) => `<div class="gt" id="gt${i}" style="top:${GY(i)}px"><div class="q">${q}</div><div class="bn" id="gb${i}">${b}</div></div>`).join('');
const ODD = [['S2', 'whale', 'Blue whale', 4, 'LIVES IN THE SEA', 'whale', whale], ['S3', 'bat', 'Pteropus · flying fox', 4, 'IT FLIES', 'bat', bat], ['S4', 'penguin', 'Aptenodytes · penguin', 3, 'CANNOT FLY', 'penguin', penguin],
  ['S5', 'fish', 'Exocoetus · flying fish', 0, 'GLIDES ABOVE THE WAVES', 'flyfish', flyfish], ['S6', 'worm', 'Ichthyophis', 1, 'NO LEGS, LIKE A SNAKE', 'ichthyophis', ichthyophis], ['S7', 'platypus', 'Ornithorhynchus · platypus', 4, 'IT LAYS EGGS', 'platypus', platypus]];
const tOd = ODD.map(o => T0(o[0]));
// landed icons per bin
const binN = [0, 0, 0, 0, 0], landX = [];
ODD.forEach((o, i) => { const k = o[3], n = binN[k]++; landX.push(16 + n * 40); });
$('#gts').insertAdjacentHTML('beforeend', ODD.map((o, i) => `<div class="ic" id="li${i}" style="left:${84 + landX[i]}px;top:${GY(o[3]) + 42}px">${M.icon(o[1], 22, C.ac, 2.2)}</div>`).join(''));
const trk = $('#trk'); mk(trk, 'line', { x1: 48, y1: 60, x2: 48, y2: GY(4) + 42, stroke: '#E1E4EA', 'stroke-width': 6, 'stroke-linecap': 'round' });
GT.forEach((_, i) => mk(trk, 'path', { d: `M48,${GY(i) + 42} L84,${GY(i) + 42}`, stroke: '#E1E4EA', 'stroke-width': 4 }));
const zs = $('#zS'), OG = ODD.map(o => { const g = mk(zs, 'g', {}); const inner = mk(g, 'g', {}); o.ref = o[6](inner); fit(inner, o[5], 700, 400, 400, 320); return g; });
// labels per animal: [px, py] in canonical coords -> mapped through the fit transform at build time
const LABS = [
  [[230, 178, 'Blowhole: breathes air', wt('S2', 'lungs')], [262, 360, 'Flipper (forelimb)', wt('S2', 'breathes')], [520, 330, 'Mammary glands: milk', wt('S2', 'milk')]],
  [[400, 300, 'Hair', wt('S3', 'hair')], [432, 128, 'Pinna (outer ear)', wt('S3', 'ears')], [600, 250, 'Forelimb: a wing', wt('S3', 'mammary')]],
  [[300, 230, 'Feathers', wt('S4', 'feathers')], [452, 170, 'Beak', wt('S4', 'beak')], [462, 380, 'Wing used to swim', wt('S4', 'swims')]],
  [[150, 300, 'Fins', wt('S5', 'fins')], [212, 268, 'Operculum (gill cover)', wt('S5', 'operculum')], [520, 130, 'Large fins for gliding', wt('S5', 'glides')]],
  [[450, 330, 'No limbs', wt('S6', 'legs')], [220, 236, 'Moist skin', wt('S6', 'amphibian')]],
  [[460, 262, 'Hair', wt('S7', 'hair')], [440, 368, 'Mammary glands', wt('S7', 'mammary')], [760, 400, 'Lays eggs', wt('S7', 'eggs')]]];
const LPOS = [ // label anchor (in the 1056 card) for each label
  [[300, 96, 'start'], [150, 520, 'start'], [700, 470, 'start']],
  [[380, 520, 'start'], [600, 90, 'start'], [760, 200, 'start']],
  [[150, 110, 'start'], [720, 150, 'start'], [720, 420, 'start']],
  [[110, 460, 'start'], [150, 110, 'start'], [700, 120, 'start']],
  [[560, 500, 'start'], [300, 120, 'start']],
  [[480, 160, 'start'], [440, 500, 'start'], [800, 300, 'start']]];
const mapP = (g, x, y) => { const tr = g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\) scale\(([-\d.]+)\)/); return [+tr[1] + x * +tr[3], +tr[2] + y * +tr[3]]; };
const LB = LABS.map((L, k) => L.map(([px, py, s, t0], j) => { const g = OG[k], [ax, ay] = mapP(g.firstChild, px, py), [lx, ly, an] = LPOS[k][j];
  const ln = mk(g, 'path', { d: `M${ax.toFixed(1)},${ay.toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: ax, cy: ay, r: 7, fill: C.ink, stroke: '#fff', 'stroke-width': 2 });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx, t0 }; }));
const nmT = txt(zs, 528, 556, '', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.ink });
const nmSet = k => { if (nmT._k === k) return; nmT._k = k; nmT.textContent = ''; if (k < 0) return; const [a, b] = ODD[k][2].split(' · '); const t1 = mk(nmT, 'tspan', b ? { 'font-style': 'italic' } : {}); t1.textContent = a; if (b) { const t2 = mk(nmT, 'tspan', { 'font-weight': 500 }); t2.textContent = ' · ' + b; } };

/* ---------- K: bat vs crow ---------- */
const KA = [['Hair on the skin', wt('K2', 'bat')], ['Outer ears: pinnae', wt('K3', 'bat')], ['Gives birth, feeds milk', wt('K4', 'bat')]];
const KB = [['Feathers', wt('K2', 'crow')], ['No outer ears', wt('K3', 'crow')], ['Lays eggs', wt('K4', 'crow')]];
const row = (L, p) => L.map(([s], i) => `<div class="cmp" id="${p}${i}" style="top:${266 + i * 82}px"><b style="background:var(--ac)">${M.icon('check', 16, '#fff', 3.4)}</b>${s}</div>`).join('');
$('#kas').innerHTML = row(KA, 'ka'); $('#kbs').innerHTML = row(KB, 'kb');
{ const a = mk($('#kaS'), 'g', {}); bat(a); fit(a, 'bat', 500, 170, 392, 158); const b = mk($('#kbS'), 'g', {}); crow(b); fit(b, 'crow', 500, 170, 392, 158); }
const th1 = PUC.think($('#th1'), { q: 'A dolphin lives in the sea and swims with flippers. Fish, or mammal?', opts: ['Fish', 'Mammal'], right: 1, why: 'Mammal. Delphinus breathes with lungs and feeds its young on milk.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad"><b>Feathers</b> make a bird. <b>Milk</b> makes a mammal.</span>';

/* ---------- W ---------- */
const WC = [['ECHINODERMATA', 'Asterias', 'star fish', 'no backbone; spiny skin', wt('W2', 'Asterias'), 'starfish', starfish, 0], ['CNIDARIA', 'Aurelia', 'jelly fish', 'soft body, stinging cells', wt('W3', 'Aurelia'), 'jelly', jelly, 0],
  ['MOLLUSCA', 'Sepia', 'cuttle fish', 'soft body, shell hidden inside', wt('W4', 'Sepia'), 'cuttle', cuttle, 0], ['CHONDRICHTHYES', 'Scoliodon', 'dog fish', 'fins, gill slits, cartilage: a real fish', wt('W5', 'Scoliodon'), 'dogfish', dogfish, 1]];
$('#cols').innerHTML = WC.map(([h, g, n, r, , , , ok], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 388}px"><div class="ch2" id="wh${i}">${h}</div><div class="dz"></div>
  <div class="it${ok ? '' : ' no'}" id="it${i}"><svg class="dr" id="wd${i}" width="352" height="166"></svg><div class="inm"><i>${g}</i><span style="font-weight:500"> · ${n}</span></div></div><div class="rs" id="rs${i}"><b style="color:${ok ? 'var(--ok)' : 'var(--red)'}">${ok ? 'REAL FISH' : 'NOT A FISH'}</b><br>${r}</div></div>`).join('');
WC.forEach((w, i) => { const g = mk($('#wd' + i), 'g', {}); w[6](g); fit(g, w[5], 280, 130, 176, 88); });
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A star fish is not even a fish!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Mammals never lay eggs', right: 'The platypus lays eggs: mammals are viviparous, with a few exceptions' });
const tS = $('#tS'), tG = mk(tS, 'g', {}), tGi = mk(tG, 'g', {}); const TP = platypus(tGi); fit(tGi, 'platypus', 380, 170, 230, 150);
const where = PUC.where($('#wa'), { on: [], type: 'Match the following: a genus with its class, or an odd example with its feature' });
const gi = s => `<i>${s}</i>`;
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 940,
  q: 'Which genus is correctly matched with its class?<div class="sl" style="color:var(--mute)">Choose the one correct pair.</div>',
  opts: [`${gi('Aptenodytes')}&nbsp;-&nbsp;Mammalia`, `${gi('Exocoetus')}&nbsp;-&nbsp;Osteichthyes`, `${gi('Ornithorhynchus')}&nbsp;-&nbsp;Reptilia`, `${gi('Ichthyophis')}&nbsp;-&nbsp;Reptilia`], right: 1, cols: 1, optW: 800, optH: 76, optY: 228, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b>'], ['<i>Exocoetus</i>: bony fish'], ['<i>Aptenodytes</i>: penguin, Aves'], ['<i>Ornithorhynchus</i>: a mammal'], ['<i>Ichthyophis</i>: an amphibian']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A1', 'Exocoetus'), wt('A2', 'Aptenodytes'), wt('A3', 'Ornithorhynchus'), wt('A3', 'Ichthyophis')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · the odd ones', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Sure marks</b>: fins + gills · moist skin · dry scales · feathers · milk + hair', '<b>Mammals</b>: whale, dolphin (sea) · bat (flies) · platypus (eggs)',
    '<b>Birds</b>: the penguin cannot fly, yet has feathers and a beak', '<b>Exocoetus</b> glides: a bony fish · <b>Ichthyophis</b>: limbless amphibian', '<b>Not fish</b>: star fish, jelly fish, cuttle fish · <b>Real</b>: dog fish'] });
const YQ = ['Why is a bat a mammal and not a bird?', 'Which mammal lays eggs?', 'Is a star fish a fish? Why not?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 39', topic: 'One flowchart for every animal: Comparative Classification', y: 764 });

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
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { M.vis($('#jr' + i), t, tHq[i] - 0.2, 1e9, { dy: 16 }); M.vis($('#wr' + i), t, wt('H3', 'wrong') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H4', 'break') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 + 1.2;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'sorted') - 0.1, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#plan'), t, kOut + 0.2, 1e9, { dy: 0, fade: 0.25 })) {
      M.vis($('#pc0'), t, wt('H5', 'sure') - 0.3, 1e9, { dx: -20, dy: 0 }); M.vis($('#pc1'), t, wt('H5', 'odd') - 0.3, 1e9, { dx: -20, dy: 0 });
      M.vis($('#pcP'), t, kOut + 0.3, 1e9, POP);
    }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tS1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('S1');
    M.vis($('#da'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#db'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#fl0'), t, wt('D1', 'lives') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#fl1'), t, wt('D1', 'moves') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#daL'), t, wt('D2', 'never') - 0.1, 1e9, { dy: 8 }); M.vis($('#dn0'), t, wt('D2', 'never'), 1e9, { dx: -16, dy: 0 });
    let last = -1; MK.forEach((m, i) => { if (t >= m[2] - 0.1) last = i; });
    MK.forEach((m, i) => { const el = $('#mk' + i); M.vis(el, t, m[2] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = i === last ? C.ac2 : C.soft; });
  }

  /* S: sorter */
  const sOn = t >= tS1 - 0.1 && t < tK1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#zd'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tS1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tOd.forEach((tt, i) => { if (t >= tt - 0.3) cur = i; });
    M.setT($('#zscN'), `ODD ONE ${Math.max(1, cur + 1)} OF 6`); M.vis($('#zsc'), t, tOd[0] - 0.2, 1e9, POP);
    OG.forEach((g, k) => { const tin = tOd[k] - 0.25, tout = k < 5 ? tOd[k + 1] - 0.3 : 1e9, e = M.io((t - tin) / 0.5), x = M.io((t - tout) / 0.4);
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      attr(g, 'transform', `translate(${(60 * (1 - e) - 60 * x).toFixed(1)} 0)`); g.style.opacity = Math.min(e, 1 - x).toFixed(3);
      LB[k].forEach(l => { M.draw(l.ln, t, l.t0, 0.4); M.vis(l.dot, t, l.t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - l.t0 - 0.3) / 0.25).toFixed(3); }); });
    // fools-you chip: struck through once the true features arrive
    const fch = $('#fch'); M.vis(fch, t, tOd[0] + 0.3, 1e9, POP);
    if (cur >= 0) { M.setT($('#fchT'), 'FOOLS YOU: ' + ODD[cur][4]); const st = M.io((t - LB[cur][0].t0) / 0.3); fch.style.opacity = (1 - 0.55 * st).toFixed(3); fch.style.textDecoration = st > 0.5 ? 'line-through' : 'none'; }
    nmSet(cur); nmT.style.opacity = cur >= 0 ? M.clamp((t - tOd[cur] - 0.2) / 0.3) : 0;
    if (ODD[0].ref) ODD[0].ref.sp.forEach(p => p.style.strokeDashoffset = (-(t * 30) % 18).toFixed(1));
    if (ODD[3].ref) attr(ODD[3].ref.wv, 'transform', `translate(${(-((t * 40) % 60)).toFixed(1)} 0)`);
    // token runs down the gates: one gate every 0.4 s from the line start + 0.8 until its own gate
    const tok = $('#tok');
    if (cur >= 0) { const o2 = ODD[cur], ts = tOd[cur] + 0.8, gate = o2[3], p = M.clamp((t - ts) / 0.42), steps = (t - ts) / 0.42;
      const yy = steps <= 0 ? 60 : M.track(60, [...Array(gate + 1).keys()].map(i => [ts + i * 0.42, GY(i) + 16]), M.SOFT)(t);
      const land = ts + gate * 0.42 + 0.8, lv = M.io((t - land) / 0.35);
      tok.style.top = yy.toFixed(1) + 'px'; tok.innerHTML = tok._k === cur ? tok.innerHTML : M.icon(o2[1], 28, '#fff', 2.2); tok._k = cur;
      M.vis(tok, t, tOd[cur] + 0.5, land + 0.1, { dy: 0, sc: 0.5, sp: M.POP, outDur: 0.25, osc: 0.6, ody: 0 });
      GT.forEach((_, i) => { const el = $('#gt' + i), passing = steps >= i && steps < i + 1 && i < gate ? 1 : 0, hit = i === gate && t >= ts + gate * 0.42 ? 1 : 0;
        el.style.background = hit ? C.ac2 : passing ? '#FBEDED' : C.soft; $('#gb' + i).style.background = hit ? C.ac : '#fff'; $('#gb' + i).style.color = hit ? '#fff' : C.mute; });
      void p; void lv;
    } else M.hide(tok, true);
    ODD.forEach((o2, i) => { const land = tOd[i] + 0.8 + o2[3] * 0.42 + 0.8; M.vis($('#li' + i), t, land, 1e9, { ...POP, sc: 0.3 }); });
    GT.forEach((_, i) => M.vis($('#gt' + i), t, tS1 + 0.4 + i * 0.12, 1e9, { dx: -14, dy: 0 }));
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K5');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'crow') - 0.2, out, { dx: 60, dy: 0, ...o });
    KA.forEach((r, i) => M.vis($('#ka' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 })); KB.forEach((r, i) => M.vis($('#kb' + i), t, r[1] - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, tK5 + 0.05, tT - 0.3, { dy: 36, ...o });
    th1(t, { tin: tK5, tOpts: wt('K5', 'Fish') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'NCERT') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Classify') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Feathers') - 0.1, 1.2);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#it' + i), t, w[4] - 0.15, 1e9, { dy: -24, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[4] + 0.8, 1e9, { dy: 8 });
      const hh = $('#wh' + i), on = M.io((t - w[4] - 0.8) / 0.3); hh.style.color = on > 0.5 ? (w[7] ? C.ok : C.red) : C.mute; hh.style.opacity = (0.35 + 0.65 * on).toFixed(2); });
    avW(t, wt('W2', 'echinoderm') + 0.2, wt('W3', 'Aurelia') + 2.5);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'mammals') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'platypus') - 0.1 });
    M.vis(tG, t, wt('X3', 'platypus') - 0.1, 1e9, { dy: 10 }); M.vis(TP.egg, t, wt('X3', 'eggs') - 0.1, 1e9, { ...POP, sc: 0.3 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
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
