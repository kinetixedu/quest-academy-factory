// PUC Chemistry Ep 48: hybridisation (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: s orbital / s character gold, p orbital blue, d orbital violet, hybrid orbitals teal, electrons orange, central atom teal, outer atoms ink
const NC = C.ac, HC = C.ink, EC = '#C8461B', SC = '#B7791F', PB = '#2F6FEB', DV = '#7A4FE0', GC = C.ink, LPF = '#FBEDE6';
const IMG = '../../assets/illustrations/puc/';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const S_ = s => `\\textcolor{${SC}}{${s}}`, P_ = s => `\\textcolor{${PB}}{${s}}`, D_ = s => `\\textcolor{${DV}}{${s}}`, Y_ = s => `\\textcolor{${NC}}{${s}}`;

Object.assign(M.IC, {
  palette: ['M12 22a10 10 0 1 1 10-10c0 2.8-2.2 3-4 3h-2.5a2 2 0 0 0-1.5 3.3 2 2 0 0 1-1.5 3.7Z', 'M7.5 10.5h.01', 'M12 7.5h.01', 'M16.5 10.5h.01'],
  cup: ['M5 8h14l-1.5 13h-11Z', 'M12 8V3l3-1', 'M5.5 12h13'],
  tetra: ['M12 3 3 19h18Z', 'M12 3v16', 'M3 19l9-6 9 6'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
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
const pDb = (x, y, ang, L, W, dash) => lobe(x, y, ang, L, W, PB, 0.16, dash) + lobe(x, y, ang + 180, L, W, PB, 0.16, dash);
const sBall = (x, y, r) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${tint(SC, 0.22)}" stroke="${SC}" stroke-width="2.5"/>`;
const dot = (x, y, r = 7, c = C.ink2) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}"/>`;
const atomC = (x, y, r, lab, col = HC, fs) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}"/>` + T(x, y + (fs || r * 0.8) * 0.36, lab, { ff: 'Poppins', fw: 700, fs: fs || r * 0.8, c: '#fff', ls: 0 });
const ang2 = (dx, dy) => Math.atan2(dy, dx) * 180 / Math.PI;
// electron box: x,y top-left, col stroke, e = 'ud' | 'u' | ''
const ARW = (x, y, up, c = EC) => up ? `<line x1="${f1(x)}" y1="${f1(y + 46)}" x2="${f1(x)}" y2="${f1(y + 18)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 10)} ${f1(x - 8)},${f1(y + 22)} ${f1(x + 8)},${f1(y + 22)}" fill="${c}"/>`
  : `<line x1="${f1(x)}" y1="${f1(y + 14)}" x2="${f1(x)}" y2="${f1(y + 42)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><polygon points="${f1(x)},${f1(y + 50)} ${f1(x - 8)},${f1(y + 38)} ${f1(x + 8)},${f1(y + 38)}" fill="${c}"/>`;
const box = (x, y, col, e = '', a = 1, z = 60) => G(`<g transform="translate(${f1(x)} ${f1(y)}) scale(${(z / 60).toFixed(3)})"><rect x="0" y="0" width="60" height="60" rx="8" fill="${tint(col, 0.12)}" stroke="${col}" stroke-width="3"/>` +
  (e === 'ud' ? ARW(19, 0, 1) + ARW(41, 0, 0) : e === 'u' ? ARW(30, 0, 1) : e === 'd' ? ARW(30, 0, 0) : '') + '</g>', a);
const ARWs = (x, y, up, z) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(z / 60).toFixed(3)})">${ARW(0, 0, up)}</g>`;
const BZ = 80;
const lerp = M.lerp, lc = (a, b, u) => mix(a, b, u);

