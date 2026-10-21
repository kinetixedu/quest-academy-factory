// PUC Physics Ep 56: Conservation of linear momentum (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#B8327E', PD = '#7E1F55', PL = '#D27BAE';            // momentum p = magenta (A darker, B lighter shade on the graph)
const FC = C.orange, VC = C.ac, MC = C.ink, CB = '#5B6B8C';        // force orange, v blue, mass ink, cart B slate
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const sub = (p, x, y, s, b, col, fs = 28, a = {}) => { const e = it(p, x, y, s, col, Object.assign({ 'font-size': fs }, a)); const ts = document.createElementNS(nsv, 'tspan'); ts.setAttribute('font-size', Math.round(fs * 0.62)); ts.setAttribute('dy', Math.round(fs * 0.22)); ts.textContent = b; e.appendChild(ts); return e; };
const attr = PUC.attr;
const lab = (p, x, y, pre, sb, post, col, fs = 22, a = {}) => { const e = txt(p, x, y, pre, Object.assign({ fill: col, 'font-weight': 700, 'font-size': fs }, a)); const t1 = document.createElementNS(nsv, 'tspan'); t1.setAttribute('font-size', Math.round(fs * 0.7)); t1.setAttribute('dy', Math.round(fs * 0.25)); t1.textContent = sb; e.appendChild(t1); const t2 = document.createElementNS(nsv, 'tspan'); t2.setAttribute('dy', -Math.round(fs * 0.25)); t2.textContent = post; e.appendChild(t2); e._post = t2; return e; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const pv = s => tc(PC, `\\vec{p}${s}`), Fv = s => tc(FC, `\\vec{F}_{${s}}`);
const f1 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(2);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
// a cart drawn at x = 0 inside group g (translate it): body w x 48, two wheels
const cartG = (p, w, col, label, ty) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: 0, y: ty - 68, width: w, height: 48, rx: 8, fill: col }); txt(g, w / 2, ty - 37, label, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); [w * 0.22, w * 0.78].forEach(x => mk(g, 'circle', { cx: x, cy: ty - 13, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 })); return { o, g }; };
const spring = (x0, x1, y, n = 5) => { const w = x1 - x0; if (w < 2) return ''; let d = `M${x0.toFixed(1)},${y}`; for (let i = 1; i <= n * 2; i++) d += ` L${(x0 + w * i / (n * 2 + 1)).toFixed(1)},${y + (i % 2 ? -10 : 10)}`; return d + ` L${x1.toFixed(1)},${y}`; };

