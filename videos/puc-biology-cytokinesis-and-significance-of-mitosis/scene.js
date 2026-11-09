// PUC Biology Ep 77: Cytokinesis and Significance of Mitosis (Living diagram, leaf green)
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

/* ===== Ep 77: Cytokinesis and Significance of Mitosis ===== */
Object.assign(M.IC, {
  bal: ['M4 12c0-3 2-5 4-5s3 2 4 5c1-3 2-5 4-5s4 2 4 5-2 5-4 5-3-2-4-5c-1 3-2 5-4 5s-4-2-4-5Z'],
  wall: ['M3 5h18v14H3Z', 'M12 5v14'],
  coco: [ci(12, 12, 8), ci(12, 12, 4)],
  pinch: ['M4 12c0-4 3-6 6-6 1 2 1 4 2 6-1 2-1 4-2 6-3 0-6-2-6-6Z', 'M20 12c0-4-3-6-6-6-1 2-1 4-2 6 1 2 1 4 2 6 3 0 6-2 6-6Z'],
  help: ['M12 21s-7-4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-7 10-7 10Z'],
  grow: [ci(12, 12, 4), ci(12, 12, 8)],
  root: ['M12 3v12', 'M12 15c0 3-1 5-2 6h4c-1-1-2-3-2-6Z', 'M12 8c-2 1-4 3-5 5M12 10c2 1 4 3 5 5'],
  frog: [ci(8, 8, 2), ci(16, 8, 2), 'M4 14c2 4 14 4 16 0', 'M6 12c2-3 10-3 12 0'],
  leaf: ['M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z', 'M5 19L13 11'],
  skin: ['M3 9h18M3 15h18', 'M8 9v6M14 9v6M20 9v6'],
  gut: ['M4 16c2-6 4-6 6 0s4 6 6 0 2-6 4 0'],
  bal2: ['M12 4v16', 'M8 8l4-4 4 4'],
});
const sv = id => $('#' + id);
const WALL = '#4E7A34', MER = '#B9E0A8', CYT = '#DCEFD4', CAP = '#C9A06A', BALC = '#E58A3C', BOX = '#D9B98A', RBC = '#D1495B';
const CH4 = [[100, VIO], [100, LIL], [62, VIO], [62, LIL]];
const CHT = CH4.flatMap(([L, c]) => [{ L, c }, { L, c }]);
const ROW = [-108, -18, 58, 118];
const TEL = ROW.flatMap(y => [goP(154, y * 0.34, 1, 4), goP(-154, y * 0.34, -1, 4)]);
const STT = { cond: 0.15, sp: 1, ast: 0, env: 0, nuc: 0, org: 0.8, env2: 1, nl2: 1, c: TEL };
const still = (host, x, y, s, st, plant) => { const c = cellSim(host, { x, y, s, CH: CHT, plant }); c.st = Object.assign({}, S0, st); return c; };
const rad = a => a * Math.PI / 180;

