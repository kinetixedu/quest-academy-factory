// PUC Chemistry Ep 81: IUPAC nomenclature of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: main chain / word root teal, side groups / prefix gold, functional group / suffix orange, locant numbers violet
const NC = C.ac, HC = C.ink, OX = '#C8461B', SC = '#B7791F', PV = '#7A4FE0';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Y_ = s => `\\textcolor{${NC}}{${s}}`, G_ = s => `\\textcolor{${SC}}{${s}}`, O_ = s => `\\textcolor{${OX}}{${s}}`, V_ = s => `\\textcolor{${PV}}{${s}}`;

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
const num = (x, y, n, a = 1, c = PV) => G(`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" fill="#fff" stroke="${c}" stroke-width="2.5"/>` + T(x, y + 7, String(n), { fs: 18, c, ls: 0 }), a);
const poly = (cx, cy, n, r, rot = -90) => { const P = []; for (let k = 0; k <= n; k++) { const a = (rot + k * 360 / n) * Math.PI / 180; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return P; };
function ring(cx, cy, n, r, t, t0, dbl = [], w = 5) {
  const P = poly(cx, cy, n, r), d = 0.5 / n; let s = '';
  for (let i = 0; i < n; i++) { const a = P[i], b = P[i + 1]; s += ln(a[0], a[1], b[0], b[1], C.ink2, w, io(t, t0 + i * d, d));
    if (dbl.includes(i)) { const ix = cx - (a[0] + b[0]) / 2, iy = cy - (a[1] + b[1]) / 2, k = 10 / Math.hypot(ix, iy); s += ln(lerp(a[0], b[0], 0.2) + ix * k, lerp(a[1], b[1], 0.2) + iy * k, lerp(a[0], b[0], 0.8) + ix * k, lerp(a[1], b[1], 0.8) + iy * k, C.ink2, w, io(t, t0 + 0.5, 0.2)); } }
  return s;
}
// coloured name: parts [[text, colour]]
const nameSVG = (x, y, parts, fs = 40) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Poppins" font-weight="700" font-size="${fs}" text-anchor="middle">${parts.map(([s, c]) => `<tspan fill="${c}">${s}</tspan>`).join('')}</text>`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tC1 = T0('C1'), tT = T0('T1'), tW1 = T0('W1'), tG1 = T0('G1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['home', 'Home address', 'NUMBER, STREET, CITY', 'address', 'ADDRESS'], ['tag', 'Cinema ticket', 'ROW AND SEAT', 'ticket', 'SEAT'], ['flask', 'Chemical name', 'THE WHOLE DRAWING', 'name', 'NAME']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['flask', 'Propanone', 'propanone', 'H3'], ['users', 'Acetone', 'acetone', 'H3'], ['package', 'Same', 'bottle', 'H4'], ['help', 'Millions', 'millions', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: name parts ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['IUPAC: one rule book', 'IUPAC', 'P1', 'IUPAC'], ['A name is built in parts', 'PARTS', 'P2', 'parts'], ['Word root: number of carbons', 'ROOT', 'P3', 'root'], ['Primary suffix: ane, ene, yne', 'BONDS', 'P4', 'primary'], ['Secondary suffix: the group', 'GROUP', 'P5', 'secondary']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const ROOTS = [['meth', 1, 'Meth'], ['eth', 2, 'eth'], ['prop', 3, 'prop'], ['but', 4, 'but'], ['pent', 5, 'pent'], ['hex', 6, 'hex']];
const tRoot = ROOTS.map(r => wt('P3', r[2]));
const PS = [['-ane', 'SINGLE', 'n'], ['-ene', 'DOUBLE', 'E'], ['-yne', 'TRIPLE', 'Y']];
const SS = [['-ol', 'ALCOHOL', 'O'], ['-al', 'ALDEHYDE', 'a'], ['-one', 'KETONE', 'n']];
const chip = (x, y, w, big, small, c, on) => `<rect x="${x}" y="${y}" width="${w}" height="64" rx="12" fill="${on > 0.5 ? tint(c, 0.12) : C.soft}" stroke="${on > 0.5 ? c : 'none'}" stroke-width="2.5"/>` + T(x + 22, y + 42, big, { ff: 'Poppins', fw: 700, fs: 28, c, a: 'start', ls: 0 }) + T(x + w - 18, y + 40, small, { fs: 15, a: 'end' });
function drawP(t) {
  let s = '';
  s += G(T(36, 88, 'WORD ROOT · CARBONS IN THE MAIN CHAIN', { fs: 15, a: 'start' }), io(t, wt('P3', 'root'), 0.3));
  ROOTS.forEach(([r, n], i) => { const x = 36 + (i % 3) * 240, y = 102 + Math.floor(i / 3) * 76, a = io(t, tRoot[i] - 0.1, 0.25); s += G(chip(x, y, 224, r, n + ' C', NC, io(t, tRoot[i], 0.2) * (i < 5 ? 1 - io(t, tRoot[i + 1], 0.2) : 1) + (i === 4 ? io(t, T0('P6'), 0.3) : 0)), a); });
  const p4 = io(t, wt('P4', 'primary'), 0.3);
  s += G(T(36, 282, 'PRIMARY SUFFIX · BONDS', { fs: 15, a: 'start' }), p4);
  PS.forEach(([x0, k], i) => { const tt = [wt('P4', 'single'), wt('P4', 'double'), wt('P4', 'triple')][i]; s += G(chip(36 + i * 240, 296, 224, x0, k, C.ink, io(t, tt, 0.2) * (i < 2 ? 1 - io(t, [wt('P4', 'double'), wt('P4', 'triple')][i], 0.2) : 1) + (i === 0 ? io(t, T0('P6'), 0.3) : 0)), io(t, tt - 0.2, 0.25)); });
  const p5 = io(t, wt('P5', 'secondary'), 0.3);
  s += G(T(36, 394, 'SECONDARY SUFFIX · FUNCTIONAL GROUP', { fs: 15, a: 'start' }), p5);
  SS.forEach(([x0, k], i) => { const tt = [wt('P5', 'alcohol'), wt('P5', 'aldehyde'), wt('P5', 'ketone')][i]; s += G(chip(36 + i * 240, 408, 224, x0, k, OX, io(t, tt, 0.2)), io(t, tt - 0.3, 0.25)); });
  const p6 = io(t, wt('P6', 'prefix') - 0.1, 0.3);
  s += G(`<rect x="36" y="490" width="712" height="66" rx="12" fill="#fff" stroke="${C.ink2}" stroke-width="2"/>` + nameSVG(392, 536, [['2-methyl', SC], ['pent', NC], ['ane', C.ink]], 34), p6);
  put($('#pS'), s);
  M.setT(ptag, t < wt('P3', 'root') ? 'IUPAC' : t < wt('P4', 'primary') ? 'WORD ROOT' : t < wt('P5', 'secondary') ? 'PRIMARY SUFFIX' : t < T0('P6') ? 'SECONDARY SUFFIX' : 'THE WHOLE NAME');
}

/* ---------- S: 2-methylpentane ---------- */
const SP = [[130, 370], [250, 300], [370, 370], [490, 300], [610, 370]], BRm = [250, 175];
const tLong = wt('S2', 'longest'), tPent = wt('S2', 'pent'), tMe = wt('S3', 'methyl'), tNumL = wt('S4', 'left'), tNumR = wt('S5', 'right'), tLow = wt('S5', 'lowest'), tJoin = wt('S6', 'join');
function benchS(t) {
  let s = zig(SP, t, tS1 + 0.3, 0.25) + ln(...SP[1], ...BRm, C.ink2, 6, io(t, tS1 + 1.4, 0.3));
  const hl = io(t, tLong, 0.8);
  if (hl > 0.01) s += SP.slice(1).map((p, i) => ln(SP[i][0], SP[i][1], p[0], p[1], NC, 14, M.clamp(hl * 4 - i))).join('').replace(/stroke-width="14"/g, 'stroke-width="14" opacity="0.35"');
  SP.forEach(p => s += dot(p[0], p[1], 9, NC));
  const me = io(t, tMe - 0.1, 0.3);
  s += dot(...BRm, 9, me > 0.5 ? SC : C.ink2) + G(ln(...SP[1], ...BRm, SC, 6) + T(BRm[0] + 70, BRm[1] + 8, 'METHYL', { fs: 18, c: SC }) + T(BRm[0] + 70, BRm[1] + 34, 'CH₃', { fs: 16, c: SC }), me);
  s += G(T(392, 470, '5 CARBONS · PENT', { fs: 22, c: NC }), io(t, tPent - 0.1, 0.3) * (1 - io(t, tNumL - 0.3, 0.3)));
  const nl = io(t, tNumL - 0.2, 0.3), nr = io(t, tNumR - 0.2, 0.3) * (1 - io(t, tLow, 0.4));
  SP.forEach((p, i) => { s += num(p[0], p[1] + 46, i + 1, nl); s += num(p[0], p[1] - 46 - (i === 1 ? 0 : 0), 5 - i, nr, C.mute); });
  s += G(nameSVG(392, 520, [['2', PV], ['-', C.ink], ['methyl', SC], ['pent', NC], ['ane', C.ink]], 48), io(t, tJoin, 0.4));
  return s;
}
function builder(t) {
  const B = [['PREFIX', t >= tJoin ? '2-methyl' : t >= tMe ? 'methyl' : '?', SC, tMe], ['WORD ROOT', 'pent', NC, tPent], ['SUFFIX', 'ane', C.ink, tPent + 0.4]];
  return B.map(([n, v, c, tt], i) => { const x = 36 + i * 244, on = io(t, tt, 0.3); return `<rect x="${x}" y="84" width="224" height="150" rx="14" fill="${on > 0.5 ? tint(c === C.ink ? '#16213E' : c, 0.08) : C.soft}"/>` + T(x + 112, 120, n, { fs: 15 }) + G(lab(x + 112, 180, v, c, 38), on); }).join('');
}
function locS(t) {
  const L = io(t, tNumL, 0.3), R = io(t, tNumR, 0.3), ok = io(t, tLow, 0.3);
  return G(`<rect x="36" y="84" width="344" height="150" rx="14" fill="${mix(C.soft, C.ac2, ok)}"/>` + T(208, 124, 'FROM THE LEFT', { fs: 15 }) + lab(208, 186, '2', PV, 56) + G(`<circle cx="330" cy="130" r="18" fill="${C.ok}"/><path d="M322 130l6 6 10-11" fill="none" stroke="#fff" stroke-width="3.5"/>`, ok), L) +
    G(`<rect x="404" y="84" width="344" height="150" rx="14" fill="${C.soft}"/>` + T(576, 124, 'FROM THE RIGHT', { fs: 15 }) + lab(576, 186, '4', C.mute, 56) + G(ln(530, 210, 620, 150, C.red, 5), ok), R);
}
/* ---------- B ---------- */
const tB2 = T0('B2'), tB3 = T0('B3'), tB4 = T0('B4');
const BP = [[160, 360], [300, 290], [440, 360], [580, 290]];
function benchB(t) {
  let s = '';
  const a1 = io(t, tB2 - 0.2, 0.3) * (1 - io(t, tB3 - 0.2, 0.3));
  if (a1 > 0.01) s += G(zig(BP, t, tB2, 0.2) + ln(300, 290, 300, 170, SC, 6, io(t, tB2 + 0.8, 0.3)) + ln(440, 360, 440, 480, SC, 6, io(t, tB2 + 1.0, 0.3)) + BP.map((p, i) => dot(p[0], p[1], 9, NC) + num(p[0] + (i % 2 ? -40 : 40), p[1] + (i % 2 ? 30 : -30), i + 1)).join('') +
    nameSVG(392, 120, [['2,3-', PV], ['di', SC], ['methyl', SC], ['but', NC], ['ane', C.ink]], 40), a1);
  const a2 = io(t, tB3 - 0.2, 0.3) * (1 - io(t, tB4 - 0.2, 0.3));
  if (a2 > 0.01) s += G(`<rect x="60" y="120" width="664" height="96" rx="14" fill="${C.soft}"/>` + T(392, 184, 'e BEFORE m', { fs: 44, c: C.ink, ls: 4 }) + T(392, 250, 'ETHYL BEFORE METHYL', { fs: 18 }) +
    G(`<rect x="60" y="300" width="664" height="110" rx="14" fill="#fff" stroke="${C.ink2}" stroke-width="2"/>` + nameSVG(392, 368, [['4-', PV], ['ethyl', SC], ['-3-', PV], ['methyl', SC], ['hept', NC], ['ane', C.ink]], 40), io(t, wt('B3', 'Ethyl'), 0.3)) +
    G(T(392, 470, 'di, tri ARE IGNORED WHEN SORTING', { fs: 18, c: C.ink }), io(t, wt('B3', 'ignored') - 0.2, 0.3)), a2);
  const a3 = io(t, tB4 - 0.2, 0.3);
  if (a3 > 0.01) s += G(ring(392, 270, 6, 110, t, tB4) + nameSVG(392, 480, [['cyclo', SC], ['hex', NC], ['ane', C.ink]], 48), a3);
  return s;
}
const RL = [['Longest chain = word root', tS1 + 1], ['Lowest locants', tLow], ['di, tri for repeats', tB2], ['Alphabetical: ethyl, methyl', tB3], ['Rings: cyclo', tB4]];
function rulesS(t) {
  return RL.map(([n, tt], i) => { const y = 74 + i * 38, a = io(t, tt - 0.1, 0.3), on = a * (i < 4 ? 1 - io(t, RL[i + 1][1], 0.25) : 1);
    return G(`<rect x="36" y="${y}" width="712" height="32" rx="8" fill="${mix(C.soft, C.ac2, on)}"/>` + T(56, y + 22, String(i + 1), { fs: 16, c: NC, a: 'start', ls: 0 }) + T(88, y + 22, n, { ff: 'Poppins', fw: 600, fs: 18, c: C.ink, a: 'start', ls: 0 }), a); }).join('');
}
const btg = tag($('#bn'));
const BT = [[0, 'DRAW THE CHAIN'], [tLong, 'LONGEST CHAIN'], [tMe, 'SIDE GROUP'], [tNumL, 'NUMBER IT'], [tLow, 'LOWEST LOCANT'], [tJoin, 'JOIN THE PARTS'], [tB2, 'REPEATS · di'], [tB3, 'ALPHABETICAL'], [tB4, 'RINGS · cyclo']];

/* ---------- D: 4-chlorobutan-2-ol ---------- */
const LK = [['LINK 1', 'Main functional group = suffix', '-ol', 'D2'], ['LINK 2', 'Chain must hold its carbon', 'CHAIN', 'D3'], ['LINK 3', 'Give that group the lowest number', 'LOWEST', 'D4'], ['LINK 4', 'Higher priority wins the suffix', 'PRIORITY', 'D5'], ['LINK 5', 'Halogens, nitro: always prefixes', 'chloro', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DP = [[140, 260], [270, 190], [400, 260], [530, 190]]; // C4 C3 C2 C1 ... left to right: Cl-C4-C3-C2(OH)-C1
function drawD(t) {
  const Cl = [70, 190], OH = [400, 140];
  let s = zig(DP, t, tD1 + 0.3, 0.25) + ln(...DP[0], Cl[0] + 26, Cl[1] + 22, C.ink2, 6, io(t, tD1 + 1.1, 0.3)) + ln(...DP[2], OH[0], OH[1] + 26, C.ink2, 6, io(t, tD1 + 1.3, 0.3));
  s += G(lab(...Cl, 'Cl', OX, 34), io(t, tD1 + 1.3, 0.3)) + G(lab(OH[0], OH[1], 'OH', OX, 34), io(t, tD1 + 1.5, 0.3));
  const fg = io(t, tLk[0] + 0.3, 0.3);
  s += G(`<rect x="${OH[0] - 50}" y="${OH[1] - 34}" width="100" height="62" rx="14" fill="none" stroke="${OX}" stroke-width="4"/>` + badge(OH[0], OH[1] - 64, '-ol', OX), fg);
  const ch = io(t, tLk[1] + 0.3, 0.6);
  if (ch > 0.01) s += DP.slice(1).map((p, i) => ln(DP[i][0], DP[i][1], p[0], p[1], NC, 14, M.clamp(ch * 3 - i))).join('').replace(/stroke-width="14"/g, 'stroke-width="14" opacity="0.35"') + G(T(330, 350, '4 CARBONS · but', { fs: 18, c: NC }), ch);
  DP.forEach(p => s += dot(p[0], p[1], 9, NC));
  const nb = io(t, tLk[2] + 0.4, 0.3);
  DP.forEach((p, i) => { s += num(p[0], p[1] + (i % 2 ? -44 : 44), 4 - i, nb); });
  const pr = io(t, tLk[3] + 0.3, 0.4);
  const PRI = ['ACID', 'ALDEHYDE', 'KETONE', 'ALCOHOL', 'AMINE'];
  s += G(T(36, 396, 'PRIORITY · HIGH → LOW', { fs: 15, a: 'start' }) + PRI.map((p, i) => { const x = 36 + i * 146; return `<rect x="${x}" y="410" width="134" height="52" rx="10" fill="${i === 3 ? tint(OX, 0.14) : C.soft}" stroke="${i === 3 ? OX : 'none'}" stroke-width="2.5"/>` + T(x + 67, 443, p, { fs: 15, c: i === 3 ? OX : C.ink, ls: 0.4 }); }).join(''), pr);
  const hx = io(t, tLk[4] + 0.3, 0.3);
  s += G(`<rect x="${Cl[0] - 40}" y="${Cl[1] - 34}" width="80" height="62" rx="14" fill="none" stroke="${SC}" stroke-width="4"/>` + badge(Cl[0] + 10, Cl[1] - 60, 'chloro', SC, 1, 96), hx);
  s += G(nameSVG(392, 540, [['4-', PV], ['chloro', SC], ['but', NC], ['an-', C.ink], ['2-', PV], ['ol', OX]], 42), io(t, wt('D6', 'suffix') - 0.1, 0.4));
  return s;
}
const dtg = tag($('#dr'));
const DLB = ['FIND THE MAIN GROUP', 'CHAIN WITH IT', 'NUMBER FROM IT', 'PRIORITY', 'PREFIX ONLY'];

/* ---------- C: propan-2-ol vs propanone ---------- */
const tC2 = T0('C2'), tC3 = T0('C3'), tC4 = T0('C4'), tC5 = T0('C5');
const CP3 = [[220, 280], [392, 200], [564, 280]];
function cmp(t, k) {
  const t0 = k ? tC3 : tC2;
  let s = zig(CP3, t, tC1 + 0.4, 0.3) + CP3.map((p, i) => dot(p[0], p[1], 10, NC) + num(p[0], p[1] + 48, i + 1, io(t, tC1 + 1, 0.3))).join('');
  const a = io(t, t0 + 0.3, 0.4);
  if (k) s += G(ln(384, 192, 384, 120, OX, 6) + ln(400, 192, 400, 120, OX, 6) + lab(392, 94, 'O', OX, 38), a);
  else s += G(ln(392, 200, 392, 130, C.ink2, 6) + lab(392, 104, 'OH', OX, 36), a);
  s += G(nameSVG(392, 410, k ? [['propan', NC], ['e', C.red], [' + ', C.mute], ['one', OX]] : [['propan', NC], ['e', C.red], [' + ', C.mute], ['ol', OX]], 34), io(t, t0 + 0.8, 0.3));
  s += G(`<line x1="${k ? 467 : 471}" y1="398" x2="${k ? 487 : 491}" y2="398" stroke="${C.red}" stroke-width="4"/>`, io(t, wt(k ? 'C3' : 'C2', k ? 'propanone' : 'drops'), 0.3) * 0);
  s += G(nameSVG(392, 490, k ? [['propan', NC], ['one', OX]] : [['propan-', NC], ['2', PV], ['-ol', OX]], 46), io(t, wt(k ? 'C3' : 'C2', k ? 'becomes' : 'becomes') + 0.4, 0.3));
  s += G(T(392, 540, k ? 'ONLY ON C2 · NO NUMBER NEEDED' : 'FINAL e DROPS BEFORE A VOWEL', { fs: 16, c: C.ink }), io(t, k ? wt('C3', 'number') - 0.2 : wt('C2', 'vowel') - 0.2, 0.3));
  return s;
}
const th1 = PUC.think($('#th1'), { q: 'A chain of <b>four carbons</b> has an <span style="color:#C8461B">OH</span> on carbon two. Its name?', opts: ['Butan-2-ol', 'Butane-2-ol', 'Butan-3-ol'], right: 0, why: '<b>but</b> = 4 C, OH on C2, and the e of butane drops before <b style="color:#C8461B">ol</b>.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${G_('\\text{prefix}')} + ${Y_('\\text{word root}')} + ${O_('\\text{suffix}')}`);

/* ---------- W: 3-methylbutan-1-ol ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{chain with C-OH}: 4\\ \\mathrm{C} \\rightarrow ${Y_('\\text{but}')}`)],
  [K(`\\text{number from OH}: ${O_('\\mathrm{OH}')}\\ \\text{on}\\ ${V_('\\mathrm{C1}')}`)],
  [K(`${G_('\\mathrm{CH_3}')}\\ \\text{on}\\ ${V_('\\mathrm{C3}')} \\rightarrow ${G_('\\text{3-methyl}')}`)],
  [K(`${G_('\\text{3-methyl}')}${Y_('\\text{butan}')}\\text{-}${V_('1')}\\text{-}${O_('\\text{ol}')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'The name rebuilds the drawing'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const WP = [[130, 330], [250, 260], [370, 330], [490, 260]]; // C4 C3 C2 C1
function drawW(t) {
  let s = zig(WP, t, tW1 + 0.6, 0.25) + ln(250, 260, 250, 140, C.ink2, 6, io(t, tW1 + 1.4, 0.3)) + ln(490, 260, 588, 316, C.ink2, 6, io(t, tW1 + 1.6, 0.3)) + G(lab(628, 330, 'OH', OX, 36), io(t, tW1 + 1.8, 0.3));
  const ch = io(t, T0('W2') + 0.4, 0.6);
  if (ch > 0.01) s += WP.slice(1).map((p, i) => ln(WP[i][0], WP[i][1], p[0], p[1], NC, 14, M.clamp(ch * 3 - i))).join('').replace(/stroke-width="14"/g, 'stroke-width="14" opacity="0.35"');
  WP.forEach(p => s += dot(p[0], p[1], 9, NC));
  const me = io(t, T0('W4'), 0.3);
  s += dot(250, 140, 9, me > 0.5 ? SC : C.ink2) + G(ln(250, 260, 250, 140, SC, 6) + T(330, 146, 'METHYL', { fs: 18, c: SC }), me);
  const nb = io(t, T0('W3') + 0.3, 0.3);
  WP.forEach((p, i) => { s += num(p[0], p[1] + (i % 2 ? 46 : 46), 4 - i, nb); });
  s += G(nameSVG(392, 480, [['3-', PV], ['methyl', SC], ['butan', NC], ['-1-', PV], ['ol', OX]], 46), io(t, T0('W5') + 0.4, 0.4));
  put($('#wS'), s);
  const WT = [[0, 'FIND THE CHAIN'], [T0('W2'), '4 CARBONS · but'], [T0('W3'), 'NUMBER FROM OH'], [T0('W4'), 'METHYL ON C3'], [T0('W5'), 'JOIN THE PARTS']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- G: benzene names ---------- */
const GN = [['Chlorobenzene', '', 'Chlorobenzene'], ['Nitrobenzene', '', 'Nitrobenzene'], ['Methylbenzene', 'toluene', 'toluene'], ['Hydroxybenzene', 'phenol', 'phenol']];
function benzL(t) {
  return GN.map(([n, c, w], i) => { const y = 90 + i * 104, a = io(t, wt('G2', w) - 0.3, 0.3);
    return G(`<rect x="36" y="${y}" width="712" height="88" rx="14" fill="${C.soft}"/>` + T(64, y + 54, n, { ff: 'Poppins', fw: 700, fs: 30, c: C.ink, a: 'start', ls: 0 }) + (c ? T(724, y + 54, '= ' + c, { ff: 'Poppins', fw: 600, fs: 26, c: NC, a: 'end', ls: 0 }) : ''), a); }).join('') +
    G(T(392, 540, 'ONE GROUP: JUST ADD IT IN FRONT', { fs: 18, c: C.ink }), io(t, T0('G2') + 0.5, 0.3));
}
function benzR(t) {
  const cx = 300, cy = 290, R = 110, P = poly(cx, cy, 6, R);
  let s = ring(cx, cy, 6, R, t, tG1, [0, 2, 4]);
  const g3 = io(t, T0('G3'), 0.3);
  const sub = (i, a) => { const p = P[i], ox = cx + (p[0] - cx) * 1.5, oy = cy + (p[1] - cy) * 1.5; return G(ln(p[0], p[1], cx + (p[0] - cx) * 1.28, cy + (p[1] - cy) * 1.28, C.ink2, 5) + lab(ox, oy, 'Cl', OX, 30), a); };
  const dc = io(t, wt('G3', 'dichlorobenzene') - 0.3, 0.3);
  P.slice(0, 6).forEach((p, i) => { const ox = cx + (p[0] - cx) * 1.42, oy = cy + (p[1] - cy) * 1.42; s += num(ox, oy, i + 1, g3 * (i === 0 || i === 3 ? 1 - dc : 1)); });
  s += sub(0, dc) + sub(3, dc);
  const OM = [['ortho', 1, 'ORTHO · 1,2'], ['meta', 2, 'META · 1,3'], ['para', 3, 'PARA · 1,4']];
  const k = cur([[0], [wt('G3', 'ortho')], [wt('G3', 'meta')], [wt('G3', 'para')]], t);
  s += G(OM.map(([w, j, l], i) => { const y = 180 + i * 90, on = k === i + 1 ? 1 : k > i + 1 ? 0.45 : 0; return G(`<rect x="520" y="${y}" width="230" height="64" rx="12" fill="${k === i + 1 ? tint(PV, 0.12) : C.soft}" stroke="${k === i + 1 ? PV : 'none'}" stroke-width="2.5"/>` + T(635, y + 41, l, { fs: 20, c: PV }), on ? 1 : 0); }).join(''), g3);
  const pos = k === 1 ? 1 : k === 2 ? 2 : k >= 3 ? 3 : -1;
  if (pos > 0) s += G(ln(P[0][0], P[0][1], P[pos][0], P[pos][1], PV, 3, 1).replace('stroke-linecap="round"', 'stroke-linecap="round" stroke-dasharray="6 7"'), g3);
  s += G(sub(0, 1) + T(cx, 500, 'CHLOROBENZENE · ONE GROUP, NO NUMBER', { fs: 17, c: C.ink }), io(t, wt('G2', 'Chlorobenzene') - 0.1, 0.3) * (1 - g3));
  s += G(nameSVG(392, 540, [['1,4-', PV], ['dichloro', SC], ['benzene', NC]], 34), io(t, wt('G3', 'dichlorobenzene') - 0.2, 0.3));
  return s;
}
const gtg = tag($('#gr'));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Take the chain drawn straight: <b>2-ethylbutane</b>', right: 'The longest chain bends: <b>3-methylpentane</b>' });
const XP = x => [[x, 110], [x + 60, 110], [x + 120, 110], [x + 180, 110]], XB = x => [[x + 60, 110], [x + 60, 170], [x + 110, 200]];
const xDraw = (x, hl) => { const P = XP(x), B = XB(x); let s = P.slice(1).map((p, i) => ln(P[i][0], P[i][1], p[0], p[1], C.ink2, 5)).join('') + ln(...B[0], ...B[1], C.ink2, 5) + ln(...B[1], ...B[2], C.ink2, 5);
  if (hl) s += [[B[2], B[1]], [B[1], P[1]], [P[1], P[2]], [P[2], P[3]]].map(([a, b]) => ln(a[0], a[1], b[0], b[1], NC, 12)).join('').replace(/stroke-width="12"/g, 'stroke-width="12" opacity="0.4"') + T(x + 90, 250, '5 C · 3-METHYLPENTANE', { fs: 15, c: C.ok });
  else s += P.slice(1).map((p, i) => ln(P[i][0], P[i][1], p[0], p[1], C.red, 12)).join('').replace(/stroke-width="12"/g, 'stroke-width="12" opacity="0.3"') + T(x + 90, 250, '4 C · WRONG', { fs: 15, c: C.red });
  return s + [...P, B[1], B[2]].map(p => dot(p[0], p[1], 7, NC)).join(''); };
$('#tS').innerHTML = `<g id="tM1">${xDraw(40, 0)}</g><g id="tM2">${xDraw(360, 1)}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M40 70 L240 220 M240 70 L40 220'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: [], type: 'IUPAC name of a given structure, or the structure from a name' });
const mf = s => `\\mathrm{${s}}`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', q: `Correct IUPAC name of ${K(mf('CH_3{-}CH(CH_3){-}CH_2{-}CO{-}CH_3'))}?`, qW: 800,
  opts: ['2-methylpentan-4-one', '4-methylpentan-2-one', '4-methylpentanal', '4-methylbutan-2-one'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 25 });
const so = PUC.solution($('#so'), [[K(`\\text{chain with C=O}: 5\\ \\mathrm{C} \\rightarrow ${Y_('\\text{pent}')}`)], [K(`${O_('\\text{-one}')}\\ \\text{on}\\ ${V_('\\mathrm{C2}')}`)], [K(`${G_('\\text{methyl}')}\\ \\text{on}\\ ${V_('\\mathrm{C4}')}`)], [K(`\\text{A: wrong end} \\quad \\text{D: too short}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'ketone'), wt('A3', 'methyl'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · IUPAC Nomenclature', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Name</b> = prefix + word root + primary suffix + secondary suffix',
    '<b>Word root</b>: meth 1, eth 2, prop 3, but 4, pent 5, hex 6',
    '<b>Longest chain</b>, then <b>lowest locants</b> for side groups',
    '<b>di, tri</b> for repeats · alphabetical order · rings: <b>cyclo</b>',
    '<b>Main group</b> gets the suffix and lowest number · halogens: prefix',
    '<b>Benzene</b>: toluene, phenol · ortho 1,2 · meta 1,3 · para 1,4'] });
const YQ = ['What does the word root "but" tell you?', 'Name CH₃CH₂CHO.', 'What does "para" mean in a benzene name?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 82', topic: 'Same formula, different molecule? Isomerism in Organic Compounds', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'codes') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'parts') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'bottle') + 0.1) / 0.3) * (i === 2 ? 1 : 0); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'rule') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P6', 'Prefix') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.2, out, { dx: 60, dy: 0, ...o });
    { const sh = M.spring(t - T0('P2') + 0.2, M.HEAVY); snap($('#pq'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    drawP(t); M.vis(ptag, t, T0('P2'), 1e9, POP);
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
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · BRANCHED CHAIN' : 'MOLECULE BENCH · MORE RULES');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    put($('#shS'), builder(t)); M.setT($('#shL'), 'NAME BUILDER');
    put($('#chS'), G(locS(t), 1 - bb) + G(rulesS(t), bb)); M.setT($('#chL'), t < tB1 ? 'LOWEST LOCANT' : 'THE RULES SO FAR');
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    put($('#dS'), drawD(t)); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · 4-CHLOROBUTAN-2-OL'); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const z = OUT('C4'), back = T0('C5') + 0.05, out = OUT('T1');
    M.vis($('#cl'), t, t < back ? tC1 + 0.05 : back, t < back ? z : out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, t < back ? tC1 + 0.3 : back + 0.1, t < back ? z : out, { dx: 60, dy: 0, ...o });
    put($('#cS1'), cmp(t, 0)); put($('#cS2'), cmp(t, 1));
  }
  M.vis($('#th1'), t, tC4 + 0.05, T0('C5') - 0.1, { dy: 36, outDur: 0.3, ody: -16 });
  if (cOn) th1(t, { tin: tC4, tOpts: wt('C4', 'What') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'But') });

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Longest') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'read') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'parts'), 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tG1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('G1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'worked') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'rebuilds') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'worked') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, tW1 + 0.6, 1e9, POP);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tX1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('X1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#gr'), t, tG1 + 0.2, out, { dx: 60, dy: 0, ...o });
    put($('#gS1'), benzL(t)); put($('#gS2'), benzR(t));
    M.setT(gtg, t < T0('G2') ? 'BENZENE' : t < T0('G3') ? 'ONE GROUP' : 'TWO GROUPS · NUMBER IT'); M.vis(gtg, t, tG1 + 0.5, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'straight') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'bend') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'ethyl') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'Follow') - 0.05, 0.3).toFixed(3));
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
