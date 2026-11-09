// PUC Biology Ep 69: Primary and Secondary Metabolites (Living diagram, leaf green)
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


/* ===== Ep 69: primary and secondary metabolites ===== */
Object.assign(M.IC, {
  flower: [ci(12, 9, 3), 'M12 6c-2-4 2-4 0 0M9 9c-4-2-4 2 0 0M15 9c4-2 4 2 0 0M12 12c-2 4 2 4 0 0', 'M12 12v9', 'M12 17c-2-2-4-2-5-1'],
  spoon: ['M7 3c3 0 4 3 4 5s-2 4-4 4-4-2-4-4 1-5 4-5Z', 'M9 11l10 10'],
  band: ['M4 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6Z', 'M7 12c0-2 2-3 5-3s5 1 5 3-2 3-5 3-5-1-5-3Z'],
  split: ['M12 3v18', 'M4 8h5M4 12h5M4 16h5', 'M15 8h5M15 12h5M15 16h5'],
  eight: [ci(12, 8, 4), ci(12, 16, 4)],
  book: ['M4 5h7v15H4Z', 'M13 5h7v15h-7Z'],
  hex: ['M12 3l8 4.5v9L12 21l-8-4.5v-9Z'], ring: ['M12 3l8 4.5v9L12 21l-8-4.5v-9Z', 'M12 8v8'], chain: ['M3 16l4-8 4 8 4-8 4 8'], drop: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z'],
});
const sv = id => $('#' + id);
const PROT = '#D0632F', AMB = '#D9A23B', TUR = '#E9B21E', ANT = '#8E3B6E', CAR = '#E58A3C', LIV = '#9A4A3A', CYT = '#F4EEE2', RUB = '#B5651D';
const hexD = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const molS = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: hexD(x, y, 30 * s), fill: '#F4E3B5', stroke: GOLD, 'stroke-width': 4 * s }); mk(w, 'circle', { cx: x + 26 * s, cy: y - 15 * s, r: 5 * s, fill: '#E25B45' }); return w; };
const molA = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: x, cy: y, r: 12 * s, fill: BR }); [[-34, 0, '#2F6FEB'], [34, 0, '#E25B45'], [0, -32, '#fff'], [0, 32, PROT]].forEach(([dx, dy, c2]) => { mk(w, 'path', { d: `M${x},${y} L${x + dx * s},${y + dy * s}`, stroke: BR, 'stroke-width': 4 * s }); mk(w, 'circle', { cx: x + dx * s, cy: y + dy * s, r: (dy === 32 ? 13 : 9) * s, fill: c2, stroke: BR, 'stroke-width': 2 * s }); }); return w; };
const molF = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); let d = `M${x - 60 * s},${y}`; for (let k = 1; k <= 8; k++) d += ` L${x - 60 * s + k * 15 * s},${y + (k % 2 ? -12 : 12) * s}`; mk(w, 'path', { d, stroke: AMB, 'stroke-width': 5 * s, fill: 'none', 'stroke-linejoin': 'round' }); mk(w, 'circle', { cx: x + 66 * s, cy: y - 12 * s, r: 9 * s, fill: '#E25B45', stroke: BR, 'stroke-width': 2 * s }); return w; };
const molN = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: x - 34 * s, cy: y - 14 * s, r: 13 * s, fill: '#F2C94C', stroke: BR, 'stroke-width': 2 * s }); mk(w, 'path', { d: `M${x - 12 * s},${y - 22 * s} L${x + 10 * s},${y - 22 * s} L${x + 16 * s},${y} L${x},${y + 14 * s} L${x - 18 * s},${y} Z`, fill: '#F4E3B5', stroke: GOLD, 'stroke-width': 3 * s });
  mk(w, 'rect', { x: x + 16 * s, y: y - 30 * s, width: 30 * s, height: 22 * s, rx: 4 * s, fill: NUC }); mk(w, 'path', { d: `M${x - 21 * s},${y - 18 * s} L${x - 12 * s},${y - 18 * s}`, stroke: BR, 'stroke-width': 3 * s }); return w; };
