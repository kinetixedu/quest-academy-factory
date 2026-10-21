// PUC Physics Ep 59: Contact and non-contact forces (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, XC = C.violet;   // every force orange, a red, v blue, gap (a distance) violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f1 = v => v.toFixed(1);
const floor = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const handG = (p, w = 130, h = 56) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w, y: -h / 2, width: w, height: h, rx: h / 2.4, fill: '#E8B98F', stroke: C.ink, 'stroke-width': 3 }); [0, 1, 2].forEach(k => mk(g, 'line', { x1: -w * 0.42, y1: -h / 2 + 14 + k * 12, x2: -10, y2: -h / 2 + 14 + k * 12, stroke: '#B7835B', 'stroke-width': 2.5, 'stroke-linecap': 'round' })); txt(g, -w * 0.72, 7, 'HAND', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 15 }); return g; };
const combG = (p, w = 200) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -30, width: w, height: 18, rx: 5, fill: C.ink }); for (let x = -w / 2 + 6; x < w / 2 - 2; x += 9) mk(g, 'line', { x1: x, y1: -12, x2: x, y2: 0, stroke: C.ink, 'stroke-width': 3.5 }); return g; };

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  pen: ['M12 2v14', 'M9 5h6v11l-3 5-3-5z'],
  magnet: ['M6 3v8a6 6 0 0 0 12 0V3', 'M6 3h4v8a2 2 0 0 0 4 0V3h4', 'M6 7h4', 'M14 7h4'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v6', 'M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 16 0v-2a2 2 0 0 0-4 0'],
  book: ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'],
  box: ['M3 7h18v13H3z', 'M3 7l3-4h12l3 4'],
  rope: ['M2 12c3-3 5 3 8 0s5 3 8 0 3-1 4 0'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20', 'M12 2a15 15 0 0 0 0 20'],
  comb: ['M3 8h18v4H3z', 'M5 12v6', 'M8 12v6', 'M11 12v6', 'M14 12v6', 'M17 12v6', 'M20 12v6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tG2 = T0('G2');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ball', 'Kick a ball', 'FOOT TOUCHES IT', 'Kick', 1], ['pen', 'Drop a pen', 'NOTHING TOUCHES IT', 'Drop', 0], ['magnet', 'Magnet + note', 'HOLDS ACROSS A GAP', 'magnet', 0]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="background:${c ? 'var(--soft)' : 'var(--ac2)'};color:${c ? 'var(--ink)' : 'var(--ac)'};border:2px solid ${c ? 'var(--line)' : 'var(--ac)'}">${c ? 'TOUCH' : 'NO TOUCH'}</div></div>`).join('');
const TILES = [[C.ink, 'Rubbed comb', 'comb'], [C.ink, 'Bits jump up', 'arrowU'], [C.ac, 'How does it cross the gap?', 'help']];
M.IC.arrowU = ['M12 19V5', 'm5 12 7-7 7 7'];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'comb'), wt('H4', 'jump'), wt('H4', 'How')];
const hk = $('#hkS'), PB = [[150, 300, -8], [190, 306, 12], [232, 298, 4], [268, 305, -14], [306, 300, 9], [342, 304, -4]];
const hComb = mk(hk, 'g', {}), hCombI = combG(hComb, 240);
const hBits = PB.map(([x, y, r]) => { const b = mk(hk, 'rect', { x: -9, y: -4, width: 18, height: 8, rx: 1.5, fill: '#fff', stroke: C.ink, 'stroke-width': 1.5 }); return { b, x, y, r }; });
const hGap = mk(hk, 'g', {}); { mk(hGap, 'line', { x1: 400, y1: 214, x2: 400, y2: 292, stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '5 5' }); txt(hGap, 410, 258, 'GAP', { fill: XC, 'font-weight': 700, 'font-size': 18 }); }

/* ---------- P: the two families ---------- */
const PC = [['hand', 'Push or pull by hand', 'a hand pushing a door', 'hand'], ['book', 'Normal force', 'a table holding up a book', 'table'], ['box', 'Friction', 'a box sliding on the floor', 'Friction'], ['rope', 'Tension', 'the pull of a tight rope', 'tight']];
$('#pcs').innerHTML = PC.map(([ic, n, e], i) => `<div class="fr" id="pc${i}" style="top:${84 + i * 116}px"><i>${M.icon(ic, 30, FC, 2.2)}</i><div class="fn">${n}</div><div class="fe">${e}</div></div>`).join('');
const tPc = PC.map(p => wt('P3', p[3]));
const PN = [['globe', 'Gravity', 'Earth pulls a falling pen', 'Gravity'], ['magnet', 'Magnetic force', 'a magnet pulls a pin', 'magnet'], ['zap', 'Electric force', 'a charged comb pulls paper bits', 'charged']];
$('#pns').innerHTML = PN.map(([ic, n, e], i) => `<div class="fr" id="pn${i}" style="top:${84 + i * 116}px"><i>${M.icon(ic, 30, FC, 2.2)}</i><div class="fn">${n}</div><div class="fe">${e}</div><svg width="150" height="60"><line x1="10" y1="30" x2="54" y2="30" stroke="${FC}" stroke-width="5" stroke-linecap="round"/><path d="M50,20 L66,30 L50,40 Z" fill="${FC}"/><line x1="74" y1="30" x2="110" y2="30" stroke="${XC}" stroke-width="3" stroke-dasharray="4 5"/><circle cx="128" cy="30" r="12" fill="${C.ink}"/></svg></div>`).join('') +
  `<div class="pillp ac" id="pnP" style="left:36px;top:458px">Nothing touches, the force still acts</div>`;
const tPn = PN.map(p => wt('P5', p[3]));

/* ---------- S: the touch test sim ---------- */
const s = $('#simS'), L1Y = 250, BX0 = 470, BW = 120, PXH = 3;           // lane 1: block left edge at 470, 3 px per mm
floor(s, 40, 744, L1Y);
const blkO = mk(s, 'g', {}), blk = mk(blkO, 'g', {});
mk(blk, 'rect', { x: BX0, y: L1Y - 90, width: BW, height: 90, rx: 10, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); txt(blk, BX0 + BW / 2, L1Y - 38, 'BLOCK', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
const handO = mk(s, 'g', {}), hand = handG(handO);
const gap1 = mk(s, 'line', { x1: 0, y1: L1Y - 74, x2: 0, y2: L1Y - 74, stroke: XC, 'stroke-width': 3 });
const gap1L = txt(s, 0, L1Y - 112, '', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 18 });
const aH = PUC.arrow(s, FC, 7, 20), aHl = it(s, 0, 0, 'F', FC, { 'font-size': 26 });
const L2Y = 540, PY0 = 532, PXC = 4, PX = 560;                            // lane 2: table at 540, paper top 532, 4 px per mm
floor(s, 40, 744, L2Y);
const pGh = [0, 1, 2].map(() => mk(s, 'rect', { x: PX - 32, y: PY0, width: 64, height: 8, rx: 1.5, fill: C.ink, opacity: 0 }));
const paper = mk(s, 'rect', { x: PX - 32, y: PY0, width: 64, height: 8, rx: 1.5, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
const combO = mk(s, 'g', {}), comb = combG(combO, 220);
const gap2 = mk(s, 'line', { x1: PX + 140, y1: 0, x2: PX + 140, y2: PY0, stroke: XC, 'stroke-width': 3 });
const gap2L = txt(s, PX + 154, 0, '', { fill: XC, 'font-weight': 600, 'font-size': 18 });
const lead = mk(s, 'line', { x1: PX - 150, y1: 0, x2: PX - 34, y2: 0, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '4 5', opacity: 0 });
const aC = PUC.arrow(s, FC, 6, 18), aCl = txt(s, 0, 0, 'pull of comb', { fill: FC, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
const aWp = PUC.arrow(s, FC, 6, 18), aWl = txt(s, 0, 0, 'W', { fill: FC, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
// physics (example figures): paper bit 2 mg, W = 19.6 uN; comb pull F = k / d^2 with F(10 mm) = 24.5 uN
const Wp = 19.6, kC = 2450, Fc = d => kC / (d * d);
// timelines
const tTouch = wt('S3', 'Touch') - 0.05;
const dHk = M.keys([[0, 30], [wt('S2', 'Ten') - 0.7, 10], [wt('S2', 'One') - 0.6, 1], [tTouch - 0.3, 0]], 0.6);
const tPush = wt('S3', 'push') - 0.1, pushX = t => 70 * M.io((t - tPush) / 1.4);
const dCk = M.keys([[0, 40], [wt('S4', 'Closer') - 0.1, 20], [wt('S5', 'ten') - 0.7, 10]], 0.9);
const tJ = wt('S5', 'jumps') - 0.15, JD = 0.35;                         // paper flight time at normal speed
const tRp0 = wt('S7', 'Freeze') - 0.45, tFz = wt('S7', 'Freeze') + 0.15, tRes = wt('S8', 'rises') - 0.3;
function lift(t) {                     // 0..1 of the paper's 10 mm rise (accelerating)
  if (t >= tS7 - 0.1) {
    if (t < tRp0) return 0;
    const tau = t < tFz ? 0.25 * (t - tRp0) : t < tRes ? 0.25 * (tFz - tRp0) : 0.25 * (tFz - tRp0) + 0.25 * (t - tRes);
    return Math.min(1, (tau / JD) ** 2);
  }
  if (t < tJ) return 0; return Math.min(1, ((t - tJ) / JD) ** 2);
}
$('#roA').innerHTML = `<span class="k" style="color:${XC}">d<sub>1</sub></span><span class="v" id="r_d1" style="color:${XC}">30</span><span class="u">mm</span>
  <span class="k" style="color:${FC}">F<sub>hand</sub></span><span class="v" id="r_f1" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">touch</span><span class="v" id="r_tc" style="font-size:30px">no</span><span class="u"></span>`;
$('#roB').innerHTML = `<span class="k" style="color:${XC}">d<sub>2</sub></span><span class="v" id="r_d2" style="color:${XC}">40</span><span class="u">mm</span>
  <span class="k" style="color:${FC}">F<sub>comb</sub></span><span class="v" id="r_f2" style="color:${FC}">1.5</span><span class="u">µN</span>
  <span class="k" style="color:${FC}">W</span><span class="v" style="color:${FC}">19.6</span><span class="u">µN</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 520, h: 156, xmax: 40, ymax: 100, xt: [0, 10, 20, 30, 40], yt: [0, 25, 50, 75], yl: 'F (µN)' });
txt($('#grS'), 110 + 520 + 16, 64 + 156 + 6, 'd (mm)', { fill: XC, 'font-size': 18 });
const gW = mk($('#grS'), 'line', { x1: g.X(0), y1: g.Y(Wp), x2: g.X(40), y2: g.Y(Wp), stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const gWt = txt($('#grS'), g.X(40) + 10, g.Y(Wp) + 6, 'W', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const gComb = g.curve(FC, 5);
const gHand = mk($('#grS'), 'path', { d: `M${g.X(40)},${g.Y(0) - 3} H${g.X(0) + 3} V${g.Y(100)}`, fill: 'none', stroke: C.ink2, 'stroke-width': 4, 'stroke-dasharray': '9 7', 'stroke-linejoin': 'round' });
const gHl = txt($('#grS'), g.X(0) + 14, g.Y(70), 'hand: 0 until d = 0', { fill: C.ink2, 'font-weight': 600, 'font-size': 17 });
const gCl = txt($('#grS'), g.X(14), g.Y(52), 'comb', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const gDot = g.dot(FC, 11);
const avS = PUC.avatar($('#sS'), { x: 160 + 330, y: 270 + 276, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'It never touched it!' });

/* ---------- D: the key idea ---------- */
const Fcp = `\\vec{F}_{\\text{comb on paper}} = -\\vec{F}_{\\text{paper on comb}}`, Feb = `\\vec{F}_{\\text{Earth on ball}} = -\\vec{F}_{\\text{ball on Earth}}`;
const STEPS = [['A force always needs two bodies', 'one acts, one feels it', 0], ['It works both ways', 'comb pulls paper, paper pulls comb, just as hard', 0], ['Contact: the pair acts where surfaces touch', 'hand pushes block, block pushes hand', 0], ['Non-contact: the pair acts across the gap', 'Earth pulls ball down, ball pulls Earth up', 0]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([a, b, k], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${a}</div><div class="why" style="${k ? '' : 'font:500 23px Poppins;color:var(--mute);top:50px'}">${b}</div></div>`).join('');
const tStep = ['D2', 'D3', 'D4', 'D5'].map(id => wt(id, 'Step'));
const dr = $('#drS');
const DCOL = [[130, 'NON-CONTACT'], [392, 'CONTACT'], [654, 'NON-CONTACT']];
const dHead = DCOL.map(([x, s0]) => txt(dr, x, 100, s0, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 17, 'letter-spacing': 1.5, fill: s0 === 'CONTACT' ? C.ink : C.ac }));
const dG = [mk(dr, 'g', {}), mk(dr, 'g', {}), mk(dr, 'g', {})];
{ const c0 = mk(dG[0], 'g', { transform: 'translate(130,170)' }); combG(c0, 150); mk(dG[0], 'rect', { x: 106, y: 360, width: 48, height: 7, rx: 1.5, fill: '#fff', stroke: C.ink, 'stroke-width': 2 }); txt(dG[0], 130, 420, 'comb ⇄ paper', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }); }
{ const h = mk(dG[1], 'g', { transform: 'translate(372,300)' }); handG(h, 110, 50); mk(dG[1], 'rect', { x: 372, y: 262, width: 90, height: 76, rx: 9, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 }); txt(dG[1], 392, 420, 'hand ⇄ block', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }); }
{ mk(dG[2], 'circle', { cx: 654, cy: 180, r: 20, fill: C.ink }); mk(dG[2], 'path', { d: 'M544,400 A150,150 0 0 1 764,400 Z', fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 3 }); txt(dG[2], 654, 440, 'Earth ⇄ ball', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }); }
const dA = [[PUC.arrow(dr, FC, 6, 18), PUC.arrow(dr, FC, 6, 18)], [PUC.arrow(dr, FC, 6, 18), PUC.arrow(dr, FC, 6, 18)], [PUC.arrow(dr, FC, 6, 18), PUC.arrow(dr, FC, 6, 18)]];
const dF = document.createElement('div'); dF.className = 'fx'; dF.style.cssText = 'left:36px;top:478px;font-size:40px;height:76px;padding:0 24px;border-radius:14px;background:var(--ac2);display:flex;align-items:center'; dF.innerHTML = K(`${tc(FC, '\\vec{F}_{AB}')} = -${tc(FC, '\\vec{F}_{BA}')}`) + `<span style="font:500 24px Poppins;color:var(--mute);margin-left:20px">equal size, opposite direction</span>`; $('#dr').appendChild(dF);
$('#stF').innerHTML = K(`${tc(FC, '\\vec{F}_{AB}')} = -${tc(FC, '\\vec{F}_{BA}')}`);

