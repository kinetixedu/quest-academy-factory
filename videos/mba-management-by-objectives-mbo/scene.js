// MBA - Principles of Management, Ep 20: Management by Objectives (MBO)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', grey: '#D9D2C4' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  sunrise: ['M12 2v8', 'm4.93 10.93 1.41 1.41', 'M2 18h2', 'M20 18h2', 'm19.07 10.93-1.41 1.41', 'M22 22H2', 'm8 6 4-4 4 4', 'M16 18a4 4 0 0 0-8 0'],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  clock2: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  arrows: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  frown: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M16 16s-1.5-2-4-2-4 2-4 2', 'M9 9h.01', 'M15 9h.01'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  user2: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tDays = [wt('H2', 'Monday'), wt('H2', 'Tuesday'), wt('H2', 'Wednesday')];
const tSay = wt('C1', 'say'), tStops = wt('C1', 'stops'), tC2 = T0('C2'), tNobody = wt('C2', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'set'), tTu = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tPeter = wt('D2', 'Peter'), tAus = wt('D2', 'Austrian'), tThinker = wt('D2', 'thinker');
const tD3 = T0('D3'), t1954 = wt('D3', '1954'), tThe = wt('D3', 'The'), tMgmt = wt('D3', 'Management'), tD4 = T0('D4'), tAgree = wt('D4', 'agree'), tJudge = wt('D4', 'judge'), tDout = T0('G1') - 0.32;
// G
const tG1 = T0('G1'), tTeam = wt('G1', 'team'), tG2 = T0('G2'), tG3 = T0('G3'), tFiveG = wt('G3', 'Five'), tMarch = wt('G3', 'March'), tRaviG = wt('G3', 'Ravi'), tMeenaG = wt('G3', 'Meena'), tYes = wt('G3', 'yes'), tGout = T0('F0') - 0.32;
// F
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('B0') - 0.32;
const tSugg = wt('F2', 'suggests'), tHelper = wt('F3', 'helper'), tCupsW = wt('F3', 'cups'), tDip = wt('F4', 'dip'), tFix = wt('F4', 'fix'), tHits = wt('F5', 'hits'), tBonus = wt('F5', 'bonus');
// B
const tB0 = T0('B0'), tB = [1, 2, 3, 4].map(i => T0('B' + i)), tBout = T0('K0') - 0.32;
const tExactly = wt('B1', 'exactly'), tCounts = wt('B1', 'counts'), tChose = wt('B2', 'chose'), tWants = wt('B2', 'wants'), tHit = wt('B2', 'hit'), tReal = wt('B3', 'real'), tResults = wt('B4', 'results'), tMood = wt('B4', 'mood');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKx = [wt('K1', 'company'), wt('K2', 'Many'), wt('K3', 'sales'), wt('K4', 'manager'), wt('K5', 'bonus')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Clear'), wt('X2', 'effort'), wt('X2', 'fair')], tXh = [wt('X3', 'meetings'), wt('X3', 'easy'), wt('X4', 'taste')];
const tSeventy = wt('X5', 'seventy'), tSixty = wt('X5', 'sixty'), tBacked = wt('X6', 'backed'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'In');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'results')], ['business', 'personal', 'action', 'review', 'reward'].map(w => wt('S3', w)), [wt('S4', 'purpose')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#oRavi').style.backgroundImage = `url(${IMG}ravi-face.jpg)`; $('#nMe').style.backgroundImage = `url(${IMG}meena-face.jpg)`;
const SL = [['MONDAY', 'megaphone', 'Sell more'], ['TUESDAY', 'milk', 'Save milk'], ['WEDNESDAY', 'sunrise', 'Open earlier']];
$('#slips').innerHTML = SL.map(([d, ic, tx], i) => `<div class="slip" id="sl${i}" style="left:${36 + i * 292}px"><div class="sd">${d}</div><div class="si">${M.icon(ic, 26, C.ink, 2.2)}</div><div class="st">${tx}</div></div>`).join('');
$('#say').innerHTML = M.icon('ban', 20, C.red, 2.4) + '<span>None</span>';
// D
const wrapD = () => { wrap($('#tay'), 'tayIn', 616, 580); wrap($('#book'), 'bookIn', 920, 274); }; wrapD();
$('#fatherI').innerHTML = M.icon('target', 26, '#fff', 2.2);
$('#id0I').innerHTML = M.icon('users', 28, C.gold, 2.2); $('#id1I').innerHTML = M.icon('award', 28, C.gold2, 2.2);
// G
wrap($('#ill'), 'illOut', 784, 580);
$('#gokI').innerHTML = M.icon('check', 26, '#fff', 2.8);
// F: cascade + review chart
$('#ci0').innerHTML = M.icon('store', 32, C.gold, 2.2); $('#ci2').innerHTML = M.icon('list', 32, C.gold, 2.2);
$('#ch0').innerHTML = M.icon('user2', 20, C.gold, 2.2) + '<span>Extra helper at 7 am</span>';
$('#ch1').innerHTML = M.icon('cup', 20, C.gold, 2.2) + '<span>Cups washed at night</span>';
$('#cb1').insertAdjacentHTML('beforeend', `<div class="cch" id="hid" style="background:#B8862F;color:#fff">${M.icon('users', 20, '#fff', 2.2)}<span>Her idea</span></div>`);
wrap($('#cas'), 'casOut', 784, 580);
const X = w => 60 + (w - 1) * 56, Y = v => 320 - v * 1.1;
const VAL = [120, 128, 138, 146, 124, 140, 152, 162, 172, 182, 192, 202];
$('#revG').innerHTML = `<line x1="40" y1="320" x2="688" y2="320" stroke="#14213D" stroke-width="3"/>` +
  [0, 100, 200].map(v => `<text x="28" y="${Y(v) + 6}" text-anchor="end" font-family="Poppins" font-weight="600" font-size="16" fill="#8A8274">${v}</text>`).join('') +
  `<line x1="40" y1="${Y(200)}" x2="688" y2="${Y(200)}" stroke="#B8862F" stroke-width="3" stroke-dasharray="10 8"/><text x="688" y="${Y(200) - 12}" text-anchor="end" font-family="Poppins" font-weight="700" font-size="16" letter-spacing="2" fill="#B8862F">MEENA'S GOAL 200</text>` +
  VAL.map((_, i) => `<text x="${X(i + 1)}" y="350" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" fill="#8A8274">W${i + 1}</text>`).join('') +
  `<path id="rvLine" d="" fill="none" stroke="#14213D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
  VAL.map((_, i) => `<circle id="rvd${i}" cx="${X(i + 1)}" cy="${Y(VAL[i])}" r="${i === 4 ? 10 : 7}" fill="${i === 4 ? '#B5482F' : '#14213D'}" stroke="#FFFFFF" stroke-width="3"/>`).join('') +
  `<circle id="rvHead" r="9" fill="#B8862F" stroke="#FFFFFF" stroke-width="3"/>`;
$('#rv0').innerHTML = M.icon('search', 24, C.red, 2.4) + '<span>Week 5 dip: spotted and fixed</span>';
$('#rv1').innerHTML = M.icon('award', 24, '#fff', 2.4) + '<span>Goal hit: bonus earned</span>';
// B: why it works (list + panes)
const PR = [['target', 'Clarity'], ['trendUp', 'Motivation'], ['users', 'Participation'], ['scale', 'Fair appraisal']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const PV = [
  `<div class="pp2" id="v1a" style="left:0;top:0;background:#14213D;color:#fff">${M.icon('target', 26, C.gold2, 2.2)}200 cups before 10 am</div>
   <div class="pp2" id="v1b" style="left:0;top:84px;background:#F3EAD6">${M.icon('check', 26, C.gold, 2.6)}She knows exactly what counts</div>`,
  [['Chose it', 40], ['Owns it', 80], ['Hits it', 120]].map(([n, h], i) => `<div class="stair" id="sti${i}" style="left:${i * 170}px;top:${176 - h}px;height:${h}px"><span>${n}</span></div>`).join('') +
   `<div class="av face" id="dav" style="left:39px;top:56px;${FACE('meena')};box-shadow:0 0 0 4px #B8862F">M</div>`,
  `<div class="av face" id="v3a" style="left:0;top:0;${FACE('ravi')}">R</div><div class="avn" id="v3an" style="left:-44px;top:92px">Ravi</div>
   <svg class="abs" id="v3s" style="left:96px;top:20px" width="400" height="34"><path id="v3p" d="M8 17 H392 M20 5 L6 17 L20 29 M380 5 L394 17 L380 29" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="av face" id="v3b" style="left:520px;top:0;${FACE('meena')}">M</div><div class="avn" id="v3bn" style="left:476px;top:92px">Meena</div>
   <div class="stp" id="v3c" style="top:4px;background:#14213D;color:#fff">${M.icon('users', 26, C.gold2, 2.2)}Both have a say</div>`,
  `<div class="pp2" id="v4a" style="left:0;top:0;background:#B8862F;color:#fff">${M.icon('check', 26, '#fff', 2.6)}Judged on results</div>
   <div class="pp2" id="v4b" style="left:0;top:84px;background:#F6E3DC;color:#B5482F">${M.icon('x', 26, C.red, 2.6)}<span style="text-decoration:line-through">Not on Ravi's mood</span></div>`,
];
const PP = [['THE BENEFITS', 'Why it works', 'Four reasons people try harder', 'IN SHORT', null]].concat([
  ['BENEFIT 01 / 04', 'Clarity', 'Everyone knows what counts'], ['BENEFIT 02 / 04', 'Motivation', 'Your own target pulls you'],
  ['BENEFIT 03 / 04', 'Participation', 'The worker gets a real say'], ['BENEFIT 04 / 04', 'Fair appraisal', 'Judged on results']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Goals people helped to set</span></div>`}</div>`).join('');
// K
const KA = [
  ['network', 'Cascading goals', 'One big goal, split for every team', "The outlet goal becomes Meena's goal", 'chart', "A company's yearly goal, split by team"],
  ['target', 'Objectives and key results', 'A few big goals, tracked by numbers', 'Goal: 500 cups. Key result: 200 by 10', 'trendUp', 'Big goals each quarter, with numbers'],
  ['users', 'Agreed targets', 'Set together, not handed down', 'Meena suggests her own target', 'briefcase', 'Each salesperson agrees the year target'],
  ['calendar', 'Reviews', 'Check progress, fix it early', 'Every Friday, Ravi and Meena check', 'clipboard', 'A quarterly check against the goals'],
  ['award', 'Rewards', 'Pay for results agreed in advance', 'A bonus when Meena hits 200', 'coin', 'A bonus for results agreed up front'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KPn = [['MBO TODAY', 'Five practices', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KPn.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BIG COMPANY</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same idea, any size of team</span></div>`) + `</div>`).join('');
// X
const XG = [['target', 'Clear goals'], ['trendUp', 'More effort'], ['scale', 'Fair reviews']];
const XH = [['clock', 'Many meetings'], ['gauge', 'Goals set too easy'], ['cup', 'Taste may slip']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
const LOSS = [33, 60];
$('#dotG').innerHTML = Array.from({ length: 70 }, (_, i) => `<circle id="dt${i}" cx="${22 + (i % 14) * 46}" cy="${22 + Math.floor(i / 14) * 44}" r="15" fill="#F5F1E8"/>`).join('');
$('#dpillI').innerHTML = M.icon('award', 24, C.gold2, 2.4);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Participation', 'Review', 'Reward', 'Action plans'], RIGHT = 0;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Agree goals together', ['Judge by results']], ['list', 'Five steps', ['Business', 'Personal', 'Plans', 'Review', 'Reward']], ['target', 'Clarity and motivation', ['Keep the purpose']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink, w1 = 784) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, w1, sh);
  snap(card, (sh >= 1 ? w1 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - w1) / 2).toFixed(1)) + 'px', 'left');
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
// review progress in weeks: week 5 lands on "dip", week 8 by the end of step four, week 12 on "hits"
const wk = t => { const K = [[tF[3] + 0.3, 1], [tDip, 5], [T1('F4'), 8], [tHits, 12]]; if (t <= K[0][0]) return 1; for (let i = 1; i < K.length; i++) if (t < K[i][0]) return M.lerp(K[i - 1][1], K[i][1], M.clamp((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0]))); return 12; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  let x = 36; const i0 = $('#id0'); i0.style.left = x + 'px'; x += i0.offsetWidth + 16; $('#idA').style.left = x + 'px'; x += 76; $('#id1').style.left = x + 'px';
  [['tgA', 177], ['tgR', 320], ['tgK', 502], ['tgM', 607]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = '108px'; });
  $('#ch1').style.left = (104 + $('#ch0').offsetWidth + 12) + 'px';
  const hd = $('#hid'); hd.style.left = (104 + $('#cb1 .ct').offsetWidth + 24) + 'px'; hd.style.top = '50px';
  const v3 = $('#v3c'); v3.style.left = (296 - v3.offsetWidth / 2) + 'px';
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kRows .rt').forEach(el => { if (el.offsetWidth > 400) el.style.fontSize = Math.floor(28 * 400 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tG3 - 0.2, tFout, { dy: 10, outDur: 0.3 });

  /* ===== A: orders, not goals ===== */
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
    M.vis($('#ocard'), t, tMorph + 0.2, 1e9, { dy: 36 });
    pop($('#oRavi'), t, tMorph + 0.45, { sc: 0.5 });
    tDays.forEach((ta, i) => { const s = $('#sl' + i); M.vis(s, t, Math.max(tMorph + 0.35, ta - 0.15), 1e9, { dy: 20 }); s.style.background = mix(C.paper, C.gold3, M.io((t - ta) / 0.3) * (i < 2 ? 1 - M.io((t - tDays[i + 1]) / 0.3) : 1)); });
    M.vis($('#ncard'), t, tMorph + 0.42, 1e9, { dy: 36 });
    for (let i = 0; i < 3; i++) M.vis($('#nc' + i), t, tMorph + 0.6 + i * 0.08, 1e9, { dy: 14 });
    pop($('#nMe'), t, tMorph + 0.8, { sc: 0.5 }); pop($('#say'), t, tSay - 0.05);
    const dr = M.io((t - tStops) / 0.6), ew = 216 * M.lerp(1, 0.2, dr);
    $('#effB').style.width = (ew * M.o3((t - tMorph - 0.9) / 0.6)).toFixed(1) + 'px'; $('#effB').style.background = mix(C.gold, C.red, dr);
    M.setT($('#effL'), dr > 0.5 ? 'Low, and falling' : 'Full'); $('#effL').style.color = dr > 0.5 ? C.red : C.ink;
    M.vis($('#qBig'), t, tNobody - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#qLbl'), t, tNobody + 0.2, 1e9, { dy: 10 });
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

  /* ===== D: Peter Drucker ===== */
  const dOn = t >= tTu - 0.05 && t < tG1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const tay = $('#tay'), sh = M.spring(t - tD3 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD2 + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tPeter - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tAus - 0.05, 1e9, { dy: 10 });
    pop($('#father'), t, tThinker - 0.05);
    const bk = $('#book'), bs = M.spring(t - tD4 + 0.1, M.HEAVY), bh = M.lerp(580, 274, bs);
    M.vis(bk, t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    snap(bk, (bs >= 1 ? 274 : bh.toFixed(1)) + 'px', 'height');
    snap($('#bookIn'), (bs >= 1 ? 0 : ((bh - 274) / 2).toFixed(1)) + 'px', 'top');
    M.vis($('#bookS'), t, t1954, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, t1954 + 0.25 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#bookL'), t, t1954 + 0.1, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, tThe - 0.05, { st: 0.05 }); M.rise($('#bk2'), t, tMgmt - 0.05, { st: 0.06 });
    M.vis($('#idea'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    pop($('#id0'), t, tAgree - 0.1);
    M.vis($('#idA'), t, tJudge - 0.25, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    pop($('#id1'), t, tJudge - 0.1);
  }

  /* ===== G: the team sits down ===== */
  const gOn = t >= tG1 - 0.1 && t < tF0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tG1 + 0.1, tGout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tG2 + 0.2);
    M.vis($('#illImg'), t, tG1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    ['tgR', 'tgM', 'tgA', 'tgK'].forEach((id, i) => pop($('#' + id), t, tTeam - 0.2 + i * 0.12));
    M.vis($('#goal'), t, tG2 + 0.35, tGout, { dx: 60, dy: 0, ...o });
    M.rise($('#gT1'), t, tFiveG - 0.1, { st: 0.07, sp: M.HEAVY }); M.rise($('#gT2'), t, tMarch - 0.1, { st: 0.07, sp: M.HEAVY });
    M.vis($('#gBy'), t, tG2 + 0.7, 1e9, { dy: 8 });
    [[0, tRaviG], [1, tMeenaG]].forEach(([k, ta]) => { M.vis($('#gw' + k), t, tG2 + 0.75 + k * 0.1, 1e9, { dy: 14 }); $('#ga' + k).style.boxShadow = '0 0 0 4px ' + mix(C.dim, C.gold, M.io((t - ta) / 0.3)); });
    pop($('#gok'), t, tYes - 0.1);
  }

  /* ===== F: MBO in five steps ===== */
  const fOn = t >= tF0 - 0.1 && t < tB0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    const cas = $('#cas'); M.vis(cas, t, tF0 + 0.1, tFout, { dy: 36, ...o }); grow(cas, $('#casOut'), t, tF[3]);
    for (let i = 0; i < 3; i++) {
      const b = $('#cb' + i); M.vis(b, t, tF0 + 0.45 + i * 0.12, 1e9, { dy: 18 });
      const lit = t >= tF[i] - 0.05; b.querySelector('.cl').style.color = lit ? C.muted : C.dim;
      const ct = b.querySelector('.ct'); if (ct) ct.style.color = lit ? C.ink : C.dim;
    }
    M.vis($('#ca0'), t, tF[1] - 0.2, 1e9, { dy: -8, fade: 0.15 }); M.vis($('#ca1'), t, tF[2] - 0.2, 1e9, { dy: -8, fade: 0.15 });
    pop($('#hid'), t, tSugg + 0.4); pop($('#ch0'), t, tHelper - 0.05); pop($('#ch1'), t, tCupsW - 0.05);
    for (let i = 0; i < 3; i++) { const b = $('#cb' + i), act = t >= tF[i] && t < (i < 2 ? tF[i + 1] : tF[3]); b.style.boxShadow = act ? `inset 0 0 0 3px ${C.gold}` : 'none'; }
    $('#ci1').style.boxShadow = '0 0 0 3px ' + C.ink;
    const cst = $('#cst'), STX = [['list', 'MBO in five steps'], ['store', 'Step 1 · The business goal'], ['users', 'Step 2 · Personal goals, set together'], ['list', 'Step 3 · The action plan'], ['calendar', 'Step 4 · Review every Friday'], ['award', 'Step 5 · Appraise and reward']];
    const si = [tF0, ...tF].filter(x => t >= x).length - 1, [sic, stx] = STX[Math.max(0, si)];
    M.vis(cst, t, tF0 + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    setIco(cst.querySelector('.msi'), sic, si === 5 ? '#fff' : C.gold, 24, 2.4); M.setT(cst.querySelector('.mtx'), stx);
    const cbg = si === 5 ? C.gold : C.paper; if (cst._bg !== cbg) { cst._bg = cbg; cst.style.background = cbg; cst.style.color = si === 5 ? '#fff' : C.ink; }
    // review chart
    M.vis($('#rev'), t, tF[3] + 0.12, tFout, { dx: 60, dy: 0, ...o });
    M.vis($('#revS'), t, tF[3] + 0.3, 1e9, { dy: 14 });
    const p = wk(t), n = Math.floor(p), fr = p - n, pts = [];
    for (let i = 1; i <= n; i++) pts.push([X(i), Y(VAL[i - 1])]);
    if (n < 12) pts.push([M.lerp(X(n), X(n + 1), fr), M.lerp(Y(VAL[n - 1]), Y(VAL[n]), fr)]);
    const d = t < tF[3] + 0.3 ? '' : 'M' + pts.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L');
    setA($('#rvLine'), 'd', d);
    for (let i = 0; i < 12; i++) M.hide($('#rvd' + i), t < tF[3] + 0.3 || i + 1 > p + 0.001);
    const hd = pts[pts.length - 1], rh = $('#rvHead'); M.hide(rh, t < tF[3] + 0.3); setA(rh, 'cx', hd[0].toFixed(1)); setA(rh, 'cy', hd[1].toFixed(1));
    pop($('#rv0'), t, tFix - 0.1, { out: tF[4] - 0.1, outDur: 0.2, osc: 0.9, ody: 0 }); pop($('#rv1'), t, tBonus - 0.1);
  }

  /* ===== B: why it works ===== */
  const pOn = t >= tB0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tB0 + 0.1, tBout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tB0 + 0.25, tBout, { dx: 60, dy: 0, ...o });
    PR.forEach(([ic], i) => { const el = $('#pr' + i); M.vis(el, t, tB0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); listRow(el, ic, t, tB[i], i < 3 ? tB[i + 1] : tBout + 1); });
    PP.forEach((_, k) => {
      const tin = k ? tB[k - 1] : tB0 + 0.5, tout = k < 4 ? tB[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      paneIn(pn, t, tin, tout);
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) { pop($('#v1a'), t, tin + 0.6); pop($('#v1b'), t, tCounts - 0.2); }
      else if (k === 2) {
        for (let i = 0; i < 3; i++) { const s = $('#sti' + i); M.vis(s, t, tin + 0.6 + i * 0.1, 1e9, { dy: 16 }); s.style.background = i === 2 ? mix(C.paper, C.gold, M.io((t - tHit) / 0.3)) : C.paper; s.querySelector('span').style.color = i === 2 && t > tHit + 0.15 ? '#fff' : C.ink; }
        pop($('#dav'), t, tChose - 0.1, { sc: 0.5 });
        const st = M.track(0, [[tWants, 1], [tHit, 2]], M.SOFT)(t), H = [40, 80, 120];
        const hh = st <= 1 ? M.lerp(H[0], H[1], st) : M.lerp(H[1], H[2], st - 1);
        const settled = Math.abs(st - Math.round(st)) < 1e-3;
        snap($('#dav'), (settled ? 39 + Math.round(st) * 170 : (39 + st * 170).toFixed(1)) + 'px', 'left');
        snap($('#dav'), (settled ? 176 - H[Math.round(st)] - 80 : (176 - hh - 80).toFixed(1)) + 'px', 'top');
      } else if (k === 3) {
        pop($('#v3a'), t, tin + 0.6, { sc: 0.5 }); M.vis($('#v3an'), t, tin + 0.7, 1e9, { dy: 10 });
        pop($('#v3b'), t, tin + 0.72, { sc: 0.5 }); M.vis($('#v3bn'), t, tin + 0.82, 1e9, { dy: 10 });
        M.draw($('#v3p'), t, tin + 0.9, 0.5, M.o3); pop($('#v3c'), t, tReal - 0.1);
      } else if (k === 4) { pop($('#v4a'), t, tResults - 0.1); pop($('#v4b'), t, tMood - 0.1); }
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
    M.vis($('#dotS'), t, tX5 + 0.3, 1e9, { dy: 12 });
    const ta = tSeventy, tb = Math.max(tSixty + 0.4, ta + 1.4); let gains = 0;
    for (let i = 0; i < 70; i++) {
      const ti0 = ta + i * (tb - ta) / 70, on = t >= ti0, loss = LOSS.includes(i);
      setA($('#dt' + i), 'fill', !on ? C.paper : (loss ? C.red : C.gold)); if (on && !loss) gains++;
    }
    M.vis($('#dotN'), t, ta, 1e9, { dy: 12 }); M.vis($('#dotL'), t, ta + 0.2, 1e9, { dy: 10 });
    const dn = $('#dotN'); const s0 = `${gains}`; if (dn._g !== s0) { dn._g = s0; dn.firstChild.textContent = s0 + ' '; }
    pop($('#dpill'), t, tBacked - 0.3); M.vis($('#dsrc'), t, tBacked + 0.1, 1e9, { dy: 8 });
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