/* ---------- molecule renderer (from Ep 46) ---------- */
const nrm = v => { const l = Math.hypot(...v) || 1; return v.map(a => a / l); };
const PR = ([x, y, z], w = 1) => { const ty = -0.3 * w, tx = 0.3 * w; let c = Math.cos(ty), s = Math.sin(ty); const x1 = x * c + z * s, z1 = -x * s + z * c; c = Math.cos(tx); s = Math.sin(tx); return [x1, -(y * c - z1 * s), y * s + z1 * c]; };
const GEO = {
  lin: [[-1, 0, 0], [1, 0, 0]],
  tri: [[-0.866, -0.5, 0], [0.866, -0.5, 0], [0, 1, 0]],
  tet: [[-0.943, -0.333, 0], [0.471, -0.333, 0.816], [0, 1, 0], [0.471, -0.333, -0.816]],
  tbp: [[-1, 0, 0], [0.5, 0, 0.866], [0, 1, 0], [0.5, 0, -0.866], [0, -1, 0]],
  oct: [[-1, 0, 0], [0, 0, 1], [0, 1, 0], [0, 0, -1], [0, -1, 0], [1, 0, 0]],
};
const sqz = (g, kinds, s) => g.map((d, i) => kinds[i] !== 'l' ? nrm(g.reduce((a, e, j) => kinds[j] === 'l' ? a.map((v, q) => v - s * e[q]) : a, d)) : d);
function molSVG(o) {
  const { cx, cy, R } = o, cr = o.cr ?? 40, ar = o.ar ?? 28, fs = o.fs ?? 22, items = [];
  o.doms.forEach(dm => {
    const u = dm.u ?? 1, al = dm.a ?? 1; if (u < 0.01 || al < 0.01) return;
    const p = PR(dm.d, o.w ?? 1), L = Math.hypot(p[0], p[1]) || 1, ux = p[0] / L, uy = p[1] / L, px = -uy, py = ux, z = p[2], RR = R * (dm.rs ?? 1);
    const ex = cx + RR * u * p[0], ey = cy + RR * u * p[1];
    let s = '';
    if (dm.k === 'l') {
      const rx = Math.max(30, R * 0.3 * L) * u, dd = (cr + rx + 6) * Math.min(1, u * 1.3), lc2 = [cx + ux * dd, cy + uy * dd], ry = 27 * u, an = Math.atan2(uy, ux) * 180 / Math.PI;
      s += `<ellipse cx="${f1(lc2[0])}" cy="${f1(lc2[1])}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(${f1(an)} ${f1(lc2[0])} ${f1(lc2[1])})" fill="${LPF}" stroke="${EC}" stroke-width="2.5"/>`;
      [-1, 1].forEach(k => { s += `<circle cx="${f1(lc2[0] + px * 10 * k)}" cy="${f1(lc2[1] + py * 10 * k)}" r="6.5" fill="${EC}"/>`; });
    } else {
      const sx = cx + ux * cr * 0.8, sy = cy + uy * cr * 0.8, fx = ex - ux * ar * 0.7 * u, fy = ey - uy * ar * 0.7 * u, bo = dm.bo ?? 1;
      if (z > 0.5) s += `<polygon points="${f1(sx + px * 2)},${f1(sy + py * 2)} ${f1(sx - px * 2)},${f1(sy - py * 2)} ${f1(fx - px * 12)},${f1(fy - py * 12)} ${f1(fx + px * 12)},${f1(fy + py * 12)}" fill="${C.ink2}"/>`;
      else if (z < -0.5) for (let i = 0; i <= 7; i++) { const f = i / 7, hx = sx + (fx - sx) * f, hy = sy + (fy - sy) * f, w = 2 + 10 * f; s += `<line x1="${f1(hx + px * w)}" y1="${f1(hy + py * w)}" x2="${f1(hx - px * w)}" y2="${f1(hy - py * w)}" stroke="${C.ink2}" stroke-width="3.2" stroke-linecap="round"/>`; }
      else for (let b = 0; b < bo; b++) { const k = (b - (bo - 1) / 2) * 15; s += `<line x1="${f1(sx + px * k)}" y1="${f1(sy + py * k)}" x2="${f1(fx + px * k)}" y2="${f1(fy + py * k)}" stroke="${C.ink2}" stroke-width="6" stroke-linecap="round"/>`; }
      const r = ar * (1 + 0.1 * z) * Math.min(1, u * 1.4);
      s += `<circle cx="${f1(ex)}" cy="${f1(ey)}" r="${f1(r)}" fill="${HC}"/><text x="${f1(ex)}" y="${f1(ey + fs * 0.36)}" font-family="Poppins" font-weight="700" font-size="${fs * (dm.lab && dm.lab.length > 1 ? 0.82 : 1)}" fill="#fff" text-anchor="middle">${dm.lab ?? ''}</text>`;
    }
    items.push([z, al < 1 ? `<g opacity="${al.toFixed(3)}">${s}</g>` : s]);
  });
  items.sort((a, b) => a[0] - b[0]);
  let out = items.filter(i => i[0] < -0.05).map(i => i[1]).join('');
  if (o.cen) out += `<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${NC}"/><text x="${cx}" y="${f1(cy + cr * 0.33)}" font-family="Poppins" font-weight="700" font-size="${f1(cr * 0.8)}" fill="#fff" text-anchor="middle">${o.cen}</text>`;
  out += items.filter(i => i[0] >= -0.05).map(i => i[1]).join('');
  (o.arcs || []).forEach(a => {
    if ((a.a ?? 1) < 0.01) return;
    const pi = PR(o.doms[a.i].d, o.w ?? 1), pj = PR(o.doms[a.j].d, o.w ?? 1), a1 = Math.atan2(pi[1], pi[0]), a2 = Math.atan2(pj[1], pj[0]);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI; if (Math.abs(d) > 3.1) d = Math.PI;
    const ra = a.r ?? cr + 34, x1 = cx + ra * Math.cos(a1), y1 = cy + ra * Math.sin(a1), x2 = cx + ra * Math.cos(a1 + d), y2 = cy + ra * Math.sin(a1 + d), bm = a1 + d / 2, lr = ra + (a.lr ?? 46);
    out += `<g opacity="${(a.a ?? 1).toFixed(3)}"><path d="M${f1(x1)} ${f1(y1)} A${ra} ${ra} 0 0 ${d > 0 ? 1 : 0} ${f1(x2)} ${f1(y2)}" fill="none" stroke="${GC}" stroke-width="3.5" stroke-linecap="round"/>
      <text x="${f1(cx + lr * Math.cos(bm) + (a.dx ?? 0))}" y="${f1(cy + lr * Math.sin(bm) + 8 + (a.dy ?? 0))}" font-family="IBM Plex Mono" font-weight="600" font-size="${a.fs ?? 24}" fill="${GC}" text-anchor="middle" stroke="#fff" stroke-width="6" paint-order="stroke">${a.lab}</text></g>`;
  });
  return out;
}
// hybrid lobes along 3D directions (oblique view)
const lobes3 = (cx, cy, dirs, L, u = 1, w = 1) => dirs.map(d => { const p = PR(d, w); return [p[2], hyb(cx, cy, ang2(p[0], p[1]), L * u * (0.75 + 0.25 * Math.hypot(p[0], p[1])))]; }).sort((a, b) => a[0] - b[0]).map(x => x[1]).join('');

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
const JOBS = [['palette', 'Paint', 'TWO COLOURS, ONE NEW', 'paints', 'MIX'], ['cup', 'Milkshake', 'FOUR SCOOPS, ONE DRINK', 'scoops', 'BLEND'], ['tetra', 'Methane', 'FOUR EQUAL BONDS', 'methane', 'EQUAL']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['cup', '1 chocolate', 'chocolate', 'H3'], ['cup', '3 vanilla', 'vanilla', 'H3'], ['plus', '4 glasses', 'glasses', 'H4'], ['check', 'All the same', 'same', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: the puzzle ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['One 2s and three 2p orbitals', 'UNEQUAL', 'P2', 'outer'], ['Yet four equal C-H bonds', 'EQUAL', 'P3', 'Yet'], ['Pauling: mix the orbitals', 'MIX', 'P4', 'Pauling'], ['Mixing = hybridisation', 'HYBRID', 'P5', 'hybridisation'], ['New orbitals: all the same', 'SAME', 'P6', 'equal']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ptag = tag($('#pw'));
const tPm = wt('P6', 'hybrid');
function drawP(t) {
  const X = [130, 300, 470, 640], y = 210, u = io(t, tPm - 0.2, 0.9);
  let s = '';
  X.forEach((x, i) => { const a = io(t, wt('P2', i ? 'three' : 'one') - 0.1 + (i ? (i - 1) * 0.15 : 0), 0.35);
    const orig = i === 0 ? sBall(x, y, 52) + dot(x, y) : pDb(x, y, [0, 90, 35][i - 1], 62, 28) + dot(x, y);
    s += G(G(orig, 1 - u) + G(hyb(x - 20, y, 0, 100), u) + T(x, y + 110, u > 0.5 ? 'sp³' : i ? '2p' : '2s', { fs: 22, c: u > 0.5 ? NC : i ? PB : SC, ls: 0 }), a); });
  const m = io(t, wt('P3', 'methane') - 0.1, 0.4);
  if (m > 0.01) s += G(molSVG({ cx: 392, cy: 430, R: 92, cr: 28, ar: 20, fs: 17, cen: 'C', doms: GEO.tet.map(d => ({ d, lab: 'H' })) }) + T(640, 438, '4 EQUAL', { fs: 20, c: C.ink }) + T(140, 438, 'CH₄', { fs: 22, c: C.ink, ls: 0 }), m);
  put($('#pS'), s);
  M.setT(ptag, t < wt('P3', 'Yet') ? '1 s + 3 p · NOT ALIKE' : t < tPm ? 'BUT 4 EQUAL BONDS?' : 'MIXED · 4 EQUAL sp³');
}

/* ---------- S + B: bench ---------- */
const tPro = wt('S3', 'jumps'), tBl = wt('S4', 'blend'), tOutc = wt('S5', 'Out'), tPart = wt('S6', 'twenty'), tTet = wt('S7', 'corners'), tHov = wt('S7', 'overlaps');
const tSp2 = wt('B2', 'Three'), tSp = wt('B3', 'Two');
const AT = [[120, 410], [120, 200], [210, 200], [300, 200]], HY = [[390, 310], [480, 310], [570, 310], [660, 310]];
function benchC(t) {
  const u = io(t, tBl, 1.4), pr = io(t, tPro, 0.9);
  let s = `<line x1="56" y1="510" x2="56" y2="110" stroke="${C.ink2}" stroke-width="2.5"/><polygon points="56,96 48,112 64,112" fill="${C.ink2}"/>` + `<text x="40" y="320" transform="rotate(-90 40 320)" font-family="IBM Plex Mono" font-weight="600" font-size="16" fill="${C.mute}" text-anchor="middle" letter-spacing="1.6">ENERGY</text>`;
  const E = ['ud', 'u', 'u', ''], Ep = ['u', 'u', 'u', 'u'];
  AT.forEach((p, i) => { const q = HY[i], x = lerp(p[0], q[0], u), y = lerp(p[1], q[1], u), col = lc(i ? PB : SC, NC, u);
    let e = pr > 0.5 ? Ep[i] : E[i]; if (i === 0 && pr > 0.02 && pr < 1) e = 'u'; if (i === 3 && pr < 1) e = '';
    s += box(x, y, col, e, 1, BZ); });
  if (pr > 0.02 && pr < 0.999) { const x = lerp(AT[0][0] + 55, AT[3][0] + 40, pr), y = lerp(AT[0][1], AT[3][1], pr) - Math.sin(pr * Math.PI) * 70; s += ARWs(x, y, pr > 0.5, BZ); }
  const la = 1 - u;
  s += G(T(160, 524, '2s', { fs: 24, c: SC, ls: 0 }) + T(250, 314, '2p', { fs: 24, c: PB, ls: 0 }), la);
  s += G(T(565, 428, 'FOUR EQUAL sp³', { fs: 24, c: NC, ls: 0 }), io(t, tOutc, 0.4));
  s += G(T(560, 150, 'PROMOTION: 2s → 2p', { fs: 20, c: EC }), pr * (1 - u));
  return s;
}
function benchB(t, n) { // n = 2 (sp) or 3 (sp2)
  let s = `<line x1="56" y1="510" x2="56" y2="110" stroke="${C.ink2}" stroke-width="2.5"/><polygon points="56,96 48,112 64,112" fill="${C.ink2}"/>` + `<text x="40" y="320" transform="rotate(-90 40 320)" font-family="IBM Plex Mono" font-weight="600" font-size="16" fill="${C.mute}" text-anchor="middle" letter-spacing="1.6">ENERGY</text>`;
  const x0 = 130; for (let i = 0; i < n; i++) s += box(x0 + i * 90, 330, NC, 'u', 1, BZ);
  const xp = x0 + n * 90 + 60; for (let i = 0; i < 4 - n; i++) s += box(xp + i * 90, 190, PB, '', 1, BZ);
  s += T(x0 + n * 45 - 5, 450, n === 3 ? 'THREE sp²' : 'TWO sp', { fs: 24, c: NC, ls: 0 }) + T(xp + (4 - n) * 45 - 5, 310, (4 - n) + ' p LEFT OUT', { fs: 20, c: PB, ls: 0.6 });
  s += T(420, 140, n === 3 ? 'BORON · 3 OUTER e⁻' : 'BERYLLIUM · 2 OUTER e⁻', { fs: 20 });
  return s;
}
const SH = { tet: GEO.tet, tri: [0, 120, 240].map(a => [Math.cos(a * Math.PI / 180), 0, Math.sin(a * Math.PI / 180)]), lin: GEO.lin };
function shapeS(t, k) {
  const cx = 260, cy = 156, L = 104;
  if (k === 'tet') { const u = io(t, tOutc, 0.6), a = io(t, tTet, 0.8), hh = io(t, tHov, 0.5);
    const dirs = GEO.tet.map((d, i) => nrm(d.map((v, q) => v * a + [[0.2, 1, 0.1], [0.5, 0.9, 0.2], [0.8, 0.6, -0.1], [0.3, 0.8, -0.4]][i][q] * (1 - a))));
    let s = lobes3(cx, cy, dirs, L, u) + dot(cx, cy, 8, NC);
    if (hh > 0.01) s += G(dirs.map(d => { const p = PR(d); return atomC(cx + p[0] * L * 1.02, cy + p[1] * L * 1.02, 15, 'H', HC, 14); }).join(''), hh);
    s += G(T(560, 150, '109.5°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(560, 192, 'TETRAHEDRAL · sp³', { fs: 18, a: 'start' }), a);
    return s; }
  if (k === 'tri') { const dirs = SH.tri; return pDb(cx, cy, -90, 70, 26, true) + lobes3(cx, cy, dirs, L, 1, 0.9) + dot(cx, cy, 8, NC) + T(560, 150, '120°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(560, 192, 'TRIGONAL PLANAR · sp²', { fs: 18, a: 'start' }); }
  return pDb(cx, cy, -90, 66, 24, true) + pDb(cx, cy, -35, 56, 20, true) + lobes3(cx, cy, SH.lin, L, 1, 0) + dot(cx, cy, 8, NC) + T(560, 150, '180°', { fs: 46, c: C.ink, ls: 0, a: 'start' }) + T(560, 192, 'LINEAR · sp', { fs: 18, a: 'start' });
}
function charS(n, pc, hi = 0) {
  const W = 500, w = W / n; let s = '';
  for (let i = 0; i < n; i++) s += `<rect x="${f1(36 + i * w + 3)}" y="84" width="${f1(w - 6)}" height="62" rx="10" fill="${tint(i ? PB : SC, 0.16)}" stroke="${i ? PB : SC}" stroke-width="3"/>` + T(36 + i * w + w / 2, 124, i ? 'p' : 's', { fs: 28, c: i ? PB : SC, ls: 0 });
  s += T(580, 136, pc, { fs: 54, c: SC, ls: 0, a: 'start' }) + T(582, 172, 's CHARACTER', { fs: 16, a: 'start' });
  s += T(36, 206, `1 s + ${n - 1} p → ${n} ${n === 4 ? 'sp³' : n === 3 ? 'sp²' : 'sp'} · each is 1 part s in ${n}`, { fs: 18, a: 'start', c: C.ink, ls: 0.4 });
  if (hi > 0.01) s += `<rect x="560" y="80" width="200" height="110" rx="14" fill="none" stroke="${C.ok}" stroke-width="4" opacity="${hi.toFixed(3)}"/>`;
  return s;
}
const btg = tag($('#bn'));
const BT = [[0, 'CARBON · 2s² 2p²'], [wt('S2', 'unpaired'), 'ONLY 2 UNPAIRED'], [tPro, 'PROMOTION'], [wt('S3', 'Now'), '4 UNPAIRED'], [tBl, 'MIXING'], [tOutc, '4 EQUAL sp³'], [tSp2, 'sp² · ONE p LEFT'], [tSp, 'sp · TWO p LEFT']];
const th1 = PUC.think($('#th1'), { q: 'Which hybrid orbital has the most <span style="color:#B7791F">s character</span>?', opts: ['sp', 'sp²', 'sp³'], right: 0, why: '<b>sp</b>: 1 part s out of 2 = <b style="color:#B7791F">50%</b>. sp² about 33%, sp³ 25%.' });

/* ---------- D ---------- */
const LK = [['LINK 1', 'Mix four orbitals, get four', '4 = 4', 'D2'], ['LINK 2', 'Only near-equal energies mix', 'OUTER SHELL', 'D3'], ['LINK 3', 'Hybrid orbitals: stronger bonds', 'BIG LOBE', 'D4'], ['LINK 4', 'Promotion not always needed', 'FULL TOO', 'D5'], ['LINK 5', 'Fixed directions fix the shape', 'SHAPE', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const DP = [
  () => sBall(100, 200, 40) + dot(100, 200) + pDb(210, 200, 0, 46, 20) + dot(210, 200) + pDb(320, 200, 90, 46, 20) + dot(320, 200) + pDb(420, 200, 40, 46, 20) + dot(420, 200) +
    `<line x1="480" y1="200" x2="540" y2="200" stroke="${C.ink2}" stroke-width="4"/><polygon points="552,200 538,192 538,208" fill="${C.ink2}"/>` + lobes3(650, 200, GEO.tet, 80) + dot(650, 200, 7, NC) +
    T(260, 330, '4 ATOMIC ORBITALS IN', { fs: 18 }) + T(650, 330, '4 HYBRIDS OUT', { fs: 18, c: NC }) + T(392, 440, '1 + 3 = 4', { fs: 54, c: C.ink, ls: 0 }),
  () => [[150, '2p', PB], [220, '2s', SC], [470, '1s', C.mute]].map(([y, l, c]) => `<line x1="220" y1="${y}" x2="420" y2="${y}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>` + T(190, y + 8, l, { fs: 24, c, ls: 0, a: 'end' })).join('') +
    `<path d="M440 150 h20 v70 h-20" fill="none" stroke="${C.ok}" stroke-width="4"/>` + T(480, 192, 'CLOSE · CAN MIX', { fs: 20, c: C.ok, a: 'start' }) + T(480, 478, 'TOO DEEP · NO', { fs: 20, c: C.red, a: 'start' }) + T(320, 320, 'ENERGY GAP', { fs: 16 }) +
    `<line x1="320" y1="232" x2="320" y2="296" stroke="${C.mute}" stroke-width="2" stroke-dasharray="5 6"/><line x1="320" y1="336" x2="320" y2="458" stroke="${C.mute}" stroke-width="2" stroke-dasharray="5 6"/>`,
  () => pDb(250, 190, 0, 80, 34) + dot(250, 190) + `<circle cx="380" cy="190" r="44" fill="${tint(C.ink2, 0.08)}" stroke="${C.ink2}" stroke-width="2.5"/>` + `<ellipse cx="338" cy="190" rx="10" ry="18" fill="${SC}" opacity=".55"/>` + T(160, 196, 'p', { fs: 24, c: PB, ls: 0, a: 'end' }) + T(560, 196, 'SMALL OVERLAP', { fs: 18, a: 'start' }) +
    hyb(230, 390, 0, 130) + dot(230, 390, 7, NC) + `<circle cx="390" cy="390" r="44" fill="${tint(C.ink2, 0.08)}" stroke="${C.ink2}" stroke-width="2.5"/>` + `<ellipse cx="352" cy="390" rx="22" ry="30" fill="${SC}" opacity=".6"/>` + T(160, 396, 'sp³', { fs: 24, c: NC, ls: 0, a: 'end' }) + T(560, 396, 'BIG OVERLAP', { fs: 18, a: 'start', c: C.ok }),
  () => [0, 1, 2, 3].map(i => box(212 + i * 96, 110, NC, i ? 'u' : 'ud', 1, 80)).join('') + T(252, 222, 'FULL', { fs: 18, c: EC }) + T(500, 222, 'HALF FILLED', { fs: 18 }) +
    molSVG({ cx: 300, cy: 380, R: 100, cr: 30, ar: 22, fs: 18, cen: 'N', doms: sqz(GEO.tet, ['b', 'b', 'l', 'b'], 0.12).map((d, i) => ({ d, k: i === 2 ? 'l' : 'b', lab: 'H' })) }) +
    T(470, 370, 'NH₃ · 4 sp³', { fs: 24, c: C.ink, ls: 0, a: 'start' }) + T(470, 406, 'NO PROMOTION', { fs: 18, c: NC, a: 'start' }),
  () => [[140, SH.lin, 0, '180°', 'sp'], [392, SH.tri, 0.9, '120°', 'sp²'], [644, GEO.tet, 1, '109.5°', 'sp³']].map(([x, d, w, a, n]) => lobes3(x, 240, d, 78, 1, w) + dot(x, 240, 7, NC) + T(x, 390, n, { fs: 30, c: NC, ls: 0 }) + T(x, 430, a, { fs: 22, c: C.ink, ls: 0 })).join(''),
];
const dtg = tag($('#dr'));
const DLB = ['MIX 4 · GET 4', 'ENERGY LADDER', 'OVERLAP WITH H', 'FULL ORBITALS JOIN', 'DIRECTION = SHAPE'];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`2 \\rightarrow ${Y_('sp')} \\quad 3 \\rightarrow ${Y_('sp^2')} \\quad 4 \\rightarrow ${Y_('sp^3')}`);

/* ---------- W: PCl5 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`5\\ \\text{bonds} + 0\\ \\text{lone pairs} = 5\\ \\text{orbitals}`)],
  [K(`${S_('3s')} + ${P_('3p')} = 1 + 3 = 4`)],
  [K(`+\\ ${D_('1\\ 3d')} \\rightarrow 5`)],
  [K(`${Y_('sp^3d')} \\rightarrow \\text{trigonal bipyramid}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Up-down bonds: longer, weaker'; $('#wl').appendChild(wPill);
const wtg = tag($('#wr'));
const tWj = wt('W4', 'joins'), tWh = wt('W5', 'hybridisation'), tWc = wt('W5', 'corners'), tW6 = T0('W6'), tW6u = wt('W6', 'Two');
function drawW(t) {
  const sh = io(t, tWc - 0.2, 0.6);
  let s = '';
  if (sh < 0.99) {
    const A = [[90, 430, SC], [90, 270, PB], [158, 270, PB], [226, 270, PB], [90, 130, DV]], Hh = [404, 472, 540, 608, 676].map(x => [x, 320]);
    const pr = io(t, tWj, 0.9), u = io(t, tWh, 1.2), ap = io(t, T0('W2') + 0.3, 0.4);
    let b = '';
    for (let i = 1; i < 5; i++) b += G(box(90 + i * 68, 130, DV, ''), (1 - u) * ap);
    A.forEach((p, i) => { const q = Hh[i], col = lc(p[2], NC, u); let e = ['ud', 'u', 'u', 'u', ''][i]; if (pr > 0.02) { if (i === 0) e = 'u'; if (i === 4) e = pr >= 0.999 ? 'u' : ''; }
      b += G(box(lerp(p[0], q[0], u), lerp(p[1], q[1], u), col, e), i === 4 ? ap * io(t, T0('W3') - 0.2, 0.4) + (1 - io(t, T0('W3') - 0.2, 0.4)) * ap : ap); });
    if (pr > 0.02 && pr < 0.999) { const x = lerp(131, 120, pr), y = lerp(430, 130, pr); b += ARW(x, y, 1); }
    b += G(T(120, 518, '3s', { fs: 22, c: SC, ls: 0 }) + T(192, 358, '3p', { fs: 22, c: PB, ls: 0 }) + T(260, 218, '3d', { fs: 22, c: DV, ls: 0 }), (1 - u) * ap);
    b += G(T(540, 410, 'FIVE sp³d', { fs: 22, c: NC, ls: 0 }), io(t, tWh + 0.8, 0.4));
    s += G(b, 1 - sh);
  }
  if (sh > 0.01) {
    const ang = io(t, tW6, 0.4), up = io(t, tW6u, 0.4);
    const doms = GEO.tbp.map((d, i) => ({ d, lab: 'Cl', rs: i === 2 || i === 4 ? 1 + 0.12 * up : 1 }));
    s += G(molSVG({ cx: 392, cy: 290, R: 180, cr: 44, ar: 30, fs: 20, cen: 'P', doms, arcs: [{ i: 2, j: 0, lab: '90°', a: up }, { i: 0, j: 1, lab: '120°', dx: -6, dy: 6, a: ang }] }), sh);
  }
  put($('#wS'), s);
  const WT = [[0, 'P · 3s² 3p³'], [T0('W3'), '3s + 3p = ONLY 4'], [tWj, '3d JOINS IN'], [tWh, 'sp³d'], [tWc, 'TRIGONAL BIPYRAMID'], [tW6u, 'UP-DOWN: LONGER']];
  M.setT(wtg, WT[cur(WT, t)][1]);
  M.setT($('#wrL'), sh > 0.5 ? 'MOLECULE BENCH · PCl₅' : 'MOLECULE BENCH · PHOSPHORUS');
}

/* ---------- C ---------- */
const PCS = [['2', 'sp'], ['3', 'sp²'], ['4', 'sp³'], ['5', 'sp³d'], ['6', 'sp³d²']];
$('#pcs').innerHTML = PCS.map(([n, h], i) => `<div class="pc2" id="pc${i}" style="left:${36 + i * 146}px"><b>${n}</b><span>${h}</span></div>`).join('');
const tC2 = T0('C2'), tC3 = T0('C3'), tC4 = T0('C4'), tC5 = T0('C5');
const NH3K = ['b', 'b', 'l', 'b'], NH3 = sqz(GEO.tet, NH3K, 0.12), H2OK = ['b', 'l', 'b', 'l'], H2O = sqz([[-0.816, -0.577, 0], nrm([-0.78, 0.6, 0.3]), [0.816, -0.577, 0], nrm([0.78, 0.6, -0.3])], H2OK, 0.2);
function drawC(t) {
  const a = io(t, wt('C2', 'octahedron') - 0.4, 0.5);
  put($('#cS1'), G(molSVG({ cx: 392, cy: 250, R: 165, cr: 42, ar: 28, fs: 20, cen: 'S', doms: GEO.oct.map(d => ({ d, lab: 'F' })), arcs: [{ i: 2, j: 0, lab: '90°' }] }), a) + G(T(392, 450, '1 s + 3 p + 2 d → 6 sp³d²', { fs: 20, c: C.ink, ls: 0.4 }), io(t, tC2 + 0.3, 0.4)));
  const n = io(t, tC3 - 0.1, 0.4), w = io(t, tC5 - 0.1, 0.4), sq = io(t, tC4, 0.4);
  let s = '';
  const row = (y, mol, k, cen, e, lab, al) => G(molSVG({ cx: 160, cy: y, R: 92, cr: 28, ar: 20, fs: 17, cen, doms: mol.map((d, i) => ({ d, k: k[i], lab: 'H' })) }) +
    e.map((x, i) => box(296 + i * 72, y - 30, NC, x)).join('') + T(296 + 144 - 4, y + 66, '4 PAIRS · sp³', { fs: 18, c: NC, ls: 0.6 }) + T(744, y + 14, lab, { fs: 30, c: C.ink, ls: 0, a: 'end' }), al);
  s += row(170, sq > 0.5 ? NH3 : GEO.tet, NH3K, 'N', ['ud', 'u', 'u', 'u'], sq > 0.01 ? '107°' : '', n);
  s += row(430, H2O, H2OK, 'O', ['ud', 'ud', 'u', 'u'], '104.5°', w);
  put($('#cS2'), s);
}

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Each carbon in ethyne has 4 bonds, so it is <b>sp³</b>', right: 'π bonds use no hybrids: 2 σ bonds, so <b>sp</b>' });
const yne = (cx, col) => { const xs = [cx - 130, cx - 50, cx + 50, cx + 130];
  return `<line x1="${xs[0]}" y1="110" x2="${xs[1]}" y2="110" stroke="${C.ink2}" stroke-width="5"/><line x1="${xs[2]}" y1="110" x2="${xs[3]}" y2="110" stroke="${C.ink2}" stroke-width="5"/>` +
    [-13, 0, 13].map(o => `<line x1="${xs[1]}" y1="${110 + o}" x2="${xs[2]}" y2="${110 + o}" stroke="${o ? '#7A4FE0' : C.ink2}" stroke-width="5"/>`).join('') +
    atomC(xs[0], 110, 17, 'H', HC, 15) + atomC(xs[1], 110, 22, 'C', col, 18) + atomC(xs[2], 110, 22, 'C', col, 18) + atomC(xs[3], 110, 17, 'H', HC, 15); };
$('#tS').innerHTML = `<g id="tM1">${yne(150, C.mute) + T(150, 200, '4 BONDS · sp³', { fs: 18, c: C.red, ls: 0.6 })}</g><g id="tM2">${yne(460, NC) + T(460, 200, '2 σ · sp · 180°', { fs: 18, c: C.ok, ls: 0.6 })}</g>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M60 50 L240 170 M240 50 L60 170'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Hybridisation of a central atom, and matching it with the shape' });
const mf = s => `\\mathrm{${s}}`;
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'In which pair do <b>both central atoms</b> have the same hybridisation?', qW: 820,
  opts: [K(`${mf('NH_3')},\\ ${mf('BF_3')}`), K(`${mf('H_2O')},\\ ${mf('CH_4')}`), K(`${mf('BeCl_2')},\\ ${mf('H_2O')}`), K(`${mf('SF_6')},\\ ${mf('PCl_5')}`)], right: 1, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${mf('CH_4')}: 4\\ \\text{bp} \\rightarrow ${Y_('sp^3')}`)], [K(`${mf('H_2O')}: 2\\,\\text{bp} + 2\\,\\text{lp} \\rightarrow ${Y_('sp^3')}`)], [K(`\\text{A: } ${Y_('sp^3')},\\ ${Y_('sp^2')}`)], [K(`\\text{C: } sp,\\ sp^3 \\quad \\text{D: } sp^3d^2,\\ sp^3d`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'C')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Hybridisation', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Hybridisation</b>: an atom mixes its orbitals into equal new hybrid orbitals',
    '<b>Count</b>: orbitals in = hybrids out · promotion is not always needed',
    '<b>sp</b> 180° · <b>sp²</b> 120° · <b>sp³</b> 109.5° · s character 50%, 33%, 25%',
    '<b>sp³d</b>: PCl₅, trigonal bipyramid · <b>sp³d²</b>: SF₆, octahedron',
    '<b>Count pairs</b>: bond pairs + lone pairs (NH₃, H₂O are sp³)',
    '<b>π bonds</b> use no hybrid orbitals: ethyne carbon is sp'] });
const YQ = ['How many hybrid orbitals form when one s and three p orbitals mix?', 'Why does sp have more s character than sp³?', 'What is the hybridisation of carbon in ethene?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 49', topic: 'Why does oxygen stick to a magnet? Molecular Orbital Theory', y: 764 });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'blend') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'equal') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'same') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'shape') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P5', 'hybridisation') - 0.1, 1e9, POP);
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
    const b2 = io(t, tB1 + 0.3, 0.4) * (1 - io(t, tB3, 0.4)), b1 = io(t, tB3, 0.4), b0 = 1 - io(t, tB1 + 0.3, 0.4);
    put($('#bS'), G(benchC(t), b0) + G(benchB(t, 3), b2) + G(benchB(t, 2), b1));
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · CARBON' : t < tB3 ? 'MOLECULE BENCH · 1 s + 2 p' : 'MOLECULE BENCH · 1 s + 1 p');
    M.setT(btg, BT[cur(BT, t)][1]); M.vis(btg, t, tS1 + 0.6, 1e9, POP);
    const k2 = io(t, tSp2 - 0.2, 0.4) * (1 - io(t, tSp - 0.2, 0.4)), k1 = io(t, tSp - 0.2, 0.4), k0 = 1 - io(t, tSp2 - 0.2, 0.4);
    put($('#shS'), G(shapeS(t, 'tet'), k0) + G(shapeS(t, 'tri'), k2) + G(shapeS(t, 'lin'), k1));
    M.setT($('#shL'), t < tOutc ? 'SHAPE · WAITING FOR THE MIX' : 'SHAPE');
    const ca = io(t, tBl, 0.4), cp = io(t, tPart - 0.1, 0.3);
    put($('#chS'), G(G(charS(4, cp > 0.5 ? '25%' : '?'), 1 - io(t, tB1 + 0.3, 0.4)) + G(charS(3, '33%'), b2) + G(charS(2, '50%'), b1), ca));
  }
  M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
  if (sOn) th1(t, { tin: tB4, tOpts: wt('B4', 'character') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'One') });

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    let s = ''; const ki = Math.max(0, cur(tLk.map(x => [x - 0.2]), t));
    DP.forEach((f, i) => { const a = io(t, (i ? tLk[i] : tD1 + 0.2) - 0.2, 0.35) * (i < 4 ? 1 - io(t, tLk[i + 1] - 0.2, 0.3) : 1); if (a > 0.01) s += G(f(), a); });
    put($('#dS'), s); M.setT(dtg, DLB[ki]); M.setT($('#drL'), 'MOLECULE BENCH · LINK ' + (ki + 1)); M.vis(dtg, t, tD1 + 0.5, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Count') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'know') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'shape') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'What') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs); M.vis(wPill, t, wt('W6', 'longer') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'phosphorus') + 0.1, out, { dx: 60, dy: 0, ...o });
    drawW(t); M.vis(wtg, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC3 - 0.3, out, { dx: 60, dy: 0, ...o });
    { const sh = M.spring(t - tC3 + 0.3, M.HEAVY); snap($('#cl'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    const sx = 392 + 408 * (1 - M.clamp(M.spring(t - tC3 + 0.3, M.HEAVY))); $('#cS1').style.left = (sx - 392).toFixed(1) + 'px';
    const pl = [36, 36 + 146 * 4]; PCS.forEach((_, i) => { const el = $('#pc' + i); M.vis(el, t, tC1 + 0.3 + i * 0.1, 1e9, { dy: 12 });
      const hi = i === 4 ? io(t, tC2, 0.3) * (1 - io(t, tC3, 0.3)) : i === 2 ? io(t, tC3 + 1.5, 0.3) : 0; setBg(el, mix(C.soft, C.ac2, hi));
      el.style.left = (36 + i * 146 + 408 * (1 - M.clamp(M.spring(t - tC3 + 0.3, M.HEAVY)))).toFixed(1) + 'px'; });
    drawC(t);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'ethyne') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Pi') - 0.1 });
    attr($('#tM1'), 'opacity', io(t, wt('X2', 'four') - 0.1, 0.3).toFixed(3)); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); attr($('#tM2'), 'opacity', io(t, wt('X3', 'Each') - 0.05, 0.3).toFixed(3));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Finding') });
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
