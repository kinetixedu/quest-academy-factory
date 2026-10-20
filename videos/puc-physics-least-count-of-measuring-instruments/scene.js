// PUC Physics Ep 14: Least count of measuring instruments (Motion notebook, measuring bench: ruler, vernier callipers, screw gauge)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.violet, LC = C.ac, MC = C.ink;          // colour-coding: vernier / circular scale violet, least count + reading blue, main scale ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const STEEL = '#B8BCC6', BODY = '#8D99AE', CREAM = '#FFF8E7', VIOBG = '#F1ECFC';
const f2 = v => v.toFixed(2), f1 = v => v.toFixed(1);

Object.assign(M.IC, {
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  timer: ['M10 2h4', 'M12 14l3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tJ1 = T0('J1'), tJ2 = T0('J2');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- reusable instrument drawings ---------- */
// vernier callipers (magnified): main scale on top (ink), sliding vernier below (violet, 10 VSD = 9 MSD), jaws, optional spoke
function vernier(svg, o) {
  const { X0, Y, PX } = o, nMain = o.nMain ?? 11, jaws = o.jaws !== false;
  const root = mk(svg, 'g', {});
  if (jaws) mk(root, 'path', { d: `M${X0 - 44},${Y} H${X0} V${Y + 250} H${X0 - 30} L${X0 - 44},${Y + 236} Z`, fill: BODY, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); // fixed jaw
  mk(root, 'rect', { x: X0 - 44, y: Y, width: nMain * PX + 84, height: 70, rx: 6, fill: CREAM, stroke: C.ink, 'stroke-width': 2.5 });
  const mt = [];
  for (let m = 0; m <= nMain; m++) { const x = X0 + m * PX; mt.push(mk(root, 'line', { x1: x, y1: Y + 70, x2: x, y2: Y + 70 - (m % 5 ? 24 : 38), stroke: C.ink, 'stroke-width': m % 5 ? 2 : 3 })); txt(root, x, Y + 26, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
  txt(root, X0 + nMain * PX + 34, Y + 26, 'mm', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
  const ghosts = [0, 1, 2].map(() => mk(root, 'rect', { y: Y + 130, width: 40, height: 120, rx: 4, fill: BODY, opacity: 0 }));
  const vg = mk(root, 'g', {});
  mk(vg, 'rect', { x: X0, y: Y + 70, width: 9 * PX + 34, height: 60, rx: 4, fill: VIOBG, stroke: VC, 'stroke-width': 2.5 });
  if (jaws) mk(vg, 'path', { d: `M${X0},${Y + 130} H${X0 + 40} V${Y + 236} L${X0 + 26},${Y + 250} H${X0} Z`, fill: BODY, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); // moving jaw
  const vt = [];
  for (let k = 0; k <= 10; k++) { const x = X0 + k * 0.9 * PX; vt.push(mk(vg, 'line', { x1: x, y1: Y + 70, x2: x, y2: Y + 70 + (k % 5 ? 22 : 34), stroke: VC, 'stroke-width': k % 5 ? 2 : 3 })); txt(vg, x, Y + 122, k, { 'text-anchor': 'middle', 'font-size': 16, fill: VC, 'font-weight': 600 }); }
  const sp = o.spoke ? mk(root, 'circle', { cx: X0 + o.spoke * PX / 2, cy: Y + 190, r: o.spoke * PX / 2, fill: STEEL, stroke: C.ink, 'stroke-width': 2.5 }) : null;
  const res = { root, vg, mt, vt, sp, ghosts, X0, Y, PX,
    set(op, hi = 1, gh = []) {      // op = jaw opening (mm); hi = highlight strength of the matching marks
      attr(vg, 'transform', `translate(${f2(op * PX)},0)`);
      let k = Math.round((Math.ceil(op - 1e-6) - op) / 0.1); if (k < 0 || k > 10) k = -1;
      // matching vernier mark: op + 0.9k is a whole number of mm
      let best = -1; for (let j = 0; j <= 10; j++) { const v = op + 0.9 * j; if (Math.abs(v - Math.round(v)) < 0.004) { best = j; break; } }
      vt.forEach((l, j) => { const on = j === best ? hi : 0; attr(l, 'stroke', mix(VC, LC, on)); attr(l, 'stroke-width', (j % 5 ? 2 : 3) + 2.5 * on); });
      const mm = best >= 0 ? Math.round(op + 0.9 * best) : -1;
      mt.forEach((l, j) => { const on = j === mm ? hi : 0; attr(l, 'stroke', mix(C.ink, LC, on)); attr(l, 'stroke-width', (j % 5 ? 2 : 3) + 2.5 * on); });
      ghosts.forEach((g, i) => { const go = gh[i]; if (go == null || Math.abs(go - op) < 0.02) { g.style.opacity = 0; return; } attr(g, 'x', f1(X0 + go * PX)); g.style.opacity = [0.3, 0.2, 0.12][i]; });
      return best;
    } };
  return res;
}
// screw gauge (magnified side view): anvil, spindle, sleeve with mm (top) and half-mm (bottom) marks, thimble with 50 divisions; plus end-on cap dial
function screw(svg, o) {
  const PX = o.PX ?? 60, AX = o.AX ?? 84, SX = o.SX ?? 260, Y = o.Y ?? 210;
  const root = mk(svg, 'g', {});
  mk(root, 'path', { d: `M${AX - 24},${Y + 40} V${Y + 130} H${SX + 30} V${Y + 36}`, fill: 'none', stroke: C.ink2, 'stroke-width': 22, 'stroke-linejoin': 'round' }); // frame
  mk(root, 'rect', { x: AX - 44, y: Y - 34, width: 44, height: 68, rx: 4, fill: BODY, stroke: C.ink, 'stroke-width': 2.5 });  // anvil
  const sp = o.spoke ? mk(root, 'circle', { cx: AX + o.spoke * PX / 2, cy: Y, r: o.spoke * PX / 2, fill: STEEL, stroke: C.ink, 'stroke-width': 2.5 }) : null;
  const rod = mk(root, 'rect', { y: Y - 20, height: 40, fill: STEEL, stroke: C.ink, 'stroke-width': 2.5 });
  mk(root, 'rect', { x: SX, y: Y - 34, width: 6 * PX + 20, height: 68, fill: CREAM, stroke: C.ink, 'stroke-width': 2.5 });  // sleeve
  mk(root, 'line', { x1: SX, y1: Y, x2: SX + 6 * PX + 20, y2: Y, stroke: C.ink, 'stroke-width': 2 });
  for (let m = 0; m <= 6; m++) { const x = SX + 10 + m * PX; mk(root, 'line', { x1: x, y1: Y, x2: x, y2: Y - 18, stroke: C.ink, 'stroke-width': 2.5 }); txt(root, x, Y - 44, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
    if (m < 6) mk(root, 'line', { x1: x + PX / 2, y1: Y, x2: x + PX / 2, y2: Y + 14, stroke: C.ink, 'stroke-width': 2 }); }
  txt(root, SX + 6 * PX + 20, Y - 44, 'mm', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
  const th = mk(root, 'g', {});
  mk(th, 'rect', { x: 0, y: -62, width: 150, height: 124, rx: 8, fill: '#DCE0E8', stroke: C.ink, 'stroke-width': 2.5 });
  for (let k = 0; k < 9; k++) mk(th, 'line', { x1: 70 + k * 9, y1: -58, x2: 70 + k * 9, y2: 58, stroke: BODY, 'stroke-width': 2 });
  const cl = []; for (let i = 0; i < 11; i++) cl.push([mk(th, 'line', { x1: 0, x2: 18, stroke: VC, 'stroke-width': 2 }), txt(th, 24, 0, '', { 'font-size': 15, fill: VC, 'font-weight': 600 })]);
  // dial (end view of the cap)
  const D = o.dial, dg = D ? mk(svg, 'g', {}) : null; let ptr = null, dTicks = [];
  if (D) {
    mk(dg, 'circle', { cx: D.x, cy: D.y, r: D.r, fill: '#DCE0E8', stroke: C.ink, 'stroke-width': 2.5 });
    mk(dg, 'circle', { cx: D.x, cy: D.y, r: D.r * 0.42, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
    for (let k = 0; k < 50; k++) { const a = -Math.PI / 2 + k / 50 * 2 * Math.PI, r1 = D.r - (k % 5 ? 10 : 18); dTicks.push(mk(dg, 'line', { x1: f1(D.x + Math.cos(a) * r1), y1: f1(D.y + Math.sin(a) * r1), x2: f1(D.x + Math.cos(a) * D.r), y2: f1(D.y + Math.sin(a) * D.r), stroke: VC, 'stroke-width': k % 5 ? 1.6 : 2.6 }));
      if (k % 10 === 0) txt(dg, f1(D.x + Math.cos(a) * (D.r - 34)), f1(D.y + Math.sin(a) * (D.r - 34) + 6), k, { 'text-anchor': 'middle', 'font-size': 15, fill: VC, 'font-weight': 600 }); }
    mk(dg, 'path', { d: `M${D.x},${D.y - D.r - 4} l-9,-16 h18 Z`, fill: C.ink });
    ptr = mk(dg, 'line', { x1: D.x, y1: D.y, x2: D.x, y2: D.y - D.r * 0.42, stroke: LC, 'stroke-width': 5, 'stroke-linecap': 'round' });
  }
  return { root, dg, sp, PX,
    set(g) {   // g = gap between anvil and spindle (mm)
      const ex = SX + 10 + g * PX;     // thimble edge
      attr(rod, 'x', f1(AX + g * PX)); attr(rod, 'width', f1(Math.max(0, SX - AX - g * PX + 4)));
      attr(th, 'transform', `translate(${f1(ex)},${Y})`);
      const c = (g / 0.5 - Math.floor(g / 0.5 + 1e-9)) * 50;    // circular reading 0..50
      const c0 = Math.round(c);
      cl.forEach(([l, tx], i) => { const d = c0 - 5 + i, y = (d - c) * 11; const vis = Math.abs(y) < 56; M.hide(l, !vis); M.hide(tx, !vis || ((d % 50) + 50) % 5 !== 0);
        const on = Math.abs(d - c) < 0.5 ? 1 : 0; attr(l, 'y1', f1(-y)); attr(l, 'y2', f1(-y)); attr(l, 'x2', d % 5 ? 16 : 26); attr(l, 'stroke', on ? LC : VC); attr(l, 'stroke-width', on ? 4 : 2);
        attr(tx, 'y', f1(-y + 5)); attr(tx, 'x', 30); M.setT(tx, String(((d % 50) + 50) % 50)); });
      if (ptr) { const a = -Math.PI / 2 + c / 50 * 2 * Math.PI, r = D.r * 0.42; attr(ptr, 'x2', f1(D.x + Math.cos(a) * r)); attr(ptr, 'y2', f1(D.y + Math.sin(a) * r));
        dTicks.forEach((l, k) => attr(l, 'stroke', Math.abs(((c - k) % 50 + 50) % 50) < 0.5 || Math.abs(((c - k) % 50 + 50) % 50 - 50) < 0.5 ? LC : VC)); }
      return c;
    } };
}

/* ---------- title card + H: smallest steps ---------- */
const JOBS = [['ruler', 'Ruler', 'SMALLEST STEP', '1', 'mm', 'ruler'], ['weight', 'Kitchen scale', 'SMALLEST STEP', '1', 'g', 'kitchen'], ['timer', 'Stopwatch', 'SMALLEST STEP', '0.01', 's', 'stopwatch']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, u], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span style="color:${LC}">${v}</span> <span style="color:${C.mute};font-size:30px">${u}</span></div></div>`).join('');
// the spoke against a ruler, magnified
const hz = $('#hzS'), HX = 112, HP = 112;
const hzG = mk(hz, 'g', {});
mk(hzG, 'rect', { x: HX, y: 120, width: 2.3 * HP, height: 210, rx: 4, fill: STEEL, stroke: C.ink, 'stroke-width': 2.5 });
txt(hzG, HX + 1.15 * HP, 230, 'SPOKE', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
mk(hzG, 'rect', { x: HX - 30, y: 330, width: 5 * HP + 60, height: 90, rx: 6, fill: CREAM, stroke: C.ink, 'stroke-width': 2.5 });
for (let m = 0; m <= 5; m++) { mk(hzG, 'line', { x1: HX + m * HP, y1: 330, x2: HX + m * HP, y2: 370, stroke: C.ink, 'stroke-width': 3 }); txt(hzG, HX + m * HP, 400, m, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
txt(hzG, HX + 5 * HP + 24, 412, 'mm', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const hzQ = txt(hzG, HX + 2.5 * HP, 104, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 52, fill: C.red, 'font-weight': 700 });
const hzE = mk(hzG, 'line', { x1: HX + 2.3 * HP, y1: 110, x2: HX + 2.3 * HP, y2: 330, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const GQ = ['2.1 mm?', '2.5 mm?', '2.31 mm'];
$('#gqs').innerHTML = GQ.map((w, i) => `<div class="gq" id="gq${i}" style="top:470px">${w}</div>`).join('');
const tGq = [wt('H4', 'Two'), wt('H4', 'Two', 1), wt('H4', 'ruler')];

/* ---------- P: least count ---------- */
const IR = [['ruler', 'Ruler', '1 mm', 'smallest gap between marks'], ['timer', 'Digital stopwatch', '0.01 s', 'shows hundredths']];
$('#irs').innerHTML = IR.map(([ic, n, v, k], i) => `<div class="ir" id="ir${i}" style="top:${250 + i * 100}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="in">${n}</div><div class="il">${v}</div></div>`).join('');
const pm = $('#pmS'), PXp = 150, PX0 = 92;
mk(pm, 'rect', { x: PX0 - 30, y: 200, width: 4 * PXp + 60, height: 120, rx: 8, fill: CREAM, stroke: C.ink, 'stroke-width': 2.5 });
for (let m = 0; m <= 4; m++) { mk(pm, 'line', { x1: PX0 + m * PXp, y1: 200, x2: PX0 + m * PXp, y2: 250, stroke: C.ink, 'stroke-width': 3 }); txt(pm, PX0 + m * PXp, 290, m, { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); }
txt(pm, PX0 + 4 * PXp + 24, 310, 'mm', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const pmB = mk(pm, 'path', { d: `M${PX0 + PXp},186 V170 H${PX0 + 2 * PXp} V186`, fill: 'none', stroke: LC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const pmL = txt(pm, PX0 + 1.5 * PXp, 152, '1 mm = least count', { 'text-anchor': 'middle', 'font-size': 24, fill: LC, 'font-weight': 600 });
const pmN = txt(pm, PX0 + 1.5 * PXp, 380, 'nothing in between can be read', { 'text-anchor': 'middle', 'font-size': 22, fill: C.red, 'font-weight': 600 });
const pmGap = mk(pm, 'rect', { x: PX0 + PXp + 6, y: 204, width: PXp - 12, height: 40, rx: 4, fill: C.redBg, opacity: 0 });

/* ---------- S: vernier bench ---------- */
const VN = vernier($('#simS'), { X0: 92, Y: 130, PX: 50, nMain: 12, spoke: 2.3 });
const vChip = document.createElement('div'); vChip.className = 'tag'; vChip.style.cssText = 'left:36px;top:470px;height:64px;padding:0 22px;font:600 34px IBM Plex Mono;letter-spacing:0;border-radius:12px'; vChip.innerHTML = '<span id="vcN">2.3</span><span style="color:#C9B6F5">mm</span>'; $('#sim').appendChild(vChip);
const vEq = document.createElement('div'); vEq.className = 'fx'; vEq.style.cssText = 'left:250px;top:476px;font-size:38px'; vEq.innerHTML = K(`2 + \\textcolor{${VC}}{3} \\times \\textcolor{${LC}}{0.1} = \\textcolor{${LC}}{2.3}\\,\\text{mm}`); $('#sim').appendChild(vEq);
$('#roG').innerHTML = `<span class="k">Main scale reading</span><span class="v" id="r1" style="color:${MC}">0</span><span class="un">mm</span>
  <span class="k">Matching mark <i style="color:${VC}">k</i> &times; <span style="color:${LC}">0.1</span></span><span class="v" id="r2" style="color:${VC}">0</span><span class="un">mm</span>
  <span class="k tot" style="font-weight:700">Reading</span><span class="v tot" id="r3" style="color:${LC}">0.0</span><span class="un tot">mm</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 74, w: 600, h: 140, xmax: 3.2, ymax: 3.2, xt: [0, 1, 2, 3], yt: [0, 1, 2, 3], xl: 'jaw opening (mm)', yl: 'reading (mm)' });
gr.ylab.setAttribute('x', 124);
const gRul = gr.curve(C.dim, 4), gVer = gr.curve(LC, 4), gDot = gr.dot(LC, 10);
const stairR = s => [s, Math.floor(s + 1e-9)], stairV = s => [s, Math.floor(s * 10 + 1e-6) / 10];
const tOpen = T0('S4'), tStop = wt('S4', 'stops'), tS7 = T0('S7'), tS8 = T0('S8');
const tRep = [wt('S7', 'Slow'), wt('S7', 'jaw'), wt('S7', 'matching'), wt('S7', 'step')];
const opS = M.keys([[0, 0], [tOpen, 3.0], [tStop - 0.3, 2.3], [tRep[0], 2.0], [tRep[1], 2.1], [tRep[2], 2.2], [tRep[3], 2.3]], 0.7, M.io);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'One extra digit from one sliding scale!' });

/* ---------- D: why one tenth ---------- */
const STEPS = [[`10\\,\\textcolor{${VC}}{\\text{VSD}} = 9\\,\\textcolor{${MC}}{\\text{MSD}}`, 'ten vernier marks fit in nine millimetres'],
  [`1\\,\\textcolor{${VC}}{\\text{VSD}} = 0.9\\,\\textcolor{${MC}}{\\text{MSD}}`, 'divide both sides by ten'],
  [`\\textcolor{${LC}}{\\text{LC}} = 1\\,\\textcolor{${MC}}{\\text{MSD}} - 1\\,\\textcolor{${VC}}{\\text{VSD}}`, 'least count is the difference'],
  [`\\textcolor{${LC}}{\\text{LC}} = 1 - 0.9 = \\textcolor{${LC}}{0.1\\,\\text{mm}}`, 'one tenth of a millimetre']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:108px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Ten'), wt('D3', 'So'), wt('D4', 'least'), wt('D5', 'One')];
const VD = vernier($('#drS'), { X0: 92, Y: 150, PX: 60, nMain: 10, jaws: false });
const dr = $('#drS');
const dB1 = mk(dr, 'path', { d: `M92,128 V112 H${92 + 9 * 60} V128`, fill: 'none', stroke: MC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const dB1t = txt(dr, 92 + 4.5 * 60, 100, '9 MSD = 9 mm', { 'text-anchor': 'middle', 'font-size': 22, fill: MC, 'font-weight': 600 });
const dB2 = mk(dr, 'path', { d: `M92,296 V312 H${92 + 9 * 60} V296`, fill: 'none', stroke: VC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const dB2t = txt(dr, 92 + 4.5 * 60, 346, '10 VSD', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 });
const dGap = mk(dr, 'rect', { x: 92 + 54, y: 196, width: 6, height: 52, fill: LC, opacity: 0 });
const dGapT = txt(dr, 92 + 57, 400, 'gap = 0.1 mm', { 'text-anchor': 'middle', 'font-size': 22, fill: LC, 'font-weight': 600 });
const dGapL = mk(dr, 'line', { x1: 92 + 57, y1: 252, x2: 92 + 57, y2: 380, stroke: LC, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
$('#dF').innerHTML = K(`\\text{reading} = \\textcolor{${MC}}{\\text{MSR}} + \\textcolor{${VC}}{k} \\times \\textcolor{${LC}}{\\text{LC}}`);
$('#stF').innerHTML = K(`\\textcolor{${LC}}{\\text{LC}} = 1\\,\\textcolor{${MC}}{\\text{MSD}} - 1\\,\\textcolor{${VC}}{\\text{VSD}}`);

/* ---------- K: ruler vs vernier ---------- */
const kb = $('#kbS'), KX = 112, KP = 112;
mk(kb, 'rect', { x: KX, y: 110, width: 2.3 * KP, height: 190, rx: 4, fill: STEEL, stroke: C.ink, 'stroke-width': 2.5 });
mk(kb, 'rect', { x: KX - 30, y: 300, width: 5 * KP + 60, height: 90, rx: 6, fill: CREAM, stroke: C.ink, 'stroke-width': 2.5 });
for (let m = 0; m <= 5; m++) { mk(kb, 'line', { x1: KX + m * KP, y1: 300, x2: KX + m * KP, y2: 340, stroke: C.ink, 'stroke-width': 3 }); txt(kb, KX + m * KP, 372, m, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const kbBand = mk(kb, 'rect', { x: KX + 2 * KP, y: 300, width: KP, height: 44, fill: C.red, opacity: 0 });
const VK = vernier($('#kdS'), { X0: 92, Y: 120, PX: 50, nMain: 12, spoke: 2.3 });
const th1 = PUC.think($('#th1'), { q: 'Can a millimetre ruler tell a 2.3 mm spoke from a 2.4 mm spoke?', opts: ['Yes', 'No'], right: 1, why: 'Both sit between the 2 and 3 mm marks: 0.1 mm is smaller than its least count.' });

/* ---------- G: screw gauge ---------- */
const SG = screw($('#gsS'), { PX: 60, AX: 84, SX: 300, Y: 200, dial: { x: 168, y: 452, r: 92 } });
const gs = $('#gsS');
const gP1 = document.createElement('div'); gP1.className = 'pillp'; gP1.style.cssText = 'left:320px;top:400px'; gP1.innerHTML = `1 turn = pitch = <b class="mono" style="color:${LC}">0.5 mm</b>`; $('#gs').appendChild(gP1);
const gP2 = document.createElement('div'); gP2.className = 'pillp'; gP2.style.cssText = 'left:320px;top:470px'; gP2.innerHTML = `<b class="mono" style="color:${VC}">50</b> divisions on the cap`; $('#gs').appendChild(gP2);
$('#groG').innerHTML = `<span class="k">Turns of the cap</span><span class="v" id="g1">0.00</span><span class="un"></span>
  <span class="k">Divisions turned</span><span class="v" id="g2" style="color:${VC}">0</span><span class="un"></span>
  <span class="k tot" style="font-weight:700">Screw moved</span><span class="v tot" id="g3" style="color:${LC}">0.00</span><span class="un tot">mm</span>`;
const gg = PUC.graph($('#ggS'), { x: 110, y: 74, w: 600, h: 140, xmax: 1.2, ymax: 0.6, xt: [0, 0.5, 1], yt: [0, 0.25, 0.5], xl: 'turns', yl: 'moved (mm)' });
gg.ylab.setAttribute('x', 124);
const gLine = gg.curve(LC, 5), gDot2 = gg.dot(LC, 10);
$('#gFx').innerHTML = K(`\\textcolor{${LC}}{\\text{LC}} = \\dfrac{\\text{pitch}}{\\textcolor{${VC}}{N}} = \\dfrac{0.5\\,\\text{mm}}{\\textcolor{${VC}}{50}} = \\textcolor{${LC}}{0.01\\,\\text{mm}}`);
const tTurn = wt('G2', 'Turn'), tG4 = T0('G4'), tG5 = T0('G5');
const gS = M.keys([[0, 0], [tTurn + 0.2, 0.5], [wt('G4', 'division'), 0.51]], 1, M.io);
const gTurnLin = t => { const a = tTurn + 0.2, d = 2.4; return t < a ? 0 : t < a + d ? 0.5 * (t - a) / d : 0.5; };   // one full turn at constant speed
const gpos = t => t < wt('G4', 'division') - 0.1 ? gTurnLin(t) : gS(t);
const avD = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Ten times finer than the vernier.' });

/* ---------- J: vernier vs screw gauge on a sheet of paper ---------- */
function paper(svg, n, col) {
  const PX0 = 92, W = 600, Y = 200;
  const g = mk(svg, 'g', {});
  mk(g, 'rect', { x: PX0, y: Y, width: W, height: 70, fill: '#FFFFFF', stroke: C.ink, 'stroke-width': 2.5 });
  txt(g, PX0, Y - 18, 'ONE SHEET OF PAPER · ABOUT 0.1 mm', { 'font-size': 16, 'letter-spacing': 1.5 });
  const cells = []; for (let i = 0; i < n; i++) cells.push(mk(g, 'rect', { x: PX0 + i * W / n + 3, y: Y + 100, width: W / n - 6, height: 56, rx: 6, fill: mix('#FFFFFF', col, 0.85), opacity: 0 }));
  for (let i = 0; i <= n; i++) mk(g, 'line', { x1: PX0 + i * W / n, y1: Y + 84, x2: PX0 + i * W / n, y2: Y + 172, stroke: col, 'stroke-width': i % n ? 2 : 3 });
  const lab = txt(g, PX0 + W / 2, Y + 230, n === 1 ? '1 step: just "0.1 mm"' : '10 steps: 0.01, 0.02 ... 0.10 mm', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
  return { cells, lab };
}
const PJv = paper($('#jvS'), 1, VC), PJs = paper($('#jsS'), 10, LC);
const th2 = PUC.think($('#th2'), { q: 'To measure one sheet of paper, about 0.1 mm thick, which would you pick?', opts: ['Vernier callipers', 'Screw gauge'], right: 1, why: 'On the vernier the sheet is one least count. The screw gauge splits it into ten steps.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${LC}}{\\text{LC}} = \\dfrac{0.5}{\\textcolor{${VC}}{50}} = \\textcolor{${LC}}{0.01\\,\\text{mm}}`)],
  [K(`\\textcolor{${VC}}{31} \\times \\textcolor{${LC}}{0.01} = 0.31\\,\\text{mm}`)],
  [K(`2 + 0.31 = \\textcolor{${LC}}{2.31\\,\\text{mm}}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 110 });
$('#wl .lbl').style.top = '30px';
const SW2 = screw($('#wrS'), { PX: 60, AX: 84, SX: 300, Y: 200, spoke: 2.31, dial: { x: 168, y: 452, r: 92 } });
const wr = $('#wrS');
const wT1 = document.createElement('div'); wT1.className = 'pillp'; wT1.style.cssText = 'left:320px;top:400px'; wT1.innerHTML = `Main scale: <b class="mono">2 mm</b>`; $('#wr').appendChild(wT1);
const wT2 = document.createElement('div'); wT2.className = 'pillp'; wT2.style.cssText = 'left:320px;top:470px'; wT2.innerHTML = `On the line: <b class="mono" style="color:${VC}">31</b>`; $('#wr').appendChild(wT2);
const tW = [T0('W3'), T0('W4'), T0('W5')];
const wG = M.keys([[0, 0], [T0('W1') + 0.4, 3.0], [T0('W2'), 2.31]], 1.1, M.io);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Vernier least count = 1 / N, so 1 / 25 = 0.04 mm`, right: `LC = 1 MSD / N = 0.5 mm / 25 = 0.02 mm (here 1 MSD = 0.5 mm)` });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Find the least count, or the reading, of a vernier or a screw gauge' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: '1 MSD = 0.5 mm and 20 VSD = 19 MSD. Main scale reading 12.5 mm, 8th vernier mark coincides. The length is:', qW: 800,
  opts: ['12.58 mm', '12.70 mm', '12.90 mm', '13.30 mm'], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`\\textcolor{${LC}}{\\text{LC}} = \\dfrac{0.5}{20} = 0.025\\,\\text{mm}`)], [K(`8 \\times 0.025 = 0.200\\,\\text{mm}`)], [K(`12.5 + 0.200`)], [K(`= \\textcolor{${C.ok}}{12.70\\,\\text{mm}}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Least'), wt('A3', 'Eight'), wt('A3', 'Add'), wt('A3', 'Twelve', 1)];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · least count', y0: 96, dy: 100, txt: [1, 0, 0, 0],
  lines: ['<b>Least count</b> = smallest value read correctly',
    K(`\\text{Vernier: }\\textcolor{${LC}}{\\text{LC}} = 1\\,\\textcolor{${MC}}{\\text{MSD}} - 1\\,\\textcolor{${VC}}{\\text{VSD}} = \\dfrac{1\\,\\textcolor{${MC}}{\\text{MSD}}}{\\textcolor{${VC}}{N}}`),
    K(`\\text{Reading} = \\textcolor{${MC}}{\\text{MSR}} + \\textcolor{${VC}}{k} \\times \\textcolor{${LC}}{\\text{LC}}`),
    K(`\\text{Screw gauge: }\\textcolor{${LC}}{\\text{LC}} = \\dfrac{\\text{pitch}}{\\textcolor{${VC}}{N}}`)] });
const YQ = ['Why can a millimetre ruler not read a 2.3 mm spoke?', 'Ten vernier divisions equal nine millimetres. What is the least count?', 'Pitch 1 mm, 100 circular divisions. What is the least count?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 15', topic: 'Five readings, one glass. Absolute, Relative and Percentage Errors', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tS5 = T0('S5');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 - 0.1, 1.1, 552, 560], [T0('S6') + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; GQ.forEach((_, i) => { const e = $('#gq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
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
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    M.vis($('#hjP'), t, wt('H2', 'thinner') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkImg'), t, tH3 + 0.1, tH4 - 0.2, { dy: 20, outDur: 0.3, ody: 0 });
    M.vis(hzG, t, tH4 - 0.05, 1e9, { dy: 0, fade: 0.3 });
    M.draw(hzE, t, tH4 + 0.4, 0.4); M.vis(hzQ, t, wt('H4', 'between'), 1e9, { dy: 10 });
    GQ.forEach((_, i) => { const el = $('#gq' + i); M.vis(el, t, i < 2 ? tGq[i] - 0.1 : tH5 + 0.3, 1e9, POP);
      el.style.background = i < 2 ? mix(C.soft, C.redBg, M.io((t - tGq[2]) / 0.3)) : mix(C.soft, C.ac2, M.io((t - tH5 - 0.3) / 0.3)); el.style.color = i < 2 ? mix(C.ink, C.red, M.io((t - tGq[2]) / 0.3)) : C.ac; });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#defn'), t, T0('P2') + 0.1, { st: 0.05, sp: M.HEAVY });
    M.vis($('#ir0'), t, T0('P3') - 0.05, 1e9, { dy: 16 }); M.vis($('#ir1'), t, T0('P4') - 0.05, 1e9, { dy: 16 });
    M.vis($('#pqP'), t, T0('P5') - 0.05, 1e9, POP);
    M.vis($('#pm'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pmM'), t, T0('P3') + 0.2, 1e9, { dy: 8 });
    M.draw(pmB, t, wt('P3', 'gap') - 0.1, 0.5); M.vis(pmL, t, wt('P3', 'least'), 1e9, { dy: 10 });
    pmGap.style.opacity = (0.9 * M.io((t - wt('P3', 'least') - 0.3) / 0.4)).toFixed(3); M.vis(pmN, t, wt('P3', 'least') + 0.5, 1e9, { dy: 10 });
  }

  /* S: vernier bench + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#simM'), t, tS1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const op = opS(t), rep = t > tRep[0] - 0.3 && t < tS8;
    const best = VN.set(op, M.io((t - wt('S5', 'third') + 0.1) / 0.3), [opS(t - 0.08), opS(t - 0.16), opS(t - 0.24)]);
    VN.vg.style.opacity = M.clamp((t - T0('S3') + 0.2) / 0.3).toFixed(3);
    VN.sp.style.opacity = (M.io((t - tOpen - 0.4) / 0.4) * (rep ? 0.25 : 1)).toFixed(3);
    M.vis($('#smo'), t, tRep[0] - 0.2, tS8 - 0.2, { ...POP, outDur: 0.25, ody: 0 });
    const msr = Math.floor(op + 1e-6), k = Math.floor((op - msr) * 10 + 1e-6), rd = msr + k / 10;
    M.setT($('#r1'), String(msr)); M.setT($('#r2'), `${k} × 0.1`); M.setT($('#r3'), rd.toFixed(1));
    const tl = t < tOpen ? 0 : 1; gDot(op, rd, t > tOpen - 0.1);
    gVer(stairV, 0, t < tS8 ? Math.max(0.001, op) : Math.max(op, 3.2 * M.io((t - wt('S8', 'vernier')) / 1.0)), 320);
    gRul(stairR, 0, 3.2 * M.io((t - wt('S8', 'ruler') + 0.1) / 1.0), 320);
    M.vis(vChip, t, wt('S6', 'reading') - 0.1, tS7 - 0.2, { ...POP, outDur: 0.25, ody: 0 }); M.setT($('#vcN'), rd.toFixed(1));
    PUC.write(vEq, t, wt('S6', 'plus'), 0.8, tS7 - 0.2);
    avA(t, wt('S8', 'smaller') + 0.4, out);
  }

  /* D: why one tenth */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    VD.set(0, 0);
    M.draw(dB1, t, wt('D2', 'nine') - 0.1, 0.5); M.vis(dB1t, t, wt('D2', 'nine'), 1e9, { dy: 8 });
    M.draw(dB2, t, wt('D2', 'Ten') - 0.1, 0.5); M.vis(dB2t, t, wt('D2', 'vernier'), 1e9, { dy: 8 });
    dGap.style.opacity = (0.9 * M.io((t - wt('D4', 'difference') + 0.1) / 0.3)).toFixed(3);
    M.draw(dGapL, t, wt('D4', 'difference'), 0.4); M.vis(dGapT, t, wt('D4', 'difference') + 0.3, 1e9, { dy: 8 });
    M.vis($('#dF'), t, T0('D6') - 0.05, 1e9, { dy: 20 });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'never') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'instrument'), 0.8);
  }

  /* K: ruler vs vernier, think */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kbBand.style.opacity = (0.35 * M.io((t - wt('K1', 'between') + 0.1) / 0.3)).toFixed(3);
    M.vis($('#kbC'), t, wt('K1', 'reads') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    VK.set(2.3, M.io((t - wt('K2', 'reads') + 0.1) / 0.3));
    M.vis($('#kdC'), t, wt('K2', 'reads') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Pause') - 0.6, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Both') });
  }

  /* G: screw gauge */
  const gOn = t >= tG1 - 0.1 && t < tJ1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('J1');
    M.vis($('#gs'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#gsM'), t, tG1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#gro'), t, tG1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#ggr'), t, tG1 + 0.4, tG5 - 0.2, { dy: 36, ...o });
    M.vis($('#gF'), t, tG5 - 0.05, out, { dy: 36, ...o });
    PUC.write($('#gFx'), t, tG5 + 0.3, 0.9);
    const g = gpos(t); SG.set(g);
    const turns = g / 0.5, divs = Math.round(g / 0.01 * 100) / 100;
    M.setT($('#g1'), turns.toFixed(2)); M.setT($('#g2'), Math.round(g / 0.01).toString()); M.setT($('#g3'), g.toFixed(2));
    gLine(s => [s, s * 0.5], 0, Math.max(0.0001, turns)); gDot2(turns, g, t > tTurn - 0.2);
    M.vis(gP1, t, wt('G2', 'pitch') - 0.1, 1e9, POP); M.vis(gP2, t, wt('G3', 'fifty') - 0.1, 1e9, POP);
    M.vis($('#gsmo'), t, tG4 - 0.1, tG5 - 0.1, { ...POP, outDur: 0.25, ody: 0 });
    avD(t, wt('G5', 'divisions') + 0.6, out);
  }

  /* J: vernier vs screw gauge, think */
  const jOn = t >= tJ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = OUT('J2');
    M.vis($('#jv'), t, tJ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#js'), t, wt('J1', 'screw') - 0.1, out, { dx: 60, dy: 0, ...o });
    PJv.cells.forEach(c => { c.style.opacity = M.io((t - wt('J1', 'vernier') - 0.2) / 0.3).toFixed(3); }); M.vis(PJv.lab, t, wt('J1', 'vernier') + 0.4, 1e9, { dy: 8 });
    PJs.cells.forEach((c, i) => { c.style.opacity = M.io((t - wt('J1', 'screw') - 0.2 - i * 0.12) / 0.2).toFixed(3); }); M.vis(PJs.lab, t, wt('J1', 'zero', 3) + 0.2, 1e9, { dy: 8 });
    M.vis($('#th2'), t, tJ2 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tJ2, tOpts: wt('J2', 'which') - 0.2, tCount: T1('J2') + 0.05, dur: 3, tAns: T0('J3') - 0.02, tWhy: wt('J3', 'On') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, tW1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wrM'), t, tW1 + 0.5, 1e9, { dy: 8 });
    SW2.set(wG(t)); SW2.sp.style.opacity = M.io((t - T0('W1') - 1.2) / 0.4).toFixed(3);
    M.vis(wT1, t, wt('W2', 'main') - 0.1, 1e9, POP); M.vis(wT2, t, wt('W2', 'division') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'vernier') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Always') });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'Find') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Twenty') , tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap, questions, NEXT */
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
