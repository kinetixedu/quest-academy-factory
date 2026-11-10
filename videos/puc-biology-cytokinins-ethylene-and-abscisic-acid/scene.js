// PUC Biology Ep 94: Cytokinins, Ethylene and Abscisic Acid (Living diagram, leaf green). Runner: ep.js + bio9.js + pg13.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, hex, pent, axes } = B9;
const G = PG.K;
// batch colours (Eps 93-94): auxin rose, gibberellin blue, cytokinin teal, ethylene gold, ABA violet
const CK = '#2A9D8F', ETH = '#E2B33C', ABA = '#8E5BB5', RAW = '#8CC48F', RIPE = '#F2CF4A';
const ICN = { box: ['M3 8l9-5 9 5v8l-9 5-9-5Z', 'M3 8l9 5 9-5', 'M12 13v8'], seed: ['M12 4c5 3 6 9 0 16c-6-7-5-13 0-16Z', 'M12 8v8'] };
const S = [];
const dots = (g, n, f, r = 6) => Array.from({ length: n }, () => circ(g, -50, -50, r, f, K.ink, 1.5));
const flow = (ds, path, a, sp, t) => ds.forEach((d, j) => { const u = ((t - a) * sp + j / ds.length) % 1, q = PG.along(path(j), u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });
const mixC = (a, b, v) => { const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)); const A = h(a), B = h(b); return '#' + A.map((x, i) => Math.round(x + (B[i] - x) * M.clamp(v)).toString(16).padStart(2, '0')).join(''); };
const banana = (g, x, y, s = 1, f = RAW) => { const q = mk(g, 'g', {}); const b = P(q, `M${x - 50 * s},${y} C${x - 30 * s},${y + 34 * s} ${x + 30 * s},${y + 34 * s} ${x + 50 * s},${y} C${x + 30 * s},${y + 18 * s} ${x - 30 * s},${y + 18 * s} ${x - 50 * s},${y} Z`, f, '#6B5A1E', 3); P(q, `M${x + 50 * s},${y} l${8 * s},${-8 * s}`, 'none', '#6B5A1E', 4); q.b = b; return q; };
const stoma = (g, x, y, s, open) => { const q = mk(g, 'g', {}); const L = P(q, '', '#9FD39F', '#2F6B3A', 3 * Math.max(1, s * 0.6)), R = P(q, '', '#9FD39F', '#2F6B3A', 3 * Math.max(1, s * 0.6)), pore = mk(q, 'ellipse', { cx: x, cy: y, rx: 0, ry: 30 * s, fill: '#3B3A35' });
  const set = o => { const w = 6 + 10 * o; attr(L, 'd', `M${x},${y - 40 * s} C${x - 46 * s},${y - 40 * s} ${x - 46 * s},${y + 40 * s} ${x},${y + 40 * s} C${x - w * s},${y + 20 * s} ${x - w * s},${y - 20 * s} ${x},${y - 40 * s} Z`); attr(R, 'd', `M${x},${y - 40 * s} C${x + 46 * s},${y - 40 * s} ${x + 46 * s},${y + 40 * s} ${x},${y + 40 * s} C${x + w * s},${y + 20 * s} ${x + w * s},${y - 20 * s} ${x},${y - 40 * s} Z`); attr(pore, 'rx', (w * 0.7 * s).toFixed(1)); attr(pore, 'ry', (26 * s * (0.3 + 0.7 * o)).toFixed(1)); };
  set(open); q.set = set; return q; };

