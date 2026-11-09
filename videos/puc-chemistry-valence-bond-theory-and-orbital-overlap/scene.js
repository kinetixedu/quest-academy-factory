// PUC Chemistry Ep 47: valence bond theory and orbital overlap (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: atoms / nuclei teal, partner atoms ink, electrons orange, sigma gold, pi violet, energy blue, orbital + phase teal tint, - phase grey
const NC = C.ac, HC = C.ink, EC = '#C8461B', SC = '#B7791F', PC = '#7A4FE0', BC = '#2F6FEB';
const IMG = '../../assets/illustrations/puc/';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const S_ = s => `\\textcolor{${SC}}{${s}}`, P_ = s => `\\textcolor{${PC}}{${s}}`;

Object.assign(M.IC, {
  shake: ['m11 17 2 2a1 1 0 1 0 3-3', 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4', 'm21 3 1 11h-2', 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3', 'M3 4h8'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
});

/* ---------- orbital drawing (svg strings) ---------- */
const f1 = v => (+v).toFixed(1);
const PH = { p: ['rgba(15,163,163,.26)', NC], n: ['rgba(22,33,62,.09)', C.ink2] };
const lobe = (x, y, ang, L, W, ph, fs = 26) => { const [f, s] = PH[ph], tx = L * 0.6;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"><path d="M0 0C${f1(L * .2)} ${f1(-W)} ${f1(L)} ${f1(-W)} ${f1(L)} 0C${f1(L)} ${f1(W)} ${f1(L * .2)} ${f1(W)} 0 0Z" fill="${f}" stroke="${s}" stroke-width="2.5"/>` +
    (fs ? `<text x="${f1(tx)}" y="0" transform="rotate(${f1(-ang)} ${f1(tx)} 0)" dominant-baseline="central" font-family="IBM Plex Mono" font-weight="700" font-size="${fs}" fill="${s}" text-anchor="middle">${ph === 'p' ? '+' : '-'}</text>` : '') + '</g>'; };
const nuc = (x, y, r = 6) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${C.ink2}"/>`;
const pOrb = (x, y, ang, L, W, fs, flip) => lobe(x, y, ang, L, W, flip ? 'n' : 'p', fs) + lobe(x, y, ang + 180, L, W, flip ? 'p' : 'n', fs) + nuc(x, y);
const sOrb = (x, y, r, fs = 26) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${PH.p[0]}" stroke="${NC}" stroke-width="2.5"/>` + (fs ? `<text x="${f1(x)}" y="${f1(y - r * 0.5)}" dominant-baseline="central" font-family="IBM Plex Mono" font-weight="700" font-size="${fs}" fill="${NC}" text-anchor="middle">+</text>` : '') + nuc(x, y);
const glow = (x, y, rx, ry, col, a) => a > 0.01 ? `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${col}" opacity="${a.toFixed(3)}"/>` : '';
const axis = (x1, x2, y, a = 1) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.ink2}" stroke-width="2" stroke-dasharray="8 8" opacity="${(0.35 * a).toFixed(3)}"/>`;
const arr = (x1, y1, x2, y2, col, w = 4, both = false, dash = '') => { const a = Math.atan2(y2 - y1, x2 - x1), h = w * 3, hd = (x, y, an) => `<polygon points="${f1(x)},${f1(y)} ${f1(x - h * Math.cos(an - 0.5))},${f1(y - h * Math.sin(an - 0.5))} ${f1(x - h * Math.cos(an + 0.5))},${f1(y - h * Math.sin(an + 0.5))}" fill="${col}"/>`;
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` + hd(x2, y2, a) + (both ? hd(x1, y1, a + Math.PI) : ''); };
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}"${o.op != null ? ` opacity="${o.op.toFixed(3)}"` : ''}>${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const kf = (ks, t) => { if (t <= ks[0][0]) return ks[0][1]; for (let i = 1; i < ks.length; i++) if (t < ks[i][0]) { const [ta, va] = ks[i - 1], [tb, vb] = ks[i]; return va + (vb - va) * M.io((t - ta) / Math.max(0.01, tb - ta)); } return ks[ks.length - 1][1]; };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
// one hydrogen atom: cloud + nucleus
const hAtom = (x, y, cl = 1, R = 105) => (cl > 0.01 ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R * (0.6 + 0.4 * cl))}" fill="rgba(15,163,163,${(0.16 * cl).toFixed(3)})" stroke="${NC}" stroke-opacity="${(0.5 * cl).toFixed(3)}" stroke-width="2.5"/>` : '') +
  `<circle cx="${f1(x)}" cy="${f1(y)}" r="20" fill="${NC}"/>` + T(x, y + 7, 'H', { ff: 'Poppins', fw: 700, fs: 20, c: '#fff', ls: 0 });
