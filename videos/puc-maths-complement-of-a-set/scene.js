// PUC Maths Ep 09: Complement of a set (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element x violet, rule coral (accent), set A blue, set B teal, U ink outline, not-in red; the complement region = coral tint
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', BC = '#0E8F8F', ACB = '#E7EEFD', HIT = '#FBDCD2';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const tx = s => `\\text{${s}}`;
const AP = ac("A'"), UU = 'U';
const LT = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'middle' };

Object.assign(M.IC, {
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  walk: ['M13 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M10 21l2-6 3 3v3', 'M7 11l3-3h3l2 4 3 1', 'M12 15l-1-6'],
});

/* ---------- picture helpers: U rectangle with circle A, complement = rect minus circle ---------- */
const circ = (x, y, r) => `M${x - r},${y} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
const rectP = (x, y, w, h, q = 16) => `M${x + q},${y} H${x + w - q} Q${x + w},${y} ${x + w},${y + q} V${y + h - q} Q${x + w},${y + h} ${x + w - q},${y + h} H${x + q} Q${x},${y + h} ${x},${y + h - q} V${y + q} Q${x},${y} ${x + q},${y} Z`;
const uPic = (svg, o) => {
  const g = mk(svg, 'g', {});
  const out = mk(g, 'path', { d: rectP(o.x, o.y, o.w, o.h) + ' ' + circ(o.cx, o.cy, o.r), 'fill-rule': 'evenodd', fill: '#FFFFFF' });
  const inn = mk(g, 'circle', { cx: o.cx, cy: o.cy, r: o.r, fill: '#FFFFFF' });
  const rect = mk(g, 'path', { d: rectP(o.x, o.y, o.w, o.h), fill: 'none', stroke: C.ink, 'stroke-width': 3 });
  const cA = mk(g, 'circle', { cx: o.cx, cy: o.cy, r: o.r, fill: 'none', stroke: AC, 'stroke-width': 3.5 });
  const lU = txt(g, o.x + 30, o.y + 42, 'U', { ...LT, 'font-size': o.ls || 36, fill: C.ink });
  const lA = txt(g, o.cx - o.r * 0.82, o.cy - o.r * 0.78, 'A', { ...LT, 'font-size': o.ls || 40, fill: AC });
  return { g, out, inn, rect, cA, lU, lA };
};
const tok = (svg, s, x, y, o = {}) => {
  const pg = mk(svg, 'g', { transform: `translate(${x},${y})` }), g = mk(pg, 'g', {});
  const ring = mk(g, 'circle', { r: o.rr || 40, fill: 'none', stroke: RC, 'stroke-width': 3, opacity: 0 });
  const t = txt(g, 0, 8, s, { 'text-anchor': 'middle', 'font-family': o.mono ? 'IBM Plex Mono' : 'Poppins', 'font-size': o.fs || 24, 'font-weight': 600, fill: o.col || XC });
  return { pg, g, ring, t, x, y, move(nx, ny) { attr(pg, 'transform', `translate(${nx.toFixed(1)},${ny.toFixed(1)})`); } };
};
const pulse = (t, a, d = 0.6) => { const u = (t - a) / d; return u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * u); };
const fly = (k, t, t0, x2, y2, dur = 0.6) => { const u = M.io((t - t0) / dur); k.move(M.lerp(k.x, x2, u), M.lerp(k.y, y2, u) - 46 * Math.sin(Math.PI * u)); return u; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tU1 = T0('U1'), tV1 = T0('V1'), tS1 = T0('S1'), tT = T0('T1'), tL1 = T0('L1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tL1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['IN THE CLASS · DID NOT RIDE', 'a handful of names'], ['IN THE COLLEGE · DID NOT RIDE', 'hundreds of names']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${424 + i * 552}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'class') - 0.05, wt('H1', 'college', 1) - 0.05];

/* ---------- H: seven friends ---------- */
const FR = ['Aarav', 'Diya', 'Kiran', 'Joel', 'Meera', 'Ravi', 'Sana'], RIDE = { Aarav: 1, Kiran: 1, Ravi: 1 };
$('#hcs').innerHTML = FR.map((n, i) => `<div class="fn" id="hf${i}" style="left:${36 + (i % 3) * 236}px;top:${84 + Math.floor(i / 3) * 100}px"><i>${M.icon(RIDE[n] ? 'bike' : 'walk', 30, RIDE[n] ? AC : C.mute, 2.2)}</i><b>${n}</b></div>`).join('');
const tHr = wt('H4', 'three');

/* ---------- C: universal set + complement + live test ---------- */
$('#cu0 .s').innerHTML = K('U ='); $('#cu1 .s').innerHTML = K(`${ac('A')} =`);
$('#cu0 .w').style.left = '110px'; $('#cu1 .w').style.left = '110px';
$('#cdS').innerHTML = K(AP);
$('#cdF').innerHTML = K(`${AP} = \\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in U\\ ${tx('and')}\\ ${xc('x')} ${red('\\notin')} ${ac('A')}`)} \\,\\}`);
const cs = $('#cS'), cP = uPic(cs, { x: 36, y: 76, w: 712, h: 440, cx: 226, cy: 326, r: 130 });
const QX = i => 132 + i * 94, QY = 132;
const CIN = { Aarav: [226, 270], Kiran: [226, 328], Ravi: [226, 386] }, COUT = { Diya: [500, 262], Joel: [650, 262], Meera: [500, 380], Sana: [650, 380] };
const cT = FR.map((n, i) => ({ n, k: tok(cs, n, QX(i), QY, { fs: 22, rr: 44 }), tt: n === 'Joel' || n === 'Meera' || n === 'Ravi' || n === 'Sana' ? wt('C4', n) : wt('C3', n) }));
$('#cRo').innerHTML = K(`${AP} = \\{${xc(tx('Diya, Joel, Meera, Sana'))}\\}`);
const tC5 = wt('C5', 'everything');

