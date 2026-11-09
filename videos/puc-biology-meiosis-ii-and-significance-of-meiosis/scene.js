// PUC Biology Ep 79: Meiosis II and Significance of Meiosis (Living diagram, leaf green)
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

/* ===== Ep 79: Meiosis II and Significance of Meiosis ===== */
Object.assign(M.IC, {
  one: [ci(12, 12, 7)],
  two: [ci(7, 12, 4.5), ci(17, 12, 4.5)],
  four: [ci(7, 7, 4), ci(17, 7, 4), ci(7, 17, 4), ci(17, 17, 4)],
  walk: ['M4 18h4v-4h4v-4h4V6h4'],
  help: ['M12 21s-7-4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-7 10-7 10Z'],
  dna: ['M8 3c0 5 8 7 8 12s-8 4-8 6', 'M16 3c0 5-8 7-8 12s8 4 8 6', 'M9 7h6M9 17h6'],
  pair: ['M8 4v16M11 4v16M14 4v16M17 4v16'],
  cut: ['M12 4v16', 'M8 8l4-4 4 4', 'M8 16l4 4 4-4'],
  swap: ['M5 7h12l-3-3M19 17H7l3 3'],
  ana: ['M4 12h4M16 12h4', 'M10 8l-3 4 3 4M14 8l3 4-3 4'],
  line: ['M12 3v18', 'M8 7h8M8 12h8M8 17h8'],
});
const sv = id => $('#' + id), rad = a => a * Math.PI / 180;
const POL = '#E8C46A', POS = '#9A7A2A', FIL = '#C9A877';
const CH1 = [{ L: 100, c: VIO, c2: LIL }, { L: 100, c: VIO }, { L: 62, c: VIO, c2: LIL }, { L: 62, c: VIO }];
const CH2 = [{ L: 100, c: LIL }, { L: 100, c: LIL, c2: VIO }, { L: 62, c: LIL }, { L: 62, c: LIL, c2: VIO }];
const RW = [-52, 56];
const lay = { I: [...sis(-30, -14, 70, 7), ...sis(36, 22, 118, 7)], MET: RW.flatMap(y => sis(0, y, 90, 7)), ANA: RW.flatMap(y => [goP(112, y * 0.62, 1), goP(-112, y * 0.62, -1)]),
  TEL: RW.flatMap(y => [goP(154, y * 0.34, 1, 4), goP(-154, y * 0.34, -1, 4)]) };
