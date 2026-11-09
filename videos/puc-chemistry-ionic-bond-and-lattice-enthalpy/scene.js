// PUC Chemistry Ep 39: Ionic Bond and Lattice Enthalpy (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: element in play teal, partner ink, the moving electron orange, NCERT values gold, lone pairs violet, wrong/charge red
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', XC = C.red, VC = '#7A4FE0', OKC = C.ok;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const ptxt = (p, x, y, s, fs, fill = C.ink, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill, 'text-anchor': 'middle' }, a));
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`, E_ = s => `\\textcolor{${EC}}{${s}}`, V_ = s => `\\textcolor{${VC}}{${s}}`, R_ = s => `\\textcolor{${XC}}{${s}}`;
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const setL = (l, x1, y1, x2, y2, u = 1) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; attr(l, 'x1', (mx + (x1 - mx) * u).toFixed(1)); attr(l, 'y1', (my + (y1 - my) * u).toFixed(1)); attr(l, 'x2', (mx + (x2 - mx) * u).toFixed(1)); attr(l, 'y2', (my + (y2 - my) * u).toFixed(1)); M.hide(l, u <= 0.01); };
const chip = (host, x, y, s, bg, fg = '#fff') => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = `left:${x}px;top:${y}px;background:${bg};color:${fg}`; d.innerHTML = s; host.appendChild(d); return d; };
const dot = (p, x, y, fill = HC, r = 6) => mk(p, 'circle', { cx: x, cy: y, r, fill });
const mv = (c, x, y) => { attr(c, 'cx', x.toFixed(1)); attr(c, 'cy', y.toFixed(1)); };
const lerp2 = (a, b, u) => [M.lerp(a[0], b[0], u), M.lerp(a[1], b[1], u)];
// Lewis dot slots: side order top, right, bottom, left (or custom), one per side first, then pairs
const SIDE = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const lewisPos = (n, x, y, r = 40, ord = [0, 1, 2, 3]) => { const out = []; ord.forEach((s, i) => { const c = n <= 4 ? (i < n ? 1 : 0) : (i < n - 4 ? 2 : 1), [dx, dy] = SIDE[s]; for (let k = 0; k < c; k++) { const o = c === 2 ? (k ? 11 : -11) : 0; out.push([x + dx * r + (dy ? o : 0), y + dy * r + (dx ? o : 0)]); } }); return out; };
// pair of dots on a side of an atom at (x, y)
const pairAt = (x, y, s, r = 40) => { const [dx, dy] = SIDE[s]; return [[x + dx * r + (dy ? -11 : 0), y + dy * r + (dx ? -11 : 0)], [x + dx * r + (dy ? 11 : 0), y + dy * r + (dx ? 11 : 0)]]; };
// Bohr-style shell atom
const shellAtom = (svg, x, y, sym, sh, o = {}) => {
  const g = mk(svg, 'g', {}), R0 = o.r0 ?? 30, dR = o.dr ?? 24;
  const rings = sh.map((n, i) => mk(g, 'circle', { cx: x, cy: y, r: R0 + dR * (i + 1), fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
  const nuc = atomG(g, o.nr ?? 26, o.fill ?? NC, sym, o.fs ?? 22); attr(nuc, 'transform', `translate(${x} ${y})`);
  const es = []; sh.forEach((n, i) => { const R = R0 + dR * (i + 1); for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / n + (o.rot ?? 0); es.push({ c: dot(g, x + R * Math.cos(a), y + R * Math.sin(a), HC, 5.5), i, a, R, p: [x + R * Math.cos(a), y + R * Math.sin(a)] }); } });
  return { g, rings, nuc, es, x, y, Rout: R0 + dR * sh.length };
};
Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  cube: ['M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  balloon: ['M12 16v6', 'M12 2a6 6 0 0 0-6 6c0 4 6 8 6 8s6-4 6-8a6 6 0 0 0-6-6z'],
  pencil: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  brush: ['M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08', 'M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z'],
  cup: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  pie: ['M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z', 'M21.21 15.89A10 10 0 1 1 8 2.83'],
  receipt: ['M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', 'M16 8h-6', 'M16 12h-6'],
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  handshake: ['m11 17 2 2a1 1 0 1 0 3-3', 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4', 'm21 3 1 11h-2', 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3', 'M3 4h8'],
  gift: ['M20 12v10H4V12', 'M2 7h20v5H2z', 'M12 22V7', 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z', 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'],
});

/* ---------- timeline ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5'), tP1 = T0('P1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const O = { outDur: 0.3, ody: -16 };
const SEC = [], MEAS = [];
const sec = (id, a, b, fn) => SEC.push(t => { const on = t >= a && t < b; M.hide($('#' + id), !on); if (on) fn(t); });
// next section start after a line id (by script order)
const nextId = id => { const o = M.CUES.order, i = o.indexOf(id); return o[i + 1]; };

/* ---------- hook: title card stories + cast scene ---------- */
const hookSec = h => {
  $('#jobs').innerHTML = h.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
  const tJob = h.jobs.map(j => wt('H1', j[3]));
  $('#jrs').innerHTML = h.jobs.map(([ic, n, w, , el, ew], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ew}</span><div class="el" style="background:${h.elc ? h.elc[i] : NC}">${el}</div></div></div>`).join('');
  $('#wqs').innerHTML = h.kit.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
  MEAS.push(() => { let x = 36; h.kit.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); });
  SEC.push(t => h.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 })));
  sec('sH', tMorph, tP1 + 0.1, t => {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...O });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    h.jobs.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, h.tEw[i] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, h.tPill - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...O });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    h.kit.forEach((k, i) => M.vis($('#wq' + i), t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, h.tTease - 0.15, 1e9, POP);
  });
};

