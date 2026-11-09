// PUC Chemistry Ep 53 (Molecule bench)
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
// colour-coding (bench, KaTeX, readouts, recap): U teal, H gold, heat q red (in) / blue (out), gas moles Δn_g violet, temperature orange, work violet-free ink
const UC = C.ac, HC = '#B7791F', HI = C.red, HO = '#2F6FEB', NG = '#7A4FE0', TC = '#C8461B';
const tx = s => `\\text{${s}}`;
const dU = `\\textcolor{${UC}}{\\Delta U}`, dH = `\\textcolor{${HC}}{\\Delta H}`, Hh = `\\textcolor{${HC}}{H}`, Uu = `\\textcolor{${UC}}{U}`, q_ = `\\textcolor{${HI}}{q}`, dn = `\\textcolor{${NG}}{\\Delta n_{\\text{g}}}`, dT = `\\textcolor{${TC}}{\\Delta T}`;
const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
const phase = (f, ta, t) => { if (t <= ta) return (t - ta) * f(ta); const n = Math.ceil((t - ta) / 0.05), dt = (t - ta) / n; let s = 0; for (let i = 0; i < n; i++) s += f(ta + (i + 0.5) * dt) * dt; return s; };
const wave = (p, col) => { const g = mk(p, 'g', {}); const pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '16 10' }); const hd = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return { g, pa, hd }; };
const waveV = (w, x, y, d, L) => { let s = `M${x} ${y}`; const n = 4, st = L / n; for (let k = 0; k < n; k++) s += ` q${k % 2 ? 10 : -10} ${(d * st / 2).toFixed(1)} 0 ${(d * st).toFixed(1)}`; attr(w.pa, 'd', s); const ey = y + d * L; attr(w.hd, 'd', `M${x - 12} ${ey - d * 14} L${x} ${ey + d * 4} L${x + 12} ${ey - d * 14}`); };
const flames = (p, xs, y) => { const g = mk(p, 'g', {}); xs.forEach(x => mk(g, 'path', { d: `M${x} ${y} c-16 -12 -12 -30 0 -46 c12 16 16 34 0 46z`, fill: '#E8742A', stroke: HI, 'stroke-width': 3 })); return g; };
const cyl = (p, x0, x1, yt, yb, n, seed) => { const g = mk(p, 'g', {});
  mk(g, 'rect', { x: x0, y: yt, width: x1 - x0, height: yb - yt, fill: '#FFF7F2' }); const gas = mk(g, 'rect', { x: x0, width: x1 - x0, fill: '#FDEBDD' });
  mk(g, 'path', { d: `M${x0} ${yt + 10} V${yb} H${x1} V${yt + 10}`, fill: 'none', stroke: C.ink2, 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  const rn = M.rng(seed); const ms = [...Array(n)].map(() => ({ c: mk(g, 'circle', { r: 9, fill: UC }), vx: 60 + 80 * rn(), vy: 55 + 70 * rn(), ox: 900 * rn(), oy: 900 * rn() }));
  const pis = mk(g, 'g', {}); mk(pis, 'rect', { x: x0 + 5, y: -14, width: x1 - x0 - 10, height: 20, rx: 4, fill: '#8A93A6', stroke: C.ink2, 'stroke-width': 3 });
  return { g, pis, upd: (py, ph) => { place(pis, 0, py); attr(gas, 'y', py + 6); attr(gas, 'height', Math.max(0, yb - py - 6)); const l = x0 + 16, w = x1 - x0 - 32, h = yb - py - 32;
    ms.forEach(m => { attr(m.c, 'cx', (l + tri(m.ox + m.vx * ph, w)).toFixed(1)); attr(m.c, 'cy', (py + 22 + tri(m.oy + m.vy * ph, Math.max(10, h))).toFixed(1)); }); } }; };
const thermo = (p, x, yt, h) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x - 10, y: yt, width: 20, height: h, rx: 10, fill: '#fff', stroke: C.dim, 'stroke-width': 2 }); mk(g, 'circle', { cx: x, cy: yt + h + 10, r: 14, fill: TC }); const f = mk(g, 'rect', { x: x - 5, width: 10, rx: 5, fill: TC }); return { g, set: u => { const hh = (h - 8) * M.clamp(u); attr(f, 'y', (yt + h + 2 - hh).toFixed(1)); attr(f, 'height', (hh + 4).toFixed(1)); } }; };
const rows = (host, cls, list, top, step) => { $(host).innerHTML = list.map((r, i) => `<div class="${cls}" id="${cls}${i}" style="top:${top + i * step}px"><div class="nn">${i + 1}</div><div class="${cls === 'er' ? 'ek' : 'wf'}">${K(r[0])}</div>${r[1] ? `<div class="ew">${r[1]}</div>` : ''}</div>`).join(''); };
const lit = (el, t, tt, tn) => setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tn) / 0.3))));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tV1 = T0('V1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tQ = T0('Q1');
const SW = [[tT, tW1], [tQ, tQ + 0.06], [T0('F1'), T0('F1') + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H ---------- */
const hook = hookBuild({
  jobs: [['sun', 'Beach sand', 'HOT BY NOON', wt('H1', 'sand')], ['waves', 'The sea', 'STAYS COOL', wt('H1', 'sea')], ['pan', 'Steel pan', 'HOT IN A MINUTE', wt('H1', 'pan')]],
  chipL: 'WARMS', chip: (t, i) => t >= wt('H5', 'heat') ? ['fast', 'slow', 'fast'][i] : '?', tChip: wt('H2', 'speeds'),
  kit: [['pan', 'Pan on stove', wt('H3', 'pan')], ['thermo', 'Rim too hot', wt('H4', 'rim')], ['droplet', 'Water warm', wt('H4', 'water')]], hiKit: 2,
  tMorph, tScene: T0('H3'), tPill: wt('H2', 'Same'), tTz: wt('H5', 'why'), tEnd: tP1,
});

/* ---------- P: sealed box vs open piston ---------- */
const ps = $('#pS');
const box = mk(ps, 'g', {}); mk(box, 'rect', { x: 70, y: 150, width: 260, height: 240, rx: 8, fill: '#FFF7F2', stroke: C.ink2, 'stroke-width': 8 });
[[90, 170], [310, 170], [90, 370], [310, 370]].forEach(([x, y]) => mk(box, 'circle', { cx: x, cy: y, r: 6, fill: C.ink2 }));
const bxM = [...Array(7)].map((_, k) => { const rn = M.rng(70 + k); return { c: mk(box, 'circle', { r: 9, fill: UC }), vx: 60 + 80 * rn(), vy: 50 + 80 * rn(), ox: 900 * rn(), oy: 900 * rn() }; });
const bxF = flames(ps, [150, 250], 470); const bxW = wave(ps, HI); waveV(bxW, 200, 470, -1, 60);
const bxL = txt(ps, 200, 128, 'SEALED · V FIXED · NO WORK', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16 });
const CP = cyl(ps, 454, 714, 150, 390, 6, 9); const cpF = flames(ps, [534, 634], 470); const cpW = wave(ps, HI); waveV(cpW, 584, 470, -1, 60);
const air = [0, 1, 2].map(k => mk(ps, 'circle', { r: 7, fill: C.dim }));
const cpL = txt(ps, 584, 128, 'OPEN · p STEADY · V GROWS', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16 });
const PR = [[`${dU} = ${q_} + w`, 'LAST TIME', T0('P1')], [`${tx('sealed:')}\\ ${dU} = ${q_}_{V}`, 'CONSTANT VOLUME', wt('P2', 'goes')], [`${Hh} = ${Uu} + pV`, 'ENTHALPY', wt('P5', 'equals')], [`${q_}_{p} = ${dH}`, 'CONSTANT PRESSURE', wt('P6', 'equals')]];
rows('#prs', 'er', PR.map(r => [r[0], r[1]]), 80, 104);
const PYc = M.keys([[0, 300], [wt('P4', 'gas'), 200]], 1.6);

/* ---------- S: derivation + gas mole counter ---------- */
const DR = [[`${dH} = ${dU} + p\\,\\Delta V`, 'AT CONSTANT p', 'S2'], [`pV = nRT \\Rightarrow p\\,\\Delta V = ${dn} RT`, 'GASES', 'S3'], [`${dn} = n_{\\text{gas, products}} - n_{\\text{gas, reactants}}`, '', 'S4'], [`${dH} = ${dU} + ${dn} RT`, 'THE LINK', 'S5'], [`${dH} < 0\\ ${tx('exo')} \\quad ${dH} > 0\\ ${tx('endo')}`, 'SIGN', 'S6']];
rows('#drs', 'er', DR.map(r => [r[0], r[1]]), 80, 96);
$('#lkK').innerHTML = K(`${dH} \\;\\; ? \\;\\; ${dU}`);
const gsv = $('#gS');
const sol1 = mk(gsv, 'rect', { x: 130, y: 230, width: 110, height: 110, rx: 10, fill: '#C9CED6', stroke: C.ink2, 'stroke-width': 4 });
const arr = mk(gsv, 'path', { d: 'M300 285 H420 M404 271 L420 285 L404 299', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const sol2 = mk(gsv, 'rect', { x: 470, y: 260, width: 80, height: 80, rx: 10, fill: '#E6E1D6', stroke: C.ink2, 'stroke-width': 4 });
const co2 = mk(gsv, 'g', {}); mk(co2, 'line', { x1: -28, x2: 28, y1: 0, y2: 0, stroke: C.ink2, 'stroke-width': 5 }); atomG(co2, 14, '#7A4FE0', 'O', 12); const cA = atomG(co2, 18, '#16213E', 'C', 15); const o1 = atomG(co2, 14, NG, 'O', 12), o2 = atomG(co2, 14, NG, 'O', 12); place(o1, -30, 0); place(o2, 30, 0); co2.firstChild.nextSibling.remove();
const gL = txt(gsv, 640, 186, 'GAS', { 'text-anchor': 'middle', fill: NG, 'font-weight': 600 });
$('#rxK').innerHTML = K(`\\mathrm{CaCO_3(s)} \\rightarrow \\mathrm{CaO(s)} + \\textcolor{${NG}}{\\mathrm{CO_2(g)}}`);
$('#cntK').innerHTML = K(`${dn} = 1 - 0 = \\textcolor{${NG}}{+1}`);
$('#exP').innerHTML = `${M.icon('arrowD', 22, HO, 2.6)}<span>${K(`${dH} < 0`)} heat out</span>`; $('#enP').innerHTML = `${M.icon('arrowU', 22, HI, 2.6)}<span>${K(`${dH} > 0`)} heat in</span>`;

/* ---------- V: one flame, two pots ---------- */
const vs = $('#vS');
const stl = mk(vs, 'g', {}); mk(stl, 'rect', { x: 110, y: 250, width: 200, height: 150, rx: 10, fill: '#B9C2CC', stroke: C.ink2, 'stroke-width': 5 }); txt(stl, 210, 434, 'STEEL · 100 g', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const wat = mk(vs, 'g', {}); mk(wat, 'path', { d: 'M454 200 V400 H674 V200', fill: 'none', stroke: C.ink2, 'stroke-width': 5, 'stroke-linejoin': 'round' }); mk(wat, 'rect', { x: 458, y: 250, width: 212, height: 148, fill: '#DDF1F1' }); txt(wat, 564, 434, 'WATER · 100 g', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const vF = flames(vs, [170, 250, 524, 604], 540); const vW = [wave(vs, HI), wave(vs, HI)]; waveV(vW[0], 210, 520, -1, 50); waveV(vW[1], 564, 520, -1, 50);
const thS = thermo(vs, 350, 150, 220), thW = thermo(vs, 714, 150, 220);
const tS = txt(vs, 350, 130, 'FAST', { 'text-anchor': 'middle', fill: TC, 'font-weight': 600 }), tW = txt(vs, 714, 130, 'SLOW', { 'text-anchor': 'middle', fill: TC, 'font-weight': 600 });
const VR = [[`${q_} = C\\,${dT}`, 'HEAT CAPACITY', wt('V2', 'equals')], [`${tx('wide bucket: big')}\\ C`, 'RISES SLOWLY', wt('V3', 'bucket')], [`c_{\\text{water}} \\approx 4.18\\ ${tx('J g')}^{-1}\\,${tx('K')}^{-1}`, 'PER GRAM', wt('V4', 'water')], [`${q_} = m\\,c\\,${dT}`, '', wt('V5', 'equals')], [`100 \\times 4.18 \\times 10 = 4180\\ ${tx('J')}`, '', wt('V6', 'need')]];
rows('#vrs', 'er', VR.map(r => [r[0], r[1]]), 80, 96);
const tRace = T0('V2');

/* ---------- C: Cv vs Cp ---------- */
const cs = $('#cS'), CV = cyl(cs, 90, 330, 160, 420, 6, 21), CPp = cyl(cs, 454, 694, 160, 420, 6, 23);
const pins = mk(cs, 'g', {}); [84, 336].forEach(x => mk(pins, 'rect', { x: x - 8, y: 214, width: 16, height: 30, rx: 4, fill: C.red }));
const cF = flames(cs, [170, 250, 534, 614], 520); const cW = [wave(cs, HI), wave(cs, HI)]; waveV(cW[0], 210, 500, -1, 50); waveV(cW[1], 574, 500, -1, 50);
const cvL = txt(cs, 210, 140, 'PISTON LOCKED · C v', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }), cpL2 = txt(cs, 574, 140, 'PISTON FREE · C p', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const CR = [[`C_V`, 'ALL HEAT WARMS THE GAS', wt('C2', 'C')], [`C_p`, 'SOME HEAT LIFTS THE PISTON', wt('C3', 'C')], [`C_p > C_V`, 'SO C p IS BIGGER', wt('C3', 'bigger')]];
rows('#crs', 'er', CR.map(r => [r[0], r[1]]), 80, 104);
$('#cpF').innerHTML = K(`C_p - C_V = R`);
const PYp = M.keys([[0, 240], [wt('C3', 'pushing'), 190]], 1.6);

/* ---------- K: calorimeters ---------- */
const k1 = $('#kS1');
mk(k1, 'path', { d: 'M180 140 V430 H600 V140', fill: '#DDF1F1', stroke: C.ink2, 'stroke-width': 6, 'stroke-linejoin': 'round' });
mk(k1, 'rect', { x: 320, y: 230, width: 140, height: 150, rx: 18, fill: '#8A93A6', stroke: C.ink2, 'stroke-width': 5 });
mk(k1, 'rect', { x: 350, y: 210, width: 80, height: 26, rx: 6, fill: '#6B7486', stroke: C.ink2, 'stroke-width': 4 });
txt(k1, 390, 312, 'STEEL BOMB', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 16 }); txt(k1, 240, 418, 'WATER', { 'text-anchor': 'middle', fill: '#4E7FA3', 'font-weight': 600, 'font-size': 16 });
mk(k1, 'path', { d: 'M250 110 V360 M230 360 H270', stroke: C.ink2, 'stroke-width': 5, fill: 'none' }); txt(k1, 250, 96, 'STIRRER', { 'text-anchor': 'middle', 'font-size': 14 });
const kT1 = thermo(k1, 540, 90, 260);
const k2 = $('#kS2');
mk(k2, 'path', { d: 'M250 180 L280 440 H500 L530 180', fill: '#fff', stroke: C.ink2, 'stroke-width': 6, 'stroke-linejoin': 'round' });
mk(k2, 'path', { d: 'M272 210 L296 420 H484 L508 210', fill: '#FDEBDD', stroke: C.ink2, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(k2, 'rect', { x: 236, y: 160, width: 308, height: 22, rx: 8, fill: '#C9CED6', stroke: C.ink2, 'stroke-width': 4 });
txt(k2, 390, 380, 'SOLUTION', { 'text-anchor': 'middle', fill: TC, 'font-weight': 600, 'font-size': 16 }); txt(k2, 640, 200, 'OPEN TO AIR', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const kT2 = thermo(k2, 430, 60, 280);
$('#kP1').innerHTML = `Measures ${K(dU)}`; $('#kP2').innerHTML = `Measures ${K(dH)}`;
const th1 = PUC.think($('#th1'), { q: 'A reaction runs in a sealed bomb calorimeter. ΔU or ΔH?', opts: ['ΔU', 'ΔH'], right: 0, why: 'The volume cannot change, so no work is done: the heat equals ΔU.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${q_}_{V} = ${dU} \\qquad ${q_}_{p} = ${dH}`);
const stmt = statement(SW, [wt('T1', 'Constant'), wt('T1', 'Constant', 1), wt('T1', 'Delta', 1)]);

/* ---------- W: vaporisation ---------- */
$('#wq').innerHTML = K(`${dH}_{\\text{vap}} = 41\\ ${tx('kJ mol')}^{-1},\\ 373\\ ${tx('K')},\\ 1\\ ${tx('bar')}.\\ ${tx('Find')}\\ ${dU}.`);
const WR = [[`\\mathrm{H_2O(l)} \\rightarrow \\textcolor{${NG}}{\\mathrm{H_2O(g)}}`, 'W3'], [`${dn} = 1 - 0 = 1`, 'W4'], [`${dU} = ${dH} - ${dn} RT`, 'W5'], [`RT = 8.314 \\times 10^{-3} \\times 373 \\approx 3.1\\ ${tx('kJ mol')}^{-1}`, 'W6'], [`${dU} = 41 - 3.1 \\approx \\textcolor{${UC}}{37.9\\ ${tx('kJ mol')}^{-1}}`, 'W7']];
rows('#wrs', 'wr5', WR.map(r => [r[0]]), 140, 82);
const tWr = WR.map(r => T0(r[1]));
const bsv = $('#bS');
mk(bsv, 'path', { d: 'M250 200 V420 H534 V200', fill: 'none', stroke: C.ink2, 'stroke-width': 6, 'stroke-linejoin': 'round' });
const liq = mk(bsv, 'rect', { x: 255, y: 290, width: 274, height: 126, fill: '#DDF1F1' });
const bF = flames(bsv, [330, 450], 470);
const vap = [...Array(5)].map((_, k) => { const g = mk(bsv, 'g', {}); mk(g, 'circle', { r: 13, fill: NG }); return g; });
const lab0 = txt(bsv, 392, 400, 'LIQUID: COUNTS 0', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const lab1 = txt(bsv, 600, 130, 'GAS: 1 mol', { fill: NG, 'font-weight': 600 });

/* ---------- exam + ending ---------- */
const tsv = $('#tS');
const tg = [[60, 110], [110, 150], [80, 190]].map(([x, y]) => mk(tsv, 'circle', { cx: x, cy: y, r: 13, fill: NG }));
const tg1 = txt(tsv, 90, 240, 'GAS: 3 mol', { 'text-anchor': 'middle', fill: NG, 'font-weight': 600, 'font-size': 16 });
const ta = mk(tsv, 'path', { d: 'M170 150 H250 M236 138 L250 150 L236 162', stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const tb = mk(tsv, 'g', {}); mk(tb, 'path', { d: 'M290 90 V210 H400 V90', fill: 'none', stroke: C.ink2, 'stroke-width': 5 }); mk(tb, 'rect', { x: 294, y: 150, width: 102, height: 56, fill: '#DDF1F1' });
const tg2 = txt(tsv, 345, 240, 'LIQUID: 0', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const tk = txt(tsv, 420, 150, 'Δn g = 0 - 3', { fill: NG, 'font-weight': 600, 'font-size': 18 });
const end = endBuild({
  wrong: 'Count liquids and solids in Δn g', right: 'Δn g counts gas moles only: liquids and solids count zero',
  tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Only') - 0.1, tRight: wt('X3', 'gas') - 0.1,
  trapArt: t => { tg.forEach(e => fade(e, t, wt('X2', 'count'))); [tg1, ta].forEach(e => fade(e, t, wt('X2', 'liquids'))); [tb, tg2].forEach(e => fade(e, t, wt('X2', 'solids'))); fade(tk, t, wt('X3', 'gas')); },
  on: [], tLight: [], tType: wt('E1', 'Expect'), type: 'Numericals linking ΔH and ΔU, and questions on Cp - Cv',
  pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', ans: 0,
  mcq: { q: 'N₂(g) + 3H₂(g) → 2NH₃(g), ΔH = -92.4 kJ at 298 K. Find ΔU.', opts: [K(`-87.4\\ ${tx('kJ')}`), K(`-97.4\\ ${tx('kJ')}`), K(`-89.9\\ ${tx('kJ')}`), K(`-92.4\\ ${tx('kJ')}`)] },
  tOpts: wt('Q1', 'Find'),
  sol: [K(`${dn} = 2 - 4 = -2`), K(`${dn} RT = -4.95\\ ${tx('kJ')}`), K(`${dU} = -92.4 + 4.95 = -87.4\\ ${tx('kJ')}`), K(`${tx('C: used ')}${dn} = -1`)],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'trap')],
  fTitle: 'Recap · enthalpy and heat capacity',
  fLines: [K(`${dH} = ${dU} + ${dn} RT`), '<b>H = U + pV</b> · constant V: q = ΔU · constant p: q = ΔH', '<b>q = C ΔT = m c ΔT</b> · water: c ≈ 4.18 J g<sup>-1</sup> K<sup>-1</sup>', '<b>Ideal gas</b>: Cp - Cv = R · <b>bomb</b> gives ΔU, <b>coffee cup</b> gives ΔH', '<b>ΔH &lt; 0</b> exothermic · <b>ΔH &gt; 0</b> endothermic · Δn g counts gases only'],
  yq: ['Does a bomb calorimeter measure ΔU or ΔH?', 'Why does water warm up so slowly?', 'What is Cp - Cv, for one mole of an ideal gas?'],
  nextL: 'NEXT · EP 54', nextT: 'How much heat does cooking gas give? Enthalpy Changes of Reactions',
});

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const flow = (ws, t) => ws.forEach(w => attr(w.pa, 'stroke-dashoffset', (t * 40).toFixed(1)));

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t); hook(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1'), tB = T0('P2'), tO = T0('P3');
    M.vis($('#pa'), t, tP1 + 0.05, out, { dy: 36, ...o }); M.vis($('#pb'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PR.forEach((r, i) => { const el = $('#er' + i); M.vis(el, t, r[2] - 0.15, 1e9, { dx: -16, dy: 0 }); lit(el, t, r[2], PR[i + 1] ? PR[i + 1][2] : out); });
    fade(box, t, tB - 0.1); fade(bxL, t, tB); fade(bxF, t, wt('P2', 'heat') - 0.2); fade(bxW.g, t, wt('P2', 'heat')); flow([bxW, cpW], t);
    const sp = phase(u => 1 + 0.8 * M.io((u - wt('P2', 'heat')) / 3), tP1, t);
    bxM.forEach(m => { attr(m.c, 'cx', (90 + tri(m.ox + m.vx * sp, 220)).toFixed(1)); attr(m.c, 'cy', (170 + tri(m.oy + m.vy * sp, 200)).toFixed(1)); });
    const py = PYc(t); CP.upd(py, phase(u => 1 + 0.6 * M.io((u - tO) / 3), tP1, t)); fade(CP.g, t, tO - 0.1); fade(cpL, t, tO); fade(cpF, t, tO + 0.2); fade(cpW.g, t, tO + 0.4);
    air.forEach((a, k) => { attr(a, 'cx', 520 + k * 64); attr(a, 'cy', (py - 30 - 12 * Math.sin(t * 3 + k)).toFixed(1)); fade(a, t, wt('P4', 'air') - 0.1); });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1');
    M.vis($('#dl'), t, tS1 + 0.05, out, { dy: 36, ...o }); grow($('#dl'), null, t, T0('S4') - 0.3); M.vis($('#dr'), t, T0('S4') + 0.3, out, { dx: 60, dy: 0, ...o });
    DR.forEach((r, i) => { const el = $('#drs').children[i], tt = T0(r[2]); M.vis(el, t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); lit(el, t, tt, DR[i + 1] ? T0(DR[i + 1][2]) : out); });
    M.vis($('#lkK'), t, tS1 + 0.2, T0('S2') - 0.2, { ...POP, outDur: 0.25, ody: 0 }); M.vis($('#lkP'), t, tS1 + 0.3, T0('S4') - 0.4, { ...POP, outDur: 0.25, ody: 0 });
    PUC.write($('#rxK'), t, T0('S4') + 0.5, 1.0);
    fade(sol1, t, T0('S4') + 0.4); fade(arr, t, T0('S4') + 0.8); fade(sol2, t, wt('S4', 'products')); fade(gL, t, wt('S4', 'gas'));
    const u = M.io((t - wt('S4', 'products')) / 1.0); place(co2, M.lerp(510, 640, u) + 20 * Math.sin(t * 2) * u, M.lerp(300, 260, u) + 18 * Math.cos(t * 2.6) * u, 30 * Math.sin(t * 1.5)); fade(co2, t, wt('S4', 'products') - 0.1);
    PUC.write($('#cntK'), t, wt('S4', 'reactants') + 0.3, 0.9);
    M.vis($('#exP'), t, wt('S6', 'exothermic') - 0.2, 1e9, POP); M.vis($('#enP'), t, wt('S6', 'endothermic') - 0.2, 1e9, POP);
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tC1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('C1');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dy: 36, ...o }); M.vis($('#vr'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(stl, t, tV1 + 0.2); fade(wat, t, tV1 + 0.35); fade(vF, t, tV1 + 0.5); vW.forEach(w => fade(w.g, t, tRace)); flow(vW, t);
    [thS, thW].forEach(th => fade(th.g, t, tRace)); thS.set(0.1 + 0.85 * M.io((t - tRace) / 9)); thW.set(0.1 + 0.85 * M.clamp((t - tRace) / 80));
    fade(tS, t, wt('V7', 'Steel')); fade(tW, t, wt('V7', 'water'));
    VR.forEach((r, i) => { const el = $('#vrs').children[i]; M.vis(el, t, r[2] - 0.15, 1e9, { dx: -16, dy: 0 }); lit(el, t, r[2], VR[i + 1] ? VR[i + 1][2] : out); });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1'), tH = tC1 + 0.6;
    M.vis($('#cl'), t, tC1 + 0.05, out, { dy: 36, ...o }); M.vis($('#cr'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    CV.upd(240, phase(u => 1 + 0.9 * M.io((u - tH) / 4), tC1, t)); CPp.upd(PYp(t), phase(u => 1 + 0.5 * M.io((u - tH) / 4), tC1, t));
    fade(CV.g, t, tC1 + 0.2); fade(CPp.g, t, tC1 + 0.35); fade(pins, t, tC1 + 0.4); fade(cF, t, tH - 0.2); cW.forEach(w => fade(w.g, t, tH)); flow(cW, t);
    fade(cvL, t, wt('C2', 'C')); fade(cpL2, t, wt('C3', 'C'));
    CR.forEach((r, i) => { const el = $('#crs').children[i]; M.vis(el, t, r[2] - 0.15, 1e9, { dx: -16, dy: 0 }); lit(el, t, r[2], CR[i + 1] ? CR[i + 1][2] : out); });
    PUC.write($('#cpF'), t, wt('C4', 'C') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('B1');
    M.vis($('#kl'), t, tK1 + 0.05, out, { dy: 36, ...o }); M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tR = wt('K3', 'warms'); kT1.set(0.25 + 0.5 * M.io((t - tR) / 2.5)); kT2.set(0.25 + 0.5 * M.io((t - tR - 0.3) / 2.5));
    M.vis($('#kP1'), t, wt('K1', 'fixed') - 0.1, 1e9, POP); M.vis($('#kP2'), t, wt('K2', 'steady') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, T0('B1') + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: T0('B1'), tOpts: wt('B1', 'Delta') - 0.1, tCount: T1('B1') + 0.05, dur: 3, tAns: T0('B2') - 0.02, tWhy: wt('B2', 'volume') });
  }

  stmt(t);

  /* W */
  const wOn = t >= tW1 - 0.1 && t < T0('X1') + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dy: 36, ...o }); grow($('#wl'), null, t, tWr[0] - 0.2);
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    WR.forEach((r, i) => { const el = $('#wr5' + i); M.vis(el, t, tWr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); lit(el, t, tWr[i], i < 4 ? tWr[i + 1] : 1e9); });
    M.vis($('#wr'), t, tWr[0] + 0.4, out, { dx: 60, dy: 0, ...o });
    fade(bF, t, tWr[0] + 0.5);
    vap.forEach((g, k) => { const tk = tWr[0] + 0.8 + k * 0.7, u = ((t - tk) % 3.5 + 3.5) % 3.5 / 3.5, on = t > tk; place(g, 300 + k * 46 + 10 * Math.sin(t * 2 + k), M.lerp(280, 90, u)); g.style.opacity = on ? (1 - u * 0.6).toFixed(3) : '0'; });
    fade(lab0, t, T0('W3') + 1.2); fade(lab1, t, wt('W3', 'gas'));
    attr(liq, 'y', (290 + 30 * M.io((t - tWr[0]) / 8)).toFixed(1)); attr(liq, 'height', (126 - 30 * M.io((t - tWr[0]) / 8)).toFixed(1));
  }

  end(t);
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
end.sfx();
M.outro({});
})();
