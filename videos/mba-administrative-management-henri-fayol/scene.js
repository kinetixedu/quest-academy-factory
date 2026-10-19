// MBA - Principles of Management, Ep 09: Administrative Management - Henri Fayol
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  calculator: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M8 6h8', 'M16 14v4', 'M16 10h.01', 'M12 10h.01', 'M8 10h.01', 'M12 14h.01', 'M8 14h.01', 'M12 18h.01', 'M8 18h.01'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  heartPulse: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z', 'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  badge: ['M16 10h2', 'M16 14h2', 'M6.17 15a3 3 0 0 1 5.66 0', 'M11 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z', 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tAsha = wt('H2', 'Asha'), tRavi = wt('H2', 'Ravi'), tKabir = wt('H2', 'Kabir');
const tC1 = T0('C1'), tWash = wt('C1', 'wash'), tMoney = wt('C1', 'money'), tShort = wt('C2', 'short');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D2') - 0.32;
// D: Henri Fayol
const tD2 = T0('D2'), tHenri = wt('D2', 'Henri'), tFrench = wt('D2', 'French'), tD3 = T0('D3'), t1888 = wt('D3', '1888'), tBust = wt('D3', 'bust');
const tD4 = T0('D4'), tThirty = wt('D4', 'thirty'), tBiggest = wt('D4', 'biggest'), tD5 = T0('D5'), t1916 = wt('D5', '1916'), tBook = wt('D5', 'book');
const tFather = wt('D6', 'father'), tDout = T0('B1') - 0.32;
// B: six kinds of work
const tB1 = T0('B1'), tBFay = wt('B1', 'Fayol'), tBComp = wt('B1', 'company'), tSix = wt('B1', 'six');
const tSk = ['Technical', 'commercial', 'financial', 'security', 'accounting'].map(w => wt('B2', w)).concat([wt('B3', 'managing')]);
const tTaught = wt('B3', 'taught'), tBout = T0('M1') - 0.32;
// M: definition
const tM1 = T0('M1'), tM2 = T0('M2'), tRun = wt('M2', 'running'), tWhole = wt('M2', 'whole'), tClear = wt('M2', 'clear');
const tM3 = T0('M3'), tMTay = wt('M3', 'Taylor'), tMFay = wt('M3', 'Fayol'), tMout = T0('F0') - 0.32;
// F: the five functions on one Saturday
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6].map(i => T0('F' + i)), tFout = T0('P0') - 0.32;
const tFtwo = wt('F1', 'two'), tFst = [wt('F2', 'stove'), wt('F2', 'cash'), wt('F2', 'sink')];
const tTells = wt('F3', 'tells'), tEach = wt('F3', 'each'), tMove = wt('F4', 'move');
const tNight = wt('F5', 'night'), tEighty = wt('F5', 'eighty'), tChanges = wt('F6', 'changes'), tCycle = wt('F6', 'cycle');
// P: 14 principles
const tP0 = T0('P0'), tPg = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tPw = [
  [wt('P1', 'Division'), wt('P1', 'authority'), wt('P1', 'centralisation')],
  [wt('P2', 'Unity'), wt('P2', 'unity', 1), wt('P2', 'scalar')],
  [wt('P3', 'Discipline'), wt('P3', 'order', 1), wt('P3', 'common')],
  [wt('P4', 'Fair'), wt('P4', 'equity'), wt('P4', 'steady'), wt('P4', 'initiative'), wt('P4', 'team')],
];
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'employee'), wt('K3', 'team'), wt('K4', 'leave'), wt('K5', 'sales')];
// X: the limits
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX5 = T0('X5'), tX7 = T0('X7'), tX8 = T0('X8');
const tXg = [wt('X2', 'Clear'), wt('X2', 'boss'), wt('X2', 'ideas')], tXh = [wt('X3', 'chair'), wt('X3', 'feel'), wt('X5', 'clash')];
const tProv = wt('X5', 'proverbs'), tX6 = T0('X6'), tAdvice = wt('X6', 'advice'), tFlex = wt('X7', 'flexible'), tXout = tX8 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Each');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['plans', 'organises', 'commands', 'coordinates', 'controls'].map(w => wt('S2', w)), ['roles', 'boss', 'fair'].map(w => wt('S3', w)), [wt('S4', 'judgement')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A: orders + what goes wrong
['R', 'A', 'K'].forEach(k => { $('#oa' + k).style.cssText += ';' + FACE({ R: 'ravi', A: 'asha', K: 'kabir' }[k]); });
$('#opRI').innerHTML = M.icon('cup', 22, C.gold, 2.4); $('#opKI').innerHTML = M.icon('droplet', 22, C.red, 2.4);
$('#clash').innerHTML = M.icon('x', 20, '#fff', 3);
const WR = [['droplet', 'WASHED TWICE', 'Same cups'], ['calculator', 'NOT COUNTED', 'The money'], ['coin', 'BY EVENING', 'Cash short']];
$('#wrong').innerHTML = WR.map(([ic, n, v], i) => `<div class="wt" id="wt${i}" style="left:${36 + i * 286}px"><div class="wn">${n}</div><div class="wi">${M.icon(ic, 40, i === 2 ? C.red : C.ink, 2.2)}</div><div class="wv">${v}</div></div>`).join('');
// D
wrap($('#tay'), 'tayIn', 616, 580); wrap($('#co'), 'coIn', 920, 274); wrap($('#bk'), 'bkIn', 920, 274);
$('#fatherI').innerHTML = M.icon('award', 26, '#fff', 2.2);
$('#cc0I').innerHTML = M.icon('trendDown', 24, C.red, 2.4); $('#cc1I').innerHTML = M.icon('award', 24, '#fff', 2.4);
// B: six kinds of work
const SK = [['gear', 'Technical', 'Brewing the chai'], ['tag', 'Commercial', 'Buying milk, selling cups'], ['coin', 'Financial', 'Finding money to grow'],
  ['shield', 'Security', 'Keeping the stall safe'], ['calculator', 'Accounting', 'Counting every rupee'], ['users', 'Managing', 'Running the whole team']];
