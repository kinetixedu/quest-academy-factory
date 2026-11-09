// PUC Biology Ep 73: Enzymes - How They Work (Living diagram, leaf green). Runner: ep.js + bio9.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, AA, P, circ, T, chain, place, lerpPts, hex, enz, enzD, sub, at, axes, arrow, cell } = B9;
const ICN = { rice: ['M4 13h16', 'M5 13a7 7 0 0 0 14 0', 'M8 10h.01', 'M12 9h.01', 'M16 10h.01'], clock: ['M12 3a9 9 0 1 0 .1 0', 'M12 7v5l3 2'], candy: ['M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0', 'M8 12L4 9v6Z', 'M16 12l4-3v6Z'] };
const S = [];
const flame = (g, x, y, s = 1) => { P(g, `M${x},${y} C${x - 30 * s},${y - 30 * s} ${x - 10 * s},${y - 60 * s} ${x},${y - 90 * s} C${x + 10 * s},${y - 60 * s} ${x + 30 * s},${y - 30 * s} ${x},${y} Z`, '#F2B57E', '#B35F22', 3); P(g, `M${x},${y} C${x - 12 * s},${y - 15 * s} ${x - 4 * s},${y - 30 * s} ${x},${y - 45 * s} C${x + 4 * s},${y - 30 * s} ${x + 12 * s},${y - 15 * s} ${x},${y} Z`, '#FBE3A0', '#C9962B', 2); };
const thermo = (g, x, y, h, lvl, c) => { mk(g, 'rect', { x: x - 14, y: y - h, width: 28, height: h, rx: 14, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); circ(g, x, y + 10, 24, c, K.ink, 3); return mk(g, 'rect', { x: x - 7, y: y - h * lvl, width: 14, height: h * lvl, rx: 7, fill: c }); };

/* ---------- H: chewing rice ---------- */
S.push(EP.hook({ label: 'LUNCH BREAK', face: 'diya', pill: ['Chew for a minute', ['H1', 'Chew', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['How can starch break down so fast?', ['H3', 'asked']], ['What is doing the work?', ['H3', 'work', -0.6]]],
  a: [['ANSWER 1', 'Proteins called enzymes', ['H4', 'enzymes']], ['ANSWER 2', 'A pocket that grabs and speeds up', ['H4', 'pocket']]],
  chips: [['Enzymes', ['H5', 'enzyme']], ['Active site', ['H5', 'active']], ['Catalytic cycle', ['H5', 'catalytic']], ['The energy hill', ['H5', 'energy']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 400, width: 784, height: 180, fill: '#9E7B55' });
    mk(s, 'ellipse', { cx: 260, cy: 400, rx: 190, ry: 40, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); const rice = mk(s, 'g', {}); for (let k = 0; k < 40; k++) mk(rice, 'ellipse', { cx: 140 + (k * 37) % 240, cy: 380 + (k * 13) % 26, rx: 9, ry: 4, fill: '#FBFAF4', stroke: '#C9C2B0', 'stroke-width': 1.5, transform: `rotate(${(k * 47) % 180} ${140 + (k * 37) % 240} ${380 + (k * 13) % 26})` });
    const ck = mk(s, 'g', {}); circ(ck, 600, 220, 90, '#FFFFFF', K.ink, 4); const hand = P(ck, 'M600,220 L600,150', 'none', C.ac, 6); const arc = P(ck, '', 'none', C.ac, 10, { opacity: 0.35 }); T(ck, 600, 350, 'ONE MINUTE', 20);
    const sw = [0, 1, 2].map(k => { const g = mk(s, 'g', {}); hex(g, 0, 0, 16); return g; });
    return { anim: t => { const a = tm(['H1', 'Chew']), v = M.clamp((t - a) / 4), ang = v * 2 * Math.PI; attr(hand, 'transform', `rotate(${(v * 360).toFixed(1)} 600 220)`);
      attr(arc, 'd', v > 0.01 ? `M600,140 A80,80 0 ${v > 0.5 ? 1 : 0} 1 ${(600 + 80 * Math.sin(ang)).toFixed(1)},${(220 - 80 * Math.cos(ang)).toFixed(1)}` : '');
      const b = tm(['H1', 'sweet']); sw.forEach((g, k) => { const u = ((t - b) * 0.5 + k / 3) % 1; at(g, 200 + k * 60, 340 - 120 * u); g.style.opacity = t > b ? Math.min(1, 4 * u, 4 * (1 - u)) : 0; }); } };
  } }));

/* ---------- B: what is an enzyme ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'WHAT IS AN ENZYME?', build: (el, s) => {
  const c1 = div(el, 'pillp ac', { left: '60px', top: '130px' }, 'Almost all enzymes: proteins'), c2 = div(el, 'pillp', { left: '60px', top: '214px' }, 'A few: ribozymes (nucleic acids)');
  const rn = mk(s, 'g', {}); chain(rn, Array.from({ length: 9 }, (_, i) => [90 + i * 46, 340 + 16 * Math.sin(i)]), [K.rna, '#7CC7C0'], 14); cap(rn, 274, 400, 'RIBOZYME · AN RNA THAT ACTS AS AN ENZYME', { fill: K.rna });
  const N = 22, line = Array.from({ length: N }, (_, i) => [760 + i * 34, 300]), fold = Array.from({ length: N }, (_, i) => { const a = Math.PI * 1.15 + i / (N - 1) * Math.PI * 1.7; const r = 150 + 30 * Math.sin(i * 1.3); return [1120 + r * Math.cos(a) * 1.2, 330 + r * Math.sin(a) * 0.9]; });
  const ch = chain(s, line, AA, 13); const ol = P(s, enzD(1120, 380, 1.55), 'none', K.pro, 4, { 'stroke-dasharray': '10 8' }); const ring = circ(s, 1120, 270, 50, 'none', C.ac, 5); attr(ring, 'stroke-dasharray', '10 8');
  return { els: [[c1, ['B2', 'Almost', -0.1]], [c2, ['B2', 'few', -0.1]], [rn, ['B2', 'ribozymes', -0.2], { dy: 10 }], [ol, ['B3', 'pockets', -0.2], { dy: 0, fade: 0.4 }], [ring, ['B3', 'active', -0.2], { ...POP, sc: 0.5 }]],
    labs: [[lab(s, 1170, 270, 1340, 150, 'Active site'), ['B3', 'active']]], anim: t => { const v = M.io((t - tm(['B3', 'folds'])) / 1.4); place(ch, lerpPts(line, fold, v)); ch.g.style.opacity = t > tm('B1') + 0.3 ? 1 : 0; } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['CELL', 'ENZYME', 'ACTIVE SITE'], scales: ['x1,000', 'x1,000,000', 'x5,000,000'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'The cell', 'Thousands of enzymes.', 'Each runs its own reaction.'], ['RUNG 2 OF 3', 'One enzyme', 'A folded protein.', 'A pocket on its surface.'], ['RUNG 3 OF 3', 'Active site', 'A crevice that fits.', 'The substrate gets changed.']],
  av: { who: 'Diya', text: 'A pocket made by folding!', tin: ['Z4', 'changed', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [700, 180, 50], build: g => { cell(g, 528, 263, 380, 210); const E = [[700, 180], [380, 140], [400, 380], [690, 370], [560, 110], [800, 270]].map(([x, y]) => { const w = mk(g, 'g', {}); enz(w, x, y, 0.18); return w; });
      return { labs: [[lab(g, 715, 175, 930, 110, 'Enzyme', 'end'), ['Z2', 'enzymes']]] }; } },
    { at: 'Z3', focus: [528, 220, 60], build: g => { enz(g, 528, 320, 1.7); for (let k = 0; k < 8; k++) circ(g, 380 + (k % 4) * 100, 330 + Math.floor(k / 4) * 70, 12, AA[k % 6], K.ink, 2);
      return { labs: [[lab(g, 528, 230, 760, 110, 'Active site'), ['Z3', 'pocket']], [lab(g, 690, 420, 790, 470, 'Folded protein'), ['Z3', 'folded']]] }; } },
    { at: 'Z4', build: g => { enz(g, 528, 520, 3.2); const S2 = sub(g, 1.6); const ring = circ(g, 528, 380, 90, 'none', C.ac, 4); attr(ring, 'stroke-dasharray', '10 8');
      return { labs: [[lab(g, 600, 400, 800, 470, 'Active site · a crevice', 'end'), ['Z4', 'crevice']], [lab(g, 570, 200, 760, 120, 'Substrate'), ['Z4', 'substrate']]],
        anim: t => { const v = M.io((t - tm(['Z4', 'fits'])) / 1); at(S2.g, 528, 160 + 200 * v); } }; } }] }));

/* ---------- L: catalytic cycle ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'ONE CATALYTIC CYCLE · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Substrate binds', 'it fits into the active site'], ['Enzyme changes shape', 'it fits even more tightly'], ['Bonds break', 'an enzyme-product complex forms'], ['Products released', 'they leave the active site'], ['Enzyme is free', 'ready for the next substrate']], LT) }) },
  { pos: 'R', label: 'WATCH THE ENZYME WORK', build: (el, s) => {
    const E = P(s, enzD(392, 360, 1.3), K.proL, K.pro, 4), S1 = sub(s, 0.72), S2 = sub(s, 0.72), fl = mk(s, 'g', {}); [0, 1, 2, 3].forEach(k => P(fl, `M392,${300 - 0} l${[-26, 26, -18, 18][k]},${[-20, -20, 20, 20][k]}`, 'none', C.ac, 4)); fl.style.opacity = 0;
    const eq = div(el, '', { position: 'absolute', left: '36px', top: '498px', width: '712px', display: 'flex', gap: '14px', justifyContent: 'center', font: "600 26px 'IBM Plex Mono'", color: C.mute });
    eq.innerHTML = ['E + S', '⇌', 'ES', '→', 'EP', '→', 'E + P'].map(x => `<span>${x}</span>`).join(''); const sp = [...eq.querySelectorAll('span')];
    return { anim: t => { const ts = LT.map(tm); let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); const fit = M.io((t - ts[1]) / 0.6) * (1 - M.io((t - ts[3]) / 0.6)); attr(E, 'd', enzD(392, 360, 1.3, fit));
      const yB = 360 - 44 * 1.3 - 16, v0 = M.io((t - tm('L1') - 0.4) / 1.2); at(S1.g, 392, 120 + (yB - 120) * v0); S1.g.style.opacity = t > tm('L1') + 0.2 ? 1 : 0;
      const br = M.io((t - ts[2]) / 0.5), go = M.io((t - ts[3]) / 1); at(S1.a, -6 * br - 200 * go, -150 * go); at(S1.b, 6 * br + 200 * go, -150 * go); [S1.a, S1.b].forEach(e => e.style.opacity = (1 - M.clamp((t - ts[3] - 0.7) / 0.3)).toFixed(2));
      fl.style.opacity = t > ts[2] && t < ts[2] + 0.8 ? 1 : 0; const n = M.io((t - ts[4] - 0.6) / 1.2); at(S2.g, 392, 100 + (yB - 140 - 100) * n); S2.g.style.opacity = t > ts[4] ? 1 : 0;
      const hi = [[0], [2], [4], [6], [0]][Math.max(c, 0)]; sp.forEach((e, i) => { e.style.color = c >= 0 && hi.includes(i) ? C.ac : C.mute; e.style.fontWeight = c >= 0 && hi.includes(i) ? 700 : 600; }); } }; } }] });

/* ---------- C: the energy hill ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE ENERGY HILL · ACTIVATION ENERGY', build: (el, s) => {
  const ch = EP.chain(el, [['SUBSTRATE', ['C2', 'substrate']], ['TRANSITION STATE', ['C2', 'transition']], ['PRODUCT', ['C2', 'product']], ['A LOWER HILL', ['C3', 'brings']]]);
  axes(s, 140, 520, 900, 360, 'PROGRESS OF THE REACTION', 'POTENTIAL ENERGY');
  const hi = P(s, 'M170,360 C320,360 380,170 560,170 C740,170 800,420 1000,420', 'none', K.ink, 5), lo = P(s, 'M170,360 C320,360 400,290 560,290 C720,290 800,420 1000,420', 'none', C.ac, 5, { 'stroke-dasharray': '14 8' });
  const ea = mk(s, 'g', {}); P(ea, 'M600,358 L600,186 M590,200 L600,186 L610,200 M590,344 L600,358 L610,344', 'none', K.red, 3); P(ea, 'M170,360 L640,360', 'none', K.red, 2, { 'stroke-dasharray': '6 6' });
  const ball = circ(s, 170, 345, 15, K.sugL, K.sug, 3);
  const p1 = div(el, 'chp', { left: '1090px', top: '230px' }, 'Climb = activation energy'), p2 = div(el, 'chp', { left: '1090px', top: '300px', background: C.ac, color: '#fff' }, 'Enzyme lowers the climb');
  return { els: [[hi, ['C2', 'climb', -0.3], { dy: 0, fade: 0.3 }], [ea, ['C2', 'activation', -0.2], { dy: 0, fade: 0.3 }], [lo, ['C3', 'brings', -0.1], { dy: 0, fade: 0.4 }], [p1, ['C2', 'activation']], [p2, ['C3', 'brings']]],
    labs: [[lab(s, 180, 360, 260, 450, 'Substrate (S)'), ['C2', 'substrate']], [lab(s, 540, 172, 420, 210, 'Transition state', 'end'), ['C2', 'transition']], [lab(s, 990, 420, 930, 480, 'Product (P)', 'end'), ['C2', 'product']], [lab(s, 600, 290, 760, 320, 'With enzyme'), ['C3', 'brings', 0.4]]],
    anim: t => { const a = tm(['C2', 'substrate']), b = tm(['C3', 'brings']); const path = t > b ? lo : hi, v = t > b ? ((t - b) * 0.35) % 1 : M.clamp((t - a) / 6); const q = B9.pt(path, v); attr(ball, 'cx', q.x.toFixed(1)); attr(ball, 'cy', (q.y - 15).toFixed(1)); ch.run(t, tm('C1') + 0.3); } }; } }] });

/* ---------- D: inorganic catalyst vs enzyme ---------- */
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'INORGANIC CATALYST', pill: ['High temperature, high pressure', ['D2', 'temperature', -0.1], 'ac'], build: (el, s) => {
    const g = mk(s, 'g', {}); mk(g, 'rect', { x: 220, y: 150, width: 200, height: 220, rx: 30, fill: '#E9EEF0', stroke: K.ink, 'stroke-width': 4 }); flame(g, 280, 440, 1); flame(g, 360, 440, 1);
    const gg = mk(s, 'g', {}); circ(gg, 560, 230, 70, '#FFFFFF', K.ink, 4); const nd = P(gg, 'M560,230 L560,180', 'none', K.red, 5); cap(gg, 560, 330, 'PRESSURE', { fill: C.ink });
    return { els: [[g, ['D2', 'Inorganic', -0.1], { dy: 12 }], [gg, ['D2', 'pressure', -0.2], { ...POP, sc: 0.6 }]], anim: t => attr(nd, 'transform', `rotate(${(60 + 10 * Math.sin(t * 4)).toFixed(1)} 560 230)`) }; } },
  { pos: 'R', label: 'ENZYME', tin: ['D3', null, -0.2], pill: ['Damaged above about 40 °C', ['D3', 'forty', -0.1], 'ac'], build: (el, s) => {
    const th = mk(s, 'g', {}), lv = thermo(th, 140, 380, 260, 0.3, K.red); cap(th, 230, 250, '40 °C', { fill: K.red, 'text-anchor': 'start' }); P(th, 'M154,250 L220,250', 'none', K.red, 2, { 'stroke-dasharray': '5 5' });
    const E = P(s, enzD(400, 330, 0.9), K.proL, K.pro, 4);
    const hs = mk(s, 'g', {}); mk(hs, 'ellipse', { cx: 650, cy: 400, rx: 100, ry: 34, fill: '#BFE3DF', stroke: '#2A9D8F', 'stroke-width': 3 }); [0, 1, 2].forEach(k => P(hs, `M${610 + k * 40},370 c-12,-20 12,-34 0,-56`, 'none', '#B9C7CF', 4)); enz(hs, 650, 260, 0.45); cap(hs, 650, 455, 'HOT SPRING: 80 TO 90 °C', { fill: '#2A9D8F' });
    return { els: [[th, ['D3', 'Enzymes'], { dy: 12 }], [hs, ['D3', 'springs', -0.2], { dy: 12 }]],
      anim: t => { const h = M.io((t - tm(['D3', 'high'])) / 1.2); attr(lv, 'y', (380 - 260 * (0.3 + 0.5 * h)).toFixed(1)); attr(lv, 'height', (260 * (0.3 + 0.5 * h)).toFixed(1)); const m = M.io((t - tm(['D3', 'damaged'])) / 1); attr(E, 'd', enzD(400, 330, 0.9, 0)); attr(E, 'transform', `translate(0 ${(20 * m).toFixed(1)}) scale(1 ${(1 - 0.35 * m).toFixed(3)})`); E.style.transformOrigin = '400px 400px'; E.style.opacity = (1 - 0.5 * m).toFixed(2); } }; } }] });

