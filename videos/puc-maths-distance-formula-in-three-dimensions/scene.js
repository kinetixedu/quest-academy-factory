// PUC Maths Ep 79: Distance formula in three dimensions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (this chapter): change in x / length blue, change in y / width teal, change in z / height violet,
// floor diagonal gold, the distance d (space diagonal) coral accent
const XB = '#2F6FEB', YT = C.teal, ZV = C.violet, FD = C.gold, DC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xb = s => `\\textcolor{${XB}}{${s}}`, yt = s => `\\textcolor{${YT}}{${s}}`, zv = s => `\\textcolor{${ZV}}{${s}}`, dc = s => `\\textcolor{${DC}}{${s}}`, fd = s => `\\textcolor{${FD}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const F3 = `\\sqrt{${xb('(x_2 - x_1)^2')} + ${yt('(y_2 - y_1)^2')} + ${zv('(z_2 - z_1)^2')}}`;

/* ---------- a box drawn in oblique view: x along (right), y across (into the page), z up ---------- */
const box = (svg, o) => {
  const g = mk(svg, 'g', {}), B = { L: o.L, W: o.W, H: o.H };
  const pr = (x, y, z) => [o.ox + o.s * (x + 0.5 * y), o.oy - o.s * (z + 0.4 * y)];
  B.pr = pr;
  const poly = fill => mk(g, 'polygon', { points: '', fill, stroke: 'none', opacity: 0 });
  B.t1 = poly(o.f1 || '#E7EEFD'); B.t2 = poly(o.f2 || C.ac2);
  const cs = [];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) cs.push([i, j, k]);
  const col = (a, b) => {
    const k = a.join('') + b.join('');
    if (k === '000100') return [XB, 5]; if (k === '100110') return [YT, 5]; if (k === '110111') return [ZV, 5];
    return [C.ink, 2.4];
  };
  B.E = [];
  cs.forEach((a, ai) => cs.forEach((b, bi) => {
    if (bi <= ai) return; const diff = a.reduce((s, v, n) => s + (v !== b[n]), 0); if (diff !== 1) return;
    const [c, w] = o.plain ? [C.ink, 2.4] : col(a, b), hid = (a[0] === 0 && a[1] === 1 && a[2] === 0) || (b[0] === 0 && b[1] === 1 && b[2] === 0);
    const ln = mk(g, 'line', { stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': hid ? '7 7' : 'none', opacity: hid ? 0.55 : (w > 3 ? 1 : 0.8) });
    B.E.push({ a, b, ln, w });
  }));
  // edges with colour drawn last so they sit on top
  B.E.filter(e => e.w > 3).forEach(e => g.appendChild(e.ln));
  B.fd = mk(g, 'line', { stroke: FD, 'stroke-width': 5, 'stroke-linecap': 'round' });
  B.d = mk(g, 'line', { stroke: DC, 'stroke-width': 6, 'stroke-linecap': 'round' });
  B.set = H => {
    B.H = H; const P = c => pr(c[0] * B.L, c[1] * B.W, c[2] * H);
    B.E.forEach(e => { const [x1, y1] = P(e.a), [x2, y2] = P(e.b); attr(e.ln, 'x1', x1.toFixed(1)); attr(e.ln, 'y1', y1.toFixed(1)); attr(e.ln, 'x2', x2.toFixed(1)); attr(e.ln, 'y2', y2.toFixed(1)); });
    const o0 = pr(0, 0, 0), fl = pr(B.L, B.W, 0), tp = pr(B.L, B.W, H), f1 = pr(B.L, 0, 0);
    [['x1', o0[0]], ['y1', o0[1]], ['x2', fl[0]], ['y2', fl[1]]].forEach(([k, v]) => attr(B.fd, k, v.toFixed(1)));
    [['x1', o0[0]], ['y1', o0[1]], ['x2', tp[0]], ['y2', tp[1]]].forEach(([k, v]) => attr(B.d, k, v.toFixed(1)));
    attr(B.t1, 'points', [o0, f1, fl].map(p => p.map(v => v.toFixed(1)).join(',')).join(' '));
    attr(B.t2, 'points', [o0, fl, tp].map(p => p.map(v => v.toFixed(1)).join(',')).join(' '));
  };
  B.set(o.H); B.g = g;
  return B;
};
const elab = (svg, B, ss, a = {}) => [lab(svg, ...B.pr(B.L / 2, 0, 0).map((v, i) => v + [0, 40][i]), ss[0], XB, a), lab(svg, ...B.pr(B.L, B.W / 2, 0).map((v, i) => v + [16, 24][i]), ss[1], YT, Object.assign({ 'text-anchor': 'start' }, a)), lab(svg, ...B.pr(B.L, B.W, B.H / 2).map((v, i) => v + [14, 9][i]), ss[2], ZV, Object.assign({ 'text-anchor': 'start' }, a))];
const lab = (svg, x, y, s, col, a = {}) => txt(svg, x, y, s, Object.assign({ 'font-size': 24, fill: col, 'font-weight': 600, 'text-anchor': 'middle' }, a));

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tD1 = T0('D1'), tG1 = T0('G1'), tS1 = T0('S1'), tS3 = T0('S3'), tO1 = T0('O1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the box sizes ---------- */
const LS = [['LENGTH', '12 cm', XB], ['WIDTH', '4 cm', YT], ['HEIGHT', '3 cm', ZV]];
$('#lists').innerHTML = LS.map(([n, v, c], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${c}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'twelve') - 0.05, wt('H1', 'four') - 0.05, wt('H1', 'three') - 0.05];

/* ---------- H: the box, flat vs tilted ---------- */
const hb = box($('#hS'), { ox: 44, oy: 410, s: 50, L: 12, W: 4, H: 3 });
const hL = elab($('#hS'), hb, ['12', '4', '3']);
const tHf = wt('H2', 'corner'), tHt = wt('H4', 'tilted');

/* ---------- P: coordinates of a point + live lid ---------- */
const ps = $('#pS'), PO = [150, 400], PS = 46;
const pp = (x, y, z) => [PO[0] + PS * (x + 0.45 * y), PO[1] - PS * (z + 0.315 * y)];
const axis = (svg, to, col, l) => { const [x, y] = to; const a = mk(svg, 'line', { x1: PO[0], y1: PO[1], x2: x, y2: y, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }); const t = lab(svg, x + (l[0] || 0), y + (l[1] || 0), l[2], col, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 32 }); return [a, t]; };
const aX = axis(ps, pp(10.5, 0, 0), XB, [22, 10, 'x']), aY = axis(ps, pp(0, 9, 0), YT, [14, -10, 'y']), aZ = axis(ps, pp(0, 0, 6.6), ZV, [0, -14, 'z']);
const pO = mk(ps, 'circle', { cx: PO[0], cy: PO[1], r: 8, fill: C.ink }); const pOl = lab(ps, PO[0] - 26, PO[1] + 30, 'O', C.ink, { 'font-family': 'Poppins', 'font-weight': 700 });
const PT = [5, 4, 4];
const wk = [[[0, 0, 0], [PT[0], 0, 0], XB], [[PT[0], 0, 0], [PT[0], PT[1], 0], YT], [[PT[0], PT[1], 0], PT, ZV]].map(([a, b, c]) => { const [x1, y1] = pp(...a), [x2, y2] = pp(...b); return mk(ps, 'path', { d: `M${x1},${y1} L${x2},${y2}`, stroke: c, 'stroke-width': 5, 'stroke-dasharray': '2 10', 'stroke-linecap': 'round', fill: 'none' }); });
const wkL = [lab(ps, ...pp(PT[0] / 2, 0, 0).map((v, i) => v + [0, 34][i]), '5 along', XB), lab(ps, ...pp(PT[0], PT[1] / 2, 0).map((v, i) => v + [62, 22][i]), '4 across', YT), lab(ps, ...pp(...PT).map((v, i) => v + [58, 100][i]), '4 up', ZV)];
const pPt = mk(ps, 'circle', { cx: pp(...PT)[0], cy: pp(...PT)[1], r: 12, fill: C.ink });
const pPl = lab(ps, pp(...PT)[0] + 14, pp(...PT)[1] - 22, 'P (5, 4, 4)', C.ink, { 'text-anchor': 'start', 'font-size': 26 });
const lb = box($('#lS'), { ox: 44, oy: 440, s: 50, L: 12, W: 4, H: 0 });
const lGhost = mk($('#lS'), 'line', { stroke: FD, 'stroke-width': 4, 'stroke-dasharray': '6 8', opacity: 0.8 });
{ const a = lb.pr(0, 0, 0), b = lb.pr(12, 4, 0); attr(lGhost, 'x1', a[0]); attr(lGhost, 'y1', a[1]); attr(lGhost, 'x2', b[0]); attr(lGhost, 'y2', b[1]); }
const tLift0 = wt('P4', 'grows'), tLift1 = wt('P5', 'three');
const hOf = t => 3 * M.io((t - tLift0) / Math.max(1, tLift1 - tLift0));
let hLast = -1;

/* ---------- D: Pythagoras twice ---------- */
const DS = [[`a^2 + b^2 = ${dc('c^2')}`, 'longest side squared = the other two, squared'],
  [`${fd('f')}^2 = ${xb('12')}^2 + ${yt('4')}^2 = ${fd('160')}`, 'step 1: the floor triangle'],
  [`${dc('d')}^2 = ${fd('160')} + ${zv('3')}^2 = ${dc('169')}`, 'step 2: the upright triangle'],
  [`${dc('d')} = \\sqrt{169} = ${dc('13')}`, 'the pencil fits, exactly']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'longest'), wt('D3', 'twelve'), wt('D5', 'hundred'), wt('D6', 'square')];
const dbx = box($('#dS'), { ox: 44, oy: 400, s: 50, L: 12, W: 4, H: 3 });
const dL = [...elab($('#dS'), dbx, ['12', '4', '3']), lab($('#dS'), ...dbx.pr(7.5, 2.2, 0).map((v, i) => v + [0, 34][i]), 'f', FD, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32 }), lab($('#dS'), ...dbx.pr(5, 1.67, 1.25).map((v, i) => v + [-10, -16][i]), 'd', DC, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 32 })];
const tD3 = T0('D3'), tD4 = T0('D4');

/* ---------- G: any two points ---------- */
const gs = $('#gS'), gbx = box(gs, { ox: 110, oy: 384, s: 50, L: 9, W: 4, H: 4 });
const gP = gbx.pr(0, 0, 0), gQ = gbx.pr(9, 4, 4);
const gDots = [[gP, 'P (x₁, y₁, z₁)', -10, 74, 'start'], [gQ, 'Q (x₂, y₂, z₂)', 10, -26, 'end']].map(([p, s, dx, dy, an]) => { const c = mk(gs, 'circle', { cx: p[0], cy: p[1], r: 11, fill: C.ink }); const l = lab(gs, p[0] + dx, p[1] + dy, s, C.ink, { 'text-anchor': an, 'font-size': 24 }); return [c, l]; });
const gL = elab(gs, gbx, ['x₂ - x₁', 'y₂ - y₁', 'z₂ - z₁']);
const GS = [[`${xb('x_2 - x_1')},\\ ${yt('y_2 - y_1')},\\ ${zv('z_2 - z_1')}`, 'the three changes: the edges of the box'],
  [`${dc('PQ')}^2 = ${xb('(x_2 - x_1)^2')} + ${yt('(y_2 - y_1)^2')} + ${zv('(z_2 - z_1)^2')}`, 'Pythagoras twice, like the pencil'],
  [`${dc('PQ')} = ${F3}`, 'take the square root'],
  [`${dc('OP')} = \\sqrt{${xb('x')}^2 + ${yt('y')}^2 + ${zv('z')}^2}`, 'from the origin O (0, 0, 0)']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tGs = [wt('G3', 'length'), wt('G5', 'Pythagoras'), wt('G6', 'square'), wt('G7', 'origin')];
const avD = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same two steps, just with letters.' });

/* ---------- S: 2D vs 3D ---------- */
$('#s2F').innerHTML = K(`d = \\sqrt{${xb('(\\Delta x)^2')} + ${yt('(\\Delta y)^2')}}`);
$('#s3F').innerHTML = K(`d = \\sqrt{${xb('(\\Delta x)^2')} + ${yt('(\\Delta y)^2')} + ${zv('(\\Delta z)^2')}}`);
const s2 = $('#s2S'), GX = v => 96 + v * 66, GY = v => 450 - v * 66;
for (let v = 0; v <= 8; v++) mk(s2, 'line', { x1: GX(v), y1: GY(0), x2: GX(v), y2: GY(3.5), stroke: '#E9E5DA', 'stroke-width': 2 });
for (let v = 0; v <= 3; v++) mk(s2, 'line', { x1: GX(0), y1: GY(v), x2: GX(8.5), y2: GY(v), stroke: '#E9E5DA', 'stroke-width': 2 });
const s2a = mk(s2, 'line', { x1: GX(1), y1: GY(0.5), x2: GX(7), y2: GY(0.5), stroke: XB, 'stroke-width': 5, 'stroke-linecap': 'round' });
const s2b = mk(s2, 'line', { x1: GX(7), y1: GY(0.5), x2: GX(7), y2: GY(3), stroke: YT, 'stroke-width': 5, 'stroke-linecap': 'round' });
const s2d = mk(s2, 'line', { x1: GX(1), y1: GY(0.5), x2: GX(7), y2: GY(3), stroke: DC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const s2L = [lab(s2, GX(4), GY(0.5) + 34, 'Δx', XB), lab(s2, GX(7) + 18, GY(1.75) + 8, 'Δy', YT, { 'text-anchor': 'start' })];
const s3b = box($('#s3S'), { ox: 70, oy: 440, s: 40, L: 12, W: 4, H: 3.4 });
attr(s3b.fd, 'opacity', 0);
const s3L = elab($('#s3S'), s3b, ['Δx', 'Δy', 'Δz']);
const avA = PUC.avatar($('#sS'), { x: 160 + 356, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'One per direction.' });
const th1 = PUC.think($('#th1'), { q: 'Distance from the origin to the point (1, 1, 1)?', opts: ['√2', '√3'], right: 1, why: 'Three changes of 1 each: 1² + 1² + 1² = 3, so the distance is √3.' });
const th2 = PUC.think($('#th2'), { q: 'Is the distance PQ always the same as QP?', opts: ['Yes, always', 'Only sometimes'], right: 0, why: '(-5)² = 5² = 25. Squaring wipes out the minus sign, so the order never matters.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${dc('PQ')} = ${F3}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the distance between<br>${K(`P(1,\\,-3,\\,4)`)} and ${K(`Q(-4,\\,1,\\,2)`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${xb('\\Delta x')} = -4 - 1 = ${xb('-5')}`)],
  [K(`${yt('\\Delta y')} = 1 - (-3) = ${yt('4')}`)],
  [K(`${zv('\\Delta z')} = 2 - 4 = ${zv('-2')}`)],
  [K(`${dc('PQ')}^2 = ${xb('25')} + ${yt('16')} + ${zv('4')} = 45`)],
  [K(`${dc('PQ')} = \\sqrt{45} = ${dc('3\\sqrt{5}')} \\approx 6.71`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const wbx = box($('#wS'), { ox: 150, oy: 420, s: 64, L: 5, W: 4, H: 2 });
attr(wbx.fd, 'opacity', 0);
const wL = elab($('#wS'), wbx, ['5', '4', '2'], { 'font-size': 28 });
const wPQ = [[wbx.pr(0, 0, 0), 'P', -24, 30], [wbx.pr(5, 4, 2), 'Q', 22, -14]].map(([p, s, dx, dy]) => [mk($('#wS'), 'circle', { cx: p[0], cy: p[1], r: 10, fill: C.ink }), lab($('#wS'), p[0] + dx, p[1] + dy, s, C.ink, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28 })]);
const tW = [wt('W3', 'change'), wt('W4', 'change'), wt('W5', 'change'), wt('W6', 'Square'), wt('W7', 'distance')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(2,-1,3),\\,(-2,1,3):\\ \\Delta y = 1 - 1 = 0 \\Rightarrow 4`), right: K(`\\Delta y = 1 - (-1) = ${yt('2')} \\Rightarrow \\sqrt{16 + 4 + 0} = \\sqrt{20}`) });
const ts = $('#tS'), TXv = v => 280 + v * 100, TYl = 160;
mk(ts, 'line', { x1: 40, y1: TYl, x2: 520, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -2; v <= 2; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tA = mk(ts, 'path', { d: `M${TXv(-1)},${TYl - 18} Q${TXv(0)},${TYl - 90} ${TXv(1)},${TYl - 18}`, fill: 'none', stroke: YT, 'stroke-width': 4, 'stroke-linecap': 'round' });
const tDots = [-1, 1].map(v => mk(ts, 'circle', { cx: TXv(v), cy: TYl, r: 11, fill: YT }));
const tNote = txt(ts, TXv(0), TYl - 74, 'y: from -1 to 1 = 2 steps', { 'text-anchor': 'middle', 'font-size': 20, fill: YT, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find a point at equal distances from given points, or test a triangle by its side lengths.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`A(2,\\,-1,\\,3),\\ \\ B(k,\\,1,\\,-1),\\ \\ AB = 6`)}<br>Sum of all possible values of k?`,
  opts: ['4', '8', '-4', '12'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\Delta: k - 2,\\ \\ 2,\\ \\ -4`)], [K(`(k-2)^2 + 4 + 16 = 36`)], [K(`(k-2)^2 = 16`)], [K(`k - 2 = \\pm 4 \\Rightarrow k = 6,\\ -2`)], [K(`\\text{sum} = 6 + (-2) = 4`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'changes'), wt('A3', 'equals'), wt('A4', 'sixteen'), wt('A4', 'six'), wt('A4', 'sum')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · distance in 3D', y0: 98, dy: 80, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Three changes</b>, three squares, one square root',
    K(`${dc('PQ')} = ${F3}`),
    K(`\\text{From the origin: } ${dc('OP')} = \\sqrt{${xb('x')}^2 + ${yt('y')}^2 + ${zv('z')}^2}`),
    '<b>PQ = QP</b>: squaring wipes out the minus sign',
    '2D: two squares · 3D: three squares, one per direction'] });
const YQ = ['How far is the point (2, 3, 6) from the origin?', 'Why is the distance from P to Q the same as from Q to P?', 'How many squares sit under the root in 3D, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 80', topic: 'Halfway to the wall, forever: Intuitive Idea of Limits', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLift0 - 0.2, 1.05, 960, 560], [T1('P5') + 0.2, 1, 960, 540]]);
const setLine = (ln, a, b) => { attr(ln, 'x1', a[0].toFixed(1)); attr(ln, 'y1', a[1].toFixed(1)); attr(ln, 'x2', b[0].toFixed(1)); attr(ln, 'y2', b[1].toFixed(1)); };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hb.g, t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.3 });
    hL.forEach((l, i) => M.vis(l, t, tMorph + 0.5 + i * 0.1, 1e9, { dy: 0 }));
    M.draw(hb.fd, t, tHf, 0.7); M.vis($('#hP1'), t, wt('H2', 'short') - 0.3, 1e9, POP);
    M.draw(hb.d, t, tHt, 0.9); M.vis($('#hP2'), t, wt('H4', 'fit') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'measure') - 0.1, 1e9, POP);
  }

  /* P: coordinates + live lid */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tA = wt('P2', 'along'), tB = wt('P2', 'across'), tC = wt('P2', 'up');
    M.draw(aX[0], t, tA - 0.2, 0.5); M.vis(aX[1], t, tA, 1e9, { dy: 0 }); M.vis($('#pc0'), t, tA, 1e9, POP);
    M.draw(aY[0], t, tB - 0.2, 0.5); M.vis(aY[1], t, tB, 1e9, { dy: 0 }); M.vis($('#pc1'), t, tB, 1e9, POP);
    M.draw(aZ[0], t, tC - 0.2, 0.5); M.vis(aZ[1], t, tC, 1e9, { dy: 0 }); M.vis($('#pc2'), t, tC, 1e9, POP);
    M.draw(wk[0], t, tA + 0.2, 0.5); M.vis(wkL[0], t, tA + 0.4, 1e9, { dy: 0 });
    M.draw(wk[1], t, tB + 0.2, 0.5); M.vis(wkL[1], t, tB + 0.4, 1e9, { dy: 0 });
    M.draw(wk[2], t, tC + 0.2, 0.5); M.vis(wkL[2], t, tC + 0.4, 1e9, { dy: 0 });
    M.vis(pPt, t, tC + 0.6, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pPl, t, wt('P3', 'coordinates') - 0.1, 1e9, { dy: 0 });
    M.vis(pO, t, wt('P3', 'origin') - 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pOl, t, wt('P3', 'origin') - 0.1, 1e9, { dy: 0 });
    M.vis($('#pl'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(lb.g, t, tP4 + 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(lGhost, t, tP4 + 0.3, 1e9, { dy: 0 });
    M.vis($('#pH'), t, tP4 + 0.3, 1e9, { dy: 14 }); M.vis($('#pD'), t, tP4 + 0.4, 1e9, { dy: 14 });
    const h = hOf(t); if (Math.abs(h - hLast) > 1e-4) { hLast = h; lb.set(h); M.setT($('#pHv'), h.toFixed(1)); M.setT($('#pDv'), Math.sqrt(160 + h * h).toFixed(2)); }
    M.vis($('#pFit'), t, wt('P5', 'thirteen') - 0.1, 1e9, POP);
  }

  /* D: Pythagoras twice */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('G1');
    M.vis($('#da'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hbx = $('#dHi'); M.vis(hbx, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hbx.style.top = (hy - 8).toFixed(1) + 'px';
    M.vis($('#db'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(dbx.g, t, tD1 + 0.5, 1e9, { dy: 0, fade: 0.3 });
    dL.slice(0, 3).forEach((l, i) => M.vis(l, t, tD1 + 0.6 + i * 0.1, 1e9, { dy: 0 }));
    const f1 = M.io((t - tD3) / 0.4) * (1 - M.io((t - tD4) / 0.4)); attr(dbx.t1, 'opacity', (0.9 * f1).toFixed(3));
    const f2 = M.io((t - tD4 - 0.3) / 0.4) * (1 - M.io((t - T0('D6')) / 0.4)); attr(dbx.t2, 'opacity', (0.9 * f2).toFixed(3));
    M.draw(dbx.fd, t, wt('D3', 'floor') - 0.1, 0.6); M.vis(dL[3], t, wt('D3', 'floor') + 0.4, 1e9, { dy: 0 });
    M.draw(dbx.d, t, wt('D5', 'long') - 0.1, 0.7); M.vis($('#dP'), t, wt('D5', 'long') + 0.6, 1e9, POP); M.vis(dL[4], t, wt('D5', 'long') + 0.5, 1e9, { dy: 0 });
  }

  /* G: any two points */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#ga'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    gDots.forEach(([c, l], i) => { const tt = wt('G1', i ? 'Q' : 'P'); M.vis(c, t, tt - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(l, t, tt, 1e9, { dy: 0 }); });
    M.vis(gbx.g, t, wt('G2', 'box') - 0.1, 1e9, { dy: 0, fade: 0.4 });
    M.vis(gL[0], t, wt('G3', 'length'), 1e9, { dy: 0 }); M.vis(gL[1], t, wt('G4', 'width'), 1e9, { dy: 0 }); M.vis(gL[2], t, wt('G4', 'height'), 1e9, { dy: 0 });
    M.draw(gbx.fd, t, wt('G5', 'twice') - 0.2, 0.5); M.draw(gbx.d, t, wt('G5', 'twice') + 0.3, 0.6);
    avD(t, wt('G5', 'pencil') + 0.2, out);
    M.vis($('#gb'), t, wt('G3', 'length') - 0.3, out, { dx: 60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i], 1.0); M.vis(el.querySelector('.why'), t, tGs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hbx = $('#gHi'); M.vis(hbx, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hbx.style.top = (hy - 8).toFixed(1) + 'px';
  }

  /* S: 2D vs 3D + think */
  const sOn = t >= tS1 - 0.1 && t < tO1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#s2'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s2F'), t, wt('S1', 'distance') - 0.1, 0.8);
    M.draw(s2a, t, wt('S1', 'two') - 0.1, 0.4); M.draw(s2b, t, wt('S1', 'two') + 0.2, 0.4); M.draw(s2d, t, wt('S1', 'squares') - 0.2, 0.5);
    s2L.forEach((l, i) => M.vis(l, t, wt('S1', 'two') + i * 0.3, 1e9, { dy: 0 }));
    M.vis($('#s2P'), t, wt('S1', 'squares'), 1e9, POP);
    M.vis($('#s3'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s3F'), t, wt('S2', 'three') - 0.1, 0.9);
    M.vis(s3b.g, t, T0('S2') + 0.2, 1e9, { dy: 0, fade: 0.3 }); s3L.forEach((l, i) => M.vis(l, t, T0('S2') + 0.4 + i * 0.12, 1e9, { dy: 0 }));
    M.draw(s3b.d, t, wt('S2', 'squares') - 0.1, 0.6);
    M.vis($('#s3P'), t, wt('S2', 'squares', 1) - 0.1, 1e9, POP);
    avA(t, wt('S2', 'direction') + 0.2, out);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('O1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'Root') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'three', 1) });
  }

  /* O: order does not matter */
  const oOn = t >= tO1 - 0.1 && t < tT + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    M.vis($('#th2'), t, tO1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tO1, tOpts: wt('O2', 'same') - 0.1, tCount: T1('O2') + 0.05, dur: 3, tAns: T0('O3') - 0.02, tWhy: wt('O3', 'Minus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Three') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'root') - 0.3, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wbx.g, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    wPQ.forEach(([c, l], i) => { const tt = wt('W2', i ? 'Q' : 'P'); M.vis(c, t, tt, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(l, t, tt, 1e9, { dy: 0 }); });
    wL.forEach((l, i) => M.vis(l, t, tW[i] + 0.4, 1e9, { ...POP, sc: 0.5 }));
    const e3 = wbx.E.filter(e => e.w > 3);
    e3.forEach((e, i) => { const k = M.io((t - tW[i] - 0.3) / 0.3) * (1 - M.io((t - tW[i] - 1.6) / 0.4)); attr(e.ln, 'stroke-width', (5 + 4 * k).toFixed(2)); });
    M.draw(wbx.d, t, tW[4] - 0.1, 0.7);
    M.vis($('#wRes'), t, wt('W7', 'three') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'first') - 0.1, tRight: wt('X3', 'change') });
    tDots.forEach((c, i) => M.vis(c, t, wt('X3', 'minus') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(tA, t, wt('X3', 'change') + 0.1, 0.6); M.vis(tNote, t, wt('X3', 'two') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'point') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
