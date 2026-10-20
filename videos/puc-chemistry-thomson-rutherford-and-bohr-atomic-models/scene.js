// PUC Chemistry Ep 15: Thomson, Rutherford and Bohr atomic models (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: nucleus / positive charge teal, electron e- orange, alpha particles violet, photon gold, energy levels ink
const PC = C.ac, EC = '#C8461B', AC = C.violet, GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const E_ = s => `\\textcolor{${EC}}{${s}}`, P_ = s => `\\textcolor{${PC}}{${s}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const B = { fill: C.ink, 'font-weight': 600 };

Object.assign(M.IC, {
  melon: ['M3 9a9 9 0 0 0 18 0Z', 'M5.5 9a6.5 6.5 0 0 0 13 0', 'M9 12v.01', 'M12 13.5v.01', 'M15 12v.01'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M7 4.5c2 2.5 2 12.5 0 15', 'M17 4.5c-2 2.5-2 12.5 0 15'],
  stairs: ['M3 20h5v-5h5v-5h5V5h3'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2-2-.2-7.6-4.9-12.3C10.6 3.2 5 1 3 3s.2 7.6 4.9 12.3c4.7 4.7 10.3 6.9 12.3 4.9Z', 'M15.7 15.7c4.7-4.7 6.9-10.3 4.9-12.3S13 3.6 8.3 8.3c-4.7 4.7-6.9 10.3-4.9 12.3s7.6-.2 12.3-4.9Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tB1 = T0('B1'), tB2 = T0('B2'), tR1 = T0('R1'), tD1 = T0('D1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['melon', 'Watermelon', 'SEEDS ALL THROUGH', 'watermelon', 'THOMSON · 1898'], ['ball', 'Cricket ball', 'IN A HUGE STADIUM', 'cricket', 'RUTHERFORD · 1911'], ['stairs', 'Staircase', 'STEP BY STEP', 'staircase', 'BOHR · 1913']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}">${el}</div></div>`).join('');
const KIT = [['melon', 'Black seeds', wt('H3', 'seeds')], ['melon', 'Red all through', wt('H3', 'red')], ['atom', 'Thomson, 1898', wt('H4', 'eighteen')]];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');

