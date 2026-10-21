// PUC Maths Ep 03: Roster and set-builder forms (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element x violet, rule coral (accent), the set blue, not-in red; counter n orange (new in Ep 3)
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD', NC = C.orange;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`, nc = s => `\\textcolor{${NC}}{${s}}`;

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tR1 = T0('R1'), tO1 = T0('O1'), tO4 = T0('O4'), tB1 = T0('B1'), tP1 = T0('P1'), tD3 = T0('D3'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the six letters of SCHOOL ---------- */
const WORD = 'SCHOOL'.split('');
$('#tiles').innerHTML = WORD.map((c, i) => `<div class="lt" id="tl${i}" style="left:${612 + i * 120}px">${c}</div>`).join('');
const tTl = WORD.map((_, i) => wt('H1', 6 + i) - 0.05);

/* ---------- H: the word and its set ---------- */
$('#hw').innerHTML = WORD.map((c, i) => `<div class="lt" id="hw${i}" style="left:${36 + i * 96}px;top:120px">${c}</div>`).join('');
$('#hSet').innerHTML = K(`\\{\\,${xc('S')},\\ ${xc('C')},\\ ${xc('H')},\\ ${xc('O')},\\ ${xc('L')}\\,\\}`);

/* ---------- R: rule 1 steps + live letter drop ---------- */
const RS = [[K(`\\{\\,${xc('a')},\\ ${xc('b')},\\ ${xc('c')}\\,\\}`), 'roster: every element inside curly brackets', 0],
  ['No element is written twice', 'rule 1 of roster form', 1],
  [K(`\\{\\,${xc('S')},\\ ${xc('C')},\\ ${xc('H')},\\ ${xc('O')},\\ ${xc('L')}\\,\\}`), 'SCHOOL: 6 letters, 5 elements', 0],
  [K(`\\{\\,${xc('B')},\\ ${xc('E')},\\ ${xc('T')},\\ ${xc('R')}\\,\\}`), 'BETTER: 6 letters, 4 elements', 0]];
$('#rSt').innerHTML = RS.map(([f, w, tx], i) => `<div class="st" id="rs${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx${tx ? ' tx' : ''}">${f}</div><div class="why">${w}</div></div>`).join('');
const tRs = [wt('R1', 'curly'), wt('R2', 'Rule'), wt('R5', 'So'), wt('R6', 14)];
const rs = $('#rS'), TY = 150, SY = 372;
const brace = (x, ch) => txt(rs, x, SY + 46, ch, { 'font-family': 'Poppins', 'font-size': 150, 'font-weight': 300, fill: AC, 'text-anchor': 'middle' });
const brL = brace(70, '{'), brR = brace(714, '}');
const setLab = txt(rs, 392, 520, 'THE SET', { 'text-anchor': 'middle', 'font-size': 18, fill: AC, 'font-weight': 600, 'letter-spacing': 2 });
const mkRun = (word, slots, times, tIn, tOut) => {
  const n = word.length, x0 = 392 - (n * 72 + (n - 1) * 14) / 2 + 36;
  const R = { tIn, tOut, toks: [], tiles: [], commas: [] }, seen = {};
  word.forEach((ch, i) => {
    const tg = mk(rs, 'g', { transform: `translate(${x0 + i * 86},${TY})` }), ti = mk(tg, 'g', {});
    const r = mk(ti, 'rect', { x: -36, y: -36, width: 72, height: 72, rx: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
    const tt = txt(ti, 0, 15, ch, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, 'font-weight': 700, fill: C.ink });
    R.tiles.push({ ti, r, tt });
    const dup = ch in seen; if (!dup) seen[ch] = Object.keys(seen).length;
    const j = seen[ch], pg = mk(rs, 'g', {}), g = mk(pg, 'g', {});
    const c = mk(g, 'circle', { r: 38, fill: '#fff', stroke: XC, 'stroke-width': 3 });
    txt(g, 0, 14, ch, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 38, 'font-weight': 700, fill: XC });
    R.toks.push({ ch, dup, j, pg, g, c, x0: x0 + i * 86, tf: times[i] });
  });
  const ns = Object.keys(seen).length;
  R.sx = j => 392 + (j - (ns - 1) / 2) * slots;
  for (let j = 1; j < ns; j++) R.commas.push({ j, e: txt(rs, R.sx(j) - slots / 2, SY + 30, ',', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, 'font-weight': 600, fill: C.ink }) });
  R.dupTag = txt(rs, 0, SY + 78, 'already in', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
  R.ns = ns;
  return R;
};
const tB0 = wt('R6', 5) + 0.45;
const RUN1 = mkRun(WORD, 104, [wt('R3', 9), wt('R3', 16), wt('R3', 19), wt('R3', 22), wt('R4', 3), wt('R5', 0)], tR1 + 0.6, T0('R6') - 0.05);
const RUN2 = mkRun('BETTER'.split(''), 120, [0, 1, 2, 3, 4, 5].map(i => tB0 + i * 0.4), T0('R6') + 0.25, OUT('O1'));
const runDrop = (R, t) => {
  let cnt = 0;
  R.tiles.forEach((tl, i) => {
    M.vis(tl.ti, t, R.tIn + i * 0.06, R.tOut, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25, ody: 0 });
    const tk = R.toks[i], gone = M.io((t - tk.tf) / 0.25);
    attr(tl.r, 'fill', mix('#FFFFFF', C.soft, gone)); attr(tl.r, 'stroke', mix(C.ink, tk.dup ? C.red : C.dim, gone)); attr(tl.tt, 'fill', mix(C.ink, tk.dup ? C.red : C.dim, gone));
  });
  R.toks.forEach(tk => {
    const u = M.io((t - tk.tf) / 0.55), x = M.lerp(tk.x0, R.sx(tk.j), u), y = M.lerp(TY, SY, u) - 60 * Math.sin(Math.PI * u) + (tk.dup ? -22 * u : 0);
    attr(tk.pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
    if (!tk.dup) {
      M.vis(tk.g, t, tk.tf, R.tOut, { dy: 0, sc: 0.85, fade: 0.08, outDur: 0.25, ody: 0 });
      if (t >= tk.tf + 0.5) cnt++;
      const d = R.toks.find(o => o.dup && o.j === tk.j), pu = d ? M.io((t - d.tf - 0.5) / 0.2) * (1 - M.io((t - d.tf - 1.1) / 0.3)) : 0;
      attr(tk.c, 'stroke-width', (3 + 3 * pu).toFixed(2)); attr(tk.c, 'fill', mix('#FFFFFF', '#EDE6FC', pu));
    } else {
      const dz = M.io((t - tk.tf - 0.75) / 0.45);
      const on = M.vis(tk.g, t, tk.tf, tk.tf + 0.75, { dy: 0, fade: 0.08, outDur: 0.45, osc: 0.2, ody: 18 });
      attr(tk.c, 'stroke', mix(XC, C.red, M.io((t - tk.tf - 0.5) / 0.2)));
    }
  });
  const ds = R.toks.filter(o => o.dup);
  const dc = ds.find(o => t >= o.tf + 0.4 && t < o.tf + 1.6) || null;
  if (dc) { attr(R.dupTag, 'x', R.sx(dc.j)); }
  R.dupTag.style.opacity = dc ? (M.clamp((t - dc.tf - 0.45) / 0.15) * (1 - M.clamp((t - dc.tf - 1.4) / 0.2))).toFixed(3) : '0';
  M.hide(R.dupTag, !dc || t >= R.tOut);
  R.commas.forEach(cm => { const tk = R.toks.find(o => !o.dup && o.j === cm.j); M.vis(cm.e, t, tk.tf + 0.45, R.tOut, { dy: 0, fade: 0.1, outDur: 0.2, ody: 0 }); });
  return t >= R.tIn && t < R.tOut + 0.3 ? cnt : -1;
};

/* ---------- O: a word vs a set ---------- */
const OW1 = ['T', 'E', 'A'], OW2 = ['A', 'T', 'E'];
$('#owR').innerHTML = OW1.map((c, i) => `<div class="lt" id="ow1${i}" style="left:${36 + i * 104}px;top:104px;width:88px;height:88px;font-size:48px">${c}</div>`).join('') +
  OW2.map((c, i) => `<div class="lt" id="ow2${i}" style="left:${36 + i * 104}px;top:286px;width:88px;height:88px;font-size:48px">${c}</div>`).join('') +
  `<div class="wr" id="oe1" style="top:104px;left:36px"><div class="eq" style="left:340px">spells <span class="a">TEA</span></div></div>
   <div class="wr" id="oe2" style="top:286px;left:36px"><div class="eq" style="left:340px">spells <span class="a">ATE</span></div></div>
   <div id="oNe" style="position:absolute;left:520px;top:190px;font:700 72px/1 Poppins;color:var(--red)">≠</div>`;
const tO2a = wt('O2', 5) - 0.05, tO2b = wt('O2', 10) - 0.1;
$('#osA').innerHTML = K(`\\{\\,${xc('T')},\\ ${xc('E')},\\ ${xc('A')}\\,\\}`);
$('#osB').innerHTML = K(`= \\{\\,${xc('A')},\\ ${xc('T')},\\ ${xc('E')}\\,\\}`);
const os = $('#oS');
const bag = mk(os, 'ellipse', { cx: 392, cy: 392, rx: 240, ry: 72, fill: ACB, stroke: AC, 'stroke-width': 3 });
const bagL = txt(os, 392, 300, 'a bag, not a queue', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600 });
const bagT = OW1.map(ch => { const pg = mk(os, 'g', {}), g = mk(pg, 'g', {}); mk(g, 'circle', { r: 32, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 12, ch, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 32, 'font-weight': 700, fill: XC }); return { pg, g }; });
const th1 = PUC.think($('#th1'), { q: `Are ${K('\\{1, 2, 2, 3\\}')} and ${K('\\{3, 2, 1\\}')} the same set?`, opts: ['Yes, the same set', 'No, different sets'], right: 0, why: `Drop the repeat, ignore the order: both are ${K('\\{1, 2, 3\\}')}.` });

