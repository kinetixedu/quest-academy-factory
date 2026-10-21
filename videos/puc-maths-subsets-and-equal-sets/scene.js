// PUC Maths Ep 05: Subsets and equal sets (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element violet, set A blue, set B teal, not-in red, rule coral
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const PHI = '\\phi';

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tS1 = T0('S1'), tV1 = T0('V1'), tE1 = T0('E1'), tZ1 = T0('Z1'), tK1 = T0('K1'), tK4 = T0('K4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H: nested picture ---------- */
const hs = $('#hS');
const hB = mk(hs, 'ellipse', { cx: 392, cy: 290, rx: 340, ry: 186, fill: BCB, stroke: BC, 'stroke-width': 3.5 });
const hA = mk(hs, 'ellipse', { cx: 330, cy: 300, rx: 220, ry: 128, fill: ACB, stroke: AC, 'stroke-width': 3.5 });
const hBL = txt(hs, 620, 190, 'PUC', { 'text-anchor': 'middle', 'font-size': 22, fill: BC, 'font-weight': 600, 'letter-spacing': 2 });
const hAL = txt(hs, 330, 206, 'NEET', { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600, 'letter-spacing': 2 });
const hEl = [['Physics', 250, 268], ['Chemistry', 410, 268], ['Biology', 330, 346], ['Maths', 640, 300]].map(([s, x, y], i) => txt(hs, x, y, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 28, fill: i === 3 ? BC : AC, 'font-weight': 600 }));

/* ---------- S: definition + live check ---------- */
$('#sy1').innerHTML = K(`${ac('A')} \\subset ${bc('B')}`);
$('#sy2').innerHTML = K(`${ac('A')} \\not\\subset ${bc('B')}`);
const cs = $('#cS'), AX = 170, BX = 610, RY = i => 156 + i * 84;
const pill = (x, y, s, col, bg) => { const g = mk(mk(cs, 'g', { transform: `translate(${x},${y})` }), 'g', {}); const r = mk(g, 'rect', { x: -110, y: -28, width: 220, height: 56, rx: 12, fill: bg, stroke: col, 'stroke-width': 2.5 }); txt(g, 0, 9, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: col }); return { g, r }; };
const cAL = txt(cs, AX, 110, 'NEET', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600, 'letter-spacing': 2 });
const cBL = txt(cs, BX, 110, 'PUC', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600, 'letter-spacing': 2 });
const NEET = ['Physics', 'Chemistry', 'Biology'], PUCS = ['Physics', 'Chemistry', 'Maths', 'Biology'];
const cA = NEET.map((s, i) => pill(AX, RY(i), s, AC, ACB)), cB = PUCS.map((s, i) => pill(BX, RY(i), s, BC, BCB));
const fw = NEET.map((s, i) => { const a = PUC.arrow(cs, C.ok, 4, 14); a.set(AX + 116, RY(i), BX - 116, RY(PUCS.indexOf(s))); const k = txt(cs, (AX + BX) / 2, (RY(i) + RY(PUCS.indexOf(s))) / 2 - 10, '✓', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, fill: C.ok, 'font-weight': 700 }); return { a, k }; });
const bw = [0, 1, 2].map(i => { const s = PUCS[i], j = NEET.indexOf(s), a = PUC.arrow(cs, j < 0 ? C.red : C.ok, 4, 14); a.set(BX - 116, RY(i), j < 0 ? AX + 150 : AX + 116, j < 0 ? RY(i) + 20 : RY(j)); const k = txt(cs, (AX + BX) / 2, (RY(i) + (j < 0 ? RY(i) + 20 : RY(j))) / 2 - 10, j < 0 ? '✕' : '✓', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, fill: j < 0 ? C.red : C.ok, 'font-weight': 700 }); return { a, k }; });
const tFw = [wt('S5', 'Physics'), wt('S5', 'Chemistry'), wt('S5', 'Biology')], tBw = [wt('S6', 'Physics'), wt('S6', 'Chemistry'), wt('S6', 'Maths')];
$('#ckP1').textContent = 'NEET ⊂ PUC'; $('#ckP2').textContent = 'PUC ⊄ NEET';

