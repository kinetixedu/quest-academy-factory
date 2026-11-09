// PUC Chemistry Ep 42: Limitations of the octet rule (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: central atom (element in play) teal, Cl blue, O violet, F / H / partners ink, shared (moving) electrons orange, extra room gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', CL = '#2F6FEB', OC = '#7A4FE0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, m = s => `\\mathrm{${s}}`;
const B_ = tc(NC, m('B')), Cl_ = tc(CL, m('Cl')), N_ = tc(NC, m('N')), O_ = tc(OC, m('O')), P_ = tc(NC, m('P')), S_ = tc(NC, m('S')), e_ = tc(EC, 'e^-');
const BCl3 = `${B_}${Cl_}_3`, NO = `${N_}${O_}`, PF5 = `${P_}\\mathrm{F}_5`, SF6 = `${S_}\\mathrm{F}_6`;
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const tr = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };

Object.assign(M.IC, {
  x: ['M18 6 6 18', 'm6 6 12 12'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['users', 'Pairs game', 'ONE LEFT ALONE', 'pairs', 'ODD ONE OUT'], ['user', 'Cricket team', 'PLAYS WITH TEN', 'cricket', 'FEWER THAN FULL'], ['layers', 'Big lift', 'TWELVE, NOT EIGHT', 'lift', 'MORE THAN 8']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [[K(`${tc(NC, m('B'))}\\mathrm{F}_3`), wt('H3', 'B')], [`Boron: <b class="e">6</b> e⁻`, wt('H3', 'six')], ['Rule said 8. Wrong?', wt('H4', 'wrong')]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: the rule + neon ---------- */
$('#mdefI').innerHTML = M.icon('box', 28, '#fff', 2.2);
const QR = [['Outer shell: valence shell', 'THE PAGE', wt('P3', 'valence')], ['Its electrons: valence e⁻', 'THE STICKERS', wt('P3', 'electrons', 1)], ['Atoms join to reach 8', 'OCTET', wt('P4', 'join')], ['Noble gases already have 8', 'NO REACTION', T0('P5')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ns = $('#nS'), NX = 392, NY = 270;
mk(ns, 'circle', { cx: NX, cy: NY, r: 78, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const nRing = mk(ns, 'circle', { cx: NX, cy: NY, r: 150, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const neG = atomG(ns, 46, NC, 'Ne', 30); tr(neG, NX, NY);
[90, 270].forEach(a => mk(ns, 'circle', { cx: NX + 78 * Math.cos(a * Math.PI / 180), cy: NY + 78 * Math.sin(a * Math.PI / 180), r: 8, fill: HC }));
const nSlot = [], nDot = [];
for (let k = 0; k < 8; k++) { const a = (k * 45 - 90) * Math.PI / 180, x = NX + 150 * Math.cos(a), y = NY + 150 * Math.sin(a);
  nSlot.push(mk(ns, 'circle', { cx: x, cy: y, r: 12, fill: '#fff', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 4' })); nDot.push(mk(ns, 'circle', { cx: x, cy: y, r: 9, fill: HC })); }
const nCfg = txt(ns, NX, 92, 'Ne  2, 8', { 'text-anchor': 'middle', 'font-size': 22, fill: NC, 'font-weight': 600 });
const nCnt = txt(ns, 700, 92, '0 / 8', { 'text-anchor': 'end', 'font-size': 26, fill: HC, 'font-weight': 600 });
const neTag = document.createElement('div'); neTag.className = 'pillp ac'; neTag.style.cssText = 'left:36px;top:494px'; neTag.textContent = 'Full shell: neon does not react'; $('#pw').appendChild(neTag);
const tFill = wt('P2', 'every'), tNeon = T0('P5');

/* ---------- S: the bench ---------- */
const b = $('#bS'), CX = 392, CY = 236;
const benchW = mk(b, 'g', {});
const gaugeG = mk(b, 'g', {});
const GX = 130, GS = 44, GY = 516;
const gLab = txt(gaugeG, 36, 470, 'ELECTRONS AROUND B', { 'font-weight': 600, 'letter-spacing': '1.4' });
const gNum = txt(gaugeG, 748, 470, '0 / 8', { 'text-anchor': 'end', 'font-size': 26, fill: HC, 'font-weight': 600 });
mk(gaugeG, 'line', { x1: GX + 7.5 * GS, y1: GY - 26, x2: GX + 7.5 * GS, y2: GY + 26, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '5 5' });
const gSl = Array.from({ length: 12 }, (_, i) => mk(gaugeG, 'circle', { cx: GX + i * GS, cy: GY, r: 14, fill: '#fff', stroke: i < 8 ? C.dim : GC, 'stroke-width': 2.5, 'stroke-dasharray': i < 8 ? '' : '4 4' }));
const gauge = (n, lab, nmax = 8) => { gSl.forEach((c, i) => attr(c, 'fill', i < n ? EC : '#fff')); M.setT(gNum, `${n} / 8`); attr(gNum, 'fill', n === 8 ? C.ok : n > 8 ? GC : n > 0 ? C.red : HC); M.setT(gLab, lab); };
// star molecule: centre + n ligands, each bond = 2 electrons that meet in the middle, then a stick
const star = (o) => {
  const g = mk(benchW, 'g', {}), bl = mk(g, 'g', {}), al = mk(g, 'g', {}), dl = mk(g, 'g', {});
  const ring = mk(bl, 'circle', { cx: CX, cy: CY, r: o.rc + 22, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
  const c = atomG(al, o.rc, o.cc, o.c, 30); tr(c, CX, CY);
  const L = Array.from({ length: o.n }, (_, i) => { const a = (o.a0 + i * 360 / o.n) * Math.PI / 180;
    const lone = mk(dl, 'g', {}); [-55, 0, 55].forEach(d => { const aa = a + d * Math.PI / 180; [-1, 1].forEach(s => mk(lone, 'circle', { cx: Math.cos(aa) * (o.rl + 14) - Math.sin(aa) * s * 6, cy: Math.sin(aa) * (o.rl + 14) + Math.cos(aa) * s * 6, r: 4.5, fill: HC })); });
    return { a, g: atomG(al, o.rl, o.lc, o.l, 24), st: mk(bl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }), d: [mk(dl, 'circle', { r: 7.5, fill: HC }), mk(dl, 'circle', { r: 7.5, fill: EC })], lone }; });
  return { g, ring, c, L, o };
};
const runStar = (S, t, tIn, tB, tLone, gin) => {
  const { o } = S; let nb = 0;
  op(S.g, gin);
  S.L.forEach((l, i) => {
    const u = M.io((t - tIn[i]) / 0.6), ux = Math.cos(l.a), uy = Math.sin(l.a), R = o.R + (1 - u) * 240;
    const lx = CX + ux * R, ly = CY + uy * R; tr(l.g, lx, ly); op(l.g, u); tr(l.lone, lx, ly); op(l.lone, u * M.io((t - tLone) / 0.4));
    const bu = M.io((t - tB[i]) / 0.5), su = M.io((t - tB[i] - 0.35) / 0.3); if (t >= tB[i] + 0.5) nb++;
    const mx = CX + ux * (o.rc + (R - o.rc - o.rl) / 2), my = CY + uy * (o.rc + (R - o.rc - o.rl) / 2), px = -uy * 11, py = ux * 11;
    const c0x = CX + ux * (o.rc + 22), c0y = CY + uy * (o.rc + 22), l0x = lx - ux * (o.rl + 14), l0y = ly - uy * (o.rl + 14);
    attr(l.d[0], 'cx', M.lerp(c0x, mx + px, bu).toFixed(1)); attr(l.d[0], 'cy', M.lerp(c0y, my + py, bu).toFixed(1)); attr(l.d[0], 'fill', mix(HC, EC, bu));
    attr(l.d[1], 'cx', M.lerp(l0x, mx - px, bu).toFixed(1)); attr(l.d[1], 'cy', M.lerp(l0y, my - py, bu).toFixed(1));
    op(l.d[0], gin); op(l.d[1], u);
    attr(l.st, 'x1', (CX + ux * (o.rc - 4)).toFixed(1)); attr(l.st, 'y1', (CY + uy * (o.rc - 4)).toFixed(1));
    attr(l.st, 'x2', (CX + ux * (o.rc - 4 + (R - o.rc - o.rl + 8) * su)).toFixed(1)); attr(l.st, 'y2', (CY + uy * (o.rc - 4 + (R - o.rc - o.rl + 8) * su)).toFixed(1)); M.hide(l.st, su <= 0.01);
  });
  return nb;
};
const sB = star({ c: 'B', cc: NC, n: 3, l: 'Cl', lc: CL, a0: -90, R: 160, rc: 44, rl: 36 });
const sP = star({ c: 'P', cc: NC, n: 5, l: 'F', lc: HC, a0: -90, R: 150, rc: 44, rl: 30 });
const sS = star({ c: 'S', cc: NC, n: 6, l: 'F', lc: HC, a0: -90, R: 150, rc: 44, rl: 30 });
[sP, sS].forEach(s => s.L.forEach(l => M.hide(l.lone, true)));
const tS1b = wt('S1', 'middle'), tCl = wt('S2', 'chlorine'), tShare = wt('S2', 'shares'), tCnt = [wt('S3', 'Two'), wt('S3', 'four'), wt('S3', 'six')], tLoneB = wt('S4', 'chlorine');
const tBB = [0, 1, 2].map(i => tShare + i * 0.35), tInB = [0, 1, 2].map(i => tCl + i * 0.2);
const tPm = wt('D2', 'makes'), tSm = wt('D4', 'makes');
const tBP = [0, 1, 2, 3, 4].map(i => tPm + 0.3 + i * 0.32), tInP = [0, 1, 2, 3, 4].map(i => tPm - 0.4 + i * 0.12);
const tBS = [0, 1, 2, 3, 4, 5].map(i => tSm + 0.2 + i * 0.28), tInS = [0, 1, 2, 3, 4, 5].map(i => tSm - 0.5 + i * 0.1);
// NO: eleven electrons into pair boxes
const noG = mk(benchW, 'g', {});
const NOX = [250, 534], NOY = 170;
NOX.forEach((x, i) => mk(noG, 'circle', { cx: x, cy: NOY, r: 84, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const nA = atomG(noG, 46, NC, 'N', 32), oA = atomG(noG, 46, OC, 'O', 32); tr(nA, NOX[0], NOY); tr(oA, NOX[1], NOY);
const boxes = Array.from({ length: 6 }, (_, k) => mk(noG, 'rect', { x: 72 + k * 108, y: 312, width: 92, height: 64, rx: 12, fill: C.soft, stroke: C.line, 'stroke-width': 2.5 }));
const lonely = txt(noG, 72 + 5 * 108 + 46, 410, 'ALONE', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.red });
const eDots = Array.from({ length: 11 }, (_, k) => { const own = k < 5 ? 0 : 1, j = own ? k - 5 : k, n = own ? 6 : 5, a = (j * 360 / n - 90 + (own ? 30 : 0)) * Math.PI / 180;
  return { el: mk(noG, 'circle', { r: 9, fill: own ? OC : NC }), x0: NOX[own] + 84 * Math.cos(a), y0: NOY + 84 * Math.sin(a), x1: 72 + (k >> 1) * 108 + 46 + ((k & 1) ? 18 : -18) * (k === 10 ? 0 : 1), y1: 344 }; });
const tPairs = wt('B2', 'pairs'), tAlone = wt('B2', 'alone');
// bench tag
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const avA = PUC.avatar($('#bn'), { x: 36, y: 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Eleven socks, one always alone!' });
// right top: the counts
const rxA = PUC.solution($('#rxA'), [[K(`${B_}: 3\\ \\text{valence}\\ ${e_}`)], [K(`3 \\text{ pairs} \\times 2 = 6\\ ${e_}`)], [K(`6 < 8 \\;\\Rightarrow\\; \\text{incomplete octet}`)]], { label: `THE COUNT · ${'BCl₃'}`, y0: 80, dy: 62 });
const rxB = PUC.solution($('#rxB'), [[K(`${N_}\\,5 + ${O_}\\,6 = 11\\ ${e_}`)], [K(`11 = 5 \\text{ pairs} + 1 \\text{ alone}`)], [K(`\\mathrm{NO_2}: 5 + 2 \\times 6 = 17`)]], { label: 'THE COUNT · NO', y0: 80, dy: 62 });
const rxD = PUC.solution($('#rxD'), [[K(`${PF5}: 5 \\times 2 = 10\\ ${e_}`)], [K(`${SF6}: 6 \\times 2 = 12\\ ${e_}`)], [K(`10,\\ 12 > 8 \\;\\Rightarrow\\; \\text{expanded octet}`)]], { label: 'THE COUNT · EXPANDED', y0: 80, dy: 62 });
const tRA = [wt('S1', 'three'), tCnt[2], wt('S4', 'incomplete')], tRB = [wt('B2', 'eleven'), tAlone, wt('B3', 'seventeen')], tRD = [T0('D3'), wt('D4', 'twelve'), wt('D6', 'expanded')];
// right bottom: tables + rooms
const CRA = [[`\\mathrm{Li}${Cl_}`, 'Li: 1 valence e⁻', '2 e⁻', wt('S5', 'one')], [`\\mathrm{Be}\\mathrm{H}_2`, 'Be: 2 valence e⁻', '4 e⁻', wt('S5', 'two')], [BCl3, 'B: 3 valence e⁻', '6 e⁻', wt('S5', 'three')]];
$('#crA').innerHTML = CRA.map(([f, n, v], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${n}</div><div class="cv" style="color:var(--red)">${v}</div></div>`).join('');
const CRB = [[NO, '5 + 6', '11 · ODD', tB1 + 0.3], [`\\mathrm{NO_2}`, '5 + 6 + 6', '17 · ODD', wt('B3', 'seventeen')]];
$('#crB').innerHTML = CRB.map(([f, n, v], i) => `<div class="cr" id="cb${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${n}</div><div class="cv" style="color:var(--red)">${v}</div></div>`).join('');
const ROOMS = [['N · PERIOD 2', ['2s', '2p', '2d'], 0], ['P, S · PERIOD 3', ['3s', '3p', '3d'], 1]];
$('#rooms').innerHTML = ROOMS.map(([l, rs, k], i) => `<div class="lbl" style="left:36px;top:${96 + i * 84}px;color:var(--ink)">${l}</div>` + rs.map((r, j) => `<div class="room${!k && j === 2 ? ' no' : ''}" id="rm${i}${j}" style="left:${300 + j * 150}px;top:${76 + i * 84}px;width:132px${k && j === 2 ? ';border-color:#B7791F;color:#B7791F' : ''}">${r}${!k && j === 2 ? ' ✕' : ''}</div>`).join('')).join('');
const tRooms = [wt('D5', 'period'), wt('D5', 'Besides'), wt('D5', 'have'), wt('D5', 'More')];
const th1 = PUC.think($('#th1'), { q: 'Which one is an odd electron molecule?', opts: ['BCl₃', 'NO'], right: 1, why: `${K(NO)}: 5 + 6 = 11, odd. ${K(BCl3)}: 3 + 21 = 24, even (boron still short).` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{fewer than } 8 \\;\\cdot\\; \\text{odd count} \\;\\cdot\\; \\text{more than } 8`);

/* ---------- W: worked example + octet meters ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{Be}${Cl_}_2: 2 \\times 2 = 4 < 8`)],
  [K(`${P_}${Cl_}_5: 5 \\times 2 = 10 > 8`)],
  [K(`${S_}${Cl_}_2: 2 \\times 2 + \\textcolor{${HC}}{2 \\times 2} = 8`)],
  [K(`${S_}${Cl_}_2 \\text{ obeys the octet rule}\\;\\textcolor{${C.ok}}{\\checkmark}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), wt('W5', 'adds'), T0('W6')];
const s2 = $('#wS2');
const MET = [['BeCl₂', 4, 0, 'INCOMPLETE', C.red, wt('W3', 'four'), 0, wt('W3', 'Incomplete')], ['PCl₅', 10, 0, 'EXPANDED', GC, wt('W4', 'ten'), 0, wt('W4', 'Expanded')], ['SCl₂', 4, 4, 'OCTET OBEYED', C.ok, wt('W5', 'four'), wt('W5', 'adds'), wt('W6', 'obeys')]];
const MX = 230, MS = 44;
txt(s2, MX + 7.5 * MS, 100, '8', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 600 });
mk(s2, 'line', { x1: MX + 7.5 * MS, y1: 112, x2: MX + 7.5 * MS, y2: 520, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const met = MET.map(([f, sh, lp, v, vc], i) => { const y = 170 + i * 140, g = mk(s2, 'g', {});
  txt(g, 36, y + 9, f, { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: HC });
  const vt = txt(g, 36, y + 50, v, { 'font-size': 16, 'font-weight': 600, fill: vc, 'letter-spacing': '1.2' });
  const cs = Array.from({ length: 12 }, (_, k) => mk(g, 'circle', { cx: MX + k * MS, cy: y, r: 15, fill: '#fff', stroke: k < 8 ? C.dim : GC, 'stroke-width': 2.5, 'stroke-dasharray': k < 8 ? '' : '4 4' }));
  const nt = txt(g, 748, y + 50, '', { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 600, fill: HC });
  return { g, vt, cs, nt }; });
const wLegend = mk(s2, 'g', {}); mk(wLegend, 'circle', { cx: 48, cy: 538, r: 9, fill: EC }); txt(wLegend, 66, 544, 'SHARED', { 'font-weight': 600 }); mk(wLegend, 'circle', { cx: 182, cy: 538, r: 9, fill: HC }); txt(wLegend, 200, 544, 'LONE PAIR', { 'font-weight': 600 });

/* ---------- C: other drawbacks ---------- */
const SR = [['Incomplete octet', 'LiCl · BCl₃'], ['Odd electrons', 'NO · NO₂'], ['Expanded octet', 'PF₅ · SF₆'], ['Noble gases react', 'XeF₂ · KrF₂'], ['Says nothing on shape', 'FLAT? BENT?'], ['Says nothing on energy', 'STABILITY?']];
$('#srs').innerHTML = SR.map(([n, w], i) => `<div class="sr" id="sr${i}" style="top:${76 + i * 80}px"><div class="nn">${i + 1}</div><div class="sn2">${n}</div><div class="sw">${w}</div></div>`).join('');
const tSr = [T0('C1') + 0.2, T0('C1') + 0.4, T0('C1') + 0.6, T0('C2'), T0('C3'), T0('C4')];
const PANE = [['04 / 06 · NOBLE GASES', 'They do react', ['XeF₂', 'KrF₂', 'XeOF₂'], [wt('C2', 'X'), wt('C2', 'K'), wt('C2', 'O', 1)]],
  ['05 / 06 · SHAPE', 'Silent on shape', ['Flat?', 'Bent?', 'Pyramid?'], [wt('C3', 'shape') - 0.3, wt('C3', 'shape') + 0.1, wt('C3', 'shape') + 0.5]],
  ['06 / 06 · ENERGY', 'Silent on energy', ['Which is more stable?'], [wt('C4', 'stable') - 0.4]]];
$('#pns').innerHTML = PANE.map(([s, tt, ch], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="ptt">${tt}</div><div class="chs">${ch.map((c, k) => `<span id="pc${i}_${k}">${c}</span>`).join('')}</div><svg id="pv${i}" width="784" height="330"></svg></div>`).join('');
// pane drawings
const pv0 = $('#pv0'); const xe = atomG(pv0, 46, NC, 'Xe', 28); tr(xe, 392, 150); mk(pv0, 'circle', { cx: 392, cy: 150, r: 70, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const xF = [-1, 1].map(s => { const g = atomG(pv0, 30, HC, 'F', 22); return { g, s }; });
const xSt = [-1, 1].map(s => mk(pv0, 'line', { x1: 392 + s * 46, y1: 150, x2: 392 + s * 140, y2: 150, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const pv1 = $('#pv1'); const shp = [[[0, 0], [-60, 40], [60, 40], [0, -70]], [[0, -20], [-62, 34], [62, 34]], [[0, -40], [-58, 40], [58, 40], [0, 66]]];
const shG = shp.map((pts, k) => { const g = mk(pv1, 'g', { transform: `translate(${152 + k * 240} 150)` }); pts.slice(1).forEach(([x, y]) => mk(g, 'line', { x1: pts[0][0], y1: pts[0][1], x2: x, y2: y, stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round' }));
  pts.slice(1).forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 18, fill: HC })); mk(g, 'circle', { cx: pts[0][0], cy: pts[0][1], r: 26, fill: NC }); txt(g, 0, 118, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ac }); return g; });
const pv2 = $('#pv2'); mk(pv2, 'line', { x1: 120, y1: 40, x2: 120, y2: 280, stroke: C.ink, 'stroke-width': 3 }); txt(pv2, 100, 30, 'ENERGY', { 'font-weight': 600 });
const lv = [[200, 'MOLECULE A'], [130, 'MOLECULE B']].map(([y, s], k) => { const g = mk(pv2, 'g', {}); mk(g, 'line', { x1: 180 + k * 260, y1: y, x2: 380 + k * 260, y2: y, stroke: k ? CL : NC, 'stroke-width': 6, 'stroke-linecap': 'round' }); txt(g, 280 + k * 260, y - 18, s, { 'text-anchor': 'middle', 'font-weight': 600 }); return g; });
const lq = txt(pv2, 392, 270, 'OCTET RULE: NO ANSWER', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.red });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('\\mathrm{NCl_5}')} exists, because N expands like P`, right: `N is in period 2: no 2d rooms, at most 8. ${K('\\mathrm{PCl_5}')} yes, ${K('\\mathrm{NCl_5}')} no` });
const tsv = $('#tS');
const tRm = [['N', ['2s', '2p', '2d'], 0], ['P', ['3s', '3p', '3d'], 1]].map(([el, rs, ok], i) => { const g = mk(tsv, 'g', { transform: `translate(${20 + i * 270} 70)` });
  atomG(g, 26, ok ? NC : C.red, el, 22).setAttribute('transform', 'translate(26 30)');
  rs.forEach((r, j) => { const y = 70 + j * 0; mk(g, 'rect', { x: 64 + j * 62, y: 6, width: 54, height: 48, rx: 9, fill: '#fff', stroke: j === 2 ? (ok ? GC : C.red) : C.line, 'stroke-width': 2.5, 'stroke-dasharray': j === 2 && !ok ? '5 4' : '' }); txt(g, 91 + j * 62, 37, r, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: j === 2 ? (ok ? GC : C.red) : HC }); });
  txt(g, 8, 110, ok ? 'PCl₅ EXISTS' : 'NCl₅ DOES NOT', { 'font-size': 16, 'font-weight': 600, fill: ok ? C.ok : C.red }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Odd one out: pick the molecule that breaks the octet rule, or count electrons around the central atom' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: 'In which set does <b>every</b> molecule break the octet rule?', qW: 760,
  opts: [K('\\mathrm{BF_3,\\ NO,\\ PF_5}'), K('\\mathrm{BF_3,\\ NH_3,\\ SF_6}'), K('\\mathrm{CO_2,\\ NO_2,\\ PCl_5}'), K('\\mathrm{H_2O,\\ BeCl_2,\\ SF_6}')], right: 0, optW: 474, optY: 300, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{BF_3}: ${B_}\\ 6 < 8`)], [K(`${NO}: 5 + 6 = 11`)], [K(`${PF5}: 10 > 8`)], [K(`\\mathrm{NH_3,\\ CO_2,\\ H_2O}: 8`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'ten'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · limits of the octet rule', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Octet rule</b>: atoms join to end with 8 valence electrons', '<b>Incomplete</b>: LiCl, BeH₂, BCl₃ (B has 6), AlCl₃, BF₃', '<b>Odd electron</b>: NO (11), NO₂ (17)', '<b>Expanded</b>: PF₅ (10), SF₆ (12), H₂SO₄ (12) · period 3 and below', '<b>Also</b>: XeF₂, KrF₂ exist · silent on shape and energy'] });
const YQ = ['Why does boron have only six electrons in BCl₃?', 'Why can no structure give every atom in NO an octet?', 'Why does PCl₅ exist, but NCl₅ does not?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 43', topic: 'Why is a triple bond shorter and stronger? Bond Parameters', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tCnt[0] - 0.3, 1.08, 820, 600], [T0('S4') + 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(28 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { if (q.offsetWidth > 470) q.style.fontSize = Math.floor(27 * 470 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'breaks') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'works') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, i === 2 ? mix(C.soft, C.redBg, M.io((t - tt) / 0.3)) : i === 1 ? mix(C.soft, C.ac2, M.io((t - tt) / 0.3)) : C.soft); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'sticker') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    let n = 0; nDot.forEach((d, k) => { const u = M.io((t - tFill - k * 0.14) / 0.25); op(d, u); if (u > 0.5) n++; });
    M.setT(nCnt, `${n} / 8`); attr(nCnt, 'fill', n === 8 ? C.ok : HC);
    attr(nRing, 'stroke', mix(C.dim, NC, M.io((t - wt('P4', 'eight')) / 0.3)));
    M.vis(neTag, t, tNeon + 0.2, 1e9, POP);
  }

  /* S + B + D: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const w1 = t < tD1 - 0.45, a = w1 ? tS1 + 0.05 : tD1 + 0.05, z = w1 ? OUT('B4') : OUT('T1');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    M.vis($('#rx'), t, w1 ? tS1 + 0.3 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, w1 ? wt('S5', 'Lithium') - 0.2 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB4, tOpts: wt('B4', 'B') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Five') });
    const phA = t < tB1 - 0.2, phD = !w1;
    M.setT($('#bnL'), phA ? 'MOLECULE BENCH · BCl₃' : phD ? (t < tSm - 0.6 ? 'MOLECULE BENCH · PF₅' : 'MOLECULE BENCH · SF₆') : 'MOLECULE BENCH · NO');
    // phase A: BCl3
    const gA = phA ? M.clamp((t - tS1 - 0.2) / 0.3) * (1 - M.io((t - tB1 + 0.5) / 0.3)) : 0;
    runStar(sB, t, tInB, tBB, tLoneB, gA);
    // phase D: PF5 then SF6
    const gP = phD ? M.clamp((t - tD1 - 0.1) / 0.3) * (1 - M.io((t - tSm + 0.7) / 0.3)) : 0, gS = phD ? M.io((t - tSm + 0.5) / 0.3) : 0;
    const nbP = runStar(sP, t, tInP, tBP, 1e9, gP), nbS = runStar(sS, t, tInS, tBS, 1e9, gS);
    // gauge
    const gG = phA ? gA : phD ? 1 : 0; op(gaugeG, gG);
    if (phA) gauge(tCnt.reduce((s, tt) => t >= tt ? s + 2 : s, 0), 'ELECTRONS AROUND B');
    else if (phD) { if (gS > 0.5) gauge(nbS * 2, 'ELECTRONS AROUND S'); else gauge(nbP * 2, 'ELECTRONS AROUND P'); }
    // phase B: NO
    const gB = !phA && !phD ? M.clamp((t - tB1 + 0.3) / 0.3) : 0; op(noG, gB);
    if (gB > 0) {
      eDots.forEach((d, k) => { const u = M.io((t - tPairs - k * 0.11) / 0.5); attr(d.el, 'cx', M.lerp(d.x0, d.x1, u).toFixed(1)); attr(d.el, 'cy', M.lerp(d.y0, d.y1, u).toFixed(1)); attr(d.el, 'r', (9 + 2 * u).toFixed(1)); attr(d.el, 'fill', k === 10 ? mix(OC, EC, M.io((t - tAlone) / 0.3)) : d.el.getAttribute('fill')); });
      const al = M.io((t - tAlone) / 0.3); attr(boxes[5], 'stroke', mix(C.line, C.red, al)); attr(boxes[5], 'fill', mix(C.soft, C.redBg, al)); boxes.forEach(bx => op(bx, M.io((t - tPairs + 0.6) / 0.3)));
      op(lonely, al);
    }
    avA(t, wt('B3', 'short'), OUT('B4'));
    const TAG = phA ? [[tS1b, 'B · 3 VALENCE e⁻'], [tShare, 'SHARING PAIRS'], [tCnt[2], 'ONLY 6 AROUND B'], [wt('S4', 'incomplete'), 'INCOMPLETE OCTET']]
      : phD ? [[tPm, 'P · 5 BONDS'], [T0('D3'), '10 AROUND P'], [tSm, 'S · 6 BONDS'], [wt('D4', 'twelve'), '12 AROUND S'], [T0('D6'), 'EXPANDED OCTET']]
      : [[tB1, 'N 5 · O 6'], [wt('B2', 'eleven'), '11 · ODD'], [tAlone, '1 LEFT ALONE'], [wt('B3', 'seventeen'), 'NO₂ · 17 · ODD']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    // right top: counts
    M.vis($('#rxA'), t, tS1, tB1 - 0.3, { dy: 0, outDur: 0.25, ody: 0 }); M.vis($('#rxB'), t, tB1 - 0.1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxB(t, tB1, tRB); rxD(t, tD1 + 0.2, tRD);
    // right bottom
    M.vis($('#ctA'), t, wt('S5', 'Lithium') - 0.2, tB1 - 0.3, { dy: 0, outDur: 0.25, ody: 0 }); M.vis($('#ctB'), t, tB1 - 0.1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1, 1e9, { dy: 0 });
    CRA.forEach(([, , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    CRB.forEach(([, , , tt], i) => M.vis($('#cb' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    [0, 1].forEach(i => [0, 1, 2].forEach(j => M.vis($(`#rm${i}${j}`), t, j < 2 ? tRooms[0] + i * 0.3 + j * 0.12 : tRooms[2] + i * 0.4, 1e9, POP)));
    $('#ct .lbl').style.display = '';
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'octet') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'not') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'nature') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    MET.forEach(([, sh, lp, , , t1, t2, tv], i) => { const mm = met[i]; op(mm.g, M.io((t - T0('W2') - 0.4 - i * 0.15) / 0.3));
      let n = 0; mm.cs.forEach((c, k) => { const isL = k >= sh && k < sh + lp, tt = isL ? t2 + (k - sh) * 0.12 : t1 + k * 0.08, on = k < sh + lp && t >= tt; attr(c, 'fill', on ? (isL ? HC : EC) : '#fff'); if (on) n++; });
      M.setT(mm.nt, n ? `${n} e⁻` : ''); op(mm.vt, M.io((t - tv + 0.1) / 0.3)); });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, T0('C2') - 0.2, out, { dx: 60, dy: 0, ...o });
    SR.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tSr[i] - 0.1, 1e9, { dy: 14 });
      const on = i < 3 ? 0 : M.io((t - tSr[i] + 0.15) / 0.3) * (i < 5 ? 1 - M.io((t - tSr[i + 1] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.sn2').style.color = mix(i < 3 ? C.mute : C.ink, '#FFFFFF', on); el.querySelector('.sw').style.color = mix(C.mute, C.ac2, on); });
    PANE.forEach(([, , ch, ts], i) => { const pn = $('#pn' + i), tin = tSr[i + 3] - 0.15, tout = i < 2 ? tSr[i + 4] - 0.15 : 1e9;
      M.vis(pn, t, tin, tout, { dy: 20, outDur: 0.2, ody: -10 }); ts.forEach((tt, k) => M.vis($(`#pc${i}_${k}`), t, tt - 0.1, 1e9, POP)); });
    const fu = M.io((t - wt('C2', 'xenon')) / 0.7); xF.forEach(({ g, s }) => tr(g, 392 + s * (170 + 200 * (1 - fu)), 150)); xF.forEach(({ g }) => op(g, fu)); xSt.forEach(l => op(l, M.io((t - wt('C2', 'xenon') - 0.6) / 0.3)));
    shG.forEach((g, k) => op(g, M.io((t - wt('C3', 'shape') + 0.3 - k * 0.4) / 0.3)));
    lv.forEach((g, k) => op(g, M.io((t - T0('C4') - 0.3 - k * 0.3) / 0.3))); op(lq, M.io((t - wt('C4', 'stable')) / 0.3));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'period') - 0.1, tRight: wt('X3', 'never') - 0.1 });
    fade(tRm[0], t, wt('X3', 'period') - 0.1); fade(tRm[1], t, wt('X3', 'exists') - 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'odd') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'every'), tCount, tAns });
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
