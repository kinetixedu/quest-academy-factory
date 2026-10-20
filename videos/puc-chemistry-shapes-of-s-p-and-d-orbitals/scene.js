// PUC Chemistry Ep 23: Shapes of s, p and d orbitals (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, counter, table, recap): n teal, l and angular nodes violet (angular nodes = l), radial nodes gold, orbital lobes teal
const NC = C.ac, LC = '#7A4FE0', RC = '#B7791F', EC = '#C8461B';
const LOBE = M.mix('#FFFFFF', NC, 0.2);
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const cN = s => `\\textcolor{${NC}}{${s}}`, cL = s => `\\textcolor{${LC}}{${s}}`, cR = s => `\\textcolor{${RC}}{${s}}`;
const n_ = cN('n'), l_ = cL('l');
const wx = (id, w, nth = 0) => { const W = M.L(id).words, h = W.filter(x => x.w.toLowerCase().replace(/[^a-z0-9]/g, '') === w.toLowerCase()); if (!h.length) { console.warn('word not found', id, w); return M.t0(id); } return h[Math.min(nth, h.length - 1)].t; };

Object.assign(M.IC, {
  fan: ['M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z', 'M12 12v.01'],
  flower: ['M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', 'M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
});

/* ---------- orbital drawing ---------- */
const D2R = Math.PI / 180, MAGIC = Math.acos(1 / Math.sqrt(3)) / D2R;   // 54.74 deg: d z2 nodal cones
const SH = {   // angular shape r(theta), axes labels [horizontal, vertical], angular node line angles (deg)
  s: { f: () => 1, ax: ['x', 'y'], nodes: [] },
  px: { f: a => Math.abs(Math.cos(a)), ax: ['x', 'y'], nodes: [90] },
  py: { f: a => Math.abs(Math.sin(a)), ax: ['x', 'y'], nodes: [0] },
  pz: { f: a => Math.abs(Math.sin(a)), ax: ['x', 'z'], nodes: [0] },
  dxy: { f: a => Math.abs(Math.sin(2 * a)), ax: ['x', 'y'], nodes: [0, 90] },
  dyz: { f: a => Math.abs(Math.sin(2 * a)), ax: ['y', 'z'], nodes: [0, 90] },
  dzx: { f: a => Math.abs(Math.sin(2 * a)), ax: ['x', 'z'], nodes: [0, 90] },
  dx2y2: { f: a => Math.abs(Math.cos(2 * a)), ax: ['x', 'y'], nodes: [45, 135] },
  dz2: { f: a => Math.abs(3 * Math.sin(a) ** 2 - 1) / 2, ax: ['x', 'z'], nodes: [90 - MAGIC, 90 + MAGIC] },
};
const NAME = { s: 's', px: 'p<tspan baseline-shift="sub" font-size="70%">x</tspan>' };
const lobeD = (f, cx, cy, R) => { let d = ''; for (let i = 0; i <= 360; i += 2) { const a = i * D2R, r = R * f(a); d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy - r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
let clipN = 0;
// draw one orbital: g group, type, centre, size, radial node fractions, dots count
const orb = (p, type, cx, cy, R, o = {}) => {
  const S = SH[type], g = mk(p, 'g', {}), parts = { g, nodes: [], rads: [], dots: [] };
  const AL = R * 1.22;
  parts.axes = mk(g, 'g', {});
  mk(parts.axes, 'line', { x1: cx - AL, y1: cy, x2: cx + AL, y2: cy, stroke: C.dim, 'stroke-width': 1.5 });
  mk(parts.axes, 'line', { x1: cx, y1: cy - AL, x2: cx, y2: cy + AL, stroke: C.dim, 'stroke-width': 1.5 });
  txt(parts.axes, cx + AL + 6, cy + 6, S.ax[0], { 'font-size': o.fs || 18, 'font-style': 'italic', fill: C.mute });
  txt(parts.axes, cx + 8, cy - AL - 4, S.ax[1], { 'font-size': o.fs || 18, 'font-style': 'italic', fill: C.mute });
  const d = lobeD(S.f, cx, cy, R);
  parts.lobe = mk(g, 'path', { d, fill: o.dots ? 'none' : LOBE, stroke: NC, 'stroke-width': o.sw || 3, 'stroke-linejoin': 'round' });
  if (o.dots) {   // dot cloud inside the boundary, with gaps at radial nodes
    const id = 'oc' + (clipN++); mk(g, 'defs', {}).innerHTML = `<clipPath id="${id}"><path d="${d}"/></clipPath>`;
    const dg = mk(g, 'g', { 'clip-path': `url(#${id})` }), rnd = M.rng(o.seed || 7), rn = (o.rad || []).map(f => f * R), gap = R * 0.06;
    let tries = 0;
    while (parts.dots.length < o.dots && tries++ < 40000) {
      const r = R * Math.sqrt(rnd()), a = rnd() * Math.PI * 2, ang = S.f(a);
      if (r > R * ang) continue;
      if (rn.some(q => Math.abs(r - q) < gap)) continue;
      const w = (type === 's' ? 1 : ang * ang) * (0.3 + 0.7 * Math.exp(-r / (R * 0.5)));
      if (rnd() > w) continue;
      parts.dots.push(mk(dg, 'circle', { cx: (cx + r * Math.cos(a)).toFixed(1), cy: (cy - r * Math.sin(a)).toFixed(1), r: o.dr || 3, fill: C.ink2 }));
    }
    (o.rad || []).forEach(f => parts.rads.push(mk(g, 'circle', { cx, cy, r: f * R, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '9 8', 'clip-path': type === 's' ? '' : `url(#${id})` })));
  }
  S.nodes.forEach(an => { const ca = Math.cos(an * D2R), sa = Math.sin(an * D2R), L = R * 1.08;
    parts.nodes.push(mk(g, 'line', { x1: (cx - L * ca).toFixed(1), y1: (cy + L * sa).toFixed(1), x2: (cx + L * ca).toFixed(1), y2: (cy - L * sa).toFixed(1), stroke: LC, 'stroke-width': 3, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' })); });
  mk(g, 'circle', { cx, cy, r: o.nr || 6, fill: C.ink });
  return parts;
};
const label = (p, x, y, s, sub, fs = 34) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: NC }); e.textContent = s; if (sub) { const ts = mk(e, 'tspan', { 'baseline-shift': 'sub', 'font-size': (fs * 0.62).toFixed(0) }); ts.textContent = sub; } return e; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tS3 = T0('S3'), tS5 = T0('S5'), tS7 = T0('S7'), tS8 = T0('S8'), tB1 = T0('B1'), tB2 = T0('B2');
const tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three blurs ---------- */
const JOBS = [['fan', 'Fast fan', 'A BLUR, NOT A BLADE', 'fan', 'BLUR'], ['flower', 'Bee', 'ALWAYS NEAR ONE FLOWER', 'bee', 'NEAR'], ['camera', 'Night swing', 'A SMEAR IN A PHOTO', 'swing', 'SMEAR']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="adr" id="ja${i}">LIKELY HERE</div></div>`).join('');
const KIT = [['flame', 'Steam', 'Steam'], ['droplet', 'One droplet?', 'droplet'], ['cloud', 'Only the cloud', 'cloud']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: dot picture + boundary surface ---------- */
const cS = $('#cS'), cS2 = $('#cS2');
const cloud = orb(cS, 's', 392, 316, 210, { dots: 520, seed: 23, dr: 3.2, nr: 9 }); cloud.lobe.setAttribute('stroke', 'none'); M.hide(cloud.axes, true);
const psiT = document.createElement('div'); psiT.className = 'btag'; psiT.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; psiT.innerHTML = `PROBABILITY DENSITY&nbsp;${K('\\psi^2')}`; $('#poIn').appendChild(psiT);
const bnd = orb(cS2, 's', 392, 300, 150, { dots: 260, seed: 23, dr: 3, nr: 8 }); M.hide(bnd.axes, true);
const bEdge = mk(cS2, 'circle', { cx: 392, cy: 300, r: 150, fill: 'none', stroke: NC, 'stroke-width': 4 });
const b90 = document.createElement('div'); b90.className = 'pillp ac'; b90.style.cssText = 'left:36px;top:494px'; b90.textContent = 'Holds about 90% of the dots'; $('#pb').appendChild(b90);
const bShape = document.createElement('div'); bShape.className = 'pillp'; bShape.style.cssText = 'right:36px;top:494px'; bShape.textContent = 'Its outline = the shape'; $('#pb').appendChild(bShape);

/* ---------- S: the bench ---------- */
const b = $('#bS');
const V = {};
// V1 1s, V2 2s, V3 3s, V4 2px (big, dots)
V.s1 = orb(b, 's', 392, 300, 120, { dots: 260, seed: 3, nr: 8 });
V.s2 = orb(b, 's', 392, 300, 180, { dots: 420, seed: 5, rad: [0.36], nr: 8 });
V.s3 = orb(b, 's', 392, 300, 205, { dots: 520, seed: 9, rad: [0.24, 0.58], nr: 8 });
V.p = orb(b, 'px', 392, 300, 200, { dots: 420, seed: 11, nr: 8 });
[V.s1, V.s2, V.s3, V.p].forEach(v => M.hide(v.axes, true));
const vLab = label(b, 36, 112, '1s');
// V5 three p panels, V6 five d panels, V7 2s | 2p compare
const pan = (p, x, y, w, h) => mk(p, 'rect', { x, y, width: w, height: h, rx: 14, fill: '#FBFAF7', stroke: C.line, 'stroke-width': 2 });
const V5 = mk(b, 'g', {}), V6 = mk(b, 'g', {}), V7 = mk(b, 'g', {});
const P3 = [['px', 'p', 'x'], ['py', 'p', 'y'], ['pz', 'p', 'z']].map(([ty, a, s], i) => { const x = 24 + i * 248; pan(V5, x, 120, 232, 400); const o = orb(V5, ty, x + 116, 330, 92, { fs: 16, nr: 5 }); label(V5, x + 16, 160, a, s, 30); return o; });
const DL = [['dxy', 'xy'], ['dyz', 'yz'], ['dzx', 'zx'], ['dx2y2', 'x²-y²'], ['dz2', 'z²']];
const D5 = DL.map(([ty, s], i) => { const r = i < 3 ? 0 : 1, x = r ? 148 + (i - 3) * 248 : 24 + i * 248, y = r ? 324 : 78; const g = mk(V6, 'g', {}); pan(g, x, y, 232, 232); const o = orb(g, ty, x + 124, y + 126, 80, { fs: 15, nr: 5, sw: 2.5 }); label(g, x + 14, y + 36, 'd', s, 26); o.wrap = g; return o; });
const CMP = [['s', '2s', [0.36]], ['px', '2p', []]].map(([ty, nm, rad], i) => { const x = 24 + i * 376; pan(V7, x, 78, 360, 440); const o = orb(V7, ty, x + 180, 310, 140, { dots: 300, seed: 13 + i, rad, nr: 6 }); M.hide(o.axes, ty === 's'); label(V7, x + 18, 124, nm, '', 32); return o; });
const cmpTag = [txt(V7, 204, 500, 'RADIAL NODE · A SPHERE', { 'text-anchor': 'middle', 'font-size': 17, fill: RC, 'font-weight': 600 }), txt(V7, 580, 500, 'ANGULAR NODE · A PLANE', { 'text-anchor': 'middle', 'font-size': 17, fill: LC, 'font-weight': 600 })];
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// node counter
const SLOTS = [[n_, 'SHELL', NC], [l_, 'SUBSHELL', LC], [cR('\\text{radial}'), 'ROUND NODES', RC], [cL('\\text{angular}'), 'FLAT NODES', LC]];
$('#slots').innerHTML = SLOTS.map(([s, nm], i) => `<div class="slot" id="sl${i}" style="left:${36 + i * 180}px"><div class="sy">${K(s)}</div><div class="sv" id="sv${i}">-</div><div class="sn">${nm}</div></div>`).join('');
// gallery chips
const CH = [['s', '1s'], ['s', '2s'], ['s', '3s'], ['px', '2px'], ['py', '2py'], ['pz', '2pz'], ['dxy', 'dxy'], ['dyz', 'dyz'], ['dzx', 'dzx'], ['dx2y2', 'dx²-y²'], ['dz2', 'dz²']];
$('#chips').innerHTML = CH.map(([ty, nm], i) => { const r = i < 6 ? 0 : 1, x = r ? 36 + (i - 6) * 144 : 36 + i * 120, w = r ? 136 : 112;
  return `<div class="chip2" id="ch${i}" style="left:${x}px;top:${r ? 168 : 72}px;width:${w}px;height:84px"><svg width="56" height="44" viewBox="-30 -23 60 46"><path d="${lobeD(SH[ty].f, 0, 0, ty === 's' ? 15 + (+nm[0]) * 2.5 : 21)}" fill="${LOBE}" stroke="${NC}" stroke-width="2"/></svg><b>${nm}</b></div>`; }).join('');

/* view timeline */
const tS4three = wx('S4', 'three'), tPlane = wt('S6', 'flat'), tD9 = T0('S9'), tDz = T0('S10');
const VIEW = [[tS1, 'V1'], [tS3, 'V2'], [tS4three, 'V3'], [tS5, 'V4'], [tS7, 'V5'], [tS8, 'V6'], [tB1, 'V7']];
const VAL = { V1: ['1', '0', '0', '0'], V2: ['2', '0', '1', '0'], V3: ['3', '0', '2', '0'], V4: ['2', '1', '0', '1'], V5: ['2', '1', '0', '1'], V6: ['3', '2', '0', '2'], V7: ['2 | 2', '0 | 1', '1 | 0', '0 | 1'] };
const LAB = { V1: '1s', V2: '2s', V3: '3s', V4: '2p' };
const tChip = [tS1 + 0.4, tS3 + 0.3, tS4three, wt('S7', 'x'), wt('S7', 'y'), wt('S7', 'z'), wt('S9', 'In') + 0.3, wt('S9', 'y', 1), wt('S9', 'z', 1), wt('S9', 'squared') , tDz + 0.4];
const th1 = PUC.think($('#th1'), { q: 'Which one has a radial node, shaped like a sphere?', opts: ['2s', '2p'], right: 0, why: `2s: its node is a sphere. 2p: its node is a flat plane through the nucleus.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${l_} + (${n_} - ${l_} - 1) = ${n_} - 1 \\;\\; \\text{total nodes}`);

/* ---------- D: counting nodes ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${cL('\\text{angular}')} = ${l_}`)],
  [K(`${cR('\\text{radial}')} = ${n_} - ${l_} - 1`)],
  [K(`${l_} + (${n_} - ${l_} - 1) = ${n_} - 1`)],
  [K(`2p:\\; ${cR('0')} + ${cL('1')} = 1 = 2 - 1 \\;\\checkmark`)]], { label: 'COUNTING NODES · STEP BY STEP', y0: 110, dy: 112 });
const tDs = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const TB = [['1s', 1, 0], ['2s', 2, 0], ['3s', 3, 0], ['2p', 2, 1], ['3p', 3, 1], ['3d', 3, 2]];
$('#tb').innerHTML = `<tr><th>ORBITAL</th><th>n</th><th>l</th><th>RADIAL</th><th>ANGULAR</th><th>TOTAL</th></tr>` + TB.map(([o, n, l], i) => `<tr id="tr${i}"><td class="o">${o}</td><td style="color:${NC}">${n}</td><td style="color:${LC}">${l}</td><td style="color:${RC}" id="tr${i}r">${n - l - 1}</td><td style="color:${LC}" id="tr${i}a">${l}</td><td id="tr${i}t">${n - 1}</td></tr>`).join('');

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`3d:\\; ${n_} = 3,\\; ${l_} = 2 \\;\\to\\; ${cL('2')} \\text{ angular},\\; ${cR('0')} \\text{ radial}`)],
  [K(`\\text{total } 2 = 3 - 1 \\;\\checkmark`)],
  [K(`4p:\\; ${n_} = 4,\\; ${l_} = 1 \\;\\to\\; ${cL('1')} \\text{ angular},\\; ${cR('2')} \\text{ radial}`)],
  [K(`\\text{total } 3 = 4 - 1 \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Angular'), T0('W4'), wt('W5', 'Angular'), T0('W6')];
const wsv = $('#wS');
const WP = [mk(wsv, 'g', {}), mk(wsv, 'g', {})];
pan(WP[0], 24, 72, 360, 400); pan(WP[1], 400, 72, 360, 400);
const w3d = orb(WP[0], 'dxy', 204, 268, 130, { nr: 6 }); label(WP[0], 40, 116, 'd', 'xy', 30); txt(WP[0], 56, 116, '', {});
const w4p = orb(WP[1], 'px', 580, 268, 140, { dots: 320, seed: 31, rad: [0.3, 0.62], nr: 6 }); label(WP[1], 416, 116, '4p', '', 30);
const wR = [txt(wsv, 204, 446, 'ANGULAR 2 · RADIAL 0', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }), txt(wsv, 580, 446, 'ANGULAR 1 · RADIAL 2', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 })];
const avD = PUC.avatar($('#wr'), { x: 36, y: 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The nodes always add up to n - 1!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Radial nodes ${K(`= ${n_} - 1`)}, so 2p has one radial node`, right: `Radial nodes ${K(`= ${n_} - ${l_} - 1`)}: 2p has none, only a flat plane` });
const tsv = $('#tS');
const tW = orb(tsv, 'px', 130, 130, 92, { nr: 5, fs: 15 }); const tWc = mk(tW.g, 'circle', { cx: 130, cy: 130, r: 46, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
tW.nodes.forEach(n => M.hide(n, true));
const xW = mk(tsv, 'path', { d: 'M80 80 L180 180 M180 80 L80 180', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const tR = orb(tsv, 'px', 440, 130, 92, { nr: 5, fs: 15 });
const tRt = txt(tsv, 440, 258, '0 RADIAL · 1 ANGULAR', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Counting radial and angular nodes, or naming the orbital from its nodes' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `An orbital has <b style="color:${RC}">2 radial nodes</b> and <b style="color:${LC}">1 angular node</b>. Which orbital is it?`, qW: 780,
  opts: ['3p', '4p', '4d', '5s'], right: 1, optW: 474, optY: 300, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${cL('\\text{angular}')} = ${l_} = 1 \\to p`)], [K(`${n_} - 1 - 1 = ${cR('2')}`)], [K(`${n_} = 4`)], [K(`\\textcolor{${C.ok}}{4p}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'four'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · shapes of s, p and d orbitals', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${cL('\\text{angular nodes}')} = ${l_} \\qquad ${cR('\\text{radial nodes}')} = ${n_} - ${l_} - 1`), K(`\\text{total nodes} = ${n_} - 1`),
    '<b>s</b>: a sphere, bigger as n grows · 2s has 1 radial node, 3s has 2', '<b>p</b>: two lobes and a nodal plane · p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub> differ only in direction', '<b>d</b>: five orbitals, four clovers and d<sub>z²</sub> · all five 3d have the same energy'] });
const YQ = ['What shape is an s orbital, and how does it change from 1s to 2s?', 'How many angular nodes does a d orbital have?', 'How many radial nodes does a 3s orbital have?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 24', topic: 'Which fills first, 3d or 4s? Aufbau, Pauli and Hund\'s Rule', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPlane - 0.3, 1.06, 960, 560], [T1('S6') + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1210) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1210 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}
const showDots = (v, t, t0, dur) => { const u = M.clamp((t - t0) / dur), n = v.dots.length; v.dots.forEach((d, i) => M.hide(d, i / n >= u)); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'likely') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'only') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'shape') + 0.1) / 0.3))); });
    M.vis($('#hTz'), t, wt('H5', 'dumbbell') - 0.15, 1e9, POP);
  }

  /* P: dots then boundary */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#po'), t, tP1 + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tP3 + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#po'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#poIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    showDots(cloud, t, wt('P2', 'marking') - 0.1, wt('P2', 'thick') - wt('P2', 'marking') + 0.6);
    M.vis(psiT, t, wt('P2', 'probability') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    showDots(bnd, t, tP3 + 0.1, 0.6);
    const bu = M.io((t - wt('P3', 'boundary') + 0.1) / 0.8); M.drawU(bEdge, bu); M.hide(bEdge, bu <= 0);
    M.vis(b90, t, wt('P3', 'ninety') - 0.1, 1e9, POP); M.vis(bShape, t, wt('P3', 'shape') - 0.1, 1e9, POP);
  }

  /* S + B: the bench */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#ad'), t, tS1 + 0.25, z, { dx: 60, dy: 0, ...o });
    M.vis($('#gl'), t, tS1 + 0.4, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Which') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Its') });
    let vi = 0; VIEW.forEach(([a], i) => { if (t >= a - 0.2) vi = i; });
    const cur = VIEW[vi][1];
    const vw = (g, key) => { const i = VIEW.findIndex(v => v[1] === key), a = VIEW[i][0], z2 = i < VIEW.length - 1 ? VIEW[i + 1][0] : 1e9; return fade(g, t, a - 0.2, z2 - 0.2, 0.3); };
    vw(V.s1.g, 'V1'); vw(V.s2.g, 'V2'); vw(V.s3.g, 'V3'); vw(V.p.g, 'V4'); vw(V5, 'V5'); vw(V6, 'V6'); vw(V7, 'V7');
    showDots(V.s1, t, tS1 + 0.1, 0.7); showDots(V.s2, t, tS3, 0.6); showDots(V.s3, t, tS4three - 0.1, 0.6); showDots(V.p, t, tS5 + 0.1, 0.8);
    // radial nodes draw on "node"/"radial"; plane on "flat"
    V.s2.rads.forEach(r => { const u = M.io((t - wt('S3', 'zero') + 0.1) / 0.6); M.drawU(r, u); M.hide(r, u <= 0); });
    V.s3.rads.forEach((r, k) => { const u = M.io((t - tS4three - 0.3 - k * 0.3) / 0.5); M.drawU(r, u); M.hide(r, u <= 0); });
    [V.s1, V.s2, V.s3].forEach(v => { v.lobe.style.opacity = 0.9; });
    V.p.nodes.forEach(n => { const u = M.io((t - tPlane + 0.1) / 0.5); M.drawU(n, u); M.hide(n, u <= 0); });
    const lobeU = M.io((t - wt('S5', 'lobes') + 0.1) / 0.6); M.drawU(V.p.lobe, lobeU); M.hide(V.p.lobe, lobeU <= 0); M.hide(V.p.axes, false);
    P3.forEach((p, i) => fade(p.g, t, wt('S7', ['x', 'y', 'z'][i]) - 0.15, 1e9, 0.25));
    const tDin = [wt('S9', 'In') + 0.3, wt('S9', 'y', 1), wt('S9', 'z', 1), wt('S9', 'squared'), tDz + 0.4];
    D5.forEach((d, i) => { fade(d.wrap, t, i < 3 ? Math.min(tDin[i], tS8 + 0.8 + i * 0.3) : tDin[i] - 0.1, 1e9, 0.3); d.nodes.forEach(n => { const u = M.io((t - tDin[i] - 0.4) / 0.4); M.drawU(n, u); M.hide(n, u <= 0); }); });
    // compare view
    CMP[0].rads.forEach(r => { const u = M.io((t - wt('B1', 'two') - 0.2) / 0.5); M.drawU(r, u); M.hide(r, u <= 0); });
    CMP[1].nodes.forEach(n => { const u = M.io((t - wt('B1', 'p') - 0.2) / 0.5); M.drawU(n, u); M.hide(n, u <= 0); });
    showDots(CMP[0], t, tB1, 0.5); showDots(CMP[1], t, tB1 + 0.2, 0.5);
    cmpTag.forEach((e, i) => fade(e, t, wt('B1', 'node') + i * 0.2, 1e9, 0.25));
    // view label
    if (LAB[cur]) M.setT(vLab, LAB[cur]); fade(vLab, t, tS1 + 0.2, tS7 - 0.25, 0.25);
    // counter
    const vals = VAL[cur], intro = [tS1, tS1, wt('S4', 'radial'), wt('S6', 'angular')];
    vals.forEach((v, i) => { const el = $('#sv' + i); M.setT(el, t >= intro[i] ? v : '-'); el.style.fontSize = v.length > 2 ? '36px' : '50px';
      const live = t >= intro[i], fl = M.io((t - VIEW[vi][0]) / 0.15) * (1 - M.io((t - VIEW[vi][0] - 0.5) / 0.4));
      setBg($('#sl' + i), mix(C.soft, M.mix('#FFFFFF', SLOTS[i][2], 0.2), live ? 0.3 + 0.7 * fl : 0)); el.style.color = live ? SLOTS[i][2] : C.dim;
      M.vis($('#sl' + i), t, tS1 + 0.4 + i * 0.1, 1e9, { dy: 16 }); });
    M.setT($('#adL'), cur === 'V7' ? 'NODE COUNTER · 2s | 2p' : 'NODE COUNTER · ' + ({ V1: '1s', V2: '2s', V3: '3s', V4: '2p', V5: '2p', V6: '3d' })[cur]);
    // chips
    const curChip = { V1: [0], V2: [1], V3: [2], V4: [3], V5: [3, 4, 5], V6: [6, 7, 8, 9, 10], V7: [1, 3] }[cur];
    CH.forEach((_, i) => { const el = $('#ch' + i); M.vis(el, t, tChip[i] - 0.1, 1e9, POP); setBg(el, curChip.includes(i) && t >= tChip[i] ? C.ac2 : C.soft); });
    // bench tag
    const TAG = [[tS1 + 0.3, 's · A SPHERE'], [tS3, '2s · BIGGER SPHERE'], [wt('S3', 'zero'), 'NODE · ZERO CHANCE'], [wt('S4', 'radial'), 'RADIAL NODE · A SPHERE'], [tS5, 'p · TWO LOBES'], [tPlane, 'ANGULAR NODE · A PLANE'], [tS7, 'THREE p · SAME ENERGY'], [tS8, 'FIVE d ORBITALS'], [tD9, 'LOBES BETWEEN AXES'], [wt('S9', 'squared'), 'd x²-y² · ON THE AXES'], [tDz, 'd z² · LOBES AND A RING'], [wt('S10', 'Still'), 'ALL FIVE 3d · SAME ENERGY'], [tB1, 'ONE NODE EACH']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
  }

  /* D: counting nodes */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    TB.forEach((_, i) => { M.vis($('#tr' + i), t, tD1 + 0.5 + i * 0.08, 1e9, { dy: 10 });
      M.vis($(`#tr${i}a`), t, tDs[0] + 0.6 + i * 0.15, 1e9, POP); M.vis($(`#tr${i}r`), t, tDs[1] + 0.6 + i * 0.15, 1e9, POP); M.vis($(`#tr${i}t`), t, tDs[2] + 0.8 + i * 0.15, 1e9, POP);
      setBg($('#tr' + i), i === 3 ? mix('#FFFFFF', C.ac2, M.io((t - tDs[3]) / 0.3)) : '#FFFFFF'); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Angular') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Radial') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'minus', 1) + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    fade(WP[0], t, T0('W3') - 0.1, 1e9, 0.3); fade(WP[1], t, T0('W5') - 0.1, 1e9, 0.3);
    w3d.nodes.forEach((n, k) => { const u = M.io((t - wt('W3', 'Angular') - 0.2 - k * 0.3) / 0.4); M.drawU(n, u); M.hide(n, u <= 0); });
    showDots(w4p, t, T0('W5'), 0.6);
    w4p.nodes.forEach(n => { const u = M.io((t - wt('W5', 'Angular') - 0.2) / 0.4); M.drawU(n, u); M.hide(n, u <= 0); });
    w4p.rads.forEach((r, k) => { const u = M.io((t - wt('W5', 'Radial') - 0.2 - k * 0.3) / 0.5); M.drawU(r, u); M.hide(r, u <= 0); });
    fade(wR[0], t, T0('W4') - 0.1, 1e9, 0.25); fade(wR[1], t, T0('W6') - 0.1, 1e9, 0.25);
    avD(t, wt('W6', 'Both') + 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'total') - 0.1, tRight: wt('X3', 'Radial') - 0.1 });
    fade(tW.g, t, wt('X2', 'two') - 0.1); M.draw(xW, t, wt('X3', 'total') - 0.1, 0.5); fade(tR.g, t, wt('X3', 'Two') - 0.05); fade(tRt, t, wt('X3', 'flat') - 0.1);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'as') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
