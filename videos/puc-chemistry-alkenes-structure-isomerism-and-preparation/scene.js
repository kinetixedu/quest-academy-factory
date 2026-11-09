// PUC Chemistry Ep 92: alkenes - structure, isomerism and preparation (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal (element in play), H ink, sp2 hybrid lobes teal, p orbitals / pi bond blue, pi electrons and moving electron pairs orange, Br brown, O violet, Zn grey, dipole gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', PB = '#2F6FEB', BR = '#9C4A1A', OC = '#7A4FE0', ZN = '#7D8597';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const col = (c, s) => `\\textcolor{${c}}{${s}}`, Cn = s => col(NC, s), Pb = s => col(PB, s), Bn = s => col(BR, s);

Object.assign(M.IC, {
  zip: ['M12 3v18', 'M9 5h3', 'M12 8h3', 'M9 11h3', 'M12 14h3', 'M10 17h4v4h-4z'],
  ladder: ['M7 3v18', 'M17 3v18', 'M7 7h10', 'M7 12h10', 'M7 17h10'],
  knot: ['M4 12c4 0 4-6 8-6s4 6 8 6', 'M4 12c4 0 4 6 8 6s4-6 8-6'],
  banana: ['M5 7c0 7 5 12 13 12', 'M5 7c2 5 6 8 13 9', 'M5 7 4 4'],
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
const dbl = (p, q, a = 1, a2 = 1) => bond(p, q, a, -7) + bond(p, q, a * a2, 7, 6, PB);
const ed = (x, y, a = 1) => a < 0.01 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="${EC}" stroke="#fff" stroke-width="2"${a < 1 ? ` opacity="${a.toFixed(3)}"` : ''}/>`;
function arrowC(p, q, bend, u, c = EC, full = true) {
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
const lobe = (x, y, an, L, W, c, a = 0.26) => `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(an)})" d="M0 0C${f1(L * .2)} ${f1(-W)} ${f1(L)} ${f1(-W)} ${f1(L)} 0C${f1(L)} ${f1(W)} ${f1(L * .2)} ${f1(W)} 0 0Z" fill="${tint(c, a)}" stroke="${c}" stroke-width="2.5"/>`;
const hyb = (x, y, an, L) => lobe(x, y, an, L, L * 0.4, NC, 0.26);
const pOrb = (x, y, L, W = 26, c = PB) => lobe(x, y, -90, L, W, c, 0.16) + lobe(x, y, 90, L, W, c, 0.16);
const CA = (p, lab = 'C', r = 28) => atom(p[0], p[1], r, lab, NC, lab.length > 1 ? 15 : 20);
const HA = p => atom(p[0], p[1], 17, 'H', HC, 14);
const BrA = p => atom(p[0], p[1], 27, 'Br', BR, 17);
const ARR = (x1, y, x2, a = 1, c = C.ink2) => G(`<line x1="${x1}" y1="${y}" x2="${x2 - 12}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${x2},${y} ${x2 - 16},${y - 8} ${x2 - 16},${y + 8}" fill="${c}"/>`, a);
const ARRd = (x, y1, y2, a = 1) => G(`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 12}" stroke="${C.ink2}" stroke-width="4" stroke-linecap="round"/><polygon points="${x},${y2} ${x - 8},${y2 - 16} ${x + 8},${y2 - 16}" fill="${C.ink2}"/>`, a);
// alkene drawer: subs [upper-left, lower-left, upper-right, lower-right], 'Me' or 'H'
function alk(cx, cy, subs, o = {}) {
  const k = o.k ?? 1, c1 = [cx - 62 * k, cy], c2 = [cx + 62 * k, cy], A = [225, 135, 315, 45], base = [c1, c1, c2, c2];
  let s = dbl(c1, c2);
  const pts = subs.map((x, i) => ang(base[i], A[i], (x === 'Me' ? 92 : 80) * k));
  s += pts.map((p, i) => bond(base[i], p)).join('') + CA(c1) + CA(c2);
  s += pts.map((p, i) => subs[i] === 'Me' ? atom(p[0], p[1], 30 * k, 'CH₃', NC, 15 * k) : subs[i] === 'Cl' ? atom(p[0], p[1], 26 * k, 'Cl', '#3C9A5F', 17 * k) : atom(p[0], p[1], 17 * k, 'H', HC, 14 * k)).join('');
  return { s, pts, c1, c2 };
}

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['zip', 'Zip', 'LOCKS TWO SIDES', 'zip'], ['ladder', 'Ladder', 'TWO RAILS, NO TWIST', 'ladder'], ['knot', 'Double knot', 'WILL NOT TURN', 'knot']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">LOCKED</div></div>`).join('');
const KIT = [['banana', 'Raw bananas ripen faster', 'faster', 'H3'], ['banana', 'Ripe fruit gives off ethene', 'ethene', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['One carbon carbon double bond', 'C=C', 'P2', 'double'], ['General formula CₙH₂ₙ', 'FORMULA', 'P2', 'formula'], ['Names end in -ene', '-ENE', 'P3', 'Names'], ['Same formula, new arrangement', 'ISOMERS', 'P4', 'structural'], ['C₄H₈: bond moves, or chain branches', '3 FORMS', 'P5', 'For']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const skel = (P, bonds, dbI, a = 1) => G(bonds.map(([i, j], k) => k === dbI ? dbl(P[i], P[j]) : bond(P[i], P[j])).join('') + P.map(p => CA(p, 'C', 22)).join(''), a);
const ISO = [['BUT-1-ENE', [[150, 0], [230, -24], [310, 0], [390, -24]], 0, () => wt('P5', 'end')],
  ['BUT-2-ENE', [[150, 0], [230, -24], [310, 0], [390, -24]], 1, () => wt('P5', 'middle')],
  ['2-METHYLPROP-1-ENE', [[150, 0], [230, -24], [310, 0], [230, 50]], 1, () => wt('P6', 'branch')]];
function drawP(t) {
  const iso = io(t, T0('P4') + 0.3, 0.5);
  let s = '';
  if (iso < 0.99) { const e = alk(392, 210, ['H', 'H', 'H', 'H'], { k: 1.2 });
    let q = e.s + T(392, 344, 'ETHENE · C₂H₄', { fs: 22, c: C.ink, ls: 0.6 });
    const NMS = [['ETHENE', 'C₂H₄', 2], ['PROPENE', 'C₃H₆', 3], ['BUTENE', 'C₄H₈', 4]];
    NMS.forEach(([n, f, c], i) => { const a = io(t, wt('P3', i === 0 ? 'Ethene' : i === 1 ? 'propene' : 'butene') - 0.1, 0.3), x = 36 + i * 242;
      q += G(`<rect x="${x}" y="410" width="226" height="110" rx="14" fill="${C.soft}"/>` + T(x + 113, 452, n, { ff: 'Poppins', fw: 700, fs: 24, c: C.ink, ls: 0.4 }) + T(x + 113, 490, `${f} · ${c} C`, { fs: 18, c: NC, ls: 0.4 }), a); });
    s += G(q, (1 - iso) * io(t, T0('P2'), 0.4)); }
  if (iso > 0.01) ISO.forEach(([n, P, d], i) => { const a = io(t, ISO[i][3]() - 0.1, 0.35), y = 150 + i * 140; const pts = P.map(([x, dy]) => [x, y + dy + (i === 2 ? -6 : 10)]);
    const bonds = i === 2 ? [[1, 2], [0, 1], [1, 3]] : [[0, 1], [1, 2], [2, 3]];
    s += G(skel(pts, bonds, d) + T(460, y + 18, n, { ff: 'Poppins', fw: 700, fs: 24, c: C.ink, a: 'start', ls: 0.3 }) + T(460, y + 48, 'C₄H₈', { fs: 17, c: NC, a: 'start' }), a * iso); });
  if (iso > 0.01) s += G(T(392, 560, 'C SKELETON · H ATOMS NOT SHOWN', { fs: 14 }), iso);
  put($('#pS'), s);
  M.setT(ptag, t < T0('P3') ? 'ETHENE · C₂H₄' : t < T0('P4') ? 'CₙH₂ₙ' : 'STRUCTURAL ISOMERS · C₄H₈');
}

/* ---------- S: building the double bond ---------- */
const tSp2 = T0('S2'), tSg = wt('S3', 'overlap'), tPo = wt('S4', 'one'), tPi = wt('S4', 'side'), tWk = T0('S5'), tS6 = T0('S6'), tTw = wt('S7', 'twist');
function bench(t) {
  const ap = io(t, tSg - 0.4, 1.2), c1 = [lerp(220, 300, ap), 300], c2 = [lerp(564, 484, ap), 300], th = 90 * io(t, tTw, 1.8), ct = Math.cos(th * Math.PI / 180);
  let s = '';
  const hl = io(t, tSp2 + 0.3, 0.6), ha = io(t, tSg + 0.4, 0.5);
  // hybrid lobes, the inner pair turns into the sigma overlap
  [[c1, [120, 240], 0], [c2, [60, 300], 180]].forEach(([c, outs, inn]) => { s += G(outs.map(a => hyb(c[0], c[1], a, 86)).join('') + hyb(c[0], c[1], inn, 86), hl * (1 - ha * 0.55)); });
  s += G(`<ellipse cx="392" cy="300" rx="70" ry="24" fill="${tint(NC, 0.35)}" stroke="${NC}" stroke-width="2.5"/>` + T(392, 350, 'σ', { ff: 'Poppins', fw: 700, fs: 26, c: NC, ls: 0 }), io(t, tSg, 0.4));
  // p orbitals and pi overlap
  const pa = io(t, tPo, 0.5), pia = io(t, tPi, 0.5) * ct;
  s += G(pOrb(c1[0], c1[1], 92) + `<g transform="translate(${f1(c2[0])} ${f1(c2[1])}) scale(1 ${f1(Math.max(0.12, ct))})">${pOrb(0, 0, 92)}</g>` + (th > 2 ? `<ellipse cx="${f1(c2[0])}" cy="${c2[1]}" rx="12" ry="${f1(10 + 26 * (1 - ct))}" fill="${tint(PB, 0.12)}" stroke="${PB}" stroke-width="2" opacity="${(1 - ct).toFixed(3)}"/>` : ''), pa);
  s += G([-1, 1].map(k => `<path d="M${f1(c1[0])} ${300 + k * 66} C ${f1(c1[0] + 40)} ${300 + k * 96}, ${f1(c2[0] - 40)} ${300 + k * 96}, ${f1(c2[0])} ${300 + k * 66}" fill="none" stroke="${PB}" stroke-width="5" stroke-linecap="round"/>`).join('') + T(392, 186, 'π', { ff: 'Poppins', fw: 700, fs: 28, c: PB, ls: 0 }), pia);
  s += ed(392, 222, io(t, tWk, 0.4) * ct) + ed(392, 378, io(t, tWk, 0.4) * ct);
  // H atoms and carbons
  const hs = [[c1, 150], [c1, 210], [c2, 30], [c2, -30]];
  s += G(hs.map(([c, a], i) => { let p = ang(c, a, 96); if (i > 1) p = [p[0], c[1] + (p[1] - c[1]) * ct]; return bond(c, p) + HA(p); }).join(''), ha);
  s += CA(c1) + CA(c2);
  s += G(T(392, 548, th > 80 ? 'TWISTED · π BOND WOULD BREAK' : 'σ + π = C=C', { fs: 20, c: th > 80 ? C.red : C.ink }), io(t, tWk, 0.4));
  return s;
}
function info(t) {
  const b = io(t, tS6, 0.4);
  let s = G(hyb(150, 150, 0, 70) + hyb(150, 150, 120, 70) + hyb(150, 150, 240, 70) + `<circle cx="150" cy="150" r="9" fill="${NC}"/>` + T(300, 140, '120°', { fs: 44, c: C.ink, ls: 0, a: 'start' }) + T(302, 180, 'sp² · FLAT · TRIGONAL', { fs: 17, a: 'start' }) + T(302, 214, '+ ONE p LEFT OVER', { fs: 17, c: PB, a: 'start' }), 1 - b);
  if (b > 0.01) { const rows = [[36, 'LENGTH · pm', [['C-C', 154], ['C=C', 134]], 1.45], [408, 'ENTHALPY · kJ/mol', [['C-C', 348], ['C=C', 681]], 0.36]];
    let q = ''; rows.forEach(([x, h, rr, k], j) => { q += T(x, 84, h, { fs: 15, a: 'start' }); rr.forEach(([n, v], i) => { const y = 104 + i * 66, g = io(t, tS6 + (j ? wt('S6', 'stronger') - tS6 : 0.3) + i * 0.4, 0.7);
      q += T(x, y + 30, n, { fs: 22, c: C.ink, a: 'start', ls: 0 }) + `<rect x="${x + 70}" y="${y + 6}" width="${f1(v * k * g)}" height="36" rx="8" fill="${tint(i ? NC : C.ink2, 0.2)}" stroke="${i ? NC : C.ink2}" stroke-width="2.5"/>` + G(T(x + 82 + v * k, y + 32, String(v), { fs: 22, c: i ? NC : C.ink, a: 'start', ls: 0 }), g); }); });
    s += G(q, b); }
  return s;
}
function kinds(t) {
  const tw = io(t, tTw - 0.3, 0.4), th = 90 * io(t, tTw, 1.8), ct = Math.cos(th * Math.PI / 180);
  let s = G(hyb(90, 150, 0, 80) + hyb(250, 150, 180, 80) + `<ellipse cx="170" cy="150" rx="40" ry="16" fill="${tint(NC, 0.35)}"/>` + T(170, 232, 'σ · HEAD ON · STRONG', { fs: 16, c: NC }), (1 - tw) * io(t, tSg, 0.4)) + G(
    pOrb(520, 150, 64, 22) + pOrb(620, 150, 64, 22) + `<path d="M520 96 Q570 70 620 96 M520 204 Q570 230 620 204" stroke="${PB}" stroke-width="4" fill="none"/>` + T(570, 250, 'π · SIDE BY SIDE · WEAK', { fs: 16, c: PB }), (1 - tw) * io(t, tPi, 0.4));
  if (tw > 0.01) s += G(T(36, 100, 'TWIST', { fs: 16, a: 'start' }) + T(36, 150, Math.round(th) + '°', { fs: 48, c: C.ink, a: 'start', ls: 0 }) + T(300, 100, 'π OVERLAP', { fs: 16, a: 'start', c: PB }) +
    `<rect x="300" y="122" width="440" height="40" rx="10" fill="${C.soft}"/><rect x="300" y="122" width="${f1(440 * ct)}" height="40" rx="10" fill="${PB}"/>` + T(520, 220, ct < 0.1 ? 'NO OVERLAP · NO ROTATION' : 'OVERLAP SHRINKS', { fs: 18, c: ct < 0.1 ? C.red : C.ink }), tw);
  return s;
}
function geoB(t, which) {
  const cis = which === 'cis', e = alk(392, which === 'cis' ? 290 : 140, cis ? ['Me', 'H', 'Me', 'H'] : ['Me', 'H', 'H', 'Me'], { k: cis ? 1.25 : 0.9 });
  let s = e.s, a = io(t, wt('B2', cis ? 'same' : 'opposite') - 0.1, 0.4);
  if (cis) s += G(`<rect x="${f1(e.pts[0][0] - 50)}" y="${f1(e.pts[0][1] - 52)}" width="${f1(e.pts[2][0] - e.pts[0][0] + 100)}" height="104" rx="20" fill="none" stroke="${NC}" stroke-width="3" stroke-dasharray="8 8"/>` + T(392, 500, 'CIS · SAME SIDE', { ff: 'Poppins', fw: 700, fs: 28, c: NC, ls: 0.4 }), a);
  else s += G(`<line x1="${f1(e.pts[0][0])}" y1="${f1(e.pts[0][1])}" x2="${f1(e.pts[3][0])}" y2="${f1(e.pts[3][1])}" stroke="${NC}" stroke-width="3" stroke-dasharray="8 8"/>` + T(660, 150, 'TRANS', { ff: 'Poppins', fw: 700, fs: 26, c: NC, ls: 0.4 }) + T(660, 182, 'OPPOSITE', { fs: 15, c: NC }), a);
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'sp² CARBONS'], [tSg, 'σ BOND'], [tPi, 'π BOND'], [tWk, 'π = WEAK HALF'], [tTw, 'TWIST?'], [tB1, 'BUT-2-ENE'], [T0('B3'), 'GEOMETRICAL ISOMERS']];
const th1 = PUC.think($('#th1'), { q: 'Can <b>propene</b>, CH₃CH=CH₂, show <span style="color:#0FA3A3">cis-trans</span> isomerism?', opts: ['Yes', 'No'], right: 1, why: '<b>No</b>: one carbon holds two H. Each C=C carbon needs <b>two different groups</b>.' });

/* ---------- D: four ways to make alkenes ---------- */
const LK = [['LINK 1', 'Alkyne + H₂ on Lindlar\'s catalyst', 'CIS', 'D2'], ['LINK 2', 'Alkyl halide + alcoholic KOH', '- HX', 'D3'], ['ORDER', 'I > Br > Cl · 3° > 2° > 1°', 'FASTEST', 'D4'], ['LINK 3', 'Vicinal dihalide + zinc', '- ZnX₂', 'D5'], ['LINK 4', 'Alcohol + conc. H₂SO₄, heat', '- H₂O', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DP = [
  t => { // alkyne + H2 (Lindlar) -> cis alkene
    const u = io(t, wt('D2', 'hydrogen') - 0.2, 1.4), c1 = [330, 250], c2 = [454, 250];
    const m1 = L2([226, 250], ang(c1, 225, 92), u), m2 = L2([558, 250], ang(c2, 315, 92), u), h1 = L2([330, 452], ang(c1, 135, 82), u), h2 = L2([454, 452], ang(c2, 45, 82), u);
    let s = `<rect x="150" y="474" width="484" height="26" rx="8" fill="${tint(ZN, 0.35)}"/>` + T(392, 534, 'Pd ON CHARCOAL · POISONED = LINDLAR', { fs: 16, c: C.ink });
    s += bond(c1, c2, 1, -12, 6, PB) + bond(c1, c2, 1, 0) + bond(c1, c2, 1 - u, 12, 6, PB);
    s += bond(c1, m1) + bond(c2, m2) + bond(c1, h1, u) + bond(c2, h2, u) + CA(c1) + CA(c2) + atom(m1[0], m1[1], 30, 'CH₃', NC, 15) + atom(m2[0], m2[1], 30, 'CH₃', NC, 15) + HA(h1) + HA(h2);
    s += G(T(392, 140, 'BOTH H FROM THE SAME SIDE · CIS', { fs: 18, c: NC }), io(t, wt('D2', 'Lindlar'), 0.4));
    return s;
  },
  t => { // E2 dehydrohalogenation with curved arrows
    const a1 = io(t, wt('D3', 'pulls'), 0.6), a2 = io(t, wt('D3', 'beta') - 0.2, 0.6), a3 = io(t, wt('D3', 'halogen'), 0.6), u = io(t, wt('D3', 'dehydrohalogenation') - 0.3, 1.2);
    const cb = [300, 290], ca = [430, 290];
    const hb = L2([300, 382], [170, 470], u), oh = L2([196, 480], [150, 480], u), br = L2([556, 290], [640, 290], u);
    const hs = [[cb, -90, -120], [cb, 180, 120], [ca, -90, -60], [ca, 90, 60]];
    let s = hs.map(([c, a0, a1]) => { const p = ang(c, lerp(a0, a1, u), 88); return bond(c, p) + HA(p); }).join('');
    s += bond(cb, ca) + bond(cb, ca, u, 12, 6, PB) + bond(cb, hb, 1 - u) + bond(ca, br, 1 - u);
    s += CA(cb) + CA(ca) + HA(hb) + atom(br[0], br[1], 28, u > 0.6 ? 'Br⁻' : 'Br', BR, 16);
    s += atom(oh[0], oh[1], 26, 'O', OC, 18) + atom(oh[0] - 34, oh[1] + 18, 15, 'H', HC, 12) + G(T(oh[0] + 2, oh[1] - 34, 'OH⁻', { fs: 18, c: OC, ls: 0 }), 1 - u) + G(T(160, 530, 'H₂O', { fs: 20, c: C.ink, ls: 0 }), u);
    s += G(arrowC([214, 456], [288, 396], -30, a1) + arrowC([306, 340], [362, 298], -26, a2) + arrowC([492, 284], [548, 262], -26, a3), 1 - u);
    s += G(T(300, 180, 'β', { ff: 'Poppins', fw: 700, fs: 24, c: NC, ls: 0 }) + T(430, 180, 'α', { ff: 'Poppins', fw: 700, fs: 24, c: NC, ls: 0 }), 1 - u);
    s += G(T(392, 140, 'β-ELIMINATION · C=C FORMS', { fs: 18, c: NC }), u) + T(620, 140, 'alc. KOH', { fs: 18, c: OC, ls: 0 });
    return s;
  },
  t => { // reactivity order
    let s = T(200, 120, 'HALOGEN LEAVES', { fs: 16 }) + T(584, 120, 'ALKYL HALIDE', { fs: 16 });
    [['I', 'iodine', BR], ['Br', 'bromine', BR], ['Cl', 'chlorine', '#3C9A5F']].forEach(([n, w, c], i) => { const a = io(t, wt('D4', w) - 0.1, 0.3); s += G(`<rect x="110" y="${150 + i * 110}" width="180" height="84" rx="14" fill="${i ? C.soft : tint(NC, 0.16)}" stroke="${i ? C.line : NC}" stroke-width="2.5"/>` + T(200, 205 + i * 110, n, { ff: 'Poppins', fw: 700, fs: 34, c: C.ink, ls: 0 }), a); });
    [['3°', 'tertiary'], ['2°', 'secondary'], ['1°', 'primary']].forEach(([n, w], i) => { const a = io(t, wt('D4', w) - 0.1, 0.3); s += G(`<rect x="494" y="${150 + i * 110}" width="180" height="84" rx="14" fill="${i ? C.soft : tint(NC, 0.16)}" stroke="${i ? C.line : NC}" stroke-width="2.5"/>` + T(584, 205 + i * 110, n, { ff: 'Poppins', fw: 700, fs: 34, c: C.ink, ls: 0 }), a); });
    s += G(`<line x1="392" y1="160" x2="392" y2="460" stroke="${C.line}" stroke-width="3"/>` + T(392, 520, 'TOP = FASTEST', { fs: 18, c: NC }), io(t, wt('D4', 'iodine'), 0.4));
    return s;
  },
  t => { // vicinal dihalide + Zn
    const z = io(t, wt('D5', 'Zinc') - 0.2, 0.8), u = io(t, wt('D5', 'both') - 0.1, 1.2), c1 = [330, 330], c2 = [454, 330];
    const zn = L2([392, 30], [392, 140], z), b1 = L2([330, 222], [300, 140], u), b2 = L2([454, 222], [484, 140], u);
    let s = [[c1, 180], [c1, 120], [c2, 0], [c2, 60]].map(([c, a]) => { const p = ang(c, a, 86); return bond(c, p) + HA(p); }).join('');
    s += bond(c1, c2) + bond(c1, c2, u, 12, 6, PB) + bond(c1, b1, 1 - u) + bond(c2, b2, 1 - u) + bond(zn, b1, u) + bond(zn, b2, u);
    s += CA(c1) + CA(c2) + BrA(b1) + BrA(b2) + G(atom(zn[0], zn[1], 30, 'Zn', ZN, 18), z);
    s += G(T(392, 220, 'ZnBr₂', { fs: 20, c: C.ink, ls: 0 }), io(t, wt('D5', 'dehalogenation') - 0.3, 0.4)) + G(T(392, 500, 'NEIGHBOURING CARBONS · DEHALOGENATION', { fs: 17, c: NC }), u);
    return s;
  },
  t => { // alcohol + conc H2SO4
    const u = io(t, wt('D6', 'water') - 0.2, 1.3), c1 = [330, 330], c2 = [454, 330];
    const o = L2([454, 226], [400, 150], u), ho = L2([500, 170], [446, 112], u), h = L2([330, 236], [356, 112], u);
    let s = [[c1, 180], [c1, 120], [c2, 0], [c2, 60]].map(([c, a]) => { const p = ang(c, a, 86); return bond(c, p) + HA(p); }).join('');
    s += bond(c1, c2) + bond(c1, c2, u, 12, 6, PB) + bond(c2, o, 1 - u) + bond(c1, h, 1 - u) + bond(o, ho) + bond(o, h, u);
    s += CA(c1) + CA(c2) + atom(o[0], o[1], 26, 'O', OC, 18) + HA(ho) + HA(h);
    s += T(600, 520, 'conc. H₂SO₄ + HEAT', { fs: 17, c: C.ink }) + G(T(392, 200, 'H₂O', { fs: 20, c: C.ink, ls: 0 }), io(t, wt('D6', 'dehydration') - 0.3, 0.4)) + G(T(392, 470, 'ETHANOL → ETHENE', { fs: 20, c: NC }), io(t, wt('D6', 'Ethanol'), 0.4));
    return s;
  },
];
const dtg = tag($('#dr'));
const DLB = ['FROM ALKYNES', 'DEHYDROHALOGENATION', 'HOW FAST', 'DEHALOGENATION', 'ACIDIC DEHYDRATION'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{CH_3CH_2OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ \\Delta} ${Cn('\\mathrm{CH_2{=}CH_2}')} + \\mathrm{H_2O}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Bn('\\mathrm{Br}')}\\ \\text{on C1 and C2} \\Rightarrow \\text{vicinal}`)],
  [K(`\\mathrm{Zn} + 2${Bn('\\mathrm{Br}')} \\rightarrow \\mathrm{ZnBr_2}`)],
  [K(`\\text{C1, C2 lose a bond each} \\rightarrow ${Pb('\\pi')}`)],
  [K(`${Cn('\\mathrm{CH_3CH{=}CH_2}')}\\ \\text{(propene)}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Atoms balanced: 3 C, 6 H, 2 Br, 1 Zn'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
function drawW(t) {
  const c3 = [200, 300], c2 = [330, 300], c1 = [460, 300], z = io(t, wt('W3', 'Zinc') - 0.2, 0.8), u = io(t, wt('W3', 'bromide') - 0.3, 1.2), pi = io(t, wt('W4', 'pair') - 0.3, 0.9);
  const zn = L2([395, 20], [395, 120], z), b2 = L2([330, 192], [305, 120], u), b1 = L2([460, 192], [485, 120], u);
  let s = '';
  const hs = [[c2, 90], [c1, 0], [c1, 90]];
  s += hs.map(([c, a]) => { const p = ang(c, a, 84); return bond(c, p) + HA(p); }).join('');
  s += bond(c3, c2) + bond(c2, c1) + bond(c2, c1, pi, 12, 6, PB) + bond(c2, b2, 1 - u) + bond(c1, b1, 1 - u) + bond(zn, b1, u) + bond(zn, b2, u);
  s += atom(c3[0], c3[1], 30, 'CH₃', NC, 15) + CA(c2) + CA(c1) + BrA(b2) + BrA(b1) + G(atom(zn[0], zn[1], 30, 'Zn', ZN, 18), z);
  s += ed(lerp(330, 380, pi), lerp(260, 312, pi), u * (1 - io(t, T1('W4'), 0.4))) + ed(lerp(460, 410, pi), lerp(260, 312, pi), u * (1 - io(t, T1('W4'), 0.4)));
  const lab = io(t, T0('W2') + 0.3, 0.4);
  s += G([[c3, 'C3'], [c2, 'C2'], [c1, 'C1']].map(([c, n]) => T(c[0], 418, n, { fs: 18, c: NC, ls: 0 })).join(''), lab * (1 - io(t, T0('W5'), 0.3)));
  s += G(T(392, 446, 'CH₃-CH=CH₂ · PROPENE', { fs: 22, c: C.ink, ls: 0.4 }), io(t, T0('W5'), 0.4));
  const ck = io(t, wt('W6', 'Balanced') - 0.2, 0.3);
  [['C', 3], ['H', 6], ['Br', 2], ['Zn', 1]].forEach(([e, n], i) => { const x = 36 + i * 182, a = io(t, T0('W6') + i * 0.5, 0.3);
    s += G(`<rect x="${x}" y="470" width="166" height="62" rx="12" fill="${mix(C.soft, C.okBg, ck)}"/>` + T(x + 70, 510, `${e} ${n} | ${n}`, { fs: 22, c: C.ink, ls: 0 }) + G(`<path d="M${x + 132} 498 l8 8 l14 -14" stroke="${C.ok}" stroke-width="4" fill="none" stroke-linecap="round"/>`, ck), a); });
  put($('#wS'), s);
  M.setT(wtg, t < T0('W3') ? 'VICINAL: C1 + C2' : t < T0('W4') ? 'ZINC TAKES BOTH Br' : t < T0('W5') ? 'NEW π BOND' : t < T0('W6') ? 'PROPENE' : 'BALANCED');
}

/* ---------- C: one alkyne, two twins ---------- */
const yne = (cx, y) => { const c1 = [cx - 50, y], c2 = [cx + 50, y], m1 = [cx - 140, y], m2 = [cx + 140, y];
  return bond(c1, c2, 1, -11) + bond(c1, c2) + bond(c1, c2, 1, 11, 6, PB) + bond(m1, c1) + bond(c2, m2) + atom(m1[0], m1[1], 26, 'CH₃', NC, 13) + atom(m2[0], m2[1], 26, 'CH₃', NC, 13) + CA(c1, 'C', 22) + CA(c2, 'C', 22); };
function dip(e, cis, a) {
  if (a < 0.01) return '';
  const ar = (p, q) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l; return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0] - ux * 14)}" y2="${f1(q[1] - uy * 14)}" stroke="${GC}" stroke-width="4"/><polygon points="${f1(q[0])},${f1(q[1])} ${f1(q[0] - ux * 16 - uy * 8)},${f1(q[1] - uy * 16 + ux * 8)} ${f1(q[0] - ux * 16 + uy * 8)},${f1(q[1] - uy * 16 - ux * 8)}" fill="${GC}"/>`; };
  const m = cis ? [e.pts[0], e.pts[2]] : [e.pts[0], e.pts[3]], c = cis ? [e.c1, e.c2] : [e.c1, e.c2];
  let s = m.map((p, i) => ar(L2(p, c[i], 0.25), L2(p, c[i], 0.75))).join('');
  s += cis ? ar([392, 262], [392, 338]) + T(566, 306, 'μ = 0.33 D', { fs: 20, c: GC, a: 'start', ls: 0 }) : T(392, 474, 'PULLS CANCEL · μ ≈ 0', { fs: 20, c: GC, ls: 0 });
  return G(s, a);
}
function drawC(t) {
  const lA = io(t, T0('C2'), 0.4), rA = io(t, T0('C3'), 0.4), y0 = io(t, tC1 + 0.4, 0.4), dp = io(t, T0('C4'), 0.4), mp = io(t, T0('C5'), 0.4);
  const ec = alk(392, 360, ['Me', 'H', 'Me', 'H']), et = alk(392, 360, ['Me', 'H', 'H', 'Me']);
  put($('#cS1'), G(yne(392, 120), y0) + ARRd(392, 164, 240, lA) + G(T(410, 214, 'H₂ · LINDLAR', { fs: 16, c: C.ink, a: 'start' }), lA) + G(ec.s + T(392, 526, 'CIS-BUT-2-ENE', { ff: 'Poppins', fw: 700, fs: 24, c: NC, ls: 0.3 }), lA) + dip(ec, true, dp));
  put($('#cS2'), G(yne(392, 120), y0) + ARRd(392, 164, 240, rA) + G(T(410, 214, 'Na · LIQUID NH₃', { fs: 16, c: C.ink, a: 'start' }), rA) + G(et.s + T(392, 526, 'TRANS-BUT-2-ENE', { ff: 'Poppins', fw: 700, fs: 24, c: NC, ls: 0.3 }), rA) + dip(et, false, dp) +
    G(`<rect x="560" y="250" width="200" height="56" rx="12" fill="${C.okBg}"/>` + T(660, 274, 'HIGHER', { fs: 15, c: C.ok }) + T(660, 296, 'MELTING POINT', { fs: 15, c: C.ok }), mp));
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Lindlar\'s catalyst gives <b>trans</b> alkenes', right: 'Lindlar gives <b>cis</b>; sodium in liquid NH₃ gives <b>trans</b>' });
{ const a = alk(170, 120, ['Me', 'H', 'Me', 'H'], { k: 0.62 }), b = alk(500, 120, ['Me', 'H', 'H', 'Me'], { k: 0.62 });
  $('#tS').innerHTML = `<g id="tM1">${a.s}${T(170, 232, 'LINDLAR → CIS', { fs: 17, c: C.ok })}</g><g id="tM2">${b.s}${T(500, 232, 'Na / NH₃ → TRANS', { fs: 17, c: C.ok })}</g>`; }
