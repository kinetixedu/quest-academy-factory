// MBA - Principles of Management, Ep 26: Centralization and Decentralization
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', link: '#D9CFBC', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  sliders: ['M21 4h-7', 'M10 4H3', 'M21 12h-9', 'M8 12H3', 'M21 20h-5', 'M12 20H3', 'M14 2v4', 'M8 10v4', 'M16 18v4'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tDec = wt('H2', 'decision');
const tC1 = T0('C1'), tC2 = T0('C2'), tCall = [wt('C1', 'Call'), wt('C2', 'Call')], tTime = wt('C3', 'time'), tGone = wt('C3', 'gone');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tTop = wt('D2', 'top'), tD3 = T0('D3'), tSpread = wt('D3', 'spread'), tLower = wt('D3', 'lower');
const tD4 = T0('D4'), tOne = wt('D4', 'one'), tD5 = T0('D5'), tWhole = wt('D5', 'whole'), tDout = T0('K0') - 0.32;
const tK0 = T0('K0'), tSlider = wt('K0', 'slider'), tLeft = wt('K1', 'left'), tBoss = wt('K1', 'boss'), tRight = wt('K2', 'right'), tUnit = wt('K2', 'unit');
const tK3 = T0('K3'), tEither = wt('K3', 'either'), tFayol = wt('K4', 'Fayol'), tProp = wt('K4', 'proportion'), tOwn = wt('K4', 'Each');
const tW0 = T0('W0'), tWL = [wt('W1', 'small'), wt('W1', 'rules'), wt('W1', 'crisis')], tWR = [wt('W2', 'large'), wt('W2', 'places'), wt('W2', 'change')], tKout = T0('M0') - 0.32;
const tM0 = T0('M0'), tMenu = wt('M1', 'menu'), tPrice = wt('M1', 'prices'), tStaff = wt('M2', 'staffing'), tOffer = wt('M2', 'offers');
const tMeena = wt('M3', 'Meena'), tShift = wt('M3', 'shifts'), tColl = wt('M4', 'college'), tStud = wt('M4', 'student'), tMout = T0('P0') - 0.32;
const tP0 = T0('P0'), tP1 = T0('P1'), tP2 = T0('P2');
const tPr = [[wt('P1', 'tight'), wt('P1', 'one'), wt('P1', 'top'), wt('P1', 'slow')], [wt('P2', 'faster'), wt('P2', 'trains'), wt('P2', 'drift'), wt('P2', 'control')]];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'Centralization'), wt('S2', 'Decentralization')], [wt('S3', 'matter'), wt('S3', 'No')], [wt('S4', 'Small'), wt('S4', 'Large')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
// awning + stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
$('#cr0 .ci').innerHTML = M.icon('phone', 22, C.ink, 2.2); $('#cr1 .ci').innerHTML = M.icon('phone', 22, C.ink, 2.2);
$('#pDi').innerHTML = M.icon('user', 24, C.ink, 2.2); $('#pLi').innerHTML = M.icon('userX', 24, C.red, 2.2);

// scene D: three small org trees
const TX = k => 392 + (k - 2) * 132, TY = 400, HX = 392, HY = 276;
const treeSvg = () => [0, 1, 2, 3, 4].map(k => `<path class="ln" d="M${HX} ${HY + 36} V340 H${TX(k)} V${TY - 32}" fill="none" stroke="${C.link}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
const DP = [
  ['dp0', 'building', 'store', 'Ravi decides everything', 'user'],
  ['dp1', 'arrowD', 'user', 'One task, one person', 'check'],
  ['dp2', 'network', 'store', 'Each outlet decides', 'store'],
];
DP.forEach(([id, ic, nic, pill, pic]) => {
  const p = $('#' + id);
  p.querySelector('.di').innerHTML = M.icon(ic, 44, C.gold, 2.2);
  p.querySelector('.tsv').innerHTML = treeSvg();
  p.querySelector('.tree').innerHTML = `<div class="tn hq" style="left:${HX - 36}px;top:${HY - 36}px">R</div>` + [0, 1, 2, 3, 4].map(k => `<div class="tn nd" style="left:${TX(k) - 32}px;top:${TY - 32}px"><span class="ico"></span></div>`).join('');
  p.querySelector('.dpill').innerHTML = `<span class="pi">${M.icon(pic, 24, C.gold, 2.4)}</span><span>${pill}</span>`;
});
$('#dpill2b').innerHTML = `<span class="pi">${M.icon('network', 24, C.gold2, 2.4)}</span><span>Across the whole firm, by plan</span>`;

// scene K: slider hero
const OX = k => 800 + (k - 2) * 290, OY = 168, HQX = k => 800 + (k - 2) * 40, HQY = 104;
$('#hqI').innerHTML = M.icon('building', 30, C.gold2, 2.2);
$('#ons').innerHTML = [0, 1, 2, 3, 4].map(k => `<div class="on" id="on${k}" style="left:${OX(k) - 100}px"><span class="ico"></span><span>Outlet ${k + 1}</span></div>`).join('');
$('#slLinks').innerHTML = [0, 1, 2, 3, 4].map(k => `<line id="sk${k}" x1="${HQX(k)}" y1="${HQY}" x2="${OX(k)}" y2="${OY}" stroke="${C.link}" stroke-width="4" stroke-linecap="round"/>`).join('');
$('#toks').innerHTML = [0, 1, 2, 3, 4].map(k => `<div class="tok" id="tk${k}"></div>`).join('');
$('#zpL .zi').innerHTML = M.icon('x', 20, C.red, 2.6); $('#zpR .zi').innerHTML = M.icon('x', 20, C.red, 2.6);
$('#roAi').innerHTML = M.icon('building', 30, C.ink, 2.2); $('#roBi').innerHTML = M.icon('store', 30, C.gold, 2.2);
$('#fqI').innerHTML = M.icon('quote', 36, C.gold, 2);
const TH_ORDER = [2, 0, 4, 1, 3], TH = [0.05, 0.24, 0.42, 0.6, 0.8];   // outlet TH_ORDER[i] takes its decisions once the slider passes TH[i]
const WCL = [['Small firm', 'store'], ['Uniform rules', 'equal'], ['Crisis', 'alert']];
const WCR = [['Large firm', 'building'], ['Many places', 'pin'], ['Fast change', 'refresh']];
$('#wcs').innerHTML = WCL.map(([tx, ic], i) => `<div class="wc" id="wcl${i}"><span class="ico">${M.icon(ic, 24, C.gold, 2.2)}</span>${tx}</div>`).join('') + WCR.map(([tx, ic], i) => `<div class="wc" id="wcr${i}"><span class="ico">${M.icon(ic, 24, C.gold, 2.2)}</span>${tx}</div>`).join('');

// scene M: map hero
const MHQ = [512, 340];
const MO = [['Main stall', 176, 196], ['Bus stand', 848, 196], ['College', 176, 452], ['Market', 848, 452], ['Park', 512, 172]];
const ROAD = ['M512 340 V196 H176', 'M512 340 V196 H848', 'M512 340 V452 H176', 'M512 340 V452 H848', 'M512 340 V172'];
$('#mapSvg').innerHTML = `<g fill="none" stroke-linecap="round" stroke-linejoin="round">${ROAD.map((d, k) => `<path id="rd${k}" d="${d}" stroke="#fff" stroke-width="18"/>`).join('')}</g>` +
  `<g fill="none" stroke="${C.line}" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round">${ROAD.map((d, k) => `<path id="rc${k}" d="${d}"/>`).join('')}</g>`;
$('#mNodes').innerHTML = MO.map(([n, x, y], k) => `<div class="mo" id="mo${k}" style="left:${x - 36}px;top:${y - 36}px">${M.icon('store', 30, C.ink, 2.2)}</div><div class="mol" id="ml${k}" style="left:${x - 120}px;top:${y + 46}px">${n}</div>`).join('');
const hq = $('#mHQ'); hq.style.left = (MHQ[0] - 52) + 'px'; hq.style.top = (MHQ[1] - 52) + 'px'; hq.innerHTML = M.icon('building', 48, C.gold2, 2);
const hql = $('#mHQl'); hql.style.left = (MHQ[0] - 150) + 'px'; hql.style.top = (MHQ[1] + 64) + 'px';
// tokens: in = menu/prices flying to head office; out = staffing/offers flying to each outlet
const MT = [];
['book', 'tag'].forEach((ic, j) => MO.forEach((_, k) => MT.push({ id: `mi${j}${k}`, ic, dir: -1, k, j, t: (j ? tPrice : tMenu) + k * 0.07 })));
['users', 'megaphone'].forEach((ic, j) => MO.forEach((_, k) => MT.push({ id: `mx${j}${k}`, ic, dir: 1, k, j, t: (j ? tOffer : tStaff) + k * 0.07 })));
$('#mToks').innerHTML = MT.map(o => `<div class="mt${o.dir < 0 ? ' ink' : ''}" id="${o.id}">${M.icon(o.ic, 20, '#fff', 2.4)}</div>`).join('') +
  `<div class="mt ink" id="mdk0">${M.icon('book', 20, '#fff', 2.4)}</div><div class="mt ink" id="mdk1">${M.icon('tag', 20, '#fff', 2.4)}</div>`;
$('#mpCi').innerHTML = M.icon('megaphone', 18, '#fff', 2.4);
$('#wg0i').innerHTML = M.icon('building', 22, C.ink, 2.2); $('#wg1i').innerHTML = M.icon('store', 22, C.gold, 2.2);
const WR = [['book', 'Menu', 132, C.ink, tMenu], ['tag', 'Prices', 216, C.ink, tPrice], ['users', 'Daily staffing', 356, C.gold, tStaff], ['megaphone', 'Local offers', 440, C.gold, tOffer]];
$('#wRows').innerHTML = WR.map(([ic, tx, y, c], i) => `<div class="wr" id="wr${i}" style="top:${y}px"><div class="wic">${M.icon(ic, 24, c, 2.2)}</div><div class="wt">${tx}</div></div>`).join('');

// scene P: pros and cons
const PC = [['Centralization', 'arrowU', 'At the top', [['+', 'lock', 'Tight control'], ['+', 'equal', 'One standard everywhere'], ['-', 'layers', 'The top gets overloaded'], ['-', 'clock', 'Decisions slow down']]],
  ['Decentralization', 'arrowD', 'Spread down', [['+', 'zap', 'Faster decisions'], ['+', 'cap', 'Trains new managers'], ['-', 'split', 'Outlets drift apart'], ['-', 'gauge', 'Control gets harder']]]];
$('#pRow').innerHTML = PC.map(([ti, ic, cp, rows], i) => `<div class="card pc" id="pc${i}" style="left:${160 + i * 816}px"><div class="serif pt2">${ti}</div><div class="cp">${M.icon(ic, 22, C.gold, 2.4)}${cp}</div>` +
  rows.map(([s, ric, tx], k) => `<div class="pr" id="pr${i}${k}" style="top:${140 + k * 96}px"><div class="pb">${M.icon(s === '+' ? 'plus' : 'minus', 26, '#fff', 3)}</div><div class="ptx"><span class="pw">${tx}</span></div></div>`).join('') + `</div>`).join('');

// quiz
const OPTS = ['Centralized', 'Decentralized', 'Directing', 'Controlling'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('store', 44, C.gold2, 2.4);
// recap
const ROWS = [['arrowD', 'Who decides?', ['Top: centralization', 'Lower levels: decentralization']], ['sliders', 'A slider', ['A matter of degree', 'No firm is fully one side']], ['compass', 'Lean', ['Central: small, uniform, crisis', 'Decentralized: large, spread, fast']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const raviX = M.track(0, [[tC1, 30], [tTime, 0]], M.SOFT);
const sV = M.track(0.5, [[tLeft, 0], [tRight, 1], [tK3, 0.5], [tWL[0], 0.14], [tWR[0], 0.9]], [7, 0.9]);
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
const pos = (el, x, y) => { const l = x.toFixed(1) + 'px', tp = y.toFixed(1) + 'px'; if (el.style.left !== l) el.style.left = l; if (el.style.top !== tp) el.style.top = tp; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#pLost').style.left = (36 + $('#pDesk').offsetWidth + 16) + 'px';
  M.$$('.dpill').forEach(p => { p.style.left = ((784 - p.offsetWidth) / 2) + 'px'; });
  let x = 40; for (let i = 0; i < 3; i++) { const e = $('#wcl' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }
  x = 1560; for (let i = 2; i >= 0; i--) { const e = $('#wcr' + i); x -= e.offsetWidth; e.style.left = x + 'px'; x -= 16; }
  const mm = $('#mpM'); mm.style.left = (984 - mm.offsetWidth) + 'px'; mm.style.top = '284px';
  const mc = $('#mpC'); mc.style.left = '48px'; mc.style.top = '320px';
  for (let i = 0; i < 3; i++) { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 32; for (let k = 0; k < 2; k++) { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; } }
  // road geometry for the map tokens
  geo.rd = ROAD.map((_, k) => { const p = $('#rd' + k); return { p, L: p.getTotalLength() }; });
}
const roadPt = (k, u) => { const r = geo.rd[k], q = r.p.getPointAtLength(r.L * M.clamp(u)); return [q.x, q.y]; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header (one element travels, never cut) */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  M.vis($('#exChip'), t, tDec + 0.4, tT - 0.3, { dy: 10, outDur: 0.3 });

  /* ===== A: every decision waits for Ravi ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    const rx = raviX(t); $('#ravi').setAttribute('transform', `translate(${rx.toFixed(2)} 0)`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    // the phone rings on every call
    const ring = Math.max(...tCall.map(c => on01(t, c - 0.1, c + 0.9, 0.12)));
    $('#ringW').style.opacity = ring.toFixed(3);
    const shake = tCall.reduce((a, c) => a + (t > c - 0.1 && t < c + 0.6 ? Math.sin((t - c) * 50) * (1 - (t - c + 0.1) / 0.7) : 0), 0);
    $('#phone').setAttribute('transform', `translate(470 196) rotate(${(4 * shake).toFixed(2)})`);
    // calls card
    M.vis($('#req'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.setT($('#rN'), String(Math.round(24 * M.o5((t - tDec) / 1.4))));
    $('#rN').style.color = mix(C.ink, C.red, M.io((t - tGone) / 0.4));
    [tC1, tC2].forEach((c, i) => {
      const el = $('#cr' + i); M.vis(el, t, tMorph + 0.6 + i * 0.08, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.ci'), t, c - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      M.rise(el.querySelector('.ct'), t, c + 0.02, { st: 0.05 });
      M.vis(el.querySelector('.cw2'), t, tCall[i] + 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    });
    // answer-time card
    M.vis($('#ans'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const u = M.io((t - tC1 - 0.2) / (tTime - tC1 + 0.4)), mins = 5 + 175 * u;
    M.setT($('#aV'), mins < 60 ? `${Math.round(mins / 5) * 5} min` : `${Math.round(mins / 30) / 2} hrs`);
    const hot = M.io((mins - 60) / 60); $('#aV').style.color = mix(C.ink, C.red, hot);
    $('#aFill').style.width = (544 * mins / 180).toFixed(1) + 'px'; $('#aFill').style.background = mix(C.gold, C.red, hot);
    M.vis($('#pDesk'), t, tMorph + 0.9, 1e9, { dy: 16 });
    M.vis($('#pLost'), t, tGone - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== D: centralization vs decentralization ===== */
  const dOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#dc0'), t, tD2 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#dc1'), t, tD2 + 0.15, tDout, { dy: 36, ...o });
    // pane: [id, active from, active to, pane in, pane out]
    const PANE = [[0, tD2, tD3, tD2 + 0.05, tD4 - 0.16], [1, tD4, tD5, tD4, 1e9], [2, tD3, 1e9, tD2 + 0.15, 1e9]];
    PANE.forEach(([k, a, b, pin, pout]) => {
      const p = $('#dp' + k), live = t >= pin - 0.01 && t < pout + 0.3; M.hide(p, !live); if (!live) return;
      const oo = { outDur: 0.2, ody: -12 };
      const on = M.io((t - a) / 0.3), act = on;
      const sub = k === 1 ? 0.3 : 0;   // the swapped pane builds in after the old one leaves
      M.vis(p.querySelector('.di'), t, pin + sub, pout, { dy: 0, sc: 0.6, sp: M.POP, ...oo });
      setIco(p.querySelector('.di'), DP[k][1], t >= a ? C.gold : C.dim, 44, 2.2);
      const dt = p.querySelector('.dt'); M.rise(dt, t, pin + sub + 0.05, { st: 0.06, sp: M.HEAVY, out: pout, outDur: 0.2 }); dt.style.color = mix(C.dim, C.ink, act);
      const dm = p.querySelector('.dm'); M.rise(dm, t, (k === 0 ? pin : a) + 0.25, { st: 0.04, out: pout, outDur: 0.2 }); dm.style.color = mix(C.dim, C.gold, act);
      M.vis(p.querySelector('.hr'), t, pin + sub + 0.2, pout, { dy: 0, ...oo });
      // tree
      const tr = p.querySelector('.tree'), hqn = tr.querySelector('.hq'), nds = tr.querySelectorAll('.nd'), lns = p.querySelectorAll('.ln');
      M.vis(hqn, t, pin + sub + 0.3, pout, { dy: 0, sc: 0.5, sp: M.POP, ...oo });
      const lit = k === 0 ? tTop : k === 1 ? tOne : tSpread;
      hqn.style.background = k === 0 ? mix(C.ink, C.gold, M.io((t - tTop) / 0.3)) : k === 1 ? C.gold : C.ink;
      nds.forEach((nd, j) => {
        M.vis(nd, t, pin + sub + 0.4 + j * 0.06, pout, { dy: 0, sc: 0.5, sp: M.POP, ...oo });
        const ln = lns[j]; if (t < pout) M.draw(ln, t, pin + sub + 0.35 + j * 0.05, 0.5, M.o3); else ln.style.opacity = (1 - M.io((t - pout) / 0.2)).toFixed(3);
        let g = 0;
        if (k === 1 && j === 2) g = M.io((t - tOne - 0.1) / 0.3);
        if (k === 2) { const tj = tSpread + j * 0.1; g = M.io((t - tj) / 0.3); const pulse = M.spring(t - tWhole - j * 0.06, M.POP) - M.spring(t - tWhole - 0.35 - j * 0.06, M.SOFT); if (t > tWhole - 0.1 && t < tWhole + 2) nd.style.transform = Math.abs(pulse) > 0.001 ? `scale(${(1 + 0.12 * pulse).toFixed(4)})` : 'none'; }
        nd.style.background = mix(C.paper2, C.gold, g);
        setIco(nd.querySelector('.ico'), DP[k][2], g > 0.5 ? '#fff' : (t >= a ? C.ink2 : C.dim), 28, 2.2);
        ln.setAttribute('stroke', (k === 1 && j === 2) || k === 2 ? mix(C.link, C.gold, g) : (k === 0 ? mix(C.link, C.ink2, M.io((t - tTop) / 0.3)) : C.link));
      });
      // pill
      const pl = p.querySelector('.dpill:not(#dpill2b)'), pt = k === 0 ? tTop + 0.3 : k === 1 ? tOne + 0.35 : tLower;
      M.vis(pl, t, pt, k === 2 ? tWhole - 0.1 : pout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...oo });
      setIco(pl.querySelector('.pi'), DP[k][4], C.gold, 24, 2.4);
      if (k === 2) { const p2 = $('#dpill2b'); M.vis(p2, t, tWhole + 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); p2.style.background = C.ink; p2.style.color = '#fff'; setIco(p2.querySelector('.pi'), 'network', C.gold2, 24, 2.4); }
    });
    // active card border
    const b0 = $('#dc0 .bg'), b1 = $('#dc1 .bg');
    b0.style.borderColor = mix(C.line, C.gold, Math.max(on01(t, tD2, tD3), on01(t, tD4, tD5)));
    b1.style.borderColor = mix(C.line, C.gold, Math.max(on01(t, tD3, tD4), on01(t, tD5, 1e9)));
  }

  /* ===== K: the slider (hero 1) ===== */
  const kOn = t >= tK0 - 0.1 && t < tM0 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const ko = { outDur: 0.3, ody: -16 };
    M.vis($('#sl'), t, tK0 + 0.08, tKout, { dy: 36, ...ko });
    M.vis($('#slL'), t, tK0 + 0.3, 1e9, { dy: 10 });
    M.vis($('#hq'), t, tK0 + 0.35, 1e9, { dy: 0, sc: 0.7, sp: M.POP });
    const s = sV(t);
    for (let k = 0; k < 5; k++) {
      const on = $('#on' + k); M.vis(on, t, tK0 + 0.5 + k * 0.07, 1e9, { dy: 16, sc: 0.85, sp: M.POP });
      M.draw($('#sk' + k), t, tK0 + 0.45 + k * 0.05, 0.45, M.o3);
      const i = TH_ORDER.indexOf(k), uk = M.io((s - TH[i]) / 0.07);
      const tk = $('#tk' + k); M.vis(tk, t, tSlider + 0.25 + k * 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      pos(tk, M.lerp(HQX(k), OX(k), uk) - 17, M.lerp(HQY, OY, uk) - 17);
      const vk = uk * M.clamp((t - tSlider - 0.25 - k * 0.05) / 0.2);
      on.style.background = mix(C.paper2, C.gold2, vk);
      setIco(on.querySelector('.ico'), 'store', vk > 0.5 ? C.gold : C.ink2, 24, 2.2);
      $('#sk' + k).setAttribute('stroke', mix(C.link, C.gold, vk));
    }
    M.vis($('#trk'), t, tSlider - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const kn = $('#knob'); M.vis(kn, t, tSlider + 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    kn.style.left = (120 + s * 1360 - 28).toFixed(1) + 'px';
    M.rise($('#elL'), t, tLeft - 0.05, { st: 0.04 }); M.rise($('#etL'), t, tBoss - 0.05, { st: 0.04 });
    M.rise($('#elR'), t, tRight - 0.05, { st: 0.04 }); M.rise($('#etR'), t, tUnit - 0.1, { st: 0.04 });
    // the two ends: no real organization lives there
    const z = M.io((t - tK3 - 0.1) / 0.4);
    $('#zL').style.opacity = z.toFixed(3); $('#zR').style.opacity = z.toFixed(3);
    M.vis($('#zpL'), t, tEither - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#zpR'), t, tEither + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const nOut = TH.filter(th => s > th + 0.035).length;
    M.vis($('#ro'), t, tSlider + 0.35, tFayol - 0.35, { dy: 24, outDur: 0.25, ody: -10 });
    M.setT($('#roA'), String(5 - nOut)); M.setT($('#roB'), String(nOut));
    M.vis($('#fq'), t, tFayol - 0.05, tWL[0] - 0.35, { dy: 24, outDur: 0.25, ody: -10 });
    M.rise($('#fqT'), t, tFayol + 0.15, { st: 0.06, out: tWL[0] - 0.35, outDur: 0.2 });
    // when to lean which way
    const leftAct = on01(t, tWL[0], tWR[0] - 0.1), rightAct = M.io((t - tWR[0]) / 0.32);
    WCL.forEach(([, ic], i) => { const e = $('#wcl' + i); M.vis(e, t, tWL[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); e.style.background = mix(C.paper, C.ink, leftAct); e.style.color = mix(C.ink, '#fff', leftAct); setIco(e.querySelector('.ico'), ic, leftAct > 0.5 ? C.gold2 : C.gold, 24, 2.2); });
    WCR.forEach(([, ic], i) => { const e = $('#wcr' + i); M.vis(e, t, tWR[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); e.style.background = mix(C.paper, C.ink, rightAct); e.style.color = mix(C.ink, '#fff', rightAct); setIco(e.querySelector('.ico'), ic, rightAct > 0.5 ? C.gold2 : C.gold, 24, 2.2); });
  }

  /* ===== M: the map (hero 2) ===== */
  const mOn = t >= tM0 - 0.1 && t < tP0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const mo = { outDur: 0.3, ody: -16 };
    M.vis($('#map'), t, tM0 + 0.08, tMout, { dy: 36, ...mo });
    M.vis($('#who'), t, tM0 + 0.2, tMout, { dx: 60, dy: 0, ...mo });
    for (let k = 0; k < 5; k++) { M.draw($('#rd' + k), t, tM0 + 0.3 + k * 0.05, 0.6, M.o3); M.draw($('#rc' + k), t, tM0 + 0.5 + k * 0.05, 0.6, M.o3); }
    M.vis($('#mHQ'), t, tM0 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP }); M.vis($('#mHQl'), t, tM0 + 0.45, 1e9, { dy: 10 });
    MO.forEach((_, k) => {
      M.vis($('#mo' + k), t, tM0 + 0.5 + k * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP });
      M.vis($('#ml' + k), t, tM0 + 0.6 + k * 0.08, 1e9, { dy: 10 });
      const got = M.io((t - tStaff - 0.9 - k * 0.07) / 0.3);
      $('#mo' + k).style.borderColor = mix(C.line, C.gold, got);
    });
    // tokens travel the roads
    MT.forEach(o => {
      const el = $('#' + o.id), u = M.io((t - o.t) / 0.95);
      if (t < o.t - 0.01) { M.hide(el, true); return; }
      let x, y;
      if (o.dir < 0) {   // outlet -> head office, then disappears into it
        [x, y] = roadPt(o.k, 1 - u);
        const gone = M.io((t - o.t - 0.95) / 0.2); el.style.opacity = ((1 - gone) * M.clamp((t - o.t) / 0.12)).toFixed(3); M.hide(el, gone >= 1);
      } else {            // head office -> outlet, then docks beside it
        [x, y] = roadPt(o.k, u);
        const d = M.io((t - o.t - 0.95) / 0.3), dx = o.j ? 32 : -32, dy = -42;
        x += dx * d; y += dy * d;
        el.style.opacity = M.clamp((t - o.t) / 0.12).toFixed(3); M.hide(el, false);
        if (t > tMout) el.style.opacity = (1 - M.io((t - tMout) / 0.3)).toFixed(3);
      }
      pos(el, x - 22, y - 22);
    });
    [0, 1].forEach(j => { const el = $('#mdk' + j); M.vis(el, t, (j ? tPrice : tMenu) + 1.0, tMout, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, outDur: 0.3, ody: 0 }); el.style.left = (MHQ[0] + (j ? 38 : -82)) + 'px'; el.style.top = (MHQ[1] - 64) + 'px'; });
    M.vis($('#mpM'), t, tMeena + 0.05, tMout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.3, ody: 0 });
    M.vis($('#mpC'), t, tStud - 0.05, tMout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.3, ody: 0 });
    $('#mo1').style.background = mix('#fff', C.gold2, on01(t, tMeena, tColl));
    $('#mo2').style.background = mix('#fff', C.gold2, on01(t, tColl, 1e9));
    // who decides what
    M.vis($('#wg0'), t, tM0 + 0.45, 1e9, { dy: 10 }); M.vis($('#wg1'), t, tM0 + 0.55, 1e9, { dy: 10 });
    WR.forEach(([, , , , tw], i) => {
      const r = $('#wr' + i); M.vis(r, t, tM0 + 0.5 + i * 0.07, 1e9, { dy: 16 });
      M.vis(r.querySelector('.wic'), t, tw, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      M.rise(r.querySelector('.wt'), t, tw + 0.08, { st: 0.05 });
      const lift = M.spring(t - tw, M.POP) - M.spring(t - tw - 0.4, M.SOFT);
      if (t > tw - 0.05 && t < tw + 2) r.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.03 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== P: pros and cons ===== */
  const pOn = t >= tP0 - 0.1 && t < tQ + 0.05; M.hide($('#sP'), !pOn);
  if (pOn) {
    PC.forEach((c, i) => {
      const el = $('#pc' + i), a = i ? tP2 : tP1;
      M.vis(el, t, tP0 + 0.1 + i * 0.12, 1e9, { dy: 36 });
      const act = M.io((t - a) / 0.3);
      const pt = el.querySelector('.pt2'); M.rise(pt, t, tP0 + 0.25 + i * 0.12, { st: 0.06, sp: M.HEAVY }); pt.style.color = mix(C.dim, C.ink, act);
      M.vis(el.querySelector('.cp'), t, tP0 + 0.5 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      c[3].forEach(([sg], k) => {
        const r = $('#pr' + i + k), tw = tPr[i][k], plus = sg === '+';
        M.vis(r, t, tP0 + 0.35 + i * 0.12 + k * 0.06, 1e9, { dy: 16 });
        const f = M.io((t - tw) / 0.3);
        r.style.background = mix(C.paper2, plus ? C.paper2 : C.redBg, f);
        const pb = r.querySelector('.pb'); pb.style.background = mix('#E4DCCD', plus ? C.gold : C.red, f);
        M.rise(r.querySelector('.ptx'), t, tw + 0.05, { st: 0.04 });
        r.querySelector('.ptx').style.color = plus ? C.ink : C.red;
      });
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, wt('Q1', 'The') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + 0.2 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, C.gold, r) : C.paper; lt.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAns + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTakeQ, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTakeQ + 0.1, { st: 0.045 });
  }

  /* ===== recap + next episode ===== */
  const sOn = t >= tS; M.hide($('#recap'), !sOn);
  if (sOn) {
    M.vis($('#rchip'), t, tS + 0.1, 1e9, { dy: 16 });
    M.rise($('#rh'), t, tS + 0.18, { st: 0.06, sp: M.HEAVY });
    ROWS.forEach((_, i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      for (let k = 0; k < 2; k++) {
        const el = $('#fp' + i + k), a = tPill[i][k] - 0.05; M.vis(el, t, a, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const b = k === 0 ? tPill[i][1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.05 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      }
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on big scene changes, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.2);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