/* ---------- U: rate, pathway + think ---------- */
const TH = { q: 'Does an enzyme raise the activation energy, or lower it?', opts: ['Raise it', 'Lower it'], right: 1, why: 'It lowers it. A lower hill lets the reaction run faster.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'RATE · PRODUCT PER UNIT TIME', tout: 'U4', build: (el, s) => {
    const f = mk(s, 'g', {}); T(f, 392, 190, 'rate = δP / δt', 54, K.ink);
    const r = mk(s, 'g', {}); thermo(r, 180, 440, 150, 0.5, K.red); txt(r, 240, 360, '+10 °C', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: K.red }); arrow(r, 380, 350, 470, 350, C.ac, 4); txt(r, 500, 362, 'rate x2', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: C.ac });
    txt(r, 240, 430, '-10 °C', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: '#4A78C2' }); arrow(r, 380, 420, 470, 420, C.ac, 4); txt(r, 500, 432, 'rate ÷2', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: C.ac });
    return { els: [[f, ['U2', 'rate'], { dy: 10 }], [r, ['U2', 'rule', -0.1], { dy: 10 }]] }; } },
  { pos: 'R', label: 'A METABOLIC PATHWAY', tin: ['U3', null, -0.2], tout: 'U4', build: (el, s) => {
    const xs = Array.from({ length: 11 }, (_, i) => 70 + i * 64); const g = mk(s, 'g', {}); hex(g, 70, 250, 28); T(g, 110, 330, 'Glucose', 22, K.sug);
    const st = xs.slice(0, 10).map((x, i) => { const e = mk(s, 'g', {}); arrow(e, x + 20, 250, x + 48, 250, K.ink, 3); enz(e, x + 34, 216, 0.11); return e; }); const p = mk(s, 'g', {}); circ(p, 714, 250, 22, '#F4C9B0', K.pro, 3); T(p, 680, 330, 'Pyruvic acid', 22, K.pro);
    cap(s, 392, 420, 'TEN STEPS · EACH RUN BY AN ENZYME', { fill: C.ink });
    return { els: [[g, ['U3', 'chain', -0.2], { dy: 10 }], ...st.map((e, i) => [e, ['U3', 'enzyme', -0.3 + i * 0.15], { ...POP, sc: 0.5 }]), [p, ['U3', 'pyruvic', -0.1], { ...POP, sc: 0.6 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'raise', -0.1], why: ['U5', 'lower'] })] });

