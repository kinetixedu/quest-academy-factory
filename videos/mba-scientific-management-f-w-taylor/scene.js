// MBA - Principles of Management, Ep 08: Scientific Management - F.W. Taylor
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  copy: ['M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z', 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
});
Object.assign(M.IC, {
  jar: ['M8 2h8', 'M9 2v3', 'M15 2v3', 'M6 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z', 'M6 12h12'],
  keyboard: ['M10 8h.01', 'M12 12h.01', 'M14 8h.01', 'M16 12h.01', 'M18 8h.01', 'M6 8h.01', 'M7 16h10', 'M8 12h.01', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  footprints: ['M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z', 'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tEvery = wt('H2', 'every'), tDiff = wt('H2', 'different'), tWay = wt('H2', 'way');
const tTwo = wt('C1', 'two'), tFive = wt('C1', 'five'), tOne = wt('C2', 'one');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tFred = wt('D2', 'Frederick'), tAmer = wt('D2', 'American'), tFather = wt('D3', 'father');
const tD4 = T0('D4'), t1911 = wt('D4', '1911'), tD5 = T0('D5'), tFind = wt('D5', 'find'), tDout = T0('B1') - 0.32;
// B: the steel works
const tB1 = T0('B1'), tTayl = wt('B2', 'Taylor'), tWorker = wt('B2', 'worker'), tB3 = T0('B3'), tCoal = wt('B3', 'coal'), tOre = wt('B3', 'ore'), tOwn = wt('B3', 'own');
const tTwenty = wt('B4', 'twenty'), tMat = wt('B5', 'material'), tCarry = wt('B5', 'carry'), tB6 = T0('B6'), tFifty = wt('B6', 'fifty'), tSixteen = wt('B6', 'sixteen'), tBout = T0('M1') - 0.32;
// M: two ways to make one cup
const tM1 = T0('M1'), tM4 = T0('M4'), tMout = T0('Z1') - 0.32;
const ML = [wt('M2', 'boils'), wt('M2', 'walks'), wt('M2', 'searches'), T0('M3'), wt('M3', 'stopwatch'), wt('M3', 'study') + 0.25];
const MR = [tM4 + 0.6, wt('M4', 'Milk'), wt('M4', 'sugar'), wt('M5', 'searching') + 0.2, wt('M5', 'three') - 0.1];
const tSaved = wt('M5', 'three');
// Z: the standard
const tZ1 = T0('Z1'), tZ2 = T0('Z2'), tZ3 = T0('Z3'), tZs = [wt('Z2', 'recipe'), wt('Z2', 'pot'), wt('Z2', 'cup'), wt('Z2', 'steps')];
const tZone = wt('Z3', 'one'), tZthree = wt('Z3', 'three'), tZtaste = wt('Z3', 'tastes'), tZout = T0('P0') - 0.32;
// P: four principles
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tRule = wt('P1', 'Rule', 1), tDiscord = wt('P2', 'discord'), tTrust = wt('P2', 'trust'), tTog = wt('P3', 'together');
const tReach = wt('P4', 'reaches'), tBest = wt('P4', 'best'), tDev = wt('P4', 'develop');
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'call'), wt('K3', 'pilots'), wt('K4', 'factory'), wt('K5', 'supervisor')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX5 = T0('X5'), tX7 = T0('X7');
const tXg = [wt('X2', 'Output'), wt('X2', 'costs'), wt('X2', 'piece')], tXh = [wt('X3', 'dull'), wt('X3', 'tiring'), wt('X4', 'say')];
const tBan = wt('X6', 'banned'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'measuring')], ['Standard', 'selection', 'training'].map(w => wt('S3', w)), [wt('S4', 'respect')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const mmss = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const CT = ['2:00', '3:30', '4:10', '5:00', '2:40', '3:20'];
$('#cupRow').innerHTML = CT.map((c, i) => `<div class="cupt" id="ct${i}" style="left:${36 + i * 144}px"><div class="cn">CUP ${i + 1}</div><div class="ci"></div><div class="ct">${c}</div></div>`).join('');
const METH = ['Milk first', 'Tea first', 'Boil twice'];
$('#meth').innerHTML = METH.map((m, i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon('help', 26, C.muted, 2.2)}<span>${m}</span></div>`).join('');
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
wrap($('#tay'), 'tayIn', 616, 580); wrap($('#book'), 'bookIn', 920, 274);
$('#fatherI').innerHTML = M.icon('award', 26, '#fff', 2.2);
$('#id0I').innerHTML = M.icon('search', 28, C.gold, 2.2); $('#id1I').innerHTML = M.icon('target', 28, C.gold2, 2.2);
// shovel stations
const MAT = [['COAL', '#3A4560', '3.5 lb, too light', 1.4], ['IRON ORE', '#B5482F', '38 lb, too heavy', 0.62]];
$('#stations').innerHTML = MAT.map(([n, col, ld], i) => `<svg class="abs" style="left:${48 + i * 352}px;top:160px" width="336" height="260">
  <path d="M140 14 H196" stroke="#3A4560" stroke-width="10" stroke-linecap="round"/><path d="M168 14 V118" stroke="#3A4560" stroke-width="10" stroke-linecap="round"/>
  <g id="bl${i}"><path id="pile${i}" d="M112 118 q56 -52 112 0 z" fill="${col}"/><path d="M108 116 h120 v64 q0 32 -32 32 h-56 q-32 0 -32 -32 z" fill="#D9CFBC" stroke="#3A4560" stroke-width="4" stroke-linejoin="round"/></g>
</svg><div class="mat" id="mat${i}" style="left:${48 + i * 352}px">${n}</div><div class="ld" id="ld${i}"><span id="ldT${i}">${ld}</span></div>`).join('');
$('#bestI').innerHTML = M.icon('gauge', 26, C.gold2, 2.2);

/* M: two ways to make one cup. Plan coords are inside a 688 x 250 svg. */
const ST = { // station boxes [x, y] (110 x 84) and where the worker stands to use them
  L: { stove: [24, 22], milk: [554, 22], sugar: [554, 144], serve: [24, 144] },
  R: { stove: [130, 22], milk: [258, 22], sugar: [386, 22], serve: [514, 22] },
};
const STAND = {
  L: { stove: [186, 64], milk: [502, 64], sugar: [502, 186], serve: [186, 186] },
  R: { stove: [185, 170], milk: [313, 170], sugar: [441, 170], serve: [569, 170] },
};
const SLBL = { stove: ['flame', 'STOVE'], milk: ['milk', 'MILK'], sugar: ['jar', 'SUGAR'], serve: ['cup', 'SERVE'] };
const WAYS = {
  L: { who: 'meena', name: "MEENA'S WAY", T: ML, steps: [['flame', 'Boil water and tea', 80, 0, 'stove'], ['footprints', 'Walk to fetch the milk', 70, 1, 'milk'], ['search', 'Search for the sugar', 50, 1, 'sugar'], ['flame', 'Back to simmer', 70, 0, 'stove'], ['cup', 'Strain and serve', 30, 0, 'serve']] },
  R: { who: 'asha', name: "ASHA'S WAY", T: MR, steps: [['flame', 'Boil water and tea', 80, 0, 'stove'], ['milk', 'Milk, right there', 70, 0, 'milk'], ['jar', 'Sugar, within reach', 10, 0, 'sugar'], ['cup', 'Strain and serve', 20, 0, 'serve']] },
};
for (const k of ['L', 'R']) {
  const W = WAYS[k];
  const boxes = Object.entries(ST[k]).map(([n, [x, y]]) => `<g id="sb${k}${n}" transform="translate(${x} ${y})"><rect width="110" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g transform="translate(41 12)">${M.icon(SLBL[n][0], 28, C.ink, 2.2).replace('<svg', '<svg x="0" y="0"')}</g><text x="55" y="68" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${SLBL[n][1]}</text></g>`).join('');
  const [sx, sy] = STAND[k][W.steps[0][4]];
  $('#m' + k + 'In').innerHTML = `<div class="mav" style="background-image:url(${IMG}${W.who}-face.jpg)"></div><div class="lbl mlb">${W.name}</div><div class="serif mrd" id="rd${k}">0:00</div>
    <svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="avc${k}"><circle cx="0" cy="0" r="26"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>${boxes}
      <path id="trail${k}" d="" fill="none" stroke="${k === 'L' ? '#B5482F' : '#B8862F'}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
      <g id="av${k}" transform="translate(${sx} ${sy})"><circle r="30" fill="#14213D"/><image href="${IMG}${W.who}-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#avc${k})"/></g>
    </svg>
    <div class="mbar" id="bar${k}">${W.steps.map((_, i) => `<i id="sg${k}${i}"></i>`).join('')}</div>
    <div class="mtk" id="tk0${k}" style="left:48px">0:00</div><div class="mtk" id="tk1${k}" style="right:48px">5:00</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
  let cum = 0; W.cum = W.steps.map(s => { const c = cum; cum += s[2]; return c; }); W.total = cum;
}

/* Z: the standard */
const ZS = [['flame', 'Boil 1:20'], ['milk', 'Milk 1:10'], ['jar', 'Sugar 0:10'], ['cup', 'Serve 0:20']];
$('#zSteps').innerHTML = ZS.map(([ic, t], i) => `<div class="zs" id="zs${i}" style="left:${36 + i * 172}px"><div class="zn">STEP ${i + 1}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
$('#zCups').innerHTML = CT.map((c, i) => `<div class="zc" id="zc${i}" style="left:${36 + i * 116}px"><div class="cn">CUP ${i + 1}</div><div class="ci"></div><div class="ct">${c}</div></div>`).join('');
$('#zPillI').innerHTML = M.icon('check', 20, '#fff', 3);
wrap($('#zA'), 'zAOut', 784, 580);

// four principles: list + panes (with illustrated face avatars)
const PR = [['bulb', 'Science'], ['smile', 'Harmony'], ['users', 'Cooperation'], ['trendUp', 'Development']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
const PV = [
  `<div class="stp bad" id="g0" style="top:0;background:#F6E3DC;color:#B5482F">${M.icon('x', 26, C.red, 2.4)}Guess</div>
   <svg id="gA" class="abs" width="60" height="30" style="top:17px"><path d="M4 15 H48 M38 5 L50 15 L38 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="stp" id="g1" style="top:0;background:#14213D;color:#fff">${M.icon('timer', 26, C.gold2, 2.2)}Measure</div>
   <div class="abs" id="g2" style="left:0;top:104px;font:600 30px Poppins;white-space:nowrap">Rule of thumb = <span class="acc">guesswork</span></div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80" fill="none" stroke-linecap="round" stroke-linejoin="round"><path id="hz" d="M80 36 l40 -18 l40 36 l40 -36 l40 36 l40 -36 l40 36 l40 -36 l40 36 l40 -18" stroke="#B5482F" stroke-width="4"/><path id="hs" d="M80 36 H512" stroke="#B8862F" stroke-width="6"/></svg>
   <div class="av face" id="hav0" style="left:0;top:0;${FACE('ravi')};box-shadow:0 0 0 4px #B8862F">R</div><div class="avn" id="han0" style="left:-44px;top:92px">Manager</div>
   <div class="av face" id="hav1" style="left:520px;top:0;${FACE('asha')}">A</div><div class="avn" id="han1" style="left:476px;top:92px">Worker</div>
   <div class="stp" id="htr" style="top:4px;background:#B8862F;color:#fff">${M.icon('smile', 26, '#fff', 2.2)}Trust</div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><line id="cline" x1="36" y1="36" x2="624" y2="36" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/></svg>` +
   ['Ravi', 'Asha', 'Kabir', 'Meena'].map((n, i) => `<div class="av face" id="cav${i}" style="left:${i * 196}px;top:0;${FACE(n.toLowerCase())}">${n[0]}</div><div class="avn" id="can${i}" style="left:${i * 196 - 44}px;top:92px">${n}</div>`).join(''),
  [['Learn', 40], ['Practise', 80], ['Best', 120]].map(([n, h], i) => `<div class="stair" id="sti${i}" style="left:${i * 170}px;top:${176 - h}px;height:${h}px"><span>${n}</span></div>`).join('') +
   `<div class="av face" id="dav" style="left:39px;top:56px;${FACE('asha')};box-shadow:0 0 0 4px #B8862F">A</div>`,
];
const PP = [['THE FOUNDATION', '4 Principles', 'The base of scientific management', 'IN SHORT', null]].concat([
  ['PRINCIPLE 01 / 04', 'Science', 'not rule of thumb'], ['PRINCIPLE 02 / 04', 'Harmony', 'not discord'],
  ['PRINCIPLE 03 / 04', 'Cooperation', 'not individualism'], ['PRINCIPLE 04 / 04', 'Development', 'of every worker, to their best']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('book', 34, C.gold, 2.2)}</i><span>Rules any manager can use</span></div>`}</div>`).join('');

// K: at work today
const KA = [
  ['copy', 'Standardisation', 'One method for everyone', 'One recipe card for all six helpers', 'clipboard', 'Same checklist before every surgery'],
  ['search', 'Scientific selection', 'Test skills before you hire', 'A taste test before a helper joins', 'keyboard', 'A typing test before a call centre hires'],
  ['cap', 'Training', 'Teach the best method, step by step', 'Asha trains each new helper for a week', 'plane', 'New pilots practise in a simulator'],
  ['users', 'Cooperation', 'Managers and workers plan together', 'Ravi plans the evening rush with the team', 'calendar', 'The team agrees the shift plan together'],
  ['network', 'Functional foremanship', 'Different experts guide different things', 'Asha guides taste, Kabir guides cash', 'wrench', 'Experts for speed, quality and repairs'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['TAYLOR TODAY', 'Five ideas', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same ideas, any size of team</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['trendUp', 'Output up'], ['coin', 'Lower costs'], ['award', 'Higher pay']];
const XH = [['gear', 'Dull, repeated tasks'], ['trendDown', 'Tiring work'], ['ban', 'Workers lost their say']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xbanI').innerHTML = M.icon('ban', 24, C.gold2, 2.4); $('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
let tk = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * Math.PI / 180; tk += `<line x1="${(140 + 78 * Math.sin(a)).toFixed(1)}" y1="${(170 - 78 * Math.cos(a)).toFixed(1)}" x2="${(140 + 70 * Math.sin(a)).toFixed(1)}" y2="${(170 - 70 * Math.cos(a)).toFixed(1)}" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round"/>`; }
$('#swTicks').innerHTML = tk;
wrap($('#xs'), 'xsOut', 784, 580);
wrap($('#ill'), 'illOut', 784, 580);
wrap($('#mL'), 'mLOut', 784, 580);

// quiz
const OPTS = ['Time study', 'Standardisation', 'Piece rate', 'Foremanship'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('copy', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Find the one best way', ['By measuring']], ['copy', 'Same method, same result', ['Standards', 'Selection', 'Training']], ['heart', 'Respect the worker', ['Balance']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const blScale = [M.track(1, [[tMat - 0.05, MAT[0][3]]], M.SOFT), M.track(1, [[tMat + 0.25, MAT[1][3]]], M.SOFT)];
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// one way of making a cup: clock, path, trail, bar and step pill at time t
const runWay = (k, t) => {
  const W = WAYS[k], T = W.T, n = W.steps.length;
  let sim = 0, pos = STAND[k][W.steps[0][4]], trail = [pos], cur = -1;
  for (let i = 0; i < n; i++) {
    const a = T[i], b = T[i + 1], u = M.clamp((t - a) / (b - a));
    if (t >= a) cur = i;
    sim += W.steps[i][2] * u;
    const seg = $('#sg' + k + i), wpx = 688 * W.steps[i][2] / 300;
    seg.style.left = (688 * W.cum[i] / 300).toFixed(1) + 'px'; seg.style.width = (wpx * u).toFixed(1) + 'px';
    seg.style.background = W.steps[i][3] ? '#D98F7B' : (i % 2 ? '#24345A' : C.ink);
    if (i > 0 && t >= a) { // walk to the next station over the first part of the step
      const p0 = STAND[k][W.steps[i - 1][4]], p1 = STAND[k][W.steps[i][4]];
      const mv = M.io((t - a) / Math.min(0.9, (b - a) * 0.6));
      const p = [M.lerp(p0[0], p1[0], mv), M.lerp(p0[1], p1[1], mv)];
      if (p0[0] !== p1[0] || p0[1] !== p1[1]) trail.push(p);
      pos = p;
    }
  }
  const done = t >= T[n];
  $('#av' + k).setAttribute('transform', `translate(${pos[0].toFixed(1)} ${pos[1].toFixed(1)})`);
  const d = trail.length > 1 ? 'M' + trail.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') : '';
  if ($('#trail' + k)._d !== d) { $('#trail' + k)._d = d; $('#trail' + k).setAttribute('d', d); }
  M.setT($('#rd' + k), mmss(Math.floor(sim)));
  // station highlight
  Object.keys(ST[k]).forEach(nm => { const on = cur >= 0 && !done && W.steps[cur][4] === nm; const r = $('#sb' + k + nm).querySelector('rect'); const c = on ? (W.steps[cur][3] ? C.red : C.gold) : C.line; if (r._c !== c) { r._c = c; r.setAttribute('stroke', c); r.setAttribute('stroke-width', on ? 4 : 2); } });
  // step pill
  const ms = $('#ms' + k);
  let ic, tx, tm, bad = 0, fin = 0;
  if (done) { fin = 1; ic = k === 'L' ? 'timer' : 'check'; tx = k === 'L' ? '2 wasted steps' : '2 minutes saved'; tm = k === 'L' ? '2:00 lost' : ''; bad = k === 'L'; }
  else if (cur < 0) { ic = 'clock'; tx = 'Ready'; tm = ''; }
  else { const s = W.steps[cur]; ic = s[0]; tx = s[1]; tm = mmss(s[2]); bad = s[3]; }
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
  $('#rd' + k).style.color = done ? (k === 'L' ? C.red : C.gold) : C.ink;
  return { done, cur, sim };
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  x = 36; const i0 = $('#id0'); i0.style.left = x + 'px'; x += i0.offsetWidth + 16; $('#idA').style.left = x + 'px'; x += 76; $('#id1').style.left = x + 'px';
  // steel works tags sit beside the two figures while the card is full width
  const tg = $('#tgT'); tg.style.left = (128 - tg.offsetWidth) + 'px'; $('#tgW').style.left = '648px';
  const be = $('#best'); be.style.left = (392 - be.offsetWidth / 2) + 'px';
  for (let i = 0; i < 2; i++) { const l = $('#ld' + i); l.style.left = (48 + i * 352 + 168 - l.offsetWidth / 2) + 'px'; }
  x = 0; const g0 = $('#g0'); g0.style.left = '0px'; x = g0.offsetWidth + 16; $('#gA').style.left = x + 'px'; x += 76; $('#g1').style.left = x + 'px';
  const tr = $('#htr'); tr.style.left = (296 - tr.offsetWidth / 2) + 'px';
  // pane titles fit 848
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const xb = $('#xban'); xb.style.left = (392 - xb.offsetWidth / 2) + 'px';
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
  const exOn = t < tTu ? [tDiff + 0.3, tT - 0.3] : [tM1 + 0.4, tZout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: six people, six ways ===== */
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
    CT.forEach((_, i) => {
      const el = $('#ct' + i); M.vis(el, t, tMorph + 0.5 + i * 0.05, 1e9, { dy: 16 });
      const ct = el.querySelector('.ct'); M.vis(ct, t, tDiff + i * 0.07, 1e9, { dy: 10, sp: M.SOFT });
      const g = i === 0 ? M.io((t - tTwo) / 0.25) : 0, r = i === 3 ? M.io((t - tFive) / 0.25) : 0;
      el.style.background = mix(mix(C.paper, C.gold, g), C.redBg, r);
      ct.style.color = g > 0.5 ? '#fff' : (r > 0.5 ? C.red : C.ink);
      el.querySelector('.cn').style.color = g > 0.5 ? '#fff' : (r > 0.5 ? C.red : C.muted);
      setIco(el.querySelector('.ci'), 'cup', g > 0.5 ? '#fff' : (r > 0.5 ? C.red : (t < tEvery + i * 0.06 ? C.dim : C.ink)), 40, 2.2);
    });
    M.vis($('#ask'), t, tMorph + 0.42, 1e9, { dy: 36 });
    METH.forEach((_, i) => M.vis($('#mt' + i), t, tWay + i * 0.18, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tOne - 0.1, { st: 0.07, sp: M.HEAVY });
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

  /* ===== D: Taylor and his book ===== */
  const dOn = t >= tTu - 0.05 && t < tB1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const tay = $('#tay'), sh = M.spring(t - tD4 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD2 + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tFred, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tAmer - 0.05, 1e9, { dy: 10 });
    M.vis($('#father'), t, tFather - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const bk = $('#book'), bs = M.spring(t - tD5 + 0.1, M.HEAVY), bh = M.lerp(580, 274, bs);
    M.vis(bk, t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    snap(bk, (bs >= 1 ? 274 : bh.toFixed(1)) + 'px', 'height');
    snap($('#bookIn'), (bs >= 1 ? 0 : ((bh - 274) / 2).toFixed(1)) + 'px', 'top');
    M.vis($('#bookS'), t, t1911, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, t1911 + 0.25 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#bookL'), t, t1911 + 0.1, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, wt('D4', 'The', 1) - 0.05, { st: 0.05 }); M.rise($('#bk2'), t, wt('D4', 'Scientific') - 0.05, { st: 0.06 });
    M.vis($('#idea'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#id0'), t, tD5 + 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#idA'), t, tFind - 0.15, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    M.vis($('#id1'), t, tFind - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== B: the steel works ===== */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.1, tBout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tB3);
    M.vis($('#illImg'), t, tB1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgT'), t, tTayl - 0.05, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgW'), t, tWorker - 0.05, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#shv'), t, tB3 + 0.12, tB6 - 0.1, { dx: 60, dy: 0, outDur: 0.3, ody: -16 });
    M.vis($('#ton'), t, tB6 + 0.1, tBout, { dy: 36, ...o });
    MAT.forEach((mt, i) => {
      const g = $('#bl' + i), s = blScale[i](t);
      g.setAttribute('transform', Math.abs(s - 1) < 1e-4 ? 'translate(0 0)' : `translate(168 116) scale(${s.toFixed(4)}) translate(-168 -116)`);
      const pile = $('#pile' + i), tp = i ? tOre : tCoal, p = M.spring(t - tp, M.POP);
      M.hide(pile, t < tp); pile.setAttribute('transform', p >= 1 ? 'translate(0 0)' : `translate(0 ${(-30 * (1 - p)).toFixed(2)})`); pile.style.opacity = M.clamp((t - tp) / 0.1);
      M.vis($('#mat' + i), t, tB3 + 0.4 + i * 0.1, 1e9, { dy: 10 });
      const ld = $('#ld' + i); M.vis(ld, t, tOwn + i * 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const ok = M.io((t - tCarry - i * 0.12) / 0.25);
      ld.style.background = mix(C.redBg, C.gold, ok); ld.style.color = mix(C.red, '#fff', ok);
      M.setT($('#ldT' + i), ok > 0.5 ? '21 lb' : mt[2]);
      if (!ld._w || ld._w !== ld.offsetWidth) { ld._w = ld.offsetWidth; ld.style.left = (48 + i * 352 + 168 - ld.offsetWidth / 2) + 'px'; }
    });
    M.vis($('#best'), t, tTwenty - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const W59 = 470, W16 = Math.round(470 * 16 / 59);
    [[0, tB6 + 0.5, 16, W16], [1, tFifty - 0.1, 59, W59]].forEach(([k, ta, v, w]) => {
      const el = $('#br' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
      M.vis(el, t, tB6 + 0.3 + k * 0.12, 1e9, { dy: 16 });
      const u = M.o5((t - ta) / 0.9), ww = w * u;
      bt.style.width = ww.toFixed(1) + 'px'; bt.style.background = k ? C.gold : '#E7E0D2';
      bv.style.left = (ww + 20).toFixed(1) + 'px'; M.setT(bv, `${Math.round(v * u)} tons`);
      bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = k ? C.ink : C.muted;
    });
    M.vis($('#tonBig'), t, tSixteen + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#tonHr'), t, tB6 + 0.6, 1e9, { dy: 0 }); M.vis($('#tonSrc'), t, tB6 + 0.7, 1e9, { dy: 8 });
  }

  /* ===== M: two ways to make one cup ===== */
  const mOn = t >= tM1 - 0.1 && t < tZ1 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM4 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM4 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM4 + 0.3;
      const root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      Object.keys(ST[k]).forEach((nm, i) => { const g = $('#sb' + k + nm); const p = M.spring(t - base - 0.25 - i * 0.07, M.POP); g.style.opacity = M.clamp((t - base - 0.25 - i * 0.07) / 0.1); });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const r = runWay(k, t);
      if (k === 'L') {
        M.vis($('#swv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
        M.drawU($('#swArc'), M.clamp(r.sim / 300)); M.hide($('#swArc'), r.sim < 0.5);
        $('#swHand').setAttribute('transform', `rotate(${((r.sim % 60) * 6).toFixed(2)} 140 170)`);
        M.vis($('#rdW'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#rdW'), mmss(Math.floor(r.sim)));
        $('#rdW').style.color = r.done ? C.red : C.ink;
        M.vis($('#mwL'), t, tM1 + 0.65, 1e9, { dy: 8 });
      }
    }
  }

  /* ===== Z: the standard ===== */
  const zOn = t >= tZ1 - 0.1 && t < tP0 + 0.2; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const o = { outDur: 0.3, ody: -16 };
    const zA = $('#zA'); M.vis(zA, t, tZ1 + 0.1, tZout, { dy: 36, ...o }); grow(zA, $('#zAOut'), t, tZ2);
    M.vis($('#zImg'), t, tZ1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#zR'), t, tZ2 + 0.12, tZout, { dx: 60, dy: 0, ...o });
    ZS.forEach((_, i) => M.vis($('#zs' + i), t, tZs[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#zC'), t, tZ3 + 0.05, tZout, { dy: 36, ...o });
    CT.forEach((c, i) => {
      const el = $('#zc' + i); M.vis(el, t, tZ3 + 0.25 + i * 0.05, 1e9, { dy: 16 });
      const sw0 = M.io((t - tZone - i * 0.09) / 0.3), g = M.io((t - tZthree - i * 0.06) / 0.25);
      const ct = el.querySelector('.ct'); M.setT(ct, sw0 > 0.5 ? '3:00' : c);
      ct.style.opacity = (Math.abs(sw0 - 0.5) * 2).toFixed(3);
      el.style.background = mix(C.paper, C.gold, g);
      ct.style.color = g > 0.5 ? '#fff' : (sw0 > 0.5 ? C.ink : C.muted);
      el.querySelector('.cn').style.color = g > 0.5 ? '#fff' : C.muted;
      setIco(el.querySelector('.ci'), 'cup', g > 0.5 ? '#fff' : C.ink, 40, 2.2);
    });
    M.vis($('#zPill'), t, tZtaste - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== P: four principles ===== */
  const pOn = t >= tP0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    PR.forEach(([ic], i) => {
      const el = $('#pr' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tP0 + 0.5, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        M.vis($('#g0'), t, tin + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#gA'), t, wt('P1', 'not') - 0.05, 1e9, { dx: -12, dy: 0, fade: 0.15 });
        M.vis($('#g1'), t, wt('P1', 'rule') - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.rise($('#g2'), t, tRule - 0.05, { st: 0.05 });
      } else if (k === 2) {
        for (let i = 0; i < 2; i++) { M.vis($('#hav' + i), t, tin + 0.6 + i * 0.12, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#han' + i), t, tin + 0.7 + i * 0.12, 1e9, { dy: 10 }); }
        M.draw($('#hz'), t, tDiscord - 0.1, 0.5, M.o3);
        const fix = M.io((t - tTrust + 0.1) / 0.3); $('#hz').style.opacity = (1 - fix).toFixed(3);
        M.draw($('#hs'), t, tTrust - 0.1, 0.5, M.o3);
        M.vis($('#htr'), t, tTrust + 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 3) {
        for (let i = 0; i < 4; i++) {
          const av = $('#cav' + i); M.vis(av, t, tin + 0.6 + i * 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#can' + i), t, tin + 0.7 + i * 0.1, 1e9, { dy: 10 });
          av.style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, M.io((t - tTog - i * 0.08) / 0.25));
        }
        M.draw($('#cline'), t, tTog - 0.15, 0.7, M.o3);
      } else if (k === 4) {
        for (let i = 0; i < 3; i++) { const s = $('#sti' + i); M.vis(s, t, tin + 0.6 + i * 0.1, 1e9, { dy: 16 }); s.style.background = i === 2 ? mix(C.paper, C.gold, M.io((t - tBest) / 0.3)) : C.paper; s.querySelector('span').style.color = i === 2 && t > tBest + 0.15 ? '#fff' : C.ink; }
        M.vis($('#dav'), t, tDev, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
        const st = M.track(0, [[wt('P4', 'worker'), 1], [tReach, 2]], M.SOFT)(t), H = [40, 80, 120];
        const hh = st <= 1 ? M.lerp(H[0], H[1], st) : M.lerp(H[1], H[2], st - 1);
        const settled = Math.abs(st - Math.round(st)) < 1e-3;
        snap($('#dav'), (settled ? 39 + Math.round(st) * 170 : (39 + st * 170).toFixed(1)) + 'px', 'left');
        snap($('#dav'), (settled ? 176 - H[Math.round(st)] - 80 : (176 - hh - 80).toFixed(1)) + 'px', 'top');
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

  /* ===== X: the human side ===== */
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
    M.vis($('#xwImg'), t, tX5 + 0.35, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#xban'), t, tBan - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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
