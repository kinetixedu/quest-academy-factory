// PUC Biology Ep 96: Respiratory Organs and the Human Respiratory System (Living diagram, leaf green). Runner: ep.js + resp14.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, o2, co2, rbc, alveoli, chest, tree, lungD } = R14;
const ICN = { mirror: ['M12 3a6 8 0 1 0 .1 0', 'M12 19v3', 'M8 22h8'], fish: ['M3 12c3-5 9-6 14-2l4-3v10l-4-3c-5 4-11 3-14-2Z', 'M8 11h.01'], worm: ['M3 15c2-4 4 4 6 0s4 4 6 0 4 4 6 0'] };
const S = [];
// wavy earthworm
const worm = (g, x, y, n = 9, s = 1) => { const G = mk(g, 'g', {}); for (let k = 0; k < n; k++) mk(G, 'ellipse', { cx: x + k * 22 * s, cy: y + 8 * Math.sin(k * 0.9) * s, rx: 14 * s, ry: 11 * s, fill: '#E4A0A0', stroke: '#9C4A5A', 'stroke-width': 2.5 }); return G; };
const fishD = (x, y, s = 1) => `M${x - 60 * s},${y} C${x - 30 * s},${y - 34 * s} ${x + 30 * s},${y - 34 * s} ${x + 50 * s},${y} C${x + 30 * s},${y + 34 * s} ${x - 30 * s},${y + 34 * s} ${x - 60 * s},${y} Z M${x + 46 * s},${y} L${x + 80 * s},${y - 24 * s} L${x + 80 * s},${y + 24 * s} Z`;
const insect = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); mk(G, 'ellipse', { cx: x, cy: y, rx: 90 * s, ry: 36 * s, fill: '#C9A27A', stroke: '#6B4A2B', 'stroke-width': 3 }); circ(G, x - 100 * s, y, 22 * s, '#B88A5E', '#6B4A2B', 3);
  [-50, -10, 30].forEach(dx => { P(G, `M${x + dx * s},${y + 30 * s} l${-14 * s},${36 * s}`, 'none', '#6B4A2B', 3); P(G, `M${x + dx * s},${y - 30 * s} l${-14 * s},${-36 * s}`, 'none', '#6B4A2B', 3); });
  P(G, `M${x - 70 * s},${y} L${x + 70 * s},${y}`, 'none', K.o2, 4); [-50, -20, 10, 40].forEach(dx => P(G, `M${x + dx * s},${y} l${10 * s},${-24 * s} M${x + dx * s},${y} l${10 * s},${24 * s}`, 'none', K.o2, 3)); return G; };

/* ---------- H: mirror, fish, earthworm ---------- */
S.push(EP.hook({ label: "AT HER COUSIN'S HOME", face: 'diya', pill: ['Three ways to get oxygen', ['H2', 'All', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['How does each animal get oxygen?', ['H3', 'asked']], ['Where does air go after my nose?', ['H3', 'where', -0.2]]],
  a: [['ANSWER 1', 'Skin, tubes, gills or lungs', ['H4', 'skin']], ['ANSWER 2', 'Down a tree of tubes to alveoli', ['H4', 'branching']]],
  chips: [['Respiratory organs', ['H5', 'respiratory']], ['Human respiratory system', ['H5', 'human']], ['Five steps', ['H5', 'five']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 400, width: 784, height: 180, fill: '#9E7B55' });
    const tank = mk(s, 'g', {}); mk(tank, 'rect', { x: 50, y: 140, width: 360, height: 250, rx: 10, fill: '#D6E9F5', stroke: K.ink, 'stroke-width': 4 }); mk(tank, 'rect', { x: 50, y: 360, width: 360, height: 30, fill: '#E3D3A0' });
    const fish = P(tank, fishD(0, 0, 1), '#F2B57E', '#B35F22', 3); circ(tank, 0, 0, 1, 'none', 'none', 0);
    const eye = circ(tank, 0, 0, 5, K.ink, K.ink, 1); const bub = [0, 1, 2, 3].map(() => circ(tank, 0, 0, 7, '#FFFFFF', K.o2, 2));
    const mir = mk(s, 'g', {}); mk(mir, 'ellipse', { cx: 600, cy: 230, rx: 110, ry: 140, fill: '#EEF4F7', stroke: K.ink, 'stroke-width': 5 }); const fog = mk(mir, 'ellipse', { cx: 600, cy: 260, rx: 70, ry: 60, fill: '#FFFFFF', opacity: 0 }); cap(mir, 600, 395, 'COLD MIRROR', { fill: C.ink });
    const w = worm(s, 470, 450, 10, 1);
    return { els: [[tank, ['H1', 'fish', -0.3], { dy: 12 }], [w, ['H1', 'earthworm', -0.2], { dx: -20, dy: 0 }], [mir, 'H1', { dy: 12 }]],
      anim: t => { const a = tm(['H1', 'fogs', -0.4]); fog.setAttribute('opacity', (0.85 * M.clamp((t - a) / 0.8) * (1 - 0.5 * M.clamp((t - a - 3) / 3))).toFixed(2));
        const fx = 230 + 90 * Math.sin(t * 0.6), dir = Math.cos(t * 0.6) > 0 ? 1 : -1; attr(fish, 'transform', `translate(${fx.toFixed(1)} 250) scale(${-dir} 1)`); attr(eye, 'transform', `translate(${(fx - 30 * dir).toFixed(1)} 244)`);
        bub.forEach((b, k) => { const u = ((t * 0.35) + k / 4) % 1; attr(b, 'cx', (fx - 64 * dir).toFixed(1)); attr(b, 'cy', (240 - 100 * u).toFixed(1)); b.style.opacity = u < 0.9 ? 1 : 0; });
        w.style.transform = `translateX(${(6 * Math.sin(t * 2)).toFixed(1)}px)`; } };
  } }));

