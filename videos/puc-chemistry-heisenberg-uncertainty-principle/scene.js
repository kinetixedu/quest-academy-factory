// PUC Chemistry Ep 20: Heisenberg uncertainty principle (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electron e- orange, photon violet, position uncertainty (dx) gold, momentum uncertainty (dp) blue, the limit h/4pi ink
const EC = '#C8461B', VC = '#7A4FE0', XC = '#B7791F', PC = '#2F6FEB', NC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const hash = n => { const s = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return s - Math.floor(s); };
const DX = `\\textcolor{${XC}}{\\Delta x}`, DP = `\\textcolor{${PC}}{\\Delta p}`, DV = `\\textcolor{${PC}}{\\Delta v}`, LIM = '\\frac{h}{4\\pi}';
const HUP = `${DX} \\times ${DP} \\geq ${LIM}`;
const squig = (lam, len = 60) => { let d = ''; for (let x = -len; x <= 0; x += 1.5) d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + (Math.sin(x / lam * Math.PI * 2) * 9).toFixed(1); return d + ' M0,-9 L10,0 L0,9'; };

Object.assign(M.IC, {
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1');
const tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['gauge', 'Tyre gauge', 'LETS SOME AIR OUT', 'H1', 'tyre'], ['thermo', 'Thermometer', 'COOLS A TINY DROP', 'H2', 'thermometer'], ['atom', 'Electron', 'EVERY LOOK KICKS IT', 'H4', 'electron']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'tyre'), wt('H2', 'thermometer')];
const JV = [['SMALL CHANGE', C.soft, C.ink], ['SMALL CHANGE', C.soft, C.ink], ['HUGE CHANGE', '#FBEDE6', EC]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" id="jv${i}" style="background:${JV[i][1]};color:${JV[i][2]}">${JV[i][0]}</div></div>`).join('');
const KIT = [['gauge', 'Gauge hissed', 'gauge'], ['bike', 'Tyre a little softer', 'softer']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P ---------- */
const QR = [['Position: where it is', 'Δx', 'P3', 'Position', XC], ['Momentum: p = mv', 'Δp', 'P3', 'Momentum', PC], ['Pin one down exactly...', 'MORE EXACT', 'P4', 'more', XC], ['...and the other blurs', 'LESS EXACT', 'P4', 'less', PC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${208 + i * 88}px;height:76px"><div class="nn" style="top:15px">${i + 1}</div><div class="qt" style="top:18px">${q}</div><div class="qk" style="top:24px;color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const pS = $('#pS');
const pBx = mk(pS, 'rect', { x: 180, width: 140, rx: 12, fill: XC }), pBp = mk(pS, 'rect', { x: 464, width: 140, rx: 12, fill: PC });
mk(pS, 'line', { x1: 120, y1: 440, x2: 664, y2: 440, stroke: C.ink, 'stroke-width': 3 });
txt(pS, 250, 480, 'Δx', { 'text-anchor': 'middle', 'font-size': 32, fill: XC, 'font-weight': 700, 'font-family': 'Poppins' }); txt(pS, 534, 480, 'Δp', { 'text-anchor': 'middle', 'font-size': 32, fill: PC, 'font-weight': 700, 'font-family': 'Poppins' });
const pProd = txt(pS, 392, 530, 'Δx × Δp  NEVER BELOW  h/4π', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });

/* ---------- S: bench ---------- */
const b = $('#bS'), XE = 430, YE = 290;
const box = mk(b, 'rect', { y: YE - 60, height: 120, rx: 14, fill: '#F6ECD9', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const boxL = txt(b, 0, YE - 74, 'Δx', { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 700, 'font-family': 'Poppins' });
const ghosts = Array.from({ length: 6 }, () => mk(b, 'circle', { r: 14, fill: EC, opacity: 0.25 }));
const fan = Array.from({ length: 5 }, () => PUC.arrow(b, PC, 5, 15));
const fanL = txt(b, 0, 0, 'Δp', { 'font-size': 28, fill: PC, 'font-weight': 700, 'font-family': 'Poppins' });
const bE = mk(b, 'circle', { cx: XE, cy: YE, r: 18, fill: EC });
const bEl = txt(b, XE, YE + 7, 'e⁻', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 700, 'font-family': 'Poppins' });
const ph1 = mk(b, 'path', { d: squig(34, 100), fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const ph2 = mk(b, 'path', { d: squig(8, 60), fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const phL = txt(b, 60, 470, '', { 'font-size': 18, fill: VC, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const tL = wt('S2', 'long') - 0.2, tHit1 = wt('S2', 'gentle'), tBlur = wt('S3', 'blurry') - 0.1, tSh = wt('S4', 'very') - 0.2, tHit2 = wt('S4', 'shrinks') - 0.2, tKick = wt('S5', 'kicks') - 0.1, tS6 = T0('S6');
// state s: 0 = long wave (wide box, small kick), 1 = short wave (narrow box, big kick)
const SK = M.keys([[0, 0], [tHit2, 0], [tHit2 + 0.1, 1]], 0.8);
const RO = [['position  Δx', XC], ['momentum  Δp', PC], ['Δx × Δp', C.ink]];
$('#ros').innerHTML = RO.map(([n, c], i) => `<div class="ro2" id="ro${i}" style="top:${70 + i * 62}px"><div class="k" style="color:${c}">${n}</div><div class="cb" id="rb${i}" style="position:absolute;left:300px;top:18px;height:16px;border-radius:8px;background:${c}"></div><div class="v2" id="rv${i}" style="color:${c}"></div></div>`).join('');
// chart: dx vs dp with the forbidden zone under the hyperbola
const gS = $('#gS'), GX0 = 110, GX1 = 700, GY0 = 222, GY1 = 74, KK = 0.1;
const gx = v => GX0 + (GX1 - GX0) * v, gy = v => GY0 - (GY0 - GY1) * v;
let fz = `M${gx(0.1)},${gy(1)}`; for (let v = 0.1; v <= 1; v += 0.02) fz += `L${gx(v).toFixed(1)},${gy(KK / v).toFixed(1)}`; fz += `L${gx(1)},${GY0} L${GX0},${GY0} L${GX0},${gy(1)} Z`;
mk(gS, 'path', { d: fz, fill: C.redBg });
let hy = ''; for (let v = 0.1; v <= 1; v += 0.02) hy += (hy ? 'L' : 'M') + gx(v).toFixed(1) + ',' + gy(KK / v).toFixed(1);
const hyp = mk(gS, 'path', { d: hy, fill: 'none', stroke: C.ink, 'stroke-width': 3.5 });
mk(gS, 'path', { d: `M${GX0},${GY1 - 8} V${GY0} H${GX1 + 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(gS, GX1 + 10, GY0 + 30, 'Δx →', { 'text-anchor': 'end', 'font-size': 18, fill: XC, 'font-weight': 700 }); txt(gS, GX0 - 14, GY1 + 4, 'Δp', { 'text-anchor': 'end', 'font-size': 18, fill: PC, 'font-weight': 700 });
txt(gS, gx(0.2), GY0 - 14, 'NOT ALLOWED', { 'font-size': 15, fill: C.red, 'font-weight': 600 });
const gRect = mk(gS, 'rect', { x: GX0, fill: 'none', stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gDot = mk(gS, 'circle', { r: 10, fill: EC });
const sState = t => t < tS6 ? SK(t) : 0.5 + 0.48 * Math.sin((t - tS6) * 1.6 + Math.PI / 2) * 1;
const dxOf = s => M.lerp(0.85, 0.12, s);
// compare
const CM = [['A grain of 1 mg', '≈ 10⁻²⁸ m² s⁻¹', 'FAR TOO SMALL TO MATTER', 0.3, C.ink, 'milligram'], ['An electron', '≈ 10⁻⁴ m² s⁻¹', 'HUGE AT THE SCALE OF AN ATOM', 0.9, EC, 'electron']];
$('#cmps').innerHTML = CM.map(([n, v, w, , c], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ct">${n}</div><div class="cw2" style="color:${c}">h/4πm</div><div class="big" id="cmv${i}" style="top:110px;color:${c}">${v}</div><div class="cbar" id="cmb${i}" style="position:absolute;left:28px;top:220px;height:28px;border-radius:14px;background:${c}"></div><div class="lbl" style="left:28px;top:270px">LOG SCALE · 10⁻⁴⁰ TO 10⁰</div><div class="pillp" id="cmt${i}" style="left:28px;top:370px;color:${c}">${w}</div></div>`).join('');
const tCm = [wt('B2', 'milligram'), wt('B3', 'electron')];
const th1 = PUC.think($('#th1'), { q: 'Does the uncertainty principle stop us from tracking a cricket ball?', opts: ['Yes', 'No'], right: 1, why: 'Its mass is so big that h/4πm is tiny. It matters only for particles like electrons.' });

/* ---------- D ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${DX},\\; ${DP}`), 'uncertainty in position, momentum'],
  [K(HUP), 'never smaller'],
  [K(`p = mv \\Rightarrow ${DX} \\times ${DV} \\geq \\frac{h}{4\\pi m}`), 'mass m constant'],
  [K(`m \\uparrow \\;\\Rightarrow\\; \\frac{h}{4\\pi m} \\downarrow`), 'big mass, tiny limit']], { label: 'THE PRINCIPLE · STEP BY STEP', y0: 120, dy: 100 });
const tDs = [wt('D2', 'Delta'), wt('D3', 'Their'), wt('D4', 'Momentum'), wt('D5', 'Notice')];
const dS = $('#dS'), AX = 100, AY = 470;
mk(dS, 'path', { d: `M${AX},90 V${AY} H700`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(dS, 700, AY + 32, 'Δx', { 'text-anchor': 'end', 'font-size': 22, fill: XC, 'font-weight': 700, 'font-family': 'Poppins' }); txt(dS, AX - 14, 104, 'Δp', { 'text-anchor': 'end', 'font-size': 22, fill: PC, 'font-weight': 700, 'font-family': 'Poppins' });
const dRect = mk(dS, 'rect', { x: AX, fill: '#F2EEE3', stroke: C.ink2, 'stroke-width': 2.5 });
const dTile = mk(dS, 'rect', { x: AX, fill: C.ink });
const dTileL = txt(dS, 0, 0, 'h/4π', { 'text-anchor': 'middle', 'font-size': 22, fill: '#fff', 'font-weight': 700, 'font-family': 'Poppins' });
const dMl = txt(dS, 700, 130, '', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const AREA = 32000;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(HUP);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${DV} \\geq \\frac{h}{4\\pi\\, m\\, ${DX}}`)],
  [K(`4\\pi \\times 9.109 \\times 10^{-31} \\times 10^{-10} = 1.145 \\times 10^{-39}`)],
  [K(`${DV} \\geq \\frac{6.626 \\times 10^{-34}}{1.145 \\times 10^{-39}}`)],
  [K(`${DV} \\geq 5.79 \\times 10^{5}\\,\\text{m/s}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 82 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W4'), T0('W5'), T0('W6'), wt('W6', 'five')];
const s2 = $('#wS2'), WX = 300, WY = 270;
const wAt = mk(s2, 'circle', { cx: WX, cy: WY, r: 110, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const wNu = mk(s2, 'circle', { cx: WX, cy: WY, r: 10, fill: NC });
const wBr = mk(s2, 'path', { d: `M${WX - 110},${WY + 140} V${WY + 152} H${WX + 110} V${WY + 140}`, fill: 'none', stroke: XC, 'stroke-width': 3 });
const wBrL = txt(s2, WX, WY + 182, 'Δx = 1.0 × 10⁻¹⁰ m · ABOUT ONE ATOM', { 'text-anchor': 'middle', 'font-size': 17, fill: XC, 'font-weight': 600 });
const wE = mk(s2, 'circle', { cx: WX + 40, cy: WY - 30, r: 14, fill: EC });
const wFan = Array.from({ length: 7 }, () => PUC.arrow(s2, PC, 4, 14));
const wFanL = txt(s2, 720, 120, 'SPEED UNKNOWN BY', { 'text-anchor': 'end', 'font-size': 17, fill: PC, 'font-weight': 600 });

/* ---------- C ---------- */
const cw = $('#cwS'), OX = 392, OY = 270, OR = 150;
mk(cw, 'circle', { cx: OX, cy: OY, r: OR, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); mk(cw, 'circle', { cx: OX, cy: OY, r: 14, fill: NC });
const cE = mk(cw, 'circle', { r: 14, fill: EC }); const cA = PUC.arrow(cw, XC, 4, 14);
const cX = mk(cw, 'path', { d: `M${OX - 170},${OY - 170} L${OX + 170},${OY + 170} M${OX + 170},${OY - 170} L${OX - 170},${OY + 170}`, stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
const cpS = $('#cpS');
mk(cpS, 'circle', { cx: OX, cy: OY, r: 14, fill: NC });
const CLD = Array.from({ length: 360 }, (_, n) => { const r = -(Math.log(1 - hash(n) * 0.999) + Math.log(1 - hash(n + 0.31) * 0.999) + Math.log(1 - hash(n + 0.57) * 0.999)) / 2, a = hash(n + 0.83) * Math.PI * 2; return mk(cpS, 'circle', { cx: (OX + r * 70 * Math.cos(a)).toFixed(1), cy: (OY + r * 70 * Math.sin(a)).toFixed(1), r: 3, fill: EC, opacity: 0.6 }); });
const avA = PUC.avatar($('#sC'), { x: 976 + 300, y: 270 + 40, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So it is a cloud, not a circle!' });

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Better instruments can remove the uncertainty', right: `A law of nature: even a perfect one obeys ${K(HUP)}` });
const tsv = $('#tS');
{ let z = 'M60,40'; for (let v = 0.12; v <= 1; v += 0.02) z += `L${(60 + 380 * v).toFixed(1)},${(220 - 180 * Math.min(1, 0.12 / v)).toFixed(1)}`; z += 'L440,220 L60,220 Z'; var tZone = mk(tsv, 'path', { d: z, fill: C.redBg }); }
const tAx = mk(tsv, 'path', { d: 'M60,30 V220 H450', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const tLb = txt(tsv, 130, 200, 'NO INSTRUMENT GETS IN HERE', { 'font-size': 14, fill: C.red, 'font-weight': 600 });
const tG = mk(tsv, 'g', {}); tG.appendChild(tZone); tG.appendChild(tAx); tG.appendChild(tLb);
const where = PUC.where($('#wa'), { on: [], type: `Numericals on ${K(HUP)}, and ratio questions comparing particles` });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `An electron and a proton are located with the same ${K(DX)}. The ratio of the minimum ${K(DV)}, electron to proton, is closest to<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: mₚ ≈ 1836 mₑ</span>`, qW: 800,
  opts: [K('1'), K('43'), K('1836'), K('1/1836')], right: 2, optW: 474, optY: 350, optH: 100, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${DV} \\geq \\frac{h}{4\\pi m ${DX}}`)], [K(`\\text{same } ${DX} \\Rightarrow ${DV} \\propto \\frac{1}{m}`)], [K(`\\frac{${DV}_\\mathrm{e}}{${DV}_\\mathrm{p}} = \\frac{m_\\mathrm{p}}{m_\\mathrm{e}}`)], [K(`\\approx \\textcolor{${C.ok}}{1836}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'eighteen')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Heisenberg uncertainty principle', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${HUP} \\qquad ${DX} \\times ${DV} \\geq \\frac{h}{4\\pi m}`), '<b>Heisenberg, 1927</b>: exact position and exact momentum, never both at once', '<b>Not bad instruments</b>: it is a law of nature', '<b>h/4πm</b>: about 10⁻⁴ m² s⁻¹ for an electron, about 10⁻²⁸ for 1 mg', '<b>No exact path</b> for an electron: no fixed Bohr orbits, only probability'] });
const YQ = ['Write the uncertainty principle, and say what each symbol means.', 'Why does it not matter for a cricket ball?', 'Why does it rule out fixed orbits for electrons?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 21', topic: 'If an electron has no path, what is it? Quantum Mechanical Model', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tKick - 0.2, 1.06, 1000, 600], [tS6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const w4 = $('#wa .wat'); if (w4 && w4.offsetWidth > 1528) w4.style.fontSize = Math.floor(28 * 1528 / w4.offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  [0, 1].forEach(i => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  M.hide($('#jb2'), true);

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, i < 2 ? tMorph + 0.3 + i * 0.12 : wt('H4', 'electron') - 0.1, 1e9, { dy: 16 }));
    [0, 1].forEach(i => M.vis($('#jv' + i), t, wt('H2', 'Measuring') - 0.1 + i * 0.15, 1e9, POP)); M.vis($('#jv2'), t, wt('H4', 'small') - 0.1, 1e9, POP);
    M.vis($('#hjP'), t, wt('H2', 'change') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); });
    M.vis($('#hTz'), t, wt('H5', 'path') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pSci'), t, wt('P1', 'Werner') - 0.15, 1e9, { dy: 14 });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); });
    M.vis($('#pw'), t, wt('P2', 'both') - 0.2, out, { dx: 60, dy: 0, ...o });
    // seesaw: area constant, swaps as the voice says "more ... less"
    const s = t < wt('P4', 'more') ? 0.5 : 0.5 + 0.42 * Math.sin((t - wt('P4', 'more')) * 2.2);
    const hx = M.lerp(320, 60, s), hp = 19200 / hx;
    attr(pBx, 'height', hx.toFixed(1)); attr(pBx, 'y', (440 - hx).toFixed(1)); attr(pBp, 'height', hp.toFixed(1)); attr(pBp, 'y', (440 - hp).toFixed(1));
    fade(pProd, t, wt('P4', 'other') - 0.1);
  }

  /* S + B */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tSplit = tBlur - 0.2;
    { const sh = M.spring(t - tSplit, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#ro'), t, tSplit + 0.1, z, { dx: 60, dy: 0, ...o }); M.vis($('#gr'), t, tSplit + 0.35, z, { dy: 36, ...o });
    const s = sState(t);
    fade(bE, t, tS1 + 0.3); fade(bEl, t, tS1 + 0.3);
    // photons
    const u1 = M.clamp((t - tL) / (tHit1 - tL)), u2 = M.clamp((t - tSh) / (tHit2 - tSh));
    attr(ph1, 'transform', `translate(${M.lerp(40, XE - 22, u1).toFixed(1)} ${YE})`); M.hide(ph1, t < tL || u1 >= 1);
    attr(ph2, 'transform', `translate(${M.lerp(40, XE - 22, u2).toFixed(1)} ${YE})`); M.hide(ph2, t < tSh || u2 >= 1);
    M.setT(phL, t < tSh ? 'LONG WAVELENGTH LIGHT · GENTLE' : 'SHORT WAVELENGTH · p = h/λ IS BIG'); phL.style.opacity = M.clamp((t - tL) / 0.3);
    // dx box
    const bw = M.lerp(320, 60, s), bu = M.clamp((t - tBlur) / 0.4);
    attr(box, 'x', (XE - bw / 2).toFixed(1)); attr(box, 'width', bw.toFixed(1)); box.style.opacity = bu; M.hide(box, bu <= 0); attr(boxL, 'x', XE); boxL.style.opacity = bu;
    ghosts.forEach((g, i) => { const gx = XE + (hash(i + 2) - 0.5) * (bw - 30), gy = YE + (hash(i + 9) - 0.5) * 70; attr(g, 'cx', gx.toFixed(1)); attr(g, 'cy', gy.toFixed(1)); g.style.opacity = (0.28 * bu * (1 - s)).toFixed(3); });
    // dp fan: after each hit
    const k1 = M.clamp((t - tHit1) / 0.4), k2 = M.clamp((t - tKick) / 0.5), spread = t < tKick ? 8 : M.lerp(8, 70, k2) * (t >= tS6 ? M.lerp(0.15, 1, s) : 1), len = t < tKick ? 56 : M.lerp(56, 150, k2) * (t >= tS6 ? M.lerp(0.5, 1, s) : 1);
    const fo = t < tHit2 ? k1 : t < tKick ? 0.25 : k2;
    fan.forEach((a, i) => { const an = (i - 2) / 2 * spread * Math.PI / 180; if (fo > 0.01) a.set(XE + 24 * Math.cos(an), YE + 24 * Math.sin(an), XE + (24 + len) * Math.cos(an), YE + (24 + len) * Math.sin(an)); else a.set(0, 0, 0, 0); a.g.style.opacity = (fo * (i === 2 ? 1 : 0.55)).toFixed(3); });
    attr(fanL, 'x', (XE + 40 + len).toFixed(1)); attr(fanL, 'y', (YE - 20 - len * Math.sin(spread * Math.PI / 180) * 0.6).toFixed(1)); fanL.style.opacity = fo;
    const TAG = [[tS1 + 0.4, 'ONE ELECTRON'], [tL, 'LONG WAVE · GENTLE'], [tBlur, 'BLURRY · WIDE Δx'], [tSh, 'SHORT WAVE'], [tHit2, 'SHARP · NARROW Δx'], [tKick, 'HARD KICK · WIDE Δp'], [tS6, 'ONE SIDE OR THE OTHER']];
    let tg0 = null; for (const [tt, s0] of TAG) if (t >= tt) tg0 = s0; if (tg0) M.setT(btag, tg0); M.vis(btag, t, tS1 + 0.3, 1e9, POP);
    // readout bars
    const dxv = dxOf(s), dpv = KK / dxv;
    RO.forEach((_, i) => { M.vis($('#ro' + i), t, tSplit + 0.3 + i * 0.12, 1e9, { dx: -16, dy: 0 }); });
    snap($('#rb0'), 'width', (200 * dxv).toFixed(1) + 'px'); snap($('#rb1'), 'width', (200 * Math.min(1, dpv)).toFixed(1) + 'px'); M.hide($('#rb2'), true);
    M.setT($('#rv0'), dxv > 0.5 ? 'WIDE' : dxv > 0.25 ? 'MEDIUM' : 'NARROW'); M.setT($('#rv1'), dpv < 0.2 ? 'SMALL' : dpv < 0.45 ? 'MEDIUM' : 'LARGE'); M.setT($('#rv2'), '≥ h/4π  ✓');
    // chart
    attr(gDot, 'cx', gx(dxv).toFixed(1)); attr(gDot, 'cy', gy(dpv).toFixed(1));
    attr(gRect, 'y', gy(dpv).toFixed(1)); attr(gRect, 'width', (gx(dxv) - GX0).toFixed(1)); attr(gRect, 'height', (GY0 - gy(dpv)).toFixed(1));
    M.draw(hyp, t, tSplit + 0.8, 0.8);
    // compare
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B4'), { dy: 36, ...o });
    CM.forEach((c, i) => { M.vis($('#cm' + i), t, wt('B1', i ? 'electron' : 'grain') - 0.1, 1e9, { dy: 16 }); M.vis($('#cmv' + i), t, tCm[i] - 0.1, 1e9, { dy: 10 });
      snap($('#cmb' + i), 'width', (640 * c[3] * M.io((t - tCm[i]) / 0.6)).toFixed(1) + 'px'); M.vis($('#cmt' + i), t, tCm[i] + 0.8, 1e9, POP); });
    M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB4, tOpts: wt('B4', 'Does') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Its') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dR'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    // rectangle dx by dp; from step 2 it squeezes but its area never drops below the ink tile
    const sq = t < tDs[1] ? 0 : Math.sin((t - tDs[1]) * 1.5), w = 260 * Math.exp(0.7 * sq), hh = (AREA * 1.6) / w;
    const ru = M.clamp((t - tDs[0]) / 0.5);
    attr(dRect, 'y', (AY - hh * ru).toFixed(1)); attr(dRect, 'width', (w * ru).toFixed(1)); attr(dRect, 'height', (hh * ru).toFixed(1)); M.hide(dRect, ru <= 0);
    const mF = t < tDs[3] ? 1 : M.lerp(1, 6, M.io((t - tDs[3] - 0.3) / 1.5)), ta = AREA / mF, tw = w * Math.sqrt(ta / (w * hh)) * Math.sqrt(w / hh) / Math.sqrt(w / hh), tw2 = Math.sqrt(ta * w / hh), th2 = ta / tw2;
    const tu = M.clamp((t - tDs[1] - 0.2) / 0.4);
    attr(dTile, 'y', (AY - th2).toFixed(1)); attr(dTile, 'width', tw2.toFixed(1)); attr(dTile, 'height', th2.toFixed(1)); dTile.style.opacity = tu;
    attr(dTileL, 'x', (AX + tw2 / 2).toFixed(1)); attr(dTileL, 'y', (AY - th2 / 2 + 8).toFixed(1)); M.setT(dTileL, t < tDs[2] ? 'h/4π' : 'h/4πm'); dTileL.style.opacity = tu * (th2 > 40 && tw2 > 70 ? 1 : 0);
    M.setT(dMl, t < tDs[3] ? '' : `MASS × ${mF.toFixed(0)} · LIMIT ÷ ${mF.toFixed(0)}`); dMl.style.opacity = M.clamp((t - tDs[3]) / 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'An') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'probabilities') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    fade(wAt, t, T0('W2') + 0.5); fade(wNu, t, T0('W2') + 0.5); fade(wBr, t, wt('W2', 'size') - 0.1); fade(wBrL, t, wt('W2', 'size'));
    fade(wE, t, T0('W2') + 0.8);
    const fu = M.io((t - wt('W6', 'five') + 0.2) / 0.6);
    wFan.forEach((a, i) => { const an = (-40 + i * 13) * Math.PI / 180, L0 = 22, L1 = 22 + (80 + 220 * fu) * (0.6 + 0.4 * hash(i + 3)); if (fu > 0.01) a.set(WX + 40 + L0 * Math.cos(an), WY - 30 + L0 * Math.sin(an), WX + 40 + L1 * Math.cos(an), WY - 30 + L1 * Math.sin(an)); else a.set(0, 0, 0, 0); a.g.style.opacity = (fu * 0.8).toFixed(3); });
    fade(wFanL, t, wt('W6', 'five'));
    M.vis($('#wGp'), t, wt('W6', 'metres') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cw'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const a = (t - tC1) * 1.6; attr(cE, 'cx', (OX + OR * Math.cos(a)).toFixed(1)); attr(cE, 'cy', (OY + OR * Math.sin(a)).toFixed(1));
    cA.set(OX + OR * Math.cos(a), OY + OR * Math.sin(a), OX + OR * Math.cos(a) - 70 * Math.sin(a), OY + OR * Math.sin(a) + 70 * Math.cos(a));
    M.draw(cX, t, wt('C2', 'no') - 0.1, 0.5); M.vis($('#cwP'), t, wt('C2', 'no'), 1e9, POP);
    M.vis($('#cp'), t, wt('C2', 'probability') - 0.6, out, { dx: 60, dy: 0, ...o });
    const n = Math.floor(CLD.length * M.clamp((t - wt('C2', 'probability') + 0.3) / 3)); CLD.forEach((c, i) => M.hide(c, i >= n));
    M.vis($('#cpP'), t, wt('C2', 'probability') + 0.2, 1e9, POP);
    avA(t, T1('C2') + 0.1, OUT('X1'));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'uncertainty') - 0.1, tStrike: T0('X3') + 0.1, tRight: wt('X3', 'law') - 0.1 });
    fade(tG, t, wt('X3', 'perfect') - 0.1);
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
