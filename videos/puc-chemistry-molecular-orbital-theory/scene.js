// PUC Chemistry Ep 49: molecular orbital theory (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: atoms / bonding orbitals and Nb teal, antibonding orbitals and Na red, electrons orange, atomic orbitals ink
const NC = C.ac, RC = '#D64545', EC = '#C8461B', HC = C.ink;
const IMG = '../../assets/illustrations/puc/';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const B_ = s => `\\textcolor{${NC}}{${s}}`, A_ = s => `\\textcolor{${RC}}{${s}}`;

Object.assign(M.IC, {
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  wave: ['M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 2 2 2 2'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
});

/* ---------- drawing helpers ---------- */
const f1 = v => (+v).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}">${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
const tint = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const lerp = M.lerp;
// electron arrow centred on a level line at (x, y)
const ea = (x, y, up, a = 1, c = EC) => a < 0.01 ? '' : G(up ? `<line x1="${f1(x)}" y1="${f1(y + 20)}" x2="${f1(x)}" y2="${f1(y - 12)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y - 22)} ${f1(x - 8)},${f1(y - 9)} ${f1(x + 8)},${f1(y - 9)}" fill="${c}"/>`
  : `<line x1="${f1(x)}" y1="${f1(y - 20)}" x2="${f1(x)}" y2="${f1(y + 12)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 22)} ${f1(x - 8)},${f1(y + 9)} ${f1(x + 8)},${f1(y + 9)}" fill="${c}"/>`, a);
