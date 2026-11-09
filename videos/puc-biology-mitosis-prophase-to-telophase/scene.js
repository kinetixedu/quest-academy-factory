// PUC Biology Ep 76: Mitosis: Prophase to Telophase (Living diagram, leaf green)
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

/* ===== Ep 76: Mitosis: Prophase to Telophase ===== */
Object.assign(M.IC, {
  flip: ['M5 4h10l4 4v12H5Z', 'M9 4v16', 'M12 9h4M12 13h4'],
  scope: ['M9 3h4v9H9Z', 'M11 12v3', 'M5 21h14', 'M7 18h8', 'M15 8c3 1 4 4 3 7'],
  twin: [ci(7, 12, 4), ci(17, 12, 4), 'M7 10v4M17 10v4'],
  find: [ci(10, 10, 6), 'M14.5 14.5L20 20'],
  order: ['M4 6h4M4 12h8M4 18h12', 'M18 4v6', 'M16 8l2 2 2-2'],
  pro: ['M8 5c2 4-2 6 0 10s-2 4 0 4', 'M14 5c2 4-2 6 0 10s-2 4 0 4'],
  met: ['M12 3v18', 'M9 7h6M9 12h6M9 17h6'],
  ana: ['M4 12h4M16 12h4', 'M10 8l-3 4 3 4M14 8l3 4-3 4'],
  tel: [ci(6, 12, 4), ci(18, 12, 4), 'M12 6v12'],
  cen: ['M8 6v12M16 6v12', 'M6 12h4M14 12h4'],
});
const sv = id => $('#' + id);
const WALL = '#4E7A34', MER = '#B9E0A8', CYT = '#DCEFD4', CAP = '#C9A06A';
const CH4 = [[100, VIO], [100, LIL], [62, VIO], [62, LIL]];
const CHT = CH4.flatMap(([L, c]) => [{ L, c }, { L, c }]);
const CN = [[-34, -24, 60], [32, 28, 125], [-24, 46, 15], [40, -38, 160]], ROW = [-108, -18, 58, 118];
const lay = { S: CN.flatMap(([x, y, a]) => sis(x, y, a, 4)), PRO: CN.flatMap(([x, y, a]) => sis(x * 0.9, y * 0.9, a, 7)), MET: ROW.flatMap(y => sis(0, y, 90, 7)),
  ANA: ROW.flatMap(y => [goP(112, y * 0.62, 1), goP(-112, y * 0.62, -1)]), TEL: ROW.flatMap(y => [goP(154, y * 0.34, 1, 4), goP(-154, y * 0.34, -1, 4)]) };
// whole-cell states for each stage (used by the slide cards)
const ST = { I: { c: lay.S }, P: { cond: 0.75, sp: 0.8, ast: 1, env: 0.5, nuc: 0.3, org: 0.4, c: lay.PRO }, Mt: { cond: 1, sp: 1, ast: 1, env: 0, nuc: 0, org: 0, fib: 1, pl: 0, c: lay.MET },
  A: { cond: 1, sp: 1, ast: 1, env: 0, nuc: 0, org: 0, fib: 1, c: lay.ANA }, T: { cond: 0.2, sp: 1, ast: 0, env: 0, nuc: 0, org: 0.8, env2: 1, c: lay.TEL } };
const still = (host, x, y, s, st, plant) => { const c = cellSim(host, { x, y, s, CH: CHT, plant }); c.st = Object.assign({}, S0, st); return c; };

/* ---------- H: the slide ---------- */
const hl = sv('hlS'), HL = {};
HL.fld = mk(hl, 'circle', { cx: 392, cy: 262, r: 196, fill: '#FBFAF4', stroke: C.ink, 'stroke-width': 6 });
HL.c = [[312, 196, ST.I], [472, 196, ST.Mt], [312, 330, ST.A], [472, 330, ST.T]].map(([x, y, st]) => still(hl, x, y, 0.33, st));

