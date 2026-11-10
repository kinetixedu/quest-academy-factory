// PUC Physics Ep 110: Kinetic energy of rolling motion (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, EC = C.teal, EL = '#7FD6D6', IC = C.ink, TC = C.gold, FC = C.orange, OK = C.ok;   // v blue, K teal (moving) + light teal (spin), theta gold, friction orange
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const vv = tc(VC, 'v'), om = tc(VC, '\\omega'), KK = tc(EC, 'K'), II = tc(IC, 'I'), kR = `\\tfrac{k^2}{R^2}`;
const lab = (p, s, col, sz = 22, a = {}) => txt(p, 0, 0, s, Object.assign({ fill: col, 'font-weight': 700, 'font-size': sz }, a));
// bodies: ring, disc, solid ball (outer g for M.vis, tr for position, g for spin)
const BODY = { ring: { k: 1, col: '#8A6A4A', name: 'Ring' }, disc: { k: 0.5, col: '#5B6B8C', name: 'Disc' }, ball: { k: 0.4, col: IC, name: 'Ball' } };
const body = (p, kind, R) => { const outer = mk(p, 'g', {}), tr = mk(outer, 'g', {}), g = mk(tr, 'g', {}), b = BODY[kind];
  if (kind === 'ring') { mk(g, 'circle', { r: R - 4, fill: 'none', stroke: b.col, 'stroke-width': 8 }); mk(g, 'line', { x1: 0, y1: -R + 8, x2: 0, y2: -R + 0, stroke: '#fff', 'stroke-width': 3 }); mk(g, 'circle', { cx: 0, cy: -R + 4, r: 4, fill: TC }); }
  else if (kind === 'disc') { mk(g, 'circle', { r: R, fill: b.col, stroke: IC, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 0, y1: 0, x2: 0, y2: -R + 3, stroke: '#fff', 'stroke-width': 3 }); mk(g, 'circle', { r: 4, fill: '#fff' }); }
  else { mk(g, 'circle', { r: R, fill: b.col }); mk(g, 'path', { d: `M${-R * 0.6},${-R * 0.25} A${R},${R} 0 0 1 ${R * 0.6},${-R * 0.25}`, fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: 0.7 }); mk(g, 'circle', { cx: 0, cy: -R * 0.62, r: 4, fill: TC }); }
  return { o: outer, set(x, y, phi) { attr(tr, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); attr(g, 'transform', `rotate(${(phi * 180 / Math.PI).toFixed(2)})`); } };
};

Object.assign(M.IC, {
  ballI: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M9 9h.01', 'M14 8h.01', 'M12 12h.01'],
  coin: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v10', 'M9 10h6'],
  ringI: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'],
});

