// BSc CS world sample - Binary numbers (Bits and logic)
(() => {
const { $ } = M;
const C = { k: '#111111', w: '#FFFFFF', g: '#E8E8E8', g2: '#F4F4F4', mut: '#8C8C8C', dim: '#BDBDBD', y: '#FFD23F' };
const wt = M.wt;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02;
const tPanel = wt('H2', 'binary'), tZero = wt('H2', 'zero'), tOne = wt('H2', 'one');
const tFour = wt('D1', 'four'), tVal = ['eight', 'four', 'two', 'one'].map((w, i) => wt('D1', w, i === 1 ? 1 : 0));
const tSwitch = wt('D2', 'switch'), tOn8 = wt('D2', 'on'), tAdds = wt('D2', 'adds');
const t4 = wt('D3', 'Four'), t1 = wt('D3', 'one'), tDig = [wt('D3', 'zero'), wt('D3', 'one', 1), wt('D3', 'zero', 1), wt('D3', 'one', 2)], tFive = wt('D3', 'five');
const tSweep = M.t1('D3') + 0.08, tCover = tSweep + 0.56, tQ = tCover + 0.1;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tPlus = wt('A1', 'Four'), tTake = wt('A1', 'two');

/* ---------- build ---------- */
const VAL = [8, 4, 2, 1], SUP = ['3', '2', '1', '0'];
const TX = i => M.col(i * 2);                      // tiles on cols 0,2,4,6 (span 2 = 240)
VAL.forEach((v, i) => {
  $('#tiles').insertAdjacentHTML('beforeend', `<div class="tile" id="t${i}" style="left:${TX(i)}px"><div class="bg"></div><div class="st">OFF</div><div class="bit mono">0</div></div>`);
  $('#vals').insertAdjacentHTML('beforeend', `<div class="val" id="v${i}" style="left:${TX(i)}px"><div class="ln"></div><div class="n mono">${v}</div><div class="lb">2<sup>${SUP[i]}</sup></div></div>`);
});
let bh = ''; for (let k = 0; k < 15; k++) bh += `<b style="left:${k * 71}px;width:${k === 14 ? 62 : 62}px"></b>`;
$('#bar').innerHTML = bh;                           // 15 cells x 62 + 14 gaps x 9 = 1056 = span(8)
let bb = ''; for (let k = 0; k < 8; k++) bb += `<b style="left:${k * 240}px"></b>`;
$('#bars').innerHTML = bb;
const QB = [0, 1, 1, 0], QX = i => 160 + i * 204;  // span(6) = 4 x 172 + 3 x 32
QB.forEach((b, i) => {
  $('#qtiles').insertAdjacentHTML('beforeend', `<div class="qt" id="q${i}" style="left:${QX(i)}px;top:290px;width:172px;height:172px"><div class="bg"></div><div class="bit mono" style="width:172px;height:172px">${b}</div></div><div class="qv" id="qv${i}" style="left:${QX(i)}px;top:478px;width:172px"><div class="ln" style="width:172px"></div><div class="n mono">${VAL[i]}</div></div>`);
});
const OPTS = ['5', '6', '9', '10'], RIGHT = 1;
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 3)}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot mono">${o}</div><div class="ok">${M.icon('check', 28, C.y, 3)}</div></div>`));

/* ---------- state ---------- */
// tile on/off switch times
const SW = [[[tOn8, 1], [t4, 0]], [[t4 + 0.1, 1]], [], [[t1, 1]]];
const isOn = (i, t) => { let s = 0; for (const [a, v] of SW[i]) if (t >= a) s = v; return s; };
const flipT = (i, t) => { let f = -9; for (const [a] of SW[i]) if (t >= a - 0.06) f = a; return f; };
const total = M.keys([[0, 0], [tAdds, 8], [t4 + 0.1, 4], [t1 + 0.08, 5]], 0.42, M.o3);
const markX = M.track(TX(0), [[tVal[1], TX(1), M.SNAP], [tVal[2], TX(2), M.SNAP], [tVal[3], TX(3), M.SNAP], [tSwitch, TX(0), M.SNAP],
  [t4, TX(1), M.SNAP], [t1, TX(3), M.SNAP], [tDig[0], TX(0), M.SNAP], [tDig[1], TX(1), M.SNAP], [tDig[2], TX(2), M.SNAP], [tDig[3], TX(3), M.SNAP]], M.SNAP);
