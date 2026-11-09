// PUC Biology Ep 75: The Cell Cycle and its Phases (Living diagram, leaf green)
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

/* ===== Ep 75: The Cell Cycle and its Phases ===== */
Object.assign(M.IC, {
  band: ['M5 15L15 5a3 3 0 0 1 4 4L9 19a3 3 0 0 1-4-4Z', 'M10 10h.01M12 12h.01M14 10h.01M10 14h.01'],
  baby: [ci(12, 7, 4), 'M5 21c0-4 3-7 7-7s7 3 7 7'],
  root: ['M12 3v12', 'M12 15c0 3-1 5-2 6h4c-1-1-2-3-2-6Z', 'M12 8c-2 1-4 3-5 5M12 10c2 1 4 3 5 5'],
  find: [ci(10, 10, 6), 'M14.5 14.5L20 20'],
  cyc: ['M20 12a8 8 0 1 1-2.4-5.7', 'M20 3v4h-4'],
  dna: ['M8 3c0 5 8 7 8 12s-8 4-8 6', 'M16 3c0 5-8 7-8 12s8 4 8 6', 'M9 7h6M9 17h6'],
  split: [ci(7, 12, 4), ci(17, 12, 4)],
  grow: [ci(12, 12, 4), ci(12, 12, 8)],
  cen: ['M8 6v12M16 6v12', 'M6 12h4M14 12h4'],
  prot: ['M5 12c0-4 3-6 7-6s7 2 7 6-3 6-7 6', 'M5 12h4', ci(12, 12, 2)],
  env: [ci(12, 12, 8), 'M8 8l8 8'],
});
const sv = id => $('#' + id);
const SKIN = '#F2C9A8', SKS = '#B9825E', DERM = '#F7E1CC', SOIL = '#E9DCC3', WALL = '#4E7A34', CYT = '#DCEFD4', MER = '#B9E0A8', CAP = '#C9A06A', BULB = '#E8D3A8';
const PH = { G1: '#8CC48F', S: VIO, G2: '#5AA0C8', M: '#E58A3C' };
const CH4 = [[100, VIO], [100, LIL], [62, VIO], [62, LIL]];
const CHT = CH4.flatMap(([L, c]) => [{ L, c }, { L, c }]);
// chromosome layouts for 2n = 4
const CN = [[-34, -24, 60], [32, 28, 125], [-24, 46, 15], [40, -38, 160]];
const lay = { G1: CN.flatMap(([x, y, a]) => sis(x, y, a, 0, [1, 0])), S: CN.flatMap(([x, y, a]) => sis(x, y, a, 4)), PRO: CN.flatMap(([x, y, a]) => sis(x * 0.9, y * 0.9, a, 7)),
  MET: [-108, -18, 58, 118].flatMap(y => sis(0, y, 90, 7)), ANA: [-108, -18, 58, 118].flatMap(y => [goP(112, y * 0.62, 1), goP(-112, y * 0.62, -1)]),
  TEL: [-108, -18, 58, 118].flatMap(y => [goP(154, y * 0.34, 1, 4), goP(-154, y * 0.34, -1, 4)]) };

