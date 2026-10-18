// BSc Maths world sample - What is a function? (Ink notebook)
(() => {
const { $ } = M;
const C = { ink: '#1B1B2F', ink2: '#4A4A60', muted: '#8C8C98', dim: '#C9C9CF', blue: '#2F5BEA', blue2: '#E6ECFD', red: '#E0533D', card: '#FFFFFF', paper: '#FAFAF6', line: '#E2E2D8', grid: '#ECECE4' };
const wt = M.wt;

/* ---------- beats ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02, tMach = wt('H2', 'machine') - 0.05, tRule = wt('H2', 'function') - 0.1;
const tIn = wt('F1', 'number'), tThree = wt('F1', 'three');
const tSwallow = M.t0('F2') - 0.1;                        // token enters the machine as the rule is read
const tDbl = wt('F2', 'doubles'), tAdd = wt('F2', 'adds');
const tOut = wt('F3', 'Out'), tSeven = wt('F3', 'seven');
const tSame = [wt('F3', 'Same'), wt('F3', 'same', 1), wt('F3', 'every')];
const tTurn = M.t0('Q1') - 0.55, TD = 0.9, tQ = tTurn + 0.55;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Five');

/* ---------- build ---------- */
const OPTS = ['10', '11', '12', '15'];
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 3)}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot ser">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`));
$('#takeI').innerHTML = M.icon(['M12 20h9', 'M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z'], 44, '#FFB4A6', 2.2);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.04, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
// masked left-to-right "pen" reveal for maths lines (the ink writes on)
const write = (el, t, t0, dur = 0.5) => {
  const u = M.io((t - t0) / dur);
  if (u <= 0) { M.hide(el, true); return; }
  M.hide(el, false);
  const cp = u >= 1 ? 'none' : `inset(-20% ${((1 - u) * 100).toFixed(2)}% -20% -4%)`;
  if (el.style.clipPath !== cp) el.style.clipPath = cp;
};
let geo = null;
function measure() {
  const w = $('#title').offsetWidth;
  geo = { sx: 960 - w / 2, sy: 400, ex: 160, ey: 142, es: 72 / 150, cw: $('#eyebrow').offsetWidth, tw: w };
  const acc = $('#title .acc'); geo.ax = acc.offsetLeft; geo.aw = acc.offsetWidth;
  const r = $('#rule'), a = $('#r2x'), b = $('#r1');
  // underline coordinates in machine-svg space (svg at 160,270)
  const rx = r.offsetLeft - 160, ry = r.offsetTop - 270 + 96;
  geo.u2 = [rx + a.offsetLeft + 4, rx + a.offsetLeft + a.offsetWidth - 4, ry];
  geo.u1 = [rx + b.offsetLeft + 4, rx + b.offsetLeft + b.offsetWidth - 4, ry];
  const set = (el, [x1, x2, y]) => { el.setAttribute('x1', x1); el.setAttribute('x2', x2); el.setAttribute('y1', y); el.setAttribute('y2', y); };
  set($('#u2x'), geo.u2); set($('#u1'), geo.u1);
}
// token geometry (page px): input chute centre x 282, output chute centre x 1094, chute centre y 550
const TIN0 = 282 - 44 - 96, TIN1 = 282 - 44, MOUTH_L = 380, MOUTH_R = 996, TOUT1 = 1094 - 44, TY = 550 - 44;

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- page turn: the whole notebook slides left; the grid strip is continuous (1920 = 60 x 32) ---
  const pu = M.io((t - tTurn) / TD), bx = -1920 * pu;
  $('#book').style.transform = pu <= 0 ? 'none' : `translateX(${pu >= 1 ? -1920 : bx.toFixed(2)}px)`;
  M.hide($('#pageA'), pu >= 1); M.hide($('#pageB'), pu <= 0);

  if (pu < 1) {
    // --- title -> header ---
    const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
    ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
    M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY });
    const ey = $('#eyebrow');
    ey.style.left = (m >= 1 ? 160 : M.lerp(960 - geo.cw / 2, 160, m)).toFixed(2) + 'px'; ey.style.top = (m >= 1 ? 96 : M.lerp(318, 96, m)).toFixed(2) + 'px';
    M.vis(ey, t, 0.08, 1e9, { dy: 18 });
    // red pencil underline sits under "function" (travels with title)
    const tul = $('#tul'), sc = M.lerp(1, geo.es, m);
    const ux = M.lerp(geo.sx, geo.ex, m) + geo.ax * sc, uy = M.lerp(geo.sy, geo.ey, m) + 150 * sc;
    tul.style.transform = m >= 1 ? `translate(${(geo.ex + geo.ax * geo.es).toFixed(0)}px,${(geo.ey + 150 * geo.es).toFixed(0)}px) scale(${(geo.aw / 520 * geo.es).toFixed(4)})` : `translate(${ux.toFixed(2)}px,${uy.toFixed(2)}px) scale(${(geo.aw / 520 * sc).toFixed(4)})`;
    tul.style.transformOrigin = '0 0';
    M.draw($('#tulP'), t, 1.0, 0.55, M.o3);
    M.vis($('#tul'), t, null, tMorph - 0.1, { dy: 0, ody: 0, outDur: 0.25 });
    M.rise($('#sub'), t, 1.2, { st: 0.04, out: tMorph - 0.12, outDur: 0.3 });

    // --- the machine draws on ---
    M.draw($('#mBox'), t, tMach, 0.8, M.io);
    $('#mBox').style.fillOpacity = M.clamp((t - tMach - 0.6) / 0.2).toFixed(3);
    M.hide($('#mMouthL'), t < tMach + 0.6); M.hide($('#mMouthR'), t < tMach + 0.6);
    M.draw($('#mIn'), t, tMach + 0.45, 0.4, M.o3); M.draw($('#mOut'), t, tMach + 0.55, 0.4, M.o3);
    M.draw($('#mInA'), t, tMach + 0.75, 0.3, M.o3); M.draw($('#mOutA'), t, tMach + 0.85, 0.3, M.o3);
    M.vis($('#lIn'), t, tMach + 0.8, 1e9, { dy: 10 }); M.vis($('#lOut'), t, tMach + 0.9, 1e9, { dy: 10 });
    M.vis($('#lRule'), t, tRule - 0.1, 1e9, { dy: 10 });
    write($('#rule'), t, tRule, 0.7);
    M.vis($('#disp'), t, tRule + 0.4, 1e9, { dy: 14 });
    // rule highlights: "doubles" underlines 2x, "adds one" underlines +1
    M.draw($('#u2x'), t, tDbl, 0.35, M.o3); M.draw($('#u1'), t, tAdd, 0.35, M.o3);
    $('#r2x').style.color = M.mix(C.ink, C.blue, M.io((t - tDbl) / 0.3));
    $('#r1').style.color = M.mix(C.ink, C.blue, M.io((t - tAdd) / 0.3));
    // processing lamp
    const busy = M.io((t - tSwallow - 0.2) / 0.2) * (1 - M.io((t - tOut) / 0.25));
    $('#lamp').setAttribute('fill', M.mix(C.grid, C.blue, busy)); M.hide($('#lamp'), t < tMach + 0.6);
    // display steps (one solid state each)
    const d0 = $('#d0'), d1 = $('#d1'), d2 = $('#d2');
    M.vis(d0, t, null, tDbl - 0.05, { dy: 0, ody: -40, outDur: 0.2 });
    M.vis(d1, t, tDbl + 0.2, tAdd - 0.02, { dy: 40, ody: -40, outDur: 0.2 });
    M.vis(d2, t, tAdd + 0.08, 1e9, { dy: 40 });
    d2.style.color = M.mix(C.ink, C.blue, M.io((t - tOut) / 0.3));

    // --- one token travels through the machine along the track: 3 -> 6 -> 7 ---
    const tk = $('#tin');
    const xs = M.track(TIN0, [[tIn, TIN1, M.SOFT], [tSwallow, 420, M.SOFT], [tDbl, 644, M.SOFT], [tAdd, 868, M.SOFT], [tOut, TOUT1, M.SOFT]]);
    if (t < tIn) M.hide(tk, true);
    else {
      M.hide(tk, false);
      const x = xs(t), xr = Math.abs(x - Math.round(x)) < 0.02 ? Math.round(x) : x;
      const sw = k => M.clamp((t - k) / 0.28), dip = k => { const u = sw(k); return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; };
      const d = Math.max(dip(tDbl + 0.1), dip(tAdd + 0.1));
      tk.style.left = '0px'; tk.style.top = TY + 'px';
      tk.style.transform = d > 0 ? `translate(${xr.toFixed(2)}px,0px) scale(${(1 - 0.22 * d).toFixed(4)})` : `translate(${xr.toFixed(2)}px,0px)`;
      tk.style.opacity = M.clamp((t - tIn) / 0.15).toFixed(3);
      M.setT(tk, t < tDbl + 0.24 ? '3' : t < tAdd + 0.24 ? '6' : '7');
      const fill = M.io((t - tOut) / 0.3);
      tk.style.background = M.mix(C.card, C.blue, fill); tk.style.color = M.mix(C.blue, '#FFFFFF', fill);
    }
    M.draw($('#track'), t, tMach + 0.7, 0.5, M.o3);
    [tDbl, tAdd].forEach((ts, k) => { const st = $('#st' + k); M.vis(st, t, tMach + 0.9 + k * 0.08, 1e9, { dy: 8 }); st.style.color = M.mix(M.mix('#C9C9CF', C.blue, M.io((t - ts) / 0.3)), C.ink2, M.io((t - (k ? tOut : tAdd)) / 0.3)); });

    // --- working card ---
    M.vis($('#work'), t, tMach + 0.3, 1e9, { dx: 40, dy: 0 });
    M.vis($('#work .lbl'), t, tMach + 0.5, 1e9, { dy: 8 });
    write($('#w1'), t, tThree, 0.4);
    write($('#w2'), t, tDbl + 0.1, 0.55);
    write($('#w3'), t, tAdd + 0.1, 0.55);
    $('#w1').style.color = M.mix(C.ink, C.ink2, M.io((t - tDbl) / 0.3));
    $('#w2').style.color = M.mix(C.ink, C.ink2, M.io((t - tAdd) / 0.3));
    $('#w3').style.color = M.mix(C.ink, C.ink2, M.io((t - tSeven) / 0.3));
    M.vis($('#hr'), t, tOut, 1e9, { dy: 0, dx: -20 });
    M.vis($('#res'), t, tSeven, 1e9, { dy: 0, sc: 0.85, sp: M.SNAP });
    $('#res').style.background = M.mix(C.card, C.blue2, M.io((t - tSeven - 0.1) / 0.3));
    write($('#note'), t, tSame[0], 0.6);
    tSame.forEach((ts, k) => M.draw($('#k' + k), t, ts + 0.05, 0.25, M.o3));
  }

  // --- quick check page ---
  if (pu > 0) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 14 });
    M.rise($('#qq'), t, tQ + 0.08, { st: 0.06, sp: M.HEAVY });
    write($('#qrule'), t, tQ + 0.5, 0.6);
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'What') + i * 0.08, 1e9, { dy: 32 });
      const right = i === 1, r = M.io((t - tAns) / 0.3);
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.card, C.blue, r) : C.card;
      bg.style.borderColor = right ? M.mix(C.line, C.blue, r) : C.line;
      el.querySelector('.ot').style.color = right ? M.mix(C.ink, '#FFFFFF', r) : M.mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.paper, '#FFFFFF', r) : C.paper; lt.style.borderColor = right ? M.mix(C.line, '#FFFFFF', r) : C.line; lt.style.color = right ? M.mix(C.ink, C.blue, r) : M.mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) { M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); ok.style.background = '#FFFFFF'; ok.innerHTML.includes('#2F5BEA') || (ok.innerHTML = M.icon('check', 30, '#2F5BEA', 3)); } else M.hide(ok, true);
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 32 });
    write($('#takeT'), t, tTake + 0.12, 0.9);
    write($('#takeN'), t, wt('A1', 'ten') , 0.5);
  }
  caps(t);
});

/* ---------- sound: tick paper ratchet ding correct ---------- */
M.sfx(0.12, 'paper', 0.45); M.sfx(1.0, 'tick', 0.35);
M.sfx(tMorph, 'paper', 0.4);
M.sfx(tMach, 'tick', 0.3, -0.2); M.sfx(tRule, 'paper', 0.3);
M.sfx(tIn, 'tick', 0.4, -0.6);
M.sfx(tSwallow + 0.3, 'ratchet', 0.25, -0.2);
M.sfx(tDbl, 'tick', 0.4); M.sfx(tAdd, 'tick', 0.4);
M.sfx(tOut, 'ratchet', 0.25, 0.3); M.sfx(tSeven, 'ding', 0.45, 0.3);
tSame.forEach((ts, k) => M.sfx(ts + 0.05, 'tick', 0.3, 0.5));
M.sfx(tTurn, 'paper', 0.6);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.05, 'correct', 0.55); M.sfx(tTake, 'paper', 0.3);
M.outro({ bg: '#1B1B2F', ink: '#FAFAF6', accent: '#6E8BFF', sub: 'rgba(250,250,246,.62)', font: 'Instrument Serif' });
})();