const eDot = (x, y, a = 1) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="9" fill="${EC}" opacity="${a.toFixed(3)}"/>`;
const overlapFill = (id, ax, bx, y, R, a, col = SC) => a < 0.01 ? '' : `<clipPath id="${id}"><circle cx="${f1(ax)}" cy="${f1(y)}" r="${R}"/></clipPath><circle cx="${f1(bx)}" cy="${f1(y)}" r="${R}" fill="${col}" opacity="${(0.42 * a).toFixed(3)}" clip-path="url(#${id})"/>`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB7 = T0('B7'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };

/* ---------- title card + H ---------- */
const JOBS = [['shake', 'Handshake', 'PALMS PRESS TOGETHER', 'hands', 'PALMS'], ['link', 'Hook tape', 'HOOKS CATCH LOOPS', 'hook', 'HOOKS'], ['bike', 'Bicycle chain', 'TEETH SIT IN LINKS', 'bicycle', 'TEETH']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['bike', 'Chain', 'chain', 'H3'], ['gear', 'Teeth', 'teeth', 'H3'], ['link', 'In the links', 'links', 'H3'], ['zap', 'Firmer grip', 'firmer', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: the idea ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Lewis: atoms share a pair', 'SHARE', 'P2', 'Lewis'], ['But where do the electrons sit?', 'WHERE?', 'P2', 'where'], ['Orbital: the electron\'s cloud', 'CLOUD', 'P4', 'orbital'], ['Two orbitals overlap', 'OVERLAP', 'P5', 'overlaps'], ['Opposite spins pair up', 'SPINS', 'P6', 'opposite']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'), 'background:#FBEDE6;color:#C8461B');
const hlP = document.createElement('div'); hlP.className = 'pillp ink'; hlP.style.cssText = 'left:36px;top:494px'; hlP.textContent = 'Heitler and London · 1927'; $('#pw').appendChild(hlP);
const tP4 = wt('P4', 'orbital'), tP5 = wt('P5', 'overlaps'), tP6 = wt('P6', 'electrons'), tP6n = wt('P6', 'nuclei');
function drawP(t) {
  const y = 300, sep = kf([[0, 300], [tP5 - 0.2, 300], [tP5 + 1.0, 140]], t), ax = 392 - sep / 2, bx = 392 + sep / 2;
  const cl = io(t, tP4 - 0.1, 0.5), ov = io(t, tP5 + 0.6, 0.4), sh = io(t, tP6 - 0.2, 0.6);
  let s = hAtom(ax, y, cl) + hAtom(bx, y, cl) + overlapFill('pc1', ax, bx, y, 105, ov);
  const w = t * 1.7, own = [[ax + 58 * Math.cos(w), y + 58 * Math.sin(w)], [bx + 58 * Math.cos(w + Math.PI), y + 58 * Math.sin(w + Math.PI)]];
  const lew = [[382, y], [402, y]], mid = [[392 - 16, y - 2], [392 + 16, y + 2]];
  own.forEach((p, i) => { const a = [lew[i][0] + (p[0] - lew[i][0]) * cl, lew[i][1] + (p[1] - lew[i][1]) * cl], q = [a[0] + (mid[i][0] - a[0]) * sh, a[1] + (mid[i][1] - a[1]) * sh]; s += eDot(q[0], q[1]);
    if (sh > 0.05) s += G(arr(q[0] + (i ? 0 : 0), q[1] + (i ? -34 : 34), q[0], q[1] + (i ? 34 : -34), EC, 3.5), sh); });
  const pu = io(t, tP6n - 0.1, 0.4);
  if (pu > 0.01) s += G(arr(ax + 24, y + 70, 370, y + 70, NC, 4) + arr(bx - 24, y + 70, 414, y + 70, NC, 4) + T(392, y + 130, 'BOTH NUCLEI PULL', { c: NC, fs: 20 }), pu);
  if (cl < 0.99) s += G(T(392, y - 60, '?', { ff: 'Poppins', fw: 700, fs: 64, c: SC, ls: 0 }), io(t, wt('P2', 'where') - 0.1, 0.3) * (1 - cl));
  if (cl < 0.99) s += G(T(392, y + 110, 'H : H · LEWIS PAIR', { fs: 20 }), 1 - cl);
  put($('#pS'), s);
}

/* ---------- S: two hydrogen atoms approach ---------- */
const tS2 = wt('S2', 'closer'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tMin = wt('S5', 'seventy'), tBal = wt('S5', 'balance');
const rK = [[0, 320], [tS2 - 0.2, 320], [tS3, 210], [tS4 + 0.6, 190], [T1('S4') - 0.4, 105], [tMin - 0.2, 74], [wt('S6', 'closer'), 74], [wt('S6', 'shoots'), 50], [tS7, 50], [tS7 + 1.0, 74]];
const rAt = t => kf(rK, t);
const DE = 435.8, AM = 0.028, Em = r => DE * ((1 - Math.exp(-AM * (r - 74))) ** 2 - 1);
const GX = r => 100 + (r - 45) / 275 * 644, GY = E => 232 - (Math.min(E, 260) + 460) / 720 * 160;
const FR = [['Nucleus pulls the other electron', 'PULL', NC, wt('S2', 'nucleus')], ['Nucleus pushes nucleus', 'PUSH', C.red, wt('S3', 'Nucleus')], ['Electron pushes electron', 'PUSH', C.red, wt('S3', 'Electron')]];
$('#frs').innerHTML = FR.map(([x, k, c], i) => `<div class="fr" id="fr${i}" style="top:${84 + i * 56}px"><i style="background:${c}"></i>${x}<em style="color:${c}">${k}</em></div>`).join('');
const btg = tag($('#bn'));
const BT = [[0, 'FAR APART · NO PULL'], [wt('S2', 'pulls'), 'PULLS START'], [tS3, 'PUSHES START TOO'], [tS4, 'PULLS WIN · ENERGY DOWN'], [tMin, 'LOWEST ENERGY'], [tBal, 'BALANCED · BOND LENGTH'], [tS6, 'PUSHES WIN · ENERGY UP'], [tS7 + 0.8, 'BOND · 435.8 kJ/mol']];
function drawS(t) {
  const r = rAt(t), y = 270, sep = r * 1.55, ax = 392 - sep / 2, bx = 392 + sep / 2;
  const bond = io(t, tBal - 0.3, 0.8) * (1 - io(t, tS6, 0.3)) + io(t, tS7 + 0.6, 0.6);
  const ov = M.clamp((210 - sep) / 60);
  let s = hAtom(ax, y, 1) + hAtom(bx, y, 1) + overlapFill('sc1', ax, bx, y, 105, ov);
  const w = t * 1.6, rr = 60 - 28 * bond;
  const eA = [(ax + 60 * Math.cos(w)) * (1 - bond) + bond * (392 - 14 + 10 * Math.cos(w)), y + rr * Math.sin(w)], eB = [(bx + 60 * Math.cos(w + Math.PI)) * (1 - bond) + bond * (392 + 14 + 10 * Math.cos(w + Math.PI)), y + rr * Math.sin(w + Math.PI)];
  const pull = io(t, wt('S2', 'pulls') - 0.1) * (1 - io(t, T1('S7') - 0.5)), push = io(t, tS3 - 0.1) * (1 - io(t, T1('S7') - 0.5));
  const pw = 3 + 2 * io(t, tS4, 0.3) * (1 - io(t, tS6, 0.3)), xw = 3 + 3 * io(t, tS6, 0.3) * (1 - io(t, tS7, 0.3));
  if (pull > 0.01) s += G(`<line x1="${f1(ax)}" y1="${y}" x2="${f1(eB[0])}" y2="${f1(eB[1])}" stroke="${NC}" stroke-width="${pw}" stroke-dasharray="7 8"/><line x1="${f1(bx)}" y1="${y}" x2="${f1(eA[0])}" y2="${f1(eA[1])}" stroke="${NC}" stroke-width="${pw}" stroke-dasharray="7 8"/>`, pull);
  if (push > 0.01) s += G(arr(ax - 26, y, ax - 26 - 30 - 10 * xw, y, C.red, xw) + arr(bx + 26, y, bx + 26 + 30 + 10 * xw, y, C.red, xw), push * io(t, wt('S3', 'Nucleus') - 0.1, 0.3)) +
    G(`<line x1="${f1(eA[0])}" y1="${f1(eA[1])}" x2="${f1(eB[0])}" y2="${f1(eB[1])}" stroke="${C.red}" stroke-width="${xw * 0.7}" stroke-opacity=".55"/>`, push * io(t, wt('S3', 'Electron') - 0.1, 0.3));
  s += eDot(eA[0], eA[1]) + eDot(eB[0], eB[1]);
  const dm = io(t, tMin - 0.1, 0.4);
  if (dm > 0.01) { const yy = y + 140; s += G(`<line x1="${f1(ax)}" y1="${yy}" x2="${f1(bx)}" y2="${yy}" stroke="${C.ink2}" stroke-width="3"/><line x1="${f1(ax)}" y1="${yy - 12}" x2="${f1(ax)}" y2="${yy + 12}" stroke="${C.ink2}" stroke-width="3"/><line x1="${f1(bx)}" y1="${yy - 12}" x2="${f1(bx)}" y2="${yy + 12}" stroke="${C.ink2}" stroke-width="3"/>` + T((ax + bx) / 2, yy + 40, 'BOND LENGTH', { fs: 17 }), dm); }
  s += T(36, 540, `r = ${Math.round(r)} pm`, { a: 'start', fs: 34, c: C.ink, ls: 0 });
  put($('#bS'), s);
  // energy graph
  const rmin = rK.reduce((m, [kt, v]) => kt <= t ? Math.min(m, v) : m, 320), rNow = Math.min(rmin, r), lo = Math.max(45, Math.min(rNow, r));
  let pts = []; for (let q = 320; q >= lo - 0.01; q -= 2.5) pts.push(`${f1(GX(q))},${f1(GY(Em(q)))}`); pts.push(`${f1(GX(lo))},${f1(GY(Em(lo)))}`);
  const lowSeen = rK.some(([kt, v]) => kt <= t && v <= 50) ? 45 : lo;
  pts = []; for (let q = 320; q >= lowSeen - 0.01; q -= 2.5) pts.push(`${f1(GX(q))},${f1(GY(Em(q)))}`);
  let g = `<line x1="100" y1="66" x2="100" y2="240" stroke="${C.ink2}" stroke-width="2.5"/>` + `<line x1="100" y1="${f1(GY(0))}" x2="752" y2="${f1(GY(0))}" stroke="${C.ink2}" stroke-width="2" stroke-dasharray="6 7" opacity=".45"/>` +
    T(84, 84, 'E', { fs: 20, c: C.ink }) + T(84, GY(0) + 7, '0', { fs: 18 }) + T(752, GY(0) + 30, 'DISTANCE r', { a: 'end', fs: 15 });
  g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${BC}" stroke-width="4" stroke-linejoin="round"/>`;
  const mk = io(t, tMin - 0.1, 0.4);
  if (mk > 0.01) g += G(`<line x1="${f1(GX(74))}" y1="${f1(GY(0))}" x2="${f1(GX(74))}" y2="${f1(GY(-DE))}" stroke="${BC}" stroke-width="2" stroke-dasharray="4 6"/>` + T(320, 204, '74 pm', { a: 'start', fs: 22, c: C.ink, ls: 0 }), mk);
  const ek = io(t, wt('S7', 'released') - 0.1, 0.4);
  if (ek > 0.01) g += G(T(412, 204, '· -435.8 kJ/mol', { a: 'start', fs: 22, fw: 700, c: BC, ls: 0 }), ek);
  g += `<circle cx="${f1(GX(Math.max(45, r)))}" cy="${f1(GY(Em(r)))}" r="10" fill="${BC}" stroke="#fff" stroke-width="3"/>`;
  put($('#gS'), g);
  return { pull, push };
}

