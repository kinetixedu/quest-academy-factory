// PUC Chemistry Ep 41: Formal Charge (Molecule bench)
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
  jobs: [['receipt', 'Splitting a bill', 'WITH FRIENDS', 'Splitting', 'SPLIT', 'MORE OR LESS?'], ['pie', 'Sharing a pizza', 'HALF EACH', 'pizza', 'HALF', 'MORE OR LESS?'], ['coin', 'Pocket money', 'END OF THE WEEK', 'pocket', 'COUNT', 'MORE OR LESS?']],
  tEw: [0, 1, 2].map(i => wt('H2', 'more') + i * 0.15), tPill: wt('H2', 'started'),
  kit: [['book', 'Two drawings', wt('H3', 'two')], ['check', 'Full octets', wt('H3', 'Both')], ['help', 'Which one?', wt('H3', 'Which')]], tTease: wt('H5', 'best'),
});
const badge = (p, x, y, v) => { const g = mk(p, 'g', {}); const f = v > 0 ? NC : v < 0 ? HC : C.dim; mk(g, 'circle', { cx: x, cy: y, r: 24, fill: f }); ptxt(g, x, y + 8, v > 0 ? '+' + v : v < 0 ? '−' + (-v) : '0', 22, '#fff'); return g; };
const bline = (p, x1, y1, x2, y2, n, col = C.ink) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, k = 0.2; const off = n === 1 ? [0] : n === 2 ? [-6, 6] : [-11, 0, 11]; return off.map(o => mk(p, 'line', { x1: x1 + dx * k + nx * o, y1: y1 + dy * k + ny * o, x2: x2 - dx * k + nx * o, y2: y2 - dy * k + ny * o, stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' })); };
const lps = (p, x, y, sides, r = 46) => sides.map(s => pairAt(x, y - 4, s, r).map(q => dot(p, q[0], q[1], VC, 6.5)));

/* ---------- P: coins picture ---------- */
const ps = $('#pS');
mk(ps, 'line', { x1: 840, y1: 90, x2: 840, y2: 460, stroke: C.line, 'stroke-width': 2 });
const coin = (x, y) => { const g = mk(ps, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 22, fill: GC }); mk(g, 'circle', { cx: x, cy: y, r: 15, fill: 'none', stroke: '#fff', 'stroke-width': 2, opacity: 0.6 }); return g; };
const cS0 = Array.from({ length: 6 }, (_, i) => coin(250 + i * 56, 130));
const sLab = txt(ps, 48, 138, 'START', { fill: C.mute, 'font-weight': 600, 'font-size': 18 });
const pBox = mk(ps, 'rect', { x: 48, y: 200, width: 330, height: 170, rx: 16, fill: C.soft });
const jBox = mk(ps, 'rect', { x: 410, y: 200, width: 390, height: 170, rx: 16, fill: C.soft });
const pT = txt(ps, 72, 236, 'OWN POCKET · ALL YOURS', { fill: VC, 'font-weight': 600, 'font-size': 17 });
const jT = txt(ps, 434, 236, 'SHARED JAR · HALF YOURS', { fill: EC, 'font-weight': 600, 'font-size': 17 });
const pC = [0, 1].map(i => coin(130 + i * 56, 300)), jC = Array.from({ length: 6 }, (_, i) => coin(470 + i * 54, 300));
const res = txt(ps, 48, 430, '', { fill: C.ink, 'font-weight': 600, 'font-size': 26 });
const MP = [['Starting coins', 'VALENCE e⁻ · V', ['P4', 'starting']], ['Pocket coins', 'LONE PAIR e⁻ · L', ['P4', 'Lone']], ['Shared jar', 'BOND e⁻ · HALF OF B', ['P4', 'Bond']]];
$('#pT').innerHTML = MP.map(([a, b], i) => `<div class="mrow" id="mp${i}" style="left:900px;right:48px;top:${110 + i * 92}px">${a}<em>${b}</em></div>`).join('');
sec('sP', tP1 - 0.1, T0('D1') + 0.1, t => {
  M.vis($('#pw'), t, tP1 + 0.05, OUT('D1'), { dy: 36, ...O });
  fade(sLab, t, wt('P1', 'start') - 0.1); cS0.forEach((c, i) => fade(c, t, wt('P1', 'six') + i * 0.08, 1e9, 0.15));
  fade(pBox, t, wt('P2', 'pocket') - 0.2); fade(pT, t, wt('P2', 'yours') - 0.1); pC.forEach((c, i) => fade(c, t, wt('P2', 'pocket') + i * 0.1, 1e9, 0.15));
  fade(jBox, t, wt('P2', 'jar') - 0.2); fade(jT, t, wt('P2', 'half') - 0.1); jC.forEach((c, i) => { fade(c, t, wt('P2', 'jar') + i * 0.08, 1e9, 0.15); if (i % 2 && t >= wt('P2', 'half')) c.style.opacity = (1 - 0.7 * M.clamp((t - wt('P2', 'half')) / 0.4)).toFixed(3); });
  fade(res, t, wt('P3', 'compare') - 0.1); M.setT(res, t < wt('P3', 'difference') ? 'NOW: 2 + 3 = 5 coins' : 'NOW 5 · START 6 · DIFFERENCE 6 − 5 = +1'); attr(res, 'fill', t < wt('P3', 'difference') ? C.ink : NC);
  MP.forEach((m, i) => M.vis($('#mp' + i), t, wt(...m[2]) - 0.15, 1e9, { dx: 24, dy: 0 }));
  M.vis($('#pP'), t, wt('P3', 'formal') - 0.1, 1e9, POP);
});

/* ---------- D: the formula, on water's oxygen ---------- */
const FT = [G_('V'), V_('L'), `\\tfrac{1}{2}${E_('B')}`];
const dsol = stepCard($('#dl'), 'FORMAL CHARGE · STEP BY STEP', '', [
  [K(`${G_('V')} = \\text{valence } e^- \\text{ of the free atom}`)],
  [K(`${V_('L')} = \\text{lone pair } e^- \\ (\\text{all its own})`)],
  [K(`${E_('B')} = \\text{bond } e^- \\ (\\text{it gets half})`)],
  [K(`\\text{FC} = ${FT[0]} - ${FT[1]} - ${FT[2]}`)]], 110, 110);
$('#dF').innerHTML = `<span id="dF0">${K('\\text{FC} =')}</span> <span id="dF1">${K(FT[0])}</span> <span id="dF2">${K('-\\,' + FT[1])}</span> <span id="dF3">${K('-\\,' + FT[2])}</span>`;
const ds = $('#dS'), XO = 392, YO = 300;
const dO = ptxt(ds, XO, YO + 18, 'O', 54, NC), dH = [XO - 200, XO + 200].map(x => ptxt(ds, x, YO + 16, 'H', 46, HC));
const dL = lps(ds, XO, YO, [0, 2]);
const dBp = [-1, 1].map(s => [0, 1].map(k => dot(ds, XO + s * (100 + (k ? 12 : -12)), YO, EC, 7)));
const dR = txt(ds, XO, 470, '', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 30 });
const dc = [chip($('#dr'), 36, 180, 'WATER · THE O ATOM', C.ink), chip($('#dr'), 520, 180, 'NCERT WRITES ½ S', C.mute)];
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
sec('sD', T0('D1') - 0.1, T0('S1') + 0.1, t => {
  const z = OUT('S1');
  M.vis($('#dl'), t, T0('D1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#dr'), t, T0('D1') + 0.2, z, { dx: 60, dy: 0, ...O });
  dsol(t, T0('D1'), tDs);
  [T0('D1') + 0.3, wt('D2', 'V'), wt('D3', 'L'), wt('D4', 'over')].forEach((tt, i) => M.vis($('#dF' + i), t, tt - 0.1, 1e9, POP));
  M.vis(dc[0], t, T0('D1') + 0.6, 1e9, POP); M.vis(dc[1], t, T0('D5') + 0.4, 1e9, POP);
  fade(dO, t, T0('D1') + 0.7); dH.forEach((h, i) => fade(h, t, T0('D1') + 0.9 + i * 0.15));
  dL.forEach(pr => pr.forEach(d => fade(d, t, T0('D1') + 1.2)));
  const tl = wt('D3', 'lone'), hl = M.clamp((t - tl) / 0.3) * (1 - M.clamp((t - T0('D4')) / 0.3));
  dL.forEach(pr => pr.forEach(d => attr(d, 'r', (6.5 + 3 * hl).toFixed(2))));
  const us = M.io((t - wt('D4', 'half')) / 0.8);
  dBp.forEach((pr, s) => pr.forEach((d, k) => { fade(d, t, T0('D1') + 1.2); const own = (s === 0 ? k === 1 : k === 0); const x0 = XO + (s ? 1 : -1) * (100 + (k ? 12 : -12)), x1 = own ? XO + (s ? 1 : -1) * 62 : XO + (s ? 1 : -1) * 150; mv(d, M.lerp(x0, x1, us), YO); if (!own && us > 0) d.style.opacity = (1 - 0.7 * us).toFixed(3); }));
  fade(dR, t, wt('D2', 'valence')); M.setT(dR, t < T0('D3') ? 'V = 6' : t < T0('D4') ? 'V = 6 · L = 4' : t < T0('D5') ? 'V = 6 · L = 4 · B = 4, HALF = 2' : 'FC = 6 − 4 − 2 = 0');
  attr(dR, 'fill', t >= T0('D5') ? OKC : GC);
});

/* ---------- S: ozone on the bench ---------- */
const ks = $('#kS'), OZ = [[392, 210], [200, 380], [584, 380]];
const oz = OZ.map(([x, y]) => ptxt(ks, x, y + 18, 'O', 54, NC));
const ozB = [bline(ks, OZ[0][0], OZ[0][1], OZ[1][0], OZ[1][1], 2), bline(ks, OZ[0][0], OZ[0][1], OZ[2][0], OZ[2][1], 1)];
const ozL = [lps(ks, ...OZ[0], [0]), lps(ks, ...OZ[1], [3, 2]), lps(ks, ...OZ[2], [0, 1, 2])];
const ozF = [badge(ks, 450, 150, 1), badge(ks, 140, 300, 0), badge(ks, 650, 310, -1)];
const ozR = mk(ks, 'circle', { cx: 392, cy: 210, r: 62, fill: 'none', stroke: GC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const ozT = [chip($('#sk'), 36, 84, 'O₃ · AS DRAWN IN NCERT', C.ink)];
const OR = [['Middle O', `6 - ${V_('2')} - \\tfrac{${E_('6')}}{2} = +1`, ['S3', 'Plus']], ['Left O · double bond', `6 - ${V_('4')} - \\tfrac{${E_('4')}}{2} = 0`, ['S4', 'Zero']], ['Right O · single bond', `6 - ${V_('6')} - \\tfrac{${E_('2')}}{2} = -1`, ['S5', 'Minus']]];
$('#sbT').innerHTML = OR.map(([a, f], i) => `<div class="mrow" id="or${i}" style="top:${100 + i * 100}px;height:80px">${a}<em style="font:500 30px Poppins;color:var(--ink)">${K(f)}</em></div>`).join('');
const sbc = chip($('#sb'), 36, 420, 'SUM: +1 + 0 − 1 = 0 · O₃ HAS NO CHARGE', OKC);
sec('sS', T0('S1') - 0.1, T0('B1') + 0.1, t => {
  const z = OUT('B1');
  M.vis($('#sk'), t, T0('S1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#sb'), t, T0('S1') + 0.25, z, { dx: 60, dy: 0, ...O });
  M.vis(ozT[0], t, wt('S1', 'NCERT') - 0.1, 1e9, POP);
  oz.forEach((o, i) => fade(o, t, wt('S1', 'ozone') + i * 0.15));
  ozB[0].forEach((l, k) => M.draw(l, t, wt('S2', 'double') + k * 0.15, 0.4)); ozB[1].forEach(l => M.draw(l, t, wt('S2', 'single'), 0.4));
  ozL[0].forEach(pr => pr.forEach(d => fade(d, t, wt('S2', 'lone') - 0.1, 1e9, 0.15)));
  [1, 2].forEach(i => ozL[i].forEach((pr, k) => pr.forEach(d => fade(d, t, wt('S2', 'single') + 0.5 + k * 0.12, 1e9, 0.15))));
  // highlight ring hops to the atom being counted
  const hop = [T0('S3'), T0('S4'), T0('S5')], j = t < hop[1] ? 0 : t < hop[2] ? 1 : 2, tj = hop[j], up = M.io((t - tj) / 0.5), from = OZ[Math.max(0, j - 1)], to = OZ[j];
  const p = j === 0 ? to : lerp2(from, to, up); attr(ozR, 'cx', p[0].toFixed(1)); attr(ozR, 'cy', p[1].toFixed(1)); fade(ozR, t, hop[0] - 0.1, T0('S6') + 0.3);
  OR.forEach((r, i) => { M.vis($('#or' + i), t, hop[i] - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis(ozF[i], t, wt(...r[2]) - 0.1, 1e9, POP); });
  M.vis(sbc, t, wt('S6', 'Zero', 1) - 0.1, 1e9, POP);
});

/* ---------- B ---------- */
cmpSec({
  L: { lab: 'REAL CHARGE · e⁻ MOVED', ic: 'zap', col: NC, title: 'Real charge', w: 'real', ex: K(`${N_('Na^+')}\\ \\ ${H_('Cl^-')}`), note: 'A whole electron really moved, as in sodium chloride.' },
  R: { lab: 'FORMAL CHARGE · A COUNT', ic: 'pencil', col: C.ink, title: 'Formal charge', w: 'formal', ex: K(`\\mathrm{O_3}:\\ +1,\\ 0,\\ -1`), note: 'Only a count on paper. No whole charge sits on the atom.' },
  think: { q: 'Does the middle O in ozone really carry a whole + charge?', opts: ['Yes', 'No'], right: 1, why: 'Formal charge is a counting tool. It does not show a real charge on the atom.' },
  tOpts: wt('B2', 'really'), tWhy: wt('B3', 'Formal'),
});

stmtSec(K(`\\text{FC} = ${FT[0]} - ${FT[1]} - ${FT[2]}`), 'best', 'smallest', 'charges');

/* ---------- W: Aarav's CO2 puzzle ---------- */
const wsol = stepCard($('#wl'), 'WORKED EXAMPLE', "Aarav's puzzle: which CO₂ structure is better?", [
  [K(`\\text{I: } \\mathrm{O{=}C{=}O} \\qquad \\text{II: } \\mathrm{O{\\equiv}C{-}O}`)],
  [K(`\\text{I: O } 6 - 4 - 2 = 0,\\ \\ \\text{C } 4 - 0 - 4 = 0`)],
  [K(`\\text{II: } \\mathrm{O{\\equiv}}\\ \\ 6 - 2 - 3 = +1`)],
  [K(`\\text{II: } \\mathrm{{-}O}\\ \\ 6 - 6 - 1 = -1,\\ \\ \\text{C } 0`)],
  [K(`\\text{I: all zeros} \\Rightarrow \\text{better}\\ \\checkmark`)]], 170, 76);
const ws = $('#wS'), WX = [200, 392, 584], WY = [190, 410];
const wI = mk(ws, 'g', {}), wII = mk(ws, 'g', {});
const wIa = WX.map((x, i) => ptxt(wI, x, WY[0] + 18, i === 1 ? 'C' : 'O', 50, i === 1 ? NC : HC));
const wIb = [bline(wI, WX[0], WY[0], WX[1], WY[0], 2), bline(wI, WX[1], WY[0], WX[2], WY[0], 2)];
const wIl = [lps(wI, WX[0], WY[0], [0, 2]), lps(wI, WX[2], WY[0], [0, 2])];
const wIIa = WX.map((x, i) => ptxt(wII, x, WY[1] + 18, i === 1 ? 'C' : 'O', 50, i === 1 ? NC : HC));
const wIIb = [bline(wII, WX[0], WY[1], WX[1], WY[1], 3), bline(wII, WX[1], WY[1], WX[2], WY[1], 1)];
const wIIl = [lps(wII, WX[0], WY[1], [3]), lps(wII, WX[2], WY[1], [0, 1, 2])];
const wTag = [txt(ws, 48, WY[0] + 12, 'I', { fill: C.mute, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins' }), txt(ws, 40, WY[1] + 12, 'II', { fill: C.mute, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins' })];
const wF = [badge(ws, WX[0], WY[0] - 76, 0), badge(ws, WX[1], WY[0] - 76, 0), badge(ws, WX[2], WY[0] - 76, 0), badge(ws, WX[0], WY[1] - 76, 1), badge(ws, WX[1], WY[1] - 76, 0), badge(ws, WX[2], WY[1] - 76, -1)];
const wc = chip($('#wr'), 36, 510, 'STRUCTURE I WINS · ALL ZEROS', OKC);
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];
sec('sW', tW1 - 0.1, T0('C1') + 0.1, t => {
  const out = OUT('C1');
  M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...O }); M.vis($('#wlq'), t, tW1 + 0.4, 1e9, { dy: 14 });
  wsol(t, tW1, tWs);
  M.vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...O });
  const t1 = wt('W2', 'one'), t2 = wt('W2', 'two');
  fade(wTag[0], t, t1 - 0.1); wIa.forEach((a, i) => fade(a, t, t1 + i * 0.12)); wIb.flat().forEach((l, k) => M.draw(l, t, t1 + 0.4 + k * 0.1, 0.3)); wIl.flat(2).forEach((d, k) => fade(d, t, t1 + 0.8 + k * 0.04, 1e9, 0.12));
  fade(wTag[1], t, t2 - 0.1); wIIa.forEach((a, i) => fade(a, t, t2 + i * 0.12)); wIIb.flat().forEach((l, k) => M.draw(l, t, t2 + 0.4 + k * 0.1, 0.3)); wIIl.flat(2).forEach((d, k) => fade(d, t, t2 + 0.8 + k * 0.04, 1e9, 0.12));
  [wt('W3', 'oxygen'), wt('W3', 'Carbon'), wt('W3', 'oxygen') + 0.2, wt('W4', 'Plus'), wt('W5', 'Carbon'), wt('W5', 'Minus')].forEach((tt, i) => M.vis(wF[i], t, tt - 0.1, 1e9, POP));
  wII.style.opacity = (1 - 0.6 * M.clamp((t - wt('W6', 'better')) / 0.4)).toFixed(3); M.vis(wc, t, wt('W6', 'zeros') - 0.1, 1e9, POP);
});

