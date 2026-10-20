// PUC Chemistry Ep 29: Periods, groups and blocks (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electrons orange (the last electron ringed), blocks s gold, p teal, d violet, f blue
// (same in the table, the orbital boxes, the KaTeX and the recap); a period row ink, a group column teal
const NC = C.ac, HC = C.ink, EC = '#C8461B', SC = '#B7791F', PC = '#0FA3A3', DC = '#7A4FE0', FC = '#2F6FEB';
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

Object.assign(M.IC, {
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
});

/* ---------- periodic table (hand-built SVG: 18 groups, 7 periods, f-block below) ---------- */
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const ZOF = {}; SYM.forEach((s, i) => { ZOF[s] = i + 1; });
const ptPos = Z => {
  if (Z === 1) return { r: 0, c: 0 }; if (Z === 2) return { r: 0, c: 17 };
  for (const [s, r] of [[3, 1], [11, 2]]) if (Z >= s && Z < s + 8) { const o = Z - s; return { r, c: o < 2 ? o : o + 10 }; }
  for (const [s, r] of [[19, 3], [37, 4]]) if (Z >= s && Z < s + 18) return { r, c: Z - s };
  for (const [s, r, f] of [[55, 5, 7], [87, 6, 8]]) { if (Z < s || Z >= s + 32) continue; const o = Z - s; if (o < 3) return { r, c: o }; if (o < 17) return { r: f, c: o }; return { r, c: o - 14 }; }
  return null;
};
// He (1s2) is s by configuration but sits in group 18
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
const orbBoxes = (svg, subs, o) => {
  const g = mk(svg, 'g', {}), bw = o.bw ?? 64, gap = o.gap ?? 6, sg = o.sg ?? 22, n = subs.reduce((a, s) => a + s[1], 0);
  const W = n * (bw + gap) - gap + (subs.length - 1) * sg; let x = o.cx - W / 2; const order = [], lab = [], bx = [], pos = [];
  subs.forEach(([l, nb, blk]) => { const col = BCOL[blk], x0 = x, list = [];
    for (let i = 0; i < nb; i++) { const r = mk(g, 'rect', { x, y: o.y, width: bw, height: bw, rx: 8, fill: '#FFFFFF', stroke: col, 'stroke-width': 3 }); list.push({ x, r }); bx.push(r); x += bw + gap; }
    x += sg - gap; lab.push(txt(g, (x0 + x - sg) / 2, o.y + bw + 34, l, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': o.lfs ?? 26, fill: col }));
    [0, 1].forEach(spin => list.forEach(b => { const cx = b.x + bw / 2 + (spin ? bw * 0.18 : -bw * 0.18), y0 = o.y + bw * 0.22, y1 = o.y + bw * 0.78, h = bw * 0.12;
      const d = spin ? `M${cx} ${y0} V${y1} M${cx - h} ${y1 - h} L${cx} ${y1} L${cx + h} ${y1 - h}` : `M${cx} ${y1} V${y0} M${cx - h} ${y0 + h} L${cx} ${y0} L${cx + h} ${y0 + h}`;
      order.push(mk(g, 'path', { d, fill: 'none', stroke: EC, 'stroke-width': Math.max(3, bw / 16), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })); pos.push([cx, o.y + bw / 2]); })); });
  return { g, order, lab, bx, n, pos, bw };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB1 = T0('B1'), tB2 = T0('B2');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['home', 'City', 'BLOCKS OF HOMES', 'city', 's', SC], ['users', 'School', 'SECTIONS BY CLASS', 'school', 'p', PC], ['box', 'Market', 'AISLES BY KIND', 'market', 'd', DC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, col], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>BLOCK</span><div class="el" style="background:${col}">${el}</div></div></div>`).join('');
const KIT = [['layers', 'Spices', 'Spices'], ['box', 'Grains', 'grains'], ['layers', 'Steel vessels', 'steel']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P + U: map and blocks ---------- */
const ps = $('#pS'), BX = 84, BY = 104, CE = 45, GA = 4, ST = CE + GA;
const big = ptable(ps, { x: BX, y: BY, cell: CE, gap: GA, fs: 17, fGap: 12, rx: 6 });
const fY = BY + 7 * ST + 12;
const LG = [['s', 's-BLOCK', SC], ['p', 'p-BLOCK', PC], ['d', 'd-BLOCK', DC], ['f', 'f-BLOCK', FC]];
$('#lg').innerHTML = LG.map(([k, l, c]) => `<span id="lg${k}" style="background:${c}">${l}</span>`).join('');
const WD = [['s', '1 orbital × 2 = 2', SC], ['p', '3 orbitals × 2 = 6', PC], ['d', '5 orbitals × 2 = 10', DC], ['f', '7 orbitals × 2 = 14', FC]];
$('#wds').innerHTML = WD.map(([k, s, c], i) => `<div class="wr2" id="wd${i}" style="top:${190 + i * 64}px"><div class="a" style="color:${c}">${k}</div><div class="b">${s}</div></div>`).join('');
// width bars above the table (s, d, p) and below the f rows
const bar = (x0, x1, y, col, n) => { const g = mk(ps, 'g', {}); mk(g, 'rect', { x: x0, y, width: x1 - x0, height: 22, rx: 6, fill: col }); txt(g, (x0 + x1) / 2, y + 17, n, { 'text-anchor': 'middle', 'font-size': 15, fill: '#FFFFFF', 'font-weight': 600 }); return g; };
const bars = { s: bar(BX, BX + ST + CE, 72, SC, '2 WIDE'), d: bar(BX + 2 * ST, BX + 11 * ST + CE, 72, DC, '10 WIDE'), p: bar(BX + 12 * ST, BX + 17 * ST + CE, 72, PC, '6 WIDE'), f: bar(BX + 3 * ST, BX + 16 * ST + CE, fY + 2 * ST + 2, FC, '14 WIDE') };
const pArr = mk(ps, 'rect', { x: BX - 6, y: BY + 2 * ST - 6, width: 18 * ST + 8, height: CE + 12, rx: 10, fill: 'none', stroke: HC, 'stroke-width': 3 });
const gBox = mk(ps, 'rect', { x: BX - 6, y: BY - 6, width: CE + 12, height: 7 * ST + 8, rx: 10, fill: 'none', stroke: NC, 'stroke-width': 3 });
const tRow = wt('P1', 'row'), tGrp = wt('P2', 'column'), tNaK = wt('P3', 'sodium'), tWater = wt('P3', 'water'), tBlk = wt('P4', 'blocks');
const tLet = { s: wt('P4', 's'), p: wt('P4', 'p'), d: wt('P4', 'd'), f: wt('P4', 'f') };
const tWid = { s: wt('U1', 's'), p: wt('U1', 'p'), d: wt('U1', 'd'), f: wt('U1', 'f') };

/* ---------- S: the last electron ---------- */
const b = $('#bS');
const STG = [
  { el: 'Na', blk: 's', core: '[Ne]', cn: '10 e⁻', subs: [['3s', 1, 's'], ['3p', 3, 'p']], ne: 1, tin: wt('S1', 'sodium'), tCore: wt('S2', 'Ten'), tDrop: wt('S2', 'eleventh'), cfg: `1s^2\\,2s^2\\,2p^6\\,3s^{${tc(EC, '1')}}`, lab: 'LAST e⁻ → 3s', grp: 'PERIOD 3 · GROUP 1' },
  { el: 'Cl', blk: 'p', core: '[Ne]', cn: '10 e⁻', subs: [['3s', 1, 's'], ['3p', 3, 'p']], ne: 7, tin: T0('S4'), tCore: T0('S4') + 0.3, tDrop: wt('S4', 'drops'), cfg: `[\\mathrm{Ne}]\\,3s^2\\,3p^{${tc(EC, '5')}}`, lab: 'LAST e⁻ → 3p', grp: 'PERIOD 3 · GROUP 17' },
  { el: 'Fe', blk: 'd', core: '[Ar]', cn: '18 e⁻', subs: [['4s', 1, 's'], ['3d', 5, 'd']], ne: 8, tin: T0('S6'), tCore: T0('S6') + 0.3, tDrop: wt('S6', 'three'), cfg: `[\\mathrm{Ar}]\\,4s^2\\,3d^{${tc(EC, '6')}}`, lab: 'LAST e⁻ → 3d', grp: 'PERIOD 4 · GROUP 8' },
  { el: 'Eu', blk: 'f', core: '[Xe]', cn: '54 e⁻', subs: [['6s', 1, 's'], ['4f', 7, 'f']], ne: 9, tin: T0('S8'), tCore: T0('S8') + 0.3, tDrop: wt('S8', 'enters'), cfg: `[\\mathrm{Xe}]\\,6s^2\\,4f^{${tc(EC, '7')}}`, lab: 'LAST e⁻ → 4f', grp: 'PERIOD 6 · LANTHANOID' },
];
STG.forEach(s => {
  s.g = mk(b, 'g', {});
  const cg = mk(s.g, 'g', {}); mk(cg, 'rect', { x: 36, y: 150, width: 132, height: 72, rx: 14, fill: C.soft, stroke: C.dim, 'stroke-width': 2 }); txt(cg, 102, 186, s.core, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: HC }); txt(cg, 102, 210, s.cn + ' INSIDE', { 'text-anchor': 'middle', 'font-size': 13, fill: C.mute, 'font-weight': 600 }); s.cg = cg;
  s.ob = orbBoxes(s.g, s.subs, { cx: 476, y: 150, bw: s.subs[1][1] > 5 ? 56 : 68, gap: 6, sg: 22, lfs: 24 });
  s.ring = mk(s.g, 'circle', { r: 18, fill: 'none', stroke: EC, 'stroke-width': 3 });
  s.tag = txt(s.g, 476, 300, s.lab, { 'text-anchor': 'middle', 'font-size': 24, fill: BCOL[s.blk], 'font-weight': 600 });
  const eg = mk(s.g, 'g', {}); mk(eg, 'rect', { x: 36, y: 340, width: 712, height: 92, rx: 16, fill: C.soft }); mk(eg, 'rect', { x: 52, y: 356, width: 60, height: 60, rx: 10, fill: BCOL[s.blk] });
  txt(eg, 82, 396, s.el, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: '#FFFFFF' }); txt(eg, 132, 380, `Z = ${ZOF[s.el]}`, { 'font-size': 16, fill: C.mute, 'font-weight': 600 }); s.eg = eg;
  const fo = mk(eg, 'foreignObject', { x: 130, y: 382, width: 600, height: 50 }); fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:30px;white-space:nowrap">${K(s.cfg)}</div>`;
});
// helium vs beryllium (B1)
const hb = mk(b, 'g', {});
const hbHe = orbBoxes(hb, [['1s', 1, 's']], { cx: 200, y: 150, bw: 72 }), hbBe = orbBoxes(hb, [['2s', 1, 's']], { cx: 560, y: 150, bw: 72 });
mk(hb, 'rect', { x: 386, y: 150, width: 92, height: 72, rx: 14, fill: C.soft, stroke: C.dim, 'stroke-width': 2 }); txt(hb, 432, 194, '[He]', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: HC });
txt(hb, 200, 116, 'HELIUM · Z = 2', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }); txt(hb, 500, 116, 'BERYLLIUM · Z = 4', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
const hbFull = mk(hb, 'g', {}); mk(hbFull, 'rect', { x: 36, y: 340, width: 712, height: 92, rx: 16, fill: C.okBg }); txt(hbFull, 392, 396, 'He: its ONLY shell is full · like Ne, Ar', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ok, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const td = ptable($('#tdS'), { x: 36, y: 56, cell: 20, gap: 3, fGap: 8, rx: 3 });
const BF = [['s', 's-block', 'GROUPS 1 AND 2', 'ns^{1-2}', 'REACTIVE METALS', ''], ['p', 'p-block', 'GROUPS 13 TO 18', 'ns^2\\,np^{1-6}', 'METALS, NON-METALS,<br>METALLOIDS, NOBLE GASES', ''],
  ['d', 'd-block', 'GROUPS 3 TO 12', '(n-1)d^{1-10}\\,ns^{0-2}', 'TRANSITION<br>ELEMENTS', `\\text{group} = ${tc(DC, 'd')} + ${tc(SC, 's')} \\text{ electrons}`], ['f', 'f-block', 'TWO ROWS AT THE BOTTOM', '(n-2)f^{1-14}\\,(n-1)d^{0-1}\\,ns^2', 'INNER TRANSITION<br>ELEMENTS', '']];
$('#bfs').innerHTML = BF.map(([k, n, g, cf, nat, ex]) => `<div class="bf" id="bf${k}"><div class="bt" style="color:${BCOL[k]}">${n}</div><div class="bg">${g}</div><div class="bn">${nat}</div><div class="bc">${K(cf)}</div>${ex ? `<div class="bc" style="top:214px;font-size:26px" id="bfx">${K(ex)}</div>` : ''}</div>`).join('');
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'One clue gives the whole address!' });
const th1 = PUC.think($('#th1'), { q: `Helium is ${K(`1s^${tc(EC, '2')}`)}. So why is it in group 18, and not in group 2?`, opts: ['Its only shell is full', 'It has two outer electrons'], right: 0, why: 'A full shell, like neon and argon: helium behaves like a noble gas.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(SC, 's')} \\quad ${tc(PC, 'p')} \\quad ${tc(DC, 'd')} \\quad ${tc(FC, 'f')}`);

/* ---------- W ---------- */
const WE = [['Na', 's', `[\\mathrm{Ne}]\\,3s^{${tc(EC, '1')}} \\rightarrow ${tc(SC, 's')},\\ \\text{P3, G1}`], ['S', 'p', `[\\mathrm{Ne}]\\,3s^2 3p^{${tc(EC, '4')}} \\rightarrow ${tc(PC, 'p')},\\ \\text{P3, G16}`],
  ['Mn', 'd', `[\\mathrm{Ar}]\\,3d^{${tc(EC, '5')}} 4s^2 \\rightarrow ${tc(DC, 'd')},\\ \\text{P4, G7}`], ['Eu', 'f', `[\\mathrm{Xe}]\\,4f^{${tc(EC, '7')}} 6s^2 \\rightarrow ${tc(FC, 'f')},\\ \\text{lanthanoid}`]];
const wsol = PUC.solution($('#wl'), WE.map(w => [K(w[2])]), { label: 'WORKED EXAMPLE', y0: 150, dy: 96 });
$('#wl .lbl').style.top = '30px';
const nmG = WE.map((w, i) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = `left:92px;top:${150 + i * 96 + 46}px;height:30px;font-size:15px;background:${BCOL[w[1]]};color:#fff`; d.textContent = ['SODIUM', 'SULPHUR', 'MANGANESE', 'EUROPIUM'][i]; $('#wl').appendChild(d); return d; });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5')];
const tWn = [wt('W2', 'Sodium'), wt('W3', 'Sulphur'), wt('W4', 'Manganese'), wt('W5', 'Europium')];
const wtb = ptable($('#wS2'), { x: 50, y: 96, cell: 34, gap: 4, fs: 14, fGap: 12, rx: 5 });
const wNum = WE.map(([s], i) => { const c = wtb.cells[ZOF[s]], g = mk($('#wS2'), 'g', {}); mk(g, 'circle', { cx: c.x + 34, cy: c.y, r: 13, fill: HC }); txt(g, c.x + 34, c.y + 6, String(i + 1), { 'text-anchor': 'middle', 'font-size': 15, fill: '#FFFFFF', 'font-weight': 600 }); return g; });

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Fe is ${K('[\\mathrm{Ar}]\\,3d^6 4s^2')}: outer shell 4s, so s-block`, right: `Fe's last electron enters ${K(tc(DC, '3d'))}: d-block` });
const tsv = $('#tS');
const tOb = orbBoxes(tsv, [['4s', 1, 's'], ['3d', 5, 'd']], { cx: 300, y: 70, bw: 48, gap: 5, sg: 20, lfs: 20 });
const tRing = mk(tsv, 'circle', { cx: tOb.pos[7][0], cy: tOb.pos[7][1], r: 16, fill: 'none', stroke: EC, 'stroke-width': 3 });
const tLab = txt(tsv, 336, 200, 'LAST e⁻ HERE → d-BLOCK', { 'text-anchor': 'middle', 'font-size': 16, fill: DC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Locate an element: its block, period and group from its configuration' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `An element has the outer configuration ${K('3d^5\\,4s^1')}. Which block and group is it in?`, qW: 780,
  opts: ['p-block, group 6', 'd-block, group 6', 's-block, group 1', 'd-block, group 5'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\text{last } e^- \\rightarrow ${tc(DC, '3d')}`)], [`${K(tc(DC, '\\text{d-block}'))}`], [K(`${tc(DC, '5')} + ${tc(SC, '1')} = 6`)], ['D forgot the 4s electron']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A4'), wt('A4', 'D')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · periods, groups and blocks', y0: 96, dy: 62, txt: [0, 1, 1, 1, 1, 1],
  lines: [K(`\\text{block} = \\text{subshell that receives the last } ${tc(EC, 'e^-')}`), `<b style="color:${SC}">s-block</b>: groups 1, 2 · ${K('ns^{1-2}')} · reactive metals`, `<b style="color:${PC}">p-block</b>: groups 13 to 18 · ${K('ns^2 np^{1-6}')} · ends in noble gases`, `<b style="color:${DC}">d-block</b>: groups 3 to 12 · ${K('(n-1)d^{1-10} ns^{0-2}')} · group = d + s`, `<b style="color:${FC}">f-block</b>: lanthanoids, actinoids · ${K('(n-2)f^{1-14}(n-1)d^{0-1}ns^2')}`, '<b>Widths</b>: 2, 6, 10, 14 = electrons that s, p, d, f can hold'] });
const YQ = ['Why is the p-block exactly six columns wide?', 'Why is iron a d-block element, even though its outer shell is 4s?', 'In which block are the lanthanoids and actinoids?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 30', topic: 'An address from electrons alone? Electronic Configuration and Position', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [STG[2].tDrop - 0.4, 1.06, 960, 560], [T0('S8') - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sol .sx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(30 * 640 / q.offsetWidth) + 'px'; });
}

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'kind') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'easy') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'racks') + 0.1) / 0.3))); });
    M.vis($('#hTz'), t, wt('H5', 'clue') - 0.15, 1e9, POP);
  }

  /* P + U */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#lf'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    const blkOn = k => M.io((t - tLet[k] + 0.05) / 0.3);
    const r3 = M.io((t - tRow) / 0.3) * (1 - M.io((t - tGrp) / 0.3)), g1 = M.io((t - tGrp) / 0.3) * (1 - M.io((t - tBlk) / 0.3)), nk = M.io((t - tNaK) / 0.3) * (1 - M.io((t - tBlk) / 0.3));
    big.paint(Z => { const c = big.cells[Z], p = c.p, per = periodOf(Z), bk = blockOf(Z);
      const appear = M.clamp((t - tP1 - 0.1 - (p.c + p.r) * 0.03) / 0.2); c.r.style.opacity = appear.toFixed(3); if (c.t) c.t.style.opacity = appear.toFixed(3);
      if (t >= tBlk) { const u = blkOn(bk) * 0.85; return [BCOL[bk], u]; }
      if ((Z === 11 || Z === 19) && nk > 0) return [NC, Math.max(nk, 0.4)];
      if (p.c === 0 && Z !== 1 && p.r < 7 && g1 > 0) return [NC, g1 * 0.45];
      if (per === 3 && p.r < 7 && r3 > 0) return [HC, r3 * 0.75];
      return [NC, 0]; });
    fade(pArr, t, tRow - 0.1, tGrp - 0.1); fade(gBox, t, tGrp - 0.1, tBlk - 0.2);
    M.vis($('#pp1'), t, tRow, tBlk - 0.2, POP); M.vis($('#pp2'), t, tGrp, tBlk - 0.2, POP);
    M.vis($('#nk0'), t, tNaK, tBlk - 0.2, { dx: -16, dy: 0 }); M.vis($('#nk1'), t, wt('P3', 'potassium'), tBlk - 0.2, { dx: -16, dy: 0 }); M.vis($('#pp3'), t, tWater - 0.1, tBlk - 0.2, POP);
    M.vis($('#lgL'), t, tBlk + 0.1, 1e9, { dy: 8 }); LG.forEach(([k]) => M.vis($('#lg' + k), t, tLet[k] - 0.1, 1e9, POP));
    WD.forEach(([k], i) => M.vis($('#wd' + i), t, tWid[k] - 0.1, 1e9, { dx: -16, dy: 0 }));
    for (const k in bars) fade(bars[k], t, tWid[k] + 0.1);
    M.setT($('#lfL'), t < tBlk ? 'THE MAP · PERIODS AND GROUPS' : t < tU ? 'THE FOUR BLOCKS' : 'WHY THESE WIDTHS');
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, STG[0].tin - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, T0('S3') - 0.1, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, 1e9, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'group') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Like') });
    const si = STG.reduce((a, s, i) => t >= s.tin - 0.15 ? i : a, 0), inB = t >= tB1 - 0.15, S = STG[si];
    STG.forEach((s, i) => {
      const on = fade(s.g, t, s.tin - 0.1, i < 3 ? STG[i + 1].tin - 0.15 : tB1 - 0.15, 0.25); if (on <= 0) return;
      fade(s.cg, t, s.tCore - 0.1);
      s.ob.order.forEach((a, k) => { let u, dy = 0;
        if (k < s.ne - 1) { u = M.io((t - s.tCore - 0.1 - k * 0.07) / 0.2); }
        else if (k === s.ne - 1) { const d = M.io((t - s.tDrop + 0.1) / 0.6); u = M.clamp((t - s.tDrop + 0.1) / 0.15); dy = (1 - d) * -120; }
        else u = 0;
        a.style.opacity = u.toFixed(3); M.hide(a, u <= 0.01); attr(a, 'transform', `translate(0 ${dy.toFixed(1)})`); });
      const [rx, ry] = s.ob.pos[s.ne - 1]; attr(s.ring, 'cx', rx.toFixed(1)); attr(s.ring, 'cy', ry); fade(s.ring, t, s.tDrop + 0.5);
      fade(s.tag, t, s.tDrop + 0.5); fade(s.eg, t, s.tDrop + 0.7);
    });
    fade(hb, t, tB1 - 0.1); hbHe.order.forEach((a, k) => fade(a, t, wt('B1', 'one', 1) + k * 0.2)); hbBe.order.forEach((a, k) => fade(a, t, wt('B1', 'beryllium') + k * 0.2)); fade(hbFull, t, tB2 - 0.6);
    // mini table: block region tinted, element solid
    td.paint(Z => { const bk = blockOf(Z);
      if (inB) { if (Z === 2) return [SC, 1]; if (Z === 4) return [SC, M.io((t - wt('B1', 'beryllium')) / 0.3)]; if (td.cells[Z].p.c === 17) return [PC, 0.25]; return [NC, 0]; }
      const u0 = M.io((t - S.tDrop - 0.4) / 0.4); if (Z === ZOF[S.el]) return [BCOL[S.blk], u0]; if (bk === S.blk && Z !== 2) return [BCOL[S.blk], 0.22 * u0]; return [NC, 0]; });
    M.setT($('#tdC'), inB ? 'He' : S.el); $('#tdC').style.color = inB ? SC : BCOL[S.blk];
    M.setT($('#tdB'), inB ? '1s² · SITS IN GROUP 18' : S.grp);
    $('#tdR').style.opacity = inB ? 1 : M.io((t - S.tDrop - 0.4) / 0.4).toFixed(3);
    BF.forEach(([k], i) => fade($('#bf' + k), t, STG[i].tDrop + 0.6, i < 3 ? STG[i + 1].tin - 0.15 : 1e9, 0.25));
    const bx = $('#bfx'); if (bx) PUC.write(bx, t, wt('S7', 'group', 1) - 0.1, 0.8);
    const TAG = [[STG[0].tin, 'Na · Z = 11'], [STG[0].tDrop, 'THE 11th ELECTRON'], [STG[1].tin, 'Cl · Z = 17'], [STG[2].tin, 'Fe · Z = 26'], [STG[2].tDrop, 'AFTER 4s, INTO 3d'], [STG[3].tin, 'f-BLOCK'], [tB1, 'ONE ODD CASE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, STG[0].tin - 0.1, 1e9, POP);
    avD(t, wt('S8', 'bottom') + 0.2, tB1 - 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'block') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'where') - 0.25, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'goes') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, wt('W1', 'Place') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    nmG.forEach((d, i) => M.vis(d, t, tWn[i] - 0.1, 1e9, POP));
    M.vis($('#wr'), t, wt('W1', 'Place') + 0.2, out, { dx: 60, dy: 0, ...o });
    const cur = tWn.reduce((a, tt, i) => t >= tt - 0.6 ? i : a, -1);
    wtb.paint(Z => { const bk = blockOf(Z); const i = WE.findIndex(w => ZOF[w[0]] === Z);
      if (i >= 0) { const u = M.io((t - tWn[i] + 0.6) / 0.35); return [BCOL[WE[i][1]], u]; }
      if (cur >= 0 && bk === WE[cur][1] && Z !== 2) return [BCOL[bk], 0.2]; return [NC, 0]; });
    wNum.forEach((g, i) => fade(g, t, tWn[i] - 0.5));
    M.vis($('#wGp'), t, T0('W5') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'Iron') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'iron') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: tR });
    fade(tOb.g, t, wt('X2', 'four') - 0.1);
    tOb.order.forEach((a, k) => { const u = k < 8 ? M.io((t - wt('X2', 'four') - k * 0.06) / 0.15) : 0; a.style.opacity = u.toFixed(3); M.hide(a, u <= 0.01); });
    fade(tRing, t, wt('X3', 'last') - 0.1); fade(tLab, t, tR + 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
