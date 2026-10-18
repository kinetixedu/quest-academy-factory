// BCom world sample - The accounting equation (Ledger book)
(() => {
const { $ } = M;
const C = { ink: '#1D2B3A', ink2: '#4A5868', muted: '#8592A0', dim: '#B7C0CA', paper: '#FBF8F1', rule: '#DCE5F0', rule2: '#C5D3E4', green: '#2F6B4F', greenT: '#E3EEE7', red: '#D9534F', card: '#FFFFFF' };
const wt = M.wt, mix = M.mix;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const PG = 1088;    // page height on the strip (17 ruled lines of 64)

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.3, tSub = wt('H1', 'business'), tMorph = M.t0('H2') + 0.02;
const tT = wt('H2', 'simple'), tEqH = wt('H2', 'equation');
const tA = M.t0('E1'), tR = [wt('E1', 'everything'), wt('E1', 'business'), wt('E1', 'has')], tAT = M.t1('E1') - 0.1;
const tL = M.t0('E2'), tLoan = wt('E2', 'owes');
const tC = M.t0('E3'), tCap = wt('E3', 'share');
const tE = [wt('E3', 'Assets'), wt('E3', 'equal'), wt('E3', 'liabilities'), wt('E3', 'plus'), wt('E3', 'capital', 1)];
const tBal = tE[4] + 0.15;
const tTurn = M.t0('Q1') - 0.55, tTurnD = 0.75, tQ = tTurn + tTurnD - 0.05;
const tQa = wt('Q1', 'lakh'), tQl = wt('Q1', 'forty'), tQc = wt('Q1', 'capital');
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Both');

/* ---------- figures (Indian grouping) ---------- */
const inr = n => { const s = String(Math.round(n)); if (s.length <= 3) return '₹' + s; const last = s.slice(-3); let rest = s.slice(0, -3); rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ','); return '₹' + rest + ',' + last; };
const ROWS = [
  { id: 'r0', v: 50000, t: tR[0] }, { id: 'r1', v: 30000, t: tR[1] }, { id: 'r2', v: 20000, t: tR[2] },
  { id: 'r3', v: 40000, t: tLoan }, { id: 'r4', v: 60000, t: tCap + 0.1 },
  { id: 'r5', v: 100000, t: tAT }, { id: 'r6', v: 100000, t: tE[1] },
];
const CPS = 0.055;   // seconds per typed character
// digit-by-digit typing with a caret while typing (right-aligned, so the caret leads)
const typeIn = (el, t, t0, str) => {
  const n = M.clamp(Math.floor((t - t0) / CPS) + 1, 0, str.length);
  const typing = t >= t0 && n < str.length + 2 && t < t0 + (str.length + 3) * CPS;
  const key = n + (typing ? '|' : '');
  if (el._k !== key) { el._k = key; el.innerHTML = (t < t0 ? '' : str.slice(0, n)) + (typing ? '<i class="car"></i>' : ''); }
};

/* ---------- scale SVG ---------- */
$('#scl').innerHTML = `
  <g id="sbase"><rect x="196" y="312" width="120" height="12" rx="2" fill="#1D2B3A"/><rect x="250" y="116" width="12" height="200" fill="#1D2B3A"/><circle cx="256" cy="116" r="12" fill="#1D2B3A"/></g>
  <g id="beam"><rect x="-160" y="-5" width="320" height="10" rx="3" fill="#1D2B3A"/></g>
  <g id="panL"><line x1="0" y1="0" x2="-56" y2="92" stroke="#1D2B3A" stroke-width="2"/><line x1="0" y1="0" x2="56" y2="92" stroke="#1D2B3A" stroke-width="2"/><path d="M-72 92 H72 A72 30 0 0 1 -72 92Z" fill="#1D2B3A"/>
    <text id="pLt" x="0" y="164" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="24" fill="#1D2B3A"></text><text x="0" y="198" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="18" letter-spacing="2.5" fill="#8592A0">ASSETS</text></g>
  <g id="panR"><line x1="0" y1="0" x2="-56" y2="92" stroke="#1D2B3A" stroke-width="2"/><line x1="0" y1="0" x2="56" y2="92" stroke="#1D2B3A" stroke-width="2"/><path d="M-72 92 H72 A72 30 0 0 1 -72 92Z" fill="#1D2B3A"/>
    <text id="pRt" x="0" y="164" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="24" fill="#1D2B3A"></text><text x="0" y="198" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="18" letter-spacing="2.5" fill="#8592A0">L + C</text></g>`;
$('#scl').setAttribute('viewBox', '0 0 512 448');

/* ---------- quiz options ---------- */
const OPTS = ['₹40,000', '₹60,000', '₹1,40,000'];
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="top:${PG + 384 + i * 128}px;height:96px"><div class="lt" style="top:20px">${'ABC'[i]}</div><div class="ot" style="top:22px">${o}</div><div class="ok" style="top:20px">${M.icon('check', 28, '#fff', 3)}</div></div>`));
$('#takeI').innerHTML = M.icon('equal', 30, '#fff', 3);

const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
function measure() {
  const w = $('#title').offsetWidth;
  geo = { sx: 960 - w / 2, sy: 448, ex: 160, ey: 150, es: 0.5, cw: $('#eyebrow').offsetWidth };
}
// sums over time (what is written so far)
const sumAt = (t, ids) => ROWS.filter(r => ids.includes(r.id) && t >= r.t + 6 * CPS).reduce((a, r) => a + r.v, 0);
const tilt = (() => {
  const evs = [...new Set([...ROWS.slice(0, 5).map(r => r.t + 6 * CPS)])].sort((a, b) => a - b);
  const keys = evs.map(tt => { const L = sumAt(tt + 1e-3, ['r0', 'r1', 'r2']), R = sumAt(tt + 1e-3, ['r3', 'r4']); return [tt, L + R ? 11 * (L - R) / Math.max(L, R) : 0, [7.5, 0.76]]; });
  return M.track(0, keys, [7.5, 0.76]);
})();

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- page turn: the whole ledger strip slides up one page (ruled lines carry over) ---
  const pu = M.io((t - tTurn) / tTurnD);
  const strip = $('#strip');
  strip.style.transform = pu <= 0 ? 'none' : pu >= 1 ? `translateY(${-PG}px)` : `translateY(${f2(-PG * pu)}px)`;
  const p1 = t < tTurn + tTurnD + 0.05, p2 = t >= tTurn - 0.05;

  // --- title -> header ---
  const m = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, m), y = M.lerp(geo.sy, geo.ey, m), s = M.lerp(1, geo.es, m);
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${f2(x)}px,${f2(y)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, rot: 0 });
  const ey = $('#eyebrow');
  ey.style.left = f2(M.lerp(960 - geo.cw / 2, 160, m)) + 'px'; ey.style.top = f2(M.lerp(360, 96, m)) + 'px';
  M.vis(ey, t, 0.12, 1e9, { dy: 14 });
  M.rise($('#sub'), t, tSub, { st: 0.035, rot: 0, out: tMorph - 0.12, outDur: 0.28 });
  M.vis($('#exf'), t, tA - 0.2, 1e9, { dy: 10 });

  // --- T-account draws on, rows slide onto the rules ---
  if (p1) {
    M.draw($('#tH'), t, tMorph + 0.35, 0.55, M.o3); M.draw($('#tV'), t, tMorph + 0.6, 0.45, M.o3);
    M.rise($('#hA'), t, tA, { st: 0.05, rot: 0 });
    M.rise($('#hL'), t, tL, { st: 0.05, rot: 0 });
    M.vis($('#hP'), t, tC - 0.02, 1e9, { dy: 0, sc: 0.6, sp: M.SNAP });
    M.rise($('#hC'), t, tC + 0.05, { st: 0.05, rot: 0 });
    $('#hP').style.color = C.green;
    ROWS.forEach((r, i) => {
      const el = $('#' + r.id), tin = r.t - 0.12;
      M.vis(el, t, tin, 1e9, { dx: i >= 5 ? 0 : -28, dy: 0, sp: M.SNAP, fade: 0.12 });
      typeIn(el.querySelector('.am'), t, r.t, inr(r.v));
    });
    // active side tint (solid colour change, not transparency)
    // subtotal rules + double underline on the balancing totals
    M.draw($('#sL'), t, tAT - 0.2, 0.3, M.o3); M.draw($('#sR'), t, tE[1] - 0.2, 0.3, M.o3);
    M.draw($('#dL'), t, tBal, 0.5, M.io); M.draw($('#dR'), t, tBal + 0.08, 0.5, M.io);
    // scale card
    M.vis($('#scard'), t, tEqH, 1e9, { dy: 24, sp: M.SOFT });
    const th = tilt(t), rad = th * Math.PI / 180, cx = 256, cy = 116, hl = 152;
    const settled = Math.abs(th) < 0.01;
    $('#beam').setAttribute('transform', `translate(${cx} ${cy}) rotate(${settled ? 0 : f2(-th)})`);
    const lx = cx - hl * Math.cos(rad), ly = cy + hl * Math.sin(rad), rx = cx + hl * Math.cos(rad), ry = cy - hl * Math.sin(rad);
    $('#panL').setAttribute('transform', settled ? `translate(${cx - hl} ${cy})` : `translate(${f2(lx)} ${f2(ly)})`);
    $('#panR').setAttribute('transform', settled ? `translate(${cx + hl} ${cy})` : `translate(${f2(rx)} ${f2(ry)})`);
    M.setT($('#pLt'), inr(sumAt(t, ['r0', 'r1', 'r2'])));
    M.setT($('#pRt'), inr(sumAt(t, ['r3', 'r4'])));
    const st = $('#stamp'), sp = M.spring(t - tBal - 0.25, M.POP);
    if (t < tBal + 0.25) M.hide(st, true);
    else { M.hide(st, false); st.style.opacity = M.clamp((t - tBal - 0.25) / 0.06).toFixed(3); st.style.transform = sp >= 1 ? 'rotate(-4deg)' : `rotate(${f2(-4 - (1 - sp) * 6)}deg) scale(${(1 + 0.6 * (1 - sp)).toFixed(4)})`; }
    // equation builds word by word on the spoken words
    ['#e0', '#e1', '#e2', '#e3', '#e4'].forEach((id, k) => M.rise($(id), t, tE[k] - 0.04, { st: 0.04, rot: 0, sp: M.SNAP }));
    const eqOn = M.io((t - tBal) / 0.3);
    ['#e0', '#e2', '#e4'].forEach(id => ($(id).style.color = mix(C.ink, C.ink, eqOn)));
  }

  // --- quiz page ---
  M.hide($('#quiz'), !p2);
  if (p2) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 14 });
    M.rise($('#qqT'), t, tQ + 0.15, { st: 0.05, rot: 0, sp: M.HEAVY });
    M.draw($('#qH'), t, tQ + 0.05, 0.5, M.o3); M.draw($('#qV'), t, tQ + 0.25, 0.4, M.o3);
    M.rise($('#qhA'), t, tQ + 0.2, { st: 0.05, rot: 0 });
    M.rise($('#qhR'), t, tQ + 0.35, { st: 0.05, rot: 0 });
    [['#q0', tQa, '₹1,00,000'], ['#q1', tQl, '₹40,000'], ['#q2', tQc, null]].forEach(([id, tin, str]) => {
      const el = $(id); M.vis(el, t, tin - 0.12, 1e9, { dx: -28, dy: 0, sp: M.SNAP, fade: 0.12 });
      const am = el.querySelector('.am');
      if (str) typeIn(am, t, tin, str);
      else if (t < tAns + 0.05) { M.setT(am, '₹ ?'); am._k = null; }
      else typeIn(am, t, tAns + 0.05, '₹60,000');
    });
    M.draw($('#qdL'), t, tAns + 0.5, 0.45); M.draw($('#qdR'), t, tAns + 0.58, 0.45);
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQc + 0.1 + i * 0.08, 1e9, { dx: 28, dy: 0, sp: M.SOFT });
      const right = i === 1, r = M.io((t - tAns) / 0.3);
      el.style.background = right ? mix(C.card, C.green, r) : mix(C.card, C.paper, r);
      el.style.borderColor = right ? mix(C.rule2, C.green, r) : mix(C.rule2, C.rule, r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#FFFFFF', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, '#FFFFFF', r) : C.paper; lt.style.color = right ? mix(C.ink, C.green, r) : mix(C.ink, C.dim, r);
      lt.style.borderColor = right ? mix(C.rule2, '#FFFFFF', r) : C.rule2;
      const ok = el.querySelector('.ok'); if (right) { M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 }); ok.style.background = '#FFFFFF'; ok.innerHTML.includes('#fff') && (ok.innerHTML = M.icon('check', 28, C.green, 3)); } else M.hide(ok, true);
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 24, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.04, rot: 0 });
  }
  caps(t);
});

/* ---------- sound: paper, key, tick, stamp, correct ---------- */
M.sfx(0.2, 'paper', 0.45); M.sfx(tMorph, 'paper', 0.35);
M.sfx(tMorph + 0.35, 'tick', 0.35); M.sfx(tEqH, 'tick', 0.3, 0.4);
const keys = (t0, str, pan) => { for (let k = 0; k < str.length; k++) M.sfx(t0 + k * CPS, 'key:' + (k % 4), 0.16, pan); };
ROWS.forEach((r, i) => keys(r.t, inr(r.v), i >= 3 && i !== 5 ? 0.3 : -0.3));
M.sfx(tAT - 0.2, 'tick', 0.3); M.sfx(tBal, 'tick', 0.35); M.sfx(tBal + 0.25, 'stamp', 0.55, 0.4);
M.sfx(tTurn, 'paper', 0.6);
keys(tQa, '₹1,00,000', -0.3); keys(tQl, '₹40,000', 0.3);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.05, 'correct', 0.6); keys(tAns + 0.05, '₹60,000', 0.3); M.sfx(tTake, 'paper', 0.3);
M.outro({ bg: '#1D2B3A', ink: '#FBF8F1', accent: '#7FB89A', sub: 'rgba(251,248,241,.65)', font: 'Poppins' });
})();