/* ---------- V: two facts ---------- */
const VS = [[K(`${ac('A')} \\subset ${ac('A')}`), 'every set is a subset of itself'], [K(`${PHI} \\subset ${ac('A')}`), 'the empty set is a subset of every set']];
$('#vSt').innerHTML = VS.map(([f, w], i) => `<div class="st" id="vs${i}" style="top:${92 + i * 140}px"><div class="n">${i + 1}</div><div class="sx">${f}</div><div class="why">${w}</div></div>`).join('');
const tVs = [wt('V2', 'First'), wt('V3', 'Second')];
const vs = $('#vS');
const vA = mk(vs, 'circle', { cx: 300, cy: 300, r: 160, fill: ACB, stroke: AC, 'stroke-width': 3.5 });
const vAL = txt(vs, 300, 120, 'A', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 40, 'font-weight': 700, fill: AC });
const vCpP = mk(vs, 'g', {}), vCp = mk(vCpP, 'g', {}); mk(vCp, 'circle', { cx: 0, cy: 0, r: 160, fill: 'none', stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const vEl = [[250, 250], [350, 260], [270, 350], [360, 360]].map(([x, y]) => mk(vs, 'circle', { cx: x, cy: y, r: 13, fill: XC }));
const vPhiP = mk(vs, 'g', {}), vPhi = mk(vPhiP, 'g', {}); mk(vPhi, 'circle', { r: 34, fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); txt(vPhi, 0, 11, 'φ', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 32, fill: C.ink, 'font-weight': 600 });
const vCap = txt(vs, 392, 520, '', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });

/* ---------- E: equal sets ---------- */
$('#eqF').innerHTML = K(`${ac('A')} = ${bc('B')} \\iff ${ac('A')} \\subset ${bc('B')}\\ \\text{and}\\ ${bc('B')} \\subset ${ac('A')}`);
$('#prF').innerHTML = K(`${ac('A')} \\subset ${bc('B')},\\ ${ac('A')} \\ne ${bc('B')}:\\ \\text{NEET} \\subset \\text{PUC}`);
const W1 = 'ALLOY'.split(''), W2 = 'LOYAL'.split('');
$('#eW').innerHTML = `<div class="wl" style="top:86px">ALLOY</div><div class="wl" style="top:206px">LOYAL</div>` +
  W1.map((c, i) => `<div class="lt" id="ea${i}" style="left:${36 + i * 70}px;top:112px">${c}</div>`).join('') + W2.map((c, i) => `<div class="lt" id="eb${i}" style="left:${36 + i * 70}px;top:232px">${c}</div>`).join('') +
  `<div class="eqs" id="eA" style="top:116px">${K(`= \\{${ac('A, L, O, Y')}\\}`)}</div><div class="eqs" id="eB" style="top:236px">${K(`= \\{${bc('L, O, Y, A')}\\}`)}</div>`;
$('#eChk').innerHTML = K(`${ac('X')} \\subset ${bc('Y')}\\ \\checkmark \\qquad ${bc('Y')} \\subset ${ac('X')}\\ \\checkmark`);
const DUPA = [2], DUPB = [4];

/* ---------- Z: number sets ---------- */
const zs = $('#zS');
const ZR = [['R', 392, 322, 352, 228, '#F3F4F7', C.ink], ['Q', 300, 322, 240, 180, '#FCE6DF', C.ac], ['Z', 262, 322, 172, 130, BCB, BC], ['N', 236, 322, 96, 76, ACB, AC]];
const zE = ZR.map(([n, cx, cy, rx, ry, f, s]) => ({ e: mk(zs, 'ellipse', { cx, cy, rx, ry, fill: f, stroke: s, 'stroke-width': 3.5 }) }));
ZR.forEach(([n, cx, cy, rx, ry, f, s], k) => { zE[k].l = txt(zs, cx, k === 3 ? cy + 12 : [124, 172, 220][k], n, { 'text-anchor': 'middle', 'font-family': 'KaTeX_AMS, Poppins', 'font-size': 34, 'font-weight': 700, fill: s }); });
const zT = mk(zs, 'ellipse', { cx: 640, cy: 322, rx: 72, ry: 110, fill: '#FFF4D6', stroke: C.gold, 'stroke-width': 3.5 });
const zTL = txt(zs, 640, 272, 'T', { 'text-anchor': 'middle', 'font-family': 'KaTeX_AMS, Poppins', 'font-size': 34, 'font-weight': 700, fill: C.gold });
const zTx = [['√2', 640, 322], ['π', 640, 372]].map(([s, x, y]) => txt(zs, x, y, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, fill: C.gold, 'font-weight': 600 }));
$('#zc0').innerHTML = K(`\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}`);
$('#zc1').innerHTML = K(`\\mathbb{T} \\subset \\mathbb{R}`);
$('#zc2').innerHTML = K(`\\mathbb{N} \\not\\subset \\mathbb{T}`);
const tZ = [wt('Z2', 0), wt('Z2', 4), wt('Z2', 8), wt('Z2', 11), wt('Z2', 13)];