/* ---------- B: ways to meet, sigma and pi ---------- */
const OV = [['Positive overlap', 'SAME SIGNS · BOND', 'B2'], ['Negative overlap', 'OPPOSITE SIGNS · NO BOND', 'B3'], ['Zero overlap', 'RIGHT ANGLE · NO BOND', 'B4']];
const miniOv = k => k === 0 ? pOrb(80, 60, 0, 62, 26, 18) + pOrb(196, 60, 180, 62, 26, 18) + glow(138, 60, 16, 20, SC, 0.6)
  : k === 1 ? pOrb(80, 60, 0, 62, 26, 18) + pOrb(196, 60, 0, 62, 26, 18) + `<path d="M126 44 150 76M150 44 126 76" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>`
  : sOrb(96, 60, 32, 0) + pOrb(146, 60, -90, 52, 22, 16);
$('#ovs').innerHTML = OV.map(([n, w], i) => `<div class="ov" id="ov${i}" style="top:${84 + i * 148}px"><svg width="280" height="120">${miniOv(i)}</svg><div class="on">${n}</div><div class="ow">${w}</div></div>`).join('');
const tOv = OV.map(o => T0(o[2]));
const otg = tag($('#or'));
const tB5 = T0('B5'), tB6 = T0('B6'), tW0 = wt('B5', 'Head'), tW1_ = wt('B5', 'with', 1) - 0.3, tW2_ = wt('B5', 'with', 2) - 0.3, tSide = wt('B6', 'Side');
const OT = [[tB1, 'ORBITAL SIGNS · + AND -'], [tOv[0], 'SAME SIGNS · BOND FORMS'], [tOv[1], 'OPPOSITE SIGNS · NO BOND'], [tOv[2], 'RIGHT ANGLE · CANCELS OUT'], [tB5, 'SIGMA · HEAD-ON'], [tB6, 'PI · SIDE BY SIDE']];
function drawO(t) {
  const y = 300; let s = '';
  const ph = t < tOv[0] ? 0 : t < tOv[1] ? 1 : t < tOv[2] ? 2 : t < tB5 ? 3 : t < tB6 ? 4 : 5, tin = [tB1, tOv[0], tOv[1], tOv[2], tB5, tB6][ph], a = io(t, tin, 0.35);
  if (ph === 0) s = G(pOrb(392, y, 0, 160, 66) + T(392, y + 150, 'ONE p ORBITAL · TWO LOBES', { fs: 18 }), a);
  else if (ph === 1 || ph === 2) { const d = kf([[tin, 300], [tin + 1.3, 112]], t), ov = io(t, tin + 1.0, 0.35);
    s = pOrb(392 - d, y, 0, 150, 62) + pOrb(392 + d, y, ph === 1 ? 180 : 0, 150, 62);
    s += ph === 1 ? glow(392, y, 38, 42, SC, 0.65 * ov) : G(glow(392, y, 38, 42, C.red, 0.18) + `<path d="M362 ${y - 34} 422 ${y + 34}M422 ${y - 34} 362 ${y + 34}" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>`, ov);
    s += G(T(392, y + 150, ph === 1 ? '+ MEETS +' : '+ MEETS -', { fs: 20, c: ph === 1 ? C.ok : C.red }), a); s = G(s, a); }
  else if (ph === 3) { const sx = kf([[tin, 120], [tin + 1.4, 336]], t), ov = io(t, tin + 1.2, 0.35);
    s = G(pOrb(452, y, -90, 150, 60) + sOrb(sx, y, 78) + G(T(392, y - 160, '+ WITH +', { fs: 18, c: C.ok }) + T(392, y + 176, '+ WITH -', { fs: 18, c: C.red }) + T(640, y + 8, '= 0', { fs: 30, c: C.ink, ls: 0 }), ov), a); }
  else if (ph === 4) { const R = [[tW0, 160, 'S + S'], [tW1_, 300, 'S + P'], [tW2_, 440, 'P + P']];
    R.forEach(([tt, yy, lb], i) => { const u = io(t, tt - 0.1, 0.4), d = 30 * (1 - u); let r = axis(150, 680, yy) + T(36, yy + 7, lb, { a: 'start', fs: 18 });
      if (i === 0) r += sOrb(392 - 62 - d, yy, 52, 0) + sOrb(392 + 62 + d, yy, 52, 0);
      if (i === 1) r += sOrb(392 - 80 - d, yy, 52, 0) + pOrb(392 + 70 + d, yy, 180, 92, 40, 18);
      if (i === 2) r += pOrb(392 - 82 - d, yy, 0, 100, 42, 18) + pOrb(392 + 82 + d, yy, 180, 100, 42, 18);
      r += glow(i === 1 ? 396 : 392, yy, 22, 26, SC, 0.7 * io(t, tt + 0.3, 0.3)); s += G(r, u); }); }
  else { const d = kf([[tSide - 0.2, 160], [tSide + 1.0, 48]], t), ov = io(t, tSide + 0.8, 0.4);
    s = axis(150, 640, y, a) + G(pOrb(392 - d, y, -90, 140, 56) + pOrb(392 + d, y, -90, 140, 56), a) + glow(392, y - 92, 28, 54, PC, 0.55 * ov) + glow(392, y + 92, 28, 54, PC, 0.55 * ov) +
      G(T(392, y + 196, 'CLOUD ABOVE AND BELOW THE AXIS', { fs: 18, c: PC }), io(t, wt('B6', 'above') - 0.1)); }
  put($('#oS'), s);
  M.setT(otg, OT[cur(OT, t)][1]);
  M.setT($('#orL'), ph < 4 ? 'MOLECULE BENCH · OVERLAP' : ph === 4 ? 'MOLECULE BENCH · SIGMA σ' : 'MOLECULE BENCH · PI π');
}
const th1 = PUC.think($('#th1'), { q: 'Which grips harder: head-on <span class="sg">sigma σ</span> or side by side <span class="pi">pi π</span>?', opts: ['Sigma σ', 'Pi π'], right: 0, why: 'Sigma. Head-on overlap is <b>bigger</b>, so the bond is <b>stronger</b>.' });

