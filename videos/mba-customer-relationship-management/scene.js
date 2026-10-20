// MBA - Marketing Management, Ep 33: Customer Relationship Management (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  phoneCall: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  gift: ['M20 12v10H4V12', 'M2 7h20v5H2z', 'M12 22V7', 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z', 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  pill: ['m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', 'm8.5 8.5 7 7'],
  bike: ['M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  clipboard: ['M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'm9 14 2 2 4-4'],
  eye: ['M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tJuly = wt('H2', 'July'), tStop = wt('H2', 'stopped');
const tC2 = T0('C2'), tNotice = wt('C2', 'noticed'), tLost = wt('C2', 'lost');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tTagR = wt('L1', 'Mrs'), tTagD = wt('L1', 'daughter'), tHund = wt('L2', 'hundreds'), tRem = wt('L3', 'remember'), tBack = wt('L3', 'coming');
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tKqL = wt('D2', 'building') - 0.4, tHl = [wt('D2', 'building'), wt('D2', 'profitable'), wt('D3', 'superior')];
const tSw = [wt('D4', 'know'), wt('D4', 'serve'), wt('D4', 'keep')], tWin = wt('D5', 'Winning'), tKeep = wt('D5', 'keeping');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tName = wt('M2', 'name'), tFlav = wt('M2', 'flavour'), tDay = wt('M2', 'day'), tRagi = wt('M3', 'ragi'), tSun = wt('M3', 'Sunday');
const tSat = wt('M4', 'Saturday'), tYour = wt('M4', 'Your'), tJul = wt('M5', 'July'), tTwo = wt('M5', 'two'), tMissed = wt('M5', 'missed');
const tCalls = wt('M6', 'calls'), tListen = wt('M6', 'listens'), tBored = wt('M7', 'bored'), tFree = wt('M7', 'free'), tCoco = wt('M7', 'coconut');
const tAug = wt('M8', 'August'), tAgain = wt('M8', 'again'), tFriends = wt('M8', 'friends');
const tMout = T0('T1') - 0.32;
// statement + K
const tT = T0('T1'), tSt2 = wt('T1', 'relationship'), tK0 = T0('K0'), tTu = tK0 - 0.32;
const tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'pharmacy'), wt('K2', 'airline'), wt('K3', 'bank'), wt('K4', 'food')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'known'), wt('X2', 'steady')], tXh = [wt('X3', 'spam'), wt('X3', 'misused')];
const tDevX = wt('X4', 'Dev'), tDaily = wt('X4', 'every'), tGym = wt('X4', 'gym'), tNo = wt('X5', 'no'), tWeek = wt('X5', 'week'), tYes = wt('X5', 'yes'), tPriv = wt('X5', 'private'), tAct = wt('X6', 'Digital');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'They');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'know'), wt('S2', 'serve'), wt('S2', 'keep')], [wt('S3', 'Keeping'), wt('S3', 'winning')], [wt('S4', 'rewards'), wt('S4', 'personal'), wt('S4', 'easy')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: a year of weeks, then July
$('#tbl').style.overflow = 'visible';
$('#lgrid').innerHTML = Array.from({ length: 56 }, (_, i) => `<div class="ld0" id="g${i}" style="left:${(i % 28) * 30}px;top:${Math.floor(i / 28) * 36}px"></div>`).join('');
$('#cSoldI').innerHTML = M.icon('check', 24, C.gold, 2.6); $('#cLeftI').innerHTML = M.icon('x', 24, C.red, 2.6);
const METH = [['check', 'Good laddoos', 0], ['check', 'Fair price', 0], ['x', 'Anyone watching?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: customers
const RAO = 29; // grid cell that is Mrs. Rao
$('#cuGrid').innerHTML = Array.from({ length: 60 }, (_, i) => i === RAO ? '' : `<div class="cu" id="cu${i}" style="left:${62 + (i % 12) * 56}px;top:${92 + Math.floor(i / 12) * 56}px">${M.icon('user', 22, C.dim, 2.2)}</div>`).join('');
{ const r = $('#cuRao'); r.style.cssText += `;left:${62 + (RAO % 12) * 56 - 10}px;top:${92 + Math.floor(RAO / 12) * 56 - 10}px;` + FACE('rao'); }
$('#cuTagI').innerHTML = M.icon('users', 22, '#fff', 2.4); $('#askI').innerHTML = M.icon('help', 34, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);
// D: simple words + cost
const SWT = [['search', 'STEP 1', 'Know them'], ['heart', 'STEP 2', 'Serve them well'], ['repeat', 'STEP 3', 'Keep them']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the customer book (left) and her Sundays (right) */
$('#rFace').style.cssText += ';' + FACE('rao');
const RF = [['FLAVOUR', 'Ragi jaggery'], ['ORDERS ON', 'Sunday'], ['MESSAGE', 'Saturday, once a week'], ['NOTE', '']];
$('#rFields').innerHTML = RF.map(([l, v], i) => `<div class="rf" id="rf${i}" style="top:${212 + i * 64}px"><div class="fl">${l}</div><div class="fv" id="fv${i}">${v}</div>${i === 0 ? `<div class="fx" id="fx0">${M.icon('plus', 16, '#fff', 3)}<span>Coconut jowar</span></div>` : ''}</div>`).join('');
const MO = ['JUNE', 'JULY', 'AUGUST'];
$('#sunGrid').innerHTML = MO.map((m, r) => `<div class="mo" style="top:${96 + r * 112 + 40}px">${m}</div>`).join('') +
  Array.from({ length: 12 }, (_, i) => `<div class="sc" id="sc${i}" style="left:${176 + (i % 4) * 144}px;top:${96 + Math.floor(i / 4) * 112}px"><div class="zn">SUN ${i % 4 + 1}</div><div class="zi"></div><div class="zm" id="zm${i}">${M.icon('message', 16, '#fff', 2.6)}</div></div>`).join('');
$('#missI').innerHTML = M.icon('eye', 20, '#fff', 2.4);
for (let k = 0; k < 2; k++) $('#fr' + k).innerHTML = M.icon('user', 22, C.gold2, 2.4);
// Sunday events: [state, time]  state: 1 ordered, 2 missed, 3 call then trial
const tJune = [0, 1, 2, 3].map(k => tSun + 0.25 + k * 0.32);
const tAugC = [0, 1, 2, 3].map(k => tAug + 0.2 + k * 0.32);
const EV = [...tJune.map(t => [1, t, null]), [1, tYour, tSat], [2, tJul + 0.2, tJul - 0.3], [2, tTwo + 0.1, tTwo - 0.3], [3, tCalls, null], ...tAugC.map(t => [1, t, t - 0.2])];
const curT = M.track(0, [[tJune[1] - 0.15, 1], [tJune[2] - 0.15, 2], [tJune[3] - 0.15, 3], [tSat - 0.3, 4], [tJul - 0.45, 5], [tTwo - 0.45, 6], [tCalls - 0.3, 7], [tAugC[0] - 0.2, 8], [tAugC[1] - 0.15, 9], [tAugC[2] - 0.15, 10], [tAugC[3] - 0.15, 11]], M.SNAP);
wrap($('#mL'), 'mLOut', 784, 580);

// K: building loyalty
const KA = [
  ['search', 'Know them', 'Know the customer', 'Remember what each one needs', "Dev's book: flavour, day and school", 'pill', 'A pharmacy reminds you to refill your medicines'],
  ['coin', 'Financial', 'Financial benefits', 'Reward people who stay', 'Every tenth pack free for regulars', 'plane', 'An airline gives frequent flyers free flights'],
  ['heart', 'Social', 'Social benefits', 'Make it personal', 'Zoya greets regulars by name', 'bank', 'A bank gives big customers their own manager'],
  ['link', 'Structural', 'Structural ties', 'Make staying easy', 'A pack delivered every Sunday, no need to ask', 'bike', 'A delivery app saves your address for quick orders'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['KOTLER AND ARMSTRONG · BUILDING LOYALTY', 'Know, then bond', 'One base, three ways to make people stay', null]].concat(KA.map((a, i) => [`LOYALTY TOOL 0${i + 1} / 04`, a[2], a[3], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[5], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO AN AIRLINE</div><div class="pe"><i>${M.icon('heart', 34, C.gold, 2.2)}</i><span>Same idea, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['smile', 'Feel known'], ['trendUp', 'Steady sales']];
const XH = [['message', 'Spam'], ['ban', 'Data misuse']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
$('#spam').innerHTML = DAYS.map((d, i) => `<g id="sp${i}"><rect x="38" y="${48 + i * 46}" width="164" height="38" rx="12" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><text x="52" y="${72 + i * 46}" font-family="Poppins" font-weight="600" font-size="13" fill="#B5482F">Laddoo Lab · ${d}</text></g>`).join('');
$('#bb2I').innerHTML = M.icon('lock', 22, '#fff', 2.6); $('#factI').innerHTML = M.icon('lock', 30, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Mass advertising', 'CRM', 'Price cut', 'New product'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('heart', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Know, serve, keep', ['Know', 'Serve', 'Keep']], ['coin', 'Keeping costs less', ['Keep: less', 'Win new: more']], ['heart', 'Build loyalty', ['Rewards', 'Personal touch', 'Easy to stay']]];
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
const crmState = t => {
  if (t >= tFriends) return ['users', 'Plus two new customers', 0, 1];
  if (t >= tAgain) return ['check', 'Back every Sunday', 0, 1];
  if (t >= tAug - 0.1) return ['repeat', 'August: orders again', 0, 0];
  if (t >= tFree) return ['gift', 'A free coconut jowar pack', 0, 0];
  if (t >= tBored) return ['help', 'Why? A bored daughter', 1, 0];
  if (t >= tCalls - 0.1) return ['phoneCall', 'Step 4: win her back', 0, 0];
  if (t >= tMissed) return ['x', 'Warning: 2 missed Sundays', 1, 1];
  if (t >= tM5) return ['eye', 'Step 3: watch for warning signs', 0, 0];
  if (t >= tM4) return ['message', 'Step 2: serve her personally', 0, 0];
  if (t >= tSun) return ['check', 'A regular, every Sunday', 0, 1];
  if (t >= tM2) return ['search', 'Step 1: know her', 0, 0];
  return ['clipboard', 'Four steps, one customer', 0, 0];
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
  const tr = $('#tgR'); tr.style.left = (60 - tr.offsetWidth) + 'px'; tr.style.top = '240px';
  const td = $('#tgD'); td.style.left = '724px'; td.style.top = '300px';
  const ct = $('#cuTag'); ct.style.left = '62px'; ct.style.top = '380px';
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (let k = 0; k < 2; k++) { const v = $('#crV' + k); geo['cv' + k] = v.offsetWidth; }
  { const v = $('#fv0'); $('#fx0').style.left = (180 + v.offsetWidth + 16) + 'px'; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  for (let i = 0; i < 3; i++) { const b = $('#bb' + i); if (b.offsetWidth > 332) b.style.fontSize = Math.floor(22 * 332 / b.offsetWidth) + 'px'; }
  document.querySelectorAll('#fact2 .kt').forEach(el => { if (el.offsetWidth > 540) el.style.fontSize = Math.floor(28 * 540 / el.offsetWidth) + 'px'; });
  ['qq1', 'qq2'].forEach(id => { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const POPo = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

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

  /* ===== A: the customer who stopped ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    const tf0 = tMorph + 0.5, tf1 = tJuly - 0.1;
    for (let i = 0; i < 56; i++) {
      const el = $('#g' + i);
      M.vis(el, t, tMorph + 0.45 + i * 0.012, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      let c = C.line, ring = 'none';
      if (i < 52) { const s = M.io((t - (tf0 + (tf1 - tf0) * i / 52)) / 0.2); c = mix(C.line, C.gold, s); }
      else { const r = M.io((t - tStop - (i - 52) * 0.08) / 0.25); c = mix(C.line, C.red2, r); if (r > 0.5) ring = '0 0 0 3px ' + C.redBg; }
      el.style.background = c; el.style.boxShadow = ring;
    }
    M.vis($('#cSold'), t, tf0, 1e9, POPo); M.count($('#cSoldN'), t, tf0, tf1 - tf0 + 0.2, 0, 52);
    M.vis($('#cLeft'), t, tStop + 0.3, 1e9, POPo);
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tC2 + 0.3, 1e9, POPo); M.vis($('#mt1'), t, tC2 + 0.55, 1e9, POPo); M.vis($('#mt2'), t, tNotice - 0.05, 1e9, POPo);
    M.rise($('#askT'), t, tC2 + 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: Mrs. Rao and the tiffin ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tTagR - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgD'), t, tTagD - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#crowd'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#cuRao'), t, tL2 + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    for (let i = 0; i < 60; i++) {
      if (i === RAO) continue;
      const r = Math.floor(i / 12), c = i % 12, d = Math.abs(r - 2) + Math.abs(c - 5);
      M.vis($('#cu' + i), t, tHund - 0.1 + d * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#cuTag'), t, tHund + 0.6, 1e9, POPo);
    M.vis($('#askS'), t, tRem - 0.25, 1e9, { dy: 24 });
    M.rise($('#askS .g1'), t, tRem - 0.1, { st: 0.04 });
    M.vis($('#askS .g2'), t, tBack - 0.15, 1e9, { dy: 10 });
  }

  /* ===== D: what is CRM ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.15, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'define') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tKqL - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tKqL - 0.3 - i * 0.7) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#simp'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, POPo);
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#cost'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    for (let k = 0; k < 2; k++) M.vis($('#cr' + k), t, tD5 + 0.3 + k * 0.1, 1e9, { dy: 12 });
    const w0 = 712 * M.o3((t - tWin) / 0.8), w1 = 712 * 0.14 * M.o3((t - tKeep) / 0.5);
    $('#crF0').style.width = w0.toFixed(1) + 'px'; $('#crF0').style.background = C.red;
    $('#crF1').style.width = w1.toFixed(1) + 'px'; $('#crF1').style.background = C.gold;
    const v0 = $('#crV0'), v1 = $('#crV1');
    v0.style.left = (Math.max(w0, geo.cv0 + 40) - geo.cv0 - 20).toFixed(1) + 'px'; v0.style.opacity = M.clamp((t - tWin - 0.5) / 0.2).toFixed(3);
    v1.style.left = (w1 + 16).toFixed(1) + 'px'; v1.style.opacity = M.clamp((t - tKeep - 0.3) / 0.2).toFixed(3);
  }

  /* ===== M: CRM for Mrs. Rao ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    M.vis($('#rFace'), t, tName - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#rName'), t, tName, { st: 0.06, sp: M.HEAVY }); M.vis($('#rSub'), t, tName + 0.2, 1e9, { dy: 8 });
    M.vis($('#msL'), t, tM1 + 0.5, 1e9, { ...POPo, sc: 0.8 });
    const fIn = [tFlav, tDay, tSat - 0.1, tM5 + 0.2], vIn = [tRagi, tSun, tSat + 0.1, tMissed];
    for (let i = 0; i < 4; i++) { M.vis($('#rf' + i), t, fIn[i] - 0.1, 1e9, { dy: 14 }); M.vis($('#fv' + i), t, vIn[i] - 0.05, 1e9, { dx: -12, dy: 0, fade: 0.15 }); }
    const note = t >= tBored ? 'Daughter bored of one flavour' : t >= tListen ? 'Zoya called and listened' : 'Missed 2 Sundays';
    M.setT($('#fv3'), note); $('#fv3').style.color = t >= tBored ? C.ink : t >= tListen ? C.ink : C.red;
    M.vis($('#fx0'), t, tCoco - 0.05, 1e9, POPo);
    // status chip
    const stS = t >= tAgain ? ['BACK', C.gold, '#fff', 'check'] : t >= tMissed ? ['AT RISK', C.red, '#fff', 'x'] : ['REGULAR', C.ink, C.gold2, 'heart'];
    const rs = $('#rStat'); M.vis(rs, t, tSun, 1e9, POPo); M.setT($('#rStatT'), stS[0]);
    if (rs._k !== stS[0]) { rs._k = stS[0]; rs.style.background = stS[1]; rs.style.color = stS[2]; $('#rStatI').innerHTML = M.icon(stS[3], 20, stS[2], 2.8); }
    { const cs = crmState(t); pill('L', cs[0], cs[1], '', cs[2], cs[3]); }
    // Sundays
    let orders = 0;
    for (let i = 0; i < 12; i++) {
      const el = $('#sc' + i), [st, te, tm] = EV[i];
      M.vis(el, t, tM1 + 0.5 + i * 0.04, 1e9, { dy: 14 });
      const on = t >= te, zi = el.querySelector('.zi');
      let ic = 'laddoo', col = C.dim, bg = C.paper;
      if (st === 1 && on) { ic = 'check'; col = C.gold; bg = C.gold3; orders++; }
      if (st === 2 && on) { ic = 'x'; col = C.red; bg = C.redBg; }
      if (st === 3 && on) { ic = t >= tFree ? 'gift' : 'phoneCall'; col = t >= tFree ? C.gold : C.ink; bg = t >= tFree ? C.gold3 : C.paper; }
      setIco(zi, ic, col, 36, 2.4); if (el._bg !== bg) { el._bg = bg; el.style.background = bg; }
      const z = $('#zm' + i); if (tm === null) M.hide(z, true); else M.vis(z, t, tm, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      if (on && t < te + 0.3) { const s = 1 + 0.06 * Math.sin(Math.PI * (t - te) / 0.3); el.style.transform = `scale(${s.toFixed(4)})`; } else if (el.style.transform !== 'none' && t >= te + 0.3) el.style.transform = 'none';
    }
    const ci = curT(t), cx = 176 + (ci % 4) * 144, cr = Math.floor(ci + 1e-6) / 4, row = Math.floor(ci / 4 + 1e-6);
    { // interpolate between cells, wrapping rows
      const a = Math.floor(ci), f = ci - a, x0 = 176 + (a % 4) * 144, y0 = 96 + Math.floor(a / 4) * 112, b = Math.min(11, a + 1), x1 = 176 + (b % 4) * 144, y1 = 96 + Math.floor(b / 4) * 112;
      const cu = $('#cur'); cu.style.left = M.lerp(x0, x1, f).toFixed(1) + 'px'; cu.style.top = M.lerp(y0, y1, f).toFixed(1) + 'px';
      cu.style.opacity = M.clamp((t - tSun - 0.05) / 0.15).toFixed(3); M.hide(cu, t < tSun - 0.05);
    }
    M.vis($('#miss'), t, tMissed - 0.05, tCalls, { ...POPo, outDur: 0.2, osc: 0.8, ody: 0 });
    M.vis($('#bxO'), t, tM1 + 0.8, 1e9, { dy: 14 }); M.vis($('#bxF'), t, tM1 + 0.88, 1e9, { dy: 14 });
    M.setT($('#bxOV'), `${orders} of 12`);
    M.count($('#bxFV'), t, tFriends, 0.4, 0, 2, v => (v >= 0.5 ? '+' : '') + Math.round(v));
    $('#bxFV').style.color = t >= tFriends ? C.gold : C.dim;
    for (let k = 0; k < 2; k++) M.vis($('#fr' + k), t, tFriends + 0.1 + k * 0.15, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.15, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== K: building loyalty ===== */
  const kOn = t >= tTu - 0.05 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.02, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.15, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.3 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.4, tout = k < 4 ? tK[k] - 0.14 : 1e9;
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POPo);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POPo);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#phone'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    for (let i = 0; i < 5; i++) M.vis($('#sp' + i), t, tDaily + i * 0.12, tNo, { dy: 0, fade: 0.1, outDur: 0.2, ody: 0 });
    M.vis($('#one'), t, tWeek - 0.05, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tNo, tPriv][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNo ? C.redBg : C.paper; $('#bb0').style.color = t > tNo ? C.red : C.ink;
    M.vis($('#fact2'), t, tAct - 0.3, 1e9, { dy: 16 });
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
