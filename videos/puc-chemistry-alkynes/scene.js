// PUC Chemistry Ep 94: alkynes (Molecule bench)
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

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB3 = T0('B3'), tB6 = T0('B6'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['zap', 'Welding torch', 'A BLINDING HOT FLAME', 'torch', 'FLAME'], ['bulb', "Miner's lamp", 'A STONE AND WATER', 'lamp', 'GAS'], ['leaf', 'Mango box', 'RIPENS TOO FAST', 'mangoes', 'STONE']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['leaf', 'Mango box', 'mangoes', 'H3'], ['stone', 'Grey stone', 'stone', 'H3'], ['drop', 'Wet = gas', 'gas', 'H4'], ['x', 'Not allowed', 'allowed', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: what is an alkyne ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Only C and H, one C≡C bond', 'TRIPLE', 'P2', 'hydrocarbon'], [`Formula ${K(mf('C_nH_{2n-2}'))}`, 'FORMULA', 'P3', 'general'], [`Ethyne ${K(mf('C_2H_2'))}, old name acetylene`, 'FIRST', 'P4', 'first'], [`Propyne ${K(mf('C_3H_4'))}`, 'NEXT', 'P5', 'propyne'], ['But-1-yne and but-2-yne', 'ISOMERS', 'P6', 'but']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
// linear chain on one axis: labels, x positions, bond orders
const chainX = (y, xs, labs, ords, a = 1) => bs(xs.map((x, i) => ({ x, y, l: labs[i], a, r: labs[i].startsWith('CH') ? 34 : undefined })), ords.map((n, i) => [i, i + 1, n]));
function drawP(t) {
  let s = '';
  const a1 = io(t, tQr[2] - 0.2, 0.4) * (1 - io(t, T0('P6') - 0.2, 0.4));
  // ethyne then propyne (morph: the left H becomes CH3)
  const pr = io(t, tQr[3] - 0.1, 0.6);
  if (a1 > 0.01) {
    const xs = [lerp(170, 150, pr), lerp(300, 300, pr), lerp(480, 480, pr), lerp(610, 610, pr)];
    s += G(chainX(220, xs, [pr > 0.5 ? 'CH₃' : 'H', 'C', 'C', 'H'], [1, 3, 1]) + T(392, 330, pr > 0.5 ? 'PROPYNE · C₃H₄' : 'ETHYNE · C₂H₂', { fs: 24, c: C.ink, ls: 0.6 }), a1);
    s += G(T(392, 420, 'CₙH₂ₙ₋₂', { fs: 46, c: C.ink, ls: 0 }) + T(392, 466, 'n = 2: C₂H₂ · n = 3: C₃H₄', { fs: 20 }), io(t, tQr[1] - 0.1, 0.4) * a1 + 0 * pr);
  }
  const a2 = io(t, T0('P6') - 0.2, 0.4);
  if (a2 > 0.01) {
    s += G(chainX(190, [110, 230, 350, 470, 600], ['H', 'C', 'C', 'CH₂', 'CH₃'], [1, 3, 1, 1]) + T(392, 270, 'BUT-1-YNE · END', { fs: 20, c: NC }), a2);
    s += G(chainX(400, [130, 290, 450, 610], ['CH₃', 'C', 'C', 'CH₃'], [1, 3, 1]) + T(392, 480, 'BUT-2-YNE · MIDDLE', { fs: 20, c: NC }), io(t, wt('P6', 'two') - 0.1, 0.4));
  }
  put($('#pS'), s);
  M.setT(ptag, t < tQr[2] ? 'C≡C · TRIPLE BOND' : t < tQr[3] ? 'FIRST · ETHYNE' : t < T0('P6') ? 'NEXT · PROPYNE' : 'SAME C₄H₆ · POSITION ISOMERS');
}

/* ---------- S + B: the triple bond ---------- */
const tSp = T0('S2'), tSig = wt('S3', 'overlaps'), tH = wt('S4', 'hydrogens'), tLin = wt('S4', 'straight'), tPi1 = wt('S5', 'overlaps'), tPi2 = wt('S6', 'overlaps'), tTube = wt('S7', 'tube');
const tLen = wt('B1', 'hundred'), tEnth = wt('B2', 'eight'), tAc = wt('B3', 'acidic'), tTug = wt('B4', 'tug'), tFif = wt('B4', 'fifty'), tBase = wt('B5', 'base'), tStay = wt('B5', 'stays'), tWatch = wt('B5', 'Watch');
function benchT(t) {
  const g = io(t, tSig - 0.2, 0.8), X1 = lerp(220, 290, g), X2 = lerp(564, 494, g), y = 300;
  const p1 = io(t, tPi1 - 0.1, 0.8), p2 = io(t, tPi2 - 0.1, 0.8), hh = io(t, tH - 0.1, 0.6), tb = io(t, tTube, 0.6);
  let s = `<line x1="60" y1="${y}" x2="724" y2="${y}" stroke="${C.dim}" stroke-width="2" stroke-dasharray="6 8"/>`;
  // pi clouds (behind)
  const cloud = (dy, col, a) => G(`<path d="M${f1(X1 - 20)} ${f1(y + dy)} C${f1(X1 - 20)} ${f1(y + dy - 34 * Math.sign(dy))} ${f1(X2 + 20)} ${f1(y + dy - 34 * Math.sign(dy))} ${f1(X2 + 20)} ${f1(y + dy)} C${f1(X2 + 20)} ${f1(y + dy + 38 * Math.sign(dy))} ${f1(X1 - 20)} ${f1(y + dy + 38 * Math.sign(dy))} ${f1(X1 - 20)} ${f1(y + dy)}Z" fill="${tint(col, 0.2)}" stroke="${col}" stroke-width="3"/>`, a);
  s += cloud(-62, PB, p1) + cloud(62, PB, p1);
  const vx = -34, vy = 40; // front-back direction (oblique)
  const cloudO = k => G(`<ellipse cx="${f1((X1 + X2) / 2 + vx * k * 1.5)}" cy="${f1(y + vy * k * 1.2)}" rx="${f1((X2 - X1) / 2 + 30)}" ry="26" fill="${tint(DV, 0.18)}" stroke="${DV}" stroke-width="3"/>`, p2);
  s += cloudO(-1) + cloudO(1);
  // unhybridised p orbitals (fade as clouds form)
  [X1, X2].forEach(x => { s += G(pDb(x, y, 90, 70, 26, PB), 1 - p1) + G(pDb(x, y, 130, 58, 22, DV), 1 - p2); });
  // sp lobes
  s += hyb(X1, y, 180, 100) + hyb(X2, y, 0, 100) + G(hyb(X1, y, 0, 70) + hyb(X2, y, 180, 70), 1 - g * 0.6);
  if (g > 0.3) s += G(`<ellipse cx="${f1((X1 + X2) / 2)}" cy="${y}" rx="44" ry="20" fill="${tint(NC, 0.45)}" stroke="${NC}" stroke-width="3"/>` + T((X1 + X2) / 2, y - 30, 'σ', { fs: 28, c: NC, ls: 0, ff: 'Poppins', fw: 700 }), (g - 0.3) / 0.7);
  s += dot(X1, y, 10, NC) + dot(X2, y, 10, NC);
  // hydrogens
  if (hh > 0.01) s += G(atomC(lerp(40, X1 - 128, hh), y, 22, 'H', HC, 20) + atomC(lerp(744, X2 + 128, hh), y, 22, 'H', HC, 20), hh);
  s += G(T(392, 200, 'π', { fs: 30, c: PB, ls: 0, ff: 'Poppins', fw: 700 }), p1) + G(T(150, 372, 'π', { fs: 30, c: DV, ls: 0, ff: 'Poppins', fw: 700 }), p2);
  s += G(T(X1, 460, 'sp', { fs: 22, c: NC, ls: 0 }) + T(X2, 460, 'sp', { fs: 22, c: NC, ls: 0 }), 1 - g);
  s += G(T(392, 470, '1 σ + 2 π = TRIPLE BOND', { fs: 22, c: C.ink, ls: 0.6 }), tb * (1 - io(t, tLen - 0.1, 0.5)));
  // bond length dimension
  const ln = io(t, tLen - 0.1, 0.5);
  if (ln > 0.01) s += G(`<line x1="${X1}" y1="410" x2="${X2}" y2="410" stroke="${SC}" stroke-width="3"/><line x1="${X1}" y1="398" x2="${X1}" y2="422" stroke="${SC}" stroke-width="3"/><line x1="${X2}" y1="398" x2="${X2}" y2="422" stroke="${SC}" stroke-width="3"/>` + T(392, 446, '120 pm', { fs: 24, c: SC, ls: 0 }), ln * (1 - tb * 0) );
  return s;
}
function benchA(t) { // base pulls off the end hydrogen (curved arrows)
  const y = 290, b = io(t, tBase - 0.2, 0.6), a1 = io(t, tBase + 0.1, 0.7), a2 = io(t, tStay - 0.1, 0.7), m = io(t, tWatch + 0.2, 0.9);
  const Hx = lerp(520, 596, m);
  const atoms = [{ x: 100, y, l: 'H' }, { x: 230, y, l: 'C' }, { x: 390, y, l: 'C' }, { x: Hx, y, l: 'H' }, { x: lerp(740, 676, b), y, l: 'N', a: b }];
  let s = bs(atoms, [[0, 1, 1], [1, 2, 3], [2, 3, 1, null, 1 - m]]);
  // NH2- : two small H on N
  s += G(atomC(atoms[4].x + 34, y - 46, 15, 'H', HC, 14) + atomC(atoms[4].x + 34, y + 46, 15, 'H', HC, 14) + bond(atoms[4].x, y, atoms[4].x + 34, y - 46, 1, C.ink2, 4) + bond(atoms[4].x, y, atoms[4].x + 34, y + 46, 1, C.ink2, 4), b);
  s += lp(atoms[4].x - 34, y, 0, b * (1 - m));
  if (m > 0.5) s += G(bond(Hx, y, atoms[4].x, y, 1, C.ink2, 5, 18, 24), (m - 0.5) * 2);
  s += carr(atoms[4].x - 40, y - 16, Hx + 6, y - 22, 46, a1 * (1 - m));
  s += carr(455, y + 10, 408, y + 26, 34, a2 * (1 - m));
  // electrons left on carbon
  s += lp(390 + 46, y + 42, 0.7, m) + G(chg(440, y - 50, '−'), m);
  s += G(T(atoms[4].x, y + 100, 'NH₂⁻ BASE', { fs: 18, c: NB }), b * (1 - m)) + G(T(650, y + 100, 'NH₃', { fs: 20, c: NB, ls: 0 }), m);
  s += G(T(280, 440, 'HC≡C⁻ · ACETYLIDE ION', { fs: 22, c: EC, ls: 0.6 }), m);
  s += G(T(392, 140, 'THE PAIR STAYS ON CARBON', { fs: 20, c: EC }), a2);
  return s;
}
const ARW2 = (x1, y1, x2, y2, col = C.ink2) => `<line x1="${x1}" y1="${y1}" x2="${x2 - 12}" y2="${y2}" stroke="${col}" stroke-width="4"/><polygon points="${x2},${y2} ${x2 - 14},${y2 - 8} ${x2 - 14},${y2 + 8}" fill="${col}"/>`;
function shapeS(t) {
  const a = io(t, tLin - 0.1, 0.5), l = io(t, tLen - 0.2, 0.5), e = io(t, tEnth - 0.1, 0.4);
  let s = '';
  s += G(G(bs([{ x: 60, y: 150, l: 'H', r: 15 }, { x: 150, y: 150, l: 'C', r: 20 }, { x: 260, y: 150, l: 'C', r: 20 }, { x: 350, y: 150, l: 'H', r: 15 }], [[0, 1, 1], [1, 2, 3], [2, 3, 1]]), a) +
    T(430, 150, '180°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(432, 192, 'LINEAR · sp', { fs: 18, a: 'start' }), 1 - l);
  if (l > 0.01) {
    const bar = (y, w, lab, v, col) => `<rect x="150" y="${y}" width="${f1(w)}" height="34" rx="8" fill="${tint(col, 0.2)}" stroke="${col}" stroke-width="3"/>` + T(130, y + 24, lab, { fs: 22, c: C.ink, ls: 0, a: 'end' }) + T(160 + w, y + 24, v, { fs: 22, c: col, ls: 0, a: 'start' });
    s += G(bar(92, 154 * 1.9 * l, 'C-C', '154 pm', C.ink2) + bar(146, 120 * 1.9 * l, 'C≡C', '120 pm', SC) + T(36, 218, 'THREE BONDS PULL THE CARBONS CLOSER', { fs: 16, a: 'start' }), l);
    s += G(`<rect x="560" y="86" width="190" height="104" rx="14" fill="${C.soft}"/>` + T(655, 138, '823', { fs: 44, c: EC, ls: 0 }) + T(655, 172, 'kJ mol⁻¹', { fs: 18, c: C.ink, ls: 0 }), e);
  }
  return s;
}
function charS(t) {
  const c3 = io(t, tFif - 0.3, 0.5);
  let s = '';
  // s p mix (1 s + 1 p)
  const one = `<rect x="39" y="84" width="244" height="62" rx="10" fill="${tint(SC, 0.16)}" stroke="${SC}" stroke-width="3"/>` + T(161, 124, 's', { fs: 28, c: SC, ls: 0 }) + `<rect x="289" y="84" width="244" height="62" rx="10" fill="${tint(PB, 0.16)}" stroke="${PB}" stroke-width="3"/>` + T(411, 124, 'p', { fs: 28, c: PB, ls: 0 }) +
    T(580, 136, '50%', { fs: 54, c: SC, ls: 0, a: 'start' }) + T(582, 172, 's CHARACTER', { fs: 16, a: 'start' }) + T(36, 206, '1 s + 1 p → 2 sp · each is half s', { fs: 18, a: 'start', c: C.ink, ls: 0.4 });
  s += G(one, 1 - c3);
  if (c3 > 0.01) {
    const R = [['ETHANE · sp³', 25, C.mute], ['ETHENE · sp²', 33, C.ink2], ['ETHYNE · sp', 50, SC]];
    R.forEach(([n, p, col], i) => { const y = 84 + i * 50; s += T(36, y + 26, n, { fs: 18, a: 'start', c: C.ink, ls: 0.4 }) + `<rect x="230" y="${y}" width="${f1(p * 8 * c3)}" height="34" rx="8" fill="${tint(SC, 0.12 + i * 0.12)}" stroke="${SC}" stroke-width="2.5"/>` + T(240 + p * 8 * c3, y + 25, p + '%', { fs: 20, c: col, ls: 0, a: 'start' }); });
    s += G(T(36, 244, 'MORE s = ELECTRONS HELD CLOSER = H LEAVES MORE EASILY', { fs: 15, a: 'start', c: EC, ls: 0.6 }), io(t, wt('B4', 'tight') - 0.1, 0.4));
  }
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'ETHYNE · H-C≡C-H'], [tSp, 'EACH CARBON: sp'], [tSig, 'σ BOND'], [tLin, 'LINEAR · 180°'], [tPi1, 'FIRST π'], [tPi2, 'SECOND π'], [tTube, '1 σ + 2 π'], [tLen, '120 pm'], [tAc, 'ACIDIC H'], [tBase, 'BASE PULLS H⁺']];
const th1 = PUC.think($('#th1'), { q: 'Whose hydrogen leaves most easily?', opts: ['Ethane', 'Ethene', 'Ethyne'], right: 2, why: '<b>Ethyne</b>: its sp carbon has <b style="color:#B7791F">50% s character</b>, so it holds the electron pair best.' });

/* ---------- D: making ethyne ---------- */
const LK = [['LINK 1', 'Heat limestone', 'CaO', 'D2'], ['LINK 2', 'Quicklime + coke', 'CaC₂', 'D3'], ['LINK 3', 'Calcium carbide + water', 'C₂H₂', 'D4'], ['LINK 4', 'Alcoholic KOH: lose one HX', '- HX', 'D5'], ['LINK 5', 'Sodamide: lose the second HX', 'C≡C', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DEQ = [`${mf('CaCO_3')} \\xrightarrow{\\Delta} ${mf('CaO')} + ${mf('CO_2')}`, `${mf('CaO')} + ${mf('3C')} \\rightarrow ${mf('CaC_2')} + ${mf('CO')}`, `${mf('CaC_2')} + ${mf('2H_2O')} \\rightarrow ${mf('Ca(OH)_2')} + ${Y_(mf('C_2H_2'))}`,
  `${mf('CH_2')}${B_(mf('Br'))}{-}${mf('CH_2')}${B_(mf('Br'))} \\xrightarrow{\\text{alc. KOH}} ${mf('CH_2{=}CH')}${B_(mf('Br'))}`, `${mf('CH_2{=}CH')}${B_(mf('Br'))} \\xrightarrow{\\mathrm{NaNH_2}} ${Y_(mf('HC{\\equiv}CH'))}`];
$('#deqs').innerHTML = DEQ.map((q, i) => `<div class="deq" id="dq${i}">${K(q)}</div>`).join('');
const blk = (x, y, w, h, lab, col, fs = 30) => `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="16" fill="${tint(col, 0.14)}" stroke="${col}" stroke-width="3"/>` + T(x, y + fs * 0.36, lab, { fs, c: col, ls: 0, ff: 'IBM Plex Mono' });
const flame = (x, y, k) => `<path d="M${x - 40} ${y} Q${x - 30} ${y - 50 - 8 * Math.sin(k)} ${x} ${y - 78 - 10 * Math.sin(k * 1.3)} Q${x + 30} ${y - 50 + 8 * Math.sin(k)} ${x + 40} ${y} Z" fill="${tint(EC, 0.22)}" stroke="${EC}" stroke-width="3"/>`;
const rise = (t, t0, x0, y0, n, col, lab) => { let s = ''; if (t < t0) return s; for (let k = 0; k < n; k++) { const ph = ((t - t0) * 0.5 + k / n) % 1, x = x0 + 40 * Math.sin(k * 2.1 + ph * 3), y = y0 - ph * 220; s += G(`<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="#fff" stroke="${col}" stroke-width="2.5"/>` + T(x, y + 5, lab, { fs: 12, c: col, ls: 0 }), Math.min(1, ph * 5) * (1 - ph)); } return s; };
function elim(t, t0, ord, base) { // ord: 1 -> 2 or 2 -> 3, curved arrows
  const y = 310, X1 = 300, X2 = 490;
  const a1 = io(t, t0 + 0.3, 0.6), a2 = io(t, t0 + 1.1, 0.6), a3 = io(t, t0 + 1.9, 0.6), m = io(t, t0 + 2.8, 0.9);
  const bx = lerp(120, 170, a1), by = lerp(480, 460, a1);
  const Hy = lerp(420, 450, m), Brx = lerp(570, 660, m), Bry = lerp(220, 200, m);
  const atoms = [{ x: X1, y, l: 'C' }, { x: X2, y, l: 'C' }, { x: X1, y: Hy, l: 'H' }, { x: Brx, y: Bry, l: 'Br' }, { x: X1 - 100, y: y - 70, l: 'H' }, { x: X2 + 110, y: y + (ord === 1 ? 20 : 70), l: 'H' }];
  if (ord === 1) { atoms.push({ x: X1 - 100, y: y + 70, l: 'Br' }, { x: X2 + 40, y: y + 110, l: 'H' }); }
  let s = bs(atoms, [[0, 1, ord + m], [0, 2, 1, null, 1 - m], [1, 3, 1, null, 1 - m], [0, 4, 1], [1, 5, 1]].concat(ord === 1 ? [[0, 6, 1], [1, 7, 1]] : []));
  s += G(atomC(bx, by, 28, base === 'OH' ? 'O' : 'N', base === 'OH' ? OV : NB, 22) + lp(bx + 30, by - 10, 0.5, 1 - m), io(t, t0, 0.4)) + G(T(bx, by + 50, base === 'OH' ? 'OH⁻' : 'NH₂⁻', { fs: 18, c: base === 'OH' ? OV : NB, ls: 0 }), io(t, t0, 0.4) * (1 - m));
  s += carr(bx + 30, by - 20, X1 + 10, Hy + 10, -40, a1 * (1 - m));
  s += carr(X1 + 14, (y + Hy) / 2, (X1 + X2) / 2, y + 22, 40, a2 * (1 - m));
  s += carr((X1 + X2) / 2 + 60, y - 50, Brx + 10, Bry + 30, -30, a3 * (1 - m));
  s += G(lp(Brx + 30, Bry + 30, 0.6) + chg(Brx + 32, Bry - 30, '−'), m) + G(bond(bx, by, X1, Hy, 1, C.ink2, 4, 22, 18), m);
  return s;
}
function drawD(t, ki) {
  let s = '';
  const L1 = io(t, tD1 + 0.2, 0.35) * (1 - io(t, tLk[1] - 0.2, 0.3)), L2 = io(t, tLk[1] - 0.2, 0.35) * (1 - io(t, tLk[2] - 0.2, 0.3)), L3 = io(t, tLk[2] - 0.2, 0.35) * (1 - io(t, tLk[3] - 0.2, 0.3)), L4 = io(t, tLk[3] - 0.2, 0.35) * (1 - io(t, tLk[4] - 0.2, 0.3)), L5 = io(t, tLk[4] - 0.2, 0.35);
  if (L1 > 0.01) { const u = io(t, wt('D2', 'quicklime') - 0.3, 0.6); s += G(flame(392, 520, t * 6) + `<rect x="250" y="290" width="284" height="130" rx="18" fill="${tint(NA, 0.12)}" stroke="${NA}" stroke-width="3"/>` + G(T(392, 368, 'CaCO₃', { fs: 34, c: NA, ls: 0 }), 1 - u) + G(T(392, 368, 'CaO', { fs: 34, c: NA, ls: 0 }), u) + rise(t, wt('D2', 'carbon') - 0.3, 560, 330, 3, C.mute, 'CO₂') + T(620, 470, 'HEAT', { fs: 20, c: EC }), L1); }
  if (L2 > 0.01) { const u = io(t, wt('D3', 'calcium') - 0.6, 0.9); let b = blk(260, 360, 200, 120, u > 0.6 ? 'CaC₂' : 'CaO', NA, 32);
    [0, 1, 2].forEach(k => { b += G(atomC(lerp(520 + k * 80, 300 + k * 20, u), lerp(300 + (k % 2) * 90, 360, u), 26, 'C', NC, 22), 1 - Math.max(0, u - 0.8) * 5); });
    b += G(atomC(560, lerp(360, 220, io(t, wt('D3', 'monoxide') - 0.2, 0.6)), 24, 'CO', C.mute, 16), io(t, wt('D3', 'monoxide') - 0.3, 0.3)) + T(600, 500, 'COKE · ALMOST PURE C', { fs: 18 }); s += G(b, L2); }
  if (L3 > 0.01) { const tw = wt('D4', 'water'); let b = `<path d="M200 220 V500 Q200 520 220 520 H564 Q584 520 584 500 V220" fill="none" stroke="${C.ink2}" stroke-width="4"/>` + `<rect x="204" y="${f1(lerp(500, 300, io(t, tw - 0.2, 0.8)))}" width="376" height="${f1(lerp(16, 216, io(t, tw - 0.2, 0.8)))}" fill="${tint(PB, 0.12)}"/>` + blk(392, 476, 120, 56, 'CaC₂', NA, 22);
    if (t > tw) for (let k = 0; k < 6; k++) { const ph = ((t - tw) * 0.55 + k / 6) % 1, x = 300 + k * 36 + 10 * Math.sin(ph * 8 + k), yy = 440 - ph * 300; b += G(bs([{ x: x - 22, y: yy, l: 'H', r: 9 }, { x: x - 8, y: yy, l: 'C', r: 11, fs: 10 }, { x: x + 8, y: yy, l: 'C', r: 11, fs: 10 }, { x: x + 22, y: yy, l: 'H', r: 9 }], []), Math.min(1, ph * 6) * (1 - ph * 0.8)); }
    b += G(T(392, 192, 'ETHYNE BUBBLES OUT', { fs: 20, c: NC }), io(t, wt('D4', 'bubbles') - 0.1, 0.4)); s += G(b, L3); }
  if (L4 > 0.01) s += G(elim(t, wt('D5', 'Alcoholic') - 0.2, 1, 'OH'), L4);
  if (L5 > 0.01) s += G(elim(t, wt('D6', 'Sodamide') - 0.2, 2, 'NH2'), L5);
  put($('#dS'), s);
  LK.forEach((_, i) => { const el = $('#dq' + i); el.style.opacity = [L1, L2, L3, L4, L5][i].toFixed(3); });
}
const dtg = tag($('#dr'));
const DLB = ['LIMESTONE · HEAT', 'CARBIDE FROM COKE', 'CARBIDE + WATER', 'FIRST HX OFF', 'SECOND HX OFF'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${mf('H')}{-}${Y_(mf('C{\\equiv}C'))}{-}${E_(mf('H'))} \\quad 1\\,\\sigma + 2\\,\\pi`);

/* ---------- W: propyne ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${mf('CH_3C{\\equiv}C')}${E_(mf('H'))} + ${mf('Na')} \\rightarrow ${mf('CH_3C{\\equiv}C^-Na^+')} + \\tfrac12${E_(mf('H_2'))}`)],
  [K(`\\pi \\text{ weaker than } \\sigma \\rightarrow \\text{addition}`)],
  [K(`\\text{H goes to the C with more H}`)],
  [K(`${mf('CH_3C(')}${B_(mf('Br'))}${mf(')=CH_2')}\\ \\text{(2-bromopropene)}`)],
  [K(`${mf('CH_3C')}${B_(mf('Br_2'))}${mf('CH_3')}\\ \\text{(2,2-dibromo)}`)]], { label: 'WORKED EXAMPLE', y0: 140, dy: 78 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const wtg = tag($('#wr'));
function drawW(t) {
  let s = '';
  const y = 300, fA = 1 - io(t, T0('W3') - 0.2, 0.4), fB = io(t, T0('W3') - 0.2, 0.4);
  if (fA > 0.01) { // sodium swap
    const m = io(t, wt('W2', 'replaces') - 0.1, 0.9), g = io(t, wt('W2', 'hydrogen', 1) - 0.1, 0.6);
    const at = [{ x: 140, y, l: 'CH₃', r: 32 }, { x: 300, y, l: 'C' }, { x: 470, y, l: 'C' }, { x: lerp(610, 640, m), y: lerp(y, 160, m), l: 'H', a: 1 - g * 0.9 }, { x: lerp(720, 620, m), y: lerp(440, y, m), l: 'Na' }];
    s += bs(at, [[0, 1, 1], [1, 2, 3], [2, 3, 1, null, 1 - m], [2, 4, 1, null, m]]) + G(chg(650, y - 44, '+', NA), m) + G(T(560, 120, '½ H₂ BUBBLES OUT', { fs: 20, c: EC }), g) + T(330, 520, 'END H ON A TRIPLE BOND CARBON', { fs: 18 });
    s = G(s, fA);
  }
  if (fB > 0.01) {
    const h1 = io(t, wt('W4', 'hydrogen') - 0.2, 0.9), r1 = io(t, wt('W5', 'bromine') - 0.2, 0.9), h2 = io(t, wt('W6', 'second') - 0.1, 0.9), r2 = io(t, wt('W6', 'same') - 0.2, 0.9);
    const ord = 3 - Math.min(h1, r1) - Math.min(h2, r2);
    const at = [{ x: 150, y, l: 'CH₃', r: 32 }, { x: 330, y, l: 'C' }, { x: 510, y, l: 'C' }, { x: 640, y, l: 'H' },
      { x: lerp(700, 510, h1), y: lerp(440, 430, h1), l: 'H', a: io(t, T0('W4'), 0.4) }, { x: lerp(110, 330, r1), y: lerp(160, 170, r1), l: 'Br', a: io(t, T0('W4'), 0.4) },
      { x: lerp(700, 510, h2), y: lerp(140, 170, h2), l: 'H', a: io(t, T0('W6'), 0.4) }, { x: lerp(120, 330, r2), y: lerp(470, 430, r2), l: 'Br', a: io(t, T0('W6'), 0.4) }];
    let b = bs(at, [[0, 1, 1], [1, 2, ord], [2, 3, 1], [2, 4, 1, null, h1 > 0.95 ? 1 : 0], [1, 5, 1, null, r1 > 0.95 ? 1 : 0], [2, 6, 1, null, h2 > 0.95 ? 1 : 0], [1, 7, 1, null, r2 > 0.95 ? 1 : 0]]);
    b += carr(420, y - 26, at[4].x - 10, at[4].y - 20, 40, io(t, wt('W4', 'adds') - 0.1, 0.6) * (1 - h1));
    b += carr(420, y + 26, at[6].x - 10, at[6].y + 20, -40, io(t, wt('W6', 'adds') - 0.1, 0.6) * (1 - h2));
    b += G(T(510, 520, 'MORE H HERE', { fs: 18, c: C.ink }), h1 * (1 - h2)) + G(T(330, 120, 'Br ON THE MIDDLE C', { fs: 18, c: BR }), r1);
    s += G(b, fB);
  }
  put($('#wS'), s);
  const WT = [[0, 'PROPYNE · CH₃C≡CH'], [wt('W2', 'replaces'), 'Na REPLACES H'], [T0('W3'), 'ADD ACROSS π'], [T0('W4'), 'MARKOVNIKOV'], [T0('W5'), '2-BROMOPROPENE'], [T0('W6'), '2,2-DIBROMOPROPANE']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- C: more additions + benzene ---------- */
const AD = [['H₂ · Pt, Pd OR Ni', `${mf('C_2H_2')} \\rightarrow ${mf('C_2H_4')} \\rightarrow ${mf('C_2H_6')}`, 'C2'], [`${'Br₂ IN CCl₄'}`, `\\text{reddish orange} \\rightarrow \\text{colourless}`, 'C3'], ['H₂O · Hg²⁺ / H⁺ · 333 K', `\\text{propyne} \\rightarrow \\text{propanone}`, 'C4'], ['RED HOT IRON TUBE · 873 K', `3\\,${mf('C_2H_2')} \\rightarrow ${Y_(mf('C_6H_6'))}`, 'C5']];
$('#ars').innerHTML = AD.map(([l, q], i) => `<div class="ar" id="ar${i}" style="top:${84 + i * 116}px"><div class="lt">${l}</div><div class="lx">${K(q)}</div></div>`).join('');
const tAd = AD.map(a => T0(a[2]));
const hexP = (cx, cy, R, k) => [cx + R * Math.cos(Math.PI / 3 * k - Math.PI / 2), cy + R * Math.sin(Math.PI / 3 * k - Math.PI / 2)];
function drawC(t) {
  let s = '';
  const f = i => io(t, tAd[i] - 0.2, 0.35) * (i < 3 ? 1 - io(t, tAd[i + 1] - 0.2, 0.3) : 1);
  const y = 290;
  if (f(0) > 0.01) { const u1 = io(t, wt('C2', 'ethene') - 0.2, 0.7), u2 = io(t, wt('C2', 'ethane') - 0.2, 0.7);
    const at = [{ x: 170, y, l: 'H' }, { x: 320, y, l: 'C' }, { x: 470, y, l: 'C' }, { x: 620, y, l: 'H' }, { x: 320, y: lerp(120, 170, u1), l: 'H', a: u1 }, { x: 470, y: lerp(120, 170, u1), l: 'H', a: u1 }, { x: 320, y: lerp(470, 410, u2), l: 'H', a: u2 }, { x: 470, y: lerp(470, 410, u2), l: 'H', a: u2 }];
    s += G(bs(at, [[0, 1, 1], [1, 2, 3 - u1 - u2], [2, 3, 1], [1, 4, 1], [2, 5, 1], [1, 6, 1], [2, 7, 1]]) + T(392, 520, u2 > 0.5 ? 'ETHANE' : u1 > 0.5 ? 'ETHENE' : 'ETHYNE', { fs: 24, c: C.ink }), f(0)); }
  if (f(1) > 0.01) { const u = io(t, wt('C3', 'loses') - 0.2, 1.6);
    s += G(`<path d="M220 170 V470 Q220 490 240 490 H544 Q564 490 564 470 V170" fill="none" stroke="${C.ink2}" stroke-width="4"/><rect x="224" y="240" width="336" height="246" fill="${M.mix('#D9622B', '#FFFFFF', 0.25 + 0.72 * u)}"/>` + T(392, 140, u > 0.5 ? 'COLOUR GONE · C≡C PRESENT' : 'Br₂ IN CCl₄', { fs: 20, c: u > 0.5 ? C.ok : BR }) + rise(t, T0('C3'), 392, 470, 4, NC, 'C₂H₂'), f(1)); }
  if (f(2) > 0.01) { const u = io(t, wt('C4', 'adds') - 0.1, 0.8), k = io(t, wt('C4', 'propanone') - 0.4, 0.9);
    const at = [{ x: 150, y, l: 'CH₃', r: 32 }, { x: 330, y, l: 'C' }, { x: 510, y, l: 'C' }, { x: 640, y, l: 'H' }, { x: 330, y: lerp(100, 160, u), l: 'O', a: u }, { x: lerp(510, 510, k), y: lerp(440, 430, u), l: 'H', a: u }, { x: lerp(400, 510, k), y: lerp(100, 160, k), l: 'H', a: u }];
    s += G(bs(at, [[0, 1, 1], [1, 2, 3 - u - k], [2, 3, 1], [1, 4, 1 + k, OV], [2, 5, 1], [4, 6, 1, null, 1 - k], [2, 6, 1, null, k]]) + T(392, 520, k > 0.5 ? 'PROPANONE · CH₃COCH₃' : u > 0.5 ? 'ENOL · OH ON THE MIDDLE C' : 'PROPYNE', { fs: 22, c: C.ink, ls: 0.6 }), f(2)); }
  if (f(3) > 0.01) { const u = io(t, wt('C5', 'join') - 0.3, 1.4), cx = 392, cy = 300, R = 120;
    const at = [], bd = [];
    for (let i = 0; i < 3; i++) { const ang = Math.PI * 2 / 3 * i - Math.PI / 6, ox = Math.cos(ang) * 90 * (1 - u), oy = Math.sin(ang) * 90 * (1 - u);
      const p = hexP(cx, cy, R, 2 * i), q = hexP(cx, cy, R, 2 * i + 1), ph = hexP(cx, cy, R + 64, 2 * i), qh = hexP(cx, cy, R + 64, 2 * i + 1);
      at.push({ x: p[0] + ox, y: p[1] + oy, l: 'C' }, { x: q[0] + ox, y: q[1] + oy, l: 'C' });
      bd.push([at.length - 2, at.length - 1, 3 - u]);
      at.push({ x: ph[0] + ox, y: ph[1] + oy, l: 'H', r: 15 }, { x: qh[0] + ox, y: qh[1] + oy, l: 'H', r: 15 });
      bd.push([at.length - 4, at.length - 2, 1], [at.length - 3, at.length - 1, 1]); }
    [[1, 4], [5, 8], [9, 0]].forEach(([i, j]) => bd.push([i, j, 1, null, u]));
    s += G(bs(at, bd) + G(T(392, 540, 'BENZENE · C₆H₆', { fs: 24, c: NC }), io(t, wt('C5', 'benzene') - 0.1, 0.4)) + G(T(392, 540, 'THREE ETHYNE MOLECULES', { fs: 22, c: C.ink }), 1 - io(t, wt('C5', 'benzene') - 0.1, 0.4)), f(3)); }
  put($('#cS2'), s);
  const ci = cur(tAd.map(x => [x - 0.2]), t);
  M.setT($('#cpL'), ['MOLECULE BENCH · ADD H₂', 'MOLECULE BENCH · ADD Br₂', 'MOLECULE BENCH · ADD WATER', 'MOLECULE BENCH · RING'][ci]);
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'All alkynes give H₂ with Na, even <b>but-2-yne</b>', right: 'Only <b>terminal</b> alkynes have that H' });
const t2 = (cx, labs) => bs([{ x: cx - 105, y: 110, l: labs[0], r: 26 }, { x: cx - 30, y: 110, l: 'C', r: 20 }, { x: cx + 45, y: 110, l: 'C', r: 20 }, { x: cx + 120, y: 110, l: labs[1], r: labs[1] === 'H' ? 16 : 26 }], [[0, 1, 1], [1, 2, 3], [2, 3, 1]]);
$('#tS').innerHTML = `<g id="tM1">${t2(150, ['CH₃', 'CH₃']) + T(158, 200, 'BUT-2-YNE · NO END H', { fs: 18, c: C.red, ls: 0.6 })}</g><g id="tM2">${t2(455, ['CH₃', 'H']) + T(455, 200, 'PROPYNE · END H', { fs: 18, c: C.ok, ls: 0.6 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M50 60 L270 160 M270 60 L50 160'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'Acidic terminal alkynes, Markovnikov addition and the carbide method' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: '<b>X</b> (C₃H₄) gives H₂ with Na. With H₂O, Hg²⁺ and H⁺ it gives <b>Y</b>. What is Y?', qW: 800,
  opts: [K(mf('CH_3CH_2CHO')), K(mf('CH_3COCH_3')), K(mf('CH_3CH(OH)CH_3')), K(mf('CH_3CH_2COOH'))], right: 1, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`\\text{Na} \\rightarrow ${E_(mf('H_2'))}: \\text{terminal}`)], [K(`\\text{X} = ${mf('CH_3C{\\equiv}CH')}`)], [K(`${O_(mf('OH'))} \\text{ on the middle C: enol}`)], [K(`\\text{enol} \\rightarrow ${mf('CH_3CO')}${mf('CH_3')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'propyne'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Alkynes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Alkyne</b>: hydrocarbon with one C≡C · CₙH₂ₙ₋₂ · ethyne C₂H₂',
    '<b>Triple bond</b>: 1 σ + 2 π · sp carbons · linear 180° · 120 pm',
    '<b>Acidic H</b>: only terminal alkynes · sp = 50% s · ethyne > ethene > ethane',
    '<b>Make it</b>: CaC₂ + 2H₂O → C₂H₂ · or vicinal dihalide, alc. KOH, NaNH₂',
    '<b>Add</b>: H₂ (Pt, Pd, Ni) · Br₂ test · HBr by Markovnikov · H₂O gives a ketone',
    '<b>Ring</b>: 3 C₂H₂ through a red hot iron tube, 873 K → benzene'] });
const YQ = ['How many sigma and pi bonds are in a carbon carbon triple bond?', 'Why is the hydrogen of ethyne more acidic than that of ethane?', 'What forms when calcium carbide meets water?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 95', topic: 'Why is benzene not like three double bonds? Benzene and Aromaticity', y: 764 });

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

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'One') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'hides') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'allowed') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'hydrogen') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'triple') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
    if (t < tQr[2] - 0.2) put($('#pS'), G(chainX(260, [170, 300, 480, 610], ['H', 'C', 'C', 'H'], [1, 3, 1]), io(t, T0('P2') + 0.2, 0.4)) + G(T(392, 370, 'ONE C≡C TRIPLE BOND', { fs: 22, c: NC }), io(t, wt('P2', 'triple') - 0.1, 0.4)) + G(T(392, 460, 'CₙH₂ₙ₋₂', { fs: 46, c: C.ink, ls: 0 }), io(t, tQr[1] - 0.1, 0.4)));
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B6');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const ka = io(t, tAc - 0.1, 0.5);
    put($('#bS'), G(`<g transform="translate(392 300) scale(1.3) translate(-392 -300)">${benchT(t)}</g>`, 1 - ka) + G(benchA(t), ka));
    M.setT($('#bnL'), t < tAc ? 'MOLECULE BENCH · ETHYNE' : 'MOLECULE BENCH · ACIDIC H');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), shapeS(t)); M.setT($('#shL'), t < tLen - 0.2 ? 'SHAPE' : 'BOND LENGTH · BOND ENTHALPY');
    put($('#chS'), G(charS(t), io(t, tS1 + 0.8, 0.4))); M.setT($('#chL'), t < tFif - 0.3 ? 'THE MIX · s CHARACTER' : 'TUG OF WAR · s CHARACTER');
  }
  M.vis($('#th1'), t, tB6 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB6, tOpts: wt('B6', 'ethane') - 0.1, tCount: T1('B6') + 0.05, dur: 3, tAns: T0('B7') - 0.02, tWhy: wt('B7', 'Its') });

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    drawD(t, ki); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · LINK ' + (ki + 1)); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'One') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'end') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'leave') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'What') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, wt('W1', 'propyne') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    AD.forEach((_, i) => { const el = $('#ar' + i); M.vis(el, t, tAd[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tAd[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tAd[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    drawC(t);
    if (t < tAd[0] - 0.2) put($('#cS2'), G(chainX(290, [170, 320, 470, 620], ['H', 'C', 'C', 'H'], [1, 3, 1]) + T(392, 420, 'TWO π BONDS TO ADD ACROSS', { fs: 20, c: PB }), io(t, tC1 + 0.4, 0.4)));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Only') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'but') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'terminal') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Acidic') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
