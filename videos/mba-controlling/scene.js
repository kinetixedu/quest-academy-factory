// MBA - Principles of Management, Ep 19: Controlling
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', grey: '#D9D2C4' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  filter: ['M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2l8 5H4z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFive = wt('H2', 'five'), tWork = wt('H2', 'working');
const tC1 = T0('C1'), tFull = wt('C1', 'full'), tHalf = wt('C1', 'half'), tC2 = T0('C2'), tOneW = wt('C2', 'one'), tFiveW = wt('C2', 'five'), tC3 = T0('C3'), tCounted = wt('C3', 'counted');
const tT = T0('T1'), tSt2 = wt('T1', 'is'), tTu = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tKab = wt('D2', 'Kabir'), tCash = wt('D2', 'cash'), tLedger = wt('D2', 'ledger'), tD3 = T0('D3'), tChecking = wt('D3', 'checking'), tMatches = wt('D3', 'matches');
const tD4 = T0('D4'), tFx = [wt('D4', 'not'), wt('D4', 'why'), wt('D4', 'fixing')], tDout = T0('F0') - 0.32;
// F
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6].map(i => T0('F' + i)), tFout = T0('W1') - 0.32;
const tTarget = wt('F1', 'target'), tCounts = wt('F2', 'counts'), tShort = wt('F3', 'short'), tFour = wt('F3', 'four'), tStove = wt('F4', 'stove'), tSecond = wt('F5', 'second'), tClimb = wt('F5', 'climb'), tAgain = wt('F6', 'again');
// W
const tW1 = T0('W1'), tTog = wt('W1', 'together'), tPlanW = wt('W2', 'Planning'), tCtrlW = wt('W2', 'Controlling'), tTwins = wt('W3', 'twins'), tWout = T0('B0') - 0.32;
// B
const tB0 = T0('B0'), tB = [1, 2, 3].map(i => T0('B' + i)), tBw = [wt('B1', 'feedforward'), wt('B2', 'concurrent'), wt('B3', 'feedback')], tBout = T0('E1') - 0.32;
// E
const tE1 = T0('E1'), tE2 = T0('E2'), tE3 = T0('E3'), tBig = wt('E2', 'big'), tTay = wt('E3', 'Taylor'), t1903 = wt('E3', '1903'), tExcP = wt('E3', 'exception'), tEout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKx = [wt('K1', 'delivery'), wt('K2', 'factory'), wt('K3', 'manager'), wt('K4', 'pilots'), wt('K5', 'bank')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'caught'), wt('X2', 'wasted'), wt('X2', 'target')], tXh = [wt('X3', 'watched'), wt('X3', 'trust'), wt('X4', 'chasing')];
const tCountsX = wt('X5', 'counts'), tHalfX = wt('X5', 'half'), tSell = wt('X5', 'sell'), tGood = wt('X6', 'Goodhart'), t1975 = wt('X6', '1975'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'fixes')], ['standard', 'measure', 'compare', 'cause', 'correct'].map(w => wt('S3', w)), ['before', 'during', 'after', 'exceptions'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#qAskI').innerHTML = M.icon('help', 26, C.gold2, 2.2);
// cup fill levels
const LV = [1, 0.5, 0.95, 0.4, 1];
$('#fillS').innerHTML = LV.map((lv, i) => `<g id="fl${i}" transform="translate(${8 + i * 44} 20)"><clipPath id="fcl${i}"><path d="M0 0 h32 l-4 60 h-24 z"/></clipPath>
  <rect id="flr${i}" x="0" y="${60 - 60 * lv}" width="32" height="${60 * lv}" fill="${lv < 0.6 ? '#D98F7B' : '#B8862F'}" clip-path="url(#fcl${i})"/>
  <path d="M0 0 h32 l-4 60 h-24 z" fill="none" stroke="${lv < 0.6 ? '#B5482F' : '#3A4560'}" stroke-width="3" stroke-linejoin="round"/></g>`).join('');
// D
wrap($('#ill'), 'illOut', 784, 580);
const FX = [['search', 'Spot the gap'], ['help', 'Find out why'], ['wrench', 'Fix it']];
FX.forEach(([ic, tx], i) => { $('#fx' + i).innerHTML = M.icon(ic, 28, C.gold, 2.2) + `<span>${tx}</span>`; });
// F: the loop
const LC = [344, 236], LR = 200;
const STEPS = [['target', 'STANDARD', 'Set the standard'], ['gauge', 'MEASURE', 'Measure the work'], ['scale', 'COMPARE', 'Compare'], ['search', 'CAUSE', 'Find the cause'], ['wrench', 'CORRECT', 'Correct it']];
const NP = STEPS.map((_, i) => { const a = (-90 + 72 * i) * Math.PI / 180; return [LC[0] + LR * Math.cos(a), LC[1] + LR * Math.sin(a)]; });
$('#lpG').innerHTML = `<circle cx="${LC[0]}" cy="${LC[1]}" r="${LR}" fill="none" stroke="#EEE8DB" stroke-width="10"/>
  <circle id="lpArc" cx="${LC[0]}" cy="${LC[1]}" r="${LR}" fill="none" stroke="#B8862F" stroke-width="10" stroke-linecap="round" transform="rotate(-90 ${LC[0]} ${LC[1]})"/>` +
  STEPS.map(([ic, l], i) => `<g id="nd${i}" transform="translate(${NP[i][0].toFixed(1)} ${NP[i][1].toFixed(1)})"><circle class="ndc" r="40" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/><g class="ndi" transform="translate(-16 -16)"></g>
    <text x="${[56, 54, 0, 0, -54][i]}" y="${[6, 6, 64, 64, 6][i]}" text-anchor="${['start', 'start', 'middle', 'middle', 'end'][i]}" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="#8A8274">0${i + 1} ${l}</text></g>`).join('') +
  `<circle id="lpTok" r="12" fill="#B8862F" stroke="#FFFFFF" stroke-width="4"/>`;
// F: the chart (0..600 cups -> 300 px), 7 days
const Y = v => 320 - v * 0.5, BX = i => 80 + i * 86.8 + 15;
const VA = [390, 410, 400, 395, 405, 400, 390], VB = [495, 505, 500, 500, 505, 500, 500];
$('#chG').innerHTML = `<line x1="80" y1="320" x2="688" y2="320" stroke="#14213D" stroke-width="3"/>` +
  [0, 250, 500].map(v => `<text x="64" y="${Y(v) + 6}" text-anchor="end" font-family="Poppins" font-weight="600" font-size="16" fill="#8A8274">${v}</text>`).join('') +
  `<g id="tgtG"><line x1="80" y1="${Y(500)}" x2="688" y2="${Y(500)}" stroke="#B8862F" stroke-width="3" stroke-dasharray="10 8"/><text x="688" y="${Y(500) - 12}" text-anchor="end" font-family="Poppins" font-weight="700" font-size="16" letter-spacing="2" fill="#B8862F">TARGET 500</text></g>` +
  VA.map((_, i) => `<rect id="bar${i}" x="${BX(i).toFixed(1)}" y="320" width="56" height="0" rx="8" fill="#14213D"/>`).join('') +
  ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => `<text x="${(BX(i) + 28).toFixed(1)}" y="350" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${d}</text>`).join('') +
  `<g id="gapG"><text x="384" y="${Y(450) + 7}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#B5482F">100 cups short</text></g>
   <g id="okG"><text x="384" y="${Y(500) - 12}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#B8862F">ON TARGET</text></g>`;
