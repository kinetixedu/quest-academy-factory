// PUC Biology Ep 48: Families Fabaceae and Liliaceae (Living diagram, leaf green)
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


/* ===== Ep 48: families Fabaceae and Liliaceae ===== */
Object.assign(M.IC, {
  pod: ['M3 14c4-6 12-8 18-6-2 6-10 9-18 6Z', 'M8 12h.01M12 11h.01M16 10h.01'],
  onion: ['M12 4c0 4 7 6 7 11a7 7 0 0 1-14 0c0-5 7-7 7-11Z', 'M12 4V2M10 21l2-2 2 2'],
  bowl: ['M3 11h18a9 9 0 0 1-18 0Z', 'M8 8c1-2 3-2 4 0s3 2 4 0'],
  read: ['M4 6h16', 'M4 11h16', 'M4 16h10'],
  formula: ['M4 7h5M6.5 7v10', 'M12 12h3', 'M18 7l-2 10'],
  kitchen: ['M4 10h16v10H4Z', 'M8 10V6a4 4 0 0 1 8 0v4'],
  seed: ['M12 3c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z', 'M12 7c-2 2-2 8 0 10'],
  aloe: ['M12 21C10 14 6 10 4 9c3 1 6 4 8 8 2-4 5-7 8-8-2 1-6 5-8 12Z', 'M12 17V5'],
  nut: ['M8 4c3 0 4 3 4 5s1 3 4 3 4 3 4 5-2 4-5 4-4-3-4-5-1-3-4-3-4-3-4-5 2-4 5-4Z'],
  tulip: ['M12 13c-4 0-6-3-6-8 2 1 4 3 6 3s4-2 6-3c0 5-2 8-6 8Z', 'M12 13v8M12 18c-3-1-5-3-6-5'],
  drop: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z'],
  flask: ['M9 3h6M10 3v6l-5 10h14l-5-10V3', 'M7.5 15h9'],
});
const sv = id => $('#' + id);
const SEP = LEAF, STD = '#F6C9D6', WNG = '#E59BB4', KEL = '#F2DDE6', NOD = '#E8A0A0', SOIL = '#E9DCC3', TEP = '#F7C9A9';
const rad = a => a * Math.PI / 180, P2 = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
const band = (cx, cy, r1, r2, a0, a1) => { const f = v => v.toFixed(1), [x1, y1] = P2(cx, cy, r2, a0), [x2, y2] = P2(cx, cy, r2, a1), [x3, y3] = P2(cx, cy, r1, a1), [x4, y4] = P2(cx, cy, r1, a0), [mx, my] = P2(cx, cy, r2 + 8, (a0 + a1) / 2);
  return `M${f(x1)},${f(y1)} Q${f(mx)},${f(my)} ${f(x2)},${f(y2)} L${f(x3)},${f(y3)} A${r1} ${r1} 0 0 0 ${f(x4)},${f(y4)} Z`; };
const box = (p, x, y, w, h, s, fill, col) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x, y, width: w, height: h, rx: 14, fill }); txt(g, x + w / 2, y + h / 2 + 11, s, { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: col, 'text-anchor': 'middle' }); return g; };

/* ---------- H: pea pod, dal, onion ---------- */
const hl = sv('hlS'), HL = {};
HL.a = mk(hl, 'g', {}); { const g = HL.a; mk(g, 'path', { d: 'M70,330 C110,250 220,220 260,250 C230,320 140,360 70,330 Z', fill: '#9CCB6E', stroke: BR, 'stroke-width': 4 });
  [[118, 312], [154, 296], [190, 280], [224, 264]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 17, fill: '#7FB85A', stroke: BR, 'stroke-width': 3 })); mk(g, 'path', { d: 'M260,250 C270,236 282,230 292,232', stroke: '#4E7A34', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }); }
HL.b = mk(hl, 'g', {}); { const g = HL.b; mk(g, 'ellipse', { cx: 400, cy: 280, rx: 100, ry: 22, fill: '#F2B33D', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M300,282 C306,350 350,380 400,380 C450,380 494,350 500,282 C470,300 330,300 300,282 Z', fill: '#C9D3E0', stroke: BR, 'stroke-width': 4 }); mk(g, 'path', { d: 'M360,380 L440,380 L432,396 L368,396 Z', fill: '#AEB8C6', stroke: BR, 'stroke-width': 3 });
  [[370, 276], [404, 270], [430, 282], [388, 286]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 5, fill: '#D9962B' })); }
