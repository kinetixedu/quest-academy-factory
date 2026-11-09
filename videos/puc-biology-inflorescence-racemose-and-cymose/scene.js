// PUC Biology Ep 43: Inflorescence: Racemose and Cymose (Living diagram, leaf green)
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

/* ================= Ep 43 content: inflorescence ================= */
const MUS = '#F2D06B', MUSD = '#E0A93A', JAS = '#FFFFFF', BUDG = '#9CCB8A';
const raceme = (p, x, y, H, n, s = 1, col = MUS, core = MUSD) => { const g = grp(p), R = { it: [] };
  R.axis = mk(g, 'path', { d: `M${x},${y} L${x},${y - H}`, stroke: STEM, 'stroke-width': 6 * s, 'stroke-linecap': 'round' });
  for (let i = 0; i < n; i++) { const fy = y - 40 * s - i * (H - 80 * s) / (n - 1), sd = i % 2 ? -1 : 1, px = x + sd * 62 * s, py = fy - 34 * s;
    const ped = mk(g, 'path', { d: `M${x},${fy} Q${x + sd * 34 * s},${fy - 4 * s} ${px},${py}`, stroke: STEM, 'stroke-width': 3.5 * s, fill: 'none', 'stroke-linecap': 'round' });
    const bd = bud(g, px, py, 1.15 * s, BUDG), bl = bloom(g, px, py, 28 * s, 4, col, core);
    R.it.push({ ped, bd, bl, fy, px, py, frac: (y - fy) / H }); }
  R.tip = bud(g, x, y - H - 6 * s, 1.1 * s, BUDG); R.g = g; R.H = H; return R; };
// grow the raceme: axis draws from t0 over dur; each side flower appears as the tip passes; the lower ones open
const raceRun = (R, t, t0, dur, nOpen, od = 2.2) => { M.draw(R.axis, t, t0, dur); const k = M.clamp((t - t0) / dur);
  R.tip.setAttribute('transform', `translate(0 ${((1 - k) * R.H).toFixed(1)})`); R.tip.style.opacity = t < t0 ? 0 : 1;
  R.it.forEach((q, i) => { const ti = t0 + dur * q.frac; M.draw(q.ped, t, ti, 0.3);
    M.vis(q.bd, t, ti + 0.1, i < nOpen ? ti + od : 1e9, { ...POP, sc: 0.3, outDur: 0.2 }); if (i < nOpen) M.vis(q.bl, t, ti + od, 1e9, { ...POP, sc: 0.4 }); else q.bl.style.opacity = 0; }); };
const raceStatic = (R, nOpen) => R.it.forEach((q, i) => { q.bd.style.opacity = i < nOpen ? 0 : 1; q.bl.style.opacity = i < nOpen ? 1 : 0; });
// cyme: the axis ends in a flower; side branches below it carry younger flowers
const cyme = (p, x, y, H, s = 1, col = JAS, core = '#F2D06B') => { const g = grp(p), R = { pairs: [] }, yt = y - H;
  R.axis = mk(g, 'path', { d: `M${x},${y} L${x},${yt}`, stroke: STEM, 'stroke-width': 6 * s, 'stroke-linecap': 'round' });
  const fl = (fx, fy, sc) => ({ bd: bud(g, fx, fy, 1.15 * sc, BUDG), bl: bloom(g, fx, fy, 30 * sc, 5, col, core) });
  R.T = fl(x, yt, s * 1.15);
  [[120, 100, 70, 1], [230, 170, 150, 0.9]].forEach(([dy, dx, up, sc]) => { const ny = yt + dy * s, pr = [];
    [-1, 1].forEach(sd => { const fx = x + sd * dx * s, fy = ny - up * s * 0.6; const ped = mk(g, 'path', { d: `M${x},${ny} Q${x + sd * dx * 0.5 * s},${ny} ${fx},${fy}`, stroke: STEM, 'stroke-width': 3.5 * s, fill: 'none', 'stroke-linecap': 'round' });
      pr.push(Object.assign({ ped, fx, fy }, fl(fx, fy, s * sc))); }); R.pairs.push(pr); });
  R.g = g; R.yt = yt; return R; };
