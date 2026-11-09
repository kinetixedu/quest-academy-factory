// PUC Chemistry Ep 50 (Molecule bench)
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
  dna: ['m10 16 1.5 1.5', 'm14 8-1.5-1.5', 'M15 2c-1.798 1.998-2.518 3.995-2.807 5.993', 'm16.5 10.5 1 1', 'm17 6-2.891-2.891', 'M2 15c6.667-6 13.333 0 20-6', 'm20 9 .891.891', 'M3.109 14.109 4 15', 'm6.5 12.5 1 1', 'm7 18 2.891 2.891', 'M9 22c1.798-1.998 2.518-3.995 2.807-5.993'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  battery: ['M16 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1', 'M4 7h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z', 'M22 11v2'],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  cup: ['M17 8h1a4 4 0 1 1 0 8h-1', 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z', 'M6 2v2', 'M10 2v2', 'M14 2v2'],
  bike: ['M5.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3 11.5V14l-3-3 4-3 2 3h2'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
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
// colour-coding (bench, KaTeX, readouts, recap): F teal (element in play), H ink, O violet, N blue, C and S grey (weak pullers),
// shared electrons orange, hydrogen bond = dotted gold, delta-plus red, delta-minus navy
const FC = C.ac, HC = C.ink, OC = '#7A4FE0', NC = '#2F6FEB', GR = '#8A93A6', EC = '#C8461B', HB = '#B7791F', DP = C.red, DM = '#2B3A67';
const F_ = s => `\\textcolor{${FC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, O_ = s => `\\textcolor{${OC}}{\\mathrm{${s}}}`, N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GR}}{\\mathrm{${s}}}`;
const DOTS = `\\textcolor{${HB}}{\\cdots}`, dP = `^{\\textcolor{${DP}}{\\delta+}}`, dM = `^{\\textcolor{${DM}}{\\delta-}}`;
const HF1 = `${H_('H')}${dP}{-}${F_('F')}${dM}`;
const hbLine = (p, w = 6) => mk(p, 'line', { stroke: HB, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 11' });
const stick = (p, w = 6) => mk(p, 'line', { stroke: C.ink2, 'stroke-width': w, 'stroke-linecap': 'round' });

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P2'), tS1 = T0('S1'), tV1 = T0('V1'), tB1 = T0('B1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tQ = T0('Q1');
const SW = [[tT, tW1], [tQ, tQ + 0.06], [T0('F1'), T0('F1') + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H ---------- */
const hook = hookBuild({
  jobs: [['snow', 'Ice cube', 'FLOATS ON WATER', wt('H1', 'Ice')], ['thermo', 'Water', 'BOILS ONLY AT 100 °C', wt('H1', 'boils')], ['dna', 'DNA', 'TWO STRANDS STAY ZIPPED', wt('H1', 'strands')]],
  chipL: 'HELD BY', chip: (t, i) => t >= wt('H5', 'hydrogen') ? 'H-bonds' : '? pull', tChip: wt('H2', 'pull'),
  kit: [['snow', 'Ice cube', wt('H3', 'ice')], ['droplet', 'Water', wt('H3', 'glass')], ['arrowD', 'Most solids sink', wt('H4', 'sink')], ['check', 'Ice floats', wt('H4', 'floats')]], hiKit: 3,
  tMorph, tScene: T0('H3'), tPill: wt('H2', 'explains'), tTz: wt('H5', 'know'), tEnd: tP1,
});

/* ---------- P: tug of war + one H-F bond ---------- */
const rs = $('#rS'), RY = 210;
const rope = mk(rs, 'line', { x1: 150, y1: RY, x2: 634, y2: RY, stroke: '#B79B6B', 'stroke-width': 8, 'stroke-linecap': 'round' });
const kidL = mk(rs, 'g', {}), kidR = mk(rs, 'g', {});
kidL.innerHTML = `<circle r="54" fill="${C.soft}"/><g transform="translate(-30 -30)">${M.icon('user', 60, C.ink, 2.2)}</g>`;
kidR.innerHTML = `<circle r="54" fill="${C.soft}"/><g transform="translate(-30 -30)">${M.icon('user', 60, C.ink, 2.2)}</g>`;
place(kidL, 92, RY);
const knot = [mk(rs, 'circle', { r: 10, fill: EC }), mk(rs, 'circle', { r: 10, fill: EC })];
const knotL = txt(rs, 392, RY + 56, 'SHARED PAIR', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600 });
const strongL = txt(rs, 694, RY - 78, 'STRONGER', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const PT = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
const pqIn = wrapIn($('#pq'), 'pqIn');
// H-F bond
const hs = $('#hS'), HX = 250, FX = 530, BY = 200;
mk(hs, 'circle', { cx: FX, cy: BY, r: 96, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const hfSt = stick(hs, 7); seg(hfSt, [HX, BY], [FX, BY], 30, 48, 1);
const hA = atomG(hs, 30, HC, 'H', 28); place(hA, HX, BY); const fA = atomG(hs, 48, FC, 'F', 38); place(fA, FX, BY);
const pr = [mk(hs, 'circle', { r: 9, fill: EC }), mk(hs, 'circle', { r: 9, fill: EC })];
const dHp = txt(hs, HX, BY - 56, 'δ+', { 'text-anchor': 'middle', 'font-size': 34, fill: DP, 'font-weight': 600 });
const dFm = txt(hs, FX, BY - 116, 'δ-', { 'text-anchor': 'middle', 'font-size': 34, fill: DM, 'font-weight': 600 });
const pullA = mk(hs, 'path', { d: `M${FX - 120} ${BY + 74} H${FX - 40}`, stroke: FC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const pullH = mk(hs, 'path', { d: `M${FX - 54} ${BY + 64} L${FX - 40} ${BY + 74} L${FX - 54} ${BY + 84}`, stroke: FC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const pullT = txt(hs, FX - 80, BY + 112, 'F PULLS', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600 });
$('#hfF').innerHTML = K(HF1);

/* ---------- S: bench, H-F chain ---------- */
const bs = $('#bS');
const NMOL = 4, FXs = [92, 278, 464, 650], FYs = [240, 340, 240, 340], BL = 84;
const ang = i => Math.atan2((i % 2 ? 240 : 340) - FYs[i], 186) * 180 / Math.PI;
const END = FXs.map((x, i) => [x, FYs[i], ang(i)]);
const STA = [[150, 150, 205], [360, 420, -40], [560, 160, 125], [660, 430, 250]];
const hbL = [0, 1, 2].map(() => hbLine(bs));
const lpL = mk(bs, 'g', {});
const mols = STA.map(() => { const g = mk(bs, 'g', {}); const s = stick(g, 7); const f = atomG(g, 34, FC, 'F', 30); const h = atomG(g, 20, HC, 'H', 19); return { g, s, f, h }; });
const lps = [0, 1, 2, 3].map(() => [mk(lpL, 'circle', { r: 7, fill: EC }), mk(lpL, 'circle', { r: 7, fill: EC })]);
const dl = mk(bs, 'g', {});
const dLab = STA.map(() => [txt(dl, 0, 0, 'δ+', { 'text-anchor': 'middle', 'font-size': 22, fill: DP, 'font-weight': 600 }), txt(dl, 0, 0, 'δ-', { 'text-anchor': 'middle', 'font-size': 22, fill: DM, 'font-weight': 600 })]);
const bnIn = wrapIn($('#bn'), 'bnIn');
const btag = tag($('#bn'), 'right:36px;top:18px;background:var(--ink);color:#fff');
$('#eqH').innerHTML = K(`${HF1}${DOTS}${HF1}${DOTS}${HF1}`);
const RL = [['H joined to F, O or N', wt('S7', 'joined')], ['A lone pair on a nearby F, O or N', wt('S7', 'lone')], ['Much weaker than a covalent bond', wt('S8', 'weaker')], ['Strongest in solids, weakest in gases', wt('S8', 'strongest')]];
$('#rls').innerHTML = RL.map(([s], i) => `<div class="rl" id="rl${i}" style="top:${76 + i * 64}px"><div class="nn">${i + 1}</div>${s}</div>`).join('');
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Weak alone, but there are billions of them!' });
const tTurn = wt('S2', 'turns'), tLp = wt('S3', 'lone'), tHb = wt('S4', 'bond'), tDot = wt('S5', 'dotted'), tGrow = wt('S6', 'link');
const tMol = [tTurn - 0.3, tTurn - 0.1, tGrow - 0.2, tGrow + 0.1];
const tHbs = [tHb - 0.1, tGrow + 0.9, tGrow + 1.2];

/* ---------- V: inter vs intra ---------- */
const water = (p, o, a1, a2, r = 26) => { const H1 = pol(o, 72, a1), H2 = pol(o, 72, a2); const g = mk(p, 'g', {}); [H1, H2].forEach(h => { const s = stick(g, 6); seg(s, o, h, r, 17, 1); }); const og = atomG(g, r, OC, 'O', 24); place(og, ...o); [H1, H2].forEach(h => { const hg = atomG(g, 17, HC, 'H', 16); place(hg, ...h); }); return { g, H1, H2, o }; };
const v1 = $('#vS1');
const wA = water(v1, [210, 170], 0, 104.5), wB = water(v1, [430, 170], 52.25, -52.25);
const vHb = hbLine(v1); seg(vHb, wA.H1, wB.o, 17, 26, 1);
const vTag1 = txt(v1, 320, 120, 'H-BOND', { 'text-anchor': 'middle', fill: HB, 'font-weight': 600 });
// benzene ring helper (skeletal), substituents
const ring = (p, o, r, a0) => { const V = [0, 1, 2, 3, 4, 5].map(k => pol(o, r, a0 + 60 * k)); mk(p, 'path', { d: 'M' + V.map(v => v.map(n => n.toFixed(1)).join(' ')).join(' L') + ' Z', fill: 'none', stroke: C.ink2, 'stroke-width': 5, 'stroke-linejoin': 'round' }); mk(p, 'circle', { cx: o[0], cy: o[1], r: r * 0.6, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); return V; };
const grp = (p, a, b, ra, rb) => { const s = stick(p, 5); seg(s, a, b, ra, rb, 1); return s; };
const sm = (p, xy, r, fill, l, fs) => { const g = atomG(p, r, fill, l, fs); place(g, ...xy); return g; };
// para-nitrophenol (bottom of the inter card): OH left, NO2 right
const paraG = mk(v1, 'g', {});
{ const o = [392, 392], V = ring(paraG, o, 56, 0), Op = [V[3][0] - 58, o[1]], Hp = [Op[0] - 52, o[1]], N = [V[0][0] + 58, o[1]], Oa = pol(N, 52, -60), Ob = pol(N, 52, 60);
  grp(paraG, V[3], Op, 0, 20); grp(paraG, Op, Hp, 20, 14); grp(paraG, V[0], N, 0, 20); grp(paraG, N, Oa, 20, 20); grp(paraG, N, Ob, 20, 20);
  sm(paraG, Op, 20, OC, 'O', 18); sm(paraG, Hp, 14, HC, 'H', 14); sm(paraG, N, 20, NC, 'N', 18); sm(paraG, Oa, 20, OC, 'O', 18); sm(paraG, Ob, 20, OC, 'O', 18);
  const gh = [Hp[0] - 92, o[1]]; mk(paraG, 'circle', { cx: gh[0], cy: gh[1], r: 20, fill: 'none', stroke: OC, 'stroke-width': 3, 'stroke-dasharray': '6 6' }); txt(paraG, gh[0], gh[1] + 48, 'NEXT', { 'text-anchor': 'middle', 'font-size': 14 });
  const pl = hbLine(paraG, 5); seg(pl, Hp, gh, 14, 20, 1);
  txt(paraG, 36, 318, 'PARA-NITROPHENOL', { fill: C.ink, 'font-weight': 600 }); }
// ortho-nitrophenol (intra card)
const v2 = $('#vS2'), orthoG = mk(v2, 'g', { transform: 'translate(392 270) scale(1.25) translate(-380 -240)' });
const OR = {}; { const o = [360, 300], V = ring(orthoG, o, 80, -90), Op = [V[0][0], V[0][1] - 68], Hp = [Op[0] + 50, Op[1]], N = pol(V[1], 70, -30), Oa = pol(N, 56, -100), Ob = pol(N, 56, 20);
  OR.chel = mk(orthoG, 'path', { d: `M${Op} L${Hp} L${Oa} L${N} L${V[1]} L${V[0]} Z`, fill: HB, 'fill-opacity': 0.14, stroke: 'none' });
  grp(orthoG, V[0], Op, 0, 22); grp(orthoG, Op, Hp, 22, 16); grp(orthoG, V[1], N, 0, 22); grp(orthoG, N, Oa, 22, 22); grp(orthoG, N, Ob, 22, 22);
  OR.hb = hbLine(orthoG, 6); seg(OR.hb, Hp, Oa, 16, 22, 1);
  sm(orthoG, Op, 22, OC, 'O', 20); sm(orthoG, Hp, 16, HC, 'H', 15); sm(orthoG, N, 22, NC, 'N', 20); sm(orthoG, Oa, 22, OC, 'O', 20); sm(orthoG, Ob, 22, OC, 'O', 20);
  OR.l1 = txt(orthoG, Op[0] - 40, Op[1] + 8, 'O-H', { 'text-anchor': 'end', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
  OR.l2 = txt(orthoG, Ob[0] + 34, Ob[1] + 8, 'NO₂', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
  OR.l3 = txt(orthoG, (Hp[0] + Oa[0]) / 2 + 6, Hp[1] - 44, 'H-BOND INSIDE', { 'text-anchor': 'middle', fill: HB, 'font-weight': 600 }); }
const th1 = PUC.think($('#th1'), { q: 'Which one boils at a lower temperature?', opts: ['ortho-nitrophenol', 'para-nitrophenol'], right: 0, why: 'Ortho: its H-bond is used up inside, so molecules hold neighbours weakly.' });

/* ---------- statement ---------- */
$('#st2').innerHTML = 'Hydrogen holds <span class="acc">both</span> sides.';
$('#stF').innerHTML = K(`${F_('F')}{-}${H_('H')}${DOTS}${F_('F')}`);
const stmt = statement(SW, [wt('T1', 'hydrogen'), wt('T1', 'Hydrogen', 1), wt('T1', 'covalent')]);

/* ---------- W: worked example + boiling points ---------- */
const WR = [[`${G_('C')}${H_('H')}_4`, 'Methane', 'H on carbon: not F, O or N', 0, 'W3', 'methane'], [`${N_('N')}${H_('H')}_3`, 'Ammonia', 'H on N, and N has a lone pair', 1, 'W4', 'ammonia'],
  [`${H_('H')}_2${G_('S')}`, 'Hydrogen sulphide', 'S is not a strong puller', 0, 'W5', 'sulphide'], [`${G_('C')}${H_('H')}_3${O_('O')}${H_('H')}`, 'Methanol', 'H on oxygen', 1, 'W6', 'methanol']];
$('#wrs').innerHTML = WR.map(([f, n, why], i) => `<div class="wr" id="wr${i}" style="top:${136 + i * 92}px"><div class="wf">${K(f)}</div><div class="wn" id="wn${i}">${n}</div><div class="cm" id="wm${i}"></div></div>`).join('');
const tWr = WR.map(r => wt('W2', r[5])), tWv = WR.map(r => wt(r[4], r[3] ? 'Yes' : 'So'));
const bp = $('#bpS'), Y0 = 330, sc = 2.3;
mk(bp, 'line', { x1: 120, y1: Y0, x2: 680, y2: Y0, stroke: C.ink, 'stroke-width': 3 });
txt(bp, 112, Y0 + 6, '0 °C', { 'text-anchor': 'end' });
const bars = [[250, 100, HB, `H₂O`, 'H-BONDS'], [520, -60, GR, `H₂S`, 'NO H-BONDS']].map(([x, v, c, f, k]) => {
  const r = mk(bp, 'rect', { x: x - 80, width: 160, rx: 10, fill: c });
  const vl = txt(bp, x, 0, `${v} °C`, { 'text-anchor': 'middle', 'font-size': 32, fill: C.ink, 'font-weight': 600 });
  const fl = txt(bp, x, v > 0 ? Y0 + 44 : Y0 - 18, f, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 30, fill: C.ink, 'font-weight': 700 });
  const kl = txt(bp, x, v > 0 ? Y0 + 76 : Y0 - 52, k, { 'text-anchor': 'middle', 'font-size': 16, fill: c === GR ? C.mute : HB, 'font-weight': 600 });
  return { r, vl, fl, kl, v };
});
const tBar = [wt('W7', 'water'), wt('W7', 'minus')];

/* ---------- C: ice ---------- */
const is = $('#iS'), IC0 = [392, 270], IR = 160;
const ICE = [0, 1, 2, 3, 4, 5].map(k => { const a = 30 + 60 * k, o = pol(IC0, IR, a), aN = a + 120; return { o, a1: aN, a2: aN - 104.5 }; });
const LIQ = [[300, 210, 40], [420, 190, 160], [500, 290, 260], [380, 300, 90], [280, 330, 300], [420, 400, 200]];
const iHb = ICE.map(() => hbLine(is, 5)), iOut = ICE.map(() => hbLine(is, 4));
const iMol = ICE.map(() => { const g = mk(is, 'g', {}); const h = [0, 1].map(() => stick(g, 5)); const og = atomG(g, 24, OC, 'O', 20); const hg = [0, 1].map(() => atomG(g, 15, HC, 'H', 14)); return { g, h, og, hg }; });
const iEmpty = txt(is, IC0[0], IC0[1] + 7, 'EMPTY SPACE', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });
const EF = [['snow', 'Ice floats', wt('C6', 'floats')], ['droplet', 'Alcohol mixes', wt('C6', 'alcohol')], ['dna', 'DNA zips', wt('C6', 'strands')]];
$('#efs').innerHTML = EF.map(([ic, s], i) => `<div class="efx" id="ef${i}">${M.icon(ic, 22, C.ac, 2.2)}<span>${s}</span></div>`).join('');
const clIn = wrapIn($('#cl'), 'clIn');
$('#dns').innerHTML = [['Ice', '0.92 g/cm³', HB], ['Liquid water', '1.00 g/cm³', OC]].map(([l, v, c], i) => `<div class="dn" id="dn${i}" style="top:${80 + i * 96}px"><div class="dl">${l}</div><div class="dv" style="color:${c}">${v}</div></div>`).join('');
const gs = $('#gS'), WS = 360;
mk(gs, 'rect', { x: 236, y: WS, width: 312, height: 176, fill: '#DDF1F1' });
mk(gs, 'path', { d: 'M228 300 V540 H556 V300', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
mk(gs, 'line', { x1: 236, y1: WS, x2: 548, y2: WS, stroke: '#7FC8C8', 'stroke-width': 3 });
const cube = mk(gs, 'g', {}); mk(cube, 'rect', { x: -60, y: -60, width: 120, height: 120, rx: 14, fill: '#EEF6FB', stroke: '#7AA7C7', 'stroke-width': 4 });
txt(cube, 0, 8, 'ICE', { 'text-anchor': 'middle', fill: '#4E7FA3', 'font-weight': 600, 'font-size': 20 });
const above = txt(gs, 572, WS - 14, 'ABOUT 8% ABOVE', { fill: C.ink, 'font-weight': 600 });
const cubeY = M.keys([[0, 200], [wt('C6', 'Less') - 0.1, 200], [wt('C6', 'floats'), WS - 120 * 0.08 + 60]], 0.9);

/* ---------- exam + ending ---------- */
const ts = $('#tS');
const tw1 = water(ts, [130, 130], 0, 104.5, 24), tw2 = water(ts, [330, 130], 52.25, -52.25, 24);
const tHbT = hbLine(ts, 6); seg(tHbT, tw1.H1, tw2.o, 17, 24, 1);
const tl1 = txt(ts, 168, 64, 'O-H · COVALENT', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16 });
const tl2 = txt(ts, 262, 236, 'H-BOND · BETWEEN', { 'text-anchor': 'middle', fill: HB, 'font-weight': 600, 'font-size': 16 });
const ar1 = mk(ts, 'path', { d: 'M168 74 L168 116', stroke: C.ink, 'stroke-width': 3, fill: 'none' }), ar2 = mk(ts, 'path', { d: 'M262 216 L262 146', stroke: HB, 'stroke-width': 3, fill: 'none' });
const end = endBuild({
  wrong: 'The O-H bond inside water is the hydrogen bond', right: 'O-H inside is covalent; the H-bond is the pull between molecules',
  tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'covalent') - 0.1, tRight: wt('X3', 'hydrogen') - 0.1,
  trapArt: t => { fade(tw1.g, t, wt('X2', 'inside') - 0.1); fade(tw2.g, t, wt('X2', 'inside')); fade(tHbT, t, wt('X3', 'hydrogen')); [tl1, ar1].forEach(e => fade(e, t, wt('X3', 'covalent'))); [tl2, ar2].forEach(e => fade(e, t, wt('X3', 'pull'))); },
  on: ['JEE MAIN'], tLight: [wt('E1', 'J')], tType: wt('E1', 'Expect'), type: 'Statement questions (ortho vs para-nitrophenol) and boiling point order',
  pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', ans: 0,
  mcq: { q: 'Which of these has the highest boiling point?', opts: [K(`${H_('H')}_2${O_('O')}`), K(`${H_('H')}${F_('F')}`), K(`${N_('N')}${H_('H')}_3`), K(`${H_('H')}_2${G_('S')}`)] },
  tOpts: wt('Q1', 'Water'),
  sol: [K(`${H_('H')}_2${G_('S')}:\\ \\text{no H-bond, lowest}`), K(`${H_('H')}${F_('F')}:\\ 1\\,\\mathrm{H} \\Rightarrow \\text{about 2 H-bonds}`), K(`${H_('H')}_2${O_('O')}:\\ 2\\,\\mathrm{H} + 2\\ \\text{lone pairs} \\Rightarrow 4`), K(`100 > 20 > -33 > -60\\ ^\\circ\\text{C}`)],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'More')],
  fTitle: 'Recap · hydrogen bonding',
  fLines: [K(`${HF1}${DOTS}${HF1}`), '<b>Needs</b>: H joined to F, O or N, plus a lone pair on a nearby F, O or N', '<b>Inter</b>: between molecules (water, HF, alcohols) · <b>Intra</b>: inside one (o-nitrophenol)', '<b>Strength</b>: weaker than covalent · strongest in solids, weakest in gases', '<b>Effects</b>: water boils at 100 °C · ice floats · alcohol mixes with water'],
  yq: ['Hydrogen must be joined to which three atoms, to form a hydrogen bond?', 'Why does ortho-nitrophenol boil lower than para-nitrophenol?', 'Why does ice float on water?'],
  nextL: 'NEXT · EP 51', nextT: 'Why does a closed tiffin cool? System, Surroundings and State Functions',
});

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tHb - 0.3, 1.1, 960, 560], [tDot + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t); hook(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* P: tug of war + H-F */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1'), tHF = wt('P6', 'join');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dy: 36, ...o }); grow($('#pq'), pqIn, t, tHF - 0.1);
    const ru = M.io((t - wt('P2', 'kids') + 0.3) / 0.5);
    fade(rope, t, wt('P2', 'kids') - 0.3); fade(kidL, t, wt('P2', 'kids') - 0.2); fade(kidR, t, wt('P2', 'kids') - 0.1);
    const st = M.io((t - wt('P3', 'stronger') + 0.1) / 0.6), sl = M.io((t - wt('P3', 'slides') + 0.1) / 0.8);
    place(kidR, 692, RY); attr(kidR, 'transform', `translate(692 ${RY}) scale(${(1 + 0.45 * st).toFixed(3)})`);
    const kx = M.lerp(392, 540, sl); attr(knot[0], 'cx', (kx - 11).toFixed(1)); attr(knot[1], 'cx', (kx + 11).toFixed(1)); knot.forEach(k => { attr(k, 'cy', RY); fade(k, t, wt('P2', 'pair') - 0.1); });
    attr(knotL, 'x', kx.toFixed(1)); fade(knotL, t, wt('P2', 'pair'), wt('P4', 'Atoms') + 0.4);
    fade(strongL, t, wt('P3', 'stronger'), 1e9); attr(strongL, 'y', (RY - 80 - 24 * st).toFixed(1));
    M.vis($('#enP'), t, wt('P4', 'electronegativity') - 0.2, 1e9, POP);
    M.vis($('#ptL'), t, T0('P5') - 0.1, 1e9, { dy: 8 }); M.vis($('#ptS'), t, T0('P5'), 1e9, { dy: 8 });
    [['F', wt('P5', 'fluorine'), FC], ['O', wt('P5', 'oxygen'), OC], ['N', wt('P5', 'nitrogen'), NC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    // right: the real bond
    M.vis($('#pw'), t, tHF - 0.1, out, { dx: 60, dy: 0, ...o });
    const far = M.io((t - wt('P6', 'far') + 0.2) / 0.9), px = M.lerp((HX + FX) / 2, FX - 74, far);
    attr(pr[0], 'cx', (px - 10).toFixed(1)); attr(pr[1], 'cx', (px + 10).toFixed(1)); pr.forEach(p => attr(p, 'cy', BY - 22));
    fade(dHp, t, wt('P7', 'plus') - 0.1); fade(dFm, t, wt('P7', 'minus') - 0.1);
    fade(pullA, t, wt('P6', 'pulls') - 0.1); fade(pullH, t, wt('P6', 'pulls') - 0.1); fade(pullT, t, wt('P6', 'pulls'));
    PUC.write($('#hfF'), t, wt('P7', 'write') - 0.1, 0.8);
    M.vis($('#dPill'), t, wt('P7', 'Delta', 2) - 0.1, 1e9, POP);
  }

  /* S: bench, H-F chain */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1');
    M.vis($('#bn'), t, tS1 + 0.05, out, { dy: 36, ...o }); grow($('#bn'), bnIn, t, tDot - 0.3);
    M.vis($('#rx'), t, tDot - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#ct'), t, tDot + 0.1, out, { dy: 36, ...o });
    PUC.write($('#eqH'), t, tDot + 0.3, 1.0); M.vis($('#eqK'), t, wt('S5', 'solid') - 0.1, 1e9, { dy: 10 });
    RL.forEach(([, tt], i) => { const el = $('#rl' + i); M.vis(el, t, tt - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - tt - 1.2) / 0.4)))); });
    const P = mols.map((g, i) => { const u = M.io((t - tMol[i]) / 1.0), s = STA[i], e = END[i];
      const j = 5 * (1 - u) * Math.sin(t * 2.2 + i * 1.7);
      const x = M.lerp(s[0], e[0], u) + j, y = M.lerp(s[1], e[1], u) - j, a = M.lerp(s[2], e[2], u);
      const hp = pol([x, y], BL, a); seg(g.s, [x, y], hp, 34, 20, 1); place(g.f, x, y); place(g.h, ...hp); fade(g.g, t, tS1 + 0.3 + i * 0.12); return { x, y, a, u }; });
    hbL.forEach((l, i) => { const p = P[i], q = P[i + 1], h = [p.x + BL * Math.cos(p.a * Math.PI / 180), p.y + BL * Math.sin(p.a * Math.PI / 180)]; seg(l, h, [q.x, q.y], 20, 34, M.io((t - tHbs[i]) / 0.5)); });
    // lone pair on each F, facing the H that comes in (F0: at the back)
    lps.forEach((pp, i) => { const p = P[i]; let d;
      if (i) { const q = P[i - 1], hx = q.x + BL * Math.cos(q.a * Math.PI / 180), hy = q.y + BL * Math.sin(q.a * Math.PI / 180); d = Math.atan2(hy - p.y, hx - p.x); } else d = (p.a + 180) * Math.PI / 180;
      const cx = p.x + 46 * Math.cos(d), cy = p.y + 46 * Math.sin(d), nx = -Math.sin(d) * 9, ny = Math.cos(d) * 9;
      attr(pp[0], 'cx', (cx + nx).toFixed(1)); attr(pp[0], 'cy', (cy + ny).toFixed(1)); attr(pp[1], 'cx', (cx - nx).toFixed(1)); attr(pp[1], 'cy', (cy - ny).toFixed(1));
      pp.forEach(c => fade(c, t, i < 2 ? tLp - 0.1 : tMol[i] + 0.9)); });
    dLab.forEach(([a, b], i) => { const p = P[i], h = [p.x + BL * Math.cos(p.a * Math.PI / 180), p.y + BL * Math.sin(p.a * Math.PI / 180)];
      attr(a, 'x', h[0].toFixed(1)); attr(a, 'y', (h[1] - 30).toFixed(1)); attr(b, 'x', (p.x - 6).toFixed(1)); attr(b, 'y', (p.y - 44).toFixed(1));
      const tt = i < 2 ? wt('S2', 'Plus') : tMol[i] + 0.9; fade(a, t, tt); fade(b, t, tt + 0.15); });
    tagRun(btag, t, [[tS1 + 0.2, 'H-F · 4 MOLECULES'], [wt('S2', 'Plus'), 'δ+ PULLS δ-'], [tLp, 'LONE PAIR ON F'], [tHb - 0.1, 'HYDROGEN BOND'], [tGrow, 'ZIG ZAG CHAIN'], [wt('S8', 'weaker'), 'WEAK BUT MANY']]);
    M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    avA(t, wt('S8', 'strongest') + 0.6, out);
  }

  /* V: inter vs intra, then think */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const outC = OUT('B1');
    M.vis($('#vl'), t, tV1 + 0.05, outC, { dx: -60, dy: 0, ...o }); M.vis($('#vr'), t, T0('V3') - 0.1, outC, { dx: 60, dy: 0, ...o });
    [wA.g, wB.g].forEach((g, i) => fade(g, t, wt('V2', 'between') - 0.1 + i * 0.15)); seg(vHb, wA.H1, wB.o, 17, 26, M.io((t - wt('V2', 'Inter', 1)) / 0.5)); fade(vTag1, t, wt('V2', 'Inter', 1) + 0.3);
    M.vis($('#vP1'), t, wt('V2', 'Water') - 0.1, 1e9, POP);
    fade(paraG, t, T0('V5') - 0.1);
    fade(orthoG, t, wt('V4', 'ortho') - 0.1);
    const ch = M.io((t - wt('V4', 'between') + 0.1) / 0.4); OR.chel.style.opacity = ch.toFixed(3); OR.hb.style.opacity = ch.toFixed(3); fade(OR.l3, t, wt('V4', 'between') + 0.2);
    fade(OR.l1, t, wt('V4', 'group') - 0.1); fade(OR.l2, t, wt('V4', 'two') - 0.1);
    M.vis($('#vP2'), t, wt('V4', 'same') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tB1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tB1, tOpts: wt('B1', 'ortho') - 0.1, tCount: T1('B1') + 0.05, dur: 3, tAns: T0('B2') - 0.02, tWhy: wt('B2', 'hydrogen') });
  }

  stmt(t);

  /* W: worked example + boiling points */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1'), tB = T0('W7');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dy: 36, ...o }); grow($('#wl'), null, t, tB - 0.1);
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    WR.forEach((r, i) => { const el = $('#wr' + i); M.vis(el, t, tWr[i] - 0.1, 1e9, { dx: -16, dy: 0 });
      const act = M.io((t - T0(r[4])) / 0.25) * (1 - M.io((t - (i < 3 ? T0(WR[i + 1][4]) : tB)) / 0.25)); setBg(el, mix(C.soft, C.ac2, act));
      const v = t >= tWv[i] - 0.1, m = $('#wm' + i); M.vis(m, t, tWv[i] - 0.1, 1e9, { ...POP, sc: 0.3 }); PUC.setIco(m, r[3] ? 'check' : 'x', '#fff', 24, 3); setBg(m, r[3] ? C.ok : C.red);
      const wn = $('#wn' + i), s = t >= T0(r[4]) + 0.3 ? r[2] : r[1]; if (wn._s !== s) { wn._s = s; wn.textContent = s; } });
    M.vis($('#wr'), t, tB - 0.1, out, { dx: 60, dy: 0, ...o });
    bars.forEach((b, i) => { const u = M.io((t - tBar[i] + 0.2) / 0.7), h = Math.abs(b.v) * sc * u, y = b.v > 0 ? Y0 - h : Y0;
      attr(b.r, 'y', y.toFixed(1)); attr(b.r, 'height', Math.max(0, h).toFixed(1)); M.hide(b.r, u <= 0.01);
      attr(b.vl, 'y', (b.v > 0 ? y - 16 : y + h + 40).toFixed(1)); fade(b.vl, t, tBar[i] + 0.3); fade(b.fl, t, tB); fade(b.kl, t, tBar[i] + 0.4); });
  }

  /* C: ice */
  const cOn = t >= tC1 - 0.1 && t < T0('X1') + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1'), tFr = wt('C3', 'freezes'), tD = T0('C5');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dy: 36, ...o }); grow($('#cl'), clIn, t, tD - 0.1);
    M.setT($('#clL'), t < tFr ? 'MOLECULE BENCH · LIQUID WATER' : 'MOLECULE BENCH · ICE');
    const fz = M.io((t - tFr + 0.1) / 1.2), lk = M.io((t - wt('C3', 'hydrogen') + 0.1) / 0.5);
    const Q = ICE.map((e, k) => { const L = LIQ[k], jg = (1 - fz) * 7, ph = t * 2.4 + k * 1.3;
      const x = M.lerp(L[0] + jg * Math.sin(ph), e.o[0], fz), y = M.lerp(L[1] + jg * Math.cos(ph * 1.1), e.o[1], fz), a = M.lerp(L[2] + (1 - fz) * 40 * Math.sin(t * 0.8 + k), e.a1, fz);
      const m = iMol[k], H1 = pol([x, y], 66, a), H2 = pol([x, y], 66, a - 104.5);
      seg(m.h[0], [x, y], H1, 24, 15, 1); seg(m.h[1], [x, y], H2, 24, 15, 1); place(m.og, x, y); place(m.hg[0], ...H1); place(m.hg[1], ...H2); fade(m.g, t, tC1 + 0.3 + k * 0.08);
      return { o: [x, y], H1, H2 }; });
    iHb.forEach((l, k) => { const n = Q[(k + 1) % 6]; seg(l, Q[k].H1, n.o, 15, 24, M.io((t - wt('C3', 'hydrogen') - k * 0.12) / 0.4)); });
    iOut.forEach((l, k) => { const H2 = Q[k].H2, tip = pol(H2, 48, ICE[k].a2); seg(l, H2, tip, 15, 0, M.io((t - wt('C3', 'four') - k * 0.08) / 0.4)); l.style.opacity = '0.55'; });
    fade(iEmpty, t, wt('C4', 'empty') - 0.1);
    EF.forEach(([, , tt], i) => M.vis($('#ef' + i), t, tt - 0.15, 1e9, POP));
    { let x = 36; EF.forEach((_, i) => { const e = $('#ef' + i); if (!e._x) { e._x = 1; } e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
    M.vis($('#cp'), t, tD - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('C5', 'Ice'), wt('C5', 'Water')].forEach((tt, i) => M.vis($('#dn' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    place(cube, 392, cubeY(t)); fade(cube, t, wt('C6', 'Less') - 0.1); fade(above, t, wt('C6', 'floats') + 0.6);
  }

  end(t);
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
end.sfx();
M.outro({});
})();