/* ---------- side by side + pause and think ---------- */
const cmpSec = c => {
  [['#cmL', c.L], ['#cmR', c.R]].forEach(([id, s]) => { const el = $(id); el.classList.add('cmp'); el.insertAdjacentHTML('beforeend', `<div class="lbl" style="left:36px;top:30px">${s.lab}</div><div class="ci">${M.icon(s.ic, 32, s.col, 2.2)}</div><div class="ct" style="color:${s.col}">${s.title}</div><div class="cx">${s.ex}</div><div class="cn">${s.note}</div>`); });
  const th = PUC.think($('#th1'), c.think);
  const tB1 = T0('B1'), tB2 = T0('B2'), end = T0(nextId('B3'));
  sec('sB', tB1 - 0.1, end + 0.1, t => {
    [['#cmL', c.L, -60], ['#cmR', c.R, 60]].forEach(([id, s, dx], j) => { const el = $(id); M.vis(el, t, wt('B1', s.w) - 0.15, OUT('B2'), { dx, dy: 0, ...O });
      M.vis(el.querySelector('.ct'), t, wt('B1', s.w) + 0.05, 1e9, { dy: 12 }); M.vis(el.querySelector('.cx'), t, wt('B1', s.w) + 0.25, 1e9, { dy: 16 }); M.vis(el.querySelector('.cn'), t, wt('B1', s.w) + 0.5, 1e9, { dy: 10 }); });
    M.vis($('#th1'), t, tB2 + 0.05, end - 0.32, { dy: 36, ...O });
    th(t, { tin: tB2, tOpts: c.tOpts, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: c.tWhy });
  });
};

/* ---------- statement ---------- */
const stmtSec = (tex, w1, w2, w3) => {
  $('#stF').innerHTML = tex;
  SEC.push(t => {
    const stOn = t >= tT && t < tW1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
    if (!stOn) return;
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', w1) - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', w2) - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', w3) + 0.1, 0.8);
  });
};

/* ---------- worked example / derivation card: question + numbered steps ---------- */
const stepCard = (host, label, q, lines, y0, dy) => { if (q) host.insertAdjacentHTML('beforeend', `<div id="${host.id}q" style="position:absolute;left:36px;top:70px;font:600 27px/1.35 Poppins;width:712px">${q}</div>`); const f = PUC.solution(host, lines, { label, y0, dy }); MEAS.push(() => host.querySelectorAll('.sol .sx').forEach(s => { if (s.offsetWidth > 650) s.style.fontSize = (parseFloat(getComputedStyle(s).fontSize) * 650 / s.offsetWidth).toFixed(1) + 'px'; })); return f; };

