// PUC Maths Ep 06: Power sets (Proof board) - not in the current NCERT text, JEE Main syllabus
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element violet, set A blue, rule coral, missing / wrong red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`;
const PHI = '\\phi', SN = ['s', 'b', 'l'], SNN = ['samosa', 'banana', 'laddoo'];
const sub = (L, i) => { const e = []; for (let j = 0; j < L; j++) if ((i >> (L - 1 - j)) & 1) e.push(SN[j]); return e; };
const subTxt = e => e.length ? `{${e.join(',')}}` : '{ }';

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tD1 = T0('D1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
$('#lists').innerHTML = SNN.map((n, i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">SNACK ${i + 1}</div><div class="lv">${n}</div></div>`).join('');
const tLs = SNN.map(n => wt('H1', n) - 0.1);

/* ---------- H: four example boxes ---------- */
const hs = $('#hS');
const HB = [[[0], 'just the samosa'], [[1, 2], 'banana and laddoo'], [[0, 1, 2], 'all three'], [[], 'nothing at all']];
const hBox = HB.map(([els, cap], i) => {
  const x = 36 + (i % 2) * 364, y = 90 + Math.floor(i / 2) * 196, g = mk(mk(hs, 'g', { transform: `translate(${x},${y})` }), 'g', {});
  const r = mk(g, 'rect', { x: 0, y: 0, width: 348, height: 132, rx: 16, fill: els.length ? '#fff' : C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': els.length ? '' : '9 7' });
  els.forEach((k, j) => { const w = 100, gx = 18 + j * 108; mk(g, 'rect', { x: gx, y: 26, width: w, height: 44, rx: 10, fill: '#EDE6FC', stroke: XC, 'stroke-width': 2 }); txt(g, gx + w / 2, 55, SNN[k], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 21, 'font-weight': 600, fill: XC }); });
  if (!els.length) txt(g, 174, 58, 'empty box', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
  txt(g, 18, 112, cap.toUpperCase(), { 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 });
  return g;
});
const tHb = [wt('H2', 'samosa'), wt('H2', 'banana'), wt('H2', 'three'), wt('H2', 'nothing')];

/* ---------- P: definition ---------- */
$('#pS').innerHTML = K(`P(${ac('A')})`);
$('#pA').innerHTML = K(`${ac('A')} = \\{\\,${xc('s')},\\ ${xc('b')},\\ ${xc('l')}\\,\\}`);
$('#pSub').innerHTML = K(`\\{\\,${xc('s')},\\ ${xc('l')}\\,\\} \\subset ${ac('A')}`);
$('#pPA').innerHTML = K(`P(${ac('A')}) = \\{\\ \\text{every subset of } ${ac('A')}\\ \\}`);

/* ---------- L: doubling tree ---------- */
const ls = $('#lS'), LY = [110, 220, 330, 450], LW = [124, 136, 136, 80];
const nx = (L, i) => 36 + (i + 0.5) * 712 / (1 << L);
const tLv = [wt('L2', 'only'), wt('L3', 'samosa'), wt('L4', 'banana'), wt('L5', 'laddoo')];
const tree = [];
for (let L = 0; L <= 3; L++) for (let i = 0; i < (1 << L); i++) {
  let edge = null;
  if (L) { const px = nx(L - 1, i >> 1), py = LY[L - 1] + 24, cx = nx(L, i), cy = LY[L] - 24; edge = mk(ls, 'line', { x1: px, y1: py, x2: cx, y2: cy, stroke: i & 1 ? XC : C.dim, 'stroke-width': i & 1 ? 3 : 2.5 }); }
  const g = mk(mk(ls, 'g', { transform: `translate(${nx(L, i)},${LY[L]})` }), 'g', {}), e = sub(L, i);
  const r = mk(g, 'rect', { x: -LW[L] / 2, y: -24, width: LW[L], height: 48, rx: 10, fill: e.length ? '#fff' : C.soft, stroke: e.length ? XC : C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': e.length ? '' : '6 5' });
  txt(g, 0, 7, subTxt(e), { 'text-anchor': 'middle', 'font-size': L === 3 ? 16 : 20, fill: e.length ? XC : C.ink2, 'font-weight': 600 });
  tree.push({ L, i, g, r, edge });
}
const lTag = [0, 1, 2].map(j => txt(ls, 748, (LY[j] + LY[j + 1]) / 2 + 6, `+ ${SN[j]}`, { 'text-anchor': 'end', 'font-size': 18, fill: XC, 'font-weight': 600 }));
const lLeg = txt(ls, 36, 530, 'grey line: without it · violet line: with it', { 'font-size': 17, fill: C.mute, 'font-weight': 600 });
const LF = ['1', '2', '2 \\times 2 = 4', '2 \\times 2 \\times 2 = 8'];
let lLast = -1;

/* ---------- D: switches ---------- */
const DS = [['Each element: in, or out', 'one yes or no question each', 1], [K(`\\times\\, 2\\ \\text{for every element}`), 'the choices do not affect each other', 0], [K(`2 \\times 2 \\times \\cdots \\times 2 = 2^{n}`), 'n elements, n doublings', 0]];
$('#dSt').innerHTML = DS.map(([f, w, tx], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 124}px"><div class="n">${i + 1}</div><div class="sx${tx ? ' tx' : ''}">${f}</div><div class="why">${w}</div></div>`).join('');
$('#dRes').innerHTML = K(`n(${ac('A')}) = n \\;\\Rightarrow\\; n(P(${ac('A')})) = 2^{n}`);
const tDs = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step')];
$('#dSw').innerHTML = SN.map((s, j) => `<div class="sr" id="sr${j}" style="top:${92 + j * 96}px"><div class="el">${s}</div><div class="nm">${SNN[j]}</div><div class="sw" style="left:440px">OUT</div><div class="sw" style="left:572px">IN</div></div>`).join('');
const tCyc = wt('D2', 'Every'), tCycE = T1('D4');
let dLast = -1;
const kAt = t => t < tCyc ? 0 : t >= tCycE ? 7 : Math.floor((t - tCyc) / 0.75) % 8;

/* ---------- K: A vs P(A) ---------- */
$('#kaF').innerHTML = K(`${ac('A')} = \\{\\,${xc('s')},\\ ${xc('b')},\\ ${xc('l')}\\,\\}`);
$('#kb1').innerHTML = K(`P(${ac('A')}) = \\{\\, ${PHI},\\ \\{${xc('s')}\\},\\ \\{${xc('b')}\\},\\ \\{${xc('l')}\\},`);
$('#kb2').innerHTML = K(`\\{${xc('s, b')}\\},\\ \\{${xc('s, l')}\\},\\ \\{${xc('b, l')}\\},\\ \\{${xc('s, b, l')}\\} \\,\\}`);
const kas = $('#kaS'); const kA = mk(kas, 'ellipse', { cx: 392, cy: 330, rx: 260, ry: 110, fill: ACB, stroke: AC, 'stroke-width': 3.5 });
const kAt3 = SN.map((s, j) => { const g = mk(mk(kas, 'g', { transform: `translate(${262 + j * 130},330)` }), 'g', {}); mk(g, 'circle', { r: 36, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 11, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32, 'font-weight': 700, fill: XC }); return g; });
const kbs = $('#kbS'), KB = [[], ['s'], ['b'], ['l'], ['s', 'b'], ['s', 'l'], ['b', 'l'], ['s', 'b', 'l']];
const kBx = KB.map((e, i) => { const g = mk(mk(kbs, 'g', { transform: `translate(${36 + (i % 4) * 182},${262 + Math.floor(i / 4) * 106})` }), 'g', {}); mk(g, 'rect', { x: 0, y: 0, width: 166, height: 86, rx: 12, fill: e.length ? '#fff' : C.soft, stroke: e.length ? XC : C.ink2, 'stroke-width': 2.5, 'stroke-dasharray': e.length ? '' : '7 6' }); txt(g, 83, 52, e.length ? `{${e.join(', ')}}` : 'φ', { 'text-anchor': 'middle', 'font-size': 22, fill: e.length ? XC : C.ink2, 'font-weight': 600 }); return g; });
const tKb = i => i === 0 ? wt('K2', 'empty') : i < 4 ? wt('K2', 'one', 1) + (i - 1) * 0.15 : i < 7 ? wt('K2', 'pairs') + (i - 4) * 0.15 : wt('K2', 'full');
const th1 = PUC.think($('#th1'), { q: `What is ${K(`P(${PHI})`)}? Is it empty?`, opts: [`Empty: ${K(`P(${PHI}) = ${PHI}`)}`, `Not empty: ${K(`P(${PHI}) = \\{${PHI}\\}`)}`], right: 1, why: `${K(PHI)} has one subset, itself. So ${K(`P(${PHI}) = \\{${PHI}\\}`)}, and ${K('2^0 = 1')}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`n(${ac('A')}) = n \\;\\Rightarrow\\; n(P(${ac('A')})) = 2^{n}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${ac('A')} = \\{${xc('1')}, ${xc('2')}\\}`)}. Write ${K(`P(${ac('A')})`)}.`;
const wsol = PUC.solution($('#wl'), [[K(`\\text{no element: } ${PHI}`)], [K(`\\text{one element: } \\{${xc('1')}\\},\\ \\{${xc('2')}\\}`)], [K(`\\text{both: } \\{${xc('1')}, ${xc('2')}\\} = ${ac('A')}`)], [K(`P(${ac('A')}) = \\{${PHI},\\ \\{${xc('1')}\\},\\ \\{${xc('2')}\\},\\ \\{${xc('1')}, ${xc('2')}\\}\\}`)], [K(`n(P(${ac('A')})) = 4 = 2^2`)]], { label: 'WORKED EXAMPLE', y0: 140, dy: 84 });
$('#wl .lbl').style.top = '30px';
const COLS = [['0 ELEMENTS', [PHI]], ['1 ELEMENT', [`\\{${xc('1')}\\}`, `\\{${xc('2')}\\}`]], ['2 ELEMENTS', [`\\{${xc('1')}, ${xc('2')}\\}`]]];
$('#cols').innerHTML = COLS.map(([n, bs], i) => `<div class="col" id="col${i}" style="left:${36 + i * 246}px"><div class="cl">${n}</div>${bs.map((b, j) => `<div class="bx" id="bx${i}${j}" style="top:${64 + j * 92}px;${i === 0 ? 'border-style:dashed;border-color:var(--ink2)' : ''}">${K(b)}</div>`).join('')}</div>`).join('');
const tWs = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'So'), wt('W6', 'Four')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`P(\\{s, b, l\\}):\\ 6\\ \\text{subsets}`), right: K(`\\text{add } ${PHI} \\text{ and } A \\text{ itself}:\\ 2^3 = 8`) });
const ts = $('#tS');
const tB = KB.map((e, i) => { const g = mk(mk(ts, 'g', { transform: `translate(${30 + (i % 4) * 128},${44 + Math.floor(i / 4) * 92})` }), 'g', {}); const r = mk(g, 'rect', { x: 0, y: 0, width: 116, height: 70, rx: 10, fill: '#fff', stroke: XC, 'stroke-width': 2.5 }); const tt = txt(g, 58, 42, e.length ? `{${e.join(',')}}` : 'φ', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 }); return { g, r, tt, miss: i === 0 || i === 7 }; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: `Count subsets with ${K('2^n')}, often comparing the subsets of two sets.` });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`n(${ac('A')}) = 2`)}. How many elements does ${K(`P(P(${ac('A')}))`)} have?`,
  opts: ['4', '8', '16', '32'], right: 2, optW: 474, optY: 260 });
const so = PUC.solution($('#so'), [[K(`n(${ac('A')}) = 2`)], [K(`n(P(${ac('A')})) = 2^2 = 4`)], [K(`P(P(${ac('A')})):\\ \\text{4-element set}`)], [K(`n(P(P(${ac('A')}))) = 2^4 = 16`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'A'), wt('A2', 'squared'), wt('A3', 'power'), wt('A4', 'sixteen') - 0.6];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · power sets', y0: 96, dy: 84, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Power set</b> P(A): the set of all the subsets of A',
    K(`n(${ac('A')}) = n \\;\\Rightarrow\\; n(P(${ac('A')})) = 2^{n}`),
    K(`P(\\{${xc('1')}, ${xc('2')}\\}) = \\{${PHI},\\ \\{${xc('1')}\\},\\ \\{${xc('2')}\\},\\ \\{${xc('1')}, ${xc('2')}\\}\\}`),
    K(`P(${PHI}) = \\{${PHI}\\},\\quad 2^0 = 1`),
    'φ and A itself are always in P(A)'] });
const YQ = ['How many subsets does a set with 5 elements have?', `Write the power set of ${K('\\{a\\}')}.`, `Why is ${K(PHI)} always an element of P(A)?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nxs = PUC.next($('#sF'), { label: 'NEXT · EP 07', topic: 'Speed 20 to 40 km/h: is 40 allowed?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLv[3] - 0.2, 1.05, 960, 560], [T0('L6') + 0.4, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  const nc = $('#nchip'), gh = $('#gh'); gh.style.left = (parseFloat(nc.style.left || 0) + nc.offsetWidth + 16).toFixed(1) + 'px';
  M.vis(gh, t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: -16, outDur: 0.01 });

  SNN.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    hBox.forEach((g, i) => M.vis(g, t, tHb[i] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#hP'), t, wt('H4', 'empty') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pr'), t, tP1 + 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pA'), t, tP1 + 0.3, 0.7); M.vis($('#pAw'), t, tP1 + 0.9, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#pSub'), t, wt('P1', 'subset') - 0.1, 0.7); M.vis($('#pSw'), t, wt('P1', 'every'), 1e9, { dx: -12, dy: 0 });
    M.vis($('#pl'), t, T0('P2') - 0.2, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('P2'), { st: 0.05, sp: M.HEAVY });
    PUC.write($('#pS'), t, wt('P2', 'write') - 0.1, 0.6); M.vis($('#pW'), t, wt('P2', 'write') + 0.4, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#pPA'), t, wt('P2', 'all') - 0.1, 1.0);
    M.vis($('#pG'), t, wt('P3', 'NCERT') - 0.1, 1e9, POP);
  }

  /* L: tree */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    tree.forEach(n => { const t0 = tLv[n.L] + n.i * 0.07; M.vis(n.g, t, t0, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); if (n.edge) M.draw(n.edge, t, t0 - 0.2, 0.3); });
    lTag.forEach((e, j) => M.vis(e, t, tLv[j + 1] - 0.1, 1e9, { dy: 0 }));
    M.vis(lLeg, t, tLv[1] + 0.8, 1e9, { dy: 0 });
    const em = tree.find(n => n.L === 3 && n.i === 0), pe = M.io((t - wt('L6', 'empty') + 0.1) / 0.3); attr(em.r, 'stroke', mix(C.ink2, RC, pe)); attr(em.r, 'stroke-width', (2.5 + 2 * pe).toFixed(2));
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const lv = tLv.reduce((a, tt, j) => t >= tt - 0.05 ? j : a, 0);
    if (lv !== lLast) { lLast = lv; M.setT($('#lB'), String(1 << lv)); $('#lN').innerHTML = `snacks added: <span class="x">${lv}</span>`; $('#lF').innerHTML = K(LF[lv]); M.setT($('#lAdd'), lv ? `Added: ${SNN[lv - 1]}` : 'Start: no snacks'); }
    M.vis($('#lN'), t, tLv[0] - 0.1, 1e9, { dy: 10 }); M.vis($('#lB'), t, tLv[0], 1e9, { dy: 14 }); M.vis($('#lBl'), t, tLv[0] + 0.1, 1e9, { dy: 10 });
    const pb = Math.max(...tLv.map(tt => M.io((t - tt) / 0.15) * (1 - M.io((t - tt - 0.35) / 0.3)))); $('#lB').style.transform = `scale(${(1 + 0.12 * pb).toFixed(3)})`; $('#lB').style.transformOrigin = '0 50%';
    PUC.write($('#lF'), t, tLv[0], 0.4); M.vis($('#lAdd'), t, tLv[0] + 0.2, 1e9, POP);
  }

  /* D: why 2^n + switches */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.2, 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 124]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, T0('D5') - 0.1, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    PUC.write($('#dRes'), t, wt('D5', 'has') - 0.1, 1.0);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    SN.forEach((_, j) => M.vis($('#sr' + j), t, tD1 + 0.5 + j * 0.1, 1e9, { dy: 12 }));
    const k = kAt(t);
    if (k !== dLast) { dLast = k; const e = sub(3, k);
      SN.forEach((_, j) => { const on = (k >> (2 - j)) & 1, [bo, bi] = $('#sr' + j).querySelectorAll('.sw');
        bo.style.background = on ? '#fff' : C.ink; bo.style.color = on ? C.dim : '#fff'; bo.style.borderColor = on ? C.line : C.ink;
        bi.style.background = on ? XC : '#fff'; bi.style.color = on ? '#fff' : C.dim; bi.style.borderColor = on ? XC : C.line; });
      $('#dCur').innerHTML = K(`\\text{box: }\\ ${e.length ? `\\{${xc(e.join(', '))}\\}` : PHI}`); M.setT($('#dCnt'), `box ${k + 1} of 8`); }
    M.vis($('#dCur'), t, tCyc - 0.1, 1e9, { dy: 10 }); M.vis($('#dCnt'), t, tCyc, 1e9, POP);
  }

  /* K: A vs P(A) + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kaF'), t, tK1 + 0.3, 0.7); M.vis(kA, t, tK1 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    kAt3.forEach((g, j) => M.vis(g, t, wt('K1', SNN[j]) - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }));
    M.vis($('#kaP'), t, wt('K1', 'laddoo') + 0.3, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kb1'), t, wt('K2', 'eight') - 0.1, 0.9); PUC.write($('#kb2'), t, wt('K2', 'pairs') - 0.2, 0.9);
    kBx.forEach((g, i) => M.vis(g, t, tKb(i) - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    M.vis($('#kbP'), t, wt('K2', 'set') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'empty') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'one') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'power') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'A') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    COLS.forEach((_, i) => M.vis($('#col' + i), t, T0('W2') + 0.5 + i * 0.12, 1e9, { dy: 14 }));
    M.vis($('#bx00'), t, tWs[0] + 0.5, 1e9, POP); M.vis($('#bx10'), t, tWs[1] + 0.6, 1e9, POP); M.vis($('#bx11'), t, tWs[1] + 1.2, 1e9, POP); M.vis($('#bx20'), t, tWs[2] + 0.6, 1e9, POP);
    M.vis($('#wRes'), t, tWs[4] - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Both') - 0.1, tRight: wt('X3', 'Always') - 0.3 });
    tB.forEach((b, i) => { M.vis(b.g, t, b.miss ? wt('X2', 'empty') + (i ? 0.6 : 0) : wt('X2', 'Many') + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      if (b.miss) { const g = M.io((t - wt('X3', 'Both')) / 0.3); attr(b.r, 'stroke', mix(C.red, C.ok, g)); attr(b.r, 'stroke-dasharray', g > 0.5 ? '' : '7 6'); attr(b.r, 'fill', mix(C.redBg, C.okBg, g)); attr(b.tt, 'fill', mix(C.red, C.ok, g)); } });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nxs(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
