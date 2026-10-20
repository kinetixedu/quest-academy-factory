// PUC Chemistry Ep 04: Physical and chemical properties (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, counter, recap): O teal (element in play), H ink, C slate, electrons orange, mass gold, volume teal
const OC = C.ac, HC = C.ink, CC = '#5A6478', EC = '#C8461B', GC = '#B7791F', VC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const bounce = (v, a, b) => { const L = b - a, u = (((v - a) % (2 * L)) + 2 * L) % (2 * L); return a + (u < L ? u : 2 * L - u); };
// LaTeX helpers with colour-coding
const O_ = s => `\\textcolor{${OC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, C_ = s => `\\textcolor{${CC}}{\\mathrm{${s}}}`;
const H2O = `${H_('H')}_2${O_('O')}`, O2 = `${O_('O')}_2`, CH4 = `${C_('C')}${H_('H')}_4`, CO2 = `${C_('C')}${O_('O')}_2`;
const EQ = `${CH4} + 2${O2} \\rightarrow ${CO2} + 2${H2O}`;
const G = s => `\\textcolor{${GC}}{${s}}`, V = s => `\\textcolor{${VC}}{${s}}`;

Object.assign(M.IC, {
  snow: ['m10 20-1.25-2.5L6 18', 'M10 4 8.75 6.5 6 6', 'm14 20 1.25-2.5L18 18', 'm14 4 1.25 2.5L18 6', 'm17 21-3-6h-4', 'm17 3-3 6 1.5 3', 'M2 12h6.5L10 9', 'm20 10-1.5 2 1.5 2', 'M22 12h-6.5L14 15', 'm4 10 1.5 2L4 14', 'm7 21 3-6-1.5-3', 'm7 3 3 6h4'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['snow', 'Ice', 'MELTS IN A GLASS', 'Ice'], ['flame', 'Matchstick', 'BURNS TO BLACK', 'matchstick'], ['milk', 'Milk', 'TURNS SOUR', 'Milk']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="qm" id="qm${i}">SAME OR NEW? <b>?</b></div></div>`).join('');
