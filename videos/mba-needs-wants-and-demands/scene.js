// MBA - Marketing Management, Ep 01: Introduction to Marketing (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  wheat: ['M2 22 16 8', 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z'],
  swap: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  megaOff: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tGreat = wt('H2', 'great'), tEight = wt('H2', 'eight');
const tC2 = T0('C2'), tNever = wt('C2', 'never'), tAsked = wt('C2', 'asked');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tZoya = wt('L1', 'Zoya'), tNani = wt('L1', 'Nani');
const tRagi = wt('L2', 'ragi'), tJag = wt('L2', 'jaggery'), tCane = wt('L2', 'sugarcane'), tArj = wt('L3', 'Arjun'), tDev = wt('L3', 'Dev');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D: what is marketing
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tKqL = wt('D2', 'Principles') + 0.5, tHl = [wt('D3', 'creates'), wt('D3', 'relationships'), wt('D3', 'capture')];
const tGood = wt('D4', 'good'), tPay = wt('D4', 'pay'), tSw = [wt('D5', 'find'), wt('D5', 'serve'), wt('D5', 'coming')];
// M: selling vs marketing
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tMakes = wt('M2', 'makes'), tWaits = wt('M2', 'waits'), tAsks = wt('M5', 'asks'), tArjun = wt('M7', 'Arjun'), tSoldR = wt('M8', 'sold');
const tNeed = [wt('M6', 'tiffin'), wt('M6', 'Small'), wt('M6', 'refined')];
const tMout = T0('T1') - 0.32;
// statement + Drucker
const tT = T0('T1'), tSt2 = wt('T1', 'Marketing'), tU = T0('U2'), tTu = tU - 0.32;
const tDl = [wt('U2', 'aim'), wt('U2', 'understand'), wt('U2', 'product')], tDk = [wt('U2', 'know'), wt('U2', 'understand'), wt('U2', 'sells')], tFits = wt('U2', 'fits');
const tUout = T0('E1') - 0.32;
// E: exchange + relationship
const tE1 = T0('E1'), tE2 = T0('E2'), tE3 = T0('E3'), tE5 = T0('E5'), tGive = wt('E1', 'give'), tGet = wt('E1', 'get');
const tXk = [wt('E2', 'healthy'), wt('E2', 'time'), wt('E3', 'money')], tBec = wt('E5', 'because'), tComes = wt('E5', 'comes'), tWeek = wt('E5', 'week'), tThat = wt('E5', 'That'), tRel = wt('E5', 'relationship');
const tEout = T0('P0') - 0.32;
// P: five steps
const tP0 = T0('P0'), tP = [1, 2, 3, 4, 5].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bank'), wt('K3', 'bakery'), wt('K4', 'food')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'find'), wt('X2', 'small')], tXh = [wt('X3', 'lie'), wt('X3', 'push')];
const tDevX = wt('X4', 'Dev'), tSugar = wt('X4', 'sugar'), tNaniX = wt('X4', 'Nani'), tStill = wt('X4', 'still'), tRef = wt('X5', 'refined'), tTrue = wt('X5', 'True'), tAct = wt('X6', 'Consumer');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'better')], [wt('S3', 'value'), wt('S3', 'money')], [wt('S4', 'come')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r, id = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
// A: hero table + plate, 50 laddoos grid, the "what went wrong" pills
const PL = [[440, 30], [476, 30], [512, 30], [458, -2], [494, -2], [476, -32]];

$('#tbl').style.overflow = 'visible';
$('#lgrid').innerHTML = Array.from({ length: 50 }, (_, i) => `<div class="ld0" id="g${i}" style="left:${(i % 25) * 34}px;top:${Math.floor(i / 25) * 36}px"></div>`).join('');
$('#cSoldI').innerHTML = M.icon('check', 24, C.gold, 2.6); $('#cLeftI').innerHTML = M.icon('x', 24, C.red, 2.6);
const METH = [['check', 'Tasty', 0], ['check', 'Healthy', 0], ['x', 'Asked people?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: recipe + team
$('#nrsI').innerHTML = M.icon('check', 20, '#fff', 3);
$('#ig0I').innerHTML = M.icon('wheat', 30, C.gold, 2.2); $('#ig1I').innerHTML = M.icon('leaf', 30, C.gold, 2.2);
const TEAM = [['zoya', 'Zoya', 'FOUNDER'], ['nani', 'Nani', 'RECIPE'], ['arjun', 'Arjun', 'SALES'], ['dev', 'Dev', 'DESIGN']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 125 + i * 178; return `<div class="av face tav" id="tv${i}" style="left:${cx - 36}px;${FACE(f)}">${n[0]}</div><div class="tnm" id="tn${i}" style="left:${cx - 80}px">${n}</div><div class="trl" id="tr${i}" style="left:${cx - 80}px">${r}</div>`; }).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: value tiles + simple words
$('#vgoodI').innerHTML = M.icon('check', 20, '#fff', 3);
$('#vt0I').innerHTML = ['laddoo', 'heart', 'clock'].map(ic => M.icon(ic, 28, C.gold, 2.2)).join('');
$('#vt1I').innerHTML = M.icon('coin', 28, C.ink, 2.2);
const SWT = [['search', 'STEP 1', 'Find the need'], ['award', 'STEP 2', 'Serve it better'], ['repeat', 'STEP 3', 'Bring them back']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the two runs. Plan coords are inside a 688 x 250 svg. */
const box = (id, x, y, ic, label, w = 110) => `<g id="${id}" transform="translate(${x} ${y})"><rect width="${w}" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g class="bi" transform="translate(${w / 2 - 14} 12)">${M.icon(ic, 28, C.ink, 2.2)}</g><text class="bt" x="${w / 2}" y="68" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${label}</text></g>`;
const avG = (id, face, x, y) => `<g id="${id}" transform="translate(${x} ${y})"><circle r="30" fill="#14213D"/><image href="${IMG}ll-${face}-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#avc)"/></g>`;
const WALK = 10, STOP = [1, 5], V = 760 / 2.8, X0 = -30, tw = Array.from({ length: WALK }, (_, i) => tM3 - 0.25 + i * 0.36);
const dStop = (344 - X0) / V;
const card = (k, face, name) => `<div class="mav" style="${FACE(face)}"></div><div class="lbl mlb">${name}</div><div class="serif mrd" id="rd${k}">0 sold</div>`;
const tail = k => `<div class="mbar" id="bar${k}"><i id="sg${k}0"></i><i id="sg${k}1"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">0</div><div class="mtk" id="tk1${k}" style="right:48px">50 LADDOOS</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
$('#mLIn').innerHTML = card('L', 'zoya', 'THE SELLING WAY · MAKE FIRST') + `
    <svg class="mplan" id="planL" width="688" height="250"><defs><clipPath id="avc"><circle cx="0" cy="0" r="26"/></clipPath><clipPath id="pclip"><rect width="688" height="250" rx="24"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${box('sbLgate', 24, 22, 'cap', 'GATE')}${box('sbLstall', 289, 22, 'store', 'STALL')}${box('sbLbox', 554, 22, 'laddoo', '50 LEFT')}
      <path d="M0 218 H688" stroke="#E2DACB" stroke-width="3" stroke-dasharray="10 10"/>
      <g clip-path="url(#pclip)">${Array.from({ length: WALK }, (_, i) => `<g id="wk${i}" transform="translate(-60 218)"><circle r="19" fill="#3A4560"/><g transform="translate(-10 -10)">${M.icon('user', 20, '#fff', 2.4)}</g></g>`).join('')}</g>
      ${avG('avZL', 'zoya', 609, 150)}
    </svg>` + tail('L');
$('#mRIn').innerHTML = card('R', 'zoya', 'THE MARKETING WAY · ASK FIRST') + `
    <svg class="mplan" id="planR" width="688" height="250"><defs><clipPath id="avc2"><circle cx="0" cy="0" r="26"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${[0, 1, 2, 3, 4].map(i => box('sbR' + i, 24 + i * 134, 22, 'home', 'FLAT ' + (i + 1), 104)).join('')}
      ${avG('avZR', 'zoya', 76, 150).replace('#avc', '#avc2')}${avG('avAR', 'arjun', 76, 150).replace('#avc', '#avc2')}
    </svg>
    <div id="needs">${[['Tiffin boxes', 'laddoo'], ['Small size', 'target'], ['No refined sugar', 'leaf']].map(([n, ic], i) => `<div class="need" id="nd${i}">${M.icon(ic, 20, C.gold, 2.4)}<span>${n}</span></div>`).join('')}</div>` + tail('R');
$('#gLeftI').innerHTML = M.icon('x', 22, C.red, 2.6);
wrap($('#mL'), 'mLOut', 784, 580);

// U: Drucker
$('#dqI').innerHTML = M.icon('quote', 64, C.gold, 1.8);
const DP = [['search', 'Know the customer', 0], ['target', 'The product fits', 0], ['trendUp', 'It sells itself', 1]];
$('#dPills').innerHTML = DP.map(([ic, t, d], i) => `<div class="dp" id="dp${i}" style="${d ? 'background:#14213D;color:#fff' : ''}">${M.icon(ic, 26, d ? C.gold2 : C.gold, 2.2)}<span>${t}</span></div>` + (i < 2 ? `<svg class="da" id="da${i}" width="60" height="30"><path d="M4 15 H48 M38 5 L50 15 L38 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
// E: exchange + weeks
$('#xn0').style.cssText += ';' + FACE('zoya'); $('#xn1').style.cssText += ';' + FACE('rao');
$('#xk0I').innerHTML = M.icon('heart', 20, '#fff', 2.4); $('#xk1I').innerHTML = M.icon('clock', 20, '#fff', 2.4); $('#xk2I').innerHTML = M.icon('coin', 20, '#fff', 2.4);
$('#winI').innerHTML = M.icon('check', 22, '#fff', 3);
$('#wks').innerHTML = [1, 2, 3, 4].map(i => `<div class="wk" id="wk${i - 1}x" style="left:${48 + (i - 1) * 176}px"><div class="zn">WEEK ${i}</div><div class="zi"></div><div class="zt">Bought</div></div>`).join('') + `<div class="av face" style="right:48px;top:24px;width:56px;height:56px;${FACE('rao')}"></div>`;
$('#rlPI').innerHTML = M.icon('heart', 22, C.gold2, 2.4);
wrap($('#ex'), 'exOut', 784, 580);
// P: five steps
const P5 = [['search', 'Understand', 'needs', 'zoya', 'Zoya asks parents what their tiffins need'],
  ['target', 'Choose and', 'stand out', 'zoya', 'Serve busy parents: the healthy tiffin sweet'],
  ['package', 'Make the', 'right offer', 'nani', 'Small laddoos, a fair price, sold door to door'],
  ['heart', 'Build', 'relationships', 'rao', "Mrs. Rao's pack is ready every week"],
  ['coin', 'Capture', 'value', 'arjun', 'Arjun counts sales, profit and regular families']];
$('#p5').innerHTML = P5.map(([ic, a, b], i) => `<div class="st5" id="pst${i}" style="left:${160 + i * 326}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div></div>` + (i < 4 ? `<div class="cx" id="cx${i}" style="left:${454 + i * 326}px">${M.icon('arrowR', 18, C.gold, 2.6)}</div>` : '')).join('');
$('#pePans').innerHTML = [[null, 'The marketing process', 'From a need to a loyal customer']].concat(P5.map((p, i) => [p[3], `STEP 0${i + 1} · AT LADDOO LAB`, p[4]])).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${k ? l : 'KOTLER AND ARMSTRONG · 5 STEPS'}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('repeat', 36, C.gold, 2.2)}</div>`}<div class="pt2">${k ? x : 'From a need to a loyal customer'}</div></div>`).join('');

// K: at work today
const KA = [
  ['search', 'Needs', 'Ask before you make', 'Zoya asks parents before Nani cooks', 'phone', 'A phone maker asks users what annoys them'],
  ['award', 'Value', 'More good for the price', 'Healthy, tasty and ready for the tiffin', 'bank', 'A bank opens your account on your phone'],
  ['swap', 'Exchange', 'Both sides must win', 'A healthy snack for ₹120 a pack', 'store', 'A bakery sells fresh bread at a fair price'],
  ['repeat', 'Relationships', 'Bring people back', 'Mrs. Rao orders again every week', 'phone', 'A delivery app remembers your favourite order'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['MARKETING TODAY', 'Four ideas', 'You will see them in every business', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO A BANK</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same ideas, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['search', 'Find what you need'], ['trendUp', 'Small makers grow']];
const XH = [['ban', 'False claims'], ['trendDown', 'Needless buying']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pkL').innerHTML = [64, 100, 136].map(x => laddoo(x, 256, 16)).join('');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('scale', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Selling', 'Marketing', 'Advertising', 'Production'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('search', 44, C.gold2, 2.4);
// recap
const ROWS = [['search', 'Find the need, serve it better', ['Better than others']], ['swap', 'Exchange: value for money', ['Value', 'Money']], ['repeat', 'Build relationships', ['They come back']]];
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
// step pill of a run
const pill = (k, t, ic, tx, tm, bad, fin) => {
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
const bars = (k, sold, left) => {
  const g = $('#sg' + k + '0'), r = $('#sg' + k + '1'), gw = 688 * sold / 50, rw = 688 * left / 50;
  g.style.left = '0px'; g.style.width = gw.toFixed(1) + 'px'; g.style.background = C.gold;
  r.style.left = (688 - rw).toFixed(1) + 'px'; r.style.width = rw.toFixed(1) + 'px'; r.style.background = C.red2;
};
const boxHi = (id, state) => { // 0 idle, 1 active, 2 done
  const g = $('#' + id), r = g.querySelector('rect');
  attr(r, 'stroke', state ? C.gold : C.line); attr(r, 'stroke-width', state ? 4 : 2); attr(r, 'fill', state === 2 ? C.gold3 : '#FFFFFF');
};
// selling run: walkers past the stall at the college gate
const walkX = (i, t) => {
  const s = t - tw[i]; if (s < 0) return null;
  if (!STOP.includes(i)) return X0 + V * s;
  if (s < dStop) return X0 + V * s; if (s < dStop + 0.9) return 344; return 344 + V * (s - dStop - 0.9);
};
const soldL = t => STOP.reduce((a, i) => a + 4 * M.io((t - tw[i] - dStop - 0.25) / 0.35), 0);
const runL = t => {
  for (let i = 0; i < WALK; i++) {
    const g = $('#wk' + i), x = walkX(i, t);
    if (x === null || x > 730) { M.hide(g, true); continue; }
    M.hide(g, false); attr(g, 'transform', `translate(${x.toFixed(1)} 218)`);
    const buy = STOP.includes(i) && t > tw[i] + dStop + 0.2;
    attr(g.querySelector('circle'), 'fill', buy ? C.gold : C.ink2);
  }
  const sold = soldL(t), n = Math.round(sold), done = t >= tM4;
  const zx = M.lerp(609, 344, M.io((t - tWaits) / 0.8));
  attr($('#avZL'), 'transform', `translate(${zx.toFixed(1)} 150)`);
  M.setT($('#rdL'), `${n} sold`); $('#rdL').style.color = done ? C.red : C.ink;
  M.setT($('#sbLbox').querySelector('.bt'), `${50 - n} LEFT`);
  boxHi('sbLstall', t >= tWaits + 0.6 && !done ? 1 : 0); boxHi('sbLbox', t >= tMakes && t < tWaits ? 1 : 0);
  const lf = 42 * M.o3((t - tM4 - 0.1) / 0.8);
  bars('L', sold, lf);
  if (done) pill('L', t, 'x', '42 left over', '8 sold', 1, 1);
  else if (t >= tM3) pill('L', t, 'users', 'Most people walk past', '', 1, 0);
  else if (t >= tWaits) pill('L', t, 'cap', 'Wait at the college gate', '', 0, 0);
  else if (t >= tMakes) pill('L', t, 'laddoo', 'Make 50 big laddoos', '', 0, 0);
  else pill('L', t, 'clock', 'Ready', '', 0, 0);
  return sold;
};
// marketing run: ask first (Zoya), then Arjun door to door
const DX = [76, 210, 344, 478, 612];
const tv = [tAsks - 0.15, tAsks + 0.75, tAsks + 1.65];
const zTrack = M.track(76, [[tv[1] - 0.5, 210], [tv[2] - 0.5, 344]], M.SOFT);
const tA = DX.map((_, i) => tArjun + 0.45 + i * (tSoldR - tArjun - 0.45) / 4);
const aTrack = M.track(76, DX.slice(1).map((x, i) => [tA[i + 1] - 0.5, x]), M.SOFT);
const soldR = t => tA.reduce((a, ta) => a + 9.2 * M.io((t - ta) / 0.3), 0);
const runR = t => {
  const done = t >= tSoldR + 0.25, sold = soldR(t), n = Math.round(sold);
  const zx = zTrack(t), ax = aTrack(t);
  attr($('#avZR'), 'transform', `translate(${zx.toFixed(1)} 150)`); attr($('#avAR'), 'transform', `translate(${ax.toFixed(1)} 150)`);
  const zo = 1 - M.clamp((t - tArjun) / 0.25), ao = M.clamp((t - tArjun) / 0.25);
  $('#avZR').style.opacity = zo.toFixed(3); M.hide($('#avZR'), zo <= 0); $('#avAR').style.opacity = ao.toFixed(3); M.hide($('#avAR'), ao <= 0);
  DX.forEach((_, i) => {
    const asking = i < 3 && t >= tv[i] && t < tv[i] + 0.85, sd = t >= tA[i];
    boxHi('sbR' + i, sd ? 2 : (asking ? 1 : 0));
    M.setT($('#sbR' + i).querySelector('.bt'), sd ? 'SOLD' : 'FLAT ' + (i + 1));
    attr($('#sbR' + i).querySelector('.bt'), 'fill', sd ? C.gold : C.muted);
    const bi = $('#sbR' + i).querySelector('.bi'); if (bi._s !== sd) { bi._s = sd; bi.innerHTML = M.icon(sd ? 'check' : 'home', 28, sd ? C.gold : C.ink, sd ? 2.8 : 2.2); }
  });
  M.setT($('#rdR'), `${n} sold`); $('#rdR').style.color = done ? C.gold : C.ink;
  bars('R', sold, 4 * M.o3((t - tSoldR - 0.3) / 0.6));
  if (done) pill('R', t, 'check', '46 sold', '4 left', 0, 1);
  else if (t >= tArjun) pill('R', t, 'home', 'Arjun goes door to door', '', 0, 0);
  else if (t >= tM7) pill('R', t, 'laddoo', 'Nani makes small laddoos', '', 0, 0);
  else if (t >= tM6) pill('R', t, 'heart', 'Need: a healthy tiffin sweet', '', 0, 0);
  else pill('R', t, 'message', 'Ask the parents first', '', 0, 0);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const cl = $('#cLeft'); cl.style.left = (884 - cl.offsetWidth) + 'px';
  // kitchen tags sit beside the two figures while the card is full width
  const tz = $('#tgZ'); tz.style.left = (128 - tz.offsetWidth) + 'px'; $('#tgN').style.left = '648px';
  for (let i = 0; i < 2; i++) { const g = $('#ig' + i); g.querySelector('.id').style.left = (88 + g.querySelector('.in').offsetWidth + 16) + 'px'; }
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  const gl = $('#gLeft'); gl.style.left = (392 - gl.offsetWidth / 2) + 'px';
  let tot = 0; const nds = [0, 1, 2].map(i => $('#nd' + i)); nds.forEach(n => tot += n.offsetWidth); tot += 32;
  x = 344 - tot / 2; nds.forEach(n => { n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  $('#druB').style.left = (64 + $('#druN').offsetWidth + 28) + 'px';
  x = 64; for (let i = 0; i < 3; i++) { const p = $('#dp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; if (i < 2) { $('#da' + i).style.left = x + 'px'; x += 76; } }
  // exchange chips park on the lanes
  const k0 = $('#xk0'), k1 = $('#xk1'), k2 = $('#xk2'), t2 = k0.offsetWidth + k1.offsetWidth + 16;
  geo.xk = [[178, 392 - t2 / 2, 172], [178, 392 - t2 / 2 + k0.offsetWidth + 16, 172], [606 - k2.offsetWidth, 392 - k2.offsetWidth / 2, 396]];
  const wn = $('#win'); wn.style.left = (392 - wn.offsetWidth / 2) + 'px';
  document.querySelectorAll('.st5 .s1, .st5 .s2').forEach(el => { if (el.offsetWidth > 238) el.style.fontSize = Math.floor(32 * 238 / el.offsetWidth) + 'px'; });
  const b0 = $('#bkl0'), b1 = $('#bkl1'); b0.style.left = (160 + 636 - b0.offsetWidth / 2) + 'px'; b1.style.left = (160 + 1451 - b1.offsetWidth / 2) + 'px';
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : t < tT ? [tM1 + 0.4, tMout] : [tE3 - 0.1, tEout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: fifty laddoos, eight sold ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 50; i++) {
      const el = $('#g' + i), ta = tMorph + 0.55 + i * 0.018;
      M.vis(el, t, ta, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const s = i < 8 ? M.io((t - tEight - i * 0.04) / 0.25) : 0, l = i >= 8 ? M.io((t - tEight - 0.55 - (i - 8) * 0.012) / 0.25) : 0;
      el.style.background = mix(mix(C.ld, C.gold, s), C.red2, l);
      el.style.boxShadow = s > 0.5 ? '0 0 0 3px ' + C.gold3 : 'none';
    }
    M.vis($('#cSold'), t, tEight - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.count($('#cSoldN'), t, tEight, 0.5, 0, 8);
    M.vis($('#cLeft'), t, tEight + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tGreat - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tGreat + 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt2'), t, tAsked - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tNever - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: meet Laddoo Lab ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tZoya - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tNani - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#ig0'), t, tRagi - 0.05, 1e9, { dy: 16 }); M.vis($('#ig1'), t, tJag - 0.05, 1e9, { dy: 16 });
    M.vis($('#nrs'), t, tCane + 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    const tTv = [tL3 + 0.3, tL3 + 0.42, tArj - 0.05, tDev - 0.05];
    TEAM.forEach((_, i) => {
      M.vis($('#tv' + i), t, tTv[i], 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i), t, tTv[i] + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, tTv[i] + 0.14, 1e9, { dy: 8 });
      const on = i >= 2 ? M.io((t - tTv[i]) / 0.25) * (1 - (i === 2 ? M.io((t - tDev + 0.05) / 0.25) : 0)) : 0;
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, on);
    });
  }

  /* ===== D: what is marketing ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Philip') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Gary') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'Principles') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tD3 - i * 0.45) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#vt0'), t, tGood - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#vgt'), t, tPay - 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    M.vis($('#vt1'), t, tPay - 0.05, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#vgood'), t, tPay + 0.5, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#vt0').style.background = mix(C.paper, C.gold3, M.io((t - tPay - 0.5) / 0.3));
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: selling vs marketing ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM5 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM5 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM5 + 0.3;
      const root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
    ['sbLgate', 'sbLstall', 'sbLbox'].forEach((id, i) => { $('#' + id).style.opacity = M.clamp((t - tM1 - 0.55 - i * 0.07) / 0.1); });
    [0, 1, 2, 3, 4].forEach(i => { $('#sbR' + i).style.opacity = M.clamp((t - tM5 - 0.55 - i * 0.07) / 0.1); });
    $('#avZL').style.opacity = M.clamp((t - tM1 - 0.7) / 0.12).toFixed(3);
    const sold = runL(t); runR(t);
    for (let i = 0; i < 3; i++) M.vis($('#nd' + i), t, tNeed[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // live gauge for the selling way
    M.vis($('#gv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.drawU($('#gArc'), sold / 50); M.drawU($('#gArcR'), M.o3((t - tM4 - 0.1) / 0.8));
    M.vis($('#gN'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#gN'), String(Math.round(sold)));
    M.vis($('#gOf'), t, tM1 + 0.6, 1e9, { dy: 8 }); M.vis($('#gWay'), t, tM1 + 0.65, 1e9, { dy: 8 });
    M.vis($('#gLeft'), t, tM4 + 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== U: Drucker ===== */
  const uOn = t >= tTu - 0.05 && t < tE1 + 0.2; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#dru'), t, tU + 0.02, tUout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#dqI'), t, tU + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#druHr'), t, tU + 0.3, 1e9, { dy: 0 });
    M.rise($('#druN'), t, tU + 0.3, { st: 0.06, sp: M.HEAVY }); M.vis($('#druB'), t, tU + 0.6, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) M.vis($('#dl' + i), t, tDl[i] - 0.1, 1e9, { dy: 16 });
    tDk.forEach((tk, i) => { $('#dk' + i).style.color = mix(C.ink, C.gold, M.io((t - tk + 0.05) / 0.3)); });
    const tdp = [tDk[0], tFits, tDk[2]];
    for (let i = 0; i < 3; i++) { M.vis($('#dp' + i), t, tdp[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); if (i < 2) M.vis($('#da' + i), t, tdp[i + 1] - 0.2, 1e9, { dx: -12, dy: 0, fade: 0.15 }); }
  }

  /* ===== E: exchange + relationship ===== */
  const eOn = t >= tE1 - 0.1 && t < tP0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    const exc = $('#ex'); M.vis(exc, t, tE1 + 0.1, tEout, { dy: 36, ...o }); grow(exc, $('#exOut'), t, tE2);
    const win = M.io((t - tE5) / 0.3);
    for (let i = 0; i < 2; i++) {
      const n = $('#xn' + i); M.vis(n, t, tE1 + 0.3 + i * 0.12, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      n.style.boxShadow = '0 0 0 5px ' + mix(C.ink, C.gold, win);
      M.vis($('#xm' + i), t, tE1 + 0.4 + i * 0.12, 1e9, { dy: 10 });
    }
    M.draw($('#ln0'), t, tGive - 0.1, 0.5, M.o3); M.vis($('#ah0'), t, tGive + 0.3, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#xl0'), t, tGive, 1e9, { dy: 10 });
    M.draw($('#ln1'), t, tGet - 0.1, 0.5, M.o3); M.vis($('#ah1'), t, tGet + 0.3, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#xl1'), t, tGet, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      const el = $('#xk' + i), [x0, x1, y] = geo.xk[i], p = M.spring(t - tXk[i], M.HEAVY);
      M.vis(el, t, tXk[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      snap(el, (p >= 1 ? x1 : M.lerp(x0, x1, p).toFixed(1)) + 'px', 'left'); el.style.top = y + 'px';
      el.style.background = i < 2 ? C.gold : C.ink; el.style.color = '#fff';
    }
    M.vis($('#win'), t, tE5 - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#tf'), t, tE2 + 0.12, tBec - 0.1, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#tfImg'), t, tE2 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rl'), t, tBec + 0.15, tEout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 4; i++) {
      const el = $('#wk' + i + 'x'), tl = tComes + i * (tThat - tComes) / 4;
      M.vis(el, t, tBec + 0.35 + i * 0.06, 1e9, { dy: 16 });
      const on = M.io((t - tl) / 0.25);
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      const zt = el.querySelector('.zt'); zt.style.color = mix(C.paper, C.gold2, on);
      setIco(el.querySelector('.zi'), on > 0.5 ? 'check' : 'laddoo', on > 0.5 ? C.gold2 : C.dim, 44, 2.2);
    }
    M.draw($('#loopP'), t, tWeek - 0.1, 0.8, M.o3); M.vis($('#loopA'), t, tWeek + 0.6, 1e9, { dy: 0, fade: 0.1 });
    M.rise($('#rlT'), t, tComes - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#rlP'), t, tRel - 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== P: the marketing process ===== */
  const pOn = t >= tP0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P5.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 4 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      if (i < 4) M.vis($('#cx' + i), t, tP0 + 0.3 + i * 0.07, tPout, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      const tc = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s1').style.color = tc; el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.draw($('#bk0'), t, tP[4] + 0.2, 0.6, M.o3); M.draw($('#bk1'), t, tP[4] + 0.5, 0.5, M.o3);
    M.vis($('#bkl0'), t, tP[4] + 0.4, tPout, { dy: 8, ...o }); M.vis($('#bkl1'), t, wt('P5', 'value') - 0.05, tPout, { dy: 8, ...o });
    M.hide($('#brk'), t > tPout + 0.3);
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 6; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 5 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
    }
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
    M.vis($('#pack'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#clm0'), t, tSugar - 0.05, tRef - 0.1, { dy: 0, fade: 0.15, outDur: 0.2, ody: 0 });
    M.draw($('#strk'), t, tStill - 0.05, 0.35, M.o3); if (t > tRef - 0.1) M.hide($('#strk'), true);
    M.vis($('#clm1'), t, tRef + 0.05, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tRef - 0.3) / 0.12); $('#pkOk').style.opacity = u.toFixed(3); M.hide($('#pkOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tNaniX, tTrue][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tStill ? C.redBg : C.paper; $('#bb0').style.color = t > tStill ? C.red : C.ink;
    M.vis($('#fact'), t, tAct - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
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
