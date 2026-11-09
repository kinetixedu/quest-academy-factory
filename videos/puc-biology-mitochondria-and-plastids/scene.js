// PUC Biology Ep 65: Mitochondria and Plastids (Living diagram, leaf green)
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


/* ===== Ep 65: mitochondria and plastids ===== */
Object.assign(M.IC, {
  run: [ci(14, 4, 2), 'M12 8l-3 5 4 2-1 6', 'M9 13l-4 1', 'M12 8l4 3 3-1', 'M13 15l4 2'],
  leaf: ['M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Z', 'M5 19l9-9'],
  tomato: [ci(12, 14, 7), 'M9 7l3 2 3-2', 'M12 9V5'],
  find: [ci(10, 10, 6), 'M14.5 14.5L20 20'],
  three: ['M5 7h4M7 7v10', 'M12 7h4M14 7v10', 'M19 7v10'],
  bolt: ['M13 2L4 14h7l-1 8 9-12h-7l1-8Z'],
  mito: ['M4 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6Z', 'M7 12c1-2 2 2 3 0s2 2 3 0 2 2 3 0'],
  chl: ['M3 12c0-4 4-7 9-7s9 3 9 7-4 7-9 7-9-3-9-7Z', 'M8 10h3M8 12h3M8 14h3M14 10h3M14 12h3M14 14h3'],
});
const sv = id => $('#' + id);
const MITO = '#E58A3C', MITL = '#F7D3B0', MITD = '#B8662A', OXY = '#2F6FEB', CYT = '#F4EEE2', STR = '#D8EDCF', GRA = '#3E9B5F', TOM = '#D8553A', CHR = '#E9A23B', LEU = '#F3F0E6', LEUE = '#B9B29B';
const sausage = (g, cx, cy, rx, ry, rot, fill = MITO, st = MITD, sw = 2.5) => { const w = mk(g, 'g', { transform: `rotate(${rot} ${cx} ${cy})` }); mk(w, 'ellipse', { cx, cy, rx, ry, fill, stroke: st, 'stroke-width': sw }); mk(w, 'path', { d: `M${cx - rx * 0.7},${cy} q${rx * 0.12},${-ry * 0.6} ${rx * 0.24},0 t${rx * 0.24},0 t${rx * 0.24},0 t${rx * 0.24},0 t${rx * 0.24},0`, stroke: st, 'stroke-width': 2, fill: 'none' }); return w; };
const chlo = (g, cx, cy, rx, ry, rot = 0) => { const w = mk(g, 'g', { transform: `rotate(${rot} ${cx} ${cy})` }); mk(w, 'ellipse', { cx, cy, rx, ry, fill: '#8CC48F', stroke: '#2F7A49', 'stroke-width': 2 }); for (let k = -1; k <= 1; k++) mk(w, 'path', { d: `M${cx + k * rx * 0.45 - 5},${cy - ry * 0.35} v${ry * 0.7} M${cx + k * rx * 0.45 + 5},${cy - ry * 0.35} v${ry * 0.7}`, stroke: '#2F7A49', 'stroke-width': 2 }); return w; };

