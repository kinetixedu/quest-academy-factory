// PUC Physics Ep 08: Principle of dimensional homogeneity (Motion notebook, the bicycle sim)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, DC = C.ink, UC = C.violet;      // colour-coding: v blue, a red, dimensions ink, units violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (c, s) => `\\textcolor{${c}}{${s}}`;
const v_ = cv(VC, 'u'), a_ = cv(AC, 'a');
const ok = (s = 18) => `<div class="mk" style="background:${C.ok}">${M.icon('check', s, '#fff', 3)}</div>`;
const no = (s = 18) => `<div class="mk" style="background:${C.red}">${M.icon('x', s, '#fff', 3)}</div>`;

Object.assign(M.IC, {
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  balance: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  timer: ['M10 2h4', 'M12 14l3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tR1 = T0('R1'), tR3 = T0('R3'), tS1 = T0('S1'), tS4 = T0('S4'), tD1 = T0('D1'), tB1 = T0('B1'), tL1 = T0('L1');
const tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tG4 = T0('G4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tR1, tR3], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: add only the same kind ---------- */
const JOBS = [['balance', 'Shopkeeper', '2 kg + 3 kg', 'shopkeeper', C.ac], ['clock', 'Clock', '10 min + 5 min', 'clock', C.ac], ['help', 'Never', '2 kg + 5 min ?', 'nobody', C.red]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w, , c], i) => `<div class="job" id="jb${i}" style="left:${330 + i * 430}px;border-top-color:${c}"><i>${M.icon(ic, 32, c, 2.2)}</i><div class="jn" style="color:${i === 2 ? C.red : C.ink}">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'shopkeeper'), wt('H1', 'clock'), wt('H2', 'nobody')];

/* ---------- H ---------- */
const JR = [['balance', '2 kg + 3 kg', '5 kg', 1], ['clock', '10 min + 5 min', '15 min', 1], ['help', '2 kg + 5 min', '?', 0]];
$('#jrs').innerHTML = JR.map(([ic, a, b, g], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 124}px;background:${g ? C.soft : C.redBg}"><i>${M.icon(ic, 30, g ? C.ac : C.red, 2.2)}</i><div class="jn">${a}</div><div class="jv" style="color:${g ? C.ink : C.red}">${b}</div>${g ? ok() : no()}</div>`).join('');
const TILES = [['help', 'Is it even possible?'], ['timer', 'A 10-second test']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, C.ac, 2.2)}<span>${w}</span></div>`).join('');

/* ---------- P: dimensions recap ---------- */
const BT = [['L', 'Length', 'METRE · m'], ['T', 'Time', 'SECOND · s'], ['M', 'Mass', 'KILOGRAM · kg']];
$('#bts').innerHTML = BT.map(([l, n, s], i) => `<div class="bt" id="bt${i}" style="top:${84 + i * 148}px"><div class="bl">${l}</div><div class="bn">${n}</div><div class="bs">${s}</div></div>`).join('');
const tBt = [wt('P1', 'Length'), wt('P1', 'Time'), wt('P1', 'Mass')];
$('#drF0').innerHTML = K(`[${cv(VC, 'v')}] = \\dfrac{[L]}{[T]} = [L\\,T^{-1}]`);
$('#drF1').innerHTML = K(`[${a_}] = \\dfrac{[L\\,T^{-1}]}{[T]} = [L\\,T^{-2}]`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\underbrace{x}_{[L]} \\;=\\; \\underbrace{${v_}t}_{[L]} \\;+\\; \\underbrace{\\tfrac{1}{2}${a_}t^2}_{[L]}`);

/* ---------- R: like with like ---------- */
$('#rrs').innerHTML = [['ruler', '3 m + 2 m', '5 m', 1], ['help', '3 m + 2 s', '?', 0]].map(([ic, a, b, g], i) => `<div class="jr" id="rr${i}" style="top:${184 + i * 124}px;background:${g ? C.soft : C.redBg}"><i>${M.icon(ic, 30, g ? C.ac : C.red, 2.2)}</i><div class="jn">${a}</div><div class="jv" style="color:${g ? C.ink : C.red}">${b}</div>${g ? ok() : no()}</div>`).join('') +
  `<div class="pillp ac" id="rlP" style="left:36px;top:470px">Same kind in, same kind out</div>`;
