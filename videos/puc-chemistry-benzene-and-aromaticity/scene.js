// PUC Chemistry Ep 95: benzene and aromaticity (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal, hydrogen ink, moving electrons orange, s character gold, sigma teal, pi bond 1 blue, pi bond 2 violet, Br sienna, O violet, Na/Ca grey ink, N deep blue
const NC = C.ac, HC = C.ink, EC = '#C8461B', SC = '#B7791F', PB = '#2F6FEB', DV = '#7A4FE0', BR = '#A0522D', OV = '#7A4FE0', NA = '#5B6478', NB = '#1F4E9C';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Y_ = s => `\\textcolor{${NC}}{${s}}`, E_ = s => `\\textcolor{${EC}}{${s}}`, B_ = s => `\\textcolor{${BR}}{${s}}`, O_ = s => `\\textcolor{${OV}}{${s}}`, P_ = s => `\\textcolor{${PB}}{${s}}`, S_ = s => `\\textcolor{${SC}}{${s}}`;
const mf = s => `\\mathrm{${s}}`;

Object.assign(M.IC, {
  x: ['M18 6 6 18', 'm6 6 12 12'],
  drop: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z'],
  stone: ['M4 15l3-7 6-3 6 4 1 7-6 4-7-1Z'],
});

/* ---------- shared drawing ---------- */
const f1 = v => (+v).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}">${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
const tint = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const lobe = (x, y, ang, L, W, col, a = 0.26, dash) => `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" d="M0 0C${f1(L * .2)} ${f1(-W)} ${f1(L)} ${f1(-W)} ${f1(L)} 0C${f1(L)} ${f1(W)} ${f1(L * .2)} ${f1(W)} 0 0Z" fill="${tint(col, a)}" stroke="${col}" stroke-width="2.5"${dash ? ' stroke-dasharray="6 6"' : ''}/>`;
const hyb = (x, y, ang, L, W = L * 0.42) => lobe(x, y, ang + 180, L * 0.3, W * 0.55, C.ink2, 0.08) + lobe(x, y, ang, L, W, NC, 0.28);
const pDb = (x, y, ang, L, W, col = PB, dash) => lobe(x, y, ang, L, W, col, 0.16, dash) + lobe(x, y, ang + 180, L, W, col, 0.16, dash);
const dot = (x, y, r = 7, c = C.ink2) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}"/>`;
const SUBS = { '₂': '2', '₃': '3', '₄': '4' }, subT = s => s.replace(/[₂₃₄]/g, m => `<tspan dy="5" font-size="72%">${SUBS[m]}</tspan>`);
const atomC = (x, y, r, lab, col = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col}"/>` + T(x - (/[₂₃₄]/.test(lab) ? (fs || r * 0.8) * 0.12 : 0), y + (fs || r * 0.8) * 0.36, subT(lab), { ff: 'Poppins', fw: 700, fs: fs || r * 0.8, c: '#fff', ls: 0 });
const lerp = M.lerp;
const ARW = (x, y, up, c = EC) => up ? `<line x1="${f1(x)}" y1="${f1(y + 46)}" x2="${f1(x)}" y2="${f1(y + 18)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 10)} ${f1(x - 8)},${f1(y + 22)} ${f1(x + 8)},${f1(y + 22)}" fill="${c}"/>`
  : `<line x1="${f1(x)}" y1="${f1(y + 14)}" x2="${f1(x)}" y2="${f1(y + 42)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 50)} ${f1(x - 8)},${f1(y + 38)} ${f1(x + 8)},${f1(y + 38)}" fill="${c}"/>`;
