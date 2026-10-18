// Engineering Electrical world sample - Ohm's law (Power grid)
(() => {
const { $ } = M;
const C = { bg: '#121417', panel: '#1B1F24', panel2: '#22272E', line: '#39404A', line2: '#2A3038', white: '#F4F5F7', muted: '#8B939E', dim: '#4A525D', yel: '#FFC93C', blue: '#6EA8FF', pipe: '#2A3038' };
const wt = M.wt;

/* ---------- beats ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02, tPW = M.t0('H2') + 0.4, tWater = wt('H2', 'water'), tPC = M.t0('H2') + 0.55;
const tCards = wt('H2', 'pipe') + 0.1;
const tV = wt('O1', 'Voltage') - 0.05, tPush = wt('O1', 'push'), tPress = wt('O1', 'pressure');
const tI = wt('O2', 'Current') - 0.05, tFlowW = wt('O2', 'flow'), tR = wt('O2', 'Resistance') - 0.05, tNarrow = wt('O2', 'narrow');
const tF = M.t0('O3') - 0.1;
const tLand = [wt('O3', 'Voltage'), wt('O3', 'current'), wt('O3', 'resistance')];
const tEq = wt('O3', 'equals'), tX = wt('O3', 'times');
const tMore = wt('O3', 'More'), tMore2 = wt('O3', 'more', 1);
const tSlam = M.t0('Q1') - 0.38, tSwap = tSlam + 0.3, tRetract = M.t0('Q1') + 0.3, tQ = tRetract + 0.12;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Two');

/* ---------- example circuit state (V, R -> I) ---------- */
const ST = [[0, 0, 3], [tPush, 6, 3], [tNarrow, 6, 6], [tMore, 18, 6]];
const state = t => { let s = ST[0]; for (const k of ST) if (t >= k[0]) s = k; return s; };
const Itr = M.track(0, ST.slice(1).map(([a, v, r]) => [a, v / r, M.SOFT]));
// dash offset = integral of current (constant-speed flow between changes)
const DT = 1 / 300, OFF = []; { let o = 0; for (let i = 0; i * DT <= 40; i++) { OFF.push(o); o += 46 * Itr(i * DT) * DT; } }
const offAt = t => { const f = Math.max(0, t) / DT, i = Math.floor(f); return i + 1 >= OFF.length ? OFF[OFF.length - 1] : OFF[i] + (OFF[i + 1] - OFF[i]) * (f - i); };

/* ---------- build ---------- */
const CARDS = [
  { s: 'V', n: 'VOLTAGE', t: 'The push', u: 'measured in volts' },
  { s: 'I', n: 'CURRENT', t: 'The flow', u: 'measured in amps' },
  { s: 'R', n: 'RESISTANCE', t: 'How narrow', u: 'measured in ohms' },
];
CARDS.forEach((c, i) => $('#cards').insertAdjacentHTML('beforeend', `<div class="cd" id="c${i}" style="left:${M.col(i * 4)}px"><div class="bg"></div><div class="lb"></div><div class="n">${c.n}</div><div class="tt wide">${c.t}</div><div class="u">${c.u}</div></div>`));
const SYM = ['#sV', '#sI', '#sR'];
const CARD_XY = i => [M.col(i * 4) + 36, 642 + 49];
const FORM_XY = i => [500 + i * 400, 670];
const OPTS = ['2.5 V', '7 V', '10 V', '25 V'];
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 3)}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot">${o}</div><div class="ok">${M.icon('check', 28, '#FFC93C', 3)}</div></div>`));
$('#takeI').innerHTML = M.icon('zap', 44, '#121417', 2.4);
$('#stW').insertAdjacentHTML('afterend', '');
$('#pC .k').textContent = 'CIRCUIT · EXAMPLE';

// water rig, drawn in JS so layering is exact: tank, then pipe on top of the tank wall
const CY = 262, WIDE = 22;
$('#pW svg').innerHTML = `
  <rect x="64" y="80" width="168" height="220" rx="8" fill="#22272E"/>
  <rect id="water" x="64" y="300" width="168" height="0" fill="#6EA8FF"/>
  <path d="M64 80 V292 a8 8 0 0 0 8 8 H224 a8 8 0 0 0 8 -8 V80" fill="none" stroke="#8B939E" stroke-width="3" stroke-linejoin="round"/>
  <path id="pipeW" fill="#2A3038"/>
  <path id="flowW" fill="none" stroke="#DCE9FF" stroke-width="5" stroke-linecap="round" stroke-dasharray="16 24" d="M240 ${CY} H784"/>
  <path id="pipeO" fill="none" stroke="#8B939E" stroke-width="3" stroke-linejoin="round"/>
  <g id="push" fill="none" stroke="#FFC93C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M148 0 V40 M134 26 L148 40 L162 26"/></g>`;
