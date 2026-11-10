// PUC Chemistry Ep 96: electrophilic substitution in benzene (Molecule bench)
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
const CL = '#2F6FEB';
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };
Object.assign(M.IC, { ring: ['M12 3a9 9 0 1 0 9 9', 'M21 12l-3-3', 'M21 12l3-3'], hex: ['M12 2l8.7 5v10L12 22l-8.7-5V7Z'] });
const chip = (x, y, lab, col, a = 1, fs = 24) => { const w = lab.length * fs * 0.62 + 28; return G(`<rect x="${f1(x - w / 2)}" y="${f1(y - 24)}" width="${f1(w)}" height="48" rx="12" fill="${tint(col, 0.12)}" stroke="${col}" stroke-width="3"/>` + T(x, y + fs * 0.36, lab, { fs, c: col, ls: 0 }), a); };
const ARW2 = (x1, y1, x2, y2, col = C.ink2) => `<line x1="${x1}" y1="${y1}" x2="${x2 - 12}" y2="${y2}" stroke="${col}" stroke-width="4"/><polygon points="${x2},${y2} ${x2 - 14},${y2 - 8} ${x2 - 14},${y2 + 8}" fill="${col}"/>`;

/* ---------- the mechanism (generic: chlorination and nitration) ---------- */
// o: { E, Ec, Er, pre: [[in1, in2], [E+, base], leave?], t: { gen, app, a1, sc, res, b, a2, pr } }
function mech(t, o) {
  const cx = 330, cy = 370, R = 100, T_ = o.t;
  const gen = io(t, T_.gen, 0.9), app = io(t, T_.app, 0.9), a1 = io(t, T_.a1, 0.7), sc = io(t, T_.sc, 0.6), bb = io(t, T_.b, 0.8), a2 = io(t, T_.b + 0.6, 0.6), a3 = io(t, T_.b + 1.3, 0.6), pr = io(t, T_.pr, 0.9);
  const p0 = rp(cx, cy, R, 0), Hx = lerp(lerp(cx, cx + 52, sc), 560, pr), Hy = lerp(lerp(p0[1] - 64, p0[1] - 58, sc), 150, pr);
  const Ex0 = 200, Ey0 = 150, Exs = cx - 52, Eys = p0[1] - 58;
  const Ex = pr > 0 ? lerp(Exs, cx, pr) : lerp(Ex0, Exs, app), Ey = pr > 0 ? lerp(Eys, p0[1] - 66, pr) : lerp(Ey0, Eys, app);
  let s = '';
  // pre: make the electrophile
  const [ins, outs, leave] = o.pre;
  s += G(chip(200, 150, ins[0], o.Ec) + T(320, 160, '+', { fs: 34, c: C.ink, ls: 0, ff: 'Poppins' }) + chip(470, 150, ins[1], NA), 1 - gen);
  if (gen > 0.02 && gen < 0.98) s += carr(240, 124, 440, 124, -50, M.clamp(gen * 1.6));
  if (leave) s += G(chip(lerp(330, 130, gen), lerp(150, 230, gen), leave, C.mute, 1, 20), gen * (1 - app));
  // base chip (from second reagent) travels to the H
  const bx = lerp(470, 610, bb), by = lerp(150, 190, bb);
  s += G(chip(bx, by, outs[1], NA), gen * (1 - pr)) + G(chip(bx, by, o.after, C.ok), pr);
  // ring
  const circA = (1 - sc) + pr, hs = sc * (1 - pr);
  s += poly(cx, cy, R, 6, [1, 1, 1, 1, 1, 1], { w: 6 });
  s += G(`<circle cx="${cx}" cy="${cy}" r="${f1(R * 0.56)}" fill="none" stroke="${NC}" stroke-width="6"/>`, Math.min(1, circA));
  if (hs > 0.01) { const r = R * 0.56, a0 = -30 * Math.PI / 180, a1_ = 210 * Math.PI / 180;
    s += G(`<path d="M${f1(cx + r * Math.cos(a0))} ${f1(cy + r * Math.sin(a0))} A${f1(r)} ${f1(r)} 0 1 1 ${f1(cx + r * Math.cos(a1_))} ${f1(cy + r * Math.sin(a1_))}" fill="none" stroke="${NC}" stroke-width="6" stroke-dasharray="10 8"/>` + chg(cx, cy, '+', EC), hs);
    // resonance: + moves ortho -> para -> ortho
    const rs = io(t, T_.res, 0.3) * (1 - io(t, T_.b - 0.3, 0.3)); if (rs > 0.01) { const k = [1, 3, 5][Math.floor(((t - T_.res) * 1.2) % 3)], p = rp(cx, cy, R + 34, k); s += G(chg(p[0], p[1], '+', EC), rs); }
    s += G(T(cx, cy + R + 40, 'sp³ CARBON · RING BROKEN', { fs: 18, c: EC }), hs * (1 - io(t, T_.res - 0.3, 0.3))); }
  // bonds from top carbon
  s += G(bond(p0[0], p0[1], Ex, Ey, 1, C.ink2, 5, 0, o.Er), Math.max(sc, pr)) + G(bond(p0[0], p0[1], Hx, Hy, 1, C.ink2, 5, 0, 16), 1 - pr);
  s += G(atomC(Hx, Hy, 16, 'H', HC, 15), 1 - pr) + atomC(Ex, Ey, o.Er, o.E, o.Ec, o.E.length > 2 ? o.Er * 0.66 : o.Er * 0.78);
  s += G(chg(Ex - o.Er - 4, Ey - 26, '+', EC), gen * (1 - sc));
    // curved arrows
  s += carr(cx - 10, cy - R * 0.56 - 4, Ex + 4, Ey + o.Er - 2, 40, a1 * (1 - sc));
  s += carr(bx - 50, by + 6, Hx + 10, Hy - 8, -40, a2 * (1 - pr));
  s += carr((p0[0] + Hx) / 2 + 6, (p0[1] + Hy) / 2 + 4, cx + 18, cy - R * 0.5, 50, a3 * (1 - pr));
  s += G(T(cx, cy + R + 40, o.prod, { fs: 22, c: NC, ls: 0.6 }), pr);
  return s;
}