/* ---------- C: charges add up (ammonium) ---------- */
const cS = $('#cS'), NX = 400, NY = 320;
const cN = ptxt(cS, NX, NY + 18, 'N', 54, NC);
const cHs = [[0, -1], [1, 0], [0, 1], [-1, 0]].map(([dx, dy]) => ({ t: ptxt(cS, NX + dx * 140, NY + dy * 140 + 16, 'H', 46, HC), l: bline(cS, NX, NY, NX + dx * 140, NY + dy * 140, 1)[0], dx, dy }));
const cBr = mk(cS, 'path', { d: `M${NX - 230} ${NY - 200} h-20 v400 h20 M${NX + 230} ${NY - 200} h20 v400 h-20`, stroke: C.ink2, 'stroke-width': 4, fill: 'none' });
const cPl = ptxt(cS, NX + 282, NY - 186, '+', 40, C.ink);
const cF = [badge(cS, NX + 58, NY - 58, 1), ...cHs.map(h => badge(cS, NX + h.dx * 140 + 46, NY + h.dy * 140 - 40, 0))];
const CR = [['Rule', `\\textstyle\\sum \\text{FC} = \\text{charge}`, ['C1', 'add']], ['Nitrogen', `5 - ${V_('0')} - \\tfrac{${E_('8')}}{2} = +1`, ['C2', 'Five']], ['Each H', `1 - ${V_('0')} - \\tfrac{${E_('2')}}{2} = 0`, ['C3', 'Each']], ['Total', `+1 + 4(0) = +1`, ['C3', 'total']]];
$('#crs').innerHTML = CR.map(([a, f], i) => `<div class="mrow" id="cr${i}" style="left:860px;right:48px;top:${100 + i * 100}px;height:80px">${a}<em style="font:500 30px Poppins;color:var(--ink)">${K(f)}</em></div>`).join('');
sec('sC', T0('C1') - 0.1, tX1 + 0.1, t => {
  M.vis($('#cw'), t, T0('C1') + 0.05, OUT('X1'), { dy: 36, ...O });
  CR.forEach((c, i) => M.vis($('#cr' + i), t, wt(...c[2]) - 0.15, 1e9, { dx: 24, dy: 0 }));
  const ta = wt('C1', 'molecule');
  fade(cN, t, ta - 0.1); cHs.forEach((h, i) => { fade(h.t, t, ta + 0.1 + i * 0.12); M.draw(h.l, t, wt('C2', 'four') + i * 0.12, 0.3); });
  M.draw(cBr, t, ta + 0.6, 0.6); fade(cPl, t, ta + 1);
  M.vis(cF[0], t, wt('C2', 'Plus') - 0.1, 1e9, POP); cF.slice(1).forEach((b, i) => M.vis(b, t, wt('C3', 'Zero') - 0.1 + i * 0.1, 1e9, POP));
});

