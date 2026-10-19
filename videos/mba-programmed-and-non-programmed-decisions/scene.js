// MBA - Principles of Management, Ep 22: Programmed and Non-Programmed Decisions
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  package: ['M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z', 'M12 22V12', 'm3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  copy: ['M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z', 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  pencil: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  user2: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tQp = [T0('H2'), T0('C1'), T0('C2')], tForty = wt('C3', 'Forty'), tBig = wt('C3', 'big');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('I1') - 0.32;
// I: festival rush
const tI1 = T0('I1'), tQueue = wt('I2', 'queue'), tAshaI = wt('I2', 'Asha'), tI3 = T0('I3'), tSame = wt('I3', 'same'), tI4 = T0('I4'), tBigQ = wt('I4', 'big'), tIout = T0('D1') - 0.32;
// D: Simon + two types
const tD1 = T0('D1'), tD2 = T0('D2'), tHerb = wt('D2', 'Herbert'), tDesc = wt('D2', 'named'), tTwo = wt('D2', 'two');
const tD3 = T0('D3'), tRout = wt('D3', 'routine'), tRule3 = wt('D3', 'rule'), tD4 = T0('D4'), tNew4 = wt('D4', 'new'), tReady = wt('D4', 'ready'), tClear = wt('D4', 'clear');
const tJudg = wt('D5', 'judgment'), tDout = T0('G0') - 0.32;
// G: the sorting run
const tG0 = T0('G0'), tGout = T0('P0') - 0.32;
const GQ = [
  ['milk', 'Milk below 20 litres?', 1, 'rule', 'Programmed', 'Rule: reorder'],
  ['coin', 'A wrong order?', 1, 'rule', 'Programmed', 'Rule: full refund'],
  ['user2', 'A helper is sick?', 1, 'Call', 'Programmed', 'Rule: standby list'],
  ['store', 'New tea shop nearby?', 0, 'No', 'Non', 'No rule fits'],
  ['pin', 'An outlet in another city?', 0, 'No', 'Non', 'No rule fits'],
].map((q, i) => { const L = 'G' + (i + 1); return { ic: q[0], tx: q[1], yes: q[2], tA: T0(L) + 0.05, tV: wt(L, q[3]), tB: wt(L, q[4]) - 0.1, v: q[5] }; });
const tG6 = T0('G6'), tThirty = wt('G6', 'Thirty'), tFour = wt('G6', 'four');
// P: the toolkit
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('U0') - 0.32;
const tMilk = wt('P1', 'Milk'), tReorder = wt('P1', 'reorder'), tProc = [wt('P2', 'Check'), wt('P2', 'sorry'), wt('P2', 'pay')];
const tCust = wt('P3', 'Customers'), tAnyone = wt('P4', 'anyone'), tSecs = wt('P4', 'seconds');
// U: non-programmed
const tU0 = T0('U0'), tU1 = T0('U1'), tTr = [wt('U1', 'rare'), wt('U1', 'stakes'), wt('U1', 'facts')], tU2 = T0('U2'), tFull = wt('U2', 'full');
const tU3 = T0('U3'), tTop = wt('U3', 'top'), tUout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'Pilots'), wt('K3', 'shop'), wt('K4', 'hospital'), wt('K5', 'flags') - 0.8];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'fast'), wt('X2', 'cheap'), wt('X2', 'fair')], tXh = [wt('X3', 'stale'), wt('X4', 'blindly'), wt('X4', 'bill')];
const tCon = [wt('X5', 'line'), wt('X5', 'boxes'), wt('X5', 'Most'), wt('X5', 'between')], tEnds = wt('X5', 'ends'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'rules')], [wt('S3', 'top')], [wt('S4', 'new')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const QP = [['milk', 'Milk is low', 0], ['coin', 'A refund', 0], ['store', 'New tea shop', 1]];
$('#qpRow').innerHTML = QP.map(([ic, t, b], i) => `<div class="qp" id="qp${i}" style="${b ? 'background:#F6E3DC;color:#B5482F' : ''}"><i>${M.icon(ic, 24, b ? C.red : C.gold, 2.2)}</i><span>${t}</span></div>`).join('');
let dg = ''; for (let i = 0; i < 40; i++) dg += `<div class="dc" id="dc${i}" style="left:${36 + (i % 20) * 42}px;top:${84 + Math.floor(i / 20) * 42}px"></div>`;
$('#dGrid').innerHTML = dg; $('#bigI').innerHTML = M.icon('clock', 22, C.red, 2.4);
// I: same small questions
const RQ = [['cup', 'More cups?', 7], ['coin', 'Change for a big note?', 5], ['jar', 'Where is the sugar?', 4], ['flame', 'Light the second stove?', 3]];
Object.assign(M.IC, { jar: ['M8 2h8', 'M9 2v3', 'M15 2v3', 'M6 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z', 'M6 12h12'], flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'] });
$('#rRows3').innerHTML = RQ.map(([ic, q], i) => `<div class="qr" id="rq${i}" style="top:${96 + i * 94}px"><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="qt">${q}</div><div class="cnt" id="rc${i}"></div></div>`).join('');
$('#hitI').innerHTML = M.icon('alert', 28, C.gold2, 2.2);
$('#hitS').innerHTML = [0, 1, 2, 3].map(i => `<span id="hs${i}"></span>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
const wrapT = $('#tay'); wrap(wrapT, 'tayIn', 616, 580);
$('#fatherI').innerHTML = M.icon('award', 26, '#fff', 2.2);
$('#pg0I').innerHTML = M.icon('repeat', 22, C.gold, 2.4); $('#pg1I').innerHTML = M.icon('pencil', 22, '#fff', 2.4); $('#np2I').innerHTML = M.icon('bulb', 22, C.gold2, 2.4);
// G: sorting run (card coords)
const GX = 760, GY = 300, QY = i => 100 + i * 80;
$('#gS').innerHTML = `<g fill="none" stroke-linecap="round">
  <path d="M470 120 V460" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12"/><path d="M470 300 H670" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12"/>
  <path id="rail0" d="M850 300 C 925 300, 925 200, 1000 200" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12"/>
  <path id="rail1" d="M850 300 C 925 300, 925 440, 1000 440" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12"/></g>
  <g id="gate"><polygon id="gateP" points="${GX},${GY - 90} ${GX + 90},${GY} ${GX},${GY + 90} ${GX - 90},${GY}" fill="#F5F1E8" stroke="#E2DACB" stroke-width="4" stroke-linejoin="round"/>
  <text id="gateT" x="${GX}" y="${GY + 11}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#14213D">Rule?</text></g>`;
$('#gQ').innerHTML = GQ.map((q, i) => `<div class="gq" id="gq${i}"><i>${M.icon(q.ic, 24, q.yes ? C.gold : C.ink, 2.2)}</i><span>${q.tx}</span></div>`).join('');
let bd0 = ''; for (let i = 0; i < 36; i++) bd0 += `<div class="bd" id="bd0${i}" style="left:${360 + (i % 10) * 17}px;top:${84 + Math.floor(i / 10) * 17}px"></div>`;
$('#bD0').innerHTML = bd0;
$('#bD1').innerHTML = [0, 1, 2, 3].map(i => `<div class="bd" id="bd1${i}" style="left:${360 + i * 17}px;top:84px"></div>`).join('');
// P: the toolkit (list + panes)
const PR = [['list', 'Rule'], ['clipboard', 'Procedure'], ['shield', 'Policy'], ['copy', 'Write once']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const ARW = (id, top) => `<svg id="${id}" class="abs" width="60" height="30" style="top:${top}px"><path d="M4 15 H48 M38 5 L50 15 L38 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PV = [
  `<div class="pq2" id="ru0">IF milk &lt; 20 litres</div>${ARW('ruA', 17)}<div class="pq2" id="ru1" style="background:#14213D;color:#fff">${M.icon('check', 24, C.gold2, 2.6)}Reorder</div>
   <div class="gauge"><i id="gaI"></i></div><div class="abs" id="gaM" style="left:300px;top:104px;width:4px;height:56px;border-radius:2px;background:#14213D"></div><div class="lbl" id="gaL" style="left:316px;top:160px">20 L LINE</div>`,
  [0, 1, 2].map(i => `<div class="pq2" id="pc${i}" style="${i === 2 ? 'background:#14213D;color:#fff' : ''}"><b style="color:${i === 2 ? C.gold2 : C.gold};font-weight:700">${i + 1}</b>${['Check the bill', 'Say sorry', 'Pay back'][i]}</div>${i < 2 ? ARW('pcA' + i, 17) : ''}`).join('') +
   `<div class="abs" id="pcT" style="left:0;top:104px;font:600 30px Poppins;white-space:nowrap">Same steps, <span class="acc">every time</span></div>`,
  `<div class="pq2" id="po0" style="background:#14213D;color:#fff">${M.icon('heart', 24, C.gold2, 2.4)}Customers always come first</div>
   <svg class="abs" id="poS" style="left:0;top:64px" width="848" height="56" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round"></svg>` +
   ['Refunds', 'Queues', 'Complaints'].map((t, i) => `<div class="pc" id="po${i + 1}">${t}</div>`).join(''),
  `<div class="pq2" id="wo0" style="background:#14213D;color:#fff">${M.icon('book', 24, C.gold2, 2.4)}One rule book</div><div class="pq2" id="wo1" style="background:#B8862F;color:#fff">${M.icon('timer', 24, '#fff', 2.4)}Decided in seconds</div>` +
   ['MAIN', 'BUS STAND', 'COLLEGE', 'MARKET', 'STATION'].map((n, i) => `<div class="mt2" id="mt${i}" style="left:${i * 136}px"><div class="ci"></div><div class="cn">${n}</div></div>`).join(''),
];
const PP = [['THE TOOLKIT', '3 tools', 'For decisions that repeat', 'IN SHORT', null],
  ['TOOL 01 / 03', 'Rule', 'Exactly what to do', 'AT CHAI CORNER', PV[0]], ['TOOL 02 / 03', 'Procedure', 'Steps, in order', 'AT CHAI CORNER · A REFUND', PV[1]],
  ['TOOL 03 / 03', 'Policy', 'A broad guide for many cases', 'AT CHAI CORNER', PV[2]], ['THE PAYOFF', 'Write once', 'Anyone, any outlet, in seconds', 'ALL FIVE OUTLETS', PV[3]]];
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('book', 34, C.gold, 2.2)}</i><span>Decide once, reuse every day</span></div>`}</div>`).join('');
// U: traits, mini process, pyramid
const TR = [['calendar', 'Rare'], ['alert', 'High stakes'], ['help', 'Unclear facts']];
$('#trRow').innerHTML = TR.map(([ic, t], i) => `<div class="tr" id="tr${i}">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const FX = i => 30 + i * 104;
$('#fpS').innerHTML = `<line x1="${FX(0)}" y1="30" x2="${FX(6)}" y2="30" stroke="#E2DACB" stroke-width="5" stroke-linecap="round"/><line id="fpP" x1="${FX(0)}" y1="30" x2="${FX(0)}" y2="30" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/>` +
  [0, 1, 2, 3, 4, 5, 6].map(i => `<g id="fn${i}" transform="translate(${FX(i)} 30)"><circle r="22" fill="#F5F1E8" stroke="#E2DACB" stroke-width="3"/><text y="7" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="#8A8274">${i + 1}</text></g>`).join('');
const PW = y => 250 + (688 - 250) * (y / 268);
const TIERS = [['Ravi · new, big choices', '#14213D', '#fff'], ['Outlet managers · some of each', '#24345A', '#E9D9B5'], ['Staff · routine, by rule', '#EEE8DB', '#14213D']];
$('#pyr').innerHTML = TIERS.map(([t, f, c], k) => { const y0 = k * 92, y1 = y0 + 84, a = PW(y0) / 2, b = PW(y1) / 2;
  return `<g id="ty${k}"><polygon id="tp${k}" points="${344 - a},${y0} ${344 + a},${y0} ${344 + b},${y1} ${344 - b},${y1}" fill="#F5F1E8" stroke="none"/><text id="tt${k}" x="344" y="${y0 + 50}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="23" fill="#B9B1A3">${t}</text></g>`; }).join('');
wrap($('#ill2'), 'ill2Out', 784, 580);
// K
const KA = [
  ['list', 'Rules', 'One condition, one action', 'Milk below 20 litres, reorder', 'landmark', 'A bank lends small sums above a set score'],
  ['clipboard', 'Procedures', 'Fixed steps, in order', 'Refund: check the bill, sorry, pay back', 'plane', 'Pilots run the same checklist every flight'],
  ['shield', 'Policies', 'A broad guide for many cases', 'Customers always come first', 'package', 'A shop takes back any item within 30 days'],
  ['bulb', 'Judgment', 'New problem, no rule fits', 'How to answer the new tea shop', 'heart', 'A hospital plans for a brand new disease'],
  ['cpu', 'Computers', 'Routine rules, run by machines', 'The till warns when cups run low', 'coin', 'A bank computer flags odd card payments'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['DECISIONS TODAY', 'Rules and judgment', 'Every workplace needs both', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BANK</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Rules for the routine, people for the new</span></div>`) + `</div>`).join('');
// X
const XG = [['zap', 'Fast'], ['coin', 'Cheap'], ['scale', 'Fair, same answer']];
const XH = [['clock', 'Rules go stale'], ['alert', 'Followed blindly'], ['x', 'Lost bill, no refund']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
// continuum
const CX = [128, 300, 484, 656], CU = [1, 0, 1, 0], CT = ['Reorder milk', 'Weekly staff rota', 'Festival menu', 'A new city'], LY = 316;
$('#cS').innerHTML = `<line id="cl0" x1="72" y1="${LY}" x2="392" y2="${LY}" stroke="#B8862F" stroke-width="8" stroke-linecap="round"/><line id="cl1" x1="392" y1="${LY}" x2="712" y2="${LY}" stroke="#14213D" stroke-width="8" stroke-linecap="round"/>
  <text id="ce0" x="72" y="452" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="2.7" fill="#B8862F">PROGRAMMED</text><text id="ce1" x="712" y="452" text-anchor="end" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="2.7" fill="#14213D">NON-PROGRAMMED</text>` +
  CX.map((x, i) => `<g id="cm${i}"><line x1="${x}" y1="${CU[i] ? LY - 50 : LY + 14}" x2="${x}" y2="${CU[i] ? LY - 14 : LY + 50}" stroke="#B9B1A3" stroke-width="3"/><circle cx="${x}" cy="${LY}" r="12" fill="#fff" stroke="${mix(C.gold, C.ink, i / 3)}" stroke-width="5"/></g>`).join('');
$('#cChips').innerHTML = CT.map((t, i) => `<div class="cc" id="cc${i}" style="top:${CU[i] ? LY - 98 : LY + 50}px;background:${mix(C.gold3, C.ink, i / 3)};color:${i > 1 ? '#fff' : C.ink}">${t}</div>`).join('');
$('#xbanI').innerHTML = M.icon('scale', 24, C.gold2, 2.4);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Programmed', 'Non-programmed', 'A procedure', 'A policy'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('bulb', 44, C.gold2, 2.4);
// recap
const ROWS = [['list', 'Programmed: routine, by rule', ['Rules']], ['bulb', 'Non-programmed: new, by judgment', ['At the top']], ['scale', 'Rules free up time for the new', ['Balance']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const fade = (el, o) => { M.hide(el, o <= 0.001); const v = o >= 0.999 ? '' : o.toFixed(3); if (el.style.opacity !== v) el.style.opacity = v; };
const pop = (el, t, a, out = 1e9) => M.vis(el, t, a, out, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};

let geo = null, GW = [];
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#qp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tq = $('#tgQ'); tq.style.left = (84 - tq.offsetWidth) + 'px'; tq.style.top = '320px'; const ta = $('#tgA'); ta.style.left = '712px'; ta.style.top = '170px';
  const tr = $('#tgR'); tr.style.left = (84 - tr.offsetWidth) + 'px'; tr.style.top = '200px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  if ($('#tname').offsetWidth > 560) $('#tname').style.fontSize = Math.floor(52 * 560 / $('#tname').offsetWidth) + 'px';
  x = 36; for (let i = 0; i < 2; i++) { const p = $('#pg' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  x = 36; for (let i = 0; i < 3; i++) { const p = $('#np' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  GW = GQ.map((_, i) => $('#gq' + i).offsetWidth);
  // panes
  x = 0; $('#ru0').style.left = '0px'; x = $('#ru0').offsetWidth + 16; $('#ruA').style.left = x + 'px'; x += 76; $('#ru1').style.left = x + 'px';
  x = 0; for (let i = 0; i < 3; i++) { const p = $('#pc' + i); p.style.left = x + 'px'; x += p.offsetWidth + 12; if (i < 2) { $('#pcA' + i).style.left = x + 'px'; x += 72; } }
  if (x > 860) { const s = 848 / x; for (let i = 0; i < 3; i++) $('#pc' + i).style.fontSize = Math.floor(26 * s) + 'px'; x = 0; for (let i = 0; i < 3; i++) { const p = $('#pc' + i); p.style.left = x + 'px'; x += p.offsetWidth + 12; if (i < 2) { $('#pcA' + i).style.left = x + 'px'; x += 72; } } }
  const po = $('#po0'); po.style.left = '0px'; const pcx = po.offsetWidth / 2; let px = 0, ln = '';
  for (let i = 1; i <= 3; i++) { const p = $('#po' + i); p.style.left = px + 'px'; const cx = px + p.offsetWidth / 2; ln += `<path id="pl${i}" d="M${pcx} 2 V20 H${cx} V52"/>`; px += p.offsetWidth + 24; }
  $('#poS').innerHTML = ln;
  const w0 = $('#wo0'); w0.style.left = '0px'; $('#wo1').style.left = (w0.offsetWidth + 16) + 'px';
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#tr' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  CT.forEach((_, i) => { const c = $('#cc' + i); c.style.left = M.clamp(CX[i] - c.offsetWidth / 2, 48, 736 - c.offsetWidth) + 'px'; });
  const xb = $('#xban'); xb.style.left = (392 - xb.offsetWidth / 2) + 'px';
  const bo = $('#both'); if (bo.scrollWidth > 1520) bo.querySelectorAll('.tx').forEach(el => el.style.fontSize = Math.floor(52 * 1440 / bo.scrollWidth) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ['#qq1', '#qq2'].forEach(s => { const q = $(s); if (q.offsetWidth > 1420) q.style.fontSize = Math.floor(68 * 1420 / q.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);

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
  const exOn = t < tTu ? [tQp[0] + 0.5, tT - 0.3] : [tG0 + 0.3, tPout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: forty questions a day ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#ways'), t, tMorph + 0.3, 1e9, { dy: 36 });
    QP.forEach((_, i) => pop($('#qp' + i), t, tQp[i] + 0.15));
    M.rise($('#askT'), t, tForty - 0.1, { st: 0.07, sp: M.HEAVY });
    M.vis($('#ask'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const fillEnd = tForty + 0.7, f0 = tQp[0] + 0.3;
    for (let i = 0; i < 40; i++) {
      const el = $('#dc' + i), a = f0 + (fillEnd - f0) * i / 39;
      M.vis(el, t, tMorph + 0.6 + (i % 20) * 0.02, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const on = M.io((t - a) / 0.15), big = i === 39 ? M.io((t - tBig) / 0.25) : 0;
      el.style.background = mix(mix(C.paper, C.gold, on), C.red, big);
    }
    pop($('#bigP'), t, tBig);
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

  /* ===== I: the festival rush ===== */
  const iOn = t >= tTu - 0.05 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.05, tIout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tI3);
    M.vis($('#illImg'), t, tI1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgQ'), t, tQueue - 0.05, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgA'), t, tAshaI - 0.05, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rep'), t, tI3 + 0.12, tIout, { dx: 60, dy: 0, ...o });
    RQ.forEach(([, , n], i) => {
      const a = tSame - 0.2 + i * 0.3; M.vis($('#rq' + i), t, a, 1e9, { dx: 40, dy: 0 });
      const k = Math.max(1, Math.min(n, 1 + Math.floor(M.clamp((t - a - 0.3) / (tBigQ - a - 0.3)) * n)));
      M.setT($('#rc' + i), k === 1 ? 'once' : `${k} times`);
    });
    M.vis($('#hit'), t, tI4 + 0.2, 1e9, { dy: 20 });
    for (let i = 0; i < 4; i++) pop($('#hs' + i), t, tBigQ + i * 0.1);
  }

  /* ===== D: Simon and the two types ===== */
  const dOn = t >= tD1 - 0.05 && t < tG0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const tay = $('#tay'), sh = M.spring(t - tD3 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD2 + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tHerb - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tDesc - 0.05, 1e9, { dy: 10 });
    pop($('#father'), t, tTwo - 0.05);
    M.vis($('#pg'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#pg .tt'), t, tD3 + 0.3, { st: 0.06, sp: M.HEAVY }); M.rise($('#pg .ts'), t, tRout - 0.1, { st: 0.05 });
    pop($('#pg0'), t, tRout + 0.4); pop($('#pg1'), t, tRule3 - 0.05);
    M.vis($('#np'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.rise($('#np .tt'), t, tD4 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#np .ts'), t, tNew4 - 0.1, { st: 0.05 });
    pop($('#np0'), t, tReady - 0.05); pop($('#np1'), t, tClear - 0.05); pop($('#np2'), t, tJudg - 0.05);
  }

  /* ===== G: sorting one day's questions ===== */
  const gOn = t >= tG0 - 0.1 && t < tP0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#srt'), t, tG0 + 0.05, tGout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#gS'), t, tG0 + 0.3, 1e9, { dy: 0 });
    M.vis($('#bin0'), t, tG0 + 0.5, 1e9, { dx: 30, dy: 0 }); M.vis($('#bin1'), t, tG0 + 0.6, 1e9, { dx: 30, dy: 0 });
    let gate = 0, vq = -1, n0 = 0, n1 = 0, r0 = 0, r1 = 0;
    GQ.forEach((q, i) => {
      const el = $('#gq' + i), w = GW[i];
      const p0 = [48, QY(i) - 30 + 0], p1 = [GX - 104 - w, GY - 30];
      const slot = q.yes ? n0++ : n1++, binTop = q.yes ? 92 : 332;
      const p2 = [1020, binTop + 56 + slot * 52];
      const ein = tG0 + 0.4 + i * 0.08, ep = M.spring(t - ein, M.SOFT); fade(el, M.clamp((t - ein) / 0.18));
      const a = M.io((t - q.tA) / 0.8), b = M.io((t - q.tB) / 0.7);
      let x = M.lerp(p0[0] - 24 * (1 - ep), p1[0], a), y = M.lerp(p0[1], p1[1], a);
      x = M.lerp(x, p2[0], b); y = M.lerp(y, p2[1], b);
      const s = M.lerp(1, 0.85, b);
      el.style.left = '0px'; el.style.top = '0px';
      const tr0 = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)` + (s < 0.9999 ? ` scale(${s.toFixed(4)})` : '');
      if (el.style.transform !== tr0) el.style.transform = tr0;
      el.style.boxShadow = a > 0.5 && b < 0.5 ? `0 0 0 3px ${t >= q.tV ? (q.yes ? C.gold : C.red) : C.line}` : 'none';
      if (t >= q.tV - 0.05 && t < (GQ[i + 1] ? GQ[i + 1].tA : 1e9)) { vq = i; gate = q.yes ? 1 : -1; }
      if (q.yes) r0 = Math.max(r0, (b > 0 && b < 1) ? 1 : 0); else r1 = Math.max(r1, (b > 0 && b < 1) ? 1 : 0);
    });
    // gate + verdict
    setA($('#gateP'), 'fill', gate > 0 ? C.gold3 : gate < 0 ? C.redBg : C.paper);
    setA($('#gateP'), 'stroke', gate > 0 ? C.gold : gate < 0 ? C.red : C.line);
    setA($('#gateT'), 'fill', gate < 0 ? C.red : C.ink);
    const gv = $('#gV');
    if (vq >= 0) { const q = GQ[vq]; M.setT(gv, q.v); gv.style.background = q.yes ? C.gold : C.redBg; gv.style.color = q.yes ? '#fff' : C.red; if (gv._q !== vq) { gv._q = vq; gv.style.left = (GX - gv.offsetWidth / 2) + 'px'; } pop(gv, t, q.tV - 0.05); }
    else M.hide(gv, true);
    setA($('#rail0'), 'stroke', r0 ? C.gold : C.line); setA($('#rail1'), 'stroke', r1 ? C.ink : C.line);
    // counters + the rest of the day
    const in0 = GQ.filter(q => q.yes && t >= q.tB + 0.6).length, in1 = GQ.filter(q => !q.yes && t >= q.tB + 0.6).length;
    const c0 = t < tThirty ? in0 : Math.round(M.lerp(in0, 36, M.o3((t - tThirty) / 1.4))), c1 = t < tFour - 0.4 ? in1 : 4;
    M.setT($('#bc0'), String(c0)); M.setT($('#bc1'), String(c1));
    for (let i = 0; i < 36; i++) { const d = $('#bd0' + i), a2 = tThirty + i * 0.035; pop(d, t, a2); d.style.background = C.gold; }
    for (let i = 0; i < 4; i++) { const d = $('#bd1' + i); pop(d, t, tFour - 0.4 + i * 0.08); d.style.background = C.ink; }
  }

  /* ===== P: the toolkit ===== */
  const pOn = t >= tP0 - 0.1 && t < tU0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    PR.forEach(([ic], i) => {
      const el = $('#pr' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tP0 + 0.5, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        pop($('#ru0'), t, tin + 0.6); M.vis($('#ruA'), t, tReorder - 0.25, 1e9, { dx: -12, dy: 0, fade: 0.15 }); pop($('#ru1'), t, tReorder - 0.1);
        const lv = 34 + (18 - 34) * M.io((t - tMilk) / 0.9) + (38 - 18) * M.io((t - tReorder - 0.2) / 0.8), low = lv < 20;
        const gi = $('#gaI'); gi.style.width = (lv * 15).toFixed(1) + 'px'; gi.style.background = low ? C.redMid : (t > tReorder ? C.gold : C.ink2);
        M.vis($('#gaM'), t, tin + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#gaL'), t, tin + 0.9, 1e9, { dy: 8 });
      } else if (k === 2) {
        for (let i = 0; i < 3; i++) { pop($('#pc' + i), t, tProc[i] - 0.1); if (i < 2) M.vis($('#pcA' + i), t, tProc[i + 1] - 0.25, 1e9, { dx: -12, dy: 0, fade: 0.15 }); }
        M.rise($('#pcT'), t, tProc[2] + 0.4, { st: 0.05 });
      } else if (k === 3) {
        pop($('#po0'), t, tCust - 0.1);
        for (let i = 1; i <= 3; i++) { const pl = $('#pl' + i); if (pl) M.draw(pl, t, tCust + 0.4 + i * 0.12, 0.4, M.o3); pop($('#po' + i), t, tCust + 0.6 + i * 0.15); }
      } else if (k === 4) {
        pop($('#wo0'), t, tin + 0.6);
        for (let i = 0; i < 5; i++) { const el = $('#mt' + i), a = tAnyone - 0.1 + i * 0.12; M.vis(el, t, tin + 0.7 + i * 0.06, 1e9, { dy: 14 }); const g = M.io((t - a) / 0.25); el.style.background = mix(C.paper, C.gold3, g); setIco(el.querySelector('.ci'), 'store', g > 0.5 ? C.gold : C.dim, 36, 2.2); }
        pop($('#wo1'), t, tSecs - 0.1);
      }
    });
  }

  /* ===== U: non-programmed, at the top ===== */
  const uOn = t >= tU0 - 0.1 && t < tK0 + 0.2; M.hide($('#sU'), !uOn);
  if (uOn) {
    const o = { outDur: 0.3, ody: -16 };
    const il = $('#ill2'); M.vis(il, t, tU0 + 0.05, tUout, { dy: 36, ...o }); grow(il, $('#ill2Out'), t, tU1);
    M.vis($('#ill2Img'), t, tU0 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tU0 + 0.6, tU1 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#ut'), t, tU1 + 0.12, tUout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) pop($('#tr' + i), t, tTr[i] - 0.05);
    M.vis($('#fpL'), t, tU2 - 0.1, 1e9, { dy: 10 }); M.vis($('#fpS'), t, tU2, 1e9, { dy: 10 });
    const fp = M.clamp((t - tFull) / (T1('U2') - tFull)) * 6;
    setA($('#fpP'), 'x2', (FX(0) + fp * 104).toFixed(1)); M.hide($('#fpP'), fp <= 0.01);
    for (let i = 0; i < 7; i++) { const on = fp >= i - 0.02 && t > tFull; const c = $('#fn' + i).querySelector('circle'); setA(c, 'fill', on ? C.gold : C.paper); setA(c, 'stroke', on ? C.gold : C.line); setA($('#fn' + i).querySelector('text'), 'fill', on ? '#fff' : C.muted); }
    TIERS.forEach(([, f, c], k) => {
      const g = $('#ty' + k); fade(g, M.clamp((t - tU1 - 0.6 - (2 - k) * 0.12) / 0.2));
      const col = M.io((t - (k === 0 ? tTop : tU3 + 0.15 + (2 - k) * 0.25)) / 0.3);
      setA($('#tp' + k), 'fill', mix(C.paper, f, col)); setA($('#tt' + k), 'fill', mix(C.dim, c, col));
      if (k === 0) { setA($('#tp0'), 'stroke', t > tTop ? C.gold : 'none'); setA($('#tp0'), 'stroke-width', '5'); }
    });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 4 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX5);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX5 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xh2'), t, tX5 + 0.35, 1e9, { dy: 10 });
    M.draw($('#cl0'), t, tEnds - 0.1, 0.5, M.o3); M.draw($('#cl1'), t, tEnds + 0.3, 0.5, M.o3);
    fade($('#ce0'), M.clamp((t - tEnds - 0.2) / 0.2)); fade($('#ce1'), M.clamp((t - tEnds - 0.6) / 0.2));
    for (let i = 0; i < 4; i++) { fade($('#cm' + i), M.clamp((t - tCon[i] + 0.1) / 0.15)); pop($('#cc' + i), t, tCon[i]); }
    pop($('#xban'), t, tCon[3] + 0.35);
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
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
