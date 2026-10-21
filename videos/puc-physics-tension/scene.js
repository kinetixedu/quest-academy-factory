// PUC Physics Ep 61: Tension (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink;      // every force orange (T, mg), a red, v blue, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }, a));
const halo = (...es) => es.forEach(e => { e.setAttribute('paint-order', 'stroke'); e.setAttribute('stroke', '#fff'); e.setAttribute('stroke-width', 6); e.setAttribute('stroke-linejoin', 'round'); });
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const TT = tc(FC, 'T'), MG = tc(FC, 'mg'), AA = tc(AC, 'a'), mm = tc(MC, 'm'), gg = 'g';
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const G = 9.8, MB = 5, WB = MB * G;            // the bucket: 5 kg, mg = 49 N
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);
const sg = v => (v > 0.0049 ? '+' : v < -0.0049 ? '-' : '') + Math.abs(v).toFixed(2);
const grow = (t, t0, d = 0.5) => M.o3((t - t0 + 0.1) / d);
const BUCKET = '#8D99AE';
// a bucket drawn with its handle; (x, y) = top centre of the rim. Returns the group.
const bucket = (p, x, y, w = 110, h = 84, water = true) => {
  const g = mk(p, 'g', {});
  mk(g, 'path', { d: `M${x - w / 2 + 6},${y - 6} Q${x},${y - 46} ${x + w / 2 - 6},${y - 6}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'path', { d: `M${x - w / 2},${y} L${x + w / 2},${y} L${x + w / 2 - 12},${y + h} L${x - w / 2 + 12},${y + h} Z`, fill: BUCKET, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  if (water) mk(g, 'path', { d: `M${x - w / 2 + 3},${y + 10} L${x + w / 2 - 3},${y + 10}`, stroke: '#7FB2F0', 'stroke-width': 5 });
  mk(g, 'rect', { x: x - w / 2 - 4, y: y - 4, width: w + 8, height: 8, rx: 4, fill: '#6B7486', stroke: C.ink, 'stroke-width': 2 });
  return g;
};
const pulley = (p, x, y, r) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: '#E6E8EE', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: y, r: 6, fill: C.ink }); return g; };

Object.assign(M.IC, {
  kite: ['M12 2 19 9 12 16 5 9Z', 'M12 16v3c0 1.5-1 2.5-2.5 2.5', 'M5 9h14', 'M12 2v14'],
  swing: ['M4 3h16', 'M8 3v13', 'M16 3v13', 'M6 16h12v2H6z'],
  rope: ['M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v6', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS4 = T0('S4'), tS9 = T0('S9'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['kite', 'Kite string', 'IT PULLS THE KITE', -50], ['swing', 'Swing ropes', 'THEY HOLD YOU UP', -90], ['rope', 'Tug of war', 'BOTH ENDS PULL', 0]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'kite'), wt('H1', 'swing'), wt('H1', 'team')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="250" height="100"></svg></div>`).join('');
// each row: a rope (ink) and the pull on the body (orange), pointing along the rope, away from the body
const JA = JOBS.map(([, , , ang], i) => { const s = $('#jsv' + i), a = ang * Math.PI / 180;
  if (i < 2) { const bx = 70, by = i === 0 ? 70 : 74; mk(s, 'line', { x1: bx, y1: by, x2: bx + 160 * Math.cos(a), y2: by + 160 * Math.sin(a), stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'rect', { x: bx - 16, y: by - 8, width: 32, height: 18, rx: 4, fill: BUCKET, stroke: C.ink, 'stroke-width': 2 });
    const ar = PUC.arrow(s, FC, 6, 16); return [{ ar, x: bx, y: by - 2, dx: Math.cos(a), dy: Math.sin(a) }]; }
  mk(s, 'line', { x1: 40, y1: 50, x2: 210, y2: 50, stroke: C.ink, 'stroke-width': 3 }); [40, 210].forEach(x => mk(s, 'circle', { cx: x, cy: 50, r: 10, fill: BUCKET, stroke: C.ink, 'stroke-width': 2 }));
  return [{ ar: PUC.arrow(s, FC, 6, 16), x: 40, y: 36, dx: 1, dy: 0 }, { ar: PUC.arrow(s, FC, 6, 16), x: 210, y: 36, dx: -1, dy: 0 }]; });
const TILES = [[C.ink, 'Still: easy', 'hand'], [FC, 'Faster: heavier', 'up'], [C.ink, 'Same water!', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Holding'), wt('H4', 'heavier'), wt('H4', 'water')];
// the well, drawn: frame, pulley, rope, bucket, Diya's hands on the rope
const hk = $('#hkS');
ground(hk, 40, 744, 520);
mk(hk, 'rect', { x: 180, y: 110, width: 16, height: 410, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 }); mk(hk, 'rect', { x: 444, y: 110, width: 16, height: 410, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 });
mk(hk, 'rect', { x: 160, y: 96, width: 320, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
mk(hk, 'line', { x1: 320, y1: 112, x2: 320, y2: 130, stroke: C.ink, 'stroke-width': 3 });
const hRopeL = mk(hk, 'line', { x1: 290, y1: 150, x2: 290, y2: 380, stroke: C.ink2, 'stroke-width': 3 }), hRopeR = mk(hk, 'line', { x1: 350, y1: 150, x2: 560, y2: 330, stroke: C.ink2, 'stroke-width': 3 });
pulley(hk, 320, 150, 30);
const hBkO = mk(hk, 'g', {}), hBk = mk(hBkO, 'g', {}); bucket(hBk, 290, 400, 100, 76);
mk(hk, 'rect', { x: 150, y: 440, width: 340, height: 80, rx: 6, fill: '#C8CCD4', stroke: C.ink, 'stroke-width': 2.5 });
for (let r = 0; r < 2; r++) for (let x = 150 + (r ? 30 : 0); x < 490; x += 60) mk(hk, 'rect', { x: Math.max(150, x), y: 440 + r * 40, width: Math.min(60, 490 - Math.max(150, x)), height: 40, fill: 'none', stroke: '#9AA0AC', 'stroke-width': 1.5 });
const hHand = mk(hk, 'g', {}); hHand.innerHTML = M.icon('hand', 64, C.ink, 2.2).replace('<svg ', '<svg x="548" y="296" ');
const hT = PUC.arrow(hk, FC, 7, 20), hTl = it(hk, 0, 0, 'T', FC); halo(hTl);

/* ---------- P: what it is ---------- */
$('#defQ').innerHTML = 'When a rope is pulled tight, it <span class="acc">pulls</span> on whatever is tied to it.';
const LP = [['Its name: the tension, T', 36, 252, 'ac'], ['Along the rope, away from the body', 36, 330, ''], ['Pulls, never pushes', 36, 408, ''], ['Light rope: same T all along', 36, 486, '']];
$('#lps').innerHTML = LP.map(([s, x, y, c], i) => `<div class="lp${c ? ' pillp ac' : ''}" id="lp${i}" style="left:${x}px;top:${y}px">${s}</div>`).join('');
const tLp = [wt('P2', 'tension'), wt('P3', 'along'), wt('P3', 'never'), wt('P4', 'same')];
const pm = $('#pmS');
mk(pm, 'rect', { x: 200, y: 92, width: 384, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); mk(pm, 'line', { x1: 392, y1: 108, x2: 392, y2: 130, stroke: C.ink, 'stroke-width': 3 });
mk(pm, 'line', { x1: 352, y1: 150, x2: 352, y2: 380, stroke: C.ink2, 'stroke-width': 3 }); mk(pm, 'line', { x1: 432, y1: 150, x2: 432, y2: 400, stroke: C.ink2, 'stroke-width': 3 });
pulley(pm, 392, 150, 40);
bucket(pm, 352, 400, 110, 84);
const pmHand = mk(pm, 'g', {}); pmHand.innerHTML = M.icon('hand', 64, C.ink, 2.2).replace('<svg ', '<svg x="402" y="396" ');
// tension arrows at three places along the rope, all the same size
const pT = [PUC.arrow(pm, FC, 7, 20), PUC.arrow(pm, FC, 7, 20), PUC.arrow(pm, FC, 7, 20), PUC.arrow(pm, FC, 7, 20)];
const pTl = ['on bucket', 'on hand', 'mid rope', ''].map((s, i) => txt(pm, 0, 0, s, { fill: FC, 'font-weight': 700, 'font-size': 19 }));
const pEq = txt(pm, 392, 500, 'same T everywhere along a light rope', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 21 });
halo(...pTl);
// "never pushes": a slack rope and a crossed push arrow
const pSlack = mk(pm, 'g', {}); mk(pSlack, 'path', { d: 'M560,250 q20,30 0,60 q-20,30 0,60', fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
mk(pSlack, 'rect', { x: 530, y: 370, width: 60, height: 44, rx: 6, fill: BUCKET, stroke: C.ink, 'stroke-width': 2.5 });
const pPush = PUC.arrow(pSlack, C.red, 6, 16); pPush.set(640, 300, 640, 360);
mk(pSlack, 'path', { d: 'M628,318 L652,342 M652,318 L628,342', stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' });
txt(pSlack, 640, 290, 'no push', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 18 });

{ const wrap = document.createElementNS(nsv, 'g'); wrap.setAttribute('transform', 'translate(-78.4,-40) scale(1.2)'); [...pm.childNodes].forEach(n => wrap.appendChild(n)); pm.appendChild(wrap); }
/* ---------- S: the bucket on the rope (sim) ---------- */
// motion (physical time tau, s): a = +2 for 1 s, steady 2 m/s for 1 s, a = -2 for 1 s; 4 m in all
const AU = 2, ph = q => { q = M.clamp(q, 0, 3);
  if (q < 1) return { a: AU, v: AU * q, y: 0.5 * AU * q * q };
  if (q < 2) return { a: 0, v: 2, y: 1 + 2 * (q - 1) };
  const r = q - 2; return { a: q < 3 ? -AU : 0, v: 2 - AU * r, y: 3 + 2 * r - 0.5 * AU * r * r }; };
const tGo = wt('S3', 'faster') - 0.2, tRw = tS4 + 0.05, tSlo0 = tRw + 0.5, tFrz = wt('S4', 'Freeze') + 0.3, tRun = wt('S6', 'run') - 0.1;
const tSlow = tRun + 6, RATE = 0.25;       // replay at 0.25x: the slowing starts near "Near the top"
const tauS = t => {
  if (t < tGo) return { q: 0 };
  if (t < tRw) return { q: Math.min(t - tGo, 3), mv: t - tGo < 3 };
  const qe = Math.min(tRw - tGo, 3);
  if (t < tSlo0) return { q: qe * (1 - M.io((t - tRw) / 0.45)), rew: true };
  if (t < tRun) { const q = Math.min(0.25 * (t - tSlo0), 0.5); return { q, rep: true, mv: q < 0.5 }; }
  const q = Math.min(0.5 + RATE * (t - tRun), 3); return { q, rep: true, mv: q < 3 };
};
const s = $('#simS'), PXM = 55, BX = 318, BY0 = 396, PR = 34, PUX = BX + PR, PUY = 112, RD = [Math.cos(35 * Math.PI / 180), Math.sin(35 * Math.PI / 180)];     // 55 px per metre
const RS = [PUX + PR * 0.57, PUY + PR * 0.82];     // where the right-hand rope leaves the pulley
ground(s, 30, 754, 560);
mk(s, 'rect', { x: 110, y: 80, width: 16, height: 480, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 }); mk(s, 'rect', { x: 526, y: 80, width: 16, height: 480, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 });
mk(s, 'rect', { x: 90, y: 66, width: 472, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'line', { x1: PUX, y1: 82, x2: PUX, y2: PUY, stroke: C.ink, 'stroke-width': 3 });
const ropeL = mk(s, 'line', { x1: BX, y1: PUY, x2: BX, y2: 400, stroke: C.ink2, 'stroke-width': 3 }), ropeR = mk(s, 'line', { x1: RS[0], y1: RS[1], x2: RS[0], y2: RS[1], stroke: C.ink2, 'stroke-width': 3 });
pulley(s, PUX, PUY, PR);
const ghosts = [0, 1, 2].map(() => { const g = mk(s, 'g', {}); mk(g, 'path', { d: `M${BX - 70},0 L${BX + 70},0 L${BX + 55},104 L${BX - 55},104 Z`, fill: BUCKET }); g.style.opacity = 0; return g; });
const bkO = mk(s, 'g', {}), bk = mk(bkO, 'g', {}); bucket(bk, BX, 0, 140, 104);
txt(bk, BX, 66, '5 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 22 });
mk(s, 'rect', { x: 180, y: 470, width: 276, height: 90, rx: 6, fill: '#C8CCD4', stroke: C.ink, 'stroke-width': 2.5 });
for (let r = 0; r < 2; r++) for (let x = 180 + (r ? 30 : 0); x < 456; x += 60) { const x0 = Math.max(180, x); mk(s, 'rect', { x: x0, y: 470 + r * 45, width: Math.min(60, 456 - x0), height: 45, fill: 'none', stroke: '#9AA0AC', 'stroke-width': 1.5 }); }
const sHand = mk(s, 'g', {}), sHandI = mk(sHand, 'g', {}); sHandI.innerHTML = M.icon('hand', 60, C.ink, 2.2).replace('<svg ', '<svg x="-30" y="-24" ');
const sT = PUC.arrow(s, FC, 7, 20), sW = PUC.arrow(s, FC, 7, 20), sA = PUC.arrow(s, AC, 6, 18), sV = PUC.arrow(s, VC, 6, 18);
const lT = it(s, 0, 0, 'T', FC), lW = it(s, 0, 0, 'mg', FC), lA = it(s, 0, 0, 'a', AC, { 'text-anchor': 'end' }), lV = it(s, 0, 0, 'v', VC, { 'text-anchor': 'end' });
halo(lT, lW, lA, lV);
const TS = 2, AS = 26, VS = 34;      // px per N, per m/s^2, per m/s
$('#roL').innerHTML = `<span class="k" style="color:${FC}">mg</span><span class="v" id="r_W" style="color:${FC}">49.0</span><span class="u">N</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="r_a" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roR').innerHTML = `<span class="k" style="color:${FC}">T</span><span class="v" id="r_T" style="color:${FC}">49.0</span><span class="u">N</span>
  <span class="k n">T - mg</span><span class="v" id="r_net" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${MC}">m</span><span class="v">5.00</span><span class="u">kg</span>`;
// graph: T against a (up +), T = m(g + a)
const gS = $('#grS'), AX0 = 130, AW = 540, AY0 = 62, AH = 136, AXm = -4, AXM = 4, AYM = 80;
const aX = v => AX0 + AW * (v - AXm) / (AXM - AXm), aY = v => AY0 + AH - AH * v / AYM;
mk(gS, 'path', { d: `M${AX0},${AY0} V${AY0 + AH} H${AX0 + AW}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
mk(gS, 'line', { x1: aX(0), y1: AY0, x2: aX(0), y2: AY0 + AH, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.35 });
[-4, -2, 0, 2, 4].forEach(v => { mk(gS, 'line', { x1: aX(v), y1: AY0 + AH, x2: aX(v), y2: AY0 + AH + 8, stroke: C.ink, 'stroke-width': 2 }); txt(gS, aX(v), AY0 + AH + 32, v, { 'text-anchor': 'middle' }); });
[0, 40, 80].forEach(v => { mk(gS, 'line', { x1: AX0 - 8, y1: aY(v), x2: AX0, y2: aY(v), stroke: C.ink, 'stroke-width': 2 }); txt(gS, AX0 - 14, aY(v) + 6, v, { 'text-anchor': 'end' }); });
txt(gS, AX0 + 12, AY0 + 6, 'T (N)'); txt(gS, AX0 + AW + 16, AY0 + AH + 6, 'a (m/s²)');
txt(gS, aX(-4), AY0 + AH + 58, '← a down', { 'font-size': 16, fill: AC, 'font-weight': 600 }); txt(gS, aX(4), AY0 + AH + 58, 'a up →', { 'font-size': 16, fill: AC, 'font-weight': 600, 'text-anchor': 'end' });
mk(gS, 'path', { d: `M${aX(-4)},${aY(MB * (G - 4))} L${aX(4)},${aY(MB * (G + 4))}`, fill: 'none', stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.5 });
mk(gS, 'line', { x1: AX0, y1: aY(WB), x2: aX(0), y2: aY(WB), stroke: C.ink, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0.6 });
txt(gS, AX0 + 10, aY(WB) - 8, 'mg = 49', { 'font-size': 16, fill: C.ink, 'font-weight': 600 });
const gLine = mk(gS, 'path', { d: '', fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gDot = mk(gS, 'circle', { r: 11, fill: FC, cx: aX(0), cy: aY(WB) });
const gTag = document.createElement('div'); gTag.className = 'pillp'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px;background:var(--ac2)'; gTag.innerHTML = '+1 m/s² &rarr; +5 N on T'; $('#gr').appendChild(gTag);
$('#tChip').style.cssText = 'left:auto;right:36px;top:490px';
const avD = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 490 - 306, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the extra pull is what speeds it up!' });
const th1 = PUC.think($('#th1'), { q: 'The bucket rises at a steady 1 m/s. Is T bigger than mg, or equal?', opts: ['Bigger', 'Equal'], right: 1, why: 'Steady speed: a = 0. The forces balance, so T = mg.' });

/* ---------- D: the rule ---------- */
const STEPS = [[`\\text{up: } ${TT} \\qquad \\text{down: } ${MG}`, 'two forces on the bucket'],
  [`${TT} - ${MG} = ${mm}${AA}`, 'take up as +: net force = ma'],
  [`${TT} = ${mm}(g + ${AA})`, 'move mg across'],
  [`${AA} = 0: \\ ${TT} = ${MG}`, 'at rest, or at a steady speed'],
  [`${AA}\\ \\text{down}: \\ ${TT} = ${mm}(g - ${AA})`, 'a points down: T is less than mg']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const d = $('#drS'), DX = 330, DY = 250;
mk(d, 'line', { x1: DX, y1: 70, x2: DX, y2: DY - 40, stroke: C.ink2, 'stroke-width': 3 });
const dBkO = mk(d, 'g', {}); bucket(dBkO, DX, DY, 130, 100);
const dT = PUC.arrow(d, FC, 8, 22), dW = PUC.arrow(d, FC, 8, 22), dA = PUC.arrow(d, AC, 7, 20);
const dTl = it(d, 0, 0, 'T', FC, { 'font-size': 32 }), dWl = it(d, 0, 0, 'mg', FC, { 'font-size': 32 }), dAl = it(d, 0, 0, 'a', AC, { 'font-size': 30 });
halo(dTl, dWl, dAl);
const dAx = mk(d, 'g', {}); const dAxA = PUC.arrow(dAx, C.ink, 4, 14); dAxA.set(620, 300, 620, 180); txt(dAx, 620, 330, '+ up', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const DC = [['a = 0', 'T = mg', 36], ['a up', 'T > mg', 276], ['a down', 'T < mg', 516]];
const dChips = DC.map(([a, b, x]) => { const e = document.createElement('div'); e.className = 'pillp'; e.style.cssText = `left:${x}px;top:490px;width:232px;justify-content:center;background:var(--soft)`; e.innerHTML = `<span class="ar">${a}</span>&nbsp;<span class="fo">${b}</span>`; $('#dr').appendChild(e); return e; });
$('#stF').innerHTML = K(`${TT} = ${mm}(g + ${AA}) \\qquad ${AA}\\ \\text{up} = +`);

/* ---------- K: up faster vs down faster ---------- */
const kScene = (svg, dir) => {
  const k = $(svg), X = 392, Y0 = dir > 0 ? 300 : 210;
  mk(k, 'rect', { x: 232, y: 70, width: 320, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
  const rope = mk(k, 'line', { x1: X, y1: 86, x2: X, y2: Y0 - 40, stroke: C.ink2, 'stroke-width': 3 });
  // ghost trail: earlier positions, spacing grows (speeding up)
  const gh = [3, 2, 1].map((n, i) => { const g = mk(k, 'g', {}); const yy = Y0 + dir * [0, 44, 80, 104][n]; mk(g, 'path', { d: `M${X - 55},${yy} L${X + 55},${yy} L${X + 43},${yy + 84} L${X - 43},${yy + 84} Z`, fill: BUCKET }); g.style.opacity = [0.12, 0.2, 0.3][i]; return g; });
  const bO = mk(k, 'g', {}); bucket(bO, X, Y0, 110, 84);
  txt(bO, X, Y0 + 54, '5 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 });
  const Tn = MB * (G + dir * AU);
  const o = { T: PUC.arrow(k, FC, 8, 22), W: PUC.arrow(k, FC, 8, 22), A: PUC.arrow(k, AC, 7, 20), V: PUC.arrow(k, VC, 7, 20), gh, bO };
  o.lT = txt(k, 0, 0, 'T ' + Tn.toFixed(0) + ' N', { fill: FC, 'font-weight': 700, 'font-size': 22 }); o.lW = txt(k, 0, 0, 'mg 49 N', { fill: FC, 'font-weight': 700, 'font-size': 22 });
  o.lA = it(k, 0, 0, 'a', AC, { 'text-anchor': 'end' }); o.lV = it(k, 0, 0, 'v', VC, { 'text-anchor': 'end' });
  halo(o.lT, o.lW, o.lA, o.lV);
  o.run = (t, tin, tA, tTn) => {
    vis(o.bO, t, tin, 1e9, { dy: 0, fade: 0.2 }); gh.forEach((g, i) => vis(g, t, tin + 0.4 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }));
    const uV = grow(t, tin + 0.6), uA = grow(t, tA), uT = grow(t, tTn, 0.7), uW = grow(t, tin + 0.9);
    o.V.set(X - 120, Y0 + 60, X - 120, Y0 + 60 - dir * 70 * uV); attr(o.lV, 'x', X - 134); attr(o.lV, 'y', Y0 + 60 - dir * 70 * uV + (dir > 0 ? 10 : 20)); o.lV.style.opacity = uV;
    o.A.set(X - 170, Y0 + 60, X - 170, Y0 + 60 - dir * AS * AU * uA); attr(o.lA, 'x', X - 184); attr(o.lA, 'y', Y0 + 60 - dir * AS * AU * uA + (dir > 0 ? 10 : 20)); o.lA.style.opacity = uA;
    const tl = TS * Tn * uT; o.T.set(X, Y0 - 40, X, Y0 - 40 - tl); attr(o.lT, 'x', X + 16); attr(o.lT, 'y', Y0 - 40 - tl + 22); o.lT.style.opacity = uT;
    o.W.set(X + 30, Y0 + 42, X + 30, Y0 + 42 + TS * WB * uW); attr(o.lW, 'x', X + 44); attr(o.lW, 'y', Y0 + 42 + TS * WB * uW - 4); o.lW.style.opacity = uW;
  };
  return o;
};
const kF = kScene('#kfS', 1), kM = kScene('#kmS', -1);
$('#kfP').innerHTML = K(`${TT} = ${mm}(g + ${AA}) = 5(9.8 + 2) = ${tc(FC, '59\\ \\text{N}')}`);
$('#kmP').innerHTML = K(`${TT} = ${mm}(g - ${AA}) = 5(9.8 - 2) = ${tc(FC, '39\\ \\text{N}')}`);
const th2 = PUC.think($('#th2'), { q: 'The bucket is still rising, but slowing down. Is T more or less than mg?', opts: ['More', 'Less'], right: 1, why: 'Slowing on the way up means a points down: T = m(g - a).' });

/* ---------- W: over a smooth pulley ---------- */
$('#wkq').innerHTML = `A ${K('5\\ \\text{kg}')} bucket is pulled up with ${K(tc(AC, 'a = 2\\ \\text{m/s}^2'))}, over a smooth pulley. How hard must Diya pull? ${K('g = 9.8\\ \\text{m/s}^2')}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${AA}\\ \\text{up} \\Rightarrow ${TT} = ${mm}(g + ${AA})`)],
  [K(`${TT} = 5(9.8 + 2) = 5 \\times 11.8 = ${tc(FC, '59\\ \\text{N}')}`)],
  [K(`\\text{light rope, smooth pulley: Diya pulls } ${tc(FC, '59\\ \\text{N}')}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WPX = 392, WPY = 140;
mk(w, 'rect', { x: 232, y: 80, width: 320, height: 16, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }); mk(w, 'line', { x1: WPX, y1: 96, x2: WPX, y2: WPY, stroke: C.ink, 'stroke-width': 3 });
mk(w, 'line', { x1: WPX - 44, y1: WPY, x2: WPX - 44, y2: 340, stroke: C.ink2, 'stroke-width': 3 }); mk(w, 'line', { x1: WPX + 44, y1: WPY, x2: WPX + 44, y2: 420, stroke: C.ink2, 'stroke-width': 3 });
pulley(w, WPX, WPY, 44);
const wBk = bucket(w, WPX - 44, 380, 110, 84); txt(w, WPX - 44, 434, '5 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 });
const wHand = mk(w, 'g', {}); wHand.innerHTML = M.icon('hand', 64, C.ink, 2.2).replace('<svg ', `<svg x="${WPX + 14}" y="416" `);
const wTb = PUC.arrow(w, FC, 7, 20), wTh = PUC.arrow(w, FC, 7, 20), wA = PUC.arrow(w, AC, 6, 18);
const wlB = txt(w, 0, 0, 'T 59 N, on bucket', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), wlH = txt(w, 0, 0, 'T 59 N, on hand', { fill: FC, 'font-weight': 700, 'font-size': 20 }), wlA = txt(w, 0, 0, 'a 2 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
halo(wlB, wlH, wlA);
const avA = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 490, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Ten newtons extra. No wonder it felt heavier!' });
const tW = [T0('W3'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The bucket moves up, so T > mg', right: 'Only a counts: steady speed T = mg; slowing T < mg' });
const tp = $('#tpS'), XS = [[100, 1, 'T > mg', 'speeding up'], [300, 0, 'T = mg', 'steady'], [500, -1, 'T < mg', 'slowing']];
const XB = XS.map(([x, ad, l1, l2]) => { const o = mk(tp, 'g', {}); mk(o, 'line', { x1: x, y1: 20, x2: x, y2: 70, stroke: C.ink2, 'stroke-width': 3 }); bucket(o, x, 110, 76, 56, false);
  const v = PUC.arrow(o, VC, 5, 15); v.set(x - 66, 150, x - 66, 100); const a = PUC.arrow(o, AC, 5, 15); if (ad) a.set(x + 62, ad > 0 ? 150 : 100, x + 62, ad > 0 ? 100 : 150); else mk(o, 'text', {});
  txt(o, x - 78, 130, 'v', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' });
  txt(o, x + 76, 130, ad ? 'a' : 'a = 0', { fill: AC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 22 });
  txt(o, x, 214, l1, { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 24 }); txt(o, x, 244, l2, { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 17 }); return o; });
const where = PUC.where($('#wa'), { on: [], type: 'Free-body numericals: bodies on strings, and ropes that can break' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 1, optW: 968, optH: 66, optFs: 28, optY: 300,
  q: `A rope breaks above ${K(tc(FC, '300\\ \\text{N}'))}. It is used to lower a ${K('40\\ \\text{kg}')} sack. ${K('g = 10\\ \\text{m/s}^2')}. What acceleration keeps the rope safe?`,
  opts: ['At least 2.5 m/s², downward', 'At least 7.5 m/s², downward', 'At least 2.5 m/s², upward', 'No acceleration can keep it safe'], right: 0 });
const so = PUC.solution($('#so'), [[K(`${MG} = 40 \\times 10 = 400\\ \\text{N} > 300`)], [K(`\\text{down: } ${TT} = ${mm}(g - ${AA}) \\le 300`)], [K(`40(10 - ${AA}) \\le 300 \\Rightarrow 10 - ${AA} \\le 7.5`)], [K(`${AA} \\ge ${tc(C.ok, '2.5\\ \\text{m/s}^2')}\\ \\text{down}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'Forty'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · tension', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`${TT} = ${mm}(g + ${AA}) \\quad (${AA}\\ \\text{up}) \\qquad ${TT} = ${mm}(g - ${AA}) \\quad (${AA}\\ \\text{down})`),
    K(`\\text{at rest or steady speed: } ${TT} = ${MG}`),
    '<b>T</b> pulls along the rope, away from the body. Never pushes.',
    'Light rope, smooth pulley: the same <b>T</b> all along'] });
const YQ = ['Why does the rope feel heavier when Diya starts the pull?', 'Why is the tension the same all along a light rope?', 'A bucket rises at a steady speed. Is T bigger than mg?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 62', topic: 'Hard to start, easy to keep sliding? Static and Kinetic Friction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S4', 'Freeze'), 1.06, 960, 540], [T0('S6') - 0.2, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = M.o3((t - tMorph - 0.8 - i * 0.4) / 0.5);
      JA[i].forEach(q => q.ar.set(q.x + q.dx * 18, q.y + q.dy * 18, q.x + q.dx * (18 + 60 * u), q.y + q.dy * (18 + 60 * u))); });
    vis($('#hjP'), t, wt('H2', 'pulling') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    // the bucket rises; T grows when she pulls faster
    const tPull = wt('H4', 'pull') - 0.2, up = 120 * M.clamp((t - tPull) / 3) ** 2;
    attr(hBk, 'transform', `translate(0,${(-up).toFixed(1)})`); attr(hRopeL, 'y2', (380 - up).toFixed(1));
    const tl = 70 + 30 * M.io((t - tPull) / 0.5); const by = 360 - up;
    hT.set(290, by - 4, 290, by - 4 - tl * grow(t, wt('H4', 'Holding'))); attr(hTl, 'x', 302); attr(hTl, 'y', by - tl + 18); hTl.style.opacity = grow(t, wt('H4', 'Holding'));
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#defQ'), t, wt('P2', 'When') - 0.05, { st: 0.06 });
    LP.forEach((_, i) => vis($('#lp' + i), t, tLp[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, T0('P2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const u0 = grow(t, wt('P2', 'pulls')), u1 = grow(t, wt('P5', 'pull')), u2 = grow(t, wt('P4', 'same'));
    pT[0].set(352, 350, 352, 350 - 90 * u0); attr(pTl[0], 'x', 340); attr(pTl[0], 'y', 300); pTl[0].setAttribute('text-anchor', 'end'); pTl[0].style.opacity = u0;
    pT[1].set(432, 396, 432, 396 - 90 * u1); attr(pTl[1], 'x', 446); attr(pTl[1], 'y', 340); pTl[1].style.opacity = u1;
    // a cut in the middle of the rope: the two pieces pull each other with the same T
    pT[2].set(432, 250, 432, 250 - 90 * u2); pT[3].set(0, 0, 0, 0);
    attr(pTl[2], 'x', 446); attr(pTl[2], 'y', 200); pTl[2].style.opacity = u2;
    vis(pEq, t, wt('P4', 'along') - 0.1, 1e9, { dy: 8 });
    vis(pmHand, t, T0('P2') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    vis(pSlack, t, wt('P3', 'never') - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* S: the sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const simOut = OUT('S9') + 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, dd]) => vis($(id), t, tS1 + dd, simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const st = tauS(t), P0 = ph(st.q), P = t < tGo || st.rew ? { ...P0, a: 0, v: t < tGo ? 0 : P0.v } : P0, by = BY0 - PXM * P.y;
    attr(bk, 'transform', `translate(0,${by.toFixed(1)})`); vis(bkO, t, tS1 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    attr(ropeL, 'y2', (by - 23).toFixed(1));
    const hd = 110 + PXM * P.y, hx = RS[0] + RD[0] * hd, hy = RS[1] + RD[1] * hd; attr(sHandI, 'transform', `translate(${hx.toFixed(1)},${hy.toFixed(1)})`); attr(ropeR, 'x2', hx.toFixed(1)); attr(ropeR, 'y2', hy.toFixed(1));
    ghosts.forEach((gh, k) => { const q = tauS(t - (st.rep ? 0.35 : 0.1) * (k + 1)), gy = BY0 - PXM * ph(q.q).y; attr(gh, 'transform', `translate(0,${gy.toFixed(1)})`); gh.style.opacity = st.mv && Math.abs(gy - by) > 3 && !q.rew ? [0.3, 0.2, 0.12][k] : 0; });
    // readout: round t first, compute everything from it
    const qr = Math.round(st.q * 100) / 100, R0 = ph(qr), R = t < tGo || st.rew ? { ...R0, a: 0, v: 0 } : R0, Tr = MB * (G + R.a);
    M.setT($('#r_a'), sg(R.a)); M.setT($('#r_v'), sg(R.v)); M.setT($('#r_T'), f1(Tr)); M.setT($('#r_net'), (Tr - WB > 0.04 ? '+' : Tr - WB < -0.04 ? '-' : '') + f1(Math.abs(Tr - WB)));
    const tch = $('#tChip'); M.setT(tch, 't = ' + qr.toFixed(2) + ' s'); vis(tch, t, tGo - 0.3, 1e9, POP);
    // vectors: T and mg from the start; a and v grow in the replay (and in the first run)
    const uT = grow(t, wt('S2', 'rope')), uW = grow(t, wt('S2', 'weight')), uAV = t > tGo ? grow(t, tGo + 0.2) : 0;
    const Tn = MB * (G + P.a), tl = TS * Tn * uT;
    sT.set(BX, by - 26, BX, by - 26 - tl); attr(lT, 'x', BX + 14); attr(lT, 'y', by - 26 - tl + 24); lT.style.opacity = uT;
    sW.set(BX + 30, by + 52, BX + 30, by + 52 + TS * WB * uW); attr(lW, 'x', BX + 42); attr(lW, 'y', by + 52 + TS * WB * uW - 6); lW.style.opacity = uW;
    const al = AS * P.a * uAV, vl = VS * P.v * uAV;
    sA.set(BX - 150, by + 52, BX - 150, by + 52 - al); attr(lA, 'x', BX - 160); attr(lA, 'y', by + 52 - al / 2 + 10); lA.style.opacity = Math.abs(al) > 6 ? 1 : 0;
    sV.set(BX - 104, by + 52, BX - 104, by + 52 - vl); attr(lV, 'x', BX - 114); attr(lV, 'y', by + 52 - vl / 2 + 10); lV.style.opacity = Math.abs(vl) > 6 ? 1 : 0;
    vis($('#smo'), t, tS4 + 0.05, T0('S8') - 0.2, { ...POP, sc: 0.8 });
    // graph: T against a, dot linked to the bucket
    const seen = t > tGo ? [Math.min(...[0, R.a, t > tSlow || st.q >= 2 ? -2 : 0]), Math.max(0, t > tGo ? 2 : 0)] : [0, 0];
    attr(gLine, 'd', seen[1] - seen[0] < 0.01 ? '' : `M${aX(seen[0]).toFixed(1)},${aY(MB * (G + seen[0])).toFixed(1)} L${aX(seen[1]).toFixed(1)},${aY(MB * (G + seen[1])).toFixed(1)}`);
    const ga = M.keys([[0, 0], [0, P.a]], 0.01)(t); attr(gDot, 'cx', aX(P.a).toFixed(1)); attr(gDot, 'cy', aY(Tn).toFixed(1)); M.hide(gDot, t < wt('S2', 'rope'));
    vis(gTag, t, wt('S8', 'adds') - 0.2, 1e9, POP);
    avD(t, wt('S5', 'speed') + 0.2, T0('S6') + 0.4);
    vis($('#th1'), t, tS9 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'Is') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: T0('S10') - 0.02, tWhy: wt('S10', 'Steady') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    vis(dBkO, t, tD1 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const uT = grow(t, wt('D2', 'pulls')), uW = grow(t, wt('D2', 'pulls', 1)), uA = grow(t, wt('D3', 'equals'));
    dT.set(DX, DY - 44, DX, DY - 44 - 118 * uT); attr(dTl, 'x', DX + 16); attr(dTl, 'y', DY - 44 - 118 * uT + 26); dTl.style.opacity = uT;
    dW.set(DX + 20, DY + 50, DX + 20, DY + 50 + 98 * uW); attr(dWl, 'x', DX + 34); attr(dWl, 'y', DY + 50 + 98 * uW - 6); dWl.style.opacity = uW;
    dA.set(DX - 130, DY + 70, DX - 130, DY + 70 - 52 * uA); attr(dAl, 'x', DX - 156); attr(dAl, 'y', DY + 52); dAl.style.opacity = uA;
    vis(dAx, t, wt('D3', 'up') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    [tStep[3] + 0.6, tStep[2] + 1.2, tStep[4] + 0.6].forEach((tt, i) => vis(dChips[i], t, tt, 1e9, POP));
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Tension') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'not') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kf'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#km'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kF.run(t, tK1 + 0.5, wt('K1', 'points'), wt('K1', 'plus')); kM.run(t, T0('K2'), wt('K2', 'points'), wt('K2', 'minus'));
    vis($('#kfP'), t, wt('K1', 'Fifty') - 0.2, 1e9, POP); vis($('#kmP'), t, wt('K2', 'Thirty') - 0.2, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'It') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const uA = grow(t, wt('W2', 'two')), uB = grow(t, wt('W4', 'Fifty')), uH = grow(t, wt('W5', 'Diya'));
    wA.set(WPX - 150, 460, WPX - 150, 460 - 52 * uA); attr(wlA, 'x', WPX - 164); attr(wlA, 'y', 440); wlA.style.opacity = uA;
    wTb.set(WPX - 44, 346, WPX - 44, 346 - 118 * uB); attr(wlB, 'x', WPX - 58); attr(wlB, 'y', 300); wlB.style.opacity = uB;
    wTh.set(WPX + 44, 420, WPX + 44, 420 - 118 * uH); attr(wlH, 'x', WPX + 58); attr(wlH, 'y', 360); wlH.style.opacity = uH;
    avA(t, wt('W6', 'heavier') - 0.4, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'bucket') - 0.2, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'acceleration') });
    [wt('X2', 'bigger'), wt('X3', 'steady'), wt('X3', 'slowing')].forEach((tt, i) => vis(XB[i], t, tt - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'free') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
