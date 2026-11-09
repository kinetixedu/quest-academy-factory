// PUC Chemistry Ep 91: conformations of ethane (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: front carbon teal (element in play), back carbon ink ring, H ink, bond-cloud push (torsional strain) orange, energy gold, dihedral angle violet
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', VC = '#7A4FE0', BK = '#3A4560';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const col = (c, s) => `\\textcolor{${c}}{${s}}`, Gd = s => col(GC, s), Vi = s => col(VC, s);

Object.assign(M.IC, {
  door: ['M6 3h12v18H6z', 'M14.5 12h.01', 'M3 21h18'],
  fan: ['M12 12 7 4', 'M12 12h9', 'M12 12 7 20', 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  wheel: ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 3v18', 'M3 12h18', 'M5.6 5.6l12.8 12.8', 'M18.4 5.6 5.6 18.4'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
});

/* ---------- shared drawing ---------- */
const f1 = v => (+v).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.ff || 'IBM Plex Mono'}" font-weight="${o.fw || 600}" font-size="${o.fs || 20}" fill="${o.c || C.mute}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 1.2}">${s}</text>`;
const G = (s, a) => a < 0.01 ? '' : a >= 0.999 ? s : `<g opacity="${a.toFixed(3)}">${s}</g>`;
const put = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const io = (t, a, d = 0.35) => M.io((t - a) / d);
const tint = (c, a) => { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const lerp = M.lerp;
const atom = (x, y, r, lab, c = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${c}"/>` + (lab ? T(x, y + (fs || r * 0.78) * 0.36, lab, { ff: 'Poppins', fw: 700, fs: fs || r * 0.78, c: '#fff', ls: 0 }) : '');
const ln = (p, q, c = C.ink2, w = 6, a = 1) => `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${a < 1 ? ` opacity="${a.toFixed(3)}"` : ''}/>`;
const ang = (p, a, r) => [p[0] + r * Math.cos(a * Math.PI / 180), p[1] + r * Math.sin(a * Math.PI / 180)];
const md = (a, m) => ((a % m) + m) % m;
const form = phi => { const d = md(phi, 120); return d < 8 || d > 112 ? 'ECLIPSED' : Math.abs(d - 60) < 8 ? 'STAGGERED' : 'SKEW'; };
const shownPhi = phi => phi + 11 * (1 + Math.cos(3 * phi * Math.PI / 180)) / 2; // eclipsed drawn slightly offset so back bonds stay visible

/* Newman projection: front bonds at 90 + 120 i, back bonds rotated by phi */
function newman(cx, cy, phi, o = {}) {
  const R = o.R ?? 92, L = o.L ?? 176, hr = o.hr ?? 22, ba = o.ba ?? 1, fa = o.fa ?? 1, push = o.push ?? 0, sp = shownPhi(phi);
  let s = '';
  if (ba > 0.01) { let b = '';
    for (let i = 0; i < 3; i++) { const a = 90 + 120 * i + sp, p = ang([cx, cy], a, R), q = ang([cx, cy], a, L * 0.94); b += ln(p, q, BK, 6) + atom(q[0], q[1], hr * 0.92, 'H', '#5A6480', hr * 0.7); }
    s += G(b, ba); }
  s += G(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${BK}" stroke-width="5"/>`, o.ca ?? ba);
  if (push > 0.01) for (let i = 0; i < 3; i++) { const a = 90 + 120 * i, p = ang([cx, cy], a + sp / 2, L * 0.72); s += G(`<g transform="translate(${f1(p[0])} ${f1(p[1])}) rotate(${f1(a + sp / 2 + 90)})"><path d="M-22 0h44M-22 0l9 -7M-22 0l9 7M22 0l-9 -7M22 0l-9 7" stroke="${EC}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`, push); }
  if (fa > 0.01) { let f = '';
    for (let i = 0; i < 3; i++) { const a = 90 + 120 * i, q = ang([cx, cy], a, L); f += ln([cx, cy], q, C.ink, 6) + atom(q[0], q[1], hr, 'H', HC, hr * 0.7); }
    f += `<circle cx="${cx}" cy="${cy}" r="11" fill="${NC}"/>`; s += G(f, fa); }
  return s;
}
/* sawhorse: front carbon lower-left, back carbon upper-right (oblique 3D view; H on a cone around the bond axis) */
function sawhorse(phi, o = {}) {
  const F = o.F ?? [290, 380], B = o.B ?? [500, 190], L = o.L ?? 100, bu = o.bu ?? 1, ha = o.ha ?? 1, sp = shownPhi(phi);
  const bl = Math.hypot(B[0] - F[0], B[1] - F[1]), u = [(B[0] - F[0]) / bl, (B[1] - F[1]) / bl], z = [0.8, 0.45];
  const hp = (c, out, a) => { const r = a * Math.PI / 180, cs = Math.cos(r), sn = Math.sin(r); return [c[0] + L * (out * 0.35 * u[0] + 0.94 * sn * z[0]), c[1] + L * (out * 0.35 * u[1] - 0.94 * cs + 0.94 * sn * z[1]), sn]; };
  const bk = [0, 1, 2].map(i => hp(B, 1, 120 * i + sp)), fr = [0, 1, 2].map(i => hp(F, -1, 120 * i));
  let s = G(bk.map(q => ln(B, q, BK, 6)).join('') + bk.map(q => atom(q[0], q[1], 19 + 2 * q[2], 'H', '#5A6480', 15)).join(''), ha);
  s += ln(F, [lerp(F[0], B[0], bu), lerp(F[1], B[1], bu)], C.ink2, 7);
  s += G(atom(B[0], B[1], 30, 'C', BK, 21), bu > 0.95 ? 1 : 0);
  s += G(fr.map(q => ln(F, q, C.ink, 6)).join('') + fr.map(q => atom(q[0], q[1], 21 + 2 * q[2], 'H', HC, 16)).join(''), ha);
  s += atom(F[0], F[1], 32, 'C', NC, 22);
  return s;
}
/* side view ball-and-stick, back CH3 spinning about the C-C axis */
function side(cx, cy, phi) {
  const c1 = [cx - 110, cy], c2 = [cx + 110, cy], it = [];
  const hp = (c, dx, a) => { const r = Math.PI * a / 180; return [c[0] + dx + 46 * Math.sin(r), c[1] - 96 * Math.cos(r), Math.sin(r)]; };
  for (let i = 0; i < 3; i++) { it.push([hp(c1, -62, 120 * i), c1, HC]); it.push([hp(c2, 62, 120 * i + phi), c2, '#5A6480']); }
  it.sort((a, b) => a[0][2] - b[0][2]);
  let back = '', front = '';
  it.forEach(([p, c, cc]) => { const g = ln(c, p, C.ink2, 6) + atom(p[0], p[1], 20 + 3 * p[2], 'H', cc, 15); if (p[2] < 0) back += g; else front += g; });
  return back + ln(c1, c2, C.ink2, 8) + atom(c1[0], c1[1], 32, 'C', NC, 22) + atom(c2[0], c2[1], 32, 'C', BK, 22) + front;
}
const Eof = phi => 6.25 * (1 + Math.cos(3 * phi * Math.PI / 180));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tag = (host, css) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:18px;' + (css || 'background:var(--ink);color:#fff'); host.appendChild(d); return d; };
// piecewise angle: keys [[t, phi], ...] eased between keys
const keyA = (keys, t) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const [a, pa] = keys[i - 1], [b, pb] = keys[i], u = (t - a) / (b - a); return lerp(pa, pb, keys[i][2] === 'lin' ? u : M.io(u)); } return keys[keys.length - 1][1]; };

/* ---------- title card + H ---------- */
const JOBS = [['door', 'Door', 'TURNS ON A HINGE', 'door'], ['fan', 'Fan blade', 'SPINS ON AN AXLE', 'fan'], ['wheel', 'Bicycle wheel', 'TURNS ON ITS HUB', 'wheel']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">NO BREAK</div></div>`).join('');
const KIT = [['wheel', 'Spoke hides behind fork', 'hides', 'H4'], ['wheel', 'Spoke sits in a gap', 'gap', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['Two carbons, one σ bond', 'σ BOND', 'P2', 'two'], ['Each carbon holds three H', '3 + 3 H', 'P2', 'three'], ['σ bond = axle: spin, no break', 'SPIN', 'P3', 'axle'], ['Each arrangement: a conformation', 'NEW SHAPE', 'P4', 'conformation'], ['Two special: eclipsed, staggered', '2 SPECIAL', 'P5', 'special']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tSpin = wt('P3', 'spin'), tEcl = wt('P5', 'eclipsed'), tStg = wt('P6', 'staggered');
const PK = [[0, 60], [tSpin, 60], [tSpin + 3.2, 420, 'lin'], [tEcl - 0.6, 420], [tEcl, 360], [tStg - 0.4, 360], [tStg + 0.4, 420]];
function drawP(t) {
  const phi = keyA(PK, t), a = io(t, T0('P2'), 0.4);
  let s = G(side(392, 250, phi), a);
  const ax = io(t, wt('P3', 'axle') - 0.2, 0.4);
  s += G(`<line x1="160" y1="250" x2="624" y2="250" stroke="${GC}" stroke-width="2.5" stroke-dasharray="8 8"/>` + T(392, 400, 'C-C AXIS · σ BOND STAYS WHOLE', { fs: 17, c: GC }), ax * 0.9);
  const sp = io(t, tSpin, 0.3) * (1 - io(t, tEcl - 0.6, 0.3));
  s += G(`<path d="M640 190 a24 60 0 1 1 0 120" stroke="${C.ink2}" stroke-width="3" fill="none"/><polygon points="640,310 652,298 652,318" fill="${C.ink2}"/>` + T(690, 254, 'SPIN', { fs: 16, a: 'start' }), sp);
  const ff = form(phi), fa = io(t, tEcl - 0.2, 0.3);
  s += G(`<rect x="232" y="452" width="320" height="64" rx="14" fill="${ff === 'STAGGERED' ? C.okBg : tint(EC, 0.12)}"/>` + T(392, 494, ff, { fs: 26, c: ff === 'STAGGERED' ? C.ok : EC, ls: 1 }), fa);
  put($('#pS'), s);
  M.setT(ptag, t < tSpin ? 'ETHANE · C₂H₆' : t < tEcl - 0.6 ? 'SPINNING · NO BOND BREAKS' : 'BACK H: ' + (ff === 'ECLIPSED' ? 'BEHIND FRONT H' : 'IN THE GAPS'));
}

/* ---------- S: sawhorse + Newman ---------- */
const tSb = wt('S2', 'long'), tSh = T0('S3'), tN4 = T0('S4'), tN5 = T0('S5'), tN6 = T0('S6'), tR = wt('S7', 'spin');
const SK = [[0, 60], [tR, 60], [T1('S7'), 420, 'lin']];
const stg = tag($('#bn')), ntg = tag($('#nw'));
function drawS(t) {
  const phi = keyA(SK, t), bu = io(t, tSb, 0.8), ha = io(t, tSh, 0.5);
  let s = sawhorse(phi, { bu, ha });
  s += G(T(170, 470, 'FRONT C', { fs: 16, c: NC, a: 'start' }) + T(440, 160, 'BACK C', { fs: 16, c: BK, a: 'end' }), io(t, wt('S2', 'front'), 0.4));
  s += G(`<path d="M80 520 L180 470" stroke="${C.mute}" stroke-width="2.5" stroke-dasharray="6 6"/><circle cx="70" cy="525" r="12" fill="none" stroke="${C.mute}" stroke-width="2.5"/>` + T(100, 556, 'YOU LOOK FROM HERE', { fs: 13, a: 'start' }), io(t, T0('S2') + 0.3, 0.4) * (1 - io(t, tN4, 0.4)));
  put($('#bS'), s);
  const fa = io(t, tN5, 0.5), ca = io(t, tN6, 0.4), ba = io(t, tN6 + 0.8, 0.5);
  let n = newman(392, 290, phi, { fa, ba, ca });
  n += G(`<circle cx="392" cy="290" r="11" fill="${NC}"/>` + T(392, 512, 'LOOK DOWN THE C-C BOND', { fs: 16 }), io(t, tN4 + 0.4, 0.4) * (1 - fa));
  const rr = io(t, tR - 0.3, 0.3);
  if (rr > 0.01) { const ff = form(phi); n += G(`<rect x="232" y="486" width="320" height="58" rx="14" fill="${ff === 'STAGGERED' ? C.okBg : ff === 'ECLIPSED' ? tint(EC, 0.12) : C.soft}"/>` + T(392, 524, `${ff} · ${Math.round(md(phi, 360))}°`, { fs: 22, c: ff === 'STAGGERED' ? C.ok : ff === 'ECLIPSED' ? EC : C.ink, ls: 0.6 }), rr); }
  put($('#nS'), n);
  M.setT(stg, t < tSh ? 'BOND FROM AN ANGLE' : t < tR ? 'STAGGERED' : form(phi));
  M.setT(ntg, t < tN5 ? 'HEAD ON' : t < tN6 ? 'FRONT C = POINT' : t < tR ? 'BACK C = CIRCLE' : 'SPINNING');
}
function drawB(t) {
  const pu = io(t, wt('B2', 'push') - 0.2, 0.4), cl = io(t, wt('B1', 'clouds'), 0.4);
  const lab = (x, s, c) => T(x, 520, s, { fs: 22, c, ls: 0.6 });
  put($('#bS'), newman(392, 280, 0, { push: Math.max(pu, cl * 0.35) }) + G(lab(392, 'CLOUDS FACE EACH OTHER', EC), io(t, T0('B2'), 0.4)));
  put($('#nS'), newman(392, 280, 60) + G(lab(392, 'CLOUDS FAR APART', C.ok), io(t, T0('B3'), 0.4)));
  M.setT($('#bnL'), 'ECLIPSED · NEWMAN'); M.setT($('#nwL'), 'STAGGERED · NEWMAN');
  M.setT(stg, 'MORE PUSH'); M.setT(ntg, 'LESS PUSH');
}
const th1 = PUC.think($('#th1'), { q: 'Which form has the <span style="color:#B7791F">lower energy</span>?', opts: ['Eclipsed', 'Staggered'], right: 1, why: '<b>Staggered</b>: bond clouds farthest apart, least push, <b style="color:#B7791F">lowest energy</b>, most stable.' });

/* ---------- D: energy curve ---------- */
const LK = [['LINK 1', 'Cloud push = torsional strain', 'STRAIN', 'D2'], ['LINK 2', 'Eclipsed: most strain, top energy', 'HIGH', 'D3'], ['LINK 3', 'Energy rises, falls every 60°', '60°', 'D4'], ['LINK 4', 'Barrier: about 12.5 kJ/mol', '12.5', 'D5'], ['LINK 5', 'Tiny barrier: forms swap fast', 'NO SPLIT', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const GX = 210, GW = 500, GY = 500, GH = 180, X = p => GX + GW * p / 360, Y = e => GY - GH * e / 12.5;
const DK = [[0, 60], [tLk[1], 60], [tLk[1] + 1.2, 0], [wt('D3', 'staggered') - 0.3, 0], [wt('D3', 'staggered') + 0.6, 60], [tLk[2] + 0.4, 0], [T1('D4'), 360, 'lin']];
function drawD(t) {
  const phi = keyA(DK, t), cv = io(t, tLk[2], 0.3);
  let s = newman(110, 172, phi, { R: 38, L: 74, hr: 12, push: io(t, tLk[0] + 0.5, 0.4) * (form(phi) === 'STAGGERED' ? 0.25 : 1) });
  s += G(T(250, 120, 'TORSIONAL STRAIN', { fs: 17, c: EC, a: 'start' }) + T(250, 146, 'PUSH BETWEEN BOND CLOUDS', { fs: 14, a: 'start' }), io(t, wt('D2', 'torsional'), 0.4));
  const ea = io(t, tLk[1], 0.4);
  s += G(`<line x1="${GX}" y1="${GY}" x2="${GX + GW + 20}" y2="${GY}" stroke="${C.ink2}" stroke-width="2.5"/><line x1="${GX}" y1="${GY}" x2="${GX}" y2="${GY - GH - 30}" stroke="${C.ink2}" stroke-width="2.5"/>` +
    `<text x="${GX - 18}" y="${GY - GH / 2}" transform="rotate(-90 ${GX - 18} ${GY - GH / 2})" font-family="IBM Plex Mono" font-weight="600" font-size="14" fill="${C.mute}" text-anchor="middle" letter-spacing="1.4">ENERGY</text>` +
    [0, 60, 120, 180, 240, 300, 360].map(p => T(X(p), GY + 26, p + '°', { fs: 13, c: C.mute, ls: 0 })).join('') + T(GX + GW / 2, GY + 52, 'DIHEDRAL ANGLE', { fs: 14, c: VC }), ea);
  // E and S levels
  s += G(`<line x1="${GX}" y1="${Y(12.5)}" x2="${GX + GW}" y2="${Y(12.5)}" stroke="${EC}" stroke-width="2" stroke-dasharray="5 7"/><line x1="${GX}" y1="${Y(0)}" x2="${GX + GW}" y2="${Y(0)}" stroke="${C.ok}" stroke-width="2" stroke-dasharray="5 7"/>` + T(GX + GW + 8, Y(12.5) + 5, 'E', { fs: 18, c: EC, a: 'start' }) + T(GX + GW + 8, Y(0) - 6, 'S', { fs: 18, c: C.ok, a: 'start' }), ea);
  if (cv > 0.01) { const pmax = t >= T1('D4') ? 360 : Math.max(0, md(phi, 360.0001)); let d = ''; for (let p = 0; p <= pmax; p += 4) d += (p ? 'L' : 'M') + f1(X(p)) + ' ' + f1(Y(Eof(p)));
    s += `<path d="${d}" fill="none" stroke="${GC}" stroke-width="4.5" stroke-linecap="round"/>`; }
  const dp = t < tLk[2] ? phi : md(phi, 360.0001), jit = t > wt('D6', 'bump') ? 6 * Math.sin((t - wt('D6', 'bump')) * 9) : 0;
  s += G(`<circle cx="${f1(X(t > tLk[2] ? dp : md(phi, 360)))}" cy="${f1(Y(Eof(phi)) + jit)}" r="10" fill="${GC}" stroke="#fff" stroke-width="3"/>`, ea);
  const br = io(t, wt('D5', 'twelve') - 0.2, 0.4);
  s += G(`<path d="M${X(180) - 10} ${Y(12.5)} h20 M${X(180)} ${Y(12.5)} V${Y(0)} M${X(180) - 10} ${Y(0)} h20 M${X(180)} ${Y(12.5)} V284" stroke="${GC}" stroke-width="3" fill="none"/>` + `<rect x="${X(180) - 100}" y="240" width="200" height="44" rx="10" fill="#fff" stroke="${GC}" stroke-width="2.5"/>` + T(X(180), 269, '≈ 12.5 kJ/mol', { fs: 20, c: GC, ls: 0 }), br);
  s += G(T(GX + GW / 2, 212, 'ROOM TEMPERATURE: CROSSES EASILY', { fs: 16, c: C.ink }), io(t, wt('D6', 'room'), 0.4));
  put($('#dS'), s);
}
const dtg = tag($('#dr'));
const DLB = ['TORSIONAL STRAIN', 'ECLIPSED = HIGH', 'ENERGY CURVE', 'ENERGY BARRIER', 'CANNOT SEPARATE'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`E_{\\text{eclipsed}} - E_{\\text{staggered}} \\approx ${Gd('12.5\\ \\text{kJ mol}^{-1}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Vi('\\theta')} = \\text{angle, front C-H to back C-H}`)],
  [K(`\\text{eclipsed: } ${Vi('\\theta')} = 0^\\circ,\\ 120^\\circ,\\ 240^\\circ`)],
  [K(`\\text{staggered: } ${Vi('\\theta')} = 60^\\circ,\\ 180^\\circ,\\ 300^\\circ`)],
  [K(`2\\ \\text{mol} \\times 12.5 = ${Gd('25\\ \\text{kJ}')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Three eclipsed, three staggered'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const tW3 = T0('W3'), tW4 = T0('W4'), tW6 = T0('W6');
const WK = [[0, 40], [T0('W2'), 40], [tW3 + 0.3, 0], [wt('W3', 'one') + 0.1, 120], [wt('W3', 'two') + 0.1, 240], [tW4 + 0.3, 300], [wt('W4', 'sixty') + 0.2, 420], [wt('W4', 'one') + 0.2, 540], [wt('W4', 'three') + 0.2, 660], [tW6 + 0.2, 660], [tW6 + 1.2, 750]];
function drawW(t) {
  const phi = keyA(WK, t), c = [392, 300];
  let s = '';
  const ds = io(t, tW3 - 0.2, 0.4);
  [0, 60, 120, 180, 240, 300].forEach(p => { const e = p % 120 === 0, on = e ? io(t, p === 0 ? tW3 + 0.3 : wt('W3', p === 120 ? 'one' : 'two') + 0.1, 0.3) : io(t, p === 60 ? wt('W4', 'sixty') + 0.2 : p === 180 ? wt('W4', 'one') + 0.2 : wt('W4', 'three') + 0.2, 0.3);
    const q = ang(c, 90 + p, 196);
    s += G(`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="26" fill="${on > 0.5 ? (e ? tint(EC, 0.14) : C.okBg) : '#fff'}" stroke="${e ? EC : C.ok}" stroke-width="2.5"/>` + T(q[0], q[1] + 7, e ? 'E' : 'S', { fs: 20, c: e ? EC : C.ok, ls: 0 }) + T(q[0] + (q[0] > 392 ? 36 : q[0] < 392 ? -36 : 0), q[1] + (q[0] === 392 || Math.abs(q[0] - 392) < 2 ? (q[1] > 290 ? 0 : 0) : 6), '', {}), ds); });
  s += newman(c[0], c[1], phi, { R: 64, L: 136, hr: 19 });
  // dihedral arc between front bond at 90 and back bond at 90 + phi
  const sp = shownPhi(phi), pa = md(sp, 360), aa = io(t, T0('W2') + 0.3, 0.4);
  if (pa > 2 && aa > 0.01) { const r = 104, p1 = ang(c, 90, r), p2 = ang(c, 90 + pa, r); s += G(`<path d="M${f1(p1[0])} ${f1(p1[1])} A${r} ${r} 0 ${pa > 180 ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])}" fill="none" stroke="${VC}" stroke-width="4"/>`, aa); }
  s += G(`<rect x="560" y="500" width="196" height="54" rx="12" fill="#fff" stroke="${VC}" stroke-width="2.5"/>` + T(658, 536, `θ = ${Math.round(md(phi, 360))}°`, { fs: 24, c: VC, ls: 0 }), aa);
  const cs = io(t, T0('W5'), 0.4);
  s += G(`<rect x="28" y="500" width="250" height="54" rx="12" fill="${tint(GC, 0.14)}"/>` + T(153, 535, '+12.5 kJ/mol', { fs: 22, c: GC, ls: 0 }), cs);
  put($('#wS'), s);
  M.setT(wtg, t < tW3 ? 'DIHEDRAL ANGLE θ' : t < tW4 ? 'ECLIPSED · E' : t < T0('W5') ? 'STAGGERED · S' : t < tW6 ? 'EACH CLIMB' : 'SKEW · IN BETWEEN');
}

/* ---------- C ---------- */
const tC4 = T0('C4');
const CK = [[0, 60], [tC4, 60], [T1('C4') + 0.4, 180]];
function drawC(t) {
  const phi = keyA(CK, t), a2 = io(t, T0('C2'), 0.4), a3 = io(t, T0('C3'), 0.4);
  put($('#cS1'), sawhorse(phi, { F: [300, 360], B: [490, 190] }) + G(`<line x1="300" y1="430" x2="490" y2="260" stroke="${GC}" stroke-width="0"/>` + T(392, 530, 'BOTH CARBONS · BOND LENGTH SEEN', { fs: 18, c: C.ink }), a2));
  const sp = shownPhi(phi), r = 120, p1 = ang([392, 280], 90, r), p2 = ang([392, 280], 90 + md(sp, 360), r);
  put($('#cS2'), newman(392, 280, phi) + G(`<path d="M${f1(p1[0])} ${f1(p1[1])} A${r} ${r} 0 ${md(sp, 360) > 180 ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])}" fill="none" stroke="${VC}" stroke-width="4"/>` + T(392, 530, `ANGLE AT A GLANCE · θ = ${Math.round(md(phi, 360))}°`, { fs: 18, c: C.ink }), a3));
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Rotation about C-C in ethane is <b>completely free</b>', right: '<b>Almost</b> free: a small barrier of about 12.5 kJ/mol' });
{ let d = ''; for (let p = 0; p <= 360; p += 4) d += (p ? 'L' : 'M') + f1(300 + p) + ' ' + f1(200 - 7.2 * Eof(p)); $('#tS').innerHTML = `<g id="tM1"><line x1="70" y1="190" x2="240" y2="190" stroke="${C.mute}" stroke-width="4"/>${T(155, 244, 'FLAT · FREE?', { fs: 17, c: C.red })}</g><path id="tX" d="M120 155 L190 225 M190 155 L120 225" stroke="${C.red}" stroke-width="6" stroke-linecap="round" fill="none"/><g id="tM2"><path d="${d}" fill="none" stroke="${GC}" stroke-width="4"/>${T(480, 244, 'SMALL HILLS · 12.5 kJ/mol', { fs: 17, c: C.ok })}</g>`; }
const xM = $('#tX');
const where = PUC.where($('#wa'), { on: [], type: 'Draw sawhorse and Newman projections; stability and torsional strain' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE PATTERN · ORIGINAL QUESTION', q: 'Ethane starts <b>eclipsed</b> in a Newman projection. The back carbon turns by <b>180°</b>. What do we get?', qW: 820,
  opts: ['Eclipsed, top energy', 'Staggered, lowest', 'Skew, in between', 'Eclipsed, lowest'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 28 });
const so = PUC.solution($('#so'), [[K(`\\text{E at } 0^\\circ,\\ 120^\\circ,\\ 240^\\circ`)], [K(`180^\\circ\\text{: between two E} \\Rightarrow \\text{S}`)], [K(`E_\\text{S} = E_\\text{E} - ${Gd('12.5\\ \\text{kJ mol}^{-1}')}`)], [K(`\\text{Answer: B}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'skew')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Conformations of Ethane', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Conformations</b>: shapes made by spinning about the C-C σ bond',
    '<b>Eclipsed</b>: back H behind front H · <b>Staggered</b>: back H in the gaps',
    '<b>Sawhorse</b>: side view, slanted bond · <b>Newman</b>: head-on, back C a circle',
    '<b>Torsional strain</b>: push between bond clouds, most in eclipsed',
    '<b>Barrier</b> about 12.5 kJ/mol · staggered is the most stable',
    '<b>Cannot be separated</b>: forms swap fast · in between: skew'] });
const YQ = ['In a Newman projection, how is the back carbon drawn?', 'Why is the staggered form more stable than the eclipsed form?', 'Why can we not separate the two forms of ethane in a bottle?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 92', topic: 'Why can a double bond not spin? Alkenes: Structure and Isomers', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, tMorph + 0.6 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'axle') - 0.3, 1e9, POP);
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
    M.vis($('#mdef'), t, wt('P1', 'conformation') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    drawP(t); M.vis(ptag, t, T0('P2') + 0.3, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B4');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#nw'), t, tN4 - 0.1, z, { dx: 60, dy: 0, ...o });
    { const sh = M.spring(t - tN4 + 0.1, M.HEAVY); snap($('#bn'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); $('#bS').style.left = ((1 - M.clamp(sh)) * 408).toFixed(1) + 'px'; }
    if (t < tB1 - 0.1) { drawS(t); M.setT($('#bnL'), 'SAWHORSE PROJECTION'); M.setT($('#nwL'), 'NEWMAN PROJECTION'); } else drawB(t);
    M.vis(stg, t, tS1 + 0.6, 1e9, POP); M.vis(ntg, t, tN4 + 0.3, 1e9, POP);
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'eclipsed') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Its') });

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    drawD(t); M.setT(dtg, DLB[ki]); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Same') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Staggered') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'comfortable') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'In') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W4', 'So') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'eclipsed') + 0.1, out, { dx: 60, dy: 0, ...o });
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
    trap(t, { tin: tX1, tWrong: wt('X2', 'rotation') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'almost') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'completely') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'barrier') - 0.1, 0.3).toFixed(3));
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
