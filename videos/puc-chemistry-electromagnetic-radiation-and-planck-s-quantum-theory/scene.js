// PUC Chemistry Ep 17: Electromagnetic radiation and Planck's quantum theory (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, readouts, recap): wavelength lambda teal, frequency nu violet, speed c ink, energy E / h nu gold,
// electric field orange, magnetic field blue
const LC = C.ac, NUC = C.violet, GC = '#B7791F', EFC = '#D9731A', BFC = '#2F6FEB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const B = { fill: C.ink, 'font-weight': 600 };
const L_ = `\\textcolor{${LC}}{\\lambda}`, NU = `\\textcolor{${NUC}}{\\nu}`, NB = `\\textcolor{${NUC}}{\\bar{\\nu}}`, EE = s => `\\textcolor{${GC}}{${s}}`;
const wl2c = w => { let r = 0, g = 0, b = 0;
  if (w < 440) { r = -(w - 440) / 60; b = 1; } else if (w < 490) { g = (w - 440) / 50; b = 1; } else if (w < 510) { g = 1; b = -(w - 510) / 20; } else if (w < 580) { r = (w - 510) / 70; g = 1; } else if (w < 645) { r = 1; g = -(w - 645) / 65; } else r = 1;
  const f = w < 420 ? 0.4 + 0.6 * (w - 380) / 40 : w > 700 ? 0.4 + 0.6 * (750 - w) / 50 : 1;
  return '#' + [r, g, b].map(v => Math.round(255 * Math.pow(Math.max(0, v * f), 0.8)).toString(16).padStart(2, '0')).join(''); };
const wpath = (x0, x1, yc, amp, f, n = 2) => { let d = ''; for (let x = x0; x <= x1; x += n) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + (yc - amp * f(x)).toFixed(1); return d; };

