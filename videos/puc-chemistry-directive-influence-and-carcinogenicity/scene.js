// PUC Chemistry Ep 97: directive influence and carcinogenicity (Molecule bench)
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
const CL = '#2F6FEB', GV = C.ok, PU = C.red;
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB5 = T0('B5'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };
Object.assign(M.IC, { hex: ['M12 2l8.7 5v10L12 22l-8.7-5V7Z'] });
const chip = (x, y, lab, col, a = 1, fs = 24) => { const w = lab.length * fs * 0.62 + 28; return G(`<rect x="${f1(x - w / 2)}" y="${f1(y - 24)}" width="${f1(w)}" height="48" rx="12" fill="${tint(col, 0.12)}" stroke="${col}" stroke-width="3"/>` + T(x, y + fs * 0.36, lab, { fs, c: col, ls: 0 }), a); };
const seat = (cx, cy, R, k, lab, col, a = 1) => { const p = rp(cx, cy, R + 40, k); return G(T(p[0], p[1] + 9, lab, { fs: 28, c: col, ls: 0, ff: 'Poppins', fw: 700 }), a); };
const dens = (cx, cy, R, k, col, a) => { const p = rp(cx, cy, R, k); return G(`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="30" fill="${tint(col, 0.22)}" stroke="${col}" stroke-width="2.5"/>`, a); };
// ring with a group at top (skeletal); grp label, group colour
const ringG = (cx, cy, R, ords, grp, col, o = {}) => { const p = rp(cx, cy, R, 0), q = [cx, cy - R - 54];
  return poly(cx, cy, R, 6, ords, { w: 6, circ: o.circ }) + bond(p[0], p[1], q[0], q[1], o.gb || 1, C.ink2, 5, 0, 26) + chip(q[0], q[1] - 4, grp, col, 1, o.fs || 24); };