/* ---------- H: the balloon and the box ---------- */
const hl = sv('hlS'), HL = {};
HL.bal = mk(hl, 'path', { d: '', fill: BALC, stroke: BR, 'stroke-width': 3.5 }); HL.knot = mk(hl, 'path', { d: 'M54,246 l-14,-8 l0,16 Z', fill: BALC, stroke: BR, 'stroke-width': 2.5 });
HL.box = mk(hl, 'g', {}); { const g = HL.box; mk(g, 'path', { d: 'M470,190 L700,190 L700,350 L470,350 Z', fill: BOX, stroke: BR, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M470,190 L500,150 L730,150 L700,190 M700,190 L730,150 L730,310 L700,350', fill: '#E8CFA6', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M585,190 L585,350', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '8 7' }); }
const balD = f => { const p = []; for (let k = 0; k <= 96; k++) { const th = k / 96 * 2 * Math.PI, c = Math.cos(th); p.push(`${(210 + 150 * c * (1 + 0.1 * f)).toFixed(1)},${(246 + 62 * Math.sin(th) * (1 - f * 0.94 * Math.exp(-c * c / 0.02))).toFixed(1)}`); } return 'M' + p.join(' L') + 'Z'; };

/* ---------- D: cytokinesis + two steps ---------- */
const dl = sv('dlS'), DL = {};
DL.cell = still(dl, 392, 262, 0.92, STT);
DL.L = [lab(dl, 392 - 120 * 0.92 * 1.0 - 44, 262 - 40, 160, 120, 'Two nuclei', 'end'), lab(dl, 392 + 6, 262 + 120, 560, 450, 'Cytoplasm')];
const dr = sv('drS'), DR = {};
DR.r1 = mk(dr, 'g', {}); { const g = DR.r1; mk(g, 'ellipse', { cx: 200, cy: 190, rx: 130, ry: 86, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); [-1, 1].forEach(s => mk(g, 'circle', { cx: 200 + s * 56, cy: 190, r: 34, fill: NUF, stroke: VIO, 'stroke-width': 3 })); }
DR.r2 = mk(dr, 'g', {}); { const g = DR.r2; [-1, 1].forEach(s => { mk(g, 'ellipse', { cx: 200 + s * 70, cy: 382, rx: 64, ry: 70, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: 200 + s * 70, cy: 382, r: 28, fill: NUF, stroke: VIO, 'stroke-width': 3 }); }); }
DR.t = [[390, 182, 'KARYOKINESIS', 'the nucleus divides', '1'], [390, 374, 'CYTOKINESIS', 'the cytoplasm divides', '2']].map(([x, y, a, b, n]) => { const g = mk(dr, 'g', {}); mk(g, 'circle', { cx: x + 18, cy: y - 8, r: 20, fill: C.ac });
  txt(g, x + 18, y, n, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: '#fff' }); txt(g, x + 52, y - 4, a, { 'font-size': 24, 'letter-spacing': 1.4, 'font-weight': 600, fill: C.ink }); txt(g, x + 52, y + 26, b, { 'font-size': 18, fill: C.mute }); return g; });
DR.us = mk(dr, 'g', {}); mk(DR.us, 'rect', { x: 442, y: 264, width: 140, height: 40, rx: 9, fill: '#FBF3DD' }); txt(DR.us, 512, 291, 'USUALLY', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: GOLD, 'font-weight': 600 });
DR.ar = mk(dr, 'path', { d: 'M200,286 L200,300 M190,292 L200,304 L210,292', stroke: C.ink, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });

/* ---------- Z: zoom ladder ROOT TIP -> ONE CELL -> THE MIDDLE -> NEW WALL ---------- */
const ZN = ['ROOT TIP', 'ONE CELL', 'THE MIDDLE', 'NEW WALL'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Root tip', 'Cells still dividing.', ''],
  ['RUNG 2 OF 4', 'One cell', 'Telophase over: two nuclei, one cell.', ''],
  ['RUNG 3 OF 4', 'The middle', 'Something is being built here.', ''],
  ['RUNG 4 OF 4', 'Cell plate', 'Grows into the new wall.', 'Becomes the middle lamella']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'path', { d: 'M360,0 L360,330 C360,420 440,470 528,476 C616,470 696,420 696,330 L696,0 Z', fill: CYT, stroke: WALL, 'stroke-width': 4 });
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const x = 376 + c * 51, y = 16 + r * 64; mk(g, 'rect', { x, y, width: 51, height: 64, fill: MER, stroke: WALL, 'stroke-width': 1.6 });
    if (r === 2 && c === 3) [-1, 1].forEach(s => mk(g, 'circle', { cx: x + 25 + s * 12, cy: y + 32, r: 8, fill: NUF, stroke: VIO, 'stroke-width': 2 }));
    else mk(g, 'circle', { cx: x + 25, cy: y + 32, r: 12, fill: NUF, stroke: VIO, 'stroke-width': 2 }); }
  mk(g, 'path', { d: 'M350,380 C360,450 470,500 528,502 C586,500 696,450 706,380 C640,410 590,420 528,420 C466,420 416,410 350,380 Z', fill: CAP, stroke: BR, 'stroke-width': 3.5 });
  LB[0] = [lab(g, 700, 300, 780, 360, 'Root tip', 'start', null, 24), lab(g, 560, 176, 780, 120, 'Two nuclei', 'start', null, 24)]; }
