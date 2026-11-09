// PUC Chemistry Ep 38: Kossel-Lewis Approach and Octet Rule (Molecule bench)
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
  jobs: [['cube', 'Salt', 'ON YOUR FOOD', 'Salt', 'NaCl', 'IONS'], ['droplet', 'Water', 'IN YOUR GLASS', 'Water', 'H₂O', 'SHARED PAIRS'], ['balloon', 'Helium balloon', 'AT A PARTY', 'helium', 'He', 'ALONE']],
  elc: [NC, NC, C.mute], tEw: [wt('H2', 'salt'), wt('H2', 'water'), wt('H2', 'Helium')], tPill: wt('H2', 'alone'),
  kit: [['help', 'Why bond?', wt('H3', 'why')], ['book', 'Chapter 4', wt('H4', 'Chapter')], ['bulb', 'Eight', wt('H4', 'eight')]], tTease: wt('H5', 'predict'),
});

/* ---------- P: why eight ---------- */
$('#stk').innerHTML = Array.from({ length: 8 }, (_, i) => `<div class="slot" id="sl${i}" style="left:${48 + (i % 4) * 116}px;top:${120 + Math.floor(i / 4) * 116}px">${M.icon('check', 40, '#fff', 3)}</div>`).join('');
const ps = $('#pS');
mk(ps, 'line', { x1: 580, y1: 100, x2: 580, y2: 440, stroke: C.line, 'stroke-width': 2 });
const NG = [['He', [2], 720, 'He · 2', wt('P3', 'Helium'), wt('P3', 'two')], ['Ne', [2, 8], 990, 'Ne · 2, 8', wt('P2', 'neon'), wt('P2', 'eight')], ['Ar', [2, 8, 8], 1320, 'Ar · 2, 8, 8', wt('P2', 'argon'), wt('P2', 'eight')]];
const ngA = NG.map(([s, sh, x, lab]) => { const a = shellAtom(ps, x, 250, s, sh, { r0: 28, dr: 30, nr: 24, fs: 21 }); const l = txt(a.g, x, 412, lab, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 }); const f = txt(ps, x, 250 - a.Rout - 16, 'FULL', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 18 }); return { a, f }; });
sec('sP', tP1 - 0.1, T0('S1') + 0.1, t => {
  M.vis($('#pw'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...O });
  const tA = wt('P1', 'eight'), tFull = wt('P1', 'full'), tSev = wt('P1', 'Seven'), tRe = wt('P2', 'eight');
  let n = Math.floor(M.clamp((t - tA - 0.2) / (tFull - tA)) * 8 + 1e-6); if (t >= tFull) n = 8; if (t >= tSev - 0.1) n = 7; if (t >= tRe) n = 8;
  for (let i = 0; i < 8; i++) { const s = $('#sl' + i); M.vis(s, t, tA - 0.2 + i * 0.05, 1e9, POP); const on = i < n; setBg(s, on ? NC : '#FFFFFF'); s.style.borderStyle = on ? 'solid' : 'dashed'; s.style.borderColor = on ? NC : (i === 7 && t >= tSev ? XC : C.line); s.querySelector('svg').style.opacity = on ? 1 : 0; }
  const L = $('#stkL'); M.vis(L, t, tFull - 0.1, 1e9, { dy: 8 }); const uf = t >= tSev - 0.1 && t < tRe; M.setT(L, uf ? '7 OF 8 · UNFINISHED' : '8 OF 8 · COMPLETE'); L.style.color = uf ? XC : C.ok;
  NG.forEach(([, , , , tin, tHi], i) => { const gu = fade(ngA[i].a.g, t, tP1 + 1.2 + i * 0.2, 1e9, 0.4, 0.22); if (t >= tin - 0.1) ngA[i].a.g.style.opacity = (0.22 + 0.78 * M.clamp((t - tin + 0.1) / 0.3)).toFixed(3); const h = M.clamp((t - tHi) / 0.3); attr(ngA[i].a.rings[ngA[i].a.rings.length - 1], 'stroke', mix(C.dim, NC, h)); attr(ngA[i].a.rings[ngA[i].a.rings.length - 1], 'stroke-width', 2 + 2 * h); fade(ngA[i].f, t, tHi); });
  M.vis($('#pP'), t, wt('P4', 'stable') - 0.1, 1e9, POP);
});

