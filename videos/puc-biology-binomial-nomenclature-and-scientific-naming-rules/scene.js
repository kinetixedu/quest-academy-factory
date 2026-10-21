// PUC Biology Ep 08: Binomial Nomenclature and Scientific Naming Rules (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// name colours (this episode): generic name green, specific epithet gold, author grey
const BR = '#2E2A24', GN = C.ac, EP = '#C9962B', AU = '#6B7280';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const pulse = (t, t0, d = 1.0) => M.io((t - t0) / 0.2) * (1 - M.io((t - t0 - d) / 0.3));

Object.assign(M.IC, {
  fish: ['M2 12c3-5 9-7 14-4l5-3.5v15L16 16c-5 3-11 1-14-4Z', ci(7, 11, 0.9)],
  paw: [ci(6, 9, 2), ci(10, 5, 2), ci(15, 5, 2), ci(19, 9, 2), 'M12.5 11c-3 0-6 4-6 6.5 0 2 2 3 3.5 2.5 1.2-.4 1.8-.8 2.5-.8s1.3.4 2.5.8c1.5.5 3.5-.5 3.5-2.5 0-2.5-3-6.5-6-6.5Z'],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', ci(12, 12, 3)],
  search: [ci(11, 11, 7), 'm21 21-4.3-4.3'],
});
// Indian mackerel (Rastrelliger kanagurta), side view, vintage cartoon look
function fish(p, x, y, s) {
  const g = mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})` });
  mk(g, 'path', { d: 'M-150,-50 L-128,-92 L-96,-52 Z', fill: '#5F8496', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M-40,-58 L-20,-84 L0,-58 Z M20,-56 L36,-76 L52,-54 Z', fill: '#5F8496', stroke: BR, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M-232,0 C-172,-70 28,-80 168,-20 L248,-70 L230,0 L248,70 L168,20 C28,80 -172,70 -232,0 Z', fill: '#8FB3C4', stroke: BR, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: 'M-212,12 C-132,48 28,46 164,16 C28,62 -152,60 -212,12 Z', fill: '#E4ECEF' });
  for (let k = 0; k < 9; k++) mk(g, 'path', { d: `M${-140 + k * 34},${-46 + Math.abs(k - 4) * 2} q8,-9 16,0 t16,0`, stroke: '#3F5E6E', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-160,-30 Q-140,0 -160,32', stroke: BR, 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M-120,10 L-80,26 L-118,30 Z', fill: '#B9CDD6', stroke: BR, 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: -196, cy: -8, r: 11, fill: '#fff', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: -194, cy: -8, r: 5, fill: BR });
  return g;
}

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tD1 = T0('D1'), tZ1 = T0('Z1'), tG1 = T0('G1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['Bangude', 'KANNADA', 'Bangude'], ['Ayla', 'MALAYALAM', 'Ayla'], ['Bangda', 'MARATHI', 'Bangda']];
$('#jobs').innerHTML = JOBS.map(([n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon('fish', 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[2]));

/* ---------- H ---------- */
const fishH = mk($('#fishS'), 'g', {}); fish(fishH, 392, 222, 1.12);
$('#nmTs').innerHTML = JOBS.map(([n, w], i) => `<div class="nmT" id="nt${i}" style="top:376px;left:${[36, 290, 516][i]}px">${n}<em>${w}</em></div>`).join('');
const ntL = [0, 1, 2].map(i => mk($('#fishS'), 'path', { d: '', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6', fill: 'none' }));
$('#ctys').innerHTML = ['INDIA', 'JAPAN', 'BRAZIL', 'KENYA'].map((c, i) => `<div class="cty" id="cy${i}" style="left:${28 + i * 136}px">${c}</div>`).join('');

/* ---------- P ---------- */
const LN = [['KANNADA', 'Bangude'], ['MALAYALAM', 'Ayla'], ['MARATHI', 'Bangda'], ['TAMIL', 'Kaanankeluthi'], ['KONKANI', 'Bangdo']];
$('#ln2s').innerHTML = LN.map(([k, v], i) => `<div class="ln2" id="l2${i}" style="top:${84 + i * 80}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
$('#scts').innerHTML = [['In Japan'], ['In Kerala']].map(([n], i) => `<div class="sct" id="sc${i}" style="left:${36 + i * 412}px"><i>${M.icon('user', 40, C.ink, 2.2)}</i><div class="sn">${n}</div><div class="sb" id="sb${i}">USES A LOCAL NAME</div></div>`).join('');
const prS = $('#prS'), lnk = mk(prS, 'line', { x1: 336, y1: 245, x2: 448, y2: 245, stroke: C.dim, 'stroke-width': 4, 'stroke-dasharray': '8 8' });
const qm = mk(prS, 'g', { class: 'pp' }); mk(qm, 'circle', { cx: 392, cy: 245, r: 24, fill: '#fff', stroke: C.red, 'stroke-width': 3 }); const qmt = txt(qm, 392, 254, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.red });

