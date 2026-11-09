// PUC Biology Ep 68: How to Analyse Chemical Composition (Living diagram, leaf green)
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


/* ===== Ep 68: how to analyse chemical composition ===== */
Object.assign(M.IC, {
  flame: ['M12 3c3 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-3-1-5 0-7Z'],
  cup: ['M5 8h12v6a6 6 0 0 1-12 0Z', 'M17 10h2a2 2 0 0 1 0 4h-2', 'M8 3v2M11 3v2M14 3v2'],
  salt: ['M8 4h8l1 4H7Z', 'M7 8h10v12H7Z', 'M10 6h0M14 6h0'],
  grind: ['M4 12h16a8 8 0 0 1-16 0Z', 'M14 3l-3 9'],
  filter: ['M4 4h16l-6 8v7l-4 2v-9Z'],
  rock: ['M4 17l3-8 5-3 6 4 2 7Z'], hex: ['M12 3l8 4.5v9L12 21l-8-4.5v-9Z'], drop: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z'], chain: ['M3 16l4-8 4 8 4-8 4 8'],
});
const sv = id => $('#' + id);
const CYT = '#F4EEE2', CRU = '#C9A06A', ASH = '#9CA3AF', CO2 = '#6B7280', PROT = '#D0632F', AMB = '#D9A23B', CAR = '#E58A3C', FIL = '#F3E7A8', RET = '#8C6D4F';
// chemistry text with sub/sup: parts [['Ca'], ['++', 'sup']]
const chem = (g, x, y, parts, a = {}) => { const e = mk(g, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: C.ink }, a));
  parts.forEach(([s, k]) => { const ts = document.createElementNS(nsv, 'tspan'); ts.textContent = s; if (k) { ts.setAttribute('baseline-shift', k === 'sup' ? 'super' : 'sub'); ts.setAttribute('font-size', '65%'); } e.appendChild(ts); }); return e; };
const hexD = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
// four small molecules: sugar, amino acid, fatty acid, nucleotide
const molS = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: hexD(x, y, 30 * s), fill: '#F4E3B5', stroke: GOLD, 'stroke-width': 4 * s }); mk(w, 'circle', { cx: x + 26 * s, cy: y - 15 * s, r: 5 * s, fill: '#E25B45' }); return w; };
const molA = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: x, cy: y, r: 12 * s, fill: BR }); [[-34, 0, '#2F6FEB'], [34, 0, '#E25B45'], [0, -32, '#fff'], [0, 32, PROT]].forEach(([dx, dy, c2]) => { mk(w, 'path', { d: `M${x},${y} L${x + dx * s},${y + dy * s}`, stroke: BR, 'stroke-width': 4 * s }); mk(w, 'circle', { cx: x + dx * s, cy: y + dy * s, r: (dy === 32 ? 13 : 9) * s, fill: c2, stroke: BR, 'stroke-width': 2 * s }); }); return w; };
const molF = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); let d = `M${x - 60 * s},${y}`; for (let k = 1; k <= 8; k++) d += ` L${x - 60 * s + k * 15 * s},${y + (k % 2 ? -12 : 12) * s}`; mk(w, 'path', { d, stroke: AMB, 'stroke-width': 5 * s, fill: 'none', 'stroke-linejoin': 'round' }); mk(w, 'circle', { cx: x + 66 * s, cy: y - 12 * s, r: 9 * s, fill: '#E25B45', stroke: BR, 'stroke-width': 2 * s }); return w; };
const molN = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: x - 34 * s, cy: y - 14 * s, r: 13 * s, fill: '#F2C94C', stroke: BR, 'stroke-width': 2 * s }); mk(w, 'path', { d: `M${x - 12 * s},${y - 22 * s} L${x + 10 * s},${y - 22 * s} L${x + 16 * s},${y} L${x},${y + 14 * s} L${x - 18 * s},${y} Z`, fill: '#F4E3B5', stroke: GOLD, 'stroke-width': 3 * s });
  mk(w, 'rect', { x: x + 16 * s, y: y - 30 * s, width: 30 * s, height: 22 * s, rx: 4 * s, fill: NUC }); mk(w, 'path', { d: `M${x - 21 * s},${y - 18 * s} L${x - 12 * s},${y - 18 * s}`, stroke: BR, 'stroke-width': 3 * s }); return w; };

