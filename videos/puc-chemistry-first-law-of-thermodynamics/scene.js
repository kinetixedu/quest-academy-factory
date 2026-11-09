// PUC Chemistry Ep 52 (Molecule bench)
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
// colour-coding (bench, KaTeX, readouts, recap): U and ΔU teal, heat q red (in) / blue (out), work w violet, temperature orange
const UC = C.ac, HI = C.red, HO = '#2F6FEB', WC = '#7A4FE0', TC = '#C8461B';
const tx = s => `\\text{${s}}`;
const U_ = `\\textcolor{${UC}}{\\Delta U}`, q_ = `\\textcolor{${HI}}{q}`, w_ = `\\textcolor{${WC}}{w}`;
const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
// integral of speed fn from ta to t (smooth phase so molecules never jump)
const phase = (f, ta, t) => { if (t <= ta) return (t - ta) * f(ta); const n = Math.ceil((t - ta) / 0.05), dt = (t - ta) / n; let s = 0; for (let i = 0; i < n; i++) s += f(ta + (i + 0.5) * dt) * dt; return s; };
const wave = (p, col) => { const g = mk(p, 'g', {}); const pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '16 10' }); const hd = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return { g, pa, hd }; };
const waveV = (w, x, y, d, L) => { let s = `M${x} ${y}`; const n = 4, st = L / n; for (let k = 0; k < n; k++) s += ` q${k % 2 ? 10 : -10} ${(d * st / 2).toFixed(1)} 0 ${(d * st).toFixed(1)}`; attr(w.pa, 'd', s); const ey = y + d * L; attr(w.hd, 'd', `M${x - 12} ${ey - d * 14} L${x} ${ey + d * 4} L${x + 12} ${ey - d * 14}`); };
const arrowP = (p, col, w = 6) => { const g = mk(p, 'g', {}); const l = mk(g, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }); const h = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  g.set = (x1, y1, x2, y2) => { attr(l, 'x1', x1); attr(l, 'y1', y1); attr(l, 'x2', x2); attr(l, 'y2', y2); const a = Math.atan2(y2 - y1, x2 - x1), s = 16; attr(h, 'd', `M${(x2 - s * Math.cos(a - 0.5)).toFixed(1)} ${(y2 - s * Math.sin(a - 0.5)).toFixed(1)} L${x2} ${y2} L${(x2 - s * Math.cos(a + 0.5)).toFixed(1)} ${(y2 - s * Math.sin(a + 0.5)).toFixed(1)}`); return g; }; return g; };
// cylinder with piston and bouncing molecules
const cyl = (p, x0, x1, yb, n = 9) => { const g = mk(p, 'g', {});
  mk(g, 'rect', { x: x0, y: 60, width: x1 - x0, height: yb - 60, fill: '#FFF7F2' });
  const gas = mk(g, 'rect', { x: x0, width: x1 - x0, fill: '#FDEBDD' });
  mk(g, 'path', { d: `M${x0} 70 V${yb} H${x1} V70`, fill: 'none', stroke: C.ink2, 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  const ms = [...Array(n)].map((_, k) => ({ c: mk(g, 'circle', { r: 10, fill: UC }), vx: 80 + 21 * ((k * 5) % 7), vy: 70 + 17 * ((k * 3 + 1) % 7), ox: 41 * k, oy: 67 * k }));
  const pis = mk(g, 'g', {}); mk(pis, 'rect', { x: x0 + 5, y: -16, width: x1 - x0 - 10, height: 22, rx: 4, fill: '#8A93A6', stroke: C.ink2, 'stroke-width': 3 }); mk(pis, 'rect', { x: (x0 + x1) / 2 - 8, y: -120, width: 16, height: 106, fill: '#8A93A6', stroke: C.ink2, 'stroke-width': 3 });
  return { g, ms, pis, upd: (py, ph, sz = 1) => { place(pis, 0, py); attr(gas, 'y', py + 6); attr(gas, 'height', Math.max(0, yb - py - 6)); const l = x0 + 18, w = x1 - x0 - 36, h = yb - py - 36;
    ms.forEach(m => { attr(m.c, 'cx', (l + tri(m.ox + m.vx * ph, w)).toFixed(1)); attr(m.c, 'cy', (py + 24 + tri(m.oy + m.vy * ph, Math.max(10, h))).toFixed(1)); }); } }; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tV1 = T0('V1'), tB1 = T0('B1'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tQ = T0('Q1');
const SW = [[tT, tW1], [tQ, tQ + 0.06], [T0('F1'), T0('F1') + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H ---------- */
const hook = hookBuild({
  jobs: [['hand', 'Rub your palms', 'THEY WARM UP', wt('H1', 'Rub')], ['bike', 'Pump a tyre', 'THE PUMP GETS HOT', wt('H1', 'Pump')], ['flame', 'Pressure cooker', 'STEAM LIFTS THE WEIGHT', wt('H1', 'Steam')]],
  chipL: 'ENERGY', chip: (t, i) => t >= wt('H2', 'Work') ? (i < 2 ? 'work → heat' : 'heat → work') : '?', tChip: wt('H2', 'Work'),
  kit: [['repeat', '10 quick pushes', wt('H4', 'Ten')], ['thermo', 'Pump is warm', wt('H4', 'warm')], ['x', 'No flame', wt('H4', 'flame')]], hiKit: 1,
  tMorph, tScene: T0('H3'), tPill: wt('H2', 'rule'), tTz: wt('H5', 'where'), tEnd: tP1,
});

/* ---------- P: piggy bank ---------- */
const js = $('#jS'), JX = 292, JW = 200, JT = 110, JB = 440;
mk(js, 'rect', { x: JX, y: JT, width: JW, height: JB - JT, rx: 26, fill: '#fff', stroke: C.ink2, 'stroke-width': 6 });
const jf = mk(js, 'rect', { x: JX + 8, width: JW - 16, rx: 18, fill: UC, opacity: 0.85 });
mk(js, 'rect', { x: JX + 60, y: JT - 14, width: 80, height: 14, rx: 6, fill: C.ink2 });
const coins = [0, 1, 2].map(k => { const c = mk(js, 'g', {}); mk(c, 'circle', { r: 18, fill: '#E8B23A', stroke: '#B7791F', 'stroke-width': 3 }); return c; });
const uLab = txt(js, JX + JW / 2, JB + 44, 'INTERNAL ENERGY · U', { 'text-anchor': 'middle', fill: UC, 'font-weight': 600, 'font-size': 20 });
const yI = 330, yF = 220;
const brk = mk(js, 'path', { d: `M${JX + JW + 30} ${yI} H${JX + JW + 50} V${yF} H${JX + JW + 30}`, fill: 'none', stroke: UC, 'stroke-width': 4 });
const dUl = txt(js, JX + JW + 66, (yI + yF) / 2 + 8, 'ΔU = U(final) - U(start)', { fill: UC, 'font-weight': 600, 'font-size': 20 });
const lI = txt(js, JX - 20, yI + 6, 'START', { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }), lF = txt(js, JX - 20, yF + 6, 'FINAL', { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 });
const paIn = wrapIn($('#pa'), 'paIn');
const MT = [['MOVE', wt('P2', 'move')], ['SPIN', wt('P2', 'spin')], ['SHAKE', wt('P2', 'shake')], ['BONDS', wt('P2', 'bonds')]];
$('#mts').innerHTML = MT.map(([n], i) => `<div class="mt" id="mt${i}" style="left:${36 + (i % 2) * 376}px;top:${76 + Math.floor(i / 2) * 244}px"><svg id="mS${i}" width="344" height="220"></svg><b>${n}</b></div>`).join('');
const mol2 = (p, r = 18) => { const g = mk(p, 'g', {}); const s = mk(g, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); const a = atomG(g, r, UC, '', 10), b = atomG(g, r, C.ink, '', 10); return { g, s, a, b }; };
const MM = [0, 1, 2, 3].map(i => mol2($('#mS' + i)));
const setMol = (m, cx, cy, ang, d) => { const dx = Math.cos(ang) * d / 2, dy = Math.sin(ang) * d / 2; place(m.a, cx - dx, cy - dy); place(m.b, cx + dx, cy + dy); attr(m.s, 'x1', cx - dx); attr(m.s, 'y1', cy - dy); attr(m.s, 'x2', cx + dx); attr(m.s, 'y2', cy + dy); };
const bondGlow = mk($('#mS3'), 'circle', { cx: 172, cy: 130, r: 30, fill: '#E8B23A', opacity: 0.35 });

/* ---------- S: bench ---------- */
const bs = $('#bS'), CY = cyl(bs, 232, 552, 470);
const flame = mk(bs, 'g', {}); [312, 392, 472].forEach(x => mk(flame, 'path', { d: `M${x} 540 c-18 -14 -14 -34 0 -52 c14 18 18 38 0 52z`, fill: '#E8742A', stroke: C.red, 'stroke-width': 3 }));
const hIn = [312, 472].map(x => { const w = wave(bs, HI); waveV(w, x - 60 + (x > 400 ? 120 : 0), 540, -1, 56); return w; });
const wDn = arrowP(bs, WC).set(392, -40, 392, 0), wUp = arrowP(bs, WC);
const wL = txt(bs, 440, 0, '', { fill: WC, 'font-weight': 600, 'font-size': 20 });
const PYk = M.keys([[0, 180], [wt('S2', 'Push') - 0.1, 180], [wt('S2', 'Push') + 1.1, 260], [wt('S5', 'push') - 0.2, 260], [wt('S5', 'push') + 2.2, 120]], 1);
const SPk = M.keys([[0, 1], [wt('S2', 'Push'), 1], [wt('S2', 'Push') + 1.2, 1.5], [wt('S4', 'flows'), 1.5], [wt('S4', 'flows') + 1.5, 2.0], [wt('S5', 'push'), 2.0], [wt('S5', 'push') + 2.2, 1.3]], 1);
const us = $('#uS'), UX = 110, UT = 90, UB = 470;
mk(us, 'rect', { x: UX, y: UT, width: 90, height: UB - UT, rx: 14, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const uf = mk(us, 'rect', { x: UX + 8, width: 74, rx: 8, fill: UC });
txt(us, UX + 45, UB + 40, 'U', { 'text-anchor': 'middle', fill: UC, 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32 });
const UR = [[`${w_} > 0`, 'WORK ON THE GAS · U UP', WC, 'arrowU', wt('S2', 'Push')], [`${q_} > 0`, 'HEAT FLOWS IN · U UP', HI, 'arrowU', wt('S4', 'heat')], [`${w_} < 0`, 'GAS DOES WORK · U DOWN', WC, 'arrowD', wt('S5', 'work')]];
$('#urs').innerHTML = UR.map(([k, w, c, ic], i) => `<div class="ur" id="ur${i}" style="top:${84 + i * 100}px"><div class="uk">${K(k)}</div><div class="uw">${w}</div><div class="ua" style="background:${c}">${M.icon(ic, 22, '#fff', 3)}</div></div>`).join('');
$('#twoP').innerHTML = `Only two ways in or out: heat ${K(q_)} and work ${K(w_)}`;
const tS6 = wt('S6', 'two');

/* ---------- V: signs ---------- */
const vs = $('#vS'), VC = [392, 270];
mk(vs, 'circle', { cx: VC[0], cy: VC[1], r: 100, fill: C.ac2, stroke: UC, 'stroke-width': 5, 'stroke-dasharray': '16 10' });
txt(vs, VC[0], VC[1] + 8, 'SYSTEM', { 'text-anchor': 'middle', fill: UC, 'font-weight': 700, 'font-size': 22 });
const SA = [[arrowP(vs, HI).set(60, 190, 290, 222), 'HEAT IN · q > 0', 60, 170, HI], [arrowP(vs, HO).set(290, 318, 60, 350), 'HEAT OUT · q < 0', 60, 392, HO], [arrowP(vs, WC).set(724, 190, 494, 222), 'WORK ON · w > 0', 724, 170, WC], [arrowP(vs, WC).set(494, 318, 724, 350), 'WORK BY · w < 0', 724, 392, WC]]
  .map(([a, s, x, y, c], i) => ({ a, l: txt(vs, x, y, s, { 'text-anchor': i < 2 ? 'start' : 'end', fill: c, 'font-weight': 600, 'font-size': 18 }) }));
$('#mnP').innerHTML = `${M.icon('coin', 24, '#B7791F', 2.2)}<span>Like money: in is plus, out is minus</span>`;
const SG = [['Heat in', `${q_} > 0`, wt('V2', 'in')], ['Heat out', `${q_} < 0`, wt('V2', 'out')], ['Work done on the system', `${w_} > 0`, wt('V3', 'on')], ['Work done by the system', `${w_} < 0`, wt('V3', 'by')]];
$('#sgs').innerHTML = SG.map(([l, k], i) => `<div class="sg" id="sg${i}" style="top:${76 + i * 74}px"><div class="sl">${l}</div><div class="sv">${K(k)}</div></div>`).join('');
$('#eqF').innerHTML = K(`${U_} = ${q_} + ${w_}`);
const tSA = [wt('V2', 'in'), wt('V2', 'out'), wt('V3', 'on'), wt('V3', 'by')];

/* ---------- B: first law in words, isolated, think ---------- */
const FL = [['hand', 'Work → heat', 'THE WARM PUMP', wt('B1', 'changes')], ['flame', 'Heat → work', 'THE COOKER WEIGHT', wt('B1', 'form')], ['check', 'Total stays the same', 'NEVER MADE OR DESTROYED', wt('B1', 'destroyed')]];
$('#fls').innerHTML = FL.map(([ic, b, s], i) => `<div class="fl3" id="fl${i}" style="top:${84 + i * 116}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><b>${b}</b><span>${s}</span></div>`).join('');
const is = $('#iS');
mk(is, 'rect', { x: 222, y: 96, width: 340, height: 300, rx: 16, fill: '#EEF2F6', stroke: C.ink2, 'stroke-width': 4 });
mk(is, 'rect', { x: 242, y: 116, width: 300, height: 260, rx: 10, fill: '#FFF7F2', stroke: C.ink2, 'stroke-width': 4 });
const iM = [...Array(7)].map((_, k) => ({ c: mk(is, 'circle', { r: 10, fill: UC }), vx: 90 + 13 * k, vy: 70 + 19 * ((k * 3) % 5), ox: 53 * k, oy: 31 * k }));
const iX = [[150, 246], [634, 246]].map(([x, y]) => mk(is, 'path', { d: `M${x - 16} ${y - 16} l32 32 M${x + 16} ${y - 16} l-32 32`, stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round' }));
$('#isoK').innerHTML = K(`${q_} = 0,\\ ${w_} = 0 \;\\Rightarrow\; ${U_} = 0`);
const th1 = PUC.think($('#th1'), { q: 'A piston squeezes a gas. Is w plus or minus?', opts: ['Plus', 'Minus'], right: 0, why: 'Work is done on the system, so energy goes into the bank.' });

/* ---------- D: work of expansion ---------- */
const ds = $('#dS'), DC = cyl(ds, 232, 552, 470, 8);
const pex = [292, 392, 492].map(() => arrowP(ds, C.ink, 5));
const pexL = txt(ds, 580, 70, 'p ex · OUTSIDE', { fill: C.ink, 'font-weight': 600 });
const vac = txt(ds, 392, 60, 'VACUUM · NOTHING PUSHES BACK', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600 });
const DPk = M.keys([[0, 330], [wt('D3', 'grows') - 0.1, 330], [wt('D3', 'grows') + 1.4, 200], [T0('D6'), 200], [T0('D6') + 0.6, 330], [wt('D6', 'vacuum'), 330], [wt('D6', 'vacuum') + 1.4, 200]], 1);
const viL = mk(ds, 'line', { x1: 196, x2: 600, y1: 330, y2: 330, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), vfL = mk(ds, 'line', { x1: 196, x2: 600, y1: 200, y2: 200, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const viT = txt(ds, 188, 336, 'Vi', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600, 'font-size': 22 }), vfT = txt(ds, 188, 206, 'Vf', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const dvA = arrowP(ds, UC, 4).set(620, 330, 620, 204); const dvT = txt(ds, 636, 272, 'ΔV > 0', { fill: UC, 'font-weight': 600, 'font-size': 22 });
const DR = [[`p_{\\text{ex}}`, 'PRESSURE OUTSIDE', 'D2'], [`\\Delta V = V_{\\text{f}} - V_{\\text{i}}`, 'CHANGE IN VOLUME', 'D3'], [`${w_} = -\\,p_{\\text{ex}}\\,\\Delta V`, 'WORK', 'D4'], [`\\Delta V > 0 \\Rightarrow ${w_} < 0`, 'GAS SPENDS ENERGY', 'D5'], [`p_{\\text{ex}} = 0 \\Rightarrow ${w_} = 0`, 'FREE EXPANSION', 'D6']];
$('#drs').innerHTML = DR.map(([k, w], i) => `<div class="dr" id="dr${i}" style="top:${76 + i * 96}px"><div class="nn">${i + 1}</div><div class="dk">${K(k)}</div><div class="dw">${w}</div></div>`).join('');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${U_} = ${q_} + ${w_}`);
const stmt = statement(SW, [wt('T1', 'Delta'), wt('T1', 'Plus'), wt('T1', 'into')]);

/* ---------- W ---------- */
$('#wq').innerHTML = `Heat in 300 J · gas grows 2 L → 4 L · against p<sub>ex</sub> = 1 bar · find ${K(U_)}`;
const WR = [[`${q_} = +300\\ ${tx('J')}`, 'W3'], [`${w_} = -(1\\ ${tx('bar')})(4 - 2)\\ ${tx('L')} = -2\\ ${tx('L bar')}`, 'W4'], [`1\\ ${tx('L bar')} = 100\\ ${tx('J')} \\Rightarrow ${w_} = -200\\ ${tx('J')}`, 'W5'], [`${U_} = 300 + (-200) = \\textcolor{${UC}}{+100\\ ${tx('J')}}`, 'W6'], [`${tx('Kept 100 J, spent 200 J pushing the piston')}`, 'W7']];
$('#wrs').innerHTML = WR.map(([k], i) => `<div class="wr5" id="w5${i}" style="top:${132 + i * 84}px"><div class="nn">${i + 1}</div><div class="wf">${K(k)}</div></div>`).join('');
const tWr = WR.map(r => T0(r[1]));
const gs = $('#gS'), G0 = 430, GS = 0.9;
mk(gs, 'line', { x1: 80, x2: 720, y1: G0, y2: G0, stroke: C.ink, 'stroke-width': 3 }); txt(gs, 72, G0 + 6, '0', { 'text-anchor': 'end' });
const WB = [[200, 0, 300, HI, 'q = +300', 'HEAT IN', 'W3'], [392, 300, 100, WC, 'w = -200', 'WORK BY GAS', 'W5'], [584, 0, 100, UC, 'ΔU = +100', 'KEPT', 'W6']].map(([x, a, b, c, v, k, id]) => {
  const r = mk(gs, 'rect', { x: x - 70, width: 140, rx: 8, fill: c }); const vl = txt(gs, x, 0, v, { 'text-anchor': 'middle', fill: c, 'font-size': 24, 'font-weight': 600 }); const kl = txt(gs, x, G0 + 40, k, { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 16 }); return { x, a, b, r, vl, kl, id }; });
const conn = mk(gs, 'path', { d: `M270 ${G0 - 300 * GS} H322 M462 ${G0 - 100 * GS} H514`, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 5', fill: 'none' });

/* ---------- exam + ending ---------- */
const ts = $('#tS'), TC2 = cyl(ts, 160, 330, 240, 5); TC2.upd(110, 0); attr(TC2.g, 'transform', 'translate(0 0)');
const tWa = arrowP(ts, WC).set(245, -10, 245, 0);
const tl1 = txt(ts, 360, 120, 'WORK ON THE GAS', { fill: WC, 'font-weight': 600, 'font-size': 16 }), tl2 = txt(ts, 360, 150, 'NCERT: w > 0', { fill: WC, 'font-weight': 600, 'font-size': 16 });
const end = endBuild({
  wrong: 'ΔU = q - w (with w as work done on the system)', right: 'NCERT: w is work done on the system, so ΔU = q + w',
  tWrong: wt('X2', 'Some') - 0.1, tStrike: wt('X3', 'NCERT') - 0.1, tRight: wt('X3', 'plus') - 0.3,
  trapArt: t => { fade(TC2.g, t, wt('X2', 'books')); TC2.upd(110 + 30 * M.io((t - wt('X3', 'work')) / 1.2), t * 1.6); tWa.set(245, 30, 245, 100 + 30 * M.io((t - wt('X3', 'work')) / 1.2)); fade(tWa, t, wt('X3', 'work') - 0.1); fade(tl1, t, wt('X3', 'work')); fade(tl2, t, wt('X3', 'plus')); },
  on: [], tLight: [], tType: wt('E1', 'Expect'), type: 'Sign questions, and short numericals that find ΔU, q or w',
  pat: 'NEET PATTERN · ORIGINAL QUESTION', ans: 0,
  mcq: { q: 'A system gives out 120 J of heat while 200 J of work is done on it. ΔU = ?', opts: [K(`+80\\ ${tx('J')}`), K(`-80\\ ${tx('J')}`), K(`+320\\ ${tx('J')}`), K(`-320\\ ${tx('J')}`)] },
  tOpts: wt('Q1', 'Find'),
  sol: [K(`${tx('Heat out:')}\\ ${q_} = -120\\ ${tx('J')}`), K(`${tx('Work on:')}\\ ${w_} = +200\\ ${tx('J')}`), K(`${U_} = -120 + 200 = +80\\ ${tx('J')}`), K(`${tx('B: signs flipped')}`)],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'trap')],
  fTitle: 'Recap · first law of thermodynamics',
  fLines: [K(`${U_} = ${q_} + ${w_}`), '<b>Heat</b>: in q &gt; 0, out q &lt; 0 · <b>Work</b>: on w &gt; 0, by w &lt; 0', '<b>Work of expansion</b>: w = -p<sub>ex</sub> ΔV · <b>vacuum</b>: p<sub>ex</sub> = 0, so w = 0', '<b>U</b>: a state function, we measure only ΔU · 1 L bar = 100 J', '<b>First law</b>: energy is never made or destroyed · isolated: ΔU = 0'],
  yq: ['What are the only two ways energy can cross a boundary?', 'In NCERT, is work done by a gas plus or minus?', 'Why is the work zero when a gas expands into a vacuum?'],
  nextL: 'NEXT · EP 53', nextT: 'Why does the pan heat before the water? Enthalpy and Heat Capacity',
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
    const out = OUT('S1'), tM = T0('P2');
    M.vis($('#pa'), t, tP1 + 0.05, out, { dy: 36, ...o }); grow($('#pa'), paIn, t, tM - 0.2);
    const lv = t < wt('P4', 'change') ? M.lerp(0.25, 0.6, M.io((t - tP1 - 0.5) / 2.5)) : M.lerp(JB - yI, JB - yF, M.io((t - wt('P4', 'change')) / 1.2)) / (JB - JT);
    const h = (JB - JT - 16) * lv; attr(jf, 'y', (JB - 8 - h).toFixed(1)); attr(jf, 'height', h.toFixed(1));
    coins.forEach((c, k) => { const tc = tP1 + 0.6 + k * 0.8, u = M.clamp((t - tc) / 0.7); place(c, JX + JW / 2 + (k - 1) * 30, M.lerp(40, JT + 40, u * u)); c.style.opacity = (u > 0 && u < 1 ? 1 : 0).toString(); });
    fade(uLab, t, wt('P3', 'internal'));
    [brk, dUl, lI, lF].forEach(e => fade(e, t, wt('P4', 'change') + 0.4));
    M.vis($('#sfP'), t, wt('P5', 'state') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, tM - 0.1, out, { dx: 60, dy: 0, ...o });
    MT.forEach(([, tt], i) => { M.vis($('#mt' + i), t, tt - 0.15, 1e9, { ...POP }); setBg($('#mt' + i), mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tt - 1.2) / 0.4)))); });
    setMol(MM[0], 172 + 90 * Math.sin(t * 1.6), 130, 0, 70);
    setMol(MM[1], 172, 130, t * 2.2, 70);
    setMol(MM[2], 172, 130, 0, 70 + 22 * Math.sin(t * 9));
    setMol(MM[3], 172, 130, 0, 70); bondGlow.setAttribute('opacity', (0.25 + 0.2 * Math.sin(t * 4)).toFixed(3));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1'), tPu = wt('S2', 'Push'), tFl = wt('S4', 'flame'), tUp = wt('S5', 'push');
    M.vis($('#bn'), t, tS1 + 0.05, out, { dy: 36, ...o }); M.vis($('#ub'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const py = PYk(t); CY.upd(py, phase(SPk, tS1, t)); fade(CY.g, t, tS1 + 0.2);
    wDn.set(392, py - 190, 392, py - 132); fade(wDn, t, tPu - 0.3, tPu + 2.0);
    wUp.set(470, py - 60, 470, py - 140); fade(wUp, t, tUp - 0.2, out);
    M.setT(wL, t < tUp - 0.3 ? 'PUSH · WORK ON GAS' : 'GAS PUSHES · WORK BY GAS'); attr(wL, 'x', t < tUp - 0.3 ? 412 : 490); attr(wL, 'y', (t < tUp - 0.3 ? py - 170 : py - 100).toFixed(1));
    fade(wL, t, tPu - 0.2, tPu + 2.0); if (t > tUp - 0.3) fade(wL, t, tUp - 0.1, out);
    fade(flame, t, tFl - 0.1, wt('S5', 'Now')); hIn.forEach(w => { fade(w.g, t, wt('S4', 'flows') - 0.2, wt('S5', 'Now')); attr(w.pa, 'stroke-dashoffset', (t * 40).toFixed(1)); });
    const lv = M.lerp(0.3, 0.2, 0) + 0.3 * (SPk(t) - 1); const h = (UB - UT - 16) * M.clamp(lv); attr(uf, 'y', (UB - 8 - h).toFixed(1)); attr(uf, 'height', h.toFixed(1));
    UR.forEach((r, i) => { const el = $('#ur' + i); M.vis(el, t, r[4] - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - r[4]) / 0.25) * (1 - M.io((t - (UR[i + 1] ? UR[i + 1][4] : tS6)) / 0.3)))); });
    M.vis($('#twoP'), t, tS6 - 0.1, 1e9, POP);
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tB1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('B1');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dy: 36, ...o }); M.vis($('#vr'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    SA.forEach((s, i) => { fade(s.a, t, tSA[i] - 0.1); fade(s.l, t, tSA[i]); });
    SG.forEach(([, , tt], i) => { const el = $('#sg' + i); M.vis(el, t, tt - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tt - 1.4) / 0.4)))); });
    M.vis($('#mnP'), t, wt('V4', 'money') - 0.1, 1e9, POP);
    PUC.write($('#eqF'), t, wt('V5', 'Delta') - 0.1, 1.0);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B3');
    M.vis($('#bl'), t, tB1 + 0.05, out, { dy: 36, ...o }); M.vis($('#br'), t, T0('B2') - 0.1, out, { dx: 60, dy: 0, ...o });
    FL.forEach((f, i) => M.vis($('#fl' + i), t, f[3] - 0.15, 1e9, { dx: -16, dy: 0 }));
    iM.forEach(m => { attr(m.c, 'cx', (262 + tri(m.ox + m.vx * t, 260)).toFixed(1)); attr(m.c, 'cy', (136 + tri(m.oy + m.vy * t, 220)).toFixed(1)); });
    iX.forEach(x => fade(x, t, wt('B2', 'isolated')));
    PUC.write($('#isoK'), t, wt('B2', 'constant') - 0.1, 0.9);
    M.vis($('#th1'), t, T0('B3') + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: T0('B3'), tOpts: wt('B3', 'plus') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: wt('B4', 'Work') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1'), tVac = wt('D6', 'vacuum');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dy: 36, ...o }); M.vis($('#dr'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.setT($('#dlL'), t < tVac - 0.2 ? 'MOLECULE BENCH · GAS EXPANDS' : 'MOLECULE BENCH · FREE EXPANSION');
    const py = DPk(t); DC.upd(py, t * 1.4); fade(DC.g, t, tD1 + 0.2);
    pex.forEach((a, i) => { a.set([292, 392, 492][i] + (i === 1 ? 60 : 0), py - 150, [292, 392, 492][i] + (i === 1 ? 60 : 0), py - 24); fade(a, t, wt('D2', 'outside') - 0.2, T0('D6') + 0.3); });
    fade(pexL, t, wt('D2', 'outside'), T0('D6') + 0.3); attr(pexL, 'y', (py - 120).toFixed(1));
    fade(vac, t, tVac - 0.1);
    [viL, viT].forEach(e => fade(e, t, wt('D3', 'V') - 0.1)); [vfL, vfT].forEach(e => fade(e, t, wt('D3', 'V', 2) - 0.1));
    fade(dvA, t, wt('D3', 'change'), T0('D6')); fade(dvT, t, wt('D3', 'change') + 0.1, T0('D6'));
    DR.forEach((r, i) => { const el = $('#dr' + i), tt = T0(r[2]); M.vis(el, t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - (DR[i + 1] ? T0(DR[i + 1][2]) : out)) / 0.25)))); });
  }

  stmt(t);

  /* W */
  const wOn = t >= tW1 - 0.1 && t < T0('X1') + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dy: 36, ...o }); grow($('#wl'), null, t, tWr[0] - 0.2);
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    WR.forEach((r, i) => { const el = $('#w5' + i); M.vis(el, t, tWr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tWr[i]) / 0.25) * (1 - M.io((t - (i < 4 ? tWr[i + 1] : 1e9)) / 0.25)))); });
    M.vis($('#wr'), t, tWr[0] - 0.1, out, { dx: 60, dy: 0, ...o });
    WB.forEach(b => { const u = M.io((t - T0(b.id) - 0.2) / 0.7), y1 = G0 - b.a * GS, y2 = G0 - M.lerp(b.a, b.b, u) * GS, top = Math.min(y1, y2), h = Math.abs(y2 - y1);
      attr(b.r, 'y', top.toFixed(1)); attr(b.r, 'height', h.toFixed(1)); M.hide(b.r, u <= 0.01); attr(b.vl, 'y', (b.b < b.a ? y1 - 14 : top - 14).toFixed(1)); fade(b.vl, t, T0(b.id) + 0.6); fade(b.kl, t, T0(b.id) + 0.3); });
    fade(conn, t, T0('W6'));
  }

  end(t);
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
end.sfx();
M.outro({});
})();