const CP = [['flame', 'Cause: one stove at the morning rush'], ['wrench', 'Fix: a second stove'], ['repeat', 'Then check again, every month']];
CP.forEach(([ic, tx], i) => { $('#cp' + i).innerHTML = M.icon(ic, 24, i ? '#fff' : C.red, 2.4) + `<span>${tx}</span>`; });
$('#cp0').style.background = C.redBg; $('#cp0').style.color = C.red;
// W
$('#tw0i').innerHTML = M.icon('target', 44, C.gold, 2.2); $('#tw1i').innerHTML = M.icon('gauge', 44, C.gold, 2.2);
$('#tw0p').innerHTML = M.icon('target', 26, C.gold, 2.2) + '<span>Target: 500 cups a day</span>';
$('#tw1p').innerHTML = M.icon('scale', 26, C.gold, 2.2) + '<span>Actual: 400. The gap: 100</span>';
$('#twLink').innerHTML = M.icon('link', 44, '#fff', 2.4); $('#twinI').innerHTML = M.icon('link', 44, C.gold, 2.4);
// B: three moments
const BM = [['meena', 'BEFORE THE WORK', 'Feedforward', 'Check the inputs', 'milk', 'Meena checks the milk is fresh'],
  ['asha', 'DURING THE WORK', 'Concurrent', 'Check as it happens', 'flame', 'Asha tastes the chai as it boils'],
  ['kabir', 'AFTER THE WORK', 'Feedback', 'Check the results', 'clipboard', "Kabir counts the day's sales"]];
