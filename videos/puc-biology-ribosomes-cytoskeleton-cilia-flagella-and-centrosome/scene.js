// PUC Biology Ep 66: Ribosomes, Cytoskeleton, Cilia, Flagella and Centrosome (Living diagram, leaf green)
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


/* ===== Ep 66: ribosomes, cytoskeleton, cilia, flagella and centrosome ===== */
Object.assign(M.IC, {
  tent: ['M3 20L12 4l9 16Z', 'M12 4v16', 'M9 20l3-5 3 5'],
  boat: ['M3 15h18l-3 4H6Z', 'M7 15l-3-9', 'M17 15l3-9'],
  factory: ['M3 20V10l5 3V10l5 3V10l5 3V4h3v16Z'],
  grain: ['M8 9a4 3 0 1 0 8 0a4 3 0 1 0-8 0', 'M6 15a6 4 0 1 0 12 0a6 4 0 1 0-12 0'],
  nine: [ci(12, 12, 8), ci(12, 12, 2)],
  wheel: [ci(12, 12, 8), ci(12, 12, 2), 'M12 4v6M12 14v6M4 12h6M14 12h6'],
  cell: ['M4 6h16v12H4Z', ci(12, 12, 3)],
  bac: ['M5 12c0-3 2-5 5-5h4c3 0 5 2 5 5s-2 5-5 5h-4c-3 0-5-2-5-5Z', 'M19 12h3'],
  mito: ['M4 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6Z', 'M7 12c1-2 2 2 3 0s2 2 3 0 2 2 3 0'],
  chl: ['M3 12c0-4 4-7 9-7s9 3 9 7-4 7-9 7-9-3-9-7Z', 'M8 10h3M8 12h3M8 14h3M14 10h3M14 12h3M14 14h3'],
});
const sv = id => $('#' + id);
const MT = '#4A78C2', MF = '#D0632F', IF = '#9A8C5A', MEM = '#5AA0C8', CYT = '#F4EEE2', MUC = '#DCE6A8', PCM = '#E3E8F2', CIL = '#2E2A24';
const ribo = (g, x, y, s = 1, fill = BR) => { const w = mk(g, 'g', {}); mk(w, 'ellipse', { cx: x, cy: y - 20 * s, rx: 40 * s, ry: 24 * s, fill }); mk(w, 'ellipse', { cx: x, cy: y + 18 * s, rx: 30 * s, ry: 18 * s, fill: mix(fill, '#FFFFFF', 0.25) }); return w; };
// one cilium as a path: base (x, y), phase p in [0,1): stiff power stroke then a bent recovery
const ciliumD = (x, y, p, L = 110, A = 55) => { let th, bend = 0, len = L;
  if (p < 0.35) th = -A + 2 * A * M.io(p / 0.35); else { const k = (p - 0.35) / 0.65; th = A - 2 * A * k; bend = Math.sin(k * Math.PI); len = L * (1 - 0.25 * bend); }
  const r1 = (th - 45 * bend) * Math.PI / 180, r2 = (th + 50 * bend) * Math.PI / 180, mx = x + len * 0.5 * Math.sin(r1), my = y - len * 0.5 * Math.cos(r1), tx = mx + len * 0.5 * Math.sin(r2), ty = my - len * 0.5 * Math.cos(r2);
  const qx = 2 * mx - (x + tx) / 2, qy = 2 * my - (y + ty) / 2;
  return `M${x},${y} Q${qx.toFixed(1)},${qy.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`; };

