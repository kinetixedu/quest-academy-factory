// PUC Chemistry Ep 28: Structure of the modern periodic table (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electrons orange; subshells by block: s gold, p teal, d violet, f blue (same in boxes, table and KaTeX);
// a period row ink, a group column teal
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', SC = '#B7791F', PC = '#0FA3A3', DC = '#7A4FE0', FC = '#2F6FEB';
const BCOL = { s: SC, p: PC, d: DC, f: FC };
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, { grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'] });

/* ---------- periodic table (hand-built SVG: 18 groups, 7 periods, f-block below) ---------- */
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const ptPos = Z => {
  if (Z === 1) return { r: 0, c: 0 }; if (Z === 2) return { r: 0, c: 17 };
  for (const [s, r] of [[3, 1], [11, 2]]) if (Z >= s && Z < s + 8) { const o = Z - s; return { r, c: o < 2 ? o : o + 10 }; }
  for (const [s, r] of [[19, 3], [37, 4]]) if (Z >= s && Z < s + 18) return { r, c: Z - s };
  for (const [s, r, f] of [[55, 5, 7], [87, 6, 8]]) { if (Z < s || Z >= s + 32) continue; const o = Z - s; if (o < 3) return { r, c: o }; if (o < 17) return { r: f, c: o }; return { r, c: o - 14 }; }
  return null;
};
const blockOf = Z => { const p = ptPos(Z); if (p.r >= 7) return 'f'; if (Z === 2) return 's'; if (p.c <= 1) return 's'; if (p.c >= 12) return 'p'; return 'd'; };
const periodOf = Z => { const p = ptPos(Z); return p.r >= 7 ? p.r - 1 : p.r + 1; };
const ptable = (svg, o) => {
  const g = mk(svg, 'g', {}), cells = {}, s = o.cell + o.gap;
  for (let Z = 1; Z <= 118; Z++) {
    const p = ptPos(Z); if (p.r >= 7 && o.noF) continue;
    const x = o.x + p.c * s, y = o.y + p.r * s + (p.r >= 7 ? (o.fGap ?? 10) : 0);
    const r = mk(g, 'rect', { x, y, width: o.cell, height: o.cell, rx: o.rx ?? 4, fill: '#FFFFFF', stroke: C.line, 'stroke-width': 1.5 });
    const t = o.fs ? txt(g, x + o.cell / 2, y + o.cell / 2 + o.fs * 0.36, SYM[Z - 1], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': o.fs, fill: C.dim }) : null;
    cells[Z] = { r, t, x, y, p };
  }
  const paint = fn => { for (const Z in cells) { const [col, u, tcol] = fn(+Z), c = cells[Z]; attr(c.r, 'fill', u > 0.01 ? mix('#FFFFFF', col, u) : '#FFFFFF'); attr(c.r, 'stroke', u > 0.01 ? mix(C.line, col, Math.min(1, u * 1.5)) : C.line); if (c.t) attr(c.t, 'fill', tcol || (u > 0.55 ? '#FFFFFF' : C.dim)); } };
  return { g, cells, paint };
};
/* orbital boxes: subs = [[label, nBoxes, block]]; electrons fill one per box first (Hund), then pair */
const orbBoxes = (svg, subs, o) => {
  const g = mk(svg, 'g', {}), bw = o.bw ?? 64, gap = o.gap ?? 6, sg = o.sg ?? 22, n = subs.reduce((a, s) => a + s[1], 0);
  const W = n * (bw + gap) - gap + (subs.length - 1) * sg; let x = o.cx - W / 2; const order = [], lab = [], bx = [];
  subs.forEach(([l, nb, blk]) => { const col = BCOL[blk], x0 = x, list = [];
    for (let i = 0; i < nb; i++) { const r = mk(g, 'rect', { x, y: o.y, width: bw, height: bw, rx: 8, fill: '#FFFFFF', stroke: col, 'stroke-width': 3 }); list.push({ x, r }); bx.push(r); x += bw + gap; }
    x += sg - gap; lab.push(txt(g, (x0 + x - sg) / 2, o.y + bw + 34, l, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': o.lfs ?? 26, fill: col }));
    [0, 1].forEach(spin => list.forEach(b => { const cx = b.x + bw / 2 + (spin ? bw * 0.18 : -bw * 0.18), y0 = o.y + bw * 0.22, y1 = o.y + bw * 0.78, h = bw * 0.12;
      const d = spin ? `M${cx} ${y0} V${y1} M${cx - h} ${y1 - h} L${cx} ${y1} L${cx + h} ${y1 - h}` : `M${cx} ${y1} V${y0} M${cx - h} ${y0 + h} L${cx} ${y0} L${cx + h} ${y0 + h}`;
      order.push(mk(g, 'path', { d, fill: 'none', stroke: EC, 'stroke-width': Math.max(3, bw / 16), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); })); x += 0; });
  // reorder per subshell: ups then downs were pushed per subshell already
  return { g, order, lab, bx, n };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB1 = T0('B1'), tB2 = T0('B2');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['grid', 'Calendar', 'SAME DAY, SAME COLUMN', 'calendar', 'SUNDAY', 'Su'], ['users', 'Cinema', 'ROW + SEAT NUMBER', 'cinema', 'SEAT', 'B12'], ['home', 'Tall building', 'FLOOR + DOOR', 'building', 'FLAT', '4C']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , lab, el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${lab}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['grid', 'Calendar', 'calendar'], ['arrowR', '7 days across', 'Seven'], ['arrowD', 'Weeks going down', 'weeks']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: the long form ---------- */
const ps = $('#pS'), BX = 84, BY = 96, CE = 46, GA = 4, ST = CE + GA;
const big = ptable(ps, { x: BX, y: BY, cell: CE, gap: GA, fs: 17, fGap: 14, rx: 6 });
const pLab = [1, 2, 3, 4, 5, 6, 7].map(p => txt(ps, BX - 26, BY + (p - 1) * ST + 31, String(p), { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }));
const gLab = Array.from({ length: 18 }, (_, c) => txt(ps, BX + c * ST + CE / 2, BY - 12, String(c + 1), { 'text-anchor': 'middle', 'font-size': 16, fill: NC, 'font-weight': 600 }));
const fY = BY + 7 * ST + 14;
const fLab = [['LANTHANOIDS', fY + 29], ['ACTINOIDS', fY + ST + 29]].map(([s, y]) => txt(ps, BX + 140, y, s, { 'text-anchor': 'end', 'font-size': 14, fill: FC, 'font-weight': 600 }));
const fLink = mk(ps, 'path', { d: `M${BX + 2 * ST + CE / 2} ${BY + 5 * ST + CE} V${BY + 6 * ST + 4} M${BX + 2 * ST + CE / 2} ${BY + 7 * ST - 2} V${fY - 6}`, fill: 'none', stroke: FC, 'stroke-width': 3, 'stroke-dasharray': '4 6', 'stroke-linecap': 'round' });
const pArr = mk(ps, 'path', { d: `M${BX} ${BY + 2 * ST + CE + 12} H${BX + 17 * ST + CE}`, fill: 'none', stroke: HC, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'marker-end': 'url(#ah)' });
mk(ps, 'defs', {}).innerHTML = `<marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${HC}"/></marker>`;
const tRows = wt('P2', 'rows'), tSeven = wt('P2', 'seven'), tCols = wt('P3', 'columns'), tEighteen = wt('P3', 'eighteen'), tIU = wt('P4', 'IUPAC'), tBot = wt('P5', 'bottom'), tLan = wt('P5', 'lanthanoids'), tWide = wt('P5', 'wide');
const tUg = wt('U1', 'group'), tUp = wt('U1', 'period');

/* ---------- S: filling orbitals ---------- */
const b = $('#bS');
const STG = [
  { p: 1, subs: [['1s', 1, 's']], from: 1, to: 2, tin: wt('S2', 'Period'), tE: [wt('S3', 'Hydrogen'), wt('S3', 'helium')] },
  { p: 2, subs: [['2s', 1, 's'], ['2p', 3, 'p']], from: 3, to: 10, tin: T0('S4'), e0: wt('S5', 'Each'), e1: wt('S5', 'lithium') },
  { p: 3, subs: [['3s', 1, 's'], ['3p', 3, 'p']], from: 11, to: 18, tin: T0('S6'), e0: wt('S6', 'three') + 0.2, e1: wt('S6', 'sodium') },
  { p: 4, subs: [['4s', 1, 's'], ['3d', 5, 'd'], ['4p', 3, 'p']], from: 19, to: 36, tin: T0('S7'), e0: wt('S8', 'Nine'), e1: wt('S8', 'potassium') },
];
STG.forEach(s => { s.ob = orbBoxes(b, s.subs, { cx: 392, y: 150, bw: s.p === 4 ? 60 : 72, gap: 6, sg: 24 }); const n = s.to - s.from + 1;
  s.tEl = s.tE || Array.from({ length: n }, (_, i) => s.e0 + (s.e1 - s.e0) * i / (n - 1));
  s.shell = txt(s.ob.g, 392, 116, `SHELL n = ${s.p}`, { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }); });
const cntG = mk(b, 'g', {}); mk(cntG, 'rect', { x: 36, y: 380, width: 712, height: 120, rx: 16, fill: C.soft });
txt(cntG, 64, 420, 'ELECTRONS ADDED = ELEMENTS', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const cntV = txt(cntG, 64, 476, '0', { 'font-size': 52, fill: EC, 'font-weight': 600 });
const elT = mk(cntG, 'g', {}); mk(elT, 'rect', { x: 560, y: 396, width: 160, height: 88, rx: 14, fill: NC }); const elS = txt(elT, 640, 448, 'H', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 40, fill: '#FFFFFF' }); const elZ = txt(elT, 640, 474, 'Z = 1', { 'text-anchor': 'middle', 'font-size': 16, fill: '#FFFFFF', 'font-weight': 600 });
// comparison (B1)
const cmp = mk(b, 'g', {});
const CMP = [['SAME GROUP · GROUP 1', [['Na', '2, 8, ', '1'], ['K', '2, 8, 8, ', '1']], 100], ['SAME PERIOD · PERIOD 3', [['Na', '2, 8, ', '1'], ['Mg', '2, 8, ', '2']], 330]];
const cmpG = CMP.map(([h, rows, y]) => { const g = mk(cmp, 'g', {}); txt(g, 36, y, h, { 'font-size': 18, fill: y < 200 ? NC : HC, 'font-weight': 600 });
  rows.forEach(([s, a, o], i) => { mk(g, 'rect', { x: 36, y: y + 20 + i * 78, width: 712, height: 66, rx: 12, fill: C.soft }); txt(g, 64, y + 66 + i * 78, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: HC });
    const tx = mk(g, 'text', { x: 170, y: y + 64 + i * 78, 'font-family': 'IBM Plex Mono', 'font-size': 28, 'font-weight': 600, fill: HC }); tx.innerHTML = `${a}<tspan fill="${EC}">${o}</tspan>`;
    txt(g, 728, y + 62 + i * 78, `${o} OUTER e⁻`, { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); }); return g; });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const td = ptable($('#tdS'), { x: 36, y: 62, cell: 24, gap: 3, noF: true, rx: 3 });
const FX = { 1: ['\\text{orbitals: } 1', '2 \\times 1 = 2'], 2: [`\\text{orbitals: } ${tc(SC, '1')} + ${tc(PC, '3')} = 4`, '2 \\times 4 = 8'], 3: [`\\text{orbitals: } ${tc(SC, '1')} + ${tc(PC, '3')} = 4`, '2 \\times 4 = 8'], 4: [`\\text{orbitals: } ${tc(SC, '1')} + ${tc(DC, '5')} + ${tc(PC, '3')} = 9`, '2 \\times 9 = 18'] };
const FXB = [`${tc(NC, '\\text{group}')}\\text{: same outer electrons}`, `${tc(HC, '\\text{period}')}\\text{: same outer shell}`];
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 400, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The d orbitals make the middle block!' });
const th1 = PUC.think($('#th1'), { q: 'Which pair behaves more alike?', opts: ['Na and K', 'Na and Mg'], right: 0, why: `Same group 1: one outer electron each (${K(`3s^{${tc(EC, '1')}}`)}, ${K(`4s^{${tc(EC, '1')}}`)}). Mg has two.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{elements in a period} = 2 \\times \\text{orbitals filled}`);

/* ---------- W: period 6 ---------- */
const w2 = $('#wS2');
const wA = orbBoxes(w2, [['6s', 1, 's'], ['4f', 7, 'f']], { cx: 392, y: 110, bw: 62, gap: 6, sg: 26, lfs: 24 });
const wB = orbBoxes(w2, [['5d', 5, 'd'], ['6p', 3, 'p']], { cx: 392, y: 290, bw: 62, gap: 6, sg: 26, lfs: 24 });
const wArrows = [...wA.order.slice(0, 2), ...wA.order.slice(2), ...wB.order];
const wCnt = [[wA.lab[0], '1'], [wA.lab[1], '7'], [wB.lab[0], '5'], [wB.lab[1], '3']].map(([l, n]) => { const x = +l.getAttribute('x'), y = +l.getAttribute('y'); return txt(w2, x, y + 30, `${n} orbital${n === '1' ? '' : 's'}`, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); });
const lanT = txt(w2, 392 + 40, 92, 'THESE 14 = LANTHANOIDS', { 'text-anchor': 'middle', 'font-size': 16, fill: FC, 'font-weight': 600 });
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(SC, '6s')},\\; ${tc(FC, '4f')},\\; ${tc(DC, '5d')},\\; ${tc(PC, '6p')}`)],
  [K(`${tc(SC, '1')} + ${tc(FC, '7')} + ${tc(DC, '5')} + ${tc(PC, '3')} = 16 \\text{ orbitals}`)],
  [K(`16 \\times 2 = ${tc(EC, '32')} \\text{ electrons}`)],
  [K(`\\text{period 6: } ${tc(NC, '32')} \\text{ elements}`)]], { label: 'WORKED EXAMPLE', y0: 160, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Period 3 holds ${K('2n^2 = 2 \\times 3^2 = 18')} elements`, right: `Period 3 fills only ${K(`${tc(SC, '3s')}`)} and ${K(`${tc(PC, '3p')}`)}: ${K('2 \\times 4 = 8')} elements` });
const tsv = $('#tS');
const tOb = orbBoxes(tsv, [['3s', 1, 's'], ['3p', 3, 'p'], ['3d', 5, 'd']], { cx: 280, y: 70, bw: 44, gap: 5, sg: 18, lfs: 20 });
const t3d = tOb.bx.slice(4); const t3dT = txt(tsv, 280 + 110, 196, '3d WAITS FOR PERIOD 4', { 'text-anchor': 'middle', 'font-size': 16, fill: DC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short answer: the number of elements in a period, and which orbitals fill in it' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'How many elements are in the 5th period, and which orbitals fill?', qW: 780,
  opts: [`<span>8, filling ${K('5s')} and ${K('5p')}</span>`, `<span>18, filling ${K('5s')}, ${K('4d')} and ${K('5p')}</span>`, `<span>32, filling ${K('5s')}, ${K('4f')}, ${K('5d')} and ${K('5p')}</span>`, `<span>50, from ${K('2n^2')}</span>`], right: 1, cols: 1, optW: 968, optY: 236, optH: 76, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${tc(SC, '5s')},\\; ${tc(DC, '4d')},\\; ${tc(PC, '5p')}`)], [K(`${tc(SC, '1')} + ${tc(DC, '5')} + ${tc(PC, '3')} = 9`)], [K(`9 \\times 2 = 18`)], [`D: ${K('2n^2')} ✗ · 4f waits`]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'D')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · structure of the periodic table', y0: 96, dy: 62, txt: [0, 1, 1, 1, 1, 1],
  lines: [K(`\\text{elements in a period} = 2 \\times \\text{orbitals filled}`), '<b>Long form</b>: 7 periods (rows) · 18 groups (columns, IUPAC 1 to 18)', '<b>Period number</b> = n of the outermost shell being filled', '<b>Period lengths</b>: 2, 8, 8, 18, 18, 32, 32', '<b>Same group</b>: same outer arrangement, similar properties', '<b>Bottom rows</b>: lanthanoids (Ce to Lu) · actinoids (Th to Lr)'] });
const YQ = ['How many periods and groups does the long form have?', 'Why does period 2 have exactly eight elements?', 'Why are the lanthanoids and actinoids placed at the bottom?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 29', topic: 'What makes an element s, p, d or f? Periods, Groups and Blocks', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S7') - 0.2, 1.06, 960, 560], [tB1 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const s2 = $('#st2'); if (s2.offsetWidth > 1600) s2.style.fontSize = Math.floor(76 * 1600 / s2.scrollWidth) + 'px';
}
const arrows = (ob, n, tEl, t) => ob.order.forEach((a, i) => { const tt = tEl[i]; const u = tt == null ? 0 : M.io((t - tt + 0.05) / 0.2); a.style.opacity = u.toFixed(3); M.hide(a, u <= 0.01); attr(a, 'transform', `translate(0 ${((1 - u) * -26).toFixed(1)})`); });

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'address') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'periodic') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'rows') + 0.1) / 0.3))); });
    M.vis($('#hTz'), t, wt('H5', 'two') - 0.15, 1e9, POP);
  }

  /* P + U: long form */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#lf'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    const rowOn = p => M.io((t - tRows - (p - 1) * 0.16) / 0.25) * (1 - M.io((t - tCols + 0.2) / 0.3));
    const colOn = c => M.io((t - tCols - c * 0.07) / 0.25) * (1 - M.io((t - tIU - 0.3) / 0.4));
    const fOn = M.io((t - tLan + 0.1) / 0.4);
    const g1 = M.io((t - tUg) / 0.3), p3 = M.io((t - tUp) / 0.3);
    big.paint(Z => { const c = big.cells[Z], p = c.p, per = periodOf(Z);
      const appear = M.clamp((t - tP1 - 0.2 - (p.c + p.r) * 0.035) / 0.2);
      c.r.style.opacity = appear.toFixed(3); if (c.t) c.t.style.opacity = appear.toFixed(3);
      if (p.r >= 7) return [FC, fOn * 0.85];
      if (p.c === 0 && g1 > 0) return [NC, g1];
      if (per === 3 && p3 > 0) return [HC, p3 * 0.85];
      const rv = rowOn(per) * 0.75, cv = colOn(p.c) * 0.7;
      return rv >= cv ? [HC, rv] : [NC, cv]; });
    pLab.forEach((l, i) => fade(l, t, tRows + i * 0.16 - 0.05)); gLab.forEach((l, i) => fade(l, t, tCols + i * 0.07 - 0.05));
    M.vis($('#sp1'), t, tSeven - 0.1, 1e9, POP); M.count($('#nP'), t, tRows, 1.2, 1, 7);
    M.vis($('#sp2'), t, tEighteen - 0.1, 1e9, POP); M.count($('#nG'), t, tCols, 1.4, 1, 18);
    M.vis($('#olL'), t, tIU - 0.1, tBot - 0.2, { dy: 8 }); M.vis($('#ol0'), t, tIU, tBot - 0.2, { dx: -16, dy: 0 }); M.vis($('#ol1'), t, wt('P4', 'older'), tBot - 0.2, { dx: -16, dy: 0 });
    fLab.forEach((l, i) => fade(l, t, tLan + i * 0.4)); M.draw(fLink, t, tLan + 0.3, 0.6);
    M.vis($('#fPl'), t, tWide - 0.2, tU - 0.2, POP);
    M.vis($('#uP1'), t, tUg + 0.3, 1e9, POP); M.vis($('#uP2'), t, tUp + 0.3, 1e9, POP);
    M.draw(pArr, t, tUp, 1.2);
    M.setT($('#lfL'), t < tU ? 'THE LONG FORM · MODERN PERIODIC TABLE' : 'GROUPS AND PERIODS');
  }

  /* S + B: filling orbitals */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, STG[0].tin - 0.2, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, STG[0].tin + 0.2, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, 1e9, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Sodium') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'They') });
    const si = STG.reduce((a, s, i) => t >= s.tin - 0.15 ? i : a, 0), S = STG[si], inB = t >= tB1 - 0.15;
    STG.forEach((s, i) => { const on = fade(s.ob.g, t, s.tin - 0.1, i < 3 ? STG[i + 1].tin - 0.15 : tB1 - 0.15, 0.25); if (on > 0) arrows(s.ob, 0, s.tEl, t); });
    fade(cntG, t, STG[0].tE[0] - 0.2, tB1 - 0.15);
    const nAdd = S.tEl.filter(x => t >= x - 0.05).length, zNow = S.from + Math.max(0, nAdd - 1);
    M.setT(cntV, String(nAdd)); M.setT(elS, SYM[zNow - 1]); M.setT(elZ, `Z = ${zNow}`); fade(elT, t, S.tEl[0] - 0.05, nAdd ? 1e9 : -1, 0.15);
    fade(cmp, t, tB1 - 0.1); fade(cmpG[0], t, wt('B1', 'group') - 0.1); fade(cmpG[1], t, wt('B1', 'period') - 0.1);
    // mini table
    const g1 = inB ? M.io((t - wt('B1', 'group')) / 0.3) * (1 - M.io((t - wt('B1', 'period')) / 0.3)) : 0, p3 = inB ? M.io((t - wt('B1', 'period')) / 0.3) : 0;
    td.paint(Z => { const per = periodOf(Z), p = td.cells[Z].p;
      if (inB) { if (p.c === 0 && Z !== 1 && g1 > 0) return [NC, g1]; if (per === 3 && p3 > 0) return [HC, p3 * 0.8]; return [NC, 0]; }
      if (per < S.p) return [C.ac2, 1];
      if (per === S.p) { const k = Z - S.from; return k < nAdd ? [BCOL[blockOf(Z)], 1] : [NC, 0]; }
      return [NC, 0]; });
    M.setT($('#tdA'), inB ? '' : String(nAdd)); M.setT($('#tdC'), inB ? (t >= wt('B1', 'period') ? 'PERIOD 3' : 'GROUP 1') : `PERIOD ${S.p}`); M.setT($('#tdB'), inB ? 'LIT ON THE TABLE' : 'ELEMENTS SO FAR');
    M.setT($('#rxL'), inB ? 'GROUP vs PERIOD' : 'THE PERIOD BEING FILLED');
    // count card
    const k = inB ? null : FX[S.p], f1 = $('#fx1'), f2 = $('#fx2');
    const key1 = inB ? 'B' + (t >= wt('B1', 'period') ? 2 : 1) : 'S' + S.p;
    if (f1._k !== key1) { f1._k = key1; if (inB) { f1.innerHTML = K(FXB[0]); f2.innerHTML = K(FXB[1]); f2.style.fontSize = '36px'; } else { f1.innerHTML = K(k[0]); f2.innerHTML = K(`${k[1]} \\text{ elements}`); f2.style.fontSize = '48px'; } }
    const tw1 = inB ? wt('B1', 'group') : S.tin + 0.3, tw2 = inB ? wt('B1', 'period') : S.tEl[S.tEl.length - 1];
    PUC.write(f1, t, tw1, 0.6); PUC.write(f2, t, tw2, 0.6);
    const TAG = [[STG[0].tin, 'PERIOD 1 · SHELL 1'], [STG[0].tE[1] + 0.3, 'SHELL FULL · 2 ELEMENTS'], [STG[1].tin, 'PERIOD 2 · 4 ORBITALS'], [STG[1].e1, 'Li TO Ne · 8'], [STG[2].tin, 'PERIOD 3 · Na TO Ar'], [STG[3].tin, 'PERIOD 4 · 4s, 3d, 4p'], [wt('S8', 'd'), 'd FILLS THE MIDDLE'], [tB1, 'COMPARE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, STG[0].tin - 0.1, 1e9, POP);
    avD(t, wt('S8', 'middle') + 0.2, tB1 - 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'period') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'group') - 0.25, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'arrangement') + 0.3, 0.8);
  }

  /* W: period 6 */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [wA, wB].forEach((ob, j) => { ob.bx.forEach((r, i) => { const k = j ? 2 + (i >= 5 ? 1 : 0) : (i ? 1 : 0), u = M.io((t - wt('W3', ['six', 'four', 'five', 'six'][k], [1, 0, 0, 2][k]) + 0.1) / 0.3); r.style.opacity = u.toFixed(3); }); ob.lab.forEach((l, i) => { l.style.opacity = M.io((t - T0('W3') - 0.4 - (j * 2 + i) * 0.4) / 0.3).toFixed(3); }); });
    const tC4 = ['One', 'seven', 'five', 'three'].map(w => wt('W4', w)); wCnt.forEach((c, i) => fade(c, t, tC4[i] - 0.1));
    const e0 = T0('W5') + 0.2, e1 = T1('W5') - 0.2; wArrows.forEach((a, i) => { const u = M.io((t - e0 - (e1 - e0) * i / 31) / 0.15); a.style.opacity = u.toFixed(3); M.hide(a, u <= 0.01); });
    fade(lanT, t, wt('W6', 'Fourteen') - 0.1);
    M.vis($('#wGp'), t, wt('W6', 'Fourteen') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'only') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'period') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: tR });
    fade(tOb.g, t, wt('X2', 'Two') - 0.1);
    tOb.order.forEach((a, i) => { const lit = i < 8; const u = lit ? M.io((t - tR - 0.2 - i * 0.08) / 0.15) : 0; a.style.opacity = u.toFixed(3); M.hide(a, u <= 0.01); });
    const dd = M.io((t - wt('X3', 'three', 3) + 0.1) / 0.3); t3d.forEach(r => { attr(r, 'stroke-dasharray', '5 5'); attr(r, 'stroke', mix(DC, C.dim, dd)); }); fade(t3dT, t, wt('X3', 'later') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'and'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') });
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
