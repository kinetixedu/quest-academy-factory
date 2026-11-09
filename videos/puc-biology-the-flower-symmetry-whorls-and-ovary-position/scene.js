// PUC Biology Ep 44: The Flower: Symmetry, Whorls and Ovary Position (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon: outline brown, leaf, chlorophyll green, water sky, sugar/food gold
const BR = '#2E2A24', LEAF = '#8CC48F', VEIN = '#D8ECD2', GRN = C.ac, WAT = '#5AA0C8', GOLD = '#C9962B';
const STEM = '#4E7A34', ROOT = '#B08A5A', ROOTL = '#E3D3A0', SOIL = '#E9DFC9', SOILD = '#CDBF9E', PET = '#F2B8C6', PETD = '#D9708C', YEL = '#F2D06B', WOOD = '#9A6B3E';
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const G = (p, x, y, s = 1, r = 0) => mk(p, 'g', { transform: `translate(${x} ${y}) rotate(${r}) scale(${s})` });
const tag = (p, x, y, s, col = C.mute, fs = 15) => txt(p, x, y, s, { 'text-anchor': 'middle', 'font-size': fs, 'letter-spacing': 1.4, fill: col, 'font-weight': 600 });
const grp = p => mk(p, 'g', {});
/* --- drawing kit (vintage cartoon, Ep 1 palette) --- */
// leaf from base (0,0) pointing along +x, length L; o: w, fill, ven ('net'|'par'|'pin'|none), sw
const leaf = (p, x, y, L, ang = 0, o = {}) => { const Q = G(p, x, y, 1, ang), w = L * (o.w || 0.4), sw = o.sw || 2.5;
  mk(Q, 'path', { d: `M0,0 C${L * 0.22},${-w} ${L * 0.72},${-w * 0.95} ${L},0 C${L * 0.72},${w * 0.95} ${L * 0.22},${w} 0,0 Z`, fill: o.fill || LEAF, stroke: BR, 'stroke-width': sw, 'stroke-linejoin': 'round' });
  const vc = o.vc || VEIN;
  if (o.ven === 'par') { for (let k = -2; k <= 2; k++) mk(Q, 'path', { d: `M${L * 0.04},0 Q${L * 0.5},${k * w * 0.32} ${L * 0.96},0`, stroke: vc, 'stroke-width': sw * 0.7, fill: 'none' }); }
  else if (o.ven !== 'none') { mk(Q, 'path', { d: `M2,0 L${L * 0.95},0`, stroke: vc, 'stroke-width': sw * 0.9 });
    if (o.ven === 'net' || o.ven === 'pin') for (let k = 1; k <= 4; k++) { const xx = L * k * 0.18; const hh = w * Math.sin(Math.PI * (xx + L * 0.12) / L) * 0.8; [-1, 1].forEach(sd => mk(Q, 'path', { d: `M${xx},0 Q${xx + L * 0.06},${sd * hh * 0.6} ${xx + L * 0.12},${sd * hh}`, stroke: vc, 'stroke-width': sw * 0.6, fill: 'none' })); } }
  return W(Q); };
// flower seen from the front: n petals, radius r
const bloom = (p, x, y, r = 30, n = 5, col = PET, core = YEL) => { const Q = G(p, x, y);
  for (let k = 0; k < n; k++) mk(Q, 'ellipse', { cx: 0, cy: -r * 0.55, rx: r * 0.36, ry: r * 0.58, fill: col, stroke: BR, 'stroke-width': 2, transform: `rotate(${k * 360 / n})` });
  mk(Q, 'circle', { cx: 0, cy: 0, r: r * 0.26, fill: core, stroke: BR, 'stroke-width': 2 }); return W(Q); };
const bud = (p, x, y, s = 1, col = '#9CCB8A') => { const Q = G(p, x, y, s); mk(Q, 'path', { d: 'M0,10 C-9,4 -8,-10 0,-16 C8,-10 9,4 0,10 Z', fill: col, stroke: BR, 'stroke-width': 2 }); return W(Q); };
const soil = (p, y, x0 = 0, x1 = 1056, h = 600) => { const g = grp(p); mk(g, 'rect', { x: x0, y, width: x1 - x0, height: h, fill: SOIL }); mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: SOILD, 'stroke-width': 4 });
  for (let k = 0; k < (x1 - x0) / 70; k++) mk(g, 'circle', { cx: x0 + 30 + k * 70 + (k % 3) * 9, cy: y + 34 + (k % 4) * 40, r: 3 + (k % 2), fill: SOILD }); return g; };
