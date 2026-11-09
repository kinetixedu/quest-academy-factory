// PUC Chemistry Ep 46: VSEPR theory and shapes of molecules (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: central atom teal, outer atoms ink, electron pairs orange (bond pair dots + lone pair lobes), bond angles gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', LPF = '#FBEDE6';
const IMG = '../../assets/illustrations/puc/';
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const E_ = s => `\\textcolor{${EC}}{${s}}`, N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const F_ = (c, o, n) => `${N_(c)}${H_(o)}${n ? '_' + n : ''}`;

Object.assign(M.IC, {
  balloon: ['M12 16c3.3 0 6-3.1 6-7.2A6 6 0 0 0 6 8.8C6 12.9 8.7 16 12 16Z', 'm10.8 16-.8 1.6h4l-.8-1.6', 'M12 17.6c0 1.6-1.5 2.2-1.5 4.4'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  moveH: ['m18 8 4 4-4 4', 'm6 8-4 4 4 4', 'M2 12h20'],
  pyr: ['M12 3 3 19h18Z', 'M12 3v16'],
  knot: ['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M12 15v6', 'M9.5 10.5 5 5', 'M14.5 10.5 19 5'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});

/* ---------- molecule renderer: 3D directions, oblique 2D view, wedge = towards you, dashes = behind ---------- */
const nrm = v => { const l = Math.hypot(...v) || 1; return v.map(a => a / l); };
// view: w = 0 flat (planar molecules), w = 1 turned slightly so 3D pairs separate
const PR = ([x, y, z], w = 1) => { const ty = -0.3 * w, tx = 0.3 * w; let c = Math.cos(ty), s = Math.sin(ty); const x1 = x * c + z * s, z1 = -x * s + z * c; c = Math.cos(tx); s = Math.sin(tx); return [x1, -(y * c - z1 * s), y * s + z1 * c]; };
const is3 = g => g.some(d => d && Math.abs(d[2]) > 0.01) ? 1 : 0;
const GEO = {
  bun2: [[-0.3, 1, 0], [0.3, 1, 0]].map(nrm),
  lin: [[-1, 0, 0], [1, 0, 0]],
  tri: [[-0.866, -0.5, 0], [0.866, -0.5, 0], [0, 1, 0]],
  tet: [[-0.943, -0.333, 0], [0.471, -0.333, 0.816], [0, 1, 0], [0.471, -0.333, -0.816]],
  tbp: [[-1, 0, 0], [0.5, 0, 0.866], [0, 1, 0], [0.5, 0, -0.866], [0, -1, 0]],
  oct: [[-1, 0, 0], [0, 0, 1], [0, 1, 0], [0, 0, -1], [0, -1, 0], [1, 0, 0]],
};
// lone pairs squeeze the bond pairs: push each bond away from every lone pair
const sqz = (g, kinds, s) => g.map((d, i) => kinds[i] !== 'l' ? nrm(g.reduce((a, e, j) => kinds[j] === 'l' ? a.map((v, q) => v - s * e[q]) : a, d)) : d);
const f1 = v => v.toFixed(1);
function molSVG(o) {
  const { cx, cy, R } = o, cr = o.cr ?? 40, ar = o.ar ?? 28, fs = o.fs ?? 22, items = [];
  o.doms.forEach(dm => {
    const u = dm.u ?? 1, al = dm.a ?? 1; if (u < 0.01 || al < 0.01) return;
    const p = PR(dm.d, o.w ?? 1), L = Math.hypot(p[0], p[1]) || 1, ux = p[0] / L, uy = p[1] / L, px = -uy, py = ux, z = p[2];
    const ex = cx + R * u * p[0], ey = cy + R * u * p[1];
    let s = '';
    if (dm.k === 'l') {
      const rx = Math.max(30, R * 0.3 * L) * u, dd = (cr + rx + 6) * Math.min(1, u * 1.3), lc = [cx + ux * dd, cy + uy * dd], ry = 27 * u, ang = Math.atan2(uy, ux) * 180 / Math.PI;
      s += `<ellipse cx="${f1(lc[0])}" cy="${f1(lc[1])}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(${f1(ang)} ${f1(lc[0])} ${f1(lc[1])})" fill="${LPF}" stroke="${EC}" stroke-width="2.5" ${dm.dash ? 'stroke-dasharray="7 7"' : ''}/>`;
      [-1, 1].forEach(k => { s += `<circle cx="${f1(lc[0] + px * 10 * k)}" cy="${f1(lc[1] + py * 10 * k)}" r="6.5" fill="${EC}"/>`; });
    } else if (dm.k === 'p') {
      const m = [cx + R * u * 0.55 * p[0], cy + R * u * 0.55 * p[1]];
      [-1, 1].forEach(k => { s += `<circle cx="${f1(m[0] + px * 10 * k)}" cy="${f1(m[1] + py * 10 * k)}" r="7.5" fill="${EC}"/>`; });
    } else {
      const sx = cx + ux * cr * 0.8, sy = cy + uy * cr * 0.8, fx = ex - ux * ar * 0.7 * u, fy = ey - uy * ar * 0.7 * u, bo = dm.bo ?? 1;
      if (z > 0.5) s += `<polygon points="${f1(sx + px * 2)},${f1(sy + py * 2)} ${f1(sx - px * 2)},${f1(sy - py * 2)} ${f1(fx - px * 12)},${f1(fy - py * 12)} ${f1(fx + px * 12)},${f1(fy + py * 12)}" fill="${C.ink2}"/>`;
      else if (z < -0.5) for (let i = 0; i <= 7; i++) { const f = i / 7, hx = sx + (fx - sx) * f, hy = sy + (fy - sy) * f, w = 2 + 10 * f; s += `<line x1="${f1(hx + px * w)}" y1="${f1(hy + py * w)}" x2="${f1(hx - px * w)}" y2="${f1(hy - py * w)}" stroke="${C.ink2}" stroke-width="3.2" stroke-linecap="round"/>`; }
      else for (let b = 0; b < bo; b++) { const k = (b - (bo - 1) / 2) * 15; s += `<line x1="${f1(sx + px * k)}" y1="${f1(sy + py * k)}" x2="${f1(fx + px * k)}" y2="${f1(fy + py * k)}" stroke="${C.ink2}" stroke-width="6" stroke-linecap="round"/>`; }
      if (!o.noDots) { const mx = (sx + fx) / 2, my = (sy + fy) / 2, off = bo > 1 ? 7.5 * bo + 4 : 0; [-1, 1].forEach(k => { s += `<circle cx="${f1(mx + ux * 9 * k + px * off)}" cy="${f1(my + uy * 9 * k + py * off)}" r="6" fill="${EC}"/>`; }); }
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
    const AD = o.arcDoms || o.doms, pi = PR(AD[a.i].d, o.w ?? 1), pj = PR(AD[a.j].d, o.w ?? 1), a1 = Math.atan2(pi[1], pi[0]), a2 = Math.atan2(pj[1], pj[0]);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI; if (Math.abs(d) > 3.1) d = Math.PI;
    const ra = a.r ?? cr + 34, x1 = cx + ra * Math.cos(a1), y1 = cy + ra * Math.sin(a1), x2 = cx + ra * Math.cos(a1 + d), y2 = cy + ra * Math.sin(a1 + d), bm = a1 + d / 2, lr = ra + (a.lr ?? 46);
    out += `<g opacity="${(a.a ?? 1).toFixed(3)}"><path d="M${f1(x1)} ${f1(y1)} A${ra} ${ra} 0 0 ${d > 0 ? 1 : 0} ${f1(x2)} ${f1(y2)}" fill="none" stroke="${GC}" stroke-width="3.5" stroke-linecap="round"/>
      <text x="${f1(cx + lr * Math.cos(bm) + (a.dx ?? 0))}" y="${f1(cy + lr * Math.sin(bm) + 8 + (a.dy ?? 0))}" font-family="IBM Plex Mono" font-weight="600" font-size="${a.fs ?? 26}" fill="${GC}" text-anchor="middle" stroke="#fff" stroke-width="6" paint-order="stroke">${a.lab}</text></g>`;
  });
  return out;
}
// keyframed molecule: keys [{t, g, k, lab, cen, arcs, bo}], directions blend, new pairs grow, kinds cross-fade
const molAt = (keys, t, dur = 0.9) => {
  let i = 0; keys.forEach((k, n) => { if (t >= k.t) i = n; });
  const B = keys[i], A = keys[Math.max(0, i - 1)], u = i === 0 ? 1 : M.io((t - B.t) / dur), doms = [];
  const n = Math.max(A.g.length, B.g.length);
  for (let j = 0; j < n; j++) {
    const a = A.g[j], b = B.g[j], ka = (A.k || [])[j] || 'b', kb = (B.k || [])[j] || 'b', la = (A.lab || [])[j] ?? A.labA, lb = (B.lab || [])[j] ?? B.labA, boA = (A.bo || [])[j] ?? 1, boB = (B.bo || [])[j] ?? 1;
    const lam = (A.al || [])[j] ?? 1, lbm = (B.al || [])[j] ?? 1;
    if (a && b) { const d = nrm(a.map((v, q) => v + (b[q] - v) * u));
      if (ka === kb && la === lb && boA === boB) doms.push({ d, k: kb, lab: lb, bo: boB, a: lam + (lbm - lam) * u, dash: B.dash });
      else { doms.push({ d, k: ka, lab: la, bo: boA, a: lam * (1 - u) }); doms.push({ d, k: kb, lab: lb, bo: boB, a: lbm * u, dash: B.dash }); } }
    else if (b) doms.push({ d: b, k: kb, lab: lb, bo: boB, u, a: lbm });
    else doms.push({ d: a, k: ka, lab: la, bo: boA, u: 1 - u, a: lam });
  }
  const wa = A.w ?? is3(A.g), wb = B.w ?? is3(B.g);
  return { doms, cen: u < 0.5 ? A.cen : B.cen, key: B, i, u, w: wa + (wb - wa) * u };
};
const molDraw = (g, keys, t, base, extra = {}) => {
  const st = molAt(keys, t, extra.dur), slots = [];
  st.doms.forEach((d, q) => { if (q > 0 && st.doms[q - 1].d === d.d) return; slots.push(d); });
  const arcs = (st.key.arcs || []).map(a => ({ ...a, a: M.io((t - st.key.t - 0.55) / 0.35) }));
  const html = molSVG({ ...base, w: st.w, cen: st.cen, doms: st.doms, arcs, arcDoms: slots });
  if (g._h !== html) { g._h = html; g.innerHTML = html; }
  return st;
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB1 = T0('B1'), tB3 = T0('B3'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['balloon', 'Balloons', 'FOUR AT ONE KNOT', 'balloons', '109.5°'], ['droplet', 'Water', 'A BENT MOLECULE', 'water', '104.5°'], ['moveH', 'Carbon dioxide', 'A STRAIGHT MOLECULE', 'carbon', '180°']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['balloon', '4 balloons', 'four', 'H3'], ['knot', 'One knot', 'knot', 'H3'], ['x', 'Never flat', 'flat', 'H4'], ['pyr', '4 corners', 'corners', 'H4']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[3], k[2]));

/* ---------- P: pairs around the centre, ammonia spreading ---------- */
$('#mdefI').innerHTML = M.icon('zap', 26, '#fff', 2.2);
const QR = [['A central atom in the middle', 'CENTRE', 'P2', 'central'], ['Bond pair: holds another atom', 'BOND PAIR', 'P3', 'bond'], ['Lone pair: holds no atom', 'LONE PAIR', 'P4', 'lone'], ['All pairs are negative: they repel', 'PUSH', 'P5', 'push'], ['So they spread as far as they can', 'SPREAD', 'P6', 'spread']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${168 + i * 80}px;height:70px"><div class="nn" style="top:12px">${i + 1}</div><div class="qt" style="top:17px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const BUN = [[0.15, 1, 0.1], [0.5, 0.9, 0.25], [0.8, 0.55, -0.1], [0.35, 0.85, -0.35]].map(nrm);
const NH3K = ['b', 'b', 'l', 'b'], NH3 = sqz(GEO.tet, NH3K, 0.12);
const pKeys = [
  { t: 0, g: [], cen: 'N' },
  { t: wt('P3', 'bond') - 0.2, g: [BUN[0], BUN[1], null, BUN[3]].map(v => v || BUN[2]), k: ['b', 'b', 'p', 'b'], al: [1, 1, 0, 1], labA: 'H', cen: 'N' },
  { t: wt('P4', 'lone') - 0.2, g: [BUN[0], BUN[1], BUN[2], BUN[3]], k: NH3K, labA: 'H', cen: 'N' },
  { t: wt('P6', 'spread') - 0.2, g: NH3, k: NH3K, labA: 'H', cen: 'N', arcs: [{ i: 0, j: 1, lab: '107°' }] },
];
const ptag = document.createElement('div'); ptag.className = 'btag'; ptag.style.cssText = 'right:36px;top:18px;background:#FBEDE6;color:#C8461B'; $('#pw').appendChild(ptag);

/* ---------- U: the name ---------- */
const VW = [['V', 'Valence'], ['S', 'Shell'], ['E', 'Electron'], ['P', 'Pair'], ['R', 'Repulsion']];
$('#vws').innerHTML = VW.map(([l, w], i) => `<div class="vw" id="vw${i}" style="left:${64 + i * 300}px"><b>${l}</b><span>${w}</span></div>`).join('');
const tVw = VW.map(([, w]) => wt('U1', w));

/* ---------- S: the bench ---------- */
const BIG = { ar: 32, cr: 46, fs: 25 }, BEN = { cx: 392, cy: 310, R: 205, ...BIG };
const g = GEO;
const LBL = { lin: 'Cl', tri: 'F', tet: 'H', tbp: 'Cl', oct: 'F' };
const tS2 = wt('S2', 'opposite'), tS3 = wt('S3', 'Three'), tS4 = wt('S4', 'jump'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tMe = wt('B2', 'Methane'), tAm = wt('B2', 'Ammonia');
const sKeys = [
  { t: 0, g: g.bun2, labA: 'Cl', cen: 'Be' },
  { t: tS2 - 0.3, g: g.lin, labA: 'Cl', cen: 'Be', arcs: [{ i: 0, j: 1, lab: '180°' }] },
  { t: tS3 - 0.1, g: g.tri, labA: 'F', cen: 'B', arcs: [{ i: 2, j: 1, lab: '120°' }] },
  { t: tS4 - 0.2, g: g.tet, labA: 'H', cen: 'C', arcs: [{ i: 2, j: 0, lab: '109.5°', dx: -18 }] },
  { t: tS6 + 0.1, g: g.tbp, labA: 'Cl', cen: 'P', arcs: [{ i: 2, j: 0, lab: '90°' }, { i: 0, j: 1, lab: '120°', dx: -6, dy: 6 }] },
  { t: tS7 + 0.1, g: g.oct, labA: 'F', cen: 'S', arcs: [{ i: 2, j: 0, lab: '90°' }] },
  { t: tMe - 0.1, g: g.tet, labA: 'H', cen: 'C', arcs: [{ i: 2, j: 0, lab: '109.5°', dx: -18 }] },
  { t: tAm - 0.1, g: NH3, k: NH3K, labA: 'H', cen: 'N', arcs: [{ i: 0, j: 1, lab: '107°' }] },
];
const RO = [[0, '?', 'Two pairs', 'BeCl₂', 2, 0], [tS2, '180°', 'Linear', 'BeCl₂ · 2 PAIRS', 2, 0], [tS3, '120°', 'Trigonal planar', 'BF₃ · 3 PAIRS', 3, 0], [tS4, '109.5°', 'Tetrahedral', 'CH₄ · 4 PAIRS', 4, 0],
  [tS6 + 0.1, '120° · 90°', 'Trigonal bipyramidal', 'PCl₅ · 5 PAIRS', 5, 0], [tS7 + 0.1, '90°', 'Octahedral', 'SF₆ · 6 PAIRS', 6, 0], [tMe, '109.5°', 'Tetrahedral', 'CH₄ · 0 LONE PAIRS', 4, 0], [tAm, '107°', 'Trigonal pyramidal', 'NH₃ · 1 LONE PAIR', 4, 1]];
$('#roP').innerHTML = [0, 1, 2, 3, 4, 5].map(i => `<i id="rp${i}"></i>`).join('');
const GC5 = [['2', 'linear', '180°'], ['3', 'trig. planar', '120°'], ['4', 'tetrahedral', '109.5°'], ['5', 'trig. bipyr.', '120°, 90°'], ['6', 'octahedral', '90°']];
$('#gcs').innerHTML = GC5.map(([n, s, a], i) => `<div class="gc" id="gc${i}" style="left:${36 + i * 146}px"><div class="gn">${n}</div><div class="gs">${s}</div><div class="ga">${a}</div></div>`).join('');
const tGc = [tS2, tS3, tS4, tS6 + 0.1, tS7 + 0.1];
const GL = [[K(F_('C', 'H', 4)), '0 LONE PAIRS', '109.5°'], [K(F_('N', 'H', 3)), '1 LONE PAIR', '107°'], [K(`${H_('H')}_2${N_('O')}`), '2 LONE PAIRS', '104.5°']];
$('#gcl').innerHTML = GL.map(([n, s, a], i) => `<div class="gc" id="gl${i}" style="left:${36 + i * 244};width:224px;left:${36 + i * 244}px"><div class="gn" style="font:500 40px KaTeX_Main;top:16px">${n}</div><div class="gs" style="font:600 16px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">${s}</div><div class="ga">${a}</div></div>`).join('');
const tGl = [tMe, tAm, wt('B3', 'Water')];
// wedge / dash legend
const bS = $('#bS'), leg = document.createElementNS('http://www.w3.org/2000/svg', 'g'); bS.appendChild(leg);
leg.innerHTML = `<polygon points="40,540 40,536 100,528 100,548" fill="${C.ink2}"/><text x="114" y="545" font-family="IBM Plex Mono" font-weight="600" font-size="17" fill="${C.mute}" letter-spacing="1.4">TOWARDS YOU</text>` +
  Array.from({ length: 8 }, (_, i) => { const x = 330 + i * 8.5, w = 2 + 8 * i / 7; return `<line x1="${x}" y1="${538 - w}" x2="${x}" y2="${538 + w}" stroke="${C.ink2}" stroke-width="3" stroke-linecap="round"/>`; }).join('') + `<text x="414" y="545" font-family="IBM Plex Mono" font-weight="600" font-size="17" fill="${C.mute}" letter-spacing="1.4">BEHIND THE SCREEN</text>`;
const th1 = PUC.think($('#th1'), { q: `Water has two lone pairs. Is its angle bigger or smaller than ammonia's <span class="g" style="font-family:'IBM Plex Mono'">107°</span>?`, opts: ['Bigger', 'Smaller'], right: 1, why: 'Smaller: <b class="g">104.5°</b>. Two lone pairs push the two bonds even closer.' });

/* ---------- D: pushing order on water, then CO2 ---------- */
const LK = [['LINK 1', 'Lone pair vs lone pair', 'MOST', 'D2'], ['LINK 2', 'Lone pair vs bond pair', 'NEXT', 'D3'], ['LINK 3', 'Bond pair vs bond pair', 'LEAST', 'D4'], ['LINK 4', 'Double bond = one pair', 'ONE WAY', 'D5'], ['LINK 5', 'Geometry is not shape', 'BENT', 'D6']];
$('#lks').innerHTML = LK.map(([l, x, v], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 92}px"><div class="lt">${l}</div><div class="lx">${x}</div><div class="lv">${v}</div></div>`).join('');
const tLk = LK.map(l => T0(l[3]));
const H2OK = ['b', 'l', 'b', 'l'], H2O = sqz([[-0.816, -0.577, 0], nrm([-0.78, 0.6, 0.3]), [0.816, -0.577, 0], nrm([0.78, 0.6, -0.3])], H2OK, 0.2);
const dKeys = [{ t: 0, g: H2O, k: H2OK, labA: 'H', cen: 'O', arcs: [{ i: 0, j: 2, lab: '104.5°' }] }];
const dG = $('#dM'), dS = $('#dS'), dG2 = document.createElementNS('http://www.w3.org/2000/svg', 'g'), dP = document.createElementNS('http://www.w3.org/2000/svg', 'g');
dS.appendChild(dP); dS.appendChild(dG2);
dS.insertAdjacentHTML('afterbegin', `<defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${C.red}"/></marker></defs>`);
const DC = { cx: 392, cy: 290, R: 205, ...BIG };
const pushL = [[0, 2, 7], [2, 1, 4.5], [1, 3, 2.5]].map(() => { const l = document.createElementNS('http://www.w3.org/2000/svg', 'line'); attr(l, 'stroke', C.red); attr(l, 'stroke-linecap', 'round'); attr(l, 'marker-start', 'url(#ah)'); attr(l, 'marker-end', 'url(#ah)'); dP.appendChild(l); return l; });
dG2.innerHTML = molSVG({ w: 0, cx: 392, cy: 300, R: 190, cen: 'C', doms: [{ d: [-1, 0, 0], k: 'b', lab: 'O', bo: 2 }, { d: [1, 0, 0], k: 'b', lab: 'O', bo: 2 }], arcs: [{ i: 0, j: 1, lab: '180°' }], noDots: true }) +
  `<text x="392" y="500" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="${C.mute}" text-anchor="middle" letter-spacing="1.6">CO₂ · 2 DOUBLE BONDS = 2 PAIRS</text>`;
const dtag = document.createElement('div'); dtag.className = 'btag'; dtag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#dr').appendChild(dtag);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${G_('109.5^\\circ')} > ${G_('107^\\circ')} > ${G_('104.5^\\circ')}`);

/* ---------- W: SF4 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${N_('S')}: 6 + 4 \\times ${H_('F')}: 1 = ${E_('10\\ e^-')}`)],
  [K(`${E_('10\\ e^-')} \\div 2 = ${E_('5\\ \\text{pairs}')}`)],
  [K(`4\\ \\text{bond pairs} + ${E_('1\\ \\text{lone pair}')}`)],
  [K(`5\\ \\text{pairs} \\rightarrow \\text{trigonal bipyramid}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 92 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:500px'; wPill.textContent = 'Shape: see-saw'; $('#wl').appendChild(wPill);
const SF4K = ['l', 'b', 'b', 'b', 'b'], SF4 = sqz(GEO.tbp, SF4K, 0.1);
const wKeys = [
  { t: 0, g: [], cen: 'S' },
  { t: T0('W2') + 0.3, g: [[0.2, 1, 0.1], [0.45, 0.9, -0.2], [0.7, 0.7, 0.1], [-0.1, 0.95, -0.25], [0.3, 0.8, 0.4]].map(nrm), k: ['p', 'p', 'p', 'p', 'p'], cen: 'S' },
  { t: T0('W3') - 0.1, g: GEO.tbp, k: ['p', 'p', 'p', 'p', 'p'], cen: 'S' },
  { t: wt('W4', 'Four') - 0.1, g: GEO.tbp, k: SF4K, labA: 'F', cen: 'S' },
  { t: wt('W5', 'middle') - 0.1, g: SF4, k: SF4K, labA: 'F', cen: 'S' },
  { t: wt('W6', 'atoms') - 0.1, g: SF4, k: SF4K, labA: 'F', cen: 'S', al: [0.22, 1, 1, 1, 1], dash: true },
];
const wtag = document.createElement('div'); wtag.className = 'btag'; wtag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#wr').appendChild(wtag);

/* ---------- C: shapes with lone pairs ---------- */
const SH = [['3 PAIRS · 1 LONE', 'Bent', F_('S', 'O', 2), 'C2', 'tri', ['b', 'b', 'l'], 'S', 'O', 0.12, [2, 2, 1], 'SO₂'],
  ['5 PAIRS · 2 LONE', 'T-shaped', `${N_('Cl')}${H_('F')}_3`, 'C3', 'tbp', ['b', 'l', 'b', 'l', 'b'], 'Cl', 'F', 0.06, null, 'ClF₃'],
  ['6 PAIRS · 1 LONE', 'Square pyramid', `${N_('Br')}${H_('F')}_5`, 'C4', 'oct', ['b', 'b', 'b', 'b', 'l', 'b'], 'Br', 'F', 0.06, null, 'BrF₅'],
  ['6 PAIRS · 2 LONE', 'Square planar', `${N_('Xe')}${H_('F')}_4`, 'C5', 'oct', ['b', 'b', 'l', 'b', 'l', 'b'], 'Xe', 'F', 0, null, 'XeF₄']];
$('#srs').innerHTML = SH.map(([p, n, f], i) => `<div class="sr" id="sr${i}" style="top:${84 + i * 112}px"><div class="sp">${p}</div><div class="sn2">${n}</div><div class="sx2">${K(f)}</div></div>`).join('');
const tSh = SH.map(s => T0(s[3]));
const cKeys = SH.map(([, , , id, ge, k, cen, la, s, bo], i) => ({ t: T0(id) - 0.1, g: s ? sqz(GEO[ge], k, s) : GEO[ge], k, labA: la, cen, bo: bo || [] }));
const avA = PUC.avatar($('#cp'), { x: 36, y: 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Count every pair, then hide the lone ones.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(F_('N', 'H', 3))} has three H, so it is trigonal planar like ${K(`${N_('B')}${H_('F')}_3`)}`, right: `Count the lone pair: 4 pairs, trigonal pyramidal, <b class="g" style="font-family:'IBM Plex Mono'">107°</b>` });
const MINI = { R: 78, cr: 24, ar: 17, fs: 15 };
$('#tM1').innerHTML = molSVG({ ...MINI, w: 0, cx: 150, cy: 112, cen: 'N', doms: GEO.tri.map(d => ({ d, k: 'b', lab: 'H' })), noDots: true }) + `<text x="150" y="238" font-family="IBM Plex Mono" font-weight="600" font-size="16" fill="${C.red}" text-anchor="middle">FLAT · LONE PAIR FORGOTTEN</text>`;
const xM = document.createElementNS('http://www.w3.org/2000/svg', 'path'); attr(xM, 'd', 'M70 40 L230 190 M230 40 L70 190'); attr(xM, 'stroke', C.red); attr(xM, 'stroke-width', 6); attr(xM, 'stroke-linecap', 'round'); attr(xM, 'fill', 'none'); $('#tS').appendChild(xM);
$('#tM2').innerHTML = molSVG({ ...MINI, cx: 460, cy: 112, cen: 'N', doms: NH3.map((d, i) => ({ d, k: NH3K[i], lab: 'H' })), noDots: true }) + `<text x="460" y="238" font-family="IBM Plex Mono" font-weight="600" font-size="16" fill="${C.ok}" text-anchor="middle">PYRAMIDAL · 107°</text>`;
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Matching molecules to shapes, and ordering bond angles' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these molecules is <b>square planar</b>?', qW: 780,
  opts: [K(`${N_('S')}${H_('F')}_4`), K(`${N_('Xe')}${H_('F')}_4`), K(`${N_('C')}${H_('Cl')}_4`), K(`${N_('Br')}${H_('F')}_5`)], right: 1, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${N_('Xe')}: 8 + 4 = ${E_('12\\ e^-')}`)], [K(`${E_('6\\ \\text{pairs}')} = 4\\,\\text{bp} + ${E_('2\\,\\text{lp}')}`)], ['lone pairs opposite: <b>flat square</b>'], ['SF₄ see-saw · CCl₄ tetrahedral · BrF₅ sq. pyramid']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'flat'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · VSEPR theory and shapes', y0: 96, dy: 62, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>VSEPR</b>: electron pairs around the central atom push as far apart as they can',
    '<b>2 · 3 · 4 pairs</b>: linear <span class="g">180°</span> · trigonal planar <span class="g">120°</span> · tetrahedral <span class="g">109.5°</span>',
    '<b>5 · 6 pairs</b>: trigonal bipyramidal <span class="g">120°, 90°</span> · octahedral <span class="g">90°</span>',
    '<b>Push order</b>: lone-lone > lone-bond > bond-bond',
    '<b>Angles</b>: CH₄ <span class="g">109.5°</span> > NH₃ <span class="g">107°</span> > H₂O <span class="g">104.5°</span>',
    '<b>With lone pairs</b>: SO₂ bent · SF₄ see-saw · ClF₃ T · BrF₅ sq. pyramid · XeF₄ sq. planar'] });
const YQ = ['Why does a lone pair push harder than a bond pair?', 'Why is water bent, when its four pairs make a tetrahedron?', 'How many lone pairs does xenon have in XeF₄?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 47', topic: 'How do two atoms hold on to each other? Valence Bond Theory', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
  $('#vn1').style.left = (64 + $('#vn0').offsetWidth + 24) + 'px';
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#so .sx').forEach(q => { if (q.offsetWidth > 400) q.style.fontSize = Math.floor(24 * 400 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const cur = (arr, t) => arr.reduce((a, r, i) => t >= r[0] ? i : a, 0);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'rule') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'all') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'push') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'predict') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P5', 'negative') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'central') - 0.2, out, { dx: 60, dy: 0, ...o });
    molDraw($('#pM'), pKeys, t, { cx: 392, cy: 320, R: 205, ...BIG });
    M.setT(ptag, t < wt('P4', 'lone') ? 'BOND PAIR · HOLDS AN ATOM' : t < wt('P6', 'spread') ? 'LONE PAIR · NO ATOM' : 'SPREAD OUT');
    M.vis(ptag, t, wt('P3', 'bond'), 1e9, POP);
  }

  /* U */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#vs'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    VW.forEach((_, i) => M.vis($('#vw' + i), t, tVw[i] - 0.1, 1e9, { dy: 20 }));
    M.vis($('#vHr'), t, wt('U1', 'Sidgwick') - 0.2, 1e9, { dy: 0 });
    M.vis($('#vn0'), t, wt('U1', 'Sidgwick') - 0.1, 1e9, { dy: 12 }); M.vis($('#vn1'), t, wt('U1', 'Nyholm') - 0.1, 1e9, { dy: 12 });
  }

  /* S + B: the bench */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B3');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#ro'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#gt'), t, tS1 + 0.6, z, { dy: 36, ...o });
    M.setT($('#bnL'), t < tB1 ? 'MOLECULE BENCH · PAIRS PUSH APART' : 'MOLECULE BENCH · ADD LONE PAIRS');
    molDraw($('#bM'), sKeys, t, BEN);
    fade(leg, t, tS5 - 0.1, tS6, 0.3);
    const ri = cur(RO, t), r = RO[ri];
    M.setT($('#roB'), r[1]); M.setT($('#roN'), r[2]); M.setT($('#roE'), r[3]);
    const pu = M.io((t - r[0]) / 0.2) * (1 - M.io((t - r[0] - 0.5) / 0.4)); $('#roB').style.color = mix(GC, C.ink, pu * 0.6);
    for (let i = 0; i < 6; i++) { const e = $('#rp' + i), on = i < r[4], lp = i >= r[4] - r[5] && on; setBg(e, on ? (lp ? LPF : C.ink2) : C.soft); e.style.borderColor = on ? (lp ? EC : C.ink2) : C.line; }
    M.setT($('#gtL'), t < tB1 ? 'PAIRS · GEOMETRY · ANGLE' : 'LONE PAIRS SQUEEZE THE ANGLE');
    const gIn = 1 - M.io((t - tB1) / 0.3);
    GC5.forEach((_, i) => { const el = $('#gc' + i); M.vis(el, t, tS1 + 0.8 + i * 0.08, tB1, { dy: 12, outDur: 0.25, ody: -8 });
      const on = M.io((t - tGc[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tGc[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.gn').style.color = mix(C.ink, '#fff', on); el.querySelector('.gs').style.color = mix(C.ink, '#fff', on); el.querySelector('.ga').style.color = mix(GC, '#F2C46B', on); });
    GL.forEach((_, i) => { const el = $('#gl' + i); M.vis(el, t, tB1 + 0.2 + i * 0.1, 1e9, { dy: 12 }); const on = M.io((t - tGl[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tGl[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#th1'), t, tB3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB3, tOpts: wt('B3', 'bigger') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: wt('B4', 'Two') });
  }

  /* D: pushing order */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dy: 14 }); const on = M.io((t - tLk[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tLk[i + 1]) / 0.25) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    const co2 = M.io((t - tLk[3] + 0.1) / 0.35) * (1 - M.io((t - tLk[4] + 0.1) / 0.35));
    const ghost = M.io((t - wt('D6', 'Shape') + 0.1) / 0.4);
    const st = molAt(dKeys, t); st.doms.forEach((d, i) => { if (d.k === 'l') { d.a = 1 - 0.75 * ghost; d.dash = ghost > 0.5; } });
    const html = molSVG({ ...DC, w: 1, cen: 'O', doms: st.doms, arcs: [{ i: 0, j: 2, lab: '104.5°' }] });
    if (dG._h !== html) { dG._h = html; dG.innerHTML = html; }
    dG.style.opacity = (1 - co2).toFixed(3); dG2.style.opacity = co2.toFixed(3); M.hide(dG2, co2 < 0.01);
    // push arrows between pairs: lp-lp thick, lp-bp medium, bp-bp thin
    [[1, 3, 7, 0], [3, 2, 4.5, 1], [0, 2, 2.5, 2]].forEach(([i, j, w, k], q) => {
      const a = PR(H2O[i]), b = PR(H2O[j]), rr = DC.R * 0.62, l = pushL[q], sh = 0.18;
      const ax = DC.cx + rr * a[0], ay = DC.cy + rr * a[1], bx = DC.cx + rr * b[0], by = DC.cy + rr * b[1];
      attr(l, 'x1', f1(ax + (bx - ax) * sh)); attr(l, 'y1', f1(ay + (by - ay) * sh)); attr(l, 'x2', f1(bx - (bx - ax) * sh)); attr(l, 'y2', f1(by - (by - ay) * sh)); attr(l, 'stroke-width', w);
      fade(l, t, tLk[k] - 0.05, tLk[3] - 0.2, 0.3);
    });
    const DT = [[tD1, 'H₂O · 2 LONE PAIRS'], [tLk[0], 'LONE-LONE · MOST'], [tLk[1], 'LONE-BOND · NEXT'], [tLk[2], 'BOND-BOND · LEAST'], [tLk[3], 'O=C=O · 180°'], [tLk[4], 'GEOMETRY · TETRAHEDRAL'], [wt('D6', 'bent') - 0.1, 'SHAPE · BENT']];
    M.setT(dtag, DT[cur(DT, t)][1]); M.vis(dtag, t, tD1 + 0.5, 1e9, POP);
    M.setT($('#drL'), co2 > 0.5 ? 'MOLECULE BENCH · CARBON DIOXIDE' : 'MOLECULE BENCH · WATER');
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Electron') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'lone') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'hardest') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'shape') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis(wPill, t, wt('W6', 'shape') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, wt('W1', 'shape') + 0.1, out, { dx: 60, dy: 0, ...o });
    molDraw($('#wM'), wKeys, t, { cx: 392, cy: 310, R: 205, ...BIG });
    const WT = [[0, 'SULPHUR · 6 OUTER e⁻'], [wt('W2', 'fluorine'), '6 + 4 = 10 e⁻'], [T0('W3'), '5 PAIRS'], [T0('W4'), '4 BOND + 1 LONE'], [wt('W5', 'middle') - 0.1, 'LONE PAIR · MIDDLE RING'], [wt('W6', 'atoms') - 0.1, 'SEE-SAW']];
    M.setT(wtag, WT[cur(WT, t)][1]); M.vis(wtag, t, T0('W2'), 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    SH.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tSh[i] - 0.15, 1e9, { dy: 14 });
      const on = M.io((t - tSh[i] + 0.1) / 0.3) * (i < 3 ? 1 - M.io((t - tSh[i + 1] + 0.1) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ac2, on)); });
    const ci = SH.reduce((a, s, i) => t >= tSh[i] - 0.1 ? i : a, 0);
    M.setT($('#cpL'), 'MOLECULE BENCH · ' + SH[ci][10]);
    const cg = $('#cM'); molDraw(cg, cKeys, t, { cx: 392, cy: 280, R: 185, ...BIG }); fade(cg, t, tSh[0] - 0.1, 1e9, 0.3);
    avA(t, wt('C5', 'opposite') + 0.2, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'three') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Count') - 0.1 });
    fade($('#tM1'), t, wt('X2', 'planar') - 0.1); M.draw(xM, t, wt('X3', 'Wrong'), 0.4); fade($('#tM2'), t, wt('X3', 'Four') - 0.05);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Matching') });
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
