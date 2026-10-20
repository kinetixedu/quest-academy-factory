// MBA - Marketing Management, Ep 28: Integrated Marketing Communications (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', slate: '#5B6B9A', slateBg: '#E6E9F2' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  news: ['M15 18h-5', 'M18 14h-8', 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2', 'M10 6h8v4h-8V6Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12', 'm2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17'],
  palette: ['M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z', 'M13.5 6.5h.01', 'M17.5 10.5h.01', 'M6.5 12.5h.01', 'M8.5 7.5h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  play: ['M6 3 20 12 6 21 6 3z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tMsg = [wt('H2', 'pack'), wt('H2', 'post'), wt('H2', 'Arjun')], tSees = wt('C2', 'sees'), tNone = wt('C2', 'none'), tWrong = wt('C2', 'wrong');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tCamp = [wt('L2', 'planned'), wt('L2', 'weeks'), wt('L2', 'goal')], tRule = wt('L3', 'rule'), tSame = wt('L3', 'same');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('P0') - 0.32;
const tKqL = wt('D2', 'joining') - 0.2, tHl = [wt('D3', 'clear'), wt('D3', 'consistent'), wt('D3', 'compelling')];
const tSch = [wt('D4', 'Schultz'), wt('D4', 'Northwestern'), wt('D4', 'textbook')], tMany = wt('D5', 'many'), tVoice = wt('D5', 'voice'), tOne = wt('D5', 'one');
// P: promotion mix
const tP0 = T0('P0'), tP = [1, 2, 3, 4, 5].map(i => T0('P' + i)), tPout = T0('M1') - 0.32;
// M: one week, two ways
const tM = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => i ? T0('M' + i) : 0);
const tO = [wt('M2', 'Monday'), wt('M2', 'Wednesday'), wt('M3', 'Friday')], tWeak = wt('M4', 'weak'), tNothing = wt('M4', 'nothing');
const tN = [wt('M6', 'Monday'), wt('M6', 'Wednesday'), wt('M6', 'Friday')], tStrong = wt('M7', 'stronger'), tSat = wt('M8', 'Saturday'), tBuys = wt('M8', 'buys');
const tMout = T0('T1') - 0.32;
const tT = T0('T1'), tSt2 = wt('T1', 'One'), tG1 = T0('G1'), tTu = tG1 - 0.32;
// G: plan
const tGs = [wt('G1', 'One'), T0('G2'), T0('G3'), T0('G4')], tGout = T0('K0') - 0.32;
const tAud = [wt('G1', 'busy'), wt('G1', 'school')], tThou = wt('G2', 'thousand'), tMonth = wt('G2', 'month');
const tMsgG = wt('G3', 'message'), tCol = wt('G3', 'colours'), tTools = wt('G4', 'tools'), tCheck = wt('G4', 'check'), tWeek = wt('G4', 'week');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bank'), wt('K3', 'airline'), wt('K4', 'food')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'remember'), wt('X2', 'rupee')], tXh = [wt('X3', 'Teams'), wt('X3', 'boring')];
const tDevX = wt('X4', 'Dev'), tZoyX = wt('X4', 'Zoya'), tDad = wt('X5', 'dad'), tPack = wt('X5', 'packing');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Many');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'one')], [wt('S3', 'advertising'), wt('S3', 'sales'), wt('S3', 'personal'), wt('S3', 'public'), wt('S3', 'digital')], [wt('S4', 'audience'), wt('S4', 'goal'), wt('S4', 'message'), wt('S4', 'tools')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;

