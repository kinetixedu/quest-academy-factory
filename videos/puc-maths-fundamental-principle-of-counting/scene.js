// PUC Maths Ep 52: Fundamental principle of counting (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: first choice m violet, second choice n teal, third choice p gold, the total coral (accent)
const MC = C.violet, NC = C.teal, PC = C.gold, TC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const mc = s => `\\textcolor{${MC}}{${s}}`, nc = s => `\\textcolor{${NC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, tc = s => `\\textcolor{${TC}}{${s}}`;
const why = s => `<span class="why2">&nbsp; ${s}</span>`;
const SHIRT = 'M-14,-34 Q0,-26 14,-34 L40,-22 L32,-2 L22,-8 L22,34 L-22,34 L-22,-8 L-32,-2 L-40,-22 Z';
const PANT = 'M-22,-34 H22 L26,34 H6 L0,-4 L-6,34 H-26 Z';
const SHOE = 'M-26,8 L-26,-10 Q-14,-10 -8,-2 L18,1 Q28,3 28,12 L-26,12 Z';
const CUP = 'M-20,-18 H20 L16,20 Q0,26 -16,20 Z M20,-10 Q34,-10 32,2 Q30,10 17,9 L18,4 Q26,4 26,0 Q27,-5 19,-5 Z';
const ico = (p, d, x, y, s, fill) => { const g = mk(mk(p, 'g', { transform: `translate(${x},${y}) scale(${s})` }), 'g', {}); mk(g, 'path', { d, fill, stroke: 'rgba(22,33,62,.25)', 'stroke-width': 1.5 }); return g; };
const SH = ['#D64545', '#2F6FEB', '#2E9E5B'], SHN = ['R', 'B', 'G'], PA = ['#3A4560', '#8A8F9C', '#B7894F', '#16213E'];

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tG1 = T0('G1'), tR1 = T0('R1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1'), tW1 = T0('W1'), tV1 = T0('V1'), tV3 = T0('V3');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['SHIRTS', '3'], ['PANTS', '4'], ['OUTFITS', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'three'), wt('H1', 'four'), wt('H2', 'one')];

/* ---------- H: cupboard ---------- */
const hs = $('#hS');
mk(hs, 'rect', { x: 40, y: 70, width: 420, height: 480, rx: 14, fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
mk(hs, 'line', { x1: 60, y1: 112, x2: 440, y2: 112, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(hs, 'line', { x1: 40, y1: 300, x2: 460, y2: 300, stroke: C.ink, 'stroke-width': 3 });
const hSh = SH.map((c, i) => ico(hs, SHIRT, 120 + i * 130, 190, 1.2, c));
const hPa = PA.map((c, i) => ico(hs, PANT, 100 + i * 100, 410, 1.15, c));
$('#hQ').innerHTML = `<div style="font:700 36px/1.5 Poppins"><span style="color:${MC}">3 shirts</span><br><span style="color:${NC}">4 pants</span><br><span style="color:${TC}">? outfits</span></div>`;

/* ---------- D: try them all ---------- */
const ds = $('#dS'), RY = i => 196 + i * 104, CX = j => 210 + j * 116;
SH.forEach((c, i) => ico(ds, SHIRT, 84, RY(i), 0.8, c));
PA.forEach((c, j) => ico(ds, PANT, CX(j), 112, 0.7, c));
$('#dC').innerHTML = SH.map((c, i) => PA.map((_, j) => `<div class="cell" id="dc${i}${j}" style="left:${CX(j) - 52}px;top:${RY(i) - 36}px;color:${c}">${SHN[i]} + P${j + 1}</div>`).join('')).join('');
const tCell = (i, j) => i === 0 ? wt('D2', 'any') + j * 0.35 : i === 1 ? wt('D3', 'blue') + j * 0.22 : wt('D3', 'green') + j * 0.22;
const DSUM = [K(nc('4')), K(`${nc('4')} + ${nc('4')}`), K(`${nc('4')} + ${nc('4')} + ${nc('4')}`), K(`${nc('4')} + ${nc('4')} + ${nc('4')} = ${tc('12')}`)];
const tDs = [wt('D2', 'Four', 1), wt('D3', 'blue'), wt('D3', 'green'), wt('D4', 'Twelve')];
$('#d1').innerHTML = K(`${mc('3')} \\times ${nc('4')} = ${tc('12')}`);

/* ---------- G: tree ---------- */
const gs = $('#gS'), R0 = [100, 290], L1 = [0, 1, 2].map(i => [420, 132 + i * 168]);
const L2 = []; L1.forEach(([x, y], i) => [0, 1, 2, 3].forEach(j => L2.push([760, y + (j - 1.5) * 42, i, j])));
const L3 = []; L2.forEach(([x, y], k) => [0, 1].forEach(s => L3.push([1100, y + (s ? 10 : -10), k, s])));
[[420, 'SHIRT · 3', MC], [760, 'PANTS · 4', NC], [1100, 'SHOES · 2', PC]].forEach(([x, s, c]) => txt(gs, x, 44, s, { 'text-anchor': 'middle', fill: c, 'font-weight': 600, 'letter-spacing': 1.5 }));
const eg = (a, b, c, w) => mk(gs, 'path', { d: `M${a[0]},${a[1]} C${(a[0] + b[0]) / 2},${a[1]} ${(a[0] + b[0]) / 2},${b[1]} ${b[0]},${b[1]}`, fill: 'none', stroke: c, 'stroke-width': w });
const E1 = L1.map(p => eg(R0, p, MC, 3)), E2 = L2.map(p => eg(L1[p[2]], p, NC, 2.2)), E3 = L3.map(p => eg(L2[p[2]], p, PC, 1.6));
const rootD = dotSvg(R0[0], R0[1], 12, C.ink);
function dotSvg(x, y, r, f) { const g = mk(mk(gs, 'g', { transform: `translate(${x},${y})` }), 'g', {}); mk(g, 'circle', { r, fill: f, stroke: '#fff', 'stroke-width': 2 }); return g; }
const N1 = L1.map(([x, y], i) => ico(gs, SHIRT, x + 6, y, 0.55, SH[i])), N2 = L2.map(([x, y, i, j]) => dotSvg(x, y, 9, PA[j])), N3 = L3.map(([x, y]) => dotSvg(x, y, 6, PC));
const tE1 = i => wt('G2', 'splits') + i * 0.18, tE2 = k => wt('G3', 'splits') + k * 0.11, tE3 = k => wt('G5', 'splits') + k * 0.06;
$('#gF').innerHTML = K(`${mc('3')} \\times ${nc('4')} = ${tc('12')}`); $('#gF2').innerHTML = K(`\\times ${pc('2')} = ${tc('24')}`);

/* ---------- R: the rule ---------- */
$('#rT').innerHTML = `If one event can happen in <span style="color:${MC}">m</span> ways, and after it another in <span style="color:${NC}">n</span> ways, then the two together can happen in <b>m × n</b> ways.`;
$('#r0').innerHTML = K(`${mc('m')} \\times ${nc('n')}`); $('#r1').innerHTML = K(`\\text{three events: } ${mc('m')} \\times ${nc('n')} \\times ${pc('p')}`);
const rs = $('#rS'), RX = j => 250 + j * 120, RYy = i => 160 + i * 110;
txt(rs, RX(1.5), 110, 'n = 4 pants', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 22 });
const rML = txt(rs, 60, RYy(1) + 8, 'm = 3', { fill: MC, 'font-weight': 600, 'font-size': 22 });
const rRow = mk(rs, 'rect', { x: RX(0) - 50, y: RYy(0) - 40, width: 460, height: 80, rx: 14, fill: '#EDE6FC' });
const rD = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const g = mk(mk(rs, 'g', { transform: `translate(${RX(j)},${RYy(i)})` }), 'g', {}); mk(g, 'circle', { r: 22, fill: '#fff', stroke: SH[i], 'stroke-width': 4 }); mk(g, 'circle', { r: 9, fill: PA[j] }); rD.push({ i, j, g }); }

/* ---------- S: and vs or ---------- */
const sa = $('#saS'); const saSh = SH.map((c, i) => ico(sa, SHIRT, 100 + i * 96, 170, 0.9, c)); const saX = txt(sa, 384, 186, '×', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 52, fill: C.ink, 'font-weight': 600 });
const saPa = PA.map((c, j) => ico(sa, PANT, 470 + j * 78, 170, 0.85, c));
$('#saF').innerHTML = K(`${mc('3')} \\times ${nc('4')} = ${tc('12')}`);
const saT = txt(sa, 36, 300, 'shirt AND pants: you make both choices', { fill: C.ink2, 'font-weight': 600, 'font-size': 20 });
const so = $('#soS'); const TEA = '#C2703A', COF = '#5B3A29';
const soC = [0, 1, 2].map(i => ico(so, CUP, 90 + i * 100, 170, 1.4, TEA)).concat([0, 1].map(i => ico(so, CUP, 520 + i * 110, 170, 1.4, COF)));
const soPl = txt(so, 420, 186, '+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 52, fill: C.ink, 'font-weight': 600 });
txt(so, 190, 250, 'TEA · 3', { 'text-anchor': 'middle', fill: TEA, 'font-weight': 600 }); txt(so, 575, 250, 'COFFEE · 2', { 'text-anchor': 'middle', fill: COF, 'font-weight': 600 });
$('#soF').innerHTML = K(`3 + 2 = ${tc('5')}`);
const soT = txt(so, 36, 300, 'tea OR coffee: you pick only one', { fill: C.ink2, 'font-weight': 600, 'font-size': 20 });
const th1 = PUC.think($('#th1'), { q: '4 snacks, 3 drinks, one of each: combos?', opts: ['7', '12'], right: 1, why: 'Snack AND drink: you make both choices, so multiply. 4 × 3 = 12.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${mc('m')} \\times ${nc('n')} \\times ${pc('p')} \\times \\cdots`);