/* ---------- H: the tomato on the shelf ---------- */
const hl = sv('hlS'), HL = {};
mk(hl, 'rect', { x: 36, y: 392, width: 712, height: 18, rx: 4, fill: '#C9A06A' });
const tomato = (g, cx) => { const b = mk(g, 'path', { d: `M${cx - 92},300 C${cx - 92},230 ${cx - 50},196 ${cx},196 C${cx + 50},196 ${cx + 92},230 ${cx + 92},300 C${cx + 92},362 ${cx + 50},392 ${cx},392 C${cx - 50},392 ${cx - 92},362 ${cx - 92},300 Z`, fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: `M${cx},200 l-26,-14 l20,-2 l6,-18 l6,18 l20,2 Z`, fill: '#3E7A3A', stroke: BR, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${cx - 44},250 C${cx - 50},270 ${cx - 50},290 ${cx - 44},310`, stroke: '#fff', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', opacity: 0.55 }); return b; };
HL.g0 = mk(hl, 'g', {}); HL.b0 = tomato(HL.g0, 210); HL.g1 = mk(hl, 'g', {}); HL.b1 = tomato(HL.g1, 574);
HL.ar = mk(hl, 'path', { d: 'M362,290 L422,290 M410,278 L422,290 L410,302', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });

/* ---------- D: organelles + double membrane ---------- */
const dl = sv('dlS'), DL = {};
DL.cell = mk(dl, 'rect', { x: 200, y: 100, width: 480, height: 360, rx: 60, fill: CYT, stroke: '#C9B36A', 'stroke-width': 5 });
DL.org = mk(dl, 'g', {}); mk(DL.org, 'circle', { cx: 360, cy: 290, r: 58, fill: NUC });
DL.mi = [[520, 180, 0], [590, 330, 30], [480, 400, -20]].map(([x, y, r]) => sausage(DL.org, x, y, 44, 20, r));
DL.ch = [[280, 170, 20], [600, 236, -10]].map(([x, y, r]) => chlo(DL.org, x, y, 40, 22, r));
DL.L = [lab(dl, 330, 320, 180, 420, 'Nucleus', 'end', null, 22), lab(dl, 520, 170, 560, 70, 'Mitochondrion', 'start', null, 22), lab(dl, 280, 160, 250, 70, 'Chloroplast', 'start', null, 22)];
const dr = sv('drS'), DR = {};
DR.bub = mk(dr, 'g', {}); mk(DR.bub, 'circle', { cx: 150, cy: 270, r: 74, fill: '#EAF3FA', stroke: WAT, 'stroke-width': 4 }); mk(DR.bub, 'path', { d: 'M110,236 C120,220 134,212 150,210', stroke: '#fff', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); txt(DR.bub, 150, 380, 'ONE SKIN', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.mute, 'font-weight': 600 });
DR.cap = mk(dr, 'g', {}); mk(DR.cap, 'rect', { x: 300, y: 160, width: 420, height: 220, rx: 110, fill: MITL, stroke: MITD, 'stroke-width': 6 });
DR.in = mk(dr, 'rect', { x: 326, y: 186, width: 368, height: 168, rx: 84, fill: '#FBE8D6', stroke: MITO, 'stroke-width': 5 });
DR.L = [lab(dr, 510, 160, 560, 96, 'Outer membrane', 'start', null, 22), lab(dr, 510, 354, 560, 430, 'Inner membrane', 'start', null, 22)];

/* ---------- Z: zoom ladder CELL -> MITOCHONDRION -> CRISTAE -> MATRIX ---------- */
const ZN = ['CELL', 'MITOCHONDRION', 'CRISTAE', 'MATRIX'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'A cell', 'It holds many mitochondria, shaped like sausages or cylinders.', 'Busy cell: more of them'],
  ['RUNG 2 OF 4', 'Mitochondrion', 'An outer and an inner membrane: a double membrane.', 'Two watery rooms inside'],
  ['RUNG 3 OF 4', 'Cristae', 'The inner membrane folds inward, again and again.', 'More surface area'],
  ['RUNG 4 OF 4', 'Matrix', 'One circular DNA, a few RNAs and 70S ribosomes.', 'Divides by fission']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'rect', { x: 240, y: 50, width: 576, height: 426, rx: 70, fill: CYT, stroke: '#C9B36A', 'stroke-width': 6 }); mk(g, 'circle', { cx: 420, cy: 270, r: 74, fill: NUC });
  [[650, 170, 20], [700, 330, -30], [560, 410, 10], [330, 130, -15], [320, 410, 25], [560, 250, 70]].forEach(([x, y, r]) => sausage(g, x, y, 46, 20, r));
  LB[0] = [lab(g, 330, 140, 220, 80, 'Mitochondria', 'end', null, 24), lab(g, 400, 300, 220, 420, 'Nucleus', 'end', null, 24)]; }
{ const g = ZG[1]; mk(g, 'rect', { x: 128, y: 103, width: 800, height: 320, rx: 160, fill: MITL, stroke: MITD, 'stroke-width': 7 });
  mk(g, 'rect', { x: 160, y: 135, width: 736, height: 256, rx: 128, fill: '#FBE8D6', stroke: MITO, 'stroke-width': 6 });
  LB[1] = [lab(g, 700, 103, 760, 50, 'Outer membrane', 'start', null, 24), lab(g, 700, 391, 760, 470, 'Inner membrane', 'start', null, 24), lab(g, 300, 120, 160, 50, 'Outer compartment', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#FBE8D6' }); mk(g, 'rect', { x: -20, y: 40, width: 1096, height: 36, fill: MITL, stroke: MITD, 'stroke-width': 6 });
  let d = 'M-20,110'; for (let k = 0; k < 6; k++) { const x = 90 + k * 170; d += ` L${x - 30},110 L${x - 30},380 C${x - 30},420 ${x + 30},420 ${x + 30},380 L${x + 30},110`; } d += ' L1076,110';
  mk(g, 'path', { d: d + ' L1076,526 L-20,526 Z', fill: '#FDF1E4', stroke: 'none' }); ZG.cr = mk(g, 'path', { d, stroke: MITO, 'stroke-width': 8, fill: 'none', 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M-20,93 L1076,93', stroke: 'none' });
  LB[2] = [lab(g, 430, 404, 400, 470, 'Cristae', 'start', null, 24), lab(g, 685, 110, 685, 470, 'Inner membrane', 'start', null, 24), lab(g, 90, 300, 60, 470, 'Outer compartment', 'start', null, 24)]; }
{ const g = ZG[3]; mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 526, fill: '#FDF1E4' }); ZG.dna = mk(g, 'g', {});
  let d = ''; for (let k = 0; k <= 72; k++) { const a = k / 72 * Math.PI * 2, r = 120 + 10 * Math.sin(a * 9); d += (k ? 'L' : 'M') + (528 + r * Math.cos(a)).toFixed(1) + ',' + (263 + r * 0.8 * Math.sin(a)).toFixed(1); }
  mk(ZG.dna, 'path', { d: d + 'Z', stroke: NUC, 'stroke-width': 6, fill: 'none' });
  ZG.rib = []; [[230, 120], [270, 400], [820, 140], [860, 380], [200, 260], [900, 260], [760, 450], [330, 470]].forEach(([x, y]) => { const r = mk(g, 'g', {}); mk(r, 'circle', { cx: x, cy: y - 7, r: 9, fill: BR }); mk(r, 'circle', { cx: x, cy: y + 8, r: 12, fill: BR }); ZG.rib.push(r); });
  [[380, 80], [690, 470], [140, 400]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y} q12,-14 24,0 t24,0 t24,0`, stroke: '#A9719E', 'stroke-width': 4, fill: 'none' }));
  LB[3] = [lab(g, 528, 159, 640, 60, 'Circular DNA', 'start', null, 24), lab(g, 860, 380, 760, 470, '70S ribosomes', 'end', null, 24), lab(g, 176, 400, 240, 470, 'RNA', 'start', null, 24)]; }
