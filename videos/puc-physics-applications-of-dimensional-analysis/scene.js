// PUC Physics Ep 09: Applications of dimensional analysis (Motion notebook, the corridor pendulum)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, UC = C.violet, EC = C.teal;     // colour-coding: v blue, g red, units violet, energy teal
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (c, s) => `\\textcolor{${c}}{${s}}`;
const g_ = cv(GC, 'g'), l_ = 'l', m_ = 'm';
const G = 9.8, TP = l => 2 * Math.PI * Math.sqrt(l / G);

Object.assign(M.IC, {
  swing: ['M4 3h16', 'M8 3l-2 13', 'M16 3l2 13', 'M5 16h14'],
  key: ['M15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z', 'M12 11v10', 'M12 17h3', 'M12 20h2'],
  pend: ['M12 3v11', 'M12 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M7 3h10'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  wand: ['M15 4V2', 'M15 16v-2', 'M8 9h2', 'M20 9h2', 'M17.8 11.8 19 13', 'M15 9h0', 'M17.8 6.2 19 5', 'm3 21 9-9', 'M12.2 6.2 11 5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS3 = T0('S3'), tD1 = T0('D1'), tD7 = T0('D7'), tR1 = T0('R1');
const tK1 = T0('K1'), tK3 = T0('K3'), tC1 = T0('C1'), tC5 = T0('C5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tD7, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three swings ---------- */
const JOBS = [['swing', 'Park swing', 'BACK AND FORTH', 'swing'], ['clock', 'Clock pendulum', 'TICK, TOCK', 'clock'], ['pend', 'Lab bob', 'ON A STRING', 'bob']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${330 + i * 430}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw" style="font:600 16px 'IBM Plex Mono';letter-spacing:.08em;color:var(--mute);top:68px">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 124}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="jn" style="font:700 30px Poppins;top:32px">${n}</div><div class="jv" style="right:28px">T = ?</div></div>`).join('');
const TILES = [['help', 'No formula'], ['book', 'No textbook'], ['wand', 'Only dimensions']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, i === 2 ? C.ac : C.mute, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'formula'), wt('H4', 'textbook'), wt('H5', 'dimensions')];

/* ---------- P: three uses ---------- */
const USES = [['check', 'Check', 'Can a formula be right?', `[\\text{LHS}] = [\\text{RHS}]`], ['repeat', 'Convert', 'One unit system to another', `\\text{J} \\to \\text{erg}`], ['wand', 'Build', 'Guess a formula\'s form', `T = k\\sqrt{${l_}/${g_}}`]];
$('#uses').innerHTML = USES.map(([ic, h, s, f], i) => `<div class="use" id="us${i}" style="left:${36 + i * 522}px"><div class="un">${i + 1}</div><div class="ui">${M.icon(ic, 40, C.ac, 2.2)}</div><div class="uh">${h}</div><div class="us">${s}</div><div class="ux">${K(f)}</div></div>`).join('');
$('#pR').innerHTML = `${M.icon('check', 22, C.ok, 3)} Every term has the same dimensions`;
const tUse = [T0('P3'), T0('P4'), T0('P5')];

/* ---------- S: the corridor pendulum ---------- */
const s = $('#simS'), PX0 = 392, PY0 = 112, LPX = 300, TH0 = 0.38;   // 1 m string drawn 300 px; amplitude 0.38 rad (small angle)
mk(s, 'rect', { x: 262, y: 92, width: 260, height: 20, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
for (let x = 270; x < 520; x += 22) mk(s, 'line', { x1: x, y1: 92, x2: x + 12, y2: 80, stroke: C.dim, 'stroke-width': 2 });
mk(s, 'line', { x1: PX0, y1: PY0, x2: PX0, y2: PY0 + LPX + 40, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const arcG = mk(s, 'path', { d: `M${PX0 + LPX * Math.sin(-TH0)},${PY0 + LPX * Math.cos(TH0)} A${LPX},${LPX} 0 0 0 ${PX0 + LPX * Math.sin(TH0)},${PY0 + LPX * Math.cos(TH0)}`, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const pend = (p, rb, col) => { const g = mk(p, 'g', {}); const st = mk(g, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: C.ink, 'stroke-width': 3 }); const b = mk(g, 'circle', { r: rb, fill: col, stroke: C.ink, 'stroke-width': 2.5 }); return { g, st, b }; };
const ghosts = [0, 1, 2].map(() => pend(s, 22, C.ink)), pd = pend(s, 22, '#8D99AE');
ghosts.forEach(gp => gp.st.setAttribute('opacity', 0));
mk(s, 'circle', { cx: PX0, cy: PY0, r: 6, fill: C.ink });
const vA = PUC.arrow(s, VC, 6, 18), gA = PUC.arrow(s, GC, 6, 18);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const gL = txt(s, 0, 0, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: GC });
const lLab = txt(s, PX0 + 16, PY0 + 150, 'l', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink });
const setP = (p, th) => { const bx = PX0 + LPX * Math.sin(th), by = PY0 + LPX * Math.cos(th); attr(p.st, 'x1', PX0); attr(p.st, 'y1', PY0); attr(p.st, 'x2', bx.toFixed(1)); attr(p.st, 'y2', by.toFixed(1)); attr(p.b, 'cx', bx.toFixed(1)); attr(p.b, 'cy', by.toFixed(1)); return [bx, by]; };
const T1m = TP(1), W = 2 * Math.PI / T1m;
// sim clock: real time from S1, slows to 0.25x during the S3 replay
const tSlo0 = tS3 - 0.1, tSlo1 = T0('S4') - 0.2;
const simT = t => { const a = Math.max(0, t - tS1 - 0.4); const s0 = Math.max(0, tSlo0 - tS1 - 0.4); if (t < tSlo0) return a; if (t < tSlo1) return s0 + 0.25 * (t - tSlo0); return s0 + 0.25 * (tSlo1 - tSlo0) + (t - tSlo1); };
const theta = st => TH0 * Math.cos(W * st);
$('#roG').innerHTML = `<span class="k">${K('\\theta')}</span><span class="v" id="r0">0.0</span><span class="u">degrees</span>
  <span class="k">${K('T')}</span><span class="v" id="r1">2.01</span><span class="u">s, one full swing</span>
  <span class="k">${K('m,\\,l,\\,' + g_)}</span><span class="v" id="r2" style="font-size:28px">0.05 kg · 1 m · <span style="color:${GC}">9.8</span></span><span class="u">m/s²</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 66, w: 610, h: 150, xmax: 8, ymin: -24, ymax: 24, xt: [0, 2, 4, 6], yt: [-20, 0, 20], xl: 't (s)', yl: 'θ (°)' });
gr.ylab.setAttribute('x', 124);
const gCurve = gr.curve(VC, 4), gDot = gr.dot(C.ink);
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = `right:36px;top:18px;height:40px;font-size:19px;background:${C.ac2};color:${VC}`; gTag.innerHTML = 'one full swing = <b class="mono">T</b>'; $('#gr').appendChild(gTag);
const perB = mk($('#grS'), 'path', { d: `M${gr.X(0)},${gr.Y(-22)} v-8 H${gr.X(T1m)} v8`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const CH3 = [['m', 'mass of the bob', C.ink], ['l', 'length of the string', C.ink], ['g', 'gravity', GC]];
$('#sch').innerHTML = CH3.map(([k, n, c], i) => `<div class="chipS" id="sc${i}" style="top:490px;background:var(--soft)"><b style="font:italic 600 30px Poppins;color:${c}">${k}</b><span style="font-size:21px;color:var(--ink2)">${n}</span></div>`).join('');
const tCh3 = [wt('S5', 'mass'), wt('S5', 'length'), wt('S5', 'gravity')];

/* ---------- D: build the formula ---------- */
const STEPS = [`T = k\\,${m_}^{\\,x}\\,${l_}^{\\,y}\\,${g_}^{\\,z}`,
  `[T] = [M]^x[L]^y[L\\,T^{-2}]^z`,
  `M:\\;\\; 0 = x`, `T:\\;\\; 1 = -2z \\;\\Rightarrow\\; z = -\\tfrac{1}{2}`, `L:\\;\\; 0 = y + z \\;\\Rightarrow\\; y = \\tfrac{1}{2}`,
  `T = k\\,${l_}^{1/2}\\,${g_}^{-1/2} = k\\sqrt{${l_}/${g_}}`];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:72px"></div>` + STEPS.map((f, i) => `<div class="st" id="dst${i}" style="top:${84 + i * 80}px;height:72px"><div class="n" style="top:10px">${i < 5 ? i + 1 : '✓'}</div><div class="sx" style="font-size:${i === 1 ? 34 : 36}px;top:8px">${K(f)}</div></div>`).join('');
$('#dst5 .n').style.cssText += ';background:var(--ok);border-color:var(--ok);color:#fff';
const tStep = [wt('D2', 'Guess'), wt('D3', 'Dimensions'), wt('D4', 'Match'), wt('D5', 'Match'), wt('D6', 'Match'), wt('D7', 'So')];
const PW = [['M', 'left: no M, power 0', 'x = 0'], ['T', 'left: T¹ · right: T⁻²ᶻ', 'z = −½'], ['L', 'left: L⁰ · right: Lʸ⁺ᶻ', 'y = +½']];
$('#pws').innerHTML = PW.map(([l, e, r], i) => `<div class="pw" id="pw${i}" style="top:${84 + i * 148}px"><div class="pl">${l}</div><div class="pe" style="font:500 26px Poppins;color:var(--ink2);top:26px">${e}</div><div class="pr" style="font:600 36px 'IBM Plex Mono';color:var(--ac);top:66px">${r}</div></div>`).join('').replace(/−/g, '-');
const tPw = [tStep[2], tStep[3], tStep[4]];
$('#stF').innerHTML = K(`T = k\\sqrt{\\dfrac{${l_}}{${g_}}}`);

/* ---------- R: read the powers + T vs l ---------- */
const LK = [['x = 0', 'Mass does not matter', 'm has no power'], ['y = \\tfrac{1}{2}', 'T grows as √l', 'longer string, slower swing'], ['z = -\\tfrac{1}{2}', 'Stronger g, faster swing', 'g sits under the root']];
$('#lks').innerHTML = LK.map(([a, b, c], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 130}px"><div class="a">${K(a)}</div><div class="ar">${M.icon('arrowR', 36, C.ac, 2.6)}</div><div class="b">${b}</div><div class="c">${c}</div></div>`).join('');
const tLk = [wt('R2', 'mass'), wt('R3', 'grows'), wt('R4', 'stronger')];
const rg = PUC.graph($('#rgS'), { x: 130, y: 110, w: 560, h: 300, xmax: 4, ymax: 4.4, xt: [0, 1, 2, 3, 4], yt: [0, 2, 4], xl: 'l (m)', yl: 'T (s)' });
rg.ylab.setAttribute('x', 144);
const rC = rg.curve(VC, 5), rC2 = rg.curve(GC, 4), rDot = rg.dot(C.ink);
const rNote = txt($('#rgS'), 0, 0, '4 × g: half the period', { 'font-size': 20, fill: GC, 'font-weight': 600 });
const rNote1 = txt($('#rgS'), 0, 0, '', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
$('#rgP').innerHTML = `<span class="mono">T</span> = 2π√(l/g): curve, not a straight line`;
const exR = document.createElement('div'); exR.className = 'ghost'; exR.style.cssText = 'right:36px;top:18px'; exR.textContent = 'k = 2π FROM EXPERIMENT'; $('#rg').appendChild(exR);

/* ---------- K: light vs heavy ---------- */
const mkSide = (svg, rb, col, mass) => {
  const px = 392, py = 112, L = 300;
  mk(svg, 'rect', { x: 262, y: 92, width: 260, height: 20, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
  const gh = [0, 1, 2].map(() => { const c = mk(svg, 'circle', { r: rb, fill: col, opacity: 0 }); return c; });
  const st = mk(svg, 'line', { x1: px, y1: py, x2: px, y2: py + L, stroke: C.ink, 'stroke-width': 3 }), b = mk(svg, 'circle', { r: rb, fill: col, stroke: C.ink, 'stroke-width': 2.5 });
  mk(svg, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  return (th, ths) => { const p = a => [px + L * Math.sin(a), py + L * Math.cos(a)]; const [bx, by] = p(th); attr(st, 'x2', bx.toFixed(1)); attr(st, 'y2', by.toFixed(1)); attr(b, 'cx', bx.toFixed(1)); attr(b, 'cy', by.toFixed(1));
    gh.forEach((c, k) => { const [gx, gy] = p(ths[k]); attr(c, 'cx', gx.toFixed(1)); attr(c, 'cy', gy.toFixed(1)); c.setAttribute('opacity', Math.abs(ths[k] - th) > 0.02 ? [0.3, 0.2, 0.12][k] : 0); }); };
};
const sideA = mkSide($('#kaS'), 14, C.gold, 0.05), sideB = mkSide($('#kbS'), 30, '#5A6478', 2);
const roK = (m) => `<span class="k">${K('m')}</span><span class="v">${m}</span><span class="u">kg</span><span class="k">${K('T')}</span><span class="v" style="color:${VC}">2.01</span><span class="u">s</span>`;
$('#kaR').innerHTML = roK('0.05'); $('#kbR').innerHTML = roK('2.00');
$('#kaR').style.gridTemplateColumns = $('#kbR').style.gridTemplateColumns = 'auto 1fr auto auto 1fr auto';
const th1 = PUC.think($('#th1'), { q: 'Aarav makes the string 4 times longer. What happens to the period T?', opts: ['4 times', 'Doubles', 'Same'], right: 1, why: 'T grows as √l, and √4 = 2. So 2 s becomes 4 s.' });

/* ---------- C: convert units ---------- */
const UT = [['Mass', 'kg', 'g'], ['Length', 'm', 'cm'], ['Time', 's', 's'], ['Energy', 'J', 'erg']];
$('#uts').innerHTML = `<div class="utab" style="top:84px;background:#fff"><span class="q" style="color:var(--mute);font:600 18px 'IBM Plex Mono';letter-spacing:.08em;top:22px">QUANTITY</span><span style="left:340px;color:var(--mute);font:600 18px 'IBM Plex Mono';letter-spacing:.08em;top:22px">SI</span><span style="left:540px;color:var(--mute);font:600 18px 'IBM Plex Mono';letter-spacing:.08em;top:22px">CGS</span></div>` +
  UT.map(([q, a, b], i) => `<div class="utab" id="ut${i}" style="top:${160 + i * 80}px"><span class="q" style="${i === 3 ? 'color:' + EC : ''}">${q}</span><span style="left:340px;color:${UC}">${a}</span><span style="left:540px;color:${UC}">${b}</span></div>`).join('') +
  `<div class="fxw" id="eD" style="left:36px;top:488px;font-size:40px">${K(`[${cv(EC, 'E')}] = [M\\,L^2\\,T^{-2}]`)}</div>`;
const tUt = [wt('C2', 'SI') - 0.2, wt('C2', 'SI'), wt('C2', 'SI') + 0.2, wt('C2', 'joules')];
$('#crC').innerHTML = `<div class="fxw" id="cr0" style="left:36px;top:96px;font-size:46px">${K(`n_1 u_1 = n_2 u_2`)}</div>
  <div class="fxw" id="cr1" style="left:36px;top:210px;font-size:46px">${K(`n_2 = n_1 \\left[\\frac{M_1}{M_2}\\right]^{1}\\left[\\frac{L_1}{L_2}\\right]^{2}\\left[\\frac{T_1}{T_2}\\right]^{-2}`)}</div>
  <div class="pillp" id="cr2" style="left:36px;top:400px">Powers come from <b>&nbsp;[M L² T⁻²]</b></div>`;
const th2 = PUC.think($('#th2'), { q: 'To convert, which ratio goes in the formula?', opts: ['Old unit ÷ new unit', 'New unit ÷ old unit'], right: 0, why: 'n₂ = n₁ (u₁/u₂): a bigger old unit gives a bigger new number.' });

/* ---------- W: joule to erg ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1\\,\\text{kg} = 10^3\\,\\text{g},\\;\\; 1\\,\\text{m} = 10^2\\,\\text{cm}`)],
  [K(`n_2 = 1 \\times [10^3]^1 \\times [10^2]^2 \\times [1]^{-2}`)],
  [K(`n_2 = 10^3 \\times 10^4 = 10^7`)],
  [K(`1\\,\\text{J} = ${cv(EC, '10^7\\,\\text{erg}')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 100 });
$('#wq').style.top = '70px';
const tW = [wt('W3', 'One'), wt('W4', 'n'), wt('W5', 'That'), wt('W5', 'So')];
const WD = [['mass', '1 kg', '10³ g', '× 10³', 'thousand'], ['length²', '(1 m)²', '(10² cm)²', '× 10⁴', 'hundred'], ['time⁻²', '1 s', '1 s', '× 1', 'second']];
$('#wrC').innerHTML = WD.map(([q, a, b, f], i) => `<div class="utab" id="wd${i}" style="top:${84 + i * 84}px"><span class="q" style="font:600 18px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute);top:22px">${q.toUpperCase()}</span><span style="left:190px">${a}</span><span style="left:340px;color:var(--mute)">→</span><span style="left:390px;color:${UC}">${b}</span><span class="wf" style="right:24px;color:var(--ac)">${f}</span></div>`).join('') +
  `<div class="lbl" style="left:36px;top:352px">ONE JOULE IN ERGS</div><div class="bigN" id="bigN" style="left:36px;top:388px;color:${EC}">1</div><div class="pillp" id="wP" style="left:36px;top:500px">smaller unit, bigger number</div>`;
$('#wrC').querySelectorAll('.wf').forEach(e => { e.style.left = 'auto'; e.style.right = '24px'; });
const tWd = [wt('W3', 'thousand'), wt('W3', 'hundred'), wt('W3', 'second')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '1 N = 10⁻⁵ dyne (ratio flipped)', right: '1 N = 10⁵ dyne: smaller unit, bigger number' });
const tr = $('#trS');
const nBar = mk(tr, 'rect', { x: 40, y: 96, width: 460, height: 44, rx: 8, fill: C.orange });
const nT = txt(tr, 40, 82, '1 NEWTON', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
const dBar = mk(tr, 'rect', { x: 40, y: 196, width: 2, height: 44, fill: C.orange });
const dT = txt(tr, 40, 182, '1 DYNE (100 000 FIT IN ONE NEWTON)', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 1.5 });
const where = PUC.where($('#wa'), { on: [], type: 'Find a formula from what a quantity depends on, or convert a value to a new unit system' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `Ripple speed ${K(cv(VC, 'v'))} depends on surface tension ${K('S')}, density ${K('\\rho')} and wavelength ${K('\\lambda')}. Which is dimensionally correct?`,
  opts: [K(`${cv(VC, 'v')} = k\\sqrt{S\\lambda/\\rho}`), K(`${cv(VC, 'v')} = k\\sqrt{S/\\rho\\lambda}`), K(`${cv(VC, 'v')} = k\\sqrt{\\rho\\lambda/S}`), K(`${cv(VC, 'v')} = k\\,S/\\rho\\lambda`)], right: 1, optW: 474, optH: 100, optY: 330, optFs: 34 });
const so = PUC.solution($('#so'), [[K('[S] = [M\\,T^{-2}]') + ' <span style="color:var(--mute);font-size:21px">force / length</span>'], [K('T:\\; -1 = -2a \\Rightarrow a = \\tfrac{1}{2}')], [K('M:\\; a + b = 0 \\Rightarrow b = -\\tfrac{1}{2}')], [K('L:\\; -3b + c = 1 \\Rightarrow c = -\\tfrac{1}{2}')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Surface'), wt('A2', 'Matching'), wt('A3', 'Matching'), wt('A3', 'Matching', 1)];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · uses of dimensional analysis', y0: 100, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`T = k\\sqrt{${l_}/${g_}} \\qquad n_2 = n_1\\,[M_1/M_2]^{a}\\,[L_1/L_2]^{b}\\,[T_1/T_2]^{c}`),
    '<b>1 Check</b> a formula &nbsp;·&nbsp; <b>2 Convert</b> units &nbsp;·&nbsp; <b>3 Build</b> a formula', '<b>Build</b>: guess powers, match M, L, T on both sides', '<b>Convert</b>: old unit ÷ new unit &nbsp;·&nbsp; 1 J = 10<sup>7</sup> erg, 1 N = 10<sup>5</sup> dyne'] });
const YQ = ['Why does the mass of the bob not appear in T = k√(l/g)?', 'If the string is made 9 times longer, what happens to T?', 'How many ergs make one joule, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 10', topic: 'Can dimensions ever find the k? Limitations of Dimensional Analysis', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS3 - 0.1, 1.1, 560, 560], [T0('S4') + 0.2, 1, 960, 540]]);
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So heavy keys and a light ring swing alike!' });
const avD = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A joule is ten million ergs!' });
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; [0, 1, 2].forEach(i => { const e = $('#sc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
}

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
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    M.vis($('#hjP'), t, wt('H2', 'decides') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#haF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const nt = $('#note'); M.vis(nt, t, wt('H3', 'swing') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    nt.style.transform = (nt.style.transform === 'none' || !nt.style.transform ? '' : nt.style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    const on = M.io((t - tTile[2]) / 0.3); $('#wq2').style.background = mix(C.soft, C.ac2, on);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pc'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    M.vis($('#pR'), t, wt('P1', 'Every') - 0.1, 1e9, POP);
    USES.forEach((_, i) => { const el = $('#us' + i); M.vis(el, t, tP1 + 0.5 + i * 0.15, 1e9, { dy: 24 }); ['.uh', '.us'].forEach(q => M.vis(el.querySelector(q), t, tUse[i] - 0.1, 1e9, { dx: -10, dy: 0 })); PUC.write(el.querySelector('.ux'), t, tUse[i] + 0.5, 0.6); const on = M.io((t - tUse[i] + 0.1) / 0.3) * (i < 2 ? 1 - M.io((t - tUse[i + 1] + 0.1) / 0.3) : 1); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* S: pendulum sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const slo = t >= tSlo0 && t < tSlo1; M.vis($('#slo'), t, tSlo0, tSlo1, { ...POP, outDur: 0.25 });
    const st = simT(t), th = theta(st), [bx, by] = setP(pd, th);
    const lag = slo ? 0.06 : 0.12;
    ghosts.forEach((gp, k) => { setP(gp, theta(Math.max(0, st - lag * (k + 1)))); gp.b.setAttribute('opacity', st > 0.2 ? [0.3, 0.2, 0.12][k] : 0); gp.b.setAttribute('stroke', 'none'); });
    M.vis(lLab, t, wt('S5', 'length'), 1e9, POP);
    // vectors during the replay: g constant down, v tangent with size from the motion
    const on = M.io((t - wt('S3', 'Gravity') + 0.1) / 0.4) * (1 - M.io((t - T0('S5')) / 0.3));
    gA.set(bx, by + 26, bx, by + 26 + 70 * on); attr(gL, 'x', bx + 12); attr(gL, 'y', by + 26 + 70 * on); gL.style.opacity = on.toFixed(3);
    const om = -TH0 * W * Math.sin(W * st), vOn = on * M.io((t - wt('S3', 'velocity') + 0.1) / 0.4), vs = 140 * om / (TH0 * W) * vOn;
    vA.set(bx, by, bx + vs * Math.cos(th), by - vs * Math.sin(th)); attr(vL, 'x', (bx + vs * Math.cos(th) + (vs > 0 ? 8 : -26)).toFixed(1)); attr(vL, 'y', (by - vs * Math.sin(th) - 12).toFixed(1)); vL.style.opacity = (Math.abs(vs) > 20 ? vOn : 0).toFixed(3);
    M.setT($('#r0'), (th * 180 / Math.PI).toFixed(1));
    const gx = Math.min(st, 8); gCurve(u => [u, TH0 * 180 / Math.PI * Math.cos(W * u)], 0, gx, 160); gDot(gx, th * 180 / Math.PI, st < 8);
    M.vis(gTag, t, wt('S2', 'graph') - 0.1, 1e9, POP); M.draw(perB, t, wt('S1', 'period') - 0.2, 0.5);
    M.vis($('#sim .lbl'), t, tS1, 1e9, { dy: 8 });
    CH3.forEach((_, i) => M.vis($('#sc' + i), t, tCh3[i] - 0.1, 1e9, POP));
  }

  /* D: build the formula */
  const dOn = t >= tD1 - 0.1 && t < tD7 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); });
    const hiY = M.track(84, tStep.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 80]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY).toFixed(1) + 'px';
    M.vis($('#dm'), t, tStep[1] + 0.3, 1e9, { dx: 60, dy: 0 });
    PW.forEach((_, i) => { const el = $('#pw' + i); M.vis(el, t, tPw[i] - 0.1, 1e9, { dy: 16 }); M.vis(el.querySelector('.pr'), t, tPw[i] + 1.2, 1e9, { dx: -12, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tPw[i]) / 0.3) * (1 - M.io((t - (tPw[i + 1] ?? 1e9)) / 0.3))); });
  }

  /* statement page (D7) */
  const stOn = t >= tD7 && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tD7 + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('D7', 'k') - 0.1, 0.9);
    M.rise($('#st2'), t, wt('D7', 'found') - 0.05, { st: 0.07, sp: M.HEAVY });
    $('#st2').style.top = '440px'; $('#st1').style.top = '360px'; $('#stF').style.top = '560px';
  }

  /* R: read the powers */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.5, 1e9, { dy: 16 }); M.vis(el.querySelector('.b'), t, tLk[i] - 0.1, 1e9, { dx: -12, dy: 0 }); M.vis(el.querySelector('.c'), t, tLk[i] + 0.3, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#rg'), t, wt('R3', 'grows') - 0.4, out, { dx: 60, dy: 0, ...o });
    const t3 = wt('R3', 'square'), u = M.io((t - t3) / 1.6), lv = 0.0 + 4 * u;
    rC(l => [l, TP(l)], 0, Math.max(0.001, lv), 80); rDot(lv, TP(lv), t > t3 - 0.1);
    const u2 = M.io((t - wt('R4', 'stronger')) / 1.2); rC2(l => [l, TP(l) / 2], 0, Math.max(0.001, 4 * u2), 80);
    attr(rNote, 'x', rg.X(2.2)); attr(rNote, 'y', rg.Y(TP(2.2) / 2) + 34); rNote.style.opacity = M.clamp((t - wt('R4', 'faster')) / 0.3);
    M.setT(rNote1, `length ${lv.toFixed(1)} m · T ${TP(lv).toFixed(2)} s`); attr(rNote1, 'x', rg.X(1.3)); attr(rNote1, 'y', rg.Y(4.4) - 20); rNote1.style.opacity = M.clamp((t - t3 + 0.2) / 0.3);
    M.vis($('#rgP'), t, wt('R3', 'length') + 0.2, 1e9, POP); avA(t, wt('R2', 'matter') + 0.3, out); M.vis(exR, t, wt('R3', 'grows') + 0.2, 1e9, { dy: 8 });
  }

  /* K: light vs heavy + think */
  const kOn = t >= tK1 - 0.1 && t < tC1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'heavy') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#exK'), t, tK1 + 0.4, 1e9, { dy: 8 });
    const st = Math.max(0, t - tK1 - 0.4), ths = [1, 2, 3].map(k => theta(Math.max(0, st - 0.12 * k)));
    sideA(theta(st), ths); sideB(theta(st), ths);
    M.vis($('#kaR'), t, wt('K2', 'Both') - 0.1, 1e9, { dy: 10 }); M.vis($('#kbR'), t, wt('K2', 'Both'), 1e9, { dy: 10 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'period') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'goes') });
  }

  /* C: convert units + think */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    UT.forEach((_, i) => M.vis($('#ut' + i), t, tUt[i] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#cl .utab'), t, tC1 + 0.3, 1e9, { dy: 8 });
    const eon = M.io((t - wt('C2', 'ergs')) / 0.3); $('#ut3').style.background = mix(C.soft, '#DDF1F1', eon);
    PUC.write($('#eD'), t, wt('C3', 'dimensions') - 0.1, 0.8);
    M.vis($('#cr'), t, T0('C4') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#cr0'), t, wt('C4', 'number') - 0.1, 0.6); PUC.write($('#cr1'), t, wt('C4', 'mass') - 0.1, 1.6);
    M.vis($('#cr2'), t, wt('C4', 'two') + 0.3, 1e9, POP);
    M.vis($('#th2'), t, tC5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC5, tOpts: wt('C5', 'old') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'n') });
  }

  /* W: joule to erg */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WD.forEach((_, i) => { const el = $('#wd' + i); M.vis(el, t, tWd[i] - 0.2, 1e9, { dy: 14 }); M.vis(el.querySelector('.wf'), t, tWd[i] + 0.4, 1e9, POP); });
    const n = $('#bigN'), tA = wt('W5', 'thousand'), tB = wt('W5', 'Ten');
    M.vis(n, t, T0('W2') + 0.6, 1e9, { dy: 10 });
    const v = t < tA ? 1 : t < tB ? 1e3 * Math.round(Math.pow(10, 4 * M.o3((t - tA) / 0.8))) : 1e7;
    n.innerHTML = t < tB - 0.05 ? Math.round(v).toLocaleString('en-IN') + ' <span style="font-size:44px;color:' + UC + '">erg</span>' : '10<sup style="font-size:56px">7</sup> <span style="font-size:44px;color:' + UC + '">erg</span>';
    M.vis($('#wP'), t, wt('W5', 'joule') - 0.1, 1e9, POP);
    avD(t, wt('W5', 'ergs') + 0.3, out);
  }


  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'flip') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'One') - 0.1 });
    const tn = wt('X3', 'dyne'); attr(nBar, 'width', (460 * M.o3((t - tn + 0.3) / 0.6)).toFixed(1)); M.hide(nBar, t < tn - 0.3); M.vis(nT, t, tn - 0.3, 1e9, { dy: 8 });
    M.vis(dBar, t, wt('X3', 'smaller') - 0.1, 1e9, POP); M.vis(dT, t, wt('X3', 'smaller'), 1e9, { dy: 8 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
