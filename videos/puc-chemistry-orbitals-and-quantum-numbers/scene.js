// PUC Chemistry Ep 22: Orbitals and quantum numbers (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, counter, recap): n teal (shells), l violet (subshells), m_l gold (orbitals), m_s / electron orange (spin arrows)
const NC = C.ac, LC = '#7A4FE0', MC = '#B7791F', EC = '#C8461B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const pick = (keys, t) => { let v = keys[0][1]; for (const [a, s] of keys) if (t >= a) v = s; return v; };
// LaTeX colour helpers
const cN = s => `\\textcolor{${NC}}{${s}}`, cL = s => `\\textcolor{${LC}}{${s}}`, cM = s => `\\textcolor{${MC}}{${s}}`, cE = s => `\\textcolor{${EC}}{${s}}`;
const n_ = cN('n'), l_ = cL('l'), ml_ = cM('m_l'), ms_ = cE('m_s');

Object.assign(M.IC, {
  ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M13 5v2', 'M13 17v2', 'M13 11v2'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  mail: ['m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
  pinM: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  upA: ['M12 19V5', 'm5 12 7-7 7 7'], dnA: ['M12 5v14', 'm19 12-7 7-7-7'],
  orbit: ['M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS4 = T0('S4'), tS7 = T0('S7'), tS9 = T0('S9'), tS10 = T0('S10');
const tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three tickets ---------- */
const JOBS = [['ticket', 'Cinema ticket', 'ONE SEAT', 'cinema', 'ROW F · SEAT 12'], ['train', 'Train ticket', 'ONE BERTH', 'train', 'S3 · BERTH 21'], ['mail', 'Letter', 'ONE HOME', 'letter', 'HOUSE · STREET · CITY']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="adr" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['user', 'Name', 'Name'], ['home', 'House', 'house'], ['pinM', 'Street', 'street'], ['mail', 'Pin code', 'pin']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: the cloud + four numbers ---------- */
$('#odefI').innerHTML = M.icon('orbit', 30, '#fff', 2);
const cs = $('#cS'), CX = 392, CY = 344;
const rnd = M.rng(22), DOTS = [];
for (let i = 0; i < 420; i++) { const r = -46 * Math.log(1 - rnd() * 0.985), a = rnd() * Math.PI * 2; if (r > 190) continue; DOTS.push(mk(cs, 'circle', { cx: (CX + r * Math.cos(a)).toFixed(1), cy: (CY + r * Math.sin(a)).toFixed(1), r: 3.2, fill: C.ink2 })); }
const bnd = mk(cs, 'circle', { cx: CX, cy: CY, r: 150, fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '10 9' });
const nuc0 = mk(cs, 'g', {}); mk(nuc0, 'circle', { cx: CX, cy: CY, r: 16, fill: C.ink }); txt(nuc0, CX, CY + 7, '+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#fff' });
const cTag = document.createElement('div'); cTag.className = 'btag'; cTag.style.cssText = 'left:36px;top:498px;background:#FBEDE6;color:#C8461B'; cTag.textContent = 'ONE ORBITAL · AT MOST 2 e⁻'; $('#poIn').appendChild(cTag);
const cTag2 = document.createElement('div'); cTag2.className = 'btag'; cTag2.style.cssText = 'right:36px;top:498px;background:var(--ac2);color:#0B7676'; cTag2.textContent = 'THICK DOTS · OFTEN HERE'; $('#poIn').appendChild(cTag2);
const QN = [[n_, 'Principal', 'Which shell: its size and energy', 'SHELL', NC], [l_, 'Azimuthal', 'Which subshell: the orbital shape', 'SHAPE', LC], [ml_, 'Magnetic', 'Which way the orbital points', 'DIRECTION', MC], [ms_, 'Spin', 'Which way the electron spins', 'SPIN', EC]];
$('#qrs').innerHTML = QN.map(([s, n, d, k, c], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 112}px"><div class="qs">${K(s)}</div><div class="qt">${n}</div><div class="qd">${d}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const P4W = M.L('P4').words, tQn = [0, 0, 0, 1].map((k, i) => { const h = P4W.filter(x => x.w.toLowerCase().replace(/[^a-z]/g, '') === ['n', 'l', 'm', 'm'][i]); return (h[k] || P4W[0] || { t: 0 }).t; });

/* ---------- S: the bench ---------- */
const b = $('#bS');
const aG = mk(b, 'g', {});
const RR = [48, 90, 132, 174], SL = ['K', 'L', 'M', 'N'];
const rings = RR.map(r => mk(aG, 'circle', { cx: 0, cy: 0, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
mk(aG, 'circle', { cx: 0, cy: 0, r: 18, fill: C.ink }); txt(aG, 0, 8, '+', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: '#fff' });
const sLab = RR.map((r, i) => { const g = mk(aG, 'g', { transform: `translate(${(r * Math.cos(-0.82)).toFixed(1)} ${(r * Math.sin(-0.82)).toFixed(1)})` }); mk(g, 'circle', { r: 17, fill: NC }); txt(g, 0, 6, SL[i], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 17, fill: '#fff' }); return g; });
const nE = RR.map((r, i) => { const a = 2.4; return mk(aG, 'circle', { cx: (r * Math.cos(a)).toFixed(1), cy: (r * Math.sin(a)).toFixed(1), r: 7, fill: EC }); });
const aX = M.keys([[0, 392], [tS4, 178]], 1), aS = M.keys([[0, 1], [tS4, 0.8]], 1);
// subshell rows for n = 3 (columns line up by m_l)
const BX = 54, STEP = 58, COL0 = 546, ROWY = [112, 222, 332];
const rows = [0, 1, 2].map(l => {
  const g = mk(b, 'g', {}), y = ROWY[l];
  const lab = txt(g, 356, y + 38, 'l = ' + l, { 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 24, fill: LC });
  const lab2 = txt(g, 362, y + 40, '3' + 'spd'[l], { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: LC });
  const bx = [], ml = [];
  for (let m = -l; m <= l; m++) {
    const x = COL0 - BX / 2 + m * STEP;
    bx.push(mk(g, 'rect', { x, y, width: BX, height: BX, rx: 8, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.5 }));
    ml.push(txt(g, x + BX / 2, y + BX + 24, (m > 0 ? '+' : '') + m, { 'text-anchor': 'middle', 'font-size': 18, fill: MC, 'font-weight': 600 }));
  }
  return { g, lab, lab2, bx, ml };
});
const mlHdr = txt(b, COL0, 92, 'm_l', { 'text-anchor': 'middle', 'font-size': 18, fill: MC, 'font-weight': 600 });
const ARW = (p, up) => mk(p, 'path', { d: up ? 'M0 18 V-18 M-8 -9 L0 -18 L8 -9' : 'M0 -18 V18 M-8 9 L0 18 L8 9', stroke: EC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const PBX = COL0 - BX / 2 - STEP, PBY = ROWY[1];               // the 3p, m_l = -1 box
const eFly = mk(b, 'circle', { r: 9, fill: EC });
const aUp = ARW(b, true), aDn = ARW(b, false);
attr(aUp, 'transform', `translate(${PBX + 17} ${PBY + BX / 2})`); attr(aDn, 'transform', `translate(${PBX + BX - 17} ${PBY + BX / 2})`);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like a seat number for each electron!' });
// counter slots
const SLOTS = [[n_, 'PRINCIPAL'], [l_, 'AZIMUTHAL'], [ml_, 'MAGNETIC'], [ms_, 'SPIN']];
$('#slots').innerHTML = SLOTS.map(([s, nm], i) => `<div class="slot" id="sl${i}" style="left:${36 + i * 180}px"><div class="sy">${K(s)}</div><div class="sv" id="sv${i}">-</div><div class="sn">${nm}</div></div>`).join('');
// rule panes
const RP = [
  [`${n_} = 1, 2, 3, \\dots`, ['K<em>n = 1</em>', 'L<em>n = 2</em>', 'M<em>n = 3</em>', 'N<em>n = 4</em>'], 'THE RULE · SHELLS'],
  [`${l_} = 0, 1, \\dots, (${n_} - 1)`, ['s<em>l = 0</em>', 'p<em>l = 1</em>', 'd<em>l = 2</em>', 'f<em>l = 3</em>'], 'THE RULE · SUBSHELLS'],
  [`${ml_} = -${l_}, \\dots, 0, \\dots, +${l_}`, ['s<em>1 ORBITAL</em>', 'p<em>3</em>', 'd<em>5</em>'], 'THE RULE · ORBITALS'],
  [`${ms_} = +\\tfrac{1}{2} \\;\\text{or}\\; -\\tfrac{1}{2}`, [`${M.icon('upA', 30, EC, 3)}<em>+1/2</em>`, `${M.icon('dnA', 30, EC, 3)}<em>-1/2</em>`], 'THE RULE · SPIN']];
$('#rps').innerHTML = RP.map(([f, ch], i) => `<div class="rp" id="rp${i}"><div class="rf2">${K(f)}</div><div class="chs">${ch.map((c, k) => `<span id="rc${i}_${k}" style="color:${[NC, LC, MC, EC][i]}">${c}</span>`).join('')}</div></div>`).join('');
const S3W = M.L('S3').words, S6W = M.L('S6').words, S8W = M.L('S8').words;
const wIdx = (W, w, nth = 0) => { const h = W.filter(x => x.w.toLowerCase().replace(/[^a-z0-9]/g, '') === w); return (h[Math.min(nth, h.length - 1)] || W[0] || { t: 0 }).t; };
const tRp = [tS1, tS4, tS7, tS9];
const tRc = [[wIdx(S3W, 'k'), wIdx(S3W, 'l'), wIdx(S3W, 'm'), wIdx(S3W, 'n', 1)], [wIdx(S6W, 's'), wIdx(S6W, 'p'), wIdx(S6W, 'd'), wIdx(S6W, 'f')], [wIdx(S8W, 's'), wIdx(S8W, 'p'), wIdx(S8W, 'd')], [wt('S9', 'plus'), wt('S9', 'minus')]];
const tRow = [wt('S5', 'zero', 1), wt('S5', 'one', 1), wt('S5', 'two')];
const tLet = [wIdx(S6W, 's'), wIdx(S6W, 'p'), wIdx(S6W, 'd')];
const tFive = wIdx(S8W, 'five');
const VAL = [
  [[0, '-'], [wt('S2', 'one'), '1'], [wt('S2', 'two'), '2'], [wt('S2', 'three'), '3'], [tRc[0][0], '1'], [tRc[0][1], '2'], [tRc[0][2], '3'], [tRc[0][3], '4'], [tS4, '3']],
  [[0, '-'], [tRow[0], '0'], [tRow[1], '1'], [tRow[2], '2'], [tS10, '1']],
  [[0, '-'], [tFive, '-2'], [tFive + 0.35, '-1'], [tFive + 0.7, '0'], [tFive + 1.05, '+1'], [tFive + 1.4, '+2'], [tS10, '-1']],
  [[0, '-'], [wt('S9', 'plus'), '+1/2'], [wt('S9', 'minus'), '-1/2'], [tS10 + 0.2, '+1/2'], [wt('S10', 'partner'), '-1/2']]];
const tSlot = [tS1, tS4, tS7, tS9];
const th1 = PUC.think($('#th1'), { q: `Which address can really exist?`, opts: [K(`${n_} = 2,\\; ${l_} = 1`), K(`${n_} = 2,\\; ${l_} = 2`)], right: 0, why: `In shell 2, ${K(l_)} can be 0 or 1 only. There is no 2d orbital.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(${n_},\\; ${l_},\\; ${ml_},\\; ${ms_})`);

/* ---------- D: counting orbitals ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${l_} = 0, 1, \\dots, (n - 1) \\;\\to\\; n \\text{ values}`)],
  [K(`\\text{orbitals for each } ${l_} = 2${l_} + 1`)],
  [K(`1 + 3 + 5 + \\dots = n^2`)],
  [K(`\\text{electrons} \\le 2n^2`)]], { label: 'COUNTING ORBITALS · STEP BY STEP', y0: 110, dy: 112 });
const tDs = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Add'), wt('D5', 'Step')];
const ds = $('#dS'), DX0 = 130, DB = 24, DST = 28, DGAP = 12, DROWY = [86, 172, 258, 344];
const drows = [1, 2, 3, 4].map((n, ri) => {
  const g = mk(ds, 'g', {}), y = DROWY[ri];
  const lab = txt(g, 36, y + 19, 'n = ' + n, { 'font-size': 22, fill: NC, 'font-weight': 600 });
  const grp = []; let x = DX0;
  for (let l = 0; l < n; l++) {
    const bxs = []; for (let k = 0; k < 2 * l + 1; k++) { bxs.push(mk(g, 'rect', { x, y, width: DB, height: DB, rx: 5, fill: M.mix('#FFFFFF', LC, 0.12), stroke: LC, 'stroke-width': 2 })); if (k < 2 * l) x += DST; }
    const cx = (x + DB + (x - (2 * l) * DST)) / 2;
    grp.push({ bxs, lt: txt(g, cx, y + DB + 22, n + 'spdf'[l], { 'text-anchor': 'middle', 'font-size': 15, fill: LC, 'font-weight': 600 }) });
    x += DST + DGAP;
  }
  const tot = txt(g, 748, y + 21, `${n * n} = ${n}²`, { 'text-anchor': 'end', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
  return { lab, grp, tot };
});

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${l_} = 0, 1, 2 \\;\\to\\; 3s,\\; 3p,\\; 3d`)],
  [K(`1 + 3 + 5 \\text{ orbitals}`)],
  [K(`= 9 = 3^2 \\;\\checkmark`)],
  [K(`9 \\times 2 = \\textcolor{${EC}}{18} \\text{ electrons}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'l'), T0('W4'), T0('W5'), T0('W6')];
const wsv = $('#wS'), WB = 64, WST = 72, WC = 430, WROWY = [96, 196, 296];
const wrows = [0, 1, 2].map(l => {
  const g = mk(wsv, 'g', {}), y = WROWY[l];
  txt(g, 60, y + 44, '3' + 'spd'[l], { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 36, fill: LC });
  const bx = [], ar = [];
  for (let m = -l; m <= l; m++) { const x = WC - WB / 2 + m * WST; bx.push(mk(g, 'rect', { x, y, width: WB, height: WB, rx: 9, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.5 }));
    const u = ARW(g, true), d = ARW(g, false); attr(u, 'transform', `translate(${x + 20} ${y + WB / 2})`); attr(d, 'transform', `translate(${x + WB - 20} ${y + WB / 2})`); ar.push(u, d); }
  const cnt = txt(g, 748, y + 42, `${2 * l + 1} ORBITAL${l ? 'S' : ''}`, { 'text-anchor': 'end', 'font-size': 20, fill: MC, 'font-weight': 600 });
  return { g, bx, ar, cnt };
});
const wRd = txt(wsv, 392, 440, '', { 'text-anchor': 'middle', 'font-size': 32, fill: C.ink, 'font-weight': 600 });
const ALLAR = wrows.flatMap(r => r.ar);
const avD = PUC.avatar($('#wr'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Eighteen seats in the M shell!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Let ${K(l_)} go up to ${K(n_)}: write ${K('1p')} or ${K('2d')}`, right: `${K(l_)} stops at ${K(`${n_} - 1`)}: the first d orbitals are in shell 3` });
const tsv = $('#tS');
const gW = mk(tsv, 'g', {}); [['1p', 70], ['2d', 170]].forEach(([s, x]) => { mk(gW, 'rect', { x: x - 42, y: 74, width: 84, height: 84, rx: 12, fill: C.redBg, stroke: C.red, 'stroke-width': 2.5 }); txt(gW, x, 130, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 36, fill: C.red }); });
txt(gW, 120, 206, 'DO NOT EXIST', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xW = mk(tsv, 'path', { d: 'M38 80 L102 152 M102 80 L38 152 M138 80 L202 152 M202 80 L138 152', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const gR = mk(tsv, 'g', {}); [['n = 1', ['1s']], ['n = 2', ['2s', '2p']], ['n = 3', ['3s', '3p', '3d']]].forEach(([s, ch], i) => { const y = 60 + i * 56; txt(gR, 270, y + 30, s, { 'font-size': 20, fill: NC, 'font-weight': 600 });
  ch.forEach((c, k) => { mk(gR, 'rect', { x: 370 + k * 76, y, width: 66, height: 44, rx: 9, fill: C.okBg, stroke: C.ok, 'stroke-width': 2 }); txt(gR, 403 + k * 76, y + 30, c, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#1F6B3F' }); }); });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Which set of quantum numbers is allowed, and how many orbitals or electrons fit' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `How many electrons in an atom can have ${K(`${n_} = 4`)} and ${K(`${ml_} = -1`)}?`, qW: 780,
  opts: ['3', '6', '8', '32'], right: 1, optW: 474, optY: 300, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${n_} = 4:\\; ${l_} = 0, 1, 2, 3`)], [K(`${ml_} = -1 \\text{ needs } ${l_} \\ge 1`)], [K(`4p,\\; 4d,\\; 4f \\to 3 \\text{ orbitals}`)], [K(`3 \\times 2 = \\textcolor{${C.ok}}{6}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'So'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · orbitals and quantum numbers', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${n_} = 1, 2, 3, \\dots \\qquad ${l_} = 0, \\dots, (${n_} - 1)`), K(`${ml_} = -${l_} \\dots +${l_} \\;(2${l_} + 1) \\qquad ${ms_} = \\pm\\tfrac{1}{2}`),
    '<b>Shell n</b>: n² orbitals, at most 2n² electrons', '<b>Letters</b>: l = 0, 1, 2, 3 is s, p, d, f · no 1p, no 2d', '<b>One orbital</b>: at most 2 electrons, opposite spins'] });
const YQ = ['What values can l take when n = 4?', 'Why is there no 2d orbital?', 'How many electrons can the N shell hold?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 23', topic: 'Why is a p orbital a dumbbell? Shapes of s, p and d Orbitals', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS10 - 0.1, 1.1, 760, 520], [T1('S10') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const od = $('#odef'); if (od.offsetWidth > 712) od.style.fontSize = Math.floor(26 * 690 / od.offsetWidth) + 'px';
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three tickets, Diya's study table */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'address') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'few') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'one') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'four') - 0.15, 1e9, POP);
  }

  /* P: cloud + four quantum numbers */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#po'), t, tP1 + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tP4 + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#po'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#poIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#odef'), t, wt('P2', 'orbital', 1) - 0.1, 1e9, POP);
    const dIn = M.clamp((t - wt('P3', 'cloud') + 0.2) / 2.4); fade(nuc0, t, tP1 + 0.3);
    DOTS.forEach((d, i) => { const on = i / DOTS.length < dIn; M.hide(d, !on); });
    const bu = M.io((t - wt('P3', 'thick') + 0.1) / 0.6); M.drawU(bnd, bu); M.hide(bnd, bu <= 0);
    M.vis(cTag2, t, wt('P3', 'often') - 0.1, 1e9, POP); M.vis(cTag, t, wt('P3', 'two') - 0.1, 1e9, POP);
    M.vis($('#pq'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    QN.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQn[i] - 0.15, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQn[i + 1] : T1('P4'); setBg(el, mix(C.soft, C.ac2, M.io((t - tQn[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
  }

  /* S + B: the bench, counter, rules, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#ad'), t, tS1 + 0.25, z, { dx: 60, dy: 0, ...o });
    M.vis($('#rl'), t, tS1 + 0.4, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Which') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'In') });
    // atom: shells draw on, then slide left for the subshells
    attr(aG, 'transform', `translate(${aX(t).toFixed(1)} 262) scale(${aS(t).toFixed(4)})`);
    const nv = +pick(VAL[0], t) || 0;
    rings.forEach((r, i) => { const u = M.io((t - tS1 - 0.3 - i * 0.12) / 0.5); M.drawU(r, u); M.hide(r, u <= 0); const on = M.io(((nv === i + 1) ? 1 : 0)); attr(r, 'stroke', nv === i + 1 ? NC : C.dim); attr(r, 'stroke-width', nv === i + 1 ? 4 : 2); });
    sLab.forEach((g, i) => fade(g, t, tRc[0][i] - 0.1, 1e9, 0.2));
    nE.forEach((e, i) => { const on = nv === i + 1 && t < tS4; fade(e, t, on ? 0 : 1e9, 1e9, 0.01); M.hide(e, !on); });
    rows.forEach((r, l) => { fade(r.g, t, tRow[l] - 0.1, 1e9, 0.3); fade(r.lab, t, 0, tLet[l] - 0.05, 0.2); fade(r.lab2, t, tLet[l] - 0.05, 1e9, 0.2);
      r.ml.forEach(e => fade(e, t, tRc[2][l] - 0.05, 1e9, 0.2));
      r.bx.forEach((bx, k) => { const m = k - l, mv = pick(VAL[2], t), hl = l === 2 && t >= tFive && t < tFive + 1.75 && String(m > 0 ? '+' + m : m) === mv;
        const ph = M.io((t - tRc[2][l] + 0.1) / 0.25) * (1 - M.io((t - tRc[2][l] - 0.7) / 0.3));
        attr(bx, 'fill', hl ? M.mix('#FFFFFF', MC, 0.3) : M.mix('#FFFFFF', MC, 0.18 * ph)); attr(bx, 'stroke', hl ? MC : C.ink2); }); });
    fade(mlHdr, t, tRc[2][0] - 0.1, 1e9, 0.2);
    // S10: one electron flies into the 3p (m_l = -1) box, then its partner
    const tE = wt('S10', 'electron'), fu = M.io((t - tE + 0.2) / 0.9);
    const ex = M.lerp(760, PBX + 17, fu), ey = M.lerp(70, PBY + BX / 2, fu) - Math.sin(fu * Math.PI) * 40;
    attr(eFly, 'cx', ex.toFixed(1)); attr(eFly, 'cy', ey.toFixed(1)); M.hide(eFly, !(fu > 0 && fu < 1));
    fade(aUp, t, tE + 0.65, 1e9, 0.15); fade(aDn, t, wt('S10', 'partner') - 0.05, 1e9, 0.2);
    const pbx = rows[1].bx[0]; if (t >= tE + 0.6) { attr(pbx, 'stroke', EC); attr(pbx, 'stroke-width', 3.5); } else attr(pbx, 'stroke-width', 2.5);
    // bench tag
    const TAG = [[tS1 + 0.3, 'n · WHICH SHELL'], [wt('S2', 'bigger'), 'BIGGER n · FARTHER, MORE ENERGY'], [tRc[0][0], 'SHELL LETTERS · K L M N'], [tS4, 'l · WHICH SUBSHELL'], [tRow[0], 'SHELL 3 · l = 0, 1, 2'], [tS7, 'm_l · WHICH ORBITAL'], [tS9, 'm_s · WHICH SPIN'], [tS10, '3p · m_l = -1'], [wt('S10', 'partner'), 'ONE ORBITAL · TWO SPINS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    avA(t, wt('S10', 'partner') + 0.6, OUT('B2'));
    // counter
    VAL.forEach((ks, i) => { const v = pick(ks, t), el = $('#sv' + i); M.setT(el, v);
      let last = -1; for (const [a] of ks) if (t >= a && a > 0) last = a;
      const fl = last > 0 ? M.io((t - last) / 0.15) * (1 - M.io((t - last - 0.5) / 0.4)) : 0;
      const live = t >= tSlot[i];
      setBg($('#sl' + i), mix(C.soft, [M.mix('#FFFFFF', NC, 0.2), M.mix('#FFFFFF', LC, 0.2), M.mix('#FFFFFF', MC, 0.22), M.mix('#FFFFFF', EC, 0.2)][i], live ? 0.35 + 0.65 * fl : 0));
      el.style.color = live ? [NC, LC, MC, EC][i] : C.dim;
      M.vis($('#sl' + i), t, tS1 + 0.4 + i * 0.1, 1e9, { dy: 16 }); });
    // rule panes
    RP.forEach((p, i) => { const tin = tRp[i] + 0.1, tout = i < 3 ? tRp[i + 1] : 1e9;
      M.vis($('#rp' + i), t, tin, tout, { dy: 16, outDur: 0.2, ody: -10 });
      PUC.write($('#rp' + i + ' .rf2'), t, tin + 0.15, 0.6);
      p[1].forEach((_, k) => M.vis($(`#rc${i}_${k}`), t, tRc[i][k] - 0.1, 1e9, POP)); });
    const ri = tRp.reduce((a, tt, i) => t >= tt ? i : a, 0); M.setT($('#rlL'), RP[ri][2]);
  }

  /* D: counting orbitals */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    drows.forEach((r, ri) => { fade(r.lab, t, tD1 + 0.5 + ri * 0.12, 1e9, 0.2);
      r.grp.forEach((g, l) => { const tb = tDs[1] + 0.2 + ri * 0.35 + l * 0.08; g.bxs.forEach((bx, k) => fade(bx, t, tb + k * 0.03, 1e9, 0.15)); fade(g.lt, t, tb, 1e9, 0.2); });
      fade(r.tot, t, tDs[2] + 0.4 + ri * 0.3, 1e9, 0.25); });
    M.vis($('#dP'), t, tDs[3] + 0.5, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Four') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'its') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'address') + 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tRw = [wt('W4', 'Three'), wt('W4', 'Three', 1), wt('W4', 'Three', 3)];
    wrows.forEach((r, l) => { fade(r.g, t, tRw[l] - 0.15, 1e9, 0.3); fade(r.cnt, t, tRw[l] + 0.4, 1e9, 0.2); });
    const tFill = wt('W6', 'Two'), nAr = Math.max(0, Math.min(18, Math.floor((t - tFill) / 0.13) + 1));
    ALLAR.forEach((a, i) => M.hide(a, i >= nAr));
    const orb = t >= tRw[2] + 0.3 ? 9 : t >= tRw[1] + 0.3 ? 4 : t >= tRw[0] + 0.3 ? 1 : 0;
    M.setT(wRd, `ORBITALS ${orb} · ELECTRONS ${nAr}`); fade(wRd, t, tRw[0] + 0.2, 1e9, 0.2); attr(wRd, 'fill', nAr >= 18 ? EC : C.ink);
    avD(t, wt('W6', 'eighteen') + 0.5);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'stops') - 0.1, tRight: wt('X3', 'Shell') - 0.1 });
    fade(gW, t, wt('X2', 'one') - 0.1); M.draw(xW, t, wt('X3', 'stops') - 0.1, 0.5); fade(gR, t, wt('X3', 'Shell') - 0.05);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'usually') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'electrons'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
