// BCA world sample - What is a variable? (Code studio)
(() => {
const { $ } = M;
const C = { bg: '#0E1116', panel: '#161A22', panel2: '#1C212B', border: '#252B36', text: '#E6EAF2', muted: '#7D8590', dim: '#454C59', lime: '#B7F34A', violet: '#C4A7FF', sky: '#7CC7FF' };
const wt = M.wt, mix = M.mix;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const CW = 18, CX0 = 104, LY = [92, 156, 220], CPS = 0.045;   // JetBrains Mono 30px: 18px advance

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.3, tSub = wt('H1', 'remember'), tMorph = M.t0('H2') + 0.02;
const tEd = tMorph + 0.15, tLet = wt('H2', 'variable');
const tBox = wt('V1', 'box'), tLab = wt('V1', 'labelled'), tHolds = wt('V1', 'holds'), tValK = wt('V1', 'value');
const tName = wt('V2', 'name'), tRiya = wt('V2', 'holds'), tGreet = M.t1('V2') - 0.15;
const tChange = M.t0('V3'), tVal3 = wt('V3', 'value'), tShows = wt('V3', 'shows'), tNew = wt('V3', 'new');
const tDock = M.t0('Q1') - 0.95, tMin = M.t0('Q1') - 0.6, tOpen = tMin + 0.3;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Ten');

/* ---------- code script: segments [text, class, tStart] typed char by char ---------- */
const L1 = [['// remembers your name', 'c', tEd + 0.3]];
const L2a = [['let', 'k', tLet], [' name', 'v', tLet + 4 * CPS]];
const L2b = [[' = ', 'v', tRiya], ['"', 's', tRiya + 3 * CPS]];
const R1 = 'Riya', R2 = 'Arjun';
const tR1 = tRiya + 4 * CPS, tR2 = tVal3;
const L3 = [['greet', 'k', tGreet], ['(name);', 'v', tGreet + 5 * CPS]];
const span = (txt, cls) => `<span class="${cls}">${txt.replace(/</g, '&lt;')}</span>`;
const typed = (segs, t) => { let h = '', n = 0, last = -1; for (const [s, c, t0] of segs) { const k = M.clamp(Math.floor((t - t0) / CPS) + 1, 0, s.length); if (k > 0) { h += span(s.slice(0, k), c); n += k; last = t0 + (s.length - 1) * CPS; } } return { h, n, last }; };

/* ---------- static bits ---------- */
$('#lns').innerHTML = LY.map((y, i) => `<div class="ln" style="top:${y + 4}px">${i + 1}</div>`).join('');
$('#vlabI').innerHTML = M.icon('package', 22, '#0E1116', 2.4);
$('#d0i').innerHTML = M.icon('code', 20, C.muted, 2); $('#d1i').innerHTML = M.icon('help', 20, C.muted, 2);
const OPTS = [['score', 'v'], ['10', 's'], ['=', 'v']];
OPTS.forEach(([o, c], i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${48 + i * 512}px"><div class="lt">${'ABC'[i]}</div><div class="ot code" style="position:absolute;left:32px;top:84px;font-size:40px"><span class="${c}">${o}</span></div><div class="ok">${M.icon('check', 26, '#0E1116', 3)}</div></div>`));

const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
function measure() {
  const w = $('#title').offsetWidth;
  geo = { sx: 960 - w / 2, sy: 404, ex: 160, ey: 144, es: 0.5, cw: $('#eyebrow').offsetWidth, sw: $('#sub').offsetWidth };
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const qOn = t >= tOpen;

  // --- title -> header ---
  const m = M.spring(t - tMorph, M.SOFT);
  const ti = $('#title');
  const x = M.lerp(geo.sx, geo.ex, m), y = M.lerp(geo.sy, geo.ey, m), s = M.lerp(1, geo.es, m);
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${f2(x)}px,${f2(y)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, rot: 0 });
  const ey = $('#eyebrow');
  ey.style.left = f2(M.lerp(960 - geo.cw / 2, 160, m)) + 'px'; ey.style.top = f2(M.lerp(316, 96, m)) + 'px';
  M.vis(ey, t, 0.12, 1e9, { dy: 14 });
  const sb = $('#sub'); sb.style.left = (960 - geo.sw / 2) + 'px'; sb.style.top = '584px';
  M.vis(sb, t, tSub, tMorph - 0.15, { dy: 16, outDur: 0.25, ody: 10 });

  // --- editor window: opens, then minimises into the dock ---
  const ed = $('#ed');
  const mn = M.io((t - tMin) / 0.45);
  // shrink a window so its centre lands on the dock item (tx, ty)
  const toDock = (el, x0, y0, w, h, tx, ty) => {
    if (mn >= 1) { M.hide(el, true); return; }
    M.hide(el, false);
    const fx = x0 + w / 2, fy = y0 + h / 2, k = M.lerp(1, 0.06, mn);
    el.style.transformOrigin = '0 0';
    el.style.transform = `translate(${f2(M.lerp(fx, tx, mn) - x0 - k * (fx - x0))}px,${f2(M.lerp(fy, ty, mn) - y0 - k * (fy - y0))}px) scale(${k.toFixed(4)})`;
    el.style.opacity = (1 - M.clamp((mn - 0.6) / 0.4)).toFixed(3);
  };
  if (mn <= 0) M.vis(ed, t, tEd, 1e9, { dy: 30, sc: 0.97, sp: M.SOFT });
  else toDock(ed, 160, 256, 1056, 600, 1536, 132);
  if (!qOn) {
    // code
    const l1 = typed(L1, t), l2a = typed(L2a, t), l2b = typed(L2b, t), l3 = typed(L3, t);
    const val = t < tR2 ? R1 : R2, vt0 = t < tR2 ? tR1 : tR2;
    const vk = t < tChange + 0.25 ? M.clamp(Math.floor((t - vt0) / CPS) + 1, 0, val.length) : (t < tR2 ? val.length : M.clamp(Math.floor((t - vt0) / CPS) + 1, 0, val.length));
    const tailOn = t >= vt0 + (val.length) * CPS;
    let h2 = l2a.h + l2b.h + (t >= tR1 ? span(val.slice(0, t >= tChange + 0.25 && t < tR2 ? 0 : vk), 's') : '') + (t >= tR1 + R1.length * CPS ? span('"', 's') + span(';', 'v') : '');
    const k1 = l1.h, k3 = l3.h;
    if ($('#L1')._h !== k1) { $('#L1')._h = k1; $('#L1').innerHTML = k1; }
    if ($('#L2')._h !== h2) { $('#L2')._h = h2; $('#L2').innerHTML = h2; }
    if ($('#L3')._h !== k3) { $('#L3')._h = k3; $('#L3').innerHTML = k3; }
    // caret position: line currently being typed
    let cl = 0, cc = l1.n, lastType = l1.last;
    if (t >= tLet - 0.05) { cl = 1; cc = $('#L2').textContent.length; lastType = Math.max(l2a.last, l2b.last, t >= tR1 ? vt0 + val.length * CPS : -1); }
    if (t >= tGreet - 0.05 && t < tChange) { cl = 2; cc = l3.n; lastType = l3.last; }
    if (t >= tChange) { cl = 1; cc = 'let name = "'.length + (t < tR2 ? (t < tChange + 0.25 ? R1.length : 0) : vk); lastType = t < tR2 ? tChange : tR2 + R2.length * CPS; }
    const car = $('#caret');
    const blinkOn = t - lastType < 0.5 || Math.floor((t - lastType) * 2.2) % 2 === 0;
    M.hide(car, t < tEd + 0.3 || !blinkOn);
    car.style.left = (CX0 + cc * CW) + 'px'; car.style.top = (LY[cl] + 4) + 'px';
    $('#curl').style.top = (LY[cl] - 4) + 'px'; M.hide($('#curl'), t < tEd + 0.3);
    // selection over "Riya" on "Change"
    const sel = $('#sel');
    M.hide(sel, !(t >= tChange && t < tChange + 0.25 + 0.0) && !(t >= tChange && t < tR2));
    sel.style.left = (CX0 + 12 * CW - 2) + 'px'; sel.style.top = (LY[1] + 0) + 'px';
    sel.style.width = (t < tChange + 0.25 ? M.io((t - tChange) / 0.2) * R1.length * CW : 0) + 4 + 'px';
    if (t >= tChange + 0.25) M.hide(sel, true);

    // variable box: drawn on "box", label on "labelled", value on "Riya"
    const vb = $('#vbox');
    M.hide(vb, t < tBox - 0.05);
    M.draw($('#bxS'), t, tBox, 0.6, M.io);
    M.vis($('#bxF'), t, tBox + 0.3, 1e9, { dy: 0, fade: 0.3 });
    M.vis($('#vlab'), t, tLab, 1e9, { dy: 44, sp: M.SNAP, fade: 0.1 });
    M.setT($('#vlabT'), 'name');
    M.vis(vb.querySelector('.vk'), t, tValK, 1e9, { dy: 10 });
    M.vis(vb.querySelector('.vt'), t, tValK + 0.1, 1e9, { dy: 10 });
    const vv = $('#vv'), vo = $('#vvO');
    M.setT(vv, t < tR2 ? '"Riya"' : '"Arjun"'); M.setT(vo, '"Riya"');
    if (t < tR2) { M.vis(vv, t, tR1 + 0.15, 1e9, { dy: -60, sp: M.SNAP, fade: 0.1 }); M.hide(vo, true); }
    else { M.vis(vv, t, tR2 + 0.15, 1e9, { dy: -60, sp: M.SNAP, fade: 0.1 }); M.vis(vo, t, null, tR2 + 0.1, { outDur: 0.25, ody: 50 }); }
    const sw = M.io((t - (t < tR2 ? tR1 : tR2) - 0.1) / 0.25) * (1 - M.io((t - (t < tR2 ? tR1 : tR2) - 0.5) / 0.4));
    $('#bxS').setAttribute('stroke-width', (3 + 2 * sw).toFixed(2));
  }

  // --- phone ---
  const ph = $('#ph');
  if (mn <= 0) M.vis(ph, t, tEd + 0.12, 1e9, { dx: 40, dy: 0, sp: M.SOFT });
  else toDock(ph, 1408, 256, 352, 600, 1536, 132);
  if (!qOn) {
    const tP1 = tGreet + 0.3, tP2 = tShows;
    const nm = t < tP1 ? '' : t < tP2 ? 'Riya' : 'Arjun';
    M.setT($('#hiN'), nm); M.hide($('#hiP'), t >= tP1); $('#hiP').style.display = t >= tP1 ? 'none' : 'inline-block';
    M.setT($('#ava'), t < tP2 ? 'R' : 'A');
    const tl = t < tP2 ? tP1 : tP2;
    if (t >= tP1) M.vis($('#hiN'), t, tl, 1e9, { dy: 22, sp: M.SNAP, fade: 0.08 });
    $('#ava').style.background = t >= tP1 ? C.bg : '#DCE1E9'; $('#ava').style.color = t >= tP1 ? C.lime : '#DCE1E9';
    const pulse = t >= tNew && t < tNew + 0.4 ? Math.sin(Math.PI * (t - tNew) / 0.4) : 0;
    $('#ava').style.transform = pulse > 0.001 ? `scale(${(1 + 0.1 * pulse).toFixed(4)})` : 'none';
  }

  // --- dock: slides up into the header, window swaps happen through it ---
  const dk = $('#dock');
  M.vis(dk, t, tDock, 1e9, { dy: -20, sp: M.SOFT });
  const dsel = t < tOpen - 0.05 ? 0 : 1;
  $('#d0').style.background = dsel === 0 && t > tMin + 0.3 ? '#232A35' : C.panel2; $('#d0').style.color = dsel === 0 && t > tMin + 0.3 ? C.text : C.muted;
  $('#d1').style.background = dsel === 1 ? '#232A35' : C.panel2; $('#d1').style.color = dsel === 1 ? C.text : C.muted;
  M.hide($('#d0s'), t < tMin + 0.35); M.hide($('#d1s'), t < tOpen);
  const bump0 = t > tMin + 0.4 && t < tMin + 0.75 ? Math.sin(Math.PI * (t - tMin - 0.4) / 0.35) : 0;
  $('#d0').style.transform = bump0 > 0.001 ? `translateY(${f2(-6 * bump0)}px)` : 'none';

  // --- quiz window opens out of dock item d1 ---
  const qw = $('#qw');
  if (!qOn) M.hide(qw, true);
  else {
    M.hide(qw, false);
    const op = M.spring(t - tOpen, M.SOFT);
    const ox = 1456 + 156 + 68, oy = 132;        // dock item centre
    const k = M.lerp(0.06, 1, op);
    if (op >= 1) { qw.style.transform = 'none'; qw.style.opacity = ''; }
    else {
      qw.style.transformOrigin = '0 0';
      const cx = M.lerp(ox, 960, op), cy = M.lerp(oy, 556, op);
      qw.style.transform = `translate(${f2(cx - 800 * k - 160)}px,${f2(cy - 300 * k - 256)}px) scale(${k.toFixed(4)})`;
      qw.style.opacity = M.clamp((t - tOpen) / 0.12).toFixed(3);
    }
    M.rise($('#qq'), t, tOpen + 0.3, { st: 0.05, rot: 0 });
    M.vis($('#qcode'), t, wt('Q1', 'score') - 0.05, 1e9, { dy: 16, sp: M.SNAP });
    const qhl = $('#qhl'); M.vis(qhl, t, tAns + 0.1, 1e9, { dy: 0, sc: 1.2, sp: M.SNAP, fade: 0.1 });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'what') + i * 0.08, 1e9, { dy: 30, sp: M.SOFT });
      const right = i === 0, r = M.io((t - tAns) / 0.3);
      el.style.background = right ? mix(C.panel2, '#1E2814', r) : mix(C.panel2, C.panel, r);
      el.style.borderColor = right ? mix(C.border, C.lime, r) : C.border;
      const os = el.querySelector('.ot span'); os.style.color = right ? '' : mix(i === 1 ? C.sky : C.text, '#3A414D', r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.bg, C.lime, r) : C.bg; lt.style.color = right ? mix(C.muted, C.bg, r) : C.muted;
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 }); else M.hide(ok, true);
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.SNAP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 16, sp: M.SNAP });
    M.rise($('#takeT'), t, tTake + 0.08, { st: 0.04, rot: 0 });
  }
  caps(t);
});