/* ---------- D ---------- */
const FL3 = [['Look', 'Observe its features closely', T0('D1') + 0.4], ['Identify', 'Find exactly which organism it is', wt('D1', 'identification')], ['Name', 'Give it one scientific name', wt('D2', 'name')]];
$('#fl3s').innerHTML = FL3.map(([a, b], i) => `<div class="fl3" id="f3${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="a">${a}</div><div class="b">${b}</div></div>`).join('') +
  `<div class="pillp ac" id="f3P" style="left:36px;top:450px">Identification comes before naming</div>`;

/* ---------- Z: anatomy of a name ---------- */
const ZN = ['GENERIC NAME', 'SPECIFIC EPITHET', 'AUTHOR', 'ITALICS'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const zs = $('#zS'), BY = 268;
const zBox = [GN, EP].map(c => mk(zs, 'rect', { y: BY - 92, height: 118, rx: 14, fill: mix('#FFFFFF', c, 0.12) }));
const gIt = mk(zs, 'g', {});
const tGn = mk(gIt, 'text', { y: BY, 'font-family': 'Poppins', 'font-size': 112, 'font-weight': 600, fill: GN }); tGn.textContent = 'Mangifera';
const tEp = mk(gIt, 'text', { y: BY, 'font-family': 'Poppins', 'font-size': 112, 'font-weight': 600, fill: EP }); tEp.textContent = 'indica';
const tAu = mk(zs, 'text', { y: BY, 'font-family': 'Poppins', 'font-size': 84, 'font-weight': 500, fill: AU }); tAu.textContent = 'Linn.';
const zBar = [GN, EP, AU].map(c => mk(zs, 'line', { y1: BY + 34, y2: BY + 34, stroke: c, 'stroke-width': 6, 'stroke-linecap': 'round' }));
let LBZ = null; const zLbG = mk(zs, 'g', {});
const tLZ = [wt('Z3', 'Mangifera'), wt('Z3', 'genus'), wt('Z4', 'indica'), wt('Z4', 'species', 0), wt('Z5', 'author'), wt('Z6', 'italics')];
const tZc = [T0('Z3'), T0('Z4'), T0('Z5'), T0('Z6')];
const avZ = PUC.avatar($('#sZ'), { x: 160 + 36, y: 324 + 526 - 108, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Linn. = Linnaeus. Neat!' });

/* ---------- G: four gates ---------- */
const GT = [['LATIN', 'Latin, or made to look Latin?'], ['TWO PARTS', 'Genus first, then the specific epithet?'], ['CAPITAL · SMALL', 'Genus with a capital, epithet with a small letter?'], ['ITALICS', 'Printed in italics? By hand: each word underlined.']];
const GX = i => 36 + i * 384;
$('#gts').innerHTML = GT.map(([h, q], i) => `<div class="gt" id="gt${i}" style="left:${GX(i)}px"><svg id="gv${i}" width="362" height="262"></svg><div class="n" id="gn${i}">${i + 1}</div><div class="gh" id="gh${i}">${h}</div><div class="gq">${q}</div></div>`).join('');
const tGt = ['G2', 'G3', 'G4', 'G5'].map(id => T0(id) + 0.1);
// looping demo inside each gate (runs while the gate is lit)
const GD = [0, 1, 2, 3].map(i => { const s = $('#gv' + i), d = {};
  if (i === 0) { d.t = txt(s, 24, 232, 'kanagurta', { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 600, 'font-style': 'italic', fill: C.ink }); d.c = txt(s, 200, 230, 'LATINISED', { 'font-size': 16, 'letter-spacing': 1.5, fill: GN, 'font-weight': 600 }); d.sc = mk(s, 'rect', { x: 20, y: 196, width: 6, height: 46, rx: 3, fill: GN }); }
  if (i === 1) { d.a = mk(s, 'rect', { x: 22, y: 198, width: 150, height: 44, rx: 9, fill: mix('#FFFFFF', GN, 0.2) }); d.b = mk(s, 'rect', { x: 186, y: 198, width: 150, height: 44, rx: 9, fill: mix('#FFFFFF', EP, 0.25) });
    txt(s, 97, 226, 'GENUS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: '#1F6B3F', 'font-weight': 600 }); txt(s, 261, 226, 'EPITHET', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: '#7A5A1E', 'font-weight': 600 }); }
  if (i === 2) { d.A = txt(s, 60, 244, 'M', { 'font-family': 'Poppins', 'font-size': 52, 'font-weight': 700, fill: GN }); d.a = txt(s, 210, 244, 'i', { 'font-family': 'Poppins', 'font-size': 52, 'font-weight': 700, fill: EP });
    txt(s, 108, 236, 'CAPITAL', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 }); txt(s, 234, 236, 'SMALL', { 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600 }); }
  if (i === 3) { d.t = txt(s, 24, 232, 'Homo', { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 600, fill: C.ink }); d.t2 = txt(s, 124, 232, 'sapiens', { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 600, fill: C.ink });
    d.u1 = mk(s, 'line', { x1: 24, y1: 242, x2: 106, y2: 242, stroke: C.ink, 'stroke-width': 3 }); d.u2 = mk(s, 'line', { x1: 124, y1: 242, x2: 236, y2: 242, stroke: C.ink, 'stroke-width': 3 }); }
  return d; });
const TOK = [['Solanum tuberosum', 380, 'tk0'], ['mangifera Indica', 470, 'tk1']];
$('#toks').innerHTML = TOK.map(([n, y, id], i) => `<div class="tok" id="${id}" style="top:${y}px;left:36px"><span>${i ? '<span id="bad0" class="hl" style="padding:0 2px">m</span>angifera <span id="bad1" class="hl" style="padding:0 2px">I</span>ndica' : n}</span></div>`).join('') +
  [0, 1].map(r => [0, 1, 2, 3].map(g => `<div class="gk" id="gk${r}${g}" style="left:${GX(g) + 258 + r * 50}px;top:104px;background:${r && g === 2 ? 'var(--red)' : 'var(--ok)'}">${M.icon(r && g === 2 ? 'x' : 'check', 22, '#fff', 3)}</div>`).join('')).join('');
const tTok1 = wt('G6', 'Solanum'), tPass = wt('G6', 'passes'), tTok2 = wt('G6', 'mangifera'), tStop = wt('G6', 'stops');

/* ---------- R: codes ---------- */
$('#cf0').innerHTML = M.icon('leaf', 24, C.ac, 2.2) + 'Plants'; $('#cf1').innerHTML = M.icon('paw', 24, C.ac, 2.2) + 'Animals';

/* ---------- C: compare ---------- */
fish($('#ccS'), 392, 190, 0.92); fish($('#csS'), 392, 190, 0.92);
$('#ccs').innerHTML = ['Bangude', 'Ayla', 'Bangda'].map((n, i) => `<div class="chp" id="cc${i}" style="top:300px;left:${[36, 248, 400][i]}px">${n}</div>`).join('') + `<div class="pillp" id="ccQ" style="left:36px;top:390px;font-size:22px">+ more in other languages</div>`;
const th1 = PUC.think($('#th1'), { q: 'A notebook says "Panthera Leo" for the lion. Is it written correctly?', opts: ['Yes', 'No'], right: 1, why: 'No. The epithet starts with a small letter: <i>Panthera leo</i>, in italics.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:500 52px Poppins;color:var(--mute)">Genus first · epithet second · both in <i>italics</i></span>';

/* ---------- W: fix three names ---------- */
const FX = [['solanum tuberosum', '<span class="hl" id="h0">S</span>olanum tuberosum', 'GENUS: CAPITAL LETTER', true], ['Homo Sapiens', 'Homo <span class="hl" id="h1">s</span>apiens', 'EPITHET: SMALL LETTER', true],
  ['<span id="hb0">Musca</span> <span id="hb1">domestica</span>', '<span id="ha0">Musca</span> <span id="ha1">domestica</span>', 'BY HAND: UNDERLINE EACH WORD', false]];
$('#fxs').innerHTML = FX.map(([b, a, w, it], i) => `<div class="fx" id="fx${i}" style="top:${84 + i * 140}px"><div class="n">${i + 1}</div><div class="bf" id="bf${i}" style="font-style:${it ? 'italic' : 'normal'}">${b}</div><div class="sk" id="sk${i}"></div>
  <div class="ar2" id="ar${i}">${M.icon('arrowR', 44, C.dim, 2.6)}</div><div class="af" id="af${i}" style="font-style:${it ? 'italic' : 'normal'}">${a}</div><div class="why" id="wy${i}">${w}</div></div>`).join('') +
  `<div class="ul" id="ulB"></div><div class="ul" id="ulA0" style="background:var(--ok)"></div><div class="ul" id="ulA1" style="background:var(--ok)"></div>`;
const tFx = [wt('W2', 'solanum'), wt('W3', 'Homo'), wt('W4', 'Musca')], tFix = [wt('W2', 'capital'), wt('W3', 'small'), wt('W4', 'Each')];
const avW = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Two lines, not one!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The species name of the mango is indica', right: 'The species name is Mangifera indica. indica is the epithet.' });
const tS = $('#tS');
const xG = mk(tS, 'text', { x: 30, y: 152, 'font-family': 'Poppins', 'font-size': 46, 'font-weight': 600, 'font-style': 'italic', fill: GN }); xG.textContent = 'Mangifera';
const xE = mk(tS, 'text', { y: 152, 'font-family': 'Poppins', 'font-size': 46, 'font-weight': 600, 'font-style': 'italic', fill: EP }); xE.textContent = 'indica';
const xBr1 = mk(tS, 'path', { stroke: C.ok, 'stroke-width': 3.5, fill: 'none' }), xBr2 = mk(tS, 'path', { stroke: EP, 'stroke-width': 3.5, fill: 'none' });
const xL1 = txt(tS, 0, 222, 'SPECIES NAME = BOTH WORDS', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: C.ok, 'font-weight': 600 });
const xL2 = txt(tS, 0, 76, 'SPECIFIC EPITHET', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, fill: '#9A7420', 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'Pick the correctly written name; rule based statements' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 860,
  q: 'Which statements are correct?<div class="sl"><b>I</b>Biological names are Latin or Latinised.</div><div class="sl"><b>II</b>The specific epithet starts with a capital letter.</div><div class="sl"><b>III</b>Handwritten, the two words are underlined separately.</div><div class="sl"><b>IV</b>The author\'s name comes before the generic name.</div>',
  opts: ['I and II only', 'I and III only', 'II and IV only', 'I, III and IV only'], right: 1, optW: 474, optY: 400 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">B</b> (I, III)'], ['<b style="color:var(--red)">II</b>: epithet is small'], ['<b style="color:var(--red)">IV</b>: author at the end'], ['<i>Mangifera indica</i> Linn.']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A3', 'Four'), wt('A3', 'end')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · binomial nomenclature', y0: 100, dy: 68, txt: [1, 1, 1, 1, 1],
  lines: [`<b>Two words</b> (Linnaeus): <b style="color:${GN}">generic name</b> + <b style="color:#9A7420">specific epithet</b>`, `<b style="color:${GN}">Genus</b>: capital letter &nbsp;·&nbsp; <b style="color:#9A7420">epithet</b>: small letter`,
    '<b>Printed</b>: italics &nbsp;·&nbsp; <b>by hand</b>: each word underlined separately', '<b>Latin</b> or Latinised &nbsp;·&nbsp; author last, short: <i>Mangifera indica</i> Linn.', '<b>ICBN</b>: plants &nbsp;·&nbsp; <b>ICZN</b>: animals &nbsp;·&nbsp; identification comes first'] });
const YQ = ['What are the two parts of a scientific name?', 'How do you show a scientific name when you write by hand?', 'What does Linn. mean in Mangifera indica Linn.?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 09', topic: 'A pressed leaf in an old book: Taxonomic Aids', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('Z5') - 0.1, 1.05, 1000, 580], [T0('Z6') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  // H name tag leaders to the fish belly
  [0, 1, 2].forEach(i => { const e = $('#nt' + i), x = e.offsetLeft + e.offsetWidth / 2; attr(ntL[i], 'd', `M${x},376 L${[250, 392, 530][i]},${[262, 276, 254][i]}`); });
  // D word blocks
  let x = 36; ['wb0', 'wop', 'wb1'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 24; });
  [['wm0', 'wb0'], ['wm1', 'wb1']].forEach(([m, b]) => { const e = $('#' + m), bb = $('#' + b); e.style.left = (bb.offsetLeft + bb.offsetWidth / 2 - e.offsetWidth / 2) + 'px'; });
  // Z name layout + labels
  const wG = tGn.getComputedTextLength(), wE = tEp.getComputedTextLength(), wA = tAu.getComputedTextLength(), gap = 46, tot = wG + wE + wA + 2 * gap, x0 = (1600 - tot) / 2;
  const xE0 = x0 + wG + gap, xA0 = xE0 + wE + gap;
  attr(tGn, 'x', x0); attr(tEp, 'x', xE0); attr(tAu, 'x', xA0);
  [[x0, wG], [xE0, wE]].forEach(([a, w], i) => { attr(zBox[i], 'x', a - 18); attr(zBox[i], 'width', w + 36); });
  [[x0, wG], [xE0, wE], [xA0, wA]].forEach(([a, w], i) => { attr(zBar[i], 'x1', a); attr(zBar[i], 'x2', a + w); });
  const top = BY - 96, bot = BY + 40;
  LBZ = [[x0 + wG * 0.45, top, x0 + wG * 0.45 - 30, 100, 'Generic name: the genus', 'start'], [x0 + 32, bot, x0 + 10, 400, 'Capital letter', 'start'],
    [xE0 + wE * 0.5, top, xE0 + wE * 0.5 - 20, 100, 'Specific epithet', 'start'], [xE0 + 14, bot, xE0 - 6, 400, 'Small letter', 'start'],
    [xA0 + wA * 0.5, BY - 70, xA0 + wA * 0.5 - 20, 100, 'Author, short', 'start'], [xE0 + wE - 20, bot - 10, xA0 + 10, 400, 'Italics: sloping letters', 'start']].map(([px, py, lx, ly, s, an]) => {
    const ln = mk(zLbG, 'path', { d: `M${px},${py} L${lx},${ly + (ly < py ? 14 : -26)}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(zLbG, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
    const tx = mk(zLbG, 'text', { x: lx, y: ly + (ly < py ? 0 : 0), 'text-anchor': an, class: 'zl' }); tx.textContent = s; return { ln, dot, tx }; });
  // W underlines (row 3) and strike widths
  const fx = $('#fxs'), r3 = $('#fx2'), b0 = $('#hb0'), b1 = $('#hb1'), a0 = $('#ha0'), a1 = $('#ha1'), bf = $('#bf2'), af = $('#af2');
  const ub = $('#ulB'); ub.style.left = (36 + bf.offsetLeft + b0.offsetLeft) + 'px'; ub.style.width = (b1.offsetLeft + b1.offsetWidth - b0.offsetLeft) + 'px'; ub.style.top = (r3.offsetTop + bf.offsetTop + bf.offsetHeight - 2) + 'px';
  [a0, a1].forEach((a, i) => { const u = $('#ulA' + i); u.style.left = (36 + af.offsetLeft + a.offsetLeft) + 'px'; u.style.width = a.offsetWidth + 'px'; u.style.top = (r3.offsetTop + af.offsetTop + af.offsetHeight - 2) + 'px'; });
  [0, 1, 2].forEach(i => { $('#sk' + i)._w = $('#bf' + i).offsetWidth + 12; });
  // compare chips
  x = 36; [0, 1, 2].forEach(i => { const e = $('#cc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  // trap brackets
  const gw = xG.getComputedTextLength(); attr(xE, 'x', 30 + gw + 18); const ew = xE.getComputedTextLength(), ex = 30 + gw + 18;
  attr(xBr1, 'd', `M30,172 v14 H${ex + ew} v-14`); attr(xL1, 'x', 30 + (gw + 18 + ew) / 2);
  attr(xBr2, 'd', `M${ex},104 v-12 H${ex + ew} v12`); attr(xL2, 'x', ex + ew / 2);
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hf'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis(fishH, t, tMorph + 0.5, 1e9, { dy: 0, sc: 0.9, fade: 0.3 });
    [0, 1, 2].forEach(i => { M.vis($('#nt' + i), t, tMorph + 0.8 + i * 0.15, 1e9, POP); M.draw(ntL[i], t, wt('H2', 'same') + i * 0.12, 0.4); });
    M.vis($('#hq'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#dQ'), t, wt('H3', 'asked') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#sci'), t, wt('H4', 'Rastrelliger') - 0.1, 1e9, POP);
    M.vis($('#wcard'), t, wt('H4', 'scientist') - 0.1, 1e9, { dy: 20 });
    [0, 1, 2, 3].forEach(i => M.vis($('#cy' + i), t, wt('H4', 'country') + i * 0.12, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LN.forEach((_, i) => { const el = $('#l2' + i), ti = wt('P2', 'common') + i * 0.35; M.vis(el, t, ti, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.redBg || '#FBE6E6', pulse(t, ti, 0.5)); });
    M.vis($('#plP'), t, wt('P2', 'changes') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, T0('P3') - 0.15, out, { dx: 60, dy: 0, ...o });
    [0, 1].forEach(i => M.vis($('#sc' + i), t, wt('P3', i ? 'Kerala' : 'Japan') - 0.1, 1e9, { dy: 16 }));
    const tOne = wt('P4', 'one'); M.draw(lnk, t, wt('P3', 'same') - 0.1, 0.4);
    lnk.setAttribute('stroke', mix(C.dim, C.ok, M.io((t - tOne) / 0.3))); lnk.setAttribute('stroke-dasharray', t > tOne ? 'none' : '8 8');
    M.vis(qm, t, wt('P3', 'never') - 0.1, 1e9, { ...POP, sc: 0.3 }); qm.firstChild.setAttribute('stroke', t > tOne ? C.ok : C.red); qmt.setAttribute('fill', t > tOne ? C.ok : C.red); M.setT(qmt, t > tOne ? '=' : '?');
    [0, 1].forEach(i => { M.setT($('#sb' + i), t > tOne ? 'RASTRELLIGER KANAGURTA' : 'USES A LOCAL NAME'); $('#sb' + i).style.color = t > tOne ? '#1F6B3F' : ''; });
    M.vis($('#prP'), t, tOne - 0.1, 1e9, POP); M.vis($('#prN'), t, wt('P4', 'nomenclature') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    FL3.forEach((f, i) => { const el = $('#f3' + i); M.vis(el, t, f[2] - 0.1, 1e9, { dy: 16 }); el.style.background = mix(C.soft, C.ac2, pulse(t, f[2], 1.4)); });
    M.vis($('#f3P'), t, T1('D1') - 0.3, 1e9, POP);
    M.vis($('#dr'), t, wt('D2', 'system') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lnn'), t, wt('D2', 'Carolus') - 0.1, 1e9, { dy: 16 });
    M.vis($('#wb0'), t, wt('D3', 'Bi') - 0.1, 1e9, POP); M.vis($('#wm0'), t, wt('D3', 'two') - 0.1, 1e9, POP);
    M.vis($('#wop'), t, wt('D3', 'nomial') - 0.25, 1e9, POP); M.vis($('#wb1'), t, wt('D3', 'nomial') - 0.1, 1e9, POP); M.vis($('#wm1'), t, wt('D3', 'names') - 0.1, 1e9, POP);
  }

  /* Z: anatomy of a name */
  const zOn = t >= tZ1 - 0.1 && t < tG1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('G1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o }); M.vis($('#zd'), t, tZ1 + 0.05, out, { dy: 36, ...o });
    let cur = -1; tZc.forEach((tt, k) => { if (t >= tt) cur = k; });
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    const tName = wt('Z2', 'Mangifera');
    M.vis(tGn, t, tName - 0.1, 1e9, { dy: 20 }); M.vis(tEp, t, wt('Z2', 'indica') - 0.1, 1e9, { dy: 20 }); M.vis(tAu, t, wt('Z5', 'Linn') - 0.1, 1e9, POP);
    zBox.forEach((b, i) => { b.style.opacity = M.clamp((t - tZc[i]) / 0.3).toFixed(3); });
    zBar.forEach((b, i) => M.draw(b, t, tZc[i] + 0.3, 0.5));
    if (LBZ) LBZ.forEach((l, i) => { const t0 = tLZ[i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
    const sk = -12 * M.io((t - tLZ[5]) / 0.6); attr(gIt, 'transform', Math.abs(sk) < 0.01 ? '' : `translate(0 ${BY}) skewX(${sk.toFixed(2)}) translate(0 ${-BY})`);
    avZ(t, wt('Z5', 'Linnaeus') + 0.3, out);
  }

  /* G: gates */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gw'), t, tG1 + 0.05, out, { dy: 36, ...o });
    let cur = -1; tGt.forEach((tt, k) => { if (t >= tt) cur = k; }); if (t >= T0('G6')) cur = 4;
    GT.forEach((_, i) => { const el = $('#gt' + i), on = i === cur, done = i < cur;
      M.vis(el, t, tG1 + 0.3 + i * 0.1, 1e9, { dy: 16 });
      const red = i === 2 ? pulse(t, tStop - 0.2, 1.6) : 0;
      el.style.background = red > 0.01 ? mix(C.ac2, '#FBE6E6', red) : on ? C.ac2 : C.soft;
      const n = $('#gn' + i); n.style.background = on || done ? C.ac : '#fff'; n.style.color = on || done ? '#fff' : '#9AA0AC'; n.style.borderColor = on || done ? C.ac : '#CBD0DA';
      $('#gh' + i).style.color = on || done ? '#1F6B3F' : C.mute;
      const d = GD[i], lt = on ? t - tGt[i] : 0, ph = (lt % 1.6) / 1.6;
      if (i === 0) { attr(d.sc, 'x', (20 + (on ? ph : 0) * 300).toFixed(1)); d.sc.style.opacity = on ? 1 : 0; }
      if (i === 1) { d.a.setAttribute('fill', mix('#FFFFFF', GN, on ? 0.2 + 0.3 * (ph < 0.5 ? 1 : 0) : 0.2)); d.b.setAttribute('fill', mix('#FFFFFF', EP, on ? 0.25 + 0.35 * (ph >= 0.5 ? 1 : 0) : 0.25)); }
      if (i === 2) { const s = on ? 1 + 0.12 * Math.sin(lt * 5) : 1; attr(d.A, 'font-size', (52 * s).toFixed(1)); attr(d.a, 'font-size', (52 * (on ? 1 + 0.12 * Math.sin(lt * 5 + Math.PI) : 1)).toFixed(1)); }
      if (i === 3) { const u = on ? M.clamp((ph - 0.1) / 0.5) : 1; M.drawU(d.u1, u); M.drawU(d.u2, M.clamp(u * 1.6 - 0.6)); }
    });
    // tokens
    const tw = $('#tk0').offsetWidth, mv1 = M.io((t - tPass) / 1.8), mv2 = M.io((t - tTok2 - 0.4) / 2.2);
    M.vis($('#tk0'), t, tTok1 - 0.1, 1e9, POP); $('#tk0').style.left = (36 + mv1 * (GX(3) + 362 - tw - 36)).toFixed(1) + 'px';
    M.vis($('#tk1'), t, tTok2 - 0.1, 1e9, POP); $('#tk1').style.left = (36 + mv2 * (GX(2) - 36 - 20)).toFixed(1) + 'px';
    [0, 1].forEach(i => $('#bad' + i).style.background = mix('#FFFFFF', '#FBE6E6', M.io((t - tStop + 0.3) / 0.3)));
    [0, 1, 2, 3].forEach(g => { M.vis($('#gk0' + g), t, tPass + 0.2 + g * 0.42, 1e9, { ...POP, sc: 0.3 }); M.hide($('#gk1' + g), true);
      if (g < 3) M.vis($('#gk1' + g), t, tTok2 + 0.4 + (g + 1) * 0.68, 1e9, { ...POP, sc: 0.3 }); });
  }

  /* R: rule books */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#cb'), t, T0('R2') - 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cz'), t, T0('R3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [['R2', 0], ['R3', 1]].forEach(([id, i]) => { const c = $('#cd' + i); M.vis(c.querySelector('.ab'), t, wt(id, i ? 'ICZN' : 'ICBN') - 0.1, 1e9, POP);
      M.vis(c.querySelector('.full2'), t, T0(id) + 0.3, 1e9, { dy: 10 }); M.vis(c.querySelector('.for'), t, T0(id) + 0.6, 1e9, POP);
      M.vis(c.querySelector('.exl'), t, T0(id) + 1.0, 1e9, { dy: 6 }); M.vis(c.querySelector('.ex'), t, T0(id) + 1.1, 1e9, { dy: 10 }); });
  }

  /* C: compare + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#cc'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cs'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#cc' + i), t, wt('C2', ['Bangude', 'ayla', 'bangda'][i]) - 0.1, 1e9, POP));
    M.vis($('#ccQ'), t, wt('C2', 'Many') - 0.1, 1e9, { dy: 8 }); M.vis($('#ccP'), t, wt('C2', 'change') - 0.1, 1e9, POP);
    M.vis($('#csN'), t, wt('C3', 'Rastrelliger') - 0.1, 1e9, POP); M.vis($('#csP'), t, wt('C3', 'same') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC4 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Is') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'epithet') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Genus') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Both') - 0.1, 0.8);
  }

  /* W: fix three names */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wk'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    FX.forEach((_, i) => { M.vis($('#fx' + i), t, tFx[i] - 0.15, 1e9, { dy: 16 });
      const s = M.io((t - tFix[i] + 0.2) / 0.35), sk = $('#sk' + i); sk.style.width = ((sk._w || 300) * s).toFixed(1) + 'px';
      $('#bf' + i).style.color = mix('#8A1C1C', '#B98A8A', s);
      M.vis($('#ar' + i), t, tFix[i] + 0.05, 1e9, { dx: -12, dy: 0 }); M.vis($('#af' + i), t, tFix[i] + 0.2, 1e9, { dx: -16, dy: 0 }); M.vis($('#wy' + i), t, tFix[i] + 0.5, 1e9, POP);
      const h = $('#h' + i); if (h) h.style.background = mix('#FFFFFF', C.ac2, M.io((t - tFix[i] - 0.4) / 0.3)); });
    const ub = $('#ulB'); M.vis(ub, t, tFx[2] + 0.2, 1e9, { dy: 0, fade: 0.2 }); ub.style.background = mix(C.ink, C.red, M.io((t - tFix[2] + 0.4) / 0.3));
    [0, 1].forEach(i => { const u = $('#ulA' + i); M.vis(u, t, tFix[2] + 0.5 + i * 0.3, 1e9, { dy: 0, fade: 0.05 }); u.style.clipPath = `inset(0 ${(100 - 100 * M.io((t - tFix[2] - 0.5 - i * 0.3) / 0.3)).toFixed(1)}% 0 0)`; });
    avW(t, tFix[2] + 0.9, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'species') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'name') - 0.1 });
    M.vis(xG, t, wt('X3', 'Mangifera') - 0.2, 1e9, { dy: 8 }); M.vis(xE, t, wt('X3', 'indica') - 0.1, 1e9, { dy: 8 });
    M.draw(xBr2, t, wt('X3', 'epithet') - 0.1, 0.4); M.vis(xL2, t, wt('X3', 'epithet'), 1e9, { dy: 4 });
    M.draw(xBr1, t, wt('X3', 'both') - 0.1, 0.5); M.vis(xL1, t, wt('X3', 'both') + 0.1, 1e9, { dy: 4 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'Expect') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
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