Object.assign(M.IC, {
  disc: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  coin: ['M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gun: ['M3 8h15v4H9l-1 7H5l1-7H3z', 'M18 9h3'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10 12 17.5 15 10', 'M14 6h3l1 4'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  users2: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS9 = T0('S9'), tS11 = T0('S11'), tS12 = T0('S12'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['disc', 'Carrom striker', 'SLOWS DOWN', [[170, 1, ''], [60, 1, '']]], ['coin', 'Carrom coin', 'SHOOTS AWAY', [[110, 1, '']]], ['gun', 'Gun', 'KICKS BACK', [[80, -1, '']]]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'striker'), wt('H1', 'coin'), wt('H1', 'gun')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="250" height="80"></svg></div>`).join('');
const JA = JOBS.map(([, , , L], i) => { const s = $('#jsv' + i); return L.map(([len, dir, tag], k) => { const y = L.length > 1 ? 24 + k * 34 : 40, x0 = dir > 0 ? 40 : 230; const a = PUC.arrow(s, PC, 6, 16); const lb = it(s, dir > 0 ? 8 : 236, y + 9, 'p', PC, { 'font-size': 24 }); const tg = tag ? txt(s, 248, y + 6, tag, { 'text-anchor': 'end', 'font-size': 14 }) : null; return { a, lb, tg, len, dir, y, x0 }; }); });
const TILES = [[C.ac, 'Coasting at 5 m/s', 'bike'], [C.ink, 'Friend grabs on', 'users2'], [C.ink, 'New speed?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'coasts'), wt('H3', 'grabs'), wt('H4', 'predict')];

/* ---------- P: momentum + the system ---------- */
const QR = [['p', PC, 'Momentum', 'mass times velocity, a vector', 'kg m/s'], ['m', MC, 'Mass', 'how much matter', 'kg'], ['v', VC, 'Velocity', 'speed with a direction', 'm/s']];
$('#qrs').innerHTML = QR.map(([s, c, n, d, u], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 132}px"><div class="qs" style="color:${c}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div><div class="qu" style="color:${c}">${u}</div></div>`).join('') +
  `<div class="pillp" id="qrP" style="left:36px;top:490px">${K(`${pv('')} = ${tc(MC, 'm')}\\,${tc(VC, '\\vec{v}')}`)}<span>points along the velocity</span></div>`;
const tQr = [wt('P1', 'momentum'), wt('P1', 9), wt('P1', 10)];
const pm = $('#pmS'), PG = 330;
ground(pm, 40, 744, PG);
const sysB = mk(pm, 'rect', { x: 196, y: 196, width: 440, height: 168, rx: 18, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const sysL = txt(pm, 214, 186, 'SYSTEM', { fill: C.ac, 'font-weight': 600, 'font-size': 18, 'letter-spacing': 2 });
const pA0 = cartG(pm, 140, MC, 'A', PG), pB0 = cartG(pm, 100, CB, 'B', PG);
attr(pA0.g, 'transform', 'translate(250,0)'); attr(pB0.g, 'transform', 'translate(394,0)');
const pIn = [PUC.arrow(pm, FC, 6, 16), PUC.arrow(pm, FC, 6, 16)];
const pInL = txt(pm, 392, 236, 'internal', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
const pEx = PUC.arrow(pm, FC, 8, 20), pExL = txt(pm, 110, 252, 'external', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
const pHand = mk(pm, 'g', {}); pHand.innerHTML = `<g transform="translate(52,262)">${M.icon('hand', 40, C.ink2, 2.2)}</g>`;
$('#lawP').innerHTML = K(`\\sum ${tc(FC, '\\vec{F}_{\\text{ext}}')} = 0 \\;\\Rightarrow\\; ${pv('_{\\text{total}}')} = \\text{constant}`);
$('#lawP').style.cssText += ';background:var(--ac2);color:var(--ink);font-size:30px';

/* ---------- S: the two-cart sim ---------- */
const s = $('#simS'), TY = 404, PXM = 60, D = 0.1, RD = 1.5, PS = 12;            // 60 px per metre, contact lasts 0.1 s, runs last 1.5 s, 12 px per kg m/s
const WA = 120, WB = 80, mA = 3, mB = 1;
ground(s, 40, 744, TY);
for (let k = 0; k <= 11; k++) { const x = 40 + PXM * k; mk(s, 'line', { x1: x, y1: TY, x2: x, y2: TY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, TY + 36, k, { 'text-anchor': 'middle', 'font-size': 15 }); }
txt(s, 744, TY + 36, 'm', { 'text-anchor': 'end', 'font-size': 15 });
const RUNS = [{ xA: 40, xB: 294, uA: 4, uB: 0, vA: 3, vB: 3, th: 0.5, pad: 'stick', nat: 14 },
  { xA: 40, xB: 294, uA: 4, uB: 0, vA: 2, vB: 6, th: 0.5, pad: 'spring', nat: 14 },
  { xA: 200, xB: 334, uA: 0, uB: 0, vA: -1, vB: 3, th: 0, pad: 'spring', nat: 26 }];
const disp = (u, v, th, tau) => tau < th ? u * tau : tau < th + D ? u * th + u * (tau - th) + 0.5 * (v - u) / D * (tau - th) ** 2 : u * th + (u + v) / 2 * D + v * (tau - th - D);
const vel = (u, v, th, tau) => u + (v - u) * M.clamp((tau - th) / D);
const kin = (r, tau) => ({ XA: r.xA + PXM * disp(r.uA, r.vA, r.th, tau), XB: r.xB + PXM * disp(r.uB, r.vB, r.th, tau), vA: vel(r.uA, r.vA, r.th, tau), vB: vel(r.uB, r.vB, r.th, tau) });
const ghA = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 68, width: WA, height: 48, rx: 8, fill: MC, opacity: 0 }));
const ghB = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 68, width: WB, height: 48, rx: 8, fill: CB, opacity: 0 }));
const padR = mk(s, 'rect', { y: TY - 60, height: 32, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 });
const padS = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const cA = cartG(s, WA, MC, 'A·3 kg', TY), cB = cartG(s, WB, CB, 'B·1 kg', TY);
const aPA = PUC.arrow(s, PC, 6, 18), aPB = PUC.arrow(s, PC, 6, 18), aPT = PUC.arrow(s, PC, 9, 24);
const lPA = sub(s, 0, 0, 'p', 'A', PC, 26), lPB = sub(s, 0, 0, 'p', 'B', PC, 26);
const lPT = lab(s, 60, 190, 'p', 'total', '', PC, 24);
const aFA = PUC.arrow(s, FC, 7, 20), aFB = PUC.arrow(s, FC, 7, 20);
const lFA = sub(s, 0, 0, 'F', 'AB', FC, 28), lFB = sub(s, 0, 0, 'F', 'BA', FC, 28);
const eqT = txt(s, 392, TY + 72, 'same size, same time', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 20 });
const dPA = lab(s, 0, TY + 72, 'Δp', 'A', ' = -3', PC, 22, { 'text-anchor': 'end' }), dPB = lab(s, 0, TY + 72, 'Δp', 'B', ' = +3', PC, 22);
const leak = txt(s, 392, 534, 'nothing leaks out: the total stays 12', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
// timeline
const tHit1 = wt('S3', 'hit'), tL1 = tHit1 - 0.5;
const tFz = wt('S6', 'Freeze') + 0.15, TAU_FZ = 0.55, tRA = TAU_FZ - 0.25 * (tFz - tS6), tRes = T0('S8') + 0.1;
const tL2 = wt('S9', 'slows') - 0.55;
const tL3 = wt('S12', 'carries') - 0.5;
function state(t) {
  if (t >= tS12) return { r: 2, tau: M.clamp(t - tL3, 0, RD), pause: t < tL3 };
  if (t >= tS9) return { r: 1, tau: M.clamp(t - tL2, 0, RD), pause: t < tL2 };
  if (t >= tS6) {
    const tau = t < tFz ? tRA + 0.25 * (t - tS6) : t < tRes ? TAU_FZ : Math.min(RD, TAU_FZ + 0.25 * (t - tRes));
    return { r: 0, tau, replay: true, frozen: t >= tFz && t < tRes };
  }
  return { r: 0, tau: M.clamp(t - tL1, 0, RD), pause: t < tL1 };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r_vA" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r_vB" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${PC}">p<sub>A</sub></span><span class="v" id="r_pA" style="color:${PC}">0.0</span><span class="u">kg m/s</span>
  <span class="k" style="color:${PC}">p<sub>B</sub></span><span class="v" id="r_pB" style="color:${PC}">0.0</span><span class="u">kg m/s</span>
  <span class="k" style="color:${PC};font-weight:700">p<sub>tot</sub></span><span class="v" id="r_pT" style="color:${PC};font-weight:700">0.0</span><span class="u">kg m/s</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 70, w: 560, h: 150, xmax: 1.75, ymin: -4, ymax: 14, xt: [0, 0.5, 1, 1.5], yt: [-3, 0, 3, 6, 9, 12], xl: 't (s)', yl: 'p (kg m/s)' });
