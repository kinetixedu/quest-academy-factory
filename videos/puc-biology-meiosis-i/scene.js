// PUC Biology Ep 78: Meiosis I (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// fixed biology colours (bible canon)
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, CHL = '#3E9B5F', NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', PET = '#F2B8C6', ANTH = '#E8C46A', OVW = '#BFE0B4', OVL = '#F3E7C9';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const has = id => !!M.CUES.lines[id];
const OUT = id => T0(id) - 0.32;
const o = { outDur: 0.3, ody: -16 };
// labelled-diagram system: dot on the part, leader line, text pops after the line draws
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0, tout = 1e9) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, tout, { ...POP, sc: 0.2 }); l.tx.style.opacity = (M.clamp((t - t0 - 0.3) / 0.25) * (1 - M.clamp((t - tout) / 0.25))).toFixed(3); if (t > tout + 0.25) M.hide(l.ln, true); };
// chip row (zoom ladder / stage chain): done outlined, current filled, future grey
const chips = (sel, names, pre, num) => {
  $(sel).innerHTML = names.map((n, i) => `<span class="zc" id="${pre}${i}">${num ? (i + 1) + ' ' : ''}${n}</span>${i < names.length - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
  return cur => names.forEach((_, i) => { const el = $('#' + pre + i), on = i === cur, done = i < cur;
    el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
};
// info card stack (one item at a time)
const stack = (sel, pre, items) => {
  $(sel).innerHTML = items.map(([r, n, d, h], i) => `<div class="lvI" id="${pre}${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 15 ? 40 : n.length > 12 ? 46 : 54}px">${n}</div><div class="ld">${d}</div>${h ? `<div class="lh">${h}</div>` : ''}</div>`).join('');
  return (t, tins) => items.forEach((_, i) => M.vis($('#' + pre + i), t, tins[i], i < items.length - 1 ? tins[i + 1] - 0.05 : 1e9, { dy: 20, outDur: 0.25, ody: -12 }));
};
const curOf = (t, ts, lead = 0.05) => { let c = -1; ts.forEach((tt, i) => { if (t >= tt - lead) c = i; }); return c; };
// zoom ladder: groups push in through a focus ring to the next level
const zoomRun = (t, Z) => Z.G.forEach((g, k) => {
  const n = Z.G.length, e = k === 0 ? M.io((t - Z.tZ[0]) / 0.6) : M.io((t - Z.tZ[k] - 0.25) / 0.85), x = k < n - 1 ? M.io((t - Z.tZ[k + 1]) / 0.75) : 0;
  if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
  const c = Z.c || [528, 263], f = Z.FOC[k] || c, sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sc = sIn * (1 + 2.4 * x);
  const cx = x > 0 ? f[0] : c[0], cy = x > 0 ? f[1] : c[1];
  attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
  g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
  (Z.LB[k] || []).forEach((l, i) => labRun(l, t, Z.tLab[k][i]));
  if (Z.FR[k]) M.draw(Z.FR[k], t, Z.tZ[k + 1] - 0.7, 0.5);
});
const focRings = (G, FOC) => FOC.map((f, lv) => f && mk(G[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
// side by side comparison rows: [icon, key, textA, textB, tA, tB, drawA(svg), drawB(svg)]
const cmp = (host, cols, rows, pre, top = 92, dy = 120) => {
  host.innerHTML = rows.map(([ic, k, a, b], i) => `<div class="vr" id="${pre}r${i}" style="top:${top + i * dy}px"><div class="vk">${ic ? M.icon(ic, 30, C.ac, 2.2) : ''}${k}</div>
    <svg id="${pre}a${i}" width="130" height="100" style="left:230px"></svg><div class="vt" id="${pre}ta${i}" style="left:380px">${a}</div>
    <svg id="${pre}b${i}" width="130" height="100" style="left:902px"></svg><div class="vt" id="${pre}tb${i}" style="left:1052px">${b}</div></div>`).join('') +
    `<div class="vh" style="left:250px;width:640px;background:var(--ac2);color:#1F6B3F">${cols[0]}</div><div class="vh" style="left:922px;width:640px;background:var(--ink);color:#fff">${cols[1]}</div>`;
  rows.forEach((r, i) => { if (r[6]) r[6]($('#' + pre + 'a' + i)); if (r[7]) r[7]($('#' + pre + 'b' + i)); });
  return t => { const cur = curOf(t, rows.map(r => r[4]), 0.4);
    rows.forEach((r, i) => { const el = $('#' + pre + 'r' + i); M.vis(el, t, r[4] - 0.4, 1e9, { dy: 14 }); el.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#' + pre + 'a' + i), t, r[4] - 0.1, 1e9, POP); M.vis($('#' + pre + 'ta' + i), t, r[4], 1e9, { dx: -12, dy: 0 });
      M.vis($('#' + pre + 'b' + i), t, r[5] - 0.1, 1e9, POP); M.vis($('#' + pre + 'tb' + i), t, r[5], 1e9, { dx: -12, dy: 0 }); }); };
};
// sort board: tiles [icon, name, clue, bin, slot, tin]
const sortB = (host, bins, tiles) => {
  host.insertAdjacentHTML('beforeend', bins.map(([n, st], b) => `<div class="bin" id="bn${b}" style="left:${36 + b * 780}px"><div class="bh" style="${st}">${n}</div></div>`).join('') +
    tiles.map(([ic, n, c, b, s], i) => `<div class="tl" id="tl${i}" style="left:${56 + b * 780}px;top:${146 + s * 130}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><div class="tn">${n}</div><div class="tc">${c}</div></div>`).join(''));
  return t => { bins.forEach((_, i) => M.vis($('#bn' + i), t, T0('W1') + 0.4 + i * 0.15, 1e9, { dy: 12 }));
    tiles.forEach((w, i) => { const el = $('#tl' + i); M.vis(el, t, w[5] - 0.15, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 }); el.style.background = mix(C.ac2, C.soft, M.io((t - w[5] - 1.6) / 0.4)); }); };
};
// floral formula as HTML tokens: 'Br', 'act', 'zyg', 'bi', ['K','(5)'], adhesion groups {adh:[tok,tok]}, superior: ['G','(2)','sup']
const SYM = { act: '<svg width="30" height="30" viewBox="0 0 30 30" style="vertical-align:-5px"><circle cx="15" cy="15" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M15 4v22M4 15h22" stroke="currentColor" stroke-width="2.6"/></svg>',
  bi: '<svg width="30" height="34" viewBox="0 0 30 34" style="vertical-align:-6px"><circle cx="15" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M15 21v11M10 27h10M20 9l7-7M22 2h5v5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>',
  zyg: '<span style="font-weight:700">%</span>' };
const ftok = (k, i) => { if (SYM[k]) return `<span class="ft" data-i="${i}">${SYM[k]}</span>`; if (typeof k === 'string') return `<span class="ft" data-i="${i}"><b>${k}</b></span>`;
  if (k.adh) return `<span class="fadh">${k.adh.map((x, j) => ftok(x, i + '-' + j)).join('')}</span>`;
  return `<span class="ft" data-i="${i}"><b>${k[0]}</b><sub class="${k[2] === 'sup' ? 'fsu' : k[2] === 'inf' ? 'fin' : ''}">${k[1]}</sub></span>`; };
