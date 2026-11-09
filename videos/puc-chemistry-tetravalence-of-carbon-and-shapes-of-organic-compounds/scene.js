// PUC Chemistry Ep 78: tetravalence of carbon and shapes of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal, hydrogen ink, s orbital / s character gold, p orbital blue, hybrid orbitals teal, electrons orange, sigma bonds ink, pi bonds violet
const NC = C.ac, HC = C.ink, EC = '#C8461B', SC = '#B7791F', PB = '#2F6FEB', PV = '#7A4FE0', GC = C.ink;
const IMG = '../../assets/illustrations/puc/';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const S_ = s => `\\textcolor{${SC}}{${s}}`, P_ = s => `\\textcolor{${PV}}{${s}}`, Y_ = s => `\\textcolor{${NC}}{${s}}`;

Object.assign(M.IC, {
  fan: ['M12 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z', 'M12 10V3', 'M13.7 13l6.1 3.5', 'M10.3 13l-6.1 3.5'],
  seesaw: ['M3 9l18 6', 'M12 12l-3 8h6Z'],
  tetra: ['M12 3 3 19h18Z', 'M12 3v16', 'M3 19l9-6 9 6'],
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
const pDb = (x, y, ang, L, W, dash, col = PB) => lobe(x, y, ang, L, W, col, 0.16, dash) + lobe(x, y, ang + 180, L, W, col, 0.16, dash);
const sBall = (x, y, r) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${tint(SC, 0.22)}" stroke="${SC}" stroke-width="2.5"/>`;
const dot = (x, y, r = 7, c = C.ink2) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}"/>`;
const atomC = (x, y, r, lab, col = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}"/>` + T(x, y + (fs || r * 0.8) * 0.36, lab, { ff: 'Poppins', fw: 700, fs: fs || r * 0.8, c: '#fff', ls: 0 });
const ln = (x1, y1, x2, y2, c = C.ink2, w = 6, u = 1) => u < 0.01 ? '' : `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x1 + (x2 - x1) * u)}" y2="${f1(y1 + (y2 - y1) * u)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const ang2 = (dx, dy) => Math.atan2(dy, dx) * 180 / Math.PI;
const ARW = (x, y, up, c = EC) => up ? `<line x1="${f1(x)}" y1="${f1(y + 46)}" x2="${f1(x)}" y2="${f1(y + 18)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 10)} ${f1(x - 8)},${f1(y + 22)} ${f1(x + 8)},${f1(y + 22)}" fill="${c}"/>`
  : `<line x1="${f1(x)}" y1="${f1(y + 14)}" x2="${f1(x)}" y2="${f1(y + 42)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 50)} ${f1(x - 8)},${f1(y + 38)} ${f1(x + 8)},${f1(y + 38)}" fill="${c}"/>`;
const box = (x, y, col, e = '', a = 1, z = 60) => G(`<g transform="translate(${f1(x)} ${f1(y)}) scale(${(z / 60).toFixed(3)})"><rect x="0" y="0" width="60" height="60" rx="8" fill="${tint(col, 0.12)}" stroke="${col}" stroke-width="3"/>` +
  (e === 'ud' ? ARW(19, 0, 1) + ARW(41, 0, 0) : e === 'u' ? ARW(30, 0, 1) : e === 'd' ? ARW(30, 0, 0) : '') + '</g>', a);
const ARWs = (x, y, up, z) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(z / 60).toFixed(3)})">${ARW(0, 0, up)}</g>`;
const BZ = 80;
const lerp = M.lerp, lc = (a, b, u) => mix(a, b, u);
const nrm = v => { const l = Math.hypot(...v) || 1; return v.map(a => a / l); };
const PR = ([x, y, z], w = 1) => { const ty = -0.3 * w, tx = 0.3 * w; let c = Math.cos(ty), s = Math.sin(ty); const x1 = x * c + z * s, z1 = -x * s + z * c; c = Math.cos(tx); s = Math.sin(tx); return [x1, -(y * c - z1 * s), y * s + z1 * c]; };
const GEO = { lin: [[-1, 0, 0], [1, 0, 0]], tet: [[-0.943, -0.333, 0], [0.471, -0.333, 0.816], [0, 1, 0], [0.471, -0.333, -0.816]] };
const lobes3 = (cx, cy, dirs, L, u = 1, w = 1) => dirs.map(d => { const p = PR(d, w); return [p[2], hyb(cx, cy, ang2(p[0], p[1]), L * u * (0.75 + 0.25 * Math.hypot(p[0], p[1])))]; }).sort((a, b) => a[0] - b[0]).map(x => x[1]).join('');

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB3 = T0('B3'), tB4 = T0('B4'), tD1 = T0('D1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['fan', 'Ceiling fan', 'THREE FLAT BLADES', 'fan', 'FLAT'], ['seesaw', 'Seesaw', 'ONE STRAIGHT LINE', 'seesaw', 'LINE'], ['tetra', 'Sea wall block', 'FOUR LEGS, ONE UP', 'block', '3D']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['plus', 'Dough', 'dough', 'H3'], ['tetra', '4 toothpicks', 'four', 'H3'], ['arrowR', 'Spread out', 'spreads', 'H4'], ['check', 'One up', 'points', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: chapter 8, carbon ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Organic = carbon compounds', 'CARBON', 'P1', 'Organic'], ['1828: Wöhler makes urea', '1828', 'P3', 'eighteen'], ['Carbon: 2, 4 electrons', '2, 4', 'P4', 'arranged'], ['4 outer electrons, 4 bonds', '4 HANDS', 'P5', 'four'], ['Tetravalent: valence four', 'TETRA = 4', 'P6', 'tetravalent']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const EV = [['Sugar', 'Sugar'], ['Cotton', 'cotton'], ['Cooking gas', 'cooking'], ['You', 'you']];
const tEv = EV.map(e => wt('P2', e[1]));
const tAtom = wt('P4', 'electrons'), tH = wt('P5', 'pair'), tTv = wt('P6', 'tetravalent');
function drawP(t) {
  let s = '';
  const a0 = 1 - io(t, tAtom - 0.4, 0.4);
  if (a0 > 0.01) {
    let A = '';
    EV.forEach(([n], i) => { const x = 60 + (i % 2) * 344, y = 96 + Math.floor(i / 2) * 116, a = io(t, tEv[i] - 0.1, 0.3);
      A += G(`<rect x="${x}" y="${y}" width="320" height="96" rx="14" fill="${C.soft}"/>` + atomC(x + 52, y + 48, 26, 'C', NC, 22) + T(x + 98, y + 58, n, { ff: 'Poppins', fw: 700, fs: 28, c: C.ink, a: 'start', ls: 0 }), a); });
    const u = io(t, T0('P3') - 0.1, 0.4), ar = io(t, wt('P3', 'urea') - 0.1, 0.5);
    A += G(`<rect x="60" y="340" width="664" height="196" rx="14" fill="#fff" stroke="${C.line || '#E6E8EE'}" stroke-width="2"/>` + T(96, 410, '1828', { fs: 56, c: C.ink, a: 'start', ls: 0 }) + T(260, 404, 'WÖHLER · IN A LAB', { fs: 20, a: 'start' }) +
      T(96, 488, 'AMMONIUM CYANATE', { fs: 22, c: C.ink, a: 'start', ls: 0.4 }) + G(`<line x1="372" y1="481" x2="372" y2="481" stroke="none"/>` + ln(376, 481, 520, 481, C.ink2, 4, ar) + `<polygon points="532,481 516,472 516,490" fill="${C.ink2}" opacity="${ar.toFixed(3)}"/>`, 1) + G(T(560, 488, 'UREA', { fs: 26, c: NC, a: 'start', ls: 0.4 }), io(t, wt('P3', 'urea') + 0.3, 0.3)) +
      T(260, 438, 'ORGANIC, FROM A SALT', { fs: 16, a: 'start' }), u);
    s += G(A, a0);
  }
  const a1 = io(t, tAtom - 0.2, 0.4);
  if (a1 > 0.01) {
    const cx = 392, cy = 310, hp = io(t, tH - 0.3, 1.0), tv = io(t, tTv, 0.4);
    let B = `<circle cx="${cx}" cy="${cy}" r="72" fill="none" stroke="#C9CDD6" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="#C9CDD6" stroke-width="2" opacity="${(1 - hp * 0.7).toFixed(3)}"/>`;
    B += dot(cx, cy - 72, 8) + dot(cx, cy + 72, 8);
    const D = [-135, -45, 45, 135];
    D.forEach((d, i) => { const r = d * Math.PI / 180, ux = Math.cos(r), uy = Math.sin(r);
      const eR = lerp(140, 178, hp), ex = cx + ux * eR - uy * 9 * hp, ey = cy + uy * eR + ux * 9 * hp;
      const hR = lerp(330, 236, M.clamp(M.spring(t - tH + 0.3 - i * 0.12, M.SOFT))), hx = cx + ux * hR, hy = cy + uy * hR;
      if (hp > 0.02) { B += G(ln(cx + ux * 44, cy + uy * 44, cx + ux * 212, cy + uy * 212, C.ink2, 5), io(t, tH + 0.6, 0.4)); B += G(atomC(hx, hy, 26, 'H', HC, 22) + dot(cx + ux * lerp(300, 194, hp) + uy * 9 * hp, cy + uy * lerp(300, 194, hp) - ux * 9 * hp, 8, EC), io(t, tH - 0.3, 0.3)); }
      B += dot(ex, ey, 8, EC); });
    B += atomC(cx, cy, 42, 'C', NC, 34);
    B += G(T(cx, 560, '2, 4 · FOUR OUTER ELECTRONS', { fs: 18 }), io(t, tAtom + 0.2, 0.3) * (1 - io(t, tTv - 0.2, 0.3)));
    B += G(T(cx, 560, 'TETRAVALENT · VALENCE 4', { fs: 20, c: NC }), tv);
    s += G(B, a1);
  }
  put($('#pS'), s);
  M.setT(ptag, t < tAtom - 0.2 ? 'ALL BUILT ON CARBON' : t < tH ? 'C · 2, 4' : t < tTv ? '4 SHARED PAIRS' : 'FOUR BONDS');
  M.setT($('#pwL'), t < tAtom - 0.2 ? 'CARBON IS EVERYWHERE' : 'MOLECULE BENCH · CARBON');
}

/* ---------- S + B: bench ---------- */
const tPro = wt('S3', 'jumps'), tBl = wt('S4', 'blend'), tOutc = wt('S4', 'four'), tTet = wt('S5', 'corners'), tHov = wt('S5', 'methane');
const tSp2 = wt('B1', 'Three'), tSp = wt('B3', 'Two'), tB2 = T0('B2');
const AT = [[120, 410], [120, 200], [210, 200], [300, 200]], HY = [[390, 310], [480, 310], [570, 310], [660, 310]];
const AXIS = `<line x1="56" y1="510" x2="56" y2="110" stroke="${C.ink2}" stroke-width="2.5"/><polygon points="56,96 48,112 64,112" fill="${C.ink2}"/>` + `<text x="40" y="320" transform="rotate(-90 40 320)" font-family="IBM Plex Mono" font-weight="600" font-size="16" fill="${C.mute}" text-anchor="middle" letter-spacing="1.6">ENERGY</text>`;
function benchC(t) {
  const u = io(t, tBl, 1.4), pr = io(t, tPro, 0.9);
  let s = AXIS;
  const E = ['ud', 'u', 'u', ''], Ep = ['u', 'u', 'u', 'u'];
  AT.forEach((p, i) => { const q = HY[i], x = lerp(p[0], q[0], u), y = lerp(p[1], q[1], u), col = lc(i ? PB : SC, NC, u);
    let e = pr > 0.5 ? Ep[i] : E[i]; if (i === 0 && pr > 0.02 && pr < 1) e = 'u'; if (i === 3 && pr < 1) e = '';
    s += box(x, y, col, e, 1, BZ); });
  if (pr > 0.02 && pr < 0.999) { const x = lerp(AT[0][0] + 55, AT[3][0] + 40, pr), y = lerp(AT[0][1], AT[3][1], pr) - Math.sin(pr * Math.PI) * 70; s += ARWs(x, y, pr > 0.5, BZ); }
  const la = 1 - u;
  s += G(T(160, 524, '2s', { fs: 24, c: SC, ls: 0 }) + T(250, 314, '2p', { fs: 24, c: PB, ls: 0 }), la);
  s += G(T(565, 428, 'FOUR EQUAL sp³', { fs: 24, c: NC, ls: 0 }), io(t, tOutc, 0.4));
  s += G(T(530, 150, 'PROMOTION: 2s → 2p', { fs: 20, c: EC }), pr * (1 - u));
  return s;
}
function benchB(t, n) { // n = 3 (sp2) or 2 (sp)
  let s = AXIS;
  const x0 = 130; for (let i = 0; i < n; i++) s += box(x0 + i * 90, 330, NC, 'u', 1, BZ);
  const xp = x0 + n * 90 + 60; for (let i = 0; i < 4 - n; i++) s += box(xp + i * 90, 190, PB, 'u', 1, BZ);
  if (n === 3) { const h = io(t, tB2, 0.3); if (h > 0.01) s += `<rect x="${xp - 10}" y="180" width="100" height="100" rx="14" fill="none" stroke="${PV}" stroke-width="4" opacity="${h.toFixed(3)}"/>` + G(T(xp + 40, 140, 'FOR THE π BOND', { fs: 18, c: PV }), h); }
  s += T(x0 + n * 45 - 5, 450, n === 3 ? 'THREE sp²' : 'TWO sp', { fs: 24, c: NC, ls: 0 }) + T(xp + (4 - n) * 45 - 5, 310, (4 - n) + ' p LEFT OVER', { fs: 20, c: PB, ls: 0.6 });
  s += T(n === 3 ? 260 : 220, 140, n === 3 ? 'C · ONE DOUBLE BOND' : 'C · ONE TRIPLE BOND', { fs: 20 });
  return s;
}
const SH = { tri: [0, 120, 240].map(a => [Math.cos(a * Math.PI / 180), 0, Math.sin(a * Math.PI / 180)]), lin: GEO.lin };
function shapeS(t, k) {
  const cx = 260, cy = 156, L = 104;
  if (k === 'tet') { const u = io(t, tOutc, 0.6), a = io(t, tTet, 0.8), hh = io(t, tHov, 0.5);
    const dirs = GEO.tet.map((d, i) => nrm(d.map((v, q) => v * a + [[0.2, 1, 0.1], [0.5, 0.9, 0.2], [0.8, 0.6, -0.1], [0.3, 0.8, -0.4]][i][q] * (1 - a))));
    let s = G(sBall(cx, cy, 34) + pDb(cx, cy, 0, 78, 26) + pDb(cx, cy, 90, 78, 26) + pDb(cx, cy, 35, 66, 22) + T(530, 150, '1 s + 3 p', { fs: 32, c: C.ink, ls: 0, a: 'start' }) + T(530, 192, 'NOT MIXED YET', { fs: 18, a: 'start' }), 1 - io(t, tBl, 0.8)) + lobes3(cx, cy, dirs, L, u) + dot(cx, cy, 8, NC);
    if (hh > 0.01) s += G(dirs.map(d => { const p = PR(d); return atomC(cx + p[0] * L * 1.02, cy + p[1] * L * 1.02, 15, 'H', HC, 14); }).join(''), hh);
    s += G(T(530, 150, '109.5°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(530, 192, 'TETRAHEDRAL · sp³', { fs: 18, a: 'start' }) + G(T(530, 226, '4 SINGLE · METHANE', { fs: 16, a: 'start', c: NC }), hh), a);
    return s; }
  if (k === 'tri') { const h = io(t, tB2, 0.3); return pDb(cx, cy, -90, 70 + 8 * h, 26, true) + lobes3(cx, cy, SH.tri, L, 1, 0.9) + dot(cx, cy, 8, NC) + T(530, 150, '120°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(530, 192, 'TRIGONAL PLANAR · sp²', { fs: 18, a: 'start' }) + T(530, 226, '1 DOUBLE · ETHENE', { fs: 16, a: 'start', c: NC }); }
  return pDb(cx, cy, -90, 66, 24, true) + pDb(cx, cy, -35, 56, 20, true) + lobes3(cx, cy, SH.lin, L, 1, 0) + dot(cx, cy, 8, NC) + T(530, 150, '180°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(530, 192, 'LINEAR · sp', { fs: 18, a: 'start' }) + T(530, 226, '1 TRIPLE · ETHYNE', { fs: 16, a: 'start', c: NC });
}
function charS(n, pc, hi = 0) {
  const W = 500, w = W / n; let s = '';
  for (let i = 0; i < n; i++) s += `<rect x="${f1(36 + i * w + 3)}" y="84" width="${f1(w - 6)}" height="62" rx="10" fill="${tint(i ? PB : SC, 0.16)}" stroke="${i ? PB : SC}" stroke-width="3"/>` + T(36 + i * w + w / 2, 124, i ? 'p' : 's', { fs: 28, c: i ? PB : SC, ls: 0 });
  s += T(580, 136, pc, { fs: 54, c: SC, ls: 0, a: 'start' }) + T(582, 172, 's CHARACTER', { fs: 16, a: 'start' });
  s += T(36, 206, `1 s + ${n - 1} p → ${n} ${n === 4 ? 'sp³' : n === 3 ? 'sp²' : 'sp'} · each is 1 part s in ${n}`, { fs: 18, a: 'start', c: C.ink, ls: 0.4 });
  if (hi > 0.01) s += `<rect x="560" y="80" width="200" height="110" rx="14" fill="none" stroke="${C.ok}" stroke-width="4" opacity="${hi.toFixed(3)}"/>`;
  return s;
}
function charAll(t) { // B4: all three side by side
  const R = [['sp³', '25%', 'Twenty'], ['sp²', '33%', 'thirty'], ['sp', '50%', 'fifty']];
  return R.map(([h, p, w], i) => { const x = 60 + i * 236, a = io(t, wt('B4', w) - 0.1, 0.3), fr = [0.25, 0.333, 0.5][i];
    return G(`<rect x="${x}" y="84" width="200" height="40" rx="10" fill="${tint(PB, 0.14)}" stroke="${PB}" stroke-width="2.5"/><rect x="${x}" y="84" width="${f1(200 * fr)}" height="40" rx="10" fill="${tint(SC, 0.4)}" stroke="${SC}" stroke-width="2.5"/>` +
      T(x + 100, 172, p, { fs: 40, c: SC, ls: 0 }) + T(x + 100, 212, h, { fs: 24, c: NC, ls: 0 }), a); }).join('');
}
const btg = tag($('#bn'));
const BT = [[0, 'CARBON · 2s² 2p²'], [wt('S2', 'unpaired'), 'ONLY 2 UNPAIRED'], [tPro, 'PROMOTION'], [wt('S3', 'Now'), '4 UNPAIRED'], [tBl, 'MIXING'], [tOutc, '4 EQUAL sp³'], [tSp2, 'sp² · ONE p LEFT'], [tSp, 'sp · TWO p LEFT']];

/* ---------- D ---------- */
const LK = [['LINK 1', 's sits closer to the nucleus', 'CLOSE', 'D2'], ['LINK 2', 'More s, electrons stay closer', 'MORE s', 'D3'], ['LINK 3', 'So bonds get shorter', '154 · 134 · 120', 'D4'], ['LINK 4', 'Shorter bonds are stronger', '681 > 348', 'D5'], ['LINK 5', 'sp carbon pulls hardest', 'sp > sp² > sp³', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const nuc = (x, y) => `<circle cx="${x}" cy="${y}" r="12" fill="${NC}"/>` + T(x, y + 6, '+', { ff: 'Poppins', fw: 700, fs: 18, c: '#fff', ls: 0 });
const DP = [
  t => sBall(220, 280, 70) + nuc(220, 280) + T(220, 420, 's · CLOSE', { fs: 24, c: SC, ls: 0 }) + pDb(560, 280, 0, 130, 46) + nuc(560, 280) + T(560, 420, 'p · FARTHER OUT', { fs: 24, c: PB, ls: 0 }) +
    T(392, 500, 'NUCLEUS = TEAL DOT', { fs: 16 }),
  t => [['sp³', '25% s', 150], ['sp²', '33% s', 128], ['sp', '50% s', 104]].map(([h, p, L], i) => { const y = 150 + i * 130; return hyb(170, y, 0, L) + nuc(170, y) + ln(170, y + 50, 170 + L, y + 50, C.mute, 2) + T(470, y + 8, h, { fs: 30, c: NC, ls: 0, a: 'start' }) + T(590, y + 8, p, { fs: 22, c: SC, ls: 0, a: 'start' }); }).join('') +
    T(392, 548, 'SHORTER REACH = ELECTRONS CLOSER', { fs: 16 }),
  t => [['C-C', 154, 'ETHANE', 1], ['C=C', 134, 'ETHENE', 2], ['C≡C', 120, 'ETHYNE', 3]].map(([b, pm, n, o], i) => { const y = 150 + i * 135, L = pm * 2.3, u = io(t, wt('D4', ['fifty', 'thirty', 'twenty'][i]) - 0.15, 0.4), x0 = 110;
    let s = ''; for (let k = 0; k < o; k++) { const off = (k - (o - 1) / 2) * 14; s += ln(x0, y + off, x0 + L, y + off, k === 0 && o > 1 || o === 1 ? C.ink2 : PV, 5, u); }
    return G(s + atomC(x0, y, 30, 'C', NC, 24) + G(atomC(x0 + L, y, 30, 'C', NC, 24) + T(x0 + L + 50, y + 2, pm + ' pm', { fs: 28, c: C.ink, ls: 0, a: 'start' }) + T(x0 + L + 50, y + 30, n, { fs: 15, a: 'start' }), u), io(t, i ? wt('D4', ['fifty', 'thirty', 'twenty'][i]) - 0.4 : tLk[2], 0.3)); }).join(''),
  t => [['C-C', 348, 'Five', 'single'], ['C=C', 681, 'double', 'double']].map(([b, k, w], i) => { const y = 170 + i * 170, u = io(t, wt('D5', i ? 'double' : 'single') - 0.1, 0.6), W = k * 0.82;
    return G(T(70, y + 12, b, { fs: 28, c: C.ink, ls: 0, a: 'start' }), io(t, wt('D5', i ? 'double' : 'single') - 0.3, 0.3)) + `<rect x="170" y="${y - 28}" width="${f1(W * u)}" height="56" rx="10" fill="${tint(i ? PV : C.ink2, 0.22)}" stroke="${i ? PV : C.ink2}" stroke-width="2.5"/>` + G(T(180 + W, y + 12, k, { fs: 30, c: C.ink, ls: 0, a: 'start' }), u); }).join('') +
    T(392, 500, 'BOND ENTHALPY · kJ mol⁻¹', { fs: 18 }),
  t => [['sp', 7], ['sp²', 5], ['sp³', 3]].map(([h, w], i) => { const y = 160 + i * 130; return atomC(200, y, 34, 'C', NC, 26) + T(200, y + 62, h, { fs: 20, c: NC, ls: 0 }) + ln(250, y, 380 - i * 30, y, EC, w) + `<polygon points="${250 - 4},${y} ${262},${y - 10} ${262},${y + 10}" fill="${EC}"/>` + dot(470 - i * 30, y - 8, 8, EC) + dot(470 - i * 30, y + 8, 8, EC); }).join('') +
    T(560, 300, 'PULL ON', { fs: 18, a: 'start' }) + T(560, 326, 'ELECTRONS', { fs: 18, a: 'start' }) + T(392, 548, 'MORE s = MORE ELECTRONEGATIVE', { fs: 16 }),
];
const dtg = tag($('#dr'));
const DLB = ['s VS p', 'REACH OF EACH HYBRID', 'BOND LENGTH', 'BOND STRENGTH', 'ELECTRONEGATIVITY'];

/* ---------- C: ethane vs ethene ---------- */
const tSpin = wt('C2', 'spin'), tPi = wt('C3', 'sideways'), tFlat = wt('C3', 'flat'), tC4 = T0('C4'), tC5 = T0('C5'), tTw = wt('C5', 'twist'), tC6 = T0('C6'), tAtk = wt('C6', 'Attackers');
function ethane(t) {
  const cx1 = 290, cx2 = 494, cy = 300, th = Math.max(0, t - tSpin) * 1.6;
  let items = [];
  [[cx1, -1, 0], [cx2, 1, th + Math.PI / 3]].forEach(([x, sg, ph]) => { for (let k = 0; k < 3; k++) { const a = ph + k * 2 * Math.PI / 3, y = cy - 112 * Math.cos(a), z = Math.sin(a), hx = x + sg * 66 + 20 * z * sg * 0.3;
    items.push([z, ln(x, cy, hx, y, C.ink2, 5) + atomC(hx, y, 22 + 3 * z, 'H', HC, 18)]); } });
  items.sort((a, b) => a[0] - b[0]);
  let s = items.filter(i => i[0] < 0).map(i => i[1]).join('');
  s += ln(cx1, cy, cx2, cy, C.ink2, 7) + atomC(cx1, cy, 36, 'C', NC, 28) + atomC(cx2, cy, 36, 'C', NC, 28);
  s += items.filter(i => i[0] >= 0).map(i => i[1]).join('');
  const sp = io(t, tSpin - 0.1, 0.4);
  s += G(`<path d="M650 210 A40 90 0 1 1 650 390" fill="none" stroke="${C.ok}" stroke-width="4" stroke-linecap="round"/><polygon points="650,398 638,382 660,380" fill="${C.ok}"/>` + T(392, 510, 'FREE TO SPIN', { fs: 22, c: C.ok }), sp);
  s += T(392, 470, 'ONE σ BOND · END TO END', { fs: 18 });
  return s;
}
function ethene(t) {
  const tw = io(t, tTw, 0.6) * (1 - io(t, tC6 - 0.4, 0.5)), ph = tw * 70 * Math.PI / 180, ov = Math.pow(Math.cos(ph), 2);
  const P3 = (u, v, w) => [392 + u + 0.25 * v, 330 - 0.45 * v - w];
  let s = '';
  const pl = io(t, tFlat - 0.1, 0.4);
  s += G(`<polygon points="${[P3(-250, -230, 0), P3(250, -230, 0), P3(250, 230, 0), P3(-250, 230, 0)].map(p => p.map(f1).join(',')).join(' ')}" fill="${tint(NC, 0.08)}" stroke="${NC}" stroke-width="2" stroke-dasharray="6 6"/>` + T(640, 450, 'ONE PLANE', { fs: 16, c: NC }), pl);
  const C1 = P3(-80, 0, 0), C2 = P3(80, 0, 0);
  const rot = (v, w) => [v * Math.cos(ph) - w * Math.sin(ph), v * Math.sin(ph) + w * Math.cos(ph)];
  const Hs = [[-150, 150, 0, 0], [-150, -150, 0, 0], [150, 150, 0, 1], [150, -150, 0, 1]];
  Hs.forEach(([u, v, w, r]) => { let vv = v, ww = w; if (r) [vv, ww] = rot(v, w); const p = P3(u, vv, ww), c = r ? C2 : C1; s += ln(c[0], c[1], p[0], p[1], C.ink2, 5) + atomC(p[0], p[1], 22, 'H', HC, 18); });
  s += ln(C1[0], C1[1], C2[0], C2[1], C.ink2, 7);
  const pa = io(t, T0('C3') - 0.1, 0.4);
  const pdir = r => { const [vv, ww] = r ? rot(0, 1) : [0, 1]; const a = P3(0, 0, 0), b = P3(0, vv, ww); return ang2(b[0] - a[0], b[1] - a[1]); };
  s += G(pDb(C1[0], C1[1], pdir(0), 92, 30) + pDb(C2[0], C2[1], pdir(1), 92, 30), pa);
  const pc = io(t, tPi - 0.1, 0.5) * ov;
  if (pc > 0.01) s += G([-1, 1].map(k => `<ellipse cx="${f1((C1[0] + C2[0]) / 2)}" cy="${f1(C1[1] - k * 70)}" rx="104" ry="26" fill="${tint(PV, 0.22)}" stroke="${PV}" stroke-width="3"/>`).join('') + T(392 + 200, C1[1] - 120, 'π', { ff: 'Poppins', fw: 700, fs: 40, c: PV, ls: 0 }), pc);
  s += atomC(C1[0], C1[1], 36, 'C', NC, 28) + atomC(C2[0], C2[1], 36, 'C', NC, 28);
  if (tw > 0.05) s += G(T(392, 540, 'TWIST · π BREAKS', { fs: 22, c: C.red }), tw);
  const ak = io(t, tAtk - 0.2, 0.6);
  if (ak > 0.01) { const y = lerp(90, 170, ak); s += G(atomC(392, y, 20, '+', SC, 22) + T(450, y + 6, 'ATTACKER', { fs: 16, c: SC, a: 'start' }), ak); }
  return s;
}
const th1 = PUC.think($('#th1'), { q: 'Can the two ends of <b>ethene</b> spin, like the ends of ethane?', opts: ['Yes, freely', 'No, they are locked'], right: 1, why: 'A twist turns the p orbitals apart and the <b style="color:#7A4FE0">π bond</b> breaks. Rotation is restricted.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`4\\sigma \\rightarrow ${Y_('sp^3')} \\quad 3\\sigma + 1${P_('\\pi')} \\rightarrow ${Y_('sp^2')} \\quad 2\\sigma + 2${P_('\\pi')} \\rightarrow ${Y_('sp')}`);

/* ---------- W: but-1-en-3-yne ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{C1, C2}: 3\\sigma \\rightarrow ${Y_('sp^2')}`)],
  [K(`\\mathrm{C3, C4}: 2\\sigma \\rightarrow ${Y_('sp')}`)],
  [K(`\\sigma = 3\\ \\mathrm{(C-C)} + 4\\ \\mathrm{(C-H)} = 7`)],
  [K(`${P_('\\pi')} = 1 + 2 = 3`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Left end flat, right end straight'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const WA = { C1: [170, 230], C2: [290, 230], C3: [350, 334], C4: [410, 438], Ha: [110, 126], Hb: [110, 334], Hc: [350, 126], Hd: [452, 510] };
const WB = [['C1', 'C2', 2], ['C1', 'Ha', 1], ['C1', 'Hb', 1], ['C2', 'Hc', 1], ['C2', 'C3', 1], ['C3', 'C4', 3], ['C4', 'Hd', 1]];
const tW4 = T0('W4'), tW5 = T0('W5'), tW1b = wt('W1', 'hybridisation');
function drawW(t) {
  let s = '';
  const sg = M.clamp((t - wt('W4', 'Every')) / ((T1('W4') - wt('W4', 'Every')) * 0.85)), sgN = Math.floor(sg * 7 + 0.001), piN = t < wt('W5', 'One') ? 0 : t < wt('W5', 'two') ? 1 : 3;
  let si = 0, pi = 0;
  WB.forEach(([a, b, o], i) => { const A = WA[a], B = WA[b], u = io(t, tW1b + i * 0.22, 0.35), dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), px = -dy / L, py = dx / L;
    for (let k = 0; k < o; k++) { const off = (k - (o - 1) / 2) * 14, isPi = k !== Math.floor((o - 1) / 2) || (o === 2 && k === 1);
      let col = C.ink2;
      if (o === 2) { if (k === 1) { col = pi < piN ? PV : C.ink2; pi++; } else { col = si < sgN ? NC : C.ink2; si++; } }
      else if (o === 3) { if (k !== 1) { col = pi < piN ? PV : C.ink2; pi++; } else { col = si < sgN ? NC : C.ink2; si++; } }
      else { col = si < sgN ? NC : C.ink2; si++; }
      s += ln(A[0] + px * off, A[1] + py * off, B[0] + px * off, B[1] + py * off, col, 5, u); } });
  ['Ha', 'Hb', 'Hc', 'Hd'].forEach(k => s += atomC(...WA[k], 22, 'H', HC, 18));
  ['C1', 'C2', 'C3', 'C4'].forEach((k, i) => { s += atomC(...WA[k], 32, 'C', NC, 26) + T(WA[k][0] + (i < 2 ? 0 : 52), WA[k][1] + (i < 2 ? 62 : 8), String(i + 1), { fs: 18, c: C.ink, ls: 0 });
    const h = io(t, i < 2 ? T0('W2') + 0.5 : T0('W3') + 0.5, 0.3); if (h > 0.01) s += G(`<rect x="${WA[k][0] - (i < 2 ? 34 : -70)}" y="${WA[k][1] - (i < 2 ? 82 : 20)}" width="68" height="38" rx="9" fill="${NC}"/>` + T(WA[k][0] - (i < 2 ? 0 : -104), WA[k][1] - (i < 2 ? 56 : -6), i < 2 ? 'sp²' : 'sp', { fs: 20, c: '#fff', ls: 0 }), h); });
  s += G(`<rect x="560" y="150" width="190" height="120" rx="14" fill="${C.soft}"/>` + T(655, 196, 'σ BONDS', { fs: 16 }) + T(655, 250, String(sgN), { fs: 46, c: NC, ls: 0 }), io(t, tW4 - 0.2, 0.3));
  s += G(`<rect x="560" y="300" width="190" height="120" rx="14" fill="${C.soft}"/>` + T(655, 346, 'π BONDS', { fs: 16 }) + T(655, 400, String(piN), { fs: 46, c: PV, ls: 0 }), io(t, tW5 - 0.2, 0.3));
  put($('#wS'), s);
  const WT = [[0, 'BUILD IT BOND BY BOND'], [T0('W2'), 'DOUBLE BOND · sp²'], [T0('W3'), 'TRIPLE BOND · sp'], [tW4, 'COUNT σ'], [tW5, 'COUNT π'], [T0('W6'), 'FLAT + STRAIGHT']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A double bond is two single bonds: <b>2 × 348 = 696</b>', right: 'One σ plus one weaker π: <b>397 + 284 = 681</b>' });
const bar = (x, y, h, col, lab) => `<rect x="${x}" y="${f1(y - h)}" width="110" height="${f1(h)}" rx="8" fill="${tint(col, 0.22)}" stroke="${col}" stroke-width="2.5"/>` + T(x + 55, y - h / 2 + 7, lab, { fs: 18, c: col === C.ink2 ? C.ink : col, ls: 0 });
const sc = 0.25;
$('#tS').innerHTML = `<g id="tM1">${bar(80, 236, 348 * sc, C.ink2, 'σ 348') + bar(80, 236 - 348 * sc, 348 * sc, C.ink2, 'σ 348') + T(135, 50, '696?', { fs: 22, c: C.red, ls: 0 })}</g>` +
  `<g id="tM2">${bar(380, 236, 397 * sc, C.ink2, 'σ 397') + bar(380, 236 - 397 * sc, 284 * sc, PV, 'π 284') + T(435, 56, '681', { fs: 26, c: C.ok, ls: 0 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M50 60 L220 230 M220 60 L50 230'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'Hybridisation of each carbon, counting σ and π bonds, comparing bond lengths' });
const mf = s => `\\mathrm{${s}}`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: `Hybridisation of each carbon, left to right, in ${K(mf('CH_2{=}CH{-}CH_2{-}C{\\equiv}N'))}?`, qW: 900,
  opts: [K('sp^2,\\ sp^2,\\ sp^3,\\ sp'), K('sp^2,\\ sp^2,\\ sp^3,\\ sp^3'), K('sp^3,\\ sp^2,\\ sp^3,\\ sp'), K('sp^2,\\ sp,\\ sp^3,\\ sp')], right: 0, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{C{=}C}: 3\\sigma \\rightarrow ${Y_('sp^2')},\\ ${Y_('sp^2')}`)], [K(`\\mathrm{CH_2}: 4\\sigma \\rightarrow ${Y_('sp^3')}`)], [K(`\\mathrm{C{\\equiv}N}: 2\\sigma \\rightarrow ${Y_('sp')}`)], [K(`\\text{B: } \\mathrm{C{\\equiv}N}\\ \\text{is not } sp^3`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'traps')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Tetravalence and Shapes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Tetravalent</b>: 4 outer electrons, so carbon makes 4 bonds',
    '<b>sp³</b> 109.5° tetrahedral · <b>sp²</b> 120° planar · <b>sp</b> 180° linear',
    '<b>s character</b> 25%, 33%, 50%: more s, shorter, stronger bonds',
    '<b>C-C</b> 154 pm · <b>C=C</b> 134 pm · <b>C≡C</b> 120 pm',
    '<b>π bond</b>: sideways p overlap, no rotation, most reactive spot',
    '<b>Count</b>: every bond has 1 σ · double adds 1 π · triple adds 2 π'] });
const YQ = ['Why is carbon called tetravalent?', 'Which is shorter, the carbon bond in ethene or in ethyne?', "Why can't the two ends of a double bond spin?"];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 79', topic: 'A big molecule as one zigzag? Structural Representations', y: 764 });

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
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'shapes') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'every') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'up') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'shape') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, tTv - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, tEv[0], 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const b2 = io(t, tB1 + 0.3, 0.4) * (1 - io(t, tB3, 0.4)), b1 = io(t, tB3, 0.4), b0 = 1 - io(t, tB1 + 0.3, 0.4);
    put($('#bS'), G(benchC(t), b0) + G(benchB(t, 3), b2) + G(benchB(t, 2), b1));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · CARBON' : t < tB3 ? 'MOLECULE BENCH · 1 s + 2 p' : 'MOLECULE BENCH · 1 s + 1 p');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    const k2 = io(t, tSp2 - 0.2, 0.4) * (1 - io(t, tSp - 0.2, 0.4)), k1 = io(t, tSp - 0.2, 0.4), k0 = 1 - io(t, tSp2 - 0.2, 0.4);
    put($('#shS'), G(shapeS(t, 'tet'), k0) + G(shapeS(t, 'tri'), k2) + G(shapeS(t, 'lin'), k1));
    M.setT($('#shL'), t < tOutc ? 'SHAPE · BEFORE THE MIX' : 'SHAPE');
    const ca = io(t, tS1 + 0.8, 0.4), cp = io(t, tOutc, 0.3), al = io(t, tB4 - 0.1, 0.4);
    put($('#chS'), G(G(G(charS(4, cp > 0.5 ? '25%' : '?'), b0) + G(charS(3, '33%'), b2) + G(charS(2, '50%'), b1), 1 - al) + G(charAll(t), al), ca));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    let s = ''; const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    DP.forEach((f, i) => { const a = io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1); if (a > 0.01) s += G(f(t), a); });
    put($('#dS'), s); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · LINK ' + (ki + 1)); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const z = OUT('C4'), back = T0('C5') + 0.05, out = OUT('T1');
    const inC = t < tC4 + 0.2 || t >= back - 0.1;
    M.vis($('#cl'), t, t < back ? tC1 + 0.05 : back, t < back ? z : out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, t < back ? tC1 + 0.3 : back + 0.1, t < back ? z : out, { dx: 60, dy: 0, ...o });
    if (inC) { put($('#cS1'), ethane(t)); put($('#cS2'), ethene(t)); }
    M.setT($('#cpL'), t < tTw ? 'ETHENE · σ + π' : t < tC6 ? 'ETHENE · TWIST IT' : 'ETHENE · π CLOUD OUT IN THE OPEN');
  }
  M.vis($('#th1'), t, tC4 + 0.05, T0('C5') - 0.1, { dy: 36, outDur: 0.3, ody: -16 });
  if (cOn) th1(t, { tin: tC4, tOpts: wt('C4', 'spin') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'twist') });

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Count') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'know') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'bonds'), 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'worked') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'flat') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'worked') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, tW1b, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'double') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'sigma') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'twice') - 0.2, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'Three') - 0.1, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'each'), tCount, tAns });
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
