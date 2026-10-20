/* PUC world components ("Lab Notebook"). Load after engine/core.js and katex/katex.min.js, before scene.js.
   Everything is a pure function of t (no timers, no Math.random). Builders create DOM once and return run(t, ...) animators.
   Shared by all five PUC subjects - only the accent (PUC.init) and the subject's own scene content change. */
(function () {
const P = window.PUC = {};
const $ = s => document.querySelector(s);
P.AC = { physics: '#2F6FEB', chemistry: '#0FA3A3', maths: '#E4572E', biology: '#3E9B5F', electronics: '#E8A317' };
P.STYLE = { physics: 'MOTION NOTEBOOK', chemistry: 'MOLECULE BENCH', maths: 'PROOF BOARD', biology: 'LIVING DIAGRAM', electronics: 'BREADBOARD' };
P.C = { ink: '#16213E', ink2: '#3A4560', mute: '#6B7280', dim: '#B8BCC6', line: '#D9DCE3', soft: '#EEF0F4', paper: '#F7F5EF', grid: '#E9E5DA', card: '#FFFFFF',
  red: '#D64545', redBg: '#FBE6E6', ok: '#2E9E5B', okBg: '#E2F3E9',
  // fixed symbol colours for colour-coding (use the same colour in the diagram and in the formula)
  violet: '#7A4FE0', orange: '#D9731A', teal: '#0E8F8F', gold: '#B7791F' };
P.init = (o = {}) => {
  const ac = o.accent || P.AC[o.subject] || P.AC.physics;
  P.C.ac = ac; P.C.ac2 = M.mix(ac, '#FFFFFF', 0.84); P.C.ac3 = M.mix(ac, '#FFFFFF', 0.93);
  const r = document.documentElement.style; r.setProperty('--ac', ac); r.setProperty('--ac2', P.C.ac2);
  return P.C;
};
/* KaTeX: inline by default. Colour-code with \textcolor{#hex}{...}. Units upright: \,\text{m/s}. */
P.K = (tex, display) => katex.renderToString(tex, { displayMode: !!display, throwOnError: false, output: 'html', strict: false, trust: false });
const snap = (el, k, v) => { if (el.style[k] !== v) el.style[k] = v; };
P.snap = snap;
P.setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s + w; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
P.attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };

/* write-on: left-to-right reveal like a pen writing a line (formulas, labels). */
P.write = (el, t, t0, dur = 0.6, tout = 1e9, outDur = 0.25) => {
  const u = M.io((t - t0) / dur), q = M.io((t - tout) / outDur);
  if (u <= 0 || q >= 1) { M.hide(el, true); return 0; }
  M.hide(el, false);
  snap(el, 'clipPath', u >= 1 ? 'none' : `inset(-30% ${((1 - u) * 100).toFixed(2)}% -30% -4%)`);
  snap(el, 'opacity', q > 0 ? (1 - q).toFixed(3) : '');
  return u;
};

/* title card -> header travel (same choreography as the MBA reference episodes).
   Needs #title, #nchip, #subj, #sub, #rule/#ruleL. */
P.header = (o) => {
  let g = null;
  const measure = () => {
    const ti = $('#title'); ti.style.fontSize = '120px';
    let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
    const w = ti.offsetWidth, h = ti.offsetHeight, nc = $('#nchip');
    g = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: nc.offsetWidth, cy: 540 - h / 2 - 112 };
    // keep the header title clear of the subject pill
    const sj = $('#subj'); sj.style.left = (1760 - sj.offsetWidth) + 'px'; sj.style.top = '96px';
    if (160 + w * g.es > 1760 - sj.offsetWidth - 32) g.es = (1760 - sj.offsetWidth - 32 - 160) / w;
  };
  return t => {
    if (!g) measure();
    const m = M.spring(t - o.tMorph, M.HEAVY), ti = $('#title');
    ti.style.transform = `translate(${M.lerp(g.sx, g.ex, m).toFixed(2)}px,${M.lerp(g.sy, g.ey, m).toFixed(2)}px) scale(${M.lerp(1, g.es, m).toFixed(4)})`;
    M.rise(ti, t, o.tTitle ?? 0.25, { st: 0.07, sp: M.HEAVY, out: o.tOut, outDur: 0.01 });
    const nc = $('#nchip');
    nc.style.left = M.lerp(960 - g.cw / 2, 160, m).toFixed(2) + 'px'; nc.style.top = M.lerp(g.cy, 96, m).toFixed(2) + 'px';
    M.vis(nc, t, 0.1, o.tOut, { dy: 18, outDur: 0.01 });
    M.vis($('#subj'), t, o.tMorph + 0.5, o.tOut, { dy: 0, dx: 24, outDur: 0.01 });
    M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
    M.vis($('#rule'), t, 0.9, o.tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
    M.rise($('#sub'), t, 1.15, { st: 0.04, out: o.tMorph - 0.1, outDur: 0.3 });
    return m;
  };
};

/* notebook page turn: windows [[tIn, tOut], ...]; the page covers from tIn-0.42 to tIn, uncovers at tOut. Returns x or null. */
P.sweep = (W) => t => {
  for (const [a, b] of W) { const a1 = M.io((t - a + 0.42) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1960 * (1 - a1) - 1980 * a2; }
  return null;
};
P.sweepRun = (W) => { const f = P.sweep(W), sw = $('#sweep'); return t => { const x = f(t); M.hide(sw, x === null); if (x !== null) snap(sw, 'transform', `translateX(${x.toFixed(1)}px)`); return x; }; };

/* cast reaction: small face avatar + bubble. face = '../../assets/illustrations/puc/aarav-face.jpg' */
P.avatar = (host, o) => {
  const d = document.createElement('div'); d.className = 'av'; d.style.left = o.x + 'px'; d.style.top = o.y + 'px';
  d.innerHTML = `<div class="f" style="background-image:url(${o.face})"></div><div class="b"><b>${o.who}:</b> ${o.text}</div>`;
  host.appendChild(d);
  return (t, tin, tout = 1e9) => { const f = d.querySelector('.f'), b = d.querySelector('.b');
    const on = M.vis(d, t, tin, tout, { dy: 0, fade: 0.08, outDur: 0.25, ody: 0 });
    if (on) { M.vis(f, t, tin, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis(b, t, tin + 0.12, 1e9, { dx: -16, dy: 0, sp: M.SOFT, fade: 0.12 }); } };
};

/* graph on an svg: axes, ticks, labels. Returns X(), Y(), plot path, dot, and draw(fn, tEnd) helpers. */
P.graph = (svg, o) => {
  const { x, y, w, h, xmax, ymin = 0, ymax } = o, ns = 'http://www.w3.org/2000/svg';
  const X = v => x + w * v / xmax, Y = v => y + h - h * (v - ymin) / (ymax - ymin);
  const mk = (tag, a) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); svg.appendChild(e); return e; };
  const g = { X, Y, mk };
  g.axes = mk('path', { d: `M${x},${y} V${y + h} H${x + w}`, fill: 'none', stroke: P.C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
  if (ymin < 0) g.zero = mk('line', { x1: x, y1: Y(0), x2: x + w, y2: Y(0), stroke: P.C.ink, 'stroke-width': 1.5, opacity: 0.35 });
  g.ticks = (o.xt || []).map(v => { mk('line', { x1: X(v), y1: y + h, x2: X(v), y2: y + h + 8, stroke: P.C.ink, 'stroke-width': 2 }); const tx = mk('text', { x: X(v), y: y + h + 32, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: P.C.mute }); tx.textContent = v; return tx; });
  (o.yt || []).forEach(v => { mk('line', { x1: x - 8, y1: Y(v), x2: x, y2: Y(v), stroke: P.C.ink, 'stroke-width': 2 }); const tx = mk('text', { x: x - 14, y: Y(v) + 6, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: P.C.mute }); tx.textContent = v; });
  if (o.xl) { const tx = mk('text', { x: x + w, y: y + h + 32, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: P.C.mute }); tx.textContent = o.xl; g.xlab = tx; }
  if (o.yl) { const tx = mk('text', { x: x + 12, y: y + 6, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: P.C.mute }); tx.textContent = o.yl; g.ylab = tx; }
  // a curve that draws live up to time-parameter s (0..sEnd) of fn(s) -> [xv, yv]
  g.curve = (col, sw = 5) => { const p = mk('path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); return (fn, s0, s1, n = 60) => { if (s1 <= s0) { P.attr(p, 'd', ''); return; } let d = ''; for (let i = 0; i <= n; i++) { const s = s0 + (s1 - s0) * i / n, [a, b] = fn(s); d += (i ? 'L' : 'M') + X(a).toFixed(1) + ',' + Y(b).toFixed(1); } P.attr(p, 'd', d); }; };
  g.dot = (col, r = 11) => { const c = mk('circle', { r, fill: col, cx: -99, cy: -99 }); return (a, b, on = true) => { P.attr(c, 'cx', X(a).toFixed(1)); P.attr(c, 'cy', Y(b).toFixed(1)); M.hide(c, !on); }; };
  return g;
};

/* vector arrow (line + head drawn as one path, any colour). set(x1,y1,x2,y2) ; length 0 hides it. */
P.arrow = (svg, col, sw = 6, head = 16) => {
  const ns = 'http://www.w3.org/2000/svg', gEl = document.createElementNS(ns, 'g'), ln = document.createElementNS(ns, 'path'), hd = document.createElementNS(ns, 'path');
  ln.setAttribute('stroke', col); ln.setAttribute('stroke-width', sw); ln.setAttribute('stroke-linecap', 'round'); ln.setAttribute('fill', 'none');
  hd.setAttribute('fill', col); gEl.appendChild(ln); gEl.appendChild(hd); svg.appendChild(gEl);
  const a = { g: gEl, set(x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    if (L < 2) { M.hide(gEl, true); return; } M.hide(gEl, false);
    const ux = dx / L, uy = dy / L, hl = Math.min(head, L * 0.6), bx = x2 - ux * hl, by = y2 - uy * hl, px = -uy * hl * 0.55, py = ux * hl * 0.55;
    P.attr(ln, 'd', `M${x1.toFixed(1)},${y1.toFixed(1)} L${(bx + ux * 2).toFixed(1)},${(by + uy * 2).toFixed(1)}`);
    P.attr(hd, 'd', `M${x2.toFixed(1)},${y2.toFixed(1)} L${(bx + px).toFixed(1)},${(by + py).toFixed(1)} L${(bx - px).toFixed(1)},${(by - py).toFixed(1)} Z`);
  } };
  return a;
};

/* ---------- exam segment components (identical in every subject) ---------- */
/* Exam trap: wrong line struck in red, right line ticks in. host = a .card (784 x ~300). */
P.trap = (host, o) => {
  host.insertAdjacentHTML('beforeend', `<div class="lbl" style="left:36px;top:30px;color:var(--red)">EXAM TRAP</div>
    <div class="trapL w" style="top:${o.y0 ?? 88}px"><div class="mk" style="background:var(--red)">${M.icon('x', 24, '#fff', 3)}</div><div class="tx">${o.wrong}<i class="sk"></i></div></div>
    <div class="trapL r" style="top:${o.y1 ?? 176}px"><div class="mk" style="background:var(--ok)">${M.icon('check', 24, '#fff', 3)}</div><div class="tx">${o.right}</div></div>`);
  const [w, r] = host.querySelectorAll('.trapL'), sk = host.querySelector('.sk'), lb = host.querySelector('.lbl');
  return (t, k) => {
    M.vis(lb, t, k.tin + 0.1, 1e9, { dy: 10 });
    M.vis(w, t, k.tWrong, 1e9, { dx: -16, dy: 0 });
    const s = M.io((t - k.tStrike) / 0.35); sk.style.width = s <= 0 ? '0' : `calc(${(s * 100).toFixed(1)}% + 12px)`;
    w.querySelector('.tx').style.color = M.mix('#8A1C1C', '#B98A8A', s);
    M.vis(r, t, k.tRight, 1e9, { dx: -16, dy: 0 });
    M.vis(r.querySelector('.mk'), t, k.tRight + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
  };
};
/* Where it is asked: 4 chips, only the verified ones light (o.on). o.type = one line on the type of question. */
P.WA = ['JEE MAIN', 'JEE ADVANCED', 'NEET', 'PUC BOARDS'];
P.where = (host, o) => {
  host.insertAdjacentHTML('beforeend', `<div class="lbl" style="left:36px;top:30px">WHERE IT IS ASKED</div>
    <div class="wa" style="left:36px;top:${o.y ?? 84}px">${P.WA.map(w => `<span>${w}</span>`).join('')}</div>
    ${o.type ? `<div class="lbl" style="left:36px;top:${(o.y ?? 84) + 80}px">TYPE OF QUESTION</div><div class="wat" style="position:absolute;left:36px;top:${(o.y ?? 84) + 114}px;font:500 28px/1.35 Poppins;white-space:nowrap">${o.type}</div>` : ''}`);
  const ch = [...host.querySelectorAll('.wa span')], lbs = host.querySelectorAll('.lbl'), ty = host.querySelector('.wat');
  return (t, k) => {
    M.vis(lbs[0], t, k.tin + 0.1, 1e9, { dy: 10 });
    ch.forEach((c, i) => {
      M.vis(c, t, k.tin + 0.2 + i * 0.06, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
      const j = o.on.indexOf(P.WA[i]); const on = j < 0 ? 0 : M.io((t - (k.tLight[j] ?? k.tLight[0])) / 0.25);
      c.style.background = M.mix('#FFFFFF', P.C.ac, on); c.style.borderColor = M.mix('#CBD0DA', P.C.ac, on); c.style.color = M.mix('#9AA0AC', '#FFFFFF', on);
    });
    if (ty) { M.vis(lbs[1], t, k.tType - 0.05, 1e9, { dy: 10 }); M.rise(ty, t, k.tType, { st: 0.035 }); }
  };
};
/* MCQ with a 5-second countdown ring (accent) then the correct option lights.
   host = .card. o: pat, q (html, may hold KaTeX), opts[4] (html), right (0-3), qW (question width), optW, optY */
P.mcq = (host, o) => {
  // cols: 2 (2 x 2 grid, default) or 1 (one option per row, for long options); optH: option height
  const ow = o.optW ?? 440, oy = o.optY ?? 290, ox = 36, cols = o.cols ?? 2, oh = o.optH ?? 84, ofs = o.optFs ?? 32;
  host.insertAdjacentHTML('beforeend', `<div class="pat" style="left:36px;top:30px">${o.pat}</div><div class="lbl" style="right:36px;top:40px">PAUSE AND SOLVE</div>
    <div class="mq" style="left:36px;top:96px;width:${o.qW ?? 760}px">${o.q}</div>
    ${o.opts.map((t, i) => `<div class="opt" style="left:${ox + (i % cols) * (ow + 20)}px;top:${oy + Math.floor(i / cols) * (oh + 20)}px;width:${ow}px;height:${oh}px"><div class="bg"></div><div class="L" style="top:${(oh - 50) / 2}px">${'ABCD'[i]}</div><div class="ot" style="height:${oh}px;font-size:${ofs}px">${t}</div>${i === o.right ? `<div class="okm" style="top:${(oh - 50) / 2}px">${M.icon('check', 28, '#fff', 3)}</div>` : ''}</div>`).join('')}
    <div class="ringW" style="right:36px;top:90px"><svg width="150" height="150"><circle cx="75" cy="75" r="62" fill="#fff" stroke="#E6E8EE" stroke-width="12"/><circle class="ra" cx="75" cy="75" r="62" fill="none" stroke="${P.C.ac}" stroke-width="12" stroke-linecap="round" transform="rotate(-90 75 75)"/></svg><div class="rn"></div></div>`);
  const pat = host.querySelector('.pat'), pl = host.querySelector('.lbl'), q = host.querySelector('.mq'), ops = [...host.querySelectorAll('.opt')], rw = host.querySelector('.ringW'), ra = host.querySelector('.ra'), rn = host.querySelector('.rn');
  return (t, k) => {
    M.vis(pat, t, k.tin + 0.1, 1e9, { dy: 10 }); M.vis(pl, t, k.tin + 0.2, 1e9, { dy: 10 });
    M.vis(q, t, k.tin + 0.25, 1e9, { dy: 16 });
    ops.forEach((el, i) => {
      M.vis(el, t, k.tOpts + i * 0.12, 1e9, { dy: 24 });
      const right = i === o.right, r = M.io((t - k.tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix('#FFFFFF', P.C.okBg, r) : M.mix('#FFFFFF', '#F4F5F7', r);
      bg.style.borderColor = right ? M.mix(P.C.line, P.C.ok, r) : P.C.line;
      el.querySelector('.ot').style.color = right ? P.C.ink : M.mix(P.C.ink, P.C.dim, r);
      el.querySelector('.L').style.background = right ? M.mix(P.C.ink, P.C.ok, r) : M.mix(P.C.ink, P.C.dim, r);
      const ok = el.querySelector('.okm'); if (ok) M.vis(ok, t, k.tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    // 5-second ring: tCount .. tCount + 5, then it leaves on the answer
    const u = M.clamp((t - k.tCount) / 5);
    M.vis(rw, t, k.tCount - 0.2, k.tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU(ra, 1 - u); M.hide(ra, t < k.tCount - 0.2 || t > k.tAns + 0.3);
    M.setT(rn, String(Math.max(1, 5 - Math.floor(u * 5 - 1e-6))));
  };
};
/* sound for the MCQ: 3 ticks on the last three seconds of the ring, correct chime on the answer */
P.mcqSfx = (tCount, tAns) => { [2, 3, 4].forEach(s => M.sfx(tCount + s, 'tick', 0.28)); M.sfx(tAns + 0.05, 'correct', 0.32); };
/* animated step-by-step solution: steps = [[html, why?], ...] stacked with dy spacing */
P.solution = (host, steps, o = {}) => {
  const y0 = o.y0 ?? 96, dy = o.dy ?? 84;
  host.insertAdjacentHTML('beforeend', `<div class="lbl" style="left:36px;top:30px;color:var(--ok)">${o.label || 'SOLUTION'}</div>` +
    steps.map(([s, why], i) => `<div class="sol" style="top:${y0 + i * dy}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${why ? `<div class="why" style="font:500 22px Poppins;color:var(--mute)">${why}</div>` : ''}</div>`).join(''));
  const lb = host.querySelector('.lbl'), rows = [...host.querySelectorAll('.sol')];
  return (t, tin, ts) => { M.vis(lb, t, tin + 0.1, 1e9, { dy: 10 }); rows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, ts[i] - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); P.write(r.querySelector('.sx'), t, ts[i], 0.55); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.45, 1e9, { dx: -10, dy: 0 }); }); };
};
/* pinned formula card with a "SCREENSHOT THIS" chip. lines = html (KaTeX). */
P.fcard = (host, o) => {
  const d = document.createElement('div'); d.className = 'fcard';
  d.style.cssText = `left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px`;
  d.innerHTML = `<div class="pin"></div><div class="shot">SCREENSHOT THIS</div><div class="lbl" style="left:44px;top:40px">${o.title}</div>` +
    o.lines.map((l, i) => `<div class="fl${o.txt && o.txt[i] ? ' txt' : ''}" style="top:${(o.y0 ?? 100) + i * (o.dy ?? 96)}px">${l}</div>`).join('');
  host.appendChild(d);
  const rot = o.rot ?? -1.2, ls = [...d.querySelectorAll('.fl')];
  return (t, k) => {
    const on = M.vis(d, t, k.tin, k.tout ?? 1e9, { dy: -30, sp: M.SOFT, outDur: 0.3, ody: -16 });
    if (on) { const r = rot * M.spring(t - k.tin - 0.05, M.SOFT), tr = d.style.transform; d.style.transform = (tr && tr !== 'none' ? tr + ' ' : '') + `rotate(${r.toFixed(3)}deg)`; }
    M.vis(d.querySelector('.pin'), t, k.tin + 0.25, 1e9, { dy: -20, sp: M.POP, fade: 0.08 });
    M.vis(d.querySelector('.lbl'), t, k.tin + 0.3, 1e9, { dy: 8 });
    ls.forEach((l, i) => P.write(l, t, k.tLines[i] ?? k.tin + 0.5 + i * 0.5, 0.6));
    M.vis(d.querySelector('.shot'), t, k.tShot, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
  };
};
/* NEXT strip */
P.next = (host, o) => {
  const d = document.createElement('div'); d.className = 'next'; d.style.top = (o.y ?? 764) + 'px';
  d.innerHTML = `<span class="nc">${o.label || 'NEXT'}</span><span class="nt">${o.topic}</span><span>${M.icon('arrowR', 40, P.C.ac2, 2.4)}</span>`;
  host.appendChild(d);
  return (t, tin, tout) => M.vis(d, t, tin, tout ?? 1e9, { dy: 40 });
};
})();
