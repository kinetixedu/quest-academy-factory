// PUC Maths Ep 15: Relations and their domains and ranges (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 2): first set, first elements and the domain blue; second set, second elements and the range teal; kept pairs / arrows coral accent
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1', PC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`;
const pin = (p, x, y) => mk(mk(p, 'g', { transform: `translate(${x},${y})` }), 'g', {});
const chip = (p, x, y, s, col, bg, w, mono) => { const g = pin(p, x, y); const r = mk(g, 'rect', { x: -w / 2, y: -24, width: w, height: 48, rx: 12, fill: bg, stroke: col, 'stroke-width': 2 }); const tt = txt(g, 0, 9, s, { 'text-anchor': 'middle', 'font-family': mono ? 'IBM Plex Mono' : 'Poppins', 'font-size': 24, 'font-weight': 600, fill: col }); return { g, r, tt }; };
const grow = (a, x1, y1, x2, y2, u) => { if (u <= 0.001) { M.hide(a.g, true); return; } a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); };
const tag = (p, x, y, s, col, fg = '#fff') => { const g = pin(p, x, y); const w = s.length * 12 + 24; mk(g, 'rect', { x: -w / 2, y: -18, width: w, height: 36, rx: 9, fill: col }); txt(g, 0, 7, s, { 'text-anchor': 'middle', 'font-size': 19, 'font-weight': 600, fill: fg }); return g; };

/* data: five students, four blood groups, four true pairs (Joel not tested yet) */
const ST = ['Ravi', 'Meera', 'Kiran', 'Sana', 'Joel'], GR = ['A', 'B', 'AB', 'O'];
const TRUE = { 0: 3, 1: 0, 2: 1, 3: 3 };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tR1 = T0('R1'), tD1 = T0('D1'), tM1 = T0('M1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tC1 = T0('C1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['5 CLASSMATES', 'Ravi, Meera, Kiran ...', AC], ['4 BLOOD GROUPS', 'A, B, AB, O', BC], ['20 PAIRS', 'which are true?', PC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Five') - 0.05, wt('H1', 'four') - 0.05, wt('H1', 'twenty') - 0.05];

/* ---------- H: donation list ---------- */
$('#hRows').innerHTML = ST.map((s, i) => `<div class="dl" id="hr${i}" style="top:${84 + i * 80}px"><div class="nm" style="color:${AC}">${s}</div>${i < 4 ? `<div class="gp">${GR[TRUE[i]]}</div>` : '<div class="gp no">NOT TESTED YET</div>'}</div>`).join('');

/* arrow diagram builder: S oval (5 students) -> G oval (4 groups) */
const SY = [150, 240, 330, 420, 510], GY = [200, 280, 360, 440];
const diagram = svg => {
  mk(svg, 'ellipse', { cx: 210, cy: 330, rx: 140, ry: 240, fill: ACB, stroke: AC, 'stroke-width': 3 });
  const gOv = mk(svg, 'ellipse', { cx: 590, cy: 320, rx: 110, ry: 190, fill: BCB, stroke: BC, 'stroke-width': 3 });
  txt(svg, 74, 120, 'S', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 40, fill: AC });
  txt(svg, 676, 150, 'G', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 40, fill: BC });
  const s = ST.map((n, i) => chip(svg, 210, SY[i], n, AC, '#fff', 150)), g = GR.map((n, j) => chip(svg, 590, GY[j], n, BC, '#fff', 96));
  return { s, g, gOv };
};
const AX1 = 285, AX2 = 542;