/* ---------- V: grow U ---------- */
const vX = n => 60 + ((n - 1) % 10) * 68, vY = n => 210 + (n > 10 ? 92 : 0);
$('#vts').innerHTML = Array.from({ length: 20 }, (_, i) => i + 1).map(n => `<div class="vt" id="vt${n}" style="left:${vX(n)}px;top:${vY(n)}px">${n}</div>`).join('');
const isA = n => n <= 10 && n % 2 === 0;
const vU = $('#vU'); vU.style.left = '44px'; vU.style.top = '194px'; vU.style.width = '700px';
const vUl = $('#vUl'); vUl.style.left = '50px'; vUl.style.top = '146px';
$('#vLg').innerHTML = `<span style="color:${AC}">blue: in A</span>&nbsp;·&nbsp;<span style="color:${RC}">coral: in A′</span>`;
$('#vA').innerHTML = K(`${ac('A')} = \\{${xc('2, 4, 6, 8, 10')}\\}`);
$('#vC1').innerHTML = K(`${AP} = \\{${xc('1, 3, 5, 7, 9')}\\}`);
$('#vC2').innerHTML = K(`${AP} = \\{${xc('1, 3, 5, 7, 9, 11, 12, 13, \\dots, 20')}\\}`);
const tVk0 = wt('V4', 'grow'), tVk1 = Math.max(tVk0 + 1.2, T1('V4') - 0.2);
const vk = t => 10 + 10 * M.io((t - tVk0) / (tVk1 - tVk0));
const tVin = wt('V2', 'First'), tVc = wt('V3', 'five');

