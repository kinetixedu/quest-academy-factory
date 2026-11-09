// PUC Physics Ep 86: Collisions, elastic and inelastic (Motion notebook, two carts with three kinds of bumper + total K against time, carrom striker vs clay)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, FC = C.orange, KC = C.teal, PC = '#A23B72';     // v blue, force orange, kinetic energy teal, momentum plum
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
const op = (el, v) => { el.style.opacity = M.clamp(v).toFixed(3); };
const ball = (p, r, col) => mk(p, 'circle', { r, fill: col, cx: -99, cy: -99 });
const bAt = (el, x, y) => { attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1)); };
const CLAY = '#A0806A', COIN = '#8D99AE';

Object.assign(M.IC, {
  bat: ['M4 20l9-9', 'M13 11l5-5 2 2-5 5Z', 'M18 18a2 2 0 1 0 0-.01'],
  marble: ['M8 12a4 4 0 1 0 0-.01', 'M16 12a4 4 0 1 0 0-.01'],
  clay: ['M4 4v16', 'M10 12c0-2.5 2-4.5 5-4.5s4 2 4 4.5-2 4.5-4 4.5c-3 0-5-2-5-4.5Z'],
  bounce: ['M3 12h7', 'm7 9-3 3 3 3', 'M21 12h-7', 'm17 9 3 3-3 3'],
  stick: ['M4 12h8', 'm9 9 3 3-3 3', 'M14 8v8', 'M18 8v8'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tK1 = T0('K1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + hook ---------- */
const JOBS = [['bat', 'Bat and ball', 'BOUNCE APART', 'bat'], ['marble', 'Two marbles', 'CLICK', 'marbles'], ['clay', 'Wet clay', 'STICKS TO THE WALL', 'clay']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="color:${i < 2 ? C.ok : C.red}">${i < 2 ? 'bounce' : 'stick'}</div></div>`).join('');
const tJt = [wt('H2', 'bounce'), wt('H2', 'bounce') + 0.15, wt('H2', 'stick')];
const TILES = [['bounce', 'Striker: both fly apart', C.ok], ['stick', 'Clay: just sticks', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'both'), wt('H4', 'sticks')];
const cr = $('#crS'); mk(cr, 'rect', { x: 20, y: 40, width: 260, height: 196, rx: 8, fill: '#F2E3C6', stroke: '#B08B57', 'stroke-width': 6 });
const crS = ball(cr, 14, C.ink), crC = ball(cr, 9, COIN), crK = ball(cr, 9, CLAY), crC2 = ball(cr, 9, COIN);
// striker 3 units at 4 -> 2, coin 1 unit 0 -> 6 (elastic); clay 1 unit at 4 sticks to coin 1 unit -> 2 each (px per s in the mini board)
const crRun = (t, t0, x0, xc, u, a1, b1, stickR) => { const tc = t0 + (xc - x0) / u; if (t < t0) return [x0, xc]; if (t < tc) return [x0 + u * (t - t0), xc]; return [xc + a1 * (t - tc) - stickR, xc + b1 * (t - tc)]; };

/* ---------- P ---------- */
const pa = $('#paS'), PY = 250;
mk(pa, 'line', { x1: 40, y1: PY + 40, x2: 744, y2: PY + 40, stroke: C.ink, 'stroke-width': 3 });
const paA = ball(pa, 38, C.ink), paB = ball(pa, 26, COIN), paFa = PUC.arrow(pa, FC, 7, 19), paFb = PUC.arrow(pa, FC, 7, 19);
const paFl = txt(pa, 392, PY - 90, 'equal and opposite pushes', { 'font-size': 20, fill: FC, 'font-weight': 600, 'text-anchor': 'middle' });
const paPl = txt(pa, 392, PY + 110, '', { 'font-size': 26, fill: PC, 'font-weight': 600, 'text-anchor': 'middle' });
const tPa = wt('P2', 'push') - 0.4, paX = t => { const r = Math.max(0, (t - tPa) / 2) % 3, xc = 392; if (r < 0.6) return [xc - 64 - 160 * (0.6 - Math.max(0, r)), xc]; return [xc - 64 + 40 * (r - 0.6), xc + 120 * (r - 0.6)]; };   // 3 : 1 masses, p kept
const CR = [['Elastic', 'BOUNCE · SPRINGY', 'p kept', 'K kept', C.ok], ['Inelastic', 'SOME K LOST', 'p kept', 'K lost', C.red], ['Perfectly inelastic', 'THEY STICK', 'p kept', 'most K lost', C.red]];
$('#crs').innerHTML = CR.map(([n, s2, a, b, c], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 136}px"><div class="cn">${n}</div><div class="cs">${s2}</div><div class="c1 pp" style="left:360px">${a}</div><div class="c2" style="left:500px;color:${c}">${b}</div></div>`).join('');
const tCr = [wt('P5', 'elastic'), wt('P6', 'inelastic'), wt('P6', 'perfectly')];

/* ---------- S: the cart sim ---------- */
const MA = 3, MB = 1, UA = 4, FIN = [[2, 6], [2.5, 4.5], [3, 3]], RC = 0.5, TAU = 0.12, PXM = 30, BR0 = 400, BUMP = 24, AW = 120, BW = 70, TY = 330;
const vel = (k, r) => { const [fa, fb] = FIN[k]; if (r < RC) return [UA, 0]; if (r < RC + TAU / 2) { const u = (r - RC) / (TAU / 2); return [UA + (3 - UA) * u, 3 * u]; }
  if (r < RC + TAU) { const u = (r - RC - TAU / 2) / (TAU / 2); return [3 + (fa - 3) * u, 3 + (fb - 3) * u]; } return [fa, fb]; };
const DT = 0.0005, RMAX = 4;
const TABS = FIN.map((_, k) => { const xa = [], xb = []; let a = BR0 - UA * RC * PXM, b = BR0; for (let r = 0; r <= RMAX + DT; r += DT) { xa.push(a); xb.push(b); const v = vel(k, r); a += v[0] * PXM * DT; b += v[1] * PXM * DT; } return { xa, xb }; });
const posR = (k, r) => { const i = M.clamp(Math.round(r / DT), 0, TABS[k].xa.length - 1); return [TABS[k].xa[i], TABS[k].xb[i]]; };
const S = $('#simS');
mk(S, 'line', { x1: 36, y1: TY + 26, x2: 748, y2: TY + 26, stroke: C.ink, 'stroke-width': 3 });
txt(S, 52, 112 + 20, 'A: 3 kg at 4 m/s · B: 1 kg at rest', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const SB = [[400, 'p', PC, 400 / 12], [446, 'K', KC, 400 / 24]].map(([y, l, c, sc]) => { txt(S, 52, y + 20, l, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 24, fill: c });
  mk(S, 'rect', { x: 90, y, width: 520, height: 28, rx: 6, fill: C.soft }); const a = mk(S, 'rect', { x: 90, y, height: 28, rx: 6, fill: c }), b = mk(S, 'rect', { y, height: 28, rx: 6, fill: M.mix(c, '#FFFFFF', 0.5) });
  const ta = txt(S, 0, y + 20, 'A', { 'font-size': 15, fill: '#fff', 'font-weight': 600 }), tb = txt(S, 0, y + 20, 'B', { 'font-size': 15, fill: C.ink, 'font-weight': 600 }), tv = txt(S, 624, y + 21, '', { 'font-size': 20, fill: c, 'font-weight': 600 });
  return (va, vb, lab) => { const wa = va * sc, wb = vb * sc; attr(a, 'width', Math.max(0, wa).toFixed(1)); attr(b, 'x', (90 + wa).toFixed(1)); attr(b, 'width', Math.max(0, wb).toFixed(1)); M.hide(b, wb < 1);
    at(ta, 90 + 8, y + 20); op(ta, wa > 24 ? 1 : 0); at(tb, 90 + wa + 8, y + 20); op(tb, wb > 24 ? 1 : 0); M.setT(tv, lab); }; });
const cart = (w, col, op2 = 1) => { const o2 = mk(S, 'g', {}), g = mk(o2, 'g', { opacity: op2 }); mk(g, 'rect', { x: 0, y: -60, width: w, height: 60, rx: 8, fill: col });
  mk(g, 'circle', { cx: 22, cy: 6, r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: w - 22, cy: 6, r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); return g; };
const gA = [0.3, 0.2, 0.12].map(o2 => cart(AW, C.ink, o2)), gB = [0.3, 0.2, 0.12].map(o2 => cart(BW, COIN, o2));
const cA = cart(AW, C.ink), cB = cart(BW, COIN);
const lA = txt(S, 0, 0, 'A', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: '#fff', 'text-anchor': 'middle' }), lB = txt(S, 0, 0, 'B', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#fff', 'text-anchor': 'middle' });
const bumpP = mk(S, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }), bumpR = mk(S, 'rect', { y: TY - 46, height: 32, rx: 6, fill: '#B8BCC6' });
const vA = PUC.arrow(S, VC, 6, 17), vB = PUC.arrow(S, VC, 6, 17), vAl = txt(S, 0, 0, '', { 'font-size': 20, fill: VC, 'font-weight': 600 }), vBl = txt(S, 0, 0, '', { 'font-size': 20, fill: VC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r0" style="color:${VC}">4.00</span><span class="u">m/s · cart A</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r1" style="color:${VC}">0.00</span><span class="u">m/s · cart B</span>
  <span class="k" style="color:${PC}">p</span><span class="v" id="r2" style="color:${PC}">12.0</span><span class="u">kg·m/s · total</span>
  <span class="k" style="color:${KC}">K</span><span class="v" id="r3" style="color:${KC}">24.0</span><span class="u">J · total</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 82, w: 500, h: 138, xmax: 1.2, ymin: 0, ymax: 30, xt: [0, 0.3, 0.6, 0.9, 1.2], yt: [0, 10, 20, 30] });
txt($('#grS'), 96, 72, 'K (J)', { 'text-anchor': 'end' }); txt($('#grS'), 610, 82 + 138 - 10, 't (s)', { 'text-anchor': 'end' });
const KCOL = [KC, M.mix(KC, '#FFFFFF', 0.35), M.mix(KC, '#FFFFFF', 0.6)];
const gC = KCOL.map(c => gr.curve(c, 5)), gD = gr.dot(KC, 10);
const gL = [['elastic 24', 24], ['inelastic 19.5', 19.5], ['stuck 18', 18]].map(([s2, y], i) => txt($('#grS'), gr.X(1.2) + 8, gr.Y(y) + [-2, 8, 22][i], s2, { 'font-size': 16, fill: i ? '#2C7F7F' : KC, 'font-weight': 600 }));
const Ktot = (k, r) => { const v = vel(k, r); return 0.5 * MA * v[0] * v[0] + 0.5 * MB * v[1] * v[1]; };
const tRun = [wt('S2', 'Spring') + 0.2, wt('S3', 'Soft') + 0.2, wt('S4', 'Sticky') + 0.2];
const tSlo = wt('S6', 'Slow'), tRes = tSlo + 0.6, rR0 = RC - 0.04, rSq = RC + TAU / 2, tHold = tRes + 4 * (rSq - rR0), tRel = wt('S7', 'Springs') - 0.1;
const simState = t => { if (t >= tSlo) { let r; if (t < tRes) r = Math.min((tSlo - tRun[2]) / 2, RMAX); else if (t < tHold) r = rR0 + (t - tRes) / 4; else if (t < tRel) r = rSq; else r = Math.min(rSq + (t - tRel) / 4, RC + TAU + 0.4);
    return t < tRes ? { k: 2, r } : { k: 0, r }; }
  for (let k = 2; k >= 0; k--) if (t >= tRun[k] - 0.3) return { k, r: M.clamp((t - tRun[k]) / 2, 0, RMAX) };
  return { k: 0, r: 0 }; };
const BNAME = ['SPRING BUMPERS', 'SOFT RUBBER BUMPERS', 'STICKY BUMPERS'];
const avS = PUC.avatar($('#sS'), { x: 976 + 36, y: 576 + 160, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Squash first. Then bounce back, or not.' });

/* ---------- D ---------- */
const pK = s => tx(PC, s);
const STEPS = [[`${pK('m_1u_1 + m_2u_2')} = ${pK('m_1v_1 + m_2v_2')}`, 'no outside push during the hit: every collision'],
  [`${tx(KC, 'K_{\\text{after}}')} = ${tx(KC, 'K_{\\text{before}}')}`, 'elastic: no kinetic energy lost'],
  [`${tx(KC, 'K_{\\text{after}}')} < ${tx(KC, 'K_{\\text{before}}')}`, 'inelastic: lost K becomes heat, sound, a dent'],
  [`${tx(VC, 'v')} = ${pK('p_{\\text{total}}')}/m_{\\text{total}} = 12/4 = 3\\,\\text{m/s}`, 'perfectly inelastic: one shared speed']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'So'), wt('D3', 'Elastic'), wt('D4', 'Inelastic'), wt('D5', 'They')];
const TBX = [20, 270, 390, 510, 630], TB = [['', 'p BEFORE', 'p AFTER', 'K BEFORE', 'K AFTER'], ['Elastic', '12', '12', '24', '24'], ['Inelastic', '12', '12', '24', '19.5'], ['Stuck', '12', '12', '24', '18']];
$('#tbs').innerHTML = TB.map((row, i) => `<div class="tb${i ? '' : ' h'}" id="tb${i}" style="top:${84 + (i ? 56 + (i - 1) * 84 : 0)}px">${row.map((c, j) => `<span id="tc${i}_${j}" style="left:${TBX[j]}px;${i && j === 0 ? 'font-family:Poppins;font-weight:700;font-size:26px;' : ''}color:${i && j ? (j < 3 ? PC : KC) : ''}">${c}</span>`).join('')}</div>`).join('') +
  `<div class="chipd" id="tbC" style="left:36px;top:420px"><span>p always 12</span><span style="color:#7FD1D1">K: only elastic keeps 24</span></div>`;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${pK('m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2')}`);

/* ---------- C ---------- */
const board = (p) => { mk(p, 'rect', { x: 36, y: 84, width: 712, height: 300, rx: 12, fill: '#F2E3C6', stroke: '#B08B57', 'stroke-width': 8 }); };
const c0 = $('#c0S'); board(c0); const c0S = ball(c0, 30, C.ink), c0C = ball(c0, 20, COIN), c0Gs = [0.3, 0.2, 0.12].map(o2 => { const b = ball(c0, 20, COIN); b.setAttribute('opacity', o2); return b; });
const c1 = $('#c1S'); board(c1); const c1K = ball(c1, 20, CLAY), c1C = ball(c1, 20, COIN);
const c0Run = t => crRun(t, wt('C2', 'striker') - 0.2, 90, 300, 140, 70, 210, 0);
const c1Run = t => crRun(t, wt('C3', 'clay') - 0.2, 90, 300, 140, 70, 70, 40);
const c0V = [PUC.arrow(c0, VC, 5, 15), PUC.arrow(c0, VC, 5, 15)], c1V = PUC.arrow(c1, VC, 5, 15);
const th1 = PUC.think($('#th1'), { q: 'With no outside force, which is always kept in a collision?', opts: ['Momentum', 'Kinetic energy'], right: 0,
  why: 'The pushes are equal and opposite, so they cancel.' });
const th2 = PUC.think($('#th2'), { q: 'Two clay balls, same mass, same speed, hit head on and stick. What kinetic energy is left?', opts: ['Zero', 'Half', 'All of it'], right: 0,
  why: 'Total momentum was zero, so they stop. All K becomes heat.' });

/* ---------- R ---------- */
const rl = $('#rlS'), WALLX = 520, RY2 = 260;
mk(rl, 'rect', { x: WALLX, y: 110, width: 200, height: 300, rx: 10, fill: COIN });
const rBall = mk(rl, 'ellipse', { cx: 150, cy: RY2, rx: 60, ry: 60, fill: CLAY });
const rV = PUC.arrow(rl, VC, 7, 19), rDent = txt(rl, WALLX - 120, RY2 + 110, 'stays dented', { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const rHeat = [0, 1, 2].map(k => mk(rl, 'path', { d: `M${WALLX - 100 + k * 34},${RY2 - 80} q 6 -10 0 -20 q -6 -10 0 -20`, fill: 'none', stroke: C.red, 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
const rNo = txt(rl, WALLX - 120, RY2 - 150, 'no spring-back push', { 'font-size': 20, fill: C.red, 'font-weight': 600, 'text-anchor': 'middle' });
const rTog = txt(rl, 392, 470, 'clay + block move as one', { 'font-size': 22, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
const LK = [['On impact it squashes: <span class="kk">K</span> goes into the dent'], ['A spring returns it. Clay does not: heat'], ['No push back, so nothing drives them apart'], ['They move together: perfectly inelastic']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'No spring in clay, so no bounce.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`12 = 2(-2) + 4v \\;\\Rightarrow\\; ${tx(VC, 'v = 4\\,\\text{m/s}')}`)],
  [K(`${tx(KC, 'K_{\\text{before}}')} = \\tfrac12 (2)(36) = 36\\,\\text{J}`)],
  [K(`${tx(KC, 'K_{\\text{after}}')} = \\tfrac12(2)(4) + \\tfrac12(4)(16) = 4 + 32`)],
  [K(`${tx(KC, 'K_{\\text{after}}')} = 36\\,\\text{J} \\;\\Rightarrow\\; \\text{elastic}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'); txt(w, 36, 112, 'BEFORE', { 'font-size': 18, 'letter-spacing': 2 }); txt(w, 36, 312, 'AFTER', { 'font-size': 18, 'letter-spacing': 2 });
[180, 380].forEach(y => mk(w, 'line', { x1: 36, y1: y + 40, x2: 748, y2: y + 40, stroke: C.ink, 'stroke-width': 2.5 }));
const wb = [[260, 180, 28, C.ink, '2 kg'], [460, 180, 36, COIN, '4 kg'], [260, 380, 28, C.ink, '2 kg'], [460, 380, 36, COIN, '4 kg']].map(([x, y, r, c, l]) => { mk(w, 'circle', { cx: x, cy: y + 40 - r, r, fill: c }); txt(w, x, y + 66, l, { 'font-size': 17, 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); return [x, y + 40 - r, r]; });
const wv = [PUC.arrow(w, VC, 6, 17), PUC.arrow(w, VC, 6, 17), PUC.arrow(w, VC, 6, 17)];
const wvl = [txt(w, 0, 0, '6 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 }), txt(w, 0, 0, '2 m/s back', { 'font-size': 20, fill: VC, 'font-weight': 600 }), txt(w, 0, 0, 'v = 4 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 })];
const wK = [txt(w, 748, 112, 'K = 36 J', { 'font-size': 22, fill: KC, 'font-weight': 600, 'text-anchor': 'end' }), txt(w, 748, 312, 'K = 4 + 32 = 36 J', { 'font-size': 22, fill: KC, 'font-weight': 600, 'text-anchor': 'end' })];
const tW = [wt('W3', 'Momentum'), wt('W4', 'Kinetic'), wt('W5', 'After'), wt('W5', 'Nothing')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Inelastic collision: momentum is lost too', right: 'Momentum is kept in every collision. Only kinetic energy is lost' });
const tg = $('#tg'), tgB = [[60, PC, 12, 'p before'], [150, PC, 12, 'p after'], [250, KC, 24, 'K before'], [340, KC, 18, 'K after']].map(([x, c, v, l]) => { const r = mk(tg, 'rect', { x, width: 56, y: 230, height: 0, rx: 5, fill: c }); txt(tg, x + 28, 256, l, { 'font-size': 14, 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); return [r, v]; });
mk(tg, 'line', { x1: 40, y1: 230, x2: 410, y2: 230, stroke: C.ink, 'stroke-width': 2.5 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: speeds after a hit, and the kinetic energy lost' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 2 kg block at 6 m/s hits a 1 kg block moving towards it at 3 m/s. They stick together. Find the kinetic energy lost.', qW: 780,
  opts: ['13.5 J', '27 J', '40.5 J', '36 J'], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${pK('p')} = 12 - 3 = 9 \\Rightarrow v = 9/3 = 3`)], [K(`${tx(KC, 'K_b')} = 36 + 4.5 = 40.5\\,\\text{J}`)],
  [K(`${tx(KC, 'K_a')} = \\tfrac12 (3)(9) = 13.5\\,\\text{J}`)], [K(`\\text{lost} = 27\\,\\text{J} \\Rightarrow \\textbf{B}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Momentum'), wt('A3', 'Kinetic'), wt('A4', 'After'), wt('A4', 'loss')];
const fc = PUC.fcard($('#sF'), { x: 280, y: 262, w: 1360, h: 470, title: 'Recap · collisions', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${pK('m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2')} \\quad \\text{in every collision}`),
    '<b>Elastic</b>: K after = K before &nbsp;(hard, springy bodies)',
    '<b>Inelastic</b>: K after &lt; K before &nbsp;·&nbsp; <b>stuck</b>: one speed, ' + K(`v = p_{\\text{total}}/m_{\\text{total}}`),
    '<b>Lost K</b> becomes heat, sound and a dent'] });
const YQ = ['What is conserved in every collision?', 'How do you test if a collision is elastic?', 'Where does the lost kinetic energy go?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 87', topic: 'One steel ball in, one out. Why? Elastic Collision in One Dimension', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 14 - bp.offsetWidth) + 'px'; bp.style.top = '96px'; }
// draw the carts for state (k, r): bumper on A's front, drawn 4x squashed so the squash can be seen
const drawCarts = (k, r, ga, gb) => { const [tip, br] = posR(k, r), ov = tip - br, bl = ov > 0 ? Math.max(6, BUMP - 4 * ov) : BUMP, front = ov > 0 ? br - bl : tip - BUMP;
  attr(ga, 'transform', `translate(${(front - AW).toFixed(1)},${TY})`); attr(gb, 'transform', `translate(${br.toFixed(1)},${TY})`); return { front, bl, br }; };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); if (!geo) measure(); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  M.vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, tJt[i] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'What') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#crm'), t, wt('H3', 'carrom') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    const clay = t >= tH4 - 0.2;
    const [sx, cx] = crRun(t, wt('H3', 'striker') - 0.3, 50, 150, 110, 55, 165, 0);
    bAt(crS, Math.min(sx, 290), 110); bAt(crC, Math.min(cx, 290), 110); M.hide(crS, clay); M.hide(crC, clay);
    const [kx, cx2] = crRun(t, wt('H4', 'flicks') - 0.1, 50, 150, 110, 55, 55, 18);
    bAt(crK, Math.min(kx, 272), 170); bAt(crC2, Math.min(cx2, 290), 170); M.hide(crK, !clay); M.hide(crC2, !clay);
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const [ax, bx] = paX(t); bAt(paA, ax, PY + 2); bAt(paB, bx, PY + 14);
    const r = Math.max(0, (t - tPa) / 2) % 3, f = r > 0.6 && r < 0.75 ? 1 : M.clamp(1 - (r - 0.75) * 4) * (r > 0.6 ? 1 : 0), fl = 80 * Math.max(f, M.io((t - wt('P3', 'pushes') + 0.1) / 0.4) * (t < T0('P4') ? 1 : 0));
    paFa.set(392 - 64, PY - 40, 392 - 64 - fl, PY - 40); paFb.set(392 - 30, PY - 40, 392 - 30 + fl, PY - 40); op(paFl, fl / 80);
    M.setT(paPl, t < wt('P4', 'after') ? 'p = 3(4) + 1(0) = 12' : 'p = 12 before = 12 after'); op(paPl, M.clamp((t - wt('P4', 'momentum') + 0.1) / 0.3));
    M.vis($('#paP'), t, wt('P4', 'same') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P5') - 0.15, out, { dx: 60, dy: 0, ...o });
    CR.forEach((_, i) => { const el = $('#cr' + i); M.vis(el, t, tCr[i] - 0.15, 1e9, { dx: -20, dy: 0 }); });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#half'), t, tS1 + 0.5, tSlo - 0.1, { dy: 8, outDur: 0.15 }); M.vis($('#slo'), t, tSlo - 0.05, out, POP);
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const { k, r } = simState(t), d = drawCarts(k, r, cA, cB);
    const slow = t > tSlo;
    // ghost trails (A and B separately)
    gA.forEach((g, q) => { const t2 = t - (slow ? 0.35 : 0.1) * (q + 1), s2 = simState(t2), [tip2, br2] = posR(s2.k, s2.r), ov = tip2 - br2, bl2 = ov > 0 ? Math.max(6, BUMP - 4 * ov) : BUMP, fr2 = ov > 0 ? br2 - bl2 : tip2 - BUMP;
      attr(g, 'transform', `translate(${(fr2 - AW).toFixed(1)},${TY})`); M.hide(g, s2.k !== k || (slow && t < tRes + 0.2) || Math.abs(fr2 - d.front) < 3); });
    gB.forEach((g, q) => { const t2 = t - (slow ? 0.35 : 0.1) * (q + 1), s2 = simState(t2), br2 = posR(s2.k, s2.r)[1];
      attr(g, 'transform', `translate(${br2.toFixed(1)},${TY})`); M.hide(g, s2.k !== k || (slow && t < tRes + 0.2) || Math.abs(br2 - d.br) < 3); });
    at(lA, d.front - AW / 2, TY - 22); at(lB, d.br + BW / 2, TY - 22);
    // bumper drawing by kind
    if (k === 0) { const x0 = d.front, n = 6, L = d.bl; let p = `M${x0.toFixed(1)},${TY - 30}`; for (let i = 1; i <= n; i++) p += ` L${(x0 + L * i / n).toFixed(1)},${(TY - 30 + (i % 2 ? -12 : 12) * (i < n ? 1 : 0)).toFixed(1)}`; attr(bumpP, 'd', p); M.hide(bumpP, false); M.hide(bumpR, true); }
    else { attr(bumpR, 'x', d.front.toFixed(1)); attr(bumpR, 'width', d.bl.toFixed(1)); bumpR.setAttribute('fill', k === 1 ? '#B8BCC6' : CLAY); M.hide(bumpR, false); M.hide(bumpP, true); }
    const v = vel(k, r), ga = M.o3((t - tS1 - 0.6) / 0.5);
    vA.set(d.front - AW / 2 - 7 * v[0], TY - 84, d.front - AW / 2 + 7 * v[0] * ga + 0.01, TY - 84); vB.set(d.br + BW / 2 - 7 * v[1], TY - 84, d.br + BW / 2 + 7 * v[1] * ga + 0.01, TY - 84);
    if (v[1] < 0.05) vB.set(0, 0, 0, 0);
    M.setT(vAl, v[0].toFixed(1) + ' m/s'); M.setT(vBl, v[1].toFixed(1) + ' m/s'); at(vAl, d.front - AW / 2 - 40, TY - 100); at(vBl, d.br + BW / 2 - 30, TY - 100); op(vAl, ga); op(vBl, ga * (v[1] > 0.05 ? 1 : 0));
    M.setT($('#bump'), BNAME[k]); M.vis($('#bump'), t, tRun[0] - 0.4, 1e9, POP);
    SB[0](MA * v[0], MB * v[1], (MA * v[0] + MB * v[1]).toFixed(1)); SB[1](0.5 * MA * v[0] * v[0], 0.5 * MB * v[1] * v[1], Ktot(k, r).toFixed(1) + ' J'); M.setT($('#r0'), v[0].toFixed(2)); M.setT($('#r1'), v[1].toFixed(2)); M.setT($('#r2'), (MA * v[0] + MB * v[1]).toFixed(1)); M.setT($('#r3'), Ktot(k, r).toFixed(1));
    const hi = M.io((t - wt('S5', 'momentum') + 0.1) / 0.3) * (1 - M.io((t - T0('S6')) / 0.3)); $('#r2').style.background = mix('#FFFFFF', '#F6E3EC', hi);
    FIN.forEach((_, j) => { const re = t >= tSlo ? 1.2 : (j < k ? 1.2 : j === k ? Math.min(r, 1.2) : 0); gC[j](x => [x, Ktot(j, x)], 0, re, 120); op(gL[j], re >= 1.19 ? 1 : 0); });
    gD(Math.min(r, 1.2), Ktot(k, r), t > tRun[0] - 0.3);
    M.vis($('#sq'), t, wt('S7', 'Six') - 0.1, 1e9, POP);
    avS(t, wt('S7', 'heat') + 0.3, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 118]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    TB.forEach((row, i) => { M.vis($('#tb' + i), t, tD1 + 0.5 + i * 0.1, 1e9, { dy: 12 }); row.forEach((_, j) => { if (!i || !j) return;
      const tt = j < 3 ? tStep[0] + 0.6 + i * 0.15 : j === 3 ? tStep[1] + i * 0.1 : tStep[i]; M.vis($(`#tc${i}_${j}`), t, tt, 1e9, POP); }); });
    M.vis($('#tbC'), t, tStep[3] + 1.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Momentum') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Kinetic') - 0.2, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const [sx, cx] = c0Run(t); bAt(c0S, Math.min(sx, 640), 234); bAt(c0C, Math.min(cx, 718), 234);
    c0Gs.forEach((g, q) => { const g2 = c0Run(t - 0.08 * (q + 1))[1]; bAt(g, Math.min(g2, 718), 234); M.hide(g, Math.abs(g2 - cx) < 3); });
    const hitS = cx > 301; c0V[0].set(sx + 34, 190, sx + 34 + (hitS ? 30 : 60), 190); c0V[1].set(cx, 190, cx + (hitS ? 90 : 0) + 0.01, 190); if (!hitS) c0V[1].set(0, 0, 0, 0); if (sx < 90.5) c0V[0].set(0, 0, 0, 0);
    M.vis($('#c0P'), t, wt('C2', 'Nearly') - 0.1, 1e9, POP);
    M.vis($('#c1'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const [kx, cx2] = c1Run(t); bAt(c1K, Math.min(kx, 678), 234); bAt(c1C, Math.min(cx2, 718), 234);
    c1V.set(kx, 190, kx + (cx2 > 301 ? 30 : 60), 190); if (kx < 90.5) c1V.set(0, 0, 0, 0);
    M.vis($('#c1P'), t, wt('C3', 'sticks') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'momentum') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'The') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'What') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'The') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const tHit = wt('R2', 'impact'), u = M.clamp((t - (tHit - 1.0)) / 1.0), sq = M.o3((t - tHit) / 0.35);
    const cx = M.lerp(150, WALLX - 60, u) + 18 * sq, rx = 60 - 24 * sq, ry = 60 + 16 * sq;
    attr(rBall, 'cx', (cx + (60 - rx) * 0).toFixed(1)); attr(rBall, 'rx', rx.toFixed(1)); attr(rBall, 'ry', ry.toFixed(1));
    rV.set(cx - 30, RY2 - 100, cx - 30 + 90 * (1 - sq), RY2 - 100); if (sq > 0.98) rV.set(0, 0, 0, 0);
    op(rDent, M.clamp((t - wt('R3', 'dented') + 0.1) / 0.3)); op(rNo, M.clamp((t - wt('R3', 'Clay') + 0.1) / 0.3));
    rHeat.forEach((h, k) => op(h, M.clamp((t - wt('R3', 'warms') + 0.1 + k * 0.1) / 0.3) * (0.6 + 0.4 * Math.abs(Math.sin(t * 3 + k)))));
    op(rTog, M.clamp((t - wt('R5', 'together') + 0.1) / 0.3));
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5') + 0.5)) / 0.3))); });
    avR(t, wt('R5', 'inelastic') + 0.3, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const g0 = M.o3((t - wt('W2', 'six') + 0.1) / 0.5), g1 = M.o3((t - wt('W2', 'bounces') + 0.1) / 0.5), g2 = M.o3((t - wt('W3', 'v', 1) + 0.1) / 0.5);
    const [b0, , b2, b3] = wb; wv[0].set(b0[0] + 34, b0[1], b0[0] + 34 + 90 * g0, b0[1]); wv[1].set(b2[0] - 34, b2[1], b2[0] - 34 - 30 * g1 - 0.01, b2[1]); wv[2].set(b3[0] + 42, b3[1], b3[0] + 42 + 60 * g2, b3[1]);
    at(wvl[0], b0[0] + 40, b0[1] - 30); at(wvl[1], b2[0] - 150, b2[1] - 30); at(wvl[2], b3[0] + 48, b3[1] - 30); op(wvl[0], g0); op(wvl[1], g1); op(wvl[2], g2);
    op(wK[0], M.clamp((t - wt('W4', 'Thirty') + 0.1) / 0.3)); op(wK[1], M.clamp((t - wt('W5', 'Thirty') + 0.1) / 0.3));
    M.vis($('#wP'), t, wt('W5', 'elastic') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'inelastic') - 0.1, tStrike: wt('X3', 'kept') - 0.1, tRight: wt('X3', 'kept') + 0.3 });
    tgB.forEach(([r, v], i) => { const g = M.o3((t - (wt('X3', 'kept') + (i < 2 ? 0 : 0.8)) + 0.2) / 0.5), h = v * 7 * g; attr(r, 'y', (230 - h).toFixed(1)); attr(r, 'height', h.toFixed(1)); });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