const FOC = [[650, 170, 62], [300, 230, 70], [528, 300, 60], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'mitochondria'), wt('Z2', 'busy')], [wt('Z3', 'outer'), wt('Z3', 'inner'), wt('Z3', 'rooms')], [wt('Z4', 'cristae'), wt('Z4', 'inner'), wt('Z4', 'inner') + 0.4], [wt('Z5', 'circular'), wt('Z5', 'ribosomes'), wt('Z5', 'RNA')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'More folds, more room to work!' });

/* ---------- P: what a mitochondrion does ---------- */
const PN = ['FOOD IN', 'OXYGEN IN', 'BREAK DOWN', 'ATP', 'POWER'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE MITOCHONDRION', 'Power house', 'Watch it, step by step.', ''], ['STEP 1 OF 5', 'Food in', 'Food, like sugar, reaches the mitochondrion.', ''],
  ['STEP 2 OF 5', 'Oxygen in', 'Oxygen comes in too.', 'Aerobic respiration'], ['STEP 3 OF 5', 'Break down', 'The food is broken down along the cristae.', 'Step by step'],
  ['STEP 4 OF 5', 'ATP', 'Energy is packed into ATP.', 'Like charged batteries'], ['STEP 5 OF 5', 'Power', 'ATP travels out and powers the cell.', 'Power house of the cell']]);
const ps = sv('pS'), PP = {};
PP.m = mk(ps, 'g', {}); mk(PP.m, 'rect', { x: 238, y: 150, width: 580, height: 270, rx: 135, fill: MITL, stroke: MITD, 'stroke-width': 6 });
mk(PP.m, 'rect', { x: 262, y: 174, width: 532, height: 222, rx: 111, fill: '#FBE8D6', stroke: MITO, 'stroke-width': 5 });
PP.cr = []; for (let k = 0; k < 5; k++) { const x = 360 + k * 84; PP.cr.push(mk(PP.m, 'path', { d: `M${x - 14},176 L${x - 14},${k % 2 ? 330 : 300} C${x - 14},${k % 2 ? 350 : 320} ${x + 14},${k % 2 ? 350 : 320} ${x + 14},${k % 2 ? 330 : 300} L${x + 14},176`, stroke: MITO, 'stroke-width': 5, fill: '#FDF1E4' })); }
const hexP = (x, y, r) => { let d = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
PP.sug = [0, 1, 2].map(i => { const g = mk(ps, 'g', {}); mk(g, 'path', { d: hexP(0, 0, 24), fill: GOLD, stroke: BR, 'stroke-width': 2.5 }); return g; });
PP.oxy = [0, 1, 2].map(i => { const g = mk(ps, 'g', {}); mk(g, 'circle', { cx: -11, cy: 0, r: 13, fill: OXY }); mk(g, 'circle', { cx: 11, cy: 0, r: 13, fill: OXY }); return g; });
PP.bits = []; for (let i = 0; i < 9; i++) PP.bits.push(mk(ps, 'circle', { cx: 0, cy: 0, r: 8, fill: GOLD, stroke: BR, 'stroke-width': 1.5 }));
PP.atp = []; for (let i = 0; i < 5; i++) { const g = mk(ps, 'g', {}); mk(g, 'rect', { x: -34, y: -20, width: 68, height: 40, rx: 20, fill: MITO, stroke: BR, 'stroke-width': 2.5 }); txt(g, 0, 7, 'ATP', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700 }); PP.atp.push(g); }
PP.sL = txt(ps, 110, 120, 'SUGAR', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: GOLD, 'font-weight': 600 });
PP.oL = txt(ps, 520, 110, 'OXYGEN', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: OXY, 'font-weight': 600 });
PP.cell = mk(ps, 'g', {}); mk(PP.cell, 'path', { d: 'M906,120 L1010,120 L1010,450 L906,450', stroke: '#C9B36A', 'stroke-width': 5, fill: 'none', 'stroke-dasharray': '10 8' }); txt(PP.cell, 958, 480, 'THE CELL', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 });
PP.bolt = mk(PP.cell, 'path', { d: 'M966,230 L940,290 L962,290 L950,340 L984,270 L962,270 L974,230 Z', fill: MITO, stroke: BR, 'stroke-width': 2.5 });