/* ---------- R: link by link ---------- */
const LK = [['Everything is made of atoms', wt('R2', 'atoms')], ['Electrons sit on the outside', wt('R2', 'electrons')], ['Hand and block atoms come very close', wt('R3', 'close')], ['Electrons repel: an <span class="fo">electric force</span>', wt('R4', 'electric')], ['We feel it as a <span class="fo">push</span>', wt('R5', 'push')]];
$('#lks').innerHTML = LK.map(([a], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 96}px"><div class="ln">${i + 1}</div><div class="lt">${a}</div></div>`).join('');
const rr = $('#rrS'), RA = [140, 230, 320, 410];
const atomP = (p, cx, cy, col) => { const gg = mk(p, 'g', {}); mk(gg, 'circle', { cx, cy, r: 34, fill: M.mix(col, '#FFFFFF', 0.82), stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }); mk(gg, 'circle', { cx, cy, r: 8, fill: col }); return gg; };
const rLO = mk(rr, 'g', {}), rL = mk(rLO, 'g', {}), rRi = mk(rr, 'g', {});
RA.forEach(y => { atomP(rL, 0, y, '#B7835B'); atomP(rRi, 520, y, C.ink2); });
const rLt = txt(rr, 0, 470, 'HAND', { 'text-anchor': 'middle', fill: '#B7835B', 'font-weight': 600, 'font-size': 18 }), rRt = txt(rr, 520, 470, 'BLOCK', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 18 });
const rArr = RA.map(() => [PUC.arrow(rr, FC, 5, 15), PUC.arrow(rr, FC, 5, 15)]);
const rGx = M.keys([[0, 260], [wt('R3', 'close') - 0.6, 420]], 1.2);     // left column x