HL.c = mk(hl, 'g', {}); { const g = HL.c; mk(g, 'path', { d: 'M634,210 C640,250 700,270 704,320 C708,370 670,396 634,396 C598,396 560,370 564,320 C568,270 628,250 634,210 Z', fill: '#C98AB0', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M634,226 C620,280 612,340 622,392 M634,226 C650,280 660,340 648,392', stroke: '#A0638A', 'stroke-width': 3, fill: 'none' }); mk(g, 'path', { d: 'M634,210 C632,190 640,176 652,168', stroke: '#8FB86A', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M620,396 l-6,14 M634,398 l0,16 M648,396 l6,14', stroke: '#B79A6A', 'stroke-width': 3, 'stroke-linecap': 'round' }); }

/* ---------- D: Fabaceae plant ---------- */
const DQ = [['Habit', 'Trees, shrubs, herbs', wt('D3', 'trees')], ['Roots', 'With root nodules', wt('D3', 'nodules')], ['Leaves', 'Pinnately compound or simple', wt('D4', 'pinnately')], ['Leaf base', 'Swollen: the pulvinus', wt('D4', 'pulvinus')], ['Stipules', 'Small and leafy', wt('D4', 'stipules')]];
$('#dqs').innerHTML = DQ.map(([k, v], i) => `<div class="dq" id="dq${i}" style="top:${150 + i * 78}px"><div class="dk"><span class="dn">${i + 1}</span>${k}</div><div class="dv">${v}</div></div>`).join('');
const dr = sv('drS'), DR = {};
DR.tr = mk(dr, 'g', {}); DR.t0 = box(DR.tr, 232, 120, 320, 76, 'Leguminosae', C.ink, '#FFFFFF'); DR.ln = mk(DR.tr, 'path', { d: 'M392,196 L392,262', stroke: C.dim, 'stroke-width': 3 });
DR.t1 = box(DR.tr, 212, 262, 360, 76, 'Papilionoideae', C.ac2, '#1F6B3F'); DR.ar = mk(DR.tr, 'path', { d: 'M392,338 L392,400 M378,386 L392,400 L406,386', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
DR.t2 = box(DR.tr, 252, 404, 280, 76, 'Fabaceae', C.ac, '#FFFFFF');
DR.pl = mk(dr, 'g', {}); { const g = DR.pl; mk(g, 'rect', { x: 36, y: 352, width: 712, height: 192, rx: 10, fill: SOIL }); mk(g, 'path', { d: 'M36,352 L748,352', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M220,352 L220,110', stroke: '#4E7A34', 'stroke-width': 9, 'stroke-linecap': 'round' });
  DR.rt = mk(g, 'g', {}); mk(DR.rt, 'path', { d: 'M220,352 L220,520 M220,400 C190,420 170,450 160,500 M220,430 C250,450 280,470 300,520 M220,470 C200,490 196,510 190,530', stroke: '#B79A6A', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  DR.nod = [[176, 456], [246, 446], [274, 480], [214, 492], [196, 520]].map(([x, y]) => mk(DR.rt, 'circle', { cx: x, cy: y, r: 10, fill: NOD, stroke: BR, 'stroke-width': 2.5 }));
  DR.lf = mk(g, 'g', {}); mk(DR.lf, 'path', { d: 'M232,190 L640,190', stroke: '#4E7A34', 'stroke-width': 5 });
  [340, 440, 540].forEach(x => { mk(DR.lf, 'ellipse', { cx: x, cy: 150, rx: 26, ry: 40, fill: LEAF, stroke: BR, 'stroke-width': 3, transform: `rotate(-20 ${x} 150)` }); mk(DR.lf, 'ellipse', { cx: x, cy: 230, rx: 26, ry: 40, fill: LEAF, stroke: BR, 'stroke-width': 3, transform: `rotate(20 ${x} 230)` }); });
  mk(DR.lf, 'ellipse', { cx: 672, cy: 190, rx: 40, ry: 26, fill: LEAF, stroke: BR, 'stroke-width': 3 });
  DR.pul = mk(g, 'ellipse', { cx: 236, cy: 190, rx: 16, ry: 12, fill: '#6FA35A', stroke: BR, 'stroke-width': 3 });
  DR.stp = mk(g, 'g', {}); mk(DR.stp, 'path', { d: 'M218,206 C190,206 176,226 180,248 C200,246 216,230 218,206 Z', fill: '#B9DB9B', stroke: BR, 'stroke-width': 2.5 }); mk(DR.stp, 'path', { d: 'M222,206 C250,206 264,226 260,248 C240,246 224,230 222,206 Z', fill: '#B9DB9B', stroke: BR, 'stroke-width': 2.5 });
  DR.L = [lab(g, 246, 446, 380, 440, 'Root nodules'), lab(g, 540, 150, 590, 80, 'Leaflets'), lab(g, 240, 186, 250, 74, 'Pulvinus'), lab(g, 254, 236, 330, 300, 'Stipules')]; }

/* ---------- Z: pea flower part by part ---------- */
const ZN = ['FLOWER', 'PETALS', 'STAMENS', 'CARPEL'];
const zSet = chips('#zch', ZN, 'zc', true);
const tZ = ['Z2', 'Z3', 'Z4', 'Z5'].map(T0);
const zStack = stack('#lvs', 'lvi', [['PART 1 OF 4', 'Pea flower', 'Bisexual and zygomorphic. Five sepals, joined.', 'K(5)'],
  ['PART 2 OF 4', 'Petals', 'Five: 1 standard, 2 wings, 2 keel. Vexillary.', 'C1+2+(2)'],
  ['PART 3 OF 4', 'Stamens', 'Ten: nine joined, one free. Diadelphous.', 'A(9)+1'],
  ['PART 4 OF 4', 'Carpel', 'One carpel. Superior ovary, one room, many ovules.', 'G1 · the fruit is a legume']]);
const zs = sv('zS'), ZF = {}, FC = [420, 270];
ZF.f = mk(zs, 'g', {});
ZF.cal = mk(ZF.f, 'path', { d: 'M360,420 L340,470 L372,444 L390,486 L420,448 L450,486 L468,444 L500,470 L480,420 Z', fill: SEP, stroke: BR, 'stroke-width': 3 });
ZF.std = mk(ZF.f, 'path', { d: 'M420,320 C300,330 230,250 250,160 C270,80 360,50 420,92 C480,50 570,80 590,160 C610,250 540,330 420,320 Z', fill: STD, stroke: BR, 'stroke-width': 3.5 });
ZF.stdV = mk(ZF.f, 'path', { d: 'M420,110 L420,300 M420,200 C380,180 340,170 300,180 M420,200 C460,180 500,170 540,180', stroke: '#D98CA6', 'stroke-width': 2.5, fill: 'none' });
ZF.wl = mk(ZF.f, 'ellipse', { cx: 350, cy: 330, rx: 62, ry: 92, fill: WNG, stroke: BR, 'stroke-width': 3.5, transform: 'rotate(28 350 330)' });
ZF.wr = mk(ZF.f, 'ellipse', { cx: 490, cy: 330, rx: 62, ry: 92, fill: WNG, stroke: BR, 'stroke-width': 3.5, transform: 'rotate(-28 490 330)' });
ZF.kl = mk(ZF.f, 'path', { d: 'M420,280 C396,300 380,370 390,420 C400,440 414,442 420,436 Z', fill: KEL, stroke: BR, 'stroke-width': 3 });
ZF.kr = mk(ZF.f, 'path', { d: 'M420,280 C444,300 460,370 450,420 C440,440 426,442 420,436 Z', fill: KEL, stroke: BR, 'stroke-width': 3 });
ZF.sym = mk(zs, 'path', { d: 'M420,30 L420,506', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '12 9' });
ZF.L0 = [lab(zs, 420, 60, 640, 60, 'Only one plane'), lab(zs, 470, 460, 640, 470, 'Calyx: 5, joined')];
ZF.L1 = [lab(zs, 520, 110, 700, 70, 'Standard (1)'), lab(zs, 600, 330, 740, 300, 'Wings (2)'), lab(zs, 450, 460, 640, 480, 'Keel (2)')];
ZF.st = mk(zs, 'g', {}); { const g = ZF.st; mk(g, 'path', { d: 'M180,420 C330,420 470,380 560,262', stroke: '#E9D27E', 'stroke-width': 40, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M180,420 C330,420 470,380 560,262', stroke: BR, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '2 0' });
  for (let k = 0; k < 9; k++) { const a = -110 + k * 13, [x, y] = P2(560, 262, 70, a); mk(g, 'path', { d: `M560,262 L${x.toFixed(1)},${y.toFixed(1)}`, stroke: '#C9B25E', 'stroke-width': 4 }); mk(g, 'ellipse', { cx: x, cy: y, rx: 9, ry: 13, fill: ANTH, stroke: BR, 'stroke-width': 2.5, transform: `rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})` }); }
  ZF.free = mk(g, 'g', {}); mk(ZF.free, 'path', { d: 'M180,330 C320,330 440,290 520,170', stroke: '#C9B25E', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); mk(ZF.free, 'ellipse', { cx: 526, cy: 156, rx: 10, ry: 15, fill: ANTH, stroke: BR, 'stroke-width': 2.5, transform: 'rotate(30 526 156)' }); }
ZF.L2 = [lab(zs, 380, 410, 380, 470, '9 joined: one bundle', 'middle'), lab(zs, 400, 306, 640, 200, '1 free')];
ZF.dia = txt(zs, 820, 460, 'DIADELPHOUS', { 'text-anchor': 'middle', 'font-size': 26, 'letter-spacing': 2, fill: C.ac, 'font-weight': 600 });
ZF.cp = mk(zs, 'g', {}); { const g = ZF.cp; mk(g, 'path', { d: 'M170,300 C250,220 560,214 720,250 C760,260 760,300 720,310 C560,350 250,360 170,300 Z', fill: OVW, stroke: '#1F5E37', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M200,316 C330,340 560,330 712,300', stroke: '#1F5E37', 'stroke-width': 3, fill: 'none' });
  ZF.ov = [250, 330, 410, 490, 570, 650].map(x => mk(g, 'ellipse', { cx: x, cy: 300 + (x - 450) * (x - 450) * 0.00004, rx: 18, ry: 22, fill: OVL, stroke: BR, 'stroke-width': 2.5 }));
  mk(g, 'path', { d: 'M736,270 C780,240 800,190 790,140', stroke: '#9FD09A', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'ellipse', { cx: 788, cy: 132, rx: 18, ry: 12, fill: '#9FD09A', stroke: BR, 'stroke-width': 3 }); }
ZF.L3 = [lab(zs, 300, 262, 230, 130, 'Ovary: one room'), lab(zs, 490, 300, 560, 160, 'Many ovules in a row'), lab(zs, 790, 132, 900, 210, 'Stigma')];
ZF.pod = mk(zs, 'path', { d: 'M150,300 C240,196 580,190 740,240 C800,258 800,312 740,326 C580,370 240,380 150,300 Z', fill: 'none', stroke: '#6FA35A', 'stroke-width': 6, 'stroke-dasharray': '14 10' });
ZF.podL = txt(zs, 450, 430, 'BECOMES A POD: A LEGUME', { 'text-anchor': 'middle', 'font-size': 22, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 });
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So that is why peas sit in a row!' });

/* ---------- P: lily flower ring by ring ---------- */
const PN = ['PLANT', 'TEPALS', 'STAMENS', 'CARPELS', 'FRUIT'];
const pSet = chips('#pch', PN, 'pc', true);
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(T0);
const pStack = stack('#pis', 'pi', [['THE LILY FAMILY', 'Liliaceae', 'A monocot family. Build its flower, ring by ring.', ''],
  ['THE PLANT', 'Plant', 'Perennial herbs with bulbs, corms or rhizomes.', 'Leaves at the base, parallel veins'],
  ['STEP 1 OF 4', 'Tepals', 'Bisexual, actinomorphic. Six tepals, 3 + 3, often a tube.', 'Tepal: sepal and petal look alike'],
  ['STEP 2 OF 4', 'Stamens', 'Six, 3 + 3, fixed on the tepals: epitepalous.', ''],
  ['STEP 3 OF 4', 'Carpels', 'G(3): three fused carpels, superior ovary, three rooms.', 'Many ovules on the central axis: axile'],
  ['STEP 4 OF 4', 'Fruit', 'A capsule, rarely a berry. Seeds with endosperm.', '']]);
$('#fmP').innerHTML = fml(['act', 'bi', { adh: [['P', '(3+3)'], ['A', '3+3']] }, ['G', '(3)', 'sup']]);
const PT = [...$('#fmP').querySelectorAll('.ft')], PADH = $('#fmP').querySelector('.fadh'), tokStage = [1, 1, 1, 2, 3];
const ps = sv('pS'), PF = {}, LC = [400, 334];
PF.pl = mk(ps, 'g', {}); { const g = PF.pl; mk(g, 'rect', { x: 120, y: 400, width: 560, height: 110, rx: 10, fill: SOIL }); mk(g, 'path', { d: 'M120,400 L680,400', stroke: '#8A6A3A', 'stroke-width': 4 });
  mk(g, 'path', { d: 'M360,404 C330,420 330,470 400,478 C470,470 470,420 440,404 Z', fill: '#EAD9B8', stroke: BR, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M380,478 l-8,18 M400,480 l0,20 M420,478 l8,18', stroke: '#B79A6A', 'stroke-width': 3 });
  [[-1, 300, 160], [-1, 340, 110], [1, 460, 110], [1, 500, 160]].forEach(([s, x, y]) => { mk(g, 'path', { d: `M400,404 C${400 + s * 10},300 ${x - s * 10},${y + 60} ${x},${y} C${x + s * 30},${y + 70} ${400 + s * 30},300 ${400 + s * 14},404 Z`, fill: LEAF, stroke: BR, 'stroke-width': 3 });
    mk(g, 'path', { d: `M${400 + s * 5},400 C${400 + s * 14},310 ${x},${y + 80} ${x + s * 4},${y + 14}`, stroke: '#4E7A34', 'stroke-width': 1.8, fill: 'none' }); });
  mk(g, 'path', { d: 'M400,404 L400,90', stroke: '#4E7A34', 'stroke-width': 7 }); mk(g, 'path', { d: 'M400,92 C370,60 380,40 400,30 C420,40 430,60 400,92 Z', fill: TEP, stroke: BR, 'stroke-width': 3 });
  PF.plL = [lab(g, 400, 450, 600, 470, 'Bulb'), lab(g, 470, 200, 600, 200, 'Parallel veins')]; }
PF.ax = mk(ps, 'circle', { cx: LC[0], cy: LC[1] - 206, r: 10, fill: C.ink });
PF.tep = mk(ps, 'g', {}); PF.tR = mk(PF.tep, 'circle', { cx: LC[0], cy: LC[1], r: 136, fill: 'none', stroke: '#D9946A', 'stroke-width': 4 });
for (let k = 0; k < 3; k++) { const a = -90 + k * 120; mk(PF.tep, 'path', { d: band(LC[0], LC[1], 144, 174, a - 44, a + 44), fill: TEP, stroke: BR, 'stroke-width': 3 }); }
for (let k = 0; k < 3; k++) { const a = -30 + k * 120; mk(PF.tep, 'path', { d: band(LC[0], LC[1], 104, 132, a - 42, a + 42), fill: '#FADCC6', stroke: BR, 'stroke-width': 3 }); }
PF.and = mk(ps, 'g', {}); PF.epi = mk(ps, 'g', {});
[[0, 88, -90], [0, 88, 30], [0, 88, 150], [1, 70, -30], [1, 70, 90], [1, 70, 210]].forEach(([inner, r, a]) => { const [x, y] = P2(LC[0], LC[1], r, a), [ex, ey] = P2(LC[0], LC[1], inner ? 104 : 144, a);
  mk(PF.epi, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}`, stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const g = mk(PF.and, 'g', { transform: `rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})` }); mk(g, 'ellipse', { cx: x - 7, cy: y, rx: 7, ry: 12, fill: ANTH, stroke: BR, 'stroke-width': 2.5 }); mk(g, 'ellipse', { cx: x + 7, cy: y, rx: 7, ry: 12, fill: ANTH, stroke: BR, 'stroke-width': 2.5 }); });
PF.gyn = mk(ps, 'g', {}); mk(PF.gyn, 'circle', { cx: LC[0], cy: LC[1], r: 48, fill: OVW, stroke: '#1F5E37', 'stroke-width': 4 });
[-90, 30, 150].forEach(a => { const [x, y] = P2(LC[0], LC[1], 48, a); mk(PF.gyn, 'path', { d: `M${LC[0]},${LC[1]} L${x.toFixed(1)},${y.toFixed(1)}`, stroke: '#1F5E37', 'stroke-width': 3.5 }); });
[-30, 90, 210].forEach(a => [10, 22].forEach((r, j) => { const [x, y] = P2(LC[0], LC[1], r + 6, a + (j ? 18 : -18)); mk(PF.gyn, 'circle', { cx: x, cy: y, r: 4.5, fill: OVL, stroke: BR, 'stroke-width': 1.5 }); }));
PF.L = [lab(ps, 410, 128, 640, 150, 'Mother axis'), lab(ps, 556, 290, 640, 230, 'Six tepals, 3 + 3'), lab(ps, 470, 334, 640, 300, 'Stamen on a tepal'), lab(ps, 430, 350, 640, 400, 'Ovary: 3 rooms')];
PF.cap = mk(ps, 'g', {}); { const g = PF.cap; mk(g, 'path', { d: 'M880,200 C940,210 960,300 930,370 C910,410 850,410 830,370 C800,300 820,210 880,200 Z', fill: '#C7D99A', stroke: BR, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M880,204 C870,280 870,340 880,404 M880,204 C910,260 920,330 910,396 M880,204 C850,260 842,330 850,396', stroke: '#6F8F4A', 'stroke-width': 2.5, fill: 'none' }); mk(g, 'path', { d: 'M880,200 L880,180', stroke: '#4E7A34', 'stroke-width': 5 });
  txt(g, 880, 450, 'CAPSULE', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.6, fill: C.ac, 'font-weight': 600 }); }
const ringOf = [null, PF.tep, PF.and, PF.gyn, null];

/* ---------- V: side by side ---------- */
const mini = (s, k) => { if (k === 'zyg') { mk(s, 'path', { d: 'M65,58 C30,60 20,30 30,16 C40,4 60,8 65,20 C70,8 90,4 100,16 C110,30 100,60 65,58 Z', fill: STD, stroke: BR, 'stroke-width': 2.5 }); mk(s, 'path', { d: 'M65,6 L65,94', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); mk(s, 'path', { d: 'M65,56 C56,64 54,84 65,90 C76,84 74,64 65,56 Z', fill: KEL, stroke: BR, 'stroke-width': 2 }); }
  if (k === 'act') { for (let i = 0; i < 6; i++) { const a = -90 + i * 60; mk(s, 'path', { d: band(65, 50, 12, 38, a - 26, a + 26), fill: i % 2 ? '#FADCC6' : TEP, stroke: BR, 'stroke-width': 2 }); } [0, 60, 120].forEach(a => { const [x1, y1] = P2(65, 50, 48, a), [x2, y2] = P2(65, 50, 48, a + 180); mk(s, 'path', { d: `M${x1},${y1} L${x2},${y2}`, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }); }); }
  if (k === 'pea5') { mk(s, 'ellipse', { cx: 65, cy: 30, rx: 40, ry: 22, fill: STD, stroke: BR, 'stroke-width': 2 }); mk(s, 'ellipse', { cx: 34, cy: 62, rx: 14, ry: 22, fill: WNG, stroke: BR, 'stroke-width': 2 }); mk(s, 'ellipse', { cx: 96, cy: 62, rx: 14, ry: 22, fill: WNG, stroke: BR, 'stroke-width': 2 }); mk(s, 'path', { d: 'M65,58 C54,66 54,86 65,92 C76,86 76,66 65,58 Z', fill: KEL, stroke: BR, 'stroke-width': 2 }); }
  if (k === 'st91') { mk(s, 'path', { d: 'M14,72 C50,72 80,62 100,40', stroke: '#E9D27E', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' }); mk(s, 'path', { d: 'M14,44 C50,44 74,34 92,14', stroke: '#C9B25E', 'stroke-width': 3, fill: 'none' }); mk(s, 'ellipse', { cx: 104, cy: 34, rx: 6, ry: 9, fill: ANTH, stroke: BR, 'stroke-width': 1.5 }); mk(s, 'ellipse', { cx: 94, cy: 10, rx: 6, ry: 9, fill: ANTH, stroke: BR, 'stroke-width': 1.5 }); }
  if (k === 'st33') { for (let i = 0; i < 6; i++) { const [x, y] = P2(65, 50, i % 2 ? 22 : 36, -90 + i * 60); mk(s, 'ellipse', { cx: x, cy: y, rx: 6, ry: 9, fill: ANTH, stroke: BR, 'stroke-width': 1.5 }); } }
  if (k === 'g1') { mk(s, 'circle', { cx: 65, cy: 50, r: 34, fill: OVW, stroke: '#1F5E37', 'stroke-width': 3 }); mk(s, 'circle', { cx: 65, cy: 70, r: 6, fill: OVL, stroke: BR, 'stroke-width': 1.5 }); }
  if (k === 'g3') { mk(s, 'circle', { cx: 65, cy: 50, r: 34, fill: OVW, stroke: '#1F5E37', 'stroke-width': 3 }); [-90, 30, 150].forEach(a => { const [x, y] = P2(65, 50, 34, a); mk(s, 'path', { d: `M65,50 L${x.toFixed(1)},${y.toFixed(1)}`, stroke: '#1F5E37', 'stroke-width': 2.5 }); }); } };
const cV = cmp($('#vc'), ['FABACEAE · PEA', 'LILIACEAE · LILY'], [
  ['', 'Symmetry', 'Zygomorphic: one plane', 'Actinomorphic: many planes', wt('V1', 'pea'), wt('V1', 'lily'), s => mini(s, 'zyg'), s => mini(s, 'act')],
  ['', 'Petals', '5: standard, 2 wings, keel', '6 tepals, 3 + 3', wt('V2', 'Fabaceae'), wt('V2', 'Liliaceae'), s => mini(s, 'pea5'), s => mini(s, 'act')],
  ['', 'Stamens', '10: nine joined + one free', '6, on the tepals', wt('V3', 'Fabaceae'), wt('V3', 'Liliaceae'), s => mini(s, 'st91'), s => mini(s, 'st33')],
  ['', 'Ovary', '1 carpel, 1 room', '3 fused carpels, 3 rooms', wt('V4', 'Fabaceae'), wt('V4', 'Liliaceae'), s => mini(s, 'g1'), s => mini(s, 'g3')]], 'v', 92, 118);
const th1 = PUC.think($('#th1'), { q: 'A flower has stamens in the pattern nine plus one, and its fruit is a pod. Which family?', opts: ['Fabaceae', 'Liliaceae'], right: 0, why: 'Fabaceae. Nine plus one is diadelphous, and the pod is a legume.' });

/* ---------- W: worked example ---------- */
const sortW = sortB($('#wbd'), [['FABACEAE · PEA FAMILY', 'background:var(--ac2);color:#1F6B3F'], ['LILIACEAE · LILY FAMILY', 'background:var(--ink);color:#fff']], [
  ['seed', 'Gram', '<b>Pulse</b> · dal', 0, 0, wt('W2', 'Fabaceae')], ['aloe', 'Aloe', '<b>Medicine</b>', 1, 0, wt('W3', 'Liliaceae')],
  ['nut', 'Groundnut', '<b>Edible oil</b>', 0, 1, wt('W4', 'Fabaceae')], ['tulip', 'Tulip', '<b>Ornamental</b> · grown for flowers', 1, 1, wt('W5', 'Liliaceae')],
  ['drop', 'Indigofera', '<b>Dye</b>', 0, 2, wt('W6', 'Fabaceae')], ['flask', 'Colchicum autumnale', '<b>Colchicine</b>', 1, 2, wt('W7', 'Liliaceae')]]);

/* ---------- exam ---------- */
const tS = sv('tS'), TP = mk(tS, 'g', {});
{ const a = txt(TP, 120, 120, 'A10', { 'font-family': 'Poppins', 'font-size': 50, 'font-weight': 700, fill: C.red, 'text-anchor': 'middle' }); mk(TP, 'path', { d: 'M70,104 L170,104', stroke: C.red, 'stroke-width': 5 });
  const b = txt(TP, 360, 120, '', { 'font-family': 'Poppins', 'font-size': 50, 'font-weight': 700, fill: C.ink, 'text-anchor': 'middle' }); b.innerHTML = 'A<tspan fill="' + C.ac + '">(9)</tspan>+1';
  txt(TP, 120, 200, 'TEN FREE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.red, 'font-weight': 600 }); txt(TP, 360, 200, 'DIADELPHOUS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.2, fill: C.ac, 'font-weight': 600 }); }

const EP = {
  jobs: [['pod', 'A pea pod', 'GREEN', 'pea'], ['onion', 'An onion', 'LAYERED', 'onion'], ['bowl', 'A bowl of dal', 'A PULSE', 'bowl']],
  learn: [['read', 'Describe', 'describe'], ['formula', 'Formula', 'formulas'], ['kitchen', 'Kitchen', 'kitchen']],
  hookW: 'doctor', split: ['Fabaceae', 'Liliaceae'], st: ['Pea', 'Lily'],
  cam: [[tPs[3] - 0.2, 1.04, 960, 600], [T0('V1') - 0.7, 1, 960, 540]],
  hook: t => { M.vis(HL.b, t, wt('H2', 'Dal') - 0.1, 1e9, { ...POP, sc: 0.8 }); M.vis(HL.a, t, wt('H2', 'peas') - 0.1, 1e9, { ...POP, sc: 0.8 }); M.vis(HL.c, t, wt('H2', 'Onions') - 0.1, 1e9, { ...POP, sc: 0.8 });
    M.vis($('#hlt0'), t, wt('H2', 'family'), 1e9, POP); M.vis($('#hlt1'), t, wt('H2', 'family') + 0.15, 1e9, POP); M.vis($('#hlt2'), t, wt('H2', 'another'), 1e9, POP); M.vis($('#hlP'), t, wt('H2', 'another') + 0.3, 1e9, POP); },
  measure: () => { [['hlt0', 170, 448], ['hlt1', 400, 448], ['hlt2', 634, 448]].forEach(([id, cx, y]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = y + 'px'; }); },
  scenes: [
    ['#sD', T0('D1'), T0('Z1') + 0.1, t => { const out = OUT('Z1');
      M.vis($('#dl'), t, T0('D1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ghD'), t, wt('D1', 'current') - 0.1, 1e9, POP); M.vis($('#dlH'), t, T0('D1') + 0.3, 1e9, { dy: 16 });
      DQ.forEach((d, i) => { const el = $('#dq' + i); M.vis(el, t, T0('D1') + 0.8 + i * 0.1, 1e9, { dx: -24, dy: 0 }); const dk = (0.25 + 0.75 * M.clamp((t - d[2] + 0.15) / 0.3)).toFixed(3); el.querySelectorAll('.dk,.dv').forEach(c => { c.style.opacity = dk; }); el.style.background = t > d[2] - 0.15 && t < d[2] + 1.6 ? C.ac3 : C.soft; });
      M.vis($('#dr'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o }); $('#drL').textContent = t < T0('D3') - 0.2 ? 'AN OLDER NAME' : 'THE PLANT · LEAF AND ROOT';
      M.vis(DR.tr, t, T0('D2'), T0('D3') - 0.2, { dy: 16, outDur: 0.25 }); M.vis(DR.t0, t, wt('D2', 'Leguminosae') - 0.2, 1e9, POP); M.vis(DR.t1, t, wt('D2', 'Papilionoideae') - 0.2, 1e9, POP);
      M.draw(DR.ln, t, wt('D2', 'Leguminosae'), 0.4); M.draw(DR.ar, t, wt('D2', 'world') - 0.6, 0.4); M.vis(DR.t2, t, wt('D2', 'world') - 0.3, 1e9, POP);
      M.vis(DR.pl, t, T0('D3') + 0.1, 1e9, { dy: 20 }); M.vis(DR.rt, t, wt('D3', 'roots') - 0.2, 1e9, { dy: 0, fade: 0.3 }); DR.nod.forEach((n, i) => M.vis(n, t, wt('D3', 'lumps') + i * 0.12, 1e9, { ...POP, sc: 0.2 }));
      M.vis(DR.lf, t, wt('D4', 'leaves') - 0.1, 1e9, { ...POP, sc: 0.9 }); M.vis(DR.pul, t, wt('D4', 'swollen'), 1e9, { ...POP, sc: 0.2 }); M.vis(DR.stp, t, wt('D4', 'stipules') - 0.2, 1e9, { ...POP, sc: 0.3 });
      [wt('D3', 'nodules'), wt('D4', 'pinnately'), wt('D4', 'pulvinus'), wt('D4', 'stipules')].forEach((tt, i) => labRun(DR.L[i], t, tt)); }],
    ['#sZ', T0('Z1'), T0('P1') + 0.1, t => { const out = OUT('P1');
      M.vis($('#zch'), t, T0('Z1'), out, { dy: 12, ...o }); M.vis($('#zd'), t, T0('Z1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, T0('Z1') + 0.2, out, { dx: 60, dy: 0, ...o });
      zSet(curOf(t, tZ)); zStack(t, [T0('Z1') + 0.4, tZ[1] + 0.2, tZ[2] + 0.2, tZ[3] + 0.2]);
      M.vis(ZF.f, t, T0('Z1') + 0.4, tZ[2] - 0.1, { ...POP, sc: 0.85, outDur: 0.3 });
      const ex = M.io((t - wt('Z3', 'standard') + 0.6) / 0.9);
      attr(ZF.std, 'transform', `translate(0 ${(-40 * ex).toFixed(1)})`); attr(ZF.stdV, 'transform', `translate(0 ${(-40 * ex).toFixed(1)})`);
      attr(ZF.wl, 'transform', `translate(${(-110 * ex).toFixed(1)} 0) rotate(28 350 330)`); attr(ZF.wr, 'transform', `translate(${(110 * ex).toFixed(1)} 0) rotate(-28 490 330)`);
      attr(ZF.kl, 'transform', `translate(${(-14 * ex).toFixed(1)} ${(40 * ex).toFixed(1)})`); attr(ZF.kr, 'transform', `translate(${(14 * ex).toFixed(1)} ${(40 * ex).toFixed(1)})`); ZF.cal.style.opacity = (1 - ex).toFixed(3);
      M.vis(ZF.sym, t, wt('Z2', 'only') - 0.2, tZ[1] - 0.1, { dy: 0, fade: 0.3, outDur: 0.25 }); labRun(ZF.L0[0], t, wt('Z2', 'plane'), tZ[1] - 0.2); labRun(ZF.L0[1], t, wt('Z2', 'sepals'), tZ[1] - 0.2);
      [wt('Z3', 'standard'), wt('Z3', 'wings'), wt('Z3', 'keel')].forEach((tt, i) => labRun(ZF.L1[i], t, tt + 0.3, tZ[2] - 0.2));
      [ZF.std, ZF.wl, ZF.wr, ZF.kl].forEach((e, i) => { const tt = [wt('Z3', 'standard'), wt('Z3', 'wings'), wt('Z3', 'wings'), wt('Z3', 'keel')][i]; attr(e, 'stroke-width', t > tt && t < tt + 1.2 ? 6 : 3.5); }); attr(ZF.kr, 'stroke-width', t > wt('Z3', 'keel') && t < wt('Z3', 'keel') + 1.2 ? 6 : 3);
      M.vis(ZF.st, t, tZ[2] + 0.1, tZ[3] - 0.1, { ...POP, sc: 0.85, outDur: 0.3 }); M.vis(ZF.free, t, wt('Z4', 'one', 1) - 0.2, 1e9, { dy: -30 });
      labRun(ZF.L2[0], t, wt('Z4', 'Nine'), tZ[3] - 0.2); labRun(ZF.L2[1], t, wt('Z4', 'free'), tZ[3] - 0.2); M.vis(ZF.dia, t, wt('Z4', 'diadelphous') - 0.1, tZ[3] - 0.1, { ...POP, outDur: 0.25 });
      M.vis(ZF.cp, t, tZ[3] + 0.1, 1e9, { ...POP, sc: 0.85 }); ZF.ov.forEach((e, i) => M.vis(e, t, wt('Z5', 'ovules') - 0.3 + i * 0.08, 1e9, { ...POP, sc: 0.2 }));
      ZF.L3.forEach((l, i) => labRun(l, t, [wt('Z5', 'room'), wt('Z5', 'ovules'), wt('Z5', 'carpel')][i]));
      M.draw(ZF.pod, t, wt('Z5', 'pod') - 0.1, 0.8); M.vis(ZF.podL, t, wt('Z5', 'legume') - 0.1, 1e9, POP);
      avZ(t, T1('Z5') - 0.6, out); }],
    ['#sP', T0('P1'), T0('V1') + 0.1, t => { const out = OUT('V1');
      M.vis($('#pch'), t, T0('P1'), out, { dy: 12, ...o }); M.vis($('#pd'), t, T0('P1') + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, T0('P1') + 0.2, out, { dx: 60, dy: 0, ...o });
      const st = curOf(t, tPs); pSet(st); pStack(t, [T0('P1') + 0.4, ...tPs]);
      M.vis(PF.pl, t, T0('P1') + 0.5, tPs[1] - 0.1, { dy: 20, outDur: 0.3 }); labRun(PF.plL[0], t, wt('P2', 'bulbs'), tPs[1] - 0.3); labRun(PF.plL[1], t, wt('P2', 'parallel'), tPs[1] - 0.3);
      M.vis(PF.ax, t, tPs[1] + 0.2, 1e9, { ...POP, sc: 0.2 }); labRun(PF.L[0], t, tPs[1] + 0.4, tPs[4] - 0.2);
      PT.forEach((e, i) => { const s = tokStage[i], tin = i === 0 ? wt('P3', 'actinomorphic') : i === 1 ? wt('P3', 'bisexual') : i === 2 ? wt('P3', 'tepals') : tPs[s] + 0.1; M.vis(e, t, tin, 1e9, { ...POP, sc: 0.5 }); e.style.color = st === s ? C.ac : C.ink; });
      PADH.style.borderTopColor = t > wt('P4', 'fixed') ? (st === 2 ? C.ac : C.ink) : 'transparent';
      ringOf.forEach((g, i) => { if (!g) return; M.vis(g, t, tPs[i] + (i === 1 ? wt('P3', 'sepals') - 0.2 - tPs[1] : 0.2), 1e9, { ...POP, sc: 0.85 });
        const on = st === i, w = on ? 3 + 2 * (0.5 + 0.5 * Math.sin((t - tPs[i]) * 5)) : 3; g.querySelectorAll('path,ellipse,circle').forEach(e => { if (e.getAttribute('fill') !== 'none') attr(e, 'stroke-width', w.toFixed(2)); }); });
      M.vis(PF.tR, t, wt('P3', 'tube'), 1e9, { dy: 0, fade: 0.3 }); M.vis(PF.epi, t, wt('P4', 'fixed'), 1e9, { dy: 0, fade: 0.3 });
      labRun(PF.L[1], t, wt('P3', 'six') + 0.3, tPs[4] - 0.2); labRun(PF.L[2], t, wt('P4', 'fixed') + 0.2, tPs[4] - 0.2); labRun(PF.L[3], t, wt('P5', 'rooms'), tPs[4] - 0.2);
      M.vis(PF.cap, t, wt('P6', 'capsule') - 0.2, 1e9, { ...POP, sc: 0.6 }); }],
    ['#sV', T0('V1'), T0('T1') + 0.1, t => {
      M.vis($('#vc'), t, T0('V1') + 0.05, OUT('V5'), { dy: 36, ...o }); cV(t);
      M.vis($('#th1'), t, T0('V5') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
      th1(t, { tin: T0('V5'), tOpts: wt('V5', 'which') - 0.1, tCount: T1('V5') + 0.05, dur: 3, tAns: T0('V6') - 0.02, tWhy: wt('V6', 'nine') - 0.3 }); }],
    ['#sW', T0('W1'), T0('X1') + 0.1, t => { M.vis($('#wbd'), t, T0('W1') + 0.05, OUT('X1'), { dy: 36, ...o }); sortW(t); }],
  ],
  exam: { wrong: 'A pea flower has ten free stamens', right: 'Nine joined in one bundle, one free: diadelphous', tRight: wt('X3', 'nine') - 0.1,
    type: 'Describing a family; writing its floral formula (ISC papers)', tType: wt('E1', 'describing'),
    xRun: t => M.vis(TP, t, wt('X3', 'brackets') - 0.3, 1e9, { ...POP, sc: 0.5 }),
    mcq: { q: 'Which floral formula belongs to Liliaceae?', cols: 1, optW: 968, optH: 76, optFs: 26, optY: 210,
      opts: [fml(['act', 'bi', { adh: [['P', '(3+3)'], ['A', '3+3']] }, ['G', '(3)', 'sup']]), fml(['zyg', 'bi', ['K', '(5)'], ['C', '1+2+(2)'], ['A', '(9)+1'], ['G', '1', 'sup']]),
        fml(['act', 'bi', ['K', '(5)'], { adh: [['C', '(5)'], ['A', '5']] }, ['G', '(2)', 'sup']]), fml(['zyg', 'bi', ['P', '(3+3)'], ['A', '(9)+1'], ['G', '(3)', 'inf']])], right: 0 },
    tOpts: wt('Q1', 'Which') - 0.2,
    sol: [['Answer: <b style="color:var(--ok)">A</b>'], ['<b style="color:var(--red)">B</b>: Fabaceae, A(9)+1'], ['<b style="color:var(--red)">C</b>: Solanaceae, C(5)'], ['A: <b>P(3+3)</b>, six tepals'], ['A: <b>G(3)</b>, superior ovary']],
    tSo: [wt('A1', 3) + 0.1, wt('A2', 0), wt('A2', 8), wt('A3', 'six'), wt('A3', 'fused')],
    recapT: 'Recap · Fabaceae and Liliaceae',
    recap: ['<b>Fabaceae</b> (dicot): root nodules · pinnately compound leaves · pulvinus · stipules', '<b>Pea flower</b>: zygomorphic · K(5) C1+2+(2) A(9)+1 G1 · standard, 2 wings, keel · legume',
      '<b>Liliaceae</b> (monocot): bulbs, corms, rhizomes · basal leaves, parallel veins · capsule', '<b>Lily flower</b>: actinomorphic · P(3+3) A3+3 epitepalous · G(3) superior, axile',
      '<b>Uses</b>: gram, groundnut, Indigofera (Fabaceae) · aloe, tulip, colchicine (Liliaceae)'],
    yq: ['Name the three kinds of petals in a pea flower.', 'What does diadelphous mean?', 'Give two differences between Fabaceae and Liliaceae flowers.'],
    nextL: 'NEXT · EP 49', nextT: 'A cut lawn grows back from below: how? Meristematic Tissues' },
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