const rs = $('#rrS');
const b3b = document.createElement('div'); b3b.className = 'bar'; b3b.style.cssText = 'top:330px;width:300px;left:92px;background:var(--ac)'; b3b.textContent = '3 m'; $('#rr').appendChild(b3b);
const br5 = mk(rs, 'path', { d: 'M92,232 v12 H592 v-12', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const br5t = txt(rs, 342, 278, '5 m', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
$('#clkI').innerHTML = M.icon('clock', 28, C.ink, 2.4);
$('#b3').style.left = '92px';

/* ---------- S: the bicycle sim ---------- */
const s = $('#simS'), GY = 330, PX = 35, X0 = 70, U = 2, A = 1;   // 35 px per metre, u = 2 m/s, a = 1 m/s^2
mk(s, 'line', { x1: 36, y1: GY, x2: 748, y2: GY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(s, 'line', { x1: x, y1: GY + 4, x2: x - 14, y2: GY + 18, stroke: C.dim, 'stroke-width': 2 });
for (let m = 0; m <= 16; m += 2) { mk(s, 'line', { x1: X0 + m * PX, y1: GY - 8, x2: X0 + m * PX, y2: GY, stroke: C.ink, 'stroke-width': 2 }); txt(s, X0 + m * PX, GY + 46, m ? m : '0 m', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }); }
const bike = (p, op) => {
  const g = mk(p, 'g', { opacity: op }), st = { stroke: C.ink, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const wh = [-34, 34].map(cx => { mk(g, 'circle', Object.assign({ cx, cy: -24, r: 23 }, st)); const sp = mk(g, 'g', {}); mk(sp, 'path', { d: 'M-23,0 H23 M0,-23 V23', stroke: C.ink, 'stroke-width': 2, fill: 'none' }); return [sp, cx]; });
  mk(g, 'path', Object.assign({ d: 'M-34,-24 L-6,-24 L16,-56 L-16,-56 Z M-6,-24 L-18,-66 M-27,-67 H-9 M34,-24 L19,-70 M12,-71 H28' }, st));
  mk(g, 'circle', { cx: -6, cy: -24, r: 5, fill: C.ac });
  return { g, wh };
};
const ghosts = [0.3, 0.2, 0.12].map(o => bike(s, 0)), bk = bike(s, 1);
const vA = PUC.arrow(s, VC, 6, 18), aA = PUC.arrow(s, AC, 6, 18);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const aL = txt(s, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC });
const xpos = tau => U * tau + 0.5 * A * tau * tau;
const placeBike = (b, tau) => { const x = xpos(tau), px = X0 + x * PX; attr(b.g, 'transform', `translate(${px.toFixed(1)},${GY})`); b.wh.forEach(([sp, cx]) => attr(sp, 'transform', `translate(${cx},-24) rotate(${(x / 0.23 * 57.3 % 360).toFixed(1)})`)); return px; };
// readout
$('#roG').innerHTML = `<span class="k">${K(`${v_}t`)}</span><span class="v" id="r0" style="color:${VC}">0.00</span><span class="u">m</span>
  <span class="k">${K(`\\tfrac{1}{2}${a_}t^2`)}</span><span class="v" id="r1" style="color:${AC}">0.00</span><span class="u">m</span>
  <span class="k">${K('x')}</span><span class="v" id="r2">0.00</span><span class="u">m</span>`;
// graph
const gr = PUC.graph($('#grS'), { x: 110, y: 66, w: 610, h: 150, xmax: 4, ymax: 16, xt: [0, 1, 2, 3], yt: [0, 8, 16], xl: 't (s)', yl: 'x (m)' });
gr.ylab.setAttribute('x', 124); gr.ylab.setAttribute('y', 60);
const gUt = gr.curve(VC, 3), gX = gr.curve(C.ink, 5), gDot = gr.dot(C.ink);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = `right:36px;top:18px;height:40px;font-size:19px;background:${C.ac2};color:${VC}`; gTag.innerHTML = 'blue: <i>ut</i> alone · ink: <i>x</i>'; $('#gr').appendChild(gTag);
$('#sc0').innerHTML = `${M.icon('x', 22, C.red, 3)}<span>classmate's term</span>&nbsp;${K(`[${a_}t] \\to \\text{m/s}`)}`;
const sc1 = document.createElement('div'); sc1.className = 'chipS'; sc1.style.cssText = `top:410px;background:${C.red};color:#fff`; sc1.innerHTML = K('\\text{m} + \\text{m/s} = \\;?'); $('#sim').appendChild(sc1);
$('#sc0').style.top = '410px';
const tRa = wt('S2', 'Watch'), tRb = T1('S3');
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 490, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So his formula is out before any experiment!' });
const tau = t => {
  if (t < tS4 - 0.15) return 4 * M.clamp((t - tRa) / (tRb - tRa));
  return Math.min(4, 2.5 + 0.25 * Math.max(0, t - tS4 - 0.4));
};

/* ---------- D: check term by term ---------- */
const STEPS = [[`[x] = [L]`, 'x is a distance: a length'],
  [`[${v_}t] = [L\\,T^{-1}][T] = [L]`, 'velocity times time'],
  [`[\\tfrac{1}{2}${a_}t^2] = [L\\,T^{-2}][T^2] = [L]`, 'the half is a pure number: no dimensions'],
  [`[L] = [L] + [L]`, 'every term is L: dimensionally consistent']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'left'), wt('D3', 'u'), wt('D4', 'half'), wt('D5', 'Every')];
const mkEq = (host, top, terms, tags) => {
  host.innerHTML = `<div class="eqp" style="left:36px;top:${top}px">${terms.map(x => `<span>${K(x)}</span>`).join('&nbsp;')}</div>` +
    tags.filter(Boolean).map(([tg, c]) => `<div class="dtag" style="top:${top + 86}px;color:${c}">${K(tg)}</div>`).join('');
};
mkEq($('#eqA'), 120, ['x', '=', `${v_}t`, '+', `\\tfrac{1}{2}${a_}t^2`], [['[L]', C.ok], 0, ['[L]', C.ok], 0, ['[L]', C.ok]]);
mkEq($('#eqB'), 362, ['x', '=', `${v_}t`, '+', `${a_}t`], [['[L]', C.ok], 0, ['[L]', C.ok], 0, ['[L\\,T^{-1}]', C.red]]);
const vdA = document.createElement('div'); vdA.className = 'verd'; vdA.style.cssText = `top:76px;background:${C.ok}`; vdA.innerHTML = M.icon('check', 18, '#fff', 3) + 'CONSISTENT'; $('#dt').appendChild(vdA);
const vdB = document.createElement('div'); vdB.className = 'verd'; vdB.style.cssText = `top:318px;background:${C.red}`; vdB.innerHTML = M.icon('x', 18, '#fff', 3) + 'SURELY WRONG'; $('#dt').appendChild(vdB);
const tagA = [...$('#eqA').querySelectorAll('.dtag')], tagB = [...$('#eqB').querySelectorAll('.dtag')];
const tTagA = [tStep[0] + 0.5, tStep[1] + 0.6, tStep[2] + 0.8], tTagB = [wt('B1', 'formula'), wt('B1', 'formula') + 0.25, wt('B2', 'speed')];

/* ---------- L: change the unit ---------- */
const chips = (host, list) => list.map((x, i) => `<div class="uc" id="${host}c${i}">${K(x)}</div>`).join('');
const frRow = (id, top, lb, f, good) => `<div class="fr" id="${id}" style="top:${top}px"><div class="lbl">${lb}</div><div class="fx">${K(f)}</div>${good ? ok(22) : no(22)}</div>`;
$('#lsC').innerHTML = `<div class="ghost" style="right:36px;top:18px">EXAMPLE FIGURES</div>` + chips('ls', ['t = 2\\,\\text{s}', `${v_} = 2\\,\\text{m/s}`, `${a_} = 1\\,\\text{m/s}^2`]) +
  frRow('lsA', 160, 'REAL FORMULA', `${v_}t + \\tfrac{1}{2}${a_}t^2 = 4 + 2 = \\textbf{6}`, 1) + frRow('lsB', 304, "CLASSMATE'S FORMULA", `${v_}t + ${a_}t = 4 + 2 = \\textbf{6}`, 1) +
  `<div class="pillp" id="lsP" style="left:36px;top:470px">Both say 6 m. Looks fine...</div>`;
$('#lmC').innerHTML = chips('lm', ['t = \\tfrac{1}{30}\\,\\text{min}', `${v_} = 120\\,\\text{m/min}`, `${a_} = 3600\\,\\text{m/min}^2`]) +
  frRow('lmA', 160, 'REAL FORMULA', `${v_}t + \\tfrac{1}{2}${a_}t^2 = 4 + 2 = \\textbf{6}`, 1) + frRow('lmB', 304, "CLASSMATE'S FORMULA", `${v_}t + ${a_}t = 4 + \\textcolor{${C.red}}{120} = \\textcolor{${C.red}}{\\textbf{124}}`, 0) +
  `<div class="pillp ink" id="lmP" style="left:36px;top:470px">Same ride, two answers: not a law</div>`;
$('#lmB').style.background = C.redBg;
const tLs = [wt('L2', 'two'), wt('L2', 'two') + 0.2, wt('L2', 'two') + 0.4], tLm = [wt('L4', 'minutes'), wt('L4', 'minutes') + 0.2, wt('L4', 'minutes') + 0.4];

/* ---------- K: side by side ---------- */
const KS = 40;    // 40 px per metre
const kcol = (f, val, good, verdict) => `<div class="cmpF">${K(f)}</div>
  <div class="pillp good" style="left:36px;top:178px">${M.icon('check', 22, C.ok, 3)} Dimensions: L = L + L, passes</div>
  <div class="barL" style="top:262px">THE REAL RIDE (t = 2 s)</div><div class="hb kbr" style="top:292px;width:${6 * KS}px;background:${C.ink}"></div><div class="hbv" style="left:${36 + 6 * KS + 16}px;top:298px">6 m</div>
  <div class="barL" style="top:366px">THE FORMULA SAYS</div><div class="hb kbf" style="top:396px;width:${val * KS}px;background:${good ? C.ok : C.red}"></div><div class="hbv kbv" style="left:${36 + val * KS + 16}px;top:402px;color:${good ? C.ok : C.red}">${val} m</div>
  <div class="pillp ${good ? 'good' : 'bad'} kvd" style="left:36px;top:490px">${verdict}</div>`;
$('#kaC').innerHTML = kcol(`x = ${v_}t + \\textcolor{${C.ok}}{\\tfrac{1}{2}}${a_}t^2`, 6, 1, 'Right: matches the ride');
$('#kbC').innerHTML = kcol(`x = ${v_}t + \\textcolor{${C.red}}{2}\\,${a_}t^2`, 12, 0, 'Wrong: the 2 slipped through');
const th1 = PUC.think($('#th1'), { q: 'A formula passes the dimension check. Is it surely correct?', opts: ['Yes, surely', 'No, only possibly'], right: 1, why: 'Fails = surely wrong. Passes = only possibly right: pure numbers like ½ or 2 slip through.' });

/* ---------- G: special functions + the angle ---------- */
const SF = [['\\sin(\\theta)', 'sine'], ['\\cos(\\omega t)', 'cosine'], ['\\log(x/x_0)', 'log'], ['e^{\\,-kt}', 'e']];
$('#sfs').innerHTML = SF.map(([f], i) => `<div class="sf" id="sf${i}" style="top:${84 + i * 92}px"><div class="fx">${K(f)}</div><div class="pn">INSIDE: NO DIMENSIONS</div></div>`).join('');
const tSf = SF.map(([, w]) => wt('G1', w));
const ag = $('#angS'), OX = 250, OY = 330, RR = 190, TH = 1.0;     // theta = 1 rad: arc = radius
const ex = OX + RR * Math.cos(-TH), ey = OY + RR * Math.sin(-TH);
const rad1 = mk(ag, 'line', { x1: OX, y1: OY, x2: OX + RR, y2: OY, stroke: UC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rad2 = mk(ag, 'line', { x1: OX, y1: OY, x2: ex.toFixed(1), y2: ey.toFixed(1), stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const arc = mk(ag, 'path', { d: `M${OX + RR},${OY} A${RR},${RR} 0 0 0 ${ex.toFixed(1)},${ey.toFixed(1)}`, fill: 'none', stroke: VC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const ang = mk(ag, 'path', { d: `M${OX + 56},${OY} A56,56 0 0 0 ${(OX + 56 * Math.cos(-TH)).toFixed(1)},${(OY + 56 * Math.sin(-TH)).toFixed(1)}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
mk(ag, 'circle', { cx: OX, cy: OY, r: 7, fill: C.ink });
const lr = txt(ag, OX + RR / 2, OY + 40, 'radius r', { 'text-anchor': 'middle', 'font-size': 24, fill: UC, 'font-weight': 600 });
const ls_ = txt(ag, OX + RR + 30, OY - 110, 'arc s', { 'font-size': 24, fill: VC, 'font-weight': 600 });
const lt = txt(ag, OX + 66, OY - 18, 'θ', { 'font-size': 28, fill: C.ink, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' });
$('#angF').innerHTML = K(`\\theta = \\frac{${cv(VC, 's')}}{${cv(UC, 'r')}} = \\frac{[L]}{[L]} = [M^0L^0T^0]`);
const avD = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So an angle is just a number!' });
const th2 = PUC.think($('#th2'), { q: 'In y = A sin(ωt), t is a time. What are the dimensions of ω?', opts: ['[T]', '[T⁻¹]', '[L T⁻¹]'], right: 1, why: 'ωt must be a pure number, so ω must cancel the T: [ω] = [T⁻¹].' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Check ${K(`v^2 = ${v_}^2 + 2${a_}s`)}. Then find ${K('v')} if ${K(`${v_} = 3\\,\\text{m/s}`)}, ${K(`${a_} = 2\\,\\text{m/s}^2`)}, ${K('s = 4\\,\\text{m}')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`[${cv(VC, 'v')}^2] = [${v_}^2] = [L^2T^{-2}]`)],
  [K(`[2${a_}s] = [L\\,T^{-2}][L] = [L^2T^{-2}]\\;\\checkmark`)],
  [K(`${cv(VC, 'v')}^2 = 3^2 + 2(2)(4) = 9 + 16 = 25`)],
  [K(`${cv(VC, 'v')} = \\sqrt{25} = ${cv(VC, '5\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 92 });
const tW = [wt('W3', 'v'), wt('W4', 'Two'), wt('W6', 'nine'), wt('W6', 'final')];
const w = $('#wrS'), WG = 360, WX = 110, WP = 130;      // 130 px per metre, track 0 - 4 m
mk(w, 'line', { x1: 36, y1: WG, x2: 748, y2: WG, stroke: C.ink, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(w, 'line', { x1: x, y1: WG + 4, x2: x - 14, y2: WG + 18, stroke: C.dim, 'stroke-width': 2 });
for (let m = 0; m <= 4; m++) { mk(w, 'line', { x1: WX + m * WP, y1: WG - 10, x2: WX + m * WP, y2: WG, stroke: C.ink, 'stroke-width': 2 }); txt(w, WX + m * WP, WG + 46, m + ' m', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); }
const wGh = [0.3, 0.2, 0.12].map(() => bike(w, 0)), wBk = bike(w, 1);
const wvA = PUC.arrow(w, VC, 6, 18), waA = PUC.arrow(w, AC, 6, 18);
const wvL = txt(w, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const waL = txt(w, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC });
const wx = tau => 3 * tau + tau * tau;           // u = 3, a = 2: s = 3t + t^2, reaches 4 m at t = 1 s
const tWa = wt('W5', 'cycle'), tWb = wt('W5', 'over') + 0.4;
const wTau = t => M.clamp((t - tWa) / (tWb - tWa));
const placeW = (b, ta) => { const x = wx(ta), px = WX + x * WP; attr(b.g, 'transform', `translate(${px.toFixed(1)},${WG})`); b.wh.forEach(([sp, cx]) => attr(sp, 'transform', `translate(${cx},-24) rotate(${(x / 0.23 * 57.3 % 360).toFixed(1)})`)); return px; };

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Every quantity in an equation needs the same dimensions', right: 'Only terms added, subtracted or equated must match' });
$('#fma').innerHTML = `<div class="eqp" id="fmaE" style="left:0;top:58px;font-size:56px"><span style="margin-right:28px">${K(cv(C.orange, 'F'))}</span>${K('=')}<span style="margin:0 44px 0 40px">${K('m')}</span><span>${K(a_)}</span></div>` +
  ['[MLT^{-2}]', '[M]', '[LT^{-2}]'].map(x => `<div class="dtag fmt" style="top:150px;font-size:22px">${K(x)}</div>`).join('');
$('#fma').style.left = '1100px';
const where = PUC.where($('#wa'), { on: [], type: 'Find the dimensions of constants, or spot the dimensionally wrong formula' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `If ${K('x = \\alpha \\sin(\\beta t) + \\gamma t^2')}, with ${K('x')} in metres and ${K('t')} in seconds, the dimensions of ${K('\\alpha\\beta/\\gamma')} are`,
  opts: [K('[M^0L^1T^0]'), K('[M^0L^1T^{-1}]'), K('[M^0L^0T^1]'), K('[M^0L^2T^{-3}]')], right: 2, optW: 474, optH: 100, optY: 330, optFs: 34 });
const so = PUC.solution($('#so'), [[K('[\\alpha] = [L]') + ' <span style="color:var(--mute);font-size:21px">sine is a number</span>'], [K('[\\beta] = [T^{-1}]') + ' <span style="color:var(--mute);font-size:21px">βt is a number</span>'], [K('[\\gamma] = [L\\,T^{-2}]') + ' <span style="color:var(--mute);font-size:21px">γt² is a length</span>'], [K('\\dfrac{[L][T^{-1}]}{[L\\,T^{-2}]} = [T]')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Alpha'), wt('A2', 'Beta'), wt('A3', 'Gamma'), wt('A3', 'Divide')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · dimensional homogeneity', y0: 100, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`[\\text{LHS}] = [\\text{term}_1] = [\\text{term}_2] = \\cdots`),
    '<b>Add, subtract, equate</b> only things with the same dimensions', '<b>Fails</b> the check: surely wrong &nbsp;·&nbsp; <b>Passes</b>: only possibly right', '<b>Inside</b> sin, cos, log, e<sup>x</sup>: always a pure number'] });
const YQ = ['Why can distance never be ut + at?', 'If a formula passes the dimension check, is it surely correct?', 'In y = A sin(ωt), what are the dimensions of ω?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 09', topic: 'Can this rule build a formula? Applications of Dimensional Analysis', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS4 - 0.1, 1.1, 600, 520], [T0('S5') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  // dimension tags centred under their terms
  [['#eqA', [0, 2, 4]], ['#eqB', [0, 2, 4]]].forEach(([id, idx]) => { const host = $(id), eq = host.querySelector('.eqp'), sp = eq.querySelectorAll('span.katex, :scope > span'), terms = [...eq.children], tg = host.querySelectorAll('.dtag');
    idx.forEach((k, j) => { const tm = terms[k]; tg[j].style.left = (36 + tm.offsetLeft + tm.offsetWidth / 2 - tg[j].offsetWidth / 2).toFixed(0) + 'px'; }); });
  { const eq = $('#fmaE'), terms = [...eq.children], tg = $('#fma').querySelectorAll('.fmt'); [0, 2, 3].forEach((k, j) => { const tm = terms[k]; tg[j].style.left = (tm.offsetLeft + tm.offsetWidth / 2 - tg[j].offsetWidth / 2).toFixed(0) + 'px'; }); }
  ['ls', 'lm'].forEach(h => { let x2 = 36; [0, 1, 2].forEach(i => { const e = $('#' + h + 'c' + i); e.style.left = x2 + 'px'; x2 += e.offsetWidth + 12; }); });
  sc1.style.left = (36 + $('#sc0').offsetWidth + 14) + 'px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15 + (i === 2 ? 0.6 : 0), { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JR.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.3, 1e9, { dy: 16 }); M.vis(el.querySelector('.mk'), t, tMorph + 0.6 + i * 0.3, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#hjP'), t, wt('H2', 'catch') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#haF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const nt = $('#note'); M.vis(nt, t, wt('H3', 'Distance') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    nt.style.transform = (nt.style.transform === 'none' || !nt.style.transform ? '' : nt.style.transform + ' ') + 'rotate(-4deg)';
    M.vis($('#wq0'), t, wt('H4', 'possible') - 0.1, 1e9, POP); M.vis($('#wq1'), t, wt('H5', 'ten') - 0.1, 1e9, POP);
  }

  /* P: dimensions recap */
  const pOn = t >= tP1 - 0.1 && t < tR1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pc'), t, tP1 + 0.05, OUT('R1'), { dy: 36, outDur: 0.3, ody: -16 });
    BT.forEach((_, i) => M.vis($('#bt' + i), t, tBt[i] - 0.1, 1e9, POP));
    M.vis($('#dr0'), t, T0('P3') - 0.05, 1e9, { dx: 30, dy: 0 }); PUC.write($('#drF0'), t, wt('P3', 'L') - 0.2, 0.8);
    M.vis($('#dr1'), t, T0('P4') - 0.05, 1e9, { dx: 30, dy: 0 }); PUC.write($('#drF1'), t, wt('P4', 'L') - 0.1, 0.8);
  }

  /* statement on a fresh page (R1 + T1) */
  const stOn = t >= tR1 && t < tR3 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR3 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('R1', 'principle') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'same') + 0.1, 0.9);
  }

  /* R: like with like */
  const rOn = t >= tR3 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#rl'), t, tR3 + 0.1, out, { dx: -60, dy: 0, ...o });
    [['add', 0], ['subtract', 1], ['equate', 2]].forEach(([wd, i]) => M.vis($('#op' + i), t, wt('R3', wd) - 0.1, 1e9, POP));
    const tPl = wt('R4', 'plus'), tSec = wt('R4', 'seconds'), tNo = wt('R4', 'nothing');
    M.vis($('#rr0'), t, wt('R4', 'Three') - 0.1, 1e9, { dy: 16 }); M.vis($('#rr0').querySelector('.mk'), t, wt('R4', 'five'), 1e9, { ...POP, sc: 0.3 });
    M.vis($('#rr1'), t, wt('R4', 'Three', 1) - 0.1, 1e9, { dy: 16 }); M.vis($('#rr1').querySelector('.mk'), t, tNo, 1e9, { ...POP, sc: 0.3 });
    M.vis($('#rlP'), t, tNo + 0.5, 1e9, POP);
    M.vis($('#rr'), t, tR3 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#b3'), t, wt('R4', 'Three') - 0.1, 1e9, POP);
    const j = M.spring(t - tPl, M.SOFT), b2 = $('#b2'); M.vis(b2, t, tPl - 0.25, 1e9, { dy: 0, fade: 0.15 });
    b2.style.left = M.lerp(560, 392, M.clamp(j)).toFixed(1) + 'px'; b2.style.top = M.lerp(70, 150, M.clamp(j)).toFixed(1) + 'px';
    M.draw(br5, t, wt('R4', 'five') - 0.1, 0.4); M.vis(br5t, t, wt('R4', 'five'), 1e9, POP);
    M.vis(b3b, t, wt('R4', 'Three', 1) - 0.1, 1e9, POP);
    const ck = $('#clk'), c1 = M.spring(t - wt('R4', 'two', 1) + 0.1, M.SOFT), back = M.spring(t - tNo + 0.1, M.SOFT);
    M.vis(ck, t, wt('R4', 'two', 1) - 0.3, 1e9, { dy: 0, fade: 0.15 });
    ck.style.left = (M.lerp(560, 404, M.clamp(c1)) + 70 * M.clamp(back)).toFixed(1) + 'px';
    const bad = M.io((t - tNo) / 0.3); ck.style.borderColor = mix(C.ink, C.red, bad); ck.style.color = mix(C.ink, C.red, bad);
    M.vis($('#rrP'), t, tNo + 0.1, 1e9, POP);
  }

  /* S: bicycle sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exS'), t, tS1 + 0.6, tS4 - 0.2, { dy: 8, outDur: 0.2 });
    const slo = t >= tS4 - 0.15 && t < tS4 + 6.6; M.vis($('#slo'), t, tS4, tS4 + 6.4, { ...POP, outDur: 0.25 });
    const ta = tau(t), px = placeBike(bk, ta);
    const dip = 1 - 0.85 * (1 - M.clamp(Math.abs(t - tS4 + 0.15) / 0.15)); bk.g.setAttribute('opacity', (dip * M.clamp((t - tS1 - 0.5) / 0.25)).toFixed(3));
    const moving = (t > tRa && t < tRb) || (t > tS4 + 0.4 && ta < 4);
    ghosts.forEach((gb, k) => { const gt = Math.max(0, ta - (moving ? (slo ? 0.18 : 0.35) : 0) * (k + 1)); placeBike(gb, gt); gb.g.setAttribute('opacity', moving && ta - gt > 0.05 ? [0.3, 0.2, 0.12][k] : 0); });
    // vectors: grow on "velocity" / "acceleration" in the replay
    const vOn = M.io((t - wt('S4', 'velocity') + 0.1) / 0.4), aOn = M.io((t - wt('S4', 'acceleration') + 0.1) / 0.4), vel = U + A * ta;
    vA.set(px + 4, GY - 96, px + 4 + 16 * vel * vOn, GY - 96); attr(vL, 'x', (px + 12 + 16 * vel * vOn).toFixed(1)); attr(vL, 'y', GY - 86); vL.style.opacity = vOn.toFixed(3);
    aA.set(px + 4, GY - 130, px + 4 + 50 * aOn, GY - 130); attr(aL, 'x', (px + 64).toFixed(1)); attr(aL, 'y', GY - 120); aL.style.opacity = aOn.toFixed(3);
    // readout + graph
    M.setT($('#r0'), (U * ta).toFixed(2)); M.setT($('#r1'), (0.5 * A * ta * ta).toFixed(2)); M.setT($('#r2'), xpos(ta).toFixed(2));
    M.setT($('#tV'), ta.toFixed(2));
    const mx = t < tS4 - 0.15 ? ta : 4;
    gUt(s_ => [s_, U * s_], 0, mx); gX(s_ => [s_, xpos(s_)], 0, mx); gDot(ta, xpos(ta), t > tRa - 0.2);
    M.vis(gTag, t, wt('S3', 'graph') - 0.1, 1e9, POP);
    M.vis($('#sc0'), t, wt('S5', 'a') - 0.1, 1e9, POP); M.vis(sc1, t, wt('S6', 'Metres') - 0.1, 1e9, POP);
    avA(t, wt('S6', 'cannot') + 0.3, out);
  }

  /* D: check term by term */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, tB1 - 0.1, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#dt'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#eqAL'), t, tD1 + 0.5, 1e9, { dy: 8 }); M.vis($('#eqA .eqp'), t, tD1 + 0.6, 1e9, { dy: 14 });
    tagA.forEach((tg, i) => M.vis(tg, t, tTagA[i], 1e9, POP)); M.vis(vdA, t, wt('D5', 'consistent') - 0.1, 1e9, POP);
    M.vis($('#eqBL'), t, tB1, 1e9, { dy: 8 }); M.vis($('#eqB .eqp'), t, tB1 + 0.1, 1e9, { dy: 14 });
    tagB.forEach((tg, i) => M.vis(tg, t, tTagB[i], 1e9, POP)); M.vis(vdB, t, wt('B2', 'wrong') - 0.1, 1e9, POP);
  }

  /* L: same ride, change the unit */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#ls'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    tLs.forEach((tt, i) => M.vis($('#lsc' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#lsA'), t, wt('L3', 'seconds') - 0.1, 1e9, { dy: 16 }); M.vis($('#lsB'), t, wt('L3', 'six') - 0.1, 1e9, { dy: 16 });
    M.vis($('#lsA .mk'), t, wt('L3', 'six'), 1e9, { ...POP, sc: 0.3 }); M.vis($('#lsB .mk'), t, wt('L3', 'looks'), 1e9, { ...POP, sc: 0.3 });
    M.vis($('#lsP'), t, wt('L3', 'looks') + 0.2, 1e9, POP);
    M.vis($('#lm'), t, T0('L4') - 0.05, out, { dx: 60, dy: 0, ...o });
    tLm.forEach((tt, i) => M.vis($('#lmc' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#lmA'), t, wt('L4', 'still') - 0.1, 1e9, { dy: 16 }); M.vis($('#lmA .mk'), t, wt('L4', 'six'), 1e9, { ...POP, sc: 0.3 });
    M.vis($('#lmB'), t, wt('L5', 'jumps') - 0.1, 1e9, { dy: 16 }); M.vis($('#lmB .mk'), t, wt('L5', 'says') + 0.6, 1e9, { ...POP, sc: 0.3 });
    M.vis($('#lmP'), t, wt('L6', 'two') - 0.1, 1e9, POP);
    // once the minutes row disagrees, the seconds-only "looks fine" is put in doubt
    const dbt = M.io((t - wt('L6', 'Same')) / 0.3); $('#lsP').style.background = mix(C.soft, C.redBg, dbt); $('#lsP').style.color = mix(C.ink, C.red, dbt);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    [['#ka', T0('K1'), 'K1'], ['#kb', T0('K2'), 'K2']].forEach(([id, t0, L], j) => {
      const c = $(id); M.vis(c, t, t0 + 0.05 - (j ? 0.15 : 0), out, { dx: j ? 60 : -60, dy: 0, ...o });
      M.vis(c.querySelector('.cmpF'), t, t0 + 0.2, 1e9, { dy: 12 });
      M.vis(c.querySelector('.pillp.good'), t, wt(L, 'passes') - 0.1, 1e9, POP);
      const tb = wt(L, j ? 'says' : 'gives'); c.querySelectorAll('.barL').forEach((b, i) => M.vis(b, t, tb - 0.3 + i * 0.2, 1e9, { dy: 8 }));
      const g1 = M.o3((t - tb + 0.2) / 0.6), g2 = M.o3((t - tb - 0.2) / 0.7);
      c.querySelector('.kbr').style.width = (6 * KS * g1).toFixed(1) + 'px'; M.hide(c.querySelector('.kbr'), g1 <= 0);
      const val = j ? 12 : 6; c.querySelector('.kbf').style.width = (val * KS * g2).toFixed(1) + 'px'; M.hide(c.querySelector('.kbf'), g2 <= 0);
      c.querySelectorAll('.hbv').forEach((v, i) => M.vis(v, t, tb + (i ? 0.8 : 0.4), 1e9, { dx: -10, dy: 0 }));
      M.vis(c.querySelector('.kvd'), t, wt(L, j ? 'Wrong' : 'ride') + (j ? -0.1 : 0.3), 1e9, POP);
    });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'surely') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'fails') });
  }

  /* G: special functions + angle + think */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G4');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    SF.forEach((_, i) => { const el = $('#sf' + i); M.vis(el, t, tSf[i] - 0.1, 1e9, { dy: 14 }); M.vis(el.querySelector('.pn'), t, wt('G1', 'pure') + i * 0.1, 1e9, POP); });
    M.vis($('#gr2'), t, T0('G3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(rad1, t, wt('G3', 'radius') - 0.2, 0.4); M.vis(lr, t, wt('G3', 'radius'), 1e9, { dy: 8 });
    M.draw(arc, t, wt('G3', 'arc') - 0.1, 0.6); M.vis(ls_, t, wt('G3', 'arc') + 0.3, 1e9, { dy: 8 });
    M.draw(rad2, t, wt('G3', 'arc') + 0.3, 0.3); M.draw(ang, t, wt('G3', 'angle') - 0.1, 0.3); M.vis(lt, t, wt('G3', 'angle'), 1e9, POP);
    PUC.write($('#angF'), t, wt('G3', 'Length') - 0.1, 0.9);
    avD(t, wt('G3', 'dimensions') + 0.4, out);
    M.vis($('#th2'), t, tG4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG4, tOpts: wt('G4', 'dimensions') - 0.1, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'Omega') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W5') - 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W5'), 1e9, { dy: 8 });
    const ta = wTau(t), px = placeW(wBk, ta), mv = t > tWa && t < tWb;
    wGh.forEach((gb, k) => { const gt = Math.max(0, ta - 0.09 * (k + 1)); placeW(gb, gt); gb.g.setAttribute('opacity', mv && ta - gt > 0.02 ? [0.3, 0.2, 0.12][k] : 0); });
    const vv = Math.sqrt(9 + 4 * wx(ta)), on = M.io((t - tWa + 0.4) / 0.4);
    wvA.set(px + 4, WG - 96, px + 4 + 22 * vv * on, WG - 96); attr(wvL, 'x', (px + 14 + 22 * vv * on).toFixed(1)); attr(wvL, 'y', WG - 86); wvL.style.opacity = on.toFixed(3);
    waA.set(px + 4, WG - 132, px + 4 + 30 * 2 * on, WG - 132); attr(waL, 'x', (px + 74).toFixed(1)); attr(waL, 'y', WG - 122); waL.style.opacity = on.toFixed(3);
    const vc = $('#vC'); M.vis(vc, t, tWa - 0.2, 1e9, POP); M.setT($('#vN'), vv.toFixed(1)); vc.style.left = (392 - vc.offsetWidth / 2).toFixed(0) + 'px';
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'every') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'Only') });
    const tF_ = wt('X3', 'F'); M.vis($('#fmaE'), t, tF_ - 0.1, 1e9, { dy: 12 });
    $('#fma').querySelectorAll('.fmt').forEach((e, i) => M.vis(e, t, [tF_ + 0.3, wt('X3', 'mass'), wt('X3', 'acceleration')][i] - 0.05, 1e9, POP));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