/* ---------- S: Kossel (give and take), Lewis (share) ---------- */
const KT = [['F', 0, 0], ['Ne', 1, 0], ['Na', 2, 0], ['Cl', 0, 1], ['Ar', 1, 1], ['K', 2, 1]];
const KX = c => 36 + c * 236, KY = r => 236 + r * 96;
$('#kA').innerHTML = `<div class="pillp ac" id="kp0" style="left:36px;top:84px">Kossel · 1916</div><div class="pillp ink" id="kp1" style="left:250px;top:84px">Lewis · 1916</div><div class="lbl" id="kp2" style="left:450px;top:98px">EACH ON HIS OWN</div>` +
  [['GROUP 17', 'HALOGENS'], ['GROUP 18', 'NOBLE GASES'], ['GROUP 1', 'ALKALI METALS']].map(([a, b], c) => `<div class="kh" id="kh${c}" style="left:${KX(c)}px;top:170px">${a}<br>${b}</div>`).join('') +
  KT.map(([e, c, r]) => `<div class="kt" id="k_${e}" style="left:${KX(c)}px;top:${KY(r)}px">${e}</div>`).join('') + `<div class="pillp" id="kp3" style="left:36px;top:470px">Noble gases sit between them</div>`;
const ks = $('#kS');
const CL = [[300, [0, 3, 2, 1]], [480, [0, 1, 2, 3]]].map(([x, ord]) => { const g = mk(ks, 'g', {}); ptxt(g, x, 318, 'Cl', 52, NC); const pos = lewisPos(7, x, 300, 46, ord); const ds = pos.map((p, i) => dot(g, p[0], p[1], i === 6 ? EC : HC, 6)); const ring = mk(ks, 'circle', { cx: x, cy: 300, r: 112, fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '8 8' }); const n8 = txt(ks, x, 168, '8', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 34 }); return { g, ds, pos, ring, n8 }; });
const kc = [chip($('#sk'), 36, 470, 'BOTH WANT ONE MORE e⁻', C.ink), chip($('#sk'), 36, 520, 'COVALENT BOND · ONE SHARED PAIR', NC)];
const bs = $('#bS');
const gNa = mk(bs, 'g', {}), gCl = mk(bs, 'g', {});
const aNa = shellAtom(gNa, 200, 240, 'Na', [2, 8, 1], { rot: Math.PI / 2 }), aCl = shellAtom(gCl, 560, 240, 'Cl', [2, 8, 7], { fill: HC });
aCl.es.filter(e => e.i === 2).forEach((e, k) => { const a = Math.PI + (k + 1) * Math.PI / 4; mv(e.c, 560 + e.R * Math.cos(a), 240 + e.R * Math.sin(a)); });
const eNa = aNa.es.find(e => e.i === 2); attr(eNa.c, 'fill', EC);
const lNa = txt(gNa, 200, 384, 'Na · 2, 8, 1', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 }), lCl = txt(gCl, 560, 384, 'Cl · 2, 8, 7', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const badge = (g, x, y, s, fill) => { const b = mk(g, 'g', {}); mk(b, 'circle', { cx: x, cy: y, r: 20, fill }); ptxt(b, x, y + 9, s, 26, '#fff'); return b; };
const bNa = badge(gNa, 290, 140, '+', NC), bCl = badge(gCl, 650, 140, '−', HC);
const pull = [mk(bs, 'path', { d: 'M300 430 H366 M354 420 L368 430 L354 440', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), mk(bs, 'path', { d: 'M460 430 H394 M406 420 L392 430 L406 440', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' })];
const bc = [chip($('#sb'), 36, 470, 'Na⁺ LIKE Ne · Cl⁻ LIKE Ar', C.ink), chip($('#sb'), 36, 520, 'IONIC BOND · ELECTROVALENT BOND', NC)];
sec('sS', T0('S1') - 0.1, T0('B1') + 0.1, t => {
  const z = OUT('B1'), t7 = T0('S7');
  M.vis($('#sk'), t, T0('S1') + 0.05, z, { dx: -60, dy: 0, ...O });
  fade($('#skL1'), t, T0('S1'), t7 - 0.2); fade($('#skL2'), t, t7 + 0.1);
  fade($('#kA'), t, T0('S1'), t7 - 0.2);
  M.vis($('#kp0'), t, wt('S1', 'Kossel') - 0.1, 1e9, POP); M.vis($('#kp1'), t, wt('S1', 'Lewis') - 0.1, 1e9, POP); M.vis($('#kp2'), t, wt('S1', 'own') - 0.2, 1e9, { dy: 8 });
  [0, 1, 2].forEach(c => M.vis($('#kh' + c), t, T0('S2') + 0.3 + c * 0.1, 1e9, { dy: 8 }));
  KT.forEach(([e, c, r]) => { const el = $('#k_' + e); M.vis(el, t, T0('S2') + 0.4 + (c + r) * 0.06, 1e9, POP);
    const ng = c === 1 && t >= wt('S2', 'noble') - 0.1, na = e === 'Na' && t >= wt('S3', 'Sodium') - 0.1, cl = e === 'Cl' && t >= wt('S3', 'Chlorine') - 0.1;
    setBg(el, na ? NC : cl ? HC : ng ? C.ac2 : '#FFFFFF'); el.style.color = na || cl ? '#fff' : C.ink; el.style.borderColor = na || ng ? NC : cl ? HC : C.line; });
  M.vis($('#kp3'), t, wt('S2', 'between') - 0.1, 1e9, POP);
  // Lewis: two Cl share
  const tS8 = wt('S8', 'share'), u8 = M.io((t - tS8) / 0.8);
  CL.forEach((c, j) => { fade(c.g, t, t7 + 0.2 + j * 0.25); const p = c.pos[6], tgt = [j ? 398 : 382, 300], q = lerp2(p, tgt, u8); mv(c.ds[6], q[0], q[1]); M.draw(c.ring, t, wt('S8', 'eight') - 0.1 + j * 0.3, 0.5); fade(c.n8, t, wt('S8', 'eight') + 0.2 + j * 0.3); });
  M.vis(kc[0], t, wt('S7', 'Both') - 0.1, 1e9, POP); M.vis(kc[1], t, wt('S8', 'covalent') - 0.1, 1e9, POP);
  // Kossel bench
  M.vis($('#sb'), t, T0('S3') - 0.1, z, { dx: 60, dy: 0, ...O });
  fade(gNa, t, wt('S3', 'Sodium') - 0.1); fade(gCl, t, wt('S3', 'Chlorine') - 0.1);
  const tg = wt('S4', 'gives'), ue = M.io((t - tg) / 0.9), sl = M.io((t - wt('S6', 'pull') + 0.1) / 0.7) * 34;
  const e0 = eNa.p, e1 = [458 - 34 - sl, 240]; const q = lerp2(e0, [458, 240], ue); mv(eNa.c, q[0] + (ue >= 1 ? -sl * 2 : 0), q[1]);
  attr(gNa, 'transform', `translate(${sl.toFixed(1)} 0)`); attr(gCl, 'transform', `translate(${(-sl).toFixed(1)} 0)`);
  const ro = M.clamp((t - wt('S4', 'neon') + 0.1) / 0.4); aNa.rings[2].style.opacity = (1 - 0.8 * ro).toFixed(3); attr(aNa.rings[2], 'stroke-dasharray', ro > 0 ? '6 8' : 'none');
  M.setT(lNa, t >= wt('S4', 'positive') - 0.1 ? 'Na⁺ · 2, 8' : 'Na · 2, 8, 1'); M.setT(lCl, t >= wt('S5', 'negative') - 0.1 ? 'Cl⁻ · 2, 8, 8' : 'Cl · 2, 8, 7');
  attr(lNa, 'fill', t >= wt('S4', 'positive') - 0.1 ? NC : C.ink);
  fade(bNa, t, wt('S4', 'positive') - 0.1); fade(bCl, t, wt('S5', 'negative') - 0.1);
  pull.forEach(p => M.draw(p, t, wt('S6', 'pull') + 0.2, 0.5));
  M.vis(bc[0], t, wt('S5', 'argon') - 0.1, 1e9, POP); M.vis(bc[1], t, wt('S6', 'electrovalent') - 0.1, 1e9, POP);
});

/* ---------- B: side by side + think ---------- */
cmpSec({
  L: { lab: 'KOSSEL · GIVE AND TAKE', ic: 'gift', col: NC, title: 'Give and take', w: 'Giving', ex: K(`${N_('Na')}\\;\\xrightarrow{\\;${E_('e^-')}\\;}\\;${H_('Cl')}`), note: 'Like passing a toy to a friend. One atom loses, the other gains.' },
  R: { lab: 'LEWIS · SHARE A PAIR', ic: 'handshake', col: C.ink, title: 'Share a pair', w: 'Sharing', ex: K(`${N_('Cl')}\\;${E_(':')}\\;${N_('Cl')}`), note: 'Like two friends holding one toy. Both count the shared pair.' },
  think: { q: 'Two chlorine atoms bond. Do they give, or share?', opts: ['Give', 'Share'], right: 1, why: 'Both Cl atoms pull equally hard, so neither wins the electron. They share one pair.' },
  tOpts: wt('B2', 'give'), tWhy: wt('B3', 'Both'),
});

/* ---------- D: Lewis symbols ---------- */
const dsol = stepCard($('#dl'), 'LEWIS SYMBOLS · STEP BY STEP', '', [
  [K(`\\text{Count the valence (outer) } ${E_('e^-')}:\\ ${N_('C')} = ${G_('4')}`)],
  ['One dot per side: top, right, bottom, left'],
  ['After 4, pair up: N 5, O 6, F 7, Ne 8'],
  [K(`\\text{valence} = \\text{dots} \\;\\text{ or }\\; 8 - \\text{dots}`)]], 110, 110);
$('#dl').querySelectorAll('.sol .sx').forEach((e, i) => { if (i === 1 || i === 2) e.style.font = '600 26px Poppins'; });
const ds = $('#dS');
const kern = mk(ds, 'circle', { cx: 190, cy: 200, r: 50, fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const bigC = ptxt(ds, 190, 226, 'C', 72, NC);
const cDots = lewisPos(4, 190, 200, 78).map(p => dot(ds, p[0], p[1], HC, 7));
const cVal = txt(ds, 190, 330, 'valence 4', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 20 });
const dch = [chip($('#dr'), 340, 100, 'KERNEL: NUCLEUS + INNER e⁻', NC), chip($('#dr'), 340, 160, 'DOTS: OUTER e⁻', C.ink), chip($('#dr'), 340, 220, 'C: 4 VALENCE e⁻', GC)];
const ROW = [['N', 5, 'Nitrogen', 3], ['O', 6, 'Oxygen', 2], ['F', 7, 'Fluorine', 1], ['Ne', 8, 'Neon', 0]];
const rowD = ROW.map(([s, n, , v], i) => { const x = 130 + i * 175, g = mk(ds, 'g', {}); ptxt(g, x, 446, s, 40, s === 'Ne' ? C.mute : NC); const dd = lewisPos(n, x, 432, 40).map(p => dot(g, p[0], p[1], HC, 5.5)); const vl = txt(ds, x, 532, 'valence ' + v, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 18 }); return { g, dd, vl }; });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
sec('sD', T0('D1') - 0.1, tT + 0.1, t => {
  const z = OUT('T1');
  M.vis($('#dl'), t, T0('D1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#dr'), t, T0('D1') + 0.2, z, { dx: 60, dy: 0, ...O });
  dsol(t, T0('D1'), tDs);
  fade(bigC, t, T0('D1') + 0.4); M.draw(kern, t, wt('D1', 'kernel') - 0.1, 0.5);
  M.vis(dch[0], t, wt('D1', 'kernel') + 0.1, 1e9, POP); M.vis(dch[1], t, wt('D1', 'dots') - 0.1, 1e9, POP); M.vis(dch[2], t, wt('D2', 'four') - 0.1, 1e9, POP);
  ['top', 'right', 'bottom', 'left'].forEach((w, i) => fade(cDots[i], t, wt('D3', w) - 0.05, 1e9, 0.15));
  ROW.forEach(([, n, w], i) => { const tw = wt('D4', w); fade(rowD[i].g.querySelector('text'), t, tw - 0.15); rowD[i].dd.forEach((d, k) => fade(d, t, tw + k * 0.07, 1e9, 0.12)); fade(rowD[i].vl, t, T0('D5') + 1 + i * 0.25); });
  fade(cVal, t, T0('D5') + 0.6);
});

/* ---------- statement ---------- */
stmtSec(K(`${N_('Na')}\\,(2,8,${E_('1')}) \\rightarrow ${N_('Na^+')}\\,(2,8) \\qquad ${H_('Cl')}\\,(2,8,7) + ${E_('e^-')} \\rightarrow ${H_('Cl^-')}\\,(2,8,8)`), 'Atoms', 'giving', 'octet');

/* ---------- W: magnesium fluoride ---------- */
const wsol = stepCard($('#wl'), 'WORKED EXAMPLE', 'Magnesium (group 2) + fluorine (group 17): formula and electrovalence?', [
  [K(`${N_('Mg')} \\rightarrow ${N_('Mg^{2+}')} + 2${E_('e^-')}`)],
  [K(`2\\,${H_('F')} + 2${E_('e^-')} \\rightarrow 2\\,${H_('F^-')}`)],
  [K(`(+2) + 2(-1) = 0 \\Rightarrow ${N_('Mg')}${H_('F_2')}`)],
  [K(`\\text{electrovalence: } ${N_('Mg')}\\ ${G_('2')},\\ \\ ${H_('F')}\\ ${G_('1')}`)]], 196, 90);
const ws = $('#wS');
const mgP = lewisPos(2, 392, 170, 50, [3, 1, 0, 2]);
ptxt(ws, 392, 190, 'Mg', 54, NC);
const mgD = mgP.map(p => dot(ws, p[0], p[1], EC, 7));
const FS = [[170, [0, 3, 2, 1]], [614, [0, 1, 2, 3]]].map(([x, ord]) => { const g = mk(ws, 'g', {}); ptxt(g, x, 396, 'F', 46, HC); const pos = lewisPos(8, x, 380, 42, ord); pos.slice(0, 7).forEach(p => dot(g, p[0], p[1], HC, 6)); const ch = ptxt(ws, x + 44, 344, '−', 34, HC); return { g, tgt: pos[7], ch }; });
const mgCh = ptxt(ws, 452, 140, '2+', 30, NC);
const wc = [chip($('#wr'), 36, 470, 'Mg²⁺ · 2, 8 LIKE Ne', NC), chip($('#wr'), 36, 520, 'ONE F TAKES ONLY ONE e⁻ · SO TWO F', C.ink), chip($('#wr'), 560, 80, 'MgF₂', GC), chip($('#wr'), 400, 470, 'ELECTROVALENCE Mg 2 · F 1', GC)];
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
sec('sW', tW1 - 0.1, tX1 + 0.1, t => {
  const out = OUT('X1');
  M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...O }); M.vis($('#wlq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
  wsol(t, tW1, tWs);
  M.vis($('#wr'), t, T0('W2') - 0.1, out, { dx: 60, dy: 0, ...O });
  FS.forEach((f, j) => { fade(f.g, t, wt('W2', 'Fluorine') - 0.1 + j * 0.2); const u = M.io((t - wt('W3', 'gives') - j * 0.35) / 0.9), q = lerp2(mgP[j], f.tgt, u); mv(mgD[j], q[0], q[1]); fade(f.ch, t, wt('W4', 'minus') - 0.1); });
  fade(mgCh, t, wt('W3', 'plus') - 0.1);
  M.vis(wc[0], t, wt('W3', 'neon') - 0.1, 1e9, POP); M.vis(wc[1], t, wt('W4', 'two') - 0.1, 1e9, POP); M.vis(wc[2], t, wt('W5', 'formula') - 0.1, 1e9, POP); M.vis(wc[3], t, T0('W6') + 0.3, 1e9, POP);
});

/* ---------- exam + ending ---------- */
endSec({
  trap: { wrong: 'Na gains 7 electrons to complete its octet', right: `${K(`${N_('Na')} \\rightarrow ${N_('Na^+')} + ${E_('e^-')}`)}: losing 1 is far easier than gaining 7`, tm: [['GAIN 7', 'HARD'], ['LOSE 1', 'EASY']], tTm: [wt('X3', 'gaining'), wt('X3', 'loses')], tRight: wt('X3', 'Sodium') - 0.2 },
  where: 'Lewis symbols, the octet rule, formula and electrovalence of ions',
  mcq: { q: 'X is in group 2 and Y is in group 17. They combine by electron transfer. Which is correct?', opts: ['XY₂ · electrovalence of X is 2', 'X₂Y · electrovalence of X is 1', 'XY₂ · electrovalence of X is 1', 'XY · electrovalence of X is 2'], right: 0 },
  tOpts: wt('Q1', 'Element') + 0.3,
  sol: [[K(`\\mathrm{X} \\rightarrow \\mathrm{X^{2+}} + 2${E_('e^-')}`)], [K(`\\mathrm{Y} + ${E_('e^-')} \\rightarrow \\mathrm{Y^-}\\ (\\times 2)`)], [K(`(+2) + 2(-1) = 0`)], [K(`\\mathrm{XY_2},\\ \\text{electrovalence } ${G_('2')}\\ \\checkmark`)]],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Balanced')],
  fc: { title: 'Recap · Kossel-Lewis approach and octet rule', txt: [1, 0, 1, 1, 1], lines: [
    '<b>Octet rule</b>: atoms give, take or share e⁻ to reach 8 (He: 2)',
    K(`${N_('Na')} \\rightarrow ${N_('Na^+')} + ${E_('e^-')} \\qquad ${H_('Cl')} + ${E_('e^-')} \\rightarrow ${H_('Cl^-')} \\qquad \\text{(ionic)}`),
    '<b>Covalent</b>: two Cl atoms share one pair, each counts 8',
    '<b>Lewis symbol</b>: dots = valence e⁻ · valence = dots or 8 − dots',
    '<b>Electrovalence</b> = charge on the ion · MgF₂: Mg 2, F 1'] },
  yq: ['Why do noble gases almost never react?', 'Draw the Lewis symbol of nitrogen.', 'Which bond forms when atoms share electrons?'],
  next: ['NEXT · EP 39', 'Where does salt get its strength? Ionic Bond and Lattice Enthalpy'],
});

run();
})();
