// PUC Chemistry Ep 80: classification of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon skeleton teal / ink lines, functional group and heteroatoms orange, the added CH2 unit gold, ring classes: alicyclic ink, aromatic violet
const NC = C.ac, HC = C.ink, OX = '#C8461B', SC = '#B7791F', PV = '#7A4FE0';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Y_ = s => `\\textcolor{${NC}}{${s}}`, G_ = s => `\\textcolor{${SC}}{${s}}`, O_ = s => `\\textcolor{${OX}}{${s}}`;

/* ---------- shared drawing ---------- */
const f1 = v => (+v).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}">${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
const tint = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const dot = (x, y, r = 7, c = C.ink2) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}"/>`;
const atomC = (x, y, r, lab, col = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}"/>` + T(x, y + (fs || r * 0.8) * 0.36, lab, { ff: 'Poppins', fw: 700, fs: fs || r * 0.8, c: '#fff', ls: 0 });
const ln = (x1, y1, x2, y2, c = C.ink2, w = 6, u = 1) => u < 0.01 ? '' : `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x1 + (x2 - x1) * u)}" y2="${f1(y1 + (y2 - y1) * u)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const lerp = M.lerp;
const lab = (x, y, s, c = C.ink, fs = 40) => `<text x="${f1(x)}" y="${f1(y + fs * 0.36)}" font-family="Poppins" font-weight="700" font-size="${fs}" fill="${c}" text-anchor="middle">${s}</text>`;
const zig = (pts, t, t0, d = 0.3, c = C.ink2, w = 6) => pts.slice(1).map((p, i) => ln(pts[i][0], pts[i][1], p[0], p[1], c, w, io(t, t0 + i * d, d))).join('');
const badge = (x, y, s, c = SC, a = 1, w = 68) => G(`<rect x="${f1(x - w / 2)}" y="${f1(y - 19)}" width="${w}" height="38" rx="9" fill="${c}"/>` + T(x, y + 7, s, { fs: 19, c: '#fff', ls: 0 }), a);
const poly = (cx, cy, n, r, rot = -90) => { const P = []; for (let k = 0; k <= n; k++) { const a = (rot + k * 360 / n) * Math.PI / 180; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return P; };
// ring: n sides, doubles = edge indices drawn with an inner line, het = {i, s} heteroatom at vertex i
function ring(cx, cy, n, r, t, t0, o = {}) {
  const P = poly(cx, cy, n, r, o.rot ?? -90), d = 0.5 / n, w = o.w ?? 5;
  let s = '';
  for (let i = 0; i < n; i++) { const a = P[i], b = P[i + 1], u = io(t, t0 + i * d, d);
    let x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1];
    if (o.het && (o.het.i === i || o.het.i === (i + 1) % n)) { const sh = 0.24; if (o.het.i === i) { x1 = lerp(a[0], b[0], sh); y1 = lerp(a[1], b[1], sh); } else { x2 = lerp(b[0], a[0], sh); y2 = lerp(b[1], a[1], sh); } }
    s += ln(x1, y1, x2, y2, C.ink2, w, u);
    if ((o.dbl || []).includes(i)) { const ix = (cx - (a[0] + b[0]) / 2), iy = (cy - (a[1] + b[1]) / 2), L = Math.hypot(ix, iy), k = 10 / L;
      s += ln(lerp(a[0], b[0], 0.2) + ix * k, lerp(a[1], b[1], 0.2) + iy * k, lerp(a[0], b[0], 0.8) + ix * k, lerp(a[1], b[1], 0.8) + iy * k, C.ink2, w, io(t, t0 + 0.5 + i * d, d)); } }
  if (o.het) { const p = P[o.het.i]; s += G(lab(p[0], p[1] - 2, o.het.s, OX, o.fs ?? 26), io(t, t0 + 0.3, 0.2)); }
  return s;
}
const benz = (cx, cy, r, t, t0) => ring(cx, cy, 6, r, t, t0, { dbl: [0, 2, 4] });

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['book', 'Library', 'SHELVES BY SUBJECT', 'library', 'SUBJECT'], ['users', 'School', 'CLASSES BY AGE', 'school', 'AGE'], ['flask', 'Carbon compounds', 'INTO FAMILIES', 'families', 'FAMILY']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['package', 'Jars', 'jars', 'H3'], ['help', 'Colour?', 'colour', 'H4'], ['check', 'Both sour', 'sour', 'H4'], ['plus', 'Same shelf', 'shelf', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Millions of organic compounds', 'MILLIONS', 'P1', 'millions'], ['One family behaves alike', 'FAMILY', 'P2', 'family'], ['Q1: a chain or a ring?', 'SKELETON', 'P3', 'skeleton'], ['Q2: which special group?', 'GROUP', 'P4', 'special'], ['Functional group: sets behaviour', 'KEY', 'P5', 'functional']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tSort = wt('P2', 'family'), tP3 = wt('P3', 'skeleton'), tP4 = T0('P4'), tFg = wt('P5', 'functional');
// 18 small glyphs: kind 0 chain, 1 ring, 2 chain+OH
const GL = Array.from({ length: 18 }, (_, i) => { const r = Math.sin(i * 12.9898) * 43758.5453, fr = r - Math.floor(r); return { k: i % 3, x: 90 + (i % 6) * 120 + fr * 30, y: 120 + Math.floor(i / 6) * 110 + fr * 20 }; });
const glyph = (x, y, k) => k === 1 ? ring(x, y, 6, 22, 99, 0, { w: 3.5 }) : zig([[x - 30, y + 8], [x - 10, y - 8], [x + 10, y + 8], [x + 30, y - 8]], 99, 0, 0.1, C.ink2, 3.5) + (k === 2 ? lab(x + 46, y - 12, 'OH', OX, 16) : '');
function drawP(t) {
  let s = '';
  const a0 = 1 - io(t, tP3 - 0.3, 0.4);
  if (a0 > 0.01) {
    const so = io(t, tSort, 1.0);
    let A = '';
    const cnt = [0, 0, 0];
    GL.forEach((g, i) => { const j = cnt[g.k]++, tx = 130 + g.k * 262, ty = 150 + j * 62, x = lerp(g.x, tx, so), y = lerp(g.y, ty, so); A += G(glyph(x, y, g.k), io(t, tP1 + 0.3 + i * 0.06, 0.25)); });
    A += G(['CHAINS', 'RINGS', 'WITH OH'].map((n, i) => T(130 + i * 262, 540, n, { fs: 18, c: C.ink })).join(''), io(t, tSort + 0.8, 0.3));
    s += G(A, a0);
  }
  const a1 = io(t, tP3 - 0.2, 0.4) * (1 - io(t, tP4 - 0.3, 0.4));
  if (a1 > 0.01) s += G(zig([[90, 300], [170, 250], [250, 300], [330, 250]], t, tP3, 0.25) + T(210, 400, 'CHAIN', { fs: 22, c: C.ink }) + ring(580, 280, 6, 80, t, wt('P3', 'ring') - 0.2) + T(580, 400, 'RING', { fs: 22, c: C.ink }), a1);
  const a2 = io(t, tP4 - 0.2, 0.4);
  if (a2 > 0.01) { const fg = io(t, tFg, 0.4);
    s += G(zig([[160, 320], [270, 250], [380, 320]], t, tP4, 0.3) + ln(380, 320, 470, 262, C.ink2, 6, io(t, tP4 + 0.6, 0.3)) + G(lab(510, 246, 'OH', OX, 44), io(t, tP4 + 0.8, 0.3)) +
      G(`<rect x="452" y="196" width="118" height="96" rx="16" fill="none" stroke="${OX}" stroke-width="4"/>` + T(510, 340, 'FUNCTIONAL GROUP', { fs: 18, c: OX }), fg) + T(270, 420, 'ETHANOL', { fs: 20, c: C.ink }) + G(T(392, 500, 'IT DECIDES HOW THE COMPOUND REACTS', { fs: 17 }), io(t, wt('P5', 'decides'), 0.3)), a2); }
  put($('#pS'), s);
  M.setT(ptag, t < tSort ? 'TOO MANY ALONE' : t < tP3 - 0.3 ? 'SORT INTO FAMILIES' : t < tP4 ? 'Q1 · SKELETON' : 'Q2 · SPECIAL GROUP');
  M.setT($('#pwL'), t < tP3 - 0.3 ? 'MILLIONS OF COMPOUNDS' : 'MOLECULE BENCH');
}

/* ---------- S: family tree ---------- */
const tAc = wt('S2', 'acyclic'), tBr = wt('S3', 'branched'), tAl = wt('S3', 'aliphatic'), tCy = wt('S4', 'cyclic'), tQ2 = wt('S4', 'Question'), tAlc = wt('S5', 'alicyclic'), tAr = wt('S6', 'aromatic'), tBz = wt('S6', 'benzenoid'), tNb = T0('S6') + (T1('S6') - T0('S6')) * 0.8, tQ3 = T0('S7'), tHet = wt('S7', 'heterocyclic');
const ND = [['ORGANIC', 392, 96, tS1 + 0.3, NC], ['ACYCLIC', 150, 200, tAc, C.ink], ['CYCLIC', 540, 200, tCy, C.ink], ['ALICYCLIC', 420, 304, tAlc, C.ink], ['AROMATIC', 660, 304, tAr, PV], ['BENZENOID', 540, 408, tBz, PV], ['NON-BENZENOID', 668, 462, tNb, PV]];
const ED = [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5], [4, 6]];
function tree(t) {
  let s = '';
  const box = (n, x, y, c, a) => { const w = n.length * 12.5 + 30; return G(`<rect x="${f1(x - w / 2)}" y="${y - 22}" width="${f1(w)}" height="44" rx="10" fill="${c === NC ? NC : '#fff'}" stroke="${c}" stroke-width="2.5"/>` + T(x, y + 7, n, { fs: 18, c: c === NC ? '#fff' : c, ls: 0.6 }), a); };
  ED.forEach(([a, b]) => { const A = ND[a], B = ND[b]; s += ln(A[1], A[2] + 22, B[1], B[2] - 22, C.mute, 2.5, io(t, B[3] - 0.25, 0.3)); });
  ND.forEach(([n, x, y, tt, c]) => { s += box(n, x, y, c, io(t, tt - 0.05, 0.3)); });
  s += G(T(150, 262, 'STRAIGHT · BRANCHED', { fs: 15 }) + T(150, 290, '= ALIPHATIC', { fs: 16, c: NC }), io(t, tAl - 0.1, 0.3));
  const h = io(t, tHet - 0.1, 0.4);
  if (h > 0.01) s += G(`<rect x="70" y="510" width="644" height="48" rx="12" fill="${tint(OX, 0.1)}" stroke="${OX}" stroke-width="2.5" stroke-dasharray="7 6"/>` + T(392, 541, 'HETEROCYCLIC · O, N OR S IN THE RING', { fs: 18, c: OX, ls: 0.6 }) +
    ln(420, 326, 420, 506, OX, 2, 1) + ln(560, 430, 560, 506, OX, 2, 1), h);
  return s;
}
function exS(t) {
  const ph = t < tCy - 0.2 ? 0 : t < tAr - 0.2 ? 1 : t < tQ3 ? 2 : 3;
  const P = [
    () => G(zig([[60, 170], [120, 120], [180, 170], [240, 120]], t, tAc, 0.25) + T(150, 230, 'BUTANE · STRAIGHT', { fs: 16 }), io(t, tAc, 0.3)) +
      G(zig([[440, 170], [500, 120], [560, 170]], t, tBr - 0.2, 0.25) + ln(500, 120, 500, 64, C.ink2, 6, io(t, tBr + 0.3, 0.3)) + T(500, 230, 'ISOBUTANE · BRANCHED', { fs: 16 }), io(t, tBr - 0.3, 0.3)),
    () => G(ring(200, 140, 6, 62, t, tAlc - 0.1) + T(200, 236, 'CYCLOHEXANE', { fs: 16, c: C.ink }), io(t, tAlc - 0.2, 0.3)) + G(T(540, 130, 'ONLY SINGLE BONDS', { fs: 18, c: C.ink }) + T(540, 166, 'ACTS LIKE A CHAIN', { fs: 16 }), io(t, tAlc + 0.6, 0.3)),
    () => G(benz(140, 140, 58, t, tAr - 0.1) + T(140, 236, 'BENZENE', { fs: 16, c: PV }), io(t, tAr - 0.2, 0.3)) + G(benz(380, 150, 50, t, wt('S6', 'aniline') - 0.1) + ln(380, 100, 380, 66, C.ink2, 5, 1) + lab(380, 50, 'NH₂', OX, 22) + T(380, 236, 'ANILINE', { fs: 16, c: PV }), io(t, wt('S6', 'aniline') - 0.2, 0.3)) +
      G(T(620, 130, 'TROPOLONE', { fs: 20, c: PV }) + T(620, 162, 'NON-BENZENOID', { fs: 15 }), io(t, tNb - 0.1, 0.3)),
    () => [['Tetrahydrofuran', 'THF · ALICYCLIC', 5, []], ['Furan', 'FURAN · AROMATIC', 5, [1, 3]], ['pyridine', 'PYRIDINE · AROMATIC', 6, [1, 3, 5]]].map(([w, n, k, d], i) => { const x = 140 + i * 250, tt = wt('S7', w) - 0.15; return G(ring(x, 136, k, 56, t, tt, { dbl: d, het: { i: 0, s: k === 6 ? 'N' : 'O' } }) + T(x, 236, n, { fs: 15, c: i ? PV : C.ink, ls: 0.4 }), io(t, tt - 0.1, 0.3)); }).join(''),
  ];
  return P.map((f, i) => G(f(), i === ph ? 1 : 0)).join('');
}
function qS(t) {
  const Q = [[0, 'Q1 · IS THERE A RING?', [['NO', 'ACYCLIC', tAc], ['YES', 'CYCLIC', tCy]]], [tQ2, 'Q2 · IS IT LIKE BENZENE?', [['NO', 'ALICYCLIC', tAlc], ['YES', 'AROMATIC', tAr]]], [tQ3, 'Q3 · ONLY CARBON IN THE RING?', [['YES', 'CARBOCYCLIC', 1e9], ['NO', 'HETEROCYCLIC', tHet]]]];
  const i = cur(Q, t), [, q, A] = Q[i];
  return lab(392, 108, q, C.ink, 30) + A.map(([y, n, tt], k) => { const x = 60 + k * 352, on = io(t, tt - 0.1, 0.3);
    return `<rect x="${x}" y="150" width="312" height="76" rx="14" fill="${mix(C.soft, C.ac2, on)}"/>` + T(x + 28, 196, y, { fs: 20, c: on > 0.5 ? NC : C.mute, a: 'start' }) + T(x + 100, 197, n, { ff: 'Poppins', fw: 700, fs: 24, c: on > 0.5 ? C.ink : C.mute, a: 'start', ls: 0 }); }).join('');
}
/* ---------- B: functional groups ---------- */
const FG = [['HYDROXYL · ALCOHOLS', 'OH', 'hydroxyl'], ['ALDEHYDE GROUP', 'CHO', 'aldehyde'], ['CARBOXYLIC ACID', 'COOH', 'carboxylic']];
const tFG = [wt('B3', 'hydroxyl'), wt('B3', 'aldehyde'), wt('B4', 'carboxylic')];
function fgS(t) {
  return FG.map(([n, k], i) => { const y = 130 + i * 140, a = Math.max(0.22 * io(t, tB1 + i * 0.2, 0.4), io(t, tFG[i] - 0.2, 0.3)), x0 = 70;
    let s = zig([[x0, y + 20], [x0 + 60, y - 14], [x0 + 120, y + 20]], 99, 0, 0.1) + T(x0 + 60, y + 60, 'CHAIN', { fs: 13 });
    if (k === 'OH') s += ln(x0 + 120, y + 20, x0 + 190, y + 20, C.ink2, 5) + atomC(x0 + 210, y + 20, 24, 'O', OX, 20) + ln(x0 + 234, y + 20, x0 + 270, y + 20, C.ink2, 5) + atomC(x0 + 290, y + 20, 18, 'H', HC, 15);
    else { s += ln(x0 + 120, y + 20, x0 + 190, y + 20, C.ink2, 5) + atomC(x0 + 210, y + 20, 24, 'C', NC, 20) + ln(x0 + 204, y - 2, x0 + 204, y - 40, OX, 5) + ln(x0 + 216, y - 2, x0 + 216, y - 40, OX, 5) + atomC(x0 + 210, y - 58, 20, 'O', OX, 17);
      s += k === 'CHO' ? ln(x0 + 234, y + 20, x0 + 270, y + 20, C.ink2, 5) + atomC(x0 + 290, y + 20, 18, 'H', HC, 15)
        : ln(x0 + 234, y + 20, x0 + 270, y + 20, C.ink2, 5) + atomC(x0 + 292, y + 20, 22, 'O', OX, 18) + ln(x0 + 314, y + 20, x0 + 344, y + 20, C.ink2, 5) + atomC(x0 + 362, y + 20, 18, 'H', HC, 15); }
    s += `<rect x="${x0 + 168}" y="${y - (k === 'OH' ? 12 : 90)}" width="${k === 'COOH' ? 222 : 150}" height="${k === 'OH' ? 64 : 142}" rx="14" fill="none" stroke="${OX}" stroke-width="3" stroke-dasharray="6 5"/>`;
    s += lab(640, y + 4, '-' + k, OX, 32) + T(640, y + 44, n, { fs: 14, c: C.ink, ls: 0.6 });
    return G(s, a); }).join('');
}
function defS(t) {
  return G(T(48, 100, 'FUNCTIONAL GROUP', { fs: 18, c: OX, a: 'start' }) + T(48, 148, 'An atom or small group of atoms', { ff: 'Poppins', fs: 26, c: C.ink, a: 'start', ls: 0 }) + T(48, 186, 'joined to the chain in a fixed way.', { ff: 'Poppins', fs: 26, c: C.ink, a: 'start', ls: 0 }) +
    G(T(48, 232, 'It gives the main chemical behaviour.', { ff: 'Poppins', fs: 22, c: NC, a: 'start', ls: 0 }), io(t, wt('B2', 'behaviour') - 0.3, 0.3)), io(t, T0('B2'), 0.3));
}
function vinS(t) {
  return G(`<rect x="48" y="80" width="688" height="150" rx="14" fill="${C.soft}"/>` + T(80, 124, 'VINEGAR IS SOUR', { fs: 18, a: 'start' }) + lab(250, 182, 'CH₃', C.ink, 40) + lab(388, 182, 'COOH', OX, 40) + T(600, 176, 'ACETIC ACID', { fs: 22, c: C.ink }), io(t, wt('B4', 'Vinegar') - 0.1, 0.3));
}
const btg = tag($('#bn'));
const BT = [[0, 'START HERE'], [tAc, 'NO RING · ACYCLIC'], [tCy, 'RING · CYCLIC'], [tAlc, 'ALICYCLIC'], [tAr, 'AROMATIC'], [tHet, 'HETEROCYCLIC'], [tB1 - 0.2, 'FUNCTIONAL GROUPS']];

/* ---------- D: homologous series ---------- */
const LK = [['LINK 1', 'Same functional group: one series', 'FAMILY', 'D2'], ['LINK 2', 'Each member: one CH₂ bigger', '+ CH₂', 'D3'], ['LINK 3', 'CH₂ = 12 + 2: mass rises 14', '+ 14 u', 'D4'], ['LINK 4', 'One general formula', 'CₙH₂ₙ₊₂', 'D5'], ['LINK 5', 'React alike, properties step up', 'TREND', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const HS = [['Methanol', 'CH₃OH', 32, 1], ['ethanol', 'C₂H₅OH', 46, 2], ['propanol', 'C₃H₇OH', 60, 3]];
function drawD(t) {
  let s = '';
  HS.forEach(([w, f, m, n], i) => { const y = 132 + i * 118, a = io(t, i ? wt('D3', w) - 0.2 : tD1 + 0.3, 0.3), x0 = 70;
    const P = []; for (let k = 0; k < n; k++) P.push([x0 + k * 78, y + (k % 2 ? -20 : 20)]);
    const L = P[n - 1], ox = L[0] + 66, oy = y + (n % 2 ? -20 : 20);
    let r = (n > 1 ? zig(P, 99, 0, 0.1) : '') + ln(L[0], L[1], ox - 22, oy, C.ink2, 6) + P.map((p, k) => atomC(p[0], p[1], 17, 'C', i && k === n - 1 ? SC : NC, 15)).join('') + lab(ox + 4, oy - 2, 'OH', OX, 28);
    r += T(400, y + 9, f, { fs: 28, c: C.ink, ls: 0, a: 'start' }) + G(T(610, y + 9, m + ' u', { fs: 28, c: SC, ls: 0, a: 'start' }), io(t, tLk[2] + 0.3 + i * 0.3, 0.3));
    if (i) r += G(badge(470, y - 59, '+CH₂', SC, 1, 84), io(t, wt('D3', w), 0.3)) + G(T(660, y - 52, '+14', { fs: 20, c: SC, ls: 0 }), io(t, wt('D4', 'fourteen') - 0.1, 0.3));
    s += G(r, a); });
  s += G(`<rect x="60" y="440" width="664" height="64" rx="14" fill="${C.soft}"/>` + T(92, 480, 'ALCOHOLS · CₙH₂ₙ₊₁OH', { fs: 20, c: OX, a: 'start' }) + T(700, 480, 'ALKANES · CₙH₂ₙ₊₂', { fs: 20, c: NC, a: 'end' }), io(t, tLk[3] + 0.3, 0.3));
  s += G(T(392, 546, 'SAME GROUP → SIMILAR REACTIONS · SIZE ↑ → BOILING POINT ↑', { fs: 15, c: C.ink, ls: 0.4 }), io(t, wt('D6', 'boiling') - 0.2, 0.3));
  return s;
}
const dtg = tag($('#dr'));
const DLB = ['THE ALCOHOL FAMILY', 'ADD ONE CH₂', 'MASS +14', 'GENERAL FORMULA', 'THE TREND'];

/* ---------- C: ethane vs ethanol ---------- */
const tGas = wt('C2', 'gas'), tOH = wt('C3', 'O'), tLiq = wt('C3', 'liquid'), tC4 = T0('C4'), tC5 = T0('C5');
function mol2(t, oh) {
  const c1 = [300, 270], c2 = [470, 270];
  let s = ln(...c1, ...c2, C.ink2, 7);
  const H = [[c1, [210, 200]], [c1, [210, 340]], [c1, [300, 160]], [c2, [470, 160]], [c2, [470, 380]]];
  H.forEach(([c, p]) => { s += ln(...c, ...p, C.ink2, 5) + atomC(...p, 22, 'H', HC, 18); });
  if (oh) { const a = io(t, tOH - 0.1, 0.4); s += G(ln(...c2, 590, 270, C.ink2, 5) + atomC(590, 270, 28, 'O', OX, 22) + ln(618, 270, 660, 270, C.ink2, 5) + atomC(680, 270, 20, 'H', HC, 16), a) + G(ln(...c2, 560, 270, C.ink2, 5) + atomC(560, 270, 22, 'H', HC, 18), 1 - a);
    const hl = io(t, tC5, 0.3); if (hl > 0.01) s += `<rect x="550" y="228" width="160" height="84" rx="16" fill="none" stroke="${OX}" stroke-width="4" opacity="${hl.toFixed(3)}"/>`; }
  else s += ln(...c2, 560, 270, C.ink2, 5) + atomC(560, 270, 22, 'H', HC, 18);
  s += atomC(...c1, 34, 'C', NC, 26) + atomC(...c2, 34, 'C', NC, 26);
  const pa = io(t, oh ? tLiq - 0.1 : tGas - 0.1, 0.3);
  s += G(`<rect x="160" y="440" width="464" height="96" rx="14" fill="${oh ? tint('#2F6FEB', 0.1) : C.soft}"/>` + lab(392, 470, oh ? 'LIQUID' : 'GAS', C.ink, 30) + T(392, 518, oh ? 'MIXES WITH WATER EASILY' : 'DOES NOT MIX WITH WATER', { fs: 16, c: oh ? C.ok : C.red }), pa);
  return s;
}
const th1 = PUC.think($('#th1'), { q: 'What made the difference between ethane and ethanol?', opts: ['The carbon chain', 'The OH group'], right: 1, why: 'The chain is the same. The <b style="color:#C8461B">OH group</b> changes the behaviour.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Y_('\\text{skeleton}')} + ${O_('\\text{functional group}')} = \\text{family}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Y_('\\mathrm{C}_n')}\\mathrm{H}_{2n+2}`)],
  [K(`n = 3:\\ \\mathrm{C_3H_8}\\ \\text{(propane)}`)],
  [K(`3 \\times 12 + 8 \\times 1 = 44\\ \\text{u}`)],
  [K(`${G_('+\\,\\mathrm{CH_2}')}:\\ \\mathrm{C_4H_{10}},\\ 44 + 14 = 58\\ \\text{u}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Acyclic · alkane family'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const WP = [[180, 300], [300, 230], [420, 300], [540, 230]];
function drawW(t) {
  let s = zig(WP.slice(0, 3), t, T0('W3') - 0.2, 0.3);
  const n4 = io(t, wt('W5', 'adds') - 0.1, 0.4);
  s += G(ln(420, 300, 540, 230, SC, 6, n4) + G(badge(540, 180, '+CH₂', SC, 1, 84), n4), n4);
  WP.forEach((p, i) => { s += G(atomC(p[0], p[1], 22, 'C', i === 3 ? SC : NC, 18), i < 3 ? io(t, T0('W3') + i * 0.2, 0.25) : n4); });
  s += G(T(360, 380, t < wt('W5', 'adds') ? 'C₃H₈ · PROPANE' : 'C₄H₁₀ · BUTANE', { fs: 24, c: C.ink, ls: 0 }), io(t, wt('W3', 'propane') - 0.1, 0.3));
  s += G(`<rect x="210" y="430" width="364" height="96" rx="14" fill="${C.soft}"/>` + T(392, 466, 'MOLECULAR MASS', { fs: 15 }) + T(392, 510, t < wt('W5', 'fifty') - 0.1 ? '44 u' : '58 u', { fs: 34, c: SC, ls: 0 }), io(t, wt('W4', 'forty') - 0.1, 0.3));
  s += G(lab(392, 200, 'CₙH₂ₙ₊₂', NC, 64) + T(392, 290, 'ALKANES · GENERAL FORMULA', { fs: 18 }), io(t, T0('W2') + 0.2, 0.3) * (1 - io(t, T0('W3') - 0.4, 0.3)));
  put($('#wS'), s);
  const WT = [[0, 'ALKANE FAMILY'], [T0('W3'), 'n = 3'], [T0('W4'), 'ADD THE MASSES'], [T0('W5'), 'NEXT MEMBER'], [T0('W6'), 'ACYCLIC']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every ring compound is aromatic: <b>cyclohexane with benzene</b>', right: 'Cyclohexane is <b>alicyclic</b>. Aromatic needs a benzene type ring' });
$('#tS').innerHTML = `<g id="tM1">${ring(150, 130, 6, 60, 99, 0) + T(150, 236, 'CYCLOHEXANE', { fs: 16, c: C.ink })}</g><g id="tM2">${benz(460, 130, 60, 99, 0) + T(460, 236, 'BENZENE · AROMATIC', { fs: 16, c: PV })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M250 60 L350 200 M350 60 L250 200'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const eqS = document.createElementNS('http://www.w3.org/2000/svg', 'text'); attr(eqS, 'x', 300); attr(eqS, 'y', 148); attr(eqS, 'text-anchor', 'middle'); attr(eqS, 'font-family', 'Poppins'); attr(eqS, 'font-weight', 700); attr(eqS, 'font-size', 54); attr(eqS, 'fill', C.ink); eqS.textContent = '='; $('#tS').appendChild(eqS);
const where = PUC.where($('#wa'), { on: [], type: 'Classify a compound (alicyclic, aromatic, heterocyclic), name its functional group, spot homologues' });
const mf = s => `\\mathrm{${s}}`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: 'Which pair are <b>next door members</b> of the same homologous series?', qW: 820,
  opts: [K(`${mf('CH_3OH')},\\ ${mf('C_2H_5OH')}`), K(`${mf('C_2H_6')},\\ ${mf('C_2H_4')}`), K(`${mf('CH_3OH')},\\ ${mf('CH_3CHO')}`), K(`${mf('C_2H_5OH')},\\ ${mf('C_4H_9OH')}`)], right: 0, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`\\text{both } ${O_('\\mathrm{-OH}')},\\ \\text{differ by } ${G_('\\mathrm{CH_2}')}`)], [K(`\\text{B: alkane, alkene}`)], [K(`\\text{C: } ${O_('\\mathrm{-OH}')}\\ \\text{vs}\\ ${O_('\\mathrm{-CHO}')}`)], [K(`\\text{D: } 2 \\times ${G_('\\mathrm{CH_2}')}\\ \\text{apart}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'D')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Classification', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Acyclic</b> (aliphatic): open chain, straight or branched',
    '<b>Alicyclic</b>: a ring that acts like a chain · cyclohexane',
    '<b>Aromatic</b>: benzenoid (benzene) or non-benzenoid (tropolone)',
    '<b>Heterocyclic</b>: O, N or S in the ring · THF, furan, pyridine',
    '<b>Functional group</b>: -OH, -CHO, -COOH decide the behaviour',
    '<b>Homologous series</b>: same group, each one CH₂ (14 u) bigger'] });
const YQ = ['Is cyclohexane aromatic or alicyclic?', 'Name the functional group in ethanoic acid.', 'By how much do two next door homologues differ in mass?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 81', topic: 'Why "2-methylpentane"? IUPAC Nomenclature of Organic Compounds', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'sorting') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'questions') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'shelf') + 0.1) / 0.3) * (i > 1 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'behaviour') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P6', 'Skeleton') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, tP1 + 0.6, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tAc - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.4, z, { dy: 36, ...o });
    const bb = io(t, tB1 - 0.1, 0.4);
    put($('#bS'), G(tree(t), 1 - bb) + G(fgS(t), bb));
    M.setT($('#bnL'), t < tB1 - 0.1 ? 'THE FAMILY TREE' : 'MOLECULE BENCH · FUNCTIONAL GROUPS');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), G(exS(t), 1 - bb) + G(defS(t), bb)); M.setT($('#shL'), t < tB1 - 0.1 ? 'EXAMPLE' : 'DEFINITION');
    const vv = io(t, wt('B4', 'Vinegar') - 0.3, 0.3);
    put($('#chS'), G(qS(t), 1 - bb) + G(G(T(392, 150, 'ONE GROUP · ONE FAMILY', { fs: 22, c: C.ink }), 1 - vv) + vinS(t), bb)); M.setT($('#chL'), t < tB1 - 0.1 ? 'THE QUESTION' : t < wt('B4', 'Vinegar') - 0.3 ? 'FAMILIES' : 'IN THE KITCHEN');
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    put($('#dS'), drawD(t)); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · ALCOHOL SERIES'); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const z = OUT('C4'), back = T0('C5') + 0.05, out = OUT('T1');
    M.vis($('#cl'), t, t < back ? tC1 + 0.05 : back, t < back ? z : out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, t < back ? tC1 + 0.4 : back + 0.1, t < back ? z : out, { dx: 60, dy: 0, ...o });
    put($('#cS1'), mol2(t, 0)); put($('#cS2'), mol2(t, 1));
  }
  M.vis($('#th1'), t, tC4 + 0.05, T0('C5') - 0.1, { dy: 36, outDur: 0.3, ody: -16 });
  if (cOn) th1(t, { tin: tC4, tOpts: wt('C4', 'chain') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'chain') });

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Skeleton') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Functional') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Functional') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'worked') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'Acyclic') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'worked') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, tW1 + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'ring') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'alicyclic') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'cyclohexane') - 0.1, 0.3).toFixed(3)); attr($('#tM2'), 'opacity', io(t, wt('X2', 'benzene') - 0.1, 0.3).toFixed(3)); attr(eqS, 'opacity', io(t, wt('X2', 'benzene'), 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
