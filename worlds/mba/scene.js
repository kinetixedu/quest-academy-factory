// MBA world sample - The 4 P's of Marketing
(() => {
const { $, $$ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', card: '#FFFFFF', line: '#E2DACB' };
const L = M.L, wt = M.wt;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02, tFour = wt('H2', 'four');
const TA = ['P1', 'P2', 'P3', 'P4'].map(id => M.t0(id) - 0.05);   // each P lights on its line
const tAllDone = M.t1('P4') + 0.25;
const tSweep = M.t0('Q1') - 0.42, tCover = tSweep + 0.42, tQ = tCover + 0.12;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Get');

/* ---------- build the P cards and quiz options ---------- */
const P = [
  { n: '01', t: 'Product', d: 'What you sell', v: 'Choco Crunch', ic: 'package' },
  { n: '02', t: 'Price', d: 'What it costs', v: '₹20 a bar', ic: 'tag' },
  { n: '03', t: 'Place', d: 'Where people buy it', v: 'The corner shop', ic: 'store' },
  { n: '04', t: 'Promotion', d: 'How people hear about it', v: 'Posters and reels', ic: 'megaphone' },
];
const grid = $('#grid');
P.forEach((p, i) => {
  const x = 840 + (i % 2) * 492, y = 270 + Math.floor(i / 2) * 306;
  grid.insertAdjacentHTML('beforeend', `<div class="pc" id="c${i}" style="left:${x}px;top:${y}px"><div class="bg"></div><div class="num">${p.n}</div><div class="ic"><span class="ico"></span></div><div class="tt serif">${p.t}</div><div class="ds">${p.d}</div><div class="vl">${p.v}</div></div>`);
});
const opts = ['Product', 'Price', 'Place', 'Promotion'];
opts.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`));
$('#takeI').innerHTML = M.icon('chart', 44, '#E9D9B5', 2.4);
// awning: 8 scallops
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;

/* ---------- helpers ---------- */
const lerpC = (a, b, u) => M.mix(a, b, u);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
function measure() {
  const ti = $('#title'); const w = ti.offsetWidth;
  geo = { tw: w, sx: 960 - w / 2, sy: 456, ex: 160, ey: 160, es: 0.46 };
  const ey = $('#eyebrow'); geo.cw = ey.offsetWidth;
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title card -> header morph (one element travels, never cut) ---
  const m = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, m), y = M.lerp(geo.sy, geo.ey, m), s = M.lerp(1, geo.es, m);
  ti.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tCover - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  const ex = M.lerp(960 - geo.cw / 2, 160, m), eyy = M.lerp(372, 96, m);
  ey.style.left = ex.toFixed(2) + 'px'; ey.style.top = eyy.toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  // --- hero card ---
  const hi = M.vis($('#hero'), t, tMorph + 0.18, tCover - 0.05, { dx: -60, dy: 0, sp: M.SOFT, outDur: 0.01, ody: 0 });
  const tb = TA[0] + 0.05;
  const pb = M.spring(t - tb, M.POP);
  const bar = $('#bar');
  bar.setAttribute('transform', `translate(308 ${(210 + (1 - pb) * 30).toFixed(2)}) scale(${(0.55 + 0.45 * pb).toFixed(4)})`);
  M.hide(bar, t < tb);
  M.vis($('#ph'), t, tMorph + 0.35, tb - 0.05, { dy: 0, sc: 0.9, outDur: 0.18, osc: 0.85, ody: 0 });
  M.rise($('#hname'), t, tb + 0.12, { st: 0.06 });
  M.vis($('#htag'), t, tb + 0.3, 1e9, { dy: 10 });
  // price tag swings in like a pendulum
  const tg = TA[1] + 0.12, pt = M.spring(t - tg, [11, 0.42]);
  $('#tagR').setAttribute('transform', `rotate(${((1 - pt) * -38).toFixed(3)})`);
  M.hide($('#tag'), t < tg); $('#tag').style.opacity = M.clamp((t - tg) / 0.12);
  // place: awning drops, shelf draws
  const tp = TA[2] + 0.12, pa = M.spring(t - tp, [12, 0.62]);
  $('#awn').style.transform = `translateY(${((1 - pa) * -130).toFixed(2)}px)`; M.hide($('#awn'), t < tp);
  M.draw($('#shelf'), t, tp + 0.1, 0.5, M.o3);
  M.vis($('#shopSign'), t, tp + 0.35, 1e9, { dy: 10 });
  // promotion: sound waves draw on and breathe
  const tw = TA[3] + 0.12;
  ['#w1', '#w3', '#w2', '#w4'].forEach((id, k) => M.draw($(id), t, tw + (k % 2) * 0.12 + Math.floor(k / 2) * 0.18, 0.35, M.o3));
  const breathe = t > tw + 0.8 ? 1 + 0.05 * Math.sin((t - tw - 0.8) * 5.2) * Math.exp(-(t - tw - 0.8) * 0.6) : 1;
  $('#waves').setAttribute('transform', `translate(308 210) scale(${breathe.toFixed(4)}) translate(-308 -210)`);

  // --- P cards ---
  P.forEach((p, i) => {
    const el = $('#c' + i), tin = tFour + 0.1 + i * 0.09;
    M.vis(el, t, tin, tCover - 0.05, { dy: 36, sp: M.SOFT, outDur: 0.01, ody: 0 });
    const ta = TA[i], td = i < 3 ? TA[i + 1] : tAllDone;
    const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4);
    const act = on * (1 - off);
    const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
    if (Math.abs(lift) < 0.001) { if (el.style.transform !== 'none' && t > tin + 1.5) el.style.transform = 'none'; }
    else el.style.transform = `scale(${(1 + 0.035 * lift).toFixed(4)})`;
    el.style.zIndex = act > 0.01 ? 5 : 1;
    const bg = el.querySelector('.bg');
    bg.style.background = lerpC(C.card, C.ink, act); bg.style.borderColor = lerpC(C.line, C.ink, act);
    el.querySelector('.tt').style.color = lerpC(lerpC(C.dim, '#FFFFFF', on), C.ink, off);
    const ds = el.querySelector('.ds'); M.rise(ds, t, ta + 0.08, { st: 0.035 }); ds.style.color = lerpC('#D9DEEA', C.ink2, off);
    const vl = el.querySelector('.vl'); M.vis(vl, t, ta + 0.42, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    vl.style.background = lerpC(C.gold, C.paper, off); vl.style.color = lerpC('#FFFFFF', C.ink, off);
    const ic = el.querySelector('.ic'); ic.style.background = lerpC(C.paper, '#24345A', act);
    const ico = el.querySelector('.ico'); const col = t < ta ? C.dim : (t < td ? C.gold2 : C.gold);
    if (ico._c !== col) { ico._c = col; ico.innerHTML = M.icon(p.ic, 32, col, 2.2); }
  });

  // --- sweep transition (navy page turns right to left) ---
  const sw = $('#sweep');
  const a1 = M.io((t - tSweep) / 0.42), a2 = M.io((t - tCover - 0.06) / 0.46);
  const sx = 1940 * (1 - a1) - 1960 * a2;
  M.hide(sw, a1 <= 0 || a2 >= 1); sw.style.transform = `translateX(${sx.toFixed(1)}px)`;

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.12, { st: 0.06, sp: M.HEAVY });
    opts.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.45 + i * 0.08, 1e9, { dy: 40 });
      const right = i === 3, r = M.io((t - tAns) / 0.3);
      const bg = el.querySelector('.bg');
      bg.style.background = right ? lerpC(C.card, C.ink, r) : lerpC(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? lerpC(C.line, C.ink, r) : lerpC(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? lerpC(C.ink, '#FFFFFF', r) : lerpC(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? lerpC(C.paper, C.gold, r) : C.paper; lt.style.color = right ? lerpC(C.ink, '#FFFFFF', r) : lerpC(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    // countdown ring: 3 2 1 during the pause
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    const rv = M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.045 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(0.12, 'whoosh', 0.55); M.sfx(0.95, 'tick', 0.5);
M.sfx(tMorph, 'swish', 0.6);
P.forEach((p, i) => M.sfx(tFour + 0.1 + i * 0.09, 'pop', 0.25, -0.2 + i * 0.13));
TA.forEach((ta, i) => { M.sfx(ta, 'paper', 0.5); M.sfx(ta + 0.42, 'blip', 0.3); });
M.sfx(TA[0] + 0.05, 'pop', 0.45); M.sfx(TA[1] + 0.12, 'tick', 0.45); M.sfx(TA[2] + 0.12, 'thud', 0.35); M.sfx(TA[3] + 0.12, 'swish', 0.4);
M.sfx(tCover, 'whoosh', 0.6);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.55));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'swish', 0.35);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
