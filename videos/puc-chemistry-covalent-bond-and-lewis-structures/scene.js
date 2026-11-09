// PUC Chemistry Ep 40: Covalent Bond and Lewis Structures (Molecule bench)
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
  jobs: [['droplet', 'Water', 'IN A GLASS', 'Water', 'H₂O', 'SHARED PAIRS'], ['cup', 'Sugar', 'IN YOUR TEA', 'Sugar', 'C₁₂H₂₂O₁₁', 'SHARED PAIRS'], ['flame', 'Cooking gas', 'KITCHEN CYLINDER', 'Cooking', 'C₄H₁₀', 'SHARED PAIRS']],
  tEw: [0, 1, 2].map(i => wt('H2', 'sharing') + i * 0.15), tPill: wt('H2', 'ions'),
  kit: [['flame', 'Sugar melts', wt('H3', 'sugar')], ['cube', 'Salt does not', wt('H3', 'salt')], ['help', 'Why so different?', wt('H3', 'different')]], tTease: wt('H5', 'Lewis'),
});

/* ---------- P: sharing toys, bond types ---------- */
const ps = $('#pS');
mk(ps, 'line', { x1: 840, y1: 90, x2: 840, y2: 460, stroke: C.line, 'stroke-width': 2 });
const hA = [[240, 'H'], [600, 'H']].map(([x, s]) => { const g = mk(ps, 'g', {}); mk(g, 'circle', { cx: x, cy: 250, r: 46, fill: NC }); ptxt(g, x, 264, s, 40, '#fff'); return g; });
const hE = [dot(ps, 300, 250, EC, 9), dot(ps, 540, 250, EC, 9)];
const hR = [240, 600].map(x => mk(ps, 'ellipse', { cx: (x + 420) / 2, cy: 250, rx: 150, ry: 96, fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '8 8' }));
const hN = [240, 600].map(x => txt(ps, x, 140, '2', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 34 }));
const hBond = mk(ps, 'line', { x1: 286, y1: 250, x2: 554, y2: 250, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
const hc = [chip($('#pw'), 48, 400, 'EACH HAS ONE · EACH WANTS TWO', C.ink), chip($('#pw'), 48, 460, 'ONE SHARED PAIR = ONE LINE · H-H', NC)];
const BT = [['\\mathrm{H{-}H}', 'Single bond', '1 SHARED PAIR', ['P3', 'single']], ['\\mathrm{O{=}O}', 'Double bond', '2 SHARED PAIRS', ['P4', 'double']], ['\\mathrm{N{\\equiv}N}', 'Triple bond', '3 SHARED PAIRS', ['P4', 'triple']], [`\\mathrm{H{-}}${V_('\\ddot{\\mathrm{O}}')}\\mathrm{{-}H}`, 'Lone pair', 'NOT SHARED', ['P5', 'lone']]];
$('#pT').innerHTML = BT.map(([f, n, e], i) => `<div class="mrow" id="bt${i}" style="left:900px;right:48px;top:${100 + i * 92}px"><span style="display:inline-block;width:150px;font-size:34px">${K(f)}</span>${n}<em>${e}</em></div>`).join('');
sec('sP', tP1 - 0.1, T0('S1') + 0.1, t => {
  M.vis($('#pw'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...O });
  hA.forEach((g, i) => fade(g, t, wt('P1', 'kids') - 0.1 + i * 0.2)); hE.forEach((d, i) => fade(d, t, wt('P1', 'one') + i * 0.2));
  const u = M.io((t - wt('P2', 'shared')) / 0.8), lb = M.clamp((t - wt('P3', 'line') + 0.1) / 0.4);
  mv(hE[0], M.lerp(300, 410, u), 250); mv(hE[1], M.lerp(540, 430, u), 250);
  hE.forEach(d => { if (t >= wt('P3', 'line') - 0.1) d.style.opacity = (1 - lb).toFixed(3); });
  hR.forEach((r, i) => M.draw(r, t, wt('P2', 'both') - 0.1 + i * 0.25, 0.5)); hN.forEach((n, i) => fade(n, t, wt('P2', 'count') + i * 0.2));
  M.draw(hBond, t, wt('P3', 'line') - 0.1, 0.4);
  M.vis(hc[0], t, wt('P1', 'wants') - 0.1, 1e9, POP); M.vis(hc[1], t, wt('P3', 'single') - 0.1, 1e9, POP);
  BT.forEach((b, i) => M.vis($('#bt' + i), t, wt(...b[3]) - 0.15, 1e9, { dx: 24, dy: 0 }));
  M.vis($('#pP'), t, wt('P5', 'stay') - 0.1, 1e9, POP);
});

/* ---------- S: building molecules (bench) + count table ---------- */
const ks = $('#kS'), Y1 = 190, Y2 = 420;
// a Lewis atom: symbol + dots; returns {g, ds}
const latom = (x, y, s, n, ord, col = NC, r = 52, fs = 58) => { const g = mk(ks, 'g', {}); ptxt(g, x, y + fs * 0.36, s, fs, col); const pos = lewisPos(n, x, y, r, ord); const ds = pos.map(p => dot(g, p[0], p[1], HC, 7)); return { g, ds, pos }; };
const cnt = (x, y, s) => txt(ks, x, y, s, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 30 });
// molecule specs: atoms, moving dots [atom, dot index, target]
const MOL = {
  cl: { a: [latom(290, Y1, 'Cl', 7, [0, 3, 2, 1]), latom(490, Y1, 'Cl', 7, [0, 1, 2, 3])], mv: [[0, 6, [382, Y1]], [1, 6, [398, Y1]]], n: [cnt(290, Y1 - 70, '8'), cnt(490, Y1 - 70, '8')] },
  w: { a: [latom(390, Y2, 'O', 6, [0, 2, 3, 1]), latom(230, Y2, 'H', 1, [1], HC), latom(550, Y2, 'H', 1, [3], HC)], mv: [[0, 4, [318, Y2]], [1, 0, [302, Y2]], [0, 5, [462, Y2]], [2, 0, [478, Y2]]], n: [cnt(390, Y2 - 70, '8'), cnt(230, Y2 - 60, '2'), cnt(550, Y2 - 60, '2')] },
  o: { a: [latom(290, Y1, 'O', 6, [0, 3, 2, 1]), latom(490, Y1, 'O', 6, [0, 1, 2, 3])], mv: [[0, 4, [382, Y1 + 9]], [0, 5, [382, Y1 - 9]], [1, 4, [398, Y1 + 9]], [1, 5, [398, Y1 - 9]]], n: [cnt(290, Y1 - 70, '8'), cnt(490, Y1 - 70, '8')] },
  n: { a: [latom(290, Y2, 'N', 5, [3, 0, 2, 1]), latom(490, Y2, 'N', 5, [1, 0, 2, 3])], mv: [[0, 2, [382, Y2 - 18]], [0, 3, [382, Y2 + 18]], [0, 4, [382, Y2]], [1, 2, [398, Y2 - 18]], [1, 3, [398, Y2 + 18]], [1, 4, [398, Y2]]], n: [cnt(290, Y2 - 70, '8'), cnt(490, Y2 - 70, '8')] },
};
Object.values(MOL).forEach(m => m.mv.forEach(([ai, di]) => attr(m.a[ai].ds[di], 'fill', EC)));
const sc = { cl: chip($('#sk'), 36, 270, 'Cl₂ · SINGLE BOND', NC), w: chip($('#sk'), 36, 500, 'H₂O · O COUNTS 8 · H COUNTS 2', NC), o: chip($('#sk'), 36, 270, 'O₂ · DOUBLE BOND', NC), n: chip($('#sk'), 36, 500, 'N₂ · TRIPLE BOND', NC) };
const ST = { cl: [wt('S1', 'chlorine'), wt('S2', 'moves'), wt('S2', 'eight'), wt('S2', 'single'), T0('S3') + 0.5, T0('S5') - 0.3], w: [wt('S3', 'water'), wt('S4', 'shares'), wt('S4', 'eight'), wt('S4', 'helium'), wt('S4', 'two'), T0('S5') - 0.3], o: [wt('S5', 'oxygen'), wt('S5', 'share'), wt('S5', 'double') + 0.3, wt('S5', 'double'), 0, 1e9], n: [wt('S6', 'nitrogen'), wt('S6', 'Three', 1), wt('S6', 'triple') + 0.3, wt('S6', 'triple'), 0, 1e9] };
const TR = [['\\mathrm{Cl_2}', '1 shared pair', 'LONE PAIRS 6', 'cl'], ['\\mathrm{H_2O}', '2 shared pairs', 'LONE PAIRS 2', 'w'], ['\\mathrm{O_2}', '2 shared pairs', 'LONE PAIRS 4', 'o'], ['\\mathrm{N_2}', '3 shared pairs', 'LONE PAIRS 2', 'n']];
$('#sbT').innerHTML = TR.map(([f, b, l], i) => `<div class="mrow" id="tr${i}" style="top:${100 + i * 92}px"><span style="display:inline-block;width:130px;font-size:32px">${K(f)}</span><span class="tb">${b}</span><em>${l}</em></div>`).join('');
const sbc = chip($('#sb'), 36, 480, 'EVERY ATOM FULL · H 2, OTHERS 8', OKC);
sec('sS', T0('S1') - 0.1, T0('B1') + 0.1, t => {
  const z = OUT('B1');
  M.vis($('#sk'), t, T0('S1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#sb'), t, T0('S1') + 0.25, z, { dx: 60, dy: 0, ...O });
  Object.entries(MOL).forEach(([k, m]) => {
    const [tin, tmv, tn, tch, tn2, tout] = ST[k];
    m.a.forEach((a, i) => fade(a.g, t, tin - 0.1 + i * 0.15, tout)); const u = M.io((t - tmv) / 0.8);
    m.mv.forEach(([ai, di, tg]) => { const q = lerp2(m.a[ai].pos[di], tg, u); mv(m.a[ai].ds[di], q[0], q[1]); });
    m.n.forEach((n, i) => fade(n, t, (k === 'w' && i ? tn2 : tn) - 0.1, tout)); M.vis(sc[k], t, tch - 0.1, tout, { ...POP, outDur: 0.25, ody: 0 });
  });
  TR.forEach((r, i) => { const el = $('#tr' + i); M.vis(el, t, T0('S1') + 0.6 + i * 0.12, 1e9, { dx: 24, dy: 0 }); fade(el.querySelector('.tb'), t, ST[r[3]][3] + 0.1); fade(el.querySelector('em'), t, ST[r[3]][3] + 0.4); setBg(el, t >= ST[r[3]][3] + 0.1 ? C.ac2 : C.soft); });
  M.vis(sbc, t, T0('S6') + 3.2, 1e9, POP);
});

/* ---------- B ---------- */
cmpSec({
  L: { lab: 'IONIC · ELECTRONS MOVE', ic: 'gift', col: NC, title: 'Ionic: move', w: 'Ionic', ex: K(`${N_('Na')}\\;\\xrightarrow{\\;${E_('e^-')}\\;}\\;${H_('Cl')}`), note: 'Electrons move from one atom to another. Ions form.' },
  R: { lab: 'COVALENT · ELECTRONS SHARED', ic: 'handshake', col: C.ink, title: 'Covalent: share', w: 'Covalent', ex: K(`\\mathrm{H}\\,${E_(':')}\\,${N_('O')}\\,${E_(':')}\\,\\mathrm{H}`), note: 'Electrons are shared between atoms. Molecules form.' },
  think: { q: 'In water, does oxygen take the H electrons, or share them?', opts: ['Take', 'Share'], right: 1, why: 'O and H are both non metals, so they share pairs.' },
  tOpts: wt('B2', 'take'), tWhy: wt('B3', 'Oxygen'),
});

/* ---------- D: recipe + HCN on the bench ---------- */
const dsol = stepCard($('#dl'), 'LEWIS STRUCTURE · RECIPE', '', [
  ['Count all valence e⁻ (anion +1, cation −1 per charge)'],
  ['Skeleton: least electronegative atom in the middle'],
  ['Connect with single bonds: 2 e⁻ each'],
  ['Lone pairs to fill octets, then double or triple bonds']], 110, 110);
$('#dl').querySelectorAll('.sol .sx').forEach(e => { e.style.font = '600 25px Poppins'; });
const ds = $('#dS'), YD = 330;
const dA = [[180, 'H', HC], [392, 'C', NC], [604, 'N', NC]].map(([x, s, c]) => ptxt(ds, x, YD + 18, s, 50, c));
const dB = [mk(ds, 'line', { x1: 214, y1: YD, x2: 356, y2: YD, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }), mk(ds, 'line', { x1: 428, y1: YD, x2: 568, y2: YD, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' })];
const dT = [-12, 12].map(o => mk(ds, 'line', { x1: 428, y1: YD + o, x2: 568, y2: YD + o, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' }));
const nLP = [0, 1, 2].map(s => pairAt(604, YD - 4, s, 46).map(p => dot(ds, p[0], p[1], VC, 6.5)));
const dCnt = txt(ds, 392, 182, '', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 30 });
const dc = [chip($('#dr'), 36, 84, 'TRY IT · HCN', C.ink), chip($('#dr'), 36, 214, 'ION? −1 CHARGE: ADD 1 e⁻ · +1: TAKE 1', C.mute), chip($('#dr'), 36, 470, 'C IN THE MIDDLE · H AT THE END', NC), chip($('#dr'), 36, 520, 'N SHARES 2 LONE PAIRS · H-C≡N', OKC)];
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
sec('sD', T0('D1') - 0.1, tT + 0.1, t => {
  const z = OUT('T1');
  M.vis($('#dl'), t, T0('D1') + 0.05, z, { dx: -60, dy: 0, ...O }); M.vis($('#dr'), t, T0('D1') + 0.2, z, { dx: 60, dy: 0, ...O });
  dsol(t, T0('D1'), tDs);
  M.vis(dc[0], t, T0('D1') + 0.5, 1e9, POP);
  fade(dCnt, t, wt('D2', 'Add')); M.setT(dCnt, t < wt('D4', 'single') ? 'H 1 + C 4 + N 5 = 10 e⁻' : t < wt('D5', 'rest') ? '10 − 4 = 6 e⁻ LEFT' : t < wt('D5', 'short') ? '6 → N · C HAS ONLY 4' : 'ALL FULL · 10 e⁻ USED');
  attr(dCnt, 'fill', t >= wt('D5', 'rest') && t < wt('D5', 'turn') ? XC : GC);
  M.vis(dc[1], t, wt('D2', 'negative') - 0.1, wt('D3', 'skeleton') - 0.1, { ...POP, outDur: 0.25, ody: 0 });
  dA.forEach((a, i) => fade(a, t, wt('D3', 'skeleton') + [0.3, 0, 0.5][i] + (i === 0 ? 0 : 0))); M.vis(dc[2], t, wt('D3', 'middle') - 0.1, 1e9, POP);
  dB.forEach((b, i) => M.draw(b, t, wt('D4', 'Join') + i * 0.3, 0.4));
  nLP.forEach((pr, s) => { const tin = wt('D5', 'lone') + s * 0.15; pr.forEach(d => fade(d, t, tin, 1e9, 0.15)); });
  const u = M.io((t - wt('D5', 'turn')) / 0.8), tgt = [[[480, YD - 12], [516, YD - 12]], null, [[480, YD + 12], [516, YD + 12]]];
  [0, 2].forEach(s => nLP[s].forEach((d, k) => { const q = lerp2(pairAt(604, YD - 4, s, 46)[k], tgt[s][k], u); mv(d, q[0], q[1]); if (u > 0) d.style.opacity = (1 - M.clamp((u - 0.7) / 0.3)).toFixed(3); }));
  dT.forEach(l => M.draw(l, t, wt('D5', 'turn') + 0.7, 0.4)); M.vis(dc[3], t, wt('D5', 'triple') - 0.1, 1e9, POP);
});

stmtSec(K(`\\text{total } ${E_('e^-')} = \\text{bond } ${E_('e^-')} + ${V_('\\text{lone pair } e^-')}`), 'Count', 'check', 'octet');

/* ---------- W: CO2 ---------- */
const wsol = stepCard($('#wl'), 'WORKED EXAMPLE', 'Draw the Lewis structure of carbon dioxide, CO₂.', [
  [K(`${N_('C')}\\ 4 + 2 \\times ${H_('O')}\\ 6 = ${G_('16')}`)],
  [K(`\\mathrm{O{-}C{-}O}:\\ 4\\ \\text{used},\\ ${G_('12')}\\ \\text{left}`)],
  [K(`6\\ \\text{to each O} \\Rightarrow ${N_('C')}\\ \\text{has only } ${R_('4')}`)],
  [K(`\\text{each O shares one } ${V_('\\text{lone pair}')}`)],
  [K(`\\mathrm{O{=}C{=}O}:\\ \\text{all } 8,\\ ${G_('16')}\\ \\text{used}\\ \\checkmark`)]], 170, 76);
const ws = $('#wS'), YW = 280;
const wA = [[180, 'O', HC], [392, 'C', NC], [604, 'O', HC]].map(([x, s, c]) => ptxt(ws, x, YW + 18, s, 50, c));
const wV = [lewisPos(6, 180, YW - 4, 46, [0, 2, 3, 1]), lewisPos(4, 392, YW - 4, 46), lewisPos(6, 604, YW - 4, 46, [0, 2, 1, 3])].map(ps => ps.map(p => dot(ws, p[0], p[1], HC, 6)));
const wB = [mk(ws, 'line', { x1: 214, y1: YW, x2: 356, y2: YW, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }), mk(ws, 'line', { x1: 428, y1: YW, x2: 568, y2: YW, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' })];
const wD = [mk(ws, 'line', { x1: 214, y1: YW - 12, x2: 356, y2: YW - 12, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' }), mk(ws, 'line', { x1: 428, y1: YW - 12, x2: 568, y2: YW - 12, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' })];
// lone pairs after connect: left O sides top(0), left(3), bottom(2); right O top(0), right(1), bottom(2)
const wL = [[180, [0, 3, 2]], [604, [0, 1, 2]]].map(([x, ss]) => ss.map(s => ({ s, x, d: pairAt(x, YW - 4, s, 46).map(p => dot(ws, p[0], p[1], VC, 6.5)) })));
const wCnt = txt(ws, 392, 150, '', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 30 });
const wc = [chip($('#wr'), 36, 470, 'C ONLY 4 · NOT FULL', XC), chip($('#wr'), 36, 520, 'O=C=O · EVERY ATOM 8', OKC)];
const tWs = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];
sec('sW', tW1 - 0.1, T0('C1') + 0.1, t => {
  const out = OUT('C1');
  M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...O }); M.vis($('#wlq'), t, tW1 + 0.4, 1e9, { dy: 14 });
  wsol(t, tW1, tWs);
  M.vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...O });
  wA.forEach((a, i) => fade(a, t, tW1 + 0.6 + i * 0.15));
  const tC = wt('W3', 'Connect');
  wV.forEach((g, i) => g.forEach((d, k) => fade(d, t, wt('W2', i === 1 ? 'Carbon' : 'oxygen') + k * 0.06, tC + 0.2, 0.15)));
  fade(wCnt, t, wt('W2', 'sixteen') - 0.1); M.setT(wCnt, t < wt('W3', 'Twelve') ? '16 e⁻ TO PLACE' : t < wt('W4', 'Give') ? '12 LEFT' : t < wt('W6', 'Every') ? '0 LEFT · CHECK C' : '16 USED · ALL 8');
  wB.forEach((b, i) => M.draw(b, t, wt('W3', 'single') + i * 0.3, 0.4));
  const u = M.io((t - wt('W5', 'turns')) / 0.8);
  wL.forEach((side, j) => side.forEach(({ s, x, d }, k) => { d.forEach((e, m) => fade(e, t, wt('W4', 'six') + (j * 3 + k) * 0.1, 1e9, 0.15)); if (s === 0) { const tg = j ? [[480, YW - 12], [516, YW - 12]] : [[268, YW - 12], [304, YW - 12]]; d.forEach((e, m) => { const q = lerp2(pairAt(x, YW - 4, 0, 46)[m], tg[m], u); mv(e, q[0], q[1]); if (u > 0) e.style.opacity = (1 - M.clamp((u - 0.7) / 0.3)).toFixed(3); }); } }));
  wD.forEach(l => M.draw(l, t, wt('W5', 'turns') + 0.7, 0.4));
  M.vis(wc[0], t, wt('W4', 'only') - 0.1, wt('W5', 'turns'), { ...POP, outDur: 0.25, ody: 0 }); M.vis(wc[1], t, wt('W6', 'double') - 0.1, 1e9, POP);
});

/* ---------- C: coordinate bond (ISC) ---------- */
const cS = $('#cS'), NX = 360, NY = 360;
const cN = ptxt(cS, NX, NY + 18, 'N', 50, NC);
const cH = [[NX - 130, NY], [NX + 130, NY], [NX, NY + 130]].map(([x, y]) => ({ t: ptxt(cS, x, y + 16, 'H', 44, HC), l: mk(cS, 'line', { x1: NX + (x - NX) * 0.25, y1: NY + (y - NY) * 0.25, x2: NX + (x - NX) * 0.78, y2: NY + (y - NY) * 0.78, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }) }));
const cLP = pairAt(NX, NY - 4, 0, 46).map(p => dot(cS, p[0], p[1], VC, 7));
const cHp = mk(cS, 'g', {}); ptxt(cHp, NX, 186, 'H⁺', 44, HC); txt(cHp, NX + 50, 176, '0 e⁻', { fill: C.mute, 'font-weight': 600, 'font-size': 18 });
const cArr = PUC.arrow(cS, VC, 5, 16);

const CR = [['Coordinate bond', 'BOTH e⁻ FROM ONE ATOM', ['C1', 'coordinate']], [K(`\\mathrm{NH_3} + \\mathrm{H^+} \\rightarrow \\mathrm{NH_4^+}`), 'AMMONIUM ION', ['C3', 'ammonium']], [`Drawn as an arrow ${K(`\\mathrm{N} \\rightarrow \\mathrm{H}`)}`, 'FROM THE GIVER', ['C3', 'arrow']]];
$('#crs').innerHTML = CR.map(([a, b], i) => `<div class="mrow" id="cr${i}" style="left:860px;right:48px;top:${120 + i * 100}px;height:76px">${a}<em>${b}</em></div>`).join('');
const ccp = [chip($('#cw'), 560, 300, 'NH₃ · LONE PAIR ON N', VC), chip($('#cw'), 560, 150, 'H⁺ · NO ELECTRONS', C.ink), chip($('#cw'), 560, 440, 'NH₄⁺ · AMMONIUM ION', NC)];
sec('sC', T0('C1') - 0.1, tX1 + 0.1, t => {
  M.vis($('#cw'), t, T0('C1') + 0.05, OUT('X1'), { dy: 36, ...O });
  CR.forEach((c, i) => M.vis($('#cr' + i), t, wt(...c[2]) - 0.15, 1e9, { dx: 24, dy: 0 }));
  fade(cN, t, T0('C1') + 0.6); cH.forEach((h, i) => { fade(h.t, t, T0('C1') + 0.9 + i * 0.15); M.draw(h.l, t, T0('C1') + 1 + i * 0.15, 0.4); });
  cLP.forEach(d => fade(d, t, T0('C1') + 1.4)); M.vis(ccp[0], t, wt('C2', 'lone') - 0.1, 1e9, POP);
  fade(cHp, t, wt('C2', 'hydrogen') - 0.1); M.vis(ccp[1], t, wt('C2', 'electrons') - 0.1, 1e9, POP);
  const u = M.io((t - wt('C3', 'gives')) / 0.8), tg = [[NX - 11, 258], [NX + 11, 258]];
  cLP.forEach((d, k) => { const q = lerp2(pairAt(NX, NY - 4, 0, 46)[k], tg[k], u); mv(d, q[0], q[1]); if (t >= wt('C3', 'arrow')) d.style.opacity = (1 - M.clamp((t - wt('C3', 'arrow')) / 0.3)).toFixed(3); });
  const ua = M.io((t - wt('C3', 'arrow')) / 0.5); if (ua > 0) cArr.set(NX, NY - 44, NX, M.lerp(NY - 44, 204, ua)); else cArr.set(0, 0, 0, 0);
  M.vis(ccp[2], t, wt('C3', 'ammonium') - 0.1, 1e9, POP);
});

endSec({
  trap: { wrong: 'Count only the bonds: water has 4 electrons', right: `2 bonds (4) + 2 lone pairs (4) = 8 = ${K(`1 + 1 + 6`)}`, tm: [['BONDS ONLY', '4 · WRONG'], ['BONDS + LONE', '8 · RIGHT']], tTm: [wt('X3', 'bonds'), wt('X3', 'Eight')], tRight: wt('X3', 'In') - 0.1 },
  where: 'Drawing Lewis structures, and counting bond pairs and lone pairs',
  mcq: { q: 'Lewis structure of NF₃: total valence electrons, and lone pairs on N?', opts: ['26 e⁻ · 1 lone pair on N', '24 e⁻ · 1 lone pair on N', '26 e⁻ · no lone pair on N', '26 e⁻ · 2 lone pairs on N'], right: 0 },
  tOpts: wt('Q1', 'find'),
  sol: [[K(`${N_('N')}\\ 5 + 3 \\times ${H_('F')}\\ 7 = ${G_('26')}`)], [K(`3\\ \\text{bonds} = 6,\\ \\ 3 \\times 6 = 18`)], [K(`26 - 24 = 2 \\Rightarrow ${V_('1\\ \\text{lone pair}')}`)], [K(`\\text{(A)}\\ \\checkmark`)]],
  tSo: [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'pair')],
  fc: { title: 'Recap · covalent bond and Lewis structures', txt: [1, 0, 1, 0, 1], lines: [
    '<b>Covalent bond</b>: a shared pair of e⁻ · lone pairs stay on one atom',
    K(`\\mathrm{Cl{-}Cl}\\ \\text{single} \\qquad \\mathrm{O{=}O}\\ \\text{double} \\qquad \\mathrm{N{\\equiv}N}\\ \\text{triple}`),
    '<b>Recipe</b>: count, connect, complete, then check every octet',
    K(`\\mathrm{CO_2}:\\ 4 + 2(6) = ${G_('16')} \\Rightarrow \\mathrm{O{=}C{=}O}`),
    '<b>Coordinate bond</b>: both e⁻ from one atom · NH₃ + H⁺ → NH₄⁺'] },
  yq: ['What is the difference between a lone pair and a bond pair?', 'How many valence electrons does CO₂ have in total?', 'How many shared pairs are there in a nitrogen molecule?'],
  next: ['NEXT · EP 41', 'Two structures both look right. Which is better? Formal Charge'],
});

run();
})();