const STI = { cond: 0.45, env: 1, nuc: 0.8, org: 0.5, xo: 1, nl2: 0, c: lay.I };
const still = (host, x, y, s, CH, st) => { const c = cellSim(host, { x, y, s, CH }); c.st = Object.assign({}, S0, st); return c; };
const xch = (g, x, y, L, c1, c2, w = 7, q = 6) => { mk(g, 'path', { d: `M${x - q},${y - L / 2} Q${x},${y} ${x - q},${y + L / 2} M${x + q},${y - L / 2} Q${x},${y} ${x + q},${y + L / 2}`, stroke: c1, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' });
  if (c2) mk(g, 'path', { d: `M${x + q * 0.4},${y + L * 0.12} Q${x + q * 0.6},${y + L * 0.3} ${x + q},${y + L / 2}`, stroke: c2, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); };
const rod = (g, x, y, L, c1, c2, w = 7) => { mk(g, 'path', { d: `M${x},${y - L / 2} L${x},${y + L / 2}`, stroke: c1, 'stroke-width': w, 'stroke-linecap': 'round' }); if (c2) mk(g, 'path', { d: `M${x},${y + L * 0.12} L${x},${y + L / 2}`, stroke: c2, 'stroke-width': w, 'stroke-linecap': 'round' }); };

/* ---------- H: pollen in groups of four ---------- */
const hl = sv('hlS'), HL = {};
const tet = (g, x, y, r) => [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { mk(g, 'circle', { cx: x + a * r * 0.9, cy: y + b * r * 0.9, r, fill: POL, stroke: POS, 'stroke-width': 2.5 }); for (let k = 0; k < 3; k++) mk(g, 'circle', { cx: x + a * r * 0.9 + (k - 1) * r * 0.35, cy: y + b * r * 0.9 + ((k % 2) - 0.5) * r * 0.4, r: 2.4, fill: POS }); });
HL.m = mk(hl, 'g', {}); mk(HL.m, 'circle', { cx: 170, cy: 250, r: 74, fill: CYF, stroke: C.ink, 'stroke-width': 3.5 }); mk(HL.m, 'circle', { cx: 170, cy: 250, r: 28, fill: NUF, stroke: VIO, 'stroke-width': 3 });
HL.ar = mk(hl, 'path', { d: 'M266,250 L346,250 M334,238 L346,250 L334,262', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
HL.t = mk(hl, 'g', {}); tet(HL.t, 520, 236, 54);
HL.n = [mk(hl, 'g', {}), mk(hl, 'g', {})]; [[170, '1 CELL'], [520, '4 CELLS']].forEach(([x, s], i) => txt(HL.n[i], x, 392, s, { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 600, fill: i ? C.ac : C.ink }));

/* ---------- D: where we are + like mitosis ---------- */
const dl = sv('dlS'), DL = {};
DL.c = [still(dl, 214, 250, 0.62, CH1, STI), still(dl, 570, 250, 0.62, CH2, STI)];
DL.t = [[214, 'n = 2'], [570, 'n = 2']].map(([x, s]) => txt(dl, x, 400, s, { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: VIO }));
DL.L = lab(dl, 214 + 36 * 0.62, 250 + 22 * 0.62 - 26, 392, 120, 'Two chromatids each', 'start', null, 22);
const dr = sv('drS'), DR = {};
DR.a = mk(dr, 'g', {}); xch(DR.a, 150, 250, 150, VIO, LIL, 16, 16); mk(DR.a, 'circle', { cx: 150, cy: 250, r: 8, fill: C.ink });
DR.ar = mk(dr, 'path', { d: 'M250,250 L340,250 M328,238 L340,250 L328,262', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
DR.b = mk(dr, 'g', {}); rod(DR.b, 440, 250, 150, VIO, LIL, 16); rod(DR.b, 560, 250, 150, VIO, null, 16);
DR.t = txt(dr, 392, 410, 'n STAYS n · EQUATIONAL', { 'text-anchor': 'middle', 'font-size': 24, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });

/* ---------- Z: zoom ladder ANTHER -> DYAD -> ONE CELL -> CHROMOSOME ---------- */
const ZN = ['ANTHER', 'DYAD', 'ONE CELL', 'CHROMOSOME'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Anther', 'Meiosis I is finished.', ''],
  ['RUNG 2 OF 4', 'Dyad', 'Two cells side by side.', ''],
  ['RUNG 3 OF 4', 'One cell', 'Two chromosomes in our example: one set, n.', ''],
  ['RUNG 4 OF 4', 'Chromosome', 'Two sister chromatids, one centromere.', 'A kinetochore on each side']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
const dy = (g, x, y, r) => [-1, 1].forEach(s => { mk(g, 'ellipse', { cx: x + s * r * 0.95, cy: y, rx: r, ry: r * 1.1, fill: CYF, stroke: C.ink, 'stroke-width': 2 }); mk(g, 'circle', { cx: x + s * r * 0.95, cy: y, r: r * 0.42, fill: NUF, stroke: VIO, 'stroke-width': 1.6 }); });
{ const g = ZG[0]; mk(g, 'path', { d: 'M528,40 C640,40 700,120 690,263 C700,406 640,486 528,486 C416,486 356,406 366,263 C356,120 416,40 528,40 Z', fill: POL, stroke: BR, 'stroke-width': 4 });
  [[440, 160], [616, 160], [440, 366], [616, 366]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 74, fill: '#F7E7B5', stroke: BR, 'stroke-width': 3 }); [[-26, -26], [26, -26], [-26, 26], [26, 26]].forEach(([a, b]) => dy(g, x + a, y + b, 12)); });
  LB[0] = [lab(g, 690, 263, 780, 340, 'Anther', 'start', null, 24), lab(g, 466, 134, 250, 70, 'Finished meiosis I', 'end', null, 22)]; }
{ const g = ZG[1]; dy(g, 528, 263, 150); LB[1] = [lab(g, 528, 120, 700, 60, 'Dyad of cells', 'start', null, 24)]; }
ZG.cell = still(ZG[2], 528, 263, 1.1, CH1, { cond: 0.9, env: 1, nuc: 0.8, org: 0.5, xo: 1, c: lay.I }); LB[2] = [lab(ZG[2], 528 - 30 * 1.1, 263 - 14 * 1.1 - 50, 300, 60, 'Chromosome', 'end', null, 24)];
{ const g = ZG[3]; mk(g, 'path', { d: 'M500,60 Q536,263 500,466', stroke: VIO, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M556,60 Q520,263 556,466', stroke: VIO, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M538,330 Q522,400 556,466', stroke: LIL, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: 528, cy: 263, r: 16, fill: C.ink });
  [-1, 1].forEach(s => mk(g, 'rect', { x: 528 + s * 34 - 6, y: 243, width: 12, height: 40, rx: 5, fill: C.ink }));
  LB[3] = [lab(g, 486, 140, 300, 90, 'Sister chromatids', 'end', null, 24), lab(g, 528, 263, 300, 330, 'Centromere', 'end', null, 24), lab(g, 562, 250, 760, 180, 'Kinetochore', 'start', null, 24)]; }
const FOC = [[466, 134, 44], [528 + 142, 263, 90], [528 - 33, 263 - 15, 60], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'anther'), wt('Z2', 'finished')], [wt('Z3', 'dyad')], [wt('Z4', 'two')], [wt('Z5', 'sister'), wt('Z5', 'centromere'), wt('Z5', 'kinetochore')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two copies left to split!' });

/* ---------- P: meiosis II in both cells ---------- */
const PN = ['PROPHASE II', 'METAPHASE II', 'ANAPHASE II', 'TELOPHASE II', 'FOUR CELLS'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['THE DYAD · n = 2 EACH', 'Meiosis II', 'Both cells at once, like mitosis.', ''], ['STAGE 1 OF 5', 'Prophase II', 'Simple. Compact again, nuclear membrane gone.', ''],
  ['STAGE 2 OF 5', 'Metaphase II', 'Line up. Fibres on the kinetochores of sisters.', ''], ['STAGE 3 OF 5', 'Anaphase II', 'Centromeres split. Sisters go to opposite poles.', ''],
  ['STAGE 4 OF 5', 'Telophase II', 'A nuclear envelope forms around each group.', ''], ['STEP 5 OF 5', 'Four cells', 'Cytoplasm divides: a tetrad of cells.', 'Four haploid daughter cells']]);
const ps = sv('pS'), PP = {};
PP.c = [cellSim(ps, { x: 268, y: 286, s: 0.78, CH: CH1 }), cellSim(ps, { x: 790, y: 286, s: 0.78, CH: CH2 })];
PP.f = txt(ps, 528, 486, 'FOUR HAPLOID CELLS · n = 2 EACH', { 'text-anchor': 'middle', 'font-size': 22, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });
PP.L = [lab(ps, 268 + 112 * 0.78, 286 - 52 * 0.62 * 0.78 - 30, 420, 92, 'Sister chromatids part', 'start', null, 22)];
const KF = [Object.assign({}, S0, STI), { t: wt('P2', 'compact') - 0.3, d: 1.8, cond: 1, org: 0 }, { t: tPs[0] + 1.2, d: 1.8, sp: 1, ast: 1 }, { t: wt('P2', 'disappears') - 0.3, d: 0.9, env: 0, nuc: 0 },
  { t: wt('P3', 'line') - 0.3, d: 1.4, c: lay.MET, pl: 1 }, { t: wt('P3', 'Fibres') - 0.2, d: 1, fib: 1 }, { t: wt('P4', 'splits') - 0.2, d: 2.4, c: lay.ANA, pl: 0 },
  { t: tPs[3] + 0.1, d: 1.2, c: lay.TEL, fib: 0, ast: 0 }, { t: wt('P5', 'envelope') - 0.2, d: 1, env2: 1, cond: 0.35 }, { t: wt('P6', 'divides') - 0.2, d: 1.2, fur: 1 }, { t: wt('P6', 'tetrad') - 0.4, d: 0.8, apart: 1 }];

/* ---------- C: why meiosis matters ---------- */
const cl = sv('clS'), CL = {};
const nb = (g, x, y, w, n, v, c) => { mk(g, 'rect', { x: x - w / 2, y: y - 50, width: w, height: 100, rx: 14, fill: C.soft }); txt(g, x, y - 14, n, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); txt(g, x, y + 30, v, { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: c }); };
CL.p = mk(cl, 'g', {}); nb(CL.p, 392, 130, 260, 'PARENT', '2n = 46', VIO);
CL.g = mk(cl, 'g', {}); nb(CL.g, 200, 310, 220, 'SPERM', 'n = 23', LIL); nb(CL.g, 584, 310, 220, 'EGG', 'n = 23', LIL);
CL.z = mk(cl, 'g', {}); nb(CL.z, 392, 470, 260, 'BABY', '2n = 46', VIO);
CL.a1 = mk(cl, 'path', { d: 'M300,170 L230,250 M232,232 L230,250 L246,242 M484,170 L554,250 M552,232 L554,250 L538,242', stroke: C.ink, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
CL.a2 = mk(cl, 'path', { d: 'M230,362 L300,430 M284,426 L300,430 L298,414 M554,362 L484,430 M500,426 L484,430 L486,414', stroke: C.ink, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
CL.m = txt(cl, 392, 228, 'MEIOSIS · HALF', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, fill: C.ac, 'font-weight': 600 }); CL.f = txt(cl, 392, 390, 'FERTILISATION · JOIN', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.3, fill: C.ac, 'font-weight': 600 });
const cr = sv('crS'), CR = {};
CR.sum = mk(cr, 'g', {}); txt(CR.sum, 392, 250, '23 + 23 = 46', { 'text-anchor': 'middle', 'font-size': 72, 'font-weight': 600, fill: VIO }); txt(CR.sum, 392, 310, 'SPERM + EGG = BABY · SAME AS EACH PARENT', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
CR.g = [[[VIO, LIL], [VIO, LIL]], [[VIO, null], [VIO, null]], [[LIL, null], [LIL, null]], [[LIL, VIO], [LIL, VIO]]].map((m, i) => { const g = mk(cr, 'g', {}), x = 120 + i * 182, y = 230; mk(g, 'circle', { cx: x, cy: y, r: 74, fill: CYF, stroke: C.ink, 'stroke-width': 3 });
  rod(g, x - 18, y, 80, m[0][0], m[0][1], 10); rod(g, x + 20, y, 50, m[1][0], m[1][1], 10); return g; });
CR.t = txt(cr, 392, 360, '4 GAMETES · 4 DIFFERENT MIXES', { 'text-anchor': 'middle', 'font-size': 22, 'letter-spacing': 1.5, fill: C.ink, 'font-weight': 600 });
CR.k = [[400, 'CROSSING OVER · PACHYTENE'], [446, 'PAIRS SEPARATE IN RANDOM WAYS · ANAPHASE I']].map(([y, s]) => { const g = mk(cr, 'g', {}); mk(g, 'rect', { x: 36, y, width: 712, height: 38, rx: 9, fill: C.soft }); txt(g, 392, y + 26, s, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': 1.3, fill: VIO, 'font-weight': 600 }); return g; });

/* ---------- V: meiosis I vs meiosis II ---------- */
const cV = cmp($('#vc'), ['MEIOSIS I', 'MEIOSIS II'], [
  ['', 'Separates', 'Homologous chromosomes', 'Sister chromatids', wt('V1', 'homologous'), wt('V1', 'sister'), s => { xch(s, 42, 50, 70, VIO); xch(s, 88, 50, 70, LIL); }, s => { rod(s, 46, 50, 70, VIO); rod(s, 84, 50, 70, VIO); }],
  ['', 'Number', '2n → n · halves', 'n → n · stays the same', wt('V2', 'halves'), wt('V2', 'keeps'), s => txt(s, 65, 62, '2n→n', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: VIO }), s => txt(s, 65, 62, 'n→n', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: VIO })],
  ['', 'Prophase', 'Long: five substages, crossing over', 'Short and simple', wt('V3', 'long'), wt('V3', 'short'), s => [0, 1, 2, 3, 4].forEach(k => mk(s, 'rect', { x: 14 + k * 21, y: 40, width: 17, height: 20, rx: 4, fill: C.ac })), s => mk(s, 'rect', { x: 50, y: 40, width: 30, height: 20, rx: 4, fill: C.ac })]], 'v');
const th1 = PUC.think($('#th1'), { q: 'In a haploid cell, the centromeres split and the sister chromatids move apart. Meiosis I, or meiosis II?', opts: ['Meiosis I', 'Meiosis II'], right: 1, why: 'Meiosis II. Centromeres split only in anaphase II, never in anaphase I.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['MEIOSIS I · HALVES', 'background:var(--ac2);color:#1F6B3F'], ['MEIOSIS II · SEPARATES SISTERS', 'background:var(--ink);color:#fff']], [
  ['pair', 'Homologues pair up', '<b>Prophase I</b> · zygotene', 0, 0, wt('W2', 'Meiosis')], ['cut', 'The centromeres split', '<b>Anaphase II</b>', 1, 0, wt('W3', 'Meiosis')],
  ['swap', 'Crossing over', '<b>Prophase I</b> · pachytene', 0, 1, wt('W4', 'Meiosis')], ['ana', 'Sister chromatids to the poles', '<b>Anaphase II</b>', 1, 1, wt('W5', 'Meiosis')],
  ['line', 'Bivalents line up at the equator', '<b>Metaphase I</b>', 0, 2, wt('W6', 'Meiosis')], ['four', 'Four haploid cells form', '<b>Telophase II</b> + cytokinesis', 1, 2, wt('W7', 'Meiosis')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ [[70, 'S PHASE', 'COPY', C.ok], [190, 'MEIOSIS I', '', C.ink], [320, 'INTERKINESIS', 'NO COPY', C.red], [450, 'MEIOSIS II', '', C.ink]].forEach(([x, a, b, c], i) => { mk(TP, 'circle', { cx: x, cy: 120, r: 16, fill: i === 2 ? '#FBE6E6' : C.soft, stroke: c, 'stroke-width': 3 });
    txt(TP, x, 166, a, { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.1, fill: C.ink, 'font-weight': 600 }); if (b) txt(TP, x, 190, b, { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.1, fill: c, 'font-weight': 600 }); if (i < 3) mk(TP, 'path', { d: `M${x + 22},120 L${x + 104},120`, stroke: C.dim, 'stroke-width': 3 }); }); }

const EP = {
  jobs: [['one', 'One cell', 'THE START', 'One'], ['two', 'Two divisions', 'IN A ROW', 'Two'], ['four', 'Four new cells', 'EACH ONE HAPLOID', 'Four']],
  learn: [['walk', 'Meiosis II', 'walk'], ['help', 'Why it matters', 'matters'], ['dna', 'For all life', 'every']],
  hookW: 'puzzles', split: ['chromatids', 'pulls'], st: ['Meiosis', 'sisters'],
  cam: [],
  hook: t => { M.vis(HL.m, t, tMorph + 0.4, 1e9, { ...POP, sc: 0.6 }); M.vis(HL.n[0], t, wt('H2', 'one') - 0.2, 1e9, POP); M.draw(HL.ar, t, wt('H2', 'four') - 0.4, 0.4); M.vis(HL.t, t, wt('H2', 'four') - 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis(HL.n[1], t, wt('H2', 'four'), 1e9, POP);
    M.vis($('#hlt0'), t, wt('H2', 'groups'), 1e9, POP); M.vis($('#hlt1'), t, wt('H2', 'one'), 1e9, POP); M.vis($('#hlP'), t, T0('H3') + 0.3, 1e9, POP); },
  measure: () => { [['hlt0', 520, 418], ['hlt1', 170, 418]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); DL.c.forEach((c, i) => { M.vis(c.G, t, wt('D2', 'two') - 0.1 + i * 0.2, 1e9, { ...POP, sc: 0.7 }); c.set(c.st, t); });
      DL.t.forEach((e, i) => M.vis(e, t, wt('D2', 'n') + i * 0.2, 1e9, POP)); labRun(DL.L, t, wt('D2', 'sister')); M.vis($('#dlP'), t, wt('D3', 'interkinesis'), 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.a, t, T0('D4') + 0.1, 1e9, { ...POP, sc: 0.6 }); M.draw(DR.ar, t, wt('D4', 'separates') - 0.3, 0.4);
      M.vis(DR.b, t, wt('D4', 'separates'), 1e9, { ...POP, sc: 0.6 }); M.vis(DR.t, t, wt('D4', 'equational') - 0.2, 1e9, POP); M.vis($('#drP'), t, wt('D4', 'mitosis'), 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] }); ZG.cell.set(ZG.cell.st, t); avZ(t, wt('Z5', 'kinetochore') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]); const s = kfRun(KF, t);
      PP.c.forEach((c, i) => { M.vis(c.G, t, T0('P1') + 0.3 + i * 0.2, 1e9, { ...POP, sc: 0.8 }); c.set(s, t); });
      labRun(PP.L[0], t, wt('P4', 'sister') + 0.3, tPs[3]); M.vis(PP.f, t, wt('P6', 'four') - 0.1, 1e9, POP); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.p, t, wt('C2', 'same') - 0.2, 1e9, { dy: 16 }); M.draw(CL.a1, t, wt('C2', 'Gametes') - 0.3, 0.5); M.vis(CL.m, t, wt('C2', 'half') - 0.2, 1e9, POP);
      M.vis(CL.g, t, wt('C2', 'Gametes'), 1e9, { dy: 16 }); M.draw(CL.a2, t, wt('C2', 'fertilisation') - 0.2, 0.5); M.vis(CL.f, t, wt('C2', 'fertilisation'), 1e9, POP); M.vis(CL.z, t, wt('C2', 'joins'), 1e9, { dy: 16 });
      [CL.p, CL.g, CL.z].forEach(g => attr(g, 'transform', t > wt('C3', 'twenty') - 0.2 && t < T0('C4') ? `translate(0 ${(-3 * Math.abs(Math.sin(t * 3))).toFixed(2)})` : ''));
      M.vis($('#cr'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(CR.sum, t, wt('C3', 'Sperm') - 0.1, T0('C4') - 0.1, { ...POP, outDur: 0.25 }); $('#crL').textContent = t < T0('C4') - 0.1 ? 'IN HUMANS' : '2 · VARIETY'; CR.g.forEach((g, i) => M.vis(g, t, T0('C4') + 0.3 + i * 0.25, 1e9, { ...POP, sc: 0.6 })); M.vis(CR.t, t, wt('C4', 'variety'), 1e9, POP);
      M.vis(CR.k[0], t, wt('C4', 'Crossing') - 0.1, 1e9, { dy: 12 }); M.vis(CR.k[1], t, wt('C5', 'random') - 0.2, 1e9, { dy: 12 }); M.vis($('#crP'), t, wt('C5', 'evolution') - 0.2, 1e9, POP); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Meiosis') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'centromeres') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'The DNA is copied again before meiosis II', right: 'No copying in interkinesis: DNA copied once, before meiosis I', tRight: wt('X3', 'once') - 0.1,
    type: 'Meiosis I vs II differences; interkinesis; significance of meiosis', tType: wt('E1', 'differences'),
    xRun: t => M.vis(TP, t, wt('X3', 'interkinesis') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement is true for <b>anaphase II</b>, but <b>not</b> for anaphase I?', cols: 1, optW: 968, optH: 66, optFs: 26, optY: 210, qW: 900,
      opts: ['The centromeres split and sister chromatids separate', 'Homologous chromosomes move to opposite poles', 'The chromosome number is halved', 'Chiasmata are terminalised'], right: 0 },
    tOpts: wt('Q1', 'question') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['Anaphase II: <b>centromeres split</b>'], ['Homologues, halving: <b>anaphase I</b>'], ['Terminalisation: <b>diakinesis</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'centromere'), wt('A3', 'Homologues'), wt('A3', 'terminalisation')],
    recapT: 'Recap · meiosis II and significance of meiosis',
    recap: ['<b>Interkinesis</b>: a short pause, no DNA copying · <b>meiosis II</b> resembles mitosis', '<b>Prophase II</b>: compact again, nuclear membrane gone · <b>metaphase II</b>: fibres on sister kinetochores',
      '<b>Anaphase II</b>: centromeres split, sisters to poles · <b>telophase II</b>: envelopes form, cytokinesis', '<b>Result</b>: a tetrad of cells, four haploid daughter cells from one cell',
      '<b>Significance</b>: keeps the chromosome number across generations · creates variation for evolution'],
    yq: ['What separates in anaphase II?', 'Is the DNA copied during interkinesis?', 'Give two reasons why meiosis is important.'],
    nextL: 'NEXT · EP 80', nextT: 'How does a leaf turn light into food? Photosynthesis in Higher Plants' },
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