/* ---------- B: set builder to roster, live x ---------- */
$('#bF').innerHTML = K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')}\\ \\text{is a positive integer},\\ ${xc('x')}^2 < 40`)} \\,\\}`);
$('#bRd').innerHTML = `<i class="x" style="font-family:Poppins">x</i> = <span id="bX">1</span>&nbsp;&nbsp;&nbsp;<i class="x" style="font-family:Poppins">x</i>² = <span id="bX2">1</span>`;
$('#bStop').innerHTML = K(`${xc('x')} \\ge 7 \\;\\Rightarrow\\; ${xc('x')}^2 \\ge 49 > ${rc('40')} \\;:\\; \\text{stop}`);
$('#bRo').innerHTML = K(`\\{\\,${xc('1, 2, 3, 4, 5, 6')}\\,\\}`);
const tX = [T0('B4'), wt('B5', 'Two'), wt('B5', 'Three'), wt('B5', 'Four'), wt('B5', 'Five'), wt('B5', 'Six'), wt('B6', 'Seven')];
const bs = $('#bS'), BB = 470, BX = x => 136 + (x - 1) * 94, BH = v => v * 6.4;
mk(bs, 'line', { x1: 70, y1: BB, x2: 748, y2: BB, stroke: C.ink, 'stroke-width': 3 });
const bLim = mk(bs, 'line', { x1: 70, y1: BB - BH(40), x2: 748, y2: BB - BH(40), stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '10 7' });
const bLimT = txt(bs, 96, BB - BH(40) - 14, 'limit: x² < 40', { 'text-anchor': 'start', 'font-size': 20, fill: RC, 'font-weight': 600 });
const bLim0 = txt(bs, 62, BB - BH(40) + 7, '40', { 'text-anchor': 'end', 'font-size': 20, fill: RC, 'font-weight': 600 });
const bars = [1, 2, 3, 4, 5, 6, 7].map(x => {
  const r = mk(bs, 'rect', { x: BX(x) - 30, y: BB, width: 60, height: 0, rx: 6, fill: x < 7 ? XC : C.red });
  const v = txt(bs, BX(x), BB - 12, x * x, { 'text-anchor': 'middle', 'font-size': 22, fill: x < 7 ? XC : C.red, 'font-weight': 600 });
  const l = txt(bs, BX(x), BB + 34, x, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
  return { x, r, v, l };
});
const bAx = txt(bs, 70, BB + 34, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: XC, 'font-weight': 700 });
let bLast = -1;

