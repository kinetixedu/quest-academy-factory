// ep.js - shared scene runner for PUC Biology Eps 55-59 (same file copied into each episode folder).
// Same look, helpers and timing rules as Ep 34 (coelom and segmentation); each scene.js only supplies content and drawings.
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, attr = PUC.attr;
const IMG = '../../assets/illustrations/puc/', nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const cap = (p, x, y, s, a = {}) => txt(p, x, y, s, Object.assign({ 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 }, a));
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const lab = (g, px, py, lx, ly, s, an = 'start', cls = 'zl') => { const ln = mk(g, 'path', { d: `M${(+px).toFixed(1)},${(+py).toFixed(1)} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : an === 'end' ? -12 : 0), y: ly + 9, 'text-anchor': an, class: cls }); tx.textContent = s; return { ln, dot, tx }; };
const labT = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };
const pol = (x, y, r, a) => [x + r * Math.cos(a), y + r * Math.sin(a)];
// time spec: 'Z1' line start | ['Z2','word',off,nth] word | ['Z2',null,off] line start + off | ['Z2','$',off] line end | number
const tm = s => s == null ? 1e9 : typeof s === 'number' ? s : typeof s === 'string' ? T0(s) : (s[1] == null ? T0(s[0]) : s[1] === '$' ? T1(s[0]) : wt(s[0], s[1], s[3] || 0)) + (s[2] || 0);
const ORD = () => M.CUES.order, nextId = id => ORD()[ORD().indexOf(id) + 1];
const OUT = s => tm(s) - 0.32;
const div = (p, cls, st = {}, html = '') => { const e = document.createElement('div'); if (cls) e.className = cls; Object.assign(e.style, st); e.innerHTML = html; p.appendChild(e); return e; };
const svgIn = (host, w, h, st = {}) => { const s = mk(host, 'svg', { width: w, height: h, class: 'cs' }); Object.assign(s.style, st); return s; };
// generic cards: pos 'L' left, 'R' right, 'W' wide, or [l, t, w, h]
const POS = { L: [160, 270, 784, 580], R: [976, 270, 784, 580], W: [160, 270, 1600, 580] };
const EP = window.EP = { C, mk, txt, cap, POP, lab, labT, lite, pol, tm, div, svgIn, IMG, mix: M.mix, attr };

// ordered chips with arrows (stage chain): returns { el, cur(t), run(t) }
EP.chain = (host, items, x = 36, y = 76) => { const el = div(host, 'stc2', { left: x + 'px', top: y + 'px' });
  el.innerHTML = items.map(([s], i) => `<span>${s}</span>${i < items.length - 1 ? '<em>›</em>' : ''}`).join('');
  const sp = [...el.querySelectorAll('span')];
  const cur = t => { let c = -1; items.forEach(([, s], i) => { if (t >= tm(s) - 0.1) c = i; }); return c; };
  return { el, cur, run: (t, t0) => { const c = cur(t); sp.forEach((e, i) => { M.vis(e, t, t0 + i * 0.06, 1e9, { dy: 8 }); lite(e, i < c, i === c); }); return c; } }; };
// five-step list with the moving highlight (Ep 34 style)
EP.steps = (card, steps, specs, y0 = 80, dy = 92) => {
  const hb = div(card, 'hiBox', { left: '20px', width: '744px', height: '84px' });
  const rows = steps.map(([s, w, fs], i) => div(card, 'st5', { top: y0 + i * dy + 'px' }, `<div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why" style="font-size:${fs || 20}px">${w}</div>`));
  return t => { const ts = specs.map(tm);
    rows.forEach((el, i) => { M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.7); M.vis(el.querySelector('.why'), t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t);
    M.vis(hb, t, ts[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let c = -1; ts.forEach((tt, i) => { if (t >= tt - 0.2) c = i; }); return c; }; };

const run = (o, t) => { const r = o || {};
  (r.labs || []).forEach(([l, sp]) => labT(l, t, tm(sp)));
  (r.els || []).forEach(([e, sp, op, out]) => M.vis(e, t, tm(sp), out == null ? 1e9 : tm(out), op || POP));
  (r.writes || []).forEach(([e, sp, d]) => PUC.write(e, t, tm(sp), d || 0.8));
  (r.fades || []).forEach(([e, sp, d, lo]) => { e.style.opacity = ((lo || 0) + (1 - (lo || 0)) * M.clamp((t - tm(sp)) / (d || 0.3))).toFixed(3); });
  if (r.anim) r.anim(t); };
EP.run = cfg => {
  const tMorph = T0('H2') + 0.02, tT = T0('T1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1'), tX1 = T0('X1');
  const tStEnd = T0(nextId('T1'));
  const SW = [[tT, tStEnd], [tQ, tQ + 0.06], [tF, tF + 0.06]];
  const cam = $('#cam');
  if (cfg.icons) Object.assign(M.IC, cfg.icons);
  // title card tiles
  $('#jobs').innerHTML = cfg.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.1)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
  const tJob = cfg.jobs.map(j => tm(j[3]));
  // scenes
  const SC = cfg.scenes.map((s, si) => {
    const root = div(cam, 'scn'); root.id = 's' + s.id;
    const from = s.from === 'MORPH' ? tMorph : tm(s.from), to = tm(s.to);
    if (s.build) s._r = s.build(root) || {};
    const cards = (s.cards || []).map((c, ci) => {
      const p = typeof c.pos === 'string' ? POS[c.pos] : c.pos, el = div(root, 'card ' + (c.cls || ''), { left: p[0] + 'px', top: p[1] + 'px', width: p[2] + 'px', height: p[3] + 'px' });
      if (c.label) div(el, 'lbl', { left: '36px', top: '30px' }).textContent = c.label;
      if (c.ghost) div(el, 'ghost', { right: '28px', top: '22px' }).textContent = c.ghost === true ? 'NOT IN CURRENT NCERT · IN ISC SYLLABUS' : c.ghost;
      el.svg = c.svg === false ? null : svgIn(el, p[2], p[3]);
      if (c.pill) { const [ps, pt, pc, pst] = c.pill; c._pill = div(el, 'pillp ' + (pc || ''), Object.assign({ left: '36px', top: (p[3] - 86) + 'px' }, pst || {})); c._pill.innerHTML = ps; c._pt = pt; }
      if (c.face) { c._face = div(el, 'hdF', { backgroundImage: `url(${IMG}${c.face}-face.jpg)` }); }
      c._r = c.build ? c.build(el, el.svg) || {} : {};
      const dx = c.dx ?? (p[2] > 1000 ? 0 : p[0] < 900 ? -60 : 60), dy = c.dy ?? (dx ? 0 : 36);
      c._in = { dx, dy }; c._el = el; return c; });
    return { s, root, from, to, cards };
  });
  // statement
  $('#st2').innerHTML = cfg.stmt.l2; $('#stF').innerHTML = cfg.stmt.f;
  // exam + recap
  const trap = PUC.trap($('#trap'), { wrong: cfg.trap.wrong, right: cfg.trap.right });
  const tr = cfg.trap.build ? cfg.trap.build($('#tS')) || {} : {};
  const where = PUC.where($('#wa'), { on: [], type: cfg.where.type });
  const mcq = PUC.mcq($('#mq'), Object.assign({ pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, optW: 474, optY: 404 }, cfg.mcq));
  const so = PUC.solution($('#so'), cfg.sol.map(x => [x[0]]), { y0: 100, dy: 100 });
  const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: cfg.recap.title, y0: 100, dy: 70, txt: cfg.recap.lines.map(() => 1), lines: cfg.recap.lines });
  $('#yrs').innerHTML = cfg.yq.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
  const nx = PUC.next($('#sF'), { label: cfg.next.label, topic: cfg.next.topic, y: 764 });
  const head = PUC.header({ tMorph, tOut: tQ - 0.05 }), sweep = PUC.sweepRun(SW), caps = M.captions($('#cap'), M.CUES.order);
  const camF = M.camera(cam, [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]].concat(cfg.cam || []));
  const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
  let first = true;
  M.on(t => {
    if (first) { first = false; const g = $('#tgh'); if (g) g.style.left = (960 - g.offsetWidth / 2) + 'px'; }
    camF(t); head(t); sweep(t);
    $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
    cfg.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
    if ($('#tgh')) M.vis($('#tgh'), t, 1.4, tMorph - 0.15, { dy: 10, outDur: 0.25 });
    SC.forEach(({ s, root, from, to, cards }) => {
      const on = t >= from - 0.1 && t < to + 0.1; M.hide(root, !on); if (!on) return;
      cards.forEach((c, ci) => { const tin = c.tin != null ? tm(c.tin) : from + 0.05 + ci * 0.15, tout = c.keep || s.keep ? 1e9 : c.tout != null ? OUT(c.tout) : to - 0.32;
        M.vis(c._el, t, tin, tout, { dx: c._in.dx, dy: c._in.dy, outDur: 0.3, ody: c._in.dx ? 0 : -16 });
        if (c._pill) M.vis(c._pill, t, tm(c._pt), 1e9, POP);
        if (c._face) M.vis(c._face, t, tm(c.faceAt || from) + 0.1, 1e9, { ...POP, sc: 0.5 });
        run(c._r, t); });
      run(s._r, t);
    });
    // statement
    const stOn = t >= tT && t < tStEnd + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
    if (stOn) { const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tStEnd ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
      M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, tm(cfg.stmt.t2), { st: 0.07, sp: M.HEAVY }); PUC.write($('#stF'), t, tm(cfg.stmt.tf), 0.9); }
    // X
    const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
    if (xOn) { M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
      trap(t, { tin: tX1, tWrong: tm(cfg.trap.tWrong), tStrike: tm(cfg.trap.tStrike), tRight: tm(cfg.trap.tRight) });
      M.vis($('#tS'), t, tm(cfg.trap.tSvg), 1e9, { dy: 0, fade: 0.2 }); run(tr, t);
      where(t, { tin: T0('E1'), tLight: [], tType: tm(cfg.where.at) }); }
    const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
    if (qOn) { M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 }); mcq(t, { tin: tQ, tOpts: tm(cfg.mcqAt), tCount, tAns });
      M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 }); so(t, tAns + 0.1, cfg.sol.map(x => tm(x[1]))); }
    const fOn = t >= tF; M.hide($('#sF'), !fOn);
    if (fOn) { fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: cfg.recap.lines.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
      M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 }); ['Y2', 'Y3', 'Y4'].forEach((id, i) => M.vis($('#yr' + i), t, T0(id) - 0.1, 1e9, { dx: -24, dy: 0 })); nx(t, tN - 0.05); }
    caps(t);
  });
  SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
  PUC.mcqSfx(tCount, tAns);
  M.outro({});
};

