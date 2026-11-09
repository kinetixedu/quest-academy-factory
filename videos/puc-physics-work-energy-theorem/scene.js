// PUC Physics Ep 76: Work-energy theorem (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const EN = C.teal, FC = C.orange, DC = C.violet, VC = C.ac, AC = C.red, MC = C.ink;   // W,K teal; F orange; d violet; v,u blue; a red; m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kW = tc(EN, 'W'), kF = tc(FC, 'F'), kd = tc(DC, 'd'), kv = tc(VC, 'v'), ku = tc(VC, 'u'), ka = tc(AC, 'a'), km = tc(MC, 'm');
const kKf = tc(EN, 'K_{\\text{f}}'), kKi = tc(EN, 'K_{\\text{i}}'), kWn = tc(EN, 'W_{\\text{net}}');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2), f0 = v => v.toFixed(0);

Object.assign(M.IC, {
  bike: ['M5.5 14a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7Z', 'M18.5 14a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M9 17h6', 'M17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'],
  run: ['M13 4a1.5 1.5 0 1 0 0-.01', 'M7 21l3-6 3 2v5', 'M6 12l3-4 4 1 3 3h3', 'M10 15l1-6'],
});
// svg bicycle: origin = front-wheel contact point, faces right
const bikeS = (p, col = C.ink) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {});
  [[-64, -20], [0, -20]].forEach(([x, y]) => { mk(g, 'circle', { cx: x, cy: y, r: 20, fill: 'none', stroke: col, 'stroke-width': 4 }); mk(g, 'circle', { cx: x, cy: y, r: 3, fill: col }); });
  mk(g, 'path', { d: 'M-64,-20 L-40,-50 L-6,-50 L0,-20 M-40,-50 L-30,-20 L-64,-20 M-30,-20 L-6,-50 M-44,-58 H-32 M-6,-50 L-10,-64 H0', stroke: col, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  txt(g, -32, -78, '80 kg', { 'text-anchor': 'middle', fill: col, 'font-weight': 600, 'font-size': 17 });
  return { o, g }; };
const cart = (p, w = 90, h = 50, col = C.ink) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: -w, y: -h, width: w, height: h, rx: 8, fill: col }); mk(g, 'circle', { cx: -w + 20, cy: 6, r: 11, fill: '#fff', stroke: col, 'stroke-width': 4 }); mk(g, 'circle', { cx: -20, cy: 6, r: 11, fill: '#fff', stroke: col, 'stroke-width': 4 }); return { o, g, w, h }; };
const place = (c, x, y) => attr(c.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP2 = T0('P2'), tS1 = T0('S1'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bike', 'Cycle', 'BRAKES', 'cycle', 90], ['car', 'Car', 'BRAKES', 'car', 160], ['run', 'Runner', 'SKIDS TO A STOP', 'runner', 60]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , L], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg width="230" height="80"><path id="js${i}" d="M20,52 H${20 + L}" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" opacity=".35" fill="none"/><path d="M${20 + L},36 V64" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/><text x="20" y="28" font-family="IBM Plex Mono" font-size="15" fill="${C.mute}">STOPPING ROOM</text></svg></div>`).join('');
const TILES = [[VC, '4 m/s → 4 m', 'bike'], [C.ink, '8 m/s → 8 m?', 'help'], [EN, '16 m!', 'zap']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'stops'), wt('H4', 'Will'), wt('H5', 'sixteen')];

/* ---------- P: force along vs against ---------- */
const PR = [['along', 'Push along the motion', 'PUTS ENERGY IN · SPEEDS UP', 1], ['against', 'Push against the motion', 'TAKES ENERGY OUT · SLOWS DOWN', -1]];
$('#pqr').innerHTML = PR.map(([k, n, i], j) => `<div class="prow" id="pr${j}" style="top:${84 + j * 180}px"><svg id="prS${j}" width="320" height="150"></svg><div class="pn">${n}</div><div class="pi">${i}</div></div>`).join('');
const PA = PR.map(([, , , s], j) => { const sv = $('#prS' + j); mk(sv, 'line', { x1: 24, y1: 116, x2: 300, y2: 116, stroke: C.ink, 'stroke-width': 2.5 }); const c = cart(sv, 70, 40, C.ink); place(c, 180, 104);
  return { c, s, v: PUC.arrow(sv, VC, 5, 14), f: PUC.arrow(sv, FC, 5, 14), lv: it(sv, 0, 0, 'v', VC, { 'font-size': 22 }), lf: it(sv, 0, 0, 'F', FC, { 'font-size': 22 }) }; });
const tPr = [wt('P2', 'along'), wt('P3', 'against')];

/* ---------- S: brake test. m = 80 kg, F = 160 N backward, a = -2 m/s^2. x = u t - t^2, stops at t = u/2, d = u^2/4 ---------- */
const s = $('#simS'), GY = 360, X0 = 150, PX = 33, VS = 9, FS = 0.4;     // 33 px per m, 9 px per m/s, 0.4 px per N
const FX = d => X0 + d * PX;
mk(s, 'rect', { x: 0, y: GY, width: 784, height: 30, fill: '#E4E1D8' });
mk(s, 'line', { x1: 0, y1: GY, x2: 784, y2: GY, stroke: C.ink, 'stroke-width': 3 });
for (let k = 0; k <= 16; k += 2) { mk(s, 'line', { x1: FX(k), y1: GY, x2: FX(k), y2: GY + (k % 4 ? 10 : 16), stroke: C.ink, 'stroke-width': 2 }); txt(s, FX(k), GY + 54, k, { 'text-anchor': 'middle', fill: k === 4 || k === 16 ? C.ink : C.mute, 'font-weight': k === 4 || k === 16 ? 600 : 400 }); }
txt(s, 760, GY + 54, 'd (m)', { 'text-anchor': 'end' });
const STOP = [4, 16].map((d, k) => ({ d, ln: mk(s, 'line', { x1: FX(d), y1: 246, x2: FX(d), y2: GY, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }),
  l: txt(s, FX(d), GY + 84, `${k ? 8 : 4} m/s → ${d} m`, { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 19 }),
  sk: mk(s, 'line', { x1: FX(0), y1: GY + 6, x2: FX(d), y2: GY + 6, stroke: C.ink, 'stroke-width': 5, opacity: 0.25, 'stroke-linecap': 'round' }) }));
txt(s, 36, 150, 'KINETIC ENERGY', { 'font-size': 16, 'letter-spacing': 1 }); mk(s, 'rect', { x: 36, y: 162, width: 600, height: 30, rx: 6, fill: 'none', stroke: C.line, 'stroke-width': 2 });
const sKb = mk(s, 'rect', { x: 36, y: 162, width: 0, height: 30, rx: 6, fill: EN }), sKl = txt(s, 648, 184, '', { fill: EN, 'font-weight': 600, 'font-size': 22 });
const sGh = [0, 1, 2].map(() => { const b = bikeS(s, C.ink); b.g.style.opacity = 0; return b; });
const sB = bikeS(s, C.ink);
const sF = PUC.arrow(s, FC, 6, 18), sV = PUC.arrow(s, VC, 6, 18);
const sLF = it(s, 0, 0, 'F = 160 N', FC, { 'font-size': 22, 'text-anchor': 'middle' }), sLV = it(s, 0, 0, 'v', VC, { 'font-size': 26 });
const sWt = txt(s, 36, 460, 'FORCE AGAINST MOTION → W < 0', { fill: EN, 'font-weight': 600, 'font-size': 20 });
const rA = T0('S3') + 0.5, rB = T0('S5') + 0.4, rp = wt('S7', 'replay') + 0.4;   // run 1 (u = 4, 2 s), run 2 (u = 8, 4 s), replay of run 2 at 0.25x for its first 2 s
const runS = t => {          // -> [u, tau]
  if (t >= rp) return [8, Math.min(2, 0.25 * (t - rp))];
  if (t >= rB - 0.3) return [8, M.clamp(t - rB, 0, 4)];
  return [4, M.clamp(t - rA, 0, 2)];
};
const moving = t => (t > rA && t < rA + 2) || (t > rB && t < rB + 4) || (t > rp && t < rp + 8);
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${DC}">d</span><span class="v" id="r_d" style="color:${DC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" style="color:${FC}">-160</span><span class="u">N</span>
  <span class="k" style="color:${EN}">W</span><span class="v" id="r_w" style="color:${EN}">0</span><span class="u">J</span>
  <span class="k" style="color:${EN}">K</span><span class="v" id="r_k" style="color:${EN}">0</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 120, y: 64, w: 560, h: 150, xmax: 18.5, ymax: 2700, xt: [0, 4, 8, 12, 16], yt: [0, 640, 2560], xl: 'd (m)', yl: 'K (J)' });
