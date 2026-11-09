// PUC Biology Ep 49: Meristematic Tissues (Living diagram, leaf green)
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


/* ===== Ep 49: meristematic tissues ===== */
Object.assign(M.IC, {
  grass: ['M6 21c0-6 1-10 3-14', 'M12 21c0-7 0-11 0-16', 'M18 21c0-6-1-10-3-14', 'M3 21h18'],
  root: ['M12 3v12', 'M12 15c0 3-1 5-2 6h4c-1-1-2-3-2-6Z', 'M12 8c-2 1-4 3-5 5M12 10c2 1 4 3 5 5'],
  branch: ['M6 21V9', 'M6 13c3-1 6-3 9-6', 'M15 7c1-2 3-3 5-3 0 2-1 4-3 5-1 0-2-1-2-2Z'],
  find: [ci(10, 10, 6), 'M14.5 14.5L20 20'],
  three: ['M5 7h4M7 7v10', 'M12 7h4M14 7v10', 'M19 7v10'],
  build: ['M4 20h16', 'M6 20v-6h4v6', 'M10 20v-10h4v10', 'M14 20v-14h4v14'],
  cell: ['M4 6h16v12H4Z', ci(12, 12, 3)],
});
const sv = id => $('#' + id);
const MER = '#B9E0A8', WALL = '#4E7A34', CAP = '#C9A06A', CAMB = '#E39B4B', SOIL = '#E9DCC3', CYT = '#DCEFD4', OLD = '#EEF3E6';
const rad = a => a * Math.PI / 180, P2 = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
const cellGrid = (g, x0, y0, cols, rows, w, h, fill, nr = 0) => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * w + (r % 2 ? w / 2 : 0) * 0, y = y0 + r * h; mk(g, 'rect', { x, y, width: w, height: h, fill, stroke: WALL, 'stroke-width': 1.6 }); if (nr) mk(g, 'circle', { cx: x + w / 2, cy: y + h / 2, r: nr, fill: NUC }); } };

/* ---------- H: the lawn ---------- */
const hl = sv('hlS'), HL = {};
mk(hl, 'rect', { x: 36, y: 360, width: 712, height: 60, rx: 8, fill: SOIL });
HL.mon = mk(hl, 'g', {}); HL.fri = mk(hl, 'g', {}); HL.bl = [];
for (let k = 0; k < 9; k++) { const x = 70 + k * 32; mk(HL.mon, 'path', { d: `M${x},362 L${x + 6},300 L${x + 12},362 Z`, fill: '#7FB069', stroke: WALL, 'stroke-width': 2 }); mk(HL.mon, 'path', { d: `M${x + 1},300 L${x + 11},300`, stroke: C.red, 'stroke-width': 2.5 }); }
for (let k = 0; k < 9; k++) { const x = 430 + k * 32; HL.bl.push(mk(HL.fri, 'path', { d: '', fill: '#7FB069', stroke: WALL, 'stroke-width': 2 })); HL.bl[k].x = x; }
HL.base = mk(HL.fri, 'path', { d: 'M430,346 L716,346', stroke: C.ac, 'stroke-width': 6, 'stroke-dasharray': '4 6', 'stroke-linecap': 'round' });
HL.ar = mk(hl, 'path', { d: 'M372,230 L402,230 M392,220 L402,230 L392,240', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });

/* ---------- D: tissue + growth spots ---------- */
const dl = sv('dlS'), DL = {};
DL.c = mk(dl, 'g', {}); DL.cells = [];
[[392, 260], [312, 214], [472, 214], [312, 306], [472, 306], [392, 168], [392, 352]].forEach(([x, y], i) => { const g = mk(DL.c, 'g', {}); const d = []; for (let k = 0; k < 6; k++) { const [px, py] = P2(x, y, 52, k * 60 + 30); d.push(`${px.toFixed(1)},${py.toFixed(1)}`); }
  mk(g, 'polygon', { points: d.join(' '), fill: CYT, stroke: WALL, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: 13, fill: NUC }); DL.cells.push(g); });
