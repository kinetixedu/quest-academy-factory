// PUC Chemistry Ep 93: reactions of alkenes and Markovnikov's rule (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon teal (element in play), H ink, pi bond blue, moving electrons / radicals orange, positive charge (carbocation) gold, Br brown, Cl green, O violet, I purple
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', PB = '#2F6FEB', BR = '#9C4A1A', CL = '#3C9A5F', OC = '#7A4FE0', IC = '#5B3F8C';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const col = (c, s) => `\\textcolor{${c}}{${s}}`, Cn = s => col(NC, s), Bn = s => col(BR, s), Rd = col(EC, '\\bullet');

Object.assign(M.IC, {
  hand: ['M7 11V5a1.5 1.5 0 0 1 3 0v5', 'M10 10V4a1.5 1.5 0 0 1 3 0v6', 'M13 10V5a1.5 1.5 0 0 1 3 0v6', 'M16 11V8a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2.5-4a1.5 1.5 0 0 1 2.5-1.6L7 14'],
  seat: ['M6 3v10h12', 'M6 13l-1 8', 'M18 13l1 8', 'M6 17h12'],
  hook: ['M12 3v9', 'M12 12a4 4 0 1 1-4 4', 'M9 3h6'],
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
const CA = (p, lab = 'C', r = 28) => atom(p[0], p[1], r, lab, NC, lab.length > 1 ? 15 : 20);
const HA = p => atom(p[0], p[1], 17, 'H', HC, 14);
const BrA = (p, lab = 'Br') => atom(p[0], p[1], 27, lab, BR, lab.length > 2 ? 14 : 17);
const plus = (p, a = 1) => G(`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="17" fill="#fff" stroke="${GC}" stroke-width="3"/><path d="M${f1(p[0] - 8)} ${f1(p[1])}h16M${f1(p[0])} ${f1(p[1] - 8)}v16" stroke="${GC}" stroke-width="3.5" stroke-linecap="round"/>`, a);
const ARR = (x1, y, x2, a = 1, c = C.ink2) => G(`<line x1="${x1}" y1="${y}" x2="${x2 - 12}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${x2},${y} ${x2 - 16},${y - 8} ${x2 - 16},${y + 8}" fill="${c}"/>`, a);
// propene skeleton: C3 (CH3) - C2 = C1, with H on C2 up and two H on C1
function propene(o = {}) {
  const k = o.k ?? 1, x = o.x ?? 0, y = o.y ?? 0, c3 = [x + 220 * k, y + 300 * k], c2 = [x + 340 * k, y + 300 * k], c1 = [x + 460 * k, y + 300 * k];
  return { c3, c2, c1, h2: ang(c2, -90, 86 * k), h1a: ang(c1, -30, 88 * k), h1b: ang(c1, 30, 88 * k) };
}
const propS = (P, o = {}) => { const pi = o.pi ?? 1, ha = o.ha ?? 1;
  return bond(P.c3, P.c2) + bond(P.c2, P.c1) + bond(P.c2, P.c1, pi, 12, 6, PB) + G(bond(P.c2, P.h2) + bond(P.c1, P.h1a) + bond(P.c1, P.h1b), ha) + atom(P.c3[0], P.c3[1], 30, 'CH₃', NC, 15) + CA(P.c2) + CA(P.c1) + G(HA(P.h2) + HA(P.h1a) + HA(P.h1b), ha); };

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
const JOBS = [['hand', 'Open hand', 'CATCHES A BALL', 'hand'], ['seat', 'Empty seat', 'TAKES A PASSENGER', 'seat'], ['hook', 'Free hook', 'HOLDS A NEW COAT', 'hook']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">TAKES ONE</div></div>`).join('');
const KIT = [['book', 'Eight reactions, all different', 'eight', 'H3'], ['check', 'One move: open π, add two', 'spots', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: why alkenes add ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['π electrons sit out in the open', 'EXPOSED', 'P2', 'pi'], ['They attract electrophiles', 'E⁺', 'P2', 'electrophiles'], ['H₂ over Ni, Pd or Pt: alkane', '+ H₂', 'P3', 'Hydrogen'], ['Br₂: orange colour disappears', 'TEST', 'P4', 'Bromine'], ['HX: HI > HBr > HCl', 'ORDER', 'P5', 'Hydrogen']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const ethS = (c1, c2, ha = 1, pi = 1) => bond(c1, c2) + bond(c1, c2, pi, 12, 6, PB) + [[c1, 210], [c1, 150], [c2, -30], [c2, 30]].map(([c, a]) => { const p = ang(c, a, 86); return bond(c, p) + HA(p); }).join('') + CA(c1) + CA(c2);
const PP = [
  t => { const c1 = [330, 280], c2 = [454, 280], e = io(t, wt('P2', 'attract') - 0.2, 1.4);
    let s = [-1, 1].map(k => `<path d="M330 ${280 + k * 22} C 360 ${280 + k * 80}, 424 ${280 + k * 80}, 454 ${280 + k * 22}" fill="${tint(PB, 0.1)}" stroke="${PB}" stroke-width="4"/>`).join('') + ethS(c1, c2);
    s += ed(392, 228) + ed(392, 332) + T(392, 196, 'π CLOUD', { fs: 16, c: PB });
    const ep = L2([392, 90], [392, 150], e); s += `<circle cx="${ep[0]}" cy="${ep[1]}" r="26" fill="#fff" stroke="${GC}" stroke-width="3"/>` + T(ep[0], ep[1] + 8, 'E⁺', { fs: 22, c: GC, ls: 0 }) + G(T(560, 120, 'ELECTROPHILE', { fs: 16, c: GC, a: 'start' }), e);
    return s + T(392, 470, 'ELECTRON-HUNGRY THINGS ARE PULLED IN', { fs: 18, c: C.ink }); },
  t => { const u = io(t, wt('P3', 'nickel') - 0.2, 1.2), c1 = [330, 300], c2 = [454, 300], h1 = L2([350, 140], ang(c1, -90, 86), u), h2 = L2([434, 140], ang(c2, -90, 86), u);
    let s = bond(c1, c2) + bond(c1, c2, 1 - u, 12, 6, PB) + bond(h1, h2, 1 - u) + bond(c1, h1, u) + bond(c2, h2, u) + [[c1, 210], [c1, 150], [c2, -30], [c2, 30]].map(([c, a]) => { const p = ang(c, a, 86); return bond(c, p) + HA(p); }).join('') + CA(c1) + CA(c2) + HA(h1) + HA(h2);
    s += `<rect x="150" y="440" width="484" height="22" rx="8" fill="${tint('#7D8597', 0.35)}"/>` + T(392, 494, 'Ni, Pd OR Pt', { fs: 18, c: C.ink });
    return s + G(T(392, 540, 'ETHENE + H₂ → ETHANE', { fs: 20, c: NC }), u); },
  t => { const u = io(t, wt('P4', 'disappears') - 0.6, 1.6);
    let s = `<rect x="246" y="${f1(170)}" width="292" height="300" rx="12" fill="${mix('#E9A15A', '#F2F6F7', u)}"/>` + `<path d="M242 120 V450 a20 20 0 0 0 20 20 H522 a20 20 0 0 0 20 -20 V120" stroke="${C.ink2}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += T(392, 110, 'Br₂ IN CCl₄ + ALKENE', { fs: 18, c: BR }) + T(392, 520, u > 0.6 ? 'COLOUR GONE · DOUBLE BOND PRESENT' : 'REDDISH ORANGE', { fs: 18, c: u > 0.6 ? C.ok : BR });
    return s; },
  t => { let s = T(392, 120, 'HOW FAST HX ADDS', { fs: 16 });
    [['HI', 'iodide', IC], ['HBr', 'bromide', BR], ['HCl', 'chloride', CL]].forEach(([n, w, c], i) => { const a = io(t, wt('P5', w) - 0.1, 0.3), x = 120 + i * 210;
      s += G(`<rect x="${x}" y="200" width="150" height="110" rx="16" fill="${i ? C.soft : tint(NC, 0.16)}" stroke="${i ? C.line : NC}" stroke-width="2.5"/>` + T(x + 75, 268, n, { ff: 'Poppins', fw: 700, fs: 36, c, ls: 0 }) + (i < 2 ? T(x + 180, 268, '>', { ff: 'Poppins', fw: 700, fs: 34, c: C.ink, ls: 0 }) : ''), a); });
    return s + G(T(392, 400, 'FASTEST ON THE LEFT', { fs: 18, c: NC }), io(t, wt('P5', 'iodide'), 0.4)); },
  t => { const a = io(t, wt('P6', 'lopsided') - 0.3, 0.4);
    let s = ethS([150, 200], [274, 200], 1) + T(212, 330, 'ETHENE · SAME ENDS', { fs: 17, c: C.ink });
    s += G(propS(propene({ k: 0.8, x: 310, y: -40 })) + T(588, 330, 'PROPENE · LOPSIDED', { fs: 17, c: GC }), a);
    s += G(T(212, 400, 'ANY WAY IS THE SAME', { fs: 15 }) + T(588, 400, 'WHICH END GETS H?', { fs: 15, c: GC }), a);
    return s; },
];
const PL = ['π ELECTRONS', 'ADD HYDROGEN', 'BROMINE TEST', 'HX ORDER', 'SYMMETRIC OR NOT'];

/* ---------- S: HBr + propene (carbocation) ---------- */
const P = propene();
const tA1 = wt('S2', 'grab'), tA2 = wt('S2', 'bromine'), tMv = wt('S2', 'taking'), tCat = wt('S3', 'positive'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = wt('S6', 'push'), tA3 = wt('S7', 'attacks'), tPr = wt('S7', 'major');
function benchS(t) {
  const a1 = io(t, tA1 - 0.1, 0.6), a2 = io(t, tA2, 0.6), mv = io(t, tMv - 0.1, 1.1), ca = io(t, tCat - 0.2, 0.4), a3 = io(t, tA3 - 0.1, 0.6), pr = io(t, tA3 + 0.5, 1.1);
  const h0 = [420, 170], hN = ang(P.c1, -90, 86), br0 = [530, 120], brN = [640, 170], brF = ang(P.c2, 90, 96);
  const h = L2(h0, hN, mv), br = L2(L2(br0, brN, mv), brF, pr);
  let s = propS(P, { pi: 1 - mv }) + bond(P.c1, h, mv) + bond(h, br, 1 - mv) + bond(P.c2, br, pr) + HA(h) + BrA(br, mv > 0.5 && pr < 0.5 ? 'Br⁻' : 'Br');
  s += G(arrowC([400, 286], [414, 194], -40, a1) + arrowC([475, 146], [516, 136], -26, a2), 1 - mv);
  s += plus([300, 250], ca * (1 - pr)) + G(T(250, 200, 'CARBOCATION', { fs: 15, c: GC }), ca * (1 - pr));
  s += G(arrowC([618, 196], [372, 318], -60, a3), 1 - pr);
  s += G(T(392, 520, 'CH₃-CHBr-CH₃ · 2-BROMOPROPANE · MAJOR', { fs: 19, c: C.ink, ls: 0.4 }), io(t, tPr - 0.2, 0.4));
  s += G(T(392, 520, 'STEP 1: H⁺ ADDS · STEP 2: Br⁻ ADDS', { fs: 19, c: C.ink }), io(t, tA1, 0.4) * (1 - io(t, tPr - 0.3, 0.3)));
  return s;
}
const carbo = (sec, t) => { const Q = propene({ k: 0.62, x: 40, y: -50 });
  let s = bond(Q.c3, Q.c2) + bond(Q.c2, Q.c1) + atom(Q.c3[0], Q.c3[1], 22, 'CH₃', NC, 12) + CA(Q.c2, 'C', 20) + CA(Q.c1, 'C', 20);
  const hs = sec ? [[Q.c2, -90], [Q.c1, -30], [Q.c1, 30], [Q.c1, 90]] : [[Q.c2, -90], [Q.c2, 90], [Q.c1, -30], [Q.c1, 30]];
  s = hs.map(([c, a]) => { const p = ang(c, a, 56); return bond(c, p, 1, 0, 5) + atom(p[0], p[1], 12, 'H', HC, 10); }).join('') + s;
  s += plus(sec ? [Q.c2[0] - 30, Q.c2[1] - 32] : [Q.c1[0] + 34, Q.c1[1]]);
  if (sec) { const pu = io(t, tS6 - 0.1, 0.5); s += G(arrowC([Q.c3[0] + 20, Q.c3[1] + 28], [Q.c2[0] - 14, Q.c2[1] + 22], 14, 1, GC) + arrowC([Q.c1[0] - 14, Q.c1[1] + 28], [Q.c2[0] + 14, Q.c2[1] + 22], -14, 1, GC), pu); }
  s += T(560, 126, sec ? '2°' : '1°', { ff: 'Poppins', fw: 700, fs: 46, c: sec ? C.ok : C.red, a: 'start', ls: 0 }) + T(562, 164, sec ? 'MORE STABLE' : 'LESS STABLE', { fs: 17, c: sec ? C.ok : C.red, a: 'start' }) + T(562, 194, sec ? '+ ON THE MIDDLE C' : '+ ON THE END C', { fs: 15, a: 'start' });
  if (sec) s += G(T(562, 224, '2 C GROUPS SHARE IT', { fs: 15, c: GC, a: 'start' }), io(t, tS6, 0.4));
  return s; };
function shS(t) { const a = io(t, tS4 - 0.2, 0.4);
  return G(T(392, 110, 'H GOES FIRST, AS H⁺', { fs: 20, c: C.ink }) + T(392, 150, 'THEN Br⁻ JOINS THE + CARBON', { fs: 20, c: C.ink }) + T(392, 210, 'WHICH END GETS THE H?', { fs: 17, c: GC }), io(t, tS1 + 0.5, 0.4) * (1 - a)) + G(carbo(true, t), a); }
function chS(t) { const a = io(t, tS5 - 0.2, 0.4);
  return G(bond([290, 130], [470, 130], 1, 0, 8) + atom(290, 130, 22, 'H', HC, 17) + atom(470, 130, 34, 'Br', BR, 22) + T(290, 86, 'δ+', { fs: 22, c: GC, ls: 0 }) + T(470, 80, 'δ-', { fs: 22, c: BR, ls: 0 }) + T(392, 214, 'H IS SLIGHTLY POSITIVE · IT IS THE ELECTROPHILE', { fs: 16, c: C.ink }), io(t, tS1 + 0.7, 0.4) * (1 - a)) + G(carbo(false, t), a) + G(`<rect x="20" y="20" width="744" height="234" rx="14" fill="none" stroke="${C.red}" stroke-width="0"/>`, 0); }
// B: Markovnikov's rule
function rule(t) {
  const Q = propene({ k: 1, x: 0, y: 20 }), a = io(t, wt('B1', 'fewer') - 0.2, 0.4), r = io(t, wt('B2', 'rich') - 0.2, 0.4);
  let s = propS(Q);
  s += G(`<rect x="290" y="146" width="100" height="40" rx="10" fill="${tint(GC, 0.16)}"/>` + T(340, 174, '1 H', { fs: 20, c: GC, ls: 0 }) + `<rect x="560" y="300" width="100" height="40" rx="10" fill="${tint(NC, 0.16)}"/>` + T(610, 328, '2 H', { fs: 20, c: NC, ls: 0 }), io(t, T0('B1') + 0.5, 0.4));
  s += G(T(340, 470, 'X⁻ GOES HERE', { fs: 18, c: GC }) + `<path d="M340 446 V372" stroke="${GC}" stroke-width="3" stroke-dasharray="6 6"/>`, a);
  s += G(T(560, 470, 'H GOES HERE', { fs: 18, c: NC }) + `<path d="M520 446 L478 372" stroke="${NC}" stroke-width="3" stroke-dasharray="6 6"/>`, r);
  return s + G(T(392, 540, 'THE RICH GET RICHER', { ff: 'Poppins', fw: 700, fs: 24, c: C.ink, ls: 0.3 }), r);
}
const btg = tag($('#bn'));
const BT = [[0, 'PROPENE + HBr'], [tA1, 'ARROWS: e⁻ PAIRS MOVE'], [tCat, 'CARBOCATION'], [tA3, 'Br⁻ ATTACKS'], [tPr, '2-BROMOPROPANE'], [tB1, 'MARKOVNIKOV\'S RULE'], [T0('B3'), 'PROPENE + HCl']];
const th1 = PUC.think($('#th1'), { q: 'Propene + HCl: which carbon gets the <span style="color:#3C9A5F">chlorine</span>?', opts: ['End carbon (CH₂)', 'Middle carbon (CH)'], right: 1, why: '<b>Middle carbon</b>: it has fewer H. The product is <b style="color:#3C9A5F">2-chloropropane</b>.' });

/* ---------- D: peroxide effect ---------- */
const LK = [['LINK 1', 'Peroxide radicals free a Br•', 'Br•', 'D2'], ['LINK 2', 'Br• adds to the end carbon', '2° RADICAL', 'D3'], ['LINK 3', 'Radical takes H from HBr', '1-BROMO', 'D4'], ['LINK 4', 'HCl: bond too strong', 'NO', 'D5'], ['LINK 5', 'HI: iodine radicals pair up', 'NO', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const OA = p => atom(p[0], p[1], 24, 'O', OC, 17), RA = p => atom(p[0], p[1], 24, 'R', '#5A6480', 17);
const DP = [
  t => { const sp = io(t, wt('D2', 'splits'), 0.9), ar = io(t, wt('D2', 'peroxide'), 0.5), a2 = io(t, wt('D2', 'pulls') - 0.1, 0.5), mv = io(t, wt('D2', 'bromine') - 0.3, 1);
    const o1 = [lerp(350, 300, sp), 170], o2 = [lerp(434, 484, sp), 170], r1 = [o1[0] - 70, 170], r2 = [o2[0] + 70, 170];
    let s = bond(r1, o1) + bond(o2, r2) + bond(o1, o2, 1 - sp) + RA(r1) + OA(o1) + OA(o2) + RA(r2) + ed(lerp(384, o1[0] + 34, sp), 170) + ed(lerp(400, o2[0] - 34, sp), 170);
    s += G(arrowC([386, 156], [320, 142], -30, ar, EC, false) + arrowC([398, 156], [464, 142], 30, ar, EC, false), 1 - sp) + T(392, 250, 'PEROXIDE → 2 RADICALS', { fs: 16, c: C.ink });
    const h = L2([392, 380], [250, 380], mv), br = L2([500, 380], [560, 380], mv), rr = [170, 380];
    s += G(RA(rr) + ed(rr[0] + 32, 380, 1 - mv) + bond(rr, h, mv) + bond(h, br, 1 - mv) + HA(h) + BrA(br) + ed(br[0] - 36, 380, mv) + G(arrowC([206, 366], [380, 360], -30, a2, EC, false), 1 - mv), io(t, wt('D2', 'radical') - 0.2, 0.4));
    return s + G(T(560, 440, 'Br• SET FREE', { fs: 18, c: EC }), mv); },
  t => { const a = io(t, wt('D3', 'adds') - 0.1, 0.6), mv = io(t, wt('D3', 'end') + 0.1, 1), rd = io(t, wt('D3', 'secondary') - 0.2, 0.4);
    const br = L2([600, 160], ang(P.c1, -90, 96), mv);
    let s = propS(P, { pi: 1 - mv }) + bond(P.c1, br, mv) + BrA(br) + ed(lerp(br[0] - 34, 300, mv) * (1 - mv) + 312 * mv, lerp(br[1] + 10, 252, mv), 1);
    s += G(arrowC([566, 170], [470, 240], 30, a, EC, false) + arrowC([400, 290], [440, 264], -20, a, EC, false), 1 - mv);
    s += G(T(240, 236, '2° RADICAL', { fs: 16, c: EC }), rd);
    return s + T(392, 520, 'Br• + CH₃CH=CH₂ → CH₃ĊH-CH₂Br', { fs: 19, c: C.ink, ls: 0 }); },
  t => { const a = io(t, wt('D4', 'takes'), 0.6), mv = io(t, wt('D4', 'bromopropane') - 0.4, 1), Q = propene();
    const brC = ang(Q.c1, -90, 96), h = L2([300, 440], ang(Q.c2, 90, 86), mv), br2 = L2([410, 440], [560, 450], mv);
    let s = bond(Q.c3, Q.c2) + bond(Q.c2, Q.c1) + bond(Q.c2, Q.h2) + bond(Q.c1, Q.h1a) + bond(Q.c1, Q.h1b) + bond(Q.c1, brC) + atom(Q.c3[0], Q.c3[1], 30, 'CH₃', NC, 15) + CA(Q.c2) + CA(Q.c1) + HA(Q.h2) + HA(Q.h1a) + HA(Q.h1b) + BrA(brC);
    s += ed(372, 318, 1 - mv) + bond(h, br2, 1 - mv) + bond(Q.c2, h, mv) + HA(h) + BrA(br2) + ed(br2[0] + 36, 450, mv);
    s += G(arrowC([372, 330], [306, 420], 24, a, EC, false), 1 - mv);
    s += G(T(392, 540, 'CH₃CH₂CH₂Br · 1-BROMOPROPANE · NEW Br• KEEPS GOING', { fs: 17, c: C.ink, ls: 0.3 }), io(t, wt('D4', 'bromopropane'), 0.4));
    return s; },
  t => { const b = io(t, wt('D5', 'strong') - 0.4, 1.4), x = lerp(620, 470, Math.sin(Math.PI * Math.min(1, b)));
    let s = bond([280, 300], [400, 300], 1, 0, 14) + atom(280, 300, 20, 'H', HC, 16) + atom(400, 300, 30, 'Cl', CL, 20) + atom(x, 300, 24, 'X', '#5A6480', 16) + ed(x - 30, 300);
    return s + T(340, 380, 'STRONG H-Cl BOND', { fs: 18, c: CL }) + G(T(392, 470, 'RADICALS CANNOT BREAK IT · NO PEROXIDE EFFECT', { fs: 17, c: C.red }), io(t, wt('D5', 'strong'), 0.4)); },
  t => { const s1 = io(t, wt('D6', 'breaks'), 0.8), p = io(t, wt('D6', 'pair') - 0.2, 1);
    const i1 = [lerp(470, 300, s1), lerp(300, 300, s1)], i2 = L2([lerp(560, 640, s1) * 0 + 640, 200], [440, 300], p), ia = L2(i1, [344, 300], p);
    let s = bond([380, 300], [470, 300], 1 - s1) + atom(lerp(380, 220, s1), 300, 20, 'H', HC, 16) + atom(ia[0], ia[1], 32, 'I', IC, 24);
    s += G(atom(i2[0], i2[1], 32, 'I', IC, 24) + ed(i2[0] - 36, i2[1], 1 - p), s1) + ed(ia[0] + 36, 300, 1 - p) + bond(ia, i2, p);
    s += T(392, 180, 'H-I BREAKS EASILY · 296.8 kJ/mol', { fs: 17, c: C.ink }) + G(T(392, 440, 'I• + I• → I₂ · NO ADDITION', { fs: 19, c: IC }), p);
    return s; },
];
const dtg = tag($('#dr'));
const DLB = ['RADICALS START', 'Br• ADDS FIRST', 'H ADDS LAST', 'NOT FOR HCl', 'NOT FOR HI'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{CH_3CH{=}CH_2} \\xrightarrow[\\text{peroxide}]{\\mathrm{HBr}} ${Cn('\\mathrm{CH_3CH_2CH_2Br}')}`);

/* ---------- W: ozonolysis ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{C{=}C} \\xrightarrow{\\mathrm{O_3},\\ \\mathrm{Zn/H_2O}} \\mathrm{C{=}O} + \\mathrm{O{=}C}`)],
  [K(`\\mathrm{CH_3CH{=}O} \\quad \\mathrm{O{=}CH_2}`)],
  [K(`\\text{remove both O, join the C atoms}`)],
  [K(`${Cn('\\mathrm{CH_3CH{=}CH_2}')}\\ \\text{(propene)}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Ozonolysis finds the double bond'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
function drawW(t) {
  const f = io(t, T0('W2') + 0.2, 0.4), m = io(t, wt('W2', 'Each') - 0.2, 0.5), j = io(t, wt('W4', 'join') - 0.2, 1.2), nm = io(t, T0('W5') + 0.5, 0.4);
  let s = '';
  const CH = [['C=C', 'double'], ['+ O₃', 'ozone'], ['OZONIDE', 'ozonide'], ['Zn + H₂O', 'Zinc'], ['2 C=O', 'Each']];
  CH.forEach(([n, w], i) => { const a = io(t, wt('W2', w) - 0.1, 0.3), x = 36 + i * 146; s += G(`<rect x="${x}" y="90" width="132" height="56" rx="12" fill="${i === 4 ? C.ac2 : C.soft}"/>` + T(x + 66, 126, n, { fs: 19, c: C.ink, ls: 0 }), a * f); });
  const c2 = [lerp(300, 340, j), 320], c1 = [lerp(484, 444, j), 320], o2 = L2([380, 320], [330, 180], j), o1 = L2([404, 320], [454, 180], j);
  let q = bond([c2[0] - 120, 320], c2) + bond(c2, ang(c2, 90, 84)) + bond(c1, ang(c1, -30, 84)) + bond(c1, ang(c1, 30, 84));
  q += bond(c2, o2, 1, -6) + bond(c2, o2, 1 - j, 6, 6, PB) + bond(c1, o1, 1, 6) + bond(c1, o1, 1 - j, -6, 6, PB);
  q = bond(c2, o2, 1 - j, -6) + bond(c1, o1, 1 - j, 6) + bond(c2, o2, 1 - j, 6, 6, PB) + bond(c1, o1, 1 - j, -6, 6, PB) + bond([c2[0] - 120, 320], c2) + bond(c2, ang(c2, 90, 84)) + bond(c1, ang(c1, -30, 84)) + bond(c1, ang(c1, 30, 84)) + bond(c2, c1, j) + bond(c2, c1, j, 12, 6, PB);
  q += atom(c2[0] - 120, 320, 30, 'CH₃', NC, 15) + CA(c2) + CA(c1) + HA(ang(c2, 90, 84)) + HA(ang(c1, -30, 84)) + HA(ang(c1, 30, 84)) + G(atom(o2[0], o2[1], 24, 'O', OC, 17) + atom(o1[0], o1[1], 24, 'O', OC, 17), 1 - j);
  s += G(q, m);
  s += G(T(220, 460, 'ETHANAL', { fs: 17, c: C.ink }) + T(540, 460, 'METHANAL', { fs: 17, c: C.ink }), m * (1 - j));
  s += G(T(392, 470, 'CH₃-CH=CH₂ · PROPENE', { ff: 'Poppins', fw: 700, fs: 26, c: NC, ls: 0.3 }), nm);
  put($('#wS'), s);
  M.setT(wtg, t < T0('W3') ? 'HOW OZONOLYSIS CUTS' : t < T0('W4') ? 'TWO PIECES FACE TO FACE' : t < T0('W5') ? 'REMOVE O · JOIN C' : 'PROPENE');
}

/* ---------- C: more reactions ---------- */
const mf = s => `\\mathrm{${s}}`;
const RX = [['COLD CONC. H₂SO₄', `${Cn(mf('CH_3CH{=}CH_2'))} + ${mf('H_2SO_4')} \\rightarrow ${mf('CH_3CH(OSO_3H)CH_3')}`, 'MARKOVNIKOV', () => wt('C1', 'Cold')],
  ['WATER + H⁺', `${Cn(mf('CH_3CH{=}CH_2'))} + ${mf('H_2O')} \\rightarrow ${mf('CH_3CH(OH)CH_3')}`, 'FEW DROPS CONC. H₂SO₄', () => T0('C2')],
  ['BAEYER\'S REAGENT', `${Cn(mf('CH_2{=}CH_2'))} + ${mf('H_2O')} + [\\mathrm{O}] \\rightarrow ${mf('HOCH_2{-}CH_2OH')}`, 'COLD DIL. KMnO₄ · PINK FADES', () => T0('C3')],
  ['ACIDIC KMnO₄', `${Cn(mf('CH_3CH{=}CHCH_3'))} \\rightarrow 2\\,${mf('CH_3COOH')}`, 'KMnO₄ / H⁺ · C=C CUT', () => T0('C4')],
  ['POLYMERISATION', `n\\,${Cn(mf('CH_2{=}CH_2'))} \\rightarrow ({-}${mf('CH_2{-}CH_2')}{-})_n`, 'HIGH T, HIGH P, CATALYST', () => T0('C5')]];
$('#rxs').innerHTML = RX.map(([g, e, c], i) => `<div class="rx" id="rx${i}" style="top:${84 + i * 96}px"><div class="rt2">${g}</div><div class="re">${K(e)}</div><div class="rc">${c}</div></div>`).join('');
const tRx = RX.map(r => r[3]());

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Propene + HBr: H joins the carbon with <b>fewer H</b>', right: 'H joins the carbon with <b>more H</b>: 2-bromopropane' });
$('#tS').innerHTML = `<g id="tM1"><rect x="40" y="86" width="290" height="60" rx="12" fill="#fff" stroke="${C.red}" stroke-width="3"/>${T(185, 124, 'CH₃CH₂CH₂Br', { fs: 22, c: C.ink, ls: 0 })}${T(185, 180, 'NOT MAJOR', { fs: 17, c: C.red })}</g><path id="tX" d="M70 96 L300 136" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/><g id="tM2"><rect x="400" y="86" width="290" height="60" rx="12" fill="#fff" stroke="${C.ok}" stroke-width="3"/>${T(545, 124, 'CH₃CHBrCH₃', { fs: 22, c: C.ink, ls: 0 })}${T(545, 180, 'MAJOR · NO PEROXIDE', { fs: 17, c: C.ok })}</g>`;
const xM = $('#tX');
const where = PUC.where($('#wa'), { on: [], type: 'Markovnikov\'s rule and the peroxide effect with mechanism; the major product' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE PATTERN · ORIGINAL QUESTION', q: '2-Methylpropene reacts with HBr in the presence of <b>benzoyl peroxide</b>. What is the major product?', qW: 820,
  opts: [K(mf('(CH_3)_3CBr')), K(mf('(CH_3)_2CHCH_2Br')), K(mf('(CH_3)_3CH')), K(mf('(CH_3)_2CBrCH_2Br'))], right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\text{peroxide + HBr} \\Rightarrow \\text{radicals}`)], [K(`\\mathrm{Br}${Rd} \\rightarrow \\mathrm{CH_2} \\text{ end: } 3^\\circ\\ \\text{radical}`)], [K(`+\\,\\mathrm{H} \\rightarrow ${Cn(mf('(CH_3)_2CHCH_2Br'))}`)], [K(`\\text{A: Markovnikov, no peroxide}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Markovnikov')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Reactions of Alkenes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Addition</b>: the π bond opens and two new pieces add',
    '<b>Tests</b>: Br₂ (orange) and Baeyer\'s reagent (pink) both lose colour',
    '<b>HX</b>: HI > HBr > HCl · via a carbocation, 2° more stable than 1°',
    '<b>Markovnikov</b>: negative part goes to the carbon with fewer H',
    '<b>Peroxide effect</b>: only HBr, free radicals, the other way round',
    '<b>Ozonolysis</b>: O₃, then Zn + H₂O, cuts C=C into two C=O'] });
const YQ = ['Why is a secondary carbocation more stable than a primary one?', 'Why does hydrogen chloride not show the peroxide effect?', 'What does Baeyer\'s reagent tell you about a compound?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 94', topic: 'Why can ethyne act like an acid? Alkynes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  document.querySelectorAll('.wq').forEach(q => { if (q.offsetWidth > 340) q.style.fontSize = Math.floor(24 * 340 / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'takes') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'alkene') - 0.2, 1e9, POP);
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
    M.vis($('#mdef'), t, wt('P1', 'ready') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : T0('P6'); const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ks = [T0('P2'), T0('P3'), T0('P4'), T0('P5'), T0('P6')]; let s = '';
    PP.forEach((f, i) => { const a = io(t, ks[i] - 0.2, 0.35) * (i < 4 ? 1 - io(t, ks[i + 1] - 0.2, 0.3) : 1); if (a > 0.01) s += G(f(t), a); });
    put($('#pS'), s); M.setT(ptag, PL[Math.max(0, cur(ks.map(x => [x - 0.2]), t))]); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B4');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#sh'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tS1 + 0.6, z, { dy: 36, ...o });
    const b = io(t, tB1 - 0.1, 0.4);
    put($('#bS'), G(benchS(t), 1 - b) + G(rule(t), b));
    const b3 = io(t, T0('B3'), 0.4), ans = io(t, T0('B5'), 0.4);
    put($('#shS'), G(shS(t), 1 - b) + G(T(392, 100, 'MARKOVNIKOV\'S RULE', { ff: 'Poppins', fw: 700, fs: 26, c: C.ink, ls: 0.3 }) + T(392, 150, 'NEGATIVE PART → C WITH FEWER H', { fs: 19, c: GC }) + G(T(392, 196, 'H → C WITH MORE H', { fs: 19, c: NC }), io(t, wt('B2', 'hydrogen') - 0.1, 0.4)), b));
    put($('#chS'), G(chS(t), 1 - b) + G(T(392, 120, 'CH₃CH=CH₂ + HCl → ?', { fs: 26, c: C.ink, ls: 0 }) + G(T(392, 190, 'CH₃CHClCH₃ · 2-CHLOROPROPANE', { fs: 22, c: CL, ls: 0.3 }), ans), b));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · HBr + PROPENE' : 'MOLECULE BENCH · THE RULE'); M.setT($('#shL'), t < tB1 ? (t < tS4 - 0.2 ? 'TWO STEPS' : 'SECONDARY CARBOCATION') : 'IN WORDS'); M.setT($('#chL'), t < tB1 ? (t < tS5 - 0.2 ? 'H-Br IS POLAR' : 'PRIMARY CARBOCATION') : 'TRY ONE');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'Which') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'It') });

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
    M.rise($('#st1'), t, wt('T1', 'Normally') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'flips') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'An') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, T0('W6') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'ozonolysis') + 0.1, out, { dx: 60, dy: 0, ...o });
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
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Without') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'one') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'Two') - 0.1, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Board') });
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
