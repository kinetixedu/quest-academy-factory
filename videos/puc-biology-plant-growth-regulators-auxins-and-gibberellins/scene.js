// PUC Biology Ep 93: Plant Growth Regulators - Auxins and Gibberellins (Living diagram, leaf green). Runner: ep.js + bio9.js + pg13.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, hex, pent } = B9;
const G = PG.K;
// batch colours (Eps 93-94): auxin rose #C2445A, gibberellin blue #4A78C2, cytokinin teal #2A9D8F, ethylene gold #E2B33C, ABA violet #8E5BB5
const AUX = '#C2445A', GA = '#4A78C2', CK = '#2A9D8F', ETH = '#E2B33C', ABA = '#8E5BB5', COL = '#CFE8B8';
const ICN = { sun: ['M12 8a4 4 0 1 0 .1 0', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2'], cut: ['M6 6a2 2 0 1 0 .1 0', 'M6 18a2 2 0 1 0 .1 0', 'M8 7l12 10', 'M8 17L20 7'], grass: ['M6 21c0-6 1-11 2-16', 'M12 21c0-7 0-12 0-18', 'M18 21c0-6-1-11-2-16'] };
const S = [];
// coleoptile: thick rounded tube along a bending centre line
const coleo = (g) => { const q = mk(g, 'g', {}), o = P(q, '', 'none', G.leafS, 30), i = P(q, '', 'none', COL, 23); return { g: q, o, i }; };
const setC = (c, x, y, h, bend) => { const s = PG.stemPts(x, y, h, bend); attr(c.o, 'd', s.d); attr(c.i, 'd', s.d); return s.tip; };
const dots = (g, n, f, r = 6) => Array.from({ length: n }, () => circ(g, -50, -50, r, f, K.ink, 1.5));
const flow = (ds, path, a, sp, t) => ds.forEach((d, j) => { const u = ((t - a) * sp + j / ds.length) % 1, q = PG.along(path(j), u); attr(d, 'cx', q[0].toFixed(1)); attr(d, 'cy', q[1].toFixed(1)); d.style.opacity = t > a ? Math.min(1, 6 * u, 6 * (1 - u)).toFixed(2) : 0; });

/* ---------- H: the window plant ---------- */
S.push(EP.hook({ label: "AARAV'S WINDOW PLANT", face: 'aarav', pill: ['It bends toward the light', ['H1', 'bends', -0.1]], rlabel: "AARAV'S TWO QUESTIONS",
  q: [['What makes the plant bend?', ['H3', 'what']], ['Which part senses the light?', ['H3', 'which']]],
  a: [['ANSWER 1', 'Plant growth regulators', ['H4', 'regulators']], ['ANSWER 2', 'The shoot tip sends a signal down', ['H4', 'tip']]],
  chips: [['What PGRs are', ['H5', 'regulators']], ['How auxin was found', ['H5', 'found']], ['Auxins', ['H5', 'auxins']], ['Gibberellins', ['H5', 'gibberellins']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 520, y: 100, width: 230, height: 300, fill: '#DCEEFA', stroke: '#7A6A2E', 'stroke-width': 8 }); P(s, 'M635,100 L635,400 M520,250 L750,250', 'none', '#7A6A2E', 6); const su = PG.sun(s, 690, 170, 30);
    mk(s, 'rect', { x: 0, y: 400, width: 784, height: 40, fill: '#C9A97E', stroke: '#7A6A2E', 'stroke-width': 3 }); mk(s, 'rect', { x: 0, y: 440, width: 784, height: 140, fill: '#E8DCC4' });
    const rays = mk(s, 'g', {}); [0, 1, 2].forEach(k => arrow(rays, 510, 190 + k * 50, 400, 210 + k * 40, '#C9962B', 3)); PG.pot(s, 280, 330, 120); const sd = PG.seed(s, 280, 314);
    return { els: [[rays, ['H1', 'light', -0.2], { dy: 0, fade: 0.3 }]], anim: t => { attr(su.rays, 'transform', `rotate(${(t * 20) % 360} 690 170)`); const a = tm(['H3', 'turned']), b = tm(['H3', 'bent']);
      const bend = t < a ? 70 : t < b ? -70 * M.io((t - a) / 0.6) : -70 + 140 * M.io((t - b) / 2.5); PG.setSeed(sd, 170, bend, 50); } };
  } }));

/* ---------- B: what are PGRs ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'PLANT GROWTH REGULATORS · SMALL, SIMPLE MOLECULES', pill: ['Also called plant hormones', ['B2', 'hormones', -0.1]], build: (el, s) => {
  const TL = [['Indole compound', 'IAA', AUX, 'indole'], ['Adenine derivative', 'Kinetin', CK, 'adenine'], ['Carotenoid derivative', 'Abscisic acid', ABA, 'carotenoids'], ['Terpene', 'GA3', GA, 'terpenes'], ['Gas', 'Ethylene', ETH, 'gas']];
  const tiles = TL.map(([h, n, c, w], i) => { const x = 36 + i * 310, q = mk(s, 'g', {}); mk(q, 'rect', { x, y: 84, width: 290, height: 250, rx: 14, fill: '#F4F5F7' }); const cx = x + 145;
    if (i === 0) { hex(q, cx - 22, 160, 30, '#FFFFFF', c); pent(q, cx + 30, 158, 28, '#FFFFFF', c); } if (i === 1) { hex(q, cx - 20, 160, 30, '#FFFFFF', c); pent(q, cx + 32, 158, 28, '#FFFFFF', c); circ(q, cx + 70, 128, 9, c, K.ink, 2); }
    if (i === 2) P(q, `M${cx - 90},170 l20,-20 l20,20 l20,-20 l20,20 l20,-20 l20,20 l20,-20 l20,20`, 'none', c, 5); if (i === 3) { [0, 1, 2].forEach(k => P(q, `M${cx - 75 + k * 50},175 l25,-34 l25,34`, 'none', c, 5)); }
    if (i === 4) { [0, 1, 2].forEach(k => { circ(q, cx - 50 + k * 50, 160 - (k % 2) * 20, 18, '#FBF1CF', c, 3); }); }
    T(q, cx, 250, h, 22, K.ink); T(q, cx, 296, n, 30, c); return [q, ['B3', w, -0.2]]; });
  const gp = [['PROMOTE GROWTH', 'auxins · gibberellins · cytokinins', C.ac, ['B4', 'promote']], ['INHIBITS GROWTH', 'abscisic acid', K.red, ['B4', 'inhibits']], ['BOTH, MOSTLY INHIBITS', 'ethylene', '#B8860B', ['B4', 'both']]].map(([h, b, c, sp], i) => [div(el, '', { position: 'absolute', left: [36, 676, 1116][i] + 'px', top: '354px', width: ['620px', '420px', '448px'][i] + '', height: '96px', borderRadius: '14px', background: 'var(--soft)', borderTop: `5px solid ${c}` }, `<div class="tb" style="left:22px;top:16px;color:${c}">${h}</div><div style="position:absolute;left:22px;top:46px;font:700 27px Poppins;white-space:nowrap">${b}</div>`), sp]);
  return { els: [...tiles.map(([q, sp]) => [q, sp, { dy: 14 }]), ...gp.map(([e, sp]) => [e, [...sp, -0.1], { dy: 12 }])] }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['SEEDLING', 'COLEOPTILE', 'TIP'], scales: ['x1', 'x5', 'x40'], ghost: 'EXAMPLE FIGURES',
  info: [['RUNG 1 OF 3', 'Grass seedling', 'A sheath covers the young shoot.', 'This sheath is the coleoptile.'], ['RUNG 2 OF 3', 'Coleoptile', 'Light comes from one side.', 'It bends toward it: phototropism.'], ['RUNG 3 OF 3', 'The tip', 'The signal starts here.', 'It travels down the coleoptile.']],
  av: { who: 'Aarav', text: 'The tip is the light sensor!', tin: ['Z4', 'bends', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [528, 150, 50], build: g => { mk(g, 'rect', { x: 0, y: 400, width: 1056, height: 126, fill: G.soilL }); mk(g, 'ellipse', { cx: 528, cy: 420, rx: 26, ry: 16, fill: '#E8D9A8', stroke: G.rootS, 'stroke-width': 3 }); const c = coleo(g); setC(c, 528, 410, 260, 0);
      [[-60, 60], [-20, 80], [30, 70], [70, 50]].forEach(([dx, h]) => P(g, `M528,430 q${dx / 2},${h / 2} ${dx},${h}`, 'none', G.rootS, 3));
      return { labs: [[lab(g, 542, 260, 720, 260, 'Coleoptile'), ['Z2', 'coleoptile']], [lab(g, 548, 420, 720, 440, 'Grain'), ['Z2', 'seedling']]] }; } },
    { at: 'Z3', focus: [470, 90, 50], build: g => { const c = coleo(g); const su = PG.sun(g, 120, 110, 36); const ry = mk(g, 'g', {}); [0, 1, 2].forEach(k => arrow(ry, 180, 150 + k * 60, 330, 150 + k * 60, '#C9962B', 4));
      return { els: [[ry, ['Z3', 'Light', -0.1], { dy: 0, fade: 0.3 }]], labs: [[lab(g, 120, 150, 60, 300, 'Light from one side'), ['Z3', 'side']]], anim: t => { const v = M.io((t - tm(['Z3', 'bend'])) / 1.6); setC(c, 600, 490, 400, -130 * v); attr(su.rays, 'transform', `rotate(${(t * 20) % 360} 120 110)`); } }; } },
    { at: 'Z4', build: g => { P(g, 'M420,526 L420,180 C420,60 636,60 636,180 L636,526', COL, G.leafS, 6); const ds = dots(g, 6, AUX, 9); const sg = mk(g, 'g', {}); circ(sg, 528, 120, 40, 'none', AUX, 4);
      return { labs: [[lab(g, 560, 110, 700, 90, 'Signal starts here'), ['Z4', 'tip']], [lab(g, 528, 400, 760, 420, 'Signal travels down'), ['Z4', 'travels']]], els: [[sg, ['Z4', 'tip'], { ...POP, sc: 0.5 }]],
        anim: t => flow(ds, j => [[500 + (j % 3) * 28, 130], [500 + (j % 3) * 28, 520]], tm(['Z4', 'travels', -0.3]), 0.35, t) }; } }] }));

/* ---------- L: the experiments ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'D1', keep: 1, cards: [
  { pos: 'L', label: 'HOW AUXIN WAS FOUND · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Light from one side', 'canary grass coleoptiles bend toward it'], ['Tip covered', 'no bending'], ['Tip cut off', 'no bending: the tip sends a signal'], ['F. W. Went', 'isolated auxin from oat coleoptile tips'], ['Auxein: to grow', 'auxin was first isolated from human urine']], LT) }) },
  { pos: 'R', label: 'FOUR COLEOPTILES · LIGHT FROM THE LEFT', pill: ['auxein (Greek): to grow', ['L6', 'Greek', -0.1], 'ac'], build: (el, s) => {
    const su = PG.sun(s, 60, 110, 26); const ry = mk(s, 'g', {}); [0, 1].forEach(k => arrow(ry, 100, 160 + k * 50, 170, 160 + k * 50, '#C9962B', 3)); mk(s, 'rect', { x: 0, y: 420, width: 784, height: 20, fill: G.soilL });
    const X = [230, 380, 530, 680], cs = X.map(() => coleo(s)); X.forEach((x, i) => setC(cs[i], x, 420, 220, 0));
    const capC = mk(s, 'g', {}); mk(capC, 'rect', { x: 362, y: 186, width: 36, height: 44, rx: 12, fill: K.ink }); const cut = mk(s, 'g', {}); P(cut, 'M510,240 L550,240', 'none', K.red, 4); const tipOff = mk(s, 'g', {}); P(tipOff, 'M520,200 C520,186 540,186 540,200 L540,214 L520,214 Z', COL, G.leafS, 3);
    const we = mk(s, 'g', {}); mk(we, 'rect', { x: 650, y: 160, width: 60, height: 30, rx: 4, fill: '#F3E2B3', stroke: K.ink, 'stroke-width': 2.5 }); const wd = dots(we, 3, AUX, 5); cap(we, 680, 146, 'AUXIN', { fill: AUX, 'font-size': 14 });
    const cp = [['LIGHT', 'L2'], ['TIP COVERED', 'L3'], ['TIP CUT', 'L4'], ['WENT · OAT', 'L5']].map(([n, id], i) => [cap(s, X[i], 470, n, { fill: K.ink, 'font-size': 15 }), id]); const res = [['BENDS', C.ac], ['STRAIGHT', K.red], ['STRAIGHT', K.red], ['', C.ac]].map(([n, c], i) => cap(s, X[i], 494, n, { fill: c, 'font-size': 15 }));
    return { els: [...cs.map((c, i) => [c.g, [['L2', 'L3', 'L4', 'L5'][i], null, -0.1], { dy: 14 }]), [capC, ['L3', 'covered', -0.1], { dy: -12 }], [cut, ['L4', 'cut', -0.1]], [we, ['L5', 'isolated', -0.2], { dy: -10 }], ...cp.map(([e, id]) => [e, [id, null, 0]]), ...res.map((e, i) => [e, [['L2', 'L3', 'L4', 'L5'][i], '$', -0.6]])],
      anim: t => { attr(su.rays, 'transform', `rotate(${(t * 20) % 360} 60 110)`); setC(cs[0], 230, 420, 220, -70 * M.io((t - tm(['L2', 'bent'])) / 1.4)); const tc = tm(['L4', 'cut']); setC(cs[2], 530, 420, t > tc ? 180 : 220, 0); attr(tipOff, 'transform', t > tc ? `translate(${(30 * M.io((t - tc) / 0.6)).toFixed(1)} ${(-30 * M.io((t - tc) / 0.6)).toFixed(1)})` : ''); tipOff.style.opacity = t > tc ? (1 - M.clamp((t - tc - 1) / 0.5)).toFixed(2) : 0;
        setC(cs[3], 680, 420, 200, 0); flow(wd, j => [[662 + j * 18, 168], [662 + j * 18, 186]], tm(['L5', 'isolated']), 0.6, t); } }; } }] });

/* ---------- D: auxins ---------- */
S.push({ id: 'D', from: 'D1', to: 'G1', cards: [{ pos: 'W', label: 'AUXINS · WHAT THEY DO', build: (el, s) => {
  const ch = [['IAA', 'NATURAL', AUX], ['IBA', 'NATURAL', AUX], ['NAA', 'SYNTHETIC', K.ink], ['2,4-D', 'SYNTHETIC', K.ink]].map(([n, k, c], i) => { const q = mk(s, 'g', {}); mk(q, 'rect', { x: 36 + i * 128, y: 80, width: 116, height: 70, rx: 12, fill: '#F4F5F7', stroke: c, 'stroke-width': 2.5 }); T(q, 94 + i * 128, 114, n, 26, c); T(q, 94 + i * 128, 138, k, 12, C.mute, { 'font-family': 'IBM Plex Mono' }); return [q, ['D2', i < 2 ? (i ? 'IBA' : 'IAA') : i === 2 ? 'NAA' : 'synthetic', -0.1]]; });
  const pl = mk(s, 'g', {}); P(pl, 'M270,540 L270,250', 'none', G.stem, 8); const apex = mk(pl, 'g', {}); PG.leaf(apex, 270, 250, 50, -120); PG.leaf(apex, 270, 250, 50, -60); circ(apex, 270, 236, 10, '#CFE8D4', C.ac, 3);
  const buds = [[270, 420, -1], [270, 340, 1], [270, 480, 1]].map(([x, y, d]) => { const b = mk(pl, 'g', {}); const st = P(b, '', 'none', G.stem, 6), l = P(b, '', G.leaf, G.leafS, 3); return { st, l, x, y, d }; });
  const ad = dots(pl, 4, AUX, 7); const sc = mk(s, 'g', {}); P(sc, 'M236,262 L304,262', 'none', K.red, 4, { 'stroke-dasharray': '6 4' }); cap(sc, 200, 266, 'CUT', { fill: K.red });
  const lab2 = cap(s, 270, 205, 'APICAL DOMINANCE', { fill: AUX, 'font-size': 16 });
  const rows = [['Roots on stem cuttings', 'help cuttings grow roots', ['D4', 'cuttings']], ['Flowering', 'for example in pineapples', ['D4', 'pineapples']], ['Stop early drop', 'young leaves and fruits stay', ['D5', 'stop']], ['Old ones fall', 'mature leaves and fruits drop', ['D5', 'old']], ['Parthenocarpy', 'tomato fruit without fertilisation', ['D7', 'parthenocarpy']], ['2,4-D weedkiller', 'kills dicot weeds, spares grass', ['D7', 'weeds']]]
    .map(([a, b, sp], i) => [div(el, 'rw', { left: 600 + (i % 2) * 492 + 'px', width: '472px', top: 84 + Math.floor(i / 2) * 100 + 'px' }, `<div class="rn">${a}</div><div class="rd">${b}</div>`), sp]);
  const mk2 = div(el, 'tb', { left: '600px', top: '400px' }, 'MADE AT THE GROWING TIPS OF STEMS AND ROOTS, THEN MOVE');
  return { els: [...ch.map(([q, sp]) => [q, sp, { ...POP, sc: 0.6 }]), [pl, ['D3', 'made', -0.3], { dy: 12 }], [mk2, ['D3', 'made']], [sc, ['D6', 'Cut', -0.1], { dy: 0, fade: 0.2 }], [lab2, ['D6', 'apical']], ...rows.map(([e, sp]) => [e, [...sp, -0.1], { dx: 16, dy: 0 }])],
    anim: t => { const c = tm(['D6', 'Cut']), cut = t > c + 0.3; apex.style.opacity = cut ? (1 - M.clamp((t - c - 0.3) / 0.4)).toFixed(2) : 1; flow(ad, () => [[270, 250], [270, 520]], tm(['D3', 'made']), 0.3, t); ad.forEach(d => { if (cut) d.style.opacity = 0; });
      const g = cut ? M.io((t - c - 0.5) / 1.6) : 0; buds.forEach(b => { const L = 14 + 90 * g, ex = b.x + b.d * L, ey = b.y - L * 0.7; attr(b.st, 'd', `M${b.x},${b.y} Q${b.x + b.d * L * 0.5},${b.y - 5} ${ex.toFixed(1)},${ey.toFixed(1)}`); attr(b.l, 'd', PG.leafD(ex, ey, 22 + 20 * g, b.d > 0 ? -40 : -140)); }); } }; } }] });

/* ---------- G: gibberellins + think ---------- */
const rice = (g, x, h, thin) => { const q = mk(g, 'g', {}); const st = P(q, '', 'none', G.stem, thin ? 4 : 6), l1 = P(q, '', G.leaf, G.leafS, 2.5), l2 = P(q, '', G.leaf, G.leafS, 2.5); const set = hh => { attr(st, 'd', `M${x},470 L${x},${470 - hh}`); attr(l1, 'd', PG.leafD(x, 470 - hh * 0.6, 50 + hh * 0.15, -120)); attr(l2, 'd', PG.leafD(x, 470 - hh * 0.8, 50 + hh * 0.15, -55)); }; set(h); q.set = set; return q; };
const TH = { q: 'A gardener cuts the top off a hedge. Why does it grow bushier?', opts: ['The cut adds more auxin', 'The tip stops holding back side buds'], right: 1, why: 'The tip held back the side buds. Remove it, and the side buds grow out.' };
S.push({ id: 'G', from: 'G1', to: 'T1', cards: [
  { pos: 'W', label: 'GIBBERELLINS · FROM A RICE DISEASE', tout: 'G8', build: (el, s) => {
    mk(s, 'rect', { x: 2, y: 470, width: 738, height: 108, rx: 14, fill: G.soilL }); const r1 = rice(s, 110, 130), r2 = rice(s, 280, 330, 1), r3 = rice(s, 520, 130);
    const fg = mk(s, 'g', {}); [0, 1, 2, 3].forEach(k => circ(fg, 266 + k * 10, 462 - (k % 2) * 6, 6, '#E3B6C2', '#9A4060', 1.5)); cap(fg, 280, 512, 'GIBBERELLA FUJIKUROI', { fill: '#FFFFFF', 'font-size': 14 });
    const ca = [cap(s, 110, 540, 'HEALTHY', { fill: '#FFFFFF' }), cap(s, 280, 540, 'BAKANE', { fill: '#FFFFFF' }), cap(s, 520, 540, 'TREATED', { fill: '#FFFFFF' })];
    const fl = mk(s, 'g', {}); P(fl, 'M640,120 L670,120 L670,170 L710,250 L600,250 L640,170 Z', '#EAF2FB', K.ink, 3); P(fl, 'M612,226 L698,226 L710,250 L600,250 Z', '#DCE6F7', GA, 2); cap(fl, 655, 280, 'GERM-FREE LIQUID', { fill: K.ink, 'font-size': 13 }); const dr = dots(s, 3, '#DCE6F7', 6);
    const gc = div(el, '', { position: 'absolute', left: '780px', top: '84px', display: 'flex', gap: '10px' }, ['GA1', 'GA2', 'GA3', '...', '100+'].map((x, i) => `<span class="chp" style="position:relative;${i === 2 ? 'background:#DCE6F7;color:#2E4E8F' : ''}">${x}</span>`).join(''));
    const gn = div(el, 'tb', { left: '1270px', top: '96px' }, 'ALL ARE ACIDIC');
    const EF = [['Longer grape stalks', ['G5', 'grape']], ['Longer, better-shaped apples', ['G5', 'apples']], ['Delay ageing: fruit stays on longer', ['G5', 'delay']], ['GA3 speeds up malting in brewing', ['G6', 'malting']], ['Sugarcane: up to 20 tonnes more per acre', ['G6', 'twenty']], ['Young conifers make seeds early', ['G7', 'conifers']], ['Bolting in beet and cabbage', ['G7', 'bolting']]];
    const ef = EF.map(([n, sp], i) => [div(el, '', { position: 'absolute', left: '780px', top: 150 + i * 56 + 'px', width: '780px', height: '48px', borderRadius: '10px', background: 'var(--soft)', display: 'flex', alignItems: 'center', padding: '0 18px', boxSizing: 'border-box', font: '600 22px Poppins', whiteSpace: 'nowrap' }, n), sp]);
    return { els: [[r1, ['G2', 'rice', -0.2], { dy: 10 }], [ca[0], ['G2', 'rice']], [r2, ['G2', 'tall', -0.2], { dy: 10 }], [ca[1], ['G2', 'bakane']], [fg, ['G2', 'fungus', -0.1], { ...POP, sc: 0.5 }], [fl, ['G3', 'liquid', -0.3], { dy: -12 }], [r3, ['G3', 'healthy', -0.1], { dy: 10 }], [ca[2], ['G3', 'treated']],
      [gc, ['G4', 'hundred', -0.2], { dy: 8 }], [gn, ['G4', 'acidic', -0.1], { dy: 8 }], ...ef.map(([e, sp]) => [e, [...sp, -0.2], { dx: 16, dy: 0 }])],
      anim: t => { const a = tm(['G3', 'showed']); r3.set(130 + 190 * M.io((t - a) / 2)); flow(dr, () => [[600, 252], [540, 330]], tm(['G3', 'liquid']), 0.8, t); dr.forEach(d => { if (t > a + 1.5) d.style.opacity = 0; }); } }; } },
  EP.think(TH, { tin: 'G8', opts: ['G8', 'gardener', -0.1], why: ['G9', 'tip'] })] });

/* ---------- W: pick the regulator ---------- */
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · PICK THE REGULATOR', svg: false, build: el => EP.cols(el, [
  ['PROBLEM 1 · WEEDY LAWN', '2,4-D, an auxin', 'KILLS DICOT WEEDS, SPARES GRASS', s => { mk(s, 'rect', { x: 0, y: 220, width: 496, height: 70, fill: '#CFE8B8' }); for (let k = 0; k < 18; k++) P(s, `M${30 + k * 26},230 q${k % 2 ? 6 : -6},-40 ${k % 2 ? 2 : -2},-70`, 'none', G.leafS, 3); const w = mk(s, 'g', {}); PG.leaf(w, 250, 150, 60, -150); PG.leaf(w, 250, 150, 60, -30); P(w, 'M250,150 L250,230', 'none', G.stem, 5); PG.cross(s, 250, 90, 20); }, ['W2', 'Problem', -0.2], ['W2', 'Use'], ['W2', 'auxin']],
  ['PROBLEM 2 · SHORT SUGARCANE', 'Spray gibberellins', 'LONGER STEMS, BIGGER YIELD', s => { const cane = (x, h) => { for (let y = 270; y > 270 - h; y -= 30) mk(s, 'rect', { x: x - 12, y: y - 28, width: 24, height: 28, rx: 4, fill: '#C5D98A', stroke: '#6E8B3D', 'stroke-width': 2.5 }); }; cane(150, 90); arrow(s, 200, 200, 280, 200, GA, 4); cane(350, 240); }, ['W3', 'Problem', -0.2], ['W3', 'Spray'], ['W3', 'lengthen']],
  ['PROBLEM 3 · SEEDLESS TOMATOES', 'Use an auxin', 'FRUIT WITHOUT FERTILISATION', s => { circ(s, 248, 150, 96, '#E8584A', '#9C2B22', 4); circ(s, 248, 150, 70, '#F28B7D', '#C0392B', 2); [0, 1, 2, 3].forEach(k => P(s, `M248,150 L${(248 + 70 * Math.cos(k * Math.PI / 2)).toFixed(1)},${(150 + 70 * Math.sin(k * Math.PI / 2)).toFixed(1)}`, 'none', '#C0392B', 2)); cap(s, 248, 275, 'NO SEEDS', { fill: K.ink }); }, ['W4', 'Problem', -0.2], ['W4', 'Use'], ['W4', 'fertilisation']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['sun', 'A window plant', 'BENDS TO THE LIGHT', ['H1', 'window']], ['cut', 'A trimmed hedge', 'GROWS BUSHIER', ['H1', 'hedge']], ['grass', 'Tall rice seedlings', 'FALL OVER', ['H2', 'rice']]],
  scenes: S,
  stmt: { l2: 'The shoot tip holds back the <span class="acc">side buds</span>.', f: '<span class="lad">cut the tip → side buds grow · <b>apical dominance</b></span>', t2: ['T1', 'shoot', -0.2], tf: ['T1', 'side'] },
  trap: { wrong: '2,4-D kills every plant it touches', right: '2,4-D removes dicot weeds; mature monocots are not affected', tWrong: ['X2', 'kills', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'removes', -0.2], tSvg: ['X3', 'Mature', -0.4],
    build: s => { for (let k = 0; k < 8; k++) P(s, `M${110 + k * 18},230 q${k % 2 ? 5 : -5},-40 ${k % 2 ? 2 : -2},-80`, 'none', G.leafS, 3); PG.tick(s, 170, 120, 16); const w = mk(s, 'g', {}); PG.leaf(w, 340, 170, 46, -150); PG.leaf(w, 340, 170, 46, -30); P(w, 'M340,170 L340,230', 'none', G.stem, 4); PG.cross(s, 340, 110, 16); } },
  where: { type: 'Match and odd-one-out questions: auxin and gibberellin uses, and how they were found', at: ['E1', 'match'] },
  mcq: { q: 'Which pair is NOT correctly matched?', opts: ['IAA: a natural auxin', 'NAA: a synthetic auxin', 'GA3: kills dicot weeds', 'Gibberellins: bolting in beet'], right: 2, optFs: 25 }, mcqAt: ['Q1', 'pair', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['GA3 does not kill weeds', ['A1', 'weeds']], ['2,4-D is the weedkiller', ['A1', 'Two']], ['IAA natural, NAA synthetic', ['A2', 'IAA']], ['Gibberellins: bolting', ['A3', 'bolting']]],
  recap: { title: 'Recap · auxins and gibberellins', lines: ['<b>PGRs</b>: small molecules · auxins, GAs, cytokinins promote · ABA inhibits', '<b>Discovery</b>: the Darwins, canary grass tip · Went: auxin from oat tips', '<b>Auxins</b>: IAA, IBA natural · NAA, 2,4-D synthetic · rooting, parthenocarpy', '<b>Apical dominance</b>: the tip holds back side buds · trim tea and hedges', '<b>Gibberellins</b>: bakane disease · longer stems, malting, bolting'] },
  yq: ['What is apical dominance?', 'Who isolated auxin, and from where?', 'What is bolting?'],
  next: { label: 'NEXT · EP 94', topic: 'Cytokinins, Ethylene and Abscisic Acid' }
});
})();