DL.L = [lab(dl, 446, 168, 560, 120, 'Same origin'), lab(dl, 446, 352, 560, 400, 'Same job')];
const dr = sv('drS'), DR = {};
DR.p = mk(dr, 'g', {}); { const g = DR.p; mk(g, 'rect', { x: 36, y: 300, width: 712, height: 180, rx: 8, fill: SOIL }); mk(g, 'path', { d: 'M36,300 L748,300', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M392,300 L392,110', stroke: WALL, 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M392,200 C350,180 330,150 330,130 C360,130 384,160 392,200 Z M392,170 C430,150 452,124 452,104 C420,104 398,132 392,170 Z', fill: LEAF, stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M392,300 L392,450 M392,340 C360,360 340,390 334,430 M392,370 C420,390 440,420 446,452', stroke: '#B79A6A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }
DR.sp = [[392, 106], [392, 452], [334, 432], [446, 454], [452, 104]].map(([x, y]) => mk(dr, 'circle', { cx: x, cy: y, r: 16, fill: 'none', stroke: C.ac, 'stroke-width': 4 }));
DR.L = [lab(dr, 404, 100, 540, 80, 'Growth spot'), lab(dr, 404, 452, 540, 420, 'Growth spot')];

/* ---------- Z: zoom ladder PLANT -> SHOOT TIP -> ROOT TIP -> CELLS ---------- */
const ZN = ['PLANT', 'SHOOT TIP', 'ROOT TIP', 'CELLS'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, wt('Z3', 'shoot') - 0.3, T0('Z4'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 4', 'A plant', 'It grows longer at two tips.', 'Shoot tip · root tip'],
  ['RUNG 2 OF 4', 'Shoot tip', 'The shoot apical meristem sits at the very top.', 'Apical = at the apex, the tip'],
  ['RUNG 3 OF 4', 'Root tip', 'The root apical meristem sits just behind the root cap.', 'The cap protects it'],
  ['RUNG 4 OF 4', 'Meristem cells', 'Small, thin walls, dense cytoplasm, a large nucleus.', 'Main job: divide']]);
const zs = sv('zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'rect', { x: 0, y: 300, width: 1056, height: 226, fill: SOIL }); mk(g, 'path', { d: 'M0,300 L1056,300', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M528,300 L528,70', stroke: WALL, 'stroke-width': 10, 'stroke-linecap': 'round' });
  [[-1, 230], [1, 170], [-1, 120]].forEach(([s, y]) => mk(g, 'path', { d: `M528,${y} C${528 + s * 50},${y - 30} ${528 + s * 100},${y - 30} ${528 + s * 130},${y - 10} C${528 + s * 100},${y + 14} ${528 + s * 50},${y + 14} 528,${y} Z`, fill: LEAF, stroke: BR, 'stroke-width': 3 }));
  mk(g, 'path', { d: 'M528,300 L528,470 M528,350 C490,370 470,410 462,450 M528,390 C566,410 586,440 592,470', stroke: '#B79A6A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'ellipse', { cx: 528, cy: 66, rx: 10, ry: 14, fill: MER, stroke: WALL, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: 528, cy: 470, rx: 7, ry: 10, fill: CAP, stroke: BR, 'stroke-width': 2 });
  LB[0] = [lab(g, 540, 66, 700, 60, 'Shoot tip'), lab(g, 536, 470, 700, 440, 'Root tip')]; }
{ const g = ZG[1]; mk(g, 'path', { d: 'M380,526 L380,300 C380,180 450,110 528,110 C606,110 676,180 676,300 L676,526 Z', fill: CYT, stroke: WALL, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M440,300 C440,210 480,150 528,150 C576,150 616,210 616,300 Z', fill: MER, stroke: WALL, 'stroke-width': 3 }); cellGrid(g, 470, 196, 6, 3, 18, 18, MER, 0);
  [[-1], [1]].forEach(([s]) => { mk(g, 'path', { d: `M${528 + s * 92},250 C${528 + s * 120},226 ${528 + s * 132},250 ${528 + s * 120},290 C${528 + s * 110},300 ${528 + s * 96},290 ${528 + s * 92},250 Z`, fill: LEAF, stroke: BR, 'stroke-width': 3 });
    mk(g, 'path', { d: `M${528 + s * 140},330 C${528 + s * 220},250 ${528 + s * 260},150 ${528 + s * 250},70 C${528 + s * 200},140 ${528 + s * 160},230 ${528 + s * 148},380 Z`, fill: LEAF, stroke: BR, 'stroke-width': 3 }); });
  LB[1] = [lab(g, 528, 170, 720, 110, 'Shoot apical meristem', 'start', null, 24), lab(g, 618, 262, 740, 330, 'Leaf primordia', 'start', null, 24)]; }
{ const g = ZG[2]; mk(g, 'path', { d: 'M440,0 L440,330 C440,400 480,440 528,446 C576,440 616,400 616,330 L616,0 Z', fill: OLD, stroke: WALL, 'stroke-width': 4 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) mk(g, 'rect', { x: 458 + c * 35, y: 30 + r * 70, width: 35, height: 70, fill: OLD, stroke: WALL, 'stroke-width': 1.5 });
  cellGrid(g, 458, 310, 4, 3, 35, 22, MER, 0);
  mk(g, 'path', { d: 'M430,370 C440,450 486,496 528,500 C570,496 616,450 626,370 C596,392 560,400 528,400 C496,400 460,392 430,370 Z', fill: CAP, stroke: BR, 'stroke-width': 3.5 });
  LB[2] = [lab(g, 600, 340, 760, 300, 'Root apical meristem', 'start', null, 24), lab(g, 560, 470, 760, 470, 'Root cap', 'start', null, 24)]; }
{ const g = ZG[3]; ZG.cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 290 + c * 128, y = 70 + r * 128; const cg = mk(g, 'g', {}); mk(cg, 'rect', { x, y, width: 128, height: 128, fill: CYT, stroke: WALL, 'stroke-width': 2.5 });
    for (let k = 0; k < 7; k++) mk(cg, 'circle', { cx: x + 18 + (k * 37) % 92, cy: y + 20 + (k * 53) % 90, r: 3, fill: '#A9CF9B' }); mk(cg, 'circle', { cx: x + 64, cy: y + 64, r: 30, fill: NUC }); ZG.cells.push(cg); }
  LB[3] = [lab(g, 418, 70, 250, 40, 'Thin wall', 'end', null, 24), lab(g, 314, 230, 260, 320, 'Dense cytoplasm', 'end', null, 24), lab(g, 674, 326, 830, 400, 'Large nucleus', 'start', null, 24)]; }
const FOC = [[528, 80, 46], [528, 220, 70], [528, 340, 46], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'shoot'), wt('Z2', 'root')], [wt('Z3', 'meristem'), wt('Z3', 'primordia')], [wt('Z4', 'meristem'), wt('Z4', 'cap')], [wt('Z5', 'thin'), wt('Z5', 'dense'), wt('Z5', 'nucleus')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Tiny cells, busy dividing!' });

/* ---------- P: what a meristem does ---------- */
const PN = ['GROW', 'DIVIDE', 'PILE UP', 'SPECIALISE', 'PERMANENT'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE CELL', 'A meristem cell', 'Watch it, step by step.', ''], ['STEP 1 OF 5', 'Grow', 'The cell grows a little and copies its nucleus.', ''],
  ['STEP 2 OF 5', 'Divide', 'It splits into two new cells.', 'A new wall forms in the middle'], ['STEP 3 OF 5', 'Pile up', 'Again and again. Cells pile up, the tip moves on.', ''],
  ['STEP 4 OF 5', 'Specialise', 'Cells left behind grow bigger and change shape.', 'One job each, like carrying water'], ['STEP 5 OF 5', 'Permanent', 'They stop dividing: permanent tissues.', '']]);
const ps = sv('pS'), PP = {};
PP.one = mk(ps, 'g', {}); PP.cw = mk(PP.one, 'rect', { x: 388, y: 170, width: 280, height: 220, rx: 8, fill: CYT, stroke: WALL, 'stroke-width': 4 });
PP.n1 = mk(PP.one, 'circle', { cx: 528, cy: 280, r: 46, fill: NUC }); PP.n2 = mk(PP.one, 'circle', { cx: 528, cy: 280, r: 46, fill: NUC });
PP.wall = mk(PP.one, 'path', { d: 'M528,170 L528,390', stroke: WALL, 'stroke-width': 5 });
PP.row = mk(ps, 'g', {}); PP.cells = [];
for (let i = 0; i < 8; i++) { const g = mk(PP.row, 'g', {}); const r = mk(g, 'rect', { x: 80 + i * 96, y: 240, width: 96, height: 100, fill: MER, stroke: WALL, 'stroke-width': 3 }); const n = mk(g, 'circle', { cx: 128 + i * 96, cy: 290, r: 18, fill: NUC }); PP.cells.push({ g, r, n }); }
PP.cap = mk(PP.row, 'path', { d: '', fill: CAP, stroke: BR, 'stroke-width': 3.5 });
PP.tipL = txt(PP.row, 0, 210, 'TIP', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });
PP.br = mk(ps, 'path', { d: 'M80,410 L80,430 L464,430 L464,410', stroke: C.ink, 'stroke-width': 3, fill: 'none' });
PP.brL = txt(ps, 272, 466, 'PERMANENT CELLS', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, fill: C.ink, 'font-weight': 600 });
PP.mL = txt(ps, 0, 466, 'STILL DIVIDING', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });

/* ---------- C: three kinds ---------- */
const cl = sv('clS'), CL = {};
{ mk(cl, 'rect', { x: 36, y: 380, width: 712, height: 160, rx: 8, fill: SOIL }); mk(cl, 'path', { d: 'M36,380 L748,380', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(cl, 'path', { d: 'M300,380 L300,90', stroke: '#8C6D4F', 'stroke-width': 22, 'stroke-linecap': 'round' }); mk(cl, 'path', { d: 'M300,230 C350,200 400,180 450,170', stroke: '#8C6D4F', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  [[300, 120, -1], [300, 160, 1], [450, 170, 1], [300, 210, -1]].forEach(([x, y, s]) => mk(cl, 'path', { d: `M${x},${y} C${x + s * 30},${y - 34} ${x + s * 80},${y - 40} ${x + s * 110},${y - 24} C${x + s * 80},${y + 6} ${x + s * 30},${y + 8} ${x},${y} Z`, fill: LEAF, stroke: BR, 'stroke-width': 2.5 }));
  mk(cl, 'path', { d: 'M300,380 L300,510 M300,420 C270,440 250,470 244,510 M300,440 C330,460 350,490 354,516', stroke: '#B79A6A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); }
CL.ap = [[300, 84], [300, 514], [458, 166]].map(([x, y]) => mk(cl, 'circle', { cx: x, cy: y, r: 13, fill: MER, stroke: WALL, 'stroke-width': 3 }));
CL.lat = mk(cl, 'g', {}); mk(CL.lat, 'rect', { x: 286, y: 270, width: 28, height: 100, rx: 6, fill: 'none', stroke: CAMB, 'stroke-width': 5 }); mk(CL.lat, 'path', { d: 'M291,280 L291,360 M309,280 L309,360', stroke: CAMB, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
CL.bud = mk(cl, 'path', { d: 'M310,198 C318,184 330,182 334,190 C332,200 320,206 310,198 Z', fill: '#9FD09A', stroke: BR, 'stroke-width': 2.5 });
CL.L = [lab(cl, 300, 84, 470, 70, 'Apical'), lab(cl, 300, 514, 470, 500, 'Apical'), lab(cl, 314, 330, 470, 330, 'Lateral'), lab(cl, 330, 192, 470, 250, 'Axillary bud')];
const cr = sv('crS'), CR = {};
CR.gr = mk(cr, 'g', {}); { const g = CR.gr; mk(g, 'rect', { x: 36, y: 440, width: 712, height: 100, rx: 8, fill: SOIL }); CR.bl = [];
  for (let k = 0; k < 5; k++) { const x = 180 + k * 100; mk(g, 'rect', { x: x - 10, y: 360, width: 20, height: 80, fill: '#9FCB7A', stroke: WALL, 'stroke-width': 2 }); CR.bl.push(mk(g, 'path', { d: '', fill: '#7FB069', stroke: WALL, 'stroke-width': 2 })); CR.bl[k].x = x; }
  CR.band = mk(g, 'path', { d: 'M150,360 L640,360', stroke: C.ac, 'stroke-width': 10, 'stroke-linecap': 'round' }); CR.cut = mk(g, 'path', { d: 'M130,250 L660,250', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  txt(g, 668, 256, 'EATEN', { 'font-size': 16, 'letter-spacing': 1.2, fill: C.red, 'font-weight': 600 }); CR.gl = lab(g, 380, 360, 440, 480, 'Intercalary meristem'); }
CR.cs = mk(cr, 'g', {}); { const g = CR.cs; mk(g, 'circle', { cx: 300, cy: 300, r: 190, fill: '#E6D3B1', stroke: BR, 'stroke-width': 4 }); mk(g, 'circle', { cx: 300, cy: 300, r: 176, fill: 'none', stroke: '#B07A3A', 'stroke-width': 6 });
  mk(g, 'circle', { cx: 300, cy: 300, r: 120, fill: '#F2E6C9', stroke: 'none' }); CR.ring = mk(g, 'circle', { cx: 300, cy: 300, r: 120, fill: 'none', stroke: CAMB, 'stroke-width': 10 });
  mk(g, 'circle', { cx: 300, cy: 300, r: 60, fill: '#FBF5E6', stroke: '#C9B48A', 'stroke-width': 2 });
  CR.cL = [lab(g, 412, 260, 520, 170, 'Lateral meristem'), lab(g, 470, 330, 520, 420, 'Older stem, cut')]; }

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['PRIMARY MERISTEMS', 'SECONDARY MERISTEMS'], [
  ['', 'When', 'Early in the life of a plant', 'Later, in older parts', wt('V1', 'Apical'), wt('V1', 'Lateral'), s => { mk(s, 'path', { d: 'M65,90 L65,40', stroke: WALL, 'stroke-width': 6 }); mk(s, 'path', { d: 'M65,50 C50,40 44,30 46,20 C58,22 64,34 65,50 Z M65,44 C80,34 86,24 84,14 C72,16 66,28 65,44 Z', fill: LEAF, stroke: BR, 'stroke-width': 2 }); },
    s => { mk(s, 'rect', { x: 45, y: 10, width: 40, height: 84, rx: 6, fill: '#8C6D4F', stroke: BR, 'stroke-width': 2 }); mk(s, 'path', { d: 'M50,30 C60,34 70,34 80,30 M50,60 C60,64 70,64 80,60', stroke: '#5E4632', 'stroke-width': 2, fill: 'none' }); }],
  ['', 'Builds', 'The primary plant body: longer', 'Secondary tissues: thicker', wt('V2', 'Primary'), wt('V2', 'Secondary'), s => { mk(s, 'path', { d: 'M65,92 L65,10 M52,24 L65,10 L78,24', stroke: C.ac, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); },
    s => { mk(s, 'path', { d: 'M20,50 L110,50 M34,38 L20,50 L34,62 M96,38 L110,50 L96,62', stroke: CAMB, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }],
  ['', 'Examples', 'Apical, intercalary (grass)', 'Vascular and cork cambium', wt('V3', 'Root'), wt('V3', 'fascicular'), s => { mk(s, 'ellipse', { cx: 65, cy: 50, rx: 18, ry: 26, fill: MER, stroke: WALL, 'stroke-width': 3 }); },
    s => { mk(s, 'circle', { cx: 65, cy: 50, r: 40, fill: '#E6D3B1', stroke: BR, 'stroke-width': 2 }); mk(s, 'circle', { cx: 65, cy: 50, r: 26, fill: 'none', stroke: CAMB, 'stroke-width': 6 }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A cow eats the top of the grass, yet the blades grow back from below. Which meristem did that?', opts: ['Apical', 'Intercalary', 'Lateral'], right: 1, why: 'Intercalary. It sits between mature tissues, lower down, so it survives when the top is eaten.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['PRIMARY · APPEAR EARLY', 'background:var(--ac2);color:#1F6B3F'], ['SECONDARY · LATERAL, LATER', 'background:var(--ink);color:#fff']], [
  ['root', 'Root apical meristem', '<b>Apical</b> · at the root tip', 0, 0, wt('W2', 'Primary')], ['branch', 'Cork cambium', '<b>Lateral</b> · old tree trunk', 1, 0, wt('W3', 'Secondary')],
  ['grass', 'Shoot apical meristem', '<b>Apical</b> · at the shoot tip', 0, 1, wt('W4', 'Primary')], ['branch', 'Interfascicular cambium', '<b>Lateral</b>', 1, 1, wt('W5', 'Secondary')],
  ['grass', 'Intercalary meristem', '<b>Between mature tissues</b> · grass', 0, 2, wt('W6', 'Primary')], ['branch', 'Fascicular vascular cambium', '<b>Lateral</b>', 1, 2, wt('W7', 'Secondary')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ for (let k = 0; k < 4; k++) { const x = 250 + k * 50; mk(TP, 'rect', { x: x - 8, y: 150, width: 16, height: 50, fill: '#9FCB7A', stroke: WALL, 'stroke-width': 2 }); mk(TP, 'path', { d: `M${x - 10},150 L${x},${70 + k * 6} L${x + 10},150 Z`, fill: '#7FB069', stroke: WALL, 'stroke-width': 2 }); }
  mk(TP, 'path', { d: 'M230,150 L420,150', stroke: C.ac, 'stroke-width': 8, 'stroke-linecap': 'round' }); txt(TP, 325, 244, 'INTERCALARY = PRIMARY', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['grass', 'A mowed lawn', 'CUT SHORT', 'lawn'], ['root', 'A root tip', 'PUSHING DOWN', 'root'], ['branch', 'A new branch', 'ON A TREE', 'branch']],
  learn: [['find', 'Find', 'find'], ['three', '3 kinds', 'three'], ['build', 'Builds', 'builds']],
  hookW: 'doctor', split: ['dividing', 'meristem'], st: ['Tips', 'Sides'],
  cam: [[tPs[2] - 0.2, 1.04, 960, 600], [T0('C1') - 0.7, 1, 960, 540]],
  hook: t => { M.vis(HL.mon, t, wt('H2', 'cut') - 0.2, 1e9, { dy: 20 }); M.vis($('#hlt0'), t, wt('H2', 'Monday'), 1e9, POP); M.draw(HL.ar, t, wt('H2', 'Friday') - 0.3, 0.4);
    M.vis(HL.fri, t, wt('H2', 'Friday') - 0.1, 1e9, { dy: 20 }); M.vis($('#hlt1'), t, wt('H2', 'tall'), 1e9, POP);
    const gr = M.io((t - wt('H2', 'Friday')) / 1.6); HL.bl.forEach((b, k) => { const h = 62 + gr * (110 + (k % 3) * 18); attr(b, 'd', `M${b.x},362 L${b.x + 6},${(362 - h).toFixed(1)} L${b.x + 12},362 Z`); });
    M.vis(HL.base, t, wt('H2', 'tips') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis($('#hlP'), t, wt('H2', 'tips'), 1e9, POP); },
  measure: () => { [['hlt0', 210, 448], ['hlt1', 574, 448]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); DL.cells.forEach((c, i) => M.vis(c, t, wt('D2', 'group') - 0.3 + i * 0.08, 1e9, { ...POP, sc: 0.4 }));
      labRun(DL.L[0], t, wt('D2', 'origin')); labRun(DL.L[1], t, wt('D2', 'job', 1)); M.vis($('#dlP'), t, wt('D2', 'job', 1) + 0.3, 1e9, POP);
      M.vis($('#dr'), t, T0('D3') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis(DR.p, t, T0('D3') + 0.1, 1e9, { dy: 20 });
      DR.sp.forEach((s, i) => { M.vis(s, t, wt('D3', 'spots') + i * 0.1, 1e9, { ...POP, sc: 0.3 }); attr(s, 'r', (16 + 4 * Math.sin(t * 5 + i)).toFixed(1)); });
      labRun(DR.L[0], t, wt('D3', 'meristems')); labRun(DR.L[1], t, wt('D3', 'meristems') + 0.3); M.vis($('#drP'), t, wt('D4', 'meristos') - 0.1, 1e9, POP);
      M.vis($('#ghD'), t, T0('D1') + 0.5, 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, tZ[3] + 0.3]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 263] });
      ZG.cells.forEach((c, i) => { const ph = (t - tZ[3]) * 1.3 + i * 0.37; attr(c, 'transform', `translate(0 ${(1.5 * Math.sin(ph)).toFixed(2)})`); });
      avZ(t, wt('Z5', 'divide') - 0.2, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      // steps 1-2: one cell grows, copies its nucleus, divides
      M.vis(PP.one, t, T0('P1') + 0.4, tPs[2] - 0.05, { ...POP, sc: 0.7, outDur: 0.25 });
      const g1 = M.io((t - tPs[0] - 0.3) / 1.4), cp = M.io((t - wt('P2', 'copies')) / 0.9), dv = M.io((t - wt('P3', 'divides')) / 0.9);
      const W = 280 + 60 * g1; attr(PP.cw, 'x', (528 - W / 2).toFixed(1)); attr(PP.cw, 'width', W.toFixed(1));
      attr(PP.n1, 'cx', (528 - 85 * dv - 18 * cp * (1 - dv)).toFixed(1)); attr(PP.n2, 'cx', (528 + 85 * dv + 18 * cp * (1 - dv)).toFixed(1)); attr(PP.n1, 'r', (46 - 14 * cp).toFixed(1)); attr(PP.n2, 'r', (46 - 14 * cp).toFixed(1));
      M.draw(PP.wall, t, wt('P3', 'divides') + 0.3, 0.6);
      // steps 3-5: cells pile up behind a moving tip, older ones specialise, then stop dividing
      M.vis(PP.row, t, tPs[2] - 0.1, 1e9, { dy: 20 });
      const k = Math.min(8, 2 + Math.floor(Math.max(0, t - tPs[2]) * 1.6)), sp = M.io((t - tPs[3] - 0.3) / 1.4), pm = M.io((t - tPs[4] - 0.2) / 1);
      PP.cells.forEach((c, i) => { c.g.style.opacity = i < k ? 1 : 0; const old = i < 4, front = i >= k - 2;
        const hgt = old ? 100 + 40 * sp : 100; attr(c.r, 'y', (290 - hgt / 2).toFixed(1)); attr(c.r, 'height', hgt.toFixed(1));
        attr(c.r, 'fill', old ? mix(i < 2 ? MER : OLD, i < 2 ? WAT : '#F4E9C8', sp) : front ? MER : OLD); attr(c.n, 'r', (old ? 18 - 8 * pm : 18).toFixed(1)); c.n.style.opacity = old ? (1 - 0.6 * pm).toFixed(2) : 1;
        attr(c.r, 'stroke-width', front && st === 2 ? (3 + 2 * Math.abs(Math.sin(t * 5))).toFixed(2) : 3); });
      const cx = 80 + k * 96; attr(PP.cap, 'd', `M${cx},240 C${cx + 60},244 ${cx + 80},270 ${cx + 80},290 C${cx + 80},310 ${cx + 60},336 ${cx},340 Z`); attr(PP.tipL, 'x', cx + 40);
      M.draw(PP.br, t, wt('P6', 'permanent') - 0.2, 0.5); M.vis(PP.brL, t, wt('P6', 'permanent'), 1e9, POP); attr(PP.mL, 'x', 80 + (k - 1) * 96); M.vis(PP.mL, t, wt('P6', 'permanent') + 0.4, 1e9, POP); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o });
      CL.ap.forEach((a, i) => { M.vis(a, t, wt('C2', 'tips') + i * 0.15, 1e9, { ...POP, sc: 0.3 }); attr(a, 'stroke-width', t > T0('C2') && t < T1('C2') ? (3 + 2 * Math.abs(Math.sin(t * 5))).toFixed(2) : 3); });
      labRun(CL.L[0], t, wt('C2', 'roots') - 0.2); labRun(CL.L[1], t, wt('C2', 'shoots'));
      M.vis(CL.lat, t, wt('C4', 'sides') - 0.1, 1e9, { ...POP, sc: 0.6 }); labRun(CL.L[2], t, wt('C4', 'sides'));
      M.vis(CL.bud, t, wt('C5', 'axillary') - 0.1, 1e9, { ...POP, sc: 0.3 }); labRun(CL.L[3], t, wt('C5', 'axillary'));
      M.vis($('#cr'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o }); $('#crL').textContent = t < T0('C4') - 0.1 ? 'GRASS · AFTER GRAZING' : 'OLDER STEM · CUT ACROSS';
      M.vis(CR.gr, t, T0('C3') + 0.1, T0('C4') - 0.1, { dy: 20, outDur: 0.25 }); labRun(CR.gl, t, wt('C3', 'between'), T0('C4') - 0.3);
      const rg = ((t - wt('C3', 'regrow')) % 3.2) / 3.2, gOn = t > wt('C3', 'regrow'); CR.bl.forEach((b, k) => { const h = gOn ? 30 + 140 * M.io(rg / 0.8) : 110 + (k % 2) * 20; attr(b, 'd', `M${b.x - 10},360 L${b.x},${(360 - h).toFixed(1)} L${b.x + 10},360 Z`); });
      M.vis(CR.cut, t, wt('C3', 'grazing') - 0.1, 1e9, { dy: 0, fade: 0.3 });
      M.vis(CR.cs, t, T0('C4') + 0.1, 1e9, { ...POP, sc: 0.85 }); CR.cL.forEach((l, i) => labRun(l, t, wt('C4', i ? 'older' : 'cylinder') + (i ? 0 : 0.1)));
      attr(CR.ring, 'stroke-width', (10 + 3 * Math.sin(t * 4)).toFixed(2)); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'sits') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'The intercalary meristem is a secondary meristem', right: 'It appears early and builds the primary body: primary', tRight: wt('X3', 'Intercalary') - 0.1,
    type: 'Location and role of each meristem; naming an example (ISC papers)', tType: wt('E1', 'location'),
    xRun: t => M.vis(TP, t, wt('X3', 'early') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Read the assertion and the reason.<div class="sl"><b>A</b>Grasses regrow after grazing animals eat them</div><div class="sl"><b>R</b>Grasses have intercalary meristems</div>', cols: 1, optW: 968, optH: 66, optFs: 26, optY: 262, qW: 840,
      opts: ['Both true, and R explains A', 'Both true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'], right: 0 },
    tOpts: wt('Q1', 'assertion') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['A true: grasses <b>regrow</b>'], ['R true: <b>intercalary</b> meristems'], ['R <b>explains</b> A']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'regrow'), wt('A2', 'intercalary'), wt('A3', 'explains')],
    recapT: 'Recap · meristematic tissues',
    recap: ['<b>Tissue</b>: cells with a common origin, usually one job · <b>meristem</b>: cells that keep dividing', '<b>Apical</b>: root and shoot tips, makes the plant longer · leaf primordia · root cap',
      '<b>Intercalary</b>: between mature tissues, in grasses, regrows grazed parts · primary', '<b>Lateral</b>: a hollow cylinder in older parts, makes woody plants thicker · secondary',
      '<b>Lateral examples</b>: fascicular vascular cambium · interfascicular cambium · cork cambium'],
    yq: ['Where does the root apical meristem sit?', 'Name two lateral meristems.', 'Why are apical and intercalary meristems called primary?'],
    nextL: 'NEXT · EP 50', nextT: 'Why is a coconut husk tough and a potato soft? Permanent Tissues' },
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
