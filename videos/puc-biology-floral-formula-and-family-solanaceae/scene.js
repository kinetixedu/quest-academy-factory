// PUC Biology Ep 47: Floral Formula and Family Solanaceae (Living diagram, leaf green)
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


/* ===== Ep 47: floral formula and family Solanaceae ===== */
Object.assign(M.IC, {
  tomato: [ci(12, 13, 8), 'M8 6l4 2 4-2M12 8V4'],
  brinjal: ['M9 6c4-1 9 3 10 9 1 4-2 6-5 5-3-1-4-4-6-7-2-3-2-6 1-7Z', 'M9 6L6 3M7 8l-3 0'],
  potato: ['M5 10c1-4 6-6 10-5 4 1 6 4 5 8-1 4-5 6-9 5-4-1-7-4-6-8Z', 'M9 10h.01M14 9h.01M12 14h.01'],
  read: ['M4 6h16', 'M4 11h16', 'M4 16h10'],
  pen: ['M4 20l4-1 11-11-3-3L5 16l-1 4Z', 'M14 7l3 3'],
  flower: [ci(12, 12, 3), 'M12 9c-2-4 2-6 0-6s2 2 0 6', 'M15 12c4-2 6 2 6 0s-2 2-6 0', 'M12 15c2 4-2 6 0 6s-2-2 0-6', 'M9 12c-4 2-6-2-6 0s2-2 6 0'],
});
const sv = id => $('#' + id);
const SEP = LEAF, TOM = '#D9483B', BRJ = '#6B3F8C', POT = '#C99A5B', SOIL = '#E9DCC3';
const sc = (s, c = [528, 270]) => `translate(${c[0]} ${c[1]}) scale(${s}) translate(${-c[0]} ${-c[1]})`;
const rad = a => a * Math.PI / 180, P2 = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
const band = (cx, cy, r1, r2, a0, a1) => { const f = v => v.toFixed(1), [x1, y1] = P2(cx, cy, r2, a0), [x2, y2] = P2(cx, cy, r2, a1), [x3, y3] = P2(cx, cy, r1, a1), [x4, y4] = P2(cx, cy, r1, a0), [mx, my] = P2(cx, cy, r2 + 8, (a0 + a1) / 2);
  return `M${f(x1)},${f(y1)} Q${f(mx)},${f(my)} ${f(x2)},${f(y2)} L${f(x3)},${f(y3)} A${r1} ${r1} 0 0 0 ${f(x4)},${f(y4)} Z`; };
