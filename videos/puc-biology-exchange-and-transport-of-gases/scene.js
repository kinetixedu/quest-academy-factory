// PUC Biology Ep 98: Exchange and Transport of Gases (Living diagram, leaf green). Runner: ep.js + resp14.js
(() => {
const { C, mk, txt, cap, POP, lab, tm, div, attr } = EP;
const { K, P, circ, T, at, arrow, o2, co2, rbc, alveoli } = R14;
const ICN = { drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z'], glass: ['M6 3h12l-1.5 18h-9Z', 'M7 9h10'], run: ['M13 4a1.5 1.5 0 1 0 .1 0', 'M7 21l3-6 3 2v4', 'M10 15l1-5 4 3 3-1', 'M8 11l3-2'] };
// captions: join the spoken letters 'p O 2' / 'p C O 2' into pO2 / pCO2
Object.values(M.CUES.lines).forEach(L => { const W = L.words, out = []; for (let i = 0; i < W.length; i++) { const a = W[i]; if (a.w === 'p' && W[i + 1] && W[i + 1].w === 'O' && W[i + 2] && /^2/.test(W[i + 2].w)) { out.push({ w: 'pO' + W[i + 2].w, t: a.t }); i += 2; } else if (a.w === 'p' && W[i + 1] && W[i + 1].w === 'C' && W[i + 2] && W[i + 2].w === 'O' && W[i + 3] && /^2/.test(W[i + 3].w)) { out.push({ w: 'pCO' + W[i + 3].w, t: a.t }); i += 3; } else out.push(a); } L.words = out; });
const S = [];
const num = (g, x, y, s, c, fs = 26) => T(g, x, y, s, fs, c, { 'font-family': 'IBM Plex Mono' });
const hb = (g, x, y, s = 1) => { const G = mk(g, 'g', {}); mk(G, 'rect', { x: x - 44 * s, y: y - 44 * s, width: 88 * s, height: 88 * s, rx: 30 * s, fill: '#F2B8B0', stroke: '#7A1F16', 'stroke-width': 3 }); const sl = [[-22, -22], [22, -22], [-22, 22], [22, 22]].map(([a, b]) => circ(G, x + a * s, y + b * s, 13 * s, '#FFFFFF', '#7A1F16', 2.5)); return { g: G, sl }; };

/* ---------- H: ink, finger, run ---------- */
S.push(EP.hook({ label: 'BIOLOGY LAB', face: 'diya', pill: ['Ink spreads by itself', ['H1', 'drop', -0.1]], rlabel: "DIYA'S TWO QUESTIONS",
  q: [['How does oxygen get into my blood?', ['H3', 'asked']], ['How does blood carry it to every cell?', ['H3', 'carry', -0.4]]],
  a: [['ANSWER 1', 'Diffusion, from high pressure to low', ['H4', 'diffusion']], ['ANSWER 2', 'O2 on haemoglobin, CO2 as bicarbonate', ['H4', 'haemoglobin']]],
  chips: [['Partial pressure', ['H5', 'partial']], ['Diffusion membrane', ['H5', 'diffusion']], ['Gas transport', ['H5', 'transport']], ['Dissociation curve', ['H5', 'dissociation']]],
  build: (el, s) => {
    mk(s, 'rect', { x: 0, y: 70, width: 784, height: 510, fill: '#F6EEDC' }); mk(s, 'rect', { x: 0, y: 420, width: 784, height: 160, fill: '#9E7B55' });
    const gl = mk(s, 'g', {}); P(gl, 'M120,160 L380,160 L360,420 L140,420 Z', '#E9F3F9', K.ink, 4); mk(gl, 'rect', { x: 128, y: 200, width: 244, height: 4, fill: '#BFD9E8' });
    const ink = mk(gl, 'circle', { cx: 250, cy: 230, r: 10, fill: '#4A5FC1', opacity: 0.8 });
    const fi = mk(s, 'g', {}); P(fi, 'M520,420 L520,240 C520,200 600,200 600,240 L600,420 Z', K.skin, K.skinS, 4); P(fi, 'M535,250 C540,225 580,225 585,250', 'none', K.skinS, 2); const dr = P(fi, 'M560,170 C540,200 545,215 560,215 C575,215 580,200 560,170 Z', K.red, '#7A1F16', 2.5);
    return { els: [[gl, ['H1', 'drop', -0.3], { dy: 12 }], [fi, ['H1', 'pricked', -0.3], { dy: 12 }], [dr, ['H1', 'bleeds', -0.1], { ...POP, sc: 0.4 }]],
      anim: t => { const a = tm(['H1', 'spreads']), v = M.io((t - a) / 4); attr(ink, 'r', (10 + 100 * v).toFixed(1)); attr(ink, 'cy', (230 + 80 * v).toFixed(1)); attr(ink, 'opacity', (0.8 - 0.55 * v).toFixed(2)); } };
  } }));

/* ---------- B: partial pressure ---------- */
S.push({ id: 'B', from: 'B1', to: 'Z1', cards: [{ pos: 'W', label: 'PARTIAL PRESSURE · EACH GAS PUSHES ITS SHARE', build: (el, s) => {
  const jar = mk(s, 'g', {}); mk(jar, 'rect', { x: 80, y: 110, width: 360, height: 340, rx: 24, fill: '#FBFAF6', stroke: K.ink, 'stroke-width': 4 });
  const ms = []; for (let k = 0; k < 18; k++) { const x = 120 + (k * 83) % 280, y = 150 + (k * 47) % 260; ms.push(k % 3 === 0 ? o2(jar, x, y, 1.1) : k % 7 === 1 ? co2(jar, x, y, 1) : circ(jar, x, y, 10, '#FFFFFF', '#9AA0AC', 2.5)); }
  cap(jar, 260, 490, 'AIR: A MIX OF GASES', { fill: C.ink });
  const bar = mk(s, 'g', {}); mk(bar, 'rect', { x: 500, y: 200, width: 400, height: 60, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); mk(bar, 'rect', { x: 500, y: 200, width: 84, height: 60, fill: K.o2L, stroke: K.o2, 'stroke-width': 3 }); cap(bar, 700, 300, 'TOTAL PRESSURE', { fill: C.ink }); T(bar, 542, 240, 'pO2', 20, K.o2);
  const fl = mk(s, 'g', {}); mk(fl, 'rect', { x: 980, y: 140, width: 240, height: 200, rx: 16, fill: '#FBFAF6', stroke: K.ink, 'stroke-width': 3 }); mk(fl, 'rect', { x: 1300, y: 140, width: 240, height: 200, rx: 16, fill: '#FBFAF6', stroke: K.ink, 'stroke-width': 3 }); cap(fl, 1100, 370, 'HIGH pO2', { fill: K.o2 }); cap(fl, 1420, 370, 'LOW pO2', { fill: K.o2 });
  const mv = Array.from({ length: 8 }, () => o2(fl, 0, 0, 1)); const ar = mk(s, 'g', {}); arrow(ar, 1230, 240, 1290, 240, C.ac, 5);
  const sol = div(el, 'pillp ac', { left: '980px', top: '420px' }, 'CO2 dissolves 20-25 times better than O2');
  return { els: [[jar, 'B1', { dy: 12 }], [bar, ['B2', 'part', -0.2], { dy: 12 }], [fl, ['B3', 'diffuse', -0.2], { dy: 12 }], [ar, ['B3', 'low', -0.1], POP], [sol, ['B3', 'twenty', -0.2]]],
    anim: t => { const a = tm(['B3', 'low']); mv.forEach((m, k) => { const go = k < 3 ? M.io((t - a - k * 0.3) / 1.2) : 0; const x0 = 1010 + (k * 53) % 180, y0 = 170 + (k * 37) % 140; at(m, x0 + 320 * go, y0); }); } }; } }] });

/* ---------- Z: zoom ladder ---------- */
S.push(EP.zoom({ to: 'L1', names: ['ALVEOLUS', 'AIR MEETS BLOOD', 'DIFFUSION MEMBRANE'], scales: ['x200', 'x2,000', 'x20,000'], ghost: 'EXAMPLE FIGURES', nfs: 46,
  info: [['RUNG 1 OF 3', 'Alveolus', 'Wrapped in a net', 'of capillaries.'], ['RUNG 2 OF 3', 'A thin wall', 'Only a thin wall', 'between air and blood.'], ['RUNG 3 OF 3', 'Three layers', 'Less than a', 'millimetre thick.']],
  av: { who: 'Diya', text: 'So thin, gases just slip across!', tin: ['Z4', 'Together', 0.3], tout: ['L1', null, -0.1] },
  rungs: [
    { focus: [690, 250, 60], build: g => { circ(g, 528, 260, 170, K.alv, K.lungS, 4); cap(g, 528, 266, 'AIR', { fill: K.lungS, 'font-size': 22 }); for (let k = 0; k < 9; k++) { const a = k / 9 * 2 * Math.PI; P(g, `M${528 + 175 * Math.cos(a)},${260 + 175 * Math.sin(a)} C${528 + 230 * Math.cos(a + 0.2)},${260 + 230 * Math.sin(a + 0.2)} ${528 + 230 * Math.cos(a + 0.5)},${260 + 230 * Math.sin(a + 0.5)} ${528 + 175 * Math.cos(a + 0.7)},${260 + 175 * Math.sin(a + 0.7)}`, 'none', k % 2 ? K.red : K.poor, 6); }
      return { labs: [[lab(g, 450, 200, 260, 70, 'Alveolus', 'end'), ['Z2', 'alveolus']], [lab(g, 700, 230, 880, 110, 'Capillary'), ['Z2', 'capillaries']]] }; } },
    { at: 'Z3', focus: [528, 250, 60], build: g => { P(g, 'M0,0 L1056,0 L1056,220 C700,240 360,240 0,220 Z', K.alv, K.lungS, 4); mk(g, 'rect', { x: 0, y: 270, width: 1056, height: 140, fill: '#F2B8B0', stroke: '#7A1F16', 'stroke-width': 4 }); [200, 520, 840].forEach(x => rbc(g, x, 340, 40)); cap(g, 150, 120, 'AIR IN ALVEOLUS', { fill: K.lungS, 'font-size': 20 });
      return { labs: [[lab(g, 600, 245, 720, 130, 'Thin wall'), ['Z3', 'thin']], [lab(g, 520, 340, 640, 470, 'Blood in capillary'), ['Z3', 'blood']]] }; } },
    { at: 'Z4', build: g => { mk(g, 'rect', { x: 0, y: 0, width: 1056, height: 150, fill: '#FBEDEE' }); const L1 = mk(g, 'g', {}); for (let k = 0; k < 7; k++) P(L1, `M${k * 160},150 Q${k * 160 + 80},120 ${k * 160 + 160},150 L${k * 160 + 160},190 L${k * 160},190 Z`, K.alv, K.lungS, 3);
      mk(g, 'rect', { x: 0, y: 190, width: 1056, height: 70, fill: '#EDE2C6', stroke: '#A08A5A', 'stroke-width': 2 }); for (let k = 0; k < 7; k++) P(g, `M${k * 160},260 L${k * 160 + 160},260 L${k * 160 + 160},290 Q${k * 160 + 80},310 ${k * 160},290 Z`, '#F2B8B0', '#7A1F16', 3); mk(g, 'rect', { x: 0, y: 300, width: 1056, height: 226, fill: '#FBE3E0' });
      const O = [0, 1, 2].map(() => o2(g, 0, 0, 1.3)), Cd = [0, 1].map(() => co2(g, 0, 0, 1.2));
      return { labs: [[lab(g, 120, 160, 140, 60, 'Squamous epithelium of alveolus'), ['Z4', 'squamous']], [lab(g, 300, 225, 180, 420, 'Basement substance'), ['Z4', 'basement']], [lab(g, 620, 280, 640, 440, 'Endothelium of capillary'), ['Z4', 'endothelium']]],
        anim: t => { const a = tm(['Z4', 'three']); O.forEach((m, k) => { const u = ((t - a) * 0.3 + k / 3) % 1; at(m, 400 + k * 160, 80 + 340 * u); m.style.opacity = t > a ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); Cd.forEach((m, k) => { const u = ((t - a) * 0.3 + k / 2) % 1; at(m, 820 + k * 120, 440 - 360 * u); m.style.opacity = t > a ? Math.min(1, 5 * (1 - u)).toFixed(2) : 0; }); } }; } }] }));

/* ---------- L: one oxygen molecule ---------- */
const LT = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => [id, null, 0.45]);
S.push({ id: 'L', from: 'L1', to: 'T1', keep: 1, cards: [
  { pos: 'L', label: 'ONE OXYGEN MOLECULE · STEP BY STEP', svg: false, build: el => ({ anim: EP.steps(el, [['Alveolus: pO2 104', 'mm Hg · high'], ['Into the blood', 'blood arriving: pO2 40 · low'], ['Binds haemoglobin', 'oxyhaemoglobin · up to four O2'], ['To the tissues', 'blood leaving: pO2 95 · tissues 40'], ['Into the cells', 'O2 leaves haemoglobin']], LT) }) },
  { pos: 'R', label: 'FOLLOW THE OXYGEN · pO2 IN mm Hg', build: (el, s) => {
    circ(s, 200, 170, 90, K.alv, K.lungS, 3.5); num(s, 200, 180, '104', K.o2, 30); cap(s, 200, 290, 'ALVEOLUS', { fill: C.ink });
    const cp = mk(s, 'g', {}); mk(cp, 'rect', { x: 60, y: 320, width: 600, height: 60, rx: 30, fill: '#F2B8B0', stroke: K.ink, 'stroke-width': 3 }); const gr = mk(cp, 'rect', { x: 60, y: 320, width: 600, height: 60, rx: 30, fill: 'url(#gr98)', stroke: K.ink, 'stroke-width': 3 });
    const df = mk(s, 'defs', {}); df.innerHTML = `<linearGradient id="gr98"><stop offset="0" stop-color="${K.poorL}"/><stop offset="1" stop-color="${K.redL}"/></linearGradient>`;
    num(s, 100, 420, '40', K.poor); cap(s, 120, 450, 'ARRIVING', { fill: K.poor }); num(s, 600, 420, '95', K.red); cap(s, 600, 450, 'LEAVING', { fill: K.red });
    const tis = mk(s, 'g', {}); mk(tis, 'rect', { x: 560, y: 120, width: 180, height: 150, rx: 20, fill: '#F3F7EA', stroke: K.ink, 'stroke-width': 3 }); num(tis, 650, 205, '40', K.o2, 30); cap(tis, 650, 105, 'TISSUE CELLS', { fill: C.ink });
    const H = hb(s, 0, 0, 0.8); const O = o2(s, 0, 0, 1.3);
    return { anim: t => { const ts = LT.map(tm); const m = (a, b, u) => a + (b - a) * M.io(u);
      let ox = 200, oy = 150, hx = 120, op = 0; if (t > ts[0] - 0.3) op = 1; if (t > ts[1]) { const u = (t - ts[1]) / 1.2; ox = m(200, 120, u); oy = m(150, 330, u); }
      if (t > ts[2]) { ox = 120 - 22 * 0.8; oy = 350 - 22 * 0.8; }
      if (t > ts[3]) { const u = (t - ts[3]) / 2; hx = m(120, 580, u); ox = hx - 17.6; }
      if (t > ts[4]) { const u = (t - ts[4]) / 1.2; ox = m(hx - 17.6, 650, u); oy = m(332, 180, u); }
      at(H.g, hx, 350); H.g.style.opacity = t > ts[1] - 0.2 ? 1 : 0; H.sl.forEach((e, k) => attr(e, 'fill', t > ts[2] + 0.3 * k && t < ts[4] + 0.2 * k + 0.6 ? K.o2L : '#FFFFFF')); at(O, ox, oy); O.style.opacity = op; } }; } }] });

/* ---------- C: oxygen dissociation curve ---------- */
S.push({ id: 'C', from: 'C1', to: 'D1', cards: [{ pos: 'W', label: 'THE OXYGEN DISSOCIATION CURVE', ghost: 'EXAMPLE FIGURES', build: (el, s) => {
  const X = p => 160 + p * 5.6, Y = v => 500 - v * 3.8; R14.P(s, `M160,${Y(100)} L160,500 L${X(120)},500`, 'none', K.ink, 3);
  [0, 20, 40, 60, 80, 100, 120].forEach(p => { R14.P(s, `M${X(p)},500 L${X(p)},508`, 'none', K.ink, 2); txt(s, X(p), 530, String(p), { 'text-anchor': 'middle', 'font-size': 16 }); }); [0, 50, 100].forEach(v => txt(s, 148, Y(v) + 6, String(v), { 'text-anchor': 'end', 'font-size': 16 }));
  cap(s, X(60), 560, 'pO2 (mm Hg)', { fill: K.ink }); cap(s, 100, Y(50), '% SATURATION OF Hb', { fill: K.ink, transform: `rotate(-90 100 ${Y(50)})` });
  let d = ''; for (let p = 0; p <= 120; p += 2) { const v = 100 * Math.pow(p, 2.7) / (Math.pow(p, 2.7) + Math.pow(26, 2.7)); d += (p ? 'L' : 'M') + X(p).toFixed(1) + ',' + Y(v).toFixed(1); } const cv = R14.P(s, d, 'none', K.red, 6);
  const sv = p => 100 * Math.pow(p, 2.7) / (Math.pow(p, 2.7) + Math.pow(26, 2.7));
  const pA = mk(s, 'g', {}); circ(pA, X(104), Y(sv(104)), 12, K.redL, K.red, 3); const pT = mk(s, 'g', {}); circ(pT, X(40), Y(sv(40)), 12, K.poorL, K.poor, 3);
  const sh = div(el, 'chp', { left: '520px', top: '420px' }); sh.textContent = 'S-shaped = sigmoid';
  const al = div(el, 'pillp ac', { left: '920px', top: '120px', width: '600px', whiteSpace: 'normal', lineHeight: '1.35', height: 'auto', padding: '14px 20px', display: 'block' }, '<b>Alveoli · O2 binds</b><br>high pO2 · low pCO2 · fewer H+ · lower temperature');
  const ti = div(el, 'pillp', { left: '920px', top: '300px', width: '600px', whiteSpace: 'normal', lineHeight: '1.35', height: 'auto', padding: '14px 20px', display: 'block' }, '<b>Tissues · O2 lets go</b><br>low pO2 · high pCO2 · more H+ · higher temperature');
  return { els: [[sh, ['C2', 'sigmoid', -0.1]], [pA, ['C3', 'alveoli', -0.2], { ...POP, sc: 0.3 }], [al, ['C3', 'alveoli', -0.1]], [pT, ['C3', 'tissues', -0.2], { ...POP, sc: 0.3 }], [ti, ['C3', 'tissues', -0.1]]],
    labs: [[lab(s, X(104), Y(sv(104)), X(80), Y(100) - 20, 'Alveoli', 'end'), ['C3', 'alveoli']], [lab(s, X(40), Y(sv(40)), X(60), Y(40), 'Tissues'), ['C3', 'tissues']]],
    anim: t => M.draw(cv, t, tm(['C2', 'Plot']), 2.2) }; } }] });

/* ---------- D: O2 vs CO2 transport ---------- */
const hbar = (el, s, y, parts, tS) => { let x = 60; const out = []; parts.forEach(([pc, c, n], i) => { const w = pc * 6.6; const r = mk(s, 'rect', { x, y, width: w, height: 70, fill: c, stroke: K.ink, 'stroke-width': 2.5 }); const e = div(el, 'chp', { left: x + 'px', top: y + 90 + i * 0 + 'px', position: 'absolute' }); e.innerHTML = n; out.push([r, tS[i], { dx: -10, dy: 0 }], [e, tS[i]]); x += w; }); return out; };
S.push({ id: 'D', from: 'D1', to: 'U1', cards: [
  { pos: 'L', label: 'OXYGEN TRANSPORT', pill: ['Mostly on haemoglobin', ['D2', 'haemoglobin', -0.1], 'ac'], build: (el, s) => {
    const r = rbc(s, 220, 350, 95); const h = hb(s, 540, 350, 1.7); h.sl.forEach(e => attr(e, 'fill', K.o2L));
    const e1 = div(el, 'chp', { left: '60px', top: '110px' }); e1.innerHTML = '<b style="font-family:IBM Plex Mono">97%</b> in RBCs, on haemoglobin'; const e2 = div(el, 'chp', { left: '60px', top: '170px' }); e2.innerHTML = '<b style="font-family:IBM Plex Mono">3%</b> dissolved in plasma';
    return { els: [[e1, ['D2', 'ninety', -0.1]], [r, ['D2', 'red', -0.2], POP], [h.g, ['D2', 'haemoglobin', -0.2], POP], [e2, ['D2', 'three', -0.1]]] }; } },
  { pos: 'R', label: 'CARBON DIOXIDE TRANSPORT', tin: ['D3', null, -0.2], pill: ['Mostly as bicarbonate', ['D3', 'bicarbonate', -0.1], 'ac'], build: (el, s) => {
    const rows = [['20-25%', 'as carbamino-haemoglobin', 'carbamino'], ['~70%', 'as bicarbonate (HCO3-)', 'seventy'], ['~7%', 'dissolved in plasma', 'seven']].map(([p, n, w], i) => { const e = div(el, 'chp', { left: '60px', top: 110 + i * 64 + 'px' }); e.innerHTML = `<b style="font-family:IBM Plex Mono">${p}</b> ${n}`; return [e, ['D3', w, -0.1, w === 'seven' ? 1 : 0]]; });
    const g = mk(s, 'g', {}); mk(g, 'rect', { x: 60, y: 330, width: 660, height: 60, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 2.5 }); mk(g, 'rect', { x: 60, y: 330, width: 152, height: 60, fill: K.redL, stroke: K.ink, 'stroke-width': 2.5 }); mk(g, 'rect', { x: 212, y: 330, width: 462, height: 60, fill: K.co2L, stroke: K.ink, 'stroke-width': 2.5 }); mk(g, 'rect', { x: 674, y: 330, width: 46, height: 60, fill: '#FFF6D6', stroke: K.ink, 'stroke-width': 2.5 });
    return { els: [...rows, [g, ['D3', 'carbamino', -0.2], { dy: 10 }]] }; } }] });

/* ---------- U: carbonic anhydrase + delivery + think ---------- */
const TH = { q: 'In the tissues, pCO2 is high. Does that help haemoglobin hold oxygen, or let it go?', opts: ['Hold it', 'Let it go'], right: 1, why: 'It lets go. High pCO2 makes O2 leave haemoglobin, right where cells need it.' };
S.push({ id: 'U', from: 'U1', to: 'W1', cards: [
  { pos: 'L', label: 'CARBONIC ANHYDRASE · IN RED BLOOD CELLS', tout: 'U4', svg: false, build: el => {
    const eq = div(el, '', { position: 'absolute', left: '36px', top: '200px', width: '712px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', font: "600 30px 'IBM Plex Mono'", color: C.ink });
    eq.innerHTML = ['CO2 + H2O', '<span class="ar">⇌</span>', 'H2CO3', '<span class="ar">⇌</span>', 'HCO3- + H+'].map(x => `<span>${x}</span>`).join(''); const sp = [...eq.children];
    const tl = div(el, 'pillp ac', { left: '60px', top: '320px' }, 'At the tissues: forward → bicarbonate'), tr = div(el, 'pillp', { left: '60px', top: '400px' }, 'At the alveoli: backward → CO2 breathed out');
    const en = div(el, 'chp', { left: '60px', top: '110px' }); en.textContent = 'Enzyme: carbonic anhydrase';
    return { els: [[en, ['U2', 'enzyme', -0.1]], [eq, ['U2', 'joins', -0.2], { dy: 10 }], [tl, ['U2', 'splits', -0.1]], [tr, ['U3', 'backwards', -0.2]]],
      anim: t => { const f = t < tm(['U3', 'backwards']); sp.forEach((e, i) => { e.style.color = i === (f ? 4 : 0) && t > tm(['U2', 'splits']) ? C.ac : C.ink; }); } }; } },
  { pos: 'R', label: 'EVERY 100 mL OF BLOOD DELIVERS', tin: ['U3', 'Every', -0.3], tout: 'U4', build: (el, s) => {
    const b = mk(s, 'g', {}); P(b, 'M120,140 L320,140 L310,460 L130,460 Z', '#FFFFFF', K.ink, 4); mk(b, 'rect', { x: 134, y: 220, width: 172, height: 236, fill: K.redL }); cap(b, 220, 500, '100 mL BLOOD', { fill: C.ink });
    const a1 = mk(s, 'g', {}); arrow(a1, 350, 250, 470, 250, K.o2, 5); o2(a1, 540, 250, 1.6); T(a1, 640, 260, '5 mL O2', 26, K.o2, { 'text-anchor': 'start' }); cap(a1, 560, 300, 'TO THE TISSUES', { fill: C.ink, 'text-anchor': 'start' });
    const a2 = mk(s, 'g', {}); arrow(a2, 350, 390, 470, 390, K.co2, 5); co2(a2, 540, 390, 1.5); T(a2, 640, 400, '4 mL CO2', 26, K.co2, { 'text-anchor': 'start' }); cap(a2, 560, 440, 'TO THE ALVEOLI', { fill: C.ink, 'text-anchor': 'start' });
    return { els: [[b, ['U3', 'Every', -0.2], { dy: 10 }], [a1, ['U3', 'five', -0.1], { dx: -16, dy: 0 }], [a2, ['U3', 'four', -0.1], { dx: -16, dy: 0 }]] }; } },
  EP.think(TH, { tin: 'U4', opts: ['U4', 'Does', -0.1], why: ['U5', 'High'] })] });

/* ---------- W: which way? ---------- */
const box = (s, x, lbl, v, c) => { mk(s, 'rect', { x, y: 60, width: 170, height: 150, rx: 14, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 3 }); num(s, x + 85, 150, v, c, 44); cap(s, x + 85, 240, lbl, { 'font-size': 14, fill: C.ink }); };
S.push({ id: 'W', from: 'W1', to: 'X1', cards: [{ pos: 'W', label: 'WORKED EXAMPLE · WHICH WAY AT THE ALVEOLUS? (mm Hg)', svg: false, build: el => EP.cols(el, [
  ['STEP 1 · OXYGEN', '104 - 40 = 64 → into blood', 'BIG GAP, O2 MOVES IN', s => { box(s, 40, 'ALVEOLUS pO2', '104', K.o2); box(s, 286, 'BLOOD IN pO2', '40', K.poor); arrow(s, 218, 135, 280, 135, C.ac, 5); }, ['W2', 'Oxygen', -0.2], ['W2', 'sixty'], ['W2', 'into']],
  ['STEP 2 · CARBON DIOXIDE', '45 - 40 = 5 → into alveolus', 'SMALL GAP, CO2 MOVES OUT', s => { box(s, 40, 'ALVEOLUS pCO2', '40', K.co2); box(s, 286, 'BLOOD IN pCO2', '45', K.poor); arrow(s, 280, 135, 218, 135, C.ac, 5); }, ['W3', 'Carbon', -0.2], ['W3', 'five'], ['W3', 'out']],
  ['STEP 3 · WHY 5 IS ENOUGH', 'CO2: 20-25 times more soluble', 'DIFFUSES FAST WITH A SMALL PUSH', s => { co2(s, 160, 140, 2.4); o2(s, 360, 140, 2.2); num(s, 160, 230, '20-25x', K.co2, 30); num(s, 360, 230, '1x', K.o2, 30); }, ['W4', 'Why', -0.2], ['W4', 'dissolves'], ['W4', 'fast']]]) }] });

EP.run({
  icons: ICN,
  jobs: [['glass', 'Ink in water', 'IT SPREADS', ['H1', 'drop']], ['drop', 'A pricked finger', 'BRIGHT RED BLOOD', ['H1', 'pricked']], ['run', 'A long run', 'BREATHING HARD', ['H1', 'long']]],
  scenes: S,
  stmt: { l2: 'Gases go from <span class="acc">high</span> to low pressure.', f: '<span class="lad">alveolus pO2 104 → blood 40 · blood pCO2 45 → alveolus 40</span>', t2: ['T1', 'Gases', -0.2], tf: ['T1', 'move'] },
  trap: { wrong: 'Most CO2 travels on haemoglobin', right: 'About 70% travels as bicarbonate · only 20-25% on haemoglobin', tWrong: ['X2', 'most', -0.2], tStrike: ['X3', 'But', -0.05], tRight: ['X3', 'bicarbonate', -0.3], tSvg: ['X3', 'Only', -0.4],
    build: s => { mk(s, 'rect', { x: 40, y: 100, width: 380, height: 50, fill: '#FFFFFF', stroke: K.ink, 'stroke-width': 2.5 }); mk(s, 'rect', { x: 40, y: 100, width: 87, height: 50, fill: K.redL, stroke: K.ink, 'stroke-width': 2.5 }); mk(s, 'rect', { x: 127, y: 100, width: 266, height: 50, fill: K.co2L, stroke: K.ink, 'stroke-width': 2.5 }); cap(s, 260, 131, 'HCO3- ~70%', { 'font-size': 14 }); cap(s, 230, 190, 'HOW CO2 TRAVELS', { 'font-size': 14 }); } },
  where: { type: 'Statement questions: partial pressures, percentages of transport, factors for binding and release', at: ['E1', 'statement'] },
  mcq: { q: 'Which statements are correct?<div style="font:500 22px Poppins;line-height:1.45;margin-top:10px">I. pO2 in the alveoli is about 104 mm Hg.<br>II. About 97% of O2 is carried dissolved in plasma.<br>III. RBCs have a high concentration of carbonic anhydrase.<br>IV. The oxygen dissociation curve is sigmoid.</div>', opts: ['I and II only', 'II and IV only', 'I, III and IV only', 'I, II and III only'], right: 2 }, mcqAt: ['Q1', 'four', -0.2],
  sol: [['Answer: <b style="color:var(--ok)">C</b>', ['A1', 3, 0.1]], ['I: alveolar pO2 is 104', ['A2', 'Alveolar']], ['III: RBCs rich in the enzyme', ['A2', 'carbonic']], ['IV: the curve is sigmoid', ['A2', 'sigmoid']], ['II is wrong: 97% on Hb', ['A3', 'wrong']]],
  recap: { title: 'Recap · exchange and transport', lines: ['<b>pO2</b>: alveoli 104 · blood in 40 · blood out 95 · tissues 40 mm Hg', '<b>Membrane</b>: squamous epithelium · basement substance · endothelium', '<b>O2</b>: 97% on haemoglobin · 3% in plasma · curve is sigmoid', '<b>CO2</b>: 20-25% carbamino-Hb · ~70% bicarbonate · ~7% plasma', '<b>100 mL blood</b>: gives ~5 mL O2 to tissues · ~4 mL CO2 to alveoli'] },
  yq: ['What is partial pressure?', 'Name the three layers of the diffusion membrane.', 'How is most carbon dioxide carried in blood?'],
  next: { label: 'NEXT · EP 99', topic: 'Regulation of Respiration and Respiratory Disorders' }
});
})();
