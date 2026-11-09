// PUC Biology Ep 46: Fruits and Seeds (Living diagram, leaf green)
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

/* ===== Ep 46: fruits and seeds ===== */
Object.assign(M.IC, {
  mango: ['M12 3c5 0 8 4 7 9-1 6-6 9-10 8-4-1-6-5-5-9 1-5 4-8 8-8Z', 'M12 3c0-1 1-2 2-2'],
  coconut: [ci(12, 13, 8), 'M8 9l2 2M14 8l1 2M16 12l-2 1M7 14l2-1M10 17l1-2'],
  seed: ['M12 3c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z', 'M12 7c-2 2-2 8 0 10'],
  maize: ['M12 3c3 0 4.5 4 4.5 9s-1.5 9-4.5 9-4.5-4-4.5-9S9 3 12 3Z', 'M8 9h8', 'M7.6 13h8.8', 'M8.2 17h7.6', 'M12 3v18'],
  scar: ['M12 3c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z', 'M5 10c1 2 1 3 0 5'],
});
const sv = id => $('#' + id);
const MAN = '#F2B33D', MES = '#F6C445', SKN = '#9CBF4E', STN = '#E9DDB8', STE = '#A88C55', SEED = '#C9A46A', COT = '#E8D9A0', ENDO = '#F2D27A', SCU = '#B7D88A';
const mangoD = 'M528,84 C660,74 762,170 742,300 C722,420 602,470 502,460 C382,450 302,360 322,250 C342,140 422,90 528,84 Z';
const sc = (s, c = [528, 270]) => `translate(${c[0]} ${c[1]}) scale(${s}) translate(${-c[0]} ${-c[1]})`;

