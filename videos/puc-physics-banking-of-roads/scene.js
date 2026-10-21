// PUC Physics Ep 69: Banking of roads (Motion notebook, car on a banked curve seen from behind + ideal speed against bank angle)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, FC = C.orange, TH = C.gold, MC = C.ink, FC2 = M.mix(C.orange, '#FFFFFF', 0.35);   // v blue, every force orange (components lighter, dashed), theta gold, mass ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vK = tx(VC, 'v'), thK = tx(TH, '\\theta'), mK = tx(MC, 'm'), NK = tx(FC, 'N'), fK = tx(FC, 'f'), muK = '\\mu';
const rad = d => d * Math.PI / 180, PI = Math.PI, G = 9.8, MASS = 1000;
const vIdeal = (r, thd) => Math.sqrt(r * G * Math.tan(rad(thd)));

/* ---------- the banked road, seen from behind (centre of the curve to the LEFT) ----------
   bank(svg, o) -> update(thDeg, s): s = { N, mg, f, comp, arc, Nv, fv } (0..1 grow factors; Nv, fv forces in newtons, fv > 0 = down the slope) */
const bank = (svg, o) => {
  const k = o.k, P0 = o.P0, L = o.L, cw = o.cw, ch = o.ch, rw = ch * 0.2, lab = o.lab !== false;
  const ground = mk(svg, 'path', { fill: '#E4E1D8' }), road = mk(svg, 'line', { stroke: C.ink, 'stroke-width': o.sw ?? 5, 'stroke-linecap': 'round' });
  const ref = mk(svg, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.5 });
  const arc = mk(svg, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3.5 }), arcL = sym(svg, 0, 0, 'θ', '', TH, o.thFs ?? 26);
  const cg = mk(svg, 'g', {}), cin = mk(cg, 'g', {});
  mk(cin, 'rect', { x: -cw * 0.3, y: -ch * 1.32, width: cw * 0.6, height: ch * 0.46, rx: ch * 0.12, fill: C.ink });
  mk(cin, 'rect', { x: -cw * 0.24, y: -ch * 1.24, width: cw * 0.48, height: ch * 0.3, rx: ch * 0.06, fill: '#9DBDF7' });
  mk(cin, 'rect', { x: -cw / 2, y: -ch * 0.95, width: cw, height: ch * 0.95 - rw * 0.6, rx: ch * 0.16, fill: C.ink });
  mk(cin, 'rect', { x: -cw * 0.42, y: -ch * 0.62, width: cw * 0.16, height: ch * 0.14, rx: 3, fill: '#F09A9A' }); mk(cin, 'rect', { x: cw * 0.26, y: -ch * 0.62, width: cw * 0.16, height: ch * 0.14, rx: 3, fill: '#F09A9A' });
  [-1, 1].forEach(sx => mk(cin, 'rect', { x: sx * cw * 0.34 - cw * 0.08, y: -rw * 1.6, width: cw * 0.16, height: rw * 1.6, rx: 4, fill: '#3A4560' }));
  const cmark = mk(svg, 'circle', { r: o.dot ?? 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
  const sw = o.asw ?? 6, hd = o.ahd ?? 18;
  const aNs = PUC.arrow(svg, FC2, sw - 1, hd - 2), aNc = PUC.arrow(svg, FC2, sw - 1, hd - 2);
  [aNs, aNc].forEach(a => a.g.firstChild.setAttribute('stroke-dasharray', '8 7'));
  const aMg = PUC.arrow(svg, FC, sw, hd), aN = PUC.arrow(svg, FC, sw, hd), aF = PUC.arrow(svg, FC, sw, hd);
  const fs = o.fs ?? 26, gs = o.gs ?? 16;
  const L_ = (b, sub, giver) => { const t = sym(svg, 0, 0, b, sub, FC, fs, { 'text-anchor': 'middle' }); const g = giver ? txt(svg, 0, 0, giver, { 'font-size': gs, fill: FC, 'font-weight': 600, 'text-anchor': 'middle' }) : null; return [t, g]; };
  const lN = L_('N', '', lab ? 'road' : ''), lMg = L_('mg', '', lab ? 'Earth' : ''), lF = L_('f', '', lab ? 'road' : '');
  const lNs = txt(svg, 0, 0, 'N sin θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': o.cfs ?? 20, fill: FC, 'text-anchor': 'end' });
  const lNc = txt(svg, 0, 0, 'N cos θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': o.cfs ?? 20, fill: FC });
  const put = (el, x, y, op) => { if (!el) return; attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); el.style.opacity = M.clamp(op).toFixed(3); };
  const putL = (l, x, y, op) => { put(l[0], x, y, op); put(l[1], x, y + gs + 4, op); };
  return (thd, s = {}) => {
    const th = rad(thd), d = [Math.cos(th), -Math.sin(th)], n = [-Math.sin(th), -Math.cos(th)];
    const A = [P0[0] - d[0] * L, P0[1] - d[1] * L], B = [P0[0] + d[0] * L, P0[1] + d[1] * L], base = o.base;
    attr(ground, 'd', `M${A[0].toFixed(1)},${A[1].toFixed(1)} L${B[0].toFixed(1)},${B[1].toFixed(1)} L${B[0].toFixed(1)},${base} L${A[0].toFixed(1)},${base} Z`);
    attr(road, 'x1', A[0].toFixed(1)); attr(road, 'y1', A[1].toFixed(1)); attr(road, 'x2', B[0].toFixed(1)); attr(road, 'y2', B[1].toFixed(1));
    const R = o.arcR ?? 90, vd0 = o.vd ?? (cw / 2 + 40), V = [P0[0] - d[0] * vd0, P0[1] - d[1] * vd0];   // angle vertex on the road, left of the car
    attr(ref, 'x1', V[0].toFixed(1)); attr(ref, 'y1', V[1].toFixed(1)); attr(ref, 'x2', (V[0] + R + 50).toFixed(1)); attr(ref, 'y2', V[1].toFixed(1));
    const arcOn = (s.arc ?? 1) * M.clamp(thd / 3);
    attr(arc, 'd', `M${(V[0] + R).toFixed(1)},${V[1].toFixed(1)} A${R},${R} 0 0 0 ${(V[0] + R * Math.cos(th)).toFixed(1)},${(V[1] - R * Math.sin(th)).toFixed(1)}`);
    arc.style.opacity = ref.style.opacity = arcOn.toFixed(3); ref.style.opacity = (0.5 * arcOn).toFixed(3);
    put(arcL, V[0] + (R + 24) * Math.cos(th / 2) - 6, V[1] - (R + 24) * Math.sin(th / 2) + 9, arcOn);
    attr(cg, 'transform', `translate(${P0[0].toFixed(1)},${P0[1].toFixed(1)}) rotate(${(-thd).toFixed(2)})`);
    const Cm = [P0[0] + n[0] * ch * 0.55, P0[1] + n[1] * ch * 0.55]; attr(cmark, 'cx', Cm[0].toFixed(1)); attr(cmark, 'cy', Cm[1].toFixed(1));
    const mg = MASS * G, Nv = s.Nv ?? mg / Math.cos(th), fv = s.fv ?? 0;
    // weight (Earth), normal force (road), friction (road, along the slope), components of N (lighter, dashed)
    const gm = s.mg ?? 0, gn = s.N ?? 0, gf = s.f ?? 0, gc = s.comp ?? 0;
    const lm = mg * k * gm; aMg.set(Cm[0], Cm[1] + 8, Cm[0], Cm[1] + 8 + lm); putL(lMg, Cm[0] + 34, Cm[1] + 8 + lm * 0.8, gm);
    const ln = Nv * k * gn; aN.set(Cm[0] + n[0] * 8, Cm[1] + n[1] * 8, Cm[0] + n[0] * (8 + ln), Cm[1] + n[1] * (8 + ln));
    putL(lN, Cm[0] + n[0] * (8 + ln + 22) + 4, Cm[1] + n[1] * (8 + ln + 22) - 6, gn);
    const ls = Nv * Math.sin(th) * k * gc, lc = Nv * Math.cos(th) * k * gc;
    aNs.set(Cm[0] - 8, Cm[1], Cm[0] - 8 - ls, Cm[1]); aNc.set(Cm[0], Cm[1] - 8, Cm[0], Cm[1] - 8 - lc);
    put(lNs, Cm[0] - 18 - ls, Cm[1] + 7, gc * M.clamp(ls / 30)); put(lNc, Cm[0] + 10, Cm[1] - 8 - lc + 16, gc * M.clamp(lc / 30));
    const lf = Math.abs(fv) * k * gf, sg = fv >= 0 ? -1 : 1, fo = [P0[0] + n[0] * 6, P0[1] + n[1] * 6];   // friction acts at the tyres, along the road
    if (lf > 2) aF.set(fo[0] + sg * d[0] * (cw * 0.5 + 6), fo[1] + sg * d[1] * (cw * 0.5 + 6), fo[0] + sg * d[0] * (cw * 0.5 + 6 + lf), fo[1] + sg * d[1] * (cw * 0.5 + 6 + lf)); else aF.set(0, 0, 0, 0);
    putL(lF, fo[0] + sg * d[0] * (cw * 0.5 + 6 + lf * 0.5) + n[0] * 24, fo[1] + sg * d[1] * (cw * 0.5 + 6 + lf * 0.5) + n[1] * 24 - 4, gf * M.clamp(lf / 10));
    return { Cm, n, d, A, B };
  };
};
const centreTag = (svg, x, y) => { const g = mk(svg, 'g', {}); const a = PUC.arrow(g, C.mute, 3, 11); a.set(x + 34, y - 6, x, y - 6); txt(g, x + 44, y, 'to the centre', { 'font-size': 18, fill: C.mute, 'font-weight': 600 }); return g; };