// bond of order n (can be fractional during morphs: extra lines fade)
const bond = (x1, y1, x2, y2, n = 1, col = C.ink2, w = 6, r1 = 0, r2 = 0) => {
  const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy, py = ux, N = Math.ceil(n - 0.01), sp = 13;
  let s = ''; const ax = x1 + ux * r1, ay = y1 + uy * r1, bx = x2 - ux * r2, by = y2 - uy * r2;
  for (let b = 0; b < N; b++) { const k = (b - (N - 1) / 2) * sp, a = b < Math.floor(n + 0.01) ? 1 : n - Math.floor(n);
    s += G(`<line x1="${f1(ax + px * k)}" y1="${f1(ay + py * k)}" x2="${f1(bx + px * k)}" y2="${f1(by + py * k)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`, Math.max(a, 0)); }
  return s;
};
// ball-and-stick: atoms {x,y,l,c,r,a}, bonds [i,j,n,col,a]
const AR = { C: 26, H: 18, Br: 26, O: 24, Na: 24, N: 24, Ca: 28 };
const ACOL = { C: NC, H: HC, Br: BR, O: OV, Na: NA, N: NB, Ca: NA, 'CH₃': HC };
const bs = (atoms, bonds = []) => {
  let s = '';
  bonds.forEach(([i, j, n, col, a]) => { const A = atoms[i], B = atoms[j]; if ((a ?? 1) < 0.01 || (A.a ?? 1) < 0.01 || (B.a ?? 1) < 0.01) return; s += G(bond(A.x, A.y, B.x, B.y, n, col || C.ink2), (a ?? 1) * Math.min(A.a ?? 1, B.a ?? 1)); });
  atoms.forEach(A => { if ((A.a ?? 1) < 0.01) return; const r = A.r || AR[A.l] || 34; s += G(atomC(A.x, A.y, r, A.l, A.c || ACOL[A.l] || HC, A.fs || (A.l.length > 1 ? r * 0.66 : r * 0.82)), A.a ?? 1); });
  return s;
};
// curved arrow (electron movement), drawn on from start to end as u goes 0 -> 1
const carr = (x1, y1, x2, y2, bend, u, col = EC) => {
  if (u < 0.01) return '';
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, cx = mx - dy / L * bend, cy = my + dx / L * bend;
  const P = s => [(1 - s) * (1 - s) * x1 + 2 * (1 - s) * s * cx + s * s * x2, (1 - s) * (1 - s) * y1 + 2 * (1 - s) * s * cy + s * s * y2];
  const n = 28, pts = []; for (let k = 0; k <= n; k++) pts.push(P(u * k / n));
  let s = `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (u > 0.85) { const e = pts[n], q = P(Math.max(0, u - 0.06)), an = Math.atan2(e[1] - q[1], e[0] - q[0]), h = 16 * Math.min(1, (u - 0.85) / 0.15 + 0.4);
    s += `<polygon points="${f1(e[0])},${f1(e[1])} ${f1(e[0] - h * Math.cos(an - 0.45))},${f1(e[1] - h * Math.sin(an - 0.45))} ${f1(e[0] - h * Math.cos(an + 0.45))},${f1(e[1] - h * Math.sin(an + 0.45))}" fill="${col}"/>`; }
  return s;
};
const lp = (x, y, ang, a = 1) => { const px = -Math.sin(ang), py = Math.cos(ang); return G(dot(x + px * 9, y + py * 9, 6, EC) + dot(x - px * 9, y - py * 9, 6, EC), a); };
const chg = (x, y, s, c = EC) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="15" fill="#fff" stroke="${c}" stroke-width="2.5"/>` + T(x, y + 7, s, { fs: 20, c, ls: 0, ff: 'Poppins', fw: 700 });
const PL = (x, y, a) => G(T(x, y + 12, '+', { fs: 40, c: C.ink, ls: 0, ff: 'Poppins' }), a);

/* ---------- rings ---------- */
const rp = (cx, cy, R, k, n = 6, rot = -90) => [cx + R * Math.cos((rot + 360 / n * k) * Math.PI / 180), cy + R * Math.sin((rot + 360 / n * k) * Math.PI / 180)];
// skeletal ring: ords per edge k -> k+1 (second line drawn inside, fractional fades)
const poly = (cx, cy, R, n, ords, o = {}) => {
  const col = o.col || C.ink2, w = o.w || 5; let s = '';
  for (let k = 0; k < n; k++) { const p = rp(cx, cy, R, k, n, o.rot), q = rp(cx, cy, R, k + 1, n, o.rot);
    s += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    const ex = (ords[k] ?? 1) - 1; if (ex > 0.01) { const sh = 0.2, a = [lerp(p[0], cx, sh), lerp(p[1], cy, sh)], b = [lerp(q[0], cx, sh), lerp(q[1], cy, sh)], m = 0.14;
      s += G(`<line x1="${f1(lerp(a[0], b[0], m))}" y1="${f1(lerp(a[1], b[1], m))}" x2="${f1(lerp(b[0], a[0], m))}" y2="${f1(lerp(b[1], a[1], m))}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${o.dash ? ' stroke-dasharray="8 8"' : ''}/>`, ex); } }
  if (o.circ) s += G(`<circle cx="${cx}" cy="${cy}" r="${f1(R * 0.56)}" fill="none" stroke="${o.cc || NC}" stroke-width="${w}"/>`, o.circ);
  if (o.chg) s += chg(cx, cy, o.chg);
  return s;
};
// ball-and-stick benzene-type ring with H
const ringBS = (cx, cy, R, ords, o = {}) => { const n = ords.length, at = [], bd = [];
  for (let k = 0; k < n; k++) { const p = rp(cx, cy, R, k, n); at.push({ x: p[0], y: p[1], l: 'C', r: o.cr || 26 }); }
  for (let k = 0; k < n; k++) { const p = rp(cx, cy, R + (o.hl || 64), k, n); at.push({ x: p[0], y: p[1], l: (o.sub && o.sub[k]) || 'H', r: o.hr || 17, a: o.ha ?? 1 }); bd.push([k, k + n, 1]); }
  for (let k = 0; k < n; k++) bd.push([k, (k + 1) % n, ords[k], o.bcol && o.bcol[k]]);
  let s = bs(at, bd); if (o.circ) s = s.replace(/^/, '') + G(`<circle cx="${cx}" cy="${cy}" r="${f1(R * 0.55)}" fill="none" stroke="${NC}" stroke-width="5"/>`, o.circ);
  return s; };
const KI = [2, 1, 2, 1, 2, 1], KII = [1, 2, 1, 2, 1, 2];
// perspective ring (orbital picture): p orbitals, donut clouds, moving electrons
function orbRing(t, cx, cy, R, o) {
  const ry = 0.38, pts = [0, 1, 2, 3, 4, 5].map(k => { const a = (k * 60 + 30) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * ry * Math.sin(a), Math.sin(a)]; });
  let s = '';
  if (o.plane) s += G(`<polygon points="${f1(cx - R * 1.7)},${f1(cy)} ${f1(cx)},${f1(cy - R * 0.75)} ${f1(cx + R * 1.7)},${f1(cy)} ${f1(cx)},${f1(cy + R * 0.75)}" fill="${tint(NC, 0.07)}" stroke="${tint(NC, 0.4)}" stroke-width="2"/>`, o.plane);
  const don = (dy, a) => G(`<ellipse cx="${cx}" cy="${f1(cy + dy)}" rx="${f1(R)}" ry="${f1(R * ry)}" fill="none" stroke="${tint(PB, 0.3)}" stroke-width="36"/><ellipse cx="${cx}" cy="${f1(cy + dy)}" rx="${f1(R)}" ry="${f1(R * ry)}" fill="none" stroke="${PB}" stroke-width="2"/>`, a);
  const d = o.donut || 0, pw = o.p || 0, ov = o.ov || 0;
  s += don(78, d);
  const order = pts.map((p, k) => [p[2], k]).sort((a, b) => a[0] - b[0]);
  // sigma framework + H
  let fr = ''; pts.forEach((p, k) => { const q = pts[(k + 1) % 6]; fr += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.ink2}" stroke-width="6" stroke-linecap="round"/>`;
    const h = [cx + (p[0] - cx) * 1.42, cy + (p[1] - cy) * 1.42]; fr += `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(h[0])}" y2="${f1(h[1])}" stroke="${C.ink2}" stroke-width="4"/>` + atomC(h[0], h[1], 14, 'H', HC, 13); });
  order.forEach(([, k]) => { const p = pts[k]; if (pw > 0.01) s += G(pDb(p[0], p[1], 90, 72, 20 + 14 * ov, PB), pw * (1 - d * 0.75)); });
  s += fr; pts.forEach(p => { s += atomC(p[0], p[1], 20, 'C', NC, 17); });
  s += don(-78, d);
  if (o.el) { const a0 = o.el; for (let k = 0; k < 6; k++) { const a = a0 + k * Math.PI / 3, dy = k % 2 ? 78 : -78; s += dot(cx + R * Math.cos(a), cy + dy + R * ry * Math.sin(a), 8, EC); } }
  return s;
}

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tD7 = T0('D7'), tD8 = T0('D8'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };
Object.assign(M.IC, { ring: ['M12 3a9 9 0 1 0 9 9', 'M21 12l-3-3', 'M21 12l3-3'], hex: ['M12 2l8.7 5v10L12 22l-8.7-5V7Z'] });