/* ---------- P: roster to set builder, n builds x ---------- */
$('#pRo').innerHTML = K(`\\{\\,${xc('1')},\\ ${xc('4')},\\ ${xc('9')},\\ ${xc('16')},\\ ${xc('25')},\\ \\dots\\,\\}`);
const PS = [[K(`${xc('1')} = ${nc('1')}\\times${nc('1')},\\ \\ ${xc('4')} = ${nc('2')}\\times${nc('2')},\\ \\ ${xc('9')} = ${nc('3')}\\times${nc('3')}`), 'what is each element made of?'],
  [K(`${xc('x')} = ${nc('n')} \\times ${nc('n')}`), 'a natural number n, times itself'],
  [K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')} = ${nc('n')}^2,\\ ${nc('n')} \\in \\mathbb{N}`)} \\,\\}`), 'the three dots became one rule']];
$('#pSt').innerHTML = PS.map(([f, w], i) => `<div class="st" id="ps${i}" style="top:${188 + i * 124}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:40px">${f}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('P2', 'Step'), wt('P3', 'Step'), wt('P4', 'Step')];
const ps = $('#pS'), PX = i => 196 + i * 104, NY = 150, XY = 352;
const pBox = mk(ps, 'rect', { x: 140, y: XY - 52, width: 612, height: 104, rx: 52, fill: ACB, stroke: AC, 'stroke-width': 3 });
const pBoxL = txt(ps, 160, XY + 88, 'ONLY x LIVES IN THE SET', { 'font-size': 18, fill: AC, 'font-weight': 600, 'letter-spacing': 1.5 });
const pN = txt(ps, 72, NY + 18, 'n', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 56, 'font-weight': 700, fill: NC });
const pNc = txt(ps, 72, NY + 58, 'COUNTER', { 'text-anchor': 'middle', 'font-size': 16, fill: NC, 'font-weight': 600, 'letter-spacing': 1 });
const pX = txt(ps, 72, XY + 18, 'x', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 56, 'font-weight': 700, fill: XC });
const pXc = txt(ps, 72, XY + 58, 'ELEMENT', { 'text-anchor': 'middle', 'font-size': 16, fill: XC, 'font-weight': 600, 'letter-spacing': 1 });
const pTok = (x, y, s, col) => { const g = mk(mk(ps, 'g', { transform: `translate(${x},${y})` }), 'g', {}); mk(g, 'circle', { r: 34, fill: '#fff', stroke: col, 'stroke-width': 3 }); txt(g, 0, 11, s, { 'text-anchor': 'middle', 'font-size': 30, fill: col, 'font-weight': 600 }); return g; };
const pNs = [1, 2, 3, 4, 5].map((v, i) => pTok(PX(i), NY, v, NC)), pXs = [1, 4, 9, 16, 25].map((v, i) => pTok(PX(i), XY, v, XC));
const pDn = txt(ps, PX(5) - 4, NY + 10, '...', { 'text-anchor': 'middle', 'font-size': 30, fill: NC, 'font-weight': 600 });
const pDx = txt(ps, PX(5) - 4, XY + 10, '...', { 'text-anchor': 'middle', 'font-size': 30, fill: XC, 'font-weight': 600 });
const pAr = [0, 1, 2, 3, 4].map(i => { const a = PUC.arrow(ps, C.ink2, 3, 12); a.set(PX(i), NY + 40, PX(i), XY - 42); const l = txt(ps, PX(i) + 10, (NY + XY) / 2 + 6, `${i + 1}×${i + 1}`, { 'font-size': 16, fill: C.mute, 'font-weight': 600 }); return { a, l }; });
const tPx = [8, 9, 10, 11, 12].map(i => wt('P1', i) - 0.05), tPn = [wt('P2', 11), wt('P2', 16), wt('P2', 21), wt('P3', 'natural'), wt('P3', 'natural') + 0.2];
const avA = PUC.avatar($('#sP'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'n is the helper. x is the answer.' });
const th2 = PUC.think($('#th2'), { q: `Is ${K('8')} in the set ${K(`\\{\\, x : x = n^2,\\ n \\in \\mathbb{N} \\,\\}`)}?`, opts: ['Yes', 'No'], right: 1, why: `${K('2^2 = 4')} and ${K('3^2 = 9')}: no natural number squared gives 8, so ${K('8 \\notin')} the set.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\{\\,${xc('1, 2, 3, 4, 5, 6')}\\,\\} = \\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in \\mathbb{N},\\ ${xc('x')}^2 < 40`)} \\,\\}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Write in set builder form:<br>${K(`\\left\\{\\,\\dfrac{1}{2},\\ \\dfrac{2}{3},\\ \\dfrac{3}{4},\\ \\dfrac{4}{5},\\ \\dfrac{5}{6},\\ \\dfrac{6}{7}\\,\\right\\}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{top} = ${nc('n')}:\\ 1, 2, 3, \\dots, 6`)],
  [K(`\\text{bottom} = ${nc('n')} + 1`)],
  [K(`${nc('n')} \\in \\mathbb{N},\\ 1 \\le ${nc('n')} \\le 6`)],
  [K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')} = \\dfrac{${nc('n')}}{${nc('n')}+1},\\ ${nc('n')} \\in \\mathbb{N},\\ 1 \\le ${nc('n')} \\le 6`)} \\,\\}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 84 });