/* ---------- exam segment + ending (identical layout in every episode) ---------- */
const endSec = e => {
  const trap = PUC.trap($('#trap'), { wrong: e.trap.wrong, right: e.trap.right });
  $('#trap').insertAdjacentHTML('beforeend', `<div style="position:absolute;right:36px;top:84px;width:380px;display:flex;flex-direction:column;gap:14px">
  <div id="tm0" style="height:72px;border-radius:12px;background:var(--redBg);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 16px 'IBM Plex Mono';letter-spacing:.06em;color:var(--red)">${e.trap.tm[0][0]}<b style="font:600 24px 'IBM Plex Mono'">${e.trap.tm[0][1]}</b></div>
  <div id="tm1" style="height:72px;border-radius:12px;background:var(--okBg);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 16px 'IBM Plex Mono';letter-spacing:.06em;color:#1F6B3F">${e.trap.tm[1][0]}<b style="font:600 24px 'IBM Plex Mono'">${e.trap.tm[1][1]}</b></div></div>`);
  const where = PUC.where($('#wa'), { on: [], type: e.where });
  const mcq = PUC.mcq($('#mq'), Object.assign({ pat: 'JEE / NEET PATTERN · ORIGINAL QUESTION', qW: 760, cols: 1, optW: 780, optY: 196, optH: 84, optFs: 28 }, e.mcq));
  const so = PUC.solution($('#so'), e.sol, { y0: 100, dy: 112 });
  MEAS.push(() => $('#so').querySelectorAll('.sol .sx').forEach(s => { if (s.offsetWidth > 420) s.style.fontSize = (parseFloat(getComputedStyle(s).fontSize) * 420 / s.offsetWidth).toFixed(1) + 'px'; }));
  const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: e.fc.title, y0: 96, dy: 74, txt: e.fc.txt, lines: e.fc.lines });
  MEAS.push(() => $('#sF .fcard').querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = (parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth).toFixed(1) + 'px'; }));
  $('#yrs').innerHTML = e.yq.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
  MEAS.push(() => document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; }));
  MEAS.push(() => { const n = $('#sF .next .nt'); if (n && n.scrollWidth > n.clientWidth) n.style.fontSize = (parseFloat(getComputedStyle(n).fontSize) * n.clientWidth / n.scrollWidth).toFixed(1) + 'px'; });
  const nx = PUC.next($('#sF'), { label: e.next[0], topic: e.next[1], y: 764 });
  sec('sX', tX1 - 0.1, tQ + 0.05, t => {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: T0('X2') - 0.1, tStrike: T0('X3') - 0.1, tRight: e.trap.tRight });
    M.vis($('#tm0'), t, e.trap.tTm[0] - 0.1, 1e9, { dx: 20, dy: 0 }); M.vis($('#tm1'), t, e.trap.tTm[1] - 0.1, 1e9, { dx: 20, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Expect') });
  });
  sec('sQ', tQ, tF, t => {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: e.tOpts, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, e.tSo);
  });
  const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
  sec('sF', tF, 1e9, t => {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [0, 1, 2, 3, 4].map(i => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  });
};

/* ---------- run ---------- */
const run = () => {
  const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
  const sweep = PUC.sweepRun(SW);
  const caps = M.captions($('#cap'), M.CUES.order);
  const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
  let geo = false;
  M.on(t => {
    if (!geo) { geo = true; MEAS.forEach(f => f()); document.querySelectorAll('.btag').forEach(q => { if (q.offsetWidth > 712) q.style.fontSize = Math.floor(18 * 700 / q.offsetWidth) + 'px'; }); }
    camF(t); head(t); sweep(t);
    $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
    SEC.forEach(f => f(t));
    caps(t);
  });
  SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
  PUC.mcqSfx(tCount, tAns);
  M.outro({});
};

/* ---------- hook ---------- */
hookSec({
  jobs: [['cube', 'Salt', 'KITCHEN', 'salt', 'NaCl', 'IONIC'], ['pencil', 'Chalk', 'CLASSROOM', 'chalk', 'CaCO₃', 'IONIC'], ['brush', 'Lime', 'WHITEWASH', 'Lime', 'CaO', 'IONIC']],
  tEw: [0, 1, 2].map(i => wt('H2', 'ionic') + i * 0.15), tPill: wt('H2', 'Hard'),
  kit: [['flame', 'Dry pan', wt('H3', 'heats')], ['help', 'Why so strong?', wt('H4', 'Something')], ['bulb', 'Melts at 801 °C', wt('H4', 'eight')]], tTease: wt('H5', 'lattice'),
});
const ion = (p, x, y, r, fill, s, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); ptxt(g, 0, fs * 0.36, s, fs, '#fff'); attr(g, 'transform', `translate(${x} ${y})`); return g; };
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);