const lev = (x, y, w, c, a = 1) => G(`<line x1="${f1(x - w / 2)}" y1="${f1(y)}" x2="${f1(x + w / 2)}" y2="${f1(y)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`, a);
const dsh = (x1, y1, x2, y2, a = 1) => G(`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${C.mute}" stroke-width="2" stroke-dasharray="5 7"/>`, a);
const nucl = (x, y, lab = 'H', r = 18) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${NC}"/>` + T(x, y + r * 0.36, lab, { ff: 'Poppins', fw: 700, fs: r * 0.95, c: '#fff', ls: 0 });
const eAxis = (x = 44, y1 = 520, y2 = 100) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 + 14}" stroke="${C.ink2}" stroke-width="2.5"/><polygon points="${x},${y2} ${x - 8},${y2 + 16} ${x + 8},${y2 + 16}" fill="${C.ink2}"/><text x="${x - 16}" y="${(y1 + y2) / 2}" transform="rotate(-90 ${x - 16} ${(y1 + y2) / 2})" font-family="IBM Plex Mono" font-weight="600" font-size="15" fill="${C.mute}" text-anchor="middle" letter-spacing="1.6">ENERGY</text>`;
// wave curves: psi = exp(-|x - x0| / 70)
const XA = 290, XB = 494, psi = (x, x0) => Math.exp(-Math.abs(x - x0) / 70);
const curve = (fn, y0, amp, col, w = 4, dash = '', x1 = 90, x2 = 694) => { const pts = []; for (let x = x1; x <= x2; x += 4) pts.push(`${x},${f1(y0 - amp * fn(x))}`); return `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`; };

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
const JOBS = [['magnet', 'Liquid oxygen', 'STICKS TO A MAGNET', 'oxygen', 'STICKS'], ['droplet', 'Liquid nitrogen', 'RUNS STRAIGHT PAST', 'nitrogen', 'PASSES'], ['x', 'Two helium atoms', 'NEVER STAY TOGETHER', 'helium', 'NO He₂']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['phone', 'Two phones', 'phones', 'H3'], ['wave', 'Same tone', 'tone', 'H3'], ['plus', 'Adds: louder', 'louder', 'H4'], ['x', 'Cancels: quiet', 'cancels', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: the idea ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['VBT: each electron stays with its atom', 'OWN ATOM', 'P2', 'valence'], ['MOT: electrons belong to the molecule', 'WHOLE', 'P3', 'whole'], ['Hund and Mulliken', '1932', 'P3', 'Hund'], ['LCAO: add or subtract orbitals', 'LCAO', 'P5', 'L'], ['Two orbitals in, two out', '2 = 2', 'P6', 'Two']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tMerge = wt('P3', 'merge'), tWav = wt('P4', 'adding'), tSub = wt('P4', 'subtracting'), tTwo = T0('P6');
function drawP(t) {
  const y = 190, m = io(t, tMerge - 0.1, 0.9), wv = io(t, tWav - 0.2, 0.4);
  let s = '';
  // two atoms, then one shared cloud
  const sep = lerp(300, 200, m), ax = 392 - sep / 2, bx = 392 + sep / 2, w = t * 1.5;
  s += G(`<circle cx="${f1(ax)}" cy="${y}" r="88" fill="${tint(NC, 0.16)}" stroke="${NC}" stroke-opacity=".5" stroke-width="2.5"/><circle cx="${f1(bx)}" cy="${y}" r="88" fill="${tint(NC, 0.16)}" stroke="${NC}" stroke-opacity=".5" stroke-width="2.5"/>`, 1 - m);
  s += G(`<ellipse cx="392" cy="${y}" rx="${f1(sep / 2 + 96)}" ry="94" fill="${tint(NC, 0.2)}" stroke="${NC}" stroke-opacity=".6" stroke-width="2.5"/>`, m);
  s += nucl(ax, y) + nucl(bx, y);
  const e1 = [lerp(ax + 50 * Math.cos(w), 392 + 170 * Math.cos(w * 0.7), m), y + lerp(50, 60, m) * Math.sin(w)], e2 = [lerp(bx + 50 * Math.cos(w + Math.PI), 392 + 170 * Math.cos(w * 0.7 + Math.PI), m), y + lerp(50, 60, m) * Math.sin(w + Math.PI)];
  s += `<circle cx="${f1(e1[0])}" cy="${f1(e1[1])}" r="9" fill="${EC}"/><circle cx="${f1(e2[0])}" cy="${f1(e2[1])}" r="9" fill="${EC}"/>`;
  s = G(s, 1);
  // waves: add and subtract
  if (wv > 0.01) {
    const a1 = io(t, tWav, 0.5), a2 = io(t, tSub, 0.5);
    let g = `<line x1="90" y1="${y + 200}" x2="694" y2="${y + 200}" stroke="${C.line}" stroke-width="2"/>`;
    g += G(curve(x => 0.75 * (psi(x, XA) + psi(x, XB)), y + 200, 80, NC, 5) + T(700, y + 206, 'ADD', { a: 'end', fs: 18, c: NC }), a1);
    g += `<line x1="90" y1="${y + 330}" x2="694" y2="${y + 330}" stroke="${C.line}" stroke-width="2"/>`;
    g += G(curve(x => psi(x, XA) - psi(x, XB), y + 330, 56, RC, 5) + T(700, y + 300, 'SUBTRACT', { a: 'end', fs: 18, c: RC }), a2);
    g += G(T(392, y + 380, '2 ATOMIC IN · 2 MOLECULAR OUT', { fs: 18, c: C.ink }), io(t, tTwo, 0.4));
    s += G(g, wv);
  }
  put($('#pS'), s);
  M.setT(ptag, t < tMerge ? 'ELECTRON BELONGS TO ITS ATOM' : t < tWav ? 'ELECTRONS SHARE ONE CLOUD' : 'ADD OR SUBTRACT');
}

/* ---------- S + B ---------- */
const tAdd = wt('S2', 'add'), tSg = wt('S3', 'sigma'), tCan = wt('S4', 'cancel'), tNode = wt('S4', 'node'), tSs = wt('S5', 'sigma'), tFill = T0('S6'), tBoth = wt('S7', 'both'), tStab = wt('S7', 'stable');
const tHe = T0('B1'), tHe2 = wt('B2', 'fill'), tHeA = wt('B2', 'antibonding'), tUndo = T0('B3');
function benchS(t) {
  const y = 210, bAdd = io(t, tAdd - 0.1, 0.8), bCan = io(t, tCan - 0.1, 0.6) * (1 - io(t, tFill, 0.6));
  const bond = bAdd * (1 - bCan);
  let s = '';
  // atoms before combining
  s += G(`<circle cx="${XA}" cy="${y}" r="92" fill="${tint(NC, 0.14)}" stroke="${NC}" stroke-opacity=".45" stroke-width="2.5"/><circle cx="${XB}" cy="${y}" r="92" fill="${tint(NC, 0.14)}" stroke="${NC}" stroke-opacity=".45" stroke-width="2.5"/>`, 1 - bAdd);
  // bonding: one cloud thick between the nuclei
  s += G(`<ellipse cx="392" cy="${y}" rx="200" ry="96" fill="${tint(NC, 0.18)}" stroke="${NC}" stroke-width="3"/><ellipse cx="392" cy="${y}" rx="90" ry="62" fill="${tint(NC, 0.22)}"/>` + T(392, y + 136, 'σ1s · BONDING', { fs: 20, c: NC }), bond);
  // antibonding: two lobes and a node
  s += G(`<ellipse cx="${XA - 34}" cy="${y}" rx="112" ry="88" fill="${tint(RC, 0.12)}" stroke="${RC}" stroke-width="3"/><ellipse cx="${XB + 34}" cy="${y}" rx="112" ry="88" fill="${tint(RC, 0.12)}" stroke="${RC}" stroke-width="3"/>` +
    `<line x1="392" y1="${y - 110}" x2="392" y2="${y + 110}" stroke="${C.ink2}" stroke-width="3" stroke-dasharray="8 8" opacity="${io(t, tNode - 0.1).toFixed(3)}"/>` + G(T(392, y - 120, 'NODE', { fs: 18, c: C.ink }), io(t, tNode - 0.1)) + T(392, y + 136, 'σ*1s · ANTIBONDING', { fs: 20, c: RC }), bCan);
  s += nucl(XA, y) + nucl(XB, y);
  // electrons in the bonding cloud
  const ein = io(t, tBoth, 0.5), w = t * 1.6;
  if (ein > 0.01) s += G(`<circle cx="${f1(392 + 120 * Math.cos(w))}" cy="${f1(y + 40 * Math.sin(w))}" r="9" fill="${EC}"/><circle cx="${f1(392 + 120 * Math.cos(w + Math.PI))}" cy="${f1(y + 40 * Math.sin(w + Math.PI))}" r="9" fill="${EC}"/>`, ein * bond);
  // wave graph
  const y0 = 470;
  let g = `<line x1="90" y1="${y0}" x2="694" y2="${y0}" stroke="${C.line}" stroke-width="2"/>` + T(90, y0 + 40, 'WAVE OF EACH ATOM', { a: 'start', fs: 15 });
  g += curve(x => psi(x, XA), y0, 70, C.ink2, 2.5, '6 6') + curve(x => psi(x, XB), y0, 70, C.ink2, 2.5, '6 6');
  g += G(curve(x => 0.8 * (psi(x, XA) + psi(x, XB)), y0, 70, NC, 5), bond) + G(curve(x => psi(x, XA) - psi(x, XB), y0, 70, RC, 5), bCan);
  s += g;
  return s;
}
function benchB(t) {
  const lv = io(t, tHeA - 0.1, 0.8), tilt = 12 * (1 - lv) * io(t, tHe2 - 0.2, 0.5), cx = 392, cy = 300, L = 240, r = tilt * Math.PI / 180;
  const lx = cx - L * Math.cos(r), ly = cy + L * Math.sin(r), rx = cx + L * Math.cos(r), ry = cy - L * Math.sin(r);
  let s = `<polygon points="${cx},${cy} ${cx - 34},${cy + 190} ${cx + 34},${cy + 190}" fill="${C.soft}" stroke="${C.ink2}" stroke-width="3"/>` + `<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(rx)}" y2="${f1(ry)}" stroke="${C.ink2}" stroke-width="7" stroke-linecap="round"/>` + `<circle cx="${cx}" cy="${cy}" r="10" fill="${C.ink2}"/>`;
  const pan = (x, y, col, lab, sub, n, a) => `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y + 60)}" stroke="${C.ink2}" stroke-width="3"/><path d="M${f1(x - 90)} ${f1(y + 60)} h180 a90 40 0 0 1 -180 0Z" fill="${tint(col, 0.14)}" stroke="${col}" stroke-width="3"/>` +
    G([-1, 1].slice(0, n).map(k => `<circle cx="${f1(x + 22 * k)}" cy="${f1(y + 78)}" r="10" fill="${EC}"/>`).join(''), a) + T(x, y - 72, lab, { fs: 20, c: col }) + T(x, y - 44, sub, { fs: 15 });
  s += pan(lx, ly, NC, 'BONDING', 'HOLDS TOGETHER', 2, io(t, tHe2 - 0.1)) + pan(rx, ry, RC, 'ANTIBONDING', 'PULLS APART', 2, io(t, tHeA - 0.1));
  s += G(T(cx, 540, 'NET GAIN = 0 · NO BOND', { fs: 22, c: C.ink }), io(t, tUndo, 0.4));
  s += T(cx, 120, 'He + He · 4 ELECTRONS', { fs: 20, c: C.ink });
  return s;
}
// H2 / He2 energy diagram
const AX = 130, BX = 654, AY = 300, SY = 440, SSY = 160, MX = 392;
function enS(t) {
  const sg = io(t, tSg - 0.4, 0.4), ss = io(t, tSs - 0.4, 0.4), he = io(t, tHe, 0.5);
  let s = eAxis();
  s += lev(AX, AY, 110, HC) + lev(BX, AY, 110, HC) + T(AX, AY + 52, he > 0.5 ? 'He 1s' : 'H 1s', { fs: 20, c: C.ink, ls: 0 }) + T(BX, AY + 52, he > 0.5 ? 'He 1s' : 'H 1s', { fs: 20, c: C.ink, ls: 0 });
  s += G(lev(MX, SY, 120, NC) + dsh(AX + 55, AY, MX - 60, SY) + dsh(BX - 55, AY, MX + 60, SY) + T(MX + 76, SY + 7, 'σ1s', { a: 'start', fs: 22, c: NC, ls: 0 }) + T(MX, SY + 50, 'BONDING · LOWER', { fs: 15, c: NC }), sg);
  s += G(lev(MX, SSY, 120, RC) + dsh(AX + 55, AY, MX - 60, SSY) + dsh(BX - 55, AY, MX + 60, SSY) + T(MX + 76, SSY + 7, 'σ*1s', { a: 'start', fs: 22, c: RC, ls: 0 }) + T(MX, SSY - 40, 'ANTIBONDING · HIGHER', { fs: 15, c: RC }), ss);
  // electrons
  const f = io(t, tBoth - 0.2, 0.9), heIn = io(t, tHe2 - 0.2, 0.9), heA = io(t, tHeA - 0.2, 0.9);
  if (he < 0.5) {
    const ap = io(t, tFill - 0.1, 0.4);
    s += ea(lerp(AX, MX - 14, f), lerp(AY, SY, f), 1, ap) + ea(lerp(BX, MX + 14, f), lerp(AY, SY, f), f < 0.5, ap);
  } else {
    s += ea(lerp(AX - 12, MX - 14, heIn), lerp(AY, SY, heIn), 1) + ea(lerp(BX - 12, MX + 14, heIn), lerp(AY, SY, heIn), heIn < 0.5 ? 1 : 0);
    s += ea(lerp(AX + 12, MX - 14, heA), lerp(AY, SSY, heA), heA < 0.5 ? 0 : 1) + ea(lerp(BX + 12, MX + 14, heA), lerp(AY, SSY, heA), 0);
  }
  s += G(T(MX, 548, he > 0.5 ? 'He₂ · 2 BONDING, 2 ANTIBONDING' : 'H₂ · BOTH IN BONDING', { fs: 18, c: C.ink }), he > 0.5 ? io(t, tHeA, 0.4) : io(t, tBoth + 0.4, 0.4));
  return s;
}
const btg = tag($('#bn')), etg = tag($('#en'));
const BT = [[0, 'TWO 1s WAVES'], [tAdd, 'WAVES ADD'], [tCan, 'WAVES CANCEL'], [tFill, 'ELECTRONS IN'], [tHe, 'HELIUM'], [tUndo, 'GAIN = LOSS']];
const ET = [[0, 'START'], [tSg, 'LOWER: BONDING'], [tSs, 'HIGHER: ANTIBONDING'], [tFill, 'LOWEST FIRST · 2 PER LEVEL'], [tStab, 'H₂ IS STABLE'], [tHe, '4 ELECTRONS'], [tHeA, 'TWO FORCED UP']];
const th1 = PUC.think($('#th1'), { q: 'Two bonding electrons, two antibonding electrons. Can <b>He₂</b> exist?', opts: ['Yes', 'No'], right: 1, why: '<b>No</b>. The antibonding pair cancels the bonding pair, so there is no net gain.' });

/* ---------- D: bond order ---------- */
const LK = [['LINK 1', 'Nb: electrons in bonding orbitals', 'Nb', 'D2'], ['LINK 2', 'Na: electrons in antibonding orbitals', 'Na', 'D3'], ['LINK 3', 'Bond order = ½ (Nb - Na)', 'FORMULA', 'D4'], ['LINK 4', 'Zero: no molecule · positive: stable', '0 OR MORE', 'D5'], ['LINK 5', 'Higher order: shorter, stronger', 'STRONGER', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
$('#dF').innerHTML = K(`\\text{Bond order} = \\tfrac{1}{2}\\,(${B_('N_b')} - ${A_('N_a')})`);
const mini = (cx, y, nb, na, lab) => lev(cx, y + 70, 90, NC) + lev(cx, y - 70, 90, RC) + T(cx + 58, y + 77, 'σ', { a: 'start', fs: 20, c: NC, ls: 0 }) + T(cx + 58, y - 63, 'σ*', { a: 'start', fs: 20, c: RC, ls: 0 }) +
  ea(cx - 14, y + 70, 1, nb > 0 ? 1 : 0) + ea(cx + 14, y + 70, 0, nb > 1 ? 1 : 0) + ea(cx - 14, y - 70, 1, na > 0 ? 1 : 0) + ea(cx + 14, y - 70, 0, na > 1 ? 1 : 0) + T(cx, y + 140, lab, { fs: 22, c: C.ink, ls: 0 });
function drawD(t) {
  const y = 330, k = cur(tLk.map(x => [x - 0.2]), t), a = i => io(t, tLk[i] - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.25, 0.3) : 1);
  let s = '';
  const nbH = io(t, tLk[0] + 0.3), naH = io(t, tLk[1] + 0.3);
  const pre = (1 - io(t, tLk[2] - 0.25, 0.3)) * io(t, tLk[0] - 0.2, 0.35);
  s += G(mini(230, y, 2, 0, 'H₂') + mini(560, y, 2, 2, 'He₂') + G(T(230, 520, 'Nb = 2 · Na = 0', { fs: 20, c: NC }), nbH) + G(T(560, 520, 'Nb = 2 · Na = 2', { fs: 20, c: RC }), naH), pre);
  s += G(T(392, 290, 'H₂:  ½ (2 - 0) = 1', { fs: 34, c: NC, ls: 0 }) + T(392, 370, 'He₂: ½ (2 - 2) = 0', { fs: 34, c: RC, ls: 0 }) + T(392, 450, 'ZERO MEANS NO BOND', { fs: 18 }), a(2));
  { let g = `<line x1="110" y1="330" x2="680" y2="330" stroke="${C.ink2}" stroke-width="4"/>`;
    [0, 1, 2, 3].forEach(v => { const x = 110 + v * 190; g += `<line x1="${x}" y1="316" x2="${x}" y2="344" stroke="${C.ink2}" stroke-width="4"/>` + T(x, 384, String(v), { fs: 30, c: v ? NC : RC, ls: 0 }); });
    g += `<rect x="96" y="248" width="28" height="28" rx="6" fill="${RC}"/>` + T(110, 236, 'He₂', { fs: 20, c: RC, ls: 0 }) + `<rect x="286" y="248" width="28" height="28" rx="6" fill="${NC}"/>` + T(300, 236, 'H₂', { fs: 20, c: NC, ls: 0 });
    g += T(110, 440, 'NO MOLECULE', { fs: 16, c: RC }) + T(490, 440, 'STABLE MOLECULE', { fs: 16, c: NC }); s += G(g, a(3)); }
  { let g = ''; [[1, 330, 'SINGLE'], [2, 270, 'DOUBLE'], [3, 220, 'TRIPLE']].forEach(([n, L, lb], i) => { const yy = 250 + i * 100, x0 = 392 - L / 2;
      g += `<circle cx="${x0}" cy="${yy}" r="20" fill="${NC}"/><circle cx="${x0 + L}" cy="${yy}" r="20" fill="${NC}"/>` + [...Array(n)].map((_, q) => `<line x1="${x0 + 20}" y1="${yy + (q - (n - 1) / 2) * 12}" x2="${x0 + L - 20}" y2="${yy + (q - (n - 1) / 2) * 12}" stroke="${C.ink2}" stroke-width="5"/>`).join('') + T(110, yy + 7, 'ORDER ' + n, { fs: 18, c: C.ink, a: 'start' }); });
    g += T(392, 540, 'HIGHER ORDER · SHORTER · STRONGER', { fs: 18, c: NC }); s += G(g, a(4)); }
  put($('#dS'), s);
  return k;
}
const dtg = tag($('#dr'));

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{Bond order} = \\tfrac{1}{2}\\,(${B_('N_b')} - ${A_('N_a')})`);

/* ---------- W: O2 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{O_2}: 8 + 8 = 16\\ e^-`)],
  [K(`${B_('N_b = 10')},\\quad ${A_('N_a = 6')}`)],
  [K(`\\tfrac{1}{2}(${B_('10')} - ${A_('6')}) = 2`)],
  [K(`\\pi^*: \\uparrow\\ \\ \\uparrow \\Rightarrow 2\\ \\text{unpaired}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Paramagnetic: a magnet pulls it in'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
// O2 levels: [label, y, bonding?, pair?]
const OL = [['σ2s', 486, 1, 0], ['σ*2s', 420, 0, 0], ['σ2p', 336, 1, 0], ['π2p', 270, 1, 1], ['π*2p', 180, 0, 1], ['σ*2p', 112, 0, 0]];
// fill slots in order: [level index, x offset, up]
const SL = [[0, -14, 1], [0, 14, 0], [1, -14, 1], [1, 14, 0], [2, -14, 1], [2, 14, 0], [3, -46, 1], [3, 46, 1], [3, -46, 0], [3, 46, 0], [4, -46, 1], [4, 46, 1]];
const tWf = wt('W2', 'Fill'), tWb = T0('W3'), tWo = T0('W4'), tWp = wt('W5', 'pi'), tWm = T0('W6');
function drawW(t) {
  const MXo = 380; let s = eAxis(44, 540, 90);
  const lb = io(t, tWb, 0.4);
  OL.forEach(([l, y, b, p], i) => { const col = mix(C.ink2, b ? NC : RC, lb);
    s += p ? lev(MXo - 46, y, 72, col) + lev(MXo + 46, y, 72, col) : lev(MXo, y, 84, col);
    s += T(MXo + (p ? 96 : 60), y + 7, l, { a: 'start', fs: 20, c: col, ls: 0 }); });
  // atomic columns
  [[120, 'O'], [660, 'O']].forEach(([x, n]) => { s += T(x, 110, n + ' ATOM', { fs: 16 }) + lev(x, 460, 70, HC) + T(x, 496, '2s', { fs: 18, c: C.ink, ls: 0 }) + [-1, 0, 1].map(k => lev(x + k * 46, 240, 38, HC)).join('') + T(x, 280, '2p', { fs: 18, c: C.ink, ls: 0 }); });
  SL.forEach(([li, dx, up], k) => { const a = io(t, tWf + 0.2 + k * 0.3, 0.2); s += ea(MXo + dx, OL[li][1], up, a); });
  const hi = io(t, tWp - 0.1, 0.4);
  if (hi > 0.01) s += G(`<rect x="${MXo - 90}" y="150" width="180" height="60" rx="12" fill="none" stroke="${EC}" stroke-width="3" stroke-dasharray="7 6"/>` + T(MXo, 140, 'SAME SPIN · ONE EACH', { fs: 15, c: EC }), hi);
  s += G(T(392, 552, 'INNER: σ1s² σ*1s² (+2 Nb, +2 Na)', { fs: 15 }), io(t, tWb + 0.4, 0.4));
  s += G(T(660, 372, 'Nb 10', { fs: 22, c: NC, ls: 0 }) + T(660, 402, 'Na 6', { fs: 22, c: RC, ls: 0 }), io(t, tWb + 0.8, 0.4) * (1 - io(t, tWm, 0.3)));
  const mg = io(t, tWm, 0.4);
  if (mg > 0.01) s += G(`<g transform="translate(626 330)">${M.icon('magnet', 64, RC, 2.2)}</g>` + T(660, 420, 'PULLED IN', { fs: 16, c: RC }), mg);
  put($('#wS'), s);
  const WT = [[0, 'O₂ · 16 ELECTRONS'], [tWf, 'FILL: LOWEST FIRST'], [tWb, 'Nb 10 · Na 6'], [tWo, 'BOND ORDER 2'], [tWp, 'HUND: ONE EACH'], [tWm, 'PARAMAGNETIC']];
  M.setT(wtg, WT[cur(WT, t)][1]);
}

/* ---------- C: four molecules ---------- */
const SR = [['BOND ORDER 1 · ALL PAIRED', 'Diamagnetic', 'H_2', 'C2', NC], ['BOND ORDER 0', 'Does not exist', 'He_2', 'C3', RC], ['BOND ORDER 3 · ALL PAIRED', 'Diamagnetic', 'N_2', 'C4', NC], ['BOND ORDER 2 · 2 UNPAIRED', 'Paramagnetic', 'O_2', 'C5', EC]];
$('#srs').innerHTML = SR.map(([p, n, f, , c], i) => `<div class="sr" id="sr${i}" style="top:${84 + i * 112}px"><div class="sp">${p}</div><div class="sn2" style="color:${c}">${n}</div><div class="sx2">${K(`\\mathrm{${f}}`)}</div></div>`).join('');
const tSr = SR.map(s => T0(s[3]));
const tC6 = T0('C6');
function drawC(t) {
  const k = cur(tSr.map(x => [x - 0.1]), t), sw = io(t, tC6 - 0.1, 0.5);
  let s = '';
  // magnet test
  { let g = `<g transform="translate(560 200) rotate(90) scale(5.2)">${M.icon('magnet', 24, RC, 2.2).replace(/<\/?svg[^>]*>/g, '')}</g>`;
    g += `<rect x="150" y="80" width="220" height="40" rx="10" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/>`;
    const bend = k === 3 ? 1 : 0, nn = k === 1 ? 0 : 14;
    for (let i = 0; i < nn; i++) { const ph = ((t * 0.55 + i / nn) % 1), yy = 130 + ph * 400, b = bend * M.io(M.clamp((yy - 150) / 200)), x = 260 + b * 200, yv = bend ? Math.min(yy, 130 + 200 + (yy - 330) * 0.15) : yy;
      g += `<circle cx="${f1(x)}" cy="${f1(yv)}" r="9" fill="${k === 3 ? tint(NC, 0.9) : tint(PB(k), 0.85)}"/>`; }
    if (k === 1) g += T(260, 320, 'NO He₂ TO POUR', { fs: 20, c: RC });
    g += T(260, 560, ['H₂ · NOT PULLED IN', 'He₂ · DOES NOT EXIST', 'LIQUID N₂ · RUNS PAST', 'LIQUID O₂ · STICKS'][k], { fs: 18, c: C.ink });
    s += G(g, 1 - sw); }
  // energy order detail
  if (sw > 0.01) { let g = '';
    [[210, 'UP TO N₂', 1], [574, 'O₂ AND F₂', 0]].forEach(([x, h, piLow]) => { const yp = piLow ? 360 : 260, ys = piLow ? 260 : 360;
      g += T(x, 130, h, { fs: 20, c: C.ink }) + lev(x - 40, yp, 60, NC) + lev(x + 40, yp, 60, NC) + T(x, yp + 40, 'π2p', { fs: 20, c: NC, ls: 0 }) + lev(x, ys, 80, NC) + T(x, ys + 40, 'σ2p', { fs: 20, c: NC, ls: 0 }); });
    g += eAxis(56, 480, 140) + T(392, 540, 'SAME BOND ORDERS · ORDER OF FILLING CHANGES', { fs: 16 }); s += G(g, sw); }
  put($('#cS'), s);
  M.setT($('#cpL'), sw > 0.5 ? 'MOLECULE BENCH · FILLING ORDER' : 'MOLECULE BENCH · THE MAGNET TEST');
  return k;
}
const PB = k => '#2F6FEB';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '16 electrons is even, so all are paired: <b>diamagnetic</b>', right: 'The last 2 sit alone in two π*: <b>paramagnetic</b>' });
const pst = (cx, pair) => lev(cx - 50, 120, 76, RC) + lev(cx + 50, 120, 76, RC) + T(cx, 70, 'π*2p', { fs: 18, c: RC, ls: 0 }) + (pair ? ea(cx - 62, 120, 1) + ea(cx - 38, 120, 0) : ea(cx - 50, 120, 1) + ea(cx + 50, 120, 1));
$('#tS').innerHTML = `<g id="tM1">${pst(150, 1) + T(150, 200, 'PAIRED · WRONG', { fs: 18, c: RC, ls: 0.6 })}</g><g id="tM2">${pst(460, 0) + T(460, 200, '2 UNPAIRED', { fs: 18, c: C.ok, ls: 0.6 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M70 60 L230 170 M230 60 L70 170'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Bond order and magnetic behaviour of molecules and ions' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these has the <b>highest bond order</b>?', qW: 820,
  opts: [K('\\mathrm{O_2}'), K('\\mathrm{O_2^{+}}'), K('\\mathrm{O_2^{-}}'), K('\\mathrm{O_2^{2-}}')], right: 1, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{O_2}: \\tfrac{1}{2}(${B_('10')} - ${A_('6')}) = 2`)], [K(`\\mathrm{O_2^{+}}: \\tfrac{1}{2}(${B_('10')} - ${A_('5')}) = 2.5`)], [K(`\\mathrm{O_2^{-}}: 1.5 \\quad \\mathrm{O_2^{2-}}: 1`)], ['More antibonding e⁻, lower order']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'C')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Molecular orbital theory', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>MOT</b>: atomic orbitals combine (LCAO) into orbitals of the whole molecule',
    '<b>Add</b>: bonding σ, lower energy · <b>subtract</b>: antibonding σ*, higher, with a node',
    '<b>Bond order</b> = ½ (Nb - Na) · zero means no molecule (He₂)',
    '<b>H₂</b> 1 · <b>N₂</b> 3 · <b>O₂</b> 2 · higher order: shorter, stronger bond',
    '<b>Unpaired</b> electrons: paramagnetic (O₂) · <b>all paired</b>: diamagnetic (N₂)',
    '<b>Up to N₂</b>: π2p below σ2p · <b>O₂, F₂</b>: σ2p below π2p'] });
const YQ = ['What is the bond order of nitrogen, N₂?', 'Why does He₂ not exist?', 'Why is oxygen paramagnetic?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 50', topic: 'Why does ice float on water? Hydrogen Bonding', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'puzzles') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'cannot') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - tKit[i]) / 0.3); setBg(el, mix(C.soft, C.ac2, i > 1 ? on : 0)); });
    M.vis($('#hTz'), t, wt('H5', 'exist') - 0.4, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P4', 'molecular') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B4');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#en'), t, tS1 + 0.3, z, { dx: 60, dy: 0, ...o });
    const he = io(t, tHe - 0.1, 0.5);
    put($('#bS'), G(benchS(t), 1 - he) + G(benchB(t), he));
    put($('#eS'), enS(t));
    M.setT($('#bnL'), he > 0.5 ? 'MOLECULE BENCH · He + He' : 'MOLECULE BENCH · H + H');
    M.setT($('#enL'), he > 0.5 ? 'ENERGY LEVELS · He₂' : 'ENERGY LEVELS · H₂');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    M.setT(etg, ET[cur(ET, t)][1]); M.vis(etg, t, tSg - 0.2, 1e9, POP);
    M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB4, tOpts: wt('B4', 'Can') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'gain') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#dF'), t, tLk[2] - 0.1, 1e9, { dy: 12 }); PUC.write($('#dF'), t, wt('D4', 'half'), 0.8);
    const k = drawD(t);
    M.setT(dtg, ['H₂ · Nb', 'He₂ · Na', 'BOND ORDER', 'ZERO OR MORE', 'ORDER · LENGTH'][k]); M.vis(dtg, t, tLk[0] - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Bonding') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Antibonding') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'apart') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Why') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'paramagnetic') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'oxygen') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    SR.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tSr[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tSr[i] + 0.1) / 0.3) * (i < 3 ? 1 - M.io((t - tSr[i + 1] + 0.1) / 0.3) : 1 - M.io((t - tC6) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
    drawC(t);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Oxygen') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Oxygen') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'paired') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'alone') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Bond') });
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