$('#wl .lbl').style.top = '30px';
$('#frs').innerHTML = [1, 2, 3, 4, 5, 6].map((n, i) => `<div class="fr" id="fr${n}" style="left:${62 + (i % 3) * 230}px;top:${88 + Math.floor(i / 3) * 196}px"><div class="tp">${n}</div><i></i><div class="bt">${n + 1}</div><div class="nl">n = ${n}</div><div class="p1">+1</div></div>`).join('');
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'set')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{letters of COMMITTEE: } 9 \\text{ elements}`), right: K(`\\{\\,${xc('C, O, M, I, T, E')}\\,\\}`) + '&nbsp; 6 elements' });
const ts = $('#tS'), CW = 'COMMITTEE'.split(''), DUP = [3, 6, 8];
const tT9 = CW.map((ch, i) => { const g = mk(mk(ts, 'g', { transform: `translate(${48 + i * 58},96)` }), 'g', {}); const r = mk(g, 'rect', { x: -24, y: -24, width: 48, height: 48, rx: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); const tt = txt(g, 0, 10, ch, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: C.ink }); const sk = mk(g, 'line', { x1: -20, y1: 20, x2: 20, y2: -20, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' }); return { g, r, tt, sk, dup: DUP.includes(i) }; });
const tNote = txt(ts, 280, 186, '9 letters · 6 different', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Write a set in roster or set builder form, or count its elements.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`S = \\{\\, ${xc('x')} : ${rc(`${xc('x')} = ${nc('n')}^2 - 6${nc('n')} + 10,\\ ${nc('n')} \\in \\mathbb{N},\\ ${nc('n')} \\le 10`)} \\,\\}`)}<br>How many elements does S have?`,
  opts: ['6', '8', '9', '10'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${nc('n')}^2 - 6${nc('n')} + 10 = (${nc('n')} - 3)^2 + 1`)], [K(`${nc('n')} = 2,\\ 4 \\;\\Rightarrow\\; ${xc('x')} = 2`)], [K(`${nc('n')} = 1,\\ 5 \\;\\Rightarrow\\; ${xc('x')} = 5`)], ['10 values, 2 repeats'], [K(`10 - 2 = 8 \\text{ elements}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'rewrite'), wt('A3', 'two'), wt('A3', 'one'), wt('A4', 'Ten'), wt('A4', 'minus')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · roster and set builder', y0: 96, dy: 84, txt: [1, 0, 1, 0, 1],
  lines: ['<b>Roster</b>: each element once, in any order',
    K(`\\{\\,${xc('S, C, H, O, L')}\\,\\} = \\{\\,${xc('H, O, L, C, S')}\\,\\}`),
    '<b>Set builder</b>: the one rule every element follows',
    K(`\\{\\,${xc('1, 4, 9, 16')}, \\dots\\,\\} = \\{\\, ${xc('x')} : ${rc(`${xc('x')} = ${nc('n')}^2,\\ ${nc('n')} \\in \\mathbb{N}`)} \\,\\}`),
    '<b>x</b> is the element; <b>n</b> is only a counter'] });