$('#skT').innerHTML = SK.map(([ic, n, s], i) => `<div class="sk" id="sk${i}" style="left:${48 + (i % 2) * 352}px;top:${96 + Math.floor(i / 2) * 152}px"><div class="si"></div><div class="sn">${n}</div><div class="ss"><span class="ssi"></span><span class="sst">${s}</span></div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// M: definition diagrams
const icoG = (n, x, y, sc, col, sw) => `<g transform="translate(${x} ${y}) scale(${sc})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${M.IC[n].map(d => `<path d="${d}"/>`).join('')}</g>`;
const orgSvg = (w, on) => { // small org chart: 1 - 2 - 4 boxes
  const b = (x, y, c, id) => `<rect ${id ? `id="${id}"` : ''} x="${x}" y="${y}" width="40" height="28" rx="7" fill="${c}"/>`;
  const L = '#C9BFAE';
  return `<g fill="none" stroke="${L}" stroke-width="3"><path d="M${w / 2} 42 V60 M${w / 2 - 52} 60 H${w / 2 + 52} M${w / 2 - 52} 60 V76 M${w / 2 + 52} 60 V76 M${w / 2 - 52} 104 V118 M${w / 2 + 52} 104 V118 M${w / 2 - 78} 118 H${w / 2 - 26} M${w / 2 + 26} 118 H${w / 2 + 78} M${w / 2 - 78} 118 V132 M${w / 2 - 26} 118 V132 M${w / 2 + 26} 118 V132 M${w / 2 + 78} 118 V132"/></g>` +
    b(w / 2 - 20, 14, on ? C.ink : C.paper2) + b(w / 2 - 72, 76, on ? C.gold : C.paper2) + b(w / 2 + 32, 76, on ? C.gold : C.paper2) +
    [-98, -46, 6, 58].map(dx => b(w / 2 + dx, 132, on ? C.gold2 : C.paper2)).join('');
};
$('#defS').innerHTML = `<g id="defG">${orgSvg(220, true)}</g>`;
$('#cmpFS').innerHTML = `<g transform="translate(-14 14)">${orgSvg(220, true)}</g>`;
$('#cmpTS').innerHTML = `<g transform="translate(0 10)"><rect x="0" y="0" width="192" height="172" rx="24" fill="#F5F1E8"/>
  ${icoG('user', 40, 26, 4, C.ink2, 1.4)}${icoG('search', 92, 72, 3.4, C.gold, 1.8)}</g>`;
wrap($('#def'), 'defOut', 1600, 580);
wrap($('#fR'), 'fROut', 784, 580);

/* F: five functions ring + Ravi's Saturday */
const FN = [['calendar', 'Planning', 'Looking ahead'], ['network', 'Organising', 'Putting people in place'], ['megaphone', 'Commanding', 'Giving clear orders'],
  ['link', 'Coordinating', 'Making the work fit together'], ['gauge', 'Controlling', 'Checking against the plan']];
const RC = [392, 300], RR = 150;
const NP = FN.map((_, i) => { const a = (-90 + i * 72) * Math.PI / 180; return [RC[0] + RR * Math.cos(a), RC[1] + RR * Math.sin(a)]; });
$('#ringS').innerHTML = `<circle cx="${RC[0]}" cy="${RC[1]}" r="${RR}" fill="none" stroke="#EEE8DB" stroke-width="10"/>
  <circle id="ringP" cx="${RC[0]}" cy="${RC[1]}" r="${RR}" fill="none" stroke="#B8862F" stroke-width="10" stroke-linecap="round" transform="rotate(-90 ${RC[0]} ${RC[1]})"/>` +
  `<circle id="fTok" r="11" fill="#B8862F" stroke="#FFFFFF" stroke-width="4"/>` +
  NP.map(([x, y], i) => `<g id="fn${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="42" fill="#F5F1E8" stroke="#FFFFFF" stroke-width="6"/><g class="fni" transform="translate(-16 -16)"></g></g>`).join('');
// labels outside the ring
const FLP = [[NP[0][0], NP[0][1] - 84, 'c'], [NP[1][0] + 58, NP[1][1] - 14, 'l'], [NP[2][0], NP[2][1] + 50, 'c'], [NP[3][0], NP[3][1] + 50, 'c'], [NP[4][0] - 58, NP[4][1] - 14, 'r']];
$('#fLbls').innerHTML = FN.map((f, i) => `<div class="fl" id="fl${i}">${f[1]}</div>`).join('');
// right card: Ravi's Saturday
const STN = [['flame', 'STOVE', 40], ['coin', 'CASH', 289], ['droplet', 'SINK', 538]];
const STAND = [[95, 142], [344, 142], [593, 142]], WAIT = [[282, 214], [344, 214], [406, 214]];
const STAFF = ['asha', 'kabir', 'meena'], ORD = ['Brew', 'Collect', 'Wash'];
const LOOP = 'M95 206 H593 A16 16 0 0 1 593 238 H95 A16 16 0 0 1 95 206 Z';
$('#fCIn').innerHTML = `<div class="mav" id="fRav" style="${FACE('ravi')};box-shadow:0 0 0 3px #B8862F"></div><div class="lbl mlb">RAVI'S SATURDAY</div><div class="serif mrd" id="fClk">Fri 5 PM</div>
  <svg class="mplan" id="fPlan" width="688" height="260"><defs>${STAFF.map((s, i) => `<clipPath id="fac${i}"><circle cx="0" cy="0" r="26"/></clipPath>`).join('')}</defs>
    <rect width="688" height="260" rx="24" fill="#F5F1E8"/>
    ${STN.map(([ic, n, x], i) => `<g id="fs${i}" transform="translate(${x} 16)"><rect width="110" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g transform="translate(41 12)">${M.icon(ic, 28, C.ink, 2.2)}</g><text x="55" y="68" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${n}</text></g>`).join('')}
    <path id="fLoop" d="${LOOP}" fill="none" stroke="#D9CFBC" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
    <g id="fToks">${Array.from({ length: 10 }, (_, i) => `<circle id="ftk${i}" r="9" stroke-width="3"/>`).join('')}</g>
    ${ORD.map((o, i) => `<g id="fo${i}"><rect x="-44" y="-15" width="88" height="30" rx="15" fill="#14213D"/><text x="0" y="5" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" fill="#FFFFFF">${o}</text></g>`).join('')}
    ${STAFF.map((s, i) => `<g id="fa${i}"><circle id="far${i}" r="30" fill="#14213D"/><image href="${IMG}${s}-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#fac${i})"/></g>`).join('')}
  </svg>
  <div class="mbar" id="fBar"><i id="fSold"></i><i id="fGap"></i></div>
  <div class="mtk" id="fTk0" style="left:48px">SOLD 0</div><div class="mtk" id="fTk1" style="right:48px">PLAN 200 CUPS</div>
  <div class="mst" id="fSt"><span class="msi"></span><span class="mtx"></span></div>`;

/* P: 14 principles in 4 groups (Fayol's own numbers) */
const PG = [
  ['WHO DOES WHAT', 'split', [['01', 'Division of work', 'One job each, done well'], ['02', 'Authority and responsibility', 'Power comes with duty'], ['08', 'Centralisation', 'How much the top decides']]],
  ['WHO GIVES ORDERS', 'network', [['04', 'Unity of command', 'One boss for each person'], ['05', 'Unity of direction', 'One plan for one goal'], ['09', 'Scalar chain', 'One clear line, top to bottom']]],
  ['RULES AND ORDER', 'clipboard', [['03', 'Discipline', 'Respect the agreed rules'], ['10', 'Order', 'A place for everything'], ['06', 'Common interest first', 'The team before the self']]],
  ['CARING FOR PEOPLE', 'heart', [['07', 'Remuneration', 'Fair pay'], ['11', 'Equity', 'Fair and kind to all'], ['12', 'Stability of tenure', 'Keep good people'], ['13', 'Initiative', 'Let people suggest ideas'], ['14', 'Esprit de corps', 'Team spirit']]],
];
const PEX = [['Asha brews, Kabir counts,', 'Meena washes'], ['Asha listens only', 'to Ravi'], ['Cups always go back', 'on the same shelf']];
$('#pGrid').innerHTML = PEX.map(([a, b], i) => `<div class="pex" id="pex${i}" style="left:${36 + i * 388}px"><div class="lbl" style="left:20px;top:18px">AT CHAI CORNER</div><div class="pxt" style="top:48px">${a}</div><div class="pxt" style="top:80px">${b}</div></div>`).join('') + PG.map(([g, ic, ps], i) => `<div class="gh" id="gh${i}" style="left:${36 + i * 388}px"><div class="gn">${i + 1}</div><div class="gt">${g}</div></div>` +
  ps.map(([n, a, b], j) => `<div class="pt2" id="pt${i}${j}" style="left:${36 + i * 388}px;top:${140 + j * 80}px"><div class="pn2">${n}</div><div class="pa">${a}</div><div class="pb">${b}</div></div>`).join('')).join('');

// K: at work today
const KA = [
  ['split', 'Division of work', 'One job each, done well', 'Asha brews, Kabir takes cash, Meena washes', 'heartPulse', 'Surgeons, nurses and lab staff each do their part'],
  ['user', 'Unity of command', 'Orders from one boss only', 'Asha now takes orders only from Ravi', 'badge', 'A new employee reports to one manager'],
  ['network', 'Scalar chain', 'One clear line, plus a shortcut', 'Stove helper asks cash helper, Ravi agrees', 'link', 'Gang plank: two team leads talk directly'],
  ['scale', 'Equity', 'Fair and kind to everyone', 'Same rules and breaks for all six', 'calendar', 'The same leave rules for every employee'],
  ['heart', 'Esprit de corps', 'French for team spirit', 'Ravi praises the whole team together', 'trophy', 'A sales team celebrates a big month together'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['FAYOL TODAY', 'Five key rules', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same rules, any size of team</span></div>`) + `</div>`).join('');