/* ---------- D: rules, single double triple ---------- */
const LK = [['LINK 1', 'Overlap, with the same sign', 'BOND', 'D2'], ['LINK 2', 'Bigger overlap, stronger bond', 'STRONGER', 'D3'], ['LINK 3', 'The first bond is always σ', 'σ FIRST', 'D4'], ['LINK 4', 'Double 1σ + 1π · triple 1σ + 2π', 'σ + π', 'D5'], ['LINK 5', 'A π bond needs a σ bond', 'π NEEDS σ', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const dtg = tag($('#dr'));
const DR = [[tLk[0], 150, 'SINGLE · H₂', 'H', 0], [wt('D5', 'double') - 0.1, 300, 'DOUBLE · O₂', 'O', 1], [wt('D5', 'triple') - 0.1, 450, 'TRIPLE · N₂', 'N', 2]];
const DT = [[tD1, 'ONE SIGMA IN EVERY BOND'], [tLk[0], 'SAME SIGN · OVERLAP'], [tLk[1], 'BIGGER OVERLAP'], [tLk[2], 'FIRST BOND · σ'], [DR[1][0], 'DOUBLE · 1σ + 1π'], [DR[2][0], 'TRIPLE · 1σ + 2π'], [tLk[4], 'π SITS ON A σ']];
function drawD(t) {
  let s = '';
  DR.forEach(([tt, y, lb, el, np]) => { const u = io(t, tt, 0.4); if (u < 0.01) return;
    const big = 1 + 0.25 * io(t, tLk[1] + 0.3, 0.4) * (1 - io(t, tLk[2], 0.4)), sgH = io(t, wt('D4', 'sigma') - 0.1, 0.3), pf = 0.45 + 0.35 * io(t, tLk[4] + 0.2, 0.3) * (1 - io(t, tLk[4] + 1.6, 0.4));
    let r = T(36, y - 44, lb, { a: 'start', fs: 17 }) + glow(395, y, 62 * big, 20 * big, SC, 0.6 + 0.2 * sgH);
    if (np >= 1) r += glow(395, y - 34, 70, 13, PC, pf) + glow(395, y + 34, 70, 13, PC, pf);
    if (np >= 2) r += `<ellipse cx="395" cy="${y}" rx="78" ry="52" fill="none" stroke="${PC}" stroke-width="3" stroke-dasharray="7 7" opacity="${pf.toFixed(3)}"/>`;
    [300, 490].forEach(x => { r += `<circle cx="${x}" cy="${y}" r="26" fill="${NC}"/>` + T(x, y + 8, el, { ff: 'Poppins', fw: 700, fs: 22, c: '#fff', ls: 0 }); });
    r += `<text x="610" y="${y + 9}" font-family="IBM Plex Mono" font-weight="600" font-size="26"><tspan fill="${SC}">1σ</tspan>${np ? `<tspan fill="${C.ink}"> + </tspan><tspan fill="${PC}">${np}π</tspan>` : ''}</text>`;
    s += G(r, u); });
  put($('#dS'), s);
  M.setT(dtg, DT[cur(DT, t)][1]);
}

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${S_('\\sigma')}\\ \\text{head-on} \\;>\\; ${P_('\\pi')}\\ \\text{side by side}`);

/* ---------- W: ethene ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{Draw: } \\mathrm{H_2C{=}CH_2}`)],
  [K(`4 \\times \\mathrm{C{-}H} = ${S_('4\\,\\sigma')}`)],
  [K(`\\mathrm{C{=}C} = ${S_('1\\,\\sigma')} + ${P_('1\\,\\pi')}`)],
  [K(`\\text{Total} = ${S_('5\\,\\sigma')} + ${P_('1\\,\\pi')}`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 96 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wtg = tag($('#wr'));
const CA = [300, 280], CB = [484, 280], HS = [[CA, [235, 167]], [CA, [235, 393]], [CB, [549, 167]], [CB, [549, 393]]];
const tWc = wt('W2', 'Two'), tWd = wt('W2', 'double'), tWh = wt('W2', 'hydrogens'), tWf = wt('W3', 'Four'), tW4s = wt('W4', 'sigma'), tW4p = wt('W4', 'pi');
function drawW(t) {
  let s = '';
  const line = (a, b, col, w, o = 0) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), px = -dy / L * o, py = dx / L * o; return `<line x1="${f1(a[0] + px)}" y1="${f1(a[1] + py)}" x2="${f1(b[0] + px)}" y2="${f1(b[1] + py)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
  HS.forEach(([c, h], i) => { const u = io(t, tWh - 0.1 + i * 0.12), sg = io(t, tWf + i * 0.35, 0.25); s += G(line(c, h, mix(C.ink2, SC, sg), 6 + 3 * sg), u); });
  const dd = io(t, tWd - 0.1), s1 = io(t, tW4s - 0.1, 0.25), p1 = io(t, tW4p - 0.1, 0.25);
  s += G(line(CA, CB, mix(C.ink2, SC, s1), 6 + 3 * s1, 13) + line(CA, CB, mix(C.ink2, PC, p1), 6 + 3 * p1, -13), dd);
  HS.forEach(([, h], i) => { const u = io(t, tWh - 0.1 + i * 0.12); s += G(`<circle cx="${h[0]}" cy="${h[1]}" r="28" fill="${HC}"/>` + T(h[0], h[1] + 8, 'H', { ff: 'Poppins', fw: 700, fs: 22, c: '#fff', ls: 0 }), u); });
  [CA, CB].forEach((c, i) => { const u = io(t, tWc - 0.1 + i * 0.15); s += G(`<circle cx="${c[0]}" cy="${c[1]}" r="34" fill="${NC}"/>` + T(c[0], c[1] + 9, 'C', { ff: 'Poppins', fw: 700, fs: 26, c: '#fff', ls: 0 }), u); });
  put($('#wS'), s);
  const ns = HS.reduce((a, _, i) => a + (t >= tWf + i * 0.35 ? 1 : 0), 0) + (t >= tW4s ? 1 : 0), np = t >= tW4p ? 1 : 0;
  M.setT($('#wcs'), String(ns)); M.setT($('#wcp'), String(np));
  const hi = io(t, wt('W5', 'Five') - 0.1, 0.3); $('#wc').querySelectorAll('span').forEach(e => setBg(e, mix(C.soft, C.ac2, hi)));
  const WT = [[0, 'C₂H₄'], [tWd, 'C=C DOUBLE BOND'], [tWf, 'C-H · ONE σ EACH'], [tW4s, 'C=C · 1σ + 1π'], [T0('W5'), '5σ + 1π']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- C: sigma vs pi ---------- */
const CR = [['OVERLAP', 'Head-on', 'Side by side', 'C2'], ['CLOUD', 'On the axis', 'Above and below', 'C3'], ['STRENGTH', 'Stronger', 'Weaker', 'C4'], ['ALONE?', 'Can stand alone', 'Needs a σ first', 'C5']];
[0, 1].forEach(k => { $('#cr' + k).innerHTML = CR.map(([key, a, b], i) => `<div class="cc" id="cc${k}${i}" style="top:${280 + i * 70}px;height:58px"><div class="ck" style="top:18px">${key}</div><div class="cv" style="top:12px">${k ? b : a}</div></div>`).join(''); });
const tCr = CR.map(c => T0(c[3]));
$('#cS1').innerHTML = axis(120, 664, 120) + pOrb(392 - 84, 120, 0, 100, 42, 20) + pOrb(392 + 84, 120, 180, 100, 42, 20) + glow(392, 120, 22, 28, SC, 0.7);
$('#cS2').innerHTML = axis(120, 664, 120) + pOrb(392 - 46, 120, -90, 92, 40, 20) + pOrb(392 + 46, 120, -90, 92, 40, 20) + glow(392, 120 - 60, 20, 34, PC, 0.55) + glow(392, 120 + 60, 20, 34, PC, 0.55);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A triple bond has 3 bonds, so it has <b>3 π</b> bonds', right: 'One is always σ: triple = <b class="sg">1σ</b> + <b class="pi">2π</b>' });
const tri = (cx, cols) => [90, 210].map(x => `<circle cx="${cx - 150 + x}" cy="110" r="22" fill="${NC}"/>` + T(cx - 150 + x, 117, 'N', { ff: 'Poppins', fw: 700, fs: 18, c: '#fff', ls: 0 })).join('') + cols.map((c, i) => `<line x1="${cx - 38}" y1="${96 + i * 14}" x2="${cx + 38}" y2="${96 + i * 14}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`).join('');
$('#tS').innerHTML = `<g id="tM1">${tri(150, [PC, PC, PC]) + T(150, 200, 'π + π + π', { fs: 20, c: C.red, ls: 0 })}</g><g id="tM2">${tri(460, [PC, SC, PC]) + T(460, 200, '1σ + 2π', { fs: 20, c: C.ok, ls: 0 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M80 60 L220 170 M220 60 L80 170'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Counting σ and π bonds, and statements on orbital overlap' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Propyne is CH₃-C≡CH. How many <b>σ</b> and <b>π</b> bonds does it have?', qW: 820,
  opts: [K(`${S_('6\\,\\sigma')},\\ ${P_('2\\,\\pi')}`), K(`${S_('5\\,\\sigma')},\\ ${P_('3\\,\\pi')}`), K(`${S_('7\\,\\sigma')},\\ ${P_('1\\,\\pi')}`), K(`${S_('6\\,\\sigma')},\\ ${P_('3\\,\\pi')}`)], right: 0, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{C{-}H}: 3 + 1 = ${S_('4\\,\\sigma')}`)], [K(`+\\ \\mathrm{C{-}C}\\ \\text{single} = ${S_('5\\,\\sigma')}`)], [K(`\\mathrm{C{\\equiv}C}: ${S_('1\\,\\sigma')} + ${P_('2\\,\\pi')}`)], [K(`\\text{Total: } ${S_('6\\,\\sigma')},\\ ${P_('2\\,\\pi')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Total')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Valence bond theory', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Valence bond theory</b>: a bond forms where two orbitals overlap',
    '<b>In the overlap</b>: two electrons with opposite spins, pulled by both nuclei',
    '<b>H₂</b>: bond length <b>74 pm</b> · <span style="color:#2F6FEB">435.8 kJ/mol</span> released',
    '<b>Same sign</b> = bond · <b>opposite sign or right angle</b> = no bond',
    '<b class="sg">σ</b> head-on, on the axis, stronger · <b class="pi">π</b> side by side, above and below',
    '<b>Double</b> = <span class="sg">1σ</span> + <span class="pi">1π</span> · <b>Triple</b> = <span class="sg">1σ</span> + <span class="pi">2π</span>'] });
const YQ = ['How much energy is released when two H atoms form one mole of bonds?', 'Why is a sigma bond stronger than a pi bond?', 'How many sigma and pi bonds are there in a triple bond?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 48', topic: 'Two half-filled orbitals, four equal bonds? Hybridisation', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'overlap') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'only') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'firmer') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'know') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P5', 'big') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'Lewis') - 0.2, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(hlP, t, wt('P3', 'Heitler') - 0.1, wt('P4', 'orbital') - 0.2, { ...POP, outDur: 0.25, ody: 0 });
    M.setT(ptag, t < tP4 ? 'LEWIS · H:H' : t < tP5 ? 'ORBITAL · ELECTRON CLOUD' : t < tP6 ? 'ORBITALS OVERLAP' : 'OPPOSITE SPINS · SHARED');
    M.vis(ptag, t, wt('P2', 'Lewis'), 1e9, POP);
  }

  /* S: the bench */
  const sOn = t >= tS1 - 0.1 && t < tB1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eg'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#fc'), t, tS1 + 0.6, z, { dy: 36, ...o });
    drawS(t);
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    const win = [io(t, tS4, 0.3) * (1 - io(t, tMin, 0.3)), io(t, tS6, 0.3) * (1 - io(t, tS7, 0.3)), io(t, tS6, 0.3) * (1 - io(t, tS7, 0.3))];
    FR.forEach((f, i) => { const el = $('#fr' + i); M.vis(el, t, f[3] - 0.1, 1e9, { dy: 12 }); setBg(el, mix(C.soft, i ? '#FBE3E1' : C.ac2, Math.max(win[i], io(t, f[3], 0.25) * (1 - io(t, f[3] + 1.4, 0.4))))); });
  }

  /* B: overlap kinds */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const z = OUT('B7');
    M.vis($('#ol'), t, tB1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#or'), t, tB1 + 0.2, z, { dx: 60, dy: 0, ...o });
    OV.forEach((_, i) => { const el = $('#ov' + i); M.vis(el, t, wt('B1', 'signs') + i * 0.15, 1e9, { dy: 14 }); const on = i === 0 ? io(t, tOv[0], 0.25) * (1 - io(t, tOv[1], 0.25)) + io(t, tB5, 0.3) : io(t, tOv[i], 0.25) * (1 - io(t, i < 2 ? tOv[i + 1] : tB5, 0.25)); setBg(el, mix(C.soft, C.ac2, Math.min(1, on))); });
    drawO(t); M.vis(otg, t, tB1 + 0.4, 1e9, POP);
    M.vis($('#th1'), t, tB7 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB7, tOpts: wt('B7', 'head') - 0.1, tCount: T1('B7') + 0.05, dur: 3, tAns: T0('B8') - 0.02, tWhy: wt('B8', 'Head') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    drawD(t); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Bonds') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Head') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'pi') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Count') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, wt('W1', 'Count') + 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wc'), t, wt('W1', 'ethene'), 1e9, POP);
    drawW(t); M.vis(wtg, t, wt('W1', 'ethene'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cS1'), t, wt('C1', 'sigma') - 0.1, 1e9, { dy: 16 }); M.vis($('#cS2'), t, wt('C1', 'pi') - 0.1, 1e9, { dy: 16 });
    CR.forEach((_, i) => [0, 1].forEach(k => { const el = $('#cc' + k + i); M.vis(el, t, tCr[i] - 0.1 + k * 0.15, 1e9, { dy: 14 }); const on = M.io((t - tCr[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tCr[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); }));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'triple') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'One') - 0.1 });
    PUC.attr($('#tM1'), 'opacity', io(t, wt('X2', 'three', 1) - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); PUC.attr($('#tM2'), 'opacity', io(t, wt('X3', 'triple') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Counting') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