/* ---------- R: live test of all 20 pairs ---------- */
const rs = $('#rS'), RD = diagram(rs);
const rFaint = [], rKeep = [];
ST.forEach((_, i) => GR.forEach((_, j) => { const a = PUC.arrow(rs, '#B8BCC6', 2, 10); a.set(AX1, SY[i], AX2, GY[j]); rFaint.push({ i, j, a }); }));
Object.entries(TRUE).forEach(([i, j]) => rKeep.push({ i: +i, j, a: PUC.arrow(rs, PC, 4, 14) }));
const rg = $('#rG'), GXc = i => 250 + i * 100, GYr = j => 400 - j * 76;
mk(rg, 'line', { x1: 196, y1: 446 - 18, x2: 700, y2: 446 - 18, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(rg, 'line', { x1: 196, y1: 428, x2: 196, y2: 140, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
ST.forEach((s, i) => txt(rg, GXc(i), 460, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 20, 'font-weight': 600, fill: AC }));
GR.forEach((s, j) => txt(rg, 180, GYr(j) + 7, s, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: BC }));
const rDots = []; ST.forEach((_, i) => GR.forEach((_, j) => { const g = pin(rg, GXc(i), GYr(j)); const c = mk(g, 'circle', { r: 12, fill: C.ink }); rDots.push({ i, j, g, c }); }));
const tTest0 = wt('R3', 'test'), tTest1 = wt('R4', 'survive'), dTest = Math.min(0.3, Math.max(0.14, (tTest1 - tTest0) / 20));
const tPair = k => tTest0 + k * dTest;
let rLast = '';

/* ---------- D: definition + image ---------- */
$('#dfF').innerHTML = K(`R \\subseteq ${ac('A')} \\times ${bc('B')}`);
const is = $('#iS'), iA = chip(is, 220, 220, 'Ravi', AC, ACB, 150), iB = chip(is, 560, 220, 'O', BC, BCB, 96);
const iAr = PUC.arrow(is, PC, 5, 16);
const iL1 = txt(is, 220, 290, 'first element', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: AC }), iL2 = txt(is, 560, 290, 'its image', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: BC });
$('#iF').innerHTML = K(`(${ac('x')},\\ ${bc('y')}) \\in R:\\ \\ ${bc('y')} \\text{ is the image of } ${ac('x')}`);

/* ---------- M: domain, range, codomain ---------- */
const ms = $('#mS');
const mDom = mk(ms, 'rect', { x: 120, y: 118, width: 180, height: 334, rx: 18, fill: 'none', stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '10 7' });
const mRng = [0, 1, 3].map(j => mk(ms, 'rect', { x: 530, y: GY[j] - 32, width: 120, height: 64, rx: 16, fill: BC, opacity: 0.22 }));
const MD = diagram(ms);
const mCod = mk(ms, 'ellipse', { cx: 590, cy: 320, rx: 126, ry: 206, fill: 'none', stroke: PC, 'stroke-width': 4, 'stroke-dasharray': '10 7' });
const mAr = Object.entries(TRUE).map(([i, j]) => { const a = PUC.arrow(ms, PC, 4, 14); a.set(AX1, SY[+i], AX2, GY[j]); return a; });
const MR = [['DOMAIN', AC, K(`\\{${ac('\\text{Ravi, Meera, Kiran, Sana}')}\\}`), 'first elements'], ['RANGE', BC, K(`\\{${bc('O,\\ A,\\ B')}\\}`), 'second elements'], ['CODOMAIN', PC, K(`G = \\{${bc('A,\\ B,\\ AB,\\ O')}\\}`), 'the whole second set']];
$('#mRows').innerHTML = MR.map(([k, col, v, w], i) => `<div class="ts" id="mr${i}" style="top:${84 + i * 148}px"><div class="k" style="color:${col}">${k}</div><div class="w">${w}</div><div class="v">${v}</div></div>`).join('');
const tM = [wt('M2', 'domain'), wt('M3', 'range'), wt('M4', 'codomain')];