/* ---------- H: mango + coconut ---------- */
const hl = sv('hlS'), HL = {};
HL.m = mk(hl, 'g', {}); { const g = HL.m; mk(g, 'path', { d: 'M232,140 C320,134 372,210 360,300 C348,390 270,430 210,424 C138,416 96,350 108,270 C120,190 170,144 232,140 Z', fill: MAN, stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M150,230 C170,190 210,176 240,178', stroke: '#F9D98A', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M232,140 C232,120 242,108 256,102', stroke: '#4E7A34', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M256,104 C290,86 322,96 330,112 C300,124 272,120 256,104 Z', fill: LEAF, stroke: BR, 'stroke-width': 3 }); }
HL.c = mk(hl, 'g', {}); { const g = HL.c; mk(g, 'circle', { cx: 552, cy: 290, r: 130, fill: '#8C6D4F', stroke: BR, 'stroke-width': 4 });
  const r = M.rng(4); for (let k = 0; k < 70; k++) { const a = r() * 6.283, rr = 30 + r() * 96, x = 552 + rr * Math.cos(a), y = 290 + rr * Math.sin(a), b = a + 1.2 + r(); mk(g, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} l${(14 * Math.cos(b)).toFixed(1)},${(14 * Math.sin(b)).toFixed(1)}`, stroke: '#5E4632', 'stroke-width': 2.2, 'stroke-linecap': 'round' }); }
  [[520, 230], [580, 230], [550, 272]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 9, fill: '#3E2E20' })); }

/* ---------- D: ovary -> fruit ---------- */
const dw = sv('dwS'), DW = {};
DW.p = mk(dw, 'g', {}); { const g = DW.p; mk(g, 'rect', { x: 180, y: 110, width: 18, height: 130, rx: 6, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 }); mk(g, 'ellipse', { cx: 189, cy: 106, rx: 26, ry: 11, fill: '#9FD09A', stroke: BR, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 189, cy: 300, rx: 74, ry: 66, fill: OVW, stroke: '#1F5E37', 'stroke-width': 4 }); DW.po = mk(g, 'ellipse', { cx: 189, cy: 300, rx: 22, ry: 28, fill: OVL, stroke: BR, 'stroke-width': 3 }); }
DW.ar = mk(dw, 'path', { d: 'M300,300 L410,300 M392,284 L410,300 L392,316', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
DW.f = mk(dw, 'g', {}); { const g = DW.f; mk(g, 'path', { d: 'M590,160 C680,156 730,230 716,310 C702,390 640,420 580,414 C510,406 470,350 480,280 C490,210 530,164 590,160 Z', fill: MAN, stroke: BR, 'stroke-width': 4 });
  DW.fs = mk(g, 'ellipse', { cx: 596, cy: 290, rx: 46, ry: 64, fill: SEED, stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: 'M590,160 C590,140 600,128 612,124', stroke: '#4E7A34', 'stroke-width': 6, fill: 'none' }); }
const dr = sv('drS'), DR = mk(dr, 'g', {});
{ mk(DR, 'path', { d: 'M180,200 C260,380 480,420 620,300 C640,286 652,296 640,316 C500,470 230,430 150,220 C140,196 170,186 180,200 Z', fill: '#F5D547', stroke: BR, 'stroke-width': 4 });
  mk(DR, 'path', { d: 'M160,206 C150,180 160,160 176,150', stroke: '#6B5A2E', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
  mk(DR, 'path', { d: 'M196,240 C280,380 470,400 600,318', stroke: '#D9B532', 'stroke-width': 3, fill: 'none' }); }
DR.x = mk(dr, 'g', {}); { mk(DR.x, 'circle', { cx: 620, cy: 150, r: 44, fill: '#FBE6E6', stroke: C.red, 'stroke-width': 3 }); mk(DR.x, 'path', { d: 'M600,130 L640,170 M640,130 L600,170', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
  txt(DR.x, 620, 222, 'NO FERTILISATION', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.red, 'font-weight': 600 }); }

/* ---------- Z: zoom ladder MANGO -> CUT OPEN -> STONE ---------- */
const ZN = ['MANGO', 'CUT OPEN', 'THE STONE'];
const zSet = chips('#zch', ZN, 'zc', false);
const tZ = [T0('Z1') + 0.2, T0('Z3'), T0('Z5')];
const zStack = stack('#lvs', 'lvi', [['RUNG 1 OF 3', 'Mango', 'A fruit: a wall, the pericarp, with a seed inside.', 'Peri = around · carp = fruit'],
  ['RUNG 2 OF 3', 'Cut open', 'A thick, fleshy pericarp has three layers.', 'Epicarp · mesocarp · endocarp'],
  ['RUNG 3 OF 3', 'The stone', 'The hard endocarp. One seed sits inside it.', ''],
  ['A DRUPE', 'Drupe', 'One seed. From one carpel in a superior ovary.', 'Mango · coconut']]);
const zs = sv('zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {})), LB = [];
{ const g = ZG[0]; mk(g, 'path', { d: mangoD, fill: MAN, stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: 'M380,210 C400,160 450,130 500,126', stroke: '#F9D98A', 'stroke-width': 14, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M528,84 C528,62 540,48 556,40', stroke: '#4E7A34', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
  LB[0] = [lab(g, 740, 300, 810, 260, 'Pericarp'), lab(g, 548, 48, 810, 70, 'Stalk')]; }
{ const g = ZG[1]; mk(g, 'path', { d: mangoD, fill: SKN, stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: mangoD, fill: MES, transform: sc(0.95) });
  mk(g, 'ellipse', { cx: 532, cy: 274, rx: 120, ry: 152, fill: STN, stroke: STE, 'stroke-width': 7, transform: 'rotate(-18 532 274)' });
  const r = M.rng(9); for (let k = 0; k < 16; k++) { const a = r() * 6.283; mk(g, 'path', { d: `M${(532 + 118 * Math.cos(a)).toFixed(1)},${(274 + 150 * Math.sin(a)).toFixed(1)} l${(14 * Math.cos(a)).toFixed(1)},${(14 * Math.sin(a)).toFixed(1)}`, stroke: STE, 'stroke-width': 2, transform: 'rotate(-18 532 274)' }); }
  mk(g, 'ellipse', { cx: 532, cy: 274, rx: 74, ry: 110, fill: SEED, stroke: BR, 'stroke-width': 3, transform: 'rotate(-18 532 274)' });
  LB[1] = [lab(g, 736, 330, 810, 380, 'Epicarp'), lab(g, 690, 200, 810, 150, 'Mesocarp'), lab(g, 418, 300, 250, 420, 'Endocarp', 'end')]; }
{ const g = ZG[2]; mk(g, 'ellipse', { cx: 528, cy: 270, rx: 250, ry: 200, fill: STN, stroke: STE, 'stroke-width': 12 });
  const r = M.rng(3); for (let k = 0; k < 34; k++) { const a = r() * 6.283; mk(g, 'path', { d: `M${(528 + 246 * Math.cos(a)).toFixed(1)},${(270 + 196 * Math.sin(a)).toFixed(1)} l${(20 * Math.cos(a)).toFixed(1)},${(20 * Math.sin(a)).toFixed(1)}`, stroke: STE, 'stroke-width': 3 }); }
  mk(g, 'ellipse', { cx: 528, cy: 270, rx: 160, ry: 132, fill: SEED, stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: 'M528,142 C510,220 510,320 528,398', stroke: '#8A6A3A', 'stroke-width': 3, fill: 'none' });
  LB[2] = [lab(g, 290, 300, 150, 440, 'Endocarp', 'end'), lab(g, 620, 230, 820, 110, 'Seed')]; }
const FOC = [[528, 270, 80], [532, 274, 130], null], FR = focRings(ZG, FOC);
const tLab = [[wt('Z2', 'pericarp'), wt('Z2', 'wall') - 0.4], [wt('Z4', 'epicarp'), wt('Z4', 'mesocarp'), wt('Z4', 'endocarp')], [wt('Z5', 'stone'), wt('Z5', 'seed')]];
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the stone is not the seed!' });

/* ---------- P: flower to fruit ---------- */
const PN = ['POLLINATION', 'PETALS FALL', 'OVARY SWELLS', 'WALL TO PERICARP', 'OVULE TO SEED'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['ONE FLOWER', 'Flower to fruit', 'Five steps, inside one flower.', ''], ['STAGE 1 OF 5', 'Pollination', 'Pollen lands. Fertilisation inside the ovule.', ''],
  ['STAGE 2 OF 5', 'Petals fall', 'Petals and stamens dry up and drop.', ''], ['STAGE 3 OF 5', 'Ovary swells', 'The ovary grows bigger and bigger.', ''],
  ['STAGE 4 OF 5', 'Pericarp', 'The ovary wall becomes the fruit wall.', ''], ['STAGE 5 OF 5', 'Seed', 'The ovule becomes the seed. A fruit!', '']]);
const ps = sv('pS'), PP = {}, OC = [528, 350];
mk(ps, 'path', { d: 'M528,520 L528,392', stroke: '#4E7A34', 'stroke-width': 12, 'stroke-linecap': 'round' });
PP.pet = mk(ps, 'g', {}); { const g = PP.pet;
  PP.pl = mk(g, 'path', { d: 'M500,370 C430,320 370,240 362,150 C440,170 500,250 520,356 Z', fill: PET, stroke: BR, 'stroke-width': 3.5 });
  PP.pr = mk(g, 'path', { d: 'M556,370 C626,320 686,240 694,150 C616,170 556,250 536,356 Z', fill: PET, stroke: BR, 'stroke-width': 3.5 });
  [[-1, 432], [1, 624]].forEach(([s, x]) => { mk(g, 'path', { d: `M${528 + s * 22},360 C${528 + s * 50},300 ${x - s * 20},250 ${x},210`, stroke: '#9FBF7A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'ellipse', { cx: x, cy: 196, rx: 15, ry: 26, fill: ANTH, stroke: BR, 'stroke-width': 3 }); }); }
PP.sty = mk(ps, 'g', {}); mk(PP.sty, 'rect', { x: 518, y: 170, width: 20, height: 140, rx: 6, fill: '#CFE6C6', stroke: BR, 'stroke-width': 3 }); mk(PP.sty, 'ellipse', { cx: 528, cy: 164, rx: 28, ry: 13, fill: '#9FD09A', stroke: BR, 'stroke-width': 3 });
PP.ovG = mk(ps, 'g', {}); PP.ov = mk(PP.ovG, 'ellipse', { cx: OC[0], cy: OC[1], rx: 50, ry: 44, fill: OVW, stroke: '#1F5E37', 'stroke-width': 4 });
PP.ovl = mk(PP.ovG, 'ellipse', { cx: OC[0], cy: OC[1], rx: 16, ry: 20, fill: OVL, stroke: BR, 'stroke-width': 2.5 });
mk(PP.pet, 'path', { d: 'M470,394 C480,380 510,378 528,388 C546,378 576,380 586,394 C560,404 496,404 470,394 Z', fill: '#7FB069', stroke: BR, 'stroke-width': 3 });
PP.pol = [0, 1, 2, 3].map(() => mk(ps, 'circle', { r: 7, fill: '#F7E07A', stroke: '#B08A2E', 'stroke-width': 2 }));
PP.L = [lab(ps, 554, 162, 760, 120, 'Stigma'), lab(ps, 576, 340, 760, 300, 'Ovary'), lab(ps, 540, 356, 760, 420, 'Ovule')];
PP.L2 = [lab(ps, 640, 300, 790, 170, 'Pericarp'), lab(ps, 560, 350, 790, 440, 'Seed')];

/* ---------- C: gram seed + maize grain ---------- */
const cs = sv('clS'), CL = {};
{ CL.coat = mk(cs, 'ellipse', { cx: 400, cy: 280, rx: 206, ry: 160, fill: '#B98A4E', stroke: BR, 'stroke-width': 4 });
  CL.teg = mk(cs, 'ellipse', { cx: 400, cy: 280, rx: 190, ry: 144, fill: '#E6CF9A', stroke: '#8A6A3A', 'stroke-width': 2.5 });
  CL.cot = mk(cs, 'g', {}); mk(CL.cot, 'path', { d: 'M410,144 C540,150 580,240 576,290 C570,360 520,414 410,418 C440,340 440,220 410,144 Z', fill: COT, stroke: BR, 'stroke-width': 3 });
  mk(CL.cot, 'path', { d: 'M400,144 C300,150 250,210 246,280 C244,350 300,414 400,418 C370,340 370,220 400,144 Z', fill: COT, stroke: BR, 'stroke-width': 3 });
  CL.ax = mk(cs, 'g', {}); mk(CL.ax, 'path', { d: 'M266,232 C258,262 258,300 262,330', stroke: '#9FCB7A', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  CL.plu = mk(CL.ax, 'path', { d: 'M266,232 C254,210 258,196 272,190 C282,206 278,222 266,232 Z', fill: '#7FB069', stroke: BR, 'stroke-width': 2 });
  CL.rad = mk(CL.ax, 'path', { d: 'M254,326 L262,362 L272,326 Z', fill: '#C7D99A', stroke: BR, 'stroke-width': 2 });
  CL.hil = mk(cs, 'ellipse', { cx: 196, cy: 290, rx: 6, ry: 26, fill: '#3E2E20' }); CL.mic = mk(cs, 'circle', { cx: 200, cy: 246, r: 5, fill: '#3E2E20' });
  CL.lab = [lab(cs, 520, 150, 620, 100, 'Testa'), lab(cs, 560, 220, 620, 190, 'Tegmen'), lab(cs, 200, 290, 150, 330, 'Hilum', 'end'), lab(cs, 200, 246, 150, 200, 'Micropyle', 'end'),
    lab(cs, 500, 300, 620, 330, 'Cotyledon'), lab(cs, 262, 290, 330, 470, 'Embryonal axis', 'middle'), lab(cs, 262, 354, 150, 440, 'Radicle', 'end'), lab(cs, 274, 194, 330, 84, 'Plumule')]; }
const cr = sv('crS'), CR = {};
{ const gd = 'M410,74 C530,78 548,220 530,360 C518,460 470,520 410,520 C350,520 302,460 290,360 C272,220 290,78 410,74 Z';
  CR.g = mk(cr, 'path', { d: gd, fill: ENDO, stroke: '#B07A2A', 'stroke-width': 8 }); CR.al = mk(cr, 'g', {}); mk(CR.al, 'path', { d: gd, fill: 'none', stroke: '#D98E3A', 'stroke-width': 5, transform: sc(0.93, [410, 300]) });
  CR.emb = mk(cr, 'g', {}); mk(CR.emb, 'path', { d: 'M318,300 C350,320 362,420 340,486 C320,500 300,470 302,420 C304,370 300,320 318,300 Z', fill: SCU, stroke: BR, 'stroke-width': 3 });
  mk(CR.emb, 'path', { d: 'M352,350 C346,390 346,430 352,460', stroke: '#9FCB7A', 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' });
  CR.ctl = mk(CR.emb, 'ellipse', { cx: 352, cy: 350, rx: 12, ry: 26, fill: '#7FB069', stroke: BR, 'stroke-width': 2.5 }); CR.crz = mk(CR.emb, 'ellipse', { cx: 352, cy: 470, rx: 12, ry: 20, fill: '#C7D99A', stroke: BR, 'stroke-width': 2.5 });
  CR.lab = [lab(cr, 520, 300, 560, 400, 'Seed coat + fruit wall', 'start', null, 20), lab(cr, 450, 200, 560, 130, 'Endosperm'), lab(cr, 496, 250, 560, 250, 'Aleurone layer', 'start', null, 22),
    lab(cr, 314, 400, 230, 500, 'Scutellum', 'end'), lab(cr, 352, 334, 230, 300, 'Coleoptile', 'end'), lab(cr, 352, 486, 230, 400, 'Coleorhiza', 'end')]; }
const tCL = [wt('C2', 'testa'), wt('C2', 'tegmen'), wt('C3', 'hilum'), wt('C3', 'micropyle'), wt('C4', 'cotyledons'), wt('C4', 'embryonal'), wt('C5', 'radicle'), wt('C5', 'plumule')];
const tCR = [wt('G1', 'seed'), wt('G2', 'endosperm'), wt('G2', 'aleurone'), wt('G3', 'scutellum'), wt('G4', 'coleoptile'), wt('G4', 'coleorhiza')];

/* ---------- V: side by side ---------- */
const cV = cmp($('#vc'), ['GRAM · DICOT SEED', 'MAIZE · MONOCOT GRAIN'], [
  ['seed', 'Cotyledons', 'Two, fat with food', 'One, shield shaped: the scutellum', wt('V1', 'Gram'), wt('V1', 'Maize'),
    s => { mk(s, 'path', { d: 'M62,14 C30,16 20,40 20,52 C20,70 36,88 62,88 C54,64 54,38 62,14 Z', fill: COT, stroke: BR, 'stroke-width': 2.5 }); mk(s, 'path', { d: 'M68,14 C100,16 110,40 110,52 C110,70 94,88 68,88 C76,64 76,38 68,14 Z', fill: COT, stroke: BR, 'stroke-width': 2.5 }); },
    s => { mk(s, 'path', { d: 'M65,10 C100,12 106,50 100,74 C94,92 36,92 30,74 C24,50 30,12 65,10 Z', fill: ENDO, stroke: BR, 'stroke-width': 2.5 }); mk(s, 'ellipse', { cx: 46, cy: 66, rx: 12, ry: 22, fill: SCU, stroke: BR, 'stroke-width': 2 }); }],
  ['', 'Endosperm', 'Used up: non endospermous', 'Bulky: endospermic', wt('V2', 'gram'), wt('V2', 'Maize'),
    s => { mk(s, 'ellipse', { cx: 65, cy: 50, rx: 44, ry: 34, fill: COT, stroke: BR, 'stroke-width': 2.5 }); }, s => { mk(s, 'ellipse', { cx: 65, cy: 50, rx: 44, ry: 38, fill: ENDO, stroke: BR, 'stroke-width': 2.5 }); mk(s, 'ellipse', { cx: 40, cy: 66, rx: 10, ry: 16, fill: SCU, stroke: BR, 'stroke-width': 2 }); }],
  ['', 'Sheaths', 'None', 'Coleoptile + coleorhiza', wt('V3', 'Only') + 0.6, wt('V3', 'coleoptile'),
    null, s => { mk(s, 'path', { d: 'M65,20 C58,40 58,60 65,80', stroke: '#9FCB7A', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }); mk(s, 'ellipse', { cx: 65, cy: 22, rx: 9, ry: 18, fill: '#7FB069', stroke: BR, 'stroke-width': 2 }); mk(s, 'ellipse', { cx: 65, cy: 82, rx: 9, ry: 14, fill: '#C7D99A', stroke: BR, 'stroke-width': 2 }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A coconut is a drupe, like a mango. But its middle layer is not juicy. Is the coconut mesocarp fleshy or fibrous?', opts: ['Fleshy', 'Fibrous'], right: 1, why: 'Fibrous. The hairy husk is the mesocarp: the same three layers as a mango, so both are drupes.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['FROM THE OVARY WALL', 'background:var(--ac2);color:#1F6B3F'], ['FROM THE OVULE', 'background:var(--ink);color:#fff']], [
  ['mango', 'Mango flesh', '<b>Mesocarp</b> · the part we eat', 0, 0, wt('W2', 'Mango')], ['seed', 'Gram cotyledons', '<b>Embryo</b> · seed leaves', 1, 0, wt('W3', 'gram')],
  ['mango', 'Mango stone', '<b>Endocarp</b> · hard and stony', 0, 1, wt('W4', 'mango')], ['scar', 'Hilum', '<b>Seed coat</b> · a scar', 1, 1, wt('W5', 'hilum')],
  ['coconut', 'Coconut husk', '<b>Mesocarp</b> · fibrous', 0, 2, wt('W6', 'coconut')], ['maize', 'Scutellum', '<b>Embryo</b> · one cotyledon', 1, 2, wt('W7', 'maize')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ mk(TP, 'ellipse', { cx: 260, cy: 130, rx: 110, ry: 86, fill: STN, stroke: STE, 'stroke-width': 7 }); mk(TP, 'ellipse', { cx: 260, cy: 130, rx: 64, ry: 50, fill: SEED, stroke: BR, 'stroke-width': 3 });
  txt(TP, 260, 254, 'STONE = ENDOCARP · SEED INSIDE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['mango', 'A mango', 'JUICY', 'mango'], ['coconut', 'A coconut', 'HARD AND HAIRY', 'coconut'], ['seed', 'A gram seed', 'SOAKED', 'gram']],
  learn: [['mango', 'Fruit layers', 'layers'], ['seed', 'Gram seed', 'gram'], ['maize', 'Maize grain', 'maize']],
  hookW: 'doctor', split: ['layer', 'seed'], st: ['ovary', 'ovule'],
  cam: [[tPs[2] - 0.2, 1.05, 960, 580], [tPs[4] + 1.5, 1, 960, 540]],
  hook: t => { M.vis(HL.m, t, wt('H2', 'mango') - 0.1, 1e9, { ...POP, sc: 0.8 }); M.vis(HL.c, t, wt('H2', 'coconut') - 0.1, 1e9, { ...POP, sc: 0.8 });
    M.vis($('#hlt0'), t, wt('H2', 'juicy'), 1e9, POP); M.vis($('#hlt1'), t, wt('H2', 'hairy'), 1e9, POP); M.vis($('#hlP'), t, wt('H2', 'same') - 0.1, 1e9, POP); },
  measure: () => { [['hlt0', 234, 448], ['hlt1', 552, 448], ['dt0', 189, 390], ['dt2', 189, 440], ['dt1', 598, 390], ['dt3', 598, 440]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dw'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(DW.p, t, wt('D2', 'ovary') - 0.2, 1e9, { ...POP, sc: 0.8 }); M.vis($('#dt0'), t, wt('D2', 'ovary'), 1e9, POP);
      M.draw(DW.ar, t, wt('D2', 'ripens') - 0.1, 0.5); M.vis(DW.f, t, wt('D2', 'fruit') - 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis($('#dt1'), t, wt('D2', 'fruit'), 1e9, POP);
      M.vis($('#dwP'), t, wt('D2', 'mature'), 1e9, POP); M.vis($('#dt2'), t, wt('D3', 'ovules'), 1e9, POP); M.vis($('#dt3'), t, wt('D3', 'seeds'), 1e9, POP);
      attr(DW.po, 'stroke-width', t > wt('D3', 'ovules') && t < wt('D3', 'ovules') + 1.5 ? 6 : 3); attr(DW.fs, 'stroke-width', t > wt('D3', 'seeds') && t < wt('D3', 'seeds') + 1.5 ? 6 : 3);
      M.vis($('#dr'), t, T0('D4') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(DR.x, t, wt('D4', 'without'), 1e9, POP); M.vis(DR, t, wt('D4', 'Banana') - 0.2, 1e9, { dy: 20 }); M.vis($('#drP'), t, wt('D4', 'parthenocarpic'), 1e9, POP); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ.map(x => x + 0.35))); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.3, tZ[2] + 0.3, wt('Z5', 'drupe') - 0.2]);
      zoomRun(t, { G: ZG, FOC, tZ, LB, tLab, FR, c: [528, 270] }); avZ(t, T1('Z5') - 0.8, out); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      PP.L.forEach((l, i) => labRun(l, t, T0('P1') + 0.6 + i * 0.3, tPs[1] - 0.2));
      // stage 1: pollen grains keep landing on the stigma (loop)
      PP.pol.forEach((p, i) => { const u = ((t - tPs[0]) * 0.6 + i * 0.25) % 1, on = st === 0; attr(p, 'cx', (500 + i * 18).toFixed(1)); attr(p, 'cy', (40 + u * 118).toFixed(1)); p.style.opacity = on ? (u < 0.85 ? 1 : (1 - u) / 0.15).toFixed(2) : 0; });
      // stage 2: petals and stamens fall
      const f = M.io((t - tPs[1] - 0.3) / 1.2); attr(PP.pet, 'transform', f > 0 ? `translate(0 ${(f * 160).toFixed(1)})` : ''); PP.pet.style.opacity = (1 - f).toFixed(3);
      // stage 3: ovary swells (style dries away); slow breathing loop
      const g3 = M.io((t - tPs[2] - 0.2) / 2.2), br = st === 2 ? 0.03 * Math.sin(t * 4) : 0; PP.sty.style.opacity = (1 - M.clamp(g3 * 2)).toFixed(3);
      attr(PP.ovG, 'transform', sc(1 + 2.3 * g3 + br, OC));
      // stage 4: the wall turns into the pericarp; stage 5: the ovule turns into the seed
      const w4 = M.io((t - tPs[3] - 0.2) / 0.8), s5 = M.io((t - tPs[4] - 0.2) / 0.8);
      attr(PP.ov, 'fill', mix(OVW, MAN, w4)); attr(PP.ov, 'stroke', mix('#1F5E37', BR, w4)); attr(PP.ovl, 'fill', mix(OVL, SEED, s5));
      labRun(PP.L2[0], t, wt('P5', 'pericarp')); labRun(PP.L2[1], t, wt('P6', 'seed')); }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(CL.coat, t, T0('C1') + 0.5, 1e9, { ...POP, sc: 0.8 }); M.vis(CL.teg, t, wt('C2', 'tegmen') - 0.2, 1e9, { dy: 0, fade: 0.3 });
      M.vis(CL.cot, t, wt('C4', 'embryo') - 0.1, 1e9, { ...POP, sc: 0.85 }); M.vis(CL.ax, t, wt('C4', 'axis') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(CL.hil, t, wt('C3', 'hilum') - 0.1, 1e9, POP); M.vis(CL.mic, t, wt('C3', 'micropyle') - 0.1, 1e9, POP);
      CL.lab.forEach((l, i) => labRun(l, t, tCL[i]));
      M.vis($('#cr'), t, T0('G1') - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis(CR.g, t, T0('G1') + 0.2, 1e9, { ...POP, sc: 0.8 }); M.vis(CR.al, t, wt('G2', 'aleurone') - 0.2, 1e9, { dy: 0, fade: 0.3 });
      M.vis(CR.emb, t, wt('G3', 'embryo') - 0.1, 1e9, { ...POP, sc: 0.6 }); CR.lab.forEach((l, i) => labRun(l, t, tCR[i]));
      [CR.ctl, CR.crz].forEach((e, i) => attr(e, 'stroke-width', t > tCR[4 + i] && t < tCR[4 + i] + 1.4 ? 4.5 : 2.5)); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'fleshy') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'hairy') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'The hard mango stone is the seed', right: 'The stone is the endocarp: the seed sits inside it', tRight: wt('X3', 'endocarp') - 0.1,
    type: 'Statement questions on seed parts; matching fruit layers with examples', tType: wt('E1', 'statement'),
    xRun: t => M.vis(TP, t, wt('X3', 'stone') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statements are correct?<div class="sl"><b>I</b>The scutellum is the single cotyledon of maize</div><div class="sl"><b>II</b>Pea seeds are endospermous</div><div class="sl"><b>III</b>The coleoptile covers the radicle</div><div class="sl"><b>IV</b>In coconut, the mesocarp is fibrous</div>',
      opts: ['I and IV only', 'II and III only', 'I, II and IV only', 'I, III and IV only'], right: 0 },
    tOpts: wt('Q1', 'Which') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b> (I, IV)'], ['<b style="color:var(--red)">II</b>: pea is non endospermous'], ['<b style="color:var(--red)">III</b>: coleoptile covers the plumule'], ['<b style="color:var(--ok)">I</b>: scutellum, one cotyledon'], ['<b style="color:var(--ok)">IV</b>: fibrous mesocarp']],
    tSo: [wt('A1', 'A', 1) + 0.1, wt('A2', 'Two'), wt('A2', 'Three'), wt('A3', 'scutellum'), wt('A3', 'coconut')],
    recapT: 'Recap · fruits and seeds',
    recap: ['<b>Fruit</b>: a ripened ovary · <b>seed</b>: a ripened ovule · no fertilisation: parthenocarpic', '<b>Pericarp</b>: epicarp (skin) · mesocarp (flesh) · endocarp (stone)',
      '<b>Drupe</b>: one seed, one carpel, superior ovary (mango; coconut, fibrous mesocarp)', '<b>Gram seed</b>: testa + tegmen · hilum · micropyle · 2 cotyledons · radicle · plumule', '<b>Maize grain</b>: endosperm + aleurone layer · scutellum · coleoptile · coleorhiza'],
    yq: ['Name the three layers of the pericarp in a mango.', 'What are the testa and the tegmen?', 'What do the coleoptile and the coleorhiza cover?'],
    nextL: 'NEXT · EP 47', nextT: 'A whole flower in one line? Floral Formula and Family Solanaceae' },
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