/* ---------- C: plastids ---------- */
const cl = sv('clS'), CL = {};
CL.ch = mk(cl, 'g', {}); mk(CL.ch, 'ellipse', { cx: 392, cy: 280, rx: 300, ry: 150, fill: '#BFE0B4', stroke: '#2F7A49', 'stroke-width': 6 });
mk(CL.ch, 'ellipse', { cx: 392, cy: 280, rx: 282, ry: 132, fill: STR, stroke: GRA, 'stroke-width': 4 });
CL.lam = mk(CL.ch, 'g', {}); [[200, 300, 312, 250], [312, 250, 430, 312], [430, 312, 548, 250], [548, 250, 620, 290]].forEach(([a, b, c2, d]) => mk(CL.lam, 'path', { d: `M${a},${b} L${c2},${d}`, stroke: GRA, 'stroke-width': 7, 'stroke-linecap': 'round' }));
CL.gr = [[200, 300], [312, 250], [430, 312], [548, 250], [620, 290]].map(([x, y]) => { const g = mk(CL.ch, 'g', {}); for (let k = 0; k < 5; k++) mk(g, 'rect', { x: x - 34, y: y - 40 + k * 16, width: 68, height: 13, rx: 6, fill: '#4FA06A', stroke: '#1F5E36', 'stroke-width': 2 }); return g; });
CL.L = [lab(cl, 560, 156, 560, 84, 'Outer membrane', 'start', null, 22), lab(cl, 240, 169, 240, 84, 'Inner membrane', 'end', null, 22), lab(cl, 330, 360, 330, 444, 'Stroma', 'middle', null, 22),
  lab(cl, 166, 300, 150, 470, 'Granum', 'end', null, 22), lab(cl, 600, 254, 620, 470, 'Thylakoid', 'start', null, 22), lab(cl, 490, 282, 500, 444, 'Stroma lamellae', 'middle', null, 22)];