// X: the limits
const XG = [['check', 'Clear roles'], ['user', 'One boss each'], ['store', 'Fits any organisation']];
const XH = [['arrowD', 'Seen from the top'], ['heart', 'Little on feelings'], ['x', 'Some rules clash']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xp0I').innerHTML = M.icon('user', 24, C.ink, 2.4); $('#xp1I').innerHTML = M.icon('search', 24, C.ink, 2.4);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Division of work', 'Unity of command', 'Scalar chain', 'Equity'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('user', 44, C.gold2, 2.4);
// recap
const ROWS = [['refresh', 'Five functions', ['Plan', 'Organise', 'Command', 'Coordinate', 'Control']], ['network', 'Fourteen principles', ['Clear roles', 'One boss', 'Fair treatment']], ['scale', 'Rules, with judgement', ['Flexible']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const fadeG = (el, t, tin, tout = 1e9, d = 0.15) => { const op = M.clamp((t - tin) / d) * (1 - M.clamp((t - tout) / 0.25)); M.hide(el, op <= 0.001); el.style.opacity = op.toFixed(3); };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink, w1 = 784) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, w1, sh);
  snap(card, (sh >= 1 ? w1 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - w1) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// a card that starts at full height (580) and shrinks to 274 when the card below arrives
const growH = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), h = M.lerp(580, 274, sh);
  snap(card, (sh >= 1 ? 274 : h.toFixed(1)) + 'px', 'height');
  snap(inner, (sh >= 1 ? 0 : ((h - 274) / 2).toFixed(1)) + 'px', 'top');
};
const fLoop = $('#fLoop'), LOOPL = fLoop.getTotalLength();
const stepOf = t => { let s = -1; tF.forEach((a, i) => { if (t >= a - 0.05) s = i; }); return s; };
const hourLbl = h => { const hh = Math.floor(h); return `Sat ${hh > 12 ? hh - 12 : hh} ${hh >= 12 ? 'PM' : 'AM'}`; };
// the five functions: ring, token, labels, and Ravi's Saturday at time t
const runSat = t => {
  const s = stepOf(t);
  // ring progress (0..5 = one full lap)
  const pr = M.track(0, [...tF.slice(1, 5).map((a, i) => [a - 0.05, i + 1]), [tChanges, 5]], M.SOFT)(t);
  M.drawU($('#ringP'), pr / 5); M.hide($('#ringP'), pr < 0.01);
  const a = (-90 + pr * 72) * Math.PI / 180, tok = $('#fTok');
  setA(tok, 'transform', `translate(${(RC[0] + RR * Math.cos(a)).toFixed(1)} ${(RC[1] + RR * Math.sin(a)).toFixed(1)})`);
  fadeG(tok, t, tF[0] - 0.1);
  const lap = t >= tCycle - 0.1;
  FN.forEach(([ic], i) => {
    const g = $('#fn' + i), act = s === i || (lap && t >= tCycle + i * 0.08), done = s > i;
    const c = g.querySelector('circle'), fill = act ? C.ink : (done ? C.gold3 : C.paper);
    if (c._f !== fill) { c._f = fill; c.setAttribute('fill', fill); }
    const ico = g.querySelector('.fni'), col = act ? C.gold2 : (done || s === -1 ? C.gold : C.dim), k = ic + col;
    if (ico._k !== k) { ico._k = k; ico.innerHTML = M.icon(ic, 32, col, 2.2).replace('<svg', '<svg x="0" y="0"'); }
    const l = $('#fl' + i); l.style.color = act ? C.ink : (done ? C.ink2 : (s === -1 ? C.ink2 : C.dim));
  });
  const idx = lap ? 0 : Math.max(0, s > 4 ? 4 : s);
  M.setT($('#fNum'), '0' + (idx + 1)); M.setT($('#fOf'), lap ? 'AND AGAIN' : 'OF 5');
  const mean = lap ? 'Then plan again: it is a cycle' : (s < 0 ? 'Every manager does five jobs' : (s > 4 ? 'Check, then improve the plan' : FN[s][2]));
  M.setT($('#fMean'), mean);
  // clock
  let clk = 'Fri 5 PM';
  if (s === 0) clk = 'Fri 6 PM'; else if (s === 1) clk = 'Sat 6 AM'; else if (s === 2) clk = 'Sat 7 AM';
  else if (s === 3) clk = hourLbl(M.lerp(8, 20, M.clamp((t - tF[3]) / (tNight - tF[3]))));
  else if (s === 4) clk = t < tNight ? 'Sat 8 PM' : 'Sat 9 PM'; else if (s === 5) clk = 'Next Fri';
  M.setT($('#fClk'), clk);
  // staff walk from the waiting spot to their stations
  STAFF.forEach((_, i) => {
    const mv = M.spring(t - tFst[i] + 0.05, M.SOFT), p0 = WAIT[i], p1 = STAND[i];
    const x = M.lerp(p0[0], p1[0], mv), y = M.lerp(p0[1], p1[1], mv) - 18 * Math.sin(Math.PI * M.clamp(mv));
    setA($('#fa' + i), 'transform', mv >= 1 ? `translate(${p1[0]} ${p1[1]})` : `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    const ok = M.io((t - tTells - 0.25 - i * 0.35) / 0.25);
    const rc = mix(C.ink, C.gold, ok); const r = $('#far' + i); if (r._f !== rc) { r._f = rc; r.setAttribute('fill', rc); }
    // instruction chips (command), gone once the flow starts
    const ch = $('#fo' + i), ci = tTells + 0.2 + i * 0.35;
    setA(ch, 'transform', `translate(${STAND[i][0]} ${STAND[i][1] + 46})`);
    fadeG(ch, t, ci, tF[3] + 0.1, 0.12);
    // station highlight while the person walks to it
    const on = (t >= tFst[i] && t < tF[2]) || (s === 3 && t < tNight);
    const sr = $('#fs' + i).querySelector('rect'), sc = on ? C.gold : C.line;
    if (sr._c !== sc) { sr._c = sc; sr.setAttribute('stroke', sc); sr.setAttribute('stroke-width', on ? 4 : 2); }
  });
  // coordination flow: cups move round the loop (full on top, empty below)
  M.draw(fLoop, t, tF[3] + 0.15, 0.6, M.o3);
  const flowOn = t >= tF[3] + 0.5 && t < tNight + 0.35;
  for (let i = 0; i < 10; i++) {
    const c = $('#ftk' + i);
    M.hide(c, !flowOn); if (!flowOn) continue;
    const d = ((t - tF[3]) * 150 + i * LOOPL / 10) % LOOPL, p = fLoop.getPointAtLength(d);
    c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1));
    const full = p.y < 222; c.setAttribute('fill', full ? C.gold : '#FFFFFF'); c.setAttribute('stroke', full ? C.gold : C.dim);
    c.style.opacity = (M.clamp((t - tF[3] - 0.5 - i * 0.05) / 0.2) * (1 - M.clamp((t - tNight) / 0.3))).toFixed(3);
  }
  // board: sold vs plan
  const sold = M.lerp(0, 180, M.io(M.clamp((t - tF[3] - 0.4) / (tNight - tF[3] - 0.4))));
  const plan = t < tChanges ? 200 : M.lerp(200, 180, M.io((t - tChanges) / 0.5));
  M.setT($('#fTk0'), `SOLD ${Math.round(sold)}`);
  M.setT($('#fTk1'), `PLAN ${Math.round(plan)} CUPS`);
  const sw = 688 * sold / plan; $('#fSold').style.left = '0px'; $('#fSold').style.width = sw.toFixed(1) + 'px'; $('#fSold').style.background = C.ink;
  const gp = M.io((t - tEighty) / 0.3) * (1 - M.io((t - tChanges) / 0.5));
  $('#fGap').style.left = sw.toFixed(1) + 'px'; $('#fGap').style.width = Math.max(0, (688 - sw) * gp).toFixed(1) + 'px'; $('#fGap').style.background = '#D98F7B';
  if (t >= tChanges + 0.3) $('#fSold').style.background = mix(C.ink, C.gold, M.io((t - tChanges - 0.3) / 0.3));
  // status pill
  const ms = $('#fSt');
  const SP = [['calendar', 'Plan for 200 cups on Saturday'], ['users', 'Everyone at a station'], ['megaphone', 'Clear orders for each person'], ['link', 'Tea, cash and cups in step'], ['gauge', '20 cups short of the plan'], ['refresh', 'Next plan: 180 cups']];
  let ic = 'clock', tx = 'Ready for the weekend', bad = 0, fin = 0;
  if (s >= 0) { [ic, tx] = SP[s]; }
  if (s === 4 && t < tEighty) { ic = 'gauge'; tx = 'Checking sold against plan'; }
  if (s === 4 && t >= tEighty) bad = 1;
  if (s === 5) fin = 1;
  setIco(ms.querySelector('.msi'), ic, fin || bad ? '#fff' : C.gold, 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx);
  const bg = fin ? C.gold : (bad ? C.red : C.paper), fg = fin || bad ? '#fff' : C.ink;
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const opR = $('#opR'); opR.style.left = (264 - opR.offsetWidth / 2) + 'px';
  const opK = $('#opK'); opK.style.left = (656 - opK.offsetWidth / 2) + 'px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  const cy = $('#coYrs'); cy.style.left = (460 - cy.offsetWidth / 2) + 'px';
  const tg = $('#tgT'); tg.style.left = (128 - tg.offsetWidth) + 'px'; $('#tgW').style.left = '648px';
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  FN.forEach((_, i) => { const l = $('#fl' + i), [x, y, al] = FLP[i]; l.style.top = y + 'px'; l.style.left = (al === 'l' ? x : al === 'c' ? x - l.offsetWidth / 2 : x - l.offsetWidth) + 'px'; });
  document.querySelectorAll('#pGrid .pa').forEach(el => { if (el.offsetWidth > 284) el.style.fontSize = Math.floor(24 * 284 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const p0 = $('#xp0'), p1 = $('#xp1'); p0.style.left = '48px'; p1.style.left = (736 - p1.offsetWidth) + 'px';
  const mid = (48 + p0.offsetWidth + 736 - p1.offsetWidth) / 2; $('#xz').setAttribute('transform', `translate(${(mid - 366).toFixed(1)} 0)`);
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
  M.vis($('#exChip'), t, tF[0] + 0.2, tFout, { dy: 10, outDur: 0.3 });

  /* ===== A: no clear boss ===== */
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
    [['A', tMorph + 0.5], ['R', tMorph + 0.62], ['K', tMorph + 0.74]].forEach(([k, ta]) => { M.vis($('#oa' + k), t, ta, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#on' + k), t, ta + 0.08, 1e9, { dy: 10 }); });
    M.draw($('#arL'), t, tRavi + 0.1, 0.4, M.o3); M.vis($('#ahL'), t, tRavi + 0.45, 1e9, { dy: 0, fade: 0.1 });
    M.draw($('#arR'), t, tKabir + 0.1, 0.4, M.o3); M.vis($('#ahR'), t, tKabir + 0.45, 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#opR'), t, tRavi + 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#opK'), t, tKabir + 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const cl = M.io((t - tKabir - 0.6) / 0.25);
    $('#oaA').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, cl);
    M.vis($('#clash'), t, tKabir + 0.6, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis($('#ask'), t, tKabir + 0.35, 1e9, { dy: 36 });
    [tWash, tMoney, tShort].forEach((ta, i) => {
      const el = $('#wt' + i); M.vis(el, t, ta - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const r = i === 2 ? M.io((t - ta - 0.2) / 0.25) : 0;
      el.style.background = mix(C.paper, C.redBg, r); el.querySelector('.wv').style.color = mix(C.ink, C.red, r);
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

  /* ===== D: Henri Fayol ===== */
  const dOn = t >= tTu - 0.05 && t < tB1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const tay = $('#tay'), sh = M.spring(t - tD3 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD2 - 0.1, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD2 + 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tHenri - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tFrench - 0.05, 1e9, { dy: 10 });
    M.vis($('#father'), t, tFather - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const co = $('#co'); M.vis(co, t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o }); growH(co, $('#coIn'), t, tD5);
    M.rise($('#y0'), t, t1888 - 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#cc0'), t, t1888 + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#coBar'), t, tD4, 1e9, { dy: 0, fade: 0.2 });
    $('#coFill').style.width = (448 * M.o5((t - tThirty + 0.2) / 1.0)).toFixed(1) + 'px';
    M.rise($('#y1'), t, tD4 + 0.1, { st: 0.05, sp: M.HEAVY });
    M.vis($('#coYrs'), t, tThirty + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cc1'), t, tBiggest - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#bk'), t, tD5 + 0.12, tDout, { dy: 36, ...o });
    M.vis($('#bookS'), t, t1916, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, t1916 + 0.25 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#bookL'), t, t1916 + 0.1, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, tBook - 0.25, { st: 0.06 }); M.rise($('#bk2'), t, tBook, { st: 0.06 });
    M.vis($('#bkE'), t, tBook + 0.6, 1e9, { dy: 10 });
  }

  /* ===== B: six kinds of work ===== */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.05, tBout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tSix);
    M.vis($('#illImg'), t, tB1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgT'), t, tBFay, tSix - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgW'), t, tBComp - 0.05, tSix - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#six'), t, tSix + 0.12, tBout, { dx: 60, dy: 0, ...o });
    SK.forEach(([ic], i) => {
      const el = $('#sk' + i), ta = tSk[i]; M.vis(el, t, ta - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const mg = i === 5 ? M.io((t - ta - 0.15) / 0.3) : 0;
      el.style.background = mix(C.paper, C.ink, mg);
      el.querySelector('.sn').style.color = mix(C.ink, '#fff', mg);
      const si = el.querySelector('.si'); si.style.background = mix('#fff', C.navy2, mg);
      setIco(si, ic, mg > 0.5 ? C.gold2 : C.gold, 30, 2.2);
      if (i === 5) {
        const tg = t >= tTaught - 0.05; const ss = el.querySelector('.ss');
        M.setT(ss.querySelector('.sst'), tg ? 'It can be taught' : SK[5][2]);
        setIco(ss.querySelector('.ssi'), tg ? 'check' : 'users', C.gold2, tg ? 20 : 0.1, 3);
        ss.querySelector('.ssi').style.display = tg ? 'block' : 'none';
        ss.style.color = tg ? C.gold2 : mix(C.ink2, C.gold2, mg);
        if (t >= tTaught - 0.05 && t < tTaught + 0.4) ss.style.transform = `translateY(${(8 * (1 - M.spring(t - tTaught + 0.05, M.SOFT))).toFixed(2)}px)`; else if (ss.style.transform !== 'none') ss.style.transform = 'none';
      }
    });
  }

  /* ===== M: definition + Taylor vs Fayol ===== */
  const mOn = t >= tM1 - 0.1 && t < tF0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tM1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tM2 - 0.15, outDur: 0.3 });
    const def = $('#def'); M.vis(def, t, tM2 + 0.05, tMout, { dy: 36, ...o }); growH(def, $('#defIn'), t, tM3);
    M.rise($('#dl1'), t, tRun - 0.1, { st: 0.06 }); M.rise($('#dl2'), t, tClear - 0.25, { st: 0.06 });
    M.vis($('#defS'), t, tWhole, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cmpT'), t, tMTay - 0.05, tMout, { dy: 36, ...o });
    M.vis($('#cmpF'), t, tMFay - 0.05, tMout, { dy: 36, ...o });
  }

  /* ===== F: five functions, one Saturday ===== */
  const fOn = t >= tF0 - 0.1 && t < tP0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fR'), t, tF0 + 0.1, tFout, { dy: 36, ...o }); grow($('#fR'), $('#fROut'), t, wt('F0', 'Watch'));
    M.vis($('#fC'), t, wt('F0', 'Watch') - 0.1, tFout, { dx: 60, dy: 0, ...o });
    M.vis($('#ringS'), t, tF0 + 0.3, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT });
    FN.forEach((_, i) => M.vis($('#fl' + i), t, tF0 + 0.5 + i * 0.08, 1e9, { dy: 10 }));
    M.vis($('#fNum'), t, tF0 + 0.6, 1e9, { dy: 10 }); M.vis($('#fOf'), t, tF0 + 0.7, 1e9, { dy: 8 }); M.vis($('#fMean'), t, tF0 + 0.8, 1e9, { dy: 10 });
    const base = wt('F0', 'Watch');
    M.vis($('#fRav'), t, base + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#fCIn').querySelector('.mlb'), t, base + 0.28, 1e9, { dy: 10 });
    M.vis($('#fClk'), t, base + 0.32, 1e9, { dy: 10 });
    M.vis($('#fPlan'), t, base + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    STAFF.forEach((_, i) => fadeG($('#fa' + i), t, base + 0.5 + i * 0.08));
    M.vis($('#fBar'), t, base + 0.55, 1e9, { dy: 10 });
    M.vis($('#fTk0'), t, base + 0.6, 1e9, { dy: 8 }); M.vis($('#fTk1'), t, tFtwo - 0.05, 1e9, { dy: 8 });
    M.vis($('#fSt'), t, base + 0.65, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runSat(t);
  }

  /* ===== P: 14 principles ===== */
  const pOn = t >= tP0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pg'), t, tP0 + 0.1, tPout, { dy: 36, outDur: 0.3, ody: -16 });
    let n = 0;
    PG.forEach(([, ic, ps], i) => {
      const gh = $('#gh' + i), ta = tPg[i], td = i < 3 ? tPg[i + 1] : tPout + 1;
      M.vis(gh, t, tP0 + 0.5 + i * 0.1, 1e9, { dy: 12 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const gn = gh.querySelector('.gn'); gn.style.background = mix(t < ta ? C.paper : C.gold3, C.ink, act); gn.style.color = act > 0.5 ? '#fff' : (t < ta ? C.dim : C.gold);
      gh.querySelector('.gt').style.color = t < ta ? C.dim : C.ink;
      ps.forEach((_, j) => {
        const el = $('#pt' + i + j), tp = tPw[i][j];
        M.vis(el, t, tP0 + 0.6 + i * 0.1 + j * 0.05, 1e9, { dy: 14 });
        const lit = t >= tp - 0.08; if (lit) n++;
        const f = M.io((t - tp + 0.08) / 0.25), back = M.io((t - (j < ps.length - 1 ? tPw[i][j + 1] : td) + 0.1) / 0.35);
        el.style.background = mix(C.paper, C.ink, f * (1 - back));
        el.querySelector('.pa').style.color = !lit ? C.dim : mix('#fff', C.ink, back);
        el.querySelector('.pb').style.color = !lit ? C.paper2 : mix(C.gold2, C.muted, back);
        el.querySelector('.pn2').style.color = !lit ? C.dim : mix(C.gold2, C.gold, back);
      });
    });
    PEX.forEach((_, i) => M.vis($('#pex' + i), t, tPw[i][2] + 0.45, 1e9, { dy: 18 }));
    M.vis($('#pCount'), t, tP0 + 0.4, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#pCount'), `${n} / 14`);
  }

  /* ===== K: at work today ===== */
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

  /* ===== X: the limits ===== */
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX5 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.rise($('#xq1'), t, tX5 + 0.45, { st: 0.06 }); M.rise($('#xq2'), t, tX5 + 0.75, { st: 0.06 });
    M.vis($('#xp0'), t, tX6 - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xp1'), t, tAdvice - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.draw($('#xz'), t, tAdvice + 0.15, 0.4, M.o3);
    M.vis($('#xcl'), t, tAdvice + 0.3, 1e9, { dy: 8 });
    const xb = M.io((t - tAdvice - 0.2) / 0.3);
    [$('#xp0'), $('#xp1')].forEach(p => { p.style.background = mix(C.paper, C.redBg, xb); p.style.color = mix(C.ink, C.red, xb); });
    M.vis($('#xfv'), t, tFlex - 0.4, 1e9, { dy: 18 });
    M.vis($('#lesson'), t, tX8 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX8 + 0.15, 1e9, { dy: 40 });
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
