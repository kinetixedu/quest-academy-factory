// PUC Chemistry Ep 19: de Broglie relation (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, readout, graph, equation, recap): electron e- orange, matter wave and lambda violet,
// mass m ink, velocity v gold, momentum p blue
const EC = '#C8461B', VC = '#7A4FE0', MC = C.ink, GC = '#B7791F', PC = '#2F6FEB', NC = C.ac;
const h = 6.626e-34, ME = 9.109e-31;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const hash = n => { const s = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return s - Math.floor(s); };
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sci = (x, d = 2) => { const e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e); return `${m.toFixed(d)} × 10${String(e).split('').map(c => SUP[c]).join('')}`; };
// LaTeX helpers with colour-coding
const L_ = `\\textcolor{${VC}}{\\lambda}`, m_ = `\\textcolor{${MC}}{m}`, v_ = `\\textcolor{${GC}}{v}`, p_ = `\\textcolor{${PC}}{p}`;
const REL = `${L_} = \\frac{h}{${m_}${v_}}`;

Object.assign(M.IC, {
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M5 5c3 3 3 11 0 14', 'M19 5c-3 3-3 11 0 14'],
  board: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1');
const tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

// matter wave around a particle at (xe, y): wave packet, lam in px, amplitude a
const wavePath = (xe, y, lam, a, x0, x1, ph = 0) => { let d = ''; for (let x = x0; x <= x1; x += 3) { const s = (x - xe) / 170, env = Math.exp(-s * s); d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + (y + Math.sin((x - xe) / lam * Math.PI * 2 + ph) * a * env).toFixed(1); } return d; };

/* ---------- title card ---------- */
const JOBS = [['search', 'Light microscope', 'CANNOT SEE A VIRUS', 'H1', 'light'], ['atom', 'Electron microscope', 'CAN SEE IT', 'H1', 'electron'], ['ball', 'Cricket ball', 'NEVER BENDS LIKE A WAVE', 'H2', 'cricket']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn" style="font-size:${n.length > 14 ? 24 : 28}px">${n}</div><div class="jw" style="font-size:${w.length > 18 ? 14 : 16}px">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3], j[4]));
const JV = [['LONG WAVES', '#EEE8FC', VC], ['TINY WAVES', '#EEE8FC', VC], ['WAVE TOO SMALL', C.soft, C.ink]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" id="jv${i}" style="background:${JV[i][1]};color:${JV[i][2]}">${JV[i][0]}</div></div>`).join('');
const KIT = [['search', 'Virus photo', 'virus'], ['atom', 'Made with electrons, not light', 'electrons']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P ---------- */
const QR = [['Light: a wave', 'EP 18', 'P1', 'wave'], ['Light: photons too', 'PARTICLES', 'P1', 'photons'], ['Electrons: particles', 'KNOWN', 'P3', 'particles'], ['Electrons: waves too', 'DE BROGLIE', 'P3', 'waves']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${208 + i * 88}px;height:76px"><div class="nn" style="top:15px">${i + 1}</div><div class="qt" style="top:18px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const pS = $('#pS');
const pTrack = Array.from({ length: 16 }, () => mk(pS, 'line', { y1: 360, y2: 360, stroke: C.line, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const pW = mk(pS, 'path', { fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const pE = mk(pS, 'circle', { cx: 392, cy: 260, r: 18, fill: EC });
const pEl = txt(pS, 392, 214, 'e⁻', { 'text-anchor': 'middle', 'font-size': 24, fill: EC, 'font-weight': 700, 'font-family': 'Poppins' });
const pWl = txt(pS, 392, 420, 'MATTER WAVE', { 'text-anchor': 'middle', 'font-size': 18, fill: VC, 'font-weight': 600 });

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="20" y="66" width="744" height="500"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const XE = 392, YE = 280;
const track = Array.from({ length: 18 }, () => mk(bW, 'line', { y1: 470, y2: 470, stroke: C.line, 'stroke-width': 4, 'stroke-linecap': 'round' }));
const trL = txt(bW, 392, 510, 'MOVING RIGHT →', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const bWv = mk(bW, 'path', { fill: 'none', stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const bE = mk(bW, 'circle', { cx: XE, cy: YE, r: 20, fill: EC });
const bEl = txt(bW, XE, YE + 8, 'e⁻', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700, 'font-family': 'Poppins' });
const brk = mk(bW, 'path', { fill: 'none', stroke: VC, 'stroke-width': 3 });
const brkL = txt(bW, 0, 0, 'λ', { 'text-anchor': 'middle', 'font-size': 30, fill: VC, 'font-weight': 700, 'font-family': 'Poppins' });
const vArr = PUC.arrow(bW, GC, 6, 18); const vL = txt(bW, 0, 0, 'v', { 'font-size': 28, fill: GC, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic' });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const tFast = wt('S3', 'speed') - 0.1, tSlow = wt('S4', 'Slow') - 0.1, tMass = wt('S5', 'four') - 0.1;
const VK = M.keys([[0, 1.0], [tFast, 1.0], [tFast + 0.1, 3.0], [tSlow, 3.0], [tSlow + 0.1, 1.0]], 1.0);
const MK = M.keys([[0, 1], [tMass, 1], [tMass + 0.1, 4]], 1.0);
const lamPm = (v, m) => h / (m * ME * v * 1e6) * 1e12;
// readout
const RO = [['mass  m', MC, 'r0'], ['speed  v', GC, 'r1'], ['wavelength  λ = h / mv', VC, 'r2']];
$('#ros').innerHTML = RO.map(([n, c, id], i) => `<div class="ro2" id="ro${i}" style="top:${70 + i * 62}px"><div class="k" style="color:${c}">${n}</div><div class="v2" id="${id}" style="color:${c}"></div></div>`).join('');
// graph lambda vs v
const gS = $('#gS');
const G = PUC.graph(gS, { x: 110, y: 72, w: 600, h: 136, xmax: 4, ymin: 0, ymax: 1400, xt: [1, 2, 3, 4], yt: [0, 700, 1400], xl: 'v (10⁶ m/s)', yl: 'λ (pm)' });
const cv1 = G.curve(VC, 4), cv4 = G.curve(MC, 4), gd = G.dot(EC, 10);
const c4L = txt(gS, 0, 0, 'm = 4 mₑ', { 'font-size': 16, fill: MC, 'font-weight': 600 }), c1L = txt(gS, 0, 0, 'm = mₑ', { 'font-size': 16, fill: VC, 'font-weight': 600 });
const gEx = document.createElement('div'); gEx.className = 'ghost2'; gEx.style.cssText = 'right:36px;top:20px'; gEx.textContent = '4 mₑ: EXAMPLE'; $('#gr').appendChild(gEx);
// compare
$('#cmps').innerHTML = [['Electron', 'm = 9.109 × 10⁻³¹ kg', EC], ['Cricket ball', 'm = 0.16 kg', C.ink]].map(([n, w, c], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ct">${n}</div><div class="cw2" style="color:${c}">${w}</div><svg id="cmS${i}" width="736" height="460" style="position:absolute;left:0;top:0"></svg></div>`).join('');
const cmW = [0, 1].map(i => { const s = $('#cmS' + i); const w = mk(s, 'path', { fill: 'none', stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' }); const o = i ? mk(s, 'circle', { cx: 368, cy: 230, r: 52, fill: '#B23A3A' }) : mk(s, 'circle', { cx: 368, cy: 230, r: 16, fill: EC });
  const r = txt(s, 368, 420, i ? 'λ ≈ 1 × 10⁻³⁴ m · FLAT' : 'λ ≈ 7.3 × 10⁻¹⁰ m at 10⁶ m/s', { 'text-anchor': 'middle', 'font-size': 20, fill: i ? C.mute : VC, 'font-weight': 700 }); return { w, o, r }; });
const cmG = document.createElement('div'); cmG.className = 'ghost2'; cmG.style.cssText = 'left:1050px;top:22px'; cmG.textContent = 'BALL: EXAMPLE FIGURES'; $('#cmpC').appendChild(cmG);
const th1 = PUC.think($('#th1'), { q: 'Whose matter wave is long enough for us to ever notice?', opts: ['The electron', 'The cricket ball'], right: 0, why: 'Tiny mass, so h/mv is big enough to measure. The ball\'s wave is far too small.' });

/* ---------- D ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${p_} = ${m_}${v_}`), 'momentum, kg m/s'],
  [K(`${p_}_\\text{photon} = \\frac{h}{${L_}}`), 'h = 6.626 × 10⁻³⁴ J s'],
  [K(`${L_} = \\frac{h}{${p_}}`), 'the same rule for matter'],
  [K(REL), 'the de Broglie relation'],
  [K(`\\frac{\\text{J s}}{\\text{kg m/s}} = \\frac{\\text{kg m}^2\\text{/s}}{\\text{kg m/s}} = \\text{m}`), 'a length']], { label: 'DE BROGLIE\'S RELATION · STEP BY STEP', y0: 104, dy: 92 });
const tDs = [wt('D2', 'Momentum'), wt('D3', 'photon'), wt('D4', 'Turn'), wt('D5', 'Put'), wt('D6', 'Check')];
$('#dq0').innerHTML = K(`\\text{photon: } ${p_} = \\frac{h}{${L_}}`); $('#dq1').innerHTML = K(`\\text{matter: } ${L_} = \\frac{h}{${p_}} = \\frac{h}{${m_}${v_}}`);
$('#dq2').innerHTML = K(REL); $('#dq3').innerHTML = K(`\\text{J} = \\text{kg m}^2\\text{/s}^2 \\;\\Rightarrow\\; ${L_} \\text{ in metres}`);
const dS = $('#dS');
const dPh = mk(dS, 'path', { fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dE = mk(dS, 'circle', { cx: 560, cy: 340, r: 18, fill: EC }); const dEa = PUC.arrow(dS, PC, 6, 18); const dEl = txt(dS, 690, 330, 'p = mv', { 'font-size': 24, fill: PC, 'font-weight': 700, 'font-family': 'Poppins' });
const dFlip = mk(dS, 'path', { d: 'M700 140 C 760 160 760 190 700 210', fill: 'none', stroke: C.mute, 'stroke-width': 3 });
const dBox = mk(dS, 'rect', { x: 24, y: 270, width: 480, height: 120, rx: 14, fill: 'none', stroke: VC, 'stroke-width': 3 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(REL);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${p_} = 9.109 \\times 10^{-31} \\times 3.0 \\times 10^{6}`)],
  [K(`${p_} = 2.733 \\times 10^{-24}\\,\\text{kg m/s}`)],
  [K(`${L_} = \\frac{h}{${p_}} = \\frac{6.626 \\times 10^{-34}}{2.733 \\times 10^{-24}}`)],
  [K(`${L_} = 2.42 \\times 10^{-10}\\,\\text{m}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 82 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W4', 'Mass'), wt('W4', 'two'), wt('W5', 'Then'), T0('W6')];
const s2 = $('#wS2'), RX0 = 70, RX1 = 714, RY = 260, E0 = -35, E1 = -5, RX = e => RX0 + (RX1 - RX0) * (e - E0) / (E1 - E0);
const ruler = mk(s2, 'line', { x1: RX0, y1: RY, x2: RX1, y2: RY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const ticks = mk(s2, 'g', {}); for (let e = E0; e <= E1; e += 5) { mk(ticks, 'line', { x1: RX(e), y1: RY - 10, x2: RX(e), y2: RY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(ticks, RX(e), RY + 36, `10${String(e).split('').map(c => SUP[c]).join('')}`, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute }); }
txt(ticks, RX1, RY + 64, 'metres', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute });
const pin = (e, up, lab, sub, col) => { const g = mk(s2, 'g', {}); const x = RX(e), y2 = up ? RY - 110 : RY + 150; mk(g, 'line', { x1: x, y1: RY, x2: x, y2, stroke: col, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: RY, r: 9, fill: col });
  const tx = txt(g, x, up ? y2 - 30 : y2 + 24, lab, { 'text-anchor': e < -25 ? 'start' : e > -8 ? 'end' : 'middle', 'font-size': 20, fill: col, 'font-weight': 700 }); const ts = txt(g, x, up ? y2 - 8 : y2 + 48, sub, { 'text-anchor': e < -25 ? 'start' : e > -8 ? 'end' : 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
  if (e < -25) { attr(tx, 'x', x - 10); attr(ts, 'x', x - 10); } return g; };
const pinE = pin(Math.log10(2.42e-10), true, 'ELECTRON λ', '2.42 × 10⁻¹⁰ m', VC);
const pinA = pin(Math.log10(52.9e-12), false, 'BOHR RADIUS', '52.9 pm', NC);
const pinB = pin(Math.log10(1.035e-34), false, 'CRICKET BALL λ', '≈ 1 × 10⁻³⁴ m', C.ink);

/* ---------- C: diffraction + microscope ---------- */
const cw = $('#cwS');
const gun = mk(cw, 'rect', { x: 50, y: 250, width: 70, height: 50, rx: 8, fill: C.ink }); txt(cw, 85, 330, 'GUN', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const foil = mk(cw, 'g', {}); for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) mk(foil, 'circle', { cx: 290 + j * 14, cy: 190 + i * 24, r: 5, fill: NC });
txt(foil, 297, 430, 'CRYSTAL', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const scr = mk(cw, 'rect', { x: 470, y: 120, width: 270, height: 330, rx: 12, fill: '#1E2A47' }); txt(cw, 605, 476, 'SCREEN', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const SCX = 605, SCY = 285, RR = [0, 46, 84, 116];
const beamD = Array.from({ length: 12 }, () => mk(cw, 'circle', { r: 6, fill: EC }));
const HITS = Array.from({ length: 420 }, (_, n) => { const a = hash(n) * Math.PI * 2, k = Math.floor(hash(n + 0.3) * 10), ri = k < 3 ? 0 : k < 6 ? 1 : k < 9 ? 2 : 3; const r = RR[ri] + (hash(n + 0.7) - 0.5) * (ri ? 9 : 16); return [SCX + r * Math.cos(a), SCY + r * Math.sin(a)]; });
const hitG = mk(cw, 'g', {}); const hitE = HITS.map(([x, y]) => mk(hitG, 'circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 2.6, fill: '#F2B79D' }));
$('#cps').innerHTML = [['Light microscope', 'LIGHT WAVES · HUNDREDS OF nm', C.ink, 'Light'], ['Electron microscope', 'ELECTRON WAVES · PICOMETRES', EC, 'Electron'], ['Shorter wave, finer detail', 'SEES A VIRUS', NC, 'finer']].map(([n, w, c], i) => `<div class="qr" id="cq${i}" style="top:${92 + i * 112}px;height:96px"><div class="nn" style="top:24px;border-color:${c};color:${c}">${i + 1}</div><div class="qt" style="top:14px">${n}</div><div class="qk" style="left:88px;right:auto;top:58px;font-size:16px;color:${c}">${w}</div></div>`).join('');
const cqW = [0, 1].map(i => { const s = mk($('#cp').appendChild(document.createElementNS(nsv, 'svg')), 'path', { fill: 'none', stroke: i ? EC : VC, 'stroke-width': 3.5 }); const sv = s.parentNode; sv.setAttribute('width', 260); sv.setAttribute('height', 96); sv.style.cssText = `position:absolute;left:470px;top:${92 + i * 112}px`; let d = ''; const lam = i ? 9 : 60; for (let x = 10; x <= 250; x += 2) d += (d ? 'L' : 'M') + x + ',' + (48 + Math.sin(x / lam * Math.PI * 2) * 22).toFixed(1); attr(s, 'd', d); return sv; });
const tCq = [wt('C3', 'microscopes'), wt('C3', 'Electron', 1), wt('C3', 'finer')];
const avA = PUC.avatar($('#sC'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So that virus photo was taken with waves!' });

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${m_} = 160\\,\\text{g},\\; ${v_} = 144\\,\\text{km/h}`)} put straight into ${K('h/mv')}`, right: `First convert: ${K(`${m_} = 0.16\\,\\text{kg},\\; ${v_} = 40\\,\\text{m/s}`)}` });
const tsv = $('#tS');
const cvt = (y, a, bb) => { const g = mk(tsv, 'g', {}); mk(g, 'rect', { x: 40, y, width: 170, height: 52, rx: 10, fill: C.redBg }); txt(g, 125, y + 34, a, { 'text-anchor': 'middle', 'font-size': 22, fill: C.red, 'font-weight': 600 }); const ar = PUC.arrow(g, C.ink, 4, 14); ar.set(222, y + 26, 300, y + 26); mk(g, 'rect', { x: 312, y, width: 190, height: 52, rx: 10, fill: C.okBg }); txt(g, 407, y + 34, bb, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ok, 'font-weight': 600 }); return g; };
const cv1g = cvt(70, '160 g', '0.16 kg'), cv2g = cvt(150, '144 km/h', '40 m/s');
const where = PUC.where($('#wa'), { on: [], type: `Numericals on ${K(REL)}, and ratio questions comparing particles` });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `An electron and a proton have the same kinetic energy. The ratio ${K(`${L_}_\\mathrm{e} / ${L_}_\\mathrm{p}`)} is closest to<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: mₚ ≈ 1836 mₑ</span>`, qW: 800,
  opts: [K('1'), K('1836'), K('43'), K('1/43')], right: 2, optW: 474, optY: 350, optH: 100, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`KE = \\frac{${p_}^2}{2${m_}} \\Rightarrow ${p_} = \\sqrt{2${m_}K}`)], [K(`${L_} = \\frac{h}{\\sqrt{2${m_}K}} \\propto \\frac{1}{\\sqrt{${m_}}}`)], [K(`\\frac{${L_}_\\mathrm{e}}{${L_}_\\mathrm{p}} = \\sqrt{\\frac{m_\\mathrm{p}}{m_\\mathrm{e}}} = \\sqrt{1836}`)], [K(`\\approx \\textcolor{${C.ok}}{43}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · the de Broglie relation', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${REL} = \\frac{h}{${p_}}`), '<b>de Broglie, 1924</b>: every moving particle has a matter wave', '<b>Faster or heavier</b> → shorter wavelength', '<b>Electron</b>: λ near atom size, so it diffracts · <b>cricket ball</b>: about 10⁻³⁴ m', '<b>SI units first</b>: kg and m/s, then λ comes out in metres'] });
const YQ = ['Write the de Broglie relation, and say what each letter means.', 'Why do we never notice the wave of a cricket ball?', 'Which experiment showed that electrons behave like waves?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 20', topic: 'Where is it, and how fast? Heisenberg Uncertainty Principle', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S2', 'Crest') - 0.2, 1.12, 560, 520], [T0('S3'), 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const w4 = $('#wa .wat'); if (w4 && w4.offsetWidth > 1528) w4.style.fontSize = Math.floor(28 * 1528 / w4.offsetWidth) + 'px';
  ['#dq0', '#dq1', '#dq2', '#dq3'].forEach(s => { const e = $(s); e.style.left = '36px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jv' + i), t, wt('H4', 'wave') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H4', 'Because') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'electron') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'wavelength') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pSci'), t, wt('P2', 'Louis') - 0.15, 1e9, { dy: 14 });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const on = i === 3 ? M.io((t - tQr[i]) / 0.25) : 0; setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P3', 'electrons') - 0.3, out, { dx: 60, dy: 0, ...o });
    const ph = (t * 140) % 50; pTrack.forEach((l, i) => { const x = 784 - ((ph + i * 50) % 800); attr(l, 'x1', x.toFixed(1)); attr(l, 'x2', (x + 24).toFixed(1)); M.hide(l, x < 30 || x > 730); });
    const wu = M.clamp((t - wt('P3', 'waves') + 0.1) / 0.5);
    attr(pW, 'd', wavePath(392, 260, 70, 60 * wu, 60, 724, -t * 6)); pW.style.opacity = wu; fade(pWl, t, wt('P4', 'matter') - 0.1);
    M.vis($('#pP'), t, wt('P4', 'wavelength') - 0.1, 1e9, POP);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tSplit = tS1 + 0.9;
    { const sh = M.spring(t - tSplit, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#ro'), t, tSplit + 0.1, z, { dx: 60, dy: 0, ...o }); M.vis($('#gr'), t, tSplit + 0.35, z, { dy: 36, ...o });
    const v = VK(t), m = MK(t), lam = lamPm(v, m), lpx = lam * 0.2;
    // track moves left at a rate set by v (the electron stays centred, the camera follows it)
    let ph = 0; { const dt = 1 / 30; ph = (t - tS1) * 110 * (t < tFast ? 1 : 1); } const off = ((t - tS1) * 60 * v) % 60;
    track.forEach((l, i) => { const x = 760 - ((off + i * 60) % 1080); attr(l, 'x1', x.toFixed(1)); attr(l, 'x2', (x + 30).toFixed(1)); M.hide(l, x < 24 || x > 740); });
    const wu = M.clamp((t - wt('S2', 'matter') + 0.1) / 0.6);
    attr(bWv, 'd', wavePath(XE, YE, lpx, 70 * wu, 40, 744)); bWv.style.opacity = wu; M.hide(bWv, wu <= 0);
    fade(bE, t, tS1 + 0.3); fade(bEl, t, tS1 + 0.3); fade(trL, t, tS1 + 0.6);
    // lambda bracket between two crests right of the electron
    const c1 = XE + lpx * 0.25 + lpx, c2 = c1 + lpx, by = YE - 70 - 24, bu = M.clamp((t - wt('S2', 'Crest') + 0.1) / 0.3);
    attr(brk, 'd', `M${c1.toFixed(1)},${by + 10} V${by} H${c2.toFixed(1)} V${by + 10}`); brk.style.opacity = bu; attr(brkL, 'x', ((c1 + c2) / 2).toFixed(1)); attr(brkL, 'y', (by - 12).toFixed(1)); brkL.style.opacity = bu;
    const va = M.clamp((t - tS1 - 0.5) / 0.3); if (va > 0) { vArr.set(XE - 40 * 0 + 0, YE + 120, XE + 30 + 36 * v, YE + 120); attr(vL, 'x', (XE + 44 + 36 * v).toFixed(1)); attr(vL, 'y', (YE + 130).toFixed(1)); } else vArr.set(0, 0, 0, 0); vL.style.opacity = va; vArr.g.style.opacity = va;
    attr(bE, 'r', (20 * Math.sqrt(m)).toFixed(1));
    const TAG = [[tS1 + 0.4, 'ELECTRON · 10⁶ m/s'], [tFast, 'FASTER · 3 × 10⁶ m/s'], [wt('S3', 'shorter') - 0.1, 'SHORTER λ'], [tSlow, 'SLOWER · LONGER λ'], [tMass, 'FOUR TIMES THE MASS'], [wt('S5', 'shrinks'), 'HEAVIER · SHORTER λ']];
    let tg0 = null; for (const [tt, s] of TAG) if (t >= tt) tg0 = s; if (tg0) M.setT(btag, tg0); M.vis(btag, t, tS1 + 0.3, 1e9, POP);
    M.setT($('#r0'), m > 1.5 ? `4 × ${sci(ME, 3)} kg` : `${sci(ME, 3)} kg`); M.setT($('#r1'), `${sci(v * 1e6, 1)} m/s`); M.setT($('#r2'), `${Math.round(lam)} pm`);
    RO.forEach((_, i) => M.vis($('#ro' + i), t, tSplit + 0.3 + i * 0.12, 1e9, { dx: -16, dy: 0 }));
    const gu = M.clamp((t - tSplit - 0.6) / 1.0);
    cv1((s) => [s, lamPm(s, 1)], 0.52, 0.52 + (4 - 0.52) * gu); const g4 = M.clamp((t - tMass - 0.2) / 0.8); cv4((s) => [s, lamPm(s, 4)], 0.13 + 0.0, 0.13 + (4 - 0.13) * g4);
    gd(v, Math.min(lam, 1400), gu >= 1); attr(c1L, 'x', G.X(0.6) + 40); attr(c1L, 'y', G.Y(1200)); c1L.style.opacity = gu; attr(c4L, 'x', G.X(1.1)); attr(c4L, 'y', G.Y(360)); c4L.style.opacity = g4;
    M.vis(gEx, t, tMass + 0.2, 1e9, POP);
    // compare
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B2'), { dy: 36, ...o });
    M.vis($('#cm0'), t, wt('B1', 'electron') - 0.1, 1e9, { dy: 16 }); M.vis($('#cm1'), t, wt('B1', 'cricket') - 0.1, 1e9, { dy: 16 }); M.vis(cmG, t, wt('B1', 'cricket'), 1e9, POP);
    cmW.forEach((c, i) => { attr(c.w, 'd', wavePath(368, 230, i ? 400 : 60, i ? 0 : 70, 40, 696, -t * 5)); c.r.style.opacity = M.clamp((t - wt('B1', i ? 'cricket' : 'electron') - 0.5) / 0.3); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Whose') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Its') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dR'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    // particle with momentum (step 1), photon (step 2), flip (step 3), relation (step 4), units (step 5)
    const u1 = M.clamp((t - tDs[0]) / 0.5); dE.style.opacity = u1; if (u1 > 0) dEa.set(580, 340, 580 + 100 * M.io(u1), 340); else dEa.set(0, 0, 0, 0); dEl.style.opacity = u1; attr(dEl, 'x', 600); attr(dEl, 'y', 310);
    const ph = M.clamp((t - tDs[1]) / 0.6); let d = ''; for (let x = 470; x <= 470 + 260 * ph; x += 3) d += (d ? 'L' : 'M') + x + ',' + (120 + Math.sin(x / 26 * Math.PI * 2 - t * 8) * 14).toFixed(1); attr(dPh, 'd', d); M.hide(dPh, ph <= 0);
    PUC.write($('#dq0'), t, tDs[1] + 0.1, 0.6); M.draw(dFlip, t, tDs[2], 0.4); PUC.write($('#dq1'), t, tDs[2] + 0.3, 0.7);
    PUC.write($('#dq2'), t, tDs[3] + 0.2, 0.7); M.draw(dBox, t, tDs[3] + 0.9, 0.6); PUC.write($('#dq3'), t, tDs[4] + 0.3, 0.8);
    // move the particle down out of the way once the relation is written
    attr(dE, 'cy', 340);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Everything') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'show') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(ruler, t, T0('W2') + 0.5, 0.6); fade(ticks, t, T0('W2') + 0.8);
    fade(pinA, t, T0('W3')); fade(pinE, t, wt('W6', 'Lambda') - 0.1); fade(pinB, t, wt('W7', 'cricket') - 0.1);
    M.vis($('#wEx'), t, wt('W7', 'cricket'), 1e9, POP);
    M.vis($('#wGp'), t, wt('W6', 'atom') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cw'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const tb = wt('C1', 'beam') - 0.2;
    beamD.forEach((d, i) => { const u = ((t - tb) * 1.4 + i / 12) % 1; const x = 130 + u * 160; attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', 275); M.hide(d, t < tb); });
    const nH = Math.floor(M.clamp((t - wt('C1', 'diffraction')) / (wt('C2', 'waves') - wt('C1', 'diffraction') + 0.4)) * HITS.length);
    hitE.forEach((e, i) => M.hide(e, i >= nH));
    M.vis($('#cwP'), t, wt('C2', 'rings') - 0.1, 1e9, POP);
    M.vis($('#cp'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    tCq.forEach((tt, i) => { M.vis($('#cq' + i), t, tt - 0.15, 1e9, { dy: 14 }); if (i < 2) M.vis(cqW[i], t, tt, 1e9, { dy: 0 }); });
    avA(t, wt('C3', 'detail') + 0.4, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'grams') - 0.3, tStrike: T0('X3') + 0.1, tRight: wt('X3', 'Mass') - 0.1 });
    fade(cv1g, t, wt('X3', 'kilograms') - 0.2); fade(cv2g, t, wt('X3', 'metres') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'ratio'), tCount, tAns });
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
