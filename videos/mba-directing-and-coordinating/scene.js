// MBA - Principles of Management, Ep 18: Directing and Coordinating
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', grey: '#D9D2C4' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  snow: ['m10 20-1.25-2.5L6 18', 'M10 4 8.75 6.5 6 6', 'm14 20 1.25-2.5L18 18', 'm14 4 1.25 2.5L18 6', 'm17 21-3-6h-4', 'm17 3-3 6 1.5 3', 'M2 12h6.5L10 9', 'm20 10-1.5 2 1.5 2', 'M22 12h-6.5L14 15', 'm4 10 1.5 2L4 14', 'm7 21 3-6-1.5-3', 'm7 3 3 6h4'],
  pause: ['M14 4h4v16h-4z', 'M6 4h4v16H6z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  flag: ['M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M13 5v2', 'M13 17v2', 'M13 11v2'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  hardhat: ['M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5', 'M14 6a6 6 0 0 1 6 6v3', 'M4 15v-3a6 6 0 0 1 6-6', 'M3 15h18a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z'],
  medical: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M12 8v8', 'M8 12h8'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFlat = wt('H2', 'flat');
const tCold = wt('C1', 'cold'), tStops = wt('C2', 'stops'), tClean = wt('C3', 'clean'), tNothing = wt('C3', 'nothing');
const tT = T0('T1'), tSt2 = wt('T1', 'The', 0), tTu = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tRavi = wt('D1', 'Ravi'), tOwner = wt('D1', 'owner'), tOnce = wt('D1', 'once'), tD2 = T0('D2'), tGuid = wt('D2', 'Guiding');
const tDp = [wt('D2', 'telling'), wt('D2', 'helping'), wt('D2', 'encouraging')], tD3 = T0('D3'), tMak = wt('D3', 'Making'), tCp = [wt('D3', 'everyone'), wt('D3', 'right')];
const tD4 = T0('D4'), tMoves = wt('D4', 'moves'), tOne = wt('D4', 'one'), tDout = T0('P0') - 0.32;
// P
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('M1') - 0.32;
const tWatch = wt('P1', 'Watching'), tHelp = wt('P1', 'helping'), tClear = wt('P2', 'Clear'), tEvery = wt('P2', 'everyone');
const tShow = wt('P3', 'Showing'), tExample = wt('P3', 'example'), tReason = wt('P4', 'reason'), tBest = wt('P4', 'best');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM4 = T0('M4'), tMout = T0('F1') - 0.32;
const tBrews = wt('M2', 'brews'), tKab = wt('M2', 'Kabir'), tCupsW = wt('M2', 'Cups'), tEight = wt('M3', 'eighteen');
const tGath = wt('M4', 'gathers'), tPay = wt('M4', 'Pay'), tTok = wt('M4', 'token'), tCalls = wt('M5', 'calls'), tExact = wt('M5', 'exactly'), tMoving = wt('M6', 'moving'), tFour = wt('M6', 'four');
const LA = tM2, LB = tEight + 0.3, RA = tCalls - 0.2, RB = tFour + 0.3;
// F
const tF1 = T0('F1'), tF2 = T0('F2'), tMary = wt('F2', 'Mary'), tNine = wt('F2', 'nineteen'), tTog = wt('F2', 'together'), tF3 = T0('F3'), tLect = wt('F3', 'lecture'), t1937 = wt('F3', '1937'), tFourP = wt('F3', 'four');
const tFp = [4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKx = [wt('K1', 'site'), wt('K2', 'Nurses'), wt('K3', 'store'), wt('K4', 'company'), wt('K5', 'plane')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'Faster'), wt('X2', 'waste'), wt('X2', 'calmer')], tXh = [wt('X3', 'micromanaging'), wt('X3', 'thinking'), wt('X4', 'harder')];
const tFour4 = wt('X5', 'Four'), tSix = wt('X5', 'six'), tTen = wt('X5', 'Ten'), tForty = wt('X5', 'forty'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Coordinate');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['supervision', 'communication', 'leadership', 'motivation'].map(w => wt('S2', w)), [wt('S3', 'right')], ['direct', 'early', 'reciprocal', 'continuous'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
$('#gar').innerHTML = Array.from({ length: 20 }, (_, i) => `<circle cx="${16 + i * 31}" cy="96" r="7" fill="${i % 2 ? '#E9B95C' : '#D99A2B'}"/>`).join('');
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const NQ = 10;
$('#qRow').innerHTML = Array.from({ length: NQ }, (_, i) => `<div class="qp" id="q${i}" style="left:${36 + i * 80}px"></div>`).join('');
$('#qPillI').innerHTML = M.icon('trendDown', 24, C.red, 2.4);
const BZ = [['asha', 'Asha', 'TEA', 'snow', 'Cups go cold'], ['kabir', 'Kabir', 'CASH', 'pause', 'Line stops'], [null, 'Helpers', 'CUPS', 'x', 'No clean cups']];
$('#bRow').innerHTML = BZ.map(([f, n, r, ic, tx], i) => `<div class="bz" id="bz${i}" style="left:${36 + i * 296}px">` +
  (f ? `<div class="av face" style="${FACE(f)}">${n[0]}</div>` : `<div class="av">${M.icon('users', 34, '#fff', 2.2)}</div>`) +
  `<div class="bn">${n}</div><div class="br">${r}</div><div class="bc" id="bc${i}">${M.icon(ic, 22, C.red, 2.4)}<span>${tx}</span></div></div>`).join('');
// D
wrap($('#ill'), 'illOut', 784, 580);
const DP = [['message', 'Tell'], ['hand', 'Help'], ['smile', 'Encourage']], CP = [['users', "Everyone's work"], ['clock', 'At the right time']];
DP.forEach(([ic, tx], i) => { $('#dp' + i).innerHTML = M.icon(ic, 28, C.gold, 2.2) + `<span>${tx}</span>`; });
CP.forEach(([ic, tx], i) => { $('#cp' + i).innerHTML = M.icon(ic, 28, C.gold, 2.2) + `<span>${tx}</span>`; });
$('#dirPI').innerHTML = M.icon('arrowR', 20, C.gold2, 2.6); $('#cooPI').innerHTML = M.icon('link', 20, C.gold2, 2.4);
// P: four parts of directing
const PR = [['eye', 'Supervision'], ['message', 'Communication'], ['flag', 'Leadership'], ['smile', 'Motivation']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const PV = [
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><path id="sv0" d="M80 36 H520" stroke="#C9BFAE" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none"/></svg>
   <div class="av face" id="s0a" style="left:0;top:0;${FACE('ravi')};box-shadow:0 0 0 4px #B8862F">R</div><div class="avn" id="s0an" style="left:-44px;top:92px">Ravi</div>
   <div class="av face" id="s0b" style="left:520px;top:0;${FACE('asha')}">A</div><div class="avn" id="s0bn" style="left:476px;top:92px">Asha</div>
   <div class="stp" id="s0p" style="top:4px">${M.icon('eye', 26, C.gold, 2.2)}Watches</div><div class="stp" id="s0q" style="top:4px;background:#B8862F;color:#fff">${M.icon('hand', 26, '#fff', 2.2)}Helps on the spot</div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="176" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round"><path id="cl0" d="M548 46 C 590 46 600 36 640 36"/><path id="cl1" d="M548 46 C 590 46 600 136 640 136"/></svg>
   <div class="av face" id="c0a" style="left:0;top:10px;${FACE('ravi')};box-shadow:0 0 0 4px #B8862F">R</div>
   <div class="stp" id="c0m" style="left:100px;top:14px;background:#14213D;color:#fff">${M.icon('message', 26, C.gold2, 2.2)}Pay first, take a token</div>
   <div class="av face" id="c0b" style="left:640px;top:0;${FACE('asha')}">A</div><div class="abs" id="c0bn" style="left:732px;top:18px;font:600 26px Poppins">Asha</div>
   <div class="av face" id="c0c" style="left:640px;top:100px;${FACE('kabir')}">K</div><div class="abs" id="c0cn" style="left:732px;top:118px;font:600 26px Poppins">Kabir</div>`,
  ['ravi', 'asha', 'kabir', null].map((f, i) => (f ? `<div class="av face" id="l0${i}" style="left:${i * 110}px;top:0;${FACE(f)}${i ? '' : ';box-shadow:0 0 0 4px #B8862F'}">${f[0].toUpperCase()}</div>` : `<div class="av" id="l0${i}" style="left:${i * 110}px;top:0">${M.icon('users', 32, '#fff', 2.2)}</div>`) +
    `<div class="avn" id="l0n${i}" style="left:${i * 110 - 44}px;top:92px">${['Ravi', 'Asha', 'Kabir', 'Helpers'][i]}</div>`).join('') +
   `<svg class="abs" id="l0A" style="left:428px;top:21px" width="70" height="30"><path d="M4 15 H58 M48 5 L60 15 L48 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="pp2" id="l0p" style="left:516px;top:8px;background:#B8862F;color:#fff">${M.icon('flag', 26, '#fff', 2.2)}Sets the example</div>`,
  `<div class="av face" id="m0a" style="left:0;top:8px;${FACE('kabir')}">K</div><div class="avn" id="m0an" style="left:-44px;top:96px">Kabir</div>` +
   [['heart', 'Praise'], ['award', 'Fair rewards'], ['users', 'A say in the plan']].map(([ic, tx], i) => `<div class="pp2" id="m0p${i}" style="top:16px">${M.icon(ic, 26, C.gold, 2.2)}${tx}</div>`).join('') +
   `<div class="pp2" id="m0b" style="left:120px;top:104px;background:#14213D;color:#fff">${M.icon('trendUp', 26, C.gold2, 2.2)}His best effort</div>`,
];
const PP = [['THE FIRST JOB', 'Directing', 'Guide people as they work', 'IN SHORT', null]].concat([
  ['PART 01 / 04', 'Supervision', 'Watch the work, help on the spot'], ['PART 02 / 04', 'Communication', 'Clear words, so everyone knows'],
  ['PART 03 / 04', 'Leadership', 'Show the way, set the example'], ['PART 04 / 04', 'Motivation', 'A reason to do their best']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('users', 34, C.gold, 2.2)}</i><span>Four parts, used every day</span></div>`}</div>`).join('');

/* M: the rush, without and with coordination. Plan coords inside a 688 x 250 svg. */
const BOX = { tea: [24, 34], cash: [289, 34], serve: [554, 34] };
const QS = k => [258 - (k % 11) * 21, 172 + Math.floor(k / 11) * 34];
const TRAY = i => [572 + (i % 4) * 24, 160 + Math.floor(i / 4) * 28];
const cupG = (id, col) => `<g id="${id}"><path d="M-8 -9 h16 l-3 18 h-10 z" fill="${col}" stroke="#3A4560" stroke-width="2" stroke-linejoin="round"/></g>`;
for (const k of ['L', 'R']) {
  const boxes = Object.entries(BOX).map(([n, [x, y]]) => {
    const inner = n === 'serve' ? `<g transform="translate(41 12)">${M.icon('cup', 28, C.ink, 2.2).replace('<svg', '<svg x="0" y="0"')}</g>`
      : `<clipPath id="bc${k}${n}"><circle cx="55" cy="32" r="20"/></clipPath><image href="${IMG}${n === 'tea' ? 'asha' : 'kabir'}-face.jpg" x="35" y="12" width="40" height="40" clip-path="url(#bc${k}${n})"/>`;
    return `<g id="b${k}${n}" transform="translate(${x} ${y})"><rect width="110" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>${inner}<text x="55" y="70" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${n.toUpperCase()}</text></g>`;
  }).join('');
  const label = k === 'L' ? 'WITHOUT COORDINATION' : 'WITH COORDINATION';
  $('#m' + k + 'In').innerHTML = `<div class="mav" style="${FACE('ravi')}"></div><div class="lbl mlb">${label}</div><div class="serif mrd" id="rd${k}">0 min</div>
    <svg class="mplan" id="plan${k}" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      <path id="lane${k}" d="M79 132 H609" fill="none" stroke="#C9BFAE" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
      ${k === 'R' ? `<path id="tlane" d="M344 20 H79" fill="none" stroke="#B8862F" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>` : ''}
      ${boxes}
      <g id="tray${k}">${Array.from({ length: 12 }, (_, i) => { const [x, y] = TRAY(i); return `<g transform="translate(${x} ${y})">${cupG(`tc${k}${i}`, '#E9D9B5')}</g>`; }).join('')}</g>
      <g id="qd${k}">${Array.from({ length: 22 }, (_, i) => { const [x, y] = QS(i); return `<circle id="qd${k}${i}" cx="${x}" cy="${y}" r="8" fill="#14213D"/>`; }).join('')}</g>
      <circle id="ex${k}" r="8" fill="#14213D"/>
      <g id="fc${k}">${cupG(`fcc${k}`, '#B8862F')}</g>
      ${k === 'R' ? `<g id="tk"><rect x="-13" y="-9" width="26" height="18" rx="5" fill="#B8862F"/><text x="0" y="5" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" fill="#fff">#</text></g>` : ''}
    </svg>
    <div class="mstat" id="sw${k}" style="left:48px">${M.icon('users', 24, C.ink, 2.2)}<span>Waiting</span><b class="v">6</b></div>
    <div class="mstat" id="sc${k}">${M.icon('snow', 24, C.ink, 2.2)}<span>Cold cups</span><b class="v">0</b></div>
    <div class="mst" id="ms${k}" style="top:470px"><span class="msi"></span><span class="mtx"></span></div>`;
}
let tk = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * Math.PI / 180; tk += `<line x1="${(140 + 78 * Math.sin(a)).toFixed(1)}" y1="${(170 - 78 * Math.cos(a)).toFixed(1)}" x2="${(140 + 70 * Math.sin(a)).toFixed(1)}" y2="${(170 - 70 * Math.cos(a)).toFixed(1)}" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round"/>`; }
$('#swTicks').innerHTML = tk;
wrap($('#mL'), 'mLOut', 784, 580);
// F: Follett
wrap($('#fol'), 'folIn', 616, 580); wrap($('#lec'), 'lecIn', 920, 274);
$('#fpillI').innerHTML = M.icon('users', 26, '#fff', 2.2);
const FPR = [['users', 'Direct contact'], ['calendar', 'Early stages'], ['link', 'Reciprocal'], ['repeat', 'Continuous']];
$('#fTiles').innerHTML = FPR.map(([ic, n], i) => `<div class="ft" id="ft${i}" style="left:${36 + i * 216}px"><div class="bg"></div><div class="fi"></div><div class="fn">${n}</div></div>`).join('');
const FEX = [['users', 'Asha and Kabir talk directly, not through Ravi'], ['calendar', 'The token plan is agreed before opening'], ['link', 'Faster cash means Asha must brew faster'], ['repeat', 'Ravi keeps checking the flow all day']];
$('#fEx').innerHTML = FEX.map(([ic, tx], i) => `<div class="fex" id="fx${i}">${M.icon(ic, 28, C.gold, 2.2)}<span>${tx}</span></div>`).join('');
// K
const KA = [
  ['eye', 'Supervision', 'Watch the work, help on the spot', 'Ravi spots cold cups and steps in', 'hardhat', 'A site supervisor checks safety gear daily'],
  ['message', 'Communication', 'Clear words, so everyone knows', 'Pay first, then take a token', 'medical', 'Nurses hand over notes at shift change'],
  ['flag', 'Leadership', 'Show the way, set the example', 'Ravi pours chai on the busiest night', 'store', 'The store manager works the counter too'],
  ['smile', 'Motivation', 'A reason to do their best', 'Ravi thanks Kabir in front of the team', 'award', 'Best performers praised in front of all'],
  ['link', 'Coordination', 'Make all the work fit together', 'Tokens link the cash box and the kettle', 'plane', 'Cleaning, fuel and bags done before take-off'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KPn = [['DIRECTING AND COORDINATING TODAY', 'Five ideas', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KPn.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO AN AIRPORT</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same ideas, any size of team</span></div>`) + `</div>`).join('');
// X
const XG = [['zap', 'Faster service'], ['trendDown', 'Less waste'], ['smile', 'A calmer team']];
const XH = [['eye', 'Micromanaging'], ['ban', 'People stop thinking'], ['network', 'Harder as teams grow']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
// network of links: 10 nodes, the first four sit at slots 0, 3, 5, 8
const NC = [190, 180], NR = 140, FIRST = [0, 3, 5, 8];
const ang = (i, n) => (-90 + i * 360 / n) * Math.PI / 180;
const PAIRS = []; for (let a = 0; a < 10; a++) for (let b = a + 1; b < 10; b++) PAIRS.push([a, b]);
const early = PAIRS.filter(([a, b]) => FIRST.includes(a) && FIRST.includes(b)), late = PAIRS.filter(p => !early.includes(p));
$('#netL').innerHTML = PAIRS.map((_, i) => `<line id="nl${i}" stroke="#C9BFAE" stroke-width="2"/>`).join('');
$('#netN').innerHTML = Array.from({ length: 10 }, (_, i) => `<circle id="nn${i}" r="16" fill="#14213D" stroke="#FFFFFF" stroke-width="4"/>`).join('');
$('#nformI').innerHTML = M.icon('network', 26, C.gold2, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Direct contact', 'Early stages', 'Continuous', 'Unity of command'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('calendar', 44, C.gold2, 2.4);
// recap
const ROWS = [['flag', 'Directing guides people', ['Supervise', 'Communicate', 'Lead', 'Motivate']], ['link', 'Coordinating fits the work together', ['Right time']], ['award', "Follett's four", ['Direct', 'Early', 'Reciprocal', 'Continuous']]];
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
const frac = x => x - Math.floor(x);

// one run of the rush at time t (k = 'L' without coordination, 'R' with it)
const runFlow = (k, t) => {
  const L = k === 'L', a = L ? LA : RA, b = L ? LB : RB, u = M.clamp((t - a) / (b - a)), on = t >= a;
  const q = L ? Math.round(6 + 12 * u) : Math.round(18 - 14 * u);
  const tray = L ? Math.min(12, Math.floor(13 * u)) : (on ? 1 : 0), cold = L ? Math.max(0, tray - 2) : 0;
  for (let i = 0; i < 22; i++) M.hide($('#qd' + k + i), i >= q);
  for (let i = 0; i < 12; i++) {
    const c = $('#tc' + k + i); M.hide(c, i >= tray);
    setA(c.firstChild, 'fill', i < cold ? C.redMid : C.gold2);
  }
  // a served customer walks off, a fresh cup travels to the counter
  const flowOn = on && t < b + (L ? 0.6 : 1.2), per = L ? 1.8 : 0.7, cper = L ? 0.8 : 0.7;
  const fe = frac((t - a) / per), ex = $('#ex' + k); M.hide(ex, !flowOn);
  if (flowOn) { setA(ex, 'cx', (300 + 230 * M.io(fe)).toFixed(1)); setA(ex, 'cy', '190'); ex.style.opacity = (1 - M.clamp((fe - 0.75) / 0.25)).toFixed(3); }
  const fc = frac((t - a - (L ? 0 : 0.35)) / cper), cg = $('#fc' + k); M.hide(cg, !flowOn || (!L && t < a + 0.35));
  if (flowOn) setA(cg, 'transform', `translate(${(79 + 530 * M.io(fc)).toFixed(1)} 132)`);
  if (!L) {
    const ft = frac((t - a) / 0.7), tg = $('#tk'); M.hide(tg, !flowOn);
    if (flowOn) setA(tg, 'transform', `translate(${(344 - 265 * M.io(ft)).toFixed(1)} 20)`);
  }
  M.setT($('#rd' + k), `${Math.round(10 * u)} min`);
  const sw = $('#sw' + k), sc = $('#sc' + k);
  M.setT(sw.querySelector('.v'), String(q)); M.setT(sc.querySelector('.v'), String(cold));
  const bad = L ? M.io((t - tCupsW) / 0.3) : 0, good = L ? 0 : M.io((t - tMoving) / 0.3);
  sw.style.background = L ? mix(C.paper, C.redBg, M.io((t - tEight + 0.2) / 0.3)) : mix(C.paper, C.gold3, good); sw.style.color = L && t > tEight ? C.red : C.ink;
  sc.style.background = L ? mix(C.paper, C.redBg, bad) : mix(C.paper, C.gold3, good); sc.style.color = L && bad > 0.5 ? C.red : C.ink;
  // step pill
  let ic, tx, st = 0;
  if (L) {
    if (t < tBrews) { ic = 'users'; tx = 'Festival rush'; }
    else if (t < tKab) { ic = 'flame'; tx = 'Asha brews nonstop'; }
    else if (t < tCupsW) { ic = 'pause'; tx = 'Kabir takes cash one by one'; }
    else if (t < tEight) { ic = 'snow'; tx = 'Cups wait, and go cold'; st = 1; }
    else { ic = 'timer'; tx = '18 waiting after 10 minutes'; st = 2; }
  } else {
    if (t < tPay) { ic = 'users'; tx = 'Team huddle before opening'; }
    else if (t < tCalls) { ic = 'ticket'; tx = 'Pay first, take a token'; }
    else if (t < tExact) { ic = 'message'; tx = 'Kabir calls out the tokens'; }
    else if (t < tMoving) { ic = 'flame'; tx = 'Asha brews exactly that many'; }
    else { ic = 'check'; tx = 'The queue keeps moving'; st = 3; }
  }
  const ms = $('#ms' + k), fg = st >= 2 ? '#fff' : (st === 1 ? C.red : C.ink), bg = st === 2 ? C.red : st === 3 ? C.gold : st === 1 ? C.redBg : C.paper;
  setIco(ms.querySelector('.msi'), ic, st >= 2 ? '#fff' : (st === 1 ? C.red : C.gold), 26, 2.4); M.setT(ms.querySelector('.mtx'), tx);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
  $('#rd' + k).style.color = L && t > tEight ? C.red : (!L && t > tMoving ? C.gold : C.ink);
  return { u, q };
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // festival tags: over the awning above each head, and the queue tag outside the picture
  [['tgR', 412], ['tgA', 532], ['tgK', 650]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; e.style.top = '118px'; });
  const tq = $('#tgQ'); tq.style.left = (76 - tq.offsetWidth) + 'px'; tq.style.top = '360px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#dp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  x = 36; for (let i = 0; i < 2; i++) { const p = $('#cp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const s0 = $('#s0p'), s1 = $('#s0q'); s0.style.left = (296 - s0.offsetWidth / 2) + 'px'; s1.style.left = (296 - s1.offsetWidth / 2) + 'px';
  x = 120; for (let i = 0; i < 3; i++) { const p = $('#m0p' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const cm = $('#c0m'), cw = cm.offsetWidth; $('#cl0').setAttribute('d', `M${100 + cw} 42 C ${100 + cw + 40} 42 ${600} 36 640 36`); $('#cl1').setAttribute('d', `M${100 + cw} 42 C ${100 + cw + 40} 42 ${600} 136 640 136`);
  $('#sc' + 'L').style.left = (48 + $('#swL').offsetWidth + 16) + 'px'; $('#scR').style.left = (48 + $('#swR').offsetWidth + 16) + 'px';
  const fn = $('#fname'); if (fn.offsetWidth > 560) fn.style.fontSize = Math.floor(48 * 560 / fn.scrollWidth) + 'px';
  const fp = $('#fpill'); fp.style.left = (308 - fp.offsetWidth / 2) + 'px';
  document.querySelectorAll('#fEx .fex').forEach(el => { if (el.scrollWidth > 848) el.style.fontSize = Math.floor(26 * 848 / el.scrollWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tM1 + 0.4, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: the festival rush ===== */
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
    for (let i = 0; i < NQ; i++) { const el = $('#q' + i); pop(el, t, tMorph + 0.5 + i * 0.1, { sc: 0.5 }); setIco(el, 'user', C.ink, 30, 2.2); }
    pop($('#qPill'), t, tMorph + 1.6);
    M.vis($('#bcard'), t, tMorph + 0.42, 1e9, { dy: 36 });
    [tCold, tStops, tClean].forEach((ta, i) => {
      M.vis($('#bz' + i), t, tMorph + 0.7 + i * 0.12, 1e9, { dy: 14 });
      pop($('#bc' + i), t, ta - 0.05);
      $('#bz' + i).querySelector('.av').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, M.io((t - tNothing - i * 0.08) / 0.3));
    });
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

  /* ===== D: two jobs ===== */
  const dOn = t >= tTu - 0.05 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tD1 + 0.05, tDout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tD2 + 0.15);
    M.vis($('#illImg'), t, tD1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    pop($('#tgR'), t, tRavi + 0.1); pop($('#tgA'), t, tOnce - 0.2); pop($('#tgK'), t, tOnce - 0.05);
    M.vis($('#tgQ'), t, tOwner, tD2, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#dir'), t, tD2 + 0.3, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#dirT'), t, tGuid - 0.05, { st: 0.06 });
    tDp.forEach((ta, i) => pop($('#dp' + i), t, ta - 0.05));
    M.vis($('#coo'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    M.rise($('#cooT'), t, tMak - 0.05, { st: 0.06 });
    tCp.forEach((ta, i) => pop($('#cp' + i), t, ta - 0.05));
    pop($('#dirP'), t, tMoves - 0.05); pop($('#cooP'), t, tOne - 0.05);
  }

  /* ===== P: four parts of directing ===== */
  const pOn = t >= tP0 - 0.1 && t < tM1 + 0.2; M.hide($('#sP'), !pOn);
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
        pop($('#s0a'), t, tin + 0.6, { sc: 0.5 }); M.vis($('#s0an'), t, tin + 0.7, 1e9, { dy: 10 });
        pop($('#s0b'), t, tin + 0.72, { sc: 0.5 }); M.vis($('#s0bn'), t, tin + 0.82, 1e9, { dy: 10 });
        M.draw($('#sv0'), t, tWatch - 0.1, 0.5, M.o3);
        pop($('#s0p'), t, tWatch, { out: tHelp - 0.1, outDur: 0.2, osc: 0.9, ody: 0 }); pop($('#s0q'), t, tHelp + 0.05);
        $('#s0b').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, M.io((t - tHelp) / 0.3));
      } else if (k === 2) {
        pop($('#c0a'), t, tin + 0.6, { sc: 0.5 });
        pop($('#c0m'), t, tClear - 0.05);
        M.draw($('#cl0'), t, tEvery - 0.15, 0.4, M.o3); M.draw($('#cl1'), t, tEvery - 0.05, 0.4, M.o3);
        [['c0b', 'c0bn'], ['c0c', 'c0cn']].forEach(([a, n], j) => { pop($('#' + a), t, tin + 0.8 + j * 0.1, { sc: 0.5 }); M.vis($('#' + n), t, tin + 0.9 + j * 0.1, 1e9, { dy: 10 }); $('#' + a).style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, M.io((t - tEvery - 0.2 - j * 0.1) / 0.3)); });
      } else if (k === 3) {
        for (let i = 0; i < 4; i++) { pop($('#l0' + i), t, tin + 0.6 + i * 0.1, { sc: 0.5 }); M.vis($('#l0n' + i), t, tin + 0.7 + i * 0.1, 1e9, { dy: 10 }); }
        M.vis($('#l0A'), t, tShow, 1e9, { dx: -12, dy: 0, fade: 0.15 });
        pop($('#l0p'), t, tExample - 0.1);
      } else if (k === 4) {
        pop($('#m0a'), t, tin + 0.6, { sc: 0.5 }); M.vis($('#m0an'), t, tin + 0.7, 1e9, { dy: 10 });
        for (let i = 0; i < 3; i++) pop($('#m0p' + i), t, tReason + i * 0.25);
        pop($('#m0b'), t, tBest - 0.1);
      }
    });
  }

  /* ===== M: the rush, without and with coordination ===== */
  const mOn = t >= tM1 - 0.1 && t < T0('F1') + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM4 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM4 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM4 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      Object.keys(BOX).forEach((nm, i) => { $('#b' + k + nm).style.opacity = M.clamp((t - base - 0.25 - i * 0.07) / 0.1); });
      M.vis($('#sw' + k), t, base + 0.35, 1e9, { dy: 10 }); M.vis($('#sc' + k), t, base + 0.42, 1e9, { dy: 10 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const r = runFlow(k, t);
      if (k === 'L') {
        M.vis($('#swv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
        M.drawU($('#swArc'), r.u); M.hide($('#swArc'), r.u < 0.005);
        $('#swHand').setAttribute('transform', `rotate(${(r.u * 360).toFixed(2)} 140 170)`);
        M.vis($('#rdW'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#rdW'), `${r.q} waiting`);
        $('#rdW').style.color = mix(C.ink, C.red, M.io((t - tEight + 0.2) / 0.3));
        M.vis($('#mwL'), t, tM1 + 0.65, 1e9, { dy: 8 });
      } else {
        M.draw($('#tlane'), t, tTok - 0.1, 0.6, M.o3);
        ['tea', 'cash', 'serve'].forEach((nm, i) => { const rc = $('#bR' + nm).querySelector('rect'), g = M.io((t - tGath - i * 0.1) / 0.3) * (1 - M.io((t - tPay) / 0.3)); setA(rc, 'stroke', mix(C.line, C.gold, g)); setA(rc, 'stroke-width', g > 0.5 ? '4' : '2'); });
      }
    }
  }

  /* ===== F: Mary Parker Follett ===== */
  const fOn = t >= tF1 - 0.1 && t < tK0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    const fol = $('#fol'); M.vis(fol, t, tF1 + 0.1, tFout, { dy: 36, ...o }); grow(fol, $('#folIn'), t, tF3 + 0.1, 616);
    M.vis($('#port'), t, tF1 + 0.3, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#fname'), t, tMary - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ftag'), t, tMary + 0.6, 1e9, { dy: 10 });
    pop($('#fpill'), t, tTog - 0.1);
    const lec = $('#lec'), bs = M.spring(t - tFp[0] + 0.1, M.HEAVY), bh = M.lerp(580, 274, bs);
    M.vis(lec, t, tLect - 0.1, tFout, { dx: 60, dy: 0, ...o });
    snap(lec, (bs >= 1 ? 274 : bh.toFixed(1)) + 'px', 'height');
    snap($('#lecIn'), (bs >= 1 ? 0 : ((bh - 274) / 2).toFixed(1)) + 'px', 'top');
    M.vis($('#bookS'), t, tLect + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tLect + 0.35 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#bookL'), t, t1937 - 0.1, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, tLect + 0.3, { st: 0.05 }); M.rise($('#bk2'), t, t1937 + 0.1, { st: 0.06 });
    M.vis($('#fp4'), t, tFp[0] + 0.05, tFout, { dy: 36, ...o });
    FPR.forEach(([ic], i) => {
      const el = $('#ft' + i), ta = tFp[i], td = i < 3 ? tFp[i + 1] : 1e9;
      M.vis(el, t, tFp[0] + 0.25 + i * 0.06, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.fn').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      setIco(el.querySelector('.fi'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 40, 2.2);
      M.vis($('#fx' + i), t, ta + 0.25, i < 3 ? td - 0.1 : 1e9, { dy: 14, outDur: 0.2, ody: -10 });
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tFour4 - 0.7);
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
    M.vis($('#xw'), t, tFour4 - 0.58, tXout, { dx: 60, dy: 0, ...o });
    // nodes: four first, then ten; the first four slide to their place in the ring of ten
    const s10 = M.spring(t - tTen + 0.05, M.SOFT), P = [];
    for (let i = 0; i < 10; i++) {
      const fi = FIRST.indexOf(i), n = $('#nn' + i);
      const a10 = ang(i, 10), p10 = [NC[0] + NR * Math.cos(a10), NC[1] + NR * Math.sin(a10)];
      let p = p10;
      if (fi >= 0) { const a4 = ang(fi, 4), p4 = [NC[0] + NR * Math.cos(a4), NC[1] + NR * Math.sin(a4)]; p = [M.lerp(p4[0], p10[0], s10), M.lerp(p4[1], p10[1], s10)]; }
      P[i] = p;
      const tin = fi >= 0 ? tFour4 - 0.1 + fi * 0.08 : tTen + 0.1 + i * 0.04;
      const sp = M.spring(t - tin, M.POP); M.hide(n, t < tin);
      setA(n, 'cx', p[0].toFixed(1)); setA(n, 'cy', p[1].toFixed(1)); setA(n, 'r', (16 * Math.min(1, Math.max(0, sp))).toFixed(2));
      setA(n, 'fill', fi >= 0 ? C.ink : C.gold);
    }
    let nl = 0;
    PAIRS.forEach(([a1, b1], i) => {
      const e = early.indexOf(PAIRS[i]), l = late.indexOf(PAIRS[i]);
      const tin = e >= 0 ? tSix - 0.4 + e * 0.07 : tTen + 0.5 + l * (Math.max(0.4, tForty - tTen - 0.4) / late.length);
      const ln = $('#nl' + i), vis = t >= tin; M.hide(ln, !vis); if (!vis) return; nl++;
      setA(ln, 'x1', P[a1][0].toFixed(1)); setA(ln, 'y1', P[a1][1].toFixed(1)); setA(ln, 'x2', P[b1][0].toFixed(1)); setA(ln, 'y2', P[b1][1].toFixed(1));
      ln.style.opacity = M.clamp((t - tin) / 0.15).toFixed(3);
    });
    M.vis($('#netS'), t, tFour4 - 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nsl0'), t, tFour4, 1e9, { dy: 8 }); M.vis($('#nst0'), t, tFour4, 1e9, { dy: 12 });
    M.vis($('#nsl1'), t, tSix - 0.3, 1e9, { dy: 8 }); M.vis($('#nst1'), t, tSix - 0.3, 1e9, { dy: 12 });
    M.setT($('#nst0'), t < tTen + 0.1 ? '4' : String(4 + Math.min(6, Math.max(0, Math.floor((t - tTen - 0.1) / 0.04) + 1))));
    M.setT($('#nst1'), String(nl));
    pop($('#nform'), t, tForty + 0.4);
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