const YQ = ['Write the set of letters of the word APPLE in roster form.', `Write ${K('\\{2, 4, 8, 16, 32\\}')} in set builder form.`, `In ${K('\\{\\, x : x = n^2,\\ n \\in \\mathbb{N} \\,\\}')}, which letter lives in the set?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 04', topic: 'Even primes bigger than 2: nothing, or something?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tDupO = wt('R4', 3);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tDupO - 0.4, 1.05, 960, 560], [wt('R5', 'So'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: six letter tiles */
  WORD.forEach((_, i) => M.vis($('#tl' + i), t, tTl[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tR1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('R1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hL1'), t, tMorph + 0.2, 1e9, { dy: 10 });
    WORD.forEach((_, i) => { const el = $('#hw' + i); M.vis(el, t, tMorph + 0.3 + i * 0.07, 1e9, { dy: 14 });
      const s = i === 4 ? M.io((t - wt('H4', 'second') + 0.1) / 0.3) : 0; el.style.borderColor = mix(C.ink, C.red, s); el.style.color = mix(C.ink, C.red, s); el.style.background = mix('#FFFFFF', C.redBg, s); });
    M.vis($('#hL2'), t, wt('H2', 'set') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#hSet'), t, wt('H2', 9) - 0.1, 1.4);
    M.vis($('#hP1'), t, wt('H4', 'Six') - 0.1, 1e9, POP); M.vis($('#hP2'), t, wt('H4', 'five') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* R: rule 1 + live drop */
  const rOn = t >= tR1 - 0.1 && t < tO1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('O1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#rs' + i); M.vis(el.querySelector('.n'), t, tRs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRs[i], 0.8); M.vis(el.querySelector('.why'), t, tRs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tRs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#rm'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(brL, t, tR1 + 0.5, 1e9, { dy: 0 }); M.vis(brR, t, tR1 + 0.5, 1e9, { dy: 0 }); M.vis(setLab, t, tR1 + 0.6, 1e9, { dy: 0 });
    const c1 = runDrop(RUN1, t), c2 = runDrop(RUN2, t), cn = c2 >= 0 ? c2 : c1;
    M.setT($('#rCnt'), `${Math.max(0, cn)} element${cn === 1 ? '' : 's'}`);
    M.vis($('#rCnt'), t, wt('R3', 9) + 0.3, 1e9, POP);
  }

  /* O: a word vs a set + think */
  const oOn = t >= tO1 - 0.1 && t < tB1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('O4');
    M.vis($('#ow'), t, tO1 + 0.1, out, { dx: -60, dy: 0, ...o });
    OW1.forEach((_, i) => M.vis($('#ow1' + i), t, tO2a + i * 0.15, 1e9, { dy: 14 }));
    M.vis($('#oe1'), t, wt('O2', 'TEA') - 0.1, 1e9, { dx: -12, dy: 0 });
    OW2.forEach((ch, i) => { const el = $('#ow2' + i), from = OW1.indexOf(ch), u = M.io((t - tO2b - i * 0.18) / 0.5);
      M.hide(el, u <= 0); el.style.transform = `translate(${((from - i) * 104 * (1 - u)).toFixed(1)}px,${(-182 * (1 - u)).toFixed(1)}px)`; el.style.opacity = M.clamp(u * 4).toFixed(2); });
    M.vis($('#oe2'), t, wt('O2', 'ATE') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#oNe'), t, wt('O2', 'Same') - 0.1, 1e9, POP);
    M.vis($('#owP'), t, wt('O2', 'different') - 0.1, 1e9, POP);
    M.vis($('#os'), t, T0('O3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#osA'), t, wt('O3', 7) - 0.05, 0.6); PUC.write($('#osB'), t, wt('O3', 13) - 0.1, 0.7);
    M.vis(bag, t, wt('O3', 'same') - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(bagL, t, wt('O3', 'same'), 1e9, { dy: 0 });
    const th0 = wt('O3', 'same');
    bagT.forEach((b, i) => { const a = Math.PI * 2 * (i / 3) + 0.9 * Math.max(0, t - th0) + Math.PI / 2; attr(b.pg, 'transform', `translate(${(392 + 150 * Math.cos(a)).toFixed(1)},${(392 + 32 * Math.sin(a)).toFixed(1)})`); M.vis(b.g, t, th0 - 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); });
    M.vis($('#osP'), t, wt('O3', 'inside') - 0.2, 1e9, POP);
    M.vis($('#th1'), t, tO4 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tO4, tOpts: wt('O4', 'same') - 0.1, tCount: T1('O4') + 0.05, dur: 3, tAns: T0('O5') - 0.02, tWhy: wt('O5', 'Drop') });
  }

  /* B: set builder to roster, live x */
  const bOn = t >= tB1 - 0.1 && t < tP1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('P1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#bF'), t, T0('B2') + 0.2, 1.4);
    M.vis($('#bL'), t, T0('B3') - 0.05, 1e9, { dy: 10 });
    const xi = tX.reduce((a, tt, i) => t >= tt - 0.05 ? i + 1 : a, 1);
    if (xi !== bLast) { bLast = xi; M.setT($('#bX'), String(xi)); M.setT($('#bX2'), String(xi * xi)); const ok = xi < 7; $('#bV').innerHTML = M.icon(ok ? 'check' : 'x', 26, '#fff', 3) + (ok ? 'IN' : 'OUT'); $('#bV').style.background = ok ? C.ok : C.red; }
    M.vis($('#bRd'), t, tX[0] - 0.15, 1e9, { dy: 14 }); M.vis($('#bV'), t, wt('B4', 'in') - 0.05, 1e9, POP);
    M.vis($('#bStop'), t, wt('B6', 'Every') - 0.1, 1e9, { dy: 10 });
    M.vis($('#bL2'), t, wt('B7', 'roster') - 0.1, 1e9, { dy: 10 }); PUC.write($('#bRo'), t, wt('B7', 'one') - 0.05, 1.4);
    M.vis($('#bg'), t, T0('B2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(bLim, t, wt('B2', 'forty') - 0.2, 0.7); M.vis(bLimT, t, wt('B2', 'forty') + 0.2, 1e9, { dy: 0 }); M.vis(bLim0, t, wt('B2', 'forty') + 0.2, 1e9, { dy: 0 });
    M.vis(bAx, t, T0('B2') + 0.7, 1e9, { dy: 0 });
    let inC = 0;
    bars.forEach((b, i) => { const g = M.spring(t - tX[i], M.SOFT), h = BH(b.x * b.x) * M.clamp(g, 0, 1.03);
      attr(b.r, 'y', (BB - h).toFixed(1)); attr(b.r, 'height', Math.max(0, h).toFixed(1)); M.hide(b.r, t < tX[i]);
      attr(b.v, 'y', (BB - h - 12).toFixed(1)); M.vis(b.v, t, tX[i] + 0.25, 1e9, { dy: 0 }); M.vis(b.l, t, T0('B2') + 0.7 + i * 0.05, 1e9, { dy: 0 });
      if (b.x < 7 && t >= tX[i] + 0.2) inC++; });
    M.setT($('#bCnt'), `${inC} in${t >= tX[6] + 0.3 ? ' · 1 out' : ''}`); M.vis($('#bCnt'), t, tX[0] + 0.2, 1e9, POP);
  }

  /* P: roster to set builder + n vs x + think */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D3');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pRo'), t, tPx[0] - 0.05, 1.6);
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i] + (i === 0 ? 0.6 : 0.1), i === 0 ? 2.4 : 0.9); M.vis(el.querySelector('.why'), t, tPs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(188, tPs.slice(1).map((tt, i) => [tt - 0.1, 188 + (i + 1) * 124]), M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#pr'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    pXs.forEach((g, i) => M.vis(g, t, tPx[i], 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 })); M.vis(pDx, t, wt('P1', 'so'), 1e9, { dy: 0 });
    M.vis(pX, t, tPx[0], 1e9, { dy: 0 });
    pNs.forEach((g, i) => M.vis(g, t, tPn[i], 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 })); M.vis(pDn, t, tPn[4] + 0.2, 1e9, { dy: 0 });
    pAr.forEach((a, i) => { M.vis(a.a.g, t, tPn[i] + 0.15, 1e9, { dy: 0, fade: 0.15 }); M.vis(a.l, t, tPn[i] + 0.3, 1e9, { dy: 0 }); });
    M.vis(pN, t, wt('P3', 'call') - 0.05, 1e9, { ...POP, sc: 0.4 });
    M.vis(pNc, t, wt('D1', 'counter') - 0.1, 1e9, { dy: 0 }); M.vis(pXc, t, wt('D1', 'element') - 0.1, 1e9, { dy: 0 });
    M.vis(pBox, t, wt('D2', 'Only') - 0.15, 1e9, { dy: 0, fade: 0.25 }); M.vis(pBoxL, t, wt('D2', 'lives'), 1e9, { dy: 0 });
    avA(t, wt('D2', 'set') + 0.2, out);
    M.vis($('#th2'), t, tD3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tD3, tOpts: wt('D3', 'eight') - 0.1, tCount: T1('D3') + 0.05, dur: 3, tAns: T0('D4') - 0.02, tWhy: wt('D4', 'Two') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Roster') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Set') - 0.1, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const tops = wt('W3', 'tops'), bots = wt('W4', 'bottom'), rng = wt('W5', 'natural');
    for (let n = 1; n <= 6; n++) {
      const el = $('#fr' + n); M.vis(el, t, wt('W2', 'One') + (n - 1) * 0.25, 1e9, { dy: 10, fade: 0.12 });
      const a = M.io((t - tops - (n - 1) * 0.12) / 0.25), b = M.io((t - bots - (n - 1) * 0.12) / 0.25);
      el.querySelector('.tp').style.color = mix(C.ink, NC, a);
      el.style.borderColor = mix(C.soft, NC, a * (1 - b)); el.style.background = mix(C.soft, '#FFFFFF', a);
      M.vis(el.querySelector('.p1'), t, bots + (n - 1) * 0.12, 1e9, POP);
      M.vis(el.querySelector('.nl'), t, rng + (n - 1) * 0.1, 1e9, POP);
    }
    M.vis($('#wRes'), t, wt('W5', 'six') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'twice') - 0.1, tRight: wt('X3', 'once') + 0.2 });
    tT9.forEach((d, i) => { M.vis(d.g, t, wt('X2', 'COMMITTEE') + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const s = d.dup ? M.io((t - wt('X3', 'twice') - DUP.indexOf(i) * 0.15) / 0.25) : 0; M.drawU(d.sk, s); attr(d.r, 'stroke', mix(C.ink, C.red, s)); attr(d.tt, 'fill', mix(C.ink, C.dim, s)); });
    M.vis(tNote, t, wt('X3', 'once'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'roster') });
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
