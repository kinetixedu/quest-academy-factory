// PUC Maths Ep 04: Empty, finite, infinite and universal sets (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element x violet, rule coral (accent), set A blue, set B teal, U ink outline, not-in red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const PHI = '\\phi';

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tE1 = T0('E1'), tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tG9 = T0('G9'), tU1 = T0('U1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
$('#tsv').innerHTML = K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')}\\ \\text{is an even prime},\\ ${xc('x')} > 2`)} \\,\\}`);

/* ---------- H: even numbers after 2 ---------- */
const HR = [['4', '2 \\times 2'], ['6', '2 \\times 3'], ['8', '2 \\times 4']];
$('#hrs').innerHTML = HR.map(([n, f], i) => `<div class="hr" id="hr${i}" style="top:${92 + i * 120}px"><div class="hx">${K(`${red(n)} = ${f}`)}</div><div class="hw">NOT PRIME</div><div class="chip" style="right:22px;top:22px;background:${C.red}">${M.icon('x', 22, '#fff', 3)}OUT</div></div>`).join('');
$('#hEm').innerHTML = K(`= \\{\\ \\ \\}`);
const tHr = [wt('H2', 'Four'), wt('H2', 'Six'), wt('H2', 'Eight')];

/* ---------- E: definition + live test ---------- */
$('#dfSy').innerHTML = K(`${PHI} \\;=\\; \\{\\ \\ \\}`);
$('#dfN').innerHTML = K(`n(${PHI}) = 0`);
const es = $('#eS');
const bag = mk(es, 'ellipse', { cx: 230, cy: 300, rx: 180, ry: 84, fill: ACB, stroke: AC, 'stroke-width': 3 });
const bagL = txt(es, 230, 306, 'IN: nothing', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600, 'letter-spacing': 1 });
const tray = mk(es, 'rect', { x: 456, y: 222, width: 292, height: 160, rx: 16, fill: C.redBg, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const trL = txt(es, 474, 250, 'OUT', { 'font-size': 20, fill: C.red, 'font-weight': 600, 'letter-spacing': 2 });
const EN = [4, 6, 8, 10, 12, 14], OSL = [[520, 300], [602, 300], [684, 300], [520, 354], [602, 354], [684, 354]];
const eTok = EN.map((n, i) => { const pg = mk(es, 'g', {}), g = mk(pg, 'g', {}); const c = mk(g, 'circle', { r: 30, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); const tt = txt(g, 0, 9, n, { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 }); return { n, i, pg, g, c, tt }; });
const eLab = txt(es, 392, 416, '', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
const tEt = [wt('E4', 'Four'), wt('E4', 'Six'), wt('E4', 'Eight'), wt('E4', 'ten'), wt('E4', 'twelve'), wt('E4', 'all') + 0.15];
const EX = 116, ETX = i => 116 + i * 110, ETY = 120;
const eTokP = (k, t) => { const u = M.io((t - tEt[k.i] - 0.25) / 0.5), [x2, y2] = OSL[k.i], x1 = ETX(k.i), y1 = ETY; return [x1 + (x2 - x1) * u, y1 + (y2 - y1) * u - 50 * Math.sin(Math.PI * u), u]; };
$('#ex0').innerHTML = K(`\\{\\, ${xc('x')} \\in \\mathbb{N} : ${rc(`1 < ${xc('x')} < 2`)} \\,\\} = ${PHI}`);
$('#ex1').innerHTML = K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')}^2 = 4,\\ ${xc('x')}\\ \\text{odd}`)} \\,\\} = ${PHI}`);

/* ---------- K: phi vs {0} ---------- */
$('#kaF').innerHTML = K(`${PHI} = \\{\\ \\ \\}`);
$('#kbF').innerHTML = K(`\\{\\, ${xc('0')} \\,\\}`);
$('#kaP').innerHTML = K(`n(${PHI}) = 0`) + '&nbsp; nothing inside';
$('#kbP').innerHTML = K(`n(\\{0\\}) = 1`) + '&nbsp; not empty';
const box = (svg, col) => { const g = mk(svg, 'g', {}); const b = mk(g, 'path', { d: 'M232,250 L232,420 L552,420 L552,250', fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); const lid = mk(g, 'path', { d: 'M232,250 L300,206 M552,250 L484,206', fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }); return { g, b, lid }; };
const bxA = box($('#kaS'), C.ink), bxB = box($('#kbS'), C.ink);
const kEmpty = txt($('#kaS'), 392, 350, 'empty', { 'text-anchor': 'middle', 'font-size': 22, fill: C.dim, 'font-weight': 600, 'letter-spacing': 2 });
const k0 = mk(mk($('#kbS'), 'g', { transform: 'translate(392,350)' }), 'g', {}); mk(k0, 'circle', { r: 44, fill: '#fff', stroke: XC, 'stroke-width': 3.5 }); txt(k0, 0, 14, '0', { 'text-anchor': 'middle', 'font-size': 40, fill: XC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: `Is the set ${K(`\\{${PHI}\\}`)} empty?`, opts: ['Yes, empty', 'No, not empty'], right: 1, why: `It holds one element, ${K(PHI)} itself: a box holding an empty box. So ${K(`n(\\{${PHI}\\}) = 1`)}.` });

/* ---------- G: finite and infinite ---------- */
const GS = [['Finite: the counting ends', 'empty, or a definite number of elements', 1],
  [K(`n(\\text{days of the week}) = 7`), 'a definite number: finite', 0],
  [K(`n(S)`), 'the number of different elements of S', 0],
  [K(`\\mathbb{N} = \\{\\,${xc('1')},\\ ${xc('2')},\\ ${xc('3')},\\ \\dots\\,\\}`), 'infinite: show the pattern, add three dots', 0]];
$('#gSt').innerHTML = GS.map(([f, w, tx], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 122}px"><div class="n">${i + 1}</div><div class="sx${tx ? ' tx' : ''}">${f}</div><div class="why">${w}</div></div>`).join('');
const tGs = [wt('G2', 'finite'), wt('G3', 'days'), wt('G4', 'n'), wt('G8', 'roster')];
const gs = $('#gS'), GX = v => 80 + v * 64, GY = 380;
const gAx = mk(gs, 'line', { x1: 40, y1: GY, x2: 740, y2: GY, stroke: C.ink, 'stroke-width': 3 });
const gHd = mk(gs, 'path', { d: `M752,${GY} l-16,-9 v18 z`, fill: C.ink });
const gTk = []; for (let v = 1; v <= 9; v++) { mk(gs, 'line', { x1: GX(v), y1: GY - 9, x2: GX(v), y2: GY + 9, stroke: C.ink, 'stroke-width': 2 }); gTk.push(txt(gs, GX(v), GY + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 })); }
const gDots = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => mk(gs, 'circle', { cx: GX(v), cy: GY, r: 11, fill: XC }));
const gMore = txt(gs, 706, GY - 24, '...', { 'text-anchor': 'middle', 'font-size': 30, fill: XC, 'font-weight': 600 });
const tG5 = [wt('G5', 'One'), wt('G5', 'two'), wt('G5', 'three')], tKeep = wt('G5', 'Keep'), tTh = wt('G6', 'thousand'), tMi = wt('G6', 'million'), tBi = wt('G6', 'billion');
const fmt = v => Math.floor(v).toLocaleString('en-US');
const gVal = t => {
  if (t < tG5[1]) return 1; if (t < tG5[2]) return 2; if (t < tKeep) return 3;
  const seg = (a, b, va, vb) => Math.exp(Math.log(va) + (Math.log(vb) - Math.log(va)) * M.clamp((t - a) / (b - a)));
  if (t < tTh) return seg(tKeep, tTh, 3, 1000); if (t < tMi) return seg(tTh, tMi, 1000, 1e6); if (t < tBi) return seg(tMi, tBi, 1e6, 1e9);
  return seg(tBi, tBi + 22, 1e9, 9.99e11);
};
const th2 = PUC.think($('#th2'), { q: 'The natural numbers less than one crore: finite or infinite?', opts: ['Finite', 'Infinite'], right: 0, why: 'Huge, but the counting stops at 9,999,999. Big is not the same as endless.' });

/* ---------- U: universal set ---------- */
$('#uEx').innerHTML = K(`\\text{sets of integers:}\\ \\ U = \\mathbb{Q}\\ \\text{or}\\ U = \\mathbb{R}`);
const us = $('#uS');
const uR = mk(us, 'rect', { x: 40, y: 84, width: 704, height: 400, rx: 10, fill: 'none', stroke: C.ink, 'stroke-width': 3.5 });
const uRL = txt(us, 60, 118, 'U', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 34, 'font-weight': 700, fill: C.ink });
const uA = mk(us, 'circle', { cx: 250, cy: 290, r: 130, fill: ACB, stroke: AC, 'stroke-width': 3.5 });
const uB = mk(us, 'circle', { cx: 540, cy: 290, r: 112, fill: BCB, stroke: BC, 'stroke-width': 3.5 });
const uAL = txt(us, 250, 148, 'RIDE A BICYCLE', { 'text-anchor': 'middle', 'font-size': 17, fill: AC, 'font-weight': 600, 'letter-spacing': 1 });
const uBL = txt(us, 540, 166, 'WALK', { 'text-anchor': 'middle', 'font-size': 17, fill: BC, 'font-weight': 600, 'letter-spacing': 1 });
const SP = [[210, 280, 0], [270, 250, 0], [300, 320, 0], [200, 340, 0], [250, 380, 0], [520, 280, 1], [570, 330, 1], [500, 345, 1], [580, 260, 1], [110, 170, 2], [400, 150, 2], [680, 160, 2], [400, 440, 2], [690, 440, 2], [110, 440, 2]];
const uDots = SP.map(([x, y, s]) => mk(us, 'circle', { cx: x, cy: y, r: 10, fill: [AC, BC, C.ink2][s] }));
const uOther = txt(us, 392, 470, '', { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600 });
const avD = PUC.avatar($('#sU'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'U is the whole class. Every set lives inside it.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${PHI} = \\{\\ \\ \\} \\qquad n(${PHI}) = 0 \\qquad \\mathbb{N} = \\{1, 2, 3, \\dots\\}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Empty, finite or infinite? Here ${K(`${xc('x')} \\in \\mathbb{N}`)}.`;
const WS = [K(`\\{${xc('x')} : 2${xc('x')} - 1 = 0\\}:\\ ${xc('x')} = \\tfrac{1}{2} \\notin \\mathbb{N} \\Rightarrow ${PHI}`),
  K(`\\{${xc('x')} : (${xc('x')} - 1)(${xc('x')} - 2) = 0\\} = \\{1, 2\\}`),
  K(`\\{${xc('x')} : ${xc('x')}\\ \\text{is a factor of } 12\\} = \\{1, 2, 3, 4, 6, 12\\}`),
  K(`\\{${xc('x')} : ${xc('x')}\\ \\text{is prime}\\}:\\ \\text{never runs out}`)];
const wsol = PUC.solution($('#wl'), WS.map(s => [s]), { label: 'WORKED EXAMPLE', y0: 150, dy: 96 });
$('#wl .lbl').style.top = '30px';
const BINS = [['EMPTY', C.red], ['FINITE', AC], ['INFINITE', C.ac]];
$('#bins').innerHTML = BINS.map(([n, col], i) => `<div class="bin" id="bin${i}" style="left:${36 + i * 246}px"><div class="bl" style="color:${col}">${n}</div></div>`).join('') +
  [['SET 1', 'φ · n = 0', 0, 0], ['SET 2', 'n = 2', 1, 0], ['SET 3', 'n = 6', 1, 1], ['SET 4', '1, 2, 3, 5, ...', 2, 0]].map(([a, b, bin, k], i) => `<div class="sc" id="sc${i}" data-x="${36 + bin * 246 + 20}" data-y="${236 - k * 82}">${a}<small>${b}</small></div>`).join('');
const tWs = [wt('W3', 'One'), wt('W4', 'Two'), wt('W5', 'Three'), wt('W6', 'Four')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\{0\\} = ${PHI}`), right: K(`n(\\{0\\}) = 1,\\quad n(\\{${PHI}\\}) = 1,\\quad n(${PHI}) = 0`) });
const ts = $('#tS');
const tBox = (x, lab, inner) => { const g = mk(ts, 'g', {}); mk(g, 'path', { d: `M${x - 70},90 L${x - 70},190 L${x + 70},190 L${x + 70},90`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }); txt(g, x, 230, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 }); if (inner) { const c = mk(g, 'circle', { cx: x, cy: 150, r: 28, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, x, 160, inner, { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 600 }); } return g; };
const tbA = tBox(130, 'φ: no element', ''), tbB = tBox(400, '{0}: one element', '0');
const where = PUC.where($('#wa'), { on: [], type: 'Which of these sets are empty? Which are finite, and which infinite?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`A = \\{${xc('x')} \\in \\mathbb{R} : ${xc('x')}^2 + 1 = 0\\}, \\ \\ C = \\{${xc('x')} \\in \\mathbb{Z} : 1 < ${xc('x')} < 2\\}`)}<br>${K(`B = \\{${xc('x')} \\in \\mathbb{N} : ${xc('x')}^2 - 3${xc('x')} + 2 = 0\\}`)}<br>${K(`D = \\{${xc('x')} \\in \\mathbb{Q} : ${xc('x')}^2 = 2\\}, \\ \\ E = \\{${PHI}\\}`)}<br>How many of these five sets are empty?`,
  opts: ['2', '3', '4', '5'], right: 1, optW: 474, optY: 340 });
const so = PUC.solution($('#so'), [[K(`A:\\ ${xc('x')}^2 = -1 \\Rightarrow ${PHI}`)], [K(`B = \\{1, 2\\}`)], [K(`C = ${PHI},\\ \\ D = ${PHI}`)], [K(`E = \\{${PHI}\\}:\\ \\text{1 element}`)], [K(`\\text{empty: } A, C, D \\Rightarrow 3`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'real'), wt('A3', 0), wt('A4', 0), wt('A5', 0), wt('A5', 'three')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · four kinds of sets', y0: 96, dy: 84, txt: [1, 0, 1, 0, 1],
  lines: ['<b>Empty set</b>: no element at all',
    K(`${PHI} = \\{\\ \\ \\},\\quad n(${PHI}) = 0,\\quad \\{0\\} \\ne ${PHI}`),
    '<b>Finite</b>: the counting ends · <b>Infinite</b>: it never does',
    K(`\\mathbb{N} = \\{1, 2, 3, \\dots\\}\\ \\text{is infinite}`),
    '<b>U</b>: the basic set every set in the problem comes from'] });
const YQ = ['Give two examples of the empty set.', 'Is the set of all points on a line finite or infinite?', `Why is ${K('\\{0\\}')} not empty?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 05', topic: 'Every NEET subject is a PUC subject. Not the other way.', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tEt[2] - 0.3, 1.05, 960, 560], [T0('E5') + 0.8, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  M.vis($('#tset'), t, wt('H1', 'even') - 0.1, tMorph - 0.15, { dy: 24, outDur: 0.25, ody: 10 });

  /* H */
  const hOn = t >= tMorph && t < tE1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('E1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { M.vis($('#hr' + i), t, tHr[i] - 0.1, 1e9, { dy: 14 }); M.vis($('#hr' + i + ' .chip'), t, tHr[i] + 0.5, 1e9, POP); });
    M.vis($('#hP'), t, wt('H2', 'Every') - 0.1, 1e9, POP); M.vis($('#hEm'), t, wt('H2', 'Every') + 0.3, 1e9, { dx: -12, dy: 0 });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, T0('H4') - 0.1, 1e9, POP);
  }

  /* E: empty set + live test */
  const eOn = t >= tE1 - 0.1 && t < tK1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('K1');
    M.vis($('#df'), t, tE1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('E2') + 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#dfP1'), t, wt('E2', 'null') - 0.1, 1e9, POP); M.vis($('#dfP2'), t, wt('E2', 'void') - 0.1, 1e9, POP);
    PUC.write($('#dfSy'), t, wt('E3', 'phi') - 0.1, 0.9);
    PUC.write($('#dfN'), t, wt('E5', 'number') - 0.1, 0.7);
    M.vis($('#et'), t, T0('E4') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(bag, t, T0('E4') + 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(bagL, t, T0('E4') + 0.3, 1e9, { dy: 0 });
    M.vis(tray, t, T0('E4') + 0.2, 1e9, { dy: 0, fade: 0.25 }); M.vis(trL, t, T0('E4') + 0.3, 1e9, { dy: 0 });
    let gone = 0;
    eTok.forEach(k => {
      M.vis(k.g, t, T0('E4') + 0.2 + k.i * 0.06, 1e9, { dy: 0, fade: 0.15 });
      const [x, y, u] = eTokP(k, t); attr(k.pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      const d = M.io((t - tEt[k.i] - 0.15) / 0.25); attr(k.c, 'fill', mix('#FFFFFF', C.redBg, d)); attr(k.c, 'stroke', mix(C.ink, C.red, d)); attr(k.tt, 'fill', mix(C.ink, C.red, d));
      if (t >= tEt[k.i]) gone = k.i;
    });
    const cur = eTok[gone]; M.setT(eLab, t >= tEt[0] ? `${cur.n} = 2 × ${cur.n / 2}: not prime` : ''); attr(eLab, 'x', 392);
    M.vis(eLab, t, tEt[0], T0('E5'), { dy: 0, fade: 0.1 });
    M.setT($('#eCnt'), '0 elements'); M.vis($('#eCnt'), t, T0('E4') + 0.4, 1e9, POP);
    const pz = M.io((t - wt('E5', 'zero') + 0.1) / 0.2) * (1 - M.io((t - wt('E5', 'zero') - 0.6) / 0.3)); $('#eCnt').style.background = mix(C.ink, C.ac, pz);
    M.vis($('#eAl'), t, wt('E6', 'More') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#ex0'), t, wt('E6', 'natural') - 0.1, 0.8); PUC.write($('#ex1'), t, wt('E6', 'odd') - 0.1, 0.8);
  }

  /* K: phi vs {0} + think */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kaF'), t, wt('K1', 'empty') - 0.1, 0.6);
    M.draw(bxA.b, t, wt('K1', 'empty'), 0.6); M.draw(bxA.lid, t, wt('K1', 'empty') + 0.4, 0.4);
    M.vis(kEmpty, t, wt('K1', 'Nothing') - 0.1, 1e9, { dy: 0 });
    M.vis($('#kaP'), t, wt('K1', 'Nothing'), 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kbF'), t, wt('K2', 'zero') - 0.1, 0.6);
    M.draw(bxB.b, t, wt('K2', 'box'), 0.6); M.draw(bxB.lid, t, wt('K2', 'box') + 0.4, 0.4);
    M.vis(k0, t, wt('K2', 'one') - 0.05, 1e9, { dy: -60, sp: M.SOFT, fade: 0.1 });
    M.vis($('#kbP'), t, wt('K2', 'not') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'empty') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'box') });
  }

  /* G: finite and infinite + think */
  const gOn = t >= tG1 - 0.1 && t < tU1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G9');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i], 0.8); M.vis(el.querySelector('.why'), t, tGs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 122]), M.SOFT)(t);
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#gr'), t, T0('G5') - 0.2, out, { dx: 60, dy: 0, ...o });
    const v = gVal(t); M.setT($('#gV'), fmt(v));
    M.vis($('#gV'), t, tG5[0] - 0.1, 1e9, { dy: 14 }); M.vis($('#gL'), t, tKeep, 1e9, { dy: 10 });
    M.setT($('#gCnt'), t < tKeep ? 'counting' : 'no last number'); M.vis($('#gCnt'), t, tG5[0], 1e9, POP);
    M.draw(gAx, t, T0('G5') + 0.1, 0.6); M.vis(gHd, t, T0('G5') + 0.6, 1e9, { dy: 0 });
    gTk.forEach((e, i) => M.vis(e, t, T0('G5') + 0.2 + i * 0.04, 1e9, { dy: 0 }));
    gDots.forEach((d, i) => M.vis(d, t, i < 3 ? tG5[i] : tKeep + (i - 3) * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(gMore, t, tKeep + 0.8, 1e9, { dy: 0 });
    const hp = (Math.sin((t - tKeep) * 4) + 1) / 2; attr(gHd, 'transform', t > tKeep ? `translate(${(6 * hp).toFixed(2)},0)` : '');
    M.vis($('#gP'), t, wt('G7', 'infinite') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tG9 + 0.05, OUT('U1'), { dy: 36, ...o });
    th2(t, { tin: tG9, tOpts: wt('G9', 'Finite') - 0.1, tCount: T1('G9') + 0.05, dur: 3, tAns: T0('GA') - 0.02, tWhy: wt('GA', 'huge') });
  }

  /* U: universal set */
  const uOn = t >= tU1 - 0.1 && t < tT + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('T1');
    M.vis($('#ul'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#uT'), t, wt('U2', 'basic') - 0.1, { st: 0.05, sp: M.HEAVY });
    M.vis($('#uL2'), t, T0('U5') - 0.1, 1e9, { dy: 10 }); PUC.write($('#uEx'), t, wt('U5', 'integers') - 0.1, 0.9);
    avD(t, wt('U4', 'every') - 0.1, out);
    M.vis($('#ur'), t, wt('U3', 'bicycle') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(uA, t, wt('U3', 'bicycle') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 }); M.vis(uAL, t, wt('U3', 'bicycle'), 1e9, { dy: 0 });
    M.vis(uB, t, wt('U3', 'walk') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.15 }); M.vis(uBL, t, wt('U3', 'walk'), 1e9, { dy: 0 });
    uDots.forEach((d, i) => M.vis(d, t, SP[i][2] === 0 ? wt('U3', 'bicycle') + 0.2 + i * 0.05 : SP[i][2] === 1 ? wt('U3', 'walk') + 0.2 + i * 0.05 : wt('U3', 'class') + (i - 9) * 0.06, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(uR, t, wt('U3', 'class') - 0.2, 0.9); M.vis(uRL, t, wt('U3', 'class') + 0.3, 1e9, { dy: 0 });
    const ru = M.io((t - wt('U4', 'rectangle') + 0.1) / 0.3) * (1 - M.io((t - wt('U4', 'rectangle') - 0.7) / 0.4)); attr(uR, 'stroke-width', (3.5 + 3 * ru).toFixed(2)); attr(uR, 'stroke', mix(C.ink, C.ac, ru));
    M.setT(uOther, 'also in U: students who come another way'); M.vis(uOther, t, wt('U3', 'class') + 0.6, 1e9, { dy: 0 });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Empty') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Infinite') - 0.2, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    BINS.forEach((_, i) => M.vis($('#bin' + i), t, T0('W2') + 0.5 + i * 0.12, 1e9, { dy: 16 }));
    for (let i = 0; i < 4; i++) {
      const el = $('#sc' + i), x = +el.dataset.x, y = +el.dataset.y, tt = tWs[i] + 1.2, u = M.io((t - tt) / 0.55);
      M.vis(el, t, tt - 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      el.style.left = (M.lerp(x, x, u)).toFixed(1) + 'px'; el.style.top = M.lerp(-10, y, u).toFixed(1) + 'px';
      el.style.borderColor = mix(C.ink, BINS[[0, 1, 1, 2][i]][1], u);
    }
    M.vis($('#wRes'), t, T1('W6') - 0.3, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'element') - 0.1, tRight: wt('X3', 'none') });
    M.vis(tbA, t, wt('X3', 'element'), 1e9, { dy: 10 }); M.vis(tbB, t, wt('X3', 'element') + 0.3, 1e9, { dy: 10 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'which') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
