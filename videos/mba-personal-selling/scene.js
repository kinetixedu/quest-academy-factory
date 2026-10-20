// MBA - Marketing Management, Ep 30: Personal Selling (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  school: ['M14 22v-4a2 2 0 1 0-4 0v4', 'm18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10', 'M18 5v17', 'm4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6', 'M6 5v17', 'M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ear: ['M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0', 'M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tBusy = wt('H1', 'busiest'), tSchool = wt('H1', 'school'), tNo = wt('H2', 'no');
const tPoster = wt('C2', 'poster'), tPerson = wt('C2', 'person');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tJb = [wt('L2', 'ad'), wt('L2', 'Arjun'), wt('L2', 'listens')], tWb = [wt('L3', 'big'), wt('L3', 'careful'), wt('L3', 'shop')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M0') - 0.32;
const tQl = [wt('D2', 'personal'), wt('D2', 'sales'), wt('D2', 'make'), wt('D2', 'relationships')], tHl = [tQl[0], tQl[2], tQl[3]];
const tNot = wt('D3', 'not'), tRelW = wt('D3', 'relationship');
// M: seven steps
const tM0 = T0('M0'), tS = [wt('M1', 'One'), wt('M2', 'Two'), wt('M3', 'Three'), wt('M4', 'Four'), wt('M5', 'Five'), wt('M7', 'Six'), wt('M8', 'Seven')];
const tTw = wt('M1', 'twenty'), tFive = wt('M1', 'five'), tWorry = wt('M2', 'worry'), tThreeO = wt('M3', 'three'), tTaste = wt('M3', 'taste');
const tPar = wt('M4', 'parents'), tTiff = wt('M4', 'tiffin'), tMorn = wt('M4', 'morning'), tWhat = wt('M5', 'what'), tTake = wt('M6', 'take');
const tShall = wt('M7', 'Shall'), tCounter = wt('M7', 'counter'), tMon = wt('M8', 'Monday'), tCounts = wt('M8', 'counts'), tRestock = wt('M8', 'restocks');
const tMout = T0('T1') - 0.32;
const tT = T0('T1'), tSt2 = wt('T1', 'Salespeople'), tW0 = T0('W0'), tTu = tW0 - 0.32;
// W
const tW = [1, 2, 3].map(i => T0('W' + i)), tWout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'phone'), wt('K3', 'car'), wt('K4', 'insurance')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'Trust'), wt('X2', 'hears')], tXh = [wt('X3', 'slow'), wt('X3', 'push')];
const tProm = wt('X4', 'promise'), tZoyX = wt('X4', 'Zoya'), tNoX = wt('X4', 'no'), tTrue = wt('X4', 'true'), tKot = wt('X5', 'Kotler');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Arjun');
const tSS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'sales'), wt('S2', 'relationships')], [wt('S3', 'seven'), wt('S3', 'prospecting'), wt('S3', 'follow')], [wt('S4', 'listening'), wt('S4', 'tailored'), wt('S4', 'trust')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tSS - 0.42, tSS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
const SHOP_AV = sz => `<span style="display:flex">${M.icon('store', sz, C.ink, 2.2)}</span>`;

// A
$('#s10').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="st10" id="g${i}" style="left:${36 + i * 70}px">${M.icon('store', 28, C.gold, 2.2)}</div>`).join('');
$('#tgtI').innerHTML = M.icon('school', 24, C.gold, 2.2); $('#tgtLI').innerHTML = M.icon('target', 24, C.gold, 2.4);
$('#nos').innerHTML = ['New brand? No.', 'Another? No.', 'No space.'].map((t, i) => `<div class="no" id="no${i}">${M.icon('x', 22, C.red, 2.6)}<span>${t}</span></div>`).join('');
$('#tls').innerHTML = [['megaphone', null, 'AN AD', 'A poster', 0], [null, 'arjun', 'A PERSON', 'Arjun', 1]].map(([ic, f, n, t, ok], i) =>
  `<div class="tl2" id="tl${i}" style="left:${36 + i * 432}px"><i style="${f ? FACE(f) + ';box-shadow:0 0 0 3px #B8862F' : ''}">${ic ? M.icon(ic, 34, C.ink2, 2.2) : ''}</i><div class="zn">${n}</div><div class="zt">${t}</div><div class="mk" style="background:${ok ? C.gold : C.redBg}">${M.icon(ok ? 'check' : 'x', 22, ok ? '#fff' : C.red, 3)}</div></div>`).join('');
// L
$('#jb0I').innerHTML = M.icon('megaphone', 30, C.gold, 2.2);
const WB = [['package', 'Big orders'], ['search', 'Careful buyers'], ['store', 'Shop owners']];
$('#wbs').innerHTML = WB.map(([ic, t], i) => `<div class="wb" id="wb${i}">${M.icon(ic, 24, C.gold, 2.4)}<span>${t}</span></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#oneI').innerHTML = M.icon('coin', 34, C.gold, 2.2); $('#relPI').innerHTML = M.icon('heart', 22, C.gold2, 2.4);
$('#wks').innerHTML = [1, 2, 3, 4].map(i => `<div class="wk" id="wk${i - 1}x" style="left:${48 + (i - 1) * 180}px"><div class="zn">WEEK ${i}</div><div class="zi"></div><div class="zt">Restock</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);
// M: track with seven nodes
const SN = ['PROSPECT', 'PRE-APPROACH', 'APPROACH', 'PRESENT', 'OBJECTIONS', 'CLOSE', 'FOLLOW-UP'], NX = i => 120 + i * 226, TY = 142;
$('#st7S').innerHTML = `<path d="M${NX(0)} ${TY} H${NX(6)}" stroke="#E2DACB" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 14"/>
  <path id="trk" d="M${NX(0)} ${TY} H${NX(6)}" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>
  ${SN.map((n, i) => `<g id="nd${i}" transform="translate(${NX(i)} ${TY})"><circle r="26" fill="#F5F1E8" stroke="#E2DACB" stroke-width="3"/><text y="8" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#B9B1A3">${i + 1}</text></g><text id="nl${i}" x="${NX(i)}" y="96" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#B9B1A3">${n}</text>`).join('')}
  <defs><clipPath id="avc"><circle cx="0" cy="0" r="28"/></clipPath></defs>
  <g id="avA" transform="translate(${NX(0)} ${TY})"><circle r="32" fill="#B8862F"/><image href="${IMG}ll-arjun-face.jpg" x="-28" y="-28" width="56" height="56" clip-path="url(#avc)"/></g>`;
const bub = (id, who, txt, top, gold) => `<div class="bub" id="${id}" style="top:${top}px"><div class="fa" style="${who === 'shop' ? '' : FACE(who) + ';box-shadow:0 0 0 3px #B8862F'}">${who === 'shop' ? SHOP_AV(30) : ''}</div><div class="bb" style="${gold ? 'background:#B8862F;color:#fff' : ''}">${txt}</div></div>`;
const chips = (arr, top) => arr.map(([ic, t, id, red]) => `<div class="dch" id="${id}" style="top:${top}px;${red ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 22, red ? C.red : C.gold, 2.4)}<span>${t}</span></div>`).join('');
const DP = [
  ['AT MR. SHETTY\'S SHOP', 'Seven steps, one shop', ''],
  ['STEP 1 · PROSPECTING AND QUALIFYING', 'Find the right shops first', chips([['list', '20 shops near schools', 'c10'], ['check', 'The 5 best picked', 'c11']], 186)],
  ['STEP 2 · PRE-APPROACH', 'Learn about the buyer first', bub('b20', 'shop', 'Mr. Shetty', 166) + chips([['ban', 'His worry: stock that does not sell', 'c20', 1]], 252)],
  ['STEP 3 · APPROACH', 'Pick the right moment', chips([['clock', 'Three o\'clock, a quiet shop', 'c30'], ['laddoo', 'A free taste', 'c31']], 186)],
  ['STEP 4 · PRESENTATION', 'Show how it helps his shop', chips([['users', 'Busy parents', 'c40'], ['package', 'Tiffin snacks', 'c41'], ['calendar', 'Here, every morning', 'c42']], 186)],
  ['STEP 5 · HANDLING OBJECTIONS', 'Answer the worry, honestly', bub('b50', 'shop', 'What if it does not sell?', 166) + bub('b51', 'arjun', 'Take two boxes. We take back unsold packs.', 250, 1)],
  ['STEP 6 · CLOSING', 'Ask for the order', bub('b60', 'arjun', 'Shall I set up the stand by your counter?', 166) + bub('b61', 'shop', 'Yes. Let us try it.', 250)],
  ['STEP 7 · FOLLOW-UP', 'Come back, keep the promise', chips([['calendar', 'Next Monday', 'c70'], ['chart', 'Count the packs', 'c71'], ['repeat', 'Restock', 'c72']], 186)],
];
$('#dps').innerHTML = DP.map(([l, h, body], i) => `<div class="dpn" id="dp${i}"><div class="lbl">${l}</div><div class="serif dh">${h}</div>${body}</div>`).join('');
// W: why a person
const mb = (who, txt, top, gold) => `<div class="mb" style="top:${top}px"><div class="fa" style="${who === 'shop' ? '' : FACE(who) + ';box-shadow:0 0 0 3px #B8862F'}">${who === 'shop' ? SHOP_AV(22) : ''}</div><div class="bb" style="${gold ? 'background:#B8862F;color:#fff' : ''}">${txt}</div></div>`;
const WO = [['message', 'Two-way talk', 'Ask, and get answers now', 'AT THE COUNTER', mb('shop', 'Is it fresh?', 84) + mb('arjun', 'Made this morning.', 168, 1)],
  ['target', 'A tailored pitch', 'Words that fit each buyer', 'SAME LADDOO, TWO PITCHES', mb('arjun', 'School shop: the tiffin story', 84) + mb('arjun', 'Gym shop: the protein story', 168)],
  ['heart', 'Trust', 'People buy from people they trust', 'WEEK FOUR, AT THE SAME SHOP', mb('shop', 'Send me four boxes this time.', 84) + mb('arjun', 'Done. Same day.', 168, 1)]];
$('#obs').innerHTML = WO.map(([ic, t, s, al, body], i) => `<div class="ob" id="ob${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="serif ot">${t}</div><div class="os">${s}</div><div class="ad" id="ad${i}"><div class="al">${al}</div>${body}</div></div>`).join('');
// K
const KA = [
  ['search', 'Prospecting', 'Find the right buyers first', 'Twenty shops near schools, five picked', 'bank', 'A bank agent lists small businesses near the branch'],
  ['users', 'Presentation', 'Show how it helps', 'Busy parents buy tiffin snacks right here', 'phone', 'A phone store lets you try the camera yourself'],
  ['message', 'Handling objections', 'Answer the worry honestly', 'We take back any packs that do not sell', 'car', 'A car showroom offers a test drive to a doubtful buyer'],
  ['repeat', 'Follow-up', 'Come back after the sale', 'Next Monday: count the packs, restock', 'shield', 'An insurance agent calls before your policy runs out'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PERSONAL SELLING TODAY', 'Four steps', 'Seen in banks, shops and showrooms', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CORNER SHOP TO A CAR SHOWROOM</div><div class="pe"><i>${M.icon('users', 34, C.gold, 2.2)}</i><span>One person, one buyer, real talk</span></div>`) + `</div>`).join('');
// X
const XG = [['heart', 'Trust grows'], ['ear', 'Real feedback']];
const XH = [['clock', 'Slow and costly'], ['ban', 'Pushy sellers']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pkL').innerHTML = [64, 100, 136].map(x => laddoo(x, 262, 16)).join('');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('coin', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Prospecting', 'Handling objections', 'Closing', 'Follow-up'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('message', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Face to face, for sales and relationships', ['Sales', 'Relationships']], ['repeat', 'Seven steps, start to finish', ['7 steps', 'Prospecting', 'Follow-up']], ['heart', 'It works through people', ['Listening', 'Tailored pitch', 'Trust']]];
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
// interest meter: rises step by step, dips at the objection, recovers when it is answered
const interest = M.track(0.05, [[tS[0] + 0.3, 0.1], [tWorry, 0.16], [tTaste, 0.36], [tMorn, 0.6], [tWhat, 0.4], [tTake + 0.4, 0.76], [tCounter + 0.3, 0.92], [tRestock, 1]], M.SOFT);
const iWord = (v, t) => t >= tRestock ? 'A happy partner' : t >= tCounter + 0.3 ? 'Yes, let us try' : (t >= tWhat && t < tTake + 0.4) ? 'Worried' : v < 0.2 ? 'Not interested' : v < 0.45 ? 'Curious' : 'Interested';
const avX = M.track(NX(0), tS.slice(1).map((ts, i) => [ts - 0.45, NX(i + 1)]), M.SOFT);

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const tl = $('#tgtL'); tl.style.left = '36px';
  let x = 36; [0, 1, 2].forEach(i => { const n = $('#no' + i); n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  const tz = $('#tgZ'); tz.style.left = (92 - 24 - tz.offsetWidth) + 'px'; $('#tgN').style.left = (692 + 24) + 'px';
  for (let i = 0; i < 2; i++) { const g = $('#jb' + i); g.querySelector('.id').style.left = (88 + g.querySelector('.in').offsetWidth + 16) + 'px'; }
  x = 36; [0, 1, 2].forEach(i => { const n = $('#wb' + i); n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  const wbT = $('#wbT'); if (wbT.offsetWidth > 712) wbT.style.fontSize = Math.floor(24 * 712 / wbT.offsetWidth) + 'px';
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  // step panes: chips in a row with gaps
  DP.forEach((_, i) => { let x = 40; document.querySelectorAll(`#dp${i} .dch`).forEach(c => { if (c.style.top === '252px') { c.style.left = '40px'; return; } c.style.left = x + 'px'; x += c.offsetWidth + 16; }); });
  document.querySelectorAll('.ob .mb .bb').forEach(el => { if (el.offsetWidth > 312) { el.style.fontSize = Math.floor(21 * 312 / el.offsetWidth) + 'px'; } });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  for (const id of ['qq1', 'qq2']) { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; }
  const tk = $('#takeT'); if (tk.offsetWidth > 1440) tk.style.fontSize = Math.floor(40 * 1440 / tk.offsetWidth) + 'px';
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

  /* ===== A: one more shop ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 10; i++) M.vis($('#g' + i), t, tMorph + 0.45 + i * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
    M.vis($('#tgt'), t, tMorph + 1.0, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#tgtL'), t, tMorph + 1.3, 1e9, { dy: 12 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#no' + i), t, Math.max(tMorph + 0.7, tNo - 0.1) + i * 0.3, tPoster - 0.3, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.25, ody: -10 });
    for (let i = 0; i < 2; i++) {
      const el = $('#tl' + i); M.vis(el, t, (i ? tPerson : tPoster) - 0.1, 1e9, { dy: 0, sc: 0.75, sp: M.POP, fade: 0.1 });
      M.vis(el.querySelector('.mk'), t, (i ? tPerson : tPoster) + 0.4, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    }
  }

  /* ===== L: the shop ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.7, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, wt('L1', 'shopkeepers') - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#jb0'), t, tJb[0] - 0.15, 1e9, { dy: 16 }); M.vis($('#jb1'), t, tJb[1] - 0.15, 1e9, { dy: 16 });
    $('#jb1').style.background = mix(C.paper, C.gold3, M.io((t - tJb[2]) / 0.3));
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#wb' + i), t, tWb[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#wbT'), t, wt('L3', 'like') - 0.1, 1e9, { dy: 10 });
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, tD2 + 0.35, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tD2 + 0.6, 1e9, { dy: 10 }); M.vis($('#kqHr'), t, tD2 + 0.7, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tD2 + 0.9 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tQl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05 - (i ? 0 : 0)) / 0.3) * (i === 2 ? 1 : 1); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, i === 2 ? Math.max(u, M.io((t - tNot) / 0.3)) : u); });
    M.vis($('#rel'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#one'), t, tD3 + 0.35, 1e9, { dy: 16 });
    M.vis($('#relL'), t, tNot, 1e9, { dy: 10 });
    for (let i = 0; i < 4; i++) {
      const el = $('#wk' + i + 'x'), tl = M.lerp(tNot + 0.3, tRelW, i / 4);
      M.vis(el, t, tNot + 0.1 + i * 0.06, 1e9, { dy: 16 });
      const on = M.io((t - tl) / 0.25);
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      el.querySelector('.zt').style.color = mix(C.dim, C.gold2, on);
      setIco(el.querySelector('.zi'), on > 0.5 ? 'check' : 'repeat', on > 0.5 ? C.gold2 : C.dim, 44, 2.2);
    }
    M.vis($('#relP'), t, tRelW - 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== M: the seven steps ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#st7'), t, tM0 + 0.1, tMout, { dy: 36, ...o });
    M.vis($('#dlg'), t, tM0 + 0.25, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mtr'), t, tM0 + 0.35, tMout, { dx: 60, dy: 0, ...o });
    M.vis($('#st7S'), t, tM0 + 0.3, 1e9, { dy: 12, sp: M.SOFT });
    const ax = avX(t); attr($('#avA'), 'transform', `translate(${ax.toFixed(1)} ${TY})`);
    $('#avA').style.opacity = M.clamp((t - tS[0] + 0.4) / 0.2).toFixed(3);
    M.drawU($('#trk'), (ax - NX(0)) / (NX(6) - NX(0)));
    let cur = -1;
    SN.forEach((_, i) => {
      const done = t >= tS[i], g = $('#nd' + i), c = g.querySelector('circle'), tx = g.querySelector('text');
      if (done) cur = i;
      attr(c, 'fill', done ? C.gold : C.paper); attr(c, 'stroke', done ? C.gold : C.line);
      attr(tx, 'fill', done ? '#fff' : C.dim);
      attr($('#nl' + i), 'fill', i === cur || (done && t < (tS[i + 1] ?? 1e9)) ? C.ink : (done ? C.gold : C.dim));
      g.style.opacity = M.clamp((t - tM0 - 0.4 - i * 0.06) / 0.12).toFixed(3); $('#nl' + i).style.opacity = g.style.opacity;
    });
    // dialogue panes
    for (let k = 0; k < 8; k++) {
      const tin = k ? tS[k - 1] : tM0 + 0.5, tout = k < 7 ? tS[k] - 0.14 : 1e9;
      const pn = $('#dp' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 }, pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...oo };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.rise(pn.querySelector('.dh'), t, tin + 0.1, { st: 0.05, sp: M.HEAVY, out: tout, outDur: 0.2 });
      const at = { c10: tTw, c11: tFive, b20: tin + 0.5, c20: tWorry, c30: tThreeO, c31: tTaste, c40: tPar, c41: tTiff, c42: tMorn, b50: tWhat, b51: tTake, b60: tShall, b61: tCounter + 0.5, c70: tMon, c71: tCounts, c72: tRestock };
      pn.querySelectorAll('.dch, .bub').forEach(el => M.vis(el, t, (at[el.id] ?? tin + 0.5) - 0.1, tout, el.classList.contains('bub') ? { dx: 24, dy: 0, ...oo } : pop));
    }
    // interest gauge
    const v = M.clamp(interest(t), 0, 1);
    M.drawU($('#gArcF'), v); attr($('#gNd'), 'transform', `rotate(${(-90 + 180 * v).toFixed(2)} 180 180)`);
    const wd = iWord(v, t); M.setT($('#gW'), wd); $('#gW').style.color = wd === 'Worried' ? C.red : v > 0.7 ? C.gold : C.ink;
    attr($('#gArcF'), 'stroke', wd === 'Worried' ? C.red2 : C.gold);
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

  /* ===== W: why a person ===== */
  const wOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    WO.forEach(([ic], i) => {
      const el = $('#ob' + i), ta = tW[i], td = i < 2 ? tW[i + 1] : tWout + 1;
      M.vis(el, t, tW0 + 0.05 + i * 0.1, tWout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      el.querySelector('.bg').style.boxShadow = `0 0 0 ${(4 * act).toFixed(2)}px ${C.gold}, 0 18px 40px -12px rgba(20,33,61,.14)`;
      el.querySelector('.sn').style.color = seen ? C.gold : C.dim;
      el.querySelector('.ot').style.color = seen ? mix(C.ink, C.gold, act) : C.dim;
      el.querySelector('.os').style.color = seen ? C.ink2 : C.dim;
      el.querySelector('.si').style.background = mix(C.paper, C.ink, act);
      setIco(el.querySelector('.si'), ic, act > 0.5 ? C.gold2 : (seen ? C.gold : C.dim), 34, 2.2);
      const ad = $('#ad' + i); M.vis(ad, t, ta + 0.1, tWout, { dy: 24, sp: M.SOFT, ...o });
      ad.querySelectorAll('.mb').forEach((mbx, k) => M.vis(mbx, t, ta + 0.5 + k * 0.7, 1e9, { dx: 18, dy: 0 }));
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#pst'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#clm0'), t, tProm - 0.05, tTrue - 0.4, { dy: 0, fade: 0.15, outDur: 0.2, ody: 0 });
    M.draw($('#strk'), t, tNoX - 0.05, 0.35, M.o3); if (t > tTrue - 0.25) M.hide($('#strk'), true);
    M.vis($('#clm1'), t, tTrue, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tTrue - 0.3) / 0.12); $('#pkOk').style.opacity = u.toFixed(3); M.hide($('#pkOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tProm, tZoyX, tTrue][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNoX ? C.redBg : C.paper; $('#bb0').style.color = t > tNoX ? C.red : C.ink;
    M.vis($('#fact'), t, tKot - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tSS; M.hide($('#quiz'), !qOn);
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
  const sOn = t >= tSS; M.hide($('#recap'), !sOn);
  if (sOn) {
    M.vis($('#rchip'), t, tSS + 0.1, 1e9, { dy: 16 });
    M.rise($('#rh'), t, tSS + 0.18, { st: 0.06, sp: M.HEAVY });
    ROWS.forEach(([, , ps], i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      ps.forEach((_, k) => {
        const el = $('#fp' + i + k), tp = tPill[i][k]; M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.2 : tNx - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      });
    });
    M.vis($('#next'), t, tNx - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the three sweeps, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tSS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
