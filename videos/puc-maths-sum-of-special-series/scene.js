// PUC Maths Ep 68: Sum of special series (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): k and n violet, sum of k blue, sum of squares teal, sum of cubes gold
const NC = C.violet, BC = '#2F6FEB', BCB = '#E7EEFD', TC = '#0E8F8F', TCB = '#DDF1F1', GC = '#B7791F', GCB = '#F6ECDB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const N = s => `\\textcolor{${NC}}{${s}}`, B = s => `\\textcolor{${BC}}{${s}}`, T = s => `\\textcolor{${TC}}{${s}}`, G = s => `\\textcolor{${GC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const n_ = N('n'), k_ = N('k');
const F1 = `\\tfrac{${n_}(${n_} + 1)}{2}`, F2 = `\\tfrac{${n_}(${n_} + 1)(2${n_} + 1)}{6}`;
const S1 = `\\sum ${k_}`, S2 = `\\sum ${k_}^2`, S3 = `\\sum ${k_}^3`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tP1 = T0('P1'), tL1 = T0('L1'), tD1 = T0('D1'), tC1 = T0('C1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['1 × 1 SQUARE', '1 tile'], ['2 × 2 SQUARE', '4 tiles'], ['3 × 3 SQUARE', '9 tiles']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'One'), wt('H1', 'four'), wt('H1', 'nine')];

/* square of k x k tiles, bottom-left at (x, yb) */
const tileSq = (svg, x, yb, k, cs, fill, stroke) => { const g = mk(mk(svg, 'g', {}), 'g', {}); for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) mk(g, 'rect', { x: x + i * cs + 1.5, y: yb - (j + 1) * cs + 1.5, width: cs - 3, height: cs - 3, rx: 3, fill, stroke, 'stroke-width': 2 }); return g; };

/* ---------- H ---------- */
const hs = $('#hS'); let hx = 300; const hSq = [1, 2, 3, 4].map(k => { const g = tileSq(hs, hx, 380, k, 34, TCB, TC); const lb = txt(hs, hx + k * 17, 410, `${k * k}`, { 'text-anchor': 'middle', 'font-size': 18, fill: TC, 'font-weight': 600 }); hx += k * 34 + 18; return { g, lb }; });
const tHs = [wt('H2', 'one', 0), wt('H2', 'two'), wt('H2', 'three'), T0('H3')], HT = [1, 5, 14, 30];

