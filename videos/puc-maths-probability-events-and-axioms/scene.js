// PUC Maths Ep 88: Probability: events and axioms (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 14): event E / A and rain blue, event F / B teal, overlap (and) gold, not E orange, or / the probability result coral
const EC = '#2F6FEB', EB = '#E7EEFD', FC = C.teal, FB = '#DDF1F1', OC = C.gold, OB = '#F6ECDC', NC = C.orange, NB = '#FBEBDD', PC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const E_ = s => `\\textcolor{${EC}}{${s}}`, F_ = s => `\\textcolor{${FC}}{${s}}`, O_ = s => `\\textcolor{${OC}}{${s}}`, N_ = s => `\\textcolor{${NC}}{${s}}`, P_ = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const UNION = `P(${E_('A')} \\cup ${F_('B')}) = P(${E_('A')}) + P(${F_('B')}) - P(${O_('A \\cap B')})`;
// a row of six die tiles; lit(t) colours the members of the set
const tileRow = (host, id, y, x0, step, set, col, bg) => { host.insertAdjacentHTML('beforeend', [1, 2, 3, 4, 5, 6].map((n, i) => `<div class="tl" id="${id}${n}" style="left:${x0 + i * step}px;top:${y}px">${n}</div>`).join(''));
  const els = [1, 2, 3, 4, 5, 6].map(n => $('#' + id + n));
  return { els, show: (t, t0, tout = 1e9) => els.forEach((e, i) => M.vis(e, t, t0 + i * 0.05, tout, { dy: 10, fade: 0.12 })), lit: (t, t0) => { const u = M.io((t - t0) / 0.3); els.forEach((e, i) => { const on = set.includes(i + 1); e.style.background = on ? mix(C.soft, bg, u) : C.soft; e.style.borderColor = on ? mix(C.soft, col, u) : 'transparent'; e.style.color = on ? mix(C.dim, col, u) : C.dim; }); } }; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tL1 = T0('L1'), tE1 = T0('E1'), tG1 = T0('G1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TOMORROW', '70% chance of rain'], ['IT WILL', 'rain, or not'], ['SO WHAT IS', '70 percent?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'seventy'), wt('H2', 'either'), wt('H2', 'mean')];

/* ---------- L: 600 throws of a die (fixed seed, so every render is the same) ---------- */
let sd = 7; const rnd = () => { sd = (sd * 1103515245 + 12345) % 2147483648; return sd / 2147483648; };
const THR = Array.from({ length: 600 }, () => 1 + Math.floor(rnd() * 6)), CUM = []; THR.reduce((a, d, i) => (CUM[i] = a + (d % 2 === 0 ? 1 : 0)), 0);
const lg = PUC.graph($('#lG'), { x: 110, y: 160, w: 600, h: 300, xmax: 600, ymax: 1, xt: [0, 200, 400, 600], yt: [0, 0.5, 1] });
const lHalf = mk($('#lG'), 'line', { x1: lg.X(0), y1: lg.Y(0.5), x2: lg.X(600), y2: lg.Y(0.5), stroke: PC, 'stroke-width': 2, 'stroke-dasharray': '7 6' });
const lPath = mk($('#lG'), 'path', { d: '', fill: 'none', stroke: EC, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const tN0 = wt('L1', 'Throw'), tN1 = wt('L2', 'ten'), tN2 = wt('L2', 'hundred'), tN3 = wt('L2', 'hundred', 1);
const nAt = t => { const k = [[tN0, 0], [tN1, 10], [tN2, 100], [tN3, 600]]; if (t <= tN0) return 0; for (let i = 1; i < k.length; i++) if (t < k[i][0]) { const [a, va] = k[i - 1], [b, vb] = k[i]; return Math.round(va + (vb - va) * M.clamp((t - a) / (b - a))); } return 600; };
$('#lT').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="tl" id="lt${i}" style="left:${36 + i * 70}px;top:84px">-</div>`).join('');
$('#lD').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="tl" id="ld${i}" style="left:${36 + i * 70}px;top:380px;font-size:16px">${i < 7 ? 'RAIN' : 'DRY'}</div>`).join('') + `<div class="rw" id="ldL" style="left:36px;top:460px"><b style="color:${EC}">7 rainy</b> · 3 dry, out of 10 days like it</div>`;
let nLast = -1;

/* ---------- E: events ---------- */
const eL = $('#eRows'), eR = $('#eRows2');
const ER = [['S', [1, 2, 3, 4, 5, 6], C.ink, '#FFFFFF', 'all results', 96], [E_('E'), [2, 4, 6], EC, EB, 'even', 186], [N_("E'"), [1, 3, 5], NC, NB, 'not E', 276], [F_('F'), [4, 5, 6], FC, FB, 'more than 3', 366]];
const eRows = ER.map(([lab, set, col, bg, w, y], i) => { eL.insertAdjacentHTML('beforeend', `<div class="rl" id="erl${i}" style="top:${y + 6}px">${K(lab)}</div><div class="rw" id="erw${i}" style="left:600px;top:${y + 16}px">${w}</div>`); return tileRow(eL, 'et' + i + '_', y, 150, 72, set, col, bg); });
const ER2 = [[`${E_('E')} \\cup ${F_('F')}`, [2, 4, 5, 6], PC, C.ac2, 'at least one', 96], [`${O_('E \\cap F')}`, [4, 6], OC, OB, 'both', 186]];
const eRows2 = ER2.map(([lab, set, col, bg, w, y], i) => { eR.insertAdjacentHTML('beforeend', `<div class="rl" id="e2l${i}" style="top:${y + 6}px;font-size:28px">${K(lab)}</div><div class="rw" id="e2w${i}" style="left:600px;top:${y + 16}px">${w}</div>`); return tileRow(eR, 'eu' + i + '_', y, 150, 72, set, col, bg); });
const eMx = [tileRow($('#eMr'), 'em0_', 336, 150, 72, [2, 4, 6], EC, EB), tileRow($('#eMr'), 'em1_', 410, 150, 72, [1, 3, 5], NC, NB)];
$('#eMr').insertAdjacentHTML('beforeend', `<div class="rl" id="eml0" style="top:342px;font-size:24px">even</div><div class="rl" id="eml1" style="top:416px;font-size:24px">odd</div>`);
$('#eMp').innerHTML = `No number in both: ${K("E \\cap E' = \\phi")}`;
const tEr = [wt('E1', 'sample'), wt('E2', 'even'), wt('E3', 'not'), wt('E4', 'Let')], tEr2 = [wt('E4', 'or'), wt('E4', 'and')];

/* ---------- G: axioms ---------- */
const GS = [[`P(${E_('E')}) \\ge 0`, 'rule 1: never negative'], [`P(S) = 1`, 'rule 2: something must happen'], [`P(${E_('E')} \\cup ${F_('F')}) = P(${E_('E')}) + P(${F_('F')})`, 'rule 3: if E and F are mutually exclusive'],
  [`P(${N_("E'")}) = 1 - P(${E_('E')})`, 'from rules 2 and 3'], [`P(${E_('E')}) = \\tfrac{n(${E_('E')})}{n(S)}`, 'when all outcomes are equally likely']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:52px">${w}</div></div>`).join('');
const tGs = [T0('G2'), T0('G3'), T0('G4'), wt('G6', 'So'), T0('G7')];
$('#gF').innerHTML = K(`P(${E_('\\text{rain}')}) + P(${N_('\\text{no rain}')}) = 1`) + '<div style="margin-top:14px">' + K(`0.7 + ${N_('0.3')} = 1`) + '</div>';
$('#gD').innerHTML = K(`\\text{fair die: } P(${E_('\\text{even}')}) = \\tfrac{3}{6} = ${P_('\\tfrac12')}`);

/* ---------- C ---------- */
const c1r = [tileRow($('#c1T'), 'ca0_', 110, 150, 72, [2, 4, 6], EC, EB), tileRow($('#c1T'), 'ca1_', 200, 150, 72, [1, 3, 5], NC, NB)];
$('#c1T').insertAdjacentHTML('beforeend', `<div class="rl" style="top:116px;font-size:24px">even</div><div class="rl" style="top:206px;font-size:24px">odd</div>`);
const c2r = [tileRow($('#c2T'), 'cb0_', 110, 190, 72, [2, 4, 6], EC, EB), tileRow($('#c2T'), 'cb1_', 200, 190, 72, [4, 5, 6], FC, FB)];
$('#c2T').insertAdjacentHTML('beforeend', `<div class="rl" style="top:116px;font-size:24px">even</div><div class="rl" style="top:206px;font-size:24px">more than 3</div>`);
$('#c1F').innerHTML = K(`P(${E_('\\text{even}')} \\cup ${N_('\\text{odd}')}) = \\tfrac12 + \\tfrac12 = ${P_('1')}`);
$('#c2F').innerHTML = K(`P(${E_('E')} \\cup ${F_('F')}) = \\tfrac36 + \\tfrac36 - ${O_('\\tfrac26')} = ${P_('\\tfrac46')}`);
const th1 = PUC.think($('#th1'), { q: 'One throw: are "a 2" and "an even number" mutually exclusive?', opts: ['Yes', 'No'], right: 1, why: 'A 2 is also even, so both happen on the same throw. They share the outcome 2.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(UNION);

/* ---------- W ---------- */
$('#wq').innerHTML = `A die is thrown. ${K(E_('A'))}: an even number. ${K(F_('B'))}: more than 3. Find ${K(`P(${E_('A')} \\cup ${F_('B')})`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`S = \\{1, 2, 3, 4, 5, 6\\},\\ n(S) = 6`)],
  [K(`${E_('A')} = \\{2, 4, 6\\},\\ \\ ${F_('B')} = \\{4, 5, 6\\}`)],
  [K(`${O_('A \\cap B')} = \\{4, 6\\}:\\ P = ${O_('\\tfrac26')}`)],
  [K(`P(${E_('A')} \\cup ${F_('B')}) = \\tfrac36 + \\tfrac36 - ${O_('\\tfrac26')}`)],
  [K(`= \\tfrac46 = ${P_('\\tfrac23')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const WR = [['S', [1, 2, 3, 4, 5, 6], C.ink, '#FFFFFF', 90], [E_('A'), [2, 4, 6], EC, EB, 180], [F_('B'), [4, 5, 6], FC, FB, 270], [`${E_('A')} \\cup ${F_('B')}`, [2, 4, 5, 6], PC, C.ac2, 360]];
const wRows = WR.map(([lab, set, col, bg, y], i) => { $('#wRows').insertAdjacentHTML('beforeend', `<div class="rl" id="wrl${i}" style="top:${y + 8}px;font-size:28px">${K(lab)}</div>`); return tileRow($('#wRows'), 'wt' + i + '_', y, 190, 80, set, col, bg); });
const tWr = [wt('W3', 'sample'), wt('W4', 'A'), wt('W4', 'B'), wt('W7', 'Check')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`P(${E_('A')} \\cup ${F_('B')}) = \\tfrac36 + \\tfrac36 = ${red('1')}`), right: K(`P(${E_('A')} \\cup ${F_('B')}) = \\tfrac36 + \\tfrac36 - ${O_('\\tfrac26')} = ${P_('\\tfrac23')}`), y0: 70, y1: 168 });
$('#tR').innerHTML = `<div class="lbl" style="position:static">WHY 1 IS WRONG</div><div class="k" id="tR1">${K(`\\text{a throw of 1 is in neither}`)}</div><div class="k" id="tR2">${K(`${O_('4,\\ 6')}\\ \\text{were counted twice}`)}</div>`;
$('#tR').style.top = '40px';
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Given some probabilities, find P(A or B), P(A and B) or P(exactly one).' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`P(A) = 0.6,\\ \\ P(B) = 0.5,\\ \\ P(A \\cup B) = 0.8`)}<br>Find the probability that A happens but B does not.`,
  opts: ['0.1', '0.3', '0.5', '0.6'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`P(A \\cap B) = 0.6 + 0.5 - 0.8`)], [K(`= 0.3`)], [K(`P(A) - P(A \\cap B)`)], [K(`= 0.6 - 0.3 = 0.3`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'First'), wt('A3', 'That'), wt('A4', 'A'), wt('A4', 'Zero')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 230, w: 1200, h: 550, title: 'Recap · events and axioms', y0: 100, dy: 90, txt: [0, 0, 0, 0, 1],
  lines: [K(`P(${E_('E')}) \\ge 0, \\qquad P(S) = 1`), K(`\\text{exclusive: } P(${E_('E')} \\cup ${F_('F')}) = P(${E_('E')}) + P(${F_('F')})`), K(`P(${N_("E'")}) = 1 - P(${E_('E')})`), K(UNION),
    '<b>70% rain</b>: on days like tomorrow, rain about 7 times in 10'] });
const YQ = ['What are the three axioms of probability?', 'If P(E) = 0.4, what is P(not E)?', 'Why can a probability never be more than 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'CLASS 11 COMPLETE', topic: 'Every episode: PUC Maths | Class 11 playlist', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('G5') - 0.3, 1.04, 960, 560], [T1('G6'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tL1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('L1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hb1'), t, tMorph + 0.4, 1e9, { dx: -20, dy: 0 }); M.vis($('#hb2'), t, tMorph + 0.6, 1e9, { dx: -20, dy: 0 });
    const t30 = wt('H4', 'thirty'); M.setT($('#hb2t'), t < t30 ? '?' : 'no rain 30%'); $('#hb2').style.background = t < t30 ? '#9AA3B5' : NC;
    M.vis($('#hP'), t, tMorph + 0.9, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'why') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tE1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('E1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(lHalf, t, wt('L2', 'half') - 0.2, 1e9, { dy: 0 });
    const n = nAt(t);
    if (n !== nLast) { nLast = n; let d = ''; for (let k = 1; k <= n; k++) d += (k > 1 ? 'L' : 'M') + lg.X(k).toFixed(1) + ',' + lg.Y(CUM[k - 1] / k).toFixed(1); attr(lPath, 'd', d);
      M.setT($('#lN'), String(n)); M.setT($('#lE'), String(n ? CUM[n - 1] : 0)); M.setT($('#lFv'), n ? (CUM[n - 1] / n).toFixed(3) : '0.000');
      for (let i = 0; i < 10; i++) { const k = n - 10 + i, el = $('#lt' + i); if (k >= 0) { const d0 = THR[k], ev = d0 % 2 === 0; el.textContent = d0; el.style.background = ev ? EB : C.soft; el.style.color = ev ? EC : C.dim; el.style.borderColor = ev ? EC : 'transparent'; } else { el.textContent = '-'; el.style.background = C.soft; el.style.color = C.dim; el.style.borderColor = 'transparent'; } } }
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lF'), t, tN0, 1e9, { dy: 8 });
    const tDy = wt('L3', 'tomorrow'), tRn = wt('L3', 'seven');
    M.vis($('#lDl'), t, tDy - 0.1, 1e9, { dy: 8 });
    for (let i = 0; i < 10; i++) { const el = $('#ld' + i); M.vis(el, t, tDy + i * 0.06, 1e9, { dy: 10, fade: 0.12 }); const u = M.io((t - tRn - i * 0.05) / 0.3), r = i < 7; el.style.background = r ? mix(C.soft, EB, u) : C.soft; el.style.borderColor = r ? mix(C.soft, EC, u) : 'transparent'; el.style.color = r ? mix(C.dim, EC, u) : C.dim; }
    M.vis($('#ldL'), t, tRn + 0.3, 1e9, { dy: 8 });
  }

  /* E */
  const eOn = t >= tE1 - 0.1 && t < tG1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('G1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o });
    eRows.forEach((r, i) => { M.vis($('#erl' + i), t, tEr[i] - 0.15, 1e9, { dy: 10 }); r.show(t, tEr[i] - 0.1); r.lit(t, tEr[i] + 0.4); M.vis($('#erw' + i), t, tEr[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
    M.vis($('#er'), t, tEr2[0] - 0.3, out, { dx: 60, dy: 0, ...o });
    eRows2.forEach((r, i) => { M.vis($('#e2l' + i), t, tEr2[i] - 0.15, 1e9, { dy: 10 }); r.show(t, tEr2[i] - 0.1); r.lit(t, tEr2[i] + 0.4); M.vis($('#e2w' + i), t, tEr2[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
    const tMx = wt('E5', 'never');
    M.vis($('#eMx'), t, tMx - 0.1, 1e9, { dy: 8 }); eMx.forEach((r, i) => { r.show(t, tMx + i * 0.2); r.lit(t, wt('E5', 'even') + i * 0.3); M.vis($('#eml' + i), t, tMx + i * 0.2, 1e9, { dy: 8 }); });
    M.vis($('#eMp'), t, wt('E5', 'odd') + 0.1, 1e9, POP);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('C1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i] + 0.1, 0.9); M.vis(el.querySelector('.why'), t, tGs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t) - 6).toFixed(1) + 'px';
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gAx'), t, wt('G1', 'axiom') - 0.1, 1e9, POP);
    M.vis($('#gb1'), t, wt('G5', 'rain') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#gb2'), t, wt('G5', 'no', 1) - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#gbl'), t, wt('G5', 'whole') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#gF'), t, wt('G6', 'So') + 0.1, 1.2);
    PUC.write($('#gD'), t, wt('G7', 'fair') - 0.1, 1.0);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    c1r.forEach((r, i) => { r.show(t, tC1 + 0.3 + i * 0.3); r.lit(t, wt('C1', i ? 'odd' : 'Even') + 0.1); });
    $('#c1T').querySelectorAll('.rl').forEach((e, i) => M.vis(e, t, tC1 + 0.3 + i * 0.3, 1e9, { dy: 8 }));
    PUC.write($('#c1F'), t, wt('C1', 'half') - 0.1, 1.0); M.vis($('#c1P'), t, wt('C1', 'one', 2) - 0.1, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    c2r.forEach((r, i) => { r.show(t, T0('C2') + 0.1 + i * 0.3); r.lit(t, T0('C2') + 0.6 + i * 0.4); });
    $('#c2T').querySelectorAll('.rl').forEach((e, i) => M.vis(e, t, T0('C2') + 0.1 + i * 0.3, 1e9, { dy: 8 }));
    const ov = M.io((t - wt('C2', 'four') + 0.05) / 0.3); [4, 6].forEach(n => [0, 1].forEach(j => { const el = $(`#cb${j}_${n}`); el.style.background = mix(j ? FB : EB, OB, ov); el.style.borderColor = mix(j ? FC : EC, OC, ov); el.style.color = mix(j ? FC : EC, OC, ov); }));
    PUC.write($('#c2F'), t, wt('C2', 'subtract') - 0.3, 1.1); M.vis($('#c2P'), t, wt('C2', 'once') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'mutually') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'two') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Probabilities') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'overlap') - 0.3, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wRows.forEach((r, i) => { M.vis($('#wrl' + i), t, tWr[i] - 0.15, 1e9, { dy: 8 }); r.show(t, tWr[i] - 0.1); r.lit(t, tWr[i] + 0.3); });
    const ov = M.io((t - wt('W5', 'overlap')) / 0.3); [4, 6].forEach(n => [1, 2].forEach(j => { const el = $(`#wt${j}_${n}`); if (t > wt('W5', 'overlap')) { el.style.background = mix(j === 1 ? EB : FB, OB, ov); el.style.borderColor = mix(j === 1 ? EC : FC, OC, ov); el.style.color = mix(j === 1 ? EC : FC, OC, ov); } }));
    M.vis($('#wR'), t, wt('W7', 'Four') - 0.1, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'add') - 0.1, tStrike: wt('X3', 'neither') - 0.1, tRight: wt('X3', 'answer') - 0.1 });
    M.vis($('#tR'), t, wt('X3', 'throw') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'counted') - 0.1, 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'gave') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
