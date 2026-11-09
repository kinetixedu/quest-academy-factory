// PUC Chemistry Ep 65: Acids, bases and salts (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: proton H+ gold, electron pair e- orange, water O / OH- violet, N / NH3 / NH4+ teal, Cl / F blue, B ink
const NC = C.ac, HC = C.ink, GC = '#B7791F', XC = '#C8461B', BC = '#2F6FEB', VC = '#7A4FE0', OK = C.ok, RD = C.red, HG = '#C9CFDA', LR = '#D8574A', LB = '#3E7BD6';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const cG = s => `\\textcolor{${GC}}{${s}}`, cN = s => `\\textcolor{${NC}}{${s}}`, cV = s => `\\textcolor{${VC}}{${s}}`, cB = s => `\\textcolor{${BC}}{${s}}`, cX = s => `\\textcolor{${XC}}{${s}}`, cO = s => `\\textcolor{${OK}}{${s}}`;
const Hp = cG('\\mathrm{H^+}');
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill, x = 0, y = 0) => mk(p, 'circle', { r, fill, cx: x, cy: y });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const lab = (p, x, y, s, col, size = 18, anc = 'middle') => txt(p, x, y, s, { 'text-anchor': anc, 'font-size': size, fill: col, 'font-weight': 600 });
const tr = (e, x, y) => attr(e, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const water = (p, s = 1, hcol = HG) => { const g = mk(p, 'g', {}); const h1 = dot(g, 9 * s, HG, -20 * s, 15 * s), h2 = dot(g, 9 * s, hcol, 20 * s, 15 * s); dot(g, 17 * s, VC); return { g, h2 }; };
const tile = (par, id, top, html) => { const d = document.createElement('div'); d.className = 'atile'; d.id = id; d.style.top = top + 'px'; d.innerHTML = html; par.appendChild(d); return d; };

Object.assign(M.IC, {
  lemon: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 2v20', 'M2 12h20', 'm5 5 14 14', 'm19 5-14 14'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flask: ['M10 2v7.31', 'M14 9.3V2', 'M8.5 2h7', 'M14 9.3a6.5 6.5 0 1 1-4 0', 'M5.52 16h12.96'],
  bike: ['M5.5 14a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M18.5 14a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10 12 17.5', 'M8 6h3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQq = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQq, tQq + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['lemon', 'Lemon juice', 'TASTES SOUR', 'Lemon', 'SOUR', XC], ['drop', 'Soap', 'FEELS SLIPPERY', 'Soap', 'SLIPPERY', BC], ['flask', 'Acid + base', 'MAKES A SALT', 'salt', 'SALT', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Soapy water: slippery hands', 'slippery', 'H3'], ['A squeeze of lemon: sour', 'sour', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('bike', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: what we notice ---------- */
const QR = [['Acids: sour', 'BLUE → RED', 'P2', 'sour', LR], ['Bases: bitter, soapy', 'RED → BLUE', 'P3', 'bitter', LB], ['Acid + base meet', 'SALT + WATER', 'P4', 'meet', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const strip = (x, c0) => { const g = mk(ps, 'g', {}); mk(g, 'rect', { x, y: 110, width: 110, height: 280, rx: 10, fill: c0 }); const o = mk(g, 'rect', { x, y: 390, width: 110, height: 0, rx: 10, fill: c0 }); return { g, o }; };
const s1 = strip(170, LB), s2 = strip(500, LR); attr(s1.o, 'fill', LR); attr(s2.o, 'fill', LB);
const pl1 = lab(ps, 225, 430, 'BLUE LITMUS', LB, 18), pl2 = lab(ps, 555, 430, 'RED LITMUS', LR, 18);
const pa1 = lab(ps, 225, 90, '+ ACID', LR, 20), pa2 = lab(ps, 555, 90, '+ BASE', LB, 20);

/* ---------- S: Arrhenius bench ---------- */
const b = $('#bS');
const bk = mk(b, 'path', { d: 'M110 120 V420 a20 20 0 0 0 20 20 H590 a20 20 0 0 0 20 -20 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const wat = mk(b, 'rect', { x: 112, y: 170, width: 496, height: 268, fill: '#E8F3FA' });
const WP = [[170, 220], [300, 380], [170, 380], [520, 220], [560, 380], [300, 220], [430, 400]];
const Ws = WP.map(([x, y], i) => { const w = water(b, 1); tr(w.g, x, y); return { ...w, x, y, ph: rnd(i, 1) * 6.28 }; });
const W0 = { x: 440, y: 300 }; const w0 = water(b, 1); tr(w0.g, W0.x, W0.y);
const hcl = mk(b, 'g', {}); const cl = dot(hcl, 20, BC), hh = dot(hcl, 10, GC, 30, 0);
const hP = lab(b, 0, 0, '+', GC, 22), clM = lab(b, 0, 0, '−', '#fff', 26);
const lH3O = lab(b, W0.x, W0.y + 64, 'H₃O⁺', GC, 22), lCl = lab(b, 0, 0, 'Cl⁻', BC, 22);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#eS').style.display = 'none';
const AT = [[K(`\\mathrm{HCl(aq)} \\to ${Hp} + ${cB('\\mathrm{Cl^-}')}`), 'S2', 'splits'], [K(`${Hp} + ${cV('\\mathrm{H_2O}')} \\to ${cG('\\mathrm{H_3O^+}')}`), 'S4', 'hydronium'], [K(`\\mathrm{NaOH(aq)} \\to \\mathrm{Na^+} + ${cV('\\mathrm{OH^-}')}`), 'S5', 'base'], [`<span style="color:${RD};font:600 26px Poppins">Weak spot: only in water. NH₃ has no OH.</span>`, 'S6', 'weak']];
const atT = AT.map(([h], i) => tile($('#eb'), 'at' + i, 84 + i * 104, `<div style="font-size:32px">${h}</div>`));
const tAt = AT.map(a => wt(a[1], a[2]) - 0.1);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the H⁺ never floats alone!' });

/* ---------- L: Bronsted-Lowry ---------- */
const ls = $('#lS');
const gv = mk(ls, 'g', {}); mk(gv, 'circle', { cx: 200, cy: 170, r: 64, fill: C.soft, stroke: NC, 'stroke-width': 4 }); lab(gv, 200, 176, 'ACID', NC, 22); lab(gv, 200, 270, 'GIVES H⁺', NC, 18);
const tk = mk(ls, 'g', {}); mk(tk, 'circle', { cx: 680, cy: 170, r: 64, fill: C.soft, stroke: BC, 'stroke-width': 4 }); lab(tk, 680, 176, 'BASE', BC, 22); lab(tk, 680, 270, 'TAKES H⁺', BC, 18);
const ball = dot(ls, 18, GC); const bPl = lab(ls, 0, 0, '+', '#fff', 22);
const arc = mk(ls, 'path', { d: 'M240 110 Q440 20 640 110', stroke: GC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' });
$('#lEq').innerHTML = K(`${Hp} = \\text{one proton}`);
const GT = [['\\text{Acid}', 'PROTON GIVER', 'DONATES H⁺', NC, wt('L2', 'acid')], ['\\text{Base}', 'PROTON TAKER', 'ACCEPTS H⁺', BC, wt('L2', 'base')], ['\\text{Reaction}', 'ONE H⁺ PASSES', 'FROM GIVER TO TAKER', GC, wt('L3', 'proton')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: NH3 + H2O ---------- */
const MS = [[K(`${cN('\\mathrm{NH_3}')} + ${cV('\\mathrm{H_2O}')}`), 'D2'], [K(`${cV('\\mathrm{H_2O}')}\\ \\text{gives}\\ ${Hp}\\ \\text{to}\\ ${cN('\\mathrm{NH_3}')}`), 'D3'], [K(`\\mathrm{NH_3 + H_2O} \\rightleftharpoons ${cN('\\mathrm{NH_4^+}')} + ${cV('\\mathrm{OH^-}')}`), 'D4'], [K(`${cN('\\mathrm{NH_4^+}')}: \\text{acid}, \\quad ${cV('\\mathrm{OH^-}')}: \\text{base}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 118}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const nh3 = mk(ds, 'g', {}); [[-62, 44], [62, 44], [0, 74]].forEach(([x, y]) => dot(nh3, 20, HG, x, y)); dot(nh3, 46, NC); dot(nh3, 9, XC, -14, -62); dot(nh3, 9, XC, 14, -62); tr(nh3, 220, 270);
const h2o = water(ds, 2.4, GC); tr(h2o.g, 560, 270);
const prt = dot(ds, 20, GC); const pPl = lab(ds, 0, 0, '+', '#fff', 24);
const dN = lab(ds, 220, 150, 'NH₃', NC, 28), dW = lab(ds, 560, 150, 'H₂O', VC, 28);
const dR1 = lab(ds, 220, 410, '', NC, 24), dR2 = lab(ds, 560, 410, '', VC, 24);
const dBk = mk(ds, 'path', { d: 'M260 450 Q392 510 520 450', stroke: GC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' }), dBl = lab(ds, 392, 540, 'IT CAN GIVE THE H⁺ BACK', GC, 18);

/* ---------- G: conjugate pairs ---------- */
const GR = [['A pair differs by one H⁺', 'PAIR', 'G2', 'pair', GC], ['NH₃ and NH₄⁺', 'PAIR 1', 'G3', 'Ammonia', NC], ['H₂O and OH⁻', 'PAIR 2', 'G3', 'Water', VC], ['Strong acid: weak partner', 'STRENGTH', 'G4', 'strong', RD]];
$('#grs').innerHTML = GR.map(([k, v, , , c], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${k}</div><div class="qk" style="color:${c}">${v}</div></div>`).join('');
const tGr = GR.map(g => wt(g[2], g[3]) - 0.1);
const gs = $('#gS');
const SP = [['NH₃', 110, NC], ['+', 200, HC], ['H₂O', 290, VC], ['⇌', 392, HC], ['NH₄⁺', 494, NC], ['+', 584, HC], ['OH⁻', 674, VC]].map(([s, x, c]) => lab(gs, x, 210, s, c, 34));
const RO = [['BASE', 110], ['ACID', 290], ['CONJ. ACID', 494], ['CONJ. BASE', 674]].map(([s, x]) => lab(gs, x, 256, s, C.mute, 16));
const a1 = mk(gs, 'path', { d: 'M110 170 Q302 70 494 170', stroke: NC, 'stroke-width': 4, fill: 'none' }), a2 = mk(gs, 'path', { d: 'M290 274 Q482 374 674 274', stroke: VC, 'stroke-width': 4, fill: 'none' });
const a1l = lab(gs, 302, 104, 'PAIR 1 · + H⁺', NC, 16), a2l = lab(gs, 482, 352, 'PAIR 2 · − H⁺', VC, 16);
const gSt = mk(gs, 'g', {}); mk(gSt, 'rect', { x: 50, y: 400, width: 684, height: 64, rx: 12, fill: C.soft }); lab(gSt, 392, 440, 'HCl: STRONG ACID → Cl⁻: VERY WEAK BASE', RD, 20);
const gAm = lab(gs, 392, 520, 'WATER: ACID OR BASE · AMPHOTERIC', VC, 20);

/* ---------- C: water both ways ---------- */
const cEq = (par, tex) => { const d = document.createElement('div'); d.className = 'fx fxc'; d.style.cssText = 'top:84px;font-size:32px'; d.innerHTML = K(tex); par.appendChild(d); return d; };
const caE = cEq($('#ca'), `${cV('\\mathrm{H_2O}')} + \\mathrm{NH_3} \\to ${cV('\\mathrm{OH^-}')} + \\mathrm{NH_4^+}`), cfE = cEq($('#cf'), `\\mathrm{HCl} + ${cV('\\mathrm{H_2O}')} \\to \\mathrm{Cl^-} + \\mathrm{H_3O^+}`);
const cW = (p, out) => { const g = mk(p, 'g', {}); const w = water(g, 2.6, out ? GC : HG); tr(w.g, 290, 280); const pr = dot(g, 18, GC); mk(g, 'path', { d: out ? 'M370 319 H540' : 'M540 319 H380', stroke: GC, 'stroke-width': 6, 'stroke-dasharray': '10 8', fill: 'none' }); return { g, pr }; };
const cA = cW($('#caS'), 1), cB2 = cW($('#cfS'), 0);
const cAv = lab($('#caS'), 392, 470, 'WATER GIVES H⁺ = ACID', OK, 24), cBv = lab($('#cfS'), 392, 470, 'WATER TAKES H⁺ = BASE', BC, 24);
const th1 = PUC.think($('#th1'), { q: 'HCl gives its proton to water. What is left as the conjugate base?', opts: ['Cl⁻', 'H₃O⁺'], right: 0, why: 'Cl⁻. Take one proton away from HCl and you get Cl⁻.' });

/* ---------- R: Lewis ---------- */
const RR = [['<span class="stx tx">Lewis base: gives an electron pair</span>', 'R2', 'base', 1], ['<span class="stx tx">Lewis acid: takes an electron pair</span>', 'R2', 'acid', 1], [K(`\\mathrm{BF_3} + {${cX(':')}}${cN('\\mathrm{NH_3}')} \\to \\mathrm{F_3B}${cX('{:}')}${cN('\\mathrm{NH_3}')}`), 'R4', 'shares'], ['<span class="stx tx">Acids: AlCl₃, Mg²⁺ · Bases: H₂O, NH₃, OH⁻</span>', 'R5', 'Electron', 1]];
$('#rrs').innerHTML = RR.map(([s, , , tx], i) => `<div class="dr" id="rr${i}" style="top:${96 + i * 96}px"><div class="sn">${i + 1}</div>${tx ? s : `<div class="stx">${s}</div>`}</div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
$('#rP').innerHTML = `Lewis: electron pairs, no proton needed`;
const ks = $('#kS');
const KM = mk(ks, 'g', { transform: 'translate(400,260) scale(1.6) translate(-400,-260)' });
const bf = mk(KM, 'g', {}); [90, 210, 330].forEach(a => { const r = a * Math.PI / 180; mk(bf, 'line', { x1: 0, y1: 0, x2: 56 * Math.cos(r + Math.PI), y2: 56 * Math.sin(r + Math.PI), stroke: C.ink2, 'stroke-width': 4 }); dot(bf, 15, BC, 56 * Math.cos(r + Math.PI), 56 * Math.sin(r + Math.PI)); }); dot(bf, 22, HC); lab(bf, 0, 7, 'B', '#fff', 20); tr(bf, 250, 260);
const room = mk(KM, 'circle', { cx: 294, cy: 260, r: 14, fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '5 5' }); const roomL = lab(ks, 180, 130, 'ROOM FOR 2 e⁻', XC, 18);
const nh = mk(KM, 'g', {}); [[30, -26], [30, 26], [44, 0]].forEach(([x, y]) => dot(nh, 10, HG, x, y)); dot(nh, 24, NC); lab(nh, 0, 7, 'N', '#fff', 20);
const ep = [dot(KM, 6, XC), dot(KM, 6, XC)]; const lpL = lab(ks, 620, 130, 'LONE PAIR', XC, 18);
const kA = lab(ks, 170, 420, 'LEWIS ACID', GC, 22), kB = lab(ks, 520, 420, 'LEWIS BASE', NC, 22), kBond = lab(ks, 392, 470, 'A NEW BOND FROM THE SHARED PAIR', XC, 18);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{Arrhenius: } ${Hp}\\text{ in water} \\qquad \\text{Brönsted: } ${Hp}\\text{ passes} \\qquad \\text{Lewis: } ${cX('\\text{e}^-\\text{ pair}')}`);

/* ---------- W: conjugate bases ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`-\\,${Hp} \\Rightarrow \\text{charge} - 1`)],
  [K('\\mathrm{HF \\to F^-}')],
  [K('\\mathrm{H_2SO_4 \\to HSO_4^-, \\quad HCO_3^- \\to CO_3^{2-}}')],
  [K(`\\mathrm{NH_3} + ${Hp} \\to ${cN('\\mathrm{NH_4^+}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 94 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const WR = [['HF', 'F⁻', '− H⁺'], ['H₂SO₄', 'HSO₄⁻', '− H⁺'], ['HCO₃⁻', 'CO₃²⁻', '− H⁺'], ['NH₃', 'NH₄⁺', '+ H⁺']].map(([a, c, k], i) => { const g = mk(ws, 'g', {}); mk(g, 'rect', { x: 50, y: 80 + i * 100, width: 684, height: 80, rx: 12, fill: C.soft }); lab(g, 170, 130 + i * 100, a, i < 3 ? HC : NC, 30); mk(g, 'rect', { x: 332, y: 102 + i * 100, width: 120, height: 36, rx: 9, fill: '#fff', stroke: GC, 'stroke-width': 2 }); lab(g, 392, 127 + i * 100, k, GC, 18); lab(g, 614, 130 + i * 100, c, i < 3 ? VC : NC, 30); return g; });
const tWr = [T0('W4'), wt('W5', 'Sulphuric'), wt('W5', 'Hydrogen'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K('\\mathrm{HCO_3^- \\to CO_3^{-}}'), right: K(`\\mathrm{HCO_3^- \\to CO_3^{2-}}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'H⁺ CARRIES +1', { 'font-size': 28, fill: GC, 'font-weight': 600 }), tq2 = txt(tsv, 60, 170, 'REMOVE IT: CHARGE − 1', { 'font-size': 28, fill: HC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Conjugate acid or base of a species; classify Lewis acids and bases; Lewis but not Brönsted' });
const OPT = ['\\mathrm{NH_4^+}', '\\mathrm{BF_3}', '\\mathrm{H_2O}', '\\mathrm{HCl}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which of these is a Lewis acid but NOT a Brönsted-Lowry acid?', qW: 780,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [['BF₃ has no H⁺ to give'], ['B has room for an e⁻ pair'], ['NH₄⁺, H₂O, HCl all give H⁺']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Acids, bases and salts', y0: 96, dy: 74, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Arrhenius</b>: acid gives H⁺ (as H₃O⁺), base gives OH⁻, in water only', '<b>Brönsted-Lowry</b>: acid = proton giver, base = proton taker', '<b>Conjugate pair</b>: differs by one H⁺ · NH₃/NH₄⁺, H₂O/OH⁻ · water is amphoteric',
    '<b>Lewis</b>: acid takes an electron pair (BF₃, AlCl₃, Mg²⁺), base gives one (NH₃, H₂O, OH⁻)', '<b>Remove H⁺</b>: charge drops by one · HCO₃⁻ → CO₃²⁻ · acid + base → salt + water'] });
const YQ = ['What does a Brönsted base do?', 'Write the conjugate base of H₂SO₄.', 'Why is boron trifluoride a Lewis acid?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 66', topic: 'Even pure water splits a little. Ionization of Water and the pH Scale', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQq - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T0('S5') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 150; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 660) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 660 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
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
    const tBd = [wt('H2', 'years'), wt('H2', 'question'), wt('H2', 'acid')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'exactly') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'three') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    [s1.g, s2.g, pl1, pl2].forEach(e => fade(e, t, tP1 + 0.6));
    const u1 = M.io((t - wt('P2', 'red')) / 0.9), u2 = M.io((t - wt('P3', 'blue')) / 0.9);
    attr(s1.o, 'y', (390 - 280 * u1).toFixed(1)); attr(s1.o, 'height', (280 * u1).toFixed(1)); attr(s2.o, 'y', (390 - 280 * u2).toFixed(1)); attr(s2.o, 'height', (280 * u2).toFixed(1));
    fade(pa1, t, wt('P2', 'turn') - 0.3); fade(pa2, t, wt('P3', 'turn') - 0.3);
    M.vis($('#pP'), t, wt('P4', 'Hydrochloric') - 0.1, 1e9, POP);
  }

  /* S: Arrhenius */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, tAt[0] - 0.3, z, { dx: 60, dy: 0, ...o });
    fade(bk, t, tS1 + 0.2); fade(wat, t, tS1 + 0.3);
    Ws.forEach((w, i) => { tr(w.g, w.x + 4 * Math.sin(t * 2 + w.ph), w.y + 4 * Math.cos(t * 1.7 + w.ph)); fade(w.g, t, tS1 + 0.4 + i * 0.05); }); fade(w0.g, t, tS1 + 0.5); tr(w0.g, W0.x, W0.y);
    const td = wt('S1', 'drop'), ts = wt('S2', 'splits'), tg = wt('S4', 'grabs');
    const dy = M.lerp(40, 280, M.io((t - td) / 1.0)); tr(hcl, 260, dy); fade(hcl, t, td - 0.2);
    const sp = M.io((t - ts) / 0.7), gr = M.io((t - tg) / 0.9);
    const clx = -30 * sp, hx0 = 30 + 70 * sp, hy0 = -30 * sp;
    attr(cl, 'cx', clx.toFixed(1)); const hx = M.lerp(260 + hx0, W0.x + 20, gr), hy = M.lerp(dy + hy0, W0.y - 24, gr); pos(hh, hx - 260, hy - dy);
    tr(hP, hx, hy + 7); fade(hP, t, ts + 0.3); tr(clM, 260 + clx, dy + 8); fade(clM, t, ts + 0.3);
    tr(lCl, 260 + clx, dy + 52); fade(lCl, t, ts + 0.5); fade(lH3O, t, tg + 0.8);
    const TAG = [[tS1 + 0.3, 'HCl INTO WATER'], [ts, 'IT SPLITS INTO IONS'], [T0('S3'), 'ACID: GIVES H⁺'], [tg, 'H⁺ + H₂O → H₃O⁺'], [T0('S5'), 'BASE: GIVES OH⁻'], [T0('S6'), 'ONLY IN WATER']];
    let tgS = null; for (const [tt, s] of TAG) if (t >= tt) tgS = s; if (tgS) M.setT(btag, tgS); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    atT.forEach((el, i) => M.vis(el, t, tAt[i], 1e9, { dy: 16 }));
    avA(t, wt('S4', 'hydronium') + 0.8, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    fade(gv, t, wt('L1', 'ball') - 0.3); fade(tk, t, wt('L1', 'ball'));
    const tp = wt('L3', 'passing'), u = M.io((t - tp) / 1.0); const bx = M.lerp(240, 640, u), by = 110 - 4 * 50 * u * (1 - u) * 1.8 + (u > 0.98 ? 0 : 0);
    pos(ball, bx, by); tr(bPl, bx, by + 7); fade(ball, t, wt('L1', 'ball')); fade(bPl, t, wt('L1', 'ball')); fade(arc, t, tp - 0.4);
    PUC.write($('#lEq'), t, wt('L2', 'proton') - 0.2, 0.8);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.3, 1e9, { dy: 24 }); const on = M.io((t - g[4]) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4]) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    fade(nh3, t, wt('D2', 'Ammonia')); fade(h2o.g, t, wt('D2', 'water')); fade(dN, t, wt('D2', 'Ammonia')); fade(dW, t, wt('D2', 'water'));
    const tg = wt('D3', 'gives'), u = M.io((t - tg) / 1.0); h2o.h2.style.opacity = t > tg ? 0 : 1;
    const px = M.lerp(608, 280, u), py = M.lerp(306, 222, u) - 90 * Math.sin(Math.PI * u); pos(prt, px, py); tr(pPl, px, py + 8); fade(prt, t, tg); fade(pPl, t, tg);
    const t4 = T0('D4'), t5 = wt('D5', 'Ammonium');
    M.setT(dN, t >= t4 ? 'NH₄⁺' : 'NH₃'); M.setT(dW, t >= t4 ? 'OH⁻' : 'H₂O');
    M.setT(dR1, t >= t5 ? 'ACID' : 'BASE'); M.setT(dR2, t >= wt('D5', 'Hydroxide') ? 'BASE' : 'ACID'); fade(dR1, t, wt('D3', 'base')); fade(dR2, t, wt('D3', 'acid'));
    dR1.setAttribute('fill', t >= t5 ? GC : NC); dR2.setAttribute('fill', t >= wt('D5', 'Hydroxide') ? BC : GC);
    fade(dBk, t, wt('D5', 'backward')); fade(dBl, t, wt('D5', 'back'));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tGr[i + 1] : T1('G5') + 0.4; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    SP.forEach((e, i) => fade(e, t, tG1 + 0.6 + i * 0.08)); RO.forEach((e, i) => fade(e, t, tGr[0] + i * 0.1));
    M.draw(a1, t, tGr[1], 0.7); fade(a1l, t, tGr[1] + 0.5); M.draw(a2, t, tGr[2], 0.7); fade(a2l, t, tGr[2] + 0.5);
    fade(gSt, t, tGr[3]); fade(gAm, t, wt('G5', 'amphoteric') - 0.2);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'hydrochloric') - 0.3, zc, { dx: 60, dy: 0, ...o });
    const ta = wt('C1', 'ammonia'), th = wt('C1', 'hydrochloric');
    M.vis(caE, t, ta, 1e9, { dy: 10 }); M.vis(cfE, t, th, 1e9, { dy: 10 }); fade(cA.g, t, ta); fade(cB2.g, t, th);
    const ua = M.io((t - wt('C1', 'gives')) / 0.9), ub = M.io((t - wt('C1', 'takes')) / 0.9);
    pos(cA.pr, M.lerp(342, 560, ua), 319 - 70 * Math.sin(Math.PI * ua)); pos(cB2.pr, M.lerp(560, 342, ub), 319 - 70 * Math.sin(Math.PI * ub));
    fade(cAv, t, wt('C1', 'acid')); fade(cBv, t, wt('C1', 'base'));
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'what') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Take') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); const s = r.querySelector('.stx'); if (i !== 2) M.vis(s, t, tRr[i], 1e9, { dy: 10 }); else PUC.write(s, t, tRr[i], 0.9); });
    M.vis($('#rP'), t, wt('R2', 'pairs') - 0.2, 1e9, POP);
    M.vis($('#rb'), t, tR1 + 0.3, z, { dx: 60, dy: 0, ...o });
    const t3 = T0('R3'), tsh = wt('R4', 'shares'), u = M.io((t - tsh) / 1.2);
    fade(bf, t, wt('R3', 'Boron') - 0.2); fade(room, t, wt('R3', 'short')); fade(roomL, t, wt('R3', 'short'), tsh + 0.4);
    const nx0 = M.lerp(560, 380, u); tr(nh, nx0, 260); fade(nh, t, wt('R3', 'Ammonia') - 0.2);
    const ex = M.lerp(nx0 - 34, 318, u * u); pos(ep[0], ex, 251); pos(ep[1], ex, 269); ep.forEach(e => fade(e, t, wt('R3', 'Ammonia')));
    fade(lpL, t, wt('R3', 'lone'), tsh + 0.4); room.style.opacity = t > tsh + 1 ? 0 : room.style.opacity;
    fade(kA, t, wt('R4', 'acid')); fade(kB, t, wt('R4', 'base')); fade(kBond, t, wt('R4', 'bond'));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Bronsted') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Lewis') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'pairs') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    WR.forEach((g, i) => fade(g, t, tWr[i]));
    M.vis($('#wG'), t, T0('W6') + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQq + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'forget') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'becomes') - 0.2 });
    fade(tq1, t, wt('X3', 'plus')); fade(tq2, t, wt('X3', 'drops'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQq && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQq + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQq, tOpts: wt('Q1', 'ammonium') - 1.0, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
