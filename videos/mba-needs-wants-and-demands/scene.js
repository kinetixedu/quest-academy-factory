// MBA - Marketing Management, Ep 03: Needs, Wants and Demands (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  swap: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', circ(7, 17, 2), 'M9 17h6', circ(17, 17, 2)],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', circ(17, 18, 2), circ(7, 18, 2)],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  apple: ['M12 6.528V3a1 1 0 0 1 1-1', 'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', circ(12, 12, 3)],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  call: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', circ(12, 13, 3)],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;
const ACC = s => s.replace(/\*(.+?)\*/g, '<span class="acc">$1</span>');

Object.assign(M.IC, {
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  wallet: ['M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1', 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFiveA = wt('H2', 'five');
const tC2 = T0('C2'), tWhyA = wt('C2', 'Why'), tMeth = [wt('C2', 'hungry'), wt('C2', 'wanting'), wt('C2', 'pay')], tNotA = wt('C2', 'not');
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32;
const tSb = [wt('L1', 'Needs'), wt('L1', 'wants'), wt('L1', 'demands')], tExact = wt('L2', 'exactly');
const tD1 = T0('D1'), tD2 = T0('D2'), tD = [T0('D3'), T0('D4'), T0('D5')], tLout = tD1 - 0.32;
const tChip = [wt('D3', 'food'), T1('D4') - 0.7, wt('D5', 'pay')];
const tE1 = T0('E1'), tE2 = T0('E2'), tE3 = T0('E3'), tE4 = T0('E4'), tDout = tE1 - 0.32;
const tDau = wt('E1', 'daughter'), tNeedE = wt('E1', 'need'), tBlr = wt('E2', 'Bengaluru'), tLon = wt('E2', 'London'), tSame = wt('E3', 'Same');
const tHund = wt('E4', 'hundred'), tHappy = wt('E4', 'happy'), tDem = wt('E4', 'demand');
const tT = T0('T1'), tSt2 = wt('T1', 'They'), tEout = tT - 0.32;
const tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tTu = tF[0] - 0.32;
const tForty = wt('F2', 'forty'), tTwelve = wt('F3', 'Twelve'), tRest = wt('F3', 'rest'), tFive = wt('F4', 'five'), tNaniF = wt('F5', 'Nani');
const tG = [1, 2, 3, 4, 5, 6].map(i => T0('G' + i)), tFout = tG[0] - 0.32;
const tLv = [wt('G2', 'body'), wt('G2', 'safety'), wt('G3', 'love'), wt('G3', 'esteem'), wt('G4', 'top')], tGfive = wt('G1', 'five');
const tFills = wt('G6', 'fills'), tRaoG = wt('G6', 'Rao'), tLove = wt('G6', 'love');
const tK0 = T0('K0'), tK = [1, 2, 3].map(i => T0('K' + i)), tGout = tK0 - 0.32, tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'phone'), wt('K3', 'airline')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'real'), wt('X2', 'serve')], tXh = [wt('X3', 'want'), wt('X3', 'spend')];
const tArjX = wt('X4', 'Arjun'), tZoyX = wt('X5', 'Zoya'), tDebt = wt('X5', 'debt'), tStudy = wt('X6', 'study');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'He');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'food')], [wt('S3', 'culture'), wt('S3', 'personality')], [wt('S4', 'buying')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: forty students
const BUY = [3, 9, 14, 26, 33];
$('#pgrid').innerHTML = Array.from({ length: 40 }, (_, i) => `<div class="pg" id="pg${i}" style="left:${36 + (i % 20) * 42}px;top:${80 + Math.floor(i / 20) * 44}px"></div>`).join('');
$('#cSoldI').innerHTML = M.icon('check', 24, C.gold, 2.6); $('#cLeftI').innerHTML = M.icon('users', 24, C.muted, 2.4);
const METH = [['check', 'Hungry', 0], ['help', 'Want a laddoo?', 1], ['coin', 'Can pay ₹120?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, q], i) => `<div class="stp" id="mt${i}" style="top:76px;${q ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, q ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: stack
const SB = [['apple', 'Need', 688, 48, 92], ['heart', 'Want', 552, 116, 220], ['coin', 'Demand', 416, 184, 348]];
$('#sbs').innerHTML = SB.map(([ic, n, w, x, y], i) => `<div class="sb" id="sb${i}" style="left:${x}px;top:${y}px;width:${w}px;${i === 2 ? 'background:#14213D;color:#fff' : i === 1 ? 'background:#F3EAD6' : ''}"><i>${M.icon(ic, 30, C.gold, 2.2)}</i><span>${n}</span></div>`).join('');
$('#stkPI').innerHTML = M.icon('laddoo', 22, '#fff', 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: three columns
const DC = [
  ['01 · NEED', 'Need', 'apple', ['A <b>state of felt</b>', '<b>deprivation</b>.', 'Something basic you lack.'], ['apple', 'Like food']],
  ['02 · WANT', 'Want', 'heart', ['The <b>form</b> a need takes,', 'shaped by <b>culture</b>', 'and <b>personality</b>.'], ['laddoo', 'A laddoo, or a sandwich']],
  ['03 · DEMAND', 'Demand', 'coin', ['A want backed by', '<b>buying power</b>.', 'You want it, and can pay.'], ['wallet', '₹120, ready to spend']],
];
$('#dcs').innerHTML = DC.map(([l, w, ic, ls, [ci, ct]], k) => `<div class="dc" id="dc${k}" style="left:${160 + k * 544}px"><div class="bg"></div><div class="lbl dcL">${l}</div><div class="dcI">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="serif dcW">${w}</div><div class="dcH"></div>` +
  ls.map((s, j) => `<div class="dcT" id="dt${k}${j}" style="top:${196 + j * 42}px">${s}</div>`).join('') + `<div class="dcE" id="de${k}">${M.icon(ci, 22, C.gold, 2.4)}<span>${ct}</span></div></div>`).join('');
// E: journey
$('#jc2I').innerHTML = M.icon('wallet', 20, C.gold, 2.4); $('#jc3I').innerHTML = M.icon('smile', 20, C.gold, 2.4); $('#jc4I').innerHTML = M.icon('check', 20, C.gold2, 3);
// F: the count
const W = [1, 4, 6, 9, 13, 17, 20, 24, 27, 31, 34, 38], D = [4, 13, 20, 31, 38], WR = W.filter(i => !D.includes(i));
$('#pds').innerHTML = Array.from({ length: 40 }, (_, i) => `<div class="pd" id="pd${i}"></div>`).join('');
const posN = i => [48 + (i % 5) * 40, 170 + Math.floor(i / 5) * 40];
const posW = j => [336 + (j % 3) * 40, 170 + Math.floor(j / 3) * 40];
const posD = j => [568 + (j % 2) * 40, 170 + Math.floor(j / 2) * 40];
const FR = [['NEED · HUNGRY', 40, C.ink2], ['WANT · A HEALTHY SWEET', 12, C.gold], ['DEMAND · CAN PAY ₹120', 5, C.ink]];
$('#frs').innerHTML = FR.map(([l, v, c], i) => `<div class="fr2" id="fr${i}" style="top:${96 + i * 104}px"><div class="lbl">${l}</div><div class="tr"></div><div class="fl" id="fl${i}" style="background:${c}"></div><div class="serif fv" id="fv${i}">0</div></div>`).join('');
$('#fbPI').innerHTML = M.icon('laddoo', 26, C.gold2, 2.4);
// G: Maslow
const LV = [['Body needs', 'food, water, sleep'], ['Safety', 'a safe home'], ['Love and belonging', 'family and friends'], ['Esteem', 'feeling respected'], ['Self-actualization', 'becoming your best self']];
const hw = y => 180 * y / 380;
$('#pyr').innerHTML = LV.map((_, i) => { const yb = 380 - i * 76, yt = yb - 70; return `<path id="lv${i}" d="M${(180 - hw(yt)).toFixed(1)} ${yt} H${(180 + hw(yt)).toFixed(1)} L${(180 + hw(yb)).toFixed(1)} ${yb} H${(180 - hw(yb)).toFixed(1)} Z" fill="#EEE8DB" stroke-linejoin="round"/>`; }).join('');
$('#mls').innerHTML = LV.map(([a, b], i) => { const cy = 156 + 380 - i * 76 - 35; return `<div class="ml" id="ml${i}" style="top:${cy - 30}px">${a}</div><div class="mx" id="mx${i}" style="top:${cy + 4}px">${b}</div>`; }).join('');
$('#mr0I').innerHTML = M.icon('apple', 34, C.gold, 2.2); $('#mr1I').style.cssText = FACE('rao');
$('#m2PI').innerHTML = M.icon('check', 22, '#fff', 3);
wrap($('#mz'), 'mzOut', 784, 580);
// K: at work today
const KA = [
  ['apple', 'Needs', 'Basic and shared', 'Kids get hungry at school', 'hospital', 'A hospital meets the basic need to get well'],
  ['heart', 'Wants', 'Shaped by taste', 'In Bengaluru, a sweet laddoo', 'phone', 'A phone maker sells one phone in many colours'],
  ['coin', 'Demand', 'Want plus money', 'Five buyers ready to pay ₹120', 'plane', 'An airline checks who will pay before a new route'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${110 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THREE WORDS TODAY', 'Need, want, demand', 'Every business works with all three', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 03`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOSPITAL TO AN AIRLINE</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Know which one you are serving</span></div>`) + `</div>`).join('');
// X: human side
const XG = [['search', 'Find the real need'], ['heart', 'Serve people well']];
const XH = [['megaphone', 'Wants feel like needs'], ['coin', 'Spending too much']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb0I').innerHTML = M.icon('clock', 20, C.gold, 2.4); $('#bb1I').innerHTML = M.icon('ban', 20, C.red, 2.4); $('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#factI').innerHTML = M.icon('search', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz + recap
const OPTS = ['Need', 'Want', 'Demand', 'Value'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('wallet', 44, C.gold2, 2.4);
const ROWS = [['apple', 'Need: something basic you lack', ['Food']], ['heart', 'Want: the form a need takes', ['Culture', 'Personality']], ['coin', 'Demand: a want with buying power', ['₹120 to spend']]];
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
const rowHi = (el, ic, t, ta, td) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
  el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
  el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
  el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
  el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
};
const jY = M.track(156, [[tE2 - 0.1, 296], [tE4 - 0.05, 436]], M.HEAVY);
// a dot's position: NEED grid, then WANT grid, then DEMAND grid (remaining WANT dots re-pack)
const dotPos = (i, t) => {
  let [x, y] = posN(i); const j = W.indexOf(i);
  if (j < 0) return [x, y];
  const u1 = M.spring(t - tTwelve - 0.1 - j * 0.06, M.HEAVY); const [wx, wy] = posW(j);
  x = M.lerp(x, wx, u1); y = M.lerp(y, wy, u1);
  const d = D.indexOf(i);
  if (d >= 0) { const u2 = M.spring(t - tFive - d * 0.1, M.HEAVY), [dx, dy] = posD(d); return [M.lerp(x, dx, u2), M.lerp(y, dy, u2)]; }
  const r = WR.indexOf(i), u3 = M.spring(t - tFive - 0.6 - r * 0.05, M.HEAVY), [rx, ry] = posW(r);
  return [M.lerp(x, rx, u3), M.lerp(y, ry, u3)];
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
  const sp = $('#stkP'); sp.style.left = (392 - sp.offsetWidth / 2) + 'px';
  const sr = $('#srcR'); sr.style.left = (1560 - sr.offsetWidth) + 'px';
  document.querySelectorAll('.dc .dcT').forEach(el => { if (el.offsetWidth > 440) el.style.fontSize = Math.floor(26 * 440 / el.offsetWidth) + 'px'; });
  $('#jc1x').style.left = (28 + $('#jc0x').offsetWidth + 16) + 'px';
  $('#jc3x').style.left = (28 + $('#jc2x').offsetWidth + 16) + 'px';
  $('#jc4x').style.left = (728 - $('#jc4x').offsetWidth) + 'px';
  $('#m2P').style.left = (392 - $('#m2P').offsetWidth / 2) + 'px';
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [tF[0] + 0.3, tFout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: forty hungry, five buy ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 40; i++) {
      const el = $('#pg' + i); M.vis(el, t, tMorph + 0.5 + i * 0.02, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const b = BUY.includes(i), s = b ? M.io((t - tFiveA - BUY.indexOf(i) * 0.06) / 0.25) : 0, l = !b ? M.io((t - tFiveA - 0.5 - i * 0.008) / 0.25) : 0;
      el.style.background = mix(mix(C.ink2, C.gold, s), C.paper2, l);
      el.style.boxShadow = s > 0.5 ? '0 0 0 3px ' + C.gold3 : 'none';
      setIco(el, 'user', l > 0.5 ? C.dim : '#fff', 18, 2.4);
    }
    M.vis($('#cSold'), t, tFiveA - 0.05, 1e9, POP); M.count($('#cSoldN'), t, tFiveA, 0.5, 0, 5);
    M.vis($('#cLeft'), t, tFiveA + 0.6, 1e9, POP);
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#mt' + i), t, tMeth[i] - 0.1, 1e9, POP);
    M.rise($('#askT'), t, tNotA - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: Mrs. Rao + three words ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tSb[0] - 0.3);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#stk'), t, tSb[0] - 0.18, tLout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#sb' + i), t, tSb[i] - 0.05, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#stkP'), t, tExact - 0.1, 1e9, POP);
  }

  /* ===== D: the definitions ===== */
  const dOn = t >= tD1 - 0.1 && t < tE1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#src'), t, tD2 + 0.05, tDout, { dy: 36, ...o });
    M.rise($('#srcN'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.vis($('#srcB'), t, wt('D2', 'Principles') - 0.05, 1e9, { dy: 10 });
    M.vis($('#srcR'), t, tD2 + 0.9, 1e9, { dy: 10 });
    for (let k = 0; k < 3; k++) {
      const c = $('#dc' + k); M.vis(c, t, tD[k] + 0.05, tDout, { dy: 36, ...o });
      for (let j = 0; j < 3; j++) M.vis($('#dt' + k + j), t, tD[k] + 0.5 + j * 0.35, 1e9, { dy: 12 });
      M.vis($('#de' + k), t, tChip[k] - 0.05, 1e9, POP);
      const on = M.io((t - tD[k]) / 0.3) * (k < 2 ? 1 - M.io((t - tD[k + 1]) / 0.3) : 1);
      c.querySelector('.dcI').style.background = mix(C.paper, C.ink, on);
      setIco(c.querySelector('.dcI'), DC[k][2], on > 0.5 ? C.gold2 : C.gold, 34, 2.2);
    }
  }

  /* ===== E: Mrs. Rao, from need to demand ===== */
  const eOn = t >= tE1 - 0.1 && t < tT + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero2'), t, tE1 + 0.1, tEout, { dx: -60, dy: 0, ...o });
    M.vis($('#rImg'), t, tE1 + 0.35, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#rName'), t, tE1 + 0.5, { st: 0.06 }); M.vis($('#rTag'), t, tE1 + 0.7, 1e9, { dy: 10 });
    M.vis($('#jr'), t, tE1 + 0.25, tEout, { dx: 60, dy: 0, ...o });
    const y = jY(t); attr($('#jmv'), 'transform', `translate(72 ${y.toFixed(1)})`); attr($('#jtrl'), 'd', `M72 156 V${Math.max(156.01, y).toFixed(1)}`);
    M.vis($('#jtrk'), t, tDau - 0.2, 1e9, { dy: 0, fade: 0.15 });
    const tw = [tDau - 0.1, tE2 - 0.05, tE4 - 0.05];
    for (let i = 0; i < 3; i++) {
      const r = $('#jw' + i); M.vis(r, t, tw[i], 1e9, { dx: 24, dy: 0 });
      const on = M.io((t - tw[i] - 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - tw[i + 1] - 0.3) / 0.3) : 1);
      r.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    }
    M.rise($('#jw0 .jt'), t, tDau, { st: 0.04 });
    M.vis($('#jc0x'), t, tBlr - 0.05, 1e9, POP); M.vis($('#jc1x'), t, tLon - 0.05, 1e9, POP);
    { const s = M.io((t - tSame) / 0.3); const a = $('#jc0x'), b = $('#jc1x');
      a.style.background = mix('#fff', C.gold, s); a.style.color = mix(C.ink, '#fff', s); b.style.background = mix('#fff', C.ink, s); b.style.color = mix(C.ink, '#fff', s); }
    M.vis($('#jc2x'), t, tHund - 0.1, 1e9, POP); M.vis($('#jc3x'), t, tHappy - 0.05, 1e9, POP); M.vis($('#jc4x'), t, tDem - 0.1, 1e9, POP);
    $('#jmv').style.opacity = M.clamp((t - tDau + 0.1) / 0.15).toFixed(3);
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

  /* ===== F: the count at the gate ===== */
  const fOn = t >= tTu - 0.05 && t < tG[0] + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fz'), t, tF[0] + 0.02, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#fb'), t, tF[0] + 0.2, tFout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 40; i++) {
      const el = $('#pd' + i), [x, y] = dotPos(i, t);
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      M.vis(el, t, tF[0] + 0.5 + i * 0.015, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const h = M.io((t - tForty - i * 0.015) / 0.25), j = W.indexOf(i), d = D.indexOf(i);
      const g = j >= 0 ? M.io((t - tTwelve - 0.1 - j * 0.06) / 0.3) : 0, r = j < 0 ? M.io((t - tRest - i * 0.01) / 0.3) : 0;
      const n = d >= 0 ? M.io((t - tFive - d * 0.1) / 0.3) : 0;
      el.style.background = mix(mix(mix(mix(C.line, C.ink2, h), C.gold, g), C.paper2, r), C.ink, n);
      el.style.boxShadow = n > 0.5 ? '0 0 0 3px ' + C.gold : 'none';
      setIco(el, 'user', h < 0.5 || r > 0.5 ? C.dim : '#fff', 18, 2.4);
    }
    M.count($('#zc0'), t, tForty, 0.9, 0, 40); M.count($('#zc1'), t, tTwelve, 0.8, 0, 12); M.count($('#zc2'), t, tFive, 0.6, 0, 5);
    const tb = [tForty, tTwelve, tFive];
    FR.forEach(([, v], i) => {
      M.vis($('#fr' + i), t, tb[i] - 0.2, 1e9, { dy: 14 });
      const u = M.spring(t - tb[i] - 0.1, M.HEAVY), wd = 560 * v / 40 * Math.max(0, u);
      snap($('#fl' + i), (u >= 1 ? 560 * v / 40 : wd).toFixed(1) + 'px', 'width');
      M.count($('#fv' + i), t, tb[i] + 0.1, 0.8, 0, v);
    });
    M.vis($('#fbP'), t, tNaniF - 0.1, 1e9, POP);
  }

  /* ===== G: Maslow ===== */
  const gOn = t >= tG[0] - 0.1 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    const mz = $('#mz'); M.vis(mz, t, tG[0] + 0.05, tGout, { dy: 36, ...o }); grow(mz, $('#mzOut'), t, tG[4]);
    M.rise($('#mzT'), t, tG[0] + 0.3, { st: 0.06, sp: M.HEAVY });
    for (let i = 0; i < 5; i++) {
      const p = $('#lv' + i); M.vis(p, t, tGfive - 0.2 + i * 0.08, 1e9, { dy: 16, fade: 0.12 });
      const lit = M.io((t - tLv[i] + 0.05) / 0.3), cur = lit * (i < 4 ? 1 - M.io((t - tLv[i + 1] + 0.05) / 0.3) : 1 - M.io((t - tG[4]) / 0.3));
      const link = i === 0 ? M.io((t - tFills) / 0.3) : i === 2 ? M.io((t - tRaoG) / 0.3) : 0;
      attr(p, 'fill', mix(mix(mix(C.paper2, C.gold, lit), C.ink, cur), C.ink, link));
      M.vis($('#ml' + i), t, tGfive + i * 0.08, 1e9, { dx: -12, dy: 0 }); M.vis($('#mx' + i), t, tGfive + 0.1 + i * 0.08, 1e9, { dx: -12, dy: 0 });
      $('#ml' + i).style.color = t < tLv[i] - 0.05 ? C.dim : C.ink;
    }
    M.vis($('#m2'), t, tG[4] + 0.12, tGout, { dx: 60, dy: 0, ...o });
    M.vis($('#mr0'), t, tFills - 0.1, 1e9, { dy: 16 }); M.vis($('#mr1'), t, tRaoG - 0.1, 1e9, { dy: 16 });
    M.vis($('#m2P'), t, tLove + 0.1, 1e9, POP);
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => { const el = $('#kr' + i); M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); rowHi(el, ic, t, tK[i], i < 2 ? tK[i + 1] : tKout + 1); });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 3 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP); M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tArjX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, tZoyX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr2'), t, tDebt - 0.2, 1e9, { dx: 24, dy: 0 });
    $('#bb1').style.background = C.redBg; $('#bb1').style.color = C.red;
    M.vis($('#fact'), t, tStudy - 0.15, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tq + 0.7, { st: 0.06, sp: M.HEAVY });
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
