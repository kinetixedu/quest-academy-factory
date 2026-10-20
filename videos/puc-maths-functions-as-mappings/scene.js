// PUC Maths Ep 16: Functions as mappings (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 2): set A and its elements (inputs, preimages) blue; set B and its elements (images) teal; arrows / pairs coral; pass green, fail red
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1', PC = C.ac;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`;
const pr = (a, b) => `(${ac(a)},\\ ${bc(b)})`;
const pin = (p, x, y) => mk(mk(p, 'g', { transform: `translate(${x},${y})` }), 'g', {});
const chip = (p, x, y, s, col, bg, w, mono = true) => { const g = pin(p, x, y); const r = mk(g, 'rect', { x: -w / 2, y: -24, width: w, height: 48, rx: 12, fill: bg, stroke: col, 'stroke-width': 2 }); const tt = txt(g, 0, 9, s, { 'text-anchor': 'middle', 'font-family': mono ? 'IBM Plex Mono' : 'Poppins', 'font-size': 24, 'font-weight': 600, fill: col }); return { g, r, tt }; };
const grow = (a, x1, y1, x2, y2, u) => { if (u <= 0.001) { M.hide(a.g, true); return; } a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); };
const tag = (p, x, y, s, col, fg = '#fff') => { const g = pin(p, x, y); const w = s.length * 12 + 24; mk(g, 'rect', { x: -w / 2, y: -18, width: w, height: 36, rx: 9, fill: col }); txt(g, 0, 7, s, { 'text-anchor': 'middle', 'font-size': 19, 'font-weight': 600, fill: fg }); return g; };
const ovals = (svg, ax, bx, cy, ry1, ry2, la = 'A', lb = 'B') => {
  mk(svg, 'ellipse', { cx: ax, cy, rx: 100, ry: ry1, fill: ACB, stroke: AC, 'stroke-width': 3 });
  mk(svg, 'ellipse', { cx: bx, cy, rx: 100, ry: ry2, fill: BCB, stroke: BC, 'stroke-width': 3 });
  txt(svg, ax - 96, cy - ry1 + 14, la, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 40, fill: AC, 'text-anchor': 'end' });
  txt(svg, bx + 96, cy - ry2 + 14, lb, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 40, fill: BC });
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tD1 = T0('D1'), tL1 = T0('L1'), tG1 = T0('G1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tV1 = T0('V1'), tC1 = T0('C1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tV1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ROLL NO. 12', 'exactly one name', AC], ['BLOOD GROUP O', 'two names, or none', BC], ['WHY?', 'one rule decides', PC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'twelve') - 0.05, T0('H2') - 0.3, T0('H2') + 0.4];

/* ---------- H: register ---------- */
const REG = [['11', 'Joel'], ['12', 'Kiran'], ['13', 'Meera'], ['14', 'Ravi'], ['15', 'Sana']];
$('#hRows').innerHTML = REG.map(([r, n], i) => `<div class="dl" id="hr${i}" style="top:${84 + i * 72}px"><div class="nm" style="color:${AC};font-family:'IBM Plex Mono'">ROLL ${r}</div><div class="gp" style="background:${BCB};color:${BC};min-width:150px">${n}</div></div>`).join('');

/* ---------- D: two checks ---------- */
const ck0 = $('#ck0S'), ck1 = $('#ck1S');
const mini = (svg, arrows, bad) => { // one element on the left, 0 or 2 arrows
  const a = chip(svg, 120, 160, '2', AC, '#fff', 56); const bs = [[440, 130], [440, 196]].map(([x, y], i) => chip(svg, x, y, ['5', '6'][i], BC, '#fff', 56));
  const ar = arrows.map(j => { const r = PUC.arrow(svg, C.red, 4, 12); r.set(152, 160, 408, [130, 196][j]); return r; });
  const x = tag(svg, 620, 160, bad, C.red); return { a, bs, ar, x };
};
const D0 = mini(ck0, [], 'no image'), D1 = mini(ck1, [0, 1], 'two images');

/* ---------- L: live function test ---------- */
const ls = $('#lS'), AY = [220, 320, 420], BY = [190, 280, 370, 460];
ovals(ls, 200, 590, 320, 170, 200);
const lA = [1, 2, 3].map((n, i) => chip(ls, 200, AY[i], String(n), AC, '#fff', 64)), lB = [4, 5, 6, 7].map((n, j) => chip(ls, 590, BY[j], String(n), BC, '#fff', 64));
const RELS = [[[0, 0], [1, 1], [2, 1]], [[0, 0], [0, 2], [1, 1], [2, 3]], [[0, 0], [2, 2]]];
const lAr = RELS.map(r => r.map(([i, j]) => ({ i, j, a: PUC.arrow(ls, PC, 4, 14) })));
const lRing = mk(mk(ls, 'g', {}), 'circle', { r: 38, fill: 'none', stroke: PC, 'stroke-width': 4 });
const lBad = [1, 2].map(() => mk(ls, 'circle', { r: 38, fill: 'none', stroke: C.red, 'stroke-width': 5 }));
const lCnt = [0, 1, 2].map(i => { const g = pin(ls, 92, AY[i]); const c = mk(g, 'circle', { r: 20, fill: C.ok }); const tt = txt(g, 0, 7, '1', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: '#fff' }); return { g, c, tt }; });
const tL = [T0('L2'), T0('L3'), T0('L4'), T0('G1')];
const tLa = [[wt('L2', 'One', 1), wt('L2', 'Two'), wt('L2', 'Three')], [wt('L3', 'four'), wt('L3', 'six'), T0('L3') + 0.3, T0('L3') + 0.45], [T0('L4') + 0.3, T0('L4') + 0.45]];
const tScan = [[wt('L2', 'One', 1), wt('L2', 'Two'), wt('L2', 'Three')], [wt('L3', 'One', 1)], [wt('L4', 'Two')]];
const tVd = [wt('L2', 'passes'), wt('L3', 'fails'), wt('L4', 'fails')];
const LOG = [[K(`f = \\{${pr('1', '4')}, ${pr('2', '5')}, ${pr('3', '5')}\\}`), 'PASS', C.ok, 'each element: exactly one arrow'],
  [K(`g = \\{${pr('1', '4')}, ${pr('1', '6')}, ${pr('2', '5')}, ${pr('3', '7')}\\}`), 'FAIL', C.red, '1 has two images'],
  [K(`h = \\{${pr('1', '4')}, ${pr('3', '6')}\\}`), 'FAIL', C.red, '2 has no image']];