const ageTag = (g, x, y, n, col = C.ac) => { const q = grp(g); mk(q, 'circle', { cx: x, cy: y, r: 17, fill: col }); txt(q, x, y + 6, String(n), { 'text-anchor': 'middle', fill: '#fff', 'font-size': 18, 'font-weight': 700 }); return q; };
const arrowV = (g, x, y0, y1, col = C.ac) => { const q = grp(g), sd = y1 < y0 ? 1 : -1; const f = flowPath(q, `M${x},${y0} L${x},${y1}`, col, 5); mk(q, 'path', { d: `M${x - 12},${y1 + sd * 14} L${x},${y1} L${x + 12},${y1 + sd * 14}`, stroke: col, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); q.f = f; return q; };
const sunflower = (p, x, y, s = 1) => { const Q = G(p, x, y, s);
  mk(Q, 'path', { d: 'M0,0 C6,80 -4,160 0,240', stroke: STEM, 'stroke-width': 8, fill: 'none' }); leaf(Q, 0, 150, 90, -30, { w: 0.5, ven: 'net' }); leaf(Q, 0, 190, 90, -150, { w: 0.5, ven: 'net' });
  for (let k = 0; k < 20; k++) mk(Q, 'ellipse', { cx: 0, cy: -78, rx: 13, ry: 30, fill: MUS, stroke: BR, 'stroke-width': 2, transform: `rotate(${k * 18})` });
  mk(Q, 'circle', { cx: 0, cy: 0, r: 56, fill: '#8A5A2E', stroke: BR, 'stroke-width': 3 });
  for (let k = 0; k < 30; k++) { const a = k * 2.4, r = 6 + Math.sqrt(k) * 8.5; mk(Q, 'circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 3, fill: '#5E3A1C' }); } return W(Q); };

const EP_ICONS = {
  flower: ['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M12 9V4', 'M15 12h5', 'M12 15v5', 'M9 12H4'],
  flower2: ['M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M12 12v10', 'M12 18l-5-4', 'M12 18l5-4'],
  sun: ['M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M5 5l1.5 1.5', 'M17.5 17.5 19 19', 'M19 5l-1.5 1.5', 'M6.5 17.5 5 19'],
};
const EP = { icons: EP_ICONS,
  jobs: [['flower', 'Mustard flowers', 'A YELLOW STALK', 'mustard'], ['flower2', 'A bunch of jasmine', 'WHITE AND SWEET', 'jasmine'], ['sun', 'A sunflower', 'NODDING IN THE SUN', 'sunflower']],
  hook: { label: 'ONE FLOWER, OR MANY?', pill: 'Many flowers, one pattern', pillT: wt('H2', 'many') - 0.1, img: 'scene-corridor.jpg', cardL: 'DIYA · THE COLLEGE GARDEN', q: 'Which flower opened first?', qT: wt('H3', 'open') - 0.3,
    draw: s => { const a = raceme(s, 140, 440, 340, 7, 0.85); raceStatic(a, 4); const b = cyme(s, 400, 440, 300, 0.9); b.T.bd.style.opacity = 0; b.pairs.forEach(pr => pr.forEach(q => q.bl.style.opacity = 0));
      const c = sunflower(s, 640, 220, 0.85);
      return { els: [[a.g, tMorph + 0.4, { dy: 20 }], [b.g, tMorph + 0.7, { dy: 20 }], [c, tMorph + 1.0, { dy: 20 }],
        [tag(s, 140, 476, 'MUSTARD', MUSD, 16), wt('H2', 'single') - 0.2, { dy: 6 }], [tag(s, 400, 476, 'JASMINE', STEM, 16), wt('H2', 'single'), { dy: 6 }], [tag(s, 640, 476, 'SUNFLOWER', MUSD, 16), wt('H2', 'single') + 0.2, { dy: 6 }]] }; } },
  plan: { label: 'ONE CLUE TO FIND', rows: [['flower', 'What a flower is', 'A CHANGED SHOOT'], ['arrowU', 'Racemose', 'THE TIP KEEPS GROWING'], ['arrowD', 'Cymose', 'THE TIP BECOMES A FLOWER']],
    rowT: [wt('H4', 'clue') - 0.2, wt('H5', 'racemose') - 0.2, wt('H5', 'cymose') - 0.2], pill: 'Find the oldest flower', pillT: wt('H5', 'oldest') - 0.2 },
  D: { label: 'WHAT IS AN INFLORESCENCE', arrows: true,
    tiles: [['A changed shoot', 'A flower is a modified shoot', T0('D1') + 0.4, sv => { mk(sv, 'path', { d: 'M183,212 L183,80', stroke: STEM, 'stroke-width': 7, 'stroke-linecap': 'round' }); leaf(sv, 183, 180, 80, -20, { w: 0.42, ven: 'net' }); leaf(sv, 183, 135, 76, -160, { w: 0.42, ven: 'net' });
        const b = bloom(sv, 183, 70, 26, 5, PET); return { els: [[b, wt('D1', 'changed'), { ...POP, sc: 0.3 }]] }; }],
      ['Floral meristem', 'The shoot tip changes to make a flower', T0('D2'), sv => { mk(sv, 'path', { d: 'M93,200 C93,70 273,70 273,200 Z', fill: '#E6F2E1', stroke: BR, 'stroke-width': 3 });
        const cl = []; for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) { const cx = 112 + i * 20 + (j % 2) * 10, cy = 186 - j * 22; if (Math.hypot((cx - 183) / 88, (cy - 200) / 128) < 0.92) cl.push(mk(sv, 'circle', { cx, cy, r: 8, fill: '#BFE0B4', stroke: STEM, 'stroke-width': 1.5 })); }
        const tf = wt('D2', 'floral'); return { els: [[tag(sv, 183, 222, 'SHOOT APEX', STEM, 13), wt('D2', 'apical'), { dy: 6 }]], anim: t => { const k = M.clamp((t - tf) / 0.8); cl.forEach(c => c.setAttribute('fill', mix('#BFE0B4', PET, k))); } }; }],
      ['Short, packed axis', 'Internodes stop growing longer', T0('D3'), sv => { mk(sv, 'path', { d: 'M100,212 L100,50', stroke: STEM, 'stroke-width': 6 }); [190, 140, 90].forEach(y => mk(sv, 'line', { x1: 90, y1: y, x2: 110, y2: y, stroke: BR, 'stroke-width': 3 }));
        const r = grp(sv); mk(r, 'path', { d: 'M266,212 L266,130', stroke: STEM, 'stroke-width': 6 }); [196, 180, 164, 148].forEach(y => mk(r, 'line', { x1: 256, y1: y, x2: 276, y2: y, stroke: BR, 'stroke-width': 3 }));
        const a = mk(sv, 'path', { d: 'M150,150 L214,150 M202,140 L214,150 L202,160', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); return { els: [[a, wt('D3', 'stop'), POP], [r, wt('D3', 'short') - 0.1, { dy: 10 }]] }; }],
      ['Inflorescence', 'How flowers are arranged on the floral axis', T0('D4'), sv => { const R = raceme(sv, 183, 214, 170, 5, 0.62); raceStatic(R, 3); return {}; }]],
    chips: [['arrowU', 'Does the tip keep growing?', wt('D5', 'keep')], ['flower', 'Or turn into a flower?', wt('D5', 'turn')]] },
  ladders: [
    { key: 'Z', t0: T0('Z1'), tEnd: T0('P1'), chips: ['AXIS GROWS', 'FLOWERS ON THE SIDES', 'ACROPETAL', 'MUSTARD'],
      lv: [
        { t: T0('Z1') + 0.2, chip: 0, info: ['TYPE ONE', 'Racemose', 'Watch the main axis.', ''], b: g => {
            const R = raceme(g, 528, 500, 400, 7, 1), t0 = T0('Z1') + 0.8, dur = wt('Z4', 'oldest') - t0;
            const up = arrowV(g, 780, 440, 130), ag = [ageTag(g, R.it[0].px + 54, R.it[0].py, 1), ageTag(g, R.it[6].px + 48, R.it[6].py, 7)];
            const gt = txt(R.tip, 528, 64, 'GROWING TIP', { 'text-anchor': 'middle', fill: STEM, 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1.4 });
            return { labs: [[lab(g, 528, 440, 300, 440, 'Main axis', 'end'), wt('Z2', 'axis') - 0.1]],
              els: [[gt, wt('Z2', 'tip') - 0.1, { dy: 6 }], [ag[0], wt('Z4', 'oldest'), POP], [ag[1], wt('Z4', 'youngest'), POP], [up, wt('Z4', 'acropetal') - 0.3, { dy: 10 }], [tag(g, 860, 300, 'ACROPETAL', C.ac, 17), wt('Z4', 'acropetal'), { dy: 6 }], [tag(g, 860, 460, 'OLDEST', MUSD, 15), wt('Z4', 'bottom'), { dy: 6 }], [tag(g, 860, 120, 'YOUNGEST', STEM, 15), wt('Z4', 'top'), { dy: 6 }]],
              anim: t => { raceRun(R, t, t0, dur, 5); flowRun(up.f, t, -20); } }; } },
        { t: T0('Z2'), chip: 0, cont: true, info: ['THE TIP NEVER STOPS', 'Axis keeps growing', 'Its tip never turns into a flower.', ''] },
        { t: T0('Z3'), chip: 1, cont: true, info: ['ONE AFTER ANOTHER', 'Flowers on the sides', 'New flowers form on the sides, going up.', ''] },
        { t: T0('Z4'), chip: 2, cont: true, info: ['TOWARDS THE TIP', 'Acropetal', 'Oldest flowers at the bottom, youngest buds at the top.', ''] },
        { t: T0('Z5'), chip: 3, info: ['EXAMPLE', 'Mustard', 'Open flowers sit below, buds sit above.', ''], b: g => {
            leaf(g, 528, 470, 120, -20, { w: 0.4, ven: 'net' }); leaf(g, 528, 440, 110, -160, { w: 0.4, ven: 'net' });
            const R = raceme(g, 528, 500, 430, 9, 1.05); raceStatic(R, 5);
            return { labs: [[lab(g, R.it[1].px - 26, R.it[1].py, 280, 380, 'Open flowers', 'end'), wt('Z5', 'open') - 0.1], [lab(g, R.it[8].px + 10, R.it[8].py, 760, 80, 'Buds'), wt('Z5', 'buds') - 0.1]], els: [[R.g, T0('Z5') + 0.2, { dy: 20 }]] }; } }],
      av: { who: 'Diya', text: 'Oldest at the bottom!', tin: wt('Z5', 'buds') + 0.3, tout: T0('P1') - 0.4 } },
    { key: 'P', t0: T0('P1'), tEnd: T0('C1'), chips: ['TIP BECOMES A FLOWER', 'SIDE BRANCHES', 'BASIPETAL', 'JASMINE'],
      lv: [
        { t: T0('P1') + 0.2, chip: 0, info: ['TYPE TWO', 'Cymose', 'Watch the tip this time.', ''], b: g => {
            const R = cyme(g, 528, 500, 380, 1.1), tA = T0('P1') + 0.5, tT = wt('P2', 'flower') - 0.2, t2 = wt('P3', 'side') - 0.2, t3 = wt('P3', 'below');
            const dn = arrowV(g, 840, 130, 440), ag = [ageTag(g, 528 + 52, R.yt - 30, 1), ageTag(g, R.pairs[0][1].fx + 50, R.pairs[0][1].fy, 2), ageTag(g, R.pairs[1][1].fx + 50, R.pairs[1][1].fy, 3)];
            const stop = grp(g); mk(stop, 'rect', { x: 256, y: 104, width: 170, height: 38, rx: 8, fill: '#FBE3E1' }); tag(stop, 341, 129, 'GROWTH STOPS', C.bad || '#C0392B', 15);
            return { labs: [[lab(g, 528, 380, 300, 420, 'Main axis', 'end'), wt('P2', 'axis') - 0.1]],
              els: [[stop, wt('P2', 'limited') - 0.2, POP], [ag[0], wt('P4', 'oldest'), POP], [ag[1], wt('P4', 'younger'), POP], [ag[2], wt('P4', 'younger') + 0.3, POP], [dn, wt('P4', 'basipetal') - 0.3, { dy: -10 }], [tag(g, 930, 300, 'BASIPETAL', C.ac, 17), wt('P4', 'basipetal'), { dy: 6 }]],
              anim: t => { M.draw(R.axis, t, tA, 1.2); M.vis(R.T.bd, t, tA + 1.0, tT, { ...POP, sc: 0.3, outDur: 0.2 }); M.vis(R.T.bl, t, tT, 1e9, { ...POP, sc: 0.4 });
                R.pairs.forEach((pr, k) => { const ts = k ? t3 : t2; pr.forEach(q => { M.draw(q.ped, t, ts, 0.4); M.vis(q.bd, t, ts + 0.3, k ? 1e9 : ts + 2.4, { ...POP, sc: 0.3, outDur: 0.2 }); if (k) q.bl.style.opacity = 0; else M.vis(q.bl, t, ts + 2.4, 1e9, { ...POP, sc: 0.4 }); }); });
                flowRun(dn.f, t, -20); } }; } },
        { t: T0('P2'), chip: 0, cont: true, info: ['LIMITED GROWTH', 'Axis ends in a flower', 'Once the tip is a flower, the axis cannot grow longer.', ''] },
        { t: T0('P3'), chip: 1, cont: true, info: ['BELOW THE FIRST FLOWER', 'Side branches', 'New flowers come from side branches below it.', ''] },
        { t: T0('P4'), chip: 2, cont: true, info: ['TOWARDS THE BASE', 'Basipetal', 'The oldest flower is at the top, younger ones below.', ''] },
        { t: T0('P5'), chip: 3, info: ['EXAMPLE', 'Jasmine', 'The middle flower opens first, then the ones at its sides.', ''], b: g => {
            leaf(g, 528, 470, 130, -24, { w: 0.42, ven: 'net' }); leaf(g, 528, 470, 130, -156, { w: 0.42, ven: 'net' });
            const R = cyme(g, 528, 500, 360, 1.15); R.T.bd.style.opacity = 0; R.pairs[1].forEach(q => q.bl.style.opacity = 0);
            const tS = wt('P5', 'sides'); R.pairs[0].forEach(q => { q.bl.style.opacity = 0; });
            return { labs: [[lab(g, 528 - 30, R.yt, 300, 90, 'Opens first', 'end'), wt('P5', 'middle') - 0.1], [lab(g, R.pairs[0][1].fx + 26, R.pairs[0][1].fy, 800, 200, 'Open later'), tS - 0.1]],
              els: [[R.g, T0('P5') + 0.2, { dy: 20 }]], anim: t => R.pairs[0].forEach(q => { const k = t >= tS; q.bd.style.opacity = k ? 0 : 1; M.vis(q.bl, t, tS, 1e9, { ...POP, sc: 0.4 }); }) }; } }] }],
  V: { h0: 'Racemose · mustard', h1: 'Cymose · jasmine', tH: [wt('C1', 'two') - 0.1, wt('C1', 'two') + 0.3],
    rows: [['Flowers', 'Many on one axis', 'Many on one axis', 1, wt('C2', 'many'), wt('C2', 'many') + 0.3], ['Main axis', 'Keeps growing', 'Ends in a flower', 0, wt('C3', 'keeps'), wt('C3', 'ends')],
      ['Oldest flower', 'At the base', 'At the top', 0, wt('C3', 'base'), wt('C3', 'top')], ['Order', 'Acropetal', 'Basipetal', 0, wt('C3', 'base') + 0.5, wt('C3', 'top') + 0.5]],
    think: { q: 'The biggest open flower sits at the very tip, with small buds below it. Racemose or cymose?', opts: ['Racemose', 'Cymose'], right: 1, why: 'Cymose. The tip became the first, oldest flower.' },
    tOpts: wt('C4', 'Racemose') - 0.1, tWhy: wt('C5', 'The') - 0.2 },
  stmt: { st2: 'Find the <span class="acc">oldest</span> flower.', st2T: wt('T1', 'Racemose') - 0.3, stF: `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">oldest at the base: <b style="color:${MUSD}">racemose</b> · oldest at the top: <b style="color:${STEM}">cymose</b></span>`, stFT: wt('T1', 'Cymose') - 0.1 },
  Wk: { label: 'WORKED EXAMPLE · SORT THE CLUES', clues: [['Open flowers at the bottom, buds at the top', 0, 'W2'], ['The main axis ends in a flower', 1, 'W3'], ['Flowers made one by one towards the tip', 0, 'W4'], ['The middle flower opened first', 1, 'W5']],
    targets: ['Racemose', 'Cymose'], tY: [142, 374] },
  trap: { wrong: 'Acropetal: the oldest flower is at the tip', right: 'Acropetal: made towards the tip, so the oldest is at the base', tWrong: wt('X2', 'acropetal') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'made') - 0.1,
    draw: s => { const R = raceme(s, 150, 258, 230, 5, 0.6); raceStatic(R, 3);
      const ta = grp(s); mk(ta, 'rect', { x: 250, y: 30, width: 150, height: 34, rx: 8, fill: C.okBg }); tag(ta, 325, 53, 'YOUNGEST', C.ok);
      const tb = grp(s); mk(tb, 'rect', { x: 250, y: 214, width: 150, height: 34, rx: 8, fill: C.okBg }); tag(tb, 325, 237, 'OLDEST', C.ok);
      return { els: [[R.g, wt('X3', 'made') - 0.1, { ...POP, sc: 0.6 }], [ta, wt('X3', 'youngest') - 0.1, POP], [tb, wt('X3', 'oldest') - 0.1, POP]] }; } },
  where: { type: 'Statements on the main axis and flower order, or labelled diagrams', tType: wt('E1', 'statements') },
  mcq: { pat: 'NEET PATTERN · STATEMENT BASED', qW: 900,
    q: 'Which statements are true for racemose inflorescence?<div class="sl"><b>I</b>The main axis ends in a flower.</div><div class="sl"><b>II</b>The main axis continues to grow.</div><div class="sl"><b>III</b>Flowers are borne laterally in acropetal order.</div><div class="sl"><b>IV</b>Flowers are borne in basipetal order.</div>',
    opts: ['I and II only', 'II and III only', 'I and IV only', 'II, III and IV only'], right: 1, optW: 474, optY: 392, optFs: 28 },
  tOpts: wt('Q1', 'Which') - 0.2,
  so: [['Answer: <b style="color:var(--ok)">B</b>'], ['II and III are correct'], ['Axis grows, acropetal order'], ['I and IV describe cymose']],
  tSo: [wt('A1', 3) + 0.1, wt('A1', 'Statements'), wt('A2', 'continues'), wt('A3', 'basipetal')],
  fc: { title: 'Recap · inflorescence', lines: ['<b>Flower</b>: a modified shoot · shoot apical meristem becomes a floral meristem', '<b>Inflorescence</b>: the arrangement of flowers on the floral axis',
    '<b>Racemose</b>: axis keeps growing · flowers on the sides · acropetal, oldest at the base', '<b>Cymose</b>: axis ends in a flower · limited growth · basipetal, oldest at the top', '<b>Examples</b>: mustard (racemose) · jasmine (cymose)'] },
  Y: ['In which type does the main axis end in a flower?', 'Where is the oldest flower in a racemose inflorescence?', 'What does basipetal order mean?'],
  next: { label: 'NEXT · EP 44', topic: 'One cut, two matching halves: The Flower' },
  cam: [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('Z4', 'oldest') - 0.3, 1.05, 960, 580], [T0('Z5') - 0.2, 1, 960, 540]],
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