// floral diagram of Solanaceae: mother axis, K(5) joined, C(5) joined, A5 epipetalous, G(2) oblique septum, swollen placentae
const fdiag = (p, cx, cy) => { const F = {};
  F.ax = mk(p, 'circle', { cx, cy: cy - 206, r: 10, fill: C.ink });
  F.cal = mk(p, 'g', {}); F.calR = mk(F.cal, 'circle', { cx, cy, r: 160, fill: 'none', stroke: '#4E7A34', 'stroke-width': 4 });
  for (let k = 0; k < 5; k++) { const a = -90 + k * 72; mk(F.cal, 'path', { d: band(cx, cy, 144, 174, a - 27, a + 27), fill: SEP, stroke: BR, 'stroke-width': 3 }); }
  F.cor = mk(p, 'g', {}); F.corR = mk(F.cor, 'circle', { cx, cy, r: 120, fill: 'none', stroke: '#C77C93', 'stroke-width': 4 });
  for (let k = 0; k < 5; k++) { const a = -54 + k * 72; mk(F.cor, 'path', { d: band(cx, cy, 102, 132, a - 33, a + 33), fill: PET, stroke: BR, 'stroke-width': 3 }); }
  F.and = mk(p, 'g', {}); F.epi = mk(p, 'g', {});
  for (let k = 0; k < 5; k++) { const a = -90 + k * 72, [x, y] = P2(cx, cy, 80, a), [ex, ey] = P2(cx, cy, 108, a);
    mk(F.epi, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}`, stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round' });
    const g = mk(F.and, 'g', { transform: `rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})` }); mk(g, 'ellipse', { cx: x - 8, cy: y, rx: 8, ry: 13, fill: ANTH, stroke: BR, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: x + 8, cy: y, rx: 8, ry: 13, fill: ANTH, stroke: BR, 'stroke-width': 2.5 }); }
  F.gyn = mk(p, 'g', {}); mk(F.gyn, 'circle', { cx, cy, r: 50, fill: OVW, stroke: '#1F5E37', 'stroke-width': 4 });
  const [s1x, s1y] = P2(cx, cy, 50, -60), [s2x, s2y] = P2(cx, cy, 50, 120); mk(F.gyn, 'path', { d: `M${s1x.toFixed(1)},${s1y.toFixed(1)} L${s2x.toFixed(1)},${s2y.toFixed(1)}`, stroke: '#1F5E37', 'stroke-width': 4 });
  [-1, 1].forEach(s => { const [px, py] = P2(cx, cy, 13, 30 + (s > 0 ? 0 : 180)); mk(F.gyn, 'ellipse', { cx: px, cy: py, rx: 12, ry: 22, fill: '#9FD09A', stroke: '#1F5E37', 'stroke-width': 2, transform: `rotate(30 ${px.toFixed(1)} ${py.toFixed(1)})` });
    [[-12, -10], [12, -6], [-6, 14], [14, 12]].forEach(([dx, dy]) => mk(F.gyn, 'circle', { cx: px + dx * 0.9, cy: py + dy, r: 4.5, fill: OVL, stroke: BR, 'stroke-width': 1.5 })); });
  return F; };

/* ---------- H: tomato, brinjal, potato ---------- */
const hl = sv('hlS'), HL = {};
HL.t = mk(hl, 'g', {}); { const g = HL.t; mk(g, 'circle', { cx: 160, cy: 300, r: 86, fill: TOM, stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: 'M110,260 C120,236 140,226 160,226', stroke: '#F08A7E', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M160,222 L132,206 L150,222 L128,236 L158,230 L160,250 L166,230 L194,236 L172,222 L190,206 Z', fill: SEP, stroke: BR, 'stroke-width': 3 }); }
HL.b = mk(hl, 'g', {}); { const g = HL.b; mk(g, 'path', { d: 'M360,180 C420,170 470,240 470,320 C470,390 430,420 395,410 C350,398 330,350 332,290 C334,230 330,190 360,180 Z', fill: BRJ, stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M360,200 C350,240 352,290 360,330', stroke: '#9A74B8', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M338,190 C350,166 390,160 410,176 C400,196 380,206 360,206 C350,206 340,200 338,190 Z', fill: SEP, stroke: BR, 'stroke-width': 3 }); mk(g, 'path', { d: 'M372,166 C368,146 372,132 384,122', stroke: '#4E7A34', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }); }
HL.p = mk(hl, 'g', {}); { const g = HL.p; mk(g, 'rect', { x: 520, y: 260, width: 228, height: 160, rx: 10, fill: SOIL }); mk(g, 'path', { d: 'M520,260 L748,260', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M634,260 L634,180 M634,210 C610,196 600,180 604,166 M634,196 C656,182 670,170 668,154', stroke: '#4E7A34', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M574,330 C580,296 630,286 672,300 C710,312 716,350 690,372 C660,396 600,394 582,370 C574,360 572,344 574,330 Z', fill: POT, stroke: BR, 'stroke-width': 4 });
  [[608, 322], [650, 314], [676, 346], [628, 360]].forEach(([x, y]) => mk(g, 'path', { d: `M${x - 5},${y} q5,-4 10,0`, stroke: '#7A5A30', 'stroke-width': 3, fill: 'none' })); }

/* ---------- D: fixed order + floral diagram ---------- */
const DQ = [['Habit', 'Herb, shrub or tree', 'habit'], ['Root', 'Tap or fibrous', 'roots'], ['Stem', 'Shape, branches', 'stem'], ['Leaves', 'Type, veins, arrangement', 'leaves'], ['Flower', 'Its parts: formula + diagram', 'flowers']];
$('#dqs').innerHTML = DQ.map(([k, v], i) => `<div class="dq" id="dq${i}" style="top:${88 + i * 82}px"><div class="dk"><span class="dn">${i + 1}</span>${k}</div><div class="dv">${v}</div></div>`).join('');
const DF = fdiag(sv('drS'), 300, 330);
const DL = [lab(sv('drS'), 310, 124, 520, 110, 'Mother axis'), lab(sv('drS'), 456, 300, 520, 230, 'Calyx'), lab(sv('drS'), 334, 350, 520, 420, 'Gynoecium')];

/* ---------- Z: the symbols ---------- */
const ZT = [[['Br'], 'Bract', 'small leaf at the base', wt('Z2', 0)], [['act'], 'Actinomorphic', 'equal halves, any plane', wt('Z2', 14)], [['zyg'], 'Zygomorphic', 'only one plane works', wt('Z2', 36)],
  [[['K', '']], 'Calyx', 'the sepals', wt('Z3', 0)], [[['C', '']], 'Corolla', 'the petals', wt('Z3', 8)], [[['P', '']], 'Perianth', 'sepals, petals alike', wt('Z3', 16)],
  [[['A', '']], 'Androecium', 'the stamens', wt('Z4', 0)], [[['G', '']], 'Gynoecium', 'the carpels', wt('Z4', 6)], [[['G', '(2)', 'sup']], 'Superior ovary', 'line under the number', wt('Z4', 13)],
  [[['G', '(2)', 'inf']], 'Inferior ovary', 'line above the number', wt('Z4', 23)], [[['K', '(5)']], 'Fused', 'joined, same whorl', wt('Z5', 3)], [[{ adh: [['C', '(5)'], ['A', '5']] }], 'Adhesion', 'joined to another whorl', wt('Z5', 12)]];
$('#zts').innerHTML = ZT.map(([tk, n, m], i) => `<div class="zt" id="zt${i}" style="left:${36 + (i % 4) * 388}px;top:${84 + Math.floor(i / 4) * 158}px"><div class="zs">${fml(tk)}</div><div class="zn">${n}</div><div class="zm">${m}</div></div>`).join('');
$('#zts').querySelectorAll('.fadh').forEach(e => { e.style.paddingTop = '10px'; });
$('#zts').querySelectorAll('.zt:nth-child(12) .fml').forEach(e => { e.style.gap = '10px'; });

/* ---------- P: decode + build the floral diagram ring by ring ---------- */
const PN = ['SYMMETRY', 'CALYX', 'COROLLA', 'STAMENS', 'CARPELS'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['DECODE', 'Potato family', 'One formula, five steps. One ring at a time.', ''],
  ['STEP 1 OF 5', 'Symmetry', 'Actinomorphic and bisexual: stamens and a pistil.', 'Any cut through the centre gives equal halves'],
  ['STEP 2 OF 5', 'Calyx', 'K(5): five sepals, joined. Persistent.', 'They stay on the fruit: the green cap of a brinjal'],
  ['STEP 3 OF 5', 'Corolla', 'C(5): five petals, joined.', ''],
  ['STEP 4 OF 5', 'Stamens', 'A5, fixed on the petals: epipetalous.', 'Epi = upon · petalous = the petals'],
  ['STEP 5 OF 5', 'Carpels', 'G(2): two fused carpels, superior ovary, two rooms.', 'Swollen placenta, many ovules: axile']]);
$('#fmP').innerHTML = fml(['act', 'bi', ['K', '(5)'], { adh: [['C', '(5)'], ['A', '5']] }, ['G', '(2)', 'sup']]);
const PT = [...$('#fmP').querySelectorAll('.ft')], PADH = $('#fmP').querySelector('.fadh');
const ps = sv('pS'); mk(ps, 'circle', { cx: 400, cy: 334, r: 176, fill: 'none', stroke: '#CBD0DA', 'stroke-width': 3, 'stroke-dasharray': '10 8' }); const PF = fdiag(ps, 400, 334);
const PL = [lab(ps, 410, 128, 640, 120, 'Mother axis'), lab(ps, 556, 318, 640, 200, 'Sepals, joined'), lab(ps, 512, 358, 640, 280, 'Petals, joined'), lab(ps, 472, 334, 640, 360, 'Stamen on a petal'), lab(ps, 430, 364, 640, 440, 'Ovary: 2 rooms')];
const tokStage = [0, 0, 1, 2, 3, 4], ringOf = [null, PF.cal, PF.cor, PF.and, PF.gyn];

/* ---------- C: the family ---------- */
const CQ = [['Habit', 'Herbs, shrubs, rarely trees', wt('C2', 'herbs')], ['Leaves', 'Simple, alternate, net veins', wt('C2', 'leaves')], ['Stem', 'Potato: an underground stem', wt('C3', 'potato')],
  ['Fruit', 'A berry or a capsule', wt('C4', 'fruits')], ['Seeds', 'Many, with endosperm', wt('C4', 'many')]];
$('#cqs').innerHTML = CQ.map(([k, v], i) => `<div class="dq" id="cq${i}" style="top:${92 + i * 86}px"><div class="dk"><span class="dn">${i + 1}</span>${k}</div><div class="dv">${v}</div></div>`).join('');
const cr = sv('crS'), CR = {};
CR.p = mk(cr, 'g', {}); { const g = CR.p; mk(g, 'rect', { x: 36, y: 200, width: 712, height: 300, rx: 12, fill: SOIL }); mk(g, 'path', { d: 'M36,200 L748,200', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M300,200 L300,90 M300,140 C270,120 258,100 262,82 M300,120 C330,102 346,88 342,70', stroke: '#4E7A34', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M300,200 C300,240 310,270 330,290', stroke: '#B79A6A', 'stroke-width': 6, fill: 'none' });
  mk(g, 'path', { d: 'M250,330 C258,280 340,266 400,284 C452,300 462,356 424,390 C384,424 296,422 266,388 C254,374 248,352 250,330 Z', fill: POT, stroke: BR, 'stroke-width': 4 });
  CR.eyes = [[300, 316], [366, 302], [410, 344], [330, 380]].map(([x, y]) => mk(g, 'path', { d: `M${x - 7},${y} q7,-6 14,0`, stroke: '#7A5A30', 'stroke-width': 3.5, fill: 'none' }));
  CR.pl = [lab(g, 410, 344, 520, 300, 'Eye: a bud'), lab(g, 300, 400, 520, 440, 'Stem tuber')]; }
CR.b = mk(cr, 'g', {}); { const g = CR.b; mk(g, 'circle', { cx: 290, cy: 310, r: 170, fill: TOM, stroke: BR, 'stroke-width': 5 }); mk(g, 'circle', { cx: 290, cy: 310, r: 146, fill: '#F07B6C' });
  [0, 120, 240].forEach(a => { const [x, y] = P2(290, 310, 70, a + 90); mk(g, 'ellipse', { cx: x, cy: y, rx: 50, ry: 40, fill: '#F6B3A6', stroke: '#C0392B', 'stroke-width': 2.5, transform: `rotate(${a} ${x.toFixed(1)} ${y.toFixed(1)})` });
    for (let k = 0; k < 6; k++) { const [sx, sy] = P2(x, y, 26, k * 60); mk(g, 'ellipse', { cx: sx, cy: sy, rx: 5, ry: 8, fill: '#F7E7B0', stroke: '#B08A2E', 'stroke-width': 1.5 }); } });
  [0, 120, 240].forEach(a => { const [x, y] = P2(290, 310, 146, a - 30); mk(g, 'path', { d: `M290,310 L${x.toFixed(1)},${y.toFixed(1)}`, stroke: '#C0392B', 'stroke-width': 4 }); });
  CR.bl = [lab(g, 446, 250, 520, 160, 'Berry'), lab(g, 316, 284, 520, 420, 'Many seeds')]; }
const US = [['FOOD', 'Tomato, brinjal, potato', wt('C5', 'food')], ['SPICE', 'Chilli', wt('C5', 'chilli')], ['MEDICINE', 'Belladonna, ashwagandha', wt('C5', 'belladonna')], ['FUMIGATORY', 'Tobacco', wt('C5', 'tobacco')], ['ORNAMENTAL', 'Petunia', wt('C5', 'petunia')]];
$('#uss').innerHTML = US.map(([k, v], i) => `<div class="us" id="us${i}" style="top:${92 + i * 92}px"><div class="uk">${k}</div><div class="uv">${v}</div></div>`).join('');

/* ---------- V: side by side ---------- */
const ftx = (s, x, y, str, fs = 34) => txt(s, x, y, str, { 'font-family': 'Poppins', 'font-size': fs, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' });
const cV = cmp($('#vc'), ['BRACKETS · LINE UNDER G', 'LINE ABOVE · LINE OVER G'], [
  ['', 'Marks', 'Brackets: fusion, same whorl', 'Line above: adhesion', wt('V1', 'brackets'), wt('V2', 'line'),
    s => { ftx(s, 65, 64, 'K(5)'); }, s => { ftx(s, 65, 68, 'C  A'); mk(s, 'path', { d: 'M34,36 C40,22 90,22 96,36', stroke: C.ac, 'stroke-width': 4, fill: 'none' }); }],
  ['', 'Example', 'Five sepals in one cup', 'Stamens fixed on petals', wt('V1', 'like'), wt('V2', 'like'),
    s => { for (let k = 0; k < 5; k++) mk(s, 'path', { d: band(65, 50, 26, 40, -90 + k * 72 - 30, -90 + k * 72 + 30), fill: SEP, stroke: BR, 'stroke-width': 2 }); mk(s, 'circle', { cx: 65, cy: 50, r: 33, fill: 'none', stroke: '#4E7A34', 'stroke-width': 3 }); },
    s => { mk(s, 'path', { d: 'M30,84 C30,40 50,16 65,16 C80,16 100,40 100,84 Z', fill: PET, stroke: BR, 'stroke-width': 2.5 }); mk(s, 'path', { d: 'M65,80 L65,40', stroke: '#9FBF7A', 'stroke-width': 5 }); mk(s, 'ellipse', { cx: 65, cy: 34, rx: 9, ry: 13, fill: ANTH, stroke: BR, 'stroke-width': 2 }); }],
  ['', 'Ovary', 'Line under G: superior (brinjal)', 'Line over G: inferior (guava)', wt('V3', 'superior'), wt('V3', 'inferior'),
    s => { mk(s, 'path', { d: 'M20,76 L110,76', stroke: '#4E7A34', 'stroke-width': 4 }); mk(s, 'ellipse', { cx: 65, cy: 54, rx: 18, ry: 20, fill: OVW, stroke: '#1F5E37', 'stroke-width': 3 }); mk(s, 'path', { d: 'M30,76 C30,60 40,60 44,70 M100,76 C100,60 90,60 86,70', stroke: BR, 'stroke-width': 2.5, fill: PET }); },
    s => { mk(s, 'path', { d: 'M20,40 L110,40', stroke: '#4E7A34', 'stroke-width': 4 }); mk(s, 'ellipse', { cx: 65, cy: 66, rx: 18, ry: 20, fill: OVW, stroke: '#1F5E37', 'stroke-width': 3 }); mk(s, 'path', { d: 'M30,40 C30,22 40,22 44,32 M100,40 C100,22 90,22 86,32', stroke: BR, 'stroke-width': 2.5, fill: PET }); }]], 'v');
const th1 = PUC.think($('#th1'), { q: 'A formula shows C(5), and a line joining C to A. Which mark shows adhesion?', opts: ['The brackets', 'The line'], right: 1, why: 'The line: it joins stamens to petals, two different whorls. The brackets show fusion inside one whorl.' });

/* ---------- W: worked example (makoi) ---------- */
const ws = sv('wkS'), WK = {}, WC = [270, 320];
WK.sep = mk(ws, 'g', {}); for (let k = 0; k < 5; k++) { const a = -90 + 36 + k * 72, [x, y] = P2(WC[0], WC[1], 70, a); mk(WK.sep, 'ellipse', { cx: x, cy: y, rx: 22, ry: 46, fill: SEP, stroke: BR, 'stroke-width': 3, transform: `rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})` }); }
WK.pet = mk(ws, 'g', {}); for (let k = 0; k < 5; k++) { const a = -90 + k * 72, [x, y] = P2(WC[0], WC[1], 104, a); mk(WK.pet, 'path', { d: `M${WC[0]},${WC[1] - 30} C${WC[0] - 50},${WC[1] - 80} ${WC[0] - 34},${WC[1] - 170} ${WC[0]},${WC[1] - 190} C${WC[0] + 34},${WC[1] - 170} ${WC[0] + 50},${WC[1] - 80} ${WC[0]},${WC[1] - 30} Z`, fill: '#FFFFFF', stroke: BR, 'stroke-width': 3.5, transform: `rotate(${k * 72} ${WC[0]} ${WC[1]})` }); }
WK.and = mk(ws, 'g', {}); for (let k = 0; k < 5; k++) mk(WK.and, 'path', { d: `M${WC[0] - 9},${WC[1] - 4} L${WC[0]},${WC[1] - 60} L${WC[0] + 9},${WC[1] - 4} Z`, fill: '#F2C744', stroke: BR, 'stroke-width': 2.5, transform: `rotate(${k * 72} ${WC[0]} ${WC[1]})` });
WK.gyn = mk(ws, 'circle', { cx: WC[0], cy: WC[1], r: 14, fill: OVW, stroke: '#1F5E37', 'stroke-width': 3 });
WK.L = txt(ws, WC[0], 556, 'MAKOI FLOWER · FROM ABOVE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.mute, 'font-weight': 600 });
const WR = [['Same all round, both sexes', ['act', 'bi'], wt('W2', 11), null], ['Five sepals, joined', [['K', '(5)']], wt('W3', 3), WK.sep], ['Five petals, joined', [['C', '(5)']], wt('W4', 3), WK.pet],
  ['Five stamens on the petals', [{ adh: [['C', '(5)'], ['A', '5']] }], wt('W5', 5), WK.and], ['Two fused carpels, superior', [['G', '(2)', 'sup']], wt('W6', 8), WK.gyn]];
$('#wrs').innerHTML = WR.map(([c, tk], i) => `<div class="wr" id="wr${i}" style="top:${88 + i * 76}px"><div class="wc">${c}</div><div class="wf">${fml(tk)}</div></div>`).join('');
$('#wF').innerHTML = `<span class="wn">MAKOI</span>${fml(['act', 'bi', ['K', '(5)'], { adh: [['C', '(5)'], ['A', '5']] }, ['G', '(2)', 'sup']])}`;

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ const k5 = txt(TP, 150, 140, '', { 'font-family': 'Poppins', 'font-size': 52, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' }); k5.innerHTML = 'K<tspan fill="' + C.ac + '">(5)</tspan>';
  txt(TP, 370, 140, 'C(5) A5', { 'font-family': 'Poppins', 'font-size': 52, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' }); mk(TP, 'path', { d: 'M290,92 C300,66 440,66 452,92', stroke: C.ac, 'stroke-width': 5, fill: 'none' });
  txt(TP, 150, 214, 'FUSION', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); txt(TP, 370, 214, 'ADHESION', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['tomato', 'A tomato', 'RED', 'tomato'], ['brinjal', 'A brinjal', 'PURPLE', 'brinjal'], ['potato', 'A potato', 'UNDER THE SOIL', 'potato']],
  learn: [['read', 'Read', 'read'], ['pen', 'Write', 'write'], ['flower', 'Family', 'Solanaceae']],
  hookW: 'JEE', split: ['formula', 'line'], st: ['Brackets', 'line'],
  cam: [[tPs[4] - 0.2, 1.04, 960, 600], [T0('C1') - 0.7, 1, 960, 540]],
  hook: t => { M.vis(HL.t, t, wt('H2', 'red') - 0.2, 1e9, { ...POP, sc: 0.8 }); M.vis(HL.b, t, wt('H2', 'purple') - 0.2, 1e9, { ...POP, sc: 0.8 }); M.vis(HL.p, t, wt('H2', 'grows') - 0.1, 1e9, { dy: 30 });
    M.vis($('#hlt0'), t, wt('H2', 'red'), 1e9, POP); M.vis($('#hlt1'), t, wt('H2', 'purple'), 1e9, POP); M.vis($('#hlt2'), t, wt('H2', 'soil'), 1e9, POP); M.vis($('#hlP'), t, wt('H2', 'same') - 0.1, 1e9, POP); },
  measure: () => { [['hlt0', 160, 448], ['hlt1', 400, 448], ['hlt2', 634, 448]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); DQ.forEach((d, i) => M.vis($('#dq' + i), t, wt('D2', d[2]) - 0.15, 1e9, { dx: -24, dy: 0 }));
      M.vis($('#dlP'), t, wt('D3', 'formula'), 1e9, POP);
      M.vis($('#dr'), t, wt('D3', 'diagram') - 0.4, out, { dx: 60, dy: 0, ...o });
      const tA = wt('D4', 'dot'), tc = wt('D4', 'calyx'), tg = wt('D4', 'gynoecium');
      M.vis(DF.ax, t, tA - 0.1, 1e9, { ...POP, sc: 0.2 }); M.vis(DF.cal, t, tc - 0.2, 1e9, { ...POP, sc: 0.9 });
      M.vis(DF.cor, t, tc + (tg - tc) * 0.3, 1e9, { ...POP, sc: 0.9 }); M.vis(DF.and, t, tc + (tg - tc) * 0.65, 1e9, { ...POP, sc: 0.9 }); M.vis(DF.epi, t, tc + (tg - tc) * 0.65, 1e9, { dy: 0, fade: 0.3 }); M.vis(DF.gyn, t, tg - 0.2, 1e9, { ...POP, sc: 0.6 });
      M.vis(DF.calR, t, tc, 1e9, { dy: 0, fade: 0.3 }); M.vis(DF.corR, t, tc, 1e9, { dy: 0, fade: 0.3 });
      labRun(DL[0], t, wt('D4', 'mother')); labRun(DL[1], t, tc); labRun(DL[2], t, tg); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zl'), t, T0('Z1') + 0.05, out, { dy: 36, ...o }); const cur = curOf(t, ZT.map(z => z[3]), 0.2);
      ZT.forEach((z, i) => { const el = $('#zt' + i); M.vis(el, t, T0('Z1') + 0.5 + i * 0.08, 1e9, { dy: 18 }); const dk = (0.25 + 0.75 * M.clamp((t - z[3] + 0.2) / 0.3)).toFixed(3); el.querySelectorAll('.zs,.zn,.zm').forEach(c => { c.style.opacity = dk; }); el.style.background = i === cur ? C.ac3 : C.soft; el.style.boxShadow = i === cur ? `0 0 0 3px ${C.ac}` : 'none'; }); }],
    ['#sP', T0('P1'), T0('C1') + 0.1, t => { const out = OUT('C1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PF.ax, t, T0('P1') + 0.6, 1e9, { ...POP, sc: 0.2 }); labRun(PL[0], t, T0('P1') + 0.8, tPs[0] - 0.2);
      PT.forEach((e, i) => { const s = tokStage[i], tin = tPs[s] + (i === 1 ? wt('P2', 'bisexual') - tPs[0] : 0.1); M.vis(e, t, tin, 1e9, { ...POP, sc: 0.5 }); e.style.color = st === s ? C.ac : C.ink; });
      PADH.style.borderTopColor = t > wt('P5', 'line') ? (st === 3 ? C.ac : C.ink) : 'transparent';
      ringOf.forEach((g, i) => { if (!g) return; M.vis(g, t, tPs[i] + 0.2, 1e9, { ...POP, sc: 0.85 });
        const on = st === i, w = on ? 3 + 2 * (0.5 + 0.5 * Math.sin((t - tPs[i]) * 5)) : 3; g.querySelectorAll('path,ellipse,circle').forEach(e => { if (e.getAttribute('fill') !== 'none') attr(e, 'stroke-width', w.toFixed(2)); }); });
      M.vis(PF.calR, t, wt('P3', 'joined'), 1e9, { dy: 0, fade: 0.3 }); M.vis(PF.corR, t, wt('P4', 'joined'), 1e9, { dy: 0, fade: 0.3 }); M.vis(PF.epi, t, wt('P5', 'fixed'), 1e9, { dy: 0, fade: 0.3 });
      [1, 2, 3, 4].forEach(i => labRun(PL[i], t, tPs[i] + 0.9));
      // stage 1: a cut line sweeps round the flower (any plane gives equal halves)
      if (!PF.cut) PF.cut = mk(ps, 'path', { d: '', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '12 9', fill: 'none' });
      { const a = 90 + ((t - tPs[0]) * 40) % 180, [x1, y1] = P2(400, 334, 190, a), [x2, y2] = P2(400, 334, 190, a + 180); attr(PF.cut, 'd', `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`); PF.cut.style.opacity = st === 0 && t > tPs[0] + 0.3 ? 1 : 0; } }],
    ['#sC', T0('C1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#cl'), t, T0('C1') + 0.1, out, { dx: -60, dy: 0, ...o }); CQ.forEach((c, i) => M.vis($('#cq' + i), t, c[2] - 0.15, 1e9, { dx: -24, dy: 0 }));
      M.vis($('#cr'), t, T0('C2') + 0.2, out, { dx: 60, dy: 0, ...o });
      M.vis(CR.p, t, wt('C3', 'potato') - 0.2, T0('C4') - 0.1, { dy: 20, outDur: 0.25 }); CR.pl.forEach((l, i) => labRun(l, t, wt('C3', i ? 'stem' : 'potato') + 0.4 + i * 0.6, T0('C4') - 0.3));
      CR.eyes.forEach(e => attr(e, 'stroke-width', t > wt('C3', 'potato') + 0.4 && t < wt('C3', 'potato') + 1.6 ? 6 : 3.5));
      M.vis(CR.b, t, T0('C4') + 0.1, T0('C5') - 0.1, { ...POP, sc: 0.8, outDur: 0.25 }); CR.bl.forEach((l, i) => labRun(l, t, wt('C4', i ? 'many' : 'berries') + 0.1, T0('C5') - 0.3));
      US.forEach((u, i) => M.vis($('#us' + i), t, u[2] - 0.15, 1e9, { dx: 24, dy: 0 }));
      $('#crL').textContent = t < T0('C3') ? 'INSIDE THE FAMILY' : t < T0('C4') ? 'POTATO · A STEM UNDER THE SOIL' : t < T0('C5') ? 'TOMATO · A BERRY, CUT ACROSS' : 'USES OF THE FAMILY';
    }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V4'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V4') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V4'), tOpts: wt('V4', 'which') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'joins') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wk'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o });
      [WK.sep, WK.pet, WK.and, WK.gyn].forEach((g, i) => M.vis(g, t, T0('W1') + 0.5 + i * 0.25, 1e9, { ...POP, sc: 0.8 })); M.vis(WK.L, t, T0('W1') + 1.4, 1e9, { dy: 8 });
      const cur = curOf(t, WR.map(w => w[2]), 0.3);
      WR.forEach((w, i) => { const el = $('#wr' + i); M.vis(el, t, w[2] - 0.3, 1e9, { dx: -24, dy: 0 }); el.style.background = i === cur && t < T0('W7') ? C.ac3 : C.soft;
        M.vis(el.querySelector('.wf'), t, w[2], 1e9, { ...POP, sc: 0.5 });
        if (w[3]) { const on = i === cur && t < T0('W7'), sw = on ? 3 + 2 * (0.5 + 0.5 * Math.sin(t * 6)) : 3; (w[3].tagName === 'g' ? w[3].querySelectorAll('*') : [w[3]]).forEach(e => attr(e, 'stroke-width', sw.toFixed(2))); } });
      M.vis($('#wF'), t, T0('W7') + 0.2, 1e9, { dy: 24 }); }],
  ],
  exam: { wrong: 'A line drawn above the symbols means fusion', right: 'Brackets mean fusion. A line above means adhesion', tRight: wt('X3', 'brackets') - 0.1,
    type: 'Reading a floral formula; matching a description to its family', tType: wt('E1', 'formula'),
    xRun: t => M.vis(TP, t, wt('X3', 'fusion') - 0.1, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which statement about Solanaceae is correct?', cols: 1, optW: 968, optH: 76, optFs: 26, optY: 220,
      opts: ['Epipetalous stamens; superior, bicarpellary ovary; axile', 'Ovary inferior, with parietal placentation', 'Sepals free, falling off soon after flowering', 'Fruit a legume; seeds without endosperm'], right: 0 },
    tOpts: wt('Q1', 'Which') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['Line joining A to C: <b>epipetalous</b>'], ['Line below G: <b>superior</b> ovary'], ['Two rooms: <b>axile</b> placentation'], ['K(5): sepals joined, <b>persistent</b>']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 'epipetalous'), wt('A2', 'below'), wt('A3', 'two'), wt('A3', 'five')],
    recapT: 'Recap · floral formula and Solanaceae',
    recap: ['<b>Floral formula</b>: a one line code · <b>floral diagram</b>: rings seen from above, mother axis on top', '<b>Symbols</b>: Br bract · circle with cross actinomorphic · % zygomorphic · K, C, P, A, G',
      '<b>( )</b> fusion, same whorl · <b>line above</b> adhesion, two whorls · <b>line under G</b> superior ovary', '<b>Solanaceae</b>: K(5) persistent · C(5) · A5 epipetalous · G(2) superior, axile, swollen placenta',
      '<b>Uses</b>: tomato, brinjal, potato · chilli · belladonna, ashwagandha · tobacco · petunia'],
    yq: ['What does a circle with a cross mean in a floral formula?', 'How is adhesion shown in a floral formula?', 'Write the floral formula of Solanaceae.'],
    nextL: 'NEXT · EP 48', nextT: 'Why does a pea flower look like a butterfly? Fabaceae and Liliaceae' },
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