/* ---------- W: how much faster ---------- */
const mols = (s, n, seed) => { for (let k = 0; k < n; k++) { const x = 40 + ((k * 97 + seed) % 410), y = 40 + ((k * 61 + seed * 3) % 210); circ(s, x, y, 7, '#D6E9F5', K.wat, 2); } };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · HOW MUCH FASTER?', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · NO ENZYME', 'About 200 per hour', 'CO2 + H2O → H2CO3, SLOWLY', s => { mols(s, 5, 11); txt(s, 248, 270, 'ONE HOUR', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600 }); }, ['W2', 'Carbon', -0.2], ['W2', 'two'], ['W2', 'hour']],
  ['STEP 2 · CARBONIC ANHYDRASE', 'About 600,000 per second', 'OVER 2 BILLION IN AN HOUR', s => { mols(s, 60, 5); enz(s, 248, 190, 0.6); txt(s, 248, 270, 'ONE SECOND', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600 }); }, ['W3', 'With', -0.2], ['W3', 'six'], ['W3', 'billion']],
  ['STEP 3 · DIVIDE', '2 billion ÷ 200', 'ABOUT 10 MILLION TIMES FASTER', s => { T(s, 248, 130, '2,000,000,000', 40, K.ink); P(s, 'M110,160 L386,160', 'none', K.ink, 4); T(s, 248, 210, '200', 40, K.ink); }, ['W4', 'Divide', -0.2], ['W4', 'Divide'], ['W4', 'ten']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['rice', 'A spoon of rice', 'PLAIN', ['H1', 'spoon']], ['clock', 'Chew for a minute', 'SLOWLY', ['H1', 'Chew']], ['candy', 'It tastes sweet', 'NOTHING ADDED', ['H1', 'sweet']]],
  scenes: S,
  stmt: { l2: 'The <span class="acc">enzyme</span> is not used up.', f: '<span class="lad">E + S ⇌ ES → EP → <b>E</b> + P</span>', t2: ['T1', 'enzyme', -0.2], tf: ['T1', 'used'] },
  trap: { wrong: 'The enzyme is used up in the reaction', right: 'The enzyme is released unchanged', tWrong: ['X2', 'used', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'released', -0.2], tSvg: ['X3', 'substrate', -0.4],
    build: s => { enz(s, 200, 170, 0.8); const p = sub(s, 0.7); at(p.g, 360, 80); at(p.a, -14, 0); at(p.b, 14, 0); cap(s, 230, 250, 'SAME ENZYME, READY AGAIN', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: active site, ribozymes, activation energy, the catalytic cycle', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. Almost all enzymes are proteins.<br>II. Ribozymes are nucleic acids that act as enzymes.<br>III. Enzymes raise the activation energy.<br>IV. The enzyme-substrate complex is short-lived.</div>', opts: ['I and II only', 'I, II and III only', 'I, II and IV only', 'II, III and IV only'], right: 2 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['I: almost all enzymes are proteins', ['A2', 'Almost']], ['II: ribozymes act as enzymes', ['A2', 'ribozymes']], ['IV: the ES complex is short-lived', ['A3', 'short']], ['III is wrong: enzymes lower it', ['A3', 'lower']]],
  recap: { title: 'Recap · enzymes', lines: ['<b>Enzymes</b>: almost all proteins · ribozymes are nucleic acids', '<b>Active site</b>: a pocket where the substrate fits', '<b>Cycle</b>: E + S ⇌ ES → EP → E + P · enzyme reused', '<b>Activation energy</b>: the climb · enzymes lower it', '<b>Carbonic anhydrase</b>: 10 million times faster'] },
  yq: ['What is an active site?', 'What are ribozymes?', 'What is activation energy?'],
  next: { label: 'NEXT · EP 74', topic: 'Factors Affecting Enzyme Activity' }
});
})();
