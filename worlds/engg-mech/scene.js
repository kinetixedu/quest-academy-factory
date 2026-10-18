// engg-mech world sample - Gears and gear ratio (Workshop CAD)
(() => {
const { $, $$ } = M;
const C = { steel: '#2E3742', mid: '#6C7886', line: '#CBD2DA', card: '#F7F8FA', bg: '#E9ECEF', orange: '#FF6A13', track: '#DDE2E7', dim: '#A9B2BD', soft: '#FFE3D2' };
const wt = M.wt, PI = Math.PI, TAU = PI * 2;
const NS = 'http://www.w3.org/2000/svg';
const f = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02, tGears = wt('H2', 'gears') - 0.05;
const tA = wt('G1', 'small'), tDrive = wt('G1', 'drives'), tB = wt('G1', 'big');
const tSpin = wt('G2', 'spins'), tOnce = wt('G2', 'once'), tBig1 = wt('G2', 'big');
const tSlow = wt('G3', 'slower'), tForce = wt('G3', 'force'), tTorque = wt('G3', 'torque');
const tRe = M.t0('G3');
const tWipe = M.t0('Q1') - 0.5, tCover = tWipe + 0.5, tQ = tCover + 0.1;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'But');

/* ---------- involute spur gear outline (pressure angle 20 deg), tooth 0 centred on +x ---------- */
function gearPath(N, m) {
  const pa = 20 * PI / 180, r = m * N / 2, rb = r * Math.cos(pa), ra = r + m, rf = r - 1.25 * m;
  const inv = a => Math.tan(a) - a, half = PI / (2 * N) + inv(pa) - 0.2 * m / (2 * r);   // 0.2 m backlash per gear so stroked flanks never overlap
  const psi = rr => { const a = Math.acos(Math.min(1, rb / rr)); return half - inv(a); };   // half-angle of the tooth at radius rr
  const r0 = Math.max(rb, rf), K = 9, pts = [];
  const P = (rr, a) => [rr * Math.cos(a), rr * Math.sin(a)];
  let d = '';
  for (let i = 0; i < N; i++) {
    const c = i * TAU / N, flank = [];
    for (let k = 0; k <= K; k++) { const rr = r0 + (ra - r0) * (k / K) ** 1.4; flank.push([rr, psi(rr)]); }
    const startA = c - psi(r0);
    const p0 = P(rf, startA);
    d += (i === 0 ? 'M' : 'L') + f(p0[0]) + ' ' + f(p0[1]);
    if (rf < r0) { const p = P(r0, startA); d += 'L' + f(p[0]) + ' ' + f(p[1]); }
    flank.forEach(([rr, s]) => { const p = P(rr, c - s); d += 'L' + f(p[0]) + ' ' + f(p[1]); });
    const pt = P(ra, c + psi(ra)); d += `A${f(ra)} ${f(ra)} 0 0 1 ${f(pt[0])} ${f(pt[1])}`;
    for (let k = K; k >= 0; k--) { const [rr, s] = flank[k]; const p = P(rr, c + s); d += 'L' + f(p[0]) + ' ' + f(p[1]); }
    if (rf < r0) { const p = P(rf, c + psi(r0)); d += 'L' + f(p[0]) + ' ' + f(p[1]); }
    const nx = P(rf, (i + 1) * TAU / N - psi(r0)); d += `A${f(rf)} ${f(rf)} 0 0 1 ${f(nx[0])} ${f(nx[1])}`;
  }
  return { d: d + 'Z', r, ra, rf };
}
const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };

// builds a gear: outer g (translate) > rot g (rotate) ; returns refs
function buildGear(host, N, m, cx, cy, sw, big) {
  const G = gearPath(N, m);
  const g = el('g', { transform: `translate(${cx} ${cy})` }, host);
  const rot = el('g', {}, g);
  const body = el('path', { d: G.d, fill: C.card, stroke: C.steel, 'stroke-width': sw, 'stroke-linejoin': 'round' }, rot);
  const det = el('g', { fill: 'none', stroke: C.steel, 'stroke-width': sw * 0.8 }, rot);
  let mark;
  if (big) {
    el('circle', { r: G.rf - m * 1.3 }, det);
    el('circle', { r: m * 5.2 }, det);
    for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + PI / 6, R = (G.rf - m * 1.3 + m * 5.2) / 2; const c = el('circle', { cx: f(R * Math.cos(a)), cy: f(R * Math.sin(a)), r: m * 2.5, fill: k === 0 ? C.orange : C.bg, stroke: C.steel }, det); if (k === 0) mark = c; }
    el('path', { d: `M${-m * 2.1} ${-m * 0.6} a${m * 2.2} ${m * 2.2} 0 1 0 ${m * 4.2} 0 v${-m * 0.9} h${-m * 4.2} z`, fill: C.bg }, det);
  } else {
    el('circle', { r: m * 2.9 }, det);
    el('path', { d: `M${-m * 1.1} ${-m * 0.4} a${m * 1.15} ${m * 1.15} 0 1 0 ${m * 2.2} 0 v${-m * 0.6} h${-m * 2.2} z`, fill: C.bg }, det);
    mark = el('circle', { cx: f(G.r - m * 1.9), cy: 0, r: m * 0.62, fill: C.orange, stroke: 'none' }, rot);
  }
  return { g, rot, body, det, mark, G, cx, cy, N };
}

/* ---------- concept-scene geometry ---------- */
const m = 13, NA = 12, NB = 36;
const BX = 668, BY = 566, CD = m * (NA + NB) / 2;                // centre distance 336
const phi = (205) * PI / 180;                                    // direction B -> A
const AX = BX + CD * Math.cos(phi), AY = BY + CD * Math.sin(phi);
const phiAB = Math.atan2(BY - AY, BX - AX);                      // direction A -> B
const host = $('#gsv');
const gB = buildGear($('#gB'), NB, m, BX, BY, 3, true);
const gA = buildGear($('#gA'), NA, m, AX, AY, 3, false);
// pitch circles + centre lines (CAD centreline dash-dot, static)
const cl = $('#cl');
const clEls = [
  el('circle', { cx: f(AX), cy: f(AY), r: gA.G.r }, cl), el('circle', { cx: BX, cy: BY, r: gB.G.r }, cl),
  el('line', { x1: f(AX - 116), y1: f(AY), x2: f(AX + 116), y2: f(AY) }, cl), el('line', { x1: f(AX), y1: f(AY - 116), x2: f(AX), y2: f(AY + 116) }, cl),
  el('line', { x1: BX - 272, y1: BY, x2: BX + 272, y2: BY }, cl), el('line', { x1: BX, y1: BY - 272, x2: BX, y2: BY + 272 }, cl),
];
// mesh phase: A tooth points at B, B gap points at A
const thA0 = phiAB, thB0 = phiAB + PI - PI / NB;

/* ---------- angular motion: velocity keys, integrated in closed form (ratio-true always) ---------- */
// keys: [t, revPerSec, rampDur] ; cosine ramps
function revs(keys) {
  const ks = []; let prev = 0;
  keys.forEach(([t, v, d]) => { ks.push([t, v - prev, d]); prev = v; });
  return t => { let s = 0; for (const [a, dv, d] of ks) { if (t <= a) continue; const x = t - a; s += dv * (x >= d ? x - d / 2 : x / 2 - d / (2 * PI) * Math.sin(PI * x / d)); } return s; };
}
const rampUp = 0.8, rampDn = 0.7, tStop = tOnce + 0.42;
const w0 = 3 / (tStop - tSpin - rampDn / 2);                     // exactly 3 turns of A between "spins" and the stop
const w1 = 0.42;
const SA = revs([[tDrive - 0.05, w0, rampUp], [tStop - rampDn, 0, rampDn], [tRe + 0.1, w1, 0.9]]);
const nA = t => Math.max(0, SA(Math.min(t, tStop)) - SA(tSpin));

/* ---------- labels: balloons + leader lines ---------- */
const lead = $('#lead');
const leaderA = el('path', { d: '' }, lead), leaderB = el('path', { d: '' }, lead);
const dotA = el('circle', { r: 5, fill: C.steel, stroke: 'none' }, lead), dotB = el('circle', { r: 5, fill: C.steel, stroke: 'none' }, lead);
// A: balloon at left, horizontal leader into the small gear hub ring
const balA = { x: 160, y: Math.round(AY - 22) }; $('#balA').style.top = balA.y + 'px';
const eA = [AX - m * 2.9, AY];
leaderA.setAttribute('d', `M${balA.x + 44} ${f(AY)} H${f(eA[0])}`); dotA.setAttribute('cx', f(eA[0])); dotA.setAttribute('cy', f(AY));
// B: balloon top-right, elbow leader into the big gear web
const bB = { x: 1004, y: 300 }; $('#balB').style.left = bB.x + 'px'; $('#balB').style.top = bB.y + 'px';
const aB = -40 * PI / 180, eB = [BX + 168 * Math.cos(aB), BY + 168 * Math.sin(aB)];
leaderB.setAttribute('d', `M${bB.x} ${bB.y + 22} H${f(eB[0] + 120)} L${f(eB[0])} ${f(eB[1])}`); dotB.setAttribute('cx', f(eB[0])); dotB.setAttribute('cy', f(eB[1]));
// reference index ticks (where the markers started counting)
const refs = el('g', {}, $('#tq'));
const refA = el('path', { fill: C.orange }, refs), refB = el('path', { fill: C.orange }, refs);