/* ---------- W: ROSE ---------- */
$('#wq').innerHTML = 'How many 4-letter words, with or without meaning, can be made from the letters of <b>ROSE</b>, with no letter repeated?';
const wsol = PUC.solution($('#wl'), [['Box 1: any of the 4 letters' + why('4 ways')], ['Box 2: one letter is used up' + why('3 ways')], ['Box 3: 2 ways · Box 4: 1 way'], [K(`4 \\times 3 \\times 2 \\times 1 = ${tc('24')}`)]], { label: 'WORKED EXAMPLE · NCERT', y0: 200, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'first'), wt('W4', 'second'), wt('W5', 'third'), wt('W6', 'Multiply')];
const BXL = i => 56 + i * 172;
$('#wB').innerHTML = [0, 1, 2, 3].map(i => `<div class="box" id="wb${i}" style="left:${BXL(i)}px;top:100px"></div><div class="bn" id="wn${i}" style="left:${BXL(i)}px;top:238px;color:${TC}">${4 - i}</div>`).join('') + 'ROSE'.split('').map((c, i) => `<div class="tile" id="wt${i}" style="left:${110 + i * 150}px;top:360px">${c}</div>`).join('');
const tTile = [wt('W3', 'any'), wt('W4', 'three'), wt('W5', 'two'), wt('W5', 'one')];

