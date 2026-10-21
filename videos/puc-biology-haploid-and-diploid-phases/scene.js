// PUC Biology Ep 28: Haploid and Diploid Phases (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon (nucleus / DNA violet) + batch canon for chromosome sets: n teal, 2n indigo, 3n gold
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, NUC = '#7B4B94', NUL = '#B79BCB';
const HN = '#0E8F8F', DN = '#4A5FC1', TN = '#C9962B', HNL = '#E1F4F2', DNL = '#E6E9F8';
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const hc = s => `\\textcolor{${HN}}{${s}}`, dc = s => `\\textcolor{${DN}}{${s}}`, tc = s => `\\textcolor{${TN}}{${s}}`;
const chrom = (g, x, y, L, col, w = 9) => mk(g, 'rect', { x: x - w / 2, y: y - L / 2, width: w, height: L, rx: w / 2, fill: col });

Object.assign(M.IC, {
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  half: ['M12 3v18', 'M5 8l-2 4 2 4', 'M19 8l2 4-2 4'],
  dbl: ['M12 5v14', 'M5 12h14'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tS1 = T0('S1'), tC1 = T0('C1'), tC5 = T0('C5'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['46', 'A skin cell', 'CHROMOSOMES', wt('H1', 'Forty')], ['23', 'A sperm or an egg', 'CHROMOSOMES', wt('H1', 'Twenty')], ['46', "A baby's first cell", 'CHROMOSOMES', wt('H1', 'Forty', 1)]];
$('#jobs').innerHTML = JOBS.map(([v, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i><b style="color:${i === 1 ? HN : DN}">${v}</b></i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');

/* ---------- H ---------- */
const NB = [['46', 'Skin cell', 'TWO SETS', DN, 'skin'], ['23', 'Sperm or egg', 'ONE SET', HN, 'sperm'], ['46', 'First cell', 'TWO SETS', DN, 'first']];
$('#nbs').innerHTML = NB.map(([v, n, w, c], i) => `<div class="nb" id="nb${i}" style="left:${36 + i * 248}px"><div class="nv" style="color:${c}">${v}</div><div class="nl">${n}</div><div class="nw" id="nw${i}">${w}</div></div>`).join('');
const tNb = NB.map(b => wt('H2', b[4]));
$('#eqb').innerHTML = K(`${hc('23')} + ${hc('23')} = ${dc('46')}`);
const FV = [['hash', 'Read n and 2n', 'read'], ['half', 'Where it halves', 'halves'], ['dbl', 'Where it doubles', 'doubles']];
$('#fvs').innerHTML = FV.map(([ic, n], i) => `<div class="fv" id="fv${i}">${M.icon(ic, 24, C.ac, 2.2)}${n}</div>`).join('');
const tFv = FV.map(f => wt('H5', f[2]));

/* ---------- D ---------- */
const dw = $('#dwS'), DW = {};
{ DW.cell = mk(dw, 'ellipse', { cx: 440, cy: 290, rx: 280, ry: 190, fill: '#F3F7EA', stroke: BR, 'stroke-width': 4 });
  DW.nuc = mk(dw, 'circle', { cx: 440, cy: 290, r: 130, fill: '#EFE6F6', stroke: NUC, 'stroke-width': 3.5 });
  const r = M.rng(9); DW.th = []; const DP = [[390, 230], [460, 220], [510, 260], [370, 290], [440, 280], [500, 320], [400, 350], [470, 350], [430, 245], [520, 300]]; for (let k = 0; k < 10; k++) { const [x, y] = DP[k], a = r() * 180;
    DW.th.push(mk(dw, 'path', { d: `M${x - 26},${y} q7,-10 13,0 t13,0 t13,0 t13,0`, stroke: k % 2 ? NUL : NUC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', transform: `rotate(${a.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})` })); }
  DW.lab = [lab(dw, 312, 250, 150, 140, 'Nucleus', 'end'), lab(dw, 400, 330, 170, 440, 'Chromosome', 'end'), lab(dw, 700, 220, 740, 120, 'Cell', 'end')]; }
const CS = [[['l', 120], ['m', 90], ['s', 60]], [['l', 120], ['m', 90], ['s', 60]]];
{ const s0 = $('#cs0'); CS[0].forEach(([k, L], i) => chrom(s0, 70 + i * 80, 75, L, HN, 14));
  const s1 = $('#cs1'); CS[1].forEach(([k, L], i) => { chrom(s1, 50 + i * 90, 75, L, DN, 14); chrom(s1, 72 + i * 90, 75, L, '#9AA6E6', 14); }); }

/* ---------- Z: ONION ROOT -> ROOT TIP -> NUCLEUS -> CHROMOSOMES ---------- */
const ZN = ['ONION ROOT', 'ROOT TIP CELLS', 'NUCLEUS', 'CHROMOSOMES'], ZS = ['x1', 'x10', 'x400', 'x1,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 3 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4'), T0('Z5')];
const LVI = [['RUNG 1 OF 4', 'Onion root', 'Roots grow from the base of the bulb.', 'The root tip is where cells divide fast.'],
  ['RUNG 2 OF 4', 'Root tip cells', 'Small cells, packed tight.', 'Each one has its own nucleus.'],
  ['RUNG 3 OF 4', 'Nucleus', 'The control centre of the cell.', 'Its thin threads are the chromosomes.'],
  ['RUNG 4 OF 4', 'Chromosomes', 'Lined up and counted.', '8 pairs: one of each pair from each parent.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 12 ? 46 : 56}px">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const zs = $('#zS'), ZG = [0, 1, 2, 3].map(() => mk(zs, 'g', {}));
const FOC = [[566, 492, 30], [528, 268, 46], [528, 288, 70], null];
const LB = [], ZX = {};
{ const g = ZG[0];
  const ends = [[300, 470], [360, 500], [430, 512], [490, 500], [566, 492], [620, 510], [690, 480], [740, 440], [420, 450]];
  ends.forEach(([x, y], i) => mk(g, 'path', { d: `M${520 + (i - 4) * 6},330 C${520 + (i - 4) * 14},${400} ${x + (528 - x) * 0.3},${y - 60} ${x},${y}`, stroke: '#D9C9A3', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));
  mk(g, 'path', { d: 'M528,40 C548,90 640,150 640,240 C640,310 590,340 528,340 C466,340 416,310 416,240 C416,150 508,90 528,40 Z', fill: '#E9C7D6', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M528,52 C536,120 590,180 590,250 M528,52 C520,120 466,180 466,250', stroke: '#C99AB0', 'stroke-width': 3, fill: 'none' });
  mk(g, 'path', { d: 'M470,334 L586,334', stroke: '#B08A5A', 'stroke-width': 8, 'stroke-linecap': 'round' });
  LB[0] = [lab(g, 620, 200, 760, 140, 'Bulb'), lab(g, 400, 420, 260, 400, 'Roots', 'end'), lab(g, 566, 492, 760, 470, 'Root tip')];
}
{ const g = ZG[1]; ZX.cells = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { const x = 78 + c * 100, y = 76 + r * 96; mk(g, 'rect', { x, y, width: 96, height: 92, rx: 8, fill: '#F3F7EA', stroke: BR, 'stroke-width': 3 });
    const div = (r === 2 && c === 4) || (r === 1 && c === 7) || (r === 3 && c === 1);
    if (!div) ZX.cells.push(mk(g, 'circle', { cx: x + 48, cy: y + 46, r: 20, fill: '#EFE6F6', stroke: NUC, 'stroke-width': 2.5 }));
    else for (let k = 0; k < 6; k++) mk(g, 'rect', { x: x + 44, y: y + 18 + k * 10, width: 9, height: 8, rx: 3, fill: k % 2 ? NUL : NUC, transform: `rotate(90 ${x + 48} ${y + 46})` }); }
  LB[1] = [lab(g, 176, 168, 120, 510, 'Cell wall', 'end', [176, 510]), lab(g, 426, 314, 300, 510, 'Nucleus', 'end', [426, 500]), lab(g, 552, 314, 700, 510, 'Dividing cell', 'start', [552, 500])];
  LB[1].forEach(l => attr(l.tx, 'y', 518));
}
{ const g = ZG[2];
  mk(g, 'rect', { x: 268, y: 66, width: 520, height: 446, rx: 30, fill: '#F3F7EA', stroke: BR, 'stroke-width': 5 });
  mk(g, 'circle', { cx: 528, cy: 288, r: 170, fill: '#EFE6F6', stroke: NUC, 'stroke-width': 4 });
  const r = M.rng(4); ZX.th = []; for (let k = 0; k < 16; k++) { const x = 440 + r() * 176, y = 210 + r() * 160, a = r() * 180;
    ZX.th.push(mk(g, 'path', { d: `M${x - 30},${y} q7,-12 15,0 t15,0 t15,0 t15,0`, stroke: k % 2 ? NUL : NUC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', transform: `rotate(${a.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})` })); }
  LB[2] = [lab(g, 380, 200, 240, 120, 'Nucleus', 'end'), lab(g, 600, 300, 830, 420, 'Chromosomes')];
}
{ const g = ZG[3]; ZX.pr = []; const LS = [210, 190, 172, 156, 140, 124, 108, 92];
  LS.forEach((L, i) => { const x = 110 + i * 112, G = mk(g, 'g', {}); chrom(G, x - 12, 230, L, NUC, 16); chrom(G, x + 12, 230, L, NUL, 16);
    mk(G, 'rect', { x: x - 26, y: 226, width: 52, height: 8, fill: '#FFFFFF', opacity: 0.0 }); const br = mk(g, 'path', { d: `M${x - 26},${230 + L / 2 + 16} L${x - 26},${230 + L / 2 + 26} L${x + 26},${230 + L / 2 + 26} L${x + 26},${230 + L / 2 + 16}`, stroke: C.ac, 'stroke-width': 3, fill: 'none' });
    const nt = txt(g, x, 230 + L / 2 + 52, String(i + 1), { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ac }); ZX.pr.push({ G, br, nt }); });
  ZX.lg = mk(g, 'g', {}); mk(ZX.lg, 'rect', { x: 110, y: 448, width: 18, height: 18, rx: 4, fill: NUC }); txt(ZX.lg, 136, 463, 'FROM ONE PARENT', { 'font-size': 16, 'letter-spacing': 1.2 });
  mk(ZX.lg, 'rect', { x: 330, y: 448, width: 18, height: 18, rx: 4, fill: NUL }); txt(ZX.lg, 356, 463, 'FROM THE OTHER', { 'font-size': 16, 'letter-spacing': 1.2 });
  ZX.eq = txt(g, 980, 463, 'n = 8 · 2n = 16', { 'text-anchor': 'end', 'font-size': 26, 'font-weight': 600, fill: DN });
}
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[tZ1 + 0.9, wt('Z2', 'root'), wt('Z2', 'tip')], [wt('Z3', 'cells'), wt('Z3', 'nucleus'), wt('Z3', 'own')], [wt('Z4', 'nucleus'), wt('Z4', 'threads')]];
const tSix = wt('Z5', 'sixteen'), tPairs = wt('Z5', 'pairs');

/* ---------- P: three lanes (mitosis, meiosis, fertilisation) ---------- */
const PN = ['MITOSIS · COPY', 'SAME COUNT', 'MEIOSIS · DIVIDE TWICE', 'FOUR CELLS · n', 'FERTILISATION'];
$('#pch').innerHTML = PN.map((n, i) => `<span class="zc" id="pc${i}">${i + 1} ${n}</span>${i < 4 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tPs = ['P2', 'P3', 'P4', 'P5', 'P6'].map(id => T0(id));
$('#lns').innerHTML = [['MITOSIS', 74], ['MEIOSIS', 222], ['FERTILISATION', 370]].map(([n, y], i) => `<div class="lane" id="ln${i}" style="top:${y}px;height:140px"><div class="lh2" id="lh${i}" style="color:var(--mute)">${n}</div></div>`).join('');
const PI = [['WATCH THE COUNT', 'Two ways to divide', 'Mitosis makes copies. Meiosis halves the count.'],
  ['STAGE 1 OF 5', 'Mitosis', 'The chromosomes copy themselves, then the cell splits in two.'],
  ['STAGE 2 OF 5', 'Same count', 'Each new cell has the same count. 2n stays 2n, and n stays n.'],
  ['STAGE 3 OF 5', 'Meiosis', 'Two divisions in a row, but only one round of copying.'],
  ['STAGE 4 OF 5', 'Four cells', 'The pairs separate. Each of the four cells has one set: n.'],
  ['STAGE 5 OF 5', 'Fertilisation', 'Two haploid cells join. n + n = 2n again.']];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 13 ? 44 : 54}px">${n}</div><div class="ld" style="font-size:26px;top:150px">${d}</div></div>`).join('');
$('#swk0').innerHTML = K(`${dc('2n')}\\rightarrow${hc('n')}`); $('#swk1').innerHTML = K(`${hc('n')}+${hc('n')}\\rightarrow${dc('2n')}`); $('#swk2').innerHTML = K(`${hc('n')}\\rightarrow${hc('n')},\\;\\;${dc('2n')}\\rightarrow${dc('2n')}`);
const ps = $('#pS');
// a cell: circle + chromosome sticks (violet = one parent, lilac = the other); dup adds the sister copy
const SET2 = [[-17, 40, NUC], [-6, 40, NUL], [7, 24, NUC], [18, 24, NUL]];
const cellG = (kind, set, r) => { const G = mk(ps, 'g', {}); mk(G, 'circle', { cx: 0, cy: 0, r, fill: kind === 'n' ? HNL : DNL, stroke: kind === 'n' ? HN : DN, 'stroke-width': 3.5 });
  const sis = []; set.forEach(([x, L, c]) => { chrom(G, x, 0, L, c, 7); sis.push(chrom(G, x + 4, 0, L, c, 7)); }); return { G, sis }; };
const place = (c, x, y, s = 1, op = 1) => { attr(c.G, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`); c.G.style.opacity = op.toFixed(3); };
const L1 = { m: cellG('2n', SET2, 48), a: cellG('2n', SET2, 46), b: cellG('2n', SET2, 46), hm: cellG('n', [[-6, 40, NUC], [7, 24, NUL]], 38), ha: cellG('n', [[-6, 40, NUC], [7, 24, NUL]], 36), hb: cellG('n', [[-6, 40, NUC], [7, 24, NUL]], 36) };
const L2 = { m: cellG('2n', SET2, 48), a: cellG('2n', [[-6, 40, NUC], [7, 24, NUL]], 44), b: cellG('2n', [[-6, 40, NUL], [7, 24, NUC]], 44),
  q: [[[-6, 40, NUC], [7, 24, NUL]], [[-6, 40, NUC], [7, 24, NUL]], [[-6, 40, NUL], [7, 24, NUC]], [[-6, 40, NUL], [7, 24, NUC]]].map(s => cellG('n', s, 38)) };
const L3 = { a: cellG('n', [[-6, 40, NUC], [7, 24, NUC]], 40), b: cellG('n', [[-6, 40, NUL], [7, 24, NUL]], 40), z: cellG('2n', SET2, 48) };
L2.a.G.querySelector('circle').setAttribute('fill', '#EEF0F8'); L2.b.G.querySelector('circle').setAttribute('fill', '#EEF0F8');
const PT = { r1: txt(ps, 466, 152, '2n → 2n', { 'font-size': 24, 'font-weight': 600, fill: DN }), h1: txt(ps, 900, 152, 'n → n', { 'font-size': 24, 'font-weight': 600, fill: HN }),
  r2: txt(ps, 920, 300, '2n → n', { 'font-size': 24, 'font-weight': 600, fill: HN }), r3: txt(ps, 640, 448, 'n + n → 2n', { 'font-size': 24, 'font-weight': 600, fill: DN }) };
const AR = [[200, 144, 230], [560, 144, 590], [200, 292, 230], [490, 292, 520], [430, 440, 470]].map(([x, y]) => mk(ps, 'path', { d: `M${x - 10},${y - 10} L${x},${y} L${x - 10},${y + 10}`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
const avP = PUC.avatar($('#sP'), { x: 1248 + 28, y: 324 + 526 - 104, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Halve, double, copy. Easy maths!' });

/* ---------- V: the plant twist ---------- */
const VR = [['Grows by', 'Mitosis', 'Mitosis', wt('C1', 'haploid'), wt('C1', 'diploid')], ['Name', 'Gametophyte', 'Sporophyte', wt('C2', 'gametophyte'), wt('C3', 'sporophyte')],
  ['Starts from', 'A spore', 'A zygote', wt('C2', 'spore'), wt('C3', 'zygote')], ['In us', 'Only the sperm and the egg', 'The whole body', wt('C4', 'sperm'), wt('C4', 'egg') + 0.3],
  ['In a moss', 'The whole green plant', 'The stalk and its capsule', wt('C4', 'moss'), wt('C4', 'whole') + 0.4]];
$('#vrs').innerHTML = VR.map(([k, a, b], i) => `<div class="vr" id="vr${i}" style="top:${92 + i * 94}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:350px">${a}</div><div class="vt" id="vt${i}b" style="left:982px">${b}</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'A cell from the green, leafy part of a moss. One set of chromosomes, or two?', opts: ['One set · n', 'Two sets · 2n'], right: 0, why: 'One set. The leafy moss grows from a spore by mitosis, so every cell in it is n.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = `<span style="font-size:44px">${K(`\\text{meiosis } ${dc('2n')}\\rightarrow${hc('n')}\\quad\\cdot\\quad\\text{fertilisation } ${hc('n')}+${hc('n')}\\rightarrow${dc('2n')}`)}</span>`;

/* ---------- W: the onion flower, filled in ---------- */
const BX = [['leaf', 'Leaf cell', 16, '2n', DN, 50, 236, wt('W1', 'sixteen')], ['pol', 'Pollen grain', 8, 'n', HN, 420, 96, wt('W2', 'eight')], ['egg', 'Egg', 8, 'n', HN, 420, 236, wt('W3', 'eight')],
  ['pn', 'Polar nuclei', '8 + 8', 'n + n', HN, 420, 376, wt('W5', 'polar')], ['zyg', 'Zygote', 16, '2n', DN, 800, 166, wt('W4', 'sixteen')], ['emb', 'Embryo', 16, '2n', DN, 1160, 166, wt('W4', 'embryo')],
  ['end', 'Endosperm', 24, '3n', TN, 800, 376, wt('W5', 'twenty')]];
$('#bxs').innerHTML = BX.map(([id, n, v, p, c, x, y]) => `<div class="bx" id="bx${id}" style="left:${x}px;top:${y}px;border-color:${c}"><div class="bn">${n}</div><div class="bv" style="color:${c}"><span id="bv${id}">${v}</span></div><div class="bt" style="color:${c}">${p}</div></div>`).join('');
const ws = $('#wS'), WA = [[300, 292, 420, 152, 'W2', 'meiosis'], [300, 292, 420, 292, 'W3', 'Meiosis'], [300, 300, 420, 432, 'W5', 'polar'], [670, 152, 800, 210, 'W4', 'male'], [670, 292, 800, 222, 'W4', 'joins'], [1050, 222, 1160, 222, 'W4', 'embryo'], [670, 432, 800, 432, 'W5', 'joins'], [670, 160, 800, 410, 'W5', 'other']]
  .map(([x1, y1, x2, y2, id, w]) => ({ p: mk(ws, 'path', { d: `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`, stroke: C.dim, 'stroke-width': 3, fill: 'none' }), t: wt(id, w) - 0.2 }));
const WT = { mei: txt(ws, 318, 200, 'MEIOSIS', { 'font-size': 16, 'letter-spacing': 1.5, fill: HN, 'font-weight': 600 }), mg: txt(ws, 676, 140, 'MALE GAMETE · 8', { 'font-size': 15, 'letter-spacing': 1.2, fill: HN, 'font-weight': 600 }),
  x3: mk(ws, 'g', {}) };
{ mk(WT.x3, 'rect', { x: 1160, y: 376, width: 360, height: 112, rx: 14, fill: '#FBF3DD' }); txt(WT.x3, 1340, 446, '3 × 8 = 24', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 600, fill: TN }); }
const avW = PUC.avatar($('#sW'), { x: 1160 + 10, y: 270 + 66 - 60, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Three sets in one food store!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A haploid cell cannot divide by mitosis', right: 'In plants it can: a spore builds the whole gametophyte' });
const tS = $('#tS'), TP = {};
{ TP.sp = mk(tS, 'g', {}); mk(TP.sp, 'circle', { cx: 70, cy: 130, r: 34, fill: HNL, stroke: HN, 'stroke-width': 3.5 }); txt(TP.sp, 70, 139, 'n', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: HN });
  TP.ar = mk(tS, 'path', { d: 'M116,130 L160,130 M148,120 L160,130 L148,140', stroke: C.ink, 'stroke-width': 3, fill: 'none' });
  TP.fil = [0, 1, 2, 3, 4].map(k => { const G = mk(tS, 'g', {}); mk(G, 'rect', { x: 176 + k * 54, y: 104, width: 52, height: 52, rx: 10, fill: HNL, stroke: HN, 'stroke-width': 3 }); txt(G, 202 + k * 54, 138, 'n', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: HN }); return G; });
  TP.cap = txt(tS, 230, 210, 'MITOSIS · n STAYS n', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5, fill: C.ac, 'font-weight': 600 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Chromosome counts: given 2n, find the pollen, egg, zygote and endosperm' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'A flowering plant has <b>24</b> chromosomes in its leaf cells. How many are in its pollen grain, egg, zygote and endosperm, in that order?',
  opts: ['12, 12, 24, 36', '24, 12, 24, 36', '12, 12, 24, 24', '12, 24, 48, 36'], right: 0, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">A</b>'], [`Pollen, egg: ${K(hc('n') + '=12')}`], ['Meiosis: half of 24'], [`Zygote: ${K(`${hc('n')}+${hc('n')}=${dc('24')}`)}`], [`Endosperm: ${K(tc('3n') + '=' + tc('36'))}`]], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Pollen'), wt('A2', 'half'), wt('A3', 'zygote'), wt('A3', 'endosperm')];
const fc = PUC.fcard($('#sF'), { x: 260, y: 262, w: 1400, h: 470, title: 'Recap · haploid and diploid phases', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: [`<b>n</b> = chromosomes in one set · haploid ${K(hc('n'))} · diploid ${K(dc('2n'))}`, `<b>Meiosis</b> halves ${K(`${dc('2n')}\\rightarrow${hc('n')}`)} · <b>fertilisation</b> doubles ${K(`${hc('n')}+${hc('n')}\\rightarrow${dc('2n')}`)}`,
    '<b>Mitosis</b> copies: the count stays the same, n or 2n', '<b>Plants</b>: gametophyte (n) from a spore · sporophyte (2n) from a zygote', `<b>Onion</b> 2n = 16: pollen 8 · egg 8 · zygote 16 · endosperm 24 ${K(tc('(3n)'))}`] });
const YQ = ['What does the letter n stand for?', 'Which division halves the chromosome count?', 'Why can a plant build a whole body from haploid cells?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 29', topic: 'Which phase do we see in a fern? Life Cycles of Major Plant Groups', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPs[2] - 0.2, 1.06, 1040, 560], [tS1 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const g = $('#ghT'); g.style.left = (960 - g.offsetWidth / 2) + 'px';
  let x = 36; FV.forEach((_, i) => { const e = $('#fv' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((j, i) => M.vis($('#jb' + i), t, j[3] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.vis($('#ghT'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    NB.forEach((_, i) => { M.vis($('#nb' + i), t, tNb[i] - 0.15, 1e9, { dy: 20 }); M.vis($('#nw' + i), t, wt('H4', 'sets') + i * 0.12, 1e9, { dy: 6 }); });
    const q = M.io((t - wt('H3', 'half') + 0.1) / 0.3) * (1 - M.io((t - tH4) / 0.3)); $('#nb1').style.background = mix(C.soft, '#D3ECEA', q);
    M.vis($('#eqb'), t, wt('H4', 'count') - 0.1, 1e9, { dy: 16 }); M.vis($('#hlP'), t, wt('H4', 'sets') + 0.4, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = wt('H4', 'plants') - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, wt('H3', 'puzzles') - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, kOut + 0.1, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { M.vis($('#bn0'), t, kOut + 0.2, 1e9, POP); M.vis($('#bn1'), t, kOut + 0.4, 1e9, POP); FV.forEach((_, i) => M.vis($('#fv' + i), t, tFv[i] - 0.1, 1e9, { dy: 16 })); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dw'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ghD'), t, tD1 + 0.5, 1e9, { dy: 8 });
    M.vis(DW.cell, t, tD1 + 0.3, 1e9, { dy: 16 }); M.vis(DW.nuc, t, wt('D2', 'nucleus') - 0.1, 1e9, { ...POP, sc: 0.5 });
    DW.th.forEach((p, i) => M.draw(p, t, wt('D2', 'chromosomes') - 0.1 + i * 0.06, 0.4));
    labRun(DW.lab[2], t, tD1 + 0.6); labRun(DW.lab[0], t, wt('D2', 'nucleus')); labRun(DW.lab[1], t, wt('D2', 'threads'));
    M.vis($('#dwP'), t, wt('D3', 'letter') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, wt('D4', 'haploid') - 0.5, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cr0'), t, wt('D4', 'haploid') - 0.2, 1e9, { dy: 20 }); M.vis($('#cr1'), t, wt('D4', 'diploid') - 0.2, 1e9, { dy: 20 });
    [...$('#cs0').children].forEach((c, i) => M.vis(c, t, wt('D4', 'one') + i * 0.1, 1e9, { ...POP, sc: 0.3 }));
    [...$('#cs1').children].forEach((c, i) => M.vis(c, t, wt('D4', 'two') + i * 0.08, 1e9, { ...POP, sc: 0.3 }));
    const tHu = wt('D4', 'humans'); M.vis($('#hum'), t, tHu - 0.1, 1e9, { dy: 10 }); M.count($('#hn'), t, tHu, 1.0, 0, 23); M.count($('#hd'), t, wt('D4', 'forty'), 1.0, 0, 46);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 4; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 3 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sIn = k === 0 ? 1 : 0.35 + 0.65 * e, sOut = 1 + 2.4 * x, sc = sIn * sOut;
      const cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      if (LB[k]) LB[k].forEach((l, i) => labRun(l, t, tLab[k][i]));
      if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    ZX.th.forEach((p, i) => attr(p, 'stroke-width', (6 + (t > wt('Z4', 'threads') ? 1.5 * Math.max(0, Math.sin(t * 5 + i)) : 0)).toFixed(2)));
    // chromosomes line up pair by pair while the count runs
    ZX.pr.forEach((p, i) => { M.vis(p.G, t, tZ[3] + 0.4 + i * 0.12, 1e9, { dy: -30, sp: M.SOFT, fade: 0.1 }); M.draw(p.br, t, tPairs + i * 0.08, 0.3); p.nt.style.opacity = M.clamp((t - tPairs - i * 0.08 - 0.2) / 0.2); });
    M.vis(ZX.lg, t, wt('Z5', 'parent') - 0.2, 1e9, { dy: 8 }); M.vis(ZX.eq, t, wt('Z5', 'So') - 0.1, 1e9, { dy: 8 });
    M.vis($('#zcount'), t, tZ[3] + 0.3, 1e9, { dy: 10 }); M.count($('#zcn'), t, tZ[3] + 0.4, Math.max(0.5, tSix - tZ[3] - 0.2), 0, 16);
    LVI.forEach((_, i) => { const el = $('#lvi' + i), tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 3 ? tZ[i + 1] + 0.1 : 1e9;
      M.vis(el, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
  }

  /* P + S: lanes */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pch'), t, tP1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#pgh'), t, tP1 + 0.6, 1e9, { dy: 8 });
    let st = -1; tPs.forEach((tt, i) => { if (t >= tt - 0.05) st = i; }); if (t >= tS1) st = 5;
    PN.forEach((_, i) => { const el = $('#pc' + i), on = i === st ? 1 : 0, done = i < st ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    PI.forEach((_, i) => M.vis($('#pi' + i), t, i ? tPs[i - 1] + 0.1 : tP1 + 0.4, i < 5 ? tPs[i] : tS1, { dy: 20, outDur: 0.25, ody: -12 }));
    const lane = st <= 1 ? 0 : st <= 3 ? 1 : st === 4 ? 2 : -1;
    [0, 1, 2].forEach(i => { M.vis($('#ln' + i), t, tP1 + 0.5 + i * 0.15, 1e9, { dy: 10 }); $('#ln' + i).style.background = i === lane ? C.ac3 : C.soft; $('#lh' + i).style.color = i === lane ? C.ac : C.mute; });
    const pul = k => 1 + 0.035 * Math.sin(t * 5 + k);
    // lane 1: mitosis 2n, then n
    const dupA = M.io((t - wt('P2', 'copy') + 0.1) / 0.6), spA = M.io((t - wt('P2', 'splits') + 0.1) / 0.9);
    [L1.m, L1.a, L1.b].forEach(c => c.sis.forEach(s => attr(s, 'transform', `translate(${(4 * (c === L1.m ? dupA : 1 - M.io((t - wt('P2', 'splits') - 0.9) / 0.5))).toFixed(2)} 0)`)));
    L1.m.sis.forEach(s => s.style.opacity = dupA > 0 ? 1 : 0); [L1.a, L1.b].forEach(c => c.sis.forEach(s => s.style.opacity = '0'));
    const on1 = t >= tP1 + 0.8; place(L1.m, 120, 144, on1 ? pul(0) : 0, on1 ? (spA > 0 ? 1 - 0.65 * spA : 1) : 0);
    place(L1.a, 120 + 170 * spA, 144, spA > 0 ? pul(1) : 0, spA > 0 ? 1 : 0); place(L1.b, 120 + 280 * spA, 144, spA > 0 ? pul(2) : 0, spA > 0 ? 1 : 0);
    M.vis(PT.r1, t, wt('P3', 'same') - 0.1, 1e9, { dy: 6 }); M.vis(AR[0], t, wt('P2', 'splits'), 1e9, { dy: 0, fade: 0.2 });
    const tH = wt('P3', 'haploid'), spH = M.io((t - tH - 0.6) / 0.9);
    place(L1.hm, 640, 144, t > tH - 0.1 ? pul(3) : 0, t > tH - 0.1 ? 1 - 0.65 * spH : 0); L1.hm.sis.forEach(s => s.style.opacity = M.io((t - tH - 0.1) / 0.4));
    [L1.ha, L1.hb].forEach(c => c.sis.forEach(s => s.style.opacity = '0'));
    place(L1.ha, 640 + 100 * spH, 144, spH > 0 ? pul(4) : 0, spH > 0 ? 1 : 0); place(L1.hb, 640 + 200 * spH, 144, spH > 0 ? pul(5) : 0, spH > 0 ? 1 : 0);
    M.vis(PT.h1, t, wt('P3', 'stays', 1) - 0.1, 1e9, { dy: 6 }); M.vis(AR[1], t, tH + 0.6, 1e9, { dy: 0, fade: 0.2 });
    // lane 2: meiosis
    const on2 = t >= tPs[2] - 0.2, d1 = M.io((t - wt('P4', 'twice') + 0.2) / 0.9), d2 = M.io((t - wt('P5', 'Four') + 0.1) / 0.9);
    L2.m.sis.forEach(s => s.style.opacity = M.io((t - wt('P4', 'copies')) / 0.4)); place(L2.m, 120, 292, on2 ? pul(6) : 0, on2 ? 1 - 0.65 * d1 : 0);
    [L2.a, L2.b].forEach((c, i) => { c.sis.forEach(s => s.style.opacity = d2 > 0 ? 0 : 1); place(c, 120 + (170 + i * 120) * d1, 292, d1 > 0 ? pul(7 + i) : 0, d1 > 0 ? 1 - 0.65 * d2 : 0); });
    L2.q.forEach((c, i) => { c.sis.forEach(s => s.style.opacity = '0'); const x0 = i < 2 ? 290 : 410; place(c, x0 + (560 + i * 100 - x0) * d2, 292, d2 > 0 ? pul(9 + i) : 0, d2 > 0 ? 1 : 0); });
    M.vis(AR[2], t, wt('P4', 'twice'), 1e9, { dy: 0, fade: 0.2 }); M.vis(AR[3], t, wt('P5', 'Four'), 1e9, { dy: 0, fade: 0.2 }); M.vis(PT.r2, t, wt('P5', 'becomes') - 0.1, 1e9, { dy: 6 });
    // lane 3: fertilisation
    const on3 = t >= tPs[4] - 0.1, fz = M.io((t - wt('P6', 'joins') + 0.1) / 1.0);
    [L3.a, L3.b, L3.z].forEach(c => c.sis.forEach(s => s.style.opacity = '0'));
    place(L3.a, 140 + (560 - 140) * fz, 440, on3 ? pul(13) : 0, on3 && fz < 1 ? 1 : 0); place(L3.b, 260 + (560 - 260) * fz, 440, on3 ? pul(14) : 0, on3 && fz < 1 ? 1 : 0);
    place(L3.z, 560, 440, fz >= 1 ? pul(15) : 0, fz >= 1 ? 1 : 0); M.vis(PT.r3, t, wt('P6', 'plus') - 0.1, 1e9, { dy: 6 }); M.vis(AR[4], t, wt('P6', 'plus'), 1e9, { dy: 0, fade: 0.2 });
    // rules panel
    const swOn = M.vis($('#sws'), t, tS1 + 0.2, 1e9, { dy: 16 });
    if (swOn) [0, 1, 2].forEach(i => { const tt = T0('S' + (i + 2)); M.vis($('#sw' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write($('#swk' + i), t, tt + 0.4, 0.5); $('#sw' + i).style.background = t >= tt - 0.1 && t < (i < 2 ? T0('S' + (i + 3)) : tC1) - 0.1 ? C.ac2 : C.soft; });
    avP(t, wt('S4', 'stays') - 0.2, out);
  }

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT('C5'), { dy: 36, ...o });
    let cur = -1; VR.forEach((v, i) => { if (t >= v[3] - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, v[3] - 0.15, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#vt' + i + 'a'), t, v[3], 1e9, { dx: -12, dy: 0 }); M.vis($('#vt' + i + 'b'), t, v[4], 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#th1'), t, tC5 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC5, tOpts: wt('C5', 'One') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'The') - 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Meiosis') - 0.2, { st: 0.3, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Mitosis') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    BX.forEach(([id, n, v], i) => { M.vis($('#bx' + id), t, BX[i][7] - 0.15, 1e9, POP); if (typeof v === 'number') M.count($('#bv' + id), t, BX[i][7] - 0.1, 0.6, 0, v); });
    WA.forEach(a => M.draw(a.p, t, a.t - 0.2, 0.5));
    M.vis(WT.mei, t, wt('W2', 'Meiosis') + 0.2, 1e9, { dy: 6 }); M.vis(WT.mg, t, wt('W4', 'male'), 1e9, { dy: 6 }); M.vis(WT.x3, t, wt('W5', 'Three') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'haploid') - 0.3, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'Spores') - 0.1 });
    M.vis(TP.sp, t, wt('X3', 'Spores') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.draw(TP.ar, t, wt('X3', 'divide'), 0.3);
    TP.fil.forEach((f, i) => M.vis(f, t, wt('X3', 'build') + i * 0.12, 1e9, { ...POP, sc: 0.4 })); M.vis(TP.cap, t, wt('X3', 'gametophyte') + 0.2, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'chromosome') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