const fml = (toks) => `<span class="fml">${toks.map((k, i) => ftok(k, i)).join('')}</span>`;
// exam segment + recap + questions + NEXT, identical layout in every episode
const exam = E => {
  const trap = PUC.trap($('#trap'), { wrong: E.wrong, right: E.right });
  const where = PUC.where($('#wa'), { on: [], type: E.type });
  const mcq = PUC.mcq($('#mq'), Object.assign({ pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, optW: 474, optY: 400 }, E.mcq));
  const so = PUC.solution($('#so'), E.sol, { y0: 100, dy: 100 });
  const fc = PUC.fcard($('#sF'), { x: 220, y: 262, w: 1480, h: 470, title: E.recapT, y0: 100, dy: 70, txt: E.recap.map(() => 1), lines: E.recap });
  $('#yrs').innerHTML = E.yq.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
  const nx = PUC.next($('#sF'), { label: E.nextL, topic: E.nextT, y: 764 });
  const tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
  PUC.mcqSfx(tCount, tAns);
  return t => {
    const xOn = t >= T0('X1') - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
    if (xOn) { M.vis($('#trap'), t, T0('X1') + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
      trap(t, { tin: T0('X1'), tWrong: T0('X2') + 0.1, tStrike: wt('X3', 'But') - 0.05, tRight: E.tRight });
      where(t, { tin: T0('E1'), tLight: [], tType: E.tType }); if (E.xRun) E.xRun(t); }
    const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
    if (qOn) { M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 }); mcq(t, { tin: tQ, tOpts: E.tOpts, tCount, tAns });
      M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 }); so(t, tAns + 0.1, E.tSo); }
    const fOn = t >= tF; M.hide($('#sF'), !fOn);
    if (fOn) { fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: E.recap.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
      M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 }); ['Y2', 'Y3', 'Y4'].forEach((id, i) => M.vis($('#yr' + i), t, T0(id) - 0.1, 1e9, { dx: -24, dy: 0 })); nx(t, T0('N1') - 0.05); }
  };
};
// title card tiles + hook right card (image, face, pill) + split panel + learn tiles
const titleTiles = J => { $('#jobs').innerHTML = J.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
  return J.map(j => wt('H1', j[3])); };
const learnTiles = L => { $('#fvs').innerHTML = L.map(([ic, n], i) => `<div class="fv" id="fv${i}" style="left:${(784 - (L.length * 146 - 16)) / 2 + i * 146}px"><i>${M.icon(ic, 40, C.ac, 2.2)}</i><span>${n}</span></div>`).join(''); return L.map(f => wt('H5', f[2])); };

/* ===== living cell (Ch 10): chromatids, spindle, asters, envelope, furrow or cell plate ===== */
const VIO = '#7B4B94', LIL = '#B79BCB', SPN = '#4A78C2', NUF = '#D7C3E6', CYF = '#F3F7EA', MIF = '#F2B57E', MIS = '#B35F22', ERC = '#C77DA0', GOC = '#D9A23B', WLF = '#E3D3A0', WLS = '#7A6A2E', NODC = '#C9962B';
const RAD = Math.PI / 180;
// one chromatid shape: centre, angle (deg, 90 = upright), middle offset (bx, by), length, wiggle
const chPts = (x, y, a, bx, by, L, amp, ph, f0, f1) => { const ux = Math.cos(a * RAD), uy = Math.sin(a * RAD), nx = -uy, ny = ux, p = [];
  for (let k = 0; k <= 16; k++) { const s = f0 + (f1 - f0) * k / 16, q = 2 * s - 1, w = 1 - q * q, wg = amp * Math.sin(s * Math.PI * 7 + ph);
    p.push(`${(x + ux * q * L / 2 + 2 * bx * w * 0.5 + nx * wg).toFixed(1)},${(y + uy * q * L / 2 + 2 * by * w * 0.5 + ny * wg).toFixed(1)}`); }
  return 'M' + p.join(' L'); };