const flowPath = (p, d, col = '#FFFFFF', w = 3) => mk(p, 'path', { d, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-dasharray': '5 9', 'stroke-linecap': 'round' });
const flowRun = (e, t, sp = 20) => { e.style.strokeDashoffset = (-(t * sp) % 14).toFixed(1); };
const drop = (g, x, y, s = 1, col = WAT) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M0,-20 C10,-6 16,2 16,10 A16,16 0 0 1 -16,10 C-16,2 -10,-6 0,-20 Z', fill: '#D6E9F5', stroke: col, 'stroke-width': 3 }); return W(Q); };

/* ================= Ep 44 content: the flower ================= */
// whorl colours (kept the same in every diagram): sepal leaf green, petal pink, stamen yellow, carpel lavender, thalamus tan
const SEP = LEAF, STA = '#F2D06B', FIL = '#C9A46A', CAR = '#D7B8E6', CARD = '#8E5FA8', THA = '#D9B97A', ROSE = '#E2574C', CAN = '#E8743C';
const lerp = (a, b, k) => a + (b - a) * k;
// longitudinal section; m: 0 hypogynous, 1 perigynous, 2 epigynous. Local origin = ovary centre.
const flowerLS = (p, x, y, s = 1) => { const Q = G(p, x, y, s), KF = [[90, 75, 60, 62], [130, -10, 112, 80], [74, -62, 50, 62]];
  mk(Q, 'path', { d: 'M0,200 L0,112', stroke: STEM, 'stroke-width': 9, 'stroke-linecap': 'round' });
  const th = mk(Q, 'path', { fill: THA, stroke: BR, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const ov = mk(Q, 'ellipse', { cx: 0, cy: 0, rx: 50, ry: 60, fill: CAR, stroke: BR, 'stroke-width': 3 });
  [-22, 0, 22].forEach(oy => mk(Q, 'circle', { cx: 0, cy: oy, r: 8, fill: '#FFF6E0', stroke: CARD, 'stroke-width': 2 }));
  mk(Q, 'path', { d: 'M0,-60 L0,-150', stroke: CARD, 'stroke-width': 6 }); mk(Q, 'ellipse', { cx: 0, cy: -156, rx: 16, ry: 9, fill: CAR, stroke: BR, 'stroke-width': 2.5 });
  const P = [-1, 1].map(() => ({ se: mk(Q, 'path', { fill: SEP, stroke: BR, 'stroke-width': 2.5 }), pe: mk(Q, 'path', { fill: PET, stroke: BR, 'stroke-width': 2.5 }), fi: mk(Q, 'path', { stroke: FIL, 'stroke-width': 4, fill: 'none' }), an: mk(Q, 'ellipse', { rx: 9, ry: 15, fill: STA, stroke: BR, 'stroke-width': 2 }) }));
  const lvl = mk(Q, 'line', { stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '8 8' }), R = { ov, lvl }; R.Q = W(Q);
  R.set = m => { const i0 = Math.min(1, Math.floor(m)), k = M.io(M.clamp(m - i0)), A = KF[i0], B = KF[i0 + 1], [a, yr, ii, yi] = A.map((v, j) => lerp(v, B[j], k));
    const c = (yi - 0.25 * yr) / 0.75, cy = yr + (115 - yr) * 0.6; R.yr = yr;
    th.setAttribute('d', `M${-a},${yr} C${-a},${cy} -44,115 0,118 C44,115 ${a},${cy} ${a},${yr} L${ii},${yr} C${ii},${c} ${-ii},${c} ${-ii},${yr} Z`);
    P.forEach((q, j) => { const sd = j ? 1 : -1, X = v => sd * v;
      q.se.setAttribute('d', `M${X(a)},${yr} Q${X(a + 56)},${yr - 6} ${X(a + 92)},${yr - 64} Q${X(a + 30)},${yr - 52} ${X(a)},${yr} Z`);
      q.pe.setAttribute('d', `M${X(a - 4)},${yr} C${X(a + 46)},${yr - 40} ${X(a + 76)},${yr - 120} ${X(a + 36)},${yr - 168} C${X(a + 4)},${yr - 146} ${X(a - 12)},${yr - 64} ${X(a - 4)},${yr} Z`);
      q.fi.setAttribute('d', `M${X(a - 16)},${yr} Q${X(a - 26)},${yr - 60} ${X(a - 30)},${yr - 104}`); q.an.setAttribute('cx', X(a - 30)); q.an.setAttribute('cy', yr - 116); });
    lvl.setAttribute('x1', -260); lvl.setAttribute('x2', -a - 20); lvl.setAttribute('y1', yr); lvl.setAttribute('y2', yr); };
  R.set(0); return R; };
const cutLine = (g, x, y, L, col = C.ac) => { const q = G(g, x, y); mk(q, 'line', { x1: 0, y1: -L / 2, x2: 0, y2: L / 2, stroke: col, 'stroke-width': 5, 'stroke-dasharray': '14 10', 'stroke-linecap': 'round' }); const o = W(q); o.q = q; return o; };
const zygo = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  [-1, 1].forEach(sd => mk(Q, 'ellipse', { cx: sd * 92, cy: 70, rx: 66, ry: 92, fill: '#E89BB0', stroke: BR, 'stroke-width': 3, transform: `rotate(${sd * 22} ${sd * 92} 70)` }));
  mk(Q, 'path', { d: 'M-150,-20 C-170,-170 170,-170 150,-20 C110,30 -110,30 -150,-20 Z', fill: PET, stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M-46,60 C-40,150 40,150 46,60 C20,40 -20,40 -46,60 Z', fill: '#F6D2DC', stroke: BR, 'stroke-width': 3 });
  mk(Q, 'path', { d: 'M0,-120 L0,0 M-50,-90 Q0,-40 50,-90', stroke: PETD, 'stroke-width': 2.5, fill: 'none' }); return W(Q); };
const canna = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  [['M0,0 C-40,-60 -30,-170 10,-190 C40,-150 30,-60 0,0 Z', 0], ['M0,0 C60,-40 150,-60 170,-20 C120,20 50,20 0,0 Z', 0], ['M0,0 C-70,10 -150,50 -140,100 C-80,90 -30,50 0,0 Z', 0], ['M0,0 C20,50 70,120 40,170 C0,140 -10,60 0,0 Z', 0], ['M0,0 C-60,-30 -130,-70 -120,-120 C-70,-100 -30,-50 0,0 Z', 0]]
    .forEach(([d], i) => mk(Q, 'path', { d, fill: i % 2 ? CAN : ROSE, stroke: BR, 'stroke-width': 3 }));
  mk(Q, 'circle', { cx: 0, cy: 0, r: 16, fill: YEL, stroke: BR, 'stroke-width': 2.5 }); return W(Q); };
const guavaFl = (p, x, y, s = 1) => { const Q = G(p, x, y, s); bloom(Q, 0, 0, 80, 5, '#FFFFFF', '#F6EFC8');
  for (let k = 0; k < 28; k++) { const a = k * 0.224, r = 20 + (k % 3) * 9; mk(Q, 'line', { x1: 0, y1: 0, x2: Math.cos(a) * r, y2: Math.sin(a) * r, stroke: '#E8E0C0', 'stroke-width': 1.5 }); mk(Q, 'circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 2.6, fill: STA }); } return W(Q); };
const stamenC = (p, x, y, s = 1) => { const Q = G(p, x, y, s); mk(Q, 'path', { d: 'M0,0 L0,-110', stroke: FIL, 'stroke-width': 5 }); mk(Q, 'ellipse', { cx: 0, cy: -126, rx: 14, ry: 22, fill: STA, stroke: BR, 'stroke-width': 2.5 }); return W(Q); };
const carpelC = (p, x, y, s = 1) => { const Q = G(p, x, y, s); mk(Q, 'ellipse', { cx: 0, cy: -34, rx: 30, ry: 36, fill: CAR, stroke: BR, 'stroke-width': 2.5 }); mk(Q, 'path', { d: 'M0,-70 L0,-130', stroke: CARD, 'stroke-width': 5 }); mk(Q, 'ellipse', { cx: 0, cy: -136, rx: 14, ry: 8, fill: CAR, stroke: BR, 'stroke-width': 2 }); return W(Q); };

const EP_ICONS = {
  flower: ['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M12 9V4', 'M15 12h5', 'M12 15v5', 'M9 12H4'],
  vine: ['M8 22V2', 'M8 9c4 0 6 2 6 5s-3 3-3 1 2-3 4-2', 'M8 16c-3 0-5-1-5-4'],
  sym: ['M12 3v18', 'M12 6c-5 0-8 3-8 6s3 6 8 6', 'M12 6c5 0 8 3 8 6s-3 6-8 6'],
  ovary: ['M12 14m-4 0a4 5 0 1 0 8 0a4 5 0 1 0-8 0', 'M12 9V3', 'M4 14h3', 'M17 14h3'],
};
const EP = { icons: EP_ICONS,
  jobs: [['flower', 'A china rose', 'IN THE COLLEGE GARDEN', 'china'], ['vine', 'A pea flower', 'ON A VINE', 'pea'], ['leaf', 'A guava flower', 'SMALL AND WHITE', 'guava']],
  hook: { label: 'THREE FLOWERS, THREE SECRETS', pill: 'Three flowers, three secrets', pillT: wt('H2', 'Three') - 0.1, img: 'scene-corridor.jpg', cardL: 'DIYA · THE COLLEGE GARDEN', q: 'How do we describe a flower?', qT: wt('H3', 'how') - 0.3,
    draw: s => { const a = bloom(s, 150, 250, 110, 5, ROSE, YEL), b = zygo(s, 400, 240, 0.62), c = guavaFl(s, 640, 250, 1.1);
      const cl = [cutLine(s, 150, 250, 300), cutLine(s, 400, 250, 300)];
      return { els: [[a, tMorph + 0.4, { ...POP, sc: 0.5 }], [b, tMorph + 0.7, { ...POP, sc: 0.5 }], [c, tMorph + 1.0, { ...POP, sc: 0.5 }], [cl[0], wt('H2', 'evenly') - 0.1, { dy: 0 }], [cl[1], wt('H2', 'just') - 0.1, { dy: 0 }],
        [tag(s, 150, 450, 'MANY WAYS', C.ac, 16), wt('H2', 'evenly'), { dy: 6 }], [tag(s, 400, 450, 'ONE WAY', C.ac, 16), wt('H2', 'just'), { dy: 6 }], [tag(s, 640, 450, 'OVARY BELOW', CARD, 16), wt('H2', 'hides'), { dy: 6 }]],
        anim: t => { const u = t - wt('H2', 'evenly'); cl[0].q.setAttribute('transform', `translate(150 250) rotate(${u > 0 ? (u * 50 % 180).toFixed(1) : 0})`); } }; } },
  plan: { label: 'THREE QUESTIONS', rows: [['flower', 'Which rings of parts?', 'FOUR WHORLS'], ['sym', 'How is it shaped?', 'SYMMETRY'], ['ovary', 'Where is the ovary?', 'SUPERIOR · INFERIOR']],
    rowT: [wt('H4', 'rings') - 0.2, wt('H4', 'shaped') - 0.2, wt('H4', 'ovary') - 0.2], pill: 'Read any flower', pillT: wt('H5', 'read') - 0.2 },
  D: { label: 'PARTS OF A FLOWER', arrows: false,
    tiles: [['Pedicel and thalamus', 'The stalk, and its swollen top', T0('D1') + 0.4, sv => { mk(sv, 'path', { d: 'M183,214 L183,128', stroke: STEM, 'stroke-width': 9, 'stroke-linecap': 'round' }); mk(sv, 'path', { d: 'M133,112 C133,138 233,138 233,112 Z', fill: THA, stroke: BR, 'stroke-width': 3 });
        return { els: [[tag(sv, 236, 190, 'PEDICEL', STEM, 13), wt('D1', 'pedicel'), { dy: 6 }], [tag(sv, 183, 96, 'THALAMUS', '#8A6A3A', 13), wt('D1', 'thalamus'), { dy: 6 }]] }; }],
      ['Four whorls', 'Rings of parts, one inside the next', T0('D2') + 0.2, sv => { const r = [[86, SEP], [64, PET], [42, STA], [20, CAR]].map(([rr, col]) => mk(sv, 'circle', { cx: 183, cy: 124, r: rr, fill: col, stroke: BR, 'stroke-width': 2.5 }));
        return { els: r.map((c, i) => [c, wt('D2', 'whorls') + i * 0.3, { ...POP, sc: 0.6 }]) }; }],
      ['Calyx and corolla', 'Sepals outside, petals inside', T0('D3'), sv => { const a = bloom(sv, 183, 124, 92, 5, SEP, SEP), b = bloom(sv, 183, 124, 70, 5, PET, YEL); b.setAttribute('transform', 'rotate(36 183 124)');
        return { els: [[a, wt('D3', 'sepals') - 0.1, { ...POP, sc: 0.6 }], [b, wt('D3', 'petals') - 0.1, { ...POP, sc: 0.6 }]] }; }],
      ['Androecium, gynoecium', 'Stamens are male, carpels are female', T0('D4'), sv => { const a = stamenC(sv, 120, 214, 1), b = carpelC(sv, 250, 214, 1.1);
        return { els: [[a, wt('D4', 'stamens') - 0.1, { dy: 16 }], [b, wt('D4', 'carpels') - 0.1, { dy: 16 }], [tag(sv, 168, 160, 'STAMEN', '#B08A2A', 13), wt('D4', 'stamens'), { dy: 6 }], [tag(sv, 312, 170, 'OVARY', CARD, 13), wt('D4', 'ovary'), { dy: 6 }]] }; }]],
    chips: [['flower', 'Perianth: sepals and petals alike', wt('D5', 'perianth')], ['users', 'Bisexual: stamens and carpels', wt('D6', 'bisexual')], ['user', 'Unisexual: only one of them', wt('D6', 'unisexual')]] },
  ladders: [
    { key: 'Z', t0: T0('Z1'), tEnd: T0('P1'), chips: ['ACTINOMORPHIC', 'ZYGOMORPHIC', 'ASYMMETRIC', 'MEROUS', 'BRACT'],
      lv: [
        { t: T0('Z1') + 0.2, chip: 0, info: ['QUESTION TWO', 'Symmetry', 'Imagine a cut through the centre.', ''], b: g => {
            const f = bloom(g, 528, 263, 200, 5, PET, YEL), cl = cutLine(g, 528, 263, 470), t2 = T0('Z2');
            return { els: [[f, T0('Z1') + 0.3, { ...POP, sc: 0.6 }], [cl, wt('Z1', 'cutting') - 0.1, { dy: 0 }], [tag(g, 860, 470, 'EQUAL HALVES', C.ac, 17), wt('Z2', 'equal'), { dy: 6 }]],
              anim: t => { const u = t - t2; cl.q.setAttribute('transform', `translate(528 263) rotate(${u > 0 ? (u * 36 % 180).toFixed(1) : 0})`); } }; } },
        { t: T0('Z2'), chip: 0, cont: true, info: ['EVERY CUT WORKS', 'Actinomorphic', 'Radially symmetrical.', 'Mustard, datura, chilli'] },
        { t: T0('Z3'), chip: 1, info: ['ONLY ONE CUT', 'Zygomorphic', 'Bilaterally symmetrical.', 'Pea, gulmohur, bean, Cassia'], b: g => {
            const f = zygo(g, 528, 280, 1.3), bad = cutLine(g, 528, 280, 560, '#C0392B'), ok = cutLine(g, 528, 280, 480);
            bad.q.setAttribute('transform', 'translate(528 280) rotate(90)');
            return { els: [[f, T0('Z3') + 0.2, { ...POP, sc: 0.6 }], [ok, wt('Z3', 'one') - 0.1, { dy: 0 }], [tag(g, 880, 470, 'ONE CUT ONLY', C.ac, 17), wt('Z3', 'similar'), { dy: 6 }]],
              anim: t => { bad.style.opacity = t > T0('Z3') + 0.6 && t < wt('Z3', 'one') - 0.2 ? 1 : 0; } }; } },
        { t: T0('Z4'), chip: 2, info: ['NO CUT WORKS', 'Asymmetric', 'Also called irregular.', 'Canna'], b: g => {
            const f = canna(g, 528, 270, 1.3), cl = cutLine(g, 528, 270, 480, '#C0392B'), t4 = wt('Z4', 'no');
            return { els: [[f, T0('Z4') + 0.2, { ...POP, sc: 0.6 }], [cl, t4 - 0.1, { dy: 0 }], [tag(g, 880, 470, 'NO MATCH', '#C0392B', 17), wt('Z4', 'asymmetric'), { dy: 6 }]],
              anim: t => { const u = t - t4; cl.q.setAttribute('transform', `translate(528 270) rotate(${u > 0 ? (u * 40 % 180).toFixed(1) : 0})`); } }; } },
        { t: T0('Z5'), chip: 3, info: ['COUNT THE PARTS', 'Trimerous to pentamerous', 'Parts in multiples of three, four or five.', ''], b: g => {
            const f = [3, 4, 5].map((n, i) => bloom(g, 220 + i * 308, 240, 110, n, PET, YEL));
            return { els: f.map((q, i) => [q, T0('Z5') + 0.4 + i * 0.4, { ...POP, sc: 0.4 }]).concat(['TRIMEROUS', 'TETRAMEROUS', 'PENTAMEROUS'].map((s2, i) => [tag(g, 220 + i * 308, 430, s2, C.ac, 17), wt('Z5', ['trimerous', 'tetramerous', 'pentamerous'][i]) - 0.1, { dy: 6 }])) }; } },
        { t: T0('Z6'), chip: 4, info: ['A SMALL LEAF', 'Bract', 'A reduced leaf at the base of the pedicel.', 'Bracteate, or ebracteate'], b: g => {
            [330, 730].forEach(x => { mk(g, 'path', { d: `M${x},470 L${x},200`, stroke: STEM, 'stroke-width': 8, 'stroke-linecap': 'round' }); bloom(g, x, 170, 80, 5, PET, YEL); });
            const br = leaf(g, 334, 430, 90, -40, { w: 0.42, ven: 'net' });
            return { labs: [[lab(g, 380, 400, 120, 330, 'Bract', 'end'), wt('Z6', 'bract') - 0.1]], els: [[br, wt('Z6', 'bract') - 0.3, { ...POP, sc: 0.3 }], [tag(g, 330, 505, 'BRACTEATE', C.ac, 17), wt('Z6', 'bracteate') - 0.1, { dy: 6 }], [tag(g, 730, 505, 'EBRACTEATE', C.mute, 17), wt('Z6', 'Without'), { dy: 6 }]] }; } }] },
    { key: 'P', t0: T0('P1'), tEnd: T0('C1'), chips: ['HYPOGYNOUS', 'PERIGYNOUS', 'EPIGYNOUS'],
      lv: [
        { t: T0('P1') + 0.2, chip: -1, info: ['QUESTION THREE', 'Where is the ovary?', 'Watch the thalamus.', ''], b: g => {
            const F = flowerLS(g, 528, 300, 1.2), t3 = wt('P3', 'cup') - 0.2, t4 = wt('P4', 'rim') - 0.2;
            const bd = grp(g); mk(bd, 'rect', { x: 760, y: 40, width: 260, height: 46, rx: 10, fill: C.ac3 || '#E6F2E1' }); const bt = txt(bd, 890, 71, '', { 'text-anchor': 'middle', fill: C.ac, 'font-size': 19, 'font-weight': 700, 'letter-spacing': 1.4 });
            const lt = txt(g, 120, 0, 'OTHER PARTS', { fill: C.ac, 'font-size': 15, 'font-weight': 600, 'letter-spacing': 1.4 });
            return { labs: [[lab(g, 548, 300, 800, 250, 'Ovary'), wt('P1', 'ovary') - 0.1], [lab(g, 528, 300 + 108 * 1.2, 800, 440, 'Thalamus'), wt('P1', 'thalamus') - 0.1]],
              els: [[F.Q, T0('P1') + 0.3, { ...POP, sc: 0.7 }], [bd, T0('P2') + 0.2, POP], [lt, T0('P2') + 0.6, { dy: 0 }], [F.lvl, T0('P2') + 0.6, { dy: 0 }]],
              anim: t => { const m = t < t3 ? 0 : t < t4 ? M.clamp((t - t3) / 1.4) : 1 + M.clamp((t - t4) / 1.6); F.set(m);
                lt.setAttribute('y', 300 + F.yr * 1.2 - 10); bt.textContent = m < 0.5 ? 'OVARY SUPERIOR' : m < 1.5 ? 'HALF INFERIOR' : 'OVARY INFERIOR'; } }; } },
        { t: T0('P2'), chip: 0, cont: true, info: ['PARTS BELOW THE OVARY', 'Hypogynous', 'The gynoecium sits at the highest point. Ovary superior.', 'Mustard, china rose, brinjal'] },
        { t: T0('P3'), chip: 1, cont: true, info: ['PARTS ON THE RIM OF A CUP', 'Perigynous', 'Other parts at almost the same level. Ovary half inferior.', 'Plum, rose, peach'] },
        { t: T0('P4'), chip: 2, cont: true, info: ['PARTS ABOVE THE OVARY', 'Epigynous', 'The thalamus wraps and fuses with the ovary. Ovary inferior.', 'Guava, cucumber, sunflower ray florets'] }],
      av: { who: 'Diya', text: 'The other parts sit below!', tin: wt('P2', 'below') + 0.2, tout: T0('P3') - 0.2 } }],
  V: { h0: 'Hypogynous · mustard', h1: 'Epigynous · guava', tH: [wt('C1', 'two') - 0.1, wt('C1', 'two') + 0.3],
    rows: [['Whorls', 'All four', 'All four', 1, wt('C2', 'four'), wt('C2', 'four') + 0.3], ['Ovules', 'Inside the ovary', 'Inside the ovary', 1, wt('C2', 'ovules'), wt('C2', 'ovules') + 0.3],
      ['Ovary sits', 'On top', 'Below the other parts', 0, wt('C3', 'top'), wt('C3', 'below')], ['Ovary is', 'Superior', 'Inferior', 0, wt('C3', 'superior'), wt('C3', 'inferior')]],
    think: { q: 'In a guava flower, the sepals and petals sit above the ovary. Superior or inferior?', opts: ['Superior', 'Inferior'], right: 1, why: 'Inferior. The thalamus wraps the ovary: epigynous.' },
    tOpts: wt('C4', 'superior') - 0.1, tWhy: wt('C5', 'The') - 0.2 },
  stmt: { st2: 'Where does the <span class="acc">ovary</span> sit?', st2T: wt('T1', 'Superior') - 0.3, stF: `<span style="font:600 28px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">superior: <b style="color:${CARD}">hypogynous</b> · half inferior: <b style="color:${CARD}">perigynous</b> · inferior: <b style="color:${CARD}">epigynous</b></span>`, stFT: wt('T1', 'Half') - 0.2 },
  Wk: { label: 'WORKED EXAMPLE · READ FOUR FLOWERS', clues: [['Mustard: every cut through the centre gives equal halves', 2, 'W2'], ['Pea: only one cut gives similar halves', 0, 'W3'], ['Rose: other parts on the rim of a cup', 3, 'W4'], ['Cucumber: ovary below all the other parts', 1, 'W5']],
    targets: ['Zygomorphic', 'Epigynous', 'Actinomorphic', 'Perigynous'] },
  trap: { wrong: 'Hypogynous: the ovary sits low', right: 'Hypogynous: the other parts sit below. The ovary is superior.', tWrong: wt('X2', 'hypogynous') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'other') - 0.1,
    draw: s => { const F = flowerLS(s, 130, 150, 0.52);
      const ta = grp(s); mk(ta, 'rect', { x: 250, y: 60, width: 190, height: 34, rx: 8, fill: C.okBg }); tag(ta, 345, 83, 'OVARY ON TOP', C.ok);
      const tb = grp(s); mk(tb, 'rect', { x: 250, y: 190, width: 190, height: 34, rx: 8, fill: C.okBg }); tag(tb, 345, 213, 'PARTS BELOW', C.ok);
      return { els: [[F.Q, wt('X3', 'other') - 0.1, { ...POP, sc: 0.6 }], [tb, wt('X3', 'below') - 0.1, POP], [ta, wt('X3', 'top') - 0.1, POP]] }; } },
  where: { type: 'Matching a flower with its symmetry or ovary position, or labelled diagrams', tType: wt('E1', 'matching') },
  mcq: { pat: 'NEET PATTERN · MATCH THE FOLLOWING', qW: 960,
    q: 'Match list I with list II.<div class="cols2"><div><div class="sl"><b>A</b>Zygomorphic</div><div class="sl"><b>B</b>Asymmetric</div><div class="sl"><b>C</b>Perigynous</div><div class="sl"><b>D</b>Epigynous</div></div><div><div class="sl"><b>1</b>Canna</div><div class="sl"><b>2</b>Guava</div><div class="sl"><b>3</b>Pea</div><div class="sl"><b>4</b>Plum</div></div></div>',
    opts: ['A-3, B-1, C-4, D-2', 'A-3, B-4, C-1, D-2', 'A-1, B-3, C-4, D-2', 'A-3, B-1, C-2, D-4'], right: 0, optW: 474, optY: 400, optH: 84, optFs: 26 },
  tOpts: wt('Q1', 'Match') - 0.2,
  so: [['Answer: <b style="color:var(--ok)">A</b>'], ['<b>A-3</b>: pea, zygomorphic'], ['<b>B-1</b>: canna, asymmetric'], ['<b>C-4</b> plum · <b>D-2</b> guava']],
  tSo: [wt('A1', 3) + 0.1, wt('A2', 'Pea'), wt('A2', 'canna'), wt('A3', 'Plum')],
  fc: { title: 'Recap · the flower', lines: ['<b>Whorls</b>: calyx (sepals) · corolla (petals) · androecium (stamens) · gynoecium (carpels)', '<b>Perianth</b>: sepals and petals alike (lily) · <b>bisexual</b> or <b>unisexual</b>',
    '<b>Symmetry</b>: actinomorphic (mustard, chilli) · zygomorphic (pea, <i>Cassia</i>) · asymmetric (canna)', '<b>Hypogynous</b>: superior (mustard, brinjal) · <b>perigynous</b>: half inferior (plum, rose)', '<b>Epigynous</b>: inferior (guava, cucumber, ray florets of sunflower)'] },
  Y: ['What is a perianth?', 'Name one zygomorphic flower.', 'In which type of flower is the ovary half inferior?'],
  next: { label: 'NEXT · EP 45', topic: 'Petals folded in a bud: Aestivation and Placentation' },
  cam: [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('P4', 'rim') - 0.4, 1.05, 960, 580], [T0('C1') - 0.3, 1, 960, 540]],
};

/* ================= shared episode template ================= */
Object.assign(M.IC, EP.icons || {});
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = tt => tt - 0.32;
const LADS = EP.ladders, tL0 = LADS[0].t0;

/* title card */
$('#jobs').innerHTML = EP.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = EP.jobs.map(j => wt('H1', j[3], j[4] || 0));

/* H */
$('#hlL').textContent = EP.hook.label; $('#hlP').innerHTML = EP.hook.pill;
const HK = EP.hook.draw($('#hlS'));
$('#hkL').textContent = EP.hook.cardL; $('#hkImg').src = IMG + EP.hook.img; $('#hkP').textContent = EP.hook.q;
$('#splL').textContent = EP.plan.label; $('#splP').textContent = EP.plan.pill;
$('#sbs').innerHTML = EP.plan.rows.map(([ic, n, s], i) => `<div class="sb" id="sb${i}" style="top:${84 + i * 94}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="sn">${n}</div><div class="ss">${s}</div></div>`).join('');

/* D */
$('#dwL').textContent = EP.D.label;
const ND = EP.D.tiles.length, TW = (1528 - (ND - 1) * 20) / ND;
$('#gts').innerHTML = EP.D.tiles.map(([n, s], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * (TW + 20)}px;width:${TW}px"><div class="gx">${i + 1} OF ${ND}</div><svg id="gs${i}" width="${TW}" height="230" style="position:absolute;left:0;top:0"></svg><div class="gn">${n}</div><div class="gs" style="width:${TW - 36}px">${s}</div></div>`).join('');
const DT = EP.D.tiles.map((d, i) => d[3]($('#gs' + i), TW) || []);
const DA = EP.D.arrows ? EP.D.tiles.slice(1).map((_, i) => mk($('#dwS'), 'path', { d: `M${36 + (i + 1) * (TW + 20) - 16},266 l12,0 m-6,-8 l8,8 l-8,8`, stroke: C.ac, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })) : [];
const TC = EP.D.chips || [];
$('#tcs').innerHTML = TC.map(([ic, n], i) => `<div class="tc" id="tc${i}">${M.icon(ic, 24, '#fff', 2.2)}${n}</div>`).join('');

/* ladders (zoom ladder / stage chains) */
LADS.forEach(L => {
  const root = document.createElement('div'); root.id = 's' + L.key; $('#cam').insertBefore(root, $('#sV'));
  root.innerHTML = `<div class="lch" id="${L.key}ch">${L.chips.map((n, i) => `<span class="zc" id="${L.key}c${i}">${n}</span>${i < L.chips.length - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('')}</div>
    <div class="card ldg" id="${L.key}d"><svg id="${L.key}S" width="1056" height="526" style="position:absolute;left:0;top:0"></svg></div>
    <div class="card lif" id="${L.key}i"></div>`;
  L.root = root; const s = $('#' + L.key + 'S');
  L.lv.forEach((v, k) => { v.g = grp(s); v.r = Object.assign({ labs: [], els: [], draws: [] }, v.b ? v.b(v.g) || {} : {});
    if (v.info) { const [eb, n, d, h] = v.info, el = document.createElement('div'); el.className = 'lvI'; el.id = `${L.key}v${k}`;
      el.innerHTML = `<div class="lbl" style="left:36px;top:30px">${eb}</div><div class="ln">${n}</div><div class="ld">${d}</div>${h ? `<div class="lh">${h}</div>` : ''}`; $('#' + L.key + 'i').appendChild(el); v.ie = el; } });
  if (L.av) L.avF = PUC.avatar(root, { x: 1248 + 28, y: 324 + 526 - 104, who: L.av.who || 'Diya', face: IMG + (L.av.who === 'Aarav' ? 'aarav' : 'diya') + '-face.jpg', text: L.av.text });
});

/* V + think */
$('#vh0').innerHTML = EP.V.h0; $('#vh1').innerHTML = EP.V.h1;
$('#vrs').innerHTML = EP.V.rows.map(([k, a, b, same], i) => `<div class="vr" id="vr${i}" style="top:${100 + i * 92}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:320px">${a}</div><div class="vt" id="vt${i}b" style="left:890px">${b}</div>
  <div class="eq" id="eq${i}" style="background:${same ? C.soft : C.ac};color:${same ? C.mute : '#fff'}">${same ? 'SAME' : 'DIFFERENT'}</div></div>`).join('');
const th1 = PUC.think($('#th1'), EP.V.think);

/* statement */
$('#st2').innerHTML = EP.stmt.st2; $('#stF').innerHTML = EP.stmt.stF;

/* W: matching */
$('#wbL').textContent = EP.Wk.label;
const MC = EP.Wk.clues, MG = EP.Wk.targets, MGY = EP.Wk.tY || MG.map((_, j) => 84 + j * 116);
$('#mcs').innerHTML = MC.map(([s], i) => `<div class="mc" id="mc${i}" style="top:${84 + i * 116}px"><div class="mn">${i + 1}</div><div class="mt2">${s}</div></div>`).join('') + MG.map((g, j) => `<div class="mg" id="mg${j}" style="top:${MGY[j]}px">${g}</div>`).join('');
const MLN = MC.map(([s, j], i) => mk($('#wS'), 'path', { d: `M936,${132 + i * 116} C1060,${132 + i * 116} 1060,${MGY[j] + 48} 1180,${MGY[j] + 48}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none' }));
const tMc = MC.map(m => T0(m[2])), tMg = MC.map(m => wt(m[2], m[3] || 'That'));

/* X / Q / F */
const trap = PUC.trap($('#trap'), { wrong: EP.trap.wrong, right: EP.trap.right });
const TPE = EP.trap.draw($('#tS'));
const where = PUC.where($('#wa'), { on: [], type: EP.where.type });
const mcq = PUC.mcq($('#mq'), EP.mcq);
const so = PUC.solution($('#so'), EP.so, { y0: 100, dy: 100 });
const fc = PUC.fcard($('#sF'), { x: 230, y: 262, w: 1460, h: 470, title: EP.fc.title, y0: 100, dy: 70, txt: EP.fc.lines.map(() => 1), lines: EP.fc.lines });
$('#yrs').innerHTML = EP.Y.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: EP.next.label, topic: EP.next.topic, y: 764 });

/* helpers */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), EP.cam);
let geo = null;
const fit = (el, maxW, min = 20) => { let fs = parseFloat(getComputedStyle(el).fontSize); while (el.scrollWidth > maxW && fs > min) { fs -= 1; el.style.fontSize = fs + 'px'; } };
function measure() {
  geo = 1;
  let w = 0; TC.forEach((_, i) => w += $('#tc' + i).offsetWidth); w += Math.max(0, TC.length - 1) * 16; let x = 800 - w / 2; TC.forEach((_, i) => { const e = $('#tc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  document.querySelectorAll('.lvI').forEach(el => { const n = el.querySelector('.ln'), d = el.querySelector('.ld'), h = el.querySelector('.lh'); fit(n, 440, 30); const nb = n.offsetTop + n.offsetHeight; d.style.top = (nb + 14) + 'px'; if (h) h.style.top = (d.offsetTop + d.offsetHeight + 22) + 'px'; });
  document.querySelectorAll('.gt .gn').forEach(el => fit(el, TW - 36, 18));
  document.querySelectorAll('.mc .mt2').forEach(el => fit(el, 800, 18));
  document.querySelectorAll('.yr .q').forEach(el => fit(el, 1380, 22));
  const g = $('#ghT'); if (g) g.style.left = (960 - g.offsetWidth / 2) + 'px';
}
const chipSet = (el, on, done) => { el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; };
const runEls = (arr, t) => (arr || []).forEach(([e, tt, op]) => M.vis(e, t, tt, 1e9, op || POP));

/* frame */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  EP.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  if ($('#ghT')) M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT(tD1);
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    runEls(HK.els, t); (HK.draws || []).forEach(([p, tt, d]) => M.draw(p, t, tt, d || 0.6)); HK.anim && HK.anim(t);
    M.vis($('#hlP'), t, EP.hook.pillT, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, EP.hook.qT, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { EP.plan.rows.forEach((_, i) => M.vis($('#sb' + i), t, EP.plan.rowT[i], 1e9, { dx: -16, dy: 0 })); M.vis($('#splP'), t, Math.min(EP.plan.pillT, tH4 + 0.6), 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL0 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dw'), t, tD1 + 0.05, OUT(tL0), { dy: 36, ...o });
    if ($('#ghD')) M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 6 });
    EP.D.tiles.forEach((g, i) => { if (M.vis($('#gt' + i), t, g[2] - 0.15, 1e9, { dy: 24 })) runEls(DT[i].els || [], t), DT[i].anim && DT[i].anim(t); });
    DA.forEach((a, i) => M.vis(a, t, EP.D.tiles[i + 1][2] - 0.3, 1e9, POP));
    TC.forEach((c, i) => M.vis($('#tc' + i), t, c[2] - 0.1, 1e9, POP));
  }

  /* ladders */
  LADS.forEach(L => {
    const on = t >= L.t0 - 0.1 && t < L.tEnd + 0.1; M.hide(L.root, !on); if (!on) return;
    const out = OUT(L.tEnd);
    M.vis($('#' + L.key + 'ch'), t, L.t0, out, { dy: 12, ...o });
    M.vis($('#' + L.key + 'd'), t, L.t0 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#' + L.key + 'i'), t, L.t0 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; L.lv.forEach((v, k) => { if (t >= v.t - 0.05) cur = k; });
    const cc = L.lv[cur].chip ?? cur;
    L.chips.forEach((_, i) => chipSet($('#' + L.key + 'c' + i), i === cc, i < cc));
    L.lv.forEach((v, k) => {
      if (v.ie) { let n = k + 1; while (n < L.lv.length && !L.lv[n].ie) n++; M.vis(v.ie, t, v.t + 0.3, n < L.lv.length ? L.lv[n].t + 0.1 : 1e9, { dy: 20, outDur: 0.25, ody: -12 }); }
      if (v.cont) return; let nn = k + 1; while (nn < L.lv.length && L.lv[nn].cont) nn++;
      const tout = v.keep || nn >= L.lv.length ? 1e9 : L.lv[nn].t;
      const vo = M.vis(v.g, t, v.t + 0.1, tout, { dy: 0, sc: 0.95, fade: 0.3, outDur: 0.3, osc: 1.03, ody: 0 });
      if (vo) { v.r.labs.forEach(([l, tt]) => labRun(l, t, tt)); runEls(v.r.els, t); v.r.draws.forEach(([p, tt, d]) => M.draw(p, t, tt, d || 0.5)); v.r.anim && v.r.anim(t); }
    });
    if (L.avF) L.avF(t, L.av.tin, L.av.tout);
  });

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT(tC4), { dy: 36, ...o });
    M.vis($('#vh0'), t, EP.V.tH[0], 1e9, POP); M.vis($('#vh1'), t, EP.V.tH[1], 1e9, POP);
    let cur = -1; EP.V.rows.forEach((v, i) => { if (t >= v[4] - 0.1) cur = i; });
    EP.V.rows.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, tC1 + 0.6 + i * 0.12, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#vt' + i + 'a'), t, v[4], 1e9, { dx: -12, dy: 0 }); M.vis($('#vt' + i + 'b'), t, v[5], 1e9, { dx: -12, dy: 0 }); M.vis($('#eq' + i), t, v[5] + 0.3, 1e9, POP); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT(tT) + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: EP.V.tOpts, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: EP.V.tWhy });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, EP.stmt.st2T, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, EP.stmt.stFT, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT(tX1), { dy: 36, ...o });
    MG.forEach((_, j) => M.vis($('#mg' + j), t, tW1 + 0.4 + j * 0.1, 1e9, { dx: 16, dy: 0 }));
    const lit = MG.map(() => 0);
    MC.forEach(([s, j], i) => { M.vis($('#mc' + i), t, tMc[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.draw(MLN[i], t, tMg[i] - 0.2, 0.5); lit[j] = Math.max(lit[j], M.io((t - tMg[i]) / 0.3)); });
    MG.forEach((_, j) => { const on = lit[j], el = $('#mg' + j); el.style.background = mix('#FFFFFF', C.ac, on); el.style.borderColor = mix('#CBD0DA', C.ac, on); el.style.color = mix('#9AA0AC', '#FFFFFF', on); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: EP.trap.tWrong, tStrike: EP.trap.tStrike, tRight: EP.trap.tRight });
    runEls(TPE.els, t); TPE.anim && TPE.anim(t);
    where(t, { tin: T0('E1'), tLight: [], tType: EP.where.tType });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: EP.tOpts, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, EP.tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: EP.fc.lines.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
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
