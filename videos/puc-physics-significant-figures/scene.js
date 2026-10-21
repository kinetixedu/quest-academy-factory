// PUC Physics Ep 11: Significant figures (Motion notebook, measuring bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const SC = C.ac, UC = C.gold, XC = C.dim;      // significant digit blue, uncertain digit gold, not significant grey
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// colour a number string: pattern chars s = significant, u = uncertain, x = not significant, p = point
const dg = (str, pat) => [...str].map((ch, i) => `<span class="${pat[i] || 'p'}">${ch}</span>`).join('');

Object.assign(M.IC, {
  map: ['M14.1 6.1 9 3.6a2 2 0 0 0-1.8 0L3.6 5.4A1 1 0 0 0 3 6.3v13.1a1 1 0 0 0 1.4.9l3.6-1.8a2 2 0 0 1 1.8 0l5.1 2.6a2 2 0 0 0 1.8 0l3.7-1.8a1 1 0 0 0 .6-.9V5.3a1 1 0 0 0-1.4-.9l-3.6 1.8a2 2 0 0 1-1.8 0Z', 'M15 5.8v15', 'M9 3.2v15'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tM1 = T0('M1'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tC1 = T0('C2'), tC5 = T0('C5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: about 1 km vs 963 m ---------- */
const TOOLS = [['chat', 'A FRIEND SAYS', 'about 1 km', '1 sig. fig.', ['H1', 'friend']], ['map', 'A MAP SAYS', '963 m', '3 sig. figs', ['H1', 'map']]];
$('#tools').innerHTML = TOOLS.map(([ic, n, v, c], i) => `<div class="tool" id="tl${i}" style="left:${380 + i * 600}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="tn">${n}</div><div class="tv">${v}</div><div class="tc" id="tc${i}">${c}</div></div>`).join('');
const tTool = TOOLS.map(tl => wt(...tl[4]));

/* ---------- P: reliable / uncertain ---------- */
/* ---------- S: bench ---------- */
const s = $('#simS'), PXc = 60, X0 = 92, RY = 250;            // 60 px per cm, zero at x 92
const TIP = 7.43;
// pencil (group translated in x); tip at local x = 0
const pen = mk(s, 'g', {});
const PL = TIP * PXc;
mk(pen, 'rect', { x: -PL, y: 170, width: 26, height: 40, rx: 5, fill: '#E7A4A4', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: -PL + 26, y: 170, width: 16, height: 40, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: -PL + 42, y: 170, width: PL - 84, height: 40, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'path', { d: `M${-42},170 L0,190 L${-42},210 Z`, fill: '#EBD3AE', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(pen, 'path', { d: `M-12,184.3 L0,190 L-12,195.7 Z`, fill: C.ink });
const penGh = [0, 1, 2].map(() => { const g = mk(s, 'g', { opacity: 0 }); mk(g, 'rect', { x: -PL, y: 170, width: PL - 42, height: 40, rx: 5, fill: C.ink }); mk(g, 'path', { d: `M${-42},170 L0,190 L${-42},210 Z`, fill: C.ink }); return g; });
s.appendChild(pen);
mk(s, 'rect', { x: X0 - 20, y: RY, width: 640, height: 92, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
const RM = mk(s, 'g', {});                                         // millimetre marks (second ruler)
for (let mm = 0; mm <= 100; mm++) { if (mm % 10 === 0) continue; const x = X0 + mm * PXc / 10; mk(RM, 'line', { x1: x, y1: RY, x2: x, y2: RY + (mm % 5 ? 12 : 20), stroke: C.ink, 'stroke-width': 1.3 }); }
for (let c = 0; c <= 10; c++) { const x = X0 + c * PXc; mk(s, 'line', { x1: x, y1: RY, x2: x, y2: RY + 34, stroke: C.ink, 'stroke-width': 2.2 }); txt(s, x, RY + 62, c, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(s, X0 + 600, RY + 84, 'cm', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const tipL = mk(s, 'line', { x1: X0 + TIP * PXc, y1: 186, x2: X0 + TIP * PXc, y2: RY + 120, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
// guess zone: the gap between the two marks around the tip
const gz = mk(s, 'rect', { y: RY - 4, height: 46, rx: 4, fill: UC, opacity: 0.18 });
const gzL = txt(s, 0, RY + 112, 'the guess lives here', { 'text-anchor': 'middle', 'font-size': 18, fill: UC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k" style="font-style:normal;font-size:24px;color:${C.mute}">reading</span><span class="v dg" id="roR">7.4</span><span class="u">cm</span>
  <span class="k" style="font-style:normal;font-size:24px;color:${SC}">sure</span><span class="v" id="roS" style="color:${SC}">7</span><span class="u">digits</span>
  <span class="k" style="font-style:normal;font-size:24px;color:${UC}">guess</span><span class="v" id="roU" style="color:${UC}">4</span><span class="u">digit</span>`;
// graph: significant figures vs gap between marks (1 cm, 1 mm, 0.1 mm), log x
const gS = $('#grS'), GX = i => 160 + i * 220, GY = n => 220 - (n - 1) * 46;
mk(gS, 'path', { d: 'M110,70 V228 H730', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[['1 cm', 0], ['1 mm', 1], ['0.1 mm', 2]].forEach(([l, i]) => { mk(gS, 'line', { x1: GX(i), y1: 228, x2: GX(i), y2: 236, stroke: C.ink, 'stroke-width': 2 }); txt(gS, GX(i), 258, l, { 'text-anchor': 'middle', 'font-weight': 600, fill: C.ink }); });
[2, 3, 4].forEach(n => { mk(gS, 'line', { x1: 102, y1: GY(n), x2: 110, y2: GY(n), stroke: C.ink, 'stroke-width': 2 }); txt(gS, 96, GY(n) + 6, n, { 'text-anchor': 'end' }); });
const gLn = mk(gS, 'path', { d: '', stroke: C.ac, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const gGhost = mk(gS, 'circle', { cx: GX(2), cy: GY(4), r: 10, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '4 4' });
const gPt = [mk(gS, 'circle', { cx: GX(0), cy: GY(2), r: 8, fill: C.ink }), mk(gS, 'circle', { cx: GX(1), cy: GY(3), r: 8, fill: C.ink })];
const gDot = mk(gS, 'circle', { r: 11, fill: C.ac });
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'marks &divide;10 &rarr; +1 significant figure'; $('#gr').appendChild(gTag);
const tCmR = wt('S2', 'First'), tPen = wt('S2', 'tip') - 0.9, tMmR = wt('S4', 'millimetre') - 0.1;
const tSlow = tM1 + 0.1, slowEnd = T1('M2');
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Finer marks, one more digit.' });

/* ---------- D: four rules ---------- */
const RULES = [['Non-zero digits count', '243', 'sss', 3, ['D2', 'Every']], ['Zeros between them count', '205', 'sss', 3, ['D3', 'zero']], ['Front zeros do not count', '0.0025', 'xpxxss', 2, ['D4', 'Zeros']], ['End zeros count with a point', '250.0', 'sssps', 4, ['D5', 'end']]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + RULES.map(([r, ex, pat, n], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${r}</div><div class="why dg">${dg(ex, pat)}<b>${n} sig. figs</b></div></div>`).join('');
const tRule = RULES.map(r => wt(...r[4]));
const tR4b = wt('D5', 'no');
const bigEx = [['243', 'sss', 3], ['205', 'sss', 3], ['0.0025', 'xpxxss', 2], ['250.0', 'sssps', 4], ['250', 'ssx', 2]];

/* ---------- R: why front zeros never count ---------- */
const LKS = ['2.308 cm has 4 significant figures', 'Write it in mm, then in m', 'Pencil and ruler unchanged: same precision', 'Front zeros came from the unit choice'];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('') + [0, 1, 2].map(i => `<div class="lka" id="la${i}" style="top:${160 + i * 96}px"></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const URS = [['2.308', 'spsss', 'cm', ['R2', 'Take']], ['23.08', 'sspss', 'mm', ['R3', 'twenty']], ['0.02308', 'xpxssss', 'm', ['R3', 'metres']]];
$('#urs').innerHTML = URS.map(([v, p, u], i) => `<div class="ur" id="ur${i}" style="top:${84 + i * 124}px"><div class="uv dg">${dg(v, p)} <span style="font-size:36px;color:var(--mute)">${u}</span></div><div class="uc">4 SIG. FIGS</div></div>`).join('');
const tUr = URS.map(u => wt(...u[3]));

/* ---------- K: side by side + think ---------- */
const th1 = PUC.think($('#th1'), { q: 'How many significant figures in 0.00250?', opts: ['Two', 'Three'], right: 1, why: 'Three: 2, 5 and the end zero (it has a decimal point). Front zeros only place the point.' });

/* ---------- C: calculation rules + think ---------- */
$('#cls').innerHTML = [['', '2.0', '2 SIG. FIGS'], ['×', '3.14', '3 SIG. FIGS'], ['=', '6.28', 'KEEP 2 → ?']].map(([o, v, n], i) => `<div class="col" id="cl${i}" style="top:${200 + i * 84}px"><div class="co">${o}</div><div class="cv">${v}</div><div class="cn">${n}</div></div>`).join('');
$('#crs').innerHTML = [['', '12.11', '2 DECIMALS'], ['+', '18.0', '1 DECIMAL'], ['+', '1.012', '3 DECIMALS'], ['=', '31.1', 'KEEP 1']].map(([o, v, n], i) => `<div class="col" id="cr${i}" style="top:${200 + i * 84}px"><div class="co">${o}</div><div class="cv">${v}</div><div class="cn">${n}</div></div>`).join('');
const th2 = PUC.think($('#th2'), { q: '2.0 × 3.14 = 6.28. Which do we write?', opts: ['6.28', '6.3'], right: 1, why: '6.3. The weakest measurement, 2.0, has only 2 significant figures.' });

/* ---------- W: worked example (balance + measuring cylinder) ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\rho = \\dfrac{m}{V} = \\dfrac{39.6\\,\\text{g}}{5.0\\,\\text{cm}^3}`)],
  [K(`\\text{calculator: } 7.92`)],
  [K(`39.6 \\to 3,\\;\\; 5.0 \\to 2 \\;\\Rightarrow\\; \\text{keep } 2`)],
  [K(`\\rho = \\textcolor{${SC}}{7.9\\,\\text{g/cm}^3}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS');
// cylinder
const CYX = 440, CYW = 150, CYB = 520, CYT = 250, MLPX = 6.4;      // 6.4 px per mL (cm^3)
const wat = mk(w, 'rect', { x: CYX + 4, width: CYW - 8, fill: '#CFE0FB' });
mk(w, 'path', { d: `M${CYX},${CYT} V${CYB} H${CYX + CYW} V${CYT}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
mk(w, 'rect', { x: CYX - 20, y: CYB, width: CYW + 40, height: 12, rx: 4, fill: C.ink });
for (let ml = 0; ml <= 40; ml += 1) { const y = CYB - ml * MLPX; if (y < CYT + 4) break; mk(w, 'line', { x1: CYX + CYW - (ml % 5 ? 14 : 28), y1: y, x2: CYX + CYW, y2: y, stroke: C.ink, 'stroke-width': ml % 5 ? 1.2 : 2 }); if (ml % 5 === 0 && ml) txt(w, CYX + CYW + 12, y + 6, ml, { 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(w, CYX + CYW + 12, CYT - 8, 'cm³', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
// balance
mk(w, 'rect', { x: 80, y: 470, width: 230, height: 62, rx: 10, fill: C.ink });
mk(w, 'rect', { x: 100, y: 450, width: 190, height: 20, rx: 4, fill: '#8D99AE' });
const bLcd = mk(w, 'rect', { x: 120, y: 482, width: 150, height: 38, rx: 6, fill: '#1E2A44' });
const bTx = txt(w, 260, 510, '0.0 g', { 'text-anchor': 'end', 'font-size': 24, fill: '#B9F3C9', 'font-weight': 600 });
const blk = mk(w, 'rect', { width: 76, height: 50, rx: 6, fill: '#6F7C94', stroke: C.ink, 'stroke-width': 2.5 });
const blkGh = [0, 1, 2].map(() => mk(w, 'rect', { width: 76, height: 50, rx: 6, fill: C.ink, opacity: 0 }));
const tOnPan = T0('W2') + 0.3, tLift = wt('W2', 'volume') - 0.2, tDrop = wt('W2', 'volume') + 0.6;
const blkPos = (t) => {
  if (t < tLift) { const u = M.o3((t - tOnPan) / 0.5); return [157, M.lerp(330, 400, u)]; }
  if (t < tDrop) { const u = M.io((t - tLift) / (tDrop - tLift)); return [M.lerp(157, CYX + 37, u), M.lerp(400, 160, Math.sin(u * Math.PI / 2)) + 0]; }
  // free fall into the water, then settle on the bottom (physics: accelerates)
  const tf = t - tDrop, y = 160 + 0.5 * 2600 * tf * tf; return [CYX + 37, Math.min(y, CYB - 50)];
};
const V0 = 20.0, V1 = 25.0;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '152.36 + 20.4 + 0.512 = 173 (fewest sig. figs)', right: '= 173.3 (fewest decimal places: one)' });
const ADD = ['152.36', '20.4', '0.512'];
$('#addC').insertAdjacentHTML('beforeend', ADD.map((v, i) => `<div class="ar" id="ar${i}" style="top:${i * 40}px">${i ? '+ ' : ''}${v.padEnd(7, ' ')}</div>`).join('') + `<div class="ar" id="ar3" style="top:126px;border-top:3px solid #16213E;padding-top:6px">173.272</div><div class="ar" id="ar4" style="top:172px;color:var(--ok)">173.3</div>`);
const where = PUC.where($('#wa'), { on: [], type: 'Count the significant figures, or round a calculated answer correctly' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A card measures 12.60 cm by 4.3 cm. Its area, to the correct significant figures, is', qW: 780,
  opts: ['54.18 cm²', '54.2 cm²', '54 cm²', '54.180 cm²'], right: 2, optY: 300 });
const so = PUC.solution($('#so'), [['12.60 → 4 sig. figs'], ['4.3 → 2 sig. figs'], ['12.60 × 4.3 = 54.18'], ['keep 2 → <b style="color:var(--ok)">54 cm²</b>']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Twelve'), wt('A2', 'Four'), wt('A3', 'product'), wt('A3', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 248, w: 1200, h: 520, title: 'Recap · significant figures', y0: 96, dy: 68, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Sig. figs</b> = reliable digits + first uncertain digit', '<b>Count</b>: non-zero digits, and zeros between them', '<b>Front zeros never</b>: 0.0025 has 2', '<b>End zeros only with a point</b>: 250.0 has 4, 250 has 2', '<b>× ÷</b> keep fewest sig. figs · <b>+ −</b> keep fewest decimals', '<b>Change of unit</b> never changes the count'] });
const YQ = ['Why does 250.0 g say more than 250 g?', "Why don't the zeros in 0.0025 count?", 'When adding measurements, what decides the decimal places?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 12', topic: 'Which zeros were measured? Scientific Notation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.15, 640, 520], [slowEnd - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const big = $('#bigR'), sp = big.querySelectorAll('span'), bb = big.getBoundingClientRect(), pr = $('#pl').getBoundingClientRect();
  const a = sp[0].getBoundingClientRect(), b = sp[2].getBoundingClientRect();
  const x0 = a.left - pr.left, x1 = a.right - pr.left, x2 = b.left - pr.left, x3 = b.right - pr.left;
  $('#bk0').setAttribute('d', `M${x0} 4 V18 H${x1} V4`); $('#bk1').setAttribute('d', `M${x2} 4 V18 H${x3} V4`);
  const b0 = $('#bl0'), b1 = $('#bl1'); b0.style.left = Math.max(36, (x0 + x1) / 2 - b0.offsetWidth / 2) + 'px'; b1.style.left = Math.min(748 - b1.offsetWidth, (x2 + x3) / 2 - b1.offsetWidth / 2 + 60) + 'px';
  const h1 = $('#hd1 .lcd'); $('#zq').style.left = (36 + 24 + 440 + 40) + 'px'; $('#zq').style.top = (316 + 80) + 'px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  TOOLS.forEach((_, i) => { M.vis($('#tl' + i), t, tTool[i] - 0.15, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }); M.vis($('#tc' + i), t, wt('H2', 'far') - 0.1 + i * 0.25, 1e9, POP); });

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hP'), t, T0('H4') + 0.6, 1e9, POP);
    M.vis($('#hr'), t, wt('H3', 'kitchen', 1) - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hd0'), t, wt('H3', 'shows') - 0.1, 1e9, { dy: 16 });
    M.vis($('#hd1'), t, wt('H4', 'balance') - 0.1, 1e9, { dy: 16 });
    const z = M.io((t - wt('H5', 'extra')) / 0.3), zs = $('#z0'); zs.style.color = mix('#B9F3C9', '#F3C77A', z); zs.style.textDecoration = z > 0.5 ? 'underline' : 'none';
    M.vis($('#zq'), t, wt('H5', 'decoration') - 0.1, 1e9, { ...POP, sc: 0.4 });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#bigR'), t, tP1 + 0.4, 1e9, { dy: 24 });
    M.draw($('#bk0'), t, wt('P2', 'reliable') - 0.1, 0.4); M.vis($('#bl0'), t, wt('P2', 'reliable'), 1e9, { dy: 10 });
    M.draw($('#bk1'), t, wt('P2', 'uncertain') - 0.1, 0.4); M.vis($('#bl1'), t, wt('P2', 'uncertain'), 1e9, { dy: 10 });
    M.vis($('#pr'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pform'), t, T0('P3'), 1e9, { dy: 16 });
    PUC.write($('#pl0'), t, wt('P3', 'reliable'), 0.5); PUC.write($('#pl1'), t, wt('P3', 'plus'), 0.6); PUC.write($('#pl2'), t, wt('P3', 'significant'), 0.6);
    M.vis($('#pP'), t, wt('P3', 'figures') + 0.4, 1e9, POP);
  }

  /* S + M: bench */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    // pencil slides in from the left and stops with its tip at 7.43 cm; slow-mo replays the same slide at 0.25x
    const slide = (tt) => X0 + TIP * PXc - 360 * (1 - M.o3((tt - tPen) / 1.0));
    const inSlow = t >= tSlow && t < slowEnd;
    const tt = inSlow ? tPen + Math.min(1.0, 0.25 * (t - tSlow - 0.3)) : t;
    const px = slide(tt); pen.setAttribute('transform', `translate(${px.toFixed(1)},0)`); M.hide(pen, t < tPen);
    penGh.forEach((g, k) => { const gx = slide(tt - (inSlow ? 0.06 : 0.08) * (k + 1)); g.setAttribute('transform', `translate(${gx.toFixed(1)},0)`); g.style.opacity = Math.abs(gx - px) > 4 && t >= tPen ? [0.3, 0.2, 0.12][k] : 0; });
    M.vis($('#smo'), t, tSlow, slowEnd, POP);
    const mm = M.io((t - tMmR) / 0.4); RM.style.opacity = mm.toFixed(3); M.hide(RM, mm <= 0);
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = i ? mm : 1 - mm; sp.style.background = mix('#FFFFFF', C.ink, on); sp.style.color = mix(C.mute, '#FFFFFF', on); sp.style.borderColor = mix(C.line, C.ink, on); });
    M.vis($('#dial'), t, tCmR - 0.1, 1e9, { dy: 10 });
    const settled = tt >= tPen + 0.95;
    M.draw(tipL, t, tPen + 1.0, 0.4); if (!settled) M.hide(tipL, true);
    // guess zone: between 7 and 8 cm (cm ruler) or 7.4 and 7.5 cm (mm ruler)
    const zA = mm < 0.5 ? 7 : 7.4, zB = mm < 0.5 ? 8 : 7.5, zon = settled && (t > wt('S2', 'halfway') - 0.2) ? 1 : 0;
    attr(gz, 'x', (X0 + zA * PXc).toFixed(1)); attr(gz, 'width', ((zB - zA) * PXc).toFixed(1)); M.hide(gz, !zon);
    attr(gzL, 'x', (X0 + (zA + zB) / 2 * PXc).toFixed(1)); gzL.style.opacity = inSlow ? M.io((t - wt('M2', 'gap') + 0.1) / 0.3).toFixed(3) : 0;
    // reading
    const fine = t >= wt('S4', 'seven', 1) - 0.1;
    const rd = $('#rd'); M.vis(rd, t, wt('S3', 'write') - 0.1, 1e9, POP);
    $('#rdN').innerHTML = fine ? dg('7.43', 'spsu') : dg('7.4', 'spu');
    rd.style.left = (748 - rd.offsetWidth).toFixed(0) + 'px';
    M.vis($('#roG'), t, wt('S3', 'write') - 0.1, 1e9, { dy: 10 });
    $('#roR').innerHTML = fine ? dg('7.43', 'spsu') : dg('7.4', 'spu');
    M.setT($('#roS'), fine ? '7.4' : '7'); M.setT($('#roU'), fine ? '3' : '4');
    // graph: dot moves with the ruler; line grows as points are planted
    const gi = M.io((t - tMmR) / 0.6), nsf = 2 + gi; attr(gDot, 'cx', GX(gi).toFixed(1)); attr(gDot, 'cy', GY(nsf).toFixed(1)); M.hide(gDot, t < wt('S3', 'Two') - 0.1);
    M.hide(gPt[0], t <= wt('S3', 'Two')); M.hide(gPt[1], t <= wt('S5', 'Three'));
    const ext = M.io((t - wt('S6', 'ten') + 0.1) / 0.8);
    attr(gLn, 'd', gi <= 0 ? '' : `M${GX(0)},${GY(2)} L${GX(gi + ext).toFixed(1)},${GY(2 + gi + ext).toFixed(1)}`);
    M.vis(gGhost, t, wt('S6', 'ten') + 0.6, 1e9, POP);
    M.vis(gTag, t, wt('S6', 'adds') - 0.1, 1e9, POP);
    avS(t, wt('S5', 'finer') + 0.1, tM1 - 0.3);
  }

  /* D: four rules */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RULES.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tRule[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRule[i], 0.6); M.vis(el.querySelector('.why'), t, tRule[i] + 0.9, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tRule[1] - 0.1, 204], [tRule[2] - 0.1, 324], [tRule[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tRule[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tRule[0] + 0.3, out, { dx: 60, dy: 0, ...o });
    let k = 0; for (let i = 0; i < 4; i++) if (t >= tRule[i] + 0.8) k = i; if (t >= tR4b) k = 4;
    const [v, p, n] = bigEx[k], bn = $('#bigN'); const key = v + p; if (bn._k !== key) { bn._k = key; bn.innerHTML = dg(v, p); }
    M.vis(bn, t, tRule[0] + 0.8, 1e9, { dy: 16 });
    const bc = $('#bigC'); M.setT(bc, `${n} SIGNIFICANT FIGURES`); bc.style.left = (392 - bc.offsetWidth / 2) + 'px'; M.vis(bc, t, tRule[0] + 1.2, 1e9, POP);
  }

  /* R: why front zeros never count */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    LKS.forEach((_, i) => { M.vis($('#lk' + i), t, tLk[i] - 0.05, 1e9, { dy: 14 }); if (i) M.vis($('#la' + (i - 1)), t, tLk[i] - 0.2, 1e9, { dy: -8 }); });
    M.vis($('#rP'), t, wt('R5', 'place') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, T0('R2') + 0.1, 1e9, { dx: 60, dy: 0 });
    URS.forEach((_, i) => { const el = $('#ur' + i); M.vis(el, t, tUr[i] - 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.uc'), t, tUr[i] + 0.5, 1e9, POP); });
    M.vis($('#rrP'), t, wt('R4', 'precision') - 0.1, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Significant') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.rise($('#stF'), t, wt('T1', 'Changing') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tC1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kv0'), t, wt('K1', 'decimal') - 0.1, 1e9, { dy: 10 }); M.vis($('#kv1'), t, wt('K1', 'Was') - 0.1, 1e9, { dy: 10 });
    const kz = $('#kz'), q = M.io((t - wt('K1', 'Was')) / 0.3); kz.style.color = mix('#B9F3C9', C.dim, Math.min(1, M.io((t - wt('K1', 'decimal')) / 0.3)));
    kz.style.opacity = (1 - 0.5 * q * (0.5 + 0.5 * Math.sin((t - wt('K1', 'Was')) * 6))).toFixed(3);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kv2'), t, wt('K2', 'decimal') - 0.1, 1e9, { dy: 10 }); M.vis($('#kv3'), t, wt('K2', 'measured') - 0.1, 1e9, { dy: 10 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('C2'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Two') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'front') });
  }

  /* C: calculation rules + think */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    M.vis($('#cl'), t, T0('C2') - 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#cl' + i), t, wt('C2', 'keep') + i * 0.35, 1e9, { dy: 14 }));
    M.vis($('#cr'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3].forEach(i => M.vis($('#cr' + i), t, wt('C3', 'keep') + i * 0.35, 1e9, { dy: 14 }));
    // weakest link lights in each column
    const wk = M.io((t - T0('C4')) / 0.3);
    $('#cl0').style.background = mix(C.soft, C.ac2, wk); $('#cr1').style.background = mix(C.soft, C.ac2, wk);
    M.vis($('#th2'), t, tC5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC5, tOpts: wt('C5', 'write') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'Two') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, [T0('W3'), T0('W4'), T0('W5'), T0('W6')]);
    M.vis($('#wr'), t, T0('W2'), out, { dx: 60, dy: 0, ...o });
    const [bx, by] = blkPos(t); attr(blk, 'x', (bx - 38).toFixed(1)); attr(blk, 'y', by.toFixed(1)); M.hide(blk, t < tOnPan);
    blkGh.forEach((g, k) => { const [gx, gy] = blkPos(t - 0.05 * (k + 1)); attr(g, 'x', (gx - 38).toFixed(1)); attr(g, 'y', gy.toFixed(1)); g.style.opacity = Math.hypot(gx - bx, gy - by) > 4 && t > tLift ? [0.3, 0.2, 0.12][k] : 0; });
    const onPan = t >= tOnPan + 0.5 && t < tLift;
    M.setT(bTx, onPan ? '39.6 g' : '0.0 g');
    const inW = by + 50 > CYB - V0 * MLPX, sub = M.clamp((by + 50 - (CYB - V0 * MLPX)) / 50), Vn = V0 + (V1 - V0) * (t > tDrop ? sub : 0);
    attr(wat, 'y', (CYB - Vn * MLPX).toFixed(1)); attr(wat, 'height', (Vn * MLPX).toFixed(1));
    M.vis($('#wm'), t, tOnPan + 0.6, 1e9, POP);
    M.vis($('#wv'), t, tDrop + 0.4, 1e9, POP); M.setT($('#wvN'), t > tDrop + 0.5 ? '25.0 - 20.0 = 5.0' : Vn.toFixed(1));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X3', 'One', 0) - 0.1, tStrike: wt('X3', 'wrong') - 0.1, tRight: wt('X3', 'so') - 0.1 });
    [wt('X2', 'one'), wt('X2', 'twenty'), wt('X2', 'zero')].forEach((tt, i) => M.vis($('#ar' + i), t, tt - 0.1, 1e9, { dx: 16, dy: 0 }));
    M.vis($('#ar3'), t, T0('X3') - 0.05, 1e9, { dy: 10 }); M.vis($('#ar4'), t, wt('X3', 'so') + 0.2, 1e9, POP);
    const sh = $('#addSh'), sOn2 = M.io((t - wt('X3', 'decimal') + 0.1) / 0.3); sh.style.opacity = sOn2.toFixed(3); sh.style.right = '-2px'; sh.style.width = '96px'; M.hide(sh, sOn2 <= 0);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Count') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [0, 1, 2, 3, 4, 5].map(i => tF + 0.4 + i * 0.35), tShot: wt('F1', 'Screenshot') });
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