// sister chromatids of one chromosome joined at the centromere: returns two chromatid states [x, y, a, bx, by, vis]
const sis = (x, y, a = 90, o = 7, v = [1, 1]) => { const nx = -Math.sin(a * RAD), ny = Math.cos(a * RAD); return [-1, 1].map((s, i) => [x + s * o * nx, y + s * o * ny, a, -s * o * 0.85 * nx, -s * o * 0.85 * ny, v[i]]); };
// a chromatid on its way to a pole (side s = -1 left, +1 right): centromere leads, arms trail
const goP = (x, y, s, tr = 16) => [x, y, 90, s * tr, 0, 1];
const lerpS = (A, B, p) => { const o = {}; for (const k in A) o[k] = k === 'c' ? A.c.map((c, i) => c.map((v, j) => v + ((B.c && B.c[i] ? B.c[i][j] : v) - v) * p)) : (typeof A[k] === 'number' && typeof B[k] === 'number' ? A[k] + (B[k] - A[k]) * p : A[k]); return o; };
// keyframes: [{t, d, ...fields, c:[chromatids]}]; the first one is the starting state
const kfRun = (KF, t) => { let s = Object.assign({}, KF[0]); for (let k = 1; k < KF.length; k++) { const f = KF[k]; if (t < f.t) break; const p = M.io((t - f.t) / (f.d || 1)); s = lerpS(s, Object.assign({}, s, f), p); } return s; };
const S0 = { grow: 0, cond: 0, env: 1, nuc: 1, org: 1, sp: 0, cen2: 1, ast: 0, fib: 0, pl: 0, fur: 0, apart: 0, plate: 0, env2: 0, xo: 0, sc: 0, nod: 0 };
// o: {x, y, s, plant, Rx, Ry, PX, NR, CH:[{L, c, c2, k}], mito}
const cellSim = (parent, o) => {
  const Rx = o.Rx || 230, Ry = o.Ry || 170, PX = o.PX || 188, NR = o.NR || 96, G = mk(parent, 'g', {}), W = mk(G, 'g', {});
  const E = { body: mk(W, 'path', { fill: CYF, stroke: o.plant ? WLS : C.ink, 'stroke-width': o.plant ? 0 : 3.5, 'stroke-linejoin': 'round' }), body2: mk(W, 'path', { fill: CYF, stroke: C.ink, 'stroke-width': 3.5 }) };
  if (o.plant) { E.wall = mk(W, 'rect', { x: -Rx, y: -Ry, width: 2 * Rx, height: 2 * Ry, rx: 18, fill: 'none', stroke: WLF, 'stroke-width': 14 }); E.wallE = mk(W, 'rect', { x: -Rx - 7, y: -Ry - 7, width: 2 * Rx + 14, height: 2 * Ry + 14, rx: 22, fill: 'none', stroke: WLS, 'stroke-width': 3 }); E.wallI = mk(W, 'rect', { x: -Rx + 7, y: -Ry + 7, width: 2 * Rx - 14, height: 2 * Ry - 14, rx: 12, fill: 'none', stroke: WLS, 'stroke-width': 2 }); }
  E.mito = (o.mito === 0 ? [] : [[-158, -96, 20], [150, 104, -24], [-150, 104, 30], [160, -92, -18]]).map(([x, y, a]) => { const g = mk(W, 'g', {}); mk(g, 'rect', { x: -22, y: -11, width: 44, height: 22, rx: 11, fill: MIF, stroke: MIS, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-12,-6 L-6,6 L0,-6 L6,6 L12,-6', fill: 'none', stroke: MIS, 'stroke-width': 1.8 }); g.p = [x, y, a]; return g; });
  E.er = mk(W, 'path', { d: 'M-196,-30 C-180,-46 -170,-14 -156,-30 C-142,-46 -132,-14 -118,-30 M-196,-6 C-180,-22 -170,10 -156,-6 C-142,-22 -132,10 -118,-6 M-196,18 C-180,2 -170,34 -156,18 C-142,2 -132,34 -118,18', fill: 'none', stroke: ERC, 'stroke-width': 4, 'stroke-linecap': 'round' });
  E.go = mk(W, 'path', { d: 'M128,-34 Q154,-44 180,-34 M124,-18 Q154,-30 184,-18 M128,-2 Q154,-14 180,-2 M134,14 Q154,4 174,14', fill: 'none', stroke: GOC, 'stroke-width': 5, 'stroke-linecap': 'round' });
  E.nuc = mk(W, 'circle', { cx: 0, cy: 0, r: NR, fill: NUF, stroke: VIO, 'stroke-width': 3.5 });
  E.nl = mk(W, 'circle', { cx: 36, cy: -38, r: 17, fill: '#5B3470' });
  E.d2 = [-1, 1].map(s => mk(W, 'circle', { cx: s * (PX - 34), cy: 0, r: 64, fill: NUF, stroke: VIO, 'stroke-width': 3 }));
  E.d2n = [-1, 1].map(s => mk(W, 'circle', { cx: s * (PX - 34) + 22, cy: -24, r: 11, fill: '#5B3470' }));
  E.pl = mk(W, 'path', { d: `M0,${-Ry + 24} L0,${Ry - 24}`, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  E.spF = [0, 1, 2, 3, 4].map(k => mk(W, 'path', { d: '', fill: 'none', stroke: SPN, 'stroke-width': 1.6 }));
  E.fib = o.CH.map(() => mk(W, 'path', { d: '', stroke: SPN, 'stroke-width': 2.2, fill: 'none' }));
  E.sc = mk(W, 'g', {}); E.nod = mk(W, 'g', {});
  E.ch = o.CH.map(() => ({ a: mk(W, 'path', { d: '', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), b: mk(W, 'path', { d: '', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), k: mk(W, 'circle', { r: 4.5, fill: C.ink }) }));
  E.cs = [0, 1].map(() => { const g = mk(W, 'g', {}); const as = mk(g, 'path', { d: [0, 45, 90, 135, 180, 225, 270, 315].map(a => `M${(13 * Math.cos(a * RAD)).toFixed(1)},${(13 * Math.sin(a * RAD)).toFixed(1)} L${(30 * Math.cos(a * RAD)).toFixed(1)},${(30 * Math.sin(a * RAD)).toFixed(1)}`).join(' '), stroke: SPN, 'stroke-width': 2.4, 'stroke-linecap': 'round' });
    mk(g, 'rect', { x: -9, y: -3.5, width: 18, height: 7, rx: 3, fill: SPN }); mk(g, 'rect', { x: -3.5, y: -9, width: 7, height: 18, rx: 3, fill: SPN }); g.as = as; return g; });
  E.plt = mk(W, 'path', { d: '', stroke: WLS, 'stroke-width': 6, 'stroke-linecap': 'round' }); E.plF = mk(W, 'path', { d: '', stroke: WLF, 'stroke-width': 10, 'stroke-linecap': 'round' });
  E.ves = [0, 1, 2, 3, 4, 5].map(() => mk(W, 'circle', { r: 5, fill: WLF, stroke: WLS, 'stroke-width': 1.5 }));
  W.insertBefore(E.plF, E.plt);
  const lobe = (fur, apart, side) => { const p = []; const a0 = side ? (side > 0 ? -90 : 90) : 0, n = side ? 48 : 96, span = side ? 180 : 360;
    for (let k = 0; k <= n; k++) { const th = (a0 + span * k / n) * RAD, c = Math.cos(th), x = Rx * c * (1 + 0.16 * fur) + (side || 0) * 30 * apart, y = Ry * Math.sin(th) * (1 - fur * 0.985 * Math.exp(-c * c / 0.12));
      p.push(`${x.toFixed(1)},${y.toFixed(1)}`); } return 'M' + p.join(' L') + 'Z'; };
  return {
    G, W, E,
    set(st, t) {
      const s = Object.assign({}, S0, st), sc = (o.s || 1) * (1 + 0.1 * s.grow);
      attr(W, 'transform', `translate(${o.x} ${o.y}) scale(${sc.toFixed(4)})`);
      const sh = x => (s.apart > 0 ? Math.sign(x) * 30 * s.apart : 0) * (o.plant ? 0 : 1);
      if (o.plant) { attr(E.body, 'd', `M${-Rx},${-Ry}h${2 * Rx}v${2 * Ry}h${-2 * Rx}Z`); M.hide(E.body2, true);
        const h = (2 * Ry - 16) * s.plate; attr(E.plt, 'd', s.plate > 0.01 ? `M0,${(-h / 2).toFixed(1)} L0,${(h / 2).toFixed(1)}` : ''); attr(E.plF, 'd', s.plate > 0.01 ? `M0,${(-h / 2).toFixed(1)} L0,${(h / 2).toFixed(1)}` : '');
        E.ves.forEach((v, i) => { const sg = i % 2 ? 1 : -1, yy = sg * (h / 2 + 10 + (i >> 1) * 14); attr(v, 'cx', ((i >> 1) % 2 ? 6 : -6)); attr(v, 'cy', yy.toFixed(1)); v.style.opacity = (s.plate > 0.01 && s.plate < 0.98 ? 1 : 0); }); }
      else if (s.apart > 0.001) { const ex = (sd) => { const cx = sd * (Rx * 0.58 + 30 * s.apart), rx = Rx * 0.58, ry = Ry * (0.84 + 0.08 * s.apart); return `M${(cx - rx).toFixed(1)},0 a${rx.toFixed(1)},${ry.toFixed(1)} 0 1 0 ${(2 * rx).toFixed(1)},0 a${rx.toFixed(1)},${ry.toFixed(1)} 0 1 0 ${(-2 * rx).toFixed(1)},0Z`; }; attr(E.body, 'd', ex(-1)); attr(E.body2, 'd', ex(1)); M.hide(E.body2, false); }
      else { attr(E.body, 'd', lobe(s.fur, 0, 0)); M.hide(E.body2, true); }
      E.mito.forEach(g => { const [x, y, a] = g.p; attr(g, 'transform', `translate(${(x + sh(x)).toFixed(1)} ${y}) rotate(${a + 8 * Math.sin(t * 0.8 + x)})`); });
      E.er.style.opacity = s.org; E.go.style.opacity = s.org;
      E.nuc.style.opacity = s.env; attr(E.nuc, 'stroke-dasharray', s.env > 0.02 && s.env < 0.98 ? `12 ${(16 * (1 - s.env)).toFixed(1)}` : 'none'); E.nl.style.opacity = s.nuc;
      E.d2.forEach((d, i) => { d.style.opacity = s.env2; attr(d, 'cx', ((i ? 1 : -1) * (PX - 34) + sh(i ? 1 : -1)).toFixed(1)); }); E.d2n.forEach((d, i) => { d.style.opacity = s.env2 * (s.nl2 ?? 1); attr(d, 'cx', ((i ? 1 : -1) * (PX - 34) + 22 + sh(i ? 1 : -1)).toFixed(1)); });
      E.pl.style.opacity = s.pl;
      const cA = [-26 + (-PX + 26) * s.sp, -NR - 26 + (NR + 26) * s.sp], cB = [26 + (PX - 26) * s.sp, -NR - 26 + (NR + 26) * s.sp];
      if (s.cen2 < 1) { cB[0] = cA[0] + (cB[0] - cA[0]) * s.cen2; cB[1] = cA[1]; }
      E.cs.forEach((g, i) => { const p = i ? cB : cA; attr(g, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`); g.as.style.opacity = s.ast; g.style.opacity = i ? Math.min(1, s.cen2 * 3) : 1; });
      E.spF.forEach((f, k) => { const bow = (k - 2) * 46; attr(f, 'd', `M${cA[0].toFixed(1)},${cA[1].toFixed(1)} Q0,${bow} ${cB[0].toFixed(1)},${cB[1].toFixed(1)}`); f.style.opacity = s.fib * 0.55; });
      s.c.forEach((c, i) => { const [x, y, a, bx, by, v] = c, D = o.CH[i], e = E.ch[i], L = D.L * (1 + 0.75 * (1 - s.cond)), amp = 6 * (1 - s.cond), w = 3.2 + 9.5 * s.cond, ph = t * 1.4 + i * 1.7, k = D.k || 0.62;
        attr(e.a, 'd', chPts(x + sh(x), y, a, bx, by, L, amp, ph, 0, k)); attr(e.b, 'd', chPts(x + sh(x), y, a, bx, by, L, amp, ph, k, 1));
        attr(e.a, 'stroke', D.c); attr(e.b, 'stroke', D.c2 ? mix(D.c, D.c2, s.xo) : D.c); attr(e.a, 'stroke-width', w.toFixed(2)); attr(e.b, 'stroke-width', w.toFixed(2));
        attr(e.k, 'cx', (x + sh(x) + bx).toFixed(1)); attr(e.k, 'cy', (y + by).toFixed(1)); e.k.style.opacity = (v * s.cond).toFixed(3); e.a.style.opacity = e.b.style.opacity = v.toFixed(3);
        const pole = D.pole || (i % 2 ? -1 : 1), pp = pole > 0 ? cB : cA; attr(E.fib[i], 'd', `M${pp[0].toFixed(1)},${pp[1].toFixed(1)} L${(x + sh(x) + bx).toFixed(1)},${(y + by).toFixed(1)}`); E.fib[i].style.opacity = (s.fib * v).toFixed(3); });
      E.sc.style.opacity = s.sc; E.nod.style.opacity = s.nod;
      return s;
    }
  };
};

/* ===== Ep 78: Meiosis I ===== */
Object.assign(M.IC, {
  sis: [ci(8, 8, 3), ci(16, 8, 3), 'M3 20c0-4 2-7 5-7s5 3 5 7M11 20c0-4 2-7 5-7s5 3 5 7'],
  cards: ['M7 4h10v16H7Z', 'M4 7l3-1M20 7l-3-1', 'M10 9l4 6M14 9l-4 6'],
  pollen: [ci(12, 12, 7), 'M9 10h.01M15 10h.01M12 15h.01M9 14h.01M15 14h.01'],
  walk: ['M4 18h4v-4h4v-4h4V6h4'],
  five: ['M5 5v14M9 5v14M13 5v14M17 5v14', 'M3 16L21 8'],
  pro: ['M8 5c2 4-2 6 0 10s-2 4 0 4', 'M14 5c2 4-2 6 0 10s-2 4 0 4'],
  pair: ['M8 4v16M11 4v16M14 4v16M17 4v16'],
  swap: ['M5 7h12l-3-3M19 17H7l3 3'],
  xx: ['M6 4l12 16M18 4L6 20'],
  ends: ['M4 12h6M14 12h6', 'M8 8l-4 4 4 4M16 8l4 4-4 4'],
  line: ['M12 3v18', 'M8 7h8M8 12h8M8 17h8'],
  ana: ['M4 12h4M16 12h4', 'M10 8l-3 4 3 4M14 8l3 4-3 4'],
  tel: [ci(6, 12, 4), ci(18, 12, 4), 'M12 6v12'],
});
const sv = id => $('#' + id), rad = a => a * Math.PI / 180;
const SKIN = '#F2C9A8', SKS = '#B9825E', HAIR = '#3B2A22', FIL = '#C9A877';
// chromatids: [A inner, A outer, A' outer, A' inner, B inner, B outer, B' outer, B' inner]
const CHT = [{ L: 100, c: VIO, c2: LIL, pole: -1 }, { L: 100, c: VIO, pole: -1 }, { L: 100, c: LIL, pole: 1 }, { L: 100, c: LIL, c2: VIO, pole: 1 },
  { L: 62, c: VIO, c2: LIL, pole: -1 }, { L: 62, c: VIO, pole: -1 }, { L: 62, c: LIL, pole: 1 }, { L: 62, c: LIL, c2: VIO, pole: 1 }];
// a bivalent: two homologues (h = half gap, o = sister gap, hb = homologue bow toward the partner)
const biv = (px, py, h, o = 5, hb = 0) => [...sis(px - h, py, 90, o).map(c => (c[3] += hb, c)), ...sis(px + h, py, 90, o).map(c => (c[3] -= hb, c))];
const homo = (x, y, a, o = 4) => sis(x, y, a, o);
const PA = [-45, -6], PB = [48, 8];
const lay = { LEP: [...homo(-52, -30, 70, 3), ...homo(36, 40, 122, 3), ...homo(-22, 52, 18, 3), ...homo(48, -42, 150, 3)].map((c, i, a) => a[[0, 1, 2, 3, 4, 5, 6, 7][i]]),
  ZYG: [...biv(...PA, 13, 4), ...biv(...PB, 13, 4)], PACH: [...biv(...PA, 12, 5), ...biv(...PB, 12, 5)], DIP: [...biv(...PA, 26, 6, 15), ...biv(...PB, 24, 6, 13)],
  DIA: [...biv(...PA, 14, 6, -16), ...biv(...PB, 13, 6, -14)], MET1: [...biv(0, -64, 22, 6, -4), ...biv(0, 74, 22, 6, -4)],
  ANA1: [...sis(-104, -40, 90, 6).map(c => (c[3] -= 12, c)), ...sis(104, -40, 90, 6).map(c => (c[3] += 12, c)), ...sis(-104, 46, 90, 6).map(c => (c[3] -= 12, c)), ...sis(104, 46, 90, 6).map(c => (c[3] += 12, c))],
  TEL1: [...sis(-150, -22, 90, 6), ...sis(150, -22, 90, 6), ...sis(-150, 28, 90, 6), ...sis(150, 28, 90, 6)] };
// leptotene order must match CHT: A (two sisters), A' (two), B, B'
lay.LEP = [...homo(-52, -30, 70, 3), ...homo(36, 40, 122, 3), ...homo(-22, 52, 18, 3), ...homo(48, -42, 150, 3)];
const still = (host, x, y, s, st) => { const c = cellSim(host, { x, y, s, CH: CHT }); c.st = Object.assign({}, S0, st); return c; };

/* ---------- H: two cousins ---------- */
const hl = sv('hlS'), HL = {};
const kid = (g, x, y, curly) => { mk(g, 'circle', { cx: x, cy: y, r: 56, fill: SKIN, stroke: SKS, 'stroke-width': 3 }); mk(g, 'path', { d: `M${x - 50},${y + 92} C${x - 50},${y + 60} ${x - 26},${y + 50} ${x},${y + 50} C${x + 26},${y + 50} ${x + 50},${y + 60} ${x + 50},${y + 92} Z`, fill: '#9FB8D9', stroke: BR, 'stroke-width': 2.5 });
  if (curly) for (let k = 0; k < 11; k++) { const a = Math.PI * (1.05 + k * 0.09); mk(g, 'circle', { cx: x + 54 * Math.cos(a), cy: y + 54 * Math.sin(a), r: 15, fill: HAIR }); }
  else mk(g, 'path', { d: `M${x - 58},${y + 20} C${x - 62},${y - 50} ${x - 30},${y - 62} ${x},${y - 62} C${x + 30},${y - 62} ${x + 62},${y - 50} ${x + 58},${y + 20} L${x + 46},${y - 10} C${x + 20},${y - 30} ${x - 20},${y - 30} ${x - 46},${y - 10} Z`, fill: HAIR }); };
HL.par = mk(hl, 'g', {}); [[300, 'MOTHER'], [484, 'FATHER']].forEach(([x, n]) => { mk(HL.par, 'circle', { cx: x, cy: 110, r: 34, fill: C.soft, stroke: C.dim, 'stroke-width': 3 }); txt(HL.par, x, 168, n, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); });
HL.ln = mk(hl, 'path', { d: 'M334,110 L450,110 M392,110 L392,190 L210,190 L210,214 M392,190 L574,190 L574,214', stroke: C.dim, 'stroke-width': 3, fill: 'none' });
HL.k = [mk(hl, 'g', {}), mk(hl, 'g', {})]; kid(HL.k[0], 210, 290, true); kid(HL.k[1], 574, 290, false);

/* ---------- D: why halve + two divisions ---------- */
const dl = sv('dlS'), DL = {};
const eqRow = (y, L, V, ok) => { const g = mk(dl, 'g', {}); mk(g, 'rect', { x: 36, y, width: 712, height: 116, rx: 14, fill: ok === 2 ? '#E2F3E9' : C.soft });
  [60, 300, 540].forEach((x, i) => { txt(g, x, y + 34, L[i], { 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); txt(g, x, y + 90, V[i], { 'font-size': 46, 'font-weight': 600, fill: i === 2 ? (ok === 2 ? C.ok : ok === 1 ? C.red : VIO) : (i ? LIL : VIO) }); });
  txt(g, 230, y + 88, '+', { 'font-size': 40, fill: C.ink, 'font-weight': 600 }); txt(g, 470, y + 88, '=', { 'font-size': 40, fill: C.ink, 'font-weight': 600 }); return g; };
DL.r0 = eqRow(80, ['FROM MOTHER', 'FROM FATHER', 'BODY CELL'], ['n', 'n', '2n'], 0);
DL.r1 = eqRow(214, ['SPERM', 'EGG', 'BABY'], ['2n', '2n', '4n'], 1); DL.x = mk(dl, 'path', { d: 'M520,250 L700,310', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
DL.r2 = eqRow(348, ['SPERM', 'EGG', 'BABY'], ['n', 'n', '2n'], 2);
const dr = sv('drS'), DR = {};
const dot = (g, x, y, r) => { mk(g, 'circle', { cx: x, cy: y, r, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: r * 0.4, fill: NUF, stroke: VIO, 'stroke-width': 2 }); };
DR.s = [mk(dr, 'g', {}), mk(dr, 'g', {}), mk(dr, 'g', {})]; dot(DR.s[0], 110, 270, 56); [-1, 1].forEach(s => dot(DR.s[1], 360, 270 + s * 76, 44)); [-3, -1, 1, 3].forEach(s => dot(DR.s[2], 620, 270 + s * 56, 34));
DR.ar = [[180, 288], [420, 548]].map(([x1, x2]) => mk(dr, 'path', { d: `M${x1},270 L${x2},270 M${x2 - 12},258 L${x2},270 L${x2 - 12},282`, stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
DR.t = [[234, 'MEIOSIS I'], [484, 'MEIOSIS II']].map(([x, n]) => txt(dr, x, 246, n, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, fill: C.ink, 'font-weight': 600 }));
DR.h = mk(dr, 'g', {}); mk(DR.h, 'rect', { x: 166, y: 300, width: 136, height: 36, rx: 8, fill: '#FBF3DD' }); txt(DR.h, 234, 324, 'HALVED HERE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, fill: GOLD, 'font-weight': 600 });
DR.c = txt(dr, 110, 360, 'DNA COPIED ONCE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, fill: VIO, 'font-weight': 600 });

/* ---------- Z: zoom ladder FLOWER -> ANTHER -> NUCLEUS -> HOMOLOGOUS PAIR ---------- */
const ZN = ['FLOWER', 'ANTHER', 'NUCLEUS', 'HOMOLOGOUS PAIR'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Flower', 'Pollen is made inside the anther.', ''],
  ['RUNG 2 OF 4', 'Anther', 'Pollen mother cells divide by meiosis.', ''],
  ['RUNG 3 OF 4', 'Nucleus', 'DNA already copied: two sister chromatids each.', ''],
  ['RUNG 4 OF 4', 'Homologous pair', 'Look-alike pair, one from each parent.', 'Homo = same']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'path', { d: 'M528,526 L528,330', stroke: '#4E7A34', 'stroke-width': 10 });
  for (let k = 0; k < 5; k++) { const a = -90 + k * 72; mk(g, 'ellipse', { cx: 528 + 92 * Math.cos(rad(a)), cy: 250 + 92 * Math.sin(rad(a)), rx: 78, ry: 52, transform: `rotate(${a} ${528 + 92 * Math.cos(rad(a))} ${250 + 92 * Math.sin(rad(a))})`, fill: PET, stroke: BR, 'stroke-width': 3 }); }
  for (let k = 0; k < 6; k++) { const a = -90 + k * 60, x = 528 + 46 * Math.cos(rad(a)), y = 250 + 46 * Math.sin(rad(a)); mk(g, 'path', { d: `M528,250 L${x},${y}`, stroke: FIL, 'stroke-width': 4 }); mk(g, 'ellipse', { cx: x, cy: y, rx: 10, ry: 15, fill: ANTH, stroke: BR, 'stroke-width': 2.5, transform: `rotate(${a + 90} ${x} ${y})` }); }
  mk(g, 'circle', { cx: 528, cy: 250, r: 14, fill: '#9FCB7A', stroke: BR, 'stroke-width': 2.5 });
  LB[0] = [lab(g, 640, 300, 780, 380, 'Flower', 'start', null, 24), lab(g, 528, 204, 700, 90, 'Anther', 'start', null, 24)]; }
{ const g = ZG[1]; mk(g, 'path', { d: 'M528,40 C640,40 700,120 690,263 C700,406 640,486 528,486 C416,486 356,406 366,263 C356,120 416,40 528,40 Z', fill: ANTH, stroke: BR, 'stroke-width': 4 });
  [[440, 160], [616, 160], [440, 366], [616, 366]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 74, fill: '#F7E7B5', stroke: BR, 'stroke-width': 3 });
    for (let k = 0; k < 7; k++) { const a = k * 51, r = k ? 40 : 0; mk(g, 'circle', { cx: x + r * Math.cos(rad(a)), cy: y + r * Math.sin(rad(a)), r: 17, fill: CYF, stroke: C.ink, 'stroke-width': 2 }); mk(g, 'circle', { cx: x + r * Math.cos(rad(a)), cy: y + r * Math.sin(rad(a)), r: 7, fill: NUF, stroke: VIO, 'stroke-width': 1.5 }); } });
  LB[1] = [lab(g, 440, 160, 250, 70, 'Pollen mother cell', 'end', null, 22)]; }
ZG.cell = still(ZG[2], 528, 263, 1.35, { cond: 0.75, env: 1, nuc: 1, org: 0.6, c: lay.LEP }); LB[2] = [lab(ZG[2], 528 + (-52) * 1.35 + 10, 263 + (-30) * 1.35 - 30, 250, 60, 'Sister chromatids', 'end', null, 22)];
{ const g = ZG[3]; [[440, VIO], [616, LIL]].forEach(([x, c]) => { mk(g, 'path', { d: `M${x - 26},80 Q${x - 4},263 ${x - 26},446 M${x + 26},80 Q${x + 4},263 ${x + 26},446`, stroke: c, 'stroke-width': 40, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: x, cy: 263, r: 12, fill: C.ink }); });
  LB[3] = [lab(g, 400, 140, 230, 80, 'From mother', 'end', null, 24), lab(g, 656, 140, 820, 80, 'From father', 'start', null, 24), lab(g, 528, 420, 528, 450, 'Homologous chromosomes', 'middle', null, 24)]; }
const FOC = [[528, 204, 40], [440, 160, 60], [528, 263, 70], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'flower'), wt('Z2', 'anther')], [wt('Z3', 'pollen')], [wt('Z4', 'sister')], [wt('Z5', 'parent') - 0.4, wt('Z5', 'parent'), wt('Z5', 'homologous')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'One set from each parent!' });

/* ---------- P: the five parts of prophase I ---------- */
const PN = ['LEPTOTENE', 'ZYGOTENE', 'PACHYTENE', 'DIPLOTENE', 'DIAKINESIS'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['PROPHASE I · 2n = 4', 'Five parts', 'Violet set: from mother. Lilac set: from father.', ''], ['PART 1 OF 5', 'Leptotene', 'Chromosomes become visible and keep condensing.', ''],
  ['PART 2 OF 5', 'Zygotene', 'Homologues pair up: synapsis.', 'Bivalent = tetrad: 4 chromatids'], ['PART 3 OF 5', 'Pachytene', 'Non-sister chromatids swap pieces: crossing over.', 'Enzyme: recombinase'],
  ['PART 4 OF 5', 'Diplotene', 'Complex dissolves. Pairs part, except at chiasmata.', 'Chiasmata: X-shaped points'], ['PART 5 OF 5', 'Diakinesis', 'Chiasmata slide to the ends: terminalisation.', 'Spindle forms · nucleolus, envelope gone']]);
const ps = sv('pS'), PP = {}, Q = 1.55, CX = 528, CY = 276, sp = (x, y) => [CX + x * Q, CY + y * Q];
const BIG = a => a.map(c => [c[0] * Q, c[1] * Q, c[2], c[3] * Q, c[4] * Q, c[5]]), CHB = CHT.map(d => Object.assign({}, d, { L: d.L * Q }));
PP.cell = cellSim(ps, { x: CX, y: CY, s: 1, Rx: 310, Ry: 212, NR: 172, PX: 268, CH: CHB, mito: 0 });
{ const W = PP.cell.E.sc; [[PA, 62], [PB, 38]].forEach(([[x0, y0], h0]) => { const x = x0 * Q, y = y0 * Q, h = h0 * Q; mk(W, 'path', { d: `M${x - 4},${y - h} L${x - 4},${y + h} M${x + 4},${y - h} L${x + 4},${y + h}`, stroke: '#2E9E5B', 'stroke-width': 2.2 });
    for (let yy = y - h + 6; yy < y + h; yy += 9) mk(W, 'path', { d: `M${x - 4},${yy} L${x + 4},${yy}`, stroke: '#2E9E5B', 'stroke-width': 2 }); });
  const N = PP.cell.E.nod; [[PA[0] * Q, (PA[1] + 27) * Q], [PB[0] * Q, (PB[1] + 17) * Q]].forEach(([x, y]) => mk(N, 'circle', { cx: x, cy: y, r: 10, fill: NODC, stroke: BR, 'stroke-width': 2 })); }
PP.L = [lab(ps, ...sp(PA[0] + 4, -44), 600, 26, 'Synaptonemal complex', 'start', null, 22), lab(ps, ...sp(PA[0], PA[1] + 27), 700, 470, 'Recombination nodule', 'start', null, 22), lab(ps, ...sp(PB[0], PB[1] + 4), 860, 120, 'Chiasma', 'start', null, 22)];
const tSw = wt('P4', 'swap');
const KF = [Object.assign({}, S0, { cond: 0.15, sp: 0, cen2: 1, org: 0, c: BIG(lay.LEP) }), { t: tPs[0] + 0.2, d: 2.4, cond: 0.45 },
  { t: wt('P3', 'pair') - 0.3, d: 2.2, c: BIG(lay.ZYG), cond: 0.55 }, { t: wt('P3', 'synaptonemal') - 0.3, d: 0.8, sc: 1 },
  { t: tPs[2] + 0.1, d: 1.2, c: BIG(lay.PACH), cond: 0.85 }, { t: wt('P4', 'nodules') - 0.4, d: 0.6, nod: 1 }, { t: tSw, d: 1.4, xo: 1 },
  { t: tPs[3] + 0.2, d: 0.8, sc: 0, nod: 0 }, { t: wt('P5', 'separate') - 0.3, d: 1.6, c: BIG(lay.DIP), cond: 0.95 },
  { t: tPs[4] + 0.2, d: 2.2, c: BIG(lay.DIA), cond: 1 }, { t: wt('P6', 'spindle') - 0.2, d: 1.4, sp: 1, ast: 1 }, { t: wt('P6', 'nucleolus') - 0.2, d: 0.6, nuc: 0, org: 0 }, { t: wt('P6', 'envelope') - 0.2, d: 0.8, env: 0 }];

/* ---------- C: metaphase I to telophase I ---------- */
const cl = sv('clS'), CL = {};
CL.cell = cellSim(cl, { x: 392, y: 300, s: 1.04, CH: CHT });
const tCs = ['C2', 'C3', 'C4', 'C5'].map(T0);
const KC = [Object.assign({}, S0, { cond: 1, sp: 1, ast: 1, env: 0, nuc: 0, org: 0, xo: 1, nl2: 0, c: lay.DIA }), { t: tCs[0] + 0.1, d: 1.6, c: lay.MET1 }, { t: wt('C2', 'Fibres') - 0.2, d: 0.8, fib: 1, pl: 1 },
  { t: wt('C3', 'separate') - 0.2, d: 2.2, c: lay.ANA1, pl: 0 }, { t: tCs[2] + 0.1, d: 1, c: lay.TEL1, fib: 0, ast: 0 }, { t: wt('C4', 'membrane') - 0.2, d: 1, env2: 1, cond: 0.45 }, { t: wt('C4', 'nucleolus') - 0.2, d: 0.6, nl2: 1 },
  { t: wt('C4', 'cytoplasm') - 0.1, d: 1.2, fur: 1 }, { t: wt('C4', 'dyad') - 0.3, d: 0.8, apart: 1 }];
const tStage = [tCs[0], tCs[1], tCs[2], tCs[3]], STN = ['METAPHASE I', 'ANAPHASE I', 'TELOPHASE I', 'INTERKINESIS'];
const cr = sv('crS'), CR = {};
const xch = (g, x, y, L, c1, c2) => { mk(g, 'path', { d: `M${x - 6},${y - L / 2} Q${x},${y} ${x - 6},${y + L / 2} M${x + 6},${y - L / 2} Q${x},${y} ${x + 6},${y + L / 2}`, stroke: c1, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); if (c2) mk(g, 'path', { d: `M${x + 6},${y + L * 0.12} Q${x + 2},${y + L * 0.3} ${x + 6},${y + L / 2}`, stroke: c2, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); };
CR.a = mk(cr, 'g', {}); mk(CR.a, 'circle', { cx: 170, cy: 250, r: 110, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); xch(CR.a, 120, 250, 70, VIO, LIL); xch(CR.a, 155, 250, 70, LIL, VIO); xch(CR.a, 190, 250, 44, VIO, LIL); xch(CR.a, 222, 250, 44, LIL, VIO);
txt(CR.a, 170, 400, '2n = 4', { 'text-anchor': 'middle', 'font-size': 36, 'font-weight': 600, fill: VIO });
CR.ar = mk(cr, 'path', { d: 'M300,250 L370,250 M358,238 L370,250 L358,262', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
CR.b = mk(cr, 'g', {}); [[530, 150, [VIO, LIL], [VIO, LIL]], [530, 350, [LIL, VIO], [LIL, VIO]]].forEach(([x, y, p, q]) => { mk(CR.b, 'circle', { cx: x, cy: y, r: 82, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); xch(CR.b, x - 20, y, 62, p[0], p[1]); xch(CR.b, x + 22, y, 40, q[0], q[1]);
  txt(CR.b, x + 104, y + 12, 'n = 2', { 'font-size': 30, 'font-weight': 600, fill: VIO }); });
CR.ik = mk(cr, 'g', {}); mk(CR.ik, 'rect', { x: 36, y: 456, width: 712, height: 58, rx: 12, fill: '#FBF3DD' }); txt(CR.ik, 392, 494, 'INTERKINESIS · NO DNA COPYING', { 'text-anchor': 'middle', 'font-size': 22, 'letter-spacing': 1.6, fill: GOLD, 'font-weight': 600 });

/* ---------- V: anaphase of mitosis vs anaphase I ---------- */
const vAna = (s, pairs) => { [-1, 1].forEach(k => { const x = 65 + k * 34; if (pairs) mk(s, 'path', { d: `M${x - 5},20 Q${x + k * 6},50 ${x - 5},80 M${x + 5},20 Q${x + k * 6},50 ${x + 5},80`, stroke: k < 0 ? VIO : LIL, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  else mk(s, 'path', { d: `M${x - k * 10},20 Q${x + k * 8},50 ${x - k * 10},80`, stroke: VIO, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); }); };
const cV = cmp($('#vc'), ['MITOSIS · ANAPHASE', 'MEIOSIS I · ANAPHASE I'], [
  ['', 'Separates', 'Sister chromatids', 'Homologous chromosomes', wt('V1', 'sister'), wt('V1', 'homologous'), s => vAna(s, false), s => vAna(s, true)],
  ['', 'Centromeres', 'Split', 'Do not split · sisters stay joined', wt('V2', 'split'), wt('V2', 'not'), s => { mk(s, 'circle', { cx: 50, cy: 50, r: 7, fill: C.ink }); mk(s, 'circle', { cx: 80, cy: 50, r: 7, fill: C.ink }); }, s => mk(s, 'circle', { cx: 65, cy: 50, r: 9, fill: C.ink })],
  ['', 'Result', '2n stays 2n', '2n becomes n · reductional', wt('V3', 'keeps'), wt('V3', 'halves'), s => txt(s, 65, 62, '2n', { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: VIO }), s => txt(s, 65, 62, 'n', { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: VIO })]], 'v');
const th1 = PUC.think($('#th1'), { q: 'You see homologous chromosomes pairing up, and a synaptonemal complex forming between them. Which part of prophase I?', opts: ['Leptotene', 'Zygotene', 'Pachytene'], right: 1, why: 'Zygotene. The pairing, called synapsis, happens in zygotene.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['PROPHASE I · FIVE PARTS', 'background:var(--ac2);color:#1F6B3F'], ['METAPHASE I TO TELOPHASE I', 'background:var(--ink);color:#fff']], [
  ['pair', 'Synaptonemal complex forms', '<b>Zygotene</b>', 0, 0, wt('W2', 'Prophase')], ['ana', 'Homologues to opposite poles', '<b>Anaphase I</b>', 1, 0, wt('W3', 'After')],
  ['swap', 'Crossing over', '<b>Pachytene</b>', 0, 1, wt('W4', 'Prophase')], ['line', 'Bivalents line up at the equator', '<b>Metaphase I</b>', 1, 1, wt('W5', 'After')],
  ['ends', 'Terminalisation of chiasmata', '<b>Diakinesis</b>', 0, 2, wt('W6', 'Prophase')], ['tel', 'A dyad of cells forms', '<b>Telophase I</b>', 1, 2, wt('W7', 'After')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ [[70, VIO, 1], [104, LIL, -1]].forEach(([x, c]) => mk(TP, 'path', { d: `M${x},50 L${x},200`, stroke: c, 'stroke-width': 14, 'stroke-linecap': 'round' })); mk(TP, 'circle', { cx: 87, cy: 150, r: 9, fill: NODC, stroke: BR, 'stroke-width': 2 });
  txt(TP, 87, 236, 'PACHYTENE · SWAP', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 });
  mk(TP, 'path', { d: 'M170,125 L220,125 M208,113 L220,125 L208,137', stroke: C.ink, 'stroke-width': 3, fill: 'none' });
  mk(TP, 'path', { d: 'M272,50 Q312,150 272,200', stroke: VIO, 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' }); mk(TP, 'path', { d: 'M352,50 Q312,150 352,200', stroke: LIL, 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' });
  txt(TP, 312, 236, 'DIPLOTENE · X SEEN', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); }

const EP = {
  jobs: [['sis', 'Two sisters', 'NOT ALIKE', 'sisters'], ['cards', 'A shuffled pack', 'A NEW ORDER', 'shuffled'], ['pollen', 'A pollen grain', 'HALF A SET', 'pollen']],
  learn: [['walk', 'Stage by stage', 'stage'], ['five', 'Five parts', 'five'], ['pro', 'Prophase I', 'prophase']],
  hookW: 'doctor', split: ['halves', 'shuffles'], st: ['Pairing', 'diplotene'],
  cam: [],
  hook: t => { M.vis(HL.par, t, wt('H2', 'mother') - 0.2, 1e9, { dy: 16 }); M.draw(HL.ln, t, wt('H2', 'father'), 0.6); M.vis(HL.k[0], t, wt('H2', 'curly') - 0.2, 1e9, { ...POP, sc: 0.6 });
    M.vis($('#hlt0'), t, wt('H2', 'curly'), 1e9, POP); M.vis(HL.k[1], t, wt('H2', 'straight') - 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis($('#hlt1'), t, wt('H2', 'straight'), 1e9, POP); M.vis($('#hlP'), t, T0('H3') + 0.4, 1e9, POP); },
  measure: () => { [['hlt0', 210, 404], ['hlt1', 574, 404]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.r0, t, wt('D2', 'two') - 0.2, 1e9, { dy: 16 }); M.vis(DL.r1, t, wt('D3', 'sperm') - 0.2, 1e9, { dy: 16 }); M.draw(DL.x, t, wt('D3', 'four') + 0.2, 0.4);
      M.vis(DL.r2, t, wt('D3', 'only') - 0.2, 1e9, { dy: 16 }); M.vis($('#dlP'), t, wt('D3', 'only') + 0.4, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.s[0], t, T0('D4') + 0.1, 1e9, { ...POP, sc: 0.6 }); M.draw(DR.ar[0], t, wt('D4', 'one') - 0.2, 0.4); M.vis(DR.t[0], t, wt('D4', 'one'), 1e9, POP);
      M.vis(DR.s[1], t, wt('D4', 'one') + 0.2, 1e9, { ...POP, sc: 0.6 }); M.draw(DR.ar[1], t, wt('D4', 'two', 1) - 0.2, 0.4); M.vis(DR.t[1], t, wt('D4', 'two', 1), 1e9, POP); M.vis(DR.s[2], t, wt('D4', 'two', 1) + 0.2, 1e9, { ...POP, sc: 0.6 });
      M.vis(DR.c, t, wt('D4', 'once') - 0.2, 1e9, POP); M.vis(DR.h, t, wt('D4', 'halved') - 0.2, 1e9, POP); M.vis($('#drP'), t, wt('D4', 'halved'), 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] }); ZG.cell.set(ZG.cell.st, t); avZ(t, wt('Z5', 'parent') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PP.cell.G, t, T0('P1') + 0.3, 1e9, { ...POP, sc: 0.8 }); PP.cell.set(kfRun(KF, t), t);
      labRun(PP.L[0], t, wt('P3', 'synaptonemal') + 0.3, tPs[2] + 0.4); labRun(PP.L[1], t, wt('P4', 'nodules'), tPs[3] + 0.4); labRun(PP.L[2], t, wt('P5', 'chiasmata'), tPs[4] + 0.6); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1'), cur = curOf(t, tStage, 0.3);
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.cell.G, t, T0('C1') + 0.3, 1e9, { ...POP, sc: 0.85 }); CL.cell.set(kfRun(KC, t), t);
      $('#clL').textContent = 'MEIOSIS I · ' + (cur < 0 ? 'AFTER DIAKINESIS' : STN[cur]);
      M.vis($('#cr'), t, tCs[0] - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(CR.a, t, tCs[0] + 0.2, 1e9, { ...POP, sc: 0.7 }); M.draw(CR.ar, t, wt('C4', 'two') - 0.2, 0.4);
      M.vis(CR.b, t, wt('C4', 'two'), 1e9, { ...POP, sc: 0.7 }); M.vis(CR.ik, t, wt('C5', 'interkinesis') - 0.1, 1e9, { dy: 16 }); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'pairing') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Crossing over happens in diplotene', right: 'Crossing over: pachytene · chiasmata seen in diplotene', tRight: wt('X3', 'chiasmata') - 0.1,
    type: 'Order of the five substages; matching substage and event; anaphase I', tType: wt('E1', 'order'),
    xRun: t => M.vis(TP, t, wt('X3', 'pachytene') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'In which substage of prophase I does <b>crossing over</b> take place, and which enzyme carries it out?', cols: 1, optW: 968, optH: 66, optFs: 26, optY: 230, qW: 900, opts: ['Zygotene · recombinase', 'Diplotene · recombinase', 'Pachytene · ligase', 'Pachytene · recombinase'], right: 3 },
    tOpts: wt('Q1', 'question') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">D</b>'], ['Crossing over: <b>pachytene</b>'], ['Enzyme: <b>recombinase</b>'], ['Diplotene: X seen only']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'pachytene'), wt('A2', 'recombinase'), wt('A3', 'Zygotene')],
    recapT: 'Recap · meiosis I',
    recap: ['<b>Meiosis</b>: two divisions, one DNA copy · <b>meiosis I</b> halves the number, 2n → n (reductional)', '<b>Leptotene</b>: condensing · <b>zygotene</b>: synapsis, synaptonemal complex, bivalent (tetrad)',
      '<b>Pachytene</b>: recombination nodules, crossing over, recombinase · <b>diplotene</b>: chiasmata', '<b>Diakinesis</b>: terminalisation · spindle forms · nucleolus and nuclear envelope gone',
      '<b>Anaphase I</b>: homologues separate, sisters stay joined · telophase I: dyad · interkinesis: no DNA copy'],
    yq: ['Name the five substages of prophase I, in order.', 'What is a bivalent?', 'What separates in anaphase I?'],
    nextL: 'NEXT · EP 79', nextT: 'Why divide a second time? Meiosis II' },
};
/* ---------- shared frame (header travel, hook, scenes, statement, exam, captions) ---------- */
const tMorph = T0('H2') + 0.02;
const SW = [[T0('T1'), T0('W1')], [T0('Q1'), T0('Q1') + 0.06], [T0('F1'), T0('F1') + 0.06]];
const head = PUC.header({ tMorph, tOut: T0('Q1') - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], ...(EP.cam || [])]);
const tJob = titleTiles(EP.jobs), tFv = learnTiles(EP.learn);
const exRun = exam(EP.exam);
{ const spl = $('#splS'); EP._sL = [mk(spl, 'path', { d: 'M392,148 L392,196 L200,196 L200,252', stroke: C.dim, 'stroke-width': 3, fill: 'none' }), mk(spl, 'path', { d: 'M392,196 L584,196 L584,252', stroke: C.dim, 'stroke-width': 3, fill: 'none' })]; }
const hookRun = t => {
  const out = OUT('D1'), tH3 = T0('H3'), tH4 = T0('H4'), kOut = tH4 - 0.15;
  M.vis($('#hl'), t, tMorph + 0.4, out, { dx: -60, dy: 0, ...o });
  M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
  M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
  M.vis($('#hkP'), t, wt('H3', EP.hookW) - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
  if (M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 })) { const ta = wt('H4', EP.split[0]), tb = wt('H4', EP.split[1]);
    M.vis($('#sb0'), t, tH4 + 0.05, 1e9, POP); EP._sL.forEach(l => M.draw(l, t, ta - 0.4, 0.5));
    M.vis($('#sb1'), t, ta, 1e9, POP); M.vis($('#sb2'), t, tb, 1e9, POP);
    EP.learn.forEach((_, i) => M.vis($('#fv' + i), t, tFv[i] - 0.1, 1e9, { dy: 20 })); }
  if (EP.hook) EP.hook(t);
};
let geo = null;
function measure() {
  geo = 1; const g = $('#ghT'); if (g) g.style.left = (960 - g.offsetWidth / 2) + 'px';
  [['sb0', 392], ['sb1', 200], ['sb2', 584]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; });
  if (EP.measure) EP.measure();
}
const SCN = [['#sH', tMorph, T0('D1') + 0.1, hookRun], ...EP.scenes];
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  EP.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  if ($('#ghT')) M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });
  SCN.forEach(([sel, a, b, run]) => { const on = t >= a - 0.1 && t < b; M.hide($(sel), !on); if (on) run(t); });
  const tT = T0('T1'), tW1 = T0('W1'), stOn = t >= tT && t < tW1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) { const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', EP.st[0]) - 0.2, { st: 0.07, sp: M.HEAVY }); PUC.write($('#stF'), t, wt('T1', EP.st[1]) - 0.1, 0.8); }
  exRun(t);
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
M.outro({});
})();
