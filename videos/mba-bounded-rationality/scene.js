// MBA - Principles of Management, Ep 24: Bounded Rationality
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  package: ['M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z', 'M12 22V12', 'm3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M5 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 'M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0'],
  brain: ['M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z', 'M12 5v13'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  pin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  pen: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  fence: ['M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z', 'M6 8h4', 'M6 18h4', 'm12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z', 'M14 8h4', 'M14 18h4', 'm20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFour = wt('H2', 'four'), tC1 = T0('C1'), tEvery = wt('C1', 'every'), tWhole = wt('C2', 'whole'), tYear = wt('C2', 'year'), tRented = wt('C3', 'rented');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tHerb = wt('D1', 'Herbert'), tAmer = wt('D1', 'American'), tReally = wt('D2', 'really'), tD3 = T0('D3'), t1947 = wt('D3', '1947'), tAdmin = wt('D3', 'Administrative');
const tD4 = T0('D4'), tNobel = wt('D4', 'Nobel'), tResearch = wt('D4', 'research'), tOrgs = wt('D4', 'decision'), tDout = T0('E1') - 0.32;
const tE1 = T0('E1'), tE2 = T0('E2'), tTry = wt('E2', 'try'), tLim = wt('E2', 'but'), tE3 = T0('E3'), tFence = wt('E3', 'fence'), tFree = wt('E3', 'freely'), tInside = wt('E3', 'but'), tEout = T0('B0') - 0.32;
const tB0 = T0('B0'), tB = [T0('B1'), T0('B2'), T0('B3')], tBw = [wt('B1', 'every'), wt('B2', 'days'), wt('B3', 'four')], tBout = T0('V0') - 0.32;
const tV0 = T0('V0'), tV1 = T0('V1'), tSat = wt('V1', 'satisfy'), tSuf = wt('V1', 'suffice'), tV2 = T0('V2'), tFirst = wt('V2', 'first'), tGoodV = wt('V2', 'good'), tPerf = wt('V2', 'perfect'), tVout = T0('G0') - 0.32;
const tG0 = T0('G0'), tG1 = T0('G1'), tMust = [wt('G2', 'people'), wt('G2', 'Rent'), wt('G2', 'chai')], tG3 = T0('G3'), tSmall = wt('G3', 'small'), tStreet = wt('G3', 'street');
const tG4 = T0('G4'), tG5 = T0('G5'), tG6 = T0('G6'), tSigns = wt('G7', 'signs'), tGout = T0('R1') - 0.32;
const MK = [[tG4 + 0.3, wt('G4', 'rent'), wt('G4', 'high') + 0.2], [tG5 + 0.3, wt('G5', 'cheap'), wt('G5', 'chai')], [wt('G6', 'passes'), wt('G6', 'all'), wt('G6', 'checks')]];
const tRes = [wt('G4', 'high') + 0.5, wt('G5', 'chai') + 0.4, wt('G6', 'checks') + 0.35];
const tR1 = T0('R1'), tR1w = [wt('R1', 'optimises'), wt('R1', 'every'), wt('R1', 'unlimited')], tR2 = T0('R2'), tR2w = [wt('R2', 'satisfices'), wt('R2', 'accepts'), wt('R2', 'good')], tRout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hiring'), wt('K2', 'shop'), wt('K3', 'restaurant'), wt('K4', 'team'), wt('K5', 'buyer')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'fast'), wt('X2', 'money'), wt('X2', 'real')], tXh = [wt('X3', 'better'), wt('X4', 'low'), wt('X4', 'poor')];
const tSmart = wt('X5', 'smart'), tStop = wt('X5', 'stop'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'limited')], [wt('S3', 'good')], [wt('S4', 'Nobel')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
let sg = ''; for (let i = 0; i < 120; i++) sg += `<div class="sd" id="sd${i}" style="left:${36 + (i % 40) * 21}px;top:${84 + Math.floor(i / 40) * 21}px"></div>`;
$('#sGrid').innerHTML = sg; $('#lateI').innerHTML = M.icon('clock', 22, C.red, 2.4);
// D
wrap($('#tay'), 'tayIn', 616, 580); wrap($('#book'), 'bookIn', 920, 274);
$('#fatherI').innerHTML = M.icon('search', 26, '#fff', 2.4); $('#nobI').innerHTML = M.icon('award', 60, C.gold, 2);
// E
$('#defI').innerHTML = M.icon('brain', 48, C.gold, 2.2);
let fp = ''; for (let x = 48; x <= 852; x += 67) fp += `<rect x="${x - 6}" y="74" width="12" height="170" rx="6" fill="#E9D9B5"/>`;
$('#fenS').innerHTML = `<defs><clipPath id="fkc"><circle cx="0" cy="0" r="26"/></clipPath></defs><g id="fPosts">${fp}</g><rect id="fRect" x="48" y="90" width="804" height="138" rx="20" fill="none" stroke="#B8862F" stroke-width="6"/>
  <path id="fTrail" d="" fill="none" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
  <g id="fTok"><circle r="32" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#fkc)"/></g>`;
// B: three bounds
const BR = [['eye', 'BOUND 01 · INCOMPLETE INFORMATION', 'Ravi cannot know every street'], ['clock', 'BOUND 02 · LIMITED TIME', 'A good shop is rented in days'], ['brain', 'BOUND 03 · LIMITED BRAIN POWER', 'Nobody compares 4,000 in their head']];
const BV = [
  Array.from({ length: 12 }, (_, i) => `<div class="bdot" id="bv0${i}" style="left:${i * 28}px"></div>`).join('') + `<div class="lbl" style="left:356px;top:7px">ONLY A FEW KNOWN</div>`,
  Array.from({ length: 7 }, (_, i) => `<div class="bday" id="bv1${i}" style="left:${i * 72}px;width:64px">DAY ${i + 1}</div>`).join(''),
  `<div class="bday" id="bv20" style="left:0;width:auto;padding:0 14px;background:#F6E3DC;color:#B5482F">4,000 OPTIONS</div><div class="bday" id="bv21" style="left:170px;width:auto;padding:0 14px;background:#14213D;color:#fff">A HEAD HOLDS A FEW</div>`,
];
$('#bRows').innerHTML = BR.map(([ic, l, tx], i) => `<div class="bw" id="bw${i}" style="top:${92 + i * 158}px"><div class="ri">${M.icon(ic, 30, C.gold, 2.2)}</div><div class="bl2">${l}</div><div class="bt">${tx}</div><div class="bv">${BV[i]}</div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580); wrap($('#vs'), 'vsIn', 784, 580);
// V
const SB = [51, 77, 111, 128, 94, 145, 68, 119], SBY = 540, TH = 100;
$('#sBars').innerHTML = SB.map((h, i) => `<div class="sb" id="sb${i}" style="left:${48 + i * 88}px;top:${SBY - h}px;height:${h}px"></div>`).join('') +
  `<div class="res" id="sbOk" style="left:${48 + 2 * 88 + 32 - 90}px;top:350px;width:180px;justify-content:center;padding:0;background:#B8862F;color:#fff">${M.icon('check', 20, '#fff', 3)}Good enough</div>`;
$('#sbS').innerHTML = `<line id="sbLine" x1="40" y1="${SBY - TH}" x2="744" y2="${SBY - TH}" stroke="#14213D" stroke-width="3" stroke-dasharray="8 8"/>`;
// G
const MH = [['users', 'Lots of people walking by'], ['coin', 'Rent under ₹50,000 a month'], ['store', 'No chai stall nearby']];
$('#mRows').innerHTML = MH.map(([ic, t], i) => `<div class="mh2" id="mh${i}" style="top:${92 + i * 80}px"><i>${M.icon(ic, 22, C.gold, 2.4)}</i><span>${t}</span></div>`).join('');
const ST = [[['Busy', 1], ['Rent ₹70,000', 0], ['No stall', 1]], [['Busy', 1], ['Rent ₹40,000', 1], ['Stall nearby', 0]], [['Busy', 1], ['Rent ₹45,000', 1], ['No stall', 1]]];
const RS = [['Rent too high', 0], ['Stall nearby', 0], ['Passes all 3', 1]];
const TX = i => 560 + i * 256;
$('#sTiles').innerHTML = ST.map((rows, i) => `<div class="st3" id="tl${i}" style="left:${TX(i)}px"><div class="sl">STREET ${i + 1}</div><div class="si">${M.icon('store', 28, C.gold, 2.2)}</div>` +
  rows.map(([t], k) => `<div class="ck" id="ck${i}${k}" style="top:${76 + k * 64}px"><b></b><span>${t}</span></div>`).join('') + `</div>` +
  `<div class="res" id="rs${i}" style="background:${RS[i][1] ? C.gold : C.redBg};color:${RS[i][1] ? '#fff' : C.red}">${RS[i][0]}</div>`).join('');
$('#signI').innerHTML = M.icon('pen', 20, C.gold2, 2.4);
$('#road').innerHTML = `<defs><clipPath id="rkc"><circle cx="0" cy="0" r="26"/></clipPath></defs><line x1="560" y1="500" x2="1552" y2="500" stroke="#E2DACB" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/>
  <line id="roadP" x1="676" y1="500" x2="676" y2="500" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/>
  <g id="rTok"><circle r="32" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#rkc)"/></g>`;
// R: two models
const CM = [['THE RATIONAL MODEL', 'Optimise', [['search', 'Every option known'], ['clock', 'Unlimited time'], ['trophy', 'The perfect choice']], 'STILL SEARCHING'],
  ['BOUNDED RATIONALITY', 'Satisfice', [['eye', 'Some options known'], ['calendar', 'Real deadlines'], ['check', 'Good enough']], 'STOPPED AT 3']];
$('#cms').innerHTML = CM.map(([l, t, rows, end], k) => `<div class="cm" id="cm${k}" style="left:${k ? 976 : 160}px"><div class="bg"></div><div class="abs" id="cmIn${k}" style="left:0;top:0;width:784px;height:580px"><div class="lbl" style="left:48px;top:40px">${l}</div><div class="serif ct2">${k ? `<span class="acc">${t}</span>` : t}</div>` +
  rows.map(([ic, r], i) => `<div class="cr" id="cr${k}${i}" style="top:${176 + i * 64}px">${M.icon(ic, 22, k ? C.gold : C.ink, 2.4)}<span>${r}</span></div>`).join('') +
  `<div class="hr"></div><div class="lbl" style="left:48px;top:396px">HOW FAR IT SEARCHES</div><div class="lbl" id="ce${k}" style="right:48px;top:396px;color:${k ? C.gold : C.red}">${end}</div>` +
  Array.from({ length: 120 }, (_, i) => `<div class="cdot" id="cd${k}${i}" style="left:${48 + (i % 30) * 22}px;top:${436 + Math.floor(i / 30) * 22}px"></div>`).join('') + `</div></div>`).join('');
// K
const KA = [
  ['clipboard', 'Must haves', 'Decide what good enough means', 'Busy, rent under ₹50,000, no stall', 'users', 'A hiring team lists must haves first'],
  ['pin', 'A small search area', 'Search near, not everywhere', 'One small area of the city', 'store', 'A shop owner looks for suppliers in one city'],
  ['zap', 'Rules of thumb', 'Quick shortcuts that work', 'Order what sold last week, plus a little', 'package', 'A restaurant orders last Friday\'s stock'],
  ['clock', 'A deadline', 'Decide with the facts you have', 'Sign within the week', 'calendar', 'A team agrees to decide by Friday'],
  ['check', 'Stop at good enough', 'The first option that passes', 'Street three passes, Ravi signs', 'truck', 'A buyer picks the first supplier that fits'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['SATISFICING TODAY', 'Five habits', 'How busy people decide well', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BIG FIRM</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Good enough, on purpose</span></div>`) + `</div>`).join('');
// X
const XG = [['zap', 'Fast'], ['coin', 'Saves money'], ['brain', 'Fits real people']];
const XH = [['search', 'A better one nearby?'], ['trendDown', 'Bar set too low'], ['x', 'Settle for poor']];
Object.assign(M.IC, { trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'] });
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
const XB = [70, 150, 60, 200, 120, 240, 90, 180], XBY = 440;
$('#xBars').innerHTML = XB.map((h, i) => `<div class="xb" id="xb${i}" style="left:${48 + i * 88 + 12}px;top:${XBY - h}px;height:${h}px"></div>`).join('');
$('#xbanI').innerHTML = M.icon('check', 24, C.gold2, 2.6);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Optimising', 'Satisficing', 'Delegating', 'Guessing'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('check', 44, C.gold2, 2.6);
// recap
const ROWS = [['brain', 'Limited facts, time and brain power', ['Bounds']], ['check', 'Satisfice: the first good enough', ['Good enough']], ['award', 'Herbert Simon, Nobel Prize 1978', ['Nobel']]];
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
const tokT = M.track(TX(0) + 116, [[tG5, TX(1) + 116, M.HEAVY], [tG6, TX(2) + 116, M.HEAVY]], M.HEAVY);
const thT = M.track(50, [[tSmart - 0.1, 170]], M.HEAVY);

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  if ($('#tname').offsetWidth > 560) $('#tname').style.fontSize = Math.floor(52 * 560 / $('#tname').offsetWidth) + 'px';
  ['#nl1', '#nl2'].forEach(s => { const el = $(s); if (el.offsetWidth > 664) el.style.fontSize = Math.floor(40 * 664 / el.offsetWidth) + 'px'; });
  ['#dl1', '#dl2'].forEach(s => { const el = $(s); if (el.offsetWidth > 1368) el.style.fontSize = Math.floor(52 * 1368 / el.offsetWidth) + 'px'; });
  const tr = $('#tgR'); tr.style.left = (84 - tr.offsetWidth) + 'px'; tr.style.top = '200px'; const tm = $('#tgM'); tm.style.left = '712px'; tm.style.top = '150px';
  const w0 = $('#w0'); w0.style.left = '48px'; $('#wpl').style.left = (48 + w0.offsetWidth + 20) + 'px'; $('#w1').style.left = (48 + w0.offsetWidth + 64) + 'px';
  ST.forEach((_, i) => { const r = $('#rs' + i); r.style.left = (TX(i) + 116 - r.offsetWidth / 2) + 'px'; });
  const sp = $('#signP'); sp.style.left = (1440 - sp.offsetWidth / 2) + 'px'; sp.style.top = '408px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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

  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tTu ? [tFour + 0.3, tT - 0.3] : [tG0 + 0.3, tGout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: four thousand streets ===== */
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
    for (let i = 0; i < 120; i++) {
      const el = $('#sd' + i); M.vis(el, t, tMorph + 0.5 + (i % 40) * 0.012 + Math.floor(i / 40) * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
      const chk = M.clamp((t - tEvery) / (tRented - tEvery)) * 120;
      el.style.background = i < chk ? C.gold : C.line;
    }
    M.rise($('#askT'), t, tFour - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#ask'), t, tC1 - 0.2, 1e9, { dy: 36 });
    const yu = M.clamp((t - tWhole + 0.3) / (tYear - tWhole + 0.9)); $('#yb i').style.width = (848 * M.io(yu)).toFixed(1) + 'px';
    M.vis($('#ylE'), t, tYear - 0.1, 1e9, { dy: 8 });
    pop($('#lateP'), t, tRented - 0.2);
  }

  /* ===== statement ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== D: Herbert Simon ===== */
  const dOn = t >= tTu - 0.05 && t < tE1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const tay = $('#tay'), sh = M.spring(t - tD3 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD1 + 0.05, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD1 + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tHerb - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tAmer - 0.05, 1e9, { dy: 10 });
    pop($('#father'), t, tReally - 0.1);
    const bk = $('#book'), bs = M.spring(t - tD4 + 0.1, M.HEAVY), bh = M.lerp(580, 274, bs);
    M.vis(bk, t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    snap(bk, (bs >= 1 ? 274 : bh.toFixed(1)) + 'px', 'height');
    snap($('#bookIn'), (bs >= 1 ? 0 : ((bh - 274) / 2).toFixed(1)) + 'px', 'top');
    M.vis($('#bookS'), t, t1947 - 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#bookL'), t, t1947, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, tAdmin - 0.05, { st: 0.05 }); M.rise($('#bk2'), t, tAdmin + 0.35, { st: 0.06 });
    M.vis($('#nob'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#nobI'), t, tNobel - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#nl1'), t, tResearch - 0.2, { st: 0.05 }); M.rise($('#nl2'), t, tOrgs - 0.05, { st: 0.06 });
  }

  /* ===== E: what it means ===== */
  const eOn = t >= tE1 - 0.05 && t < tB0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tE1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tE2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tE2 + 0.1, tEout, { dy: 36, ...o });
    pop($('#defI'), t, tE2 + 0.3);
    M.rise($('#dl1'), t, tTry - 0.1, { st: 0.06, sp: M.HEAVY });
    M.rise($('#dl2'), t, tLim - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#fen'), t, tE3 + 0.05, tEout, { dy: 36, ...o });
    M.draw($('#fRect'), t, tFence - 0.15, 0.8, M.o3);
    fade($('#fPosts'), M.clamp((t - tFence) / 0.4));
    const tok = $('#fTok'), on = M.clamp((t - tFree + 0.2) / 0.2); fade(tok, on);
    const ph = Math.max(0, t - tFree + 0.2), fx = (tt) => 450 + 300 * Math.sin(0.95 * tt), fy = (tt) => 159 + 26 * Math.sin(1.9 * tt);
    setA(tok, 'transform', `translate(${fx(ph).toFixed(1)} ${fy(ph).toFixed(1)})`);
    let d = ''; if (ph > 0.05) { for (let k = 0; k <= 30; k++) { const tt = Math.max(0, ph - 1.6) + (ph - Math.max(0, ph - 1.6)) * k / 30; d += (k ? ' L' : 'M') + fx(tt).toFixed(1) + ' ' + fy(tt).toFixed(1); } }
    setA($('#fTrail'), 'd', d);
    M.rise($('#ft1'), t, tFree - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#ft2'), t, tInside - 0.05, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== B: three bounds ===== */
  const bOn = t >= tB0 - 0.1 && t < tV0 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB0 + 0.05, tBout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tB[0]);
    M.vis($('#illImg'), t, tB0 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tB0 + 0.5, tB[0] - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgM'), t, tB0 + 0.8, tB[0] - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#bd'), t, tB[0] + 0.12, tBout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#bw' + i), t, tB[i] + 0.1, 1e9, { dx: 40, dy: 0 });
    for (let i = 0; i < 12; i++) { const d = $('#bv0' + i); pop(d, t, tB[0] + 0.5 + i * 0.04); d.style.background = i < 3 && t > tBw[0] + i * 0.1 ? C.gold : C.line; }
    for (let i = 0; i < 7; i++) { const d = $('#bv1' + i), a = tB[1] + 0.5 + i * 0.12; pop(d, t, a); const gone = i === 2 && t > tBw[1]; const past = i < 2 && t > tBw[1]; d.style.background = gone ? C.red : (past ? C.gold3 : C.paper2); d.style.color = gone ? '#fff' : C.muted; M.setT(d, gone ? 'GONE' : `DAY ${i + 1}`); }
    pop($('#bv20'), t, tBw[2] - 0.1); pop($('#bv21'), t, tBw[2] + 0.5);
  }

  /* ===== V: satisfice ===== */
  const vOn = t >= tV0 - 0.1 && t < tG0 + 0.2; M.hide($('#sV'), !vOn);
  if (vOn) {
    const o = { outDur: 0.3, ody: -16 };
    const vs = $('#vs'); M.vis(vs, t, tV0 + 0.05, tVout, { dy: 36, ...o }); grow(vs, $('#vsIn'), t, tSat - 0.55);
    M.vis($('#vsImg'), t, tV0 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    pop($('#tgS'), t, tV0 + 0.7); pop($('#tgK'), t, tV1 + 0.3);
    M.vis($('#eq'), t, tSat - 0.45, tVout, { dx: 60, dy: 0, ...o });
    pop($('#w0'), t, tSat - 0.05); M.vis($('#wpl'), t, tSuf - 0.25, 1e9, { dy: 0, fade: 0.15 }); pop($('#w1'), t, tSuf - 0.05);
    M.rise($('#wEq'), t, tSuf + 0.5, { st: 0.08, sp: M.HEAVY });
    M.vis($('#sbL'), t, tV2 - 0.1, 1e9, { dy: 8 });
    M.draw($('#sbLine'), t, tV2 + 0.1, 0.6, M.o3);
    const sc = [tFirst - 0.1, tFirst + 0.45, tGoodV];
    SB.forEach((h, i) => {
      const el = $('#sb' + i); M.vis(el, t, tV2 + i * 0.05, 1e9, { dy: 30, sp: M.SOFT });
      const chk = i < 3 && t > sc[i], dim = i > 2 && t > tPerf;
      el.style.background = chk ? (i === 2 ? C.gold : C.redMid) : (dim ? C.off : C.line);
    });
    pop($('#sbOk'), t, tGoodV + 0.15);
  }

  /* ===== G: the street search ===== */
  const gOn = t >= tG0 - 0.1 && t < tR1 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#srch'), t, tG0 + 0.05, tGout, { dy: 36, outDur: 0.3, ody: -16 });
    for (let i = 0; i < 3; i++) M.vis($('#mh' + i), t, tMust[i] - 0.1, 1e9, { dx: -30, dy: 0 });
    M.vis($('#scL'), t, tG1 + 0.4, 1e9, { dy: 8 }); M.vis($('#scN'), t, tG1 + 0.5, 1e9, { dy: 12 });
    M.vis($('#stL'), t, tG0 + 0.4, 1e9, { dy: 8 });
    for (let i = 0; i < 3; i++) {
      M.vis($('#tl' + i), t, tG0 + 0.5 + i * 0.12, 1e9, { dy: 24 });
      ST[i].forEach(([, ok], k) => {
        const el = $('#ck' + i + k), b = el.querySelector('b'), on = t >= MK[i][k];
        b.style.background = on ? (ok ? C.gold : C.red) : C.paper2;
        setIco(b, on ? (ok ? 'check' : 'x') : 'help', on ? '#fff' : C.dim, 18, 3);
        el.style.color = on && !ok ? C.red : C.ink;
      });
      pop($('#rs' + i), t, tRes[i]);
      const tile = $('#tl' + i), win = i === 2 ? M.io((t - tRes[2]) / 0.3) : 0, cur = (i === 0 && t > tG4 && t < tG5) || (i === 1 && t > tG5 && t < tG6) || (i === 2 && t > tG6);
      tile.style.background = mix(C.paper, C.gold3, win); tile.style.boxShadow = cur ? `0 0 0 3px ${i === 2 ? C.gold : C.ink}` : 'none';
    }
    M.vis($('#ghost'), t, tG0 + 0.9, 1e9, { dy: 24 });
    M.setT($('#scV'), String(tRes.filter(r => t >= r).length));
    const tok = $('#rTok'), tx = tokT(t), tp = M.spring(t - tStreet, M.POP);
    fade(tok, M.clamp((t - tStreet) / 0.12));
    setA(tok, 'transform', `translate(${tx.toFixed(1)} 500)` + (tp < 1 ? ` scale(${(0.5 + 0.5 * tp).toFixed(4)})` : ''));
    setA($('#roadP'), 'x2', tx.toFixed(1)); M.hide($('#roadP'), t < tStreet || tx < TX(0) + 117);
    pop($('#signP'), t, tSigns - 0.05);
  }

  /* ===== R: compare the two models ===== */
  const rOn = t >= tR1 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    const c0 = $('#cm0'); M.vis(c0, t, tR1 + 0.05, tRout, { dy: 36, ...o }); grow(c0, $('#cmIn0'), t, tR2);
    M.vis($('#cm1'), t, tR2 + 0.12, tRout, { dx: 60, dy: 0, ...o });
    for (let k = 0; k < 2; k++) {
      const ws = k ? tR2w : tR1w, t0 = k ? tR2 : tR1;
      M.rise($('#cm' + k + ' .ct2'), t, t0 + 0.2, { st: 0.06, sp: M.HEAVY });
      for (let i = 0; i < 3; i++) pop($('#cr' + k + i), t, ws[i] - 0.05);
      const scan = k ? Math.min(3, Math.floor(M.clamp((t - ws[1]) / 1.2) * 3 + (t > ws[1] ? 1 : 0))) : Math.floor(M.clamp((t - ws[1]) / 14) * 120);
      for (let i = 0; i < 120; i++) {
        const d = $('#cd' + k + i); M.vis(d, t, t0 + 0.6 + (i % 30) * 0.01, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
        d.style.background = i < scan ? (k ? (i === 2 ? C.gold : C.redMid) : C.ink2) : (k && t > ws[2] ? C.off : C.line);
      }
      M.vis($('#ce' + k), t, k ? ws[2] + 0.2 : tR2 - 0.4, 1e9, { dy: 8 });
    }
  }

  /* ===== K ===== */
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
    const th = thT(t), pick = XB.findIndex(h => h > th + 0.5), lowOn = t > tXh[1] - 0.1;
    XB.forEach((h, i) => {
      const el = $('#xb' + i); M.vis(el, t, tX4 + 0.3 + i * 0.05, 1e9, { dy: 30, sp: M.SOFT });
      el.style.background = lowOn && i === pick ? (th < 100 ? C.red : C.gold) : (lowOn && i < pick ? C.off : C.line);
    });
    const tl = $('#thL'); M.vis(tl, t, tXh[1] - 0.1, 1e9, { dy: 0, fade: 0.2 }); tl.style.top = (XBY - th - 2).toFixed(1) + 'px';
    const tp = $('#thP'); M.vis(tp, t, tXh[1], 1e9, { dy: 0, fade: 0.2 });
    M.setT(tp, th < 100 ? 'BAR: TOO LOW' : 'BAR: SMART'); tp.style.background = th < 100 ? C.red : C.gold;
    tp.style.top = '30px'; tp.style.left = (736 - tp.offsetWidth) + 'px';
    pop($('#xban'), t, tStop - 0.05);
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

  /* ===== recap ===== */
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

M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
