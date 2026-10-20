// MBA - Marketing Management, Ep 34: Customer Lifetime Value (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  gift: ['M20 12v10H4V12', 'M2 7h20v5H2z', 'M12 22V7', 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z', 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'],
  cup: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;
const fmt = v => '₹' + Math.round(v).toLocaleString('en-IN');

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tCust = wt('H2', 'customer');
const tC2 = T0('C2'), tEvery = wt('C2', 'every'), tAfter = wt('C2', 'after'), tSo = wt('C2', 'So');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tTagR = wt('L1', 'Mrs'), tTagD = wt('L1', 'daughter'), tDevL = wt('L2', 'Dev'), tFive = wt('L2', 'five'), tWinL = wt('L2', 'win'), tArjL = wt('L3', 'Arjun');
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M1') - 0.32;
const tTotal = wt('D2', 'total'), tOne = wt('D3', 'one'), tEv = wt('D3', 'Every'), tYrs = wt('D3', 'years');
const tF = [wt('D4', 'profit'), wt('D4', 'years'), wt('D4', 'cost'), T1('D4') - 0.25], tOp = [wt('D4', 'times'), wt('D4', 'minus'), T1('D4') - 0.35];
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8'), tM9 = T0('M9');
const tSells = wt('M2', 'sells'), tEighty = wt('M2', 'eighty'), tForty = wt('M2', 'forty');
const tWk0 = wt('M3', 'every'), tWk1 = T1('M3') - 0.1, tForty3 = wt('M3', 'forty');
const tTimes4 = wt('M4', 'times'), tTh4 = wt('M4', 'thousand'), tFive5 = wt('M5', 'five'), tEight6 = wt('M6', 'eight');
const tLittle = wt('M7', 'little'), tTen = wt('M8', 'ten'), tWorth8 = wt('M8', 'worth'), tSix = wt('M8', 'six');
const tFive9 = wt('M9', 'five'), tWorth9 = wt('M9', 'worth');
const tMout = T0('T1') - 0.32;
// statement + K
const tT = T0('T1'), tSt2 = wt('T1', 'count', 1), tK0 = T0('K0'), tTu = tK0 - 0.32;
const tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'coffee'), wt('K3', 'gym'), wt('K4', 'bank')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'wisely'), wt('X2', 'look')], tXh = [wt('X3', 'guess'), wt('X3', 'small')];
const tStud = wt('X4', 'studied'), tLoyal = wt('X4', 'Loyal'), tArjX = wt('X5', 'Arjun'), tShop = wt('X5', 'small'), tNaniX = wt('X6', 'Nani'), tZoyaX = wt('X6', 'Zoya');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'One');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'customer'), wt('S2', 'years')], [wt('S3', 'Profit'), wt('S3', 'minus'), wt('S3', 'today')], [wt('S4', 'profit'), wt('S4', 'visits'), wt('S4', 'longer'), wt('S4', 'cheaper')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
// A
$('#tbl').style.overflow = 'visible';
$('#wFace').style.cssText += ';' + FACE('rao'); $('#aFace').style.cssText += ';' + FACE('zoya');
$('#oneCI').innerHTML = M.icon('package', 22, C.gold, 2.2);
$('#pk6').innerHTML = `<rect x="6" y="20" width="208" height="124" rx="18" fill="#14213D"/><rect x="6" y="20" width="208" height="26" rx="10" fill="#24345A"/><text x="110" y="39" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="2" fill="#F5E7C6">LADDOO LAB · 6</text>` +
  [0, 1, 2].map(c => [0, 1].map(r => laddoo(50 + c * 60, 76 + r * 40, 16)).join('')).join('');
$('#wkd').innerHTML = Array.from({ length: 40 }, (_, i) => `<div class="wd" id="wd${i}" style="left:${(i % 20) * 42}px;top:${Math.floor(i / 20) * 34}px"></div>`).join('');
// L
$('#askF').style.cssText += ';' + FACE('arjun');
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#kqI').innerHTML = M.icon('heart', 44, C.gold, 2.2); $('#onePkI').innerHTML = M.icon('package', 20, '#fff', 2.4);
$('#yRow').innerHTML = [1, 2, 3, 4, 5].map(i => `<div class="yb" id="yb${i - 1}" style="left:${24 + (i - 1) * 132}px"><i></i><span>YEAR ${i}</span></div>`).join('');
const FR = [['coin', 'Profit per year', 'EVERY YEAR'], ['calendar', 'Years they stay', 'HOW LONG'], ['gift', 'Cost to win them', 'ONE TIME'], ['heart', 'Customer lifetime value', 'CLV']];
$('#fRows').innerHTML = FR.map(([ic, t, e], i) => `<div class="fr4" id="fr${i}" style="top:${92 + i * 124}px"><i>${M.icon(ic, 28, C.gold, 2.2)}</i><div class="ft">${t}</div><div class="fe">${e}</div></div>`).join('') +
  ['×', '−', '='].map((o, i) => `<div class="op" id="op${i}" style="top:${180 + i * 124}px">${o}</div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);
// M: calculator rows + chart
const CR = [['STEP 1 · PROFIT PER PACK', ['₹120', '−', '₹80', '=', '₹40 a pack']],
  ['STEP 2 · PROFIT PER YEAR', ['40 packs', '×', '₹40', '=', '₹1,600 a year']],
  ['STEP 3 · YEARS SHE STAYS', ['₹1,600', '×', '5 years', '=', '₹8,000']],
  ["STEP 4 · IN TODAY'S MONEY", ['At 10% a year', '=', '₹6,065 today']],
  ['MINUS THE COST TO WIN HER', ['₹6,065', '−', '₹500', '=', '₹5,565']]];
$('#cRows').innerHTML = CR.map(([l, parts], r) => `<div class="cvr" id="cv${r}" style="top:${92 + r * 88}px"><div class="zn">${l}</div><div class="eq">${parts.map((p, k) => `<span id="e${r}${k}" class="${['−', '×', '='].includes(p) ? 'o' : (k === parts.length - 1 ? 'r' : '')}">${p}</span>`).join('')}</div></div>`).join('');
const tE = [[tSells, tEighty - 0.15, tEighty, tForty - 0.2, tForty],
  [tForty3, tTimes4 - 0.05, tTimes4 + 0.25, tTh4 - 0.2, tTh4],
  [tM5 + 0.2, tFive5 - 0.15, tFive5, tEight6 - 0.2, tEight6],
  [tTen, tSix - 0.2, tSix],
  [tM9 + 0.15, tFive9 - 0.15, tFive9, tWorth9 - 0.1, tWorth9 + 0.25]];
const tRowOn = [tM2, tM3, tM5, tM7, tM9];
const DISC = [1455, 1322, 1202, 1093, 993], BASE = 280, KY = 0.125, XC = [69, 206, 344, 482, 619], BWW = 84;
$('#yGrid').innerHTML = `<line x1="0" y1="${BASE}" x2="688" y2="${BASE}" stroke="#D9D0BF" stroke-width="3" stroke-linecap="round"/>` + XC.map((x, i) => `<text id="yl${i}" x="${x}" y="${BASE + 28}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" letter-spacing="2" fill="#14213D">YEAR ${i + 1}</text>`).join('');
$('#yGhost').innerHTML = XC.map((x, i) => `<rect id="yg${i}" x="${x - BWW / 2}" y="${BASE - 1600 * KY}" width="${BWW}" height="${1600 * KY}" rx="8" fill="none" stroke="#B9B1A3" stroke-width="2.5" stroke-dasharray="6 6"/>`).join('');
$('#yBars').innerHTML = XC.map((x, i) => `<rect id="ybr${i}" x="${x - BWW / 2}" width="${BWW}" rx="8" fill="#B8862F"/>`).join('');
$('#yLab').innerHTML = XC.map((x, i) => `<text id="yv${i}" x="${x}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#14213D"></text>`).join('');
$('#wDots').innerHTML = Array.from({ length: 40 }, (_, i) => `<div class="wq" id="wq${i}" style="left:${20 + (i % 20) * 32}px;top:${44 + Math.floor(i / 20) * 24}px"></div>`).join('');
$('#acqI').innerHTML = M.icon('gift', 18, C.red, 2.4);
wrap($('#mL'), 'mLOut', 784, 580);

// K: four levers
const KA = [
  ['coin', 'Profit per sale', 'More profit per sale', 'Earn a little more each time', 'A festive gift box earns more per order', 'phone', 'A phone maker sells a cover and earphones too'],
  ['repeat', 'How often', 'Buy more often', 'Give reasons to come back sooner', 'A second pack for after-school snacks', 'cup', 'A coffee shop stamp card brings you back sooner'],
  ['calendar', 'How long', 'Stay longer', 'Make staying the easy choice', 'Sunday delivery keeps families for years', 'dumbbell', 'A gym offers a cheaper yearly plan'],
  ['gift', 'Cost to win', 'Cost less to win', 'Let happy customers bring friends', "Mrs. Rao's two friends cost nothing to win", 'bank', 'A bank rewards customers who bring a friend'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PROFIT × YEARS − COST TO WIN', 'Four levers', 'Pull any one, and lifetime value grows', null]].concat(KA.map((a, i) => [`LEVER 0${i + 1} / 04`, a[2], a[3], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[5], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO A BANK</div><div class="pe"><i>${M.icon('trendUp', 34, C.gold, 2.2)}</i><span>Same levers, any size of business</span></div>`) + `</div>`).join('');