/* ---------- title card + H ---------- */
const JOBS = [['package', 'Lego tower', 'SWAP ONE BRICK', 'Lego', 'BRICK'], ['users', 'Relay team', 'NEW RUNNER, SAME TEAM', 'relay', 'RUNNER'], ['ring', 'Bracelet', 'ONE BEAD CHANGED', 'bead', 'BEAD']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['users', 'Relay team', 'relay', 'H3'], ['arrowR', 'Fresh runner', 'fresh', 'H3'], ['x', 'One out', 'out', 'H4'], ['check', 'One in, never stops', 'never', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('hex', 26, '#fff', 2.2);
const QR = [['6 π electrons: a rich cloud', 'RICH', 'P2', 'cloud'], ['Electrophile: electron loving', 'E⁺', 'P3', 'electrophiles'], ['E takes the place of one H', 'SWAP', 'P4', 'place'], ['Swapping keeps the ring', 'KEEPS', 'P5', 'swapping'], ['Addition would break it', 'BREAKS', 'P6', 'break']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
function drawP(t) {
  const a = io(t, T0('P2'), 0.5), cl = io(t, tQr[0] - 0.1, 0.6), e = io(t, tQr[1] - 0.1, 0.8), sw = io(t, tQr[2] - 0.1, 1), ad = io(t, tQr[4] - 0.2, 0.5);
  const cx = 392, cy = 290;
  let s = G(`<circle cx="${cx}" cy="${cy}" r="98" fill="none" stroke="${tint(PB, 0.25)}" stroke-width="40"/>`, cl * (1 - ad));
  s += G(ringBS(cx, cy, 118, [1, 1, 1, 1, 1, 1], { circ: 1, sub: [sw > 0.5 ? 'E' : 'H'] }).replace(/>E</, '>E<'), a);
  const p = rp(cx, cy, 182, 0);
  if (e > 0.01 && sw < 0.999) s += G(atomC(lerp(700, p[0] + 90 * (1 - sw), e), lerp(110, p[1] - 10 * (1 - sw), e), 24, 'E', EC, 20) + chg(lerp(700, p[0] + 90, e) + 28, lerp(110, p[1], e) - 24, '+'), 1 - sw);
  if (sw > 0.01) s += G(atomC(p[0] - 90 * sw, p[1] - 20 * sw, 16, 'H', HC, 15) + T(p[0] - 90 * sw, p[1] - 44 * sw, 'H⁺', { fs: 16, c: C.mute, ls: 0 }), sw * (1 - io(t, tQr[3], 0.6)));
  s += G(T(cx, 530, 'SWAP ONE H · THE RING STAYS', { fs: 22, c: NC }), sw * (1 - ad)) + G(T(cx, 530, 'ADDITION WOULD BREAK THE RING', { fs: 22, c: C.red }), ad);
  put($('#pS'), s);
  M.setT(ptag, t < tQr[1] ? 'π CLOUD · RICH IN e⁻' : t < tQr[2] ? 'E⁺ · ELECTRON LOVING' : t < tQr[4] ? 'SUBSTITUTION' : 'NO ADDITION');
}

/* ---------- S: chlorination mechanism ---------- */
const MS = { gen: wt('S3', 'splits') - 0.2, app: wt('S4', 'reach') - 0.3, a1: wt('S4', 'grab') - 0.2, sc: wt('S5', 'holds') - 0.3, res: wt('S6', 'spreads') - 0.1, b: wt('S7', 'pulls') - 0.3, pr: wt('S8', 'fall') - 0.2 };
const MO = { E: 'Cl', Ec: CL, Er: 26, pre: [['Cl₂', 'AlCl₃'], ['Cl⁺', 'AlCl₄⁻']], prod: 'CHLOROBENZENE · C₆H₅Cl', after: 'HCl + AlCl₃', t: MS };
function stepS(t, st, labs) {
  const k = t < st[1] ? 0 : t < st[2] ? 1 : 2;
  return labs.map((l, i) => `<rect x="36" y="${74 + i * 62}" width="712" height="52" rx="12" fill="${i === k ? C.ac2 : C.soft}"/>` + T(60, 108 + i * 62, 'STEP ' + (i + 1), { fs: 16, a: 'start', c: i === k ? NC : C.mute }) + T(160, 109 + i * 62, l, { fs: 22, a: 'start', c: C.ink, ls: 0.2, ff: 'Poppins', fw: 600 })).join('');
}
function cyc(t) {
  const st = [[0, 'AlCl₃ · LEWIS ACID CATALYST', C.ink], [MS.gen, 'AlCl₃ → AlCl₄⁻ (makes Cl⁺)', NA], [MS.pr, 'AlCl₄⁻ → AlCl₃ + HCl · BACK AGAIN', C.ok]];
  const i = cur(st, t);
  return T(60, 140, i === 2 ? 'CATALYST RETURNS' : i === 1 ? 'Cl⁺ IS THE ELECTROPHILE' : 'ANHYDROUS AlCl₃', { fs: 34, c: i === 1 ? CL : NC, ls: 0, a: 'start', ff: 'Poppins', fw: 700 }) + T(62, 186, st[i][1], { fs: 18, a: 'start', c: st[i][2] });
}
function compare(t) {
  const a = io(t, wt('B2', 'Substitution') - 0.1, 0.5), b = io(t, wt('B3', 'Addition') - 0.1, 0.5);
  return G(poly(200, 260, 100, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(200, 216 - 130, 'Cl', { fs: 26, c: CL, ls: 0, ff: 'Poppins', fw: 700 }) + `<line x1="200" y1="160" x2="200" y2="100" stroke="${C.ink2}" stroke-width="5"/>` + T(200, 420, 'SUBSTITUTION', { fs: 22, c: C.ink }) + T(200, 456, '6 π · AROMATIC ✓', { fs: 20, c: C.ok }), a) +
    G(poly(580, 260, 100, 6, [1, 2, 1, 2, 1, 1]) + T(580, 420, 'ADDITION', { fs: 22, c: C.ink }) + T(580, 456, '4 π · NOT AROMATIC ✗', { fs: 20, c: C.red }) + [0, 5].map(k => { const p = rp(580, 260, 100, k), q = rp(580, 260, 160, k); return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.ink2}" stroke-width="4"/>` + atomC(q[0], q[1], 20, 'Cl', CL, 15); }).join(''), b);
}
const btg = tag($('#bn'));
const BT = [[0, 'CHLORINE + AlCl₃'], [T0('S2'), 'STEP 1 · MAKE E⁺'], [MS.gen, 'Cl⁺ FORMED'], [T0('S4'), 'STEP 2 · ATTACK'], [MS.sc, 'σ COMPLEX'], [MS.res, 'RESONANCE'], [T0('S7'), 'STEP 3 · LOSE H⁺'], [MS.pr, 'RING RESTORED'], [tB1, 'TWO PATHS']];
const th1 = PUC.think($('#th1'), { q: 'In the σ complex, is the ring still <b>aromatic</b>?', opts: ['Yes, aromatic', 'No, not aromatic'], right: 1, why: '<b>No</b>: one carbon is sp³, so the electrons cannot go all the way round.' });

/* ---------- D: five swaps ---------- */
const LK = [['LINK 1', 'Nitration', 'NO₂⁺', 'D2'], ['LINK 2', 'Halogenation', 'Cl⁺', 'D3'], ['LINK 3', 'Sulphonation', 'SO₃', 'D4'], ['LINK 4', 'Friedel-Crafts alkylation', 'CH₃⁺', 'D5'], ['LINK 5', 'Friedel-Crafts acylation', 'CH₃CO⁺', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DEQ = [`\\xrightarrow{\\text{conc. } \\mathrm{HNO_3} + \\text{conc. } \\mathrm{H_2SO_4}}`, `\\xrightarrow{\\mathrm{Cl_2},\\ \\text{anhyd. } \\mathrm{FeCl_3} \\text{ or } \\mathrm{AlCl_3}}`, `\\xrightarrow{\\text{fuming } \\mathrm{H_2SO_4}\\ (\\text{oleum})}`, `\\xrightarrow{\\mathrm{CH_3Cl},\\ \\text{anhyd. } \\mathrm{AlCl_3}}`, `\\xrightarrow{\\mathrm{CH_3COCl},\\ \\text{anhyd. } \\mathrm{AlCl_3}}`];
$('#deqs').innerHTML = DEQ.map((q, i) => `<div class="deq" id="dq${i}">${K(q)}</div>`).join('');
const PRD = [['NO₂', NB, 'NITROBENZENE'], ['Cl', CL, 'CHLOROBENZENE'], ['SO₃H', SC, 'BENZENESULPHONIC ACID'], ['CH₃', HC, 'TOLUENE'], ['COCH₃', OV, 'ACETOPHENONE']];
function drawD(t) {
  let s = ''; const op = [];
  PRD.forEach(([g, col, nm], i) => {
    const f = io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1); op.push(f); if (f < 0.01) return;
    const u = io(t, tLk[i] + 1.2, 0.8);
    let b = poly(190, 330, 90, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(190, 470, 'BENZENE', { fs: 18 }) + ARW2(320, 330, 420, 330);
    b += poly(570, 350, 90, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + G(`<line x1="570" y1="260" x2="570" y2="${f1(260 - 50 * u)}" stroke="${C.ink2}" stroke-width="5"/>` + chip(570, 186, g, col, 1, 24), u) + G(T(570, 490, nm, { fs: 18, c: C.ink }), u);
    b += G(chip(190, 210, 'E⁺ = ' + LK[i][2], EC, 1, 22), io(t, tLk[i] + 0.6, 0.4));
    s += G(b, f);
  });
  put($('#dS'), s);
  op.forEach((f, i) => { $('#dq' + i).style.opacity = f.toFixed(3); });
}
const dtg = tag($('#dr'));
const DLB = ['NITRATION', 'HALOGENATION', 'SULPHONATION', 'ALKYLATION', 'ACYLATION'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${E_('E^+')} \\rightarrow \\sigma\\ \\text{complex} \\rightarrow -\\,\\mathrm{H^+}`);

/* ---------- W: nitration ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${mf('HNO_3 + 2H_2SO_4')} \\rightleftharpoons ${E_(mf('NO_2^+'))} + ${mf('H_3O^+ + 2HSO_4^-')}`)],
  [K(`\\pi\\ e^- \\text{ attack } ${E_(mf('NO_2^+'))}`)],
  [K(`\\sigma \\text{ complex: } sp^3 \\text{ C with H and } ${mf('NO_2')}`)],
  [K(`${mf('HSO_4^-')} \\text{ removes } ${mf('H^+')}`)],
  [K(`${Y_(mf('C_6H_5NO_2'))}\\ \\text{(nitrobenzene)}`)]], { label: 'WORKED EXAMPLE', y0: 140, dy: 78 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const WS = { gen: wt('W2', 'Water') - 0.3, app: T0('W3') - 0.1, a1: wt('W3', 'attack') - 0.3, sc: wt('W4', 'forms') - 0.3, res: wt('W4', 'holds'), b: wt('W5', 'pulls') - 0.5, pr: T0('W6') };
const WO = { E: 'NO₂', Ec: NB, Er: 30, pre: [['HNO₃', 'H₂SO₄'], ['NO₂⁺', 'HSO₄⁻'], 'H₂O'], prod: 'NITROBENZENE · C₆H₅NO₂', after: 'H₂SO₄', t: WS };
const wtg = tag($('#wr'));

/* ---------- C: when benzene adds ---------- */
const AD = [['H₂ · Ni · HIGH T AND P', `${mf('C_6H_6')} + ${mf('3H_2')} \\rightarrow ${mf('C_6H_{12}')}\\ \\text{(cyclohexane)}`, 'C2'], ['Cl₂ · ULTRAVIOLET LIGHT', `${mf('C_6H_6')} + ${mf('3Cl_2')} \\rightarrow ${mf('C_6H_6Cl_6')}`, 'C3'], ['BURNS IN AIR · SOOTY FLAME', `${mf('2C_6H_6')} + ${mf('15O_2')} \\rightarrow ${mf('12CO_2')} + ${mf('6H_2O')}`, 'C4']];
$('#ars').innerHTML = AD.map(([l, q], i) => `<div class="ar" id="ar${i}" style="top:${84 + i * 116}px"><div class="lt">${l}</div><div class="lx">${K(q)}</div></div>`).join('');
const tAd = AD.map(a => T0(a[2]));
function drawC(t) {
  let s = '';
  const f = i => io(t, tAd[i] - 0.2, 0.35) * (i < 2 ? 1 - io(t, tAd[i + 1] - 0.2, 0.3) : 1);
  if (f(0) > 0.01) { const u = io(t, wt('C2', 'cyclohexane') - 0.4, 0.8); s += G(poly(392, 280, 120, 6, [1, 1, 1, 1, 1, 1], { circ: 1 - u }) + T(392, 470, u > 0.5 ? 'CYCLOHEXANE · C₆H₁₂ · NOT AROMATIC' : 'BENZENE', { fs: 20, c: C.ink, ls: 0.6 }) + G(chip(640, 140, '+ 3 H₂', HC), 1 - u), f(0)); }
  if (f(1) > 0.01) { const u = io(t, wt('C3', 'add') - 0.2, 1.4); let b = poly(392, 280, 110, 6, [1, 1, 1, 1, 1, 1], { circ: 1 - u });
    for (let k = 0; k < 6; k++) { const p = rp(392, 280, 110, k), q = rp(392, 280, 170, k), a = M.clamp(u * 6 - k); b += G(`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.ink2}" stroke-width="4"/>` + atomC(q[0], q[1], 20, 'Cl', CL, 15), a); }
    b += G(T(392, 520, 'BENZENE HEXACHLORIDE · C₆H₆Cl₆', { fs: 20, c: C.ink, ls: 0.6 }), io(t, wt('C3', 'hexachloride') - 0.2, 0.4)); s += G(b, f(1)); }
  if (f(2) > 0.01) { let b = flame(392, 470, t * 6) + `<path d="M342 470 h100" stroke="${C.ink2}" stroke-width="4"/>`;
    for (let k = 0; k < 7; k++) { const ph = ((t - tAd[2]) * 0.4 + k / 7) % 1, x = 392 + 50 * Math.sin(k * 2.3 + ph * 4), y = 380 - ph * 240; b += G(dot(x, y, 6 + 4 * ph, C.ink), (1 - ph) * Math.min(1, ph * 5)); }
    b += T(392, 530, 'SOOTY FLAME · CO₂ + H₂O', { fs: 20, c: C.ink, ls: 0.6 }); s += G(b, f(2)); }
  put($('#cS2'), s);
  M.setT($('#cpL'), ['MOLECULE BENCH · ADD H₂', 'MOLECULE BENCH · ADD Cl₂ IN UV', 'MOLECULE BENCH · BURN'][cur(tAd.map(x => [x - 0.2]), t)]);
}
const flame = (x, y, k) => `<path d="M${x - 46} ${y} Q${x - 34} ${y - 60 - 8 * Math.sin(k)} ${x} ${y - 96 - 10 * Math.sin(k * 1.3)} Q${x + 34} ${y - 60 + 8 * Math.sin(k)} ${x + 46} ${y} Z" fill="${tint(EC, 0.22)}" stroke="${EC}" stroke-width="3"/>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The electrophile in nitration is HNO₃ or NO₃⁻', right: 'The real attacker is <b>NO₂⁺</b>, the nitronium ion' });
$('#tS').innerHTML = `<g id="tM1">${chip(130, 90, 'HNO₃', C.red) + chip(130, 160, 'NO₃⁻', C.red)}</g><g id="tM2">${chip(430, 110, 'NO₂⁺', C.ok, 1, 34) + T(430, 190, 'NITRONIUM ION', { fs: 18, c: C.ok })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M60 50 L200 200 M200 50 L60 200'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'The electrophile in each reaction, and the three step mechanism' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: 'Benzene + Cl₂: (i) with anhydrous AlCl₃ in the dark, (ii) in UV light. Main products?', qW: 800,
  opts: [K(`${mf('C_6H_5Cl')},\\ ${mf('C_6H_6Cl_6')}`), K(`${mf('C_6H_6Cl_6')},\\ ${mf('C_6H_5Cl')}`), K(`${mf('C_6H_5Cl')},\\ ${mf('C_6H_5Cl')}`), K(`${mf('C_6H_6Cl_6')},\\ ${mf('C_6H_6Cl_6')}`)], right: 0, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`\\text{(i) } ${mf('AlCl_3')} \\rightarrow ${E_(mf('Cl^+'))}`)], [K(`\\text{swap one H: } ${mf('C_6H_5Cl')}`)], [K(`\\text{(ii) UV: 3 } ${mf('Cl_2')} \\text{ add: } ${mf('C_6H_6Cl_6')}`)], [K(`\\text{conditions decide the path}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'swaps'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Electrophilic Substitution', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Swap</b>: an electrophile E⁺ replaces one H · the aromatic ring is kept',
    '<b>3 steps</b>: make E⁺ · σ complex (sp³ C, arenium ion) · lose H⁺',
    '<b>Nitration</b>: conc. HNO₃ + conc. H₂SO₄ · E⁺ = NO₂⁺ · nitrobenzene',
    '<b>Halogenation</b>: Cl₂ + anhyd. FeCl₃/AlCl₃ · <b>sulphonation</b>: oleum, SO₃',
    '<b>Friedel-Crafts</b>: CH₃Cl or CH₃COCl + anhyd. AlCl₃ · toluene, acetophenone',
    '<b>Addition</b>: H₂/Ni → cyclohexane · Cl₂/UV → C₆H₆Cl₆ · burns with sooty flame'] });
const YQ = ['What are the three steps of electrophilic substitution?', 'What is the electrophile in sulphonation?', 'Why does benzene prefer substitution to addition?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 97', topic: 'Why does a new group choose its seat? Directive Influence', y: 764 });

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
  document.querySelectorAll('.deq').forEach(q => { if (q.offsetWidth > 712) q.style.fontSize = Math.floor(30 * 712 / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'single') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'whole') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'never') + 0.1) / 0.3) * (i === 3 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'swaps') - 0.15, 1e9, POP);
  }

  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P4', 'electrophilic') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B4');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const k = io(t, tB1 + 0.2, 0.5);
    put($('#bS'), G(`<g transform="translate(392 320) scale(1.18) translate(-370 -320)">${mech(t, MO)}</g>`, 1 - k) + G(compare(t), k));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · CHLORINATION' : 'MOLECULE BENCH · TWO PATHS');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), stepS(t, [0, T0('S4'), T0('S7')], ['Make the electrophile, Cl⁺', 'Form the σ complex', 'Lose a proton, H⁺']));
    put($('#chS'), G(cyc(t), io(t, tS1 + 0.8, 0.4))); M.setT($('#shL'), 'THREE STEPS'); M.setT($('#chL'), 'THE CATALYST');
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'aromatic') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'One') });

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
    M.rise($('#st1'), t, wt('T1', 'Make') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'lose') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'proton') + 0.1, 0.7);
  }

  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Nitration') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, wt('W1', 'Nitration') + 0.1, out, { dx: 60, dy: 0, ...o });
    put($('#wS'), `<g transform="translate(392 320) scale(1.18) translate(-370 -320)">${mech(t, WO)}</g>`); M.vis(wtg, t, T0('W2'), 1e9, POP);
    const WT = [[0, 'BENZENE + NITRATING MIX'], [WS.gen, 'NO₂⁺ BORN'], [WS.a1, 'π ELECTRONS ATTACK'], [WS.sc, 'σ COMPLEX'], [WS.b, 'HSO₄⁻ TAKES H⁺'], [WS.pr, 'NITROBENZENE']];
    M.setT(wtg, WT[cur(WT, t)][1]);
  }

  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    AD.forEach((_, i) => { const el = $('#ar' + i); M.vis(el, t, tAd[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tAd[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tAd[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    drawC(t);
    if (t < tAd[0] - 0.2) put($('#cS2'), G(poly(392, 280, 120, 6, [1, 1, 1, 1, 1, 1], { circ: 1 }) + T(392, 470, 'ONLY WHEN PUSHED HARD', { fs: 22, c: C.ink }), io(t, tC1 + 0.4, 0.4)));
  }

  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'electrophile') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'nitronium') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'nitric') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'nitronium') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
