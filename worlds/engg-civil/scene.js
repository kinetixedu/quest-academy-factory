// engg-civil world sample - Compression and tension in a beam (Blueprint to site)
(() => {
const { $ } = M;
const C = { bp: '#0F3B6E', grid: '#1D4E85', white: '#FFFFFF', soft: '#B9CCE3', yel: '#FFD400', con: '#C9CED6', line: '#2C5F96', panel: '#134577', dimT: '#7C93B0' };
const wt = M.wt, PI = Math.PI;
const NS = 'http://www.w3.org/2000/svg';
const f = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02, tBeam = wt('H2', 'beam') - 0.1;
const tLoad = wt('B1', 'load'), tPress = wt('B1', 'presses'), tBends = wt('B1', 'bends');
const tTop = wt('B2', 'top'), tSqz = wt('B2', 'squeezed'), tComp = wt('B2', 'compression');
const tBot = wt('B3', 'bottom'), tStr = wt('B3', 'stretched'), tTen = wt('B3', 'tension'), tGood = wt('B3', 'Good');
const tSheet = M.t0('Q1') - 0.55, tCover = tSheet + 0.55, tQ = tCover + 0.05;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'That');

/* ---------- beam model: simply supported, deflection y(x) = D sin(pi s) ---------- */
function Beam(o) {   // o: x0,x1 (ends), s0,s1 (supports), top, h
  const span = o.s1 - o.s0;
  o.y = (x, D) => D * Math.sin(PI * (x - o.s0) / span);
  o.slope = (x, D) => D * PI / span * Math.cos(PI * (x - o.s0) / span);
  o.edge = (off, D, xa = o.x0, xb = o.x1, n = 40) => { const p = []; for (let i = 0; i <= n; i++) { const x = xa + (xb - xa) * i / n; p.push([x, o.top + off + o.y(x, D)]); } return p; };
  o.band = (a, b, D) => { const A = o.edge(a, D), B = o.edge(b, D).reverse(); return 'M' + A.concat(B).map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z'; };
  o.line = (off, D, xa, xb) => 'M' + o.edge(off, D, xa, xb, 24).map(p => f(p[0]) + ' ' + f(p[1])).join('L');
  // arrow inside a band, from xa to xb (tip at xb), progress u
  o.arrow = (off, xa, xb, u, D, hs) => {
    if (u <= 0.001) return '';
    const xt = xa + (xb - xa) * u, dir = Math.sign(xb - xa);
    const xs = xt - dir * hs * 0.9;
    const yy = x => o.top + off + o.y(x, D);
    let d = `M${f(xa)} ${f(yy(xa))}`; for (let i = 1; i <= 8; i++) { const x = xa + (xs - xa) * i / 8; d += `L${f(x)} ${f(yy(x))}`; }
    const a = Math.atan(o.slope(xt, D)), tx = Math.cos(a) * dir, ty = Math.sin(a) * dir, nx = -ty, ny = tx, X = xt, Y = yy(xt);
    d += `M${f(X)} ${f(Y)}L${f(X - tx * hs + nx * hs * 0.62)} ${f(Y - ty * hs + ny * hs * 0.62)}L${f(X - tx * hs - nx * hs * 0.62)} ${f(Y - ty * hs - ny * hs * 0.62)}Z`;
    return d;
  };
  return o;
}
// draws a beam scene into a group; returns refs
function buildBeam(g, B, sc) {
  const r = {};
  r.base = el('path', { fill: C.con }, g);
  r.topB = el('path', { fill: C.con }, g);
  r.botB = el('path', { fill: C.con }, g);
  r.ticks = el('path', { fill: 'none', stroke: C.bp, 'stroke-width': 2 * sc }, g);
  r.na = el('path', { fill: 'none', stroke: '#6E86A6', 'stroke-width': 2 * sc, 'stroke-dasharray': `${22 * sc} ${6 * sc} ${4 * sc} ${6 * sc}` }, g);
  r.cArr = el('path', { fill: C.bp, stroke: C.bp, 'stroke-width': 5 * sc, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  r.tArr = el('path', { fill: C.bp, stroke: C.bp, 'stroke-width': 5 * sc, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  r.out = el('path', { fill: 'none', stroke: C.white, 'stroke-width': 3 * sc, 'stroke-linejoin': 'round' }, g);
  return r;
}
// supports: pin (left) and roller (right), ground hatch
function buildSupports(g, B, gy, sc) {
  const out = [], bot = B.top + B.h, w = 40 * sc;
  const pin = el('path', { d: `M${B.s0} ${bot} L${B.s0 - w} ${gy} H${B.s0 + w} Z`, fill: 'none', stroke: C.white, 'stroke-width': 3 * sc, 'stroke-linejoin': 'round' }, g); out.push(pin);
  const ry = gy - 18 * sc;
  const rol = el('path', { d: `M${B.s1} ${bot} L${B.s1 - w} ${ry} H${B.s1 + w} Z`, fill: 'none', stroke: C.white, 'stroke-width': 3 * sc, 'stroke-linejoin': 'round' }, g); out.push(rol);
  [-22, 0, 22].forEach(dx => out.push(el('circle', { cx: B.s1 + dx * sc, cy: ry + 9 * sc, r: 8 * sc, fill: 'none', stroke: C.white, 'stroke-width': 2.5 * sc }, g)));
  [B.s0, B.s1].forEach(x => {
    out.push(el('line', { x1: x - 64 * sc, y1: gy, x2: x + 64 * sc, y2: gy, stroke: C.white, 'stroke-width': 3 * sc }, g));
    let d = ''; for (let k = 0; k < 8; k++) { const hx = x - 56 * sc + k * 16 * sc; d += `M${hx} ${gy + 4 * sc} l${-12 * sc} ${14 * sc}`; }
    out.push(el('path', { d, stroke: C.soft, 'stroke-width': 2 * sc, fill: 'none' }, g));
  });
  return out;
}

/* ---------- main beam ---------- */
const B = Beam({ x0: 400, x1: 1520, s0: 448, s1: 1472, top: 452, h: 88 });
const GY = 608, DMAX = 36;
const bridgeG = $('#bridge');
const R = buildBeam($('#beam'), B, 1);
const sup = buildSupports($('#sup'), B, GY, 1);
// ghost of the unloaded beam (dashed) + deflection marker
const dims = $('#dims');
const ghost = el('path', { d: `M${B.x0} ${B.top + B.h} H${B.x1}`, 'stroke-dasharray': '10 8', stroke: C.soft }, dims);
const delta = el('path', { d: '', stroke: C.yel, 'stroke-width': 2.5 }, dims);
// span dimension (civil style: 45 deg slash ticks)
const DY = 712;
const dimEls = [
  el('line', { x1: B.s0, y1: GY + 28, x2: B.s0, y2: DY + 14 }, dims), el('line', { x1: B.s1, y1: GY + 28, x2: B.s1, y2: DY + 14 }, dims),
  el('line', { x1: B.s0 - 16, y1: DY, x2: B.s1 + 16, y2: DY }, dims),
  el('path', { d: `M${B.s0 - 10} ${DY + 10} l20 -20 M${B.s1 - 10} ${DY + 10} l20 -20`, 'stroke-width': 3, stroke: C.white }, dims),
];
const dimT = el('text', { x: 960, y: DY - 14, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 26, fill: C.white, stroke: 'none' }, dims); dimT.textContent = 'SPAN 6.0 m';
$('#nSpan').style.left = '1106px'; $('#nSpan').style.top = (DY - 40) + 'px'; $('#nSpan').textContent = '(example)';
// load arrow
const LG = $('#load');
const loadV = el('g', {}, LG), loadG = el('g', {}, loadV);
const loadShaft = el('line', { x1: 0, y1: -150, x2: 0, y2: -34, stroke: C.yel, 'stroke-width': 10, 'stroke-linecap': 'round' }, loadG);
const loadHead = el('path', { d: 'M0 0 L-22 -38 H22 Z', fill: C.yel }, loadG);
const loadLbl = el('text', { x: 36, y: -118, 'font-family': 'Architects Daughter', 'font-size': 32, fill: C.yel }, loadG); loadLbl.textContent = 'load';
// fibre ticks positions
const tickX = []; for (let x = 432; x <= 1488; x += 48) tickX.push(x);
// arrows
const cA = [[520, 660], [720, 860], [1400, 1260], [1200, 1060]], tA = [[860, 720], [660, 520], [1060, 1200], [1260, 1400]];

/* ---------- bridge extras: approach road, abutments, water, railing, truck ---------- */
const brRoad = el('path', { d: `M160 ${B.top} H${B.x0 - 12} M${B.x1 + 12} ${B.top} H1760`, stroke: C.white, 'stroke-width': 3, fill: 'none' }, bridgeG);
const brBank = el('path', { d: `M160 ${GY + 4} H${B.s0 - 72} M${B.s1 + 72} ${GY + 4} H1760`, stroke: C.white, 'stroke-width': 3, fill: 'none' }, bridgeG);
const abut = [B.s0, B.s1].map(x => el('rect', { x: x - 64, y: GY + 4, width: 128, height: 88, fill: C.con, stroke: C.white, 'stroke-width': 3 }, bridgeG));
const embank = [[160, B.s0 - 64], [B.s1 + 64, 1760]].map(([a, b]) => { let d = ''; for (let x = a + 8; x < b - 8; x += 24) d += `M${x} ${GY + 16} l-12 14`; return el('path', { d, stroke: C.soft, 'stroke-width': 2, fill: 'none' }, bridgeG); });
let wd = ''; for (let x = B.s0 + 88; x < B.s1 - 100; x += 48) wd += `M${x} 672 q12 -10 24 0 t24 0`;
const water = el('path', { d: wd, stroke: C.soft, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }, bridgeG);
const rail = el('path', { stroke: C.soft, 'stroke-width': 2.5, fill: 'none' }, bridgeG);
const deckNote = el('text', { x: 1760, y: 312, 'text-anchor': 'end', 'font-family': 'Architects Daughter', 'font-size': 30, fill: C.white }, bridgeG); deckNote.textContent = 'bridge deck = one beam';
const truckV = el('g', {}, $('#load')), truck = el('g', {}, truckV);
const truckIn = el('g', {}, truck);
truckIn.innerHTML = `
  <rect x="-112" y="-104" width="148" height="70" fill="#134577" stroke="#FFFFFF" stroke-width="3"/>
  <path d="M-96 -88 h116 M-96 -70 h116 M-96 -52 h116" stroke="#2C5F96" stroke-width="2"/>
  <path d="M44 -34 V-84 h40 l26 28 V-34 Z" fill="#C9CED6" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
  <path d="M56 -76 h24 l16 18 h-40 Z" fill="#0F3B6E"/>
  <line x1="-112" y1="-34" x2="110" y2="-34" stroke="#FFFFFF" stroke-width="3"/>
  ${[-84, -48, 80].map(x => `<circle cx="${x}" cy="-16" r="15" fill="#0F3B6E" stroke="#FFFFFF" stroke-width="3"/><circle cx="${x}" cy="-16" r="4" fill="#FFFFFF"/>`).join('')}`;

/* ---------- tags ---------- */
$('#tCi').innerHTML = M.icon(['M2 12h6', 'm5 8 4 4-4 4', 'M22 12h-6', 'm19 8-4 4 4 4'], 30, '#0F3B6E', 2.6);
$('#tTi').innerHTML = M.icon(['M8 12H2', 'm5 8-4 4 4 4', 'M16 12h6', 'm19 8 4 4-4 4'], 30, '#0F3B6E', 2.6);
const place = () => {
  const tc = $('#tC'), tt = $('#tT');
  tc.style.left = '160px'; tc.style.top = '272px'; tt.style.left = '160px'; tt.style.top = '772px';
  const nc = $('#nC'), nt = $('#nT');
  nc.style.left = (160 + tc.offsetWidth + 24) + 'px'; nc.style.top = '285px';
  nt.style.left = (160 + tt.offsetWidth + 24) + 'px'; nt.style.top = '785px';
  const nb = $('#nBend'); nb.style.left = '992px'; nb.style.top = (B.top + B.h + DMAX + 18) + 'px';
};

/* ---------- quiz diagram ---------- */
const QB = Beam({ x0: 128, x1: 928, s0: 176, s1: 880, top: 168, h: 80 });
const qG = $('#qG');
const QR = buildBeam(qG, QB, 0.9);
buildSupports(qG, QB, 306, 0.85);
const QD = 22;
const qLoad = el('g', { transform: `translate(528 ${QB.top + QB.y(528, QD)})` }, qG);
el('line', { x1: 0, y1: -120, x2: 0, y2: -30, stroke: C.yel, 'stroke-width': 8, 'stroke-linecap': 'round' }, qLoad);
el('path', { d: 'M0 0 L-18 -32 H18 Z', fill: C.yel }, qLoad);
const qnTop = el('text', { x: 200, y: 140, 'font-family': 'Architects Daughter', 'font-size': 30, fill: C.white }, qG); qnTop.textContent = 'top ?';
const qnBot = el('text', { x: 200, y: 372, 'font-family': 'Architects Daughter', 'font-size': 30, fill: C.white }, qG); qnBot.textContent = 'bottom ?';
const qnBotA = el('text', { x: 200, y: 372, 'font-family': 'Architects Daughter', 'font-size': 30, fill: C.yel }, qG); qnBotA.textContent = 'bottom: stretched = tension';
const qcA = [[290, 400], [460, 500 - 4], [766, 656], [596, 560]], qtA = [[480, 360], [330, 220], [576, 696], [726, 836]];
$('#o1 .ok').innerHTML = M.icon('check', 40, '#0F3B6E', 3);
$('#takeI').innerHTML = M.icon(['M2 12h6', 'm5 8 4 4-4 4', 'M22 12h-6', 'm19 8-4 4 4 4'], 44, '#0F3B6E', 2.6);

/* ---------- title-card motif: a beam line on two supports under the title ---------- */
let geo = null;
function measure() {
  const ti = $('#title'); const w = ti.offsetWidth;
  geo = { tw: w, sx: 960 - w / 2, sy: 420, ex: 160, ey: 150, es: 64 / 120, cw: $('#eyebrow').offsetWidth };
  const x0 = Math.round(geo.sx), x1 = Math.round(geo.sx + w), y = 592;
  $('#tlG').innerHTML = `<line id="tl0" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/><path id="tl1" d="M${x0 + 40} ${y} l-18 28 h36 z" stroke="#FFFFFF" stroke-width="2.5"/><path id="tl2" d="M${x1 - 40} ${y} l-18 28 h36 z" stroke="#FFFFFF" stroke-width="2.5"/>`;
  place();
}

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.04, 960, 530], [0.15, 1, 960, 540, [4.5, 1]]]);
const setA = (e, k, v) => { if (e['_' + k] !== v) { e['_' + k] = v; e.setAttribute(k, v); } };
function paintBeam(Bm, Rr, D, cTop, cBot, uC, uT, sqz, str, sc, cArr, tArr) {
  const h = Bm.h;
  setA(Rr.base, 'd', Bm.band(0, h, D));
  setA(Rr.topB, 'd', Bm.band(0, h / 2, D)); Rr.topB.setAttribute('fill', M.mix(C.con, C.yel, cTop));
  setA(Rr.botB, 'd', Bm.band(h / 2, h, D)); Rr.botB.setAttribute('fill', M.mix(C.con, C.white, cBot));
  setA(Rr.na, 'd', Bm.line(h / 2, D, Bm.x0 + 8, Bm.x1 - 8));
  setA(Rr.out, 'd', Bm.band(0, h, D));
  const hs = 16 * sc, mid = (Bm.s0 + Bm.s1) / 2;
  setA(Rr.cArr, 'd', cArr.map(([a, b], i) => Bm.arrow(h / 4, a, b, M.spring(uC - i * 0.06, M.SOFT), D, hs)).join(''));
  setA(Rr.tArr, 'd', tArr.map(([a, b], i) => Bm.arrow(3 * h / 4, a, b, M.spring(uT - i * 0.06, M.SOFT), D, hs)).join(''));
  // fibre ticks: top ones close up when squeezed, bottom ones spread when stretched
  if (Rr === R) {
    let d = '';
    tickX.forEach(x0 => {
      const xt = mid + (x0 - mid) * (1 - 0.05 * sqz), xb = mid + (x0 - mid) * (1 + 0.035 * str);
      if (xt > Bm.x0 + 6 && xt < Bm.x1 - 6) { const y = Bm.top + Bm.y(xt, D); d += `M${f(xt)} ${f(y)}v12`; }
      if (xb > Bm.x0 + 6 && xb < Bm.x1 - 6) { const y = Bm.top + h + Bm.y(xb, D); d += `M${f(xb)} ${f(y)}v-12`; }
    });
    setA(Rr.ticks, 'd', d);
  } else setA(Rr.ticks, 'd', '');
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title -> header (shared element) ---
  const mo = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  ti.style.transform = mo >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, mo).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, mo).toFixed(2)}px) scale(${M.lerp(1, geo.es, mo).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, out: tCover - 0.05, outDur: 0.01, rot: 0 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, mo).toFixed(2) + 'px'; ey.style.top = M.lerp(324, 96, mo).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 18, outDur: 0.01 });
  M.vis($('#tline'), t, 0.8, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  if (t < tMorph + 0.3) { M.draw($('#tl0'), t, 0.85, 0.6, M.o3); M.draw($('#tl1'), t, 1.3, 0.35, M.o3); M.draw($('#tl2'), t, 1.4, 0.35, M.o3); }
  M.rise($('#sub'), t, 1.5, { st: 0.05, out: tMorph - 0.1, outDur: 0.3, rot: 0 });

  // --- concept scene ---
  const on = t < tCover; M.hide($('#bsv'), !on);
  const D = DMAX * M.spring(t - tPress, M.HEAVY);
  if (on) {
    sup.forEach((e, k) => { M.draw(e, t, tMorph + 0.25 + (k % 4) * 0.06, 0.45, M.o3); if (k >= 5 && t > tGood + 0.15) M.hide(e, true); });
    // beam outline draws, then concrete fills
    const bu = M.io((t - tBeam) / 0.6), fu = M.clamp((t - tBeam - 0.45) / 0.25);
    const cTop = M.io((t - tTop) / 0.35), cBot = M.io((t - tBot) / 0.35);
    paintBeam(B, R, D, cTop, cBot, t - tTop - 0.15, t - tStr, M.spring(t - tSqz, M.SOFT), M.spring(t - tStr, M.SOFT), 1, cA, tA);
    if (bu < 1) M.drawU(R.out, bu); else { R.out.style.strokeDasharray = ''; R.out.style.strokeDashoffset = ''; M.hide(R.out, false); }
    [R.base, R.topB, R.botB, R.ticks, R.na].forEach(e => M.hide(e, fu <= 0));
    R.base.setAttribute('fill', M.mix(C.bp, C.con, fu));
    if (fu < 1) { R.topB.setAttribute('fill', M.mix(C.bp, C.con, fu)); R.botB.setAttribute('fill', M.mix(C.bp, C.con, fu)); }
    M.hide(R.ticks, t < tSqz - 0.2);
    // dimensions
    const dOut = tGood;
    dimEls.forEach((e, k) => M.draw(e, t, tBeam + 0.6 + k * 0.08, 0.4, M.o3));
    [dimEls[0], dimEls[1], dimEls[2], dimEls[3]].forEach(e => { if (t > dOut) M.vis(e, t, null, dOut, { dy: 0, ody: 0, outDur: 0.3 }); });
    M.vis(dimT, t, tBeam + 0.85, dOut, { dy: 0, ody: 0, fade: 0.2, outDur: 0.3 });
    M.vis($('#nSpan'), t, tBeam + 1.0, dOut, { dy: 0, ody: 0, fade: 0.2, outDur: 0.3 });
    // ghost + delta marker on "bends"
    M.vis(ghost, t, tBends - 0.05, dOut, { dy: 0, ody: 0, fade: 0.2, outDur: 0.3 });
    const yb = B.top + B.h, dm = B.y(960, D);
    setA(delta, 'd', `M960 ${yb} V${f(yb + dm)} M948 ${yb} h24 M948 ${f(yb + dm)} h24`);
    M.vis(delta, t, tBends, dOut, { dy: 0, ody: 0, fade: 0.15, outDur: 0.3 });
    M.vis($('#nBend'), t, tBends + 0.1, dOut, { dy: 0, ody: 0, fade: 0.2, outDur: 0.3 });
    $('#nBend').textContent = 'bends a little';
    // load arrow: drops in on "load", rides the beam; retracts when the truck takes over
    const lp = M.spring(t - tLoad, M.SNAP);
    const ly = B.top + B.y(960, D) - (1 - lp) * 70;
    setA(loadG, 'transform', `translate(960 ${f(ly)})`);
    M.vis(loadV, t, tLoad, tGood + 0.05, { dy: 0, ody: 0, fade: 0.12, outDur: 0.3 });
    // tags
    M.vis($('#tC'), t, tComp, 1e9, { dx: -24, dy: 0, sp: M.SNAP });
    M.rise($('#nC'), t, tComp + 0.15, { st: 0.05, rot: 0 });
    M.vis($('#tT'), t, tTen, 1e9, { dx: -24, dy: 0, sp: M.SNAP });
    M.rise($('#nT'), t, tTen + 0.15, { st: 0.05, rot: 0 });
    // bridge
    const bOn = t >= tGood - 0.01; M.hide(bridgeG, !bOn);
    if (bOn) {
      M.draw(brRoad, t, tGood, 0.5, M.o3); M.draw(brBank, t, tGood + 0.1, 0.5, M.o3);
      abut.forEach((a, k) => M.vis(a, t, tGood + 0.2 + k * 0.06, 1e9, { dy: 30, sp: M.SNAP }));
      M.draw(water, t, tGood + 0.35, 0.6, M.o3);
      embank.forEach(e => M.vis(e, t, tGood + 0.3, 1e9, { dy: 0, fade: 0.25 }));
      let rd = ''; for (let x = B.x0 + 16; x <= B.x1 - 16; x += 64) { const y = B.top + B.y(x, D); rd += `M${f(x)} ${f(y)}V${f(y - 36)}`; }
      rd += B.line(-36, D, B.x0 + 16, B.x1 - 16);
      setA(rail, 'd', rd); M.vis(rail, t, tGood + 0.15, 1e9, { dy: 0, fade: 0.25 });
      M.vis(deckNote, t, tGood + 0.5, 1e9, { dy: 0, fade: 0.2 });
    }
    // truck drives in on the approach road and stops at mid-span, following the deck
    const tp = M.spring(t - tGood - 0.1, [4.6, 1]);
    const tx = M.lerp(300, 960, tp), onDeck = tx > B.x0 && tx < B.x1;
    const tyy = B.top + (onDeck ? B.y(tx, D) : 0), ang = onDeck ? Math.atan(B.slope(tx, D)) * 180 / PI : 0;
    setA(truck, 'transform', tp >= 1 ? `translate(960 ${f(B.top + B.y(960, D))})` : `translate(${f(tx)} ${f(tyy)}) rotate(${ang.toFixed(3)})`);
    M.vis(truckV, t, tGood + 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  // --- blueprint sheet slides in from the right, border draws, title block fills ---
  const su = M.io((t - tSheet) / 0.55);
  M.hide($('#sheet'), su <= 0);
  setA($('#sheetG'), 'transform', su >= 1 ? 'translate(0 0)' : `translate(${f(1920 * (1 - su))} 0)`);
  M.drawU($('#shB'), M.io((t - tSheet - 0.2) / 0.6));
  if (t > tSheet + 0.8) { $('#shB').style.strokeDasharray = ''; }

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.12, { st: 0.06, sp: M.HEAVY, rot: 0 });
    M.vis($('#qd'), t, tQ + 0.35, 1e9, { dy: 36 });
    const r = M.io((t - tAns) / 0.3);
    paintBeam(QB, QR, QD, 0, r, -1, t - tAns - 0.1, 0, 0, 0.9, qcA, qtA);
    M.vis(qnTop, t, tQ + 0.6, 1e9, { dy: 0, fade: 0.2 });
    qnTop.setAttribute('fill', M.mix(C.white, C.dimT, r));
    M.hide(qnBot, t >= tAns + 0.15); if (t < tAns + 0.15) M.vis(qnBot, t, tQ + 0.7, 1e9, { dy: 0, fade: 0.2 });
    M.vis(qnBotA, t, tAns + 0.15, 1e9, { dy: 0, fade: 0.15 });
    ['#o0', '#o1'].forEach((id, i) => {
      const e = $(id); M.vis(e, t, tQ + 0.5 + i * 0.08, 1e9, { dy: 36 });
      const right = i === 1;
      e.style.background = right ? M.mix(C.bp, C.white, r) : M.mix(C.bp, C.panel, r);
      e.style.borderColor = right ? M.mix(C.soft, C.white, r) : M.mix(C.soft, C.line, r);
      e.querySelector('.ot').style.color = right ? M.mix(C.white, C.bp, r) : M.mix(C.white, C.dimT, r);
      const lt = e.querySelector('.lt');
      lt.style.borderColor = right ? M.mix(C.white, C.yel, r) : M.mix(C.white, C.dimT, r);
      lt.style.background = right ? M.mix(C.bp, C.yel, r) : M.mix(C.bp, C.panel, r);
      lt.style.color = right ? M.mix(C.white, C.bp, r) : M.mix(C.white, C.dimT, r);
      const ok = e.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) e.style.transform = `scale(${(1 + 0.03 * Math.sin(PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 36, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.04, rot: 0 });
  }
  caps(t);
});

/* ---------- sound: tick / paper / thud / clunk / correct ---------- */
M.sfx(0.12, 'paper', 0.4); M.sfx(0.9, 'tick', 0.4); M.sfx(1.35, 'tick', 0.3);
M.sfx(tMorph, 'paper', 0.45);
M.sfx(tMorph + 0.3, 'tick', 0.35); M.sfx(tBeam + 0.45, 'clunk', 0.4);
M.sfx(tLoad, 'tick', 0.4); M.sfx(tPress, 'thud', 0.5);
M.sfx(tBends, 'tick', 0.35);
M.sfx(tTop, 'tick', 0.4); M.sfx(tSqz, 'clunk', 0.3, -0.2); M.sfx(tComp, 'paper', 0.4);
M.sfx(tBot, 'tick', 0.4); M.sfx(tStr, 'clunk', 0.3, 0.2); M.sfx(tTen, 'paper', 0.4);
M.sfx(tGood, 'paper', 0.35); M.sfx(tGood + 0.25, 'thud', 0.3, -0.3);
M.sfx(tSheet, 'paper', 0.6, 0.4);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.55));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'paper', 0.3);
M.outro({ bg: '#0F3B6E', ink: '#FFFFFF', accent: '#FFD400', sub: 'rgba(255,255,255,.66)', font: 'Archivo' });
})();
