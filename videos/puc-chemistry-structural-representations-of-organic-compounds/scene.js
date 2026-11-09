// PUC Chemistry Ep 79: structural representations of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal, hydrogen ink, oxygen / chlorine (heteroatoms) orange, bond lines ink, counted hydrogens gold, wedge (towards you) teal, dash (away) violet
const NC = C.ac, HC = C.ink, OX = '#C8461B', SC = '#B7791F', PV = '#7A4FE0';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Y_ = s => `\\textcolor{${NC}}{${s}}`, G_ = s => `\\textcolor{${SC}}{${s}}`, O_ = s => `\\textcolor{${OX}}{${s}}`;

Object.assign(M.IC, {
  zig: ['M3 16l6-8 6 8 6-8'],
  map: ['M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z', 'M9 3v15', 'M15 6v15'],
  stick: ['M12 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z', 'M12 7v7', 'M7 10h10', 'M12 14l-4 7', 'M12 14l4 7'],
});

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
// zigzag drawn stroke by stroke: pts, start time, per-segment duration
const zig = (pts, t, t0, d = 0.3, c = C.ink2, w = 6, dbl = -1) => pts.slice(1).map((p, i) => { const a = pts[i], u = io(t, t0 + i * d, d);
  let s = ln(a[0], a[1], p[0], p[1], c, w, u);
  if (i === dbl) { const dx = p[0] - a[0], dy = p[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * 14, ny = dx / L * 14; s += ln(a[0] + nx + dx * 0.15, a[1] + ny + dy * 0.15, p[0] + nx - dx * 0.15, p[1] + ny - dy * 0.15, c, w, u); }
  return s; }).join('');
const badge = (x, y, s, c = SC, a = 1, w = 68) => G(`<rect x="${f1(x - w / 2)}" y="${f1(y - 19)}" width="${w}" height="38" rx="9" fill="${c}"/>` + T(x, y + 7, s, { fs: 19, c: '#fff', ls: 0 }), a);

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
const JOBS = [['map', 'Metro map', 'A CITY IN A FEW LINES', 'metro', 'LINES'], ['stick', 'Stick figure', 'A PERSON IN 5 STROKES', 'stick', 'STROKES'], ['zig', 'Zigzag', 'A MOLECULE IN 1 LINE', 'zigzag', 'ZIGZAG']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['book', 'Octane', 'octane', 'H3'], ['plus', '8 C, 18 H', 'Eight', 'H3'], ['clock', 'Wiped', 'wipes', 'H4'], ['zig', 'Zigzag', 'zigzag', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: three ways (ethanol) ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Complete: every atom, every bond', 'COMPLETE', 'P2', 'complete'], ['Single -  double =  triple ≡', 'DASHES', 'P3', 'single'], ['Condensed: group atoms, CH₃', 'CONDENSED', 'P4', 'condensed'], ['Bond line: only lines', 'BOND LINE', 'P5', 'bond'], ['Photo, note, sketch', '3 WAYS', 'P6', 'photo']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tP2 = wt('P2', 'complete'), tP3 = T0('P3'), tP4 = wt('P4', 'condensed'), tP5 = wt('P5', 'bond');
// ethanol complete: H3C-CH2-OH
const EA = { Ca: [250, 210], Cb: [410, 210], O: [560, 210], H1: [130, 210], H2: [250, 100], H3: [250, 320], H4: [410, 100], H5: [410, 320], H6: [670, 210] };
const EB = [['Ca', 'Cb'], ['Cb', 'O'], ['Ca', 'H1'], ['Ca', 'H2'], ['Ca', 'H3'], ['Cb', 'H4'], ['Cb', 'H5'], ['O', 'H6']];
function drawP(t) {
  let s = '';
  const sh = 1 - 0.22 * io(t, tP4 - 0.2, 0.5); // complete shrinks up a little when the other two arrive
  let A = '';
  EB.forEach(([a, b], i) => { const p = EA[a], q = EA[b]; A += ln(p[0], p[1], q[0], q[1], C.ink2, 5, io(t, tP2 + 0.3 + i * 0.12, 0.25)); });
  Object.entries(EA).forEach(([k, p], i) => { const a = io(t, tP2 + 0.1 + i * 0.06, 0.25); if (k[0] === 'C') A += G(atomC(p[0], p[1], 32, 'C', NC, 26), a); else if (k === 'O') A += G(atomC(p[0], p[1], 32, 'O', OX, 26), a); else A += G(atomC(p[0], p[1], 22, 'H', HC, 18), a); });
  s += `<g transform="translate(${f1(392 - 392 * sh)} ${f1(70 - 70 * sh)}) scale(${sh.toFixed(3)})">${A}</g>`;
  // P3: dash vocabulary strip, replaced at P4
  const d3 = io(t, tP3, 0.3) * (1 - io(t, tP4 - 0.3, 0.3));
  if (d3 > 0.01) s += G([['C-C', 1], ['C=C', 2], ['C≡C', 3]].map(([l, o], i) => { const x = 110 + i * 220; let b = ''; for (let k = 0; k < o; k++) b += ln(x + 38, 450 + (k - (o - 1) / 2) * 14, x + 122, 450 + (k - (o - 1) / 2) * 14, C.ink2, 5, io(t, wt('P3', ['single', 'double', 'triple'][i]) - 0.1, 0.3));
    return atomC(x, 450, 28, 'C', NC, 22) + atomC(x + 160, 450, 28, 'C', NC, 22) + b + T(x + 80, 520, ['ONE DASH', 'TWO', 'THREE'][i], { fs: 16 }); }).join(''), d3);
  const c4 = io(t, tP4 + 0.2, 0.4);
  if (c4 > 0.01) s += G(`<rect x="60" y="370" width="664" height="76" rx="14" fill="${C.soft}"/>` + T(84, 400, 'CONDENSED', { fs: 15, a: 'start' }) + lab(470, 410, 'CH₃CH₂OH', C.ink, 36), c4);
  const c5 = io(t, tP5 + 0.1, 0.3);
  if (c5 > 0.01) s += G(`<rect x="60" y="462" width="664" height="96" rx="14" fill="${C.soft}"/>` + T(84, 492, 'BOND LINE', { fs: 15, a: 'start' }) + zig([[360, 530], [430, 486], [500, 530]], t, tP5 + 0.3, 0.3) + G(lab(552, 528, 'OH', OX, 30), io(t, tP5 + 0.9, 0.3)), c5);
  put($('#pS'), s);
  M.setT(ptag, t < tP3 ? 'COMPLETE' : t < tP4 ? 'DASH = BOND' : t < tP5 ? 'CONDENSED' : 'BOND LINE');
}

/* ---------- S: butane three ways ---------- */
const tS2 = T0('S2'), tS3 = wt('S3', 'hydrogens'), tTen = wt('S3', 'Ten'), tSq = wt('S4', 'squeeze'), tS5 = T0('S5'), tZig = wt('S6', 'zigzag'), tDrop = wt('S6', 'drop');
const BX = [170, 320, 470, 620], BY = 300;
const BH = [[170, 190], [170, 410], [60, 300], [320, 190], [320, 410], [470, 190], [470, 410], [620, 190], [620, 410], [730, 300]];
const BHo = [0, 0, 0, 1, 1, 2, 2, 3, 3, 3];
const ZP = [[200, 360], [330, 260], [460, 360], [590, 260]];
function benchS(t) {
  let s = '';
  const sq = io(t, tSq, 0.9), cn = io(t, tS5, 0.6), dz = io(t, tDrop, 0.5);
  const gx = i => lerp(BX[i], 254 + i * 94, cn);
  // complete
  const cA = 1 - dz;
  let A = '';
  for (let i = 0; i < 3; i++) A += G(ln(gx(i) + 34, BY, gx(i + 1) - 34, BY, C.ink2, 6, io(t, tS2 + 0.4 + i * 0.3, 0.3)), 1 - cn);
  BH.forEach((p, i) => { const c = BHo[i], a = io(t, tS3 + i * 0.12, 0.25), x = lerp(p[0], BX[c], sq), y = lerp(p[1], BY, sq);
    A += G(ln(BX[c], BY, x, y, C.ink2, 5) + atomC(x, y, 22, 'H', HC, 18), a * (1 - sq)); });
  BX.forEach((x, i) => { A += G(atomC(x, BY, 34, 'C', NC, 28), io(t, tS2 + i * 0.15, 0.3) * (1 - sq)); A += G(lab(gx(i), BY, i === 0 || i === 3 ? 'CH₃' : 'CH₂', C.ink, 38), sq); });
  s += G(A, cA);
  s += G(T(392, 470, 'COMPLETE · EVERY ATOM, EVERY BOND', { fs: 18 }), io(t, tTen, 0.3) * (1 - io(t, tSq - 0.2, 0.3)));
  s += G(T(392, 470, 'CONDENSED · CH₃CH₂CH₂CH₃', { fs: 20, c: C.ink }), io(t, tS5 + 0.4, 0.3) * cA);
  // bond line
  if (dz > 0.01) s += zig(ZP, t, tZig - 0.1, 0.35) + G(T(392, 470, 'BOND LINE · 3 LINES', { fs: 20, c: C.ink }), io(t, tZig + 1, 0.3));
  return s;
}
function countS(t) {
  const c = io(t, tS2, 0.3), hN = Math.min(10, Math.max(0, Math.floor((t - tS3) / 0.12) + 1)), hA = io(t, tS3, 0.3), f = io(t, tTen, 0.3);
  return G(`<rect x="36" y="80" width="200" height="120" rx="14" fill="${C.soft}"/>` + T(136, 118, 'CARBONS', { fs: 15 }) + T(136, 178, '4', { fs: 50, c: NC, ls: 0 }), c) +
    G(`<rect x="260" y="80" width="200" height="120" rx="14" fill="${C.soft}"/>` + T(360, 118, 'HYDROGENS', { fs: 15 }) + T(360, 178, String(hN), { fs: 50, c: HC, ls: 0 }), hA) +
    G(lab(612, 140, 'C₄H₁₀', C.ink, 52) + T(612, 200, 'BUTANE', { fs: 16 }), f);
}
const R3 = [['Complete', tTen + 0.3], ['Condensed', wt('S5', 'condensed')], ['Bond line', tZig + 0.6]];
const chk = (x, y, c = C.ok) => `<circle cx="${x}" cy="${y}" r="16" fill="${c}"/><path d="M${x - 7} ${y}l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
function drawsS(t) {
  return R3.map(([n, tt], i) => { const y = 92 + i * 58, a = io(t, tt, 0.3);
    return `<rect x="36" y="${y}" width="712" height="48" rx="10" fill="${a > 0.5 ? C.ac2 : C.soft}"/>` + T(64, y + 32, n, { ff: 'Poppins', fw: 700, fs: 22, c: C.ink, a: 'start', ls: 0 }) + G(chk(718, y + 24), a); }).join('');
}
/* ---------- B: rules ---------- */
const tB2 = T0('B2'), tB3 = T0('B3'), tB4 = T0('B4'), tB5 = T0('B5');
const RL = [['Corner or end = carbon', tB2], ['Hydrogens not drawn', tB3], ['O, Cl written · = double', tB4], ['Rings are shapes', tB5]];
function rulesS(t) {
  return RL.map(([n, tt], i) => { const y = 78 + i * 46, a = io(t, tt - 0.1, 0.3), on = a * (i < 3 ? 1 - io(t, RL[i + 1][1], 0.25) : 1);
    return G(`<rect x="36" y="${y}" width="712" height="40" rx="9" fill="${mix(C.soft, C.ac2, on)}"/>` + T(56, y + 27, String(i + 1), { fs: 18, c: NC, a: 'start', ls: 0 }) + T(90, y + 27, n, { ff: 'Poppins', fw: 600, fs: 20, c: C.ink, a: 'start', ls: 0 }), a); }).join('');
}
const poly = (cx, cy, n, r, u, rot = -90) => { const P = []; for (let k = 0; k <= n; k++) { const a = (rot + k * 360 / n) * Math.PI / 180; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return P; };
function ringsS(t) {
  return [[3, 'cyclopropane', 'triangle'], [5, 'cyclopentane', 'pentagon'], [6, 'cyclohexane', 'hexagon']].map(([n, nm, w], i) => { const cx = 150 + i * 240, tt = wt('B5', w) - 0.15;
    return G(zig(poly(cx, 140, n, 58, 1), t, tt, 0.42 / n) + T(cx, 236, nm, { fs: 17, c: C.ink, ls: 0.4 }), io(t, tt - 0.1, 0.2)); }).join('');
}
function benchB(t) {
  let s = '';
  const a1 = 1 - io(t, tB4 - 0.2, 0.4);
  if (a1 > 0.01) {
    let A = zig(ZP, t, -9, 0.1);
    ZP.forEach((p, i) => { A += G(atomC(p[0], p[1], 24, 'C', NC, 20), io(t, tB2 + 0.4 + i * 0.25, 0.25)); });
    const hh = ['H₃', 'H₂', 'H₂', 'H₃'];
    ZP.forEach((p, i) => { A += G(lab(p[0] + 44, p[1] + (i % 2 ? -36 : 40), hh[i], SC, 26), io(t, wt('B3', 'missing') + i * 0.2, 0.3)); });
        A += G(T(392, 470, '4 CORNERS + ENDS = 4 CARBONS', { fs: 18, c: NC }), io(t, tB2 + 1.4, 0.3) * (1 - io(t, tB3, 0.3)));
    A += G(T(392, 470, 'EACH C HAS 4 BONDS · REST ARE H', { fs: 18, c: SC }), io(t, tB3 + 0.3, 0.3));
    s += G(A, a1);
  }
  const a2 = io(t, tB4 - 0.1, 0.4);
  if (a2 > 0.01) {
    const P = [[160, 360], [290, 260], [420, 360], [550, 260]];
    s += G(zig(P.slice(0, 3), t, tB4 + 0.1, 0.35, C.ink2, 6, 0) + ln(420, 360, 520, 283, C.ink2, 6, io(t, tB4 + 0.8, 0.3)) + G(lab(560, 262, 'Cl', OX, 38), io(t, wt('B4', 'chlorine') - 0.1, 0.3)) +
      G(T(392, 470, 'CH₂=CH-CH₂Cl', { fs: 24, c: C.ink, ls: 0 }), io(t, wt('B4', 'double') + 0.2, 0.3)), a2);
  }
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'BUTANE · C₄H₁₀'], [tS3, 'ADD THE HYDROGENS'], [tSq, 'SQUEEZE INTO GROUPS'], [tS5, 'CONDENSED'], [tDrop, 'BOND LINE'], [tB2, 'RULE 1 · CORNERS'], [tB3, 'RULE 2 · HIDDEN H'], [tB4, 'RULE 3 · O, Cl, ='], [tB5, 'RULE 4 · RINGS']];

/* ---------- D: read 2-methylbutane ---------- */
const LK = [['LINK 1', 'Count corners and line ends', 'CARBONS', 'D2'], ['LINK 2', 'At each carbon, count lines', 'LINES', 'D3'], ['LINK 3', 'H on it = 4 minus lines', '4 - LINES', 'D4'], ['LINK 4', 'Add the hydrogens', 'SUM', 'D5'], ['LINK 5', 'Write the formula', 'C₅H₁₂', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DPt = [[150, 380], [290, 300], [430, 380], [570, 300], [290, 150]], DLn = [1, 3, 2, 1, 1], DH = [3, 1, 2, 3, 3];
function drawD(t) {
  let s = zig(DPt.slice(0, 4), t, tD1 + 0.3, 0.3) + ln(290, 300, 290, 150, C.ink2, 6, io(t, tD1 + 1.2, 0.3));
  DPt.forEach((p, i) => { s += G(atomC(p[0], p[1], 20, 'C', NC, 17), io(t, tLk[0] + 0.6 + i * 0.25, 0.25)); });
  s += G(`<rect x="560" y="110" width="190" height="96" rx="14" fill="${C.soft}"/>` + T(655, 144, 'CARBONS', { fs: 15 }) + T(655, 190, '5', { fs: 40, c: NC, ls: 0 }), io(t, tLk[0] + 2, 0.3));
  const off = [[0, 48], [0, 50], [0, 48], [70, 0], [72, 0]];
  DPt.forEach((p, i) => { const a = io(t, tLk[1] + 0.5 + i * 0.25, 0.25) * (1 - io(t, tLk[2] + 0.3, 0.3)); s += badge(p[0] + off[i][0], p[1] + off[i][1], DLn[i] + (DLn[i] > 1 ? ' LINES' : ' LINE'), C.ink2, a, 104);
    s += badge(p[0] + off[i][0], p[1] + off[i][1], DH[i] + ' H', SC, io(t, tLk[2] + 0.4 + i * 0.25, 0.25)); });
  s += G(T(392, 490, '3 + 1 + 2 + 3 + 3 = 12 H', { fs: 26, c: SC, ls: 0 }), io(t, tLk[3] + 0.2, 0.4));
  s += G(lab(392, 545, 'C₅H₁₂', C.ink, 44), io(t, wt('D6', 'twelve') - 0.1, 0.4));
  return s;
}
const dtg = tag($('#dr'));
const DLB = ['COUNT CARBONS', 'COUNT LINES', 'FILL HYDROGENS', 'ADD THEM', 'FORMULA'];

/* ---------- C: wedge and dash ---------- */
const tC2 = T0('C2'), tWd = wt('C3', 'solid'), tDs = wt('C3', 'dashed'), tC4 = T0('C4'), tC5 = T0('C5'), tC6 = T0('C6');
function flatM(t) {
  const cx = 392, cy = 290, D = [[0, -150], [150, 0], [0, 150], [-150, 0]];
  let s = '';
  D.forEach(([dx, dy], i) => { s += ln(cx, cy, cx + dx, cy + dy, C.ink2, 6, io(t, tC1 + 0.3 + i * 0.2, 0.3)) + G(atomC(cx + dx, cy + dy, 24, 'H', HC, 20), io(t, tC1 + 0.5 + i * 0.2, 0.25)); });
  s += atomC(cx, cy, 36, 'C', NC, 28);
  s += G(T(510, 196, '90°?', { fs: 26, c: C.red, ls: 0 }) + T(392, 500, 'LOOKS FLAT · HIDES THE TETRAHEDRON', { fs: 17 }), io(t, wt('C1', 'tetrahedron'), 0.3));
  return s;
}
const wedge = (x1, y1, x2, y2, c = NC) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * 13, ny = dx / L * 13; return `<polygon points="${f1(x1)},${f1(y1)} ${f1(x2 + nx)},${f1(y2 + ny)} ${f1(x2 - nx)},${f1(y2 - ny)}" fill="${c}"/>`; };
const dash = (x1, y1, x2, y2, c = PV) => { let s = ''; const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = -dy / L, uy = dx / L; for (let i = 1; i <= 8; i++) { const f = i / 8, x = x1 + dx * f, y = y1 + dy * f, w = 2 + 11 * f; s += ln(x + ux * w, y + uy * w, x - ux * w, y - uy * w, c, 3.5); } return s; };
function wedgeM(t) {
  const cx = 392, cy = 260;
  const H = [[cx - 150, cy - 70], [cx + 150, cy - 70], [cx + 90, cy + 140], [cx - 90, cy + 140]];
  let s = ln(cx, cy, H[0][0], H[0][1], C.ink2, 6, io(t, tC2 + 0.2, 0.3)) + ln(cx, cy, H[1][0], H[1][1], C.ink2, 6, io(t, tC2 + 0.4, 0.3));
  s += G(wedge(cx, cy, H[2][0], H[2][1]), io(t, tWd - 0.1, 0.3)) + G(dash(cx, cy, H[3][0], H[3][1]), io(t, tDs - 0.1, 0.3));
  H.forEach((p, i) => { s += G(atomC(p[0], p[1], 24, 'H', HC, 20), io(t, [tC2 + 0.4, tC2 + 0.6, tWd, tDs][i], 0.25)); });
  s += atomC(cx, cy, 36, 'C', NC, 28);
  const hl = io(t, tC6, 0.3); if (hl > 0.01) s += `<circle cx="${H[3][0]}" cy="${H[3][1]}" r="36" fill="none" stroke="${PV}" stroke-width="4" opacity="${hl.toFixed(3)}"/>`;
  const L = [['IN THE PAGE', tC2, 'l'], ['TOWARDS YOU', tWd, 'w'], ['AWAY FROM YOU', tDs, 'd']];
  s += L.map(([n, tt, k], i) => { const x = 60 + i * 236; return G(`<rect x="${x}" y="470" width="220" height="80" rx="12" fill="${C.soft}"/>` + (k === 'l' ? ln(x + 24, 510, x + 74, 510, C.ink2, 6) : k === 'w' ? wedge(x + 24, 510, x + 74, 510) : dash(x + 24, 510, x + 74, 510)) + T(x + 86, 517, n, { fs: 14, c: k === 'w' ? NC : k === 'd' ? PV : C.ink, a: 'start', ls: 0.6 }), io(t, tt + 0.3, 0.3)); }).join('');
  return s;
}
const th1 = PUC.think($('#th1'), { q: 'In this wedge drawing of methane, which hydrogen points <b>away</b> from you?', opts: ['Solid wedge H', 'Dashed wedge H', 'Plain line H'], right: 1, why: '<b style="color:#7A4FE0">Dashes</b> go behind the page. Solid wedges come towards you.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{complete} = \\text{condensed} = \\text{bond line} = ${Y_('\\mathrm{C_4H_{10}}')}`);

/* ---------- W: pentan-1-ol ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`5\\ ${Y_('\\mathrm{C}')}\\ \\text{(corners + ends)}`)],
  [K(`${G_('3 + 2 + 2 + 2')}`)],
  [K(`${G_('+\\,2 = 11')}\\ \\mathrm{H}\\ \\text{on C}`)],
  [K(`11 + 1\\ ${O_('\\mathrm{(OH)}')} = 12\\ \\mathrm{H}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'CH₃(CH₂)₄OH · C₅H₁₂O'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const WP = [[100, 380], [220, 300], [340, 380], [460, 300], [580, 380]];
function drawW(t) {
  let s = zig(WP, t, tW1 + 0.6, 0.25) + ln(580, 380, 660, 318, C.ink2, 6, io(t, tW1 + 1.7, 0.25)) + G(lab(700, 300, 'OH', OX, 34), io(t, tW1 + 1.9, 0.3));
  const ca = io(t, T0('W2') + 0.4, 0.3);
  WP.forEach((p, i) => { s += G(atomC(p[0], p[1], 20, 'C', NC, 17), io(t, T0('W2') + 0.3 + i * 0.2, 0.25)); });
  const HH = [[100, 438, '3 H', wt('W3', 'far')], [220, 242, '2 H', wt('W3', 'middle')], [340, 438, '2 H', wt('W3', 'middle') + 0.3], [460, 242, '2 H', wt('W3', 'middle') + 0.6], [580, 438, '2 H', wt('W4', 'next')]];
  HH.forEach(([x, y, l, tt]) => { s += badge(x, y, l, SC, io(t, tt, 0.25)); });
  s += G(badge(700, 250, '+1 H', OX), io(t, T0('W5') + 0.3, 0.3));
  s += G(`<rect x="210" y="480" width="364" height="80" rx="14" fill="${C.soft}"/>` + T(392, 534, t < T0('W5') ? '11 H ON CARBON' : '12 H IN ALL', { fs: 26, c: SC, ls: 0 }), io(t, wt('W4', 'Eleven') - 0.1, 0.3));
  put($('#wS'), s);
  const WT = [[0, 'PENTAN-1-OL'], [T0('W2'), '5 CARBONS'], [T0('W3'), 'FILL HYDROGENS'], [T0('W5'), 'ADD THE OH H'], [T0('W6'), 'C₅H₁₂O']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Three lines, two corners: <b>2 or 3 carbons</b>', right: 'Line ends are carbons too: <b>4 carbons</b>, butane' });
const zz = x => [[x, 180], [x + 70, 110], [x + 140, 180], [x + 210, 110]];
$('#tS').innerHTML = `<g id="tM1">${zig(zz(40), 9, 0, 0.1) + zz(40).slice(1, 3).map(p => dot(p[0], p[1], 11, C.red)).join('') + T(145, 240, '2 CORNERS', { fs: 18, c: C.red })}</g>` +
  `<g id="tM2">${zig(zz(360), 9, 0, 0.1) + zz(360).map(p => dot(p[0], p[1], 11, C.ok)).join('') + T(465, 240, '4 CARBONS', { fs: 18, c: C.ok })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M40 80 L250 210 M250 80 L40 210'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'Bond line drawing to formula, expanding a condensed formula, reading wedge and dash' });
const mf = s => `\\mathrm{${s}}`;
const hexQ = `<svg width="110" height="100" style="vertical-align:middle;margin-left:14px" viewBox="0 0 110 100"><polygon points="${poly(55, 50, 6, 44, 1, -90).slice(0, 6).map(p => p.map(f1).join(',')).join(' ')}" fill="none" stroke="${C.ink2}" stroke-width="4" stroke-linejoin="round"/><line x1="${f1(55 + 30 * Math.cos(-30 * Math.PI / 180))}" y1="${f1(50 + 30 * Math.sin(-30 * Math.PI / 180))}" x2="${f1(55 + 30 * Math.cos(30 * Math.PI / 180))}" y2="${f1(50 + 30 * Math.sin(30 * Math.PI / 180))}" stroke="${C.ink2}" stroke-width="4" stroke-linecap="round"/></svg>`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: `A hexagon with one double line, drawn in bond line form. What is its molecular formula?${hexQ}`, qW: 800,
  opts: [K(mf('C_6H_{12}')), K(mf('C_6H_{10}')), K(mf('C_6H_6')), K(mf('C_6H_{14}'))], right: 1, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`6\\ \\text{corners} \\rightarrow 6\\ ${Y_('\\mathrm{C}')}`)], [K(`4 \\times ${G_('2\\,\\mathrm{H}')} = 8`)], [K(`2 \\times ${G_('1\\,\\mathrm{H}')} = 2 \\rightarrow ${mf('C_6H_{10}')}`)], [K(`\\text{A: no double bond} \\quad \\text{C: benzene}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'Four'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Structural Representations', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Complete</b>: every atom, every bond as a dash (-, =, ≡)',
    '<b>Condensed</b>: drop dashes, group atoms · CH₃CH₂CH₂CH₃',
    '<b>Bond line</b>: only lines · corners and ends are carbons',
    '<b>Hydrogens</b> on a carbon = 4 minus lines drawn',
    '<b>O, Cl, N</b> always written · rings drawn as shapes',
    '<b>Wedge</b> = towards you · <b>dash</b> = away · line = in the page'] });
const YQ = ['Write the condensed formula of propane.', 'In a bond line drawing, what does a corner stand for?', 'What does a dashed wedge tell you?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 80', topic: 'Millions of compounds, how to sort? Classification of Organic Compounds', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'drawings') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'drops') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'zigzag') + 0.1) / 0.3) * (i === 3 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'faster') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P6', 'Three') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, tP2, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const bb = io(t, tB1, 0.4);
    put($('#bS'), G(benchS(t), 1 - bb) + G(benchB(t), bb));
    M.setT($('#bnL'), t < tB4 - 0.2 ? 'MOLECULE BENCH · BUTANE' : 'MOLECULE BENCH · 3-CHLOROPROPENE');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), G(countS(t), 1 - bb) + G(rulesS(t), bb)); M.setT($('#shL'), t < tB1 ? 'ATOM COUNT' : 'BOND LINE RULES');
    const rr = io(t, tB5 - 0.2, 0.4);
    put($('#chS'), G(drawsS(t), 1 - rr) + G(ringsS(t), rr)); M.setT($('#chL'), t < tB5 - 0.2 ? 'THREE DRAWINGS' : 'RINGS ARE SHAPES');
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    put($('#dS'), drawD(t)); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · BRANCHED CHAIN'); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const z = OUT('C5'), back = T0('C6') + 0.05, out = OUT('T1');
    M.vis($('#cl'), t, t < back ? tC1 + 0.05 : back, t < back ? z : out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, t < back ? tC1 + 0.4 : back + 0.1, t < back ? z : out, { dx: 60, dy: 0, ...o });
    put($('#cS1'), flatM(t)); put($('#cS2'), wedgeM(t));
  }
  M.vis($('#th1'), t, tC5 + 0.05, T0('C6') - 0.1, { dy: 36, outDur: 0.3, ody: -16 });
  if (cOn) th1(t, { tin: tC5, tOpts: wt('C5', 'which') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'Dashes') });

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Three') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'one') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'atoms') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'worked') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'Condensed') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'worked') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, tW1 + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'corners') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'ends') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'Three') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'ends') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
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