$('#tmG').innerHTML = `<line x1="40" y1="45" x2="1464" y2="45" stroke="#EEE8DB" stroke-width="8" stroke-linecap="round"/><line id="tmLine" x1="40" y1="45" x2="1464" y2="45" stroke="#B8862F" stroke-width="8" stroke-linecap="round"/>` +
  BM.map((_, i) => `<g id="tmd${i}" transform="translate(${(240 + i * 512)} 45)"><circle r="20" fill="#FFFFFF" stroke="#E2DACB" stroke-width="4"/><text y="7" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="#8A8274">${i + 1}</text></g>`).join('') +
  `<g id="tmCup"><circle r="30" fill="#14213D"/><g transform="translate(-14 -14)">${M.icon('cup', 28, '#E9D9B5', 2.2).replace('<svg', '<svg x="0" y="0"')}</g></g>`;
$('#tmCols').innerHTML = BM.map(([f, l, t, s, ic, e], i) => `<div class="tmc" id="tc${i}" style="left:${48 + i * 512}px"><div class="av face" style="${FACE(f)}">${f[0].toUpperCase()}</div>
  <div class="tl" style="color:${C.gold}">${l}</div><div class="serif tt">${t}</div><div class="ts">${s}</div><div class="te"><i>${M.icon(ic, 32, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
// E: exception filter
const NI = 12, BIGI = [3, 9];
const SRCP = i => [40, 30 + i * 26];
const TEAMP = k => [520 + (k % 5) * 30, 268 + Math.floor(k / 5) * 26];
const RAVIP = k => [540 + k * 36, 96];
$('#exG').innerHTML = `<rect x="16" y="10" width="48" height="320" rx="16" fill="#F5F1E8"/>
  <line x1="300" y1="10" x2="300" y2="330" stroke="#C9BFAE" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round"/>
  <text x="300" y="356" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">IS IT A BIG GAP?</text>
  <rect x="496" y="236" width="176" height="98" rx="18" fill="#F5F1E8"/><text x="584" y="228" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">THE TEAM FIXES</text>
  <rect x="496" y="40" width="176" height="110" rx="18" fill="#F6E3DC"/>
  <clipPath id="rvc"><circle cx="530" cy="20" r="0"/></clipPath>
  <text x="584" y="172" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#B5482F">REACHES RAVI</text>` +
  Array.from({ length: NI }, (_, i) => { const b = BIGI.includes(i); return `<circle id="it${i}" r="${b ? 14 : 9}" fill="${b ? '#B5482F' : '#14213D'}"/>`; }).join('') +
  `<clipPath id="rfc"><circle cx="0" cy="0" r="26"/></clipPath><g id="rvF" transform="translate(632 96)"><circle r="30" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#rfc)"/></g>`;
wrap($('#exc'), 'excOut', 784, 580);
$('#en0').innerHTML = `${M.icon('users', 24, C.gold, 2.2)}<span>Fixed by the team</span><b>0</b>`;
$('#en1').innerHTML = `${M.icon('arrowU', 24, C.red, 2.4)}<span>Reach Ravi</span><b style="color:#B5482F">0</b>`;
$('#tpillI').innerHTML = M.icon('filter', 26, '#fff', 2.2);
// K
const KA = [
  ['target', 'Standards', 'Set a clear target first', '500 cups a day at outlet 2', 'truck', 'Every order tracked against a promised time'],
  ['gauge', 'Measuring', 'Count the real work', 'Kabir counts cups every evening', 'gear', 'Faulty parts counted every shift'],
  ['scale', 'Comparing', 'Put the plan next to the actual', '400 sold against 500 planned', 'chart', 'Monthly budget next to real spending'],
  ['clipboard', 'Feedforward', 'Check before the work starts', 'Meena checks the milk first', 'plane', 'Pilots run a checklist before every flight'],
  ['filter', 'Exception', 'Only the big gaps go up', 'Small slips fixed by the team', 'bank', 'A bank flags only unusual payments'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KPn = [['CONTROLLING TODAY', 'Five ideas', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KPn.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO AN AIRLINE</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same loop, any size of business</span></div>`) + `</div>`).join('');
// X
const XG = [['search', 'Problems caught early'], ['trendDown', 'Less waste'], ['target', 'A clear target']];
const XH = [['eye', 'Feels like being watched'], ['ban', 'Trust drops'], ['gauge', 'Chasing the number']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
$('#gcup').innerHTML = Array.from({ length: 10 }, (_, i) => `<g transform="translate(${i * 68} 6)"><clipPath id="gcl${i}"><path d="M0 0 h36 l-4 54 h-28 z"/></clipPath><rect id="gcr${i}" x="0" y="0" width="36" height="54" fill="#B8862F" clip-path="url(#gcl${i})"/><path id="gco${i}" d="M0 0 h36 l-4 54 h-28 z" fill="none" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/></g>`).join('');
$('#gpillI').innerHTML = M.icon('award', 24, C.gold2, 2.4);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Feedforward', 'Concurrent', 'Feedback', 'Exception'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('flame', 44, C.gold2, 2.4);
// recap
const ROWS = [['check', 'Check the work against the plan', ['Fix the gap']], ['repeat', 'Five steps', ['Standard', 'Measure', 'Compare', 'Cause', 'Correct']], ['clock', 'Three moments', ['Before', 'During', 'After', 'Big exceptions']]];
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
const pop = (el, t, a, o = {}) => M.vis(el, t, a, o.out ?? 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...o });
const ringPos = s => { const a = (-90 + 72 * s) * Math.PI / 180; return [LC[0] + LR * Math.cos(a), LC[1] + LR * Math.sin(a)]; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  ['tgK', 'tgC'].forEach((id, i) => { const e = $('#' + id); e.style.left = (76 - e.offsetWidth) + 'px'; e.style.top = (i ? 380 : 200) + 'px'; });
  $('#tgL').style.left = '708px'; $('#tgL').style.top = '420px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#fx' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  $('#en1').style.left = (48 + $('#en0').offsetWidth + 16) + 'px';
  const tp = $('#tpill'); tp.style.left = (392 - tp.offsetWidth / 2) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);
// loop position: token sits on step s; steps land on F1..F5, then a full lap on F6
const lapT = M.track(0, [[tF[1], 1], [tF[2], 2], [tF[3], 3], [tF[4], 4], [tAgain - 0.4, 5]], M.SOFT);

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
  const exOn = t < tTu ? [tMorph + 0.5, tT - 0.3] : t < tWout + 1 ? [tF0 + 0.3, tWout] : [tX4 + 0.2, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: is the plan working? ===== */
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
    M.rise($('#planBig'), t, tFive - 0.1, { st: 0.07, sp: M.HEAVY }); M.rise($('#planSub'), t, tFive + 0.4, { st: 0.04 });
    pop($('#qAsk'), t, tWork - 0.1);
    M.vis($('#ncard'), t, tMorph + 0.42, 1e9, { dy: 36 });
    for (let i = 0; i < 3; i++) M.vis($('#nc' + i), t, tMorph + 0.6 + i * 0.08, 1e9, { dy: 14 });
    LV.forEach((lv, i) => {
      const ta = lv < 0.6 ? tHalf + (i === 3 ? 0.15 : 0) : tFull - 0.2 + i * 0.08, g = $('#fl' + i); M.hide(g, t < tC1);
      const u = M.o3((t - ta) / 0.5), r = $('#flr' + i); setA(r, 'y', (60 - 60 * lv * u).toFixed(1)); setA(r, 'height', (60 * lv * u).toFixed(1));
      g.style.opacity = M.clamp((t - tC1) / 0.2).toFixed(3);
    });
    pop($('#wc0'), t, tOneW - 0.05); pop($('#wc1'), t, tFiveW - 0.05);
    M.vis($('#cnt0'), t, tCounted - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what controlling is ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const ill = $('#ill'); M.vis(ill, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tD3 + 0.15);
    M.vis($('#illImg'), t, tD2 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    [['tgK', tKab], ['tgC', tCash], ['tgL', tLedger]].forEach(([id, ta]) => M.vis($('#' + id), t, ta - 0.05, tD3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 }));
    M.vis($('#def'), t, tD3 + 0.3, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#df1'), t, tChecking - 0.05, { st: 0.05 }); M.rise($('#df2'), t, tMatches - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#fix'), t, tD4 - 0.1, tDout, { dy: 36, ...o });
    tFx.forEach((ta, i) => pop($('#fx' + i), t, ta - 0.05));
    M.rise($('#fxT'), t, tFx[2] + 0.5, { st: 0.05 });
  }

  /* ===== F: the loop + the chart ===== */
  const fOn = t >= tF0 - 0.1 && t < tW1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#loop'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#chart'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    const s = lapT(t), cur = Math.min(4, Math.max(0, Math.round(s) % 5)), lapDone = t > tAgain;
    STEPS.forEach(([ic], i) => {
      const g = $('#nd' + i), ta = tF[i]; g.style.opacity = M.clamp((t - tF0 - 0.4 - i * 0.07) / 0.15).toFixed(3);
      const on = M.io((t - ta) / 0.3), c = g.querySelector('.ndc');
      setA(c, 'fill', mix('#FFFFFF', C.ink, on)); setA(c, 'stroke', t >= ta && cur === i ? C.gold : (on > 0.5 ? C.ink : C.line)); setA(c, 'stroke-width', t >= ta && cur === i ? '6' : '3');
      const gi = g.querySelector('.ndi'), col = on > 0.5 ? C.gold2 : (t > tF0 + 0.5 ? C.ink : C.dim), k = ic + col;
      if (gi._k !== k) { gi._k = k; gi.innerHTML = M.icon(ic, 32, col, 2.2).replace('<svg', '<svg x="0" y="0"'); }
    });
    M.drawU($('#lpArc'), M.clamp(s / 5)); M.hide($('#lpArc'), s < 0.01);
    const p = ringPos(s), tok = $('#lpTok'); M.hide(tok, t < tF[0]); setA(tok, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
    const stI = t < tF[0] ? -1 : (t < tF[5] ? Math.min(4, [1, 2, 3, 4].filter(k => t >= tF[k]).length) : 5);
    M.vis($('#lpN'), t, tF[0], 1e9, { dy: 8 }); M.vis($('#lpT'), t, tF[0] + 0.05, 1e9, { dy: 10 });
    M.setT($('#lpN'), stI === 5 ? 'THEN AGAIN' : `STEP ${Math.max(1, stI + 1)} OF 5`);
    M.setT($('#lpT'), stI === 5 ? 'Every month' : STEPS[Math.max(0, stI)][2]);
    // chart
    M.vis($('#chS'), t, tF0 + 0.45, 1e9, { dy: 16 });
    M.vis($('#tgtG'), t, tTarget - 0.1, 1e9, { dy: 0, fade: 0.25 });
    VA.forEach((va, i) => {
      const u1 = M.o5((t - tCounts - i * 0.12) / 0.6), u2 = M.o5((t - tClimb + 0.3 - i * 0.1) / 0.6);
      const v = va * u1 + (VB[i] - va) * u2, b = $('#bar' + i);
      setA(b, 'y', Y(v).toFixed(1)); setA(b, 'height', (v * 0.5).toFixed(1)); setA(b, 'fill', mix(C.ink, C.gold, u2));
    });
    M.vis($('#gapG'), t, tShort - 0.1, tSecond, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#okG'), t, tClimb + 0.6, 1e9, { dy: 0, fade: 0.2 });
    pop($('#cp0'), t, tStove - 0.2, { out: tSecond - 0.15, outDur: 0.2, osc: 0.9, ody: 0 });
    pop($('#cp1'), t, tSecond, { out: tAgain - 0.15, outDur: 0.2, osc: 0.9, ody: 0 });
    pop($('#cp2'), t, tAgain);
  }

  /* ===== W: the twins ===== */
  const wOn = t >= tW1 - 0.1 && t < tB0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#tw0'), t, tW1 + 0.1, tWout, { dx: -60, dy: 0, ...o }); M.vis($('#tw1'), t, tW1 + 0.25, tWout, { dx: 60, dy: 0, ...o });
    M.vis($('#twLink'), t, tTog - 0.05, tWout, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, ...o });
    pop($('#tw0p'), t, tPlanW); pop($('#tw1p'), t, tCtrlW);
    M.vis($('#twin'), t, tTwins - 0.2, tWout, { dy: 40, ...o });
  }

  /* ===== B: three moments ===== */
  const bOn = t >= tB0 - 0.1 && t < tE1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#tm'), t, tB0 + 0.1, tBout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#tmS'), t, tB0 + 0.35, 1e9, { dy: 12 });
    const pos = M.track(0, [[tB[1], 1], [tB[2], 2]], M.SOFT)(t), cx = 240 + pos * 512;
    setA($('#tmCup'), 'transform', `translate(${cx.toFixed(1)} 45)`); M.hide($('#tmCup'), t < tB[0] - 0.1);
    $('#tmCup').style.opacity = M.clamp((t - tB[0] + 0.1) / 0.2).toFixed(3);
    setA($('#tmLine'), 'x2', (t < tB[0] ? 40 : cx).toFixed(1));
    for (let i = 0; i < 3; i++) {
      const d = $('#tmd' + i).querySelector('circle'), on = t >= tB[i];
      setA(d, 'fill', on ? C.gold : '#FFFFFF'); setA(d, 'stroke', on ? C.gold : C.line);
      $('#tmd' + i).querySelector('text').setAttribute('fill', on ? '#fff' : C.muted);
      const c = $('#tc' + i); M.vis(c, t, tB0 + 0.5 + i * 0.12, 1e9, { dy: 24 });
      M.vis(c.querySelector('.ts'), t, tB[i] + 0.2, 1e9, { dy: 10 });
      M.rise(c.querySelector('.tt'), t, tBw[i] - 0.1, { st: 0.06, sp: M.HEAVY });
      M.vis(c.querySelector('.te'), t, tB[i] + 0.7, 1e9, { dy: 14 });
      c.querySelector('.av').style.boxShadow = '0 0 0 4px ' + (t >= tB[i] ? C.gold : C.ink);
    }
  }

  /* ===== E: management by exception ===== */
  const eOn = t >= tE1 - 0.1 && t < tK0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ex = $('#exc'); M.vis(ex, t, tE1 + 0.1, tEout, { dy: 36, ...o }); grow(ex, $('#excOut'), t, tE3);
    M.vis($('#exS'), t, tE1 + 0.3, 1e9, { dy: 16 });
    const t0 = tE2 - 0.2, dt = (Math.max(tBig, t0 + 1.8) + 0.6 - t0) / NI;
    let nT = 0, nR = 0, kT = 0, kR = 0;
    for (let i = 0; i < NI; i++) {
      const it = $('#it' + i), big = BIGI.includes(i), ta = t0 + i * dt, u = M.spring(t - ta, M.SOFT);
      const dst = big ? RAVIP(kR++) : TEAMP(kT++), src = SRCP(i);
      const p = t < ta ? src : [M.lerp(src[0], dst[0], u), M.lerp(src[1], dst[1], u) - Math.sin(Math.PI * M.clamp(u)) * 30];
      it.style.opacity = M.clamp((t - tE1 - 0.4 - i * 0.04) / 0.15).toFixed(3);
      setA(it, 'cx', p[0].toFixed(1)); setA(it, 'cy', p[1].toFixed(1));
      if (t >= ta + 0.5) { if (big) nR++; else nT++; }
    }
    $('#rvF').style.opacity = M.clamp((t - tE1 - 0.5) / 0.2).toFixed(3);
    M.setT($('#en0 b'), String(nT)); M.setT($('#en1 b'), String(nR));
    M.vis($('#en0'), t, tE2, 1e9, { dy: 12 }); M.vis($('#en1'), t, tE2 + 0.1, 1e9, { dy: 12 });
    M.vis($('#tay'), t, tE3 + 0.12, tEout, { dx: 60, dy: 0, ...o });
    M.vis($('#port'), t, tE3 + 0.3, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tTay - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, t1903 - 0.05, 1e9, { dy: 10 });
    pop($('#tpill'), t, tExcP - 0.1);
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
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
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    // the number goes up while the real goal goes down
    const up = M.o3((t - tSell + 0.2) / 0.7), dn = M.o3((t - tHalfX) / 0.7);
    [[0, 400 + 120 * up, `${Math.round(400 + 120 * up)} cups`, C.gold, 600], [1, 100 - 40 * dn, `${Math.round(100 - 40 * dn)}%`, mix(C.ink, C.red, dn), 100]].forEach(([k, v, lab, col, max], j) => {
      const el = $('#gb' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv'); M.vis(el, t, tX4 + 0.4 + j * 0.12, 1e9, { dy: 14 });
      const grow0 = M.o5((t - tCountsX + 0.3 - j * 0.15) / 0.7), w = 520 * (v / max) * grow0;
      bt.style.width = w.toFixed(1) + 'px'; bt.style.background = col; bv.style.left = (w + 18).toFixed(1) + 'px'; M.setT(bv, lab); bv.style.opacity = M.clamp(w / 40).toFixed(3);
    });
    M.vis($('#gcup'), t, tX5 + 0.2, 1e9, { dy: 12 });
    for (let i = 0; i < 10; i++) { const h = 54 * (1 - 0.5 * M.io((t - tHalfX - i * 0.06) / 0.3)); setA($('#gcr' + i), 'y', (54 - h).toFixed(1)); setA($('#gcr' + i), 'height', h.toFixed(1)); setA($('#gcr' + i), 'fill', h < 40 ? C.redMid : C.gold); }
    pop($('#gpill'), t, tGood - 0.1); M.vis($('#gsrc'), t, t1975 - 0.1, 1e9, { dy: 8 });
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