/* ---------- V: repeats vs no repeats ---------- */
const vbox = (id, ns) => ns.map((n, i) => `<div class="box" style="left:${44 + i * 176}px;top:110px;width:100px;height:100px;font-size:22px;color:var(--mute);font-family:'IBM Plex Mono'">${n === 4 && id === 'v1' ? 'ROSE' : ''}</div><div class="bn" id="${id}n${i}" style="left:${34 + i * 176}px;top:236px;color:${TC}">${n}</div>`).join('');
$('#vB1').innerHTML = vbox('v1', [4, 4, 4, 4]); $('#vB2').innerHTML = vbox('v2', [4, 3, 2, 1]);
$('#vF1').innerHTML = K(`4 \\times 4 \\times 4 \\times 4 = ${tc('256')}`); $('#vF2').innerHTML = K(`4 \\times 3 \\times 2 \\times 1 = ${tc('24')}`);
const th2 = PUC.think($('#th2'), { q: '4 different flags, signals of 2: how many?', opts: ['16', '12'], right: 1, why: 'A flag cannot be used twice: 4 choices on top, then 3 below. 4 × 3 = 12.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`4 \\times 3 \\times 2 = 24`) + '&nbsp; three digit numbers from 0, 1, 2, 3', right: K(`3 \\times 3 \\times 2 = ${tc('18')}`) + '&nbsp; the first digit cannot be 0' });
$('#tB').innerHTML = [0, 1, 2].map(i => `<div class="box" id="tb${i}" style="left:${i * 176}px;top:0;width:150px;height:110px;font-size:26px;font-family:'IBM Plex Mono';color:var(--ink2);white-space:nowrap">${i === 0 ? '<span id="t0z" style="color:var(--red);position:relative">0</span>&nbsp;1 2 3' : ''}</div><div class="bn" id="tn${i}" style="left:${i * 176}px;top:126px;width:150px;color:${TC}">${[4, 3, 2][i]}</div>`).join('');
const where = PUC.where($('#wa'), { on: [], type: 'Count numbers, words or codes with a rule for each place.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Digits 1, 2, 3, 4, 5, 6, no digit repeated.<br>How many 4-digit even numbers?',
  opts: ['120', '180', '240', '360'], right: 1, optW: 474, optY: 300 });
const sol = PUC.solution($('#so'), [['Last digit even: 2, 4 or 6' + why('3')], ['First digit: 5 left' + why('5')], ['Then 4, then 3'], [K(`3 \\times 5 \\times 4 \\times 3 = ${tc('180')}`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'even'), wt('A3', 'five'), wt('A3', 'four'), wt('A4', 'Multiply')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · fundamental principle of counting', y0: 96, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: [`<b>Rule</b>: <span style="color:${MC}">m</span> ways, then <span style="color:${NC}">n</span> ways, gives <b>m × n</b> ways in that order`,
    '<b>Three events</b>: ' + K(`${mc('m')} \\times ${nc('n')} \\times ${pc('p')}`),
    '<b>And</b> (both choices): multiply &nbsp;·&nbsp; <b>Or</b> (only one): add',
    '<b>No repeats</b>: 4, 3, 2, 1 &nbsp;·&nbsp; <b>Repeats allowed</b>: 4, 4, 4, 4',
    'Fill the fussy place first: no 0 in front, an even digit at the end'] });
const YQ = ['When do we multiply the number of ways?', 'How many outfits from 5 shirts and 2 pants?', 'Why does a 0 cause trouble in the first place of a number?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 53', topic: '5 friends, one photo: why so many ways? Factorial Notation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('G5') - 0.2, 1.04, 960, 560], [T1('G6') + 0.1, 1, 960, 540]]);
let dLast = -1;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    hSh.forEach((g, i) => M.vis(g, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: -20 })); hPa.forEach((g, i) => M.vis(g, t, tMorph + 0.7 + i * 0.1, 1e9, { dy: -20 }));
    M.vis($('#hQ'), t, wt('H3', 'how') - 0.1, 1e9, { dy: 14 }); M.vis($('#hP'), t, wt('H4', 'Seven') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'way') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('G1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    let n = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const el = $(`#dc${i}${j}`), tc0 = tCell(i, j); M.vis(el, t, tc0, 1e9, POP); if (t >= tc0) n++;
      el.style.background = mix(C.soft, '#FFFFFF', M.io((t - tc0) / 0.3)); el.style.boxShadow = t >= tc0 ? `inset 0 0 0 2.5px ${SH[i]}` : 'none'; }
    M.vis($('#dr'), t, wt('D2', 'red') , out, { dx: 60, dy: 0, ...o });
    M.setT($('#dN'), `outfits: ${n}`); M.vis($('#dN'), t, wt('D2', 'red') + 0.2, 1e9, { dy: 10 });
    const k = tDs.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, -1); if (k !== dLast) { dLast = k; if (k >= 0) $('#d0').innerHTML = DSUM[k]; }
    M.vis($('#d0'), t, tDs[0] - 0.05, 1e9, { dy: 10 });
    PUC.write($('#d1'), t, wt('D4', 'three') - 0.1, 0.6); M.vis($('#dP'), t, wt('D4', 'three') + 0.3, 1e9, POP);
  }

  /* G: tree */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gc'), t, tG1 + 0.05, out, { dy: 30, ...o });
    M.vis(rootD, t, tG1 + 0.3, 1e9, DOT);
    E1.forEach((e, i) => M.draw(e, t, tE1(i), 0.5)); N1.forEach((g, i) => M.vis(g, t, tE1(i) + 0.4, 1e9, DOT));
    E2.forEach((e, k) => M.draw(e, t, tE2(k), 0.4)); N2.forEach((g, k) => M.vis(g, t, tE2(k) + 0.3, 1e9, DOT));
    E3.forEach((e, k) => M.draw(e, t, tE3(k), 0.3)); N3.forEach((g, k) => M.vis(g, t, tE3(k) + 0.25, 1e9, DOT));
    let tips = 0; if (t >= tE3(0) + 0.25) N3.forEach((_, k) => { if (t >= tE3(k) + 0.25) tips++; }); else N2.forEach((_, k) => { if (t >= tE2(k) + 0.3) tips++; });
    const tipsShown = t >= tE3(0) + 0.25 ? Math.max(12, tips) : tips; M.setT($('#gN'), String(tipsShown));
    $('#gN').style.color = TC;
    const pul = M.io((t - wt('G4', 'Count')) / 0.3) * (1 - M.io((t - wt('G4', 'tip')) / 0.4)); N2.forEach(g => { g.style.transform = pul > 0.01 ? `scale(${(1 + 0.5 * pul).toFixed(3)})` : ''; });
    PUC.write($('#gF'), t, wt('G4', 'Twelve') - 0.1, 0.6); PUC.write($('#gF2'), t, wt('G6', 'Twelve') - 0.1, 0.6);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#rT'), t, T0('R2') + 0.05, { st: 0.03, sp: M.HEAVY });
    PUC.write($('#r0'), t, wt('R2', 'times') - 0.1, 0.6); PUC.write($('#r1'), t, wt('R3', 'Multiply') - 0.1, 0.8);
    M.vis($('#rr'), t, T0('R2') + 0.3, out, { dx: 60, dy: 0, ...o });
    rD.forEach(d => M.vis(d.g, t, wt('R2', 'together') + (d.i * 4 + d.j) * 0.08, 1e9, DOT)); M.vis(rML, t, wt('R2', 'together'), 1e9, { dy: 0 });
    const rp = M.io((t - wt('R4', 'every') + 0.1) / 0.3); rRow.style.opacity = rp.toFixed(3); M.hide(rRow, rp < 0.01);
    const pp = $('#rP'), pk = t >= wt('R4', 'every') ? 1 : 0; if (pp._k !== pk) { pp._k = pk; pp.innerHTML = pk ? 'One shirt meets all 4 pants. Then the next.' : '3 rows × 4 columns = 12 pairs'; }
    M.vis(pp, t, wt('R2', 'times') + 0.2, 1e9, POP);
  }

  /* S: and vs or + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sa'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    saSh.forEach((g, i) => M.vis(g, t, wt('S1', 'shirt') + i * 0.1, 1e9, { dy: -16 })); saPa.forEach((g, i) => M.vis(g, t, wt('S1', 'pants') + i * 0.1, 1e9, { dy: -16 }));
    M.vis(saX, t, wt('S1', 'multiply'), 1e9, POP); M.vis(saT, t, wt('S1', 'both'), 1e9, { dy: 0 }); PUC.write($('#saF'), t, wt('S1', 'Three') - 0.1, 0.6);
    M.vis($('#so2'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    soC.forEach((g, i) => M.vis(g, t, (i < 3 ? wt('S2', 'Tea') : wt('S2', 'coffee')) + (i % 3) * 0.1, 1e9, { dy: -16 }));
    M.vis(soPl, t, wt('S2', 'add'), 1e9, POP); M.vis(soT, t, wt('S2', 'only'), 1e9, { dy: 0 }); PUC.write($('#soF'), t, wt('S2', 'gives') - 0.1, 0.6);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'Seven') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'You') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'When') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'multiply') - 0.1, 0.8);
  }

  /* W: ROSE */
  const wOn = t >= tW1 - 0.1 && t < tV1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('V1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3].forEach(i => { M.vis($('#wb' + i), t, T0('W2') + 0.5 + i * 0.1, 1e9, { dy: 14 }); M.vis($('#wn' + i), t, tTile[i] - 0.3, 1e9, POP);
      const el = $('#wt' + i), u = M.io((t - tTile[i]) / 0.6), x0 = 110 + i * 150, y0 = 360, x1 = BXL(i) + 18, y1 = 118;
      M.vis(el, t, T0('W2') + 0.8 + i * 0.1, 1e9, { dy: 14 }); el.style.left = (x0 + (x1 - x0) * u).toFixed(1) + 'px'; el.style.top = (y0 + (y1 - y0) * u - 60 * Math.sin(Math.PI * u)).toFixed(1) + 'px';
      el.style.background = mix(C.ink, TC, M.io((t - tTile[i] - 0.5) / 0.3)); });
    M.vis($('#wP'), t, wt('W6', 'Twenty') - 0.1, 1e9, POP);
  }

  /* V + think */
  const vOn = t >= tV1 - 0.1 && t < tX1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2, 3].forEach(i => M.vis($('#v1n' + i), t, wt('V1', 'every') + i * 0.15, 1e9, POP));
    PUC.write($('#vF1'), t, T0('V2') + 0.1, 1.2);
    M.vis($('#vr'), t, wt('V2', 'repeats') - 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3].forEach(i => M.vis($('#v2n' + i), t, wt('V2', 'repeats') + i * 0.12, 1e9, POP)); PUC.write($('#vF2'), t, wt('V2', 'shrink') - 0.4, 0.7);
    M.vis($('#th2'), t, tV3 + 0.05, OUT('X1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'Sixteen') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'flag') });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tStr = wt('X3', 'cannot') - 0.1, tR = wt('X3', 'Eighteen') - 0.4;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: tStr, tRight: tR });
    [0, 1, 2].forEach(i => { M.vis($('#tb' + i), t, T0('X2') + 0.2 + i * 0.1, 1e9, { dy: 10 }); M.vis($('#tn' + i), t, wt('X2', 'four') + i * 0.3, 1e9, POP); });
    const z = $('#t0z'), zs = M.io((t - tStr) / 0.3); z.style.textDecoration = zs > 0.5 ? 'line-through' : 'none'; z.style.opacity = (1 - 0.6 * zs).toFixed(3);
    M.setT($('#tn0'), t >= tStr + 0.3 ? '3' : '4'); $('#tn0').style.color = t >= tStr + 0.3 ? C.ok : TC;
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'type') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSo);
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