/* ---------- K: belongs to vs subset ---------- */
$('#kaF').innerHTML = K(`${xc('1')} \\in \\{${xc('1')}, 2, 3\\}`);
$('#kbF').innerHTML = K(`\\{${xc('1')}\\} \\subset \\{${xc('1')}, 2, 3\\}`);
const kBig = (svg) => { const c = mk(svg, 'circle', { cx: 392, cy: 330, r: 130, fill: ACB, stroke: AC, 'stroke-width': 3.5 }); const ts = [[2, 450, 300], [3, 430, 390]].map(([n, x, y]) => { const g = mk(svg, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 26, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.5 }); txt(g, x, y + 9, n, { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink2, 'font-weight': 600 }); return g; }); return { c, ts }; };
const kbA = kBig($('#kaS')), kbB = kBig($('#kbS'));
const k1a = mk(mk($('#kaS'), 'g', { transform: 'translate(330,330)' }), 'g', {}); mk(k1a, 'circle', { r: 30, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(k1a, 0, 10, '1', { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 600 });
const k1b = mk(mk($('#kbS'), 'g', { transform: 'translate(330,330)' }), 'g', {}); mk(k1b, 'circle', { r: 52, fill: '#fff', stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); mk(k1b, 'circle', { r: 26, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(k1b, 0, 9, '1', { 'text-anchor': 'middle', 'font-size': 26, fill: XC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: `Is this correct? ${K(`1 \\subset \\{1, 2, 3\\}`)}`, opts: ['Yes, correct', 'No, wrong symbol'], right: 1, why: `1 is an element: write ${K(`1 \\in \\{1, 2, 3\\}`)}, or ${K(`\\{1\\} \\subset \\{1, 2, 3\\}`)}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ac('A')} \\subset ${bc('B')} \\iff (${xc('a')} \\in ${ac('A')} \\Rightarrow ${xc('a')} \\in ${bc('B')})`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${ac('A')} = \\{1, 3\\},\\ ${bc('B')} = \\{1, 5, 9\\},\\ C = \\{1, 3, 5, 7, 9\\}`)}<br>Put ${K('\\subset')} or ${K('\\not\\subset')} between each pair.`;
const wsol = PUC.solution($('#wl'), [[K(`${PHI} \\subset ${bc('B')}`)], [K(`${red('3')} \\in ${ac('A')},\\ ${red('3')} \\notin ${bc('B')} \\Rightarrow ${ac('A')} \\not\\subset ${bc('B')}`)], [K(`${ac('A')} \\subset C`)], [K(`${bc('B')} \\subset C`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 86 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS');
const wC = mk(ws, 'rect', { x: 50, y: 80, width: 684, height: 420, rx: 120, fill: '#F3F4F7', stroke: C.ink, 'stroke-width': 3.5 });
const wCL = txt(ws, 92, 150, 'C', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 36, 'font-weight': 700, fill: C.ink });
const wA = mk(ws, 'circle', { cx: 300, cy: 290, r: 120, fill: ACB, 'fill-opacity': 0.85, stroke: AC, 'stroke-width': 3.5 });
const wB = mk(ws, 'circle', { cx: 470, cy: 290, r: 130, fill: BCB, 'fill-opacity': 0.75, stroke: BC, 'stroke-width': 3.5 });
const wAL = txt(ws, 230, 196, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32, 'font-weight': 700, fill: AC });
const wBL = txt(ws, 540, 190, 'B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32, 'font-weight': 700, fill: BC });
const WE = [[1, 385, 290], [3, 260, 290], [5, 500, 250], [9, 510, 340], [7, 660, 440]].map(([n, x, y]) => { const g = mk(mk(ws, 'g', { transform: `translate(${x},${y})` }), 'g', {}); const c = mk(g, 'circle', { r: 26, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 9, n, { 'text-anchor': 'middle', 'font-size': 26, fill: XC, 'font-weight': 600 }); return { n, g, c }; });
const tWs = [wt('W3', 'One'), wt('W4', 'Two'), wt('W5', 'Three'), wt('W6', 'Four')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`1 \\subset \\{1, 2, 3\\}`), right: K(`1 \\in \\{1, 2, 3\\}\\quad \\text{or}\\quad \\{1\\} \\subset \\{1, 2, 3\\}`) });
const ts = $('#tS');
const tE = mk(mk(ts, 'g', { transform: 'translate(150,130)' }), 'g', {}); mk(tE, 'circle', { r: 34, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(tE, 0, 11, '1', { 'text-anchor': 'middle', 'font-size': 30, fill: XC, 'font-weight': 600 });
const tEL = txt(ts, 150, 206, 'an element', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const tSet = mk(mk(ts, 'g', { transform: 'translate(400,130)' }), 'g', {}); mk(tSet, 'circle', { r: 58, fill: ACB, stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); mk(tSet, 'circle', { r: 30, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(tSet, 0, 10, '1', { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 600 });
const tSL = txt(ts, 400, 222, 'a set: {1}', { 'text-anchor': 'middle', 'font-size': 18, fill: AC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: `Fill in ${K('\\subset')} or ${K('\\not\\subset')}; which of these sets are equal?` });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 940,
  q: `${K(`${ac('A')} = \\{\\,1,\\ \\{2\\},\\ 3\\,\\}`)}. How many statements are true?<br>${K(`\\text{(i) } 2 \\in ${ac('A')} \\qquad \\text{(ii) } \\{2\\} \\in ${ac('A')} \\qquad \\text{(iii) } \\{2\\} \\subset ${ac('A')}`)}<br>${K(`\\text{(iv) } \\{1, 3\\} \\subset ${ac('A')} \\qquad \\text{(v) } \\{\\{2\\}\\} \\subset ${ac('A')} \\qquad \\text{(vi) } ${PHI} \\subset ${ac('A')}`)}`,
  opts: ['2', '3', '4', '5'], right: 2, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`\\text{(i) } 2 \\notin ${ac('A')}:\\ \\text{false}`)], [K(`\\text{(ii) } \\{2\\} \\in ${ac('A')}:\\ \\text{true}`)], [K(`\\text{(iii) } 2 \\notin ${ac('A')}:\\ \\text{false}`)], [K(`\\text{(iv), (v)}:\\ \\text{true}`)], [K(`\\text{(vi) true} \\Rightarrow 4`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'false'), wt('A3', 'true'), wt('A3', 'false'), wt('A4', 'four'), wt('A5', 'Four')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · subsets and equal sets', y0: 96, dy: 84, txt: [1, 0, 1, 0, 0],
  lines: ['<b>Subset</b>: every element of A is also in B',
    K(`${ac('A')} \\subset ${bc('B')},\\quad ${ac('A')} \\subset ${ac('A')},\\quad ${PHI} \\subset ${ac('A')}`),
    '<b>Equal sets</b>: exactly the same elements',
    K(`${ac('A')} = ${bc('B')} \\iff ${ac('A')} \\subset ${bc('B')}\\ \\text{and}\\ ${bc('B')} \\subset ${ac('A')}`),
    K(`${xc('1')} \\in \\{1, 2, 3\\} \\qquad \\{${xc('1')}\\} \\subset \\{1, 2, 3\\}`)] });
const YQ = [`Is the set of vowels a subset of ${K('\\{a, b, c, d\\}')}?`, 'Are the letters of LISTEN and SILENT equal sets?', 'Why is the empty set a subset of every set?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 06', topic: 'Three snacks, one tiffin box: how many ways to pack it?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tBw[2] - 0.3, 1.05, 960, 560], [wt('S6', 'PUC') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  M.vis($('#ls0'), t, wt('H1', 'NEET') - 0.1, tMorph - 0.15, { dy: 24, outDur: 0.25, ody: 10 });
  M.vis($('#ls1'), t, wt('H2', 'PUC') - 0.1, tMorph - 0.15, { dy: 24, outDur: 0.25, ody: 10 });

  /* H */
  const hOn = t >= tMorph && t < tS1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('S1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hB, t, tMorph + 0.3, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }); M.vis(hBL, t, tMorph + 0.5, 1e9, { dy: 0 });
    M.vis(hA, t, wt('H4', 'Every') - 0.1, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }); M.vis(hAL, t, wt('H4', 'Every'), 1e9, { dy: 0 });
    hEl.forEach((e, i) => M.vis(e, t, i < 3 ? tMorph + 0.5 + i * 0.12 : wt('H4', 'Maths') - 0.1, 1e9, { dy: 10 }));
    M.vis($('#hP'), t, wt('H4', 'works') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Every') + 0.2, 1e9, POP);
  }

  /* S: definition + live check */
  const sOn = t >= tS1 - 0.1 && t < tV1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('V1');
    M.vis($('#df'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('S2') + 0.05, { st: 0.05, sp: M.HEAVY });
    PUC.write($('#sy1'), t, wt('S3', 'symbol') - 0.1, 0.6); M.vis($('#sw1'), t, wt('S3', 'reads'), 1e9, { dx: -12, dy: 0 });
    PUC.write($('#sy2'), t, wt('S6', 'PUC') - 0.1, 0.6); M.vis($('#sw2'), t, wt('S6', 'PUC') + 0.4, 1e9, { dx: -12, dy: 0 });
    M.vis($('#ck'), t, T0('S4') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(cAL, t, T0('S4') + 0.2, 1e9, { dy: 0 }); M.vis(cBL, t, T0('S4') + 0.3, 1e9, { dy: 0 });
    cA.forEach((p, i) => M.vis(p.g, t, T0('S4') + 0.3 + i * 0.08, 1e9, { dy: 10 })); cB.forEach((p, i) => M.vis(p.g, t, T0('S4') + 0.4 + i * 0.08, 1e9, { dy: 10 }));
    const back = t >= T0('S6') - 0.1;
    fw.forEach((f, i) => { M.vis(f.a.g, t, tFw[i] - 0.05, T0('S6') - 0.1, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 }); M.vis(f.k, t, tFw[i] + 0.3, T0('S6') - 0.1, { ...POP, outDur: 0.25 }); });
    bw.forEach((f, i) => { M.vis(f.a.g, t, tBw[i] - 0.05, 1e9, { dy: 0, fade: 0.1 }); M.vis(f.k, t, tBw[i] + 0.3, 1e9, POP); });
    cA.forEach((p, i) => { const hi = back ? 0 : M.io((t - tFw[i]) / 0.25); attr(p.r, 'stroke-width', (2.5 + 2 * hi).toFixed(2)); });
    const mb = M.io((t - tBw[2] - 0.3) / 0.3); attr(cB[2].r, 'fill', mix(BCB, C.redBg, mb)); attr(cB[2].r, 'stroke', mix(BC, C.red, mb));
    M.setT($('#ckL'), back ? 'LIVE · NOW THE OTHER WAY' : 'LIVE · CHECK EVERY ELEMENT');
    M.vis($('#ckP1'), t, wt('S5', 'Every') - 0.1, 1e9, POP); M.vis($('#ckP2'), t, wt('S6', 'PUC') - 0.1, 1e9, POP);
  }

  /* V: two facts */
  const vOn = t >= tV1 - 0.1 && t < tE1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('E1');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    VS.forEach((_, i) => { const el = $('#vs' + i); M.vis(el.querySelector('.n'), t, tVs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tVs[i] + 0.1, 0.7); M.vis(el.querySelector('.why'), t, tVs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(92, [[tVs[1] - 0.1, 232]], M.SOFT)(t); const hb = $('#vHi'); M.vis(hb, t, tVs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#vP'), t, wt('V3', 'fail') - 0.1, 1e9, POP);
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(vA, t, tV1 + 0.5, 1e9, { dy: 0, sc: 0.7, fade: 0.2 }); M.vis(vAL, t, tV1 + 0.6, 1e9, { dy: 0 });
    vEl.forEach((e, i) => M.vis(e, t, tV1 + 0.7 + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    const u = M.io((t - wt('V2', 'subset') + 0.1) / 0.9); attr(vCpP, 'transform', `translate(${(620 - 320 * u).toFixed(1)},300)`); M.vis(vCp, t, wt('V2', 'Every') - 0.1, T0('V3'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    const p = M.io((t - wt('V3', 'empty')) / 0.9); attr(vPhiP, 'transform', `translate(${(640 - 330 * p).toFixed(1)},${(470 - 165 * p).toFixed(1)})`); M.vis(vPhi, t, wt('V3', 'empty') - 0.2, 1e9, { dy: 0, fade: 0.15 });
    M.setT(vCap, t < T0('V3') ? 'A fits exactly on A' : 'φ has no element, so nothing fails'); M.vis(vCap, t, wt('V2', 'itself'), 1e9, { dy: 0 });
  }

  /* E: equal sets */
  const eOn = t >= tE1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('Z1');
    M.vis($('#el'), t, tE1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#eqT'), t, wt('E1', 'Two') - 0.05, { st: 0.05, sp: M.HEAVY });
    PUC.write($('#eqF'), t, wt('E2', 'equals') - 0.1, 1.2); M.vis($('#eqW'), t, wt('E2', 'both') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#prL'), t, T0('E4') - 0.05, 1e9, { dy: 10 }); PUC.write($('#prF'), t, wt('E4', 'proper') - 0.1, 1.0);
    M.vis($('#er'), t, T0('E2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ta = wt('E3', 'ALLOY'), tb = wt('E3', 'LOYAL'), tg = wt('E3', 'Both');
    W1.forEach((_, i) => { const el = $('#ea' + i); M.vis(el, t, ta - 0.1 + i * 0.06, 1e9, { dy: 10 }); const d = DUPA.includes(i) ? M.io((t - tg) / 0.3) : 0; el.style.color = mix(C.ink, C.dim, d); el.style.borderColor = mix(C.ink, C.dim, d); });
    W2.forEach((_, i) => { const el = $('#eb' + i); M.vis(el, t, tb - 0.1 + i * 0.06, 1e9, { dy: 10 }); const d = DUPB.includes(i) ? M.io((t - tg) / 0.3) : 0; el.style.color = mix(C.ink, C.dim, d); el.style.borderColor = mix(C.ink, C.dim, d); });
    PUC.write($('#eA'), t, tg, 0.7); PUC.write($('#eB'), t, tg + 0.4, 0.7);
    PUC.write($('#eChk'), t, wt('E3', 'Order') - 0.1, 1.0);
    M.vis($('#eP'), t, wt('E3', 'equal') - 0.1, 1e9, POP);
  }

  /* Z: number sets */
  const zOn = t >= tZ1 - 0.1 && t < tK1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('K1');
    M.vis($('#zl'), t, tZ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [3, 2, 1, 0].forEach((k, i) => { M.vis(zE[k].e, t, tZ[i] - 0.1, 1e9, { dy: 0, sc: 0.85, fade: 0.2 }); M.vis(zE[k].l, t, tZ[i], 1e9, { dy: 0 }); });
    M.vis(zT, t, tZ[4] - 0.1, 1e9, { dy: 0, sc: 0.7, fade: 0.2 }); M.vis(zTL, t, tZ[4], 1e9, { dy: 0 }); zTx.forEach((e, i) => M.vis(e, t, wt('Z2', 'root') + i * 0.5, 1e9, { dy: 0 }));
    M.vis($('#zr'), t, tZ1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#zc0'), t, tZ[0], tZ[3] - tZ[0] + 0.4); M.vis($('#zw0'), t, tZ[3] + 0.3, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#zc1'), t, tZ[4] + 0.2, 0.6); M.vis($('#zw1'), t, wt('Z2', 'root'), 1e9, { dx: -12, dy: 0 });
    PUC.write($('#zc2'), t, wt('Z3', 'not') - 0.1, 0.6); M.vis($('#zw2'), t, wt('Z3', 'No'), 1e9, { dx: -12, dy: 0 });
    const pz = M.io((t - wt('Z3', 'not')) / 0.3) * (1 - M.io((t - T1('Z3')) / 0.4)); attr(zE[3].e, 'stroke-width', (3.5 + 3 * pz).toFixed(2)); attr(zT, 'stroke-width', (3.5 + 3 * pz).toFixed(2));
  }

  /* K: belongs vs subset + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kaF'), t, wt('K2', 'One') - 0.1, 0.8);
    M.vis(kbA.c, t, T0('K2') + 0.1, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }); kbA.ts.forEach((g, i) => M.vis(g, t, T0('K2') + 0.3 + i * 0.1, 1e9, { dy: 0 }));
    M.vis(k1a, t, wt('K2', 'One'), 1e9, { dy: -80, sp: M.SOFT, fade: 0.1 });
    M.vis($('#kaP'), t, wt('K2', 'element') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kbF'), t, wt('K3', 'containing') - 0.1, 0.9);
    M.vis(kbB.c, t, T0('K3') + 0.1, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }); kbB.ts.forEach((g, i) => M.vis(g, t, T0('K3') + 0.3 + i * 0.1, 1e9, { dy: 0 }));
    M.vis(k1b, t, wt('K3', 'containing'), 1e9, { dy: -80, sp: M.SOFT, fade: 0.1 });
    M.vis($('#kbP'), t, wt('K3', 'Curly') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'one') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'One') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'subset') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Equal') - 0.3, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(wC, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(wCL, t, T0('W2') + 0.6, 1e9, { dy: 0 });
    M.vis(wA, t, wt('W2', 'A') + 0.1, 1e9, { dy: 0, sc: 0.7, fade: 0.2 }); M.vis(wAL, t, wt('W2', 'A') + 0.2, 1e9, { dy: 0 });
    M.vis(wB, t, wt('W2', 'B') + 0.1, 1e9, { dy: 0, sc: 0.7, fade: 0.2 }); M.vis(wBL, t, wt('W2', 'B') + 0.2, 1e9, { dy: 0 });
    WE.forEach((e, i) => M.vis(e.g, t, wt('W2', 'C') + 0.1 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    const r3 = M.io((t - wt('W4', 'Three')) / 0.3) * (1 - M.io((t - T0('W5')) / 0.3)); attr(WE[1].c, 'stroke', mix(XC, C.red, r3)); attr(WE[1].c, 'fill', mix('#FFFFFF', C.redBg, r3));
    const ha = M.io((t - tWs[2]) / 0.3) * (1 - M.io((t - tWs[3]) / 0.3)), hb = M.io((t - tWs[3]) / 0.3);
    attr(wA, 'stroke-width', (3.5 + 3 * ha).toFixed(2)); attr(wB, 'stroke-width', (3.5 + 3 * hb).toFixed(2));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'element') - 0.1, tRight: wt('X3', 'Write') });
    M.vis(tE, t, wt('X3', 'element') - 0.1, 1e9, POP); M.vis(tEL, t, wt('X3', 'element'), 1e9, { dy: 0 });
    M.vis(tSet, t, wt('X3', 'sets') - 0.1, 1e9, POP); M.vis(tSL, t, wt('X3', 'sets'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'fill') });
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