/* ---------- S: range vs codomain ---------- */
const gOval = (svg, cod) => { mk(svg, 'ellipse', { cx: 392, cy: 230, rx: 300, ry: 130, fill: BCB, stroke: BC, 'stroke-width': 3 }); return [[0, 270, 190], [1, 392, 170], [2, 514, 190], [3, 392, 280]].map(([j, x, y]) => ({ j, c: chip(svg, x, y, GR[j], BC, '#fff', 96) })); };
const srC = gOval($('#srS')), scC = gOval($('#scS'));
const scOut = mk($('#scS'), 'ellipse', { cx: 392, cy: 230, rx: 318, ry: 148, fill: 'none', stroke: PC, 'stroke-width': 4, 'stroke-dasharray': '10 7' });
$('#srF').innerHTML = K(`\\text{Range} = \\{${bc('O,\\ A,\\ B')}\\}`);
$('#scF').innerHTML = K(`\\text{Codomain} = \\{${bc('A,\\ B,\\ AB,\\ O')}\\}`);
const th1 = PUC.think($('#th1'), { q: 'Joel tests: group AB. Does the range change?', opts: ['Yes, it grows', 'No'], right: 0, why: 'A new arrow lands on AB: range = {A, B, AB, O}. The codomain was always G.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`R \\subseteq ${ac('A')} \\times ${bc('B')}`);

/* ---------- C: number of relations ---------- */
const CS = [[`R \\subseteq ${ac('A')} \\times ${bc('B')}`, 'any subset of A × B is a relation'],
  [`n(${ac('A')} \\times ${bc('B')}) = ${ac('p')}${bc('q')}`, 'p elements times q elements (Ep 13)'],
  [`\\text{each pair: keep or leave} \\;\\to\\; 2`, 'two choices for every pair'],
  [`2 \\times 2 \\times \\cdots \\times 2 = 2^{${ac('p')}${bc('q')}}`, 'one factor 2 for each of the pq pairs'],
  [`p = q = 2:\\ \\ 2^{4} = ${pc('16')}`, 'from no pairs at all to every pair']];
$('#cSt').innerHTML = `<div class="hiBox" id="cHi" style="left:20px;width:744px;height:92px"></div>` + CS.map(([f, w], i) => `<div class="st" id="cs${i}" style="top:${84 + i * 94}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tCs = [wt('C2', 'relation'), wt('C3', 'If'), wt('C4', 'Each'), wt('C5', 'Two'), wt('C6', 'Watch')];
const CP = [['1', 'x'], ['1', 'y'], ['2', 'x'], ['2', 'y']];
$('#cSw').innerHTML = CP.map(([a, b], i) => `<div class="sw" id="sw${i}" style="left:${36 + (i % 2) * 340}px;top:${180 + Math.floor(i / 2) * 100}px"><i><b></b></i>(<span style="color:${AC}">${a}</span>, <span style="color:${BC}">${b}</span>)</div>`).join('');
const tCy0 = wt('C6', 'Four'), tCy1 = T1('C6') + 0.5;
const cK = t => Math.max(0, Math.min(15, Math.floor((t - tCy0) / ((tCy1 - tCy0) / 16))));
let cLast = -1;

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`A = \\{1, 2, 3, 4, 5, 6\\},\\ \\ R = \\{(x, y) : y = 2x\\}`)}<br>Find R, its domain, range and codomain.`;
const wsol = PUC.solution($('#wl'), [
  [K(`2 \\times 4 = 8 \\notin A`), 'so x stops at 3'],
  [K(`R = \\{(${ac('1')}, ${bc('2')}),\\ (${ac('2')}, ${bc('4')}),\\ (${ac('3')}, ${bc('6')})\\}`)],
  [K(`\\text{Domain} = \\{${ac('1, 2, 3')}\\}`)],
  [K(`\\text{Range} = \\{${bc('2, 4, 6')}\\}`)],
  [K(`\\text{Codomain} = A = \\{1, \\dots, 6\\}`), 'a relation on A']], { label: 'WORKED EXAMPLE', y0: 176, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'eight'), wt('W4', 'So'), wt('W5', 'domain'), wt('W6', 'range'), wt('W7', 'codomain')];
const ws = $('#wS'), WY = i => 136 + i * 70;
mk(ws, 'ellipse', { cx: 200, cy: 311, rx: 104, ry: 236, fill: ACB, stroke: AC, 'stroke-width': 3 });
mk(ws, 'ellipse', { cx: 584, cy: 311, rx: 104, ry: 236, fill: BCB, stroke: BC, 'stroke-width': 3 });
const wDom = mk(ws, 'rect', { x: 160, y: WY(0) - 30, width: 80, height: WY(2) - WY(0) + 60, rx: 16, fill: 'none', stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '9 6' });
const wRng = [1, 3, 5].map(i => mk(ws, 'rect', { x: 548, y: WY(i) - 28, width: 72, height: 56, rx: 14, fill: BC, opacity: 0.22 }));
const wL = [1, 2, 3, 4, 5, 6].map((n, i) => chip(ws, 200, WY(i), String(n), AC, '#fff', 64, true)), wR = [1, 2, 3, 4, 5, 6].map((n, i) => chip(ws, 584, WY(i), String(n), BC, '#fff', 64, true));
const wAr = [[0, 1], [1, 3], [2, 5]].map(([i, j]) => ({ i, j, a: PUC.arrow(ws, PC, 4, 14) }));
const wX = [3, 4, 5].map(i => txt(ws, 262, WY(i) + 7, `→ ${2 * (i + 1)} ✗`, { 'font-size': 20, 'font-weight': 600, fill: C.red }));
const tWa = [wt('W3', 'two', 1), wt('W3', 'four'), wt('W3', 'six')], tWx = wt('W3', 'eight');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`2^3 \\times 2^2 = 32 \\text{ relations}`), right: K(`n(A \\times B) = 3 \\times 2 = 6 \\;\\Rightarrow\\; 2^6 = 64`) + '&nbsp; relations' });
const ts = $('#tS'), TXc = i => 250 + i * 80, TYr = j => 170 - j * 76;
const tDots = []; [0, 1, 2].forEach(i => [0, 1].forEach(j => { const g = pin(ts, TXc(i), TYr(j)); mk(g, 'circle', { r: 14, fill: PC }); tDots.push(g); }));
const tLb = txt(ts, 250, 236, '6 pairs: each kept or left', { 'font-size': 20, 'font-weight': 600, fill: C.ink2 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find the domain and range · count the pairs in a relation · count relations' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 860,
  q: `${K(`A = \\{1, 2, \\dots, 10\\},\\ \\ R = \\{(x, y) \\in A \\times A : x + 2y = 12\\}`)}<br>How many elements are in (Domain of R) ∪ (Range of R)?`,
  opts: ['10', '8', '6', '5'], right: 1, optW: 474, optY: 290 });
