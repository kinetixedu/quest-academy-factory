// MBA - Marketing Management, Ep 08: Marketing Research Fundamentals (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', ld: '#A8713A', ldD: '#7E5428', goldD: '#D9C08C' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  clipboard: ['M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  hosp: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tArjH = wt('H2', 'Arjun'), tRight = wt('H2', 'right');
const tC2 = T0('C2'), tNobody = wt('C2', 'Nobody'), tOpin = wt('C2', 'opinions'), tZero = wt('C2', 'zero');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tFind = wt('L1', 'find'), tSurv = wt('L1', 'survey'), tSchool = wt('L1', 'school'), tGym = wt('L2', 'gym'), tOff = wt('L2', 'offices');
const tFive = wt('L3', 'Five'), tReal = wt('L3', 'real');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tSys = wt('D2', 'systematic'), tA4 = [wt('D2', 'design'), wt('D2', 'collection'), wt('D2', 'analysis'), wt('D2', 'reporting')];
const tHl = [tSys, wt('D2', 'data'), wt('D2', 'specific'), wt('D2', 'situation')];
const tPlanned = wt('D3', 'planned'), tGuess = wt('D3', 'guessing'), tSw = [wt('D4', 'people'), wt('D4', 'question'), wt('D4', 'way')];
// M: the research run
const tM0 = T0('M0'), tM3 = T0('M3'), tM4 = T0('M4'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tSt = [wt('M1', 'Define'), wt('M2', 'Plan'), wt('M4', 'Collect'), wt('M5', 'Report')];
const tPl = [wt('M1', 'problem'), wt('M2', 'questions'), wt('M3', 'hundred')], tFifty = [0, 1, 2].map(k => wt('M3', 'fifty', k));
const tRes = [wt('M6', 'parents'), wt('M6', 'Gym'), wt('M7', 'office')], tHalf = wt('M8', 'half'), tFacts = wt('M8', 'facts');
const tCol0 = tSt[2] + 0.35, tColD = Math.max(0.9, (T1('M4') - tCol0) / 3);
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'Research'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: two kinds of data
const tP1 = T0('P1'), tP2 = T0('P2'), tPout = T0('R0') - 0.32;
const tDSc = [wt('P1', 'Reports'), wt('P1', 'government'), wt('P1', 'sales')], tCheap = wt('P1', 'cheap'), tQuick = wt('P1', 'quick');
const tDPc = [wt('P2', 'collect'), wt('P2', 'yourself'), wt('P2', 'own')], tCosts = wt('P2', 'costs'), tFits = wt('P2', 'fits');
// R: three methods
const tR0 = T0('R0'), tR = [1, 2, 3].map(i => T0('R' + i)), tRout = T0('K0') - 0.32;
const RCH = [[wt('R1', 'Watch'), wt('R1', 'notes')], [wt('R2', 'Ask'), wt('R2', 'school')], [wt('R3', 'two'), wt('R3', 'sells')]];
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'airline'), wt('K3', 'bakery'), wt('K4', 'food')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7'), tX8 = T0('X8');
const tXg = [wt('X2', 'facts'), wt('X2', 'stops')], tXh = [wt('X3', 'time'), wt('X3', 'sample')];
const tColl = wt('X4', 'college'), tEvery = wt('X4', 'everyone'), tNot = wt('X5', 'not'), tFair = wt('X5', 'fair'), tLit = wt('X6', 'Literary'), tWrong = wt('X6', 'wrong'), tGal = wt('X7', 'Gallup');
const tXout = tX8 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'one')], [wt('S3', 'define'), wt('S3', 'plan'), wt('S3', 'collect'), wt('S3', 'report')], [wt('S4', 'fair')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A
$('#op0I').innerHTML = M.icon('message', 24, C.gold, 2.4); $('#op1I').innerHTML = M.icon('message', 24, C.gold, 2.4);
const METH = [['users', 'Who buys?'], ['help', 'Why?'], ['coin', 'How many?']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon(ic, 24, C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L: the survey
const LCS = [['cap', 'School gate'], ['dumbbell', 'Gym'], ['briefcase', 'Offices']];
$('#lcs').innerHTML = LCS.map(([ic, t], i) => `<div class="lc" id="lc${i}">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('');
const QS = ['Do you buy snacks every week?', 'When do you eat them?', 'Taste, health or price: what matters most?', 'Have you tried millet sweets?', 'Would you try a healthy laddoo?'];
$('#qRows').innerHTML = QS.map((q, i) => `<div class="qr" id="qr${i}" style="top:${160 + i * 80}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="rt">${q}</div><div class="ck">${M.icon('check', 22, '#fff', 3)}</div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: four actions + systematic + simple words
const A4 = [['bulb', 'STEP 1', 'Design'], ['clipboard', 'STEP 2', 'Collect'], ['chart', 'STEP 3', 'Analyze'], ['megaphone', 'STEP 4', 'Report']];
$('#a4Row').innerHTML = A4.map(([ic, n, t], i) => `<div class="act4" id="a4${i}" style="left:${36 + i * 184}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');
$('#vt0I').innerHTML = M.icon('help', 28, C.red, 2.2); $('#vt1I').innerHTML = M.icon('list', 28, C.gold, 2.2);
const SWT = [['users', 'WHO', 'Right people'], ['help', 'WHAT', 'Right question'], ['list', 'HOW', 'Right way']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the research run. Plan coords inside a 688 x 250 svg. */
const PLACES = [['cap', 'SCHOOL GATE'], ['dumbbell', 'GYM'], ['briefcase', 'OFFICE']], BX = k => 28 + k * 226, BC = k => 118 + k * 226;
const lbox = (k) => `<g id="lb${k}" transform="translate(${BX(k)} 16)"><rect width="180" height="170" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>
    <g transform="translate(18 14)">${M.icon(PLACES[k][0], 24, C.ink, 2.2)}</g><text x="52" y="33" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.6" fill="#8A8274">${PLACES[k][1]}</text>
    ${Array.from({ length: 50 }, (_, i) => `<circle id="td${k}_${i}" cx="${23 + (i % 10) * 15}" cy="${66 + Math.floor(i / 10) * 15}" r="5" fill="#EEE8DB"/>`).join('')}
    <text id="tc${k}" x="90" y="156" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="#14213D">0 / 50</text></g>`;
const avG = (id, face, x, y) => `<g id="${id}" transform="translate(${x} ${y})"><circle r="20" fill="#14213D"/><image href="${IMG}ll-${face}-face.jpg" x="-17" y="-17" width="34" height="34" clip-path="url(#avc)"/></g>`;
$('#mLIn').innerHTML = `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">THE RESEARCH RUN · 4 STEPS</div><div class="serif mrd" id="rdL">0 / 150</div>
    <svg class="mplan" id="planL" width="688" height="250"><defs><clipPath id="avc"><circle cx="0" cy="0" r="17"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      <g id="qG"><text x="344" y="96" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.5" fill="#8A8274">THE PROBLEM</text>
        <text x="344" y="146" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="36" fill="#14213D">Who will buy, and <tspan fill="#B8862F">why?</tspan></text></g>
      ${[0, 1, 2].map(lbox).join('')}
      ${avG('avZ', 'zoya', BC(0) - 24, 220)}${avG('avA', 'arjun', BC(0) + 24, 220)}
    </svg>
    <div class="mbar" id="barL">${[0, 1, 2, 3].map(k => `<i id="seg${k}" style="left:${k * 174}px;width:166px"></i>`).join('')}</div>
    <div class="mtk" style="left:48px">DEFINE</div><div class="mtk" style="right:48px">REPORT</div>
    <div class="mst" id="msL"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
wrap($('#mL'), 'mLOut', 784, 580);
const PLR = [['help', 'THE PROBLEM', 'Who will buy, and why?'], ['list', 'THE QUESTIONS', 'Five short questions'], ['users', 'THE SAMPLE', '150 people, in 3 places']];
$('#plRows').innerHTML = PLR.map(([ic, l, tx], i) => `<div class="pr3" id="pl${i}" style="top:${96 + i * 132}px"><div class="bg"></div><div class="ri">${M.icon(ic, 32, C.gold, 2.2)}</div><div class="rl">${l}</div><div class="rt">${tx}</div></div>`).join('') +
  ['50 at school gates', '50 at gyms', '50 in offices'].map((c, i) => `<div class="lgd" id="pc${i}" style="top:500px">${M.icon(PLACES[i][0], 20, C.gold, 2.4)}${c}</div>`).join('');
const RES = [['cap', 'SCHOOL GATES · PARENTS', 'Healthy tiffin sweet', 72], ['dumbbell', 'GYMS · GYM-GOERS', 'More protein', 64], ['briefcase', 'OFFICES · OFFICE WORKERS', 'Small 4 pm snack', 58]];
$('#reRows').innerHTML = RES.map(([ic, l, a], i) => `<div class="pr3" id="re${i}" style="top:${96 + i * 132}px"><div class="bg"></div><div class="ri">${M.icon(ic, 32, C.gold, 2.2)}</div><div class="rl">${l}</div>
    <div class="bt" style="top:54px;height:36px"><i id="rb${i}" style="height:36px"><span id="ra${i}" style="position:absolute;left:14px;top:0;font:600 20px/36px Poppins;color:#fff;white-space:nowrap">${a}</span></i></div><div class="serif pv" id="rp${i}">0%</div></div>`).join('');
$('#halfI').innerHTML = M.icon('scale', 24, C.gold2, 2.2);

// P: two kinds of data
const DSC = [['book', 'Reports'], ['bank', 'Government numbers'], ['chart', 'Sales records']], DPC = [['clipboard', 'Surveys'], ['eye', 'Observation'], ['laddoo', 'Tests']];
$('#dSc').innerHTML = DSC.map(([ic, t], i) => `<div class="dc" id="dsc${i}">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('');
$('#dPc').innerHTML = DPC.map(([ic, t], i) => `<div class="dc" id="dpc${i}">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('');
const MET = (k, rows) => rows.map(([l, n, v], i) => `<div class="mt" id="m${k}${i}" style="top:${320 + i * 72}px"><div class="ml">${l}</div>${[0, 1, 2, 3, 4].map(s => `<div class="sgm" id="g${k}${i}${s}" style="left:${148 + s * 64}px"></div>`).join('')}<div class="mv" id="mv${k}${i}">${v}</div></div>`).join('');
const MS = [['COST', 1, 'Low'], ['SPEED', 5, 'Fast'], ['FIT', 2, 'Partial']], MP = [['COST', 4, 'Higher'], ['SPEED', 2, 'Slower'], ['FIT', 5, 'Exact']];
$('#dSm').innerHTML = MET('S', MS); $('#dPm').innerHTML = MET('P', MP);
wrap($('#dS'), 'dSOut', 784, 580);

// R: three methods
const P3 = [['eye', 'Observation', 'Watch what people do', 'arjun', 'Arjun notes which snacks sell out first at the canteen', ['Watch', 'Count']],
  ['clipboard', 'Surveys', 'Ask people questions', 'zoya', 'Zoya asks parents at the school gate', ['Ask', 'Record']],
  ['flask', 'Experiments', 'Change one thing, compare', 'dev', 'Same laddoo, two pack colours: which sells more?', ['Pack A', 'Pack B']]];
$('#p3').innerHTML = P3.map(([ic, a, b], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 544}px;width:512px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2" style="font:600 26px Poppins;top:232px">${b}</div></div>`).join('');
$('#pePans').innerHTML = [[null, 'PRIMARY DATA · THREE WAYS', 'Watch, ask, or test', []]].concat(P3.map((p, i) => [p[3], `WAY 0${i + 1} · AT LADDOO LAB`, p[4], p[5]])).map(([f, l, x, ch], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('clipboard', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div>${ch.map((c, j) => `<div class="fp" id="pc${k}${j}x" style="top:96px">${c}</div>`).join('')}</div>`).join('');

// K: at work today
const KA = [
  ['book', 'Secondary data', 'Use what already exists', "Arjun's sales book shows the best days", 'hosp', 'A hospital uses public health numbers to plan beds'],
  ['clipboard', 'Surveys', 'Ask people directly', 'Zoya asks parents at the school gate', 'plane', 'An airline sends a survey after every flight'],
  ['eye', 'Observation', 'Watch what people do', 'Arjun watches what sells out at the canteen', 'store', 'A bakery watches which shelf people stop at'],
  ['flask', 'Experiments', 'Change one thing, compare', 'Same laddoo, two pack colours', 'phone', 'A delivery app tests two button colours'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['RESEARCH TODAY', 'Four tools', 'Every big company uses them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO AN AIRLINE</div><div class="pe"><i>${M.icon('clipboard', 34, C.gold, 2.2)}</i><span>Same tools, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['check', 'Facts, not guesses'], ['coin', 'Saves money']];
const XH = [['clock', 'Time and money'], ['users', 'Bad samples']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const MIXC = [C.gold, C.ink, C.ld, C.gold, C.ink2, C.ld, C.ink, C.gold, C.ld, C.ink2];
$('#sd0').innerHTML = Array.from({ length: 10 }, (_, i) => `<circle cx="${12 + i * 26}" cy="12" r="9" fill="${C.gold}"/>`).join('');
$('#sd1').innerHTML = Array.from({ length: 10 }, (_, i) => `<circle cx="${12 + i * 26}" cy="12" r="9" fill="${MIXC[i]}"/>`).join('');
$('#sp1I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#fx0I').innerHTML = M.icon('x', 32, C.red, 2.6); $('#fx1I').innerHTML = M.icon('check', 32, C.gold, 2.6);
$('#bothI').innerHTML = M.icon('users', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Observation', 'Survey', 'Experiment', 'Secondary data'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('flask', 44, C.gold2, 2.2);
// recap
const ROWS = [['search', 'A planned way to get facts', ['One question']], ['list', 'Four steps', ['Define', 'Plan', 'Collect', 'Report']], ['users', 'A fair sample beats a big one', ['Fair, not just big']]];
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
// the research run
const PST = [['Define the problem', 'help'], ['Plan: questions, people, how many', 'list'], ['Collect and analyze', 'clipboard'], ['Report the findings', 'megaphone']];
const colU = (k, t) => M.clamp((t - tCol0 - k * tColD) / (tColD * 0.85));
const avX = M.track(BC(0), [[tCol0 + tColD - 0.35, BC(1)], [tCol0 + 2 * tColD - 0.35, BC(2)]], M.SOFT);
const runP = t => {
  let k = 0; for (let i = 0; i < 4; i++) if (t >= tSt[i] - 0.05) k = i + 1;
  const qo = M.clamp((t - tM0 - 0.6) / 0.25) * (1 - M.clamp((t - tPl[2] - 0.1) / 0.25));
  $('#qG').style.opacity = qo.toFixed(3); M.hide($('#qG'), qo <= 0.001);
  let tot = 0;
  for (let b = 0; b < 3; b++) {
    const g = $('#lb' + b), u = M.clamp((t - tFifty[b] - 0.05) / 0.15); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0);
    const c = colU(b, t), n = Math.round(50 * c); tot += n;
    for (let i = 0; i < 50; i++) attr($(`#td${b}_${i}`), 'fill', i < n ? C.gold : C.paper2);
    M.setT($('#tc' + b), `${n} / 50`); attr($('#tc' + b), 'fill', n === 50 ? C.gold : C.ink);
    const r = g.querySelector('rect'), act = t >= tCol0 + b * tColD - 0.2 && c < 1;
    attr(r, 'stroke', act ? C.gold : C.line); attr(r, 'stroke-width', act ? 4 : 2); attr(r, 'fill', n === 50 ? C.gold3 : '#FFFFFF');
  }
  const ao = M.clamp((t - tSt[2] - 0.1) / 0.2); const x = avX(t);
  for (const [id, dx] of [['avZ', -24], ['avA', 24]]) { const a = $('#' + id); a.style.opacity = ao.toFixed(3); M.hide(a, ao <= 0); attr(a, 'transform', `translate(${(x + dx).toFixed(1)} 220)`); }
  for (let s = 0; s < 4; s++) { const sg = $('#seg' + s), on = M.io((t - tSt[s]) / 0.3); sg.style.background = mix(C.paper2, k > s + 1 ? C.goldD : C.gold, on); }
  M.setT($('#rdL'), `${tot} / 150`); $('#rdL').style.color = tot === 150 ? C.gold : C.ink;
  if (t >= tFacts - 0.1) pill('L', 'check', 'Facts, not opinions', '150 answers', 0, 1);
  else if (k) pill('L', PST[k - 1][1], `0${k}  ${PST[k - 1][0]}`, '', 0, 0);
  else pill('L', 'x', 'Two opinions, zero facts', '', 1, 0);
  return tot;
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
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#lc' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  document.querySelectorAll('.qr .rt').forEach(el => { if (el.offsetWidth > 560) el.style.fontSize = Math.floor(25 * 560 / el.offsetWidth) + 'px'; });
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  x = 48; for (let i = 0; i < 3; i++) { const l = $('#pc' + i); l.style.left = x + 'px'; x += l.offsetWidth + 16; }
  const hp = $('#halfP'); hp.style.left = (392 - hp.offsetWidth / 2) + 'px';
  for (const k of ['S', 'P']) { x = 48; for (let i = 0; i < 3; i++) { const c = $(`#d${k.toLowerCase()}c${i}`); c.style.left = x + 'px'; x += c.offsetWidth + 12; } }
  document.querySelectorAll('.st4 .s1').forEach(el => { if (el.offsetWidth > 440) el.style.fontSize = Math.floor(34 * 440 / el.offsetWidth) + 'px'; });
  for (let k = 1; k < 4; k++) { const ch = P3[k - 1][5]; let xr = 1552; for (let j = ch.length - 1; j >= 0; j--) { const p = $('#pc' + k + j + 'x'); xr -= p.offsetWidth; p.style.left = xr + 'px'; xr -= 16; } }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.fx .kt').forEach(el => { if (el.offsetWidth > 554) el.style.fontSize = Math.floor(28 * 554 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tM3 + 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: two opinions, zero facts ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ops'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#op0'), t, tMorph + 0.55, 1e9, { dx: 24, dy: 0 }); M.vis($('#op1'), t, tArjH - 0.05, 1e9, { dx: 24, dy: 0 });
    for (let i = 0; i < 2; i++) {
      const tg = $('#tg' + i); M.vis(tg, t, tRight + i * 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const r = M.io((t - tOpin) / 0.3); tg.style.background = mix(C.paper2, C.redBg, r); tg.style.color = mix(C.muted, C.red, r);
    }
    M.vis($('#ask'), t, tC2 - 0.1, tAout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#mt' + i), t, tNobody + 0.1 + i * 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tZero - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the survey ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tSurv);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, wt('L1', 'Zoya') - 0.05, tSurv - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tFind - 0.05, tSurv - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#sv'), t, tSurv + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tl = [tSchool, tGym, tOff];
    for (let i = 0; i < 3; i++) { const c = $('#lc' + i); M.vis(c, t, tl[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); const on = M.io((t - tl[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tl[i + 1]) / 0.25) : M.io((t - tFive) / 0.3))); c.style.background = mix(C.paper, C.gold3, on); }
    QS.forEach((_, i) => {
      const r = $('#qr' + i); M.vis(r, t, tSurv + 0.5 + i * 0.12, 1e9, { dy: 14 });
      const lit = M.io((t - tFive - i * 0.22) / 0.25);
      r.querySelector('.rt').style.color = mix(C.dim, C.ink, lit); r.querySelector('.rn').style.color = mix(C.dim, C.gold, lit);
      M.vis(r.querySelector('.ck'), t, tReal + i * 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    });
  }

  /* ===== D: what is marketing research ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#dq2'), t, wt('D1', 'marketing') - 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tSys);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'call') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tSys + 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tSys + 0.3 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tSys + 0.12, tDout, { dx: 60, dy: 0, ...o });
    A4.forEach(([ic], i) => {
      const el = $('#a4' + i); M.vis(el, t, tSys + 0.35 + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tA4[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tA4[i + 1]) / 0.25) : M.io((t - tD3) / 0.3))), dn = M.io((t - tA4[i]) / 0.25);
      el.style.background = mix(mix(C.paper, C.gold3, dn), C.ink, on);
      el.querySelector('.zt').style.color = mix(t < tA4[i] ? C.dim : C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : (t < tA4[i] ? C.dim : C.gold), 40, 2.2);
    });
    M.vis($('#sw'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#swA'), t, null, tD4 - 0.1, { outDur: 0.25, ody: -12 });
    M.vis($('#vt1'), t, tPlanned - 0.05, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#vgt'), t, tGuess - 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    M.vis($('#vt0'), t, tGuess - 0.05, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    $('#vt0').style.background = C.redBg; $('#vt1').style.background = mix(C.paper, C.gold3, M.io((t - tPlanned) / 0.3));
    M.vis($('#swB'), t, tD4 + 0.1, 1e9, { dy: 16 });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tD4 + 0.25 + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: the research run ===== */
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
    // right card: the plan, then the results
    M.vis($('#mwA'), t, null, tSt[2] - 0.1, { outDur: 0.25, ody: -12 });
    PLR.forEach((_, i) => {
      const el = $('#pl' + i); M.vis(el, t, base + 0.4 + i * 0.08, 1e9, { dy: 14 });
      const lit = M.io((t - tPl[i]) / 0.25);
      el.querySelector('.rt').style.color = mix(C.dim, C.ink, lit); el.querySelector('.bg').style.background = mix(C.paper, C.gold3, lit * (1 - (i < 2 ? M.io((t - tPl[i + 1]) / 0.25) : 0)));
    });
    for (let i = 0; i < 3; i++) M.vis($('#pc' + i), t, tFifty[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mwB'), t, tSt[2] + 0.05, 1e9, { dy: 16 });
    RES.forEach(([, , , pct], i) => {
      const el = $('#re' + i); M.vis(el, t, tSt[2] + 0.2 + i * 0.08, 1e9, { dy: 14 });
      const u = colU(i, t), v = pct * M.o3(u);
      $('#rb' + i).style.width = (420 * v / 100).toFixed(1) + 'px';
      M.setT($('#rp' + i), Math.round(v) + '%');
      const r = M.io((t - tRes[i]) / 0.3);
      $('#ra' + i).style.opacity = r.toFixed(3);
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, r * (1 - (i < 2 ? M.io((t - tRes[i + 1]) / 0.25) : M.io((t - tHalf) / 0.3))));
      $('#rp' + i).style.color = mix(C.dim, C.ink, r);
    });
    M.vis($('#halfP'), t, tHalf - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== P: two kinds of data ===== */
  const pOn = t >= tTu - 0.05 && t < tR0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ds = $('#dS'); M.vis(ds, t, tP0 + 0.1, tPout, { dy: 36, ...o }); grow(ds, $('#dSOut'), t, tP2);
    M.vis($('#dP'), t, tP2 + 0.12, tPout, { dx: 60, dy: 0, ...o });
    M.rise($('#dSt'), t, tP1 - 0.05, { st: 0.07, sp: M.HEAVY }); M.vis($('#dSs'), t, wt('P1', 'exists') - 0.1, 1e9, { dy: 10 });
    M.rise($('#dPt'), t, tP2 + 0.2, { st: 0.07, sp: M.HEAVY }); M.vis($('#dPs'), t, wt('P2', 'new') - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) { M.vis($('#dsc' + i), t, tDSc[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#dpc' + i), t, tDPc[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); }
    const mt = { S: [tCheap, tQuick, tFits], P: [tCosts, tCosts + 0.35, tFits + 0.25] }, MM = { S: MS, P: MP };
    for (const k of ['S', 'P']) for (let i = 0; i < 3; i++) {
      const row = $('#m' + k + i), tm = mt[k][i]; M.vis(row, t, (k === 'S' ? tP1 : tP2) + 0.7 + i * 0.1, 1e9, { dy: 12 });
      $('#mv' + k + i).style.opacity = M.clamp((t - tm - 0.2) / 0.2).toFixed(3);
      for (let s = 0; s < 5; s++) { const u = M.io((t - tm - s * 0.06) / 0.2); $(`#g${k}${i}${s}`).style.background = s < MM[k][i][1] ? mix(C.paper2, C.gold, u) : C.paper2; }
    }
  }

  /* ===== R: three ways to collect ===== */
  const rOn = t >= tR0 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    P3.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tR[i], td = i < 2 ? tR[i + 1] : tRout + 1;
      M.vis(el, t, tR0 + 0.1 + i * 0.07, tRout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.vis($('#pe'), t, tR0 + 0.35, tRout, { dy: 36, ...o });
    for (let k = 0; k < 4; k++) {
      const tin = k ? tR[k - 1] : tR0 + 0.6, tout = k < 3 ? tR[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
      if (k) RCH[k - 1].forEach((tc, j) => {
        const el = $('#pc' + k + j + 'x'); M.vis(el, t, tc - 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
        const g = M.io((t - tc) / 0.2);
        if (k === 3) { el.style.background = j ? C.gold : C.ink; el.style.color = '#fff'; } else el.style.background = mix(C.paper, C.gold3, g);
      });
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
    M.vis($('#sm0'), t, tColl - 0.1, 1e9, { dy: 14 });
    M.vis($('#sp0'), t, tEvery - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    { const bad = t >= tNot - 0.05; const p = $('#sp0'); p.style.background = bad ? C.redBg : C.paper2; p.style.color = bad ? C.red : C.ink;
      M.setT($('#sp0T'), bad ? 'Not a fair sample' : 'Everyone loves it!'); setIco($('#sp0I'), bad ? 'x' : 'message', bad ? C.red : C.gold, 22, 2.6); }
    M.vis($('#sm1'), t, tFair - 0.05, 1e9, { dy: 14 });
    M.vis($('#fx0'), t, tLit - 0.1, 1e9, { dy: 16 });
    $('#fx0').style.background = mix(C.paper, C.redBg, M.io((t - tWrong) / 0.3));
    M.vis($('#fx1'), t, tGal - 0.1, 1e9, { dy: 16 });
    $('#fx1').style.background = mix(C.paper, C.gold3, M.io((t - wt('X7', 'right')) / 0.3));
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