/* ---------- title card + H ---------- */
const JOBS = [['ring', 'Snake ring', 'BITES ITS OWN TAIL', 'snake', 'RING'], ['users', 'Round table', 'ONE SHARED PLATE', 'table', 'SHARE'], ['home', 'Mothballs', 'A STRONG SMELL', 'Mothballs', 'SMELL']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['hex', '3 double bonds?', 'draws', 'H3'], ['zap', 'Should add Br₂', 'bromine', 'H4'], ['x', 'Hardly does', 'hardly', 'H4'], ['check', 'It swaps', 'swaps', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('hex', 26, '#fff', 2.2);
const QR = [[`Benzene is ${K(mf('C_6H_6'))}`, 'C₆H₆', 'P2', 'Benzene'], ['First isolated by Faraday', '1825', 'P2', 'Faraday'], ['So few H: should be unsaturated', 'C=C?', 'P3', 'unsaturated'], ['Yet it swaps an H, not adds', 'SWAP', 'P4', 'substitution'], ['Aromatic compounds, or arenes', 'ARENES', 'P5', 'aromatic']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
function drawP(t) {
  const a = io(t, T0('P2') + 0.2, 0.5), sw = io(t, wt('P4', 'swapping') - 0.2, 0.9), st = io(t, wt('P6', 'extra') - 0.1, 0.5);
  const sub = [sw > 0.5 ? 'Br' : 'H'];
  let s = G(ringBS(392, 280, 118, KI, { sub, circ: 0 }), a);
  if (sw > 0.01 && sw < 0.999) { const p = rp(392, 280, 182, 0); s += G(atomC(p[0] + 90 * sw, p[1] - 40 * sw, 17, 'H', HC, 15), 1 - sw) + G(atomC(p[0] - 90 * (1 - sw), p[1] - 40 * (1 - sw), 24, 'Br', BR, 18), sw); }
  s += G(T(392, 520, '6 C · ONLY 6 H', { fs: 22, c: C.ink }), io(t, T0('P3'), 0.4) * (1 - sw)) + G(T(392, 520, 'SWAP ONE H · RING STAYS', { fs: 22, c: NC }), sw * (1 - st)) + G(T(392, 520, 'AROMATIC · EXTRA STABLE RING', { fs: 22, c: NC }), st);
  put($('#pS'), s);
  M.setT(ptag, t < tQr[2] ? 'BENZENE · C₆H₆' : t < tQr[3] ? 'VERY UNSATURATED?' : t < tQr[4] ? 'SUBSTITUTION' : 'AROMATIC');
}

/* ---------- S + B ---------- */
const tKek = wt('S2', 'Kekule'), tMove = wt('S3', 'Move'), tBlend = wt('S4', 'blend'), tSame = wt('S5', 'equal'), tXr = wt('S5', 'X'), tCirc = wt('S7', 'circle');
const tPl = wt('B2', 'plane'), tPo = wt('B3', 'orbital'), tOv = wt('B4', 'overlaps'), tSpr = wt('B5', 'spread'), tStab = wt('B6', 'stable'), tSwp = wt('B7', 'swap');
function benchK(t) {
  const a = io(t, tS1 + 0.2, 0.5), m = io(t, tMove - 0.1, 1.2), b = io(t, tBlend - 0.1, 0.9), c = io(t, tCirc - 0.1, 0.8);
  const ords = KI.map((v, k) => { const o = lerp(v, KII[k], m); return lerp(lerp(o, 1.5, b), 1, c); });
  let s = G(ringBS(392, 290, 130, ords, { circ: c }), a);
  const ln = io(t, tSame - 0.1, 0.5);
  if (ln > 0.01) [0, 2, 4].forEach(k => { const p = rp(392, 290, 130, k), q = rp(392, 290, 130, k + 1), mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, ox = (mx - 392) * 0.42, oy = (my - 290) * 0.42; s += G(T(mx + ox * 0.0 - (mx - 392) * 0.62 + (mx - 392), my - (my - 290) * 0.62 + 7, '139', { fs: 18, c: SC, ls: 0 }), ln); });
  s += G(T(392, 548, m > 0.5 && b < 0.5 ? 'DRAWING II · DOUBLE BONDS MOVED' : b > 0.5 && c < 0.5 ? 'RESONANCE HYBRID · ALL BONDS ALIKE' : c > 0.5 ? 'THE CIRCLE = SHARED EQUALLY' : 'KEKULE DRAWING I', { fs: 20, c: C.ink, ls: 0.6 }), a);
  return s;
}
function benchO(t) {
  const el = t > tSpr ? (t - tSpr) * 1.6 : 0;
  return orbRing(t, 392, 300, 210, { plane: io(t, tPl - 0.1, 0.5) * (1 - io(t, tPo, 0.5) * 0.6), p: io(t, tPo - 0.1, 0.6), ov: io(t, tOv - 0.1, 0.8), donut: io(t, tSpr - 0.1, 0.9), el: t > tSpr ? el : 0 }) +
    G(T(392, 548, 'SIX π ELECTRONS SPREAD ROUND THE RING', { fs: 20, c: EC, ls: 0.6 }), io(t, tSpr + 0.3, 0.4)) + G(T(392, 548, 'EACH p OVERLAPS BOTH NEIGHBOURS', { fs: 20, c: PB, ls: 0.6 }), io(t, tOv, 0.4) * (1 - io(t, tSpr + 0.3, 0.4))) +
    G(T(392, 548, 'σ BONDS · ALL IN ONE PLANE', { fs: 20, c: C.ink, ls: 0.6 }), io(t, tPl, 0.4) * (1 - io(t, tOv, 0.4)));
}
const bar = (y, w, lab, v, col) => `<rect x="190" y="${y}" width="${f1(w)}" height="34" rx="8" fill="${tint(col, 0.2)}" stroke="${col}" stroke-width="3"/>` + T(170, y + 24, lab, { fs: 20, c: C.ink, ls: 0, a: 'end' }) + T(200 + w, y + 24, v, { fs: 20, c: col, ls: 0, a: 'start' });
function shapeS(t) {
  const k = io(t, tKek - 0.1, 0.4), x = io(t, tXr - 0.1, 0.5), o1 = io(t, tB1 - 0.1, 0.4), o2 = io(t, tPo - 0.1, 0.4), o3 = io(t, tSpr, 0.4);
  let s = G(T(60, 150, '1865', { fs: 58, c: C.ink, ls: 0, a: 'start' }) + T(62, 192, 'KEKULE · A RING OF SIX CARBONS', { fs: 18, a: 'start' }) + G(poly(620, 150, 70, 6, KI), 1), k * (1 - x));
  const L = io(t, tXr, 0.8);
  s += G(bar(84, 154 * 2.4 * L, 'C-C', '154 pm', C.ink2) + bar(132, 139 * 2.4 * L, 'BENZENE', '139 pm', SC) + bar(180, 133 * 2.4 * L, 'C=C', '133 pm', C.ink2) + T(36, 246, 'FLAT · ALL SIX BONDS EQUAL', { fs: 16, a: 'start' }), x * (1 - o1));
  const ro = (big, small, col, a) => G(T(60, 150, big, { fs: 58, c: col, ls: 0, a: 'start' }) + T(62, 192, small, { fs: 18, a: 'start' }), a);
  s += ro('120°', 'EACH C IS sp² · FLAT', C.ink, o1 * (1 - o2)) + ro('6 p', 'ONE p ORBITAL ON EVERY CARBON', PB, o2 * (1 - o3)) + ro('6 π e⁻', 'SHARED BY ALL SIX CARBONS', EC, o3);
  if (o1 > 0.01) s += G(lobes3h(620, 140), o1 * (1 - o2));
  if (o2 > 0.01) s += G(pDb(620, 140, 90, 56, 20, PB) + dot(620, 140, 8, NC), o2 * (1 - o3));
  if (o3 > 0.01) s += G(poly(620, 140, 66, 6, [1, 1, 1, 1, 1, 1], { circ: 1, cc: EC }), o3);
  return s;
}
const lobes3h = (x, y) => [0, 120, 240].map(a => hyb(x, y, a - 90, 70)).join('') + dot(x, y, 8, NC);
function charS(t) {
  const a2 = io(t, tMove - 0.1, 0.4), a3 = io(t, tBlend - 0.1, 0.4), st = io(t, tStab - 0.1, 0.5);
  let s = G(poly(130, 150, 62, 6, KI) + T(130, 248, 'I', { fs: 20, c: C.ink }), 1) + G(`<path d="M220 150 h70" stroke="${C.ink2}" stroke-width="3"/><polygon points="212,150 226,142 226,158" fill="${C.ink2}"/><polygon points="298,150 284,142 284,158" fill="${C.ink2}"/>` + poly(380, 150, 62, 6, KII) + T(380, 248, 'II', { fs: 20, c: C.ink }), a2) +
    G(T(510, 162, '=', { fs: 40, c: C.ink, ls: 0 }) + poly(640, 150, 62, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(640, 248, 'HYBRID', { fs: 20, c: NC }), a3);
  s = G(s, 1 - st);
  s += G(T(60, 140, 'EXTRA STABLE', { fs: 46, c: NC, ls: 0, a: 'start' }) + T(62, 182, 'SHARED ELECTRONS · LIKE A SHARED PLATE', { fs: 17, a: 'start' }) + G(T(62, 230, 'SO IT SWAPS AN H · NEVER BREAKS THE RING', { fs: 17, a: 'start', c: EC }), io(t, tSwp - 0.1, 0.4)) + poly(650, 140, 64, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }), st);
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'BENZENE · C₆H₆'], [tKek, 'KEKULE · 1865'], [tMove, 'SECOND DRAWING'], [tBlend, 'RESONANCE HYBRID'], [tXr, 'X-RAY · 139 pm'], [tCirc, 'HEXAGON + CIRCLE'], [tB1, 'sp² CARBONS'], [tPo, 'SIX p ORBITALS'], [tOv, 'SIDEWAYS OVERLAP'], [tSpr, 'DELOCALISED'], [tStab, 'EXTRA STABLE']];

/* ---------- D: Huckel ---------- */
const LK = [['LINK 1', 'It must be a ring', 'RING', 'D2'], ['LINK 2', 'The ring must be flat', 'FLAT', 'D3'], ['LINK 3', 'A p orbital on every ring atom', 'ALL ROUND', 'D4'], ['LINK 4', 'Count the π electrons', '4n + 2', 'D5'], ['CHECK', 'Benzene: 3 C=C = 6 π e⁻', 'n = 1', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const th1 = PUC.think($('#th1'), { q: 'Naphthalene has <span style="color:#C8461B">10 π electrons</span>. Aromatic or not?', opts: ['Aromatic', 'Not aromatic'], right: 0, why: '<b>Aromatic</b>: 10 = 4(2) + 2. Cyclobutadiene has 4, which never fits 4n + 2.' });
function drawD(t) {
  let s = '';
  const f = i => io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1 - io(t, tD7 - 0.2, 0.3));
  if (f(0) > 0.01) s += G(poly(392, 300, 140, 6, [1, 1, 1, 1, 1, 1], { col: NC, w: 7 }) + T(392, 520, 'A CLOSED RING ✓', { fs: 22, c: NC }), f(0));
  if (f(1) > 0.01) s += G(orbRing(t, 392, 300, 200, { plane: 1, p: 1 }) + T(392, 548, 'FLAT · ALL p ORBITALS PARALLEL', { fs: 20, c: PB, ls: 0.6 }), f(1));
  if (f(2) > 0.01) s += G(orbRing(t, 392, 300, 200, { p: 1, ov: 1, donut: io(t, tLk[2] + 0.4, 0.8), el: (t - tLk[2]) * 1.6 }) + T(392, 548, 'ELECTRONS TRAVEL ALL THE WAY ROUND', { fs: 20, c: EC, ls: 0.6 }), f(2));
  if (f(3) > 0.01) { const g0 = wt('D5', 'zero'), g1 = wt('D5', 'So'); let b = T(392, 140, '4n + 2', { fs: 50, c: C.ink, ls: 0 });
    [0, 1, 2, 3].forEach(n => { const x = 182 + n * 140; b += G(`<rect x="${x - 60}" y="200" width="120" height="90" rx="14" fill="${C.soft}"/>` + T(x, 256, 'n = ' + n, { fs: 24, c: C.ink, ls: 0 }), io(t, g0 + n * 0.35 - 0.1, 0.3)) +
      G(`<rect x="${x - 60}" y="320" width="120" height="110" rx="14" fill="${tint(EC, 0.1)}" stroke="${EC}" stroke-width="3"/>` + T(x, 392, '' + (4 * n + 2), { fs: 44, c: EC, ls: 0 }), io(t, g1 + n * 0.3, 0.3)); });
    b += G(T(392, 500, 'π ELECTRONS: 2, 6, 10, 14 ...', { fs: 20, c: EC }), io(t, g1 + 1.3, 0.4)); s += G(b, f(3)); }
  if (f(4) > 0.01) { const u = io(t, tLk[4] + 0.3, 1.5); let b = poly(392, 290, 140, 6, KI, { w: 6 });
    [0, 2, 4].forEach((k, j) => { const p = rp(392, 290, 112, k), q = rp(392, 290, 112, k + 1); const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; b += G(dot(mx - (q[1] - p[1]) * 0.12, my + (q[0] - p[0]) * 0.12, 9, EC) + dot(mx + (q[1] - p[1]) * 0.12, my - (q[0] - p[0]) * 0.12, 9, EC), M.clamp(u * 3 - j)); });
    b += T(392, 300, '6', { fs: 54, c: EC, ls: 0 }) + G(T(392, 520, '6 = 4(1) + 2 · AROMATIC ✓', { fs: 24, c: C.ok }), io(t, wt('D6', 'Aromatic') - 0.1, 0.4)); s += G(b, f(4)); }
  const g = io(t, tD7 - 0.2, 0.4);
  if (g > 0.01) { const sq = io(t, wt('D7', 'four') - 0.1, 0.4);
    s += G(poly(220, 270, 110, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(220, 450, '6 π e⁻', { fs: 30, c: EC, ls: 0 }) + T(220, 490, 'BENZENE · AROMATIC', { fs: 18, c: C.ok }), g) +
      G(poly(570, 270, 100, 4, [2, 1, 2, 1], { rot: -135 }) + T(570, 450, '4 π e⁻', { fs: 30, c: EC, ls: 0 }) + T(570, 490, 'CYCLOBUTADIENE · NOT', { fs: 18, c: C.red }), io(t, wt('D7', 'Cyclobutadiene') - 0.1, 0.4)) + G(T(570, 530, '4 ≠ 4n + 2', { fs: 20, c: C.red }), sq); }
  put($('#dS'), s);
}
const dtg = tag($('#dr'));
const DLB = ['RING', 'FLAT', 'p ON EVERY ATOM', '4n + 2', 'BENZENE CHECK', 'COMPARE'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{flat ring} + ${E_('(4n+2)\\ \\pi\\,e^-')} \\Rightarrow ${Y_('\\text{aromatic}')}`);

/* ---------- W: cyclopentadienyl anion ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{ring of 5 C} \\checkmark`)],
  [K(`\\text{all } sp^2 \\Rightarrow \\text{flat, 5 p orbitals}`)],
  [K(`${E_('2 + 2')} + ${E_('2')}\\ (\\text{lone pair}) = ${E_('6')}\\ \\pi\\,e^-`)],
  [K(`6 = 4(1) + 2,\\ n = 1`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Aromatic, just like benzene'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
function drawW(t) {
  const cx = 392, cy = 290, R = 120, a = io(t, wt('W1', 'cyclopentadienyl'), 0.5);
  const ring = io(t, T0('W2') + 0.3, 0.5), pp = io(t, wt('W3', 'orbital') - 0.2, 0.5), c1 = io(t, wt('W4', 'Two') - 0.1, 0.8), c2 = io(t, wt('W4', 'lone') - 0.1, 0.5), fin = io(t, wt('W6', 'aromatic') - 0.2, 0.6);
  const ords = [1, 2, 1, 2, 1];
  let s = '';
  if (pp > 0.01) for (let k = 0; k < 5; k++) { const p = rp(cx, cy, R, k, 5); s += G(`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="40" fill="${tint(PB, 0.14)}" stroke="${PB}" stroke-width="2.5" stroke-dasharray="6 6"/>`, pp * (1 - fin * 0.5)); }
  s += G(ringBS(cx, cy, R, ords, { hl: 58, circ: fin }).replace(/(<circle[^>]*r="26"[^>]*fill=")[^"]*(")/, '$1' + NC + '$2'), a);
  if (ring > 0.01) s += G(poly(cx, cy, R, 5, [1, 1, 1, 1, 1], { col: tint(NC, 0.5), w: 16 }), ring * (1 - pp));
  // lone pair and charge on top carbon
  const top = rp(cx, cy, R, 0, 5);
  s += G(chg(top[0] + 44, top[1] - 20, '−'), a);
  [[1, 2], [3, 4]].forEach(([i, j], q) => { const p = rp(cx, cy, R * 0.72, i, 5), r2 = rp(cx, cy, R * 0.72, j, 5); s += G(dot(lerp(p[0], r2[0], 0.35), lerp(p[1], r2[1], 0.35), 8, EC) + dot(lerp(p[0], r2[0], 0.65), lerp(p[1], r2[1], 0.65), 8, EC), M.clamp(c1 * 2 - q)); });
  s += lp(top[0], top[1] + 46, 0, c2);
  s += G(`<rect x="560" y="440" width="190" height="96" rx="14" fill="${C.soft}"/>` + T(655, 482, 'π e⁻', { fs: 18 }) + T(655, 520, c2 > 0.5 ? '2 + 2 + 2' : '2 + 2', { fs: 26, c: EC, ls: 0 }), c1);
  s += G(T(140, 520, '= 6', { fs: 40, c: EC, ls: 0 }), io(t, wt('W5', 'six') - 0.1, 0.4));
  put($('#wS'), s);
  const WT = [[0, 'C₅H₅⁻'], [T0('W2'), 'RING ✓'], [T0('W3'), 'FLAT · 5 p'], [T0('W4'), 'COUNT π e⁻'], [T0('W5'), '6 = 4n + 2'], [T0('W6'), 'AROMATIC']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- C: making benzene ---------- */
const AD = [['RED HOT IRON TUBE · 873 K', `3\\,${mf('C_2H_2')} \\rightarrow ${Y_(mf('C_6H_6'))}`, 'C2'], ['SODA LIME · HEAT', `${mf('C_6H_5COONa')} + ${mf('NaOH')} \\rightarrow ${Y_(mf('C_6H_6'))} + ${mf('Na_2CO_3')}`, 'C3'], ['ZINC DUST · HEAT', `${mf('C_6H_5')}${O_(mf('O'))}${mf('H')} + ${mf('Zn')} \\rightarrow ${Y_(mf('C_6H_6'))} + ${mf('Zn')}${O_(mf('O'))}`, 'C4'], ['LARGE SCALE', `\\text{coal tar} \\rightarrow ${Y_('\\text{benzene}')}`, 'C5']];
$('#ars').innerHTML = AD.map(([l, q], i) => `<div class="ar" id="ar${i}" style="top:${84 + i * 116}px"><div class="lt">${l}</div><div class="lx">${K(q)}</div></div>`).join('');
const tAd = AD.map(a => T0(a[2]));
function subRing(t, lab, col, u, rep, tag2) { // ring with a group that leaves and is replaced by H
  const cx = 300, cy = 300, R = 100, p = rp(cx, cy, R, 1), q = rp(cx, cy, R + 70, 1);
  let s = poly(cx, cy, R, 6, [1, 1, 1, 1, 1, 1], { circ: 1 });
  const gx = lerp(q[0] + 30, q[0] + 200, u), gy = lerp(q[1], q[1] - 120, u);
  s += G(`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.ink2}" stroke-width="5"/>`, 1 - u) + G(`<rect x="${f1(gx - 30)}" y="${f1(gy - 30)}" width="${lab.length * 22 + 30}" height="60" rx="14" fill="${tint(col, 0.14)}" stroke="${col}" stroke-width="3"/>` + T(gx - 15 + (lab.length * 22 + 30) / 2, gy + 9, lab, { fs: 26, c: col, ls: 0 }), 1 - u * 0.3);
  s += G(`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0] - 30)}" y2="${f1(q[1] + 16)}" stroke="${C.ink2}" stroke-width="4"/>` + atomC(q[0] - 30, q[1] + 16, 16, 'H', HC, 15), u);
  s += G(T(gx + 60, gy - 50, rep, { fs: 22, c: col, ls: 0 }), u) + T(392, 540, tag2, { fs: 20, c: C.ink, ls: 0.6 });
  return s;
}
function drawC(t) {
  let s = '';
  const f = i => io(t, tAd[i] - 0.2, 0.35) * (i < 3 ? 1 - io(t, tAd[i + 1] - 0.2, 0.3) : 1);
  if (f(0) > 0.01) { const u = io(t, wt('C2', 'join') - 0.3, 1.4), cx = 392, cy = 290, R = 115, at = [], bd = [];
    for (let i = 0; i < 3; i++) { const ang = Math.PI * 2 / 3 * i - Math.PI / 6, ox = Math.cos(ang) * 90 * (1 - u), oy = Math.sin(ang) * 90 * (1 - u);
      const p = rp(cx, cy, R, 2 * i), q = rp(cx, cy, R, 2 * i + 1), ph = rp(cx, cy, R + 60, 2 * i), qh = rp(cx, cy, R + 60, 2 * i + 1);
      at.push({ x: p[0] + ox, y: p[1] + oy, l: 'C', r: 24 }, { x: q[0] + ox, y: q[1] + oy, l: 'C', r: 24 }); bd.push([at.length - 2, at.length - 1, 3 - u]);
      at.push({ x: ph[0] + ox, y: ph[1] + oy, l: 'H', r: 15 }, { x: qh[0] + ox, y: qh[1] + oy, l: 'H', r: 15 }); bd.push([at.length - 4, at.length - 2, 1], [at.length - 3, at.length - 1, 1]); }
    [[1, 4], [5, 8], [9, 0]].forEach(([i, j]) => bd.push([i, j, 1, null, u]));
    s += G(bs(at, bd) + T(392, 540, u > 0.5 ? 'BENZENE · C₆H₆' : 'THREE ETHYNE MOLECULES', { fs: 22, c: u > 0.5 ? NC : C.ink }), f(0)); }
  if (f(1) > 0.01) s += G(subRing(t, 'COONa', C.ink2, io(t, wt('C3', 'leaves') - 0.2, 1), 'Na₂CO₃', 'DECARBOXYLATION · NaOH + CaO'), f(1));
  if (f(2) > 0.01) s += G(subRing(t, 'OH', OV, io(t, wt('C4', 'takes') - 0.2, 1), 'ZnO', 'ZINC TAKES THE OXYGEN'), f(2));
  if (f(3) > 0.01) s += G(`<path d="M120 220 V430 Q120 450 140 450 H300 Q320 450 320 430 V220" fill="none" stroke="${C.ink2}" stroke-width="4"/><rect x="124" y="270" width="192" height="176" fill="${M.mix(C.ink, '#fff', 0.25)}"/>` + T(220, 490, 'COAL TAR', { fs: 22, c: C.ink }) +
    ARW2(360, 340, 440, 340) + poly(570, 340, 90, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(570, 490, 'BENZENE', { fs: 22, c: NC }), f(3));
  put($('#cS2'), s);
  const ci = cur(tAd.map(x => [x - 0.2]), t);
  M.setT($('#cpL'), ['MOLECULE BENCH · FROM ETHYNE', 'MOLECULE BENCH · FROM SODIUM BENZOATE', 'MOLECULE BENCH · FROM PHENOL', 'MOLECULE BENCH · FROM COAL TAR'][ci]);
}
const ARW2 = (x1, y1, x2, y2, col = C.ink2) => `<line x1="${x1}" y1="${y1}" x2="${x2 - 12}" y2="${y2}" stroke="${col}" stroke-width="4"/><polygon points="${x2},${y2} ${x2 - 14},${y2 - 8} ${x2 - 14},${y2 + 8}" fill="${col}"/>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Double bonds taking turns in a ring: always <b>aromatic</b>', right: 'C₈H₈: 8 π e⁻ and a tub shape · <b>not aromatic</b>' });
$('#tS').innerHTML = `<g id="tM1">${poly(160, 104, 64, 8, [2, 1, 2, 1, 2, 1, 2, 1], { rot: -112.5 }) + T(160, 210, '8 π · TUB', { fs: 18, c: C.red, ls: 0.6 })}</g><g id="tM2">${poly(450, 104, 64, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(450, 210, '6 π · FLAT', { fs: 18, c: C.ok, ls: 0.6 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M70 30 L250 180 M250 30 L70 180'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: "Huckel's rule on rings and ions, and bond lengths in benzene" });
const oR = (n, ords, c, rot) => `<svg width="86" height="86" viewBox="0 0 120 120" style="flex:none">${poly(60, 62, 44, n, ords, { rot, w: 6, chg: c })}</svg>`;
const opt = (svg, f) => `<span style="display:inline-flex;align-items:center;gap:16px">${svg}${K(mf(f))}</span>`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these is <b>aromatic</b>?', qW: 920,
  opts: [opt(oR(5, [1, 2, 1, 2, 1], '+'), 'C_5H_5^+'), opt(oR(7, [1, 2, 1, 2, 1, 2, 1], '+'), 'C_7H_7^+'), opt(oR(8, [2, 1, 2, 1, 2, 1, 2, 1], '', -112.5), 'C_8H_8'), opt(oR(4, [2, 1, 2, 1], '', -135), 'C_4H_4')], right: 1, optW: 474, optY: 300, optH: 130, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${mf('C_7H_7^+')}: 3\\ \\text{C=C} \\rightarrow ${E_('6')}\\ \\pi\\,e^-`)], [K(`\\text{empty p: ring complete}`)], [K(`6 = 4(1) + 2 \\checkmark`)], [K(`\\text{A: 4} \\quad \\text{C: 8, tub} \\quad \\text{D: 4}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'Six'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Benzene and Aromaticity', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Benzene</b> C₆H₆ · Faraday 1825 · Kekulé ring 1865 · prefers substitution',
    '<b>Resonance</b>: two Kekulé drawings · the real molecule is the hybrid',
    '<b>X-ray</b>: flat · all six C-C bonds 139 pm (single 154, double 133)',
    '<b>Orbitals</b>: six sp² C · six p orbitals · 6 π e⁻ delocalised above and below',
    '<b>Hückel</b>: ring, flat, p on every atom, (4n + 2) π e⁻ · benzene 6, C₅H₅⁻ 6',
    '<b>Make it</b>: 3 C₂H₂ at 873 K · sodium benzoate + soda lime · phenol + Zn dust'] });
const YQ = ['Why are all six carbon carbon bonds in benzene the same length?', "What are the conditions of Huckel's rule?", 'Which gas goes through a red hot iron tube to make benzene?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 96', topic: 'How does benzene swap an H and keep its ring? Electrophilic Substitution', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#so .sx').forEach(q => { if (q.offsetWidth > 440) q.style.fontSize = Math.floor(24 * 440 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(28 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.lk .lx').forEach(q => { const lv = q.parentNode.querySelector('.lv'), mx = 712 - 124 - lv.offsetWidth - 40; if (q.offsetWidth > mx) q.style.fontSize = Math.floor(25 * mx / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const k = q.parentNode.querySelector('.qk'), mx = 712 - 88 - k.offsetWidth - 48; if (q.offsetWidth > mx) q.style.fontSize = Math.floor(26 * mx / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ar .lx').forEach(q => { if (q.offsetWidth > 672) q.style.fontSize = Math.floor(28 * 672 / q.offsetWidth) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', ['ring', 'shared', 'smell'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'famous') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'swaps') + 0.1) / 0.3) * (i === 3 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'secret') - 0.15, 1e9, POP);
  }

  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P6', 'extra') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const ko = io(t, tB1 - 0.1, 0.6);
    put($('#bS'), G(benchK(t), 1 - ko) + G(benchO(t), ko));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · BENZENE' : 'MOLECULE BENCH · ORBITALS');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), shapeS(t)); M.setT($('#shL'), t < tXr - 0.1 ? 'KEKULE' : t < tB1 ? 'X-RAY · BOND LENGTHS' : 'ONE CARBON');
    put($('#chS'), G(charS(t), io(t, tKek - 0.2, 0.4))); M.setT($('#chL'), t < tStab - 0.1 ? 'RESONANCE · TWO DRAWINGS, ONE MOLECULE' : 'WHY IT SWAPS');
  }

  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('D8');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1 - M.io((t - tD7) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = t >= tD7 - 0.2 ? 5 : Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    drawD(t); M.setT(dtg, DLB[ki]); M.setT($('#drL'), ki < 4 ? 'MOLECULE BENCH · LINK ' + (ki + 1) : 'MOLECULE BENCH · CHECK'); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
    M.vis($('#th1'), t, tD8 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tD8, tOpts: wt('D8', 'Aromatic') - 0.1, tCount: T1('D8') + 0.05, dur: 3, tAns: T0('D9') - 0.02, tWhy: wt('D9', 'Ten') });
  }

  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Flat') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'four') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'two') + 0.2, 0.8);
  }

  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Is') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'aromatic') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'cyclopentadienyl') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    AD.forEach((_, i) => { const el = $('#ar' + i); M.vis(el, t, tAd[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tAd[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tAd[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    drawC(t);
    if (t < tAd[0] - 0.2) put($('#cS2'), G(poly(392, 290, 120, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(392, 500, 'THREE LAB ROUTES · ONE BIG SOURCE', { fs: 20, c: C.ink }), io(t, tC1 + 0.4, 0.4)));
  }

  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'any') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'eight') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'cyclooctatetraene') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'tub') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Huckel') });
  }

  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

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