const so = PUC.solution($('#so'), [
  [K(`x = 12 - 2y,\\ \\ y = 1, \\dots, 5`)],
  [K(`y = 6 \\Rightarrow x = 0 \\notin A`)],
  [K(`\\text{Dom} = \\{${ac('2, 4, 6, 8, 10')}\\}`)],
  [K(`\\text{Rng} = \\{${bc('1, 2, 3, 4, 5')}\\}`)],
  [K(`5 + 5 - 2 = ${pc('8')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'x'), wt('A3', 'y'), wt('A4', 'domain'), wt('A4', 'range'), wt('A5', 'union')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · relations', y0: 98, dy: 80, txt: [0, 0, 0, 0, 1],
  lines: [K(`R \\subseteq ${ac('A')} \\times ${bc('B')} \\quad \\text{(a chosen set of pairs)}`),
    K(`\\text{Domain} = \\{\\, ${ac('x')} : (${ac('x')}, ${bc('y')}) \\in R \\,\\}`),
    K(`\\text{Range} = \\{\\, ${bc('y')} : (${ac('x')}, ${bc('y')}) \\in R \\,\\} \\subseteq \\text{Codomain} = ${bc('B')}`),
    K(`\\text{Number of relations from } A \\text{ to } B = 2^{${ac('p')}${bc('q')}}`),
    'A relation from A to A is a relation on A'] });
const YQ = ['For R = {(1, 3), (2, 5), (2, 7)}, write the domain and the range.', 'How many relations are there from a 2-element set to a 3-element set?', 'Why is the range always inside the codomain?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 16', topic: 'One roll number, exactly one student: Functions as Mappings', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tTest0 - 0.2, 1.06, 1300, 560], [T1('R4') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tR1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('R1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    ST.forEach((_, i) => { const el = $('#hr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.gp'), t, i < 4 ? wt('H2', 'one') + i * 0.12 : wt('H2', 'Joel'), 1e9, POP); });
    M.vis($('#hP'), t, wt('H2', 'few') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hDi'), t, tH3 + 0.1, 1e9, { dy: 24 });
    M.rise($('#hkQ'), t, T0('H4') + 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#hkP'), t, wt('H5', 'Cartesian') - 0.1, 1e9, POP);
  }

  /* R: live test */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    M.vis($('#ra'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RD.s.forEach((c, i) => M.vis(c.g, t, wt('R1', 'five') + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    RD.g.forEach((c, j) => M.vis(c.g, t, wt('R1', 'four') + j * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    let tested = 0, kept = 0;
    rFaint.forEach((f, k) => {
      const keep = TRUE[f.i] === f.j, tk = tPair(k);
      const on = M.vis(f.a.g, t, wt('R2', 'twenty') + k * 0.03, keep ? tk + 0.15 : tk, { dy: 0, fade: 0.15, outDur: keep ? 0.1 : 0.35, ody: 0 });
      const d = rDots[k], s = M.io((t - tk) / 0.25);
      M.vis(d.g, t, wt('R2', 'twenty') + k * 0.03, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      attr(d.c, 'fill', keep ? mix(C.ink, PC, s) : mix(C.ink, '#E3E5EA', s)); attr(d.c, 'r', keep ? (12 + 4 * s).toFixed(2) : (12 - 4 * s).toFixed(2));
      if (t >= tk) { tested++; if (keep) kept++; }
    });
    rKeep.forEach(r => { const k = r.i * 4 + r.j; grow(r.a, AX1, SY[r.i], AX2, GY[r.j], M.io((t - tPair(k)) / 0.35)); });
    M.vis($('#rg'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const s1 = `tested ${tested} / 20`, s2 = `kept ${kept}`; if (s1 + s2 !== rLast) { rLast = s1 + s2; M.setT($('#rC1'), s1); M.setT($('#rC2'), s2); }
    M.vis($('#rC1'), t, tTest0 - 0.2, 1e9, POP); M.vis($('#rC2'), t, tTest0, 1e9, POP);
    M.vis($('#rP'), t, wt('R4', 'relation') - 0.1, 1e9, POP);
  }

  /* D: definition + image */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('M1');
    M.vis($('#df'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, wt('D1', 'a') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dfL2'), t, wt('D1', 'subset') - 0.1, 1e9, { dy: 10 }); PUC.write($('#dfF'), t, wt('D1', 'subset'), 0.8);
    M.vis($('#di'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(iA.g, t, wt('D2', 'first') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(iL1, t, wt('D2', 'first'), 1e9, { dy: 0 });
    M.vis(iB.g, t, wt('D2', 'second') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    grow(iAr, 300, 220, 508, 220, M.io((t - wt('D3', 'image') + 0.2) / 0.4)); M.vis(iL2, t, wt('D3', 'image'), 1e9, { dy: 0 });
    PUC.write($('#iF'), t, wt('D3', 'If') - 0.05, 1.0);
  }

  /* M: domain range codomain */
  const mOn = t >= tM1 - 0.1 && t < tS1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('S1');
    M.vis($('#ma'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    mAr.forEach((a, k) => M.vis(a.g, t, wt('M1', 'arrows') - 0.2 + k * 0.12, 1e9, { dy: 0, fade: 0.15 }));
    M.vis(mDom, t, tM[0] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const jd = M.io((t - wt('M2', 'Joel') + 0.05) / 0.3); MD.s[4].g.style.opacity = (1 - 0.6 * jd).toFixed(3);
    mRng.forEach((r, k) => M.vis(r, t, wt('M3', 'O') + k * 0.25, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(mCod, t, tM[2] + 0.3, 1e9, { dy: 0, fade: 0.25 });
    M.vis($('#mt'), t, tM[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    MR.forEach((_, i) => { const el = $('#mr' + i); M.vis(el, t, tM[i] - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write(el.querySelector('.v'), t, tM[i] + 0.5, 0.9); });
  }

  /* S: range vs codomain + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#sr'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const hit = M.io((t - wt('S1', 'hit') + 0.1) / 0.3);
    srC.forEach(({ j, c }) => { const h = j !== 2 ? hit : 0; attr(c.r, 'fill', mix('#FFFFFF', BC, h)); attr(c.tt, 'fill', mix(BC, '#FFFFFF', h)); });
    PUC.write($('#srF'), t, wt('S1', 'Here') - 0.1, 0.8); M.vis($('#srP'), t, wt('S1', 'three') - 0.1, 1e9, POP);
    M.vis($('#sc'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(scOut, t, wt('S2', 'everything') - 0.1, 0.8);
    PUC.write($('#scF'), t, wt('S2', 'Here') - 0.1, 0.8); M.vis($('#scP'), t, wt('S2', 'inside') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, tT - 0.05, { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Does') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'new') });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'relation') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'first') - 0.2, 0.8);
  }

  /* C: number of relations + live switches */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('W1');
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    CS.forEach((_, i) => { const el = $('#cs' + i); M.vis(el.querySelector('.n'), t, tCs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCs[i], 0.8); M.vis(el.querySelector('.why'), t, tCs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tCs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 94]), M.SOFT)(t);
    const hb = $('#cHi'); M.vis(hb, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#cl'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    CP.forEach((_, i) => M.vis($('#sw' + i), t, wt('C3', 'pairs') + i * 0.12, 1e9, { dy: 12 }));
    const k = t < tCy0 ? -1 : cK(t);
    if (k !== cLast) {
      cLast = k;
      CP.forEach((_, i) => { const on = k >= 0 && (k >> (3 - i)) & 1, el = $('#sw' + i); el.style.borderColor = on ? PC : C.line; el.style.background = on ? C.ac2 : '#fff'; el.querySelector('i').style.background = on ? PC : C.dim; el.querySelector('i b').style.left = on ? '21px' : '3px'; });
      const L = CP.filter((_, i) => k >= 0 && (k >> (3 - i)) & 1).map(([a, b]) => `(${ac(a)},\\ ${bc(b)})`);
      $('#cRo').innerHTML = k < 0 ? '' : K(`R = ${L.length ? `\\{${L.join(',\\ ')}\\}` : '\\varnothing'}`);
      $('#cRd').innerHTML = k < 0 ? `${sp4('4')} pairs` : `relation <span style="color:${PC}">${k + 1}</span> of 16`;
    }
    M.vis($('#cRd'), t, wt('C3', 'pairs') - 0.1, 1e9, { dy: 10 });
    M.vis($('#cRo'), t, tCy0, 1e9, { dy: 0 });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wL.concat(wR).forEach((c, i) => M.vis(c.g, t, T0('W2') + 0.5 + (i % 6) * 0.06 + (i >= 6 ? 0.2 : 0), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    wAr.forEach((p, k) => grow(p.a, 236, WY(p.i), 548, WY(p.j), M.io((t - tWa[k] + 0.1) / 0.4)));
    wX.forEach((e, k) => M.vis(e, t, tWx - 0.3 + k * 0.15, 1e9, { dy: 0, dx: -8 }));
    M.vis(wDom, t, tW[2], 1e9, { dy: 0, fade: 0.2 }); wRng.forEach((r, k) => M.vis(r, t, tW[3] + k * 0.15, 1e9, { dy: 0, fade: 0.2 }));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'subsets') - 0.1, tRight: wt('X3', 'So') });
    tDots.forEach((d, i) => M.vis(d, t, wt('X3', 'six') - 0.2 + i * 0.08, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 })); M.vis(tLb, t, wt('X3', 'pairs'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'as') });
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
function sp4(s) { return `<span style="color:${PC}">${s}</span>`; }

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
