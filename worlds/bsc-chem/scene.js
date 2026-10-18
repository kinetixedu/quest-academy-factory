// BSc Chemistry world sample - The pH scale (Bench lab)
(() => {
const { $, $$ } = M;
const C = { ink: '#10252B', ink2: '#3C5459', muted: '#7D9196', dim: '#B5C3C7', glass: '#9FB3B8', teal: '#0FA3A3', teal2: '#D5EFEF', lab: '#F7FAFB', line: '#E1EAEC', pill: '#EDF2F3', off: '#E3EAEC', card: '#FFFFFF' };
const wt = M.wt;
// standard universal-indicator colours, flat
const PH = ['#E4202A', '#EE3D2B', '#F36B24', '#F7A12A', '#F9CF2E', '#D3DC2F', '#99C93C', '#4DB848', '#28A06C', '#1D9B98', '#2A7FB8', '#3558A8', '#46399A', '#5A2E8E', '#4A1F6E'];

/* ---------- beats (voice-driven) ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02;
const tGlass = wt('H2', 'it'), tLemonFill = wt('H2', 'acid'), tScale = wt('H2', 'pH') - 0.08;
const tNums = wt('C1', 'scale'), tZero = wt('C1', 'zero'), tFourteen = wt('C1', 'fourteen');
const tAcid = M.t0('C2'), tLemon = wt('C2', 'lemon');
const tNeutral = M.t0('C3'), tWaterFill = M.t0('C3') + 0.05, tToSeven = wt('C3', 'neutral');
const tBasic = wt('C3', 'Above'), tSoapFill = wt('C3', 'Above') + 0.1, tToTen = wt('C3', 'basic'), tSoap = wt('C3', 'soap');
const tAll = tSoap;
const tSweep = M.t1('C3') + 0.12, tCover = tSweep + 0.5, tQ = tCover + 0.22;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'It');

/* ---------- geometry ---------- */
const CX = [416, 960, 1504], BT = 262, BB = 455, HW = 120;            // beaker centres / top / bottom / half width
const SEG_W = 102, SEG_G = 5, SX = i => 160 + i * (SEG_W + SEG_G), SY = 680, SH = 64;
const BK = [
  { name: 'Lemon juice', liq: '#F5D547', top: '#E2BE2C', ph: 2, tf: tLemonFill, tr: tLemon, lvl: 330 },
  { name: 'Pure water', liq: '#C3E5EF', top: '#9CCFDF', ph: 7, tf: tWaterFill, tr: tToSeven + 0.42, lvl: 322 },
  { name: 'Soap', liq: '#D3C4F2', top: '#B5A2E4', ph: 10, tf: tSoapFill, tr: tToTen + 0.42, lvl: 338 },
];

/* ---------- build ---------- */
const NS = 'http://www.w3.org/2000/svg';
const beakerPath = (cx, bt, bb, hw) => `M${cx - hw - 12} ${bt} L${cx - hw} ${bt + 12} L${cx - hw} ${bb - 16} Q${cx - hw} ${bb} ${cx - hw + 16} ${bb} L${cx + hw - 16} ${bb} Q${cx + hw} ${bb} ${cx + hw} ${bb - 16} L${cx + hw} ${bt + 12} L${cx + hw + 10} ${bt}`;
const ticks = (cx, bt, hw) => [0, 1, 2, 3].map(k => `M${cx - hw + 2} ${bt + 52 + k * 36} h${k % 2 ? 14 : 26}`).join(' ');
let bks = '';
BK.forEach((b, i) => {
  const cx = CX[i];
  bks += `<g id="bk${i}"><path id="lq${i}" fill="${b.liq}"/><path id="ls${i}" fill="none" stroke="${b.top}" stroke-width="4" stroke-linecap="round"/>
    <path id="tk${i}" d="${ticks(cx, BT, HW)}" stroke="${C.glass}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path id="gl${i}" d="${beakerPath(cx, BT, BB, HW)}" fill="none" stroke="${C.glass}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
});
$('#bks').innerHTML = bks;
BK.forEach((b, i) => $('#labels').insertAdjacentHTML('beforeend',
  `<div id="bl${i}" style="position:absolute;left:${M.col(i * 4)}px;top:490px;width:${M.span(4)}px;display:flex;flex-direction:column;align-items:center;gap:10px">
     <div class="bn" style="font:700 32px Manrope;line-height:44px;white-space:nowrap;letter-spacing:-.01em">${b.name}</div>
     <div class="bread" style="position:relative;top:0"><b></b><span>pH ?</span></div></div>`));
// pH scale: 15 flat segments + numbers + zone brackets
let sc = '';
PH.forEach((c, i) => { sc += `<rect id="sg${i}" x="${SX(i)}" y="${SY}" width="${SEG_W}" height="${SH}" rx="${i === 0 || i === 14 ? 16 : 6}" fill="${c}"/>`; });
const Z = [{ a: 0, b: 6, n: 'ACIDIC', t: tAcid + 0.1 }, { a: 7, b: 7, n: 'NEUTRAL', t: tNeutral + 0.1 }, { a: 8, b: 14, n: 'BASIC', t: tBasic + 0.1 }];
Z.forEach((z, k) => {
  const x0 = SX(z.a) + 4, x1 = SX(z.b) + SEG_W - 4, y = 802;
  sc += `<path id="zb${k}" d="M${x0} ${y - 10} V${y} H${x1} V${y - 10}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
});
$('#scale').innerHTML = sc;
PH.forEach((c, i) => $('#nums').insertAdjacentHTML('beforeend', `<div class="sn" id="sn${i}" style="left:${SX(i)}px">${i}</div>`));
Z.forEach((z, k) => { const x0 = SX(z.a), x1 = SX(z.b) + SEG_W; $('#nums').insertAdjacentHTML('beforeend', `<div class="zl" id="zl${k}" style="left:${(x0 + x1) / 2 - 150}px;width:300px;top:816px">${z.n}</div>`); });
// title ornament: mini 15-segment strip
$('#orn').innerHTML = PH.map((c, i) => `<rect id="or${i}" x="${i * 16}" y="0" width="12" height="16" rx="3" fill="${c}"/>`).join('');
// take strip mini scale
$('#tscale').innerHTML = PH.map((c, i) => `<rect x="${i * 17}" y="8" width="13" height="24" rx="3" fill="${c}"/>`).join('') + `<path id="tsm" d="M${12 * 17 + 6.5} 0 l-6 -8 h12 z" fill="#fff"/>`;
// quiz sample beaker
const SC = 256, SBT = 104, SBB = 300, SHW = 84, sampLiq = M.mix(PH[12], '#FFFFFF', 0.45);
$('#sampS').innerHTML = `<path id="sq" fill="${sampLiq}"/><path id="sqs" fill="none" stroke="${M.mix(PH[12], '#FFFFFF', 0.2)}" stroke-width="4" stroke-linecap="round"/>
  <path d="${ticks(SC, SBT, SHW)}" stroke="${C.glass}" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="${beakerPath(SC, SBT, SBB, SHW)}" fill="none" stroke="${C.glass}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
const OPTS = [{ t: 'Acid', d: 'like lemon juice' }, { t: 'Base', d: 'like soap' }];
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend',
  `<div class="opt" id="o${i}" style="top:${288 + i * 216}px;height:184px"><div class="bg"></div>
     <div class="lt" style="top:44px">${'AB'[i]}</div>
     <div class="ot h" style="top:38px">${o.t}</div>
     <div class="od" style="position:absolute;left:116px;top:106px;font:500 28px Manrope;color:${C.muted};white-space:nowrap">${o.d}</div>
     <div class="ok" style="top:44px">${M.icon('check', 30, C.teal, 3)}</div></div>`));

/* ---------- liquid surface (flat fill, small decaying wave after a pour) ---------- */
function liquid(fillEl, lineEl, cx, hw, bb, level, amp, ph) {
  const x0 = cx - hw + 2, x1 = cx + hw - 2, n = 16; let top = '';
  for (let k = 0; k <= n; k++) {
    const x = x0 + (x1 - x0) * k / n, y = level + amp * Math.sin(ph + k * 0.75) * Math.sin(Math.PI * k / n);
    top += (k ? ' L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2);
  }
  const b = bb - 2;
  fillEl.setAttribute('d', `${top} L${x1} ${b - 14} Q${x1} ${b} ${x1 - 14} ${b} L${x0 + 14} ${b} Q${x0} ${b} ${x0} ${b - 14} Z`);
  lineEl.setAttribute('d', top);
}
function pour(i, t, tf, fillEl, lineEl, cx, hw, bb, full) {
  const p = M.spring(t - tf, M.HEAVY), on = t >= tf;
  M.hide(fillEl, !on); M.hide(lineEl, !on);
  if (!on) return;
  const level = bb - 2 - (bb - 2 - full) * p;
  const dt = t - tf, amp = 7 * Math.exp(-dt * 2.2) * M.clamp(dt / 0.15);
  liquid(fillEl, lineEl, cx, hw, bb, p >= 1 ? full : level, amp < 0.08 ? 0 : amp, dt * 7);
}

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
// marker position (in pH units)
const mkPos = M.track(0, [[tFourteen, 14, M.HEAVY], [wt('C2', 'acidic'), 2, M.HEAVY], [tToSeven, 7, M.HEAVY], [tToTen, 10, M.HEAVY]]);
// scale highlight sets
const SETS = [[tAcid, i => i <= 6], [tNeutral, i => i === 7], [tBasic, i => i >= 8], [tAll + 0.15, () => true]];
let geo = null;
function measure() { const w = $('#title').offsetWidth; geo = { sx: 960 - w / 2, sy: 432, ex: 160, ey: 150, es: 0.46, cw: $('#eyebrow').offsetWidth }; }
const wave = (el, level, amp, ph, k) => {
  let d = `M0 1080 L0 ${level.toFixed(1)}`;
  for (let x = 0; x <= 1920; x += 60) d += ` L${x} ${(level + amp * Math.sin(ph + x * k)).toFixed(1)}`;
  el.setAttribute('d', d + ' L1920 1080 Z');
};

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const scene = t < tCover;

  // --- title -> header (shared element) ---
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, m), y = M.lerp(geo.sy, geo.ey, m), s = M.lerp(1, geo.es, m);
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, out: tCover - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(352, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 18, outDur: 0.01 });
  PH.forEach((c, i) => {
    const r = $('#or' + i), p = M.spring(t - 0.9 - i * 0.035, M.SNAP);
    r.setAttribute('transform', p >= 1 ? '' : `translate(0 ${((1 - p) * 16).toFixed(2)})`); M.hide(r, t < 0.9 + i * 0.035);
  });
  M.vis($('#orn'), t, null, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.2, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  // --- bench + beakers ---
  M.hide($('#bks'), !scene); M.hide($('#labels'), !scene); M.hide($('#scale'), !scene); M.hide($('#nums'), !scene);
  const bp = M.spring(t - tMorph - 0.1, M.SOFT);
  const bench = $('#bench'); M.hide(bench, t < tMorph + 0.1 || !scene);
  bench.style.transform = bp >= 1 ? 'none' : `scaleX(${bp.toFixed(4)})`;
  BK.forEach((b, i) => {
    const t0 = tGlass + i * 0.12;
    M.draw($('#gl' + i), t, t0, 0.6, M.o3);
    M.draw($('#tk' + i), t, t0 + 0.35, 0.3, M.o3);
    pour(i, t, b.tf, $('#lq' + i), $('#ls' + i), CX[i], HW, BB, b.lvl);
    const lab = $('#bl' + i);
    M.vis(lab, t, t0 + 0.2, tCover - 0.05, { dy: 16, outDur: 0.01, ody: 0 });
    const active = (i === 0 && t >= tLemonFill && t < tNeutral && (t < tAcid ? t < tScale : true)) || (i === 1 && t >= tNeutral && t < tBasic) || (i === 2 && t >= tBasic && t < tAll + 0.15);
    const nm = lab.querySelector('.bn'); const nc = active ? C.ink : (t >= b.tf ? C.ink2 : C.muted);
    if (nm._c !== nc) { nm._c = nc; nm.style.color = nc; }
    const rd = lab.querySelector('.bread'), rr = M.io((t - b.tr) / 0.25);
    M.setT(rd.querySelector('span'), t >= b.tr ? 'pH ' + b.ph : 'pH ?');
    rd.querySelector('b').style.background = M.mix('#C9D5D8', PH[b.ph], rr);
    rd.style.color = M.mix(C.muted, C.ink, rr);
    rd.style.background = M.mix(C.pill, '#FFFFFF', rr); rd.style.boxShadow = rr > 0 ? `inset 0 0 0 2px ${M.mix(C.pill, PH[b.ph], rr)}` : '';
    const pu = t > b.tr && t < b.tr + 0.4 ? Math.sin(Math.PI * (t - b.tr) / 0.4) : 0;
    rd.style.transform = pu ? `scale(${(1 + 0.08 * pu).toFixed(4)})` : 'none';
  });

  // --- pH scale ---
  PH.forEach((c, i) => {
    const r = $('#sg' + i), t0 = tScale + i * 0.045, p = M.spring(t - t0, M.SNAP);
    M.hide(r, t < t0);
    r.setAttribute('transform', p >= 1 ? '' : `translate(0 ${((1 - p) * 24).toFixed(2)})`);
    let col = c; for (const [a, f] of SETS) col = M.mix(col, f(i) ? c : C.off, M.io((t - a) / 0.3));
    r.setAttribute('fill', col);
    const n = $('#sn' + i); M.vis(n, t, tNums + i * 0.03, 1e9, { dy: 10, fade: 0.12 });
    const lit = Math.round(mkPos(t)) === i && t >= tZero;
    const ncol = lit ? C.ink : C.muted; if (n._c !== ncol) { n._c = ncol; n.style.color = ncol; }
  });
  Z.forEach((z, k) => {
    M.draw($('#zb' + k), t, z.t, 0.45, M.o3);
    M.vis($('#zl' + k), t, z.t + 0.15, 1e9, { dy: 10 });
    const act = t < (Z[k + 1] ? Z[k + 1].t : tAll + 0.15);
    const zc = act ? C.ink : C.muted; const zl = $('#zl' + k); if (zl._c !== zc) { zl._c = zc; zl.style.color = zc; $('#zb' + k).setAttribute('stroke', act ? C.ink : C.dim); }
  });
  // marker
  const mk = $('#mk'), pos = mkPos(t), mv = M.vis(mk, t, tZero, tCover - 0.05, { dy: -14, outDur: 0.01, ody: 0 });
  if (mv > 0 || t >= tZero) {
    const mx = SX(0) + (SEG_W + SEG_G) * pos + SEG_W / 2 - 36;
    mk.style.left = (Math.abs(pos - Math.round(pos)) < 0.002 ? Math.round(mx) : mx.toFixed(2)) + 'px';
    M.setT($('#mkB'), String(Math.round(pos)));
  }
  if (!scene) M.hide(mk, true);

  // --- liquid wipe ---
  const a1 = M.io((t - tSweep) / 0.5), a2 = M.io((t - tCover - 0.08) / 0.6);
  const lev = M.lerp(1140, -70, a1) + M.lerp(0, 1210, a2);
  const wp = (t - tSweep) * 5;
  M.hide($('#wipe'), a1 <= 0 || a2 >= 1);
  if (a1 > 0 && a2 < 1) { wave($('#wv1'), lev, 18, wp, 0.0042); wave($('#wv2'), lev - 34, 16, wp * 0.8 + 1.7, 0.0036); }

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.08, { st: 0.05, sp: M.HEAVY });
    M.vis($('#samp'), t, tQ + 0.3, 1e9, { dy: 36 });
    pour(9, t, tQ + 0.55, $('#sq'), $('#sqs'), SC, SHW, SBB, 170);
    const r = M.io((t - tAns) / 0.3);
    M.vis($('#sampR'), t, tAns + 0.15, 1e9, { dy: 10 }); $('#sampR').style.color = PH[12];
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.45 + i * 0.1, 1e9, { dx: 40, dy: 0 });
      const right = i === 1, bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.card, C.teal, r) : M.mix(C.card, '#EEF3F4', r);
      bg.style.borderColor = right ? M.mix(C.line, C.teal, r) : M.mix(C.line, '#E6EDEF', r);
      el.querySelector('.ot').style.color = right ? M.mix(C.ink, '#FFFFFF', r) : M.mix(C.ink, C.dim, r);
      el.querySelector('.od').style.color = right ? M.mix(C.muted, '#D9F3F3', r) : M.mix(C.muted, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.pill, '#FFFFFF', r) : C.pill; lt.style.color = right ? M.mix(C.ink, C.teal, r) : M.mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.03 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    const u = M.clamp((t - tCount) / (tAns - tCount));
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.04 });
  }
  caps(t);
});

/* ---------- sound: drip, bubble, tick, chime, correct ---------- */
M.sfx(0.12, 'tick', 0.4); M.sfx(0.3, 'bubble:2', 0.35); M.sfx(0.9, 'tick', 0.3);
M.sfx(tMorph, 'bubble:5', 0.35);
[0, 1, 2].forEach(i => M.sfx(tGlass + i * 0.12, 'tick', 0.25, -0.4 + i * 0.4));
BK.forEach((b, i) => { M.sfx(b.tf, 'drip', 0.45, -0.4 + i * 0.4); M.sfx(b.tf + 0.18, 'bubble:' + (i + 1), 0.3, -0.4 + i * 0.4); M.sfx(b.tr, 'chime', 0.28, -0.4 + i * 0.4); });
[0, 5, 10].forEach(k => M.sfx(tScale + k * 0.045, 'tick', 0.3, -0.5 + k * 0.07));
M.sfx(tZero, 'tick', 0.4); [tFourteen, tLemon, tToSeven, tToTen].forEach(a => M.sfx(a, 'tick', 0.35));
[tAcid, tNeutral, tBasic].forEach(a => M.sfx(a + 0.1, 'bubble:4', 0.25));
[0, 1, 2, 3].forEach(k => M.sfx(tSweep + 0.08 + k * 0.1, 'bubble:' + (k + 6), 0.4, -0.3 + k * 0.2));
M.sfx(tCover + 0.1, 'drip', 0.4);
M.sfx(tQ + 0.55, 'drip', 0.35);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.55));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'bubble:3', 0.3);
M.outro({ bg: '#10252B', ink: '#F7FAFB', accent: '#0FA3A3', sub: 'rgba(247,250,251,.62)', font: 'Manrope' });
})();