/* ---------- P ---------- */
$('#pS').innerHTML = K(`\\displaystyle\\sum_{${k_} = 1}^{${n_}} ${k_} = 1 + 2 + 3 + \\cdots + ${n_}`);
const AN = [['Σ', 'add them all up'], ['k = 1', 'start at 1'], ['n', 'stop at n']];
$('#pAn').innerHTML = AN.map(([a, b], i) => `<div class="an" id="pan${i}" style="left:${[36, 290, 500][i]}px;top:290px"><b style="color:${i ? NC : C.ink};font-family:${i === 2 ? 'Poppins;font-style:italic' : "'IBM Plex Mono'"}">${a}</b><span style="color:var(--ink2)">${b}</span></div>`).join('');
const pv = $('#pSv'), PC = 40, PB = 350, PX0 = 292;
const pBlk = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 6; j++) { const blue = j <= i; pBlk.push({ blue, r: mk(pv, 'rect', { x: PX0 + i * PC + 2, y: PB - (j + 1) * PC + 2, width: PC - 4, height: PC - 4, rx: 4, fill: blue ? BCB : C.ac2, stroke: blue ? BC : C.ac, 'stroke-width': 2.5 }) }); }
const pLab = txt(pv, 392, PB + 34, '5 wide, 6 tall: half of 30 is 15', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
$('#pF').innerHTML = K(`${B(S1)} = \\dfrac{${n_}(${n_} + 1)}{2}`);
const pG = $('#pG'); pG.style.left = 'auto'; pG.style.right = '36px'; pG.style.top = '520px';
$('#pEx').innerHTML = `<div style="position:absolute;left:0;top:0">${K(`\\sum_{${k_}=1}^{4} ${k_} = 1 + 2 + 3 + 4 = 10`)}</div><div style="position:absolute;left:0;top:80px">${K(`\\sum_{${k_}=1}^{4} ${k_}^2 = 1 + 4 + 9 + 16 = 30`)}</div>`;

/* ---------- L: live squares ---------- */
const lsv = $('#lS'), LC = 30, LB = 410; let lx = 47; const lSq = [1, 2, 3, 4, 5, 6].map(k => { const g = tileSq(lsv, lx, LB, k, LC, TCB, TC); lx += k * LC + 12; return g; });
const tLn = [wt('L2', 'One'), wt('L2', 'Four'), wt('L2', 'Nine'), wt('L2', 'Sixteen'), wt('L3', 'Fifty'), wt('L3', 'ninety')];
const ln = t => tLn.reduce((a, tt, i) => t >= tt - 0.1 ? i + 1 : a, 0);
const SQ = [1, 5, 14, 30, 55, 91];
$('#lRows').innerHTML = SQ.map((v, i) => { const n = i + 1; return `<div class="tr" id="lr${i}" style="top:${130 + i * 64}px"><div class="c" style="left:20px;color:${NC}">${n}</div><div class="c" style="left:114px;color:${TC}">${v}</div><div class="k" id="lk${i}" style="left:434px">${K(`\\tfrac{${n}\\cdot${n + 1}\\cdot${2 * n + 1}}{6} = ${v}`)}</div><div class="c" id="lc${i}" style="right:18px;top:12px">${M.icon('check', 28, C.ok, 3)}</div></div>`; }).join('');
$('#lRh').innerHTML = K(`\\tfrac{${n_}(${n_}+1)(2${n_}+1)}{6}`); $('#lRh').style.top = '86px'; $('#lRh').style.fontSize = '28px'; $('#lRh').style.top = '80px';
let lLast = -1;

/* ---------- D: telescoping ---------- */
const DS = [`${k_}^3 - (${k_} - 1)^3 = 3${k_}^2 - 3${k_} + 1`, `\\text{write it for } ${k_} = 1, 2, \\dots, ${n_}\\text{, add}`, `\\text{left side: only } ${n_}^3 \\text{ is left}`, `${n_}^3 = 3${T(S2)} - 3${B(S1)} + ${n_}`, `${T(S2)} = \\dfrac{${n_}(${n_} + 1)(2${n_} + 1)}{6}`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const cx = (s, id) => `<span class="cx" id="${id}">${K(s)}<i></i></span>`;
const TLR = [[cx('1^3', 'x1a'), K('-\\ 0^3')], [cx('2^3', 'x2a'), K('-') + ' ' + cx('1^3', 'x1b')], [cx('3^3', 'x3a'), K('-') + ' ' + cx('2^3', 'x2b')], [K('\\vdots'), ''], [K(`${n_}^3`), K('-') + ' ' + cx(`(${n_} - 1)^3`, 'xnb')]];
$('#dTl').innerHTML = TLR.map(([a, b], i) => `<div class="tl" id="dl${i}" style="top:${90 + i * 66}px">${a} ${b}</div>`).join('') +
  `<div style="position:absolute;left:60px;top:432px;width:420px;height:3px;background:var(--ink)" id="dLn"></div><div class="tl" id="dSum" style="top:450px">${K(`\\text{total} = ${n_}^3 - 0^3 = ${n_}^3`)}</div>`;
const tStr = wt('D4', 'cancel');

/* ---------- C: cubes ---------- */
const CR = [`1 = ${G('1')}^2`, `1 + 8 = 9 = ${G('3')}^2`, `1 + 8 + 27 = 36 = ${G('6')}^2`, `1 + 8 + 27 + 64 = 100 = ${G('10')}^2`];
$('#cRows').innerHTML = CR.map((f, i) => `<div class="cr" id="cr${i}" style="top:${90 + i * 76}px">${K(f)}</div>`).join('') + `<div class="cr" id="cr4" style="top:420px;font-size:42px">${K(`${G(S3)} = \\left(${F1}\\right)^2`)}</div>`;
const cs = $('#cS'), CC = 38, CX0 = 202, CY0 = 92, cCells = [];
for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) cCells.push({ i, j, r: mk(cs, 'rect', { x: CX0 + i * CC + 1.5, y: CY0 + j * CC + 1.5, width: CC - 3, height: CC - 3, rx: 3, fill: GCB, stroke: GC, 'stroke-width': 1.8 }) });
const cSide = txt(cs, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 20, fill: GC, 'font-weight': 600 });
const tCs = [wt('C2', 'One'), wt('C2', 'Nine'), wt('C2', 'Thirty'), wt('C2', 'hundred')], CSIDE = [1, 3, 6, 10];
const cSideOf = t => tCs.reduce((a, tt, i) => t >= tt - 0.1 ? CSIDE[i] : a, 0);
let cLast = -1;