/* ---------- P: tug of war + who gives, who takes ---------- */
const ps = $('#pS');
mk(ps, 'line', { x1: 840, y1: 90, x2: 840, y2: 460, stroke: C.line, 'stroke-width': 2 });
const rope = mk(ps, 'line', { x1: 196, y1: 250, x2: 684, y2: 250, stroke: GC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const kNa = ion(ps, 150, 250, 46, NC, 'Na', 30), kCl = ion(ps, 730, 250, 46, HC, 'Cl', 30);
const kE = mk(ps, 'circle', { cx: 440, cy: 250, r: 13, fill: EC });
const kEl = txt(ps, 440, 214, 'e⁻', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600, 'font-size': 24 });
const PL = [[150, 350, 'WEAK PULL', C.mute, ['P2', 'weak']], [730, 350, 'STRONG PULL', C.ink, ['P2', 'strong']], [150, 392, 'LOW IONIZATION ENTHALPY', NC, ['P3', 'low']], [730, 392, 'LARGE NEGATIVE ΔegH', HC, ['P4', 'negative']]].map(([x, y, s, f, w]) => ({ e: txt(ps, x, y, s, { 'text-anchor': 'middle', fill: f, 'font-weight': 600, 'font-size': 19 }), t: wt(w[0], w[1]) }));
const PT = [['Li', 0, 0], ['Be', 1, 0], ['O', 2, 0], ['F', 3, 0], ['Na', 0, 1], ['Mg', 1, 1], ['S', 2, 1], ['Cl', 3, 1]];
const PX = c => 900 + c * 130 + (c > 1 ? 120 : 0), PY = r => 150 + r * 100;
$('#pT').innerHTML = PT.map(([e, c, r]) => `<div class="kt" id="p_${e}" style="left:${PX(c)}px;top:${PY(r)}px">${e}</div>`).join('') +
  `<div class="kh" id="ph0" style="left:${PX(0)}px;width:240px;top:110px">GROUPS 1, 2 · METALS</div><div class="kh" id="ph1" style="left:${PX(2)}px;width:240px;top:110px">GROUPS 16, 17 · NON METALS</div>` +
  `<div class="kh" id="ph2" style="left:${PX(0)}px;width:240px;top:360px;color:var(--ac)">GIVE e⁻</div><div class="kh" id="ph3" style="left:${PX(2)}px;width:240px;top:360px;color:var(--ink)">TAKE e⁻</div>`;
const pArr = PUC.arrow(ps, EC, 5, 16);
sec('sP', tP1 - 0.1, T0('S1') + 0.1, t => {
  M.vis($('#pw'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...O });
  [kNa, kCl, kE].forEach((g, i) => fade(g, t, wt('P2', 'tug') - 0.1 + i * 0.15)); fade(kEl, t, wt('P2', 'tug') + 0.3); M.draw(rope, t, wt('P2', 'tug'), 0.5);
  const ug = M.io((t - wt('P4', 'grabs')) / 0.9), wob = t < wt('P4', 'grabs') ? 12 * Math.sin((t - tP1) * 5) * M.clamp((t - wt('P2', 'kids')) / 0.5) : 0, ex = M.lerp(440, 668, ug) + wob;
  mv(kE, ex, 250); attr(kEl, 'x', ex.toFixed(1));
  PL.forEach(p => fade(p.e, t, p.t - 0.1));
  PT.forEach(([e, c, r]) => { const el = $('#p_' + e); M.vis(el, t, T0('P5') - 0.2 + (c + r) * 0.05, 1e9, POP); const m = c < 2 && t >= wt('P5', 'metals') - 0.1, n = c > 1 && t >= wt('P5', 'non') - 0.1; setBg(el, m ? NC : n ? HC : '#FFFFFF'); el.style.color = m || n ? '#fff' : C.ink; el.style.borderColor = m ? NC : n ? HC : C.line; });
  ['ph0', 'ph1', 'ph2', 'ph3'].forEach((id, i) => M.vis($('#' + id), t, [T0('P5'), T0('P5') + 0.1, wt('P5', 'metals'), wt('P5', 'non')][i] - 0.1, 1e9, { dy: 8 }));
  const ua = M.io((t - wt('P5', 'right') + 0.1) / 0.5); if (ua > 0) pArr.set(PX(1) + 116, 300, M.lerp(PX(1) + 116, PX(2) - 6, ua), 300); else pArr.set(0, 0, 0, 0);
  M.vis($('#pP'), t, wt('P5', 'right') + 0.3, 1e9, POP);
});

/* ---------- S: energy ledger + lattice ---------- */
const es = $('#eS'), Y0 = 280, SC = 0.25, yIE = Y0 - 495.8 * SC, yEG = yIE + 348.7 * SC, yL = yEG + 788 * SC;
const zero = mk(es, 'line', { x1: 60, y1: Y0, x2: 724, y2: Y0, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const zl = txt(es, 60, Y0 - 10, 'START: Na(g) + Cl(g)', { fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const varr = (x, y1, y2, col) => mk(es, 'path', { d: `M${x} ${y1} V${y2} M${x - 10} ${y2 + (y2 < y1 ? 14 : -14)} L${x} ${y2} L${x + 10} ${y2 + (y2 < y1 ? 14 : -14)}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const lev = (x1, x2, y) => mk(es, 'line', { x1, y1: y, x2, y2: y, stroke: C.ink, 'stroke-width': 3 });
const EL = [
  { a: varr(150, Y0, yIE, XC), l: lev(110, 330, yIE), v: txt(es, 166, (Y0 + yIE) / 2 + 8, '+495.8', { fill: GC, 'font-weight': 600, 'font-size': 24 }), n: txt(es, 110, yIE - 12, 'Na → Na⁺ + e⁻', { fill: C.ink, 'font-weight': 600, 'font-size': 17 }), t: wt('S1', 'costs') },
  { a: varr(300, yIE, yEG, OKC), l: lev(270, 500, yEG), v: txt(es, 316, (yIE + yEG) / 2 + 8, '−348.7', { fill: GC, 'font-weight': 600, 'font-size': 24 }), n: txt(es, 330, yIE - 12, 'Cl + e⁻ → Cl⁻', { fill: C.ink, 'font-weight': 600, 'font-size': 17 }), t: wt('S2', 'gives') },
  { a: varr(460, yEG, yL, OKC), l: lev(430, 700, yL), v: txt(es, 476, (yEG + yL) / 2 + 8, '−788', { fill: GC, 'font-weight': 600, 'font-size': 28 }), n: txt(es, 560, yL - 12, 'NaCl(s)', { fill: NC, 'font-weight': 700, 'font-size': 22 }), t: wt('S6', 'Seven') },
];
const net = mk(es, 'g', {}); mk(net, 'line', { x1: 540, y1: Y0, x2: 540, y2: yEG, stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '4 5' }); txt(net, 556, (Y0 + yEG) / 2 + 7, 'STILL SHORT: +147.1', { fill: XC, 'font-weight': 600, 'font-size': 18 });
const ec = [chip($('#el'), 36, 520, 'LATTICE PAYS THE COST · NaCl IS STABLE', OKC)];
const ls = $('#lS'), LG = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const na = (r + c) % 2 === 0, x = 192 + c * 100, y = 150 + r * 92, k = r * 5 + c; const sx = 392 + Math.cos(k * 2.4) * 330, sy = 300 + Math.sin(k * 1.7) * 210; LG.push({ g: na ? ion(ls, sx, sy, 22, NC, '+', 26) : ion(ls, sx, sy, 32, HC, '−', 30), x, y, sx, sy, k }); }
const lCnt = txt(ls, 392, 540, '', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 28 });
const lc = [chip($('#lt'), 380, 22, 'ONE LAYER OF A 3D LATTICE', C.ink)];
sec('sS', T0('S1') - 0.1, T0('B1') + 0.1, t => {
  const z = OUT('B1');
  M.vis($('#el'), t, T0('S1') + 0.05, z, { dx: -60, dy: 0, ...O });
  M.draw(zero, t, T0('S1') + 0.3, 0.5); fade(zl, t, T0('S1') + 0.5);
  EL.forEach(e => { M.draw(e.a, t, e.t - 0.1, 0.6); M.draw(e.l, t, e.t + 0.4, 0.4); fade(e.v, t, e.t + 0.1); fade(e.n, t, e.t + 0.3); });
  fade(net, t, wt('S3', 'short') - 0.1); M.vis(ec[0], t, wt('S7', 'stable') - 0.1, 1e9, POP);
  M.vis($('#lt'), t, T0('S4') - 0.1, z, { dx: 60, dy: 0, ...O });
  const tA = wt('S4', 'come'), tB = wt('S6', 'released');
  LG.forEach((o, i) => { const tin = tA + 0.1 + (i % 7) * 0.05, ti = M.lerp(T0('S5'), tB, ((o.k * 7) % 20) / 20), u = M.io((t - ti) / 0.6), q = lerp2([o.sx, o.sy], [o.x, o.y], u); at(o.g, q[0], q[1]); fade(o.g, t, tin); });
  const cu = M.clamp((t - wt('S6', 'released')) / 1.6); fade(lCnt, t, wt('S6', 'click') - 0.1); M.setT(lCnt, `${Math.round(788 * cu)} kJ/mol released`);
  M.vis(lc[0], t, wt('S5', 'lattice') - 0.1, 1e9, POP);
});

/* ---------- B ---------- */
cmpSec({
  L: { lab: 'MAKING THE GAS IONS', ic: 'zap', col: XC, title: 'Costs 147.1', w: 'Making', ex: K(`${G_('+495.8')} ${G_('- 348.7')} = ${R_('+147.1')}`), note: 'Energy we must pay to make Na⁺ and Cl⁻ from Na and Cl atoms.' },
  R: { lab: 'BUILDING THE LATTICE', ic: 'cube', col: OKC, title: 'Releases 788', w: 'Building', ex: K(`${N_('Na^+')} + ${H_('Cl^-')} \\rightarrow ${N_('Na')}${H_('Cl')}(\\mathrm{s})`), note: 'Energy given out as the ions click into the crystal. Units: kJ/mol.' },
  think: { q: 'Which is bigger: the cost or the release?', opts: ['Cost · 147.1', 'Release · 788'], right: 1, why: `${K(G_('788'))} kJ/mol released is far more than the ${K(G_('147.1'))} kJ/mol cost, so solid NaCl is stable.` },
  tOpts: wt('B2', 'cost'), tWhy: wt('B3', 'That'),
});

/* ---------- D ---------- */
const dsol = stepCard($('#dl'), 'LATTICE ENTHALPY · STEP BY STEP', '', [
  ['Energy to pull 1 mol of ionic solid into gas ions'],
  [K(`\\Delta_{\\text{lattice}}H\\ (${N_('Na')}${H_('Cl')}) = ${G_('788')}\\ \\text{kJ mol}^{-1}`)],
  ['Bigger charges pull harder: 2+ with 2− beats 1+ with 1−'],
  ['Smaller ions sit closer, so they pull harder too']], 110, 110);
$('#dl').querySelectorAll('.sol .sx').forEach((e, i) => { if (i !== 1) e.style.font = '600 25px Poppins'; });
const dS = $('#dS'), DL = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const na = (r + c) % 2 === 0, x = 392 + (c - 1) * 56, y = 170 + (r - 1) * 56; DL.push({ g: na ? ion(dS, x, y, 15, NC, '+', 18) : ion(dS, x, y, 22, HC, '−', 22), x, y }); }
const dNeed = chip($('#dr'), 520, 100, '788 kJ/mol NEEDED', GC);
const pairRow = (y, a, b, w, la, lb) => { const g = mk(dS, 'g', {}); mk(g, 'line', { x1: a[0], y1: y, x2: b[0], y2: y, stroke: C.ink2, 'stroke-width': w }); ion(g, a[0], y, a[1], NC, a[2], a[3]); ion(g, b[0], y, b[1], HC, b[2], b[3]); return g; };
const dQ = [pairRow(340, [110, 22, '+', 20], [260, 30, '−', 24], 3), pairRow(340, [470, 22, '2+', 18], [620, 30, '2−', 18], 12)];
const dQl = [txt(dS, 185, 404, 'WEAK PULL', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 17 }), txt(dS, 545, 404, 'STRONG PULL', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 17 })];
const dR = [pairRow(470, [100, 34, '+', 22], [222, 46, '−', 26], 3), pairRow(470, [480, 18, '+', 16], [532, 30, '−', 20], 8)];
const dRl = [txt(dS, 161, 548, 'BIG IONS · FAR APART', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 17 }), txt(dS, 506, 548, 'SMALL IONS · CLOSE', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 17 })];
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
sec('sD', T0('D1') - 0.1, tT + 0.1, t => {
  const z = OUT('T1');
  M.vis($('#dl'), t, T0('D1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#dr'), t, T0('D1') + 0.2, z, { dx: 60, dy: 0, ...O });
  dsol(t, T0('D1'), tDs);
  const ue = M.io((t - wt('D2', 'separate')) / 1.0);
  DL.forEach(o => { at(o.g, M.lerp(o.x, 392 + (o.x - 392) * 2.6, ue), M.lerp(o.y, 170 + (o.y - 170) * 1.9, ue)); fade(o.g, t, T0('D1') + 0.4); });
  M.vis(dNeed, t, wt('D3', 'seven') - 0.1, 1e9, POP);
  dQ.forEach((g, i) => fade(g, t, wt('D4', i ? 'two' : 'Bigger') - 0.1)); dQl.forEach((g, i) => fade(g, t, wt('D4', i ? 'far' : 'pull') - 0.1));
  dR.forEach((g, i) => fade(g, t, wt('D5', i ? 'closer' : 'Smaller') - 0.1)); dRl.forEach((g, i) => fade(g, t, wt('D5', i ? 'harder' : 'closer') + 0.2));
});

stmtSec(K(`${G_('+495.8')} ${G_('- 348.7')} = ${R_('+147.1')}\\ \\text{cost} \\qquad \\text{lattice: } ${G_('788')}\\ \\text{released}`), 'lattice', 'Strong', 'solid');

/* ---------- W ---------- */
const wsol = stepCard($('#wl'), 'WORKED EXAMPLE', 'Which has the higher lattice enthalpy: NaCl or MgO?', [
  [K(`${N_('Na^+')}\\ ${H_('Cl^-')}:\\ \\text{charges } ${G_('1')}`)],
  [K(`${N_('Mg^{2+}')}\\ ${H_('O^{2-}')}:\\ \\text{charges } ${G_('2')}\\ (\\times 2)`)],
  [K(`\\text{smaller: } ${N_('Mg^{2+}')} < ${N_('Na^+')},\\ \\ ${H_('O^{2-}')} < ${H_('Cl^-')}`)],
  [K(`\\Delta_{\\text{lattice}}H:\\ ${N_('Mg')}${H_('O')} \\gg ${N_('Na')}${H_('Cl')}`)],
  ['Melts: NaCl 801 °C · MgO about 2800 °C']], 170, 76);
$('#wl').querySelectorAll('.sol .sx')[4].style.font = '600 25px Poppins';
const wS = $('#wS');
const wp = [[150, 'NaCl', 25.5, 45, '+', '−', 'CHARGES 1+ AND 1−'], [300, 'MgO', 18, 35, '2+', '2−', 'CHARGES 2+ AND 2−']].map(([y, n, ra, rb, sa, sb, l]) => { const g = mk(wS, 'g', {}); const xa = 140, xb = xa + ra + rb; ion(g, xa, y, ra * 1.25, NC, sa, 18); ion(g, xb + (ra + rb) * 0.25, y, rb * 1.25, HC, sb, 20); ptxt(g, 330, y + 10, n, 32, C.ink, { 'text-anchor': 'start' }); txt(g, 330, y + 40, l, { fill: C.mute, 'font-weight': 600, 'font-size': 16 }); return g; });
const wTag = chip($('#wr'), 520, 270, 'SMALLER, CLOSER', NC);
const mp = [[440, 'NaCl', 801, '801 °C'], [500, 'MgO', 2800, 'about 2800 °C']].map(([y, n, v, l]) => { const g = mk(wS, 'g', {}); txt(g, 36, y + 8, n, { fill: C.ink, 'font-weight': 600, 'font-size': 20 }); const b = mk(g, 'rect', { x: 120, y: y - 16, height: 32, rx: 8, width: 0, fill: n === 'MgO' ? NC : C.dim }); const tl = txt(g, 0, y + 8, l, { fill: GC, 'font-weight': 600, 'font-size': 20 }); return { g, b, tl, w: v * 0.16 }; });
const wMp = txt(wS, 36, 410, 'MELTING POINT', { fill: C.mute, 'font-weight': 600, 'font-size': 16 });
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];
sec('sW', tW1 - 0.1, T0('C1') + 0.1, t => {
  const out = OUT('C1');
  M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...O }); M.vis($('#wlq'), t, tW1 + 0.4, 1e9, { dy: 14 });
  wsol(t, tW1, tWs);
  M.vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...O });
  wp.forEach((g, i) => fade(g, t, i ? T0('W3') : T0('W2'))); M.vis(wTag, t, wt('W4', 'smaller') - 0.1, 1e9, POP);
  fade(wMp, t, T0('W6')); mp.forEach((m, i) => { const u = M.io((t - wt('W6', i ? 'magnesium' : 'salt') + 0.1) / 0.8); fade(m.g, t, T0('W6') + i * 0.2); attr(m.b, 'width', (m.w * u).toFixed(1)); attr(m.tl, 'x', (130 + m.w * u).toFixed(1)); });
});

/* ---------- C: Born-Haber steps + properties (ISC) ---------- */
const BH = [['SUBLIMATION', `${N_('Na(s)')} \\rightarrow ${N_('Na(g)')}`, ['C1', 'solid']], ['DISSOCIATION', `\\tfrac{1}{2}${H_('Cl_2')} \\rightarrow ${H_('Cl')}`, ['C1', 'splitting']], ['IONIZATION', `${N_('Na')} \\rightarrow ${N_('Na^+')}`, ['C1', 'making']], ['ELECTRON GAIN', `${H_('Cl')} \\rightarrow ${H_('Cl^-')}`, ['C1', 'ions']], ['LATTICE', `\\text{ions} \\rightarrow ${N_('Na')}${H_('Cl')}(\\mathrm{s})`, ['C1', 'building']]];
$('#bhs').innerHTML = BH.map(([a, b], i) => `<div class="bh" id="bh${i}" style="left:${48 + i * 306}px"><b>${a}</b><span>${K(b)}</span></div>`).join('');
const PR = [['cube', 'Hard solids', ['C2', 'hard']], ['flame', 'High melting points', ['C2', 'melt']], ['droplet', 'Many dissolve in water', ['C2', 'dissolve']], ['zap', 'Conduct when melted or dissolved', ['C3', 'conduct']]];
$('#prs').innerHTML = PR.map(([ic, s], i) => `<div class="pr" id="pr${i}" style="left:${48 + i * 384}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><span>${s}</span></div>`).join('');
MEAS.push(() => document.querySelectorAll('.bh span').forEach(s => { if (s.offsetWidth > 248) s.style.fontSize = (30 * 248 / s.offsetWidth).toFixed(1) + 'px'; }));
const cS = $('#cS'), bhA = [0, 1, 2, 3].map(i => mk(cS, 'path', { d: `M${48 + i * 306 + 284} 170 h18 M${48 + i * 306 + 294} 162 l8 8 l-8 8`, stroke: C.dim, 'stroke-width': 3, fill: 'none' }));
sec('sC', T0('C1') - 0.1, tX1 + 0.1, t => {
  M.vis($('#cw'), t, T0('C1') + 0.05, OUT('X1'), { dy: 36, ...O });
  BH.forEach((b, i) => { M.vis($('#bh' + i), t, wt(...b[2]) - 0.1, 1e9, { dx: -16, dy: 0 }); if (i) M.draw(bhA[i - 1], t, wt(...b[2]) - 0.2, 0.3); });
  PR.forEach((p, i) => M.vis($('#pr' + i), t, wt(...p[2]) - 0.1, 1e9, { dy: 20 }));
});

endSec({
  trap: { wrong: 'Ionic bonds form because making the ions releases energy', right: `${K(`${G_('+495.8')} ${G_('- 348.7')} = ${R_('+147.1')}`)} kJ/mol is a cost: the lattice pays it`, tm: [['MAKING IONS', '+147.1 COST'], ['LATTICE', '788 OUT']], tTm: [wt('X3', 'costs'), wt('X3', 'lattice')], tRight: wt('X3', 'But') + 0.6 },
  where: 'Energy steps of ionic bond formation, and comparing lattice enthalpies by charge and size',
  mcq: { q: 'Which compound has the highest lattice enthalpy?', opts: ['NaCl', 'KCl', 'MgO', 'NaBr'], right: 2 },
  tOpts: wt('Q1', 'compound'),
  sol: [[K(`${N_('Mg^{2+}')}\\ ${H_('O^{2-}')}:\\ \\text{charges } ${G_('2')}`)], [K(`\\text{smallest ions here}`)], [K(`\\text{others: charges } ${G_('1')}`)], [K(`${N_('Mg')}${H_('O')}\\ \\checkmark`)]],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'weaker')],
  fc: { title: 'Recap · ionic bond and lattice enthalpy', txt: [1, 0, 1, 0, 1], lines: [
    '<b>Ionic bond</b>: low IE metal gives e⁻, large −ΔegH non metal takes it',
    K(`${N_('Na')}\\ ${G_('+495.8')},\\ ${H_('Cl')}\\ ${G_('-348.7')} \\Rightarrow ${R_('+147.1')}\\ \\text{kJ mol}^{-1}\\ \\text{cost}`),
    '<b>Lattice enthalpy</b>: energy to separate 1 mol of ionic solid into gas ions',
    K(`\\Delta_{\\text{lattice}}H\\ (${N_('Na')}${H_('Cl')}) = ${G_('788')}\\ \\text{kJ mol}^{-1}`),
    '<b>Bigger charge, smaller ions</b> = bigger lattice enthalpy · MgO ≫ NaCl'] },
  yq: ['What is lattice enthalpy?', 'Why do ionization and electron gain alone not explain why salt forms?', 'Which has the higher lattice enthalpy, NaCl or MgO, and why?'],
  next: ['NEXT · EP 40', 'What if neither atom gives up an electron? Covalent Bond and Lewis Structures'],
});

run();
})();
