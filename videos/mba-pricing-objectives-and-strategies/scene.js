// MBA - Marketing Management, Ep 23: Pricing Objectives and Strategies (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tArjH = wt('H2', 'Arjun'), tEighty = wt('H2', 'eighty'), tCheap = wt('H2', 'Cheap');
const tC2 = T0('C2'), tToday = wt('C2', 'Today'), tWho = wt('C2', 'who'), tDep = wt('C2', 'depends');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tTwenty = wt('L2', 'twenty', 1), tNum = wt('L3', 'number'), tGoal = wt('L3', 'goal');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M1') - 0.32;
const tAch = wt('D2', 'achieve'), tPlan = wt('D3', 'plan');
const tMx = [wt('D4', 'Product'), wt('D4', 'place'), wt('D4', 'promotion'), wt('D4', 'Price')], tCost = wt('D4', 'cost'), tIn = wt('D4', 'brings');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tKeen = wt('M2', 'keen');
const TW = { L: [wt('M3', 'hundred') - 0.1, wt('M4', 'fifty'), wt('M4', 'twenty'), wt('M4', 'more')], R: [wt('M6', 'hundred') - 0.1, wt('M6', 'week'), wt('M7', 'By'), wt('M7', 'ninety')] };
const DATA = { L: { p: [180, 150, 120, 120], b: [20, 35, 50, 55] }, R: { p: [100, 100, 100, 100], b: [60, 75, 85, 90] } };
const tMout = T0('T1') - 0.32;
// statement + K
const tT = T0('T1'), tSt2 = wt('T1', 'Choose'), tK0 = T0('K0'), tTu = tK0 - 0.32;
const tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('Z1') - 0.32;
const tKw = [wt('K1', 'airline'), wt('K2', 'hotel'), wt('K3', 'delivery'), wt('K4', 'phone'), wt('K5', 'luxury')];
// Z
const tZ1 = T0('Z1'), tZ2 = T0('Z2'), tZ3 = T0('Z3'), tZ4 = T0('Z4'), tZout = T0('X1') - 0.32;
const tZr = [wt('Z2', 'survival'), wt('Z3', 'two') + 0.1, wt('Z2', 'eighty'), wt('Z3', 'Parents'), wt('Z4', 'quality')];
const tStays = wt('Z4', 'stays');
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'Clear'), wt('X2', 'business')], tXh = [wt('X3', 'Early'), wt('X3', 'wars')];
const tArj = wt('X4', 'Arjun'), tBelow = wt('X4', 'below'), tNani = wt('X4', 'Nani'), tAct = wt('X5', 'Competition'), tPred = wt('X5', 'means');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'Decide')], [wt('S3', 'survival'), wt('S3', 'profit'), wt('S3', 'market'), wt('S3', 'skimming'), wt('S3', 'quality')], [wt('S4', 'high'), wt('S4', 'low')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
const faceG = (id, face, r, ring) => `<g id="${id}"><circle r="${r + 4}" fill="${ring}"/><image href="${IMG}ll-${face}-face.jpg" x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" clip-path="url(#fc${r})"/></g>`;
const clips = rs => `<defs>${rs.map(r => `<clipPath id="fc${r}"><circle r="${r}"/></clipPath>`).join('')}</defs>`;

// A: the price ruler (₹60 to ₹220)
const rx = p => 300 + (p - 60) * 5.5;
$('#rulS').innerHTML = clips([20]) + `<text x="36" y="64" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.6" fill="#8A8274">PRICE OF A 6-PACK</text>
  <line x1="${rx(60)}" y1="80" x2="${rx(220)}" y2="80" stroke="#E2DACB" stroke-width="6" stroke-linecap="round"/>
  ${[60, 80, 100, 120, 140, 160, 180, 200, 220].map(p => `<text x="${rx(p)}" y="106" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" fill="#B9B1A3">₹${p}</text>`).join('')}
  <g transform="translate(${rx(200)} 0)"><g id="rpD"><line x1="0" y1="56" x2="0" y2="80" stroke="#14213D" stroke-width="3"/><g transform="translate(0 32)">${faceG('rfD', 'dev', 20, '#14213D')}</g></g></g>
  <g transform="translate(${rx(80)} 0)"><g id="rpA"><line x1="0" y1="56" x2="0" y2="80" stroke="#B8862F" stroke-width="3"/><g transform="translate(0 32)">${faceG('rfA', 'arjun', 20, '#B8862F')}</g></g></g>
  <g transform="translate(${rx(120)} 0)"><g id="rpN"><line x1="0" y1="50" x2="0" y2="80" stroke="#14213D" stroke-width="3"/><rect id="rpNr" x="-58" y="18" width="116" height="34" rx="17" fill="#14213D"/><text x="0" y="41" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" letter-spacing="1.2" fill="#FFFFFF">NOW ₹120</text><circle cx="0" cy="80" r="8" fill="#B8862F"/></g></g>`;
$('#faBI').innerHTML = M.icon('message', 22, C.ink, 2.4); $('#fbBI').innerHTML = M.icon('message', 22, C.ink, 2.4);
$('#depI').innerHTML = M.icon('target', 22, C.gold2, 2.4);
// L: today's pack + Zoya's rule
$('#nowL').innerHTML = Array.from({ length: 6 }, (_, i) => `<g id="nl${i}">${laddoo(22 + i * 46, 24, 18)}</g>`).join('');
$('#gZ').style.cssText += ';' + FACE('zoya');
const GR = [['target', 'STEP 1', 'The goal'], ['map', 'STEP 2', 'The plan'], ['tag', 'STEP 3', 'The price']];
$('#gRow').innerHTML = GR.map(([ic, n, t], i) => `<div class="sws" id="gr${i}" style="left:${36 + i * 256}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>` +
  (i < 2 ? `<div class="ar" id="ga${i}" style="left:${244 + i * 256}px">${M.icon('arrowR', 22, C.gold, 2.6)}</div>` : '')).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: definitions + money flow
$('#dc0I').innerHTML = M.icon('target', 20, C.gold2, 2.4); $('#dc1I').innerHTML = M.icon('map', 20, '#fff', 2.4);
const MX = [['package', 'Product'], ['store', 'Place'], ['megaphone', 'Promotion'], ['tag', 'Price']];
$('#mxR').innerHTML = MX.map(([ic, t], i) => `<div class="mr" id="mr${i}" style="top:${96 + i * 104}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="rt">${t}</div>
  <div class="mc" id="mc${i}" style="${i < 3 ? 'background:#F6E3DC;color:#B5482F' : 'background:#B8862F;color:#fff'}">${M.icon(i < 3 ? 'trendDown' : 'trendUp', 20, i < 3 ? C.red : '#fff', 2.6)}<span>${i < 3 ? 'Costs money' : 'Brings money in'}</span></div></div>`).join('') +
  `<div class="lbl" id="mxS" style="left:48px;top:520px">THE ONLY P THAT EARNS REVENUE</div>`;
wrap($('#dfc'), 'dfOut', 784, 580);

/* M: the two launch plans. Plan coords are inside a 688 x 250 svg. */
const COLX = i => 86 + i * 172, BH = b => b * 140 / 90;
const head = (k, face, name) => `<div class="mav" style="${FACE(face)}"></div><div class="lbl mlb">${name}</div><div class="serif mrd" id="rd${k}">₹${DATA[k].p[0]}</div>`;
const tail = k => `<div class="mbar" id="bar${k}"><i id="sg${k}0"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">BUYERS IN 4 WEEKS</div><div class="mtk" id="tk1${k}" style="right:48px">310</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
const plan = k => `<svg class="mplan" id="plan${k}" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${[0, 1, 2, 3].map(i => { const x = COLX(i); return `<rect id="cb${k}${i}" x="${x - 80}" y="8" width="160" height="234" rx="16" fill="#F5F1E8"/>
        <g id="ct${k}${i}"><rect x="${x - 52}" y="16" width="104" height="36" rx="18" fill="${k === 'L' ? '#14213D' : '#B8862F'}"/><text x="${x}" y="40" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="#FFFFFF">₹${DATA[k].p[i]}</text></g>
        <rect id="cr${k}${i}" x="${x - 36}" y="206" width="72" height="0" rx="10" fill="${k === 'L' ? '#3A4560' : '#B8862F'}"/>
        <text id="cn${k}${i}" x="${x}" y="200" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#14213D">0</text>
        <text x="${x}" y="232" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">WEEK ${i + 1}</text>`; }).join('')}
      <line x1="16" y1="206" x2="672" y2="206" stroke="#E2DACB" stroke-width="2"/>
    </svg>`;
$('#mLIn').innerHTML = head('L', 'zoya', 'PLAN 1 · SKIMMING · START HIGH') + plan('L') + tail('L');
$('#mRIn').innerHTML = head('R', 'zoya', 'PLAN 2 · PENETRATION · START LOW') + plan('R') + tail('R');
// price per pack chart (skimming)
const cy = p => 300 - p * 1.3, cx0 = i => 64 + i * 156;
$('#chS').innerHTML = [0, 50, 100, 150, 200].map(p => `<line x1="56" y1="${cy(p)}" x2="688" y2="${cy(p)}" stroke="${p ? '#EEE8DB' : '#E2DACB'}" stroke-width="2"/><text x="0" y="${cy(p) + 5}" font-family="Poppins" font-weight="600" font-size="15" fill="#B9B1A3">₹${p}</text>`).join('') +
  DATA.L.p.map((p, i) => { const prev = i ? DATA.L.p[i - 1] : p; return `<path id="cs${i}" d="M${cx0(i)} ${cy(prev)} V${cy(p)} H${cx0(i + 1) - 8}" fill="none" stroke="#14213D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <text id="cl${i}" x="${(cx0(i) + cx0(i + 1)) / 2}" y="${cy(p) - 16}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#14213D">₹${p}</text>
    <text x="${(cx0(i) + cx0(i + 1)) / 2}" y="330" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">WEEK ${i + 1}</text>`; }).join('');
$('#gLeftI').innerHTML = M.icon('award', 22, C.gold2, 2.4);
wrap($('#mL'), 'mLOut', 784, 580);

// K: five pricing objectives at work today
const KA = [
  ['shield', 'Survival', 'Cover costs and stay open', 'Only for a very bad month in the kitchen', 'plane', 'An airline cuts fares in a slump'],
  ['coin', 'Maximum current profit', 'Earn the most money now', 'Charge ₹200 now, and lose weekly families', 'home', 'A hotel near a stadium charges most on match day'],
  ['users', 'Maximum market share', 'Price low to win the most buyers', 'Sell at ₹80, as Arjun wants', 'package', 'A new delivery app launches with very low prices'],
  ['trendDown', 'Market skimming', 'Start high, then come down', 'Launch a new flavour high, lower it later', 'phone', "A phone maker cuts the price of last year's model"],
  ['award', 'Quality leadership', 'A higher price for the best quality', "Nani's no-shortcuts recipe, fairly priced", 'home', 'A luxury hotel charges more for top service'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 96}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PHILIP KOTLER AND KEVIN LANE KELLER', 'Five pricing goals', 'What the price is asked to do', null]].concat(KA.map((a, i) => [`PRICING OBJECTIVE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">MARKETING MANAGEMENT · THE PRICING CHAPTER</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Pick one before you pick a number</span></div>`) + `</div>`).join('');

// Z: Laddoo Lab's choice
const ZR = [['shield', 'Survival', 'Doing well'], ['coin', 'Max profit', '₹200 is too dear'], ['users', 'Max market share', 'No cut corners'], ['trendDown', 'Skimming', 'Weekly buyers'], ['award', 'Quality leadership', 'Our pick']];
$('#zRows').innerHTML = ZR.map(([ic, t, c], i) => `<div class="zr" id="zr${i}" style="top:${92 + i * 88}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div>
  <div class="zc" id="zc${i}" style="${i < 4 ? 'background:#F6E3DC;color:#B5482F' : 'background:#B8862F;color:#fff'}">${M.icon(i < 4 ? 'x' : 'check', 20, i < 4 ? C.red : '#fff', 3)}<span>${c}</span></div></div>`).join('');
const zx = p => 24 + (p - 60) * 4;
const xb = `<g id="XB"><circle r="14" fill="#B5482F"/><path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
$('#zpS').innerHTML = clips([28]) + `<line x1="${zx(60)}" y1="150" x2="${zx(220)}" y2="150" stroke="#E2DACB" stroke-width="6" stroke-linecap="round"/>
  ${[60, 80, 100, 120, 140, 160, 180, 200, 220].map(p => `<text x="${zx(p)}" y="184" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" fill="#B9B1A3">₹${p}</text>`).join('')}
  <g transform="translate(${zx(80)} 0)"><g id="zpA"><line x1="0" y1="104" x2="0" y2="150" stroke="#B8862F" stroke-width="3"/><g transform="translate(0 72)">${faceG('zfA', 'arjun', 28, '#B8862F')}</g><g transform="translate(22 50)"><g id="zxA">${xb.replace('XB', 'zxAi')}</g></g></g></g>
  <g transform="translate(${zx(200)} 0)"><g id="zpD"><line x1="0" y1="104" x2="0" y2="150" stroke="#14213D" stroke-width="3"/><g transform="translate(0 72)">${faceG('zfD', 'dev', 28, '#14213D')}</g><g transform="translate(22 50)"><g id="zxD">${xb.replace('XB', 'zxDi')}</g></g></g></g>
  <g transform="translate(${zx(120)} 0)"><g id="zpN"><line x1="0" y1="104" x2="0" y2="150" stroke="#B8862F" stroke-width="3"/><circle cx="0" cy="72" r="32" fill="#B8862F"/><g transform="translate(-16 56)">${M.icon('check', 32, '#fff', 3)}</g><circle cx="0" cy="150" r="9" fill="#14213D"/></g></g>`;
$('#zStI').innerHTML = M.icon('check', 22, '#fff', 3);

// X: the human side
const XG = [['check', 'Easy to choose'], ['chart', 'Plan ahead']];
const XH = [['trendDown', 'Early buyers upset'], ['zap', 'Price wars']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#prS').innerHTML = `<text x="0" y="14" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#8A8274">COST OF A PACK</text>
  <rect id="pr0" x="0" y="26" width="0" height="36" rx="10" fill="#B9B1A3"/>
  <text x="0" y="96" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#B5482F">PREDATORY PRICE</text>
  <rect id="pr2" x="340" y="108" width="300" height="36" rx="10" fill="#F6E3DC" stroke="#E7B9AB" stroke-width="2" stroke-dasharray="6 6"/>
  <text id="pr3" x="490" y="132" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" letter-spacing="2" fill="#B5482F">A LOSS ON EVERY PACK</text>
  <rect id="pr1" x="0" y="108" width="0" height="36" rx="10" fill="#B5482F"/>`;
$('#bb1I').innerHTML = M.icon('shield', 22, '#fff', 2.4); $('#factI').innerHTML = M.icon('scale', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('target', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Skimming', 'Penetration', 'Survival', 'Cost-plus'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Objective first: what the price must do', ['Decide it first']], ['layers', 'Five common goals', ['Survival', 'Profit', 'Share', 'Skimming', 'Quality']], ['trendDown', 'Skim high, or penetrate low', ['Starts high', 'Starts low']]];
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
// one launch plan: weeks reveal price tag + buyers bar
const run = (k, t) => {
  const D = DATA[k], tw = TW[k]; let cum = 0, cur = -1;
  for (let i = 0; i < 4; i++) {
    const u = M.o3((t - tw[i]) / 0.5), on = t >= tw[i] - 0.05;
    if (on) cur = i;
    const ct = $('#ct' + k + i); ct.style.opacity = M.clamp((t - tw[i] + 0.05) / 0.15).toFixed(3);
    const h = BH(D.b[i]) * u; attr($('#cr' + k + i), 'height', h.toFixed(1)); attr($('#cr' + k + i), 'y', (206 - h).toFixed(1));
    const cn = $('#cn' + k + i); attr(cn, 'y', (198 - h).toFixed(1)); M.setT(cn, String(Math.round(D.b[i] * u))); cn.style.opacity = on ? '1' : '0';
    cum += D.b[i] * u;
  }
  for (let i = 0; i < 4; i++) attr($('#cb' + k + i), 'fill', i === cur ? '#FFFFFF' : C.paper);
  M.setT($('#rd' + k), '₹' + D.p[Math.max(0, cur)]);
  const g = $('#sg' + k + '0'); g.style.left = '0px'; g.style.width = (688 * cum / 310).toFixed(1) + 'px'; g.style.background = k === 'L' ? C.ink2 : C.gold;
  return [cur, Math.round(cum)];
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const dq = $('#dq'); dq.style.fontSize = '88px'; dq.style.width = 'auto'; if (dq.offsetWidth > 1560) dq.style.fontSize = Math.floor(88 * 1560 / dq.offsetWidth) + 'px'; dq.style.width = '1920px';
  const dp = $('#dep'); dp.style.left = (1564 - dp.offsetWidth) + 'px';
  document.querySelectorAll('.dtx').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(46 * 688 / el.offsetWidth) + 'px'; });
  const gl = $('#gLeft'); gl.style.left = (392 - gl.offsetWidth / 2) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const kt = $('#fact .kt'); if (kt.offsetWidth > 556) kt.style.fontSize = Math.floor(28 * 556 / kt.offsetWidth) + 'px';
  const q1 = $('#qq1'); if (q1.offsetWidth > 1400) q1.style.fontSize = Math.floor(68 * 1400 / q1.offsetWidth) + 'px';
  let ofs = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) ofs = Math.min(ofs, Math.floor(40 * 312 / o.offsetWidth)); });
  OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = ofs + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

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

  /* ===== A: two prices ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fa'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#faI'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.rise($('#faN'), t, tMorph + 0.45, { st: 0.06 }); M.vis($('#faR'), t, tMorph + 0.6, 1e9, { dy: 10 });
    M.vis($('#faB'), t, tMorph + 0.75, 1e9, POP); M.vis($('#faP'), t, tMorph + 0.95, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#fb'), t, tArjH - 0.1, tAout, { dx: 60, dy: 0, ...o });
    M.vis($('#fbI'), t, tArjH + 0.05, 1e9, { dy: 30, sp: M.SOFT });
    M.rise($('#fbN'), t, tArjH + 0.1, { st: 0.06 }); M.vis($('#fbR'), t, tArjH + 0.25, 1e9, { dy: 10 });
    M.vis($('#fbB'), t, tCheap - 0.1, 1e9, POP); M.vis($('#fbP'), t, tEighty - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#rul'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#rpD'), t, tMorph + 1.0, 1e9, { dy: -16, sp: M.POP, fade: 0.1 });
    M.vis($('#rpA'), t, tEighty, 1e9, { dy: -16, sp: M.POP, fade: 0.1 });
    M.vis($('#rpN'), t, tToday - 0.05, 1e9, { dy: -16, sp: M.POP, fade: 0.1 });
    attr($('#rpNr'), 'fill', mix(C.ink, C.gold, M.io((t - tDep) / 0.3)));
    const dim = M.io((t - tWho) / 0.3);
    $('#faP').style.background = mix(C.ink, C.dim, dim); $('#fbP').style.background = mix(C.gold, C.dim, dim);
    M.vis($('#dep'), t, tDep - 0.1, 1e9, POP);
  }

  /* ===== L: the six-pack today ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#now'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.rise($('#nowP'), t, wt('L2', 'hundred') - 0.05, { st: 0.07, sp: M.HEAVY });
    for (let i = 0; i < 6; i++) M.vis($('#nl' + i), t, tTwenty - 0.5 + i * 0.06, 1e9, { dy: -14, sp: M.POP, fade: 0.08 });
    M.vis($('#nowT'), t, tTwenty - 0.05, 1e9, { dy: 10 });
    M.vis($('#nowS'), t, tTwenty + 0.4, 1e9, { dy: 8 });
    M.vis($('#goal'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.vis($('#gZ'), t, tL3 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    const tg = [tGoal - 0.05, tGoal + 0.35, tNum];
    GR.forEach((_, i) => {
      const el = $('#gr' + i); M.vis(el, t, tL3 + 0.35 + i * 0.12, 1e9, POP);
      if (i < 2) M.vis($('#ga' + i), t, tL3 + 0.45 + i * 0.12, 1e9, { dx: -10, dy: 0, fade: 0.15 });
      const on = i === 2 ? M.io((t - tNum) / 0.25) * (1 - M.io((t - tGoal + 0.1) / 0.25)) : (i === 0 ? M.io((t - tGoal) / 0.25) : 0);
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), GR[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
      void tg;
    });
  }

  /* ===== D: what is a pricing objective ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const df = $('#dfc'); M.vis(df, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#dfOut'), t, tD4);
    M.vis($('#dc0'), t, tD2 + 0.25, 1e9, POP);
    M.rise($('#dt0'), t, tD2 + 0.4, { st: 0.05, sp: M.HEAVY }); M.rise($('#dt1'), t, tAch - 0.4, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dfHr'), t, tD3 - 0.1, 1e9, { dy: 0 });
    M.vis($('#dc1'), t, tD3 + 0.05, 1e9, POP);
    M.rise($('#dt2'), t, tPlan - 0.15, { st: 0.05, sp: M.HEAVY }); M.rise($('#dt3'), t, tPlan + 0.4, { st: 0.05, sp: M.HEAVY });
    M.vis($('#mx'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    MX.forEach((_, i) => {
      const el = $('#mr' + i); M.vis(el, t, tD4 + 0.35 + i * 0.08, 1e9, { dy: 14 });
      M.vis($('#mc' + i), t, i < 3 ? Math.max(tMx[i], tCost - 0.2 + i * 0.12) : tIn - 0.05, 1e9, POP);
      const on = i === 3 ? M.io((t - tMx[3]) / 0.3) : 0;
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, on);
      el.querySelector('.rt').style.color = mix(C.ink, '#fff', on);
      el.querySelector('.ri').style.background = mix('#FFFFFF', C.navy2, on);
      setIco(el.querySelector('.ri'), MX[i][0], on > 0.5 ? C.gold2 : C.gold, 28, 2.2);
    });
    M.vis($('#mxS'), t, tIn + 0.5, 1e9, { dy: 8 });
  }

  /* ===== M: skimming vs penetration ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM5 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM5 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM5 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
    const [cL, nL] = run('L', t), [cR, nR] = run('R', t);
    if (t >= TW.L[3] + 0.6) pill('L', 'coin', 'More money per pack', `${nL} buyers`, 0, 1);
    else if (t >= tM4) pill('L', 'trendDown', 'Price steps down, more join', '', 0, 0);
    else if (t >= tM3) pill('L', 'users', 'Only 20 buyers in week one', '', 0, 0);
    else if (t >= tM2) pill('L', 'award', 'Start high, for keen buyers', '', 0, 0);
    else pill('L', 'message', 'Plan for a new flavour', '', 0, 0);
    if (t >= tM8) pill('R', 'users', 'More buyers, faster', `${nR} buyers`, 0, 1);
    else if (t >= tM7) pill('R', 'trendUp', '90 families a week', '', 0, 0);
    else if (t >= tM6) pill('R', 'users', '60 families in week one', '', 0, 0);
    else pill('R', 'tag', 'Start low, to win buyers', '', 0, 0);
    void cL; void cR;
    // price-per-pack chart for skimming
    for (let i = 0; i < 4; i++) { M.draw($('#cs' + i), t, TW.L[i] - 0.1, 0.5, M.o3); M.vis($('#cl' + i), t, TW.L[i] + 0.2, 1e9, { dy: 8 }); }
    M.vis($('#chS'), t, tM1 + 0.45, 1e9, { dy: 16 });
    M.vis($('#gWay'), t, tM2 + 0.2, 1e9, { dy: 8 });
    M.vis($('#gLeft'), t, tKeen - 0.1, 1e9, POP);
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

  /* ===== K: at work today ===== */
  const kOn = t >= tTu - 0.05 && t < tZ1 + 0.2; M.hide($('#sK'), !kOn);
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

  /* ===== Z: Laddoo Lab's choice ===== */
  const zOn = t >= tZ1 - 0.1 && t < T0('X1') + 0.2; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#zq'), t, tZ1 + 0.1, tZout, { dx: -60, dy: 0, ...o });
    M.vis($('#zp'), t, tZ1 + 0.25, tZout, { dx: 60, dy: 0, ...o });
    ZR.forEach(([ic], i) => {
      const el = $('#zr' + i), tr = tZr[i], u = M.io((t - tr) / 0.3), pick = i === 4;
      M.vis(el, t, tZ1 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      M.vis($('#zc' + i), t, tr - 0.05, 1e9, POP);
      el.querySelector('.bg').style.background = pick ? mix(C.paper, C.ink, u) : mix(C.paper, '#F0EBE1', u);
      el.querySelector('.rt').style.color = pick ? mix(C.ink, '#fff', u) : mix(C.ink, C.dim, u);
      el.querySelector('.ri').style.background = pick ? mix('#FFFFFF', C.navy2, u) : '#FFFFFF';
      setIco(el.querySelector('.ri'), ic, pick ? (u > 0.5 ? C.gold2 : C.gold) : (u > 0.5 ? C.dim : C.gold), 26, 2.2);
    });
    M.vis($('#zpS'), t, tZ1 + 0.45, 1e9, { dy: 16 });
    M.vis($('#zpA'), t, tZ1 + 0.6, 1e9, { dy: -16, sp: M.POP, fade: 0.1 }); M.vis($('#zpD'), t, tZ1 + 0.72, 1e9, { dy: -16, sp: M.POP, fade: 0.1 });
    M.vis($('#zxA'), t, tZr[2], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis($('#zxD'), t, tZr[1], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#zpN'), t, tZr[4] + 0.1, 1e9, { dy: -16, sp: M.POP, fade: 0.1 });
    M.vis($('#zBig'), t, tZ1 + 0.6, 1e9, { dy: 16 });
    $('#zBig').style.color = mix(C.line, C.ink, M.io((t - tStays + 0.1) / 0.3));
    M.vis($('#zSt'), t, tStays - 0.05, 1e9, POP);
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tArj - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNani ? C.redBg : C.paper; $('#bb0').style.color = t > tNani ? C.red : C.ink;
    M.vis($('#xr1'), t, tNani - 0.05, 1e9, { dx: 24, dy: 0 });
    M.vis($('#prS'), t, tBelow - 0.1, 1e9, { dy: 16 });
    attr($('#pr0'), 'width', (640 * M.o3((t - tBelow) / 0.5)).toFixed(1));
    attr($('#pr1'), 'width', (340 * M.o3((t - tBelow - 0.4) / 0.5)).toFixed(1));
    const lu = M.clamp((t - tBelow - 0.9) / 0.2); $('#pr2').style.opacity = lu.toFixed(3); $('#pr3').style.opacity = lu.toFixed(3);
    M.vis($('#fact'), t, tAct - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
    void tPred;
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
