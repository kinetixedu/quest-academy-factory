// PUC Biology Ep 45: Aestivation and Placentation (Living diagram, leaf green)
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

/* ===== Ep 45: aestivation and placentation ===== */
Object.assign(M.IC, {
  flower: [ci(12, 12, 2), 'M12 10c-2-2-2-6 0-7 2 1 2 5 0 7Z', 'M12 14c2 2 2 6 0 7-2-1-2-5 0-7Z', 'M10 12c-2 2-6 2-7 0 1-2 5-2 7 0Z', 'M14 12c2-2 6-2 7 0-1 2-5 2-7 0Z'],
  bud: ['M12 3c4 4 6 8 6 11a6 6 0 0 1-12 0c0-3 2-7 6-11Z', 'M12 4v16', 'M12 20v2'],
  ovary: [ci(12, 12, 9), 'M12 3v18', 'M3 12h18', ci(9, 9, 1.4), ci(15, 9, 1.4), ci(9, 15, 1.4), ci(15, 15, 1.4)],
  pod: ['M2 13c4-6 16-7 20-4-3 6-16 8-20 4Z', ci(8, 11.5, 1.6), ci(12, 10.8, 1.6), ci(16, 10.2, 1.6)],
  umbrella: ['M3 11a9 9 0 0 1 18 0Z', 'M12 2v1', 'M12 11v8a2 2 0 0 1-4 0'],
  fan: ['M12 21 3 8l3-2 6 15 6-15 3 2Z', 'M12 21 9 5h6Z'],
  sun: [ci(12, 12, 4), 'M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2'],
});
const sv = id => $('#' + id);
// petal arc seen in a cut bud: angle a (deg, 0 = top, clockwise), half span h, end radii rl/rr
const PC = [528, 270];
const arcD = (a, h, rl, rr, c = PC) => { let d = ''; for (let k = 0; k <= 24; k++) { const u = k / 24, an = (a - h + 2 * h * u - 90) * Math.PI / 180, r = rl + (rr - rl) * u;
  d += (k ? 'L' : 'M') + (c[0] + r * Math.cos(an)).toFixed(1) + ',' + (c[1] + r * Math.sin(an)).toFixed(1); } return d; };