/* ---------- S: A' = U - A vs B - A ---------- */
const sa = $('#saS'), sP = uPic(sa, { x: 56, y: 76, w: 672, h: 360, cx: 236, cy: 256, r: 120, ls: 34 });
const SAIN = { 2: [196, 222], 4: [276, 222], 6: [236, 262], 8: [196, 302], 10: [276, 302] }, SAOUT = { 1: [430, 200], 3: [520, 200], 5: [610, 200], 7: [475, 300], 9: [565, 300] };
const saT = {}; [...Object.entries(SAIN), ...Object.entries(SAOUT)].forEach(([n, [x, y]]) => { saT[n] = tok(sa, n, x, y, { mono: 1, fs: 28, rr: 24 }); });
$('#saR').innerHTML = K(`${AP} = U - ${ac('A')} = \\{${xc('1, 3, 5, 7, 9')}\\}`);
const sb = $('#sbS'), SBY = 256, SBR = 130, SBX = [296, 480];
const sbV = (() => { const d = SBX[1] - SBX[0], mx = (SBX[0] + SBX[1]) / 2, h = Math.sqrt(SBR * SBR - d * d / 4), T = `${mx},${SBY - h}`, B = `${mx},${SBY + h}`;
  const bOnly = mk(sb, 'path', { d: `M${T} A${SBR},${SBR} 0 1 0 ${B} A${SBR},${SBR} 0 0 1 ${T} Z`, fill: '#FFFFFF' });
  const cB = mk(sb, 'circle', { cx: SBX[0], cy: SBY, r: SBR, fill: 'none', stroke: BC, 'stroke-width': 3.5 }), cA = mk(sb, 'circle', { cx: SBX[1], cy: SBY, r: SBR, fill: 'none', stroke: AC, 'stroke-width': 3.5 });
  const lB = txt(sb, SBX[0] - SBR * 0.82, SBY - SBR * 0.78, 'B', { ...LT, 'font-size': 40, fill: BC }), lA = txt(sb, SBX[1] + SBR * 0.82, SBY - SBR * 0.78, 'A', { ...LT, 'font-size': 40, fill: AC });
  return { bOnly, cB, cA, lB, lA }; })();
