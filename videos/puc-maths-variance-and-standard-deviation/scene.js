// PUC Maths Ep 87: Variance and standard deviation (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 13): data values x_i violet, mean x-bar blue, squared deviations orange, variance sigma^2 gold, standard deviation sigma coral
const XC = C.violet, MC = '#2F6FEB', QC = C.orange, QB = '#FBEBDD', VC = C.gold, SC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Xv = s => `\\textcolor{${XC}}{${s}}`, Mn = s => `\\textcolor{${MC}}{${s}}`, Q = s => `\\textcolor{${QC}}{${s}}`, V = s => `\\textcolor{${VC}}{${s}}`, S = s => `\\textcolor{${SC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const xi = Xv('x_i'), xb = Mn('\\bar{x}'), s2 = V('\\sigma^2'), sg = S('\\sigma');
const VAR = `${s2} = \\tfrac{1}{n}\\sum ${Q(`(${xi} - ${xb})^2`)}`;
const NL = (svg, y, lo, hi, step, lab = step) => { const x0 = 56, x1 = 728, X = v => x0 + (x1 - x0) * (v - lo) / (hi - lo);
  mk(svg, 'line', { x1: x0 - 8, y1: y, x2: x1 + 8, y2: y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = lo; v <= hi + 1e-9; v += step) { mk(svg, 'line', { x1: X(v), y1: y - 8, x2: X(v), y2: y + 8, stroke: C.ink, 'stroke-width': 2 }); if (Math.abs((v - lo) % lab) < 1e-9) txt(svg, X(v), y + 32, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
  return X; };
const mkDot = (svg, x, y, col = XC, r = 9) => { const g = mk(mk(svg, 'g', {}), 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: col }); return g; };
const cLine = (svg, x, y1, y2, col, lab) => { const g = mk(svg, 'g', {}); mk(g, 'line', { x1: x, y1, x2: x, y2, stroke: col, 'stroke-width': 3, 'stroke-dasharray': '7 6' }); if (lab) txt(g, x, y1 - 10, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); return g; };
// stacked dots for repeated values
const dots = (svg, X, vals, y) => { const seen = {}; return vals.map(v => { const k = seen[v] = (seen[v] || 0) + 1; return mkDot(svg, X(v), y - (k - 1) * 22); }); };
// a row of squares (side = |gap| * sc), bottom-aligned at y
const squares = (svg, gaps, x0, y, sc, gap, labs = true) => { let x = x0; return gaps.map(d => { const s = Math.abs(d) * sc, g = mk(svg, 'g', {}); const r = mk(g, 'rect', { x, y: y - s, width: s, height: s, fill: QB, stroke: QC, 'stroke-width': 2.5 });
  const lb = labs ? txt(g, x + s / 2, y - s - 10, d * d, { 'text-anchor': 'middle', 'font-size': 18, fill: QC, 'font-weight': 600 }) : null; const o = { g, r, x, s, d, lb }; x += s + (s ? gap : 6); return o; }); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['BATSMAN A · 10 MATCHES', '530 runs'], ['BATSMAN B · 10 MATCHES', '530 runs'], ['BOTH AVERAGE', '53 runs']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Both'), wt('H1', 'thirty'), wt('H1', 'average')];

/* ---------- data (NCERT Ch 13 introduction) ---------- */
const BA = [30, 91, 0, 64, 42, 80, 30, 5, 117, 71], BB = [53, 46, 48, 50, 53, 53, 58, 60, 57, 52];

/* ---------- H ---------- */
const hg = $('#hG');
const hXa = NL(hg, 200, 0, 120, 10, 20), hXb = NL(hg, 390, 0, 120, 10, 20);
txt(hg, 36, 112, 'BATSMAN A', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 }); txt(hg, 36, 302, 'BATSMAN B', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
const hDa = dots(hg, hXa, BA, 200), hDb = dots(hg, hXb, BB, 390);
const hMa = cLine(hg, hXa(53), 130, 222, MC, 'mean 53'), hMb = cLine(hg, hXb(53), 320, 412, MC, 'mean 53');

/* ---------- P ---------- */
$('#p1F').innerHTML = K(`|${xi} - ${xb}|`); $('#p1E').innerHTML = K(`|-3| = 3, \\quad |3| = 3`);
$('#p2F').innerHTML = K(Q(`(${xi} - ${xb})^2`)); $('#p2E').innerHTML = K(`(-3)^2 = ${Q('9')}, \\quad 3^2 = ${Q('9')}`);

/* ---------- S: live squares ---------- */
const D8 = [2, 4, 4, 4, 5, 5, 7, 9], G8 = D8.map(v => v - 5);
const sg8 = $('#sG'), sX = NL(sg8, 150, 0, 10, 1, 1);
const sD = dots(sg8, sX, D8, 150), sMl = cLine(sg8, sX(5), 76, 470, MC, 'x̄ = 5');
const sRows = D8.map((v, i) => { const y = 214 + i * 32, g = mk(sg8, 'g', {}); txt(g, 36, y + 7, v, { 'font-size': 20, fill: XC, 'font-weight': 600 }); const d = v - 5;
  if (d) mk(g, 'line', { x1: sX(v), y1: y, x2: sX(5), y2: y, stroke: QC, 'stroke-width': 7, 'stroke-linecap': 'round' }); else mk(g, 'circle', { cx: sX(5), cy: y, r: 5, fill: QC });
  txt(g, Math.max(sX(v), sX(5)) + 14, y + 7, `gap ${Math.abs(d)}`, { 'font-size': 18, fill: QC, 'font-weight': 600 }); return g; });
const qg = $('#qG'), SQ = squares(qg, G8, 40, 340, 30, 12);
const avg = mk(mk(qg, 'g', {}), 'g', {}); mk(avg, 'rect', { x: 600, y: 280, width: 60, height: 60, fill: C.ac2, stroke: SC, 'stroke-width': 3 });
const avgL = txt(qg, 630, 268, 'area 4', { 'text-anchor': 'middle', 'font-size': 18, fill: VC, 'font-weight': 600 });
const avgS = txt(qg, 630, 372, 'side 2 = σ', { 'text-anchor': 'middle', 'font-size': 20, fill: SC, 'font-weight': 600 });
const avgT = txt(qg, 630, 112, 'AVERAGE SQUARE', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 2 });
const tSd = D8.map((_, i) => wt('S1', 'two') + i * (wt('S1', 'nine') - wt('S1', 'two')) / 7);
const tSq = [wt('S2', 'three'), wt('S3', 'one'), wt('S3', 'one', 1), wt('S3', 'one', 2), wt('S3', 'zero'), wt('S3', 'zero', 1), wt('S3', 'four'), wt('S2', 'four')];
const tSa = [wt('S3', 'Nine'), wt('S3', 'one'), wt('S3', 'one', 1), wt('S3', 'one', 2), wt('S3', 'zero'), wt('S3', 'zero', 1), wt('S3', 'four'), wt('S3', 'sixteen')];

/* ---------- D ---------- */
const DSx = [`${xb} = \\tfrac{1}{n}\\sum ${xi}`, Q(`(${xi} - ${xb})^2`), VAR, `${sg} = \\sqrt{${s2}}`, `${s2} = \\tfrac{1}{n}\\sum ${xi}^2 - ${xb}^2`];
const DW = ['the mean', 'square each deviation', 'variance: the average square', 'standard deviation: the positive root', 'shortcut: mean of squares minus square of mean'];
$('#dSt').innerHTML = DSx.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:52px">${DW[i]}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const DR = [`${xb} = \\tfrac{40}{8} = ${Mn('5')}`, `\\sum ${Q('(x_i - 5)^2')} = 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = ${Q('32')}`, `${s2} = \\tfrac{32}{8} = ${V('4')}`, `${sg} = \\sqrt{4} = ${S('2')}`, `\\tfrac{232}{8} - 5^2 = 29 - 25 = ${V('4')}\\ \\textcolor{${C.ok}}{\\checkmark}`];
$('#dRows').innerHTML = DR.map((f, i) => `<div class="kk" id="dr${i}" style="top:${92 + i * 96}px;font-size:${i === 1 ? 28 : 34}px">${K(f)}</div>`).join('');

/* ---------- C ---------- */
$('#c1F').innerHTML = K(VAR); $('#c2F').innerHTML = K(`${sg} = \\sqrt{${s2}}`);
const bars = (host, vals, col, unit) => { const mx = Math.max(...vals.map(v => v[1])); host.innerHTML = vals.map(([n, v], i) => `<div class="bl" style="left:36px;top:${232 + i * 90}px;color:var(--ink)">${n}</div><div class="bar" id="${host.id}${i}" style="left:110px;top:${222 + i * 90}px;width:${Math.max(6, 460 * v / mx).toFixed(0)}px;background:${col}"></div><div class="bl" style="left:${Math.max(6, 460 * v / mx) + 126}px;top:${232 + i * 90}px;color:${col}">${v} ${unit}</div>`).join(''); };
bars($('#c1B'), [['A', 1300.6], ['B', 17.4]], VC, 'runs²'); bars($('#c2B'), [['A', 36.1], ['B', 4.2]], SC, 'runs');
const th1 = PUC.think($('#th1'), { q: 'Which batsman is more consistent?', opts: ['Batsman A: σ ≈ 36', 'Batsman B: σ ≈ 4.2'], right: 1, why: 'A smaller standard deviation means the scores stay close to the mean of 53.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${sg} = \\sqrt{\\tfrac{1}{n}\\sum ${Q(`(${xi} - ${xb})^2`)}}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find the variance and standard deviation of<br>${K(Xv('6,\\ 8,\\ 10,\\ \\dots,\\ 24'))}`;
const wsol = PUC.solution($('#wl'), [
  [K(`n = 10,\\ \\ ${xb} = ${Mn('15')}`)],
  [K(`${xi} - 15:\\ -9, -7, \\dots, 7, 9`)],
  [K(`\\sum ${Q(`(${xi} - 15)^2`)} = 2(81 + 49 + 25 + 9 + 1) = ${Q('330')}`)],
  [K(`${s2} = \\tfrac{330}{10} = ${V('33')}`)],
  [K(`${sg} = \\sqrt{33} \\approx ${S('5.74')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const WG = [-9, -7, -5, -3, -1, 1, 3, 5, 7, 9], wg = $('#wG'), WQ = squares(wg, WG, 56, 380, 12, 8);
WQ.forEach(o => { if (Math.abs(o.d) === 1 && o.lb) o.lb.textContent = ''; }); WQ.filter(o => Math.abs(o.d) > 1).forEach(o => txt(o.g, o.x + o.s / 2, 410, o.d, { 'text-anchor': 'middle', 'font-size': 16, fill: XC, 'font-weight': 600 }));
const tWq = WG.map((_, i) => wt('W4', 'squares') + i * 0.35);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${s2} = 33 \\;\\Rightarrow\\; ${red('\\sigma = 33')}`), right: K(`${sg} = \\sqrt{33} \\approx ${S('5.74')}`), y0: 70, y1: 168 });
$('#tR').innerHTML = `<div class="lbl" style="position:static">KEEP THEM APART</div><div class="k" id="tR1">${K(`${s2}:\\ \\text{squared units}`)}</div><div class="k" id="tR2">${K(`${sg} = \\sqrt{${s2}}:\\ \\text{same unit as the data}`)}</div>`;
$('#tR').style.top = '40px'; $('#tR').style.left = '960px'; $('#tR').style.width = '620px';
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Mean and variance given: find missing observations or the new variance.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `The mean of 5 observations is 4 and their variance is 2. A sixth observation, 4, is added. Find the new variance.`,
  opts: ['2', '5/3', '12/5', '10/3'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\sum x = 5 \\times 4 = 20`)], [K(`\\sum x^2 = 5(2 + 16) = 90`)], [K(`+4:\\ \\sum x = 24,\\ \\sum x^2 = 106`)], [K(`\\sigma^2 = \\tfrac{106}{6} - 4^2`)], [K(`= \\tfrac{5}{3}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'sum'), wt('A2', 'squares'), wt('A3', 'Add'), wt('A4', 'new'), wt('A4', 'That')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 230, w: 1200, h: 550, title: 'Recap · variance and standard deviation', y0: 100, dy: 90, txt: [0, 0, 0, 1, 0],
  lines: [K(VAR), K(`${sg} = \\sqrt{${s2}} \\quad \\text{(positive root)}`), K(`${s2} = \\tfrac{1}{n}\\sum ${xi}^2 - ${xb}^2`),
    '<b>Smaller σ</b>: more consistent · σ² has squared units',
    K(`\\text{Batsman B: } ${sg} \\approx 4.2 \\qquad \\text{A: } ${sg} \\approx 36.1`)] });