/* ---------- P: Thomson ---------- */
$('#mdefI').innerHTML = M.icon('atom', 28, '#fff', 2);
const QR = [['SHAPE', 'A sphere, radius about 10⁻¹⁰ m', wt('P3', 'sphere')], ['POSITIVE CHARGE', 'Spread evenly through the sphere', wt('P3', 'positive')], ['ELECTRONS', 'Sit inside, like seeds', wt('P4', 'Electrons')], ['MASS', 'Spread evenly too', wt('P5', 'mass')]];
$('#qrs').innerHTML = QR.map(([k, q], i) => `<div class="qr" id="qr${i}" style="top:${166 + i * 96}px"><div class="tg">${k}</div><div class="qt">${q}</div></div>`).join('');
const ps = $('#pS'), TX = 392, TY = 250, TR = 150;
const tSph = mk(ps, 'circle', { cx: TX, cy: TY, r: TR, fill: C.ac3, stroke: PC, 'stroke-width': 3 });
const plus = mk(ps, 'g', {}); [[-90, -70], [0, -100], [90, -70], [-110, 10], [-40, -20], [40, -30], [110, 10], [-80, 80], [0, 50], [80, 80], [-20, 110], [40, 120]].forEach(([dx, dy]) => txt(plus, TX + dx, TY + dy + 8, '+', { 'text-anchor': 'middle', 'font-size': 26, fill: PC, 'font-weight': 700, 'font-family': 'Poppins' }));
const eTh = [[-60, -60], [55, -75], [-120, -30], [10, -10], [100, -20], [-60, 40], [60, 30], [-30, 95], [100, 75], [-110, 70]].map(([dx, dy]) => mk(ps, 'circle', { cx: TX + dx, cy: TY + dy, r: 8, fill: EC }));
const neuT = txt(ps, TX, TY + TR + 34, '+ CHARGE = − CHARGE · NEUTRAL', { 'text-anchor': 'middle', 'font-size': 17, ...B });
const radL = mk(ps, 'g', {}); mk(radL, 'line', { x1: TX, y1: TY, x2: TX + TR, y2: TY, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); txt(radL, TX + TR + 12, TY + 6, 'r ~ 10⁻¹⁰ m', { 'font-size': 17, ...B });

/* ---------- S: gold foil bench ---------- */
const b = $('#bS'), FX = 430, FY = 280, RR = 210, V = 280, DC = 8, KQ = V * V * DC / 2;
const ring = mk(b, 'path', { d: (() => { const a0 = (180 + 16) * Math.PI / 180, a1 = (180 - 16 + 360) * Math.PI / 180; return `M${FX + RR * Math.cos(a0)} ${FY + RR * Math.sin(a0)} A${RR} ${RR} 0 1 1 ${FX + RR * Math.cos(a1)} ${FY + RR * Math.sin(a1)}`; })(), stroke: '#BFE3C9', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
const ringL = txt(b, FX + 150, FY + 196, 'ZnS SCREEN', { 'font-size': 16, ...B });
const srcG = mk(b, 'g', {}); mk(srcG, 'rect', { x: 20, y: 252, width: 84, height: 56, rx: 10, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 }); txt(srcG, 62, 285, 'α', { 'text-anchor': 'middle', 'font-size': 24, fill: AC, 'font-weight': 700, 'font-family': 'Poppins' }); txt(srcG, 62, 334, 'α SOURCE', { 'text-anchor': 'middle', 'font-size': 15, fill: AC, 'font-weight': 600 });
const foil = mk(b, 'g', {}); mk(foil, 'rect', { x: FX - 3, y: 130, width: 6, height: 300, rx: 2, fill: '#C9A227' }); txt(foil, FX + 14, 140, 'GOLD FOIL', { 'font-size': 15, fill: '#9A7A12', 'font-weight': 600 });
const pred = mk(b, 'g', {}); [-14, 0, 14].forEach(dy => mk(pred, 'line', { x1: 110, y1: FY + dy, x2: FX + RR - 8, y2: FY + dy, stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '8 8', opacity: 0.6 }));
const nucG = mk(b, 'g', {}); mk(nucG, 'circle', { cx: FX, cy: FY, r: 7, fill: PC }); txt(nucG, FX + 12, FY + 30, 'NUCLEUS', { 'font-size': 15, fill: PC, 'font-weight': 700 });
// alpha launches: each one integrated once (Coulomb repulsion from its nucleus, closest head-on approach DC px)
const path = (y0, bb) => { const ny = y0 - bb, pts = []; let x = 104, y = y0, vx = V, vy = 0; const dt = 1 / 240;
  for (let i = 0; i < 1400; i++) { pts.push([x, y]); const dx = x - FX, dy = y - ny, r2 = dx * dx + dy * dy, r = Math.sqrt(r2), f = KQ / (r2 * r); vx += f * dx * dt; vy += f * dy * dt; x += vx * dt; y += vy * dt;
    const cx = x - FX, cy = y - FY; if (x > 225 && cx * cx + cy * cy > RR * RR) { pts.push([x, y]); return { pts, hit: true }; } if (x < 104) return { pts, hit: false }; }
  return { pts, hit: false }; };
const tFire = T0('S4') - 1.05, tFew = wt('S4', 'few') + 0.1, tStop = OUT('B1');
const LARGE = [150, -95, 120, -140, 70, -120, 105, -65], SMALL = [15, -21, 18];
const LAU = []; let ks = 0, kl = 0;
for (let k = 0, tl = tFire; tl < tStop - 2.4; k++, tl += 0.3) { const late = tl + 1.16 > tFew; let bb = late && k % 5 === 2 ? SMALL[ks++ % 3] : LARGE[kl++ % 8]; LAU.push({ t: tl, bb, y0: FY + 14 * Math.sin(k * 2.3) + (Math.abs(bb) < 30 ? 0 : 0), slot: LAU.length % 16 }); }
[wt('S5', 'bounced'), wt('L3', 'bounce')].forEach((ta, i) => LAU.push({ t: ta - 1.16, bb: 1.0, y0: FY + 1.0, slot: 16 + i }));
LAU.forEach(L => { const p = path(L.y0, L.bb); L.pts = p.pts; L.hit = p.hit; const [x, y] = p.pts[p.pts.length - 1]; L.hx = x; L.hy = y; L.th = Math.abs(Math.atan2(y - L.y0 + (L.y0 - FY), x - FX)) * 180 / Math.PI; L.tHit = L.t + (p.pts.length - 1) / 240;
  const d = Math.atan2(p.pts[p.pts.length - 1][1] - p.pts[p.pts.length - 30][1], p.pts[p.pts.length - 1][0] - p.pts[p.pts.length - 30][0]) * 180 / Math.PI; L.dev = Math.abs(d); });
const ticks = LAU.map(L => mk(b, 'circle', { cx: L.hx.toFixed(1), cy: L.hy.toFixed(1), r: 4, fill: AC }));
const flashes = LAU.map(L => mk(b, 'circle', { cx: L.hx.toFixed(1), cy: L.hy.toFixed(1), r: 16, fill: '#7FD39A' }));
const trails = Array.from({ length: 18 }, () => mk(b, 'polyline', { fill: 'none', stroke: AC, 'stroke-width': 3, opacity: 0.35, 'stroke-linecap': 'round' }));
const dots = Array.from({ length: 18 }, () => mk(b, 'circle', { r: 7, fill: AC }));
{ const host = $('#bn'); [['ct0', 'STRAIGHT'], ['ct1', 'SMALL ANGLE'], ['ct2', 'BOUNCED BACK']].forEach(([id, s], i) => host.insertAdjacentHTML('beforeend', `<div class="btag" id="${id}" style="left:${36 + i * 230}px;top:506px;background:var(--soft);color:var(--ink)"><span>${s}</span><b id="${id}v" style="color:${AC}">0</b></div>`)); }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const LK = [['Most pass straight through', 'EMPTY SPACE', wt('L1', 'Most')], ['A few bend away', '+ IN ONE TINY SPOT', wt('L2', 'few')], ['A very few bounce back', 'MASS THERE TOO', wt('L3', 'very')], ['Nucleus ~10⁻¹⁵ m, atom ~10⁻¹⁰ m', 'BALL IN 5 km', wt('L4', 'nucleus')]];
$('#lks').innerHTML = LK.map(([l, r], i) => `<div class="lk" id="lk${i}" style="top:${78 + i * 98}px"><div class="tg">LINK ${i + 1}</div><div class="lt">${l}</div><div class="lr">${r}</div></div>`).join('');
const CMP = [['Thomson', 'MODEL · 1898', [['POSITIVE CHARGE', 'Spread through the atom'], ['MASS', 'Spread evenly'], ['SIZE OF THE + PART', 'The whole atom, ~10⁻¹⁰ m'], ['PICTURE', 'Seeds in a watermelon']]], ['Rutherford', 'MODEL · 1911', [['POSITIVE CHARGE', 'Packed in a tiny nucleus'], ['MASS', 'Almost all in the nucleus'], ['SIZE OF THE + PART', 'Nucleus, ~10⁻¹⁵ m'], ['PICTURE', 'Planets around the sun']]]];
$('#cmps').innerHTML = CMP.map(([h, y, rows], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ch" style="color:${i ? PC : C.ink}">${h}</div><div class="cy">${y}</div>${rows.map(([k, v], j) => `<div class="cr2" id="cr${i}_${j}" style="top:${108 + j * 86}px"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`).join('');
const tCm = [wt('B1', 'Thomson'), wt('B1', 'Rutherford')];
const th1 = PUC.think($('#th1'), { q: 'Which result alone proves that Thomson\'s picture was wrong?', opts: ['A few bounce back', 'Most pass straight through'], right: 0, why: 'Spread out charge is far too weak to turn them back. Only a tiny, heavy nucleus can.' });

/* ---------- R: the problem ---------- */
const RL = [['Electron moves in a circle', 'CHANGES DIRECTION', wt('R1', 'circling')], ['Changing direction means', 'ACCELERATING', wt('R1', 'accelerating')], ['Accelerating charge radiates', 'LOSES ENERGY', wt('R2', 'radiates')], ['Spirals into the nucleus', 'IN ~10⁻⁸ s', wt('R2', 'spiral')]];
$('#rls').innerHTML = RL.map(([l, r], i) => `<div class="lk" id="rk${i}" style="top:${78 + i * 98}px"><div class="tg">LINK ${i + 1}</div><div class="lt">${l}</div><div class="lr">${r}</div></div>`).join('') + `<div class="lkC" id="rkC" style="background:var(--red)">But atoms are stable: the model fails</div>`;
const rs = $('#rS'), RX = 392, RY = 250, R0 = 150;
const rOrb = mk(rs, 'circle', { cx: RX, cy: RY, r: R0, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const rNuc = mk(rs, 'g', {}); mk(rNuc, 'circle', { cx: RX, cy: RY, r: 18, fill: PC }); txt(rNuc, RX, RY + 8, '+', { 'text-anchor': 'middle', 'font-size': 24, fill: '#fff', 'font-weight': 700, 'font-family': 'Poppins' });
const sTrail = mk(rs, 'polyline', { fill: 'none', stroke: EC, 'stroke-width': 3, opacity: 0.45, 'stroke-linecap': 'round' });
const waves = [0, 1, 2].map(i => mk(rs, 'path', { fill: 'none', stroke: GC, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const rEl = mk(rs, 'circle', { r: 11, fill: EC });
const vA = PUC.arrow(rs, C.ink, 5, 14), aA = PUC.arrow(rs, C.red, 5, 14);
const vL = txt(rs, 0, 0, 'v', { 'font-size': 22, fill: C.ink, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic' }), aL = txt(rs, 0, 0, 'a', { 'font-size': 22, fill: C.red, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic' });
{ const host = $('#rr'); host.insertAdjacentHTML('beforeend', `<div class="btag" id="rch" style="left:36px;top:420px;background:var(--redBg);color:var(--red)">TIME TO COLLAPSE ≈ 10⁻⁸ s</div>`); }
const avA = PUC.avatar($('#rr'), { x: 36, y: 468, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'But my atoms are fine. Who fixed it?' });
const W0 = 2.0, tSp = wt('R2', 'spiral') - 0.1, TSP = 2.4;
const rAng = t => t < tSp ? W0 * (t - tR1) : W0 * (tSp - tR1) + W0 * TSP * 2 * (1 - Math.sqrt(1 - M.clamp((t - tSp) / TSP, 0, 0.999)));
const rRad = t => t < tSp ? R0 : R0 * Math.cbrt(Math.max(0, 1 - (t - tSp) / TSP));

/* ---------- D: Bohr ---------- */
const dsol = PUC.solution($('#dl'), [
  ['<span style="font:600 28px Poppins">Fixed circular orbits, called stationary states</span>'],
  [K(`E_n = -2.18 \\times 10^{-18} \\left(\\frac{1}{n^2}\\right) \\text{J}`)],
  [K(`\\Delta E = E_{\\text{high}} - E_{\\text{low}} = ${G_('h\\nu')}`)],
  [K(`${E_('m_e')} v r = \\frac{nh}{2\\pi} \\;\\Rightarrow\\; r_n = 52.9\\, n^2\\, \\text{pm}`)]], { label: 'BOHR\'S RULES · 1913', y0: 110, dy: 112 });
const tDs = [wt('D2', 'fixed'), wt('D3', 'E'), wt('D4', 'jump'), wt('D5', 'Only')];
const ds = $('#dS'), AX = 220, AY = 300, ORB = [55, 105, 155];
const dOrb = ORB.map((r, i) => mk(ds, 'circle', { cx: AX, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2.5 }));
const dOl = ORB.map((r, i) => txt(ds, AX + r * 0.71 + 6, AY - r * 0.71 - 6, `n = ${i + 1}`, { 'font-size': 16, ...B }));
const dNuc = mk(ds, 'circle', { cx: AX, cy: AY, r: 14, fill: PC });
const ns = txt(ds, 36, 548, 'NOT TO SCALE', { 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const LX0 = 520, LX1 = 640, LY = e => 110 + Math.abs(e) / 2.18 * 370;
const LV = [[1, -2.18], [2, -0.545], [3, -0.242]];
const lad = mk(ds, 'g', {}); txt(lad, 470, 84, 'E (10⁻¹⁸ J)', { 'font-size': 16, ...B });
mk(lad, 'line', { x1: LX0, y1: LY(0), x2: LX1, y2: LY(0), stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); txt(lad, 470, LY(0) + 6, 'n = ∞', { 'font-size': 15, fill: C.mute }); txt(lad, 652, LY(0) + 6, '0', { 'font-size': 16, ...B });
LV.forEach(([n, e]) => { mk(lad, 'line', { x1: LX0, y1: LY(e), x2: LX1, y2: LY(e), stroke: C.ink, 'stroke-width': 3 }); txt(lad, 470, LY(e) + 6, `n = ${n}`, { 'font-size': 15, fill: C.mute }); txt(lad, 652, LY(e) + 6, String(e).replace('-', '−'), { 'font-size': 16, ...B }); });
const ladDot = mk(ds, 'circle', { r: 9, fill: EC });
const gapA = PUC.arrow(ds, GC, 4, 12), gapL = txt(ds, 600, (LY(-2.18) + LY(-0.545)) / 2, 'ΔE = hν', { 'font-size': 18, fill: GC, 'font-weight': 700 });
const dEl = mk(ds, 'circle', { r: 10, fill: EC });
const phIn = mk(ds, 'path', { fill: 'none', stroke: GC, 'stroke-width': 3.5, 'stroke-linecap': 'round' }), phOut = mk(ds, 'path', { fill: 'none', stroke: GC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const wavy = (x1, y1, x2, y2, amp = 9, wl = 26) => { const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L; let d = `M${x1} ${y1}`; for (let s = 2; s <= L; s += 2) { const a = amp * Math.sin(s / wl * 2 * Math.PI) * Math.min(1, (L - s) / 30); d += ` L${(x1 + ux * s - uy * a).toFixed(1)} ${(y1 + uy * s + ux * a).toFixed(1)}`; } return d; };
const dTag = document.createElement('div'); dTag.className = 'btag'; dTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; dTag.textContent = 'NIELS BOHR · 1913 · NOBEL 1922'; $('#dr').appendChild(dTag);
const W1d = 1.4, tUp = wt('D4', 'takes') - 0.3, tDn = wt('D4', 'gives') - 0.1;
const dAng = t => W1d * (t - tD1);
const aUp = dAng(tUp + 0.55), aDn = dAng(tDn);
attr(phIn, 'd', wavy(30, 120, AX + ORB[0] * Math.cos(aUp) - 12 * Math.cos(aUp), AY + ORB[0] * Math.sin(aUp)));
attr(phOut, 'd', wavy(AX + ORB[1] * Math.cos(aDn), AY + ORB[1] * Math.sin(aDn), AX + ORB[1] * Math.cos(aDn) + 200 * Math.cos(aDn), AY + ORB[1] * Math.sin(aDn) + 200 * Math.sin(aDn)));
const r1L = txt(ds, AX, AY + ORB[0] + 26, 'r₁ = 52.9 pm', { 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`E_n = -2.18 \\times 10^{-18}\\, \\frac{1}{n^2}\\;\\text{J}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`E_1 = -2.18 \\times 10^{-18}\\,\\text{J}`)], [K(`E_2 = \\frac{-2.18 \\times 10^{-18}}{2^2} = -0.545 \\times 10^{-18}\\,\\text{J}`)],
  [K(`${G_('\\Delta E')} = E_2 - E_1 = ${G_('1.635 \\times 10^{-18}\\,\\text{J}')}`)], [K(`r_2 = 52.9 \\times 2^2 = 211.6\\,\\text{pm}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), wt('W4', 'Divide'), wt('W5', 'gap'), wt('W6', 'fifty')];
const w2 = $('#wS2'), WX = 230, WY = 300;
const wO1 = mk(w2, 'circle', { cx: WX, cy: WY, r: 40, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }), wO2 = mk(w2, 'circle', { cx: WX, cy: WY, r: 160, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
mk(w2, 'circle', { cx: WX, cy: WY, r: 8, fill: PC });
const wl1 = txt(w2, WX, WY + 66, 'r₁ = 52.9 pm', { 'text-anchor': 'middle', 'font-size': 16, ...B }), wl2 = txt(w2, WX, WY - 172, 'r₂ = 211.6 pm = 4 r₁', { 'text-anchor': 'middle', 'font-size': 16, ...B });
const wEl = mk(w2, 'circle', { r: 10, fill: EC });
const WL = e => 130 + Math.abs(e) / 2.18 * 340;
const wLad = mk(w2, 'g', {}); txt(wLad, 470, 104, 'E (10⁻¹⁸ J)', { 'font-size': 16, ...B });
[[1, -2.18], [2, -0.545]].forEach(([n, e]) => { mk(wLad, 'line', { x1: 520, y1: WL(e), x2: 640, y2: WL(e), stroke: C.ink, 'stroke-width': 3 }); txt(wLad, 470, WL(e) + 6, `n = ${n}`, { 'font-size': 15, fill: C.mute }); txt(wLad, 652, WL(e) + 6, String(e).replace('-', '−'), { 'font-size': 16, ...B }); });
const wGap = PUC.arrow(w2, GC, 4, 12), wGapL = txt(w2, 590, (WL(-2.18) + WL(-0.545)) / 2, '+1.635', { 'font-size': 18, fill: GC, 'font-weight': 700 });
const wLd = mk(w2, 'circle', { r: 9, fill: EC });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Orbit 1 has more energy, because 2.18 is bigger than 0.545', right: `${K('-2.18 \\times 10^{-18} < -0.545 \\times 10^{-18}')}: orbit 1 is lowest, most stable` });
const tsv = $('#tS'), NY = e => 34 + Math.abs(e) / 2.18 * 190;
const nl = mk(tsv, 'g', {}); mk(nl, 'line', { x1: 260, y1: 24, x2: 260, y2: 236, stroke: C.ink, 'stroke-width': 3 });
[[0, '0', C.mute], [-0.545, 'n = 2 · −0.545', C.ink], [-2.18, 'n = 1 · −2.18 · LOWEST', C.ok]].forEach(([e, s, c]) => { mk(nl, 'line', { x1: 248, y1: NY(e), x2: 272, y2: NY(e), stroke: C.ink, 'stroke-width': 3 }); txt(nl, 286, NY(e) + 6, s, { 'font-size': 16, fill: c, 'font-weight': 600 }); });
txt(nl, 236, 130, 'HIGHER ↑', { 'text-anchor': 'end', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Statements on Rutherford\'s observations · numericals on Bohr energy and radius' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A hydrogen electron has energy −2.42 × 10⁻¹⁹ J. What is the radius of its orbit?<br><span style="font:500 24px 'IBM Plex Mono';color:var(--mute)">Given: Eₙ = −2.18 × 10⁻¹⁸/n² J, rₙ = 52.9 n² pm</span>`, qW: 700,
  opts: ['158.7 pm', '476.1 pm', '211.6 pm', '52.9 pm'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`n^2 = \\frac{2.18 \\times 10^{-18}}{2.42 \\times 10^{-19}} = 9`)], [K(`n = 3`)], [K(`r_3 = 52.9 \\times 3^2`)], [K(`= \\textcolor{${C.ok}}{476.1\\,\\text{pm}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 520, title: 'Recap · three models of the atom', y0: 98, dy: 86, txt: [0, 1, 1, 1, 1],
  lines: [K(`E_n = -2.18 \\times 10^{-18} \\tfrac{1}{n^2}\\,\\text{J} \\qquad r_n = 52.9\\,n^2\\,\\text{pm}`), '<b>Thomson, 1898</b>: + sphere, electrons inside like watermelon seeds', '<b class="v">Rutherford, 1911</b>: α on gold foil, about 1 in 20,000 back · tiny + nucleus', '<b class="e">The problem</b>: a circling electron accelerates, radiates, spirals in (~10⁻⁸ s)', '<b class="n">Bohr, 1913</b>: fixed orbits · a jump takes or gives ΔE = hν · mvr = nh/2π'] });
const YQ = ['Why did Thomson\'s model fail the gold foil test?', 'Why should Rutherford\'s atom collapse?', 'Which orbit of hydrogen has the lowest energy, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 16', topic: 'Why only a few sharp colours? Atomic Spectra and Hydrogen Spectrum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  let cx = 36; ['ct0', 'ct1', 'ct2'].forEach(id => { const e = $('#' + id); e.style.left = cx + 'px'; cx += e.offsetWidth + 12; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  { const d = $('#sF .next'), nt = d && d.querySelector('.nt'); if (nt) { nt.style.flex = 'none'; const over = d.scrollWidth - d.clientWidth + 8; if (over > 0) nt.style.fontSize = Math.floor(34 * (nt.offsetWidth - over) / nt.offsetWidth) + 'px'; } }
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.lk .lt').forEach(l => { const r = l.parentNode.querySelector('.lr'); const room = 712 - 20 - 24 - r.offsetWidth - 20; if (l.offsetWidth > room) l.style.fontSize = Math.floor(27 * room / l.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const rowsHi = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - (i < ts.length - 1 ? ts[i + 1] : tEnd) + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'Each') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'best') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((k, i) => { const el = $('#wq' + i); M.vis(el, t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, i === 2 ? M.io((t - k[2]) / 0.3) : 0)); });
    M.vis($('#hTz'), t, wt('H5', 'broke') - 0.15, 1e9, POP);
  }

  /* P: Thomson */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'picture') - 0.1, 1e9, POP);
    rowsHi(QR.map((_, i) => '#qr' + i), QR.map(q => q[2]), wt('P5', 'tested'), t);
    M.vis($('#pw'), t, T0('P2') + 0.4, out, { dx: 60, dy: 0, ...o });
    fade(tSph, t, wt('P3', 'sphere') - 0.1); fade(radL, t, wt('P3', 'radius')); fade(plus, t, wt('P3', 'positive'), 1e9, 0.4);
    eTh.forEach((e, i) => fade(e, t, wt('P4', 'Electrons') + i * 0.07, 1e9, 0.15)); fade(neuT, t, wt('P4', 'neutral') - 0.1);
    attr(tSph, 'fill', mix(C.ac3, C.ac2, M.io((t - wt('P5', 'mass')) / 0.4)));
    M.vis($('#tsc'), t, T0('P2') + 0.8, 1e9, { dy: 16 });
  }

  /* S + L + B: gold foil */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const zB = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, zB, { dy: 36, ...o });
    { const sh = M.spring(t - tL1 + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#lk'), t, tL1 + 0.1, zB, { dx: 60, dy: 0, ...o });
    fade(srcG, t, wt('S1', 'alpha') - 0.2); fade(foil, t, wt('S1', 'gold') - 0.2); fade(ring, t, wt('S2', 'zinc') - 0.2); fade(ringL, t, wt('S2', 'screen'));
    fade(pred, t, wt('S3', 'straight') - 0.4, T0('S4') + 0.2); fade(nucG, t, wt('L3', 'nucleus') - 0.1);
    const used = new Set();
    LAU.forEach((L, k) => {
      const age = t - L.t, idx = Math.round(age * 240);
      fade(ticks[k], t, L.tHit, 1e9, 0.15, L.hit ? 1 : 0); fade(flashes[k], t, L.tHit - 0.02, L.tHit + 0.35, 0.12, L.hit ? 0.9 : 0);
      if (age < 0 || idx >= L.pts.length) return;
      used.add(L.slot); const d = dots[L.slot], tr = trails[L.slot], [x, y] = L.pts[idx];
      M.hide(d, false); attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1));
      const i0 = Math.max(0, idx - 70); let s = ''; for (let i = i0; i <= idx; i += 5) s += L.pts[i][0].toFixed(1) + ',' + L.pts[i][1].toFixed(1) + ' '; attr(tr, 'points', s); M.hide(tr, false);
    });
    dots.forEach((d, i) => { if (!used.has(i)) M.hide(d, true); }); trails.forEach((d, i) => { if (!used.has(i)) M.hide(d, true); });
    let n0 = 0, n1 = 0, n2 = 0; LAU.forEach(L => { if (L.hit && t >= L.tHit) { if (L.dev < 10) n0++; else if (L.dev < 90) n1++; else n2++; } });
    M.setT($('#ct0v'), String(n0)); M.setT($('#ct1v'), String(n1)); M.setT($('#ct2v'), String(n2));
    ['ct0', 'ct1', 'ct2'].forEach((id, i) => { M.vis($('#' + id), t, [T0('S4'), wt('S4', 'few'), wt('S5', 'bounced')][i] - 0.1, 1e9, POP); });
    setBg($('#ct2'), mix(C.soft, C.ac2, M.io((t - wt('S5', 'bounced') - 0.2) / 0.3) * (1 - M.io((t - tL1) / 0.3))));
    const TAG = [[wt('S1', 'alpha'), 'α PARTICLES → GOLD FOIL'], [wt('S2', 'positive'), 'α = He²⁺ · CHARGE +2'], [wt('S3', 'Thomson'), 'THOMSON PREDICTS: STRAIGHT'], [T0('S4'), 'MOST GO STRAIGHT'], [wt('S4', 'few'), 'A FEW BEND'], [wt('S5', 'twenty'), '~1 IN 20,000 COMES BACK'], [wt('L3', 'nucleus'), 'THE NUCLEUS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    rowsHi(LK.map((_, i) => '#lk' + i), LK.map(r => r[2]), wt('L5', 'tiny'), t);
    M.vis($('#lkC'), t, wt('L5', 'tiny') - 0.1, 1e9, POP);
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B2'), { dy: 36, ...o });
    CMP.forEach((c, i) => { M.vis($('#cm' + i), t, tCm[i] - 0.15, 1e9, { dy: 16 }); c[2].forEach((_, j) => M.vis($(`#cr${i}_${j}`), t, tCm[i] + 0.15 + j * 0.3, 1e9, { dx: -12, dy: 0 })); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'proves') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Spread') });
  }

  /* R: the problem */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    rowsHi(RL.map((_, i) => '#rk' + i), RL.map(r => r[2]), wt('R3', 'stable'), t);
    M.vis($('#rkC'), t, wt('R3', 'stable') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.15, out, { dx: 60, dy: 0, ...o });
    const a = rAng(t), r = rRad(t), ex = RX + r * Math.cos(a), ey = RY + r * Math.sin(a);
    attr(rEl, 'cx', ex.toFixed(1)); attr(rEl, 'cy', ey.toFixed(1)); M.hide(rEl, r < 12);
    fade(rOrb, t, tR1 + 0.2, tSp + 0.4);
    const ar = M.io((t - wt('R1', 'accelerating') + 0.1) / 0.3) * (1 - M.io((t - tSp) / 0.3)), vr = M.io((t - wt('R1', 'direction') + 0.1) / 0.3) * (1 - M.io((t - tSp) / 0.3));
    const tx = -Math.sin(a), ty = Math.cos(a);
    vA.set(ex, ey, ex + tx * 90 * vr, ey + ty * 90 * vr); aA.set(ex, ey, ex - Math.cos(a) * 70 * ar, ey - Math.sin(a) * 70 * ar);
    attr(vL, 'x', (ex + tx * 100).toFixed(1)); attr(vL, 'y', (ey + ty * 100 + 8).toFixed(1)); vL.style.opacity = vr; attr(aL, 'x', (ex - Math.cos(a) * 92 - 6).toFixed(1)); attr(aL, 'y', (ey - Math.sin(a) * 92 + 8).toFixed(1)); aL.style.opacity = ar;
    if (t > tSp) { let s = ''; for (let tt = tSp; tt <= Math.min(t, tSp + TSP); tt += 0.02) { const aa = rAng(tt), rr = rRad(tt); s += (RX + rr * Math.cos(aa)).toFixed(1) + ',' + (RY + rr * Math.sin(aa)).toFixed(1) + ' '; } attr(sTrail, 'points', s); M.hide(sTrail, false); } else M.hide(sTrail, true);
    waves.forEach((w, i) => { const tw = wt('R2', 'radiates') + i * 0.35, aa = rAng(tw), rr = rRad(tw), x0 = RX + (rr + 18) * Math.cos(aa), y0 = RY + (rr + 18) * Math.sin(aa); if (!w._d) { w._d = 1; attr(w, 'd', wavy(x0, y0, x0 + 90 * Math.cos(aa), y0 + 90 * Math.sin(aa), 7, 20)); } M.draw(w, t, tw, 0.5); w.style.opacity = 1 - M.io((t - tw - 1.6) / 0.5); });
    M.vis($('#rch'), t, wt('R2', 'hundred') - 0.1, 1e9, POP);
    avA(t, wt('R3', 'stable') + 0.2, 1e9);
  }

  /* D: Bohr */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(dTag, t, wt('D1', 'Niels') - 0.1, 1e9, POP);
    fade(dNuc, t, tD1 + 0.4); dOrb.forEach((c, i) => M.draw(c, t, wt('D2', 'orbits') - 0.2 + i * 0.2, 0.6)); dOl.forEach((l, i) => fade(l, t, wt('D2', 'orbits') + i * 0.2)); fade(ns, t, wt('D2', 'stationary'));
    fade(lad, t, wt('D3', 'energy') - 0.1);
    // electron level: 1 -> 2 on the photon in, 2 -> 1 on the photon out
    const up = M.io((t - tUp - 0.55) / 0.5) * (1 - M.io((t - tDn) / 0.5));
    const a = dAng(t), r = M.lerp(ORB[0], ORB[1], up);
    attr(dEl, 'cx', (AX + r * Math.cos(a)).toFixed(1)); attr(dEl, 'cy', (AY + r * Math.sin(a)).toFixed(1)); fade(dEl, t, wt('D2', 'electron') - 0.1);
    attr(ladDot, 'cx', 580); attr(ladDot, 'cy', M.lerp(LY(-2.18), LY(-0.545), up).toFixed(1)); fade(ladDot, t, wt('D3', 'energy') + 0.2);
    M.drawU(phIn, M.io((t - tUp) / 0.55)); phIn.style.opacity = 1 - M.io((t - tUp - 0.8) / 0.4);
    M.drawU(phOut, M.io((t - tDn - 0.1) / 0.55)); phOut.style.opacity = 1 - M.io((t - tDn - 1.4) / 0.4);
    const ga = M.io((t - wt('D4', 'gap') + 0.1) / 0.4); gapA.set(560, LY(-2.18) - 4, 560, M.lerp(LY(-2.18) - 4, LY(-0.545) + 6, ga)); gapL.style.opacity = ga; attr(gapL, 'x', 572);
    fade(r1L, t, wt('D5', 'fifty') - 0.1);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'In') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'fixed') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'staircase') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const up = M.io((t - wt('W5', 'gap')) / 0.6), a = 1.1 * (t - tW1);
    attr(wEl, 'cx', (WX + M.lerp(40, 160, up) * Math.cos(a)).toFixed(1)); attr(wEl, 'cy', (WY + M.lerp(40, 160, up) * Math.sin(a)).toFixed(1));
    fade(wO2, t, T0('W2') + 0.5); fade(wl1, t, T0('W3')); fade(wl2, t, wt('W6', 'two') - 0.1);
    fade(wLad, t, T0('W3') + 0.2); attr(wLd, 'cx', 580); attr(wLd, 'cy', M.lerp(WL(-2.18), WL(-0.545), up).toFixed(1));
    const ga = M.io((t - wt('W5', 'gap') + 0.1) / 0.4); wGap.set(560, WL(-2.18) - 4, 560, M.lerp(WL(-2.18) - 4, WL(-0.545) + 6, ga)); wGapL.style.opacity = ga;
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'compare') - 0.1, tStrike: wt('X3', 'Watch') - 0.1, tRight: wt('X3', 'lower') - 0.1 });
    fade(nl, t, wt('X3', 'minus') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
