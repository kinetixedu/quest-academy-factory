// BBA world sample - Needs vs Wants (Campus startup)
(() => {
const { $ } = M;
const C = { plum: '#2A1B3D', plum2: '#5B4A70', muted: '#8E7F96', dim: '#C9BCC9', cream: '#FFF7EE', cream2: '#F7EDE1', line: '#EADCCB', coral: '#FF6B4A', coralT: '#FFE1D6', mint: '#7FD8C4', card: '#FFFFFF', slot: '#F4E9DC' };
const wt = M.wt, mix = M.mix;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

/* ---------- custom 24-unit icons (one stroke width: 2.2) ---------- */
const IC = {
  apple: ['M12 7c-1.5-1.2-3.8-1.6-5.6-.4C4 8.1 3.6 11.5 4.8 14.8 6 18.3 8.4 21.5 10.6 21.5c.6 0 1-.3 1.4-.3s.8.3 1.4.3c2.2 0 4.6-3.2 5.8-6.7 1.2-3.3.8-6.7-1.6-8.2-1.8-1.2-4.1-.8-5.6.4z', 'M12 7c0-2 1-3.5 3-4'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  phone: ['M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z', 'M12 18h.01'],
  game: ['M6 11h4', 'M8 9v4', 'M15 12h.01', 'M18 10h.01', 'M17.32 5H6.68a4 4 0 0 0-3.978 3.59C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z'],
  bag: ['M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M8 10h8', 'M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6', 'M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'],
};
const SW = 2.2;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.3, tSub = wt('H1', 'things'), tMorph = M.t0('H2') + 0.02;
const tInbox = tMorph + 0.18, tBinN = wt('H2', 'needs'), tBinW = wt('H2', 'wants');
const tN1 = M.t0('N1'), tMust = wt('N1', 'must'), tFood = wt('N1', 'food'), tWater = wt('N1', 'water');
const tN2 = M.t0('N2'), tNice = wt('N2', 'nice'), tExtras = wt('N2', 'extras'), tPhone = wt('N2', 'phone');
const tN3 = M.t0('N3'), tBoth = wt('N3', 'Businesses'), tNeeds3 = wt('N3', 'needs'), tFirst = wt('N3', 'first');
const tIris = M.t0('Q1') - 0.5, tCover = tIris + 0.42, tQ = tCover + 0.06;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'You');

/* ---------- geometry (12-col grid: cards span 4 cols = 512, 32 gutters) ---------- */
const CX = [160, 704, 1248], CY = 270, SL = [[32, 116], [272, 116], [32, 348], [272, 348]];
const slot = (c, s) => [CX[c] + SL[s][0], CY + SL[s][1]];
const N = [
  { t: 'Food', ic: 'apple', from: slot(0, 0), to: slot(1, 0), tm: tFood, tilt: -2 },
  { t: 'Water', ic: 'drop', from: slot(0, 1), to: slot(1, 1), tm: tWater, tilt: 1.5 },
  { t: 'Video game', ic: 'game', from: slot(0, 2), to: slot(2, 0), tm: tExtras, tilt: 2 },
  { t: 'Phone cover', ic: 'phone', from: slot(0, 3), to: slot(2, 1), tm: tPhone, tilt: -1.5 },
];
N.forEach((n, i) => {
  $('#notes').insertAdjacentHTML('beforeend', `<div class="note" id="n${i}"><div class="nb"></div><div class="fold"></div><div class="ni">${M.icon(IC[n.ic], 56, C.plum, SW)}</div><div class="nl">${n.t}</div></div>`);
});
$('#shopI').innerHTML = M.icon('store', 72, C.coral, SW);
$('#qnote .ni').innerHTML = M.icon(IC.bag, 64, C.plum, SW);
$('#qA .ok').innerHTML = M.icon('check', 30, C.plum, 3);
$('#takeI').innerHTML = M.icon('check', 30, C.plum, 3);

const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
function measure() {
  const w = $('#title').offsetWidth, cw = $('#eyebrow').offsetWidth, sw = $('#sub').offsetWidth;
  geo = { sx: 960 - w / 2, sy: 400, ex: 160, ey: 146, es: 0.44, cw, sw, bw: $('#first').offsetWidth };
}
// sticker: pops in with a tilt that settles to a small fixed tilt
const sticker = (el, t, tin, rest, o = {}) => {
  const p = M.spring(t - tin, M.POP);
  if (t < tin) { M.hide(el, true); return; }
  M.hide(el, false);
  const r = rest + (1 - p) * (o.rot ?? -9), s = (o.s0 ?? 0.6) + (1 - (o.s0 ?? 0.6)) * p;
  el.style.opacity = M.clamp((t - tin) / 0.08).toFixed(3);
  el.style.transform = p >= 1 ? `rotate(${rest}deg)` : `rotate(${f2(r)}deg) scale(${s.toFixed(4)})`;
};

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const out = tCover - 0.02;   // everything in scene B is under the iris by now

  // --- title card -> header (shared element travels) ---
  const m = M.spring(t - tMorph, M.SNAP);
  const ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, m), y = M.lerp(geo.sy, geo.ey, m), s = M.lerp(1, geo.es, m);
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${f2(x)}px,${f2(y)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.SNAP, out, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = f2(M.lerp(960 - geo.cw / 2, 160, m)) + 'px'; ey.style.top = f2(M.lerp(318, 96, m)) + 'px';
  M.vis(ey, t, 0.12, out, { dy: 18, sp: M.SNAP, outDur: 0.01 });
  // subtitle sticker slaps on under the title, then peels away before the morph
  const sb = $('#sub');
  sb.style.left = (960 - geo.sw / 2) + 'px'; sb.style.top = '600px';
  sticker(sb, t, tSub, -2, { rot: -10 });
  const sq = M.io((t - tMorph + 0.12) / 0.22);
  if (sq > 0) { if (sq >= 1) M.hide(sb, true); else { sb.style.opacity = (1 - sq).toFixed(3); sb.style.transform = `translateY(${f2(18 * sq)}px) rotate(-2deg) scale(${(1 - 0.2 * sq).toFixed(4)})`; } }

  // --- cards ---
  const cards = [['#inbox', tInbox], ['#binN', tBinN], ['#binW', tBinW]];
  cards.forEach(([id, tin], k) => {
    const el = $(id); M.vis(el, t, tin, out, { dy: 48, sc: 0.94, sp: M.POP, outDur: 0.01, ody: 0 });
    sticker($('#sk' + k), t, tin + 0.12, -2, { rot: -8 });
  });
  // active bin: border colour + small lift (needs on N1 and on "needs" in N3, wants on N2)
  const actN = M.io((t - tN1) / 0.25) * (1 - M.io((t - tN2) / 0.25)) + M.io((t - tNeeds3) / 0.25);
  const actW = M.io((t - tN2) / 0.25) * (1 - M.io((t - tN3) / 0.25));
  [['#binN', actN, C.plum, tN1, tN2, tNeeds3], ['#binW', actW, C.coral, tN2, tN3, 1e9]].forEach(([id, a, col, ta, td, ta2]) => {
    const el = $(id), bg = el.querySelector('.bg');
    bg.style.borderColor = mix(C.line, col, a);
    const bump = u => (u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0);
    const lift = bump((t - ta) / 0.32) + bump((t - ta2) / 0.32);
    if (t > tBinW + 1 && t < out) el.style.transform = Math.abs(lift) < 0.001 ? 'none' : `translateY(${f2(-10 * lift)}px)`;
  });
  // rule panels: solid placeholder until the line names the rule
  M.rise($('#pt1'), t, tMust, { st: 0.06, sp: M.SNAP, out: tFirst - 0.25, outDur: 0.22 });
  M.vis($('#pk1'), t, tMust - 0.05, 1e9, { dy: 10, sp: M.SNAP });
  M.rise($('#pq1'), t, tFirst + 0.05, { st: 0.06, sp: M.SNAP });
  M.rise($('#pt2'), t, tNice, { st: 0.06, sp: M.SNAP, out: tFirst - 0.25, outDur: 0.22 });
  M.vis($('#pk2'), t, tNice - 0.05, 1e9, { dy: 10, sp: M.SNAP });
  M.rise($('#pq2'), t, tFirst + 0.05, { st: 0.06, sp: M.SNAP });
  const pf = M.io((t - tFirst) / 0.3);
  $('#pn1').style.background = mix(C.cream2, C.plum, pf);
  $('#pq1').style.color = '#FFFFFF'; $('#pk1').style.color = mix(C.muted, '#CDBFDA', pf);
  $('#pq2').style.color = C.muted;

  // --- sticky notes: pop into the inbox, then fly to their bin on the spoken word ---
  N.forEach((n, i) => {
    const el = $('#n' + i), tin = tInbox + 0.22 + i * 0.07;
    if (t < tin || t > out) { M.hide(el, true); return; }
    M.hide(el, false);
    const pi = M.spring(t - tin, M.POP);
    const pm = M.spring(t - n.tm, M.SNAP), arc = Math.sin(Math.PI * M.clamp(pm)) ;
    const nx = M.lerp(n.from[0], n.to[0], pm), ny = M.lerp(n.from[1], n.to[1], pm) - 90 * arc;
    const rest0 = [-2, 1.5, 1, -1][i];
    const rot = M.lerp(rest0, n.tilt, pm) + 8 * arc * (n.to[0] > 1000 ? 1 : -1) + (1 - pi) * -10;
    const sc = (0.6 + 0.4 * pi) * (1 + 0.08 * arc);
    el.style.opacity = M.clamp((t - tin) / 0.08).toFixed(3);
    el.style.zIndex = pm > 0 && pm < 1 ? 10 : 8;
    const settled = pi >= 1 && (pm >= 1 || pm <= 0);
    el.style.transform = settled ? `translate(${Math.round(nx)}px,${Math.round(ny)}px) rotate(${pm >= 1 ? n.tilt : rest0}deg)`
      : `translate(${f2(nx)}px,${f2(ny)}px) rotate(${f2(rot)}deg) scale(${sc.toFixed(4)})`;
  });
  // counters update when a note lands
  const landed = N.map(n => t >= n.tm + 0.28);
  M.setT($('#cn0'), String(4 - landed.filter(Boolean).length)); M.vis($('#cn0'), t, null, tBoth, { dy: 0, osc: 0.6, ody: 0, outDur: 0.2 });
  M.setT($('#cn1'), String(landed.slice(0, 2).filter(Boolean).length));
  M.setT($('#cn2'), String(landed.slice(2).filter(Boolean).length));
  [0, 1, 2].forEach(k => {
    const lt = k === 0 ? Math.max(...N.map(n => (t >= n.tm + 0.28 ? n.tm + 0.28 : -9))) : Math.max(...N.filter((n, i) => (k === 1 ? i < 2 : i >= 2)).map(n => (t >= n.tm + 0.28 ? n.tm + 0.28 : -9)));
    if (k === 0) return;
    const b = t - lt < 0.5 ? Math.sin(Math.PI * M.clamp((t - lt) / 0.3)) : 0, el = $('#cn' + k);
    el.style.transform = b > 0.001 ? `scale(${(1 + 0.18 * b).toFixed(4)})` : 'none';
    el.style.background = k === 0 ? C.cream2 : mix(C.cream2, k === 1 ? C.plum : C.coral, M.clamp(b * 2));
    el.style.color = mix(C.plum, '#FFFFFF', M.clamp(b * 2));
  });
  // inbox becomes the shop: "businesses sell both"
  const sh = $('#shop'); M.vis(sh, t, tBoth, 1e9, { dy: 0, sc: 0.9, sp: M.POP, fade: 0.1 });
  M.vis($('#shopI'), t, tBoth + 0.12, 1e9, { dy: 14, sp: M.SNAP });
  M.rise($('#shopT1'), t, tBoth + 0.18, { st: 0.07, sp: M.SNAP }); M.rise($('#shopT2'), t, tBoth + 0.32, { st: 0.07, sp: M.SNAP });
  M.vis($('#shopS'), t, wt('N3', 'both') + 0.1, 1e9, { dy: 12, sp: M.SNAP });
  sticker($('#sk0'), t, tInbox + 0.12, -2, { rot: -8 });
  const swp = M.io((t - tBoth) / 0.25);
  $('#sk0').style.background = mix('#F1E4D6', C.coral, swp); $('#sk0').style.color = mix(C.plum, '#FFFFFF', swp);
  M.setT($('#sk0'), t < tBoth ? 'TO SORT' : 'THE SHOP');
  // "1st always" sticker slaps onto the needs bin
  const fb = $('#first');
  fb.style.left = (CX[1] + 512 - 64 - geo.bw) + 'px'; fb.style.top = (CY + 348 + 32) + 'px';
  if (t < out) sticker(fb, t, tFirst, 3, { rot: 14, s0: 1.6 }); else M.hide(fb, true);

  // --- iris: coral circle grows from the "1st always" sticker, then shrinks into the quiz note ---
  const ir = $('#iris');
  const g = M.io((t - tIris) / 0.42), sk = M.io((t - tCover - 0.04) / 0.5);
  const ox = CX[1] + 512 - 64 - geo.bw / 2, oy = CY + 348 + 58;
  const qx = 160 + 32 + 224, qy = 400 + 32 + 138;
  const cx = sk > 0 ? qx : ox, cy = sk > 0 ? qy : oy;
  const R = g < 1 ? 26 + 2300 * g : 2300 * (1 - sk);
  M.hide(ir, g <= 0 || sk >= 1);
  ir.style.transform = `translate(${f2(cx)}px,${f2(cy)}px) scale(${(R / 100).toFixed(4)})`;

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ + 0.1, 1e9, { dy: 16, sp: M.SNAP });
    M.rise($('#qq'), t, tQ + 0.16, { st: 0.05, sp: M.SNAP });
    sticker($('#qnote'), t, tCover + 0.42, -2, { rot: -10, s0: 0.3 });
    M.vis($('#qL'), t, tQ + 0.2, 1e9, { dy: 40, sp: M.POP });
    [['#qA', 0], ['#qB', 1]].forEach(([id, i]) => {
      const el = $(id); M.vis(el, t, tQ + 0.55 + i * 0.1, 1e9, { dy: 40, sp: M.POP });
      const right = i === 0, r = M.io((t - tAns) / 0.3);
      const bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.plum, r) : mix(C.card, C.cream2, r);
      bg.style.borderColor = right ? mix(C.line, C.plum, r) : mix(C.line, C.cream2, r);
      el.querySelector('.ot').style.color = right ? mix(C.plum, '#FFFFFF', r) : mix(C.plum, C.dim, r);
      el.querySelector('.ds').style.color = right ? mix(C.muted, '#CDBFDA', r) : mix(C.muted, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.cream2, C.coral, r) : C.cream2; lt.style.color = right ? mix(C.plum, '#FFFFFF', r) : mix(C.plum, C.dim, r);
      const ok = el.querySelector('.ok'); if (ok) sticker(ok, t, tAns + 0.12, 0, { rot: -20, s0: 0.3 });
      if (right && t > tAns && t < tAns + 0.4) el.style.transform = `scale(${(1 + 0.04 * Math.sin(Math.PI * (t - tAns) / 0.4)).toFixed(4)})`;
    });
    sticker($('#stamp'), t, tAns + 0.2, -4, { rot: 16, s0: 1.8 });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.6, sp: M.POP, outDur: 0.22, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.6, sp: M.POP, outDur: 0.22, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 30, sp: M.POP });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.045, sp: M.SNAP });
  }
  caps(t);
});