endSec({
  trap: { wrong: 'FC = V − L − B (all of the bond electrons)', right: `${K(`\\text{FC} = ${FT[0]} - ${FT[1]} - ${FT[2]}`)}: each bond is shared, only half is yours`, tm: [['ALL OF B', 'WRONG'], ['HALF OF B', 'RIGHT']], tTm: [wt('X3', 'shared'), wt('X3', 'half')], tRight: wt('X3', 'But') - 0.1 },
  where: 'Formal charge of a marked atom, and choosing the more stable Lewis structure',
  mcq: { q: 'One N=O, two N-O in NO₃⁻. Formal charge on N, and on an N-O oxygen?', opts: ['N: +1 · O: −1', 'N: 0 · O: −1', 'N: +1 · O: 0', 'N: −1 · O: +1'], right: 0 },
  tOpts: wt('Q1', 'Find'),
  sol: [[K(`\\mathrm{N}:\\ 5 - 0 - \\tfrac{8}{2} = +1`)], [K(`\\mathrm{O}:\\ 6 - 6 - \\tfrac{2}{2} = -1`)], [K(`+1 - 1 - 1 + 0 = -1`)], [K(`\\text{(A)}\\ \\checkmark`)]],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'nitrate')],
  fc: { title: 'Recap · formal charge', txt: [1, 0, 1, 0, 1], lines: [
    '<b>Formal charge</b>: a count on paper, not a real charge',
    K(`\\text{FC} = ${FT[0]} - ${FT[1]} - ${FT[2]}`),
    '<b>Ozone</b>: middle O +1, double-bonded O 0, single-bonded O −1',
    K(`\\mathrm{O{=}C{=}O}\\ (0,0,0)\\ \\text{beats}\\ \\mathrm{O{\\equiv}C{-}O}\\ (+1,0,-1)`),
    '<b>Check</b>: formal charges add up to the charge · NH₄⁺: N +1'] },
  yq: ['Write the formula for formal charge.', 'What is the formal charge on the middle oxygen of ozone?', 'Which CO₂ structure is better, and why?'],
  next: ['NEXT · EP 42', 'Fewer than eight, or more? Limitations of the Octet Rule'],
});

run();
})();
