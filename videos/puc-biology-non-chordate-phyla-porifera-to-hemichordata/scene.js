// PUC Biology Ep 35: Non-Chordate Phyla, Porifera to Hemichordata (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = AN.BR, GRN = C.ac, WAT = '#5AA0C8', ECTO = AN.ECTO, MESO = AN.MESO, ENDO = AN.ENDO, COEL = AN.COEL, NOTO = '#3D7A8C', RED = '#C0392B';
Object.assign(M.IC, AN.IC, {
  comb: ['M12 3c4 0 6 4 6 8s-2 8-6 8-6-4-6-8 2-8 6-8Z', 'M9 6v10', 'M12 4v15', 'M15 6v10', 'M8 19l-2 3', 'M16 19l2 3'],
  flat: ['M12 2c3 0 4 2 4 4 2 4 1 11-4 16-5-5-6-12-4-16 0-2 1-4 4-4Z', 'M10.5 6h.01', 'M13.5 6h.01'],
  snail: ['M3 19h15c2 0 3-1 3-2', 'M12 18a6 6 0 1 1 0-12 4 4 0 0 1 0 8 2 2 0 0 1 0-4', 'M18 17V9', 'M20 17v-6'],
  balano: ['M3 12c0-2 2-3 4-3v6c-2 0-4-1-4-3Z', 'M7 9h3v6H7Z', 'M10 10c4-1 8-1 11 1v2c-3 2-7 2-11 1Z'],
  round: ['M3 15c3-6 6 4 9-2s5-4 9-2'],
});
const lab = (g, px, py, lx, ly, s, an = 'start') => { const ln = mk(g, 'path', { d: `M${(+px).toFixed(1)},${(+py).toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; };
const labT = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };
const disc = (g, x, y, L) => L.map(([f, s, r]) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': 2.5 }));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1'), tU1 = T0('U1'), tU4 = T0('U4'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tU1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const PH = ['Porifera', 'Coelenterata', 'Ctenophora', 'Platyhelminthes', 'Aschelminthes', 'Annelida', 'Arthropoda', 'Mollusca', 'Echinodermata', 'Hemichordata'];
const PIC = ['sponge', 'jelly', 'comb', 'flat', 'round', 'worm', 'roach', 'snail', 'star', 'balano'];

/* ---------- title card ---------- */
const JOBS = [['jar', 'Ten jars', 'A MUSEUM SHELF', 'jars'], ['sponge', 'A sponge', 'JAR 1', 'sponge'], ['star', 'A starfish', 'JAR 9', 'starfish']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 34, C.ac, 2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: the shelf ---------- */
const hj = $('#hjS'), JX = [100, 246, 392, 538, 684], JY = [176, 370];
JY.forEach(y => { mk(hj, 'rect', { x: 24, y: y + 78, width: 736, height: 14, rx: 4, fill: '#B98A5A', stroke: BR, 'stroke-width': 2.5 }); });
const JAR = PH.map((_, i) => { const x = JX[i % 5], y = JY[Math.floor(i / 5)], g = mk(hj, 'g', {});
  mk(g, 'rect', { x: x - 56, y: y - 66, width: 112, height: 142, rx: 18, fill: '#EEF6F7', stroke: '#8FAAB0', 'stroke-width': 3 });
  mk(g, 'rect', { x: x - 46, y: y - 82, width: 92, height: 20, rx: 5, fill: '#9C7A52', stroke: BR, 'stroke-width': 2.5 });
  const inner = mk(g, 'g', {});
  const S = [['sponge', 0.42, { cut: false }], ['jelly', 0.42], ['comb', 0.4], ['flat', 0.42], ['round', 0.4], ['worm', 1, { n: 7, L: 84 }], ['roach', 0.34], ['snail', 0.36], ['star', 0.44], ['balano', 0.36]][i];
  AN.draw(S[0], inner, x, y - (i === 1 || i === 2 ? 14 : 4), S[1], S[2] || {});
  mk(g, 'rect', { x: x - 22, y: y + 44, width: 44, height: 24, rx: 5, fill: '#fff', stroke: '#8FAAB0', 'stroke-width': 2 });
  txt(g, x, y + 62, String(i + 1), { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.ink });
  const ring = mk(g, 'rect', { x: x - 64, y: y - 90, width: 128, height: 174, rx: 22, fill: 'none', stroke: GRN, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
  return { g, ring }; });
const tJars = wt('H1', 'jars'), tJr = { 0: wt('H1', 'sponge'), 1: wt('H1', 'jellyfish'), 3: wt('H1', 'tapeworm'), 8: wt('H1', 'starfish') };
$('#p10').innerHTML = PH.map((n, i) => `<div style="position:absolute;left:${36 + (i % 2) * 368}px;top:${84 + Math.floor(i / 2) * 64}px;width:344px;height:54px;border-radius:12px;background:var(--soft);display:flex;align-items:center;gap:12px;padding:0 14px;font:600 22px Poppins;white-space:nowrap" id="pl${i}">
  <b style="width:34px;height:34px;border-radius:50%;background:var(--ac);color:#fff;font:700 16px Poppins;display:flex;align-items:center;justify-content:center;flex:none">${i + 1}</b>${n}</div>`).join('');

/* ---------- P: the tour, jar by jar ---------- */
$('#pch').innerHTML = PH.map((_, i) => `<span class="zc" id="pc${i}">${String(i + 1).padStart(2, '0')}</span>`).join('');
const tP = PH.map((_, i) => T0('P' + (i + 1)));
const INFO = [['THE SPONGES', [['Cellular level', 'Cellular'], ['Water canal system', 'Water'], ['Collar cells: choanocytes', 'collar']], 'Sycon · Spongilla · Euspongia'],
  ['ALSO CALLED CNIDARIA', [['Radial · diploblastic', 'Radial'], ['Cnidoblasts: stinging cells', 'stinging'], ['Polyp and medusa forms', 'two']], 'Physalia · Adamsia · Meandrina'],
  ['THE COMB JELLIES', [['Radial · diploblastic', 'comb'], ['8 rows of comb plates', 'eight'], ['Bioluminescence: they glow', 'glow']], 'Pleurobrachia · Ctenoplana'],
  ['THE FLATWORMS', [['Flat from top to bottom', 'Flattened'], ['Acoelomate', 'acoelomate'], ['Flame cells: excretion', 'flame']], 'Taenia (tapeworm) · Fasciola (liver fluke)'],
  ['THE ROUNDWORMS', [['Round in cross-section', 'Round'], ['Pseudocoelomate', 'pseudocoelomate'], ['Separate males and females', 'separate']], 'Ascaris · Wuchereria · Ancylostoma'],
  ['THE SEGMENTED WORMS', [['Metameric segments', 'Metameric'], ['Coelomate · closed circulation', 'closed'], ['Nephridia: excretion', 'nephridia']], 'Nereis · Pheretima · Hirudinaria'],
  ['THE LARGEST PHYLUM', [['Largest phylum', 'largest'], ['Chitin exoskeleton', 'chitin'], ['Jointed appendages', 'jointed']], 'Apis · Anopheles · Limulus (living fossil)'],
  ['SECOND LARGEST PHYLUM', [['Second largest phylum', 'second'], ['Muscular foot, often a shell', 'muscular'], ['Radula: rasping organ', 'radula']], 'Pila · Pinctada · Sepia · Octopus'],
  ['THE SPINY-SKINNED ANIMALS', [['Spiny skin', 'spiny'], ['All marine', 'marine'], ['Water vascular system', 'water']], 'Asterias · Echinus · Ophiura'],
  ['A WORM-LIKE BODY', [['Body in three parts', 'three'], ['Proboscis · collar · trunk', 'proboscis'], ['Stomochord in the collar', 'stomochord']], 'Balanoglossus · Saccoglossus']];
$('#phs').innerHTML = INFO.map(([c, F, ex], i) => `<div class="phI" id="ph${i}"><div class="lbl" style="left:36px;top:30px">PHYLUM ${i + 1} OF 10</div><div class="pn">${PH[i]}</div><div class="pc">${c}</div>
  ${F.map(([f], k) => `<div class="fl2" id="f${i}${k}" style="top:${172 + k * 56}px"><b></b>${f}</div>`).join('')}
  <div class="exb" id="ex${i}"><div class="h">NCERT EXAMPLES</div><div class="x">${ex}</div></div></div>`).join('');
const tFe = INFO.map(([, F], i) => F.map(([, w]) => wt('P' + (i + 1), w))), tEx = PH.map((_, i) => wt('P' + (i + 1), 'Examples'));
const zs = $('#zS'), PG = PH.map(() => mk(zs, 'g', {})), PL = PH.map(() => []), PLt = PH.map(() => []);
const L = (i, args, w) => { PL[i].push(lab(PG[i], ...args)); PLt[i].push(wt('P' + (i + 1), w)); };
const anim = {};
// 1 Porifera
{ const s = AN.draw('sponge', PG[0], 400, 292, 1.6), W = s.P.W;
  anim.flow = [-40, 12, 62].map(y => { const yy = 292 + y * 1.6, xo = 400 - 1.6 * W(y); return mk(PG[0], 'path', { d: `M${xo - 90},${yy} L${xo - 10},${yy}`, stroke: WAT, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '12 10' }); });
  anim.out = mk(PG[0], 'path', { d: 'M400,260 L400,60', stroke: WAT, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '14 10' });
  L(0, [400 + 1.6 * W(-14), 292 - 14 * 1.6, 700, 270, 'Ostia (water in)'], 'ostia'); L(0, [424, 292 - 101 * 1.6, 700, 110, 'Osculum (water out)'], 'osculum');
  L(0, [400 - 1.6 * (W(30) - 28), 292 + 30 * 1.6, 200, 430, 'Collar cells', 'end'], 'collar'); }
// 2 Coelenterata
{ anim.hy = AN.draw('hydra', PG[1], 260, 300, 1.05); anim.je = AN.draw('jelly', PG[1], 640, 214, 1.1);
  anim.pm = [txt(PG[1], 260, 470, 'POLYP', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, 'font-weight': 600, fill: C.ink }), txt(PG[1], 640, 470, 'MEDUSA', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, 'font-weight': 600, fill: C.ink })];
  L(1, [640 + 92 * 1.1, 214 + 74 * 1.1, 820, 380, 'Cnidoblasts'], 'cnidoblasts'); }
// 3 Ctenophora
{ anim.cb = AN.draw('comb', PG[2], 420, 252, 1.7); L(2, [...anim.cb.p('comb'), 700, 150, 'Comb plates (8 rows)'], 'eight'); L(2, [...anim.cb.p('tentacle'), 250, 470, 'Tentacle', 'end'], 'swim'); }
// 4 Platyhelminthes
{ const f = AN.draw('flat', PG[3], 420, 280, 1.9, { rot: 90 }); anim.fl = [[300, 230], [520, 236], [330, 330], [540, 322]].map(([x, y]) => { const g = mk(PG[3], 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 9, fill: '#fff', stroke: '#9A6E40', 'stroke-width': 2.5 }); return { x, y, c: [0, 1, 2].map(() => mk(g, 'line', { stroke: '#C96F2E', 'stroke-width': 2.5, 'stroke-linecap': 'round' })) }; });
  L(3, [...f.p('body'), 720, 130, 'Flat from top to bottom'], 'Flattened'); L(3, [540, 322, 720, 420, 'Flame cells'], 'flame'); }
// 5 Aschelminthes
{ AN.draw('round', PG[4], 380, 268, 2.0); disc(PG[4], 830, 300, [['#DCE6F5', ECTO, 72], [COEL, 'none', 62], ['#F6E5B5', ENDO, 30], ['#fff', ENDO, 20]]);
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + 0.4; mk(PG[4], 'circle', { cx: 830 + 56 * Math.cos(a), cy: 300 + 56 * Math.sin(a), r: 6, fill: '#F1D2CA', stroke: MESO, 'stroke-width': 2 }); }
  anim.as = [txt(PG[4], 830, 210, 'CROSS-SECTION', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 }), txt(PG[4], 830, 404, 'PSEUDOCOELOM', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600, fill: '#3A7FB0' })];
  L(4, [460, 248, 560, 110, 'Round, unsegmented body'], 'Round'); }
// 6 Annelida
{ anim.an = AN.draw('worm', PG[5], 500, 236, 1, { n: 22, L: 820, clit: 1 }); disc(PG[5], 240, 420, [['#DCE6F5', ECTO, 58], [COEL, MESO, 48], ['#F1D2CA', MESO, 24], ['#F6E5B5', ENDO, 19], ['#fff', ENDO, 12]]);
  anim.at = txt(PG[5], 316, 428, 'CUT ACROSS: A TRUE COELOM', { 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600, fill: GRN });
  L(5, [...anim.an.p('seg'), 300, 110, 'Segments (metameres)'], 'Metameric'); }
// 7 Arthropoda
{ const r = AN.draw('roach', PG[6], 420, 296, 1.3);
  L(6, [...r.p('antenna'), 250, 110, 'Antenna', 'end'], 'largest'); L(6, [420 + 30 * 1.3, 296 + 40 * 1.3, 720, 300, 'Chitin exoskeleton'], 'chitin'); L(6, [...r.p('leg2'), 720, 430, 'Jointed appendage'], 'jointed'); }
// 8 Mollusca
{ const s = AN.draw('snail', PG[7], 420, 270, 1.6); L(7, [...s.p('shell'), 200, 110, 'Shell', 'end'], 'shell'); L(7, [...s.p('foot'), 200, 470, 'Muscular foot', 'end'], 'muscular'); L(7, [574, 330, 700, 430, 'Radula (in the mouth)'], 'radula'); }
// 9 Echinodermata
{ const s = AN.draw('star', PG[8], 400, 270, 1.8); anim.wv = [];
  anim.wv.push(mk(PG[8], 'circle', { cx: 400, cy: 270, r: 34, fill: 'none', stroke: WAT, 'stroke-width': 5, 'stroke-dasharray': '10 8' }));
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; anim.wv.push(mk(PG[8], 'line', { x1: 400 + 34 * Math.cos(a), y1: 270 + 34 * Math.sin(a), x2: 400 + 170 * Math.cos(a), y2: 270 + 170 * Math.sin(a), stroke: WAT, 'stroke-width': 5, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' })); }
  L(8, [...s.p('arm'), 720, 140, 'Spiny skin'], 'spiny'); L(8, [400 + 34 * Math.cos(0.6), 270 + 34 * Math.sin(0.6), 720, 420, 'Water vascular system'], 'water'); }
// 10 Hemichordata
{ const b = AN.draw('balano', PG[9], 480, 270, 3); anim.st = mk(PG[9], 'line', { x1: 480 - 74 * 3, y1: 270, x2: 480 - 44 * 3, y2: 270, stroke: NOTO, 'stroke-width': 10, 'stroke-linecap': 'round' });
  L(9, [...b.p('proboscis'), 160, 120, 'Proboscis'], 'proboscis'); L(9, [...b.p('collar'), 360, 100, 'Collar'], 'collar'); L(9, [...b.p('trunk'), 720, 440, 'Trunk'], 'trunk'); L(9, [330, 270, 400, 450, 'Stomochord'], 'stomochord'); }
const avP = PUC.avatar($('#sP'), { x: 160 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Ten jars, ten body plans!' });

/* ---------- K: the key ---------- */
const NY = [99, 165, 257, 349, 463], BY = [80, 124, 168, 216, 260, 308, 352, 400, 444, 488];
const NODE = ['CELLS ONLY, NO TISSUES?', 'TWO GERM LAYERS?', 'BODY CAVITY?', 'SEGMENTED BODY?', 'KEY FEATURE?'];
const tNd = [wt('K2', 'Cells'), wt('K2', 'Two'), wt('K3', 'Three'), wt('K4', 'true'), wt('K5', 'true')];
$('#kns').innerHTML = NODE.map((s, i) => `<div class="kn" id="kn${i}" style="top:${NY[i] - 22}px">${s}</div>`).join('');
const BIN = [0, 1, 1, 2, 2, 3, 3, 4, 4, 4], BT = ['YES', 'STINGING CELLS', 'COMB PLATES', 'NO CAVITY', 'FALSE CAVITY', 'NO JOINTED LEGS', 'JOINTED LEGS', 'WATER VASCULAR', 'MUSCULAR FOOT', 'PROBOSCIS · COLLAR'];
const tBin = [wt('K2', 'Porifera'), wt('K2', 'Coelenterata'), wt('K2', 'Ctenophora'), wt('K3', 'Platyhelminthes'), wt('K3', 'Aschelminthes'), wt('K4', 'Annelida'), wt('K4', 'Arthropoda'), wt('K5', 'Echinodermata'), wt('K5', 'Mollusca'), wt('K5', 'Hemichordata')];
$('#bins').innerHTML = PH.map((n, i) => `<div class="bin" id="bn${i}" style="top:${BY[i]}px">${n}</div>`).join('');
const CHT = [['NO', 132], ['THREE LAYERS', 211], ['TRUE COELOM', 303], ['NOT SEGMENTED', 406]];
$('#kts').innerHTML = BT.map((s, i) => `<div class="kt" id="kt${i}" style="left:916px;top:${BY[i] + 5}px">${s}</div>`).join('') + CHT.map(([s, y], i) => `<div class="kt" id="kc${i}" style="right:${1600 - 466}px;top:${y - 14}px">${s}</div>`).join('');
const kw = $('#kwS'), KE = PH.map((_, i) => mk(kw, 'path', { d: `M770,${NY[BIN[i]]} H900 V${BY[i] + 19} H1150`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' }));
const KC = [0, 1, 2, 3].map(i => mk(kw, 'path', { d: `M480,${NY[i] + 22} V${NY[i + 1] - 22}`, stroke: C.dim, 'stroke-width': 3, fill: 'none' }));
$('#toks').innerHTML = PH.map((_, i) => `<div class="tok" id="tk${i}">${M.icon(PIC[i], 24, C.ac, 2)}</div>`).join('');
const TK = PH.map((_, i) => [80 + (i % 2) * 70, 126 + Math.floor(i / 2) * 72]);

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad">canals · cnidoblasts · comb plates · flame cells · radula · water vascular</span>';

/* ---------- U: two pairs ---------- */
const uJ = AN.draw('jelly', $('#uaS'), 192, 196, 1.12), uC = AN.draw('comb', $('#uaS'), 584, 190, 1.1);
const uF = AN.draw('flat', $('#ubS'), 192, 200, 1.05, { rot: 90 }), uW = AN.draw('worm', $('#ubS'), 584, 200, 1, { n: 13, L: 340, clit: 1 });
const tUn = [wt('U2', 'Coelenterates'), wt('U2', 'ctenophores'), wt('U3', 'Flatworms'), wt('U3', 'annelids')], tUk = [wt('U2', 'cnidoblasts'), wt('U2', 'comb'), wt('U3', 'flat', 2), wt('U3', 'segmented', 1)];
const th1 = PUC.think($('#th1'), { q: 'A leech sucks blood, like many parasitic flatworms. Is it a flatworm, or an annelid?', opts: ['Flatworm', 'Annelid'], right: 1, why: 'Annelid. Hirudinaria is segmented, with a true coelom.' });

/* ---------- W: the cuttlefish ---------- */
const wl = $('#wlS'), sp = AN.draw('sepia', wl, 410, 250, 1.9);
const LW = [lab(wl, ...sp.p('mantle'), 560, 96, 'Soft body'), lab(wl, ...sp.p('foot'), 150, 400, 'Muscular foot (arms)'), lab(wl, ...sp.p('mouth'), 330, 470, 'Radula (in the mouth)')];
const WR = [['TISSUES?', 'Yes: tissues and organs', wt('W2', 'Tissues')], ['LAYERS · CAVITY', 'Three layers, true coelom', wt('W3', 'Three')], ['SEGMENTS?', 'No', wt('W4', 'segments')],
  ['WATER VASCULAR?', 'No', wt('W4', 'water')], ['NOTOCHORD?', 'No: not a chordate', wt('W4', 'notochord')], ['FEATURE', 'Muscular foot + radula', wt('W5', 'foot')]];
$('#wrs').innerHTML = WR.map(([q, a], i) => `<div class="wr" id="wr${i}" style="top:${76 + i * 68}px"><div class="wq">${q}</div><div class="wa2" id="wa${i}">${a}</div></div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Hemichordata is a group of chordates', right: 'Hemichordata is a separate non-chordate phylum' });
const tS = $('#tS'), tb = AN.draw('balano', tS, 236, 110, 1.3); const tRod = mk(tS, 'line', { x1: 236 - 74 * 1.3, y1: 110, x2: 236 - 44 * 1.3, y2: 110, stroke: NOTO, 'stroke-width': 7, 'stroke-linecap': 'round' });
const TC = [['STOMOCHORD: NOT A NOTOCHORD', '#FBE9E9', '#8A1C1C'], ['A NON-CHORDATE PHYLUM', '#E3F1E7', '#1F6B3F']].map(([s, b, f], i) => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x: 46, y: 170 + i * 48, width: 380, height: 38, rx: 9, fill: b }); txt(g, 236, 195 + i * 48, s, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.1, 'font-weight': 600, fill: f }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Match the following: a phylum with its feature or its example' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Match each phylum with its feature.<div class="mt"><div><div class="h">COLUMN I · PHYLUM</div><div><b>a</b>Ctenophora</div><div><b>b</b>Platyhelminthes</div><div><b>c</b>Mollusca</div><div><b>d</b>Echinodermata</div></div><div><div class="h">COLUMN II · FEATURE</div><div><b>i</b>Radula</div><div><b>ii</b>Comb plates</div><div><b>iii</b>Water vascular system</div><div><b>iv</b>Flame cells</div></div></div>',
  opts: ['a-ii, b-i, c-iv, d-iii', 'a-iii, b-iv, c-i, d-ii', 'a-ii, b-iv, c-i, d-iii', 'a-iv, b-ii, c-iii, d-i'], right: 2, optW: 474, optY: 404, optFs: 28 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['a-ii · comb plates'], ['b-iv · flame cells'], ['c-i · radula'], ['d-iii · water vascular']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Comb'), wt('A2', 'flame'), wt('A3', 'radula'), wt('A3', 'water')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · ten non-chordate phyla', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Porifera</b>: canals, collar cells · <b>Coelenterata</b>: cnidoblasts · <b>Ctenophora</b>: comb plates', '<b>Platyhelminthes</b>: flat, flame cells · <b>Aschelminthes</b>: round, pseudocoelom',
    '<b>Annelida</b>: metameric, nephridia · <b>Arthropoda</b>: jointed legs, chitin', '<b>Mollusca</b>: muscular foot, radula · <b>Echinodermata</b>: water vascular system',
    '<b>Hemichordata</b>: proboscis, collar, trunk; a stomochord in the collar'] });