Object.assign(M.IC, {
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M11 18h2'],
  micro: ['M3 5h18v14H3z', 'M7 9h8v6H7z', 'M18 9v.01', 'M18 12v.01', 'M18 15v.01'],
  heat: ['M4 18c2-3 3-9 5-12s3 9 5 12 3-9 5-12', 'M3 21h18'],
  lamp: ['M12 2v4', 'M8 6h8l-1 6H9Z', 'M12 12v10', 'M8 22h8'],
  wave: ['M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tR1 = T0('R1'), tD1 = T0('D1'), tB1 = T0('B1'), tB2 = T0('B2'), tC1 = T0('C1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['phone', 'Phone message', 'THROUGH A WALL', 'phone', 'RADIO SIGNAL'], ['micro', 'Microwave oven', 'WARMS FOOD', 'microwave', 'MICROWAVES'], ['heat', 'Heater coil', 'GLOWS RED', 'heater', 'INFRARED + RED']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}">${el}</div></div>`).join('');
const KIT = [['lamp', 'Lamp light', wt('H3', 'lamp')], ['phone', 'Phone signal', wt('H3', 'phone')], ['wave', 'Same kind of wave', wt('H4', 'same')]];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');

/* ---------- P: what it is ---------- */
const QR = [['MAXWELL · 1870', 'Accelerating charge sends out E and B fields', wt('P2', 'accelerating')], ['AT RIGHT ANGLES', 'E ⊥ B, both ⊥ to the direction of travel', wt('P3', 'right')], ['NO MEDIUM', 'Crosses empty space, like sunlight', wt('P4', 'medium')], ['ONE SPEED IN A VACUUM', 'c = 3.0 × 10⁸ m s⁻¹', wt('P5', 'speed')]];
$('#qrs').innerHTML = QR.map(([k, q], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 112}px;height:96px"><div class="tg">${k}</div><div class="qt" style="top:42px">${q}</div></div>`).join('');
const ps = $('#pS'), PX0 = 80, PX1 = 690, PY = 290, VP = 110, LP = 200;
mk(ps, 'line', { x1: PX0, y1: PY, x2: PX1 + 50, y2: PY, stroke: C.ink, 'stroke-width': 2.5 }); mk(ps, 'path', { d: `M${PX1 + 50} ${PY - 9} L${PX1 + 66} ${PY} L${PX1 + 50} ${PY + 9} Z`, fill: C.ink });
const dirL = txt(ps, PX1 + 60, PY + 36, 'TRAVEL · c', { 'text-anchor': 'end', 'font-size': 15, ...B });
const eW = mk(ps, 'path', { fill: 'none', stroke: EFC, 'stroke-width': 4 }), bW = mk(ps, 'path', { fill: 'none', stroke: BFC, 'stroke-width': 4 });
const eSt = mk(ps, 'path', { fill: 'none', stroke: EFC, 'stroke-width': 1.5, opacity: 0.5 }), bSt = mk(ps, 'path', { fill: 'none', stroke: BFC, 'stroke-width': 1.5, opacity: 0.5 });
const eL = txt(ps, 96, 150, 'E · ELECTRIC FIELD', { 'font-size': 16, fill: EFC, 'font-weight': 700 }), bL = txt(ps, 300, 420, 'B · MAGNETIC FIELD', { 'font-size': 16, fill: BFC, 'font-weight': 700 });
const ang = mk(ps, 'g', {}); mk(ang, 'path', { d: `M${PX0 + 22} ${PY} V${PY - 22} H${PX0}`, fill: 'none', stroke: C.ink, 'stroke-width': 2 }); txt(ang, PX0 + 30, PY - 28, '90°', { 'font-size': 15, ...B });
{ const host = $('#pw'); [['pc0', 'NO MEDIUM NEEDED'], ['pc1', 'c = 3.0 × 10⁸ m s⁻¹']].forEach(([id, s], i) => host.insertAdjacentHTML('beforeend', `<div class="btag" id="${id}" style="left:${36 + i * 290}px;top:490px;background:${i ? 'var(--ink)' : 'var(--soft)'};color:${i ? '#fff' : 'var(--ink)'}">${s}</div>`)); }
const BX = 0.5, BY = 0.36;

/* ---------- S: measure a wave ---------- */
const b = $('#bS'), SY = 250, SA = 90, SX0 = 40, SX1 = 744, VPX = 240, PT = 520;
const grid = mk(b, 'g', { opacity: 0.6 }); for (let x = 40; x <= 744; x += 40) mk(grid, 'line', { x1: x, y1: 120, x2: x, y2: 380, stroke: '#E9E5DA', 'stroke-width': 1 }); for (let y = 120; y <= 380; y += 40) mk(grid, 'line', { x1: 40, y1: y, x2: 744, y2: y, stroke: '#E9E5DA', 'stroke-width': 1 });
const sWv = mk(b, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pLine = mk(b, 'line', { x1: PT, y1: 130, x2: PT, y2: 380, stroke: NUC, 'stroke-width': 3, 'stroke-dasharray': '8 8' }); const pLab = txt(b, PT, 410, 'THIS POINT', { 'text-anchor': 'middle', 'font-size': 15, fill: NUC, 'font-weight': 700 });
const lBr = mk(b, 'path', { fill: 'none', stroke: LC, 'stroke-width': 3 }), lLab = txt(b, 0, 132, 'λ', { 'text-anchor': 'middle', 'font-size': 28, fill: LC, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic' });
const crestDot = mk(b, 'circle', { r: 9, fill: NUC });
const cnt = txt(b, PT, 460, '', { 'text-anchor': 'middle', 'font-size': 22, fill: NUC, 'font-weight': 700 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const tSq = wt('S4', 'Squeeze'), lamT = t => M.lerp(240, 120, M.io((t - tSq) / 1.0));
// crests passed: integral of v / lambda
const Ncr = t => { const t0 = tS1; if (t <= tSq) return (t - t0) * VPX / 240; let n = (tSq - t0) * VPX / 240; const steps = Math.ceil((t - tSq) / 0.02); for (let i = 0; i < steps; i++) { const ta = tSq + i * 0.02, dt = Math.min(0.02, t - ta); n += dt * VPX / lamT(ta + dt / 2); } return n; };
const RO = [['λ', LC, 'WAVELENGTH', 'Crest to next crest', 'ro0'], ['ν', NUC, 'FREQUENCY · HERTZ (Hz), AFTER HEINRICH HERTZ', 'Crests passing per second', 'ro1'], ['c', C.ink, 'SPEED = λ × ν', 'Never changes', 'ro2']];
$('#ros').innerHTML = RO.map(([k, col, tg, lt, id], i) => `<div class="ro2" id="${id}" style="top:${84 + i * 112}px"><div class="k" style="color:${col}">${k}</div><div class="tg">${tg}</div><div class="lt">${lt}</div><div class="v" id="${id}v" style="color:${col}"></div></div>`).join('') + `<div class="pillp ac" id="roP" style="left:36px;top:430px">Shorter λ, higher ν, same c</div>`;
// spectrum (wide card)
const sp = $('#spS'), RG = [['RADIO', '~10⁶ Hz'], ['MICROWAVE', '~10¹⁰ Hz'], ['INFRARED', '~10¹³ Hz'], ['VISIBLE', '~10¹⁵ Hz'], ['ULTRAVIOLET', '~10¹⁶ Hz'], ['X RAYS', ''], ['GAMMA RAYS', '']];
const RW = 1480 / 7, RX = i => 60 + i * RW, RCOL = ['#DCE7F5', '#D7EEF0', '#F7DCCF', '#FFFFFF', '#E6DDFB', '#E2E4EA', '#D5D8E0'];
const rgs = RG.map(([n, f], i) => { const g = mk(sp, 'g', {}); mk(g, 'rect', { x: RX(i), y: 250, width: RW - 4, height: 80, rx: 8, fill: RCOL[i], stroke: i === 3 ? C.ac : 'none', 'stroke-width': 3 }); txt(g, RX(i) + RW / 2 - 2, 296, n, { 'text-anchor': 'middle', 'font-size': 17, ...B }); if (f) txt(g, RX(i) + RW / 2 - 2, 356, f, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); return g; });
const visG = mk(sp, 'defs', {}); { const g = mk(visG, 'linearGradient', { id: 'vrb', x1: 0, x2: 1 }); for (let k = 0; k <= 20; k++) mk(g, 'stop', { offset: (k / 20).toFixed(2), 'stop-color': wl2c(750 - k * 17.5) }); }
const chirp = mk(sp, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 3.5, d: (() => { let d = '', ph = 0; for (let x = 60; x <= 1540; x += 1) { const l = 260 * Math.pow(0.012 / 0.26 * 0.26 / 0.26, 0) * Math.pow(18 / 260, (x - 60) / 1480); ph += 2 * Math.PI / l; d += (d ? 'L' : 'M') + x + ' ' + (180 - 40 * Math.sin(ph)).toFixed(1); } return d; })() });
const longL = txt(sp, 60, 120, '← LONGER WAVES', { 'font-size': 16, fill: C.mute, 'font-weight': 600 }), shortL = txt(sp, 1540, 120, 'SHORTER WAVES · HIGHER FREQUENCY →', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const zoom = mk(sp, 'g', {}); mk(zoom, 'path', { d: `M${RX(3)} 332 L520 420 H1080 L${RX(4) - 4} 332`, fill: C.ac3, stroke: 'none' }); mk(zoom, 'rect', { x: 520, y: 420, width: 560, height: 56, rx: 8, fill: 'url(#vrb)' });
txt(zoom, 510, 456, 'RED · 750 nm · 4.00 × 10¹⁴ Hz', { 'text-anchor': 'end', 'font-size': 17, ...B }); txt(zoom, 1090, 456, 'VIOLET · 400 nm · 7.50 × 10¹⁴ Hz', { 'font-size': 17, ...B });
txt(zoom, 800, 512, 'ALL WE CAN SEE', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ac, 'font-weight': 700 });

/* ---------- D: c = nu lambda ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`c = ${NU} \\times ${L_}`)], [K(`${NU} = \\frac{c}{${L_}} \\quad (\\text{Hz} = \\text{s}^{-1})`)], [K(`${NB} = \\frac{1}{${L_}} \\quad (\\text{m}^{-1})`)], [K(`400\\,\\text{nm} = 4 \\times 10^{-7}\\,\\text{m}`)]], { label: 'THE WAVE FORMULAS', y0: 110, dy: 112 });
const tDs = [wt('D2', 'So'), T0('D3') + 0.3, T0('D4') + 0.3, T0('D5') + 0.3];
const ds = $('#dS'), DL = 150, DX0 = 92;
const dW = mk(ds, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round', d: wpath(DX0, DX0 + 4 * DL, 300, 70, x => Math.sin((x - DX0) / DL * 2 * Math.PI)) });
const dBr = [0, 1, 2, 3].map(i => { const g = mk(ds, 'g', {}); const x0 = DX0 + i * DL + 4, x1 = DX0 + (i + 1) * DL - 4; mk(g, 'path', { d: `M${x0} 404 V414 H${x1} V404`, fill: 'none', stroke: LC, 'stroke-width': 3 }); txt(g, (x0 + x1) / 2, 444, 'λ', { 'text-anchor': 'middle', 'font-size': 26, fill: LC, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic' }); return g; });
const cBr = mk(ds, 'g', {}); mk(cBr, 'path', { d: `M${DX0} 190 V178 H${DX0 + 4 * DL} V190`, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); txt(cBr, DX0 + 2 * DL, 164, 'DISTANCE IN 1 SECOND = c', { 'text-anchor': 'middle', 'font-size': 17, ...B });
const nuT = txt(ds, DX0 + 2 * DL, 500, 'ν WAVES PASS EACH SECOND', { 'text-anchor': 'middle', 'font-size': 17, fill: NUC, 'font-weight': 700 });
const CMP = [['Red light', '#D8301E', [['WAVELENGTH', '750 nm, longer'], ['FREQUENCY', '4.00 × 10¹⁴ Hz'], ['SPEED IN VACUUM', 'c = 3.0 × 10⁸ m s⁻¹']]], ['Violet light', '#7B2FC0', [['WAVELENGTH', '400 nm, shorter'], ['FREQUENCY', '7.50 × 10¹⁴ Hz'], ['SPEED IN VACUUM', 'c = 3.0 × 10⁸ m s⁻¹']]]];
$('#cmps').innerHTML = CMP.map(([h, col, rows], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ch" style="color:${col}">${h}</div>${rows.map(([k, v], j) => `<div class="cr2" id="cr${i}_${j}" style="top:${108 + j * 86}px"><b>${k}</b><span>${v}</span></div>`).join('')}<svg width="672" height="70" style="position:absolute;left:32px;top:370px"><path d="${wpath(0, 672, 35, 22, x => Math.sin(x / (i ? 64 : 120) * 2 * Math.PI))}" fill="none" stroke="${col}" stroke-width="4"/></svg></div>`).join('');
const tCm = [wt('B1', 'Red'), wt('B1', 'Violet')];
const th1 = PUC.think($('#th1'), { q: 'Why does violet light have the higher frequency?', opts: ['Its waves are shorter', 'It travels faster'], right: 0, why: 'The speed c is fixed, so shorter waves must pass more often: ν = c / λ.' });

/* ---------- C: Planck ---------- */
const cs = $('#cS');
const burner = mk(cs, 'g', {}); mk(burner, 'rect', { x: 300, y: 350, width: 184, height: 36, rx: 8, fill: C.ink2 }); [330, 372, 414, 456].forEach(x => mk(burner, 'path', { d: `M${x} 346 C${x - 14} 320 ${x + 2} 306 ${x} 286 C${x + 14} 306 ${x + 12} 326 ${x} 346Z`, fill: '#F2A541' }));
const rod = mk(cs, 'rect', { x: 120, y: 210, width: 544, height: 56, rx: 14, fill: '#5A5F6B', stroke: C.ink, 'stroke-width': 2.5 });
txt(cs, 120, 198, 'IRON ROD', { 'font-size': 15, ...B });
const RODC = [['DULL RED', '#7A1E14', wt('C1', 'dull')], ['BRIGHTER RED', '#D8301E', wt('C1', 'brighter')], ['WHITE', '#FFF4E0', wt('C1', 'white')], ['BLUE', '#CFE0FF', wt('C1', 'blue')]];
const rodL = txt(cs, 392, 246, '', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 700 });
const hot = mk(cs, 'g', {}); mk(hot, 'rect', { x: 120, y: 414, width: 544, height: 16, rx: 8, fill: C.soft }); const hotB = mk(hot, 'rect', { x: 120, y: 414, width: 0, height: 16, rx: 8, fill: '#D8301E' }); txt(hot, 664, 452, 'HOTTER →', { 'text-anchor': 'end', 'font-size': 15, ...B });
const c2 = $('#cS2');
$('#cr').insertAdjacentHTML('beforeend', `<div class="fx" id="peq" style="left:36px;top:74px;font-size:40px">${K(`${EE('E')} = h${NU}`)}</div><div class="fx" id="peq2" style="left:36px;top:136px;font-size:30px">${K('h = 6.626 \\times 10^{-34}\\,\\text{J s}')}</div>`);
const SX = 360, SB = 410, STH = 56, SWD = 90;
const ramp = mk(c2, 'g', {}); mk(ramp, 'line', { x1: 60, y1: SB, x2: 300, y2: SB - 3 * STH, stroke: C.dim, 'stroke-width': 4, 'stroke-dasharray': '8 8' }); txt(ramp, 60, SB - 3 * STH - 20, 'WAVE IDEA: SMOOTH', { 'font-size': 15, fill: C.mute, 'font-weight': 700 }); const rampX = mk(c2, 'g', {}); mk(rampX, 'path', { d: `M150 ${SB - 110} l40 40 M190 ${SB - 110} l-40 40`, stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' }); txt(rampX, 60, SB + 30, 'NOT SMOOTH', { 'font-size': 15, fill: C.red, 'font-weight': 700 });
const steps = mk(c2, 'path', { d: `M${SX - 20} ${SB} H${SX + SWD} V${SB - STH} H${SX + 2 * SWD} V${SB - 2 * STH} H${SX + 3 * SWD} V${SB - 3 * STH} H${SX + 4 * SWD}`, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
const stL = ['0', 'hν', '2hν', '3hν'].map((s, i) => txt(c2, SX + i * SWD + SWD / 2 + 10, SB - i * STH - 12, s, { 'text-anchor': 'middle', 'font-size': 20, fill: GC, 'font-weight': 700 }));
const packs = [1, 2, 3].map(i => { const g = mk(c2, 'g', {}); for (let k = 0; k < i; k++) mk(g, 'rect', { x: SX + i * SWD + 12 + k * 22, y: SB - i * STH + 10, width: 18, height: 18, rx: 4, fill: GC }); return g; });
const avA = PUC.avatar($('#cl'), { x: 36, y: 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like a heater coil going red!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${EE('E')} = h${NU} = \\frac{hc}{${L_}}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${L_} = 500\\,\\text{nm} = 5 \\times 10^{-7}\\,\\text{m}`)], [K(`${NU} = \\frac{3 \\times 10^{8}}{5 \\times 10^{-7}} = 6 \\times 10^{14}\\,\\text{Hz}`)],
  [K(`${EE('E')} = h${NU} = 6.626 \\times 10^{-34} \\times 6 \\times 10^{14}`)], [K(`${EE('E')} = ${EE('3.98 \\times 10^{-19}\\,\\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const w2 = $('#wS2'), GR = wl2c(500);
const pk = mk(w2, 'path', { fill: 'none', stroke: GR, 'stroke-width': 5, 'stroke-linecap': 'round' });
const WRO = [['λ', LC, 'WAVELENGTH', '5 × 10⁻⁷ m', T0('W3')], ['ν', NUC, 'FREQUENCY', '6 × 10¹⁴ Hz', wt('W4', 'six')], ['E', GC, 'ENERGY OF ONE PHOTON', '3.98 × 10⁻¹⁹ J', T0('W6')]];
$('#wr').insertAdjacentHTML('beforeend', `<div class="pillp ac" id="wP" style="left:36px;top:500px">One photon carries a tiny packet of energy</div>`);
WRO.forEach(([k, col, tg, v], i) => $('#wr').insertAdjacentHTML('beforeend', `<div class="ro2" id="wro${i}" style="top:${200 + i * 108}px"><div class="k" style="color:${col}">${k}</div><div class="tg">${tg}</div><div class="v" style="color:${col}">${v}</div></div>`));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${NU} = \\frac{3 \\times 10^{8}}{500}`)} , λ left in nm`, right: `${K(`${NU} = \\frac{3 \\times 10^{8}}{5 \\times 10^{-7}} = 6 \\times 10^{14}\\,\\text{Hz}`)}`, y1: 160 });
const tsv = $('#tS'), tg = mk(tsv, 'g', {});
txt(tg, 280, 110, '1 nm = 10⁻⁹ m', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 700 }); txt(tg, 280, 160, 'CONVERT FIRST', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals linking λ, ν and photon energy · the order of the spectrum' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `A 60 W lamp gives out all its energy as light of 600 nm. How many photons does it give out each second?<br><span style="font:500 24px 'IBM Plex Mono';color:var(--mute)">h = 6.626 × 10⁻³⁴ J s, c = 3.0 × 10⁸ m s⁻¹</span>`, qW: 700,
  opts: [K('3.31 \\times 10^{-19}'), K('1.81 \\times 10^{29}'), K('5.52 \\times 10^{-21}'), K('1.81 \\times 10^{20}')], right: 3, optW: 474, optY: 350, optH: 104, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`${EE('E')} = \\frac{hc}{${L_}} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^{8}}{6 \\times 10^{-7}}`)], [K(`${EE('E')} = 3.313 \\times 10^{-19}\\,\\text{J}`)], [K(`N = \\frac{60\\,\\text{J s}^{-1}}{3.313 \\times 10^{-19}\\,\\text{J}}`)], [K(`= \\textcolor{${C.ok}}{1.81 \\times 10^{20}\\,\\text{s}^{-1}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'That'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 520, title: 'Recap · electromagnetic radiation and Planck', y0: 98, dy: 86, txt: [0, 1, 1, 1, 1],
  lines: [K(`c = ${NU}${L_} \\qquad ${NB} = \\frac{1}{${L_}} \\qquad ${EE('E')} = h${NU}`), '<b>EM waves</b>: E and B fields at right angles, no medium, c = 3.0 × 10⁸ m s⁻¹', '<b>Spectrum</b>: radio, microwave, infrared, visible (400 to 750 nm), UV, X rays, gamma', '<b class="g">Planck, 1900</b>: energy comes in packets (quanta): hν, 2hν, 3hν ...', '<b>h</b> = 6.626 × 10⁻³⁴ J s · always put λ in metres'] });
const YQ = ['How are the speed, frequency and wavelength of light linked?', 'Which has more energy per photon, red light or violet light?', 'What did Planck say about how energy is given out?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 18', topic: 'Can light knock out electrons? Photoelectric Effect and Dual Nature of Matter', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  { const d = $('#sF .next'), nt = d && d.querySelector('.nt'); if (nt) { nt.style.flex = 'none'; const over = d.scrollWidth - d.clientWidth + 8; if (over > 0) nt.style.fontSize = Math.floor(34 * (nt.offsetWidth - over) / nt.offsetWidth) + 'px'; } }
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { if (q.offsetWidth > 672) q.style.fontSize = Math.floor(27 * 672 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const rowsHi = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - (i < ts.length - 1 ? ts[i + 1] : tEnd) + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    M.vis($('#hjP'), t, wt('H2', 'all') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((k, i) => { const el = $('#wq' + i); M.vis(el, t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, i === 2 ? M.io((t - k[2]) / 0.3) : 0)); });
    M.vis($('#hTz'), t, wt('H5', 'energy') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsHi(QR.map((_, i) => '#qr' + i), QR.map(q => q[2]), T1('P5'), t);
    M.vis($('#pw'), t, wt('P2', 'Maxwell') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ph = (t - tP1) * VP, f = x => Math.sin((x - PX0 - ph) / LP * 2 * Math.PI), grow = M.io((t - wt('P2', 'electric') + 0.1) / 0.8), x1 = PX0 + (PX1 - PX0) * grow;
    if (grow > 0) {
      attr(eW, 'd', wpath(PX0, x1, PY, 110, f)); let d = ''; for (let x = PX0; x <= x1; x += 2) { const s = f(x); d += (d ? 'L' : 'M') + (x + BX * 90 * s).toFixed(1) + ' ' + (PY + BY * 90 * s).toFixed(1); } attr(bW, 'd', d);
      let es = '', bs = ''; for (let x = PX0; x <= x1; x += 20) { const s = f(x); es += `M${x} ${PY} V${(PY - 110 * s).toFixed(1)}`; bs += `M${x} ${PY} L${(x + BX * 90 * s).toFixed(1)} ${(PY + BY * 90 * s).toFixed(1)}`; } attr(eSt, 'd', es); attr(bSt, 'd', bs);
    }
    [eW, bW, eSt, bSt].forEach(e => M.hide(e, grow <= 0));
    fade(eL, t, wt('P2', 'electric')); fade(bL, t, wt('P2', 'magnetic')); fade(dirL, t, wt('P3', 'direction')); fade(ang, t, wt('P3', 'right'));
    M.vis($('#pc0'), t, wt('P4', 'medium') - 0.1, 1e9, POP); M.vis($('#pc1'), t, wt('P5', 'three') - 0.1, 1e9, POP);
  }

  /* S + R: measure, spectrum */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const zB = OUT('R1');
    M.vis($('#bn'), t, tS1 + 0.05, zB, { dy: 36, ...o });
    { const sh = M.spring(t - wt('S3', 'count') + 0.3, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#ro'), t, wt('S3', 'count') + 0.05, zB, { dx: 60, dy: 0, ...o });
    const lm = lamT(t), N = Ncr(t), f = x => Math.sin(2 * Math.PI * (x / lm - N));
    attr(sWv, 'd', wpath(SX0, SX1, SY, SA, f)); fade(grid, t, tS1 + 0.2, 1e9, 0.3, 0.6); fade(sWv, t, tS1 + 0.3);
    // wavelength bracket between two crests near the left
    const m0 = Math.ceil((80 / lm) - 0.25 + N - 1e-6), xc1 = lm * (m0 + 0.25 - N), xc2 = xc1 + lm;
    const lb = M.io((t - wt('S2', 'crest') + 0.1) / 0.3);
    attr(lBr, 'd', `M${xc1.toFixed(1)} ${SY - SA - 14} V${SY - SA - 26} H${xc2.toFixed(1)} V${SY - SA - 14}`); lBr.style.opacity = lb; M.hide(lBr, lb <= 0);
    attr(lLab, 'x', ((xc1 + xc2) / 2).toFixed(1)); attr(lLab, 'y', SY - SA - 36); lLab.style.opacity = lb; M.hide(lLab, lb <= 0);
    const pt = M.io((t - wt('S3', 'count') + 0.1) / 0.3); [pLine, pLab].forEach(e => { e.style.opacity = pt; M.hide(e, pt <= 0); });
    const tc0 = wt('S3', 'count'), tc1 = tSq; const n0 = t < tc1 ? Ncr(t) - Ncr(tc0) : Ncr(t) - Ncr(tc1);
    M.setT(cnt, t < tc0 ? '' : `CRESTS PASSED: ${Math.max(0, Math.floor(n0))}`); cnt.style.opacity = pt;
    const cph = PT / lm - N, near = Math.abs(cph - Math.round(cph - 0.25) - 0.25); attr(crestDot, 'cx', PT); attr(crestDot, 'cy', SY - SA); crestDot.style.opacity = (pt * Math.max(0, 1 - near * 8)).toFixed(3); M.hide(crestDot, pt <= 0);
    const TAG = [[tS1 + 0.2, 'A LIGHT WAVE · SLOWED DOWN'], [wt('S2', 'wavelength'), 'λ · WAVELENGTH'], [wt('S3', 'frequency'), 'ν · FREQUENCY'], [tSq, 'SQUEEZED · λ HALVED'], [wt('S5', 'speed'), 'c STAYS THE SAME']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0], 1e9, POP);
    const sq = M.io((t - tSq) / 1.0);
    M.setT($('#ro0v'), `${(lm / 40).toFixed(1).replace('.0', '')} squares`); M.setT($('#ro1v'), `${(240 / lm).toFixed(1).replace('.0', '')} per s`); M.setT($('#ro2v'), '6 squares/s');
    rowsHi(['#ro0', '#ro1', '#ro2'], [wt('S3', 'count') + 0.2, wt('S3', 'frequency'), wt('S5', 'speed')], wt('S5', 'trade'), t);
    M.vis($('#roP'), t, wt('S5', 'trade') - 0.1, 1e9, POP);
    // spectrum
    M.vis($('#spc'), t, tR1 + 0.05, OUT('D1'), { dy: 36, ...o });
    fade(chirp, t, wt('R1', 'spectrum') - 0.2); fade(longL, t, wt('R2', 'longest')); fade(shortL, t, wt('R2', 'shortest'));
    const tRg = [wt('R2', 'Radio'), wt('R2', 'microwaves'), wt('R2', 'infrared'), wt('R2', 'visible'), wt('R2', 'ultraviolet'), wt('R2', 'X'), wt('R2', 'gamma')];
    rgs.forEach((g, i) => fade(g, t, tRg[i] - 0.1));
    fade(zoom, t, wt('R3', 'thin') - 0.1);
  }

  /* D + B: formulas, side by side, think */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const zD = OUT('B1');
    M.vis($('#dl'), t, tD1 + 0.05, zD, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, T0('D2') - 0.1, zD, { dx: 60, dy: 0, ...o });
    M.draw(dW, t, wt('D2', 'waves') - 0.2, 0.8); dBr.forEach((g, i) => fade(g, t, wt('D2', 'lambda') + i * 0.12)); fade(nuT, t, wt('D2', 'nu') - 0.1); fade(cBr, t, wt('D2', 'distance') - 0.1);
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B2'), { dy: 36, ...o });
    CMP.forEach((c, i) => { M.vis($('#cm' + i), t, tCm[i] - 0.15, 1e9, { dy: 16 }); c[2].forEach((_, j) => M.vis($(`#cr${i}_${j}`), t, tCm[i] + 0.15 + j * 0.3, 1e9, { dx: -12, dy: 0 })); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'violet') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'speed') });
  }

  /* C: Planck */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    let col = '#5A5F6B', lab = ''; RODC.forEach(([n, c, tt]) => { const u = M.io((t - tt + 0.1) / 0.5); col = mix(col, c, u); if (t >= tt - 0.1) lab = n; });
    attr(rod, 'fill', col); M.setT(rodL, lab); attr(rodL, 'fill', t >= RODC[2][2] - 0.1 ? C.ink : '#fff');
    fade(burner, t, tC1 + 0.3); attr(hotB, 'width', (544 * M.clamp((t - RODC[0][2] + 0.2) / (RODC[3][2] - RODC[0][2] + 0.6))).toFixed(1)); fade(hot, t, RODC[0][2] - 0.2);
    attr(hotB, 'fill', col === '#FFF4E0' ? '#E8B400' : mix('#D8301E', '#2F6FEB', M.io((t - RODC[3][2]) / 0.5)));
    avA(t, wt('C1', 'hotter') + 0.2, out);
    M.vis($('#cr'), t, wt('C1', 'iron') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(ramp, t, wt('C1', 'dull') - 0.2); fade(rampX, t, wt('C2', 'smoothly') - 0.2); M.draw(steps, t, wt('C2', 'packets') - 0.2, 0.7);
    stL.forEach((l, i) => fade(l, t, (i < 2 ? wt('C4', 'h') : i === 2 ? wt('C4', 'two') : wt('C4', 'three')) - 0.1));
    packs.forEach((g, i) => fade(g, t, [wt('C4', 'h'), wt('C4', 'two'), wt('C4', 'three')][i]));
    PUC.write($('#peq'), t, wt('C3', 'E') - 0.1, 0.6); PUC.write($('#peq2'), t, wt('C3', 'constant') - 0.1, 0.7);
    M.vis($('#psc'), t, wt('C2', 'Planck') - 0.1, 1e9, { dy: 16 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Light') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'but') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'packets') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ph = (t - tW1) * 160, env = x => Math.exp(-Math.pow((x - 392) / 170, 2));
    attr(pk, 'd', wpath(80, 704, 120, 46, x => env(x) * Math.sin((x - ph) / 44 * 2 * Math.PI)));
    fade(pk, t, wt('W2', 'Green') - 0.1);
    WRO.forEach((r, i) => M.vis($('#wro' + i), t, r[4] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#wP'), t, wt('W6', 'photon') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'nanometres') - 0.1, tStrike: wt('X3', 'billion') - 0.1, tRight: wt('X3', 'Change') - 0.1 });
    fade(tg, t, wt('X3', 'nanometre') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
