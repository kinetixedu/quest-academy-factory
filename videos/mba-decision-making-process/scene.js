// MBA - Principles of Management, Ep 21: Decision-Making Process
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  jar: ['M8 2h8', 'M9 2v3', 'M15 2v3', 'M6 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z', 'M6 12h12'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  cart: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M5 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 'M9 18h5', 'M14 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0'],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  package: ['M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z', 'M12 22V12', 'm3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  pencil: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tDrop = wt('H2', 'drop'), tAll5 = wt('H2', 'all');
const tKab = wt('C1', 'Kabir'), tAsha = wt('C1', 'Asha'), tMeena = wt('C2', 'Meena'), tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('I1') - 0.32;
// I: head office
const tI1 = T0('I1'), tPins = wt('I2', 'pins'), tEach = wt('I2', 'each'), tI3 = T0('I3'), tQues = wt('I3', 'questions'), tChoose = wt('I3', 'choose');
const tI4 = T0('I4'), tWrong = wt('I4', 'wrong'), tAllI = wt('I4', 'all'), tIout = T0('D1') - 0.32;
// D: definition
const tD1 = T0('D1'), tD2 = T0('D2'), tChoosing = wt('D2', 'choosing'), tFrom = wt('D2', 'from'), tD3 = T0('D3'), tDiff = wt('D3', 'different');
const tD4 = T0('D4'), tOnly = wt('D4', 'only'), tNothing = wt('D4', 'nothing'), tD5 = T0('D5'), tDay = [wt('D5', 'buy'), wt('D5', 'hire'), wt('D5', 'open')], tDout = T0('F0') - 0.32;
// F: the seven steps
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('R1') - 0.32;
const tDown = wt('F1', 'down'), tThird = wt('F1', 'third');
const tF2k = wt('F2', 'Kabir'), tF2s = wt('F2', 'sales'), tF2c = wt('F2', 'customers'), tF2w = wt('F2', 'why');
const tOpt = [wt('F3', 'snacks'), wt('F3', 'hours'), wt('F3', 'flavour')];
const tEval = [wt('F4', 'cheap'), wt('F4', 'paying'), wt('F4', 'time')];
const tBest = wt('F5', 'best'), tCost = wt('F5', 'cost');
const tMenu = wt('F6', 'menu'), tFive6 = wt('F6', 'five');
const tMonth = wt('F7', 'month'), tCheck = wt('F7', 'check');
// R: results + loop
const tR1 = T0('R1'), tNums = wt('R1', 'numbers'), tBack = wt('R2', 'back'), tR3 = T0('R3'), tColl = wt('R3', 'college'), tLater = wt('R3', 'later');
const tAgain = wt('R4', 'again'), tFeeds = wt('R4', 'Follow'), tNextD = wt('R4', 'next'), tRout = T0('G0') - 0.32;
// G: Simon's three phases
const tG0 = T0('G0'), tSimon = wt('G0', 'Simon'), tThree = wt('G0', 'three'), tG = [T0('G1'), T0('G2'), T0('G3')], tAct = wt('G3', 'act');
const tGd = [wt('G1', 'problem'), wt('G2', 'options'), wt('G3', 'Pick')], tGout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'online'), wt('K3', 'school'), wt('K4', 'bank'), wt('K5', 'factory')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'guesses'), wt('X2', 'reasons'), wt('X2', 'why')], tXh = [wt('X3', 'time'), wt('X3', 'money'), wt('X4', 'bias')];
const tSeven = wt('X5', 'seven'), tSugar = wt('X5', 'sugar'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Check');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'alternatives')], [wt('S3', 'weigh'), wt('S3', 'choose')], [wt('S4', 'always')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// five outlets (example figures: evening cups)
const OUT = ['MAIN', 'BUS STAND', 'COLLEGE', 'MARKET', 'STATION'];
const V0 = [120, 90, 60, 150, 105], V1 = V0.map(v => v * 2 / 3), V2 = [120, 90, 40, 150, 105];
$('#outRow').innerHTML = OUT.map((n, i) => `<div class="ot2" id="ou${i}" style="left:${36 + i * 172}px"><div class="cn">${n}</div><div class="ci"></div><div class="ct">${V0[i]}</div></div>`).join('');
$('#dropI').innerHTML = M.icon('trendDown', 20, C.red, 2.4);
const IDEAS = [['kabir', 'Hot snacks'], ['asha', 'Open later'], ['meena', 'Ginger chai']];
$('#ideas').innerHTML = IDEAS.map(([f, t], i) => `<div class="idp" id="id${i}"><div class="fc" style="${FACE(f)}"></div><span>${t}</span></div>`).join('');
// head office: pins pulse, questions arrive
const PINS = [[400, 94], [501, 121], [353, 163], [509, 207], [409, 216]];
$('#pins').innerHTML = PINS.map(([x, y], i) => `<g id="pn${i}" transform="translate(${x} ${y})"><circle r="17" fill="none" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const QS = [['BUS STAND', 'Add a second stove?'], ['COLLEGE', 'A student discount?'], ['MARKET', 'Hire one more helper?'], ['STATION', 'Open at 6 am?']];
$('#qRows').innerHTML = QS.map(([n, q], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 94}px"><div class="ri">${M.icon('store', 28, C.gold, 2.2)}</div><div class="qn">${n}</div><div class="qt">${q}</div></div>`).join('');
$('#hitI').innerHTML = M.icon('alert', 28, C.gold2, 2.2);
$('#hitS').innerHTML = OUT.map((_, i) => `<span id="hs${i}"></span>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// definition
$('#defI').innerHTML = M.icon('split', 48, C.gold, 2.2);
$('#altRow').innerHTML = IDEAS.map(([, t], i) => `<div class="op" id="al${i}"><b>${'ABC'[i]}</b>${t}</div>`).join('');
$('#one1I').innerHTML = M.icon('x', 24, C.red, 2.6);
const DAY = [['cart', 'What to buy'], ['user', 'Who to hire'], ['clock', 'When to open']];
$('#dayRow').innerHTML = DAY.map(([ic, t], i) => `<div class="dt" id="dy${i}" style="left:${36 + i * 240}px"><div class="ci">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="ct">${t}</div></div>`).join('');

/* F: the seven steps. Track nodes in a 1600 x 196 svg. */
const STEPS = ['PROBLEM', 'INFORMATION', 'ALTERNATIVES', 'EVALUATE', 'CHOOSE', 'IMPLEMENT', 'FOLLOW UP'];
const NX = i => 140 + i * 220, NY = 100;
$('#trkS').innerHTML = `<defs><clipPath id="tkc"><circle cx="0" cy="0" r="30"/></clipPath></defs>
  <line x1="${NX(0)}" y1="${NY}" x2="${NX(6)}" y2="${NY}" stroke="#E2DACB" stroke-width="6" stroke-linecap="round"/>
  <line id="trkP" x1="${NX(0)}" y1="${NY}" x2="${NX(0)}" y2="${NY}" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>` +
  STEPS.map((s, i) => `<g id="nd${i}" transform="translate(${NX(i)} ${NY})"><circle r="30" fill="#F5F1E8" stroke="#E2DACB" stroke-width="3"/><text y="8" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#B9B1A3">${i + 1}</text><g class="ck" transform="translate(-14 -14)">${M.icon('check', 28, '#fff', 3)}</g></g>
  <text id="nl${i}" x="${NX(i)}" y="${NY + 66}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">${s}</text>`).join('') +
  `<g id="tok" transform="translate(${NX(0)} ${NY})"><circle r="36" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-30" y="-30" width="60" height="60" clip-path="url(#tkc)"/></g>`;
const VIS = [];
// pane 0: the three ideas wait
VIS[0] = `<div class="lbl" style="left:36px;top:48px">WAITING FOR A DECISION</div>` + IDEAS.map(([f, t], i) => `<div class="idp" id="w${i}" style="left:36px;top:${92 + i * 76}px"><div class="fc" style="${FACE(f)}"></div><span>${t}</span></div>`).join('') +
  `<div class="serif abs" id="wq" style="left:420px;top:150px;font-size:96px;color:#E2DACB;line-height:1">?</div>`;
// pane 1: sales bars drop by a third
VIS[1] = OUT.map((n, i) => `<div class="vb" id="vb${i}" style="left:${36 + i * 152 + 20}px"></div><div class="vbv" id="vv${i}" style="left:${36 + i * 152 + 20}px"></div><div class="vbn" style="left:${36 + i * 152}px">${n}</div>`).join('') +
  `<div class="rpill" id="v1p" style="right:0;top:40px"><span>${M.icon('trendDown', 20, C.red, 2.4)}</span>Down a third</div>`;
// pane 2: numbers and customers
VIS[2] = `<div class="abs" id="v2a" style="left:0;top:48px;display:flex;align-items:center;gap:14px"><div class="fc" style="${FACE('kabir')}"></div><div class="lbl" style="position:static">THE NUMBERS</div></div>` +
  [['Mornings: steady', 0], ['Afternoons: steady', 0], ['Evenings: down', 1]].map(([t, b], i) => `<div class="ifo" id="v2n${i}" style="left:0;top:${120 + i * 64}px;${b ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(b ? 'trendDown' : 'chart', 22, b ? C.red : C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  `<div class="abs" id="v2b" style="left:412px;top:48px;display:flex;align-items:center;gap:14px"><span>${M.icon('users', 40, C.gold, 2.2)}</span><div class="lbl" style="position:static">THE CUSTOMERS</div></div>` +
  ['Too cold to stand and wait', 'Is there anything to eat?', 'You close too early'].map((t, i) => `<div class="ifo" id="v2c${i}" style="left:412px;top:${120 + i * 64}px">${M.icon('message', 22, C.ink, 2.2)}<span>${t}</span></div>`).join('');
// panes 3-5 share the option cards (#vOpt)
const OC = [['kabir', 'KABIR', 'Hot snacks', 'Cheap to add', 0], ['asha', 'ASHA', 'Open later', 'Night wages', 1], ['meena', 'MEENA', 'Ginger chai', 'Slow to catch on', 1]];
$('#vOpt').innerHTML = OC.map(([f, n, t, c, bad], i) => `<div class="oc" id="oc${i}" style="left:${i * 276}px"><div class="bg"></div><div class="fa" style="${FACE(f)}"></div><div class="on">${n}</div><div class="ot">${t}</div><div class="ch" id="och${i}" style="background:${bad ? C.redBg : C.gold3};color:${bad ? C.red : C.ink}">${c}</div><div class="ok">${M.icon('check', 26, '#fff', 3)}</div></div>`).join('');
// pane 6: the choice goes to all five outlets
VIS[6] = OUT.map((n, i) => `<div class="ut" id="ut${i}" style="left:${i * 164}px"><div class="ci"></div><div class="cn">${n}</div><div class="cp" id="utp${i}">Hot snacks</div></div>`).join('');
// pane 7: one month, then check
let cal = ''; for (let i = 0; i < 28; i++) cal += `<div class="cal" id="cl${i}" style="left:${(i % 7) * 48}px;top:${92 + Math.floor(i / 7) * 48}px"></div>`;
VIS[7] = `<div class="lbl" style="left:0;top:48px">ONE MONTH</div>${cal}` +
  [['Sales back up?', 'chart'], ['Customers happy?', 'smile2'], ['Costs under control?', 'coin']].map(([t, ic], i) => `<div class="ifo" id="v7c${i}" style="left:400px;top:${92 + i * 68}px">${M.icon(ic === 'smile2' ? 'heart' : ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  `<div class="lbl" style="left:400px;top:48px">THEN CHECK</div>`;
const SP = [['THE PROCESS', 'Seven steps', 'From a problem to a checked result', 'Ravi runs them, one by one', 'flag'],
  ['STEP 01 / 07', 'Identify the problem', 'What is really going wrong?', 'Name it before you fix it', 'target'],
  ['STEP 02 / 07', 'Gather information', 'Numbers first, then people', 'Facts beat hunches', 'search'],
  ['STEP 03 / 07', 'List the alternatives', 'Every real option on the table', 'Three options', 'list'],
  ['STEP 04 / 07', 'Evaluate each one', 'Cost against gain', 'Cheap, costly, slow', 'scale'],
  ['STEP 05 / 07', 'Choose the best', 'Most gain for the least cost', 'Hot snacks win', 'check'],
  ['STEP 06 / 07', 'Implement', 'Put the choice to work', 'All five outlets', 'zap'],
  ['STEP 07 / 07', 'Follow up', 'Did it really work?', 'Check after one month', 'refresh']];
$('#sPans').innerHTML = SP.map(([s, t, m, q, ic], i) => `<div class="sp" id="sp${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="pq">${M.icon(ic, 22, C.gold, 2.4)}<span>${q}</span></div>${VIS[i] ? `<div class="vz" id="vz${i}">${VIS[i]}</div>` : ''}</div>`).join('');

/* R: results + the loop */
$('#rRows2').innerHTML = OUT.map((n, i) => `<div class="rr" id="rr${i}" style="top:${152 + i * 64}px"><div class="rnm">${n}</div><div class="rtk"><i></i></div><div class="serif rv"></div></div>`).join('');
$('#colI').innerHTML = M.icon('clock', 24, C.red, 2.4);
const LC = [392, 316], LR = 176, LA = i => (-90 + i * 360 / 7) * Math.PI / 180;
const LBL = ['PROBLEM', 'FACTS', 'OPTIONS', 'EVALUATE', 'CHOOSE', 'ACT', 'FOLLOW UP'];
$('#lpS').innerHTML = `<defs><clipPath id="lkc"><circle cx="0" cy="0" r="26"/></clipPath></defs><circle id="lpC" cx="${LC[0]}" cy="${LC[1]}" r="${LR}" fill="none" stroke="#E2DACB" stroke-width="6" transform="rotate(-90 ${LC[0]} ${LC[1]})"/>
  <circle id="lpG" cx="${LC[0]}" cy="${LC[1]}" r="${LR}" fill="none" stroke="#B8862F" stroke-width="6" stroke-linecap="round" transform="rotate(-90 ${LC[0]} ${LC[1]})"/>` +
  LBL.map((l, i) => { const a = LA(i), x = LC[0] + LR * Math.cos(a), y = LC[1] + LR * Math.sin(a), lx = LC[0] + (LR + 50) * Math.cos(a), ly = LC[1] + (LR + 50) * Math.sin(a) + 6; const c = Math.cos(a); const an = Math.abs(c) < 0.2 ? 'middle' : (c > 0 ? 'start' : 'end');
    return `<g id="ln${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="26" fill="#F5F1E8" stroke="#E2DACB" stroke-width="3"/><text y="7" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#14213D">${i + 1}</text></g><text id="ll${i}" x="${(lx + (an === 'start' ? -16 : an === 'end' ? 16 : 0)).toFixed(1)}" y="${(Math.abs(c) < 0.2 ? ly + (Math.sin(a) < 0 ? -6 : 8) : ly).toFixed(1)}" text-anchor="${an}" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">${l}</text>`; }).join('') +
  `<g id="ltok"><circle r="32" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#lkc)"/></g>`;

/* G: Simon's phases */
const PS = ['Problem', 'Facts', 'Options', 'Evaluate', 'Choose', 'Act', 'Follow up'];
$('#phSteps').innerHTML = PS.map((s, i) => `<div class="sx" id="sx${i}" style="left:${52 + i * 216}px"><div class="sn">${i + 1}</div><div class="st">${s}</div></div>`).join('');
const PH = [[0, 1, 'search', 'Intelligence', 'Spot the problem, and get the facts'], [2, 3, 'pencil', 'Design', 'Find the options, think each one through'], [4, 4, 'check', 'Choice', 'Pick one'], [5, 6, 'refresh', 'Then', 'Act on it, and review it']];
const bx = i => 52 + i * 216;
$('#phBr').innerHTML = PH.map(([a, b], k) => { const x1 = bx(a) + 8, x2 = bx(b) + 192, xm = (x1 + x2) / 2; return `<path id="br${k}" d="M${x1} 8 V28 H${x2} V8 M${xm} 28 V60" fill="none" stroke="${k < 3 ? '#B8862F' : '#B9B1A3'}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`; }).join('');
$('#phBlocks').innerHTML = PH.map(([a, b, ic, t, d], k) => `<div class="pb" id="pb${k}" style="left:${bx(a)}px;width:${bx(b) + 200 - bx(a)}px"><div class="bg"></div><div class="pi"></div><div class="serif pt2">${t}</div><div class="pd" style="width:${bx(b) + 200 - bx(a) - 64}px">${d}</div></div>`).join('');

// K: at work today
const KA = [
  ['target', 'Define the problem', 'Know what is really wrong', 'Evening sales down a third, at all five', 'clipboard', 'A hospital measures real waiting times'],
  ['search', 'Gather facts', 'Numbers first, then people', 'Kabir checks sales, the team asks why', 'package', 'An online shop reads reviews and returns'],
  ['scale', 'Weigh the options', 'Cost and gain, side by side', 'Snacks, longer hours or a new flavour', 'bus', 'A school compares bus firms on cost and safety'],
  ['zap', 'Implement with care', 'Plan it, train people, then launch', 'Hot snacks on the menu at all five', 'landmark', 'A bank trains every branch before go-live'],
  ['refresh', 'Follow up', 'Check the results, then adjust', 'Kabir checks the numbers after a month', 'factory', 'A factory checks its error rate every week'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['DECISIONS TODAY', 'Five habits', 'The same steps work in any workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Small choice or big, the logic holds</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['target', 'Fewer blind guesses'], ['bulb', 'Clear reasons'], ['eye', 'Everyone sees why']];
const XH = [['clock', 'Takes time'], ['coin', 'Facts cost money'], ['alert', 'Bias creeps in']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
$('#mi0').innerHTML = M.icon('jar', 32, C.gold, 2.2); $('#mi1').innerHTML = M.icon('store', 32, C.gold, 2.2);
$('#md0').innerHTML = `<div class="md" id="d00" style="left:116px">1</div>`;
$('#md1').innerHTML = Array.from({ length: 7 }, (_, i) => `<div class="md" id="d1${i}" style="left:${116 + i * 46}px">${i + 1}</div>`).join('');
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Gather facts', 'Choose again', 'Follow up', 'List options'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// recap
const ROWS = [['split', 'Choose the best alternative', ['2 or more options']], ['list', 'Problem, facts, options', ['Weigh', 'Choose']], ['refresh', 'Implement, then follow up', ['Always']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const fade = (el, o) => { M.hide(el, o <= 0.001); const v = o >= 0.999 ? '' : o.toFixed(3); if (el.style.opacity !== v) el.style.opacity = v; };
const pop = (el, t, a, out = 1e9) => M.vis(el, t, a, out, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const tokK = M.track(0, tF.slice(1).map((tf, i) => [tf + 0.05, i + 1]), M.HEAVY);

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#id' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tr = $('#tgR'); tr.style.left = (84 - tr.offsetWidth) + 'px'; tr.style.top = '200px'; const tm = $('#tgM'); tm.style.left = '712px'; tm.style.top = '150px';
  ['#dl1', '#dl2'].forEach(s => { const el = $(s); if (el.offsetWidth > 1368) el.style.fontSize = Math.floor(52 * 1368 / el.offsetWidth) + 'px'; });
  x = 36; for (let i = 0; i < 3; i++) { const p = $('#al' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  x = 36; const o0 = $('#one0'); o0.style.left = x + 'px'; x += o0.offsetWidth + 16; $('#oneA').style.left = x + 'px'; x += 76; $('#one1').style.left = x + 'px';
  document.querySelectorAll('#sPans .pt').forEach(el => { if (el.offsetWidth > 680) el.style.fontSize = Math.floor(64 * 680 / el.offsetWidth) + 'px'; });
  for (let i = 0; i < 3; i++) { const c = $('#och' + i); c.style.left = (120 - c.offsetWidth / 2) + 'px'; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const bo = $('#both'); bo.querySelectorAll('.tx').forEach(el => el.style.fontSize = '52px'); if (bo.scrollWidth > 1520) bo.querySelectorAll('.tx').forEach(el => el.style.fontSize = Math.floor(52 * 1440 / bo.scrollWidth) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
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
  const exOn = t < tTu ? [tDrop + 0.2, tT - 0.3] : [tF[0] + 0.3, tRout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: five outlets, one winter problem ===== */
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
    OUT.forEach((_, i) => {
      const el = $('#ou' + i); M.vis(el, t, tMorph + 0.5 + i * 0.06, 1e9, { dy: 16 });
      const r = M.io((t - tDrop - i * 0.1) / 0.3), ct = el.querySelector('.ct');
      M.setT(ct, String(Math.round(r > 0.5 ? V1[i] : V0[i]))); ct.style.opacity = (Math.abs(r - 0.5) * 2).toFixed(3);
      el.style.background = mix(C.paper, C.redBg, r); ct.style.color = r > 0.5 ? C.red : C.ink;
      el.querySelector('.cn').style.color = r > 0.5 ? C.red : C.muted;
      setIco(el.querySelector('.ci'), r > 0.5 ? 'trendDown' : 'store', r > 0.5 ? C.red : C.gold, 40, 2.2);
    });
    pop($('#dropP'), t, tAll5);
    M.vis($('#ask'), t, tKab - 0.35, 1e9, { dy: 36 });
    [tKab, tAsha, tMeena].forEach((ta, i) => pop($('#id' + i), t, ta - 0.05));
    M.rise($('#askT'), t, tNobody - 0.1, { st: 0.07, sp: M.HEAVY });
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

  /* ===== I: the head office ===== */
  const iOn = t >= tTu - 0.05 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.05, tIout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tI3);
    M.vis($('#illImg'), t, tI1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tI1 + 0.6, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgM'), t, tEach, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    PINS.forEach(([x, y], i) => {
      const a = tPins + i * 0.16, p = M.spring(t - a, M.POP), g = $('#pn' + i);
      M.hide(g, t < a); g.style.opacity = M.clamp((t - a) / 0.1);
      const s = 0.4 + 0.6 * p, hot = M.io((t - tWrong - i * 0.08) / 0.25);
      setA(g, 'transform', p >= 1 ? `translate(${x} ${y})` : `translate(${x} ${y}) scale(${s.toFixed(4)})`);
      g.querySelector('circle').setAttribute('stroke', mix(C.gold, C.red, hot));
    });
    M.vis($('#qs'), t, tI3 + 0.12, tIout, { dx: 60, dy: 0, ...o });
    QS.forEach((_, i) => M.vis($('#qr' + i), t, tQues - 0.2 + i * 0.32, 1e9, { dx: 40, dy: 0 }));
    M.vis($('#hit'), t, tWrong - 0.1, 1e9, { dy: 20 });
    OUT.forEach((_, i) => { const r = M.io((t - tAllI - i * 0.08) / 0.2); setIco($('#hs' + i), 'store', r > 0.5 ? '#F2A08C' : C.gold2, 28, 2.2); });
  }

  /* ===== D: what is decision making ===== */
  const dOn = t >= tD1 - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.1, tDout, { dy: 36, ...o });
    pop($('#defI'), t, tD2 + 0.3);
    M.rise($('#dl1'), t, tChoosing - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#dl2'), t, tFrom - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#alt'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) pop($('#al' + i), t, tDiff - 0.1 + i * 0.2);
    pop($('#one0'), t, tOnly - 0.05);
    M.vis($('#oneA'), t, tNothing - 0.2, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    pop($('#one1'), t, tNothing - 0.05);
    M.vis($('#allc'), t, tD5 + 0.05, tDout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) pop($('#dy' + i), t, tDay[i] - 0.1);
  }

  /* ===== F: the seven steps ===== */
  const fOn = t >= tF0 - 0.1 && t < tR1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#trk'), t, tF0 + 0.1, tFout, { dy: 36, ...o });
    M.vis($('#stg'), t, tF0 + 0.25, tFout, { dy: 36, ...o });
    // track: nodes pop in, the token walks node to node, done nodes turn gold
    const k = tokK(t), kr = Math.round(k), settled = Math.abs(k - kr) < 1e-3;
    STEPS.forEach((_, i) => {
      const g = $('#nd' + i), a = tF0 + 0.4 + i * 0.07, p = M.spring(t - a, M.POP);
      M.hide(g, t < a); g.style.opacity = M.clamp((t - a) / 0.1);
      setA(g, 'transform', p >= 1 ? `translate(${NX(i)} ${NY})` : `translate(${NX(i)} ${NY}) scale(${(0.5 + 0.5 * p).toFixed(4)})`);
      const done = i < 6 ? t >= tF[i + 1] + 0.05 : t >= tCheck + 0.4;
      const cir = g.querySelector('circle'), tx = g.querySelector('text'), ck = g.querySelector('.ck');
      setA(cir, 'fill', done ? C.gold : C.paper); setA(cir, 'stroke', done ? C.gold : C.line);
      M.hide(tx, done); M.hide(ck, !done);
      const cur = t >= tF[i] && !done;
      setA($('#nl' + i), 'fill', cur ? C.ink : (done ? C.gold : C.muted));
      M.vis($('#nl' + i), t, a + 0.1, 1e9, { dy: 8 });
    });
    const tokX = NX(0) + k * 220;
    const tok = $('#tok'), tp = M.spring(t - tF[0] + 0.1, M.POP), tq = M.io((t - tCheck - 0.4) / 0.25), tsc = (0.5 + 0.5 * tp) * (1 - 0.4 * tq);
    fade(tok, M.clamp((t - tF[0] + 0.1) / 0.1) * (1 - tq));
    setA(tok, 'transform', `translate(${settled ? NX(kr) : tokX.toFixed(1)} ${NY})` + (Math.abs(tsc - 1) > 1e-4 ? ` scale(${tsc.toFixed(4)})` : ''));
    const prog = t < tF[0] ? 0 : (t >= tCheck + 0.4 ? NX(6) : tokX);
    setA($('#trkP'), 'x2', prog.toFixed(1)); M.hide($('#trkP'), prog <= NX(0) + 0.5);
    const stepN = t < tF[0] ? 0 : Math.min(7, 1 + tF.filter(x => t >= x).length - 1);
    M.setT($('#trkN'), `STEP ${stepN} / 7`); M.vis($('#trkN'), t, tF0 + 0.5, 1e9, { dy: 8 });
    // panes
    SP.forEach((_, k2) => {
      const tin = k2 ? tF[k2 - 1] : tF0 + 0.4, tout = k2 < 7 ? tF[k2] - 0.14 : tFout + 1;
      const pn = $('#sp' + k2); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.pq'), t, tin + 0.5, tout, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, ...oo });
      const vz = pn.querySelector('.vz'); if (vz) M.vis(vz, t, tin + 0.15, tout, { dy: 0, ...oo });
      if (k2 === 0) {
        for (let i = 0; i < 3; i++) M.vis($('#w' + i), t, tin + 0.3 + i * 0.12, 1e9, { dx: 30, dy: 0 });
        M.vis($('#wq'), t, tin + 0.8, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      } else if (k2 === 1) {
        OUT.forEach((_, i) => {
          const g = M.o5((t - tin - 0.3 - i * 0.08) / 0.7), d = M.io((t - tDown - i * 0.08) / 0.5);
          const v = M.lerp(V0[i], V1[i], d) * g, hpx = v * 1.2;
          const b = $('#vb' + i); b.style.height = hpx.toFixed(1) + 'px'; b.style.background = mix(C.ink, C.redMid, d);
          const vv = $('#vv' + i); vv.style.top = (260 - hpx - 36).toFixed(1) + 'px'; M.setT(vv, String(Math.round(v))); vv.style.opacity = M.clamp(g * 2 - 1).toFixed(3); vv.style.color = d > 0.5 ? C.red : C.ink;
        });
        pop($('#v1p'), t, tThird - 0.05);
      } else if (k2 === 2) {
        M.vis($('#v2a'), t, tF2k - 0.1, 1e9, { dy: 10 });
        for (let i = 0; i < 3; i++) pop($('#v2n' + i), t, tF2s - 0.15 + i * 0.2);
        M.vis($('#v2b'), t, tF2c - 0.1, 1e9, { dy: 10 });
        for (let i = 0; i < 3; i++) pop($('#v2c' + i), t, tF2c + 0.35 + i * 0.35);
      } else if (k2 === 6) {
        OUT.forEach((_, i) => {
          const el = $('#ut' + i), a = tin + 0.3 + i * 0.07; M.vis(el, t, a, 1e9, { dy: 16 });
          const on = tMenu - 0.1 + i * ((tFive6 - tMenu + 0.2) / 4);
          pop($('#utp' + i), t, on); const g = M.io((t - on) / 0.25);
          el.style.background = mix(C.paper, C.gold3, g);
          setIco(el.querySelector('.ci'), 'store', g > 0.5 ? C.gold : C.ink, 40, 2.2);
        });
      } else if (k2 === 7) {
        for (let i = 0; i < 28; i++) {
          const a = tin + 0.4 + i * 0.03, f = tin + 0.9 + i * ((tMonth + 0.6 - tin - 0.9) / 27);
          const el = $('#cl' + i); M.vis(el, t, a, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
          el.style.background = mix(C.paper, C.gold, M.io((t - f) / 0.15));
        }
        for (let i = 0; i < 3; i++) pop($('#v7c' + i), t, tCheck - 0.1 + i * 0.25);
      }
    });
    // shared option cards (steps 3 to 5)
    const vo = $('#vOpt'); M.vis(vo, t, tF[2] + 0.1, tF[5] - 0.14, { dy: 0, outDur: 0.18, ody: -12 });
    if (t >= tF[2] && t < tF[5] + 0.3) OC.forEach((_, i) => {
      const el = $('#oc' + i); pop(el, t, tOpt[i] - 0.1);
      pop($('#och' + i), t, tEval[i] - 0.05);
      const win = i === 0 ? M.io((t - tBest) / 0.3) : 0, lose = i ? M.io((t - tCost) / 0.3) : 0;
      el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, win), C.off, lose);
      el.querySelector('.ot').style.color = win > 0.5 ? '#fff' : mix(C.ink, C.dim, lose);
      el.querySelector('.on').style.color = win > 0.5 ? C.gold2 : mix(C.muted, C.dim, lose);
      el.querySelector('.fa').style.filter = lose > 0.01 ? `grayscale(${lose.toFixed(2)})` : '';
      const ch = el.querySelector('.ch'); if (i) { ch.style.background = mix(C.redBg, C.paper2, lose); ch.style.color = mix(C.red, C.muted, lose); }
      const ok = el.querySelector('.ok'); if (i === 0) M.vis(ok, t, tBest + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
    });
  }

  /* ===== R: one month later + the loop ===== */
  const rOn = t >= tR1 - 0.1 && t < T0('G0') + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#res'), t, tR1 + 0.05, tRout, { dx: -60, dy: 0, ...o });
    M.vis($('#kHead'), t, tR1 + 0.3, 1e9, { dy: 10 });
    OUT.forEach((_, i) => {
      const el = $('#rr' + i); M.vis(el, t, tR1 + 0.45 + i * 0.07, 1e9, { dy: 14 });
      const up = M.o5((t - tBack - i * 0.1) / 0.8), v = M.lerp(V1[i], V2[i], up), col = i === 2 ? M.io((t - tColl) / 0.3) : 0;
      const bar = el.querySelector('i'); bar.style.width = (v * 2.6).toFixed(1) + 'px';
      bar.style.background = i === 2 ? mix(C.dim, C.redMid, col) : mix(C.dim, C.gold, up);
      M.setT(el.querySelector('.rv'), String(Math.round(v))); el.querySelector('.rv').style.color = i === 2 && col > 0.5 ? C.red : C.ink;
      el.querySelector('.rnm').style.color = i === 2 && col > 0.5 ? C.red : C.muted;
    });
    pop($('#colP'), t, tLater - 0.05);
    M.vis($('#loop'), t, tR1 + 0.25, tRout, { dx: 60, dy: 0, ...o });
    M.draw($('#lpC'), t, tR1 + 0.5, 0.9, M.o3);
    LBL.forEach((_, i) => { const a = tR1 + 0.6 + i * 0.1; fade($('#ln' + i), M.clamp((t - a) / 0.15)); fade($('#ll' + i), M.clamp((t - a - 0.08) / 0.15)); });
    // token: waits on follow up, steps to 1, then runs the loop again
    const u = 6 + M.io((t - tAgain) / 0.7) + 6 * M.io((t - tAgain - 0.9) / 2.8);
    const ang = LA(u), tok = $('#ltok');
    const lp = M.spring(t - tNums, M.POP); fade(tok, M.clamp((t - tNums) / 0.1));
    const ux = LC[0] + LR * Math.cos(ang), uy = LC[1] + LR * Math.sin(ang);
    setA(tok, 'transform', `translate(${ux.toFixed(1)} ${uy.toFixed(1)})` + (lp < 1 ? ` scale(${(0.5 + 0.5 * lp).toFixed(4)})` : ''));
    const lap = M.clamp((u - 7) / 6); M.drawU($('#lpG'), u >= 7 ? lap * 6 / 7 + 0.0001 : 0);
    LBL.forEach((_, i) => { const lit = u >= 7 + i - 0.02 && u > 7; const c = $('#ln' + i).querySelector('circle'); setA(c, 'fill', lit ? C.gold3 : C.paper); setA(c, 'stroke', lit ? C.gold : C.line); });
    M.rise($('#lpT1'), t, tFeeds - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#lpT2'), t, tNextD - 0.15, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== G: Simon's three phases ===== */
  const gOn = t >= tG0 - 0.1 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#ph'), t, tG0 + 0.05, tGout, { dy: 36, outDur: 0.3, ody: -16 });
    const grp = [[0, 1], [2, 3], [4, 4], [5, 6]];
    PS.forEach((_, i) => {
      const el = $('#sx' + i); M.vis(el, t, tSimon + i * 0.07, 1e9, { dy: 14 });
      const k = grp.findIndex(([a, b]) => i >= a && i <= b), ta = k < 3 ? tG[k] : tAct, te = k < 2 ? tG[k + 1] : 1e9;
      const on = M.io((t - ta) / 0.3), off = M.io((t - te) / 0.3), act = on * (1 - off);
      el.style.background = mix(mix(C.paper, k < 3 ? C.gold3 : C.paper2, on), C.paper, off * 0.5);
      el.querySelector('.st').style.color = act > 0.5 ? C.ink : (on > 0.5 ? C.ink : C.ink2);
    });
    PH.forEach((_, k) => {
      M.draw($('#br' + k), t, tThree + k * 0.15, 0.5, M.o3);
      const ta = k < 3 ? tG[k] : tAct, te = k < 2 ? tG[k + 1] : 1e9, el = $('#pb' + k);
      M.vis(el, t, tThree + 0.25 + k * 0.15, 1e9, { dy: 24 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - te) / 0.35), act = k < 3 ? on * (1 - off) : 0;
      el.querySelector('.bg').style.background = k < 3 ? mix(C.paper, C.ink, act) : C.paper2;
      el.querySelector('.pt2').style.color = k < 3 ? mix(C.ink, '#fff', act) : C.ink2;
      el.querySelector('.pd').style.color = k < 3 ? mix(C.ink2, C.gold2, act) : C.muted;
      el.querySelector('.pi').style.background = k < 3 ? mix('#fff', C.navy2, act) : '#fff';
      setIco(el.querySelector('.pi'), PH[k][2], k < 3 ? (act > 0.5 ? C.gold2 : C.gold) : C.muted, 30, 2.2);
      M.rise(el.querySelector('.pt2'), t, tThree + 0.4 + k * 0.15, { st: 0.06, sp: M.HEAVY });
      M.vis(el.querySelector('.pd'), t, (k < 3 ? tGd[k] : tAct + 0.3) - 0.1, 1e9, { dy: 10 });
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
    M.vis($('#mr1'), t, tX5 + 0.35, 1e9, { dy: 16 });
    for (let i = 0; i < 7; i++) { const d = $('#d1' + i), a2 = tSeven - 0.1 + i * 0.1; pop(d, t, tX5 + 0.5 + i * 0.04); d.style.background = mix(C.line, C.ink, M.io((t - a2) / 0.2)); }
    pop($('#mp1'), t, tSeven + 0.75);
    M.vis($('#mr0'), t, tSugar - 0.6, 1e9, { dy: 16 });
    const d0 = $('#d00'); pop(d0, t, tSugar - 0.4); d0.style.background = mix(C.line, C.gold, M.io((t - tSugar) / 0.2));
    pop($('#mp0'), t, tSugar + 0.1);
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
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