/* ---------- H: the burnt chapati ---------- */
const hl = sv('hlS'), HL = {};
const pan = (g, cx) => { mk(g, 'ellipse', { cx, cy: 320, rx: 140, ry: 44, fill: '#3B3F4A', stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: `M${cx + 136},316 L${cx + 186},300`, stroke: BR, 'stroke-width': 12, 'stroke-linecap': 'round' }); };
HL.p0 = mk(hl, 'g', {}); pan(HL.p0, 200); mk(HL.p0, 'ellipse', { cx: 200, cy: 310, rx: 104, ry: 30, fill: '#E3C38B', stroke: '#A8783A', 'stroke-width': 3 }); [[170, 304], [222, 314], [196, 300]].forEach(([x, y]) => mk(HL.p0, 'ellipse', { cx: x, cy: y, rx: 9, ry: 4, fill: '#B98A4A' }));
HL.p1 = mk(hl, 'g', {}); pan(HL.p1, 560); HL.ash = mk(HL.p1, 'path', { d: 'M520,316 C530,296 590,296 600,316 Z', fill: ASH, stroke: '#6B7280', 'stroke-width': 2 });
HL.sm = [0, 1, 2].map(k => mk(hl, 'path', { d: `M${530 + k * 30},280 c-12,-20 12,-30 0,-50 s12,-30 0,-50`, stroke: '#B8BCC6', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
HL.ar = mk(hl, 'path', { d: 'M352,240 L402,240 M390,228 L402,240 L390,252', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });

/* ---------- D: elements and compounds + body vs crust ---------- */
const dl = sv('dlS'), DL = {};
DL.el = [['C', 'CARBON', BR], ['H', 'HYDROGEN', '#7A8899'], ['O', 'OXYGEN', '#E25B45']].map(([s, n, c2], i) => { const g = mk(dl, 'g', {}), x = 60 + i * 236; mk(g, 'rect', { x, y: 96, width: 200, height: 150, rx: 14, fill: C.soft, stroke: c2, 'stroke-width': 3 });
  txt(g, x + 100, 190, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 64, 'font-weight': 700, fill: c2 }); txt(g, x + 100, 228, n, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); return g; });
DL.cp = [['Water', 'H2O'], ['Sugar', ''], ['Salt', 'NaCl']].map(([n, f], i) => { const g = mk(dl, 'g', {}), x = 60 + i * 236; mk(g, 'rect', { x, y: 290, width: 200, height: 150, rx: 14, fill: '#fff', stroke: C.ac, 'stroke-width': 3 });
  if (i === 0) { mk(g, 'circle', { cx: x + 100, cy: 345, r: 18, fill: '#E25B45' }); mk(g, 'circle', { cx: x + 72, cy: 330, r: 11, fill: '#C9D1DB', stroke: BR, 'stroke-width': 1.5 }); mk(g, 'circle', { cx: x + 128, cy: 330, r: 11, fill: '#C9D1DB', stroke: BR, 'stroke-width': 1.5 }); }
  if (i === 1) molS(g, x + 100, 345, 0.9); if (i === 2) { mk(g, 'rect', { x: x + 74, y: 320, width: 52, height: 52, rx: 4, fill: '#fff', stroke: '#9AA0AC', 'stroke-width': 3 }); mk(g, 'path', { d: `M${x + 74},346 L${x + 126},346 M${x + 100},320 L${x + 100},372`, stroke: '#9AA0AC', 'stroke-width': 2 }); }
  txt(g, x + 100, 418, n, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink }); return g; });
txt(dl, 36, 278, 'ELEMENTS JOIN INTO COMPOUNDS', { 'font-size': 15, 'letter-spacing': 1.4, fill: C.ac, 'font-weight': 600 });
const dr = sv('drS'), DR = {};
DR.leg = mk(dr, 'g', {}); mk(DR.leg, 'rect', { x: 200, y: 70, width: 18, height: 18, rx: 4, fill: C.ac }); txt(DR.leg, 226, 85, 'HUMAN BODY', { 'font-size': 15, 'letter-spacing': 1.3, fill: C.ink, 'font-weight': 600 });
mk(DR.leg, 'rect', { x: 400, y: 70, width: 18, height: 18, rx: 4, fill: CRU }); txt(DR.leg, 426, 85, "EARTH'S CRUST", { 'font-size': 15, 'letter-spacing': 1.3, fill: C.ink, 'font-weight': 600 });
txt(DR.leg, 748, 85, '% BY WEIGHT', { 'text-anchor': 'end', 'font-size': 14, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 });
DR.rows = [['Carbon', 18.5, 0.03, '18.5', '0.03'], ['Oxygen', 65.0, 46.6, '65.0', '46.6'], ['Hydrogen', 0.5, 0.14, '0.5', '0.14'], ['Silicon', 0, 27.7, 'negligible', '27.7']].map(([n, b, c2, bs, cs], i) => { const g = mk(dr, 'g', {}), y = 120 + i * 92;
  const bg = mk(g, 'rect', { x: 28, y: y - 6, width: 728, height: 84, rx: 12, fill: 'transparent' }); txt(g, 44, y + 44, n, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: C.ink });
  const b1 = mk(g, 'rect', { x: 200, y: y + 6, width: 0, height: 28, rx: 5, fill: C.ac }), b2 = mk(g, 'rect', { x: 200, y: y + 40, width: 0, height: 28, rx: 5, fill: CRU });
  const t1 = txt(g, 210, y + 28, bs, { 'font-size': 18, fill: C.ac, 'font-weight': 600 }), t2 = txt(g, 210, y + 62, cs, { 'font-size': 18, fill: '#8C6A3A', 'font-weight': 600 }); return { g, bg, b1, b2, t1, t2, b, c: c2 }; });