/* ---------- torque arrows ---------- */
const tq = $('#tq');
const arc = (cx, cy, r, a0, a1) => { const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]; const large = Math.abs(a1 - a0) > PI ? 1 : 0, sweep = a1 > a0 ? 1 : 0; return `M${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 ${large} ${sweep} ${f(p1[0])} ${f(p1[1])}`; };
const head = (cx, cy, r, a, dir, s) => { // arrowhead at angle a, tangent direction dir (+1 = increasing angle)
  const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a), tx = -Math.sin(a) * dir, ty = Math.cos(a) * dir, nx = Math.cos(a), ny = Math.sin(a);
  return `M${f(px + tx * s)} ${f(py + ty * s)} L${f(px - tx * s * 0.2 + nx * s * 0.62)} ${f(py - ty * s * 0.2 + ny * s * 0.62)} L${f(px - tx * s * 0.2 - nx * s * 0.62)} ${f(py - ty * s * 0.2 - ny * s * 0.62)} Z`;
};
// B turns counter-clockwise (A clockwise). Big torque arrow over the top of B, small one on A
const RT = 274, tqB0 = -14 * PI / 180, tqB1 = -100 * PI / 180;
const tqBp = el('path', { d: arc(BX, BY, RT, tqB0, tqB1), fill: 'none', stroke: C.orange, 'stroke-width': 10, 'stroke-linecap': 'round' }, tq);
const tqBh = el('path', { d: head(BX, BY, RT, tqB1, -1, 30), fill: C.orange }, tq);
const RA = 112, tqA0 = 100 * PI / 180, tqA1 = 168 * PI / 180;
const tqAp = el('path', { d: arc(AX, AY, RA, tqA0, tqA1), fill: 'none', stroke: C.steel, 'stroke-width': 4, 'stroke-linecap': 'round' }, tq);
const tqAh = el('path', { d: head(AX, AY, RA, tqA1, 1, 16), fill: C.steel }, tq);
const tqLbl = el('g', {}, tq);
const lx = Math.round(BX + RT * Math.cos(tqB1) - 44), ly = 268;
el('rect', { x: lx - 136, y: ly, width: 136, height: 44, rx: 4, fill: C.orange }, tqLbl);
el('text', { x: lx - 68, y: ly + 31, 'text-anchor': 'middle', 'font-family': 'Barlow Condensed', 'font-weight': 700, 'font-size': 26, 'letter-spacing': 3, fill: '#fff' }, tqLbl).textContent = 'TORQUE';

/* ---------- title dimension line ---------- */
let geo = null;
function measure() {
  const ti = $('#title'); const w = ti.offsetWidth;
  geo = { tw: w, sx: 960 - w / 2, sy: 430, ex: 160, ey: 150, es: 64 / 150, cw: $('#eyebrow').offsetWidth };
  const g = $('#tdimG'), x0 = geo.sx, x1 = geo.sx + w, y = 612;
  g.innerHTML = `<line id="dl" x1="${x0 + 2}" y1="${y}" x2="${x1 - 2}" y2="${y}"/><line id="de0" x1="${x0}" y1="${y - 26}" x2="${x0}" y2="${y + 14}"/><line id="de1" x1="${x1}" y1="${y - 26}" x2="${x1}" y2="${y + 14}"/><path id="da0" d="M${x0} ${y} l18 -6 v12z" fill="#6C7886" stroke="none"/><path id="da1" d="M${x1} ${y} l-18 -6 v12z" fill="#6C7886" stroke="none"/>`;
  
}