/* ---------- physics: 30 degree slope, 2 m long (1 m high), g = 9.8 ---------- */
const G = 9.8, SIN = 0.5, LEN = 2, acc = k => G * SIN / (1 + k), tEnd = k => Math.sqrt(2 * LEN / acc(k)), vEnd = k => Math.sqrt(2 * G * LEN * SIN / (1 + k));
const KINDS = ['ball', 'disc', 'ring'];

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ballI', 'Bowling ball', 'ROLLS DOWN A LANE'], ['coin', 'A coin', 'ROLLS OFF THE TABLE'], ['ringI', 'A ring', 'ROLLS DOWN A SLOPE']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'bowling'), wt('H1', 'coin'), wt('H1', 'ring')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="120"></svg></div>`).join('');
const JB = ['ball', 'disc', 'ring'].map((kd, i) => { const sv = $('#jsv' + i); mk(sv, 'line', { x1: 20, y1: 92, x2: 290, y2: 92, stroke: IC, 'stroke-width': 2.5 }); return body(sv, kd, 26); });
// hook: one slope, three lanes, the finish order
const hs = $('#hkS'), HA = Math.PI / 6, HX0 = 40, HYT = [96, 186, 276], HSC = 170, HRB = 18;
const lane = (p, x0, y0, L) => { mk(p, 'path', { d: `M${x0},${y0} L${x0 + L * Math.cos(HA)},${y0 + L * Math.sin(HA)} L${x0},${y0 + L * Math.sin(HA)} Z`, fill: '#EFE7D8', stroke: IC, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); };
HYT.forEach(y => lane(hs, HX0, y + HRB / Math.cos(HA), LEN * HSC));
const HB = KINDS.map((kd, i) => body(hs, kd, HRB)), hRank = KINDS.map((kd, i) => { const g = mk(hs, 'g', {}); mk(g, 'rect', { x: 400, y: 110 + i * 54, width: 130, height: 42, rx: 8, fill: i ? C.soft : OK }); txt(g, 416, 138 + i * 54, (i + 1) + '  ' + BODY[kd].name, { fill: i ? IC : '#fff', 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins' }); return g; });
const tHr = wt('H3', 'go') + 0.2;

/* ---------- P ---------- */
const QR = [[`\\tfrac12 m${vv}^2`, 'Moving forward', 'kinetic energy of the centre'], [`\\tfrac12 ${II}${om}^2`, 'Spinning', 'kinetic energy of turning'], [`${KK} = \\tfrac12 m${vv}^2 + \\tfrac12 ${II}${om}^2`, 'Total', 'the sum of the two']];
$('#qrs').innerHTML = QR.map(([s, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 130}px"><div class="qs" style="width:${i === 2 ? 0 : 150}px">${i === 2 ? '' : K(s)}</div><div class="qn" style="left:${i === 2 ? 24 : 190}px">${n}</div><div class="qd" style="left:${i === 2 ? 24 : 190}px">${d}</div>${i === 2 ? `<div class="fx" style="right:24px;top:34px;font-size:36px">${K(s)}</div>` : ''}</div>`).join('');
document.querySelectorAll('#qrs .qs .katex').forEach(e => e.style.fontSize = '40px');
const tQr = [wt('P2', 'half'), wt('P3', 'half'), wt('P3', 'total')];
const pm = $('#pmS'); mk(pm, 'line', { x1: 36, y1: 300, x2: 748, y2: 300, stroke: IC, 'stroke-width': 3 });
const pB = body(pm, 'disc', 70), pV = PUC.arrow(pm, VC, 6, 18), pW = mk(pm, 'path', { fill: 'none', stroke: VC, 'stroke-width': 5 });
const pBars = [['moving: ½mv²', EC, 0.667], ['spinning: ½Iω²', EL, 0.333]].map(([n, c, f], i) => { const g = mk(pm, 'g', {}), y = 380 + i * 70; txt(g, 36, y + 24, n, { 'font-size': 20, 'font-weight': 700, fill: i ? '#3F9E9E' : EC }); const r = mk(g, 'rect', { x: 260, y, width: 0, height: 34, rx: 6, fill: c }); return { g, r, f }; });
txt(pm, 36, 530, 'a disc: two thirds moving, one third spinning', { 'font-size': 18, fill: C.ink2, 'font-weight': 600 });

/* ---------- S: the race ---------- */
const s = $('#simS'), SPX = 200, LP = LEN * SPX, X0 = 70, YT = [110, 210, 310], RB = 22;   // 200 px per m along the slope
const HXp = LP * Math.cos(HA), HYp = LP * Math.sin(HA);
YT.forEach(y => lane(s, X0, y + RB / Math.cos(HA), LP));
YT.forEach((y, i) => { mk(s, 'line', { x1: X0 + HXp, y1: y + HYp - 10, x2: X0 + HXp, y2: y + HYp + 50, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }); });
const SB = KINDS.map(kd => body(s, kd, RB)), SG = KINDS.map(kd => [0.3, 0.2, 0.12].map(op => { const c = mk(s, 'circle', { r: RB, fill: BODY[kd].col, opacity: 0 }); c._op = op; return c; }));
const SV = KINDS.map(() => PUC.arrow(s, VC, 5, 15));
const SN = KINDS.map((kd, i) => txt(s, X0 + HXp + 70, YT[i] + HYp - 4, BODY[kd].name, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: BODY[kd].col }));
const SF = KINDS.map((kd, i) => txt(s, X0 + HXp + 70, YT[i] + HYp + 22, '', { 'font-weight': 700, 'font-size': 18, fill: VC }));
const ang = txt(s, X0 + 60, YT[0] + 26 + RB, '', {});
const PLAY = 0.4, tL1 = wt('S2', 'go') - 0.1;
const tFz = wt('S5', 'Freeze') + 0.05, TFZ = 0.62, tRA = TFZ - 0.25 * (tFz - tS5), tRes = OUT('S9') - 0.6;
function state(t) {
  if (t >= tS5) { if (t < tFz) return { tau: tRA + 0.25 * (t - tS5), replay: true }; if (t < tRes) return { tau: TFZ, frozen: true }; return { tau: TFZ + (t - tRes) * 0.4 }; }
  if (t >= tL1) return { tau: (t - tL1) * PLAY };
  return { tau: 0, ready: true };
}
const pos = (k, tau) => { const tt = Math.min(tau, tEnd(k)), sm = 0.5 * acc(k) * tt * tt, v = acc(k) * tt; return { sm, v, done: tau >= tEnd(k) }; };
$('#rows').innerHTML = KINDS.map((kd, i) => `<div class="rrow" id="rw${i}" style="top:${72 + i * 62}px"><div class="rn" style="color:${BODY[kd].col}">${BODY[kd].name}</div><div class="rb"><i class="m" style="left:0;background:${EC}"></i><i class="s" style="background:${EL}"></i></div><div class="rv" id="rv${i}">0.00 m/s</div></div>`).join('');
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 1.4, ymin: 0, ymax: 4, xt: [0, 0.4, 0.8, 1.2], yt: [0, 2, 4], xl: 't (s)' });
txt(gs, 122, 78, 'v (m/s)', { 'font-size': 18 });
const DASH = ['', '10 6', '3 6'], GL = KINDS.map((kd, i) => mk(gs, 'path', { d: '', fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-dasharray': DASH[i], 'stroke-linecap': 'round' })), GD = KINDS.map(kd => g.dot(BODY[kd].col, 9));
$('#leg').innerHTML = KINDS.map((kd, i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${VC}" stroke-width="4" stroke-dasharray="${DASH[i]}" stroke-linecap="round"/></svg>${BODY[kd].name.toLowerCase()}</span>`).join('');
const th1 = PUC.think($('#th1'), { q: 'A heavy disc and a light disc, the same size, race down the slope. Which one wins?', opts: ['The heavy disc', 'The light disc', 'A tie'], right: 2, why: 'Mass cancels out: v = √(2gh / (1 + k²/R²)). Only shape counts.' });

/* ---------- R ---------- */
const LK = ["All of the ring's mass sits at the rim", 'Mass far from the axis makes spin cost more', 'So the ring spends most on spin, least on speed'];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'All'), wt('R3', 'Mass'), wt('R4', 'So')];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 450, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'Like spinning a ring vs a ball on a finger!' });
const rs = $('#rrS'), RRC = [[220, 250], [560, 250]], RRR = 120;
const RG = [['ring', 'RING · k²/R² = 1'], ['ball', 'BALL · k²/R² = 2/5']].map(([kd, n], i) => { const gq = mk(rs, 'g', {}), [cx, cy] = RRC[i];
  mk(gq, 'circle', { cx, cy, r: RRR, fill: '#F4F1EA', stroke: IC, 'stroke-width': 3 }); mk(gq, 'circle', { cx, cy, r: 6, fill: IC }); txt(gq, cx, cy + RRR + 40, n, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: BODY[kd].col });
  const rr = M.rng(11 + i), dots = []; for (let j = 0; j < 36; j++) { let r, a = rr() * 6.283; r = i === 0 ? RRR - 6 : RRR * Math.cbrt(rr()) * 0.95; dots.push(mk(gq, 'circle', { cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a), r: 6, fill: BODY[kd].col })); }
  return { gq, dots }; });
const rNote = txt(rs, 392, 470, 'more mass far out → spin costs more energy', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: EC });

/* ---------- D ---------- */
const STEPS = [[`${KK} = \\tfrac12 m${vv}^2 + \\tfrac12 ${II}${om}^2`, 'moving + spinning'],
  [`${om} = ${vv}/R,\\; ${II} = mk^2 \\;\\Rightarrow\\; ${KK} = \\tfrac12 m${vv}^2\\left(1 + ${kR}\\right)`, 'k: radius of gyration'],
  [`mgh = \\tfrac12 m${vv}^2\\left(1 + ${kR}\\right)`, 'no slipping: friction does no work'],
  [`${vv} = \\sqrt{2gh\\,/\\left(1 + k^2/R^2\\right)}`, 'the mass cancels'],
  [`\\text{ring } 1,\\;\\; \\text{disc } \\tfrac12,\\;\\; \\text{ball } \\tfrac25`, 'smallest k²/R² wins']];
const SY = [84, 172, 260, 348, 436];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Total'), wt('D3', 'Put'), wt('D4', 'bottom'), wt('D5', 'v'), wt('D6', 'ring')];
const TBR = [['', 'k²/R²', 'spin', 'v m/s'], ['Ring', '1', '1/2', '3.13'], ['Disc', '1/2', '1/3', '3.61'], ['Ball', '2/5', '2/7', '3.74']];
$('#tbs').innerHTML = TBR.map((r, i) => `<div class="tb" id="tb${i}" style="top:${70 + i * 84}px;${i ? '' : 'font:600 17px IBM Plex Mono;letter-spacing:.06em;color:var(--mute)'}">${r.map((c, j) => `<span style="${i && j === 0 ? 'color:' + BODY[['', 'ring', 'disc', 'ball'][i]].col : ''}">${c}</span>`).join('')}</div>`).join('') + `<div class="pillp" id="tbP" style="left:16px;top:400px;background:var(--okBg);color:#1F6B3F">Ball wins · ring last · mass cancels</div>`;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${KK} = \\tfrac12 m${vv}^2\\left(1 + \\tfrac{k^2}{R^2}\\right) \\qquad ${vv} = \\sqrt{\\tfrac{2gh}{1 + k^2/R^2}}`);

/* ---------- K: ball rolls vs block slides ---------- */
const KV = [['#khS', 'ball'], ['#klS', 'block']].map(([id, kd]) => { const sv = $(id), x0 = 70, y0 = 150, L = 400; lane(sv, x0, y0 + 26 / Math.cos(HA), L);
  mk(sv, 'line', { x1: x0 + L * Math.cos(HA), y1: y0 + L * Math.sin(HA) - 10, x2: x0 + L * Math.cos(HA), y2: y0 + L * Math.sin(HA) + 50, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' });
  let b; if (kd === 'ball') b = body(sv, 'ball', 26); else { const o = mk(sv, 'g', {}), tr = mk(o, 'g', {}); mk(tr, 'rect', { x: -30, y: -26, width: 60, height: 52, rx: 6, fill: '#8D99AE', stroke: IC, 'stroke-width': 2.5 }); b = { o, set(x, y) { attr(tr, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(30)`); } }; }
  const va = PUC.arrow(sv, VC, 5, 15), rd = txt(sv, 500, 160, '', { fill: VC, 'font-weight': 700, 'font-size': 30 }), tt = txt(sv, 500, 200, '', { fill: IC, 'font-weight': 600, 'font-size': 20 });
  return { kd, b, va, rd, tt, x0, y0, L, a: kd === 'ball' ? acc(0.4) : G * SIN, sc: L / LEN }; });
