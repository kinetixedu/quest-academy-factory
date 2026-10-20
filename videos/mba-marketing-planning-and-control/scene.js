// MBA - Marketing Management, Ep 32: Marketing Planning and Control (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  cart: ['M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  phoneCall: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  bike: ['M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  route: ['M6 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  clipboard: ['M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'm9 14 2 2 4-4'],
  files: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tC2 = T0('C2');
const tShrinkA = tMorph + 0.95, tFest = wt('H2', 'festive'), tSuper = wt('H2', 'supermarket'), tEmpty = wt('H2', 'empty'), tWhole = wt('H2', 'whole');
const tNotice = wt('C2', 'noticed'), tCalled = wt('C2', 'called'), tPlanA = wt('C2', 'plan'), tCheckA = wt('C2', 'checking');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tTagL = [wt('L1', 'Zoya'), wt('L1', 'team') + 0.15, wt('L1', 'team'), wt('L1', 'Nani')]; // Zoya, Dev, Arjun, Nani
const tBr = [wt('L2', 'Arjun'), wt('L2', 'Dev'), wt('L2', 'Nani')], tPlanL = wt('L3', 'plan'), tMonthL = wt('L3', 'month');
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('P0') - 0.32;
const tMapW = wt('D2', 'map'), tQ3 = [wt('D3', 'where'), wt('D3', 'want'), wt('D3', 'how')];
const tReal = wt('D4', 'real'), tPlanD = wt('D4', 'plan'), tOff = wt('D5', 'off'), tSw = [wt('D5', 'off'), wt('D5', 'why'), wt('D5', 'fix')];
// P
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('M1') - 0.32;
// M: the control loop
const tM1 = T0('M1'), tM = [2, 3, 4, 5, 6, 7, 8].map(i => T0('M' + i)); // tM[0] = M2 ... tM[6] = M8
const tGoalJ = wt('M2', 'three'), tMeas = wt('M3', 'Measure'), tCounts = wt('M3', 'counts'), tEnds = wt('M3', 'ends'), tOnJ = wt('M3', 'On');
const tGoalF = wt('M4', 'goal'), tOnly = wt('M4', 'Only'), tSoldF = wt('M4', 'sold');
const tCause = wt('M5', 'Find'), tWeek3 = wt('M6', 'week'), tArjM = wt('M6', 'Arjun');
const tFix = wt('M7', 'Fix'), tCorr = wt('M7', 'corrective'), tNow = wt('M7', 'now');
const tMar = wt('M8', 'March'), tSalesM = wt('M8', 'sales'), tBack = wt('M8', 'Back'), tLoop = wt('M8', 'loop');
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'Control'), tK0 = T0('K0'), tTu = tK0 - 0.32;
// K
const tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bakery'), wt('K3', 'food'), wt('K4', 'bank')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'job'), wt('X2', 'problems')], tXh = [wt('X3', 'paperwork'), wt('X3', 'numbers')];
const tArjX = wt('X4', 'Arjun'), tFour = wt('X4', 'four'), tNaniX = wt('X5', 'Nani'), tTaste = wt('X5', 'taste'), tGoalX = wt('X5', 'goal'), tIke = wt('X6', 'Eisenhower');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'They');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'where'), wt('S2', 'going'), wt('S2', 'how')], [wt('S3', 'goal'), wt('S3', 'measure'), wt('S3', 'cause'), wt('S3', 'fix')], [wt('S4', 'often'), wt('S4', 'change')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const fmt = v => Math.round(v).toLocaleString('en-IN');

// A: channels, what went wrong, the shelf
const CH = [['store', 'LOCAL SHOPS', '10'], ['cart', 'SUPERMARKET', '1'], ['phone', 'ONLINE SHOP', '1']];
$('#chRow').innerHTML = CH.map(([ic, l, n], i) => `<div class="cht" id="ch${i}" style="left:${36 + i * 243}px"><div class="zn">${l}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="cn">${n}</div></div>`).join('');
const METH = [['check', 'Good laddoos', 0], ['x', 'A plan?', 1], ['x', 'Checks?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
const SHELF = [1, 0.45, 0, 1]; // stock left at the end of each week
$('#wkRow').innerHTML = [0, 1, 2, 3].map(i => `<div class="wkS" id="ws${i}" style="left:${36 + i * 182}px"><div class="zn">WEEK ${i + 1}</div><div class="sb"><i id="wsF${i}"></i></div><div class="zt" id="wsT${i}"></div></div>`).join('');
wrap($('#shop'), 'shopOut', 784, 580);

// L: who brings what
const BR = [['arjun', 'Arjun', 'SALES', 'chart', 'Sales numbers'], ['dev', 'Dev', 'DESIGN AND ONLINE', 'phone', 'Online orders'], ['nani', 'Nani', 'THE KITCHEN', 'laddoo', 'How much we can make']];
$('#brRows').innerHTML = BR.map(([f, n, r, ic, c], i) => `<div class="brr" id="br${i}" style="top:${92 + i * 112}px"><div class="fa" style="${FACE(f)}"></div><div class="bn">${n}</div><div class="bs">${r}</div><div class="bc" id="bc${i}">${M.icon(ic, 24, C.gold, 2.2)}<span>${c}</span></div></div>`).join('');
$('#goalI').innerHTML = M.icon('calendar', 34, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);

// D: plan questions, plan vs real, the fix
const QR = [['pin', 'Where are we now?'], ['flag', 'Where do we want to go?'], ['route', 'How will we get there?']];
$('#qRows').innerHTML = QR.map(([ic, t], i) => `<div class="qrow" id="qr${i}" style="top:${298 + i * 88}px"><i>${M.icon(ic, 28, C.gold, 2.2)}</i><div class="qt">${t}</div><div class="qn">0${i + 1}</div></div>`).join('');
$('#offI').innerHTML = M.icon('x', 20, '#fff', 3);
const SWT = [['search', 'STEP 1', 'Spot the gap'], ['help', 'STEP 2', 'Find out why'], ['wrench', 'STEP 3', 'Fix it']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

// P: four questions
const P4 = [['pin', 'Where are', 'we now?', 'THE SITUATION', 'zoya', 'Shops and the supermarket are strong. Online sales are weak.'],
  ['flag', 'Where do', 'we go?', 'THE GOAL', 'zoya', 'Goal: 3,400 packs a month, by March'],
  ['route', 'How do we', 'get there?', 'ACTIONS AND BUDGET', 'arjun', 'Arjun adds shops, Dev runs posts. Each job has a date and a budget.'],
  ['clipboard', 'How will', 'we check?', 'THE CONTROLS', 'arjun', 'Count the packs sold every week, shop by shop']];
$('#p4').innerHTML = P4.map(([ic, a, b], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div></div>` + (i < 3 ? `<div class="cx" id="cx${i}" style="left:${536 + i * 408}px">${M.icon('arrowR', 18, C.gold, 2.6)}</div>` : '')).join('');
$('#p4L').innerHTML = P4.map((p, i) => `<div class="p4t" id="p4t${i}" style="left:${160 + i * 408 + 164}px"></div><div class="p4l" id="p4l${i}">${p[3]}</div>`).join('');
$('#pePans').innerHTML = [[null, 'INSIDE A MARKETING PLAN', 'Four questions, written down on one plan']].concat(P4.map((p, i) => [p[4], `QUESTION 0${i + 1} · AT LADDOO LAB`, p[5]])).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('file', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div></div>`).join('');

/* M: control loop (left) and goal-vs-real chart (right) */
const NODE = [[344, 45, 'flag', '1', 'Set the goal', 396, 54, 'start'], [474, 175, 'chart', '2', 'Measure', 526, 184, 'start'], [344, 305, 'search', '3', 'Find the cause', 396, 314, 'start'], [214, 175, 'wrench', '4', 'Fix it', 162, 184, 'end']];
$('#nodes').innerHTML = NODE.map(([x, y, ic, n, l, lx, ly, an], i) => `<g id="nd${i}" transform="translate(${x} ${y})"><circle r="34" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/><g class="ni" transform="translate(-14 -14)">${M.icon(ic, 28, C.ink, 2.2)}</g></g>
  <text id="nl${i}" x="${lx}" y="${ly}" text-anchor="${an}" font-family="Poppins" font-weight="600" font-size="24" fill="#14213D"><tspan fill="#B8862F" font-weight="700">${n}</tspan>  ${l}</text>`).join('');
const MON = [[760, 770, 750, 770], [800, 800, 200, 800], [860, 860, 870, 860]], GOAL = [3000, 3200, 3400], MN = ['JAN', 'FEB', 'MAR'];
const BASE = 286, KY = 0.062, CX = [175, 380, 585], BW = 108;
const yv = v => BASE - v * KY;
$('#grid').innerHTML = [1000, 2000, 3000, 4000].map(v => `<line x1="64" y1="${yv(v)}" x2="688" y2="${yv(v)}" stroke="#EEE8DB" stroke-width="2"/><text x="0" y="${yv(v) + 5}" font-family="Poppins" font-weight="600" font-size="14" fill="#B9B1A3" letter-spacing="1">${fmt(v)}</text>`).join('') +
  `<line x1="64" y1="${BASE}" x2="688" y2="${BASE}" stroke="#D9D0BF" stroke-width="3" stroke-linecap="round"/>` +
  MN.map((m, i) => `<text id="mn${i}" x="${CX[i]}" y="${BASE + 26}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" letter-spacing="2" fill="#14213D">${m}</text><text id="mg${i}" x="${CX[i]}" y="${BASE + 48}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.5" fill="#8A8274">GOAL ${fmt(GOAL[i])}</text>`).join('');
$('#bars').innerHTML = MON.map((ws, m) => ws.map((_, k) => `<rect id="b${m}${k}" x="${CX[m] - BW / 2}" width="${BW}" rx="6" fill="#B8862F"/>`).join('')).join('');
$('#goals').innerHTML = GOAL.map((g, m) => `<line id="gl${m}" x1="${CX[m] - 76}" y1="${yv(g)}" x2="${CX[m] + 76}" y2="${yv(g)}" stroke="#14213D" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>`).join('');
{ const x = CX[1] + BW / 2 + 12, y0 = yv(2600), y1 = yv(3200);
  $('#gap').innerHTML = `<path id="gpP" d="M${x} ${y1} h8 V${y0} h-8" fill="none" stroke="#B5482F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text id="gpT" x="${x + 16}" y="${(y0 + y1) / 2 + 8}" font-family="Poppins" font-weight="700" font-size="22" fill="#B5482F">-600</text>`; }
$('#wtRow').innerHTML = [0, 1, 2, 3].map(k => `<div class="wt4" id="wt${k}" style="left:${48 + k * 176}px"><div class="zn">WEEK ${k + 1}</div><div class="zv" id="wv${k}"></div></div>`).join('');
wrap($('#mL'), 'mLOut', 784, 580);

// K: four kinds of control
const KA = [
  ['target', 'Annual plan', 'Annual plan control', 'Are we hitting our goals?', 'Packs sold against the goal, every month', 'phone', 'A phone maker checks sales against its yearly target'],
  ['coin', 'Profitability', 'Profitability control', 'Where do we really make money?', 'Profit per pack: shops, supermarket, online', 'store', 'A bakery finds which items earn and which lose'],
  ['zap', 'Efficiency', 'Efficiency control', 'Is every rupee working?', 'Dev checks which posts bring real orders', 'bike', 'A food delivery app counts the orders from each ad'],
  ['compass', 'Strategic', 'Strategic control', 'Are we still on the right road?', 'Every year: are tiffin parents still our best market?', 'bank', 'A bank asks if its branches still suit phone users'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['KOTLER AND KELLER · MARKETING MANAGEMENT', 'Four kinds of control', 'Each one asks a different question', null]].concat(KA.map((a, i) => [`CONTROL 0${i + 1} / 04`, a[2], a[3], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[5], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO A BANK</div><div class="pe"><i>${M.icon('clipboard', 34, C.gold, 2.2)}</i><span>Same checks, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['users', 'Clear jobs'], ['search', 'Early warnings']];
const XH = [['files', 'Paperwork'], ['heart', 'Misses feelings']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('quote', 30, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('repeat', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
Object.assign(M.IC, { quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'] });
$('#factI').innerHTML = M.icon('quote', 30, C.ink, 2.2);

// quiz
const OPTS = ['Market research', 'Marketing control', 'Positioning', 'Branding'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('repeat', 44, C.gold2, 2.4);
// recap
const ROWS = [['map', 'A marketing plan', ['Where now', 'Where to', 'How']], ['repeat', 'Control', ['Goal', 'Measure', 'Cause', 'Fix']], ['compass', 'Check often', ['Often', 'Ready to change']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// step pill of the loop
const pill = (k, ic, tx, tm, bad, fin) => {
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
// loop timeline: token angle (deg, clockwise from the top)
const angT = M.track(0, [[tMeas - 0.1, 90], [tCause - 0.1, 180], [tFix - 0.1, 270], [tMar - 0.1, 360]], M.SOFT);
// week counting: [month, week] -> time it is counted
const tWk = [[0, 1, 2, 3].map(k => tCounts + 0.1 + k * (tEnds + 0.3 - tCounts) / 4), [0, 1, 2, 3].map(k => tOnly + 0.15 + k * 0.32), [0, 1, 2, 3].map(k => tSalesM + 0.1 + k * 0.3)];
const monthAt = t => t >= tMar - 0.2 ? 2 : t >= tGoalF - 0.2 ? 1 : 0;
const counted = (m, t) => MON[m].reduce((a, v, k) => a + v * M.o3((t - tWk[m][k]) / 0.35), 0);
const loopState = t => {
  // [face, month label, centre text, centre colour, pill icon, pill text, bad, fin]
  if (t >= tBack) return ['zoya', 'MARCH', 'On track', C.gold, 'check', 'March: 3,450. Back on track', 0, 1];
  if (t >= tSalesM) return ['arjun', 'MARCH', 'Counting', C.ink, 'chart', 'March: count every week', 0, 0];
  if (t >= tMar - 0.1) return ['zoya', 'MARCH', 'Goal 3,400', C.ink, 'flag', 'New goal: 3,400 in March', 0, 0];
  if (t >= tNow) return ['arjun', 'FEBRUARY', 'Fixed', C.gold, 'check', 'Refill the shelf every week', 0, 1];
  if (t >= tFix - 0.1) return ['arjun', 'FEBRUARY', 'Fix it', C.ink, 'wrench', 'Fix it: corrective action', 0, 0];
  if (t >= tArjM) return ['dev', 'FEBRUARY', 'Found it', C.red, 'clock', 'Refilled only every 2 weeks', 1, 0];
  if (t >= tWeek3 - 0.1) return ['dev', 'FEBRUARY', 'Week 3', C.red, 'store', 'Week 3: supermarket shelf empty', 1, 0];
  if (t >= tCause - 0.1) return ['dev', 'FEBRUARY', 'Why?', C.ink, 'search', 'Find the cause: week by week', 0, 0];
  if (t >= tSoldF) return ['arjun', 'FEBRUARY', '600 short', C.red, 'x', 'February: 2,600. 600 short', 1, 1];
  if (t >= tOnly) return ['arjun', 'FEBRUARY', 'Counting', C.ink, 'chart', 'February: count every week', 0, 0];
  if (t >= tGoalF - 0.2) return ['zoya', 'FEBRUARY', 'Goal 3,200', C.ink, 'flag', 'New goal: 3,200 in February', 0, 0];
  if (t >= tOnJ) return ['arjun', 'JANUARY', 'On track', C.gold, 'check', 'January: 3,050. On track', 0, 1];
  if (t >= tMeas - 0.1) return ['arjun', 'JANUARY', 'Counting', C.ink, 'chart', 'Measure: count every week', 0, 0];
  if (t >= tGoalJ - 0.2) return ['zoya', 'JANUARY', 'Goal 3,000', C.ink, 'flag', 'Set the goal: 3,000 in January', 0, 0];
  return ['zoya', 'JANUARY', 'Ready', C.ink, 'clipboard', 'The plan is ready', 0, 0];
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // team tags sit beside the figures while the card is full width
  [['tgZ', 200], ['tgD', 288]].forEach(([id, y]) => { const e = $('#' + id); e.style.left = (60 - e.offsetWidth) + 'px'; e.style.top = y + 'px'; });
  [['tgA', 200], ['tgN', 288]].forEach(([id, y]) => { const e = $('#' + id); e.style.left = '724px'; e.style.top = y + 'px'; });
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  document.querySelectorAll('.st4 .s1, .st4 .s2').forEach(el => { if (el.offsetWidth > 312) el.style.fontSize = Math.floor(34 * 312 / el.offsetWidth) + 'px'; });
  P4.forEach((_, i) => { const l = $('#p4l' + i); l.style.left = (160 + i * 408 + 188 - l.offsetWidth / 2) + 'px'; });
  document.querySelectorAll('#pePans .pt2').forEach(el => { if (el.offsetWidth > 1392) el.style.fontSize = Math.floor(36 * 1392 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  for (let i = 0; i < 3; i++) { const b = $('#bb' + i); if (b.offsetWidth > 332) b.style.fontSize = Math.floor(22 * 332 / b.offsetWidth) + 'px'; }
  document.querySelectorAll('#fact2 .kt').forEach(el => { if (el.offsetWidth > 540) el.style.fontSize = Math.floor(28 * 540 / el.offsetWidth) + 'px'; });
  ['qq1', 'qq2'].forEach(id => { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const POPo = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tP0 - 0.2 ? [1e9, 1e9] : t < tT ? [tP[1] + 0.2, tMout] : [tX4 + 0.2, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: the empty shelf ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    const sh = $('#shop'); M.vis(sh, t, tMorph + 0.18, tAout, { dy: 36, ...o }); grow(sh, $('#shopOut'), t, tShrinkA);
    M.vis($('#shopImg'), t, tMorph + 0.4, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#chT'), t, tShrinkA + 0.1, tAout, { dx: 60, dy: 0, ...o });
    const chA = $('#chA'), chB = $('#chB');
    M.vis(chA, t, tShrinkA + 0.1, tC2 - 0.05, { dy: 0, fade: 0.01, outDur: 0.25, ody: -10 });
    CH.forEach((_, i) => {
      const el = $('#ch' + i); M.vis(el, t, tShrinkA + 0.3 + i * 0.12, 1e9, POPo);
      const on = i === 1 ? M.io((t - tSuper) / 0.3) : 0;
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on); el.querySelector('.cn').style.color = mix(C.ink, '#fff', on);
      setIco(el.querySelector('.zi'), CH[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis(chB, t, tC2 + 0.05, 1e9, { dy: 10, fade: 0.2 });
    M.rise($('#askT2'), t, tC2 + 0.1, { st: 0.07, sp: M.HEAVY });
    M.vis($('#mt0'), t, tNotice, 1e9, POPo); M.vis($('#mt1'), t, tPlanA - 0.1, 1e9, POPo); M.vis($('#mt2'), t, tCheckA - 0.1, 1e9, POPo);
    M.vis($('#shelf'), t, tFest - 0.05, tAout, { dy: 36, ...o });
    for (let i = 0; i < 4; i++) {
      const el = $('#ws' + i); M.vis(el, t, tFest + 0.15 + i * 0.08, 1e9, { dy: 16 });
      const tl = i < 2 ? tSuper + i * 0.35 : i === 2 ? tEmpty - 0.05 : tWhole + 0.2;
      const u = M.io((t - tl) / 0.45), lvl = i === 3 ? 1 : M.lerp(1, SHELF[i], u);
      const f = $('#wsF' + i); f.style.width = (110 * Math.max(lvl, 0.0001)).toFixed(1) + 'px';
      const empty = i === 2 && u > 0.5;
      f.style.background = i === 1 && u > 0.5 ? C.red2 : C.gold;
      el.style.background = mix(C.paper, C.redBg, i === 2 ? u : 0);
      const tx = i === 2 ? (empty ? 'Empty' : 'Full') : i === 1 ? (u > 0.5 ? 'Low' : 'Full') : 'Full';
      const z = $('#wsT' + i); M.setT(z, i === 3 ? (t >= tl ? 'Refilled' : 'Full') : tx);
      z.style.color = empty ? C.red : C.ink;
      if (i === 3) { const r = M.io((t - tl) / 0.4); f.style.width = (110 * (t < tl - 0.01 ? 1 : r)).toFixed(1) + 'px'; }
    }
  }

  /* ===== L: the team ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    ['tgZ', 'tgD', 'tgA', 'tgN'].forEach((id, i) => M.vis($('#' + id), t, tTagL[i] - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 }));
    M.vis($('#bring'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    BR.forEach((_, i) => {
      M.vis($('#br' + i), t, tBr[i] - 0.1, 1e9, { dy: 16 });
      M.vis($('#bc' + i), t, tBr[i] + 0.35, 1e9, POPo);
      const on = M.io((t - tBr[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tBr[i + 1]) / 0.25) : M.io((t - tL3) / 0.25)));
      $('#br' + i).querySelector('.fa').style.boxShadow = '0 0 0 3px ' + mix(C.ink, C.gold, on);
    });
    M.vis($('#goalS'), t, tPlanL - 0.1, 1e9, { dy: 24 });
    M.rise($('#goalS .g1'), t, tPlanL, { st: 0.04 });
    M.vis($('#goalS .g2'), t, tMonthL - 0.1, 1e9, { dy: 10 });
  }

  /* ===== D: planning and control ===== */
  const dOn = t >= tD1 - 0.1 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#mapS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#mapA'), t, tD2 + 0.45, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.drawU($('#mapP'), M.o3((t - tMapW + 0.1) / 0.8));
    M.vis($('#mapB'), t, tMapW + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#kpT'), t, tD2 + 0.3, { st: 0.06, sp: M.HEAVY }); M.vis($('#kpS'), t, tMapW, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    QR.forEach((_, i) => {
      const el = $('#qr' + i); M.vis(el, t, tQ3[i] - 0.1, 1e9, { dy: 16 });
      const on = M.io((t - tQ3[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tQ3[i + 1]) / 0.25) : M.io((t - tD4) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.qt').style.color = mix(C.ink, '#fff', on);
      el.querySelector('i').style.background = mix('#fff', C.navy2, on); setIco(el.querySelector('i'), QR[i][0], on > 0.5 ? C.gold2 : C.gold, 28, 2.2);
    });
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 2; i++) M.vis($('#pv' + i), t, tD4 + 0.35 + i * 0.1, 1e9, { dy: 12 });
    const f0 = $('#pvF0'), f1 = $('#pvF1');
    f0.style.width = (616 * M.o3((t - tPlanD + 0.4) / 0.6)).toFixed(1) + 'px'; f0.style.background = C.gold;
    f1.style.width = (616 * 0.72 * M.o3((t - tReal) / 0.8)).toFixed(1) + 'px'; f1.style.background = C.red2;
    M.vis($('#offT'), t, tOff - 0.05, 1e9, POPo);
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, POPo);
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== P: the four questions of a plan ===== */
  const pOn = t >= tP0 - 0.1 && t < tM1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      if (i < 3) M.vis($('#cx' + i), t, tP0 + 0.3 + i * 0.07, tPout, { ...POPo, sc: 0.5, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
      M.vis($('#p4l' + i), t, ta + 0.1, tPout, { dy: 8, ...o }); M.vis($('#p4t' + i), t, ta + 0.1, tPout, { dy: 0, ...o });
      const lc = mix(C.muted, C.gold, act); $('#p4l' + i).style.color = lc; $('#p4t' + i).style.background = mix(C.line, C.gold, act);
    });
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
    }
  }

  /* ===== M: the control loop ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    M.vis($('#ring4'), t, tM1 + 0.35, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#msL'), t, tM1 + 0.6, 1e9, { ...POPo, sc: 0.8 });
    const ang = angT(t), act = Math.round(ang / 90) % 4, near = Math.abs(ang - Math.round(ang / 90) * 90) < 12, started = t >= tGoalJ - 0.2;
    NODE.forEach((_, i) => {
      const g = $('#nd' + i); g.style.opacity = M.clamp((t - tM1 - 0.5 - i * 0.12) / 0.15).toFixed(3);
      $('#nl' + i).style.opacity = M.clamp((t - tM1 - 0.6 - i * 0.12) / 0.15).toFixed(3);
      const isAct = started && near && act === i, done = started && !isAct && (ang >= i * 90 + 45 || ang >= 315);
      const r = g.querySelector('circle');
      attr(r, 'fill', isAct ? C.ink : done ? C.gold3 : '#FFFFFF'); attr(r, 'stroke', isAct ? C.ink : done ? C.gold : C.line);
      const ni = g.querySelector('.ni'), k = isAct ? 'a' : 'b'; if (ni._k !== k) { ni._k = k; ni.innerHTML = M.icon(NODE[i][2], 28, isAct ? C.gold2 : C.ink, 2.2); }
    });
    const rad = (ang - 90) * Math.PI / 180;
    attr($('#tok'), 'transform', `translate(${(344 + 130 * Math.cos(rad)).toFixed(2)} ${(175 + 130 * Math.sin(rad)).toFixed(2)})`);
    $('#tok').style.opacity = M.clamp((t - tGoalJ + 0.2) / 0.15).toFixed(3);
    M.drawU($('#trail'), ang / 360); M.hide($('#trail'), ang < 0.5);
    const st = loopState(t);
    attr($('#cFaceI'), 'href', `${IMG}ll-${st[0]}-face.jpg`);
    $('#cFace').style.opacity = M.clamp((t - tM1 - 0.8) / 0.15).toFixed(3);
    M.setT($('#cMon'), st[1]); M.setT($('#cSt'), st[2]); attr($('#cSt'), 'fill', st[3]);
    $('#cMon').style.opacity = $('#cSt').style.opacity = M.clamp((t - tM1 - 0.9) / 0.15).toFixed(3);
    pill('L', st[4], st[5], '', st[6], st[7]);
    // chart
    M.vis($('#chart'), t, tM1 + 0.45, 1e9, { dy: 20, sp: M.SOFT });
    const mo = monthAt(t);
    for (let mm = 0; mm < 3; mm++) {
      const tg = [tGoalJ, tGoalF, tMar][mm];
      M.vis($('#gl' + mm), t, tg - 0.05, 1e9, { dx: -16, dy: 0, fade: 0.15 });
      $('#mn' + mm).style.opacity = M.clamp((t - tM1 - 0.6 - mm * 0.1) / 0.15).toFixed(3);
      $('#mg' + mm).style.opacity = M.clamp((t - tg + 0.05) / 0.15).toFixed(3);
      let cum = 0;
      MON[mm].forEach((v, k) => {
        const u = M.o3((t - tWk[mm][k]) / 0.35), h = Math.max(0, v * KY * u - 3), b = $('#b' + mm + k);
        attr(b, 'y', (BASE - cum * KY - h - (k ? 3 : 0)).toFixed(2)); attr(b, 'height', h.toFixed(2)); M.hide(b, h <= 0.01);
        cum += v * u;
        let col = C.gold;
        if (mm === 1) { const r = M.io((t - tSoldF) / 0.3); col = mix(C.gold, C.red2, r); if (k === 2) col = mix(col, C.red, M.io((t - tWeek3) / 0.3)); }
        attr(b, 'fill', col);
      });
    }
    M.draw($('#gpP'), t, tSoldF, 0.4, M.o3); M.vis($('#gpT'), t, tSoldF + 0.3, 1e9, { dy: 0, fade: 0.15 });
    const tot = counted(mo, t), any = t >= tWk[mo][0];
    M.vis($('#rdR2'), t, tM1 + 0.5, 1e9, { dy: 10 });
    M.setT($('#rdR2'), `${fmt(any ? tot : 0)} sold`);
    $('#rdR2').style.color = t >= tSoldF && mo === 1 ? C.red : (t >= tOnJ && mo === 0) || (t >= tBack && mo === 2) ? C.gold : C.ink;
    for (let k = 0; k < 4; k++) {
      const el = $('#wt' + k); M.vis(el, t, tM1 + 0.7 + k * 0.06, 1e9, { dy: 14 });
      const tk = tWk[mo][k], v = $('#wv' + k);
      M.vis(v, t, tk - 0.05, mo === 0 ? tGoalF - 0.25 : mo === 1 ? tMar - 0.25 : 1e9, { dy: 10, outDur: 0.15, ody: -8 });
      M.count(v, t, tk, 0.35, 0, MON[mo][k], fmt);
      const hot = mo === 1 && k === 2 ? M.io((t - tWeek3) / 0.3) : 0;
      el.style.background = mix(C.paper, C.redBg, hot); v.style.color = mix(C.ink, C.red, hot);
      el.querySelector('.zn').style.color = mix(C.muted, C.red, hot);
    }
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

  /* ===== K: four kinds of control ===== */
  const kOn = t >= tTu - 0.05 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.02, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.15, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.3 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.4, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.7, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POPo);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POPo);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#sheet'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#g4k'), t, tFour - 0.1, 1e9, { dy: 0, fade: 0.15 });
    M.draw($('#gStrk'), t, tTaste - 0.05, 0.35, M.o3);
    M.vis($('#g36'), t, tGoalX - 0.05, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tGoalX - 0.3) / 0.12); $('#shOk').style.opacity = u.toFixed(3); M.hide($('#shOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tArjX, tNaniX, tGoalX][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tTaste ? C.redBg : C.paper; $('#bb0').style.color = t > tTaste ? C.red : C.ink;
    M.vis($('#fact2'), t, tIke - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
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
    ROWS.forEach(([, , ps], i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      ps.forEach((_, k) => {
        const el = $('#fp' + i + k), tp = tPill[i][k]; M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.2 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      });
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the three sweeps, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