const gc1 = g.curve(EN, 4), gc2 = g.curve(EN), gd = g.dot(EN, 11);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same brakes, 160 J gone every metre.' });

/* ---------- D ---------- */
const STEPS = [[`${kv}^{2} - ${ku}^{2} = 2${ka}${kd}`, 'steady force, so steady a'],
  [`\\tfrac{1}{2}${km}${kv}^{2} - \\tfrac{1}{2}${km}${ku}^{2} = ${km}${ka}${kd}`, 'multiply both sides by m/2'],
  [`${km}${ka} = ${kF} \\;\\Rightarrow\\; \\text{right side} = ${kF}${kd} = ${kW}`, "Newton's second law: F is the net force"],
  [`\\tfrac{1}{2}${km}${kv}^{2} = ${kKf},\\quad \\tfrac{1}{2}${km}${ku}^{2} = ${kKi}`, 'final and initial kinetic energy']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'For'), wt('D3', 'Multiply'), wt('D4', 'By'), wt('D5', 'left')];
$('#steps2').innerHTML = `<div class="kbox" id="kbx" style="top:404px;height:124px"></div><div class="st" id="dsu0" style="top:420px"><div class="n">5</div><div class="sx" style="font-size:46px">${K(`${kKf} - ${kKi} = ${kWn}`)}</div><div class="why" style="top:70px">the work-energy theorem</div></div>`;
const dr = $('#drS'), DB = 340, DS = 0.172;        // bars: 0.08 px per J (first run of the bike in reverse: K_i = 0 + W)
mk(dr, 'line', { x1: 60, y1: DB, x2: 724, y2: DB, stroke: C.ink, 'stroke-width': 2.5 });
const dBi = mk(dr, 'rect', { x: 120, y: DB, width: 130, height: 0, fill: EN, opacity: 0.45, rx: 4 }), dBf = mk(dr, 'rect', { x: 480, y: DB, width: 130, height: 0, fill: EN, rx: 4 });
const dBw = mk(dr, 'rect', { x: 480, y: DB, width: 130, height: 0, fill: 'none', stroke: EN, 'stroke-width': 3, 'stroke-dasharray': '6 5', rx: 4 });
txt(dr, 185, DB + 30, 'START', { 'text-anchor': 'middle', 'font-weight': 600 }); txt(dr, 545, DB + 30, 'END', { 'text-anchor': 'middle', 'font-weight': 600 });
const dLi = it(dr, 185, 0, 'Kᵢ', EN, { 'text-anchor': 'middle', 'font-size': 28 }), dLf = it(dr, 545, 0, 'K_f', EN, { 'text-anchor': 'middle', 'font-size': 28 });
const dWa = PUC.arrow(dr, EN, 5, 16), dLw = it(dr, 400, 0, '+W', EN, { 'text-anchor': 'middle', 'font-size': 28 });
dLf.textContent = 'Kf'; dLi.textContent = 'Ki';
const DKi = 640, DKf = 2560;
$('#stF').innerHTML = K(`${kKf} - ${kKi} = ${kWn}`);