/* ---------- H: the windpipe ---------- */
const hl = sv('hlS'), HL = {};
HL.cells = mk(hl, 'g', {}); for (let k = 0; k < 6; k++) { const x = 76 + k * 106; mk(HL.cells, 'rect', { x, y: 300, width: 106, height: 100, fill: CYT, stroke: '#C9B36A', 'stroke-width': 3 }); mk(HL.cells, 'circle', { cx: x + 53, cy: 352, r: 16, fill: NUC }); }
HL.cil = []; for (let k = 0; k < 24; k++) HL.cil.push(mk(hl, 'path', { d: '', stroke: CIL, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
HL.muc = mk(hl, 'g', {}); mk(HL.muc, 'path', { d: 'M76,196 C200,180 300,206 400,192 C520,178 620,200 712,188 L712,236 C600,246 500,226 400,240 C300,252 200,232 76,244 Z', fill: MUC, stroke: '#A9B56A', 'stroke-width': 2.5 });
HL.dust = []; for (let k = 0; k < 7; k++) HL.dust.push(mk(HL.muc, 'circle', { cx: 0, cy: 205 + (k * 13) % 26, r: 5 + (k % 3), fill: '#6B7280' }));
HL.ar = mk(hl, 'path', { d: 'M560,130 L700,130 M688,118 L700,130 L688,142', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });

/* ---------- D: ribosomes ---------- */
const dl = sv('dlS'), DL = {};
DL.r = mk(dl, 'g', {}); DL.rb = ribo(DL.r, 392, 270, 3.2);
DL.L = [lab(dl, 480, 200, 560, 130, 'Large subunit', 'start', null, 22), lab(dl, 460, 340, 560, 420, 'Small subunit', 'start', null, 22), lab(dl, 266, 210, 200, 160, 'No membrane', 'end', null, 22)];
DL.q = txt(dl, 36, 92, 'GEORGE PALADE · 1953', { 'font-size': 18, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });
const dr = sv('drS'), DR = {};
DR.rows = [['80S', '60S', '40S', 'EUKARYOTIC', 1.1, C.ink], ['70S', '50S', '30S', 'PROKARYOTIC', 0.9, MF]].map(([a, b, c2, w, s, col], i) => { const g = mk(dr, 'g', {}), y = 140 + i * 150;
  mk(g, 'rect', { x: 36, y: y - 60, width: 712, height: 124, rx: 14, fill: C.soft }); ribo(g, 110, y, s); txt(g, 180, y - 20, w, { 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
  const big = txt(g, 180, y + 30, a, { 'font-size': 46, fill: col, 'font-weight': 600 }); txt(g, 300, y + 26, '=', { 'font-size': 36, fill: C.mute });
  const p1 = txt(g, 350, y + 26, b, { 'font-size': 36, fill: C.ink, 'font-weight': 600 }); txt(g, 450, y + 26, '+', { 'font-size': 36, fill: C.mute }); const p2 = txt(g, 490, y + 26, c2, { 'font-size': 36, fill: C.ink, 'font-weight': 600 });
  return { g, big, p: [p1, p2] }; });
DR.tube = mk(dr, 'g', {}); mk(DR.tube, 'path', { d: 'M620,360 L620,460 C620,480 660,480 660,460 L660,360', stroke: C.ink, 'stroke-width': 4, fill: '#EAF3FA' }); DR.dot = mk(DR.tube, 'circle', { cx: 640, cy: 380, r: 9, fill: BR });
DR.tL = txt(DR.tube, 600, 400, 'SPUN FAST', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); txt(DR.tube, 600, 426, 'IT SETTLES', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });

/* ---------- Z: zoom ladder CYTOSKELETON -> CILIA -> CILIUM -> 9 + 2 ---------- */
const ZN = ['CELL', 'CILIA', 'ONE CILIUM', '9 + 2'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'Cytoskeleton', 'Microtubules, microfilaments and intermediate filaments.', 'Support, shape, movement'],
  ['RUNG 2 OF 4', 'Cilia', 'Hair-like outgrowths of the cell membrane.', 'On windpipe cells'],
  ['RUNG 3 OF 4', 'One cilium', 'Covered by the plasma membrane. Its core: the axoneme.', 'Microtubules run lengthwise'],
  ['RUNG 4 OF 4', '9 + 2 array', 'Nine doublets in a ring, two single microtubules in the centre.', 'Radial spokes · linkers']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'rect', { x: 300, y: 70, width: 460, height: 400, rx: 60, fill: CYT, stroke: '#C9B36A', 'stroke-width': 6 }); mk(g, 'circle', { cx: 530, cy: 270, r: 56, fill: NUC });
  for (let k = 0; k < 7; k++) mk(g, 'path', { d: `M530,270 L${530 + 210 * Math.cos(k * 0.9)},${270 + 175 * Math.sin(k * 0.9)}`, stroke: MT, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 });
  for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M${330 + k * 70},${100 + (k % 2) * 20} C${360 + k * 70},${170} ${300 + k * 70},${330} ${340 + k * 72},${440 - (k % 2) * 16}`, stroke: IF, 'stroke-width': 4, fill: 'none', opacity: 0.9 });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M316,${110 + k * 78} L744,${130 + k * 70}`, stroke: MF, 'stroke-width': 2.5, opacity: 0.9 });
  ZG.cl0 = []; for (let k = 0; k < 9; k++) ZG.cl0.push(mk(g, 'path', { d: '', stroke: CIL, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
  LB[0] = [lab(g, 700, 270, 800, 200, 'Microtubules', 'start', null, 24), lab(g, 340, 344, 280, 400, 'Microfilaments', 'end', null, 22), lab(g, 345, 200, 280, 150, 'Intermediate filaments', 'end', null, 22)]; }
{ const g = ZG[1]; mk(g, 'path', { d: 'M0,526 L0,380 C260,350 796,350 1056,380 L1056,526 Z', fill: CYT, stroke: MEM, 'stroke-width': 6 }); ZG.cl1 = [];
  for (let k = 0; k < 14; k++) { const x = 70 + k * 70; mk(g, 'rect', { x: x - 9, y: 372, width: 18, height: 26, rx: 4, fill: MT }); ZG.cl1.push(mk(g, 'path', { d: '', stroke: CIL, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' })); }
  mk(g, 'circle', { cx: 528, cy: 470, r: 34, fill: NUC });
  LB[1] = [lab(g, 420, 220, 260, 120, 'Cilia', 'end', null, 24), lab(g, 760, 364, 820, 450, 'Cell membrane', 'start', null, 24), lab(g, 630, 385, 700, 480, 'Basal body', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'rect', { x: 150, y: 30, width: 120, height: 466, rx: 60, fill: '#EAF3FA', stroke: MEM, 'stroke-width': 6 });
  [-30, -10, 10, 30].forEach(dx => mk(g, 'path', { d: `M${210 + dx},70 L${210 + dx},470`, stroke: MT, 'stroke-width': 5 }));
  mk(g, 'path', { d: 'M290,263 L440,263 M428,251 L440,263 L428,275', stroke: C.dim, 'stroke-width': 4, fill: 'none' });
  mk(g, 'circle', { cx: 680, cy: 263, r: 200, fill: '#EAF3FA', stroke: MEM, 'stroke-width': 8 }); mk(g, 'circle', { cx: 680, cy: 263, r: 150, fill: '#F6F2E8', stroke: MT, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 - Math.PI / 2; mk(g, 'circle', { cx: 680 + 120 * Math.cos(a), cy: 263 + 120 * Math.sin(a), r: 14, fill: MT }); } mk(g, 'circle', { cx: 664, cy: 263, r: 12, fill: MT }); mk(g, 'circle', { cx: 696, cy: 263, r: 12, fill: MT });
  LB[2] = [lab(g, 850, 160, 900, 70, 'Plasma membrane', 'end', null, 24), lab(g, 680, 400, 700, 470, 'Axoneme', 'start', null, 24), lab(g, 240, 380, 320, 440, 'Microtubules', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'circle', { cx: 528, cy: 263, r: 236, fill: '#EAF3FA', stroke: MEM, 'stroke-width': 8 }); mk(g, 'circle', { cx: 528, cy: 263, r: 210, fill: '#F6F2E8' });
  ZG.sp = []; ZG.lk = []; ZG.db = [];
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 - Math.PI / 2, x = 528 + 160 * Math.cos(a), y = 263 + 160 * Math.sin(a);
    ZG.sp.push(mk(g, 'path', { d: `M${528 + 52 * Math.cos(a)},${263 + 52 * Math.sin(a)} L${528 + 128 * Math.cos(a)},${263 + 128 * Math.sin(a)}`, stroke: MF, 'stroke-width': 4 }));
    const a2 = a + Math.PI * 2 / 9; ZG.lk.push(mk(g, 'path', { d: `M${528 + 178 * Math.cos(a + 0.18)},${263 + 178 * Math.sin(a + 0.18)} A178,178 0 0 1 ${528 + 178 * Math.cos(a2 - 0.18)},${263 + 178 * Math.sin(a2 - 0.18)}`, stroke: IF, 'stroke-width': 4, fill: 'none' }));
    const d = mk(g, 'g', {}); const tx = -Math.sin(a), ty = Math.cos(a); mk(d, 'circle', { cx: x - 13 * tx, cy: y - 13 * ty, r: 15, fill: MT, stroke: BR, 'stroke-width': 2 }); mk(d, 'circle', { cx: x + 13 * tx, cy: y + 13 * ty, r: 15, fill: '#8FB0E0', stroke: BR, 'stroke-width': 2 }); ZG.db.push(d); }
  mk(g, 'circle', { cx: 528, cy: 263, r: 50, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); ZG.cp = mk(g, 'g', {}); mk(ZG.cp, 'circle', { cx: 508, cy: 263, r: 16, fill: MT, stroke: BR, 'stroke-width': 2 }); mk(ZG.cp, 'circle', { cx: 548, cy: 263, r: 16, fill: MT, stroke: BR, 'stroke-width': 2 });
  ZG.n = txt(g, 940, 120, '0', { 'text-anchor': 'middle', 'font-size': 64, fill: MT, 'font-weight': 600 }); txt(g, 940, 156, 'DOUBLETS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
  LB[3] = [lab(g, 528, 117, 300, 50, 'Peripheral doublet', 'end', [450, 50], 22), lab(g, 548, 263, 760, 470, 'Central microtubules', 'start', [700, 470], 22), lab(g, 452, 300, 230, 380, 'Radial spoke', 'end', null, 22), lab(g, 467, 96, 230, 180, 'Linker', 'end', null, 22)]; }
const FOC = [[528, 72, 60], [528, 230, 60], [680, 263, 90], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'microtubules'), wt('Z2', 'microfilaments'), wt('Z2', 'intermediate')], [wt('Z3', 'cilia'), wt('Z3', 'membrane'), wt('Z3', 'membrane') + 0.5], [wt('Z4', 'plasma'), wt('Z4', 'axoneme'), wt('Z4', 'microtubules')], [wt('Z5', 'doublets'), wt('Z5', 'centre'), wt('Z5', 'Radial'), wt('Z5', 'linkers')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Nine pairs and two in the middle!' });

/* ---------- P: how cilia move ---------- */
const PN = ['STROKE', 'RETURN', 'WAVE', 'FLUID MOVES', 'FLAGELLUM'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['CILIATED CELLS', 'Cilia at work', 'Watch them, step by step.', ''], ['STEP 1 OF 5', 'Stroke', 'Stiff, it sweeps forward like an oar.', ''],
  ['STEP 2 OF 5', 'Return', 'It bends and swings back, close to the cell.', 'Does not push fluid back'], ['STEP 3 OF 5', 'Wave', 'Neighbours beat one after another.', 'Like a stadium wave'],
  ['STEP 4 OF 5', 'Fluid moves', 'Mucus and dust move one way.', ''], ['STEP 5 OF 5', 'Flagellum', 'Longer. It whips to push the cell.', 'Both grow from a basal body']]);
const ps = sv('pS'), PP = {};
PP.row = mk(ps, 'g', {}); for (let k = 0; k < 8; k++) { const x = 80 + k * 112; mk(PP.row, 'rect', { x, y: 380, width: 112, height: 110, fill: CYT, stroke: '#C9B36A', 'stroke-width': 3 }); mk(PP.row, 'circle', { cx: x + 56, cy: 440, r: 18, fill: NUC }); }
PP.cil = []; for (let k = 0; k < 8; k++) PP.cil.push(mk(PP.row, 'path', { d: '', stroke: CIL, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));
PP.muc = mk(ps, 'g', {}); mk(PP.muc, 'rect', { x: 80, y: 190, width: 896, height: 60, rx: 30, fill: MUC, stroke: '#A9B56A', 'stroke-width': 2.5 });
PP.dust = []; for (let k = 0; k < 9; k++) PP.dust.push(mk(PP.muc, 'circle', { cx: 0, cy: 208 + (k * 11) % 24, r: 5 + (k % 3) * 1.5, fill: '#6B7280' }));
PP.mL = txt(ps, 528, 170, 'MUCUS AND DUST · ONE WAY', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: '#7A8440', 'font-weight': 600 });
PP.fl = mk(ps, 'g', {}); PP.flT = mk(PP.fl, 'path', { d: '', stroke: CIL, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); PP.flB = mk(PP.fl, 'ellipse', { cx: 0, cy: 0, rx: 96, ry: 62, fill: CYT, stroke: '#C9B36A', 'stroke-width': 4 }); PP.flN = mk(PP.fl, 'circle', { cx: 0, cy: 0, r: 24, fill: NUC }); PP.flL = txt(PP.fl, 0, 0, 'FLAGELLUM', { 'font-size': 18, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 }); PP.bbL = txt(PP.fl, 0, 0, 'BASAL BODY', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: MT, 'font-weight': 600 });
PP.flBB = mk(PP.fl, 'rect', { x: 0, y: 0, width: 14, height: 20, rx: 3, fill: MT });

/* ---------- C: centrosome ---------- */
const cl = sv('clS'), CL = {};
CL.pcm = mk(cl, 'path', { d: 'M150,290 C140,170 260,110 380,130 C520,110 640,180 630,300 C640,420 520,470 390,450 C250,470 160,410 150,290 Z', fill: PCM, stroke: '#B8C2D8', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
CL.c1 = mk(cl, 'g', {}); { const g = CL.c1; mk(g, 'rect', { x: 230, y: 250, width: 240, height: 80, fill: '#CFDDF2', stroke: MT, 'stroke-width': 4 }); for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M230,${262 + k * 14} L470,${262 + k * 14}`, stroke: MT, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: 470, cy: 290, rx: 16, ry: 40, fill: '#CFDDF2', stroke: MT, 'stroke-width': 4 }); }
CL.c2 = mk(cl, 'g', {}); { const g = CL.c2; mk(g, 'circle', { cx: 520, cy: 230, r: 58, fill: '#CFDDF2', stroke: MT, 'stroke-width': 4 }); for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2; mk(g, 'circle', { cx: 520 + 44 * Math.cos(a), cy: 230 + 44 * Math.sin(a), r: 7, fill: MT }); } mk(g, 'circle', { cx: 520, cy: 230, r: 10, fill: MF }); }
CL.ang = mk(cl, 'path', { d: 'M470,250 L470,236 L484,236', stroke: C.ac, 'stroke-width': 4, fill: 'none' });
CL.L = [lab(cl, 300, 330, 250, 500, 'Centriole', 'end', null, 22), lab(cl, 560, 270, 600, 500, 'Centriole', 'start', null, 22), lab(cl, 380, 150, 340, 70, 'Pericentriolar material', 'start', null, 22)];
const cr = sv('crS'), CR = {};
CR.w = mk(cr, 'g', {}); CR.tri = []; CR.sp = [];
{ const g = CR.w, X = 330, Y = 300; mk(g, 'circle', { cx: X, cy: Y, r: 200, fill: '#F1F5FB', stroke: '#B8C2D8', 'stroke-width': 3 });
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 - Math.PI / 2, x = X + 150 * Math.cos(a), y = Y + 150 * Math.sin(a), ta = a + Math.PI / 2 + 0.6;
    CR.sp.push(mk(g, 'path', { d: `M${X + 34 * Math.cos(a)},${Y + 34 * Math.sin(a)} L${X + 122 * Math.cos(a)},${Y + 122 * Math.sin(a)}`, stroke: MF, 'stroke-width': 4 }));
    const t3 = mk(g, 'g', {}); [-1, 0, 1].forEach(j => mk(t3, 'circle', { cx: x + j * 24 * Math.cos(ta), cy: y + j * 24 * Math.sin(ta), r: 12, fill: j ? '#8FB0E0' : MT, stroke: BR, 'stroke-width': 2 })); CR.tri.push(t3); }
  CR.hub = mk(g, 'circle', { cx: X, cy: Y, r: 32, fill: MF, stroke: BR, 'stroke-width': 2.5 });
  CR.L = [lab(g, 330, 150, 560, 96, 'Triplet', 'start', [480, 96], 22), lab(g, 350, 300, 560, 420, 'Hub', 'start', [500, 420], 22), lab(g, 381, 239, 560, 250, 'Radial spoke', 'start', null, 22)];
  CR.n = txt(g, 650, 520, '0 TRIPLETS', { 'text-anchor': 'middle', 'font-size': 22, 'letter-spacing': 1.4, fill: MT, 'font-weight': 600 }); }
CR.j = mk(cr, 'g', {}); CR.jr = [['Basal body', 'CILIA AND FLAGELLA GROW FROM IT'], ['Spindle fibres', 'IN ANIMAL CELLS, FOR CELL DIVISION']].map(([n, s], i) => { const g = mk(CR.j, 'g', {}), y = 110 + i * 220; mk(g, 'rect', { x: 36, y, width: 712, height: 190, rx: 14, fill: C.soft });
  if (i === 0) { mk(g, 'rect', { x: 110, y: y + 140, width: 30, height: 34, rx: 4, fill: MT }); mk(g, 'path', { d: `M125,${y + 140} C120,${y + 100} 140,${y + 60} 130,${y + 20}`, stroke: CIL, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: `M60,${y + 174} L190,${y + 174}`, stroke: MEM, 'stroke-width': 5 }); }
  else { mk(g, 'circle', { cx: 70, cy: y + 95, r: 12, fill: MT }); mk(g, 'circle', { cx: 190, cy: y + 95, r: 12, fill: MT }); for (let k = -2; k <= 2; k++) mk(g, 'path', { d: `M70,${y + 95} Q130,${y + 95 + k * 30} 190,${y + 95}`, stroke: MT, 'stroke-width': 2.5, fill: 'none' }); mk(g, 'rect', { x: 122, y: y + 70, width: 16, height: 50, rx: 7, fill: NUC }); }
  txt(g, 240, y + 90, n, { 'font-family': 'Poppins', 'font-size': 36, 'font-weight': 700, fill: C.ink }); txt(g, 240, y + 128, s, { 'font-size': 16, 'letter-spacing': 1.3, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['CILIA', 'FLAGELLA'], [
  ['', 'Size', 'Small and many', 'Longer and fewer', wt('V1', 'Cilia'), wt('V1', 'Flagella'), s => { for (let k = 0; k < 6; k++) mk(s, 'path', { d: `M${20 + k * 18},80 L${24 + k * 18},40`, stroke: CIL, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(s, 'path', { d: 'M10,82 L120,82', stroke: MEM, 'stroke-width': 5 }); },
    s => { mk(s, 'ellipse', { cx: 30, cy: 50, rx: 22, ry: 16, fill: CYT, stroke: '#C9B36A', 'stroke-width': 3 }); mk(s, 'path', { d: 'M52,50 C64,30 76,70 88,50 S112,30 124,50', stroke: CIL, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); }],
  ['', 'Job', 'Like oars: move the cell or the fluid', 'Push the cell along', wt('V2', 'Cilia'), wt('V2', 'Flagella'), s => { mk(s, 'path', { d: 'M20,70 L110,70 M30,70 L60,30', stroke: '#8C6D4F', 'stroke-width': 6, 'stroke-linecap': 'round' }); },
    s => { mk(s, 'path', { d: 'M20,50 L110,50 M96,38 L110,50 L96,62', stroke: C.ac, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }],
  ['', 'Inside', '9 + 2 axoneme, from a basal body', 'The same 9 + 2 (bacteria: different)', wt('V3', 'Both'), wt('V3', 'Bacteria'), s => { mk(s, 'circle', { cx: 65, cy: 50, r: 40, fill: '#EAF3FA', stroke: MEM, 'stroke-width': 3 }); for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2; mk(s, 'circle', { cx: 65 + 28 * Math.cos(a), cy: 50 + 28 * Math.sin(a), r: 5, fill: MT }); } mk(s, 'circle', { cx: 59, cy: 50, r: 4.5, fill: MT }); mk(s, 'circle', { cx: 71, cy: 50, r: 4.5, fill: MT }); },
    s => { mk(s, 'circle', { cx: 65, cy: 50, r: 40, fill: '#EAF3FA', stroke: MEM, 'stroke-width': 3 }); for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2; mk(s, 'circle', { cx: 65 + 28 * Math.cos(a), cy: 50 + 28 * Math.sin(a), r: 5, fill: MT }); } mk(s, 'circle', { cx: 59, cy: 50, r: 4.5, fill: MT }); mk(s, 'circle', { cx: 71, cy: 50, r: 4.5, fill: MT }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A cilium has nine pairs plus two in the centre. A centriole has nine triplets. Which one has microtubules in its centre?', opts: ['Cilium', 'Centriole', 'Both'], right: 0, why: 'The cilium. A centriole has a protein hub in the centre, not microtubules.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['80S · 60S + 40S', 'background:var(--ink);color:#fff'], ['70S · 50S + 30S', 'background:#FBE3CC;color:#9A4F17']], [
  ['cell', 'Liver cell cytoplasm', '<b>Eukaryotic</b> cytoplasm', 0, 0, wt('W2', '80S')], ['bac', 'A bacterium', '<b>Prokaryotic</b>', 1, 0, wt('W3', '70S')],
  ['mito', 'Inside a mitochondrion', 'Its own small ribosomes', 1, 1, wt('W4', '70S')], ['cell', 'Rough ER, onion root', '<b>Eukaryotic</b> cytoplasm', 0, 1, wt('W5', '80S')],
  ['chl', 'Inside a chloroplast', 'Its own small ribosomes', 1, 2, wt('W6', '70S')], ['cell', 'Windpipe cell cytoplasm', '<b>Eukaryotic</b> cytoplasm', 0, 2, wt('W7', '80S')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ ribo(TP, 170, 130, 1.5); txt(TP, 250, 104, '60S', { 'font-size': 24, fill: C.ink, 'font-weight': 600 }); txt(TP, 250, 166, '40S', { 'font-size': 24, fill: C.ink, 'font-weight': 600 });
  txt(TP, 330, 140, '= 80S', { 'font-size': 40, fill: C.ok, 'font-weight': 600 }); txt(TP, 300, 230, 'NOT 100S · S IS SETTLING SPEED', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); }

const EP = {
  jobs: [['tent', 'A tent', 'POLES INSIDE', 'tent'], ['boat', 'A rowing boat', 'OARS', 'rowing'], ['factory', 'A factory', 'BUILDS THINGS', 'factory']],
  learn: [['grain', 'Ribosomes', 'ribosome'], ['nine', '9 + 2', 'nine'], ['wheel', 'Centriole', 'centriole']],
  hookW: 'doctor', split: ['skeleton', 'ribosomes'], st: ['Cilia', 'Centrioles'],
  cam: [],
  hook: t => { M.vis(HL.cells, t, wt('H2', 'coughed') - 0.3, 1e9, { dy: 20 }); M.vis($('#hlt0'), t, wt('H2', 'windpipe'), 1e9, POP);
    const on = t > wt('H2', 'windpipe') - 0.2; HL.cil.forEach((c, k) => { const x = 86 + k * 26.5; attr(c, 'd', on ? ciliumD(x, 300, ((t * 0.7 - k * 0.04) % 1 + 1) % 1, 56, 30) : ''); });
    M.vis(HL.muc, t, wt('H2', 'mucus') - 0.2, 1e9, { dy: -10 }); HL.dust.forEach((d, k) => attr(d, 'cx', (90 + ((k * 90 + Math.max(0, t - wt('H3', 'sweep')) * 70) % 610)).toFixed(1)));
    M.draw(HL.ar, t, wt('H3', 'out') - 0.2, 0.4); M.vis($('#hlt1'), t, wt('H3', 'sweep'), 1e9, POP); M.vis($('#hlP'), t, wt('H3', 'move') - 0.2, 1e9, POP); },
  measure: () => { [['hlt0', 392, 420], ['hlt1', 300, 108]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.r, t, wt('D2', 'grains') - 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis(DL.q, t, wt('D2', 'Palade') - 0.1, 1e9, POP);
      attr(DL.rb, 'transform', `translate(0 ${(3 * Math.sin(t * 2)).toFixed(2)})`);
      labRun(DL.L[2], t, wt('D3', 'membrane')); labRun(DL.L[0], t, wt('D4', 'subunits')); labRun(DL.L[1], t, wt('D4', 'subunits') + 0.4); M.vis($('#dlP'), t, wt('D3', 'RNA') - 0.1, 1e9, POP);
      M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o });
      DR.rows.forEach((r, i) => { const ta = wt('D4', i ? '70S' : '80S'); M.vis(r.g, t, ta - 0.2, 1e9, { dy: 14 }); M.vis(r.p[0], t, wt('D4', i ? '50S' : '60S'), 1e9, POP); M.vis(r.p[1], t, wt('D4', i ? '30S' : '40S'), 1e9, POP); });
      M.vis(DR.tube, t, wt('D5', 'settles') - 0.3, 1e9, POP); attr(DR.dot, 'cy', (380 + 70 * M.io(((t - wt('D5', 'settles')) % 2.2) / 1.6)).toFixed(1)); M.vis($('#drP'), t, wt('D5', 'Svedberg'), 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      ZG.cl0.forEach((c, k) => attr(c, 'd', ciliumD(400 + k * 32, 72, ((t * 0.7 - k * 0.05) % 1 + 1) % 1, 34, 25)));
      ZG.cl1.forEach((c, k) => attr(c, 'd', ciliumD(70 + k * 70, 372, ((t * 0.5 - k * 0.06) % 1 + 1) % 1, 220, 22)));
      const z5 = T0('Z5'); ZG.db.forEach((d, k) => M.vis(d, t, wt('Z5', 'Nine') + k * 0.18, 1e9, { ...POP, sc: 0.3 })); ZG.n.textContent = String(Math.max(0, Math.min(9, Math.floor((t - wt('Z5', 'Nine')) / 0.18) + 1)));
      M.vis(ZG.cp, t, wt('Z5', 'Two') - 0.1, 1e9, { ...POP, sc: 0.3 }); ZG.sp.forEach((s, k) => M.draw(s, t, wt('Z5', 'Radial') + k * 0.06, 0.3)); ZG.lk.forEach((s, k) => M.draw(s, t, wt('Z5', 'linkers') + k * 0.06, 0.3));
      avZ(t, wt('Z5', 'array') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]); M.vis(PP.row, t, T0('P1') + 0.3, tPs[4] - 0.1, { dy: 20, outDur: 0.25 });
      PP.cil.forEach((c, k) => { const x = 136 + k * 112; let p;
        if (st < 2) { if (k === 3) { p = st < 1 ? 0.175 + 0.175 * M.clamp(((t - tPs[0]) % 2.4) / 1.2) : 0.35 + 0.65 * M.clamp(((t - tPs[1]) % 3) / 2.4); } else p = 0.175; }
        else p = ((t - tPs[2]) * 0.7 - k * 0.1) % 1; attr(c, 'd', ciliumD(x, 380, (p + 1) % 1, 140)); attr(c, 'stroke', st < 2 && k === 3 ? C.ac : CIL); });
      M.vis(PP.muc, t, tPs[3] - 0.1, tPs[4] - 0.1, { dy: -16, outDur: 0.25 }); M.vis(PP.mL, t, tPs[3] + 0.2, tPs[4] - 0.1, { ...POP, outDur: 0.25 });
      PP.dust.forEach((d, k) => attr(d, 'cx', (110 + ((k * 101 + Math.max(0, t - tPs[3]) * 120) % 840)).toFixed(1)));
      if (M.vis(PP.fl, t, tPs[4], 1e9, { dy: 0, fade: 0.3 })) { const cx = 640 - 360 * M.clamp((t - tPs[4]) / 9), cy = 290;
        let d = `M${cx + 96},${cy}`; for (let k = 1; k <= 48; k++) { const x = cx + 96 + k * 8; d += ` L${x},${(cy + 36 * Math.sin(k * 0.4 - t * 10) * (k / 48)).toFixed(1)}`; }
        attr(PP.flT, 'd', d); attr(PP.flB, 'cx', cx); attr(PP.flB, 'cy', cy); attr(PP.flN, 'cx', cx - 8); attr(PP.flN, 'cy', cy); attr(PP.flBB, 'x', cx + 80); attr(PP.flBB, 'y', cy - 10); attr(PP.flL, 'x', cx + 200); attr(PP.flL, 'y', cy - 60); attr(PP.bbL, 'x', cx + 88); attr(PP.bbL, 'y', cy + 100); } }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.c1, t, wt('C1', 'cylinders') - 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis(CL.c2, t, wt('C1', 'centrioles') - 0.1, 1e9, { ...POP, sc: 0.5 });
      M.draw(CL.ang, t, wt('C2', 'right') - 0.1, 0.4); M.vis(CL.pcm, t, wt('C2', 'cloud') - 0.2, 1e9, { dy: 0, fade: 0.4 });
      labRun(CL.L[0], t, wt('C1', 'centrioles')); labRun(CL.L[1], t, wt('C1', 'centrioles') + 0.3); labRun(CL.L[2], t, wt('C2', 'pericentriolar'));
      M.vis($('#cr'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o }); $('#crL').textContent = t < T0('C5') - 0.1 ? 'ONE CENTRIOLE · CUT ACROSS' : 'WHAT CENTRIOLES DO';
      M.vis(CR.w, t, T0('C3') + 0.1, T0('C5') - 0.15, { ...POP, sc: 0.8, outDur: 0.25 }); const tn = wt('C3', 'nine');
      CR.tri.forEach((g, k) => M.vis(g, t, tn + k * 0.16, 1e9, { ...POP, sc: 0.3 })); CR.n.textContent = Math.max(0, Math.min(9, Math.floor((t - tn) / 0.16) + 1)) + ' TRIPLETS';
      M.vis(CR.hub, t, wt('C4', 'hub') - 0.1, 1e9, { ...POP, sc: 0.3 }); CR.sp.forEach((s, k) => M.draw(s, t, wt('C4', 'radial') + k * 0.05, 0.3));
      labRun(CR.L[0], t, wt('C3', 'triplet')); labRun(CR.L[1], t, wt('C4', 'hub')); labRun(CR.L[2], t, wt('C4', 'spokes'));
      M.vis(CR.j, t, T0('C5') + 0.05, 1e9, { dy: 20 }); CR.jr.forEach((g, i) => M.vis(g, t, wt('C5', i ? 'spindle' : 'basal') - 0.2, 1e9, { dx: -20, dy: 0 })); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'centriole') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: '60S + 40S must make a 100S ribosome', right: 'S is settling speed, not weight: the whole is 80S', tRight: wt('X3', 'whole') - 0.1,
    type: '9 + 2 diagram, ribosome types (boards); statement questions (NEET)', tType: wt('E1', 'nine'),
    xRun: t => M.vis(TP, t, wt('X3', 'settles') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement is correct?', cols: 1, optW: 968, optH: 70, optFs: 25, optY: 140, qW: 840,
      opts: ['The axoneme of a cilium has nine triplets of microtubules', 'The two centrioles of a centrosome lie parallel', 'Cilia and flagella grow from centriole-like basal bodies', 'Ribosomes are bound by a single membrane'], right: 2 },
    tOpts: wt('Q1', 'correct') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">C</b>'], ['Axoneme: nine <b>doublets</b>'], ['Centrioles: at <b>right angles</b>'], ['Ribosomes: <b>no membrane</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'doublets'), wt('A2', 'right'), wt('A3', 'membrane')],
    recapT: 'Recap · ribosomes to centrosome',
    recap: ['<b>Ribosomes</b>: RNA + proteins, no membrane · first seen by Palade, 1953 · build proteins', '<b>80S</b> = 60S + 40S (eukaryotic) · <b>70S</b> = 50S + 30S (prokaryotic) · S = Svedberg unit',
      '<b>Cytoskeleton</b>: microtubules, microfilaments, intermediate filaments · support, shape, motility', '<b>Cilia</b> (small, oars) and <b>flagella</b> (longer): 9 + 2 axoneme · grow from a basal body',
      '<b>Centrosome</b>: 2 centrioles at right angles · 9 tubulin triplets + hub · basal body, spindle'],
    yq: ['What are the two subunits of an 80S ribosome?', 'What is the nine plus two array?', 'Name two jobs of centrioles.'],
    nextL: 'NEXT · EP 67', nextT: 'How does 2 metres of DNA fit in one cell? The Nucleus and Chromosomes' },
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