/* ---------- H: the scraped knee ---------- */
const hl = sv('hlS'), HL = {};
mk(hl, 'rect', { x: 36, y: 316, width: 712, height: 96, rx: 8, fill: DERM });
HL.cells = []; for (let k = 0; k < 13; k++) { const x = 52 + k * 52, g = mk(hl, 'g', {}); mk(g, 'rect', { x, y: 238, width: 50, height: 74, rx: 10, fill: SKIN, stroke: SKS, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x + 25, cy: 275, r: 9, fill: NUC }); g.k = k; HL.cells.push(g); }
HL.gap = mk(hl, 'path', { d: 'M260,236 L260,312 M472,236 L472,312', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
HL.ar = mk(hl, 'path', { d: 'M366,150 L366,200 M354,188 L366,200 L378,188', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const GAPK = [4, 5, 6, 7];

/* ---------- D: what a cell cycle is + how long ---------- */
const dl = sv('dlS'), DL = {};
const mini = (g, x, y, r, two) => { mk(g, 'circle', { cx: x, cy: y, r, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: r * 0.42, fill: NUF, stroke: VIO, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${x - r * 0.22},${y - r * 0.18} q${r * 0.1},${r * 0.2} ${r * 0.2},0 t${r * 0.2},0`, stroke: VIO, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  if (two) mk(g, 'path', { d: `M${x - r * 0.22},${y + r * 0.1} q${r * 0.1},${r * 0.2} ${r * 0.2},0 t${r * 0.2},0`, stroke: LIL, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); };
DL.a = mk(dl, 'g', {}); mini(DL.a, 140, 270, 74, 0);
DL.b = mk(dl, 'g', {}); mini(DL.b, 392, 270, 86, 1);
DL.c = mk(dl, 'g', {}); mini(DL.c, 620, 200, 58, 0); mini(DL.c, 620, 350, 58, 0);
DL.ar = [[230, 270, 290], [494, 250, 546]].map(([x1, y, x2]) => mk(dl, 'path', { d: `M${x1},${y} L${x2},${y} M${x2 - 12},${y - 12} L${x2},${y} L${x2 - 12},${y + 12}`, stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
DL.L = [lab(dl, 140, 344, 90, 410, 'One cell', 'middle'), lab(dl, 392, 356, 392, 410, 'DNA copied', 'middle'), lab(dl, 662, 380, 640, 410, 'Two daughters', 'middle')];
const dr = sv('drS'), DR = {};
DR.r = [[220, 'HUMAN CELL', '24', 'HOURS'], [564, 'YEAST', '90', 'MINUTES']].map(([x, n, v, u]) => { const g = mk(dr, 'g', {}); mk(g, 'circle', { cx: x, cy: 270, r: 120, fill: 'none', stroke: C.soft, 'stroke-width': 22 });
  const arc = mk(g, 'circle', { cx: x, cy: 270, r: 120, fill: 'none', stroke: C.ac, 'stroke-width': 22, transform: `rotate(-90 ${x} 270)`, 'stroke-linecap': 'round' });
  txt(g, x, 280, v, { 'text-anchor': 'middle', 'font-size': 64, 'font-weight': 600, fill: C.ink }); txt(g, x, 320, u, { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.mute, 'font-weight': 600 });
  txt(g, x, 436, n, { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 }); return { g, arc }; });
DR.r.forEach(r => { const L = 2 * Math.PI * 120; attr(r.arc, 'stroke-dasharray', `${L} ${L}`); r.L = L; });

/* ---------- Z: zoom ladder ONION ROOT -> ROOT TIP -> NUCLEUS -> DNA ---------- */
const ZN = ['ONION ROOT', 'ROOT TIP', 'NUCLEUS', 'DNA'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Onion root', 'It grows longer at its tip.', 'The tip: cells divide fast'],
  ['RUNG 2 OF 4', 'Root tip', 'Most cells look calm. A few look busy.', 'Busy = dark threads'],
  ['RUNG 3 OF 4', 'Nucleus', 'Not resting: getting ready to divide.', ''],
  ['RUNG 4 OF 4', 'DNA', 'The instruction book of the cell.', 'Copied before every division']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'rect', { x: 0, y: 150, width: 1056, height: 376, fill: '#E4F0F7' }); mk(g, 'path', { d: 'M0,150 L1056,150', stroke: '#5AA0C8', 'stroke-width': 3 });
  mk(g, 'path', { d: 'M528,40 C600,40 650,90 640,140 C630,170 590,180 528,180 C466,180 426,170 416,140 C406,90 456,40 528,40 Z', fill: BULB, stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M528,40 C520,20 524,8 534,0', stroke: '#8CC48F', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M470,70 C490,110 500,150 510,176 M586,70 C566,110 556,150 546,176', stroke: '#C9A877', 'stroke-width': 2.5, fill: 'none' });
  [[-70, 380], [-36, 440], [0, 470], [36, 430], [70, 370]].forEach(([dx, y]) => mk(g, 'path', { d: `M${528 + dx * 0.6},178 C${528 + dx * 0.8},${(178 + y) / 2} ${528 + dx},${y - 40} ${528 + dx},${y}`, stroke: '#E9E1CF', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' }));
  mk(g, 'ellipse', { cx: 528, cy: 470, rx: 7, ry: 11, fill: CAP, stroke: BR, 'stroke-width': 2 });
  LB[0] = [lab(g, 563, 380, 700, 330, 'Root'), lab(g, 536, 468, 700, 450, 'Root tip')]; }
{ const g = ZG[1]; mk(g, 'path', { d: 'M360,0 L360,330 C360,420 440,470 528,476 C616,470 696,420 696,330 L696,0 Z', fill: CYT, stroke: WALL, 'stroke-width': 4 }); ZG.busy = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const x = 376 + c * 51, y = 16 + r * 64; mk(g, 'rect', { x, y, width: 51, height: 64, fill: MER, stroke: WALL, 'stroke-width': 1.6 });
    const busy = (r === 1 && c === 4) || (r === 3 && c === 1); if (busy) { [-8, 0, 8].forEach(dx => mk(g, 'path', { d: `M${x + 25 + dx},${y + 18} L${x + 25 + dx},${y + 46}`, stroke: VIO, 'stroke-width': 4, 'stroke-linecap': 'round' })); ZG.busy.push([x + 25, y + 32]); }
    else mk(g, 'circle', { cx: x + 25, cy: y + 32, r: 12, fill: NUF, stroke: VIO, 'stroke-width': 2 }); }
  mk(g, 'path', { d: 'M350,380 C360,450 470,500 528,502 C586,500 696,450 706,380 C640,410 590,420 528,420 C466,420 416,410 350,380 Z', fill: CAP, stroke: BR, 'stroke-width': 3.5 });
  LB[1] = [lab(g, 503, 240, 230, 260, 'Calm cell', 'end', null, 24), lab(g, 605, 112, 760, 90, 'Busy cell', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'rect', { x: 200, y: 30, width: 656, height: 466, rx: 18, fill: MER, stroke: WALL, 'stroke-width': 4 }); mk(g, 'circle', { cx: 528, cy: 263, r: 170, fill: NUF, stroke: VIO, 'stroke-width': 5 });
  ZG.thr = []; for (let k = 0; k < 6; k++) ZG.thr.push(mk(g, 'path', { d: '', stroke: k % 2 ? LIL : VIO, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }));
  mk(g, 'circle', { cx: 600, cy: 200, r: 34, fill: '#5B3470' });
  LB[2] = [lab(g, 380, 330, 250, 440, 'Nucleus', 'end', null, 24), lab(g, 626, 186, 800, 120, 'Nucleolus', 'start', null, 24)]; }
{ const g = ZG[3]; ZG.dna = mk(g, 'g', {}); ZG.rung = [];
  for (let k = 0; k < 15; k++) { const x = 170 + k * 50; ZG.rung.push(mk(ZG.dna, 'path', { d: '', stroke: k % 3 ? '#C9962B' : '#5AA0C8', 'stroke-width': 7, 'stroke-linecap': 'round' })); }
  ZG.s1 = mk(ZG.dna, 'path', { d: '', stroke: VIO, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }); ZG.s2 = mk(ZG.dna, 'path', { d: '', stroke: LIL, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  LB[3] = [lab(g, 245, 205, 245, 80, 'DNA', 'middle', null, 26)]; }
const FOC = [[528, 470, 40], [528, 160, 70], [528, 263, 60], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'root'), wt('Z2', 'tip')], [wt('Z3', 'calm'), wt('Z3', 'busy')], [wt('Z4', 'nucleus'), wt('Z4', 'getting')], [wt('Z5', 'DNA')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Busy, not resting!' });

/* ---------- P: one full cell cycle ---------- */
const PN = ['G1', 'S', 'G2', 'M', 'G1 AGAIN'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE CELL', 'One full turn', 'Watch the cell and the wheel.', ''], ['PHASE 1 OF 4', 'G1 · gap', 'Grows and works. No DNA copying yet.', 'G stands for gap'],
  ['PHASE 2 OF 4', 'S · synthesis', 'DNA copied: 2C becomes 4C.', 'Centriole copied (animal cells)'], ['PHASE 3 OF 4', 'G2 · gap', 'Keeps growing, makes proteins for division.', ''],
  ['PHASE 4 OF 4', 'M · mitosis', 'Chromosomes shared out, the cell splits in two.', ''], ['AND AGAIN', 'Back to G1', 'Each daughter starts a new turn.', 'That is why it is a cycle']]);
const ps = sv('pS'), PP = {};
PP.cell = cellSim(ps, { x: 330, y: 288, s: 0.8, CH: CHT });
const WX = 826, WY = 246, WR = 124, SEG = [['G1', 0, 150], ['S', 150, 110], ['G2', 260, 70], ['M', 330, 30]];
const arcD = (a0, a1, r = WR) => { const p0 = P2(WX, WY, r, a0 - 90), p1 = P2(WX, WY, r, a1 - 90); return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const rad = a => a * Math.PI / 180, P2 = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
PP.whl = mk(ps, 'g', {}); PP.seg = SEG.map(([n, a0, sp]) => { const p = mk(PP.whl, 'path', { d: arcD(a0 + 2, a0 + sp - 2), stroke: PH[n], 'stroke-width': 40, fill: 'none' }); const [lx, ly] = P2(WX, WY, WR, a0 + sp / 2 - 90);
  txt(PP.whl, lx, ly + 8, n, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: '#fff' }); return p; });
PP.ptr = mk(PP.whl, 'circle', { r: 13, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
PP.ctr = txt(PP.whl, WX, WY + 10, 'G1', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 600, fill: C.ink });
txt(PP.whl, WX, WY + 168, 'WHEEL NOT TO SCALE', { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.4, fill: C.dim, 'font-weight': 600 });
PP.dna = mk(ps, 'g', {}); mk(PP.dna, 'rect', { x: 666, y: 436, width: 320, height: 62, rx: 12, fill: C.soft }); txt(PP.dna, 688, 476, 'DNA PER CELL', { 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
PP.dv = txt(PP.dna, 964, 480, '2C', { 'text-anchor': 'end', 'font-size': 34, 'font-weight': 600, fill: VIO });
const tCop = wt('P3', 'copied'), tShr = wt('P5', 'shared'), tSpl = wt('P5', 'splits');
const KF = [Object.assign({}, S0, { cen2: 0, c: lay.G1 }), { t: tPs[0] + 0.3, d: 2.4, grow: 1 },
  { t: tCop - 0.1, d: 1.6, c: lay.S }, { t: wt('P3', 'centriole') - 0.1, d: 0.9, cen2: 1 }, { t: tPs[2] + 0.2, d: 2, grow: 1.5 },
  { t: tPs[3] + 0.1, d: 1.3, cond: 1, sp: 1, ast: 1, env: 0, nuc: 0, org: 0.25, c: lay.PRO }, { t: tShr - 0.9, d: 0.9, c: lay.MET, fib: 1, pl: 1 },
  { t: tShr + 0.3, d: 1.1, c: lay.ANA, pl: 0 }, { t: tSpl - 0.5, d: 0.8, c: lay.TEL, cond: 0.25, env2: 1, fib: 0, ast: 0, org: 0.6 }, { t: wt('P5', 'two') - 0.2, d: 0.8, fur: 1 },
  { t: wt('P5', 'two') + 0.6, d: 0.7, apart: 1, grow: 0, org: 0 }];

/* ---------- C: interphase vs M phase + G0 ---------- */
const cl = sv('clS'), CL = {};
CL.b = []; for (let k = 0; k < 24; k++) CL.b.push(mk(cl, 'rect', { x: 52 + k * 28.5, y: 210, width: 26, height: 96, rx: 5, fill: k < 23 ? PH.G1 : PH.M }));
CL.br1 = mk(cl, 'path', { d: 'M52,186 L52,172 L704,172 L704,186', stroke: C.ink, 'stroke-width': 3, fill: 'none' }); CL.t1 = txt(cl, 378, 156, 'INTERPHASE · G1 + S + G2', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.4, fill: C.ink, 'font-weight': 600 });
CL.br2 = mk(cl, 'path', { d: 'M710,330 L710,344 L736,344 L736,330', stroke: PH.M, 'stroke-width': 3, fill: 'none' }); CL.t2 = txt(cl, 723, 372, 'M', { 'text-anchor': 'middle', 'font-size': 22, fill: PH.M, 'font-weight': 600 });
CL.ax = txt(cl, 52, 340, '0 h', { 'font-size': 16, fill: C.mute }); CL.ax2 = txt(cl, 690, 400, '24 h', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute });
CL.big = txt(cl, 52, 440, 'INTERPHASE > 95%', { 'font-size': 44, 'font-weight': 600, fill: C.ink }); CL.big2 = txt(cl, 52, 476, 'M PHASE · ABOUT 1 HOUR OF 24', { 'font-size': 20, 'letter-spacing': 1.4, fill: PH.M, 'font-weight': 600 });
const cr = sv('crS'), CR = {};
CR.w = mk(cr, 'g', {}); SEG.forEach(([n, a0, sp]) => { const r = 100, cx = 230, cy = 290, p0 = P2(cx, cy, r, a0 + 2 - 90), p1 = P2(cx, cy, r, a0 + sp - 2 - 90);
  mk(CR.w, 'path', { d: `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${sp > 180 ? 1 : 0} 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`, stroke: PH[n], 'stroke-width': 32, fill: 'none' });
  const [lx, ly] = P2(cx, cy, r, a0 + sp / 2 - 90); txt(CR.w, lx, ly + 7, n, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: '#fff' }); });
CR.ex = mk(cr, 'path', { d: 'M318,250 C380,230 420,230 470,240 M456,226 L470,240 L454,252', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
CR.box = mk(cr, 'g', {}); mk(CR.box, 'rect', { x: 480, y: 170, width: 260, height: 220, rx: 16, fill: C.soft }); txt(CR.box, 610, 214, 'G0', { 'text-anchor': 'middle', 'font-size': 36, 'font-weight': 600, fill: C.ink });
txt(CR.box, 610, 244, 'QUIESCENT STAGE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
CR.qc = mk(CR.box, 'g', {}); mk(CR.qc, 'circle', { cx: 610, cy: 316, r: 46, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); mk(CR.qc, 'circle', { cx: 610, cy: 316, r: 19, fill: NUF, stroke: VIO, 'stroke-width': 2.5 });
CR.L = [lab(cr, 652, 330, 560, 450, 'Alive and working', 'middle')];

/* ---------- V: G1 vs G2 ---------- */
const thr = (s, y, c) => mk(s, 'path', { d: `M25,${y} q10,-14 20,0 t20,0 t20,0 t20,0`, stroke: c, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const cV = cmp($('#vc'), ['G1 · BEFORE S', 'G2 · AFTER S'], [
  ['', 'When', 'Before the DNA is copied', 'After the DNA is copied', wt('V1', 'before'), wt('V1', 'after'), s => thr(s, 50, VIO), s => { thr(s, 40, VIO); thr(s, 62, VIO); }],
  ['', 'DNA', '2C', '4C · double', wt('V2', 'two'), wt('V2', 'four'), s => mk(s, 'rect', { x: 30, y: 60, width: 30, height: 30, rx: 4, fill: VIO }), s => { mk(s, 'rect', { x: 30, y: 60, width: 30, height: 30, rx: 4, fill: VIO }); mk(s, 'rect', { x: 30, y: 26, width: 30, height: 30, rx: 4, fill: VIO }); }],
  ['', 'Chromosomes', '2n · one chromatid each', '2n · two chromatids each', wt('V3', 'both'), wt('V3', 'Copying'), s => mk(s, 'path', { d: 'M65,16 L65,84', stroke: VIO, 'stroke-width': 10, 'stroke-linecap': 'round' }),
    s => { mk(s, 'path', { d: 'M57,16 Q64,50 57,84 M73,16 Q66,50 73,84', stroke: VIO, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' }); mk(s, 'circle', { cx: 65, cy: 50, r: 5, fill: C.ink }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A cell has just finished S phase. Which phase is it in now, and how much DNA does it have?', opts: ['G1 · 2C', 'G2 · 4C', 'M · 2C'], right: 1, why: 'G2, with 4C. The DNA was copied in S phase, so now it is double.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['INTERPHASE · G1, S, G2', 'background:var(--ac2);color:#1F6B3F'], ['M PHASE · THE DIVISION', 'background:var(--ink);color:#fff']], [
  ['dna', 'The DNA is copied', '<b>S phase</b>', 0, 0, wt('W2', 'Interphase')], ['split', 'Chromosomes pulled apart', '<b>M phase</b>', 1, 0, wt('W3', 'M')],
  ['grow', 'Grows, before copying DNA', '<b>G1</b>', 0, 1, wt('W4', 'Interphase')], ['split', 'Splits into two cells', '<b>M phase</b>', 1, 1, wt('W5', 'M')],
  ['env', 'Nuclear envelope breaks down', '<b>M phase</b> · prophase', 1, 2, wt('W6', 'M')], ['prot', 'Proteins for division made', '<b>G2</b>', 0, 2, wt('W7', 'Interphase')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'path', { d: 'M110,70 L110,170', stroke: VIO, 'stroke-width': 14, 'stroke-linecap': 'round' }); txt(TP, 110, 214, '2C · 2n', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ink });
  mk(TP, 'path', { d: 'M170,120 L230,120 M218,108 L230,120 L218,132', stroke: C.ink, 'stroke-width': 3, fill: 'none' }); txt(TP, 200, 100, 'S', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: VIO });
  mk(TP, 'path', { d: 'M282,70 Q296,120 282,170 M310,70 Q296,120 310,170', stroke: VIO, 'stroke-width': 13, fill: 'none', 'stroke-linecap': 'round' }); mk(TP, 'circle', { cx: 296, cy: 120, r: 6, fill: C.ink });
  txt(TP, 296, 214, '4C · STILL 2n', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ac }); }

const EP = {
  jobs: [['band', 'A scraped knee', 'HEALS IN A WEEK', 'knee'], ['baby', 'A growing baby', 'MORE CELLS', 'baby'], ['root', 'An onion root', 'GETS LONGER', 'onion']],
  learn: [['find', 'Name', 'name'], ['cyc', 'In order', 'order'], ['dna', 'Each one', 'each']],
  hookW: 'doctor', split: ['divided', 'cycle'], st: ['S', 'chromosomes'],
  cam: [[tPs[3] - 0.3, 1.03, 960, 560], [T0('C1') - 0.7, 1, 960, 540]],
  hook: t => { const tw = wt('H2', 'week'); M.vis($('#hlt0'), t, wt('H2', 'scraped'), 1e9, POP); M.draw(HL.gap, t, wt('H2', 'knee') - 0.2, 0.5);
    HL.cells.forEach((g, k) => { const gi = GAPK.indexOf(k); if (gi < 0) M.vis(g, t, tMorph + 0.5 + k * 0.03, 1e9, { ...POP, sc: 0.6 }); else M.vis(g, t, tw + 0.2 + gi * 0.45, 1e9, { ...POP, sc: 0.2 }); });
    M.draw(HL.ar, t, tw - 0.3, 0.4); M.vis($('#hlt1'), t, wt('H2', 'completely') - 0.2, 1e9, POP); M.vis($('#hlP'), t, T0('H3') + 0.3, 1e9, POP); },
  measure: () => { [['hlt0', 200, 430], ['hlt1', 560, 430]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.a, t, wt('D2', 'cell') - 0.2, 1e9, { ...POP, sc: 0.5 }); M.draw(DL.ar[0], t, wt('D2', 'copies'), 0.4);
      M.vis(DL.b, t, wt('D2', 'DNA') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.draw(DL.ar[1], t, wt('D2', 'divides') - 0.2, 0.4); M.vis(DL.c, t, wt('D2', 'daughter') - 0.2, 1e9, { ...POP, sc: 0.5 });
      labRun(DL.L[0], t, wt('D2', 'cell') + 0.2); labRun(DL.L[1], t, wt('D2', 'DNA') + 0.2); labRun(DL.L[2], t, wt('D3', 'Daughter')); M.vis($('#dlP'), t, wt('D3', 'same') - 0.2, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); const ta = wt('D4', 'twenty'), tb = wt('D4', 'ninety');
      DR.r.forEach((r, i) => { const t0 = i ? tb : ta; M.vis(r.g, t, t0 - 0.6, 1e9, { ...POP, sc: 0.7 }); attr(r.arc, 'stroke-dashoffset', (r.L * (1 - M.io((t - t0 + 0.2) / 1.4))).toFixed(1)); });
      M.vis($('#drP'), t, wt('D4', 'lab'), 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      ZG.thr.forEach((p, k) => { const y0 = 170 + k * 34, ph = t * 1.1 + k; attr(p, 'd', `M${400 + (k % 2) * 30},${y0} q30,${(-22 * Math.sin(ph)).toFixed(1)} 60,0 t60,0 t60,0 t60,0`); });
      const dk = (t - tZ[3]) * 1.6; attr(ZG.s1, 'd', Array.from({ length: 31 }, (_, i) => `${i ? 'L' : 'M'}${170 + i * 24},${(263 + 70 * Math.sin(i * 0.5 + dk)).toFixed(1)}`).join(' '));
      attr(ZG.s2, 'd', Array.from({ length: 31 }, (_, i) => `${i ? 'L' : 'M'}${170 + i * 24},${(263 - 70 * Math.sin(i * 0.5 + dk)).toFixed(1)}`).join(' '));
      ZG.rung.forEach((r, k) => { const x = 170 + k * 50, yy = 70 * Math.sin(k * 50 / 24 * 0.5 + dk); attr(r, 'd', `M${x},${(263 - yy).toFixed(1)} L${x},${(263 + yy).toFixed(1)}`); });
      avZ(t, wt('Z4', 'resting') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PP.cell.G, t, T0('P1') + 0.3, 1e9, { ...POP, sc: 0.8 }); PP.cell.set(kfRun(KF, t), t);
      M.vis(PP.whl, t, T0('P1') + 0.6, 1e9, { ...POP, sc: 0.8 }); M.vis(PP.dna, t, tPs[1] - 0.3, 1e9, { dy: 16 });
      const k = Math.max(0, Math.min(3, st === 4 ? 0 : st)), [, a0, sp] = SEG[k], nx = k < 3 ? T0(['P3', 'P4', 'P5', 'P6'][k]) : T0('P6'), p = st < 0 ? 0 : st === 4 ? M.clamp((t - tPs[4]) / 3) * 0.3 : M.clamp((t - tPs[k]) / (nx - tPs[k]));
      const [px, py] = P2(WX, WY, WR, a0 + sp * p - 90); attr(PP.ptr, 'cx', px.toFixed(1)); attr(PP.ptr, 'cy', py.toFixed(1)); PP.ctr.textContent = SEG[k][0]; attr(PP.ctr, 'fill', PH[SEG[k][0]]);
      PP.seg.forEach((s, i) => attr(s, 'stroke-width', i === k && st >= 0 ? (40 + 6 * Math.abs(Math.sin(t * 3))).toFixed(1) : 40));
      const dn = t < tCop + 0.4 ? '2C' : t < tSpl + 0.3 ? '4C' : '2C'; PP.dv.textContent = dn; }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); const tb = wt('C2', 'Interphase');
      CL.b.forEach((b, k) => M.vis(b, t, k < 23 ? tb + k * 0.06 : wt('C3', 'M') - 0.1, 1e9, { dy: 16, sp: M.SOFT, fade: 0.1 }));
      M.draw(CL.br1, t, wt('C2', 'G') - 0.1, 0.6); M.vis(CL.t1, t, wt('C2', 'G'), 1e9, POP); M.draw(CL.br2, t, wt('C3', 'hour') - 0.4, 0.4); M.vis(CL.t2, t, wt('C3', 'hour') - 0.2, 1e9, POP);
      [CL.ax, CL.ax2].forEach(e => M.vis(e, t, tb, 1e9, { dy: 0, fade: 0.3 })); M.vis(CL.big, t, wt('C4', 'ninety') - 0.2, 1e9, POP); M.vis(CL.big2, t, wt('C4', 'ninety') + 0.3, 1e9, POP);
      attr(CL.b[23], 'fill', mix(PH.M, '#F6B37A', Math.abs(Math.sin(t * 3)) * (t > wt('C3', 'hour') ? 1 : 0)));
      M.vis($('#cr'), t, T0('C2') + 0.4, out, { dx: 60, dy: 0, ...o }); M.vis(CR.w, t, T0('C2') + 0.6, 1e9, { ...POP, sc: 0.8 }); M.draw(CR.ex, t, wt('C5', 'leave') - 0.1, 0.6);
      M.vis(CR.box, t, wt('C5', 'quiet') - 0.2, 1e9, { ...POP, sc: 0.8 }); attr(CR.qc, 'transform', `translate(0 ${(3 * Math.sin(t * 2)).toFixed(2)})`); labRun(CR.L[0], t, wt('C5', 'alive')); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'DNA') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'S phase doubles the number of chromosomes', right: 'DNA 2C to 4C, chromosome number stays 2n', tRight: wt('X3', 'chromosome') - 0.1,
    type: 'Order of phases; DNA content (C) in each phase; the G0 stage', tType: wt('E1', 'order'),
    xRun: t => M.vis(TP, t, wt('X3', 'DNA') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'A cell in G<sub>1</sub> has <b>2n = 8</b> chromosomes and <b>2C</b> DNA. In G<sub>2</sub>, the same cell has:', opts: ['2n = 8 and 4C DNA', '2n = 16 and 4C DNA', '2n = 8 and 2C DNA', '2n = 16 and 2C DNA'], right: 0 },
    tOpts: wt('Q1', 'question') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['S copies DNA: <b>2C → 4C</b>'], ['No new chromosomes: <b>2n = 8</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'two'), wt('A3', 'number')],
    recapT: 'Recap · the cell cycle and its phases',
    recap: ['<b>Cell cycle</b>: a cell copies its DNA, makes its parts and divides into two daughter cells', '<b>Interphase</b> = G1 + S + G2, over 95% of the cycle · <b>M phase</b> about 1 h of 24 h',
      '<b>G1</b> grows, no DNA copying · <b>S</b> DNA 2C → 4C, centriole copied · <b>G2</b> proteins for division', '<b>Chromosome number stays 2n</b> after S · each chromosome now has two chromatids',
      '<b>G0</b>: quiescent stage, alive and working, divides only when needed · yeast: about 90 min'],
    yq: ['Name the four phases of the cell cycle, in order.', 'What happens to the DNA in S phase?', 'What is the G0 stage?'],
    nextL: 'NEXT · EP 76', nextT: 'How does a cell pull its chromosomes apart? Mitosis' },
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