const petal = (g, a, h, rl, rr, col = PET, c) => { const d = arcD(a, h, rl, rr, c); mk(g, 'path', { d, stroke: BR, 'stroke-width': 34, fill: 'none', 'stroke-linecap': 'round' }); return mk(g, 'path', { d, stroke: col, 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' }); };
const pol = (a, r, c = PC) => { const an = (a - 90) * Math.PI / 180; return [c[0] + r * Math.cos(an), c[1] + r * Math.sin(an)]; };
const ovule = (g, x, y, r = 15) => { const e = mk(g, 'g', {}); mk(e, 'ellipse', { cx: x, cy: y, rx: r, ry: r * 1.15, fill: OVL, stroke: BR, 'stroke-width': 2.5 }); mk(e, 'circle', { cx: x, cy: y, r: r * 0.38, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 1.5 }); return e; };

/* ---------- H: umbrella + bud, then a cut lady's finger ---------- */
const hl = sv('hlS'), HL = {};
HL.a = mk(hl, 'g', {});
{ const g = HL.a; // closed umbrella
  mk(g, 'path', { d: 'M224,110 C250,190 262,300 244,400 L204,400 C186,300 198,190 224,110 Z', fill: '#7FA8C9', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  [0, 1, 2].forEach(k => mk(g, 'path', { d: `M224,${130 + k * 6} C${214 + k * 10},220 ${206 + k * 12},310 ${208 + k * 14},398`, stroke: '#4F7FA6', 'stroke-width': 2.5, fill: 'none' }));
  mk(g, 'path', { d: 'M224,400 L224,450 C224,470 196,470 196,452', stroke: BR, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  // bud
  mk(g, 'path', { d: 'M520,470 L520,404', stroke: '#4E7A34', 'stroke-width': 8, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M520,110 C590,190 610,300 586,370 C570,410 470,410 454,370 C430,300 450,190 520,110 Z', fill: PET, stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  [[-1, 0], [1, 0], [0, 1]].forEach(([s, m]) => mk(g, 'path', { d: `M520,${118 + m * 20} C${520 + s * 46},210 ${520 + s * 56},300 ${520 + s * 40},388`, stroke: '#C77D93', 'stroke-width': 3, fill: 'none' }));
  mk(g, 'path', { d: 'M454,370 C470,420 570,420 586,370 L578,404 C560,430 480,430 462,404 Z', fill: '#7FB069', stroke: BR, 'stroke-width': 3 }); }
HL.b = mk(hl, 'g', {});
const HLs = [];
{ const g = HL.b, c = [392, 280]; // lady's finger cut across: 5 ridges, 5 rooms, seeds on the central axis
  let d = ''; for (let k = 0; k <= 60; k++) { const an = k / 60 * 2 * Math.PI - Math.PI / 2, r = 176 + 16 * Math.cos(5 * an + Math.PI / 2 * 0); d += (k ? 'L' : 'M') + (c[0] + r * Math.cos(an)).toFixed(1) + ',' + (c[1] + r * Math.sin(an)).toFixed(1); }
  mk(g, 'path', { d: d + 'Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 4 });
  mk(g, 'circle', { cx: c[0], cy: c[1], r: 150, fill: '#EEF6EA', stroke: '#6E9C55', 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) { const a = k * 72 + 36, p = pol(a, 150, c); mk(g, 'line', { x1: c[0], y1: c[1], x2: p[0], y2: p[1], stroke: '#6E9C55', 'stroke-width': 7, 'stroke-linecap': 'round' }); }
  mk(g, 'circle', { cx: c[0], cy: c[1], r: 18, fill: '#7FB069', stroke: BR, 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) [42, 90].forEach((r, j) => { const p = pol(k * 72 + (j ? 0 : 0), r, c); HLs.push(ovule(g, p[0], p[1], 17)); }); }
const tHcut = wt('H3', 'cut'), tHrow = wt('H3', 'rows');

/* ---------- D: whorl + inside the ovary ---------- */
const dw = sv('dwS'), DW = {};
{ const c = [320, 280];
  DW.sep = mk(dw, 'g', {}); for (let k = 0; k < 5; k++) { const a = k * 72 + 36, p = pol(a, 150, c); mk(DW.sep, 'ellipse', { cx: p[0], cy: p[1], rx: 44, ry: 70, fill: '#9FD09A', stroke: BR, 'stroke-width': 3.5, transform: `rotate(${a} ${p[0].toFixed(1)} ${p[1].toFixed(1)})` }); }
  DW.pet = mk(dw, 'g', {}); for (let k = 0; k < 5; k++) { const a = k * 72, p = pol(a, 92, c); mk(DW.pet, 'ellipse', { cx: p[0], cy: p[1], rx: 46, ry: 64, fill: PET, stroke: BR, 'stroke-width': 3.5, transform: `rotate(${a} ${p[0].toFixed(1)} ${p[1].toFixed(1)})` }); }
  mk(DW.pet, 'circle', { cx: c[0], cy: c[1], r: 30, fill: ANTH, stroke: BR, 'stroke-width': 3 });
  DW.r1 = mk(dw, 'circle', { cx: c[0], cy: c[1], r: 196, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  DW.r2 = mk(dw, 'circle', { cx: c[0], cy: c[1], r: 124, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  DW.lab = [lab(dw, 488, 140, 540, 96, 'Sepals: one whorl'), lab(dw, 378, 330, 540, 440, 'Petals: one whorl')]; }
const dr = sv('drS'), DR = {};
{ const c = [300, 280];
  DR.ov = mk(dr, 'g', {}); mk(DR.ov, 'circle', { cx: c[0], cy: c[1], r: 190, fill: OVW, stroke: '#1F5E37', 'stroke-width': 5 });
  mk(DR.ov, 'circle', { cx: c[0], cy: c[1], r: 164, fill: '#EEF6EA', stroke: '#2F7A4A', 'stroke-width': 2.5 });
  DR.pl = mk(dr, 'path', { d: `M${c[0] - 164},${c[1] - 60} C${c[0] - 104},${c[1] - 50} ${c[0] - 104},${c[1] + 50} ${c[0] - 164},${c[1] + 60} Z`, fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
  DR.ovs = [[-74, -50], [-60, 0], [-74, 50]].map(([dx, dy]) => ovule(dr, c[0] + dx, c[1] + dy, 20));
  DR.lab = [lab(dr, 470, 220, 540, 150, 'Ovary wall'), lab(dr, 150, 300, 540, 400, 'Placenta', 'start', [300, 470]), lab(dr, 246, 230, 540, 270, 'Ovule')]; }

/* ---------- Z: four ways of folding ---------- */
const ZN = ['VALVATE', 'TWISTED', 'IMBRICATE', 'VEXILLARY'];
const zSet = chips('#zch', ZN, 'zc', false);
const zStack = stack('#lvs', 'lvi', [['ONE BUD · CUT ACROSS', 'Five petals', 'Look down into the bud. Who overlaps whom?', 'Outside end = on top.'],
  ['TYPE 1 OF 4', 'Valvate', 'The edges just touch. No petal overlaps another.', 'Calotropis'],
  ['TYPE 2 OF 4', 'Twisted', 'Each petal overlaps the next, all one way round.', 'China rose · lady\'s finger · cotton'],
  ['TYPE 3 OF 4', 'Imbricate', 'Edges overlap, but in no fixed direction.', 'Cassia · gulmohur'],
  ['TYPE 4 OF 4', 'Vexillary', 'Standard over 2 wings, wings over 2 keel petals.', 'Pea · bean']]);
const tZ = ['Z2', 'Z3', 'Z4', 'Z5'].map(T0);
const zs = sv('zS'), ZB = mk(zs, 'g', {}), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), ZL = [];
{ // bud side view with the cut line
  mk(ZB, 'path', { d: 'M528,500 L528,430', stroke: '#4E7A34', 'stroke-width': 9, 'stroke-linecap': 'round' });
  mk(ZB, 'path', { d: 'M528,90 C596,170 616,290 592,370 C576,420 480,420 464,370 C440,290 460,170 528,90 Z', fill: PET, stroke: BR, 'stroke-width': 4 });
  mk(ZB, 'path', { d: 'M464,370 C480,440 576,440 592,370 L584,420 C566,450 490,450 472,420 Z', fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
  ZB.cut = mk(ZB, 'path', { d: 'M380,280 L676,280', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
  ZB.kn = txt(ZB, 690, 287, 'CUT HERE', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.ac, 'font-weight': 600 }); }
const R0 = 150, IN = R0 - 18, OU = R0 + 18;
const centre = g => { mk(g, 'circle', { cx: PC[0], cy: PC[1], r: 52, fill: '#EEF6EA', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: PC[0], cy: PC[1], r: 18, fill: '#7FB069', stroke: BR, 'stroke-width': 2 }); };
const ZP = [[], [], [], []];
// valvate: edges touch
centre(ZG[0]); for (let k = 0; k < 5; k++) ZP[0].push(petal(ZG[0], k * 72, 33, R0, R0));
ZL[0] = [lab(ZG[0], ...pol(36, R0), 800, 150, 'Edges just touch')];
// twisted: right end outside the next petal's left end, every time
centre(ZG[1]); for (let k = 0; k < 5; k++) ZP[1].push(petal(ZG[1], k * 72, 44, IN, OU));
ZG[1].arr = mk(ZG[1], 'path', { d: arcD(0, 150, 228, 228), stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '14 10' });
ZG[1].tip = mk(ZG[1], 'path', { d: 'M0,-12 L16,0 L0,12 Z', fill: C.ac });
ZL[1] = [lab(ZG[1], ...pol(40, OU - 4), 800, 150, 'Overlaps the next')];
// imbricate: no fixed direction (two fully outside, two fully inside, one mixed)
centre(ZG[2]); [[OU, OU], [IN, IN], [OU, OU], [IN, OU], [IN, IN]].forEach(([l, r], k) => ZP[2].push(petal(ZG[2], k * 72, 44, l, r)));
ZL[2] = [lab(ZG[2], ...pol(0, OU), 790, 110, 'Fully outside'), lab(ZG[2], ...pol(72, IN), 800, 300, 'Fully inside')];
// vexillary: standard (top, largest) over two wings, wings over two keel petals
centre(ZG[3]);
const KEEL = '#F7E3B0', WING = '#E6CCE8';
ZP[3].push(petal(ZG[3], 162, 26, R0 - 26, R0 - 26, KEEL), petal(ZG[3], 198, 26, R0 - 26, R0 - 26, KEEL));
ZP[3].push(petal(ZG[3], 102, 40, R0 - 6, R0 + 4, WING), petal(ZG[3], 258, 40, R0 + 4, R0 - 6, WING));
ZP[3].push(petal(ZG[3], 0, 64, R0 + 24, R0 + 24, PET));
ZL[3] = [lab(ZG[3], ...pol(0, R0 + 24), 800, 90, 'Standard'), lab(ZG[3], ...pol(102, R0), 800, 300, 'Wing'), lab(ZG[3], ...pol(170, R0 - 26), 800, 440, 'Keel')];
const tZL = [[wt('Z2', 'touch')], [wt('Z3', 'overlaps')], [wt('Z4', 'outside'), wt('Z4', 'inside')], [wt('Z5', 'standard'), wt('Z5', 'wings'), wt('Z5', 'keel')]];
const tCutX = wt('Z1', 'looking');

/* ---------- P: five ways of packing ---------- */
const PN = ['MARGINAL', 'AXILE', 'PARIETAL', 'FREE CENTRAL', 'BASAL'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['THE OVARY', 'Carpels', 'An ovary is built from units called carpels.', 'Watch where the ovules sit.'],
  ['TYPE 1 OF 5', 'Marginal', 'One carpel. A ridge along one seam carries two rows of ovules.', 'Pea'],
  ['TYPE 2 OF 5', 'Axile', 'Carpels join, walls meet in the middle. Many rooms.', 'China rose · tomato · lemon'],
  ['TYPE 3 OF 5', 'Parietal', 'Ovules on the inner wall. One room (a false wall can split it).', 'Mustard · Argemone'],
  ['TYPE 4 OF 5', 'Free central', 'No walls inside. Ovules on a central column.', 'Dianthus · primrose'],
  ['TYPE 5 OF 5', 'Basal', 'Placenta at the base, with just one ovule.', 'Sunflower · marigold']]);
const ps = sv('pS'), PP = {}, PCc = [528, 280], RW = 200;
PP.pod = mk(ps, 'g', {});
{ const g = PP.pod; mk(g, 'path', { d: 'M168,300 C260,150 800,140 900,240 C820,380 260,400 168,300 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M196,296 C300,190 780,180 872,244 C800,350 290,370 196,296 Z', fill: '#EEF6EA', stroke: '#6E9C55', 'stroke-width': 2.5 });
  PP.ridge = mk(g, 'path', { d: 'M210,284 C330,200 760,194 860,244', stroke: '#4E7A34', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  PP.pov = []; for (let k = 0; k < 7; k++) { const u = (k + 0.5) / 7, x = 250 + u * 560, y = 270 - 66 * Math.sin(Math.PI * (0.1 + 0.8 * u)) + (k % 2 ? 34 : 10); PP.pov.push(ovule(g, x, y, 17)); } }
PP.lPod = [lab(PP.pod, 560, 214, 640, 90, 'Placenta (ridge on one seam)'), lab(PP.pod, 488, 254, 330, 440, 'Ovules in two rows', 'end')];
PP.ov = mk(ps, 'g', {});
mk(PP.ov, 'circle', { cx: PCc[0], cy: PCc[1], r: RW + 24, fill: OVW, stroke: '#1F5E37', 'stroke-width': 5 });
mk(PP.ov, 'circle', { cx: PCc[0], cy: PCc[1], r: RW, fill: '#EEF6EA', stroke: '#2F7A4A', 'stroke-width': 2.5 });
PP.sep = [45, 135, 225, 315].map(a => { const p = pol(a, RW, PCc); return mk(ps, 'path', { d: `M${p[0].toFixed(1)},${p[1].toFixed(1)} L${PCc[0]},${PCc[1]}`, stroke: '#6E9C55', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none' }); });
PP.axis = mk(ps, 'circle', { cx: PCc[0], cy: PCc[1], r: 30, fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
PP.wallP = [-1, 1].map(s => mk(ps, 'ellipse', { cx: PCc[0] + s * (RW - 14), cy: PCc[1], rx: 30, ry: 62, fill: '#7FB069', stroke: BR, 'stroke-width': 3 }));
PP.fs = mk(ps, 'path', { d: `M${PCc[0] - RW + 30},${PCc[1]} L${PCc[0] + RW - 30},${PCc[1]}`, stroke: '#6E9C55', 'stroke-width': 5, 'stroke-dasharray': '12 9', fill: 'none' });
PP.col = mk(ps, 'circle', { cx: PCc[0], cy: PCc[1], r: 44, fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
// 8 ovules that move between the axile, parietal and free central layouts
const POS = [[0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => { const a = Math.floor(i / 2) * 90 + (i % 2 ? 62 : 28); return pol(a, 66, PCc); }),
  [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const s = i < 4 ? -1 : 1, j = i % 4; return [PCc[0] + s * (RW - 60 - (j % 2) * 34), PCc[1] - 66 + j * 44]; }),
  [0, 1, 2, 3, 4, 5, 6, 7].map(i => pol(i * 45, 76, PCc))];
PP.ovs = POS[0].map(() => { const g = mk(ps, 'g', {}); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 17, ry: 19, fill: OVL, stroke: BR, 'stroke-width': 2.5 }); mk(g, 'circle', { cx: 0, cy: 0, r: 6, fill: '#EEF6EA', stroke: GRN, 'stroke-width': 1.5 }); return g; });
PP.bas = mk(ps, 'g', {});
{ const g = PP.bas; mk(g, 'path', { d: 'M528,70 L528,120', stroke: '#CFE6C6', 'stroke-width': 22 }); mk(g, 'path', { d: 'M528,70 L528,120', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M528,110 C660,130 720,300 650,420 C610,480 446,480 406,420 C336,300 396,130 528,110 Z', fill: OVW, stroke: '#1F5E37', 'stroke-width': 5 });
  mk(g, 'path', { d: 'M528,136 C640,154 690,300 630,404 C596,452 460,452 426,404 C366,300 416,154 528,136 Z', fill: '#EEF6EA', stroke: '#2F7A4A', 'stroke-width': 2.5 });
  PP.bpl = mk(g, 'ellipse', { cx: 528, cy: 430, rx: 56, ry: 18, fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M528,420 L528,390', stroke: '#7FB069', 'stroke-width': 8 }); PP.bov = ovule(g, 528, 330, 50); }
PP.L = [[lab(ps, 548, 290, 760, 110, 'Placenta on the axis'), lab(ps, ...pol(45, 120, PCc), 760, 220, 'Wall (septum)'), lab(ps, ...pol(118, 66, PCc), 760, 440, 'Ovules')],
  [lab(ps, PCc[0] + RW - 14, PCc[1] - 40, 760, 110, 'Placenta on the wall'), lab(ps, 600, PCc[1], 760, 440, 'False septum')],
  [lab(ps, 560, 260, 760, 110, 'Central column'), lab(ps, 360, 160, 230, 70, 'No walls', 'end')],
  [lab(ps, 570, 430, 760, 440, 'Placenta at the base'), lab(ps, 570, 300, 760, 220, 'One ovule')]];

/* ---------- V: side by side ---------- */
const cA = cmp($('#vc1'), ['TWISTED', 'IMBRICATE'], [
  ['flower', 'Overlap', 'Every petal over the next, one way', 'Overlaps in no fixed order', wt('V2', 'twisted') + 0.2, wt('V2', 'imbricate') + 0.2,
    s => { const c = [65, 50]; for (let k = 0; k < 5; k++) petalS(s, k * 72, 44, 26, 36, c); }, s => { const c = [65, 50]; [[36, 36], [26, 26], [36, 36], [26, 36], [26, 26]].forEach(([l, r], k) => petalS(s, k * 72, 44, l, r, c)); }],
  ['', 'Example', 'China rose', 'Gulmohur', wt('V2', 'china'), wt('V2', 'gulmohur')]], 'va', 84, 96);
function petalS(s, a, h, rl, rr, c) { const d = arcD(a, h, rl, rr, c); mk(s, 'path', { d, stroke: BR, 'stroke-width': 11, fill: 'none', 'stroke-linecap': 'round' }); mk(s, 'path', { d, stroke: PET, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); }
const cB = cmp($('#vc2'), ['AXILE', 'FREE CENTRAL'], [
  ['ovary', 'Walls', 'Walls meet in the middle: rooms', 'No walls at all: one room', wt('V3', 'Axile') + 0.2, wt('V3', 'free') + 0.2,
    s => { mk(s, 'circle', { cx: 65, cy: 50, r: 42, fill: '#EEF6EA', stroke: '#1F5E37', 'stroke-width': 3 }); [45, 135, 225, 315].forEach(a => { const p = pol(a, 42, [65, 50]); mk(s, 'line', { x1: 65, y1: 50, x2: p[0], y2: p[1], stroke: '#6E9C55', 'stroke-width': 3 }); });
      [0, 90, 180, 270].forEach(a => { const p = pol(a, 18, [65, 50]); mk(s, 'circle', { cx: p[0], cy: p[1], r: 5, fill: OVL, stroke: BR, 'stroke-width': 1.5 }); }); },
    s => { mk(s, 'circle', { cx: 65, cy: 50, r: 42, fill: '#EEF6EA', stroke: '#1F5E37', 'stroke-width': 3 }); mk(s, 'circle', { cx: 65, cy: 50, r: 9, fill: '#7FB069', stroke: BR, 'stroke-width': 1.5 });
      for (let k = 0; k < 6; k++) { const p = pol(k * 60, 18, [65, 50]); mk(s, 'circle', { cx: p[0], cy: p[1], r: 5, fill: OVL, stroke: BR, 'stroke-width': 1.5 }); } }],
  ['', 'Example', 'Tomato', 'Dianthus', wt('V3', 'tomato'), wt('V3', 'Dianthus')]], 'vb', 84, 96);
const th1 = PUC.think($('#th1'), { q: 'A lemon cut across: walls divide it into segments, and the seeds sit near the centre where the walls meet. Axile or free central?', opts: ['Axile', 'Free central'], right: 0, why: 'Axile. The walls reach the centre, so the ovary has rooms. Free central has no walls.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['PETALS IN THE BUD', 'background:var(--ac2);color:#1F6B3F'], ['OVULES IN THE OVARY', 'background:var(--ink);color:#fff']], [
  ['flower', 'Pea petals', '<b>Vexillary</b> · standard, wings, keel', 0, 0, wt('W2', 'Pea')], ['flower', 'China rose', '<b>Twisted</b> · overlap one way round', 0, 1, wt('W3', 'China')],
  ['flower', 'Calotropis', '<b>Valvate</b> · edges only touch', 0, 2, wt('W4', 'Calotropis')], ['pod', 'Pea pod', '<b>Marginal</b> · two rows on one seam', 1, 0, wt('W5', 'pea')],
  ['ovary', 'Mustard', '<b>Parietal</b> · ovules on the wall', 1, 1, wt('W6', 'Mustard')], ['sun', 'Sunflower', '<b>Basal</b> · one ovule at the base', 1, 2, wt('W7', 'sunflower')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ const c = [260, 140]; mk(TP, 'circle', { cx: c[0], cy: c[1], r: 96, fill: '#EEF6EA', stroke: '#1F5E37', 'stroke-width': 4 });
  [-1, 1].forEach(s => mk(TP, 'ellipse', { cx: c[0] + s * 84, cy: c[1], rx: 16, ry: 34, fill: '#7FB069', stroke: BR, 'stroke-width': 2.5 }));
  TP.fs = mk(TP, 'path', { d: `M${c[0] - 70},${c[1]} L${c[0] + 70},${c[1]}`, stroke: '#6E9C55', 'stroke-width': 4, 'stroke-dasharray': '9 7' });
  [[-56, -26], [-56, 26], [56, -26], [56, 26]].forEach(([dx, dy]) => ovule(TP, c[0] + dx, c[1] + dy, 12));
  TP.t = txt(TP, 260, 262, 'MUSTARD · FALSE SEPTUM', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['umbrella', 'An umbrella', 'CLOTH PACKED', 'umbrella'], ['fan', 'A paper fan', 'PLEATS', 'fan'], ['bud', 'A flower bud', 'PETALS PACKED', 'bud']],
  learn: [['bud', '4 folds', 'four'], ['ovary', '5 packings', 'five'], ['leaf', 'Real plants', 'real']],
  hookW: 'JEE', split: ['fold', 'pack'], st: ['Aestivation', 'Placentation'],
  cam: [[tPs[1] - 0.2, 1.05, 960, 580], [tPs[3] + 0.4, 1, 960, 540]],
  hook: t => {
    M.vis(HL.a, t, tMorph + 0.6, tHcut - 0.1, { dy: 16, outDur: 0.35 });
    M.vis($('#hlt0'), t, wt('H2', 'cloth') - 0.1, tHcut - 0.1, { ...POP, outDur: 0.25 }); M.vis($('#hlt1'), t, wt('H2', 'petals') - 0.1, tHcut - 0.1, { ...POP, outDur: 0.25 });
    M.vis(HL.b, t, tHcut + 0.2, 1e9, { ...POP, sc: 0.85 }); HLs.forEach((s, i) => M.vis(s, t, tHrow - 0.3 + i * 0.05, 1e9, { ...POP, sc: 0.2 }));
    M.vis($('#hlP'), t, tHrow + 0.2, 1e9, POP);
  },
  measure: () => { [['hlt0', 224], ['hlt1', 520]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = '484px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dw'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DW.sep, t, wt('D2', 'sepals') - 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis(DW.pet, t, wt('D2', 'petals') - 0.1, 1e9, { ...POP, sc: 0.6 });
      M.vis(DW.r1, t, wt('D2', 'sepals') + 0.2, 1e9, { ...POP, sc: 0.9 }); M.vis(DW.r2, t, wt('D2', 'petals') + 0.2, 1e9, { ...POP, sc: 0.9 });
      labRun(DW.lab[0], t, wt('D2', 'sepals') + 0.3); labRun(DW.lab[1], t, wt('D2', 'petals') + 0.3); M.vis($('#dwP'), t, wt('D3', 'overlaps') - 0.3, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(DR.ov, t, wt('D4', 'ovary') - 0.2, 1e9, { ...POP, sc: 0.8 });
      DR.ovs.forEach((e, i) => M.vis(e, t, wt('D4', 'ovules') + i * 0.12, 1e9, { ...POP, sc: 0.2 })); M.vis(DR.pl, t, wt('D5', 'cushion') - 0.1, 1e9, POP);
      labRun(DR.lab[0], t, wt('D4', 'inside')); labRun(DR.lab[2], t, wt('D4', 'Ovules', 1)); labRun(DR.lab[1], t, wt('D5', 'placenta') - 0.1); M.vis($('#drP'), t, wt('D5', 'where') - 0.2, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ, 0.1)); zStack(t, [T0('Z1') + 0.4, ...tZ]);
      const bx = M.io((t - tCutX) / 0.6); M.hide(ZB, bx >= 1); ZB.style.opacity = (1 - bx).toFixed(3); M.vis(ZB.cut, t, wt('Z1', 'cutting'), 1e9, { dx: -30, dy: 0 }); ZB.kn.style.opacity = M.clamp((t - wt('Z1', 'cutting') - 0.4) / 0.3);
      ZG.forEach((g, k) => { const tin = k ? tZ[k] - 0.1 : tCutX + 0.2, tout = k < 3 ? tZ[k + 1] - 0.15 : 1e9;
        const on = M.vis(g, t, tin, tout, { dy: 0, sc: 0.85, fade: 0.25, outDur: 0.25 });
        if (on) { ZP[k].forEach((p, i) => M.draw(p, t, tin + 0.1 + i * 0.12, 0.45)); ZL[k].forEach((l, i) => labRun(l, t, tZL[k][i])); } });
      // looping: the twisted arrow runs round and round
      const an = (t * 50) % 360; attr(ZG[1].arr, 'd', arcD(an, 70, 228, 228)); const tp = pol(an + 70, 228); attr(ZG[1].tip, 'transform', `translate(${tp[0].toFixed(1)} ${tp[1].toFixed(1)}) rotate(${(an + 70).toFixed(1)})`);
      M.vis($('#zP'), t, wt('Z6', 'papilionaceous') - 0.1, 1e9, POP); }],
    ['#sP', T0('P1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.setT($('#pdL'), st <= 0 ? 'ONE CARPEL · A PEA POD OPENED' : st === 4 ? 'THE OVARY · CUT DOWN THE MIDDLE' : 'THE OVARY · CUT ACROSS');
      M.vis(PP.pod, t, T0('P1') + 0.5, tPs[1] - 0.2, { dy: 16, outDur: 0.3 }); M.draw(PP.ridge, t, wt('P2', 'ridge') - 0.1, 0.7);
      PP.pov.forEach((e, i) => M.vis(e, t, wt('P2', 'pod') + i * 0.08, 1e9, { ...POP, sc: 0.2 })); PP.lPod.forEach((l, i) => labRun(l, t, i ? wt('P2', 'rows') + 0.3 : wt('P2', 'placenta'), tPs[1] - 0.25));
      const ovOn = M.vis(PP.ov, t, tPs[1] - 0.05, tPs[4] - 0.15, { dy: 0, sc: 0.9, fade: 0.25, outDur: 0.3 });
      PP.sep.forEach((s, i) => { M.draw(s, t, wt('P3', 'walls') - 0.2 + i * 0.1, 0.5); const r = M.io((t - tPs[2] + 0.05) / 0.6); if (t > tPs[2]) s.style.strokeDashoffset = (s.getTotalLength() * r).toFixed(1); M.hide(s, !ovOn || r >= 1); });
      M.vis(PP.axis, t, wt('P3', 'placenta') - 0.1, tPs[2] + 0.3, { ...POP, outDur: 0.3 });
      PP.wallP.forEach(e => M.vis(e, t, tPs[2] + 0.3, tPs[3] + 0.2, { ...POP, sc: 0.3, outDur: 0.3 })); M.vis(PP.fs, t, wt('P4', 'false') - 0.2, tPs[3] + 0.1, { dy: 0, sc: 0.6, outDur: 0.3 });
      M.vis(PP.col, t, tPs[3] + 0.2, tPs[4] - 0.15, { ...POP, outDur: 0.3 });
      // ovules travel: axile -> wall -> column
      const u1 = M.io((t - tPs[2] - 0.2) / 0.9), u2 = M.io((t - tPs[3] - 0.2) / 0.9), bob = st >= 1 && st <= 3 ? Math.sin(t * 3) * 2 : 0;
      PP.ovs.forEach((g, i) => { const a = POS[0][i], b = POS[1][i], c = POS[2][i], x = a[0] + (b[0] - a[0]) * u1 + (c[0] - b[0]) * u2, y = a[1] + (b[1] - a[1]) * u1 + (c[1] - b[1]) * u2 + bob * (i % 2 ? 1 : -1);
        attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); M.hide(g, !ovOn || t < wt('P3', 'ovary') - 0.2); });
      [PP.axis, PP.col].forEach(e => attr(e, 'r', ((e === PP.col ? 44 : 30) * (1 + 0.06 * Math.sin(t * 4))).toFixed(1)));
      PP.L.forEach((ls, k) => ls.forEach((l, i) => labRun(l, t, tPs[k + 1] + 0.9 + i * 0.35, k < 3 ? tPs[k + 2] - 0.1 : 1e9)));
      M.vis(PP.bas, t, tPs[4] + 0.05, 1e9, { dy: 0, sc: 0.9, fade: 0.25 }); attr(PP.bpl, 'rx', (56 * (1 + 0.05 * Math.sin(t * 4))).toFixed(1)); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc1'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); M.vis($('#vc2'), t, T0('V3') - 0.2, OUT('V4'), { dy: 36, ...o }); cA(t); cB(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'Axile') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'walls') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Mustard has axile placentation', right: 'A false septum: ovules on the wall, so parietal', tRight: wt('X3', 'parietal') - 0.6,
    type: 'Match the following: a plant with its aestivation or its placentation', tType: wt('E1', 'match'),
    xRun: t => { M.vis(TP, t, wt('X3', 'false') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis(TP.fs, t, wt('X3', 'septum') - 0.1, 1e9, POP); },
    mcq: { q: 'Match each plant with its placentation.<div class="sl"><b>P</b>Pea &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b style="margin-left:40px">i</b>Axile</div><div class="sl"><b>Q</b>Tomato &nbsp;&nbsp;&nbsp;&nbsp; <b style="margin-left:40px">ii</b>Free central</div><div class="sl"><b>R</b>Argemone <b style="margin-left:40px">iii</b>Marginal</div><div class="sl"><b>S</b>Dianthus &nbsp; <b style="margin-left:40px">iv</b>Parietal</div>',
      opts: ['P-iii, Q-i, R-iv, S-ii', 'P-i, Q-iii, R-ii, S-iv', 'P-iii, Q-iv, R-i, S-ii', 'P-iv, Q-i, R-iii, S-ii'], right: 0 },
    tOpts: wt('Q1', 'Match') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['Pea: marginal (iii)'], ['Tomato: axile (i)'], ['Argemone: parietal (iv)'], ['Dianthus: free central (ii)']],
    tSo: [wt('A1', 'A', 1) + 0.1, wt('A2', 'Pea'), wt('A2', 'tomato'), wt('A3', 'Argemone'), wt('A3', 'Dianthus')],
    recapT: 'Recap · aestivation and placentation',
    recap: ['<b>Aestivation</b>: how sepals or petals sit in the bud, within one whorl', '<b>Valvate</b> (Calotropis) · <b>twisted</b> (china rose) · <b>imbricate</b> (Cassia, gulmohur)',
      '<b>Vexillary</b> (pea): standard over 2 wings, wings over 2 keel petals', '<b>Placentation</b>: marginal (pea) · axile (tomato) · parietal (mustard)', '<b>Free central</b>: no walls (Dianthus) · <b>basal</b>: one ovule (sunflower)'],
    yq: ['What is the difference between twisted and imbricate aestivation?', 'Name the three kinds of petals in a pea flower.', 'Why is mustard parietal, even with a wall in the middle?'],
    nextL: 'NEXT · EP 46', nextT: 'A mango and a coconut, the same kind of fruit? Fruits and Seeds' },
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
