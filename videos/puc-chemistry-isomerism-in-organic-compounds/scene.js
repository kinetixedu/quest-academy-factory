// PUC Chemistry Ep 82: Isomerism in organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon groups ink, O / OH violet, H grey, the moving piece teal ring, CH3 in stereo gold, mismatch red
const NC = C.ac, HC = C.ink, OC = '#7A4FE0', HG = '#8A93A6', GD = '#B7791F', RD = C.red, OK = C.ok;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const tr = (el, x, y, s = 1) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
const L2 = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
Object.assign(M.IC, {
  type: ['M12 4v16', 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2', 'M9 20h6'],
  beads: ['M3.5 12a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0', 'M9.4 12a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0', 'M15.3 12a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0'],
  shuffle: ['m18 14 4 4-4 4', 'm18 2 4 4-4 4', 'M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-7.6a4 4 0 0 1 3.3-1.7H22', 'M2 6h1.97a4 4 0 0 1 3.3 1.7l.4.56', 'M22 18h-6.04a4 4 0 0 1-3.3-1.8l-.36-.45'],
});

/* ---------- molecule helper: balls + sticks, morphs state A -> B (atoms hop, bonds fade out / in) ---------- */
const mol = (p, n, r = 42) => {
  const g = mk(p, 'g', {}), bl = mk(g, 'g', {}), al = mk(g, 'g', {}), bonds = {};
  const at = [...Array(n)].map(() => { const gg = mk(al, 'g', {}); const ring = mk(gg, 'circle', { r: r + 9, fill: 'none', stroke: NC, 'stroke-width': 4 }); const c = mk(gg, 'circle', { r }); const tx = txt(gg, 0, 8, '', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#fff', 'text-anchor': 'middle' }); return { gg, ring, c, tx }; });
  const bln = k => bonds[k] || (bonds[k] = [0, 1].map(() => mk(bl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })));
  const Z = { g, pos: [] };
  Z.set = (A, B, u, ring = -1) => {
    const P = A.at.map((a, i) => { const b = B.at[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]), lift = d > 100 ? (b[5] ?? -60) * Math.sin(Math.PI * u) : 0; return [M.lerp(a[0], b[0], u), M.lerp(a[1], b[1], u) + lift, d]; });
    Z.pos = P;
    at.forEach((o, i) => {
      const a = A.at[i], b = B.at[i], s = u < 0.5 ? a : b; tr(o.gg, P[i][0], P[i][1]);
      const rr = s[4] ?? r; attr(o.c, 'r', rr); attr(o.ring, 'r', rr + 9); attr(o.c, 'fill', s[3] || HC); M.setT(o.tx, s[2]);
      attr(o.tx, 'font-size', s[2].length > 3 ? 18 : rr < 34 ? 20 : 22); attr(o.tx, 'y', rr < 34 ? 7 : 8);
      op(o.ring, (P[i][2] > 100 || i === ring) ? Math.min(1, Math.sin(Math.PI * M.clamp(u)) * 3 + (i === ring ? 1 : 0)) : 0);
    });
    const ka = {}, kb = {}; A.bd.forEach(([i, j, o2]) => ka[i + '-' + j] = o2 || 1); B.bd.forEach(([i, j, o2]) => kb[i + '-' + j] = o2 || 1);
    new Set([...Object.keys(ka), ...Object.keys(kb)]).forEach(k => bln(k));
    for (const k in bonds) {
      const [i, j] = k.split('-').map(Number), [l1, l2] = bonds[k], inA = k in ka, inB = k in kb;
      const v = inA && inB ? 1 : inA ? M.clamp(1 - u * 2.5) : inB ? M.clamp((u - 0.6) * 2.5) : 0, o2 = (u < 0.5 ? ka[k] : kb[k]) || ka[k] || kb[k] || 1;
      const [x1, y1] = P[i], [x2, y2] = P[j], dl = Math.hypot(x2 - x1, y2 - y1) || 1, nx = -(y2 - y1) / dl * 7, ny = (x2 - x1) / dl * 7;
      if (o2 === 2) { L2(l1, x1 + nx, y1 + ny, x2 + nx, y2 + ny); L2(l2, x1 - nx, y1 - ny, x2 - nx, y2 - ny); op(l2, v); } else { L2(l1, x1, y1, x2, y2); op(l2, 0); }
      op(l1, v);
    }
  };
  return Z;
};
const CH3 = 'CH₃', CH2 = 'CH₂';

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tB2 = T0('B2'), tG1 = T0('G1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['package', 'Lego bricks', 'A CAR OR A HOUSE', 'Lego', 'BUILD'], ['type', 'listen · silent', 'SAME SIX LETTERS', 'letters', 'SPELL'], ['beads', 'Same beads', 'TWO NECKLACES', 'beads', 'STRING']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['Ethanol: liquid', wt('H3', 'liquid'), C.ac2], ['Ether: a gas!', wt('H4', 'gas'), C.redBg], ['Both C₂H₆O', wt('H4', 'Same'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: family tree ---------- */
$('#mdefI').innerHTML = M.icon('shuffle', 28, '#fff', 2.2);
const QR = [['Molecular formula', 'COUNTS ATOMS', T0('P1')], ['Isomers', 'SAME FORMULA', wt('P2', 'isomers')], ['Structural isomers', 'NEW JOIN ORDER', wt('P3', 'structural')], ['Stereoisomers', 'NEW DIRECTION', wt('P4', 'stereoisomers')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
const node = (x, y, w, s, fill, col) => { const g = mk(ps, 'g', {}); mk(g, 'rect', { x: x - w / 2, y: y - 24, width: w, height: 48, rx: 10, fill }); txt(g, x, y + 7, s, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: col }); return g; };
const edge = (x1, y1, x2, y2) => mk(ps, 'path', { d: `M${x1} ${y1} V${(y1 + y2) / 2} H${x2} V${y2}`, fill: 'none', stroke: C.line, 'stroke-width': 3 });
const eR = [edge(392, 134, 216, 206), edge(392, 134, 588, 206)];
const nR = node(392, 110, 240, 'ISOMERISM', HC, '#fff');
const nSt = node(216, 230, 260, 'STRUCTURAL', NC, '#fff'), nSe = node(588, 230, 260, 'STEREO', OC, '#fff');
const LV = [['CHAIN', 'Chain'], ['POSITION', 'position'], ['FUNCTIONAL GROUP', 'functional'], ['METAMERISM', 'metamerism']];
const eL = LV.map((_, i) => mk(ps, 'path', { d: `M216 254 V${310 + i * 64} H232`, fill: 'none', stroke: C.line, 'stroke-width': 3 }));
const nL = LV.map(([s], i) => node(232 + 120, 310 + i * 64, 240, s, C.ac2, '#0B6F6F'));
const SV = [['GEOMETRICAL', 'space'], ['OPTICAL', 'space']];
const eS = SV.map((_, i) => mk(ps, 'path', { d: `M588 254 V${310 + i * 64} H604`, fill: 'none', stroke: C.line, 'stroke-width': 3 }));
const nS2 = SV.map(([s], i) => node(604 + 76, 310 + i * 64, 152, s, '#EEE8FC', OC));
nS2.forEach(g => attr(g, 'transform', 'translate(-30 0)')); eS.forEach(e => attr(e, 'd', e.getAttribute('d').replace('H604', 'H574')));

/* ---------- S: bench ---------- */
const b = $('#bS');
const ph1 = mk(b, 'g', {});
const CA = { at: [[152, 290, CH3], [272, 290, CH2], [392, 290, CH2], [512, 290, CH2], [632, 290, CH3]], bd: [[0, 1], [1, 2], [2, 3], [3, 4]] };
const CB = { at: [[212, 320, CH3], [332, 320, 'CH'], [452, 320, CH2], [572, 320, CH3], [332, 196, CH3]], bd: [[0, 1], [1, 2], [2, 3], [1, 4]] };
const CCs = { at: [[272, 270, CH3], [392, 270, 'C'], [512, 270, CH3], [392, 390, CH3, , , 60], [392, 150, CH3]], bd: [[0, 1], [1, 2], [1, 3], [1, 4]] };
const chain = mol(ph1, 5);
const bp = txt(ph1, 392, 470, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: HC });
// phase D: the group on the move
const phD = mk(b, 'g', {});
const PA = { at: [[212, 300, CH3], [332, 300, CH2], [452, 300, CH2], [572, 300, 'OH', OC]], bd: [[0, 1], [1, 2], [2, 3]] };
const PB = { at: [[272, 320, CH3], [392, 320, 'CH'], [512, 320, CH3], [392, 196, 'OH', OC]], bd: [[0, 1], [1, 2], [1, 3]] };
const FA = { at: [[272, 300, CH3], [392, 300, CH2], [512, 300, 'OH', OC]], bd: [[0, 1], [1, 2]] };
const FB = { at: [[272, 300, CH3], [512, 300, CH3, , , 70], [392, 300, 'O', OC]], bd: [[0, 2], [2, 1]] };
const MA = { at: [[152, 300, CH3], [272, 300, 'O', OC], [392, 300, CH2], [512, 300, CH2], [632, 300, CH3]], bd: [[0, 1], [1, 2], [2, 3], [3, 4]] };
const MB = { at: [[152, 300, CH3], [392, 300, 'O', OC], [272, 300, CH2, , , 70], [512, 300, CH2], [632, 300, CH3]], bd: [[0, 2], [2, 1], [1, 3], [3, 4]] };
const mP = mol(phD, 4), mF = mol(phD, 3), mM = mol(phD, 5);
const dNm = [txt(phD, 0, 470, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: HC }), txt(phD, 0, 470, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: NC })];
// phase G: stereo
const phG = mk(b, 'g', {});
const bu = (cis) => ({ at: [[-60, 0, 'CH'], [60, 0, 'CH'], [-150, -100, CH3, GD], [-150, 100, 'H', HG, 28], [150, cis ? -100 : 100, CH3, GD], [150, cis ? 100 : -100, 'H', HG, 28]], bd: [[0, 1, 2], [0, 2], [0, 3], [1, 4], [1, 5]] });
const gC = mk(phG, 'g', {}), gT = mk(phG, 'g', {});
const mC = mol(gC, 6), mT = mol(gT, 6); const BC = bu(1), BT = bu(0); mT.set(BT, BT, 0);
const lock = txt(phG, 392, 440, 'DOUBLE BOND · CANNOT TWIST', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: RD });
const lbC = txt(phG, 200, 470, 'CIS · SAME SIDE', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: GD }), lbT = txt(phG, 584, 470, 'TRANS · OPPOSITE', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: GD });
// optical: lactic acid and its mirror image (wedge = towards you, dashes = away)
const chi = (p, mir) => {
  const g = mk(p, 'g', {}); const gp = [['H', 0, -130, HG, 28, 0], ['CH₃', 0, 130, HC, 36, 0], [mir ? 'COOH' : 'OH', -130, 0, mir ? GD : OC, 38, mir ? 2 : 1], [mir ? 'OH' : 'COOH', 130, 0, mir ? OC : GD, 38, mir ? 1 : 2]];
  gp.forEach(([, x, y, , , k]) => {
    if (k === 0) mk(g, 'line', { x1: 0, y1: 0, x2: x, y2: y, stroke: C.ink2, 'stroke-width': 6 });
    else if (k === 1) mk(g, 'path', { d: `M0 0 L${x} ${-11} L${x} 11 Z`, fill: C.ink2 });
    else for (let i = 1; i <= 6; i++) { const xx = x * i / 7, hh = 3 + i * 1.6; mk(g, 'line', { x1: xx, y1: -hh, x2: xx, y2: hh, stroke: C.ink2, 'stroke-width': 3.5 }); }
  });
  const rings = gp.map(([s, x, y, c, r]) => { const gg = mk(g, 'g', { transform: `translate(${x} ${y})` }); const rg = mk(gg, 'circle', { r: r + 9, fill: 'none', stroke: RD, 'stroke-width': 4 }); mk(gg, 'circle', { r, fill: c }); txt(gg, 0, 7, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': s.length > 3 ? 17 : 20, fill: '#fff' }); return rg; });
  const cc = mk(g, 'g', {}); mk(cc, 'circle', { r: 36, fill: HC }); txt(cc, 0, 8, 'C', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: '#fff' });
  return { g, rings };
};
const phO = mk(phG, 'g', {});
const mir = mk(phO, 'line', { x1: 392, y1: 110, x2: 392, y2: 450, stroke: C.mute, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const mirT = txt(phO, 392, 476, 'MIRROR', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.mute });
const LA = chi(phO, 0), LB = chi(phO, 1); tr(LA.g, 200, 280);
const noFit = txt(phO, 392, 92, 'DOES NOT FIT ON TOP', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: RD });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* right cards */
const rxA = PUC.solution($('#rxA'), [[K(`\\text{all three: } \\mathrm{C_5H_{12}}`)], [K(`\\text{straight chain} \\to \\text{branched chain}`)], [K(`\\text{more branches} \\Rightarrow \\text{lower boiling point}`)]], { label: 'CHAIN ISOMERISM', y0: 80, dy: 62 });
const tRA = [wt('S1', 'twelve', 1), wt('S6', 'straight'), wt('S7', 'drops')];
const rxD = PUC.solution($('#rxD'), [[K(`\\text{same molecular formula?}`)], [K(`\\text{group moves} \\Rightarrow \\textbf{position}`)], [K(`\\text{group changes} \\Rightarrow \\textbf{functional group}`)], [K(`\\text{sides change} \\Rightarrow \\textbf{metamerism}`)]], { label: 'SORT IT · STEP BY STEP', y0: 70, dy: 50 });
const tRD = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const rxG = PUC.solution($('#rxG'), [[K(`\\text{same order, new direction in space}`)], [K(`\\mathrm{C{=}C} \\text{ cannot twist} \\Rightarrow \\text{cis, trans}`)], [K(`\\text{4 different groups} \\Rightarrow \\text{mirror pair}`)]], { label: 'STEREOISOMERISM', y0: 80, dy: 62 });
const tRG = [wt('G1', 'same'), wt('G3', 'geometrical'), wt('G4', 'mirror')];
const CRA = [['Pentane', 'straight', '36 °C', wt('S2', 'pentane')], ['2-Methylbutane', 'isopentane', '28 °C', T0('S4')], ['2,2-Dimethylpropane', 'neopentane', '9.5 °C', wt('S5', 'dimethyl')]];
$('#crA').innerHTML = CRA.map(([n, c, v], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce" style="font:600 24px Poppins;top:13px">${n}</div><div class="cn" style="left:330px">${c}</div><div class="cv" style="color:${NC}">${v}</div></div>`).join('');
const PRD = [['Propan-1-ol · Propan-2-ol', 'POSITION', NC, wt('D3', 'Propan')], ['Ethanol · Dimethyl ether', 'FUNCTIONAL', OC, wt('D4', 'functional')], ['Propanal · Propanone', 'FUNCTIONAL', OC, wt('D4', 'Propanal')], ['Methoxypropane · Ethoxyethane', 'METAMERS', GD, wt('D5', 'metamerism')]];
$('#prD').innerHTML = PRD.map(([s, k, c], i) => `<div class="pr" id="pd${i}" style="top:${66 + i * 50}px"><div class="pa">${s}</div><div class="pt" style="color:${c}">${k}</div></div>`).join('');
const LNG = [['Geometrical: cis and trans, as in but-2-ene', GD, wt('G3', 'geometrical')], ['Optical: mirror images that do not fit on top', OC, T0('G5')]];
$('#lnG').innerHTML = LNG.map(([s, c], i) => `<div class="ln" id="lg${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'Methoxypropane and ethoxyethane: which type?', opts: ['Functional group isomers', 'Metamers'], right: 1, why: 'Both are ethers. The O stays an ether O; only the carbon groups on its two sides change.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{C_2H_6O}:\\; ${tc(HC, '\\text{ethanol, liquid}')} \\;\\ne\\; ${tc(OC, '\\text{dimethyl ether, gas}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{straight} \\to \\text{branched: chain}`)],
  [K(`\\mathrm{OH}: \\text{C1} \\to \\text{C2: position}`)],
  [K(`\\text{alcohol vs ether: functional group}`)],
  [K(`\\text{check first: same formula}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'chain'), wt('W4', 'moves'), wt('W5', 'Alcohol'), T0('W6')];
const WP = [['Butane · 2-Methylpropane', 'C₄H₁₀', 'CHAIN', NC, wt('W3', 'Chain', 1)], ['Butan-1-ol · Butan-2-ol', 'C₄H₁₀O', 'POSITION', NC, wt('W4', 'Position')], ['Butan-1-ol · Ethoxyethane', 'C₄H₁₀O', 'FUNCTIONAL', OC, wt('W5', 'Functional')]];
$('#wps').innerHTML = WP.map(([s, f, k, c], i) => `<div class="wp" id="wp${i}" style="top:${84 + i * 124}px"><div class="pa">${s}</div><div class="pf" id="wf${i}">BOTH ${f}</div><div class="pt" id="wt${i}" style="color:${c}">${k}</div></div>`).join('');
const tWp = [T0('W3'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A bent drawing of butane is a new isomer', right: 'Same molecule: single bonds turn. Count the longest chain.' });
const tsv = $('#tS');
const sb = (pts, y0) => { const g = mk(tsv, 'g', {}); for (let i = 0; i < 3; i++) mk(g, 'line', { x1: pts[i][0], y1: pts[i][1] + y0, x2: pts[i + 1][0], y2: pts[i + 1][1] + y0, stroke: C.ink2, 'stroke-width': 5 }); pts.forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y + y0, r: 17, fill: HC })); return g; };
const tA = sb([[40, 0], [100, 0], [160, 0], [220, 0]], 92), tB = sb([[340, 0], [400, 0], [460, 0], [460, 64]], 92);
const tEq = txt(tsv, 280, 108, '=', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 44, 'font-weight': 700, fill: OK });
const tLb = txt(tsv, 250, 244, 'BOTH: BUTANE, 4 IN A ROW', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: OK });
const where = PUC.where($('#wa'), { on: [], type: 'Spot the type of isomerism in a pair, count the structural isomers of a formula' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `How many structural isomers are possible for ${K('\\mathrm{C_4H_{10}O}')}?`, qW: 760,
  opts: ['4', '6', '7', '8'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`\\text{alcohols: } 4`)], [K(`\\text{ethers: } 3`)], [K(`4 + 3 = 7`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 500, title: 'Recap · isomerism in organic compounds', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Isomers</b>: same molecular formula, different structure and properties', '<b>Chain</b>: straight vs branched · pentane, isopentane, neopentane (C₅H₁₂)', '<b>Position</b>: the group moves · propan-1-ol, propan-2-ol (C₃H₈O)', '<b>Functional group</b>: the group changes · ethanol, dimethyl ether · <b>Metamers</b>: sides change', '<b>Stereo</b>: same join order · geometrical (cis, trans) · optical (mirror pair)'] });
const YQ = ['Why do ethanol and dimethyl ether behave so differently?', 'What is the difference between position isomers and metamers?', 'Why can but-2-ene have cis and trans forms, but butane cannot?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 83', topic: 'Where do the electrons go when a bond breaks? Bond Fission', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tH1 = wt('S3', 'hops'), tH2 = wt('S5', 'hop');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tH1 - 0.3, 1.08, 640, 560], [T0('S4') + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
  document.querySelectorAll('.fcard .fl').forEach(q => { if (q.offsetWidth > 1230) q.style.fontSize = Math.floor(26 * 1230 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const ctrK = { v: '' }; const setCtr = (f, s) => { const k = f + s; if (ctrK.v !== k) { ctrK.v = k; $('#ctr').innerHTML = `${K(f)}<span style="color:var(--mute)">${s}</span><span style="color:${OK}">${M.icon('check', 26, OK, 3)}</span>`; } };
const uu = (t, a, d = 1.2) => M.io((t - a) / d);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['pieces', 'build', 'thing'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Molecules') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'joined') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const tR = wt('P2', 'isomerism'), tSt = wt('P3', 'structural'), tSe = wt('P4', 'stereoisomers');
    op(nR, M.io((t - tR + 0.1) / 0.3));
    M.drawU(eR[0], M.io((t - tSt + 0.3) / 0.4)); op(nSt, M.io((t - tSt) / 0.3));
    M.drawU(eR[1], M.io((t - tSe + 0.3) / 0.4)); op(nSe, M.io((t - tSe) / 0.3));
    LV.forEach(([, w], i) => { const tt = wt('P5', w); M.drawU(eL[i], M.io((t - tt + 0.2) / 0.3)); op(nL[i], M.io((t - tt) / 0.3)); });
    SV.forEach((_, i) => { const tt = wt('P4', 'space') + i * 0.3; M.drawU(eS[i], M.io((t - tt + 0.2) / 0.3)); op(nS2[i], M.io((t - tt) / 0.3)); });
  }

  /* S + D + G: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const ph = t < tD1 - 0.45 ? 1 : t < tG1 - 0.45 ? 2 : 3;
    const a = ph === 3 ? tG1 + 0.05 : tS1 + 0.05, z = ph === 3 ? OUT('T1') : OUT('B2');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    M.vis($('#rx'), t, ph === 1 ? wt('S1', 'twelve', 1) - 0.3 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, ph === 1 ? wt('S2', 'pentane') - 0.2 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'functional') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Both') });
    op(ph1, ph === 1 ? M.clamp((t - tS1 - 0.2) / 0.3) : 0); op(phD, ph === 2 ? M.clamp((t - tD1 + 0.3) / 0.3) : 0); op(phG, ph === 3 ? 1 : 0);
    let lab = 'MOLECULE BENCH', tags = [];
    if (ph === 1) {
      lab = 'MOLECULE BENCH · C₅H₁₂';
      const u1 = uu(t, tH1 - 0.1, 1.4), u2 = uu(t, tH2 - 0.1, 1.4);
      if (t < tH2 - 0.1) chain.set(CA, CB, u1); else chain.set(CB, CCs, u2);
      const ch = [M.io((t - T0('S2')) / 0.4)];
      op(chain.g, ch[0]);
      M.setT(bp, t < tH1 + 0.7 ? 'PENTANE · BOILS AT 36 °C' : t < tH2 + 0.7 ? '2-METHYLBUTANE · 28 °C' : '2,2-DIMETHYLPROPANE · 9.5 °C'); op(bp, ch[0]);
      setCtr('\\mathrm{C_5H_{12}}', 'C 5 | H 12');
      M.vis($('#ctr'), t, wt('S1', 'twelve', 1), 1e9, { dy: 10 });
      tags = [[T0('S2'), 'PENTANE'], [tH1 + 0.7, '2-METHYLBUTANE'], [tH2 + 0.7, '2,2-DIMETHYLPROPANE'], [T0('S6'), '3 SKELETONS · 1 FORMULA']];
    } else if (ph === 2) {
      const tP = wt('D3', 'moving'), tF2 = wt('D4', 'Dimethyl'), tM2 = wt('D5', 'ethoxy');
      const k = t < T0('D4') - 0.3 ? 0 : t < T0('D5') - 0.3 ? 1 : 2;
      const kv = [M.io((t - T0('D2') + 0.2) / 0.3) * (1 - M.io((t - T0('D4') + 0.3) / 0.25)), M.io((t - T0('D4') + 0.05) / 0.3) * (1 - M.io((t - T0('D5') + 0.3) / 0.25)), M.io((t - T0('D5') + 0.05) / 0.3)];
      op(mP.g, kv[0]); op(mF.g, kv[1]); op(mM.g, kv[2]);
      if (k === 0) mP.set(PA, PB, uu(t, tP, 1.4)); else if (k === 1) mF.set(FA, FB, uu(t, tF2 - 0.4, 1.4)); else mM.set(MA, MB, uu(t, tM2 - 0.4, 1.4));
      const NM = [['PROPAN-1-OL', 'PROPAN-2-OL', tP + 0.7], ['ETHANOL', 'DIMETHYL ETHER', tF2 + 0.3], ['METHOXYPROPANE', 'ETHOXYETHANE', tM2 + 0.3]][k];
      const sw = t >= NM[2]; M.setT(dNm[0], sw ? NM[1] : NM[0]); attr(dNm[0], 'x', 392); op(dNm[0], kv[k]); op(dNm[1], 0);
      lab = ['MOLECULE BENCH · C₃H₈O', 'MOLECULE BENCH · C₂H₆O', 'MOLECULE BENCH · C₄H₁₀O'][k];
      setCtr(['\\mathrm{C_3H_8O}', '\\mathrm{C_2H_6O}', '\\mathrm{C_4H_{10}O}'][k], ['C 3 | H 8 | O 1', 'C 2 | H 6 | O 1', 'C 4 | H 10 | O 1'][k]);
      M.vis($('#ctr'), t, T0('D2'), 1e9, { dy: 10 });
      tags = [[T0('D2'), 'STEP 1 · SAME FORMULA'], [tP, 'POSITION ISOMERS'], [tF2 - 0.4, 'FUNCTIONAL GROUP ISOMERS'], [tM2 - 0.4, 'METAMERS']];
    } else {
      const tTw = wt('G2', 'stiff'), tSp = wt('G3', 'opposite'), tO = T0('G4'), tFit = wt('G4', 'fit');
      const kz = M.clamp((t - tTw) / 1.8), th = 62 * Math.sin(Math.PI * kz) * Math.PI / 180;
      const Bt = { at: BC.at.map((p, i) => i >= 4 ? [p[0], p[1] * Math.cos(th), p[2], p[3], p[4]] : p), bd: BC.bd };
      mC.set(Bt, Bt, 0);
      const sp = M.io((t - tSp + 0.2) / 0.8), gO = M.io((t - tO + 0.3) / 0.35);
      tr(gC, M.lerp(392, 200, sp), 280, M.lerp(1, 0.85, sp)); tr(gT, 584, 280, 0.85);
      op(gC, M.io((t - tG1) / 0.3) * (1 - gO)); op(gT, sp * (1 - gO));
      op(lock, M.io((t - wt('G2', 'cannot') + 0.2) / 0.3) * (1 - sp)); op(lbC, sp * (1 - gO)); op(lbT, sp * (1 - gO));
      op(phO, M.io((t - tO - 0.05) / 0.35));
      const mo = M.io((t - wt('G4', 'mirror')) / 0.4), sl = M.io((t - tFit + 0.5) / 0.8) * (1 - M.io((t - T0('G5') - 0.6) / 0.8));
      op(mir, mo); op(mirT, mo); tr(LB.g, M.lerp(584, 200, sl), 280); op(LB.g, mo * (sl > 0.02 ? 0.82 : 1));
      LA.rings.forEach((r, i) => op(r, i >= 2 ? M.clamp((sl - 0.85) / 0.15) : 0)); LB.rings.forEach(r => op(r, 0));
      op(noFit, M.clamp((sl - 0.85) / 0.15));
      lab = t < tO ? 'MOLECULE BENCH · BUT-2-ENE' : 'MOLECULE BENCH · 4 DIFFERENT GROUPS';
      M.vis($('#ctr'), t, 1e9, 1e9, { dy: 10 });
      tags = [[T0('G2'), 'C=C · LOCKED'], [wt('G3', 'cis'), 'CIS'], [tSp, 'GEOMETRICAL ISOMERS'], [tO, 'MIRROR IMAGES'], [T0('G5'), 'OPTICAL ISOMERS']];
    }
    M.setT($('#bnL'), lab);
    let tg = null; for (const [tt, s] of tags) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tags[0][0] - 0.1, 1e9, POP);
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1 - 0.4, tG1 - 0.45, { dy: 0 }); M.vis($('#rxG'), t, tG1 - 0.4, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD); rxG(t, tG1 + 0.2, tRG);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1 - 0.4, tG1 - 0.45, { dy: 0 }); M.vis($('#ctG'), t, tG1 - 0.4, 1e9, { dy: 0 });
    CRA.forEach(([, , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    PRD.forEach(([, , , tt], i) => M.vis($('#pd' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LNG.forEach(([, , tt], i) => M.vis($('#lg' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Same') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'different', 1) - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'compound') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WP.forEach(([, , , , tk], i) => { M.vis($('#wp' + i), t, tWp[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#wt' + i), t, tk - 0.1, 1e9, POP); M.vis($('#wf' + i), t, wt('W6', 'first') + i * 0.25, 1e9, { dy: 6 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'draw') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'same') - 0.1 });
    op(tA, M.io((t - wt('X2', 'butane')) / 0.3)); op(tB, M.io((t - wt('X2', 'bend')) / 0.3));
    op(tEq, M.io((t - wt('X3', 'same')) / 0.3)); op(tLb, M.io((t - wt('X3', 'longest')) / 0.3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'structural'), tCount, tAns });
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