$('#lLog').innerHTML = LOG.map(([v, r, col, w], i) => `<div class="lg" id="lg${i}" style="top:${84 + i * 148}px"><div class="k" style="color:var(--mute)">TEST ${i + 1}</div><div class="r" style="background:${col}">${r}</div><div class="v">${v}</div><div class="w">${w}</div></div>`).join('');

/* ---------- G: grid picture ---------- */
const gridF = (svg, x0, y0, sx, sy, fs) => {
  const X = i => x0 + sx * (i + 1), Y = j => y0 - sy * (j + 1);
  mk(svg, 'line', { x1: x0, y1: y0, x2: X(2) + sx * 0.7, y2: y0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(svg, 'line', { x1: x0, y1: y0, x2: x0, y2: Y(3) - sy * 0.6, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  [1, 2, 3].forEach((n, i) => txt(svg, X(i), y0 + fs + 10, n, { 'text-anchor': 'middle', 'font-size': fs, 'font-weight': 600, fill: AC }));
  [4, 5, 6, 7].forEach((n, j) => txt(svg, x0 - 14, Y(j) + fs * 0.35, n, { 'text-anchor': 'end', 'font-size': fs, 'font-weight': 600, fill: BC }));
  return { X, Y };
};
const gs = $('#gS'), GF = gridF(gs, 200, 440, 140, 80, 24);
const gBand = [0, 1, 2].map(i => mk(gs, 'rect', { x: GF.X(i) - 40, y: GF.Y(3) - 40, width: 80, height: 440 - GF.Y(3) + 20, rx: 14, fill: C.okBg }));
gs.insertBefore(gBand[0], gs.firstChild); gs.insertBefore(gBand[1], gs.firstChild); gs.insertBefore(gBand[2], gs.firstChild);
const gDots = RELS[0].map(([i, j]) => { const g = pin(gs, GF.X(i), GF.Y(j)); mk(g, 'circle', { r: 16, fill: PC }); return g; });
const gOne = [0, 1, 2].map(i => txt(gs, GF.X(i), 520, '1 dot', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ok }));
const gs2 = $('#gS2'), GG = gridF(gs2, 90, 400, 70, 66, 20), GH = gridF(gs2, 450, 400, 70, 66, 20);
const gG = RELS[1].map(([i, j]) => { const g = pin(gs2, GG.X(i), GG.Y(j)); mk(g, 'circle', { r: 13, fill: PC }); return g; });
const gH = RELS[2].map(([i, j]) => { const g = pin(gs2, GH.X(i), GH.Y(j)); mk(g, 'circle', { r: 13, fill: PC }); return g; });
const gGb = mk(gs2, 'rect', { x: GG.X(0) - 28, y: GG.Y(3) - 30, width: 56, height: 400 - GG.Y(3) + 14, rx: 12, fill: 'none', stroke: C.red, 'stroke-width': 4 });
const gHb = mk(gs2, 'rect', { x: GH.X(1) - 28, y: GH.Y(3) - 30, width: 56, height: 400 - GH.Y(3) + 14, rx: 12, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const gGt = tag(gs2, 200, 490, 'g: 2 dots in column 1', C.red), gHt = tag(gs2, 570, 490, 'h: column 2 empty', C.red);
txt(gs2, 200, 110, 'g', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 34, 'font-weight': 700, fill: C.ink });
txt(gs2, 560, 110, 'h', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 34, 'font-weight': 700, fill: C.ink });

/* ---------- S: arrows out vs arrows in ---------- */
const soS = $('#soS'), siS = $('#siS');
ovals(soS, 200, 570, 260, 120, 170); ovals(siS, 200, 570, 260, 150, 170);
const so1 = chip(soS, 200, 260, '1', AC, '#fff', 64), soB = [[4, 170], [5, 260], [6, 350]].map(([n, y]) => chip(soS, 570, y, String(n), BC, '#fff', 64));
const soA = [170, 350].map(y => { const a = PUC.arrow(soS, C.red, 5, 15); return { y, a }; });
const soX = tag(soS, 392, 260, '1 has 2 images', C.red);
const siA2 = [[2, 200], [3, 320]].map(([n, y]) => ({ y, c: chip(siS, 200, y, String(n), AC, '#fff', 64) })), siB = [[4, 170], [5, 260], [6, 350]].map(([n, y]) => chip(siS, 570, y, String(n), BC, '#fff', 64));
const siA = siA2.map(({ y }) => PUC.arrow(siS, PC, 5, 15));
const siT = tag(siS, 392, 400, 'both share 5', C.ok);
const th1 = PUC.think($('#th1'), { q: 'Student → birth month. Two students share a month. Still a function?', opts: ['Yes', 'No'], right: 0, why: 'Each student still has exactly one birth month. Sharing an image is allowed.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`f : ${ac('A')} \\to ${bc('B')}`);

/* ---------- V: notation ---------- */
$('#vF1').innerHTML = K(`f : ${ac('A')} \\to ${bc('B')}`);
$('#vF2').innerHTML = K(`f(${ac('a')}) = ${bc('b')}`);
const vs = $('#vS'), vA = chip(vs, 200, 220, 'a', AC, ACB, 80, false), vB = chip(vs, 580, 220, 'b', BC, BCB, 80, false);
[vA, vB].forEach(c => c.tt.setAttribute('font-style', 'italic'));
const vAr = PUC.arrow(vs, PC, 5, 16); const vF = txt(vs, 392, 196, 'f', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 30, 'font-weight': 700, fill: PC });
const vL1 = txt(vs, 200, 290, 'preimage', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: AC }), vL2 = txt(vs, 580, 290, 'image', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: BC });
$('#vEx').innerHTML = K(`\\text{Test 1: } f(${ac('2')}) = ${bc('5')}`);

/* ---------- C: number of functions ---------- */
const CS = [[`n(${ac('A')}) = ${ac('p')},\\ \\ n(${bc('B')}) = ${bc('q')}`, 'count the two sets'],
  [`\\text{each element of } ${ac('A')}:\\ ${bc('q')} \\text{ choices}`, 'it must pick exactly one image'],
  [`\\text{free choices} \\;\\to\\; \\text{multiply}`, 'one choice never limits another'],
  [`${bc('q')} \\times ${bc('q')} \\times \\cdots \\times ${bc('q')} = ${bc('q')}^{${ac('p')}}`, 'one factor q for each element of A'],
  [`p = 3,\\ q = 2:\\ \\ 2^{3} = ${pc('8')}`, 'watch all 8 on the right']];
$('#cSt').innerHTML = `<div class="hiBox" id="cHi" style="left:20px;width:744px;height:92px"></div>` + CS.map(([f, w], i) => `<div class="st" id="cs${i}" style="top:${84 + i * 94}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tCs = [wt('C2', 'Say'), wt('C3', 'Each'), wt('C4', 'choices'), wt('C5', 'q'), wt('C5', 'functions')];
const cs = $('#cS'), CAY = [190, 290, 390], CBY = [240, 340];
ovals(cs, 200, 580, 290, 150, 120);
const cA = [1, 2, 3].map((n, i) => chip(cs, 200, CAY[i], String(n), AC, '#fff', 64)), cB = [4, 5].map((n, j) => chip(cs, 580, CBY[j], String(n), BC, '#fff', 64));
const cAr = [0, 1, 2].map(() => PUC.arrow(cs, PC, 4, 14));
const tCy0 = wt('C3', 'q'), tCy1 = T1('C5') + 0.6, cPer = (tCy1 - tCy0) / 8;
const cBit = (k, i) => (k >> (2 - i)) & 1;
let cLast = '';

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`A = \\{${ac('1, 2, 3')}\\},\\ B = \\{${bc('4, 5, 6, 7')}\\}`)}<br>${K(`f = \\{${pr('1', '4')}, ${pr('2', '6')}, ${pr('3', '6')}\\}`)}: a function? f(2)?`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{first elements: } ${ac('1, 2, 3')}`), 'every element of A appears'],
  ['each appears only once', 'so each has one image'],
  [K(`f(${ac('2')}) = f(${ac('3')}) = ${bc('6')}`), 'sharing is allowed'],
  [K(`f \\text{ is a function},\\ \\ f(${ac('2')}) = ${bc('6')}`)],
  [K(`${bc('5')},\\ ${bc('7')} \\text{: no preimage}`), 'allowed too']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'List'), wt('W4', 'Each'), wt('W5', 'Two'), wt('W6', 'So'), wt('W7', 'Five')];
const ws = $('#wS');
ovals(ws, 200, 590, 320, 170, 200);
const wA = [1, 2, 3].map((n, i) => chip(ws, 200, AY[i], String(n), AC, '#fff', 64)), wB = [4, 5, 6, 7].map((n, j) => chip(ws, 590, BY[j], String(n), BC, '#fff', 64));
const wAr = [[0, 0], [1, 2], [2, 2]].map(([i, j]) => ({ i, j, a: PUC.arrow(ws, PC, 4, 14) }));
const wUn = [1, 3].map(j => mk(ws, 'circle', { cx: 590, cy: BY[j], r: 40, fill: 'none', stroke: C.mute, 'stroke-width': 3, 'stroke-dasharray': '6 6' }));
const wT = tag(ws, 392, 545, 'f(2) = 6', PC);
const tWa = [wt('W3', 'one') , wt('W3', 'two'), wt('W3', 'three')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '5 and 7 get no arrow, so f is not a function', right: 'Only A is checked: 1, 2, 3 each have one image. f is a function.' });
const ts = $('#tS'), TAY = [70, 137, 204], TBY = [50, 108, 166, 224];
const tAc = [1, 2, 3].map((n, i) => chip(ts, 130, TAY[i], String(n), AC, '#fff', 52)), tBc = [4, 5, 6, 7].map((n, j) => chip(ts, 400, TBY[j], String(n), BC, '#fff', 52));
[tAc, tBc].flat().forEach(c => { c.r.setAttribute('height', 40); c.r.setAttribute('y', -20); c.tt.setAttribute('font-size', 20); c.tt.setAttribute('y', 7); });
[[0, 0], [1, 2], [2, 2]].forEach(([i, j]) => { const a = PUC.arrow(ts, PC, 3, 11); a.set(156, TAY[i], 374, TBY[j]); });
const tRing = [1, 3].map(j => mk(ts, 'circle', { cx: 400, cy: TBY[j], r: 26, fill: 'none', stroke: C.red, 'stroke-width': 3.5 }));
const tOk = [0, 1, 2].map(i => mk(ts, 'circle', { cx: 130, cy: TAY[i], r: 30, fill: 'none', stroke: C.ok, 'stroke-width': 3.5 }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Which of these relations are functions? · count the functions that obey a condition' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`A = \\{1, 2, 3\\},\\ \\ B = \\{1, 2, 3, 4\\}`)}<br>How many functions ${K('f : A \\to B')}<br>satisfy ${K('f(1) \\ne f(2)')}?`,
  opts: ['48', '64', '24', '36'], right: 0, optW: 474, optY: 312 });
const so = PUC.solution($('#so'), [
  [K(`\\text{all: } 4 \\times 4 \\times 4 = 64`)],
  [K(`\\text{remove: } f(1) = f(2)`)],
  [K(`4 \\times 1 \\times 4 = 16`)],
  [K(`64 - 16 = ${pc('48')}`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'four'), wt('A3', 'count'), wt('A4', 'sixteen') - 0.6, wt('A5', 'leaves')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · functions', y0: 98, dy: 80, txt: [1, 0, 1, 1, 0],
  lines: ['<b>Function</b>: every element of A has exactly one image in B',
    K(`f : ${ac('A')} \\to ${bc('B')}, \\qquad f(${ac('a')}) = ${bc('b')}`),
    '<span style="color:#0E8F8F">b</span> = image of a · <span style="color:#2F6FEB">a</span> = preimage of b',
    'Arrows may share an image; B need not be used up',
    K(`n(${ac('A')}) = ${ac('p')},\\ n(${bc('B')}) = ${bc('q')}:\\ \\ ${bc('q')}^{${ac('p')}} \\text{ functions (JEE)}`)] });
const YQ = ['Is {(1, 2), (1, 3), (2, 4)} a function from {1, 2} to {2, 3, 4}?', 'How many functions are there from a 2-element set to a 3-element set?', 'If f(3) = 7, which number is the image, and which is the preimage?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 17', topic: 'Marks 0 to 100, scores 41 to 96: Domain, Codomain, Range', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3') - 0.2, 1.06, 560, 560], [T1('L4') + 0.3, 1, 960, 540]]);

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
    REG.forEach((_, i) => M.vis($('#hr' + i), t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 14 }));
    const hi = M.io((t - tMorph - 0.9) / 0.3); $('#hr1').style.background = mix(C.soft, C.ac2, hi);
    M.vis($('#hQ'), t, wt('H2', 'two') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hDi'), t, tH3 + 0.1, 1e9, { dy: 24 });
    M.rise($('#hkQ'), t, T0('H4') + 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#hkP'), t, wt('H5', 'function') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, wt('D1', 'a') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dfL2'), t, T0('D2') - 0.1, 1e9, { dy: 10 }); M.vis($('#dfP'), t, T0('D2'), 1e9, POP);
    M.vis($('#dk'), t, wt('D2', 'checks') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#ck0'), t, wt('D2', 'First') - 0.1, 1e9, { dy: 16 }); M.vis($('#ck1'), t, T0('D3') - 0.05, 1e9, { dy: 16 });
    [D0, D1].forEach((d, k) => { const t0 = k ? wt('D3', 'No') : wt('D2', 'No'); [d.a, ...d.bs].forEach((c, i) => M.vis(c.g, t, t0 - 0.6 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); d.ar.forEach((a, i) => M.vis(a.g, t, t0 + i * 0.2, 1e9, { dy: 0, fade: 0.15 })); M.vis(d.x, t, t0 + 0.3, 1e9, POP); });
  }

  /* L: live test */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('G1');
    M.vis($('#la'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    lA.forEach((c, i) => M.vis(c.g, t, tL1 + 0.3 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    lB.forEach((c, j) => M.vis(c.g, t, tL1 + 0.5 + j * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    const r = t < tL[1] ? 0 : t < tL[2] ? 1 : 2;
    lAr.forEach((set, k) => set.forEach((p, m) => { if (k !== r || t < tL[0]) { M.hide(p.a.g, true); return; } grow(p.a, 232, AY[p.i], 558, BY[p.j], M.io((t - tLa[k][m] + 0.1) / 0.4)); }));
    // scanner ring and counts
    const sc = tScan[r], cur = sc.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, -1);
    const ringOn = t >= tL[0] && cur >= 0 && t < tVd[r] + 0.2;
    M.hide(lRing.parentNode, !ringOn);
    if (ringOn) { const el = r === 0 ? cur : r === 1 ? 0 : 1; attr(lRing, 'cx', 200); attr(lRing, 'cy', AY[el]); }
    lCnt.forEach((c, i) => {
      const n = t >= tL[0] ? RELS[r].filter(([a]) => a === i).length : 0, shown = r === 0 ? t >= tScan[0][i] + 0.2 : (r === 1 ? i === 0 : i === 1) && t >= sc[0] + 0.3;
      M.hide(c.g, !shown); if (shown) { M.setT(c.tt, String(n)); attr(c.c, 'fill', n === 1 ? C.ok : C.red); }
    });
    lBad.forEach((b, k) => { const on = r === k + 1 && t >= tScan[r][0] + 0.2; M.hide(b, !on); if (on) { attr(b, 'cx', 200); attr(b, 'cy', AY[k === 0 ? 0 : 1]); } });
    [0, 1, 2].forEach(k => M.vis($('#lV' + k), t, tVd[k] - 0.05, k < 2 ? tL[k + 1] - 0.05 : 1e9, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#lt'), t, T0('L2') - 0.1, out, { dx: 60, dy: 0, ...o });
    LOG.forEach((_, k) => M.vis($('#lg' + k), t, tVd[k] + 0.1, 1e9, { dx: -16, dy: 0 }));
  }

  /* G: grid picture */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#gf'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    gDots.forEach((d, k) => M.vis(d, t, wt('G1', 'dot') + k * 0.2, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    gBand.forEach((b, i) => M.vis(b, t, wt('G2', 'one') + i * 0.15, 1e9, { dy: 0, fade: 0.2 })); gOne.forEach((e, i) => M.vis(e, t, wt('G2', 'one') + 0.2 + i * 0.15, 1e9, { dy: 0 }));
    M.vis($('#gb'), t, wt('G2', 'Two') - 0.2, out, { dx: 60, dy: 0, ...o });
    gG.forEach((d, k) => M.vis(d, t, wt('G2', 'Two') + k * 0.1, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 })); M.vis(gGb, t, wt('G2', 'column', 1), 1e9, { dy: 0, fade: 0.15 }); M.vis(gGt, t, wt('G2', 'column', 1), 1e9, POP);
    gH.forEach((d, k) => M.vis(d, t, wt('G2', 'empty') - 0.2 + k * 0.1, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 })); M.vis(gHb, t, wt('G2', 'empty') + 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis(gHt, t, wt('G2', 'empty') + 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#so1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [so1, ...soB].forEach((c, i) => M.vis(c.g, t, tS1 + 0.3 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    soA.forEach((a, i) => grow(a.a, 232, 260, 538, a.y, M.io((t - wt('S1', 'arrows') - i * 0.3) / 0.4)));
    M.vis(soX, t, wt('S1', 'two') - 0.1, 1e9, POP); M.vis($('#soP'), t, wt('S1', 'allowed') - 0.1, 1e9, POP);
    M.vis($('#si1'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [...siA2.map(x => x.c), ...siB].forEach((c, i) => M.vis(c.g, t, T0('S2') + 0.1 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    siA.forEach((a, i) => grow(a, 232, siA2[i].y, 538, 260, M.io((t - wt('S2', 'into') - i * 0.3) / 0.4)));
    M.vis(siT, t, wt('S2', 'share') - 0.1, 1e9, POP); M.vis($('#siP'), t, wt('S2', 'fine') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, tT - 0.05, { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Is') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Each') });
  }

  /* statement */
  const stOn = t >= tT && t < tV1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tV1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'arrow') - 0.2, 0.8);
  }

  /* V: notation */
  const vOn = t >= tV1 - 0.1 && t < tC1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('C1');
    M.vis($('#vn'), t, tV1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#vF1'), t, wt('V2', 'f') - 0.05, 0.8); M.vis($('#vR1'), t, wt('V2', 'reads'), 1e9, POP);
    PUC.write($('#vF2'), t, wt('V3', 'write') - 0.05, 0.8); M.vis($('#vR2'), t, wt('V3', 'equals') + 0.1, 1e9, POP);
    M.vis($('#vp'), t, T0('V3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(vA.g, t, T0('V3') + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(vB.g, t, T0('V3') + 0.35, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    grow(vAr, 244, 220, 536, 220, M.io((t - wt('V3', 'f', 1)) / 0.4)); M.vis(vF, t, wt('V3', 'f', 1) + 0.2, 1e9, { dy: 0 });
    M.vis(vL2, t, wt('V3', 'image') - 0.05, 1e9, { dy: 0 }); M.vis(vL1, t, wt('V3', 'preimage') - 0.05, 1e9, { dy: 0 });
    PUC.write($('#vEx'), t, wt('V3', 'preimage') + 0.6, 0.8);
  }

  /* C: number of functions + live morph */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('W1');
    M.vis($('#cp'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cGh'), t, wt('C1', 'not') - 0.1, 1e9, POP);
    CS.forEach((_, i) => { const el = $('#cs' + i); M.vis(el.querySelector('.n'), t, tCs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCs[i], 0.8); M.vis(el.querySelector('.why'), t, tCs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tCs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 94]), M.SOFT)(t);
    const hb = $('#cHi'); M.vis(hb, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#cl'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    cA.forEach((c, i) => M.vis(c.g, t, T0('C2') + 0.2 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    cB.forEach((c, j) => M.vis(c.g, t, T0('C2') + 0.4 + j * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    const kf = M.clamp((t - tCy0) / (tCy1 - tCy0)) * 8, k = Math.min(7, Math.floor(kf)), u = M.io((kf - k) / 0.35);
    cAr.forEach((a, i) => { if (t < tCy0) { M.hide(a.g, true); return; } const b1 = cBit(k, i), b0 = k > 0 ? cBit(k - 1, i) : b1, y = CBY[b0] + (CBY[b1] - CBY[b0]) * (k > 0 ? u : 1); a.set(232, CAY[i], 546, y); });
    const s = t < tCy0 ? '' : `function <span style="color:${PC}">${k + 1}</span> of 8`;
    if (s !== cLast) { cLast = s; $('#cRd').innerHTML = s; $('#cRo').innerHTML = t < tCy0 ? '' : K(`f = \\{${[0, 1, 2].map(i => pr(String(i + 1), String(4 + cBit(k, i)))).join(',\\ ')}\\}`); }
    M.vis($('#cRd'), t, tCy0, 1e9, { dy: 10 }); M.vis($('#cRo'), t, tCy0, 1e9, { dy: 0 });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wA.concat(wB).forEach((c, i) => M.vis(c.g, t, T0('W2') + 0.6 + i * 0.06, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    wAr.forEach((p, k) => grow(p.a, 232, AY[p.i], 558, BY[p.j], M.io((t - tWa[k] + 0.1) / 0.4)));
    wUn.forEach((c, k) => M.vis(c, t, tW[4] + k * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(wT, t, wt('W6', 'equals') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Every') });
    tRing.forEach((c, k) => M.vis(c, t, wt('X2', 'five') + k * 0.25, 1e9, { dy: 0, fade: 0.15 }));
    tOk.forEach((c, k) => M.vis(c, t, wt('X3', 'Every') + 0.2 + k * 0.15, 1e9, { dy: 0, fade: 0.15 }));
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