/* ---------- C: pushed forward vs held back ---------- */
const CL = [['#cmS', 1], ['#cvS', -1]].map(([id, s2]) => {
  const sv = $(id); mk(sv, 'line', { x1: 0, y1: 260, x2: 784, y2: 260, stroke: C.ink, 'stroke-width': 2.5 });
  const gh = [0, 1, 2].map(() => { const c = cart(sv, 100, 54, C.ink); c.g.style.opacity = 0; return c; }), c = cart(sv, 100, 54, C.ink);
  txt(c.g, -50, -20, '10 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 17 });
  const kb = mk(sv, 'rect', { x: 36, y: 420, width: 0, height: 36, rx: 6, fill: EN }); mk(sv, 'rect', { x: 36, y: 420, width: 600, height: 36, rx: 6, fill: 'none', stroke: C.line, 'stroke-width': 2 });
  const kl = txt(sv, 36, 404, '', { fill: EN, 'font-weight': 600, 'font-size': 20 });
  return { s: s2, gh, c, v: PUC.arrow(sv, VC, 6, 16), f: PUC.arrow(sv, FC, 6, 16), lf: it(sv, 0, 0, 'F', FC, { 'font-size': 24 }), lv: it(sv, 0, 0, 'v', VC, { 'font-size': 24 }), kb, kl };
});
// pushed: u = 1 -> 4 m/s, a = +1 m/s^2 for 3 s ; held back: u = 4 -> 1 m/s, a = -1 m/s^2 for 3 s. 40 px per metre
const cRun = [T0('C2') + 0.6, T0('C3') + 0.6];
const cState = (k, t) => { const tau = M.clamp(t - cRun[k], 0, 3), u = k ? 4 : 1, a = k ? -1 : 1; return { tau, x: u * tau + 0.5 * a * tau * tau, v: u + a * tau }; };
const th1 = PUC.think($('#th1'), { q: 'A ball is thrown straight up. On the way up, is the work done by gravity positive or negative?', opts: ['Positive', 'Negative'], right: 1, why: 'Gravity pulls down, the ball moves up: K falls, so it slows.' });

/* ---------- R ---------- */
const LK = [[`${kKf} = 0`, 'THE BIKE STOPS'], [`${kW} = -${kF}${kd}`, 'BRAKES: NEGATIVE WORK'], [`${kF}${kd} = \\tfrac{1}{2}${km}${ku}^{2} \\Rightarrow ${kd} = \\dfrac{${km}${ku}^{2}}{2${kF}}`, ''], [`${kd} \\propto ${ku}^{2}`, '2 × SPEED → 4 × DISTANCE']];
const LKy = [84, 192, 300, 438], LKh = [92, 92, 122, 92];
$('#lks').innerHTML = LK.map(([f, tg], i) => `<div class="lk" id="lk${i}" style="top:${LKy[i]}px;height:${LKh[i]}px"><div class="n" style="top:${(LKh[i] - 48) / 2}px">${i + 1}</div><div class="fx2" style="top:${i === 2 ? 14 : 20}px">${K(f)}</div>${tg ? `<div class="tg" id="lt${i}" style="top:${(LKh[i] - 44) / 2}px">${tg}</div>` : `<div id="lt${i}"></div>`}</div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const rr = $('#rrS'), RS = 18;                   // 18 px per metre of skid
const SK = [[4, 4], [8, 16]].map(([u, d], i) => { const y = 150 + i * 150; mk(rr, 'line', { x1: 60, y1: y + 30, x2: 724, y2: y + 30, stroke: C.line, 'stroke-width': 2 });
  return { u, d, bar: mk(rr, 'rect', { x: 60, y: y, width: 0, height: 26, rx: 5, fill: C.ink, opacity: 0.75 }), l1: txt(rr, 60, y - 16, `from ${u} m/s`, { fill: VC, 'font-weight': 600, 'font-size': 22 }), l2: txt(rr, 60, y + 64, `${d} m`, { fill: DC, 'font-weight': 600, 'font-size': 26 }) }; });
const th2 = PUC.think($('#th2'), { q: 'Aarav triples his speed, same brakes. How many times the stopping distance?', opts: ['3 ×', '6 ×', '9 ×'], right: 2, why: 'd grows with u squared: 3² = 9.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A ${K('2\\ \\text{kg}')} block at ${K(tc(VC, '2\\ \\text{m/s}'))} is pushed with ${K(tc(FC, '12\\ \\text{N}'))} over ${K(tc(DC, '4\\ \\text{m}'))}. Friction is ${K(tc(FC, '4\\ \\text{N}'))}. Find its final speed.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${kF}_{\\text{net}} = 12 - 4 = 8\\ \\text{N},\\;\\; ${kWn} = 8 \\times 4 = ${tc(EN, '32\\ \\text{J}')}`)],
  [K(`${kKi} = \\tfrac{1}{2}(2)(2)^{2} = 4\\ \\text{J}`)],
  [K(`${kKf} = 4 + 32 = ${tc(EN, '36\\ \\text{J}')}`)],
  [K(`\\tfrac{1}{2}(2)${kv}^{2} = 36 \\Rightarrow ${kv} = ${tc(VC, '6\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = 250, WX0 = 170, WPX = 100;       // 100 px per metre, block 2 kg
mk(w, 'rect', { x: 0, y: WG, width: 784, height: 20, fill: '#E4E1D8' }); mk(w, 'line', { x1: 0, y1: WG, x2: 784, y2: WG, stroke: C.ink, 'stroke-width': 3 });
[0, 1, 2, 3, 4].forEach(k => { mk(w, 'line', { x1: WX0 + k * WPX, y1: WG, x2: WX0 + k * WPX, y2: WG + 12, stroke: C.ink, 'stroke-width': 2 }); txt(w, WX0 + k * WPX, WG + 42, k, { 'text-anchor': 'middle' }); });
txt(w, 748, WG + 42, 'd (m)', { 'text-anchor': 'end' });
const wGh = [0, 1, 2].map(() => mk(w, 'rect', { y: WG - 64, width: 80, height: 64, rx: 8, fill: C.ink, opacity: 0 }));
const wBl = mk(w, 'rect', { y: WG - 64, width: 80, height: 64, rx: 8, fill: C.ink }); const wBt = txt(w, 0, WG - 26, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 17 });
const wP = PUC.arrow(w, FC, 6, 18), wFr = PUC.arrow(w, FC, 6, 18), wV = PUC.arrow(w, VC, 6, 16);
const wLp = it(w, 0, 0, '12 N', FC, { 'font-size': 22, 'text-anchor': 'middle' }), wLf = it(w, 0, 0, '4 N', FC, { 'font-size': 22, 'text-anchor': 'middle' }), wLv = it(w, 0, 0, '', VC, { 'font-size': 22 });
const LED = [['push: 12 × 4', '+48 J', C.ink], ['friction: 4 × 4', '-16 J', C.red], ['net work', '+32 J', EN]].map(([a, b, col], i) => { const y = 370 + i * 50; return [txt(w, 60, y, a, { fill: C.ink2, 'font-size': 22, 'font-weight': 500 }), txt(w, 700, y, b, { 'text-anchor': 'end', fill: col, 'font-weight': 600, 'font-size': 26 })]; });
const wRule = mk(w, 'line', { x1: 60, y1: 438, x2: 700, y2: 438, stroke: C.ink, 'stroke-width': 2 });
const tWr = wt('W2', 'Find') - 0.2;          // a = 4 m/s^2, x = 2t + 2t^2, reaches 4 m at t = 1 s with v = 6 m/s
const wTau = t => M.clamp(t - tWr, 0, 1);
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Change in K = work of the push alone = 48 J', right: 'Change in K = net work = 48 - 16 = 32 J' });
const tp = $('#tpS'), TB = 150, TS = 2;
mk(tp, 'line', { x1: 40, y1: TB, x2: 520, y2: TB, stroke: C.ink, 'stroke-width': 2.5 });
const TBr = [['push', 48], ['friction', -16], ['net', 32]].map(([n, v], i) => { const x = 70 + i * 150; return { v, r: mk(tp, 'rect', { x, y: TB, width: 100, height: 0, rx: 4, fill: i === 2 ? EN : 'none', stroke: EN, 'stroke-width': 3 }), l: txt(tp, x + 50, v > 0 ? TB - v * TS - 12 : TB - v * TS + 26, `${v > 0 ? '+' : ''}${v} J`, { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 22 }), n: txt(tp, x + 50, v > 0 ? TB + 26 : TB - 12, n, { 'text-anchor': 'middle', fill: C.ink2, 'font-size': 17 }) }; });
const where = PUC.where($('#wa'), { on: [], type: 'Find a speed, a stopping distance or a force from the change in K' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 80, optFs: 32, optY: 370,
  q: `A block slides on a rough floor with constant friction. Its speed falls from 10 m/s to 6 m/s over 8 m. How much farther will it slide before it stops?`,
  opts: ['3 m', '4.5 m', '6 m', '8 m'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${kW} = -f${kd} \\Rightarrow \\Delta K \\propto ${kd}`)], [K(`10^{2} - 6^{2} = 64 \\;\\text{in}\\; 8\\ \\text{m}`)], [K(`\\text{left: } 6^{2} = 36`)], [K(`\\tfrac{36}{64} \\times 8 = ${tc(C.ok, '4.5\\ \\text{m}')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'Ten'), T0('A4'), wt('A4', 'over')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · work-energy theorem', y0: 100, dy: 88, txt: [0, 1, 1, 1],
  lines: [K(`${kKf} - ${kKi} = ${kWn} \\qquad \\tfrac{1}{2}${km}${kv}^{2} - \\tfrac{1}{2}${km}${ku}^{2} = ${kF}${kd}`),
    `<b>W &gt; 0</b>: speeds up &nbsp;·&nbsp; <b>W &lt; 0</b>: slows down`,
    `Stopping distance ${K(`${kd} = ${km}${ku}^{2}/2${kF}`)}, so ${K(`${kd} \\propto ${ku}^{2}`)}`,
    `Always use the <b>net</b> work of all forces`] });
const YQ = ['Why does a bike at twice the speed need four times the distance to stop?', 'Is the work done by brakes positive or negative, and why?', 'Does the theorem use the work of one force, or of all forces?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 77', topic: 'A spring pushes back harder. Work-Energy Theorem for a Variable Force', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS8 - 0.2, 1.06, 960, 540], [T0('S9') - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px'; bp.style.top = '96px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP2 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P2');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw($('#js' + i), t, tMorph + 0.5 + i * 0.3, 0.6); });
    vis($('#hjP'), t, wt('H2', 'how') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    const e1 = M.io((t - wt('H5', 'No')) / 0.3); $('#wq1').style.textDecoration = e1 > 0.5 ? 'line-through' : 'none'; $('#wq1').style.color = mix(C.ink, C.dim, e1);
    const e2 = M.io((t - tTile[2]) / 0.3); $('#wq2').style.background = mix(C.soft, EN, e2); $('#wq2').style.color = mix(C.ink, '#FFFFFF', e2);
  }

  /* P */
  const pOn = t >= tP2 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP2 + 0.05, out, { dx: -60, dy: 0, ...o });
    PA.forEach((p, j) => { vis($('#pr' + j), t, tPr[j] - 0.2, 1e9, { dy: 16 });
      const u = M.o3((t - tPr[j]) / 0.5), sp = p.s > 0 ? M.clamp((t - tPr[j] - 0.4) / 2) : 1 - 0.7 * M.clamp((t - tPr[j] - 0.4) / 2);
      p.v.set(186, 80, 186 + 70 * sp * u, 80); attr(p.lv, 'x', 196 + 70 * sp * u); attr(p.lv, 'y', 74); p.lv.style.opacity = u.toFixed(3);
      if (p.s > 0) { p.f.set(30, 84, 30 + 70 * u, 84); attr(p.lf, 'x', 40); attr(p.lf, 'y', 70); } else { p.f.set(100, 50, 100 - 70 * u, 50); attr(p.lf, 'x', 40); attr(p.lf, 'y', 44); }
      p.lf.style.opacity = u.toFixed(3); });
    vis($('#pqP'), t, T0('P4') - 0.1, 1e9, POP);
    vis($('#pm'), t, T0('P5') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#kBig'), t, wt('P5', 'That') - 0.1, 1e9, { dy: 20 }); vis($('#kSub'), t, wt('P5', 'changes') - 0.2, 1e9, { dy: 10 });
    [0, 1, 2].forEach(i => vis($('#pc' + i), t, wt('P5', 'theorem') + 0.4 + i * 0.35, 1e9, POP));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const [u, tr] = runS(t), tau = Math.round(tr * 100) / 100, v = u - 2 * tau, d = u * tau - tau * tau, x = FX(d);
    place(sB, x, GY); vis(sB.o, t, tS1 + 0.4, 1e9, { dy: 0, fade: 0.12 });
    const mv = moving(t);
    sGh.forEach((gh, k) => { const [u2, q] = runS(t - (t >= rp ? 0.3 : 0.08) * (k + 1)); place(gh, FX(u2 * q - q * q), GY); gh.g.style.opacity = mv && u2 === u && q < tau - 0.01 ? [0.3, 0.2, 0.12][k] : 0; });
    const fOn = M.o3((t - wt('S2', 'backward') + 0.1) / 0.5) * (v > 0.01 ? 1 : 0.0);
    sF.set(x - 32, GY - 110, x - 32 - 160 * FS * fOn, GY - 110); attr(sLF, 'x', (x - 64).toFixed(1)); attr(sLF, 'y', GY - 124); sLF.style.opacity = fOn.toFixed(3);
    sV.set(x + 24, GY - 20, x + 24 + v * VS, GY - 20); attr(sLV, 'x', (x + 30 + v * VS).toFixed(1)); attr(sLV, 'y', GY - 30); sLV.style.opacity = v > 0.3 ? 1 : 0;
    STOP.forEach((sp, k) => { const tt = k ? rB + 4 : rA + 2; vis(sp.ln, t, tt, 1e9, { dy: 0 }); vis(sp.l, t, tt, 1e9, { dy: 8 }); M.drawU(sp.sk, k ? M.clamp((t - rB) / 4) : M.clamp((t - rA) / 2)); });
    vis(sWt, t, wt('S8', 'negative') - 0.1, 1e9, { dy: 8 });
    vis($('#smo'), t, rp - 0.4, T0('S9') - 0.3, { ...POP, sc: 0.8 });
    const K0 = 40 * u * u, Kn = 40 * v * v;
    attr(sKb, 'width', (Kn * 600 / 2560).toFixed(1)); M.setT(sKl, `${f0(Kn)} J`); vis(sKb, t, tS1 + 0.6, 1e9, { dy: 0 }); vis(sKl, t, tS1 + 0.6, 1e9, { dy: 0 });
    M.setT($('#r_t'), f2(tau)); M.setT($('#r_d'), f2(d)); M.setT($('#r_v'), f2(v)); M.setT($('#r_w'), f0(-160 * d)); M.setT($('#r_k'), f0(Kn));
    const d1 = t >= rB - 0.3 ? 4 : d, d2 = t >= rp ? 16 : t >= rB ? d : 0;
    gc1(q => [q, 640 - 160 * q], 0, d1); gc2(q => [q, 2560 - 160 * q], 0, d2); gd(d, Kn, t > rA - 0.3);
    vis($('#gTag'), t, wt('S9', 'same') - 0.1, 1e9, POP);
    avA(t, wt('S6', 'every'), OUT('S7'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.2, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const ui = M.o3((t - tD1 - 0.8) / 0.6), uw = M.o3((t - tStep[2] - 0.4) / 0.8), uf = M.o3((t - tStep[3] - 0.2) / 0.6);
    const hi = DKi * DS * 0.5 * ui, hw = (DKf - DKi) * DS * 0.5 * uw, hf = DKf * DS * 0.5 * uf;
    attr(dBi, 'y', (DB - hi).toFixed(1)); attr(dBi, 'height', hi.toFixed(1)); attr(dLi, 'y', (DB - hi - 14).toFixed(1)); dLi.style.opacity = ui.toFixed(3);
    attr(dBw, 'y', (DB - DKi * DS * 0.5 - hw).toFixed(1)); attr(dBw, 'height', (hw > 1 ? hw : 0).toFixed(1)); M.hide(dBw, hw < 1);
    attr(dBf, 'y', (DB - DKi * DS * 0.5 * uw).toFixed(1)); attr(dBf, 'height', (DKi * DS * 0.5 * uw).toFixed(1));
    attr(dLf, 'y', (DB - DKi * DS * 0.5 - hw - 14).toFixed(1)); dLf.style.opacity = uf.toFixed(3);
    dWa.set(270, DB - DKi * DS * 0.25, 270 + 190 * uw, DB - DKi * DS * 0.25 - 30 * uw); attr(dLw, 'y', (DB - DKi * DS * 0.25 - 40).toFixed(1)); dLw.style.opacity = uw.toFixed(3);
    vis($('#kbx'), t, T0('D6') - 0.1, 1e9, { dy: 0, fade: 0.2 }); const e = $('#dsu0'); vis(e.querySelector('.n'), t, T0('D6') - 0.1, 1e9, { ...POP, sc: 0.4 }); PUC.write(e.querySelector('.sx'), t, wt('D6', 'change'), 0.8); vis(e.querySelector('.why'), t, wt('D6', 'net') + 0.3, 1e9, { dx: -12, dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'net') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'change') - 0.1, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#cm'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o }); vis($('#cv'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    CL.forEach((L, k) => {
      const st = cState(k, t), X = 150 + 40 * st.x, Y = 248, on = t > cRun[k] - 0.8;
      place(L.c, X, Y); vis(L.c.o, t, cRun[k] - 0.8, 1e9, { dy: 0, fade: 0.15 });
      const mvv = t > cRun[k] && t < cRun[k] + 3;
      L.gh.forEach((gh, j) => { const s2 = cState(k, t - 0.12 * (j + 1)); place(gh, 150 + 40 * s2.x, Y); gh.g.style.opacity = mvv && s2.tau < st.tau - 0.01 ? [0.3, 0.2, 0.12][j] : 0; });
      L.v.set(X + 8, Y - 30, X + 8 + (on ? st.v * 22 : 0), Y - 30); attr(L.lv, 'x', (X + 14 + st.v * 22).toFixed(1)); attr(L.lv, 'y', Y - 40); L.lv.style.opacity = on ? 1 : 0;
      const uf = M.o3((t - cRun[k] + 0.4) / 0.4); if (k === 0) { L.f.set(X - 100 - 70 * uf, Y - 30, X - 102, Y - 30); attr(L.lf, 'x', (X - 140).toFixed(1)); } else { L.f.set(X - 50, Y - 80, X - 50 - 70 * uf, Y - 80); attr(L.lf, 'x', (X - 130).toFixed(1)); }
      attr(L.lf, 'y', k ? Y - 92 : Y - 44); L.lf.style.opacity = uf.toFixed(3);
      const Kv = 5 * st.v * st.v; attr(L.kb, 'width', (Kv * 7.5 * (on ? 1 : 0)).toFixed(1)); M.setT(L.kl, `K = ${f0(Kv)} J`); L.kl.style.opacity = on ? 1 : 0;
      vis($(k ? '#cvR' : '#cmR'), t, wt(k ? 'C3' : 'C2', k ? 'negative' : 'positive') - 0.1, 1e9, POP);
    });
    vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'positive') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Gravity') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, { dy: 16 }); PUC.write(el.querySelector('.fx2'), t, tLk[i] + 0.2, 0.7); vis($('#lt' + i), t, tLk[i] + 0.9, 1e9, { ...POP, sc: 0.5 }); });
    const fin = M.io((t - wt('R5', 'Twice')) / 0.3); $('#lk3').style.background = mix(C.soft, '#E3F3F3', fin);
    vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    SK.forEach((k2, i) => { const tt = i ? wt('R5', 'four') : wt('R5', 'Twice'); vis(k2.l1, t, tR1 + 0.6 + i * 0.2, 1e9, { dy: 8 }); const uu = M.o3((t - (i ? tt : T0('R5'))) / 0.7); attr(k2.bar, 'width', (k2.d * RS * 2 * uu).toFixed(1)); vis(k2.l2, t, (i ? tt : T0('R5')) + 0.5, 1e9, { dy: 8 }); });
    vis($('#rrP'), t, wt('R5', 'distance') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'How') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Three') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const q = wTau(t), xx = 2 * q + 2 * q * q, vv = 2 + 4 * q, X = WX0 + xx * WPX;     // block front at X
    attr(wBl, 'x', (X - 80).toFixed(1)); attr(wBt, 'x', (X - 40).toFixed(1)); vis(wBl, t, T0('W2') + 0.4, 1e9, { dy: 0, fade: 0.12 }); vis(wBt, t, T0('W2') + 0.4, 1e9, { dy: 0, fade: 0.12 });
    const mvv = t > tWr && t < tWr + 1; wGh.forEach((gh, j) => { const qq = wTau(t - 0.08 * (j + 1)); attr(gh, 'x', (WX0 + (2 * qq + 2 * qq * qq) * WPX - 80).toFixed(1)); gh.style.opacity = mvv && qq < q - 0.01 ? [0.3, 0.2, 0.12][j] : 0; });
    const fa = M.o3((t - wt('W2', 'pushed') + 0.1) / 0.4), fb = M.o3((t - wt('W2', 'friction') + 0.1) / 0.4);
    wP.set(X - 80 - 12 * 7 * fa, WG - 40, X - 82, WG - 40); attr(wLp, 'x', (X - 80 - 42).toFixed(1)); attr(wLp, 'y', WG - 54); wLp.style.opacity = fa.toFixed(3);
    wFr.set(X - 40, WG - 4, X - 40 - 4 * 7 * fb, WG - 4);
    attr(wLf, 'y', WG + 70); attr(wLf, 'x', (X - 54).toFixed(1)); wLf.style.opacity = fb.toFixed(3);
    wV.set(X + 6, WG - 40, X + 6 + vv * 10, WG - 40); M.setT(wLv, `v = ${f1(vv)} m/s`); attr(wLv, 'x', (Math.min(X + 12, 560)).toFixed(1)); attr(wLv, 'y', WG - 90); wLv.style.opacity = M.io((t - T0('W2') - 0.5) / 0.3).toFixed(3);
    LED.forEach(([a, b], i) => { const tt = [wt('W3', 'twelve'), wt('W3', 'minus'), wt('W3', 'Net', 1)][i]; vis(a, t, tt - 0.1, 1e9, { dy: 8 }); vis(b, t, tt, 1e9, { dy: 8 }); });
    M.draw(wRule, t, wt('W3', 'Net', 1) - 0.2, 0.4);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'only') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'net') });
    TBr.forEach((b, i) => { const tt = [wt('X2', 'forty'), wt('X3', 'Friction'), wt('X3', 'Friction') + 0.8][i], u = M.o3((t - tt) / 0.5), h = Math.abs(b.v) * TS * u; attr(b.r, 'y', (b.v > 0 ? TB - h : TB).toFixed(1)); attr(b.r, 'height', h.toFixed(1)); vis(b.l, t, tt + 0.3, 1e9, { dy: 6 }); vis(b.n, t, tt, 1e9, { dy: 6 }); });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
