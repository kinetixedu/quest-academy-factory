// MBA - Principles of Management, Ep 17: Staffing
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', grey: '#D9D2C4' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  logOut: ['m16 17 5-5-5-5', 'M21 12H9', 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'],
  sprout: ['M7 20h10', 'M10 20c5.5-2.5.8-6.4 3-10', 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z', 'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  headset: ['M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z', 'M21 16v2a4 4 0 0 1-4 4h-5'],
  medical: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M12 8v8', 'M8 12h8'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2l8 5H4z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  filter: ['M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z'],
  door: ['M13 4h3a2 2 0 0 1 2 2v14', 'M2 20h3', 'M13 20h9', 'M10 12v.01', 'M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tNeeds = wt('H2', 'needs'), tTwoH = wt('H2', 'two'), tMore = wt('H2', 'more');
const tFirst = wt('C1', 'first'), tAsked = wt('C1', 'asked'), tLate = wt('C2', 'late'), tBurnt = wt('C2', 'burnt'), tQuit = wt('C2', 'quit'), tWeek = wt('C2', 'week');
const tC3 = T0('C3'), tWrong = wt('C3', 'wrong');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
// D: what staffing is
const tD1 = T0('D1'), tD2 = T0('D2'), tAsha = wt('D2', 'Asha'), tHelper = wt('D2', 'helper'), tD3 = T0('D3'), tFill = wt('D3', 'filling'), tRight = wt('D3', 'right');
const tD4 = T0('D4'), tKw = [wt('D4', 'leave'), wt('D4', 'grow'), wt('D4', 'move')], tUp = wt('D4', 'up'), tDout = T0('E0') - 0.32;
// E: eight steps
const tE0 = T0('E0'), tE3 = T0('E3'), tFirst4 = wt('E3', 'first'), tEout = T0('M1') - 0.32;
const tEw = [...['Plan', 'recruit', 'select', 'place'].map(w => wt('E1', w)), ...['train', 'appraise', 'promote', 'pay'].map(w => wt('E2', w))];
// M: the funnel
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8'), tM9 = T0('M9'), tMout = T0('R1') - 0.32;
const tTea = wt('M2', 'tea'), tCups = wt('M2', 'cups'), tNotice = wt('M4', 'notice'), tWord = wt('M4', 'word'), tForty = wt('M4', 'forty');
const tCupT = wt('M5', 'cup'), tTest = wt('M5', 'test'), tInterview = wt('M6', 'interview'), tOnly = wt('M6', 'Only'), tTwoJ = wt('M6', 'two');
const tPos = wt('M7', 'positive'), tNeg = wt('M7', 'negative'), tRej = wt('M7', 'rejects');
const tRight2 = wt('M9', 'right'), tChk = [wt('M9', 'day'), wt('M9', 'Meena'), wt('M9', 'shows'), wt('M9', 'around')];
// R: sources
const tR1 = T0('R1'), tR2 = T0('R2'), tInt = wt('R2', 'Internal'), tMoved = wt('R2', 'moved'), tOutlet = wt('R2', 'outlet');
const tR3 = T0('R3'), tExt = wt('R3', 'External'), tRw = [wt('R3', 'new'), wt('R3', 'people'), wt('R3', 'outside')], tRp = [wt('R3', 'fresh'), wt('R3', 'skills'), wt('R3', 'ideas')], tRout = T0('P0') - 0.32;
// P: keep good people
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tTeach = wt('P1', 'teaches'), tRecipe = wt('P1', 'recipe'), tSame = wt('P1', 'same');
const tRev = [wt('P2', 'regular'), wt('P2', 'review'), wt('P2', 'works')];
const tUp3 = wt('P3', 'up'), tAcross = wt('P3', 'across'), tFair = wt('P4', 'Fair'), tRew = wt('P4', 'rewards'), tStay = wt('P4', 'stay');
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKx = [wt('K1', 'hospital'), wt('K2', 'company'), wt('K3', 'bank'), wt('K4', 'call'), wt('K5', 'manager')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'right'), wt('X2', 'quitting'), wt('X2', 'service')], tXh = [wt('X3', 'time'), wt('X3', 'missed'), wt('X4', 'bias')];
const tSq = [wt('X5', 'same'), wt('X5', 'questions'), wt('X5', 'every')], tPred = wt('X6', 'predicted'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'filled')], ['Plan', 'select', 'train', 'pay'].map(w => wt('S3', w)), [wt('S4', 'attracts'), wt('S4', 'picks')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// queue
const NQ = 10;
$('#qRow').innerHTML = Array.from({ length: NQ }, (_, i) => `<div class="qp" id="q${i}" style="left:${36 + i * 80}px"></div>`).join('');
$('#qPillI').innerHTML = M.icon('clock', 24, C.red, 2.4);
$('#openI').innerHTML = M.icon('door', 26, C.gold2, 2.2); $('#bad').innerHTML = M.icon('user', 34, '#fff', 2.2);
const BC = [['clock', 'Came late'], ['flame', 'Burnt the milk'], ['logOut', 'Quit in a week']];
BC.forEach(([ic, tx], i) => { $('#bc' + i).innerHTML = M.icon(ic, 22, C.red, 2.4) + `<span>${tx}</span>`; });
// D
wrap($('#ill'), 'illOut', 784, 580);
const KP = [['logOut', 'Leave'], ['sprout', 'Grow'], ['trendUp', 'Move up']];
KP.forEach(([ic, tx], i) => { $('#kp' + i).innerHTML = M.icon(ic, 28, C.gold, 2.2) + `<span>${tx}</span>`; });
// E: eight steps
const STEPS = [['calendar', 'Plan', 'How many, what kind'], ['megaphone', 'Recruit', 'Get people to apply'], ['filter', 'Select', 'Test and choose'], ['door', 'Place', 'Right job, welcome'],
  ['cap', 'Train', 'Teach the method'], ['star', 'Appraise', 'Review the work'], ['trendUp', 'Promote', 'Move up or across'], ['coin', 'Pay', 'Fair pay, rewards']];
$('#ovT').innerHTML = STEPS.map(([ic, t, s], i) => `<div class="ot8" id="ot${i}" style="left:${48 + (i % 4) * 384}px;top:${96 + Math.floor(i / 4) * 232}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="serif rt">${t}</div><div class="rs">${s}</div></div>`).join('');
// M: funnel tokens
const rnd = M.rng(17);
const N = 40, idx = Array.from({ length: N }, (_, i) => i);
for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
const PASS = idx.slice(0, 10).sort((a, b) => a - b), HIRE = [PASS[2], PASS[7]];
const GA = i => [80 + (i % 8) * 32, 154 + Math.floor(i / 8) * 32];
const GI = k => [444 + (k % 2) * 40, 150 + Math.floor(k / 2) * 36];
const GH = [[664, 160], [664, 268]];
const SRC = [[190, 498], [520, 498]];
$('#tokG').innerHTML = GH.map(([x, y], k) => `<circle id="hs${k}" cx="${x}" cy="${y}" r="26" fill="#FFFFFF" stroke="#C9BFAE" stroke-width="3" stroke-dasharray="6 6"/>`).join('') +
  idx.map((_, i) => `<g id="tk${i}"><circle r="11" fill="#14213D"/></g>`).join('') +
  HIRE.map((_, k) => `<g id="hk${k}"><circle r="26" fill="#B8862F"/><g transform="translate(-14 -14)">${M.icon('user', 28, '#fff', 2.4).replace('<svg', '<svg x="0" y="0"')}</g></g>`).join('');
$('#plcI').innerHTML = M.icon('check', 24, C.gold2, 2.6); $('#sp0I').innerHTML = M.icon('clipboard', 24, C.gold, 2.2); $('#sp1I').innerHTML = M.icon('users', 24, C.gold, 2.2);
// M: right panes
const FV = [
  `<div class="av face" id="f0a" style="left:0;top:8px;${FACE('meena')};box-shadow:0 0 0 4px #B8862F">M</div><div class="avn" id="f0an" style="left:-44px;top:96px">Meena</div>
   <div class="slot" id="f0s0" style="left:180px;top:8px">?</div><div class="avn" id="f0n0" style="left:136px;top:96px">Tea</div>
   <div class="slot" id="f0s1" style="left:340px;top:8px">?</div><div class="avn" id="f0n1" style="left:296px;top:96px">Counter</div>
   <div class="pp2" id="f0p" style="left:480px;top:16px;background:#14213D;color:#fff">${M.icon('users', 26, C.gold2, 2.2)}2 jobs</div>`,
  `<div class="serif abs" id="f1n" style="left:0;top:-10px;font-size:110px;line-height:1">0</div><div class="abs" id="f1l" style="left:150px;top:22px;font:600 30px Poppins;white-space:nowrap">people applied</div>
   <div class="pp2" id="f1p" style="left:0;top:116px;background:#B8862F;color:#fff">${M.icon('megaphone', 26, '#fff', 2.2)}Attract many</div>`,
  `<div class="pp2" id="f2a" style="left:0;top:0">${M.icon('cup', 26, C.gold, 2.2)}Chai test</div><div class="pp2" id="f2b" style="top:0">${M.icon('users', 26, C.gold, 2.2)}Interview</div><div class="pp2" id="f2c" style="top:0">${M.icon('check', 26, C.gold2, 2.6)}2 hired</div>
   <div class="abs" id="f2t" style="left:0;top:100px;font:600 30px Poppins;white-space:nowrap">40 in, <span class="acc">38 turned away</span></div>`,
  `<div class="pp2" id="f3a" style="left:0;top:0;background:#F3EAD6">${M.icon('plus', 26, C.gold, 2.6)}Recruitment <span class="acc">attracts many</span></div>
   <div class="pp2" id="f3b" style="left:0;top:84px;background:#F6E3DC">${M.icon('minus', 26, C.red, 2.6)}Selection <span style="color:#B5482F">rejects many</span></div>`,
  ['Meet the team', 'Where things are', 'Hygiene rules', 'Shift timings'].map((x, i) => `<div class="chk" id="f4c${i}" style="left:${(i % 2) * 360}px;top:${Math.floor(i / 2) * 84}px"><i></i><span>${x}</span></div>`).join(''),
];
const FP = [['STEP 01 / 08', 'Manpower planning', 'How many people, and what kind?', 'AT THE BUS STAND'], ['STEP 02 / 08', 'Recruitment', 'Get good people to apply', 'THE RESULT'],
  ['STEP 03 / 08', 'Selection', 'Test, interview, then choose', 'THE FILTER'], ['TWO OPPOSITE JOBS', 'Positive vs negative', 'One opens the door, one filters', 'IN SHORT'],
  ['STEP 04 / 08 · PLACEMENT AND ORIENTATION', 'Placement', 'The right job, and a proper welcome', 'DAY ONE WITH MEENA']];
$('#fPans').innerHTML = FP.map(([s, t, m, x], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div><div class="fv" id="fv${i}">${FV[i]}</div></div>`).join('');
// R
const RIP = [['check', 'Knows the work'], ['clock', 'Quick to start'], ['smile', 'Lifts morale']], REP = [['sprout', 'Fresh skills'], ['bulb', 'New ideas'], ['users', 'Wider choice']];
RIP.forEach(([ic, tx], i) => { $('#rIp' + i).innerHTML = M.icon(ic, 22, C.gold, 2.4) + `<span>${tx}</span>`; });
REP.forEach(([ic, tx], i) => { $('#rEp' + i).innerHTML = M.icon(ic, 22, C.gold, 2.4) + `<span>${tx}</span>`; });
const SRCS = [['clipboard', 'Notices'], ['users', 'Referrals'], ['cap', 'Colleges']];
$('#srcs').innerHTML = SRCS.map(([ic, tx], i) => `<div class="srcI" id="sr${i}" style="left:${48 + i * 240}px"><i>${M.icon(ic, 32, C.ink, 2.2)}</i><span>${tx}</span></div>`).join('');
// P: keep good people (list + panes)
const PR = [['cap', 'Training'], ['star', 'Appraisal'], ['trendUp', 'Promotion and transfer'], ['coin', 'Compensation']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 5}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const PV = [
  [['Learn', 40], ['Practise', 80], ['Ready', 120]].map(([n, h], i) => `<div class="stair" id="sti${i}" style="left:${i * 170}px;top:${176 - h}px;height:${h}px"><span>${n}</span></div>`).join('') +
   `<div class="av" id="dav" style="left:39px;top:56px;box-shadow:0 0 0 4px #B8862F">${M.icon('user', 34, '#fff', 2.2)}</div>
    <div class="av face" id="tav" style="left:640px;top:24px;${FACE('asha')}">A</div><div class="avn" id="tavn" style="left:596px;top:112px">Asha</div>
    <svg class="abs" id="tavA" style="left:540px;top:44px" width="80" height="30"><path d="M72 15 H16 M26 5 L14 15 L26 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ['Speed', 'Taste', 'Cleanliness'].map((n, r) => `<div class="stR" id="ar${r}" style="top:${r * 60}px"><div class="sl">${n}</div>${[0, 1, 2, 3, 4].map(k => `<div class="dt" id="ad${r}${k}" style="left:${220 + k * 48}px"></div>`).join('')}</div>`).join('') +
   `<div class="pp2" id="aP" style="left:520px;top:56px;background:#14213D;color:#fff">${M.icon('star', 26, C.gold2, 2.2)}Regular review</div>`,
  `<div class="pp2" id="pu0" style="left:0;top:0">${M.icon('arrowU', 26, C.gold, 2.6)}Up: helper to senior helper</div>
   <div class="pp2" id="pu1" style="left:0;top:84px">${M.icon('arrowR', 26, C.gold, 2.6)}Across: to a busier outlet</div>`,
  [60, 96, 132].map((h, i) => `<div class="coin" id="cn${i}" style="left:${i * 72}px;top:${168 - h}px;height:${h}px"></div>`).join('') +
   `<div class="pp2" id="cp0" style="left:260px;top:0">${M.icon('coin', 26, C.gold, 2.2)}Fair pay</div><div class="pp2" id="cp1" style="top:0">${M.icon('award', 26, C.gold, 2.2)}Rewards</div>
    <div class="pp2" id="cp2" style="left:260px;top:84px;background:#B8862F;color:#fff">${M.icon('heart', 26, '#fff', 2.2)}Good people stay</div>`,
];
const PP = [['STEPS 05 TO 08', 'Keep them', 'Good people are hard to find', 'IN SHORT', null]].concat([
  ['STEP 05 / 08', 'Training', 'Teach the best way, step by step'], ['STEP 06 / 08', 'Appraisal', 'A regular review of the work'],
  ['STEP 07 / 08', 'Promotion', 'and transfer: up, or across'], ['STEP 08 / 08', 'Compensation', 'Fair pay and rewards']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('heart', 34, C.gold, 2.2)}</i><span>Help them grow, so they stay</span></div>`}</div>`).join('');
// K: at work today
const KA = [
  ['calendar', 'Manpower planning', 'Count the jobs before you hire', 'Two helpers for the morning rush', 'medical', 'Nurses planned for every night shift'],
  ['megaphone', 'Recruitment', 'Get good people to apply', 'A notice on the stall, tips from regulars', 'cap', 'Companies meet students on campus'],
  ['filter', 'Selection', 'Test, interview, then choose', 'A chai test, then an interview', 'bank', 'A bank runs a written test, then interviews'],
  ['book', 'Training', 'Teach the job, step by step', 'Asha trains each new helper', 'headset', 'A new agent sits beside an expert'],
  ['star', 'Appraisal', 'Review the work, set new goals', 'Ravi reviews each helper', 'target', 'A yearly goal review with the manager'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KPn = [['STAFFING TODAY', 'Five steps', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KPn.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same steps, any size of team</span></div>`) + `</div>`).join('');
// X: the human side
const XG = [['users', 'The right fit'], ['smile', 'Fewer people quit'], ['star', 'Better service']];
const XH = [['clock', 'Time and money'], ['search', 'Good people missed'], ['user', 'Bias: like me']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
// structured interview grid: 3 people x 3 questions
$('#sqG').innerHTML = ['Q1', 'Q2', 'Q3'].map((q, k) => `<div class="sqh" id="sh${k}" style="left:${136 + k * 76}px;top:92px">${q}</div>`).join('') +
  ['A', 'B', 'C'].map((p, r) => `<div class="av" id="sa${r}" style="left:48px;top:${124 + r * 88}px;width:64px;height:64px;font-size:26px;background:${r === 1 ? C.gold : C.ink}">${p}</div>` +
    [0, 1, 2].map(k => `<div class="sq" id="sq${r}${k}" style="left:${136 + k * 76}px;top:${128 + r * 88}px"></div>`).join('')).join('') +
  `<div class="serif abs" id="sqT1" style="left:392px;top:156px;font-size:38px;white-space:nowrap">Same questions</div><div class="serif abs acc" id="sqT2" style="left:392px;top:206px;font-size:38px;white-space:nowrap">for every person</div>`;
$('#xpillI').innerHTML = M.icon('award', 24, C.gold2, 2.4);
wrap($('#xs'), 'xsOut', 784, 580); wrap($('#rI'), 'rIOut', 784, 580);
// quiz
const OPTS = ['Recruitment', 'Selection', 'Placement', 'Training'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('filter', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'The right person, every job', ['Keep it filled']], ['list', 'Eight steps', ['Plan', 'Select', 'Train', 'Pay']], ['filter', 'Recruit vs select', ['Attract many', 'Pick the few']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const listRow = (el, ic, t, ta, td) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
  el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
  el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
  el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
  el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
};
const paneIn = (pn, t, tin, tout) => {
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
};
const pop = (el, t, a, o = {}) => M.vis(el, t, a, o.out ?? 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...o });
const mv = (a, b, u) => [M.lerp(a[0], b[0], u), M.lerp(a[1], b[1], u)];

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const tg = $('#tgT'); tg.style.left = (128 - tg.offsetWidth) + 'px'; $('#tgW').style.left = '648px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#kp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  $('#sp1').style.left = (48 + $('#sp0').offsetWidth + 16) + 'px';
  GH.forEach(([gx, gy], k) => { const r = $('#rp' + k); r.style.left = (gx - r.offsetWidth / 2) + 'px'; r.style.top = (gy + 36) + 'px'; });
  x = 0; ['f2a', 'f2b', 'f2c'].forEach(id => { const p = $('#' + id); p.style.left = x + 'px'; x += p.offsetWidth + 48; });
  $('#cp1').style.left = (260 + $('#cp0').offsetWidth + 16) + 'px';
  ['I', 'E'].forEach(s => { let x = 48; for (let i = 0; i < 3; i++) { const p = $('#r' + s + 'p' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; } });
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#fPans .pt').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(72 * 688 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);
// funnel timing per token
const spread = (tForty + 0.2 - tNotice) / N;
const tokIn = i => tNotice + i * spread;

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
  M.vis($('#exChip'), t, tM2 + 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: the bus stand needs people ===== */
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
    M.vis($('#qcard'), t, tMorph + 0.3, 1e9, { dy: 36 });
    for (let i = 0; i < NQ; i++) {
      const el = $('#q' + i), late = i >= 6 ? M.io((t - tNeeds - (i - 6) * 0.08) / 0.25) : 0;
      pop(el, t, tMorph + 0.55 + i * 0.12, { sc: 0.5 });
      el.style.background = mix(C.paper, C.redBg, late);
      setIco(el, 'user', late > 0.5 ? C.red : C.ink, 30, 2.2);
    }
    pop($('#qPill'), t, tNeeds + 0.3);
    M.vis($('#tcard'), t, tMorph + 0.42, 1e9, { dy: 36 });
    pop($('#tMe'), t, tMorph + 0.7, { sc: 0.5 }); M.vis($('#tMeN'), t, tMorph + 0.8, 1e9, { dy: 10 });
    [0, 1].forEach(k => {
      pop($('#sl' + k), t, (k ? tMore : tTwoH) - 0.05, { sc: 0.5 });
      M.vis($('#sl' + k + 'N'), t, (k ? tMore : tTwoH) + 0.05, 1e9, { dy: 10 });
      const g = M.io((t - tWrong - k * 0.1) / 0.3); $('#sl' + k).style.borderColor = mix('#C9BFAE', C.gold, g); $('#sl' + k).style.color = mix(C.dim, C.gold, g);
    });
    M.vis($('#bad'), t, tFirst - 0.05, tWeek + 0.35, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, outDur: 0.3, osc: 0.6, ody: 0 });
    $('#bad').style.boxShadow = '0 0 0 4px ' + mix(C.dim, C.red, M.io((t - tLate) / 0.3));
    M.setT($('#sl0N'), t > tFirst - 0.05 && t < tWeek + 0.5 ? 'First to ask' : 'Helper 1');
    [tLate, tBurnt, tQuit].forEach((ta, i) => pop($('#bc' + i), t, ta - 0.05, { out: tC3 - 0.1, outDur: 0.25, osc: 0.9, ody: 0 }));
    M.rise($('#noW'), t, tC3 + 0.3, { st: 0.07, sp: M.HEAVY }); M.rise($('#noW2'), t, tWrong - 0.05, { st: 0.07, sp: M.HEAVY });
    pop($('#open'), t, tMore + 0.3, { out: tFirst - 0.2, outDur: 0.25, osc: 0.9, ody: 0 });
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

  /* ===== D: what staffing is ===== */
  const dOn = t >= tTu - 0.05 && t < tE0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const ill = $('#ill'); M.vis(ill, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tD3 + 0.2);
    M.vis($('#illImg'), t, tD2 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgT'), t, tAsha - 0.05, tD3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgW'), t, tHelper - 0.05, tD3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#def'), t, tD3 + 0.32, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#df1'), t, tFill - 0.05, { st: 0.05 }); M.rise($('#df2'), t, tRight - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#keep'), t, tKw[0] - 0.5, tDout, { dy: 36, ...o });
    tKw.forEach((ta, i) => pop($('#kp' + i), t, ta - 0.05));
    M.rise($('#kpT'), t, tUp + 0.35, { st: 0.05 });
  }

  /* ===== E: eight steps ===== */
  const eOn = t >= tE0 - 0.1 && t < tM1 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    M.vis($('#ov'), t, tE0 + 0.1, tEout, { dy: 36, outDur: 0.3, ody: -16 });
    STEPS.forEach(([ic], i) => {
      const el = $('#ot' + i); M.vis(el, t, tE0 + 0.3 + i * 0.06, 1e9, { dy: 16 });
      const on = M.io((t - tEw[i] + 0.05) / 0.3), back = i >= 4 ? M.io((t - tFirst4) / 0.35) : 0, act = on * (1 - back);
      const gr = i < 4 ? M.io((t - tFirst4 - i * 0.06) / 0.3) : 0;
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.bg').style.boxShadow = gr > 0.01 ? `inset 0 0 0 ${(4 * gr).toFixed(2)}px ${C.gold}` : 'none';
      el.querySelector('.rt').style.color = t < tEw[i] ? C.dim : mix('#fff', C.ink, back);
      el.querySelector('.rs').style.color = t < tEw[i] ? C.dim : mix(C.gold2, C.ink2, back);
      el.querySelector('.rn').style.color = t < tEw[i] ? C.dim : mix(C.gold2, C.gold, back);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < tEw[i] ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 30, 2.2);
    });
  }

  /* ===== M: the hiring funnel ===== */
  const mOn = t >= tM1 - 0.1 && t < tR1 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fu'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#fpn'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    ['zA8', 'zI8', 'zH8'].forEach((id, i) => M.vis($('#' + id), t, tM1 + 0.4 + i * 0.08, 1e9, { dy: 16 }));
    GH.forEach((_, k) => M.vis($('#hs' + k), t, (k ? tCups : tTea) - 0.05, 1e9, { dy: 0, fade: 0.15 }));
    pop($('#sp0'), t, tNotice - 0.1, { out: tM8, outDur: 0.25, osc: 0.9, ody: 0 }); pop($('#sp1'), t, tWord - 0.1, { out: tM8, outDur: 0.25, osc: 0.9, ody: 0 });
    // tokens: arrive from the sources, get tested, move on or grey out
    let nA = 0, nI = 0, nH = 0;
    idx.forEach((_, i) => {
      const g = $('#tk' + i), ta = tokIn(i), pk = PASS.indexOf(i), hk = HIRE.indexOf(i);
      if (t < ta) { M.hide(g, true); return; }
      M.hide(g, false); nA++;
      const pa = M.spring(t - ta, M.SOFT); let p = mv(SRC[i % 2], GA(i), pa), col = C.ink, r = 11;
      if (pk < 0) { col = mix(C.ink, C.grey, M.io((t - tTest - (i % 10) * 0.05) / 0.3)); }
      else {
        const tm = tInterview - 0.3 + pk * 0.05, u = M.spring(t - tm, M.SOFT);
        if (t >= tm) p = mv(GA(i), GI(pk), u);
        if (t >= tm + 0.2) nI++;
        if (hk < 0) col = mix(C.ink, C.grey, M.io((t - tOnly - pk * 0.04) / 0.3));
        else { const th = tTwoJ - 0.05 + hk * 0.12; if (t >= th) { M.hide(g, true); nH++; } }
      }
      const pulse = Math.max(0, Math.sin(M.clamp((t - tCupT - (i % 8) * 0.06) / 0.45) * Math.PI));
      setA(g, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
      const c = g.firstChild; setA(c, 'fill', col); setA(c, 'r', (r + 3 * pulse).toFixed(2));
    });
    HIRE.forEach((i, k) => {
      const th = tTwoJ - 0.05 + k * 0.12, g = $('#hk' + k), pk = PASS.indexOf(i);
      if (t < th) { M.hide(g, true); return; } M.hide(g, false);
      const u = M.spring(t - th, M.SOFT), p = mv(GI(pk), GH[k], u), s = M.lerp(0.42, 1, u);
      setA(g, 'transform', u >= 1 ? `translate(${GH[k][0]} ${GH[k][1]})` : `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) scale(${s.toFixed(3)})`);
    });
    M.setT($('#zcA'), String(nA)); M.setT($('#zcI'), String(Math.min(10, nI))); M.setT($('#zcH'), String(nH));
    $('#zcA').style.color = nA ? C.ink : C.dim; $('#zcI').style.color = nI ? C.ink : C.dim; $('#zcH').style.color = nH ? C.gold : C.dim;
    [0, 1].forEach(k => pop($('#rp' + k), t, tRight2 + k * 0.15)); M.vis($('#plc'), t, tRight2 + 0.5, 1e9, { dy: 16 });
    // right panes
    const FT = [tM1 + 0.4, tM3, tM5, tM7, tM8, 1e9];
    FP.forEach((_, k) => {
      const tin = FT[k], tout = FT[k + 1] - 0.14, pn = $('#fn' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      paneIn(pn, t, tin, tout);
      M.vis($('#fv' + k), t, tin + 0.55, tout, { dy: 18, outDur: 0.18, ody: -12 });
      if (k === 0) {
        pop($('#f0a'), t, tin + 0.6, { sc: 0.5 }); M.vis($('#f0an'), t, tin + 0.7, 1e9, { dy: 10 });
        [tTea, tCups].forEach((ta, j) => { pop($('#f0s' + j), t, ta - 0.1, { sc: 0.5 }); M.vis($('#f0n' + j), t, ta, 1e9, { dy: 10 }); });
        pop($('#f0p'), t, tCups + 0.5);
      } else if (k === 1) {
        M.setT($('#f1n'), String(nA));
        M.vis($('#f1n'), t, tin + 0.6, 1e9, { dy: 12 }); M.vis($('#f1l'), t, tin + 0.7, 1e9, { dy: 10 });
        $('#f1l').style.left = ($('#f1n').offsetWidth + 24) + 'px';
        pop($('#f1p'), t, tForty + 0.1);
      } else if (k === 2) {
        const ts = [tTest - 0.1, tInterview - 0.1, tTwoJ - 0.1];
        ['f2a', 'f2b', 'f2c'].forEach((id, j) => {
          const el = $('#' + id); pop(el, t, ts[j]);
          const on = M.io((t - ts[j]) / 0.3), last = j === 2 ? on : 0; el.style.background = j === 2 ? mix(C.paper, C.ink, last) : mix(C.paper, C.gold3, on); el.style.color = j === 2 && last > 0.5 ? '#fff' : C.ink;
        });
        M.rise($('#f2t'), t, tTwoJ + 0.4, { st: 0.05 });
      } else if (k === 3) {
        pop($('#f3a'), t, tPos - 0.05); pop($('#f3b'), t, tNeg - 0.05);
      } else if (k === 4) {
        for (let j = 0; j < 4; j++) {
          const el = $('#f4c' + j); M.vis(el, t, tin + 0.6 + j * 0.06, 1e9, { dy: 14 });
          const ok = M.io((t - tChk[j]) / 0.25), ic = el.querySelector('i');
          ic.style.background = mix('#fff', C.gold, ok); setIco(ic, 'check', ok > 0.5 ? '#fff' : C.line, 22, 3);
        }
      }
    });
  }

  /* ===== R: internal vs external ===== */
  const rOn = t >= tR1 - 0.1 && t < tP0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    const rI = $('#rI'); M.vis(rI, t, tR1 + 0.1, tRout, { dy: 36, ...o }); grow(rI, $('#rIOut'), t, tR3);
    M.vis($('#rE'), t, tR3 + 0.12, tRout, { dx: 60, dy: 0, ...o });
    M.rise($('#rIT'), t, tInt - 0.05, { st: 0.07, sp: M.HEAVY }); M.rise($('#rIM'), t, tInt + 0.4, { st: 0.04 });
    M.vis($('#ld0'), t, tInt + 0.5, 1e9, { dy: 14 }); M.vis($('#ld1'), t, tInt + 0.62, 1e9, { dy: 14 });
    pop($('#ldM'), t, tInt + 0.8, { sc: 0.5 });
    const u = M.spring(t - tMoved, M.SOFT), p = mv([268, 320], [656, 232], u);
    snap($('#ldM'), (u >= 1 ? 656 : p[0].toFixed(1)) + 'px', 'left'); snap($('#ldM'), (u >= 1 ? 232 : p[1].toFixed(1)) + 'px', 'top');
    $('#ldM').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, M.io((t - tOutlet) / 0.3));
    M.draw($('#ldAP'), t, tMoved - 0.05, 0.6, M.o3);
    M.vis($('#rIH'), t, tOutlet, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) pop($('#rIp' + i), t, tOutlet + 0.2 + i * 0.22);
    M.rise($('#rET'), t, tExt - 0.05, { st: 0.07, sp: M.HEAVY }); M.rise($('#rEM'), t, tExt + 0.4, { st: 0.04 });
    for (let i = 0; i < 3; i++) M.vis($('#sr' + i), t, tRw[i], 1e9, { dy: 20 });
    M.vis($('#rEH'), t, tRp[0] - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) pop($('#rEp' + i), t, tRp[i] - 0.05);
  }

  /* ===== P: keep good people ===== */
  const pOn = t >= tP0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    PR.forEach(([ic], i) => { const el = $('#pr' + i); M.vis(el, t, tP0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); listRow(el, ic, t, tP[i], i < 3 ? tP[i + 1] : tPout + 1); });
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tP0 + 0.5, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      paneIn(pn, t, tin, tout);
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        for (let i = 0; i < 3; i++) { const s = $('#sti' + i); M.vis(s, t, tin + 0.6 + i * 0.1, 1e9, { dy: 16 }); s.style.background = i === 2 ? mix(C.paper, C.gold, M.io((t - tSame) / 0.3)) : C.paper; s.querySelector('span').style.color = i === 2 && t > tSame + 0.15 ? '#fff' : C.ink; }
        pop($('#dav'), t, tin + 0.7, { sc: 0.5 });
        pop($('#tav'), t, tTeach - 0.1, { sc: 0.5 }); M.vis($('#tavn'), t, tTeach, 1e9, { dy: 10 }); M.vis($('#tavA'), t, tTeach + 0.1, 1e9, { dx: 12, dy: 0, fade: 0.15 });
        const st = M.track(0, [[tRecipe, 1], [tSame, 2]], M.SOFT)(t), H = [40, 80, 120];
        const hh = st <= 1 ? M.lerp(H[0], H[1], st) : M.lerp(H[1], H[2], st - 1);
        const settled = Math.abs(st - Math.round(st)) < 1e-3;
        snap($('#dav'), (settled ? 39 + Math.round(st) * 170 : (39 + st * 170).toFixed(1)) + 'px', 'left');
        snap($('#dav'), (settled ? 176 - H[Math.round(st)] - 80 : (176 - hh - 80).toFixed(1)) + 'px', 'top');
      } else if (k === 2) {
        const SC = [4, 5, 3];
        for (let r = 0; r < 3; r++) {
          M.vis($('#ar' + r), t, tin + 0.6 + r * 0.08, 1e9, { dy: 12 });
          for (let q = 0; q < 5; q++) { const d = $('#ad' + r + q), f = q < SC[r] ? M.io((t - tRev[r] - q * 0.07) / 0.2) : 0; d.style.background = mix(C.paper, C.gold, f); }
        }
        pop($('#aP'), t, tRev[1] + 0.1);
      } else if (k === 3) {
        pop($('#pu0'), t, tUp3 - 0.1); pop($('#pu1'), t, tAcross - 0.1);
      } else if (k === 4) {
        for (let i = 0; i < 3; i++) { const c = $('#cn' + i), u = M.o5((t - tin - 0.7 - i * 0.12) / 0.6), h = [60, 96, 132][i] * u; c.style.height = h.toFixed(1) + 'px'; c.style.top = (168 - h).toFixed(1) + 'px'; c.style.background = i === 2 ? C.gold : C.gold2; }
        pop($('#cp0'), t, tFair - 0.05); pop($('#cp1'), t, tRew - 0.05); pop($('#cp2'), t, tStay - 0.05);
      }
    });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => { const el = $('#kr' + i); M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); listRow(el, ic, t, tK[i], i < 4 ? tK[i + 1] : tKout + 1); });
    KPn.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.7, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKx[k - 1] - 0.1, tout, { dy: 18, ...oo });
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
    for (let k = 0; k < 3; k++) M.vis($('#sh' + k), t, tX5 + 0.4 + k * 0.06, 1e9, { dy: 8 });
    for (let r = 0; r < 3; r++) {
      pop($('#sa' + r), t, tX5 + 0.45 + r * 0.08, { sc: 0.5 });
      for (let k = 0; k < 3; k++) {
        const el = $('#sq' + r + k), ta = tSq[k] + r * 0.08; M.vis(el, t, tX5 + 0.5 + r * 0.06, 1e9, { dy: 10 });
        const ok = M.io((t - ta) / 0.25); el.style.background = mix(C.paper, r === 1 ? C.gold : C.ink, ok);
        setIco(el, 'check', ok > 0.5 ? '#fff' : C.paper, 26, 3);
      }
    }
    M.rise($('#sqT1'), t, tSq[0], { st: 0.06 }); M.rise($('#sqT2'), t, tSq[2], { st: 0.06 });
    pop($('#xpill'), t, tPred - 0.05);
    M.vis($('#xsrc'), t, tPred + 0.3, 1e9, { dy: 8 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
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