/* ---------- sound: pop, blip, swish, correct ---------- */
M.sfx(0.25, 'swish', 0.4); M.sfx(tSub, 'pop', 0.45);
M.sfx(tMorph, 'swish', 0.5);
[[tInbox, -0.4], [tBinN, 0], [tBinW, 0.4]].forEach(([tt, p]) => M.sfx(tt, 'pop', 0.35, p));
N.forEach((n, i) => { M.sfx(tInbox + 0.22 + i * 0.07, 'pop', 0.2, -0.4); M.sfx(n.tm, 'swish', 0.3, n.to[0] > 1000 ? 0.4 : 0); M.sfx(n.tm + 0.28, 'blip', 0.35, n.to[0] > 1000 ? 0.4 : 0); });
M.sfx(tMust, 'blip', 0.25); M.sfx(tNice, 'blip', 0.25, 0.4);
M.sfx(tBoth, 'pop', 0.4, -0.4); M.sfx(tFirst, 'pop', 0.55);
M.sfx(tIris, 'swish', 0.55); M.sfx(tCover + 0.04, 'swish', 0.4);
M.sfx(tCover + 0.42, 'pop', 0.35, -0.4);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'blip', 0.45));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tAns + 0.2, 'pop', 0.4, -0.4); M.sfx(tTake, 'swish', 0.3);
M.outro({ bg: '#2A1B3D', ink: '#FFF7EE', accent: '#FF6B4A', sub: 'rgba(255,247,238,.7)', font: 'Plus Jakarta Sans' });
})();