// secondary: pigment (anthocyanin purple blob), scent (wavy lines), alkaloid (ring with N)
const secP = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: hexD(x - 18 * s, y, 18 * s), fill: '#E8C9DC', stroke: ANT, 'stroke-width': 3 * s }); mk(w, 'path', { d: hexD(x + 14 * s, y - 10 * s, 18 * s), fill: '#E8C9DC', stroke: ANT, 'stroke-width': 3 * s }); return w; };
const secS = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); [-14, 0, 14].forEach(dx => mk(w, 'path', { d: `M${x + dx * s},${y + 24 * s} c${-8 * s},${-10 * s} ${8 * s},${-18 * s} 0,${-28 * s} s${8 * s},${-18 * s} 0,${-24 * s}`, stroke: '#7CA05A', 'stroke-width': 3.5 * s, fill: 'none', 'stroke-linecap': 'round' })); return w; };
const secA = (g, x, y, s = 1) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: hexD(x, y, 22 * s), fill: '#DDE6F7', stroke: '#2F6FEB', 'stroke-width': 3 * s }); txt(w, x, y + 7 * s, 'N', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 20 * s, 'font-weight': 700, fill: '#2F6FEB' }); return w; };

/* ---------- H: turmeric dal + rubber band ---------- */
const hl = sv('hlS'), HL = {};
HL.bowl = mk(hl, 'g', {}); mk(HL.bowl, 'path', { d: 'M90,290 L330,290 C330,370 280,400 210,400 C140,400 90,370 90,290 Z', fill: '#C9B8A0', stroke: BR, 'stroke-width': 3.5 }); HL.dal = mk(HL.bowl, 'ellipse', { cx: 210, cy: 292, rx: 116, ry: 22, fill: '#F1DFAA', stroke: BR, 'stroke-width': 2.5 });
HL.sp = mk(hl, 'g', {}); mk(HL.sp, 'path', { d: 'M300,160 L380,110', stroke: '#9AA0AC', 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(HL.sp, 'ellipse', { cx: 280, cy: 172, rx: 30, ry: 16, fill: '#C8CDD6', stroke: BR, 'stroke-width': 2.5 }); mk(HL.sp, 'ellipse', { cx: 280, cy: 168, rx: 22, ry: 9, fill: TUR });
HL.pw = [0, 1, 2, 3, 4].map(k => mk(hl, 'circle', { cx: 0, cy: 0, r: 4, fill: TUR }));
HL.band = mk(hl, 'g', {}); mk(HL.band, 'rect', { x: 430, y: 330, width: 300, height: 26, rx: 6, fill: '#D9C3A0', stroke: BR, 'stroke-width': 2.5 }); mk(HL.band, 'ellipse', { cx: 580, cy: 300, rx: 90, ry: 36, fill: 'none', stroke: RUB, 'stroke-width': 12 });
HL.tree = mk(hl, 'g', {}); mk(HL.tree, 'rect', { x: 640, y: 96, width: 60, height: 150, rx: 8, fill: '#8C6D4F', stroke: BR, 'stroke-width': 3 }); mk(HL.tree, 'path', { d: 'M646,150 L694,170 M646,176 L694,196', stroke: '#5E4632', 'stroke-width': 3 }); HL.lat = mk(HL.tree, 'path', { d: 'M670,200 C676,212 680,218 680,224 a10,10 0 0 1 -20,0 C660,218 664,212 670,200 Z', fill: '#FFFFFF', stroke: '#9AA0AC', 'stroke-width': 2 });

/* ---------- D: metabolites ---------- */
const dl = sv('dlS'), DL = {};
DL.fl = mk(dl, 'g', {}); mk(DL.fl, 'path', { d: 'M320,90 L464,90 L464,110 L450,110 L450,200 L600,440 C610,458 600,470 580,470 L204,470 C184,470 174,458 184,440 L334,200 L334,110 L320,110 Z', fill: '#F3F7FB', stroke: BR, 'stroke-width': 4 });
mk(DL.fl, 'path', { d: 'M260,330 L524,330 L600,440 C610,458 600,470 580,470 L204,470 C184,470 174,458 184,440 Z', fill: '#E3EEF6' });
DL.sm = [molS(dl, 270, 400, 0.6), molA(dl, 400, 420, 0.55), molS(dl, 520, 410, 0.5), molA(dl, 330, 370, 0.45), molN(dl, 460, 380, 0.6)];
DL.big = mk(dl, 'path', { d: 'M230,446 C280,430 330,456 380,440 S480,424 540,450', stroke: AMB, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
DL.L = [lab(dl, 270, 386, 120, 300, 'Small', 'end', null, 22), lab(dl, 500, 446, 640, 380, 'Big', 'start', null, 22)];
const dr = sv('drS'), DR = {};
DR.t = [['Isolate', 'PULL ONE OUT'], ['Structure', 'HOW ITS ATOMS JOIN'], ['Make it', 'IN THE LAB, IF POSSIBLE']].map(([n, s], i) => { const g = mk(dr, 'g', {}), y = 90 + i * 136; mk(g, 'rect', { x: 36, y, width: 712, height: 112, rx: 14, fill: C.soft });
  mk(g, 'circle', { cx: 92, cy: y + 56, r: 26, fill: C.ac }); txt(g, 92, y + 64, String(i + 1), { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: '#fff' });
  txt(g, 140, y + 54, n, { 'font-family': 'Poppins', 'font-size': 32, 'font-weight': 700, fill: C.ink }); txt(g, 140, y + 88, s, { 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- Z: zoom ladder ---------- */
const ZN = ['ANIMAL TISSUE', 'ANIMAL CELL', 'PLANT CELL', 'EXTRA COMPOUNDS'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Animal tissue', 'A piece of liver.', ''], ['RUNG 2 OF 4', 'Primary', 'Sugars, amino acids, fatty acids, nucleotides.', 'In every living thing'],
  ['RUNG 3 OF 4', 'Plant cell', 'The same primary metabolites.', ''], ['RUNG 4 OF 4', 'Secondary', 'Thousands more: pigments, scents, alkaloids.', 'Plants, fungi, microbes']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'path', { d: 'M280,300 C260,180 380,120 520,140 C660,120 800,170 790,250 C780,330 640,390 520,380 C400,400 300,380 280,300 Z', fill: LIV, stroke: '#5E2A20', 'stroke-width': 5 });
  mk(g, 'path', { d: 'M360,220 C420,200 470,230 520,210', stroke: '#C27060', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); LB[0] = [lab(g, 640, 200, 760, 100, 'Animal tissue', 'start', null, 24)]; }
const cellBox = (g, plant) => { mk(g, 'rect', { x: 150, y: 30, width: 756, height: 466, rx: plant ? 14 : 60, fill: plant ? '#EEF5E6' : '#FBEDE8', stroke: plant ? '#C9B36A' : '#B76E5E', 'stroke-width': plant ? 10 : 6 }); mk(g, 'circle', { cx: 260, cy: 400, r: 50, fill: NUC });
  if (plant) [[820, 90], [830, 420], [200, 120]].forEach(([x, y]) => mk(g, 'ellipse', { cx: x, cy: y, rx: 40, ry: 22, fill: '#8CC48F', stroke: '#2F7A49', 'stroke-width': 2.5 })); };
{ const g = ZG[1]; cellBox(g, false); ZG.p1 = [molS(g, 400, 160, 1.3), molA(g, 640, 150, 1.2), molF(g, 470, 360, 1.2), molN(g, 700, 360, 1.2)];
  LB[1] = [lab(g, 400, 199, 320, 260, 'Sugar', 'end', null, 22), lab(g, 640, 188, 760, 240, 'Amino acid', 'start', null, 22), lab(g, 470, 376, 400, 460, 'Fatty acid', 'start', null, 22), lab(g, 700, 386, 760, 460, 'Nucleotide', 'start', null, 22)]; }
{ const g = ZG[2]; cellBox(g, true); ZG.p2 = [molS(g, 400, 160, 1), molA(g, 600, 150, 0.9), molF(g, 440, 330, 0.9), molN(g, 640, 320, 0.9)];
  LB[2] = [lab(g, 600, 180, 700, 230, 'Same primary', 'start', null, 22)]; }
{ const g = ZG[3]; cellBox(g, true); [molS(g, 400, 160, 1), molA(g, 600, 150, 0.9), molF(g, 440, 330, 0.9), molN(g, 640, 320, 0.9)].forEach(m => m.style.opacity = 0.45);
  ZG.sec = []; [[secP, 330, 260], [secS, 520, 250], [secA, 760, 230], [secP, 560, 420], [secA, 380, 430], [secS, 760, 420], [secP, 700, 120], [secS, 300, 110]].forEach(([f, x, y]) => ZG.sec.push(f(g, x, y, 1.2)));
  LB[3] = [lab(g, 330, 276, 230, 330, 'Pigment', 'end', null, 22), lab(g, 520, 230, 620, 70, 'Scent', 'start', null, 22), lab(g, 780, 230, 880, 300, 'Alkaloid', 'end', null, 22)]; }
const FOC = [[528, 260, 70], [520, 260, 60], [520, 250, 60], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'animal')], [wt('Z3', 'sugars'), wt('Z3', 'amino'), wt('Z3', 'fatty'), wt('Z3', 'nucleotides')], [wt('Z4', 'same')], [wt('Z5', 'pigments'), wt('Z5', 'scents'), wt('Z5', 'alkaloids')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Plants make so many extras!' });

/* ---------- P: from turmeric to curcumin ---------- */
const PN = ['DIG', 'GRIND', 'ISOLATE', 'STRUCTURE', 'USE'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE SECONDARY METABOLITE', 'Curcumin', 'Watch it, step by step.', ''], ['STEP 1 OF 5', 'Dig', 'The yellow underground stem of turmeric.', ''],
  ['STEP 2 OF 5', 'Grind', 'Dry and grind it: thousands of compounds, mixed.', ''], ['STEP 3 OF 5', 'Isolate', 'Pull out one yellow compound: curcumin.', ''],
  ['STEP 4 OF 5', 'Structure', 'Work out how its atoms join. Make it, if possible.', ''], ['STEP 5 OF 5', 'Use', 'Your textbook lists curcumin as a drug.', 'Many are useful to people']]);
const ps = sv('pS'), PP = {};
PP.soil = mk(ps, 'g', {}); mk(PP.soil, 'rect', { x: 0, y: 300, width: 1056, height: 226, fill: '#EDE4D3' }); mk(PP.soil, 'path', { d: 'M0,300 L1056,300', stroke: '#8A6A3A', 'stroke-width': 4 });
PP.plw = mk(ps, 'g', {}); PP.pl = mk(PP.plw, 'g', {}); [[-1, 140], [0, 170], [1, 150]].forEach(([s, h]) => mk(PP.pl, 'path', { d: `M${300 + s * 10},300 C${300 + s * 30},${300 - h * 0.6} ${300 + s * 70},${300 - h} ${300 + s * 60},${300 - h - 20} C${300 + s * 30},${300 - h * 0.7} ${300 + s * 8},${300 - h * 0.4} ${300 + s * 10},300 Z`, fill: '#5FA45F', stroke: '#2F6B3A', 'stroke-width': 3 }));
PP.rh = mk(PP.pl, 'path', { d: 'M230,330 C240,310 280,316 300,326 C320,312 360,316 372,334 C392,330 410,346 396,362 C380,376 350,366 336,372 C316,384 280,380 268,368 C246,372 222,356 230,330 Z', fill: TUR, stroke: '#A5730E', 'stroke-width': 3 });
PP.pile = mk(ps, 'g', {}); mk(PP.pile, 'path', { d: 'M560,380 C600,250 760,250 800,380 Z', fill: '#F2C94C', stroke: '#A5730E', 'stroke-width': 3 });
PP.mix = []; for (let k = 0; k < 26; k++) PP.mix.push(mk(PP.pile, 'circle', { cx: 600 + (k * 37) % 170, cy: 300 + (k * 23) % 70, r: 6, fill: [ANT, '#2F6FEB', '#7CA05A', PROT, GOLD, '#E25B45'][k % 6] }));
PP.cur = mk(ps, 'circle', { cx: 0, cy: 0, r: 12, fill: '#E9B21E', stroke: BR, 'stroke-width': 3 });
PP.vial = mk(ps, 'g', {}); mk(PP.vial, 'path', { d: 'M880,170 L880,330 C880,350 940,350 940,330 L940,170', fill: '#FFF8DC', stroke: BR, 'stroke-width': 3.5 }); PP.vf = mk(PP.vial, 'rect', { x: 883, y: 330, width: 54, height: 0, fill: TUR });
txt(PP.vial, 910, 380, 'CURCUMIN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, fill: '#A5730E', 'font-weight': 600 });
PP.str = mk(ps, 'g', {}); { const g = PP.str, y = 250; mk(g, 'path', { d: hexD(190, y, 50), fill: '#FFF8DC', stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: hexD(866, y, 50), fill: '#FFF8DC', stroke: BR, 'stroke-width': 4 });
  let d = `M233,${y - 25}`; const xs = []; for (let k = 1; k <= 8; k++) { const x = 233 + k * 73.75, yy = k % 2 ? y - 60 : y - 25; d += ` L${x.toFixed(1)},${yy}`; xs.push([x, yy]); } mk(g, 'path', { d, stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' }); [[0, 1], [5, 6]].forEach(([i, j]) => { const [x1, y1] = xs[i], [x2, y2] = xs[j], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * 9, ny = dx / L * 9, sg = y1 > y2 ? 1 : -1; mk(g, 'path', { d: `M${(x1 + dx * 0.15 + nx * sg).toFixed(1)},${(y1 + dy * 0.15 + ny * sg).toFixed(1)} L${(x2 - dx * 0.15 + nx * sg).toFixed(1)},${(y2 - dy * 0.15 + ny * sg).toFixed(1)}`, stroke: BR, 'stroke-width': 3 }); });
  [xs[2], xs[4]].forEach(([x, yy]) => { mk(g, 'path', { d: `M${x - 4},${yy} L${x - 4},${yy + 50} M${x + 4},${yy} L${x + 4},${yy + 50}`, stroke: BR, 'stroke-width': 3 }); txt(g, x, yy + 76, 'O', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: '#E25B45' }); });
  [[148, 'HO', 'end', 120, y + 30], [908, 'OH', 'start', 936, y + 30]].forEach(([x, s, an, tx, ty]) => txt(g, tx, ty, s, { 'text-anchor': an, 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: '#E25B45' }));
  txt(g, 190, y + 92, 'OCH3', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 20, 'font-weight': 700, fill: '#E25B45' }); txt(g, 866, y + 92, 'OCH3', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 20, 'font-weight': 700, fill: '#E25B45' });
  txt(g, 528, 440, 'CURCUMIN · HOW ITS ATOMS JOIN', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 }); }
PP.use = mk(ps, 'g', {}); PP.uses = [['DRUG', 'TABLE 9.3 · CURCUMIN'], ['USEFUL TO PEOPLE', 'RUBBER · SPICES · SCENTS']].map(([n, s], i) => { const g = mk(PP.use, 'g', {}), x = 120 + i * 430; mk(g, 'rect', { x, y: 170, width: 390, height: 220, rx: 16, fill: C.soft });
  if (i === 0) { mk(g, 'rect', { x: x + 40, y: 240, width: 90, height: 40, rx: 20, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: `M${x + 85},240 L${x + 85},280`, stroke: BR, 'stroke-width': 3 }); mk(g, 'rect', { x: x + 42, y: 242, width: 43, height: 36, rx: 18, fill: TUR }); }
  else { mk(g, 'ellipse', { cx: x + 85, cy: 260, rx: 44, ry: 20, fill: 'none', stroke: RUB, 'stroke-width': 9 }); }
  txt(g, x + 160, 266, n, { 'font-family': 'Poppins', 'font-size': i ? 24 : 34, 'font-weight': 700, fill: C.ink }); txt(g, x + 40, 350, s, { 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- C: eight groups (one wide card) ---------- */
const cw = sv('cwS'), CW = {};
CW.t = [['Pigments', 'Carotenoids, anthocyanins', secP], ['Alkaloids', 'Morphine, codeine', secA], ['Terpenoids', 'Monoterpenes, diterpenes', (g, x, y) => { const w = mk(g, 'g', {}); [-16, 16].forEach(dx => mk(w, 'path', { d: hexD(x + dx, y, 16), fill: '#E6F0DA', stroke: '#5E8A3A', 'stroke-width': 3 })); return w; }],
  ['Essential oils', 'Lemon grass oil', secS], ['Toxins', 'Abrin, ricin', (g, x, y) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: `M${x},${y - 26} L${x + 26},${y + 20} L${x - 26},${y + 20} Z`, fill: '#FDE2DE', stroke: C.red, 'stroke-width': 3.5 }); txt(w, x, y + 14, '!', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: C.red }); return w; }],
  ['Lectins', 'Concanavalin A', (g, x, y) => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: x, cy: y, r: 22, fill: '#F6D6C6', stroke: PROT, 'stroke-width': 3.5 }); mk(w, 'circle', { cx: x + 14, cy: y - 14, r: 8, fill: GOLD }); return w; }],
  ['Drugs', 'Vinblastin, curcumin', (g, x, y) => { const w = mk(g, 'g', {}); mk(w, 'rect', { x: x - 30, y: y - 14, width: 60, height: 28, rx: 14, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(w, 'rect', { x: x - 28, y: y - 12, width: 28, height: 24, rx: 12, fill: TUR }); return w; }],
  ['Polymeric substances', 'Rubber, gums, cellulose', (g, x, y) => { const w = mk(g, 'g', {}); mk(w, 'path', { d: `M${x - 30},${y} c10,-16 20,16 30,0 s20,-16 30,0`, stroke: RUB, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); return w; }]
].map(([n, e, f], i) => { const g = mk(cw, 'g', {}), x = 36 + (i % 4) * 388, y = 80 + Math.floor(i / 4) * 246; const bg = mk(g, 'rect', { x, y, width: 368, height: 226, rx: 16, fill: C.soft, stroke: 'transparent', 'stroke-width': 3 });
  mk(g, 'circle', { cx: x + 62, cy: y + 66, r: 40, fill: '#fff' }); f(g, x + 62, y + 66, 1); txt(g, x + 120, y + 52, String(i + 1).padStart(2, '0'), { 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
  txt(g, x + 28, y + 150, n, { 'font-family': 'Poppins', 'font-size': n.length > 14 ? 26 : 32, 'font-weight': 700, fill: C.ink }); txt(g, x + 28, y + 192, e, { 'font-family': 'Poppins', 'font-size': 21, 'font-weight': 500, fill: C.ink2 }); return { g, bg }; });

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['PRIMARY METABOLITES', 'SECONDARY METABOLITES'], [
  ['', 'Where', 'All living things, like animal tissues', 'Mainly plant, fungal, microbial cells', wt('V1', 'Primary'), wt('V1', 'Secondary'), s => { molS(s, 65, 50, 1.1); }, s => { secP(s, 65, 52, 1.2); }],
  ['', 'Role', 'Known roles in normal body processes', 'Role in the host: not fully understood', wt('V2', 'Primary'), wt('V2', 'For'), s => { mk(s, 'path', { d: 'M30,52 L55,76 L102,26', stroke: C.ac, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); },
    s => { txt(s, 65, 72, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 60, 'font-weight': 700, fill: '#9AA0AC' }); }],
  ['', 'Examples', 'Amino acids, sugars', 'Alkaloids, rubber, scents', wt('V3', 'Amino'), wt('V3', 'Alkaloids'), s => { molA(s, 65, 50, 0.95); }, s => { secA(s, 65, 50, 1.3); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'Concanavalin A is a lectin. Is it a primary metabolite, or a secondary one?', opts: ['Primary', 'Secondary', 'Not a metabolite'], right: 1, why: 'Secondary. Lectins are one of the groups of secondary metabolites.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['PRIMARY · KNOWN ROLES', 'background:var(--ac2);color:#1F6B3F'], ['SECONDARY · MANY GROUPS', 'background:var(--ink);color:#fff']], [
  ['hex', 'Glucose', 'A <b>sugar</b>', 0, 0, wt('W2', 'Primary')], ['ring', 'Morphine', 'An <b>alkaloid</b>', 1, 0, wt('W3', 'Secondary')],
  ['hex', 'Alanine', 'An <b>amino acid</b>', 0, 1, wt('W4', 'Primary')], ['chain', 'Rubber', 'A <b>polymeric substance</b>', 1, 1, wt('W5', 'Secondary')],
  ['chain', 'Palmitic acid', 'A <b>fatty acid</b>', 0, 2, wt('W6', 'Primary')], ['drop', 'Anthocyanin', 'A <b>pigment</b>', 1, 2, wt('W7', 'Secondary')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'ellipse', { cx: 170, cy: 110, rx: 50, ry: 22, fill: 'none', stroke: RUB, 'stroke-width': 9 }); mk(TP, 'rect', { x: 270, y: 92, width: 70, height: 32, rx: 16, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(TP, 'rect', { x: 272, y: 94, width: 33, height: 28, rx: 14, fill: TUR });
  secS(TP, 420, 104, 1.2); txt(TP, 300, 200, 'RUBBER · DRUGS · SCENTS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ok, 'font-weight': 600 }); txt(TP, 300, 228, 'USEFUL TO PEOPLE', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); }

const mrow = (a, b, c2, d) => `<div class="sl"><b>${a}</b><span style="display:inline-block;width:330px">${b}</span><b>${c2}</b>${d}</div>`;
const EP = {
  jobs: [['flower', 'A rose', 'SWEET SCENT', 'rose'], ['spoon', 'Turmeric', 'BRIGHT YELLOW', 'turmeric'], ['band', 'A rubber band', 'FROM A TREE', 'rubber']],
  learn: [['split', 'Tell apart', 'apart'], ['eight', '8 groups', 'eight'], ['book', 'Textbook', 'textbook']],
  hookW: 'doctor', split: ['primary', 'secondary'], st: ['Primary', 'Secondary'],
  cam: [],
  hook: t => { M.vis(HL.bowl, t, wt('H2', 'dal') - 0.3, 1e9, { ...POP, sc: 0.6 }); M.vis(HL.sp, t, wt('H2', 'turmeric') - 0.3, wt('H2', 'yellow') + 0.6, { dy: -20 });
    const fall = (t - wt('H2', 'turmeric')); HL.pw.forEach((p, k) => { const ph = ((fall * 1.2 + k * 0.2) % 1); attr(p, 'cx', 270 - k * 6); attr(p, 'cy', (180 + 100 * ph).toFixed(1)); p.style.opacity = fall > 0 && t < wt('H2', 'yellow') + 0.6 ? 1 : 0; });
    attr(HL.dal, 'fill', mix('#F1DFAA', '#F2C230', M.io((t - wt('H2', 'turned')) / 1))); M.vis($('#hlt0'), t, wt('H2', 'yellow'), 1e9, POP);
    M.vis(HL.band, t, wt('H2', 'band') - 0.3, 1e9, { ...POP, sc: 0.6 }); M.vis(HL.tree, t, wt('H2', 'tree') - 0.4, 1e9, { ...POP, sc: 0.6 }); attr(HL.lat, 'transform', `translate(0 ${(((t * 0.8) % 1) * 30).toFixed(1)})`);
    M.vis($('#hlt1'), t, wt('H2', 'sap'), 1e9, POP); M.vis($('#hlP'), t, wt('H3', 'need') - 0.1, 1e9, POP); },
  measure: () => { [['hlt0', 210, 430], ['hlt1', 580, 430]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.fl, t, wt('D2', 'thousands') - 0.3, 1e9, { ...POP, sc: 0.7 });
      DL.sm.forEach((m, i) => M.vis(m, t, wt('D2', 'small') - 0.2 + i * 0.1, 1e9, { ...POP, sc: 0.3 })); M.vis(DL.big, t, wt('D2', 'big') - 0.2, 1e9, { dy: 0, fade: 0.3 });
      labRun(DL.L[0], t, wt('D2', 'small')); labRun(DL.L[1], t, wt('D2', 'big')); M.vis($('#dlP'), t, wt('D3', 'metabolites') - 0.1, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o }); DR.t.forEach((g, i) => M.vis(g, t, wt('D4', ['isolate', 'structure', 'make'][i]) - 0.15, 1e9, { dx: -20, dy: 0 })); M.vis($('#drP'), t, wt('D4', 'lab') - 0.1, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      ZG.p1.concat(ZG.p2).forEach((m, k) => attr(m, 'transform', `translate(0 ${(5 * Math.sin(t * 1.6 + k * 1.3)).toFixed(1)})`));
      ZG.sec.forEach((m, k) => { const tin = wt('Z5', 'extra') + k * 0.25, p = M.clamp((t - tin) / 0.3); m.style.opacity = p.toFixed(2); attr(m, 'transform', `translate(0 ${(5 * Math.sin(t * 1.8 + k)).toFixed(1)})`); });
      avZ(t, wt('Z5', 'full') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]); const sOut = tPs[3] - 0.05;
      M.vis(PP.soil, t, T0('P1') + 0.3, sOut, { dy: 20, outDur: 0.25 }); M.vis(PP.plw, t, T0('P1') + 0.4, tPs[1] + 0.6, { dy: 20, outDur: 0.3 });
      attr(PP.pl, 'transform', `translate(0 ${(-50 * M.io((t - wt('P2', 'dig')) / 1.2)).toFixed(1)})`);
      M.vis(PP.pile, t, tPs[1] + 0.2, sOut, { ...POP, sc: 0.5, outDur: 0.25 }); PP.mix.forEach((d, k) => attr(d, 'transform', `translate(${(4 * Math.sin(t * 2 + k)).toFixed(1)} ${(4 * Math.cos(t * 2.3 + k)).toFixed(1)})`));
      const pull = M.io((t - wt('P4', 'Isolate') - 0.2) / 1.6); attr(PP.cur, 'cx', (680 + 230 * pull).toFixed(1)); attr(PP.cur, 'cy', (310 - 40 * Math.sin(pull * Math.PI)).toFixed(1)); PP.cur.style.opacity = t > tPs[2] && t < sOut ? 1 : 0;
      M.vis(PP.vial, t, tPs[2] + 0.1, sOut, { dy: 20, outDur: 0.25 }); attr(PP.vf, 'height', (60 * M.io((t - wt('P4', 'curcumin')) / 1)).toFixed(1)); attr(PP.vf, 'y', (330 - 60 * M.io((t - wt('P4', 'curcumin')) / 1)).toFixed(1));
      M.vis(PP.str, t, tPs[3], tPs[4] - 0.05, { ...POP, sc: 0.8, outDur: 0.25 });
      M.vis(PP.use, t, tPs[4], 1e9, { dy: 0, fade: 0.2 }); PP.uses.forEach((g, i) => M.vis(g, t, i ? wt('P6', 'Many') - 0.2 : wt('P6', 'drug') - 0.3, 1e9, { ...POP, sc: 0.7 })); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cw'), t, T0('C1') + 0.05, out, { dy: 36, ...o }); const ks = ['Pigments', 'Alkaloids', 'Terpenoids', 'Essential', 'Toxins', 'Lectins', 'Drugs', 'polymeric'], ids = ['C2', 'C2', 'C3', 'C3', 'C4', 'C4', 'C5', 'C5'];
      const ts = ks.map((k, i) => wt(ids[i], k)); const cur = curOf(t, ts, 0.2);
      CW.t.forEach((r, i) => { M.vis(r.g, t, ts[i] - 0.25, 1e9, { ...POP, sc: 0.8 }); attr(r.bg, 'fill', i === cur ? C.ac3 : C.soft); attr(r.bg, 'stroke', i === cur ? C.ac : 'transparent'); }); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'primary') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Lectins') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Secondary metabolites are useless, or not important', right: 'Many are useful: rubber, drugs, spices, scents, pigments', tRight: wt('X3', 'rubber') - 0.1,
    type: 'Examples of each kind (boards); match the following with Table 9.3 (NEET)', tType: wt('E1', 'examples'),
    xRun: t => M.vis(TP, t, wt('X3', 'useful') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Match each group with its example.' + mrow('P', 'Alkaloid', 'i', 'Concanavalin A') + mrow('Q', 'Toxin', 'ii', 'Ricin') + mrow('R', 'Lectin', 'iii', 'Vinblastin') + mrow('S', 'Drug', 'iv', 'Codeine'),
      cols: 2, optW: 474, optH: 66, optFs: 25, optY: 340, qW: 840,
      opts: ['P-iv, Q-ii, R-i, S-iii', 'P-ii, Q-iv, R-iii, S-i', 'P-iv, Q-i, R-ii, S-iii', 'P-iii, Q-ii, R-i, S-iv'], right: 0 },
    tOpts: wt('Q1', 'Match') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['Codeine: <b>alkaloid</b> · ricin: <b>toxin</b>'], ['Concanavalin A: <b>lectin</b>'], ['Vinblastin: <b>drug</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'Codeine'), wt('A3', 'Concanavalin'), wt('A3', 'vinblastin')],
    recapT: 'Recap · primary and secondary metabolites',
    recap: ['<b>Metabolites</b>: compounds isolated from living things · structure found, made in the lab if possible', '<b>Primary</b>: in all living things, like animal tissues · amino acids, sugars · known roles',
      '<b>Secondary</b>: mainly plant, fungal, microbial cells · role in the host not fully understood', 'Pigments · alkaloids · terpenoids · essential oils · toxins · lectins · drugs · polymeric substances',
      '<b>Useful</b>: rubber, drugs, spices, scents, pigments · some have ecological importance'],
    yq: ['Give two examples of primary metabolites.', 'Name one toxin and one lectin.', 'Why are rubber and spices called secondary metabolites?'],
    nextL: 'NEXT · EP 70', nextT: 'What stays on the filter? Biomacromolecules and Proteins' },
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
