// PUC Chemistry Ep 77: Redox reactions and electrode processes (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: anode / oxidation / gives e- teal (Zn, Fe), cathode / reduction / takes e- blue (Cu, Ag), electron e- orange, E° values and voltage gold
const OX = C.ac, RE = '#2F6FEB', HC = C.ink, GC = '#B7791F', XC = '#C8461B', OK = C.ok, RD = C.red;
const ZNC = '#9AA3AD', CUC = '#C27A4A', BLUS = '#BFD9F2', CLRS = '#EEF1F4';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const fillC = (el, c) => { if (el._f !== c) { el._f = c; attr(el, 'fill', c); } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, tO = s => tc(OX, s), tR = s => tc(RE, s), tG = s => tc(GC, s), tK = s => tc(OK, s), tE = s => tc(XC, s);
const E = n => tE(`${n}\\mathrm{e^-}`);
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
const beaker = (p, x1, x2, y1, y2, sol) => { const g = mk(p, 'g', {}); const s = mk(g, 'rect', { x: x1 + 4, y: y1 + 50, width: x2 - x1 - 8, height: y2 - y1 - 54, fill: sol }); mk(g, 'path', { d: `M${x1} ${y1} V${y2 - 14} a14 14 0 0 0 14 14 H${x2 - 14} a14 14 0 0 0 14 -14 V${y1}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); return { g, s }; };
// E° ladder
const ladder = (p, k, y0, vmin, vmax, step) => { const Y = v => y0 - v * k; const g = mk(p, 'g', {}); mk(g, 'line', { x1: 150, y1: Y(vmin) + 10, x2: 150, y2: Y(vmax) - 10, stroke: C.ink2, 'stroke-width': 3 });
  for (let v = vmin; v <= vmax + 1e-6; v += step) { const vv = Math.round(v * 100) / 100; mk(g, 'line', { x1: 140, y1: Y(vv), x2: 160, y2: Y(vv), stroke: C.ink2, 'stroke-width': 2 }); txt(g, 128, Y(vv) + 7, (vv > 0 ? '+' : '') + vv.toFixed(2), { 'text-anchor': 'end', 'font-size': 18, fill: Math.abs(vv) < 1e-6 ? HC : C.mute, 'font-weight': 600 }); }
  return { g, Y }; };
const lvl = (p, Y, v, lab, col, x2 = 700) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: 170, y1: Y(v), x2, y2: Y(v), stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }); txt(g, 180, Y(v) - 12, lab, { 'font-size': 20, fill: col, 'font-weight': 700 }); return g; };

Object.assign(M.IC, {
  torch: ['M8 3h8l-1 6H9z', 'M9 9h6v12H9z', 'M12 13v3'],
  clock: ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 7v5l3 2'],
  battery: ['M3 8h15v8H3z', 'M21 11v2', 'M7 11v2', 'M11 11v2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['torch', 'Torch', 'GLOWS ON A BATTERY', 'torch', 'CELL', OX], ['clock', 'Wall clock', 'MONTHS ON ONE CELL', 'clock', 'CELL', OX], ['battery', 'Inside each cell', 'A REDOX REACTION', 'cell', 'REDOX', OX]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'torch'), wt('H1', 'clock'), wt('H2', 'cell') - 0.2];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Battery lamp on the bicycle', 'lamp', 'H3'], ['No wire from the wall', 'wall', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('battery', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: zinc in copper sulphate ---------- */
const QR = [['Zinc rod in blue copper sulphate', 'DIP', 'P1', 'Dip', OX], ['Copper coats the zinc', 'Cu FORMS', 'P2', 'copper', RE], ['The blue colour fades', 'FADES', 'P2', 'fades', GC], ['Electrons jump directly: only heat', 'HEAT', 'P3', 'warms', RD]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#pEq').innerHTML = K(`\\mathrm{${tO('Zn')}} + \\mathrm{${tR('Cu^{2+}')}} \\rightarrow \\mathrm{${tO('Zn^{2+}')}} + \\mathrm{${tR('Cu')}}`);
const ps = $('#pS');
const pBk = beaker(ps, 232, 552, 170, 540, BLUS);
const pRod = mk(ps, 'rect', { x: 372, y: 150, width: 40, height: 330, rx: 6, fill: ZNC });
const pRl = txt(ps, 392, 140, 'Zn', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 700, 'font-family': 'Poppins' });
const pCo = [[372, 300, 14, 40], [398, 340, 14, 50], [372, 400, 16, 46], [398, 430, 14, 40], [372, 250, 12, 30]].map(([x, y, w, h]) => mk(ps, 'rect', { x: x - 4 + (x > 380 ? 18 : 0), y, width: w, height: h, rx: 5, fill: CUC }));
const pE = [0, 1, 2, 3].map(() => mk(ps, 'circle', { r: 8, fill: XC }));
const pIons = [[290, 300], [480, 360], [300, 450], [490, 470], [280, 380], [470, 280]].map(([x, y]) => atom(ps, x, y, 16, RE, 'Cu²⁺', 9));
const pHeat = txt(ps, 392, 566, 'ENERGY LOST AS A LITTLE HEAT', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 700 });

/* ---------- S: Daniell cell (wide) ---------- */
const b = $('#bS');
const bkA = beaker(b, 140, 440, 250, 530, CLRS), bkB = beaker(b, 700, 1000, 250, 530, BLUS);
const brOut = mk(b, 'path', { d: 'M400 480 V230 H740 V480', stroke: C.dim, 'stroke-width': 34, fill: 'none', 'stroke-linejoin': 'round' }), brIn = mk(b, 'path', { d: 'M400 480 V230 H740 V480', stroke: '#F4EBD0', 'stroke-width': 24, fill: 'none', 'stroke-linejoin': 'round' });
const brL = txt(b, 570, 212, 'SALT BRIDGE · IONS MOVE', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 700 });
const rodA = mk(b, 'rect', { x: 260, y: 140, width: 44, height: 340, rx: 6, fill: ZNC }), rodB = mk(b, 'rect', { x: 828, y: 140, width: 44, height: 340, rx: 6, fill: CUC });
const rlA = txt(b, 220, 200, 'Zn', { 'text-anchor': 'end', 'font-size': 26, fill: OX, 'font-weight': 700, 'font-family': 'Poppins' }), rlB = txt(b, 912, 200, 'Cu', { 'font-size': 26, fill: RE, 'font-weight': 700, 'font-family': 'Poppins' });
const slA = txt(b, 200, 512, 'ZnSO₄', { 'font-size': 18, fill: HC, 'font-weight': 600 }), slB = txt(b, 900, 512, 'CuSO₄', { 'font-size': 18, fill: HC, 'font-weight': 600 });
const wire = mk(b, 'path', { d: 'M282 140 V90 H850 V140', stroke: HC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round' });
const vm = mk(b, 'g', {}); mk(vm, 'circle', { cx: 570, cy: 90, r: 46, fill: '#fff', stroke: HC, 'stroke-width': 4 }); const vmT = txt(vm, 570, 100, '0.00 V', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 700 });
const wE = [0, 1, 2, 3, 4, 5, 6, 7].map(() => mk(b, 'circle', { r: 9, fill: XC }));
const eArr = txt(b, 420, 72, 'e⁻ →', { 'font-size': 22, fill: XC, 'font-weight': 700 });
const ionA = [0, 1, 2].map(() => atom(b, 0, 0, 13, OX, '', 9)), ionB = [0, 1, 2].map(() => atom(b, 0, 0, 13, RE, '', 9));
const anL = txt(b, 290, 566, 'ANODE (-) · OXIDATION', { 'text-anchor': 'middle', 'font-size': 18, fill: OX, 'font-weight': 700 }), caL = txt(b, 850, 566, 'CATHODE (+) · REDUCTION', { 'text-anchor': 'middle', 'font-size': 18, fill: RE, 'font-weight': 700 });
const RR = [['ANODE · Zn GIVES', `\\mathrm{${tO('Zn')}} \\rightarrow \\mathrm{${tO('Zn^{2+}')}} + ${E(2)}`, OX], ['CATHODE · Cu²⁺ TAKES', `\\mathrm{${tR('Cu^{2+}')}} + ${E(2)} \\rightarrow \\mathrm{${tR('Cu')}}`, RE], ['ELECTRONS', '\\text{Zn} \\rightarrow \\text{Cu, through the wire}', XC], ['DANIELL CELL', `${tG('1.1\\ \\text{V}')}`, GC]];
$('#rrs').innerHTML = RR.map(([k, v, c], i) => `<div class="rr" id="rr${i}" style="top:${84 + i * 112}px"><div class="ck" style="color:${c}">${k}</div><div class="cv">${K(v)}</div></div>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'left:440px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- L: electrode potential + zero ---------- */
$('#hcI').innerHTML = M.icon('battery', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`\\text{standard electrode potential} = ${tG('E^\\circ')}`);
const hs = $('#hS');
const zL = mk(hs, 'line', { x1: 40, y1: 300, x2: 744, y2: 300, stroke: HC, 'stroke-width': 3, 'stroke-dasharray': '12 8' }), zT = txt(hs, 744, 330, 'ZERO LEVEL', { 'text-anchor': 'end', 'font-size': 20, fill: HC, 'font-weight': 700 });
const hill = mk(hs, 'path', { d: 'M80 300 C150 300 170 130 240 130 C310 130 330 300 400 300 Z', fill: '#EEF7F4', stroke: C.dim, 'stroke-width': 2 });
const pit = mk(hs, 'path', { d: 'M460 300 H520 V430 H640 V300 H700', fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const [hA, hAh] = varrow(hs, 240, 296, 136, RE), hAt = txt(hs, 262, 210, '+ ABOVE', { 'font-size': 22, fill: RE, 'font-weight': 700 });
const [pA, pAh] = varrow(hs, 580, 304, 424, OX), pAt = txt(hs, 598, 380, '- BELOW', { 'font-size': 22, fill: OX, 'font-weight': 700 });

/* ---------- D: SHE + ladder ---------- */
const ds = $('#dS');
const sBk = beaker(ds, 150, 520, 240, 530, '#F1F4E8');
const sTube = mk(ds, 'path', { d: 'M300 110 V440 M380 110 V440 M300 110 H380', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const sIn = mk(ds, 'path', { d: 'M380 160 H470', stroke: C.ink2, 'stroke-width': 4, fill: 'none' }), sInT = txt(ds, 480, 168, 'H₂ GAS IN · 1 bar', { 'font-size': 18, fill: HC, 'font-weight': 700 });
const sPt = mk(ds, 'rect', { x: 322, y: 400, width: 36, height: 70, fill: '#5A6270' }), sWire = mk(ds, 'line', { x1: 340, y1: 400, x2: 340, y2: 120, stroke: HC, 'stroke-width': 3 });
const sPtT = txt(ds, 560, 440, '← PLATINUM', { 'font-size': 18, fill: HC, 'font-weight': 700 }), sAcT = txt(ds, 560, 500, '1 M H⁺ (ACID)', { 'font-size': 18, fill: HC, 'font-weight': 700 });
const sBub = [0, 1, 2, 3, 4, 5].map(() => mk(ds, 'circle', { r: 7, fill: '#fff', stroke: C.ink2, 'stroke-width': 2 }));
const sE0 = txt(ds, 560, 300, 'E° = 0.00 V', { 'font-size': 32, fill: GC, 'font-weight': 700 });
const es = $('#eS'), LD = ladder(es, 200, 300, -1, 1, 0.25);
const lH = lvl(es, LD.Y, 0, 'SHE · 0.00 V', HC), lZn = lvl(es, LD.Y, -0.76, 'Zn²⁺/Zn · -0.76 V', OX), lCu = lvl(es, LD.Y, 0.34, 'Cu²⁺/Cu · +0.34 V', RE);
const [gA, gAh] = varrow(es, 640, LD.Y(-0.76) - 6, LD.Y(0.34) + 4, GC), gT = txt(es, 620, LD.Y(-0.21) + 8, '1.10 V', { 'font-size': 28, fill: GC, 'font-weight': 700, 'text-anchor': 'end' });

/* ---------- R: series ---------- */
const SR = [['F₂ / F⁻', '+2.87', 'R3'], ['Ag⁺ / Ag', '+0.80', 'R1'], ['Cu²⁺ / Cu', '+0.34', 'R1'], ['H⁺ / H₂', '0.00', 'R1'], ['Fe²⁺ / Fe', '-0.44', 'R1'], ['Zn²⁺ / Zn', '-0.76', 'R1'], ['Li⁺ / Li', '-3.05', 'R2']];
$('#srs').innerHTML = SR.map(([n, v], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 62}px"><span style="font:600 24px Poppins">${n}</span><span class="tg" style="color:${v[0] === '+' ? RE : v[0] === '-' ? OX : HC}">${v}</span></div>`).join('');
const rs = $('#rS');
const [rUp, rUph] = varrow(rs, 690, 440, 96, RE), [rDn, rDnh] = varrow(rs, 650, 110, 454, OX);
const rT1 = txt(rs, 760, 70, 'OXIDISING ↑', { 'text-anchor': 'end', 'font-size': 15, fill: RE, 'font-weight': 700 }), rT2 = txt(rs, 760, 500, 'REDUCING ↓', { 'text-anchor': 'end', 'font-size': 15, fill: OX, 'font-weight': 700 });
$('#rbs').innerHTML = eqrow('rb0', 96, `\\mathrm{${tO('Zn')}} + \\mathrm{${tR('Cu^{2+}')}} \\rightarrow \\mathrm{Zn^{2+}} + \\mathrm{Cu}`, 'YES', OK) + eqrow('rb1', 196, `\\mathrm{${tO('Fe')}} + \\mathrm{${tR('Cu^{2+}')}} \\rightarrow \\mathrm{Fe^{2+}} + \\mathrm{Cu}`, 'YES', OK) + eqrow('rb2', 296, `\\mathrm{${tO('Zn')}} + 2\\mathrm{${tR('Ag^+')}} \\rightarrow \\mathrm{Zn^{2+}} + 2\\mathrm{Ag}`, 'YES', OK);

/* ---------- C: compare ---------- */
const cA = $('#caS'), cB = $('#cfS');
const cRA = mk(cA, 'circle', { cx: 300, cy: 250, r: 110, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), cAt = atom(cA, 300, 250, 52, OX, 'Zn', 30);
const cRB = mk(cB, 'circle', { cx: 484, cy: 250, r: 110, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), cBt = atom(cB, 484, 250, 52, RE, 'Cu²⁺', 24);
const cEA = [0, 1].map(() => mk(cA, 'circle', { r: 12, fill: XC })), cEB = [0, 1].map(() => mk(cB, 'circle', { r: 12, fill: XC }));
const cTA = txt(cA, 560, 180, 'GIVES 2 e⁻', { 'text-anchor': 'middle', 'font-size': 22, fill: OX, 'font-weight': 700 }), cTB = txt(cB, 224, 180, 'TAKES 2 e⁻', { 'text-anchor': 'middle', 'font-size': 22, fill: RE, 'font-weight': 700 });
$('#caV').innerHTML = `<span>E° =</span><span style="color:${OX}">-0.76 V</span>`;
$('#cfV').innerHTML = `<span>E° =</span><span style="color:${RE}">+0.34 V</span>`;
const th1 = PUC.think($('#th1'), { q: 'Put a copper rod into zinc sulphate solution. Will copper push out the zinc?', opts: ['Yes', 'No'], right: 1, why: 'No. Copper has the higher E° (+0.34 V). It would rather take electrons than give them.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tG('E^\\circ_{\\text{cell}}')} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} \\qquad 0.34 - (-0.76) = ${tG('1.10\\ \\text{V}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{${tO('Zn')}}\\ \\text{more negative} \\Rightarrow ${tO('\\text{anode (oxidation)}')}`)],
  [K(`\\mathrm{${tR('Ag^+')}} \\Rightarrow ${tR('\\text{cathode (reduction)}')}`)],
  [K(`${tG('E^\\circ_{\\text{cell}}')} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}`)],
  [K(`= 0.80 - (-0.76) = ${tK('1.56\\ \\text{V}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W5', 'Point')];
const ws = $('#wS'), WL = ladder(ws, 240, 300, -1, 1, 0.25);
const wAg = lvl(ws, WL.Y, 0.80, 'Ag⁺/Ag · +0.80 · CATHODE', RE), wZn = lvl(ws, WL.Y, -0.76, 'Zn²⁺/Zn · -0.76 · ANODE', OX), wH = lvl(ws, WL.Y, 0, 'SHE · 0.00', C.mute, 520);
const [wG, wGh] = varrow(ws, 660, WL.Y(-0.76) - 6, WL.Y(0.80) + 4, GC), wGT = txt(ws, 640, WL.Y(0.02) + 8, '1.56 V', { 'font-size': 28, fill: GC, 'font-weight': 700, 'text-anchor': 'end' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `For 2Ag⁺, write ${K('2 \\times 0.80 = 1.60\\ \\text{V}')}`, right: `E° stays ${K(tG('0.80\\ \\text{V}'))}, whatever the coefficient` });
const tsv = $('#tS');
const tq1 = txt(tsv, 30, 110, 'Ag⁺ + e⁻ → Ag        +0.80', { 'font-size': 24, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 30, 170, '2Ag⁺ + 2e⁻ → 2Ag    +0.80', { 'font-size': 24, fill: GC, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Daniell cell and SHE, which metal displaces which, or a cell voltage from E° values' });
const OPT = ['Fe anode · 0.78 V', 'Cu anode · 0.78 V', 'Fe anode · 0.10 V', 'Cu anode · 0.10 V'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'E°(Fe²⁺/Fe) = -0.44 V and E°(Cu²⁺/Cu) = +0.34 V. In a standard cell of these two, the anode and the cell voltage are:', qW: 820,
  opts: OPT, right: 0, optW: 474, optY: 330, optH: 110, optFs: 28 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{${tO('Fe')}}\\ \\text{more negative} \\Rightarrow \\text{anode}`)], [K('E^\\circ = 0.34 - (-0.44)')], [K(`= ${tK('0.78\\ \\text{V}')}`)], ['C forgot the minus sign of Fe']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Electrode processes', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${tG('E^\\circ_{\\text{cell}}')} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} \\qquad \\text{Daniell: } 0.34 - (-0.76) = 1.10\\ \\text{V}`), '<b>Anode</b>: oxidation, gives e⁻ · <b>Cathode</b>: reduction, takes e⁻ · e⁻ flow anode → cathode', '<b>SHE</b>: E° = 0.00 V, the zero level (1 M H⁺, 298 K)', '<b>Series</b>: Li -3.05 strongest reducing · F₂ +2.87 strongest oxidising', '<b>Rule</b>: more negative E° pushes out more positive · E° never × coefficient'] });
const YQ = ['What is the E° of the standard hydrogen electrode?', 'In a Daniell cell, which way do electrons flow in the wire?', 'Will copper push zinc out of zinc sulphate?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 8', topic: 'What is a carbon compound made of? Organic Chemistry: Some Basic Principles', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 1146, y: 270 + 520, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my bicycle lamp runs on redox!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S5') - 0.2, 1.05, 960, 560], [T1('S5') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const fit = (q, w) => { const k = q.firstElementChild; if (k && k.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / k.offsetWidth) + 'px'; };
  document.querySelectorAll('.fxc,.eqtop').forEach(q => fit(q, 712));
  document.querySelectorAll('.rr .cv').forEach(q => fit(q, 378));
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 668 - (tg && tg.textContent ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx').forEach(q => { const w = q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const rowsOn = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < ids.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
const along = (path, u) => { const L = path.getTotalLength(), p = path.getPointAtLength(L * (((u % 1) + 1) % 1)); return [p.x, p.y]; };

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
    const tB = [wt('H2', 'every'), wt('H2', 'redox') - 0.2, wt('H2', 'running')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'reaction') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'electrons') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2', '#qr3'], tQr, T1('P3') + 0.4, t);
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    fade(pBk.g, t, wt('P1', 'blue')); fade(pRod, t, wt('P1', 'zinc')); fade(pRl, t, wt('P1', 'zinc'));
    const tc0 = wt('P2', 'reddish'); pCo.forEach((r, i) => fade(r, t, tc0 + i * 0.3, 1e9, 0.5));
    fillC(pBk.s, mix(BLUS, CLRS, M.io((t - wt('P2', 'fades')) / 1.5)));
    pIons.forEach((g, i) => fade(g, t, wt('P1', 'blue') + 0.2, wt('P2', 'reddish') + i * 0.4, 0.3));
    PUC.write($('#pEq'), t, T0('P3'), 0.9);
    const te = wt('P3', 'electrons');
    pE.forEach((e, i) => { const ph = ((t - te) / 1.2 + i * 0.25) % 1; const y = 270 + i * 50; attr(e, 'cx', (412 + ph * 60).toFixed(1)); attr(e, 'cy', y.toFixed(1)); e.style.opacity = t < te ? 0 : (Math.sin(Math.PI * ph)).toFixed(2); M.hide(e, t < te); });
    fade(pHeat, t, wt('P3', 'warms'));
  }

  /* S: Daniell cell */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tA = wt('S2', 'Left'), tB2 = wt('S2', 'Right'), tW = wt('S3', 'wire'), tBr = wt('S3', 'bridge'), tGo = wt('S4', 'zinc'), tV = wt('S5', 'meter');
    [bkA.g, rodA, rlA, slA].forEach(e => fade(e, t, tA)); [bkB.g, rodB, rlB, slB].forEach(e => fade(e, t, tB2));
    M.draw(wire, t, tW - 0.2, 0.8); fade(vm, t, tW + 0.4); fade(brOut, t, tBr - 0.1); fade(brIn, t, tBr - 0.1); fade(brL, t, wt('S3', 'ions'));
    const flow = t >= tGo; wE.forEach((e, i) => { const [x, y] = along(wire, (t - tGo) / 3.2 + i / 8); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); fade(e, t, tGo + i * 0.12, 1e9, 0.2); });
    fade(eArr, t, wt('S4', 'travel'));
    ionA.forEach((g, i) => { const ph = flow ? (((t - tGo) / 2.4 + i / 3) % 1) : 0; place(g, 304 + ph * 100, 330 + i * 60 + Math.sin(ph * 3) * 10); g.style.opacity = flow ? (ph < 0.8 ? M.clamp(ph * 5) : (1 - ph) * 5).toFixed(2) : 0; M.hide(g, !flow); });
    ionB.forEach((g, i) => { const ph = flow ? (((t - wt('S4', 'copper', 1)) / 2.4 + i / 3) % 1) : 0; const on = t >= wt('S4', 'copper', 1); place(g, 980 - ph * 108, 330 + i * 60); g.style.opacity = on ? (ph < 0.8 ? M.clamp(ph * 5) : (1 - ph) * 5).toFixed(2) : 0; M.hide(g, !on); });
    M.setT(vmT, t < tV ? '0.00 V' : (1.1 * M.io((t - tV) / 0.8)).toFixed(2) + ' V');
    fade(anL, t, tGo + 0.3); fade(caL, t, wt('S4', 'take'));
    rowsOn(['#rr0', '#rr1', '#rr2', '#rr3'], [tGo, wt('S4', 'take'), wt('S5', 'Electrons'), wt('S5', 'Daniell')], T1('S5') + 0.3, t);
    const TAG = [[tA, 'TWO HALF CELLS'], [tW, 'WIRE + SALT BRIDGE'], [tGo, 'ELECTRONS FLOW'], [tV, 'ELECTRICITY']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tA, 1e9, POP);
    avA(t, T1('S5') - 0.4, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('L3') + 0.3, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'electrode') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.6); PUC.write($('#lEq'), t, wt('L2', 'standard'), 0.9);
    M.vis($('#lh'), t, T0('L3') - 0.1, z, { dx: 60, dy: 0, ...o });
    fade(hill, t, wt('L3', 'height') - 0.2); fade(pit, t, wt('L3', 'height')); M.draw(zL, t, wt('L3', 'zero'), 0.6); fade(zT, t, wt('L3', 'zero') + 0.4);
    M.draw(hA, t, wt('L3', 'level'), 0.5); fade(hAh, t, wt('L3', 'level') + 0.4); fade(hAt, t, wt('L3', 'level') + 0.4);
    M.draw(pA, t, wt('L3', 'measure', 1), 0.5); fade(pAh, t, wt('L3', 'measure', 1) + 0.4); fade(pAt, t, wt('L3', 'measure', 1) + 0.4);
    M.vis($('#hP'), t, T1('L3') - 0.4, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('R1');
    M.vis($('#da'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    fade(sBk.g, t, wt('D1', 'Hydrogen')); [sTube, sIn, sInT].forEach(e => fade(e, t, wt('D1', 'gas'))); [sPt, sWire, sPtT].forEach(e => fade(e, t, wt('D1', 'platinum') - 0.2)); fade(sAcT, t, wt('D1', 'acid') - 0.2);
    sBub.forEach((e, i) => { const ph = ((t - wt('D1', 'bubbles')) / 1.6 + i / 6) % 1; attr(e, 'cx', (312 + (i % 3) * 28).toFixed(1)); attr(e, 'cy', (470 - ph * 300).toFixed(1)); fade(e, t, wt('D1', 'bubbles'), 1e9, 0.2); });
    fade(sE0, t, wt('D1', 'zero', 1));
    M.vis($('#db'), t, wt('D1', 'zero', 1) - 0.3, z, { dx: 60, dy: 0, ...o });
    fade(LD.g, t, wt('D1', 'zero', 1) - 0.1); fade(lH, t, wt('D1', 'volts'));
    fade(lZn, t, wt('D2', 'minus')); fade(lCu, t, wt('D3', 'plus'));
    M.draw(gA, t, T0('D4'), 0.6); fade(gAh, t, T0('D4') + 0.5); fade(gT, t, wt('D4', 'One'));
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('C1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('R4') + 0.3, M.HEAVY); snap($('#ra'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    SR.forEach((_, i) => M.vis($('#sr' + i), t, tR1 + 0.6 + (6 - i) * 0.25, 1e9, { dy: 12 }));
    const hl = [[6, T0('R2'), T0('R3')], [0, T0('R3'), T0('R4')]];
    SR.forEach((_, i) => { let on = 0; hl.forEach(([k, a, bb]) => { if (k === i) on = M.io((t - a) / 0.25) * (1 - M.io((t - bb) / 0.25)); }); setBg($('#sr' + i), mix(C.soft, C.ac2, on)); });
    M.draw(rDn, t, wt('R2', 'reducing'), 0.6); fade(rDnh, t, wt('R2', 'reducing') + 0.5); fade(rT2, t, wt('R2', 'reducing'));
    M.draw(rUp, t, wt('R3', 'oxidising'), 0.6); fade(rUph, t, wt('R3', 'oxidising') + 0.5); fade(rT1, t, wt('R3', 'oxidising'));
    M.vis($('#rb'), t, T0('R4') - 0.1, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#rb0', '#rb1', '#rb2'], [wt('R4', 'zinc'), wt('R4', 'zinc') + 0.5, wt('R4', 'zinc') + 1.0], T1('R4') + 0.3, t);
    M.vis($('#rP'), t, wt('R4', 'salt') - 0.1, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    const tg = wt('C1', 'gives'), tk = wt('C2', 'takes');
    cEA.forEach((e, i) => { const a = (t - tC1) * 1.4 + i * Math.PI, u = M.io((t - tg - i * 0.3) / 0.9); const x = M.lerp(300 + 110 * Math.cos(a), 640, u), y = M.lerp(250 + 110 * Math.sin(a), 230 + i * 40, u); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); fade(e, t, tC1 + 0.2); });
    fade(cTA, t, tg); M.vis($('#caV'), t, wt('C1', 'minus'), 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    cEB.forEach((e, i) => { const a = (t - tk) * 1.4 + i * Math.PI, u = M.io((t - tk + 0.6 - i * 0.3) / 0.9); const x = M.lerp(140, 484 + 110 * Math.cos(a), u), y = M.lerp(230 + i * 40, 250 + 110 * Math.sin(a), u); attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); fade(e, t, tk - 0.6); });
    fade(cTB, t, tk); M.vis($('#cfV'), t, wt('C2', 'plus'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Will') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Copper') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'More') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'More', 1) - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'takes') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, tW1 + 0.2, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(WL.g, t, T0('W2')); fade(wH, t, T0('W2') + 0.2); fade(wAg, t, wt('W2', 'plus')); fade(wZn, t, wt('W2', 'minus'));
    M.draw(wG, t, wt('W5', 'Point'), 0.6); fade(wGh, t, wt('W5', 'Point') + 0.5); fade(wGT, t, wt('W5', 'One'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'double') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'change') - 0.3 });
    fade(tq1, t, wt('X3', 'number')); fade(tq2, t, wt('X3', 'multiply'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'which') - 0.1, tCount, tAns });
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