// X
const XG = [['coin', 'Spend wisely'], ['heart', 'Keep the best']];
const XH = [['help', 'Only a guess'], ['ban', 'Small buyers ignored']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const CG = [['True friends', 'HIGH PROFIT · LOYAL', 'Mrs. Rao'], ['Butterflies', 'HIGH PROFIT · SHORT STAY', 'Festive gift-box buyers'], ['Barnacles', 'LOW PROFIT · LOYAL', 'A small shop, 1 pack a month'], ['Strangers', 'LOW PROFIT · SHORT STAY', 'One-time trial takers']];
$('#cGrid').innerHTML = CG.map(([n, l, e], i) => `<div class="cg" id="cg${i}" style="left:${48 + (i % 2) * 352}px;top:${84 + Math.floor(i / 2) * 124}px"><div class="cn">${n}</div><div class="cl">${l}</div><div class="ce">${e}</div></div>`).join('');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['₹1,600', '₹4,800', '₹8,000', '₹24,000'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('coin', 44, C.gold2, 2.4);
// recap
const ROWS = [['heart', 'All the profit from one customer', ['One customer', 'All the years']], ['coin', 'The formula', ['Profit × years', '− Cost to win', "Today's money"]], ['trendUp', 'Four levers', ['Profit', 'Visits', 'Stays', 'Wins']]];
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
// running readout: value steps, each counted from the previous one
const RD = [[tForty, 40], [tTh4, 1600], [tEight6, 8000], [tSix, 6065], [tWorth9 + 0.25, 5565]];
const readout = t => { let v = 0, prev = 0; for (const [a, b] of RD) { if (t >= a) { v = prev + (b - prev) * M.o5((t - a) / 0.5); prev = b; } } return v; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const tr = $('#tgR'); tr.style.left = (60 - tr.offsetWidth) + 'px'; tr.style.top = '240px';
  const td = $('#tgD'); td.style.left = '724px'; td.style.top = '300px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.cg .ce').forEach(el => { if (el.offsetWidth > 300) el.style.fontSize = Math.floor(20 * 300 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, t < tT ? tM1 + 0.4 : 1e9, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: a 120 rupee customer? ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#wFace'), t, tMorph + 0.5, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#oneV'), t, tMorph + 0.55, { st: 0.06, sp: M.HEAVY });
    M.vis($('#pk6'), t, tMorph + 0.7, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#oneC'), t, tCust - 0.1, 1e9, POPo);
    M.vis($('#ask'), t, tC2 - 0.15, tAout, { dy: 36, ...o });
    M.vis($('#aFace'), t, tC2 + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    for (let i = 0; i < 40; i++) {
      const el = $('#wd' + i); M.vis(el, t, tC2 + 0.2 + i * 0.01, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      el.style.background = mix(C.line, C.gold, M.io((t - (tEvery + (tAfter + 0.4 - tEvery) * i / 40)) / 0.2));
    }
    M.rise($('#askQ'), t, tSo - 0.05, { st: 0.07, sp: M.HEAVY });
    // the one sale dims once Zoya counts every week
    $('#oneV').style.color = mix(C.ink, C.dim, M.io((t - tEvery) / 0.4));
  }

  /* ===== L: Dev's idea ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tTagR - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgD'), t, tTagD - 0.05, tL2 - 0.3, { ...POPo, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#offer'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#dvR'), t, tDevL - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#eq0'), t, tFive - 0.1, 1e9, POPo);
    M.draw($('#eqAP'), t, tWinL - 0.4, 0.4, M.o3);
    M.vis($('#eq1'), t, tWinL - 0.05, 1e9, POPo);
    M.vis($('#askS'), t, tArjL - 0.15, 1e9, { dy: 24 });
    M.rise($('#askS .g1'), t, tArjL + 0.1, { st: 0.04 });
    M.vis($('#askS .g2'), t, tArjL + 0.4, 1e9, { dy: 10 });
  }

  /* ===== D: what is CLV ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#kqI'), t, tD2 + 0.25, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#kqT'), t, tD2 + 0.3, { st: 0.06, sp: M.HEAVY }); M.vis($('#kqS'), t, tTotal - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.3, 1e9, { dy: 0 });
    M.vis($('#lr0'), t, tD3 - 0.1, 1e9, { dy: 16 }); M.vis($('#onePk'), t, tOne, 1e9, POPo);
    M.vis($('#lr1'), t, tEv - 0.1, 1e9, { dy: 16 });
    for (let i = 0; i < 5; i++) {
      const y = $('#yb' + i); M.vis(y, t, tEv + i * 0.08, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      y.querySelector('i').style.width = (116 * M.o3((t - tYrs - i * 0.12) / 0.4)).toFixed(1) + 'px';
      y.querySelector('span').style.color = mix(C.muted, '#fff', M.io((t - tYrs - i * 0.12 - 0.15) / 0.2));
    }
    $('#onePk').style.opacity = (1 - 0.55 * M.io((t - tYrs) / 0.4)).toFixed(3);
    M.vis($('#fm'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    FR.forEach((_, i) => {
      const el = $('#fr' + i); M.vis(el, t, tF[i] - 0.1, 1e9, { dy: 16 });
      const fin = i === 3, on = M.io((t - tF[i]) / 0.25) * (fin ? 1 : 1 - M.io((t - (tF[i + 1])) / 0.3));
      el.style.background = fin ? mix(C.paper, C.ink, M.io((t - tF[3]) / 0.3)) : mix(C.paper, C.gold3, on);
      el.querySelector('.ft').style.color = fin ? mix(C.ink, '#fff', M.io((t - tF[3]) / 0.3)) : C.ink;
      el.querySelector('.fe').style.color = fin ? mix(C.muted, C.gold2, M.io((t - tF[3]) / 0.3)) : C.muted;
      el.style.boxShadow = !fin && on > 0.01 ? `0 0 0 3px ${M.rgba(C.gold, on)}` : 'none';
    });
    for (let i = 0; i < 3; i++) M.vis($('#op' + i), t, tOp[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* ===== M: working it out ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    CR.forEach(([, parts], r) => {
      const row = $('#cv' + r); M.vis(row, t, tM1 + 0.4 + r * 0.07, 1e9, { dy: 14 });
      const nx = r < 4 ? tRowOn[r + 1] : 1e9, act = M.io((t - tRowOn[r]) / 0.25) * (1 - M.io((t - nx) / 0.3)), fin = r === 4 ? M.io((t - tE[4][4]) / 0.3) : 0;
      row.style.boxShadow = act > 0.01 && r < 4 ? `0 0 0 3px ${M.rgba(C.gold, act)}` : 'none';
      row.style.background = mix(C.paper, C.ink, fin);
      row.querySelector('.zn').style.color = t < tRowOn[r] ? C.dim : mix(C.muted, C.gold2, fin);
      parts.forEach((_, k) => {
        const s = $('#e' + r + k); M.vis(s, t, tE[r][k] - 0.05, 1e9, { dy: 12, sp: M.SOFT, fade: 0.12 });
        if (r === 4 && k < parts.length - 1 && !['−', '='].includes(parts[k])) s.style.color = mix(C.ink, '#fff', fin);
      });
    });
    // chart
    M.vis($('#ychart'), t, tM1 + 0.45, 1e9, { dy: 20, sp: M.SOFT });
    const ghost = M.clamp((t - tLittle) / 0.3);
    for (let i = 0; i < 5; i++) {
      const tg = i === 0 ? tTh4 : tFive5 + 0.1 + (i - 1) * 0.14, g = M.o3((t - tg) / 0.5);
      const td = tWorth8 + i * 0.16, d = M.o3((t - td) / 0.5);
      const v = M.lerp(1600, DISC[i], d) * g, h = v * KY, b = $('#ybr' + i);
      attr(b, 'y', (BASE - h).toFixed(2)); attr(b, 'height', Math.max(0, h).toFixed(2)); M.hide(b, h < 0.5);
      attr(b, 'fill', mix(C.gold, '#C99B4A', d));
      const lab = $('#yv' + i); attr(lab, 'y', (BASE - Math.max(h, 1600 * KY * (ghost > 0 ? 1 : 0)) - 12).toFixed(2));
      M.setT(lab, fmt(M.lerp(1600, DISC[i], d))); lab.style.opacity = M.clamp((t - tg - 0.2) / 0.2).toFixed(3);
      attr(lab, 'fill', d > 0.5 ? C.gold : C.ink);
      $('#yg' + i).style.opacity = (ghost * M.clamp((t - tg) / 0.2)).toFixed(3);
      $('#yl' + i).style.opacity = M.clamp((t - tM1 - 0.6 - i * 0.06) / 0.15).toFixed(3);
    }
    M.vis($('#rdV'), t, tM1 + 0.5, 1e9, { dy: 10 });
    M.setT($('#rdV'), fmt(readout(t))); $('#rdV').style.color = t >= tWorth9 + 0.25 ? C.gold : C.ink;
    M.vis($('#acq'), t, tFive9 - 0.05, 1e9, POPo);
    { const sp = $('#split'); M.vis(sp, t, tSells - 0.1, tTimes4 - 0.2, { dy: 16, outDur: 0.3, ody: -12 });
      const c = M.o3((t - tSells) / 0.5), f = M.o3((t - tEighty) / 0.5);
      $('#spC').style.cssText = `left:0;width:${(688 * c).toFixed(1)}px;background:#E2DACB`;
      const fw = 688 / 3; $('#spC').style.width = (688 * 2 / 3 * c).toFixed(1) + 'px';
      $('#spF').style.cssText = `left:${(688 * 2 / 3).toFixed(1)}px;width:${(fw * M.o3((t - tForty + 0.2) / 0.4)).toFixed(1)}px;background:#B8862F`;
      $('#spCT').style.opacity = M.clamp((t - tEighty) / 0.2).toFixed(3);
      const ft = $('#spFT'); ft.style.left = (688 * 2 / 3 + 24).toFixed(1) + 'px'; ft.style.opacity = M.clamp((t - tForty) / 0.2).toFixed(3);
      M.vis($('#spP'), t, tForty + 0.2, 1e9, { dy: 8 }); }
    M.vis($('#wkBox'), t, tM1 + 0.7, 1e9, { dy: 14 });
    let n = 0;
    for (let i = 0; i < 40; i++) { const tw = tWk0 + (tWk1 - tWk0) * i / 40, u = M.io((t - tw) / 0.15); if (t >= tw) n = i + 1; $('#wq' + i).style.background = mix(C.line, C.gold, u); }
    M.setT($('#wkV'), `${n} PACKS`); $('#wkV').style.color = n ? C.gold : C.dim;
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

  /* ===== K: four levers ===== */
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
    CG.forEach((_, i) => {
      const el = $('#cg' + i); M.vis(el, t, tX4 + 0.45 + i * 0.2, 1e9, POPo);
      const hi = i === 0 ? M.io((t - tLoyal) / 0.3) * (1 - M.io((t - tShop) / 0.3)) : i === 2 ? M.io((t - tShop) / 0.3) : 0;
      el.style.background = mix(C.paper, i === 2 ? C.redBg : C.gold3, hi);
    });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tArjX, tNaniX, tZoyaX][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNaniX + 0.3 ? C.redBg : C.paper; $('#bb0').style.color = t > tNaniX + 0.3 ? C.red : C.ink;
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