/* ---------- quiz gears: 36T driver, 12T driven ---------- */
const qm = 9, qBX = 286, qBY = 192, qCD = qm * (NA + NB) / 2, qAX = qBX + qCD, qAY = qBY;
const qB = buildGear($('#qB'), NB, qm, qBX, qBY, 2.5, true);
const qA = buildGear($('#qA'), NA, qm, qAX, qAY, 2.5, false);
const qcl = $('#qcl');
el('circle', { cx: qBX, cy: qBY, r: qB.G.r }, qcl); el('circle', { cx: qAX, cy: qAY, r: qA.G.r }, qcl);
el('line', { x1: qBX - 186, y1: qBY, x2: qAX + 84, y2: qAY }, qcl);
el('line', { x1: qBX, y1: qBY - 186, x2: qBX, y2: qBY + 186 }, qcl); el('line', { x1: qAX, y1: qAY - 84, x2: qAX, y2: qAY + 84 }, qcl);
$('#qlB').setAttribute('x', qBX); $('#qlB').setAttribute('y', 396); $('#qlB').setAttribute('text-anchor', 'middle');
$('#qlA').setAttribute('x', qAX); $('#qlA').setAttribute('y', 396); $('#qlA').setAttribute('text-anchor', 'middle');
$('#qlX').setAttribute('x', qAX + 104); $('#qlX').setAttribute('y', 201);
// B is the driver here: B tooth points at A (angle 0), A gap points at B (angle pi)
const qB0 = 0, qA0 = PI - PI / NA;
const qS = revs([[tQ + 0.3, 0.16, 0.8]]);
// countdown ring ticks
$('#ringT').innerHTML = [0, 1, 2].map(k => { const a = -PI / 2 + k * TAU / 3; return `<line x1="${f(65 + 44 * Math.cos(a))}" y1="${f(65 + 44 * Math.sin(a))}" x2="${f(65 + 50 * Math.cos(a))}" y2="${f(65 + 50 * Math.sin(a))}"/>`; }).join('');
$('#o0 .ok').innerHTML = M.icon('check', 40, '#fff', 3);
$('#takeI').innerHTML = M.icon('gear', 48, '#FF6A13', 2.2);

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.04, 960, 530], [0.15, 1, 960, 540, [4.5, 1]]]);
const setRot = (g, deg) => { const s = `rotate(${deg.toFixed(3)})`; if (g._r !== s) { g._r = s; g.setAttribute('transform', s); } };
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1);
const tri = (cx, cy, r, a, s) => { // index triangle outside the gear pointing inward
  const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a), nx = Math.cos(a), ny = Math.sin(a), tx = -ny, ty = nx;
  return `M${f(px)} ${f(py)} L${f(px + nx * s + tx * s * 0.6)} ${f(py + ny * s + ty * s * 0.6)} L${f(px + nx * s - tx * s * 0.6)} ${f(py + ny * s - ty * s * 0.6)} Z`;
};
// marker angles at tSpin (for reference ticks)
const angA = t => thA0 + SA(t) * TAU, angB = t => thB0 - SA(t) * TAU / 3;
const mkB = PI / 6;                                              // marker hole local angle
refA.setAttribute('d', tri(AX, AY, gA.G.ra + 10, angA(tSpin), 20));
refB.setAttribute('d', tri(BX, BY, gB.G.ra + 10, angB(tSpin) + mkB, 22));

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title card -> header (shared element) ---
  const mo = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, mo), y = M.lerp(geo.sy, geo.ey, mo), s = M.lerp(1, geo.es, mo);
  ti.style.transform = mo >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tCover - 0.05, outDur: 0.01, rot: 0 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, mo).toFixed(2) + 'px'; ey.style.top = M.lerp(334, 96, mo).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 18, outDur: 0.01 });
  // dimension line under the title: extension lines, then the dimension line draws out from the centre
  const dIn = 0.85, du = M.io((t - dIn) / 0.6);
  M.vis($('#tdim'), t, dIn - 0.05, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  if (t < tMorph + 0.3) {
    M.draw($('#de0'), t, dIn, 0.25, M.o3); M.draw($('#de1'), t, dIn, 0.25, M.o3);
    const dl = $('#dl'), half = (geo.tw - 4) / 2 * du;
    dl.setAttribute('x1', f(960 - half)); dl.setAttribute('x2', f(960 + half)); M.hide(dl, du <= 0);
    M.vis($('#da0'), t, dIn + 0.55, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#da1'), t, dIn + 0.55, 1e9, { dy: 0, fade: 0.1 });
  }
  M.rise($('#sub'), t, 1.2, { st: 0.04, out: tMorph - 0.1, outDur: 0.3, rot: 0 });

  // --- gears: centrelines, then outlines draw, then fill ---
  const gOn = t < tCover;
  M.hide($('#gsv'), !gOn);
  if (gOn) {
    clEls.forEach((e, k) => M.draw(e, t, tMorph + 0.15 + k * 0.05, 0.5, M.o3));
    [[gB, 0], [gA, 0.12]].forEach(([G, d0]) => {
      const tg = tGears + d0, u = M.io((t - tg) / 0.75);
      M.drawU(G.body, u);
      if (u >= 1) { G.body.style.strokeDasharray = ''; G.body.style.strokeDashoffset = ''; }
      const fu = M.clamp((t - tg - 0.55) / 0.25);
      G.body.setAttribute('fill', M.mix(C.bg, C.card, fu));
      G.body.setAttribute('fill-opacity', u > 0 ? 1 : 0);
      M.vis(G.det, t, tg + 0.5, 1e9, { dy: 0, fade: 0.25 });
      M.hide(G.mark, t < tg + 0.5);
    });
    // rotation (ratio-true: B = -A/3, both from one integrated angle)
    setRot(gA.rot, angA(t) * 180 / PI);
    setRot(gB.rot, angB(t) * 180 / PI);

    // balloons + leaders
    M.vis($('#balA'), t, tA, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.draw(leaderA, t, tA + 0.08, 0.35, M.o3); M.hide(dotA, t < tA + 0.4);
    M.vis($('#balB'), t, tB, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.draw(leaderB, t, tB + 0.08, 0.4, M.o3); M.hide(dotB, t < tB + 0.45);

    // torque arrows: B big (orange) on "force", A small (steel)
    const tu = M.io((t - tForce) / 0.55);
    M.drawU(tqBp, tu); M.vis(tqBh, t, tForce + 0.48, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.drawU(tqAp, M.io((t - tForce - 0.2) / 0.4)); M.vis(tqAh, t, tForce + 0.55, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis(refA, t, tSpin - 0.1, 1e9, { dy: 0, fade: 0.12 }); M.vis(refB, t, tSpin - 0.1, 1e9, { dy: 0, fade: 0.12 });
    M.vis(tqLbl, t, tTorque, 1e9, { dy: 12, sp: M.SNAP });
  }

  // --- data cards ---
  M.vis($('#cA'), t, tA + 0.12, tCover - 0.05, { dy: 28, outDur: 0.01, ody: 0 });
  M.vis($('#cB'), t, tB + 0.12, tCover - 0.05, { dy: 28, outDur: 0.01, ody: 0 });
  const na = nA(t), nb = na / 3;
  M.setT($('#cA .n'), fmt1(na)); M.setT($('#cB .n'), fmt1(nb));
  $('#cA .bar i').style.width = (248 * M.clamp(na / 3)).toFixed(1) + 'px';
  $('#cB .bar i').style.width = (248 * M.clamp(nb / 3)).toFixed(1) + 'px';
  const counting = t >= tSpin - 0.1 && t < tRe;
  const hiA = M.io((t - tSpin + 0.1) / 0.3) * (1 - M.io((t - tRe) / 0.4));
  const hiB = M.io((t - tBig1) / 0.3) * (1 - M.io((t - tRe) / 0.4));
  $('#cA .n').style.color = M.mix(C.steel, C.orange, hiA); $('#cA .bar i').style.background = M.mix(C.steel, C.orange, hiA);
  $('#cB .n').style.color = M.mix(C.steel, C.orange, hiB); $('#cB .bar i').style.background = M.mix(C.steel, C.orange, hiB);
  M.vis($('#rc'), t, tOnce + 0.05, tCover - 0.05, { dy: 28, outDur: 0.01, ody: 0 });
  M.vis($('#tc'), t, tRe - 0.15, tCover - 0.05, { dy: 28, outDur: 0.01, ody: 0 });
  // speed bar: from A baseline (108) shrinks to a third; torque grows to three times
  const su = M.spring(t - tSlow, M.SOFT), qu = M.spring(t - tForce, M.SOFT);
  $('#rS .tk i').style.width = (108 - 72 * su).toFixed(1) + 'px';
  $('#rT .tk i').style.width = (108 + 216 * qu).toFixed(1) + 'px';
  $('#rS .tk i').style.background = M.mix(C.steel, C.orange, M.io((t - tSlow) / 0.3));
  $('#rT .tk i').style.background = M.mix(C.steel, C.orange, M.io((t - tForce) / 0.3));
  M.vis($('#rS .vl'), t, tSlow + 0.25, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
  M.vis($('#rT .vl'), t, tForce + 0.25, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });

  // --- CAD section wipe: hatched panel with a cutting-plane line sweeps left to right ---
  const a1 = M.io((t - tWipe) / 0.5), a2 = M.io((t - tCover - 0.08) / 0.55);
  const wx = 1960 * a1 + 1960 * a2;
  M.hide($('#wipe'), a1 <= 0 || a2 >= 1);
  $('#wipeG').setAttribute('transform', `translate(${wx.toFixed(1)} 0)`);

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.12, { st: 0.05, sp: M.HEAVY, rot: 0 });
    M.vis($('#qd'), t, tQ + 0.35, 1e9, { dy: 36 });
    const sq = qS(t);
    setRot(qB.rot, (qB0 + sq * TAU) * 180 / PI);
    setRot(qA.rot, (qA0 - sq * 3 * TAU) * 180 / PI);
    ['#o0', '#o1'].forEach((id, i) => {
      const e = $(id); M.vis(e, t, tQ + 0.5 + i * 0.08, 1e9, { dy: 36 });
      const right = i === 0, r = M.io((t - tAns) / 0.3);
      e.style.background = right ? M.mix(C.card, C.steel, r) : M.mix(C.card, '#E3E7EB', r);
      e.style.borderColor = right ? M.mix(C.line, C.steel, r) : M.mix(C.line, '#D9DEE4', r);
      e.querySelector('.ot').style.color = right ? M.mix(C.steel, '#FFFFFF', r) : M.mix(C.steel, C.dim, r);
      const lt = e.querySelector('.lt');
      lt.style.borderColor = right ? M.mix(C.steel, C.orange, r) : M.mix(C.steel, C.dim, r);
      lt.style.background = right ? M.mix(C.card, C.orange, r) : M.mix(C.card, '#E3E7EB', r);
      lt.style.color = right ? M.mix(C.steel, '#FFFFFF', r) : M.mix(C.steel, C.dim, r);
      const ok = e.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) e.style.transform = `scale(${(1 + 0.03 * Math.sin(PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    // answer annotation on the diagram
    const qx = $('#qlX'); M.setT(qx, '× 3 SPEED'); M.vis(qx, t, tAns + 0.2, 1e9, { dy: 0, fade: 0.15 });
    // countdown 3-2-1
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 36, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.045, rot: 0 });
  }
  caps(t);
});

/* ---------- sound: clunk / ratchet / tick / thud / correct ---------- */
M.sfx(0.12, 'clunk', 0.35); M.sfx(0.9, 'tick', 0.4);
M.sfx(tMorph, 'ratchet', 0.3);
M.sfx(tGears + 0.3, 'clunk', 0.45);
M.sfx(tA, 'tick', 0.4, -0.3); M.sfx(tB, 'tick', 0.4, 0.2);
M.sfx(tDrive, 'ratchet', 0.4, -0.2);
// one tick per full turn of A (3), one heavier tick when B completes its turn
for (let k = 1; k <= 3; k++) {
  // find when nA reaches k (bisection on the closed-form)
  let lo = tSpin, hi = tStop + 0.01; for (let i = 0; i < 40; i++) { const md = (lo + hi) / 2; if (nA(md) < k - 0.001) lo = md; else hi = md; }
  M.sfx(hi, 'tick', 0.45, -0.25);
}
M.sfx(tStop, 'thud', 0.45, 0.15);
M.sfx(tOnce + 0.05, 'clunk', 0.35);
M.sfx(tRe - 0.15, 'tick', 0.3); M.sfx(tSlow, 'tick', 0.4); M.sfx(tForce, 'ratchet', 0.4, 0.2); M.sfx(tTorque, 'clunk', 0.4);
M.sfx(tWipe + 0.05, 'ratchet', 0.35, -0.4); M.sfx(tCover, 'thud', 0.4);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.55));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'clunk', 0.3);
M.outro({ bg: '#2E3742', ink: '#E9ECEF', accent: '#FF6A13', sub: 'rgba(233,236,239,.62)', font: 'Barlow Condensed' });
})();