/* ---------- H: the banana box ---------- */
S.push(EP.hook({ label: 'THE KITCHEN · ONE CLOSED BOX', face: 'diya', pill: ['The raw ones ripen faster', ['H1', 'faster', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['What passes from ripe to raw?', ['H3', 'what']], ['What tells a plant to wait?', ['H3', 'stop']]],
  a: [['ANSWER 1', 'A gas: ethylene', ['H4', 'gas']], ['ANSWER 2', 'Abscisic acid, the stop signal', ['H4', 'abscisic']]],
  chips: [['Cytokinins', ['H5', 'cytokinins']], ['Ethylene', ['H5', 'ethylene']], ['Abscisic acid', ['H5', 'abscisic']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 430, width: 784, height: 150, fill: '#9E7B55' });
    P(s, 'M120,180 L660,180 L660,430 L120,430 Z', '#E9D3A8', '#7A5A2E', 4); P(s, 'M120,180 L200,120 L740,120 L660,180 Z', '#F3E2C0', '#7A5A2E', 4); P(s, 'M660,180 L740,120 L740,370 L660,430 Z', '#D9BE8C', '#7A5A2E', 4);
    const rp = mk(s, 'g', {}); banana(rp, 230, 330, 1.3, RIPE); [0, 1, 2].forEach(k => circ(rp, 205 + k * 24, 344, 4, '#6B4A1E', '#6B4A1E', 1)); cap(rp, 230, 405, 'RIPE', { fill: K.ink });
    const raw = [banana(s, 480, 300, 1.2), banana(s, 500, 350, 1.2)]; const rc = cap(s, 490, 405, 'RAW', { fill: K.ink }); const gd = dots(s, 5, ETH, 7);
    return { els: [[rp, ['H1', 'ripe', -0.2], { ...POP, sc: 0.6 }]], anim: t => { const a = tm(['H3', 'tried']); flow(gd, j => [[260, 320], [360, 260 + j * 12], [470, 320]], a, 0.35, t); const v = M.io((t - a - 2) / 5); raw.forEach(b => attr(b.b, 'fill', mixC(RAW, RIPE, v))); rc.textContent = v > 0.7 ? 'RIPENING' : 'RAW'; } };
  } }));

/* ---------- B: cytokinin discovery ---------- */
S.push({ id: 'B', from: 'B1', to: 'C1', cards: [{ pos: 'W', label: 'CYTOKININS · HOW THEY WERE FOUND', build: (el, s) => {
  const dish = (x, extra) => { const q = mk(s, 'g', {}); mk(q, 'ellipse', { cx: x, cy: 330, rx: 150, ry: 50, fill: '#EEF5F4', stroke: K.ink, 'stroke-width': 3 }); mk(q, 'rect', { x: x - 40, y: 300, width: 80, height: 30, rx: 8, fill: G.stem, stroke: G.leafS, 'stroke-width': 2.5 }); cap(q, x, 420, extra ? 'AUXIN + SOMETHING EXTRA' : 'AUXIN ONLY', { fill: K.ink }); return q; };
  const d1 = dish(190, 0), d2 = dish(560, 1); const r1 = mk(s, 'g', {}); PG.cross(r1, 190, 230, 16); cap(r1, 190, 200, 'NO CALLUS', { fill: K.red });
  const cl = mk(s, 'g', {}), blobs = Array.from({ length: 14 }, (_, k) => circ(cl, 560 + (k % 5 - 2) * 22 + (Math.floor(k / 5) % 2) * 11, 296 - Math.floor(k / 5) * 20, 13, '#F3F7EA', G.wallS, 2));
  const cc = cap(s, 560, 200, 'CALLUS GROWS', { fill: C.ac }); const ex = ['Yeast extract', 'Coconut milk', 'DNA'].map((n, i) => [div(el, 'chp', { left: 400 + i * 0 + 'px', top: 456 + 'px' }, n), ['B2', ['yeast', 'coconut', 'DNA'][i]]]);
  ex.forEach(([e], i) => { e.style.left = [376, 556, 724][i] + 'px'; });
  const rows = [['Kinetin', 'promotes cytokinesis: one cell splits into two', ['B3', 'kinetin']], ['A modified adenine', 'from heated herring sperm DNA', ['B4', 'modified']], ['Not found in plants', 'kinetin does not occur naturally', ['B4', 'naturally']], ['Zeatin: natural', 'found in corn kernels and coconut milk', ['B4', 'zeatin']]]
    .map(([a, b, sp], i) => [div(el, 'rw', { left: '860px', width: '700px', top: 84 + i * 100 + 'px' }, `<div class="rn">${a}</div><div class="rd">${b}</div>`), sp]);
  const tg = div(el, 'tb', { left: '36px', top: '84px' }, 'TOBACCO STEM PIECES · F. SKOOG AND CO-WORKERS');
  return { els: [[tg, ['B2', 'tobacco', -0.2], { dy: 8 }], [d1, ['B2', 'tobacco'], { dy: 12 }], [d2, ['B2', 'tobacco', 0.15], { dy: 12 }], [r1, ['B2', 'only'], POP], [cc, ['B2', 'extra']], ...ex.map(([e, sp]) => [e, [...sp, -0.1], { dy: 8 }]), ...rows.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const a = tm(['B2', 'extra']); blobs.forEach((b, k) => b.style.opacity = t > a + k * 0.15 ? 1 : 0); } }; } }] });