/* ---------- S: side by side ---------- */
$('#s1F').innerHTML = K(`${T(S2)} = \\dfrac{${n_}(${n_} + 1)(2${n_} + 1)}{6}`);
$('#s2F').innerHTML = K(`${G(S3)} = \\left(\\dfrac{${n_}(${n_} + 1)}{2}\\right)^2`);
$('#s1E').innerHTML = K(`${n_} = 3:\\ \\ 1 + 4 + 9 = \\tfrac{3 \\cdot 4 \\cdot 7}{6} = 14`);
$('#s2E').innerHTML = K(`${n_} = 3:\\ \\ 1 + 8 + 27 = 6^2 = 36`);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Cubes are easier: square the staircase sum.' });
const th1 = PUC.think($('#th1'), { q: 'Is the sum of the first n cubes always a perfect square?', opts: ['Yes', 'No'], right: 0, why: 'It equals (n(n + 1) ÷ 2)², and n(n + 1) ÷ 2 is always a whole number.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${B(S1)} = ${F1} \\qquad ${T(S2)} = ${F2} \\qquad ${G(S3)} = \\left(${F1}\\right)^2`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find the sum of the first 10 squares:<br>${K(`1 + 4 + 9 + \\cdots + 100`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${n_} = 10`)],
  [K(`${T(S2)} = \\tfrac{10 \\times 11 \\times 21}{6}`)],
  [K(`= \\tfrac{2310}{6}`)],
  [K(`= \\mathbf{385}`)],
  [K(`\\text{cubes: } \\left(\\tfrac{10 \\times 11}{2}\\right)^2 = 55^2 = 3025`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), wt('W5', 'gives'), T0('W6'), T0('W7')];
const ws = $('#wS'), WB = 520, WX = i => 52 + i * 68;
mk(ws, 'line', { x1: 36, y1: WB, x2: 748, y2: WB, stroke: C.ink, 'stroke-width': 3 });
const wBars = Array.from({ length: 10 }, (_, i) => { const k = i + 1, h = Math.max(4, 280 * k * k / 100); const g = mk(mk(ws, 'g', {}), 'g', {}); const r = mk(g, 'rect', { x: WX(i), y: WB - h, width: 50, height: h, rx: 5, fill: TCB, stroke: TC, 'stroke-width': 2.5 }); txt(g, WX(i) + 25, WB - h - 10, k * k, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); return { g, r }; });
$('#wCu').innerHTML = `Cubes 1 to 10: ${K(`55^2 = 3025`)}`;
const tWa = wt('W4', 'Put'), tWb = T1('W6');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`1^2 + 2^2 + 3^2 = (1 + 2 + 3)^2 = 36`), right: K(`1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14`) });
$('#tR').innerHTML = `<div class="lbl" style="position:static">THREE TERMS · KEEP THEM APART</div><div class="k" id="tR1">${K(`${T(S2)} = 14`)}</div><div class="k" id="tR2">${K(`(${B(S1)})^2 = 36 = ${G(S3)}`)}</div>`;
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A series like 1 + 2·3 + 3·5 + ...: split it into Σk² and Σk, then use the formulas.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find ${K(`\\displaystyle\\sum_{k=1}^{10} k\\,(k + 1)`)}`,
  opts: ['385', '440', '495', '3025'], right: 1, optW: 474, optY: 320 });
const so = PUC.solution($('#so'), [[K(`k(k + 1) = k^2 + k`)], [K(`\\textstyle\\sum k^2 = 385`)], [K(`\\textstyle\\sum k = 55`)], [K(`385 + 55 = 440`)], ['A forgets the + k']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Open'), wt('A3', 'squares'), wt('A3', 'fifty'), wt('A4', 'Add'), wt('A4', 'trap')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 520, title: 'Recap · sum of special series', y0: 92, dy: 90, txt: [0, 0, 0, 1, 1],
  lines: [K(`${B(S1)} = ${F1}`), K(`${T(S2)} = ${F2}`), K(`${G(S3)} = \\big(${F1}\\big)^2`),
    '<b>Σ</b> means add them all up, from k = 1 to n', '<b>Trap</b>: Σk² is not (Σk)². In fact (Σk)² = Σk³'] });
const YQ = ['What does the sigma sign mean?', 'Find 1 + 4 + 9 + ... up to the 5th square.', 'Why is the sum of cubes always a perfect square?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'CHAPTER 8 COMPLETE', topic: 'Every episode: PUC Maths | Class 11 playlist', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tStr - 0.3, 1.04, 960, 560], [T1('D4') + 0.2, 1, 960, 540]]);

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
    hSq.forEach((s, i) => { M.vis(s.g, t, tHs[i] - 0.1, 1e9, { dy: 16, fade: 0.15 }); M.vis(s.lb, t, tHs[i], 1e9, { dy: 0 }); });
    const c = tHs.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, 0); M.setT($('#hT'), String(HT[c]));
    M.vis($('#sH .hv'), t, tMorph + 0.3, 1e9, { dy: 10 });
    M.vis($('#hQ1'), t, wt('H3', 'ten') - 0.1, 1e9, POP); M.vis($('#hQ2'), t, wt('H3', 'hundred') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'formula') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pS'), t, wt('P1', 'sigma') - 0.1, 1.0);
    M.vis($('#pEx'), t, T1('P2') - 0.3, 1e9, { dy: 12 });
    AN.forEach((_, i) => M.vis($('#pan' + i), t, [wt('P1', 'add'), wt('P2', 'one'), wt('P2', 'way')][i] - 0.1, 1e9, POP));
    M.vis($('#pb'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    pBlk.forEach((b, i) => M.vis(b.r, t, (b.blue ? wt('P3', 'staircase') : wt('P3', 'gives')) + (i % 6) * 0.03, 1e9, { dy: b.blue ? 0 : -30, fade: 0.15 }));
    M.vis(pLab, t, wt('P3', 'gives') + 0.4, 1e9, { dy: 0 });
    PUC.write($('#pF'), t, wt('P3', 'times') - 0.2, 0.9);
    M.vis($('#pG'), t, wt('P4', 'dropped') - 0.1, 1e9, POP);
  }

  /* L: live squares */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const n = ln(t);
    lSq.forEach((g, i) => M.vis(g, t, i < n ? tLn[i] - 0.1 : null, i < n ? 1e9 : -1, { dy: 16, fade: 0.15 }));
    if (n !== lLast) { lLast = n; $('#lSum').innerHTML = K(Array.from({ length: Math.max(n, 1) }, (_, i) => (i + 1) ** 2).join(' + ') + ` = ${SQ[Math.max(n, 1) - 1]}`); M.setT($('#lN'), `n = ${Math.max(n, 1)}`); M.setT($('#lT'), `total = ${SQ[Math.max(n, 1) - 1]}`); }
    M.vis($('#lN'), t, tLn[0] - 0.1, 1e9, { dy: 10 }); M.vis($('#lSum'), t, tLn[0], 1e9, { dy: 10 }); M.vis($('#lT'), t, tLn[0], 1e9, { dy: 10 });
    $('#sL').querySelectorAll('.th').forEach((e, i) => M.vis(e, t, tL1 + 0.5 + i * 0.1, 1e9, { dy: 8 }));
    SQ.forEach((_, i) => { M.vis($('#lr' + i), t, i < n ? tLn[i] : null, i < n ? 1e9 : -1, { dx: -16, dy: 0 });
      const tr = wt('L4', 'six') + 0.2 + i * 0.25; PUC.write($('#lk' + i), t, tr, 0.5); M.vis($('#lc' + i), t, tr + 0.4, 1e9, { ...POP, sc: 0.4 }); });
    PUC.write($('#lRh'), t, wt('L4', 'Try') - 0.1, 0.8);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D3') - 0.1, out, { dx: 60, dy: 0, ...o });
    TLR.forEach((_, i) => M.vis($('#dl' + i), t, wt('D3', ['one', 'two', 'three', 'all', 'n'][i], i === 1 ? 1 : 0) - 0.1, 1e9, { dx: -14, dy: 0 }));
    ['x1a', 'x1b', 'x2a', 'x2b', 'x3a', 'xnb'].forEach((id, j) => { const u = M.io((t - tStr - Math.floor(j / 2) * 0.35) / 0.35); $('#' + id + ' i').style.transform = `scaleX(${u.toFixed(3)})`; $('#' + id).style.opacity = (1 - 0.55 * u).toFixed(3); });
    M.vis($('#dLn'), t, wt('D4', 'Only') - 0.2, 1e9, { dy: 0 }); M.vis($('#dSum'), t, wt('D4', 'survives') - 0.2, 1e9, { dy: 10 });
  }

  /* C: cubes */
  const cOn = t >= tC1 - 0.1 && t < tS1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('S1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    CR.forEach((_, i) => PUC.write($('#cr' + i), t, tCs[i] - 0.1, 0.7));
    PUC.write($('#cr4'), t, wt('C3', 'So') - 0.2, 1.0);
    M.vis($('#cr'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const s = cSideOf(t);
    if (s !== cLast) { cLast = s; cCells.forEach(({ i, j, r }) => M.hide(r, !(i < s && j < s))); M.setT(cSide, s ? `side ${s}` : ''); attr(cSide, 'x', (CX0 + s * CC / 2).toFixed(1)); attr(cSide, 'y', (CY0 + s * CC + 28).toFixed(1)); }
    M.vis(cs, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 });
    // the side lengths 1, 3, 6, 10 are the staircase sums: flash the side label in blue when said
    const fl = M.io((t - wt('C3', 'sides')) / 0.3); attr(cSide, 'fill', mix(GC, BC, fl));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#s1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s1F'), t, tS1 + 0.4, 0.9); M.vis($('#s1E'), t, wt('S1', 'six') - 0.2, 1e9, { dy: 10 }); M.vis($('#s1P'), t, wt('S1', 'top') - 0.3, 1e9, POP);
    M.vis($('#s2'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s2F'), t, T0('S2') + 0.2, 0.9); M.vis($('#s2E'), t, wt('S2', 'square') - 0.1, 1e9, { dy: 10 }); M.vis($('#s2P'), t, wt('S2', 'over') - 0.1, 1e9, POP);
    avA(t, T1('S2') - 0.4, out);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'perfect') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'It') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Three') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'formulas') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wBars.forEach((b, i) => M.vis(b.g, t, T0('W2') + 0.7 + i * 0.1, 1e9, { dy: 20, fade: 0.12 }));
    const u = M.clamp((t - tWa) / Math.max(1, tWb - tWa)), lit = Math.floor(u * 10 + 0.0001);
    let tot = 0; wBars.forEach((b, i) => { const on = i < lit; if (on) tot += (i + 1) ** 2; attr(b.r, 'fill', on ? mix(TCB, TC, 0.35) : TCB); });
    M.setT($('#wTv'), String(tot)); M.vis($('#wTot'), t, tWa - 0.2, 1e9, { dy: 10 });
    M.vis($('#wCu'), t, wt('W7', 'cubes') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'fourteen') - 0.3 });
    M.vis($('#tR'), t, wt('X2', 'Try') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'Squaring') - 0.1, 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'asked', 1) });
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