/* ---------- title card + H ---------- */
const JOBS = [['users', 'New student', 'SITS BY A FRIEND', 'student', 'SEAT'], ['zap', 'Magnet', 'PULLS TO TWO ENDS', 'magnet', 'PULL'], ['home', 'Chimney smoke', 'LEAVES BLACK SOOT', 'Smoke', 'SOOT']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['book', 'Toluene', 'Toluene', 'H3'], ['book', 'Nitrobenzene', 'nitrobenzene', 'H3'], ['arrowR', 'Next door or across', 'opposite', 'H4'], ['x', 'Skips a seat', 'skips', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('hex', 26, '#fff', 2.2);
const QR = [['A group is already on the ring', 'ALREADY', 'P2', 'already'], ['Next to it: ortho', 'ORTHO', 'P3', 'ortho'], ['Two away: meta · across: para', 'META · PARA', 'P3', 'meta'], ['It decides the seat', 'DIRECTS', 'P4', 'directive'], ['Faster or slower ring', 'SPEED', 'P5', 'activating']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
function drawP(t) {
  const cx = 392, cy = 310, R = 130, a = io(t, T0('P2'), 0.5), o = io(t, wt('P3', 'ortho') - 0.1, 0.4), m = io(t, wt('P3', 'meta') - 0.1, 0.4), p = io(t, wt('P3', 'para') - 0.1, 0.4), ac = io(t, wt('P5', 'activating') - 0.1, 0.4), de = io(t, wt('P6', 'deactivating') - 0.1, 0.4);
  let s = G(ringG(cx, cy, R, [1, 1, 1, 1, 1, 1], 'G', C.ink, { circ: 1 }), a);
  s += seat(cx, cy, R, 1, 'o', NC, o) + seat(cx, cy, R, 5, 'o', NC, o) + seat(cx, cy, R, 2, 'm', SC, m) + seat(cx, cy, R, 4, 'm', SC, m) + seat(cx, cy, R, 3, 'p', EC, p);
  s += dens(cx, cy, R, 1, NC, o * 0.8) + dens(cx, cy, R, 5, NC, o * 0.8) + dens(cx, cy, R, 2, SC, m * 0.8) + dens(cx, cy, R, 4, SC, m * 0.8) + dens(cx, cy, R, 3, EC, p * 0.8);
  s += chip(220, 520, 'ACTIVATING · FASTER', GV, ac, 20) + chip(570, 520, 'DEACTIVATING · SLOWER', PU, de, 20);
  put($('#pS'), s);
  M.setT(ptag, t < tQr[1] ? 'G = GROUP ALREADY THERE' : t < tQr[3] ? 'ORTHO · META · PARA' : t < tQr[4] ? 'G PICKS THE SEAT' : 'G SETS THE SPEED');
}

/* ---------- S: phenol (giver), B: nitrobenzene (puller) ---------- */
const tLp = wt('S2', 'lone'), tSl = wt('S3', 'slides'), tO1 = wt('S4', 'ortho'), tO2 = wt('S4', 'other'), tPa = wt('S4', 'para'), tEx = wt('S5', 'extra'), tEl = wt('S6', 'electrophile'), tSum = T0('S7');
const tPl = wt('B1', 'pulls'), tPos = wt('B2', 'Positive'), tMe = wt('B3', 'meta'), tSlow = wt('B4', 'slowly');
function benchPh(t) {
  const cx = 392, cy = 335, R = 140, a1 = io(t, tSl - 0.1, 0.7), a2 = io(t, tSl + 0.7, 0.7), sh = io(t, tO1 - 0.2, 0.6);
  const stage = t < tO2 - 0.1 ? 1 : t < tPa - 0.1 ? 5 : 3, ords = sh < 0.5 ? KI : stage === 1 ? [1, 1, 2, 1, 2, 1] : stage === 5 ? [2, 1, 2, 1, 1, 1] : [2, 1, 1, 1, 2, 1];
  const ex = io(t, tEx - 0.1, 0.5), el = io(t, tEl - 0.1, 0.9);
  let s = ringG(cx, cy, R, ex > 0.5 ? [1, 1, 1, 1, 1, 1] : ords, 'OH', OV, { gb: sh > 0.5 && ex < 0.5 ? 2 : 1, circ: ex });
  const top = [cx, cy - R - 58];
  s += lp(top[0] - 46, top[1] + 4, 0, (1 - sh) * (1 - ex));
  s += carr(top[0] - 46, top[1] + 16, cx - 8, cy - R - 20, -40, a1 * (1 - sh));
  const p0 = rp(cx, cy, R, 0), p1 = rp(cx, cy, R, 1);
  s += carr((p0[0] + p1[0]) / 2 - 6, (p0[1] + p1[1]) / 2 + 14, p1[0] - 8, p1[1] + 22, 30, a2 * (1 - sh));
  if (sh > 0.01 && ex < 0.99) { const p = rp(cx, cy, R + 36, stage); s += G(chg(p[0], p[1], '−') + chg(top[0] + 70, top[1] - 4, '+', OV), sh * (1 - ex)); }
  [1, 5, 3].forEach(k => { s += dens(cx, cy, R, k, EC, ex) + seat(cx, cy, R, k, k === 3 ? 'p' : 'o', EC, ex); });
  [2, 4].forEach(k => { s += seat(cx, cy, R, k, 'm', C.mute, ex); });
  if (el > 0.01) { const p = rp(cx, cy, R + 64, 1); s += G(atomC(lerp(730, p[0], el), lerp(470, p[1], el), 22, 'E', EC, 18) + chg(lerp(730, p[0], el) + 26, lerp(470, p[1], el) - 22, '+'), el); }
  s += G(T(392, 560, 'EXTRA e⁻ AT ORTHO AND PARA', { fs: 20, c: EC, ls: 0.6 }), ex * (1 - el)) + G(T(392, 560, 'E⁺ LANDS AT o AND p · FASTER', { fs: 20, c: GV, ls: 0.6 }), el);
  return s;
}
function benchNi(t) {
  const cx = 392, cy = 335, R = 140, a1 = io(t, tPl - 0.1, 0.7), sh = io(t, tPos - 0.2, 0.6), me = io(t, tMe - 0.1, 0.6), el = io(t, tMe + 0.8, 0.9);
  const k = t < tPos + 1.2 ? 1 : t < tPos + 2.4 ? 3 : 5;
  let s = ringG(cx, cy, R, me > 0.5 ? [1, 1, 1, 1, 1, 1] : KI, 'NO₂', NB, { circ: me });
  const p0 = rp(cx, cy, R, 0), p1 = rp(cx, cy, R, 1);
  s += carr((p0[0] + p1[0]) / 2 + 10, (p0[1] + p1[1]) / 2 - 10, cx + 12, cy - R - 26, -36, a1 * (1 - sh));
  s += carr(cx + 4, cy - R - 60, cx + 70, cy - R - 100, -30, io(t, tPl + 0.6, 0.6) * (1 - sh));
  if (sh > 0.01 && me < 0.99) { const p = rp(cx, cy, R + 36, k); s += G(chg(p[0], p[1], '+', PU), sh * (1 - me)); }
  [1, 5, 3].forEach(q => { s += dens(cx, cy, R, q, PU, sh * 0.9) + seat(cx, cy, R, q, q === 3 ? 'p' : 'o', PU, me); });
  [2, 4].forEach(q => { s += seat(cx, cy, R, q, 'm', GV, me) + dens(cx, cy, R, q, GV, me * 0.6); });
  if (el > 0.01) { const p = rp(cx, cy, R + 70, 2); s += G(atomC(lerp(720, p[0] + 40, el), lerp(540, p[1] + 20, el), 22, 'E', EC, 18), el); }
  s += G(T(392, 560, 'o AND p ARE POOR · META IS LESS POOR', { fs: 20, c: PU, ls: 0.6 }), sh * (1 - io(t, tSlow - 0.1, 0.4))) + G(T(392, 560, 'META DIRECTOR · SLOWER RING', { fs: 20, c: PU, ls: 0.6 }), io(t, tSlow - 0.1, 0.4));
  return s;
}
function seatMap(t) {
  const g = t < tB1 ? 1 : 0, col = g ? EC : PU;
  const rows = [['ORTHO', g ? 'RICH' : 'POOR', g ? 1 : 0], ['META', g ? 'NO EXTRA' : 'LESS POOR', g ? 0 : 1], ['PARA', g ? 'RICH' : 'POOR', g ? 1 : 0]];
  const a = g ? io(t, tEx - 0.1, 0.4) : io(t, tMe - 0.1, 0.4);
  return rows.map(([n, v, w], i) => `<rect x="36" y="${74 + i * 62}" width="712" height="52" rx="12" fill="${w && a > 0.5 ? tint(g ? EC : GV, 0.14) : C.soft}"/>` + T(60, 108 + i * 62, n, { fs: 18, a: 'start', c: C.ink }) + G(T(724, 108 + i * 62, v + (w ? ' · NEW GROUP GOES HERE' : ''), { fs: 18, a: 'end', c: w ? (g ? EC : GV) : C.mute }), a)).join('') + '';
}
function rule(t) {
  const g = t < tB1;
  return T(60, 140, g ? 'OH · A GIVER' : 'NO₂ · A PULLER', { fs: 40, c: g ? GV : PU, ls: 0, a: 'start', ff: 'Poppins', fw: 700 }) + T(62, 184, g ? 'LONE PAIR FEEDS THE RING · ORTHO PARA · ACTIVATING' : 'PULLS e⁻ OUT · META · DEACTIVATING', { fs: 17, a: 'start' }) +
    G(T(62, 230, g ? 'LIKE A FRIEND SHARING TOYS' : 'THE WHOLE RING SLOWS DOWN', { fs: 17, a: 'start', c: g ? EC : PU }), g ? io(t, wt('S2', 'toys') - 0.1, 0.4) : io(t, tSlow - 0.1, 0.4));
}
const btg = tag($('#bn'));
const BT = [[0, 'PHENOL · C₆H₅OH'], [tLp, 'LONE PAIRS ON O'], [tSl, 'PAIR SLIDES IN'], [tO1, '− AT ORTHO'], [tO2, '− AT OTHER ORTHO'], [tPa, '− AT PARA'], [tEx, 'o, p RICH'], [tSum, 'o/p · ACTIVATING'], [tB1, 'NITROBENZENE'], [tPos, '+ AT o AND p'], [tMe, 'GOES TO META'], [tSlow, 'DEACTIVATING']];
const th1 = PUC.think($('#th1'), { q: 'Methyl gives electrons. CHO pulls them. Which sends a new group to <b>meta</b>?', opts: ['-CH₃', '-CHO'], right: 1, why: '<b>CHO</b> pulls electrons, like NO₂. Methyl gives them, so it sends the group to ortho and para.' });

/* ---------- D: sorting ---------- */
const LK = [['LINK 1', 'Ortho para + activating', 'GIVERS', 'D2'], ['LINK 2', 'They give e⁻ to the ring', 'IN', 'D3'], ['LINK 3', 'Meta + deactivating', 'PULLERS', 'D4'], ['LINK 4', 'They pull e⁻ out', 'OUT', 'D5'], ['LINK 5', 'Halogens: deactivate, yet o/p', 'ODD ONE', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const GIV = ['-OH', '-NH₂', '-NHR', '-NHCOCH₃', '-OCH₃', '-CH₃', '-C₂H₅'], PUL = ['-NO₂', '-CN', '-CHO', '-COR', '-COOH', '-COOR', '-SO₃H'];
const grid = (t, list, col, t0) => list.map((g, i) => { const c = i % 2, r = Math.floor(i / 2); return chip(220 + c * 340, 110 + r * 96, g, col, io(t, t0 + i * 0.45, 0.3), 28); }).join('');
function flow(t, t0, inward, col) { let s = poly(392, 320, 110, 6, [1, 1, 1, 1, 1, 1], { circ: 1, w: 6 }) + `<line x1="392" y1="210" x2="392" y2="150" stroke="${C.ink2}" stroke-width="5"/>` + chip(392, 122, 'G', col);
  for (let k = 0; k < 4; k++) { const ph = ((t - t0) * 0.6 + k / 4) % 1, f = inward ? ph : 1 - ph, y = lerp(150, 290, f); s += G(dot(392 + 8 * Math.sin(ph * 9), y, 8, EC), Math.min(1, ph * 5) * (1 - ph * 0.6)); }
  return s + T(392, 520, inward ? 'ELECTRONS FLOW INTO THE RING' : 'ELECTRONS PULLED OUT OF THE RING', { fs: 20, c: col, ls: 0.6 }); }
function drawD(t) {
  let s = '';
  const f = i => io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1);
  if (f(0) > 0.01) s += G(grid(t, GIV, GV, tLk[0] + 0.8) + T(392, 520, 'ORTHO PARA · ACTIVATING', { fs: 20, c: GV }), f(0));
  if (f(1) > 0.01) s += G(flow(t, tLk[1], true, GV), f(1));
  if (f(2) > 0.01) s += G(grid(t, PUL, PU, tLk[2] + 0.8) + T(392, 520, 'META · DEACTIVATING', { fs: 20, c: PU }), f(2));
  if (f(3) > 0.01) s += G(flow(t, tLk[3], false, PU), f(3));
  if (f(4) > 0.01) { const a = io(t, wt('D6', 'pull') - 0.1, 0.5), b = io(t, wt('D6', 'lone') - 0.1, 0.5); const cx = 392, cy = 330, R = 110;
    s += G(ringG(cx, cy, R, [1, 1, 1, 1, 1, 1], 'Cl', CL, { circ: 1 }) + G(`<path d="M${cx + 40} ${cy - R - 10} V${cy - R - 70}" stroke="${PU}" stroke-width="4"/><polygon points="${cx + 40},${cy - R - 84} ${cx + 32},${cy - R - 68} ${cx + 48},${cy - R - 68}" fill="${PU}"/>` + T(cx + 60, cy - R - 40, '−I · DEACTIVATES', { fs: 18, c: PU, a: 'start' }), a) +
      G([1, 5, 3].map(k => dens(cx, cy, R, k, EC, 1) + seat(cx, cy, R, k, k === 3 ? 'p' : 'o', EC)).join('') + T(cx, 560, 'LONE PAIRS STILL FEED ORTHO AND PARA', { fs: 20, c: EC, ls: 0.6 }), b), f(4)); }
  put($('#dS'), s);
}
const dtg = tag($('#dr'));
const DLB = ['GIVERS', 'PUSH IN', 'PULLERS', 'PULL OUT', 'HALOGENS'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${E_('\\text{giver}')} \\rightarrow o,\\,p \\qquad \\textcolor{${PU}}{\\text{puller}} \\rightarrow m`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${mf('CH_3')}: \\text{gives } e^- \\rightarrow o,\\,p`)],
  [K(`\\text{toluene} \\rightarrow o\\text{- and } p\\text{-nitrotoluene}`)],
  [K(`${mf('NO_2')}: \\text{pulls } e^- \\rightarrow m`)],
  [K(`\\text{nitrobenzene} \\rightarrow m\\text{-dinitrobenzene}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Slower ring: harsher conditions'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
function drawW(t) {
  let s = '';
  const A = 1 - io(t, T0('W4') - 0.2, 0.4), B = io(t, T0('W4') - 0.2, 0.4);
  const sub = (cx, cy, R, k, u, lab = 'NO₂') => { const p = rp(cx, cy, R, k), q = rp(cx, cy, R + 50, k), qq = rp(cx, cy, R + 300, k); return G(`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.ink2}" stroke-width="5"/>`, u > 0.95 ? 1 : 0) + chip(lerp(qq[0], q[0], u), lerp(qq[1], q[1], u) + 8, lab, NB, Math.min(1, u * 2), 20); };
  if (A > 0.01) { const u = io(t, wt('W3', 'ortho') - 0.2, 0.8), v = io(t, wt('W3', 'para') - 0.2, 0.8);
    s += G(ringG(210, 300, 80, [1, 1, 1, 1, 1, 1], 'CH₃', HC, { circ: 1 }) + sub(210, 300, 80, 1, u) + T(210, 520, 'ORTHO-NITROTOLUENE', { fs: 16, c: C.ink }), A * io(t, T0('W2') + 0.2, 0.4)) +
      G(T(392, 310, '+', { fs: 34, c: C.ink, ls: 0 }) + ringG(574, 280, 80, [1, 1, 1, 1, 1, 1], 'CH₃', HC, { circ: 1 }) + sub(574, 280, 80, 3, v) + T(574, 520, 'PARA-NITROTOLUENE', { fs: 16, c: C.ink }), A * io(t, wt('W3', 'ortho') - 0.2, 0.4));
    s += G(chip(392, 120, 'METHYL GIVES e⁻', GV, 1, 18), A * io(t, wt('W2', 'gives') - 0.1, 0.4)); }
  if (B > 0.01) { const u = io(t, wt('W5', 'meta') - 0.3, 0.9);
    s += G(ringG(392, 320, 100, [1, 1, 1, 1, 1, 1], 'NO₂', NB, { circ: 1 }) + sub(392, 320, 100, 2, u) + T(392, 540, u > 0.5 ? 'META-DINITROBENZENE' : 'NITROBENZENE', { fs: 20, c: C.ink, ls: 0.6 }) + chip(160, 140, 'NO₂ PULLS e⁻', PU, io(t, wt('W4', 'pulls') - 0.1, 0.4), 18), B); }
  put($('#wS'), s);
  M.setT(wtg, [[0, 'TOLUENE'], [T0('W3'), 'o AND p PRODUCTS'], [T0('W4'), 'NITROBENZENE'], [T0('W5'), 'META PRODUCT'], [T0('W6'), 'SLOWER']].reduce((a, r) => t >= r[0] ? r[1] : a, ''));
}

/* ---------- C: carcinogenicity ---------- */
const AD = [['TOXIC', `\\text{benzene itself}`, 'C2'], ['CARCINOGENIC', `\\text{more than two fused benzene rings}`, 'C2'], ['FORMED BY', `\\text{burning without enough air}`, 'C3'], ['HARM', `\\text{react in the body, damage DNA}`, 'C5']];
$('#ars').innerHTML = AD.map(([l, q], i) => `<div class="ar" id="ar${i}" style="top:${84 + i * 116}px"><div class="lt">${l}</div><div class="lx">${K(q)}</div></div>`).join('');
const tAd = [T0('C2'), wt('C2', 'hydrocarbons'), T0('C3'), wt('C5', 'damage')];
const fused = (cx, cy, R, centers) => centers.map(([i, j]) => poly(cx + i * Math.sqrt(3) * R + j * Math.sqrt(3) * R / 2, cy - j * 1.5 * R, R, 6, [1, 1, 1, 1, 1, 1], { circ: 1, w: 5, rot: -90 })).join('');
function drawC(t) {
  let s = '';
  const sA = io(t, T0('C2') - 0.2, 0.4) * (1 - io(t, T0('C3') - 0.2, 0.3)), sB = io(t, T0('C3') - 0.2, 0.4) * (1 - io(t, T0('C4') - 0.2, 0.3)), sC = io(t, T0('C4') - 0.2, 0.4) * (1 - io(t, T0('C5') - 0.2, 0.3)), sD = io(t, T0('C5') - 0.2, 0.4);
  if (sA > 0.01) { const n = 1 + Math.floor(M.clamp((t - wt('C2', 'more')) / 0.7) * 3 + 0.001); const C4 = [[0, 0], [1, 0], [2, 0], [2, 1]].slice(0, Math.min(4, n));
    s += G(fused(170, 330, 62, C4) + T(392, 520, n >= 3 ? 'MORE THAN TWO FUSED RINGS · CARCINOGENIC' : 'BENZENE · TOXIC', { fs: 18, c: n >= 3 ? PU : C.ink, ls: 0.6 }), sA); }
  if (sB > 0.01) { let b = `<path d="M330 500 V260 H454 V500" fill="${tint(C.ink, 0.1)}" stroke="${C.ink2}" stroke-width="4"/>`;
    for (let k = 0; k < 8; k++) { const ph = ((t - T0('C3')) * 0.35 + k / 8) % 1, x = 392 + 70 * Math.sin(k * 1.9 + ph * 3) * ph, y = 250 - ph * 170; b += G(dot(x, y, 7 + 6 * ph, C.ink), (1 - ph) * Math.min(1, ph * 6)); }
    b += chip(150, 340, 'TOBACCO', C.ink2, io(t, wt('C3', 'Tobacco') - 0.1, 0.3), 20) + chip(150, 410, 'COAL', C.ink2, io(t, wt('C3', 'coal') - 0.1, 0.3), 20) + chip(630, 375, 'PETROLEUM', C.ink2, io(t, wt('C3', 'petroleum') - 0.1, 0.3), 20) + T(392, 550, 'INCOMPLETE BURNING · SOOT', { fs: 20, c: C.ink, ls: 0.6 });
    s += G(b, sB); }
  if (sC > 0.01) s += G(fused(150, 300, 56, [[0, 0], [1, 0], [2, 0], [2, 1]]) + chip(392, 480, '1,2-BENZANTHRACENE', PU, io(t, wt('C4', 'benzanthracene') - 0.2, 0.3), 20) + chip(220, 540, '3-METHYLCHOLANTHRENE', PU, io(t, wt('C4', 'methylcholanthrene') - 0.2, 0.3), 18) + chip(580, 540, '1,2-BENZPYRENE', PU, io(t, wt('C4', 'benzpyrene') - 0.2, 0.3), 18), sC);
  if (sD > 0.01) { let b = ''; const br = io(t, wt('C5', 'damage') - 0.1, 0.5);
    for (let k = 0; k <= 40; k++) { const x = 110 + k * 14, y1 = 300 + 70 * Math.sin(k * 0.35 + t * 0.6), y2 = 300 - 70 * Math.sin(k * 0.35 + t * 0.6); if (k % 2 === 0 && !(br > 0.5 && k > 18 && k < 24)) b += `<line x1="${x}" y1="${f1(y1)}" x2="${x}" y2="${f1(y2)}" stroke="${C.line}" stroke-width="4"/>`; b += dot(x, y1, 5, NC) + dot(x, y2, 5, PB); }
    b += G(`<path d="M380 200 L404 300 L380 400" fill="none" stroke="${PU}" stroke-width="6"/>` + T(392, 470, 'DNA DAMAGED · CAN CAUSE CANCER', { fs: 20, c: PU, ls: 0.6 }), br) + G(T(392, 540, 'STAY AWAY FROM SMOKE', { fs: 20, c: C.ink }), io(t, wt('C5', 'smoke') - 0.1, 0.4));
    s += G(b, sD); }
  put($('#cS2'), s);
  M.setT($('#cpL'), t < T0('C3') ? 'MOLECULE BENCH · FUSED RINGS' : t < T0('C4') ? 'MOLECULE BENCH · SOOT' : t < T0('C5') ? 'MOLECULE BENCH · EXAMPLES' : 'MOLECULE BENCH · DNA');
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Chlorine deactivates, so it is a <b>meta</b> director', right: 'Lone pairs feed o and p: <b>ortho para</b>, yet slower' });
$('#tS').innerHTML = `<g id="tM1">${chip(140, 110, 'Cl → meta?', C.red, 1, 26)}</g><g id="tM2">${ringG(450, 150, 48, [1, 1, 1, 1, 1, 1], 'Cl', CL, { circ: 1, fs: 20 }) + seat(450, 150, 48, 1, 'o', C.ok) + seat(450, 150, 48, 5, 'o', C.ok) + seat(450, 150, 48, 3, 'p', C.ok)}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M40 60 L240 160 M240 60 L40 160'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'Predicting the main product, and which groups activate or deactivate' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: '<b>Chlorobenzene</b> is nitrated. Where does NO₂ mainly go, and is it faster or slower than benzene?', qW: 800,
  opts: ['meta · faster', 'meta · slower', 'ortho, para · faster', 'ortho, para · slower'], right: 3, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`${mf('Cl')}\\ \\text{lone pairs} \\rightarrow o,\\,p`)], [K(`-I\\ \\text{pull} \\rightarrow \\text{slower than benzene}`)], [K(`\\text{answer: } o,\\,p \\text{ and slower}`)], [K(`\\text{A, B: meta trap} \\quad \\text{C: forgets the pull}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'slower'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Directive Influence', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Seats</b>: ortho next door · meta two away · para across',
    '<b>Givers</b> (OH, NH₂, OCH₃, CH₃): ortho para · activating · faster',
    '<b>Pullers</b> (NO₂, CN, CHO, COOH, SO₃H): meta · deactivating · slower',
    '<b>Halogens</b>: pull through the bond (deactivate) · lone pairs → ortho para',
    '<b>Examples</b>: toluene → o- and p-nitrotoluene · nitrobenzene → m-dinitrobenzene',
    '<b>Carcinogenic</b>: over two fused rings · from incomplete burning · damage DNA'] });
const YQ = ['Why is OH an ortho para director?', 'Where does a new group go in nitrobenzene, and why?', 'How are carcinogenic polynuclear hydrocarbons formed?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CLASS 12', topic: 'Why does salty water boil hotter? Solutions', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'Seats') - 0.1 + i * 0.25, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'random') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - tKit[i]) / 0.3) * (i >= 2 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'choose') - 0.15, 1e9, POP);
  }

  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P4', 'directive') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B5');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const k = io(t, tB1 - 0.1, 0.5);
    put($('#bS'), G(benchPh(t), 1 - k) + G(benchNi(t), k));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · PHENOL' : 'MOLECULE BENCH · NITROBENZENE');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), seatMap(t)); M.setT($('#shL'), 'THE SEATS');
    put($('#chS'), G(rule(t), io(t, tS1 + 0.8, 0.4))); M.setT($('#chL'), 'GIVER OR PULLER');
  }
  M.vis($('#th1'), t, tB5 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB5, tOpts: wt('B5', 'meta') - 0.1, tCount: T1('B5') + 0.05, dur: 3, tAns: T0('B6') - 0.02, tWhy: wt('B6', 'It') });

  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    drawD(t); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · LINK ' + (ki + 1)); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Givers') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Pullers') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'meta') + 0.1, 0.7);
  }

  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Nitration') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'harsher') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'Nitration') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
    M.setT($('#wrL'), t < T0('W4') ? 'MOLECULE BENCH · TOLUENE' : 'MOLECULE BENCH · NITROBENZENE');
  }

  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    AD.forEach((_, i) => { const el = $('#ar' + i); M.vis(el, t, tAd[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tAd[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tAd[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    drawC(t);
    if (t < T0('C2') - 0.2) put($('#cS2'), G(`<path d="M330 500 V260 H454 V500" fill="${tint(C.ink, 0.1)}" stroke="${C.ink2}" stroke-width="4"/>` + T(392, 550, 'SOOT FROM SMOKE', { fs: 20, c: C.ink }), io(t, tC1 + 0.4, 0.4)));
  }

  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'chlorine') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'lone') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'meta') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'lone') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Where'), tCount, tAns });
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
