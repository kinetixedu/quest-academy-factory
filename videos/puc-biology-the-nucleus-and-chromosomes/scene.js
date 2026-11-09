// PUC Biology Ep 67: The Nucleus and Chromosomes (Living diagram, leaf green)
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


/* ===== Ep 67: the nucleus and chromosomes ===== */
Object.assign(M.IC, {
  spool: ['M6 4h12M6 20h12', 'M8 4v16M16 4v16', 'M8 8l8 2M8 12l8 2M8 16l8 2'],
  case: ['M4 8h16v12H4Z', 'M9 8V5h6v3', 'M4 13h16'],
  book: ['M4 5h6v15H4Z', 'M10 5h4v15h-4Z', 'M15 6l4-1 2 14-4 1Z'],
  find: [ci(10, 10, 6), 'M14.5 14.5L20 20'],
  pack: ['M4 12c2-3 4 3 6 0s4 3 6 0 4 3 4 0', 'M8 18c1-1 2 1 3 0s2 1 3 0'],
  four: ['M7 4v16M17 4v16', 'M7 12h0M17 5h0', ci(7, 12, 1.5), ci(17, 6, 1.5)],
  cmeta: ['M9 3v7M9 14v7M15 3v7M15 14v7', 'M7 12h10'], csub: ['M9 3v4M9 11v10M15 3v4M15 11v10', 'M7 9h10'],
  cacro: ['M9 3v1M9 7v14M15 3v1M15 7v14', 'M7 5.5h10'], ctelo: ['M9 6v15M15 6v15', 'M7 3.5h10'],
});
const sv = id => $('#' + id);
const NFL = '#EFE6F3', NCL = '#4E2C63', CHRF = '#9B6BB5', ER = '#C77DA0', PROT = '#D0632F', RNA = '#A9719E', CYT = '#F4EEE2', AMB = '#D9A23B';
// chromosome with two chromatids: centre x, top y, top-arm length a, bottom-arm length b
const chromo = (g, cx, y0, a, b, w = 30, gap = 6, sat = 0) => { const w2 = mk(g, 'g', {}); [-1, 1].forEach(s => { const x = cx + s * (gap / 2 + w / 2) - w / 2;
    if (a > 0) mk(w2, 'rect', { x, y: y0, width: w, height: a, rx: w / 2, fill: CHRF, stroke: NUC, 'stroke-width': 3 });
    mk(w2, 'rect', { x, y: y0 + a + 8, width: w, height: b, rx: w / 2, fill: CHRF, stroke: NUC, 'stroke-width': 3 });
    if (sat) mk(w2, 'rect', { x: x + 3, y: y0 - sat - 10, width: w - 6, height: sat, rx: (w - 6) / 2, fill: CHRF, stroke: NUC, 'stroke-width': 3 }); });
  if (sat) mk(w2, 'path', { d: `M${cx - gap / 2 - w / 2},${y0 - 10} L${cx - gap / 2 - w / 2},${y0} M${cx + gap / 2 + w / 2},${y0 - 10} L${cx + gap / 2 + w / 2},${y0}`, stroke: NUC, 'stroke-width': 3 });
  const ky = y0 + a + 4; mk(w2, 'rect', { x: cx - gap / 2 - w - 7, y: ky - 6, width: 8, height: 12, rx: 3, fill: BR }); mk(w2, 'rect', { x: cx + gap / 2 + w - 1, y: ky - 6, width: 8, height: 12, rx: 3, fill: BR }); return w2; };