/* ---------- Z: zoom ladder TISSUE -> CELLS -> CELL -> MOLECULES ---------- */
const ZN = ['VEGETABLE', 'TISSUE', 'CELL', 'MOLECULES'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Living tissue', 'A vegetable, or a piece of liver.', 'Our sample'],
  ['RUNG 2 OF 4', 'Tissue', 'Made of cells, packed side by side.', ''], ['RUNG 3 OF 4', 'One cell', 'Full of water and many dissolved chemicals.', ''],
  ['RUNG 4 OF 4', 'Small molecules', 'Sugars, amino acids, fatty acids, nucleotides.', 'What we want to pull out']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'rect', { x: 0, y: 420, width: 1056, height: 106, fill: '#EDE4D3' }); mk(g, 'path', { d: 'M300,250 C300,215 330,200 360,200 L790,236 C806,240 806,262 790,266 L360,302 C330,302 300,288 300,250 Z', fill: CAR, stroke: '#A8561E', 'stroke-width': 4 });
  [[420, 214, 290], [520, 222, 282], [640, 232, 272]].forEach(([x, y1, y2]) => mk(g, 'path', { d: `M${x},${y1 + 6} L${x + 8},${y1 + 22} M${x + 30},${y2 - 6} L${x + 38},${y2 - 22}`, stroke: '#A8561E', 'stroke-width': 3 }));
  [[-1, 0], [0, 1], [1, 2]].forEach(([s]) => mk(g, 'path', { d: `M304,250 C${260 + s * 10},${200 + s * 40} ${200},${170 + s * 50} ${160},${150 + s * 60}`, stroke: '#3E9B5F', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }));
  LB[0] = [lab(g, 560, 230, 640, 120, 'Living tissue', 'start', null, 24)]; }
{ const g = ZG[1]; for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) { const x = 60 + c * 96 + (r % 2) * 48, y = 50 + r * 82; let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k; d += (k ? 'L' : 'M') + (x + 50 * Math.cos(a)).toFixed(1) + ',' + (y + 46 * Math.sin(a)).toFixed(1); } mk(g, 'path', { d: d + 'Z', fill: '#FCE3C8', stroke: '#A8561E', 'stroke-width': 2.5 }); mk(g, 'circle', { cx: x, cy: y, r: 9, fill: NUC }); }
  LB[1] = [lab(g, 540, 214, 640, 470, 'Cells', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'rect', { x: 200, y: 40, width: 656, height: 446, rx: 40, fill: '#FCE3C8', stroke: '#A8561E', 'stroke-width': 6 }); mk(g, 'rect', { x: 420, y: 110, width: 380, height: 300, rx: 120, fill: '#DCEBF5', stroke: WAT, 'stroke-width': 4 }); mk(g, 'circle', { cx: 300, cy: 300, r: 50, fill: NUC });
  ZG.dots = []; for (let k = 0; k < 22; k++) ZG.dots.push(mk(g, 'circle', { cx: 450 + (k * 53) % 320, cy: 140 + (k * 37) % 240, r: 6, fill: [GOLD, PROT, AMB, NUC][k % 4] }));
  LB[2] = [lab(g, 700, 140, 900, 80, 'Water', 'start', null, 24), lab(g, 560, 300, 640, 470, 'Dissolved chemicals', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#EEF5FA' }); ZG.m = [molS(g, 220, 190, 1.8), molA(g, 760, 170, 1.6), molF(g, 260, 390, 1.6), molN(g, 760, 380, 1.6)];
  LB[3] = [lab(g, 220, 244, 120, 290, 'Sugar', 'start', null, 24), lab(g, 760, 222, 860, 270, 'Amino acid', 'start', null, 24), lab(g, 300, 410, 380, 470, 'Fatty acid', 'start', null, 24), lab(g, 760, 402, 860, 470, 'Nucleotide', 'start', null, 24)]; }
const FOC = [[560, 250, 60], [528, 214, 60], [600, 260, 70], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'living')], [wt('Z3', 'cells')], [wt('Z4', 'water'), wt('Z4', 'dissolved')], [wt('Z5', 'sugars'), wt('Z5', 'amino'), wt('Z5', 'fatty'), wt('Z5', 'nucleotides')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So how do we pull them out?' });

/* ---------- P: method one, the compounds ---------- */
const PN = ['TAKE', 'GRIND', 'STRAIN', 'TWO PARTS', 'ANALYSE'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['METHOD ONE', 'Find the compounds', 'Watch it, step by step.', ''], ['STEP 1 OF 5', 'Take', 'Tissue in a mortar, with trichloroacetic acid.', ''],
  ['STEP 2 OF 5', 'Grind', 'With a pestle, into a thick slurry.', 'Like a paste'], ['STEP 3 OF 5', 'Strain', 'Through cheesecloth or cotton.', ''],
  ['STEP 4 OF 5', 'Two parts', 'Filtrate: acid-soluble pool. Retentate: acid-insoluble.', ''], ['STEP 5 OF 5', 'Analyse', 'Separate each compound. Find its formula and structure.', '']]);
const ps = sv('pS'), PP = {};
PP.mor = mk(ps, 'g', {}); mk(PP.mor, 'path', { d: 'M120,300 L420,300 C420,400 360,450 270,450 C180,450 120,400 120,300 Z', fill: '#E7E2D8', stroke: BR, 'stroke-width': 4 }); mk(PP.mor, 'rect', { x: 210, y: 448, width: 120, height: 20, rx: 6, fill: '#D3CCBE', stroke: BR, 'stroke-width': 3 });
PP.sl = mk(ps, 'path', { d: 'M136,320 L404,320 C400,390 350,432 270,432 C190,432 140,390 136,320 Z', fill: '#B97A3E' });
PP.bits = [[200, 320], [260, 330], [320, 318], [230, 360], [300, 360]].map(([x, y]) => mk(ps, 'path', { d: `M${x - 18},${y} L${x},${y - 20} L${x + 22},${y - 4} L${x + 10},${y + 14} Z`, fill: CAR, stroke: '#A8561E', 'stroke-width': 2.5 }));
PP.pes = mk(ps, 'g', {}); mk(PP.pes, 'rect', { x: -14, y: -150, width: 28, height: 170, rx: 14, fill: '#D3CCBE', stroke: BR, 'stroke-width': 3 });
PP.bot = mk(ps, 'g', {}); mk(PP.bot, 'rect', { x: 330, y: 110, width: 60, height: 90, rx: 8, fill: '#EAF3FA', stroke: BR, 'stroke-width': 3 }); mk(PP.bot, 'rect', { x: 346, y: 92, width: 28, height: 20, rx: 3, fill: BR }); txt(PP.bot, 400, 150, 'TRICHLOROACETIC ACID', { 'font-size': 15, 'letter-spacing': 1.2, fill: C.ink, 'font-weight': 600 });
PP.pour = mk(ps, 'path', { d: 'M360,200 L340,300', stroke: '#9CC8E6', 'stroke-width': 6, 'stroke-dasharray': '10 8' });
PP.fun = mk(ps, 'g', {}); mk(PP.fun, 'path', { d: 'M600,140 L820,140 L730,260 L730,300 L690,300 L690,260 Z', fill: '#F6F2E8', stroke: BR, 'stroke-width': 4 }); mk(PP.fun, 'path', { d: 'M616,150 L804,150', stroke: '#E8DCC2', 'stroke-width': 10 });
mk(PP.fun, 'path', { d: 'M640,420 L640,490 L780,490 L780,420', stroke: BR, 'stroke-width': 4, fill: 'none' }); PP.fil = mk(PP.fun, 'rect', { x: 642, y: 488, width: 136, height: 0, fill: FIL });
PP.ret = mk(PP.fun, 'path', { d: 'M630,150 L790,150 L760,190 L660,190 Z', fill: RET });
PP.drop = mk(ps, 'circle', { cx: 710, cy: 320, r: 7, fill: '#E8D873' });
PP.Lf = lab(ps, 780, 460, 860, 400, 'Filtrate', 'start', null, 22); PP.Lr = lab(ps, 775, 170, 860, 120, 'Retentate', 'start', null, 22);
PP.sf = txt(ps, 872, 432, 'ACID-SOLUBLE', { 'font-size': 15, 'letter-spacing': 1.2, fill: '#8C7A1E', 'font-weight': 600 }); PP.sr = txt(ps, 872, 152, 'ACID-INSOLUBLE', { 'font-size': 15, 'letter-spacing': 1.2, fill: RET, 'font-weight': 600 });
PP.vi = mk(ps, 'g', {}); PP.vs = [molS, molA, molF, molN].map((f, i) => { const g = mk(PP.vi, 'g', {}), x = 140 + i * 230; mk(g, 'rect', { x: x - 80, y: 140, width: 160, height: 260, rx: 18, fill: '#fff', stroke: C.ac, 'stroke-width': 3 }); f(g, x, 250, 0.9);
  txt(g, x, 370, ['SUGAR', 'AMINO ACID', 'FATTY ACID', 'NUCLEOTIDE'][i], { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ink, 'font-weight': 600 }); return g; });
PP.vt = txt(PP.vi, 528, 460, 'EACH ONE: FORMULA · LIKELY STRUCTURE', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });

/* ---------- C: method two, the elements ---------- */
const cl = sv('clS'), CL = {};
CL.bal = mk(cl, 'g', {}); mk(CL.bal, 'rect', { x: 232, y: 420, width: 320, height: 70, rx: 12, fill: '#DADDE3', stroke: BR, 'stroke-width': 3 }); mk(CL.bal, 'rect', { x: 330, y: 438, width: 124, height: 36, rx: 6, fill: '#2E3440' }); mk(CL.bal, 'rect', { x: 262, y: 404, width: 260, height: 16, rx: 6, fill: '#B8BCC6', stroke: BR, 'stroke-width': 2.5 });
CL.dig = txt(CL.bal, 392, 464, '', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: '#9FD3B0', 'font-weight': 600 });
CL.dish = mk(cl, 'path', { d: 'M282,404 C282,380 502,380 502,404 Z', fill: '#F6F2E8', stroke: BR, 'stroke-width': 3 });
CL.s = mk(cl, 'path', { d: 'M300,394 C310,290 470,280 486,390 Z', fill: '#7FB069', stroke: '#4E7A34', 'stroke-width': 3 });
CL.ash = mk(cl, 'path', { d: 'M344,396 C356,360 428,360 440,396 Z', fill: ASH, stroke: '#6B7280', 'stroke-width': 2 });
CL.fl = mk(cl, 'g', { transform: 'translate(0 -100)' }); [-50, 0, 50].forEach(dx => mk(CL.fl, 'path', { d: `M${392 + dx},500 c-20,-30 -10,-60 0,-84 c10,24 20,54 0,84 Z`, fill: '#F2994A', stroke: '#C2562A', 'stroke-width': 2.5 }));
CL.w = [0, 1, 2, 3].map(k => mk(cl, 'path', { d: 'M0,-12 C6,-4 8,0 8,4 a8,8 0 0 1 -16,0 C-8,0 -6,-4 0,-12 Z', fill: WAT }));
CL.g = [0, 1, 2, 3, 4, 5].map(k => { const g = mk(cl, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r: 26, fill: k % 2 ? '#DCEBF5' : '#E5E7EB', stroke: k % 2 ? WAT : CO2, 'stroke-width': 2.5 }); chem(g, 0, 7, k % 2 ? [['H'], ['2', 'sub'], ['O']] : [['CO'], ['2', 'sub']], { 'text-anchor': 'middle', 'font-size': 18, fill: k % 2 ? '#2E6E99' : '#3F4550' }); return g; });
CL.trk = ['WET WEIGHT', 'DRY WEIGHT', 'BURN', 'ASH'].map((n, i) => { const g = mk(cl, 'g', {}), x = 48 + i * 176; const r = mk(g, 'rect', { x, y: 84, width: 160, height: 48, rx: 10, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 2 }); const tx = txt(g, x + 80, 114, n, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, fill: '#9AA0AC', 'font-weight': 600 }); return { g, r, tx }; });
const cr = sv('crS'), CR = {};
CR.r1 = [['Na', '+', 'SODIUM'], ['K', '+', 'POTASSIUM'], ['Ca', '++', 'CALCIUM'], ['Mg', '++', 'MAGNESIUM']].map(([s, c2, n], i) => { const g = mk(cr, 'g', {}), x = 36 + i * 182; mk(g, 'rect', { x, y: 110, width: 166, height: 150, rx: 14, fill: C.soft, stroke: ASH, 'stroke-width': 2.5 });
  chem(g, x + 83, 196, [[s], [c2, 'sup']], { 'text-anchor': 'middle', 'font-size': 44 }); txt(g, x + 83, 238, n, { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); return g; });
CR.h1 = txt(cr, 36, 92, 'IN THE ASH · INORGANIC ELEMENTS', { 'font-size': 16, 'letter-spacing': 1.4, fill: '#4B5563', 'font-weight': 600 });
CR.h2 = txt(cr, 36, 322, 'ALSO IN THE ACID-SOLUBLE FRACTION', { 'font-size': 16, 'letter-spacing': 1.4, fill: '#8C7A1E', 'font-weight': 600 });
CR.r2 = [['Sulphate', [['SO'], ['4', 'sub'], ['2-', 'sup']]], ['Phosphate', [['PO'], ['4', 'sub'], ['3-', 'sup']]]].map(([n, f], i) => { const g = mk(cr, 'g', {}), x = 36 + i * 364; mk(g, 'rect', { x, y: 340, width: 348, height: 150, rx: 14, fill: '#FBF7E2', stroke: '#D9C46A', 'stroke-width': 2.5 });
  chem(g, x + 174, 420, f, { 'text-anchor': 'middle', 'font-size': 44 }); txt(g, x + 174, 466, n.toUpperCase(), { 'text-anchor': 'middle', 'font-size': 14, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['ELEMENTAL ANALYSIS', 'COMPOUND ANALYSIS'], [
  ['', 'How', 'Weigh, dry, then burn', 'Grind in acid, then strain', wt('V1', 'Elemental'), wt('V1', 'Compound'), s => { [-30, 0, 30].forEach(dx => mk(s, 'path', { d: `M${65 + dx},86 c-12,-18 -6,-36 0,-50 c6,14 12,32 0,50 Z`, fill: '#F2994A', stroke: '#C2562A', 'stroke-width': 2 })); },
    s => { mk(s, 'path', { d: 'M20,40 L110,40 C110,80 90,94 65,94 C40,94 20,80 20,40 Z', fill: '#E7E2D8', stroke: BR, 'stroke-width': 3 }); mk(s, 'path', { d: 'M80,8 L64,60', stroke: BR, 'stroke-width': 8, 'stroke-linecap': 'round' }); }],
  ['', 'Tells you', 'Elements: H, O, Cl, C...', 'Organic and inorganic compounds', wt('V2', 'Elemental'), wt('V2', 'Compound'), s => { txt(s, 65, 66, 'C H O', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink }); },
    s => { molS(s, 40, 50, 0.6); molA(s, 96, 50, 0.55); }],
  ['', 'Example', 'Ash: calcium, magnesium', 'Filtrate: amino acids, sugars', wt('V3', 'ash'), wt('V3', 'filtrate'), s => { mk(s, 'path', { d: 'M30,80 C40,40 90,40 100,80 Z', fill: ASH, stroke: '#6B7280', 'stroke-width': 2 }); },
    s => { mk(s, 'path', { d: 'M30,20 L30,86 L100,86 L100,20', stroke: BR, 'stroke-width': 3, fill: 'none' }); mk(s, 'rect', { x: 32, y: 48, width: 66, height: 36, fill: FIL }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'You burn a dried leaf completely. What is left in the ash?', opts: ['Carbon compounds', 'Magnesium', 'Water'], right: 1, why: 'Magnesium. Water left on drying, carbon compounds left as gases.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['STAYS IN THE ASH', 'background:#E5E7EB;color:#374151'], ['GONE · AS GAS OR VAPOUR', 'background:#DCEBF5;color:#2E6E99']], [
  ['rock', 'Calcium', '<b>Inorganic</b> element', 0, 0, wt('W2', 'ash')], ['hex', 'Glucose', 'A <b>carbon compound</b> · leaves as gas', 1, 0, wt('W3', 'Gone')],
  ['rock', 'Magnesium', '<b>Inorganic</b> element', 0, 1, wt('W4', 'ash')], ['drop', 'Water', '<b>Evaporates</b> on drying', 1, 1, wt('W5', 'Gone')],
  ['chain', 'Amino acids', '<b>Carbon compounds</b> · leave as gas', 1, 2, wt('W6', 'Gone')], ['rock', 'Sodium', '<b>Inorganic</b> element', 0, 2, wt('W7', 'ash')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'path', { d: 'M200,40 L360,40 L300,130 L300,160 L260,160 L260,130 Z', fill: '#F6F2E8', stroke: BR, 'stroke-width': 3 }); mk(TP, 'path', { d: 'M222,48 L338,48 L318,76 L242,76 Z', fill: RET });
  mk(TP, 'path', { d: 'M230,180 L230,240 L330,240 L330,180', stroke: BR, 'stroke-width': 3, fill: 'none' }); mk(TP, 'rect', { x: 232, y: 206, width: 96, height: 32, fill: FIL });
  txt(TP, 190, 66, 'RETENTATE · INSOLUBLE', { 'text-anchor': 'end', 'font-size': 14, 'letter-spacing': 1.1, fill: RET, 'font-weight': 600 }); txt(TP, 216, 226, 'FILTRATE · SOLUBLE', { 'text-anchor': 'end', 'font-size': 14, 'letter-spacing': 1.1, fill: '#8C7A1E', 'font-weight': 600 }); }

const EP = {
  jobs: [['flame', 'A burnt chapati', 'ONLY ASH LEFT', 'chapati'], ['cup', 'A cup of tea', 'THINGS DISSOLVED', 'tea'], ['salt', 'A pinch of salt', 'A COMPOUND', 'salt']],
  learn: [['grind', 'Grind', 'grind'], ['filter', 'Strain', 'strain'], ['flame', 'Burn', 'burn']],
  hookW: 'doctor', split: ['trick', 'more'], st: ['Burning', 'Grinding'],
  cam: [],
  hook: t => { M.vis(HL.p0, t, wt('H2', 'chapati') - 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis($('#hlt0'), t, wt('H2', 'hot'), 1e9, POP); M.draw(HL.ar, t, wt('H2', 'came') - 0.3, 0.4);
    M.vis(HL.p1, t, wt('H2', 'came'), 1e9, { ...POP, sc: 0.6 }); M.vis($('#hlt1'), t, wt('H2', 'ash'), 1e9, POP);
    HL.sm.forEach((s, k) => { M.vis(s, t, wt('H2', 'ash') + k * 0.2, 1e9, { dy: 0, fade: 0.4 }); attr(s, 'transform', `translate(0 ${(-((t * 30 + k * 20) % 40)).toFixed(1)})`); });
    M.vis($('#hlP'), t, wt('H3', 'where') - 0.1, 1e9, POP); },
  measure: () => { [['hlt0', 200, 420], ['hlt1', 560, 420]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); DL.el.forEach((g, i) => M.vis(g, t, wt('D2', ['carbon', 'hydrogen', 'oxygen'][i]) - 0.15, 1e9, { ...POP, sc: 0.6 }));
      DL.cp.forEach((g, i) => M.vis(g, t, wt('D3', ['water', 'sugar', 'salt'][i]) - 0.15, 1e9, { ...POP, sc: 0.6 })); M.vis($('#dlP'), t, wt('D2', 'pure') - 0.1, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.leg, t, T0('D4') + 0.2, 1e9, { dy: 10 }); const tg = wt('D4', 'amounts') - 0.4;
      DR.rows.forEach((r, i) => { M.vis(r.g, t, T0('D4') + 0.4 + i * 0.2, 1e9, { dy: 14 }); const k = M.io((t - tg - i * 0.15) / 0.9); attr(r.b1, 'width', Math.max(r.b ? 3 : 0, 7 * r.b * k).toFixed(1)); attr(r.b2, 'width', Math.max(3, 7 * r.c * k).toFixed(1));
        attr(r.t1, 'x', 212 + 7 * r.b * k); attr(r.t2, 'x', 212 + 7 * r.c * k); r.t1.style.opacity = r.t2.style.opacity = k.toFixed(2);
        attr(r.bg, 'fill', (i === 0 && t > wt('D5', 'Carbon') - 0.2 && t < wt('D5', 'Silicon') - 0.2) || (i === 3 && t > wt('D5', 'Silicon') - 0.2) ? C.ac3 : 'transparent'); });
      M.vis($('#drP'), t, wt('D4', 'different') - 0.1, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      ZG.dots.forEach((d, k) => attr(d, 'transform', `translate(${(6 * Math.sin(t * 1.5 + k)).toFixed(1)} ${(6 * Math.cos(t * 1.3 + k * 2)).toFixed(1)})`));
      ZG.m.forEach((m, k) => attr(m, 'transform', `translate(0 ${(6 * Math.sin(t * 1.6 + k * 1.7)).toFixed(1)})`));
      avZ(t, wt('Z5', 'pull') - 0.3, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]); const vOut = tPs[4] - 0.05;
      M.vis(PP.mor, t, T0('P1') + 0.3, vOut, { dy: 20, outDur: 0.25 }); const gr = M.io((t - tPs[1] - 0.2) / 2.2);
      PP.bits.forEach((b, k) => { attr(b, 'transform', `translate(0 ${(20 * gr).toFixed(1)})`); b.style.opacity = t < tPs[0] + k * 0.12 || t > vOut ? 0 : (1 - gr).toFixed(2); });
      PP.sl.style.opacity = t > vOut ? 0 : (gr * (1 - 0.6 * M.io((t - tPs[2] - 0.5) / 2))).toFixed(2);
      M.vis(PP.bot, t, wt('P2', 'acid') - 0.3, tPs[1] + 0.3, { dy: -20, outDur: 0.25 }); M.vis(PP.pour, t, wt('P2', 'acid'), tPs[1] + 0.3, { dy: 0, fade: 0.2, outDur: 0.25 });
      const pe = t > tPs[1] && t < tPs[2] + 0.3; PP.pes.style.opacity = pe ? 1 : 0; const a = (t - tPs[1]) * 5; attr(PP.pes, 'transform', `translate(${(270 + 60 * Math.cos(a)).toFixed(1)} ${(400 + 12 * Math.sin(a)).toFixed(1)}) rotate(${(-20 * Math.cos(a)).toFixed(1)})`);
      M.vis(PP.fun, t, tPs[2] - 0.1, vOut, { dy: 20, outDur: 0.25 }); const fl = M.io((t - tPs[2] - 0.6) / 3.5); attr(PP.fil, 'height', (64 * fl).toFixed(1)); attr(PP.fil, 'y', (488 - 64 * fl).toFixed(1)); PP.ret.style.opacity = M.clamp((t - tPs[2] - 0.4) / 0.6).toFixed(2);
      const dp = ((t - tPs[2]) % 0.9) / 0.9; attr(PP.drop, 'cy', (305 + 120 * dp).toFixed(1)); PP.drop.style.opacity = t > tPs[2] + 0.5 && t < vOut ? 1 : 0;
      labRun(PP.Lf, t, wt('P5', 'filtrate'), vOut); labRun(PP.Lr, t, wt('P5', 'retentate'), vOut); M.vis(PP.sf, t, wt('P5', 'pool') - 0.2, vOut, POP); M.vis(PP.sr, t, wt('P5', 'fraction') - 0.2, vOut, POP);
      M.vis(PP.vi, t, tPs[4], 1e9, { dy: 0, fade: 0.2 }); PP.vs.forEach((g, k) => M.vis(g, t, tPs[4] + 0.2 + k * 0.35, 1e9, { ...POP, sc: 0.7 })); M.vis(PP.vt, t, wt('P6', 'formula') - 0.2, 1e9, POP); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.bal, t, T0('C1') + 0.3, 1e9, { dy: 20 }); M.vis(CL.dish, t, T0('C1') + 0.4, 1e9, { dy: 20 });
      const tW = T0('C2'), tD = T0('C3'), tB = T0('C4'), tA = T0('C5'), dry = M.io((t - wt('C3', 'evaporates') + 0.3) / 1.4), burn = M.io((t - wt('C4', 'gases')) / 1.8);
      attr(CL.s, 'fill', mix(mix('#7FB069', '#B9925A', dry), '#3B3F4A', burn)); CL.s.style.opacity = t < wt('C2', 'piece') - 0.2 ? 0 : (1 - burn).toFixed(2);
      attr(CL.s, 'transform', `translate(392 392) scale(${(1 - 0.25 * dry - 0.4 * burn).toFixed(3)}) translate(-392 -392)`);
      CL.ash.style.opacity = M.clamp((t - wt('C4', 'gases') - 0.8) / 1).toFixed(2); CL.fl.style.opacity = t > wt('C4', 'burn') - 0.1 && t < tA + 0.3 ? (0.8 + 0.2 * Math.sin(t * 20)).toFixed(2) : 0;
      CL.w.forEach((w, k) => { const ph = ((t - tD) * 0.7 + k / 4) % 1; attr(w, 'transform', `translate(${340 + k * 36} ${(360 - 220 * ph).toFixed(1)})`); w.style.opacity = t > tD + 0.2 && t < tB ? (1 - ph).toFixed(2) : 0; });
      CL.g.forEach((g, k) => { const ph = ((t - tB) * 0.4 + k / 6) % 1; attr(g, 'transform', `translate(${300 + (k % 3) * 90 + 20 * Math.sin(t + k)} ${(340 - 240 * ph).toFixed(1)})`); g.style.opacity = t > wt('C4', 'gases') - 0.2 && t < tA + 0.6 ? Math.min(1, (1 - ph) * 2).toFixed(2) : 0; });
      const cs = t < tW ? -1 : t < tD ? 0 : t < tB ? 1 : t < tA ? 2 : 3; CL.trk.forEach((k, i) => { M.vis(k.g, t, T0('C1') + 0.4 + i * 0.12, 1e9, { dy: 10 }); attr(k.r, 'fill', i === cs ? C.ac : '#fff'); attr(k.r, 'stroke', i <= cs ? C.ac : '#CBD0DA'); attr(k.tx, 'fill', i === cs ? '#fff' : i < cs ? C.ac : '#9AA0AC'); });
      CL.dig.textContent = t < tD ? 'WET' : t < tB ? 'DRY' : t < tA ? '' : 'ASH';
      M.vis($('#cr'), t, T0('C5') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(CR.h1, t, T0('C5') + 0.1, 1e9, POP); CR.r1.forEach((g, i) => M.vis(g, t, wt('C5', 'inorganic') + i * 0.2, 1e9, { ...POP, sc: 0.6 }));
      CR.r1.forEach((g, i) => attr(g.firstChild, 'stroke', i >= 2 && t > wt('C5', 'calcium') - 0.1 ? C.ac : ASH));
      M.vis(CR.h2, t, T0('C6') + 0.05, 1e9, POP); CR.r2.forEach((g, i) => M.vis(g, t, wt('C6', i ? 'phosphate' : 'sulphate') - 0.15, 1e9, { ...POP, sc: 0.6 })); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'what') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Water') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'The retentate is the acid-soluble pool', right: 'Filtrate passes: acid-soluble. Retentate stays: acid-insoluble', tRight: wt('X3', 'retentate') - 0.1,
    type: 'Steps of the analysis (boards); statements on the two fractions and the element table (NEET)', tType: wt('E1', 'steps'),
    xRun: t => M.vis(TP, t, wt('X3', 'filtrate') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement is correct?', cols: 1, optW: 968, optH: 70, optFs: 23, optY: 140, qW: 840,
      opts: ["Carbon is more abundant in the earth's crust than in the human body", 'The retentate is the acid-soluble pool', 'After complete burning, the ash holds inorganic elements like calcium', 'Silicon is about 27.7 percent of the human body by weight'], right: 2 },
    tOpts: wt('Q1', 'correct') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">C</b>'], ['Carbon: <b>18.5%</b> body, 0.03% crust'], ['Retentate: acid-<b>insoluble</b>'], ['Silicon: <b>negligible</b> in body']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'body'), wt('A2', 'retentate'), wt('A3', 'Silicon')],
    recapT: 'Recap · how to analyse chemical composition',
    recap: ['<b>Compounds</b>: grind tissue in trichloroacetic acid · strain through cheesecloth', '<b>Filtrate</b> = acid-soluble pool, thousands of organic compounds · <b>retentate</b> = acid-insoluble',
      '<b>Elements</b>: wet weight · dry it, water evaporates = dry weight · burn it fully', '<b>Ash</b>: inorganic elements like calcium, magnesium · carbon compounds leave as gases',
      '<b>Body vs crust</b>: carbon 18.5% vs 0.03% · silicon negligible vs 27.7% (by weight)'],
    yq: ['What is the acid-soluble pool?', 'What is the difference between wet weight and dry weight?', 'Why are there no carbon compounds in the ash?'],
    nextL: 'NEXT · EP 69', nextT: 'Why does a plant make rubber? Primary and Secondary Metabolites' },
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