const KIT = [['Boiling: still water?', 'boiling'], ['Burning: where does gas go?', 'gas']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('help', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H4', k[1]));

/* ---------- P: two kinds + water property card ---------- */
$('#mdefI').innerHTML = M.icon('search', 28, '#fff', 2.2);
const DS = [['h', 'PHYSICAL · AT 1 ATM', C.ac, wt('P3', 'physical')], ['Colour', 'none', 0, wt('P4', 'Colour')], ['Odour (smell)', 'none', 0, wt('P4', 'odour')], ['Melting point', '0 °C', 0, wt('P4', 'melting')], ['Boiling point', '100 °C', 0, wt('P4', 'boiling')], ['Density', '1.0 g/cm³', 0, wt('P4', 'density')],
  ['h', 'CHEMICAL', C.red, wt('P5', 'chemical')], ['Acid or base?', 'neither, neutral', 0, wt('P6', 'acid')], ['Does it burn?', 'no, puts out fire', 0, wt('P6', 'burns')]];
{ let y = 84; $('#dsh').innerHTML = DS.map(([n, v, c], i) => { let s; if (n === 'h') { s = `<div class="dh" id="ds${i}" style="top:${y + (i ? 16 : 0)}px;color:${c}">${v}</div>`; y += i ? 52 : 36; } else { s = `<div class="dr" id="ds${i}" style="top:${y}px"><div class="dn">${n}</div><div class="dv">${v}</div></div>`; y += 50; } return s; }).join(''); }

/* ---------- U: the one test ---------- */
const FB = [['Observe a property', 'COLOUR, MELTING, BURNING...', 60, 220, 380, 140, C.soft, wt('U1', 'observe')], ['Same substance after?', 'CHECK THE PARTICLES', 540, 220, 420, 140, C.soft, wt('U1', 'same')],
  ['Physical', 'MELTING ICE · BOILING WATER', 1080, 100, 460, 150, C.ac2, wt('U2', 'yes')], ['Chemical', 'BURNING GAS · SOURING MILK', 1080, 330, 460, 150, C.redBg, wt('U2', 'new')]];
$('#fbs').innerHTML = FB.map(([t1, t2, x, y, w, h, bg], i) => `<div class="fb" id="fb${i}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bg}"><div class="ft" style="top:${h / 2 - 42}px;${i === 2 ? 'color:#0B7D7D' : i === 3 ? 'color:var(--red)' : ''}">${t1}</div><div class="fx2" style="top:${h / 2 + 10}px">${t2}</div></div>`).join('');
const fs = $('#ftS');
const fArr = [mk(fs, 'path', { d: 'M440 290 H530', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), mk(fs, 'path', { d: 'M960 260 C1010 260 1020 175 1070 175', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), mk(fs, 'path', { d: 'M960 320 C1010 320 1020 405 1070 405', stroke: C.red, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' })];
const fLab = [txt(fs, 1000, 196, 'YES', { 'font-size': 18, fill: C.ac, 'font-weight': 600, 'text-anchor': 'middle' }), txt(fs, 960, 412, 'NO: NEW ONE', { 'font-size': 18, fill: C.red, 'font-weight': 600, 'text-anchor': 'middle' })];

/* ---------- S: the bench ---------- */
const b = $('#bS');
const bW = mk(b, 'g', {});
const lbl = (g, x, y, s, fs) => txt(g, x, y + fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' });
const molW = p => { const g = mk(p, 'g', {}); [[-21, 16], [21, 16]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 12, fill: HC }); lbl(g, x, y, 'H', 11); }); mk(g, 'circle', { r: 20, fill: OC }); lbl(g, 0, 0, 'O', 18); return g; };
// beaker + flame
const bk = mk(bW, 'g', {}); mk(bk, 'path', { d: 'M200 176 V396 Q200 404 208 404 H576 Q584 404 584 396 V176', fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const wtr = mk(bk, 'rect', { x: 203, y: 262, width: 378, height: 139, fill: C.ac2 });
const flm = mk(bW, 'g', {}); flm.insertAdjacentHTML('beforeend', `<g transform="translate(372 408)">${M.icon('flame', 40, C.red, 2.4)}</g>`);
const LIQ = [[240, 290, 40], [320, 300, -35], [400, 288, 45], [480, 298, -40], [540, 292, 30], [260, 350, -45], [350, 360, 38], [440, 352, -32], [520, 362, 42]];
const GAS = [[120, 110, 60, 30], [300, 130, -55, -35], [470, 104, 50, 40], [650, 126, -60, 30], [210, 150, 45, -40], [570, 150, -50, -30]];
const wm = LIQ.map(([x, y, v], i) => ({ g: molW(bW), x, y, v, rot: i * 37, w: i % 2 ? 20 : -20, gas: GAS[i] }));
// methane + oxygen -> CO2 + 2 H2O
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
atom('C', 32, CC, 'C', 28); ['Oa', 'Ob', 'Oc', 'Od'].forEach(k => atom(k, 32, OC, 'O', 28)); ['Ht', 'Hb', 'Hl', 'Hr'].forEach(k => atom(k, 22, HC, 'H', 20));
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { ct: bond('C', 'Ht', 1), cb: bond('C', 'Hb', 1), cl: bond('C', 'Hl', 1), cr: bond('C', 'Hr', 1), o1: bond('Oa', 'Ob', 2), o2: bond('Oc', 'Od', 2),
  n1: bond('C', 'Od', 2), n2: bond('C', 'Oa', 2), w1: bond('Oc', 'Hl', 1), w2: bond('Oc', 'Hb', 1), w3: bond('Ob', 'Ht', 1), w4: bond('Ob', 'Hr', 1) };
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const tHeat = wt('S3', 'Heat'), tEsc = wt('S3', 'escape'), tLook = wt('S4', 'look'), tS5 = T0('S5'), tS6 = T0('S6'), tMeth = wt('S6', 'methane'), tOx = wt('S7', 'oxygen');
const tBrk = wt('S7', 'break'), tMov = wt('S7', 'move'), tPair = wt('S7', 'electrons'), tNew = wt('S7', 'new'), tOut8 = wt('S8', 'Out');
const KP = {
  C: [[0, 190, 250], [tBrk, 190, 250], [tMov, 392, 160]],
  Ht: [[0, 190, 170], [tBrk, 190, 160], [tMov + 0.2, 475, 391]], Hb: [[0, 190, 330], [tBrk, 190, 340], [tMov + 0.1, 309, 391]], Hl: [[0, 110, 250], [tBrk, 100, 250], [tMov, 151, 391]], Hr: [[0, 270, 250], [tBrk, 280, 250], [tMov + 0.3, 633, 391]],
  Oa: [[0, 500, 170], [tBrk, 490, 166], [tMov + 0.1, 502, 160]], Ob: [[0, 584, 170], [tBrk, 594, 166], [tMov + 0.2, 554, 330]],
  Oc: [[0, 500, 330], [tBrk, 490, 334], [tMov, 230, 330]], Od: [[0, 584, 330], [tBrk, 594, 334], [tMov + 0.1, 282, 160]],
};
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avA = PUC.avatar($('#bnIn'), { x: 36, y: 474, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same atoms, brand new partners!' });
// boiling readout
const RR = [['Temperature', 'WATER BOILS AT 100 °C AT 1 ATM', '25 °C'], ['Substance', 'BEFORE → AFTER', 'H₂O → H₂O'], ['Bonds broken inside', 'O-H BONDS IN EACH MOLECULE', '0']];
$('#rrs').innerHTML = RR.map(([n, s, v], i) => `<div class="rr" id="rr${i}" style="top:${84 + i * 112}px"><div class="rn">${n}</div><div class="rs">${s}</div><div class="rv" id="rv${i}">${v}</div></div>`).join('');
const tRr = [tS1 + 0.8, tEsc, wt('S4', 'No')];
// reaction + counter
$('#eq').innerHTML = K(EQ);
$('#crs').innerHTML = [['C', 'carbon', CC], ['H', 'hydrogen', HC], ['O', 'oxygen', OC]].map(([e, n, c], i) => `<div class="cr" id="cr${i}" style="top:${74 + i * 64}px"><div class="ce" style="color:${c}">${e}</div><div class="cn">${n}</div><div class="cv" id="cv${i}"></div><div class="cm" id="cm${i}"></div></div>`).join('');
const CNT = [1, 4, 4];
const th1 = PUC.think($('#th1'), { q: 'Ice melting into water: a physical change, or a chemical one?', opts: ['Physical', 'Chemical'], right: 0, why: 'Ice and water are both H₂O. Only the spacing of the molecules changed.' });

/* ---------- D: density ---------- */
const dsol = PUC.solution($('#dl'), [['Mass packed into each unit of volume'],
  [K(`\\text{density} = \\dfrac{${G('\\text{mass}')}}{${V('\\text{volume}')}}`)],
  [K(`\\dfrac{${G('\\text{g}')}}{${V('\\text{cm}^3')}} = \\text{g cm}^{-3}`), 'chemists use this'],
  [K(`\\text{SI: } \\dfrac{${G('\\text{kg}')}}{${V('\\text{m}^3')}} = \\text{kg m}^{-3}`)]], { label: 'DENSITY · STEP BY STEP', y0: 104, dy: 116 });
const tDs = [wt('D2', 'Density'), wt('D3', 'density'), wt('D4', 'Mass'), wt('D5', 'unit')];
const ds = $('#dS'), PVX = 392, PVY = 150, BL = 210;
mk(ds, 'path', { d: `M${PVX} ${PVY} L${PVX - 46} 430 H${PVX + 46} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(ds, 'rect', { x: PVX - 130, y: 426, width: 260, height: 14, rx: 7, fill: C.ink });
const beam = mk(ds, 'g', {}); mk(beam, 'rect', { x: -BL, y: -7, width: BL * 2, height: 14, rx: 7, fill: C.ink });
const pans = [0, 1].map(() => { const g = mk(ds, 'g', {}); mk(g, 'line', { x1: -80, y1: 150, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 80, y1: 150, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-100 150 H100 C100 174 64 184 0 184 C-64 184 -100 174 -100 150Z', fill: '#E9E5DA', stroke: C.ink, 'stroke-width': 2.5 }); return g; });
const cube = (p, n, lab, col) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -60, y: 28, width: 120, height: 120, rx: 8, fill: '#fff', stroke: col, 'stroke-width': 3 }); const dots = []; for (let i = 0; i < n; i++) dots.push(mk(g, 'circle', { cx: -44 + (i % 6) * 17.6, cy: 46 + Math.floor(i / 6) * 21, r: 6, fill: col })); txt(g, 0, 18, lab, { 'text-anchor': 'middle', 'font-size': 16, fill: col, 'font-weight': 600 }); return { g, dots }; };
const cW = cube(pans[0], 10, 'WATER', OC), cA = cube(pans[1], 27, 'ALUMINIUM', C.ink2);
const dR = [txt(ds, PVX - BL, 500, '1.0 g / 1 cm³', { 'text-anchor': 'middle', 'font-size': 22, fill: OC, 'font-weight': 600 }), txt(ds, PVX + BL, 500, '2.7 g / 1 cm³', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 })];
const dNote = txt(ds, 748, 548, 'EACH DOT = 0.1 g', { 'text-anchor': 'end', 'font-size': 15 });
const tDot = wt('D2', 'packed'), tilt = M.keys([[0, 0], [tDot + 0.8, 8]], 1.0);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [[K(`${V('V')} = 2 \\times 2 \\times 2.5 = ${V('10\\,\\text{cm}^3')}`)], [K(`\\text{density} = \\dfrac{${G('27\\,\\text{g}')}}{${V('10\\,\\text{cm}^3')}}`)], [K(`= \\textcolor{${C.ok}}{2.7\\,\\text{g cm}^{-3}}`)], ['Same block after: a physical property']], { label: 'WORKED EXAMPLE', y0: 200, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Two'), wt('W4', 'Twenty'), wt('W5', 'two'), wt('W6', 'after')];
const wsv = $('#wS');
const FX = 250, FY = 150, FW = 160, FH = 200, DX = 100, DY = -64;
const edges = [`M${FX} ${FY} H${FX + FW} V${FY + FH} H${FX} Z`, `M${FX} ${FY} L${FX + DX} ${FY + DY} H${FX + FW + DX} L${FX + FW} ${FY}`, `M${FX + FW + DX} ${FY + DY} V${FY + FH + DY} L${FX + FW} ${FY + FH}`].map(d => mk(wsv, 'path', { d, fill: 'none', stroke: VC, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }));
const faces = [mk(wsv, 'path', { d: `M${FX} ${FY} H${FX + FW} V${FY + FH} H${FX} Z`, fill: C.ac2 }), mk(wsv, 'path', { d: `M${FX} ${FY} L${FX + DX} ${FY + DY} H${FX + FW + DX} L${FX + FW} ${FY} Z`, fill: '#E7F6F6' }), mk(wsv, 'path', { d: `M${FX + FW} ${FY} L${FX + FW + DX} ${FY + DY} V${FY + FH + DY} L${FX + FW} ${FY + FH} Z`, fill: '#C9ECEC' })];
faces.forEach(f => wsv.insertBefore(f, edges[0]));
const dimL = [txt(wsv, FX + FW / 2, FY + FH + 34, '2 cm', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 }), txt(wsv, FX - 16, FY + FH / 2 + 8, '2.5 cm', { 'text-anchor': 'end', 'font-size': 22, fill: VC, 'font-weight': 600 }), txt(wsv, FX + FW + DX / 2 + 22, FY + FH + DY / 2 + 44, '2 cm', { 'font-size': 22, fill: VC, 'font-weight': 600 })];
const sc = mk(wsv, 'g', {}); mk(sc, 'rect', { x: 180, y: 384, width: 420, height: 18, rx: 6, fill: C.ink }); mk(sc, 'rect', { x: 300, y: 408, width: 180, height: 60, rx: 10, fill: C.ink2 });
const scR = txt(sc, 390, 449, '0 g', { 'text-anchor': 'middle', 'font-size': 30, fill: GC === '#B7791F' ? '#F5C66B' : GC, 'font-weight': 600 });
const vChip = mk(wsv, 'g', {}); mk(vChip, 'rect', { x: 540, y: 160, width: 200, height: 52, rx: 12, fill: VC }); txt(vChip, 640, 194, 'V = 10 cm³', { 'text-anchor': 'middle', 'font-size': 22, fill: '#fff', 'font-weight': 600 });
const tDim = [wt('W2', 'two'), wt('W2', 'by'), wt('W2', 'point')], tMass = wt('W2', 'mass');

/* ---------- C: everyday changes ---------- */
const SC = [['box', 'Sugar dissolving', 'PHYSICAL', 0, wt('C2', 'Sugar'), wt('C2', 'Physical')], ['link', 'Iron rusting', 'CHEMICAL', 1, wt('C3', 'Iron'), wt('C3', 'Chemical')], ['droplet', 'Wax melting', 'PHYSICAL', 0, wt('C4', 'Wax'), wt('C4', 'physical')],
  ['flame', 'Candle burning', 'CHEMICAL', 1, wt('C4', 'candle'), wt('C4', 'chemical')], ['milk', 'Milk to curd', 'CHEMICAL', 1, wt('C5', 'Milk'), wt('C5', 'chemical')]];
M.IC.droplet = ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'];
$('#srs').innerHTML = SC.map(([ic, n, v], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 96}px;height:88px"><i style="top:14px">${M.icon(ic, 30, C.ac, 2.2)}</i><div class="sn2" style="top:24px">${n}</div><div class="sw" id="sv${i}" style="top:22px"></div></div>`).join('');
const PANE = [['01 / 05', 'Sugar dissolving', 'Boil the water away, and the sugar is left behind.', ['SUGAR + WATER', 'A sweet solution'], ['AFTER BOILING', 'The same sugar back']],
  ['02 / 05', 'Iron rusting', 'Iron reacts with oxygen and water from damp air.', ['IRON', 'Shiny and strong'], ['RUST', 'Brown, flaky, new']],
  ['03 / 05', 'Wax melting', 'Solid wax turns liquid, then sets again as it cools.', ['SOLID WAX', 'Hard'], ['LIQUID WAX', 'Still wax']],
  ['04 / 05', 'Candle burning', 'The wax reacts with oxygen from the air.', ['WAX + OXYGEN', 'The fuel'], ['PRODUCTS', 'Carbon dioxide and water']],
  ['05 / 05', 'Milk to curd', 'Bacteria turn the milk sugar into an acid.', ['MILK', 'Liquid and sweet'], ['CURD', 'Thick, sour, new']]];
$('#pns').innerHTML = PANE.map(([s, t, d, bf, af], i) => `<div class="pn" id="pn${i}"><div class="ps">${s} · EVERYDAY CHANGE</div><div class="ptt">${t}</div><div class="pd">${d}</div>
  <div class="ba" id="pb${i}" style="left:36px"><div class="bl">${bf[0]}</div><div class="bt">${bf[1]}</div></div>
  <svg width="784" height="580" style="position:absolute;left:0;top:0"><path id="pa${i}" d="M352 365 H426" stroke="${C.ink2}" stroke-width="4" fill="none" stroke-linecap="round"/><path id="ph${i}" d="M416 353 L430 365 L416 377" stroke="${C.ink2}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="ba" id="pf${i}" style="left:448px;background:${SC[i][3] ? C.redBg : C.ac2}"><div class="bl">${af[0]}</div><div class="bt">${af[1]}</div></div>
  <div class="vd" id="pv${i}" style="background:${SC[i][3] ? C.red : C.ac}">${SC[i][2]}</div></div>`).join('');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'It needs heat, so it must be chemical', right: 'Only a new substance makes it chemical: boiling is physical' });
const tsv = $('#tS');
const gH = mk(tsv, 'g', {}); gH.insertAdjacentHTML('beforeend', `<g transform="translate(110 76)">${M.icon('flame', 64, C.red, 2.4)}</g>`); txt(gH, 142, 200, 'HEAT = CHEMICAL?', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xH = mk(tsv, 'path', { d: 'M80 70 L204 170 M204 70 L80 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const gW = mk(tsv, 'g', {}); const m1 = molW(gW), m2 = molW(gW); attr(m1, 'transform', 'translate(350 122)'); attr(m2, 'transform', 'translate(510 104) rotate(30)');
mk(gW, 'path', { d: 'M390 124 H460 M450 114 L462 124 L450 134', stroke: C.ok, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
txt(gW, 430, 200, 'STILL H₂O · PHYSICAL', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Sort properties into physical and chemical, and small density numericals' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which pair contains only chemical properties?', qW: 780,
  opts: ['Colour and combustibility', 'Density and acidity', 'Combustibility and basicity', 'Boiling point and odour'], right: 2, cols: 1, optW: 968, optY: 200, optH: 80, optFs: 32 });
const so = PUC.solution($('#so'), [['Combustibility: chemical'], ['Basicity: chemical'], ['Colour, density: physical'], ['Boiling point, odour: physical']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'reacts'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · physical and chemical properties', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Physical</b>: seen without changing the substance · colour, odour, m.p., b.p., density', '<b>Chemical</b>: needs a new substance · acidity or basicity, combustibility', '<b>Density</b> = mass ÷ volume · g cm⁻³ · SI unit kg m⁻³', '<b>The test</b>: a new substance, not heat, makes it chemical'] });
const YQ = ['Is the melting point of ice a physical or a chemical property?', 'Why is the ability to burn a chemical property?', 'A stone: 50 g, 20 cm³. What is its density?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 05', topic: 'One metre for the whole world? Measurement, SI Units and Uncertainty', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLook - 0.2, 1.12, 552, 420], [tS5, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.pn .ptt').forEach(q => { if (q.offsetWidth > 712) q.style.fontSize = Math.floor(52 * 712 / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#qm' + i), t, wt('H2', 'same') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'other') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'tell') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'property') - 0.1, 1e9, POP);
    const tk = [wt('P2', 'Physical'), wt('P2', 'chemical')], tl = [T0('P3'), T0('P5')], te = [T0('P5'), 1e9];
    [0, 1].forEach(i => { const el = $('#kb' + i); M.vis(el, t, tk[i] - 0.1, 1e9, { dy: 16 }); const on = M.io((t - tl[i] + 0.1) / 0.3) * (1 - M.io((t - te[i] + 0.1) / 0.3)); setBg(el, mix(C.soft, i ? C.redBg : C.ac2, on)); });
    M.vis($('#pw'), t, T0('P3') + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((d, i) => M.vis($('#ds' + i), t, d[3] - 0.1, 1e9, { dx: -14, dy: 0 }));
  }

  /* U: the one test */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#ft'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    FB.forEach((f, i) => M.vis($('#fb' + i), t, f[7] - 0.1, 1e9, { ...POP, sc: 0.85 }));
    M.draw(fArr[0], t, FB[1][7] - 0.3, 0.3); M.draw(fArr[1], t, FB[2][7] - 0.4, 0.4); M.draw(fArr[2], t, FB[3][7] - 0.4, 0.4);
    fLab[0].style.opacity = M.clamp((t - FB[2][7]) / 0.2); fLab[1].style.opacity = M.clamp((t - FB[3][7]) / 0.2);
  }

  /* S + B: boiling, burning, counter, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('S2') + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.setT($('#bnL'), t < tS6 ? 'MOLECULE BENCH · BOILING WATER' : 'MOLECULE BENCH · BURNING METHANE');
    // readout card, then reaction + counter
    M.vis($('#ro'), t, T0('S2') - 0.1, tS6 - 0.1, { dx: 60, dy: 0, outDur: 0.3, odx: 40, ody: 0 });
    RR.forEach((_, i) => M.vis($('#rr' + i), t, tRr[i] - 0.1, 1e9, { dy: 12 }));
    M.count($('#rv0'), t, tHeat, 2.6, 25, 100, v => Math.round(v) + ' °C');
    M.vis($('#roP'), t, wt('S5', 'physical') - 0.1, 1e9, POP);
    M.vis($('#rx'), t, tS6 + 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tS6 + 0.4, z, { dy: 36, ...o });
    PUC.write($('#eq'), t, tMeth, 0.9);
    M.vis($('#rxP'), t, wt('S8', 'Brand') - 0.1, 1e9, POP);
    const done = t >= tNew + 0.6;
    CNT.forEach((n, i) => { const el = $('#cr' + i); M.vis(el, t, tS6 + 0.6 + i * 0.12, 1e9, { dx: -16, dy: 0 }); M.setT($('#cv' + i), done ? `${n} | ${n}` : `${n} | 0`);
      const m = $('#cm' + i); PUC.setIco(m, done ? 'check' : 'x', '#fff', 22, 3); setBg(m, done ? C.ok : C.red);
      const fl = M.io((t - wt('B1', ['carbon', 'hydrogens', 'oxygens'][i]) + 0.1) / 0.2) * (1 - M.io((t - wt('B1', ['carbon', 'hydrogens', 'oxygens'][i]) - 0.6) / 0.4));
      setBg(el, mix(C.soft, done ? C.okBg : C.redBg, 0.5 + 0.5 * fl)); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'physical') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Ice') });
    // boiling water
    const bOp = M.clamp((t - tS1 - 0.2) / 0.4) * (1 - M.io((t - tS6 + 0.1) / 0.4));
    bk.style.opacity = bOp.toFixed(3); M.hide(bk, bOp <= 0.002);
    fade(flm, t, tHeat - 0.1, tS6 - 0.1, 0.3);
    const F = t + 2.2 * Math.max(0, t - tHeat);
    attr(wtr, 'y', (262 + 60 * M.io((t - tEsc) / 4)).toFixed(1)); attr(wtr, 'height', (139 - 60 * M.io((t - tEsc) / 4)).toFixed(1));
    wm.forEach((m, i) => { const lx = bounce(m.x + m.v * F, 226, 558), ly = m.y + 5 * Math.sin(F * 2.4 + i);
      const te = tEsc + i * 0.4, u = i < 6 ? M.io((t - te) / 1.0) : 0, [gx0, gy0, vx, vy] = m.gas, gx = bounce(gx0 + vx * t, 60, 724), gy = bounce(gy0 + vy * t, 96, 164);
      const x = M.lerp(lx, gx, u), y = M.lerp(ly, gy, u) - Math.sin(Math.PI * u) * 40;
      attr(m.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(m.rot + m.w * F).toFixed(1)})`); m.g.style.opacity = bOp.toFixed(3); M.hide(m.g, bOp <= 0.002); });
    // methane + oxygen
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const mIn = M.io((t - tMeth + 0.1) / 0.4), oIn = M.io((t - tOx + 0.1) / 0.4);
    for (const k in A) { const op = k[0] === 'O' ? oIn : mIn; attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`); A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002); }
    const brk = M.io((t - tBrk) / 0.35);
    ['ct', 'cb', 'cl', 'cr'].forEach(k => drawBond(BND[k], P, mIn * (1 - brk), mIn * (1 - brk)));
    ['o1', 'o2'].forEach(k => drawBond(BND[k], P, oIn * (1 - brk), oIn * (1 - brk)));
    ['n1', 'n2', 'w1', 'w2', 'w3', 'w4'].forEach((k, i) => drawBond(BND[k], P, M.io((t - tNew - i * 0.12) / 0.4), M.io((t - tPair - 0.4 - i * 0.1) / 0.4)));
    const TAG = [[tS1 + 0.3, 'H₂O · LIQUID'], [tHeat, 'HEATING'], [tEsc, 'VAPOUR · STILL H₂O'], [wt('S4', 'No'), 'O-H BONDS INTACT'], [tMeth, 'CH₄ · METHANE'], [tOx, 'CH₄ + 2O₂'], [tBrk, 'OLD BONDS BREAK'], [tPair, 'ELECTRONS PAIR UP'], [tNew, 'NEW BONDS FORM'], [tOut8, 'CO₂ + 2H₂O · NEW']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    const stOff = T0('B1') + 0.2;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['H', tS1 + 0.6, HC], ['O', tS1 + 0.8, OC], ['C', tMeth, CC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, stOff + 0.35, z);
  }

  /* D: density */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const an = tilt(t), r = an * Math.PI / 180;
    attr(beam, 'transform', `translate(${PVX} ${PVY}) rotate(${an.toFixed(2)})`);
    pans.forEach((p, i) => { const s = i ? 1 : -1, x = PVX + s * BL * Math.cos(r), y = PVY + s * BL * Math.sin(r); attr(p, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
    [cW, cA].forEach(c => c.dots.forEach((d, k) => { const u = M.clamp((t - tDot - k * 0.03) / 0.15); d.style.opacity = u.toFixed(3); M.hide(d, u <= 0); }));
    dR.forEach((e, i) => { e.style.opacity = M.clamp((t - tDs[1] - i * 0.3) / 0.3); });
    dNote.style.opacity = M.clamp((t - tDot) / 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'physical') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'chemical') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'new') + 0.3, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    edges.forEach((e, i) => M.draw(e, t, T0('W2') + 0.4 + i * 0.3, 0.6));
    faces.forEach(f => { f.style.opacity = M.clamp((t - T0('W2') - 1.2) / 0.4).toFixed(3); });
    dimL.forEach((d, i) => { d.style.opacity = M.clamp((t - tDim[i]) / 0.3); });
    fade(sc, t, tMass - 0.4);
    M.count(scR, t, tMass, 1.2, 0, 27, v => Math.round(v) + ' g');
    fade(vChip, t, tWs[0] + 0.8);
    M.vis($('#wP'), t, wt('W6', 'aluminium') - 0.1, 1e9, POP);
  }

  /* C: everyday changes */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cpn'), t, SC[0][4] - 0.2, out, { dx: 60, dy: 0, ...o });
    SC.forEach(([, , v, ch, tin, tv], i) => { const el = $('#sr' + i); M.vis(el, t, tC1 + 0.3 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tin + 0.15) / 0.3) * (i < 4 ? 1 - M.io((t - SC[i + 1][4] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.sn2').style.color = mix(C.ink, '#FFFFFF', on);
      PUC.setIco(el.querySelector('i'), SC[i][0], on > 0.5 ? C.ink : C.ac, 30, 2.2);
      const sv = $('#sv' + i); M.setT(sv, v); setBg(sv, ch ? C.red : C.ac); sv.style.color = '#fff'; M.vis(sv, t, tv - 0.1, 1e9, POP);
      const pn = $('#pn' + i), tout = i < 4 ? SC[i + 1][4] - 0.15 : 1e9;
      M.vis(pn, t, tin - 0.15, tout, { dy: 20, outDur: 0.2, ody: -10 });
      M.vis($('#pb' + i), t, tin + 0.2, 1e9, { dy: 14 }); M.draw($('#pa' + i), t, tin + 0.6, 0.3); $('#ph' + i).style.opacity = M.clamp((t - tin - 0.85) / 0.15);
      M.vis($('#pf' + i), t, Math.min(tin + 1.0, tv - 0.3), 1e9, { dy: 14 }); M.vis($('#pv' + i), t, tv - 0.1, 1e9, POP); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'any') - 0.1, tStrike: wt('X3', 'heat') - 0.1, tRight: wt('X3', 'substance') - 0.1 });
    fade(gH, t, wt('X2', 'heat') - 0.1); M.draw(xH, t, wt('X3', 'not') - 0.1, 0.4); fade(gW, t, wt('X3', 'Boiling') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') + 0.5, tCount, tAns });
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