/* ---------- H: two metres in one cell ---------- */
const hl = sv('hlS'), HL = {};
HL.cell = mk(hl, 'g', {}); mk(HL.cell, 'circle', { cx: 392, cy: 320, r: 78, fill: CYT, stroke: '#C9B36A', 'stroke-width': 4 }); mk(HL.cell, 'circle', { cx: 392, cy: 320, r: 40, fill: NFL, stroke: NUC, 'stroke-width': 3 });
HL.th = mk(hl, 'path', { d: '', stroke: NUC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const thread = k => { let d = ''; for (let i = 0; i <= 220; i++) { const s = i / 220, xa = 60 + s * 664, ya = 200 + 14 * Math.sin(s * 40), a = s * Math.PI * 2 * 9, rr = 34 * (1 - s * 0.6), xb = 392 + rr * Math.cos(a), yb = 320 + rr * Math.sin(a);
  d += (i ? 'L' : 'M') + (xa + (xb - xa) * k).toFixed(1) + ',' + (ya + (yb - ya) * k).toFixed(1); } return d; };

/* ---------- D: history + what chromatin is ---------- */
const dl = sv('dlS'), DL = {};
DL.rows = [['1831', 'Robert Brown', 'FIRST DESCRIBED THE NUCLEUS'], ['LATER', 'Flemming', 'NAMED CHROMATIN · TAKES UP BASIC DYES']].map(([y, n, s], i) => { const g = mk(dl, 'g', {}), Y = 96 + i * 150; mk(g, 'rect', { x: 36, y: Y, width: 712, height: 126, rx: 14, fill: C.soft });
  txt(g, 64, Y + 74, y, { 'font-size': i ? 30 : 44, fill: C.ac, 'font-weight': 600 }); txt(g, 220, Y + 58, n, { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ink }); txt(g, 220, Y + 94, s, { 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return g; });
DL.nu = mk(dl, 'g', {}); mk(DL.nu, 'circle', { cx: 640, cy: 430, r: 54, fill: NFL, stroke: NUC, 'stroke-width': 4 }); DL.st = mk(DL.nu, 'path', { d: 'M604,420 c10,-20 20,10 30,-6 s16,14 26,-4 s12,18 22,2 M612,446 c8,-12 18,8 28,-4 s14,10 24,-2', stroke: NUC, 'stroke-width': 4, fill: 'none' });
txt(dl, 560, 436, 'STAINED', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.4, fill: NUC, 'font-weight': 600 });
const dr = sv('drS'), DR = {};
DR.rows = [['DNA', NUC], ['Histones', PROT], ['Non-histone proteins', AMB], ['RNA', RNA]].map(([n, c2], i) => { const g = mk(dr, 'g', {}), Y = 90 + i * 98; mk(g, 'rect', { x: 36, y: Y, width: 712, height: 82, rx: 12, fill: C.soft });
  if (i === 0) mk(g, 'path', { d: `M76,${Y + 41} c10,-24 20,24 30,0 s20,24 30,0`, stroke: c2, 'stroke-width': 6, fill: 'none' }); else if (i === 3) mk(g, 'path', { d: `M76,${Y + 41} q10,-16 20,0 t20,0 t20,0`, stroke: c2, 'stroke-width': 5, fill: 'none' });
  else mk(g, 'circle', { cx: 106, cy: Y + 41, r: 20, fill: c2, stroke: BR, 'stroke-width': 2 });
  txt(g, 170, Y + 52, n, { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: C.ink }); if (i === 1) txt(g, 360, Y + 50, 'BASIC PROTEINS', { 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- Z: zoom ladder CELL -> NUCLEUS -> ENVELOPE -> PORE ---------- */
const ZN = ['CELL', 'NUCLEUS', 'ENVELOPE', 'PORE'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, wt('Z2', 'In'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'A cell', 'Most cells have one nucleus.', 'The control room'],
  ['RUNG 2 OF 4', 'Nucleus', 'Chromatin threads, the nuclear matrix, one or more nucleoli.', 'Nucleolus: makes rRNA'],
  ['RUNG 3 OF 4', 'Envelope', 'Two membranes with the perinuclear space between.', 'Outer one joins the ER'],
  ['RUNG 4 OF 4', 'Nuclear pore', 'The two membranes join and leave an opening.', 'RNA and proteins, both ways']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
const squig = (g, x, y, n, sc, c2 = NUC, sw = 3) => { let d = `M${x},${y}`; for (let k = 0; k < n; k++) d += ` q${(6 * sc).toFixed(1)},${((k % 2 ? 9 : -9) * sc).toFixed(1)} ${(12 * sc).toFixed(1)},${(2 * Math.sin(k) * sc).toFixed(1)}`; return mk(g, 'path', { d, stroke: c2, 'stroke-width': sw, fill: 'none', 'stroke-linecap': 'round' }); };
{ const g = ZG[0]; mk(g, 'rect', { x: 230, y: 50, width: 596, height: 426, rx: 70, fill: CYT, stroke: '#C9B36A', 'stroke-width': 6 }); mk(g, 'circle', { cx: 528, cy: 263, r: 110, fill: NFL, stroke: NUC, 'stroke-width': 6 });
  for (let k = 0; k < 6; k++) squig(g, 470 + (k % 2) * 30, 210 + k * 18, 6, 0.8); mk(g, 'circle', { cx: 570, cy: 240, r: 22, fill: NCL });
  LB[0] = [lab(g, 606, 186, 760, 100, 'Nucleus', 'start', null, 24), lab(g, 330, 380, 210, 440, 'Cytoplasm', 'end', null, 24)]; }
{ const g = ZG[1]; mk(g, 'circle', { cx: 528, cy: 263, r: 232, fill: '#FFFFFF', stroke: NUC, 'stroke-width': 6 }); mk(g, 'circle', { cx: 528, cy: 263, r: 216, fill: NFL, stroke: NUC, 'stroke-width': 5 });
  for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; mk(g, 'path', { d: `M${528 + 212 * Math.cos(a - 0.04)},${263 + 212 * Math.sin(a - 0.04)} L${528 + 236 * Math.cos(a - 0.04)},${263 + 236 * Math.sin(a - 0.04)} M${528 + 212 * Math.cos(a + 0.04)},${263 + 212 * Math.sin(a + 0.04)} L${528 + 236 * Math.cos(a + 0.04)},${263 + 236 * Math.sin(a + 0.04)}`, stroke: '#fff', 'stroke-width': 7 }); }
  ZG.chr = mk(g, 'g', {}); for (let k = 0; k < 12; k++) { const a = k * 2.2, r = 40 + (k * 37) % 130; squig(ZG.chr, 528 + r * Math.cos(a) - 50, 263 + r * Math.sin(a), 8, 1.1); }
  ZG.ncl = mk(g, 'circle', { cx: 620, cy: 200, r: 46, fill: NCL });
  LB[1] = [lab(g, 706, 114, 780, 50, 'Nuclear envelope', 'start', null, 24), lab(g, 450, 340, 230, 430, 'Chromatin', 'end', null, 24), lab(g, 400, 190, 230, 120, 'Nuclear matrix', 'end', null, 24), lab(g, 650, 230, 800, 300, 'Nucleolus', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 150, fill: CYT }); mk(g, 'rect', { x: 0, y: 230, width: 1056, height: 296, fill: NFL });
  mk(g, 'path', { d: 'M-10,150 L470,150 A40,40 0 0 1 470,230 L-10,230 Z', fill: '#fff', stroke: NUC, 'stroke-width': 9 }); mk(g, 'path', { d: 'M1066,150 L586,150 A40,40 0 0 0 586,230 L1066,230 Z', fill: '#fff', stroke: NUC, 'stroke-width': 9 });
  mk(g, 'path', { d: 'M60,146 L60,60 C60,24 140,24 140,60 L140,146', fill: '#F3DDE8', stroke: ER, 'stroke-width': 8 }); mk(g, 'path', { d: 'M66,150 L134,150', stroke: '#F3DDE8', 'stroke-width': 10 });
  for (let k = 0; k < 16; k++) { const x = 180 + k * 52; if (x > 440 && x < 620) continue; mk(g, 'circle', { cx: x, cy: 136, r: 8, fill: BR }); }
  for (let k = 0; k < 5; k++) squig(g, 120 + k * 180, 440 + (k % 2) * 40, 9, 1.2);
  txt(g, 880, 200, '10-50 nm', { 'text-anchor': 'middle', 'font-size': 24, fill: NUC, 'font-weight': 600 });
  LB[2] = [lab(g, 760, 150, 700, 70, 'Outer membrane', 'end', null, 24), lab(g, 300, 190, 260, 330, 'Perinuclear space', 'end', null, 24), lab(g, 760, 230, 800, 330, 'Inner membrane', 'start', null, 24), lab(g, 388, 136, 340, 70, 'Ribosomes', 'end', null, 24), lab(g, 100, 34, 170, 40, 'ER', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 120, fill: CYT }); mk(g, 'rect', { x: 0, y: 340, width: 1056, height: 186, fill: NFL });
  mk(g, 'path', { d: 'M-10,120 L380,120 A110,110 0 0 1 380,340 L-10,340 Z', fill: '#fff', stroke: NUC, 'stroke-width': 12 }); mk(g, 'path', { d: 'M1066,120 L676,120 A110,110 0 0 0 676,340 L1066,340 Z', fill: '#fff', stroke: NUC, 'stroke-width': 12 });
  txt(g, 160, 80, 'CYTOPLASM', { 'font-size': 18, 'letter-spacing': 1.6, fill: C.mute, 'font-weight': 600 }); txt(g, 160, 410, 'NUCLEOPLASM', { 'font-size': 18, 'letter-spacing': 1.6, fill: NUC, 'font-weight': 600 });
  ZG.mv = []; for (let k = 0; k < 6; k++) { const up = k % 2 === 0; const e = up ? squig(g, 0, 0, 3, 1, RNA, 5) : mk(g, 'circle', { cx: 0, cy: 0, r: 12, fill: PROT, stroke: BR, 'stroke-width': 2 }); ZG.mv.push({ e, up, k }); }
  ZG.leg = mk(g, 'g', {}); mk(ZG.leg, 'path', { d: 'M800,64 q10,-14 20,0 t20,0', stroke: RNA, 'stroke-width': 5, fill: 'none' }); txt(ZG.leg, 856, 70, 'RNA · OUT', { 'font-size': 18, 'letter-spacing': 1.4, fill: C.ink, 'font-weight': 600 });
  mk(ZG.leg, 'circle', { cx: 820, cy: 460, r: 12, fill: PROT, stroke: BR, 'stroke-width': 2 }); txt(ZG.leg, 856, 466, 'PROTEIN · IN', { 'font-size': 18, 'letter-spacing': 1.4, fill: C.ink, 'font-weight': 600 });
  LB[3] = [lab(g, 528, 230, 700, 230, 'Nuclear pore', 'start', null, 24)]; }
const FOC = [[528, 263, 120], [528, 40, 50], [528, 190, 56], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'nucleus'), wt('Z2', 'Most')], [wt('Z4', 'nuclear') - 0.2, wt('Z2', 'chromatin'), wt('Z2', 'matrix'), wt('Z2', 'nucleoli')], [wt('Z4', 'outer'), wt('Z4', 'perinuclear'), wt('Z4', 'perinuclear') + 0.5, wt('Z4', 'ribosomes'), wt('Z4', 'ER')], [wt('Z5', 'pores')]];
tLab[0][1] = wt('Z2', 'nucleus') + 0.6; tLab[1][0] = wt('Z2', 'nucleoli') + 0.8;
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A door with traffic both ways!' });

/* ---------- P: packing the thread ---------- */
const PN = ['THREADS', 'COIL', 'FOLD', 'CHROMOSOMES', '46'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE THREAD', 'Chromatin', 'Watch it pack, step by step.', ''], ['STEP 1 OF 5', 'Threads', 'In a resting cell: long, fine threads.', ''],
  ['STEP 2 OF 5', 'Coil', 'Getting ready to divide, the thread coils.', ''], ['STEP 3 OF 5', 'Fold', 'Coils fold again and again: short and thick.', ''],
  ['STEP 4 OF 5', 'Chromosomes', 'Visible only in dividing cells.', ''], ['STEP 5 OF 5', '46 in a human cell', '23 pairs share the two metre thread.', '']]);
const ps = sv('pS'), PP = {};
PP.th = mk(ps, 'path', { d: '', stroke: NUC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const thP = (L, r, w, A, ph) => { let d = ''; for (let i = 0; i <= 420; i++) { const s = i / 420, a = s * Math.PI * 2 * w + ph; const x = 528 - L / 2 + s * L + r * Math.cos(a), y = 290 + r * 0.7 * Math.sin(a) + A * Math.sin(s * 5 * Math.PI); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
PP.ch = mk(ps, 'g', {}); chromo(PP.ch, 528, 120, 150, 170, 52, 10);
PP.kar = mk(ps, 'g', {}); PP.pairs = [];
for (let k = 0; k < 23; k++) { const row = k < 12 ? 0 : 1, col = row ? k - 12 : k, x = 100 + col * 80 + (row ? 40 : 0), h = 110 - k * 3.4, yc = row ? 390 : 210, p = mk(PP.kar, 'g', {});
  [-1, 1].forEach(s => { const cx = x + s * 12; mk(p, 'rect', { x: cx - 7, y: yc - h / 2, width: 14, height: h, rx: 7, fill: CHRF, stroke: NUC, 'stroke-width': 2 }); mk(p, 'path', { d: `M${cx - 7},${yc - h * 0.15} L${cx + 7},${yc - h * 0.15}`, stroke: '#fff', 'stroke-width': 3 }); }); PP.pairs.push(p); }
PP.n = txt(ps, 528, 500, '', { 'text-anchor': 'middle', 'font-size': 26, fill: NUC, 'font-weight': 600 });

/* ---------- C: one chromosome + four types ---------- */
const cl = sv('clS'), CL = {};
CL.c = mk(cl, 'g', {}); chromo(CL.c, 300, 160, 110, 230, 52, 12, 44);
CL.L = [lab(cl, 300, 274, 480, 230, 'Centromere', 'start', null, 22), lab(cl, 361, 274, 480, 320, 'Kinetochore', 'start', null, 22), lab(cl, 333, 420, 480, 420, 'Arm', 'start', null, 22),
  lab(cl, 332, 128, 480, 80, 'Satellite', 'start', null, 22), lab(cl, 332, 155, 480, 150, 'Secondary constriction', 'start', null, 22)];
CL.cm = mk(cl, 'path', { d: 'M200,274 L400,274', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const cr = sv('crS'), CR = {};
CR.t = [['Metacentric', 'MIDDLE', 145, 145], ['Sub-metacentric', 'OFF MIDDLE', 95, 195], ['Acrocentric', 'NEAR END', 28, 262], ['Telocentric', 'AT END', 0, 290]].map(([n, s, a, b], i) => { const g = mk(cr, 'g', {}), cx = 125 + i * 178;
  chromo(g, cx, 100 + (a ? 0 : 8), a, b, 26, 6); mk(g, 'path', { d: `M${cx - 50},${100 + a + 4} L${cx + 50},${100 + a + 4}`, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
  txt(g, cx, 470, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': i === 1 ? 19 : 21, 'font-weight': 700, fill: C.ink }); txt(g, cx, 502, s, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, fill: C.ac, 'font-weight': 600 }); return g; });

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['CHROMATIN', 'CHROMOSOMES'], [
  ['', 'When', 'In a cell that is not dividing', 'Only in a dividing cell', wt('V1', 'Chromatin'), wt('V1', 'Chromosomes'), s => { mk(s, 'circle', { cx: 65, cy: 50, r: 40, fill: NFL, stroke: NUC, 'stroke-width': 3 }); squig(s, 34, 44, 5, 0.9); squig(s, 40, 62, 4, 0.9); },
    s => { chromo(s, 65, 12, 30, 44, 12, 4); }],
  ['', 'Look', 'Long, fine, spread out', 'Short, thick, easy to see', wt('V2', 'Chromatin'), wt('V2', 'Chromosomes'), s => { squig(s, 10, 50, 9, 0.95, NUC, 3); }, s => { mk(s, 'rect', { x: 50, y: 14, width: 30, height: 74, rx: 15, fill: CHRF, stroke: NUC, 'stroke-width': 3 }); }],
  ['', 'Stuff', 'DNA with proteins', 'The same material, packed', wt('V3', 'Both'), wt('V3', 'packing'), s => { mk(s, 'circle', { cx: 50, cy: 50, r: 16, fill: PROT, stroke: BR, 'stroke-width': 2 }); squig(s, 66, 50, 4, 0.9, NUC, 4); },
    s => { mk(s, 'path', { d: 'M20,50 L110,50 M96,38 L110,50 L96,62', stroke: C.ac, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A chromosome has one extremely short arm and one very long arm. Which type is it?', opts: ['Metacentric', 'Acrocentric', 'Telocentric'], right: 1, why: 'Acrocentric. Its centromere sits close to one end.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['CENTROMERE IN OR NEAR THE MIDDLE', 'background:var(--ac2);color:#1F6B3F'], ['CENTROMERE NEAR OR AT THE END', 'background:var(--ink);color:#fff']], [
  ['cmeta', 'Metacentric', '<b>Middle</b> · two equal arms', 0, 0, wt('W2', 'Metacentric')], ['csub', 'Sub-metacentric', '<b>Near the middle</b> · shorter + longer arm', 0, 1, wt('W3', 'Sub')],
  ['cacro', 'Acrocentric', '<b>Near the end</b> · one extremely short arm', 1, 0, wt('W4', 'Acrocentric')], ['ctelo', 'Telocentric', '<b>At the very end</b> · no second arm', 1, 1, wt('W5', 'Telocentric')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'ellipse', { cx: 230, cy: 130, rx: 70, ry: 46, fill: '#D1495B', stroke: BR, 'stroke-width': 2.5 }); mk(TP, 'ellipse', { cx: 230, cy: 130, rx: 34, ry: 20, fill: '#E8808E' });
  mk(TP, 'rect', { x: 370, y: 60, width: 70, height: 150, rx: 6, fill: '#E7F1DD', stroke: '#4E7A34', 'stroke-width': 3 }); for (let k = 0; k < 3; k++) mk(TP, 'path', { d: `M370,${60 + k * 75} L440,${60 + k * 75}`, stroke: '#4E7A34', 'stroke-width': 3, 'stroke-dasharray': '5 4' });
  txt(TP, 230, 206, 'RBC · MANY MAMMALS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); txt(TP, 405, 236, 'SIEVE TUBE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 });
  txt(TP, 310, 262, 'NO NUCLEUS WHEN MATURE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.red, 'font-weight': 600 }); }

const EP = {
  jobs: [['spool', 'A spool of thread', 'WOUND TIGHT', 'spool'], ['case', 'A packed suitcase', 'FOLDED SMALL', 'suitcase'], ['book', 'A library', 'HOLDS THE PLANS', 'library']],
  learn: [['find', 'Inside', 'inside'], ['pack', 'Packing', 'pack'], ['four', '4 types', 'four']],
  hookW: 'doctor', split: ['nucleus', 'chromosomes'], st: ['Where', 'name'],
  cam: [],
  hook: t => { M.vis(HL.th, t, wt('H2', 'two') - 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis($('#hlt0'), t, wt('H2', 'metres'), 1e9, POP);
    M.vis(HL.cell, t, wt('H3', 'cells') - 0.2, 1e9, { ...POP, sc: 0.4 }); M.vis($('#hlt1'), t, wt('H3', 'small'), 1e9, POP);
    attr(HL.th, 'd', thread(M.io((t - wt('H3', 'fit')) / 2.4))); M.vis($('#hlP'), t, wt('H3', 'fit'), 1e9, POP); },
  measure: () => { [['hlt0', 392, 120], ['hlt1', 392, 420]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.rows[0], t, wt('D2', 'Robert') - 0.2, 1e9, { dx: -20, dy: 0 }); M.vis(DL.rows[1], t, wt('D3', 'Flemming') - 0.2, 1e9, { dx: -20, dy: 0 });
      M.vis(DL.nu, t, wt('D3', 'dyes') - 0.2, 1e9, { ...POP, sc: 0.5 }); DL.st.style.opacity = M.clamp((t - wt('D3', 'coloured')) / 0.6).toFixed(2); M.vis($('#dlP'), t, wt('D3', 'chromatin'), 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); DR.rows.forEach((g, i) => M.vis(g, t, wt('D4', ['DNA', 'histones', 'non', 'RNA'][i]) - 0.15, 1e9, { dx: -20, dy: 0 })); M.vis($('#drP'), t, wt('D4', 'RNA') + 0.3, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      attr(ZG.ncl, 'r', t > T0('Z3') && t < T1('Z3') ? (46 + 5 * Math.sin(t * 5)).toFixed(1) : 46);
      ZG.mv.forEach(m => { const ph = ((t - tZ[3]) * 0.35 + m.k / 6) % 1, y = m.up ? 480 - 440 * ph : 20 + 460 * ph, x = m.up ? 504 : 552; attr(m.e, 'transform', m.up ? `translate(${x - 30} ${y.toFixed(1)})` : '');
        if (!m.up) { attr(m.e, 'cx', x); attr(m.e, 'cy', y.toFixed(1)); } m.e.style.opacity = (M.clamp(ph * 8) * M.clamp((1 - ph) * 8)).toFixed(2); });
      avZ(t, wt('Z5', 'directions') - 0.4, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      const k1 = M.io((t - tPs[1] - 0.2) / 1.8), k2 = M.io((t - tPs[2] - 0.2) / 1.8), L = 900 - 200 * k1 - 480 * k2, r = 22 * k1 + 10 * k2, w = 30 * k1 + 30 * k2, A = 40 * (1 - k1);
      attr(PP.th, 'd', thP(L, r, w, A, t * 0.6)); attr(PP.th, 'stroke-width', (4 + 6 * k2).toFixed(1)); M.vis(PP.th, t, T0('P1') + 0.3, tPs[3] + 0.1, { dy: 0, fade: 0.3, outDur: 0.3 });
      M.vis(PP.ch, t, tPs[3] + 0.1, tPs[4] - 0.05, { ...POP, sc: 0.3, outDur: 0.25 });
      M.vis(PP.kar, t, tPs[4], 1e9, { dy: 0, fade: 0.2 }); const nk = Math.max(0, Math.min(23, Math.floor((t - tPs[4]) / 0.12)));
      PP.pairs.forEach((p, k) => { p.style.opacity = k < nk ? 1 : 0; }); PP.n.textContent = t > tPs[4] ? `${nk * 2} CHROMOSOMES · ${nk} PAIRS` : ''; }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.c, t, T0('C1') + 0.4, 1e9, { ...POP, sc: 0.6 });
      M.draw(CL.cm, t, wt('C2', 'centromere') - 0.2, 0.5); labRun(CL.L[0], t, wt('C2', 'centromere')); labRun(CL.L[1], t, wt('C3', 'kinetochores')); labRun(CL.L[2], t, wt('C4', 'arms'));
      labRun(CL.L[3], t, wt('C6', 'satellite')); labRun(CL.L[4], t, wt('C6', 'constriction'));
      M.vis($('#cr'), t, T0('C4') - 0.1, out, { dx: 60, dy: 0, ...o });
      CR.t.forEach((g, i) => M.vis(g, t, wt(i < 2 ? 'C4' : 'C5', ['metacentric', 'sub', 'acrocentric', 'telocentric'][i]) - 0.2, 1e9, { ...POP, sc: 0.6 })); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'centromere') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Every living cell has a nucleus', right: 'Mature RBCs of many mammals and sieve tube cells have none', tRight: wt('X3', 'red') - 0.1,
    type: 'Labelled nucleus, chromosome types (boards); statement questions (NEET)', tType: wt('E1', 'labelled'),
    xRun: t => M.vis(TP, t, wt('X3', 'mature') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement is correct?', cols: 1, optW: 968, optH: 70, optFs: 24, optY: 140, qW: 840,
      opts: ['Nuclear pores let RNA and proteins move only out of the nucleus', 'The outer nuclear membrane often joins the ER and bears ribosomes', 'Chromosomes are clearly seen in non-dividing cells', 'A telocentric chromosome has its centromere in the middle'], right: 1 },
    tOpts: wt('Q1', 'correct') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">B</b>'], ['Pores: <b>both</b> directions'], ['Chromosomes: <b>dividing</b> cells'], ['Telocentric: at the <b>end</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'both'), wt('A2', 'dividing'), wt('A3', 'end')],
    recapT: 'Recap · the nucleus and chromosomes',
    recap: ['<b>Nucleus</b>: first described by Robert Brown, 1831 · <b>chromatin</b> named by Flemming', '<b>Chromatin</b>: DNA + histones + non-histone proteins + RNA · human: about 2 m DNA, 46 chromosomes',
      '<b>Envelope</b>: 2 membranes, perinuclear space 10-50 nm · outer joins ER, bears ribosomes · pores', '<b>Nucleolus</b>: no membrane, makes rRNA · <b>centromere</b> with kinetochores · satellite',
      '<b>Types</b>: metacentric · sub-metacentric · acrocentric · telocentric'],
    yq: ['What is the perinuclear space?', 'Name the four types of chromosome by centromere position.', 'Name two kinds of cells that have no nucleus when mature.'],
    nextL: 'NEXT · EP 68', nextT: 'What is left when you burn a living thing? Chemical Composition' },
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
