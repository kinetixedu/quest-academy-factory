// BSc Physics world sample - Newton's first law (Motion lab)
(() => {
const { $ } = M;
const C = { bg: '#0B1220', panel: '#0F1A2E', panel2: '#16213A', edge: '#1F2C4A', chalk: '#EAF0FF', muted: '#7C8BAA', dim: '#3A4866', orange: '#FF8A3D', cyan: '#5CC8FF' };
const wt = M.wt;

/* ---------- beats ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02, tLab = tMorph + 0.3, tCards = wt('H2', 'explains');
const tA = [M.t0('N1') - 0.05, M.t0('N2') - 0.05, M.t0('N3') - 0.05], tAll = M.t1('N3') + 0.2;
const tRest = wt('N1', 'rest');
const tGo = wt('N2', 'moving') - 0.08, tRamp = 0.5;
const tSame = wt('N2', 'same');
const tB = wt('N3', 'force'), DB = 1.1, tStop = tB + DB;
const tIn = wt('N3', 'inertia') - 0.1;
const tPull = M.t0('Q1') - 0.3, tQ = tPull + 0.38;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'No');

/* ---------- physics: velocity profile, integrated once (deterministic) ---------- */
const V = 200, X0 = 80, NOSE = 320, DT = 1 / 600;
const vel = t => {
  const r = M.clamp((t - tGo) / tRamp), ramp = r * r * (3 - 2 * r);          // gentle start
  const b = M.clamp((t - tB) / DB);                                         // constant braking force -> linear slow-down
  return V * ramp * (1 - b);
};
const TAB = []; { let x = X0; for (let i = 0; i * DT <= 40; i++) { TAB.push(x); x += vel(i * DT) * DT; } }
const posX = t => { if (t <= 0) return X0; const f = t / DT, i = Math.floor(f); if (i + 1 >= TAB.length) return TAB[TAB.length - 1]; return TAB[i] + (TAB[i + 1] - TAB[i]) * (f - i); };

/* ---------- build ---------- */
const wheel = id => { $(id).innerHTML = `<circle r="22" fill="#0B1220" stroke="#EAF0FF" stroke-width="3"/><line x1="-14" y1="0" x2="14" y2="0" stroke="#7C8BAA" stroke-width="3" stroke-linecap="round"/><line x1="0" y1="-14" x2="0" y2="14" stroke="#7C8BAA" stroke-width="3" stroke-linecap="round"/><circle r="4" fill="#EAF0FF"/>`; };
wheel('#wh1'); wheel('#wh2');
let tk = ''; for (let x = 80, i = 0; x <= 1520; x += 80, i++) {
  tk += `<line x1="${x}" y1="300" x2="${x}" y2="${i % 4 ? 306 : 312}" stroke="${i % 4 ? '#2A3755' : '#3A4866'}" stroke-width="2"/>`;
  if (i % 4 === 0) tk += `<text x="${x}" y="334" text-anchor="middle" font-family="IBM Plex Mono" font-size="18" fill="#7C8BAA">${i * 2.5} m</text>`;
}
$('#ticks').innerHTML = tk;
const GH = ['#33415F', '#26324D', '#1C263D'];
$('#ghosts').innerHTML = GH.map((c, k) => `<g id="gh${k}"><rect x="0" y="120" width="320" height="136" rx="20" fill="#0F1A2E" stroke="${c}" stroke-width="3"/><circle cx="70" cy="270" r="22" fill="#0F1A2E" stroke="${c}" stroke-width="3"/><circle cx="250" cy="270" r="22" fill="#0F1A2E" stroke="${c}" stroke-width="3"/></g>`).reverse().join('');
// rest label (becomes the v arrow)
$('#labSvg').insertAdjacentHTML('beforeend', `<text id="v0" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="#5CC8FF">v = 0</text>`);

const CARDS = [
  { n: 'AT REST', t: 'Stays at rest', d: 'Nothing pushes, nothing moves', fx: 'v = 0', c: C.cyan },
  { n: 'MOVING', t: 'Keeps moving', d: 'Same speed, same direction', fx: 'v constant', c: C.cyan },
  { n: 'UNLESS', t: 'A force acts', d: 'Only a force changes motion', fx: 'F ≠ 0', c: C.orange },
];
CARDS.forEach((p, i) => $('#cards').insertAdjacentHTML('beforeend', `<div class="lc" id="c${i}" style="left:${M.col(i * 4)}px"><div class="bg"></div><div class="n">0${i + 1} · ${p.n}</div><div class="fx">${p.fx}</div><div class="tt hd">${p.t}</div><div class="ds">${p.d}</div></div>`));

// quiz options with tiny motion diagrams (3 snapshots of a ball + velocity arrow)
const arrow = (x, y, len, w = 4) => len < 6 ? '' : `<path d="M${x} ${y} H${x + len} M${x + len - 11} ${y - 9} L${x + len} ${y} L${x + len - 11} ${y + 9}" stroke="#5CC8FF" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
const OPTS = [{ t: 'It slowly stops', a: [96, 56, 16] }, { t: 'It keeps rolling', a: [96, 96, 96] }, { t: 'It speeds up', a: [40, 72, 104] }];
OPTS.forEach((o, i) => {
  let dg = `<line x1="0" y1="62" x2="448" y2="62" stroke="#2A3755" stroke-width="2"/>`;
  o.a.forEach((len, k) => { const x = k * 152; dg += `<circle cx="${x + 18}" cy="40" r="18" fill="#EAF0FF"/>` + arrow(x + 44, 40, len); });
  $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 4)}px"><div class="bg"></div><div class="lt">${'ABC'[i]}</div><div class="ot hd">${o.t}</div><div class="ok">${M.icon('check', 30, '#0B1220', 3)}</div><svg class="dg" width="448" height="64">${dg}</svg></div>`);
});
$('#takeI').innerHTML = M.icon(['M5 12h14', 'm12 5 7 7-7 7'], 44, '#0B1220', 2.6);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.04, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const arrowD = (x1, y, x2) => { const d = Math.sign(x2 - x1) || 1, L = Math.abs(x2 - x1), h = Math.min(14, L * 0.45); return L < 2 ? '' : `M${x1.toFixed(1)} ${y} H${x2.toFixed(1)} M${(x2 - d * h).toFixed(1)} ${y - h * 0.8} L${x2.toFixed(1)} ${y} L${(x2 - d * h).toFixed(1)} ${y + h * 0.8}`; };
const r1 = v => Math.round(v * 10) / 10;
let geo = null;
function measure() { const w = $('#title').offsetWidth; geo = { sx: 960 - w / 2, sy: 404, ex: 160, ey: 150, es: 68 / 128, cw: $('#eyebrow').offsetWidth }; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- focus pull transition (scene blurs + grows, quiz sharpens in) ---
  const fo = M.io((t - tPull) / 0.42), fi = M.spring(t - tQ, M.SOFT);
  const sA = $('#sceneA');
  if (fo <= 0) { sA.style.filter = ''; sA.style.transform = 'none'; sA.style.opacity = ''; M.hide(sA, false); }
  else if (fo >= 1) M.hide(sA, true);
  else { M.hide(sA, false); sA.style.filter = `blur(${(fo * 18).toFixed(2)}px)`; sA.style.transform = `scale(${(1 + 0.05 * fo).toFixed(4)})`; sA.style.opacity = (1 - M.io((t - tPull - 0.12) / 0.3)).toFixed(3); }
  const qz = $('#quiz');
  if (t < tQ) M.hide(qz, true);
  else {
    M.hide(qz, false);
    const op = M.clamp((t - tQ) / 0.3);
    if (fi >= 1 && op >= 1) { qz.style.filter = ''; qz.style.transform = 'none'; qz.style.opacity = ''; }
    else { qz.style.filter = (1 - fi) * 16 > 0.05 ? `blur(${((1 - fi) * 16).toFixed(2)}px)` : ''; qz.style.transform = `scale(${(0.965 + 0.035 * fi).toFixed(4)})`; qz.style.opacity = op.toFixed(3); }
  }

  if (fo < 1) {
    // --- title card -> header ---
    const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
    ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
    M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY });
    const ey = $('#eyebrow');
    ey.style.left = (m >= 1 ? 160 : M.lerp(960 - geo.cw / 2, 160, m)).toFixed(2) + 'px'; ey.style.top = (m >= 1 ? 96 : M.lerp(318, 96, m)).toFixed(2) + 'px';
    M.vis(ey, t, 0.08, 1e9, { dy: 18 });
    M.draw($('#tvecL'), t, 0.85, 0.55, M.o3); M.hide($('#tvecH'), t < 1.36); M.vis($('#tvecH'), t, 1.36, 1e9, { dy: 0, dx: -10, sp: M.SNAP, fade: 0.06 });
    M.vis($('#tvec'), t, 0.8, tMorph - 0.12, { dy: 0, outDur: 0.25, ody: 0, odx: 40 });
    M.rise($('#sub'), t, 1.1, { st: 0.04, out: tMorph - 0.12, outDur: 0.3 });

    // --- lab panel ---
    M.vis($('#lab'), t, tLab, 1e9, { dy: 40, sp: M.SOFT });
    const x = posX(t), v = vel(t), nose = x + NOSE;
    const xr = Math.round(x * 100) / 100;
    $('#bus').setAttribute('transform', `translate(${xr} 0)`);
    const rot = ((x - X0) / 22) * 180 / Math.PI;
    $('#wh1').setAttribute('transform', `translate(70 270) rotate(${rot.toFixed(2)})`);
    $('#wh2').setAttribute('transform', `translate(250 270) rotate(${rot.toFixed(2)})`);
    // ghosts: earlier positions, only while really moving
    GH.forEach((c, k) => { const g = $('#gh' + k), gx = posX(t - (k + 1) * 0.11); const show = v > 30 && x - gx > 8; M.hide(g, !show); if (show) g.setAttribute('transform', `translate(${gx.toFixed(2)} 0)`); });
    // passenger lean (inertia): body keeps going while the bus slows
    const lean = 22 * (M.spring(t - tB, [8, 0.78]) - M.spring(t - tStop, [7, 0.8]));
    $('#pax').setAttribute('transform', Math.abs(lean) < 0.02 ? '' : `rotate(${lean.toFixed(2)} 246 250)`);
    // v = 0 label at the nose (at rest), then the velocity arrow
    const v0 = $('#v0'); v0.setAttribute('x', nose + 24); v0.setAttribute('y', 178);
    M.vis(v0, t, tRest, tGo, { dy: 0, dx: -12, outDur: 0.18, odx: 10, ody: 0 });
    const vl = 136 * v / V, va = $('#vArr .p');
    M.hide($('#vArr'), vl < 3); va.setAttribute('d', arrowD(nose + 16, 170, nose + 16 + vl));
    const vLab = $('#vLab'); M.hide(vLab, vl < 40); vLab.setAttribute('x', (nose + 16 + vl / 2 - 7).toFixed(1)); vLab.setAttribute('y', 152);
    // braking force arrow: grows on "force", points back against the motion
    const fg = M.spring(t - tB + 0.05, M.SNAP) * (1 - M.io((t - tStop - 0.05) / 0.3));
    const fl = 120 * fg, fa = $('#fArr .p');
    M.hide($('#fArr'), fl < 3); fa.setAttribute('d', arrowD(nose + 16 + fl, 236, nose + 16));
    const fLab = $('#fLab'); M.hide(fLab, fl < 40); fLab.setAttribute('x', (nose + 16 + fl / 2 - 7).toFixed(1)); fLab.setAttribute('y', 272);
    // readouts
    M.setT($('#roVv'), (r1(v / 32)).toFixed(1) + ' m/s');
    const braking = t >= tB - 0.05 && t < tStop + 0.2;
    M.setT($('#roFv'), braking ? 'brakes' : 'none');
    $('#roFv').style.color = braking ? C.orange : C.muted;
    // inertia callout + leader to passenger
    const stopX = posX(tStop);
    const co = $('#callout'); co.style.left = (stopX + 246 - 120) + 'px';
    M.vis(co, t, tIn, 1e9, { dy: -14, sp: M.SOFT });
    const ld = $('#lead'); ld.setAttribute('d', `M${(stopX + 246).toFixed(1)} 74 V146`); M.draw(ld, t, tIn + 0.12, 0.3, M.o3);

    // --- law cards ---
    CARDS.forEach((p, i) => {
      const el = $('#c' + i), tin = tCards + i * 0.08;
      M.vis(el, t, tin, 1e9, { dy: 32 });
      const on = M.io((t - tA[i]) / 0.3), off = M.io((t - (i < 2 ? tA[i + 1] : tAll)) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg');
      bg.style.background = M.mix(C.panel, C.panel2, act); bg.style.borderColor = M.mix(M.mix(C.edge, '#2A3A5E', off), p.c, act);
      el.querySelector('.tt').style.color = M.mix(C.dim, C.chalk, on);
      el.querySelector('.ds').style.color = M.mix('#2E3B58', C.muted, on);
      el.querySelector('.n').style.color = M.mix(C.dim, act > 0.5 ? p.c : C.muted, on);
      const fx = el.querySelector('.fx'); fx.style.color = M.mix(C.dim, p.c, on); fx.style.borderColor = M.mix(C.edge, p.c, act);
    });
  }

  // --- quick check ---
  if (t >= tQ) {
    M.vis($('#qchip'), t, tQ + 0.02, 1e9, { dy: 14 });
    M.rise($('#qq1'), t, tQ + 0.08, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.5 + i * 0.09, 1e9, { dy: 36 });
      const right = i === 1, r = M.io((t - tAns) / 0.3);
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.panel, C.panel2, r) : C.panel;
      bg.style.borderColor = right ? M.mix(C.edge, C.cyan, r) : C.edge;
      el.querySelector('.ot').style.color = right ? C.chalk : M.mix(C.chalk, C.dim, r);
      el.querySelector('.dg').style.opacity = right ? '' : (1 - 0.7 * r).toFixed(3);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.panel2, C.cyan, r) : C.panel2; lt.style.color = right ? M.mix(C.chalk, C.bg, r) : M.mix(C.chalk, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 36 });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.04 });
  }
  caps(t);
});

/* ---------- sound: whoosh thud tick blip correct ---------- */
M.sfx(0.1, 'whoosh', 0.45); M.sfx(1.36, 'tick', 0.4);
M.sfx(tMorph, 'whoosh', 0.4);
CARDS.forEach((p, i) => M.sfx(tA[i], 'blip', 0.3, -0.3 + i * 0.3));
M.sfx(tRest, 'tick', 0.35, -0.6);
M.sfx(tGo, 'whoosh', 0.3, -0.4);
M.sfx(tB, 'tick', 0.45, 0.3); M.sfx(tStop, 'thud', 0.5, 0.4);
M.sfx(tIn, 'blip', 0.35, 0.4);
M.sfx(tPull, 'whoosh', 0.45);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.05, 'correct', 0.55); M.sfx(tTake, 'blip', 0.3);
M.outro({ bg: '#0B1220', ink: '#EAF0FF', accent: '#FF8A3D', sub: 'rgba(234,240,255,.6)', font: 'Space Grotesk' });
})();