ZG.cell = still(ZG[1], 528, 263, 0.95, STT, true); LB[1] = [lab(ZG[1], 528 - 154 * 0.95, 263 - 64 * 0.95, 200, 60, 'Nucleus', 'end', null, 24), lab(ZG[1], 528 + 230 * 0.95 + 4, 263 + 120, 830, 420, 'Cell wall', 'start', null, 24)];
{ const g = ZG[2]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: CYF }); [-1, 1].forEach(s => mk(g, 'circle', { cx: 528 + s * 400, cy: 263, r: 230, fill: NUF, stroke: VIO, 'stroke-width': 5 }));
  ZG.ves = []; for (let k = 0; k < 12; k++) ZG.ves.push(mk(g, 'circle', { cx: 528, cy: 40 + k * 40, r: 13, fill: WLF, stroke: WLS, 'stroke-width': 2.5 }));
  ZG.pl = mk(g, 'path', { d: 'M528,263 L528,263', stroke: WLS, 'stroke-width': 18, 'stroke-linecap': 'round' });
  LB[2] = [lab(g, 541, 140, 700, 80, 'New wall starts here', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: CYF }); ZG.w = [-1, 1].map(s => mk(g, 'rect', { x: 528 - 21, y: 0, width: 42, height: 526, fill: WLF, stroke: WLS, 'stroke-width': 2 }));
  ZG.ml = mk(g, 'rect', { x: 516, y: 0, width: 24, height: 526, fill: '#9C8A4A' });
  LB[3] = [lab(g, 528, 120, 700, 90, 'Middle lamella', 'start', null, 26), lab(g, 470, 380, 300, 440, 'Cell wall', 'end', null, 26)]; }
const FOC = [[560, 176, 50], [528, 263, 60], [528, 263, 50], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'root'), wt('Z2', 'dividing')], [wt('Z3', 'nuclei'), wt('Z3', 'cell', 1)], [wt('Z4', 'built')], [wt('Z5', 'middle'), wt('Z5', 'walls')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A wall built from the inside!' });

/* ---------- P: animal way, then plant way ---------- */
const PN = ['FURROW', 'DEEPENS', 'TWO CELLS', 'CELL PLATE', 'NEW WALL'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['AFTER TELOPHASE', 'Two ways', 'First an animal cell, then a plant cell.', ''], ['ANIMAL · STEP 1 OF 5', 'Furrow', 'A groove appears in the cell membrane.', ''],
  ['ANIMAL · STEP 2 OF 5', 'Deepens', 'The furrow deepens until it meets in the centre.', 'From the outside in'], ['ANIMAL · STEP 3 OF 5', 'Two cells', 'Cytoplasm split. Mitochondria shared.', ''],
  ['PLANT · STEP 4 OF 5', 'Cell plate', 'The wall cannot pinch, so a plate forms in the centre.', ''], ['PLANT · STEP 5 OF 5', 'New wall', 'The plate grows outward to the side walls.', 'From the centre out']]);
