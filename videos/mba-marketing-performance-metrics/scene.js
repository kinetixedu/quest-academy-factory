// MBA - Marketing Management, Ep 35: Marketing Performance Metrics (Laddoo Lab) - series finale
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', green: '#5E8C61' };
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
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  cart: ['M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  bike: ['M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  thumb: ['M7 10v12', 'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tShops = wt('H2', 'shops'), tSuper = wt('H2', 'supermarket'), tOnline = wt('H2', 'online');
const tC2 = T0('C2'), tFeel = wt('C2', 'feel'), tMeas = wt('C2', 'measure');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tTagL = [wt('L1', 'team'), wt('L1', 'team') + 0.15, wt('L1', 'team') + 0.08, wt('L1', 'Nani')];
const tBr = [wt('L2', 'Arjun'), wt('L2', 'Dev'), wt('L2', 'Nani')], tScore = wt('L3', 'scorecard');
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M1') - 0.32;
const tNums = wt('D2', 'numbers'), tWork = wt('D2', 'working'), tAt = [wt('D3', 'number'), wt('D3', 'goal'), wt('D3', 'time')], tLike = wt('D3', 'Like');
// M
const tM1 = T0('M1'), tMs = [T0('M2'), T0('M4'), T0('M6'), T0('M8')], tMout = T0('T1') - 0.32;
const tLast = wt('M2', 'Last'), tThis = wt('M2', 'This');
const tF = [
  [wt('M3', 'Nine'), wt('M3', 'divided'), wt('M3', 'divided') + 0.35, wt('M3', 'percent') - 0.35, wt('M3', 'percent')],
  [wt('M4', 'seventy'), wt('M5', 'That') - 0.2, wt('M5', 'That') - 0.1, wt('M5', 'eighty') - 0.15, wt('M5', 'eighty')],
  [wt('M6', 'Fifty'), wt('M7', 'That') - 0.2, wt('M7', 'That') - 0.1, wt('M7', 'five') - 0.15, wt('M7', 'five')],
  [wt('M9', 'minus'), wt('M9', 'divided'), wt('M9', 'divided') + 0.35, wt('M9', 'fifty') - 0.5, wt('M9', 'fifty') - 0.3]];
const tLight = [wt('M3', 'Green'), wt('M5', 'Green'), wt('M7', 'Red'), wt('M9', 'Green')];
const tTwo = wt('M4', 'two'), tSev = wt('M4', 'seventy'), tFam = wt('M6', 'families'), tCost = wt('M8', 'cost'), tLakh = wt('M8', 'lakh');
// statement, NPS
const tT = T0('T1'), tSt2 = wt('T1', 'you', 1), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tPout = T0('K0') - 0.32;
const tHow = wt('P1', 'how'), tRec = wt('P1', 'recommend'), tBand = [wt('P2', 'Six'), wt('P2', 'Seven'), wt('P2', 'Nine')];
const tHund = wt('P3', 'hundred'), tSixty = wt('P3', 'Sixty'), tTen = wt('P3', 'ten'), tPlus = wt('P3', 'plus');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bank'), wt('K3', 'food'), wt('K4', 'airline')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'works'), wt('X2', 'wasting')], tXh = [wt('X3', 'look'), wt('X3', 'chasing')];
const tLikes = wt('X4', 'likes'), tOrd = wt('X4', 'orders'), tDrops = wt('X5', 'drops'), tKeeps = wt('X5', 'keeps'), tStr = wt('X6', 'Marilyn');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'One');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'numbers')], [wt('S3', 'growth'), wt('S3', 'retention'), wt('S3', 'cost'), wt('S3', 'return'), wt('S3', 'Net')], [wt('S4', 'act')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const rnd = M.rng(35);
// A
$('#tbl').style.overflow = 'visible';
$('#lgrid').innerHTML = Array.from({ length: 50 }, (_, i) => `<div class="ld0" id="g${i}" style="left:${(i % 25) * 34}px;top:${Math.floor(i / 25) * 36}px"></div>`).join('');
$('#cSoldI').innerHTML = M.icon('check', 24, C.gold, 2.6); $('#cLeftI').innerHTML = M.icon('x', 24, C.red, 2.6);
const CH = [['store', 'LOCAL SHOPS', '10'], ['cart', 'SUPERMARKET', '1'], ['phone', 'ONLINE SHOP', '1']];
$('#chRow').innerHTML = CH.map(([ic, l, n], i) => `<div class="cht" id="ch${i}" style="left:${36 + i * 286}px"><div class="zn">${l}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="cn">${n}</div></div>`).join('');
const METH = [['x', 'Just feel it?', 1], ['check', 'Count it', 0]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L
const BR = [['arjun', 'Arjun', 'SALES', 'chart', 'The sales'], ['dev', 'Dev', 'DESIGN AND ONLINE', 'phone', 'Ads and surveys'], ['nani', 'Nani', 'THE KITCHEN', 'heart', 'Are people happy?']];
$('#brRows').innerHTML = BR.map(([f, n, r, ic, c], i) => `<div class="brr" id="br${i}" style="top:${92 + i * 112}px"><div class="fa" style="${FACE(f)}"></div><div class="bn">${n}</div><div class="bs">${r}</div><div class="bc" id="bc${i}">${M.icon(ic, 24, C.gold, 2.2)}<span>${c}</span></div></div>`).join('');
$('#goalI').innerHTML = M.icon('file', 34, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);
// D
const MC = [['chart', 'Sales'], ['users', 'Customers'], ['coin', 'Money'], ['heart', 'Happiness']];
$('#mcRow').innerHTML = MC.map(([ic, t], i) => `<div class="mc" id="mc${i}" style="left:${48 + i * 176}px"><div class="zi">${M.icon(ic, 44, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
$('#dSubI').innerHTML = M.icon('hash', 30, C.gold, 2.4);
const AT = [['hash', 'A NUMBER', '% kept', 'what you count'], ['target', 'A GOAL', '80%', 'what good looks like'], ['calendar', 'A TIME', '1 year', 'by when']];
$('#atRow').innerHTML = AT.map(([ic, l, v, s], i) => `<div class="at" id="at${i}" style="left:${48 + i * 235}px"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><div class="zn">${l}</div><div class="zv">${v}</div><div class="es" style="position:absolute;left:0;right:0;top:240px;text-align:center;font:500 20px Poppins;color:#3A4560;white-space:nowrap">${s}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);
// M: scorecard tiles
const SC = [['METRIC 01', 'Sales growth', '30%', 'GOAL 25%', 1], ['METRIC 02', 'Customer retention', '85%', 'GOAL 80%', 1], ['METRIC 03', 'Cost to win one', '₹500', 'GOAL ₹400', 0], ['METRIC 04', 'Return on marketing', '150%', 'GOAL 100%', 1]];
$('#scGrid').innerHTML = SC.map(([n, t, v, g], i) => `<div class="sct" id="sq${i}" style="left:${48 + (i % 2) * 352}px;top:${92 + Math.floor(i / 2) * 216}px"><div class="zn">${n}</div><div class="zt">${t}</div><div class="zv" id="sv${i}">?</div><div class="zg">${g}</div><div class="lt" id="sl${i}"><span id="slI${i}"></span><span id="slT${i}"></span></div></div>`).join('');
// M: math panels
$('#gUpI').innerHTML = M.icon('trendUp', 22, C.gold, 2.4); $('#gNetI').innerHTML = M.icon('trendUp', 22, C.gold, 2.4);
const STOP = new Set(); while (STOP.size < 30) STOP.add(Math.floor(rnd() * 200));
$('#famGrid').innerHTML = Array.from({ length: 200 }, (_, i) => `<div class="fd" id="fm${i}" style="left:${152 + (i % 20) * 24}px;top:${110 + Math.floor(i / 20) * 24}px"></div>`).join('');
$('#newGrid').innerHTML = Array.from({ length: 100 }, (_, i) => `<div class="fd" id="nw${i}"></div>`).join('');
// NPS
$('#scRow').innerHTML = Array.from({ length: 11 }, (_, i) => `<div class="sc11" id="s11${i}" style="left:${48 + i * 63.2}px">${i}</div>`).join('');
const BANDS = [['DETRACTORS', '0 TO 6', 0, 6, C.red], ['PASSIVES', '7 TO 8', 7, 8, C.muted], ['PROMOTERS', '9 TO 10', 9, 10, C.gold]];
$('#bands').innerHTML = BANDS.map(([n, r, a, b, c], i) => { const x0 = 48 + a * 63.2, x1 = 48 + b * 63.2 + 56; return `<div class="bl" id="bd${i}" style="left:${x0}px;width:${x1 - x0}px"><b style="color:${c}">${n}</b><span>${r}</span></div>`; }).join('');
$('#ndGrid').innerHTML = Array.from({ length: 100 }, (_, i) => `<div class="nd" id="nd${i}" style="left:${48 + (i % 10) * 38}px;top:${96 + Math.floor(i / 10) * 38}px"></div>`).join('');
const LG = [['PROMOTERS', 60, C.gold], ['PASSIVES', 30, C.dim], ['DETRACTORS', 10, C.red]];
$('#lgRows').innerHTML = LG.map(([n, v, c], i) => `<div class="lg" id="lg${i}" style="top:${96 + i * 76}px"><div class="sw" style="background:${c}"></div><div class="zn">${n}</div><div class="zv" id="lgv${i}">${v}</div></div>`).join('');
// K
const KA = [
  ['trendUp', 'Sales growth', 'Sales growth', 'How fast are sales rising?', '39,000 packs, up 30% on last year', 'phone', 'A phone maker compares its growth with the market'],
  ['repeat', 'Retention', 'Customer retention', 'Who keeps buying?', '170 of 200 regular families stayed', 'bank', 'A bank counts customers who close accounts'],
  ['coin', 'Return', 'Return on marketing', 'What did each rupee bring back?', 'The festive campaign returned 150%', 'bike', 'A delivery app checks the profit from each ad'],
  ['heart', 'NPS', 'Net Promoter Score', 'Would people recommend us?', 'A score of +50 from 100 customers', 'plane', 'An airline asks travellers to rate it 0 to 10'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['FROM THE SCORECARD TO THE REAL WORLD', 'Metrics at work', 'Every business keeps a scorecard', null]].concat(KA.map((a, i) => [`METRIC 0${i + 1} / 04`, a[2], a[3], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[5], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO AN AIRLINE</div><div class="pe"><i>${M.icon('chart', 34, C.gold, 2.2)}</i><span>Same numbers, any size of business</span></div>`) + `</div>`).join('');
// X
const XG = [['search', 'Shows what works'], ['coin', 'Less waste']];
const XH = [['thumb', 'Empty numbers'], ['target', 'Chasing the score']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#lkI0').innerHTML = M.icon('trendUp', 44, C.gold, 2.4); $('#lkI1').innerHTML = M.icon('minus', 44, C.dim, 2.6);
const KR2 = [['Post likes', 0], ['Orders from posts', 1], ['Repeat buyers', 1]];
$('#kRows2').innerHTML = `<div class="lbl" id="kr2L" style="left:48px;top:254px">NEXT YEAR'S SCORECARD</div>` + KR2.map(([t], i) => `<div class="kr2" id="kq${i}" style="top:${282 + i * 50}px"><i id="kqI${i}"></i><span id="kqT${i}">${t}</span><div class="sk" id="kqS${i}"></div></div>`).join('');
$('#factI').innerHTML = M.icon('quote', 30, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('target', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['15%', '70%', '85%', '117%'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('repeat', 44, C.gold2, 2.4);
// recap
const ROWS = [['chart', 'Metrics show if marketing works', ['Number, goal, time']], ['target', 'Five to track', ['Growth', 'Retention', 'Cost to win', 'Return', 'NPS']], ['compass', 'Measure what matters', ['Then act on it']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('check', 40, C.gold2, 2.6);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const bar = (id, w, col) => { const e = $('#' + id); e.style.width = Math.max(0, w).toFixed(1) + 'px'; e.style.background = col; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const cl = $('#cLeft'); cl.style.left = (884 - cl.offsetWidth) + 'px';
  [['tgZ', 200], ['tgD', 288]].forEach(([id, y]) => { const e = $('#' + id); e.style.left = (60 - e.offsetWidth) + 'px'; e.style.top = y + 'px'; });
  [['tgA', 200], ['tgN', 288]].forEach(([id, y]) => { const e = $('#' + id); e.style.left = '724px'; e.style.top = y + 'px'; });
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  { const g = $('#exS .g1'); if (g.offsetWidth > 624) g.style.fontSize = Math.floor(34 * 624 / g.offsetWidth) + 'px'; }
  document.querySelectorAll('.sct .zt').forEach(el => { if (el.offsetWidth > 288) el.style.fontSize = Math.floor(22 * 288 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#fact2 .kt').forEach(el => { if (el.offsetWidth > 548) el.style.fontSize = Math.floor(26 * 548 / el.offsetWidth) + 'px'; });
  ['qq1', 'qq2'].forEach(id => { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  { const nt = $('#next .nt'); if (nt.offsetWidth > 1180) nt.style.fontSize = Math.floor(34 * 1180 / nt.offsetWidth) + 'px'; }
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
  const exOn = t < tT ? [tM1 + 0.4, tMout] : [tP3 - 0.2, tPout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: from fifty laddoos to a brand ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 50; i++) {
      const el = $('#g' + i); M.vis(el, t, tMorph + 0.5 + i * 0.012, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      el.style.background = i < 8 ? C.gold : C.red2; el.style.boxShadow = i < 8 ? '0 0 0 3px ' + C.gold3 : 'none';
    }
    M.vis($('#cSold'), t, tMorph + 1.1, 1e9, POPo); M.vis($('#cLeft'), t, tMorph + 1.3, 1e9, POPo);
    M.vis($('#nowC'), t, tShops - 0.25, tAout, { dy: 36, ...o });
    M.vis($('#nowA'), t, tShops - 0.2, tC2 - 0.05, { dy: 0, fade: 0.01, outDur: 0.25, ody: -10 });
    const tc = [tShops, tSuper, tOnline];
    CH.forEach((_, i) => M.vis($('#ch' + i), t, tc[i] - 0.05, 1e9, POPo));
    M.vis($('#nowB'), t, tC2 + 0.05, 1e9, { dy: 10, fade: 0.2 });
    M.vis($('#mt0'), t, tFeel - 0.1, 1e9, POPo); M.vis($('#mt1'), t, tMeas - 0.1, 1e9, POPo);
    M.rise($('#askT2'), t, tMeas, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the year-end review ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    ['tgZ', 'tgD', 'tgA', 'tgN'].forEach((id, i) => M.vis($('#' + id), t, tTagL[i] - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 }));
    M.vis($('#bring'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    BR.forEach((_, i) => {
      M.vis($('#br' + i), t, tBr[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#bc' + i), t, tBr[i] + 0.35, 1e9, POPo);
      const on = M.io((t - tBr[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tBr[i + 1]) / 0.25) : M.io((t - tL3) / 0.25)));
      $('#br' + i).querySelector('.fa').style.boxShadow = '0 0 0 3px ' + mix(C.ink, C.gold, on);
    });
    M.vis($('#goalS'), t, tL3 - 0.1, 1e9, { dy: 24 });
    M.rise($('#goalS .g1'), t, tL3 + 0.05, { st: 0.04 }); M.vis($('#goalS .g2'), t, tScore, 1e9, { dy: 10 });
  }

  /* ===== D: what are metrics ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.rise($('#dT1'), t, tNums - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#dT2'), t, tWork - 0.25, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kqHr'), t, tD2 + 0.4, 1e9, { dy: 0 });
    MC.forEach((_, i) => M.vis($('#mc' + i), t, tD2 + 0.5 + i * 0.12, 1e9, POPo));
    M.vis($('#dSub'), t, tWork + 0.3, 1e9, { dy: 16 });
    M.vis($('#anat'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    AT.forEach((_, i) => {
      const el = $('#at' + i); M.vis(el, t, tAt[i] - 0.1, 1e9, { dy: 16 });
      const on = M.io((t - tAt[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tAt[i + 1]) / 0.25) : M.io((t - tLike) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.zv').style.color = mix(C.ink, '#fff', on);
      el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on); el.querySelector('.es').style.color = mix(C.ink2, C.gold2, on);
      el.querySelector('i').style.background = mix('#fff', C.navy2, on); setIco(el.querySelector('i'), AT[i][0], on > 0.5 ? C.gold2 : C.gold, 34, 2.2);
    });
    M.vis($('#exS'), t, tLike - 0.1, 1e9, { dy: 24 }); M.rise($('#exS .g1'), t, tLike + 0.15, { st: 0.04 });
  }

  /* ===== M: building the scorecard ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    SC.forEach(([, , v, , good], i) => {
      const el = $("#sq" + i); M.vis(el, t, tM1 + 0.4 + i * 0.08, 1e9, { dy: 16 });
      const nx = i < 3 ? tMs[i + 1] : tMout + 1, act = M.io((t - tMs[i]) / 0.25) * (1 - M.io((t - nx) / 0.3));
      el.style.boxShadow = act > 0.01 ? `0 0 0 3px ${M.rgba(C.gold, act)}` : 'none';
      el.querySelector('.zt').style.color = t < tMs[i] ? C.dim : C.ink;
      const sv = $('#sv' + i), tr = tF[i][4];
      if (t < tr) { M.setT(sv, '?'); sv.style.color = C.line; }
      else { const u = M.o5((t - tr) / 0.5), num = parseFloat(v.replace(/[^0-9]/g, '')), pre = v.startsWith('₹') ? '₹' : '', suf = v.endsWith('%') ? '%' : ''; M.setT(sv, pre + Math.round(num * u) + suf); sv.style.color = C.ink; }
      const lt = $('#sl' + i); M.vis(lt, t, tLight[i] - 0.05, 1e9, POPo);
      if (lt._k !== good) { lt._k = good; lt.style.background = good ? C.green : C.red; $('#slI' + i).innerHTML = M.icon(good ? 'check' : 'x', 16, '#fff', 3); $('#slT' + i).textContent = good ? 'ON TARGET' : 'TOO COSTLY'; }
    });
    // math panels
    for (let k = 0; k < 4; k++) {
      const tin = tMs[k] + 0.05, tout = k < 3 ? tMs[k + 1] - 0.15 : 1e9, pn = $('#mp' + k);
      const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.2, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.fs'), t, tin + 0.15, tout, { dy: 14, ...oo });
      for (let j = 0; j < 5; j++) M.vis($('#f' + k + j), t, tF[k][j] - 0.05, tout, { dy: 10, sp: M.SOFT, fade: 0.12, ...oo });
      if (k === 0) {
        M.vis($('#hb00'), t, tLast - 0.15, tout, { dy: 12, ...oo }); M.vis($('#hb01'), t, tThis - 0.15, tout, { dy: 12, ...oo });
        bar('hf00', 516 * M.o3((t - tLast) / 0.6), C.dim);
        const b1 = M.o3((t - tThis) / 0.6); bar('hf01', 516 * b1, C.dim); $('#hf02').style.left = '516px'; bar('hf02', 154.8 * M.o3((t - tThis - 0.5) / 0.5), C.gold);
        $('#hv00').style.left = '20px'; $('#hv00').style.color = '#fff'; $('#hv01').style.left = '20px'; $('#hv01').style.color = '#fff';
        $('#hv00').style.opacity = M.clamp((t - tLast - 0.4) / 0.2).toFixed(3); $('#hv01').style.opacity = M.clamp((t - tThis - 0.4) / 0.2).toFixed(3);
        M.vis($('#gUp'), t, tF[0][0] - 0.05, tout, { ...POPo, ...oo });
      }
      if (k === 1) {
        for (let i = 0; i < 200; i++) {
          const d = $('#fm' + i); M.vis(d, t, tTwo - 0.2 + (i % 20) * 0.015 + Math.floor(i / 20) * 0.02, tout, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06, ...oo });
          const gone = STOP.has(i) ? M.io((t - tSev + 0.3 - (i % 7) * 0.04) / 0.3) : 0;
          d.style.background = mix(C.gold, C.line, gone);
        }
        M.vis($('#rLeg'), t, tSev, tout, { dy: 10, ...oo });
      }
      if (k === 2) {
        M.vis($('#spendT'), t, tF[2][0] - 0.1, tout, { ...POPo, ...oo });
        M.draw($('#cArrP'), t, tFam - 0.5, 0.4, M.o3);
        for (let i = 0; i < 100; i++) {
          const d = $('#nw' + i); d.style.top = (100 + Math.floor(i / 10) * 30) + 'px'; d.style.left = (352 + (i % 10) * 36) + 'px'; d.style.width = d.style.height = '20px'; d.style.borderRadius = '10px';
          M.vis(d, t, tFam - 0.3 + i * 0.008, tout, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06, ...oo }); d.style.background = C.gold;
        }
      }
      if (k === 3) {
        M.vis($('#hb30'), t, tCost - 0.15, tout, { dy: 12, ...oo }); M.vis($('#hb31'), t, tLakh - 0.3, tout, { dy: 12, ...oo });
        bar('hf30', 275.2 * M.o3((t - tCost) / 0.6), C.red2); bar('hf31', 688 * M.o3((t - tLakh) / 0.7), C.gold);
        $('#hv30').style.left = '20px'; $('#hv30').style.color = C.red; $('#hv31').style.left = '20px'; $('#hv31').style.color = '#fff';
        $('#hv30').style.opacity = M.clamp((t - tCost - 0.4) / 0.2).toFixed(3); $('#hv31').style.opacity = M.clamp((t - tLakh - 0.4) / 0.2).toFixed(3);
        M.vis($('#gNet'), t, tF[3][0] - 0.05, tout, { ...POPo, ...oo });
      }
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

  /* ===== P: Net Promoter Score ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#nps1'), t, tP0 + 0.02, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#nps2'), t, tP0 + 0.15, tPout, { dx: 60, dy: 0, ...o });
    M.rise($('#npsQ1'), t, tHow - 0.1, { st: 0.05 }); M.rise($('#npsQ2'), t, tRec - 0.1, { st: 0.05 });
    for (let i = 0; i < 11; i++) {
      const c = $('#s11' + i); M.vis(c, t, tP0 + 0.4 + i * 0.04, 1e9, { dy: 12 });
      const band = i <= 6 ? 0 : i <= 8 ? 1 : 2, u = M.io((t - tBand[band]) / 0.3), col = [C.red2, C.gold2, C.gold][band];
      c.style.background = mix(C.paper, col, u); c.style.color = band === 2 ? mix(C.ink, '#fff', u) : C.ink;
    }
    BANDS.forEach((_, i) => M.vis($('#bd' + i), t, tBand[i] - 0.05, 1e9, { dy: 10 }));
    M.vis($('#npsF'), t, tP2 + 0.2 > tHund ? tHund - 0.4 : T1('P2') - 0.2, 1e9, { dy: 20 });
    for (let i = 0; i < 100; i++) {
      const d = $('#nd' + i); M.vis(d, t, tP0 + 0.5 + (i % 10) * 0.02 + Math.floor(i / 10) * 0.03, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const g = i < 60 ? M.io((t - tSixty - i * 0.008) / 0.25) : 0, p = i >= 60 && i < 90 ? M.io((t - tSixty - 0.5 - (i - 60) * 0.01) / 0.25) : 0, r = i >= 90 ? M.io((t - tTen - (i - 90) * 0.03) / 0.25) : 0;
      d.style.background = mix(mix(mix(C.line, C.gold, g), C.dim, p), C.red, r);
    }
    LG.forEach((_, i) => M.vis($('#lg' + i), t, [tSixty, tSixty + 0.6, tTen][i] - 0.05, 1e9, { dx: 16, dy: 0 }));
    M.vis($('#npsR'), t, tPlus - 0.2, 1e9, POPo); M.vis($('#npsEq'), t, tTen + 0.3, 1e9, { dy: 10 });
  }

  /* ===== K: metrics at work ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
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
    M.vis($('#lk0'), t, Math.min(tLikes, tX4 + 0.5) - 0.05, 1e9, POPo); M.vis($('#lk1'), t, tOrd - 0.05, 1e9, POPo);
    M.vis($('#kr2L'), t, tX5 - 0.05, 1e9, { dy: 10 });
    KR2.forEach(([, keep], i) => {
      const el = $('#kq' + i); M.vis(el, t, tX5 + 0.05 + i * 0.1, 1e9, { dy: 12 });
      const tt = keep ? tKeeps + (i - 1) * 0.3 : tDrops, u = M.io((t - tt) / 0.3);
      setIco($('#kqI' + i), u > 0.5 ? (keep ? 'check' : 'x') : 'minus', u > 0.5 ? (keep ? C.gold : C.red) : C.dim, 18, 3);
      $('#kqT' + i).style.color = keep ? C.ink : mix(C.ink, C.red, u);
      const sk = $('#kqS' + i); if (!keep) { sk.style.width = (($('#kqT' + i).offsetWidth + 12) * M.o3((t - tDrops) / 0.35)).toFixed(1) + 'px'; } else sk.style.width = '0px';
      el.style.background = keep ? mix(C.paper, C.gold3, u) : mix(C.paper, C.redBg, u);
    });
    M.vis($('#fact2'), t, tStr - 0.1, 1e9, { dy: 16 });
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

  /* ===== recap + series complete ===== */
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