/* ---------- K: contact vs non-contact ---------- */
const k1 = $('#k1S'), KG = 360;
floor(k1, 40, 744, KG);
const kBk = mk(k1, 'g', {}); mk(kBk, 'rect', { x: 0, y: KG - 60, width: 150, height: 60, rx: 8, fill: VC, stroke: C.ink, 'stroke-width': 3 }); txt(kBk, 75, KG - 23, 'BOOK', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const kHand = mk(k1, 'g', {}), kHandI = handG(kHand, 120, 50);
const kF = PUC.arrow(k1, FC, 7, 20), kFl = it(k1, 0, 0, 'F', FC, { 'font-size': 26 });
const kTag = txt(k1, 392, 150, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 20 });
$('#k1P').innerHTML = `${M.icon('hand', 24, FC, 2.4)}<span>Touch ends, the push ends</span>`;
const tKp = wt('K1', 'hand') - 0.1, tKs = wt('K1', 'Stop') - 0.05;
const kbX = t => 230 + 120 * M.io((t - tKp - 0.2) / 1.6);                // book slides while pushed
const kHX = t => { const b = kbX(t); return t < tKs ? (t < tKp ? b - 60 : b) : b - 90 * M.io((t - tKs) / 0.5); };
const k2 = $('#k2S');
floor(k2, 40, 744, 470);
const pen = (p) => { const gg = mk(p, 'g', {}); mk(gg, 'rect', { x: -9, y: -48, width: 18, height: 80, rx: 4, fill: VC, stroke: C.ink, 'stroke-width': 2.5 }); mk(gg, 'path', { d: 'M-9,32 L0,48 L9,32 Z', fill: '#EBD3AE', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); return gg; };
const kPg = [0.3, 0.2, 0.12].map(o => { const gg = pen(k2); gg.setAttribute('opacity', 0); return gg; });
const kPen = pen(k2);
const kW = PUC.arrow(k2, FC, 7, 20), kWl = it(k2, 0, 0, 'W', FC, { 'font-size': 26 });
$('#k2P').innerHTML = `${M.icon('globe', 24, FC, 2.4)}<span>No touch, yet the pull never stops</span>`;
const tPf = wt('K2', 'pulling') - 0.1, PFD = 1.6;                          // the pen falls 330 px in 1.6 s, then again
const penY = t => { if (t < tPf) return 110; const tau = ((t - tPf) % (PFD + 0.5)); return 110 + 330 * Math.min(1, (tau / PFD) ** 2); };
const th1 = PUC.think($('#th1'), { q: 'Air pushing back on a falling raindrop: contact or non-contact?', opts: ['Contact', 'Non-contact'], right: 0, why: 'Air molecules hit the surface of the drop and push on it.' });

/* ---------- G: across empty space ---------- */
const gs = $('#gsS'), SUN = [260, 300], EAR = [1300, 300];
const sunG = mk(gs, 'g', {}); mk(sunG, 'circle', { cx: SUN[0], cy: SUN[1], r: 120, fill: '#F2C94C', stroke: C.ink, 'stroke-width': 3 }); txt(sunG, SUN[0], SUN[1] + 8, 'SUN', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 });
const earG = mk(gs, 'g', {}); mk(earG, 'circle', { cx: EAR[0], cy: EAR[1], r: 36, fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 3 }); txt(earG, EAR[0], EAR[1] + 74, 'EARTH', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const orb = mk(gs, 'path', { d: `M${EAR[0]},${EAR[1] - 220} A${EAR[0] - SUN[0]},${EAR[0] - SUN[0]} 0 0 1 ${EAR[0]},${EAR[1] + 220}`, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const gE = PUC.arrow(gs, FC, 7, 20), gSn = PUC.arrow(gs, FC, 7, 20);
const gEl = txt(gs, EAR[0] - 120, EAR[1] - 26, 'Sun pulls Earth', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 }), gSl = txt(gs, SUN[0] + 250, SUN[1] - 26, 'Earth pulls Sun', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
const gBr = mk(gs, 'path', { d: `M${SUN[0]},${SUN[1] + 170} v14 H${EAR[0]} v-14`, fill: 'none', stroke: XC, 'stroke-width': 3 });
const gBl = txt(gs, (SUN[0] + EAR[0]) / 2, SUN[1] + 222, 'about 150 million km of empty space', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 24 });
const gNo = mk(gs, 'g', {}); { mk(gNo, 'rect', { x: 700, y: 90, width: 190, height: 44, rx: 9, fill: C.redBg }); txt(gNo, 795, 120, 'NO AIR', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 20, 'letter-spacing': 2 }); }
const th2 = PUC.think($('#th2'), { q: 'In empty space, with no air at all, would a magnet still pull a steel pin?', opts: ['Yes', 'No'], right: 0, why: 'A magnetic force needs no medium. It acts across empty space.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ${K('50\\ \\text{g}')} magnet sticks to a steel cupboard door, which pulls it in with ${K(tc(FC, '3\\ \\text{N}'))}. List every force on the magnet. ${K('(g = 9.8\\ \\text{m/s}^2)')}`;
const wsol = PUC.solution($('#wl'), [
  [`Gravity (Earth) · non-contact · <span class="fo mono">0.49 N</span> down`],
  [`Magnetic pull (door) · non-contact · <span class="fo mono">3 N</span> in`],
  [`Normal push (door) · contact · <span class="fo mono">3 N</span> out`],
  [`Friction (door) · contact · <span class="fo mono">0.49 N</span> up`]], { label: 'WORKED EXAMPLE', y0: 236, dy: 80 });
$('#wl .lbl').style.top = '30px';
const wTot = document.createElement('div'); wTot.className = 'pillp ink'; wTot.style.cssText = 'left:36px;top:504px'; wTot.innerHTML = '2 contact + 2 non-contact · net force = 0'; $('#wl').appendChild(wTot);
const w = $('#wrS'), DXd = 300, MG = [340, 270, 90, 64], WS = 60;     // door at x 300-340; magnet box; 60 px per newton
mk(w, 'rect', { x: DXd - 60, y: 84, width: 100, height: 400, rx: 6, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 3 });
txt(w, DXd - 10, 504, 'STEEL DOOR', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 16 });
const wMag = mk(w, 'g', {}); mk(wMag, 'rect', { x: MG[0], y: MG[1], width: MG[2], height: MG[3], rx: 8, fill: AC, stroke: C.ink, 'stroke-width': 3 }); txt(wMag, MG[0] + 45, MG[1] + 39, '50 g', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const MC = [MG[0] + MG[2] / 2, MG[1] + MG[3] / 2];
const wA = [PUC.arrow(w, FC, 6, 16), PUC.arrow(w, FC, 7, 20), PUC.arrow(w, FC, 7, 20), PUC.arrow(w, FC, 6, 16)];
const WL = [['W 0.49 N', 'NON-CONTACT'], ['magnetic 3 N', 'NON-CONTACT'], ['normal 3 N', 'CONTACT'], ['friction 0.49 N', 'CONTACT']].map(([a, b]) => { const gg = mk(w, 'g', {}); const t1 = txt(gg, 0, 0, a, { fill: FC, 'font-weight': 700, 'font-size': 20 }); const t2 = txt(gg, 0, 22, b, { fill: b === 'CONTACT' ? C.ink : C.ac, 'font-weight': 600, 'font-size': 14, 'letter-spacing': 1.2 }); return gg; });
const WP = [[MC[0] + 14, MG[1] + MG[3] + 54], [60, MC[1] - 40], [MG[0] + MG[2] + 200, MC[1] + 34], [MC[0] + 14, MG[1] - 44]];
const tWl = [wt('W3', 'Gravity'), wt('W4', 'magnetic'), wt('W5', 'door'), wt('W6', 'friction')];
const avW = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The door pulls and pushes at the same time!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'In the air, a "force of the throw" still pushes the ball up', right: 'In the air: only gravity (ignoring air). The push ended at release.' });
const tp = $('#tpS');
floor(tp, 300, 540, 250);
const tHand = mk(tp, 'g', { transform: 'translate(470,236) rotate(-90)' }); handG(tHand, 70, 40);
const tBall = mk(tp, 'circle', { cx: 450, cy: 150, r: 18, fill: C.ink });
const tW = PUC.arrow(tp, FC, 6, 16), tpWl = txt(tp, 470, 0, 'W', { fill: FC, 'font-weight': 700, 'font-size': 20 });
const tUp = PUC.arrow(tp, C.red, 5, 14), tX = txt(tp, 0, 0, '✕', { fill: C.red, 'font-weight': 700, 'font-size': 30, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Name every force on a body, then draw its free body diagram' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ${K('0.2\\ \\text{kg}')} iron ball hangs at rest from a thread. A magnet beside it pulls it sideways with ${K(tc(FC, '1.5\\ \\text{N}'))}, without touching it. Find the tension in the thread. ${K('(g = 10\\ \\text{m/s}^2)')}`,
  opts: ['2.0 N', '2.5 N', '3.5 N', '0.5 N'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${tc(FC, 'W')} = 0.2 \\times 10 = 2\\ \\text{N}`)], ['Thread balances <span class="fo">2 N</span> down + <span class="fo">1.5 N</span> side'], [K(`${tc(FC, 'T')} = \\sqrt{2^2 + 1.5^2}`)], [K(`${tc(FC, 'T')} = \\sqrt{6.25} = ${tc(C.ok, '2.5\\ \\text{N}')}`)]], { y0: 100, dy: 112 });
$('#so').querySelectorAll('.sol .sx')[1].style.font = '500 22px Poppins';
const tSo = [wt('A2', 'weight'), wt('A3', 'thread'), wt('A4', 'root'), wt('A4', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 470, title: 'Recap · contact and non-contact forces', y0: 100, dy: 90, txt: [1, 1, 0, 1],
  lines: ['<b>Contact</b>: push, normal force, friction, tension, air drag',
    '<b>Non-contact</b>: gravity, magnetic, electric · no medium needed',
    `${K(`${tc(FC, '\\vec{F}_{AB}')} = -${tc(FC, '\\vec{F}_{BA}')}`)}<span style="font:500 30px Poppins;margin-left:24px">every force is an interaction</span>`,
    'Deep down, contact forces are electric forces between atoms'] });
const YQ = ['Why does the paper jump before the comb touches it?', 'Is the force of air on a falling raindrop contact or non-contact?', 'Which forces act on a ball in the air, after it leaves your hand?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 60', topic: 'How does a table know how hard to push? Normal Reaction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tD1 - 0.5, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); vis($('#jt' + i), t, wt('H2', 'nothing') + (i ? 0.2 : -0.2) + i * 0.15, 1e9, POP); });
    vis($('#hjP'), t, wt('H2', 'pulls') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkW'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    // comb comes in over the paper, then the bits jump (accelerating) up to it
    const cy = M.lerp(150, 210, M.io((t - wt('H3', 'holds')) / 0.8)); attr(hCombI, 'transform', `translate(246,${cy.toFixed(1)})`); vis(hComb, t, wt('H3', 'comb') - 0.2, 1e9, { dy: -30 });
    hBits.forEach((q, k) => { const tj = wt('H4', 'jump') + k * 0.07, u = Math.min(1, Math.max(0, (t - tj) / 0.32) ** 2), y = M.lerp(q.y, cy + 8, u); attr(q.b, 'transform', `translate(${q.x},${y.toFixed(1)}) rotate(${(q.r * (1 - u)).toFixed(1)})`); });
    vis(hGap, t, wt('H4', 'touches') - 0.4, wt('H4', 'jump') + 0.05 > t ? 1e9 : 1e9, { dy: 0 });
    hGap.style.opacity = (M.io((t - wt('H3', 'paper') - 0.1) / 0.3) * (1 - M.io((t - wt('H4', 'jump')) / 0.2))).toFixed(3);
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pc'), t, T0('P2') - 0.1, out, { dx: -60, dy: 0, ...o });
    PC.forEach((_, i) => vis($('#pc' + i), t, tPc[i] - 0.15, 1e9, POP));
    vis($('#pn'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    PN.forEach((_, i) => vis($('#pn' + i), t, tPn[i] - 0.15, 1e9, POP));
    vis($('#pnP'), t, wt('P5', 'paper') - 0.1, 1e9, POP);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    // lane 1: hand -> block
    const d1 = dHk(t), px = pushX(t), hx = BX0 - d1 * PXH + px;
    attr(hand, 'transform', `translate(${hx.toFixed(1)},${L1Y - 45})`); vis(handO, t, wt('S1', 'hand') - 0.1, 1e9, { dx: -30, dy: 0 });
    attr(blk, 'transform', `translate(${px.toFixed(1)},0)`); vis(blkO, t, wt('S1', 'block') - 0.15, 1e9, { dy: 16 });
    const touch = t >= tTouch, gOn1 = !touch && t > wt('S2', 'closer') - 0.2;
    attr(gap1, 'x1', hx.toFixed(1)); attr(gap1, 'x2', (BX0 + px).toFixed(1)); M.hide(gap1, !gOn1 || d1 < 0.5);
    attr(gap1L, 'x', (hx + d1 * PXH / 2).toFixed(1)); M.setT(gap1L, Math.round(d1) + ' mm'); M.hide(gap1L, !gOn1);
    const fh = touch ? M.o3((t - tTouch) / 0.25) : 0;
    aH.set(BX0 + px + 6, L1Y - 120, BX0 + px + 6 + 90 * fh, L1Y - 120); attr(aHl, 'x', (BX0 + px + 104).toFixed(1)); attr(aHl, 'y', L1Y - 112); aHl.style.opacity = fh.toFixed(3);
    // lane 2: comb -> paper
    const d2 = dCk(t), cb = PY0 - d2 * PXC, lf = lift(t), py = PY0 - lf * (PY0 - (PY0 - 10 * PXC) - 0) ;
    const pY = lf > 0 || t >= tJ ? PY0 - lf * 10 * PXC : PY0;
    attr(comb, 'transform', `translate(${PX},${cb.toFixed(1)})`); vis(combO, t, wt('S1', 'comb') - 0.1, 1e9, { dy: -20 });
    attr(paper, 'y', pY.toFixed(1)); vis(paper, t, wt('S1', 'paper') - 0.1, 1e9, { dy: 0 });
    const mv2 = lf > 0 && lf < 1;
    pGh.forEach((r, k) => { const q = lift(t - (t > tS7 ? 0.3 : 0.07) * (k + 1)); attr(r, 'y', (PY0 - q * 10 * PXC).toFixed(1)); r.setAttribute('opacity', mv2 && q < lf - 0.02 ? [0.3, 0.2, 0.12][k] : 0); });
    const gap2v = (pY - cb) / PXC, g2On = t > wt('S4', 'comb') - 0.2 && gap2v > 0.6;
    attr(gap2, 'y1', cb.toFixed(1)); attr(gap2, 'y2', pY.toFixed(1)); M.hide(gap2, !g2On);
    attr(gap2L, 'y', ((cb + pY) / 2 + 6).toFixed(1)); M.setT(gap2L, Math.round(gap2v) + ' mm'); M.hide(gap2L, !g2On);
    // slow-mo force arrows on the paper (3 px per uN)
    const rep = t >= tFz - 0.05 && t < tRes + 1.2, ua = rep ? M.o3((t - wt('S8', 'comb') + 0.1) / 0.5) : 0, uw = rep ? M.o3((t - wt('S8', 'Gravity') + 0.1) / 0.5) : 0;
    const dNow = Math.max(gap2v, 1), Fnow = Math.min(Fc(dNow), 40);
    aC.set(PX - 150, pY, PX - 150, pY - 1.5 * Fnow * ua); attr(lead, 'y1', (pY + 4).toFixed(1)); attr(lead, 'y2', (pY + 4).toFixed(1)); lead.style.opacity = Math.max(ua, uw).toFixed(3); attr(aCl, 'x', PX - 162); attr(aCl, 'y', (pY - 1.5 * Fnow * ua + 16).toFixed(1)); aCl.style.opacity = ua.toFixed(3);
    aWp.set(PX - 150, pY + 9, PX - 150, pY + 9 + 1.5 * Wp * uw); attr(aWl, 'x', PX - 162); attr(aWl, 'y', (pY + 9 + 1.5 * Wp * uw).toFixed(1)); aWl.style.opacity = uw.toFixed(3);
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz + 0.05, tRes, { ...POP, sc: 0.8 });
    if (t >= tRes) vis($('#smo'), t, tRes + 0.05, tD1 - 0.4, { ...POP, sc: 0.8 });
    // readout (round the gap first, then compute)
    const d1r = Math.round(d1), d2r = Math.max(0, Math.round(gap2v));
    M.setT($('#r_d1'), touch ? '0' : String(d1r)); M.setT($('#r_f1'), touch ? '2.0' : '0.0'); M.setT($('#r_tc'), touch ? 'yes' : 'no');
    $('#r_tc').style.color = touch ? C.ok : C.ink;
    const stuck = lf >= 1;
    M.setT($('#r_d2'), String(stuck ? 0 : d2r)); M.setT($('#r_f2'), stuck ? 'held' : f1(Fc(Math.max(d2r, 1))));
    // graph
    const lane2 = t >= T0('S4') - 0.2;
    gComb((q) => [q, Math.min(Fc(q), 100)], Math.max(4.95, lane2 ? Math.min(lf >= 1 ? dCk(t) : gap2v, 40) : 40), 40);
    vis(gW, t, tS1 + 0.8, 1e9, { dy: 0 }); vis(gWt, t, tS1 + 0.8, 1e9, { dy: 0 });
    M.draw(gHand, t, tTouch - 0.1, 0.8); vis(gHl, t, wt('S6', 'hand') - 0.1, 1e9, { dy: 6 }); vis(gCl, t, wt('S6', 'comb') - 0.1, 1e9, { dy: 6 });
    if (!lane2) gDot(Math.min(d1, 40), touch ? 100 : 0, t > wt('S2', 'closer') - 0.2);
    else gDot(Math.min(Math.max(stuck ? d2 : gap2v, 4.95), 40), Math.min(Fc(Math.max(stuck ? d2 : gap2v, 4.95)), 100), !stuck || t > tS7);
    avS(t, wt('S5', 'jumps') + 0.4, tS7 - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); PUC.write(el.querySelector('.why'), t, tStep[i] + 1.2, 0.8); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 196], [tStep[2] - 0.1, 308], [tStep[3] - 0.1, 420]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const cIn = [wt('D3', 'comb'), wt('D4', 'contact'), wt('D5', 'Earth')];
    dG.forEach((gg, i) => { vis(gg, t, cIn[i] - 0.3, 1e9, { dy: 16 }); vis(dHead[i], t, cIn[i] - 0.3, 1e9, { dy: 8 }); });
    const u0a = M.o3((t - wt('D3', 'pulls') + 0.1) / 0.5), u0b = M.o3((t - wt('D3', 'pulls', 1) + 0.1) / 0.5);
    dA[0][0].set(130, 356, 130, 356 - 80 * u0a); dA[0][1].set(130, 174, 130, 174 + 80 * u0b);
    const u1 = M.o3((t - wt('D4', 'pair') + 0.1) / 0.5);
    dA[1][0].set(466, 300, 466 + 80 * u1, 300); dA[1][1].set(258, 300, 258 - 80 * u1, 300);
    const u2a = M.o3((t - wt('D5', 'pulls') + 0.1) / 0.5), u2b = M.o3((t - wt('D5', 'pulls', 1) + 0.1) / 0.5);
    dA[2][0].set(654, 204, 654, 204 + 80 * u2a); dA[2][1].set(654, 344, 654, 344 - 80 * u2b);
    vis(dF, t, wt('D5', 'up') + 0.3, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'touching') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach(([, tt], i) => vis($('#lk' + i), t, tt - 0.15, 1e9, { dx: -24, dy: 0 }));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    const lx = rGx(t); attr(rL, 'transform', `translate(${lx.toFixed(1)},0)`); attr(rLt, 'x', lx.toFixed(1));
    vis(rLO, t, wt('R2', 'atoms') - 0.2, 1e9, { dx: -20, dy: 0 }); vis(rRi, t, wt('R2', 'atoms'), 1e9, { dx: 20, dy: 0 });
    vis(rLt, t, wt('R3', 'hand') - 0.1, 1e9, { dy: 0 }); vis(rRt, t, wt('R3', 'block') - 0.1, 1e9, { dy: 0 });
    const gp = 520 - lx - 68, ue = M.o3((t - wt('R4', 'push') + 0.1) / 0.5), L = Math.min(56, 2400 / Math.max(gp, 20) ** 1) * ue;
    RA.forEach((y, i) => { rArr[i][0].set(lx - 36, y, lx - 36 - L, y); rArr[i][1].set(556, y, 556 + L, y); });
    vis($('#rrP'), t, wt('R5', 'contact') - 0.1, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#k1'), t, tK1 + 0.2, out, { dx: -60, dy: 0, ...o });
    const bx = kbX(t), hx = kHX(t), on = t >= tKp && t < tKs;
    attr(kBk, 'transform', `translate(${bx.toFixed(1)},0)`); attr(kHandI, 'transform', `translate(${hx.toFixed(1)},${KG - 30})`); vis(kHand, t, tKp - 0.4, 1e9, { dx: -30, dy: 0 });
    const uf = on ? M.o3((t - tKp) / 0.3) : (t >= tKs ? 1 - M.io((t - tKs) / 0.2) : 0);
    kF.set(bx + 150 + 6, KG - 30, bx + 156 + 90 * uf, KG - 30); attr(kFl, 'x', (bx + 160 + 90 * uf).toFixed(1)); attr(kFl, 'y', KG - 40); kFl.style.opacity = uf.toFixed(3);
    M.setT(kTag, t < tKs ? 'touching: F = push' : 'not touching: F = 0'); kTag.setAttribute('fill', t < tKs ? FC : C.mute); vis(kTag, t, tKp, 1e9, { dy: 0 });
    vis($('#k1P'), t, wt('K1', 'gone') - 0.1, 1e9, POP);
    vis($('#k2'), t, T0('K2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const py = penY(t); attr(kPen, 'transform', `translate(392,${py.toFixed(1)})`);
    kPg.forEach((gg, k) => { const q = penY(t - 0.1 * (k + 1)); attr(gg, 'transform', `translate(392,${q.toFixed(1)})`); gg.setAttribute('opacity', t > tPf && q < py - 4 ? [0.3, 0.2, 0.12][k] : 0); });
    const uw = M.o3((t - tPf - 0.1) / 0.4); kW.set(424, py, 424, py + 90 * uw); attr(kWl, 'x', 436); attr(kWl, 'y', (py + 70).toFixed(1)); kWl.style.opacity = uw.toFixed(3);
    vis($('#k2P'), t, wt('K2', 'goes') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Contact') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Air') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    vis($('#gs'), t, tG1 + 0.05, OUT('G2'), { dy: 36, ...o }); vis($('#exG'), t, tG1 + 0.4, 1e9, { dy: 8 });
    vis(sunG, t, wt('G1', 'Sun') - 0.2, 1e9, { dy: 16 }); vis(earG, t, wt('G1', 'Earth') - 0.2, 1e9, { dy: 16 }); M.hide(orb, true);
    const ug = M.o3((t - wt('G1', 'gravity') + 0.1) / 0.5);
    gE.set(EAR[0] - 44, EAR[1], EAR[0] - 44 - 130 * ug, EAR[1]); gSn.set(SUN[0] + 128, SUN[1], SUN[0] + 128 + 130 * ug, SUN[1]); gEl.style.opacity = gSl.style.opacity = ug.toFixed(3);
    M.draw(gBr, t, wt('G1', 'across') - 0.1, 0.6); vis(gBl, t, wt('G1', 'million') - 0.3, 1e9, { dy: 8 }); vis(gNo, t, wt('G1', 'air') - 0.1, 1e9, POP);
    vis($('#th2'), t, tG2 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG2, tOpts: wt('G2', 'would') - 0.1, tCount: T1('G2') + 0.05, dur: 3, tAns: T0('G3') - 0.02, tWhy: wt('G3', 'magnetic') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWl);
    vis(wTot, t, wt('W6', 'Two') - 0.1, 1e9, POP);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis(wMag, t, wt('W2', 'magnet') - 0.1, 1e9, { dx: 30, dy: 0 });
    const u = tWl.map(tt => M.o3((t - tt - 0.1) / 0.5));
    wA[0].set(MC[0], MG[1] + MG[3] + 4, MC[0], MG[1] + MG[3] + 4 + WS * 0.49 * u[0]);
    wA[1].set(MC[0], MC[1] - 14, MC[0] - WS * 3 * u[1], MC[1] - 14);
    wA[2].set(MG[0] + MG[2] + 4, MC[1] + 14, MG[0] + MG[2] + 4 + WS * 3 * u[2], MC[1] + 14);
    wA[3].set(MC[0], MG[1] - 4, MC[0], MG[1] - 4 - WS * 0.49 * u[3]);
    WL.forEach((gg, i) => { attr(gg, 'transform', `translate(${WP[i][0]},${WP[i][1]})`); gg.style.opacity = u[i].toFixed(3); });
    avW(t, wt('W6', 'non-contact') + 0.4, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'ball') - 0.2, tStrike: wt('X3', 'contact') - 0.1, tRight: wt('X3', 'air') - 0.2 });
    vis(tp, t, wt('X2', 'thrown') - 0.3, 1e9, { dy: 16 });
    const rel = wt('X3', 'leaves'), tf = Math.max(0, t - rel), by = t < rel ? 196 : Math.max(60, 196 - 150 * Math.min(1, tf / 0.9) + 0 * tf) ;
    const yb = t < rel ? 196 : 196 - 150 * (1 - (1 - Math.min(1, tf / 0.9)) ** 2);
    attr(tBall, 'cy', yb.toFixed(1));
    const ud = M.o3((t - wt('X2', 'upward') + 0.1) / 0.4) * (1 - M.io((t - wt('X3', 'ends')) / 0.3));
    tUp.set(410, yb + 10, 410, yb + 10 - 70 * ud); attr(tX, 'x', 410); attr(tX, 'y', (yb - 30).toFixed(1)); tX.style.opacity = (ud * M.io((t - wt('X3', 'contact') + 0.1) / 0.3)).toFixed(3);
    const uw = M.o3((t - wt('X3', 'gravity') + 0.1) / 0.4); tW.set(450, yb + 22, 450, yb + 22 + 60 * uw); attr(tpWl, 'y', (yb + 70).toFixed(1)); tpWl.style.opacity = uw.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'naming') });
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
