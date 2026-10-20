// MBA - Marketing Management, Ep 09: Market Segmentation (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', ld: '#A8713A', ldD: '#7E5428', goldD: '#D9C08C' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  tagN: ['M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z', 'M7.5 7.5h.01'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tPar = wt('H2', 'Parents'), tShrug = wt('H2', 'shrug'), tPast = wt('H2', 'past');
const tC2 = T0('C2'), tOneM = wt('C2', 'message'), tEvery = wt('C2', 'everyone'), tNoOne = wt('C2', 'no');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4'), tDiff = wt('L1', 'Different'), tClock = wt('L4', 'four');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tDiv = wt('D2', 'dividing'), tGroups = wt('D2', 'groups'), tHl = [tDiv, wt('D2', 'needs'), wt('D2', 'characteristics')], tWen = wt('D3', 'Wendell');
const tSw = [wt('D4', 'everyone'), wt('D4', 'Group'), wt('D4', 'thing')];
// M: sorting the answers
const tM0 = T0('M0'), tM1 = T0('M1'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7');
const tSt = [wt('M1', 'lays'), wt('M2', 'sorts'), tM3, wt('M6', 'name')];
const tColor = wt('M2', 'When'), tMove = [wt('M3', 'tiffins'), wt('M4', 'workouts'), wt('M5', 'office')];
const tNm = [wt('M7', 'Tiffin'), wt('M7', 'Gym'), wt('M7', 'Office')];
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'It'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: four bases
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('R0') - 0.32;
const PCH = [[wt('P1', 'live'), wt('P1', 'schools')], [wt('P2', 'parents'), wt('P2', 'aged')], [wt('P3', 'live'), wt('P3', 'care')], [wt('P4', 'eat'), wt('P4', 'often')]];
// R: five tests
const tR0 = T0('R0'), tRout = T0('K0') - 0.32;
const tTest = [wt('R1', 'Measurable'), wt('R1', 'Accessible'), wt('R2', 'Substantial'), wt('R2', 'Differentiable'), wt('R3', 'actionable')], tPass = wt('R3', 'pass');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'food'), wt('K2', 'bank'), wt('K3', 'phone'), wt('K4', 'bakery')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Money'), wt('X2', 'messages')], tXh = [wt('X3', 'tiny'), wt('X3', 'stereotypes')];
const tSurv = wt('X5', 'survey'), tFath = wt('X5', 'fathers'), tGrand = wt('X5', 'grandparents'), tTif = wt('X6', 'tiffin'), tJust = wt('X6', 'mothers');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'different')], [wt('S3', 'geographic'), wt('S3', 'demographic'), wt('S3', 'psychographic'), wt('S3', 'behavioural')], [wt('S4', 'measured'), wt('S4', 'reached'), wt('S4', 'served')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const SEG = [['cap', 'Parents', 'Tiffin parents'], ['dumbbell', 'Gym-goers', 'Gym-goers'], ['briefcase', 'Office workers', 'Office snackers']], SCOL = [C.gold, C.ink, C.ld];
// A: one poster, three reactions
const RX = [['users', 'Parents', 'check', 'Stop'], ['dumbbell', 'Gym-goers', 'minus', 'Shrug'], ['briefcase', 'Office workers', 'x', 'Walk past']];
$('#rxs').innerHTML = RX.map(([ic, t], i) => `<div class="rx" id="rx${i}" style="top:${72 + i * 64}px"><div class="bg"></div><div class="ri">${M.icon(ic, 24, C.ink, 2.2)}</div><div class="rt">${t}</div><div class="rv" id="rv${i}"></div></div>`).join('');
RX.forEach(([, , ic, v], i) => { const rv = $('#rv' + i), col = [C.gold, C.muted, C.red][i]; rv.innerHTML = M.icon(ic, 20, i ? col : '#fff', 2.8) + `<span>${v}</span>`; rv.style.background = [C.gold, C.paper2, C.redBg][i]; rv.style.color = [ '#fff', C.muted, C.red][i]; });
$('#pstL').innerHTML = [76, 106, 136].map(x => `<g transform="translate(${x} 146)"><circle r="11" fill="#A8713A" stroke="#7E5428" stroke-width="2"/></g>`).join('');
const METH = [['megaphone', '1 message'], ['users', '3 kinds of buyers'], ['target', '1 group reached']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px;${i === 2 ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 24, i === 2 ? C.red : C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L: three needs
const WHO = [['rao', null, 'Parents', 'A healthy sweet for the tiffin box', 'laddoo'], [null, 'dumbbell', 'Gym-goers', 'Protein after a workout', 'zap'], [null, 'briefcase', 'Office workers', 'A small snack at 4 pm', 'clock']];
$('#wRows').innerHTML = WHO.map(([f, ic, n, d, ic2], i) => `<div class="wr" id="wr${i}" style="top:${88 + i * 128}px"><div class="bg"></div>${f ? `<div class="fa" style="${FACE(f)}"></div>` : `<div class="fi">${M.icon(ic, 34, C.gold2, 2.2)}</div>`}<div class="wn">${n}</div><div class="wd">${d}</div><div class="wic">${M.icon(ic2, 28, C.gold, 2.2)}</div></div>`).join('');
$('#gapI').innerHTML = M.icon('users', 22, C.gold2, 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: split diagram + simple words
const rs = M.rng(11), SP0 = Array.from({ length: 30 }, () => [30 + rs() * 190, 22 + rs() * 120]);
const SPK = i => i % 3, SPJ = i => Math.floor(i / 3), SPC = i => [360 + SPK(i) * 150 - 44 + (SPJ(i) % 5) * 22, 60 + Math.floor(SPJ(i) / 5) * 24];
$('#split').innerHTML = `<rect x="0" y="0" width="250" height="170" rx="20" fill="#F5F1E8"/><text x="125" y="160" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">ONE MARKET</text><path id="spA" d="M262 85 H300 M290 75 L302 85 L290 95" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
  [0, 1, 2].map(k => `<rect id="spB${k}" x="${360 + k * 150 - 62}" y="0" width="124" height="170" rx="20" fill="#F5F1E8"/><text id="spT${k}" x="${360 + k * 150}" y="150" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">GROUP ${k + 1}</text>`).join('') +
  Array.from({ length: 30 }, (_, i) => `<circle id="sp${i}" r="8" fill="${SCOL[SPK(i)]}"/>`).join('');
const SWT = [['ban', 'NOT', 'One for all'], ['users', 'BUT', 'Group by want'], ['check', 'SO', 'Want the same']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: sorting 150 answers. Plan coords inside a 688 x 250 svg. */
const ND = 150, CNT = [60, 40, 50], CX = [118, 344, 570];
const rk = M.rng(5), KIND = []; CNT.forEach((n, k) => { for (let j = 0; j < n; j++) KIND.push(k); });
for (let i = ND - 1; i > 0; i--) { const j = Math.floor(rk() * (i + 1)); [KIND[i], KIND[j]] = [KIND[j], KIND[i]]; }
const IDX = []; { const c = [0, 0, 0]; KIND.forEach(k => IDX.push(c[k]++)); }
const PILE = i => [44 + (i % 25) * 25, 46 + Math.floor(i / 25) * 24];
const CLU = i => { const k = KIND[i], j = IDX[i]; return [CX[k] - 76.5 + (j % 10) * 17, 30 + Math.floor(j / 10) * 17]; };
$('#mLIn').innerHTML = `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">SORTING 150 ANSWERS · 4 STEPS</div><div class="serif mrd" id="rdL">0 / 150</div>
    <svg class="mplan" id="planL" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${Array.from({ length: ND }, (_, i) => `<circle id="dt${i}" r="5.5" cx="0" cy="0" fill="#B9B1A3"/>`).join('')}
      ${[0, 1, 2].map(k => `<g id="cl${k}"><text x="${CX[k]}" y="168" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">${SEG[k][2].toUpperCase()}</text><text id="cn${k}" x="${CX[k]}" y="210" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="${SCOL[k]}">${CNT[k]}</text></g>`).join('')}
    </svg>
    <div class="mbar" id="barL">${[0, 1, 2, 3].map(k => `<i id="seg${k}" style="left:${k * 174}px;width:166px"></i>`).join('')}</div>
    <div class="mtk" style="left:48px">LAY OUT</div><div class="mtk" style="right:48px">NAME</div>
    <div class="mst" id="msL"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
wrap($('#mL'), 'mLOut', 784, 580);
const SGR = [['rao', null, 'SEGMENT 01 · TIFFIN TIME', 'A healthy tiffin sweet'], [null, 'dumbbell', 'SEGMENT 02 · AFTER A WORKOUT', 'More protein'], [null, 'briefcase', 'SEGMENT 03 · OFFICE BREAKS', 'A small 4 pm snack']];
$('#sgRows').innerHTML = SGR.map(([f, ic, l, nd], i) => `<div class="pr3" id="sg${i}" style="top:${96 + i * 132}px"><div class="bg"></div>${f ? `<div class="ri" style="${FACE(f)};background-size:cover;box-shadow:0 0 0 4px #B8862F"></div>` : `<div class="ri" style="background:${SCOL[i]}">${M.icon(ic, 32, C.gold2, 2.2)}</div>`}<div class="rl">${l}</div><div class="rt" id="sgt${i}">${nd}</div><div class="serif pv" id="sgp${i}" style="color:${SCOL[i]}">${CNT[i]}</div></div>`).join('');
$('#halfI').innerHTML = M.icon('filter', 22, C.gold2, 2.4);

// P: four bases
const P4 = [['pin', 'Geographic', 'Where they live', 'arjun', 'Homes near three schools in Bengaluru', ['City', 'Near schools']],
  ['users', 'Demographic', 'Who they are', 'rao', 'Parents of children aged 5 to 12', ['Parents', 'Age 5 to 12']],
  ['heart', 'Psychographic', 'How they live', 'nani', 'Families who care about healthy food', ['Lifestyle', 'Values']],
  ['repeat', 'Behavioural', 'What they do', 'zoya', 'When they eat, and how often they buy', ['Occasion', 'How often']]];
$('#p4').innerHTML = P4.map(([ic, a, b], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2" style="font:600 26px Poppins;top:232px">${b}</div></div>`).join('');
$('#pePans').innerHTML = [[null, 'FOUR WAYS TO SPLIT A MARKET', 'Where, who, how they live, what they do', []]].concat(P4.map((p, i) => [p[3], `BASE 0${i + 1} · AT LADDOO LAB`, p[4], p[5]])).map(([f, l, x, ch], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('grid', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div>${ch.map((c, j) => `<div class="fp" id="pc${k}${j}x" style="top:96px">${c}</div>`).join('')}</div>`).join('');

// R: five tests x three segments
const TESTS = [['Measurable', 'You can count it'], ['Accessible', 'You can reach it'], ['Substantial', 'Big enough to earn money'], ['Differentiable', 'It wants something different'], ['Actionable', 'You can build a plan for it']];
const MCX = [890, 1150, 1410];
$('#mHead').innerHTML = SEG.map(([ic, , n], k) => `<div class="mh" id="mh${k}" style="left:${MCX[k] - 130}px">${M.icon(ic, 26, SCOL[k], 2.2)}<span>${n}</span></div>`).join('');
$('#mRows').innerHTML = TESTS.map(([a, b], i) => `<div class="mr" id="mr${i}" style="top:${152 + i * 82}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="rt">${a}</div><div class="rd">${b}</div>${[0, 1, 2].map(k => `<div class="tk" id="tk${i}${k}" style="left:${MCX[k] - 48 - 22}px">${M.icon('check', 24, '#fff', 3)}</div>`).join('')}</div>`).join('');
$('#allI').innerHTML = M.icon('check', 22, '#fff', 3);

// K: at work today
const KA = [
  ['pin', 'Geographic', 'Where people live', 'Start with homes near three schools', 'bike', 'A delivery app shows different dishes in each city'],
  ['users', 'Demographic', 'Who people are', 'Parents of children aged 5 to 12', 'bank', 'A bank offers a special account for students'],
  ['heart', 'Psychographic', 'How people live', 'Families who read food labels', 'phone', 'A phone maker sells a tough phone for outdoor lovers'],
  ['repeat', 'Behavioural', 'What people do', 'Tiffin time, after the gym, 4 pm breaks', 'store', 'A bakery gives daily buyers a loyalty card'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['SEGMENTS TODAY', 'Four bases', 'Every big company uses them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO A BANK</div><div class="pe"><i>${M.icon('grid', 34, C.gold, 2.2)}</i><span>Same bases, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['target', 'Focused money'], ['message', 'Clear messages']];
const XH = [['layers', 'Too many groups'], ['ban', 'Stereotypes']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const SK = [0.5, 0.3, 0.2];
$('#renI').innerHTML = M.icon('check', 22, '#fff', 3); $('#fixI').innerHTML = M.icon('laddoo', 34, C.gold, 2.2);
$('#bothI').innerHTML = M.icon('users', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Geographic', 'Demographic', 'Psychographic', 'Behavioural'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('repeat', 44, C.gold2, 2.2);
// recap
const ROWS = [['users', 'Split a market into groups', ['Different needs']], ['layers', 'Four bases', ['Geographic', 'Demographic', 'Psychographic', 'Behavioural']], ['check', 'A good segment passes the tests', ['Measured', 'Reached', 'Served']]];
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
// the sorting run
const PST = [['Lay out every answer', 'grid'], ['Sort by: when and why you snack', 'filter'], ['Group the same answers', 'users'], ['Name each group', 'tagN']];
const runP = t => {
  let k = 0; for (let i = 0; i < 4; i++) if (t >= tSt[i] - 0.05) k = i + 1;
  const col = M.io((t - tColor) / 0.4); let sorted = 0;
  for (let i = 0; i < ND; i++) {
    const kd = KIND[i], [x0, y0] = PILE(i), [x1, y1] = CLU(i), p = M.spring(t - tMove[kd] - IDX[i] * 0.008, M.SOFT);
    if (p > 0.5) sorted++;
    const d = $('#dt' + i); attr(d, 'cx', M.lerp(x0, x1, p).toFixed(1)); attr(d, 'cy', M.lerp(y0, y1, p).toFixed(1));
    attr(d, 'fill', mix(C.dim, SCOL[kd], col));
    d.style.opacity = M.clamp((t - tSt[0] - (i % 25) * 0.012) / 0.15).toFixed(3);
  }
  for (let c = 0; c < 3; c++) { const g = $('#cl' + c), u = M.clamp((t - tNm[c] + 0.05) / 0.15); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0); }
  for (let s = 0; s < 4; s++) { const sg = $('#seg' + s), on = M.io((t - tSt[s]) / 0.3); sg.style.background = mix(C.paper2, k > s + 1 ? C.goldD : C.gold, on); }
  M.setT($('#rdL'), `${sorted} / 150`); $('#rdL').style.color = sorted === 150 ? C.gold : C.ink;
  if (t >= tNm[2] + 0.4) pill('L', 'check', '3 segments', '60 · 40 · 50', 0, 1);
  else if (k) pill('L', PST[k - 1][1], `0${k}  ${PST[k - 1][0]}`, '', 0, 0);
  else pill('L', 'grid', 'Ready: 150 answers', '', 0, 0);
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
  const gp = $('#gapP'); gp.style.left = (392 - gp.offsetWidth / 2) + 'px';
  for (let i = 0; i < 3; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  const hp = $('#halfP'); hp.style.left = (392 - hp.offsetWidth / 2) + 'px';
  document.querySelectorAll('.st4 .s1').forEach(el => { if (el.offsetWidth > 304) el.style.fontSize = Math.floor(34 * 304 / el.offsetWidth) + 'px'; });
  for (let k = 1; k < 5; k++) { const ch = P4[k - 1][5]; let xr = 1552; for (let j = ch.length - 1; j >= 0; j--) { const p = $('#pc' + k + j + 'x'); xr -= p.offsetWidth; p.style.left = xr + 'px'; xr -= 16; } }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  SK.reduce((x0, f, i) => { const l = $('#skl' + i); l.style.left = (i === 2 ? 736 - l.offsetWidth : 48 + x0 + 4) + 'px'; return x0 + 688 * f; }, 0);
  const ro = $('#renO'); $('#renA').style.left = (ro.offsetWidth + 20) + 'px'; $('#renN').style.left = (ro.offsetWidth + 96) + 'px';
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
  const exOn = t < tT ? [tM6, tMout] : [tSurv - 0.1, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: one poster for everyone ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#post'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#pst'), t, tMorph + 0.5, 1e9, { dy: 16, sp: M.SOFT });
    const tr = [tPar, tShrug, tPast];
    for (let i = 0; i < 3; i++) { M.vis($('#rx' + i), t, tMorph + 0.6 + i * 0.08, 1e9, { dx: 20, dy: 0 }); M.vis($('#rv' + i), t, tr[i] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); }
    M.vis($('#ask'), t, tC2 - 0.1, tAout, { dy: 36, ...o });
    const tm = [tOneM, tEvery, tNoOne - 0.25];
    for (let i = 0; i < 3; i++) M.vis($('#mt' + i), t, tm[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tNoOne - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: different people, different needs ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.6, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tDiff - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#who'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tW = [tL2 + 0.4, tL3, tL4];
    WHO.forEach((_, i) => {
      const el = $('#wr' + i); M.vis(el, t, tW[i] - 0.05, 1e9, { dx: 24, dy: 0 });
      const on = M.io((t - tW[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tW[i + 1]) / 0.25) : M.io((t - tClock) / 0.25)));
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    });
    M.vis($('#gapP'), t, tClock - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is segmentation ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#dq2'), t, wt('D1', 'market') - 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tDiv);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'call') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tDiv + 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) { const q = $('#ql' + i); M.vis(q, t, tDiv + 0.3 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#kws'), t, tWen - 0.1, 1e9, { dy: 10 }); $('#kws').style.color = mix(C.muted, C.gold, M.io((t - tWen) / 0.3));
    M.vis($('#vc'), t, tDiv + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#split'), t, tDiv + 0.35, 1e9, { dy: 12 });
    const sp = M.spring(t - tGroups, M.SOFT);
    for (let i = 0; i < 30; i++) { const [x0, y0] = SP0[i], [x1, y1] = SPC(i), u = M.spring(t - tGroups - i * 0.015, M.SOFT); const d = $('#sp' + i); attr(d, 'cx', M.lerp(x0, x1, u).toFixed(1)); attr(d, 'cy', M.lerp(y0, y1, u).toFixed(1)); }
    for (let k = 0; k < 3; k++) { const u = M.clamp((t - tGroups - 0.4 - k * 0.1) / 0.2); $('#spB' + k).style.opacity = u.toFixed(3); $('#spT' + k).style.opacity = u.toFixed(3); }
    $('#spA').style.opacity = M.clamp(sp * 2).toFixed(3);
    M.vis($('#sw'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(i === 0 ? C.redBg : C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : (i === 0 ? C.red : C.gold), 40, 2.2);
    });
  }

  /* ===== M: sorting the answers ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM0 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM0 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const root = $('#mLIn'), base = tM0 + 0.3;
    M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
    M.vis($('#rdL'), t, base + 0.12, 1e9, { dy: 10 });
    M.vis($('#planL'), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#barL'), t, base + 0.35, 1e9, { dy: 10 });
    root.querySelectorAll('.mtk').forEach(el => M.vis(el, t, base + 0.4, 1e9, { dy: 8 }));
    M.vis($('#msL'), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runP(t);
    SGR.forEach((_, i) => {
      const el = $('#sg' + i); M.vis(el, t, tM0 + 0.7 + i * 0.1, 1e9, { dy: 14 });
      const nm = t >= tNm[i] - 0.05, mv = t >= tMove[i] + 0.2; M.setT($('#sgt' + i), nm ? SEG[i][2] : mv ? SGR[i][3] : 'Not sorted yet');
      $('#sgt' + i).style.color = nm ? C.ink : mv ? C.ink2 : C.dim; $('#sgt' + i).style.fontWeight = nm ? '700' : '500';
      el.querySelector('.ri').style.opacity = mv ? '' : '0.35'; el.querySelector('.rl').style.color = mv ? '' : C.dim;
      M.vis($('#sgp' + i), t, tNm[i] + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, M.io((t - tNm[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tNm[i + 1]) / 0.25) : 0)));
    });
    M.vis($('#halfP'), t, tSt[1] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== P: four bases ===== */
  const pOn = t >= tTu - 0.05 && t < tR0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
      if (k) PCH[k - 1].forEach((tc, j) => { const el = $('#pc' + k + j + 'x'); M.vis(el, t, tc - 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo }); el.style.background = mix(C.paper, C.gold3, M.io((t - tc) / 0.2)); });
    }
  }

  /* ===== R: five tests ===== */
  const rOn = t >= tR0 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#mx'), t, tR0 + 0.1, tRout, { dy: 36, outDur: 0.3, ody: -16 });
    for (let k = 0; k < 3; k++) M.vis($('#mh' + k), t, tR0 + 0.4 + k * 0.1, 1e9, { dy: 12 });
    TESTS.forEach((_, i) => {
      const el = $('#mr' + i), ta = tTest[i], td = i < 4 ? tTest[i + 1] : tPass;
      M.vis(el, t, tR0 + 0.5 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.25), off = M.io((t - td) / 0.3), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rd').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      for (let k = 0; k < 3; k++) M.vis($('#tk' + i + k), t, ta + 0.25 + k * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#allP'), t, tPass - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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
    $('#bb0').style.background = t > tFath ? C.redBg : C.paper; $('#bb0').style.color = t > tFath ? C.red : C.ink;
    M.vis($('#stkL'), t, tSurv - 0.1, 1e9, { dy: 10 }); M.vis($('#stk'), t, tSurv - 0.05, 1e9, { dy: 12 });
    const tk = [tSurv + 0.1, tFath, tGrand];
    let x0 = 0; SK.forEach((f, i) => { const u = M.o3((t - tk[i]) / 0.5), w = 688 * f * M.clamp(u); const s = $('#sk' + i); s.style.left = x0.toFixed(1) + 'px'; s.style.width = w.toFixed(1) + 'px'; x0 += w; M.vis($('#skl' + i), t, tk[i] + 0.2, 1e9, { dy: 8 }); });
    M.vis($('#renO'), t, tX6 - 0.05, 1e9, { dy: 12 });
    M.vis($('#renA'), t, tTif - 0.25, 1e9, { dx: -10, dy: 0, fade: 0.15 });
    M.vis($('#renN'), t, tTif - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#renO').style.textDecoration = t > tJust ? 'line-through' : 'none';
    M.vis($('#fix'), t, tJust - 0.05, 1e9, { dy: 16 });
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