/* ---------- D: what mitosis is + two steps ---------- */
const dl = sv('dlS'), DL = {};
const twoN = (g, x, y, r) => { mk(g, 'circle', { cx: x, cy: y, r, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); [[-14, 30, VIO], [-4, 30, LIL], [8, 18, VIO], [18, 18, LIL]].forEach(([dx, L, c]) => mk(g, 'path', { d: `M${x + dx},${y - L / 2} L${x + dx},${y + L / 2}`, stroke: c, 'stroke-width': 7, 'stroke-linecap': 'round' })); };
DL.a = mk(dl, 'g', {}); twoN(DL.a, 170, 270, 84); DL.b = mk(dl, 'g', {}); twoN(DL.b, 580, 180, 70); twoN(DL.b, 580, 370, 70);
DL.ar = mk(dl, 'path', { d: 'M270,250 C360,200 420,180 492,180 M270,290 C360,340 420,370 492,370 M480,168 L492,180 L480,192 M480,358 L492,370 L480,382', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
DL.t = [[170, 392, '2n = 4', 'middle'], [664, 188, '2n = 4', 'start'], [664, 378, '2n = 4', 'start']].map(([x, y, s, an]) => txt(dl, x, y, s, { 'text-anchor': an, 'font-size': 24, 'font-weight': 600, fill: VIO }));
const dr = sv('drS'), DR = {};
DR.r1 = mk(dr, 'g', {}); { const g = DR.r1; mk(g, 'ellipse', { cx: 200, cy: 190, rx: 130, ry: 86, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); [-1, 1].forEach(s => mk(g, 'circle', { cx: 200 + s * 56, cy: 190, r: 34, fill: NUF, stroke: VIO, 'stroke-width': 3 })); }
DR.r2 = mk(dr, 'g', {}); { const g = DR.r2; [-1, 1].forEach(s => { mk(g, 'ellipse', { cx: 200 + s * 70, cy: 382, rx: 64, ry: 70, fill: CYF, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: 200 + s * 70, cy: 382, r: 28, fill: NUF, stroke: VIO, 'stroke-width': 3 }); }); }
DR.t = [[390, 182, 'KARYOKINESIS', 'the nucleus divides', '1'], [390, 374, 'CYTOKINESIS', 'the cytoplasm divides', '2']].map(([x, y, a, b, n]) => { const g = mk(dr, 'g', {}); mk(g, 'circle', { cx: x + 18, cy: y - 8, r: 20, fill: C.ac });
  txt(g, x + 18, y, n, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: '#fff' }); txt(g, x + 52, y - 4, a, { 'font-size': 24, 'letter-spacing': 1.4, 'font-weight': 600, fill: C.ink }); txt(g, x + 52, y + 26, b, { 'font-size': 18, fill: C.mute }); return g; });

/* ---------- Z: zoom ladder ROOT TIP -> DIVIDING CELL -> CHROMOSOME -> CENTROMERE ---------- */
const ZN = ['ROOT TIP', 'DIVIDING CELL', 'CHROMOSOME', 'CENTROMERE'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Root tip', 'Cells divide fast here.', ''],
  ['RUNG 2 OF 4', 'Dividing cell', 'Thick chromosomes, easy to see.', ''],
  ['RUNG 3 OF 4', 'Chromosome', 'Two sister chromatids, copied in S phase.', ''],
  ['RUNG 4 OF 4', 'Centromere', 'Kinetochores sit on its surface.', 'Spindle fibres hook on here']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'path', { d: 'M360,0 L360,330 C360,420 440,470 528,476 C616,470 696,420 696,330 L696,0 Z', fill: CYT, stroke: WALL, 'stroke-width': 4 });
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const x = 376 + c * 51, y = 16 + r * 64; mk(g, 'rect', { x, y, width: 51, height: 64, fill: MER, stroke: WALL, 'stroke-width': 1.6 });
    if (r === 2 && c === 3) [-8, 0, 8].forEach(dx => mk(g, 'path', { d: `M${x + 25 + dx},${y + 18} L${x + 25 + dx},${y + 46}`, stroke: VIO, 'stroke-width': 4, 'stroke-linecap': 'round' }));
    else mk(g, 'circle', { cx: x + 25, cy: y + 32, r: 12, fill: NUF, stroke: VIO, 'stroke-width': 2 }); }
  mk(g, 'path', { d: 'M350,380 C360,450 470,500 528,502 C586,500 696,450 706,380 C640,410 590,420 528,420 C466,420 416,410 350,380 Z', fill: CAP, stroke: BR, 'stroke-width': 3.5 });
  LB[0] = [lab(g, 700, 300, 780, 360, 'Root tip', 'start', null, 24), lab(g, 560, 176, 780, 120, 'Dividing cell', 'start', null, 24)]; }
ZG.cell = still(ZG[1], 528, 263, 1.0, { cond: 1, sp: 1, ast: 1, env: 0, nuc: 0, org: 0, c: lay.PRO }); LB[1] = [lab(ZG[1], 563, 233, 820, 120, 'Chromosome', 'start', null, 24)];
{ const g = ZG[2]; mk(g, 'path', { d: 'M500,70 Q536,263 500,456', stroke: VIO, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M556,70 Q520,263 556,456', stroke: VIO, 'stroke-width': 46, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M500,90 Q530,263 500,436 M556,90 Q526,263 556,436', stroke: '#9A6AB4', 'stroke-width': 6, fill: 'none', 'stroke-dasharray': '2 14', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 528, cy: 263, r: 16, fill: C.ink }); LB[2] = [lab(g, 486, 150, 300, 110, 'Chromatid', 'end', null, 24), lab(g, 570, 150, 760, 110, 'Chromatid', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'path', { d: 'M440,0 Q520,263 440,526', stroke: VIO, 'stroke-width': 90, fill: 'none' }); mk(g, 'path', { d: 'M616,0 Q536,263 616,526', stroke: VIO, 'stroke-width': 90, fill: 'none' });
  mk(g, 'ellipse', { cx: 528, cy: 263, rx: 40, ry: 54, fill: '#4A2A5C' }); [-1, 1].forEach(s => mk(g, 'rect', { x: 528 + s * 62 - 9, y: 223, width: 18, height: 80, rx: 8, fill: C.ink }));
  ZG.fb = [-1, 1].map(s => mk(g, 'path', { d: `M${528 + s * 70},${263} L${528 + s * 420},${140} M${528 + s * 70},${250} L${528 + s * 420},${263} M${528 + s * 70},${276} L${528 + s * 420},${386}`, stroke: SPN, 'stroke-width': 4, fill: 'none' }));
  LB[3] = [lab(g, 528, 300, 528, 440, 'Centromere', 'middle', null, 26), lab(g, 590, 228, 760, 120, 'Kinetochore', 'start', null, 26), lab(g, 860, 200, 880, 60, 'Spindle fibre', 'middle', null, 24)]; }
const FOC = [[560, 176, 50], [563, 233, 64], [528, 263, 50], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'root'), wt('Z2', 'divide')], [wt('Z3', 'chromosomes')], [wt('Z4', 'sister'), wt('Z4', 'sister') + 0.3], [wt('Z5', 'centromere'), wt('Z5', 'kinetochores'), wt('Z5', 'Spindle')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Two copies, one handle!' });

/* ---------- P: one cell through mitosis ---------- */
const PN = ['PROPHASE', 'METAPHASE', 'ANAPHASE', 'TELOPHASE'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE CELL · 2n = 4', 'Mitosis', 'Four stages, one after another.', ''], ['STAGE 1 OF 4', 'Prophase', 'Chromatin condenses. Centrosomes move apart, asters form.', 'End: Golgi, ER, nucleolus, envelope gone'],
  ['STAGE 2 OF 4', 'Metaphase', 'Fibres attach to kinetochores. Chromosomes line up.', 'The line: metaphase plate'], ['STAGE 3 OF 4', 'Anaphase', 'Centromeres split. Chromatids go to opposite poles.', 'Centromere first, arms trailing'],
  ['STAGE 4 OF 4', 'Telophase', 'Chromosomes uncoil. A nuclear envelope forms around each group.', 'Nucleolus, Golgi, ER come back']]);
const ps = sv('pS'), PP = {};
PP.cell = cellSim(ps, { x: 528, y: 280, s: 0.98, CH: CHT });
const PX0 = 528, PY0 = 280, pp = (x, y) => [PX0 + x * 0.98, PY0 + y * 0.98];
PP.L = [lab(ps, ...pp(200, -26), 880, 150, 'Aster', 'start', null, 24), lab(ps, ...pp(0, 140), 700, 480, 'Metaphase plate', 'start', null, 24), lab(ps, ...pp(-112, -67), 230, 110, 'Chromatid', 'end', null, 24), lab(ps, ...pp(-154, -60), 230, 110, 'Nuclear envelope', 'end', null, 24)];
const KF = [Object.assign({}, S0, { nl2: 0, c: lay.S }), { t: wt('P2', 'condense') - 0.2, d: 2.2, cond: 0.6, c: lay.PRO }, { t: wt('P2', 'centrosomes') - 0.1, d: 1.8, sp: 1, ast: 1 },
  { t: T0('P3'), d: 2.4, cond: 1, org: 0, env: 0.2, nuc: 0 }, { t: tPs[1] + 0.2, d: 0.6, env: 0 }, { t: wt('P4', 'attach') - 0.2, d: 1, fib: 1 }, { t: wt('P4', 'line') - 0.3, d: 1.4, c: lay.MET }, { t: wt('P4', 'plate') - 0.2, d: 0.5, pl: 1 },
  { t: wt('P5', 'split') - 0.1, d: 2.6, c: lay.ANA, pl: 0 }, { t: tPs[3] + 0.1, d: 1.2, c: lay.TEL, fib: 0, ast: 0 }, { t: wt('P6', 'uncoil') - 0.2, d: 1.4, cond: 0.2 }, { t: wt('P6', 'envelope') - 0.3, d: 1, env2: 1 },
  { t: wt('P6', 'nucleolus') - 0.2, d: 1, nl2: 1, org: 0.85 }];

/* ---------- C: spot each stage on a slide ---------- */
const cl = sv('clS'), CL = {};
CL.c = [[208, 190, ST.P, 'PROPHASE'], [576, 190, ST.Mt, 'METAPHASE'], [208, 390, ST.A, 'ANAPHASE'], [576, 390, ST.T, 'TELOPHASE']].map(([x, y, st, n]) => { const g = mk(cl, 'g', {});
  const box = mk(g, 'rect', { x: x - 170, y: y - 84, width: 340, height: 168, rx: 14, fill: C.soft, stroke: 'none', 'stroke-width': 4 }); const c = still(g, x - 30, y, 0.42, st);
  const tt = txt(g, x + 168 - 16, y + 70, n, { 'text-anchor': 'end', 'font-size': 15, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return { g, box, c, tt }; });
const cr = sv('crS'), CR = {};
CR.cell = cellSim(cr, { x: 392, y: 270, s: 0.95, CH: CHT });
const tCs = ['C2', 'C3', 'C4', 'C5'].map(T0), CLUE = ['Threads coiling · nucleus still there', 'Thickest, in one line · best to study', 'Two groups moving apart · V shapes', 'Two groups at the ends · new envelopes'];
const KC = [Object.assign({}, S0, ST.P, { nl2: 0 }), { t: tCs[1] - 0.3, d: 1, ...ST.Mt, pl: 1 }, { t: tCs[2] - 0.3, d: 1.4, ...ST.A, pl: 0 }, { t: tCs[3] - 0.3, d: 1.2, ...ST.T, nl2: 1 }];

/* ---------- V: prophase vs telophase ---------- */
const cV = cmp($('#vc'), ['PROPHASE · FORWARD', 'TELOPHASE · BACKWARD'], [
  ['', 'Chromosomes', 'Condense, coil up thick', 'Uncoil again', wt('V1', 'condense'), wt('V1', 'uncoil'), s => mk(s, 'path', { d: 'M65,16 L65,84', stroke: VIO, 'stroke-width': 12, 'stroke-linecap': 'round' }),
    s => mk(s, 'path', { d: 'M65,12 q-12,8 0,16 t0,16 t0,16 t0,16 t0,16', stroke: VIO, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' })],
  ['', 'Envelope', 'Nuclear envelope breaks down', 'A new one forms around each group', wt('V2', 'breaks'), wt('V2', 'new'), s => mk(s, 'circle', { cx: 65, cy: 50, r: 34, fill: 'none', stroke: VIO, 'stroke-width': 4, 'stroke-dasharray': '10 9' }),
    s => [-1, 1].forEach(k => mk(s, 'circle', { cx: 65 + k * 30, cy: 50, r: 24, fill: NUF, stroke: VIO, 'stroke-width': 3 }))],
  ['', 'Nucleolus', 'Vanishes, with the Golgi and ER', 'Comes back, with the Golgi and ER', wt('V3', 'vanish'), wt('V3', 'come'), s => { mk(s, 'circle', { cx: 50, cy: 50, r: 14, fill: '#5B3470', opacity: 0.25 }); mk(s, 'path', { d: 'M76,40 Q92,32 108,40 M76,52 Q92,44 108,52', stroke: GOC, 'stroke-width': 4, fill: 'none', opacity: 0.25 }); },
    s => { mk(s, 'circle', { cx: 50, cy: 50, r: 14, fill: '#5B3470' }); mk(s, 'path', { d: 'M76,40 Q92,32 108,40 M76,52 Q92,44 108,52', stroke: GOC, 'stroke-width': 4, fill: 'none' }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'On a slide, you see thick chromosomes in one neat line across the middle of the cell. Which stage is it?', opts: ['Prophase', 'Metaphase', 'Anaphase'], right: 1, why: 'Metaphase. The chromosomes line up at the metaphase plate.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['BEFORE THE SPLIT · PRO, META', 'background:var(--ac2);color:#1F6B3F'], ['AFTER THE SPLIT · ANA, TELO', 'background:var(--ink);color:#fff']], [
  ['pro', 'Chromatin starts to condense', '<b>Prophase</b>', 0, 0, wt('W2', 'Before')], ['ana', 'Chromatids go to opposite poles', '<b>Anaphase</b>', 1, 0, wt('W3', 'After')],
  ['met', 'Line up at the metaphase plate', '<b>Metaphase</b>', 0, 1, wt('W4', 'Before')], ['tel', 'Envelope forms around each group', '<b>Telophase</b>', 1, 1, wt('W5', 'After')],
  ['cen', 'Centrosomes move to the poles', '<b>Prophase</b>', 0, 2, wt('W6', 'Before')], ['tel', 'The nucleolus comes back', '<b>Telophase</b>', 1, 2, wt('W7', 'After')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'path', { d: 'M90,60 q-14,10 0,20 t0,20 t0,20 t0,20 t0,20 t0,20', stroke: VIO, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); txt(TP, 92, 214, 'PROPHASE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 });
  mk(TP, 'path', { d: 'M150,130 L200,130 M188,118 L200,130 L188,142', stroke: C.ink, 'stroke-width': 3, fill: 'none' });
  mk(TP, 'path', { d: 'M262,60 Q282,130 262,200 M302,60 Q282,130 302,200', stroke: VIO, 'stroke-width': 18, fill: 'none', 'stroke-linecap': 'round' }); mk(TP, 'circle', { cx: 282, cy: 130, r: 7, fill: C.ink });
  txt(TP, 282, 238, 'METAPHASE · THICKEST', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['flip', 'A flip book', 'PAGE BY PAGE', 'flip'], ['scope', 'A slide', 'UNDER A MICROSCOPE', 'slide'], ['twin', 'Two copies', 'EXACTLY ALIKE', 'copies']],
  learn: [['find', 'Name', 'name'], ['order', 'In order', 'order'], ['scope', 'Spot each', 'spot']],
  hookW: 'doctor', split: ['process', 'mitosis'], st: ['P', 'telophase'],
  cam: [[tPs[2] - 0.3, 1.03, 960, 560], [T0('C1') - 0.7, 1, 960, 540]],
  hook: t => { M.vis(HL.fld, t, tMorph + 0.4, 1e9, { ...POP, sc: 0.85 }); const tw = [wt('H2', 'slide') + 0.3, wt('H2', 'lined'), wt('H2', 'pulled'), wt('H2', 'groups')];
    HL.c.forEach((c, i) => { M.vis(c.G, t, tw[i] - 0.2, 1e9, { ...POP, sc: 0.5 }); c.set(c.st, t); });
    M.vis($('#hlt0'), t, tw[0], 1e9, POP); M.vis($('#hlt1'), t, tw[3], 1e9, POP); M.vis($('#hlP'), t, T0('H3') + 0.4, 1e9, POP); },
  measure: () => { [['hlt0', 190, 432], ['hlt1', 594, 432]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.a, t, wt('D2', 'division') - 0.2, 1e9, { ...POP, sc: 0.5 }); M.draw(DL.ar, t, wt('D2', 'daughter') - 0.3, 0.6);
      M.vis(DL.b, t, wt('D2', 'same') - 0.2, 1e9, { ...POP, sc: 0.5 }); DL.t.forEach((e, i) => M.vis(e, t, wt('D3', 'two') + i * 0.25, 1e9, POP)); M.vis($('#dlP'), t, wt('D3', 'equational'), 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.r1, t, wt('D4', 'nucleus') - 0.2, 1e9, { ...POP, sc: 0.7 }); M.vis(DR.t[0], t, wt('D4', 'karyokinesis') - 0.1, 1e9, { dx: -16, dy: 0 });
      M.vis(DR.r2, t, wt('D4', 'cytoplasm') - 0.2, 1e9, { ...POP, sc: 0.7 }); M.vis(DR.t[1], t, wt('D4', 'cytokinesis') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#drP'), t, wt('D4', 'karyo', 1) - 0.1, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] }); ZG.cell.set(ZG.cell.st, t); ZG.fb.forEach(f => M.draw(f, t, wt('Z5', 'Spindle') - 0.3, 0.6));
      avZ(t, wt('Z5', 'hook') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PP.cell.G, t, T0('P1') + 0.3, 1e9, { ...POP, sc: 0.8 }); PP.cell.set(kfRun(KF, t), t);
      labRun(PP.L[0], t, wt('P2', 'asters'), tPs[1] - 0.3); labRun(PP.L[1], t, wt('P4', 'plate') + 0.2, tPs[2] - 0.2); labRun(PP.L[2], t, wt('P5', 'sister') + 0.4, tPs[3] - 0.3); labRun(PP.L[3], t, wt('P6', 'envelope') + 0.4); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1'), cur = curOf(t, tCs, 0.3);
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o });
      CL.c.forEach((c, i) => { M.vis(c.g, t, T0('C1') + 0.3 + i * 0.15, 1e9, { dy: 16 }); c.c.set(c.c.st, t); attr(c.box, 'stroke', i === cur ? C.ac : 'none'); attr(c.box, 'fill', i === cur ? C.ac3 || '#E8F3EC' : C.soft); attr(c.tt, 'fill', i === cur ? C.ac : C.mute); });
      M.vis($('#cr'), t, tCs[0] - 0.15, out, { dx: 60, dy: 0, ...o }); CR.cell.set(kfRun(KC, t), t); const k = Math.max(0, cur); $('#crP').textContent = CLUE[k]; $('#crL').textContent = 'ZOOM · ' + PN[k];
      M.vis($('#crP'), t, tCs[0] + 0.3, 1e9, POP); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'chromosomes') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Chromosomes are best studied in prophase', right: 'They are thickest and clearest in metaphase', tRight: wt('X3', 'Metaphase') - 0.1,
    type: 'Order of stages; the event that marks each stage; labelling a diagram', tType: wt('E1', 'order'),
    xRun: t => M.vis(TP, t, wt('X3', 'thickest') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which event marks the <b>start of metaphase</b> in mitosis?', cols: 1, optW: 968, optH: 66, optFs: 26, optY: 210, qW: 900,
      opts: ['Splitting of the centromeres', 'Start of chromatin condensation', 'Complete breakdown of the nuclear envelope', 'Reappearance of the nucleolus'], right: 2 },
    tOpts: wt('Q1', 'question') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">C</b>'], ['Metaphase: envelope <b>fully gone</b>'], ['Centromeres split: <b>anaphase</b>'], ['Nucleolus back: <b>telophase</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'nuclear'), wt('A3', 'Centromeres'), wt('A3', 'nucleolus')],
    recapT: 'Recap · mitosis, prophase to telophase',
    recap: ['<b>Mitosis</b>: equational division · daughters get the same chromosomes as the parent, 2n → 2n', '<b>Karyokinesis</b> (nucleus) then <b>cytokinesis</b> (cytoplasm) · sister chromatids + centromere',
      '<b>Prophase</b>: chromatin condenses, centrosomes to poles, asters · Golgi, ER, nucleolus, envelope gone', '<b>Metaphase</b>: fibres on kinetochores, chromosomes on the metaphase plate · best to study',
      '<b>Anaphase</b>: centromeres split, chromatids to poles · <b>Telophase</b>: uncoil, two nuclear envelopes'],
    yq: ['Name the four stages of mitosis, in order.', 'What are kinetochores?', 'Why is mitosis called equational division?'],
    nextL: 'NEXT · EP 77', nextT: 'How does a stiff plant cell split in two? Cytokinesis' },
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