const ps = sv('pS'), PP = {};
PP.a = still(ps, 268, 310, 0.72, STT); PP.p = still(ps, 792, 310, 0.72, STT, true);
PP.ta = txt(ps, 268, 112, 'ANIMAL CELL', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 }); PP.tp = txt(ps, 792, 112, 'PLANT CELL', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 });
PP.fa = [-1, 1].map(s => mk(ps, 'path', { d: `M268,${310 + s * 168} L268,${310 + s * 138} M258,${310 + s * 150} L268,${310 + s * 138} L278,${310 + s * 150}`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
PP.fp = [-1, 1].map(s => mk(ps, 'path', { d: `M812,${310 + s * 24} L812,${310 + s * 84} M802,${310 + s * 72} L812,${310 + s * 84} L822,${310 + s * 72}`, stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
PP.L = [lab(ps, 268, 310 - 122 * 0.66, 110, 170, 'Furrow', 'end', null, 24), lab(ps, 268 + 180 * 0.72, 310 + 104 * 0.72, 470, 478, 'Mitochondrion', 'start', null, 22), lab(ps, 792, 330, 792, 448, 'Cell plate', 'middle', null, 24)];
const KA = [Object.assign({}, PP.a.st), { t: wt('P2', 'furrow') - 0.2, d: 1.6, fur: 0.35 }, { t: tPs[1] + 0.2, d: 2.6, fur: 1 }, { t: tPs[2] + 0.2, d: 1.3, apart: 1 }];
const KP = [Object.assign({}, PP.p.st), { t: wt('P5', 'plate') - 0.2, d: 1.2, plate: 0.16 }, { t: wt('P6', 'grows') - 0.2, d: 3.2, plate: 1 }];

/* ---------- C: why mitosis matters ---------- */
const cl = sv('clS'), CL = {};
const RS = [['grow', 'Growth', 'More cells, a bigger body'], ['bal2', 'Balance', 'Restores the nucleo-cytoplasmic ratio'], ['help', 'Repair', 'Skin, gut lining and blood replaced'], ['leaf', 'Plants', 'Meristems keep a plant growing']];
$('#clR').innerHTML = RS.map(([ic, n, d], i) => `<div class="rw" id="rw${i}" style="top:${92 + i * 112}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="rn">${i + 1}. ${n}</div><div class="rd">${d}</div></div>`).join('');
const cr = sv('crS'), CR = { g: [0, 1, 2, 3].map(() => mk(cr, 'g', {})) };
CR.id = mk(cr, 'g', {}); { const g = CR.id, cell = (x, y, r) => { mk(g, 'circle', { cx: x, cy: y, r, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); [[-14, 30, VIO], [-4, 30, LIL], [8, 18, VIO], [18, 18, LIL]].forEach(([dx, L, c]) => mk(g, 'path', { d: `M${x + dx},${y - L / 2} L${x + dx},${y + L / 2}`, stroke: c, 'stroke-width': 7, 'stroke-linecap': 'round' })); };
  cell(170, 270, 84); cell(590, 170, 70); cell(590, 370, 70); mk(g, 'path', { d: 'M270,250 C360,200 420,170 500,170 M270,290 C360,340 420,370 500,370 M488,158 L500,170 L488,182 M488,358 L500,370 L488,382', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  txt(g, 392, 480, 'SAME CHROMOSOMES · 2n → 2n', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.4, fill: C.ac, 'font-weight': 600 }); }
{ const g = CR.g[0]; CR.sq = []; for (let k = 0; k < 8; k++) { const r = mk(g, 'rect', { x: 0, y: 0, width: 110, height: 110, rx: 14, fill: MER, stroke: WALL, 'stroke-width': 3 }); const n = mk(g, 'circle', { cx: 0, cy: 0, r: 20, fill: NUF, stroke: VIO, 'stroke-width': 2.5 }); CR.sq.push({ r, n }); }
  CR.cnt = txt(g, 392, 470, '1 CELL', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: C.ink }); }
{ const g = CR.g[1]; mk(g, 'circle', { cx: 200, cy: 260, r: 130, fill: CYF, stroke: C.ink, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 200, cy: 260, r: 30, fill: NUF, stroke: VIO, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M350,260 L420,260 M408,248 L420,260 L408,272', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  [-1, 1].forEach(s => { mk(g, 'circle', { cx: 560, cy: 260 + s * 92, r: 80, fill: CYF, stroke: C.ink, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 560, cy: 260 + s * 92, r: 30, fill: NUF, stroke: VIO, 'stroke-width': 3 }); });
  txt(g, 200, 430, 'NUCLEUS TOO SMALL', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: C.red, 'font-weight': 600 }); txt(g, 560, 474, 'BALANCE BACK', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: C.ac, 'font-weight': 600 }); }
{ const g = CR.g[2]; [[110, 'TOP LAYER OF SKIN'], [250, 'LINING OF THE GUT'], [390, 'BLOOD CELLS']].forEach(([y, n], i) => { txt(g, 60, y - 34, n, { 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
    if (i === 0) for (let k = 0; k < 9; k++) { mk(g, 'rect', { x: 60 + k * 72, y: y - 14, width: 68, height: 50, rx: 10, fill: '#F2C9A8', stroke: '#B9825E', 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 94 + k * 72, cy: y + 11, r: 8, fill: NUC }); }
    if (i === 1) mk(g, 'path', { d: `M60,${y + 40} ` + Array.from({ length: 8 }, (_, k) => `q40,-80 80,0`).join(' '), fill: '#F4D7D0', stroke: '#B5476E', 'stroke-width': 3 });
    if (i === 2) for (let k = 0; k < 7; k++) { mk(g, 'ellipse', { cx: 100 + k * 92, cy: y + 14, rx: 36, ry: 24, fill: RBC, stroke: '#8E2C3A', 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: 100 + k * 92, cy: y + 14, rx: 16, ry: 9, fill: '#B83A4B' }); } }); }
{ const g = CR.g[3]; mk(g, 'rect', { x: 36, y: 330, width: 340, height: 6, fill: '#8A6A3A' }); mk(g, 'path', { d: 'M206,330 L206,110', stroke: WALL, 'stroke-width': 9, 'stroke-linecap': 'round' });
  [[-1, 250], [1, 200], [-1, 160]].forEach(([s, y]) => mk(g, 'path', { d: `M206,${y} C${206 + s * 40},${y - 26} ${206 + s * 80},${y - 26} ${206 + s * 104},${y - 8} C${206 + s * 80},${y + 12} ${206 + s * 40},${y + 12} 206,${y} Z`, fill: '#8CC48F', stroke: BR, 'stroke-width': 2.5 }));
  mk(g, 'path', { d: 'M206,336 L206,470 M206,380 C180,400 166,430 160,460 M206,400 C232,420 246,446 250,470', stroke: '#B79A6A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 206, cy: 104, r: 12, fill: MER, stroke: WALL, 'stroke-width': 3 }); mk(g, 'circle', { cx: 206, cy: 474, r: 10, fill: MER, stroke: WALL, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 580, cy: 250, r: 140, fill: '#E6D3B1', stroke: BR, 'stroke-width': 3.5 }); CR.ring = mk(g, 'circle', { cx: 580, cy: 250, r: 92, fill: 'none', stroke: '#E39B4B', 'stroke-width': 9 }); mk(g, 'circle', { cx: 580, cy: 250, r: 40, fill: '#FBF5E6', stroke: '#C9B48A', 'stroke-width': 2 });
  CR.L = [lab(g, 218, 104, 300, 70, 'Apical meristem', 'start', null, 22), lab(g, 672, 250, 600, 440, 'Lateral cambium', 'middle', null, 22)]; }

/* ---------- V: animal vs plant ---------- */
const cV = cmp($('#vc'), ['ANIMAL CELL · FURROW', 'PLANT CELL · CELL PLATE'], [
  ['', 'Starts', 'A furrow in the membrane', 'A cell plate in the centre', wt('V1', 'furrow'), wt('V1', 'plate'), s => mk(s, 'path', { d: 'M20,50 C20,20 50,18 65,40 C80,18 110,20 110,50 C110,80 80,82 65,60 C50,82 20,80 20,50 Z', fill: CYF, stroke: C.ink, 'stroke-width': 3 }),
    s => { mk(s, 'rect', { x: 20, y: 14, width: 90, height: 72, rx: 6, fill: CYF, stroke: WLS, 'stroke-width': 4 }); mk(s, 'path', { d: 'M65,36 L65,64', stroke: WLS, 'stroke-width': 6, 'stroke-linecap': 'round' }); }],
  ['', 'Direction', 'From the outside inward', 'From the centre outward', wt('V2', 'outside'), wt('V2', 'centre'), s => mk(s, 'path', { d: 'M65,10 L65,36 M55,26 L65,36 L75,26 M65,90 L65,64 M55,74 L65,64 L75,74', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }),
    s => mk(s, 'path', { d: 'M65,40 L65,12 M55,22 L65,12 L75,22 M65,60 L65,88 M55,78 L65,88 L75,78', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' })],
  ['', 'Why', 'A soft membrane can pinch in', 'A stiff wall cannot pinch', wt('V3', 'soft'), wt('V3', 'stiff'), s => mk(s, 'circle', { cx: 65, cy: 50, r: 34, fill: CYF, stroke: C.ink, 'stroke-width': 3 }),
    s => mk(s, 'rect', { x: 28, y: 16, width: 74, height: 68, rx: 6, fill: CYF, stroke: WLF, 'stroke-width': 9 })]], 'v');
const th1 = PUC.think($('#th1'), { q: 'You see a new wall growing from the middle of a dividing cell, toward its sides. Plant cell or animal cell?', opts: ['Animal cell', 'Plant cell'], right: 1, why: 'Plant cell. The cell plate grows from the centre outward, because the stiff wall cannot be pinched.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['FURROW · ANIMAL CELLS', 'background:var(--ac2);color:#1F6B3F'], ['CELL PLATE · PLANT CELLS', 'background:var(--ink);color:#fff']], [
  ['gut', 'Lining of your gut', '<b>Animal</b> cell', 0, 0, wt('W2', 'furrow')], ['root', 'Onion root tip', '<b>Plant</b> cell', 1, 0, wt('W3', 'plate')],
  ['skin', 'Top layer of your skin', '<b>Animal</b> cell', 0, 1, wt('W4', 'Furrow')], ['leaf', 'Cambium of a mango tree', '<b>Plant</b> cell', 1, 1, wt('W5', 'plate')],
  ['frog', 'A frog embryo', '<b>Animal</b> cell', 0, 2, wt('W6', 'Furrow')], ['leaf', 'Shoot tip of a pea plant', '<b>Plant</b> cell', 1, 2, wt('W7', 'plate')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'circle', { cx: 300, cy: 130, r: 96, fill: '#8C6D4F', stroke: BR, 'stroke-width': 3 }); mk(TP, 'circle', { cx: 300, cy: 130, r: 80, fill: '#FBF7EC', stroke: '#C9B48A', 'stroke-width': 3 });
  mk(TP, 'circle', { cx: 300, cy: 130, r: 64, fill: '#E4F0F7' }); for (let k = 0; k < 14; k++) { const a = k * 2.4, r = 14 + (k * 17) % 44; mk(TP, 'circle', { cx: 300 + r * Math.cos(a), cy: 130 + r * Math.sin(a), r: 6, fill: NUF, stroke: VIO, 'stroke-width': 2 }); }
  txt(TP, 300, 254, 'LIQUID ENDOSPERM · MANY NUCLEI', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['bal', 'A twisted balloon', 'TWO FROM ONE', 'balloon'], ['wall', 'A wall in a room', 'BUILT ACROSS', 'wall'], ['coco', 'A tender coconut', 'THE WATER INSIDE', 'coconut']],
  learn: [['pinch', 'Animal way', 'both'], ['wall', 'Plant way', 'ways'], ['help', 'Why it matters', 'matters']],
  hookW: 'work', split: ['cytokinesis', 'plants'], st: ['Animals', 'Plants'],
  cam: [],
  hook: t => { const tt = wt('H2', 'middle'); M.vis(HL.bal, t, tMorph + 0.4, 1e9, { ...POP, sc: 0.7 }); M.vis(HL.knot, t, tMorph + 0.4, 1e9, POP); attr(HL.bal, 'd', balD(M.io((t - tt) / 1.2)));
    M.vis($('#hlt0'), t, wt('H2', 'two') - 0.1, 1e9, POP); M.vis(HL.box, t, wt('H2', 'cardboard') - 0.2, 1e9, { ...POP, sc: 0.7 }); M.vis($('#hlt1'), t, wt('H2', 'cannot') - 0.1, 1e9, POP); M.vis($('#hlP'), t, T0('H3') + 0.3, 1e9, POP); },
  measure: () => { [['hlt0', 214, 410], ['hlt1', 590, 410]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.cell.G, t, T0('D2') - 0.1, 1e9, { ...POP, sc: 0.8 }); DL.cell.set(DL.cell.st, t);
      labRun(DL.L[0], t, wt('D2', 'nucleus')); labRun(DL.L[1], t, wt('D2', 'cytoplasm')); M.vis($('#dlP'), t, wt('D3', 'Cyto') - 0.1, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.r1, t, wt('D4', 'karyokinesis') - 0.2, 1e9, { ...POP, sc: 0.7 }); M.vis(DR.t[0], t, wt('D4', 'karyokinesis'), 1e9, { dx: -16, dy: 0 });
      M.draw(DR.ar, t, wt('D4', 'follows') - 0.2, 0.4); M.vis(DR.r2, t, wt('D4', 'follows'), 1e9, { ...POP, sc: 0.7 }); M.vis(DR.t[1], t, wt('D4', 'cytokinesis'), 1e9, { dx: -16, dy: 0 });
      M.vis(DR.us, t, wt('D4', 'usually') - 0.1, 1e9, POP); M.vis($('#drP'), t, wt('D4', 'usually', 1) - 0.1, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] }); ZG.cell.set(ZG.cell.st, t);
      const gv = M.io((t - tZ[2] - 0.8) / 2.4); ZG.ves.forEach((v, k) => { const y0 = 40 + k * 40; attr(v, 'cx', (528 + (k % 2 ? 1 : -1) * 90 * (1 - gv)).toFixed(1)); attr(v, 'cy', y0); v.style.opacity = (1 - M.clamp((gv - 0.8) / 0.2)).toFixed(2); });
      const pl = M.io((t - tZ[2] - 2.6) / 1.4); attr(ZG.pl, 'd', `M528,${(263 - 230 * pl).toFixed(1)} L528,${(263 + 230 * pl).toFixed(1)}`);
      const wv = M.io((t - wt('Z5', 'grows')) / 1.2); ZG.w.forEach((w, i) => attr(w, 'x', (528 - 21 + (i ? 1 : -1) * 30 * wv).toFixed(1)));
      avZ(t, wt('Z5', 'glues') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PP.a.G, t, T0('P1') + 0.3, 1e9, { ...POP, sc: 0.8 }); M.vis(PP.p.G, t, T0('P1') + 0.5, 1e9, { ...POP, sc: 0.8 }); M.vis(PP.ta, t, T0('P1') + 0.3, 1e9, POP); M.vis(PP.tp, t, T0('P1') + 0.5, 1e9, POP);
      PP.a.set(kfRun(KA, t), t); PP.p.set(kfRun(KP, t), t); PP.a.G.style.opacity = st >= 3 ? 0.45 : 1; PP.p.G.style.opacity = st >= 0 && st < 3 ? 0.45 : 1;
      PP.fa.forEach(f => M.vis(f, t, wt('P2', 'furrow'), tPs[2], { dy: 0, fade: 0.3, outDur: 0.3 })); PP.fp.forEach(f => M.vis(f, t, wt('P6', 'outward') - 0.2, 1e9, { dy: 0, fade: 0.3 }));
      labRun(PP.L[0], t, wt('P2', 'groove'), tPs[1] + 0.8); labRun(PP.L[1], t, wt('P4', 'mitochondria'), tPs[3] - 0.2); labRun(PP.L[2], t, wt('P5', 'plate') + 0.6); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1'), tCs = ['C2', 'C3', 'C4', 'C5'].map(T0), cur = curOf(t, tCs, 0.3);
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); RS.forEach((_, i) => { const e = $('#rw' + i); M.vis(e, t, wt('C1', 'Four') - 0.2 + i * 0.15, 1e9, { dx: -20, dy: 0 }); e.style.background = i === cur ? C.ac3 : C.soft; });
      M.vis($('#cr'), t, T0('C1') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis(CR.id, t, T0('C1') + 0.4, tCs[0] - 0.05, { dy: 16, outDur: 0.25 }); $('#crL').textContent = cur < 0 ? 'EACH DAUGHTER · AN EXACT COPY' : ['GROWTH · BY MITOSIS', 'BALANCE · NUCLEUS AND CYTOPLASM', 'REPAIR · CONSTANTLY REPLACED', 'PLANTS · GROWTH ALL LIFE'][Math.max(0, cur)];
      CR.g.forEach((g, i) => M.vis(g, t, tCs[i] + 0.1, i < 3 ? tCs[i + 1] - 0.1 : 1e9, { dy: 16, outDur: 0.25 }));
      const n = Math.min(3, Math.floor(Math.max(0, t - tCs[0] - 0.4) / 1.3)), N = 1 << n, cols = N > 2 ? (N > 4 ? 4 : 2) : N; CR.cnt.textContent = N + (N > 1 ? ' CELLS' : ' CELL');
      CR.sq.forEach((q, k) => { const r = Math.floor(k / cols), c = k % cols, rows = Math.ceil(N / cols), x = 392 - cols * 66 + c * 132 + 11, y = 230 - rows * 66 + r * 132 + 11; q.r.style.opacity = q.n.style.opacity = k < N ? 1 : 0;
        attr(q.r, 'x', x); attr(q.r, 'y', y); attr(q.n, 'cx', x + 55); attr(q.n, 'cy', y + 55); });
      CR.L.forEach((l, i) => labRun(l, t, wt('C5', i ? 'lateral' : 'apical'))); attr(CR.ring, 'stroke-width', (9 + 3 * Math.sin(t * 4)).toFixed(2)); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Plant') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'plate') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Karyokinesis is always followed by cytokinesis', right: 'Not always: many nuclei in one cell, a syncytium', tRight: wt('X3', 'syncytium') - 0.1,
    type: 'Cell plate vs furrow; the syncytium example; significance of mitosis', tType: wt('E1', 'cell'),
    xRun: t => M.vis(TP, t, wt('X3', 'coconut') - 0.6, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Read the assertion and the reason.<div class="sl"><b>A</b>In plant cells, cytokinesis takes place by a cell plate, not a furrow</div><div class="sl"><b>R</b>Plant cells are enclosed by a relatively inextensible cell wall</div>', cols: 1, optW: 968, optH: 66, optFs: 26, optY: 262, qW: 960,
      opts: ['Both true, and R explains A', 'Both true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'], right: 0 },
    tOpts: wt('Q1', 'assertion') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['A true: <b>cell plate</b>, centre out'], ['R true: a <b>stiff wall</b>'], ['R <b>explains</b> A']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'cell'), wt('A3', 'stiff'), wt('A3', 'explains')],
    recapT: 'Recap · cytokinesis and significance of mitosis',
    recap: ['<b>Cytokinesis</b>: division of the cytoplasm · usually follows karyokinesis (the nucleus)', '<b>Animal cell</b>: a furrow in the membrane deepens from outside in · organelles shared',
      '<b>Plant cell</b>: a cell plate grows from the centre out · it becomes the middle lamella', '<b>Syncytium</b>: nucleus divides, cytoplasm does not · liquid endosperm of coconut',
      '<b>Mitosis matters</b>: growth · nucleo-cytoplasmic ratio · repair (skin, gut, blood) · meristems'],
    yq: ['How does cytokinesis happen in an animal cell?', 'What does the cell plate become?', 'Give two reasons why mitosis is important.'],
    nextL: 'NEXT · EP 78', nextT: 'Why are you not a copy of either parent? Meiosis I' },
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
