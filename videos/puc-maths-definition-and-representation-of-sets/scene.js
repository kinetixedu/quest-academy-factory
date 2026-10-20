// PUC Maths Ep 01: Definition and representation of sets (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element x violet, rule coral (accent), set A blue, not-in red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;

Object.assign(M.IC, {
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  walk: ['M13 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M10 21l2-6 3 3v3', 'M7 11l3-3h3l2 4 3 1', 'M12 15l-1-6'],
  star: ['M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP3 = T0('P3'), tP4 = T0('P4'), tP5 = T0('P5'), tP6 = T0('P6');
const tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tE1 = T0('E1'), tT = T0('T1'), tZ1 = T0('Z1'), tZ6 = T0('Z6');
const tR1 = T0('R1'), tR4 = T0('R4'), tR7 = T0('R7'), tS1 = T0('S1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three friends' lists ---------- */
const LS = [['FRIEND 1 · GOOD STUDENTS', 'Sana, Ravi'], ['FRIEND 2 · GOOD STUDENTS', 'Meera, Joel'], ['FRIEND 3 · GOOD STUDENTS', 'Ravi, Kiran']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'three') - 0.05, wt('H1', 'three') + 0.25, wt('H1', 'three') + 0.55];

/* ---------- H: two lists ---------- */
const HG = ['Sana, Ravi', 'Meera, Joel', 'Ravi, Kiran'], HB = 'Kiran, Ravi, Sana';
$('#hcs').innerHTML = `<div class="hh" style="left:216px;color:var(--red)">GOOD STUDENTS</div><div class="hh" style="left:500px;color:var(--ok)">RIDE A BICYCLE</div>` +
  [0, 1, 2].map(i => `<div class="hc" id="hf${i}" style="left:36px;top:${124 + i * 108}px;width:162px;background:#fff;padding:0;font:600 18px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">FRIEND ${i + 1}</div>
    <div class="hc" id="hg${i}" style="left:200px;top:${124 + i * 108}px;width:268px">${HG[i]}</div>
    <div class="hc" id="hb${i}" style="left:484px;top:${124 + i * 108}px;width:264px">${HB}</div>`).join('') +
  `<div class="pillp bad" id="hgP" style="left:200px;top:470px">3 different lists</div><div class="pillp" id="hbP" style="left:484px;top:470px;background:var(--okBg);color:#1F6B3F">${M.icon('check', 22, C.ok, 3)} Same list</div>`;
const tHb = wt('H2', 'bicycle'), tHm = wt('H2', 'match');

/* ---------- P: membership test ---------- */
$('#ioI').innerHTML = M.icon('check', 26, '#fff', 3) + 'IN'; $('#ioO').innerHTML = M.icon('x', 26, '#fff', 3) + 'OUT';
const ms = $('#mS'), TX = i => 92 + i * 75, TY = 150;
const oval = mk(ms, 'ellipse', { cx: 250, cy: 380, rx: 200, ry: 100, fill: ACB, stroke: AC, 'stroke-width': 3 });
const ovL = txt(ms, 70, 300, 'IN', { 'font-size': 20, fill: AC, 'font-weight': 600, 'letter-spacing': 2 });
const tray = mk(ms, 'rect', { x: 498, y: 288, width: 250, height: 184, rx: 16, fill: C.redBg, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const trL = txt(ms, 516, 316, 'OUT', { 'font-size': 20, fill: C.red, 'font-weight': 600, 'letter-spacing': 2 });
const IN_SLOT = { 2: [130, 384], 4: [210, 384], 6: [290, 384], 8: [370, 384] };
const OUT_SLOT = { 1: [548, 370], 3: [623, 370], 5: [698, 370], 7: [585, 436], 9: [660, 436] };
const tok = [];
for (let n = 1; n <= 9; n++) { const pg = mk(ms, 'g', {}), g = mk(pg, 'g', {}); const c = mk(g, 'circle', { cx: 0, cy: 0, r: 30, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); const tt = txt(g, 0, 10, n, { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 }); tok.push({ n, pg, g, c, tt }); }
const tTok = n => n === 1 ? wt('P5', 'One') : n === 2 ? wt('P5', 'Two') + 0.2 : wt('P6', 'Every') + (n - 3) * 0.42;
const tokP = (tk, t) => { const [x1, y1] = [TX(tk.n - 1), TY], [x2, y2] = tk.n % 2 ? OUT_SLOT[tk.n] : IN_SLOT[tk.n]; const u = M.io((t - tTok(tk.n)) / 0.55); return [x1 + (x2 - x1) * u, y1 + (y2 - y1) * u - 70 * Math.sin(Math.PI * u), u]; };
$('#mRo').innerHTML = K(`\\{\\,${xc('2')},\\ ${xc('4')},\\ ${xc('6')},\\ ${xc('8')}\\,\\}`);

/* ---------- K: well-defined vs not ---------- */
$('#kwR').innerHTML = [['bike', 'Kiran', 'RIDES A BICYCLE', 1], ['walk', 'Joel', 'WALKS TO COLLEGE', 0]].map(([ic, n, w, ok], i) =>
  `<div class="nr" id="kw${i}" style="top:${92 + i * 120}px"><i>${M.icon(ic, 34, C.ink2, 2.2)}</i><div class="nn">${n}</div><div class="nw">${w}</div><div class="chip" style="right:22px;top:22px;background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 22, '#fff', 3)}${ok ? 'IN' : 'OUT'}</div></div>`).join('');
$('#knR').innerHTML = `<div class="nr" id="kn0" style="top:92px"><i>${M.icon('user', 34, C.ink2, 2.2)}</i><div class="nn">Meera</div><div class="nw">IS SHE A GOOD STUDENT?</div></div>` +
  [['FRIEND 1 SAYS', 'YES', C.ok], ['FRIEND 2 SAYS', 'NO', C.red]].map(([a, b, col], i) => `<div class="nr" id="kn${i + 1}" style="top:${212 + i * 0}px;left:${36 + i * 364}px;width:348px"><div class="nw" style="left:22px;top:20px">${a}</div><div class="chip" style="left:22px;top:46px;height:40px;font-size:20px;background:${col}">${b}</div></div>`).join('');
$('#qm').style.top = '330px';
const th1 = PUC.think($('#th1'), { q: 'The months that begin with J: a set, or not?', opts: ['Yes, a set', 'No, not a set'], right: 0, why: 'January, June, July. Anyone with a calendar gets the same three: well-defined.' });

/* ---------- E: elements, belongs to ---------- */
const es = $('#eS');
mk(es, 'ellipse', { cx: 330, cy: 320, rx: 250, ry: 170, fill: ACB, stroke: AC, 'stroke-width': 3.5 });
const eA = txt(es, 92, 182, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 56, fill: AC });
const EP = [[230, 270], [400, 270], [230, 390], [400, 390]];
const eT = [2, 4, 6, 8].map((n, i) => { const g = mk(mk(es, 'g', { transform: `translate(${EP[i][0]},${EP[i][1]})` }), 'g', {}); const c = mk(g, 'circle', { r: 38, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 12, n, { 'text-anchor': 'middle', 'font-size': 34, fill: XC, 'font-weight': 600 }); return { g, c }; });
const e3 = mk(mk(es, 'g', { transform: 'translate(680,320)' }), 'g', {}); const e3c = mk(e3, 'circle', { r: 38, fill: '#fff', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 5' }); txt(e3, 0, 12, '3', { 'text-anchor': 'middle', 'font-size': 34, fill: C.red, 'font-weight': 600 });
const eLb = txt(es, 330, 540, 'elements (members) of A', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const ES = [[ac('A'), 'a capital letter names the set'], [`${xc('2')} \\in ${ac('A')}`, 'two belongs to A'], [`${red('3')} \\notin ${ac('A')}`, 'three does not belong to A']];
$('#eSt').innerHTML = `<div class="hiBox" id="eHi" style="left:20px;width:744px;height:132px"></div>` + ES.map(([f, w], i) => `<div class="st" id="es${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tEs = [wt('E2', 'capital'), wt('E3', 'reads'), wt('E4', 'strike')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${xc('2')} \\in ${ac('A')} \\qquad ${red('3')} \\notin ${ac('A')}`);

/* ---------- Z: N Z Q R ---------- */
const ZS = [['\\mathbb{N}', 'Natural numbers', '1, 2, 3, 4, ...'], ['\\mathbb{Z}', 'Integers', '..., -2, -1, 0, 1, 2, ...'], ['\\mathbb{Q}', 'Rational numbers', 'p/q, p and q integers, q ≠ 0'], ['\\mathbb{R}', 'Real numbers', 'every point on the number line']];
$('#zR').innerHTML = `<div class="hiBox" id="zHi" style="left:20px;width:744px;height:104px"></div>` + ZS.map(([s, n, e], i) => `<div class="ss" id="zs${i}" style="top:${84 + i * 112}px"><div class="sy">${K(s)}</div><div class="sn">${n}</div><div class="se">${e}</div></div>`).join('');
const tZs = [T0('Z2'), T0('Z3'), T0('Z4'), T0('Z5')];
const zs = $('#zS'), ZX = v => 392 + v * 78, ZY = 240;
mk(zs, 'line', { x1: 44, y1: ZY, x2: 740, y2: ZY, stroke: C.ink, 'stroke-width': 3 });
mk(zs, 'path', { d: `M740,${ZY} l-14,-8 v16 z`, fill: C.ink }); mk(zs, 'path', { d: `M44,${ZY} l14,-8 v16 z`, fill: C.ink });
for (let v = -4; v <= 4; v++) { mk(zs, 'line', { x1: ZX(v), y1: ZY - 10, x2: ZX(v), y2: ZY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(zs, ZX(v), ZY + 46, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const zR = mk(zs, 'line', { x1: 56, y1: ZY, x2: 728, y2: ZY, stroke: RC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const zDots = []; const zd = (v, set, lab) => { const c = mk(zs, 'circle', { cx: ZX(v), cy: ZY, r: 11, fill: RC }); const o = { v, set, c }; if (lab) { o.l = txt(zs, ZX(v), ZY - 28, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 }); } zDots.push(o); };
for (let v = 1; v <= 4; v++) zd(v, 0); for (let v = -4; v <= 0; v++) zd(v, 1);
[[0.5, '1/2'], [-1.5, '-3/2'], [2.5, '5/2'], [-3.25, '-13/4']].forEach(([v, l]) => zd(v, 2, l));
const zMore = txt(zs, 700, ZY - 28, '...', { 'text-anchor': 'middle', 'font-size': 26, fill: RC, 'font-weight': 600 });
const zCap = txt(zs, 392, 340, '', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const zCapT = ['N: starts at 1, goes on forever', 'Z: adds 0 and the negatives', 'Q: adds every fraction', 'R: fills the whole line'];
const zz0 = mk(zs, 'circle', { cx: ZX(0), cy: ZY, r: 22, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
$('#zTag').innerHTML = K(`0 \\notin \\mathbb{N} \\qquad 0 \\in \\mathbb{Z}`);
const avD = PUC.avatar($('#sZ'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So every natural number is an integer too.' });
const th2 = PUC.think($('#th2'), { q: 'Is zero a natural number?', opts: ['Yes', 'No'], right: 1, why: 'Natural numbers start at 1: N = {1, 2, 3, ...}. Zero first appears in Z.' });

/* ---------- R: roster, set-builder, live limit k ---------- */
$('#rRo').innerHTML = K(`\\{\\,${xc('2')},\\ ${xc('4')},\\ ${xc('6')},\\ ${xc('8')}\\,\\}`);
const sbTex = k => `\\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in \\mathbb{N},\\ ${xc('x')}\\ \\text{even},\\ ${xc('x')} < ${k}`)} \\,\\}`;
const AN = [['{ }', 'the set of', C.ink], ['x', 'any element', XC], [':', 'such that', C.ink], ['rule', 'after the colon', RC]];
$('#rAn').innerHTML = AN.map(([a, b, col], i) => `<div class="an" id="ran${i}" style="left:${36 + [0, 186, 372, 0][i]}px;top:${[372, 372, 372, 428][i]}px"><b style="color:${col};font-family:${i === 1 ? 'Poppins;font-style:italic' : "'IBM Plex Mono'"}">${a}</b><span style="color:var(--ink2)">${b}</span></div>`).join('');
const tAn = [wt('R6', 'curly'), wt('R6', 'stands'), wt('R6', 'colon'), wt('R6', 'After')];
const ks = $('#kS'), KX = v => 72 + v * 32, KY = 300;
mk(ks, 'line', { x1: 56, y1: KY, x2: 728, y2: KY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 20; v++) { mk(ks, 'line', { x1: KX(v), y1: KY - (v % 5 ? 7 : 12), x2: KX(v), y2: KY + (v % 5 ? 7 : 12), stroke: C.ink, 'stroke-width': 2 }); if (v % 2 === 0) txt(ks, KX(v), KY + 40, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const kDots = []; for (let v = 2; v <= 20; v += 2) kDots.push({ v, c: mk(ks, 'circle', { cx: KX(v), cy: KY, r: 12, fill: XC }) });
const kLimP = mk(ks, 'g', {}), kLim = mk(kLimP, 'g', {}); mk(kLim, 'line', { x1: 0, y1: KY - 70, x2: 0, y2: KY + 14, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }); const kLimT = txt(kLim, 0, KY - 82, 'x < 10', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const kLab = txt(ks, 392, 230, '', { 'text-anchor': 'middle', 'font-size': 18 });
const tK0 = wt('R7', 'ten'), tK1e = wt('R8', 'rule') - 0.1;
const kTr = t => 10 + 10 * M.io((t - tK0) / Math.max(1, tK1e - tK0));
let kLast = -1;

/* ---------- S: side by side ---------- */
$('#srF').innerHTML = K(`\\{\\,${xc('2')},\\ ${xc('4')},\\ ${xc('6')},\\ ${xc('8')}\\,\\}`);
$('#sbF').innerHTML = K(`\\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in \\mathbb{R},\\ 0 < ${xc('x')} < 1`)} \\,\\}`);
const sr = $('#srS'); const srD = [2, 4, 6, 8].map((n, i) => { const g = mk(mk(sr, 'g', { transform: `translate(${80 + i * 92},${300})` }), 'g', {}); mk(g, 'circle', { r: 32, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 10, n, { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 600 }); return g; });
const srC = txt(sr, 460, 310, '4 elements, all on show', { 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const sb = $('#sbS'), BX = v => 120 + v * 520, BY = 300;
mk(sb, 'line', { x1: 60, y1: BY, x2: 700, y2: BY, stroke: C.ink, 'stroke-width': 3 });
[0, 1].forEach(v => { mk(sb, 'line', { x1: BX(v), y1: BY - 10, x2: BX(v), y2: BY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(sb, BX(v), BY + 46, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); });
const sbSeg = mk(sb, 'line', { x1: BX(0), y1: BY, x2: BX(1), y2: BY, stroke: RC, 'stroke-width': 10 });
const sbO = [0, 1].map(v => mk(sb, 'circle', { cx: BX(v), cy: BY, r: 12, fill: '#fff', stroke: RC, 'stroke-width': 4 }));
const sbC = txt(sb, 380, BY - 36, 'endless: 0.1, 0.01, 0.001, ...', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Small sets get a list. Big sets get a rule.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${ac('A')} = \\{\\, ${xc('x')} : ${rc(`${xc('x')}\\ \\text{is a prime number},\\ ${xc('x')} < 20`)} \\,\\}`)}<br>Write A in roster form. Is 9 in A?`;
const wsol = PUC.solution($('#wl'), [
  ['Prime: exactly two factors, 1 and itself'],
  ['Test every number from 2 to 19'],
  [K(`${ac('A')} = \\{${xc('2, 3, 5, 7, 11, 13, 17, 19')}\\}`)],
  [K(`9 = 3 \\times 3 \\;\\Rightarrow\\; ${red('9')} \\notin ${ac('A')}`)],
  ['A has 8 elements; 2 is the only even one']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const isP = n => n > 1 && [...Array(n).keys()].slice(2).every(d => n % d);
$('#gcs').innerHTML = Array.from({ length: 18 }, (_, i) => i + 2).map((n, i) => `<div class="gc" id="gc${n}" style="left:${62 + (i % 6) * 112}px;top:${92 + Math.floor(i / 6) * 108}px">${n}</div>`).join('');
const tW4 = wt('W4', 'Test'), tW4e = T1('W4'), tScan = n => tW4 + (n - 2) * (tW4e - tW4 + 0.3) / 18;
const PW = { 2: 'two', 3: 'three', 5: 'five', 7: 'seven', 11: 'eleven', 13: 'thirteen', 17: 'seventeen', 19: 'nineteen' };
const tPw = n => wt('W5', PW[n], n === 3 ? 0 : 0);
const tW = [wt('W3', 'prime'), tW4, wt('W5', 'primes'), wt('W6', 'Nine'), wt('W7', 'eight')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\{\\, x \\in \\mathbb{Z} : x^2 < 10 \\,\\} = \\{1, 2, 3\\}`), right: K(`= \\{-3, -2, -1, 0, 1, 2, 3\\}`) + '&nbsp; 7 elements' });
const ts = $('#tS'), TXv = v => 280 + v * 58, TYl = 170;
mk(ts, 'line', { x1: 24, y1: TYl, x2: 536, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 4; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tDots = []; for (let v = -3; v <= 3; v++) tDots.push({ v, c: mk(ts, 'circle', { cx: TXv(v), cy: TYl, r: 12, fill: v > 0 ? XC : C.ok }) });
const tNote = txt(ts, TXv(-3), TYl - 34, '(-3)² = 9 < 10', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A set in set builder form: how many elements does it have?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`S = \\{\\, n \\in \\mathbb{N} : n \\le 50,\\ n^2 - 1 \\text{ divisible by } 8 \\,\\}`)}<br>How many elements does S have?`,
  opts: ['12', '24', '25', '50'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`n \\text{ even}: n^2 - 1 \\text{ odd} \\;\\Rightarrow\\; \\times`)], [K(`n \\text{ odd}: n-1,\\ n+1 \\text{ both even}`)], ['one of them is a multiple of 4'], [K(`\\text{product: multiple of } 2 \\times 4 = 8`)], [K(`n = 1, 3, 5, \\dots, 49 \\;\\Rightarrow\\; 25`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'even'), wt('A3', 'odd'), wt('A3', 'multiple'), wt('A4', 'product'), wt('A4', 'Every')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · sets', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Set</b>: a well-defined collection: every object clearly in or out',
    K(`${xc('2')} \\in ${ac('A')} \\qquad ${red('3')} \\notin ${ac('A')}`),
    K(`\\text{Roster: } \\{\\,${xc('2')}, ${xc('4')}, ${xc('6')}, ${xc('8')}\\,\\}`),
    K(`\\text{Set builder: } \\{\\, ${xc('x')} : ${rc(`${xc('x')} \\in \\mathbb{N},\\ ${xc('x')}\\ \\text{even},\\ ${xc('x')} < 10`)} \\,\\}`),
    '<b>N</b> natural · <b>Z</b> integers · <b>Q</b> rational · <b>R</b> real'] });
const YQ = ['Why is "good students" not a set?', 'Write the vowels of English in roster form.', 'What does the colon mean in set builder form?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 03', topic: 'Why does SCHOOL keep only one O? Roster and Set Builder Forms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP5 - 0.2, 1.06, 1120, 570], [tP6 + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: three different lists */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2].forEach(i => { M.vis($('#hf' + i), t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 14 }); M.vis($('#hg' + i), t, tMorph + 0.4 + i * 0.1, 1e9, { dy: 14 });
      M.vis($('#hb' + i), t, tHb - 0.1 + i * 0.12, 1e9, { dx: -16, dy: 0 });
      const ok = M.io((t - tHm) / 0.3); $('#hb' + i).style.background = mix(C.soft, C.okBg, ok); $('#hg' + i).style.background = mix(C.soft, C.redBg, M.io((t - tHm - 0.3) / 0.3)); });
    M.vis($('#hgP'), t, tHm + 0.3, 1e9, POP); M.vis($('#hbP'), t, tHm, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P: definition + membership test */
  const pOn = t >= tP1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('P2') + 0.05, { st: 0.06, sp: M.HEAVY });
    const wd = $('#dfT b'); wd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P3', 'Well')) / 0.3)); wd.style.borderRadius = '8px';
    M.vis($('#dfL'), t, wt('P3', 'test') - 0.1, 1e9, { dy: 10 });
    M.vis($('#ioI'), t, wt('P3', 'in') - 0.05, 1e9, POP); M.vis($('#ioO'), t, wt('P3', 'out') - 0.05, 1e9, POP);
    M.vis($('#dfW'), t, wt('P3', 'everyone'), 1e9, { dy: 10 });
    M.vis($('#mt'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mRule'), t, wt('P4', 'even') - 0.1, 1e9, POP);
    M.vis(oval, t, tP4 + 0.3, 1e9, { dy: 0, fade: 0.25 }); M.vis(ovL, t, tP4 + 0.4, 1e9, { dy: 0 });
    M.vis(tray, t, tP4 + 0.45, 1e9, { dy: 0, fade: 0.25 }); M.vis(trL, t, tP4 + 0.55, 1e9, { dy: 0 });
    tok.forEach((tk, i) => {
      const on = M.vis(tk.g, t, tP4 + 0.2 + i * 0.06, 1e9, { dy: 0, fade: 0.15 });
      const [x, y, u] = tokP(tk, t); attr(tk.pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      const inn = tk.n % 2 === 0, d = M.io((t - tTok(tk.n) - 0.35) / 0.3);
      attr(tk.c, 'fill', mix('#FFFFFF', inn ? '#FFFFFF' : C.redBg, d)); attr(tk.c, 'stroke', mix(C.ink, inn ? XC : C.red, d)); attr(tk.tt, 'fill', mix(C.ink, inn ? XC : C.red, d));
    });
    PUC.write($('#mRo'), t, wt('P6', 'two') - 0.1, 0.8);
  }

  /* K: side by side + pause and think */
  const kOn = t >= tK1 - 0.1 && t < tE1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kw0'), t, wt('K1', 'Kiran') - 0.1, 1e9, { dy: 16 }); M.vis($('#kw0 .chip'), t, wt('K1', 'in') - 0.05, 1e9, POP);
    M.vis($('#kw1'), t, wt('K1', 'Joel') - 0.1, 1e9, { dy: 16 }); M.vis($('#kw1 .chip'), t, wt('K1', 'out') - 0.05, 1e9, POP);
    M.vis($('#kwP'), t, wt('K1', 'Everyone') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kn0'), t, wt('K2', 'Meera') - 0.1, 1e9, { dy: 16 });
    M.vis($('#kn1'), t, wt('K2', 'yes') - 0.1, 1e9, POP); M.vis($('#kn2'), t, wt('K2', 'no') - 0.1, 1e9, POP);
    M.vis($('#qm'), t, wt('K2', 'clear') - 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#knP'), t, wt('K2', 'not') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('E1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'set') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'January') });
  }

  /* E: elements and notation */
  const eOn = t >= tE1 - 0.1 && t < tT + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    M.vis($('#ea'), t, tE1 + 0.05, 1e9, { dx: -60, dy: 0 });
    eT.forEach((e, i) => { M.vis(e.g, t, wt('E1', 'elements') - 0.1 + i * 0.1, 1e9, { dy: 0, fade: 0.15 }); const hi = M.io((t - wt('E3', 'two') + 0.05) / 0.3) * (1 - M.io((t - T0('E4')) / 0.3)); attr(e.c, 'fill', i === 0 ? mix('#FFFFFF', '#EDE6FC', hi) : '#FFFFFF'); attr(e.c, 'stroke-width', i === 0 ? (3 + 2 * hi).toFixed(2) : 3); });
    M.vis(eLb, t, wt('E1', 'members'), 1e9, { dy: 0 });
    M.vis(eA, t, wt('E2', 'capital') - 0.1, 1e9, { dy: 0 });
    M.vis(e3, t, wt('E4', 'three') - 0.1, 1e9, { dy: 0, fade: 0.15 });
    M.vis($('#en'), t, wt('E2', 'name') - 0.1, 1e9, { dx: 60, dy: 0 });
    ES.forEach((_, i) => { const el = $('#es' + i); M.vis(el.querySelector('.n'), t, tEs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tEs[i], 0.8); M.vis(el.querySelector('.why'), t, tEs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tEs[1] - 0.1, 240], [tEs[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#eHi'); M.vis(hb, t, tEs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'set') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'every') - 0.2, 0.8);
  }

  /* Z: N Z Q R */
  const zOn = t >= tZ1 - 0.1 && t < tR1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('Z6');
    M.vis($('#zl'), t, tZ1 + 0.3, out, { dx: -60, dy: 0, ...o });
    ZS.forEach((_, i) => M.vis($('#zs' + i), t, tZs[i] - 0.1, 1e9, { dy: 14 }));
    const cur = tZs.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, 0);
    const hz = M.track(84, tZs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 112]), M.SOFT)(t); const zh = $('#zHi'); M.vis(zh, t, tZs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); zh.style.top = (hz - 4).toFixed(1) + 'px';
    M.vis($('#zn'), t, tZ1 + 0.5, out, { dx: 60, dy: 0, ...o });
    zDots.forEach(d => { M.vis(d.c, t, tZs[d.set] + (d.set === 1 ? (d.v + 4) * 0.08 : d.set === 0 ? (d.v - 1) * 0.12 : 0.3), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); if (d.l) M.vis(d.l, t, tZs[2] + 0.4, tZs[3], { dy: 0 }); });
    M.vis(zMore, t, tZs[0] + 0.6, 1e9, { dy: 0 });
    M.draw(zR, t, tZs[3] + 0.1, 0.9);
    M.setT(zCap, zCapT[cur]); zCap.style.opacity = M.clamp((t - tZs[0]) / 0.3);
    M.vis(zz0, t, wt('Z3', 'zero') - 0.1, wt('Z4', 'Q') - 0.2, { dy: 0, sc: 0.4, sp: M.POP });
    M.vis($('#zTag'), t, wt('Z3', 'zero'), 1e9, POP);
    avD(t, wt('Z3', 'negative') + 0.3, out);
    M.vis($('#th2'), t, tZ6 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tZ6, tOpts: wt('Z6', 'natural') - 0.1, tCount: T1('Z6') + 0.05, dur: 3, tAns: T0('Z7') - 0.02, tWhy: wt('Z7', 'start') });
  }

  /* R: two ways + live limit */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wy0 .lb'), t, wt('R2', 'roster') - 0.1, 1e9, { dy: 10 }); PUC.write($('#rRo'), t, wt('R3', 'two') - 0.05, 0.8);
    const k = Math.round(kTr(t));
    if (k !== kLast) { kLast = k; $('#rSb').innerHTML = K(sbTex(k)); M.setT($('#kV'), String(k)); const L = []; for (let v = 2; v < k; v += 2) L.push(xc(v)); $('#kRo').innerHTML = K(`\\{\\,${L.join(',\\ ')}\\,\\}`); M.setT($('#kCnt'), `${L.length} elements`); M.setT(kLimT, `x < ${k}`); }
    M.vis($('#wy1 .lb'), t, wt('R4', 'set') - 0.1, 1e9, { dy: 10 }); PUC.write($('#rSb'), t, wt('R5', 'set') - 0.1, 1.2);
    AN.forEach((_, i) => M.vis($('#ran' + i), t, tAn[i] - 0.1, 1e9, POP));
    const hb = $('#rHi'), hOnU = M.io((t - tK0 + 0.2) / 0.3) * (1 - M.io((t - T1('R8')) / 0.4)); hb.style.top = '224px'; hb.style.opacity = hOnU.toFixed(3); M.hide(hb, hOnU < 0.01);
    M.vis($('#rk'), t, wt('R3', 'set') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kRd'), t, wt('R3', 'set') + 0.2, 1e9, { dy: 14 }); M.vis($('#kCnt'), t, wt('R3', 'set') + 0.4, 1e9, POP);
    const kv = kTr(t);
    kDots.forEach(d => { const on = d.v < kv - 0.001; M.vis(d.c, t, on ? Math.max(wt('R3', 'set') + 0.3 + d.v * 0.05, d.v < 10 ? 0 : tK0 + (d.v - 10) / 10 * (tK1e - tK0)) : null, on ? 1e9 : -1, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    attr(kLimP, 'transform', `translate(${KX(kv).toFixed(1)},0)`); M.vis(kLim, t, wt('R3', 'set') + 0.5, 1e9, { dy: 0 });
    PUC.write($('#kRo'), t, wt('R3', 'brackets') - 0.2, 0.6);
  }

  /* S: roster vs set builder */
  const sOn = t >= tS1 - 0.1 && t < tW1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('W1');
    M.vis($('#sr'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#srF'), t, wt('S1', 'Roster') + 0.1, 0.7);
    srD.forEach((g, i) => M.vis(g, t, wt('S1', 'every') + i * 0.12, 1e9, { dy: 0, fade: 0.12 })); M.vis(srC, t, wt('S1', 'element'), 1e9, { dy: 0 });
    M.vis($('#srP'), t, wt('S1', 'small') - 0.1, 1e9, POP);
    M.vis($('#sb'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#sbF'), t, T0('S2') + 0.2, 0.9);
    M.draw(sbSeg, t, wt('S2', 'real') - 0.1, 0.8); sbO.forEach(c => M.vis(c, t, wt('S2', 'real'), 1e9, { dy: 0, fade: 0.1 })); M.vis(sbC, t, wt('S2', 'zero'), 1e9, { dy: 0 });
    M.vis($('#sbP'), t, wt('S2', 'large') - 0.1, 1e9, POP);
    avA(t, wt('S2', 'one') + 0.4, out);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    for (let n = 2; n <= 19; n++) {
      const el = $('#gc' + n); M.vis(el, t, T0('W2') + 0.6 + (n - 2) * 0.04, 1e9, { dy: 10, fade: 0.12 });
      const s = M.io((t - tScan(n)) / 0.2), p = isP(n), bad = n === 9 ? M.io((t - wt('W6', 'three') + 0.05) / 0.3) : 0;
      el.style.background = p ? mix(C.soft, C.ac2, s) : mix(C.soft, '#FFFFFF', s);
      el.style.color = p ? mix(C.ink, RC, s) : mix(C.ink, bad ? C.red : C.dim, Math.max(s, bad));
      el.style.borderColor = n === 9 ? mix('#FFFFFF', C.red, bad) : p ? mix(C.soft, RC, s) : 'transparent';
      if (p) { const pw = M.io((t - tPw(n) + 0.05) / 0.15) * (1 - M.io((t - tPw(n) - 0.3) / 0.25)); if (pw > 0.001 || el.style.transform) el.style.transform = pw > 0.001 ? `scale(${(1 + 0.08 * pw).toFixed(4)})` : ''; }
    }
    const g9 = $('#gc9'), gx = $('#gx'); gx.style.left = (g9.offsetLeft + 50 - gx.offsetWidth / 2) + 'px'; gx.style.top = (g9.offsetTop + 100) + 'px';
    M.vis(gx, t, wt('W6', 'three') - 0.1, 1e9, { dy: 8 });
    M.vis($('#gRes'), t, wt('W7', 'eight') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'integers') - 0.1, tRight: wt('X3', 'negatives') + 0.2 });
    tDots.forEach(d => M.vis(d.c, t, d.v > 0 ? wt('X2', 'one', 1) + (d.v - 1) * 0.25 : wt('X3', 'negatives') + 0.1 + (d.v + 3) * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(tNote, t, wt('X3', 'nine') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
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