const SBP = { 1: [226, 214], 3: [226, 262], 5: [226, 310], 2: [388, 214], 4: [388, 262], 6: [388, 310], 8: [560, 236], 10: [560, 290] };
const sbT = {}; Object.entries(SBP).forEach(([n, [x, y]]) => { sbT[n] = tok(sb, n, x, y, { mono: 1, fs: 28, rr: 24 }); });
$('#sbR').innerHTML = K(`${bc('B')} - ${ac('A')} = \\{${xc('1, 3, 5')}\\}`);
const sbNote = txt(sb, 392, 440, 'B = {1, 2, 3, 4, 5, 6}', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: 'U = {1, 2, ..., 10} and A = {1, 2, 3}. How many elements does A′ have?', opts: ['3', '7'], right: 1, why: 'A′ = {4, 5, ..., 10}: 10 elements in U, take away the 3 in A, leaves 7.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${AP} = U - ${ac('A')}`);

/* ---------- L: four laws ---------- */
const lsv = $('#lS'), lP = uPic(lsv, { x: 56, y: 76, w: 672, h: 380, cx: 300, cy: 266, r: 130 });
const lOutT = txt(lsv, 590, 270, "A′", { ...LT, 'font-size': 40, fill: RC });
const lRing = mk(lsv, 'circle', { cx: 300, cy: 266, r: 130, fill: 'none', stroke: C.red, 'stroke-width': 7, opacity: 0 });
const LST = [[`${ac('A')} \\cup ${AP} = U`, 'every element is inside A, or outside it'], [`${ac('A')} \\cap ${AP} = \\phi`, 'nothing is inside and outside at once'], [`(${AP})' = ${ac('A')}`, 'the outside of the outside is inside'], [`U' = \\phi \\qquad \\phi' = U`, 'nothing in U lies outside U']];
$('#lSt').innerHTML = `<div class="hiBox" id="lHi" style="left:20px;width:744px;height:118px"></div>` + LST.map(([f, w], i) => `<div class="st" id="lst${i}" style="top:${82 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tLs2 = [T0('L2'), T0('L3'), T0('L4'), T0('L5')];
const LTAG = [`${K(`${ac('A')} \\cup ${AP}`)}&nbsp;fills the whole rectangle`, `${K(`${ac('A')} \\cap ${AP}`)}&nbsp;is empty: no overlap`, `${K(`(${AP})'`)}&nbsp;is back inside: ${K(ac('A'))}`, `Nothing lies outside ${K('U')}`];
const th2 = PUC.think($('#th2'), { q: "In Aarav's group, who is in the complement of A′?", opts: ['The friends who did not ride', 'The riders'], right: 1, why: "(A′)′ = A = {Aarav, Kiran, Ravi}. Taking the complement twice brings you back." });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`U = \\{1, 2, 3, \\dots, 10\\}`)}, ${K(`${ac('A')} = \\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in U,\\ ${xc('x')}\\ \\text{prime}`)} \\,\\}`)}<br>Find ${K(AP)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`U = \\{1, 2, 3, \\dots, 10\\}`)],
  [K(`${ac('A')} = \\{${xc('2, 3, 5, 7')}\\}`)],
  [K(`${AP} = \\{${xc('1, 4, 6, 8, 9, 10')}\\}`)],
  [K(`n(${ac('A')}) + n(${AP}) = 4 + 6 = 10 = n(U)`)],
  [K(`1\\ \\text{is not prime} \\;\\Rightarrow\\; ${xc('1')} \\in ${AP}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'U'), wt('W4', 'primes'), wt('W5', 'Remove'), wt('W6', 'Check'), wt('W7', 'notice')];
const ws = $('#wS'), wP = uPic(ws, { x: 36, y: 76, w: 712, h: 396, cx: 250, cy: 300, r: 120 });
const WIN = { 2: [210, 262], 3: [290, 262], 5: [210, 338], 7: [290, 338] }, WOUT = { 1: [480, 250], 4: [570, 250], 6: [660, 250], 8: [480, 350], 9: [570, 350], 10: [660, 350] };
const wT = {}; for (let n = 1; n <= 10; n++) wT[n] = tok(ws, n, 110 + (n - 1) * 62, 132, { mono: 1, fs: 28, rr: 24 });
const W3w = ['one', 'two', 'three'], tWp = { 2: wt('W4', 'two'), 3: wt('W4', 'three'), 5: wt('W4', 'five'), 7: wt('W4', 'seven') };

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${ac('A')} = \\{1, 2, 3\\} \\Rightarrow ${AP} = \\{4, 5, 6, \\dots\\}`) + '&nbsp; no U given', right: K(`U = \\{1, \\dots, 5\\} \\Rightarrow ${AP} = \\{4, 5\\}`) + '&nbsp; complement inside U' });
const ts = $('#tS'), tP = uPic(ts, { x: 30, y: 52, w: 500, h: 190, cx: 170, cy: 152, r: 76, ls: 28 });
const tTk = [[1, 140, 128], [2, 200, 128], [3, 170, 180], [4, 340, 152], [5, 430, 152]].map(([n, x, y]) => tok(ts, n, x, y, { mono: 1, fs: 28, rr: 22 }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find A′ for a given U, often mixed with intervals and integers.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`U = \\{1, 2, 3, \\dots, 100\\}`)}<br>${K(`${ac('A')} = \\{\\, n \\in U : n \\text{ is a perfect square or a perfect cube} \\,\\}`)}<br>How many elements does ${K(AP)} have?`,
  opts: ['88', '86', '90', '12'], right: 0, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`\\text{squares}: 1, 4, \\dots, 100 \\Rightarrow 10`)], [K(`\\text{cubes}: 1, 8, 27, 64`)], ['1 and 64 are already squares'], [K(`n(${ac('A')}) = 10 + 2 = 12`)], [K(`n(${AP}) = 100 - 12 = 88`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'squares'), wt('A3', 'cubes'), wt('A3', 'already'), wt('A4', 'twelve'), wt('A4', 'eighty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · complement of a set', y0: 98, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${AP} = \\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in U\\ ${tx('and')}\\ ${xc('x')} ${red('\\notin')} ${ac('A')}`)} \\,\\} = U - ${ac('A')}`),
    K(`${ac('A')} \\cup ${AP} = U \\qquad ${ac('A')} \\cap ${AP} = \\phi`),
    K(`(${AP})' = ${ac('A')}`),
    K(`U' = \\phi \\qquad \\phi' = U`),
    `${K(AP)} always depends on ${K('U')}: state U first`] });