const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
const measure = () => { geo = { cw: $('#eyebrow').offsetWidth }; };
const px = v => Math.round(v * 100) / 100;

// crisp squash pulse used for every bit flip (scale, not 3D)
const squash = (el, t, a) => {
  const d = t - a;
  if (d < 0 || d > 0.4) { if (el.style.transform !== 'none') el.style.transform = 'none'; return; }
  const p = M.spring(d, M.SNAP) - M.spring(d - 0.07, M.SNAP);
  if (Math.abs(p) < 0.002) { if (el.style.transform !== 'none') el.style.transform = 'none'; return; }
  el.style.transform = `scale(${(1 + 0.05 * p).toFixed(4)},${(1 - 0.14 * p).toFixed(4)})`;
};

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title card -> header (title travels up-left, never cut) ---
  const m = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const y = M.lerp(420, 146, m), s = M.lerp(1, 64 / 168, m);
  ti.style.transform = m >= 1 ? 'translate(160px,146px) scale(0.381)' : `translate(160px,${px(y)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, rot: 0, out: tCover - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow'); ey.style.left = '160px'; ey.style.top = px(M.lerp(344, 96, m)) + 'px';
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 16, outDur: 0.01 });
  M.rise($('#sub'), t, 0.9, { st: 0.04, rot: 0, out: tMorph - 0.1, outDur: 0.3 });
  const tr = $('#trule'), tu = M.o5((t - 0.55) / 0.7), tq = M.io((t - tMorph + 0.05) / 0.35);
  M.hide(tr, tu <= 0 || tq >= 1); tr.style.transform = tq > 0 ? `translateX(${px(1600 * tq)}px) scaleX(${(1 - tq).toFixed(4)})` : (tu >= 1 ? 'none' : `scaleX(${tu.toFixed(4)})`);
  // index digits type in one by one on the title card
  const idx = $('#tidx'), nd = M.clamp(Math.floor((t - 1.1) / 0.12) + 1, 0, 4);
  M.setT(idx, '0 1 0 1'.split(' ').slice(0, nd).join(' ')); M.vis(idx, t, 1.1, tMorph - 0.1, { dy: 0, fade: 0.01, outDur: 0.25 });
  const hr = $('#hrule'), hu = M.o5((t - tMorph - 0.25) / 0.6);
  M.hide(hr, hu <= 0); hr.style.transform = hu >= 1 ? 'none' : `scaleX(${hu.toFixed(4)})`;

  // --- concept scene ---
  const sc = t < tCover; M.hide($('#scene'), !sc);
  if (sc) {
    VAL.forEach((v, i) => {
      const el = $('#t' + i);
      const p = M.vis(el, t, tMorph + 0.3 + i * 0.07, 1e9, { dy: 30, sp: M.SOFT });
      const on = isOn(i, t), fa = flipT(i, t);
      const inner = el.querySelector('.bit');
      // switch on: crisp squash, colour swaps at the squash peak (solid colours only)
      const vis = t >= fa + 0.03 ? on : (fa > 0 ? 1 - on : 0);
      const bg = el.querySelector('.bg');
      bg.style.background = vis ? C.y : C.w;
      M.setT(inner, vis ? '1' : '0');
      M.setT(el.querySelector('.st'), vis ? 'ON' : 'OFF');
      el.querySelector('.st').style.color = vis ? C.k : C.mut;
      if (p >= 1) {
        // attention pulse on "four switches", then real flips
        const a = fa > 0 && t >= fa - 0.06 ? fa : tFour + i * 0.07;
        squash(el, t, a);
      }
      // value under the tile
      const vl = $('#v' + i), ln = vl.querySelector('.ln');
      const lu = M.o5((t - tFour - i * 0.07) / 0.5); M.hide(vl, lu <= 0);
      ln.style.transform = lu >= 1 ? 'none' : `scaleX(${lu.toFixed(4)})`;
      M.vis(vl.querySelector('.n'), t, tVal[i], 1e9, { dy: 22, sp: M.SNAP, fade: 0.06 });
      M.vis(vl.querySelector('.lb'), t, tVal[i] + 0.1, 1e9, { dy: 10, sp: M.SNAP });
      const lit = isOn(i, t) && t > fa + 0.03;
      vl.querySelector('.n').style.color = lit ? C.k : (t < tOn8 ? C.k : C.dim);
    });
    // scan marker points at whatever the voice names
    const mk = $('#mark'); M.vis(mk, t, tVal[0] - 0.05, 1e9, { dy: 0, fade: 0.08 });
    mk.style.left = px(markX(t)) + 'px';
    // sum bar: 15 unit cells, lit cells = running total
    const tot = total(t), n = Math.round(tot);
    M.vis($('#bar'), t, tFour + 0.25, 1e9, { dy: 16 });
    M.vis($('#sumL'), t, tFour + 0.3, 1e9, { dy: 10 }); M.vis($('#sumR'), t, tFour + 0.3, 1e9, { dy: 10 });
    [...$('#bar').children].forEach((b, k) => { const c = k < n ? C.y : C.g; if (b._c !== c) { b._c = c; b.style.background = c; } });
    M.setT($('#sumR'), n + ' OF 15'); $('#sumR').style.color = n ? C.k : C.mut;
    // right panel: legend (0 / 1), then the decimal result
    M.vis($('#panel'), t, tPanel - 0.05, 1e9, { dx: 40, dy: 0, sp: M.SOFT });
    M.vis($('#plab'), t, tPanel + 0.15, 1e9, { dy: 10 });
    M.setT($('#plab'), t < tAdds - 0.05 ? 'BINARY DIGITS' : 'DECIMAL VALUE');
    M.vis($('#lg0'), t, tZero, tAdds - 0.1, { dy: 24, sp: M.SNAP, outDur: 0.2 });
    M.vis($('#lg1'), t, tOne, tAdds - 0.1, { dy: 24, sp: M.SNAP, outDur: 0.2 });
    const nm = $('#num'); M.vis(nm, t, tAdds + 0.05, 1e9, { dy: 30, sp: M.SNAP, fade: 0.08 });
    M.setT(nm, String(n));
    if (t > t4 && t < t4 + 0.5 || t > t1 && t < t1 + 0.5 || t > tAdds && t < tAdds + 0.5) {
      const a = t > t1 ? t1 + 0.08 : t > t4 ? t4 + 0.1 : tAdds;
      const d = M.spring(t - a, M.SNAP) - M.spring(t - a - 0.06, M.SNAP);
      nm.style.transform = Math.abs(d) < 0.002 ? 'none' : `scale(${(1 + 0.04 * d).toFixed(4)},${(1 - 0.1 * d).toFixed(4)})`;
    }
    const nd2 = tDig.filter(a => t >= a).length;
    const ex = '0101'.slice(0, nd2) + (t >= tFive ? ' = 5' : '');
    M.setT($('#expr'), ex); M.hide($('#expr'), nd2 === 0);
  }

  // --- transition: 8 hard black bars close (staggered L->R) then open downward ---
  const bars = [...$('#bars').children]; let any = false;
  bars.forEach((b, k) => {
    const a = M.io((t - tSweep - k * 0.03) / 0.3), o = M.io((t - tCover - 0.04 - k * 0.03) / 0.32);
    const yy = -1080 * (1 - a) + 1080 * o;
    const h = a <= 0 || o >= 1; M.hide(b, h); if (!h) any = true;
    b.style.transform = `translateY(${Math.round(yy)}px)`;
  });
  M.hide($('#bars'), !any);

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.08, { st: 0.05, sp: M.HEAVY, rot: 0 });
    QB.forEach((b, i) => {
      const el = $('#q' + i); const p = M.vis(el, t, tQ + 0.3 + i * 0.06, 1e9, { dy: 30, sp: M.SOFT });
      el.querySelector('.bg').style.background = b ? C.y : C.w;
      M.vis($('#qv' + i), t, tQ + 0.4 + i * 0.06, 1e9, { dy: 14 });
      const lit = t >= tPlus + (i === 2 ? 0.38 : 0);
      $('#qv' + i).querySelector('.n').style.color = t < tPlus ? C.k : (b && lit ? C.k : C.dim);
      if (p >= 1 && b) squash(el, t, tPlus + (i === 2 ? 0.38 : 0));
    });
    const qe = $('#qeq'); M.vis(qe, t, tQ + 0.6, 1e9, { dx: -20, dy: 0 });
    M.setT(qe, t < tAns ? '= ?' : '= 6');
    if (t > tAns && t < tAns + 0.5) { const d = M.spring(t - tAns, M.SNAP) - M.spring(t - tAns - 0.06, M.SNAP); qe.style.transform = Math.abs(d) < 0.002 ? 'none' : `scale(${(1 + 0.04 * d).toFixed(4)},${(1 - 0.1 * d).toFixed(4)})`; }
    M.vis($('#qsum'), t, tPlus, 1e9, { dy: 12, sp: M.SNAP });
    M.setT($('#qsum'), t < tPlus + 0.38 ? '4 +' : '4 + 2');
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.55 + i * 0.07, 1e9, { dy: 36 });
      const r = M.io((t - tAns) / 0.25), right = i === RIGHT;
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.w, C.k, r) : M.mix(C.w, C.g2, r);
      bg.style.borderColor = right ? C.k : M.mix(C.k, C.g, r);
      el.querySelector('.ot').style.color = right ? M.mix(C.k, C.w, r) : M.mix(C.k, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.g, C.y, r) : C.g2; lt.style.color = right ? C.k : M.mix(C.k, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) { M.vis(ok, t, tAns + 0.08, 1e9, { dy: 0, sc: 0.4, sp: M.SNAP, fade: 0.06 }); ok.style.background = '#2A2A2A'; } else M.hide(ok, true);
    });
    // countdown: square fills with yellow from the bottom, 3 2 1
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#cd'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.85, sp: M.SNAP, outDur: 0.2, osc: 0.9, ody: 0 });
    const step = Math.min(2, Math.floor(u * 3));
    const fill = M.o3((u * 3 - step) / 0.35) * 0 + (step + M.o5(M.clamp((u * 3 - step) / 0.3))) / 3;
    $('#cdf').style.transform = `scaleY(${fill.toFixed(4)})`;
    M.setT($('#cdn'), String(3 - step));
    M.vis($('#take'), t, tTake, 1e9, { dy: 30, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.08, { st: 0.035, rot: 0 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(0.2, 'tick', 0.4); [0, 1, 2, 3].forEach(k => M.sfx(1.1 + k * 0.12, 'tick', 0.25));
M.sfx(tMorph, 'swish', 0.4);
M.sfx(tPanel, 'blip', 0.3); [0, 1, 2, 3].forEach(k => M.sfx(tMorph + 0.3 + k * 0.07, 'tick', 0.2, -0.3 + k * 0.15));
tVal.forEach((a, i) => M.sfx(a, 'tick', 0.35, -0.3 + i * 0.15));
M.sfx(tOn8, 'click', 0.55, -0.3); M.sfx(tAdds, 'blip', 0.35);
M.sfx(t4, 'click', 0.45, -0.3); M.sfx(t4 + 0.1, 'click', 0.55, -0.1); M.sfx(t1, 'click', 0.55, 0.15);
tDig.forEach((a, i) => M.sfx(a, 'tick', 0.3, -0.3 + i * 0.15)); M.sfx(tFive, 'blip', 0.4);
M.sfx(tSweep, 'swish', 0.45); M.sfx(tCover + 0.04, 'swish', 0.3);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.04, 'correct', 0.55); M.sfx(tPlus, 'click', 0.4); M.sfx(tPlus + 0.38, 'click', 0.4);
M.outro({ bg: '#111111', ink: '#FFFFFF', accent: '#FFD23F', sub: 'rgba(255,255,255,.6)', font: 'Inter' });
})();
