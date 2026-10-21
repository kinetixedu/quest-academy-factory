// PUC Physics Ep 62: Static and kinetic friction (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac;   // every force orange (push P, friction f, net force), a red, v blue, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, setT = M.setT;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const lin = (pts) => s => { if (s <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (s <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * (s - a) / (b - a); } return pts[pts.length - 1][1]; };
const FLT = 'Poppins';
const setL = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const FS_ = 'f<tspan baseline-shift="sub" font-size="14">s</tspan>', FK_ = 'f<tspan baseline-shift="sub" font-size="14">k</tspan>';
const lab = (p, s, col, a = {}) => txt(p, 0, 0, s, Object.assign({ fill: col, 'font-weight': 700, 'font-size': 20 }, a));

/* ---------- drawings ---------- */
// steel trunk, origin = bottom-left corner, w x h
const trunk = (p, w = 200, h = 130) => { const g = mk(p, 'g', {}), k = w / 200;
  mk(g, 'rect', { x: 0, y: -h, width: w, height: h - 4, rx: 8 * k, fill: '#8FA3B8', stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'rect', { x: 14 * k, y: -h + 2, width: 14 * k, height: h - 8, fill: '#6E829A' }); mk(g, 'rect', { x: w - 28 * k, y: -h + 2, width: 14 * k, height: h - 8, fill: '#6E829A' });
  mk(g, 'line', { x1: 0, y1: -h + 32 * k, x2: w, y2: -h + 32 * k, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: 0, y: -10 * k, width: w, height: 10 * k, rx: 3, fill: '#5F7389', stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: w / 2 - 9 * k, y: -h + 22 * k, width: 18 * k, height: 24 * k, rx: 3, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2 });
  mk(g, 'path', { d: `M${w / 2 - 34 * k},${-h} v${-10 * k} h${68 * k} v${10 * k}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  [[40, -h + 52], [w - 40 * k, -h + 52]].forEach(([x, y]) => mk(g, 'circle', { cx: x * (x === 40 ? k : 1), cy: y * 1, r: 3.5, fill: C.ink }));
  return g; };
// hand with fingertips at x = 0 pointing right
const handG = (p, w = 120, h = 50) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w, y: -h / 2, width: w, height: h, rx: h / 2.4, fill: '#E8B98F', stroke: C.ink, 'stroke-width': 3 }); [0, 1, 2].forEach(k => mk(g, 'line', { x1: -w * 0.42, y1: -h / 2 + 13 + k * 12, x2: -10, y2: -h / 2 + 13 + k * 12, stroke: '#B7835B', 'stroke-width': 2.5, 'stroke-linecap': 'round' })); txt(g, -w * 0.72, 6, 'HAND', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 14 }); return g; };
// tiled floor seen from the side: top line + band with tile joints that can scroll
const floorT = (p, x0, x1, y, step = 45) => { mk(p, 'rect', { x: x0, y, width: x1 - x0, height: 40, fill: '#EFE6D3' }); mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 });
  const js = []; for (let x = x0; x <= x1 + step; x += step) js.push(mk(p, 'line', { x1: x, y1: y + 2, x2: x, y2: y + 40, stroke: '#CDBF9F', 'stroke-width': 2 }));
  return off => js.forEach((j, i) => { const x = x0 + i * step - (((off % step) + step) % step); attr(j, 'x1', x.toFixed(1)); attr(j, 'x2', x.toFixed(1)); M.hide(j, x < x0 || x > x1); }); };

Object.assign(M.IC, {
  cupboard: ['M5 2h14v20H5z', 'M12 2v20', 'M10 11v2', 'M14 11v2'],
  trunkI: ['M3 8h18v11H3z', 'M3 12h18', 'M11 10h2v4h-2z', 'M9 8V6h6v2'],
  arrowU: ['M12 19V5', 'm5 12 7-7 7 7'],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'],
  move: ['M5 12h14', 'm15 8 4 4-4 4', 'M5 6v12'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV2 = T0('V2');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['cupboard', 'Push', 'IT DOES NOT MOVE', 'Push', 'STUCK', 0], ['cupboard', 'Push harder', 'STILL NOTHING', 'harder', 'STUCK', 0], ['move', 'Then', 'IT JERKS FORWARD', 'jerks', 'SLIDES', 1]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="background:${c ? 'var(--ac)' : 'var(--soft)'};color:${c ? '#fff' : 'var(--ink)'};border:2px solid ${c ? 'var(--ac)' : 'var(--line)'}">${tg}</div></div>`).join('');
const TILES = [[FC, 'Hard to start', 'lock'], [VC, 'Easy to keep sliding', 'move'], [C.ac, 'Why?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'strength'), wt('H4', 'gentler'), wt('H4', 'Why')];
const hk = $('#hkS'), HF = 400;
floorT(hk, 0, 784, HF)(0);
const hTW = mk(hk, 'g', {}), hTO = mk(hTW, 'g', {}), hT = trunk(hTO, 300, 190);
const hHW = mk(hk, 'g', {}), hHO = mk(hHW, 'g', {}), hH = handG(hHO, 150, 60);
const hP = PUC.arrow(hk, FC, 8, 22), hPl = lab(hk, '', FC, { 'text-anchor': 'middle', 'font-size': 22 });
const tHs = wt('H4', 'Starting'), tHsl = wt('H4', 'slides'), tHg = wt('H4', 'gentler');
const hX = t => 230 + 150 * M.io((t - tHsl + 0.1) / 2.2);                  // the trunk gives way, then slides on
const hPush = t => t < tHsl ? 150 * M.io((t - tHs) / 1.0) : M.lerp(150, 105, M.io((t - tHg + 0.2) / 0.5));

/* ---------- P: what is friction ---------- */
const pl = $('#plS'), PF = 380;
floorT(pl, 0, 784, PF)(0);
const pBox = mk(pl, 'g', {}); mk(pBox, 'rect', { x: 290, y: PF - 130, width: 200, height: 130, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); txt(pBox, 390, PF - 58, 'BODY', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const pTry = mk(pl, 'g', {}); { mk(pTry, 'path', { d: `M400,${PF - 175} H560`, stroke: C.ink2, 'stroke-width': 4, 'stroke-dasharray': '10 8', fill: 'none' }); mk(pTry, 'path', { d: `M556,${PF - 187} L578,${PF - 175} L556,${PF - 163} Z`, fill: C.ink2 }); txt(pTry, 400, PF - 195, 'tries to slide', { fill: C.ink2, 'font-weight': 600, 'font-size': 20 }); }
const pCt = mk(pl, 'line', { x1: 290, y1: PF, x2: 490, y2: PF, stroke: C.ac, 'stroke-width': 8, 'stroke-linecap': 'round' });
const pCtl = txt(pl, 390, PF + 70, 'the contact', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 600, 'font-size': 20 });
const pFr = PUC.arrow(pl, FC, 8, 22), pFrl = lab(pl, 'friction f', FC, { 'font-size': 24, 'text-anchor': 'end' });
const PR = [['Static friction', 'BODY STILL AT REST', 'opposes the sliding about to start', 'static', 0], ['Kinetic friction', 'BODY ALREADY SLIDING', 'opposes the sliding going on', 'kinetic', 1]];
$('#prs').innerHTML = PR.map(([n, s, e], i) => `<div class="fr" id="pr${i}" style="top:${84 + i * 236}px"><div class="fn">${n}</div><div class="fs">${s}</div><div class="fe">${e}</div><svg id="prS${i}" width="250" height="120"></svg></div>`).join('');
const prS = [0, 1].map(i => $('#prS' + i));
const prA = prS.map((sv, i) => { mk(sv, 'line', { x1: 10, y1: 104, x2: 240, y2: 104, stroke: C.ink, 'stroke-width': 3 }); const b = mk(sv, 'rect', { x: 100, y: 54, width: 70, height: 50, rx: 6, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); const f = PUC.arrow(sv, FC, 6, 16); f.set(100, 96, 40, 96); let v = null; if (i) { v = PUC.arrow(sv, VC, 5, 14); v.set(176, 70, 236, 70); } return { b, f, v }; });
const tPr = [wt('P3', 'static'), wt('P4', 'kinetic')];

/* ---------- S: the trunk sim ---------- */
const s = $('#simS'), FL = 450, PXM = 90, XT0 = 200, CAP = 190, SF = 0.9, MASS = 40, FMAX = 160, FK = 120, TAU = 1.2;   // 90 px per metre, 0.9 px per newton
const sFloor = floorT(s, 0, 784, FL);
const sGh = [0.3, 0.2, 0.12].map(o => { const g = mk(s, 'g', {}); trunk(g, 230, 150); g.setAttribute('opacity', 0); g._o = o; return g; });
const sTO = mk(s, 'g', {}); trunk(sTO, 230, 150);
const sHO = mk(s, 'g', {}); handG(sHO, 120, 48);
const aP = PUC.arrow(s, FC, 7, 20), aPl = lab(s, '', FC, { 'text-anchor': 'middle' });
const aF = PUC.arrow(s, FC, 7, 20), aFl = lab(s, '', FC, { 'text-anchor': 'middle' });
const aN = PUC.arrow(s, FC, 7, 20), aNl = lab(s, '', FC, { 'text-anchor': 'start' });
const aV = PUC.arrow(s, VC, 6, 18), aVl = lab(s, 'v', VC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 28 });
// push: steps up to 40, 80 and 160 N on the words, holds at the limit; after the slip it eases from 160 to 120 N (exponential, tau 1.2 s)
const tP40 = wt('S2', 'Forty'), tP80 = wt('S3', 'Eighty'), tP160 = wt('S4', 'sixty'), tSlip = wt('S4', 'gives');
const pushB = M.keys([[0, 0], [tP40 - 1.3, 40], [tP80 - 1.3, 80], [tP160 - 1.4, 160]], 1.3, x => M.clamp(x));
const st = sv => { // state at sim time sv
  if (sv < tSlip) { const P = Math.min(FMAX, pushB(sv)); return { P, f: P, kin: false, v: 0, x: 0 }; }
  const u = sv - tSlip, e = Math.exp(-u / TAU);
  return { P: FK + (FMAX - FK) * e, f: FK, kin: true, v: (FMAX - FK) * TAU / MASS * (1 - e), x: (FMAX - FK) * TAU / MASS * (u - TAU * (1 - e)) };
};
const tR0 = tS8, tFz = wt('S8', 'Freeze') + 0.15, tRes = wt('S9', 'Then') - 0.05, RATE = 0.25, sFz = tSlip - 0.02, sR0 = sFz - RATE * (tFz - tR0);
const simT = t => t < tR0 ? t : t < tFz ? sR0 + RATE * (t - tR0) : t < tRes ? sFz : sFz + RATE * (t - tRes);
const scr = x => { const w = x * PXM; return { xl: XT0 + Math.min(w, CAP), off: Math.max(0, w - CAP) }; };
$('#roA').innerHTML = `<span class="k" style="color:${FC}">P</span><span class="v" id="r_P" style="color:${FC}">0</span><span class="u">N</span>
  <span class="k" style="color:${FC}" id="r_fk">f<sub>s</sub></span><span class="v" id="r_f" style="color:${FC}">0</span><span class="u">N</span>
  <span class="k" style="color:${FC}">F<sub>net</sub></span><span class="v" id="r_n" style="color:${FC}">0</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${C.ink}">m</span><span class="v">40</span><span class="u">kg</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">state</span><span class="v" id="r_s" style="font-size:28px">at rest</span><span class="u"></span>`;
// push vs friction bars (top of the sim pane)
const BAR = [['P', 104, 1], ['f', 146, 0.55]].map(([k, y, op]) => { const gg = mk(s, 'g', {}); const kl = txt(gg, 56, y + 19, '', { fill: FC, 'font-family': FLT, 'font-style': 'italic', 'font-weight': 600, 'font-size': 26 }); kl.innerHTML = k === 'P' ? 'P' : 'f'; mk(gg, 'rect', { x: 92, y, width: 432, height: 26, rx: 6, fill: C.soft }); const r = mk(gg, 'rect', { x: 92, y, width: 0, height: 26, rx: 6, fill: FC, opacity: op }); const v = txt(gg, 0, y + 20, '', { fill: FC, 'font-weight': 700, 'font-size': 19 }); return { gg, r, v }; });
const barCap = mk(s, 'line', { x1: 92 + 2.7 * 160, y1: 96, x2: 92 + 2.7 * 160, y2: 180, stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const barCapL = txt(s, 92 + 2.7 * 160 + 8, 98, 'max', { fill: C.ink2, 'font-weight': 600, 'font-size': 16 });
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 352, h: 220, xmax: 320, ymax: 200, xt: [0, 80, 160, 240, 320], yt: [0, 40, 80, 120, 160, 200], yl: 'f (N)' });
txt(gs, g.X(320) + 16, g.Y(0) + 6, 'P (N)', { fill: FC, 'font-size': 18 });
const gRise = mk(gs, 'path', { d: '', fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDrop = mk(gs, 'path', { d: `M${g.X(160)},${g.Y(160)} V${g.Y(120)}`, fill: 'none', stroke: FC, 'stroke-width': 4, 'stroke-dasharray': '7 6' });
const gBack = mk(gs, 'path', { d: '', fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gFlat = mk(gs, 'path', { d: `M${g.X(160)},${g.Y(120)} H${g.X(320)}`, fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gArc = mk(gs, 'path', { d: `M${g.X(56)},${g.Y(0)} A${g.X(56) - g.X(0)},${g.X(56) - g.X(0)} 0 0 0 ${(g.X(0) + (g.X(56) - g.X(0)) * Math.SQRT1_2).toFixed(1)},${(g.Y(0) - (g.X(56) - g.X(0)) * Math.SQRT1_2).toFixed(1)}`, fill: 'none', stroke: C.gold, 'stroke-width': 3 });
const gArcL = txt(gs, g.X(64), g.Y(14), '45°', { fill: C.gold, 'font-weight': 700, 'font-size': 20 });
const gLs = txt(gs, g.X(4), g.Y(176), 'static: f = P', { fill: FC, 'font-weight': 700, 'font-size': 19 });
const gLm = txt(gs, g.X(160) + 14, g.Y(160) - 4, 'max 160', { fill: FC, 'font-weight': 700, 'font-size': 19 });
const gLk = txt(gs, g.X(320), g.Y(120) + 28, 'kinetic: 120, flat', { fill: FC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' });
const gPeak = mk(gs, 'circle', { cx: g.X(160), cy: g.Y(160), r: 7, fill: '#fff', stroke: FC, 'stroke-width': 3 });
const gDot = g.dot(C.ink, 11);
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 196, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Starting it was the hard part!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${tc(FC, 'P')} - ${tc(FC, 'f_s')} = 0 \\;\\Rightarrow\\; ${tc(FC, 'f_s')} = ${tc(FC, 'P')}`, 'at rest: net force zero, so friction matches the push'],
  [`${tc(FC, 'f_s')} \\le ${tc(FC, 'f_{s,\\max}')}`, 'static friction has a ceiling'],
  [`${tc(FC, 'P')} > ${tc(FC, 'f_{s,\\max}')} \\;\\Rightarrow\\; \\text{slides}`, 'push beats the ceiling: sliding starts'],
  [`${tc(FC, 'f_k')} \\approx \\text{const},\\;\\; ${tc(FC, 'f_k')} < ${tc(FC, 'f_{s,\\max}')}`, 'smaller, and nearly the same at any speed'],
  [`${tc(AC, 'a')} = (${tc(FC, 'P')} - ${tc(FC, 'f_k')})\\,/\\,${tc(C.ink, 'm')}`, 'Newton\'s second law while sliding']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');

const tStep = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 'Step'));
const ds = $('#drS'), dg = PUC.graph(ds, { x: 110, y: 100, w: 352, h: 264, xmax: 320, ymax: 240, xt: [0, 160, 320], yt: [0, 120, 160], yl: 'f (N)' });
txt(ds, dg.X(320) + 16, dg.Y(0) + 6, 'P (N)', { fill: FC, 'font-size': 18 });
const dSeg = [mk(ds, 'path', { d: `M${dg.X(0)},${dg.Y(0)} L${dg.X(160)},${dg.Y(160)}` }), mk(ds, 'path', { d: `M${dg.X(0)},${dg.Y(160)} H${dg.X(320)}`, 'stroke-dasharray': '8 8' }), mk(ds, 'path', { d: `M${dg.X(160)},${dg.Y(160)} V${dg.Y(120)}`, 'stroke-dasharray': '7 6' }), mk(ds, 'path', { d: `M${dg.X(160)},${dg.Y(120)} H${dg.X(320)}` })];
dSeg.forEach(p => { p.setAttribute('fill', 'none'); p.setAttribute('stroke', FC); p.setAttribute('stroke-width', 5); p.setAttribute('stroke-linecap', 'round'); });
dSeg[1].setAttribute('stroke-width', 2.5);
const dLb = [[`${FS_} = P`, dg.X(96) + 10, dg.Y(60), 'start'], [`ceiling ${FS_}<tspan baseline-shift="sub" font-size="14">,max</tspan>`, dg.X(320), dg.Y(160) - 14, 'end'], ['slides!', dg.X(160) + 12, dg.Y(140) + 6, 'start'], [`${FK_}, flat`, dg.X(320), dg.Y(120) + 30, 'end']].map(([s0, x, y, an]) => { const e = txt(ds, x, y, '', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': an }); e.innerHTML = s0; return e; });
$('#drF').innerHTML = K(`${tc(AC, 'a')} = \\dfrac{${tc(FC, '\\text{N}')}}{\\text{kg}} = ${tc(AC, '\\text{m/s}^2')}`) + `<span style="font:500 22px Poppins;color:var(--mute);margin-left:18px">units check</span>`;
$('#stF').innerHTML = K(`${tc(FC, 'f_s')} \\le ${tc(FC, 'f_{s,\\max}')} \\qquad ${tc(FC, 'f_k')} < ${tc(FC, 'f_{s,\\max}')}`);

/* ---------- R: link by link ---------- */
const LK = [['Both surfaces have tiny bumps', wt('R2', 'bumps')], ['They touch at only a few points', wt('R2', 'touch')], ['At rest, the points stick: tiny welds', wt('R3', 'stick')], ['To start, break them all at once', wt('R4', 'break')], ['Sliding: no time to stick, so <span class="fo">f<sub>k</sub></span> is smaller', wt('R5', 'smaller')]];
$('#lks').innerHTML = LK.map(([a], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px"><div class="ln">${i + 1}</div><div class="lt">${a}</div></div>`).join('');
const rr = $('#rrS'), RP = 140, RY = 270;                                  // bump period 112 px, contact line at y 270
const prof = (y, dir, x0, x1, ph) => { let d = ''; for (let x = x0 - RP; x <= x1 + RP; x += RP / 4) { const k = Math.round((x - x0) / (RP / 4)), h = [0, 26, 8, 34][((k % 4) + 4) % 4]; d += (d ? 'L' : 'M') + (x + ph).toFixed(1) + ',' + (y + dir * h).toFixed(1); } return d; };
const rBot = mk(rr, 'path', { d: prof(RY, 1, 0, 784, 0) + ' L900,520 L-120,520 Z', fill: '#EFE6D3', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const rTopO = mk(rr, 'g', {}), rTop = mk(rTopO, 'path', { d: prof(RY - 1, -1, 0, 784, 0) + ' L900,90 L-120,90 Z', fill: '#8FA3B8', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
txt(rr, 392, 150, 'TRUNK (STEEL)', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20, 'letter-spacing': 2 });
txt(rr, 392, 420, 'FLOOR TILE', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 700, 'font-size': 20, 'letter-spacing': 2 });
const rWeld = []; for (let x = 0; x < 800; x += RP) rWeld.push(mk(rr, 'ellipse', { cx: x, cy: RY - 1, rx: 16, ry: 8, fill: AC, opacity: 0 }));
const tRbreak = wt('R4', 'break'), tRsl = wt('R5', 'sliding');
const rTx = t => t < tRsl ? 6 * M.io((t - tRbreak) / 0.25) * (1 - M.io((t - tRbreak - 0.6) / 0.4)) : 70 * (t - tRsl);
const avR = PUC.avatar($('#sR'), { x: 976 + 300, y: 270 + 380, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Like tiny welds!' });

/* ---------- K: static vs kinetic ---------- */
const k1 = $('#k1S'), KF = 400, KS = 1.6;
floorT(k1, 0, 784, KF)(0);
mk(k1, 'rect', { x: 330, y: KF - 240, width: 170, height: 240, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); mk(k1, 'line', { x1: 415, y1: KF - 236, x2: 415, y2: KF - 4, stroke: C.ink, 'stroke-width': 2.5 }); [400, 430].forEach(x => mk(k1, 'line', { x1: x, y1: KF - 130, x2: x, y2: KF - 110, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }));
txt(k1, 415, KF - 252, 'CUPBOARD · AT REST', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16, 'letter-spacing': 1.5 });
const kHO = mk(k1, 'g', {}); handG(kHO, 120, 48); kHO.setAttribute('transform', `translate(330,${KF - 70})`);
const kP = PUC.arrow(k1, FC, 7, 20), kPl = lab(k1, '', FC, { 'text-anchor': 'middle' }), kF = PUC.arrow(k1, FC, 7, 20), kFl = lab(k1, '', FC, { 'text-anchor': 'middle' });
const kPush = M.keys([[0, 0], [wt('K1', 'fifty') - 0.5, 50], [wt('K1', 'seventy') - 0.4, 70]], 0.6);
$('#k1P').innerHTML = `${M.icon('lock', 24, FC, 2.4)}<span>Adjusts: from 0 up to its max</span>`;
const k2 = $('#k2S'), KL = [[250, 0.5, 'slowly'], [450, 2, 'fast']];
const kLn = KL.map(([y, v, w]) => { const fl = floorT(k2, 0, 784, y, 45); const gh = [0.3, 0.2, 0.12].map(o => { const gg = mk(k2, 'g', {}); trunk(gg, 130, 84); gg.setAttribute('opacity', 0); gg._o = o; return gg; }); const tr = mk(k2, 'g', {}); trunk(mk(tr, 'g', { transform: `translate(330,${y})` }), 130, 84);
  const hd = mk(k2, 'g', {}); handG(mk(hd, 'g', { transform: `translate(330,${y - 42})` }), 90, 38);
  const pa = PUC.arrow(k2, FC, 6, 16), fa = PUC.arrow(k2, FC, 6, 16), va = PUC.arrow(k2, VC, 6, 16);
  pa.set(330 - 108 - 4, y - 70, 326, y - 70); fa.set(330, y - 8, 330 - 108, y - 8); va.set(464, y - 50, 464 + 34 * v, y - 50);
  const fl2 = lab(k2, 'fk = 120 N', FC, { 'text-anchor': 'middle', 'font-size': 18 }); setL(fl2, `${FK_} = 120 N`); attr(fl2, 'x', 276); attr(fl2, 'y', y + 30);
  const pl2 = lab(k2, 'P = 120 N', FC, { 'text-anchor': 'middle', 'font-size': 18 }); attr(pl2, 'x', 276); attr(pl2, 'y', y - 82);
  const vl = lab(k2, `v = ${v.toFixed(1)} m/s`, VC, { 'font-size': 18 }); attr(vl, 'x', 470); attr(vl, 'y', y - 66);
  const items = [tr, hd, pa.g, fa.g, va.g, fl2, pl2, vl]; return { y, v, w, fl, gh, items }; });
$('#k2P').innerHTML = `${M.icon('move', 24, FC, 2.4)}<span>Nearly constant, slow or fast</span>`;
const th1 = PUC.think($('#th1'), { q: 'A book lies on a level table. Nobody pushes it. How big is the friction on it?', opts: ['Zero', 'Its maximum'], right: 0, why: 'Nothing tries to slide the book, so friction has nothing to oppose.' });

/* ---------- V: Diya lets go ---------- */
const vs = $('#vS'), VF = 420, VXL = 470;
const vFloor = floorT(vs, 0, 1100, VF);
const vGh = [0.3, 0.2, 0.12].map(o => { const gg = mk(vs, 'g', {}); trunk(gg); gg.setAttribute('opacity', 0); gg._o = o; return gg; });
const vT = mk(vs, 'g', { transform: `translate(${VXL},${VF})` }); trunk(vT);
const vHO = mk(vs, 'g', {}); handG(vHO, 120, 48);
const vP = PUC.arrow(vs, FC, 7, 20), vPl = lab(vs, '', FC, { 'text-anchor': 'middle' }), vF = PUC.arrow(vs, FC, 7, 20), vFl = lab(vs, '', FC, { 'text-anchor': 'middle' });
const vV = PUC.arrow(vs, VC, 6, 18), vVl = lab(vs, 'v', VC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 28 }), vA = PUC.arrow(vs, AC, 6, 18), vAl = lab(vs, 'a', AC, { 'font-family': FLT, 'font-style': 'italic', 'font-size': 28 });
const tLG = wt('V1', 'lets') + 0.1, VR = 0.25, V0 = 1.2, DEC = FK / MASS;     // slows at 3 m/s^2, stops after 0.4 s (shown at 0.25x)
const vState = t => { if (t < tLG) return { x: V0 * (t - tV1), v: V0, P: FK, f: FK, a: 0, u: 0 };
  const u = Math.min(VR * (t - tLG), V0 / DEC), x0 = V0 * (tLG - tV1); return { x: x0 + V0 * u - 0.5 * DEC * u * u, v: Math.max(0, V0 - DEC * u), P: 0, f: u < V0 / DEC ? FK : 0, a: u < V0 / DEC ? -DEC : 0, u }; };
$('#vro').innerHTML = `<span class="k" style="color:${FC}">P</span><span class="v" id="v_P" style="color:${FC}">120</span><span class="u">N</span>
  <span class="k" style="color:${FC}">f<sub>k</sub></span><span class="v" id="v_f" style="color:${FC}">120</span><span class="u">N</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="v_v" style="color:${VC}">1.20</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="v_a" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
const th2 = PUC.think($('#th2'), { q: 'While the trunk slows down, is the friction on it static or kinetic?', opts: ['Static', 'Kinetic'], right: 1, why: 'Still sliding, so kinetic: 120 N back, until it stops.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ${K('25\\ \\text{kg}')} box: ${K(`${tc(FC, 'f_{s,\\max}')} = 90\\ \\text{N}`)}, ${K(`${tc(FC, 'f_k')} = 70\\ \\text{N}`)}. Find ${K(tc(FC, 'f'))} and ${K(tc(AC, 'a'))} for a push of ${K(`${tc(FC, 'P')} = 60\\ \\text{N}`)} and of ${K(`100\\ \\text{N}`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(FC, 'P')} = 60 < 90 \\Rightarrow ${tc(FC, 'f_s')} = 60\\ \\text{N},\\; ${tc(AC, 'a')} = 0`)],
  [K(`${tc(FC, 'P')} = 100 > 90 \\Rightarrow ${tc(FC, 'f_k')} = 70\\ \\text{N}`)],
  [K(`${tc(FC, 'F_{net}')} = 100 - 70 = 30\\ \\text{N}`)],
  [K(`${tc(AC, 'a')} = \\dfrac{30}{25} = ${tc(AC, '1.2\\ \\text{m/s}^2')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Sixty'), wt('W4', 'hundred'), wt('W5', 'Net'), wt('W5', 'equals')];
const ws = $('#wrS'), WF = 400, WS = 1.4;
floorT(ws, 0, 784, WF)(0);
mk(ws, 'rect', { x: 330, y: WF - 120, width: 160, height: 120, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); txt(ws, 410, WF - 52, '25 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 24 });
const wP = PUC.arrow(ws, FC, 7, 20), wPl = lab(ws, '', FC, { 'text-anchor': 'middle' }), wF = PUC.arrow(ws, FC, 7, 20), wFl = lab(ws, '', FC, { 'text-anchor': 'middle' });
const wN = PUC.arrow(ws, FC, 7, 20), wNl = lab(ws, 'net 30 N', FC, { 'text-anchor': 'start' }), wA = PUC.arrow(ws, AC, 6, 18), wAl = lab(ws, 'a = 1.2 m/s²', AC, { 'text-anchor': 'start' });
const wTag = $('#wtag');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'At rest, friction is always its maximum: 60 N push, 90 N friction', right: 'Static friction matches the push: 60 N, up to the 90 N limit' });
const tp = $('#tpS'), TF = 200;
floorT(tp, 260, 600, TF)(0);
mk(tp, 'rect', { x: 420, y: TF - 76, width: 100, height: 76, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 });
const tP = PUC.arrow(tp, FC, 6, 16), tPl = lab(tp, 'P = 60 N', FC, { 'font-size': 17, 'text-anchor': 'middle' });
const tFw = PUC.arrow(tp, AC, 6, 16), tFwl = lab(tp, 'f = 90 N ?', AC, { 'font-size': 17, 'text-anchor': 'middle' }), tFr = PUC.arrow(tp, FC, 6, 16), tFrl = lab(tp, 'f = 60 N', FC, { 'font-size': 17, 'text-anchor': 'middle' });
const tBk = lab(tp, 'moves back?!', AC, { 'font-size': 17, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'The push changes step by step: is the friction static or kinetic, and how big?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 380,
  q: `A ${K('10\\ \\text{kg}')} block rests on a level floor: ${K(`${tc(FC, 'f_{s,\\max}')} = 50\\ \\text{N}`)}, ${K(`${tc(FC, 'f_k')} = 40\\ \\text{N}`)}. A push ${K(`${tc(FC, 'P')} = 10t\\ \\text{N}`)} starts at ${K('t = 0')}. Find the friction at ${K('t = 3\\ \\text{s}')} and the acceleration at ${K('t = 8\\ \\text{s}')}.`,
  opts: ['50 N, 3 m/s²', '30 N, 3 m/s²', '30 N, 4 m/s²', '0 N, 8 m/s²'], right: 2 });
const so = PUC.solution($('#so'), [[K(`t=3:\\ ${tc(FC, 'P')} = 30 < 50 \\Rightarrow ${tc(FC, 'f_s')} = 30\\ \\text{N}`)], [K(`${tc(FC, 'P')} = 50 \\text{ at } t = 5\\ \\text{s} \\Rightarrow \\text{slides}`)], [K(`t=8:\\ ${tc(FC, 'P')} = 80,\\ ${tc(FC, 'f_k')} = 40\\ \\text{N}`)], [K(`${tc(AC, 'a')} = \\dfrac{80 - 40}{10} = ${tc(C.ok, '4\\ \\text{m/s}^2')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'three'), wt('A3', 'five'), wt('A4', 'eight'), wt('A4', 'Over')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · static and kinetic friction', y0: 100, dy: 90, txt: [0, 0, 0, 1],
  lines: [`${K(`${tc(FC, 'f_s')} = ${tc(FC, 'P')}`)}<span style="font:500 30px Poppins;margin:0 22px">at rest, up to</span>${K(`${tc(FC, 'f_s')} \\le ${tc(FC, 'f_{s,\\max}')}`)}`,
    `${K(`${tc(FC, 'f_k')} \\approx \\text{constant},\\quad ${tc(FC, 'f_k')} < ${tc(FC, 'f_{s,\\max}')}`)}`,
    `${K(`${tc(AC, 'a')} = (${tc(FC, 'P')} - ${tc(FC, 'f_k')})\\,/\\,${tc(C.ink, 'm')}`)}<span style="font:500 30px Poppins;margin-left:22px">while sliding</span>`,
    '<b>Graph</b>: 45° rise, peak at the max, drop to a flat kinetic line'] });
const YQ = ['Why is the trunk harder to start than to keep sliding?', 'A box pushed with 30 N does not move. What is the friction?', 'Why does the friction graph drop suddenly?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 63', topic: 'Stack a second trunk: how much more friction? Coefficient of Friction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR0 + 0.1, 1.06, 960, 540], [tD1 - 0.5, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const r0 = v => Math.round(v).toString();

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); vis($('#jt' + i), t, wt('H2', 'stuck') + i * 0.25 - 0.2, 1e9, POP); });
    vis($('#hjP'), t, wt('H2', 'suddenly') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const x = hX(t); attr(hTO, 'transform', `translate(${x.toFixed(1)},${HF})`); attr(hHO, 'transform', `translate(${x.toFixed(1)},${HF - 76})`);
    vis(hTW, t, wt('H3', 'trunk') - 0.3, 1e9, { dy: 0 }); vis(hHW, t, wt('H3', 'pushes') - 0.2, 1e9, { dy: 0 });
    const L = hPush(t); hP.set(x - 4 - L, HF - 140, x - 4, HF - 140); attr(hPl, 'x', (x - 4 - L / 2).toFixed(1)); attr(hPl, 'y', HF - 160); attr(hPl, 'text-anchor', 'middle'); if (t >= tHg) { attr(hPl, 'x', (x - 8).toFixed(1)); attr(hPl, 'text-anchor', 'end'); }
    setT(hPl, t < tHg ? 'big push' : 'gentle push'); hPl.style.opacity = M.clamp((L - 30) / 40).toFixed(3);
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis(pBox, t, tP1 + 0.4, 1e9, { dy: 0 }); vis(pTry, t, wt('P2', 'slide') - 0.2, 1e9, { dy: 0, dx: -20 });
    M.draw(pCt, t, wt('P2', 'contact') - 0.2, 0.5); vis(pCtl, t, wt('P2', 'contact'), 1e9, { dy: 0 });
    const u = M.io((t - wt('P2', 'friction') + 0.3) / 0.5); pFr.set(290, PF - 14, 290 - 150 * u, PF - 14); attr(pFrl, 'x', 270); attr(pFrl, 'y', PF - 34); pFrl.style.opacity = u.toFixed(3);
    vis($('#plP'), t, wt('P2', 'friction') + 0.4, 1e9, POP);
    vis($('#pr'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PR.forEach((_, i) => vis($('#pr' + i), t, tPr[i] - 0.4, 1e9, { dy: 20 }));
    // the kinetic row's block slides back and forth slowly; the static one sits still
    const sx = 100 + 40 * Math.sin((t - tPr[1]) * 1.6) * M.io((t - tPr[1]) / 0.5), sv = prA[1];
    attr(sv.b, 'x', (sx - 20).toFixed(1)); const dir = Math.cos((t - tPr[1]) * 1.6) >= 0 ? 1 : -1;
    sv.f.set(sx - 20 + (dir > 0 ? 0 : 70), 96, sx - 20 + (dir > 0 ? -60 : 130), 96); sv.v.set(sx - 20 + (dir > 0 ? 76 : -6), 70, sx - 20 + (dir > 0 ? 136 : -66), 70);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const sv = simT(t), S = st(sv), rp = t >= tR0, live = M.clamp((t - tS1 - 0.6) / 0.3);
    const { xl, off } = scr(S.x); sFloor(off);
    attr(sTO, 'transform', `translate(${xl.toFixed(1)},${FL})`); attr(sHO, 'transform', `translate(${xl.toFixed(1)},${FL - 62})`);
    sTO.style.opacity = live; sHO.style.opacity = live;
    const lag = rp ? RATE : 1;
    sGh.forEach((gh, k) => { const S2 = st(sv - 0.16 * (k + 1) * lag), gx = XT0 + S2.x * PXM - off, mv = S.v > 0.05 && Math.abs(gx - xl) > 4 && !(t >= tFz && t < tRes); attr(gh, 'transform', `translate(${gx.toFixed(1)},${FL})`); gh.setAttribute('opacity', mv ? gh._o : 0); });
    // values (round the push first, then the rest from it)
    const Pr = Math.round(S.P), fr = S.kin ? FK : Pr, nr = S.kin ? Pr - FK : 0;
    const pl = SF * Pr * live, fl = SF * fr * live, nl = SF * nr;
    aP.set(xl - 4 - pl, FL - 120, xl - 4, FL - 120); attr(aPl, 'x', (xl - 4 - pl / 2).toFixed(1)); attr(aPl, 'y', FL - 138); setL(aPl, `P = ${Pr} N`); aPl.style.opacity = M.clamp((pl - 40) / 30).toFixed(3);
    aF.set(xl, FL - 10, xl - fl, FL - 10); attr(aFl, 'x', (xl - fl / 2).toFixed(1)); attr(aFl, 'y', FL + 30); setL(aFl, `${S.kin ? FK_ : FS_} = ${fr} N${!S.kin && Pr === FMAX ? ' · MAX' : ''}`); aFl.style.opacity = M.clamp((fl - 40) / 30).toFixed(3);
    aN.set(xl + 115, FL - 186, xl + 115 + nl, FL - 186); attr(aNl, 'x', (xl + 123 + nl).toFixed(1)); attr(aNl, 'y', FL - 179); setL(aNl, `F<tspan baseline-shift="sub" font-size="14">net</tspan> = ${nr} N`); aNl.style.opacity = M.clamp(nr / 3).toFixed(3);
    const vl = 70 * S.v; aV.set(xl + 236, FL - 74, xl + 236 + vl, FL - 74); attr(aVl, 'x', (xl + 240 + vl / 2).toFixed(1)); attr(aVl, 'y', FL - 86); aVl.style.opacity = M.clamp(S.v / 0.2).toFixed(3);
    setT($('#r_P'), String(Pr)); setT($('#r_f'), String(fr)); setT($('#r_n'), String(nr)); setT($('#r_v'), S.v.toFixed(2)); setT($('#r_s'), S.kin ? 'sliding' : 'at rest');
    const fk = $('#r_fk'); if (fk._k !== S.kin) { fk._k = S.kin; fk.innerHTML = S.kin ? 'f<sub>k</sub>' : 'f<sub>s</sub>'; }
    BAR.forEach((b, i) => { const vv = i ? fr : Pr, w = 2.7 * vv; attr(b.r, 'width', w.toFixed(1)); attr(b.v, 'x', (100 + w).toFixed(1)); setT(b.v, vv + ' N'); vis(b.gg, t, tS1 + 0.7 + i * 0.12, 1e9, { dy: 0 }); });
    vis(barCap, t, tP160 - 0.6, 1e9, { dy: 0 }); vis(barCapL, t, tP160 - 0.6, 1e9, { dy: 0 });
    // state chip / slow-mo tags
    const stc = $('#stc'); setT(stc, S.kin ? 'SLIDING · KINETIC' : 'AT REST · STATIC'); stc.style.background = S.kin ? C.ac2 : C.soft; stc.style.color = S.kin ? C.ac : C.ink;
    vis(stc, t, tS1 + 0.8, tR0 - 0.1, { dy: 0, outDur: 0.15, ody: 0 });
    vis($('#smo'), t, tR0, tFz, { ...POP, outDur: 0.12, ody: 0 }); if (t >= tRes) vis($('#smo'), t, tRes, 1e9, { ...POP });
    vis($('#frz'), t, tFz, tRes, { ...POP, outDur: 0.12, ody: 0 });
    // graph: drawn lines follow real time (never un-draw), the dot follows the sim (and the replay)
    const Sg = st(Math.min(t, tR0)), pm = t < tSlip ? Sg.P : FMAX;
    attr(gRise, 'd', pm < 1 ? '' : `M${g.X(0)},${g.Y(0)} L${g.X(pm).toFixed(1)},${g.Y(pm).toFixed(1)}`);
    M.hide(gDrop, t < tSlip); vis(gPeak, t, tSlip - 0.05, 1e9, { dy: 0 });
    attr(gBack, 'd', t < tSlip ? '' : `M${g.X(FMAX)},${g.Y(FK)} L${g.X(Math.max(FK, Sg.P)).toFixed(1)},${g.Y(FK)}`);
    M.draw(gFlat, t, wt('S7', 'flat') - 0.3, 0.8);
    M.draw(gArc, t, wt('S7', 'forty') - 0.1, 0.4); vis(gArcL, t, wt('S7', 'forty'), 1e9, { dy: 0 });
    vis(gLs, t, wt('S7', 'push') - 0.1, 1e9, { dy: 0 }); vis(gLm, t, wt('S7', 'peaks') - 0.1, 1e9, { dy: 0 }); vis(gLk, t, wt('S7', 'flat'), 1e9, { dy: 0 });
    gDot(S.P, S.f, t > tS1 + 0.8);
    avS(t, wt('S6', 'steady') + 0.3, tR0 - 0.2);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tStep[0] + 0.2, 1e9, { dx: 60, dy: 0 });
    const cur = tStep.filter(tt => t >= tt - 0.1).length - 1;   // 0..4
    dSeg.forEach((p, i) => { M.draw(p, t, tStep[i] + 0.4, 0.7); p.style.opacity = cur === i || cur === 4 ? 1 : 0.28; });
    dLb.forEach((l, i) => { vis(l, t, tStep[i] + 0.9, 1e9, { dy: 0 }); if (t > tStep[i] + 0.9) l.style.opacity = cur === i || cur === 4 ? 1 : 0.28; });
    vis($('#drF'), t, tStep[4] + 0.9, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Static') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Kinetic'), 0.8);
  }

  /* R: link by link + zoom */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => vis($('#lk' + i), t, tt - 0.3, 1e9, { dx: -24, dy: 0 }));
    vis($('#rr'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#exR'), t, T0('R2') + 0.3, 1e9, { dy: 8 });
    const dx = rTx(t); attr(rTopO, 'transform', `translate(${(((dx % RP) + RP) % RP - (t >= tRsl ? 0 : 0)).toFixed(1)},${t >= tRsl ? -5 : 0})`);
    const wOn = M.io((t - LK[2][1] + 0.1) / 0.3) * (1 - M.io((t - tRbreak - 0.1) / 0.3)), wFl = t >= tRsl ? 0.25 + 0.2 * Math.max(0, Math.sin(t * 9)) : 0;
    rWeld.forEach(w => w.setAttribute('opacity', Math.max(wOn, wFl * M.io((t - tRsl) / 0.3)).toFixed(3)));
    vis($('#rrP'), t, wt('R4', 'once') - 0.1, 1e9, POP);
    avR(t, wt('R3', 'welds') + 0.2, tRbreak - 0.2);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#k1'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#exK1'), t, tK1 + 0.4, 1e9, { dy: 8 });
    const P = Math.round(kPush(t)), L = KS * P;
    kP.set(330 - 124 - L, KF - 150, 330 - 124 + 0 + (L > 2 ? 0 : 0) + (L > 2 ? L - L : 0) + 0, KF - 150);
    kP.set(326 - L, KF - 150, 326, KF - 150); attr(kPl, 'x', (326 - L / 2).toFixed(1)); attr(kPl, 'y', KF - 168); setT(kPl, `P = ${P} N`); kPl.style.opacity = M.clamp(L / 40).toFixed(3);
    kF.set(330, KF - 10, 330 - L, KF - 10); attr(kFl, 'x', (330 - L / 2).toFixed(1)); attr(kFl, 'y', KF + 30); setL(kFl, `${FS_} = ${P} N`); kFl.style.opacity = M.clamp(L / 40).toFixed(3);
    vis($('#k1P'), t, wt('K1', 'seventy') + 0.3, 1e9, POP);
    vis($('#k2'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK2'), t, T0('K2') + 0.3, 1e9, { dy: 8 });
    kLn.forEach((ln, i) => { const t0 = wt('K2', ln.w) - 0.3, on = t >= t0, off = on ? ln.v * 90 * (t - t0) : 0; ln.fl(off);
      ln.items.forEach(e => vis(e, t, t0, 1e9, { dy: 0 }));
      ln.gh.forEach((gh, k) => { const gx = 330 - ln.v * 90 * 0.16 * (k + 1); attr(gh, 'transform', `translate(${gx.toFixed(1)},${ln.y})`); gh.setAttribute('opacity', on ? gh._o : 0); }); });
    vis($('#k2P'), t, wt('K2', 'fast') + 0.3, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'How') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Nothing') });
  }

  /* V: lets go + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    vis($('#vc'), t, tV1 + 0.05, OUT('V3') + 3, { dy: 36, ...o });
    const S = vState(t), off = S.x * PXM, moving = S.v > 0.001; vFloor(off);
    vGh.forEach((gh, k) => { const S2 = vState(t - 0.16 * (k + 1) * (t >= tLG ? VR : 1)), gx = VXL - (off - S2.x * PXM); attr(gh, 'transform', `translate(${gx.toFixed(1)},${VF})`); gh.setAttribute('opacity', moving && VXL - gx > 4 ? gh._o : 0); });
    const hx = t < tLG ? VXL : VXL - 140 * M.io((t - tLG) / 0.5) - (off - vState(tLG).x * PXM);
    attr(vHO, 'transform', `translate(${hx.toFixed(1)},${VF - 58})`); vHO.style.opacity = (1 - M.io((t - tLG - 0.3) / 0.4)).toFixed(3);
    const pl = SF * S.P, fl = SF * S.f;
    vP.set(VXL - 4 - pl, VF - 106, VXL - 4, VF - 106); attr(vPl, 'x', (VXL - 4 - pl / 2).toFixed(1)); attr(vPl, 'y', VF - 124); setT(vPl, `P = ${S.P} N`); vPl.style.opacity = M.clamp(pl / 40).toFixed(3);
    vF.set(VXL, VF - 10, VXL - fl, VF - 10); attr(vFl, 'x', (VXL - fl / 2).toFixed(1)); attr(vFl, 'y', VF + 30); setL(vFl, `${FK_} = ${S.f} N`); vFl.style.opacity = M.clamp(fl / 40).toFixed(3);
    const vl = 70 * S.v; vV.set(VXL + 206, VF - 64, VXL + 206 + vl, VF - 64); attr(vVl, 'x', (VXL + 210 + vl / 2).toFixed(1)); attr(vVl, 'y', VF - 76); vVl.style.opacity = M.clamp(S.v / 0.2).toFixed(3);
    const al = S.a ? 30 * -S.a : 0; vA.set(VXL + 100, VF - 162, VXL + 100 - al, VF - 162); attr(vAl, 'x', (VXL + 92 - al).toFixed(1)); attr(vAl, 'y', VF - 154); attr(vAl, 'text-anchor', 'end'); vAl.style.opacity = al > 2 ? 1 : 0;
    setT($('#v_P'), String(S.P)); setT($('#v_f'), String(S.f)); setT($('#v_v'), S.v.toFixed(2)); setT($('#v_a'), S.a.toFixed(1));
    vis($('#vsm'), t, tLG, tLG + 0.4 / VR + 0.3, { ...POP, outDur: 0.15, ody: 0 });
    vis($('#th2'), t, tV2 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV2, tOpts: wt('V2', 'static') - 0.1, tCount: T1('V2') + 0.05, dur: 3, tAns: T0('V3') - 0.02, tWhy: wt('V3', 'still') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const cb = t >= tW[1] - 0.1, P = t < tW[0] - 0.2 ? 0 : cb ? 100 : 60, f = cb ? 70 : 60, u = M.io((t - tW[0] + 0.2) / 0.5);
    const pl = WS * P * (cb ? 1 : u), fl = WS * f * (cb ? 1 : u);
    wP.set(326 - pl, WF - 80, 326, WF - 80); attr(wPl, 'x', (326 - pl / 2).toFixed(1)); attr(wPl, 'y', WF - 98); setT(wPl, `P = ${P} N`); wPl.style.opacity = M.clamp(pl / 40).toFixed(3);
    wF.set(330, WF - 10, 330 - fl, WF - 10); attr(wFl, 'x', (330 - fl / 2).toFixed(1)); attr(wFl, 'y', WF + 30); setL(wFl, cb ? `${FK_} = 70 N` : `${FS_} = 60 N`); wFl.style.opacity = M.clamp(fl / 40).toFixed(3);
    const nu = M.io((t - tW[2]) / 0.4), nl = WS * 30 * nu; wN.set(410, WF - 150, 410 + nl, WF - 150); attr(wNl, 'x', (418 + nl).toFixed(1)); attr(wNl, 'y', WF - 143); wNl.style.opacity = nu.toFixed(3);
    const au = M.io((t - tW[3]) / 0.4), alen = 60 * au; wA.set(410, WF - 196, 410 + alen, WF - 196); attr(wAl, 'x', (418 + alen).toFixed(1)); attr(wAl, 'y', WF - 189); wAl.style.opacity = au.toFixed(3);
    setT(wTag, cb ? 'SLIDES · KINETIC' : 'AT REST · STATIC'); wTag.style.background = cb ? C.ac2 : C.soft; wTag.style.color = cb ? C.ac : C.ink;
    vis(wTag, t, tW[0] - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'resting') - 0.1, tStrike: wt('X3', 'backwards') + 0.2, tRight: wt('X3', 'matches') - 0.1 });
    const u0 = M.io((t - wt('X2', 'sixty') + 0.1) / 0.4); tP.set(416 - 84 * u0, TF - 50, 416, TF - 50); attr(tPl, 'x', 374); attr(tPl, 'y', TF - 64); tPl.style.opacity = u0.toFixed(3);
    const tSk = wt('X3', 'backwards') + 0.2, u1 = M.io((t - wt('X2', 'ninety') + 0.1) / 0.4) * (1 - M.io((t - tSk) / 0.3));
    tFw.set(420, TF - 10, 420 - 126 * u1, TF - 10); attr(tFwl, 'x', 357); attr(tFwl, 'y', TF + 30); tFwl.style.opacity = u1.toFixed(3);
    const u2 = M.io((t - wt('X3', 'matches')) / 0.4); tFr.set(420, TF - 10, 420 - 84 * u2, TF - 10); attr(tFrl, 'x', 378); attr(tFrl, 'y', TF + 30); tFrl.style.opacity = u2.toFixed(3);
    attr(tBk, 'x', 470); attr(tBk, 'y', TF - 96); tBk.style.opacity = (M.io((t - wt('X3', 'move') + 0.1) / 0.3) * (1 - M.io((t - tSk) / 0.3))).toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