Object.assign(M.IC, {
  track: ['M3 17c3-6 15-6 18 0', 'M6 17c2-3 10-3 12 0'],
  ramp: ['M3 19h18', 'M3 19 21 9', 'M9 15v4', 'M15 12v7'],
  cycle: ['M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6h2l2 8', 'M5.5 14 9 7h6l-3.5 7'],
  tilt: ['M3 20 21 12', 'M3 20h18'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
  road: ['M4 20 8 4', 'M20 20 16 4', 'M12 6v2', 'M12 12v2', 'M12 18v2'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tK1 = T0('K1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three curves that lean ---------- */
const JOBS = [['track', 'Race track', 'CURVES TILT', 'race', 20], ['ramp', 'Flyover ramp', 'OUTER EDGE HIGHER', 'flyover', 12], ['cycle', 'Cycling track', 'STEEP WALLS', 'cycling', 40]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="240" height="120" id="jrS${i}"></svg></div>`).join('');
const jrB = JOBS.map((j, i) => bank($('#jrS' + i), { P0: [130, 92], L: 140, cw: 46, ch: 22, k: 0.004, base: 130, lab: false, sw: 3, arcR: 34, thFs: 16, dot: 3, asw: 3, ahd: 9, fs: 14 }));
const TILES = [['tilt', 'Why tilt it?', C.ac], ['help', 'How much tilt?', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Why'), wt('H4', 'how')];
const inB = bank($('#inS'), { P0: [118, 168], L: 150, cw: 64, ch: 30, k: 0.0045, base: 214, lab: false, sw: 4, arcR: 40, thFs: 18, dot: 4, asw: 4, ahd: 11, fs: 16 });
const tInTilt = wt('H3', 'tilts'), inTh = M.keys([[0, 0], [tInTilt, 18]], 1.4, M.io);

/* ---------- P: what banking is ---------- */
$('#dr0I').innerHTML = M.icon('road', 32, C.ink2, 2.2); $('#dr1I').innerHTML = M.icon('tilt', 32, FC, 2.4);
const pt = $('#ptS'), pB = bank(pt, { P0: [420, 420], L: 360, cw: 130, ch: 60, k: 0.016, base: 580, arcR: 80, vd: 140 });
const pTag = centreTag(pt, 40, 120);
const tPtilt = wt('P2', 'tilts'), pTh = M.keys([[0, 0], [tPtilt, 20]], 1.5, M.io);

/* ---------- S: the sim ---------- */
const s = $('#simS'), sB = bank(s, { P0: [340, 400], L: 330, cw: 130, ch: 60, k: 0.0165, base: 580, arcR: 80, vd: 140 });
const sTag = centreTag(s, 40, 150);
const sFv = txt(s, 0, 0, '', { 'font-size': 18, fill: FC, 'font-weight': 600 });
const tv = $('#tvS'), TVO = [105, 86], TVR = 46;
mk(tv, 'circle', { cx: TVO[0], cy: TVO[1], r: TVR, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 12 });
mk(tv, 'circle', { cx: TVO[0], cy: TVO[1], r: 3, fill: C.ink });
const tvGh = [0.3, 0.2, 0.12].map(op => mk(tv, 'circle', { r: 6, fill: MC, opacity: op }));
const tvC = mk(tv, 'circle', { r: 7, fill: MC });
$('#roG').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r0" style="color:${TH}">0.0</span><span class="u">° · bank angle</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r1" style="color:${VC}">0.00</span><span class="u">m/s · speed</span>
  <span class="k" style="color:${FC}">N</span><span class="v" id="r2" style="color:${FC}">9.80</span><span class="u">kN · road push</span>
  <span class="k" style="color:${FC}">F<sub>c</sub></span><span class="v" id="r3" style="color:${FC}">0.00</span><span class="u">kN · mv²/r</span>`;
$('#ro .lbl').innerHTML = 'LIVE READOUT · <span style="text-transform:none">m = 1000 kg · r = 50 m</span>';
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 45, ymin: 0, ymax: 25, xt: [0, 15, 30, 45], yt: [0, 10, 20], xl: 'θ (deg)' });
gr.xlab.setAttribute('y', 78 + 140 + 56);
txt($('#grS'), 96, 66, 'v (m/s)', { 'text-anchor': 'end' });
const gFull = gr.curve(M.mix(VC, '#FFFFFF', 0.6), 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '6 7');
const gCur = gr.curve(VC, 5), gDot = gr.dot(VC, 10);
const gOff = mk($('#grS'), 'line', { stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' });
const gOffT = txt($('#grS'), 0, 0, '', { 'font-size': 16, fill: FC, 'font-weight': 600 });
// bank angle 0 -> 20 on "tilt", -> 35 on "More", back to 20 on "Slow-mo"; speed = the ideal speed, then 18 m/s on "faster", 9 m/s on "slower"
const tTilt = wt('S3', 'tilt'), tMore = wt('S5', 'More'), tSlo = wt('S6', 'Slow'), tFast = wt('S8', 'faster') - 0.1, tSlower = wt('S9', 'slower') - 0.1;
const thS = M.keys([[0, 0], [tTilt, 20], [tMore, 35], [tSlo, 20]], 1.6, M.io);
const V20 = vIdeal(50, 20), vOff = M.keys([[0, 0], [tFast, 18 - V20], [tSlower, 9 - V20]], 1.2, M.io);
const vS = t => vIdeal(50, thS(t)) + vOff(t);
let thMaxT = null;   // graph draws the ideal curve up to the largest angle reached so far
const tA = tS1 + 0.3, tRes = tSlo + 0.5;
const tvAng = (() => { const DT = 1 / 60, I = [0]; for (let t2 = tA; t2 < tD1; t2 += DT) { const sl = t2 < tSlo ? 1 : t2 < tRes ? 0 : 0.25; I.push(I[I.length - 1] + vS(t2) / 50 * sl * DT * 3); } return t => { const x = (M.clamp(t, tA, tD1) - tA) / DT, i = Math.min(Math.floor(x), I.length - 1); return I[i]; }; })();   // top view at 3x real angular speed (shown faster)
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The road turns the car by itself!' });

/* ---------- D: the formula ---------- */
const STEPS = [[`${NK}\\cos${thK} = ${mK} g`, 'up and down: the car does not rise or sink'],
  [`${NK}\\sin${thK} = ${mK}${vK}^2/r`, 'sideways: this is the centripetal force'],
  [`\\tan${thK} = ${vK}^2/rg \\;\\Rightarrow\\; ${vK}_o = \\sqrt{rg\\tan${thK}}`, 'divide step 2 by step 1: the ideal speed'],
  [`${NK}\\cos${thK} = ${mK}g + ${fK}\\sin${thK},\\;\\; ${NK}\\sin${thK} + ${fK}\\cos${thK} = \\tfrac{${mK}${vK}^2}{r}`, 'friction down the slope, at its limit f = μN'],
  [`${vK}_{\\text{max}} = \\sqrt{rg\\,(${muK} + \\tan${thK})/(1 - ${muK}\\tan${thK})}`, 'solve the two together']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .sx').style.fontSize = '25px';
const tStep = [wt('D2', 'Up'), wt('D3', 'Sideways'), wt('D4', 'Divide'), wt('D5', 'friction'), wt('D6', 'Solve')];
const dB = bank($('#drS'), { P0: [430, 380], L: 360, cw: 130, ch: 60, k: 0.016, base: 580, arcR: 80, vd: 140 });
const dTag = centreTag($('#drS'), 40, 120);
$('#drC0').innerHTML = K(`\\tan\\theta = v^2/rg`); $('#drC1').innerHTML = K(`f \\le \\mu N \\;\\text{(down the slope)}`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\tan${thK} = \\dfrac{${vK}^2}{r g}`);

/* ---------- C: side by side ---------- */
const c0B = bank($('#c0S'), { P0: [356, 236], L: 340, cw: 120, ch: 56, k: 0.0085, base: 300, arcR: 70, fs: 22, gs: 14 });
const c1B = bank($('#c1S'), { P0: [370, 246], L: 340, cw: 120, ch: 56, k: 0.0085, base: 300, arcR: 70, fs: 22, gs: 14, cfs: 17 });
centreTag($('#c0S'), 24, 40); centreTag($('#c1S'), 24, 40);
$('#c0a').innerHTML = K(`${vK}_{\\text{max}} = \\sqrt{${muK}\\, r\\, g}`);
$('#c1a').innerHTML = K(`${vK}_{\\text{max}} = \\sqrt{rg\\,\\dfrac{${muK} + \\tan${thK}}{1 - ${muK}\\tan${thK}}}`);
$('#c1b').innerHTML = K(`${thK} = 0 \\;\\Rightarrow\\; \\sqrt{${muK}\\, r\\, g}\\;\\;\\text{(the flat road)}`);
const th1 = PUC.think($('#th1'), { q: 'A curve is banked for 13 m/s. On ice, with no grip, a car goes round at exactly 13 m/s. Does it make the turn?', opts: ['Yes', 'No, it skids'], right: 0,
  why: 'At the ideal speed, N sin θ alone gives the centripetal force.' });
const th2 = PUC.think($('#th2'), { q: 'A car goes slower than the ideal speed. Which way does friction act on it?', opts: ['Up the slope', 'Down the slope'], right: 0,
  why: 'A slow car tends to slide down the tilt, so friction holds it up.' });

/* ---------- R: why tilt the flyover ---------- */
const rB = bank($('#rlS'), { P0: [430, 370], L: 360, cw: 130, ch: 60, k: 0.016, base: 580, arcR: 80, vd: 140 });
centreTag($('#rlS'), 40, 120);
const rTc = document.createElement('div'); rTc.className = 'stag'; rTc.style.cssText = 'left:36px;top:150px'; $('#rl').appendChild(rTc);
const tRtilt = T0('R3') + 0.3, TH_W = Math.atan(100 / (40 * G)) * 180 / PI, rTh = M.keys([[0, 0], [tRtilt, TH_W]], (T1('R4') - tRtilt), t => M.clamp(t));
const FCW = MASS * 100 / 40;   // 2500 N needed at 10 m/s on a 40 m curve
const LK = [['Turning needs <i>m</i><i class="vv">v</i>²/<i>r</i> inward'], ['Tilted road: <span class="ff">N</span> leans inward'], ['Its sideways part does the turning'], ['Less friction: less wear, safer when wet']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the tilt saves the tyres!' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\tan${thK} = \\dfrac{${vK}^2}{rg} = \\dfrac{100}{40 \\times 9.8} \\approx 0.255`)],
  [K(`${thK} \\approx ${tx(TH, '14.3^\\circ')}`)],
  [K(`${vK}_{\\text{max}} = \\sqrt{rg\\,\\dfrac{${muK} + \\tan${thK}}{1 - ${muK}\\tan${thK}}}`)],
  [K(`= \\sqrt{392 \\times 0.601} \\approx ${tx(VC, '15.4\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 100 });
$('#wl .lbl').style.top = '30px';
const wB = bank($('#wrS'), { P0: [430, 360], L: 360, cw: 130, ch: 60, k: 0.016, base: 470, arcR: 80, vd: 140 });
centreTag($('#wrS'), 40, 120);
const tW = [wt('W3', 'Tan'), wt('W4', 'So'), wt('W5', 'Top'), wt('W6', 'That')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'N = mg cos θ, as for a block resting on a slope', right: 'At the ideal speed: N = mg / cos θ, bigger than mg' });
const tg = $('#tg'), TO = [330, 222], TS = 150, TT = rad(30), TN = TS / Math.cos(TT);   // force triangle: N + mg = the net inward force
const tq = [TO[0] - TN * Math.sin(TT), TO[1] - TN * Math.cos(TT)];
const tgN = PUC.arrow(tg, FC, 6, 17), tgM = PUC.arrow(tg, FC, 6, 17), tgF = PUC.arrow(tg, FC2, 5, 15);
tgF.g.firstChild.setAttribute('stroke-dasharray', '8 7');
const tgNl = sym(tg, (TO[0] + tq[0]) / 2 + 16, (TO[1] + tq[1]) / 2 - 4, 'N', '', FC, 26), tgMl = sym(tg, tq[0] - 52, (tq[1] + TO[1]) / 2 + 8, 'mg', '', FC, 24), tgFl = txt(tg, (TO[0] + tq[0]) / 2, TO[1] + 34, 'mv²/r', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 20, fill: FC, 'text-anchor': 'middle' });
const tgL = txt(tg, 24, 34, 'N is the longest side', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: bank angle, ideal speed and top speed on a banked curve' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A curve of radius 90 m is banked for an ideal speed of 15 m/s (<i>g</i> = 10 m/s²). A car takes it at exactly 15 m/s. Find <i>N</i> / <i>mg</i>.', qW: 780,
  opts: [K('\\sqrt{17}/4'), K('4/\\sqrt{17}'), K('5/4'), K('1')], right: 0, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\tan${thK} = 225/900 = 1/4`)], [K(`${NK} = ${mK}g/\\cos${thK}`)],
  [K(`1/\\cos${thK} = \\sqrt{1 + \\tan^2${thK}}`)], [K(`= \\sqrt{17/16} = \\sqrt{17}/4`)], [K(`\\approx 1.03 \\;\\Rightarrow\\; \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Tan'), wt('A3', 'With'), wt('A4', 'root'), wt('A4', 'sixteen'), wt('A4', 'about')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · banking of roads', y0: 92, dy: 92, txt: [0, 0, 1, 1],
  lines: [K(`\\tan${thK} = ${vK}^2/rg \\qquad ${vK}_o = \\sqrt{rg\\tan${thK}}`),
    K(`${vK}_{\\text{max}} = \\sqrt{rg\\,(${muK} + \\tan${thK})/(1 - ${muK}\\tan${thK})}`),
    '<b>Ideal speed</b>: <i>N</i> sin <i>θ</i> alone turns the car, and <i>N</i> = <i>mg</i> / cos <i>θ</i>',
    '<b>Faster</b>: friction down the slope &nbsp;·&nbsp; <b>Slower</b>: friction up the slope'] });
const YQ = ['Which force turns a car on a banked road with no friction?', "Why is N on a banked curve bigger than the car's weight?", 'A car goes faster than the ideal speed. Which way does friction act?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 70', topic: 'Heavier, then lighter in a lift? Apparent Weight and Weightlessness', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const kN = v => (v / 1000).toFixed(2);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((j, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const u = M.io((t - tMorph - 0.5 - i * 0.15) / 0.9); jrB[i](j[4] * u, { arc: 1 }); });
    M.vis($('#hjP'), t, wt('H2', 'unsafe') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#ins'), t, wt('H3', 'curve') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    inB(inTh(t), { N: M.o3((t - wt('H4', 'tilt') + 0.1) / 0.5), Nv: MASS * G / Math.cos(rad(inTh(t))) });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, T0('P2') + 0.05, { st: 0.04 });
    M.vis($('#dr0'), t, T0('P3') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, T0('P4') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, T0('P5') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const th = pTh(t);
    pB(th, { mg: M.o3((t - wt('P4', 'normal') + 0.1) / 0.5), N: M.o3((t - wt('P4', 'normal') + 0.1) / 0.5), comp: M.o3((t - wt('P4', 'part') + 0.1) / 0.5) });
    M.vis(pTag, t, wt('P4', 'centre') - 0.2, 1e9, { dy: 0, dx: 20 });
  }

  /* S: the sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const thd = Math.round(thS(t) * 10) / 10, vd = Math.round(vS(t) * 100) / 100, th = rad(thd);   // displayed values; forces from the displayed values
    const Fc = MASS * vd * vd / 50, Nv = MASS * G * Math.cos(th) + Fc * Math.sin(th), fv = Fc * Math.cos(th) - MASS * G * Math.sin(th);
    const gN = M.o3((t - wt('S2', 'normal') + 0.1) / 0.5), gF = M.o3((t - wt('S7', 'friction') + 0.1) / 0.4);
    const r = sB(thd, { mg: M.o3((t - tS1 - 0.6) / 0.5), N: gN, comp: M.o3((t - wt('S4', 'sideways') + 0.1) / 0.5), f: gF, Nv, fv });
    M.vis(sTag, t, wt('S4', 'centre') - 0.2, 1e9, { dy: 0, dx: 20 });
    const fabs = Math.abs(fv) < 5 ? 0 : fv; M.setT(sFv, fabs === 0 ? 'f = 0' : `f = ${(Math.abs(fv) / 1000).toFixed(2)} kN ${fv > 0 ? 'down' : 'up'} the slope`);
    attr(sFv, 'x', 36); attr(sFv, 'y', 560); sFv.style.opacity = gF.toFixed(3);
    M.setT($('#r0'), thd.toFixed(1)); M.setT($('#r1'), vd.toFixed(2)); M.setT($('#r2'), kN(Nv)); M.setT($('#r3'), kN(Fc));
    const hi = M.io((t - wt('S4', 'sideways')) / 0.3) * (1 - M.io((t - T0('S5')) / 0.3)); $('#r3').style.background = mix('#FFFFFF', '#FBEBDD', hi);
    // graph: ideal speed against angle; the dot follows the car (off the curve when the speed is not ideal)
    const thMax = Math.max(thd, t > tMore ? 35 : t > tTilt ? Math.min(thd, 35) : thd);
    gCur(x => [x, vIdeal(50, x)], 0, Math.max(0, t < tMore + 2 ? thMax : 35));
    gFull(x => [x, vIdeal(50, x)], 0, 45 * M.clamp((t - wt('S5', 'climbs') + 0.2) / 0.8));
    gDot(thd, vd, t > tS1 + 0.4);
    const off = vd - vIdeal(50, thd), offOn = Math.abs(off) > 0.3;
    attr(gOff, 'x1', gr.X(thd).toFixed(1)); attr(gOff, 'x2', gr.X(thd).toFixed(1)); attr(gOff, 'y1', gr.Y(vIdeal(50, thd)).toFixed(1)); attr(gOff, 'y2', gr.Y(vd).toFixed(1)); gOff.style.opacity = offOn ? '1' : '0';
    M.setT(gOffT, off > 0 ? 'f down' : 'f up'); attr(gOffT, 'x', (gr.X(thd) + 14).toFixed(1)); attr(gOffT, 'y', (gr.Y((vd + vIdeal(50, thd)) / 2) + 6).toFixed(1)); gOffT.style.opacity = offOn ? '1' : '0';
    M.vis($('#grP'), t, wt('S5', 'climbs') - 0.1, 1e9, POP);
    // top view: the car going round (shown 3x faster; 0.25x during the replay)
    M.vis($('#tv'), t, tS1 + 0.8, out, POP);
    const a = tvAng(t), cp = [TVO[0] + TVR * Math.cos(a + 1.2), TVO[1] - TVR * Math.sin(a + 1.2)]; attr(tvC, 'cx', cp[0].toFixed(1)); attr(tvC, 'cy', cp[1].toFixed(1));
    tvGh.forEach((g, k) => { const a2 = tvAng(t - 0.25 * (k + 1)); attr(g, 'cx', (TVO[0] + TVR * Math.cos(a2 + 1.2)).toFixed(1)); attr(g, 'cy', (TVO[1] - TVR * Math.sin(a2 + 1.2)).toFixed(1)); M.hide(g, Math.abs(a - a2) < 0.05); });
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    avS(t, wt('S5', 'graph') + 0.4, tSlo - 0.2);
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const g1 = M.o3((t - tStep[0] + 0.1) / 0.5), g2 = M.o3((t - tStep[1] + 0.1) / 0.5), g4 = M.o3((t - tStep[3] + 0.1) / 0.5);
    dB(20, { mg: g1, N: g1, comp: g1, f: g4, fv: 2700, Nv: MASS * G / Math.cos(rad(20)) });
    M.vis(dTag, t, tStep[1], 1e9, { dy: 0, dx: 20 });
    M.vis($('#drC0'), t, tStep[2] + 0.4, tStep[3] - 0.2, { ...POP, outDur: 0.2 }); M.vis($('#drC1'), t, tStep[3] + 0.4, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'normal'), 0.8);
    M.rise($('#st2'), t, wt('T1', 'banked') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* C: side by side + two thinks */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const g0 = M.o3((t - T0('C2') + 0.1) / 0.5), gf0 = M.o3((t - wt('C2', 'friction') + 0.1) / 0.5);
    c0B(0, { mg: g0, N: g0, f: gf0, fv: 3500, Nv: MASS * G });
    PUC.write($('#c0a'), t, wt('C2', 'Top') - 0.1, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o });
    const g1 = M.o3((t - T0('C3') + 0.1) / 0.5);
    c1B(20, { mg: g1, N: g1, comp: M.o3((t - wt('C3', 'helps') + 0.1) / 0.5), Nv: MASS * G / Math.cos(rad(20)) });
    PUC.write($('#c1a'), t, wt('C3', 'Put') - 0.1, 0.8); PUC.write($('#c1b'), t, wt('C3', 'flat') - 0.2, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'turn') - 0.4, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'ideal') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Which'), tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'slow') });
  }

  /* R: why tilt the flyover */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exR'), t, tR1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tW1)) / 0.3))); });
    const thd = Math.round(rTh(t) * 100) / 100, th = rad(thd), Nv = MASS * G * Math.cos(th) + FCW * Math.sin(th), fv = Math.max(0, FCW * Math.cos(th) - MASS * G * Math.sin(th));
    const g0 = M.o3((t - tR1 - 0.4) / 0.5);
    rB(thd, { mg: g0, N: g0, f: g0, comp: M.o3((t - T0('R4') + 0.1) / 0.5), Nv, fv });
    M.setT(rTc, `θ = ${thd.toFixed(2)}°`); M.vis(rTc, t, tR1 + 0.5, 1e9, POP);
    M.vis($('#bN'), t, T0('R2') + 0.1, 1e9, { dy: 10 });
    $('#bNf').style.width = (360 * fv / FCW).toFixed(1) + 'px'; M.setT($('#bNv'), `${Math.round(fv)} N`);
    avR(t, wt('R5', 'wear') - 0.1, out);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const thd = TH_W * M.io((t - tW[0] - 0.2) / 1.2), g = M.o3((t - T0('W2') - 0.6) / 0.5);
    wB(thd, { mg: g, N: g, comp: g, Nv: MASS * G / Math.cos(rad(thd)) });
    M.vis($('#wc0'), t, tW[1] + 0.3, 1e9, POP); M.vis($('#wc1'), t, tW[3] + 1.2, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'So') });
    const gN = M.o3((t - wt('X3', 'N') + 0.1) / 0.5), gM = M.o3((t - wt('X3', 'g') + 0.1) / 0.5), gF = M.o3((t - wt('X3', 'bigger') + 0.1) / 0.5);
    if (gN > 0.01) tgN.set(TO[0], TO[1], TO[0] + (tq[0] - TO[0]) * gN, TO[1] + (tq[1] - TO[1]) * gN); else tgN.set(0, 0, 0, 0);
    if (gM > 0.01) tgM.set(tq[0], tq[1], tq[0], tq[1] + TS * gM); else tgM.set(0, 0, 0, 0);
    if (gF > 0.01) tgF.set(TO[0], TO[1] + 2, TO[0] + (tq[0] - TO[0]) * gF, TO[1] + 2); else tgF.set(0, 0, 0, 0);
    tgNl.style.opacity = gN.toFixed(3); tgMl.style.opacity = gM.toFixed(3); tgFl.style.opacity = gF.toFixed(3); tgL.style.opacity = gF.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'curve'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