const YQ = ['Why do we square the deviations?', 'If the variance is 25, what is the standard deviation?', 'Heights are in centimetres. What is the unit of their variance?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 88', topic: '70 percent chance of rain: what does it mean? Probability', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.3, 1.04, 960, 560], [T1('S5'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hg, t, tMorph + 0.2, 1e9, { dy: 0, fade: 0.3 });
    hDa.forEach((g, i) => M.vis(g, t, wt('H2', 'swings') - 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    hDb.forEach((g, i) => M.vis(g, t, wt('H2', 'stays') - 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(hMa, t, wt('H2', 'stays') + 0.8, 1e9, { dy: 0 }); M.vis(hMb, t, wt('H2', 'stays') + 0.9, 1e9, { dy: 0 });
    M.vis($('#hP'), t, T0('H3') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, T0('H3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, T0('H3') + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, T0('H3') + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Which') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#p1'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#p1F'), t, wt('P1', 'distances') - 0.1, 0.8); M.vis($('#p1E'), t, wt('P1', 'absolute') - 0.1, 1e9, { dy: 10 }); M.vis($('#p1P'), t, wt('P1', 'measured') - 0.1, 1e9, POP);
    M.vis($('#p2'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#p2F'), t, T0('P2') + 0.3, 0.8); M.vis($('#p2E'), t, wt('P2', 'Square') + 0.6, 1e9, { dy: 10 }); M.vis($('#p2P'), t, wt('P2', 'never') - 0.2, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    sD.forEach((g, i) => M.vis(g, t, tSd[i] - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(sMl, t, wt('S1', 'mean') - 0.1, 1e9, { dy: 0 });
    sRows.forEach((g, i) => M.vis(g, t, wt('S2', 'gap') + i * 0.15, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#sr'), t, T0('S2') + 0.3, out, { dx: 60, dy: 0, ...o });
    SQ.forEach((q, i) => { const u = M.io((t - tSq[i]) / 0.5); M.hide(q.g, u <= 0 || !q.s); if (q.s) { const s = q.s * u; attr(q.r, 'y', (340 - s).toFixed(1)); attr(q.r, 'width', s.toFixed(1)); attr(q.r, 'height', s.toFixed(1)); q.lb.style.opacity = M.clamp((u - 0.6) / 0.4).toFixed(3); } });
    M.vis($('#qT'), t, tSa[0] - 0.1, 1e9, { dy: 8 }); M.setT($('#qTv'), String(G8.reduce((a, d, i) => a + (t >= tSa[i] ? d * d : 0), 0)));
    M.vis($('#qV'), t, wt('S4', 'Thirty') - 0.1, 1e9, { dy: 8 });
    M.vis(avgT, t, wt('S4', 'average') - 0.3, 1e9, { dy: 0 }); M.vis(avg, t, wt('S4', 'average') - 0.2, 1e9, { ...POP, sc: 0.3 }); M.vis(avgL, t, wt('S4', 'average'), 1e9, { dy: 0 });
    M.vis(avgS, t, wt('S5', 'side') - 0.1, 1e9, { dy: 0 }); M.vis($('#qS'), t, wt('S5', 'root') - 0.1, 1e9, { dy: 8 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DSx.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t) - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DR.forEach((_, i) => PUC.write($('#dr' + i), t, tDs[i] + 1.0, 0.9));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, wt('C1', 'variance') - 0.1, 0.9);
    $('#c1B').querySelectorAll('div').forEach((e, i) => M.vis(e, t, wt('C1', 'squares') + Math.floor(i / 3) * 0.3, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#c1P'), t, wt('C1', 'runs') - 0.1, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, wt('C2', 'standard') - 0.1, 0.9);
    $('#c2B').querySelectorAll('div').forEach((e, i) => M.vis(e, t, i < 3 ? wt('C2', 'Batsman') - 0.1 : wt('C2', 'Batsman', 1) - 0.1, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#c2P'), t, wt('C2', 'back') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'more') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'smaller') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Square') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'average') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    WQ.forEach((q, i) => M.vis(q.g, t, tWq[i], 1e9, { dy: 16, fade: 0.15 }));
    M.vis($('#wT'), t, tWq[0] - 0.2, 1e9, { dy: 8 }); M.setT($('#wTv'), String(WG.reduce((a, d, i) => a + (t >= tWq[i] + 0.1 ? d * d : 0), 0)));
    M.vis($('#wV'), t, T0('W6'), 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'stop') - 0.1, tStrike: wt('X3', 'square') - 0.1, tRight: wt('X3', 'five') - 0.1 });
    M.vis($('#tR'), t, wt('X2', 'variance') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'root') - 0.1, 1e9, { dy: 8 });
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