const cr = sv('crS'), CR = {};
// state 1: the three kinds
CR.k = mk(cr, 'g', {}); CR.kr = [['Chloroplast', 'GREEN · CHLOROPHYLL', '#8CC48F', '#2F7A49'], ['Chromoplast', 'YELLOW, ORANGE, RED', CHR, '#A8641E'], ['Leucoplast', 'NO COLOUR · STORES FOOD', LEU, LEUE]].map(([n, s, f, e], i) => {
  const g = mk(CR.k, 'g', {}), y = 96 + i * 150; const bg = mk(g, 'rect', { x: 36, y, width: 712, height: 130, rx: 14, fill: C.soft });
  const w = mk(g, 'g', { transform: `translate(130 ${y + 65})` }); mk(w, 'ellipse', { cx: 0, cy: 0, rx: 62, ry: 36, fill: f, stroke: e, 'stroke-width': 4 });
  txt(g, 230, y + 60, n, { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ink }); txt(g, 230, y + 96, s, { 'font-size': 17, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); return { g, bg }; });
// state 2: counts
CR.n = mk(cr, 'g', {}); { const g = CR.n; mk(g, 'ellipse', { cx: 200, cy: 270, rx: 120, ry: 150, fill: '#F1F6EC', stroke: '#2F7A49', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M110,230 C110,380 290,380 290,230 C290,300 250,340 200,340 C150,340 110,300 110,230 Z', fill: '#4FA06A', stroke: '#1F5E36', 'stroke-width': 3 });
  mk(g, 'path', { d: 'M160,124 C150,90 140,70 120,56 M240,124 C250,90 260,70 280,56', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'rect', { x: 440, y: 120, width: 270, height: 300, rx: 30, fill: '#F1F6EC', stroke: '#2F7A49', 'stroke-width': 4 });
  for (let k = 0; k < 30; k++) { const a = k * 2.399, rr = 16 + 9 * Math.sqrt(k) * 1.9; const x = 575 + rr * Math.cos(a) * 0.95, y = 270 + rr * Math.sin(a) * 1.25; if (Math.abs(x - 575) < 120 && Math.abs(y - 270) < 135) mk(g, 'ellipse', { cx: x.toFixed(1), cy: y.toFixed(1), rx: 13, ry: 8, fill: '#4FA06A', stroke: '#1F5E36', 'stroke-width': 1.5 }); }
  txt(g, 200, 470, 'CHLAMYDOMONAS', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); txt(g, 575, 470, 'MESOPHYLL CELL', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 });
  CR.n1 = txt(g, 200, 524, '1 per cell', { 'text-anchor': 'middle', 'font-size': 30, fill: GRA, 'font-weight': 600 }); CR.n2 = txt(g, 575, 524, '20-40 per cell', { 'text-anchor': 'middle', 'font-size': 30, fill: GRA, 'font-weight': 600 }); }
// state 3: tomato cells ripening
CR.t = mk(cr, 'g', {}); CR.tp = []; { const g = CR.t; mk(g, 'rect', { x: 160, y: 110, width: 464, height: 330, rx: 50, fill: '#FBF3EC', stroke: '#C9B36A', 'stroke-width': 5 }); mk(g, 'circle', { cx: 300, cy: 300, r: 46, fill: NUC });
  [[250, 180], [400, 170], [520, 220], [540, 340], [420, 390], [300, 400], [220, 260], [420, 280]].forEach(([x, y]) => CR.tp.push(mk(g, 'ellipse', { cx: x, cy: y, rx: 30, ry: 17, fill: '#4FA06A', stroke: BR, 'stroke-width': 2 })));
  CR.tL = [lab(g, 400, 153, 470, 70, 'Chloroplast', 'start', null, 22), lab(g, 400, 153, 470, 70, 'Chromoplast', 'start', null, 22)]; CR.tT = txt(g, 392, 500, 'RIPENING · GREEN GIVES WAY TO RED', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, fill: TOM, 'font-weight': 600 }); }
// state 4: leucoplasts
CR.l = mk(cr, 'g', {}); CR.lr = [['Amyloplast', 'STARCH · POTATO'], ['Elaioplast', 'OILS AND FATS'], ['Aleuroplast', 'PROTEINS']].map(([n, s], i) => {
  const g = mk(CR.l, 'g', {}), y = 96 + i * 150; mk(g, 'rect', { x: 36, y, width: 712, height: 130, rx: 14, fill: C.soft });
  mk(g, 'ellipse', { cx: 130, cy: y + 65, rx: 62, ry: 40, fill: LEU, stroke: LEUE, 'stroke-width': 4 });
  if (i === 0) [[110, -10, 16], [146, 6, 14], [120, 18, 10]].forEach(([x, dy, r]) => { mk(g, 'circle', { cx: x, cy: y + 65 + dy, r, fill: '#fff', stroke: GOLD, 'stroke-width': 3 }); });
  if (i === 1) [[112, -6, 11], [140, 10, 13], [150, -14, 8]].forEach(([x, dy, r]) => mk(g, 'circle', { cx: x, cy: y + 65 + dy, r, fill: '#F2D46B', stroke: '#B8962A', 'stroke-width': 2 }));
  if (i === 2) [[110, -8], [136, 8], [150, -14]].forEach(([x, dy]) => mk(g, 'rect', { x: x - 9, y: y + 56 + dy, width: 18, height: 18, rx: 3, fill: '#D0632F', stroke: BR, 'stroke-width': 2 }));
  txt(g, 230, y + 60, n, { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ink }); txt(g, 230, y + 96, s, { 'font-size': 17, 'letter-spacing': 1.4, fill: C.mute, 'font-weight': 600 }); return g; });

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['MITOCHONDRION', 'CHLOROPLAST'], [
  ['', 'Where', 'Almost all eukaryotic cells', 'Plant cells and euglenoids', wt('V1', 'Mitochondria'), wt('V1', 'Chloroplasts'), s => { const w = mk(s, 'g', {}); sausage(w, 65, 50, 46, 22, 0); }, s => { chlo(s, 65, 50, 48, 28); }],
  ['', 'Inside', 'Inner membrane folds into cristae', 'Stroma holds the thylakoids', wt('V2', 'mitochondrion'), wt('V2', 'chloroplast'), s => { mk(s, 'path', { d: 'M10,30 L30,30 L30,80 L50,80 L50,30 L80,30 L80,80 L100,80 L100,30 L120,30', stroke: MITO, 'stroke-width': 6, fill: 'none' }); },
    s => { for (let k = 0; k < 4; k++) mk(s, 'rect', { x: 35, y: 22 + k * 16, width: 60, height: 12, rx: 6, fill: '#4FA06A', stroke: '#1F5E36', 'stroke-width': 2 }); }],
  ['', 'Job', 'Releases energy from food, as ATP', 'Traps light energy to make food', wt('V3', 'Mitochondria'), wt('V3', 'Chloroplasts'), s => { mk(s, 'rect', { x: 31, y: 30, width: 68, height: 40, rx: 20, fill: MITO, stroke: BR, 'stroke-width': 2.5 }); txt(s, 65, 57, 'ATP', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700 }); },
    s => { mk(s, 'circle', { cx: 65, cy: 50, r: 18, fill: '#F2C94C', stroke: BR, 'stroke-width': 2.5 }); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(s, 'path', { d: `M${65 + 26 * Math.cos(a)},${50 + 26 * Math.sin(a)} L${65 + 38 * Math.cos(a)},${50 + 38 * Math.sin(a)}`, stroke: '#D9A23B', 'stroke-width': 4, 'stroke-linecap': 'round' }); } }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A potato stores lots of starch, deep under the soil, in the dark. Which plastid fills its cells?', opts: ['Chloroplast', 'Chromoplast', 'Amyloplast'], right: 2, why: 'Amyloplast. A colourless leucoplast that stores starch.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['MITOCHONDRION · RELEASES ENERGY', 'background:#FBE3CC;color:#9A4F17'], ['CHLOROPLAST · TRAPS LIGHT', 'background:var(--ac2);color:#1F6B3F']], [
  ['mito', 'Cristae', '<b>Folds</b> of the inner membrane', 0, 0, wt('W2', 'Mitochondrion')], ['chl', 'Thylakoids', '<b>Flat sacs</b> in the stroma', 1, 0, wt('W3', 'Chloroplast')],
  ['mito', 'Matrix', 'Holds a <b>circular DNA</b>', 0, 1, wt('W4', 'Mitochondrion')], ['chl', 'Grana', '<b>Stacks</b> of thylakoids', 1, 1, wt('W5', 'Chloroplast')],
  ['chl', 'Chlorophyll', 'The <b>green pigment</b>', 1, 2, wt('W6', 'Chloroplast')], ['bolt', 'ATP from respiration', '<b>Aerobic</b> respiration', 0, 2, wt('W7', 'Mitochondrion')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ const rib = (x, y, s, l, c2) => { mk(TP, 'ellipse', { cx: x, cy: y - 18 * s, rx: 30 * s, ry: 18 * s, fill: BR }); mk(TP, 'ellipse', { cx: x, cy: y + 14 * s, rx: 40 * s, ry: 24 * s, fill: BR }); txt(TP, x, y + 76, l, { 'text-anchor': 'middle', 'font-size': 26, fill: c2, 'font-weight': 600 }); };
  rib(250, 130, 1.25, '80S', C.ink); rib(400, 136, 0.9, '70S', MITO); txt(TP, 325, 246, 'CYTOPLASM · MITO, CHLORO', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 }); }

const EP = {
  jobs: [['run', 'A running leg', 'NEEDS ENERGY', 'running'], ['leaf', 'A green leaf', 'MAKES FOOD', 'green'], ['tomato', 'A ripe tomato', 'TURNS RED', 'tomato']],
  learn: [['find', 'Inside', 'inside'], ['three', '3 plastids', 'three'], ['bolt', 'Energy', 'energy']],
  hookW: 'doctor', split: ['plastid', 'mitochondrion'], st: ['release', 'trap'],
  cam: [],
  hook: t => { M.vis(HL.g0, t, wt('H2', 'green') - 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis($('#hlt0'), t, wt('H2', 'Monday'), 1e9, POP); M.draw(HL.ar, t, wt('H2', 'Thursday') - 0.3, 0.4);
    M.vis(HL.g1, t, wt('H2', 'Thursday') - 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis($('#hlt1'), t, wt('H2', 'red'), 1e9, POP);
    attr(HL.b1, 'fill', mix('#7FB069', TOM, M.io((t - wt('H2', 'Thursday')) / 1.6))); M.vis($('#hlP'), t, wt('H3', 'green') - 0.1, 1e9, POP); },
  measure: () => { [['hlt0', 210, 430], ['hlt1', 574, 430]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DL.cell, t, wt('D2', 'organelle') - 0.3, 1e9, { ...POP, sc: 0.8 }); M.vis(DL.org, t, wt('D2', 'tiny'), 1e9, { ...POP, sc: 0.8 });
      labRun(DL.L[0], t, wt('D2', 'job')); labRun(DL.L[1], t, wt('D3', 'Mitochondria')); labRun(DL.L[2], t, wt('D3', 'plastids')); M.vis($('#dlP'), t, wt('D2', 'organ', 1), 1e9, POP);
      DL.mi.concat(DL.ch).forEach((m, i) => { const on = t > wt('D3', 'special') && t < T0('D4'); m.firstChild.setAttribute('stroke-width', on ? (2.5 + 2 * Math.abs(Math.sin(t * 5 + i))).toFixed(2) : 2.5); });
      M.vis($('#dr'), t, T0('D3') + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis(DR.bub, t, wt('D4', 'soap') - 0.2, 1e9, { ...POP, sc: 0.5 });
      M.vis(DR.cap, t, wt('D3', 'two') - 0.1, 1e9, { ...POP, sc: 0.7 }); M.vis(DR.in, t, wt('D4', 'inside') - 0.2, 1e9, { ...POP, sc: 0.6 });
      labRun(DR.L[0], t, wt('D3', 'membranes')); labRun(DR.L[1], t, wt('D4', 'inside')); M.vis($('#drP'), t, wt('D4', 'double') - 0.1, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      attr(ZG.cr, 'stroke-width', t > wt('Z4', 'folds') && t < T0('Z5') ? (8 + 3 * Math.abs(Math.sin(t * 4))).toFixed(2) : 8);
      attr(ZG.dna, 'transform', `rotate(${((t - tZ[3]) * 6).toFixed(2)} 528 263)`); ZG.rib.forEach((r, i) => attr(r, 'transform', `translate(0 ${(3 * Math.sin(t * 2 + i)).toFixed(2)})`));
      avZ(t, wt('Z4', 'surface') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]); M.vis(PP.m, t, T0('P1') + 0.3, 1e9, { ...POP, sc: 0.8 });
      const brk = M.io((t - tPs[2] - 0.2) / 1.2);
      PP.sug.forEach((g, i) => { const a = M.io((t - tPs[0] - 0.1 - i * 0.35) / 1.1), x = 80 + 260 * a, y = 230 + i * 60; attr(g, 'transform', `translate(${x.toFixed(1)} ${y}) scale(${(1 - brk).toFixed(3)})`); g.style.opacity = t < tPs[0] - 0.1 || brk >= 1 ? 0 : 1; });
      M.vis(PP.sL, t, tPs[0], tPs[2] + 0.4, POP); M.vis(PP.oL, t, tPs[1], tPs[2] + 0.4, POP);
      PP.oxy.forEach((g, i) => { const a = M.io((t - tPs[1] - 0.1 - i * 0.3) / 1.1), x = 440 + i * 80, y = 150 + 110 * a; attr(g, 'transform', `translate(${x} ${y.toFixed(1)})`); g.style.opacity = t < tPs[1] - 0.05 ? 0 : (1 - M.clamp((t - tPs[3]) / 0.4)).toFixed(2); });
      PP.bits.forEach((b, i) => { const k = i % 5, ph = ((t - tPs[2]) * 0.5 + i * 0.11) % 1; attr(b, 'cx', (346 + k * 84).toFixed(1)); attr(b, 'cy', (300 - 100 * ph).toFixed(1)); b.style.opacity = t < tPs[2] + 0.4 || t > tPs[3] + 0.6 ? 0 : 1; });
      PP.cr.forEach((c, i) => attr(c, 'stroke-width', st === 2 ? (5 + 3 * Math.abs(Math.sin(t * 5 + i))).toFixed(2) : 5));
      PP.atp.forEach((g, i) => { const born = tPs[3] + 0.2 + i * 0.3, sx = 560 + (i % 3) * 70, sy = 230 + Math.floor(i / 3) * 90 + (i % 3) * 20;
        let x = sx, y = sy; if (t > tPs[4]) { const ph = ((t - tPs[4] + i * 0.35) % 1.75) / 1.75; x = 700 + 270 * ph; y = 200 + i * 45; g.style.opacity = (Math.min(1, ph * 6) * (1 - M.clamp((ph - 0.85) / 0.15))).toFixed(2); } else g.style.opacity = M.clamp((t - born) / 0.2).toFixed(2);
        attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
      M.vis(PP.cell, t, tPs[4] - 0.1, 1e9, { dy: 0, fade: 0.3 }); attr(PP.bolt, 'transform', `translate(0 ${(4 * Math.sin(t * 6)).toFixed(2)})`); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.ch, t, wt('C2', 'Chloroplasts') - 0.2, 1e9, { ...POP, sc: 0.7 });
      CL.gr.forEach((g, i) => M.vis(g, t, wt('C3', 'thylakoids') + i * 0.1, 1e9, { ...POP, sc: 0.4 })); M.vis(CL.lam, t, wt('C3', 'lamellae') - 0.1, 1e9, { dy: 0, fade: 0.3 });
      [wt('C2', 'trap') - 0.3, wt('C2', 'trap'), wt('C3', 'stroma'), wt('C3', 'granum'), wt('C3', 'thylakoids') + 0.3, wt('C3', 'lamellae')].forEach((tt, i) => labRun(CL.L[i], t, tt));
      CL.gr.forEach((g, i) => attr(g, 'transform', t > wt('C3', 'granum') - 0.1 && t < wt('C3', 'lamellae') ? `translate(0 ${(-3 * Math.abs(Math.sin(t * 4 + i))).toFixed(2)})` : ''));
      M.vis($('#cr'), t, T0('C1') + 0.3, out, { dx: 60, dy: 0, ...o });
      $('#crL').textContent = t < T0('C4') - 0.1 ? 'THREE KINDS OF PLASTID' : t < T0('C5') - 0.1 ? 'HOW MANY CHLOROPLASTS?' : t < T0('C6') - 0.1 ? 'TOMATO CELL · RIPENING' : 'LEUCOPLASTS · STORE FOOD';
      M.vis(CR.k, t, T0('C1') + 0.4, T0('C4') - 0.15, { dy: 20, outDur: 0.25 }); CR.kr.forEach((r, i) => { M.vis(r.g, t, T0('C1') + 0.5 + i * 0.25, 1e9, { dy: 14 }); attr(r.bg, 'fill', i === 0 && t > T0('C2') ? C.ac3 : C.soft); });
      M.vis(CR.n, t, T0('C4') + 0.05, T0('C5') - 0.15, { dy: 20, outDur: 0.25 }); M.vis(CR.n1, t, wt('C4', 'one'), 1e9, POP); M.vis(CR.n2, t, wt('C4', 'twenty'), 1e9, POP);
      M.vis(CR.t, t, T0('C5') + 0.05, T0('C6') - 0.15, { dy: 20, outDur: 0.25 }); const rp = M.io((t - wt('C5', 'ripens')) / 2.2);
      CR.tp.forEach((p, i) => attr(p, 'fill', mix('#4FA06A', i % 2 ? TOM : CHR, M.clamp(rp * 1.6 - i * 0.08)))); labRun(CR.tL[0], t, T0('C5') + 0.3, wt('C5', 'ripens')); labRun(CR.tL[1], t, wt('C5', 'chromoplasts', 1)); M.vis(CR.tT, t, wt('C5', 'green') - 0.1, 1e9, POP);
      M.vis(CR.l, t, T0('C6') + 0.05, 1e9, { dy: 20 }); CR.lr.forEach((g, i) => M.vis(g, t, wt('C6', ['Amyloplasts', 'Elaioplasts', 'Aleuroplasts'][i]) - 0.1, 1e9, { dx: -20, dy: 0 })); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'leucoplasts') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'Ribosomes in mitochondria and chloroplasts are 80S', right: 'They are smaller: 70S. The cytoplasm has 80S', tRight: wt('X3', 'Inside') - 0.1,
    type: 'Labelled diagram (boards); statement questions on plastids (NEET)', tType: wt('E1', 'labelled'),
    xRun: t => M.vis(TP, t, wt('X3', 'smaller') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement is correct?', cols: 1, optW: 968, optH: 70, optFs: 25, optY: 140, qW: 840,
      opts: ['Cristae are infoldings of the outer membrane', 'Elaioplasts store proteins', 'The mitochondrial matrix has a single circular DNA molecule', 'Leucoplasts trap light energy for photosynthesis'], right: 2 },
    tOpts: wt('Q1', 'correct') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">C</b>'], ['Cristae: <b>inner</b> membrane'], ['Elaioplasts: <b>oils and fats</b>'], ['Leucoplasts: <b>colourless</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'inner'), wt('A2', 'Elaioplasts'), wt('A3', 'colourless')],
    recapT: 'Recap · mitochondria and plastids',
    recap: ['<b>Both</b>: double membrane · own circular DNA · <b>70S</b> ribosomes (cytoplasm: 80S)', '<b>Mitochondrion</b>: cristae fold inward, more surface · matrix · fission · power house',
      '<b>Aerobic respiration</b>: food + oxygen, energy packed as <b>ATP</b>', '<b>Chloroplast</b>: stroma · thylakoids · grana · stroma lamellae · traps light',
      '<b>Chromoplast</b>: carotenoids, yellow to red · <b>leucoplast</b>: amylo (starch), elaio (oils), aleuro (proteins)'],
    yq: ['What are cristae, and why are they folded?', 'Name the three kinds of plastid.', 'Which leucoplast stores starch?'],
    nextL: 'NEXT · EP 66', nextT: 'How do tiny hairs sweep your windpipe? Cilia, Flagella and Centrosome' },
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
