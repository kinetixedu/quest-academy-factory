// PUC Chemistry Ep 25: Electronic configurations (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: shell number n teal, subshell letter l violet, electrons / arrows / superscripts orange, element in play teal
const NC = C.ac, LC = '#7A4FE0', EC = '#C8461B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const setH = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const cN = s => `\\textcolor{${NC}}{${s}}`, cL = s => `\\textcolor{${LC}}{${s}}`, cE = s => `\\textcolor{${EC}}{${s}}`;
const l_ = cL('l');
const wx = (id, w, nth = 0) => { const W = M.L(id).words, h = W.filter(x => x.w.toLowerCase().replace(/[^a-z0-9]/g, '') === w.toLowerCase()); if (!h.length) { console.warn('word not found', id, w); return M.t0(id); } return h[Math.min(nth, h.length - 1)].t; };
const SUB = (s) => `${cN(s[0])}${cL('\\mathrm{' + s.slice(1) + '}')}`;
const TERM = (s, k) => `${SUB(s)}^{${cE(k)}}`;
const AR = `[\\mathrm{Ar}]`;

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  upA: ['M12 19V5', 'm5 12 7-7 7 7'], dnA: ['M12 5v14', 'm19 12-7 7-7-7'],
});
const ARW = (p, up, s = 1) => mk(p, 'path', { d: up ? `M0 ${18 * s} V${-18 * s} M${-8 * s} ${-9 * s} L0 ${-18 * s} L${8 * s} ${-9 * s}` : `M0 ${-18 * s} V${18 * s} M${-8 * s} ${9 * s} L0 ${18 * s} L${8 * s} ${9 * s}`, stroke: EC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const BOX = (p, x, y, s, sw = 2.5) => { const r = mk(p, 'rect', { x, y, width: s, height: s, rx: s * 0.14, fill: '#fff', stroke: C.ink2, 'stroke-width': sw }); const sc = s / 72;
  const u = ARW(p, true, sc * 1.1), d = ARW(p, false, sc * 1.1); attr(u, 'transform', `translate(${x + s * 0.32} ${y + s / 2})`); attr(d, 'transform', `translate(${x + s * 0.68} ${y + s / 2})`); M.hide(u, true); M.hide(d, true); return { r, u, d, cx: x + s / 2, cy: y + s / 2, x, y, s }; };
// show k electrons in a subshell's boxes (Hund: ups first, then downs)
const fillSub = (bxs, k) => { const n = bxs.length; bxs.forEach((b, i) => { M.hide(b.u, !(k > i)); M.hide(b.d, !(k > n + i)); }); };
const unpaired = (k, n) => k <= n ? k : 2 * n - k;

/* ---------- elements and configurations ---------- */
const EL = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];
const ELN = ['HYDROGEN', 'HELIUM', 'LITHIUM', 'BERYLLIUM', 'BORON', 'CARBON', 'NITROGEN', 'OXYGEN', 'FLUORINE', 'NEON', 'SODIUM', 'MAGNESIUM', 'ALUMINIUM', 'SILICON', 'PHOSPHORUS', 'SULPHUR', 'CHLORINE', 'ARGON', 'POTASSIUM', 'CALCIUM', 'SCANDIUM', 'TITANIUM', 'VANADIUM', 'CHROMIUM', 'MANGANESE', 'IRON', 'COBALT', 'NICKEL', 'COPPER', 'ZINC'];
const ORD = ['1s', '2s', '2p', '3s', '3p', '4s', '3d'], CAP = { s: 2, p: 6, d: 10 };
const aufbau = Z => { const c = {}; let z = Z; ORD.forEach(s => { const k = Math.min(z, CAP[s[1]]); c[s] = k; z -= k; }); return c; };
// pure filling order (no exceptions); the bench shows the exception shift live
const cfgTex = (c, core) => { if (core) { const p = []; if (c['3d']) p.push(TERM('3d', c['3d'])); if (c['4s']) p.push(TERM('4s', c['4s'])); return `${AR}\\,` + p.join('\\,'); }
  return ['1s', '2s', '2p', '3s', '3p', '3d', '4s'].filter(s => c[s]).map(s => TERM(s, c[s])).join('\\,'); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS7 = T0('S7'), tC1 = T0('C1'), tC5 = T0('C5'), tB2 = T0('B2');
const tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['zap', 'Copper wire', 'CARRIES CURRENT', 'Copper', 'Cu · 29'], ['droplet', 'Chrome tap', 'A SHINY COATING', 'Chromium', 'Cr · 24'], ['flame', 'Iron pan', 'FOR COOKING', 'Iron', 'Fe · 26']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="adr" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['flame', 'Copper pot', 'copper'], ['droplet', 'Shiny tap', 'shiny'], ['flame', 'Iron pan', 'iron']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: sodium ---------- */
const NA = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 1]];
$('#naS').innerHTML = NA.map(([s, k], i) => `<span id="na${i}" style="display:inline-block;margin:0 10px">${K(TERM(s, k))}</span>`).join('');
const LG = [[`<b style="color:${NC}">3</b>`, 'shell, n'], [`<b style="color:${LC}">s</b>`, 'subshell, l'], [`<b style="color:${EC}">1</b>`, 'electrons in it']];
$('#lgs').innerHTML = LG.map(([a, b], i) => `<div class="lg" id="lg${i}" style="top:${330 + i * 0}px">${a}<span>${b}</span></div>`).join('');
const tNa = [wx('P3', 'One'), wx('P3', 'two', 1), wx('P3', 'two', 3), wx('P3', 'three')];
const pS = $('#pS'), pB = {}; { let x = 74; [['1s', 1], ['2s', 1], ['2p', 3], ['3s', 1]].forEach(([s, nb]) => { const x0 = x; pB[s] = []; for (let k = 0; k < nb; k++) { pB[s].push(BOX(pS, x, 200, 76, 3)); x += 84; } txt(pS, (x0 + x - 8) / 2, 316, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: LC }); x += 24; }); }
const pTag = document.createElement('div'); pTag.className = 'pillp ac'; pTag.style.cssText = 'left:36px;top:494px'; pTag.textContent = 'Box = orbital · arrow = electron'; $('#pd').appendChild(pTag);
const pRd = txt(pS, 392, 400, '11 ELECTRONS · 1 UNPAIRED', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });

/* ---------- S: the bench ---------- */
const b = $('#bS');
const RY = { '1s': 478, '2s': 416, '2p': 354, '3s': 292, '3p': 230, '4s': 168, '3d': 106 };
const SB = {}; ORD.forEach(s => { SB[s] = []; const nb = CAP[s[1]] / 2; txt(b, 104, RY[s] + 34, s, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: LC }); for (let k = 0; k < nb; k++) SB[s].push(BOX(b, 120 + k * 54, RY[s], 48, 2.2)); });
const ax = mk(b, 'g', {}); mk(ax, 'path', { d: 'M440 530 V110 M430 124 L440 108 L450 124', stroke: C.ink, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); txt(ax, 456, 120, 'ENERGY', { 'font-size': 16, 'font-weight': 600 });
const arCore = mk(b, 'g', {}); mk(arCore, 'rect', { x: 40, y: 220, width: 360, height: 316, rx: 16, fill: C.ink, opacity: 0.9 }); txt(arCore, 220, 380, '[Ar]', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 64, fill: '#fff' }); txt(arCore, 220, 420, 'FIRST 18 ELECTRONS', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 });
// element tile
const tile = mk(b, 'g', {}); mk(tile, 'rect', { x: 520, y: 150, width: 220, height: 220, rx: 22, fill: NC });
const tZ = txt(tile, 540, 192, '1', { 'font-size': 26, fill: '#fff', 'font-weight': 600 }), tSym = txt(tile, 630, 300, 'H', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 100, fill: '#fff' });
const tNm = txt(b, 630, 410, 'HYDROGEN', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const hop = mk(b, 'circle', { r: 9, fill: EC });
const xTag = document.createElement('div'); xTag.className = 'btag'; xTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(xTag);
// periodic strip
const ROWS = [[0, 2], [2, 10], [10, 18], [18, 30]];
$('#pts').innerHTML = ROWS.map(([a, z], r) => `<div class="pt" style="left:36px;top:${64 + r * 50}px">${EL.slice(a, z).map((e, k) => `<span id="pe${a + k}">${e}</span>`).join('')}</div>`).join('');
// Z timeline
const zKeys = [[tS1, 1], [wx('S2', 'Hydrogen'), 1], [wx('S2', 'Helium'), 2], [wx('S2', 'Lithium'), 3]];
const zRamp = (a, b2, z0, z1, k) => { for (let z = z0; z <= z1; z++) k.push([a + (b2 - a) * (z - z0) / Math.max(1, z1 - z0), z]); };
zRamp(wx('S3', 'boron') - 0.4, wx('S3', 'neon'), 4, 10, zKeys); zRamp(wx('S4', 'Sodium'), wx('S4', 'argon'), 11, 18, zKeys);
zKeys.push([wx('S5', 'potassium'), 19], [wx('S5', 'calcium'), 20], [wx('S6', 'scandium'), 21], [wx('C1', 'chromium') - 0.3, 24], [wx('C3', 'Copper') - 0.2, 29]);
const zAt = t => { let z = 0; zKeys.forEach(([a, v]) => { if (t >= a) z = v; }); return z; };
const tHopCr = wx('C2', 'moves') - 0.1, tHopCu = wx('C3', 'but') - 0.1, HOP = 0.8;
const tCore = wx('S7', 'brackets');
const tFill = [wx('S2', 'one', 1), wx('S2', 'two'), wx('S3', 'two'), wx('S4', 'three'), wx('S4', 'three', 1), wx('S5', 'four'), wx('S6', 'three')];

/* ---------- R: why extra stable ---------- */
const RR = [['Symmetry', 'Evenly spread electrons shield each other less'], ['Exchange energy', 'Same-spin electrons swap places; each swap releases energy']];
$('#rrs').innerHTML = RR.map(([n, s], i) => `<div class="rr" id="rr${i}" style="top:${84 + i * 152}px"><div class="nn">${i + 1}</div><div class="rn">${n}</div><div class="rs">${s}</div></div>`).join('');
const rS = $('#rS'); const rB = [0, 1, 2, 3, 4].map(k => BOX(rS, 122 + k * 112, 250, 96, 3));
txt(rS, 100, 312, '3d', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: LC });
const rNuc = mk(rS, 'g', {}); [0, 1, 2, 3, 4].forEach(k => mk(rNuc, 'line', { x1: 392, y1: 440, x2: rB[k].cx, y2: 350, stroke: NC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' })); mk(rNuc, 'circle', { cx: 392, cy: 446, r: 16, fill: C.ink }); txt(rNuc, 392, 453, '+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#fff' });
const swA = mk(rS, 'path', { d: `M${rB[0].cx - 10} 240 Q ${(rB[0].cx + rB[1].cx) / 2} 150 ${rB[1].cx - 10} 240`, stroke: EC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 7' });
const swU = [ARW(rS, true, 1.3), ARW(rS, true, 1.3)];
const rTag = document.createElement('div'); rTag.className = 'pillp ac'; rTag.style.cssText = 'left:36px;top:494px'; $('#rd').appendChild(rTag);
const mobT = (d, s) => `<span style="display:inline-flex;align-items:center;gap:10px">${K(`${AR}\\,${TERM('3d', d)}\\,${TERM('4s', s)}`)}</span>`;
const th1 = PUC.think($('#th1'), { q: 'Which is the real ground state of copper?', opts: [mobT(9, 2), mobT(10, 1)], right: 1, why: 'A completely filled 3d is extra stable, so one 4s electron moves into 3d.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${TERM('3d', 5)} \\qquad ${TERM('3d', 10)}`);

/* ---------- D: exchanges ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`\\text{1st electron: } 4 \\text{ swaps}`)],
  [K(`\\text{2nd electron: } 3 \\text{ more}`)],
  [K(`\\text{then } 2, \\text{ then } 1`)],
  [K(`${TERM('3d', 5)}:\\; 4+3+2+1 = 10 \\;>\\; ${TERM('3d', 4)}:\\; 6`)]], { label: 'COUNTING EXCHANGES · STEP BY STEP', y0: 110, dy: 112 });
const tDs = [wx('D2', 'Step'), wx('D3', 'Step'), wx('D4', 'Step'), wx('D5', 'Step')];
const dS = $('#dS');
const exRow = (y, n) => { const bx = [0, 1, 2, 3, 4].map(k => BOX(dS, 120 + k * 92, y, 80, 2.5)); bx.forEach((q, k) => M.hide(q.u, !(k < n))); const arcs = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const x1 = bx[i].cx, x2 = bx[j].cx, h = 26 + (j - i) * 24; arcs.push({ i, el: mk(dS, 'path', { d: `M${x1} ${y - 6} Q ${(x1 + x2) / 2} ${y - 6 - h * 2} ${x2} ${y - 6}`, stroke: EC, 'stroke-width': 2.5, fill: 'none', opacity: 0.85 }) }); }
  return { bx, arcs }; };
const ex5 = exRow(220, 5), ex4 = exRow(440, 4);
const exL = [txt(dS, 36, 300, '3d⁵', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: LC }), txt(dS, 36, 520, '3d⁴', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: LC })];
const exC = [txt(dS, 748, 140, '', { 'text-anchor': 'end', 'font-size': 26, fill: EC, 'font-weight': 600 }), txt(dS, 748, 360, '', { 'text-anchor': 'end', 'font-size': 26, fill: EC, 'font-weight': 600 })];
const ex4g = mk(dS, 'g', {}); ex4.bx.forEach(q => [q.r, q.u, q.d].forEach(e => ex4g.appendChild(e))); ex4.arcs.forEach(a => ex4g.appendChild(a.el)); ex4g.appendChild(exL[1]); ex4g.appendChild(exC[1]);

/* ---------- W: iron ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`26 - 18 = 8 \\text{ after } ${AR}`)],
  [K(`${TERM('4s', 2)},\\; ${TERM('3d', 6)}`)],
  [K(`3d: \\text{ five up, the sixth pairs}`)],
  [K(`${AR}\\,${TERM('3d', 6)}\\,${TERM('4s', 2)} \\to ${cE(4)} \\text{ unpaired}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wx('W3', 'leaves'), wx('W4', 'Iron'), T0('W5'), T0('W6')];
const wS = $('#wS');
const wAr = mk(wS, 'g', {}); mk(wAr, 'rect', { x: 36, y: 136, width: 116, height: 84, rx: 14, fill: C.ink }); txt(wAr, 94, 190, '[Ar]', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: '#fff' });
const w3d = [0, 1, 2, 3, 4].map(k => BOX(wS, 176 + k * 88, 140, 76, 3)), w4s = BOX(wS, 652, 140, 76, 3);
txt(wS, 176 + 2 * 88 + 38, 256, '3d', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: LC }); txt(wS, 690, 256, '4s', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: LC });
const wRd = txt(wS, 392, 300, '', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
const avD = PUC.avatar($('#wr'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Four lone electrons in my iron pan!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Chromium: ${K(`${AR}\\,${TERM('3d', 4)}\\,${TERM('4s', 2)}`)}`, right: `Chromium: ${K(`${AR}\\,${TERM('3d', 5)}\\,${TERM('4s', 1)}`)} (half filled 3d)` });
const tsv = $('#tS');
const trRow = (x0, d, s) => { const g = mk(tsv, 'g', {}), bx = [0, 1, 2, 3, 4].map(k => BOX(g, x0 + k * 44, 96, 40, 2)), b4 = BOX(g, x0 + 5 * 44 + 14, 96, 40, 2); fillSub(bx, d); fillSub([b4], s); return g; };
const tW = trRow(20, 4, 2), tRr = trRow(330, 5, 1);
txt(tW, 140, 178, '3d⁴ 4s²', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 }); txt(tRr, 450, 178, '3d⁵ 4s¹', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const xW = mk(tsv, 'path', { d: 'M20 80 L290 160 M290 80 L20 160', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Configurations of Cr and Cu, and counting electrons by l or unpaired electrons' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `In a ground-state copper atom (Z = 29), how many electrons have ${K(`${l_} = 0`)}?`, qW: 780,
  opts: ['6', '7', '8', '9'], right: 1, optW: 474, optY: 300, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${l_} = 0 \\to s \\text{ electrons}`)], [K(`\\mathrm{Cu}: ${AR}\\,${TERM('3d', 10)}\\,${TERM('4s', 1)}`)], [K(`1s^2\\, 2s^2\\, 3s^2\\, 4s^1`)], [K(`2+2+2+1 = \\textcolor{${C.ok}}{7}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wx('A2', 'Copper'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · electronic configurations', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`\\mathrm{Cr}: ${AR}\\,${TERM('3d', 5)}\\,${TERM('4s', 1)} \\qquad \\mathrm{Cu}: ${AR}\\,${TERM('3d', 10)}\\,${TERM('4s', 1)}`), K(`\\mathrm{Fe}: ${AR}\\,${TERM('3d', 6)}\\,${TERM('4s', 2)} \\;\\to\\; 4 \\text{ unpaired}`),
    '<b>Order</b>: 1s 2s 2p 3s 3p 4s 3d · [Ar] stands for the first 18 electrons', '<b>Extra stable</b>: half filled (d⁵) and completely filled (d¹⁰) subshells', '<b>Why</b>: symmetry, and exchange energy · d⁵ allows 10 exchanges, d⁴ only 6'] });
const YQ = ['Write the configuration of chromium.', 'Why is 3d¹⁰ more stable than 3d⁹?', 'How many unpaired electrons does iron have?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 26', topic: 'Lining up elements before electrons? Development of Periodic Classification', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tHopCr - 0.4, 1.12, 560, 440], [T1('C2') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; LG.forEach((_, i) => { const e = $('#lg' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1210) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1210 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rr .rs').forEach(q => { if (q.offsetWidth > 610) q.style.fontSize = Math.floor(23 * 610 / q.offsetWidth) + 'px'; });
  const nt = document.querySelector('.next .nt'); if (nt && nt.offsetWidth > 1300) nt.style.fontSize = Math.floor(parseFloat(getComputedStyle(nt).fontSize) * 1300 / nt.offsetWidth) + 'px';
}
const fitCfg = () => { const el = $('#cfg'); el.style.fontSize = '52px'; if (el.offsetWidth > 712) el.style.fontSize = Math.floor(52 * 712 / el.offsetWidth) + 'px'; };

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
    const tBr = wt('H2', 'break');
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const a = $('#ja' + i); M.vis(a, t, wt('H2', 'periodic') - 0.1 + i * 0.15, 1e9, POP); setBg(a, i < 2 ? mix(C.ink, C.red, M.io((t - tBr) / 0.3)) : C.ink); });
    M.vis($('#hjP'), t, tBr - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'electrons') + 0.1) / 0.3))); });
    M.vis($('#hTz'), t, wt('H4', 'different') - 0.15, 1e9, POP);
  }

  /* P: sodium */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#po'), t, tP1 + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tP4 + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#po'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#poIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    NA.forEach((_, i) => PUC.write($('#na' + i), t, tNa[i] - 0.1, 0.5));
    { const sz = t >= tP4 ? 66 : 84; snap($('#naS'), 'fontSize', sz + 'px'); }
    const tLg = [wx('P3', 'small'), wx('P3', 'subshell'), wx('P3', 'how')];
    LG.forEach((_, i) => M.vis($('#lg' + i), t, tLg[i] - 0.1, 1e9, POP));
    M.vis($('#pd'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    const tPf = wx('P4', 'arrow'); let k = 0; [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 1]].forEach(([s, n]) => { for (let e = 0; e < n; e++) k++; });
    const nOn = Math.max(0, Math.min(11, Math.floor((t - (wx('P4', 'Each') - 0.2)) / 0.14) + 1));
    let left = nOn; [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 1]].forEach(([s, n]) => { const kk = Math.min(left, n); fillSub(pB[s], kk); left -= kk; });
    fade(pRd, t, tPf + 0.3, 1e9, 0.25); M.vis(pTag, t, wx('P4', 'box') - 0.1, 1e9, POP);
  }

  /* S + C: the bench */
  const sOn = t >= tS1 - 0.1 && t < tC5 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('C5');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#cf'), t, tS1 + 0.25, z, { dx: 60, dy: 0, ...o });
    M.vis($('#pt'), t, tS1 + 0.4, z, { dy: 36, ...o });
    const Z = zAt(t), c = aufbau(Z);
    // exception shifts: Cr and Cu, one 4s electron hops into 3d
    let hopU = -1, hopT = 0;
    if (Z === 24 || Z === 29) { const th = Z === 24 ? tHopCr : tHopCu; hopU = M.clamp((t - th) / HOP); hopT = th; if (hopU >= 1) { c['4s'] = 1; c['3d'] += 1; } else if (hopU > 0) { c['4s'] = 1; } }
    ORD.forEach(s => fillSub(SB[s], c[s] || 0));
    if (hopU > 0 && hopU < 1) { const a = SB['4s'][0], d3 = SB['3d'][Z === 24 ? 4 : 4], tx = Z === 24 ? d3.x + d3.s * 0.32 : d3.x + d3.s * 0.68, e = M.io(hopU);
      attr(hop, 'cx', M.lerp(a.x + a.s * 0.68, tx, e).toFixed(1)); attr(hop, 'cy', (M.lerp(a.cy, d3.cy, e) - Math.sin(e * Math.PI) * 50).toFixed(1)); M.hide(hop, false); } else M.hide(hop, true);
    ORD.forEach(s => SB[s].forEach(bx => attr(bx.r, 'stroke', (s === '3d' && hopU >= 1) ? EC : C.ink2)));
    // [Ar] core
    fade(arCore, t, tCore - 0.1, 1e9, 0.4, 1);
    // tile
    fade(tile, t, tS1 + 0.3); M.setT(tZ, Z ? String(Z) : ''); M.setT(tSym, Z ? EL[Z - 1] : ''); M.setT(tNm, Z ? ELN[Z - 1] : ''); fade(tNm, t, tS1 + 0.3);
    // configuration card
    const core = t >= tCore && Z > 18, pred = (Z === 24 || Z === 29) && hopU < 1;
    const cPred = aufbau(Z), cShow = pred ? cPred : c;
    setH($('#cfg'), Z ? K(cfgTex(cShow, core)) : ''); if ($('#cfg')._fz !== $('#cfg')._h) { $('#cfg')._fz = $('#cfg')._h; fitCfg(); }
    M.setT($('#elS'), Z ? EL[Z - 1] : ''); M.setT($('#elN'), Z ? `${ELN[Z - 1]} · Z = ${Z}` : '');
    M.setT($('#cfL'), pred && t >= wx('C1', 'predict') - 0.1 ? 'CONFIGURATION · PREDICTED BY THE RULES' : (Z === 24 || Z === 29) && hopU >= 1 ? 'CONFIGURATION · ACTUAL' : 'CONFIGURATION');
    $('#cfg').style.color = ''; $('#cfg').style.opacity = pred && t >= wx('C1', 'predict') ? '0.55' : '1';
    let un = 0; ORD.forEach(s => { un += unpaired(c[s] || 0, CAP[s[1]] / 2); }); M.setT($('#unp'), Z ? `UNPAIRED ${un}` : '');
    // periodic strip
    EL.forEach((e, i) => { const el = $('#pe' + i), cur = i === Z - 1, past = i < Z - 1; setBg(el, cur ? NC : past ? C.ac3 : '#FFFFFF'); el.style.color = cur ? '#fff' : past ? '#0B7676' : C.dim; el.style.borderColor = cur ? NC : past ? C.ac2 : C.line; });
    // tag
    const TAG = [[tS1 + 0.3, 'ONE ELECTRON AT A TIME'], [wx('S3', 'neon'), 'NEON · SHELL 2 FULL'], [wx('S5', 'four'), '4s BEFORE 3d'], [wx('S6', 'scandium'), '3d STARTS'], [tCore, '[Ar] = 18 ELECTRONS'], [wx('C1', 'predict'), 'PREDICTED 3d⁴ 4s²'], [tHopCr + HOP, 'ACTUAL 3d⁵ 4s¹ · HALF FILLED'], [wx('C3', 'Copper'), 'PREDICTED 3d⁹ 4s²'], [tHopCu + HOP, 'ACTUAL 3d¹⁰ 4s¹ · FULL'], [wx('C4', 'close'), '4s AND 3d · VERY CLOSE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(xTag, tg); M.vis(xTag, t, tS1 + 0.3, 1e9, POP);
  }

  /* R + B: why extra stable, think */
  const rOn = t >= tC5 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('B2');
    M.vis($('#rl'), t, tC5 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#rd'), t, tC5 + 0.25, z, { dx: 60, dy: 0, ...o });
    const tR = [T0('C6'), T0('C7')];
    RR.forEach((_, i) => { M.vis($('#rr' + i), t, tR[i] - 0.15, 1e9, { dy: 16 }); setBg($('#rr' + i), mix(C.soft, C.ac2, M.io((t - tR[i]) / 0.3) * (i === 0 ? 1 - M.io((t - tR[1]) / 0.3) : 1))); });
    // swap animation: electrons 1 and 2 trade places along the arc, twice
    const tSw = wx('C7', 'swap'), su = M.clamp((t - tSw) / 1.2);
    rB.forEach((q, k) => M.hide(q.u, (k < 2 && su > 0 && su < 1) || t < tC5 + 0.4 + k * 0.12));
    swU.forEach((a, k) => { const x0 = rB[k].x + rB[k].s * 0.32, x1 = rB[1 - k].x + rB[1 - k].s * 0.32, e = M.io(su), x = M.lerp(x0, x1, e), y = rB[0].cy - Math.sin(e * Math.PI) * (k ? -50 : 90); attr(a, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(1)`); M.hide(a, !(su > 0 && su < 1)); });
    M.drawU(swA, M.io((t - tSw + 0.3) / 0.4)); M.hide(swA, t < tSw - 0.3);
    fade(rNuc, t, wx('C6', 'holds') - 0.2, 1e9, 0.3);
    const RT = [[tC5, '3d⁵: half filled'], [T0('C6'), 'Even spread · held more strongly'], [wx('C7', 'swap'), 'Each swap releases energy'], [wx('C7', 'most'), 'Half filled and full: the most swaps']];
    let rt = RT[0][1]; RT.forEach(([a, s]) => { if (t >= a) rt = s; }); M.setT(rTag, rt); M.vis(rTag, t, tC5 + 0.6, 1e9, POP);
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Which') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wx('B3', 'A') });
  }

  /* D: exchanges */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const tGrp = [tDs[0] + 0.5, tDs[1] + 0.5, wx('D4', 'two'), wx('D4', 'one')];
    let n5 = 0; ex5.arcs.forEach((a, k) => { const ti = tGrp[a.i] + (k % 4) * 0.12, u = M.io((t - ti) / 0.4); M.drawU(a.el, u); M.hide(a.el, u <= 0); if (u >= 1) n5++; });
    M.setT(exC[0], `EXCHANGES ${n5}`);
    fade(ex4g, t, wx('D5', 'only') - 0.6, 1e9, 0.3);
    let n4 = 0; ex4.arcs.forEach((a, k) => { const u = M.io((t - wx('D5', 'only') + 0.4 - k * 0.1) / 0.3); M.drawU(a.el, u); M.hide(a.el, u <= 0); if (u >= 1) n4++; });
    M.setT(exC[1], `EXCHANGES ${n4}`);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Half') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'extra') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'stable') + 0.2, 0.8);
  }

  /* W: iron */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    fade(wAr, t, wx('W3', 'Argon') - 0.1, 1e9, 0.3);
    const t4s = wx('W4', 'Four'), t3d = wx('W5', 'first'), t6 = wx('W5', 'sixth');
    fillSub([w4s], t >= t4s + 0.15 ? 2 : t >= t4s ? 1 : 0);
    const n3 = t >= t6 ? 6 : Math.max(0, Math.min(5, Math.floor((t - t3d) / 0.3) + 1)); fillSub(w3d, n3);
    w3d.forEach(q => fade(q.r, t, wx('W4', 'six') - 0.3, 1e9, 0.2)); [w4s.r].forEach(r => fade(r, t, t4s - 0.3, 1e9, 0.2));
    const e = (t >= t4s ? (t >= t4s + 0.15 ? 2 : 1) : 0) + n3;
    M.setT(wRd, `18 + ${e} ELECTRONS · UNPAIRED ${unpaired(n3, 5)}`); fade(wRd, t, t4s, 1e9, 0.2); attr(wRd, 'fill', n3 >= 6 ? EC : C.ink);
    setH($('#wCf'), K(`${AR}\\,${TERM('3d', 6)}\\,${TERM('4s', 2)}`)); PUC.write($('#wCf'), t, wx('W4', 'Iron') - 0.1, 0.7);
    avD(t, wx('W6', 'electrons') + 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wx('X2', 'Many') - 0.1, tStrike: wx('X3', 'But') - 0.1, tRight: wx('X3', 'A') - 0.1 });
    fade(tW, t, wx('X2', 'chromium') - 0.1); M.draw(xW, t, wx('X3', 'But') - 0.1, 0.5); fade(tRr, t, wx('X3', 'A') - 0.05);
    where(t, { tin: T0('E1'), tLight: [wx('E1', 'JEE'), wx('E1', 'NEET')], tType: wx('E1', 'usually') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wx('Q1', 'how'), tCount, tAns });
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