const pipe = nh => {
  const top = x => x, P = [[233, WIDE], [392, WIDE], [432, nh], [552, nh], [592, WIDE], [790, WIDE]];
  const T = P.map(([x, h]) => `${x} ${(CY - h).toFixed(2)}`), B = P.slice().reverse().map(([x, h]) => `${x} ${(CY + h).toFixed(2)}`);
  return { fill: `M${T.join(' L')} L${B.join(' L')} Z`, out: `M233 ${CY - WIDE} L${T.slice(1).join(' L')} M233 ${CY + WIDE} L${P.slice(1).map(([x, h]) => `${x} ${(CY + h).toFixed(2)}`).join(' L')}` };
};

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.04, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const r2 = v => Math.abs(v - Math.round(v)) < 0.01 ? Math.round(v) : +v.toFixed(2);
let geo = null;
function measure() { const w = $('#title').offsetWidth; geo = { sx: 960 - w / 2, sy: 408, ex: 160, ey: 152, es: 64 / 132, cw: $('#eyebrow').offsetWidth, tw: w }; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const sceneOn = t < tSwap, quizOn = t >= tSwap;
  M.hide($('#sceneA'), !sceneOn); M.hide($('#quiz'), !quizOn);

  // --- hazard bar slam: snaps in from the left, holds over the swap, retracts to the right ---
  const hz = $('#hz');
  const a = M.spring(t - tSlam, [26, 0.86]), b = M.io((t - tRetract) / 0.34);
  const hx = -1990 * (1 - a) + 1990 * b;
  M.hide(hz, t < tSlam || b >= 1);
  hz.style.transform = Math.abs(hx) < 0.01 ? 'none' : `translateX(${hx.toFixed(1)}px)`;
  M.vis($('#hzT'), t, tSlam + 0.12, 1e9, { dy: 0, dx: -40, sp: M.SNAP, fade: 0.08 });

  if (sceneOn) {
    // --- title -> header ---
    const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
    ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
    M.rise(ti, t, tTitle, { st: 0.09, sp: M.HEAVY, rot: 0 });
    const ey = $('#eyebrow');
    ey.style.left = (m >= 1 ? 160 : M.lerp(960 - geo.cw / 2, 160, m)).toFixed(2) + 'px'; ey.style.top = (m >= 1 ? 96 : M.lerp(318, 96, m)).toFixed(2) + 'px';
    M.vis(ey, t, 0.08, 1e9, { dy: 18 });
    // yellow bar: slams under the title then retracts on the morph
    const tb = $('#tbar'), bu = M.spring(t - 0.95, [22, 0.86]) * (1 - M.io((t - tMorph + 0.05) / 0.25));
    M.hide(tb, bu <= 0.002);
    tb.style.left = (960 - 120) + 'px'; tb.style.top = '584px'; tb.style.width = '240px';
    tb.style.transform = bu >= 1 ? 'none' : `scaleX(${bu.toFixed(4)})`;
    M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.12, outDur: 0.3 });

    // --- panels ---
    M.vis($('#pW'), t, tPW, 1e9, { dy: 36 });
    M.vis($('#pC'), t, tPC, 1e9, { dy: 36 });
    const [, Vn, Rn] = state(t), I = Itr(t);
    // tank water: fills on "water", rises on "pressure" and again on "More push"
    const h = M.track(0, [[tWater, 96, M.SOFT], [tPress, 150, M.SOFT], [tMore, 184, M.SOFT]])(t), hr = r2(h);
    const w = $('#water'); w.setAttribute('y', (300 - hr)); w.setAttribute('height', hr);
    const push = $('#push'), pp = M.spring(t - tPush, M.SNAP);
    M.hide(push, t < tPush); push.style.opacity = M.clamp((t - tPush) / 0.12);
    push.setAttribute('transform', `translate(0 ${r2(300 - hr - 52 - (1 - pp) * 26)})`);
    const ps = M.mix('#FFC93C', '#FFC93C', 0); push.setAttribute('stroke', ps);
    M.setT($('#stW'), t < tPress ? 'PRESSURE · LOW' : t < tMore ? 'PRESSURE · HIGH' : 'PRESSURE · HIGHER');
    $('#stW').style.color = t < tPress ? C.muted : C.yel;
    // pipe narrows on "narrow"
    const nh = M.track(WIDE, [[tNarrow, 9, M.SOFT]])(t), pg = pipe(r2(nh));
    $('#pipeW').setAttribute('d', pg.fill); $('#pipeO').setAttribute('d', pg.out);
    const wf = M.io((t - tPush) / 0.4);
    $('#pipeW').setAttribute('fill', M.mix(C.pipe, '#3C6FC0', wf));
    $('#pipeO').setAttribute('stroke', M.mix(C.muted, C.yel, M.io((t - tNarrow) / 0.3) * (1 - M.io((t - tF) / 0.4))));
    const off = offAt(t - tPush);
    $('#flowW').style.strokeDashoffset = (-off).toFixed(1); M.hide($('#flowW'), wf <= 0); $('#flowW').style.opacity = wf.toFixed(3);
    $('#flowC').style.strokeDashoffset = (-off).toFixed(1); M.hide($('#flowC'), wf <= 0); $('#flowC').style.opacity = wf.toFixed(3);
    // circuit: battery, resistor, bulb brightness = current / 3 A
    const vAct = M.io((t - tV) / 0.3);
    ['#bp1', '#bn1'].forEach(id => $(id).setAttribute('stroke', M.mix(C.muted, C.yel, vAct)));
    M.vis($('#cell2'), t, tMore, 1e9, { dy: 0, sc: 1 });
    $('#cell2').setAttribute('transform', `translate(0 ${r2((1 - M.spring(t - tMore, M.SNAP)) * -10)})`);
    $('#res').setAttribute('stroke', M.mix(C.muted, C.yel, M.io((t - tR) / 0.3) * (1 - M.io((t - tF) / 0.4))));
    const br = M.clamp(I / 3);
    $('#bulb').setAttribute('fill', M.mix(C.panel2, C.yel, br)); $('#bulb').setAttribute('stroke', M.mix(C.muted, C.yel, br));
    $('#fil').setAttribute('stroke', M.mix(C.muted, '#FFFFFF', br));
    $('#halo').setAttribute('opacity', (0.22 * br).toFixed(3)); $('#halo2').setAttribute('opacity', (0.1 * br * br).toFixed(3));
    M.setT($('#stC'), t < tPush ? 'NO CURRENT' : `${Vn} V · ${Rn} Ω · ${(Vn / Rn).toFixed(0)} A`);
    $('#stC').style.color = t < tPush ? C.muted : C.yel;
    // labels land on their words
    M.vis($('#tgP'), t, tPress, 1e9, { dy: 12, sp: M.SNAP }); M.vis($('#tgB'), t, tV + 0.1, 1e9, { dy: 12, sp: M.SNAP });
    M.vis($('#tgF'), t, tFlowW, 1e9, { dy: 12, sp: M.SNAP }); M.vis($('#tgI'), t, tI + 0.1, 1e9, { dy: 12, sp: M.SNAP });
    M.vis($('#tgN'), t, tNarrow, 1e9, { dy: 12, sp: M.SNAP }); M.vis($('#tgR'), t, tR + 0.1, 1e9, { dy: 12, sp: M.SNAP });

    // --- cards -> formula strip ---
    const TA = [tV, tI, tR];
    CARDS.forEach((c, i) => {
      const el = $('#c' + i);
      M.vis(el, t, tCards + i * 0.08, tF, { dy: 32, outDur: 0.3, ody: 0 });
      const on = M.io((t - TA[i]) / 0.3), off2 = M.io((t - (i < 2 ? TA[i + 1] : tF)) / 0.35), act = on * (1 - off2);
      const bg = el.querySelector('.bg');
      bg.style.background = M.mix(C.panel, C.panel2, act); bg.style.borderColor = M.mix(C.line2, C.yel, act);
      el.querySelector('.lb').style.background = M.mix(C.panel2, C.yel, act);
      el.querySelector('.tt').style.color = M.mix(C.dim, C.white, on);
      el.querySelector('.n').style.color = M.mix(C.dim, act > 0.5 ? C.yel : C.muted, on);
      el.querySelector('.u').style.color = M.mix('#363C45', C.muted, on);
    });
    M.vis($('#strip'), t, tF, 1e9, { dy: 0, fade: 0.3 });
    SYM.forEach((id, i) => {
      const s = $(id), [x0, y0] = CARD_XY(i), [x1, y1] = FORM_XY(i), p = M.spring(t - tLand[i], M.HEAVY);
      M.vis(s, t, tCards + i * 0.08 + 0.05, 1e9, { dy: 32 });
      const x = M.lerp(x0, x1, p), y = M.lerp(y0, y1, p) - Math.sin(Math.PI * p) * 40 * (p < 1 ? 1 : 0);
      s.style.left = r2(x) + 'px'; s.style.top = r2(y) + 'px';
      const on = M.io((t - TA[i]) / 0.3), off2 = M.io((t - (i < 2 ? TA[i + 1] : tF)) / 0.35), act = on * (1 - off2);
      let col = M.mix(M.mix(C.dim, C.white, on), C.bg, act);                 // dark on the lit yellow badge
      const land = M.io((t - tLand[i]) / 0.3) * (1 - M.io((t - (tLand[i + 1] || tMore) ) / 0.35));
      col = M.mix(col, C.yel, land);
      if (i === 0) col = M.mix(col, C.yel, M.io((t - tMore) / 0.3));
      if (i === 1) col = M.mix(col, C.yel, M.io((t - tMore2) / 0.3));
      s.style.color = col;
    });
    M.vis($('#opE'), t, tEq, 1e9, { dy: 0, sc: 0.6, sp: M.SNAP });
    M.vis($('#opX'), t, tX, 1e9, { dy: 0, sc: 0.6, sp: M.SNAP });
    ['#uV', '#uI', '#uR'].forEach((id, i) => M.vis($(id), t, tLand[i] + 0.3, 1e9, { dy: 10 }));
  }

  // --- quick check ---
  if (quizOn) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 14 });
    M.rise($('#qq1'), t, tQ + 0.05, { st: 0.05, sp: M.HEAVY, rot: 0 });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY, rot: 0 });
    M.vis($('#g1'), t, wt('Q1', 'amps'), 1e9, { dy: 12, sp: M.SNAP });
    M.vis($('#g2'), t, wt('Q1', 'ohms'), 1e9, { dy: 12, sp: M.SNAP });
    M.vis($('#g3'), t, wt('Q1', 'voltage'), 1e9, { dy: 12, sp: M.SNAP });
    M.setT($('#g3').lastChild, t >= tAns ? '10 V' : '?');
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'What') + 0.15 + i * 0.07, 1e9, { dy: 32, sp: M.SNAP });
      const right = i === 2, r = M.io((t - tAns) / 0.25);
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.panel, C.yel, r) : C.panel;
      bg.style.borderColor = right ? M.mix(C.line2, C.yel, r) : C.line2;
      el.querySelector('.ot').style.color = right ? M.mix(C.white, C.bg, r) : M.mix(C.white, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.panel2, C.bg, r) : C.panel2; lt.style.color = right ? M.mix(C.white, C.yel, r) : M.mix(C.white, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.08, 1e9, { dy: 0, sc: 0.4, sp: M.SNAP, fade: 0.06 }); else M.hide(ok, true);
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 32, sp: M.SNAP });
    M.rise($('#takeT'), t, tTake + 0.08, { st: 0.04, rot: 0 });
    M.vis($('#takeM'), t, wt('A1', 'times'), 1e9, { dy: 0, dx: 20, sp: M.SNAP });
  }
  caps(t);
});

/* ---------- sound: hum (low) zap clunk tick correct ---------- */
M.sfx(0.1, 'clunk', 0.4); M.sfx(0.95, 'zap', 0.25);
M.sfx(tMorph, 'clunk', 0.3);
M.sfx(tPW, 'tick', 0.3, -0.4); M.sfx(tPC, 'tick', 0.3, 0.4);
[tV, tI, tR].forEach((ta, i) => M.sfx(ta, 'tick', 0.4, -0.4 + i * 0.4));
M.sfx(tPush, 'hum', 0.15, 0.3); M.sfx(tPush + 0.05, 'zap', 0.22, 0.4);
M.sfx(tNarrow, 'clunk', 0.3, -0.3);
tLand.forEach((tl, i) => M.sfx(tl + 0.15, 'clunk', 0.35, -0.3 + i * 0.3));
M.sfx(tMore, 'zap', 0.3, 0.4);
M.sfx(tSlam, 'clunk', 0.55); M.sfx(tRetract, 'zap', 0.25);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.05, 'correct', 0.55); M.sfx(tTake, 'tick', 0.3);
M.outro({ bg: '#121417', ink: '#FFFFFF', accent: '#FFC93C', sub: 'rgba(255,255,255,.6)', font: 'Archivo' });
})();
