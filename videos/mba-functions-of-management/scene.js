// MBA - Principles of Management, Ep 14: Functions of Management
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  pulse: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M12 18h.01'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  layers: ['m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  shuffle: ['m18 14 4 4-4 4', 'm18 2 4 4-4 4', 'M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22', 'M2 6h1.972a4 4 0 0 1 3.6 2.2', 'M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45'],
  hourglass: ['M5 22h14', 'M5 2h14', 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22', 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 22a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  flag: ['M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tC1 = T0('C1'), tMess = wt('C1', 'mess'), tC1w = [wt('C1', 'Rent'), wt('C1', 'Hire'), wt('C1', 'Buy')];
const tC2 = T0('C2'), tC2e = T1('C2'), tNothing = wt('C2', 'nothing'), tC3 = T0('C3'), tTwoW = wt('C3', 'two');
const tB1 = T0('B1'), tAout = tB1 - 0.32, tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('B1') - 0.32;
const tB2 = T0('B2'), tSort = wt('B2', 'sort'), tFive = wt('B2', 'five'), tB3 = T0('B3'), tBout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tEvery = wt('D2', 'every'), tBus = wt('D2', 'business'), tSize = wt('D2', 'size');
const tG1 = T0('G1'), tFayol = wt('G1', 'Fayol'), tFw = ['Plan', 'organize', 'command', 'coordinate', 'control'].map(w => wt('G1', w));
const tG2 = T0('G2'), tGulick = wt('G2', 'Gulick'), tSeven = wt('G2', 'seven'), tLetters = wt('G2', 'letters'), tPosd = wt('G2', 'P', 0);
const tG3 = T0('G3'), tMw = ['Planning', 'organizing', 'staffing', 'directing', 'controlling'].map(w => wt('G3', w)), tDout = T0('F0') - 0.32;
// F: five questions
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('Y1') - 0.32;
const tGoal = wt('F1', 'goal'), tKit = wt('F2', 'kitchen'), tCtr = wt('F2', 'counter'), tCln = wt('F2', 'cleaning'), tMeenaF = wt('F3', 'Meena'), tHelpF = wt('F3', 'helpers');
const tAsha = wt('F4', 'Asha'), tRecipe = wt('F4', 'recipe'), tKabir = wt('F5', 'Kabir'), tCounts = wt('F5', 'counts'), tEven = wt('F5', 'evening');
// Y: coordination + opening
const tY1 = T0('Y1'), tYorder = wt('Y1', 'order'), tYtime = wt('Y1', 'time'), tY2 = T0('Y2'), tYhelp = wt('Y2', 'helpers'), tYstove = wt('Y2', 'stoves');
const tY3 = T0('Y3'), tY4 = T0('Y4'), tNine = wt('Y4', 'nine'), tTen = wt('Y4', 'ten'), tY5 = T0('Y5'), tOpens = wt('Y5', 'opens'), tMeenaY = wt('Y5', 'Meena'), tHelpY = wt('Y5', 'helpers'), tYout = T0('X1') - 0.32;
// X: the cycle
const tX1 = T0('X1'), tX2 = T0('X2'), tFifty = wt('X2', 'fifty'), tX3 = T0('X3'), tSends = wt('X3', 'sends'), tPlanX = wt('X3', 'planning');
const tX4 = T0('X4'), tSevenX = wt('X4', 'seven'), tX5 = T0('X5'), tTen5 = wt('X5', 'ten'), tBeat = wt('X5', 'beaten'), tX6 = T0('X6'), tCyc = wt('X6', 'cycle'), tXout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('L1') - 0.32;
const tKw = [wt('K1', 'school'), wt('K2', 'hospital'), wt('K3', 'airline'), wt('K4', 'cricket'), wt('K5', 'delivery')];
// L: the human side
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4'), tL5 = T0('L5'), tL6 = T0('L6');
const tXg = [wt('L2', 'clear'), wt('L2', 'any')], tXh = [wt('L3', 'messy'), wt('L3', 'overlap')];
const tMintz = wt('L4', 'Mintzberg'), tNineL = wt('L5', 'nine'), tLout = tL6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It') - 0.1;
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['planning', 'organizing', 'staffing', 'directing', 'controlling'].map(w => wt('S2', w)), [wt('S3', 'back')], [wt('S4', 'step')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A: to-do list + day strip
const TODO = ['Rent a shop', 'Hire people', 'Buy stoves', 'Set prices', 'Train helpers', 'Order milk'];
$('#tds').innerHTML = TODO.map((t, i) => `<div class="td" id="td${i}"><b></b><span>${t}</span></div>`).join('');
$('#dcs').innerHTML = Array.from({ length: 14 }, (_, i) => `<div class="dc" id="dd${i}" style="left:${36 + i * 60}px">${i + 1}</div>`).join('');
const HOP = [0, 3, 1, 5, 2, 4, 0, 2, 5, 1, 3, 4, 0];
// B: five boxes
const FN = [['P', 'Planning', ['Set a goal']], ['O', 'Organizing', ['Rent a shop', 'Buy stoves']], ['S', 'Staffing', ['Hire helpers']], ['D', 'Directing', ['Train them']], ['C', 'Controlling', ['Count sales']]];
$('#bRows').innerHTML = FN.map(([l, n, ts], i) => `<div class="br" id="br${i}" style="top:${92 + i * 90}px"><div class="bg"></div><div class="bl">${l}</div><div class="bn">${n}</div>${ts.map((tk, k) => `<div class="vc s" id="bt${i}${k}" style="top:16px;background:#fff">${M.icon('check', 18, C.gold, 3)}<span>${tk}</span></div>`).join('')}</div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#dc0I').innerHTML = M.icon('store', 24, C.gold, 2.2); $('#dc1I').innerHTML = M.icon('users', 24, C.gold, 2.2); $('#dc2I').innerHTML = M.icon('refresh', 24, C.gold2, 2.2);
wrap($('#def'), 'defOut', 784, 580);
const FAY = ['Plan', 'Organize', 'Command', 'Coordinate', 'Control'];
$('#fCh').innerHTML = FAY.map((f, i) => `<div class="vc s" id="fc${i}" style="top:184px">${f}</div>`).join('');
const GUL = ['P', 'O', 'S', 'D', 'CO', 'R', 'B'];
$('#gTiles').innerHTML = GUL.map((g, i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 100}px">${g}</div>`).join('');
const MOD = [['P', 'Planning', 'FAYOL + GULICK'], ['O', 'Organizing', 'FAYOL + GULICK'], ['S', 'Staffing', 'FROM GULICK'], ['D', 'Directing', "FAYOL'S COMMAND"], ['C', 'Controlling', 'FROM FAYOL']];
$('#mRows').innerHTML = MOD.map(([l, n, s], i) => `<div class="mr" id="mr${i}" style="top:${92 + i * 92}px"><div class="bg"></div><div class="bl">${l}</div><div class="bn">${n}</div><div class="bs">${s}</div></div>`).join('');

// F: five questions (list + panes)
const FR = [['target', 'Planning'], ['network', 'Organizing'], ['users', 'Staffing'], ['megaphone', 'Directing'], ['gauge', 'Controlling']];
$('#fRows').innerHTML = FR.map(([ic, t], i) => `<div class="kr" id="fr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const hlp = (x, y, s = 64) => `<div class="av ic" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;box-shadow:0 0 0 3px #E2DACB">${M.icon('user', s * 0.45, C.muted, 2.2)}</div>`;
const FV = [
  `<i class="abs" style="left:0;top:0;width:72px;height:72px;border-radius:36px;background:#14213D;display:flex;align-items:center;justify-content:center">${M.icon('target', 36, C.gold2, 2.2)}</i>
   <div class="serif abs" id="fg" style="left:100px;top:6px;font-size:52px;white-space:nowrap">200 cups <span class="acc">a day</span></div>
   <div class="vc" id="fg0" style="left:0;top:112px">${M.icon('store', 22, C.gold, 2.2)}<span>At the new outlet</span></div>
   <div class="vc" id="fg1" style="top:112px">${M.icon('calendar', 22, C.gold, 2.2)}<span>Set before opening</span></div>`,
  `<div class="vc nv" id="oN" style="top:0">${M.icon('store', 22, C.gold2, 2.2)}<span>Outlet 2</span></div>
   <svg class="abs" style="left:0;top:52px" width="848" height="60" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round"><path id="oL" d="M424 0 V24 M132 24 H716 M132 24 V56 M424 24 V56 M716 24 V56"/></svg>` +
   [['flame', 'Kitchen'], ['coin', 'Counter'], ['droplet', 'Cleaning']].map(([ic, t], i) => `<div class="abs" id="oB${i}" style="left:${i * 292}px;top:112px;width:264px;height:64px;border-radius:18px;background:#F5F1E8;display:flex;align-items:center;justify-content:center;gap:12px;font:600 26px Poppins">${M.icon(ic, 26, C.gold, 2.2)}<span>${t}</span></div>`).join(''),
  `<div class="abs" id="sq0" style="left:0;top:0;width:412px;height:176px"><div class="av face" style="left:0;top:0;width:64px;height:64px;${FACE('meena')};box-shadow:0 0 0 3px #B8862F">M</div><div class="ct2" style="top:14px">Meena</div><div class="vc gd" style="left:0;top:96px">${M.icon('key', 22, '#fff', 2.2)}<span>Runs the outlet</span></div></div>
   <div class="abs" id="sq1" style="left:436px;top:0;width:412px;height:176px">${hlp(0, 0)}${hlp(52, 0)}<div class="ct2" style="left:136px;top:14px">Two new helpers</div><div class="vc" style="left:0;top:96px">${M.icon('users', 22, C.gold, 2.2)}<span>Join her team</span></div></div>`,
  `<div class="av face" id="dA" style="left:0;top:0;width:72px;height:72px;${FACE('asha')};box-shadow:0 0 0 4px #B8862F">A</div><div class="ct2" id="dAn" style="left:96px;top:18px">Asha</div>
   <svg class="abs" style="left:200px;top:22px" width="240" height="30"><path id="dArr" d="M4 15 H228 M218 5 L230 15 L218 25" fill="none" stroke="#B8862F" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="abs" id="dH" style="left:460px;top:0;width:388px;height:72px">${hlp(0, 4)}${hlp(52, 4)}<div class="ct2" style="left:136px;top:18px">The helpers</div></div>
   <div class="vc nv" id="dC" style="left:0;top:112px">${M.icon('cup', 22, C.gold2, 2.2)}<span>Trains them on her recipe</span></div>`,
  `<div class="av face" id="cK" style="left:0;top:0;width:72px;height:72px;${FACE('kabir')};box-shadow:0 0 0 4px #14213D">K</div><div class="ct2" style="left:96px;top:4px">Kabir</div><div class="abs lbl" style="left:96px;top:44px">THE EVENING COUNT</div>
   <div class="abs" style="left:436px;top:0;width:412px;height:72px;border-radius:18px;background:#F5F1E8"><div class="abs lbl" style="left:24px;top:26px">CUPS TODAY</div><div class="serif abs" id="cN" style="right:24px;top:8px;font-size:48px;white-space:nowrap">0</div></div>
   <div class="vc" id="cE" style="left:0;top:112px">${M.icon('calendar', 22, C.gold, 2.2)}<span>Every evening, against the plan</span></div>`,
];
const FP = [['THE FIVE FUNCTIONS', 'Five questions', 'Every manager answers them, again and again', 'IN SHORT', null]].concat([
  ['FUNCTION 01 / 05', 'Planning', 'What should we do?', 'AT CHAI CORNER'],
  ['FUNCTION 02 / 05', 'Organizing', 'Who does what?', 'AT CHAI CORNER'],
  ['FUNCTION 03 / 05', 'Staffing', 'Who, exactly?', 'AT CHAI CORNER'],
  ['FUNCTION 04 / 05', 'Directing', 'How do we guide them?', 'AT CHAI CORNER'],
  ['FUNCTION 05 / 05', 'Controlling', 'Are we on track?', 'AT CHAI CORNER']].map((p, i) => [...p, FV[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, x, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="fv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('help', 34, C.gold, 2.2)}</i><span>What? Who? Who exactly? How? On track?</span></div>`}</div>`).join('');

// Y: coordination + gantt
$('#cd0I').innerHTML = M.icon('list', 24, C.gold, 2.2); $('#cd1I').innerHTML = M.icon('clock', 24, C.gold2, 2.2);
wrap($('#cdef'), 'cdefOut', 784, 580);
const GX = 232, GD = 36;                       // day 1 starts at x 232, 36 px per day
const GR = [['Rent the shop', 1, 4, '#3A4560'], ['Stoves arrive', 11, 2, '#14213D'], ['Helpers start', 8, 7, '#B8862F'], ['Training', 11, 3, '#24345A'], ['Opening day', 14, 1, '#B8862F']];
$('#gIn').innerHTML = Array.from({ length: 14 }, (_, i) => `<div class="gd2" id="gdn${i}" style="left:${GX + i * GD}px;top:92px">${i + 1}</div>`).join('') +
  GR.map(([n], i) => `<div class="gl" id="gl${i}" style="top:${143 + i * 64}px">${n}</div><div class="gb" id="gb${i}" style="top:${136 + i * 64}px"></div>`).join('') +
  `<div id="gIdle" style="top:${136 + 2 * 64}px">3 idle days</div><div id="gSt"><span id="gStI"></span><span id="gStT"></span></div>`;
$('#bt1I').innerHTML = M.icon('users', 22, C.gold, 2.2);

// X: the cycle + chart
const NODES = [['target', 'Planning'], ['network', 'Organizing'], ['users', 'Staffing'], ['megaphone', 'Directing'], ['gauge', 'Controlling']];
const NP = NODES.map((_, i) => { const a = (-90 + i * 72) * Math.PI / 180; return [392 + 180 * Math.cos(a), 330 + 180 * Math.sin(a)]; });
$('#cNodes').innerHTML = NODES.map(([ic, n], i) => `<div class="cn2" id="cn${i}"><span class="ni"></span><span>${n}</span></div>`).join('');
const WK = [150, 170, 190, 210], BASE = 440, PX = 1.2;
$('#cBars').innerHTML = WK.map((v, i) => `<div class="cb" id="cb${i}" style="left:${96 + i * 164}px"></div><div class="cv" id="cv${i}" style="left:${96 + i * 164}px">${v}</div><div class="cw2" id="cw${i}" style="left:${96 + i * 164}px;top:456px">WEEK ${i + 1}</div>`).join('');
$('#cGoal').style.top = (BASE - 200 * PX) + 'px'; $('#cGl').style.top = (BASE - 200 * PX - 30) + 'px';

// K: at work today
const KA = [
  ['target', 'Planning', 'Decide in advance what to do', 'A goal of 200 cups a day', 'calendar', 'A school sets exam dates months ahead'],
  ['network', 'Organizing', 'Split the work and share it out', 'Kitchen, counter and cleaning', 'pulse', 'A hospital splits work into wards'],
  ['users', 'Staffing', 'Find and train the right people', 'Meena, plus two new helpers', 'plane', 'An airline hires and trains cabin crew'],
  ['megaphone', 'Directing', 'Guide, teach and motivate', 'Asha trains the helpers', 'award', 'A captain sets the field, lifts the team'],
  ['gauge', 'Controlling', 'Check results against the plan', 'Kabir counts cups every evening', 'phone', 'A delivery app checks promised times'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THE FIVE, AT WORK', 'Every workplace', 'Schools, hospitals, airlines, teams, apps', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same five jobs, any size of team</span></div>`) + `</div>`).join('');

// L: the human side
const XG = [['map', 'A clear map'], ['store', 'Fits any business']];
const XH = [['shuffle', 'Real days are messy'], ['layers', 'Functions overlap']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 64}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 64}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const rng = M.rng(14); const SEG = []; { let x = 0; const cols = ['#14213D', '#B8862F', '#3A4560', '#D9B26B', '#24345A']; let k = 0; while (x < 688) { const w = Math.min(688 - x, 10 + Math.floor(rng() * 34)); SEG.push([x, w, cols[k % 5]]); x += w + 3; k += 1 + Math.floor(rng() * 3); } }
$('#mzDay').innerHTML = SEG.map(([x, w, c], i) => `<i id="sg${i}" style="left:${x}px;width:${w}px;background:${c}"></i>`).join('');
$('#bothI').innerHTML = M.icon('map', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Planning', 'Organizing', 'Staffing', 'Controlling'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['list', 'Five functions', ['Plan', 'Organize', 'Staff', 'Direct', 'Control']], ['refresh', 'A cycle, not a list', ['Back to planning']], ['link', 'Coordination', ['In step']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pop = (el, t, ta, tout = 1e9) => M.vis(el, t, ta, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const runRows = (t, pre, n, icons, tOn, t0, tEnd) => {
  for (let i = 0; i < n; i++) {
    const el = $('#' + pre + i), ta = tOn[i], td = i < n - 1 ? tOn[i + 1] : tEnd + 1;
    M.vis(el, t, t0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
    setIco(el.querySelector('.ri'), icons[i], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
  }
};
const paneHead = (pn, t, tin, tout, withPx = true) => {
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  if (withPx) M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
  return true;
};
// token angle on the cycle ring (degrees, -90 = Planning at the top)
const SEGS = [[tX1 + 0.2, tX2 - 0.1, -90, 198], [tSends - 0.1, tPlanX + 0.3, 198, 270], [tX4 + 0.3, T1('X4'), 270, 558], [tX5 + 0.1, tTen5, 558, 630], [tX6 + 0.1, T1('X6') + 0.4, 630, 990]];
const tokA = t => { let a = -90; for (const [t0, t1, a0, a1] of SEGS) { if (t >= t0) a = M.lerp(a0, a1, M.io((t - t0) / (t1 - t0))); } return a; };
// gantt bar geometry: [startDay, days] at time t (the fix slides stoves and helpers)
const gGeo = (i, t) => {
  const [, d0, n] = GR[i];
  if (i === 1) return [M.lerp(11, 9, M.io((t - tNine + 0.1) / 0.5)), 2];
  if (i === 2) { const s = M.lerp(8, 10, M.io((t - tTen + 0.1) / 0.5)); return [s, 15 - s]; }
  if (i === 3) { const s = M.lerp(11, 10, M.io((t - tTen + 0.1) / 0.5)); return [s, 14 - s]; }
  return [d0, n];
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // to-do chips in two rows of three
  for (let r = 0; r < 2; r++) { let x = 36; for (let c = 0; c < 3; c++) { const el = $('#td' + (r * 3 + c)); el.style.left = x + 'px'; el.style.top = (88 + r * 72) + 'px'; x += el.offsetWidth + 16; } }
  // five boxes: task chips after the name
  FN.forEach(([, , ts], i) => { let x = 300; ts.forEach((_, k) => { const el = $('#bt' + i + k); el.style.left = x + 'px'; x += el.offsetWidth + 12; }); });
  let x = 48; ['dc0', 'dc1'].forEach(id => { const el = $('#' + id); el.style.left = x + 'px'; x += el.offsetWidth + 16; });
  $('#dc2').style.left = '48px';
  x = 36; FAY.forEach((_, i) => { const el = $('#fc' + i); el.style.left = x + 'px'; x += el.offsetWidth + 10; });
  // F panes
  $('#fg1').style.left = ($('#fg0').offsetWidth + 16) + 'px';
  $('#oN').style.left = (424 - $('#oN').offsetWidth / 2) + 'px';
  // bus stand pills, centred
  const b0 = $('#bt0'), b1 = $('#bt1'), bw = b0.offsetWidth + 16 + b1.offsetWidth; b0.style.left = (392 - bw / 2) + 'px'; b1.style.left = (392 - bw / 2 + b0.offsetWidth + 16) + 'px';
  // cycle nodes centred on the ring
  NODES.forEach((_, i) => { const el = $('#cn' + i); setIco(el.querySelector('.ni'), NODES[i][0], C.gold, 22, 2.2); el.style.left = (NP[i][0] - el.offsetWidth / 2).toFixed(0) + 'px'; el.style.top = (NP[i][1] - 26).toFixed(0) + 'px'; });
  document.querySelectorAll('#kPans .pt, #fPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm, #fPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  const q1 = $('#qq1'); if (q1.offsetWidth > 1420) q1.style.fontSize = Math.floor(68 * 1420 / q1.offsetWidth) + 'px';
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 5]), ...tXh.map((th, i) => [th + 0.1, -10 + (i + 1) * 5])], M.SOFT);

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
  M.vis($('#exChip'), t, tF[0] + 0.2, tXout, { dy: 10, outDur: 0.3 });

  /* ===== A: the messy to-do list ===== */
  const aOn = t < tB1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#todo'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    // the list fills up, the three spoken jobs light up, then attention hops around and nothing gets done
    const hopI = t >= tC2 && t < tC2e ? HOP[Math.min(HOP.length - 1, Math.floor((t - tC2) / 0.32))] : -1;
    TODO.forEach((_, i) => {
      const el = $('#td' + i); pop(el, t, i < 3 ? tC1w[i] - 0.1 : tMess + (i - 3) * 0.14);
      const hi = i === hopI ? 1 : 0;
      el.style.background = hi ? C.ink : C.paper; el.style.color = hi ? '#fff' : C.ink;
      el.querySelector('b').style.borderColor = hi ? C.gold : C.dim;
    });
    M.vis($('#fin'), t, tNothing - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#days'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.rise($('#dBig'), t, tMorph + 0.7, { st: 0.06 });
    for (let i = 0; i < 14; i++) {
      const el = $('#dd' + i); M.vis(el, t, tMorph + 0.8 + i * 0.03, 1e9, { dy: 10 });
      const g = i === 13 ? M.io((t - tTwoW) / 0.3) : 0, r = i === 0 ? M.io((t - tC3) / 0.3) : 0;
      el.style.background = mix(mix(C.paper, C.ink, r), C.gold, g); el.style.color = g > 0.5 || r > 0.5 ? '#fff' : C.ink;
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

  /* ===== B: five boxes ===== */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.1, tBout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tB2);
    M.vis($('#illImg'), t, tB1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#box'), t, tB2 + 0.12, tBout, { dx: 60, dy: 0, ...o });
    let n = 0;
    FN.forEach(([, , ts], i) => {
      const r = $('#br' + i); M.vis(r, t, tB2 + 0.3 + i * 0.08, 1e9, { dy: 14 });
      const g = M.io((t - tB3 - i * 0.25) / 0.3); r.querySelector('.bl').style.background = mix(C.ink, C.gold, g); r.querySelector('.bl').style.color = g > 0.5 ? '#fff' : C.gold2;
      ts.forEach((_, k) => { M.vis($('#bt' + i + k), t, tSort + 0.1 + n * 0.32, 1e9, { dx: 80, dy: 0, sp: M.SOFT, fade: 0.12 }); n++; });
    });
  }

  /* ===== D: definition + history ===== */
  const dOn = t >= tD1 - 0.1 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const df = $('#def'); M.vis(df, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#defOut'), t, tG1);
    M.rise($('#dl0'), t, tD2 + 0.15, { st: 0.06, sp: M.HEAVY }); M.rise($('#dl1'), t, tEvery - 0.1, { st: 0.06, sp: M.HEAVY });
    M.rise($('#dl2'), t, tBus - 0.5, { st: 0.06, sp: M.HEAVY });
    M.vis($('#dHr'), t, tBus, 1e9, { dy: 0 }); M.vis($('#dWh'), t, tBus + 0.05, 1e9, { dy: 8 });
    pop($('#dc0'), t, tBus + 0.1); pop($('#dc1'), t, tSize - 0.05); pop($('#dc2'), t, tSize + 0.5);
    M.vis($('#fay'), t, tG1 + 0.12, tG3 - 0.14, { dx: 60, dy: 0, ...o });
    M.vis($('#fAv'), t, tFayol - 0.15, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.rise($('#fNm'), t, tFayol - 0.05, { st: 0.06 });
    FAY.forEach((_, i) => pop($('#fc' + i), t, tFw[i] - 0.1));
    M.vis($('#gul'), t, tG2 + 0.05, tG3 - 0.14, { dy: 36, ...o });
    GUL.forEach((_, i) => { const g = $('#gt' + i); M.vis(g, t, tSeven - 0.1 + i * 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); const h = M.io((t - tPosd - i * 0.08) / 0.25); g.style.background = mix(C.paper, C.ink, h); g.style.color = mix(C.ink, C.gold2, h); });
    M.rise($('#gTx'), t, tLetters - 0.2, { st: 0.04 });
    M.vis($('#mod'), t, tG3 + 0.05, tDout, { dx: 60, dy: 0, ...o });
    MOD.forEach((_, i) => { const r = $('#mr' + i); M.vis(r, t, tMw[i] - 0.15, 1e9, { dy: 14 }); });
  }

  /* ===== F: five questions ===== */
  const fOn = t >= tF0 - 0.1 && t < tY1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    runRows(t, 'fr', 5, FR.map(r => r[0]), tF, tF0, tFout);
    FP.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 5 ? tF[k] - 0.14 : 1e9;
      const pn = $('#fn' + k); if (!paneHead(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) { M.rise($('#fg'), t, tGoal - 0.05, { st: 0.06, sp: M.HEAVY }); pop($('#fg0'), t, tGoal + 0.5); pop($('#fg1'), t, tGoal + 0.75); }
      else if (k === 2) { pop($('#oN'), t, tin + 0.7); M.draw($('#oL'), t, tin + 0.9, 0.5, M.o3); [tKit, tCtr, tCln].forEach((tw, i) => pop($('#oB' + i), t, tw - 0.1)); }
      else if (k === 3) { M.vis($('#sq0'), t, tMeenaF - 0.1, 1e9, { dy: 14 }); M.vis($('#sq1'), t, tHelpF - 0.3, 1e9, { dy: 14 }); }
      else if (k === 4) {
        M.vis($('#dA'), t, tAsha - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#dAn'), t, tAsha, 1e9, { dy: 8 });
        M.draw($('#dArr'), t, wt('F4', 'trains') - 0.05, 0.5, M.o3); M.vis($('#dH'), t, wt('F4', 'helpers') - 0.1, 1e9, { dy: 10 });
        pop($('#dC'), t, tRecipe - 0.15);
      } else if (k === 5) {
        M.vis($('#cK'), t, tKabir - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
        M.count($('#cN'), t, tCounts, 1.4, 0, 150); pop($('#cE'), t, tEven - 0.1);
      }
    });
  }

  /* ===== Y: coordination, the opening plan, day 14 ===== */
  const yOn = t >= tY1 - 0.1 && t < tX1 + 0.2; M.hide($('#sY'), !yOn);
  if (yOn) {
    const o = { outDur: 0.3, ody: -16 };
    const cd = $('#cdef'); M.vis(cd, t, tY1 + 0.1, tY5 - 0.14, { dy: 36, ...o }); grow(cd, $('#cdefOut'), t, tY2);
    M.rise($('#cdT'), t, wt('Y1', 'Coordination') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.rise($('#cdS'), t, wt('Y1', 'Coordination') + 0.5, { st: 0.04 });
    M.vis($('#cdHr'), t, tYorder - 0.4, 1e9, { dy: 0 }); pop($('#cd0'), t, tYorder - 0.15); pop($('#cd1'), t, tYtime - 0.15);
    M.vis($('#gnt'), t, tY2 + 0.12, tYout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 14; i++) M.vis($('#gdn' + i), t, tY2 + 0.3 + i * 0.02, 1e9, { dy: 8 });
    const tg = [tY2 + 0.4, tYstove - 0.1, tYhelp - 0.1, tYstove + 0.4, tY2 + 0.8];
    GR.forEach((g, i) => {
      M.vis($('#gl' + i), t, tY2 + 0.35 + i * 0.07, 1e9, { dy: 10 });
      const b = $('#gb' + i), [s, n] = gGeo(i, t), grw = M.o3((t - tg[i]) / 0.5);
      M.hide(b, t < tg[i]);
      b.style.left = (GX + (s - 1) * GD).toFixed(1) + 'px'; b.style.width = Math.max(0, n * GD * grw - 4).toFixed(1) + 'px';
      b.style.background = i === 4 ? mix(C.gold, C.ink, 0) : g[3];
    });
    // idle days on the helpers row (days 8 to 10), gone once the order is fixed
    const id = $('#gIdle'), hs = gGeo(2, t)[0], idw = Math.max(0, (gGeo(3, t)[0] - hs) * GD - 4);
    M.vis(id, t, tY3 - 0.05, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.15 });
    id.style.left = (GX + (hs - 1) * GD).toFixed(1) + 'px'; id.style.width = idw.toFixed(1) + 'px'; if (idw < 6) M.hide(id, true);
    const fixd = M.io((t - tTen) / 0.4), opn = M.io((t - tOpens) / 0.3), gs = $('#gSt');
    M.vis(gs, t, tY3 + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    gs.style.background = opn > 0.5 ? C.gold : (fixd > 0.5 ? C.ink : C.redBg); gs.style.color = fixd > 0.5 || opn > 0.5 ? '#fff' : C.red;
    setIco($('#gStI'), opn > 0.5 ? 'flag' : (fixd > 0.5 ? 'check' : 'hourglass'), fixd > 0.5 || opn > 0.5 ? '#fff' : C.red, 24, 2.4);
    M.setT($('#gStT'), opn > 0.5 ? 'Day 14: open, on time' : (fixd > 0.5 ? 'In step: no idle days' : '3 paid days, nothing to do'));
    M.vis($('#bus'), t, tY5 + 0.05, tYout, { dy: 36, ...o });
    M.vis($('#busImg'), t, tY5 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    pop($('#bt0'), t, tMeenaY - 0.1); pop($('#bt1'), t, tHelpY - 0.1);
  }

  /* ===== X: the cycle ===== */
  const xOn = t >= tX1 - 0.1 && t < tK0 + 0.2; M.hide($('#sX2'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#cyc'), t, tX1 + 0.05, tXout, { dx: -60, dy: 0, ...o });
    M.vis($('#cht'), t, tX1 + 0.2, tXout, { dx: 60, dy: 0, ...o });
    const a = tokA(t), ar = a * Math.PI / 180;
    $('#tok').setAttribute('cx', (392 + 180 * Math.cos(ar)).toFixed(1)); $('#tok').setAttribute('cy', (330 + 180 * Math.sin(ar)).toFixed(1));
    M.vis($('#tok'), t, tX1 + 0.15, 1e9, { dy: 0, fade: 0.15 });
    const lap = t > tCyc ? 1 : (((a + 90) % 360) + 360) % 360 / 360;
    M.drawU($('#ringP'), t > tCyc ? M.io((t - tCyc) / 0.5) : lap);
    NODES.forEach((_, i) => {
      const el = $('#cn' + i); M.vis(el, t, tX1 + 0.25 + i * 0.08, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      let d = Math.abs(((a - (-90 + i * 72)) % 360 + 540) % 360 - 180); const act = M.clamp(1 - d / 26);
      const hot = i === 4 ? M.io((t - tFifty) / 0.3) * (1 - M.io((t - tSends) / 0.3)) : 0;
      el.style.background = hot > 0.02 ? mix(C.paper, C.red, hot) : mix(C.paper, C.ink, act); el.style.color = act > 0.5 || hot > 0.5 ? '#fff' : C.ink;
      setIco(el.querySelector('.ni'), NODES[i][0], act > 0.5 || hot > 0.5 ? '#fff' : C.gold, 22, 2.2);
    });
    let wk = 'WEEK 1', tx = 'Opening week', col = C.ink;
    if (t >= tX2) { tx = '150 cups a day'; col = C.red; }
    if (t >= tSends) { tx = 'Back to planning'; col = C.ink; }
    if (t >= tX4) { wk = 'NEW PLAN'; tx = 'Open at 7 AM'; col = C.ink; }
    if (t >= tX5 + 0.2) { wk = 'WEEK 4'; tx = '210 cups a day'; col = C.gold; }
    if (t >= tX6) { wk = 'AND AGAIN'; tx = 'A cycle, not a list'; col = C.ink; }
    M.setT($('#cWk'), wk); M.setT($('#cTx'), tx); $('#cTx').style.color = col;
    M.vis($('#cWk'), t, tX1 + 0.5, 1e9, { dy: 8 }); M.vis($('#cTx'), t, tX1 + 0.6, 1e9, { dy: 10 });
    // chart
    M.vis($('#cGoal'), t, tX1 + 0.6, 1e9, { dy: 0 }); M.vis($('#cGl'), t, tX1 + 0.7, 1e9, { dy: 8 });
    const flash = M.io((t - wt('X3', 'goal')) / 0.3) * (1 - M.io((t - tSends) / 0.3)); $('#cGoal').style.borderTopColor = mix(C.gold, C.red, flash);
    const tb = [tFifty - 0.2, tX5 + 0.2, tX5 + 0.7, tTen5 - 0.2];
    WK.forEach((v, i) => {
      const b = $('#cb' + i), u = M.o5((t - tb[i]) / 0.8), hh = v * PX * u;
      M.hide(b, t < tb[i]); b.style.height = hh.toFixed(1) + 'px'; b.style.top = (BASE - hh).toFixed(1) + 'px';
      b.style.background = i === 0 ? '#D98F7B' : (i === 3 ? C.gold : C.ink);
      const cv = $('#cv' + i); M.vis(cv, t, tb[i] + 0.4, 1e9, { dy: 8 }); cv.style.top = (BASE - v * PX - 46) + 'px'; cv.style.color = i === 0 ? C.red : (i === 3 ? C.gold : C.ink);
      M.vis($('#cw' + i), t, tX1 + 0.8 + i * 0.06, 1e9, { dy: 8 });
    });
    const cs = $('#cSt'), st = t >= tBeat - 0.1 ? 3 : t >= tSevenX - 0.2 ? 2 : t >= tFifty ? 1 : 0;
    M.vis(cs, t, tFifty + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const SS = [['clock', 'Week one', C.paper, C.ink], ['alert', '50 cups below the goal', C.redBg, C.red], ['refresh', 'New plan: open at 7 AM', C.ink, '#fff'], ['check', 'Goal beaten: 210 a day', C.gold, '#fff']][st];
    setIco($('#cStI'), SS[0], SS[3] === '#fff' ? '#fff' : SS[3], 22, 2.4); M.setT($('#cStT'), SS[1]);
    if (cs._bg !== SS[2]) { cs._bg = SS[2]; cs.style.background = SS[2]; cs.style.color = SS[3]; }
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tL1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl2'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp2'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    runRows(t, 'kr', 5, KA.map(r => r[0]), tK, tK0, tKout);
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); if (!paneHead(pn, t, tin, tout, false)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { pn.querySelectorAll('.px').forEach(e => M.vis(e, t, tin + 0.5, tout, { dy: 10, ...oo })); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== L: the human side ===== */
  const lOn = t >= tL1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tL4);
    M.vis($('#scl'), t, tL1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tL2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tL3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#mz'), t, tL4 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#mzL'), t, tL4 + 0.4, 1e9, { dy: 8 });
    M.vis($('#mzDay'), t, tL4 + 0.45, 1e9, { dy: 10 });
    SEG.forEach((_, i) => M.vis($('#sg' + i), t, tMintz + i * 0.06, 1e9, { dy: 0, fade: 0.08 }));
    M.vis($('#mzt0'), t, tL4 + 0.5, 1e9, { dy: 8 }); M.vis($('#mzt1'), t, tL4 + 0.5, 1e9, { dy: 8 });
    M.rise($('#mzBig'), t, tL5 - 0.1, { st: 0.07, sp: M.HEAVY }); M.rise($('#mzSub'), t, tL4 + 0.7, { st: 0.03 });
    M.vis($('#mzQ'), t, tNineL + 0.4, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tL6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tL6 + 0.15, 1e9, { dy: 40 });
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
