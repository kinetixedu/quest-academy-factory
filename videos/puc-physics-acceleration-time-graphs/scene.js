// PUC Physics Ep 29: Acceleration-time graphs (Motion notebook, the water-bottle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, XC = C.violet;      // colour-coding: v blue, a / g red, x violet
const AB = C.redBg, IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, s, col, a = {}) => txt(p, 0, 0, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);

Object.assign(M.IC, {
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10l3 7.5', 'M14 6h2l1 4'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 18h5', 'M16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  lift: ['M5 3h14v18H5z', 'M12 3v18', 'm8 9 1.5-2 1.5 2', 'm13 15 1.5 2 1.5-2'],
  swing: ['M4 3h16', 'M8 3l3 14', 'M16 3l-3 14', 'M9 17h6'],
});

/* bicycle (same drawing as Ep 28) */
const bicycle = (p, s = 1) => {
  const g0 = mk(p, 'g', {}), g = mk(g0, 'g', {}), r = 26 * s, wb = 30 * s, W = [];
  [-wb, wb].forEach(cx => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r, fill: '#fff', stroke: C.ink, 'stroke-width': 4 * s });
    for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; mk(w, 'line', { x1: -r * Math.cos(an), y1: -r * Math.sin(an), x2: r * Math.cos(an), y2: r * Math.sin(an), stroke: C.dim, 'stroke-width': 2 * s }); }
    W.push([w, cx]); });
  mk(g, 'path', { d: `M${-wb},0 L${-6 * s},0 L${wb * 0.55},${-30 * s} L${-wb * 0.45},${-30 * s} Z M${-6 * s},0 L${-wb * 0.55},${-40 * s} M${wb * 0.55},${-30 * s} L${wb},0 M${wb * 0.55},${-30 * s} L${wb * 0.45},${-44 * s}`, fill: 'none', stroke: '#2B3F8C', 'stroke-width': 5 * s, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${-wb * 0.72},${-41 * s} h${16 * s}`, stroke: C.ink, 'stroke-width': 6 * s, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${wb * 0.3},${-45 * s} h${14 * s}`, stroke: C.ink, 'stroke-width': 5 * s, 'stroke-linecap': 'round' });
  return { g: g0, set(x, y, rotDeg) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); W.forEach(([w, cx]) => attr(w, 'transform', `translate(${cx},0) rotate(${rotDeg.toFixed(1)})`)); } };
};
/* water bottle: the surface tilts with the acceleration (tan of the tilt = a / g; drawn 2.5x so it reads on a phone) */
const bottle = (p, cx, cy, s = 1) => {
  const w = 70 * s, h = 120 * s, x0 = cx - w / 2, y0 = cy - h / 2, id = 'cl' + Math.round(cx) + Math.round(cy);
  const cp = mk(p, 'clipPath', { id }); mk(cp, 'rect', { x: x0, y: y0, width: w, height: h, rx: 12 * s });
  const water = mk(p, 'path', { fill: '#BFD3FA', 'clip-path': `url(#${id})` });
  const surf = mk(p, 'path', { stroke: VC, 'stroke-width': 3 * s, fill: 'none', 'clip-path': `url(#${id})` });
  mk(p, 'rect', { x: x0, y: y0, width: w, height: h, rx: 12 * s, fill: 'none', stroke: C.ink, 'stroke-width': 3.5 * s });
  mk(p, 'rect', { x: cx - 16 * s, y: y0 - 18 * s, width: 32 * s, height: 18 * s, rx: 4 * s, fill: C.ink });
  const lv = cy + h * 0.06;
  return a => { const k = Math.tan(Math.atan(a / 9.8) * 2.5) * w / 2;   // a > 0 (forward, to the right): water piles at the back (left)
    const yl = lv - k, yr = lv + k;
    attr(water, 'd', `M${x0 - 2},${yl.toFixed(1)} L${x0 + w + 2},${yr.toFixed(1)} V${y0 + h + 2} H${x0 - 2} Z`); attr(surf, 'd', `M${x0 - 2},${yl.toFixed(1)} L${x0 + w + 2},${yr.toFixed(1)}`); };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tG1 = T0('G1'), tK1 = T0('K1'), tK3 = T0('K3'), tR1 = T0('R1'), tT = T0('T1');
const tB1 = T0('B1'), tB4 = T0('B4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tB1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['bus', 'Bus pulls away', 'PUSH: YES', 'bus'], ['lift', 'Lift starts up', 'PUSH: YES', 'lift'], ['swing', 'Swing turns back', 'PUSH: YES', 'swing']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, AC, 2.2)}</i><div class="jn" style="font-size:24px">${n}</div><div class="jw" style="color:var(--red)">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const HR = [['bus', 'Bus pulls away', 'velocity changing', 1], ['lift', 'Lift starts up', 'velocity changing', 1], ['bike', 'Cruising at top speed', 'velocity steady', 0]];
$('#jrs').innerHTML = HR.map(([ic, n, w, y], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, y ? AC : C.mute, 2.2)}</i><div class="jn">${n}</div><div class="jy" style="color:var(--mute)">${w.toUpperCase()}</div>
  <div class="mk" style="position:absolute;right:28px;top:34px;height:52px;padding:0 18px;border-radius:12px;display:flex;align-items:center;font:600 22px 'IBM Plex Mono';color:#fff;background:${y ? C.red : C.mute}">${y ? 'PUSH' : 'NO PUSH'}</div></div>`).join('');
const hk = $('#hkS');
mk(hk, 'line', { x1: 40, y1: 400, x2: 744, y2: 400, stroke: C.ink, 'stroke-width': 3 });
const hG = mk(hk, 'g', {}), hGi = mk(hG, 'g', {}), hBike = bicycle(hGi, 1.5);
mk(hGi, 'path', { d: 'M8,-92 h68 l-6,26 h-56 Z', fill: '#E9D9B8', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const hBot = bottle(hGi, 42, -150, 1.0);
const HST = [['SPEEDS UP', 'tilts', AC], ['BRAKES', 'tilts', AC], ['CRUISES', 'flat', C.ok]];
$('#hst').innerHTML = HST.map(([a, b, c], i) => `<div class="shp" id="hs${i}" style="top:494px"><b style="font:600 18px 'IBM Plex Mono';letter-spacing:.06em">${a}</b><span style="color:${c}">water ${b}</span></div>`).join('');
const tHs = [wt('H4', 'speeds'), wt('H4', 'brakes'), wt('H4', 'cruises')];
const aHook = t => { const k = [[tHs[0], 1.5], [tHs[1] - 0.05, -2], [tHs[2] - 0.05, 0]]; let a = 0; for (const [tt, v] of k) if (t >= tt) a = v; return a; };
const hTilt = M.track(0, [[tHs[0], 1.5, M.SOFT], [tHs[1] - 0.05, -2, M.SOFT], [tHs[2] - 0.05, 0, M.SOFT]], M.SOFT);

/* ---------- P ---------- */
const pgS = $('#pgS'), pgG = mk(pgS, 'g', {});
const pg = PUC.graph(pgG, { x: 110, y: 96, w: 600, h: 300, xmax: 10, ymin: -3, ymax: 3, xt: [0, 4, 8], yt: [-2, 0, 2], xl: 't (s)', yl: 'a (m/s²)' });
attr(pg.ylab, 'fill', AC); attr(pg.ylab, 'font-weight', 600); attr(pg.ylab, 'x', 124);
const pgA = [mk(pgS, 'path', { d: `M110,${pg.Y(0)} H710`, stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }), mk(pgS, 'path', { d: `M110,396 V96`, stroke: AC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' })];
const pgGd = mk(pgS, 'path', { d: `M${pg.X(3)},${pg.Y(0)} V${pg.Y(2)} H${pg.X(0)}`, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pgDot = mk(pgS, 'circle', { cx: pg.X(3), cy: pg.Y(2), r: 11, fill: AC });
const pgL = txt(pgS, pg.X(3) + 22, pg.Y(2) - 16, 't = 3 s,  a = 2 m/s²', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const PT = [['Position-time', 'x AGAINST t', 'Where?', XC, 'M10,110 C50,100 80,40 150,20'], ['Velocity-time', 'v AGAINST t', 'How fast?', VC, 'M10,110 L70,40 L150,40'], ['Acceleration-time', 'a AGAINST t', 'How quickly v changes?', AC, 'M10,40 H70 V110 H150']];
$('#pts').innerHTML = PT.map(([h, s, q, c, d], i) => `<div class="pt" id="pt${i}" style="top:${84 + i * 160}px;height:144px"><div class="h" style="color:${c};top:16px;font-size:28px">${h}</div><div class="s" style="top:58px">${s}</div><div class="q" style="top:90px;font-size:28px">${q}</div>
  <svg width="160" height="96" viewBox="0 0 160 130"><path d="M10,10 V120 H155" fill="none" stroke="${C.ink}" stroke-width="3"/><path d="${d}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`).join('');

/* ---------- S: the ride with the bottle ---------- */
const xR = u => u < 4 ? 0.75 * u * u : u < 8 ? 12 + 6 * (u - 4) : u < 11 ? 36 + 6 * (u - 8) - (u - 8) * (u - 8) : 45;
const vR = u => u <= 0 ? 0 : u < 4 ? 1.5 * u : u < 8 ? 6 : u < 11 ? 6 - 2 * (u - 8) : 0;
const aR = u => u <= 0 || u >= 11 ? 0 : u < 4 ? 1.5 : u < 8 ? 0 : -2;
const s = $('#simS'), RX = 100, PXM = 13, RY = 400;
mk(s, 'line', { x1: 40, y1: RY + 26, x2: 744, y2: RY + 26, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 45; m += 5) { const x = RX + m * PXM; mk(s, 'line', { x1: x, y1: RY + 26, x2: x, y2: RY + 26 + (m % 15 ? 10 : 18), stroke: C.ink, 'stroke-width': 2 }); if (m % 15 === 0) txt(s, x, RY + 68, m + ' m', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const ghS = [0.3, 0.2, 0.12].map(op => { const b = bicycle(s); b.g.style.opacity = 0; b.op = op; return b; });
const bike = bicycle(s);
const sV = PUC.arrow(s, VC, 7, 20), sA = PUC.arrow(s, AC, 7, 20), sVL = sym(s, 'v', VC), sAL = sym(s, 'a', AC);
const sBot = bottle(s, 784 - 36 - 85, 74 + 120, 1);
$('#roG').innerHTML = `<span class="k" style="color:${C.ink}">t</span><span class="v" id="rot">0.0</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rov" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="roa" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
const sg = PUC.graph($('#grS'), { x: 110, y: 64, w: 600, h: 150, xmax: 13, ymin: -3, ymax: 3, xt: [0, 4, 8, 11], yt: [-2, 0, 2], xl: 't (s)', yl: 'a (m/s²)' });
attr(sg.ylab, 'x', 124); attr(sg.ylab, 'fill', AC);
const sgP = sg.mk('path', { d: '', stroke: AC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }), sgD = sg.dot(AC);
const aPath = (G, u) => { let d = `M${G.X(0)},${G.Y(0)}`; const segs = [[0, 4, 1.5], [4, 8, 0], [8, 11, -2], [11, 13, 0]]; for (const [a, b, v] of segs) { if (u <= a) break; d += ` L${G.X(a)},${G.Y(v)} L${G.X(Math.min(u, b))},${G.Y(v)}`; } if (u >= 11 && u < 11.02) d += ` L${G.X(11)},${G.Y(0)}`; return d; };
const PH = [['SPEEDING UP · a = +1.5', AC], ['CRUISING · a = 0', C.ink], ['BRAKING · a = −2', AC], ['STOPPED', C.mute]];
const SHP = [['M2 8 H22', AC, 'Flat = uniform acceleration'], ['M2 6 H12 V18 H22', AC, 'Jump = acceleration changes']];
$('#shps').innerHTML = SHP.map(([d, c, w], i) => `<div class="shp" id="shp${i}"><svg width="24" height="24"><path d="${d}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/></svg><span>${w}</span></div>`).join('');
const tShp = [wt('S6', 'uniform'), wt('S6', 'jump')];
const tGo = wt('S2', 'speeds'), tC = wt('S3', 'cruises'), tBr = wt('S4', 'brakes'), tEnd4 = T1('S4');
const tRp = tS5 + 0.3, tRe = T1('S5');
// sim clock: ride follows the words; slow-mo replay runs u 3.6 -> 4.4 at 0.25x around the switch
const tau = t => {
  if (t < tS5) { if (t < tGo) return 0; if (t < tC) return 4 * (t - tGo) / (tC - tGo); if (t < tBr) return 4 + 4 * (t - tC) / (tBr - tC); return Math.min(11, 8 + 3 * (t - tBr) / (tEnd4 - tBr)); }
  if (t < tRp + 0.5) return 3.6;
  if (t < tRe) return Math.min(4.6, 3.6 + 0.25 * (t - tRp - 0.5));
  return 11;
};

/* ---------- G: from the v-t graph ---------- */
const GST = [[`\\textcolor{${AC}}{a} = \\text{slope of } \\textcolor{${VC}}{v}\\text{-}t`, 'read it at any moment'],
  [`\\text{straight rise} \\Rightarrow \\textcolor{${AC}}{a} = \\text{const} > 0`, 'a flat line above zero'],
  [`\\textcolor{${VC}}{v} \\text{ flat} \\Rightarrow \\textcolor{${AC}}{a} = 0`, 'falling v: a below zero']];
$('#gsteps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:140px"></div>` + GST.map(([f, w], i) => `<div class="st8" id="gst${i}" style="top:${84 + i * 150}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:38px">${K(f)}</div><div class="why" style="top:72px">${w}</div></div>`).join('');
const tGst = [wt('G2', 'acceleration'), wt('G3', 'straight'), wt('G4', 'flat')];
const gg = $('#ggS');
const gV = PUC.graph(gg, { x: 110, y: 90, w: 600, h: 170, xmax: 13, ymax: 8, xt: [], yt: [0, 6], yl: 'v (m/s)' }); attr(gV.ylab, 'fill', VC); attr(gV.ylab, 'x', 124);
const gA = PUC.graph(gg, { x: 110, y: 320, w: 600, h: 190, xmax: 13, ymin: -3, ymax: 3, xt: [0, 4, 8, 11], yt: [-2, 0, 2], xl: 't (s)', yl: 'a (m/s²)' }); attr(gA.ylab, 'fill', AC); attr(gA.ylab, 'x', 124);
const gVs = [[0, 0, 4, 6], [4, 6, 8, 6], [8, 6, 11, 0]].map(([a, b, c, d]) => mk(gg, 'path', { d: `M${gV.X(a)},${gV.Y(b)} L${gV.X(c)},${gV.Y(d)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
const gAs = [[0, 4, 1.5], [4, 8, 0], [8, 11, -2]].map(([a, b, v]) => mk(gg, 'path', { d: `M${gA.X(a)},${gA.Y(v)} H${gA.X(b)}`, stroke: AC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));
const gLk = [[2, 3, 1.5, '+1.5'], [6, 6, 0, '0'], [9.5, 3, -2, '−2']].map(([x, vv, av, l]) => ({ ln: mk(gg, 'line', { x1: gV.X(x), y1: gV.Y(vv) + 10, x2: gA.X(x), y2: gA.Y(av) - 10, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '4 6' }), tx: txt(gg, gA.X(x) + 44, gA.Y(av) + (av < 0 ? 36 : -16), l, { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600 }) }));
const tGs = [wt('G3', 'rising'), wt('G4', 'flat'), wt('G4', 'Falling')];

/* ---------- K: side by side ---------- */
const kx = $('#kxS'), kv = $('#kvS');
const kxG = PUC.graph(kx, { x: 110, y: 110, w: 600, h: 300, xmax: 5, ymax: 12, xt: [0, 1, 2, 3, 4], yt: [0, 6, 12], xl: 't (s)', yl: 'v (m/s)' }); attr(kxG.ylab, 'fill', VC); attr(kxG.ylab, 'x', 124);
const kvG = PUC.graph(kv, { x: 110, y: 110, w: 600, h: 190, xmax: 5, ymax: 3, xt: [0, 1, 2, 3, 4], yt: [0, 2], xl: 't (s)', yl: 'a (m/s²)' }); attr(kvG.ylab, 'fill', AC); attr(kvG.ylab, 'x', 124);
const kxC = kxG.curve(VC), kvC = kvG.curve(AC);
$('#vts').innerHTML = [0, 2, 4, 6, 8].map((v, i) => `<div class="vt" id="vt${i}" style="left:${kvG.X(i) - 42}px;top:410px">${v}</div>`).join('') + `<div class="lbl" id="vtL" style="left:36px;top:374px;color:var(--ac)">v (m/s) AT EACH SECOND, STARTING FROM 0</div>`;
const th1 = PUC.think($('#th1'), { q: 'An acceleration-time graph sits on zero. Must the object be at rest?', opts: ['Yes, at rest', 'No'], right: 1, why: 'a = 0 only means v does not change: 6 m/s or 60 m/s, steady.' });

/* ---------- R: area = change in velocity ---------- */
const RST = [[`\\textcolor{${AC}}{a} = \\dfrac{\\Delta \\textcolor{${VC}}{v}}{t} \\;\\Rightarrow\\; \\Delta \\textcolor{${VC}}{v} = \\textcolor{${AC}}{a}\\, t`, 'change in velocity = acceleration × time'],
  [`\\textcolor{${AC}}{a} \\times t = \\text{height} \\times \\text{width}`, 'that is the area under the line'],
  [`\\text{m/s}^2 \\times \\text{s} = \\textcolor{${VC}}{\\text{m/s}}`, 'the units agree: a velocity']];
$('#rsteps').innerHTML = RST.map(([f, w], i) => `<div class="st8" id="rst${i}" style="top:${84 + i * 136}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:38px">${K(f)}</div><div class="why" style="top:${i ? 66 : 98}px">${w}</div></div>`).join('');
const tRst = [wt('R2', 'change'), wt('R3', 'height'), wt('R4', 'units')];
const rS = $('#rrS'), rG = PUC.graph(rS, { x: 110, y: 96, w: 600, h: 330, xmax: 13, ymin: -3, ymax: 3, xt: [0, 4, 8, 11], yt: [-2, 0, 2], xl: 't (s)', yl: 'a (m/s²)' });
attr(rG.ylab, 'fill', AC); attr(rG.ylab, 'x', 124);
const rect = (G, a, b, v) => `M${G.X(a)},${G.Y(0)} V${G.Y(v)} H${G.X(b)} V${G.Y(0)} Z`;
const rA = [rect(rG, 0, 4, 1.5), rect(rG, 8, 11, -2)].map(d => mk(rS, 'path', { d, fill: C.ac2, stroke: VC, 'stroke-width': 2.5 }));
mk(rS, 'path', { d: aPath(rG, 13), stroke: AC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const rL = [[2, 0.75, '+6 m/s'], [9.5, -1, '−6 m/s']].map(([a, b, w]) => txt(rS, rG.X(a), rG.Y(b) + 9, w, { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 600 }));
const rHW = txt(rS, rG.X(2), rG.Y(2.2), '1.5 × 4', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
$('#rTot').innerHTML = K(`0 \\;+6\\; -6 = \\textcolor{${VC}}{0\\,\\text{m/s}} \\;\\;\\text{back at rest}`);
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Start at rest, end at rest. It adds up!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{area} = \\textcolor{${AC}}{a}\\,t = \\Delta \\textcolor{${VC}}{v}`); $('#stF').style.fontSize = '60px'; $('#stF').style.top = '620px';
$('#st2').style.fontSize = '76px';

/* ---------- B: ball thrown up (u = 9.8 m/s, g = 9.8 m/s², up for 1 s, down for 1 s) ---------- */
const yB = u => 9.8 * u - 4.9 * u * u, vB = u => 9.8 - 9.8 * u;
const bs = $('#bsS'), BX = 470, BY0 = 500, PXB = 70;
mk(bs, 'line', { x1: 300, y1: BY0 + 24, x2: 640, y2: BY0 + 24, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 5; m++) { const y = BY0 - m * PXB; mk(bs, 'line', { x1: 610, y1: y, x2: 626, y2: y, stroke: C.ink, 'stroke-width': 2 }); txt(bs, 640, y + 6, m + ' m', { 'font-size': 18, fill: C.ink }); }
mk(bs, 'line', { x1: 618, y1: BY0, x2: 618, y2: BY0 - 5 * PXB, stroke: C.ink, 'stroke-width': 2 });
const ghBall = [0.3, 0.2, 0.12].map(op => { const c = mk(bs, 'circle', { cx: BX, r: 22, fill: C.ink }); c.op = op; c.style.opacity = 0; return c; }), ball = mk(bs, 'circle', { cx: BX, r: 22, fill: C.ink });
const bV = PUC.arrow(bs, VC, 7, 20), bA = PUC.arrow(bs, AC, 7, 20), bVL = sym(bs, 'v', VC), bAL = sym(bs, 'g', AC);
$('#bro').innerHTML = `<span class="k" style="color:${C.ink}">t</span><span class="v" id="bt">0.0</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="bv" style="color:${VC}">9.8</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="ba" style="color:${AC}">-9.8</span><span class="u">m/s²</span>`;
const bgS = $('#bgS');
const bG1 = PUC.graph(bgS, { x: 110, y: 84, w: 600, h: 180, xmax: 2.4, ymin: -10, ymax: 10, xt: [], yt: [-9.8, 0, 9.8], yl: 'v (m/s)' }); attr(bG1.ylab, 'fill', VC); attr(bG1.ylab, 'x', 124);
const bG2 = PUC.graph(bgS, { x: 110, y: 300, w: 600, h: 150, xmax: 2.4, ymin: -10, ymax: 4, xt: [0, 1, 2], yt: [-9.8, 0], xl: 't (s)', yl: 'a (m/s²)' }); attr(bG2.ylab, 'fill', AC); attr(bG2.ylab, 'x', 124);
const bC1 = bG1.curve(VC), bD1 = bG1.dot(VC), bC2 = bG2.curve(AC), bD2 = bG2.dot(AC);
const bTop = [mk(bgS, 'line', { x1: bG1.X(1), y1: 84, x2: bG1.X(1), y2: 450, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), txt(bgS, bG1.X(1) + 10, 110, 'TOP', { 'font-size': 18, fill: C.mute, 'font-weight': 600 })];
const tThrow = wt('B1', 'Throw'), tBdown = wt('B3', 'coming'), tBend = wt('B3', 'never');
const tauB = t => t < tThrow ? 0 : t < tBdown ? Math.min(1, (t - tThrow) / (tBdown - tThrow)) : Math.min(2, 1 + (t - tBdown) / (tBend - tBdown + 0.3));
const th2 = PUC.think($('#th2'), { q: 'At the very top the ball stops for an instant. What is its acceleration there?', opts: ['Zero', '9.8 m/s² downward'], right: 1, why: 'v = 0 for an instant, but v is still changing. That is why it falls back.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{area}_1 = 2 \\times 3 = \\textcolor{${VC}}{+6\\,\\text{m/s}}`)],
  [K(`\\text{area}_2 = (-1) \\times 4 = \\textcolor{${VC}}{-4\\,\\text{m/s}}`)],
  [K(`\\Delta \\textcolor{${VC}}{v} = 6 - 4 = \\textcolor{${VC}}{+2\\,\\text{m/s}}`)],
  [K(`\\textcolor{${VC}}{v} = \\textcolor{${VC}}{u} + \\Delta \\textcolor{${VC}}{v} = 4 + 2 = \\textcolor{${VC}}{6\\,\\text{m/s}}`)]], { label: 'WORKED EXAMPLE', y0: 232, dy: 90 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Two'), wt('W4', 'Minus'), wt('W5', 'Total'), wt('W6', 'Add')];
const wS = $('#wrS'), wG = PUC.graph(wS, { x: 110, y: 130, w: 600, h: 300, xmax: 8, ymin: -2, ymax: 3, xt: [0, 3, 7], yt: [-1, 0, 2], xl: 't (s)', yl: 'a (m/s²)' });
attr(wG.ylab, 'fill', AC); attr(wG.ylab, 'x', 124);
const wR = [rect(wG, 0, 3, 2), rect(wG, 3, 7, -1)].map(d => mk(wS, 'path', { d, fill: C.ac2, stroke: VC, 'stroke-width': 2.5 }));
const wLine = mk(wS, 'path', { d: `M${wG.X(0)},${wG.Y(2)} H${wG.X(3)} V${wG.Y(-1)} H${wG.X(7)}`, stroke: AC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const wL = [txt(wS, wG.X(1.5), wG.Y(1) + 9, '+6', { 'text-anchor': 'middle', 'font-size': 28, fill: VC, 'font-weight': 600 }), txt(wS, wG.X(5), wG.Y(-0.5) + 9, '−4', { 'text-anchor': 'middle', 'font-size': 28, fill: VC, 'font-weight': 600 })];
$('#wa0').innerHTML = K(`\\textcolor{${VC}}{u = 4} \\;\\to\\; \\textcolor{${VC}}{v = 6\\,\\text{m/s}}`);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Area under a-t = final velocity', right: 'Area = change in velocity: v = u + area' });
const tg = $('#tg'), tG = PUC.graph(tg, { x: 70, y: 40, w: 420, h: 170, xmax: 8, ymin: -2, ymax: 3, xl: 't', yl: 'a' }); attr(tG.ylab, 'fill', AC);
const tgR = [rect(tG, 0, 3, 2), rect(tG, 3, 7, -1)].map(d => mk(tg, 'path', { d, fill: C.ac2, stroke: VC, 'stroke-width': 2 }));
const tgT = txt(tg, tG.X(4.2), tG.Y(1.6), 'area = +2 = Δv', { 'font-size': 22, fill: VC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Graph reading: area gives the change in velocity, or convert one graph into another' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A particle starts at 2 m/s. Its acceleration is +3 m/s² for 2 s, then −2 m/s² for the next 4 s. Its velocity at t = 6 s is', qW: 780,
  opts: ['−2 m/s', '0 m/s', '+4 m/s', '+8 m/s'], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{area}_1 = 3 \\times 2 = +6`)], [K(`\\text{area}_2 = -2 \\times 4 = -8`)], [K(`\\Delta \\textcolor{${VC}}{v} = 6 - 8 = -2`)], [K(`\\textcolor{${VC}}{v} = 2 + (-2) = \\textcolor{${C.ok}}{0}`)], ['<b style="color:var(--red)">A</b>: forgot the start']], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'first'), wt('A2', 'second'), wt('A3', 'change'), wt('A3', 'Add'), wt('A3', 'forgets')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · acceleration-time graphs', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\text{area} = \\Delta \\textcolor{${VC}}{v} \\qquad \\textcolor{${VC}}{v} = \\textcolor{${VC}}{u} + \\text{area}`),
    '<b>Flat line</b>: uniform acceleration &nbsp;·&nbsp; <b>on zero</b>: steady velocity', '<b>Value</b> of <i>a</i> = slope of the velocity-time graph', '<b>Thrown ball</b>: <i>a</i> = −9.8 m/s² all the way, even at the top'] });
const YQ = ['What does a flat line above zero on an a-t graph mean?', 'What does the area under an acceleration-time graph give?', 'What is the acceleration of a ball at the top of its flight?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 30', topic: 'Read any motion graph in seconds: Slope and Area', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 - 0.1, 1.1, 560, 540], [tS6 + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#hs' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; [0, 1].forEach(i => { const e = $('#shp' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, i < 2 ? tMorph + 0.3 + i * 0.12 : wt('H2', 'steady') - 0.1, 1e9, { dy: 16 }); M.vis(el.querySelector('.mk'), t, i < 2 ? wt('H2', 'push') + i * 0.1 : wt('H2', 'nothing') - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'nothing') + 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    // bicycle rolls left to right under the bottle words; bottle rides in the basket
    const a = hTilt(t), hx = 140 + 420 * M.clamp((t - tH3) / (T1('H4') - tH3 + 0.6));
    hBike.set(0, 0, (hx - 140) / 39 * 57.3); attr(hGi, 'transform', `translate(${hx.toFixed(1)},361)`); M.vis(hG, t, tH3 + 0.1, 1e9, { dy: 0, fade: 0.3 });
    hBot(a);
    HST.forEach((_, i) => M.vis($('#hs' + i), t, tHs[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pg'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pgG, t, tP1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    M.draw(pgA[0], t, wt('P2', 'Time') - 0.1, 0.6); M.draw(pgA[1], t, wt('P2', 'Acceleration') - 0.1, 0.6);
    M.draw(pgGd, t, wt('P3', 'point') - 0.2, 0.5); M.vis(pgDot, t, wt('P3', 'point'), 1e9, { ...POP, sc: 0.2 }); M.vis(pgL, t, wt('P3', 'changing') - 0.1, 1e9, { dy: 8 });
    M.vis($('#pgC'), t, wt('P3', 'moment') - 0.1, 1e9, POP);
    M.vis($('#pc'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('P4', 'Position'), wt('P4', 'Velocity'), wt('P4', 'Acceleration')].forEach((tt, i) => M.vis($('#pt' + i), t, tt - 0.1, 1e9, { dy: 16 }));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tG1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('G1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = tau(t), x = RX + xR(u) * PXM;
    bike.set(x, RY, xR(u) * PXM / 26 * 57.3); M.vis(bike.g, t, tS1 + 0.4, 1e9, { dx: -40, dy: 0 });
    ghS.forEach((g, k) => { const ug = tau(t - 0.16 * (k + 1)), xg = RX + xR(ug) * PXM; g.set(xg, RY, xR(ug) * PXM / 26 * 57.3); g.g.style.opacity = Math.abs(x - xg) > 4 && ug <= u ? g.op : 0; });
    const v = vR(u), a = aR(u), vy = RY - 86, ay = RY - 122;
    sV.set(x, vy, x + v * 16, vy); attr(sVL, 'x', (x + v * 16 + 8).toFixed(1)); attr(sVL, 'y', vy + 10); sVL.style.opacity = v > 0.3 ? 1 : 0;
    const aL = a * 44; sA.set(x, ay, x + aL, ay); attr(sAL, 'x', (x + aL + (aL < 0 ? -26 : 8)).toFixed(1)); attr(sAL, 'y', ay + 10); sAL.style.opacity = Math.abs(aL) > 4 ? 1 : 0;
    sBot(a); M.vis($('#bott'), t, tS1 + 0.6, 1e9, { dy: 10 });
    const ph = t < tGo ? -1 : u < 4 ? 0 : u < 8 ? 1 : u < 10.98 ? 2 : 3, pe = $('#ph');
    if (ph >= 0) { M.setT(pe, PH[ph][0]); pe.style.background = PH[ph][1]; } M.vis(pe, t, tGo, tRp - 0.05, { ...POP, outDur: 0.15, ody: 0 });
    M.vis($('#slo'), t, tRp, tRe + 0.1, POP);
    M.setT($('#rot'), f1(u)); M.setT($('#rov'), f1(v)); M.setT($('#roa'), f1(a));
    attr(sgP, 'd', aPath(sg, t < tS5 ? u : 11)); sgD(u, aR(u), t >= tGo - 0.2);
    SHP.forEach((_, i) => M.vis($('#shp' + i), t, tShp[i] - 0.1, 1e9, POP));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tK1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('K1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GST.forEach((_, i) => { const el = $('#gst' + i); M.vis(el.querySelector('.n'), t, tGst[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGst[i], 0.8); M.vis(el.querySelector('.why'), t, tGst[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tGst[1] - 0.1, 234], [tGst[2] - 0.1, 384]], M.SOFT)(t), hb = $('#hiB');
    M.vis(hb, t, tGst[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#gg'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    gVs.forEach((p, i) => M.draw(p, t, (i === 0 ? wt('G1', 'velocity') : tGs[i]) - 0.2, 0.6));
    gAs.forEach((p, i) => M.draw(p, t, tGs[i] + 0.3, 0.5));
    gLk.forEach((k, i) => { M.draw(k.ln, t, tGs[i], 0.4); M.vis(k.tx, t, tGs[i] + 0.6, 1e9, { ...POP, sc: 0.5 }); });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kx'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kxC(w => [w, 6], 0, 5 * M.clamp((t - wt('K1', 'flat')) / 1.4));
    M.vis($('#kxC'), t, wt('K1', 'steady') - 0.1, 1e9, POP);
    M.vis($('#kv'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kvC(w => [w, 2], 0, 5 * M.clamp((t - wt('K2', 'flat')) / 1.4));
    const tg0 = wt('K2', 'grows');
    M.vis($('#vtL'), t, tg0 - 0.3, 1e9, { dy: 8 });
    [0, 1, 2, 3, 4].forEach(i => M.vis($('#vt' + i), t, tg0 + i * 0.35, 1e9, POP));
    M.vis($('#kvC'), t, wt('K2', 'every') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'rest') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Zero') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    RST.forEach((_, i) => { const el = $('#rst' + i); M.vis(el.querySelector('.n'), t, tRst[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRst[i], 0.8); M.vis(el.querySelector('.why'), t, tRst[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#rr'), t, tR1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.vis(rA[0], t, wt('R3', 'area') - 0.2, 1e9, { dy: 0, fade: 0.35 }); M.vis(rHW, t, wt('R3', 'height') - 0.1, wt('R5', 'gives') - 0.1, { dy: 8, outDur: 0.15, ody: 0 });
    M.vis(rL[0], t, wt('R5', 'plus') - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis(rA[1], t, wt('R5', 'Minus') - 0.1, 1e9, { dy: 0, fade: 0.35 }); M.vis(rL[1], t, wt('R5', 'minus', 1) - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#rTot'), t, wt('R6', 'ends') - 0.1, 1e9, POP);
    avA(t, wt('R6', 'graph') + 0.2, tT - 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tB1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tB1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'area') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'is') - 0.1, 0.8);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('W1');
    M.vis($('#bs'), t, tB1 + 0.3, out, { dx: -60, dy: 0, ...o }); M.vis($('#exB'), t, tB1 + 0.6, 1e9, { dy: 8 });
    M.vis($('#bg'), t, tB1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u = tauB(t), by = BY0 - yB(u) * PXB; attr(ball, 'cy', by.toFixed(1));
    ghBall.forEach((g, k) => { const ug = tauB(t - 0.1 * (k + 1)), gy = BY0 - yB(ug) * PXB; attr(g, 'cy', gy.toFixed(1)); g.style.opacity = Math.abs(gy - by) > 4 && u < 1.999 ? g.op : 0; });
    const on = t > tThrow - 0.1 ? 1 : 0, v = vB(u) * on, vl = v * 7;
    bV.set(BX - 70, by, BX - 70, by - vl); attr(bVL, 'x', BX - 110); attr(bVL, 'y', (by - vl / 2 + 10).toFixed(1)); bVL.style.opacity = Math.abs(vl) > 6 ? 1 : 0;
    bA.set(BX + 70, by, BX + 70, by + 62 * on); attr(bAL, 'x', BX + 88); attr(bAL, 'y', (by + 50).toFixed(1)); bAL.style.opacity = on;
    M.setT($('#bt'), u.toFixed(1)); M.setT($('#bv'), f1(vB(u))); M.vis($('#bro'), t, tThrow - 0.2, 1e9, { dy: 10 });
    bC1(w => [w, vB(w)], 0, u); bD1(u, vB(u), t >= tThrow - 0.2);
    bC2(w => [w, -9.8], 0, Math.max(u, M.clamp((t - wt('B2', 'acceleration')) / 1.2) * 2) ); bD2(u, -9.8, t >= tThrow - 0.2);
    M.vis($('#bgC'), t, wt('B3', 'flat') - 0.1, 1e9, POP);
    bTop.forEach(e => M.vis(e, t, tB4 + 0.1, 1e9, { dy: 0, fade: 0.3 }));
    M.vis($('#th2'), t, tB4 + 0.05, wt('B5', 'why') - 0.3, { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'What') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'velocity') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    M.draw(wLine, t, wt('W2', 'accelerates') - 0.1, 1.4);
    wR.forEach((p, i) => M.vis(p, t, tW[i] - 0.1, 1e9, { dy: 0, fade: 0.35 })); wL.forEach((l, i) => M.vis(l, t, tW[i] + 0.6, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#wa0'), t, wt('W6', 'final') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'area') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'change') });
    tgR.forEach((p, i) => M.vis(p, t, wt('X2', 'graph') + i * 0.3, 1e9, { dy: 0, fade: 0.3 })); M.vis(tgT, t, wt('X3', 'change'), 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'graph') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'acceleration') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
