// PUC Chemistry Ep 90: properties of alkanes (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal (element in play), H ink, Cl green, O violet, unpaired electron / radical orange, van der Waals pull and heat gold, water blue
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', CL = '#3C9A5F', OC = '#7A4FE0', WB = '#2F6FEB';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const col = (c, s) => `\\textcolor{${c}}{${s}}`, Cn = s => col(NC, s), Gd = s => col(GC, s), Rd = col(EC, '\\bullet');

Object.assign(M.IC, {
  flame: ['M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1.5 1 2.5 2.5 3 4', 'M12 21a2 2 0 0 1-2-2c0-1.5 2-3 2-3s2 1.5 2 3a2 2 0 0 1-2 2Z'],
  candle: ['M9 10h6v11H9z', 'M12 10V7', 'M12 2c1.2 1.6 1.2 2.6 0 4c-1.2-1.4-1.2-2.4 0-4Z'],
  drop: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
});

/* ---------- shared drawing ---------- */
const f1 = v => (+v).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}">${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
const tint = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const lerp = M.lerp, L2 = (p, q, u) => [lerp(p[0], q[0], u), lerp(p[1], q[1], u)];
const atom = (x, y, r, lab, c = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${c}"/>` + (lab ? T(x, y + (fs || r * 0.78) * 0.36, lab, { ff: 'Poppins', fw: 700, fs: fs || r * 0.78, c: '#fff', ls: 0 }) : '');
const bond = (p, q, a = 1, o = 0, w = 6, c = C.ink2) => { if (a < 0.01) return ''; const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l * o, ny = dx / l * o;
  return `<line x1="${f1(p[0] + nx)}" y1="${f1(p[1] + ny)}" x2="${f1(q[0] + nx)}" y2="${f1(q[1] + ny)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${a < 1 ? ` opacity="${a.toFixed(3)}"` : ''}/>`; };
const dbl = (p, q, a = 1) => bond(p, q, a, -7) + bond(p, q, a, 7);
const ed = (x, y, a = 1) => a < 0.01 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="${EC}" stroke="#fff" stroke-width="2"${a < 1 ? ` opacity="${a.toFixed(3)}"` : ''}/>`;
// curved electron arrow (fishhook = half head for one electron), drawn on from p to q
function arrowC(p, q, bend, u, c = EC, full = false) {
  if (u <= 0.01) return '';
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1, cx = mx - dy / l * bend, cy = my + dx / l * bend;
  const N = 30, n = Math.max(1, Math.round(N * u)); let d = '';
  for (let i = 0; i <= n; i++) { const s = i / N, a = (1 - s) * (1 - s), b = 2 * (1 - s) * s, e = s * s; d += (i ? 'L' : 'M') + f1(a * p[0] + b * cx + e * q[0]) + ' ' + f1(a * p[1] + b * cy + e * q[1]); }
  let s = `<path d="${d}" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
  if (u > 0.97) { const tx = q[0] - cx, ty = q[1] - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl, px = -uy, py = ux;
    s += `<polygon points="${f1(q[0])},${f1(q[1])} ${f1(q[0] - ux * 18 + px * 10)},${f1(q[1] - uy * 18 + py * 10)} ${f1(q[0] - ux * 14)},${f1(q[1] - uy * 14)}${full ? ` ${f1(q[0] - ux * 18 - px * 10)},${f1(q[1] - uy * 18 - py * 10)}` : ''}" fill="${c}"/>`; }
  return s;
}
const ang = (p, a, r) => [p[0] + r * Math.cos(a * Math.PI / 180), p[1] + r * Math.sin(a * Math.PI / 180)];
// methyl / methane: carbon at p with H at the given angles
const CH = (p, angs, a = 1, r = 64) => G(angs.map(g => bond(p, ang(p, g, r))).join('') + atom(p[0], p[1], 28, 'C', NC, 20) + angs.map(g => { const h = ang(p, g, r); return atom(h[0], h[1], 17, 'H', HC, 14); }).join(''), a);
const ARR = (x1, y, x2, a = 1) => G(`<line x1="${x1}" y1="${y}" x2="${x2 - 12}" y2="${y}" stroke="${C.ink2}" stroke-width="4" stroke-linecap="round"/><polygon points="${x2},${y} ${x2 - 16},${y - 8} ${x2 - 16},${y + 8}" fill="${C.ink2}"/>`, a);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB3 = T0('B3'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['flame', 'Stove gas', 'BURNS IN THE KITCHEN', 'stove', 'GAS', 'gas'], ['candle', 'Candle', 'BURNS FOR LIGHT', 'candle', 'SOLID', 'solid'], ['drop', 'Petrol', 'BURNS IN ENGINES', 'petrol', 'LIQUID', 'liquid']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const tJa = JOBS.map(j => wt('H2', j[5]));
const KIT = [['flame', 'Gas floats away', 'floats', 'H3'], ['candle', 'Wax stays solid', 'solid', 'H3']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: noodle rule + growing chains ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Short noodles slip apart', 'SLIP', 'P2', 'Short'], ['Long noodles tangle', 'STICK', 'P2', 'Long'], ['Non-polar: weak van der Waals pulls', 'WEAK PULLS', 'P3', 'van'], ['Longer chain, more contact', 'MORE PULL', 'P4', 'longer'], ['More heat to pull them apart', 'BP RISES', 'P5', 'boiling']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tGrow0 = wt('P4', 'longer'), tGrow1 = T1('P4') + 0.2, tVdw = wt('P3', 'van'), tSt = [wt('P6', 'gases'), wt('P6', 'liquids'), wt('P6', 'solids')];
function drawP(t) {
  const nf = 2 + 3 * io(t, wt('P2', 'Long'), 1.2) + 3 * io(t, tGrow0, tGrow1 - tGrow0), n = Math.ceil(nf - 0.001), part = nf - Math.floor(nf);
  const pos = (i, row) => [130 + i * 75, (row ? 278 : 168) + (i % 2 ? 26 : 0)];
  let s = '', vd = io(t, tVdw, 0.5);
  for (let i = 0; i < n; i++) { const a = i < Math.floor(nf) ? 1 : part;
    s += G(`<line x1="${pos(i, 0)[0]}" y1="${pos(i, 0)[1] + 26}" x2="${pos(i, 1)[0]}" y2="${pos(i, 1)[1] - 26}" stroke="${GC}" stroke-width="3" stroke-dasharray="5 7"/>`, a * vd);
    for (const r of [0, 1]) { if (i) s += bond(pos(i - 1, r), pos(i, r), a); } }
  for (let i = 0; i < n; i++) { const a = i < Math.floor(nf) ? 1 : part; for (const r of [0, 1]) { const p = pos(i, r); s += G(atom(p[0], p[1], 24, 'C', NC, 18), a); } }
  const k = Math.round(nf);
  s += T(36, 390, `C${k} CHAIN`, { fs: 22, c: C.ink, a: 'start', ls: 0.6 }) + G(T(748, 390, `${k} CONTACTS`, { fs: 22, c: GC, a: 'end', ls: 0.6 }), vd);
  // boiling point meter
  const bw = 110 + (k - 2) * 70, ma = io(t, wt('P5', 'boiling') - 0.2, 0.4);
  s += G(T(36, 432, 'BOILING POINT', { fs: 15, a: 'start' }) + `<rect x="180" y="416" width="568" height="22" rx="11" fill="${C.soft}"/><rect x="180" y="416" width="${f1(Math.min(568, bw * (0.3 + 0.7 * io(t, wt('P5', 'boiling'), 0.8))))}" height="22" rx="11" fill="${GC}"/>`, ma);
  // states strip
  const SG = [[36, 236, 'C1-C4', 'GAS'], [272, 272, 'C5-C17', 'LIQUID'], [560, 188, 'C18 +', 'SOLID']];
  SG.forEach(([x, w, r, nm], i) => { const a = io(t, tSt[i] - 0.15, 0.3);
    s += G(`<rect x="${x}" y="468" width="${w}" height="76" rx="12" fill="${tint(NC, 0.14)}" stroke="${NC}" stroke-width="2.5"/>` + T(x + w / 2, 500, r, { fs: 22, c: C.ink, ls: 0 }) + T(x + w / 2, 530, nm, { fs: 15, c: NC }), a); });
  put($('#pS'), s);
  M.setT(ptag, t < wt('P2', 'Long') ? 'SHORT CHAINS · SLIP' : t < tVdw ? 'LONG CHAINS · STICK' : t < tGrow0 ? 'WEAK PULLS · VAN DER WAALS' : t < T0('P6') ? 'LONGER · MORE CONTACT' : 'STATE AT 298 K');
}

/* ---------- S: branching on the bench ---------- */
const ST = [
  [[212, 326], [302, 274], [392, 326], [482, 274], [572, 326]],
  [[257, 330], [347, 278], [437, 330], [527, 278], [347, 176]],
  [[292, 290], [392, 290], [492, 290], [392, 390], [392, 190]]];
const BD = [[[0, 1], [1, 2], [2, 3], [3, 4]], [[0, 1], [1, 2], [2, 3], [1, 4]], [[0, 1], [1, 2], [1, 3], [1, 4]]];
const NM = [['PENTANE', '309.1 K'], ['2-METHYLBUTANE', '300.9 K'], ['2,2-DIMETHYLPROPANE', '282.5 K']];
const tM1 = wt('S4', 'Move'), tM2 = wt('S5', 'Move'), tS3 = T0('S3'), tS6 = T0('S6');
function iso(t) {
  const u1 = io(t, tM1, 1.2), u2 = io(t, tM2, 1.2), k = u2 > 0 ? 2 : u1 > 0 ? 1 : 0;
  const P = ST[0].map((p, i) => L2(L2(p, ST[1][i], u1), ST[2][i], u2));
  let s = P.map(p => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="62" fill="${tint(NC, 0.07)}"/>`).join('');
  const bset = (b, a) => b.map(([i, j]) => bond(P[i], P[j], a)).join('');
  if (u1 < 1) s += bset(BD[0].filter((_, i) => i === 3), 1 - u1); if (u1 > 0 && u2 < 1) s += bset(BD[1].filter((_, i) => i === 3), u1 * (1 - u2));
  if (u2 < 1) s += bset([[2, 3]], 1 - u2); if (u2 > 0) s += bset([[1, 3], [1, 4]], u2);
  s += bset([[0, 1], [1, 2]], 1);
  s += P.map(p => atom(p[0], p[1], 28, 'C', NC, 20)).join('');
  const nmA = k === 0 ? 1 : k === 1 ? io(t, tM1 + 0.8, 0.3) : io(t, tM2 + 0.8, 0.3), kk = k === 1 && u1 < 0.7 ? 0 : k === 2 && u2 < 0.7 ? 1 : k;
  s += G(T(392, 482, NM[kk][0], { ff: 'Poppins', fw: 700, fs: 30, c: C.ink, ls: 0.4 }) + T(392, 520, 'BOILS AT ' + NM[kk][1], { fs: 20, c: GC }), kk === k ? nmA : 1);
  s += T(392, 120, 'C SKELETON · H ATOMS NOT SHOWN', { fs: 15 });
  return s;
}
function beaker(t) {
  const u = io(t, T0('B1') + 0.6, 2.2);
  let s = `<rect x="196" y="${f1(170)}" width="392" height="330" rx="12" fill="${tint(WB, 0.09)}"/>` + `<rect x="196" y="170" width="392" height="${f1(84 * u)}" fill="${tint(GC, 0.16)}"/>`;
  s += `<path d="M192 110 V480 a20 20 0 0 0 20 20 H572 a20 20 0 0 0 20 -20 V110" stroke="${C.ink2}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const A0 = [[250, 420], [330, 330], [420, 450], [500, 360], [270, 300], [460, 280]], A1 = [[240, 212], [300, 200], [360, 214], [420, 200], [480, 212], [540, 200]];
  A0.forEach((p, i) => { const q = L2(p, A1[i], M.io(M.clamp((u - i * 0.05) / 0.75))); s += `<path d="M${f1(q[0] - 22)} ${f1(q[1] + 6)} l11 -12 l11 12 l11 -12" stroke="${GC}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; });
  [[240, 300], [330, 390], [420, 310], [510, 420], [300, 460], [480, 470], [380, 250]].forEach(([x, y]) => { if (y < 170 + 84 * u + 20) return; s += atom(x, y, 11, '', OC) + atom(x - 13, y + 11, 6, '', HC) + atom(x + 13, y + 11, 6, '', HC); });
  s += G(T(620, 214, 'ALKANE', { fs: 18, c: GC, a: 'start' }) + T(620, 238, 'NON-POLAR', { fs: 14, a: 'start' }), u) + T(620, 400, 'WATER', { fs: 18, c: WB, a: 'start' }) + T(620, 424, 'POLAR', { fs: 14, a: 'start' });
  s += G(T(392, 548, 'LIKE DISSOLVES LIKE · THEY STAY APART', { fs: 17, c: C.ink }), io(t, wt('B2', 'Like'), 0.4));
  return s;
}
const zig = (x0, y0, n, dx = 70) => { const P = []; for (let i = 0; i < n; i++) P.push([x0 + i * dx, y0 + (i % 2 ? -22 : 22)]); return P; };
function pairB(t) {
  const hx = zig(140, 200, 6), dm = [[230, 420], [320, 400], [410, 420], [500, 400], [320, 320], [320, 480]];
  let s = hx.slice(1).map((p, i) => bond(hx[i], p)).join('') + hx.map(p => atom(p[0], p[1], 24, 'C', NC, 18)).join('');
  s += [[0, 1], [1, 2], [2, 3], [1, 4], [1, 5]].map(([i, j]) => bond(dm[i], dm[j])).join('') + dm.map(p => atom(p[0], p[1], 24, 'C', NC, 18)).join('');
  s += T(392, 120, 'SIX CARBONS EACH · C₆H₁₄', { fs: 16 }) + T(600, 208, 'HEXANE', { fs: 20, c: C.ink, a: 'start' }) + T(570, 418, '2,2-DIMETHYL', { fs: 20, c: C.ink, a: 'start' }) + T(570, 444, 'BUTANE', { fs: 20, c: C.ink, a: 'start' });
  return s;
}
const tB = [[0, 309.1, 'pentane', 'S3'], [1, 300.9, '2-methylbutane', 'S4'], [2, 282.5, '2,2-dimethylpropane', 'S5']];
function bars(t) {
  let s = `<line x1="300" y1="70" x2="300" y2="246" stroke="${C.line}" stroke-width="2"/>` + T(300, 262, '250 K', { fs: 13 });
  tB.forEach(([i, v, n, id]) => { const a = io(t, i ? (i === 1 ? tM1 + 0.6 : tM2 + 0.6) : tS3 + 0.4, 0.3), g = io(t, i ? (i === 1 ? tM1 + 0.8 : tM2 + 0.8) : tS3 + 0.6, 0.8), y = 84 + i * 56;
    s += G(T(280, y + 26, n, { ff: 'Poppins', fw: 600, fs: 20, c: C.ink, a: 'end', ls: 0 }) + `<rect x="300" y="${y}" width="${f1((v - 250) * 5.6 * g)}" height="38" rx="8" fill="${tint(GC, 0.25)}" stroke="${GC}" stroke-width="2.5"/>` + G(T(300 + (v - 250) * 5.6 + 14, y + 27, v.toFixed(1) + ' K', { fs: 22, c: GC, a: 'start', ls: 0 }), g), a); });
  return s;
}
function contact(t) {
  const c = io(t, tS6, 0.4);
  let s = G(T(392, 140, 'C₅H₁₂', { ff: 'Poppins', fw: 700, fs: 58, c: C.ink, ls: 0 }) + T(392, 196, '5 × 12 u + 12 × 1 u = 72 u', { fs: 22, c: C.ink, ls: 0 }) + T(392, 232, 'ALL THREE · SAME MASS', { fs: 15 }), io(t, T0('S2') + 0.3, 0.4) * (1 - c));
  if (c > 0.01) {
    const a = zig(70, 120, 5, 62), b = zig(70, 196, 5, 62);
    let q = [a, b].map(P => P.slice(1).map((p, i) => bond(P[i], p, 1, 0, 4)).join('') + P.map(p => atom(p[0], p[1], 15, '', NC)).join('')).join('');
    q += a.map((p, i) => `<line x1="${p[0]}" y1="${p[1] + 15}" x2="${b[i][0]}" y2="${b[i][1] - 15}" stroke="${GC}" stroke-width="3" stroke-dasharray="4 6"/>`).join('');
    const ball = (cx) => { const P = [[cx, 160], [cx - 40, 160], [cx + 40, 160], [cx, 120], [cx, 200]]; return [[0, 1], [0, 2], [0, 3], [0, 4]].map(([i, j]) => bond(P[i], P[j], 1, 0, 4)).join('') + P.map(p => atom(p[0], p[1], 15, '', NC)).join(''); };
    q += ball(500) + ball(640) + `<line x1="555" y1="160" x2="585" y2="160" stroke="${GC}" stroke-width="3" stroke-dasharray="4 6"/>`;
    q += T(194, 250, 'CHAIN + CHAIN · MANY', { fs: 15, c: C.ink }) + T(570, 250, 'BALL + BALL · FEW', { fs: 15, c: C.ink });
    s += G(q, c);
  }
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'SAME FORMULA'], [tS3, 'STRAIGHT CHAIN'], [tM1, 'ONE BRANCH'], [tM2, 'ALMOST A BALL'], [tS6, 'LESS CONTACT'], [tB1, 'ALKANE + WATER'], [tB3, 'CHAIN OR BUNCH?']];
const th1 = PUC.think($('#th1'), { q: 'Which one boils at a <span style="color:#B7791F">higher temperature</span>?', opts: ['Hexane', '2,2-Dimethylbutane'], right: 0, why: '<b>Hexane</b>: long chain, more contact, stronger pull, <b style="color:#B7791F">higher boiling point</b>.' });

/* ---------- D: free radical halogenation ---------- */
const LK = [['LINK 1', 'Initiation: light splits Cl₂', 'Cl•', 'D2'], ['LINK 2', 'Cl• pulls H off methane', 'HCl', 'D3'], ['LINK 3', '•CH₃ grabs Cl from Cl₂', 'CH₃Cl', 'D4'], ['LINK 4', 'Propagation: the chain repeats', 'LOOP', 'D5'], ['LINK 5', 'Termination: radicals pair up', 'STOP', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const clA = (p, lab = 'Cl') => atom(p[0], p[1], 30, lab, CL, 21);
const DP = [
  t => { // initiation
    const lt = io(t, wt('D2', 'Light'), 0.5), ar = io(t, wt('D2', 'splits') + 0.1, 0.6), sp = io(t, wt('D2', 'keeps') - 0.3, 0.9), rd = io(t, wt('D2', 'free'), 0.4);
    const a = L2([300, 300], [196, 300], sp), b = L2([484, 300], [588, 300], sp);
    let s = G(`<path d="M392 110 l-18 30 h30 l-18 30 l-12 -6 M392 170 l6 22" stroke="${GC}" stroke-width="4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` + T(430, 140, 'LIGHT (hν)', { fs: 18, c: GC, a: 'start' }), lt);
    s += bond(a, b, 1 - sp) + clA(a) + clA(b);
    s += ed(lerp(380, a[0] + 42, sp), 300) + ed(lerp(404, b[0] - 42, sp), 300);
    s += G(arrowC([386, 286], [318, 266], -36, ar) + arrowC([398, 286], [466, 266], 36, ar), 1 - sp);
    s += G(T(196, 384, 'Cl•', { fs: 26, c: CL, ls: 0 }) + T(588, 384, 'Cl•', { fs: 26, c: CL, ls: 0 }) + T(392, 470, 'ONE UNPAIRED e⁻ EACH = FREE RADICAL', { fs: 18, c: EC }), rd);
    return s + T(392, 536, 'Cl₂  →  2 Cl•', { fs: 24, c: C.ink, ls: 0 });
  },
  t => { // Cl. + CH4 -> HCl + .CH3
    const ar = io(t, wt('D3', 'pulls'), 0.6), mv = io(t, wt('D3', 'makes') - 0.2, 0.9), rd = io(t, wt('D3', 'methyl'), 0.4);
    const c = [260, 300], h = L2([326, 300], [466, 300], mv), cl = L2([600, 300], [574, 300], mv);
    let s = [[-90], [180], [90]].map(([g]) => bond(c, ang(c, g, 66))).join('') + bond(c, h, 1 - mv) + bond(h, cl, mv);
    s += atom(c[0], c[1], 28, 'C', NC, 20) + [-90, 180, 90].map(g => { const p = ang(c, g, 66); return atom(p[0], p[1], 17, 'H', HC, 14); }).join('') + atom(h[0], h[1], 17, 'H', HC, 14) + clA(cl);
    s += ed(lerp(560, 528, mv), 300) + ed(lerp(304, 510, mv), 300) + ed(lerp(290, 300, mv), lerp(300, 300, mv));
    s += G(arrowC([560, 284], [430, 284], 34, ar) + arrowC([300, 316], [276, 330], 22, ar), 1 - mv);
    s += G(T(260, 420, '•CH₃', { fs: 26, c: NC, ls: 0 }) + T(260, 452, 'METHYL RADICAL', { fs: 15, c: EC }) + T(520, 380, 'HCl', { fs: 26, c: CL, ls: 0 }), rd);
    return s + T(392, 536, 'CH₄ + Cl•  →  •CH₃ + HCl', { fs: 24, c: C.ink, ls: 0 });
  },
  t => { // .CH3 + Cl2 -> CH3Cl + Cl.
    const ar = io(t, wt('D4', 'grabs'), 0.6), mv = io(t, wt('D4', 'Chloromethane') - 0.2, 0.9), rd = io(t, wt('D4', 'new'), 0.4);
    const c = [200, 300], c1 = L2([460, 300], [300, 300], mv), c2 = L2([560, 300], [640, 300], mv);
    let s = [-90, 180, 90].map(g => bond(c, ang(c, g, 66))).join('') + bond(c1, c2, 1 - mv) + bond(c, c1, mv);
    s += atom(c[0], c[1], 28, 'C', NC, 20) + [-90, 180, 90].map(g => { const p = ang(c, g, 66); return atom(p[0], p[1], 17, 'H', HC, 14); }).join('') + clA(c1) + clA(c2);
    s += ed(lerp(240, 244, mv), 300) + ed(lerp(498, 258, mv), lerp(300, 300, mv)) + ed(lerp(522, c2[0] - 42, mv), 300);
    s += G(arrowC([240, 286], [420, 280], 40, ar) + arrowC([510, 316], [560, 334], -24, ar), 1 - mv);
    s += G(T(250, 420, 'CH₃Cl', { fs: 26, c: C.ink, ls: 0 }) + T(640, 384, 'Cl•', { fs: 26, c: CL, ls: 0 }) + T(640, 416, 'NEW RADICAL', { fs: 15, c: EC }), rd);
    return s + T(392, 536, '•CH₃ + Cl₂  →  CH₃Cl + Cl•', { fs: 24, c: C.ink, ls: 0 });
  },
  t => { // chain loop
    const u = M.clamp((t - tLk[3]) / Math.max(1, T1('D5') - tLk[3])), c = [392, 290], R = 150;
    const arc = (a1, a2) => { const p1 = ang(c, a1, R), p2 = ang(c, a2, R), tg = (a2 + 90) * Math.PI / 180, ux = Math.cos(tg), uy = Math.sin(tg), px = -uy, py = ux;
      return `<path d="M${f1(p1[0])} ${f1(p1[1])} A${R} ${R} 0 0 1 ${f1(p2[0])} ${f1(p2[1])}" fill="none" stroke="${NC}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(p2[0] + ux * 6)},${f1(p2[1] + uy * 6)} ${f1(p2[0] - ux * 14 + px * 9)},${f1(p2[1] - uy * 14 + py * 9)} ${f1(p2[0] - ux * 14 - px * 9)},${f1(p2[1] - uy * 14 - py * 9)}" fill="${NC}"/>`; };
    let s = arc(-62, 62) + arc(118, 242);
    s += `<rect x="342" y="112" width="100" height="56" rx="12" fill="#fff" stroke="${CL}" stroke-width="3"/>` + T(392, 149, 'Cl•', { fs: 26, c: CL, ls: 0 }) + `<rect x="337" y="412" width="110" height="56" rx="12" fill="#fff" stroke="${NC}" stroke-width="3"/>` + T(392, 449, '•CH₃', { fs: 26, c: NC, ls: 0 });
    s += T(570, 280, '+ CH₄', { fs: 20, c: C.ink, a: 'start', ls: 0 }) + T(570, 308, '→ HCl', { fs: 20, c: CL, a: 'start', ls: 0 }) + T(214, 280, '+ Cl₂', { fs: 20, c: C.ink, a: 'end', ls: 0 }) + T(214, 308, '→ CH₃Cl', { fs: 20, c: C.ink, a: 'end', ls: 0 });
    const p = ang(c, -90 + u * 720, R); s += ed(p[0], p[1]);
    return s + T(392, 296, 'PROPAGATION', { fs: 18, c: C.mute }) + T(392, 536, 'ONE SPARK · MANY MOLECULES', { fs: 20, c: C.ink });
  },
  t => { // termination
    const m = io(t, wt('D6', 'meet') - 0.2, 1), e = io(t, wt('D6', 'ethane') - 0.3, 1);
    const a = [lerp(180, 330, e), 200], b = [lerp(604, 454, e), 200];
    let s = [-90, 180, 90].map(g => bond(a, ang(a, g, 60))).join('') + [-90, 0, 90].map(g => bond(b, ang(b, g, 60))).join('') + bond(a, b, e);
    s += atom(a[0], a[1], 28, 'C', NC, 20) + atom(b[0], b[1], 28, 'C', NC, 20) + [-90, 180, 90].map(g => { const p = ang(a, g, 60); return atom(p[0], p[1], 16, 'H', HC, 13); }).join('') + [-90, 0, 90].map(g => { const p = ang(b, g, 60); return atom(p[0], p[1], 16, 'H', HC, 13); }).join('');
    s += ed(lerp(a[0] + 40, 384, e), 200) + ed(lerp(b[0] - 40, 400, e), 200);
    const ca = [lerp(250, 346, m), 400], cb = [lerp(534, 438, m), 400];
    s += bond(ca, cb, m) + clA(ca) + clA(cb) + ed(lerp(ca[0] + 42, 384, m), 400) + ed(lerp(cb[0] - 42, 400, m), 400);
    s += G(T(392, 320, 'CH₃-CH₃ · ETHANE', { fs: 20, c: C.ink }), e) + G(T(392, 480, 'Cl₂', { fs: 22, c: CL, ls: 0 }), m);
    return s + T(392, 536, 'RADICALS PAIR · CHAIN STOPS', { fs: 20, c: C.ink });
  },
];
const dtg = tag($('#dr'));
const DLB = ['INITIATION', 'PROPAGATION 1', 'PROPAGATION 2', 'CHAIN REACTION', 'TERMINATION'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Cn('\\mathrm{CH_4}')} + \\mathrm{Cl_2} \\xrightarrow{h\\nu} ${Cn('\\mathrm{CH_3Cl}')} + \\mathrm{HCl}`);

/* ---------- W: combustion ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Cn('\\mathrm{CH_4}')} + 2\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\mathrm{H_2O}`)],
  [K(`\\Delta_c H = ${Gd('-890\\ \\text{kJ mol}^{-1}')}`)],
  [K(`n = \\dfrac{8\\ \\text{g}}{16\\ \\text{g mol}^{-1}} = 0.5\\ \\text{mol}`)],
  [K(`q = 0.5 \\times 890 = ${Gd('445\\ \\text{kJ}')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Lots of heat: great fuels'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
function drawW(t) {
  const r = io(t, T0('W2') + 0.2, 0.4), ar = io(t, wt('W2', 'gives'), 0.4), pr = io(t, wt('W2', 'gives') + 0.2, 0.8), ck = io(t, T1('W2'), 0.3);
  let s = '';
  const m = [120, 190]; s += G(CH(m, [-90, 0, 90, 180], 1, 54), r);
  [[252, 150], [252, 236]].forEach(([x, y]) => { s += G(dbl([x - 26, y], [x + 26, y]) + atom(x - 26, y, 22, 'O', OC, 16) + atom(x + 26, y, 22, 'O', OC, 16), r); });
  s += ARR(318, 194, 398, ar);
  const dx = (1 - pr) * -40;
  s += G(dbl([470 + dx, 140], [540 + dx, 140]) + dbl([540 + dx, 140], [610 + dx, 140]) + atom(470 + dx, 140, 22, 'O', OC, 16) + atom(540 + dx, 140, 26, 'C', NC, 18) + atom(610 + dx, 140, 22, 'O', OC, 16), pr);
  [[490, 240], [640, 240]].forEach(([x, y]) => { s += G(bond([x, y], [x - 34, y + 26]) + bond([x, y], [x + 34, y + 26]) + atom(x, y, 22, 'O', OC, 16) + atom(x - 34, y + 26, 14, 'H', HC, 12) + atom(x + 34, y + 26, 14, 'H', HC, 12), pr); });
  const BC = [['C', 1, 1], ['H', 4, 4], ['O', 4, 4]];
  BC.forEach(([e, l, rr], i) => { const x = 120 + i * 230; s += G(`<rect x="${x - 90}" y="306" width="180" height="56" rx="12" fill="${mix(C.soft, C.okBg, ck)}"/>` + T(x - 12, 342, `${e}  ${l} | ${rr}`, { fs: 24, c: C.ink, ls: 0 }) + G(`<path d="M${x + 50} 334 l8 8 l16 -16" stroke="${C.ok}" stroke-width="4" fill="none" stroke-linecap="round"/>`, ck), pr); });
  const h1 = io(t, T0('W3'), 0.4), h2 = io(t, T0('W4'), 0.4), h3 = io(t, T0('W5'), 0.4), cnt = Math.round(445 * io(t, T0('W5') + 0.3, 1.6));
  s += G(T(36, 420, '1 mol CH₄', { fs: 22, c: NC, a: 'start', ls: 0 }) + T(748, 420, '890 kJ OUT', { fs: 22, c: GC, a: 'end', ls: 0 }), h1);
  s += G(T(36, 462, '8 g ÷ 16 g/mol', { fs: 22, c: C.ink, a: 'start', ls: 0 }) + T(748, 462, '0.5 mol', { fs: 22, c: NC, a: 'end', ls: 0 }), h2);
  s += G(`<rect x="36" y="484" width="712" height="66" rx="14" fill="${tint(GC, 0.14)}"/>` + T(60, 528, 'HEAT GIVEN OUT', { fs: 18, c: GC, a: 'start' }) + T(724, 532, cnt + ' kJ', { fs: 34, c: GC, a: 'end', ls: 0 }), h3);
  put($('#wS'), s);
  const WT = [[0, 'BALANCE FIRST'], [T1('W2'), 'BALANCED'], [T0('W3'), 'HEAT PER MOLE'], [T0('W4'), 'GRAMS TO MOLES'], [T0('W5'), '445 kJ']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- C: more reactions ---------- */
const RX = [['CONTROLLED OXIDATION', `2${Cn('\\mathrm{CH_4}')} + \\mathrm{O_2} \\rightarrow 2\\mathrm{CH_3OH}`, 'Cu · 523 K · 100 atm', () => wt('C1', 'Methane')],
  ['ISOMERISATION', `${Cn('\\mathrm{CH_3(CH_2)_4CH_3}')} \\rightarrow \\text{2-methylpentane} + \\text{3-methylpentane}`, 'anhyd. AlCl₃ + HCl', () => T0('C2')],
  ['AROMATISATION', `${Cn('\\mathrm{C_6H_{14}}')} \\rightarrow \\mathrm{C_6H_6} + 4\\mathrm{H_2}`, 'V/Mo/Cr OXIDE ON Al₂O₃ · 773 K · 10-20 atm', () => T0('C3')],
  ['WITH STEAM', `${Cn('\\mathrm{CH_4}')} + \\mathrm{H_2O} \\rightarrow \\mathrm{CO} + 3\\mathrm{H_2}`, 'Ni · 1273 K', () => T0('C4')],
  ['PYROLYSIS', `${Cn('\\mathrm{C_{12}H_{26}}')} \\rightarrow \\mathrm{C_7H_{16}} + \\mathrm{C_5H_{10}} + \\text{others}`, 'Pt, Pd or Ni · 973 K', () => T0('C5')]];
$('#rxs').innerHTML = RX.map(([g, e, c], i) => `<div class="rx" id="rx${i}" style="top:${84 + i * 96}px"><div class="rt2">${g}</div><div class="re">${K(e)}</div><div class="rc">${c}</div></div>`).join('');
const tRx = RX.map(r => r[3]());

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Chlorinating methane gives <b>only CH₃Cl</b>', right: 'The chain goes on: a <b>mixture</b> of products' });
const CHN = ['CH₄', 'CH₃Cl', 'CH₂Cl₂', 'CHCl₃', 'CCl₄'];
$('#tS').innerHTML = CHN.map((f, i) => `<g id="tc${i}"><rect x="${30 + i * 146}" y="86" width="118" height="60" rx="12" fill="#fff" stroke="${i ? CL : NC}" stroke-width="3"/>${T(89 + i * 146, 124, f, { fs: 21, c: C.ink, ls: 0 })}${i ? `<line x1="${8 + i * 146}" y1="116" x2="${24 + i * 146}" y2="116" stroke="${C.ink2}" stroke-width="3"/>` : ''}</g>`).join('') +
  `<g id="tcW">${T(235, 186, 'ONLY THIS?', { fs: 18, c: C.red })}</g><g id="tcR">${T(526, 186, 'ALL OF THESE FORM', { fs: 18, c: C.ok })}</g>`;
const tTc = [wt('X2', 'chlorination'), wt('X2', 'only'), wt('X3', 'dichloromethane'), wt('X3', 'chloroform'), wt('X3', 'carbon')];
const where = PUC.where($('#wa'), { on: [], type: 'Free radical steps, boiling point order and reaction products' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'In the chlorination of methane in light, which step can form <b>ethane</b>?', qW: 820,
  opts: ['Initiation', 'First propagation', 'Second propagation', 'Termination'], right: 3, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`\\text{Init: } \\mathrm{Cl_2} \\rightarrow 2\\,\\mathrm{Cl}${Rd}`)], [K(`\\text{Prop: HCl, } \\mathrm{CH_3Cl} + \\text{radical}`)], [K(`\\text{Term: } ${Rd}${Cn('\\mathrm{CH_3}')} + ${Rd}${Cn('\\mathrm{CH_3}')}`)], [K(`\\rightarrow ${Cn('\\mathrm{CH_3{-}CH_3}')}\\ \\text{(D)}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'ethane')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Properties of Alkanes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Boiling point</b>: rises with chain length, falls with branching',
    '<b>At 298 K</b>: C1-C4 gases · C5-C17 liquids · C18 and above solids',
    '<b>Non-polar</b>: weak van der Waals pulls · do not mix with water',
    '<b>Halogenation</b>: initiation → propagation → termination (free radicals)',
    '<b>Products</b>: a mixture of CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄',
    '<b>Combustion</b>: CH₄ + 2O₂ → CO₂ + 2H₂O, ΔcH = -890 kJ/mol'] });