const YQ = ['Which phylum has a water canal system?', 'Name two examples of Aschelminthes.', 'Why is the leech an annelid and not a flatworm?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 36', topic: 'A rod along the back: Chordate Characteristics', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() { geo = 1; [0, 1, 2, 3].forEach(i => { const n = $('#un' + i), k = $('#uk' + i); k.style.left = (n.offsetLeft + n.offsetWidth / 2 - k.offsetWidth / 2) + 'px'; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tS1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('S1');
    M.vis($('#hj'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    JAR.forEach((j, i) => { M.vis(j.g, t, tMorph + 0.35 + i * 0.08, 1e9, { dy: 16 }); const tr = tJr[i]; j.ring.style.opacity = tr !== undefined ? M.clamp((t - Math.max(tr, tMorph + 0.4)) / 0.3) : 0; j.ring.style.strokeDashoffset = ((t * 20) % 18).toFixed(1); });
    M.vis($('#hjP'), t, wt('H2', 'phylum', 1) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.1;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'key') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#spc'), t, tH4 + 0.15, 1e9, { dy: 0, fade: 0.25 })) {
      PH.forEach((_, i) => M.vis($('#pl' + i), t, wt('H4', 'Ten') + 0.1 + i * 0.12, 1e9, { dx: -14, dy: 0 }));
      M.vis($('#p10P'), t, wt('H5', 'key') - 0.1, 1e9, POP);
    }
  }

  /* P: the tour */
  const pOn = t >= tS1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#pch'), t, tS1 + 0.1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tS1 + 0.15, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tS1 + 0.3, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tP.forEach((tt, i) => { if (t >= tt - 0.15) cur = i; });
    PH.forEach((_, i) => { M.vis($('#pc' + i), t, tS1 + 0.3 + i * 0.05, 1e9, POP); lite($('#pc' + i), i < cur, i === cur); });
    M.vis($('#zgh'), t, tS1 + 0.6, 1e9, { dy: 8 });
    PG.forEach((g, k) => { const e = M.io((t - tP[k] + 0.15) / 0.6), x = k < 9 ? M.io((t - tP[k + 1] + 0.15) / 0.5) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      attr(g, 'transform', `translate(${(220 * (1 - e) - 220 * x).toFixed(1)} 0)`); g.style.opacity = Math.min(e, 1 - x).toFixed(3);
      PL[k].forEach((l, i) => labT(l, t, PLt[k][i])); });
    INFO.forEach(([, F], i) => { M.vis($('#ph' + i), t, tP[i] + 0.1, i < 9 ? tP[i + 1] - 0.1 : 1e9, { dy: 16, outDur: 0.2, ody: -10 });
      F.forEach((_, k) => M.vis($('#f' + i + k), t, tFe[i][k] - 0.1, 1e9, { dx: -12, dy: 0 })); M.vis($('#ex' + i), t, tEx[i] - 0.1, 1e9, { dy: 10 }); });
    // loops
    anim.flow.forEach(f => { f.style.opacity = M.clamp((t - wt('P1', 'flows')) / 0.3); f.style.strokeDashoffset = (-(t * 40) % 22).toFixed(1); });
    anim.out.style.opacity = M.clamp((t - wt('P1', 'osculum')) / 0.3); anim.out.style.strokeDashoffset = ((t * 40) % 24).toFixed(1);
    anim.hy.wig(t); anim.je.wig(t); anim.pm[0].style.opacity = M.clamp((t - wt('P2', 'polyp')) / 0.3); anim.pm[1].style.opacity = M.clamp((t - wt('P2', 'medusa')) / 0.3);
    anim.cb.wig(t); const gl = M.clamp((t - wt('P3', 'glow')) / 0.4); anim.cb.combs.forEach((row, r) => row.forEach((c, k) => { const ph = 0.5 + 0.5 * Math.sin(t * 5 - k * 0.7 - r); c.setAttribute('fill', mix('#4FA3B5', ['#F2C94C', '#7BD3C4', '#E58AC0'][r % 3], gl * ph)); }));
    anim.fl.forEach((f, k) => f.c.forEach((l, j) => { const a = -Math.PI / 2 + (j - 1) * 0.35 + 0.25 * Math.sin(t * 12 + k + j); attr(l, 'x1', f.x); attr(l, 'y1', f.y - 9); attr(l, 'x2', (f.x + 16 * Math.cos(a)).toFixed(1)); attr(l, 'y2', (f.y - 9 + 16 * Math.sin(a)).toFixed(1)); }));
    anim.as[0].style.opacity = M.clamp((t - wt('P5', 'cross')) / 0.3); anim.as[1].style.opacity = M.clamp((t - wt('P5', 'pseudocoelomate')) / 0.3);
    anim.an.segs.forEach((s, k) => attr(s, 'transform', `translate(0 ${(-3 * Math.max(0, Math.sin(t * 3 - k * 0.5))).toFixed(2)})`)); anim.at.style.opacity = M.clamp((t - wt('P6', 'coelomate')) / 0.3);
    anim.wv.forEach(w => { w.style.opacity = M.clamp((t - wt('P9', 'water')) / 0.3); w.style.strokeDashoffset = (-(t * 30) % 18).toFixed(1); });
    M.draw(anim.st, t, wt('P10', 'stomochord') - 0.2, 0.5);
    avP(t, T1('P10') - 0.6, 1e9);
  }

  /* K: the key */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kw'), t, tK1 + 0.05, 1e9, { dy: 36 });
    NODE.forEach((_, i) => { const el = $('#kn' + i); M.vis(el, t, tNd[i] - 0.15, 1e9, POP); const on = M.io((t - tNd[i]) / 0.3); el.style.borderColor = mix(C.line, C.ac, on); el.style.color = mix(C.mute, C.ink, on); });
    KC.forEach((e, i) => M.draw(e, t, tNd[i + 1] - 0.4, 0.3)); CHT.forEach((_, i) => M.vis($('#kc' + i), t, tNd[i + 1] - 0.2, 1e9, POP));
    PH.forEach((_, i) => { const tb = tBin[i], b = $('#bn' + i);
      M.vis(b, t, tK1 + 0.3 + i * 0.05, 1e9, { dx: 12, dy: 0 }); const land = M.io((t - tb) / 0.3); b.style.background = mix(C.soft, C.ac2, land); b.style.color = mix(C.dim, '#1F6B3F', Math.max(0.35, land));
      M.draw(KE[i], t, tb - 0.9, 0.5); M.vis($('#kt' + i), t, tb - 0.5, 1e9, POP);
      const tk = $('#tk' + i); M.vis(tk, t, tK1 + 0.4 + i * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
      const u = M.clamp((t - (tb - 1.0)) / 1.0), a1 = M.io(Math.min(1, u / 0.45)), a2 = M.io(Math.max(0, (u - 0.45) / 0.55));
      const ny = NY[BIN[i]], bx = 1154, by = BY[i] - 6; let x = M.lerp(TK[i][0], 420, a1), y = M.lerp(TK[i][1], ny - 26, a1); x = M.lerp(x, bx, a2); y = M.lerp(y, by, a2);
      tk.style.left = x.toFixed(1) + 'px'; tk.style.top = y.toFixed(1) + 'px'; tk.style.zIndex = u > 0 && u < 1 ? 5 : 1; });
  }

  /* statement */
  const stOn = t >= tT && t < tU1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tU1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'away') - 0.1, 0.9);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U4');
    M.vis($('#ua'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ub'), t, T0('U3') - 0.15, out, { dx: 60, dy: 0, ...o });
    [uJ, uC, uF, uW].forEach((a, i) => { M.vis(a.g, t, tUn[i] - 0.1, 1e9, { ...POP, sc: 0.6 }); M.vis($('#un' + i), t, tUn[i], 1e9, { dy: 10 }); M.vis($('#uk' + i), t, tUk[i] - 0.1, 1e9, POP); });
    uJ.wig(t); uC.wig(t); uW.segs.forEach((s, k) => attr(s, 'transform', `translate(0 ${(-3 * Math.max(0, Math.sin(t * 3 - k * 0.6))).toFixed(2)})`));
    M.vis($('#th1'), t, tU4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tU4, tOpts: wt('U4', 'flatworm', 1) - 0.1, tCount: T1('U4') + 0.05, dur: 3, tAns: T0('U5') - 0.02, tWhy: wt('U5', 'Hirudinaria') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wr'), t, tW1 + 0.25, out, { dx: 60, dy: 0, ...o });
    sp.wig(t); M.vis(sp.g, t, wt('W1', 'cuttlefish') - 0.2, 1e9, { ...POP, sc: 0.6 });
    LW.forEach((l, i) => labT(l, t, [wt('W5', 'soft'), wt('W5', 'foot'), wt('W5', 'radula')][i]));
    WR.forEach(([, a, tt], i) => { M.vis($('#wr' + i), t, tW1 + 0.5 + i * 0.06, 1e9, { dy: 10 }); const e = $('#wa' + i); M.vis(e, t, tt - 0.1, 1e9, POP); const yes = i === 5;
      e.style.background = mix('#FFFFFF', yes ? C.ac2 : '#FFFFFF', M.io((t - tt) / 0.3)); e.style.color = yes ? '#1F6B3F' : C.ink2; });
    M.vis($('#wrP'), t, wt('W5', 'mollusc') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Hemichordata') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'separate') - 0.3 });
    M.vis(tb.g, t, wt('X2', 'stomochord') - 0.2, 1e9, { ...POP, sc: 0.6 }); M.draw(tRod, t, wt('X2', 'stomochord'), 0.4);
    M.vis(TC[0], t, wt('X3', 'looks') - 0.1, 1e9, { dx: -12, dy: 0 }); M.vis(TC[1], t, wt('X3', 'separate') - 0.1, 1e9, { dx: -12, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Match') + 0.4, tCount, tAns });
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