/* ---------- C: what cytokinins do ---------- */
S.push({ id: 'C', from: 'C1', to: 'G1', cards: [{ pos: 'W', label: 'CYTOKININS · WHERE AND WHAT', build: (el, s) => {
  mk(s, 'rect', { x: 2, y: 450, width: 520, height: 126, rx: 14, fill: G.soilL }); P(s, 'M260,450 L260,130', 'none', G.stem, 8); PG.leaf(s, 260, 130, 50, -120); PG.leaf(s, 260, 130, 50, -60); P(s, 'M260,300 Q300,290 340,250', 'none', G.stem, 5); circ(s, 352, 238, 18, '#9FD39F', G.leafS, 3);
  PG.leaf(s, 260, 380, 60, -160); PG.leaf(s, 260, 340, 60, -20); [[230, 540], [290, 550]].forEach(([x, y]) => P(s, `M260,450 Q${(x + 260) / 2},${y - 40} ${x},${y}`, 'none', G.rootS, 4));
  const sites = [[[230, 540], [290, 550]], [[260, 124]], [[352, 238]]].map((pts, i) => { const q = mk(s, 'g', {}); pts.forEach(([x, y]) => { const r = circ(q, x, y, 18, 'none', CK, 4); }); return [q, ['C1', ['root', 'shoot', 'fruits'][i], -0.1]]; });
  const sl = [cap(s, 140, 560, 'ROOT TIPS', { fill: CK }), cap(s, 150, 110, 'SHOOT BUDS', { fill: CK }), cap(s, 440, 236, 'YOUNG FRUITS', { fill: CK })];
  const lv = mk(s, 'g', {}); const l1 = PG.leaf(lv, 560, 330, 110, -90), l2 = PG.leaf(lv, 700, 330, 110, -90); cap(lv, 560, 370, 'WITH CYTOKININ', { fill: CK, 'font-size': 13 }); cap(lv, 700, 370, 'WITHOUT', { fill: K.ink, 'font-size': 13 });
  const rows = [['New leaves, chloroplasts', ['C2', 'leaves']], ['Side and adventitious shoots', ['C2', 'side']], ['Overcome apical dominance', ['C3', 'apical']], ['Delay leaf senescence', ['C3', 'delays']]].map(([n, sp], i) => [div(el, '', { position: 'absolute', left: '820px', top: 84 + i * 96 + 'px', width: '740px', height: '80px', borderRadius: '14px', background: 'var(--soft)', display: 'flex', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box', font: '700 28px Poppins', whiteSpace: 'nowrap' }, n), sp]);
  return { els: [...sites.map(([q, sp]) => [q, sp, { ...POP, sc: 0.4 }]), ...sl.map((e, i) => [e, sites[i][1]]), [lv, ['C3', 'delays', -0.3], { dy: 12 }], ...rows.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const v = M.io((t - tm(['C3', 'senescence'])) / 2); l2.querySelector('path').setAttribute('fill', mixC(G.leaf, '#E8C85A', v)); } }; } }] });

/* ---------- E: ethylene intro ---------- */
S.push({ id: 'E', from: 'G1', to: 'L1', cards: [{ pos: 'W', label: 'ETHYLENE · A SIMPLE GAS', build: (el, s) => {
  const cr = mk(s, 'g', {}); mk(cr, 'rect', { x: 60, y: 200, width: 640, height: 230, rx: 10, fill: '#E9D3A8', stroke: '#7A5A2E', 'stroke-width': 4 }); cap(cr, 380, 470, 'A STORE · H. H. COUSINS', { fill: K.ink });
  const or = mk(s, 'g', {}); [0, 1, 2].forEach(k => circ(or, 140 + k * 60, 360 - (k % 2) * 30, 30, '#F39C3A', '#A35A12', 3)); cap(or, 200, 300 - 30, 'RIPE ORANGES', { fill: '#A35A12' });
  const bn = [banana(s, 520, 330, 1.2), banana(s, 560, 380, 1.2)]; const bc = cap(s, 540, 270, 'RAW BANANAS', { fill: K.ink }); const gd = dots(s, 6, ETH, 7);
  const mo = mk(s, 'g', {}); circ(mo, 1050, 230, 34, '#3B3A35', K.ink, 2); circ(mo, 1170, 230, 34, '#3B3A35', K.ink, 2); P(mo, 'M1084,222 L1136,222 M1084,238 L1136,238', 'none', K.ink, 5); T(mo, 1050, 240, 'C', 28, '#FFFFFF'); T(mo, 1170, 240, 'C', 28, '#FFFFFF');
  [[990, 170], [990, 290], [1230, 170], [1230, 290]].forEach(([x, y]) => { P(mo, `M${x < 1100 ? 1050 : 1170},230 L${x},${y}`, 'none', K.ink, 4); circ(mo, x, y, 22, '#FFFFFF', K.ink, 2.5); T(mo, x, y + 8, 'H', 22, K.ink); }); T(mo, 1110, 360, 'C₂H₄ · ETHYLENE', 26, '#B8860B', { 'font-family': 'IBM Plex Mono' });
  const r3 = div(el, 'rw', { left: '800px', width: '760px', top: '420px' }, '<div class="rn">Made in large amounts by</div><div class="rd">ageing tissues and ripening fruits</div>');
  return { els: [[cr, ['G2', 'Cousins', -0.2], { dy: 12 }], [or, ['G2', 'oranges', -0.1], { ...POP, sc: 0.6 }], [bn[0], ['G2', 'bananas', -0.2], { ...POP, sc: 0.6 }], [bn[1], ['G2', 'bananas', -0.1], { ...POP, sc: 0.6 }], [bc, ['G2', 'bananas']], [mo, ['G1', 'gas', -0.2], { ...POP, sc: 0.7 }], [r3, ['G3', 'ageing', -0.2], { dx: 16, dy: 0 }]],
    anim: t => { const a = tm(['G2', 'gave']); flow(gd, j => [[230, 330], [380, 250 + j * 14], [520, 340]], a, 0.4, t); const v = M.io((t - tm(['G2', 'ethylene'], 0) + 2) / 3); bn.forEach(b => attr(b.b, 'fill', mixC(RAW, RIPE, t > a ? M.io((t - a - 1) / 3) : 0))); } }; } }] });

/* ---------- L: what ethylene does ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'G4', keep: 1, cards: [
  { pos: 'L', label: 'WHAT ETHYLENE DOES · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Dicot seedlings', 'horizontal growth, swollen axis, apical hook'], ['Leaves and flowers', 'age (senescence) and fall (abscission)'], ['Fruits ripen', 'respiration rises: respiratory climacteric'], ['Dormancy broken', 'peanut seeds germinate, potato tubers sprout'], ['Deep water rice', 'stems stretch fast; more roots, root hairs']], LT) }) },
  { pos: 'R', label: 'WATCH ETHYLENE WORK', build: (el, s) => {
    const pn = [0, 1, 2, 3, 4].map(() => mk(s, 'g', {}));
    // 1 seedling with hook
    P(pn[0], 'M392,470 C392,380 380,330 360,250', 'none', G.stem, 16); P(pn[0], 'M360,250 C350,200 300,200 300,240', 'none', G.stem, 10); PG.leaf(pn[0], 300, 240, 40, 100); mk(pn[0], 'rect', { x: 0, y: 470, width: 784, height: 30, fill: G.soilL }); cap(pn[0], 300, 180, 'APICAL HOOK', { fill: K.ink }); cap(pn[0], 470, 400, 'SWOLLEN AXIS', { fill: K.ink });
    // 2 falling leaf
    P(pn[1], 'M300,470 L300,150', 'none', '#8C6D4F', 8); PG.leaf(pn[1], 300, 200, 70, -30, '#E8C85A', '#9A6B2F'); const fl = mk(pn[1], 'g', {}); PG.leaf(fl, 0, 0, 70, 0, '#D9A23B', '#9A6B2F'); cap(pn[1], 460, 460, 'ABSCISSION', { fill: K.ink });
    // 3 climacteric graph
    axes(pn[2], 110, 420, 560, 260, 'RIPENING TIME', 'RESPIRATION RATE'); const cv = P(pn[2], 'M110,380 C250,380 300,375 360,300 C400,240 430,200 470,200 C540,200 580,300 660,330', 'none', '#B8860B', 5); const bb = banana(pn[2], 560, 110, 1.1); cap(pn[2], 420, 180, 'CLIMACTERIC PEAK', { fill: '#B8860B' });
    // 4 peanut and potato
    mk(pn[3], 'ellipse', { cx: 250, cy: 330, rx: 60, ry: 36, fill: '#E3C08E', stroke: '#8C6D4F', 'stroke-width': 3 }); const sp1 = P(pn[3], '', 'none', '#FFFFFF', 7); mk(pn[3], 'ellipse', { cx: 540, cy: 330, rx: 90, ry: 60, fill: '#C9A06A', stroke: '#7A5A2E', 'stroke-width': 3 }); const sp2 = P(pn[3], '', 'none', '#9FD39F', 6); cap(pn[3], 250, 420, 'PEANUT SEED', { fill: K.ink }); cap(pn[3], 540, 420, 'POTATO TUBER', { fill: K.ink });
    // 5 deep water rice
    mk(pn[4], 'rect', { x: 120, y: 220, width: 540, height: 250, rx: 10, fill: '#D6E9F5' }); P(pn[4], 'M120,220 L660,220', 'none', '#5AA0C8', 3); const rs = P(pn[4], '', 'none', G.stem, 6), rl = P(pn[4], '', G.leaf, G.leafS, 3); cap(pn[4], 392, 500, 'LEAVES STAY ABOVE WATER', { fill: '#2E6E99' });
    return { anim: t => { const ts = LT.map(tm); let c = 0; ts.forEach((tt, i) => { if (t >= tt - 0.3) c = i; }); pn.forEach((g, i) => { g.style.opacity = i === c ? M.clamp((t - ts[i] + 0.3) / 0.4).toFixed(2) : 0; });
      const u = ((t - ts[1]) * 0.35) % 1; at(fl, 330 + 120 * u, 220 + 230 * u, 40 * Math.sin(u * 12)); fl.style.opacity = Math.min(1, 6 * (1 - u)).toFixed(2);
      PG.part(cv, M.io((t - ts[2]) / 3)); attr(bb.b, 'fill', mixC(RAW, RIPE, M.io((t - ts[2] - 0.5) / 3)));
      const g4 = M.io((t - ts[3]) / 2); attr(sp1, 'd', `M290,320 q${30 * g4},${-10 * g4} ${50 * g4},${-60 * g4}`); attr(sp2, 'd', `M600,290 q${10 * g4},${-40 * g4} ${30 * g4},${-80 * g4}`);
      const h = 120 + 200 * M.io((t - ts[4]) / 2.5); attr(rs, 'd', `M392,470 L392,${470 - h}`); attr(rl, 'd', PG.leafD(392, 470 - h, 70, -60)); } }; } }] });

/* ---------- P: ethephon ---------- */
S.push({ id: 'P', from: 'G4', to: 'K1', cards: [{ pos: 'W', label: 'ETHEPHON · THE FARM SOURCE OF ETHYLENE', build: (el, s) => {
  const bt = mk(s, 'g', {}); P(bt, 'M160,170 L220,170 L220,210 L250,240 L250,470 L130,470 L130,240 L160,210 Z', '#FBF1CF', '#B8860B', 4); mk(bt, 'rect', { x: 150, y: 140, width: 80, height: 30, rx: 6, fill: '#B8860B' }); T(bt, 190, 360, 'ETHEPHON', 18, '#7A5A0B', { 'font-family': 'IBM Plex Mono' });
  const gd = dots(s, 5, ETH, 8); const cp = cap(s, 420, 500, 'ABSORBED, THEN RELEASES ETHYLENE SLOWLY', { fill: '#7A5A0B' }); const pl = mk(s, 'g', {}); P(pl, 'M520,470 L520,220', 'none', G.stem, 7); PG.leaf(pl, 520, 300, 70, -150); PG.leaf(pl, 520, 260, 70, -30); circ(pl, 560, 360, 26, '#E8584A', '#9C2B22', 3);
  const rows = [['Ripens tomatoes and apples faster', ['G5', 'tomatoes']], ['Thins flowers and fruits: cotton, cherry, walnut', ['G5', 'thins']], ['More female flowers in cucumbers', ['G5', 'cucumbers']], ['Starts flowering in pineapple and mango', ['G5', 'pineapple']]].map(([n, sp], i) => [div(el, '', { position: 'absolute', left: '720px', top: 84 + i * 96 + 'px', width: '844px', height: '80px', borderRadius: '14px', background: 'var(--soft)', display: 'flex', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box', font: '700 27px Poppins', whiteSpace: 'nowrap' }, n), sp]);
  const tg = div(el, 'tb', { left: '720px', top: '480px', color: 'var(--ac)' }, 'THE MOST WIDELY USED REGULATOR IN FARMING');
  return { els: [[bt, ['G4', 'ethephon', -0.2], { dy: 12 }], [pl, ['G4', 'absorb', -0.2], { dy: 12 }], [cp, ['G4', 'slowly']], [tg, ['G4', 'widely', -0.1], { dy: 8 }], ...rows.map(([e, sp]) => [e, [...sp, -0.2], { dx: 16, dy: 0 }])],
    anim: t => flow(gd, j => [[190, 160], [350, 200 + j * 20], [510, 300]], tm(['G4', 'absorb']), 0.18, t) }; } }] });

/* ---------- K: ABA intro ---------- */
S.push({ id: 'K', from: 'K1', to: 'Z1', cards: [{ pos: 'W', label: 'ABSCISIC ACID (ABA) · THE STOP SIGNAL', build: (el, s) => {
  const ch = ['Inhibitor-B', 'Abscission II', 'Dormin'].map((n, i) => { const q = mk(s, 'g', {}); mk(q, 'rect', { x: 50, y: 100 + i * 90, width: 240, height: 64, rx: 12, fill: '#F1EAF7', stroke: ABA, 'stroke-width': 2.5 }); T(q, 170, 141 + i * 90, n, 24, K.ink); arrow(q, 300, 132 + i * 90, 420, 222, ABA, 3); return [q, ['K2', ['inhibitor', 'abscission', 'dormin'][i], -0.1]]; });
  const ab = mk(s, 'g', {}); mk(ab, 'rect', { x: 430, y: 186, width: 300, height: 76, rx: 14, fill: ABA, stroke: K.ink, 'stroke-width': 3 }); T(ab, 580, 234, 'Abscisic acid', 28, '#FFFFFF'); cap(ab, 580, 300, 'ALL THREE: THE SAME CHEMICAL', { fill: ABA });
  const tg = div(el, 'tb', { left: '50px', top: '72px' }, 'MID 1960s · THREE TEAMS');
  const sd = mk(s, 'g', {}); mk(sd, 'ellipse', { cx: 380, cy: 450, rx: 46, ry: 28, fill: '#E3C08E', stroke: '#8C6D4F', 'stroke-width': 3 }); PG.cross(sd, 380, 395, 14); cap(sd, 380, 520, 'NO GERMINATION', { fill: K.red });
  const rows = [['General growth inhibitor', ['K3', 'general']], ['Stops seed germination', ['K3', 'germinating']], ['Seed development, maturation, dormancy', ['K3', 'develop']], ['Dormant seeds survive drying out', ['K3', 'drying']]].map(([n, sp], i) => [div(el, '', { position: 'absolute', left: '800px', top: 84 + i * 96 + 'px', width: '760px', height: '80px', borderRadius: '14px', background: 'var(--soft)', display: 'flex', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box', font: '700 27px Poppins', whiteSpace: 'nowrap' }, n), sp]);
  return { els: [[tg, ['K2', 'mid', -0.1], { dy: 8 }], ...ch.map(([q, sp]) => [q, sp, { dx: -16, dy: 0 }]), [ab, ['K2', 'same', -0.2], { ...POP, sc: 0.6 }], [sd, ['K3', 'germinating', -0.2], { dy: 10 }], ...rows.map(([e, sp]) => [e, [...sp, -0.2], { dx: 16, dy: 0 }])] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'V1', names: ['LEAF', 'STOMATA', 'GUARD CELLS'], scales: ['x1', 'x100', 'x400'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The leaf', 'Tiny pores on the underside.', 'Water vapour escapes here.'], ['RUNG 2 OF 3', 'Stomata', 'Many pores in the leaf skin.', 'Each between two guard cells.'], ['RUNG 3 OF 3', 'One stoma', 'ABA makes it close.', 'The stress hormone.']],
  av: { who: 'Diya', text: 'So ABA saves water!', tin: ['Z4', 'stress', 0.3], tout: ['V1', null, -0.1] },
  rungs: [
    { focus: [600, 230, 40], build: g => { PG.leaf(g, 180, 263, 700, 0); for (let k = 0; k < 40; k++) { const x = 300 + (k * 97) % 460, y = 200 + (k * 53) % 130; mk(g, 'ellipse', { cx: x, cy: y, rx: 5, ry: 3, fill: '#2F6B3A' }); }
      return { labs: [[lab(g, 600, 230, 760, 90, 'Stomata (tiny pores)'), ['Z2', 'stomata']]] }; } },
    { at: 'Z3', focus: [528, 263, 70], build: g => { for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) P(g, `M${40 + c * 130 + (r % 2) * 60},${20 + r * 110} l120,0 l20,50 l-20,50 l-120,0 l-20,-50 Z`, '#EAF3E2', G.leafS, 2.5);
      const st = [[528, 263], [210, 140], [820, 400], [300, 420], [780, 120]].map(([x, y]) => stoma(g, x, y, 0.8, 1));
      return { labs: [[lab(g, 528, 263, 760, 330, 'Stoma (pore)'), ['Z3', 'pore']], [lab(g, 500, 240, 300, 300, 'Guard cells', 'end'), ['Z3', 'guard']]] }; } },
    { at: 'Z4', build: g => { const st = stoma(g, 528, 270, 3.2, 1); const ad = dots(g, 6, ABA, 9), wd = dots(g, 4, '#D6E9F5', 9);
      return { labs: [[lab(g, 420, 200, 200, 90, 'Guard cell', 'end'), ['Z4', 'stomata']], [lab(g, 528, 300, 760, 470, 'Pore closes'), ['Z4', 'close']]],
        anim: t => { const a = tm(['Z4', 'ABA']), c = M.io((t - tm(['Z4', 'close'])) / 1.2); st.set(1 - c); flow(ad, j => [[60 + j * 30, 500], [380 + j * 10, 380]], a, 0.5, t); flow(wd, j => [[528, 300], [500 + j * 20, 20]], tm('Z4') - 1, 0.5, t); wd.forEach(d => { d.style.opacity = (parseFloat(d.style.opacity || 0) * (1 - c)).toFixed(2); }); } }; } }] }));

/* ---------- V: ethylene vs ABA + think ---------- */
const TH = { q: 'A plant is short of water. Which regulator closes its stomata?', opts: ['Ethylene', 'Abscisic acid'], right: 1, why: 'ABA. It closes the stomata to save water: the stress hormone.' };
S.push({ id: 'V', from: 'V1', to: 'T1', cards: [
  { pos: 'L', label: 'ETHYLENE · BREAKS DORMANCY', tout: 'V4', pill: ['Peanut seeds germinate', ['V2', 'peanut', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 2, y: 380, width: 780, height: 196, rx: 14, fill: G.soilL }); mk(s, 'ellipse', { cx: 392, cy: 360, rx: 70, ry: 42, fill: '#E3C08E', stroke: '#8C6D4F', 'stroke-width': 3 }); const rt = P(s, '', 'none', '#FFFFFF', 7), sh = P(s, '', 'none', G.stem, 7), lf = P(s, '', G.leaf, G.leafS, 3); const gd = dots(s, 4, ETH, 7);
    return { anim: t => { const a = tm(['V2', 'breaks']), g = M.io((t - a) / 2.5); attr(rt, 'd', `M430,380 q20,${40 * g} 10,${110 * g}`); attr(sh, 'd', `M392,320 L392,${320 - 160 * g}`); attr(lf, 'd', g > 0.4 ? PG.leafD(392, 320 - 160 * g, 60 * g, -45) : ''); flow(gd, j => [[150 + j * 30, 150], [370, 330]], a - 0.5, 0.4, t); } }; } },
  { pos: 'R', label: 'ABA · KEEPS SEEDS DORMANT', tin: ['V3', null, -0.2], tout: 'V4', pill: ['ABA works against gibberellins', ['V3', 'against', -0.1], 'ac'], build: (el, s) => {
    mk(s, 'rect', { x: 2, y: 380, width: 780, height: 196, rx: 14, fill: G.soilL }); mk(s, 'ellipse', { cx: 392, cy: 360, rx: 70, ry: 42, fill: '#E3C08E', stroke: '#8C6D4F', 'stroke-width': 3 }); const ad = dots(s, 4, ABA, 7);
    const lk = mk(s, 'g', {}); mk(lk, 'rect', { x: 360, y: 210, width: 64, height: 50, rx: 8, fill: ABA, stroke: K.ink, 'stroke-width': 3 }); P(lk, 'M372,210 L372,190 C372,166 412,166 412,190 L412,210', 'none', K.ink, 5); cap(lk, 392, 160, 'DORMANT', { fill: ABA });
    return { els: [[lk, ['V3', 'dormant', -0.2], { ...POP, sc: 0.5 }]], anim: t => flow(ad, j => [[150 + j * 30, 150], [370, 330]], tm(['V3', 'ABA']), 0.4, t) }; } },
  EP.think(TH, { tin: 'V4', opts: ['V4', 'Which', -0.1], why: ['V5', 'closes'] })] });

/* ---------- W: pick the regulator ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · PICK THE REGULATOR', svg: false, build: el => EP.cols(el, [
  ['JOB 1 · KEEP LEAVES GREEN', 'A cytokinin', 'DELAYS LEAF SENESCENCE', s => { PG.leaf(s, 70, 150, 150, 0); PG.leaf(s, 270, 150, 150, 0, '#E8C85A', '#9A6B2F'); cap(s, 145, 260, 'WITH', { fill: CK }); cap(s, 345, 260, 'WITHOUT', { fill: K.ink }); }, ['W2', 'Job', -0.2], ['W2', 'Use'], ['W2', 'delays']],
  ['JOB 2 · RIPEN TOMATOES', 'Spray ethephon', 'IT RELEASES ETHYLENE', s => { P(s, 'M70,110 L110,110 L110,130 L130,150 L130,250 L50,250 L50,150 L70,130 Z', '#FBF1CF', '#B8860B', 3); [0, 1, 2].forEach(k => circ(s, 260 + k * 70, 190 - (k % 2) * 30, 32, '#E8584A', '#9C2B22', 3)); dots(s, 0, ETH); [0, 1, 2, 3].forEach(k => circ(s, 160 + k * 18, 140 - k * 8, 6, ETH, K.ink, 1.5)); }, ['W3', 'Job', -0.2], ['W3', 'Spray'], ['W3', 'releases']],
  ['JOB 3 · DROUGHT', 'ABA at work', 'STOMATA CLOSE, LESS WATER LOST', s => { stoma(s, 248, 145, 1.6, 0); [0, 1, 2].forEach(k => circ(s, 120 + k * 20, 230, 6, ABA, K.ink, 1.5)); }, ['W4', 'Job', -0.2], ['W4', 'ABA'], ['W4', 'closes']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['box', 'A banana box', 'RIPENS FASTER', ['H1', 'box']], ['leaf', 'A leaf on a dry day', 'SHUTS ITS PORES', ['H2', 'leaf']], ['seed', 'A sleeping seed', 'WAITS FOR MONTHS', ['H2', 'seeds']]],
  scenes: S,
  stmt: { l2: 'Ethylene <span class="acc">ripens</span>. ABA says wait.', f: '<span class="lad">cytokinin: divide, stay green · ethylene: ripen, fall · <b>ABA: close stomata, stay dormant</b></span>', t2: ['T1', 'Ethylene', -0.2], tf: ['T1', 'ABA'] },
  trap: { wrong: 'Kinetin is a natural plant hormone', right: 'Kinetin does not occur naturally in plants; zeatin is natural', tWrong: ['X2', 'kinetin', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'naturally', -0.2], tSvg: ['X3', 'Zeatin', -0.4],
    build: s => { hex(s, 150, 130, 30, '#FFFFFF', CK); pent(s, 202, 128, 28, '#FFFFFF', CK); cap(s, 175, 200, 'KINETIN · LAB', { 'font-size': 14 }); hex(s, 330, 130, 30, '#FFFFFF', C.ac); pent(s, 382, 128, 28, '#FFFFFF', C.ac); cap(s, 355, 200, 'ZEATIN · NATURAL', { 'font-size': 14, fill: C.ac }); } },
  where: { type: 'Statement and match questions: uses of ethylene, ethephon, ABA and cytokinins', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Ethylene promotes female flowers in cucumbers.<br>II. ABA promotes seed germination.<br>III. Ethephon releases ethylene slowly in the plant.<br>IV. ABA acts as an antagonist to gibberellins.</div>', opts: ['I and II only', 'I, III and IV only', 'II, III and IV only', 'I, II, III and IV'], right: 1 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">B</b>', ['A1', 3, 0.1]], ['I: female flowers in cucumbers', ['A2', 'female']], ['III: ethephon releases it slowly', ['A2', 'Ethephon']], ['IV: ABA works against GAs', ['A2', 'works']], ['II wrong: ABA stops germination', ['A3', 'inhibits']]],
  recap: { title: 'Recap · cytokinins, ethylene, ABA', lines: ['<b>Cytokinins</b>: kinetin (not natural), zeatin · cell division, delay senescence', '<b>Ethylene</b>: a gas · ripening, respiratory climacteric, abscission', '<b>Ethephon</b>: releases ethylene · ripens tomatoes, more female cucumber flowers', '<b>ABA</b>: growth inhibitor · closes stomata, seed dormancy · stress hormone', '<b>ABA vs gibberellins</b>: in most cases they act against each other'] },
  yq: ['What is the respiratory climacteric?', 'Why is ABA called the stress hormone?', 'Where are natural cytokinins made?'],
  next: { label: 'NEXT · EP 95', topic: 'Photoperiodism, Vernalisation and Seed Dormancy' }
});
})();