/* ---------- B: why breathe ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHY DO WE BREATHE?', build: (el, s) => {
  const cell = mk(s, 'g', {}); mk(cell, 'ellipse', { cx: 800, cy: 320, rx: 230, ry: 170, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 4 }); mk(cell, 'ellipse', { cx: 760, cy: 330, rx: 60, ry: 50, fill: '#D7C3E6', stroke: '#7B4B94', 'stroke-width': 3 });
  [[880, 240, 20], [900, 390, -30], [660, 260, 40]].forEach(([x, y, r]) => mk(cell, 'ellipse', { cx: x, cy: y, rx: 40, ry: 20, fill: '#F2B57E', stroke: '#B35F22', 'stroke-width': 2.5, transform: `rotate(${r} ${x} ${y})` })); cap(cell, 800, 520, 'A BODY CELL', { fill: C.ink });
  const food = mk(s, 'g', {}); mk(food, 'rect', { x: 760, y: 180, width: 44, height: 30, rx: 8, fill: '#F3E2B3', stroke: '#C9962B', 'stroke-width': 3 });
  const inO = mk(s, 'g', {}); arrow(inO, 300, 300, 540, 300, K.o2, 5); o2(inO, 380, 270, 1.4); T(inO, 420, 350, 'Oxygen in', 26, K.o2);
  const outC = mk(s, 'g', {}); arrow(outC, 1060, 300, 1300, 300, K.co2, 5); co2(outC, 1180, 270, 1.4); T(outC, 1180, 350, 'Carbon dioxide out', 26, K.co2);
  const en = div(el, 'pillp ac', { left: '640px', top: '96px' }, 'Food + oxygen → energy'); const p2 = div(el, 'pillp', { left: '60px', top: '470px' }, 'This swap = breathing (respiration)');
  return { els: [[cell, 'B1', { dy: 12 }], [inO, ['B2', 'oxygen', -0.2], { dx: -20, dy: 0 }], [food, ['B2', 'food', -0.2], POP], [en, ['B2', 'energy', -0.1]], [outC, ['B2', 'carbon', -0.2], { dx: -20, dy: 0 }], [p2, ['B3', 'breathing', -0.2]]],
    anim: t => { const v = M.io((t - tm(['B2', 'break'])) / 1.2); food.style.opacity = (1 - v).toFixed(2); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CHEST', 'LUNG', 'ALVEOLI'], scales: ['x1', 'x5', 'x200'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Two lungs', 'One on each side,', 'behind the ribs.'], ['RUNG 2 OF 3', 'Bronchioles', 'Tubes branch again', 'and again, like a tree.'], ['RUNG 3 OF 3', 'Alveoli', 'Tiny thin-walled sacs.', 'Wrapped in blood vessels.']],
  av: { who: 'Diya', text: 'A whole tree inside me!', tin: ['Z4', 'wrapped', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [700, 330, 60], build: g => { const c = chest(g, 528, 300, 1); c.u(0.3);
      return { labs: [[lab(g, 640, 300, 860, 200, 'Lung'), ['Z2', 'lungs']], [lab(g, 400, 330, 210, 430, 'Ribs', 'end'), ['Z2', 'ribs']]] }; } },
    { at: 'Z3', focus: [610, 330, 50], build: g => { P(g, lungD(380, 50, 1, 1.75), K.lung, K.lungS, 4); P(g, 'M400,10 L400,80', 'none', K.lungS, 14); tree(g, 400, 80, Math.PI * 0.32, 76, 4, 8);
      return { labs: [[lab(g, 470, 140, 700, 90, 'Bronchus'), ['Z3', 'tubes']], [lab(g, 612, 330, 820, 380, 'Bronchiole'), ['Z3', 'bronchioles']]] }; } },
    { at: 'Z4', build: g => { const a = alveoli(g, 528, 260, 1.5);
      return { labs: [[lab(g, 528, 160, 760, 80, 'Terminal bronchiole'), ['Z4', 'end']], [lab(g, 440, 310, 230, 430, 'Alveoli', 'end'), ['Z4', 'alveoli']], [lab(g, 640, 340, 830, 440, 'Blood capillaries'), ['Z4', 'blood']]] }; } }] }));

/* ---------- L: five steps of respiration ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'FIVE STEPS OF RESPIRATION', svg: false, build: el => ({ anim: EP.steps(el, [['Breathing in and out', 'pulmonary ventilation'], ['Diffusion at the alveoli', 'gases cross the thin wall'], ['Transport by blood', 'blood carries both gases'], ['Diffusion at the tissues', 'between blood and tissue cells'], ['Cells use oxygen', 'and release carbon dioxide']], LT) }) },
  { pos: 'R', label: 'FOLLOW THE GASES', build: (el, s) => {
    const air = mk(s, 'g', {}); P(air, 'M50,130 L190,130', 'none', K.lungS, 34); P(air, 'M50,130 L190,130', 'none', '#F6E2CF', 24); cap(air, 110, 100, 'AIR IN AND OUT', { fill: C.ink });
    P(s, 'M190,130 C230,130 236,150 240,170', 'none', K.lungS, 18); circ(s, 250, 240, 85, K.alv, K.lungS, 3.5); cap(s, 250, 360, 'ALVEOLUS', { fill: C.ink });
    P(s, 'M330,270 C420,270 400,430 490,430 L580,430', 'none', K.red, 34, { opacity: 0.22 }); P(s, 'M330,270 C420,270 400,430 490,430 L580,430', 'none', K.red, 3); cap(s, 470, 490, 'BLOOD CAPILLARY', { fill: K.red });
    const tis = mk(s, 'g', {}); mk(tis, 'rect', { x: 580, y: 340, width: 170, height: 170, rx: 22, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 3.5 }); mk(tis, 'ellipse', { cx: 665, cy: 440, rx: 32, ry: 26, fill: '#D7C3E6', stroke: '#7B4B94', 'stroke-width': 3 }); cap(tis, 665, 540, 'TISSUE CELL', { fill: C.ink });
    const cell = rbc(s, 0, 0, 24); const O = o2(s, 0, 0, 1.5), Cd = co2(s, 0, 0, 1.4);
    const path = [[50, 130], [190, 130], [250, 240], [340, 272], [490, 430], [600, 430], [665, 400]];
    const lerp = (u) => { const n = path.length - 1, f = M.clamp(u) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i; return [path[i][0] + (path[i + 1][0] - path[i][0]) * r, path[i][1] + (path[i + 1][1] - path[i][1]) * r]; };
    return { anim: t => { const ts = LT.map(tm); const k = [0, 1 / 6, 2 / 6, 4 / 6, 5 / 6, 1]; let u = 0; ts.forEach((tt, i) => { if (t >= tt) u = Math.max(u, k[i] + (k[i + 1] - k[i]) * M.io((t - tt) / 1.4)); });
      const [x, y] = lerp(u); at(O, x, y - 2); O.style.opacity = t > tm('L1') + 0.3 ? 1 : 0; const rb = u > 2 / 6 - 0.01 && u < 5 / 6 + 0.01; at(cell, x, y); cell.style.opacity = rb ? 1 : 0;
      const cu = M.clamp((t - ts[4] - 0.4) / 2.5); const [cx, cy] = lerp(1 - cu); at(Cd, cx, cy - 30); Cd.style.opacity = t > ts[4] + 0.3 ? 1 : 0; } }; } }] });

/* ---------- C: path of the air ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE PATH OF THE AIR · HUMAN RESPIRATORY SYSTEM', build: (el, s) => {
  const ch = EP.chain(el, [['NOSTRILS', ['C2', 'external']], ['PHARYNX', ['C2', 'pharynx']], ['LARYNX', ['C2', 'larynx']], ['TRACHEA', ['C3', 'trachea']], ['BRONCHI', ['C3', 'bronchi']], ['ALVEOLI', ['C3', 'alveoli']]]);
  const sc = 0.8, X0 = 360, Y0 = 166, tp = ([x, y]) => [X0 + sc * x, Y0 + sc * y];
  const sg = mk(s, 'g', {}), sgi = mk(sg, 'g', { transform: `translate(${X0} ${Y0}) scale(${sc})` }); const sys = R14.system(sgi); const p = sys.pt;
  const air = circ(s, 0, 0, 10, K.o2L, K.o2, 3);
  const L = (k, lx, ly, txt2, an, sp) => { const [x, y] = tp(p[k]); return [lab(s, x, y, lx, ly, txt2, an), sp]; };
  const pE = div(el, 'pillp', { left: '1080px', top: '190px' }, 'Pharynx: shared by food and air'), pL = div(el, 'pillp', { left: '1080px', top: '270px' }, 'Larynx: the sound box'), pG = div(el, 'pillp ac', { left: '1080px', top: '350px' }, 'Epiglottis: shuts the glottis'), pB = div(el, 'pillp', { left: '1080px', top: '430px' }, 'Trachea → two bronchi → bronchioles');
  return { els: [[sg, 'C1', { dy: 0, fade: 0.4 }], [pE, ['C2', 'shared', -0.2]], [pL, ['C2', 'sound', -0.2]], [pG, ['C3', 'epiglottis', -0.1]], [pB, ['C3', 'splits', -0.2]]],
    labs: [L('nose', 345, 190, 'External nostril', 'end', ['C2', 'external']), L('nasal', 790, 170, 'Nasal chamber', 'start', ['C2', 'nasal']), L('phar', 790, 230, 'Pharynx', 'start', ['C2', 'pharynx']), L('lar', 790, 290, 'Larynx', 'start', ['C2', 'larynx']), L('epi', 345, 270, 'Epiglottis', 'end', ['C3', 'epiglottis']), L('trach', 790, 350, 'Trachea', 'start', ['C3', 'trachea']), L('bron', 790, 420, 'Bronchus', 'start', ['C3', 'bronchi']), L('bronchiole', 330, 470, 'Bronchiole', 'end', ['C3', 'bronchioles'])],
    anim: t => { ch.run(t, tm('C1') + 0.3); const pts = ['nose', 'nasal', 'phar', 'lar', 'trach', 'bron', 'bronchiole'].map(k => tp(p[k])); const a = tm(['C2', 'external']), b = tm(['C3', 'alveoli']); const u = M.clamp((t - a) / (b - a + 0.5));
      const n = pts.length - 1, f = u * n, i = Math.min(n - 1, Math.floor(f)), r = f - i; attr(air, 'cx', (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * r).toFixed(1)); attr(air, 'cy', (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * r).toFixed(1)); air.style.opacity = t > a - 0.2 ? 1 : 0; } }; } }] });

/* ---------- D: conducting vs exchange ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'CONDUCTING PART', pill: ['Nostrils to terminal bronchioles', ['D2', 'runs', -0.1], 'ac'], build: (el, s) => {
    P(s, 'M60,240 L720,240', 'none', K.lungS, 110); P(s, 'M60,240 L720,240', 'none', '#F6E2CF', 96); cap(s, 110, 160, 'NOSTRILS', { fill: C.ink }); cap(s, 640, 160, 'TERMINAL BRONCHIOLES', { fill: C.ink }); const dust = [0, 1, 2, 3, 4].map(k => circ(s, 0, 0, 6, '#9C8A6A', '#6B5A3A', 2)); const ar = [0, 1, 2].map(k => o2(s, 0, 0, 1.1));
    const tags = [['CARRIES', 120], ['CLEANS', 290], ['WARMS', 450], ['MOISTENS', 620]].map(([s2, x]) => { const e = div(el, 'chp', { left: x - 70 + 'px', top: '350px' }); e.textContent = s2; return e; });
    return { els: tags.map((e, i) => [e, ['D2', ['carries', 'cleans', 'warms', 'moist'][i], -0.1]]),
      anim: t => { ar.forEach((m, k) => { const u = ((t * 0.25) + k / 3) % 1; at(m, 80 + 620 * u, 230 + 18 * k); }); dust.forEach((d, k) => { const u = ((t * 0.25) + k / 5) % 1, stop = t > tm(['D2', 'cleans']); const x = 80 + 620 * (stop ? Math.min(u, 0.35) : u); attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', (206 + (k % 3) * 30).toFixed(1)); d.style.opacity = stop && u > 0.35 ? 0.3 : 1; }); } }; } },
  { pos: 'R', label: 'EXCHANGE PART', tin: ['D3', null, -0.2], pill: ['Alveoli and their ducts', ['D3', 'alveoli', -0.1], 'ac'], build: (el, s) => {
    const a = alveoli(s, 300, 260, 1.15); P(s, 'M500,170 C560,200 560,330 500,380', 'none', K.red, 18, { opacity: 0.3 }); const O = [0, 1].map(() => o2(s, 0, 0, 1)), Cd = [0, 1].map(() => co2(s, 0, 0, 1));
    const e1 = div(el, 'chp', { left: '560px', top: '200px', color: K.o2 }), e2 = div(el, 'chp', { left: '560px', top: '330px', color: K.co2 }); e1.textContent = 'O2 → blood'; e2.textContent = 'CO2 → air';
    return { els: [[a, ['D3', 'exchange', -0.2], { dy: 10 }], [e1, ['D3', 'oxygen', -0.1]], [e2, ['D3', 'carbon', -0.1]]],
      anim: t => { const on = t > tm(['D3', 'pass']); O.forEach((m, k) => { const u = ((t * 0.4) + k / 2) % 1; at(m, 360 + 160 * u, 230 + 20 * k); m.style.opacity = on ? 1 : 0; }); Cd.forEach((m, k) => { const u = ((t * 0.4) + k / 2) % 1; at(m, 520 - 160 * u, 310 + 20 * k); m.style.opacity = on ? 1 : 0; }); } }; } }] });

/* ---------- U: pleura, thoracic chamber + think ---------- */
const TH = { q: 'The trachea, bronchi and bronchioles carry air. Do they exchange gases too?', opts: ['Yes, they do', 'No, only alveoli'], right: 1, why: 'No. They only conduct air. Gas exchange happens only in the alveoli.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'THE PLEURA', tout: 'U4', build: (el, s) => {
    const g = mk(s, 'g', {}); P(g, lungD(80, 70, 1, 1.95), K.o2L, K.lungS, 4); P(g, lungD(80, 90, 1, 1.75), K.lung, K.lungS, 4);
    const fl = div(el, 'chp', { left: '480px', top: '372px' }); fl.textContent = 'Pleural fluid: less friction';
    return { els: [[g, ['U2', 'lung'], { dy: 10 }], [fl, ['U2', 'fluid', -0.1]]], labs: [[lab(s, 360, 200, 480, 150, 'Outer pleura'), ['U2', 'double']], [lab(s, 336, 300, 480, 290, 'Inner pleura'), ['U2', 'layer']], [lab(s, 220, 380, 480, 470, 'Lung'), ['U2', 'lung']]] }; } },
  { pos: 'R', label: 'THE THORACIC CHAMBER · AIR-TIGHT', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const c = chest(s, 392, 300, 0.95); c.u(0); const sp = mk(s, 'rect', { x: 60, y: 120, width: 22, height: 360, rx: 10, fill: '#F7F1E1', stroke: '#8C7B5A', 'stroke-width': 3 });
    return { els: [[c.g, ['U3', 'thoracic', -0.2], { dy: 10 }], [sp, ['U3', 'backbone', -0.2], POP]],
      labs: [[lab(s, 71, 200, 130, 100, 'Vertebral column'), ['U3', 'backbone']], [lab(s, 392, 220, 560, 110, 'Sternum'), ['U3', 'sternum']], [lab(s, 560, 240, 640, 180, 'Ribs'), ['U3', 'ribs']], [lab(s, 392, 365, 560, 480, 'Diaphragm'), ['U3', 'diaphragm']]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Do', -0.1], why: ['U5', 'only'] })] });

/* ---------- W: which organ? ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · WHICH ORGAN?', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · SIMPLE ANIMALS', 'Body surface · moist cuticle', 'SPONGES, FLATWORMS · EARTHWORM', s => { worm(s, 150, 150, 10, 1.1); mk(s, 'ellipse', { cx: 248, cy: 70, rx: 90, ry: 24, fill: '#E9D7C0', stroke: '#8C6D4F', 'stroke-width': 3 }); cap(s, 248, 120, 'FLATWORM', { 'font-size': 14 }); cap(s, 248, 210, 'EARTHWORM', { 'font-size': 14 }); }, ['W2', 'Simple', -0.2], ['W2', 'body'], ['W2', 'earthworm']],
  ['STEP 2 · INSECTS', 'Tracheal tubes', 'AIR CARRIED BY TINY TUBES', s => { insect(s, 270, 150, 1.1); }, ['W3', 'Insects', -0.2], ['W3', 'tracheal'], ['W3', 'carry']],
  ['STEP 3 · FISHES, LAND ANIMALS', 'Gills · lungs', 'FROG: LUNGS + MOIST SKIN', s => { P(s, fishD(140, 140, 0.9), '#F2B57E', '#B35F22', 3); [0, 1, 2].forEach(k => P(s, `M${130 + k * 12},120 q8,20 0,40`, 'none', '#C0392B', 3)); P(s, lungD(330, 60, -1, 0.75), K.lung, K.lungS, 3); P(s, lungD(370, 60, 1, 0.75), K.lung, K.lungS, 3); cap(s, 150, 210, 'FISH · GILLS', { 'font-size': 14 }); cap(s, 350, 270, 'LUNGS', { 'font-size': 14 }); }, ['W4', 'Fishes', -0.2], ['W4', 'gills'], ['W4', 'Frogs']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['mirror', 'A mirror fogs', 'YOUR BREATH', ['H1', 'mirror']], ['fish', 'A fish gulps', 'WATER ALL DAY', ['H1', 'fish']], ['worm', 'An earthworm', 'NO NOSE AT ALL', ['H1', 'earthworm']]],
  scenes: S,
  stmt: { l2: 'Gases are swapped only in the <span class="acc">alveoli</span>.', f: '<span class="lad">nostrils → pharynx → larynx → trachea → bronchi → <b>alveoli</b></span>', t2: ['T1', 'Gases', -0.2], tf: ['T1', 'swapped'] },
  trap: { wrong: 'The trachea has complete rings of cartilage', right: 'The rings are incomplete and keep the airway open', tWrong: ['X2', 'complete', -0.3], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'incomplete', -0.2], tSvg: ['X3', 'support', -0.4],
    build: s => { circ(s, 230, 130, 70, '#F6E2CF', K.lungS, 3); P(s, 'M180,80 A70,70 0 1 0 280,80', 'none', K.cartS, 14); cap(s, 230, 240, 'C-SHAPED RING · GAP AT THE BACK', { 'font-size': 14 }); } },
  where: { type: 'Match questions: animals and respiratory organs · statements on parts of the human system', at: ['E1', 'match'] },
  mcq: { q: 'Match the animal with its respiratory organ.<div class="mt" style="font:500 22px Poppins;line-height:1.5"><div>I. Earthworm<br>II. Cockroach<br>III. Fish<br>IV. Pigeon</div><div>p. Lungs<br>q. Gills<br>r. Moist cuticle<br>s. Tracheal tubes</div></div>', opts: ['I-s, II-r, III-q, IV-p', 'I-r, II-q, III-s, IV-p', 'I-q, II-s, III-r, IV-p', 'I-r, II-s, III-q, IV-p'], right: 3 }, mcqAt: ['Q1', 'Match', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">D</b>', ['A1', 3, 0.1]], ['Earthworm: moist cuticle', ['A2', 'earthworm']], ['Cockroach: tracheal tubes', ['A2', 'cockroach']], ['Fish: gills', ['A3', 'fish']], ['Pigeon: lungs', ['A3', 'pigeon']]],
  recap: { title: 'Recap · respiratory organs', lines: ['<b>Animals</b>: body surface · moist cuticle · tracheal tubes · gills · lungs', '<b>Air path</b>: nostrils → pharynx → larynx → trachea → bronchi → alveoli', '<b>Conducting part</b>: carries, cleans, warms and moistens air', '<b>Exchange part</b>: alveoli and their ducts · gases swap here', '<b>Thoracic chamber</b>: air-tight · diaphragm below · pleura on lungs'] },
  yq: ['Where does gas exchange happen?', 'What does the conducting part do?', 'What forms the floor of the thoracic chamber?'],
  next: { label: 'NEXT · EP 97', topic: 'Mechanism of Breathing and Respiratory Volumes' }
});
})();
