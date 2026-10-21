// PUC Physics Ep 31: Relative motion in one dimension (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, BC = C.violet, RC = C.ink, GC = C.red;   // colour-coding: bus A / v_A blue, bus B / v_B violet, relative v_BA ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (s, c) => `\\textcolor{${c}}{${s}}`;
const vA = cv('v_A', AC), vB = cv('v_B', BC), vBA = cv('v_{BA}', RC), vAB = cv('v_{AB}', RC), xA = cv('x_A', AC), xB = cv('x_B', BC), xBA = cv('x_{BA}', RC);

Object.assign(M.IC, {
  train: ['M4 15V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z', 'M4 10h16', 'M8 21l2-4', 'M16 21l-2-4'],
  bus: ['M5 17V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11', 'M5 12h14', 'M5 17h14', 'M8 20v-3', 'M16 20v-3'],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
});

/* a side-view bus/train drawn in one colour; returns { g, at(x, y) } */
const vehicle = (p, col, w = 120, h = 50, op = 1) => {
  const outer = mk(p, 'g', {}), g = mk(outer, 'g', { opacity: op });
  mk(g, 'rect', { x: 0, y: -h, width: w, height: h, rx: 10, fill: col });
  for (let k = 0; k < Math.floor((w - 24) / 26); k++) mk(g, 'rect', { x: 14 + k * 26, y: -h + 9, width: 18, height: 15, rx: 3, fill: '#FFFFFF', opacity: 0.85 });
  [w * 0.22, w * 0.78].forEach(cx => { mk(g, 'circle', { cx, cy: 0, r: 9, fill: C.ink }); mk(g, 'circle', { cx, cy: 0, r: 3.5, fill: '#FFFFFF' }); });
  return { g, outer, w, at(x, y) { attr(outer, 'transform', `translate(${x.toFixed(1)},${y})`); } };
};
const road = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y + 12, x2: x1, y2: y + 12, stroke: C.ink, 'stroke-width': 3 }); };
const dashes = (p, x0, x1, y) => { const g = mk(p, 'g', {}); for (let x = x0 - 80; x < x1 + 80; x += 60) mk(g, 'line', { x1: x, y1: y, x2: x + 28, y2: y, stroke: C.dim, 'stroke-width': 4, 'stroke-linecap': 'round' }); const cl = mk(p, 'clipPath', { id: 'cl' + Math.round(y) + x0 }); mk(cl, 'rect', { x: x0, y: y - 10, width: x1 - x0, height: 20 }); g.setAttribute('clip-path', `url(#${cl.id})`); const inner = mk(g, 'g', {}); [...g.querySelectorAll('line')].forEach(l => inner.appendChild(l)); return { set(off) { attr(inner, 'transform', `translate(${(((off % 60) + 60) % 60).toFixed(1)},0)`); } }; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4');
const tS1 = T0('S1'), tS4 = T0('S4'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1');
const tK1 = T0('K1'), tK4 = T0('K4'), tB1 = T0('B1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('Z1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three views ---------- */
const JOBS = [['train', 'Train window', 'NEXT TRAIN LOOKS STILL', 'train'], ['bus', 'College road', 'A FRIEND CYCLING ALONGSIDE', 'Stand'], ['eye', 'Platform', 'SAME TRAIN RUSHES PAST', 'platform']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'train'), wt('H1', 'beside'), wt('H1', 'platform')];

/* ---------- H: one train, two views ---------- */
const hs = $('#hAS');
mk(hs, 'rect', { x: 36, y: 330, width: 712, height: 40, fill: C.soft });
txt(hs, 48, 356, 'PLATFORM', { 'font-size': 16, 'letter-spacing': 2 });
const posts = mk(hs, 'g', {}); for (let x = 0; x < 1600; x += 140) mk(posts, 'rect', { x, y: 110, width: 12, height: 220, fill: C.dim });
const pcl = mk(hs, 'clipPath', { id: 'pcl' }); mk(pcl, 'rect', { x: 36, y: 100, width: 712, height: 240 }); posts.setAttribute('clip-path', 'url(#pcl)');
const postsIn = mk(posts, 'g', {}); [...posts.querySelectorAll('rect')].forEach(r => postsIn.appendChild(r));
const trY = vehicle(hs, AC, 300, 70), trN = vehicle(hs, BC, 300, 70);
const trL1 = txt(hs, 0, 0, 'YOUR TRAIN', { 'font-size': 16, fill: AC, 'font-weight': 600 }), trL2 = txt(hs, 0, 0, 'NEXT TRAIN', { 'font-size': 16, fill: BC, 'font-weight': 600 });
$('#hkQI').innerHTML = M.icon('help', 28, '#fff', 2.2);

/* ---------- P: definition ---------- */
const pl = $('#pLS');
road(pl, 36, 748, 220);
const pA = vehicle(pl, AC, 150, 60), pB = vehicle(pl, BC, 150, 60); pA.at(80, 220); pB.at(470, 220);
txt(pl, 155, 254, 'A', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: AC, 'text-anchor': 'middle' }); txt(pl, 545, 254, 'B', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: BC, 'text-anchor': 'middle' });
const pEyeO = mk(pl, 'g', { transform: 'translate(132,104)' }), pEye = mk(pEyeO, 'g', {}); pEye.innerHTML = M.icon('eye', 46, C.ink, 2.4).replace(/^<svg/, '<svg x="0" y="0"');
const pSight = mk(pl, 'path', { d: 'M184,128 C320,90 430,110 520,150', stroke: C.ink, 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': '7 7' });
const pFx = document.createElement('div'); pFx.className = 'tbig'; pFx.style.top = '360px'; pFx.innerHTML = K(`${vBA}`); $('#pL').appendChild(pFx);
$('#pW').style.top = '470px';
$('#pF').innerHTML = K(`${vBA} = ${vB} - ${vA}`);

/* ---------- S: two buses (EXAMPLE FIGURES: v_A = 6 m/s, v_B = 4 m/s, B starts 20 m ahead) ---------- */
const s = $('#simS'), RYa = 400, RYb = 270, SX0 = 40, PXm = 10, px = m => SX0 + m * PXm;
road(s, 36, 748, RYb); road(s, 36, 748, RYa);
const dB = dashes(s, 36, 748, RYb + 30), dA = dashes(s, 36, 748, RYa + 30);
const ghA = [0.3, 0.2, 0.12].map(() => vehicle(s, AC, 110, 46, 0)), ghB = [0.3, 0.2, 0.12].map(() => vehicle(s, BC, 110, 46, 0));
const busA = vehicle(s, AC, 110, 46), busB = vehicle(s, BC, 110, 46);
const lA = txt(s, 0, 0, 'A', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#FFFFFF', 'text-anchor': 'middle' }), lB = txt(s, 0, 0, 'B', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#FFFFFF', 'text-anchor': 'middle' });
const arA = PUC.arrow(s, AC, 6, 16), arB = PUC.arrow(s, BC, 6, 16);
const arAL = txt(s, 0, 0, '', { 'font-size': 20, fill: AC, 'font-weight': 600 }), arBL = txt(s, 0, 0, '', { 'font-size': 20, fill: BC, 'font-weight': 600 });
const restA = txt(s, 0, 0, 'AT REST (from A)', { 'font-size': 16, fill: AC, 'font-weight': 600, 'letter-spacing': 1 });
const gapP = mk(s, 'path', { d: '', stroke: RC, 'stroke-width': 2.5, fill: 'none' }), gapL = txt(s, 0, 0, '', { 'font-size': 20, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
$('#roL').innerHTML = `<span class="k" style="color:${AC}">v<sub>A</sub></span><span class="v" id="rVA" style="color:${AC}">6</span><span class="u">m/s</span>
  <span class="k" style="color:${BC}">v<sub>B</sub></span><span class="v" id="rVB" style="color:${BC}">4</span><span class="u">m/s</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">view</span><span class="v" id="rView" style="font-size:26px">ground</span><span class="u"></span>`;
$('#roR').innerHTML = `<span class="k" style="color:${RC}">v<sub>BA</sub></span><span class="v" id="rVBA">-2</span><span class="u">m/s</span>
  <span class="k" style="color:${RC}">x<sub>BA</sub></span><span class="v" id="rX">20.0</span><span class="u">m</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">t</span><span class="v" id="rT">0.0</span><span class="u">s</span>`;
// live graph: ground view = x_A and x_B against t; A view = x_BA against t
const gs = $('#grS'), G1 = PUC.graph(gs, { x: 120, y: 70, w: 580, h: 140, xmax: 8, ymax: 60, xt: [0, 2, 4, 6, 8], yt: [0, 20, 40, 60] });
txt(gs, 712, 216, 't (s)');
const yLab = txt(gs, 134, 78, 'x (m)', { fill: C.ink, 'font-weight': 600 });
const cA = G1.curve(AC, 5), cB = G1.curve(BC, 5), cR = G1.curve(RC, 5), dGA = G1.dot(AC, 9), dGB = G1.dot(BC, 9), dGR = G1.dot(RC, 9);
// sim clocks
const tG0 = T0('S2') + 0.5, tG1 = T0('S4') - 0.1;                    // ground view: tau 0..8
const tV0 = wt('S4', 'Switch') + 0.3, tV1 = T0('S7') - 0.2;            // A view, same direction: tau 0..8
const tO0 = wt('S7', 'comes') - 0.2, tSlow = wt('S8', 'replay') + 0.1, tSlowE = T0('S9'), tO1 = T1('S9') - 0.5;
const tauG = t => 8 * M.clamp((t - tG0) / (tG1 - tG0)), tauV = t => 8 * M.clamp((t - tV0) / (tV1 - tV0));
const tauO = t => Math.min(2.6, tauO0(t));
const tauO0 = t => { const a = Math.min(t, tSlow) - tO0, fast = Math.max(0, a) * 0.9; if (t <= tSlow) return Math.min(3.6, fast); const sl = fast + 0.25 * 0.9 * (Math.min(t, tSlowE) - tSlow); if (t <= tSlowE) return Math.min(3.6, sl); return Math.min(3.6, sl + 0.9 * (t - tSlowE)); };
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same buses. Totally different view!' });

/* ---------- D: derivation ---------- */
const STEPS = [[`${xBA} = ${xB} - ${xA}`, 'the gap between them'],
  [`\\dfrac{\\Delta ${xBA}}{\\Delta t} = \\dfrac{\\Delta ${xB}}{\\Delta t} - \\dfrac{\\Delta ${xA}}{\\Delta t}`, 'divide each change by the same time'],
  [`${vBA} = ${vB} - ${vA}`, 'rate of change of position = velocity'],
  [`${vAB} = -\\,${vBA}`, 'swap the watcher: only the sign flips']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:108px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst1 .sx').style.fontSize = '30px'; $('#dst1 .sx').style.top = '-18px'; $('#dst1 .why').style.top = '66px';
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dr = $('#drS'), NY = 250, NX = m => 80 + m * 12;
mk(dr, 'line', { x1: 60, y1: NY, x2: 740, y2: NY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 55; m += 5) { mk(dr, 'line', { x1: NX(m), y1: NY, x2: NX(m), y2: NY + (m % 10 ? 10 : 18), stroke: C.ink, 'stroke-width': 2 }); if (m % 10 === 0) txt(dr, NX(m), NY + 42, m, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
txt(dr, 740, NY - 16, 'x (m)', { 'text-anchor': 'end' });
const nA = mk(dr, 'circle', { r: 14, fill: AC }), nB = mk(dr, 'circle', { r: 14, fill: BC });
const nAL = txt(dr, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600 }), nBL = txt(dr, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const nGap = mk(dr, 'path', { d: '', stroke: RC, 'stroke-width': 3, fill: 'none' }), nGapL = txt(dr, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 24, fill: RC, 'font-weight': 600 });
const dRate = document.createElement('div'); dRate.className = 'pillp'; dRate.style.cssText = 'left:36px;top:400px;font-family:IBM Plex Mono'; $('#dr').appendChild(dRate);
const dFlip = document.createElement('div'); dFlip.className = 'pillp ink'; dFlip.style.cssText = 'left:36px;top:480px'; dFlip.innerHTML = 'From B, A drifts forward: <span class="mono">&nbsp;v<sub>AB</sub> = +2 m/s</span>'; $('#dr').appendChild(dFlip);
const ghD = document.createElement('div'); ghD.className = 'ghost'; ghD.textContent = 'EXAMPLE FIGURES'; ghD.style.cssText = 'right:36px;top:18px'; $('#dr').appendChild(ghD);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vBA} = ${vB} - ${vA}`);

/* ---------- R: parallel lines ---------- */
const LK = ['Each bus gets its own line', 'Vertical gap between the lines = x<sub>BA</sub>', 'Parallel lines = same slope = same velocity', 'Same velocity: the gap never changes, v<sub>BA</sub> = 0'];
$('#lks').innerHTML = LK.map((l, i) => `<div class="lk" id="lk${i}" style="top:${96 + i * 92}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('');
const tLk = [T0('R2'), wt('R2', 'vertical'), T0('R3'), T0('R4')];
const rs = $('#rrS'), RG = PUC.graph(rs, { x: 110, y: 100, w: 600, h: 330, xmax: 10, ymax: 80, xt: [0, 5, 10], yt: [0, 40, 80] });
txt(rs, 124, 108, 'x (m)', { fill: C.ink, 'font-weight': 600 }); txt(rs, 722, 436, 't (s)');
const rA = RG.curve(AC, 5), rB = RG.curve(BC, 5), rdA = RG.dot(AC, 10), rdB = RG.dot(BC, 10);
const rGap = mk(rs, 'path', { d: '', stroke: RC, 'stroke-width': 3, fill: 'none' }), rGapL = txt(rs, 0, 0, 'gap 20 m', { 'font-size': 22, fill: RC, 'font-weight': 600 });
const rZero = document.createElement('div'); rZero.className = 'pillp ink'; rZero.style.cssText = 'right:36px;top:18px;height:40px;font-size:20px'; rZero.innerHTML = '<span class="mono">v<sub>BA</sub> = 6 - 6 = 0</span>'; $('#rr').appendChild(rZero);
const ghR = document.createElement('div'); ghR.className = 'ghost'; ghR.textContent = 'EXAMPLE FIGURES'; ghR.style.cssText = 'left:36px;top:516px'; $('#rr').appendChild(ghR);
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Frozen means same velocity, not zero velocity.' });

/* ---------- K: same way vs opposite ways ---------- */
const sideSvg = (el, opp) => {
  const sv = $(el); road(sv, 36, 748, 160); road(sv, 36, 748, 290);
  const c1 = vehicle(sv, AC, 120, 46), c2 = vehicle(sv, BC, 120, 46);
  const a1 = PUC.arrow(sv, AC, 6, 16), a2 = PUC.arrow(sv, BC, 6, 16);
  const l1 = txt(sv, 0, 0, '20 m/s', { 'font-size': 22, fill: AC, 'font-weight': 600 }), l2 = txt(sv, 0, 0, opp ? '15 m/s' : '15 m/s', { 'font-size': 22, fill: BC, 'font-weight': 600 });
  return (t, tin, tl) => {
    const u = M.io((t - tin) / 0.6), mv = Math.max(0, t - tin - 0.6);
    const x1 = 70 + mv * 22, x2 = opp ? 600 - mv * 16 : 70 + mv * 16;
    c1.at(Math.min(x1, 610), 160); c2.at(Math.max(36, Math.min(x2, 610)), 290); c1.g.style.opacity = u; c2.g.style.opacity = u;
    const L = M.io((t - tl) / 0.4);
    const X1 = Math.min(x1, 610) + 120, X2 = opp ? Math.max(36, Math.min(x2, 610)) : Math.min(x2, 610) + 120;
    a1.set(X1 + 6, 132, X1 + 6 + 100 * L, 132); a2.set(opp ? X2 - 6 : X2 + 6, 262, opp ? X2 - 6 - 75 * L : X2 + 6 + 75 * L, 262);
    attr(l1, 'x', Math.min(X1 + 10, 640)); attr(l1, 'y', 112); attr(l2, 'x', opp ? Math.max(40, X2 - 100) : Math.min(X2 + 10, 640)); attr(l2, 'y', 242); l1.style.opacity = L; l2.style.opacity = L;
  };
};
const kS = sideSvg('#kxS', false), kO = sideSvg('#kvS', true);
$('#kxF').innerHTML = K(`${vBA} = ${cv('20', AC)} - ${cv('15', BC)} = 5\\,\\text{m/s}`);
$('#kvF').innerHTML = K(`${vBA} = ${cv('20', AC)} - (${cv('-15', BC)}) = 35\\,\\text{m/s}`);
const th1 = PUC.think($('#th1'), { q: 'Two cyclists ride toward each other at 5 m/s each. How fast does the gap close?', opts: ['0 m/s', '10 m/s'], right: 1, why: 'Opposite directions: 5 - (-5) = 10 m/s. Speeds add.' });
const th2 = PUC.think($('#th2'), { q: 'Two lines on a position-time graph cross. What happens at that moment?', opts: ['They meet', 'They stop'], right: 0, why: 'Same position at the same time: the gap is zero, one passes the other.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`72\\,\\text{km/h} = 20\\,\\text{m/s},\\;\\; 54\\,\\text{km/h} = 15\\,\\text{m/s}`)],
  [K(`v_{\\text{car, bus}} = 20 - 15 = 5\\,\\text{m/s}`)],
  [K(`\\text{gap to close} = 150\\,\\text{m}`)],
  [K(`t = \\dfrac{150}{5} = 30\\,\\text{s}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wrS'); road(ws, 36, 748, 300);
const wBus = vehicle(ws, BC, 140, 54), wCar = vehicle(ws, AC, 90, 36); wBus.at(560, 300);
txt(ws, 630, 334, 'BUS · AT REST (from bus)', { 'text-anchor': 'middle', 'font-size': 15, fill: BC, 'font-weight': 600 });
const wGap = mk(ws, 'path', { d: '', stroke: RC, 'stroke-width': 3, fill: 'none' }), wGapL = txt(ws, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 24, fill: RC, 'font-weight': 600 });
const wArr = PUC.arrow(ws, RC, 6, 16), wArrL = txt(ws, 0, 0, '5 m/s', { 'font-size': 20, fill: RC, 'font-weight': 600 });
const wClock = txt(ws, 392, 440, '', { 'text-anchor': 'middle', 'font-size': 40, fill: C.ink, 'font-weight': 600 });
const wcx = m => 560 - 90 - m * (430 / 150);       // car front 150 m behind bus rear -> x = 40

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Opposite ways: 20 - 15 = 5 m/s', right: 'Direction as a sign: 20 - (-15) = 35 m/s' });
const tg = $('#tg'); road(tg, 30, 440, 110); road(tg, 30, 440, 210);
const xT1 = vehicle(tg, AC, 140, 44), xT2 = vehicle(tg, BC, 140, 44); xT1.at(60, 110); xT2.at(260, 210);
const xa1 = PUC.arrow(tg, AC, 5, 14), xa2 = PUC.arrow(tg, BC, 5, 14);
const xl1 = txt(tg, 300, 84, '+20', { 'font-size': 24, fill: AC, 'font-weight': 600 }), xl2 = txt(tg, 120, 184, '-15', { 'font-size': 24, fill: BC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short numericals: crossing trains, overtaking cars, meeting time' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN · NEET PATTERN · ORIGINAL QUESTION', q: 'A 150 m train runs east at 54 km/h. A 100 m train runs west at 36 km/h on the next track. How long do they take to cross each other completely?', qW: 780,
  opts: ['5 s', '10 s', '16.7 s', '50 s'], right: 1, optW: 440, optH: 84, optY: 330 });
const so = PUC.solution($('#so'), [[K('54\\,\\text{km/h} = 15\\,\\text{m/s}')], [K('36\\,\\text{km/h} = 10\\,\\text{m/s}')], [K(`${cv('v_{\\text{rel}}', RC)} = 15 - (-10) = 25\\,\\text{m/s}`)], [K('\\text{gap} = 150 + 100 = 250\\,\\text{m}')], [K('t = 250 / 25 = 10\\,\\text{s}')]], { y0: 100, dy: 100 });
const tSo = [wt('Z2', 'Fifty'), wt('Z2', 'Thirty'), wt('Z2', 'Opposite'), wt('Z3', 'both'), wt('Z3', 'Two', 1)];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · relative motion in 1D', y0: 104, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`${vBA} = ${vB} - ${vA} \\qquad ${vAB} = -\\,${vBA}`), K(`\\text{same way: } 20 - 15 = 5 \\qquad \\text{opposite: } 20 + 15 = 35`),
    '<b>Same velocity</b>: the gap never changes, each looks still', '<b>Lines cross</b> on an x-t graph: the two objects meet'] });
const YQ = ['Why does a bus beside you at the same speed look still?', 'Why do speeds add when two objects move toward each other?', 'If v<sub>BA</sub> is 5 m/s, what is v<sub>AB</sub>?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 32 · CH 3', topic: '5 N + 5 N = 10 N, or zero? Scalars and Vectors', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.2, 1.1, 640, 560], [tS9 + 0.3, 1, 960, 540]]);
const f1 = n => (Math.abs(n) < 0.05 ? 0 : n).toFixed(1);
const brk = (x1, x2, y) => `M${x1.toFixed(1)},${y + 8} v-8 H${x2.toFixed(1)} v8`;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hA'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    // view 1 (from your train): both trains fixed, the platform posts slide back; view 2 (platform): posts fixed, next train rushes past
    const t2 = wt('H2', 'moving') - 0.3, v2 = t >= t2;
    attr(postsIn, 'transform', `translate(${v2 ? -((t2 - tMorph) * 260 % 140) : -((t - tMorph) * 260 % 140)},0)`);
    const ny = 220, yy = 320;
    trY.at(v2 ? 80 - (t - t2) * 0 : 80, yy); trN.at(v2 ? 420 + (t - t2) * 300 > 760 ? -340 + ((420 + (t - t2) * 300 + 340) % 1100) : 420 + (t - t2) * 300 : 420, ny);
    trY.g.style.opacity = v2 ? 0.35 : 1;
    attr(trL1, 'x', 92); attr(trL1, 'y', yy - 80); attr(trL2, 'x', 432); attr(trL2, 'y', ny - 80); trL2.style.opacity = v2 ? 0 : 1; trL1.style.opacity = v2 ? 0.35 : 1;
    M.vis($('#vw0'), t, tMorph + 0.4, 1e9, POP); M.vis($('#vw1'), t, t2, 1e9, POP);
    $('#vw0').style.background = mix(C.ac3, C.soft, M.io((t - t2) / 0.3)); $('#vw1').style.background = mix(C.soft, C.ac3, M.io((t - t2) / 0.3));
    M.vis($('#hB'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkQ'), t, wt('H4', 'fly') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pL'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pA.g, t, tP1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(pB.g, t, tP1 + 0.55, 1e9, { dy: 0, fade: 0.3 });
    M.vis(pEye, t, wt('P2', 'seen') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.draw(pSight, t, wt('P2', 'seen'), 0.6);
    PUC.write(pFx, t, wt('P3', 'written') - 0.1, 0.6); M.vis($('#pW'), t, wt('P3', 'written') + 0.4, 1e9, { dx: -12, dy: 0 });
    M.vis($('#pR'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P4', 'equals') - 0.2, 0.8);
    M.vis($('#pF1'), t, wt('P4', 'other') - 0.1, 1e9, { dx: -12, dy: 0 }); M.vis($('#pF2'), t, wt('P4', "watcher's") - 0.2, 1e9, { dx: -12, dy: 0 });
    M.vis($('#pP'), t, T1('P4') - 0.3, 1e9, POP);
  }

  /* S: two buses */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const phase = t < tV0 - 0.2 ? 0 : t < tO0 - 0.1 ? 1 : 2;   // 0 ground, 1 A view same way, 2 A view B reversed
    let xa, xb, vb, tau, rel;
    if (phase === 0) { tau = tauG(t); xa = 6 * tau; xb = 20 + 4 * tau; vb = 4; }
    else if (phase === 1) { tau = tauV(t); xa = 6 * tau; xb = 20 + 4 * tau; vb = 4; }
    else { tau = tauO(t); xa = 6 * tau; xb = 36 + 6 * 0 - 4 * tau + 0; vb = -4; xb = xa + 36 - 10 * tau; }
    rel = xb - xa; const vrel = vb - 6;
    const QX = 14, AX = phase === 0 ? px(xa) : 80, BXp = phase === 0 ? px(xb) : 100 + rel * PXm + 110 * 0;
    const BX = phase === 0 ? px(xb) : AX + rel * QX;
    busA.at(AX, RYa); busB.at(BX, RYb);
    M.vis(busA.g, t, tS1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(busB.g, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.3 });
    attr(lA, 'x', AX + 55); attr(lA, 'y', RYa - 6); attr(lB, 'x', BX + 55); attr(lB, 'y', RYb - 6);
    // ground dashes: fixed in ground view, slide back at v_A in A's view
    dA.set(phase === 0 ? 0 : -xa * 14); dB.set(phase === 0 ? 0 : -xa * 14);
    // ghost trails (moving bus only)
    const prev = dt => { if (phase === 0) { const tt = Math.max(0, tau - dt); return [px(6 * tt), px(20 + 4 * tt)]; } if (phase === 1) { const tt = Math.max(0, tau - dt); return [80, 80 + (20 - 2 * tt) * 14]; } const tt = Math.max(0, tau - dt); return [80, 80 + (36 - 10 * tt) * 14]; };
    ghA.forEach((g, k) => { const [gx] = prev(0.5 * (k + 1)); g.at(gx, RYa); g.g.setAttribute('opacity', Math.abs(AX - gx) > 6 ? [0.3, 0.2, 0.12][k] : 0); });
    ghB.forEach((g, k) => { const [, gx] = prev((phase === 2 && t > tSlow && t < tSlowE ? 0.15 : 0.5) * (k + 1)); g.at(gx, RYb); g.g.setAttribute('opacity', Math.abs(BX - gx) > 6 ? [0.3, 0.2, 0.12][k] : 0); });
    // velocity arrows: ground view v_A and v_B; A view: A at rest, B arrow = v_BA
    const vOn = M.io((t - T0('S2')) / 0.4), sc = 10;
    if (phase === 0) { arA.set(AX + 110, RYa - 70, AX + 110 + 6 * sc * vOn, RYa - 70); attr(arAL, 'x', AX + 110 + 6 * sc + 8); attr(arAL, 'y', RYa - 62); M.setT(arAL, '6 m/s'); arAL.style.opacity = vOn; }
    else { arA.set(0, 0, 0, 0); arAL.style.opacity = 0; }
    const bv = phase === 0 ? vb : vrel, bcol = phase === 0 ? BC : RC;
    const bx0 = bv >= 0 ? BX + 110 : BX;
    arB.g.querySelectorAll('path').forEach((pp, i) => { if (i === 0) pp.setAttribute('stroke', bcol); else pp.setAttribute('fill', bcol); });
    arB.set(bx0, RYb - 70, bx0 + bv * sc * vOn, RYb - 70);
    attr(arBL, 'x', bv >= 0 ? bx0 + bv * sc + 8 : bx0 + bv * sc - 92); attr(arBL, 'y', RYb - 62); arBL.setAttribute('fill', bcol); arBL.style.opacity = vOn;
    M.setT(arBL, phase === 0 ? '4 m/s' : (vrel + ' m/s'));
    restA.style.opacity = phase === 0 ? 0 : M.io((t - tV0) / 0.3); attr(restA, 'x', AX); attr(restA, 'y', RYa - 66);
    // gap bracket between bus fronts (A front to B rear) as x_BA
    const gx1 = AX, gx2 = BX, gy = RYa - 110 + 0;
    attr(gapP, 'd', phase === 0 ? '' : `M${gx1},${RYa + 50} v-8 H${gx2} v8`); M.setT(gapL, phase === 0 || rel < 3 ? '' : `gap ${f1(rel)} m`); attr(gapL, 'x', (gx1 + gx2) / 2 + 55); attr(gapL, 'y', RYa + 80);
    // tags
    M.setT($('#vwT'), phase === 0 ? 'VIEW · FROM THE GROUND' : 'VIEW · FROM INSIDE BUS A');
    $('#vwT').style.background = phase === 0 ? C.ink : C.ac;
    M.vis($('#vwT'), t, T0('S2'), tSlow - 0.3, { dy: 8, outDur: 0.2 });
    M.vis($('#smo'), t, tSlow - 0.2, tSlowE, { ...POP, outDur: 0.2 });
    // readout
    M.setT($('#rVB'), String(vb)); M.setT($('#rVBA'), String(vrel)); M.setT($('#rX'), f1(rel)); M.setT($('#rT'), tau.toFixed(1)); M.setT($('#rView'), phase === 0 ? 'ground' : 'bus A');
    $('#rVBA').style.color = phase === 2 ? C.red : C.ink;
    // graph
    if (phase === 0) {
      M.setT($('#grL'), 'POSITION-TIME · FROM THE GROUND'); M.setT(yLab, 'x (m)');
      cA(u => [u, 6 * u], 0, tau); cB(u => [u, 20 + 4 * u], 0, tau); cR(() => [0, 0], 0, 0);
      dGA(tau, 6 * tau, t > tG0 - 0.1); dGB(tau, 20 + 4 * tau, t > tG0 - 0.1); dGR(0, 0, false);
    } else {
      M.setT($('#grL'), 'POSITION OF B · SEEN FROM A'); M.setT(yLab, 'x_BA (m)');
      cA(() => [0, 0], 0, 0); cB(() => [0, 0], 0, 0);
      if (phase === 1) { cR(u => [u, 20 - 2 * u], 0, tau); dGR(tau, 20 - 2 * tau, true); }
      else { cR(u => [u, 36 - 10 * u], 0, tau); dGR(tau, 36 - 10 * tau, true); }
      dGA(0, 0, false); dGB(0, 0, false);
    }
    avA(t, wt('S9', 'jumped') + 0.3, out);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, [[tStep[1] - 0.2, 200], [tStep[2] - 0.2, 320], [tStep[3] - 0.2, 440]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.2, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 18).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis(ghD, t, tD1 + 0.6, 1e9, { dy: 8 });
    // A at 6 m/s, B at 4 m/s, B starts 30 m ahead; slow loop so the gap visibly shrinks
    const u = M.clamp((t - tStep[0]) / (tStep[3] - tStep[0])) * 9, xa = 6 * u * 0.5, xb = 30 + 4 * u * 0.5;
    attr(nA, 'cx', NX(xa)); attr(nA, 'cy', NY); attr(nB, 'cx', NX(xb)); attr(nB, 'cy', NY);
    M.setT(nAL, 'A'); M.setT(nBL, 'B'); attr(nAL, 'x', NX(xa)); attr(nAL, 'y', NY - 26); attr(nBL, 'x', NX(xb)); attr(nBL, 'y', NY - 26);
    const gOn = t > tStep[0] + 0.5; attr(nGap, 'd', gOn ? brk(NX(xa), NX(xb), NY - 80) : ''); M.setT(nGapL, gOn ? `gap ${f1(xb - xa)} m` : ''); attr(nGapL, 'x', (NX(xa) + NX(xb)) / 2); attr(nGapL, 'y', NY - 92);
    M.vis(dRate, t, tStep[1] + 0.8, 1e9, POP); dRate.innerHTML = `gap shrinks 2 m every second: v<sub>BA</sub> = -2 m/s`;
    M.vis(dFlip, t, tStep[3] + 0.8, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Relative') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'minus') - 0.1, 0.8);
  }

  /* R: parallel lines */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.45, out, { dx: 60, dy: 0, ...o }); M.vis(ghR, t, tR1 + 0.7, 1e9, { dy: 8 });
    LK.forEach((_, i) => M.vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }));
    const u = 10 * M.io((t - tLk[0]) / 2.2);
    rA(s2 => [s2, 6 * s2], 0, u); rB(s2 => [s2, 20 + 6 * s2], 0, u); rdA(u, 6 * u, t > tLk[0]); rdB(u, 20 + 6 * u, t > tLk[0]);
    const gOn = t > tLk[1] - 0.1, gt = Math.min(u, 10);
    attr(rGap, 'd', gOn ? `M${RG.X(gt) + 14},${RG.Y(6 * gt)} h8 V${RG.Y(20 + 6 * gt)} h-8` : ''); rGapL.style.opacity = gOn ? 1 : 0;
    attr(rGapL, 'x', RG.X(gt) - 14); attr(rGapL, 'y', RG.Y(10 + 6 * gt) + 50); rGapL.setAttribute('text-anchor', 'end'); rGapL.textContent = 'gap 20 m';
    M.vis(rZero, t, wt('R4', 'zero') - 0.1, 1e9, POP);
    avD(t, wt('R5', 'rest') + 0.3, out);
  }

  /* K: side by side + two thinks */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#kx'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kS(t, tK1 + 0.3, wt('K1', 'twenty')); PUC.write($('#kxF'), t, T0('K2') + 0.1, 0.8); M.vis($('#kxC'), t, wt('K2', 'five', 1) + 0.2, 1e9, POP);
    M.vis($('#kv'), t, T0('K3') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#exK'), t, T0('K3') + 0.2, 1e9, { dy: 8 });
    kO(t, T0('K3') + 0.1, wt('K3', 'opposite')); PUC.write($('#kvF'), t, wt('K3', 'Twenty') - 0.1, 0.8); M.vis($('#kvC'), t, wt('K3', 'thirty') + 0.2, 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'gap') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Opposite') });
    M.vis($('#th2'), t, tB1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB1, tOpts: wt('B1', 'happens') - 0.1, tCount: T1('B1') + 0.05, dur: 3, tAns: T0('B2') - 0.02, tWhy: wt('B2', 'Where') });
  }

  /* W: worked example (seen from the bus) */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, tW1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(wBus.g, t, tW1 + 0.5, 1e9, { dy: 0, fade: 0.3 });
    // car closes the 150 m gap at 5 m/s (30 s compressed into the W5-W6 lines)
    const tc0 = wt('W5', 'gap'), tc1 = wt('W6', 'thirty', 1) + 0.2, sim = 30 * M.clamp((t - tc0) / (tc1 - tc0)), gapM = 150 - 5 * Math.round(sim);
    const cx = wcx(150 - 5 * sim); wCar.at(cx, 300); M.vis(wCar.g, t, tW1 + 0.6, 1e9, { dy: 0, fade: 0.3 });
    const gOn = t > T0('W5') - 0.1;
    attr(wGap, 'd', gOn && gapM > 1 ? brk(cx + 90, 560, 196) : ''); M.setT(wGapL, gOn && gapM > 1 ? `${gapM.toFixed(0)} m` : ''); attr(wGapL, 'x', (cx + 90 + 560) / 2); attr(wGapL, 'y', 184);
    const ar = M.io((t - wt('W4', 'Five') + 0.1) / 0.4); wArr.set(cx + 90, 256, cx + 90 + 70 * ar, 256); attr(wArrL, 'x', cx + 90); attr(wArrL, 'y', 236); wArrL.style.opacity = ar;
    M.setT(wClock, t > tc0 - 0.1 ? `t = ${sim.toFixed(0)} s` : '');
    M.vis($('#ans'), t, tc1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    M.vis(tg, t, T0('X2') + 0.1, 1e9, { dy: 0, fade: 0.3 });
    const u = M.io((t - wt('X2', 'opposite') + 0.1) / 0.4); xa1.set(210, 70, 210 + 90 * u, 70); xa2.set(250, 170, 250 - 70 * u, 170); xl1.style.opacity = u; xl2.style.opacity = u;
    xl2.setAttribute('fill', mix(BC, C.red, M.io((t - wt('X3', 'sign') + 0.1) / 0.3)));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
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