$('#leg').innerHTML = [[PD, '', 'p<sub>A</sub>'], [PL, '7 5', 'p<sub>B</sub>'], [PC, '', 'p<sub>total</sub>']].map(([c, da, n], i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${i === 2 ? 6 : 4}" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const gT = mk(gs, 'path', { d: '', fill: 'none', stroke: PC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 });
const gA = mk(gs, 'path', { d: '', fill: 'none', stroke: PD, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gB = mk(gs, 'path', { d: '', fill: 'none', stroke: PL, 'stroke-width': 4, 'stroke-dasharray': '7 5' });
const dT = g.dot(PC, 10), dA = g.dot(PD, 8), dB = g.dot(PL, 8);
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 90; for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const th2 = PUC.think($('#th2'), { q: 'Both carts start at rest, a squeezed spring between them. Let go. What is the total momentum now?', opts: ['More than zero', 'Zero'], right: 1, why: 'It was zero before, so it stays zero: -3 + 3 = 0.' });

/* ---------- D: the proof ---------- */
const STEPS = [[`${Fv('AB')}\\ \\text{on A},\\quad ${Fv('BA')}\\ \\text{on B}`, 'B pushes A, A pushes B'],
  [`${Fv('AB')} = -\\,${Fv('BA')}`, 'third law: same size, opposite way'],
  [`\\Delta${pv('_A')} = ${Fv('AB')}\\,\\Delta t,\\quad \\Delta${pv('_B')} = ${Fv('BA')}\\,\\Delta t`, 'force × time = change in momentum'],
  [`\\Delta${pv('_A')} + \\Delta${pv('_B')} = (${Fv('AB')} + ${Fv('BA')})\\,\\Delta t = 0`, 'the two forces cancel'],
  [`${pv('_A')} + ${pv('_B')} = \\text{constant}`, 'total after = total before']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), DG = 236;
ground(dS, 40, 744, DG);
const zA = cartG(dS, 200, MC, 'A', DG), zB = cartG(dS, 130, CB, 'B', DG);
attr(zA.g, 'transform', 'translate(176,0)'); attr(zB.g, 'transform', 'translate(380,0)');
const zFA = PUC.arrow(dS, FC, 8, 20), zFB = PUC.arrow(dS, FC, 8, 20);
const zlA = sub(dS, 236, 116, 'F', 'AB', FC, 30), zlB = sub(dS, 450, 116, 'F', 'BA', FC, 30);
const zEq = txt(dS, 392, 72, 'equal and opposite', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });
// mini F-t graph: two mirror areas over the same delta t
const fg = PUC.graph(dS, { x: 110, y: 300, w: 560, h: 200, xmax: 1, ymin: -1, ymax: 1, xl: 't', yl: 'F' });
const T1x = 0.35, T2x = 0.65, FH = 0.75;
const arB = mk(dS, 'path', { d: `M${fg.X(T1x)},${fg.Y(0)} V${fg.Y(FH)} H${fg.X(T2x)} V${fg.Y(0)} Z`, fill: M.mix(FC, '#FFFFFF', 0.72), stroke: FC, 'stroke-width': 3 });
const arA = mk(dS, 'path', { d: `M${fg.X(T1x)},${fg.Y(0)} V${fg.Y(-FH)} H${fg.X(T2x)} V${fg.Y(0)} Z`, fill: M.mix(FC, '#FFFFFF', 0.72), stroke: FC, 'stroke-width': 3 });
const arBl = sub(dS, fg.X(T2x) + 16, fg.Y(FH / 2) + 8, 'F', 'BA', FC, 24), arAl = sub(dS, fg.X(T2x) + 16, fg.Y(-FH / 2) + 8, 'F', 'AB', FC, 24);
const dtB = mk(dS, 'path', { d: `M${fg.X(T1x)},${fg.Y(0) + 4} v10 H${fg.X(T2x)} v-10`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const dtL = txt(dS, (fg.X(T1x) + fg.X(T2x)) / 2 - 64, fg.Y(-1) + 36, 'same Δt', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
const apB = lab(dS, fg.X(0.04), fg.Y(FH / 2) + 6, 'area = Δp', 'B', '', PC, 20), apA = lab(dS, fg.X(0.04), fg.Y(-FH / 2) + 6, 'area = Δp', 'A', '', PC, 20);
const sum0 = txt(dS, fg.X(0.83), fg.Y(0) + 8, 'sum = 0', { fill: PC, 'font-weight': 700, 'font-size': 22 });
$('#stF').innerHTML = K(`${pv('_A')} + ${pv('_B')} = ${pv("_A\\,'")} + ${pv("_B\\,'")}`);

/* ---------- R: the gun ---------- */
const LK = [[`Before firing: at rest, total ${K(pv('') + '= 0')}`], ['Gas forces are internal: the total stays 0'], [`Bullet: ${K(pv(''))} forward`], [`Gun: the same ${K(pv(''))} backward = recoil`]];
$('#lks').innerHTML = LK.map(([h], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>${i < 3 ? `<svg class="lkA" id="lkA${i}" style="top:${84 + i * 100 + 84}px" width="16" height="16"><path d="M8 1 V12 M3 8 L8 14 L13 8" fill="none" stroke="${C.ac}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}`).join('') +
  `<div class="pillp ink" id="lkP" style="left:36px;top:494px"><span class="mono">0.01 kg × 400 m/s = 4 = 4 kg × 1 m/s</span></div>`;
const tLk = [T0('R2'), T0('R3'), T0('R4'), wt('R4', 'gun')];
const rr = $('#rrS'), RG = 300;
const gunO = mk(rr, 'g', {}), gun = mk(gunO, 'g', {});
mk(gun, 'path', { d: `M250,${RG - 30} H470 V${RG + 10} H330 L318,${RG + 70} H282 L292,${RG + 10} H250 Z`, fill: '#3A4560', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(gun, 'rect', { x: 470, y: RG - 24, width: 150, height: 20, fill: '#3A4560', stroke: C.ink, 'stroke-width': 3 });
txt(gun, 360, RG - 3, '4 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
const bulO = mk(rr, 'g', {}), bul = mk(bulO, 'g', {});
mk(bul, 'path', { d: `M600,${RG - 20} H618 Q630,${RG - 14} 618,${RG - 8} H600 Z`, fill: '#B7791F', stroke: C.ink, 'stroke-width': 2 });
const rGa = PUC.arrow(rr, FC, 6, 16), rGb = PUC.arrow(rr, FC, 6, 16);
const rGl = txt(rr, 392, RG - 70, 'gas forces · internal', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
const rPb = PUC.arrow(rr, PC, 8, 22), rPg = PUC.arrow(rr, PC, 8, 22);
const rPbl = txt(rr, 660, RG + 104, 'bullet: +4', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 22 }), rPgl = txt(rr, 230, RG + 104, 'gun: -4', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 22 });
const rTot = txt(rr, 392, 500, 'total: -4 + 4 = 0', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 26 });
const rT0 = txt(rr, 392, 150, 'total p = 0', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 24 });
const ghG = [0, 1, 2].map(k => { const e = gun.cloneNode(true); e.setAttribute('opacity', 0); gunO.insertBefore(e, gun); return e; });
const tFire = wt('R3', 'push') - 0.1;
const avD = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the kick is the bullet\'s momentum, balanced.' });

/* ---------- K: side by side ---------- */
const KS = [$('#kiS'), $('#keS')].map((sv, c) => {
  const y = 330; ground(sv, 40, 744, y);
  const a = cartG(sv, 120, MC, 'A', y), b = cartG(sv, 80, CB, 'B', y);
  const pa = PUC.arrow(sv, PC, 6, 16), pb = PUC.arrow(sv, PC, 6, 16), pt = PUC.arrow(sv, PC, 9, 22);
  const lt = txt(sv, 60, 150, '', { fill: PC, 'font-weight': 700, 'font-size': 24 });
  const f1a = PUC.arrow(sv, FC, 6, 16), f1b = PUC.arrow(sv, FC, 6, 16);
  const fl = txt(sv, 392, 222, c ? 'external push' : 'internal pushes', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
  return { a, b, pa, pb, pt, lt, f1a, f1b, fl, y };
});
const tKa = wt('K1', 'push'), tKb = wt('K2', 'pushes');
$('#kiP').innerHTML = `${K(`${tc(FC, '\\vec{F}_{\\text{ext}}')} = 0`)}<span style="font:500 22px Poppins;color:var(--mute)">total stays the same</span>`;
$('#keP').innerHTML = `${K(`${tc(FC, '\\vec{F}_{\\text{ext}}')} \\neq 0`)}<span style="font:500 22px Poppins;color:var(--mute)">total changes</span>`;
const th1 = PUC.think($('#th1'), { q: 'A ball falls freely toward the ground. Is the ball\'s momentum conserved?', opts: ['Conserved', 'Not conserved'], right: 1, why: 'Gravity is an outside force on it. Ball + Earth: conserved.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `Aarav and his bike: <b>${K('80\\ \\text{kg}')}</b>, coasting at ${K(tc(VC, '5\\ \\text{m/s}'))}. His friend on a skateboard: <b>${K('45\\ \\text{kg}')}</b>, at rest. He grabs on and they move together. Find their speed.`;
const pp = s0 => tc(PC, `p_{\\text{${s0}}}`), vv = tc(VC, 'v');
const wsol = PUC.solution($('#wl'), [
  [K(`${pp('before')} = 80 \\times 5 + 45 \\times 0 = ${tc(PC, '400')}`)],
  [K(`${pp('after')} = (80 + 45)\\,${vv} = 125\\,${vv}`)],
  [K(`125\\,${vv} = 400`)],
  [K(`${vv} = 400/125 = ${tc(VC, '3.2\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 82 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = 400;
ground(w, 40, 744, WG);
const bikeO = mk(w, 'g', {}), bike = mk(bikeO, 'g', {});
const BK = { r: [330, WG - 52], f: [550, WG - 52] }, R0 = 52;
[BK.r, BK.f].forEach(([x, y]) => { mk(bike, 'circle', { cx: x, cy: y, r: R0, fill: 'none', stroke: C.ink, 'stroke-width': 5 }); mk(bike, 'circle', { cx: x, cy: y, r: 6, fill: C.ink }); });
const SEAT = [400, WG - 160], HEAD = [520, WG - 170], CRK = [425, WG - 52];
mk(bike, 'path', { d: `M${BK.r[0]},${BK.r[1]} L${SEAT[0]},${SEAT[1]} L${CRK[0]},${CRK[1]} Z M${SEAT[0]},${SEAT[1]} L${HEAD[0]},${HEAD[1]} L${CRK[0]},${CRK[1]} M${HEAD[0]},${HEAD[1]} L${BK.f[0]},${BK.f[1]} M${HEAD[0]},${HEAD[1]} l-8,-26 h34 M${SEAT[0] - 24},${SEAT[1] - 12} h44 M${SEAT[0]},${SEAT[1]} l-2,-12`, stroke: VC, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
mk(bike, 'circle', { cx: CRK[0], cy: CRK[1], r: 14, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
txt(bike, 440, WG - 214, '80 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 24 });
const frO = mk(w, 'g', {}), fr = mk(frO, 'g', {});
mk(fr, 'rect', { x: 0, y: WG - 120, width: 92, height: 76, rx: 8, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
txt(fr, 46, WG - 76, '45 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
mk(fr, 'rect', { x: -10, y: WG - 44, width: 112, height: 12, rx: 6, fill: C.ink });
[10, 82].forEach(x => mk(fr, 'circle', { cx: x, cy: WG - 18, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
const arm = mk(w, 'line', { x1: 240, y1: WG - 110, x2: 300, y2: WG - 110, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wP = PUC.arrow(w, PC, 9, 24), wPl = txt(w, 0, 128, '', { fill: PC, 'font-weight': 700, 'font-size': 24 });
const wV = txt(w, 36, 86, '', { fill: VC, 'font-weight': 700, 'font-size': 24 });
const wTag = txt(w, 392, WG + 70, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const avA = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my momentum was shared, not lost!' });
const tW = [wt('W3', 'Before'), wt('W4', 'After'), wt('W5', 'Momentum'), wt('W6', 'v')];
const tGrab = wt('W2', 'grabs');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'p after = 3 + 3 = 6 kg m/s', right: 'p after = (-3) + (+3) = 0 kg m/s' });
const tp = $('#tpS'), TG = 200;
ground(tp, 30, 530, TG);
const xa = cartG(tp, 96, MC, '3 kg', TG), xb = cartG(tp, 64, CB, '1 kg', TG);
attr(xa.g, 'transform', 'translate(150,0)'); attr(xb.g, 'transform', 'translate(290,0)');
const xPa = PUC.arrow(tp, PC, 7, 18), xPb = PUC.arrow(tp, PC, 7, 18);
const xla = txt(tp, 140, TG - 112, '-3', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 24 }), xlb = txt(tp, 380, TG - 112, '+3', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 24 });
const xS = txt(tp, 280, TG + 52, 'sum = 0', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 24 });
const where = PUC.where($('#wa'), { on: [], type: 'Recoil, explosion and collision numericals, often in two directions' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ${K('6\\ \\text{kg}')} shell moves at ${K('10\\hat{i}\\ \\text{m/s}')}. It bursts into two pieces. The ${K('2\\ \\text{kg}')} piece flies off at ${K('30\\hat{j}\\ \\text{m/s}')}. What is the speed of the other piece?`,
  opts: ['15 m/s', '15√2 m/s', '20 m/s', '30 m/s'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${pv('')} = 6 \\times 10\\hat{i} = 60\\hat{i}`)], [K(`${pv('_1')} = 2 \\times 30\\hat{j} = 60\\hat{j}`)], [K(`${pv('_2')} = 60\\hat{i} - 60\\hat{j}`)], [K(`${tc(VC, '\\vec{v}_2')} = 60/4\\,(\\hat{i} - \\hat{j})`)], [K(`|${tc(VC, '\\vec{v}_2')}| = ${tc(C.ok, '15\\sqrt{2}')} \\approx 21\\ \\text{m/s}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'total'), wt('A3', 'small'), wt('A3', 'four'), T0('A4'), wt('A4', 'speed')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · conservation of momentum', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${pv('')} = m\\,${tc(VC, '\\vec{v}')} \\qquad ${pv('_A')} + ${pv('_B')} = ${pv("_A\\,'")} + ${pv("_B\\,'")}`),
    `<b>Law</b>: no net external force, so the total <span class="pm"><i>p</i></span> stays constant`,
    `Internal forces: <span class="fo"><i>F</i><sub>AB</sub> = -<i>F</i><sub>BA</sub></span> for the same Δt, so they cancel`,
    `Add as vectors: left is negative · recoil: gun + bullet total = 0`] });
const YQ = ['Aarav\'s friend grabs his bike. Why do they both slow down?', 'Why can forces inside a crash never change the total momentum?', 'Why does a gun kick back when it fires?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 57', topic: 'Four forces on one block. Can you find them all? Free-Body Diagrams', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS9 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); JA[i].forEach((q, k) => { const u = M.o3((t - tMorph - 0.8 - i * 0.35 - k * 0.3) / 0.5); q.a.set(q.x0, q.y, q.x0 + q.dir * q.len * u, q.y); q.lb.style.opacity = u.toFixed(3); if (q.tg) q.tg.style.opacity = u.toFixed(3); }); });
    vis($('#hjP'), t, wt('H2', 'passes') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, i === 0 ? M.io((t - T0('P2')) / 0.3) : 0); });
    vis($('#qrP'), t, wt('P2', 'along') - 0.1, 1e9, POP);
    vis($('#pm'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(sysB, t, wt('P3', 'system') - 0.1, 0.7); vis(sysL, t, wt('P3', 'system') + 0.3, 1e9, { dy: 6 });
    vis(pA0.o, t, wt('P3', 'two') - 0.1, 1e9, { dy: -20 }); vis(pB0.o, t, wt('P3', 'carts') - 0.1, 1e9, { dy: -20 });
    const ui = M.o3((t - wt('P3', 'internal') + 0.1) / 0.5), ue = M.o3((t - wt('P3', 'external') + 0.1) / 0.5);
    pIn[0].set(390, 276, 390 - 60 * ui, 276); pIn[1].set(394, 276, 394 + 60 * ui, 276); pInL.style.opacity = ui.toFixed(3);
    pEx.set(108, 288, 108 + 136 * ue, 288); pExL.style.opacity = ue.toFixed(3); pHand.style.opacity = ue.toFixed(3);
    vis($('#lawP'), t, wt('P5', 'law') - 0.1, 1e9, POP);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S11'), simIn2 = OUT('S12') + 0.25;
    const back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), r = RUNS[S.r], k = kin(r, S.tau);
    attr(cA.g, 'transform', `translate(${k.XA.toFixed(1)},0)`); attr(cB.g, 'transform', `translate(${k.XB.toFixed(1)},0)`);
    vis(cA.o, t, tS1 + 0.5, 1e9, { dx: -30, dy: 0 }); vis(cB.o, t, wt('S1', 'B') - 0.1, 1e9, { dx: 30, dy: 0 });
    // bumper on B: sticky pad (run 1), spring (runs 2 and 3)
    const fA = k.XA + WA, gap = k.XB - fA, pw = Math.max(0, Math.min(r.nat, gap));
    const padOn = t >= wt('S1', 'B') - 0.1;
    if (r.pad === 'stick') { attr(padR, 'x', (k.XB - pw).toFixed(1)); attr(padR, 'width', pw.toFixed(1)); M.hide(padR, !padOn || pw < 1); attr(padS, 'd', ''); }
    else { M.hide(padR, true); attr(padS, 'd', spring(k.XB - pw, k.XB, TY - 44, 4)); }
    // ghosts (in sim time)
    const moving = !S.pause && !S.frozen && S.tau > 0.02 && S.tau < RD;
    const gstep = S.replay ? 0.03 : 0.07;
    [[ghA, 'XA'], [ghB, 'XB']].forEach(([gh, key]) => gh.forEach((e, j) => { const q = kin(r, Math.max(0, S.tau - gstep * (j + 1))); attr(e, 'x', q[key].toFixed(1)); e.style.opacity = moving && Math.abs(q[key] - k[key]) > 4 ? [0.3, 0.2, 0.12][j] : 0; }));
    // momentum arrows grow from the carts; total arrow on top
    const pA = mA * k.vA, pB = mB * k.vB, pT = pA + pB, ay = TY - 92;
    const cxA = k.XA + WA / 2, cxB = k.XB + WB / 2;
    aPA.set(cxA, ay, cxA + PS * pA, ay); aPB.set(cxB, ay - 34, cxB + PS * pB, ay - 34);
    const dimP = S.r === 0 && S.replay ? 1 - M.io((t - wt('S7', 'pushes') + 0.1) / 0.3) * (1 - M.io((t - wt('S8', 'loses') + 0.1) / 0.3)) : 1;
    [aPA.g, aPB.g].forEach(e => e.style.opacity = dimP.toFixed(3));
    attr(lPA, 'x', (cxA + PS * pA + (pA >= 0 ? 8 : -40)).toFixed(1)); attr(lPA, 'y', ay + 9); lPA.style.opacity = (Math.abs(pA) > 0.6 ? dimP : 0).toFixed(3);
    attr(lPB, 'x', (cxB + PS * pB + (pB >= 0 ? 8 : -40)).toFixed(1)); attr(lPB, 'y', ay - 25); lPB.style.opacity = (Math.abs(pB) > 0.6 ? dimP : 0).toFixed(3);
    aPT.set(60, 214, 60 + PS * pT, 214);
    M.setT(lPT._post, ' = ' + f1(pT) + ' kg m/s'); vis(lPT, t, wt('S2', 'total') - 0.1, 1e9, { dy: 6 });
    M.hide(aPT.g, t < wt('S2', 'total') - 0.1 || Math.abs(pT) < 0.1);
    // labels and tags
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    if (t >= tS9) vis($('#rdy'), t, tS9 + 0.1, tL2 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    if (t >= tS12) vis($('#rdy'), t, simIn2 + 0.3, tL3 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS6 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tS9 - 0.1, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // forces in the frozen crash: grow from the contact point
    const uf = S.r === 0 && S.replay ? M.o3((t - wt('S7', 'pushes') + 0.1) / 0.5) * (1 - M.io((t - tS9 + 0.4) / 0.3)) : 0, ub = S.r === 0 && S.replay ? M.o3((t - wt('S7', 'pushes', 1) + 0.1) / 0.5) * (1 - M.io((t - tS9 + 0.4) / 0.3)) : 0;
    const inC = S.tau > r.th - 0.001 && S.tau < r.th + D + 0.001, fy = TY - 88;
    aFA.set(fA, fy, fA - 110 * uf * (inC ? 1 : 0), fy); attr(lFA, 'x', (fA - 90).toFixed(1)); attr(lFA, 'y', fy - 40); lFA.style.opacity = (uf * (inC ? 1 : 0)).toFixed(3);
    aFB.set(fA + 4, fy, fA + 4 + 110 * ub * (inC ? 1 : 0), fy + 2); attr(lFB, 'x', (fA + 60).toFixed(1)); attr(lFB, 'y', fy - 40); lFB.style.opacity = (ub * (inC ? 1 : 0)).toFixed(3);
    vis(eqT, t, wt('S7', 'Equal') - 0.1, tRes, { dy: 6 });
    attr(dPA, 'x', (cxA + 6).toFixed(1)); attr(dPB, 'x', (cxB - 6).toFixed(1));
    vis(dPA, t, wt('S8', 'loses') - 0.1, tS9 - 0.2, { dy: 6 }); vis(dPB, t, wt('S8', 'gains') - 0.1, tS9 - 0.2, { dy: 6 });
    vis(leak, t, wt('S8', 'Nothing') - 0.1, tS9 - 0.2, { dy: 6 });
    { const e = $('#simEq'), aft = S.tau >= r.th + D, va = aft ? r.vA : r.uA, vb = aft ? r.vB : r.uB, kk = S.r + '|' + aft;
      if (e._k !== kk) { e._k = kk; const sg = v => v < 0 ? `(${v})` : v; e.innerHTML = `<span class="pm"><i>p</i></span> = 3 × <span class="vb">${sg(va)}</span> + 1 × <span class="vb">${sg(vb)}</span> = <span class="pm">${3 * va + vb}</span><span style="font-size:20px;color:var(--mute)">${aft ? 'after' : 'before'}</span>`; }
      vis(e, t, wt('S2', 'A') - 0.1, 1e9, POP); }
    // readout: round t first, then compute every value from it
    const tr = Math.round(S.tau * 100) / 100, kr = kin(r, tr);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_vA'), f2(kr.vA)); M.setT($('#r_vB'), f2(kr.vB));
    M.setT($('#r_pA'), f1(mA * kr.vA)); M.setT($('#r_pB'), f1(mB * kr.vB)); M.setT($('#r_pT'), f1(mA * kr.vA + mB * kr.vB));
    // graph: p(A), p(B) and the flat total, drawn up to the sim time, dots linked to the carts
    plot(gA, x => mA * vel(r.uA, r.vA, r.th, x), S.tau); plot(gB, x => mB * vel(r.uB, r.vB, r.th, x), S.tau); plot(gT, x => mA * vel(r.uA, r.vA, r.th, x) + mB * vel(r.uB, r.vB, r.th, x), S.tau);
    const dOn = t >= wt('S2', 'A') - 0.1;
    dA(S.tau, pA, dOn); dB(S.tau, pB, dOn); dT(S.tau, pT, dOn);
    vis($('#leg'), t, T0('S5') - 0.1, 1e9, { dy: 6 });
    vis($('#th2'), t, tS11 + 0.05, OUT('S12'), { dy: 36, ...o });
    th2(t, { tin: tS11, tOpts: wt('S11', 'What') - 0.1, tCount: T1('S11') + 0.05, dur: 3, tAns: T0('S12') - 0.02, tWhy: wt('S12', 'It') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    vis(zA.o, t, tD1 + 0.6, 1e9, { dy: -20 }); vis(zB.o, t, tD1 + 0.7, 1e9, { dy: -20 });
    const u1 = M.o3((t - wt('D2', 'pushes') + 0.1) / 0.5), u2 = M.o3((t - wt('D2', 'pushes', 1) + 0.1) / 0.5);
    zFA.set(374, 150, 374 - 120 * u1, 150); zlA.style.opacity = u1.toFixed(3);
    zFB.set(382, 150, 382 + 120 * u2, 150); zlB.style.opacity = u2.toFixed(3);
    vis(zEq, t, wt('D3', 'equals') - 0.1, 1e9, { dy: 6 });
    vis(fg.axes, t, wt('D4', 'same') - 0.4, 1e9, { dy: 0 }); [fg.zero, fg.xlab, fg.ylab].forEach(e => e && vis(e, t, wt('D4', 'same') - 0.4, 1e9, { dy: 0 }));
    vis(arB, t, wt('D4', 'same') - 0.1, 1e9, { dy: 0 }); vis(arA, t, wt('D4', 'same'), 1e9, { dy: 0 }); vis(arBl, t, wt('D4', 'same'), 1e9, { dy: 0 }); vis(arAl, t, wt('D4', 'same') + 0.1, 1e9, { dy: 0 });
    M.draw(dtB, t, wt('D4', 'delta') - 0.1, 0.4); vis(dtL, t, wt('D4', 'delta'), 1e9, { dy: 6 });
    vis(apB, t, wt('D4', 'change') - 0.1, 1e9, { dx: -10, dy: 0 }); vis(apA, t, wt('D4', 'change') + 0.1, 1e9, { dx: -10, dy: 0 });
    vis(sum0, t, wt('D5', 'cancel') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'change') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'momentum') - 0.1, 0.8);
  }

  /* R: the gun, link by link */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (i < 3 ? 1 - M.io((t - tLk[i + 1]) / 0.3) : 1)); if (i < 3) vis($('#lkA' + i), t, tLk[i + 1] - 0.2, 1e9, { dy: -6 }); });
    vis($('#lkP'), t, T0('R5') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    vis(gunO, t, tR1 + 0.7, 1e9, { dy: 16 }); vis(bulO, t, tR1 + 0.8, 1e9, { dy: 0 });
    vis(rT0, t, wt('R2', 'Total') - 0.1, 1e9, { dy: 6 });
    // gas forces: one on the bullet (forward), one on the gun (back), both inside the system
    const ug = M.o3((t - tFire) / 0.4) * (1 - M.io((t - wt('R4', 'bullet') + 0.1) / 0.3));
    rGa.set(626, RG - 44, 626 + 70 * ug, RG - 44); rGb.set(454, RG - 44, 454 - 70 * ug, RG - 44); rGl.style.opacity = ug.toFixed(3);
    // after the shot: bullet gone in a flash, gun drifts back at 1 m/s (shown 30 px per second)
    const tShot = wt('R4', 'bullet') - 0.1, ts = Math.max(0, t - tShot);
    const gx = -30 * ts; attr(gun, 'transform', `translate(${gx.toFixed(1)},0)`);
    ghG.forEach((e, j) => { attr(e, 'transform', `translate(${(gx + 14 * (j + 1)).toFixed(1)},0)`); e.setAttribute('opacity', ts > 0.5 && ts < 9 ? [0.3, 0.2, 0.12][j] : 0); });
    attr(bul, 'transform', `translate(${Math.min(400, 12000 * ts).toFixed(1)},0)`); M.hide(bul, ts > 0.04);
    const up = M.o3((t - tShot) / 0.5), ug2 = M.o3((t - wt('R4', 'gun') + 0.1) / 0.5);
    rPb.set(600, RG + 70, 600 + 120 * up, RG + 70); rPbl.style.opacity = up.toFixed(3);
    rPg.set(300 + gx, RG + 70, 300 + gx - 120 * ug2, RG + 70); attr(rPgl, 'x', (230 + gx).toFixed(1)); rPgl.style.opacity = ug2.toFixed(3);
    vis(rTot, t, wt('R4', 'amount') - 0.1, 1e9, POP);
    avD(t, wt('R5', 'recoil') + 0.3, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#ki'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    vis($('#ke'), t, T0('K2') - 0.3, out, { dx: 60, dy: 0, ...o });
    KS.forEach((q, c) => {
      const t0 = c ? tKb : tKa, tau = M.clamp(t - t0, 0, 3), y = q.y;
      let xa, xb, pa, pb;
      if (!c) { const tt = Math.max(0, tau - 0.1); xa = 230 - 60 * (tau < 0.1 ? 0.5 * tau * tau / 0.1 : 0.05 + tt); xb = 350 + 60 * 3 * (tau < 0.1 ? 0.5 * tau * tau / 0.1 : 0.05 + tt); xb = Math.min(xb, 640); pa = -3 * M.clamp(tau / 0.1); pb = 3 * M.clamp(tau / 0.1); }
      else { xa = 120 + 0.5 * 30 * tau * tau; xb = xa + 120; pa = 3 * tau; pb = 1 * tau; }
      attr(q.a.g, 'transform', `translate(${xa.toFixed(1)},0)`); attr(q.b.g, 'transform', `translate(${xb.toFixed(1)},0)`);
      vis(q.a.o, t, c ? T0('K2') : tK1 + 0.4, 1e9, { dy: -16 }); vis(q.b.o, t, c ? T0('K2') + 0.1 : tK1 + 0.5, 1e9, { dy: -16 });
      const on = t >= t0 - 0.1, ay = y - 92;
      q.pa.set(xa + 60, ay, xa + 60 + 14 * pa, ay); q.pb.set(xb + 40, ay - 30, xb + 40 + 14 * pb, ay - 30); M.hide(q.pa.g, !on); M.hide(q.pb.g, !on);
      const pt = pa + pb; q.pt.set(60, 172, 60 + 14 * pt, 172); M.hide(q.pt.g, !on);
      M.setT(q.lt, c ? 'total p grows' : 'total p = 0, always'); vis(q.lt, t, t0 - 0.2, 1e9, { dy: 6 });
      const uf = M.o3((t - t0 + 0.2) / 0.4);
      if (!c) { const v = uf * (1 - M.io((tau - 0.4) / 0.3)); q.f1a.set(350 - 2, y - 44, 350 - 2 - 50 * v, y - 44); q.f1b.set(350 + 2, y - 44, 350 + 2 + 50 * v, y - 44); q.fl.style.opacity = v.toFixed(3); }
      else { q.f1a.set(xa - 110 * uf, y - 44, xa - 4, y - 44); M.hide(q.f1b.g, true); q.fl.style.opacity = uf.toFixed(3); attr(q.fl, 'x', (xa - 60).toFixed(1)); }
    });
    vis($('#kiP'), t, wt('K1', 'total') - 0.1, 1e9, POP); vis($('#keP'), t, wt('K2', 'grows') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Gravity') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(bikeO, t, T0('W2') + 0.4, 1e9, { dy: 16 });
    // friend rolls up to the carrier at the grab; then one body
    const ug = M.io((t - tGrab + 0.3) / 0.6), fx = M.lerp(70, 172, ug);
    attr(fr, 'transform', `translate(${fx.toFixed(1)},0)`); vis(frO, t, wt('W2', 'friend') - 0.1, 1e9, { dx: -20, dy: 0 });
    attr(arm, 'x1', (fx + 92).toFixed(1)); attr(arm, 'x2', 300); arm.style.opacity = ug > 0.95 ? 1 : 0;
    // one momentum arrow, the same length before and after (0.4 px per kg m/s)
    const up = M.o3((t - tW[0] - 0.3) / 0.5);
    wP.set(200, 128, 200 + 160 * up, 128); attr(wPl, 'x', 200 + 160 * up + 14); attr(wPl, 'y', 136); M.setT(wPl, 'p = 400 kg m/s'); wPl.style.opacity = up.toFixed(3);
    const aft = t > tW[3] + 0.2; M.setT(wV, aft ? 'v = 3.2 m/s (together)' : 'v = 5 m/s (bike)'); vis(wV, t, wt('W2', 'five') - 0.1, 1e9, { dy: 8 });
    M.setT(wTag, t > tW[1] ? 'after: 125 kg, same p' : 'before: 80 kg × 5 m/s'); vis(wTag, t, tW[0], 1e9, { dy: 8 });
    avA(t, wt('W6', 'shared') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'three') - 0.2, tStrike: wt('X3', 'vector') - 0.1, tRight: wt('X3', 'Minus') - 0.1 });
    const u1 = M.o3((t - wt('X2', 'three') + 0.1) / 0.5), u3 = M.o3((t - wt('X3', 'negative') + 0.1) / 0.5);
    xPa.set(198, TG - 88, 198 - 72 * u1, TG - 88); xPb.set(322, TG - 88, 322 + 72 * u1, TG - 88); xla.style.opacity = xlb.style.opacity = u1.toFixed(3);
    xS.style.opacity = u3.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'recoil') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