/* ---------- sound: key per char (low), click, blip, correct ---------- */
const keys = (segs) => segs.forEach(([s, c, t0]) => { for (let k = 0; k < s.length; k++) if (s[k] !== ' ') M.sfx(t0 + k * CPS, 'key:' + (k % 4), 0.12, -0.2); });
M.sfx(0.25, 'blip', 0.35); M.sfx(tSub, 'click', 0.3);
M.sfx(tMorph, 'click', 0.35); M.sfx(tEd + 0.12, 'blip', 0.3, 0.4);
keys(L1); keys(L2a); keys(L2b); keys([[R1, 's', tR1], ['";', 's', tR1 + R1.length * CPS]]); keys(L3);
M.sfx(tBox, 'click', 0.3); M.sfx(tLab, 'blip', 0.3); M.sfx(tR1 + 0.15, 'blip', 0.35);
M.sfx(tGreet + 0.3, 'blip', 0.35, 0.5);
M.sfx(tChange, 'click', 0.35); keys([[R2, 's', tR2]]); M.sfx(tR2 + 0.15, 'blip', 0.35); M.sfx(tShows, 'blip', 0.4, 0.5);
M.sfx(tDock, 'click', 0.3, 0.6); M.sfx(tMin, 'blip', 0.3, 0.6); M.sfx(tOpen, 'click', 0.45, 0.4);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'click', 0.45));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'blip', 0.3);
M.outro({ bg: '#0E1116', ink: '#E6EAF2', accent: '#B7F34A', sub: 'rgba(230,234,242,.6)', font: 'JetBrains Mono' });
})();