const where = PUC.where($('#wa'), { on: [], type: 'Preparation methods with reagents; which compound shows cis-trans isomerism' });
const mf = s => `\\mathrm{${s}}`;
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these compounds shows <b>cis-trans isomerism</b>?', qW: 820,
  opts: [K(mf('CH_2{=}CHCl')), K(mf('(CH_3)_2C{=}CHCH_3')), K(mf('CH_3CH{=}CHCl')), K(mf('CCl_2{=}CH_2'))], right: 2, optW: 474, optY: 300, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`\\text{C: } ${mf('CH_3, H')}\\ |\\ ${mf('Cl, H')}\\ \\checkmark`)], [K(`\\text{A: } ${mf('H, H')} \\quad \\text{D: } ${mf('Cl, Cl')}`)], [K(`\\text{B: } ${mf('CH_3, CH_3')}`)], [K(`\\text{same pair} \\Rightarrow \\text{no cis-trans}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Alkenes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Alkene</b>: one C=C · CₙH₂ₙ · names end in -ene',
    '<b>C=C</b> = σ (head on) + π (side by side) · each C sp², 120°',
    '<b>C=C</b> 134 pm, 681 kJ/mol · C-C 154 pm, 348 kJ/mol',
    '<b>No rotation</b>: cis (same side) and trans (opposite) isomers',
    '<b>Alkyne + H₂</b>: Lindlar gives cis · Na in liquid NH₃ gives trans',
    '<b>Eliminate</b>: RX + alc. KOH · vicinal dihalide + Zn · alcohol + conc. H₂SO₄'] });
const YQ = ['Why can a carbon carbon double bond not rotate?', 'Which reagent turns an alkyl halide into an alkene?', 'Does Lindlar\'s catalyst give a cis or a trans alkene?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 93', topic: 'Peroxide flips the rule? Reactions of Alkenes, Markovnikov\'s Rule', y: 764 });

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
  document.querySelectorAll('.wq').forEach(q => { if (q.offsetWidth > 340) q.style.fontSize = Math.floor(24 * 340 / q.offsetWidth) + 'px'; });
  x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'locks') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'double') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - tKit[i]) / 0.3) * (i ? 1 : 1 - M.io((t - tKit[1]) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, tH5 - 0.05, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'alkene') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
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
    const b = io(t, tB1 - 0.1, 0.4);
    put($('#bS'), G(bench(t), 1 - b) + G(geoB(t, 'cis'), b));
    put($('#shS'), G(info(t), 1 - b) + G(geoB(t, 'trans'), b));
    put($('#chS'), G(kinds(t), 1 - b) + G(T(392, 120, 'SAME ATOMS · SAME BONDS', { fs: 20, c: C.ink }) + T(392, 160, 'DIFFERENT ARRANGEMENT IN SPACE', { fs: 20, c: C.ink }) + G(`<rect x="132" y="190" width="520" height="56" rx="14" fill="${C.ac2}"/>` + T(392, 226, 'GEOMETRICAL · CIS-TRANS ISOMERISM', { fs: 18, c: NC }), io(t, wt('B3', 'geometrical'), 0.4)), b * io(t, T0('B3'), 0.4)));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · C=C' : 'CIS-BUT-2-ENE'); M.setT($('#shL'), t < tB1 ? (t < tS6 ? 'EACH CARBON' : 'SINGLE vs DOUBLE BOND') : 'TRANS-BUT-2-ENE'); M.setT($('#chL'), t < tB1 ? (t < tTw - 0.3 ? 'TWO KINDS OF OVERLAP' : 'TWIST TEST') : 'NAME IT');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'propene') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'One') });

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    let s = ''; const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    DP.forEach((f, i) => { const a = io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1); if (a > 0.01) s += G(f(t), a); });
    put($('#dS'), s); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · ' + LK[ki][0]); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'To') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'pull') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'neighbouring') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'What') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, T0('W6') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'dibromopropane') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.25, out, { dx: 60, dy: 0, ...o });
    drawC(t);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Lindlar') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'gives') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X3', 'cis') - 0.1, 0.3).toFixed(3)); attr($('#tM2'), 'opacity', io(t, wt('X3', 'Sodium') - 0.1, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Board') });
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
