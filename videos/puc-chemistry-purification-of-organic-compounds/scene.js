// PUC Chemistry Ep 86: Purification of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: our compound / chloroform teal, aniline violet, water blue, solvent orange, junk red-grey, spot A pink, spot B gold
const CHL = C.ac, ANI = '#7A4FE0', WAT = '#2F6FEB', SOL = '#D9731A', HC = C.ink, GC = '#B7791F', OK = C.ok, RD = C.red, SPA = '#C2338A', JNK = '#8A6B5A';
const WATL = '#D6E6FB', SOLL = '#FBE3C4', PALE = '#EEF3DC';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const place = (g, x, y, r = 0) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})${r ? ` rotate(${r.toFixed(2)})` : ''}`);
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
const lab = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-size': 19, fill: col, 'font-weight': 600 }, a));
const fillC = (el, c) => { if (el._f !== c) { el._f = c; attr(el, 'fill', c); } };
const RF = tc(SPA, 'd_{\\text{spot}}'), RS = tc(SOL, 'd_{\\text{solvent}}');
const RFX = `R_f = \\dfrac{${RF}}{${RS}}`;
// conical flask at (x, y = base), scale s; returns {g, liq}
const flask = (p, x, y, s = 1, col = PALE) => { const g = mk(p, 'g', {}); const w = 100 * s, n = 20 * s, h = 112 * s, nk = 36 * s;
  const liq = mk(g, 'path', { d: `M${x - w * 0.62} ${y - h * 0.38} L${x - w} ${y} H${x + w} L${x + w * 0.62} ${y - h * 0.38} Z`, fill: col });
  mk(g, 'path', { d: `M${x - n} ${y - h - nk} V${y - h * 0.68} L${x - w} ${y} H${x + w} L${x + n} ${y - h * 0.68} V${y - h - nk}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  return { g, liq }; };
const beaker = (p, x, y, w, h) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: `M${x - w / 2} ${y - h} V${y} H${x + w / 2} V${y - h}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); return g; };
const flame = (p, x, y) => mk(p, 'path', { d: `M${x} ${y - 34} C${x + 14} ${y - 18} ${x + 14} ${y} ${x} ${y} C${x - 14} ${y} ${x - 14} ${y - 18} ${x} ${y - 34} Z`, fill: SOL });

Object.assign(M.IC, {
  strainer: ['M3 9h12a6 6 0 0 1-12 0z', 'M15 10l6-3', 'M6 12h6', 'M7 14.5h4'],
  salt: ['M12 4l7 7-7 9-7-9z', 'M5 11h14'],
  ball: ['M12 4a8 8 0 1 0 0.01 0', 'M8 10a2 2 0 0 1 3-1'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tB1 = T0('B1'), tS1 = T0('S1'), tD1 = T0('D1'), tG1 = T0('G1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['strainer', 'Tea strainer', 'LEAVES STAY BACK', 'SIZE'], ['salt', 'Sea water', 'SALT LEFT BEHIND', 'DRYING'], ['ball', 'Naphthalene', 'SHRINKS, NEVER MELTS', 'VAPOUR']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'strainer'), wt('H1', 'Sea'), wt('H2', 'naphthalene')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, bd], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${CHL}">${bd}</div></div>`).join('');