const YQ = ['What is A ∪ A′?', 'If U = {1, 2, 3, 4, 5, 6} and A = {2, 4}, what is A′?', 'Why must you know U before you find a complement?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 10', topic: 'Biology, Maths or both? Sorting classmates with Venn Diagrams', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('C3') - 0.2, 1.06, 1300, 560], [T0('C6'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tU1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('U1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    FR.forEach((n, i) => { const el = $('#hf' + i); M.vis(el, t, tMorph + 0.3 + i * 0.08, 1e9, { dy: 14 });
      const r = M.io((t - tHr - (RIDE[n] ? 0 : 0.5)) / 0.3); el.style.background = RIDE[n] ? mix(C.soft, ACB, r) : mix(C.soft, '#FFFFFF', r); el.style.borderColor = RIDE[n] ? mix(C.soft, AC, r) : mix(C.soft, RC, M.io((t - wt('H4', 'not')) / 0.3)); });
    M.vis($('#hlP'), t, wt('H4', 'not') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'riders') - 0.1, 1e9, POP);
  }

  /* C: complement + test */
  const cOn = t >= tU1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#cd'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cu0'), t, wt('U1', 'call') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#cu1'), t, wt('U2', 'A') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.rise($('#cdT'), t, T0('C1') + 0.05, { st: 0.05, sp: M.HEAVY });
    PUC.write($('#cdS'), t, wt('C1', 'dash') - 0.1, 0.5); M.vis($('#cdL'), t, wt('C1', 'read') - 0.1, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#cdF'), t, wt('C6', 'set', 1) - 0.1, 1.2);
    M.vis($('#cv'), t, wt('U1', 'universal') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(cP.rect, t, wt('U1', 'universal'), 0.9); M.vis(cP.lU, t, wt('U1', 'call'), 1e9, POP);
    M.draw(cP.cA, t, wt('U2', 'A'), 0.7); M.vis(cP.lA, t, wt('U2', 'A') + 0.2, 1e9, POP);
    let n = 0;
    cT.forEach((c, i) => {
      M.vis(c.k.g, t, wt('U2', 'seven') + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const [x2, y2] = RIDE[c.n] ? CIN[c.n] : COUT[c.n], u = fly(c.k, t, c.tt + 0.15, x2, y2);
      if (!RIDE[c.n] && u >= 1) n++;
      attr(c.k.ring, 'opacity', pulse(t, c.tt - 0.1, 0.8).toFixed(3));
      attr(c.k.t, 'fill', RIDE[c.n] && t < tC5 ? mix(XC, AC, M.io((t - c.tt - 0.6) / 0.3)) : XC);
    });
    M.vis($('#cCnt'), t, T0('C2'), 1e9, POP); M.setT($('#cCnt'), `n(A′) = ${n}`);
    attr(cP.out, 'fill', mix('#FFFFFF', HIT, M.io((t - tC5 + 0.1) / 0.4)));
    PUC.write($('#cRo'), t, wt('C5', 'Diya') - 0.1, 0.9);
  }

  /* V: grow U */
  const vOn = t >= tV1 - 0.1 && t < tS1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('S1');
    M.vis($('#vv'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const k = vk(t), kk = Math.floor(k + 1e-6); M.setT($('#vK'), String(kk));
    M.vis($('#vRd'), t, tVin - 0.2, 1e9, { dy: 14 });
    let n = 0;
    for (let i = 1; i <= 20; i++) {
      const el = $('#vt' + i), inU = i <= kk, tin = i <= 10 ? tVin + (i - 1) * 0.06 : tVk0 + (i - 10) / 10 * (tVk1 - tVk0) - 0.05;
      M.vis(el, t, inU ? tin : null, inU ? 1e9 : -1, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const a = isA(i) ? M.io((t - wt('V2', 'even') - (i / 2 - 1) * 0.12) / 0.3) : 0, c = !isA(i) && inU ? M.io((t - Math.max(tVc, tin + 0.2)) / 0.3) : 0;
      el.style.borderColor = isA(i) ? mix(C.line, AC, a) : mix(C.line, RC, c); el.style.color = isA(i) ? mix(C.ink, AC, a) : mix(C.ink, XC, c);
      el.style.background = isA(i) ? mix('#FFFFFF', ACB, a) : mix('#FFFFFF', HIT, c);
      if (c >= 1) n++;
    }
    const h2 = M.io((t - tVk0) / 0.5); vU.style.height = (88 + 92 * h2).toFixed(1) + 'px';
    M.vis(vU, t, tVin - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(vUl, t, tVin, 1e9, POP);
    M.vis($('#vCnt'), t, tVc - 0.1, 1e9, POP); M.setT($('#vCnt'), `n(A′) = ${n}`);
    M.vis($('#vLg'), t, tVc + 0.3, 1e9, POP);
    M.vis($('#vr'), t, wt('V2', 'even') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#vr0 .lb'), t, wt('V2', 'even'), 1e9, { dy: 10 }); PUC.write($('#vA'), t, wt('V2', 'two') - 0.05, 0.8);
    M.vis($('#vr1 .lb'), t, tVin, 1e9, { dy: 10 }); PUC.write($('#vC1'), t, tVc - 0.05, 0.8);
    M.vis($('#vr2 .lb'), t, tVk0, 1e9, { dy: 10 }); PUC.write($('#vC2'), t, wt('V5', 'fifteen') - 0.2, 1.0);
    M.vis($('#vP'), t, wt('V5', 'depends') - 0.1, 1e9, POP);
  }

  /* S: A' = U - A vs B - A + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sa'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    attr(sP.out, 'fill', mix('#FFFFFF', HIT, M.io((t - wt('S1', 'remove') + 0.1) / 0.4)));
    Object.keys(saT).forEach(n => attr(saT[n].t, 'fill', SAIN[n] ? AC : XC));
    PUC.write($('#saR'), t, wt('S1', 'remove'), 0.8);
    M.vis($('#sb'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(sbNote, t, wt('S2', 'numbers') - 0.1, 1e9, { dy: 0 });
    attr(sbV.bOnly, 'fill', mix('#FFFFFF', HIT, M.io((t - wt('S2', 'just') + 0.1) / 0.4)));
    [2, 4, 6, 8, 10].forEach(n => attr(sbT[n].t, 'fill', AC));
    PUC.write($('#sbR'), t, wt('S2', 'just'), 0.7);
    M.vis($('#th1'), t, T0('S3') + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: T0('S3'), tOpts: wt('S3', 'How') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'numbers') });
  }

  /* statement */
  const stOn = t >= tT && t < tL1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tL1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'complement') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'not') + 0.2, 0.8);
  }

  /* L: four laws */
  const lOn = t >= tL1 - 0.1 && t < tW1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L6');
    M.vis($('#lv'), t, tL1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const s1 = M.io((t - tLs2[0] - 0.4) / 0.4), s3a = M.io((t - wt('L4', 'twice')) / 0.4), s3b = M.io((t - wt('L4', 'back')) / 0.4), s4 = M.io((t - tLs2[3]) / 0.4);
    let fin = mix('#FFFFFF', ACB, s1), fout = mix('#FFFFFF', HIT, s1);
    if (s3a > 0) { fin = mix(fin, '#FFFFFF', s3a); fout = mix(fout, HIT, s3a); }
    if (s3b > 0) { fin = mix(fin, HIT, s3b); fout = mix(fout, '#FFFFFF', s3b); }
    if (s4 > 0) { fin = mix(fin, '#FFFFFF', s4); fout = mix(fout, '#FFFFFF', s4); }
    attr(lP.inn, 'fill', fin); attr(lP.out, 'fill', fout);
    attr(lRing, 'opacity', (0.9 * pulse(t, tLs2[1] + 0.6, 2.2)).toFixed(3));
    attr(lP.rect, 'stroke', mix(C.ink, RC, pulse(t, tLs2[3] + 0.3, 2.4)));
    attr(lP.rect, 'stroke-width', (3 + 3 * pulse(t, tLs2[3] + 0.3, 2.4)).toFixed(2));
    M.vis(lOutT, t, tLs2[0] + 0.5, tLs2[3], { dy: 0 });
    const cur = tLs2.reduce((a, tt, i) => t >= tt ? i : a, 0); const tg = $('#lTag');
    if (tg._c !== cur) { tg._c = cur; tg.innerHTML = LTAG[cur]; }
    M.vis(tg, t, tLs2[0] + 0.3, 1e9, POP);
    M.vis($('#lp'), t, tL1 + 0.5, out, { dx: 60, dy: 0, ...o });
    LST.forEach((_, i) => { const el = $('#lst' + i), tt = wt(['L2', 'L3', 'L4', 'L5'][i], 'So') ; M.vis(el.querySelector('.n'), t, tLs2[i] - 0.1, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tt - 0.1, 0.8); M.vis(el.querySelector('.why'), t, tLs2[i] + 0.3, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(82, [[tLs2[1] - 0.1, 202], [tLs2[2] - 0.1, 322], [tLs2[3] - 0.1, 442]], M.SOFT)(t);
    const hb = $('#lHi'); M.vis(hb, t, tLs2[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#th2'), t, T0('L6') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('L6'), tOpts: wt('L6', 'who') - 0.1, tCount: T1('L6') + 0.05, dur: 3, tAns: T0('L7') - 0.02, tWhy: wt('L7', 'Aarav') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wP.rect, t, T0('W2') + 0.5, 0.8); M.vis(wP.lU, t, T0('W2') + 0.8, 1e9, POP);
    M.draw(wP.cA, t, wt('W2', 'A') , 0.7); M.vis(wP.lA, t, wt('W2', 'A') + 0.2, 1e9, POP);
    for (let n = 1; n <= 10; n++) {
      const k = wT[n]; M.vis(k.g, t, tW[0] + 0.2 + (n - 1) * 0.08, 1e9, POP);
      const p = WIN[n], dest = p || WOUT[n], t0 = p ? tWp[n] : tW[2] + 0.3 + [1, 4, 6, 8, 9, 10].indexOf(n) * 0.15;
      fly(k, t, t0, dest[0], dest[1]);
      attr(k.t, 'fill', p ? mix(XC, AC, M.io((t - t0 - 0.5) / 0.3)) : XC);
      attr(k.ring, 'opacity', n === 1 ? M.io((t - tW[4]) / 0.3).toFixed(3) : 0);
    }
    attr(wP.out, 'fill', mix('#FFFFFF', HIT, M.io((t - wt('W5', 'one') + 0.1) / 0.4)));
    M.vis($('#wP'), t, tW[4] + 0.2, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'If') });
    M.draw(tP.cA, t, T0('X2') + 0.1, 0.6); M.vis(tP.lA, t, T0('X2') + 0.3, 1e9, POP);
    [0, 1, 2].forEach(i => M.vis(tTk[i].g, t, T0('X2') + 0.3 + i * 0.1, 1e9, POP));
    M.draw(tP.rect, t, wt('X3', 'If') - 0.1, 0.6); M.vis(tP.lU, t, wt('X3', 'If') + 0.2, 1e9, POP);
    [3, 4].forEach(i => M.vis(tTk[i].g, t, wt('X3', 'just') - 0.1 + (i - 3) * 0.1, 1e9, POP));
    attr(tP.out, 'fill', mix('#FFFFFF', HIT, M.io((t - wt('X3', 'just')) / 0.4)));
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'find') });
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
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
