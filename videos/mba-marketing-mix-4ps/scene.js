// MBA - Marketing Management, Ep 12: STP Framework (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', crowd: '#CFC6B6' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  backpack: ['M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M8 10h8', 'M8 18h8', 'M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6', 'M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'],
  pie: ['M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z', 'M21.21 15.89A10 10 0 1 1 8 2.83'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  ear: ['M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0', 'M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tH = [wt('H2', 'Gym'), wt('H2', 'Office'), wt('H2', 'Parents')], tH3 = T0('H3'), tCant = wt('H3', "can't"), tWhom = wt('H3', 'whom');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4');
const tW = [wt('L2', 'school'), wt('L2', 'gyms'), wt('L2', 'offices')], tB = [wt('L3', 'Split'), wt('L3', 'Pick'), wt('L3', 'Stand')], tLtr = [wt('L4', 5), wt('L4', 6), wt('L4', 7)];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D: what is STP
const tD1 = T0('D1'), tD2 = T0('D2'), tD6 = T0('D6'), tD7 = T0('D7'), tDout = T0('M1') - 0.32;
const tTerm = [wt('D2', 'segmentation'), wt('D2', 'targeting'), wt('D2', 'positioning')], tMean = [T0('D3'), T0('D4'), T0('D5')];
const tQ0 = wt('D6', 'Whom'), tQ1 = wt('D6', 'how'), tWen = wt('D7', 'Wendell'), tRies = wt('D7', 'Ries');
// M: the STP flow
const tM1 = T0('M1'), tM3 = T0('M3'), tM5 = T0('M5'), tM6 = T0('M6'), tM8 = T0('M8');
const tStep = [wt('M2', 'segment'), wt('M4', 'target'), wt('M7', 'position')];
const tGrp = [wt('M3', 'Tiffin'), wt('M3', 'gym'), wt('M3', 'office')];
const tCrit = [wt('M4', 'big'), wt('M4', 'grow'), wt('M4', 'serve')], tWin = wt('M5', 'Parents'), tGymX = wt('M6', 'Gym'), tWait = wt('M6', 'wait');
const tHear = wt('M7', 'hear'), tBl = [wt('M8', 'healthy'), wt('M8', 'tiffin')], tCp = [wt('M8', 'customer'), wt('M8', 'promise')];
const tMout = T0('T1') - 0.32;
// statement + map
const tT = T0('T1'), tSt2 = wt('T1', 'and'), tP1 = T0('P1'), tTu = tP1 - 0.32;
const tDraw = wt('P1', 'Draw'), tMap = wt('P1', 'map'), tAx = [wt('P2', 'treat'), wt('P2', 'healthy'), wt('P2', 'messy'), wt('P2', 'tiffin')];
const tCo = [wt('P3', 'Chocolate'), wt('P3', 'Sweet'), wt('P4', 'Fruit')], tGap = wt('P5', 'empty'), tLL = wt('P5', 'Laddoo');
const tP6 = T0('P6'), tSv = [wt('P7', 'busy'), wt('P7', 'healthy'), wt('P7', 'millet'), wt('P7', 'refined')], tPout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'airline'), wt('K3', 'food'), wt('K4', 'phone')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'Focus'), wt('X2', 'message')], tXh = [wt('X3', 'small'), wt('X3', 'labels')];
const tArjX = wt('X4', 'Arjun'), tZoyX = wt('X5', 'Zoya'), tDes = wt('X5', 'design');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'similar')], [wt('S3', 'best')], [wt('S4', 'minds')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const tile = (id, x, ic, n, t, cls = '') => `<div class="sws ${cls}" id="${id}" style="left:${x}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`;
// A: three kinds of customers + one kitchen
const HT = [['dumbbell', 'GYM-GOERS', 'More protein'], ['briefcase', 'OFFICE WORKERS', 'A desk snack'], ['backpack', 'PARENTS', 'A tiffin sweet']];
$('#hRow').innerHTML = HT.map(([ic, n, t], i) => tile('ht' + i, 36 + i * 288, ic, n, t, 'w3')).join('');
const METH = [['check', 'One recipe', 0], ['check', 'One kitchen', 0], ['x', 'All three?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: where she asked + three steps
const WT = [['cap', 'SCHOOL GATES', 'Parents'], ['dumbbell', 'GYMS', 'Gym-goers'], ['briefcase', 'OFFICES', 'Office snackers']];
$('#wRow').innerHTML = WT.map(([ic, n, t], i) => tile('wt' + i, 36 + i * 243, ic, n, t)).join('');
const BT = [['pie', 'STEP 1', 'Split the market', 'S'], ['target', 'STEP 2', 'Pick one group', 'T'], ['pin', 'STEP 3', 'Stand out', 'P']];
$('#bRow').innerHTML = BT.map(([ic, n, t, l], i) => tile('bt' + i, 36 + i * 243, ic, n, t).replace(/<\/div>$/, `<div class="ltr" id="lt${i}">${l}</div></div>`)).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: three words
const DF = [['S', 'Segmentation', 'Groups of buyers with similar needs'], ['T', 'Targeting', 'Choose which group to serve'], ['P', 'Positioning', 'Own a clear place in their minds']];
$('#dRows').innerHTML = DF.map(([l, tt, m], i) => `<div class="df" id="df${i}" style="top:${96 + i * 144}px"><div class="bg"></div><div class="bd">${l}</div><div class="serif dt">${tt}</div><div class="dm">${m}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the STP flow. 60 people (EXAMPLE FIGURES): 25 tiffin parents, 20 gym-goers, 15 office snackers. */
const GN = [25, 20, 15], GC = [C.gold, C.ink, C.muted], CX = [115, 344, 573];
const GT = [['backpack', 'Tiffin parents', 'PARENTS'], ['dumbbell', 'Gym-goers', 'GYM-GOERS'], ['briefcase', 'Office snackers', 'OFFICE']];
const RATE = [[5, 4, 5], [4, 4, 2], [3, 3, 3]];
const rnd = M.rng(12);
const cells = Array.from({ length: 60 }, (_, i) => [34 + (i % 10) * 69 + (rnd() - 0.5) * 30, 36 + Math.floor(i / 10) * 59 + (rnd() - 0.5) * 26]);
const grpOf = []; GN.forEach((n, k) => { for (let j = 0; j < n; j++) grpOf.push(k); });
for (let i = grpOf.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [grpOf[i], grpOf[j]] = [grpOf[j], grpOf[i]]; }
const slot = []; { const c = [0, 0, 0]; grpOf.forEach((k, i) => { slot[i] = c[k]++; }); }
const DOT = cells.map(([x, y], i) => { const k = grpOf[i], j = slot[i]; return { x0: x, y0: y, k, j, x1: CX[k] - 64 + (j % 5) * 32, y1: 84 + Math.floor(j / 5) * 32 }; });
$('#dots').innerHTML = DOT.map((d, i) => `<circle id="dt${i}" cx="${d.x0.toFixed(1)}" cy="${d.y0.toFixed(1)}" r="11" fill="${C.crowd}"/>`).join('');
$('#colH').innerHTML = GT.map(([, , h], k) => `<text id="ch${k}" x="${CX[k]}" y="50" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="${GC[k]}">${h}</text>`).join('');
$('#colHi').innerHTML = `<rect id="hiR" x="${CX[0] - 104}" y="14" width="208" height="340" rx="20" fill="#F3EAD6" stroke="#B8862F" stroke-width="3"/>`;
$('#ourC').innerHTML = `<g transform="translate(${CX[0]} 310)"><g id="ourT"><rect x="-92" y="-24" width="184" height="48" rx="24" fill="#14213D"/><text x="0" y="7" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="20" fill="#FFFFFF">Our customer</text></g></g>`;
const SC = [['1', 'Segment'], ['2', 'Target'], ['3', 'Position']];
$('#sChips').innerHTML = SC.map(([n, t], i) => `<div class="sc" id="sc${i}"><b>${n}</b><span>${t}</span></div>` + (i < 2 ? `<svg class="sa" id="sa${i}" width="44" height="24"><path d="M4 12 H34 M26 4 L36 12 L26 20" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
$('#bigPI').innerHTML = M.icon('search', 24, C.gold, 2.4);
$('#tgPI').innerHTML = M.icon('target', 20, '#fff', 2.6);
$('#tRows').innerHTML = GT.map(([ic, n], k) => `<div class="tr" id="tr${k}" style="top:${136 + k * 116}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, GC[k], 2.2)}</div><div class="rt">${n}</div><div class="rc" id="rc${k}">0 PEOPLE</div>` +
  [0, 1, 2].map(c => `<div class="pp" style="left:${337 + c * 120}px">${[0, 1, 2, 3, 4].map(p => `<i id="pp${k}${c}${p}" style="left:${p * 20}px"></i>`).join('')}</div>`).join('') + `</div>`).join('');
$('#raoF').style.cssText += ';' + FACE('rao');
$('#cp0I').innerHTML = M.icon('target', 22, C.gold, 2.4); $('#cp1I').innerHTML = M.icon('heart', 22, C.gold2, 2.4);

/* P: the map (688 x 456) and the positioning statement */
const T = (x, y, s, fill, txt, o = '') => `<text x="${x}" y="${y}" font-family="Poppins" font-weight="600" font-size="${s}" fill="${fill}" ${o}>${txt}</text>`;
const CO = [[80, 112, 'Chocolate bar', 'PACKS WELL, A TREAT'], [96, 330, 'Sweet shop laddoo', 'TASTY, STICKY'], [470, 334, 'Fruit', 'HEALTHY, BRUISES']];
$('#map').innerHTML = `<rect width="688" height="456" rx="24" fill="#F5F1E8"/>
  <rect id="gapR" x="368" y="36" width="284" height="156" rx="20" fill="#FFFFFF" stroke="#B8862F" stroke-width="3" stroke-dasharray="10 9"/>
  <g id="gapT">${T(388, 66, 16, C.gold, 'THE GAP', 'letter-spacing="2.4"')}</g>
  <path id="axH" d="M28 228 H660" stroke="#14213D" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path id="axV" d="M344 436 V20" stroke="#14213D" stroke-width="4" stroke-linecap="round" fill="none"/>
  <g id="al0">${T(32, 212, 16, C.muted, 'TREAT', 'letter-spacing="2.4"')}</g>
  <g id="al1">${T(656, 212, 16, C.muted, 'HEALTHY', 'letter-spacing="2.4" text-anchor="end"')}</g>
  <g id="al2">${T(328, 428, 16, C.muted, 'MESSY', 'letter-spacing="2.4" text-anchor="end"')}</g>
  <g id="al3">${T(328, 40, 16, C.muted, 'TIFFIN READY', 'letter-spacing="2.4" text-anchor="end"')}</g>` +
  CO.map(([x, y, n, s], i) => `<g transform="translate(${x} ${y})"><g id="co${i}"><circle r="14" fill="#3A4560"/>${T(26, 2, 21, C.ink, n)}${T(26, 28, 14, C.muted, s, 'letter-spacing="2"')}</g></g>`).join('') +
  `<g id="llG" transform="translate(510 110)"><circle r="22" fill="#B8862F" stroke="#FFFFFF" stroke-width="5"/><rect x="-74" y="34" width="148" height="44" rx="22" fill="#14213D"/>${T(0, 63, 20, '#FFFFFF', 'Laddoo Lab', 'text-anchor="middle"')}</g>`;
wrap($('#pm'), 'pmOut', 784, 580);
const SR = [['FOR', 'Busy parents'], ['WHO WANT', 'A healthy tiffin treat'], ['LADDOO LAB IS', 'The millet laddoo kids love'], ['BECAUSE IT HAS', 'No refined sugar']];
$('#sRows').innerHTML = SR.map(([l, v], i) => `<div class="sr2" id="sr${i}" style="top:${96 + i * 112}px"><div class="sl">${l}</div><div class="sd"></div><div class="serif sv">${i === 3 ? `<span class="acc">${v}</span>` : v}</div></div>`).join('');
$('#zF').style.cssText += ';' + FACE('zoya');

// K: at work today
const KA = [
  ['pie', 'Segment', 'Split into groups', 'Parents, gym-goers, office snackers', 'bank', 'A bank: students, workers, retired people'],
  ['target', 'Target', 'Choose whom to serve', 'Busy parents who pack tiffins', 'plane', 'Business class, built for work travellers'],
  ['pin', 'Position', 'Own one clear idea', 'The healthy sweet for tiffin boxes', 'bike', 'A delivery app promises one thing: speed'],
  ['repeat', 'Review', 'Needs keep changing', 'Zoya asks her buyers again each term', 'phone', 'A phone maker asks users again every year'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['STP TODAY', 'Four moves', 'Every business makes them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO AN AIRLINE</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same flow, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['coin', 'Saves money'], ['megaphone', 'A clear message']];
const XH = [['users', 'Too small a group'], ['tag', 'Labels box people in']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
const FZ = [['Tiffin parents', 'DESIGN FOR', 1], ['Gym-goers', 'STILL WELCOME', 0], ['Office snackers', 'STILL WELCOME', 0]];
$('#fzRow').innerHTML = FZ.map(([n, s, on], i) => `<div class="fz" id="fz${i}" style="left:${24 + i * 216}px;${on ? 'background:#14213D' : ''}"><div class="fn" style="color:${on ? '#fff' : C.ink}">${n}</div><div class="fs" style="color:${on ? C.gold2 : C.muted}">${s}</div></div>`).join('');
$('#bothI').innerHTML = M.icon('ear', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Segmentation', 'Targeting', 'Positioning', 'Promotion'], RIGHT = 0;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('pie', 44, C.gold2, 2.4);
// recap
const ROWS = [['pie', 'Segment: split into groups', ['Similar needs']], ['target', 'Target: choose whom to serve', ['Serve them best']], ['pin', 'Position: own a clear place', ['In their minds']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// active-row styling shared by tiles: 0 idle, 1 active (navy)
const tileOn = (el, on, ic) => {
  el.style.background = mix(C.paper, C.ink, on);
  el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
};
const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tz = $('#tgZ'); tz.style.left = (150 - tz.offsetWidth) + 'px'; $('#tgN').style.left = '660px';
  document.querySelectorAll('.df .dm').forEach(el => { if (el.offsetWidth > 540) el.style.fontSize = Math.floor(26 * 540 / el.offsetWidth) + 'px'; });
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#sc' + i); p.style.left = x + 'px'; x += p.offsetWidth + 12; if (i < 2) { $('#sa' + i).style.left = x + 'px'; x += 56; } }
  const bp = $('#bigP'); bp.style.left = (392 - bp.offsetWidth / 2) + 'px';
  x = 48; for (let i = 0; i < 2; i++) { const p = $('#cp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.sr2 .sv').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(40 * 688 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const tDot0 = tM1 + 0.7, dDot = 0.024;
const llT = M.track(0, [[tLL, 1]], M.HEAVY);

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

  /* ===== A: three kinds of customers ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    HT.forEach(([ic], i) => {
      const el = $('#ht' + i); M.vis(el, t, tH[i] - 0.05, 1e9, pop);
      tileOn(el, M.io((t - tH[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tH[i + 1]) / 0.25) : M.io((t - tH3) / 0.3))), ic);
    });
    M.vis($('#ask'), t, tH[2] + 0.5, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tH[2] + 0.8, 1e9, pop);
    M.vis($('#mt1'), t, tH3 + 0.2, 1e9, pop);
    M.vis($('#mt2'), t, tCant - 0.05, 1e9, pop);
    M.rise($('#askT'), t, tWhom - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the homework ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.6, tL2 - 0.3, { ...pop, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tL1 + 0.9, tL2 - 0.3, { ...pop, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    WT.forEach(([ic], i) => {
      const el = $('#wt' + i); M.vis(el, t, tW[i] - 0.05, 1e9, pop);
      tileOn(el, M.io((t - tW[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tW[i + 1]) / 0.25) : M.io((t - tL3) / 0.3))), ic);
    });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    BT.forEach(([ic], i) => {
      const el = $('#bt' + i); M.vis(el, t, tB[i] - 0.05, 1e9, pop);
      const on = M.io((t - tB[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tB[i + 1]) / 0.25) : M.io((t - tL4) / 0.3)));
      tileOn(el, Math.max(on, M.io((t - tLtr[i]) / 0.2) * (1 - (i < 2 ? M.io((t - tLtr[i + 1]) / 0.2) : 0))), ic);
      M.vis($('#lt' + i), t, tLtr[i] - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    });
  }

  /* ===== D: what is STP ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD6);
    DF.forEach((_, i) => {
      const el = $('#df' + i); M.vis(el, t, tTerm[i] - 0.05, 1e9, { dy: 18 });
      const dm = el.querySelector('.dm'); M.rise(dm, t, tMean[i] + 0.1, { st: 0.04 });
      const on = M.io((t - tMean[i]) / 0.3) * (1 - (i < 2 ? M.io((t - tMean[i + 1]) / 0.3) : M.io((t - tD6) / 0.35)));
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, on);
      el.querySelector('.dt').style.color = mix(C.ink, '#fff', on); dm.style.color = mix(C.ink2, C.gold2, on);
      const bd = el.querySelector('.bd'); bd.style.background = mix('#fff', C.navy2, on); bd.style.color = mix(C.gold, C.gold2, on);
    });
    M.vis($('#vc'), t, tD6 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#q0'), t, tQ0 - 0.1, 1e9, { dy: 16 }); M.vis($('#q1'), t, tQ1 - 0.1, 1e9, { dy: 16 });
    M.vis($('#q0 .gc'), t, tQ0 + 0.4, 1e9, pop); M.vis($('#q1 .gc'), t, tQ1 + 0.6, 1e9, pop);
    M.vis($('#sw'), t, tD7 + 0.05, tDout, { dy: 36, ...o });
    M.draw($('#tlL'), t, tD7 + 0.3, 0.8, M.o3);
    M.vis($('#tc0'), t, tWen - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); M.vis($('#tc1'), t, tRies - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
    M.vis($('#tn0'), t, tWen - 0.05, 1e9, { dy: 16 }); M.vis($('#tn1'), t, tRies - 0.05, 1e9, { dy: 16 });
  }

  /* ===== M: the STP flow ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    M.vis($('#stg'), t, tM1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    // step chips
    SC.forEach((_, i) => {
      const el = $('#sc' + i); M.vis(el, t, tM1 + 0.45 + i * 0.08, 1e9, pop);
      if (i < 2) M.vis($('#sa' + i), t, tM1 + 0.5 + i * 0.08, 1e9, { dx: -10, dy: 0, fade: 0.15 });
      const on = M.io((t - tStep[i]) / 0.3), done = i < 2 ? M.io((t - tStep[i + 1]) / 0.3) : 0;
      el.style.background = mix(mix(C.paper, C.ink, on), C.gold3, done);
      el.style.color = t < tStep[i] ? C.dim : mix('#fff', C.ink, done);
      el.querySelector('b').style.color = t < tStep[i] ? C.dim : mix(C.gold2, C.gold, done);
    });
    // dots: pop in as a crowd, then sort into groups
    const winD = M.io((t - tWin) / 0.4);
    DOT.forEach((d, i) => {
      const el = $('#dt' + i), ta = tDot0 + i * dDot;
      const s = M.spring(t - ta, M.POP); if (t < ta) { attr(el, 'r', '0'); return; }
      attr(el, 'r', (11 * s).toFixed(2));
      const p = M.spring(t - tGrp[d.k] - d.j * 0.014, M.SOFT), pc = M.clamp(p);
      const x = M.lerp(d.x0, d.x1, p), y = M.lerp(d.y0, d.y1, p);
      attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1));
      attr(el, 'fill', mix(C.crowd, GC[d.k], pc));
      attr(el, 'opacity', d.k ? (1 - 0.7 * winD).toFixed(3) : '1');
    });
    GT.forEach((_, k) => { const h = $('#ch' + k); h.style.opacity = (M.clamp((t - tGrp[k]) / 0.3) * (k ? 1 - 0.65 * winD : 1)).toFixed(3); });
    { const u = M.clamp((t - tWin) / 0.3); $('#hiR').style.opacity = u.toFixed(3); M.hide($('#hiR'), u <= 0); }
    M.vis($('#ourT'), t, tHear - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    // right card: phase 0 counter
    M.vis($('#rl0'), t, tM1 + 0.4, tStep[1] - 0.05, { dy: 10, outDur: 0.2, ody: -8 });
    M.vis($('#bigN'), t, tM1 + 0.5, tGrp[0] - 0.15, { dy: 16, outDur: 0.25, ody: -12 });
    M.count($('#bigN'), t, tDot0, 60 * dDot + 0.3, 0, 60);
    M.vis($('#bigL'), t, tM1 + 0.6, tGrp[0] - 0.15, { dy: 10, outDur: 0.25, ody: -12 });
    M.vis($('#bigP'), t, wt('M2', 'sixty') + 0.2, tGrp[0] - 0.15, { ...pop, outDur: 0.25, ody: -12 });
    // phase 1-2: the table
    const tTab = tStep[2] - 0.12, oo = { outDur: 0.25, ody: -12 };
    M.vis($('#rl1'), t, tStep[1] + 0.05, tTab, { dy: 10, ...oo });
    for (let c = 0; c < 3; c++) M.vis($('#th' + c), t, tCrit[c] - 0.1, tTab, { dy: 8, ...oo });
    GT.forEach((_, k) => {
      const r = $('#tr' + k); M.vis(r, t, tGrp[k] - 0.05, tTab, { dy: 18, ...oo });
      const n = Math.round(GN[k] * M.clamp((t - tGrp[k] - 0.2) / (GN[k] * 0.014 + 0.4)));
      const gx = k === 1 && t >= tGymX;
      M.setT($('#rc' + k), gx ? 'NOT A FIT, FOR NOW' : `${n} PEOPLE`);
      $('#rc' + k).style.color = gx ? C.red : C.muted;
      const win = k === 0 ? winD : 0, lose = k ? winD : 0;
      r.querySelector('.bg').style.background = mix(C.paper, C.gold3, win);
      r.querySelector('.rt').style.color = mix(C.ink, C.dim, lose);
      for (let c = 0; c < 3; c++) for (let p = 0; p < 5; p++) {
        const f = p < RATE[k][c] ? M.io((t - tCrit[c] - 0.1 - k * 0.12 - p * 0.05) / 0.2) : 0;
        $('#pp' + k + c + p).style.background = mix(C.line, mix(GC[k] === C.muted ? C.ink2 : GC[k], C.dim, lose), f);
      }
    });
    M.vis($('#tgPill'), t, tWin + 0.1, tTab, { ...pop, ...oo });
    // phase 3: in their minds
    const tp = tStep[2] + 0.1;
    M.vis($('#rl2'), t, tp, 1e9, { dy: 10 });
    M.vis($('#raoF'), t, tp + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#raoN'), t, tp + 0.2, 1e9, { dy: 10 }); M.vis($('#raoT'), t, tp + 0.28, 1e9, { dy: 8 });
    M.vis($('#bd0'), t, tHear + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); M.vis($('#bd1'), t, tHear + 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
    M.vis($('#bR'), t, tHear + 0.3, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.vis($('#bl1'), t, tHear + 0.5, 1e9, { dy: 10 });
    M.rise($('#bl2'), t, tBl[0] - 0.05, { st: 0.06, sp: M.HEAVY }); M.rise($('#bl3'), t, tBl[1] - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#cp0'), t, tCp[0] - 0.1, 1e9, pop); M.vis($('#cp1'), t, tCp[1] - 0.1, 1e9, pop);
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

  /* ===== P: positioning map + statement ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const pm = $('#pm'); M.vis(pm, t, tP1 + 0.02, tPout, { dy: 36, ...o }); grow(pm, $('#pmOut'), t, tP6);
    M.vis($('#map'), t, tP1 + 0.2, 1e9, { dy: 20, sp: M.SOFT });
    M.draw($('#axH'), t, tDraw - 0.05, 0.6, M.o3); M.draw($('#axV'), t, tMap - 0.05, 0.6, M.o3);
    for (let i = 0; i < 4; i++) M.vis($('#al' + i), t, tAx[i] - 0.1, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#co' + i), t, tCo[i] - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#gapR'), t, tGap - 0.1, 1e9, { dy: 0, sc: 0.9, sp: M.POP, fade: 0.12 }); M.vis($('#gapT'), t, tGap + 0.1, 1e9, { dy: 0, fade: 0.15 });
    { const u = llT(t), g = $('#llG'); M.hide(g, t < tLL - 0.02);
      attr(g, 'transform', `translate(${M.lerp(344, 510, u).toFixed(1)} ${M.lerp(228, 110, u).toFixed(1)}) scale(${M.lerp(0.4, 1, M.clamp(u)).toFixed(3)})`); }
    M.vis($('#ps'), t, tP6 + 0.12, tPout, { dx: 60, dy: 0, ...o });
    M.vis($('#zF'), t, tP6 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    SR.forEach((_, i) => {
      const r = $('#sr' + i); M.vis(r.querySelector('.sl'), t, tP6 + 0.35 + i * 0.12, 1e9, { dy: 10 });
      M.vis(r.querySelector('.sd'), t, tP6 + 0.4 + i * 0.12, 1e9, { dy: 0, fade: 0.2 });
      M.rise(r.querySelector('.sv'), t, tSv[i] - 0.05, { st: 0.05, sp: M.HEAVY });
      r.querySelector('.sd').style.borderTopColor = mix(C.line, C.gold2, M.io((t - tSv[i]) / 0.3));
    });
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, pop);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, pop);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tArjX, tZoyX, tDes][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tZoyX ? C.redBg : C.paper; $('#bb0').style.color = t > tZoyX ? C.red : C.ink;
    M.vis($('#fx'), t, tDes + 0.3, 1e9, { dy: 16 });
    for (let i = 0; i < 3; i++) M.vis($('#fz' + i), t, tDes + 0.45 + i * 0.12, 1e9, pop);
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
