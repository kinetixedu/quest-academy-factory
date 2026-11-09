// PUC Chemistry Ep 51 (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const place = (g, x, y, r = 0) => attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})${r ? ` rotate(${r.toFixed(2)})` : ''}`);
// line between two points that grows from a, trimmed by radii ra/rb
const seg = (l, a, b, ra, rb, u) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; const x1 = a[0] + ux * ra, y1 = a[1] + uy * ra, x2 = b[0] - ux * rb, y2 = b[1] - uy * rb;
  attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', (x1 + (x2 - x1) * u).toFixed(1)); attr(l, 'y2', (y1 + (y2 - y1) * u).toFixed(1)); M.hide(l, u <= 0.01); };
const pol = (o, r, a) => [o[0] + r * Math.cos(a * Math.PI / 180), o[1] + r * Math.sin(a * Math.PI / 180)];
// a lone card grows from full width (1600) to 784 at tS; inner keeps content centred while wide
const grow = (card, inner, t, tS) => { const sh = M.spring(t - tS, M.HEAVY), wv = M.lerp(1600, 784, sh); snap(card, 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); if (inner) snap(inner, 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); };
const wrapIn = (card, id) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); return d; };
const tag = (host, css) => { const b = document.createElement('div'); b.className = 'btag'; b.style.cssText = css; host.appendChild(b); return b; };
const tagRun = (el, t, list) => { let s = null; for (const [tt, v] of list) if (t >= tt) s = v; if (s) M.setT(el, s); };
Object.assign(M.IC, {
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  cup: ['M17 8h1a4 4 0 1 1 0 8h-1', 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z', 'M6 2v2', 'M10 2v2', 'M14 2v2'],
  bike: ['M5.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3 11.5V14l-3-3 4-3 2 3h2'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v1', 'M14 10V4a2 2 0 0 0-4 0v2', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  pan: ['M3 11h14v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z', 'M17 12h5'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
});

/* ---------- hook: title-card stories, then wide card shrinks beside the cast scene ----------
   cfg: jobs [[icon, name, words, ttitle]], rows: chip text fn(t) per row, kit [[icon, label, t]], hiKit index lit at tHi */
const hookBuild = cfg => {
  $('#jobs').innerHTML = cfg.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
  $('#jrs').innerHTML = cfg.jobs.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${cfg.chipL}</span><b id="eb${i}"></b></div></div>`).join('');
  $('#wqs').innerHTML = cfg.kit.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
  const lay = () => { let x = 36; cfg.kit.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); };
  let laid = false;
  return t => {
    if (!laid) { laid = true; lay(); }
    const o = { outDur: 0.3, ody: -16 };
    cfg.jobs.forEach((j, i) => M.vis($('#jb' + i), t, j[3] - 0.1, cfg.tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
    const on = t >= cfg.tMorph && t < cfg.tEnd + 0.1; M.hide($('#sH'), !on); if (!on) return;
    const out = cfg.tEnd - 0.32;
    M.vis($('#hj'), t, cfg.tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - cfg.tScene + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    cfg.jobs.forEach((_, i) => { M.vis($('#jr' + i), t, cfg.tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, cfg.tChip - 0.1 + i * 0.15, 1e9, POP); M.setT($('#eb' + i), cfg.chip(t, i)); });
    M.vis($('#hjP'), t, cfg.tPill - 0.1, 1e9, POP);
    M.vis($('#hk'), t, cfg.tScene - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, cfg.tScene + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, cfg.tScene + 0.2, 1e9, { ...POP, sc: 0.5 });
    cfg.kit.forEach((k, i) => { const el = $('#wq' + i); M.vis(el, t, k[2] - 0.1, cfg.tTz - 0.1, { ...POP, outDur: 0.25, ody: 0 }); if (i === cfg.hiKit) setBg(el, mix(C.soft, C.ac2, M.io((t - k[2]) / 0.3))); });
    M.vis($('#hTz'), t, cfg.tTz - 0.05, 1e9, POP);
  };
};

/* ---------- exam segment + ending (same in every episode) ---------- */
const endBuild = cfg => {
  const trap = PUC.trap($('#trap'), { wrong: cfg.wrong, right: cfg.right });
  const where = PUC.where($('#wa'), { on: cfg.on, type: cfg.type });
  const mcq = PUC.mcq($('#mq'), Object.assign({ pat: cfg.pat, right: cfg.ans, optW: 474, optY: 330, optH: 110, optFs: 36, qW: 780 }, cfg.mcq));
  const so = PUC.solution($('#so'), cfg.sol.map(s => [s]), { y0: 100, dy: cfg.solDy ?? 112 });
  const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: cfg.fTitle, y0: 96, dy: 74, txt: cfg.fLines.map((_, i) => i ? 1 : 0), lines: cfg.fLines });
  $('#yrs').innerHTML = cfg.yq.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
  const nx = PUC.next($('#sF'), { label: cfg.nextL, topic: cfg.nextT, y: 764 });
  const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
  const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
  let fit = false;
  const frame = t => {
    if (!fit) { fit = true;
      document.querySelectorAll('#sF .fcard .fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(29 * 1110 / l.offsetWidth) + 'px'; });
      document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
      const nt = $('#sF .next .nt'); if (nt) { nt.style.flex = 'none'; const av = 1600 - 10 - 64 - 40 - 48 - nt.offsetLeft; if (nt.offsetWidth > av) nt.style.fontSize = Math.floor(34 * av / nt.offsetWidth) + 'px'; }
      document.querySelectorAll('#trap .tx').forEach(l => { if (l.offsetWidth > 980) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 980 / l.offsetWidth) + 'px'; });
    }
    const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
    if (xOn) {
      M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
      trap(t, { tin: tX1, tWrong: cfg.tWrong, tStrike: cfg.tStrike, tRight: cfg.tRight });
      if (cfg.trapArt) cfg.trapArt(t);
      where(t, { tin: T0('E1'), tLight: cfg.tLight || [], tType: cfg.tType });
    }
    const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
    if (qOn) {
      M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
      mcq(t, { tin: tQ, tOpts: cfg.tOpts, tCount, tAns });
      M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
      so(t, tAns + 0.1, cfg.tSo);
    }
    const fOn = t >= tF; M.hide($('#sF'), !fOn);
    if (fOn) {
      fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: cfg.fLines.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
      M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
      tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
      nx(t, tN - 0.05);
    }
  };
  frame.sfx = () => { PUC.mcqSfx(tCount, tAns); };
  return frame;
};
const statement = (SW, words) => t => {
  const tT = T0('T1'), tW1 = T0('W1');
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, words[0] - 0.1, { st: 0.05 }); M.rise($('#st2'), t, words[1] - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, words[2], 0.8);
  }
};
// colour-coding (bench, KaTeX, readouts, recap): system / matter teal, boundary dashed teal, surroundings ink,
// heat out blue, heat in red, temperature orange, state functions teal, path functions (q, w) gold
const SY = C.ac, HO = '#2F6FEB', HI = C.red, TC = '#C8461B', PF = '#B7791F', VI = '#7A4FE0';
const tx = s => `\\text{${s}}`;
const Q_ = `\\textcolor{${PF}}{q}`, W_ = `\\textcolor{${PF}}{w}`;
// wavy heat arrow from (x,y) in direction d (1 right, -1 left), length L
const wave = (p, col) => { const g = mk(p, 'g', {}); const pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '16 10' }); const hd = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return { g, pa, hd }; };
const waveAt = (w, x, y, d, L) => { let s = `M${x} ${y}`; const n = 4, st = L / n; for (let k = 0; k < n; k++) s += ` q${(d * st / 2).toFixed(1)} ${k % 2 ? 12 : -12} ${(d * st).toFixed(1)} 0`; attr(w.pa, 'd', s); const ex = x + d * L; attr(w.hd, 'd', `M${ex - d * 14} ${y - 12} L${ex + d * 4} ${y} L${ex - d * 14} ${y + 12}`); };
const phase = (f, ta, t) => { if (t <= ta) return (t - ta) * f(ta); const n = Math.ceil((t - ta) / 0.05), dt = (t - ta) / n; let s = 0; for (let i = 0; i < n; i++) s += f(ta + (i + 0.5) * dt) * dt; return s; };
const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tV1 = T0('V1'), tB1 = T0('B1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tQ = T0('Q1');
const SW = [[tT, tW1], [tQ, tQ + 0.06], [T0('F1'), T0('F1') + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H ---------- */
const hook = hookBuild({
  jobs: [['cup', 'Open cup of tea', 'NO LID', wt('H1', 'cup')], ['box', 'Closed tiffin', 'SHUT TIGHT', wt('H1', 'tiffin')], ['thermo', 'Flask of tea', 'HOT ALL DAY', wt('H1', 'flask')]],
  chipL: 'LETS OUT', chip: () => '?', tChip: wt('H2', 'escape'),
  kit: [['clock', 'Shut at 7 am', wt('H4', 'seven')], ['x', 'Nothing got out', wt('H4', 'Nothing')], ['snow', 'Food is cold', wt('H4', 'cold')]], hiKit: 2,
  tMorph, tScene: T0('H3'), tPill: wt('H2', 'different'), tTz: wt('H5', 'heat'), tEnd: tP1,
});

/* ---------- P: chalk circle -> system ---------- */
const ps = $('#pS'), PC = [392, 250], PR = 150;
const toys = mk(ps, 'g', {});
[[-50, -20, C.red], [30, -40, '#2F6FEB'], [10, 40, '#B7791F'], [-60, 50, VI]].forEach(([x, y, c], i) => i % 2 ? mk(toys, 'rect', { x: PC[0] + x - 22, y: PC[1] + y - 22, width: 44, height: 44, rx: 8, fill: c }) : mk(toys, 'circle', { cx: PC[0] + x, cy: PC[1] + y, r: 24, fill: c }));
const bnd = mk(ps, 'circle', { cx: PC[0], cy: PC[1], r: PR, fill: 'none', stroke: SY, 'stroke-width': 5, 'stroke-dasharray': '18 12', 'stroke-linecap': 'round' });
const tif = mk(ps, 'g', {});
mk(tif, 'rect', { x: PC[0] - 70, y: PC[1] - 40, width: 140, height: 100, rx: 18, fill: '#DCE3EA', stroke: C.ink2, 'stroke-width': 4 });
mk(tif, 'rect', { x: PC[0] - 78, y: PC[1] - 58, width: 156, height: 22, rx: 10, fill: '#C3CDD8', stroke: C.ink2, 'stroke-width': 4 });
mk(tif, 'path', { d: `M${PC[0] - 30} ${PC[1] - 58} q30 -36 60 0`, fill: 'none', stroke: C.ink2, 'stroke-width': 4 });
const sysL = txt(ps, PC[0], PC[1] + 96, 'SYSTEM', { 'text-anchor': 'middle', fill: SY, 'font-weight': 600, 'font-size': 20 });
const surr = [['AIR', 120, 110], ['CORRIDOR', 664, 130], ['HANDS', 640, 400]].map(([s, x, y]) => txt(ps, x, y, s, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }));
const surL = txt(ps, 120, 420, 'SURROUNDINGS', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });
const bndL = txt(ps, PC[0] + 112, PC[1] - 130, 'BOUNDARY', { fill: SY, 'font-weight': 600 });
const uni = mk(ps, 'rect', { x: 24, y: 70, width: 736, height: 410, rx: 16, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '4 8' });
const uniL = txt(ps, 740, 470, 'UNIVERSE', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 });
const p1v = document.createElement('div'); p1v.id = 'p1v'; $('#pa').appendChild(p1v);
p1v.innerHTML = [['flame', 'HEAT', C.red], ['hand', 'WORK', '#2F6FEB']].map(([ic, n, c], i) => `<div class="p1t" id="p1t${i}"><i>${M.icon(ic, 48, c, 2.2)}</i><b style="color:${c}">${n}</b></div>`).join('') + `<div class="p1a" id="p1a">${M.icon('arrowR', 40, C.ac, 2.4)}<span>ENERGY ON THE MOVE</span></div>`;
const paIn = wrapIn($('#pa'), 'paIn');
const DF = [['System', 'The part we study', wt('P3', 'system')], ['Surroundings', 'Everything outside it', wt('P4', 'surroundings')], ['Boundary', 'A real or imaginary wall', wt('P5', 'boundary')], ['Universe', 'System + surroundings', wt('P6', 'universe')]];
$('#dfs').innerHTML = DF.map(([a, b], i) => `<div class="df" id="df${i}" style="top:${76 + i * 116}px"><div class="nn">${i + 1}</div><div class="dt">${a}</div><div class="dd">${b}</div></div>`).join('');

/* ---------- S: bench ---------- */
const bs = $('#bS'), BXC = [280, 800, 1320], BT = 170, BB = 400, BW = 300;
const BX = [['Open', 'CUP WITH NO LID', 1, 1], ['Closed', 'STEEL TIFFIN', 0, 1], ['Isolated', 'GOOD FLASK', 0, 0]];
const hl = BXC.map(x => mk(bs, 'rect', { x: x - 220, y: 120, width: 440, height: 440, rx: 16, fill: C.ac2, opacity: 0 }));
const boxes = BXC.map((x, i) => { const g = mk(bs, 'g', {}); const l = x - BW / 2, r = x + BW / 2;
  if (i === 2) mk(g, 'rect', { x: l - 16, y: BT - 16, width: BW + 32, height: BB - BT + 32, rx: 14, fill: '#EEF2F6', stroke: C.ink2, 'stroke-width': 4 });
  mk(g, 'rect', { x: l, y: BT, width: BW, height: BB - BT, fill: '#FFF7F2' });
  mk(g, 'path', { d: i === 0 ? `M${l} ${BT} V${BB} H${r} V${BT}` : `M${l} ${BT} H${r} V${BB} H${l} Z`, fill: 'none', stroke: C.ink2, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  return g; });
const adL = txt(bs, BXC[2], BT - 30, 'ADIABATIC WALL', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const MOL = BXC.map((x, i) => { const rn = M.rng(31 + i); return [0, 1, 2, 3, 4, 5, 6].map(k => ({ c: mk(bs, 'circle', { r: 10, fill: SY }), vx: 60 + 80 * rn(), vy: 50 + 70 * rn(), ox: 900 * rn(), oy: 900 * rn() })); });
const heat = [0, 1].map(i => [wave(bs, HO), wave(bs, HO)]);
heat.forEach((pr, i) => { waveAt(pr[0], BXC[i] - BW / 2 - 14, 300, -1, 70); waveAt(pr[1], BXC[i] + BW / 2 + 14, 300, 1, 70); });
const isoX = mk(bs, 'g', {}); [-1, 1].forEach(d => { const x = BXC[2] + d * (BW / 2 + 52); mk(isoX, 'path', { d: `M${x - 14} 286 l28 28 M${x + 14} 286 l-28 28`, stroke: HO, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.5 }); });
const tbar = BXC.map(x => { const g = mk(bs, 'g', {}); mk(g, 'rect', { x: x + BW / 2 - 34, y: BT + 14, width: 20, height: 150, rx: 10, fill: '#fff', stroke: C.dim, 'stroke-width': 2 }); const f = mk(g, 'rect', { x: x + BW / 2 - 30, width: 12, rx: 6, fill: TC }); txt(g, x + BW / 2 - 24, BT + 190, 'T', { 'text-anchor': 'middle', fill: TC, 'font-weight': 700, 'font-size': 18 }); return { g, f }; });
$('#bxs').innerHTML = BX.map(([n, w, m, e], i) => `<div class="bx" id="bx${i}" style="left:${BXC[i] - 220}px"><div class="bn">${n}</div><div class="bw">${w}</div><div class="bt"><span class="${m ? 'y' : 'n'}">MATTER ${m ? '✓' : '✗'}</span><span class="${e ? 'y' : 'n'}">ENERGY ${e ? '✓' : '✗'}</span></div></div>`).join('');
const tOpen = wt('S3', 'open'), tClosed = wt('S4', 'closed'), tIso = wt('S6', 'isolated'), tSteam = wt('S3', 'Steam'), tHeatC = wt('S5', 'heat');
const tBox = [tOpen, tClosed, tIso], tLeak = [wt('S3', 'heat'), tHeatC, 1e9];

/* ---------- V: state + hill ---------- */
const VT = [['p', 'PRESSURE', 'Pressure'], ['V', 'VOLUME', 'volume'], ['T', 'TEMPERATURE', 'temperature'], ['n', 'AMOUNT · mol', 'moles']];
$('#vts').innerHTML = VT.map(([s, n], i) => `<div class="vt" id="vt${i}" style="left:${36 + i * 180}px"><div class="vs">${K(`\\textcolor{${SY}}{${s}}`)}</div><div class="vn">${n}</div></div>`).join('');
$('#phv').innerHTML = ['p = 1 bar', 'V = 2 L', 'T = 300 K'].map(s => `<span>${s}</span>`).join('');
$('#bin1').innerHTML = `State functions: ${K(`\\textcolor{${SY}}{p,\\ V,\\ T}`)}`; $('#bin2').innerHTML = `Path functions: ${K(`${Q_},\\ ${W_}`)}`;
const vlIn = wrapIn($('#vl'), 'vlIn');
const hs = $('#hS'), PK = [400, 150], G0 = 500;
mk(hs, 'path', { d: `M60 ${G0} C 200 ${G0} 300 ${PK[1]} ${PK[0]} ${PK[1]} C 500 ${PK[1]} 600 ${G0} 740 ${G0} Z`, fill: '#EAF3EC', stroke: '#3E9B5F', 'stroke-width': 4 });
mk(hs, 'line', { x1: 40, y1: G0, x2: 760, y2: G0, stroke: C.ink, 'stroke-width': 3 });
mk(hs, 'path', { d: `M${PK[0]} ${PK[1]} v-46 l34 12 l-34 12`, fill: C.red, stroke: C.ink, 'stroke-width': 3 });
const pA = mk(hs, 'path', { d: `M250 ${G0} L${PK[0]} ${PK[1]}`, fill: 'none', stroke: SY, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pB = mk(hs, 'path', { d: `M250 ${G0} C 420 470 520 450 560 420 S 300 380 300 330 S 520 300 500 250 S 380 200 ${PK[0]} ${PK[1]}`, fill: 'none', stroke: PF, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '2 12' });
const dA = mk(hs, 'circle', { r: 12, fill: SY }), dB = mk(hs, 'circle', { r: 12, fill: PF });
const LA = pA.getTotalLength(), LB = pB.getTotalLength();
const hArr = mk(hs, 'path', { d: `M690 ${G0} V${PK[1]} M676 ${PK[1] + 18} L690 ${PK[1]} L704 ${PK[1] + 18}`, fill: 'none', stroke: SY, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hTxt = txt(hs, 760, 128, 'HEIGHT +300 m', { 'text-anchor': 'end', fill: SY, 'font-weight': 600, 'font-size': 20 });
const rA = txt(hs, 40, 548, 'STEEP PATH · WALKED 0.6 km', { fill: SY, 'font-weight': 600 }), rB = txt(hs, 420, 548, 'WINDING · WALKED 1.5 km', { fill: PF, 'font-weight': 600 });
const avD = PUC.avatar($('#vlIn'), { x: 36, y: 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same height. Different distance!' });

/* ---------- B: extensive vs intensive ---------- */
const cs = $('#cS');
const cup = (w, h) => { const g = mk(cs, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -h, width: w, height: h * 0.8, rx: 4, fill: '#C98A4B', transform: `translate(0 ${h * 0.2})` }); mk(g, 'path', { d: `M${-w / 2 - 6} ${-h - 10} V0 H${w / 2 + 6} V${-h - 10}`, fill: 'none', stroke: C.ink2, 'stroke-width': 5, 'stroke-linejoin': 'round' }); return g; };
const big = cup(200, 200), hL = cup(140, 140), hR = cup(140, 140);
const rdW = txt(cs, 392, 430, '', { 'text-anchor': 'middle', fill: C.ink, 'font-size': 24, 'font-weight': 600 });
const rdL = txt(cs, 0, 430, 'V 100 mL · m 100 g', { 'text-anchor': 'middle', fill: C.ink, 'font-size': 20, 'font-weight': 600 }), rdR = txt(cs, 0, 430, 'V 100 mL · m 100 g', { 'text-anchor': 'middle', fill: C.ink, 'font-size': 20, 'font-weight': 600 });
const tL = txt(cs, 0, 470, 'T 70 °C', { 'text-anchor': 'middle', fill: TC, 'font-size': 22, 'font-weight': 600 }), tR = txt(cs, 0, 470, 'T 70 °C', { 'text-anchor': 'middle', fill: TC, 'font-size': 22, 'font-weight': 600 });
rdW.textContent = 'V 200 mL · m 200 g · T 70 °C';
const IT = [['Volume', 'V', 0, wt('B2', 'volume')], ['Mass', 'm', 0, wt('B2', 'mass')], ['Temperature', 'T', 1, wt('B3', 'Temperature')]];
$('#its').innerHTML = IT.map(([n, s, c], i) => `<div class="it" id="it${i}" style="left:${c ? 428 : 60}px;top:${186 + (c ? 0 : i) * 80}px">${n}<i>${s}</i></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Density = mass ÷ volume. Extensive or intensive?', opts: ['Extensive', 'Intensive'], right: 1, why: 'Mass and volume both halve, so their ratio stays the same.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\Delta X = X_{\\text{final}} - X_{\\text{initial}}`);
const stmt = statement(SW, [wt('T1', 'state'), wt('T1', 'start'), wt('T1', 'never')]);

/* ---------- W: two paths on a T-V graph ---------- */
const WR = [['PATH 1', K(`(300\\,${tx('K')},\\,2\\,${tx('L')}) \\rightarrow (350\\,${tx('K')},\\,5\\,${tx('L')})`), '', 'W3'], ['PATH 2', K(`\\rightarrow (\\textcolor{${VI}}{250\\,${tx('K')},\\,8\\,${tx('L')}}) \\rightarrow (350\\,${tx('K')},\\,5\\,${tx('L')})`), '', 'W4'],
  ['ΔT', K(`\\textcolor{${TC}}{\\Delta T} = 350 - 300 = \\textcolor{${TC}}{+50\\ ${tx('K')}}`), 'BOTH PATHS', 'W5'], ['ΔV', K(`\\Delta V = 5 - 2 = +3\\ ${tx('L')}`), 'BOTH PATHS', 'W6'], ['HEAT', `<span style="font:600 26px Poppins;color:${PF}">Different on each path</span>`, '', 'W7']];
$('#wrs').innerHTML = WR.map(([k, f, b], i) => `<div class="wr5" id="w5${i}" style="top:${132 + i * 82}px"><div class="wk">${k}</div><div class="wf">${f}</div>${b ? `<div class="wb" id="wb${i}">${b}</div>` : ''}</div>`).join('');
const gs = $('#gS'), GX = v => 120 + v * 56, GY = T => 480 - (T - 200) * 1.8;
mk(gs, 'path', { d: `M120 100 V480 H720`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
txt(gs, 720, 516, 'V / L', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 }); txt(gs, 112, 92, 'T / K', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 });
[2, 5, 8].forEach(v => txt(gs, GX(v), 506, v, { 'text-anchor': 'middle' })); [250, 300, 350].forEach(T => txt(gs, 108, GY(T) + 6, T, { 'text-anchor': 'end' }));
const PS = [GX(2), GY(300)], PE = [GX(5), GY(350)], PM = [GX(8), GY(250)];
const g1 = mk(gs, 'path', { d: `M${PS} L${PE}`, fill: 'none', stroke: SY, 'stroke-width': 5, 'stroke-linecap': 'round' });
const g2 = mk(gs, 'path', { d: `M${PS} L${PM} L${PE}`, fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '14 10' });
const L1 = g1.getTotalLength(), L2 = g2.getTotalLength();
[[PS, 'START', 40], [PE, 'END', -22]].forEach(([p, s, dy]) => { mk(gs, 'circle', { cx: p[0], cy: p[1], r: 11, fill: C.ink }); txt(gs, p[0], p[1] + dy, s, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const gd1 = mk(gs, 'circle', { r: 10, fill: SY }), gd2 = mk(gs, 'circle', { r: 10, fill: VI });
const dT = mk(gs, 'path', { d: `M160 ${PS[1]} V${PE[1] + 4} M148 ${PE[1] + 18} L160 ${PE[1] + 4} L172 ${PE[1] + 18}`, fill: 'none', stroke: TC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dTl = txt(gs, 176, (PS[1] + PE[1]) / 2 + 6, '+50 K', { 'text-anchor': 'start', fill: TC, 'font-weight': 600, 'font-size': 20 });
const dV = mk(gs, 'path', { d: `M${PS[0]} 440 H${PE[0] - 4} M${PE[0] - 18} 428 L${PE[0] - 4} 440 L${PE[0] - 18} 452`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dVl = txt(gs, (PS[0] + PE[0]) / 2, 428, '+3 L', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const tWr = ['W3', 'W4', 'W5', 'W6', 'W7'].map(id => T0(id));

/* ---------- C: five processes ---------- */
const PT5 = [['thermo', 'Isothermal', `\\Delta T = 0`, 'SAME TEMPERATURE', wt('C2', 'Isothermal')], ['gear', 'Isobaric', `\\Delta p = 0`, 'SAME PRESSURE', wt('C3', 'Isobaric')], ['box', 'Isochoric', `\\Delta V = 0`, 'SAME VOLUME', wt('C3', 'Isochoric')],
  ['x', 'Adiabatic', `${Q_} = 0`, 'NO HEAT IN OR OUT', wt('C4', 'Adiabatic')], ['repeat', 'Cyclic', `\\Delta(\\text{state fn}) = 0`, 'BACK TO THE START', wt('C5', 'cyclic')]];
$('#pts').innerHTML = PT5.map(([ic, n, k, w], i) => `<div class="pt5" id="p5${i}" style="left:${36 + i * 310}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="pn">${n}</div><div class="pk">${K(k)}</div><div class="pw">${w}</div></div>`).join('');

/* ---------- exam + ending ---------- */
const ts = $('#tS'), TB = [130, 70, 300, 200];
mk(ts, 'rect', { x: TB[0], y: TB[1], width: TB[2] - TB[0], height: TB[3] - TB[1], fill: '#FFF7F2', stroke: C.ink2, 'stroke-width': 5 });
const tm = [[170, 110], [230, 150], [260, 100], [190, 170], [280, 160]].map(([x, y]) => mk(ts, 'circle', { cx: x, cy: y, r: 9, fill: SY }));
const tUp = mk(ts, 'g', {}); mk(tUp, 'path', { d: 'M215 60 V18 M203 30 L215 18 L227 30', stroke: SY, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(tUp, 'path', { d: 'M200 26 l30 30 M230 26 l-30 30', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tW = wave(ts, HO); waveAt(tW, 318, 135, 1, 96);
const tl1 = txt(ts, 36, 40, 'MATTER: NO', { fill: C.red, 'font-weight': 600, 'font-size': 16 }), tl2 = txt(ts, 330, 196, 'HEAT: YES', { fill: HO, 'font-weight': 600, 'font-size': 16 });
const end = endBuild({
  wrong: 'A closed system cannot exchange anything', right: 'Closed stops matter only; energy still crosses. Isolated stops both.',
  tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Closed') - 0.1, tRight: wt('X3', 'Energy') - 0.1,
  trapArt: t => { [...tm].forEach(e => fade(e, t, wt('X2', 'closed') - 0.1)); fade(ts.firstChild, t, wt('X2', 'closed') - 0.2); fade(tUp, t, wt('X3', 'matter')); fade(tl1, t, wt('X3', 'matter') + 0.1); fade(tW.g, t, wt('X3', 'Energy')); fade(tl2, t, wt('X3', 'Energy') + 0.1); attr(tW.pa, 'stroke-dashoffset', (-t * 40).toFixed(1)); },
  on: [], tLight: [], tType: wt('E1', 'Expect'), type: 'Classify systems, pick state functions, sort intensive and extensive',
  pat: 'NEET PATTERN · ORIGINAL QUESTION', ans: 1,
  mcq: { q: 'Which set contains only state functions?', opts: [K(`${Q_},\\ p,\\ T`), K(`p,\\ V,\\ T`), K(`V,\\ T,\\ ${Q_}`), K(`${W_},\\ p,\\ V`)] },
  tOpts: wt('Q1', 'only'),
  sol: [K(`${Q_}:\\ ${tx('path')} \\Rightarrow ${tx('A, C out')}`), K(`${W_}:\\ ${tx('path')} \\Rightarrow ${tx('D out')}`), K(`\\textcolor{${SY}}{p,\\ V,\\ T}:\\ ${tx('state')}`), K(`${Q_}, ${W_}:\\ ${tx('energy on the move')}`)],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Heat')],
  fTitle: 'Recap · system, surroundings and state functions',
  fLines: [K(`${tx('Universe')} = \\textcolor{${SY}}{${tx('system')}} + ${tx('surroundings')}`), '<b>Open</b>: matter + energy cross · <b>Closed</b>: energy only · <b>Isolated</b>: neither', '<b>State functions</b>: p, V, T (start and end only) · <b>Path</b>: q, w', '<b>Extensive</b>: mass, volume · <b>Intensive</b>: temperature, pressure, density', '<b>Iso</b> = same: ΔT, Δp or ΔV = 0 · <b>Adiabatic</b>: q = 0'],
  yq: ['Why is a closed tiffin a closed system, and not an isolated one?', 'Is your height on a hill like a state function or a path function?', 'Is temperature extensive or intensive?'],
  nextL: 'NEXT · EP 52', nextT: 'Why does a bicycle pump get hot? First Law of Thermodynamics',
});

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t); hook(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1'), tSys = wt('P3', 'system');
    M.vis($('#pa'), t, tP1 + 0.05, out, { dy: 36, ...o }); grow($('#pa'), paIn, t, tSys - 0.2);
    M.vis($('#thP'), t, wt('P1', 'study') - 0.1, wt('P2', 'circle'), { ...POP, outDur: 0.25, ody: 0 });
    M.vis($('#p1t0'), t, wt('P1', 'heat') - 0.1, T0('P2') - 0.1, { ...POP, outDur: 0.25, ody: 0 }); M.vis($('#p1t1'), t, wt('P1', 'work') - 0.1, T0('P2') - 0.1, { ...POP, outDur: 0.25, ody: 0 }); M.vis($('#p1a'), t, wt('P1', 'moving') - 0.1, T0('P2') - 0.1, { dy: 10, outDur: 0.25, ody: 0 });
    M.setT($('#paL'), t < tSys ? 'PICK THE PART YOU STUDY' : 'SYSTEM AND SURROUNDINGS');
    fade(toys, t, wt('P2', 'pick') - 0.1, tSys); fade(tif, t, tSys);
    attr(bnd, 'stroke-dashoffset', (-60 * M.io((t - wt('P2', 'chalk')) / 1.2)).toFixed(1)); fade(bnd, t, wt('P2', 'chalk') - 0.1);
    attr(bnd, 'stroke-width', t > wt('P5', 'boundary') ? (5 + 3 * M.io((t - wt('P5', 'boundary')) / 0.3)).toFixed(1) : 5);
    fade(sysL, t, tSys + 0.1); surr.forEach((e, i) => fade(e, t, wt('P4', ['air', 'corridor', 'hands'][i]) - 0.1)); fade(surL, t, wt('P4', 'surroundings'));
    fade(bndL, t, wt('P5', 'boundary')); fade(uni, t, wt('P6', 'universe') - 0.1); fade(uniL, t, wt('P6', 'universe'));
    M.vis($('#pb'), t, tSys - 0.1, out, { dx: 60, dy: 0, ...o });
    DF.forEach(([, , tt], i) => { const el = $('#df' + i); M.vis(el, t, tt - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tt - 1.6) / 0.4)))); });
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1');
    M.vis($('#bn'), t, tS1 + 0.05, out, { dy: 36, ...o }); M.vis($('#lgd'), t, wt('S2', 'Matter') - 0.1, 1e9, { dy: 8 });
    boxes.forEach((g, i) => fade(g, t, tS1 + 0.2 + i * 0.12));
    BX.forEach((b, i) => { M.vis($('#bx' + i), t, tBox[i] - 0.1, 1e9, { dy: 14 }); const nx = i < 2 ? tBox[i + 1] : wt('S7', 'flask'); hl[i].setAttribute('opacity', (0.6 * M.io((t - tBox[i]) / 0.3) * (1 - M.io((t - nx) / 0.3))).toFixed(3)); });
    fade(adL, t, wt('S7', 'adiabatic'));
    MOL.forEach((ms, i) => { const l = BXC[i] - BW / 2 + 14, wI = BW - 28 - 40, tp = BT + 14, hI = BB - BT - 28;
      const tt = phase(u => 1 - 0.45 * M.io((u - tLeak[i]) / 6), tS1 - 1, t); // cooling slows the molecules
      ms.forEach((m, k) => { let x = l + tri(m.ox + m.vx * tt, wI), y = tp + tri(m.oy + m.vy * tt, hI), a = 1;
        if (i === 0 && k < 3) { const te = tSteam + k * 0.9; if (t > te) { const u = t - te; y = M.lerp(y, BT - 40 - 90 * u, M.io(u / 0.4)); a = 1 - M.clamp(u / 1.4); } }
        attr(m.c, 'cx', x.toFixed(1)); attr(m.c, 'cy', y.toFixed(1)); m.c.style.opacity = (a * M.io((t - tS1 - 0.3) / 0.3)).toFixed(3); }); });
    heat.forEach((pr, i) => pr.forEach(w => { fade(w.g, t, tLeak[i] - 0.1); attr(w.pa, 'stroke-dashoffset', (-t * 40).toFixed(1)); }));
    fade(isoX, t, wt('S6', 'heat'));
    tbar.forEach((b, i) => { const lv = 0.9 - 0.55 * M.io((t - tLeak[i]) / 6), h = 142 * lv; attr(b.f, 'y', (BT + 18 + 142 - h).toFixed(1)); attr(b.f, 'height', h.toFixed(1)); fade(b.g, t, tS1 + 0.5); });
  }

  /* V: state + hill */
  const vOn = t >= tV1 - 0.1 && t < tB1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('B1'), tHill = wt('V5', 'climbing');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dy: 36, ...o }); grow($('#vl'), vlIn, t, tHill - 0.2);
    VT.forEach((v, i) => M.vis($('#vt' + i), t, wt('V2', v[2]) - 0.1, 1e9, { ...POP }));
    M.vis($('#ph'), t, wt('V3', 'state') - 0.1, 1e9, { dy: 16 }); M.vis($('#phv'), t, wt('V3', 'fix') - 0.1, 1e9, { dy: 8 });
    M.vis($('#sfP'), t, wt('V4', 'state') - 0.1, 1e9, POP);
    M.vis($('#bin1'), t, wt('V7', 'Pressure') - 0.1, 1e9, POP); M.vis($('#bin2'), t, wt('V7', 'Heat') - 0.1, 1e9, POP);
    { const b2 = $('#bin1'); if (b2.offsetWidth) $('#bin2').style.left = (36 + b2.offsetWidth + 16) + 'px'; }
    M.vis($('#vr'), t, tHill - 0.1, out, { dx: 60, dy: 0, ...o });
    const ua = M.io((t - wt('V5', 'steep')) / 2.0), ub = M.io((t - wt('V5', 'winding')) / 3.2);
    const pa = pA.getPointAtLength(LA * ua), pb = pB.getPointAtLength(LB * ub);
    attr(dA, 'cx', pa.x.toFixed(1)); attr(dA, 'cy', pa.y.toFixed(1)); attr(dB, 'cx', pb.x.toFixed(1)); attr(dB, 'cy', pb.y.toFixed(1));
    fade(dA, t, wt('V5', 'steep') - 0.2); fade(dB, t, wt('V5', 'winding') - 0.2); fade(pA, t, wt('V5', 'steep') - 0.3); fade(pB, t, wt('V5', 'winding') - 0.3);
    fade(hArr, t, wt('V6', 'Height')); fade(hTxt, t, wt('V6', 'Height') + 0.1); fade(rA, t, wt('V6', 'distance')); fade(rB, t, wt('V6', 'distance') + 0.3);
    M.vis($('#vG'), t, wt('V6', 'distance'), 1e9, POP);
    avD(t, wt('V6', 'path') + 0.3, wt('V7', 'Pressure') - 0.25);
  }

  /* B: extensive vs intensive + think */
  const bOn = t >= tB1 - 0.1 && t < tT + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B4'), tSp = wt('B1', 'two');
    M.vis($('#tl'), t, tB1 + 0.05, out, { dy: 36, ...o }); M.vis($('#tr'), t, T0('B2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const sp = M.io((t - tSp) / 0.8);
    place(big, 392, 340); fade(big, t, tB1 + 0.2, tSp); fade(rdW, t, tB1 + 0.4, tSp);
    const xl = M.lerp(392, 210, sp), xr = M.lerp(392, 574, sp); place(hL, xl, 360); place(hR, xr, 360); fade(hL, t, tSp - 0.05); fade(hR, t, tSp - 0.05);
    [[rdL, xl], [rdR, xr], [tL, xl], [tR, xr]].forEach(([e, x]) => attr(e, 'x', x.toFixed(1)));
    fade(rdL, t, wt('B2', 'volume') - 0.1); fade(rdR, t, wt('B2', 'volume') - 0.1); fade(tL, t, wt('B3', 'hot') - 0.1); fade(tR, t, wt('B3', 'hot') - 0.1);
    M.vis($('#cG'), t, tB1 + 0.4, 1e9, POP);
    M.vis($('#col1'), t, T0('B2') + 0.1, 1e9, { dy: 14 }); M.vis($('#col2'), t, T0('B2') + 0.25, 1e9, { dy: 14 });
    IT.forEach((r, i) => M.vis($('#it' + i), t, r[3] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, T0('B4') + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: T0('B4'), tOpts: wt('B4', 'extensive', 1) - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Mass') });
  }

  stmt(t);

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dy: 36, ...o }); grow($('#wl'), null, t, tWr[0] - 0.2);
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    WR.forEach((r, i) => { const el = $('#w5' + i); M.vis(el, t, tWr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tWr[i]) / 0.25) * (1 - M.io((t - (i < 4 ? tWr[i + 1] : 1e9)) / 0.25))));
      const b = $('#wb' + i); if (b) M.vis(b, t, wt(r[3], 'both') - 0.1, 1e9, POP); });
    M.vis($('#wr'), t, tWr[0] - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#wG'), t, tWr[0] + 0.2, 1e9, POP);
    const u1 = M.io((t - wt('W3', 'Warm')) / 1.6), u2 = M.io((t - wt('W4', 'Cool')) / 3.4);
    g1.style.strokeDasharray = `${(L1 * u1).toFixed(1)} 2000`; M.hide(g1, u1 <= 0.01);
    const q1 = g1.getPointAtLength(L1 * u1), q2 = g2.getPointAtLength(L2 * u2);
    attr(gd1, 'cx', q1.x.toFixed(1)); attr(gd1, 'cy', q1.y.toFixed(1)); fade(gd1, t, wt('W3', 'Warm') - 0.2);
    attr(gd2, 'cx', q2.x.toFixed(1)); attr(gd2, 'cy', q2.y.toFixed(1)); fade(gd2, t, wt('W4', 'Cool') - 0.2); fade(g2, t, wt('W4', 'Cool') - 0.1);
    attr(g2, 'stroke-dashoffset', '0'); g2.style.opacity = (M.io((t - wt('W4', 'Cool') + 0.1) / 0.3) * (0.35 + 0.65 * u2)).toFixed(3);
    fade(dT, t, wt('W5', 'fifty') - 0.2); fade(dTl, t, wt('W5', 'fifty')); fade(dV, t, wt('W6', 'Five') - 0.2); fade(dVl, t, wt('W6', 'three'));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < T0('X1') + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#pc'), t, tC1 + 0.05, out, { dy: 36, ...o });
    PT5.forEach((p, i) => { const el = $('#p5' + i); M.vis(el, t, p[4] - 0.15, 1e9, { dy: 20 }); const nx = i < 4 ? PT5[i + 1][4] : out; setBg(el, mix(C.soft, C.ac2, M.io((t - p[4]) / 0.25) * (1 - M.io((t - nx) / 0.25)))); });
    M.vis($('#isoP'), t, wt('C2', 'Iso') - 0.1, 1e9, POP);
  }

  end(t);
  caps(t);
});

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
end.sfx();
M.outro({});
})();