const KIT = [['Mum strains the tea', 'strain', 'H3'], ['One difference per trick', 'difference', 'H3']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon(i ? 'salt' : 'strainer', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: the job ---------- */
const QR = [['New compound + junk', 'MIXTURE', 'P1', 'mixed', RD], ['Find one property that differs', 'THE KEY', 'P2', 'property', CHL], ['Each difference has a method', 'FIVE', 'P3', 'Turns', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const PM = [['Solid turns to vapour', 'Sublimation', 'vapour'], ['Dissolves better when hot', 'Crystallisation', 'Dissolves'], ['Different boiling points', 'Distillation', 'Different'], ['Prefers another liquid', 'Extraction', 'Prefers'], ['Sticks differently', 'Chromatography', 'Sticks']];
$('#pms').innerHTML = PM.map(([q, a], i) => `<div class="pm" id="pm${i}" style="top:${84 + i * 92}px"><span class="pq">${q}</span><span style="color:${C.mute};font:600 24px 'IBM Plex Mono'">→</span><span class="pa" style="color:${CHL}">${a}</span></div>`).join('');
const tPm = PM.map(r => wt('P3', r[2]));

/* ---------- B: sublimation + crystallisation ---------- */
const bs = $('#baS');
const bFl = flame(bs, 392, 470);
const bDish = mk(bs, 'path', { d: 'M262 400 Q392 470 522 400', stroke: C.ink2, 'stroke-width': 5, fill: '#fff', 'stroke-linecap': 'round' });
const bMound = mk(bs, 'ellipse', { cx: 392, cy: 418, rx: 80, ry: 16, fill: CHL });
const bJunk = [[350, 424], [380, 428], [410, 426], [440, 422], [366, 420]].map(([x, y]) => mk(bs, 'circle', { cx: x, cy: y, r: 6, fill: JNK }));
const bFun = mk(bs, 'path', { d: 'M272 396 L392 200 L512 396 M380 220 V120 M404 220 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const bPlug = mk(bs, 'rect', { x: 378, y: 108, width: 28, height: 18, rx: 6, fill: '#E9E5DA' });
const bVap = Array.from({ length: 8 }, (_, i) => mk(bs, 'circle', { r: 6, fill: CHL }));
const bCry = Array.from({ length: 12 }, (_, i) => { const side = i % 2 ? 1 : -1, k = Math.floor(i / 2), y = 360 - k * 26, x = 392 + side * ((396 - y) * 120 / 196 - 14); return mk(bs, 'path', { d: `M${x} ${y - 9} L${x + 7} ${y} L${x} ${y + 9} L${x - 7} ${y} Z`, fill: CHL }); });
const bL = [lab(bs, 528, 260, '← COLD FUNNEL: PURE SOLID', CHL), lab(bs, 536, 432, '← JUNK STAYS IN DISH', RD), lab(bs, 418, 466, 'HEAT', SOL), lab(bs, 60, 520, 'CAMPHOR · NAPHTHALENE', HC, { 'font-size': 20, 'font-weight': 700 })];
const CR = [['Dissolve in hot solvent', 'B3', 'Dissolve'], ['Filter while hot', 'B4', 'Filter'], ['Cool: pure crystals grow', 'B4', 'crystals'], ['Charcoal for colour · repeat', 'B5', 'charcoal']];
$('#bbs').innerHTML = CR.map(([s], i) => `<div class="rowl" id="cr${i}" style="top:${96 + i * 84}px;width:470px"><span class="sn" style="flex:none;width:36px;height:36px;border-radius:50%;background:var(--ac);color:#fff;font:700 18px Poppins;display:flex;align-items:center;justify-content:center">${i + 1}</span><span>${s}</span></div>`).join('') + `<div class="pillp" id="bbP" style="left:36px;top:478px">Impurities stay dissolved</div>`;
const tCr = CR.map(r => wt(r[1], r[2]));
const bb = $('#bbS');
const cLiq = mk(bb, 'rect', { x: 574, y: 330, width: 132, height: 120, fill: '#E8D7A8' });
const cBk = beaker(bb, 640, 450, 140, 200);
const cFun = mk(bb, 'path', { d: 'M590 170 H690 L652 222 V262 M628 222 V262 L590 170', stroke: C.ink2, 'stroke-width': 4, fill: '#fff', 'stroke-linejoin': 'round' });
const cCry = Array.from({ length: 7 }, (_, i) => { const x = 590 + i * 17, y = 436 - (i % 2) * 8; return mk(bb, 'path', { d: `M${x} ${y - 9} L${x + 7} ${y} L${x} ${y + 9} L${x - 7} ${y} Z`, fill: CHL }); });
const cTx = lab(bb, 640, 500, '', HC, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700 });

/* ---------- S: distillation bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="rbf86"><circle cx="170" cy="400" r="68"/></clipPath>';
const sFl = flame(b, 170, 520);
const sLiq = mk(b, 'rect', { x: 100, y: 410, width: 140, height: 70, fill: '#B9C8F0', 'clip-path': 'url(#rbf86)' });
mk(b, 'path', { d: 'M155 340 A68 68 0 1 0 185 340 V230 H155 Z', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
mk(b, 'line', { x1: 185, y1: 262, x2: 262, y2: 300, stroke: C.ink2, 'stroke-width': 10, 'stroke-linecap': 'round' });
mk(b, 'line', { x1: 185, y1: 262, x2: 262, y2: 300, stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(b, 'line', { x1: 262, y1: 300, x2: 560, y2: 440, stroke: C.ink2, 'stroke-width': 46 });
mk(b, 'line', { x1: 262, y1: 300, x2: 560, y2: 440, stroke: WATL, 'stroke-width': 40 });
mk(b, 'line', { x1: 240, y1: 290, x2: 600, y2: 459, stroke: C.ink2, 'stroke-width': 12, 'stroke-linecap': 'round' });
mk(b, 'line', { x1: 240, y1: 290, x2: 600, y2: 459, stroke: '#fff', 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(b, 'line', { x1: 520, y1: 400, x2: 520, y2: 380, stroke: WAT, 'stroke-width': 8 }); mk(b, 'line', { x1: 300, y1: 340, x2: 300, y2: 360, stroke: WAT, 'stroke-width': 8 });
mk(b, 'rect', { x: 164, y: 196, width: 12, height: 76, rx: 6, fill: '#fff', stroke: C.ink2, 'stroke-width': 3 });
const sMerc = mk(b, 'rect', { x: 168, y: 250, width: 4, height: 20, fill: RD });
const sRec = flask(b, 610, 556, 0.62, '#fff');
const sRl = mk(b, 'rect', { x: 548, y: 556, width: 124, height: 0, fill: CHL, 'clip-path': 'none' });
mk(b, 'defs', {}).innerHTML = '<clipPath id="rcv86"><path d="M571.6 529.6 L548 556 H672 L648.4 529.6 Z"/></clipPath>';
attr(sRl, 'clip-path', 'url(#rcv86)');
const sVap = Array.from({ length: 7 }, () => mk(b, 'circle', { r: 6, fill: CHL }));
const sDrop = mk(b, 'path', { d: 'M0 -8 C4 -2 6 2 6 4 A6 6 0 0 1 -6 4 C-6 2 -4 -2 0 -8 Z', fill: CHL });
const sL = [lab(b, 196, 210, 'THERMOMETER', HC, { 'font-size': 17 }), lab(b, 330, 300, 'CONDENSER · COLD WATER', WAT, { 'font-size': 17 }), lab(b, 440, 520, 'RECEIVER →', CHL, { 'font-size': 17 })];
const RDS = [['TEMPERATURE · K', 'rd0', 96], ['IN THE RECEIVER', 'rd1', 188], ['LEFT IN THE FLASK', 'rd2', 280]];
$('#rds').innerHTML = RDS.map(([k, id, top]) => `<div class="rd" id="${id}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span></div>`).join('');
$('#ebs').innerHTML = eqrow('eb0', 382, `${tc(CHL, '\\text{Chloroform}')}\\ \\ \\text{b.p. } 334\\ \\text{K}`, 'BOILS FIRST', CHL) + eqrow('eb1', 472, `${tc(ANI, '\\text{Aniline}')}\\ \\ \\text{b.p. } 457\\ \\text{K}`, 'STAYS BEHIND', ANI);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- D: distillation family + steam ---------- */
const DT = [['Fractional distillation', 'BOILING POINTS CLOSE · TALL COLUMN', 'Crude oil', 'D1', 'fractional'], ['Under reduced pressure', 'BREAKS DOWN BEFORE BOILING', 'Glycerol · spent lye', 'D3', 'Glycerol'], ['Steam distillation', 'NO MIXING WITH WATER · MOVES WITH STEAM', 'Aniline + water', 'D4', 'steam']];
$('#dts').innerHTML = DT.map(([n, w, ex], i) => `<div class="ind" id="dt${i}" style="top:${96 + i * 140}px"><div class="in">${n}</div><div class="iw" style="color:${C.mute}">${w}</div><div class="iw" style="left:auto;right:24px;top:22px;color:${i === 2 ? ANI : HC};font-size:20px">${ex}</div></div>`).join('') + `<div class="pillp" id="dtP" style="left:36px;top:510px">Lower pressure, lower boiling point</div>`;
const tDt = DT.map(r => wt(r[3], r[4]));
const P1 = tc(ANI, 'p_1'), P2 = tc(WAT, 'p_2');
$('#dss').innerHTML = eqrow('ds0', 96, `${P1}\\ (\\text{aniline}),\\quad ${P2}\\ (\\text{water})`, 'STEP 1', HC) + eqrow('ds1', 186, `${P1} + ${P2} = p\\ \\ (\\text{air})`, 'STEP 2', HC) + eqrow('ds2', 276, `${P1} < p`, 'STEP 3', HC)
  + `<div class="ebar" id="dbar" style="top:380px"><i id="dbA" style="background:${ANI}"></i><i id="dbW" style="background:${WAT}"></i></div><div class="ebk" id="dbk" style="top:446px;left:auto;right:36px">p₁ + p₂ = p → BOILS</div>`;

/* ---------- G: extraction ---------- */
const gs = $('#gS');
const BODY = 'M286 150 C286 190 200 220 200 300 C200 360 270 390 292 430 H308 C330 390 400 360 400 300 C400 220 314 190 314 150 Z';
mk(gs, 'defs', {}).innerHTML = `<clipPath id="sf86"><path d="${BODY}"/></clipPath>`;
const gG = mk(gs, 'g', {});
const gIn = mk(gG, 'g', { 'clip-path': 'url(#sf86)' });
const gSol = mk(gIn, 'rect', { x: 190, y: 200, width: 220, height: 90, fill: SOLL });
const gWat = mk(gIn, 'rect', { x: 190, y: 290, width: 220, height: 150, fill: WATL });
mk(gG, 'path', { d: BODY, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
mk(gG, 'path', { d: 'M286 150 V112 M314 150 V112 M294 430 V488 M306 430 V488', stroke: C.ink2, 'stroke-width': 4, fill: 'none' });
const gTap = mk(gG, 'rect', { x: 278, y: 448, width: 44, height: 12, rx: 4, fill: HC });
const gDots = Array.from({ length: 9 }, (_, i) => mk(gIn, 'circle', { r: 7, fill: CHL }));
const DOT0 = [[250, 330], [300, 320], [350, 330], [230, 370], [280, 360], [330, 365], [370, 375], [260, 400], [320, 405]];
const DOT1 = [[240, 250], [280, 240], [320, 240], [360, 252], [255, 272], [300, 268], [345, 272], [270, 225], [330, 225]];
const gStream = mk(gs, 'line', { x1: 300, y1: 490, x2: 300, y2: 530, stroke: WAT, 'stroke-width': 4 });
const gBk = beaker(gs, 300, 560, 110, 40), gBl = mk(gs, 'rect', { x: 247, y: 560, width: 106, height: 0, fill: WATL });
const gL = [lab(gs, 420, 250, '← NEW SOLVENT (TOP)', SOL), lab(gs, 420, 350, '← WATER (BOTTOM)', WAT), lab(gs, 420, 300, '', CHL, { 'font-weight': 700 }), lab(gs, 420, 470, '← TAP', HC)];
const GQ = [['Not mix with water', 'TWO LAYERS', 'G2', 'mix', SOL], ['Dissolve the compound better', 'PULLS IT IN', 'G2', 'dissolves', CHL], ['Evaporate away easily', 'LEAVES IT PURE', 'G3', 'evaporate', GC]];
$('#gqs').innerHTML = GQ.map(([q, k, , , c], i) => `<div class="qr" id="gq${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('') + `<div class="pillp good" id="gP" style="left:36px;top:478px">Compound moves to the layer it prefers</div>`;
const tGq = GQ.map(r => wt(r[2], r[3]));

/* ---------- R: chromatography ---------- */
const rs = $('#rS');
const BASE = 470, FRONT = 130;
mk(rs, 'rect', { x: 110, y: 70, width: 260, height: 490, rx: 10, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const rPool = mk(rs, 'rect', { x: 113, y: 505, width: 254, height: 52, fill: SOLL });
mk(rs, 'rect', { x: 150, y: 96, width: 180, height: 444, fill: '#F1F2F4', stroke: C.ink2, 'stroke-width': 3 });
const rWet = mk(rs, 'rect', { x: 151.5, y: 520, width: 177, height: 18, fill: SOL, opacity: 0.16 });
mk(rs, 'line', { x1: 160, y1: BASE, x2: 320, y2: BASE, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
const rFr = mk(rs, 'line', { x1: 152, y1: 520, x2: 328, y2: 520, stroke: SOL, 'stroke-width': 3 });
const rMix = mk(rs, 'circle', { cx: 240, cy: BASE, r: 11, fill: '#6B4C6E' });
const rA = mk(rs, 'circle', { cx: 240, cy: BASE, r: 11, fill: SPA }), rB = mk(rs, 'circle', { cx: 240, cy: BASE, r: 11, fill: GC });
const rL = [lab(rs, 384, BASE + 6, '← BASE LINE · MIXTURE SPOT', HC, { 'font-size': 17 }), lab(rs, 384, 300, '← SILICA LAYER: STAYS STILL', C.mute, { 'font-size': 17 }), lab(rs, 384, 536, '← SOLVENT: MOVES UP', SOL, { 'font-size': 17 }), lab(rs, 384, 0, '← SOLVENT FRONT', SOL, { 'font-size': 17 })];
const rMa = mk(rs, 'path', { d: '', stroke: SPA, 'stroke-width': 3, fill: 'none' }), rMs = mk(rs, 'path', { d: '', stroke: SOL, 'stroke-width': 3, fill: 'none' });
const rTa = lab(rs, 0, 0, 'd spot', SPA, { 'font-size': 16, 'text-anchor': 'end' }), rTs = lab(rs, 0, 0, 'd solvent', SOL, { 'font-size': 16, 'text-anchor': 'end' });
const RT = [['STATIONARY PHASE', 'Stays still', 'R2', 'stationary', HC], ['MOBILE PHASE', 'Moves over it', 'R2', 'mobile', SOL], ['ADSORPTION', 'Silica gel or alumina', 'R3', 'adsorption', CHL], ['PARTITION', 'Water held in paper', 'R4', 'paper', WAT]];
$('#rts').innerHTML = RT.map(([k, v, , , c], i) => `<div class="tl" id="rt${i}" style="left:${36 + (i % 2) * 372}px;top:${66 + Math.floor(i / 2) * 100}px;height:84px"><div class="tk" style="color:${c};top:12px">${k}</div><div class="tv" style="top:40px">${v}</div></div>`).join('');
const tRt = RT.map(r => wt(r[2], r[3]));
$('#rE').innerHTML = K(RFX);
const RV = ['UV LIGHT', 'IODINE VAPOUR', 'NINHYDRIN · AMINO ACIDS'];
$('#rvs').innerHTML = RV.map((s, i) => `<div class="vc" id="rv${i}" style="top:190px;left:${[36, 214, 432][i]}px">${s}</div>`).join('');
const tRv = [wt('R7', 'ultraviolet'), wt('R7', 'iodine'), wt('R7', 'ninhydrin')];

/* ---------- C: compare ---------- */
const ca = $('#caS'), cf = $('#cfS');
const cAl = mk(ca, 'rect', { x: 284, y: 230, width: 216, height: 148, fill: '#C9C6F2' }); const cAb = beaker(ca, 392, 380, 220, 230);
const cBt = mk(cf, 'rect', { x: 284, y: 230, width: 216, height: 74, fill: WATL }), cBb = mk(cf, 'rect', { x: 284, y: 304, width: 216, height: 74, fill: '#D8CCF6' }); const cBk2 = beaker(cf, 392, 380, 220, 230);
const cTa = [lab(ca, 392, 116, 'THEY MIX FULLY', HC, { 'text-anchor': 'middle' }), lab(ca, 392, 410, '', HC, { 'text-anchor': 'middle', 'font-size': 20 })];
cTa[1].innerHTML = `<tspan fill="${CHL}">334 K</tspan>  vs  <tspan fill="${ANI}">457 K</tspan>`;
const cTb = [lab(cf, 392, 116, 'TWO LAYERS · MOVES WITH STEAM', HC, { 'text-anchor': 'middle' }), lab(cf, 516, 272, 'WATER', WAT), lab(cf, 516, 346, 'ANILINE', ANI)];
$('#caV').innerHTML = `<span>Method:</span><span style="color:${CHL}">simple distillation</span>`;
$('#cfV').innerHTML = `<span>Method:</span><span style="color:${ANI}">steam distillation</span>`;
const th1 = PUC.think($('#th1'), { q: 'Why not boil aniline at its own boiling point?', opts: ['It never boils', 'It can break down'], right: 1, why: 'At 457 K it can decompose. With steam, it distils below that, safe and pure.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K('\\text{Sublimation · Crystallisation · Distillation · Extraction · Chromatography}');

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`R_f(\\text{A}) = \\dfrac{${tc(SPA, '7.5')}}{${tc(SOL, '10.0')}} = 0.75`)],
  [K(`R_f(\\text{B}) = \\dfrac{${tc(GC, '3.0')}}{${tc(SOL, '10.0')}} = 0.30`)],
  [K(`\\text{Smaller } R_f \\Rightarrow ${tc(OK, '\\text{sticks more}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 104 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5')];
const ws = $('#wS'), WB = 380, WF = 110, CM = (WB - WF) / 10;
mk(ws, 'rect', { x: 250, y: 80, width: 180, height: 330, fill: '#F1F2F4', stroke: C.ink2, 'stroke-width': 3 });
mk(ws, 'line', { x1: 260, y1: WB, x2: 420, y2: WB, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
mk(ws, 'line', { x1: 252, y1: WF, x2: 428, y2: WF, stroke: SOL, 'stroke-width': 3 });
const wA = mk(ws, 'circle', { cx: 310, cy: WB - 7.5 * CM, r: 11, fill: SPA }), wB2 = mk(ws, 'circle', { cx: 370, cy: WB - 3 * CM, r: 11, fill: GC });
const brk = (x, y1, y2, col) => mk(ws, 'path', { d: `M${x - 8} ${y1} H${x + 8} M${x} ${y1} V${y2} M${x - 8} ${y2} H${x + 8}`, stroke: col, 'stroke-width': 3, fill: 'none' });
const wBr = [brk(470, WB, WF, SOL), brk(510, WB, WB - 7.5 * CM, SPA), brk(550, WB, WB - 3 * CM, GC)];
const wTx = [lab(ws, 470, WF - 14, '10.0', SOL, { 'text-anchor': 'middle' }), lab(ws, 510, WB - 7.5 * CM - 14, '7.5', SPA, { 'text-anchor': 'middle' }), lab(ws, 550, WB - 3 * CM - 14, '3.0', GC, { 'text-anchor': 'middle' }), lab(ws, 200, WB + 6, 'BASE', C.mute, { 'text-anchor': 'middle', 'font-size': 16 }), lab(ws, 200, WF + 6, 'FRONT', SOL, { 'text-anchor': 'middle', 'font-size': 16 })];
$('#wV').innerHTML = `<span style="color:${SPA}">A 0.75</span><span>·</span><span style="color:${GC}">B 0.30</span>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Measure from the plate edge, or use ${K(`${RS} \\div ${RF}`)}`, right: `Both from the base line: ${K(`R_f = ${RF} \\div ${RS} < 1`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'BASE LINE = ZERO', { 'font-size': 26, fill: HC, 'font-weight': 700 }), tq2 = txt(tsv, 40, 150, 'SPOT ON TOP', { 'font-size': 26, fill: SPA, 'font-weight': 700 }), tq3 = txt(tsv, 40, 200, 'Rf NEVER MORE THAN 1', { 'font-size': 24, fill: OK, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Match each mixture to its purification method, or find Rf from a plate' });
const OPT = ['0.70', '0.30', '0.75', '1.43'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'On a TLC plate the solvent front is 12.0 cm from the base line. Spot X has Rf = 0.40. Spot Y is 3.6 cm above spot X. The Rf of Y is:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\text{X}: 0.40 \\times ${tc(SOL, '12.0')} = 4.8`)], [K(`\\text{Y}: 4.8 + 3.6 = ${tc(SPA, '8.4')}`)], [K(`R_f = \\dfrac{${tc(SPA, '8.4')}}{${tc(SOL, '12.0')}} = ${tc(OK, '0.70')}`)], ['B used only 3.6 cm']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'used') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Purification', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`R_f = ${RF} \\div ${RS}\\quad (\\text{both from the base line})`), '<b>Sublimation</b>: camphor · <b>Crystallisation</b>: hot solvent, cool, charcoal', '<b>Distillation</b>: simple (334 vs 457 K) · fractional (crude oil) · low pressure (glycerol)', '<b>Steam</b>: aniline + water, p₁ + p₂ = p · <b>Extraction</b>: separating funnel', '<b>Chromatography</b>: adsorption (silica gel, alumina) · partition (paper)']] });
const YQ = ['Which method purifies camphor?', 'Why does steam distillation work below the boiling point?', 'What is the stationary phase in paper chromatography?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 87', topic: 'Is nitrogen hiding inside? Qualitative analysis', y: 764 });
const avA = PUC.avatar($('#sB'), { x: 160 + 350, y: 270 + 506, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Like the naphthalene ball!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T1('S5') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  document.querySelectorAll('.job .jn').forEach(q => { if (q.offsetWidth > 236) q.style.fontSize = Math.floor(28 * 236 / q.offsetWidth) + 'px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const fit = (q, w) => { const k = q.firstElementChild; if (k && k.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / k.offsetWidth) + 'px'; };
  document.querySelectorAll('.fxc,.eqtop').forEach(q => fit(q, 712));
  document.querySelectorAll('.eqr,.nf').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 668 - (tg && tg.textContent ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx').forEach(q => { const w = q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const rowsOn = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < ids.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    const tB = [wt('H4', 'Size'), wt('H4', 'Drying'), wt('H4', 'Vapour')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', CHL, u)); jb.style.color = mix(CHL, '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H3', 'trick') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'right') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tB1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('B1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2'], tQr, T1('P3') + 0.4, t);
    M.vis($('#pP'), t, wt('P2', 'Pure') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, T0('P3') - 0.3, out, { dx: 60, dy: 0, ...o });
    rowsOn(['#pm0', '#pm1', '#pm2', '#pm3', '#pm4'], tPm, T1('P3') + 0.3, t);
  }

  /* B: sublimation + crystallisation */
  const bOn = t >= tB1 - 0.1 && t < tS1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const z = OUT('S1');
    M.vis($('#ba'), t, tB1 + 0.05, z, { dy: 36, ...o });
    const tHeat = wt('B2', 'Heat'), tCold = wt('B2', 'surface'), tEnd = T1('B2');
    [bDish, bMound, ...bJunk].forEach(e => fade(e, t, tB1 + 0.3)); fade(bFun, t, wt('B1', 'solid')); fade(bPlug, t, wt('B1', 'solid'));
    fade(bL[3], t, wt('B2', 'Camphor'));
    fade(bFl, t, tHeat - 0.1); fade(bL[2], t, tHeat);
    const sub = M.clamp((t - tHeat) / (tEnd - tHeat + 2));
    attr(bMound, 'rx', (80 * (1 - 0.85 * sub)).toFixed(1)); attr(bMound, 'ry', (16 * (1 - 0.7 * sub)).toFixed(1));
    bVap.forEach((e, i) => { const ph = ((t - tHeat) / 1.6 + i / bVap.length) % 1, side = i % 2 ? 1 : -1; const y = 410 - ph * 180, x = 392 + side * ph * (40 + (i % 3) * 18); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = t > tHeat && t < T1('B5') ? (Math.sin(ph * Math.PI) * 0.9).toFixed(2) : 0; M.hide(e, t < tHeat); });
    bCry.forEach((e, i) => fade(e, t, tCold - 0.4 + i * 0.35));
    fade(bL[0], t, tCold); fade(bL[1], t, wt('B2', 'junk'));
    M.vis($('#bb'), t, T0('B3') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#cr0', '#cr1', '#cr2', '#cr3'], tCr, T1('B5') + 0.3, t);
    M.vis($('#bbP'), t, wt('B4', 'Impurities') - 0.1, 1e9, POP);
    fade(cBk, t, T0('B3')); fade(cLiq, t, wt('B3', 'Dissolve'));
    fade(cFun, t, tCr[1] - 0.2, tCr[2] - 0.2);
    cCry.forEach((e, i) => fade(e, t, tCr[2] + i * 0.15));
    const tCh = wt('B5', 'charcoal');
    fillC(cLiq, mix('#E8D7A8', '#EEF6FB', M.io((t - tCh) / 0.8)));
    M.setT(cTx, t < tCr[1] - 0.2 ? 'HOT · DISSOLVED' : t < tCr[2] - 0.2 ? 'FILTER HOT' : t < tCh ? 'COOL · CRYSTALS' : 'COLOUR REMOVED'); fade(cTx, t, wt('B3', 'Dissolve'));
    avA(t, T1('B2') - 0.2, z);
  }

  /* S: distillation */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tHeat = wt('S3', 'heat'), tBoil = wt('S3', 'boils'), tDrip = wt('S4', 'drips'), tStop = T1('S5') + 0.3;
    sL.forEach((e, i) => fade(e, t, [wt('S1', 'distillation'), wt('S3', 'condenser'), wt('S4', 'receiver')][i]));
    fade(sFl, t, tHeat - 0.1);
    const temp = t < tHeat ? 298 : M.lerp(298, 334, M.clamp((t - tHeat) / (tBoil - tHeat)));
    attr(sMerc, 'y', (270 - (temp - 298) * 0.9).toFixed(1)); attr(sMerc, 'height', (temp - 298) * 0.9 + 8);
    const col = M.clamp((t - tBoil) / (tStop - tBoil));
    attr(sLiq, 'y', (410 + col * 26).toFixed(1));
    fillC(sLiq, mix('#B9C8F0', '#D8CCF6', col));
    const vapOn = t > tBoil && t < tStop;
    sVap.forEach((e, i) => { const ph = ((t - tBoil) / 2.2 + i / sVap.length) % 1; let x, y;
      if (ph < 0.25) { x = 170; y = 340 - ph / 0.25 * 78; } else if (ph < 0.4) { const u = (ph - 0.25) / 0.15; x = 170 + u * 70; y = 262 + u * 34; } else { const u = (ph - 0.4) / 0.6; x = 240 + u * 360; y = 290 + u * 169; }
      attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); attr(e, 'r', ph > 0.4 ? (6 - (ph - 0.4) * 4).toFixed(1) : 6); M.hide(e, !vapOn); });
    const dOn = t > tDrip - 0.6 && t < tStop, dph = ((t - tDrip) % 0.8) / 0.8; place(sDrop, 610, 470 + dph * 40); M.hide(sDrop, !dOn);
    const rl = 26 * M.clamp((t - tDrip + 0.6) / (tStop - tDrip)); attr(sRl, 'y', (556 - rl).toFixed(1)); attr(sRl, 'height', rl.toFixed(1));
    const TAG = [[tS1 + 0.3, 'READY'], [tHeat, 'HEATING'], [tBoil, 'CHLOROFORM BOILS'], [tDrip, 'COLLECTED IN RECEIVER'], [T0('S5'), 'SIMPLE DISTILLATION']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.3, z, { dx: 60, dy: 0, ...o });
    const RVv = [temp.toFixed(0), t < tDrip - 0.6 ? 'NOTHING YET' : 'CHLOROFORM', t < tStop - 0.5 ? 'BOTH' : 'ANILINE'];
    RVv.forEach((s, i) => { const el = $('#rd' + i); M.vis(el, t, T0('S2') + i * 0.15, 1e9, { dy: 16 }); const cv = el.querySelector('.cv'); M.setT(cv, s); cv.style.color = i === 0 ? (temp >= 333.5 ? CHL : HC) : i === 1 ? (t < tDrip - 0.6 ? C.mute : CHL) : (s === 'ANILINE' ? ANI : HC); });
    M.vis($('#eb0'), t, wt('S2', 'Chloroform', 1) - 0.1, 1e9, { dy: 16 }); M.vis($('#eb1'), t, wt('S2', 'aniline', 1) - 0.1, 1e9, { dy: 16 });
  }

  /* D: distillation family + steam */
  const dOn2 = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn2);
  if (dOn2) {
    const z = OUT('G1');
    M.vis($('#da'), t, tD1 + 0.05, z, { dy: 36, ...o });
    rowsOn(['#dt0', '#dt1', '#dt2'], tDt, T1('D7') + 0.3, t);
    M.vis($('#dtP'), t, wt('D3', 'Lower') - 0.1, 1e9, POP);
    M.vis($('#db'), t, T0('D5') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#ds0', '#ds1', '#ds2'], [T0('D5'), T0('D6'), T0('D7')], T1('D7') + 0.3, t);
    M.vis($('#dbar'), t, T0('D6'), 1e9, { dy: 16 });
    const ua = M.io((t - wt('D6', 'one')) / 0.6), uw = M.io((t - wt('D6', 'two')) / 0.6);
    snap($('#dbA'), 'width', (ua * 220).toFixed(1) + 'px'); const w2 = $('#dbW'); snap(w2, 'left', (ua * 220).toFixed(1) + 'px'); snap(w2, 'width', (uw * 492).toFixed(1) + 'px');
    M.vis($('#dbk'), t, wt('D6', 'equals'), 1e9, POP);
    M.vis($('#dP'), t, wt('D7', 'below') - 0.1, 1e9, POP);
  }

  /* G: extraction */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('R1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dy: 36, ...o });
    fade(gG, t, tG1 + 0.3);
    const tAdd = wt('G2', 'Add'), tShake = wt('G2', 'Shake'), tMove = wt('G3', 'moves'), tDrain = wt('G3', 'Drain');
    fade(gSol, t, tAdd); fade(gL[0], t, tAdd + 0.3); fade(gL[1], t, wt('G1', 'water')); fade(gL[3], t, tDrain - 0.3);
    const shk = t > tShake && t < T1('G2') + 0.2 ? Math.sin((t - tShake) * 14) * 9 * Math.sin(Math.PI * M.clamp((t - tShake) / (T1('G2') + 0.2 - tShake))) : 0;
    attr(gG, 'transform', `rotate(${shk.toFixed(2)} 300 300)`);
    const mv = M.io((t - tMove + 0.6) / 1.4);
    gDots.forEach((e, i) => { const [x0, y0] = DOT0[i], [x1, y1] = DOT1[i]; attr(e, 'cx', M.lerp(x0, x1, mv).toFixed(1)); attr(e, 'cy', M.lerp(y0, y1, mv).toFixed(1)); fade(e, t, wt('G1', 'compound') + i * 0.05); });
    M.setT(gL[2], mv > 0.5 ? '' : '');
    const dr = M.clamp((t - tDrain) / 2.0);
    attr(gWat, 'y', (290 + dr * 150).toFixed(1)); attr(gTap, 'transform', dr > 0 && dr < 1 ? 'rotate(90 300 454)' : '');
    M.hide(gStream, !(dr > 0 && dr < 1)); fade(gBk, t, tDrain - 0.3); attr(gBl, 'y', (560 - dr * 34).toFixed(1)); attr(gBl, 'height', (dr * 34).toFixed(1));
    M.vis($('#gb'), t, T0('G2') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#gq0', '#gq1', '#gq2'], tGq, T1('G3') + 0.3, t);
    M.vis($('#gP'), t, tMove - 0.1, 1e9, POP);
  }

  /* R: chromatography */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('C1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dy: 36, ...o });
    const tRun = wt('R5', 'solvent'), tRunE = T1('R5') + 0.6;
    const u = M.io(M.clamp((t - tRun) / (tRunE - tRun)) ** 0.9);
    const fy = M.lerp(520, FRONT, u);
    attr(rFr, 'y1', fy.toFixed(1)); attr(rFr, 'y2', fy.toFixed(1)); attr(rWet, 'y', fy.toFixed(1)); attr(rWet, 'height', (538 - fy).toFixed(1));
    const d = Math.max(0, BASE - fy) ; const ya = BASE - 0.75 * d, yb = BASE - 0.30 * d;
    attr(rA, 'cy', ya.toFixed(1)); attr(rB, 'cy', yb.toFixed(1)); M.hide(rMix, u > 0.02); M.hide(rA, u <= 0.02); M.hide(rB, u <= 0.02);
    fade(rL[0], t, tR1 + 0.4); fade(rL[1], t, wt('R2', 'stationary')); fade(rL[2], t, wt('R2', 'mobile'));
    attr(rL[3], 'y', (fy + 6).toFixed(1)); fade(rL[3], t, tRun + 0.6);
    const tM = wt('R6', 'distance');
    const sh = M.io((t - tM) / 0.4), ss = M.io((t - wt('R6', 'solvent')) / 0.4);
    attr(rMa, 'd', `M146 ${BASE} H134 V${ya} H146`); attr(rMs, 'd', `M120 ${BASE} H130`); attr(rMs, 'd', `M140 ${BASE} V${FRONT}`);
    rMa.style.opacity = sh; rMs.style.opacity = ss; M.hide(rMa, sh <= 0); M.hide(rMs, ss <= 0);
    place(rTa, 104, (BASE + ya) / 2 + 6); rTa.style.opacity = sh; place(rTs, 134, 110); rTs.style.opacity = 0;
    M.vis($('#rb'), t, T0('R2') - 0.2, z, { dx: 60, dy: 0, ...o });
    RT.forEach((_, i) => { const el = $('#rt' + i); M.vis(el, t, tRt[i] - 0.1, 1e9, POP); });
    M.vis($('#rc'), t, T0('R6') - 0.2, z, { dx: 60, dy: 0, ...o });
    PUC.write($('#rE'), t, T0('R6') + 0.1, 1.0);
    RV.forEach((_, i) => M.vis($('#rv' + i), t, tRv[i] - 0.1, 1e9, POP));
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    [cAl, cAb].forEach(e => fade(e, t, wt('C1', 'Chloroform'))); fade(cTa[0], t, wt('C1', 'mix')); fade(cTa[1], t, wt('C1', 'boiling'));
    M.vis($('#caV'), t, wt('C1', 'Simple') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    [cBt, cBb, cBk2, cTb[1], cTb[2]].forEach(e => fade(e, t, T0('C2') + 0.1)); fade(cTb[0], t, wt('C2', 'mix'));
    M.vis($('#cfV'), t, wt('C2', 'Steam', 1) - 0.1, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'boil') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'steam') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Find') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'method') , 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    fade(wTx[3], t, T0('W2') + 0.4); fade(wTx[4], t, wt('W2', 'solvent'));
    fade(wBr[0], t, wt('W2', 'ten')); fade(wTx[0], t, wt('W2', 'ten'));
    fade(wA, t, wt('W2', 'A')); fade(wBr[1], t, wt('W2', 'seven')); fade(wTx[1], t, wt('W2', 'seven'));
    fade(wB2, t, wt('W2', 'B')); fade(wBr[2], t, wt('W2', 'three')); fade(wTx[2], t, wt('W2', 'three'));
    M.vis($('#wV'), t, wt('W4', 'point') - 0.1, 1e9, { dy: 16 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'measure') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'base') - 0.3 });
    fade(tq1, t, wt('X3', 'base')); fade(tq2, t, wt('X3', 'spot')); fade(tq3, t, wt('X3', 'never'));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'match') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
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