// zoom ladder scene (Ep 34 pattern): three rungs inside one diagram card, info card on the right
EP.zoom = z => ({ id: 'Z', from: z.from || 'Z1', to: z.to, build: root => {
  const zch = div(root, '', { position: 'absolute', left: '160px', top: '248px', display: 'flex', alignItems: 'center', gap: '12px' }); zch.id = 'zch';
  zch.innerHTML = z.names.map((n, i) => `<span class="zc">${n}</span>${i < z.names.length - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
  const zc = [...zch.querySelectorAll('.zc')];
  const zd = div(root, 'card', { left: '160px', top: '324px', width: '1056px', height: '526px', overflow: 'hidden' }), zi = div(root, 'card', { left: '1248px', top: '324px', width: '512px', height: '526px' });
  const zs = svgIn(zd, 1056, 526), tr = div(zd, '', { position: 'absolute', right: '28px', top: '22px', display: 'flex', gap: '10px', alignItems: 'center' });
  tr.innerHTML = `${z.ghost ? `<div class="ghost" style="position:relative">${z.ghost}</div>` : ''}<div class="tag" style="position:relative"><span>x1</span></div>`;
  const tag = tr.querySelector('.tag'), tagN = tag.querySelector('span'), gh = tr.querySelector('.ghost');
  const lv = z.info.map(([r, n, d, h]) => div(zi, 'lvI', {}, `<div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${z.nfs || 52}px">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div>`));
  const av = z.av ? PUC.avatar(root, { x: 1248 + 28, y: 324 + 526 - 112, who: z.av.who, face: IMG + z.av.who.toLowerCase() + '-face.jpg', text: z.av.text }) : null;
  const G = z.rungs.map(r => { const g = mk(zs, 'g', {}); const o = r.build(g) || {}; let F = null; if (r.focus) F = mk(g, 'circle', { cx: r.focus[0], cy: r.focus[1], r: r.focus[2] || 60, fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }); return { g, o, F, r }; });
  const t0 = tm(z.from || 'Z1'), out = OUT(z.to);
  return { anim: t => {
    const tZ = z.rungs.map((r, k) => k ? tm(r.at) : t0 + 0.2);
    M.vis(zch, t, t0, out, { dy: 12, outDur: 0.3, ody: -16 }); M.vis(zd, t, t0 + 0.05, out, { dx: -60, dy: 0, outDur: 0.3 }); M.vis(zi, t, t0 + 0.2, out, { dx: 60, dy: 0, outDur: 0.3 });
    let cur = 0; for (let k = 1; k < tZ.length; k++) if (t >= tZ[k] + 0.3) cur = k;
    zc.forEach((e, i) => lite(e, i < cur, i === cur)); M.setT(tagN, z.scales[cur]); M.vis(tag, t, t0 + 0.6, 1e9, POP); if (gh) M.vis(gh, t, t0 + 0.8, 1e9, { dy: 8 });
    G.forEach(({ g, o, F, r }, k) => { const last = k === G.length - 1;
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = !last ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = r.focus || [528, 263], sc = (k === 0 ? 1 : 0.35 + 0.65 * e) * (1 + 2.4 * x), cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = Math.min(e, 1 - x).toFixed(3); run(o, t); if (F && !last) M.draw(F, t, tZ[k + 1] - 0.7, 0.5); });
    lv.forEach((e, i) => { const tin = i ? tZ[i] + 0.3 : t0 + 0.4, tout = i < lv.length - 1 ? tZ[i + 1] + 0.1 : 1e9; M.vis(e, t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    if (av) av(t, tm(z.av.tin), tm(z.av.tout));
  } }; } });

// hook scene: left picture card (with face + pill), right card with two questions, two answers and topic chips
EP.hook = h => ({ id: 'H', from: 'MORPH', to: 'B1', cards: [
  { pos: 'L', label: h.label, face: h.face, faceAt: 'H3', pill: h.pill, build: h.build },
  { pos: 'R', label: h.rlabel, svg: false, tin: ['H3', null, -0.1], build: el => {
    const q = h.q.map(([s], i) => div(el, 'qr', { top: 84 + i * 104 + 'px' }, `<div class="n">${i + 1}</div><div class="q">${s}</div>`));
    const a = h.a.map(([b, s], i) => div(el, 'ans', { left: '36px', top: 300 + i * 62 + 'px' }, `<b>${b}</b>${s}`));
    const cs = div(el, '', { position: 'absolute', left: '36px', top: '450px', width: '712px', display: 'flex', flexWrap: 'wrap', gap: '10px' });
    const ch = h.chips.map(([s]) => { const e = div(cs, 'chp', { position: 'relative' }); e.textContent = s; return e; });
    return { els: [...q.map((e, i) => [e, [h.q[i][1][0], h.q[i][1][1], -0.2], { dx: -16, dy: 0 }]), ...a.map((e, i) => [e, [h.a[i][2][0], h.a[i][2][1], -0.1]]), ...ch.map((e, i) => [e, [h.chips[i][1][0], h.chips[i][1][1], -0.1]])] }; } }] });

// worked example: three columns, each a small diagram + verdict
EP.cols = (el, cols) => { const out = { els: [] };
  cols.forEach(([h, n, c, build, tH, tN, tC], i) => { const col = div(el, 'colW', { left: 36 + i * 516 + 'px' }, `<div class="ch2">${h}</div><div class="dz"></div><div class="it"><div class="inm">${n}</div><div class="inc">${c}</div></div>`);
    const s = svgIn(col.querySelector('.dz'), 496, 290); const r = build ? build(s) || {} : {};
    out.els.push([col, ['W1', null, 0.3 + i * 0.06], { dy: 12 }], [s, tH, { ...POP, sc: 0.6 }], [col.querySelector('.it'), tN, { dy: -16, sp: M.SOFT, fade: 0.1 }], [col.querySelector('.inc'), tC, { dy: 6 }]);
    if (r.anim || r.labs || r.els) { const pa = out.anim; out.anim = t => { pa && pa(t); ['labs', 'els'].forEach(k => (r[k] || []).forEach(x => k === 'labs' ? labT(x[0], t, tm(x[1])) : M.vis(x[0], t, tm(x[1]), 1e9, x[2] || POP))); r.anim && r.anim(t); }; } });
  return out; };
// think card spanning the stage
EP.think = (th, at) => ({ pos: [160, 270, 1600, 580], svg: false, tin: [at.tin, null, 0.05], build: el => { const f = PUC.think(el, th); return { anim: t => f(t, { tin: tm(at.tin), tOpts: tm(at.opts), tCount: T1(at.tin) + 0.05, dur: 3, tAns: T0(nextId(at.tin)) - 0.02, tWhy: tm(at.why) }) }; } });
})();
