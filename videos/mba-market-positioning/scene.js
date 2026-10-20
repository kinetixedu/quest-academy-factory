// MBA - Marketing Management, Ep 11: Market Positioning (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', ld: '#A8713A', ldD: '#7E5428', goldD: '#D9C08C' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
});
Object.assign(M.IC, {
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  cake: ['M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8', 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1', 'M2 21h20', 'M7 8v3', 'M12 8v3', 'M17 8v3', 'M7 4h.01', 'M12 4h.01', 'M17 4h.01'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tC2 = T0('C2');
const tShW = [wt('H2', 'Biscuits'), wt('H2', 'sweets'), wt('H2', 'chips'), wt('H2', 'protein')], tLL = wt('C2', 'Laddoo');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tCrowd = wt('L1', 'crowded'), tThink = wt('L3', 'think');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tPos = wt('D2', 'position'), tHl = [wt('D2', 'place'), wt('D2', 'minds'), wt('D2', 'competing')], tRies = wt('D3', 'Ries'), tBook = wt('D3', 'book'), tYear = wt('D3', '1981');
const tSw = [wt('D4', 'idea'), wt('D4', 'own'), wt('D4', 'mind')];
// M: the map
const tM0 = T0('M0'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7');
const tAxX = wt('M1', 'Indulgent'), tAxY = wt('M1', 'easy'), tTop = wt('M5', 'top'), tNobody = wt('M5', 'Nobody'), tChance = wt('M6', 'chance'), tClaim = wt('M7', 'healthy');
const tSt = [wt('M1', 'lines'), tM2, tTop, wt('M7', 'clear')], tRiv = [wt('M2', 'biscuits'), wt('M3', 'mithai'), wt('M4', 'Protein')];
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'Own'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: the statement
const tP = [1, 2, 3].map(i => T0('P' + i)), tFill = [wt('P1', 'Busy'), wt('P2', 'Laddoo'), wt('P3', 'Made')], tPout = T0('R0') - 0.32;
// R: differences
const tR0 = T0('R0'), tR1 = T0('R1'), tR2 = T0('R2'), tR3 = T0('R3'), tRout = T0('K0') - 0.32;
const tTests = [wt('R1', 'matter'), wt('R1', 'different'), wt('R1', 'explain')];
const tBA = [wt('R2', 'Nobody'), wt('R2', 'every'), wt('R2', 'round', 1)], tBB = [wt('R3', 'care'), wt('R3', 'rivals'), wt('R3', 'line')];
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'airline'), wt('K3', 'bank'), wt('K4', 'bakery')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'choosing'), wt('X2', 'price')], tXh = [wt('X3', 'promise'), wt('X3', 'trust')];
const tCl = [wt('X6', 'Healthy'), wt('X6', 'cheap'), wt('X6', 'festive'), wt('X6', 'protein')], tNob = wt('X6', 'Nobody');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'mind')], [wt('S3', 'crowded'), wt('S3', 'empty')], [wt('S4', 'matters'), wt('S4', 'keep')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: the shelf
const SHF = [['Biscuits', C.ink], ['Mithai', C.ld], ['Chips', C.red], ['Protein bars', C.ink2], ['Laddoo Lab', C.gold]];
const pack = col => `<svg width="56" height="80"><rect x="2" y="6" width="52" height="72" rx="8" fill="${col}"/><rect x="0" y="0" width="56" height="14" rx="5" fill="${mix(col, '#000000', 0.25)}"/><circle cx="28" cy="46" r="11" fill="#FFFFFF" fill-opacity=".85"/></svg>`;
$('#shs').innerHTML = SHF.map(([n, col], i) => `<div class="sh" id="sh${i}" style="left:${36 + i * 173}px">${pack(col)}<div class="zt">${n}</div></div>`).join('');
const METH = [['clock', 'About 2 seconds'], ['users', 'Many choices'], ['help', 'One reason?']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon(ic, 24, C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L: rivals
const RIV = [['cookie', C.ink, 'Cream biscuits', 'Tasty, but full of sugar'], ['cake', C.ld, 'Sweet shop mithai', 'Rich, but made for festivals'], ['package', C.red, 'Chips', 'Fun, but not healthy'], ['dumbbell', C.ink2, 'Protein bars', 'Healthy, but made for adults']];
$('#wRows').innerHTML = RIV.map(([ic, col, n, d], i) => `<div class="w4" id="wr${i}" style="top:${84 + i * 100}px"><div class="bg"></div><div class="fi" style="background:${col}">${M.icon(ic, 28, '#fff', 2.2)}</div><div class="wn">${n}</div><div class="wd">${d}</div></div>`).join('');
$('#gapI').innerHTML = M.icon('help', 22, C.gold2, 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: the ladder in the mind
const LDR = [['Cream biscuits', 'A tasty treat'], ['Sweet shop mithai', 'For festivals'], ['Laddoo Lab', '?']];
$('#ldr').innerHTML = LDR.map(([a, b], i) => `<div class="ld3" id="ld${i}" style="top:${70 + i * 62}px"><div class="a">${a}</div><svg width="44" height="24" style="left:262px"><path d="M2 12 H34 M26 4 L35 12 L26 20" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="b" style="left:318px">${b}</div></div>`).join('');
const SWT = [['bulb', 'WHAT', 'One idea'], ['award', 'GOAL', 'Yours to own'], ['target', 'WHERE', 'In their mind']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the positioning map (688 x 380 svg, axes cross at 344, 190) */
const MP = [[170, 92, 'cookie', C.ink, 'Cream biscuits'], [170, 262, 'cake', C.ld, 'Sweet shop mithai'], [518, 262, 'dumbbell', C.ink2, 'Protein bars'], [518, 92, 'laddoo', C.gold, 'Laddoo Lab']];
const mk = ([x, y, ic, col, n], k) => `<g transform="translate(${x} ${y})"><g id="mk${k}"><circle r="28" fill="${col}" stroke="#FFFFFF" stroke-width="4"/><g transform="translate(-14 -14)">${M.icon(ic, 28, '#fff', 2.2)}</g><rect x="-82" y="36" width="164" height="30" rx="15" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><text x="0" y="57" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" fill="#14213D">${n}</text></g></g>`;
$('#map').innerHTML = `<rect width="688" height="380" rx="24" fill="#F5F1E8"/><rect id="qTR" x="344" y="0" width="344" height="190" fill="#F3EAD6"/><path d="M344 0 H664 Q688 0 688 24 V190 H344 Z" fill="none"/>
  <path id="axX" d="M24 190 H664" stroke="#14213D" stroke-width="3" stroke-linecap="round"/><path id="axY" d="M344 18 V362" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>
  <g id="lbX"><text x="30" y="178" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">INDULGENT</text><text x="658" y="178" text-anchor="end" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">HEALTHY</text></g>
  <g id="lbY"><text x="356" y="36" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">MADE FOR TIFFINS</text><text x="356" y="362" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">NOT FOR TIFFINS</text></g>
  <circle id="emR" cx="518" cy="92" r="42" fill="none" stroke="#B8862F" stroke-width="3" stroke-dasharray="7 7"/><text id="emT" x="518" y="160" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#B8862F">NOBODY HERE</text>` +
  MP.map(mk).join('');
const MPR = [['cookie', C.ink, 'Cream biscuits', 'Easy to pack, not very healthy'], ['cake', C.ld, 'Sweet shop mithai', 'Rich and festive, messy in a tiffin'], ['dumbbell', C.ink2, 'Protein bars', 'Healthy, but made for adults'], ['laddoo', C.gold, 'Laddoo Lab', 'Healthy, and made for tiffins']];
$('#mpRows').innerHTML = MPR.map(([ic, col, n, d], i) => `<div class="w4" id="mp${i}" style="top:${84 + i * 104}px"><div class="bg"></div><div class="fi" style="background:${col}">${M.icon(ic, 28, '#fff', 2.2)}</div><div class="wn">${n}</div><div class="wd">${d}</div>${i === 3 ? `<div class="tg" id="mpT" style="background:#fff;color:#B8862F"></div>` : ''}</div>`).join('');

// P: the positioning statement
const PS = [['TO', 'THE TARGET AND THEIR NEED', 'Busy parents who want a healthy tiffin snack'], ['OUR BRAND IS', 'THE BIG IDEA', 'Laddoo Lab, <span class="acc">the healthy sweet for tiffin boxes</span>'], ['THAT', 'THE POINT OF DIFFERENCE', 'Made with ragi and jaggery, and no refined sugar']];
$('#psRows').innerHTML = PS.map(([c, l, f], i) => `<div class="ps3" id="ps${i}" style="top:${96 + i * 156}px"><div class="bg"></div><div class="ch">${c}</div><div class="sl">${l}</div><div class="fl" id="pf${i}">${f}</div></div>`).join('');

// R: two differences
const TST = ['Matters to buyers', 'Different from rivals', 'Easy to explain'], BA = [0, 0, 1], BB = [1, 1, 1];
for (const [k, res] of [['A', BA], ['B', BB]]) $('#c' + k + 'rows').innerHTML = TST.map((tx, i) => `<div class="cr" id="cr${k}${i}" style="top:${196 + i * 84}px"><div class="bg"></div><div class="rt">${tx}</div><div class="bd" id="bd${k}${i}" style="background:${res[i] ? C.gold : C.red}">${M.icon(res[i] ? 'check' : 'x', 24, '#fff', 3)}</div></div>`).join('');
$('#cAi').innerHTML = M.icon('laddoo', 40, C.dim, 2.2); $('#cBi').innerHTML = M.icon('leaf', 40, C.gold, 2.2);
$('#vdAI').innerHTML = M.icon('x', 22, C.red, 2.8); $('#vdBI').innerHTML = M.icon('check', 22, '#fff', 3);

// K: at work today
const KA = [
  ['leaf', 'Attribute', 'What it has', 'Ragi and jaggery, no refined sugar', 'phone', 'A phone maker builds its position on the camera'],
  ['zap', 'Benefit', 'What it does for you', 'Healthy energy for the school day', 'plane', 'An airline promises the lowest fares'],
  ['users', 'User', 'Who it is for', 'Made for busy parents', 'bank', 'A bank offers an account just for students'],
  ['clock', 'Occasion', 'When you use it', 'Tiffin time, every school day', 'store', 'A bakery known for fresh bread every morning'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['POSITIONING TODAY', 'Four angles', 'Ways to own a place in the mind', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A PHONE MAKER TO A BAKERY</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Every strong brand owns one idea</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['check', 'Easy to choose'], ['award', 'Above price fights']];
const XH = [['alert', 'A promise to keep'], ['ban', 'Broken trust']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#vdXI').innerHTML = M.icon('x', 22, '#fff', 3);
$('#bothI').innerHTML = M.icon('target', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Segmentation', 'Targeting', 'Positioning', 'Research'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('target', 44, C.gold2, 2.2);
// recap
const ROWS = [['target', "A place in the buyer's mind", ['One idea']], ['grid', 'The positioning map', ['Crowded spots', 'Empty spots']], ['check', 'One difference, one promise', ['It matters', 'Keep it']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

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
const pill = (k, ic, tx, tm, bad, fin) => {
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};

const PST = [['Draw two lines', 'plus'], ['Place the rivals', 'users'], ['Find the empty spot', 'search'], ['Claim it', 'target']];
const runP = t => {
  let k = 0; for (let i = 0; i < 4; i++) if (t >= tSt[i] - 0.05) k = i + 1;
  M.draw($('#axX'), t, tAxX - 0.1, 0.6, M.o3); M.draw($('#axY'), t, tAxY - 0.1, 0.6, M.o3);
  { const u = M.clamp((t - tAxX + 0.05) / 0.2); $('#lbX').style.opacity = u.toFixed(3); const v = M.clamp((t - tAxY + 0.05) / 0.2); $('#lbY').style.opacity = v.toFixed(3); }
  for (let r = 0; r < 3; r++) M.vis($('#mk' + r), t, tRiv[r] - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
  { const u = M.io((t - tTop) / 0.35); $('#qTR').style.opacity = u.toFixed(3); M.hide($('#qTR'), u <= 0); }
  { const u = M.clamp((t - tNobody + 0.05) / 0.2) * (1 - M.clamp((t - tClaim) / 0.2)); $('#emT').style.opacity = u.toFixed(3); M.hide($('#emT'), u <= 0.001);
    const r = M.clamp((t - tTop - 0.2) / 0.2); $('#emR').style.opacity = r.toFixed(3); M.hide($('#emR'), r <= 0); }
  M.vis($('#mk3'), t, tClaim - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
  if (t >= tClaim) pill('L', 'check', 'The healthy sweet for tiffin boxes', '', 0, 1);
  else if (k) pill('L', PST[k - 1][1], `0${k}  ${PST[k - 1][0]}`, '', 0, 0);
  else pill('L', 'x', 'A crowded shelf', '', 1, 0);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tz = $('#tgZ'); tz.style.left = (68 - tz.offsetWidth) + 'px'; $('#tgN').style.left = '716px';
  { const gp = $('#gapP'); gp.style.left = (392 - gp.offsetWidth / 2) + 'px'; }
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  { const b = $('#rtB'); if (b.offsetWidth > 584) b.style.fontSize = Math.floor(24 * 584 / b.offsetWidth) + 'px'; const n = $('#rtN'); if (n.offsetWidth > 584) n.style.fontSize = Math.floor(34 * 584 / n.offsetWidth) + 'px'; }
  document.querySelectorAll('.ps3 .fl').forEach(el => { if (el.offsetWidth > 1072) el.style.fontSize = Math.floor(38 * 1072 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);

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
  M.hide($('#exChip'), true);

  /* ===== A: a shelf full of snacks ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#shelf'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 5; i++) {
      const el = $('#sh' + i); M.vis(el, t, tMorph + 0.5 + i * 0.08, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const ta = i < 4 ? Math.max(tShW[i], tMorph + 0.6) : tLL, on = M.io((t - ta) / 0.2) * (i < 4 ? 1 - M.io((t - (i < 3 ? Math.max(tShW[i + 1], tMorph + 0.6) : tC2)) / 0.25) : 1);
      el.style.background = mix(C.paper, i < 4 ? C.paper2 : C.gold3, on); el.style.boxShadow = i === 4 && on > 0.5 ? '0 0 0 3px #B8862F' : 'none';
    }
    M.vis($('#ask'), t, tC2 - 0.1, tAout, { dy: 36, ...o });
    const tm = [wt('C2', 'two') - 0.4, wt('C2', 'two'), wt('C2', 'decide')];
    for (let i = 0; i < 3; i++) M.vis($('#mt' + i), t, tm[i] - 0.05 + (i === 0 ? 0 : 0.2 * i), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, wt('C2', 'decide') + 0.2, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the crowded shelf ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tCrowd);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, wt('L1', 'Arjun') - 0.05, tCrowd - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, wt('L1', 'shop') - 0.05, tCrowd - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#who'), t, tCrowd + 0.12, tLout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 4; i++) {
      const el = $('#wr' + i), ta = tCrowd + 0.45 + i * 0.4; M.vis(el, t, ta, 1e9, { dx: 24, dy: 0 });
      el.querySelector('.bg').style.background = mix(C.paper, C.redBg, M.io((t - wt('L2', 'same') - i * 0.1) / 0.25) * (1 - M.io((t - tL3) / 0.3)));
    }
    M.vis($('#gapP'), t, tThink - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is positioning ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#dq2'), t, wt('D1', 'market') - 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tPos);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'say') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tPos + 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tPos + 0.3 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - [tHl[0], tHl[0], tHl[0], tHl[1], tHl[2]][i] + 0.6) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tPos + 0.12, tDout, { dx: 60, dy: 0, ...o });
    LDR.forEach((_, i) => { const el = $('#ld' + i); M.vis(el, t, tHl[1] - 0.1 + i * 0.25, 1e9, { dx: 20, dy: 0 }); if (i === 2) el.style.background = mix(C.paper, C.gold3, M.io((t - tHl[2]) / 0.3)); });
    M.vis($('#sw'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#swA'), t, null, tD4 - 0.1, { outDur: 0.25, ody: -12 });
    M.vis($('#bkS'), t, tD3 + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    M.rise($('#rtN'), t, tRies - 0.25, { st: 0.06, sp: M.HEAVY });
    M.vis($('#rtB'), t, tBook - 0.05, 1e9, { dy: 10 }); M.vis($('#rtY'), t, tYear - 0.1, 1e9, { dy: 10 });
    M.vis($('#swB'), t, tD4 + 0.1, 1e9, { dy: 16 });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tD4 + 0.25 + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: the positioning map ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM0 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM0 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const root = $('#mLIn'), base = tM0 + 0.3;
    M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
    M.vis($('#map'), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#msL'), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runP(t);
    const tR = [tRiv[0] + 0.3, tRiv[1] + 0.3, tRiv[2] + 0.3, tNobody];
    MPR.forEach((_, i) => {
      const el = $('#mp' + i); M.vis(el, t, tM0 + 0.7 + i * 0.1, 1e9, { dy: 14 });
      if (i < 3) { const on = M.io((t - tR[i] + 0.05) / 0.25); el.style.opacity = (0.35 + 0.65 * on).toFixed(3); el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on * (1 - M.io((t - (i < 2 ? tR[i + 1] : tTop)) / 0.25))); }
      else el.style.opacity = t < tR[3] ? '0.35' : '';
      if (i === 3) { const c = t >= tClaim; el.querySelector('.bg').style.background = c ? C.gold3 : C.paper; el.querySelector('.wd').style.color = c ? C.ink : C.dim; el.querySelector('.wn').style.color = c ? C.ink : C.dim;
        M.setT($('#mpT'), c ? 'OUR POSITION' : 'EMPTY SPOT'); $('#mpT').style.background = c ? C.gold : '#fff'; $('#mpT').style.color = c ? '#fff' : C.gold; }
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

  /* ===== P: the positioning statement ===== */
  const pOn = t >= tTu - 0.05 && t < tR0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#psC'), t, tP0 + 0.1, tPout, { dy: 36, outDur: 0.3, ody: -16 });
    PS.forEach((_, i) => {
      const el = $('#ps' + i); M.vis(el, t, tP0 + 0.4 + i * 0.12, 1e9, { dy: 14 });
      const on = M.io((t - tP[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tP[i + 1]) / 0.25) : 0));
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
      el.querySelector('.ch').style.background = mix(C.ink, C.gold, on);
      M.rise($('#pf' + i), t, tFill[i] - 0.05, { st: 0.05, sp: M.HEAVY });
    });
  }

  /* ===== R: a difference worth shouting about ===== */
  const rOn = t >= tR0 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#cA'), t, tR0 + 0.1, tRout, { dx: -60, dy: 0, ...o });
    M.vis($('#cB'), t, tR0 + 0.25, tRout, { dx: 60, dy: 0, ...o });
    M.rise($('#cAt'), t, tR0 + 0.4, { st: 0.06, sp: M.HEAVY }); M.rise($('#cBt'), t, tR0 + 0.55, { st: 0.06, sp: M.HEAVY });
    M.vis($('#cAi'), t, tR0 + 0.5, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#cBi'), t, tR0 + 0.65, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    for (const [k, tb] of [['A', tBA], ['B', tBB]]) for (let i = 0; i < 3; i++) {
      const r = $('#cr' + k + i); M.vis(r, t, tTests[i] - 0.1, 1e9, { dy: 12 });
      const act = M.io((t - tb[i]) / 0.2) * (1 - M.io((t - tb[i] - 0.9) / 0.3));
      r.querySelector('.bg').style.background = mix(C.paper, (k === 'A' && !BA[i]) ? C.redBg : C.gold3, act);
      M.vis($('#bd' + k + i), t, tb[i], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#vdA'), t, tBA[2] + 0.35, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#vdB'), t, tBB[2] + 0.35, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== K: at work today ===== */
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, wt('X4', 'Dev') - 0.05, 1e9, { dx: 24, dy: 0 });
    M.vis($('#xr1'), t, wt('X5', 'Nani') - 0.05, 1e9, { dx: 24, dy: 0 });
    const nb = t > wt('X5', 'no'); $('#bb0').style.background = nb ? C.redBg : C.paper; $('#bb0').style.color = nb ? C.red : C.ink;
    $('#bb1').style.background = mix(C.paper, C.gold3, M.io((t - wt('X5', 'healthy')) / 0.3));
    M.vis($('#claims'), t, tX6 - 0.05, 1e9, { dy: 16 });
    for (let i = 0; i < 4; i++) M.vis($('#cl' + i), t, tCl[i] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#vdX'), t, tNob - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + 0.3 + i * 0.08, 1e9, { dy: 40 });
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