// A: three messages
const MSG = [[null, 'package', 'THE PACK', 'Tiffin sweet', C.gold, C.gold3], ['dev', null, "DEV'S POST", 'Gym snack', C.red, C.redBg], ['arjun', null, 'ARJUN AT THE SHOP', 'Festive treat', C.slate, C.slateBg]];
$('#msgs').innerHTML = MSG.map(([f, ic, n, tx, col], i) => `<div class="msg" id="ms${i}" style="left:${36 + i * 288}px"><div class="zn">${n}</div><div class="mf" style="${f ? FACE(f) + ';box-shadow:0 0 0 3px ' + col : 'box-shadow:0 0 0 3px ' + col}">${ic ? M.icon(ic, 28, col, 2.2) : ''}</div><div class="zt" style="color:${col}">${tx}</div></div>`).join('');
$('#cpillI').innerHTML = M.icon('x', 20, C.red, 2.6);
// L: campaign tiles + rule chips
const CAMP = [['message', 'PLANNED', 'Set of messages'], ['calendar', 'TIME', 'A few weeks'], ['target', 'AIM', 'One goal']];
$('#cRow').innerHTML = CAMP.map(([ic, n, t], i) => `<div class="sws" id="cp${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
const RCS = [['package', 'The pack'], ['phone', 'Posts'], ['store', 'Shop posters'], ['users', "Arjun's pitch"]];
$('#rcs').innerHTML = RCS.map(([ic, t], i) => `<div class="rc3" id="rc${i}">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: origin + simple words
$('#schPI').innerHTML = M.icon('book', 22, '#fff', 2.4);
const CHN = ['megaphone', 'tag', 'users', 'news', 'phone'];
$('#chs').innerHTML = CHN.map((ic, i) => `<div class="chn" id="ch${i}" style="left:${36 + i * 68}px">${M.icon(ic, 26, C.gold, 2.2)}</div>`).join('');
$('#oneVI').innerHTML = M.icon('megaphone', 32, C.gold2, 2.2);
wrap($('#kq'), 'kqOut', 784, 580);
// P: the promotion mix (five tools)
const P5 = [['megaphone', 'Advertising', 'paid messages', 'dev', "Dev's poster at the school gate", 'MORE IN EP 29'],
  ['tag', 'Sales', 'promotion', 'arjun', 'A festive offer, to buy now', 'MORE IN EP 29'],
  ['users', 'Personal', 'selling', 'arjun', "Arjun's pitch to a new shopkeeper", 'MORE IN EP 30'],
  ['news', 'Public', 'relations', 'nani', 'A newspaper story about Nani', 'MORE IN EP 31'],
  ['phone', 'Direct and', 'digital', 'dev', 'Dev messages regular customers', 'ONE TO ONE']];
$('#p5').innerHTML = P5.map(([ic, a, b], i) => `<div class="st5" id="pst${i}" style="left:${160 + i * 326}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div></div>` + (i < 4 ? `<div class="cx" id="cx${i}" style="left:${454 + i * 326}px">${M.icon('plus', 18, C.gold, 2.6)}</div>` : '')).join('');
$('#pePans').innerHTML = [[null, 'KOTLER AND ARMSTRONG · THE PROMOTION MIX', 'Five tools, one message', null]].concat(P5.map((p, i) => [p[3], `TOOL 0${i + 1} · AT LADDOO LAB`, p[4], p[5]])).map(([f, l, x, cu], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('layers', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div>${cu ? `<div class="cu">${cu}</div>` : ''}</div>`).join('');

/* M: two runs over one week. Plan coords inside a 688 x 250 svg. */
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], DX = i => i * 117.6, DC = i => i * 117.6 + 50;
const OLD = { 0: ['phone', 'GYM SNACK', C.red], 2: ['store', 'FESTIVE', C.slate], 4: ['package', 'TIFFIN', C.gold] };
const dbox = (k, i) => `<g id="d${k}${i}" transform="translate(${DX(i)} 18)"><rect width="100" height="132" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><text x="50" y="28" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${DAYS[i]}</text><g class="bi" transform="translate(34 46)"></g><text class="bt" x="50" y="112" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" letter-spacing="0.5" fill="#B9B1A3"></text></g>`;
const avG = (id, clip, x, y) => `<g id="${id}" transform="translate(${x} ${y})"><circle r="28" fill="#14213D"/><image href="${IMG}ll-rao-face.jpg" x="-24" y="-24" width="48" height="48" clip-path="url(#${clip})"/></g>`;
const runCard = (k, label) => `<div class="mav" style="${FACE('rao')}"></div><div class="lbl mlb">${label}</div><div class="serif mrd" id="rd${k}">Weak</div>
    <svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="avc${k}"><circle cx="0" cy="0" r="24"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${DAYS.map((_, i) => dbox(k, i)).join('')}
      <path d="M24 206 H664" stroke="#E2DACB" stroke-width="3" stroke-dasharray="10 10"/>
      ${avG('av' + k, 'avc' + k, 50, 206)}
    </svg>
    <div class="mbar" id="bar${k}"><i id="sg${k}"></i></div>
    <div class="mtk" style="left:48px">WEAK</div><div class="mtk" style="right:48px">STRONG MEMORY</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
$('#mLIn').innerHTML = runCard('L', 'THE OLD WAY · MIXED MESSAGES');
$('#mRIn').innerHTML = runCard('R', 'THE INTEGRATED WAY · ONE MESSAGE');
const HW = [['phone', "MONDAY · DEV'S POST", 'Gym snack', C.red], ['store', 'WEDNESDAY · SHOP POSTER', 'Festive treat', C.slate], ['package', 'FRIDAY · THE PACK', 'Tiffin sweet', C.gold]];
$('#hws').innerHTML = HW.map(([ic, l, t, col], i) => `<div class="hw" id="hw${i}" style="top:${92 + i * 104}px"><i>${M.icon(ic, 28, col, 2.2)}</i><div class="kl">${l}</div><div class="kt" style="color:${col}">${t}</div></div>`).join('');
$('#hwPI').innerHTML = M.icon('x', 22, C.red, 2.6);
wrap($('#mL'), 'mLOut', 784, 580);

// G: plan in four steps
const GA = [['users', 'Audience', 'Busy parents who pack school tiffins'], ['target', 'Goal', '1,000 parents aware in one month'], ['message', 'Message', 'One line, one look, everywhere'], ['layers', 'Tools', 'Pick the tools, check every week']];
$('#gRows').innerHTML = GA.map(([ic, t], i) => `<div class="kr" id="gr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const sw3 = `<svg width="64" height="16" style="position:absolute;right:20px;top:20px"><circle cx="8" cy="8" r="7" fill="#14213D"/><circle cx="30" cy="8" r="7" fill="#B8862F"/><circle cx="52" cy="8" r="7" fill="#E9D9B5"/></svg>`;
const GV = [
  `<div class="gav" id="ga0" style="left:0;${FACE('rao')}"></div><div class="gav" id="ga1" style="left:104px">${M.icon('user', 40, C.gold, 2.2)}</div><div class="gav" id="ga2" style="left:208px">${M.icon('user', 40, C.gold, 2.2)}</div><div class="gch" id="gc0" style="left:332px;top:18px">${M.icon('plus', 22, C.gold, 2.4)}<span>Many more like her</span></div>
   <div class="gch" id="gc1" style="left:0;top:136px">${M.icon('clock', 22, C.gold, 2.4)}<span>Busy mornings</span></div><div class="gch" id="gc2" style="left:0;top:136px">${M.icon('laddoo', 22, C.gold, 2.4)}<span>School tiffins</span></div><div class="gch" id="gc3" style="left:0;top:136px">${M.icon('heart', 22, C.gold, 2.4)}<span>Want healthy food</span></div>`,
  `<div class="serif" id="gN">0</div><div id="gNl">parents aware</div><div class="gch" id="gMo" style="top:8px;background:#14213D;color:#fff">${M.icon('calendar', 22, C.gold2, 2.4)}<span>In one month</span></div><div id="gBar"><i id="gBarF"></i></div>` +
  [1, 2, 3, 4].map(w => `<div class="lbl" style="left:${(w - 1) * 212 + 106 - 30}px;top:156px">WEEK ${w}</div>`).join(''),
  [['package', 'THE PACK'], ['phone', "DEV'S POST"], ['store', 'SHOP POSTER']].map(([ic, n], i) => `<div class="g3" id="g3${i}" style="left:${i * 292}px"><div class="zn">${n}</div>${sw3.replace('<svg', `<svg class="sw3" id="sw3${i}"`)}<div class="zi">${M.icon(ic, 36, C.ink, 2.2)}</div><div class="zt">Healthy tiffin sweet</div></div>`).join(''),
  [['phone', 'Posts'], ['store', 'Shop posters'], ['package', 'The pack']].map(([ic, t], i) => `<div class="gch" id="gt${i}" style="top:0">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  `<div class="lbl" id="gwL" style="left:0;top:82px">WEEKLY CHECK · PARENTS AWARE</div><div class="abs" id="gwB" style="left:0;top:110px;width:400px;height:116px">${[60, 120, 180, 250].map((h, i) => `<div class="wkb" id="wb${i}" style="left:${i * 64}px;height:0"></div>`).join('')}</div>` +
  `<div class="gch" id="gOk" style="left:300px;top:168px;background:#B8862F;color:#fff">${M.icon('check', 22, '#fff', 3)}<span>On track, week by week</span></div>`,
];
const GP = [['THE PLAN', 'Four steps', 'Audience, goal, message, tools', null]].concat(GA.map((a, i) => [`STEP 0${i + 1} / 04`, a[1], a[2], GV[i]]));
$('#gPans').innerHTML = GP.map(([s, t, m, v], i) => `<div class="pn" id="gn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (v ? `<div class="pvx" id="gv${i}">${v}</div>` : `<div class="px">FROM WHO TO HOW</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Decide who first, then what to say</span></div>`) + `</div>`).join('');

// K: at work today
const KA = [
  ['message', 'One message', 'Say the same thing everywhere', 'The healthy sweet for tiffin boxes, on all three', 'phone', 'A phone maker uses one line on TV, app and stores'],
  ['palette', 'One look', 'Same colours, same style', 'Navy and gold on the pack, posts and posters', 'bank', 'A bank uses the same colours on cards and branches'],
  ['target', 'Right tool, right job', 'Each tool does one job well', 'Posts get noticed, the pack closes the sale', 'plane', 'An airline: ads to get noticed, app messages at check-in'],
  ['chart', 'Check the results', 'Measure, then keep what works', 'Zoya counts aware parents every week', 'phone', 'A delivery app tests two ads, keeps the winner'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['IMC TODAY', 'Four habits', 'Big brands and small ones use them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO BRAND TO AN AIRLINE</div><div class="pe"><i>${M.icon('megaphone', 34, C.gold, 2.2)}</i><span>Many channels, one voice</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['repeat', 'People remember you'], ['coin', 'Money works harder']];
const XH = [['users', 'Teams pull apart'], ['trendDown', 'It can get boring']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#vLd').innerHTML = [84, 120, 156].map(x => laddoo(x, 130, 16)).join('');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#vEndI').innerHTML = M.icon('play', 30, C.gold, 2.2);
$('#bothI').innerHTML = M.icon('megaphone', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Advertising', 'IMC', 'Sales promotion', 'Market research'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('megaphone', 44, C.gold2, 2.4);
// recap
const ROWS = [['megaphone', 'Every channel, one clear message', ['One message']], ['layers', 'The promotion mix: five tools', ['Ads', 'Sales promo', 'Selling', 'PR', 'Digital']], ['target', 'Plan it in order', ['Audience', 'Goal', 'Message', 'Tools']]];
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
const dayHi = (k, i, state, ic, txt, col) => { // state 0 idle, 1 seen
  const g = $('#d' + k + i), r = g.querySelector('rect');
  attr(r, 'stroke', state ? col : C.line); attr(r, 'stroke-width', state ? 4 : 2);
  attr(r, 'fill', state ? (col === C.gold ? C.gold3 : col === C.red ? C.redBg : col === C.slate ? C.slateBg : '#FFFFFF') : '#FFFFFF');
  const bi = g.querySelector('.bi'), key = state + ic + col; if (bi._k !== key) { bi._k = key; bi.innerHTML = state && ic ? M.icon(ic, 32, col, ic === 'check' ? 2.8 : 2.2) : ''; }
  M.setT(g.querySelector('.bt'), state ? txt : ''); attr(g.querySelector('.bt'), 'fill', col);
};
// memory: old way spikes and fades; integrated way builds up
const memOld = t => { let m = 0; tO.forEach(ti => { m = Math.max(m, 0.32 * M.io((t - ti) / 0.3) * (1 - 0.75 * M.io((t - ti - 0.8) / 1.2))); }); return m + 0.03 * tO.filter(ti => t > ti + 0.5).length; };
const memNew = t => tN.reduce((a, ti) => a + 0.26 * M.io((t - ti) / 0.45), 0) + 0.14 * M.io((t - tStrong) / 0.5);
const xOld = M.track(DC(0), [[tO[1] - 0.55, DC(2)], [tO[2] - 0.55, DC(4)]], M.SOFT);
const xNew = M.track(DC(0), [[tN[1] - 0.55, DC(2)], [tN[2] - 0.55, DC(4)], [tSat - 0.55, DC(5)]], M.SOFT);
const word = m => m < 0.36 ? 'Weak' : m < 0.7 ? 'Growing' : 'Strong';
const runL = t => {
  attr($('#avL'), 'transform', `translate(${xOld(t).toFixed(1)} 206)`);
  [0, 1, 2, 3, 4, 5].forEach(i => { const o = OLD[i], k = [0, 2, 4].indexOf(i); dayHi('L', i, o && t >= tO[k] - 0.05 ? 1 : 0, o && o[0], o && o[1], o ? o[2] : C.line); });
  const m = memOld(t), done = t >= tWeak;
  const g = $('#sgL'); g.style.width = (688 * m).toFixed(1) + 'px'; g.style.background = done ? C.red2 : C.gold;
  M.setT($('#rdL'), word(m)); $('#rdL').style.color = done ? C.red : C.ink;
  if (done) pill('L', 'x', 'Memory stays weak', t >= tNothing ? 'no sale' : '', 1, 1);
  else if (t >= tO[2]) pill('L', 'package', 'Friday: a tiffin pack', '', 0, 0);
  else if (t >= tO[1]) pill('L', 'store', 'Wednesday: a festive poster', '', 1, 0);
  else if (t >= tO[0]) pill('L', 'phone', 'Monday: a gym post', '', 1, 0);
  else pill('L', 'calendar', 'One week, three messages', '', 0, 0);
  return m;
};
const runR = t => {
  attr($('#avR'), 'transform', `translate(${xNew(t).toFixed(1)} 206)`);
  const ics = { 0: 'phone', 2: 'store', 4: 'package' };
  [0, 1, 2, 3, 4, 5].forEach(i => {
    if (i === 5) { dayHi('R', 5, t >= tSat ? 1 : 0, 'check', 'BOUGHT', C.gold); return; }
    const k = [0, 2, 4].indexOf(i); dayHi('R', i, k >= 0 && t >= tN[k] - 0.05 ? 1 : 0, ics[i], 'TIFFIN SWEET', C.gold);
  });
  const m = Math.min(1, memNew(t)), done = t >= tSat;
  const g = $('#sgR'); g.style.width = (688 * m).toFixed(1) + 'px'; g.style.background = C.gold;
  M.setT($('#rdR'), word(m)); $('#rdR').style.color = m >= 0.7 ? C.gold : C.ink;
  if (done) pill('R', 'check', 'Saturday: she buys a pack', '', 0, 1);
  else if (t >= tStrong) pill('R', 'trendUp', 'Memory gets stronger', '', 0, 0);
  else if (t >= tN[2]) pill('R', 'package', 'Friday: the pack says it', '', 0, 0);
  else if (t >= tN[1]) pill('R', 'store', 'Wednesday: the poster says it', '', 0, 0);
  else if (t >= tN[0]) pill('R', 'phone', 'Monday: the post says it', '', 0, 0);
  else pill('R', 'calendar', 'Same week, one message', '', 0, 0);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const cp = $('#cpill'); cp.style.left = (884 - cp.offsetWidth) + 'px';
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  const tz = $('#tgZ'); tz.style.left = (92 - 24 - tz.offsetWidth) + 'px'; $('#tgN').style.left = (692 + 24) + 'px';
  let x = 36; const rcs = RCS.map((_, i) => $('#rc' + i)); let tot = rcs.reduce((a, r) => a + r.offsetWidth, 0) + 16 * 3;
  if (tot > 712) rcs.forEach(r => { r.style.fontSize = Math.floor(22 * 712 / tot) + 'px'; r.style.padding = '0 14px'; });
  rcs.forEach(r => { r.style.left = x + 'px'; x += r.offsetWidth + 16; });
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  document.querySelectorAll('.st5 .s1, .st5 .s2').forEach(el => { if (el.offsetWidth > 238) el.style.fontSize = Math.floor(32 * 238 / el.offsetWidth) + 'px'; });
  // plan panes
  x = 0; [1, 2, 3].forEach(i => { const c = $('#gc' + i); c.style.left = x + 'px'; x += c.offsetWidth + 16; });
  $('#gNl').style.left = ($('#gN').offsetWidth + 20) + 'px'; $('#gMo').style.left = (848 - $('#gMo').offsetWidth) + 'px';
  x = 0; [0, 1, 2].forEach(i => { const c = $('#gt' + i); c.style.left = x + 'px'; x += c.offsetWidth + 16; });
  ['#gPans', '#kPans'].forEach(p => {
    document.querySelectorAll(p + ' .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
    document.querySelectorAll(p + ' .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.pex .pt2').forEach(el => { if (el.offsetWidth > 1100) el.style.fontSize = Math.floor(36 * 1100 / el.offsetWidth) + 'px'; });
  for (const id of ['qq1', 'qq2']) { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; }
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
  M.vis($('#exChip'), t, tGs[1] - 0.1, tGout, { dy: 10, outDur: 0.3 });

  /* ===== A: three messages, no memory ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    MSG.forEach((_, i) => M.vis($('#ms' + i), t, Math.max(tMorph + 0.5, tMsg[i] - 0.1), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    let mm = 0; tMsg.forEach(ti => { mm = Math.max(mm, 0.3 * M.io((t - ti) / 0.3) * (1 - 0.7 * M.io((t - ti - 0.5) / 0.6))); });
    mm *= 1 - M.io((t - tNone) / 0.4);
    $('#memF').style.width = (848 * mm).toFixed(1) + 'px'; $('#memF').style.background = t > tSees ? C.red2 : C.gold;
    M.vis($('#cpill'), t, tSees, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tNone - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the campaign ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, wt('L1', 'Zoya') - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, wt('L1', 'team') - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    CAMP.forEach((_, i) => {
      const el = $('#cp' + i); M.vis(el, t, tCamp[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tCamp[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tCamp[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), CAMP[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.rise($('#ruleT'), t, tRule - 0.05, { st: 0.07, sp: M.HEAVY });
    RCS.forEach((_, i) => M.vis($('#rc' + i), t, tSame - 0.1 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }

  /* ===== D: what is IMC ===== */
  const dOn = t >= tD1 - 0.1 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.3, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, tD2 + 0.45, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tD2 + 0.7, 1e9, { dy: 10 }); M.vis($('#imc'), t, tD2 + 0.9, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#kqHr'), t, tKqL - 0.2, 1e9, { dy: 0 });
    const tl = [tKqL, tKqL + 0.9, tD3 - 0.1, tD3 + 1.2, tD3 + 2.6];
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tl[i]) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#sch'), t, tD4 + 0.35, 1e9, { dy: 16, sp: M.SOFT });
    M.rise($('#schN'), t, tSch[0] - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#schU'), t, tSch[1] - 0.05, 1e9, { dy: 10 });
    M.vis($('#schP'), t, tSch[2] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    CHN.forEach((_, i) => M.vis($('#ch' + i), t, tMany - 0.2 + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    M.vis($('#chL'), t, tMany + 0.2, 1e9, { dy: 8 });
    M.vis($('#chA'), t, tOne - 0.15, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    M.vis($('#oneV'), t, tVoice - 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#oneL'), t, tVoice + 0.1, 1e9, { dy: 8 });
  }

  /* ===== P: the promotion mix ===== */
  const pOn = t >= tP0 - 0.1 && t < tM[1] + 0.2; M.hide($('#sP'), !pOn);
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
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 6; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 5 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
      const cu = pn.querySelector('.cu'); if (cu) M.vis(cu, t, tin + 0.5, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...oo });
    }
  }

  /* ===== M: one week, two ways ===== */
  const mOn = t >= tM[1] - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM[1] + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM[1] + 0.25, tM[5] - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM[5] + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM[1] + 0.3 : tM[5] + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      root.querySelectorAll('.mtk').forEach(el => M.vis(el, t, base + 0.4, 1e9, { dy: 8 }));
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      for (let i = 0; i < 6; i++) $('#d' + k + i).style.opacity = M.clamp((t - base - 0.25 - i * 0.06) / 0.1);
      $('#av' + k).style.opacity = M.clamp((t - base - 0.6) / 0.12).toFixed(3);
    }
    runL(t); runR(t);
    HW.forEach((_, i) => M.vis($('#hw' + i), t, tO[i] - 0.05, 1e9, { dx: 24, dy: 0 }));
    M.vis($('#hwP'), t, tWeak - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== G: plan in four steps ===== */
  const gOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tG1 + 0.02, tGout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tG1 + 0.15, tGout, { dx: 60, dy: 0, ...o });
    GA.forEach(([ic], i) => {
      const el = $('#gr' + i), ta = tGs[i], td = i < 3 ? tGs[i + 1] : tGout + 1;
      M.vis(el, t, tG1 + 0.3 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    GP.forEach((_, k) => {
      const tin = k ? tGs[k - 1] : tG1 + 0.4, tout = k < 4 ? tGs[k] - 0.14 : 1e9;
      const pn = $('#gn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...oo };
      if (k === 1) {
        [0, 1, 2].forEach(i => M.vis($('#ga' + i), t, tin + 0.5 + i * 0.1, tout, { ...pop, sc: 0.5 }));
        M.vis($('#gc0'), t, tin + 0.85, tout, pop);
        M.vis($('#gc1'), t, tAud[0] - 0.1, tout, pop); M.vis($('#gc2'), t, tAud[1] - 0.1, tout, pop); M.vis($('#gc3'), t, tAud[1] + 0.4, tout, pop);
      } else if (k === 2) {
        M.vis($('#gN'), t, tin + 0.5, tout, { dy: 12, ...oo }); M.vis($('#gNl'), t, tin + 0.6, tout, { dy: 12, ...oo });
        M.count($('#gN'), t, tThou - 0.1, 1.4, 0, 1000, v => Math.round(v).toLocaleString('en-IN'));
        M.vis($('#gMo'), t, tMonth - 0.1, tout, pop);
        M.vis($('#gBar'), t, tin + 0.55, tout, { dy: 10, ...oo }); $('#gBarF').style.width = (848 * M.o5((t - tThou + 0.1) / 1.4)).toFixed(1) + 'px';
        pn.querySelectorAll('.pvx .lbl').forEach((el, i) => M.vis(el, t, tin + 0.7 + i * 0.06, tout, { dy: 8, ...oo }));
      } else if (k === 3) {
        [0, 1, 2].forEach(i => { M.vis($('#g3' + i), t, tMsgG - 0.1 + i * 0.15, tout, pop); M.vis($('#sw3' + i), t, tCol - 0.05 + i * 0.1, tout, { ...pop, sc: 0.4 }); });
      } else {
        [0, 1, 2].forEach(i => M.vis($('#gt' + i), t, tTools - 0.1 + i * 0.12, tout, pop));
        M.vis($('#gwL'), t, tCheck - 0.2, tout, { dy: 8, ...oo });
        [60, 120, 180, 250].forEach((hh, i) => { const u = M.spring(t - tCheck - i * 0.18, M.SOFT); $('#wb' + i).style.height = (Math.min(116, hh * 0.46) * M.clamp(u, 0, 1.05)).toFixed(1) + 'px'; });
        M.vis($('#gOk'), t, tWeek - 0.1, tout, pop);
      }
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
    M.vis($('#phone'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    const sw2 = M.io((t - tPack + 0.1) / 0.3);
    $('#vid0').style.opacity = (1 - sw2).toFixed(3); $('#vid1').style.opacity = sw2.toFixed(3);
    attr($('#vProg'), 'width', (152 * M.clamp((t - tX5) / (tX6 - tX5))).toFixed(1));
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tZoyX, tDad][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#vEnd'), t, tPack + 0.3, 1e9, { dy: 16 });
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
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