const YQ = ['Why does pentane boil higher than 2,2-dimethylpropane?', 'What does light do in the first step of halogenation?', 'How much heat does one mole of methane give on burning?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 91', topic: 'Change shape, break no bond? Conformations of Ethane', y: 764 });

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
  document.querySelectorAll('#so .sx').forEach(q => { if (q.offsetWidth > 400) q.style.fontSize = Math.floor(24 * 400 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(28 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.lk .lx').forEach(q => { const lv = q.parentNode.querySelector('.lv'), mx = 712 - 124 - lv.offsetWidth - 40; if (q.offsetWidth > mx) q.style.fontSize = Math.floor(25 * mx / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const k = q.parentNode.querySelector('.qk'), mx = 712 - 88 - k.offsetWidth - 48; if (q.offsetWidth > mx) q.style.fontSize = Math.floor(26 * mx / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rx .re').forEach(q => { const c = q.parentNode.querySelector('.rc'), mx = 1528 - 330 - c.offsetWidth - 48; if (q.offsetWidth > mx) q.style.fontSize = Math.floor(30 * mx / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, tJa[i] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'carbon') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'Both') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, tH5 - 0.05, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'decides') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : T0('P6'); const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B4');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const b0 = 1 - io(t, tB1 - 0.1, 0.4), b1 = io(t, tB1 - 0.1, 0.4) * (1 - io(t, tB3 - 0.1, 0.4)), b2 = io(t, tB3 - 0.1, 0.4);
    put($('#bS'), G(iso(t), b0) + G(beaker(t), b1) + G(pairB(t), b2));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · C₅H₁₂' : t < tB3 ? 'MOLECULE BENCH · ALKANE + WATER' : 'MOLECULE BENCH · C₆H₁₄');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), bars(t));
    put($('#chS'), contact(t)); M.setT($('#chL'), t < tS6 ? 'SAME FORMULA · SAME MASS' : 'CONTACT BETWEEN NEIGHBOURS');
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'Which') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Its') });

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    let s = ''; const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    DP.forEach((f, i) => { const a = io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1); if (a > 0.01) s += G(f(t), a); });
    put($('#dS'), s); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · LINK ' + (ki + 1)); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Alkanes') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'but') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'wakes') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'How') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, T0('W6') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'methane') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cw'), t, tC1 + 0.05, OUT('X1'), { dy: 36, ...o });
    RX.forEach((_, i) => { const el = $('#rx' + i); M.vis(el, t, tC1 + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis(el.querySelector('.rt2'), t, tC1 + 0.4 + i * 0.12, 1e9, POP);
      PUC.write(el.querySelector('.re'), t, tRx[i] + 0.1, 0.8); M.vis(el.querySelector('.rc'), t, tRx[i] + 0.8, 1e9, POP);
      const on = M.io((t - tRx[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tRx[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'chlorination') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'chain') - 0.1 });
    CHN.forEach((_, i) => attr($('#tc' + i), 'opacity', io(t, tTc[i] - 0.1, 0.3).toFixed(3)));
    attr($('#tcW'), 'opacity', (io(t, tTc[1], 0.3) * (1 - io(t, wt('X3', 'Wrong'), 0.3))).toFixed(3)); attr($('#tcR'), 'opacity', io(t, wt('X3', 'mixture') - 0.1, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Board') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'which'), tCount, tAns });
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