$('#khP').innerHTML = `Some energy spins it: ${K(`${vv} = 3.74`)}`; $('#klP').innerHTML = `No spin: all energy is speed`;
const th2 = PUC.think($('#th2'), { q: 'Same height. Which reaches the bottom first: the rolling ball, or the sliding block?', opts: ['The rolling ball', 'The sliding block'], right: 1, why: 'None of its energy goes into spin: v = √(2gh) = 4.43 m/s.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A solid ball of mass 2 kg rolls without slipping at 3 m/s. Find its total kinetic energy, and the part that is spin.';
const wsol = PUC.solution($('#wl'), [
  [K(`\\tfrac12 m${vv}^2 = \\tfrac12 \\times 2 \\times 3^2 = ${tc(EC, '9\\ \\text{J}')}`)],
  [K(`\\text{spin} = \\tfrac25 \\times 9 = ${tc('#3F9E9E', '3.6\\ \\text{J}')}`)],
  [K(`${KK} = 9 + 3.6 = ${tc(EC, '12.6\\ \\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'); mk(w, 'line', { x1: 36, y1: 260, x2: 748, y2: 260, stroke: IC, 'stroke-width': 3 });
const wB = body(w, 'ball', 60), wV = PUC.arrow(w, VC, 6, 18), wVl = lab(w, 'v = 3 m/s', VC, 22);
const WBR = [['moving', 9, EC], ['spin', 3.6, EL]], WX = 160, WS = 36;
const wr1 = mk(w, 'rect', { x: WX, y: 340, height: 50, rx: 6, fill: EC }), wr2 = mk(w, 'rect', { y: 340, height: 50, rx: 6, fill: EL });
const wl1 = lab(w, '9 J', '#fff', 22), wl2 = lab(w, '3.6 J', '#1F5F5F', 20), wTot = lab(w, 'total 12.6 J', EC, 24);
txt(w, 36, 372, 'K', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30, fill: EC });
const tW = [wt('W3', 'Moving'), wt('W4', 'For'), wt('W5', 'Total')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Friction on a rolling body wastes energy', right: 'Contact point at rest: friction does no work' });
const tp = $('#tpS'), TPc = [300, 120], TPR = 70; mk(tp, 'line', { x1: 120, y1: TPc[1] + TPR + 4, x2: 520, y2: TPc[1] + TPR + 4, stroke: IC, 'stroke-width': 3 });
const tpG = mk(tp, 'g', {}); const tB = body(tpG, 'disc', TPR); tB.set(TPc[0], TPc[1], 0.4);
mk(tpG, 'circle', { cx: TPc[0], cy: TPc[1] + TPR, r: 8, fill: OK });
const tpF = PUC.arrow(tpG, FC, 6, 18); tpF.set(TPc[0] + 4, TPc[1] + TPR + 2, TPc[0] - 90, TPc[1] + TPR + 2);
const tpL = lab(tpG, 'f', FC, 26, { 'font-family': 'Poppins', 'font-style': 'italic' }); attr(tpL, 'x', TPc[0] - 70); attr(tpL, 'y', TPc[1] + TPR - 10);
const tpW = lab(tpG, 'v = 0 here, so W = 0', OK, 20); attr(tpW, 'x', 200); attr(tpW, 'y', TPc[1] + TPR + 44);
const where = PUC.where($('#wa'), { on: [], type: 'Races down a slope, energy shares, how high a rolling body climbs' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A solid cylinder rolls without slipping towards a slope at 4 m/s (g = 10 m/s²). How high up the slope does it climb?', qW: 760,
  opts: ['0.8 m', '1.2 m', '1.6 m', '1.12 m'], right: 1, optY: 300, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{solid cylinder: } ${kR} = \\tfrac12`)], [K(`\\tfrac12 m${vv}^2 (1.5) = mgh`)],
  [K(`h = \\dfrac{1.5\\,${vv}^2}{2g}`)], [K(`h = \\dfrac{16 \\times 1.5}{20} = 1.2\\ \\text{m}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'solid'), wt('A3', 'Energy'), wt('A4', 'h'), wt('A4', 'sixteen')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · kinetic energy of rolling', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`${KK} = \\tfrac12 m${vv}^2 + \\tfrac12 ${II}${om}^2 = \\tfrac12 m${vv}^2\\left(1 + ${kR}\\right)`), K(`${vv} = \\sqrt{\\tfrac{2gh}{1 + k^2/R^2}} \\qquad a = \\tfrac{g\\sin\\theta}{1 + k^2/R^2}`),
    '<b>k²/R²</b>: ring 1 · disc ½ · solid ball ⅖ → ball wins, ring last', '<b>No slipping</b>: friction does no work; mass and radius cancel'] });
const YQ = ['Why does the ring come last in the race?', 'Why do a heavy disc and a light disc of the same size tie?', 'Why does friction do no work on a body that rolls without slipping?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 7', topic: "Why are planets faster near the Sun? Gravitation: Kepler's Laws", y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS9 - 0.6, 1, 960, 540]]);
let gm = null;
function measure() { gm = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }

/* ---------- frame ---------- */
M.on(t => {
  if (!gm) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JB.forEach((b, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = Math.max(0, t - tMorph - 0.6 - i * 0.3) % 3, x = 60 + 60 * u; b.set(x, 92 - 26, x / 26); });
    vis($('#hjP'), t, wt('H2', 'same') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 20 });
    KINDS.forEach((kd, i) => { const k = BODY[kd].k, tau = Math.max(0, t - tHr) * 0.4, sm = pos(k, tau).sm, cx = HX0 + 22 + sm * HSC * Math.cos(HA); HB[i].set(cx, HYT[i] + (cx - HX0) * Math.tan(HA), sm * HSC / HRB); vis(HB[i].o, t, tH3 + 0.2, 1e9, { dy: 0 }); });
    hRank.forEach((g2, i) => vis(g2, t, [wt('H4', 'ball'), wt('H4', 'ball') + 0.5, wt('H4', 'ring')][i] - 0.1, 1e9, { dy: 0 }));
    vis($('#hkQ'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#syl'), t, wt('P4', 'Note') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const u = Math.max(0, t - tP1 - 0.5) % 5, x = 110 + 110 * u; pB.set(x, 230, (110 * u) / 70);
    const uv = M.o3((t - wt('P1', 'forward') + 0.1) / 0.4); pV.set(x, 230, x + 120 * uv, 230);
    const us = M.o3((t - wt('P1', 'spins') + 0.1) / 0.4), a0 = -2.4, a1 = a0 + 1.6 * us, rr = 92; attr(pW, 'd', us > 0.02 ? `M${x + rr * Math.cos(a0)},${230 + rr * Math.sin(a0)} A${rr},${rr} 0 0 1 ${x + rr * Math.cos(a1)},${230 + rr * Math.sin(a1)}` : '');
    pBars.forEach((b, i) => { const ub = M.o3((t - tQr[i] - 0.2) / 0.6); attr(b.r, 'width', (440 * b.f * ub).toFixed(1)); vis(b.g, t, tQr[i] - 0.1, 1e9, { dy: 0 }); });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1'), simOut = OUT('S9'), simIn2 = OUT('S10') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const S = state(t), tr = Math.round(S.tau * 100) / 100;
    KINDS.forEach((kd, i) => { const k = BODY[kd].k, p = pos(k, S.tau), cx = X0 + 26 + p.sm * SPX * Math.cos(HA), cy = YT[i] + (cx - X0) * Math.tan(HA);
      SB[i].set(cx, cy, p.sm * SPX / RB); vis(SB[i].o, t, tS1 + 0.4 + i * 0.1, 1e9, { dy: 0 });
      const moving = !S.ready && !S.frozen && !p.done && p.v > 0.2;
      SG[i].forEach((c, j) => { const q = pos(k, Math.max(0, S.tau - 0.05 * (j + 1))); attr(c, 'cx', (X0 + 26 + q.sm * SPX * Math.cos(HA)).toFixed(1)); attr(c, 'cy', (YT[i] + (26 + q.sm * SPX * Math.cos(HA)) * Math.tan(HA)).toFixed(1)); c.style.opacity = moving ? c._op : 0; });
      const L = 26 * p.v; SV[i].set(cx + RB * Math.cos(HA), cy + RB * Math.sin(HA), cx + (RB + L) * Math.cos(HA), cy + (RB + L) * Math.sin(HA));
      vis(SN[i], t, tS1 + 0.6 + i * 0.12, 1e9, { dy: 0 }); M.setT(SF[i], p.done ? (i + 1) + (i ? (i === 1 ? 'nd' : 'rd') : 'st') + ' · ' + f2(vEnd(k)) + ' m/s' : '');
      // readout row: speed + energy split per kg (moving part and spin part)
      const pr = pos(k, tr), Em = 0.5 * pr.v * pr.v, Es = Em * k, Emax = G * LEN * SIN, row = $('#rw' + i);
      row.querySelector('.m').style.width = (440 * Em / Emax).toFixed(1) + 'px'; const sEl = row.querySelector('.s'); sEl.style.left = (440 * Em / Emax).toFixed(1) + 'px'; sEl.style.width = (440 * Es / Emax).toFixed(1) + 'px';
      M.setT($('#rv' + i), f2(pr.v) + ' m/s');
      const hl = M.io((t - [wt('S7', 'ball'), wt('S7', 'disc'), wt('S7', 'ring')][i]) / 0.3) * (1 - M.io((t - tS8) / 0.3)); row.style.background = mix('#FFFFFF', '#E6F4F4', hl); row.style.borderRadius = '10px';
      const gv = x => acc(k) * Math.min(x, tEnd(k)); { let d = ''; const n = 40; for (let j = 0; j <= n; j++) { const x = S.tau * j / n; d += (j ? 'L' : 'M') + g.X(Math.min(x, 1.4)).toFixed(1) + ',' + g.Y(gv(x)).toFixed(1); } attr(GL[i], 'd', S.ready ? '' : d); }
      GD[i](Math.min(S.tau, 1.4), gv(S.tau), !S.ready); });
    vis($('#pb'), t, tL1, tS5 - 0.1, { ...POP, sc: 0.8, outDur: 0.15 }); if (t >= tRes) vis($('#pb'), t, tRes, out, { ...POP, sc: 0.8 });
    vis($('#smo'), t, tS5 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz, tRes - 0.1, { ...POP, sc: 0.8 });
    vis($('#th1'), t, tS9 + 0.05, OUT('S10'), { dy: 36, ...o });
    th1(t, { tin: tS9, tOpts: wt('S9', 'Which') - 0.1, tCount: T1('S9') + 0.05, dur: 3, tAns: tS10 - 0.02, tWhy: wt('S10', 'Mass') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    RG.forEach((q, i) => { vis(q.gq, t, tR1 + 0.7 + i * 0.2, 1e9, { dy: 0 }); q.dots.forEach((d, j) => vis(d, t, (i ? wt('R2', 'far') : tLk[0]) + j * 0.02, 1e9, { dy: 0 })); });
    vis(rNote, t, tLk[1] + 0.3, 1e9, { dy: 0 });
    avD(t, wt('R4', 'speed') + 0.2, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; 
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    TBR.forEach((_, i) => vis($('#tb' + i), t, i ? wt('D6', ['ring', 'disc', 'ball'][i - 1]) - 0.1 : tD1 + 0.6, 1e9, { dy: 10 }));
    vis($('#tbP'), t, wt('D6', 'smallest') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.04 }); M.rise($('#st2'), t, wt('T1', 'less') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'faster') + 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK2 + 0.3, 1e9, { dy: 8 });
    KV.forEach((q, i) => { const t0 = (i ? tK2 : tK1) + 0.6, te = Math.sqrt(2 * LEN / q.a), tau = Math.min(te, Math.max(0, t - t0) * 0.4), sm = 0.5 * q.a * tau * tau, v = q.a * tau;
      const cx = q.x0 + 30 + sm * q.sc * Math.cos(HA), cy = q.y0 + (cx - q.x0) * Math.tan(HA); q.b.set(cx, cy, sm * q.sc / 26);
      q.va.set(cx + 30 * Math.cos(HA), cy + 30 * Math.sin(HA), cx + (30 + 22 * v) * Math.cos(HA), cy + (30 + 22 * v) * Math.sin(HA));
      M.setT(q.rd, 'v = ' + f2(v) + ' m/s'); M.setT(q.tt, 't = ' + f2(tau) + ' s'); });
    vis($('#khP'), t, tK1 + 0.6 + Math.sqrt(2 * LEN / acc(0.4)) / 0.4, 1e9, POP); vis($('#klP'), t, wt('K2', 'spin') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'None') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const u = Math.max(0, t - T0('W2') - 0.4) % 4, x = 120 + 120 * u; wB.set(x, 198, 120 * u / 60); wV.set(x, 198, x + 120, 198); attr(wVl, 'x', x + 20); attr(wVl, 'y', 120);
    const u1 = M.o3((t - tW[0] - 0.3) / 0.6), u2 = M.o3((t - tW[1] - 0.6) / 0.6);
    attr(wr1, 'width', (9 * WS * u1).toFixed(1)); attr(wr2, 'x', (WX + 9 * WS).toFixed(1)); attr(wr2, 'width', (3.6 * WS * u2).toFixed(1));
    attr(wl1, 'x', WX + 14); attr(wl1, 'y', 372); wl1.style.opacity = u1; attr(wl2, 'x', WX + 9 * WS + 10); attr(wl2, 'y', 371); wl2.style.opacity = u2;
    attr(wTot, 'x', WX); attr(wTot, 'y', 440); vis(wTot, t, tW[2] + 0.3, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'friction') - 0.1, tStrike: wt('X3', 'In') - 0.1, tRight: wt('X3', 'contact') });
    vis(tpG, t, wt('X3', 'contact') + 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'races') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.2, tCount, tAns });
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

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
